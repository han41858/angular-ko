<!--
# Update Angular
-->
# Angular 버전 업데이트하기

<!--
This guide contains information to update to Angular version 14.
-->
이 문서는 Angular 버전을 14로 업데이트하는 방법을 다룹니다.

<!--
## Update Angular CLI applications
-->
## Angular CLI 애플리케이션 업데이트하기

<!--
For step-by-step instructions on how to update to the latest Angular release and leverage the Angular automated migration tools, use the interactive update guide at [update.angular.io](https://update.angular.io).
-->
최신 Angular 버전에서 지원하는 자동화된 마이그레이션 툴 사용 방법을 단계별로 확인하려면 [update.angular.io](https://update.angular.io) 가이드를 확인하세요.


<!--
## Changes and deprecations in version 14
-->
## 14 버전에서 변경된 점, 지원이 중단된 기능

<!--
<div class="alert is-helpful">

For information about the deprecation and removal practices of Angular, see [Angular Release Practices](guide/releases#deprecation-practices).

</div>

*   **Strictly Typed Reactive Forms**

    The Reactive Forms types `AbstractControl`, `FormControl`, `FormGroup`, and `FormArray` now support a generic parameter which allows for strict typing of the controls. An automatic migration will convert existing usages of these types to special `Untyped` aliases which preserve the existing behavior.

    The `initialValueIsDefault` option for `FormControl` construction has been deprecated in favor of the `nonNullable` option (which has identical behavior). This renaming aligns the `FormControl` constructor with other strictly typed APIs related to nullability.

*   **`ComponentFactory` and `NgModuleFactory` cleanup**

    Many APIs which use either `ComponentFactory` or `NgModuleFactory` have been deprecated and replaced with new APIs that use component or NgModule classes directly.
-->
<div class="alert is-helpful">

지원이 중단되는 기능에 대해 자세하게 알아보려면 [Angular 릴리즈 정책](guide/releases#deprecation-practices) 문서를 참고하세요.

</div>

*   **반응형 폼의 데이터 타입 강화**

    반응형 폼 타입 `AbstractControl`, `FormControl`, `FormGroup`, `FormArray`는 이제 제네릭 인자를 받아서 폼 컨트롤에 사용할 데이터 타입을 명확하게 지정할 수 있습니다. 자동으로 마이그레이션하고 나면 기존 로직의 동작을 보장하기 위해 `Untyped`라는 접두사가 붙은 폼 컨트롤로 대체됩니다.

    `FormControl`을 생성할 때 사용하던 `initialValueIsDefault` 옵션은 `nonNullable` 옵션으로 대체되었지만, 동작은 동일합니다. 이 변경사항은 `FormControl` 인스턴스를 생성할 때부터 명확하게 `null` 값을 처리하는 방식을 지정하기 위해 도입되었습니다.

*   **`ComponentFactory`, `NgModuleFactory` 지원 중단**

    `ComponentFactory`나 `NgModuleFactory`는 사용이 중단되었고, 컴포넌트나 NgModule 클래스를 직접 사용하는 방식으로 변경되었습니다.


<!--
### Breaking changes in Angular version 14
-->
### Angular 14 버전에서 크게 변경된 점

<!--
<a id="breaking-changes"></a>

| | Details |
|:--- |:--- |
| [**PR&nbsp;#45729**](https://github.com/angular/angular/pull/45729) | `initialNavigation: 'enabled'` was deprecated in v11 and is replaced by `initialNavigation: 'enabledBlocking'.`. |
| [**PR&nbsp;#42803**](https://github.com/angular/angular/pull/42803) | Forms `email` input coercion: forms `email` input value will be considered as true if it is defined with any value rather than false and 'false'. |
| [**PR&nbsp;#33729**](https://github.com/angular/angular/pull/33729) | Objects with a length key set to zero will no longer validate as empty. This is technically a breaking change, since objects with a key `length` and value `0` will no longer validate as empty. This is a very minor change, and any reliance on this behavior is probably a bug anyway. |
| [**PR&nbsp;#44921**](https://github.com/angular/angular/pull/44921) | Do not run change detection when loading Hammer. This change may cause unit tests that are implicitly asserting on the specific number or the ordering of change detections to fail. |
| [**PR&nbsp;#23020**](https://github.com/angular/angular/pull/23020) | Parameter types of `TransferState` usage have increased type safety, and this may reveal existing problematic calls. |
| [**PR&nbsp;#43863**](https://github.com/angular/angular/pull/43863) | The type of `Navigation#initialUrl` has been narrowed to `UrlTree` from `string|UrlTree`, to reflect reality. |
| [**PR&nbsp;#45114**](https://github.com/angular/angular/pull/45114) | The `AnimationDriver.getParentElement` method has become required, so any implementors of this interface are now required to provide an implementation for this method. |
| [**PR&nbsp;#45176**](https://github.com/angular/angular/pull/45176) | The type of `Route.pathMatch` is now more strict. Places that use `pathMatch` will likely need to be updated to have an explicit `Route`/`Routes` type so that TypeScript does not infer the type as `string`. |
| [**PR&nbsp;#44573**](https://github.com/angular/angular/pull/44573) | The router now takes only the first emitted value by the resolvers and then proceeds with navigation. This is now consistent with `Observables` returned by other guards: only the first value is used.|
| [**PR&nbsp;#45394**](https://github.com/angular/angular/pull/45394) | TypeScript versions older than `4.6.0` are no longer supported. |
| [**PR&nbsp;#45210**](https://github.com/angular/angular/pull/45210) | `HttpClient` will throw an error when headers are set on a JSONP request. |
| [**PR&nbsp;#43834**](https://github.com/angular/angular/pull/43834) | Reactive form types such as `FormControl` and `FormGroup` now have generic type parameters and infer stricter types. A migration will convert existing usages to new `Untyped`-prefixed aliases which preserve the existing behavior. |
| [**PR&nbsp;#45487**](https://github.com/angular/angular/pull/45487) | The deprecated `aotSummaries` field in the `TestBed` configuration has been removed. |
| [**PR&nbsp;#45648**](https://github.com/angular/angular/pull/45648) | A new required class member `LocationStrategy#getState` has been added, that any implementers of this interface will need to provide. |
| [**PR&nbsp;#45735**](https://github.com/angular/angular/pull/45735) | When a guard returns a `UrlTree`, the router would previously schedule the redirect navigation within a `setTimeout`. This timeout is now removed, which can result in test failures due to incorrectly written tests. |
-->
<a id="breaking-changes"></a>

|                                                                     | 설명                                                                                                                                          |
|:--------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| [**PR&nbsp;#45729**](https://github.com/angular/angular/pull/45729) | `initialNavigation: 'enabled'`는 11 버전부터 지원이 중단되었고 이제는 `initialNavigation: 'enabledBlocking'.`를 사용합니다.                                       |
| [**PR&nbsp;#42803**](https://github.com/angular/angular/pull/42803) | 폼 `email` 입력값 교차 검증: 폼 `email` 입력값은 false나 `false`가 아닌 이상 참으로 간주합니다.                                                                        |
| [**PR&nbsp;#33729**](https://github.com/angular/angular/pull/33729) | 객체의 `length` 키 값을 `0`으로 지정한 객체는 더이상 비어있는 것으로 간주하지 않습니다. 기술적으로는 큰 변경사항으로 보이지만, 이런 로직을 활용하는 것은 정상적인 로직이 아니기 때문에 큰 문제가 아닙니다.                   |
| [**PR&nbsp;#44921**](https://github.com/angular/angular/pull/44921) | Hammer를 로딩할 때 변화 감지를 실행하지 마세요. 이 변경사항으로 유닛 테스트 중 일부가 실패할 수 있습니다.                                                                            |
| [**PR&nbsp;#23020**](https://github.com/angular/angular/pull/23020) | `TransferState` 인자 타입의 안정성이 향상되었습니다. 기존 동작이 제대로 동작하지 않을 수 있습니다.                                                                             |
| [**PR&nbsp;#43863**](https://github.com/angular/angular/pull/43863) | `Navigation#initialUrl` 타입이 `string`에서 `UrlTree`로 변경되었습니다. 실제로도 `UrlTree`를 많이 사용합니다.                                                        |
| [**PR&nbsp;#45114**](https://github.com/angular/angular/pull/45114) | `AnimationDriver` 인터페이스를 상속하는 클래스는 이제 `AnimationDriver.getParentElement` 메서드를 필수로 구현해야 합니다.                                                 |
| [**PR&nbsp;#45176**](https://github.com/angular/angular/pull/45176) | `Route.pathMatch`의 타입이 좀 더 엄격해졌습니다. `pathMath`를 사용하는 코드는 이제 `string` 대신 `Route`나 `Routes` 타입을 명확하게 지정해야 합니다.                                |
| [**PR&nbsp;#44573**](https://github.com/angular/angular/pull/44573) | 라우터는 이제 리졸버가 첫번째로 보내는 값만으로 네비게이션 동작을 진행합니다. 다른 가드가 `Observable`를 활용하는 것과 같은 방식입니다.                                                          |
| [**PR&nbsp;#45394**](https://github.com/angular/angular/pull/45394) | TypeScript 4.6.0 이전 버전은 이제 지원하지 않습니다.                                                                                                       |
| [**PR&nbsp;#45210**](https://github.com/angular/angular/pull/45210) | `HttpClient` JSONP 요청에 헤더를 지정하면 에러가 발생합니다.                                                                                                  |
| [**PR&nbsp;#43834**](https://github.com/angular/angular/pull/43834) | `FormControl`, `FormGroup`과 같은 반응형 폼 컨트롤에 제네릭이 추가되면서 더 엄격한 타입을 유추합니다. 자동으로 마이그레이션하고 나면 기존 로직의 동작을 보장하기 위해 `Untyped`라는 접두사가 붙은 폼 컨트롤로 대체됩니다. |
| [**PR&nbsp;#45487**](https://github.com/angular/angular/pull/45487) | `TestBed` 환경설정 중 `aotSummaries` 필드의 지원이 중단되었고, 완전히 제거되었습니다.                                                                                 |
| [**PR&nbsp;#45648**](https://github.com/angular/angular/pull/45648) | `LocationStrategy` 클래스에 `getState` 필수 멤버가 추가되었습니다. 이 클래스를 상속받는 클래스에서도 이 필드를 지정해야 합니다.                                                       |
| [**PR&nbsp;#45735**](https://github.com/angular/angular/pull/45735) | 이전에는 가드가 `UrlTree`를 반환하면 라우터가 `setTimeout`을 사용해서 리다이렉트했습니다. 이제는 타이머가 제거되었기 때문에 일부 테스트 로직이 실패할 수 있습니다.                                       |



<!--
### New deprecations
-->
### 지원이 중단된 기능

<!--
<a id="deprecations"></a>

| Removed | Replacement | Details |
| :--- | :--- |:--- |
| [`FormControlOptions#initialValueIsDefault`](api/forms/FormControlOptions#initialValueIsDefault) | [`FormControlOptions#nonNullable`](api/forms/FormControlOptions#nonNullable) | The `initialValueIsDefault` option for `FormControl` construction has been deprecated in favor of the `nonNullable` option (which has identical behavior). This renaming aligns the `FormControl` constructor with other strictly typed APIs related to nullability. |
| `ErrorEvent`s passed to [`TestRequest#error`](api/common/http/testing/TestRequest#error] | `ProgressEvent` | Http requests never emit an `ErrorEvent`. Use a `ProgressEvent` instead. |
| [`getModuleFactory`](api/core/getModuleFactory) | `getNgModuleById` | `NgModuleFactory` itself is deprecated. |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories) | n/a | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. |
| [`Compiler`](api/core/Compiler) | n/a | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. |
| [`CompilerFactory`](api/core/CompilerFactory) | n/a | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. |
| [`NgModuleFactory`](api/core/NgModuleFactory) | n/a | This class was mostly used as a part of ViewEngine-based JIT API and is no longer needed in Ivy JIT mode. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. Angular provides APIs that accept NgModule classes directly (such as [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule) and [`createNgModuleRef`](api/core/createNgModuleRef)), consider switching to those APIs instead of using factory-based ones. |
| [`ComponentFactory`](api/core/ComponentFactory) | n/a | Angular no longer requires `ComponentFactory`s. Other APIs allow Component classes to be used directly. |
| [`ComponentFactoryResolver`](api/core/ComponentFactoryResolver) | n/a | Angular no longer requires `ComponentFactory`s. Other APIs allow Component classes to be used directly. |
| `useJit` and `missingTranslation` in [`CompilerOptions`](api/core/CompilerOptions) | n/a | Ivy JIT mode does not support these options. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. |
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory) | n/a | Ivy JIT mode doesn't require accessing this symbol. See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for additional context. |
| [`RESOURCE_CACHE_PROVIDER`](api/platform-browser-dynamic/RESOURCE_CACHE_PROVIDER) | n/a | This was previously necessary in some cases to test AOT-compiled components with View Engine, but is no longer since Ivy. |
| `relativeLinkResolution` in the Router [`ExtraOptions`](api/router/ExtraOptions) | Switch to the default of `'corrected'` link resolution | This option was introduced to fix a bug with link resolution in a backwards compatible way. Existing apps which still depend on the buggy legacy behavior should switch to the new corrected behavior and stop passing this flag. |
| `resolver` argument in [`RouterOutletContract.activateWith`](api/router/RouterOutletContract#activateWith) | n/a | `ComponentFactory` and `ComponentFactoryResolver` afre deprecated, and passing an argument for a resolver to retrieve a `ComponentFactory` is no longer required. |
| [`OutletContext#resolver](api/router/OutletContext#resolver) | n/a | `ComponentFactory` and `ComponentFactoryResolver` are deprecated, and using a resolver to retrieve a `ComponentFactory` is no longer required. |
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated) | Return value of [`SwUpdate#activateUpdate`](api/service-worker/SwUpdate#activateUpdate) | The `activated` property is deprecated. Existing usages can migrate to [`SwUpdate#activateUpdate`](api/service-worker/SwUpdate#activateUpdate). |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available) | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates) | The behavior of [`SwUpdate#available`](api/service-worker/SwUpdate#available) can be achieved by filtering for the [`VersionReadyEvent`](api/service-worker/VersionReadyEvent) from [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)
-->
<a id="deprecations"></a>

| 제거                                                                                                 | 대체방식                                                                                 | 설명                                                                                                                                                                                                                                                                                                                                |
|:---------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`FormControlOptions#initialValueIsDefault`](api/forms/FormControlOptions#initialValueIsDefault)   | [`FormControlOptions#nonNullable`](api/forms/FormControlOptions#nonNullable)         | `FormControl`을 생성할 때 사용하던 `initialValueIsDefault` 옵션은 `nonNullable` 옵션으로 대체되었지만, 동작은 동일합니다. 이 변경사항은 `FormControl` 인스턴스를 생성할 때부터 명확하게 `null` 값을 처리하는 방식을 지정하기 위해 도입되었습니다.                                                                                                                                                          |
| [`TestRequest#error`](api/common/http/testing/TestRequest#error)에 전달하는 `ErrorEvent`                | `ProgressEvent`                                                                      | Http 요청은 이제 `ErrorEvent`를 생성하지 않습니다. `ProgressEvent`를 활용하세요.                                                                                                                                                                                                                                                                      |
| [`getModuleFactory`](api/core/getModuleFactory)                                                    | `getNgModuleById`                                                                    | `NgModuleFactory`는 지원이 중단되었습니다.                                                                                                                                                                                                                                                                                                   |
| [`ModuleWithComponentFactories`](api/core/ModuleWithComponentFactories)                            | -                                                                                    | Ivy JIT 모드는 이 심볼을 활용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요.                                                                                                                                                                                                                      |
| [`Compiler`](api/core/Compiler)                                                                    | -                                                                                    | Ivy JIT 모드는 이 심볼을 활용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요.                                                                                                                                                                                                                      |
| [`CompilerFactory`](api/core/CompilerFactory)                                                      | -                                                                                    | Ivy JIT 모드는 이 심볼을 활용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요.                                                                                                                                                                                                                      |
| [`NgModuleFactory`](api/core/NgModuleFactory)                                                      | -                                                                                    | 이 클래스는 ViewEngine 기반의 JIT API로 많이 사용되었으며, Ivy JIT 모드에서는 더이상 사용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요. 이제는 팩토리 기반 대신 [`PlatformRef.bootstrapModule`](api/core/PlatformRef#bootstrapModule), [`createNgModuleRef`](api/core/createNgModuleRef)처럼 NgModule 클래스를 직접 활용하는 API를 제공합니다. |
| [`ComponentFactory`](api/core/ComponentFactory)                                                    | -                                                                                    | Angular는 더이상 `ComponentFactory`를 활용하지 않습니다. 컴포넌트 클래스가 제공하는 API를 직접 활용하세요.                                                                                                                                                                                                                                                         |
| [`ComponentFactoryResolver`](api/core/ComponentFactoryResolver)                                    | -                                                                                    | Angular는 더이상 `ComponentFactory`를 활용하지 않습니다. 컴포넌트 클래스가 제공하는 API를 직접 활용하세요.                                                                                                                                                                                                                                                         |
| [`CompilerOptions`](api/core/CompilerOptions) 항목 중 `useJit`, `missingTranslation`                  | -                                                                                    | Ivy JIT 모드는 이 심볼을 활용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요.                                                                                                                                                                                                                      |
| [`JitCompilerFactory`](api/platform-browser-dynamic/JitCompilerFactory)                            | -                                                                                    | Ivy JIT 모드는 이 심볼을 활용하지 않습니다. 자세한 내용은 [지원이 중단되면서 변경되는 JIT API](guide/deprecations#jit-api-changes) 문서를 참고하세요.                                                                                                                                                                                                                      |
| [`RESOURCE_CACHE_PROVIDER`](api/platform-browser-dynamic/RESOURCE_CACHE_PROVIDER)                  | -                                                                                    | 이전에는 ViewEngine으로 AOT 컴파일 구성요소를 테스트할 때 사용했지만, Ivy가 도입된 이후에는 사용하지 않습니다.                                                                                                                                                                                                                                                            |
| 라우터 [`ExtraOptions`](api/router/ExtraOptions)에 사용하는 `relativeLinkResolution`                       | `'corrected'`를 기본으로 사용하세요.                                                           | 이 옵션은 하위 호환성을 유지하기 위해 도입되었습니다. 이제는 기존 방식을 버리고 새로운 로직을 작성하는 것이 좋으며, 따라서 이 플래그도 더이상 사용하지 않습니다.                                                                                                                                                                                                                                      |
| [`RouterOutletContract.activateWith`](api/router/RouterOutletContract#activateWith)의 `resolver` 인자 | -                                                                                    | `ComponentFactory`, `ComponentFactoryResolver`는 사용이 중단되었고, `ComponentFactory`에 리족버 인자를 전달하는 방식도 더이상 필요 없습니다.                                                                                                                                                                                                                      |
| [`OutletContext#resolver](api/router/OutletContext#resolver)                                       | -                                                                                    | `ComponentFactory`, `ComponentFactoryResolver`는 사용이 중단되었고, `ComponentFactory`에 리족버 인자를 전달하는 방식도 더이상 필요 없습니다.                                                                                                                                                                                                                      |
| [`SwUpdate#activated`](api/service-worker/SwUpdate#activated)                                      | [`SwUpdate#activateUpdate`](api/service-worker/SwUpdate#activateUpdate)의 반환값을 활용하세요. | `activated` 프로퍼티는 지원이 중단되었습니다. [`SwUpdate#activateUpdate`](api/service-worker/SwUpdate#activateUpdate)를 활용하는 방식으로 마이그레이션 하세요.                                                                                                                                                                                                     |
| [`SwUpdate#available`](api/service-worker/SwUpdate#available)                                      | [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)              | [`SwUpdate#available`](api/service-worker/SwUpdate#available) 여부는 [`SwUpdate#versionUpdates`](api/service-worker/SwUpdate#versionUpdates)로 전달되는 [`VersionReadyEvent`](api/service-worker/VersionReadyEvent)로 확인할 수 있습니다.                                                                                                          |


@reviewed 2022-05-31
