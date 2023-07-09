<!--
# Deprecated APIs and features
-->
# 지원이 중단된 기능

<!--
Angular strives to balance innovation and stability.
Sometimes, APIs and features become obsolete and need to be removed or replaced so that Angular can stay current with new best practices, changing dependencies, or changes in the \(web\) platform itself.

To make these transitions as easy as possible, APIs and features are deprecated for a period of time before they are removed.
This gives you time to update your applications to the latest APIs and best practices.

This guide contains a summary of noteworthy Angular APIs and features that are currently deprecated.
See the [full changelog](https://github.com/angular/angular/blob/main/CHANGELOG.md) for
comprehensive details on deprecations and breaking changes.

<div class="alert is-helpful">

Features and APIs that were deprecated in v6 or earlier are candidates for removal in version 9 or any later major version.
For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io).

</div>
-->
Angular는 혁신과 안정성 사이에서 균형을 추구합니다.
그래서 특정 API나 기능이 더이상 필요없다면 이 기능을 제거하거나 다른 기능으로 대체하면서 누구나 Angular를 최선의 방식으로 활용할 수 있도록 관리하고 있습니다.
가끔은 의존성 패키지가 변경되거나 플랫폼과 관련된 기능이 변경되기도 합니다.

이런 변화를 자연스럽게 도입할 수 있도록 지원이 중단되는 기능이나 API는 Angular에서 바로 제거되지 않고 약간 시간 여유를 둔 후에 제거됩니다.
지원이 중단되는 것으로 결정된 기능이 있다면 이 기간을 이용해서 더 나은 방식으로 변경하는 것이 좋습니다.

이 문서는 Angular가 제공하던 기능이나 API 중에서 지금은 지원이 중단된 기능 중 알아두면 좋을 것들에 대해 안내합니다.
변경된 내용 전체를 확인하려면 [체인지로그](https://github.com/angular/angular/blob/main/CHANGELOG.md)를 참고하세요.

<div class="alert is-helpful">

Angular 6 버전까지 지원이 중단되기로 계획되었던 기능들은 Angular 9 버전부터 완전히 제거됩니다.
자세한 내용은 [Angular의 릴리즈 정책](guide/releases#deprecation-practices "Angular의 릴리즈 정책: 지원이 중단되는 기능") 문서를 참고하세요.

그리고 지원이 중단되는 기능을 단계별로 수정하는 방법에 대해 알아보려면 [update.angular.io](https://update.angular.io) 가이드를 참고하세요.

</div>


<a id="index"></a>

<!--
## Index
-->
## 목차

<!--
To help you future-proof your projects, the following table lists all deprecated APIs and features, organized by the release in which they are candidates for removal.
Each item is linked to the section later in this guide that describes the deprecation reason and replacement options.
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
v13 - v16
v14 - v17
v15 - v18
v16 - v19
-->

<!--
### Deprecated features that can be removed in v11 or later
-->
### 11 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/core`                     | [`DefaultIterableDiffer`](#core)                                                                           |  v7           | v11         |
| `@angular/core`                     | [`defineInjectable`](#core)                                                                                |  v8           | v11         |
| `@angular/core`                     | [`entryComponents`](api/core/NgModule)                                                                     |  v9           | v11         |
| `@angular/core`                     | [`ANALYZE_FOR_ENTRY_COMPONENTS`](#core)                                                                    |  v9           | v11         |
| `@angular/forms`                    | [`ngModel` with reactive forms](#ngmodel-reactive)                                                         |  v6           | v11         |
| `@angular/upgrade`                  | [`@angular/upgrade`](#upgrade)                                                                             |  v8           | v11         |
| `@angular/upgrade`                  | [`getAngularLib`](#upgrade-static)                                                                         |  v8           | v11         |
| `@angular/upgrade`                  | [`setAngularLib`](#upgrade-static)                                                                         |  v8           | v11         |
| polyfills                           | [reflect-metadata](#reflect-metadata)                                                                      |  v8           | v11         |
| template syntax                     | [`<template>`](#template-tag)                                                                              |  v7           | v11         |
-->
| 분류                 | API, 기능                                            | 지원 중단 공지 | 제거  |
|:-------------------|:---------------------------------------------------|:---------|:----|
| `@angular/core`    | [`DefaultIterableDiffer`](#core)                   | v7       | v11 |
| `@angular/core`    | [`defineInjectable`](#core)                        | v8       | v11 |
| `@angular/core`    | [`entryComponents`](api/core/NgModule)             | v9       | v11 |
| `@angular/core`    | [`ANALYZE_FOR_ENTRY_COMPONENTS`](#core)            | v9       | v11 |
| `@angular/forms`   | [`ngModel` with reactive forms](#ngmodel-reactive) | v6       | v11 |
| `@angular/upgrade` | [`@angular/upgrade`](#upgrade)                     | v8       | v11 |
| `@angular/upgrade` | [`getAngularLib`](#upgrade-static)                 | v8       | v11 |
| `@angular/upgrade` | [`setAngularLib`](#upgrade-static)                 | v8       | v11 |
| 폴리필                | [reflect-metadata](#reflect-metadata)              | v8       | v11 |
| 템플릿 문법             | [`<template>`](#template-tag)                      | v7       | v11 |


<!--
### Deprecated features that can be removed in v12 or later
-->
### 12 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/core/testing`             | [`TestBed.get`](#testing)                                                                                  |  v9           | v12         |
| `@angular/core/testing`             | [`async`](#testing)                                                                                        |  v9           | v12         |
-->
| 분류                      | API, 기능                   | 지원 중단 공지 | 제거     |
|:------------------------|:--------------------------|:---------|:-------|
| `@angular/core/testing` | [`TestBed.get`](#testing) | v9       | v12    |
| `@angular/core/testing` | [`async`](#testing)       | v9       | v12    |


<!--
### Deprecated features that can be removed in v14 or later
-->
### 14 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/forms`                    | [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group)                                | v11           | v14         |
-->
| 분류               | API, 기능                                                      | 지원 중단 공지 | 제거     |
|:-----------------|:-------------------------------------------------------------|:---------|:-------|
| `@angular/forms` | [`FormBuilder.group` 레거시 옵션 인자](api/forms/FormBuilder#group) | v11      | v14    |


<!--
### Deprecated features that can be removed in v15 or later
-->
### 15 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/compiler-cli`             | [Input setter coercion](#input-setter-coercion)                                                            | v13           | v15         |
| `@angular/compiler-cli`             | [`fullTemplateTypeCheck`](#full-template-type-check)                                                       | v13           | v15         |
| `@angular/core`                     | [Factory-based signature of `ApplicationRef.bootstrap`](#core)                                             | v13           | v15         |
| `@angular/core`                     | [`PlatformRef.bootstrapModuleFactory`](#core)                                                              | v13           | v15         |
| `@angular/core`                     | [Factory-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | v13           | v15         |
| `@angular/upgrade`                  | [Factory-based signature of `downgradeModule`](#upgrade-static)                                            | v13           | v15         |
| template syntax                     | [`bind-`, `on-`, `bindon-`, and `ref-`](#bind-syntax)                                                      | v13           | v15         |
-->
| 분류                      | API, 기능                                                                                 | 지원 중단 공지 | 제거        |
|:------------------------|:----------------------------------------------------------------------------------------|:---------|:----------|
| `@angular/compiler-cli` | [입력값 세터 강제하기](#input-setter-coercion)                                                   | v13      | v15       |
| `@angular/compiler-cli` | [`fullTemplateTypeCheck`](#full-template-type-check)                                    | v13      | v15       |
| `@angular/core`         | [팩토리 기반의 `ApplicationRef.bootstrap`](#core)                                             | v13      | v15       |
| `@angular/core`         | [`PlatformRef.bootstrapModuleFactory`](#core)                                           | v13      | v15       |
| `@angular/core`         | [팩토리 기반의 `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | v13      | v15       |
| `@angular/upgrade`      | [팩토리 기반의 `downgradeModule`](#upgrade-static)                                            | v13      | v15       |
| 템플릿 문법                  | [`bind-`, `on-`, `bindon-`, `ref-`](#bind-syntax)                                       | v13      | v15       |


<--
### Deprecated features that can be removed in v16 or later
-->
### 16 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/common/http/testing`      | [`TestRequest` accepting `ErrorEvent` for error simulation](#testrequest-errorevent)                       | v13           | v16         |
| `@angular/core`                     | [`getModuleFactory`](#core)                                                                                | v13           | v16         |
| `@angular/core`                     | [`ModuleWithComponentFactories`](#core)                                                                    | v13           | v16         |
| `@angular/core`                     | [`Compiler`](#core)                                                                                        | v13           | v16         |
| `@angular/core`                     | [`CompilerFactory`](#core)                                                                                 | v13           | v16         |
| `@angular/core`                     | [`NgModuleFactory`](#core)                                                                                 | v13           | v16         |
| `@angular/core`                     | [`ComponentFactory`](#core)                                                                                | v13           | v16         |
| `@angular/core`                     | [`ComponentFactoryResolver`](#core)                                                                        | v13           | v16         |
| `@angular/core`                     | [`CompilerOptions.useJit and CompilerOptions.missingTranslation config options`](#core)                    | v13           | v16         |
| `@angular/platform-browser-dynamic` | [`JitCompilerFactory`](#platform-browser-dynamic)                                                          | v13           | v16         |
| `@angular/platform-browser-dynamic` | [`RESOURCE_CACHE_PROVIDER`](#platform-browser-dynamic)                                                     | v13           | v16         |
| `@angular/platform-server`          | [`ServerTransferStateModule`](#platform-server)                                                            | v14           | v16         |
| `@angular/service-worker`           | [`SwUpdate#activated`](api/service-worker/SwUpdate#activated)                                              | v13           | v16         |
| `@angular/service-worker`           | [`SwUpdate#available`](api/service-worker/SwUpdate#available)                                              | v13           | v16         |
-->
| 분류                                  | API, 기능                                                                                 | 지원 중단 공지   | 제거     |
|:------------------------------------|:----------------------------------------------------------------------------------------|:-----------|:-------|
| `@angular/common/http/testing`      | [에러를 시뮬레이션할 때 `ErrorEvent`를 받는 `TestRequest`](#testrequest-errorevent)                  | v13        | v16    |
| `@angular/core`                     | [`getModuleFactory`](#core)                                                             | v13        | v16    |
| `@angular/core`                     | [`ModuleWithComponentFactories`](#core)                                                 | v13        | v16    |
| `@angular/core`                     | [`Compiler`](#core)                                                                     | v13        | v16    |
| `@angular/core`                     | [`CompilerFactory`](#core)                                                              | v13        | v16    |
| `@angular/core`                     | [`NgModuleFactory`](#core)                                                              | v13        | v16    |
| `@angular/core`                     | [`ComponentFactory`](#core)                                                             | v13        | v16    |
| `@angular/core`                     | [`ComponentFactoryResolver`](#core)                                                     | v13        | v16    |
| `@angular/core`                     | [`CompilerOptions.useJit and CompilerOptions.missingTranslation config options`](#core) | v13        | v16    |
| `@angular/platform-browser-dynamic` | [`JitCompilerFactory`](#platform-browser-dynamic)                                       | v13        | v16    |
| `@angular/platform-browser-dynamic` | [`RESOURCE_CACHE_PROVIDER`](#platform-browser-dynamic)                                  | v13        | v16    |
| `@angular/platform-server`          | [`ServerTransferStateModule`](#platform-server)                                         | v14        | v16    |
| `@angular/service-worker`           | [`SwUpdate#activated`](api/service-worker/SwUpdate#activated)                           | v13        | v16    |
| `@angular/service-worker`           | [`SwUpdate#available`](api/service-worker/SwUpdate#available)                           | v13        | v16    |


<!--
### Deprecated features that can be removed in v17 or later
-->
### 17 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/common`                   | [`NgComponentOutlet.ngComponentOutletNgModuleFactory`](#common)                                            | v14           | v17         |
| `@angular/common`                   | [`DatePipe` - `DATE_PIPE_DEFAULT_TIMEZONE`](api/common/DATE_PIPE_DEFAULT_TIMEZONE)                         | v15           | v17         |
| `@angular/core`                     | NgModule and `'any'` options for [`providedIn`](#core)                                                     | v15           | v17         |
| `@angular/core`                     | [`@Component.moduleId`](api/core/Component#moduleId) | v16 | v17 |
| `@angular/router`                   | [`RouterLinkWithHref` directive](#router)                                                                  | v15           | v17         |
| `@angular/router`                   | [Router writeable properties](#router-writable-properties)                                                 | v15.1         | v17         |
| `@angular/router`                   | [Router CanLoad guards](#router-can-load)                                                 | v15.1         | v17         |
| `@angular/router`                   | [class and `InjectionToken` guards and resolvers](#router-class-and-injection-token-guards)                | v15.2         | v17         |
-->
| 분류                | API, 기능                                                                                     | 지원 중단 공지 | 제거       |
|:------------------|:--------------------------------------------------------------------------------------------|:---------|:---------|
| `@angular/common` | [`NgComponentOutlet.ngComponentOutletNgModuleFactory`](#common)                             | v14      | v17      |
| `@angular/common` | [`DatePipe` - `DATE_PIPE_DEFAULT_TIMEZONE`](api/common/DATE_PIPE_DEFAULT_TIMEZONE)          | v15      | v17      |
| `@angular/core`   | [`providedIn`](#core)에 사용하는 NgModule과 `'any'` 옵션                                            | v15      | v17      |
| `@angular/core`   | [`@Component.moduleId`](api/core/Component#moduleId)                                        | v16      | v17      |
| `@angular/router` | [`RouterLinkWithHref` directive](#router)                                                   | v15      | v17      |
| `@angular/router` | [Router writeable properties](#router-writable-properties)                                  | v15.1    | v17      |
| `@angular/router` | [Router CanLoad guards](#router-can-load)                                                   | v15.1    | v17      |
| `@angular/router` | [class and `InjectionToken` guards and resolvers](#router-class-and-injection-token-guards) | v15.2    | v17      |


<!--
### Deprecated features that can be removed in v18 or later
-->
### 18 버전부터 지원이 중단된 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| `@angular/common` | `isPlatformWorkerApp` and `isPlatformWorkerUi` | v16 | v18 |
| `@angular/core` | `EnvironmentInjector.runInContext` | v16 | v18 |
| `@angular/platform-server`          | [`PlatformConfig.baseUrl` and `PlatformConfig.useAbsoluteUrl` config options](api/platform-server/PlatformConfig) | v16           | v18               |
| `@angular/platform-server`          | [`platformDynamicServer`](api/platform-server/platformDynamicServer) | v16           | v18               |
| `@angular/platform-browser`         | [`BrowserModule.withServerTransition`](api/platform-browser/BrowserModule#withservertransition)            | v16           | v18         |
| `@angular/platform-browser`         | [`makeStateKey`, `StateKey` and `TransferState`](#platform-browser), symbols were moved to `@angular/core`                                        | v16           | v18         |
-->
| 분류                          | API, 기능                                                                                               | 지원 중단 공지 | 제거      |
|:----------------------------|:------------------------------------------------------------------------------------------------------|:---------|:--------|
| `@angular/common`           | `isPlatformWorkerApp`, `isPlatformWorkerUi`                                                           | v16      | v18     |
| `@angular/core`             | `EnvironmentInjector.runInContext`                                                                    | v16      | v18     |
| `@angular/platform-server`  | [`PlatformConfig.baseUrl`, `PlatformConfig.useAbsoluteUrl` 설정 옵션](api/platform-server/PlatformConfig) | v16      | v18     |
| `@angular/platform-server`  | [`platformDynamicServer`](api/platform-server/platformDynamicServer)                                  | v16      | v18     |
| `@angular/platform-browser` | [`BrowserModule.withServerTransition`](api/platform-browser/BrowserModule#withservertransition)       | v16      | v18     |
| `@angular/platform-browser` | [`makeStateKey`, `StateKey`, `TransferState`](#platform-browser) 심볼은 `@angular/core`로 이동              | v16      | v18     |


<!--
### Deprecated features with no planned removal version
-->
### 중단될 예정이지만 시기가 결정되지 않은 기능

<!--
| Area                                | API or Feature                                                                                             | Deprecated in | May be removed in |
|:---                                 |:---                                                                                                        |:---           |:---               |
| template syntax                     | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)                                         |  v7           | unspecified |
-->
| 분류     | API, 기능                                                        | 지원 중단 공지 | 제거  |
|:-------|:---------------------------------------------------------------|:---           |:------------------|
| 템플릿 문법 | [`/deep/`, `>>>`, `::ng-deep`](#deep-component-style-selector) |  v7           | 미정                |

For information about Angular Component Development Kit (CDK) and Angular Material deprecations, see the [changelog](https://github.com/angular/components/blob/main/CHANGELOG.md).


<a id="deprecated-apis"></a>

<!--
## Deprecated APIs
-->
## 지원이 중단된 API

<!--
This section contains a complete list all deprecated APIs, with details to help you plan your migration to a replacement.

<div class="alert is-helpful">

**TIP**: <br />
In the [API reference section](api) of this site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [Status: deprecated](api?status=deprecated).

</div>
-->
이 섹션에서는 지금까지 지원이 중단된 API에 대해 소개하고, 이 API를 사용하고 있다면 어떻게 수정하면 되는지 안내합니다.

<div class="alert is-helpful">

**팁**: <br />
[API 스펙](api) 문서에서 지원이 중단된 API는 ~~취소선~~으로 표시됩니다. 그리고 해당 문서에서 지원이 중단된 기능만 보려면 [**Status: deprecated**](api?status=deprecated)를 선택하면 됩니다.

</div>


<a id="common"></a>

### &commat;angular/common

<!--
| API                                                                                           | Replacement                                         | Deprecation announced | Details |
|:---                                                                                           |:---                                                 |:---                   |:---     |
| [`NgComponentOutlet.ngComponentOutletNgModuleFactory`](api/common/NgComponentOutlet)          | `NgComponentOutlet.ngComponentOutletNgModule`       | v14                   | Use the `ngComponentOutletNgModule` input instead. This input doesn't require resolving NgModule factory. |
| [`DatePipe` - `DATE_PIPE_DEFAULT_TIMEZONE`](api/common/DATE_PIPE_DEFAULT_TIMEZONE) |`{ provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-1200' }` | v15                    | Use the `DATE_PIPE_DEFAULT_OPTIONS` injection token, which can configure multiple settings at once instead. |
| `isPlatformWorkerApp` and `isPlatformWorkerUi` | None  | v16 | These two functions have no purpose since the removal of the webworker platform (they only return `false`). They can be safely removed.
-->
| API                                                                                  | 대체 방식                                                                   | 지원 중단 발표 | 설명                                                                                                                                      |
|:-------------------------------------------------------------------------------------|:------------------------------------------------------------------------|:---------|:----------------------------------------------------------------------------------------------------------------------------------------|
| [`NgComponentOutlet.ngComponentOutletNgModuleFactory`](api/common/NgComponentOutlet) | `NgComponentOutlet.ngComponentOutletNgModule`                           | v14      | `ngComponentOutletNgModule` 입력방식을 대신 사용하세요. 더이상 NgModule 팩토리가 필요하지 않습니다.                                                                |
| [`DatePipe` - `DATE_PIPE_DEFAULT_TIMEZONE`](api/common/DATE_PIPE_DEFAULT_TIMEZONE)   | `{ provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-1200' }` | v15      | `DATE_PIPE_DEFAULT_OPTIONS` 의존성 주입 토큰을 사용하세요. 설정을 여러번 할 필요 없이 한 번만 설정하면 됩니다.                                                            |
| `isPlatformWorkerApp`, `isPlatformWorkerUi`                                          | -                                                                       | v16      | 이 두 함수는 webwroker 플랫폼이 제거되면서 더이상 사용하지 않습니다. (언제나 `false`를 반환합니다.) 제거해도 안전합니다. | 

<a id="core"></a>

### &commat;angular/core

<!--
| API                                                                                                        | Replacement                                                                                                                                                       | Deprecation announced | Details |
|:---                                                                                                        |:---                                                                                                                                                               |:---                   |:---     |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)                                                  | n/a                                                                                                                                                               | v4                    | Not part of public API.                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                            |
| [`defineInjectable`](api/core/defineInjectable)                                                            | `ɵɵdefineInjectable`                                                                                                                                              | v8                    | Used only in generated code. No source code should depend on this API.                                                                                                                                                                                             |
| [`entryComponents`](api/core/NgModule)                                                     | none                                                                                                                                                              | v9                    | See [`entryComponents`](#entryComponents)                                                                                                                                                                                                                          |
| `ANALYZE_FOR_ENTRY_COMPONENTS`                                   | none                                                                                                                                                              | v9                    | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents)                                                                                                                                                                                                             |
| [`async`](api/core/testing/async)                                                                          | [`waitForAsync`](api/core/testing/waitForAsync)                                                                                                                   | v11                   | The [`async`](api/core/testing/async) function from `@angular/core/testing` has been renamed to `waitForAsync` in order to avoid confusion with the native JavaScript `async` syntax. The existing function is deprecated and can be removed in a future version. |
| [`getModuleFactory`](api/core/getModuleFactory)                                                            | [`getNgModuleById`](api/core/getNgModuleById)                                                                                                                     | v13                   | Ivy allows working with NgModule classes directly, without retrieving corresponding factories.                                                                                                                                                                     |
| `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly`                         | none \(was part of [issue #40091](https://github.com/angular/angular/issues/40091)\)                                                                              |                       | This is a temporary flag introduced as part of bug fix of [issue #40091](https://github.com/angular/angular/issues/40091) and will be removed.                                                                                                                      |
| Factory-based signature of [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                 | Type-based signature of [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                                                                           | v13                   | With Ivy, there is no need to resolve Component factory and Component Type can be provided directly.                                                                                                                                                               |
| [`PlatformRef.bootstrapModuleFactory`](api/core/PlatformRef#bootstrapModuleFactory)                        | [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule)                                                                                             | v13                   | With Ivy, there is no need to resolve NgModule factory and NgModule Type can be provided directly.                                                                                                                                                                 |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories)                                    | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                  |
| [`Compiler`](api/core/Compiler)                                                                            | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                  |
| [`CompilerFactory`](api/core/CompilerFactory)                                                              | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                  |
| [`NgModuleFactory`](api/core/NgModuleFactory)                                                              | Use non-factory based framework APIs like [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule) and [createNgModule](api/core/createNgModule) | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                  |
| [Factory-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | [Type-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)                                                           | v13                   | Angular no longer requires component factories to dynamically create components. Use different signature of the `createComponent` method, which allows passing Component class directly.                                                                           |
| [`ComponentFactory`](api/core/ComponentFactory)                                                            | Use non-factory based framework APIs.                                                                                                                             | v13                   | Since Ivy, Component factories are not required. Angular provides other APIs where Component classes can be used directly.                                                                                                                                         |
| [`ComponentFactoryResolver`](api/core/ComponentFactoryResolver)                                            | Use non-factory based framework APIs.                                                                                                                             | v13                   | Since Ivy, Component factories are not required, thus there is no need to resolve them.                                                                                                                                                                            |
| [`CompilerOptions.useJit and CompilerOptions.missingTranslation config options`](api/core/CompilerOptions) | none                                                                                                                                                              | v13                   | Since Ivy, those config options are unused, passing them has no effect.                                                                                                                                                                                            |
| [`providedIn`](api/core/Injectable#providedIn) with NgModule | Prefer `'root'` providers, or use NgModule `providers` if scoping to an NgModule is necessary | v15 | none |
| [`providedIn: 'any'`](api/core/Injectable#providedIn) | none | v15 | This option has confusing semantics and nearly zero usage. |
| [`EnvironmentInjector.runInContext`](api/core/EnvironmentInjector#runInContext) | `runInInjectionContext`  | v16 | `runInInjectionContext` is a more flexible operation which supports element injectors as well |
| [`@Component.moduleId`](api/core/Component#moduleId) | none | v16 |
-->
| API                                                                                                        | 대체 방식                                                                                                                     | 지원 중단 발표 | 설명                                                                                                                                                                                            |
|:-----------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------|:---------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)                                                  | -                                                                                                                         | v4       | public API에서 제거되었습니다.                                                                                                                                                                         |                                                                                                                                                                                                                                                            |
| [`defineInjectable`](api/core/defineInjectable)                                                            | `ɵɵdefineInjectable`                                                                                                      | v8       | 빌드 후 생성된 코드에서만 사용됩니다. 소스 코드에서는 이 API를 사용하면 안됩니다.                                                                                                                                              |
| [`entryComponents`](api/core/NgModule)                                                                     | -                                                                                                                         | v9       | [`entryComponents`](#entryComponents)를 참고하세요.                                                                                                                                                 |
| `ANALYZE_FOR_ENTRY_COMPONENTS`                                                                             | -                                                                                                                         | v9       | [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents)를 참고하세요.                                                                                                                                    |
| [`async`](api/core/testing/async)                                                                          | [`waitForAsync`](api/core/testing/waitForAsync)                                                                           | v11      | `@angular/core/testing` 패키지로 제공되는 [`async`](api/core/testing/async) 함수는 표준 JavaScript `async` 문법과 혼동을 피하기 위해 `waitForAsync`라는 이름으로 변경되었습니다. `async()` 함수는 지원을 중단하기로 결정되었며 이후 버전에서는 제거될 예정입니다. |
| [`getModuleFactory`](api/core/getModuleFactory)                                                            | [`getNgModuleById`](api/core/getNgModuleById)                                                                             | v13      | Ivy는 팩토리를 거치지 않아도 NgModule 클래스와 직접 연동할 수 있습니다.                                                                                                                                                |
| `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly`                         | - \([issue #40091](https://github.com/angular/angular/issues/40091) 참고\)                                                  |          | 이 플래그는 [issue #40091](https://github.com/angular/angular/issues/40091) 버그를 해결하기 위해 임시로 도입되었으며 이제 사용되지 않습니다.                                                                                   |
| 팩토리 기반의 [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                                    | 타입 기반의 [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                                                    | v13      | Ivy를 사용할 때는 NgModule 팩토리를 사용하지 않고 NgModule 타입을 직접 참조합니다.                                                                                                                                      |
| [`PlatformRef.bootstrapModuleFactory`](api/core/PlatformRef#bootstrapModuleFactory)                        | [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule)                                                     | v13      | With Ivy, there is no need to resolve NgModule factory and NgModule Type can be provided directly.                                                                                            |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories)                                    | -                                                                                                                         | v13      | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요.                                                                                        |
| [`Compiler`](api/core/Compiler)                                                                            | -                                                                                                                         | v13      | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요.                                                                                        |
| [`CompilerFactory`](api/core/CompilerFactory)                                                              | -                                                                                                                         | v13      | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요.                                                                                        |
| [`NgModuleFactory`](api/core/NgModuleFactory)                                                              | 팩토리 기반이 아닌 [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule), [createNgModule](api/core/createNgModule) | v13      | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요.                                                                                        |
| [팩토리 기반의 `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)                    | [Type-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)                   | v13      | Angular는 동적으로 컴포넌트를 생성할 때 더이상 컴포넌트 팩토리를 사용하지 않습니다. 컴포넌트 클래스를 직접 활용하는 `createComponent` 메소드를 사용하세요.                                                                                            |
| [`ComponentFactory`](api/core/ComponentFactory)                                                            | 팩토리 기반이 아닌 API                                                                                                            | v13      | Ivy를 사용할때는 컴포넌트 팩토리를 사용하지 않습니다. 컴포넌트 클래스 API를 직접 사용하세요.                                                                                                                                       |
| [`ComponentFactoryResolver`](api/core/ComponentFactoryResolver)                                            | 팩토리 기반이 아닌 API                                                                                                            | v13      | Ivy를 사용할때는 컴포넌트 팩토리를 사용하지 않기 때문에, 더이상 사용하지 않습니다.                                                                                                                                              |
| [`CompilerOptions.useJit and CompilerOptions.missingTranslation config options`](api/core/CompilerOptions) | -                                                                                                                         | v13      | Ivy를 사용할 때는 사용하지 않습니다.                                                                                                                                                                        |
| NgModule의 [`providedIn`](api/core/Injectable#providedIn)                                                   | NgModule 계층에 등록하려면  `root` 프로바이더나 NgModule의 `providers` 필드를 활용하세요.                                                        | v15      | -                                                                                                                                                                                             |
| [`providedIn: 'any'`](api/core/Injectable#providedIn)                                                      | -                                                                                                                         | v15      | 이 옵션은 혼란스러웠으며 거의 사용되지도 않았습니다.                                                                                                                                                                 |
| [`EnvironmentInjector.runInContext`](api/core/EnvironmentInjector#runInContext)                            | `runInInjectionContext`                                                                                                   | v16      | `runInInjectionContext`를 사용하는 것이 더 편합니다.                                                                                                                                                      |
| [`@Component.moduleId`](api/core/Component#moduleId)                                                       | -                                                                                                                         | v16      |                                                                                                                                                                                               |


<a id="testing"></a>

### &commat;angular/core/testing

<!--
| API                                                                                                      | Replacement                                         | Deprecation announced | Details |
|:---                                                                                                      |:---                                                 |:---                   |:---     |
| [`TestBed.get`](api/core/testing/TestBed#get)                                                            | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9                    | Same behavior, but type safe.                 |
| [`async`](api/core/testing/async)                                                                        | [`waitForAsync`](api/core/testing/waitForAsync)     | v10                   | Same behavior, but rename to avoid confusion. |
-->
| API                                                                                                      | 대체 방식                                               | 지원중단 발표 | 설명                              |
|:---                                                                                                      |:----------------------------------------------------|:--------|:--------------------------------|
| [`TestBed.get`](api/core/testing/TestBed#get)                                                            | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9      | 동작은 같지만 타입 검사가 강화되었습니다.         |
| [`async`](api/core/testing/async)                                                                        | [`waitForAsync`](api/core/testing/waitForAsync)     | v10     | 동작은 같지만 혼동을 피하기 위해 이름이 변경되었습니다. |


<a id="router"></a>

### &commat;angular/router

<!--
| API                                        | Replacement                       | Deprecation announced | Details |
|:---                                        |:---                               |:---                   |:---     |
| [`RouterLinkWithHref` directive](api/router/RouterLinkWithHref) | Use `RouterLink` instead. | v15                   | The `RouterLinkWithHref` directive code was merged into `RouterLink`. Now the `RouterLink` directive can be used for all elements that have `routerLink` attribute. |
| [`provideRoutes` function](api/router/provideRoutes) | Use `ROUTES` `InjectionToken` instead. | v15                   | The `provideRoutes` helper function is minimally useful and can be unintentionally used instead of `provideRouter` due to similar spelling. |
| [`setupTestingRouter` function](api/router/testing/setupTestingRouter) | Use `provideRouter` or `RouterModule` instead. | v15.1                   | The `setupTestingRouter` function is not necessary. The `Router` is initialized based on the DI configuration in tests as it would be in production. |
| [class and `InjectionToken` guards and resolvers](api/router/DeprecatedGuard) | Use plain JavaScript functions instead. | v15.2                   | Functional guards are simpler and more powerful than class and token-based guards. |
-->
| API                                                              | 대체 방식                                   | 지원 중단 발표 | 설명                                                                                                             |
|:-----------------------------------------------------------------|:----------------------------------------|:---------|:---------------------------------------------------------------------------------------------------------------|
| [`RouterLinkWithHref` 디렉티브](api/router/RouterLinkWithHref)       | `RouterLink`를 사용하세요.                    | v15      | `RouterLinkWithHref` 디렉티브는 `RouterLink`와 합쳐졌습니다. 이제 `routerLink` 어트리뷰트가 적용된 엘리먼트는 모두 `RouterLink` 디렉티브로 사용합니다. |
| [`provideRoutes` 함수](api/router/provideRoutes)                   | `ROUTES` `InjectionToken`를 사용하세요.       | v15      | `provideRoutes` 헬퍼 함수는 거의 사용되지 않았고, 비슷한 철자인 `provideRouter`와 혼동될 여지가 있었습니다.                                    |
| [`setupTestingRouter` 함수](api/router/testing/setupTestingRouter) | `provideRouter`나 `RouterModule`를 사용하세요. | v15.1    | `setupTestingRouter` 함수는 더이상 사용되지 않습니다. `Router`는 테스트 환경에 의존성으로 주입될 때 운영모드처럼 초기화됩니다.                           |
| [함수나 `InjectionToken` 기반의 가드, 리졸버](api/router/DeprecatedGuard)      | 일반 JavaScript 함수를 사용하세요.                | v15.2    | 클래스나 토큰 기반의 가드보다는 함수를 사용하는 가드가 더 간단하고 확장하기 좋습니다.                                                               |


<a id="platform-browser"></a>

### &commat;angular/platform-browser

<!--
| API                                                              | Replacement                                        | Deprecation announced | Details |
|:---                                                              |:---                                                |:---                   |:---     |
| [`BrowserModule.withServerTransition`](api/platform-browser/BrowserModule#withservertransition) | No replacement needed.  | v16.0                   | The `APP_ID`token should be used instead to set the application ID. |
| `makeStateKey`, `StateKey` and `TransferState` | Import from `@angular/core`.  | v16.0                   | Same behavior, but exported from a different package. |
-->
| API                                                                                             | 대체 방식                    | 지원 중단 발표 | 설명                                          |
|:------------------------------------------------------------------------------------------------|:-------------------------|:---------|:--------------------------------------------|
| [`BrowserModule.withServerTransition`](api/platform-browser/BrowserModule#withservertransition) | -                        | v16.0    | `APP_ID` 토큰은 애플리케이션 ID를 설정하는 용도로만 사용해야 합니다. |
| `makeStateKey`, `StateKey`, `TransferState`                                                     | `@angular/core`에서 로드하세요. | v16.0    | 패키지가 변경되었습니다. 동작은 변경되지 않았습니다.               |


<a id="platform-browser-dynamic"></a>

### &commat;angular/platform-browser-dynamic

<!--
| API                                                                               | Replacement | Deprecation announced | Details |
|:---                                                                               |:---         |:---                   |:---     |
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory)           | none        | v13                   | This symbol is no longer necessary. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context. |
| [`RESOURCE_CACHE_PROVIDER`](api/platform-browser-dynamic/RESOURCE_CACHE_PROVIDER) | none        | v13                   | This was previously necessary in some cases to test AOT-compiled components with View Engine, but is no longer since Ivy.         |
-->
| API                                                                               | 대체 방식 | 지원 중단 발표 | 설명                                                                                                |
|:----------------------------------------------------------------------------------|:------|:---------|:--------------------------------------------------------------------------------------------------|
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory)           | -     | v13      | 이 심볼은 더이상 사용하지 않습니다. [ViewEngine 지원이 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |
| [`RESOURCE_CACHE_PROVIDER`](api/platform-browser-dynamic/RESOURCE_CACHE_PROVIDER) | -     | v13      | 이 심볼은 View Engine에서 AOT 컴파일 동작을 테스트하기 위해 도입된 것입니다. Ivy가 도입된 후에는 사용되지 않습니다.                        |


<a id="platform-server"></a>

### &commat;angular/platform-server

<!--
| API                                                              | Replacement                                        | Deprecation announced | Details |
|:---                                                              |:---                                                |:---                   |:---     |
| [`ServerTransferStateModule`](api/platform-server/ServerTransferStateModule) | No replacement needed.  | v14.1                   | The `TransferState` class is available for injection without importing additional modules during server side rendering, when `ServerModule` is imported or `renderApplication` function is used for bootstrap. |
| [`PlatformConfig.baseUrl` and `PlatformConfig.useAbsoluteUrl` config options](api/platform-server/PlatformConfig) | none                    | v16                   | This was previously unused.                   |
| [`platformDynamicServer`](api/platform-server/platformDynamicServer) | Import `@angular/compiler` and replace the usage with `platformServer` instead. | v16                   | This is done to decrease the server bundle size for AOT builds.                   |
-->
| API                                                                                                | 대체 방식                                             | 지원 중단 발표 | 설명                                                                                                                                       |
|:---------------------------------------------------------------------------------------------------|:--------------------------------------------------|:---------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| [`ServerTransferStateModule`](api/platform-server/ServerTransferStateModule)                       | -                                                 | v14.1    | 서버 사이드 렌더링을 활용하는 애플리케이션이라면 추가 모듈 로딩 없이도 `TransferState` 클래스를 활용할 수 있습니다. 이 경우에는 부트스트랩할 때 `ServerModule`이나 `renderApplication` 함수가 로딩됩니다. |
| [`PlatformConfig.baseUrl`, `PlatformConfig.useAbsoluteUrl` 옵션](api/platform-server/PlatformConfig) | -                                                 | v16      | 사용하지 않는 옵션입니다.                                                                                                                           |
| [`platformDynamicServer`](api/platform-server/platformDynamicServer)                               | `@angular/compiler` 패키지의 `platformServer`를 사용하세요. | v16      | 서버에서 AOT 빌드할 때 빌드 결과물의 크기를 줄일 때 사용합니다.                                                                                                   |


<a id="forms"></a>

### &commat;angular/forms

<!--
| API                                                                         | Replacement                                                                  | Deprecation announced | Details |
|:---                                                                         |:---                                                                          |:---                   |:---     |
| [`ngModel` with reactive forms](#ngmodel-reactive)                          | [`FormControlDirective`](api/forms/FormControlDirective)                     | v6                    | none    |
| [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group) | [`AbstractControlOptions` parameter value](api/forms/AbstractControlOptions) | v11                   | none    |
-->
| API                                                          | 대체 방식                                                                        | 지원중단 발표 | 설명  |
|:-------------------------------------------------------------|:-----------------------------------------------------------------------------|:--------|:----|
| [반응형 폼이 제공하는 `ngModel`](#ngmodel-reactive)                   | [`FormControlDirective`](api/forms/FormControlDirective)                     | v6      | -   |
| [`FormBuilder.group` 레거시 옵션 인자](api/forms/FormBuilder#group) | [`AbstractControlOptions` parameter value](api/forms/AbstractControlOptions) | v11     | -   |


<a id="service-worker"></a>

### &commat;angular/service-worker

<!--
| API                                                           | Replacement                                                                            | Deprecation announced | Details |
|:---                                                           |:---                                                                                    |:---                   |:---     |
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated) | [`SwUpdate#activateUpdate()` return value](api/service-worker/SwUpdate#activateUpdate) | v13                   | The return value of `SwUpdate#activateUpdate()` indicates whether an update was successfully activated.                                                                    |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available) | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)                | v13                   | The behavior of `SwUpdate#available` can be rebuilt by filtering for `VersionReadyEvent` events on [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates) |
-->
| API                                                           | 대체 방식                                                                         | 지원중단 발표 | 설명                                                                                                                                         |
|:--------------------------------------------------------------|:------------------------------------------------------------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated) | [`SwUpdate#activateUpdate()` 반환값](api/service-worker/SwUpdate#activateUpdate) | v13     | 업데이트가 성공적으로 끝났는지 여부는 `SwUpdate#activateUpdate()`의 반환값으로 전달됩니다.                                                                             |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available) | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)       | v13     | `SwUpdate#available` 동작은 [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)로 전달되는 `VersionReadyEvent`에 따라 달라질 수 있습니다. |


<a id="upgrade"></a>

### &commat;angular/upgrade

<!--
| API                             | Replacement                                     | Deprecation announced | Details |
|:---                             |:---                                             |:---                   |:---     |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API                   | 대체 방식                                           | 지원중단 발표 | 설명                                              |
|:----------------------|:------------------------------------------------|:--------|:------------------------------------------------|
| [모든 API](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5      | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요. |


<a id="upgrade-static"></a>

### &commat;angular/upgrade/static

<!--
| API                                                                                | Replacement                                                                         | Deprecation announced | Details |
|:---                                                                                |:---                                                                                 |:---                   |:---     |
| [`getAngularLib`](api/upgrade/static/getAngularLib)                                | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal)                       | v5                    | See [Upgrading from AngularJS](guide/upgrade).                                                          |
| [`setAngularLib`](api/upgrade/static/setAngularLib)                                | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal)                       | v5                    | See [Upgrading from AngularJS](guide/upgrade).                                                          |
| [Factory-based signature of `downgradeModule`](api/upgrade/static/downgradeModule) | [NgModule-based signature of `downgradeModule`](api/upgrade/static/downgradeModule) | v13                   | The `downgradeModule` supports more ergonomic NgModule-based API \(versus NgModule factory based API\). |
-->
| API                                                             | 대체 방식                                                                               | 지원중단 발표 | 설명                                                                |
|:----------------------------------------------------------------|:------------------------------------------------------------------------------------|:--------|:------------------------------------------------------------------|
| [`getAngularLib`](api/upgrade/static/getAngularLib)             | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal)                       | v5      | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요.                   |
| [`setAngularLib`](api/upgrade/static/setAngularLib)             | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal)                       | v5      | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요.                   |
| [팩토리 기반의 `downgradeModule`](api/upgrade/static/downgradeModule) | [NgModule-based signature of `downgradeModule`](api/upgrade/static/downgradeModule) | v13     | `downgradeModule` 은 팩토리 방식 API와 비교해서 더 나은 NgModule 기반 API를 제공합니다. |



<a id="deprecated-features"></a>

<!--
## Deprecated features
-->
## 지원이 중단된 기능

<!--
This section lists all deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section.
It also includes deprecated API usage scenarios or API combinations, to augment the information above.
-->
이 섹션에서는 템플릿 문법, 환경설정 옵션 등 [지원이 중단된 API](#deprecated-apis)에 다루지 않았던 지원 중단 기능에 대해 안내합니다.
그리고 이 섹션에서는 좀 더 복잡한 시나리오에 사용하는 API나 여러 API를 조합해서 사용하는 API 중 이제는 지원이 중단된 API에 대해서도 설명합니다.


<a id="wtf"></a>

<!--
### Web Tracing Framework integration
-->
### 웹 트레이싱 프레임워크 지원

<!--
Angular previously supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework) for performance testing of Angular applications.
This integration has not been maintained and is now defunct.
As a result, the integration was deprecated in Angular version 8, and due to no evidence of any existing usage, removed in version 9.
-->
Angular는 이전까지 애플리케이션의 성능을 측정할 때 [웹 트레이싱 프레임워크(Web Tracing Framework, WTF)](https://google.github.io/tracing-framework/)를 사용했습니다.
하지만 이 프레임워크는 더이상 관리되지 않기 때문에 Angular 8 버전부터 제거되기 시작했으며 Angular 9 버전에는 완전히 제거되었습니다.

<a id="deep-component-style-selector"></a>

### `/deep/`, `>>>`, and `::ng-deep` component style selectors

<!--
The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing).
As such, in v4, Angular's support for `/deep/`, `>>>`, and `::ng-deep` was deprecated.
Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") in the Component Styles guide.
-->
섀도우 DOM 안쪽으로 자식 엘리먼트를 선택하는 셀렉터는 [최신 브라우저에서 지원하지 않기 때문에 제거되었습니다](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing).
이에 따라 `/deep/`과 `>>>`, `::ng-deep`은 모두 Angular 4 버전부터 지원이 중단되는 것으로 계획되었습니다.
다만, 지원이 중단되기 전까지 이 기능이 꼭 필요하다면 이 중에서는 `::ng-deep`을 사용하는 것을 권장합니다.

자세한 내용은 컴포넌트 스타일 가이드 문서의 [/deep/, >>>, ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") 섹션을 참고하세요.


<a id="bind-syntax"></a>

<!--
### `bind-`, `on-`, `bindon-`, and `ref-` prefixes
-->
### `bind-`, `on-`, `bindon-`, `ref-` 접두사

<!--
The template prefixes `bind-`, `on-`, `bindon-`, and `ref-` have been deprecated in v13.
Templates should use the more widely documented syntaxes for binding and references:

*   `[input]="value"` instead of `bind-input="value"`
*   `[@trigger]="value"` instead of `bind-animate-trigger="value"`
*   `(click)="onClick()"` instead of `on-click="onClick()"`
*   `[(ngModel)]="value"` instead of `bindon-ngModel="value"`
*   `#templateRef` instead of `ref-templateRef`
-->
템플릿에서만 예외적으로 사용되던 접두사 `bind-`, `on-`, `bindon-`, `ref-`는 13버전부터 사용이 중단되었습니다.
13버전부터는 문서에 있는 바인딩 형식을 정확하게 사용해야 합니다:

*   `bind-input="value"` 대신 `[input]="value"`
*   `bind-animate-trigger="value"` 대신 `[@trigger]="value"`
*   `on-click="onClick()"` 대신 `(click)="onClick()"`
*   `bindon-ngModel="value"` 대신 `[(ngModel)]="value"`
*   `ref-templateRef` 대신 `#templateRef`


<a id="template-tag"></a>

<!--
### `<template>` tag
-->
### `<template>` 태그

<!--
The `<template>` tag was deprecated in v4 to avoid colliding with a DOM element of the same name \(such as when using web components\).
Use `<ng-template>` instead.
For more information, see the [Ahead-of-Time Compilation](guide/aot-compiler) guide.
-->
`<template>` 태그는 DOM에 존재하는 같은 이름의 엘리먼트와 혼동되는 것을 피하기 위해 이름이 변경되었습니다.
앞으로는 `<template>` 대신 `<ng-template>`을 사용하세요.
자세한 내용은 [AOT 컴파일](guide/aot-compiler) 문서를 참고하세요.


<a id="ngmodel-reactive"></a>
<a id="ngmodel-with-reactive-forms"></a>

<!--
### `ngModel` with reactive forms
-->
### 반응형 폼에 사용하는 `ngModel`

<!--
Support for using the `ngModel` input property and `ngModelChange` event with reactive form directives has been deprecated in Angular v6 and can be removed in a future version of Angular.

Now deprecated:

<code-example path="deprecation-guide/src/app/app.component.html" region="deprecated-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="deprecated-example"></code-example>

This support was deprecated for several reasons.
First, developers found this pattern confusing.
It seems like the actual `ngModel` directive is being used, but in fact it's an input/output property named `ngModel` on the reactive form directive that approximates some, but not all, of the directive's behavior.
It allows getting and setting a value and intercepting value events, but some  `ngModel` features, such as delaying updates with`ngModelOptions` or exporting the directive, don't work.

In addition, this pattern mixes template-driven and reactive forms strategies, which prevents taking advantage of the full benefits of either strategy.
Setting the value in the template violates the template-agnostic principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in the class removes the convenience of defining forms in the template.

To update your code before support is removed, decide whether to stick with reactive form directives \(and get/set values using reactive forms patterns\) or switch to template-driven directives.

**After** \(choice 1 - use reactive forms\):

<code-example path="deprecation-guide/src/app/app.component.html" region="reactive-form-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="reactive-form-example"></code-example>

**After** \(choice 2 - use template-driven forms\):

<code-example path="deprecation-guide/src/app/app.component.html" region="template-driven-form-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="template-driven-form-example"></code-example>

By default, when you use this pattern, you get a deprecation warning once in dev mode.
You can choose to silence this warning by configuring `ReactiveFormsModule` at import time:

<code-example path="deprecation-guide/src/app/app.module.ts" region="reactive-form-no-warning"></code-example>

Alternatively, you can choose to surface a separate warning for each instance of this pattern with a configuration value of `"always"`.
This may help to track down where in the code the pattern is being used as the code is being updated.
-->
반응형 폼이 제공하는 `ngModel` 입력 프로퍼티와 `ngModelChange` 이벤트가 Angular 6부터 지원이 중단되었으며, 이후 버전에는 완전히 제거될 예정입니다.

이전에는 이렇게 사용했습니다:

<code-example path="deprecation-guide/src/app/app.component.html" region="deprecated-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="deprecated-example"></code-example>

이 기능이 지원 중단된 이유가 몇가지 있습니다.
첫 번째는 개발자들이 이 패턴을 혼란스러워 했기 때문입니다.
이 패턴을 보면 `ngModel` 디렉티브가 사용된 것이라고 생각할 수 있지만, 실제로는 이름이 `ngModel`인 입출력 프로퍼티를 바인딩한 것입니다.
동작도 비슷하지만 조금 다릅니다.
이렇게 사용하면 `ngModel` 프로퍼티의 값을 참조하거나 이 프로퍼티에 값을 할당할 수 있지만, `ngModel` 디렉티브가 제공하는 기능을 활용하는 것은 아닙니다.
`ngModelOption`으로 값이 할당되는 것을 지연시키거나 디렉티브를 참조하는 것도 불가능합니다.

그리고 이 패턴은 템플릿 기반 폼 개발 방식과 반응형 폼 개발 방식이 섞인 형태이면서도, 각 방식의 장점을 얻을 수 없는 문법입니다.
반응형 폼 개발방식에서는 템플릿 안에서 값을 할당하는 것을 지양하고 있으며, 클래스에서 `FormControl`이나 `FormGroup`을 사용하는 것은 템플릿 기반 폼의 편리함을 버리는 것이기도 합니다.

지원이 중단되기 전에 이 코드를 수정하려면, 먼저 반응형 폼 방식으로 반응형 폼 디렉티브를 사용할지, 템플릿 기반 디렉티블르 사용할지 결정해야 합니다.

**수정 후** \(선택 1 - 반응형 폼 사용하기\):

<code-example path="deprecation-guide/src/app/app.component.html" region="reactive-form-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="reactive-form-example"></code-example>

**수정 후** \(선택 2 - 템플릿 기반 폼 사용하기\):

<code-example path="deprecation-guide/src/app/app.component.html" region="template-driven-form-example"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="template-driven-form-example"></code-example>

이렇게 수정하지 않고 사용하면 개발 모드에서 지원이 중단된다는 경고 메시지가 표시됩니다.
이 경고는 `ReactiveFormsModule`를 로드하는 시점에 아래 코드처럼 지정하면 끌 수 있습니다:

<code-example path="deprecation-guide/src/app/app.module.ts" region="reactive-form-no-warning"></code-example>

아니면 이 설정은 `"always"`로 설정해두고 하나씩 바꿔가는 것도 좋습니다.


<a id="router-class-and-injection-token-guards"></a>

<!--
### Router class and InjectionToken guards and resolvers
-->
### 클래스나 `InjectionToken`를 활용하는 가드, 리졸버

<!--
Class and injection token guards and resolvers are deprecated. Instead, `Route`
objects should use functional-style guards and resolvers. Class-based guards can
be converted to functions by instead using `inject` to get dependencies.

For testing a function `canActivate` guard, using `TestBed` and `TestBed.runInInjectionContext` is recommended.
Test mocks and stubs can be provided through DI with `{provide: X, useValue: StubX}`.
Functional guards can also be written in a way that's either testable with
`runInInjectionContext` or by passing mock implementations of dependencies.
For example:

```
export function myGuardWithMockableDeps(
  dep1 = inject(MyService),
  dep2 = inject(MyService2),
  dep3 = inject(MyService3),
) { }

const route = {
  path: 'admin',
  canActivate: [myGuardWithMockableDeps]
}
```

This deprecation only affects the support for class and
`InjectionToken` guards at the `Route` definition. `Injectable` classes
and `InjectionToken` providers are _not_ deprecated in the general
sense. That said, the interfaces like `CanActivate`,
`CanDeactivate`, etc.  will be deleted in a future release of Angular. Simply removing the
`implements CanActivate` from the injectable class and updating the route definition
to be a function like `canActivate: [() => inject(MyGuard).canActivate()]` is sufficient
to get rid of the deprecation warning.

Functional guards are robust enough to even support the existing
class-based guards through a transform:

```
import {CanMatchFn} from '@angular/router';

function mapToCanMatch(providers: Array<Type<{canMatch: CanMatchFn}>>): CanMatchFn[] {
  return providers.map(provider => (...params) => inject(provider).canMatch(...params));
}
const route = {
  path: 'admin',
  canMatch: mapToCanMatch([AdminGuard]),
};
```

That is to say that guards can continue to be implemented as classes and then converted
to functions at the route definition.
-->
클래스나 의존성 주입 토큰을 활용하는 가드, 리졸버는 지원이 중단되었습니다.
이제는 이 방식 대신 `Route` 객체가 함수 형태의 가드나 리졸버만 받습니다.
기존에 있던 클래스 방식의 가드는 `inject`를 사용해서 의존성 객체를 참조하는 함수 형태로 변경하면 됩니다.

`canActivate` 가드를 테스트하려면 `TestBed`와 `TestBed.runInInjectionContext`를 사용하면 됩니다.
이 때 테스트 환경에서 사용되는 목 객체는 `{provide: X, useValue: StubX}`와 같이 의존성으로 선언할 수 있습니다.
함수 형태의 가드도 마찬가지로 `runInInjectionContext`를 사용하거나 목 객체를 등록하면 됩니다.
예를 들면:

```
export function myGuardWithMockableDeps(
  dep1 = inject(MyService),
  dep2 = inject(MyService2),
  dep3 = inject(MyService3),
) { }

const route = {
  path: 'admin',
  canActivate: [myGuardWithMockableDeps]
}
```

이 지원중단 사항은 `Route`를 선언할 때 클래스나 `InjectionToken`을 활용하는 가드가 있을 때만 영향을 받습니다.
이밖의 경우에서 `INjectable` 클래스나 `InejctionToken` 프로바이더를 사용하는 것은 _영향을 받지 않습니다_.
이 말은, `CanActivate`, `CanDeactivate`와 같은 인터페이스는 이후 버전에서 제거될 수 있다는 것을 의미합니다.
간단하게 수정하려면 `implements CanActivate` 코드를 지우고 `canActivate: [() => inject(MyGuard).canActivate()]` 라고만 해도 됩니다.

아니면 헬퍼 함수를 사용해서 기존 가드들을 변환해도 됩니다:

```
import {CanMatchFn} from '@angular/router';

function mapToCanMatch(providers: Array<Type<{canMatch: CanMatchFn}>>): CanMatchFn[] {
  return providers.map(provider => (...params) => inject(provider).canMatch(...params));
}
const route = {
  path: 'admin',
  canMatch: mapToCanMatch([AdminGuard]),
};
```


<a id="router-writable-properties"></a>

<!--
### Public `Router` properties
-->
### public `Router` 프로퍼티

<!--
None of the public properties of the `Router` are meant to be writeable.
They should all be configured using other methods, all of which have been
documented.

The following strategies are meant to be configured by registering the
application strategy in DI via the `providers` in the root `NgModule` or
`bootstrapApplication`:
* `routeReuseStrategy`
* `titleStrategy`
* `urlHandlingStrategy`

The following options are meant to be configured using the options
available in `RouterModule.forRoot` or `provideRouter` and `withRouterConfig`.
* `onSameUrlNavigation`
* `paramsInheritanceStrategy`
* `urlUpdateStrategy`
* `canceledNavigationResolution`
* `errorHandler`

The following options are deprecated in entirely:
* `malformedUriErrorHandler` - URI parsing errors should be handled in the `UrlSerializer` instead.
* `errorHandler` - Subscribe to the `Router` events and filter for `NavigationError` instead.
-->
`Router`의 public 프로퍼티들은 새 값을 할당할 수 없으며, 다른 메서드를 통해야 값을 변경할 수 있습니다.

아래 정책들은 최상위 `NgModule`이나 `bootstrapApplication`을 사용할 때 구성됩니다:
* `routeReuseStrategy`
* `titleStrategy`
* `urlHandlingStrategy`

그리고 아래 옵션들은 `RouterModule.forRoot`, `provideRouter`, `withRouterConfig` 에서만 사용할 수 있습니다:
* `onSameUrlNavigation`
* `paramsInheritanceStrategy`
* `urlUpdateStrategy`
* `canceledNavigationResolution`
* `errorHandler`

아래 옵션들은 지원이 중단되었습니다:
* `malformedUriErrorHandler` - URI 파싱 에러는 `UrlSerializer`에서 처리해야 합니다.
* `errorHandler` - `Router` 이벤트를 구독하고 `NavigationError`를 필터링하는 방식으로 사용해야 합니다.


<a id="router-can-load"></a>

<!--
### `CanLoad` guards
-->
### `CanLoad` 가드

<!--
`CanLoad` guards in the Router are deprecated in favor of `CanMatch`. These guards execute at the same time
in the lifecycle of a navigation. A `CanMatch` guard which returns false will prevent the `Route` from being
matched at all and also prevent loading the children of the `Route`. `CanMatch` guards can accomplish the same
goals as `CanLoad` but with the addition of allowing the navigation to match other routes when they reject
(such as a wildcard route). There is no need to have both types of guards in the API surface.
-->
`CanLoad` 가드는 같은 시점에 실행되는 `CanMatch`가 도입되면서 지원이 중단되었습니다.
`CanMatch` 가드가 `false` 값을 반환하면 `Route` 로딩을 중단하며, 자식 `Route`들도 로딩이 중단됩니다.
`CanMatch` 가드는 `CanLoad`가 원래 하던 역할과 같지만, 매칭이 실패했을 때 와일드카드 라우팅 규칙을 사용하는 방식을 도입하기 위해 도입된 가드입니다.
두 가드를 동시에 사용할 필요는 없습니다.


<a id="loadChildren"></a>
<a id="loadchildren-string-syntax"></a>

<!--
### `loadChildren` string syntax
-->
### loadChildren 문법

<!--
When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript.
Angular created its own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it.
Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

**Before**:

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-deprecated-syntax"></code-example>

**After**:

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-syntax"></code-example>

<div class="alert is-helpful">

**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically.
Prior to version 7, the `import()` syntax only works in JIT mode \(with view engine\).

</div>

<div class="alert is-helpful">

**Declaration syntax**: <br />
It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`.
You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113).
These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.

</div>
-->
Angular에 지연 라우팅이 처음 등장했을 때는 브라우저가 JavaScript 리소스를 추가로, 동적으로 로딩하는 기능이 없었습니다.
그래서 Angular는 이 기능을 구현하기 위해 독자적으로 `loadChildren: './lazy/lazy.module#LazyModule'`와 같은 문법을 만들어냈습니다.
하지만 이제는 ECMAScript의 동적 로딩 기능을 브라우저 계층에서 지원하는 경우가 많아졌습니다.
그래서 Angular도 이전 방식 대신 새로운 방식을 활용하기로 결정했습니다.

Angular 8 버전부터는 이전까지 사용하던 [`loadChildren`](api/router/LoadChildren) 문법을 사용하지 않고, `import()`를 사용합니다.

**수정 전**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-deprecated-syntax"></code-example>

**수정 후**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-syntax"></code-example>

<div class="alert is-helpful">

**8 버전으로 업데이트하기**: Angular를 8버전으로 올리기 위해 [`ng update`](cli/update) 명령을 실행하면 `loadChildren`으로 지연로딩하던 문법이 자동으로 수정됩니다.
7 버전까지는 `import()` 문법이 JIT 모드에서만 동작했습니다.

</div>

<div class="alert is-helpful">

**선언 문법**: <br />
`ngc`가 지연로딩되는 모듈을 제대로 로딩하려면 `loadChildren: () => import('...').then(m => m.ModuleName)` 라는 문법을 사용해야 합니다.
이 방법 외에 다른 방법을 사용하려면 [여기](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113)를 참고하세요.
이 문법은 Ivy가 도입되면서 더이상 `NgFactories`를 사용하지 않기 때문에 변경된 것입니다.

</div>


<a id="reflect-metadata"></a>

<!--
### Dependency on a reflect-metadata polyfill in JIT mode
-->
### JIT 모드에서 사용하는 reflect-metadata 폴리필

<!--
Angular applications, and specifically applications that relied on the JIT compiler, used to require a polyfill for the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) APIs.

The need for this polyfill was removed in Angular version 8.0 \([see #14473](https://github.com/angular/angular-cli/pull/14473)\), rendering the presence of the polyfill in most Angular applications unnecessary.
Because the polyfill can be depended on by third-party libraries, instead of removing it from all Angular projects, we are deprecating the requirement for this polyfill as of version 8.0.
This should give library authors and application developers sufficient time to evaluate if they need the polyfill, and perform any refactoring necessary to remove the dependency on it.

In a typical Angular project, the polyfill is not used in production builds, so removing it should not impact production applications.
The goal behind this removal is overall simplification of the build setup and decrease in the number of external dependencies.
-->
Angular 애플리케이션과 같이 JIT 컴파일러를 사용하는 애플리케이션은 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API를 사용하기 위해 폴리필이 필요했습니다.

이 폴리필은 Angular 8.0 버전부터 사용하지 않지만\([#14473 참고](https://github.com/angular/angular-cli/pull/14473)\), 서드파티 패키지에 의존성이 있었기 때문에 제거하지는 않았습니다.
이 버전에서는 단순하게 Angular가 직접 사용하는 reflect-metadata 관련 코드를 제거했을 뿐입니다.
당분간 이 패키지는 그대로 유지되겠지만 애플리케이션 개발자나 서드파티 라이브러리 개발자는 이 폴리필이 정말 필요한지 판단해보고 사용하지 않는 쪽으로 코드를 리팩토링하는 것이 나을 수 있습니다.

Angular 프로젝트를 운영용으로 빌드하더라도 폴리필이 사용되는 경우는 그리 많지 않기 때문에 이 폴리필이 제거되더라도 애플리케이션을 운영하는 데에는 큰 영향이 없습니다.
하지만 빌드 단계를 조금 더 단순하게 줄이고 외부 의존성을 정리하기 위해서는 최종적으로 폴리필을 제거하는 것이 좋습니다.


<a id="static-query-resolution"></a>

<!--
### `@ViewChild()` / `@ContentChild()` static resolution as the default
-->
### `@ViewChild()`, `@ContentChild()` 정적 평가

<!--
See the [dedicated migration guide for static queries](guide/static-query-migration).
-->
[정적 쿼리 적용 가이드 문서](guide/static-query-migration)를 참고하세요.


<a id="contentchild-input-together"></a>

<!--
### `@ContentChild()` / `@Input()` used together
-->
### `@ContentChild()`와 `@Input()`을 함께쓰는 문법

<!--
The following pattern is deprecated:

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input-deprecated"></code-example>

Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input"></code-example>
-->
다음과 같이 사용하던 방식은 더이상 사용되지 않습니다:

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input-deprecated"></code-example>

이 방법보다는 두 데코레이터를 따로 나눠서 다음과 같이 구현하는 것이 좋습니다:

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input"></code-example>


<a id="cant-assign-template-vars"></a>

<!--
### Cannot assign to template variables
-->
### 템플릿 변수에 값을 직접 할당할 수 없습니다.

<!--
In the following example, the two-way binding means that `optionName`
should be written when the `valueChange` event fires.

<code-example path="deprecation-guide/src/app/app.component.1.html" region="two-way-template-deprecated"></code-example>

However, in practice, Angular ignores two-way bindings to template variables.
Starting in version 8, attempting to write to template variables is deprecated.
In a future version, we will throw to indicate that the write is not supported.

<code-example path="deprecation-guide/src/app/app.component.html" region="valid-template-bind"></code-example>
-->
아래와 같이 작성된 코드가 있다면, 이 코드는 `valueChange` 이벤트가 발생했을 때 `optionName`의 값이 변경된다는 양방향 바인딩을 의미합니다.

<code-example path="deprecation-guide/src/app/app.component.1.html" region="two-way-template-deprecated"></code-example>

하지만 Angular는 템플릿 변수가 양방향 바인딩으로 연결되되더라도 템플릿 변수에 값을 할당하는 로직은 처리하지 않습니다.
그리고 이제 Angular 8 버전부터는 템플릿 변수에 값을 할당하는 로직 자체를 작성할 수 없습니다.
이 코드는 다음과 같이 작성되어야 하며, 이 코드를 그대로 남겨둔다면 이후 버전에서는 에러가 발생할 수도 있습니다.

<code-example path="deprecation-guide/src/app/app.component.html" region="valid-template-bind"></code-example>


<a id="binding-to-innertext"></a>

<!--
### Binding to `innerText` in `platform-server`
-->
### `platform-server`가 자동으로 변환하던 `innerText` 바인딩

<!--
[Domino](https://github.com/fgnass/domino), which is used in server-side rendering, doesn't support `innerText`, so in platform-server's *domino adapter*, there was special code to fall back to `textContent` if you tried to bind to `innerText`.

These two properties have subtle differences, so switching to `textContent` under the hood can be surprising to users.
For this reason, we are deprecating this behavior.
Going forward, users should explicitly bind to `textContent` when using Domino.
-->
서버 사이드 렌더링에 사용되는 [Domino](https://github.com/fgnass/domino)는 `innerText`를 지원하지 않기 때문에 Domino에 사용된 `innerText`를 자동으로 `textContent`로 변환하는 *domino 어댑터*를 platform-server에서 제공했습니다.

그런데 두 프로퍼티의 동작이 약간 다르기 때문에 `innerText`를 사용한 개발자가 혼란스러울 수 있었습니다.
그래서 앞으로는 Domino에 `innerText`를 사용할 수 없고 명확하게 `textContext`만 사용해서 바인딩하도록 변경되었습니다.


<a id="wtf-apis"></a>

<!--
### `wtfStartTimeRange` and all `wtf*` APIs
-->
### `wtfStartTimeRange`와 `wtf`로 시작하는 모든 API

<!--
All of the `wtf*` APIs are deprecated and will be removed in a future version.
-->
`wtf`로 시작하는 모든 API는 앞으로 배포될 버전에 모두 지원이 중단됩니다.


<a id="entryComponents"></a>
<a id="entrycomponents-and-analyze_for_entry_components-no-longer-required"></a>

<!--
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required
-->
### `entryComponents`, `ANALYZE_FOR_ENTRY_COMPONENTS`는 더이상 사용하지 않습니다.

<!--
Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically.
With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations.
The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.

<div class="alert is-helpful">

**NOTE**: <br />
You may still need to keep these if building a library that will be consumed by a View Engine application.

</div>
-->
이전까지는 `NgModule`을 정의할 때 `entryComponents` 배열을 지정해야 컴파일러가 컴포넌트를 동적으로 생성하고 주입할 수 있었습니다.
Ivy 엔진을 사용하면서 부터는 더이상 이런 코드가 필요하지 않습니다.
기존에 있던 `entryComponents` 배열은 제거하면 되고, `ANALYZE_FOR_ENTRY_COMPONENTS` 의존성 주입 토큰도 같은 이유로 사용하지 않습니다.

<div class="alert is-helpful">

**참고**: <br />
View Engine용 애플리케이션에 사용되는 애플리케이션을 만든다면 계속 사용해야 합니다.

</div>


<a id="moduleWithProviders"></a>
<a id="modulewithproviders-type-without-a-generic"></a>

<!--
### `ModuleWithProviders` type without a generic
-->
### 제네릭 없는 `ModuleWithProviders`

<!--
Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` \(typically using a method named `forRoot()`\).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.
In a future version of Angular, the generic will no longer be optional.

If you're using the CLI, `ng update` should [migrate your code automatically](guide/migration-module-with-providers).
If you're not using the CLI, you can add any missing generic types to your application manually.
For example:

**Before**:

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="ModuleWithProvidersNonGeneric"></code-example>

**After**:

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="ModuleWithProvidersGeneric"></code-example>
-->
`@angular/router`나 `@ngrx/store`와 같은 일부 Angular 라이브러리에는 `ModuleWithProviders` 타입을 반환하는 API가 있었습니다.
`forRoot()`를 사용하는 패턴이 보통 그랬습니다.
이 타입은 `NgModule`과 프로바이더를 함께 묶어 표현하는 타입입니다.
Angular 9 버전부터는 `ModuleWithProviders`를 제네릭 타입 없이 사용할 수 없으며, 제네릭 타입은 `NgModule` 중 하나여야 합니다.
이후 버전에는 제네릭이 필수가 될 것입니다.

Angular CLI를 사용한다면 `ng update`를 실행해서 [코드를 자동으로 마이그레이션](guide/migration-module-with-providers) 할 수 있습니다.
Angular CLI를 사용할 수 없다면 애플리케이션에 존재하는 코드에 제네릭을 직접 지정해야 합니다:

**수정 전**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="ModuleWithProvidersNonGeneric"></code-example>

**수정 후**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="ModuleWithProvidersGeneric"></code-example>

<!--

### Internet Explorer 11

Angular support for Microsoft's Internet Explorer 11 \(IE11\) is deprecated and will be removed in Angular v13.
Ending IE11 support allows Angular to take advantage of web platform APIs present only in evergreen browsers, resulting in better APIs for developers and more capabilities for application users.
An additional motivation behind this removal is the drop in global usage of IE11 to just ~1% \(as of March 2021\).
For full rationale and discussion behind this deprecation, see [RFC: Internet Explorer 11 support deprecation and removal](https://github.com/angular/angular/issues/41840).

<div class="alert is-helpful">

**NOTE**: <br />
IE11 will be supported in Angular v12 LTS releases through November 2022.

</div>

-->


<a id="input-setter-coercion"></a>

<!--
### Input setter coercion
-->
### 입력값 세터 강제

<!--
Since the `strictTemplates` flag has been introduced in Angular, the compiler has been able to type-check input bindings to the declared input type of the corresponding directive.
When a getter/setter pair is used for the input, the setter might need to accept more types than the getter returns, such as when the setter first converts the input value.
However, until TypeScript 4.3 a getter/setter pair was required to have identical types so this pattern could not be accurately declared.

To mitigate this limitation, it was made possible to declare [input setter coercion fields](guide/template-typecheck#input-setter-coercion) in directives that are used when type-checking input bindings.
However, since [TypeScript 4.3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties) the limitation has been removed; setters can now accept a wider type than what is returned by the getter.
This means that input coercion fields are no longer needed, as their effects can be achieved by widening the type of the setter.

For example, the following directive:

<code-example path="deprecation-guide/src/app/submit-button/submit-button.component.ts" language="typescript" region="submitButtonNarrow"></code-example>

can be refactored as follows:

<code-example path="deprecation-guide/src/app/submit-button/submit-button.component.ts" language="typescript" region="submitButton"></code-example>
-->
`strictTemplates` 플래그가 도입되면서 컴파일러는 디렉티브 입력으로 바인딩되는 값의 타입을 직접 검사할 수 있게 되었습니다.
이전에는 게터/세터를 선언할 때 게터의 타입 범위보다 세터의 타입을 더 넓게 지정하는 경우가 있었습니다.
세터에서 값을 보정할 수 있었기 때문입니다.
하지만 TypeScript 4.3 이전까지는 게터/세터가 동일한 타입으로 선언되어야 하기 때문에 이런 방식을 사용해야 했습니다.

[입력값 세터를 강제하는 필드](guide/template-typecheck#input-setter-coercion)를 선언하는 디렉티브를 추가로 만들어서 활용하는 방법도 있습니다.
[TypeScript 4.3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties) 버전에서 이 제약이 완화되었는데, 이제는 게터보다 세터의 타입을 더 넓게 선언할 수 있습니다.
이 말은 입력값 세터를 강제하는 정책이 더이상 필요없다는 것을 의미하게 되었습니다.

그래서 이런 디렉티브가 있다면:

<code-example path="deprecation-guide/src/app/submit-button/submit-button.component.ts" language="typescript" region="submitButtonNarrow"></code-example>

이렇게 수정하면 됩니다:

<code-example path="deprecation-guide/src/app/submit-button/submit-button.component.ts" language="typescript" region="submitButton"></code-example>


<a id="full-template-type-check"></a>

### `fullTemplateTypeCheck`

<!--
When compiling your application using the AOT compiler, your templates are type-checked according to a certain strictness level.
Before Angular 9 there existed only two strictness levels of template type checking as determined by [the `fullTemplateTypeCheck` compiler option](guide/angular-compiler-options).
In version 9 the `strictTemplates` family of compiler options has been introduced as a more fine-grained approach to configuring how strict your templates are being type-checked.

The `fullTemplateTypeCheck` flag is being deprecated in favor of the new `strictTemplates` option and its related compiler options.
Projects that currently have `fullTemplateTypeCheck: true` configured can migrate to the following set of compiler options to achieve the same level of type-checking:
-->
AOT 컴파일러로 애플리케이션을 빌드할 때 템플릿의 타입 검사의 수준을 지정할 수 있습니다.
Angular 9 이전버전 까지는 [`fullTemplateTypeCheck` 컴파일러 옵션](guide/angular-compiler-options)에서 이 수준을 결정할 수 있었습니다.
이제 Angular 9 버전 이후로는 다른 컴파일러 옵션과 같은 계층으로 `strictTemplates` 옵션을 지정하는 방식으로 개선되었으며, `fullTemplateTypeCheck`는 더이상 사용하지 않습니다.
기존에 사용하던 `fullTemplateTypeCheck: true` 옵션은 이렇게 수정하면 됩니다:

<code-example language="json" header="tsconfig.app.json">

{
  "angularCompilerOptions": {
    &hellip;
    "strictTemplates": true,
    "strictInputTypes": false,
    "strictNullInputTypes": false,
    "strictAttributeTypes": false,
    "strictOutputEventTypes": false,
    "strictDomEventTypes": false,
    "strictDomLocalRefTypes": false,
    "strictSafeNavigationTypes": false,
    "strictContextGenerics": false,
    &hellip;
  }
}

</code-example>


<a id="jit-api-changes"></a>

<!--
## JIT API changes due to ViewEngine deprecation
-->
## ViewEngine 지원이 중단되면서 변경되는 JIT API

<!--
In ViewEngine, [JIT compilation](/guide/glossary#jit) required special providers \(such as `Compiler` or `CompilerFactory`\) to be injected in the app and corresponding methods to be invoked.
With Ivy, JIT compilation takes place implicitly if the Component, NgModule, etc. have not already been [AOT compiled](/guide/glossary#aot).
Those special providers were made available in Ivy for backwards-compatibility with ViewEngine to make the transition to Ivy smoother.
Since ViewEngine is deprecated and will soon be removed, those symbols are now deprecated as well.

<div class="alert is-important">

**IMPORTANT**: <br />
this deprecation doesn't affect JIT mode in Ivy \(JIT remains available with Ivy, however we are exploring a possibility of deprecating it in the future.
See [RFC: Exploration of use-cases for Angular JIT compilation mode](https://github.com/angular/angular/issues/43133)\).

</div>
-->
ViewEngine은 [JIT 컴파일]((/guide/glossary#jit) 방식을 사용하기 때문에 `Compiler`나 `CompilerFactory` 등과 같은 특수 프로바이더가 필요했습니다.
하지만 Ivy를 사용하면 Component, NgModule 등이 아직 [AOT 컴파일](/guide/glossary#aot)되지 않았을 때만 JIT 컴파일 방식을 사용합니다.
그래서 기존에 사용하던 특수 프로바이더들은 ViewEngine에서 Ivy로 전환할 때까지 하위 호환성 유지를 위해 제공됩니다.
ViewEngine은 이후 버전에서 제거될 예정이며, 관련 심볼들도 함께 제거될 예정입니다.

<div class="alert is-important">

**중요**: <br />
JIT 방식은 Ivy를 사용해도 여전히 사용할 수 있기 때문에 이 변경사항이 JIT 방식 자체에 영향을 주지는 않습니다.
다만, 이후 버전에는 제거될 수 있습니다.
[RFC: Exploration of use-cases for Angular JIT compilation mode](https://github.com/angular/angular/issues/43133)를 참고하세요.

</div>


<a id="testrequest-errorevent"></a>

<!--
### `TestRequest` accepting `ErrorEvent`
-->
### `ErrorEvent`를 처리하는 `TestRequest`

<!--
Angular provides utilities for testing `HttpClient`.
The `TestRequest` class from `@angular/common/http/testing` mocks HTTP request objects for use with `HttpTestingController`.

`TestRequest` provides an API for simulating an HTTP response with an error.
In earlier versions of Angular, this API accepted objects of type `ErrorEvent`, which does not match the type of error event that browsers return natively.
If you use `ErrorEvent` with `TestRequest`, you should switch to `ProgressEvent`.

Here is an example using a `ProgressEvent`:

<code-example format="typescript" language="typescript">

const mockError = new ProgressEvent('error');
const mockRequest = httpTestingController.expectOne(..);

mockRequest.error(mockError);

</code-example>
-->
Angular는 `HttpClient`를 테스트할 수 있는 유틸을 제공합니다.
`@angular/common/http/testing` 가 제공하는 `TestRequest` 클래스를 사용하면 `HttpTestingController`로 목 HTTP 요청 객체를 처리할 수 있습니다.

`TestRequest`는 에러 응답을 처리하는 API도 제공합니다.
이전 버전에서는 이 API가 `ErrorEvent` 객체를 받았지만, 이 타입은 브라우저가 처리하는 방식에 따라 맞지 않는 경우가 있었습니다.
그래서 이전에 `TestRequest`로 `ErrorEvent` 객체를 사용했다면 이제 이 객체는 `ProgressEvent`로 변경해야 합니다.

이렇게 변경하면 됩니다:

<code-example format="typescript" language="typescript">

const mockError = new ProgressEvent('error');
const mockRequest = httpTestingController.expectOne(..);

mockRequest.error(mockError);

</code-example>


<a id="deprecated-cli-flags"></a>

<!--
## Deprecated CLI APIs and Options
-->
## Angular CLI 지원 중단 API, 옵션

<!--
This section contains a complete list all of the currently deprecated CLI flags.
-->
이 섹션은 Angular CLI에서 지원이 중단된 기능을 설명합니다.

### &commat;angular-devkit/build-angular

<!--
| API/Option                 | May be removed in | Details |
|:---                        |:---               |:---     |
| `deployUrl`                | <!-v13-> v15    | Use `baseHref` option, `APP_BASE_HREF` DI token or a combination of both instead. For more information, see [the deploy url](guide/deployment#the-deploy-url). |
| Protractor builder         | <!-v12-> v14    | Deprecate as part of the Protractor deprecation.                                                                                                               |
-->
| API/옵션        | 지원 중단              | 설명                                                                                                                 |
|:--------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------|
| `deployUrl`   | <!--v13--> v15     | `baseHref` 옵션이나 `APP_BASE_HREF` DI 토큰을 사용하는 것을 권장합니다. 자세한 내용은 [배포 URL](guide/deployment#the-deploy-url) 문서를 참고하세요. |
| Protractor 빌더 | <!--v12--> v14     | Protractor가 지원 중단되면서 함께 지원이 중단되었습니다.                                                                               |


<a id="removed"></a>

<!--
## Removed APIs
-->
## 지원이 중단된 API

<!--
The following APIs have been removed starting with version 11.0.0&ast;:

| Package           | API                   | Replacement                                                                | Details |
|:---               |:---                   |:---                                                                        |:---     |
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) |         |

&ast; To see APIs removed in version 10, check out this guide on the [version 10 docs site](https://v10.angular.io/guide/deprecations#removed).
-->
아래 API들은 Angular 11.0.0&ast; 버전부터 지원이 중단됩니다:

| 패키지               | API                   | 대체 방법                                                                      | 설명  |
|:------------------|:---                   |:---------------------------------------------------------------------------|:----|
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) |     |

&ast; Angular 10 버전에 제거된 API를 확인하려면 [Angular 10 문서](https://v10.angular.io/guide/deprecations#removed)를 참고하세요.


<a id="style-sanitization"></a>

<!--
### Style Sanitization for `[style]` and `[style.prop]` bindings
-->
### `[style]`, `[style.prop]` 바인딩에 적용되던 유효성 검사

<!--
Angular used to sanitize `[style]` and `[style.prop]` bindings to prevent malicious code from being inserted through `javascript:` expressions in CSS `url()` entries.
However, most modern browsers no longer support the usage of these expressions, so sanitization was only maintained for the sake of IE 6 and 7.
Given that Angular does not support either IE 6 or 7 and sanitization has a performance cost, we will no longer sanitize style bindings as of version 10 of Angular.
-->
Angular는 `[style]`이나 `[style.prop]`를 바인딩할 때 `javascript:`나 CSS `url()`과 같은 악성 코드가 실행되는 것을 방지하기 위해 유효성을 검사했었습니다.
이제는 최신 브라우저들이 이런 표현식을 지원하지 않기 때문에 유효성 검사도 IE 6와 7에서만 필요합니다.
그런데 Angular는 더이상 IE 6과 7 버전을 지원하지 않기 때문에 불필요하게 성능에 영향을 줄 수 있는 유효성 검사 로직을 제거했습니다.
Angular 10 버전부터는 스타일을 바인딩할 때 유효성을 검사할 필요가 없습니다.


<!--
### `loadChildren` string syntax in `@angular/router`
-->
### `@angular/router`에서 문자열로 `loadChildren`을 지정하는 방식

<!--
It is no longer possible to use the `loadChildren` string syntax to configure lazy routes.
The string syntax has been replaced with dynamic import statements.
The `DeprecatedLoadChildren` type was removed from `@angular/router`.
Find more information about the replacement in the [`LoadChildrenCallback` documentation](api/router/LoadChildrenCallback).

The supporting classes `NgModuleFactoryLoader`, `SystemJsNgModuleLoader`, and `SystemJsNgModuleLoaderConfig` were removed from `@angular/core`, as well as `SpyNgModuleFactoryLoader` from `@angular/router`.
-->
이제는 `loadChildren` 으로 지연로딩을 구현할 때 문자열 방식을 사용할 수 없고, `import`를 사용해서 동적으로 구성해야 합니다.
이와 함께 `DeprecatedLoadChildren` 타입도 `@angular/router` 패키지에서 제거되었습니다.
자세한 내용은 [`LoadChildrenCallback` 문서](api/router/LoadChildrenCallback)를 참고하세요.

`@angular/core` 패키지에서 `NgModuleFactoryLoader`, `SystemJsNgModuleLoader`, `SystemJsModuleLoaderConfig` 클래스가 제거되었으며, `@angular/router` 패키지에서는 `SpyNgModuleFactoryLoader`가 제거되었습니다.


### `WrappedValue`

<!--
The purpose of `WrappedValue` was to allow the same object instance to be treated as different for the purposes of change detection.
It was commonly used with the `async` pipe in the case where the `Observable` produces the same instance of the value.

Given that this use case is relatively rare and special handling impacted application performance, the `WrappedValue` API has been removed in Angular 13.

If you rely on the behavior that the same object instance should cause change detection, you have two options:

*   Clone the resulting value so that it has a new identity
*   Explicitly call [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges) to force the update
-->
`WrappedValue`는 객체 인스턴스 하나에 변화 감지 정책을 여러가지 방식으로 적용하기 위해 도입되었습니다.
`Observable`이 같은 인스턴스를 전달하고 `async` 파이프가 이 값을 받을 때 주로 사용되었습니다.

하지만 이 인터페이스가 사용되는 경우는 거의 없었고, 잘못 사용하면 애플리케이션 성능에 큰 영향을 줄 수 있기 때문에 v10 버전부터는 지원을 중단했습니다.
이 방식을 대체할 문법은 계획되어 있지 않습니다.

같은 객체 인스턴스를 받았을 때 변화 감지 정책을 다르게 활용하는 방법은 두 가지가 있습니다:

*   객체를 복제해서 사용하세요. 다른 객체가 됩니다.
*   강제로 갱신하려면 [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges)를 직접 실행하세요.


<!-- links -->

[AioGuideI18nCommonMergeDefineLocalesInTheBuildConfiguration]: guide/i18n-common-merge#define-locales-in-the-build-configuration "Define locales in the build configuration - Common Internationalization task #6: Merge translations into the application | Angular"

<!-- end links -->

@reviewed 2023-05-03
