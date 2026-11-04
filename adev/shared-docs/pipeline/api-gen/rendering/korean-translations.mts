/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 * Use of this source code is governed by an MIT-style license in the LICENSE file.
 */

export type TranslationCatalog = Readonly<Record<string, string>>;

/**
 * Translate only prose in extracted documentation, never symbols, types, options or source data.
 * Exact source matching deliberately falls back to English after an upstream sentence changes.
 */
export function translateDocumentation<T>(data: T, catalog: TranslationCatalog): T {
  function visit(value: unknown, isJsDocTag = false): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => visit(item, isJsDocTag));
    }
    if (value === null || typeof value !== 'object') {
      return value;
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => {
        const isProse =
          key === 'description' ||
          key === 'shortDescription' ||
          key === 'longDescription' ||
          (isJsDocTag &&
            key === 'comment' &&
            !['since', 'breaking-change'].includes((value as {name?: string}).name ?? ''));
        if (isProse && typeof child === 'string') {
          return [key, Object.hasOwn(catalog, child) ? catalog[child] : child];
        }
        return [key, visit(child, key === 'jsdocTags')];
      }),
    );
  }
  return visit(data) as T;
}

/** Only externally generated CLI/Aria/CDK docs use these catalogs. Framework data is untouched. */
export function getTranslationDomain(sourcePath: string): string | undefined {
  return sourcePath
    .replaceAll('\\', '/')
    .match(/(?:^|\/)adev\/src\/content\/(cli|aria|cdk)\//)?.[1];
}
