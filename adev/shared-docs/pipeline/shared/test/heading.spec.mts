/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {extractHeadingIds, findDuplicateIds, getIdFromHeading} from '../heading.mjs';

describe('getIdFromHeading', () => {
  it('should generate id from simple text', () => {
    expect(getIdFromHeading('My Heading')).toBe('my-heading');
  });

  it('should generate id from text with special characters', () => {
    expect(getIdFromHeading('Step 2 - Add component')).toBe('step-2---add-component');
  });

  it('should extract custom id when present', () => {
    expect(getIdFromHeading('My Heading {#custom-id}')).toBe('custom-id');
  });

  it('should extract custom id ignoring surrounding spaces', () => {
    expect(getIdFromHeading('My Heading {#  custom-id  }')).toBe('custom-id');
  });

  it('should prioritize custom id over text content', () => {
    expect(getIdFromHeading('Duplicate Heading {#unique-id}')).toBe('unique-id');
  });
});

describe('extractHeadingIds', () => {
  it('should collect ids for every heading below the page title', () => {
    const content = [
      '# Page title',
      '## First section',
      '### A subsection',
      '#### Deeper still',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual(['first-section', 'a-subsection', 'deeper-still']);
  });

  it('should collect ids for headings with leading spaces', () => {
    expect(extractHeadingIds('   ## Indented heading')).toEqual(['indented-heading']);
  });

  it('should collect ids for docs-step titles', () => {
    const content = [
      '## A section',
      '<docs-step title="Install the package">',
      '</docs-step>',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual(['a-section', 'install-the-package']);
  });

  it('should use the custom id when a heading declares one', () => {
    expect(extractHeadingIds('## Before {#migration-before}')).toEqual(['migration-before']);
  });

  it('should ignore headings inside fenced code blocks', () => {
    const content = [
      '## A real heading',
      '```md',
      '## Not a heading',
      '### Also not a heading',
      '```',
      '## Another real heading',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual(['a-real-heading', 'another-real-heading']);
  });

  it('should ignore original-language tracking comments without hiding translated headings', () => {
    const content = [
      '<!--',
      '## Original heading {#shared-id}',
      '```md',
      '## Commented sample',
      '```',
      '<docs-step title="Hidden step">',
      '<a id="hidden-alias"></a>',
      '-->',
      '## 번역된 제목 {#shared-id}',
      '### 지역 설정',
    ].join('\n');

    const ids = extractHeadingIds(content);
    expect(ids).toEqual(['shared-id', '지역-설정']);
    expect(findDuplicateIds(ids)).toEqual([]);
  });

  it('should retain visible content before and after inline and multiline comments', () => {
    const content = [
      '<!-- hidden -->## Visible heading <!-- hidden again -->',
      '<!-- starts here',
      '## Hidden heading',
      '--><a id="old-alias"></a><!-- hidden --><docs-step title="Visible step">',
      '## Last heading',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual([
      'visible-heading',
      'old-alias',
      'visible-step',
      'last-heading',
    ]);
  });

  it('should ignore every kind of target in fenced code without interpreting sample comments', () => {
    const content = [
      '````html',
      '```',
      '## Sample heading',
      '<docs-step title="Sample step">',
      '<a id="sample-alias"></a>',
      '<!-- An unclosed comment in a sample',
      '````',
      '~~~md',
      '## Another sample',
      '<docs-step title="Another sample step">',
      '<a id="another-sample-alias"></a>',
      '~~~',
      '## Real heading',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual(['real-heading']);
  });

  it('should collect explicit aliases and step titles in document order', () => {
    const content = [
      '<a id="old-alias"></a>',
      "<docs-step title='Install {#install-step}'>",
      '## 새 제목 {#new-heading}',
      '<a',
      "  class='anchor' id='이전-별칭'",
      '></a>',
      '<docs-step',
      '  title="Next step"',
      '>',
    ].join('\n');

    expect(extractHeadingIds(content)).toEqual([
      'old-alias',
      'install-step',
      'new-heading',
      '이전-별칭',
      'next-step',
    ]);
  });

  it('should not mistake data attributes for explicit anchor IDs or step titles', () => {
    expect(extractHeadingIds('<a data-id="not-an-id"></a>')).toEqual([]);
    expect(extractHeadingIds('<docs-step data-title="Not a title">')).toEqual([]);
  });

  it('should preserve real duplicate IDs between visible aliases and headings', () => {
    const ids = extractHeadingIds(
      '<a id="same-id"></a>\n## Visible heading {#same-id}\n## Again {#same-id}',
    );

    expect(ids).toEqual(['same-id', 'same-id', 'same-id']);
    expect(findDuplicateIds(ids)).toEqual(['same-id']);
  });
});

describe('findDuplicateIds', () => {
  it('should return an empty array when every id is unique', () => {
    expect(findDuplicateIds(['one', 'two', 'three'])).toEqual([]);
  });

  it('should return an id that appears twice', () => {
    expect(findDuplicateIds(['one', 'two', 'one'])).toEqual(['one']);
  });

  it('should report an id repeated many times only once', () => {
    expect(findDuplicateIds(['one', 'one', 'one', 'one'])).toEqual(['one']);
  });

  it('should return every duplicated id', () => {
    expect(findDuplicateIds(['before', 'after', 'before', 'after'])).toEqual(['before', 'after']);
  });
});
