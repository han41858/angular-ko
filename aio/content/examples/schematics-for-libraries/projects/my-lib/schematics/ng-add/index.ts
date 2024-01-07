import { Rule } from '@angular-devkit/schematics';
import { addRootImport } from '@schematics/angular/utility';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  // Add an import `MyLibModule` from `my-lib` to the root of the user's project.
  // `my-lib` 패키지에 있는 `MyLibModule`을 프로젝트 최상단에 로드합니다.
  return addRootImport(options.project, ({code, external}) =>
    code`${external('MyLibModule', 'my-lib')}`);
}
