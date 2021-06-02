<!--
# Ivy compatibility guide
-->
# Ivy 호환성 가이드

<!--
The Angular team has worked hard to ensure Ivy is as backwards-compatible with the previous rendering engine ("View Engine") as possible.
However, in rare cases, minor changes were necessary to ensure that the Angular's behavior was predictable and consistent, correcting issues in the View Engine implementation.
In order to smooth the transition, we have provided automated migrations wherever possible so your application and library code is migrated automatically by the CLI.
That said, some applications will likely need to apply some manual updates.
-->
Angular 팀은 Ivy가 이전에 사용하던 View Engine 렌더링 엔진과 하위 호환성이 유지되도록 최대한 노력하고 있습니다.
하지만 View Engine에서 발생하는 이슈를 해결하기 위해 사용 방법이 변경되는 경우가 가끔 있습니다.
이런 상황에서도 Ivy를 편하게 도입하기 위해, Angular CLI를 활용해서 애플리케이션 코드와 라이브러리 코드를 자동으로 마이그레이션하는 방법을 제공하고 있습니다.
다만, 일부 코드는 직접 수정해야 할 수도 있습니다.


{@a debugging}
<!--
## How to debug errors with Ivy
-->
## Ivy에서 디버깅하는 방법

<!--
If you're seeing errors, first temporarily [turn off Ivy](guide/ivy#opting-out-of-angular-ivy) in your `tsconfig.json` and re-start your application.

If you're still seeing the errors, they are not specific to Ivy. In this case, you may want to consult the [general update guide](guide/updating-to-version-12). If you've opted into any of the new, stricter type-checking settings, you may also want to check out the [template type-checking guide](guide/template-typecheck).

If the errors are gone, switch back to Ivy by removing the changes to the `tsconfig.json` and review the list of expected changes below.
-->
애플리케이션을 개발하다가 에러가 발생하면 먼저 `tsconfig.json` 설정을 변경해서 임시로 [Ivy를 끄고](guide/ivy#opting-out-of-angular-ivy) 애플리케이션을 재시작 해보세요.

그래도 에러가 발생한다면 이 문제는 Ivy 때문에 발생하는 문제가 아닙니다.
이런 경우에는 [업데이트 가이드](guide/updating-to-version-12)를 확인해 보세요.
새로운 타입을 도입했거나 엄격한 타입 검사 설정을 활성화했다면 [템플릿 타입 검사 가이드](guide/template-typecheck) 문서를 보는 것도 좋습니다.

에러가 사라지면 `tsconfig.json` 파일을 다시 원래대로 돌려서 Ivy를 활성화 한 후에 애플리케이션이 제대로 동작하는지 확인해 보세요.


{@a payload-size-debugging}
<!--
### Payload size debugging
-->
### 빌드 결과물 크기 디버깅하기

<!--
If you notice that the size of your application's main bundle has increased with Ivy, you may want to check the following:

1. Verify that the components and `NgModules` that you want to be lazy loaded are only imported in lazy modules.
Anything that you import outside lazy modules can end up in the main bundle.
See more details in the original issue [here](https://github.com/angular/angular-cli/issues/16146#issuecomment-557559287).

1. Check that imported libraries have been marked side-effect-free.
If your application imports from shared libraries that are meant to be free from side effects, add "sideEffects": false to their `package.json`.
This will ensure that the libraries will be properly tree-shaken if they are imported but not directly referenced.
See more details in the original issue [here](https://github.com/angular/angular-cli/issues/16799#issuecomment-580912090).

1. Projects not using Angular CLI will see a significant size regression unless they update their minifier settings and set compile-time constants `ngDevMode`, `ngI18nClosureMode` and `ngJitMode` to `false` (for Terser, set these to `false` using [`global_defs` config option](https://terser.org/docs/api-reference.html#conditional-compilation)).
Note that these constants are not meant to be used by 3rd party library or application code as they are not part of our public api surface and might change in the future.
-->
Ivy를 도입한 이후에 애플리케이션 빌드 용량이 커졌다면 이런 내용을 확인해 보세요:

1. 지연로딩하는 `NgModule`을 제대로 사용하고 있는지 확인해 보세요.
지연로딩하려는 모듈은 메인 빌드 결과물에 포함되지 않아야 합니다.
자세한 내용은 [이 이슈](https://github.com/angular/angular-cli/issues/16146#issuecomment-557559287)를 참고하세요.

1. 사용하는 라이브러리가 영향을 주지 않는지 확인해 보세요.
라이브러리 `package.json`에 "sideEffects"가 `false`로 지정되면 해당 라이브러리는 영향을 주지 않습니다.
그리고 이 프로퍼티가 지정된 라이브러리는 직접 참조하지 않는한 트리 셰이킹도 제대로 동작합니다.
자세한 내용은 [이 이슈](https://github.com/angular/angular-cli/issues/16799#issuecomment-580912090)를 참고하세요.

1. Angular CLI를 사용하지 않는다면 프로젝트의 코드 압축 설정, 컴파일 시점에 사용되는 `ngDevMode`, `ngI18nClosureMode`, `ngJitMode` 환경설정 값이 `false`일 때 빌드 결과물의 용량이 크게 늘어날 수 있습니다.
Teaser를 사용한다면 [`global_defs` 환경설정 옵션](https://terser.org/docs/api-reference.html#conditional-compilation) 값을 `false`로 지정하세요.
이런 환경설정 플래그들은 원래 서드파티 라이브러리나 애플리케이션에서 사용하지 않는 것이 좋습니다.
이 플래그들은 공식적으로 지원하는 API가 아니기 때문에 이후 버전에서는 변경될 수 있습니다.


{@a common-changes}
<!--
### Changes you may see
-->
### 동작이 변경된 내용

<!--
* By default, `@ContentChildren` queries will only search direct child nodes in the DOM hierarchy (previously, they would search any nesting level in the DOM as long as another directive wasn't matched above it). See further [details](guide/ivy-compatibility-examples#content-children-descendants).

* All classes that use Angular DI must have an Angular decorator like `@Directive()` or `@Injectable` (previously, undecorated classes were allowed in AOT mode only or if injection flags were used). See further [details](guide/ivy-compatibility-examples#undecorated-classes).

* Unbound inputs for directives (for example, name in `<my-comp name="">`) are now set upon creation of the view, before change detection runs (previously, all inputs were set during change detection).

* Static attributes set directly in the HTML of a template will override any conflicting host attributes set by directives or components (previously, static host attributes set by directives / components would override static template attributes if conflicting).
-->
* `@ContentChildren`은 DOM 계층에서 바로 아래에 있는 자식 노드를 쿼리합니다.
이전에는 자식 노드 중에서 대상을 찾지 못하면 DOM 안쪽까지 탐색을 진행하기도 했습니다.
자세한 내용은 [이 문서](guide/ivy-compatibility-examples#content-children-descendants)를 참고하세요.

* Angular 의존성 주입 시스템에 의해 주입되는 의존성 객체는 반드시 `@Directive()`나 `@Injectable` 데코레이터가 지정되어야 합니다.
이전에는 AOT 모드나 의존성 주입 플래그를 사용하면 허용하는 경우도 있었습니다.
자세한 내용은 [이 문서](guide/ivy-compatibility-examples#undecorated-classes)를 참고하세요.

* 디렉티브에서 바인딩하지 않는 프로퍼티(ex. `<my-comp name="">` 에서 name)는 이제 변화 감지 로직이 실행되기 전, 화면이 구성되면서 선언됩니다.
이전에는 모든 입력 프로퍼티는 변화 감지 로직이 실행되면서 선언되었습니다.

* 템플릿 HTML에서 직접 설정하는 어트리뷰트 값은 이제 디렉티브나 컴포넌트가 호스트 어트리뷰트에 설정하는 값보다 우선 처리됩니다.
이전에는 디렉티브/컴포넌트가 설정하는 값이 우선 처리되는 경우가 있었습니다.


{@a less-common-changes}
<!--
### Less common changes
-->
### 참고

<!--
* Properties like `host` inside `@Component` and `@Directive` decorators can be inherited (previously, only properties with explicit field decorators like `@HostBinding` would be inherited).

* HammerJS support is opt-in through importing the `HammerModule` (previously, it was always included in production bundles regardless of whether the application used HammerJS).

* `@ContentChild` and `@ContentChildren` queries will no longer be able to match their directive's own host node (previously, these queries would match the host node in addition to its content children).

* If a token is injected with the `@Host` or `@Self` flag, the module injector is not searched for that token (previously, tokens marked with these flags would still search at the module level).

* When accessing multiple local refs with the same name in template bindings, the first is matched (previously, the last instance was matched).

* Directives that are used in an exported module (but not exported themselves) are exported publicly (previously, the compiler would automatically write a private, aliased export that it could use its global knowledge to resolve downstream).

* Foreign functions or foreign constants in decorator metadata aren't statically resolvable (previously, you could import a constant or function from another compilation unit, like a library, and use that constant/function in your `@NgModule` definition).

* Forward references to directive inputs accessed through local refs are no longer supported by default. [details](guide/ivy-compatibility-examples#forward-refs-directive-inputs)

* If there is both an unbound class attribute and a `[class]` binding, the classes in the unbound attribute will also be added (previously, the class binding would overwrite classes in the unbound attribute).
For more information about the updated style precedence in Ivy, refer to the [style precedence guide](guide/style-precedence).

* It is now an error to assign values to template-only variables like `item` in `ngFor="let item of items"` (previously, the compiler would ignore these assignments).

* It's no longer possible to overwrite lifecycle hooks with mocks on directive instances for testing (instead, modify the lifecycle hook on the directive type itself).

* Special injection tokens (such as `TemplateRef` or `ViewContainerRef`) return a new instance whenever they are requested (previously, instances of special tokens were shared if requested on the same node). This primarily affects tests that do identity comparison of these objects.

* ICU parsing happens at runtime, so only text, HTML tags and text bindings are allowed inside ICU cases (previously, directives were also permitted inside ICUs).

* Adding text bindings into i18n translations that are not present in the source template itself will throw a runtime error (previously, including extra bindings in translations was permitted).

* Extra HTML tags in i18n translations that are not present in the source template itself will be rendered as plain text (previously, these tags would render as HTML).

* Providers formatted as `{provide: X}` without a `useValue`, `useFactory`, `useExisting`, or `useClass` property are treated like `{provide: X, useClass: X}` (previously, it defaulted to `{provide: X, useValue: undefined}`).

* `DebugElement.attributes` returns `undefined` for attributes that were added and then subsequently removed (previously, attributes added and later removed would have a value of `null`).

* `DebugElement.classes` returns `undefined` for classes that were added and then subsequently removed (previously, classes added and later removed would have a value of `false`).

* If selecting the native `<option>` element in a `<select>` where the `<option>`s are created using `*ngFor`, use the `[selected]` property of an `<option>` instead of binding to the `[value]` property of the `<select>` element (previously, you could bind to either.) [details](guide/ivy-compatibility-examples#select-value-binding)

* Embedded views (such as ones created by `*ngFor`) are now inserted in front of anchor DOM comment node (for example, `<!--ng-for-of-->`) rather than behind it as was the case previously.
  In most cases this has no impact on rendered DOM.

  When animations delay the removal of an embedded view, any new embedded views will be inserted after the embedded view that will be removed once the animation completes.
  This difference only lasts while the animation is active, and might alter the visual appearance of the animation.
  When the animation is finished, the resulting rendered DOM is identical to that rendered with View Engine.

  One additional exception is the `<select>` element with `<option>` elements dynamically rendered using `NgForOf`. If a [`trackBy`](api/common/NgForOf#ngForTrackBy) function is not provided, the selected `<option>` will not be preserved when the iterable used by the `NgForOf` changes.
  With View Engine, this programming error was obscured, and often not visible.
  To avoid this problem, provide the `trackBy` function to correctly associate the model with the rendered DOM elements.
-->
* `@Component`, `@Directive` 데코레이터 안에 있는 `host`와 같은 프로퍼티가 상속될 수 있습니다.
이전에는 `@HostBinding`과 같은 일부 데코레이터만 상속되었습니다.

* HammerJS 지원 기능이 `HammerModule`을 로드할 때 로드됩니다.
이전에는 애플리케이션에 HammerJS를 사용하기만 하면 운영용 빌드에도 이 기능이 포함되었습니다.

* `@ContentChild`와 `@ContentChildren`가 이제는 디렉티브의 호스트 노드를 쿼리하지 않습니다.
이전에는 호스트 노드도 쿼리했습니다.

* 의존성 토큰에 `@Host`나 `@Self` 플래그가 지정되면, 모듈 인젝터가 해당 토큰을 탐색하지 않습니다.
이전에는 모듈 계층에서 이 토큰을 찾았습니다.

* 템플릿에서 지역 참조 변수를 같은 이름으로 여러개 선언하면 첫 번째 매칭되는 항목이 사용됩니다.
이전에는 마지막으로 매칭되는 항목이 사용되었습니다.

* 외부로 직접 공개되지 않고 모듈을 통해서 외부로 공유되는 디렉티브는 이제 `public`으로 처리됩니다.
이전에는 컴파일러가 이 디렉티브를 `private`으로 선언하고 전역 범위에서 이 디렉티브를 탐색하는 방식으로 접근했습니다.

* 데코레이터 메타데이터 밖에 선언된 함수와 상수는 이제 정적으로 처리되지 않습니다.
이전에는 이 항목들을 라이브러리처럼 로드하고 `@NgModule`을 정의할 때 사용해야 했습니다.

* 디렉티브의 입력값을 바인딩하기 전에 참조하면 값을 제대로 확인할 수 없습니다.
[이 내용](guide/ivy-compatibility-examples#forward-refs-directive-inputs)을 참고하세요.

* 바인딩하지 않은 클래스 어트리뷰트와 `[class]` 바인딩이 동시에 존재하면 바인딩하지 않은 어트리뷰트가 추가됩니다.
이전에는 클래스 바인딩이 바인딩하지 않은 어트리뷰트의 값을 덮어썼습니다.
Ivy 환경에 적용되는 스타일 우선순위에 대해 자세하게 알아보려면 [스타일 우선순위 가이드](guide/style-precedence) 문서를 참고하세요.

* `ngFor="let item of items"`와 같은 표현식에서 `item`처럼, 템플릿에서만 사용하는 변수에 값을 할당하면 이제 에러가 발생합니다.
이전에는 컴파일러가 할당 표현식을 무시했습니다.

* 테스트하기 위한 목적으로 디렉티브 인스턴스의 라이프싸이클 후킹 함수를 덮어쓰는 방식은 이제 사용할 수 없습니다.
이전에는 라이프싸이클 후킹 함수를 덮어쓸 수 있었습니다.

* `TemplateRef`나 `ViewContainerRef`와 같은 특수 의존성 토큰은 항상 새 인스턴스를 반환합니다.
이전에는 같은 계층에 인스턴스가 존재하면 인스턴스를 공유하는 경우도 있었습니다.
이 변경사항은 객체를 비교하는 테스트 코드에 영향을 줄 수 있습니다.

* 이제는 ICU 파싱이 실행 시점에만 실행되기 때문에 ICU 안에서는 텍스트, HTML 태그, 텍스트 바인딩만 허용됩니다.
이전에는 디렉티브도 ICU 내부에서 사용할 수 있었습니다.

* 소스 템플릿에 존재하지 않는 텍스트 바인딩을 i18n 번역 파일에 추가하면 실행 시점에 에러가 발생합니다.
이전에는 번역 파일 안에서 문자열을 바인딩할 수 있었습니다.

* 소스 템플릿에 존재하지 않는 HTML 태그가 i18n 번역 파일에 사용되면 일반 텍스트로 렌더링됩니다.
이전에는 HTML로 렌더링되었습니다.

* `useValue`, `useFactory`, `useExisting`, `useClass` 프로퍼티 없이 `{provide: X}`라고 사용하면 `{provide: X, useClass: X}`로 처리합니다.
이전에는 `{provide: X, useValue: undefined}`로 처리했습니다.

* `DebugElement.attributes`에 추가되었다가 삭제된 어트리뷰트가 참조하면 `undefined`를 반환합니다.
이전에는 `null` 값을 반환했습니다.

* `DebugElement.classes`에 추가되었다가 삭제된 클래스를 참조하면 `undefined`를 반환합니다.
이전에는 `false` 값을 반환했습니다.

* `<select>` 안에서 `*ngFor`로 생성된 `<option>` 엘리먼트를 선택할 때 `<select>` 엘리먼트의 `[value]` 프로퍼티를 바인딩하는 방법 대신 `<option>` 엘리먼트의 `[selected]` 프로퍼티를 사용해야 합니다.
이전에는 두 방식 모두 사용할 수 있었습니다.
자세한 내용은 [이 문서](guide/ivy-compatibility-examples#select-value-binding)를 참고하세요.

* `*ngFor` 등이 생성한 임베디드 뷰(embedded view)는 이제 `<!--ng-for-of-->`와 같은 DOM 주석 노드 앞에 추가됩니다.
이전에는 DOM 주석 노드 뒤에 추가되었습니다.

  보통의 경우라면 이 변경사항이 렌더링된 DOM에 주는 경우는 거의 없습니다.
  하지만 임베디드 뷰를 사라지게 하는 애니메이션에 딜레이를 사용했을 때는 이 애니메이션이 끝나야 새로운 임베디드 뷰가 추가되었기 때문에, 이 변경사항이 적용되면 애니메이션이 이전과 다르게 동작할 수 있습니다.
  이런 상황은 애니메이션이 활성화되었을 때만 확인할 수 있습니다.
  애니메이션이 끝나고 나면 DOM은 View Engine 때와 같은 방식으로 동작합니다.

  또다른 예외 상황은 `<select>` 엘리먼트 안에서 `<option>` 엘리먼트가 `NgForOf`로 동적으로 렌더링되는 경우가 있습니다.
  이 경우에 [`trackBy`](api/common/NgForOf#ngForTrackBy) 함수를 지정하지 않으면 `NgForOf`가 변경되었을 때 `<option>`이 유지되지 않습니다.
  View Engine에서는 에러가 발생하며 화면이 제대로 표시되지 않기도 했습니다.
  이 문제를 방지하려면 `trackBy` 함수를 지정해서 모델과 렌더링된 DOM 엘리먼트를 제대로 연결하면 됩니다.