#!/usr/bin/env python3
"""Report cache evidence after deployment; never influence build or cache decisions."""
import json
import os
from pathlib import Path
import re


def number(value):
    return int(value) if re.fullmatch(r'[0-9]{1,20}', value or '') else None


def outcome(value):
    return value if value in ('success', 'failure', 'cancelled', 'skipped') else 'unavailable'


def label(value):
    return {'success': '성공', 'failure': '실패', 'cancelled': '취소',
            'skipped': '건너뜀', 'unavailable': '확인 불가'}[value] + f' ({value})'


def parse_processes(text):
    # Parse only the final complete Bazel process summary, never arbitrary log text.
    text = re.sub(r'\x1b\[[0-9;]*[A-Za-z]', '', text)
    matches = re.findall(r'^INFO: (\d+) process(?:es)?(?:: ([^\r\n]*))?\.\s*$', text, re.M)
    if not matches:
        return {'status': 'unavailable'}
    total, details = matches[-1]
    counts = {}
    for item in details.split(', ') if details else []:
        match = re.fullmatch(r'(\d+) ([a-z][a-z0-9 -]*)', item)
        if not match or match[2] in counts:
            return {'status': 'unavailable'}
        counts[match[2]] = int(match[1])
    # SpawnStats reports action-cache hits separately; runner counts can exceed
    # the action total. Do not assume that these categories add up to total.
    return {'status': 'available', 'total': int(total),
            'disk_cache_hits': counts.get('disk cache hit', 0),
            'sandbox_processes': sum(count for name, count in counts.items() if name.endswith('-sandbox')),
            'internal_processes': counts.get('internal', 0)}


def read_processes(workspace, started_at):
    if started_at is None:
        return {'status': 'unavailable'}
    try:
        # Reuse Bazel's existing command.log. Running `bazel info command_log`
        # now would overwrite it; piping the build could alter exit/cancel behavior.
        # .bazelrc's dist/bin -> output_base/execroot/<workspace>/bazel-out/.../bin.
        output = (workspace / 'dist/bin').resolve(strict=True)
        execroot = next(parent for parent in output.parents if parent.name == 'execroot')
        log = execroot.parent / 'command.log'
        if log.stat().st_mtime < started_at:
            return {'status': 'unavailable'}
        with log.open('rb') as source:
            source.seek(max(0, log.stat().st_size - 65536))
            return parse_processes(source.read(65536).decode('utf-8', errors='replace'))
    except (OSError, StopIteration):
        return {'status': 'unavailable'}


def collect(env, workspace):
    matched = env.get('CACHE_MATCHED_KEY', '')
    key = matched if re.fullmatch(r'[A-Za-z0-9._-]{1,512}', matched) else None
    exact = env.get('CACHE_EXACT_HIT')
    exact = {'true': True, 'false': False}.get(exact)
    restore = outcome(env.get('RESTORE_OUTCOME'))
    if restore == 'success':
        archive = 'restored' if key else ('miss' if not matched else 'unavailable')
    else:
        archive = restore
    return {
        'diagnostic_schema': 1,
        'build': {'outcome': outcome(env.get('BUILD_OUTCOME')),
                  'seconds': number(env.get('BUILD_SECONDS'))},
        'archive': {'restore_outcome': restore, 'status': archive,
                    'matched_key': key, 'exact_hit': exact},
        'processes': read_processes(workspace, number(env.get('BUILD_STARTED_AT'))),
        'cache': {'bytes': number(env.get('CACHE_SIZE_BYTES')),
                  'save_allowed': env.get('CACHE_SAVE_ALLOWED') == 'true',
                  'save_outcome': outcome(env.get('CACHE_SAVE_OUTCOME')),
                  'deployment_allowed': env.get('DEPLOY_ALLOWED') == 'true'},
    }


def render(report):
    build, archive, processes, cache = (report[name] for name in ('build', 'archive', 'processes', 'cache'))
    seconds = build['seconds']
    unknown = label('unavailable')
    duration = unknown if seconds is None else f'{seconds // 60}분 {seconds % 60}초 ({seconds} s)'
    hits = processes.get('disk_cache_hits', unknown)
    sandbox = processes.get('sandbox_processes', unknown)
    exact = {True: 'true', False: 'false', None: unknown}[archive['exact_hit']]
    if archive['status'] == 'restored':
        restored = '복원됨' + {True: ' (정확한 키)', False: ' (prefix)', None: ' (일치 유형 미확인)'}[archive['exact_hit']]
    elif archive['status'] == 'miss':
        restored = '미복원 (일치하는 캐시 없음)'
    else:
        restored = label(archive['status'])
    size = unknown if cache['bytes'] is None else f'{cache["bytes"]:,} bytes'
    save = label(cache['save_outcome'])
    if cache['save_outcome'] == 'skipped':
        if archive['exact_hit'] is True:
            save += ' — immutable exact archive 존재'
        elif cache['bytes'] is not None and cache['bytes'] > 8 * 1024 ** 3:
            save += ' — 8 GiB 제한 초과'
        elif build['outcome'] != 'success':
            save += ' — 빌드 미성공'
        elif not cache['deployment_allowed']:
            save += ' — 배포 조건 미충족'
        elif not cache['save_allowed']:
            save += ' — 저장 허용 확인 없음'
    return (
        '## Bazel 빌드 캐시 요약\n\n'
        '| 항목 | 결과 |\n| --- | --- |\n'
        f'| 빌드 단계 | {label(build["outcome"])} |\n'
        f'| 빌드 단계 시간 | {duration} |\n'
        f'| 캐시 아카이브 복원 | {restored} / 단계: {label(archive["restore_outcome"])} |\n'
        f'| 정확한 아카이브 키 일치 (exact) | {exact} |\n'
        f'| 실제 Bazel disk cache hit | {hits} |\n'
        f'| Sandbox 프로세스 | {sandbox} |\n'
        f'| 전체 / internal 프로세스 | {processes.get("total", unknown)} / '
        f'{processes.get("internal_processes", unknown)} |\n'
        f'| Action cache 크기 | {size} |\n'
        f'| 캐시 저장 단계 | {save} |\n\n'
        '- `exact=false`여도 prefix로 아카이브를 복원했을 수 있습니다. 아카이브 복원과 실제 action 재사용은 다릅니다.\n'
        '- 프로세스 수는 이번 빌드의 마지막 완전한 Bazel 요약에서만 읽습니다. 누락·오래된 로그는 0이 아니라 unavailable입니다.\n'
        '- 실패한 빌드의 수치는 실패 전 관측값이며, 빌드 성공을 뜻하지 않습니다.\n'
        '- 시간은 빌드 단계만 포함합니다. 전체 job 시간에는 설치·캐시 전송·배포도 포함됩니다.\n'
        '- 저장 단계 success는 action 성공입니다. 동시 실행으로 기존 immutable 항목이 있으면 새 업로드가 생략될 수 있습니다.\n'
        '\n<details><summary>복원한 캐시 키</summary>\n\n'
        f'`{archive["matched_key"] or "없음 / 확인 불가"}`\n\n</details>\n'
    )


def main():
    try:
        report = collect(os.environ, Path.cwd())
        summary = render(report)
        # Keep build/cache results first, with complete fingerprint inputs collapsed below.
        try:
            detail = Path(os.environ['RUNNER_TEMP']) / 'bazel-fingerprint-summary.md'
            summary += '\n' + detail.read_text(encoding='utf-8')
        except (KeyError, OSError):
            summary += '\n- 지문 상세: unavailable. prepare Bazel cache key 로그의 fallback 여부를 확인하세요.\n'
        try:
            os.write(1, (json.dumps(report, sort_keys=True) + '\n').encode('utf-8'))
        except OSError:
            pass
        try:
            with Path(os.environ['GITHUB_STEP_SUMMARY']).open('a', encoding='utf-8') as output:
                output.write(summary)
        except (KeyError, OSError):
            pass
    except Exception:
        # Diagnostics run after decisions are made and must not change their result.
        try:
            os.write(2, b'Bazel cache summary unavailable; build/cache outcomes unchanged.\n')
        except OSError:
            pass
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
