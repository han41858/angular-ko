<!--
# Advanced component configuration
-->

# 컴포넌트 고급 설정

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.
-->

팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

<!--
## ChangeDetectionStrategy
-->

<a id="changedetectionstrategy"></a>

<a id="변화-감지-정책"></a>

## 변경 감지 정책

<!--
The `@Component` decorator accepts a `changeDetection` option that controls the component's **change
detection mode**. There are two change detection mode options.

**`ChangeDetectionStrategy.Eager`/`Default`** is an optional mode. In this mode,
Angular checks whether the component's DOM needs an update whenever any activity may have occurred
application-wide. Activities that trigger this checking include user interaction, network response,
timers, and more.

**`ChangeDetectionStrategy.OnPush`** is the default strategy (since v22). This mode reduces the amount of checking Angular
needs to perform. In this mode, the framework only checks if a component's DOM needs an update when:

- A component input has changes as a result of a binding in a template, or
- An event listener in this component runs
- The component is explicitly marked for check, via `ChangeDetectorRef.markForCheck` or something which wraps it, like `AsyncPipe`.

Additionally, when an OnPush component is checked, Angular _also_ checks all of its ancestor
components, traversing upwards through the application tree.
-->

`@Component` 데코레이터의 `changeDetection` 옵션을 지정하면 **변경 감지 모드** 를 설정할 수 있습니다.
변경 감지 모드는 두 가지가 있습니다.

**`ChangeDetectionStrategy.Eager`/`Default`**는 선택해서 사용할 수 있는 모드입니다. 이 모드에서는 애플리케이션 어디에서든 사용자 상호작용, 네트워크 응답, 타이머 등의 활동이 발생했을 가능성이 있을 때, 해당 컴포넌트의 DOM을 갱신해야 하는지 검사합니다.

Angular v22 부터는 **`ChangeDetectionStrategy.OnPush`** 가 기본값입니다.
이 모드를 사용하면 성능 최적화를 위해 변경 감지 검사를 줄이며, 이런 경우만 검사합니다:

- 템플릿에 바인딩된 입력 프로퍼티가 변경될 때
- 컴포넌트의 이벤트 리스너가 실행될 때
- `ChangeDetectorRef.markForCheck` 또는 이를 내부적으로 사용하는 `AsyncPipe` 등을 통해 컴포넌트가 검사 대상으로 명시적으로 표시될 때

추가로, OnPush 컴포넌트에서 변화가 발생하면 Angular는 애플리케이션 트리를 따라 모든 부모 컴포넌트를 _함께_ 검사합니다.

<!--
## PreserveWhitespaces
-->

<a id="preservewhitespaces"></a>

## 공백문자 유지

<!--
By default, Angular removes and collapses superfluous whitespace in templates, most commonly from
newlines and indentation. You can change this setting by explicitly setting `preserveWhitespaces` to
`true` in a component's metadata.
-->

기본적으로 Angular는 템플릿에 존재하는 공백문자 중 너무 많은 줄바꿈과 들여쓰기 등 과도한 공백문자를 제거합니다.
이 동작은 컴포넌트 메타데이터에서 `preserveWhitespaces` 옵션을 `true`로 지정하면 변경할 수 있습니다.

<!--
## Custom element schemas
-->

<a id="custom-element-schemas"></a>

## 커스텀 엘리먼트 스키마

<!--
By default, Angular throws an error when it encounters an unknown HTML element. You can
disable this behavior for a component by including `CUSTOM_ELEMENTS_SCHEMA` in the `schemas`
property in your component metadata.

```angular-ts
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  ...,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<some-unknown-component />'
})
export class ComponentWithCustomElements { }
```

Angular also provides `NO_ERRORS_SCHEMA`, which allows any element and any property.
-->

기본적으로 Angular는 식별할 수 없는 HTML 엘리먼트를 발견하면 오류를 발생시킵니다.
이 동작은 컴포넌트 메타데이터에서 `schemas` 옵션에 `CUSTOM_ELEMENTS_SCHEMA`를 추가하면 비활성화할 수 있습니다.

```angular-ts
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  ...,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<some-unknown-component></some-unknown-component>'
})
export class ComponentWithCustomElements { }
```

Angular는 모든 엘리먼트와 프로퍼티를 허용하는 `NO_ERRORS_SCHEMA`도 제공합니다.
