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
v13 -> v16
-->

<!--
| Area                                | API or Feature                                                                                             | May be removed in     |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------- |
| `@angular/common`                   | [`ReflectiveInjector`](#reflectiveinjector)                                                                | <!-v8-> v11         |
| `@angular/common`                   | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation)              | <!-v9-> v11         |
| `@angular/common/http`              | [`XhrFactory`](api/common/http/XhrFactory)                                                                 | <!-v12-> v15        |
| `@angular/core`                     | [`DefaultIterableDiffer`](#core)                                                                           | <!-v7-> v11         |
| `@angular/core`                     | [`ReflectiveKey`](#core)                                                                                   | <!-v8-> v11         |
| `@angular/core`                     | [`RenderComponentType`](#core)                                                                             | <!-v7-> v11         |
| `@angular/core`                     | [Factory-based signature of `ApplicationRef.bootstrap`](#core)                                             | <!-v13-> v15        |
| `@angular/core`                     | [`PlatformRef.bootstrapModuleFactory`](#core)                                                              | <!-v13-> v15        |
| `@angular/core`                     | [`getModuleFactory`](#core)                                                                                | <!-v13-> v16        |
| `@angular/core`                     | [`ModuleWithComponentFactories`](#core)                                                                    | <!-v13-> v16        |
| `@angular/core`                     | [`Compiler`](#core)                                                                                        | <!-v13-> v16        |
| `@angular/core`                     | [`CompilerFactory`](#core)                                                                                 | <!-v13-> v16        |
| `@angular/core`                     | [`NgModuleFactory`](#core)                                                                                 | <!-v13-> v16        |
| `@angular/platform-browser-dynamic` | [`JitCompilerFactory`](#platform-browser-dynamic)                                                          | <!-v13-> v16        |
| `@angular/forms`                    | [`ngModel` with reactive forms](#ngmodel-reactive)                                                         | <!-v6-> v11         |
| `@angular/upgrade`                  | [`@angular/upgrade`](#upgrade)                                                                             | <!-v8-> v11         |
| `@angular/upgrade`                  | [`getAngularLib`](#upgrade-static)                                                                         | <!-v8-> v11         |
| `@angular/upgrade`                  | [`setAngularLib`](#upgrade-static)                                                                         | <!-v8-> v11         |
| template syntax                     | [`<template>`](#template-tag)                                                                              | <!-v7-> v11         |
| polyfills                           | [reflect-metadata](#reflect-metadata)                                                                      | <!-v8-> v11         |
| `@angular/compiler-cli`             | [Input setter coercion](#input-setter-coercion)                                                            | <!-v13-> v15        |
| `@angular/compiler-cli`             | [`fullTemplateTypeCheck`](#full-template-type-check)                                                       | <!-v13-> v15        |
| `@angular/core`                     | [`defineInjectable`](#core)                                                                                | <!-v8-> v11         |
| `@angular/core`                     | [`entryComponents`](api/core/NgModule#entryComponents)                                                     | <!-v9-> v11         |
| `@angular/core`                     | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)                                    | <!-v9-> v11         |
| `@angular/core`                     | [Factory-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | <!-v13-> v15        |
| `@angular/core/testing`             | [`TestBed.get`](#testing)                                                                                  | <!-v9-> v12         |
| `@angular/core/testing`             | [`async`](#testing)                                                                                        | <!-v9-> v12         |
| `@angular/core/testing`             | [`aotSummaries` argument in `TestBed.initTestEnvironment`](#testing)                                       | <!-v13-> v14        |
| `@angular/core/testing`             | [`aotSummaries` field of the `TestModuleMetadata` type](#testing)                                          | <!-v13-> v14        |
| `@angular/forms`                    | [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group)                                | <!-v11-> v14        |
| `@angular/platform-server`          | [`renderModuleFactory`](#platform-server)                                                                  | <!-v13-> v15        |
| `@angular/service-worker`           | [`SwUpdate#activated`](api/service-worker/SwUpdate#activated)                                              | <!-v13-> v16        |
| `@angular/service-worker`           | [`SwUpdate#available`](api/service-worker/SwUpdate#available)                                              | <!-v13-> v16        |
| template syntax                     | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)                                         | <!-v7-> unspecified |
| template syntax                     | [`bind-`, `on-`, `bindon-`, and `ref-`](#bind-syntax)                                                      | <!-v13-> v15        |

For information about Angular CDK and Angular Material deprecations, see the [changelog](https://github.com/angular/components/blob/master/CHANGELOG.md).
-->
| 영역 | API, 기능 | 지원 중단 |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------- |
| `@angular/common`                   | [`ReflectiveInjector`](#reflectiveinjector)                                                                | <!--v8--> v11         |
| `@angular/common`                   | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation)              | <!--v9--> v11         |
| `@angular/common/http`              | [`XhrFactory`](api/common/http/XhrFactory)                                                                 | <!--v12--> v15        |
| `@angular/core`                     | [`DefaultIterableDiffer`](#core)                                                                           | <!--v7--> v11         |
| `@angular/core`                     | [`ReflectiveKey`](#core)                                                                                   | <!--v8--> v11         |
| `@angular/core`                     | [`RenderComponentType`](#core)                                                                             | <!--v7--> v11         |
| `@angular/core`                     | [팩토리 기반으로 제공되는 `ApplicationRef.bootstrap`](#core)                                             | <!--v13--> v15        |
| `@angular/core`                     | [`PlatformRef.bootstrapModuleFactory`](#core)                                                              | <!--v13--> v15        |
| `@angular/core`                     | [`getModuleFactory`](#core)                                                                                | <!--v13--> v16        |
| `@angular/core`                     | [`ModuleWithComponentFactories`](#core)                                                                    | <!--v13--> v16        |
| `@angular/core`                     | [`Compiler`](#core)                                                                                        | <!--v13--> v16        |
| `@angular/core`                     | [`CompilerFactory`](#core)                                                                                 | <!--v13--> v16        |
| `@angular/core`                     | [`NgModuleFactory`](#core)                                                                                 | <!--v13--> v16        |
| `@angular/platform-browser-dynamic` | [`JitCompilerFactory`](#platform-browser-dynamic)                                                          | <!--v13--> v16        |
| `@angular/forms`                    | [반응형 폼이 제공하는 `ngModel`](#ngmodel-reactive)                                                         | <!--v6--> v11         |
| `@angular/upgrade`                  | [`@angular/upgrade`](#upgrade)                                                                             | <!--v8--> v11         |
| `@angular/upgrade`                  | [`getAngularLib`](#upgrade-static)                                                                         | <!--v8--> v11         |
| `@angular/upgrade`                  | [`setAngularLib`](#upgrade-static)                                                                         | <!--v8--> v11         |
| 템플릿 문법                     | [`<template>`](#template-tag)                                                                              | <!--v7--> v11         |
| 폴리필                           | [reflect-metadata](#reflect-metadata)                                                                      | <!--v8--> v11         |
| `@angular/compiler-cli`             | [입력값 세터 강제](#input-setter-coercion)                                                            | <!--v13--> v15        |
| `@angular/compiler-cli`             | [`fullTemplateTypeCheck`](#full-template-type-check)                                                       | <!--v13--> v15        |
| `@angular/core`                     | [`defineInjectable`](#core)                                                                                | <!--v8--> v11         |
| `@angular/core`                     | [`entryComponents`](api/core/NgModule#entryComponents)                                                     | <!--v9--> v11         |
| `@angular/core`                     | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)                                    | <!--v9--> v11         |
| `@angular/core`                     | [팩토리 기반으로 제공되는 `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | <!--v13--> v15        |
| `@angular/core/testing`             | [`TestBed.get`](#testing)                                                                                  | <!--v9--> v12         |
| `@angular/core/testing`             | [`async`](#testing)                                                                                        | <!--v9--> v12         |
| `@angular/core/testing`             | [`TestBed.initTestEnvironment`의 `aotSummaries` 인자](#testing)                                       | <!--v13--> v14        |
| `@angular/core/testing`             | [`TestModuleMetadata` 타입의 `aotSummaries` 필드](#testing)                                          | <!--v13--> v14        |
| `@angular/forms`                    | [`FormBuilder.group` 레거시 옵션 인자](api/forms/FormBuilder#group)                                | <!--v11--> v14        |
| `@angular/platform-server`          | [`renderModuleFactory`](#platform-server)                                                                  | <!--v13--> v15        |
| `@angular/service-worker`           | [`SwUpdate#activated`](api/service-worker/SwUpdate#activated)                                              | <!--v13--> v16        |
| `@angular/service-worker`           | [`SwUpdate#available`](api/service-worker/SwUpdate#available)                                              | <!--v13--> v16        |
| 템플릿 문법                     | [`/deep/`, `>>>`, `::ng-deep`](#deep-component-style-selector)                                         | <!--v7--> unspecified |
| 템플릿 문법                     | [`bind-`, `on-`, `bindon-`, `ref-`](#bind-syntax)                                                      | <!--v13--> v15        |

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
**TIP**: In the [API reference section](api) of this site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).
-->
**팁**: [API 스펙](api) 문서에서 지원이 중단된 API는 ~~취소선~~으로 표시됩니다. 그리고 해당 문서에서 지원이 중단된 기능만 보려면 [**Status: deprecated**](api?status=deprecated)를 선택하면 됩니다.

</div>

{@a common}

### @angular/common

<!--
| API                                                                                           | Replacement                                         | Deprecation announced | Notes                                                                                                     |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | From v11 the default code will be extracted from the locale data given by `LOCALE_ID`, rather than `USD`. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | `LOCALE_ID`의 기본값은 `USD` 였지만 v11부터는 기본값을 지정하지 않습니다. |


{@a common-http}

### @angular/common/http

<!--
| API                                        | Replacement                       | Deprecation announced | Notes                                                                        |
| :----------------------------------------- | :-------------------------------- | :-------------------- | :--------------------------------------------------------------------------- |
| [`XhrFactory`](api/common/http/XhrFactory) | `XhrFactory` in `@angular/common` | v12                   | The `XhrFactory` has moved from `@angular/common/http` to `@angular/common`. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :----------------------------------------- | :-------------------------------- | :-------------------- | :--------------------------------------------------------------------------- |
| [`XhrFactory`](api/common/http/XhrFactory) | `@angular/common` 패키지의 `XhrFactory` | v12                   | `XhrFactory`는 `@angular/common/http`에서 `@angular/common`으로 이동했습니다. |


{@a core}

### @angular/core

<!--
| API                                                                                                        | Replacement                                                                                                                                                       | Deprecation announced | Notes                                                                                                                                                                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)                                                  | n/a                                                                                                                                                               | v4                    | Not part of public API.                                                                                                                                                                                                                                                                            |
| [`ReflectiveInjector`](api/core/ReflectiveInjector)                                                        | `{@link Injector#create Injector.create()}`                                                                                                                       | v5                    | See [`ReflectiveInjector`](#reflectiveinjector)                                                                                                                                                                                                                                                    |
| [`ReflectiveKey`](api/core/ReflectiveKey)                                                                  | none                                                                                                                                                              | v5                    | none                                                                                                                                                                                                                                                                                               |
| [`defineInjectable`](api/core/defineInjectable)                                                            | `ɵɵdefineInjectable`                                                                                                                                              | v8                    | Used only in generated code. No source code should depend on this API.                                                                                                                                                                                                                             |
| [`entryComponents`](api/core/NgModule#entryComponents)                                                     | none                                                                                                                                                              | v9                    | See [`entryComponents`](#entryComponents)                                                                                                                                                                                                                                                          |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)                                    | none                                                                                                                                                              | v9                    | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents)                                                                                                                                                                                                                                             |
| [`async`](api/core/testing/async)                                                                          | [`waitForAsync`](api/core/testing/waitForAsync)                                                                                                                   | v11                   | The [`async`](api/core/testing/async) function from `@angular/core/testing` has been renamed to `waitForAsync` in order to avoid confusion with the native JavaScript <code class="no-auto-link">async</code> syntax. The existing function is deprecated and will be removed in a future version. |
| [`getModuleFactory`](api/core/getModuleFactory)                                                            | [`getNgModuleById`](api/core/getNgModuleById)                                                                                                                     | v13                   | Ivy allows working with NgModule classes directly, without retrieving corresponding factories.                                                                                                                                                                                                     |
| `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly`                         | none (was part of [issue #40091](https://github.com/angular/angular/issues/40091))                                                                                |                       | This is a temporary flag introduced as part of bugfix of [issue #40091](https://github.com/angular/angular/issues/40091) and will be removed.                                                                                                                                                      |
| Factory-based signature of [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                 | Type-based signature of [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                                                                           | v13                   | With Ivy, there is no need to resolve Component factory and Component Type can be provided directly.                                                                                                                                                                                               |
| [`PlatformRef.bootstrapModuleFactory`](api/core/PlatformRef#bootstrapModuleFactory)                        | [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule)                                                                                             | v13                   | With Ivy, there is no need to resolve NgModule factory and NgModule Type can be provided directly.                                                                                                                                                                                                 |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories)                                    | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                                                  |
| [`Compiler`](api/core/Compiler)                                                                            | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                                                  |
| [`CompilerFactory`](api/core/CompilerFactory)                                                              | none                                                                                                                                                              | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                                                  |
| [`NgModuleFactory`](api/core/NgModuleFactory)                                                              | Use non-factory based framework APIs like [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule) and [createNgModuleRef](api/core/createNgModuleRef) | v13                   | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context.                                                                                                                                                  |
| [Factory-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | [Type-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)                                                           | v13                   | Angular no longer requires component factories to dynamically create components. Use different signature of the `createComponent` method, which allows passing Component class directly.                                                                                                           |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)                                                  | -                                                                                                                                                               | v4                    | public API에서 제거되었습니다. |
| [`ReflectiveInjector`](api/core/ReflectiveInjector)                                                        | `{@link Injector#create Injector.create()}`                                                                                                                       | v5                    | [`ReflectiveInjector`](#reflectiveinjector)를 참고하세요. |
| [`ReflectiveKey`](api/core/ReflectiveKey)                                                                  | -                                                                                                                                                              | v5                    | - |
| [`defineInjectable`](api/core/defineInjectable)                                                            | `ɵɵdefineInjectable`                                                                                                                                              | v8                    | 빌드 후 생성된 코드에서만 사용됩니다. 소스 코드에서는 이 API를 사용하면 안됩니다. |
| [`entryComponents`](api/core/NgModule#entryComponents)                                                     | -                                                                                                                                                              | v9                    | [`entryComponents`](#entryComponents)를 참고하세요. |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)                                    | -                                                                                                                                                              | v9                    | [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents)를 참고하세요. |
| [`async`](api/core/testing/async)                                                                          | [`waitForAsync`](api/core/testing/waitForAsync)                                                                                                                   | v11                   | `@angular/core/testing` 패키지로 제공되는 [`async`](api/core/testing/async) 함수는 표준 JavaScript <code class="no-auto-link">async</code> 문법과 혼동을 피하기 위해 `waitForAsync`라는 이름으로 변경되었습니다. `async()` 함수는 지원을 중단하기로 결정되었며 이후 버전에서는 제거될 예정입니다. |
| [`getModuleFactory`](api/core/getModuleFactory)                                                            | [`getNgModuleById`](api/core/getNgModuleById)                                                                                                                     | v13                   | Ivy는 팩토리를 거치지 않아도 NgModule 클래스와 직접 연동할 수 있습니다. |
| `ViewChildren.emitDistinctChangesOnly` / `ContentChildren.emitDistinctChangesOnly`                         | -                                                                                |                       | 이 플래그는 [이슈 #40091](https://github.com/angular/angular/issues/40091) 버그를 해결하기 위해 임시로 도입되었으며 이제 사용되지 않습니다. |
| 팩토리 기반으로 제공되는 [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                 | 타입 기반으로 제공되는 [`ApplicationRef.bootstrap`](api/core/ApplicationRef#bootstrap)                                                                           | v13                   | Ivy를 사용할 때는 컴포넌트 팩토리를 사용하지 않고 컴포넌트 타입을 직접 참조합니다. |
| [`PlatformRef.bootstrapModuleFactory`](api/core/PlatformRef#bootstrapModuleFactory)                        | [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule)                                                                                             | v13                   | Ivy를 사용할 때는 NgModule 팩토리를 사용하지 않고 NgModule 타입을 직접 참조합니다. |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories)                                    | -                                                                                                                                                              | v13                   | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |
| [`Compiler`](api/core/Compiler)                                                                            | -                                                                                                                                                              | v13                   | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |
| [`CompilerFactory`](api/core/CompilerFactory)                                                              | -                                                                                                                                                              | v13                   | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |
| [`NgModuleFactory`](api/core/NgModuleFactory)                                                              | [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule)나 [createNgModuleRef](api/core/createNgModuleRef)와 같이 팩토리 기반 API가 아닌 것을 사용하세요. | v13                   | Ivy JIT 모드에서는 이 심볼을 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |
| [팩토리 기반으로 제공되는 `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent) | [Type-based signature of `ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)                                                           | v13                   | Angular는 동적으로 컴포넌트를 생성할 때 더이상 컴포넌트 팩토리를 사용하지 않습니다. 컴포넌트 클래스를 직접 활용하는 `createComponent` 메소드를 사용하세요. |

{@a testing}

### @angular/core/testing

<!--
| API                                                                                                      | Replacement                                         | Deprecation announced | Notes                                         |
| :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :-------------------- | :-------------------------------------------- |
| [`TestBed.get`](api/core/testing/TestBed#get)                                                            | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9                    | Same behavior, but type safe.                 |
| [`async`](api/core/testing/async)                                                                        | [`waitForAsync`](api/core/testing/waitForAsync)     | v10                   | Same behavior, but rename to avoid confusion. |
| [`aotSummaries` argument in `TestBed.initTestEnvironment`](api/core/testing/TestBed#inittestenvironment) | No replacement needed                               | v13                   | Summary files are unused in Ivy.              |
| [`aotSummaries` field of the `TestModuleMetadata` type](api/core/testing/TestModuleMetadata)             | No replacement needed                               | v13                   | Summary files are unused in Ivy.              |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :-------------------- | :-------------------------------------------- |
| [`TestBed.get`](api/core/testing/TestBed#get)                                                            | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9                    | 동작은 같지만 타입 검사가 강화되었습니다. |
| [`async`](api/core/testing/async)                                                                        | [`waitForAsync`](api/core/testing/waitForAsync)     | v10                   | 동작은 같지만 혼동을 피하기 위해 이름이 변경되었습니다. |
| [`TestBed.initTestEnvironment` 메서드의 `aotSummaries` 인자](api/core/testing/TestBed#inittestenvironment) | -                               | v13                   | Ivy에서는 사용하지 않습니다. |
| [`TestModuleMetadata` 타입의 `aotSummaries` 필드](api/core/testing/TestModuleMetadata)             | -                               | v13                   | Ivy에서는 사용하지 않습니다. |

{@a platform-browser-dynamic}

### @angular/platform-browser-dynamic

<!--
| API                                                                     | Replacement | Deprecation announced | Notes                                                                                                                             |
| :---------------------------------------------------------------------- | :---------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory) | none        | v13                   | This symbol is no longer necessary. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :---------------------------------------------------------------------- | :---------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory) | -        | v13                   | 이 심볼은 더이상 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |

{@a platform-server}

### @angular/platform-server

<!--
| API                                                              | Replacement                                        | Deprecation announced | Notes                                                                                                                             |
| :--------------------------------------------------------------- | :------------------------------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`renderModuleFactory`](api/platform-server/renderModuleFactory) | [`renderModule`](api/platform-server/renderModule) | v13                   | This symbol is no longer necessary. See [JIT API changes due to ViewEngine deprecation](#jit-api-changes) for additional context. |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :--------------------------------------------------------------- | :------------------------------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [`renderModuleFactory`](api/platform-server/renderModuleFactory) | [`renderModule`](api/platform-server/renderModule) | v13                   | 이 심볼은 더이상 사용하지 않습니다. 자세한 내용은 [ViewEngine이 지원 중단되면서 변경되는 JIT API](#jit-api-changes) 섹션을 참고하세요. |

{@a forms}

### @angular/forms

<!--
| API                                                                         | Replacement                                                                  | Deprecation announced | Notes |
| :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :-------------------- | :---- |
| [`ngModel` with reactive forms](#ngmodel-reactive)                          | [`FormControlDirective`](api/forms/FormControlDirective)                     | v6                    | none  |
| [`FormBuilder.group` legacy options parameter](api/forms/FormBuilder#group) | [`AbstractControlOptions` parameter value](api/forms/AbstractControlOptions) | v11                   | none  |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :-------------------- | :---- |
| [반응형 폼이 제공하는 `ngModel`](#ngmodel-reactive)                          | [`FormControlDirective`](api/forms/FormControlDirective)                     | v6                    | -  |
| [`FormBuilder.group` 레거시 옵션 인자](api/forms/FormBuilder#group) | [`AbstractControlOptions` 인자](api/forms/AbstractControlOptions) | v11                   | -  |

{@a service-worker}

### @angular/service-worker

<!--
| API                                                           | Replacement                                                                            | Deprecation announced | Notes                                                                                                                                                                      |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated) | [`SwUpdate#activateUpdate()` return value](api/service-worker/SwUpdate#activateUpdate) | v13                   | The return value of `SwUpdate#activateUpdate()` indicates whether an update was successfully activated.                                                                    |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available) | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)                | v13                   | The behavior of `SwUpdate#available` can be rebuilt by filtering for `VersionReadyEvent` events on [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates) |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated) | [`SwUpdate#activateUpdate()` 반환값](api/service-worker/SwUpdate#activateUpdate) | v13                   | 업데이트가 성공적으로 끝났는지 여부는 `SwUpdate#activateUpdate()`의 반환값으로 전달됩니다. |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available) | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)                | v13                   | `SwUpdate#available` 동작은 [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)로 전달되는 `VersionReadyEvent`에 따라 달라질 수 있습니다. |

{@a upgrade}

### @angular/upgrade

<!--
| API                             | Replacement                                     | Deprecation announced | Notes                                          |
| :------------------------------ | :---------------------------------------------- | :-------------------- | :--------------------------------------------- |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :------------------------------ | :---------------------------------------------- | :-------------------- | :--------------------------------------------- |
| [모든 API](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5                    | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요. |

{@a upgrade-static}

### @angular/upgrade/static

<!--
| API                                                 | Replacement                                                   | Deprecation announced | Notes                                          |
| :-------------------------------------------------- | :------------------------------------------------------------ | :-------------------- | :--------------------------------------------- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 방식 | 지원 중단 발표 | 참고 |
| :-------------------------------------------------- | :------------------------------------------------------------ | :-------------------- | :--------------------------------------------- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5                    | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요. |
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5                    | [AngularJS 앱 업그레이드하기](guide/upgrade) 문서를 참고하세요. |


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
Angular previously supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework) for performance testing of Angular applications. This integration has not been maintained and is now defunct. As a result, the integration was deprecated in Angular version 8, and due to no evidence of any existing usage, removed in version 9.
-->
Angular는 이전까지 애플리케이션의 성능을 측정할 때 [웹 트레이싱 프레임워크(Web Tracing Framework, WTF)](https://google.github.io/tracing-framework/)를 사용했습니다.
하지만 이 프레임워크는 더이상 관리되지 않기 때문에 Angular 8 버전부터 제거되기 시작했으며 Angular 9 버전에는 완전히 제거되었습니다.

{@a deep-component-style-selector}

### `/deep/`, `>>>`, and `::ng-deep` component style selectors

<!--
The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). As such, in v4 we deprecated support in Angular for all three of `/deep/`, `>>>`, and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") in the Component Styles guide.
-->
섀도우 DOM 안쪽으로 자식 엘리먼트를 선택하는 셀렉터는 [최신 브라우저에서 지원하지 않기 때문에 제거되었습니다](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing).
이에 따라 Angular 3 버전에 존재하던 `/deep/`과 `>>>`, `::ng-deep`은 모두 Angular 4 버전부터 지원이 중단되는 것으로 계획되었습니다.
다만, 지원이 중단되기 전까지 이 기능이 꼭 필요하다면 이 중에서는 `::ng-deep`을 사용하는 것을 권장합니다.

자세한 내용은 컴포넌트 스타일 가이드 문서의 [/deep/, >>>, ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") 섹션을 참고하세요.


{@a bind-syntax}

<!--
### `bind-`, `on-`, `bindon-`, and `ref-` prefixes
-->
### `bind-`, `on-`, `bindon-`, `ref-` 접두사

<!--
The template prefixes `bind-`, `on-`, `bindon-`, and `ref-` have been deprecated in v13. Templates
should use the more widely documented syntaxes for binding and references:

* `[input]="value"` instead of `bind-input="value"`
* `[@trigger]="value"` instead of	`bind-animate-trigger="value"`
* `(click)="onClick()"` instead of `on-click="onClick()"`
* `[(ngModel)]="value"` instead of `bindon-ngModel="value"`
* `#templateRef` instead of `ref-templateRef`
-->
템플릿에서만 예외적으로 사용되던 접두사 `bind-`, `on-`, `bindon-`, `ref-`는 13버전부터 사용이 중단되었습니다.
13버전부터는 문서에 있는 바인딩 형식을 정확하게 사용해야 합니다:

* `bind-input="value"` 대신 `[input]="value"` 
* `bind-animate-trigger="value"` 대신 `[@trigger]="value"`	
* `on-click="onClick()"` 대신 `(click)="onClick()"`
* `bindon-ngModel="value"` 대신 `[(ngModel)]="value"` 
* `ref-templateRef` 대신 `#templateRef` 

{@a template-tag}

<!--
### `<template>` tag
-->
### `<template>` 태그

<!--
The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/aot-compiler) guide.
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
Support for using the `ngModel` input property and `ngModelChange` event with reactive form directives has been deprecated in Angular v6 and will be removed in a future version of Angular.

Now deprecated:

<code-example path="deprecation-guide/src/app/app.component.html" region="deprecated-example" language="html"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="deprecated-example"></code-example>

This support was deprecated for several reasons. First, developers found this pattern confusing. It seems like the actual `ngModel` directive is being used, but in fact it's an input/output property named `ngModel` on the reactive form directive that approximates some, but not all, of the directive's behavior.
It allows getting and setting a value and intercepting value events, but some of `ngModel`'s other features, such as delaying updates with`ngModelOptions` or exporting the directive, don't work.

In addition, this pattern mixes template-driven and reactive forms strategies, which prevents taking advantage of the full benefits of either strategy.
Setting the value in the template violates the template-agnostic principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in the class removes the convenience of defining forms in the template.

To update your code before support is removed, you'll want to decide whether to stick with reactive form directives (and get/set values using reactive forms patterns) or switch to template-driven directives.

**After** (choice 1 - use reactive forms):

<code-example path="deprecation-guide/src/app/app.component.html" region="reactive-form-example" language="html"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="reactive-form-example"></code-example>

**After** (choice 2 - use template-driven forms):

<code-example path="deprecation-guide/src/app/app.component.html" region="template-driven-form-example" language="html"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="template-driven-form-example"></code-example>

By default, when you use this pattern, you will see a deprecation warning once in dev mode. You can choose to silence this warning by configuring `ReactiveFormsModule` at import time:

<code-example path="deprecation-guide/src/app/app.module.ts" region="reactive-form-no-warning"></code-example>

Alternatively, you can choose to surface a separate warning for each instance of this pattern with a configuration value of `"always"`. This may help to track down where in the code the pattern is being used as the code is being updated.
-->
반응형 폼이 제공하는 `ngModel` 입력 프로퍼티와 `ngModelChange` 이벤트가 Angular 6부터 지원이 중단되었으며, 이후 버전에는 완전히 제거될 예정입니다.

이전에는 이렇게 사용했습니다:

<code-example path="deprecation-guide/src/app/app.component.html" region="deprecated-example" language="html"></code-example>

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

**수정 후** (선택 1 - 반응형 폼 사용하기):

<code-example path="deprecation-guide/src/app/app.component.html" region="reactive-form-example" language="html"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="reactive-form-example"></code-example>

**수정 후** (선택 2 - 템플릿 기반 폼 사용하기):

<code-example path="deprecation-guide/src/app/app.component.html" region="template-driven-form-example" language="html"></code-example>

<code-example path="deprecation-guide/src/app/app.component.ts" region="template-driven-form-example"></code-example>

이렇게 수정하지 않고 사용하면 개발 모드에서 지원이 중단된다는 경고 메시지가 표시됩니다.
이 경고는 `ReactiveFormsModule`를 로드하는 시점에 아래 코드처럼 지정하면 끌 수 있습니다::

<code-example path="deprecation-guide/src/app/app.module.ts" region="reactive-form-no-warning"></code-example>

아니면 이 설정은 `"always"`로 설정해두고 하나씩 바꿔가는 것도 좋습니다.


{@a reflectiveinjector}

### ReflectiveInjector

<!--
In v5, Angular replaced the `ReflectiveInjector` with the `StaticInjector`. The injector no longer requires the Reflect polyfill, reducing application size for most developers.

**Before**:
-->
Angular 5버전부터 `ReflectiveInjector`가 `StaticInjector`로 변경되었습니다.
그 결과로 이제는 더이상 Reflect 폴리필이 사용되지 않기 때문에 Angular 애플리케이션의 빌드 결과물 크기도 더 작아졌습니다.

**수정 전**

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="reflective-injector-deprecated-example"></code-example>

<!--
**After**:
-->
**수정 후**

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="static-injector-example"></code-example>

{@a loadChildren}
{@a loadchildren-string-syntax}
<!--
### loadChildren string syntax
-->
### loadChildren 문법

<!--
When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

**Before**:
-->
Angular에 지연 라우팅이 처음 등장했을 때는 브라우저가 JavaScript 리소스를 추가로, 동적으로 로딩하는 기능이 없었습니다.
그래서 Angular는 이 기능을 구현하기 위해 독자적으로 `loadChildren: './lazy/lazy.module#LazyModule'`와 같은 문법을 만들어냈습니다.
하지만 이제는 ECMAScript의 동적 로딩 기능을 브라우저 계층에서 지원하는 경우가 많아졌습니다.
그래서 Angular도 이전 방식 대신 새로운 방식을 활용하기로 결정했습니다.

Angular 8 버전부터는 이전까지 사용하던 [`loadChildren`](api/router/LoadChildren) 문법을 사용하지 않고, `import()`를 사용합니다.

**수정 전**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-deprecated-syntax"></code-example>

<!--
**After**:
-->
**수정 후**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="lazyload-syntax"></code-example>

<div class="alert is-helpful">


<!--
**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine).

-->
**8 버전으로 업데이트하기**: Angular를 8버전으로 올리기 위해 [`ng update`](cli/update) 명령을 실행하면 `loadChildren`으로 지연로딩하던 문법이 자동으로 수정됩니다. 7 버전까지는 `import()` 문법이 JIT 모드에서만 동작했습니다.

</div>

<div class="alert is-helpful">

<!--
**Declaration syntax**: It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`. You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113). These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.
-->
**선언형 문법(declaration syntax)**: `loadChildren` 프로퍼티를 사용해서 모듈을 지연로딩 하려면 `loadChildren: () => import('...').then(m => m.ModuleName)`와 같은 문법을 사용해야 `ngc`가 해당 모듈을 제대로 로드할 수 있습니다.
이 때 사용할 수 있는 문법에 대해서는 [이 문서](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113)를 참고하세요.
문법이 한정되어 있어서 개발자에게는 제약인 것처럼 느낄 수 있지만, 이 방식은 `NgFactories`를 사용하지 않기 때문에 Ivy를 도입하는 측면에서는 더 유리합니다.

</div>


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

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input-deprecated"></code-example>

<!--
Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:
-->
이 방법보다는 두 데코레이터를 따로 나눠서 다음과 같이 구현하는 것이 좋습니다:

<code-example path="deprecation-guide/src/app/app.component.ts" language="typescript" region="template-with-input"></code-example>

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

<code-example path="deprecation-guide/src/app/app.component.1.html" region="two-way-template-deprecated"></code-example>

<!--
However, in practice, Angular ignores two-way bindings to template variables. Starting in version 8, attempting to write to template variables is deprecated. In a future version, we will throw to indicate that the write is not supported.
-->
하지만 Angular는 템플릿 변수가 양방향 바인딩으로 연결되되더라도 템플릿 변수에 값을 할당하는 로직은 처리하지 않습니다.
그리고 이제 Angular 8 버전부터는 템플릿 변수에 값을 할당하는 로직 자체를 작성할 수 없습니다.
이 코드는 다음과 같이 작성되어야 하며, 이 코드를 그대로 남겨둔다면 이후 버전에서는 에러가 발생할 수도 있습니다.

<code-example path="deprecation-guide/src/app/app.component.html" region="valid-template-bind"></code-example>


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
{@a entrycomponents-and-analyze_for_entry_components-no-longer-required}
<!--
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required
-->
### `entryComponents`, `ANALYZE_FOR_ENTRY_COMPONENTS`는 더이상 사용하지 않습니다.

<!--
Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically.
With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations.
The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.

**NOTE**: You may still need to keep these if building a library that will be consumed by a View Engine application.
-->
이전까지는 `NgModule`을 정의할 때 `entryComponents` 배열을 지정해야 컴파일러가 컴포넌트를 동적으로 생성하고 주입할 수 있었습니다.
Ivy 엔진을 사용하면서 부터는 더이상 이런 코드가 필요하지 않습니다.
기존에 있던 `entryComponents` 배열은 제거하면 되고, `ANALYZE_FOR_ENTRY_COMPONENTS` 의존성 주입 토큰도 같은 이유로 사용하지 않습니다.

**참고**: View Engine용 애플리케이션에 사용되는 애플리케이션을 만든다면 계속 사용해야 합니다.


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

<!--
**After**:
-->
**수정 후**

<code-example path="deprecation-guide/src/app/app.module.ts" language="typescript" region="ModuleWithProvidersGeneric"></code-example>

<!--
### Internet Explorer 11

Angular support for Microsoft's Internet Explorer 11 (IE11) is deprecated and will be removed in Angular v13.
Ending IE11 support allows Angular to take advantage of web platform APIs present only in evergreen browsers, resulting in better APIs for developers and more capabilities for application users.
An additional motivation behind this removal is the drop in global usage of IE11 to just ~1% (as of March 2021).
For full rationale and discussion behind this deprecation, see [RFC: Internet Explorer 11 support deprecation and removal](https://github.com/angular/angular/issues/41840).

**Note**: IE11 will be supported in Angular v12 LTS releases through November 2022.
-->

{@a input-setter-coercion}
<!--
### Input setter coercion
-->
### 입력값 세터 강제

<!--
Since the `strictTemplates` flag has been introduced in Angular the compiler has been able to type-check input bindings to the declared input type of the corresponding directive.
When a getter/setter pair is being used for the input it may be desirable to let the setter accept a broader set of types than what is returned by the getter, for example when the setter first converts the input value.
However, until TypeScript 4.3 a getter/setter pair was required to have identical types so this pattern could not be accurately declared.

To mitigate this limitation, it was made possible to declare [input setter coercion fields](guide/template-typecheck#input-setter-coercion) in directives that are used when type-checking input bindings.
However, since [TypeScript 4.3](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties) the limitation has been removed; setters can now accept a wider type than what is returned by the getter.
This means that input coercion fields are no longer needed, as their effects can be achieved by widening the type of the setter.

For example, the following directive:
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

<!--
can be refactored as follows:
-->
이렇게 수정하면 됩니다:

<code-example path="deprecation-guide/src/app/submit-button/submit-button.component.ts" language="typescript" region="submitButton"></code-example>

{@a full-template-type-check}
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
    ...
    "strictTemplates": true,
    "strictInputTypes": false,
    "strictNullInputTypes": false,
    "strictAttributeTypes": false,
    "strictOutputEventTypes": false,
    "strictDomEventTypes": false,
    "strictDomLocalRefTypes": false,
    "strictSafeNavigationTypes": false,
    "strictContextGenerics": false,
    ...
  }
}

</code-example>

{@a jit-api-changes}

## JIT API changes due to ViewEngine deprecation

In ViewEngine, [JIT compilation](https://angular.io/guide/glossary#jit) required special providers (like `Compiler`, `CompilerFactory`, etc) to be injected in the app and corresponding methods to be invoked. With Ivy, JIT compilation takes place implicitly if the Component, NgModule, etc have not already been [AOT compiled](https://angular.io/guide/glossary#aot). Those special providers were made available in Ivy for backwards-compatibility with ViewEngine to make the transition to Ivy smoother. Since ViewEngine is deprecated and will soon be removed, those symbols are now deprecated as well.

Important note: this deprecation doesn't affect JIT mode in Ivy (JIT remains available with Ivy, however we are exploring a possibility of deprecating it in the future. See [RFC: Exploration of use-cases for Angular JIT compilation mode](https://github.com/angular/angular/issues/43133)).


{@a deprecated-cli-flags}
<!--
## Deprecated CLI APIs and Options
-->
## Angular CLI 지원 중단 API, 옵션

<!--
This section contains a complete list all of the currently deprecated CLI flags.
-->
이 섹션은 Angular CLI에서 지원이 중단된 기능을 설명합니다.


### @angular/cli

<!--
| API/Option        | May be removed in | Notes                                     |
| ----------------- | ----------------- | ----------------------------------------- |
| `--prod`          | <!-v12-> v14    | Use `--configuration production` instead. |
| `ng update --all` | <!-v11-> v14    | No longer has an effect.                  |
-->
| API/옵션 | 지원 중단 | 참고 |
| ----------------- | ----------------- | ----------------------------------------- |
| `--prod`          | <!--v12--> v14    | `--configuration production`를 사용하세요. |
| `ng update --all` | <!--v11--> v14    | 더이상 동작하지 않습니다. |

### @angular-devkit/build-angular

<!--
| API/Option                 | May be removed in | Notes                                                                                                                                                          |
| -------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deployUrl`                | <!-v13-> v15    | Use `baseHref` option, `APP_BASE_HREF` DI token or a combination of both instead. For more information, see [the deploy url](guide/deployment#the-deploy-url). |
| `showCircularDependencies` | <!-v12-> v14    | The recommended method to detect circular dependencies in project code is to use either a lint rule or other external tooling.                                 |
| Protractor builder         | <!-v12-> v14    | Deprecate as part of the Protractor deprecation.                                                                                                               |
-->
| API/옵션                 | 지원 중단 | 참고 |
| -------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deployUrl`                | <!--v13--> v15    | `baseHref` 옵션이나 `APP_BASE_HREF` DI 토큰을 사용하는 것을 권장합니다. 자세한 내용은 [배포 URL](guide/deployment#the-deploy-url) 문서를 참고하세요. |
| `showCircularDependencies` | <!--v12--> v14    | 순환참조는 Lint 규칙이나 다른 툴로 검출하는 것을 권장합니다. |
| Protractor 빌더         | <!--v12--> v14    | Protractor가 지원 중단되면서 함께 지원이 중단되었습니다. |

### @angular-devkit/build-optimizer

<!--
The entire NPM package is deprecated. It has always been experimental (never hit `1.0.0`) and has
been an internal package for the Angular CLI. All the relevant functionality has been moved to
`@angular-devkit/build-angular`.
-->
NPM 패키지 자체가 지원이 중단되었습니다.
이 패키지는 Angular CLI 내부 사용을 위해 실험적으로 만들어진 패키지였으며 버전이 `1.0.0`이 된 적도 없습니다.
필요한 기능은 모두 `@angular-devkit/build-angular`로 이동했습니다.

{@a removed}
<!--
## Removed APIs
-->
## 지원이 중단된 API

<!--
The following APIs have been removed starting with version 11.0.0\*:

| Package           | API                   | Replacement                                                                | Notes |
| ----------------- | --------------------- | -------------------------------------------------------------------------- | ----- |
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) |       |

\* To see APIs removed in version 10, check out this guide on the [version 10 docs site](https://v10.angular.io/guide/deprecations#removed).
-->
아래 API들은 Angular 11.0.0 버전부터 지원이 중단됩니다:

| 패키지 | API | 대체 방법 | 참고 |
| ----------------- | --------------------- | -------------------------------------------------------------------------- | ----- |
| `@angular/router` | `preserveQueryParams` | [`queryParamsHandling`](api/router/UrlCreationOptions#queryParamsHandling) |       |

\*Angular 10 버전에 제거된 API를 확인하려면 [Angular 10 문서](https://v10.angular.io/guide/deprecations#removed)를 참고하세요.

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

<!--
### `loadChildren` string syntax in `@angular/router`
-->
### `@angular/router`에서 문자열로 `loadChildren`을 지정하는 방식

<!--
It is no longer possible to use the `loadChildren` string syntax to configure lazy routes.
The string syntax has been replaced with dynamic import statements.
The `DeprecatedLoadChildren` type was removed from `@angular/router`.
Find more information about the replacement in the [`LoadChildrenCallback` documentation](api/router/LoadChildrenCallback).

The supporting classes `NgModuleFactoryLoader`, `SystemJsNgModuleLoader` and `SystemJsNgModuleLoaderConfig` classes were removed from `@angular/core`, as well as `SpyNgModuleFactoryLoader` from `@angular/router`.
-->
이제는 `loadChildren` 으로 지연로딩을 구현할 때 문자열 방식을 사용할 수 없고, `import`를 사용해서 동적으로 구성해야 합니다.
이와 함께 `DeprecatedLoadChildren` 타입도 `@angular/router` 패키지에서 제거되었습니다.
자세한 내용은 [`LoadChildrenCallback` 문서](api/router/LoadChildrenCallback)를 참고하세요.


### `WrappedValue`

<!--
The purpose of `WrappedValue` was to allow the same object instance to be treated as different for the purposes of change detection.
It was commonly used with the `async` pipe in the case where the `Observable` produces the same instance of the value.

Given that this use case is relatively rare and special handling impacted application performance, the `WrappedValue` API has been removed in Angular 13.

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

<!-- links -->

[AioGuideI18nCommonMergeDefineLocalesInTheBuildConfiguration]: guide/i18n-common-merge#define-locales-in-the-build-configuration "Define locales in the build configuration - Common Internationalization task #6: Merge translations into the application | Angular"

<!-- end links -->

@reviewed 2021-09-15
