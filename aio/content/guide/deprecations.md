<!--
# Deprecated APIs and features
-->
# 지원이 중단된 기능

<!--
Angular strives to balance innovation and stability.
Sometimes, APIs and features become obsolete and need to be removed or replaced so that Angular can stay current with new best practices, changing dependencies, or changes in the (web) platform itself.

To make these transitions as easy as possible, we deprecate APIs and features for a period of time before removing them. This gives you time to update your applications to the latest APIs and best practices.

This guide contains a summary of all Angular APIs and features that are currently deprecated.
-->
Angular는 혁신과 안정성 사이에서 균형을 추구합니다.
그래서 특정 API나 기능이 더이상 필요없다면 이 기능을 제거하거나 다른 기능으로 대체하면서 누구나 Angular를 최선의 방식으로 활용할 수 있도록 관리하고 있습니다.
가끔은 의존성 패키지가 변경되거나 플랫폼과 관련된 기능이 변경되기도 합니다.

이런 변화를 자연스럽게 도입할 수 있도록 지원이 중단되는 기능이나 API는 Angular에서 바로 제거되지 않고 약간 시간 여유를 둔 후에 제거됩니다.
지원이 중단되는 것으로 결정된 기능이 있다면 이 기간을 이용해서 더 나은 방식으로 변경하는 것이 좋습니다.

이 문서는 Angular가 제공하던 기능이나 API 중에서 지금은 지원이 중단된 기능에 대해 안내합니다.

<div class="alert is-helpful">

<!--
Features and APIs that were deprecated in v6 or earlier are candidates for removal in version 9 or any later major version. For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io).
-->
Angular 6 버전까지 지원이 중단되기로 계획되었던 기능들은 Angular 9 버전부터 완전히 제거됩니다.
자세한 내용은 [Angular의 릴리즈 정책](guide/releases#deprecation-practices "Angular의 릴리즈 정책: 지원이 중단되는 기능") 문서를 참고하세요.

그리고 지원이 중단되는 기능을 단계별로 수정하는 방법에 대해 알아보려면 [update.angular.io](https://update.angular.io) 가이드를 참고하세요.

</div>


{@a index}
<!--
## Index
-->
## 목차

<!--
To help you future-proof your projects, the following table lists all deprecated APIs and features, organized by the release in which they are candidates for removal. Each item is linked to the section later in this guide that describes the deprecation reason and replacement options.
-->
이 문서에서 설명하는 기능이나 API는 모두 지원이 중단됩니다.
각각의 링크를 클릭해서 해당 기능이 왜 없어지는지, 어떻게 변경되는지 확인해 보세요.

<!--
deprecation -> removal cheat sheet
v4 - v7
v5 - v8
v6 - v9
v7 - v10
v8 - v11
v9 - v12
v10 - v13
v11 - v14
v12 - v15
-->

<!--
| Area                          | API or Feature                                                                | May be removed in |
| ----------------------------- | ---------------------------------------------------------------------------   | ----------------- |
| `@angular/common`             | [`ReflectiveInjector`](#reflectiveinjector)                                   | <!--v8--> v11 |
| `@angular/common`             | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | <!--v9--> v11 |
| `@angular/common/http`        | [`XhrFactory`](api/common/http/XhrFactory)                                    | <!--v12--> v15 |
| `@angular/core`               | [`DefaultIterableDiffer`](#core)                                              | <!--v7--> v11 |
| `@angular/core`               | [`ReflectiveKey`](#core)                                                      | <!--v8--> v11 |
| `@angular/core`               | [`RenderComponentType`](#core)                                                | <!--v7--> v11 |
| `@angular/core`               | [`WrappedValue`](#core)                                                       | <!--v10--> v12 |
| `@angular/forms`              | [`ngModel` with reactive forms](#ngmodel-reactive)                            | <!--v6--> v11 |
| `@angular/upgrade`            | [`@angular/upgrade`](#upgrade)                                                | <!--v8--> v11 |
| `@angular/upgrade`            | [`getAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| `@angular/upgrade`            | [`setAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| template syntax               | [`<template`>](#template-tag)                                                 | <!--v7--> v11 |
| polyfills                     | [reflect-metadata](#reflect-metadata)                                         | <!--v8--> v11 |
| npm package format            | [`esm5` and `fesm5` entry-points in @angular/* npm packages](guide/deprecations#esm5-fesm5) | <!-- v9 --> v11 |
| `@angular/core`               | [`defineInjectable`](#core)                                                   | <!--v8--> v11 |
| `@angular/core`               | [`entryComponents`](api/core/NgModule#entryComponents)                        | <!--v9--> v11 |
| `@angular/core`               | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)       | <!--v9--> v11 |
| `@angular/router`             | [`loadChildren` string syntax](#loadChildren)                                 | <!--v9--> v11 |
| `@angular/core/testing`       | [`TestBed.get`](#testing)                                                     | <!--v9--> v12 |
| `@angular/core/testing`       | [`async`](#testing)                                                           | <!--v9--> v12 |
| `@angular/forms`              | [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group)   | <!--v11--> v14 |
| `@angular/router`             | [`ActivatedRoute` params and `queryParams` properties](#activatedroute-props) | unspecified |
| template syntax               | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)            | <!--v7--> unspecified |

For information about Angular CDK and Angular Material deprecations, see the [changelog](https://github.com/angular/components/blob/master/CHANGELOG.md).
-->

| 영역                   | API, 기능                                                                | 지원 중단 |
| ---------------------- | ---------------------------------------------------------------------------   | ----------------- |
| `@angular/common`             | [`ReflectiveInjector`](#reflectiveinjector)                                   | <!--v8--> v11 |
| `@angular/common`             | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | <!--v9--> v11 |
| `@angular/common/http`        | [`XhrFactory`](api/common/http/XhrFactory)                                    | <!--v12--> v15 |
| `@angular/core`               | [`DefaultIterableDiffer`](#core)                                              | <!--v7--> v11 |
| `@angular/core`               | [`ReflectiveKey`](#core)                                                      | <!--v8--> v11 |
| `@angular/core`               | [`RenderComponentType`](#core)                                                | <!--v7--> v11 |
| `@angular/core`               | [`WrappedValue`](#core)                                                       | <!--v10--> v12 |
| `@angular/forms`              | [반응형 폼이 제공하는 `ngModel`](#ngmodel-reactive)                            | <!--v6--> v11 |
| `@angular/upgrade`            | [`@angular/upgrade`](#upgrade)                                                | <!--v8--> v11 |
| `@angular/upgrade`            | [`getAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| `@angular/upgrade`            | [`setAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| 템플릿 문법               | [`<template`>](#template-tag)                                                 | <!--v7--> v11 |
| 폴리필                     | [reflect-metadata](#reflect-metadata)                                         | <!--v8--> v11 |
| npm 패키지 형식            | [@angular/* npm 패키지가 제공하는 `esm5`, `fesm5` 진입점](guide/deprecations#esm5-fesm5) | <!-- v9 --> v11 |
| `@angular/core`               | [`defineInjectable`](#core)                                                   | <!--v8--> v11 |
| `@angular/core`               | [`entryComponents`](api/core/NgModule#entryComponents)                        | <!--v9--> v11 |
| `@angular/core`               | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)       | <!--v9--> v11 |
| `@angular/router`             | [`loadChildren` string syntax](#loadChildren)                                 | <!--v9--> v11 |
| `@angular/core/testing`       | [`TestBed.get`](#testing)                                                     | <!--v9--> v12 |
| `@angular/core/testing`       | [`async`](#testing)                                                           | <!--v9--> v12 |
| `@angular/forms`              | [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group)   | <!--v11--> v14 |
| `@angular/router`             | [`ActivatedRoute` 인자, `queryParams` 프로퍼티](#activatedroute-props) | 미확정 |
| 템플릿 문법               | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)            | <!--v7--> 미확정 |

Angular CDK와 Angular Material에서 지원이 중단되는 기능을 확인하려면 [이 체인지 로그](https://github.com/angular/components/blob/master/CHANGELOG.md)를 확인하세요.


{@a deprecated-apis}
<!--
## Deprecated APIs
-->
## 지원이 중단된 API

<!--
This section contains a complete list all of the currently-deprecated APIs, with details to help you plan your migration to a replacement.
-->
이 섹션에서는 지금까지 지원이 중단된 API에 대해 소개하고, 이 API를 사용하고 있다면 어떻게 수정하면 되는지 안내합니다.


<div class="alert is-helpful">

<!--
Tip: In the [API reference section](api) of this site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).
-->
팁: [API 스펙](api) 문서에서 지원이 중단된 API는 ~~취소선~~으로 표시됩니다.
 그리고 해당 문서에서 지원이 중단된 기능만 보려면 [**Status: deprecated**](api?status=deprecated)를 선택하면 됩니다.

</div>

{@a common}
### @angular/common

<!--
| API                                                                                           | Replacement                                         | Deprecation announced | Notes |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | From v11 the default code will be extracted from the locale data given by `LOCAL_ID`, rather than `USD`. |
-->
| API                                                                                           | 대체 방식                                         | 지원 중단 발표 | 참고 |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | `LOCAL_ID`의 기본값은 `USD` 였지만 v11 부터는 제거됩니다. |


{@a common-http}
### @angular/common/http

| API                                          | Replacement                          | Deprecation announced | Notes |
| -------------------------------------------- | ------------------------------------ | --------------------- | ----- |
| [`XhrFactory`](api/common/http/XhrFactory)   | `XhrFactory` in `@angular/common`    | v12                   | The `XhrFactory` has moved from `@angular/common/http` to `@angular/common`. |


{@a core}
### @angular/core

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | n/a | v4 | Not part of public API. |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | `{@link Injector#create Injector.create()}` | v5 | See [`ReflectiveInjector`](#reflectiveinjector) |
| [`ReflectiveKey`](api/core/ReflectiveKey) | none | v5 | none |
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | Used only in generated code. No source code should depend on this API. |
| [`entryComponents`](api/core/NgModule#entryComponents) | none | v9 | See [`entryComponents`](#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | none | v9 | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) |
| [`WrappedValue`](api/core/WrappedValue) | none | v10 | See [removing `WrappedValue`](#wrapped-value) |
| [`async`](api/core/testing/async) | [`waitForAsync`](api/core/testing/waitForAsync) | v11 | The `async` function from `@angular/core/testing` has been renamed to `waitForAsync` in order to avoid confusion with the native JavaScript `async` syntax. The existing function is deprecated and will be removed in a future version. |
[ `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly` | none (was part of [issue #40091](https://github.com/angular/angular/issues/40091)) ] | This is a temporary flag introduced as part of bugfix of [issue #40091](https://github.com/angular/angular/issues/40091) and will be removed. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | - | v4 | public API에서 제거됩니다. |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) |  `{@link Injector#create Injector.create()}` | v5 | [`ReflectiveInjector`](#reflectiveinjector) 참고 |
| [`ReflectiveKey`](api/core/ReflectiveKey) | - | v5 | - |
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | 자동 생성된 코드에만 사용됩니다. 실제로는 사용되지 않습니다. |
| [`entryComponents`](api/core/NgModule#entryComponents) | - | v9 | [`entryComponents`](#entryComponents) 참고 |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | - | v9 | [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) 참고 |
| [`WrappedValue`](api/core/WrappedValue) | - | v10 | [removing `WrappedValue`](#wrapped-value) 참고 |
| [`async`](api/core/testing/async) | [`waitForAsync`](api/core/testing/waitForAsync) | v11 | 표준 JavaScript `async` 와 혼동되는 것을 피하기 위해 `@angular/core/testing`이 제공하던 `async` 함수가 `waitForAsync`로 변경되었습니다. 기존에 있던 함수는 이후 버전에 제거될 예정입니다. |
[ `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly` | - ([이슈 #40091](https://github.com/angular/angular/issues/40091) 참고) ] | 이 플래그는 [이슈 #40091](https://github.com/angular/angular/issues/40091) 버그를 해결하기 위해 임시로 도입되었으며 이제 사용되지 않습니다. |


{@a testing}
### @angular/core/testing

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | Same behavior, but type safe. |
| [`async`](api/core/testing/async) | [`waitForAsync`](api/core/testing/waitForAsync) | v10 | Same behavior, but rename to avoid confusion. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | 같은 동작을 하지만 타입 검사에 더 유리합니다. |
| [`async`](api/core/testing/async) | [`waitForAsync`](api/core/testing/waitForAsync) | v10 | 같은 동작을 합니다. 혼동을 피하기 위해 이름이 변경되었습니다. |


{@a forms}
### @angular/forms

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`ngModel` with reactive forms](#ngmodel-reactive) | [`FormControlDirective`](api/forms/FormControlDirective) | v6 | none |
| [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group) | [`AbstractControlOptions` parameter value](api/forms/AbstractControlOptions) | v11 | none |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`ngModel` with reactive forms](#ngmodel-reactive) | [`FormControlDirective`](api/forms/FormControlDirective) | v6 | - |
| [`FormBuilder.group` 구형 옵션 인자](api/forms/FormBuilder#group) | [`AbstractControlOptions` 인자](api/forms/AbstractControlOptions) | v11 | - |


{@a upgrade}
### @angular/upgrade

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [모든 API](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |


{@a upgrade-static}
### @angular/upgrade/static

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
[`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |
[`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |

{@a deprecated-features}
<!--
## Deprecated features
-->
## 지원이 중단된 기능

<!--
This section lists all of the currently-deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section above. It also includes deprecated API usage scenarios or API combinations, to augment the information above.
-->
이 섹션에서는 템플릿 문법, 환경설정 옵션 등 [지원이 중단된 API](#deprecated-apis)에 다루지 않았던 지원 중단 기능에 대해 안내합니다.
그리고 이 섹션에서는 좀 더 복잡한 시나리오에 사용하는 API나 여러 API를 조합해서 사용하는 API 중 이제는 지원이 중단된 API에 대해서도 설명합니다.


{@a bazelbuilder}
<!--
### Bazel builder and schematics
-->
### Bazel 빌더, 스키매틱

<!--
Bazel builder and schematics were introduced in Angular Labs to let users try out Bazel without having to manage Bazel version and BUILD files.
This feature has been deprecated. For more information, please refer to the [migration doc](https://github.com/angular/angular/blob/master/packages/bazel/docs/BAZEL_SCHEMATICS.md).
-->
Bazel 빌더와 스키매틱은 Bazel 버전과 BUILD 파일을 신경쓰지 않고 Bazel을 사용하기 위해 Angular Labs에 도입되었습니다.
이 기능은 지원이 중단되었습니다.
자세한 내용은 [마이그레이션 안내 문서](https://github.com/angular/angular/blob/master/packages/bazel/docs/BAZEL_SCHEMATICS.md)를 참고하세요.


{@a wtf}
<!--
### Web Tracing Framework integration
-->
### 웹 트레이싱 프레임워크 지원

<!--
Angular previously has supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework/) for performance testing of Angular applications. This integration has not been maintained and defunct. As a result, the integration was deprecated in Angular version 8 and due to no evidence of any existing usage removed in version 9.
-->
Angular는 이전까지 애플리케이션의 성능을 측정할 때 [웹 트레이싱 프레임워크(Web Tracing Framework, WTF)](https://google.github.io/tracing-framework/)를 사용했습니다.
하지만 이 프레임워크는 더이상 관리되지 않기 때문에 Angular 8 버전부터 제거되기 시작했으며 Angular 9 버전에는 완전히 제거되었습니다.


{@a deep-component-style-selector}
<!--
### `/deep/`, `>>>` and `:ng-deep` component style selectors
-->
### 컴포넌트 스타일 셀렉터: `/deep/`, `>>>`, `:ng-deep`

<!--
The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep")
 in the Component Styles guide.
-->
섀도우 DOM 안쪽으로 자식 엘리먼트를 선택하는 셀렉터는 [최신 브라우저에서 지원하지 않기 때문에 제거되었습니다](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing).
이에 따라 Angular 3 버전에 존재하던 `/deep/`과 `>>>`, `::ng-deep`은 모두 Angular 4 버전부터 지원이 중단되는 것으로 계획되었습니다.
다만, 지원이 중단되기 전까지 이 기능이 꼭 필요하다면 이 중에서는 `::ng-deep`을 사용하는 것을 권장합니다.

더 자세한 내용은 컴포넌트 스타일 가이드 문서의 [/deep/, >>>, ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") 섹션을 참고하세요.


{@a template-tag}
<!--
### &lt;template&gt; tag
-->
### &lt;template&gt; 태그

<!--
The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/angular-compiler-options#enablelegacytemplate) guide.
-->
`<template>` 태그는 DOM에 존재하는 같은 이름의 엘리먼트와 혼동되는 것을 피하기 위해 이름이 변경되었습니다.
앞으로는 `<template>` 대신 `<ng-template>`을 사용하세요.
자세한 내용은 [AOT 컴파일](guide/angular-compiler-options#enablelegacytemplate) 문서를 참고하세요.


{@a ngmodel-reactive}
{@a ngmodel-with-reactive-forms}
<!--
### ngModel with reactive forms
-->
### 반응형 폼에 사용하는 ngModel

<!--
Support for using the `ngModel` input property and `ngModelChange` event with reactive
form directives has been deprecated in Angular v6 and will be removed in a future version
of Angular.

Now deprecated:

```html
<input [formControl]="control" [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

This has been deprecated for several reasons. First, developers have found this pattern
confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
an input/output property named `ngModel` on the reactive form directive that
approximates some, but not all, of the directive's behavior.
It allows getting and setting a value and intercepting value events, but
some of `ngModel`'s other features, such as
delaying updates with`ngModelOptions` or exporting the directive, don't work.

In addition, this pattern mixes template-driven and reactive forms strategies, which
prevents taking advantage of the full benefits of either strategy.
Setting the value in the template violates the template-agnostic
principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
the class removes the convenience of defining forms in the template.

To update your code before support is removed, you'll want to decide whether to stick
with reactive form directives (and get/set values using reactive forms patterns) or
switch over to template-driven directives.

After (choice 1 - use reactive forms):

```html
<input [formControl]="control">
```

```ts
this.control.setValue('some value');
```

After (choice 2 - use template-driven forms):

```html
<input [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

By default, when you use this pattern, you will see a deprecation warning once in dev
mode. You can choose to silence this warning by configuring
`ReactiveFormsModule` at import time:

```ts
imports: [
  ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
]
```

Alternatively, you can choose to surface a separate warning for each instance of this
pattern with a configuration value of `"always"`. This may help to track down where in the code
the pattern is being used as the code is being updated.
-->
반응형 폼이 제공하는 `ngModel` 입력 프로퍼티와 `ngModelChange` 이벤트가 Angular 6부터 지원이 중단되었으며, 이후 버전에는 완전히 제거될 예정입니다.

이전에는 이렇게 사용했습니다:

```html
<input [formControl]="control" [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

이 기능이 지원 중단된 이유가 몇가지 있습니다.
첫 번째는 개발자들이 이 패턴을 혼란스러워 했기 때문입니다.
이 패턴을 보면 `ngModel` 디렉티브가 사용된 것이라고 생각할 수 있지만, 실제로는 이름이 `ngModel`인 입출력 프로퍼티를 바인딩한 것입니다.
동작도 비슷하지만 조금 다릅니다.
이렇게 사용하면 `ngModel` 프로퍼티의 값을 참조하거나 이 프로퍼티에 값을 할당할 수 있지만, `ngModel` 디렉티브가 제공하는 기능을 활용하는 것은 아닙니다.
`ngModelOption`으로 값이 할당되는 것을 지연시키거나 디렉티브를 참조하는 것도 불가능합니다.

그리고 이 패턴은 템플릿 기반 폼 개발 방식과 반응형 폼 개발 방식이 섞인 형태이면서도, 각 방식의 장점을 얻을 수 없는 문법입니다.
반응형 폼 개발방식에서는 템플릿 안에서 값을 할당하는 것을 지양하고 있으며, 클래스에서 `FormControl`이나 `FormGroup`을 사용하는 것은 템플릿 기반 폼의 편리함을 버리는 것이기도 합니다.

그래서 이 기능은 지원이 중단되었으며, 앞으로는 반응형 폼을 사용할 것인지, 템플릿 기반 폼을 사용할 것인지 명확하게 정해야 합니다.


반응형 폼을 사용한다면:

```html
<input [formControl]="control">
```

```ts
this.control.setValue('some value');
```


템플릿 기반 폼을 사용한다면:

```html
<input [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

이후에도 이전 패턴을 사용하면 지원이 중단되었다는 경고 메시지를 확인할 수 있습니다.
개발 모드에서 이 경고 메시지를 표시하지 않으려면 `ReactiveFormsModule`을 로드할 때 플래그를 지정하면 됩니다:

```ts
imports: [
  ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
]
```

`never` 대신 `always` 옵션을 사용하면 이런 패턴이 사용될 때마다 경고 메시지를 출력할 수 있습니다.
수정해야 할 코드를 찾아야 할 때 이 옵션을 사용하면 됩니다.


{@a reflectiveinjector}
### ReflectiveInjector

<!--
In v5, Angular replaced the `ReflectiveInjector` with the `StaticInjector`. The injector no longer requires the Reflect polyfill, reducing application size for most developers.

Before:
-->
Angular 5버전부터 `ReflectiveInjector`가 `StaticInjector`로 변경되었습니다.
그 결과로 이제는 더이상 Reflect 폴리필이 사용되지 않기 때문에 Angular 애플리케이션의 빌드 결과물 크기도 더 작아졌습니다.

이전에는 이렇게 사용했습니다:

```
ReflectiveInjector.resolveAndCreate(providers);
```

<!--
After:
-->
이제는 이렇게 사용합니다:

```
Injector.create({providers});
```

{@a loadChildren}
<!--
### loadChildren string syntax
-->
### loadChildren 문법

<!--
When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

Before:

```
const routes: Routes = [{
  path: 'lazy',
  // The following string syntax for loadChildren is deprecated
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```
-->
Angular에 지연 라우팅이 처음 등장했을 때는 브라우저가 JavaScript 리소스를 추가로, 동적으로 로딩하는 기능이 없었습니다.
그래서 Angular는 이 기능을 구현하기 위해 독자적으로 `loadChildren: './lazy/lazy.module#LazyModule'`와 같은 문법을 만들어냈습니다.
하지만 이제는 ECMAScript의 동적 로딩 기능을 브라우저 계층에서 지원하는 경우가 많아졌습니다.
그래서 Angular도 이전 방식 대신 새로운 방식을 활용하기로 결정했습니다.

Angular 8 버전부터는 이전까지 사용하던 [`loadChildren`](api/router/LoadChildren) 문법을 사용하지 않고, `import()`를 사용합니다.

이전에는 이렇게 사용했습니다:

```
const routes: Routes = [{
  path: 'lazy',
  // loadChildren에 문자열을 사용해서 지연로딩하는 문법은 이제 사용하지 않습니다.
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```

<!--
After:

```
const routes: Routes = [{
  path: 'lazy',
  // The new import() syntax
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```
-->
이제는 이렇게 사용합니다:

```
const routes: Routes = [{
  path: 'lazy',
  // 이제는 import() 문법을 사용합니다.
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```


<div class="alert is-helpful">


<!--
**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine).
-->
**8 버전으로 업데이트하기**: Angular를 8버전으로 올리기 위해 [`ng update`](cli/update) 명령을 실행하면 `loadChildren`으로 지연로딩하던 문법이 자동으로 수정됩니다.
7 버전까지는 `import()` 문법이 JIT 모드에서만 동작했습니다.

</div>

<div class="alert is-helpful">

<!--
**Declaration syntax**: It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`. You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113). These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.
-->
**선언형 문법(declaration syntax)**: `loadChildren` 프로퍼티를 사용해서 모듈을 지연로딩 하려면 `loadChildren: () => import('...').then(m => m.ModuleName)`와 같은 문법을 사용해야 `ngc`가 해당 모듈을 제대로 로드할 수 있습니다.
이 때 사용할 수 있는 문법에 대해서는 [이 문서](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113)를 참고하세요.
문법이 한정되어 있어서 개발자에게는 제약인 것처럼 느낄 수 있지만, 이 방식은 `NgFactories`를 사용하지 않기 때문에 Ivy를 도입하는 측면에서는 더 유리합니다.

</div>



{@a activatedroute-props}

<!--
### ActivatedRoute params and queryParams properties
-->
### ActivatedRoute 객체의 params와 queryParams 프로퍼티

<!--
[ActivatedRoute](api/router/ActivatedRoute) contains two [properties](api/router/ActivatedRoute#properties) that are less capable than their replacements and may be deprecated in a future Angular version.

| Property | Replacement |
| -------- | ----------- |
| `params` | `paramMap` |
| `queryParams` | `queryParamMap` |

For more information see the [Getting route information](guide/router-reference#activated-route) section of the [Router guide](guide/router).
-->
[ActivatedRoute](api/router/ActivatedRoute)에 있던 [프로퍼티](api/router/ActivatedRoute#properties) 중에서 자주 사용되지 않던 프로퍼티가 다른 타입의 프로퍼티로 대체되었습니다.

| 프로퍼티 | 대체 프로퍼티 |
| -------- | ----------- |
| `params` | `paramMap` |
| `queryParams` | `queryParamMap` |

자세한 내용은 [라우터](guide/router) 문서의 [라우팅 규칙에서 정보 얻기](guide/router-reference#activated-route) 섹션을 참고하세요.


{@a reflect-metadata}
<!--
### Dependency on a reflect-metadata polyfill in JIT mode
-->
### JIT 모드에서 사용하는 reflect-metadata 폴리필

<!--
Angular applications, and specifically applications that relied on the JIT compiler, used to require a polyfill for the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) APIs.

The need for this polyfill was removed in Angular version 8.0 ([see #14473](https://github.com/angular/angular-cli/pull/14473)), rendering the presence of the poylfill in most Angular applications unnecessary. Because the polyfill can be depended on by 3rd-party libraries, instead of removing it from all Angular projects, we are deprecating the requirement for this polyfill as of version 8.0. This should give library authors and application developers sufficient time to evaluate if they need the polyfill, and perform any refactoring necessary to remove the dependency on it.

In a typical Angular project, the polyfill is not used in production builds, so removing it should not impact production applications. The goal behind this removal is overall simplification of the build setup and decrease in the number of external dependencies.
-->
Angular 애플리케이션과 같이 JIT 컴파일러를 사용하는 애플리케이션은 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API를 사용하기 위해 폴리필이 필요했습니다.

이 폴리필은 Angular 8.0 버전부터 사용하지 않지만([#14473 참고](https://github.com/angular/angular-cli/pull/14473)), 서드파티 패키지에 의존성이 있었기 때문에 제거하지는 않았습니다.
이 버전에서는 단순하게 Angular가 직접 사용하는 reflect-metadata 관련 코드를 제거했을 뿐입니다.
당분간 이 패키지는 그대로 유지되겠지만 애플리케이션 개발자나 서드파티 라이브러리 개발자는 이 폴리필이 정말 필요한지 판단해보고 사용하지 않는 쪽으로 코드를 리팩토링하는 것이 나을 수 있습니다.

Angular 프로젝트를 운영용으로 빌드하더라도 폴리필이 사용되는 경우는 그리 많지 않기 때문에 이 폴리필이 제거되더라도 애플리케이션을 운영하는 데에는 큰 영향이 없습니다.
하지만 빌드 단계를 조금 더 단순하게 줄이고 외부 의존성을 정리하기 위해서는 최종적으로 폴리필을 제거하는 것이 좋습니다.


{@a static-query-resolution}
<!--
### `@ViewChild()` / `@ContentChild()` static resolution as the default
-->
### `@ViewChild()`, `@ContentChild()` 정적 평가

<!--
See the [dedicated migration guide for static queries](guide/static-query-migration).
-->
[정적 쿼리 적용 가이드 문서](guide/static-query-migration)를 참고하세요.

{@a contentchild-input-together}
<!--
### `@ContentChild()` / `@Input()` used together
-->
### `@ContentChild()`와 `@Input()`을 함께쓰는 문법

<!--
The following pattern is deprecated:
-->
다음과 같이 사용하던 패턴은 더이상 사용되지 않습니다:

```ts
@Input() @ContentChild(TemplateRef) tpl !: TemplateRef<any>;
```

<!--
Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:
-->
이 방법보다는 두 데코레이터를 따로 나눠서 다음과 같이 구현하는 것이 좋습니다:

```ts
@Input() tpl !: TemplateRef<any>;
@ContentChild(TemplateRef) inlineTemplate !: TemplateRef<any>;
```
{@a cant-assign-template-vars}
<!--
### Cannot assign to template variables
-->
### 템플릿 변수에 값을 직접 할당할 수 없습니다.

<!--
In the following example, the two-way binding means that `optionName`
should be written when the `valueChange` event fires.
-->
아래와 같이 작성된 코드가 있다면, 이 코드는 `valueChange` 이벤트가 발생했을 때 `optionName`의 값이 변경된다는 양방향 바인딩을 의미합니다.

```html
<option *ngFor="let optionName of options" [(value)]="optionName"></option>
```

<!--
However, in practice, Angular ignores two-way bindings to template variables. Starting in version 8, attempting to write to template variables is deprecated. In a future version, we will throw to indicate that the write is not supported.
-->
하지만 Angular는 템플릿 변수가 양방향 바인딩으로 연결되되더라도 템플릿 변수에 값을 할당하는 로직은 처리하지 않습니다.
그리고 이제 Angular 8 버전부터는 템플릿 변수에 값을 할당하는 로직 자체를 작성할 수 없습니다.
이 코드는 다음과 같이 작성되어야 하며, 이 코드를 그대로 남겨둔다면 이후 버전에서는 에러가 발생할 수도 있습니다.

```html
<option *ngFor="let optionName of options" [value]="optionName"></option>
```



{@a binding-to-innertext}
<!--
### Binding to `innerText` in `platform-server`
-->
### `platform-server`가 자동으로 변환하던 `innerText` 바인딩

<!--
[Domino](https://github.com/fgnass/domino), which is used in server-side rendering, doesn't support `innerText`, so in platform-server's "domino adapter", there was special code to fall back to `textContent` if you tried to bind to `innerText`.

These two properties have subtle differences, so switching to `textContent` under the hood can be surprising to users. For this reason, we are deprecating this behavior. Going forward, users should explicitly bind to `textContent` when using Domino.
-->
서버 사이드 렌더링에 사용되는 [Domino](https://github.com/fgnass/domino)는 `innerText`를 지원하지 않기 때문에 Domino에 사용된 `innerText`를 자동으로 `textContent`로 변환하는 "domino 어댑터"를 platform-server에서 제공했습니다.

그런데 두 프로퍼티의 동작이 약간 다르기 때문에 `innerText`를 사용한 개발자가 혼란스러울 수 있었습니다.
그래서 앞으로는 Domino에 `innerText`를 사용할 수 없고 명확하게 `textContext`만 사용해서 바인딩하도록 변경되었습니다.

{@a wtf-apis}
<!--
### `wtfStartTimeRange` and all `wtf*` APIs
-->
### `wtfStartTimeRange`와 `wtf`로 시작하는 모든 API

<!--
All of the `wtf*` APIs are deprecated and will be removed in a future version.
-->
`wtf`로 시작하는 모든 API는 앞으로 배포될 버전에 모두 지원이 중단됩니다.

{@a entryComponents}
<!--
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required
-->
### `entryComponents`, `ANALYZE_FOR_ENTRY_COMPONENTS`는 사용하지 않습니다.

<!--
Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically. With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations. The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.
-->
이전까지는 `NgModule`을 정의할 때 `entryComponents` 배열을 지정해야 컴파일러가 컴포넌트를 동적으로 생성하고 주입할 수 있었습니다.
Ivy 엔진을 사용하면서 부터는 더이상 이런 코드가 필요하지 않습니다.
기존에 있던 `entryComponents` 배열은 제거하면 되고, `ANALYZE_FOR_ENTRY_COMPONENTS` 의존성 주입 토큰도 같은 이유로 사용하지 않습니다.


{@a moduleWithProviders}
{@a modulewithproviders-type-without-a-generic}
<!--
### `ModuleWithProviders` type without a generic
-->
### 제네릭 없는 `ModuleWithProviders`

<!--
Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` (typically using a method named `forRoot()`).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.
In a future version of Angular, the generic will no longer be optional.


If you're using the CLI, `ng update` should [migrate your code automatically](guide/migration-module-with-providers).
If you're not using the CLI, you can add any missing generic types to your application manually.
For example:

**Before**
```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**After**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```
-->
`@angular/router`나 `@ngrx/store`와 같은 일부 Angular 라이브러리에는 `ModuleWithProviders` 타입을 반환하는 API가 있었습니다.
`forRoot()`를 사용하는 패턴이 보통 그랬습니다.
이 타입은 `NgModule`과 프로바이더를 함께 묶어 표현하는 타입입니다.
Angular 9 버전부터는 `ModuleWithProviders`를 제네릭 타입 없이 사용할 수 없으며, 제네릭 타입은 `NgModule` 중 하나여야 합니다.
이후 버전에는 제네릭이 필수가 될 것입니다.

Angular CLI를 사용한다면 `ng update`를 실행해서 [코드를 자동으로 마이그레이션](guide/migration-module-with-providers) 할 수 있습니다.
Angular CLI를 사용할 수 없다면 애플리케이션에 존재하는 코드에 제네릭을 직접 지정해야 합니다:

**수정 전**
```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**수정 후**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```


{@a wrapped-value}
###  `WrappedValue`

<!--
The purpose of `WrappedValue` is to allow the same object instance to be treated as different for the purposes of change detection.
It is commonly used with the `async` pipe in the case where the `Observable` produces the same instance of the value.

Given that this use case is relatively rare and special handling impacts application performance, we have deprecated it in v10.
No replacement is planned for this deprecation.

If you rely on the behavior that the same object instance should cause change detection, you have two options:
- Clone the resulting value so that it has a new identity.
- Explicitly call [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges) to force the update.
-->
`WrappedValue`는 객체 인스턴스 하나에 변화 감지 정책을 여러가지 방식으로 적용하기 위해 도입되었습니다.
`Observable`이 같은 인스턴스를 전달하고 `async` 파이프가 이 값을 받을 때 주로 사용되었습니다.

하지만 이 인터페이스가 사용되는 경우는 거의 없었고, 잘못 사용하면 애플리케이션 성능에 큰 영향을 줄 수 있기 때문에 v10 버전부터는 지원을 중단했습니다.
이 방식을 대체할 문법은 계획되어 있지 않습니다.

같은 객체 인스턴스를 받았을 때 변화 감지 정책을 다르게 활용하는 방법은 두 가지가 있습니다:

- 객체를 복제해서 사용하세요. 다른 객체가 됩니다.
- 강제로 갱신하려면 [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges)를 직접 실행하세요.


### Internet Explorer 11
Angular support for Microsoft's Internet Explorer 11 (IE11) is deprecated and will be removed in Angular v13.
Ending IE11 support allows Angular to take advantage of web platform APIs present only in evergreen browsers, resulting in better APIs for developers and more capabilities for application users.
An additional motivation behind this removal is the drop in global usage of IE11 to just ~1% (as of March 2021).
For full rationale and discussion behind this deprecation see [RFC: Internet Explorer 11 support deprecation and removal](https://github.com/angular/angular/issues/41840).

*Note: IE11 will be supported in Angular v12 LTS releases through November 2022.*


{@a deprecated-cli-flags}

<!--
## Deprecated CLI APIs and Options
-->
## Angular CLI 지원 중단 API, 옵션

<!--
This section contains a complete list all of the currently deprecated CLI flags.
-->
이 섹션은 Angular CLI에서 지원이 중단된 기능을 설명합니다.


### @angular-devkit/build-angular

<!--
| API/Option                      | May be removed in | Notes                                                                           |
| ------------------------------- | ----------------- |-------------------------------------------------------------------------------- |
| `extractCss`                    | <!-v11-> v13     | No longer required to disable CSS extraction during development.               | 
| `i18nFormat`                    | <!-v9-> v12      | Format is now automatically detected.                                           |
| `i18nLocale`                    | <!-v9-> v12      | New [localization option](/guide/i18n#localize-config) in version 9 and later.  |
| `hmrWarning`                    | <!-v11-> v13     | No longer has an effect.                                                       |
| `servePathDefaultWarning`       | <!-v11-> v13     | No longer has an effect.                                                       |
-->
| API/옵션                      | 지원 중단 | 참고                                                                           |
| ------------------------------- | ----------------- |-------------------------------------------------------------------------------- |
| `extractCss`                    | <!--v11--> v13     | 개발 단계에서 CSS 추출을 막는 정책이 폐기되었습니다.               | 
| `i18nFormat`                    | <!--v9--> v12      | 형식은 이제 자동으로 감지됩니다.                                           |
| `i18nLocale`                    | <!--v9--> v12      | 9 버전부터 새로운 [지역화 옵션](/guide/i18n#localize-config)이 사용됩니다.  |
| `hmrWarning`                    | <!--v11--> v13     | 이제는 아무 동작도 하지 않습니다.                                                       |
| `servePathDefaultWarning`       | <!--v11--> v13     | 이제는 아무 동작도 하지 않습니다.                                                       |


### @schematics/angular

<!--
| API/Option                      | May be removed in | Notes                                                                           |
| ------------------------------- | ----------------- |-------------------------------------------------------------------------------- |
| `entryComponent`                | <!-v9-> v12     | No longer needed with Ivy.                                                      |
| `lintFix`                       | <!-v11-> v12    | Deprecated as part of TSLint deprecation.                                      |
-->
| API/옵션                      | 지원 중단 | 참고                                                                           |
| ------------------------------- | ----------------- |-------------------------------------------------------------------------------- |
| `entryComponent`                | <!--v9--> v12     | Ivy에는 사용되지 않습니다.                                                      |
| `lintFix`                       | <!--v11--> v12    | TSLint 지원이 중단되면서 함께 지원 중단되었습니다.                                      |


{@a removed}
<!--
## Removed APIs
-->
## 지원이 중단된 API

<!--
The following APIs have been removed starting with version *11.0.0*:

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) | |

*To see APIs removed in version 10, check out this guide on the [version 10 docs site](https://v10.angular.io/guide/deprecations#removed).
-->
아래 API들은 Angular 11.0.0 버전부터 지원이 중단됩니다:

| 패키지          | API            | 대체 문법 | 참고 |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) | |

*Angular 10 버전에 제거된 API를 확인하려면 [Angular 10 문서](https://v10.angular.io/guide/deprecations#removed)를 참고하세요.



{@a esm5-fesm5}
<!--
### `esm5` and `fesm5` code formats in @angular/* npm packages
-->
### @angular/* npm 패키지가 제공하던 `esm5`, `fesm5` 코드 형식

<!--
As of Angular v8, the CLI primarily consumes the `fesm2015` variant of the code distributed as part of `@angular/*` npm packages.
This renders the `esm5` and `fesm5` distributions obsolete and unnecessary, adding bloat to the package size and slowing down npm installations.

This removal has no impact on CLI users, unless they modified their build configuration to explicitly consume these code distributions.

Any application still relying on the `esm5` and `fesm5` as the input to its build system will need to ensure that the build pipeline is capable of accepting JavaScript code conforming to ECMAScript 2015 (ES2015) language specification.

Note that this change doesn't make existing libraries distributed in this format incompatible with the Angular CLI.
The CLI will fall back and consume libraries in less desirable formats if others are not available.
However, we do recommend that libraries ship their code in ES2015 format in order to make builds faster and build output smaller.

In practical terms, the `package.json` of all `@angular` packages has changed in the following way:

**Before**:
```
{
  "name": "@angular/core",
  "version": "9.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

**After**:
```
{
  "name": "@angular/core",
  "version": "10.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm2015/core.js",
  "es2015": "./fesm2015/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

For more information about the npm package format, see the [Angular Package Format spec](https://goo.gl/jB3GVv).
-->
Angular 8 버전까지는 `@angular/*` npm 패키지에 `fesm2015` 형식으로 빌드된 코드가 함께 배포되었습니다.
정확하게는 `esm5`, `fesm5` 배포판이 제공되었으며, 이 패키지들은 더이상 사용하지 않으면서도 패키지 크기를 증가시키고 npm 설치 속도르 느리게 만들었습니다.

Angular CLI를 사용한다면 이 배포판을 사용하도록 명시적으로 지정하지 않는 한 이 배포판이 없어도 문제되지 않습니다.

다만, 빌드 프로세스가 ECMAScript 2015(ES2015) 스펙을 기준으로 정리되어 있다면 `esm5`, `fesm5` 형식이 필요할 수 있습니다.

`esm5`, `fesm5` 배포가 중단되어도 기존에 배포된 라이브러리에는 영향을 미치지 않습니다.
Angular CLI는 필요없는 라이브러리는 자동으로 걸러내고 필요한 파일만 사용할 것입니다.
다만, ES2015 형식으로 코드를 배포하면 빌드가 더 빨라지고 빌드 결과물 크기도 작기 때문에 새로운 형식을 사용할 것을 권장합니다.

코드를 실제로 보면 `@angular` 패키지 안에 있는 `package.json`들은 이렇게 변경되었습니다:

**변경 전**:
```
{
  "name": "@angular/core",
  "version": "9.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

**변경 후**:
```
{
  "name": "@angular/core",
  "version": "10.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm2015/core.js",
  "es2015": "./fesm2015/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

npm 패키지 형식에 대해 자세하게 알아보려면 [Angular 패키지 형식 스펙](https://goo.gl/jB3GVv)을 참고하세요.


{@a style-sanitization}
<!--
### Style Sanitization for `[style]` and `[style.prop]` bindings
-->
### `[style]`, `[style.prop]` 바인딩에 적용되던 유효성 검사

<!--
Angular used to sanitize `[style]` and `[style.prop]` bindings to prevent malicious code from being inserted through `javascript:` expressions in CSS `url()` entries. However, most modern browsers no longer support the usage of these expressions, so sanitization was only maintained for the sake of IE 6 and 7. Given that Angular does not support either IE 6 or 7 and sanitization has a performance cost, we will no longer sanitize style bindings as of version 10 of Angular.
-->
Angular는 `[style]`이나 `[style.prop]`를 바인딩할 때 `javascript:`나 CSS `url()`과 같은 악성 코드가 실행되는 것을 방지하기 위해 유효성을 검사했었습니다.
이제는 최신 브라우저들이 이런 표현식을 지원하지 않기 때문에 유효성 검사도 IE 6와 7에서만 필요합니다.
그런데 Angular는 더이상 IE 6과 7 버전을 지원하지 않기 때문에 불필요하게 성능에 영향을 줄 수 있는 유효성 검사 로직을 제거했습니다.
Angular 10 버전부터는 스타일을 바인딩할 때 유효성을 검사할 필요가 없습니다.