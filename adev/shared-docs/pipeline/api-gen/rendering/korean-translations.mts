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
          key === 'deprecated' ||
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

/** Only explicit external collections and the primary Router API have Korean catalogs. */
export function getTranslationDomain(sourcePath: string, moduleName?: string): string | undefined {
  const normalizedPath = sourcePath.replaceAll('\\', '/');
  if (
    moduleName === '@angular/router' &&
    /(?:^|\/)adev\/src\/content\/api\/router_docs_api\.json$/.test(normalizedPath)
  ) {
    return 'router';
  }
  return normalizedPath.match(/(?:^|\/)adev\/src\/content\/(cli|aria|cdk)\//)?.[1];
}
