/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Extracts the ID from a heading text.
 * Supports custom ID syntax: `## My Heading {#custom-id}`
 */
export function getIdFromHeading(heading: string): string {
  // extract the extended markdown heading id
  // ex:  ## MyHeading {# myId}
  // This is recommended in case we end up having duplicate Ids but we still want the same heading text.
  // We don't want to make Id generation stateful/too complex to handle duplicates automatically.
  const customIdRegex = /{#\s*([\w-]+)\s*}/g;
  const customId = customIdRegex.exec(heading)?.[1];

  if (customId) {
    return customId;
  }

  return heading
    .toLowerCase()
    .replace(/\s|\//g, '-') // replace spaces and slashes with dashes
    .replace(/[^\p{L}\d\-]/gu, ''); // only keep letters, digits & dashes
}

/**
 * Extracts visible heading and explicit anchor IDs in document order.
 * H1 is reserved for the page title. HTML comments and fenced code blocks
 * cannot contribute headings, docs-step titles, or explicit anchor aliases.
 */
export function extractHeadingIds(content: string): string[] {
  const visibleLines: string[] = [];
  let insideComment = false;
  let fence: string | undefined;

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim();
    const fenceMatch = /^(`{3,}|~{3,})(.*)$/.exec(trimmedLine);

    if (fence !== undefined) {
      // A closing fence must use the same character and at least the opening length.
      if (
        fenceMatch &&
        fenceMatch[1][0] === fence[0] &&
        fenceMatch[1].length >= fence.length &&
        fenceMatch[2].trim() === ''
      ) {
        fence = undefined;
      }
      visibleLines.push('');
      continue;
    }

    if (!insideComment && fenceMatch) {
      fence = fenceMatch[1];
      visibleLines.push('');
      continue;
    }

    let visible = '';
    let offset = 0;
    while (offset < line.length) {
      if (insideComment) {
        const end = line.indexOf('-->', offset);
        if (end === -1) break;
        insideComment = false;
        offset = end + 3;
      } else {
        const start = line.indexOf('<!--', offset);
        if (start === -1) {
          visible += line.slice(offset);
          break;
        }
        visible += line.slice(offset, start);
        insideComment = true;
        offset = start + 4;
      }
    }
    visibleLines.push(visible);
  }

  const ids: string[] = [];
  const visibleContent = visibleLines.join('\n');
  const targetRegex = /^[ \t]*#{2,6}[ \t]+(.+)$|<(docs-step|a)\b([^>]*)>/gim;
  let match;
  while ((match = targetRegex.exec(visibleContent)) !== null) {
    if (match[1] !== undefined) {
      ids.push(getIdFromHeading(match[1].trim()));
    } else {
      const isStep = match[2].toLowerCase() === 'docs-step';
      const attributeRegex = isStep
        ? /(?:^|\s)title\s*=\s*(["'])(.*?)\1/is
        : /(?:^|\s)id\s*=\s*(["'])(.*?)\1/is;
      const value = attributeRegex.exec(match[3])?.[2];
      if (value !== undefined) {
        ids.push(isStep ? getIdFromHeading(value) : value);
      }
    }
  }
  return ids;
}

/** Returns the IDs that appear more than once, each reported once. */
export function findDuplicateIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.add(id);
    }
    seen.add(id);
  }

  return Array.from(duplicates);
}
