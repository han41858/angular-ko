"""Run with pinned Node on PATH: python3 -m unittest discover -s .github/scripts/tests."""
import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'bazel-cache-fingerprint.py'
if not SCRIPT.exists():
    SCRIPT = Path(__file__).with_name('bazel-cache-fingerprint.py')
spec = importlib.util.spec_from_file_location('fingerprint', SCRIPT)
fingerprint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fingerprint)


class FingerprintTests(unittest.TestCase):
    def test_serialization_is_deterministic(self):
        self.assertEqual(fingerprint.fingerprint({'a': 1, 'b': 2}),
                         fingerprint.fingerprint({'b': 2, 'a': 1}))

    def test_changed_tool_or_library_changes_key(self):
        with tempfile.TemporaryDirectory() as directory:
            binary = Path(directory) / 'tool'
            binary.write_bytes(b'first version')
            before = fingerprint.digest_file(binary)
            binary.write_bytes(b'second version')
            after = fingerprint.digest_file(binary)
            self.assertNotEqual(before, after)
            self.assertNotEqual(fingerprint.fingerprint({'files': [('tool', before)]}),
                                fingerprint.fingerprint({'files': [('tool', after)]}))

    def test_missing_file_fails(self):
        with self.assertRaises(OSError):
            fingerprint.digest_file(Path('/nonexistent/angular-ko-test-tool'))

    @patch.object(fingerprint.platform, 'machine', return_value='aarch64')
    def test_unaudited_architecture_fails(self, _):
        with self.assertRaisesRegex(RuntimeError, 'platform'):
            fingerprint.collect()

    @patch.object(fingerprint.shutil, 'which', return_value=None)
    def test_missing_inspector_fails(self, _):
        with self.assertRaisesRegex(RuntimeError, 'ldd unavailable'):
            fingerprint.collect()

    def test_missing_runtime_library_fails(self):
        real_run = fingerprint.run
        def run(args):
            return '' if args[-1] == '-p' else real_run(args)
        with patch.object(fingerprint, 'run', side_effect=run):
            with self.assertRaisesRegex(RuntimeError, 'runtime library unavailable'):
                fingerprint.collect()

    @patch.dict(fingerprint.os.environ, {'LD_LIBRARY_PATH': '/unexpected'})
    def test_loader_override_fails(self):
        with self.assertRaisesRegex(RuntimeError, 'loader override'):
            fingerprint.collect()

    def test_wrong_node_version_fails(self):
        real_run = fingerprint.run
        def run(args):
            return 'v24.22.1' if args[-1] == '--version' else real_run(args)
        with patch.object(fingerprint, 'run', side_effect=run):
            with self.assertRaisesRegex(RuntimeError, 'Node version'):
                fingerprint.collect()

    def test_actual_collection_is_stable_and_image_independent(self):
        first = fingerprint.collect()
        with patch.dict(fingerprint.os.environ, {'ImageVersion': 'different-image'}):
            second = fingerprint.collect()
        self.assertEqual(fingerprint.fingerprint(first), fingerprint.fingerprint(second))
        changed = copy.deepcopy(first)
        changed['action_env']['TZ'] = 'Asia/Seoul'
        self.assertNotEqual(fingerprint.fingerprint(first), fingerprint.fingerprint(changed))
        self.assertTrue(any('ld-linux' in value[0] for _, value in first['files']))
        self.assertTrue(any('libstdc++' in value[0] for _, value in first['files']))


if __name__ == '__main__':
    unittest.main()
