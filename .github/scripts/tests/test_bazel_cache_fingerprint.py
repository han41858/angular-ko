"""Run with pinned Node on PATH: python3 -m unittest discover -s .github/scripts/tests."""
import copy
import html
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'bazel-cache-fingerprint.py'
if not SCRIPT.exists():
    SCRIPT = Path(__file__).with_name('bazel-cache-fingerprint.py')
spec = importlib.util.spec_from_file_location('fingerprint', SCRIPT)
fingerprint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fingerprint)


MANIFEST = {
    'schema': 2, 'os': 'ubuntu', 'os_version': '26.04', 'arch': 'x86_64',
    'node': '24.21.0', 'bazel': '8.8.2',
    'action_env': {'LC_ALL': 'C.UTF-8', 'LANG': 'C.UTF-8', 'TZ': 'UTC'},
    'files': [('/bin/sh', ('/usr/bin/dash', 'a' * 64)),
              ('/usr/share/zoneinfo/UTC', ('/usr/share/zoneinfo/Etc/UTC', 'b' * 64))],
}
EXPECTED_HASH = '6e46f1fb8d05e4f967fd951e72b3960d25665e988c65fe1a5bcd5715c8be9dc2'


class FingerprintTests(unittest.TestCase):
    def test_existing_fingerprint_format_is_unchanged(self):
        self.assertEqual(fingerprint.fingerprint(MANIFEST), EXPECTED_HASH)

    def test_non_stamped_target_does_not_fingerprint_git(self):
        self.assertNotIn('git', fingerprint.TOOLS)

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
        for field, value in [('bazel', 'different'), ('schema', 999),
                             ('os_version', 'different'), ('arch', 'different'),
                             ('node', 'different')]:
            changed = copy.deepcopy(first)
            changed[field] = value
            self.assertNotEqual(fingerprint.fingerprint(first), fingerprint.fingerprint(changed))
        changed = copy.deepcopy(first)
        changed['action_env']['TZ'] = 'Asia/Seoul'
        self.assertNotEqual(fingerprint.fingerprint(first), fingerprint.fingerprint(changed))
        self.assertTrue(any('ld-linux' in value[0] for _, value in first['files']))
        self.assertTrue(any('libstdc++' in value[0] for _, value in first['files']))


class DiagnosticTests(unittest.TestCase):
    def invoke(self, arguments=('--diagnostics',)):
        stdout, stderr = io.StringIO(), io.StringIO()
        with patch.object(fingerprint, 'collect', return_value=copy.deepcopy(MANIFEST)) as collect:
            with (patch.object(fingerprint.sys, 'stdout', stdout),
                  patch.object(fingerprint.sys, 'stderr', stderr)):
                status = fingerprint.main(arguments)
        collect.assert_called_once_with()
        self.assertEqual(stdout.getvalue(), EXPECTED_HASH + '\n')
        self.assertEqual(status, 0)
        return stderr.getvalue()

    def read_report(self, output):
        return json.loads(output.split('\n', 1)[1].rsplit('\n::endgroup::', 1)[0])

    @patch.dict(fingerprint.os.environ, {}, clear=True)
    def test_default_interface_emits_only_hash(self):
        with patch.object(fingerprint, 'emit_diagnostics') as emit:
            self.assertEqual(self.invoke(()), '')
        emit.assert_not_called()

    @patch.dict(fingerprint.os.environ, {'ImageOS': 'ubuntu26', 'ImageVersion': '20261025.179.1'}, clear=True)
    def test_complete_deterministic_json_and_summary_use_same_inputs(self):
        with tempfile.TemporaryDirectory() as directory:
            summary = Path(directory) / 'summary.md'
            summary.write_text('Existing summary\n')
            with patch.dict(fingerprint.os.environ, {'GITHUB_STEP_SUMMARY': str(summary)}):
                with patch.object(fingerprint, 'package_metadata',
                                  return_value={'status': 'unavailable', 'files': {}}):
                    first = self.invoke()
                    first_summary = summary.read_text()
                    second = self.invoke()
            self.assertEqual(first, second)
            report = self.read_report(first)
            self.assertEqual(report['manifest'], json.loads(json.dumps(MANIFEST)))
            self.assertEqual(report['fingerprint'], EXPECTED_HASH)
            self.assertEqual(fingerprint.fingerprint(report['manifest']), EXPECTED_HASH)
            self.assertEqual(report['runner_image']['ImageVersion'], '20261025.179.1')
            self.assertTrue(first_summary.startswith('Existing summary\n'))
            summary_json = first_summary.split('<pre>', 1)[1].split('</pre>', 1)[0]
            self.assertEqual(json.loads(html.unescape(summary_json)), report)

    @patch.dict(fingerprint.os.environ, {}, clear=True)
    def test_diagnostic_metadata_never_changes_fingerprint(self):
        for image, version in [('old-image', '1.0'), ('new-image', '2.0')]:
            with patch.dict(fingerprint.os.environ, {'ImageVersion': image}):
                with patch.object(fingerprint, 'package_metadata', return_value={'version': version}):
                    self.assertEqual(self.read_report(self.invoke())['fingerprint'], EXPECTED_HASH)

    @patch.dict(fingerprint.os.environ, {
        'SECRET_TEST_TOKEN': 'do-not-print-token', 'FIREBASE_SERVICE_ACCOUNT': 'private-json',
        'ImageVersion': 'invalid\n::error::injected', 'ImageOS': 'ubuntu26',
    }, clear=True)
    def test_only_allowlisted_metadata_and_no_raw_exception_output(self):
        with patch.object(fingerprint, 'package_metadata', side_effect=RuntimeError('do-not-print-token')):
            output = self.invoke()
        self.assertNotIn('do-not-print-token', output)
        self.assertNotIn('private-json', output)
        self.assertNotIn('SECRET_TEST_TOKEN', output)
        self.assertNotIn('injected', output)
        report = self.read_report(output)
        self.assertEqual(report['runner_image'], {'ImageOS': 'ubuntu26', 'ImageVersion': 'unknown'})
        self.assertEqual(report['packages']['status'], 'unavailable')

    @patch.dict(fingerprint.os.environ, {}, clear=True)
    def test_unexpected_diagnostic_failure_preserves_success(self):
        with patch.object(fingerprint, 'emit_diagnostics', side_effect=ValueError('private-error')):
            output = self.invoke()
        self.assertIn('cache decision unchanged', output)
        self.assertNotIn('private-error', output)

    @patch.dict(fingerprint.os.environ, {}, clear=True)
    def test_unwritable_summary_preserves_log_and_success(self):
        with tempfile.TemporaryDirectory() as directory:
            with patch.dict(fingerprint.os.environ, {'GITHUB_STEP_SUMMARY': directory}):
                with patch.object(fingerprint, 'package_metadata', return_value={}):
                    output = self.invoke()
        self.assertIn('"fingerprint": "' + EXPECTED_HASH + '"', output)
        self.assertIn('cache decision unchanged', output)

    @patch.dict(fingerprint.os.environ, {}, clear=True)
    def test_broken_stderr_still_writes_summary(self):
        class BrokenStream:
            def write(self, _):
                raise OSError('private-log-error')
        with tempfile.TemporaryDirectory() as directory:
            summary = Path(directory) / 'summary.md'
            stdout = io.StringIO()
            with patch.dict(fingerprint.os.environ, {'GITHUB_STEP_SUMMARY': str(summary)}):
                with (patch.object(fingerprint, 'collect', return_value=MANIFEST),
                      patch.object(fingerprint, 'package_metadata', return_value={})):
                    with (patch.object(fingerprint.sys, 'stdout', stdout),
                          patch.object(fingerprint.sys, 'stderr', BrokenStream())):
                        self.assertEqual(fingerprint.main(['--diagnostics']), 0)
            self.assertEqual(stdout.getvalue(), EXPECTED_HASH + '\n')
            self.assertIn(EXPECTED_HASH, summary.read_text())

    def test_actual_fingerprint_failure_keeps_fallback(self):
        stdout, stderr = io.StringIO(), io.StringIO()
        with patch.object(fingerprint, 'collect', side_effect=RuntimeError('unaudited host platform')):
            with patch.object(fingerprint, 'emit_diagnostics') as emit:
                with (patch.object(fingerprint.sys, 'stdout', stdout),
                      patch.object(fingerprint.sys, 'stderr', stderr)):
                    self.assertEqual(fingerprint.main(['--diagnostics']), 1)
        emit.assert_not_called()
        self.assertEqual(stdout.getvalue(), '')
        self.assertIn('use the image-isolated fallback', stderr.getvalue())

    def test_closed_stderr_pipe_preserves_process_exit_status(self):
        with tempfile.TemporaryDirectory() as directory:
            summary = Path(directory) / 'summary.md'
            env = {**fingerprint.os.environ, 'GITHUB_STEP_SUMMARY': str(summary)}
            with subprocess.Popen([fingerprint.sys.executable, str(SCRIPT), '--diagnostics'],
                                  stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                  text=True, env=env) as process:
                process.stderr.close()
                output = process.stdout.read()
                self.assertEqual(process.wait(timeout=15), 0)
            self.assertRegex(output, r'^[0-9a-f]{64}\n$')
            self.assertIn(output.strip(), summary.read_text())


class PackageMetadataTests(unittest.TestCase):
    def test_partial_search_multiarch_and_exact_paths(self):
        manifest = {'files': [('/lib/libc.so.6', ('/usr/lib/libc.so.6', 'a' * 64)),
                              ('/opt/node', ('/opt/node', 'b' * 64))]}
        search = subprocess.CompletedProcess([], 1,
            'libc6:amd64: /lib/libc.so.6\n'
            'libc6:amd64, another: /usr/lib/libc.so.6\n'
            'diversion by example from: /opt/node\n'
            'wrong: /opt/node/extra\n', 'private-stderr')
        show = subprocess.CompletedProcess([], 1,
            'libc6:amd64\t2.43-2ubuntu2.4\n'
            'another\tinvalid version\n'
            'not-an-owner\t1.0\n', 'private-stderr')
        with patch.object(fingerprint.shutil, 'which', return_value='/usr/bin/dpkg-query'):
            with patch.object(fingerprint.subprocess, 'run', side_effect=[search, show]) as run:
                result = fingerprint.package_metadata(manifest)
        self.assertEqual(run.call_count, 2)
        self.assertEqual(run.call_args_list[0].args[0][2:],
                         ['/lib/libc.so.6', '/opt/node', '/usr/lib/libc.so.6'])
        self.assertEqual(run.call_args_list[1].args[0][3:], ['another', 'libc6:amd64'])
        for call in run.call_args_list:
            self.assertEqual(call.kwargs['timeout'], 5)
            self.assertEqual(call.kwargs['env'], {'LC_ALL': 'C', 'PATH': fingerprint.ACTION_PATH})
        self.assertEqual(result['status'], 'available')
        self.assertEqual(result['files']['/opt/node'], {'status': 'unknown', 'owners': []})
        self.assertEqual(result['files']['/usr/lib/libc.so.6']['owners'], [
            {'name': 'another', 'version': 'unknown'}, {'name': 'libc6:amd64', 'version': '2.43-2ubuntu2.4'}])
        self.assertNotIn('private-stderr', json.dumps(result))

    def test_missing_query_is_unknown_not_an_error(self):
        with patch.object(fingerprint.shutil, 'which', return_value=None):
            result = fingerprint.package_metadata(MANIFEST)
        self.assertEqual(result['status'], 'unavailable')
        self.assertEqual(len(result['files']), 4)
        self.assertTrue(all(record['status'] == 'unknown' for record in result['files'].values()))

    def test_query_failures_are_best_effort(self):
        for error in (OSError('private-error'), subprocess.TimeoutExpired('dpkg-query', 5)):
            with self.subTest(error=type(error).__name__):
                with patch.object(fingerprint.shutil, 'which', return_value='/usr/bin/dpkg-query'):
                    with patch.object(fingerprint.subprocess, 'run', side_effect=error):
                        result = fingerprint.package_metadata(MANIFEST)
                self.assertEqual(result['status'], 'unavailable')
                self.assertNotIn('private-error', json.dumps(result))


if __name__ == '__main__':
    unittest.main()
