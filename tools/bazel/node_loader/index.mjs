/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {HasRepo} from '../entities/traits.mjs';

<<<<<<<< HEAD:adev/shared-docs/pipeline/api-gen/rendering/transforms/repo.mts
export function addRepo<T>(entry: T, repo: string): T & HasRepo {
  return {
    ...entry,
    repo,
  };
}
========
register('./hooks.mjs', {parentURL: import.meta.url});
>>>>>>>> org/21.0.x:tools/bazel/node_loader/index.mjs
