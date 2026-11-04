/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 * Use of this source code is governed by an MIT-style license in the LICENSE file.
 */
import {getTranslationDomain, translateDocumentation} from '../korean-translations.mjs';

describe('Korean generated documentation overlays', () => {
  const catalog = {'Source description.': '원문 설명입니다.'};

  it('translates descriptions and nested tag comments without changing identifiers', () => {
    const data = {
      name: 'Source description.',
      type: 'Source description.',
      description: 'Source description.',
      options: [{name: 'name', shortDescription: 'Source description.'}],
      jsdocTags: [{name: 'returns', comment: 'Source description.'}],
      rawComment: 'Source description.',
      comment: 'Source description.',
    };
    const result = translateDocumentation(data, catalog);
    expect(result.description).toBe('원문 설명입니다.');
    expect(result.options[0].shortDescription).toBe('원문 설명입니다.');
    expect(result.jsdocTags[0].comment).toBe('원문 설명입니다.');
    expect(result.name).toBe(data.name);
    expect(result.type).toBe(data.type);
    expect(result.rawComment).toBe(data.rawComment);
    expect(result.comment).toBe(data.comment);
    expect(data.description).toBe('Source description.');
  });

  it('leaves new or changed upstream prose intact until reviewed', () => {
    const data = {description: 'Changed source description.', longDescription: null};
    expect(translateDocumentation(data, catalog)).toEqual(data);
  });

  it('preserves version metadata even when a catalog contains a matching key', () => {
    const data = {jsdocTags: [{name: 'breaking-change', comment: '23.0.0'}]};
    expect(translateDocumentation(data, {'23.0.0': '변경 금지'})).toEqual(data);
  });

  it('does not treat inherited object properties as catalog entries', () => {
    const data = {description: 'toString', shortDescription: '__proto__'};
    expect(translateDocumentation(data, {})).toEqual(data);
  });

  it('uses only the explicit cross-repository content directories', () => {
    expect(getTranslationDomain('adev/src/content/cli/build.json')).toBe('cli');
    expect(getTranslationDomain('/execroot/angular/adev/src/content/aria/aria-tabs.json')).toBe(
      'aria',
    );
    expect(getTranslationDomain('C:\\repo\\adev\\src\\content\\cdk\\cdk_testing.json')).toBe('cdk');
    expect(getTranslationDomain('adev/src/content/api/core.json')).toBeUndefined();
    expect(getTranslationDomain('packages/core/cli/file.json')).toBeUndefined();
  });
});
