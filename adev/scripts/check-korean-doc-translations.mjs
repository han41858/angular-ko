/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 * Use of this source code is governed by an MIT-style license in the LICENSE file.
 */
import {readFileSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
let invalid = false;
const proseKeys = new Set(['description', 'shortDescription', 'longDescription']);

function collect(value, fields, location = '', inTag = false, includeDeprecated = false) {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collect(item, fields, `${location}[${index}]`, inTag, includeDeprecated),
    );
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (
        (proseKeys.has(key) ||
          (includeDeprecated && key === 'deprecated') ||
          (inTag && key === 'comment' && !['since', 'breaking-change'].includes(value.name))) &&
        typeof child === 'string' &&
        child.trim()
      ) {
        fields.push({source: child, location: `${location}.${key}`});
      } else {
        collect(child, fields, `${location}.${key}`, key === 'jsdocTags', includeDeprecated);
      }
    }
  }
}

function isDescriptiveComment(text) {
  // Preserve directives, documentation markers, and code-shaped comments verbatim.
  return (
    /[a-zA-Z가-힣]/.test(text) &&
    !/@|^\s*(?:#|(?:end)?region\b|eslint\b|tslint\b|prettier\b|noinspection\b|source(?:Mapping)?URL\b)/i.test(
      text,
    )
  );
}

function protectFence(fence, ts) {
  if (!ts) return fence;
  const [opening, ...body] = fence.split('\n');
  const language = opening.slice(3).trim().split(/\s+/)[0].toLowerCase();
  if (/^(?:angular-ts|ts|typescript|js|javascript|tsx|jsx|mjs)$/.test(language)) {
    const code = body.slice(0, -1).join('\n');
    const kind = /^(?:tsx|jsx)$/.test(language) ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile('example', code, ts.ScriptTarget.Latest, false, kind);
    const comments = new Map();
    function visit(node) {
      // Use parser token boundaries so // in strings, URLs or template text is not a comment.
      const ranges = [
        ...(ts.getLeadingCommentRanges(code, node.getFullStart()) ?? []),
        ...(ts.getTrailingCommentRanges(code, node.end) ?? []),
      ];
      for (const range of ranges) {
        if (
          range.kind === ts.SyntaxKind.SingleLineCommentTrivia &&
          isDescriptiveComment(code.slice(range.pos + 2, range.end))
        ) {
          comments.set(range.pos, range.end);
        }
      }
      for (const child of node.getChildren(sourceFile)) visit(child);
    }
    visit(sourceFile);
    let protectedCode = code;
    for (const [pos, end] of [...comments].sort(([a], [b]) => b - a)) {
      protectedCode = protectedCode.slice(0, pos + 2) + protectedCode.slice(end);
    }
    return [opening, protectedCode, body.at(-1)].join('\n');
  }
  if (language === 'html' && !/<(?:script|style)\b/i.test(fence)) {
    return [
      opening,
      ...body.map((line) =>
        line.replace(/^(\s*<!--\s+)([^<>]*?)(\s+-->\s*)$/, (match, open, comment, close) =>
          isDescriptiveComment(comment) ? open + close : match,
        ),
      ),
    ].join('\n');
  }
  return fence;
}

function protectedParts(text, ts) {
  return {
    fences: [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map((match) =>
      protectFence(match[0], ts),
    ),
    links: [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]),
    jsdocLinks: [...text.matchAll(/\{@link\s+([^\s}]+)/g)].map((match) => match[1]),
  };
}

const args = process.argv.slice(2);
if (args.length !== 0 && (args.length !== 2 || args[0] !== '--router')) {
  console.error(
    'Usage: node adev/scripts/check-korean-doc-translations.mjs [--router <router_docs_api.json>]',
  );
  process.exit(2);
}

const domains = args.length ? ['router'] : ['cli', 'aria', 'cdk'];
const typescript = args.length ? (await import('typescript')).default : undefined;
for (const domain of domains) {
  const sourceDir = path.join(root, 'adev/src/content', domain);
  const catalogPath = path.join(
    root,
    'adev/shared-docs/pipeline/api-gen/rendering/translations',
    `${domain}.ko.json`,
  );
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const fields = [];
  if (domain === 'router') {
    const source = JSON.parse(readFileSync(args[1], 'utf8'));
    if (source.moduleName !== '@angular/router' || !source.entries?.length) {
      console.error('Expected the nonempty Bazel extraction JSON for @angular/router.');
      process.exit(2);
    }
    collect(source.entries, fields, 'entries');
  } else {
    for (const filename of readdirSync(sourceDir).filter(
      (name) => name.endsWith('.json') && name !== '_build-info.json',
    )) {
      collect(
        JSON.parse(readFileSync(path.join(sourceDir, filename), 'utf8')),
        fields,
        filename,
        false,
        domain === 'cli',
      );
    }
  }
  const sources = new Set(fields.map(({source}) => source));
  const missing = fields.filter(({source}) => !Object.hasOwn(catalog, source));
  const stale = Object.keys(catalog).filter((source) => !sources.has(source));
  const issues = [];
  for (const [source, translation] of Object.entries(catalog)) {
    if (typeof translation !== 'string' || !translation.trim()) {
      issues.push('Empty or non-string translation');
      continue;
    }
    const before = protectedParts(source, typescript);
    const after = protectedParts(translation, typescript);
    for (const key of Object.keys(before)) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        issues.push(`${key} changed: ${source.slice(0, 100)}`);
      }
    }
  }
  console.log(
    `${domain}: ${fields.length} prose fields, ${sources.size} unique sources, ${missing.length} missing, ${stale.length} stale, ${issues.length} structural issues`,
  );
  for (const field of missing.slice(0, 10))
    console.error(`Missing: ${field.location}: ${field.source.slice(0, 100)}`);
  for (const issue of issues) console.error(issue);
  if (stale.length) console.warn(`Review unused catalog entries: ${stale.length}`);
  invalid ||= missing.length > 0 || issues.length > 0;
}
process.exitCode = invalid ? 1 : 0;
