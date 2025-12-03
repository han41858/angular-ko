/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

// Set by the test initialization scripts.

<<<<<<<< HEAD:packages/private/testing/src/globals.ts
export const isBrowser = !!(globalThis as any).isBrowser;
export const isNode = !!(globalThis as any).isNode;
========
export const LOCAL_STORAGE = new InjectionToken<typeof localStorage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => localStorage,
});
>>>>>>>> org/21.0.x:devtools/src/local-storage.ts
