<!--
# Migration to output function
-->

<a id="migration-to-output-function"></a>

# output 함수로 마이그레이션하기

<!--
Angular introduced an improved API for outputs in v17.3 that is considered
production ready as of v19. This API mimics the `input()` API but is not based on Signals.
Read more about custom events output function and its benefits in the [dedicated guide](guide/components/outputs).
-->

Angular는 v17.3에서 개선된 출력 API를 도입했으며, v19부터 프로덕션 환경에서 사용할 수 있는 안정적인 API로 간주합니다. 이 API는 `input()` API와 비슷하지만 시그널을 기반으로 하지 않습니다.
사용자 정의 이벤트를 위한 output 함수와 장점에 대한 자세한 내용은 [전용 가이드](guide/components/outputs)를 참고하세요.

<!--
To support existing projects that would like to use output function, the Angular team
provides an automated migration that converts `@Output` custom events to the new `output()` API.
-->

output 함수를 사용하려는 기존 프로젝트를 지원하기 위해 Angular 팀은 `@Output` 사용자 정의 이벤트를 새로운 `output()` API로 변환하는 자동 마이그레이션을 제공합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```bash
ng generate @angular/core:output-migration
```

<!--
## What does the migration change?
-->

<a id="what-does-the-migration-change"></a>

## 마이그레이션으로 무엇이 바뀌나요?

<!--
1. `@Output()` class members are updated to their `output()` equivalent.
2. Imports in the file of components or directives, at TypeScript module level, are updated as well.
3. Migrates API calls like `event.next()`, whose use is not recommended, to `event.emit()` and removes `event.complete()` calls.
-->

1. `@Output()` 클래스 멤버를 이에 대응하는 `output()`으로 업데이트합니다.
2. 컴포넌트나 디렉티브 파일의 TypeScript 모듈 수준 임포트도 업데이트합니다.
3. 사용이 권장되지 않는 `event.next()` 같은 API 호출을 `event.emit()`으로 변환하고 `event.complete()` 호출을 제거합니다.

<!--
**Before**
-->

**이전**

```typescript
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  template: `<button (click)="someMethod('test')">emit</button>`,
})
export class MyComponent {
  @Output() someChange = new EventEmitter<string>();

  someMethod(value: string): void {
    this.someChange.emit(value);
  }
}
```

<!--
**After**
-->

**이후**

```typescript
import {Component, output} from '@angular/core';

@Component({
  template: `<button (click)="someMethod('test')">emit</button>`,
})
export class MyComponent {
  readonly someChange = output<string>();

  someMethod(value: string): void {
    this.someChange.emit(value);
  }
}
```

<!--
## Configuration options
-->

<a id="configuration-options"></a>

## 설정 옵션

<!--
The migration supports a few options for fine tuning the migration to your specific needs.
-->

이 마이그레이션은 요구 사항에 맞게 동작을 조정할 수 있는 몇 가지 옵션을 지원합니다.

<!--
### `--path`
-->

<a id="--path"></a>

### `--path` 옵션

<!--
If not specified, the migration will ask you for a path and update your whole Angular CLI workspace.
You can limit the migration to a specific sub-directory using this option.
-->

지정하지 않으면 마이그레이션이 경로를 묻고 Angular CLI 워크스페이스 전체를 업데이트합니다.
이 옵션으로 마이그레이션 범위를 특정 하위 디렉터리로 제한할 수 있습니다.

<!--
### `--analysis-dir`
-->

<a id="--analysis-dir"></a>

### `--analysis-dir` 옵션

<!--
In large projects you may use this option to reduce the amount of files being analyzed.
By default, the migration analyzes the whole workspace, regardless of the `--path` option, in
order to update all references affected by an `@Output()` migration.
-->

대규모 프로젝트에서는 이 옵션으로 분석할 파일 수를 줄일 수 있습니다.
기본적으로 마이그레이션은 `@Output()` 마이그레이션의 영향을 받는 모든 참조를 업데이트하기 위해 `--path` 옵션과 관계없이 워크스페이스 전체를 분석합니다.

<!--
With this option, you can limit analysis to a sub-folder. Note that this means that any
references outside this directory are silently skipped, potentially breaking your build.
-->

이 옵션으로 분석 범위를 하위 폴더로 제한할 수 있습니다. 다만 이 디렉터리 바깥의 참조는 별도 알림 없이 건너뛰므로 빌드가 실패할 수 있습니다.

<!--
Use these options as shown below:
-->

다음과 같이 옵션을 사용하세요.

```bash
ng generate @angular/core:output-migration --path src/app/sub-folder
```

<!--
## Exceptions
-->

<a id="exceptions"></a>

## 예외

<!--
In some cases, the migration will not touch the code.
One of these exceptions is the case where the event is used with a `pipe()` method outside a test file.
The following code won't be migrated:
-->

일부 경우에는 마이그레이션이 코드를 수정하지 않습니다.
예를 들어 테스트 파일 외부에서 이벤트의 `pipe()` 메서드를 사용하는 경우가 해당합니다.
다음 코드는 마이그레이션되지 않습니다.

```typescript
export class MyDialogComponent {
  @Output() close = new EventEmitter<void>();
  doSome(): void {
    this.close.complete();
  }
  otherThing(): void {
    this.close.pipe();
  }
}
```

<!--
In a test file the migration rewrites the usage instead of skipping the output, so `this.close.pipe(…)` becomes `outputToObservable(this.close).pipe(…)`.
-->

테스트 파일에서는 출력을 건너뛰는 대신 사용 코드를 다시 작성하므로 `this.close.pipe(…)`는 `outputToObservable(this.close).pipe(…)`로 바뀝니다.

<!--
NOTE: The migration recognizes a test file by looking for an import whose path contains `jasmine` or `catalyst`. It does not recognize a file that only imports Jest or Vitest, so it skips the output there instead of rewriting it.
-->

NOTE: 마이그레이션은 임포트 경로에 `jasmine` 또는 `catalyst`가 포함되어 있는지 확인하여 테스트 파일을 식별합니다. Jest나 Vitest만 임포트하는 파일은 테스트 파일로 인식하지 않으므로 사용 코드를 다시 작성하는 대신 해당 출력을 건너뜁니다.
