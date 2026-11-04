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

function collect(value, fields, location = '', inTag = false) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collect(item, fields, `${location}[${index}]`, inTag));
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (
        (proseKeys.has(key) ||
          (inTag && key === 'comment' && !['since', 'breaking-change'].includes(value.name))) &&
        typeof child === 'string' &&
        child.trim()
      ) {
        fields.push({source: child, location: `${location}.${key}`});
      } else {
        collect(child, fields, `${location}.${key}`, key === 'jsdocTags');
      }
    }
  }
}

function protectedParts(text) {
  // These must not change when translating prose. Inline code can also be added for clarity.
  return {
    fences: [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map((match) => match[0]),
    links: [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]),
    jsdocLinks: [...text.matchAll(/\{@link\s+([^\s}]+)/g)].map((match) => match[1]),
  };
}

for (const domain of ['cli', 'aria', 'cdk']) {
  const sourceDir = path.join(root, 'adev/src/content', domain);
  const catalogPath = path.join(
    root,
    'adev/shared-docs/pipeline/api-gen/rendering/translations',
    `${domain}.ko.json`,
  );
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const fields = [];
  for (const filename of readdirSync(sourceDir).filter(
    (name) => name.endsWith('.json') && name !== '_build-info.json',
  )) {
    collect(JSON.parse(readFileSync(path.join(sourceDir, filename), 'utf8')), fields, filename);
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
    const before = protectedParts(source);
    const after = protectedParts(translation);
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
