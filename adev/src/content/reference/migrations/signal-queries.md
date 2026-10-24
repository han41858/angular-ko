<!--
# Migration to signal queries
-->

<a id="migration-to-signal-queries"></a>

# 시그널 쿼리로 마이그레이션하기

<!--
Angular introduced improved APIs for queries that are considered
production ready as of v19.
Read more about signal queries and their benefits in the [dedicated guide](guide/components/queries).
-->

Angular는 개선된 쿼리 API를 도입했으며, v19부터 프로덕션 환경에서 사용할 수 있는 안정적인 API로 간주합니다.
시그널 쿼리와 장점에 대한 자세한 내용은 [전용 가이드](guide/components/queries)를 참고하세요.

<!--
To support existing teams that would like to use signal queries, the Angular team
provides an automated migration that converts existing decorator query fields to the new API.
-->

시그널 쿼리를 사용하려는 기존 팀을 지원하기 위해 Angular 팀은 기존 데코레이터 쿼리 필드를 새로운 API로 변환하는 자동 마이그레이션을 제공합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```bash
ng generate @angular/core:signal-queries-migration
```

<!--
Alternatively, the migration is available as a [code refactor action](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_refactoring) in VSCode.
Install the latest version of the VSCode extension and click onto e.g. a `@ViewChild` field.
See more details in the section [below](#vscode-extension).
-->

또는 VSCode에서 [코드 리팩토링 작업](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_refactoring)으로 마이그레이션할 수 있습니다.
VSCode 확장 프로그램을 최신 버전으로 설치하고 `@ViewChild` 같은 필드를 클릭하세요.
자세한 내용은 [아래 섹션](#vscode-extension)을 참고하세요.

<!--
## What does the migration change?
-->

<a id="what-does-the-migration-change"></a>

## 마이그레이션으로 무엇이 바뀌나요?

<!--
1. `@ViewChild()`, `@ViewChildren`, `@ContentChild` and `@ContentChildren` class members
   are updated to their signal equivalents.
2. References in your application to migrated queries are updated to call the signal.
   - This includes references in templates, host bindings or TypeScript code.
-->

1. `@ViewChild()`, `@ViewChildren`, `@ContentChild`, `@ContentChildren` 클래스 멤버를 이에 대응하는 시그널 API로 업데이트합니다.
2. 애플리케이션에서 마이그레이션한 쿼리를 참조하는 코드를 시그널을 호출하도록 업데이트합니다.
   - 템플릿, 호스트 바인딩, TypeScript 코드의 참조가 포함됩니다.

<!--
**Before**
-->

**이전**

```angular-ts
import {Component, ContentChild, ElementRef} from '@angular/core';

@Component({
  template: `Has ref: {{ ref ? 'Yes' : 'No' }}`,
})
export class MyComponent {
  @ContentChild('someRef') ref: ElementRef | undefined = undefined;

  someMethod(): void {
    if (this.ref) {
      this.ref.nativeElement;
    }
  }
}
```

<!--
**After**
-->

**이후**

```angular-ts
import {Component, contentChild, ElementRef} from '@angular/core';

@Component({
  template: `Has ref: {{ ref() ? 'Yes' : 'No' }}`,
})
export class MyComponent {
  readonly ref = contentChild<ElementRef>('someRef');

  someMethod(): void {
    const ref = this.ref();
    if (ref) {
      ref.nativeElement;
    }
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
By default, the migration will update your whole Angular CLI workspace.
You can limit the migration to a specific sub-directory using this option.
-->

기본적으로 마이그레이션은 Angular CLI 워크스페이스 전체를 업데이트합니다.
이 옵션으로 마이그레이션 범위를 특정 하위 디렉터리로 제한할 수 있습니다.

<!--
### `--best-effort-mode`
-->

<a id="--best-effort-mode"></a>

### `--best-effort-mode` 옵션

<!--
By default, the migration skips queries that cannot be safely migrated.
The migration tries to refactor code as safely as possible.
-->

기본적으로 마이그레이션은 안전하게 변환할 수 없는 쿼리를 건너뜁니다.
마이그레이션은 가능한 한 안전하게 코드를 리팩토링하려고 시도합니다.

<!--
When the `--best-effort-mode` flag is enabled, the migration eagerly
tries to migrate as much as possible, even if it could break your build.
-->

`--best-effort-mode` 플래그를 활성화하면 빌드가 실패할 가능성이 있더라도 최대한 많은 코드를 마이그레이션하려고 적극적으로 시도합니다.

<!--
### `--insert-todos`
-->

<a id="--insert-todos"></a>

### `--insert-todos` 옵션

<!--
When enabled, the migration will add TODOs to queries that couldn't be migrated.
The TODOs will include reasoning on why queries were skipped. E.g.
-->

활성화하면 마이그레이션하지 못한 쿼리에 TODO를 추가합니다.
TODO에는 해당 쿼리를 건너뛴 이유가 포함됩니다. 예를 들면 다음과 같습니다.

```ts
// TODO: Skipped for migration because:
//  Your application code writes to the query. This prevents migration.
@ViewChild('ref') ref?: ElementRef;
```

<!--
### `--analysis-dir`
-->

<a id="--analysis-dir"></a>

### `--analysis-dir` 옵션

<!--
In large projects you may use this option to reduce the amount of files being analyzed.
By default, the migration analyzes the whole workspace, regardless of the `--path` option, in
order to update all references affected by a query declaration being migrated.
-->

대규모 프로젝트에서는 이 옵션으로 분석할 파일 수를 줄일 수 있습니다.
기본적으로 마이그레이션은 쿼리 선언의 마이그레이션의 영향을 받는 모든 참조를 업데이트하기 위해 `--path` 옵션과 관계없이 워크스페이스 전체를 분석합니다.

<!--
With this option, you can limit analysis to a sub-folder. Note that this means that any
references outside this directory are silently skipped, potentially breaking your build.
-->

이 옵션으로 분석 범위를 하위 폴더로 제한할 수 있습니다. 다만 이 디렉터리 바깥의 참조는 별도 알림 없이 건너뛰므로 빌드가 실패할 수 있습니다.

<!--
## VSCode extension
-->

<a id="vscode-extension"></a>

## VSCode 확장 프로그램

<!--
![Screenshot of the VSCode extension and clicking on an `@ViewChild` field](assets/images/migrations/signal-queries-vscode.png 'Screenshot of the VSCode extension and clicking on an `@ViewChild` field.')
-->

![VSCode 확장 프로그램에서 `@ViewChild` 필드를 클릭한 화면](assets/images/migrations/signal-queries-vscode.png 'VSCode 확장 프로그램에서 `@ViewChild` 필드를 클릭한 화면')

<!--
The migration is available as a [code refactor action](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_refactoring) in VSCode.
-->

이 마이그레이션은 VSCode의 [코드 리팩토링 작업](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_refactoring)으로도 사용할 수 있습니다.

<!--
To make use of the migration via VSCode, install the latest version of the VSCode extension and either click:
-->

VSCode에서 마이그레이션을 사용하려면 VSCode 확장 프로그램을 최신 버전으로 설치하고 다음 중 하나를 클릭하세요.

<!--
- on a `@ViewChild`, `@ViewChildren`, `@ContentChild`, or `@ContentChildren` field.
- on a directive/component
-->

- `@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren` 필드
- 디렉티브 또는 컴포넌트

<!--
Then, wait for the yellow lightbulb VSCode refactoring button to appear.
Via this button you can then select the signal queries migration.
-->

그다음 노란 전구 모양의 VSCode 리팩토링 버튼이 나타날 때까지 기다리세요.
이 버튼에서 시그널 쿼리 마이그레이션을 선택할 수 있습니다.
