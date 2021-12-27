<!--
# Update Angular
-->
# Angular 버전 업데이트하기

<!--
This guide contains information to update to Angular version 13.
-->
이 문서는 Angular 버전을 13으로 업데이트하는 방법을 다룹니다.


<!--
## Update Angular CLI applications
-->
## Angular CLI 애플리케이션 업데이트하기

<!--
For step-by-step instructions on how to update to the latest Angular release and leverage the Angular automated migration tools, use the interactive update guide at [update.angular.io][AngularUpdateMain].
-->
최신 Angular 버전에서 지원하는 자동화된 마이그레이션 툴 사용 방법을 단계별로 확인하려면 [update.angular.io][AngularUpdateMain] 가이드를 확인하세요.


<!--
## Changes and deprecations in version 13
-->
## 13 버전에서 변경된 점, 새롭게 지원이 중단된 기능

<div class="alert is-helpful">

<!--
For information about the deprecation and removal practices of Angular, see [Angular Release Practices][AioGuideReleasesDeprecationPractices].
-->
지원이 중단되는 기능에 대해 자세하게 알아보려면 [Angular 릴리즈 정책][AioGuideReleasesDeprecationPractices] 문서를 참고하세요.

</div>

<!--
*   **Removal of View Engine**

    Requires all applications and libraries to build using Ivy.
    See the [Upcoming improvements to Angular library distribution][AngularBlog76c02f782aa4] blog.
-->
*   **View Engine 제거**

    이제 모든 애플리케이션과 라이브러리는 Ivy로 빌드합니다.
    자세한 내용은 [Upcoming improvements to Angular library distribution][AngularBlog76c02f782aa4] 블로그 글을 참고하세요.

<!--
*   **Modernization of the Angular Package Format \(APF\)**

    Removed older output formats, including View Engine specific metadata.
-->
*   **Angular 패키지 형식\(Angular Package Format, APF\) 최신화**

    View Engine용 메타데이터를 제거하며 오래된 패키지 형식을 개선했습니다.

<!--
*   **Removal of IE11 Support**

    Removes all support for Microsoft Internet Explorer 11 \(IE11\).
    See [Issue&nbsp;#41840][GithubAngularAngularIssues41840].
-->
*   **IE11 지원 중단**

    Microsoft Internet Explorer 11 \(IE11\) 지원이 중단되었습니다.
    자세한 내용은 [이 이슈][GithubAngularAngularIssues41840]를 참고하세요.

<!--
*   **Testbed module teardown**

    Adds the option in `initTestEnvironment` to completely remove test environments from an application.
    See the [Improving Angular tests by enabling Angular testing module teardown][DevThisIsAngularImprovingAngularTestsByEnablingAngularTestingModuleTeardown38kh] article.
-->
*   **테스트베드 모듈 초기화**

    애플리케이션 테스트 환경에서 `initTestEnvironment` 옵션을 지정하면 테스트 환경을 완전히 초기화할 수 있습니다.
    자세한 내용은 [Improving Angular tests by enabling Angular testing module teardown][DevThisIsAngularImprovingAngularTestsByEnablingAngularTestingModuleTeardown38kh] 문서를 참고하세요.

<!--
*   **`$localize` tagged message strings**

    Adds documentation for the Angular `$localize` API and tagged message strings.
-->
*   **`$localize` 태그 메시지 문자열**

    `$localize` API와 태그 메시지 문자열 문서가 추가되었습니다.

<!--
*   **Disk Cache**

    Enables the persistent build cache by default for all applications.
    See [Issue&nbsp;#21545][GithubAngularAngularCliIssues21545].
-->
*   **디스크 캐시**

    모든 애플리케이션을 대상으로 항상 유지되는 빌드 캐시를 활용합니다.
    자세한 내용은 [이 이슈][GithubAngularAngularCliIssues21545]를 참고하세요.


<!--
### Breaking changes in Angular version 13
-->
### Angular 13 버전에서 변경된 점

{@a breaking-changes}

<!--
|                                                     | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|:---                                                 |:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [**PR&nbsp;#43642**][GithubAngularAngularPull43642] | TypeScript versions older than `4.4.2` are no longer supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [**PR&nbsp;#43740**][GithubAngularAngularPull43740] | NodeJS versions older than `v12.20.0` are no longer supported. The Angular packages now use the NodeJS package exports feature with subpath patterns and requires a NodeJS version above `14.15.0` or `16.10.0`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [PR&nbsp;#31187][GithubAngularAngularPull31187]     | Previously, the default url serializer dropped everything after and including a question mark in query parameters. That is, for a navigation to `/path?q=hello?&other=123`, the query parameters parsed to just `{q: 'hello'}`. This is incorrect, because the URI spec allows for question mark characers in query data. This change now correctly parses the query parameters for `/path?q=hello?&other=123` as `{v: 'hello?', other: '123'}`.                                                                                                                                                                                                                                         |
| [PR&nbsp;#41730][GithubAngularAngularPull41730]     | The behavior of the `SpyLocation` used by the `RouterTestingModule` has changed to match the behavior of browsers. It no longer emits a `popstate` event when `Location.go` is called. In addition, `simulateHashChange` now triggers *both* a `hashchange` event and a `popstate` event. Tests that use `location.go` and expect the changes to be picked up by the `Router` should migrate to `simulateHashChange`. Each test is different in what it attempts to assert, so there is no single change that works for all tests. Each test that uses the `SpyLocation` to simulate changes in the browser URL should be evaluated on a case-by-case basis.                             |
| [PR&nbsp;#42952][GithubAngularAngularPull42952]     | A new type called `FormControlStatus` has been introduced, which is a union of all possible status strings for form controls. `AbstractControl.status` has been narrowed from `string` to `FormControlStatus`, and `statusChanges` has been narrowed from `Observable<any>` to `Observable<FormControlStatus>`. Most applications should consume the new types seamlessly. Any breakage caused by this change is likely due to one of the following two problems: <ol><li>The app is comparing <code>AbstractControl.status</code> against a string which is not a valid status.</li><li>The app is using `statusChanges` events as if they were something other than strings.</li></ol> |
| [PR&nbsp;#43087][GithubAngularAngularPull43087]     | Previously ,`null` and `undefined` inputs for `routerLink` were equivalent to empty string and there was no way to disable the navigation of the link. In addition, the `href` is changed from a property `HostBinding()` to an attribute binding \(`HostBinding('attr.href')`\). The effect of this change is that `DebugElement.properties['href']` now returns the `href` value returned by the native element which is the full URL rather than the internal value of the `RouterLink` `href` property.                                                                                                                                                                              |
| [PR&nbsp;#43496][GithubAngularAngularPull43496]     | The router no longer replaces the browser URL when a new navigation cancels an ongoing navigation. The replacement of the browser URL often caused URL flicker and was only in place to support some AngularJS hybrid applications. Hybrid applications which rely on the presence of `navigationId` on each initial navigation handled by the Angular router should instead subscribe to `NavigationCancel` events and manually perform the `location.replaceState` to add `navigationId` to the Router state.<br />In addition, tests that assert `urlChanges` on the `SpyLocation` should be adjusted to account for the lack of the `replaceState` trigger.                          |
| [PR&nbsp;#43507][GithubAngularAngularPull43507]     | The `WrappedValue` class is no longer imported from `@angular/core`. This change may result in compile errors or failures at runtime, if outdated libraries are used that rely on `WrappedValue`. Dependancy on `WrappedValue` should be removed since no replacement is available.                                                                                                                                                                                                                                                                                                                                                                                                      |
| [PR&nbsp;#43591][GithubAngularAngularPull43591]     | It is no longer possible to use `Route.loadChildren` with a string value. The following supporting classes were removed from `@angular/core`: <ul><li><code>NgModuleFactoryLoader</code></li><li><code>SystemJsNgModuleFactoryLoader</code></li></ul> The `@angular/router` package no longer exports the following symbols: <ul><li><code>SpyNgModuleFactoryLoader</code></li><li><code>DeprecatedLoadChildren</code></li></ul> The signature of the `setupTestingRouter` function from `@angular/core/testing` was changed to drop the `NgModuleFactoryLoader` parameter, since an value for that parameter can not be created.                                                        |
| [PR&nbsp;#43668][GithubAngularAngularPull43668]     | The return type of `SwUpdate#activateUpdate` and `SwUpdate#checkForUpdate` changed to `Promise<boolean>`.<br />Although unlikely, this change may cause TypeScript type-checking to fail in some cases. If necessary, update your types to account for the new return type.                                                                                                                                                                                                                                                                                                                                                                                                              |
-->
|                                                     | 설명 |
|:---                                                 |:---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [**PR&nbsp;#43642**][GithubAngularAngularPull43642] | TypeScript `4.4.2` 이전 버전은 더이상 지원하지 않습니다. |
| [**PR&nbsp;#43740**][GithubAngularAngularPull43740] | NodeJS `v12.20.0` 이전 버전은 더이상 지원하지 않습니다. Angular 패키지는 NodeJS가 제공하는 폴더 체계와 패키지 형식으로 제공되기 때문에 `14.15.0`이나 `16.10.0` 이후 버전을 사용해야 합니다. |
| [PR&nbsp;#31187][GithubAngularAngularPull31187]     | 이전까지는 기본 URL 직렬화 툴이 쿼리 인자 물음표(`?`) 뒤에 있는 모든 것을 제거했습니다. 그래서 `/path?q=hello?&other=123`라는 쿼리 인자는 `{q: 'hello'}`라고만 변환되었습니다. 하지만 URI 스펙에 따르면 이 동작은 잘못되었습니다. 이제는 `/path?q=hello?&other=123`이라는 쿼리 인자는 `{v: 'hello?', other: '123'}` 라고 변환됩니다. |
| [PR&nbsp;#41730][GithubAngularAngularPull41730]     | `RouterTestingModule`이 제공하는`SpyLocation`가 브라우저에 적합한 동작을 하도록 변경되었습니다. 이제는 `Location.go`를 실행하더라도 `popstate` 이벤트가 발생하지 않습니다. 그리고 이제는 `simulateHashChange`가 `hashChange` 이벤트와 `popstate` 이벤트를 동시에 발생시킵니다. 테스트 로직에서 `location.go`를 사용하고 `Router`의 상태를 검사한다면 이 로직은 `simulateHashChange`로 마이그레이션해야 합니다. 이 때 개별 테스트 스펙은 무엇을 검사하는지 다르기 때문에 코드 한 줄을 수정해서 모든 테스트를 정상 실행하는 방법은 없습니다. `SpyLocation`을 사용해서 브라우저 URL의 변화를 유발하는 테스트 스펙이 있다면 각각 처리해야 합니다. |
| [PR&nbsp;#42952][GithubAngularAngularPull42952]     | 폼 컨트롤에서 발생할 수 있는 모든 상태를 문자열로 표현할 수 있는 `FormControlStatus` 타입이 새로 도입되었습니다. `AbstractControl.status`는 `string` 타입의 `FormControlStatus` 타입으로 좁아지며(narrowed), `statusChanges`는 `Observable<any>` 타입에서 `Observable<FormControlStatus>` 타입으로 좁아졌습니다. 보통은 코드를 많이 수정하지 않아도 이 타입을 사용할 수 있을 것입니다. 하지만 이런 경우는 문제가 생길 수 있습니다: <ol><li><code>AbstractControl.status</code>와 유효하지 않은 상태를 문자열로 비교하는 경우</li><li>`statusChanges` 이벤트를 문자열로 다루지 않는 경우</li></ol> |
| [PR&nbsp;#43087][GithubAngularAngularPull43087]     | 이전까지는 `routerLink`에 `null`이나 `undefined`를 사용하면 빈 문자열과 동일하게 처리되었기 때문에 링크를 비활성화하는 용도로 종종 사용했습니다. 그리고 `href` 프로퍼티는 `HostBinding('attr.href')`라는 방식으로 변경할 수 있었습니다. 이제는 `DebugElement.properties['href']`를 확인해보면 `RouterLink` 내부에서 사용하는 `href` 값이 아니라 엘리먼트에 있는 원래 URL을 반환합니다. |
| [PR&nbsp;#43496][GithubAngularAngularPull43496]     | 이제는 화면 전환 중 취소되었을 때 브라우저 URL을 변경하지 않습니다. 브라우저 URL을 변경하면 화면이 깜빡이는 현상이 종종 발생했었기 때문에 AngularJS 하이브리드 애플리케이션에서만 사용했습니다.  하이브리드 애플리케이션은 개별 화면 전환마다 `navigationId`를 사용하는 방식이었기 때문이며, Angular 라우터 쪽에서는 `NavigationCancel` 이벤트를 직접 구독하고 라우터 상태에 `navigationId`를 반영하기 위해 `location.replaceState`를 사용해야 했습니다.<br />`SpyLocation`의 `urlChanges`를 활용하는 테스트 스펙은 `replaceState` 트리거가 동작하지 않는 것을 수정해야 합니다. |
| [PR&nbsp;#43507][GithubAngularAngularPull43507]     | `@angular/core` 패키지가 제공하던 `WrappedValue` 클래스는 더이상 지원하지 않습니다. `WrappedValue`를 사용하는 라이브러리라면 이 변경사항 때문에 컴파일 시점이나 실행 시점에 오류가 발생할 수 있습니다. 이제 `WrappedValue`는 더이상 사용하지 않습니다. 관련 코드는 모두 제거하세요. |
| [PR&nbsp;#43591][GithubAngularAngularPull43591]     | 이제는 `Route.loadChildren`에 문자열 방식을 사용할 수 없습니다. 그래서 `@angular/core`에 있던 이런 클래스들도 제거되었습니다: <ul><li><code>NgModuleFactoryLoader</code></li><li><code>SystemJsNgModuleFactoryLoader</code></li></ul> `@angular/router` 패키지에서도 이런 심볼들이 제거되었습니다: <ul><li><code>SpyNgModuleFactoryLoader</code></li><li><code>DeprecatedLoadChildren</code></li></ul> `@angular/core/testing`에 있던 `setupTestingRouter` 함수의 선언도 `NgModuleFactoryLoader`의 인자 형태로 변경되었습니다. |
| [PR&nbsp;#43668][GithubAngularAngularPull43668]     | `SwUpdate#activateUpdate`와 `SwUpdate#checkForUpdate`의 반환 타입이 `Promise<boolean>`으로 변경되었습니다.<br />이 변경사항 때문에 TypeScript 타입 검사가 실패할 수 있습니다. 이 기능을 활용한다면 새로운 반환 타입을 사용하세요. |


<!--
### New deprecations
-->
### 새롭게 지원이 중단된 기능

{@a deprecations}

<!--
| Removed                                                                                                             | Replacement                                                                                             | Details                                                                                                                                                                         |
|:---                                                                                                                 |:---                                                                                                     |:---                                                                                                                                                                             |
| [`getModuleFactory`][AioApiCoreGetmodulefactory]                                                                    | [`getNgModuleById`][AioApiCoreGetngmodulebyid]                                                          |                                                                                                                                                                                 |
| Factory-based signature of [`ApplicationRef.bootstrap`][AioApiCoreApplicationrefBootstrap]                          | Type-based signature of [`ApplicationRef.bootstrap`][AioApiCoreApplicationrefBootstrap]                 | Use the Type-based signature in place of the Factory-based signature.                                                                                                           |
| [`PlatformRef.bootstrapModuleFactory`][AioApiCorePlatformrefBootstrapmodulefactory]                                 | [`PlatformRef.bootstrapModule`][AioApiCorePlatformrefBootstrapmodule]                                   |                                                                                                                                                                                 |
| [`ModuleWithComponentFactories`][AioApiCoreModulewithcomponentfactories]                                            | none                                                                                                    |                                                                                                                                                                                 |
| [`Compiler`][AioApiCoreCompiler]                                                                                    | none                                                                                                    |                                                                                                                                                                                 |
| [`CompilerFactory`][AioApiCoreCompilerfactory]                                                                      | none                                                                                                    |                                                                                                                                                                                 |
| [`NgModuleFactory`][AioApiCoreNgmodulefactory]                                                                      | Non-factory based framework APIs                                                                        | Use the non-factory based framework APIs, such as [`PlatformRef.bootstrapModule`][AioApiCorePlatformrefBootstrapmodule] and [`createNgModuleRef`][AioApiCoreCreatengmoduleref]. |
| Factory-based signature of [`ViewContainerRef.createComponent`][AioApiCoreViewcontainerrefCreatecomponent]          | Type-based signature of [`ViewContainerRef.createComponent`][AioApiCoreViewcontainerrefCreatecomponent] | Use the Type-based signature in place of the Factory-based signature.                                                                                                           |
| `aotSummaries` parameter of the [`TestBed.initTestEnvironment` method][AioApiCoreTestingTestbedInittestenvironment] | none                                                                                                    |                                                                                                                                                                                 |
| `aotSummaries` parameter of the [`TestModuleMetadata` type][AioApiCoreTestingTestmodulemetadata]                    | none                                                                                                    |                                                                                                                                                                                 |
| [`renderModuleFactory`][AioApiPlatformServerRendermodulefactory]                                                    | [`renderModule`][AioApiPlatformServerRendermodule]                                                      |                                                                                                                                                                                 |
| [`SwUpdate#activated`][AioApiServiceWorkerSwupdateActivated]                                                        | [`SwUpdate#activateUpdate()`][AioApiServiceWorkerSwupdateActivateupdate]                                | Use the return value of [`SwUpdate#activateUpdate()`][AioApiServiceWorkerSwupdateActivateupdate].                                                                               |
| [`SwUpdate#available`][AioApiServiceWorkerSwupdateAvailable]                                                        | [`SwUpdate#versionUpdates`][AioApiServiceWorkerSwupdateVersionupdates]                                  |                                                                                                                                                                                 |
| `bind-input="value"`                                                                                                | `[input]="value"`                                                                                       |                                                                                                                                                                                 |
| `bind-animate-trigger="value"`                                                                                      | `[@trigger]="value"`                                                                                    |                                                                                                                                                                                 |
| `on-click="onClick()"`                                                                                              | `(click)="onClick()"`                                                                                   |                                                                                                                                                                                 |
| `bindon-ngModel="value"`                                                                                            | `[(ngModel)]="value"`                                                                                   |                                                                                                                                                                                 |
| `ref-templateRef`                                                                                                   | `#templateRef`                                                                                          |                                                                                                                                                                                 |
-->
| 항목 | 대체 방식 | 설명 |
|:---                                                                                                                 |:---                                                                                                     |:---                                                                                                                                                                             |
| [`getModuleFactory`][AioApiCoreGetmodulefactory]                                                                    | [`getNgModuleById`][AioApiCoreGetngmodulebyid]                                                          |                                                                                                                                                                                 |
| 팩토리 기반의 [`ApplicationRef.bootstrap`][AioApiCoreApplicationrefBootstrap]                          | 타입 기반의 [`ApplicationRef.bootstrap`][AioApiCoreApplicationrefBootstrap]                 | 팩토리 기반 대신 타입 기반을 사용하세요. |
| [`PlatformRef.bootstrapModuleFactory`][AioApiCorePlatformrefBootstrapmodulefactory]                                 | [`PlatformRef.bootstrapModule`][AioApiCorePlatformrefBootstrapmodule]                                   |                                                                                                                                                                                 |
| [`ModuleWithComponentFactories`][AioApiCoreModulewithcomponentfactories]                                            | -                                                                                                    |                                                                                                                                                                                 |
| [`Compiler`][AioApiCoreCompiler]                                                                                    | -                                                                                                    |                                                                                                                                                                                 |
| [`CompilerFactory`][AioApiCoreCompilerfactory]                                                                      | -                                                                                                    |                                                                                                                                                                                 |
| [`NgModuleFactory`][AioApiCoreNgmodulefactory]                                                                      | 팩토리 기반이 아닌 프레임워크 API                                                                        | [`PlatformRef.bootstrapModule`][AioApiCorePlatformrefBootstrapmodule]나 [`createNgModuleRef`][AioApiCoreCreatengmoduleref]와 같이 팩토리 기반이 아닌 프레임워크 API를 사용하세요. |
| 팩토리 기반의 [`ViewContainerRef.createComponent`][AioApiCoreViewcontainerrefCreatecomponent]          | 타입 기반의 [`ViewContainerRef.createComponent`][AioApiCoreViewcontainerrefCreatecomponent] | 팩토리 기반 대신 타입 기반을 사용하세요. |
| [`TestBed.initTestEnvironment` 메서드][AioApiCoreTestingTestbedInittestenvironment]의 `aotSummaries` 인자 | -                                                                                                    |                                                                                                                                                                                 |
| [`TestModuleMetadata` 타입][AioApiCoreTestingTestmodulemetadata]의 `aotSummaries` 인자 | -                                                                                                    |                                                                                                                                                                                 |
| [`renderModuleFactory`][AioApiPlatformServerRendermodulefactory]                                                    | [`renderModule`][AioApiPlatformServerRendermodule]                                                      |                                                                                                                                                                                 |
| [`SwUpdate#activated`][AioApiServiceWorkerSwupdateActivated]                                                        | [`SwUpdate#activateUpdate()`][AioApiServiceWorkerSwupdateActivateupdate]                                | [`SwUpdate#activateUpdate()`][AioApiServiceWorkerSwupdateActivateupdate]의 반환값을 사용하세요. |
| [`SwUpdate#available`][AioApiServiceWorkerSwupdateAvailable]                                                        | [`SwUpdate#versionUpdates`][AioApiServiceWorkerSwupdateVersionupdates]                                  |                                                                                                                                                                                 |
| `bind-input="value"`                                                                                                | `[input]="value"`                                                                                       |                                                                                                                                                                                 |
| `bind-animate-trigger="value"`                                                                                      | `[@trigger]="value"`                                                                                    |                                                                                                                                                                                 |
| `on-click="onClick()"`                                                                                              | `(click)="onClick()"`                                                                                   |                                                                                                                                                                                 |
| `bindon-ngModel="value"`                                                                                            | `[(ngModel)]="value"`                                                                                   |                                                                                                                                                                                 |
| `ref-templateRef`                                                                                                   | `#templateRef`                                                                                          |                                                                                                                                                                                 |


<!-- links -->

[AioApiCoreApplicationrefBootstrap]: api/core/ApplicationRef#bootstrap "bootstrap - ApplicationRef | Core - API | Angular"
[AioApiCoreCompiler]: api/core/Compiler "Compiler | Core - API | Angular"
[AioApiCoreCompilerfactory]: api/core/CompilerFactory "CompilerFactory | Core - API | Angular"
[AioApiCoreCreatengmoduleref]: api/core/createNgModuleRef "createNgModuleRef | Core - API | Angular"
[AioApiCoreGetmodulefactory]: api/core/getModuleFactory "getModuleFactory | Core - API | Angular"
[AioApiCoreGetngmodulebyid]: api/core/getNgModuleById "getNgModuleById | Core - API | Angular"
[AioApiCoreModulewithcomponentfactories]: api/core/ModuleWithComponentFactories "ModuleWithComponentFactories | Core - API | Angular"
[AioApiCoreNgmodulefactory]: api/core/NgModuleFactory "NgModuleFactory | Core - API | Angular"
[AioApiCorePlatformrefBootstrapmodulefactory]: api/core/PlatformRef#bootstrapModuleFactory "bootstrapModuleFactory - PlatformRef | Core - API | Angular"
[AioApiCorePlatformrefBootstrapmodule]: api/core/PlatformRef#bootstrapModule "bootstrapModule - PlatformRef | Core - API | Angular"
[AioApiCoreTestingTestbedInittestenvironment]: api/core/testing/TestBed#inittestenvironment "inittestenvironment - TestBed | Testing - Core - API | Angular"
[AioApiCoreTestingTestmodulemetadata]: api/core/testing/TestModuleMetadata "TestModuleMetadata | Testing - Core - API | Angular"
[AioApiCoreViewcontainerrefCreatecomponent]: api/core/ViewContainerRef#createComponent "createComponent - ViewContainerRef | Core - API | Angular"

[AioApiPlatformServerRendermodulefactory]: api/platform-server/renderModuleFactory "renderModuleFactory | Platform server - API | Angular"
[AioApiPlatformServerRendermodule]: api/platform-server/renderModule "renderModule | Platform server - API | Angular"

[AioApiServiceWorkerSwupdateActivated]: api/service-worker/SwUpdate#activated "activated - SwUpdate | Service worker - API | Angular"
[AioApiServiceWorkerSwupdateActivateupdate]: api/service-worker/SwUpdate#activateUpdate "activateUpdate - SwUpdate | Service worker - API | Angular"
[AioApiServiceWorkerSwupdateAvailable]: api/service-worker/SwUpdate#available "available - SwUpdate | Service worker - API | Angular"
[AioApiServiceWorkerSwupdateVersionupdates]: api/service-worker/SwUpdate#versionUpdates "versionUpdates - SwUpdate | Service worker - API | Angular"

[AioGuideReleasesDeprecationPractices]: guide/releases#deprecation-practices "Deprecation practices - Angular versioning and releases | Angular"

<!-- external links -->

[AngularBlog76c02f782aa4]: https://blog.angular.io/76c02f782aa4 "Upcoming improvements to Angular library distribution | Angular Blog"

[AngularUpdateMain]: https://update.angular.io " Angular Update Guide"

[DevThisIsAngularImprovingAngularTestsByEnablingAngularTestingModuleTeardown38kh]: https://dev.to/this-is-angular/improving-angular-tests-by-enabling-angular-testing-module-teardown-38kh "Improving Angular tests by enabling Angular testing module teardown | This is Angular | DEV Community"

[GithubAngularAngularIssues41840]: https://github.com/angular/angular/issues/41840 "RFC: Internet Explorer 11 support deprecation and removal #41840 | angular/angular | GitHub"

[GithubAngularAngularPull31187]: https://github.com/angular/angular/pull/31187 "fix(router): Allow question marks in query param values #31187 | angular/angular | GitHub"
[GithubAngularAngularPull41730]: https://github.com/angular/angular/pull/41730 "fix(common): synchronise location mock behavior with the navigators #41730 | angular/angular | GitHub"
[GithubAngularAngularPull42952]: https://github.com/angular/angular/pull/42952 "feat(forms): Give form statuses a more specific type #42952 | angular/angular | GitHub"
[GithubAngularAngularPull43087]: https://github.com/angular/angular/pull/43087 "fix(router): null/undefined routerLink should disable navigation #43087 | angular/angular | GitHub"
[GithubAngularAngularPull43496]: https://github.com/angular/angular/pull/43496 "fix(router): Prevent URL flicker when new navigations cancel ongoing ... #43496 | angular/angular | GitHub"
[GithubAngularAngularPull43507]: https://github.com/angular/angular/pull/43507 "perf(core): remove support for the deprecated WrappedValue #43507 | angular/angular | GitHub"
[GithubAngularAngularPull43591]: https://github.com/angular/angular/pull/43591 "refactor(router): remove support for loadChildren string syntax #43591 | angular/angular | GitHub"
[GithubAngularAngularPull43642]: https://github.com/angular/angular/pull/43642 "feat(core): drop support for TypeScript 4.2 and 4.3 #43642 | angular/angular | GitHub"
[GithubAngularAngularPull43668]: https://github.com/angular/angular/pull/43668 "feat(service-worker): improve ergonomics of the SwUpdate APIs #43668 | angular/angular | GitHub"
[GithubAngularAngularPull43740]: https://github.com/angular/angular/pull/43740 "feat(bazel): expose esm2020 and es2020 conditions in APF package exports #43740 | angular/angular | GitHub"

[GithubAngularAngularCliIssues21545]: https://github.com/angular/angular-cli/issues/21545 "[RFC] Persistent build cache by default #21545 | angular/angular-cli | GitHub"

<!-- end links -->

@reviewed 2021-11-01
