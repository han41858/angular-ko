#!/usr/bin/env python3
"""Fingerprint host inputs not tracked by Bazel; stdout is a SHA-256 or failure.

Audited with Bazel 8.8.2 aquery deps(//adev:build), 2026-10-28. Most tools
(Node, coreutils, tar, jq, esbuild) are declared Bazel inputs. The remaining
shell utilities and the shared runtime used by Node/Sass/native npm modules
need a host fingerprint. Re-audit when build rules/toolchains change.
New undeclared host dependencies require an audit; bump schema/cache epoch when
changing compatibility policy. This is not a claim of full hermeticity.
"""
import hashlib
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


if __name__ == '__main__':
    try:
        print(fingerprint(collect()))
    except (OSError, KeyError, RuntimeError, subprocess.SubprocessError) as error:
        print('Host fingerprint unavailable; use the image-isolated fallback: ' +
              str(error), file=sys.stderr)
        sys.exit(1)
