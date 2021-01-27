<!--
# Updating Angular
-->
# Angular 업데이트하기

<!--
This guide contains information related to updating to the latest version of Angular.
-->
이 가이드 문서는 Angular를 최신 버전으로 업데이트하는 방법을 안내합니다.

<!--
## Updating CLI Apps
-->
## Angular CLI 업데이트하기

<!--
For step-by-step instructions on how to update to the latest Angular release (and leverage our automated migration tools to do so), use the interactive update guide at [update.angular.io](https://update.angular.io).
-->
최신 Angular 릴리즈 버전으로 업데이트하는 방법을 항목마다 알아보려면 [update.angular.io](https://update.angular.io) 문서를 참고하세요.


<!--
## Changes and Deprecations in Version 11
-->
## 11 버전에 변경된 내용, 지원이 중단된 내용

<div class="alert is-helpful">

<!--
   For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").
-->
새 버전에서 지원이 중단된 내용을 확인하려면 [Angular 릴리즈 정책](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices") 문서를 참고하세요.

</div>


{@a breaking-changes}
<!--
### New Breaking Changes
-->
### 변경된 내용

<!--
* Remove deprecated support for IE 9, 10, and IE mobile. See [PR 38931](https://github.com/angular/angular/pull/38931).
* TypeScript 3.9 is no longer supported. Please update to TypeScript 4.0. See [PR 39313](https://github.com/angular/angular/pull/39313).
* `NavigationExtras#preserveQueryParams` has been removed from `@angular/router`. See [PR 38762](https://github.com/angular/angular/pull/38762)
* `CollectionChangeRecord` has been removed from `@angular/core`. See [PR 38668](https://github.com/angular/angular/pull/38668).
* We changed the default value for `relativeLinkResolution` from `'legacy'` to `'corrected'` so that new applications are automatically opted-in to the corrected behavior from  [PR 22394](https://github.com/angular/angular/pull/22394). Applications which use the current default are updated by a migration to specify `'legacy'` to ensure the current behavior is maintained when the default is updated. See [PR 25609](https://github.com/angular/angular/pull/25609).
* Fixed a bug in the router where the arguments for `future` and `curr` snapshots were reversed in the call to `shouldReuseRoute` when processing child routes. Usually this ordering mistake doesn't matter because most implementations of [`shouldReuseRoute`](api/router/RouteReuseStrategy#shouldReuseRoute) just do
an equality comparison between `future` and `curr`. However, some implementations actually do rely on values specifically on
one of the two and will need to be updated. See [PR 26949](https://github.com/angular/angular/pull/26949).
* `ViewEncapsulation.Native` has been removed. Angular previously supported a view encapsulation mode `ViewEncapsulaion.Native` that was based on the v0 Shadow DOM Draft APIs. These APIs have been superceded by the final Shadow DOM APIs, which are enabled via `ViewEncapsulation.ShadowDom`. For background information about this change, see [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade).
* `@angular/platform-webworker` has been removed and will no longer be supported. See [PR 38846](https://github.com/angular/angular/pull/38846).
* `@angular/platform-webworker` is no longer supported. No further versions will be published. See [PR 38846](https://github.com/angular/angular/pull/38846).
* Updated the options for `initialNavigation`. For more information, see [initialNavigation](api/router/InitialNavigation) in the API documentation. See [PR 33128](https://github.com/angular/angular/pull/33128).
* `DatePipe` no longer rounds up fractional milliseconds. See [PR 38009](https://github.com/angular/angular/pull/38009).
* Locale data arrays are now read-only. See [PR 30397](https://github.com/angular/angular/pull/30397).
* The injected `ControlValueAccessor` for `NG_VALUE_ACCESSOR` is now readonly. See [PR 29273](https://github.com/angular/angular/pull/29723).
* The type of `AbstractControl#parent` now indicates that it may be null. See [PR 32671](https://github.com/angular/angular/pull/32671).
* Calling `overrideProvider` before initializing the TestBed will now throw an error. See [PR 38717](https://github.com/angular/angular/pull/38717).
* Types for many Angular built-in pipes have been either narrowed or expanded to be more accurate. For more information, see the corresponding [Pipes](https://angular.io/api?type=pipe) API documentation. See [PR 37447](https://github.com/angular/angular/pull/37447).
* Directives in the `@angular/forms` package used to have `any[]` as a type of validators and asyncValidators
arguments in constructors. Now these arguments are properly typed, so if your code relies on
directive constructor types it may require some updates to improve type safety. See [PR 38994](https://github.com/angular/angular/pull/38944).
* `routerLink` now accepts `undefined` inputs. See [PR 39151](https://github.com/angular/angular/pull/39151).
* The `async` function from `@angular/core/testing` has been renamed to `waitForAsync` in order to avoid confusion with the native JavaScript `async` syntax. The existing function is deprecated and will be removed in a future version. See [PR 37583](https://github.com/angular/angular/pull/37583).
-->
* IE 9, 10, IE 모바일 지원이 중단되었습니다.
[PR 38931](https://github.com/angular/angular/pull/38931)를 참고하세요.

* TypeScript 3.9 지원이 중단되었습니다.
TypeScript 4.0 버전으로 업데이트 하세요.
[PR 39313](https://github.com/angular/angular/pull/39313)를 참고하세요.

* `@angular/router`가 제공하던 `NavigationExtras#preserveQueryParams`가 제거되었습니다.
[PR 38762](https://github.com/angular/angular/pull/38762)를 참고하세요.

* `@angular/core`가 제공하던 `CollectionChangeRecord`가 제거되었습니다.
[PR 38668](https://github.com/angular/angular/pull/38668)를 참고하세요.

* `relativeLinkResolution`의 기본값이 `'legacy'`에서 `'corrected'`로 변경되었습니다.
[PR 22394](https://github.com/angular/angular/pull/22394)를 참고하세요.
새로 생성하는 애플리케이션은 이 기본값이 자동으로 반영되며, 이미 생성된 애플리케이션은 기존 동작을 유지하기 위해 `'legacy'` 값이 그대로 남습니다.
[PR 25609](https://github.com/angular/angular/pull/25609)를 참고하세요.

* 자식 라우팅 규칙을 처리할 때 `shouldReuseRoute`를 사용하면 `future`와 `curr` 스냅샷이 뒤바뀌는 버그가 수정되었습니다.
보통의 경우라면 이 순서가 바뀌어도 `future`와 `curr`가 맞는지 비교하는 로직이 있기 때문에 문제는 되지 않습니다.
하지만 두 객체와 관련된 로직이 더 있었기 때문에 이 버그를 수정하는 것이 맞다고 판단했습니다.
[PR 26949](https://github.com/angular/angular/pull/26949)를 참고하세요.

* `ViewEncapsulations.Native`가 제거되었습니다.
Angular가 이전까지 제공하던 `ViewEncapsulation.Native` 모드는 Shadow DOM Draft API v0을 기반으로 제공하는 것이었습니다.
하지만 이 버전의 API는 Shadow DOM API 최종버전이 나오면서 변경되었으며, `ViewEncapsulation.ShadowDom` 모드가 이 스펙에 해당됩니다.
관련 내용은 [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade)를 참고하세요.

* `@angular/platform-webworker`가 제거되었습니다.
[PR 38846](https://github.com/angular/angular/pull/38846)를 참고하세요.

* `initialNavigation` 옵션이 변경되었습니다.
이 옵션을 사용하는 방법을 자세하게 확인하려면 [initialNavigation](api/router/InitialNavigation) API 문서를 참고하세요.
그리고 변경사항에 대한 내용은 [PR 33128](https://github.com/angular/angular/pull/33128)를 참고하세요.

* `DatePipe`는 이제 밀리초를 반올림하지 않습니다.
[PR 38009](https://github.com/angular/angular/pull/38009)를 참고하세요.

* Locale 데이터 배열이 읽기 전용으로 변경되었습니다.
[PR 30397](https://github.com/angular/angular/pull/30397)를 참고하세요.

* `NG_VALUE_ACCESSOR` 토큰으로 주입되는 `ControlValueAccessor` 객체가 읽기 전용으로 변경되었습니다.
[PR 29273](https://github.com/angular/angular/pull/29723)를 참고하세요.

* `AbstractControl#parent`의 타입이 `null`로 변경되었습니다.
[PR 32671](https://github.com/angular/angular/pull/32671)를 참고하세요.

* 이제 TestBed가 초기화되기 전에 `overrideProvider`를 시랳ㅇ하면 에러가 발생합니다.
[PR 38717](https://github.com/angular/angular/pull/38717)를 참고하세요.

* Angular 기본 파이프의 타입이 실제 타입에 맞게 조정되었습니다.
파이프를 사용하는 방법에 대해 알아보려면 [Pipes](https://angular.io/api?type=pipe) API 문서를 참고하세요.
변경사항에 대한 내용은 [PR 37447](https://github.com/angular/angular/pull/37447)를 참고하세요.

* `@angular/forms`가 제공하는 디렉티브 중 동기/비동기 유효성 검사 함수의 타입으로 사용되던 `any[]` 타입이 실제 유효성 검사 함수 타입으로 변경되었습니다.
이 내용이 적용되고 나면 타입을 좀 더 안전하게 사용하기 위해 코드를 수정해야 할 수도 잇습니다.
[PR 38994](https://github.com/angular/angular/pull/38944)를 참고하세요.

* `routerLink`가 이제 `undefined`를 입력값으로 받을 수 있습니다.
[PR 39151](https://github.com/angular/angular/pull/39151)를 참고하세요.

* `@angular/core/testing`이 제공하던 `async` 함수가 `waitForAsync`로 변경되었습니다.
이 변경사항은 JavaScript `async`와 혼동되는 상황을 피하기 위한 것입니다.
기존에 있던 함수는 지원이 중단되며 이후 버전에서는 제거될 수 있습니다.
[PR 37583](https://github.com/angular/angular/pull/37583)를 참고하세요.


{@a deprecations}
<!--
### New Deprecations
-->
### 지원이 중단된 내용

<!--
| Area                          | API or Feature                                     | May be removed in |
| ----------------------------- | -------------------------------------------------- | ----------------- |
| `@angular/core/testing`       | Rename `async` to `waitForAsync`                       | <!-v11-> v13 |
-->
| 영역                          | API, 기능                                     | 지원 중단 |
| ----------------------------- | -------------------------------------------------- | ----------------- |
| `@angular/core/testing`       | `async`가 `waitForAsync`로 이름이 변경되었습니다.                       | <!--v11--> v13 |


{@a removals}
<!--
### New Removals of Deprecated APIs
-->
### 지원이 중단되는 API

<!--
The following APIs have been removed starting with version 11.0.0*:

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/router`| `NavigationExtras#preserveQueryParams` | no action needed | NavigationExtras#preserveQueryParams has been removed from `@angular/router`.|
| `@angular/core` | `CollectionChangeRecord` | no action needed | CollectionChangeRecord has been removed from `@angular/core`.|
| `@angular/core` | `ViewEncapsulation.Native` | no action needed | Angular previously supported a view encapsulation mode `ViewEncapsulaion.Native` that was based on the v0 Shadow DOM Draft APIs. These APIs have been superceeded by the final Shadow DOM APIs, which are enabled via `ViewEncapsulation.ShadowDom`. For background information about this change, see [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade).|
-->
아래 API들은 *11.0.0* 버전부터 지원이 중단되는 API입니다:

| 패키지          | API            | 대체 문법 | 참고 |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/router`| `NavigationExtras#preserveQueryParams` | 수정할 필요 없음 | `@angular/router`가 제공하던 NavigationExtras#preserveQueryParams 가 제거되었습니다. |
| `@angular/core` | `CollectionChangeRecord` | 수정할 필요 없음 | `@angular/core`가 제공하던 CollectionChangeRecord가 제거되었습니다. |
| `@angular/core` | `ViewEncapsulation.Native` | 수정할 필요 없음 | Angular가 이전까지 제공하던 `ViewEncapsulation.Native` 모드는 Shadow DOM Draft API v0을 기반으로 제공하는 것이었습니다.
하지만 이 버전의 API는 Shadow DOM API 최종버전이 나오면서 변경되었으며, `ViewEncapsulation.ShadowDom` 모드가 이 스펙에 해당됩니다.
관련 내용은 [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade)를 참고하세요. |


{@a ivy}

<!--
## Ivy features and compatibility
-->
## Ivy 기능과 호환성

<!--
Since version 9, Angular Ivy is the default rendering engine. If you haven't heard of Ivy, you can read more about it in the [Angular Ivy guide](guide/ivy).

* Among other features, Ivy introduces more comprehensive type-checking within templates. For details, see [Template Type-checking](guide/template-typecheck).

* For general guidance on debugging and a list of minor changes associated with Ivy, see the [Ivy compatibility guide](guide/ivy-compatibility).

* For help with opting out of Ivy, see the instructions [here](guide/ivy#opting-out-of-angular-ivy).
-->
Angular 9 버전부터는 Ivy가 기본 렌더링 엔진입니다.
Ivy를 들어보지 못했다면 [Angular Ivy](guide/ivy) 문서를 참고하세요.

* Ivy는 수많은 기능을 제공하지만 그 중에서도 템플릿에서 타입을 체계적으로 검사하는 기능을 제공한다는 것이 특히 중요합니다.
자세한 내용은 [템플릿 타입 검사](guide/template-typecheck) 문서를 참고하세요.