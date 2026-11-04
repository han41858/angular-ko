"""Cache-report parsing and presentation; no Bazel invocation is needed."""
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'bazel-cache-summary.py'
spec = importlib.util.spec_from_file_location('summary', SCRIPT)
summary = importlib.util.module_from_spec(spec)
spec.loader.exec_module(summary)

WARM = 'INFO: 16578 processes: 11346 disk cache hit, 5185 internal, 47 processwrapper-sandbox.\n'
COLD = 'INFO: 16578 processes: 5185 internal, 11393 processwrapper-sandbox.\n'


class ProcessTests(unittest.TestCase):
    def test_warm_and_cold_action_counts(self):
        warm = summary.parse_processes(WARM)
        self.assertEqual(warm, {'status': 'available', 'total': 16578, 'disk_cache_hits': 11346,
                                'sandbox_processes': 47, 'internal_processes': 5185})
        cold = summary.parse_processes(COLD)
        self.assertEqual(cold['disk_cache_hits'], 0)
        self.assertEqual(cold['sandbox_processes'], 11393)

    def test_missing_or_incomplete_counts_are_not_zero(self):
        for log in ('', 'ERROR: build failed\n', 'INFO: 2 processes: invalid internal.\n',
                    'INFO: 2 processes: 1 internal, 1 internal.\n', 'INFO: 2 processes: incomplete'):
            with self.subTest(log=log):
                self.assertEqual(summary.parse_processes(log), {'status': 'unavailable'})
        self.assertEqual(summary.parse_processes('INFO: 0 processes.\n')['disk_cache_hits'], 0)

    def test_singular_process_and_independent_action_cache_counts(self):
        self.assertEqual(summary.parse_processes('INFO: 1 process: 1 internal.\n')['total'], 1)
        result = summary.parse_processes('INFO: 2 processes: 10 action cache hit, 2 internal.\n')
        self.assertEqual(result['status'], 'available')
        self.assertEqual(result['total'], 2)
        self.assertEqual(result['disk_cache_hits'], 0)

    def test_last_complete_summary_and_ansi(self):
        log = WARM + '\x1b[32m' + COLD.rstrip() + '\x1b[0m\n'
        self.assertEqual(summary.parse_processes(log)['disk_cache_hits'], 0)

    def fixture(self, directory):
        workspace = Path(directory) / 'checkout'
        (workspace / 'dist').mkdir(parents=True)
        base = Path(directory) / 'output-base'
        output = base / 'execroot/_main/bazel-out/k8-fastbuild/bin'
        output.mkdir(parents=True)
        (workspace / 'dist/bin').symlink_to(output)
        log = base / 'command.log'
        log.write_text('private-log-content\n' * 10000 + WARM)
        return workspace, log

    def test_existing_log_tail_is_read_without_running_bazel(self):
        with tempfile.TemporaryDirectory() as directory:
            workspace, log = self.fixture(directory)
            result = summary.read_processes(workspace, int(log.stat().st_mtime))
            self.assertEqual(result['disk_cache_hits'], 11346)
            self.assertNotIn('private-log-content', json.dumps(result))

    def test_missing_stale_or_unknown_start_is_unavailable(self):
        with tempfile.TemporaryDirectory() as directory:
            workspace, log = self.fixture(directory)
            self.assertEqual(summary.read_processes(workspace, None), {'status': 'unavailable'})
            self.assertEqual(summary.read_processes(workspace, int(log.stat().st_mtime) + 10),
                             {'status': 'unavailable'})
            log.unlink()
            self.assertEqual(summary.read_processes(workspace, 0), {'status': 'unavailable'})
            (workspace / 'dist/bin').unlink()
            self.assertEqual(summary.read_processes(workspace, 0), {'status': 'unavailable'})


class SummaryTests(unittest.TestCase):
    def report(self, **updates):
        env = {'CACHE_MATCHED_KEY': 'bazel-disk-v2-Linux-X64-tools-hash-config-commit',
               'CACHE_EXACT_HIT': 'false', 'RESTORE_OUTCOME': 'success',
               'BUILD_OUTCOME': 'success', 'BUILD_SECONDS': '202', 'BUILD_STARTED_AT': '1',
               'CACHE_SIZE_BYTES': '1263838429', 'CACHE_SAVE_ALLOWED': 'true',
               'CACHE_SAVE_OUTCOME': 'success', 'DEPLOY_ALLOWED': 'true'}
        env.update(updates)
        with patch.object(summary, 'read_processes', return_value=summary.parse_processes(WARM)):
            return summary.collect(env, Path('/unused'))

    def test_korean_table_duration_prefix_hit_and_collapsed_key(self):
        report = self.report()
        self.assertEqual(report['archive']['status'], 'restored')
        text = summary.render(report)
        for value in ('## Bazel 빌드 캐시 요약', '| 항목 | 결과 |', '3분 22초 (202 s)',
                      '복원됨 (prefix)', '| 실제 Bazel disk cache hit | 11346 |',
                      '| Sandbox 프로세스 | 47 |', '1,263,838,429 bytes', '캐시 저장 단계',
                      '`exact=false`여도 prefix', '<details><summary>복원한 캐시 키</summary>'):
            self.assertIn(value, text)
        self.assertGreater(text.index(report['archive']['matched_key']), text.index('<details>'))

    def test_miss_failure_and_unavailable_are_distinct(self):
        miss = self.report(CACHE_MATCHED_KEY='', CACHE_EXACT_HIT='')
        self.assertEqual(miss['archive']['status'], 'miss')
        for status in ('failure', 'cancelled', 'skipped', ''):
            report = self.report(RESTORE_OUTCOME=status, CACHE_MATCHED_KEY='')
            self.assertNotEqual(report['archive']['status'], 'miss')
            self.assertEqual(report['archive']['status'], status or 'unavailable')

    def test_missing_metrics_and_time_are_not_zero(self):
        report = self.report(BUILD_SECONDS='', CACHE_SIZE_BYTES='', CACHE_EXACT_HIT='')
        report['processes'] = {'status': 'unavailable'}
        text = summary.render(report)
        self.assertIn('| 실제 Bazel disk cache hit | 확인 불가 (unavailable) |', text)
        self.assertIn('| 빌드 단계 시간 | 확인 불가 (unavailable) |', text)
        self.assertIsNone(report['archive']['exact_hit'])
        report['processes'] = summary.parse_processes(COLD)
        self.assertIn('| 실제 Bazel disk cache hit | 0 |', summary.render(report))

    def test_failed_or_cancelled_build_retains_observed_metrics(self):
        for status in ('failure', 'cancelled'):
            report = self.report(BUILD_OUTCOME=status, CACHE_SAVE_OUTCOME='skipped')
            text = summary.render(report)
            self.assertIn(summary.label(status), text)
            self.assertIn('| 실제 Bazel disk cache hit | 11346 |', text)
            self.assertIn('실패 전 관측값', text)
            self.assertIn('빌드 미성공', text)

    def test_save_step_outcome_is_not_claimed_as_new_archive(self):
        for status in ('success', 'failure', 'cancelled', 'skipped', ''):
            report = self.report(CACHE_SAVE_OUTCOME=status)
            self.assertIn(summary.label(status or 'unavailable'), summary.render(report))
        cases = [({'CACHE_EXACT_HIT': 'true'}, 'immutable exact archive 존재'),
                 ({'CACHE_SIZE_BYTES': str(8 * 1024 ** 3 + 1)}, '8 GiB 제한 초과'),
                 ({'DEPLOY_ALLOWED': 'false'}, '배포 조건 미충족'),
                 ({'CACHE_SAVE_ALLOWED': ''}, '저장 허용 확인 없음')]
        for updates, reason in cases:
            with self.subTest(reason=reason):
                self.assertIn(reason, summary.render(self.report(CACHE_SAVE_OUTCOME='skipped', **updates)))
        self.assertIn('새 업로드가 생략될 수 있습니다', summary.render(self.report()))

    def test_invalid_metadata_and_secrets_are_not_printed(self):
        report = self.report(CACHE_MATCHED_KEY='secret\n<script>', BUILD_SECONDS='secret',
                             CACHE_SIZE_BYTES='secret', SECRET_TOKEN='private-value')
        text = summary.render(report) + json.dumps(report)
        self.assertNotIn('secret', text)
        self.assertNotIn('private-value', text)
        self.assertEqual(report['archive']['status'], 'unavailable')

    def test_final_summary_combines_table_and_fingerprint_once(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / 'summary.md'
            detail = Path(directory) / 'bazel-fingerprint-summary.md'
            detail.write_text('<details><summary>호스트 지문</summary>JSON</details>')
            with patch.dict(os.environ, {'RUNNER_TEMP': directory, 'GITHUB_STEP_SUMMARY': str(output)},
                            clear=True):
                with (patch.object(summary, 'collect', return_value=self.report()),
                      patch.object(summary.os, 'write')):
                    self.assertEqual(summary.main(), 0)
            text = output.read_text()
            self.assertEqual(text.count('## Bazel 빌드 캐시 요약'), 1)
            self.assertEqual(text.count('<summary>호스트 지문</summary>'), 1)
            self.assertLess(text.index('| 항목 | 결과 |'), text.index('<summary>호스트 지문</summary>'))

    def test_summary_and_log_failures_never_change_success(self):
        with tempfile.TemporaryDirectory() as directory:
            with patch.dict(os.environ, {'GITHUB_STEP_SUMMARY': directory}, clear=True):
                with patch.object(summary, 'collect', return_value=self.report()):
                    with patch.object(summary.os, 'write', side_effect=OSError('private-error')):
                        self.assertEqual(summary.main(), 0)
        with patch.object(summary, 'collect', side_effect=RuntimeError('private-error')):
            with patch.object(summary.os, 'write') as write:
                self.assertEqual(summary.main(), 0)
                self.assertNotIn('private-error', str(write.call_args))


if __name__ == '__main__':
    unittest.main()
