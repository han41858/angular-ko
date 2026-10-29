#!/usr/bin/env python3
"""Fingerprint host inputs not tracked by Bazel; stdout is a SHA-256 or failure.

Audited with Bazel 8.8.2 aquery deps(//adev:build), 2026-10-28. Most tools
(Node, coreutils, tar, jq, esbuild) are declared Bazel inputs. The remaining
shell utilities and the shared runtime used by Node/Sass/native npm modules
need a host fingerprint. Re-audit when build rules/toolchains change.
New undeclared host dependencies require an audit; bump schema/cache epoch when
changing compatibility policy. This is not a claim of full hermeticity.
"""
import argparse
import hashlib
import html
import json
import os
from pathlib import Path
import platform
import re
import shutil
import subprocess
import sys

# Bazel's strict action PATH. Include runfiles/JS launcher helpers as well as
# the cp/cat/grep/sed/mkdir/dirname seen in the 34 direct shell actions.
ACTION_PATH = '/bin:/usr/bin:/usr/local/bin'
TOOLS = ('bash', 'sh', 'env', 'cp', 'cat', 'grep', 'sed', 'mkdir', 'dirname',
         'mktemp', 'rm', 'readlink', 'realpath', 'basename', 'pwd', 'find',
         'sort', 'cut', 'tr', 'head', 'tail', 'wc', 'ln', 'touch', 'chmod',
         'mv')
# Git is not used by the audited non-stamped deployment target. Re-audit if
# release/snapshot stamping or version-generation rules are enabled.
# Observed DT_NEEDED closure of pinned Node 24.21.0 and rules_sass Linux x64.
# Include these even if the workflow's Node binary happens to be static.
RUNTIME_LIBS = ('libc.so.6', 'libm.so.6', 'libdl.so.2', 'libpthread.so.0',
                'libstdc++.so.6', 'libgcc_s.so.1')


def run(args):
    result = subprocess.run(args, text=True, capture_output=True, timeout=15,
                            env={**os.environ, 'LC_ALL': 'C'})
    if result.returncode:
        raise RuntimeError('tool inspection failed: ' + args[0])
    return result.stdout


def digest_file(path):
    h = hashlib.sha256()
    with path.open('rb') as source:
        for block in iter(lambda: source.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def collect():
    if platform.system() != 'Linux' or platform.machine() != 'x86_64':
        raise RuntimeError('unaudited host platform')
    if any(os.environ.get(name) for name in ('LD_PRELOAD', 'LD_LIBRARY_PATH', 'LD_AUDIT')):
        raise RuntimeError('unaudited dynamic loader override')
    os_release = platform.freedesktop_os_release()
    files = {}
    inspected = set()
    ldd = shutil.which('ldd', path=ACTION_PATH)
    if not ldd:
        raise RuntimeError('ldd unavailable')

    def add_file(path):
        resolved = Path(path).resolve(strict=True)
        if not resolved.is_file():
            raise RuntimeError('host input is not a file')
        files[str(Path(path))] = (str(resolved), digest_file(resolved))
        return resolved

    def add_binary(path):
        resolved = add_file(path)
        if resolved in inspected:
            return
        inspected.add(resolved)
        with resolved.open('rb') as source:
            if source.read(4) != b'\x7fELF':
                raise RuntimeError('unaudited non-ELF host tool')
        result = subprocess.run([ldd, str(resolved)], text=True,
                                capture_output=True, timeout=15,
                                env={**os.environ, 'LC_ALL': 'C'})
        output = result.stdout + result.stderr
        if 'not found' in output:
            raise RuntimeError('unresolved runtime library')
        static = 'statically linked' in output or 'not a dynamic executable' in output
        if result.returncode and not static:
            raise RuntimeError('runtime inspection failed')
        dependencies = re.findall(r'(?:=>\s+|^\s*)(/\S+)\s+\(', output, re.M)
        if not dependencies and not static:
            raise RuntimeError('unrecognized runtime inspection output')
        # ldd includes transitive libraries and the ELF loader, not only direct NEEDED.
        for dependency in dependencies:
            add_file(dependency)

    for tool in TOOLS:
        path = shutil.which(tool, path=ACTION_PATH)
        if not path:
            raise RuntimeError('required host tool unavailable: ' + tool)
        add_binary(path)
    node = shutil.which('node')
    if not node or run([node, '--version']).strip() != 'v24.21.0':
        raise RuntimeError('unexpected Node version')
    add_binary(node)

    ldconfig = shutil.which('ldconfig', path=ACTION_PATH + ':/sbin:/usr/sbin')
    if not ldconfig:
        raise RuntimeError('ldconfig unavailable')
    libraries = run([ldconfig, '-p'])
    for soname in RUNTIME_LIBS:
        candidates = re.findall(r'^\s*' + re.escape(soname) +
                                r'\s+\([^\n]*x86-64[^\n]*\)\s+=>\s+(\S+)',
                                libraries, re.M)
        if not candidates:
            raise RuntimeError('required runtime library unavailable: ' + soname)
        for candidate in sorted(set(candidates)):
            add_binary(candidate)

    # Locale tables are separate from libc on Ubuntu; include their contents.
    locale_root = Path('/usr/lib/locale/C.utf8')
    locale_files = sorted(path for path in locale_root.rglob('*') if path.is_file())
    if not locale_files:
        raise RuntimeError('unaudited C.UTF-8 locale layout')
    for locale_file in locale_files:
        add_file(locale_file)
    add_file('/usr/share/zoneinfo/UTC')
    return {'schema': 2, 'os': os_release['ID'], 'os_version': os_release['VERSION_ID'],
            'arch': platform.machine(), 'node': '24.21.0',
            'bazel': Path('.bazelversion').read_text().strip(),
            'action_env': {'LC_ALL': 'C.UTF-8', 'LANG': 'C.UTF-8', 'TZ': 'UTC'},
            'files': sorted(files.items())}


def fingerprint(manifest):
    return hashlib.sha256(json.dumps(manifest, sort_keys=True,
                                     separators=(',', ':')).encode()).hexdigest()


def package_metadata(manifest):
    """Best-effort package ownership; never an input to fingerprint()."""
    paths = sorted({path for original, (resolved, _) in manifest['files']
                    for path in (original, resolved)})
    records = {path: {'status': 'unknown', 'owners': []} for path in paths}
    result = {'status': 'unavailable', 'files': records}
    query = shutil.which('dpkg-query', path=ACTION_PATH)
    if not query or not paths:
        return result
    # Two bounded batches, not one subprocess per file. Do not pass secrets from
    # the workflow environment to these diagnostic-only subprocesses.
    options = {'text': True, 'capture_output': True, 'timeout': 5,
               'env': {'LC_ALL': 'C', 'PATH': ACTION_PATH}}
    try:
        search = subprocess.run([query, '--search', *paths], **options)
        # Exit 1 also means that only SOME paths were unmatched (e.g. Node).
        if search.returncode not in (0, 1):
            return result
        owners = {path: set() for path in paths}
        for line in search.stdout.splitlines():
            names, separator, path = line.rpartition(': ')
            if not separator or path not in owners:
                continue
            for name in names.split(', '):
                # Ignore diversion notices and non-exact/glob matches. Multiarch
                # package names such as libc6:amd64 must remain intact.
                if re.fullmatch(r'[a-z0-9][a-z0-9+.-]*(?::[a-z0-9][a-z0-9-]*)?', name):
                    owners[path].add(name)
        names = sorted({name for values in owners.values() for name in values})
        versions = {}
        if names:
            show = subprocess.run(
                [query, '--show', '--showformat=${binary:Package}\t${Version}\n', *names],
                **options)
            if show.returncode in (0, 1):
                for line in show.stdout.splitlines():
                    name, separator, version = line.partition('\t')
                    if (separator and name in names and
                            re.fullmatch(r'[A-Za-z0-9.+:~_-]{1,200}', version)):
                        versions[name] = version
        result['status'] = 'available'
        for path, names in owners.items():
            records[path] = {
                'status': 'known' if names else 'unknown',
                'owners': [{'name': name, 'version': versions.get(name, 'unknown')}
                           for name in sorted(names)],
            }
    except (OSError, subprocess.SubprocessError):
        # No raw command output or exception text: only public package metadata
        # that passed the parsing above is eligible for diagnostic output.
        pass
    return result


def write_diagnostic_log(message):
    # Avoid buffered stderr: a broken pipe retained in its buffer can change
    # Python's exit status to 120 during shutdown, after main() returned success.
    try:
        descriptor = sys.stderr.fileno()
    except (AttributeError, OSError):
        # In-memory streams used by callers/tests have no OS descriptor.
        sys.stderr.write(message)
        return
    remaining = message.encode('utf-8')
    while remaining:
        written = os.write(descriptor, remaining)
        if not written:
            raise OSError('diagnostic log write failed')
        remaining = remaining[written:]


def diagnostic_warning():
    try:
        write_diagnostic_log('Host fingerprint diagnostics unavailable; cache decision unchanged.\n')
    except Exception:
        pass


def emit_diagnostics(manifest, host_hash):
    """Publish the SAME collected inputs, without changing the cache key."""
    try:
        packages = package_metadata(manifest)
    except Exception:
        packages = {'status': 'unavailable', 'files': {}}
    # Explicitly allowlist public image metadata. Never dump os.environ, file
    # contents, subprocess stderr, or credentials into logs/step summaries.
    runner_image = {}
    for name in ('ImageOS', 'ImageVersion'):
        value = os.environ.get(name, '')
        runner_image[name] = value if re.fullmatch(r'[A-Za-z0-9._-]{1,80}', value) else 'unknown'
    report = {'diagnostic_schema': 1, 'fingerprint': host_hash,
              'manifest': manifest, 'runner_image': runner_image,
              'packages': packages}
    encoded = json.dumps(report, sort_keys=True, indent=2)
    try:
        write_diagnostic_log('::group::Bazel host fingerprint diagnostics (JSON)\n' +
                             encoded + '\n::endgroup::\n')
    except Exception:
        diagnostic_warning()
    # A broken log sink must not prevent a usable summary, or vice versa.
    summary_path = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary_path:
        try:
            with Path(summary_path).open('a', encoding='utf-8') as summary:
                summary.write(
                    '\n<details><summary>호스트 지문·전체 입력·패키지 진단 (JSON)</summary>\n\n'
                    f'- 지문: `{host_hash}`\n'
                    f'- 해시 입력 파일: {len(manifest["files"])}개\n'
                    '- 패키지·이미지 메타데이터는 진단 전용이며 지문 계산에 넣지 않습니다.\n'
                    '- 소유 패키지·버전이 unknown이라고 파일이 같다는 뜻은 아닙니다.\n\n'
                    '<pre>' + html.escape(encoded) + '</pre>\n\n</details>\n')
        except Exception:
            diagnostic_warning()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--diagnostics', action='store_true',
                        help='write input JSON to stderr and GITHUB_STEP_SUMMARY (best effort)')
    args = parser.parse_args(argv)
    try:
        manifest = collect()
        host_hash = fingerprint(manifest)
        print(host_hash, flush=True)
    except (OSError, KeyError, RuntimeError, subprocess.SubprocessError) as error:
        print('Host fingerprint unavailable; use the image-isolated fallback: ' +
              str(error), file=sys.stderr)
        return 1
    if args.diagnostics:
        try:
            emit_diagnostics(manifest, host_hash)
        except Exception:
            diagnostic_warning()
    return 0


if __name__ == '__main__':
    sys.exit(main())
