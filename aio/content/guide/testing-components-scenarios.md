<!--
# Component testing scenarios
-->
# 컴포넌트 테스트 시나리오

<!--
This guide explores common component testing use cases.

<div class="alert is-helpful">

If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>
-->
이 문서에서는 컴포넌트를 다양하게 테스트하는 방법에 대해 알아봅시다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example name="testing" noDownload>테스트 코드 확인하고 실행하기</live-example>에서 확인할 수 있습니다.

이 문서에서 설명하는 테스트 기능은 <live-example name="testing" noDownload>브라우저에서 실행하기</live-example>나 <live-example name="testing" downloadOnly>내려받아 로컬에서 실행하기</live-example>에서 확인할 수 있습니다.

</div>


<!--
## Component binding
-->
## 컴포넌트 바인딩

<!--
In the example application, the `BannerComponent` presents static title text in the HTML template.

After a few changes, the `BannerComponent` presents a dynamic title by binding to the component's `title` property like this.

<code-example header="app/banner/banner.component.ts" path="testing/src/app/banner/banner.component.ts" region="component"></code-example>

As minimal as this is, you decide to add a test to confirm that component actually displays the right content where you think it should.
-->
예제 앱에서 `BannerComponent` 템플릿에 있는 `title` 프로퍼티는 부모 컴포넌트와 바인딩되어 있기 때문에 동적으로 변경될 수 있습니다.

<code-example header="app/banner/banner.component.ts" path="testing/src/app/banner/banner.component.ts" region="component"></code-example>

이 컴포넌트를 가장 간단하게 테스트하려면 컴포넌트로 문자열을 바인딩했을때 이 문자열이 실제로 표시되는지 확인하면 됩니다.


<!--
#### Query for the `<h1>`
-->
#### `<h1>` 쿼리하기

<!--
You'll write a sequence of tests that inspect the value of the `<h1>` element that wraps the *title* property interpolation binding.

You update the `beforeEach` to find that element with a standard HTML `querySelector` and assign it to the `h1` variable.

<code-example header="app/banner/banner.component.spec.ts (setup)" path="testing/src/app/banner/banner.component.spec.ts" region="setup"></code-example>
-->
*title* 프로퍼티가 제대로 문자열 바인딩 되었는지 확인하려면 `<h1>` 엘리먼트의 값을 검사하면 됩니다.

표준 HTML `querySelector`를 사용해서 `h1` 엘리먼트를 참조하도록 `beforeEach()`를 수정해 봅시다.

<code-example header="app/banner/banner.component.spec.ts (환경설정)" path="testing/src/app/banner/banner.component.spec.ts" region="setup"></code-example>



<a id="detect-changes"></a>

<!--
#### `createComponent()` does not bind data
-->
#### `createComponent()` 는 데이터를 바인딩하지 않습니다.

<!--
For your first test you'd like to see that the screen displays the default `title`.
Your instinct is to write a test that immediately inspects the `<h1>` like this:

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="expect-h1-default-v1"></code-example>

*That test fails* with the message:

<code-example format="javascript" language="javascript">

expected '' to contain 'Test Tour of Heroes'.

</code-example>

Binding happens when Angular performs **change detection**.

In production, change detection kicks in automatically when Angular creates a component or the user enters a keystroke or an asynchronous activity \(for example, AJAX\) completes.

The `TestBed.createComponent` does *not* trigger change detection; a fact confirmed in the revised test:

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="test-w-o-detect-changes"></code-example>
-->
이제 `title` 프로퍼티에 할당된 문자열이 제대로 표시되는지 확인해 보려고 합니다.
`<h1>` 엘리먼트를 검사하는 코드는 이렇게 작성해볼 수 있습니다:

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="expect-h1-default-v1"></code-example>

하지만 이 테스트는 이런 메시지를 출력하면서 *실패합니다*:

<code-example format="javascript" language="javascript">

expected '' to contain 'Test Tour of Heroes'.

</code-example>

데이터 바인딩은 Angular가 **변화를 감지\(change detection\)** 했을 때 발생합니다.

실제 운영환경에서는 Angular가 컴포넌트를 생성하거나 사용자가 키를 입력했을 때, AJAX와 같은 비동기 작업이 끝났을 때 변화 감지 로직이 자동으로 실행됩니다.

하지만 `TestBed.createComponent` 만으로는 변화 감지 로직이 *시작되지 않습니다*.
그래서 지금 시점에는 `<h1>` 엘리먼트의 값은 빈 문자열입니다:

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="test-w-o-detect-changes"></code-example>


#### `detectChanges()`

<!--
You must tell the `TestBed` to perform data binding by calling `fixture.detectChanges()`.
Only then does the `<h1>` have the expected title.

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="expect-h1-default"></code-example>

Delayed change detection is intentional and useful.
It gives the tester an opportunity to inspect and change the state of the component *before Angular initiates data binding and calls [lifecycle hooks](guide/lifecycle-hooks)*.

Here's another test that changes the component's `title` property *before* calling `fixture.detectChanges()`.

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="after-change"></code-example>
-->
데이터를 바인딩하려면 `fixture.detectChanges()` 를 실행해야 합니다.
이 메서드를 실행하고 나면 `<h1>` 엘리먼트에 컴포넌트 클래스에 있는 문자열이 바인딩되는 것을 확인할 수 있습니다.

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="expect-h1-default"></code-example>

변화 감지 로직을 수동으로 시작하는 것은 더 나은 활용도를 위해 의도된 것입니다.
변화 감지 로직이 자동이 실행되지 않기 때문에 개발자가 데이터가 바인딩되기 전 상태를 검사할 수 있으며, [라이프싸이클 후킹 메서드](guide/lifecycle-hooks)가 실행되면서 데이터가 어떻게 변경되는지 원하는 시점마다 확인할 수 있습니다.

`fixture.detectChanges()`를 실행하기 전이라면 `title` 프로퍼티를 이렇게 테스트할 수도 있습니다.

<code-example path="testing/src/app/banner/banner.component.spec.ts" region="after-change"></code-example>


<a id="auto-detect-changes"></a>
<a id="automatic-change-detection"></a>

<!--
#### Automatic change detection
-->
#### 변화 감지 로직을 자동으로 실행하기

<!--
The `BannerComponent` tests frequently call `detectChanges`.
Some testers prefer that the Angular test environment run change detection automatically.

That's possible by configuring the `TestBed` with the `ComponentFixtureAutoDetect` provider.
First import it from the testing utility library:

<code-example header="app/banner/banner.component.detect-changes.spec.ts (import)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="import-ComponentFixtureAutoDetect"></code-example>

Then add it to the `providers` array of the testing module configuration:

<code-example header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect"></code-example>

Here are three tests that illustrate how automatic change detection works.

<code-example header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect Tests)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect-tests"></code-example>

The first test shows the benefit of automatic change detection.

The second and third test reveal an important limitation.
The Angular testing environment does *not* know that the test changed the component's `title`.
The `ComponentFixtureAutoDetect` service responds to *asynchronous activities* such as promise resolution, timers, and DOM events.
But a direct, synchronous update of the component property is invisible.
The test must call `fixture.detectChanges()` manually to trigger another cycle of change detection.

<div class="alert is-helpful">

Rather than wonder when the test fixture will or won't perform change detection, the samples in this guide *always call* `detectChanges()` *explicitly*.
There is no harm in calling `detectChanges()` more often than is strictly necessary.

</div>
-->
지금까지 작성한 테스트 코드에서는 `detectChanges`를 계속해서 호출해야 합니다.
하지만 변화 감지 로직이 자동으로 실행되는 것을 선호하는 개발자도 있습니다.

변화 감지 로직을 자동으로 실행하려면 `TestBed`를 설정할 때 `ComponentFixtureAutoDetect` 프로바이더를 지정하면 됩니다.
먼저 테스트 라이브러리에서 이 심볼을 로드합니다:

<code-example header="app/banner/banner.component.detect-changes.spec.ts (심볼 로드하기)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="import-ComponentFixtureAutoDetect"></code-example>

그리고 테스트 모듈 설정의 `providers` 배열에 이 심볼을 추가합니다:

<code-example header="app/banner/banner.component.detect-changes.spec.ts (변화감지 자동으로 실행하기)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect"></code-example>

이 설정에 맞게 테스트 코드를 작성해보면 이렇습니다.

<code-example header="app/banner/banner.component.detect-changes.spec.ts (변화 감지가 자동으로 동작하는 테스트 코드)" path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect-tests"></code-example>

변화 감지 로직이 자동으로 실행되면 첫 번째 테스트 코드처럼 아주 간단한 테스트 코드를 작성할 수 있습니다.

그리고 두 번째 테스트 코드와 세 번째 테스트 코드를 보면 이 환경설정의 한계를 확인할 수 있습니다.
Angular 테스트 환경에서는 컴포넌트의 `title` 값이 변경된 것을 직접 감지할 수 없습니다.
`ComponentFixtureAutoDetect` 서비스는 프라미스\(Promise\)가 완료되거나 타이머 이벤트, DOM 이벤트와 같은 *비동기 작업* 에만 반응합니다.
그래서 컴포넌트 프로퍼티를 직접 수정하면 이 수정사항은 화면에 반영되지 않습니다.
이런 경우에는 변화 감지가 필요한 시점에 `fixture.detectChanges()`를 직접 실행해주면 됩니다.

<div class="alert is-helpful">

이 문서에서는 변화 감지 로직이 자동으로 실행되는 것이 고민하는 대신 *명시적으로* `detectChanges()`를 실행하는 방식을 사용합니다.
`detectChanges()`는 꼭 필요한 상황이 아닐 때 더 실행되더라도 문제가 발생하지 않습니다.

</div>


<a id="dispatch-event"></a>

<!--
#### Change an input value with `dispatchEvent()`
-->
#### `dispatchEvent()`로 입력값 변경하기

<!--
To simulate user input, find the input element and set its `value` property.

You will call `fixture.detectChanges()` to trigger Angular's change detection.
But there is an essential, intermediate step.

Angular doesn't know that you set the input element's `value` property.
It won't read that property until you raise the element's `input` event by calling `dispatchEvent()`.
*Then* you call `detectChanges()`.

The following example demonstrates the proper sequence.

<code-example header="app/hero/hero-detail.component.spec.ts (pipe test)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe"></code-example>
-->
사용자가 입력하는 것을 시뮬레이션하려면 입력 엘리먼트를 찾아서 이 엘리먼트의 `value` 프로퍼티 값을 설정하면 됩니다.

그리고 `fixture.detectChanges()` 를 실행하면 Angular 변화 감지 로직을 시작할 수 있습니다.
하지만 이 과정에서 꼭 필요한 단계가 하나 빠졌습니다.

Angular는 입력 엘리먼트의 `value` 프로퍼티 값이 변경된 것을 알 수 없습니다.
그래서 `dispatchEvent()`를 실행해서 엘리먼트에서 `input` 이벤트가 발생했다는 것을 알려야 Angular가 프로퍼티 값이 변경된 것을 확인할 수 있습니다.

아래 테스트 코드처럼 작성하면 됩니다.

<code-example header="app/hero/hero-detail.component.spec.ts (pipe test)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe"></code-example>


<!--
## Component with external files
-->
## 외부 파일을 사용하는 컴포넌트

<!--
The preceding `BannerComponent` is defined with an *inline template* and *inline css*, specified in the `@Component.template` and `@Component.styles` properties respectively.

Many components specify *external templates* and *external css* with the `@Component.templateUrl` and `@Component.styleUrls` properties respectively, as the following variant of `BannerComponent` does.

<code-example header="app/banner/banner-external.component.ts (metadata)" path="testing/src/app/banner/banner-external.component.ts" region="metadata"></code-example>

This syntax tells the Angular compiler to read the external files during component compilation.

That's not a problem when you run the CLI `ng test` command because it *compiles the application before running the tests*.

However, if you run the tests in a **non-CLI environment**, tests of this component might fail.
For example, if you run the `BannerComponent` tests in a web coding environment such as [plunker](https://plnkr.co), you'll see a message like this one:

<code-example format="output" hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</code-example>

You get this test failure message when the runtime environment compiles the source code *during the tests themselves*.

To correct the problem, call `compileComponents()` as explained in the following [Calling compileComponents](#compile-components) section.
-->
이전 섹션에서 살펴본 `BannerComponent`는 `@Component.template`과 `@Component.styles` 프로퍼티를 사용해서 *인라인 템플릿* 과 *인라인 CSS* 로 구성되어 있습니다.

하지만 컴포넌트는 대부분 `@Component.templateUrl`과 `@Component.styleUrls`를 사용해서 *별도 템플릿* 파일과 *별도 CSS* 파일로 구성됩니다.

<code-example header="app/banner/banner-external.component.ts (메타데이터)" path="testing/src/app/banner/banner-external.component.ts" region="metadata"></code-example>

이렇게 구현하면 Angular가 컴포넌트를 컴파일 할 때 외부에서 해당 파일을 불러옵니다.

Angular CLI로 `ng test` 명령을 사용한다면 *테스트가 실행되기 전에 앱이 컴파일되기 때문에* 아무런 문제가 없습니다.

하지만 **Angular CLI를 사용하지 않는 환경** 에서는 문제가 발생할 수 있습니다.
실제로 `BannerComponent` 테스트 코드를 [plunker](https://plnkr.co) 환경에서 실행한다면 이런 오류가 발생합니다:

<code-example format="output" hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</code-example>

이 에러는 *테스트 하는 동안* 소스 코드를 컴파일하는 환경에서도 발생할 수 있습니다.

이 문제를 해결하려면 [compileComponents() 실행하기](#compile-components) 섹션에서 설명하는 대로 `compileComponents()` 메서드를 실행해주면 됩니다.


<a id="component-with-dependency"></a>

<!--
## Component with a dependency
-->
## 의존성 객체가 주입되는 컴포넌트

<!--
Components often have service dependencies.

The `WelcomeComponent` displays a welcome message to the logged-in user.
It knows who the user is based on a property of the injected `UserService`:

<code-example header="app/welcome/welcome.component.ts" path="testing/src/app/welcome/welcome.component.ts"></code-example>

The `WelcomeComponent` has decision logic that interacts with the service, logic that makes this component worth testing.
Here's the testing module configuration for the spec file:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="config-test-module"></code-example>

This time, in addition to declaring the *component-under-test*,
the configuration adds a `UserService` provider to the `providers` list.
But not the real `UserService`.
-->
컴포넌트에는 의존성 객체가 주입되기도 합니다.

`WelcomeComponent`는 로그인한 사용자에게 환영 메시지를 표시하는 컴포넌트입니다.
이 컴포넌트는 로그인한 사용자가 누군지 알아내기 위해 `UserService`를 의존성으로 주입받습니다:

<code-example header="app/welcome/welcome.component.ts" path="testing/src/app/welcome/welcome.component.ts"></code-example>

그러면 `WelcomeComponent`와 `UserService`가 상호작용하는 로직을 테스트 코드로 작성해볼 수 있습니다.
테스트 모듈은 이렇게 구성합니다:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="config-test-module"></code-example>

이제 `providers` 배열에 `UserService` 프로바이더를 추가해서 테스트 코드를 작성해 봅시다.
하지만 실제 `UserService`를 사용하지는 않을 것입니다.


<a id="service-test-doubles"></a>

<!--
#### Provide service test doubles
-->
#### 목 서비스 프로바이더 등록하기

<!--
A *component-under-test* doesn't have to be injected with real services.
In fact, it is usually better if they are test doubles such as, stubs, fakes, spies, or mocks.
The purpose of the spec is to test the component, not the service, and real services can be trouble.

Injecting the real `UserService` could be a nightmare.
The real service might ask the user for login credentials and attempt to reach an authentication server.
These behaviors can be hard to intercept.
It is far easier and safer to create and register a test double in place of the real `UserService`.

This particular test suite supplies a minimal mock of the `UserService` that satisfies the needs of the `WelcomeComponent` and its tests:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="user-service-stub"></code-example>
-->
컴포넌트를 테스트할 때는 실제 서비스 객체를 주입하지 않고 목 객체를 주입하는 것이 더 편합니다.
목 객체는 mocks, subs, fakes, spies과 같은 용어로 언급하기도 합니다.
컴포넌트를 테스트하는 이유는 컴포넌트의 기능을 검사하는 것이지 서비스를 검사하는 것이 아닙니다.

컴포넌트에 실제 서비스 객체를 주입하면 상황이 복잡해지기만 할 뿐입니다.
`UserService`가 실제로 사용되는 객체로 주입되면 이 서비스는 사용자의 로그인 정보를 확인하기 위해 인증 서버로 HTTP 요청을 보낼 수 있습니다.
이 동작은 중간에 가로채기도 힘듭니다.
이것보다는 만들기 쉽고 활용하기도 쉬운 목 객체를 활용하는 방법이 훨씬 쉽습니다.

아래 코드는 `WelcomeComponent`를 테스트할 때 꼭 필요한 내용만 구현한 `UserService` 목 객체 코드입니다:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="user-service-stub"></code-example>


<a id="get-injected-services"></a>

<!--
#### Get injected services
-->
#### 의존성으로 주입한 서비스 참조하기

<!--
The tests need access to the stub `UserService` injected into the `WelcomeComponent`.

Angular has a hierarchical injection system.
There can be injectors at multiple levels, from the root injector created by the `TestBed` down through the component tree.

The safest way to get the injected service, the way that ***always works***,
is to **get it from the injector of the *component-under-test***.
The component injector is a property of the fixture's `DebugElement`.

<code-example header="WelcomeComponent's injector" path="testing/src/app/welcome/welcome.component.spec.ts" region="injected-service"></code-example>
-->
테스트 코드를 작성하다보면 `WelcomeComponent`에 주입된 (\목\) `UserService`를 참조해야 하는 경우가 있습니다.

Angular는 의존성 주입 시스템을 계층으로 구성합니다.
그래서 최상위 인젝터\(injector\)부터 `TestBed` 안에 있는 테스트 대상 컴포넌트까지 존재하는 트리 여러 계층에 인젝터가 존재할 수 있습니다.

의존성으로 주입된 서비스 객체를 참조하는 방법 중 가장 안전하고, ***언제나 동작하는*** 방법은 테스트하는 컴포넌트 안에 있는 인젝터를 사용하는 방법입니다.
컴포넌트 인젝터는 픽스쳐의 `DebugElement`로 참조할 수 있습니다.

<code-example header="WelcomeComponent's injector" path="testing/src/app/welcome/welcome.component.spec.ts" region="injected-service"></code-example>


<a id="testbed-inject"></a>

#### `TestBed.inject()`

<!--
You *might* also be able to get the service from the root injector using `TestBed.inject()`.
This is easier to remember and less verbose.
But it only works when Angular injects the component with the service instance in the test's root injector.

In this test suite, the *only* provider of `UserService` is the root testing module, so it is safe to call `TestBed.inject()` as follows:

<code-example header="TestBed injector" path="testing/src/app/welcome/welcome.component.spec.ts" region="inject-from-testbed" ></code-example>

<div class="alert is-helpful">

For a use case in which `TestBed.inject()` does not work, see the [*Override component providers*](#component-override) section that explains when and why you must get the service from the component's injector instead.

</div>
-->
의존성으로 주입된 서비스의 인스턴스는 최상위 인젝터 `TestBed.inject()`를 사용해서 참조할 수도 있습니다.
이 방법은 쉽고 간단하며 번거롭지도 않습니다.
하지만 이 방법은 테스트 모듈의 인젝터에 등록된 서비스 인스턴스를 컴포넌트에 주입했을 때만 동작합니다.

이 문서에서 다루는 테스트 코드는 테스트 모듈 계층에 `UserService`를 직접 등록하기 때문에 `TestBed.inject()`를 사용할 수 있습니다:

<code-example header="TestBed injector" path="testing/src/app/welcome/welcome.component.spec.ts" region="inject-from-testbed" ></code-example>

<div class="alert is-helpful">

컴포넌트 인젝터에 서비스 프로바이더가 등록되면 `TestBed.inject()`로 인스턴스를 참조하지 못할 수 있습니다.
자세한 내용은 [컴포넌트 프로바이더 오버라이드하기](#component-override) 섹션을 참고하세요.

</div>


<a id="welcome-spec-setup"></a>

<!--
#### Final setup and tests
-->
#### 환경설정 마무리, 테스트

<!--
Here's the complete `beforeEach()`, using `TestBed.inject()`:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="setup"></code-example>

And here are some tests:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="tests"></code-example>

The first is a sanity test; it confirms that the stubbed `UserService` is called and working.

<div class="alert is-helpful">

The second parameter to the Jasmine matcher \(for example, `'expected name'`\) is an optional failure label.
If the expectation fails, Jasmine appends this label to the expectation failure message.
In a spec with multiple expectations, it can help clarify what went wrong and which expectation failed.

</div>

The remaining tests confirm the logic of the component when the service returns different values.
The second test validates the effect of changing the user name.
The third test checks that the component displays the proper message when there is no logged-in user.
-->
`TestBed.inject()`를 활용해서 작성한 `beforeEach()` 코드는 이렇습니다:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="setup"></code-example>

그리고 테스트 코드는 이렇습니다:

<code-example header="app/welcome/welcome.component.spec.ts" path="testing/src/app/welcome/welcome.component.spec.ts" region="tests"></code-example>

첫 번째 테스트 코드는 테스트 코드 자체가 잘 동작하는지 확인하는 테스트 코드입니다.
이 테스트 코드는 `UserService` 목 객체가 제대로 동작하는지 검사합니다.

<div class="alert is-helpful">

Jasmine 검증식\(matcher\)에 두 번째로 전달하는 인자\(`'expected name'`\)는 생략할 수 있으며, 이 인자를 지정하면 해당 검증식이 실패했을 때 인자로 지정한 문구가 표시됩니다.
테스트 코드에 검증식이 여러개 사용되며 이중에 어떤 것이 실패했는지 빠르게 확인하려면 이 인자를 활용하는 것이 좋습니다.

</div>

두 번째 테스트 코드와 세 번째 테스트 코드는 컴포넌트가 서비스와 제대로 상호작용하는지 확인하는 코드입니다.
두 번째 테스트 코드는 사용자의 이름이 변경된 것을 확인하는 코드입니다.
그리고 세 번째 코드는 사용자가 로그인하지 않았을 때 적절한 메시지를 화면에 표시하는지 확인하는 코드입니다.


<a id="component-with-async-service"></a>

<!--
## Component with async service
-->
## 비동기 서비스를 주입받는 컴포넌트

<!--
In this sample, the `AboutComponent` template hosts a `TwainComponent`.
The `TwainComponent` displays Mark Twain quotes.

<code-example header="app/twain/twain.component.ts (template)" path="testing/src/app/twain/twain.component.ts" region="template" ></code-example>

<div class="alert is-helpful">

**NOTE**: <br />
The value of the component's `quote` property passes through an `AsyncPipe`.
That means the property returns either a `Promise` or an `Observable`.

</div>

In this example, the `TwainComponent.getQuote()` method tells you that the `quote` property returns an `Observable`.

<code-example header="app/twain/twain.component.ts (getQuote)" path="testing/src/app/twain/twain.component.ts" region="get-quote"></code-example>

The `TwainComponent` gets quotes from an injected `TwainService`.
The component starts the returned `Observable` with a placeholder value \(`'...'`\), before the service can return its first quote.

The `catchError` intercepts service errors, prepares an error message, and returns the placeholder value on the success channel.
It must wait a tick to set the `errorMessage` in order to avoid updating that message twice in the same change detection cycle.

These are all features you'll want to test.
-->
이번에는 `AboutComponent` 템플릿에 `TwainComponent`가 존재하는 예제에 대해 알아봅시다.
`TwainComponent`는 마크 트웨인(Mark Twain)의 명언을 화면에 표시하는 컴포넌트입니다.

<code-example header="app/twain/twain.component.ts (템플릿)" path="testing/src/app/twain/twain.component.ts" region="template" ></code-example>

<div class="alert is-helpful">

**참고**: <br />
컴포넌트의 `quote` 프로퍼티는 `AsyncPipe`를 거쳐 화면에 표시됩니다.
이 말은 프로퍼티 자체가 반환하는 타입은 `Promise`나 `Observable`이라는 뜻입니다.

</div>

그리고 `TwainComponent.getQuote()` 메서드도 `quote`와 마찬가지로 `Observable` 타입을 반환합니다.

<code-example header="app/twain/twain.component.ts (getQuote())" path="testing/src/app/twain/twain.component.ts" region="get-quote"></code-example>

`TwainComponent`는 `TwainService`를 의존성으로 주입받습니다.
이 컴포넌트는 인스턴스가 생성된 후에 `Observable`을 구독하며 이후에 서비스에서 받아온 명언을 `'...'`라고 표시된 부분에 표시합니다.

`catchError`는 서비스에서 발생한 에러를 가로채며 에러 메시지를 표시하거나 템플릿에 표시되는 문구를 초기값으로 되돌립니다.
그리고 같은 변화 감지 싸이클에서 메시지가 두 번 변경되는 것을 방지하기 위해 `errorMessage`가 제대로 할당되기까지 실행 싸이클을 한 번 기다려야 합니다.

이런 테스트 코드를 작성해 봅시다.


<!--
#### Testing with a spy
-->
#### 스파이 활용하기

<!--
When testing a component, only the service's public API should matter.
In general, tests themselves should not make calls to remote servers.
They should emulate such calls.
The setup in this `app/twain/twain.component.spec.ts` shows one way to do that:

<code-example header="app/twain/twain.component.spec.ts (setup)" path="testing/src/app/twain/twain.component.spec.ts" region="setup"></code-example>

<a id="service-spy"></a>

Focus on the spy.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="spy"></code-example>

The spy is designed such that any call to `getQuote` receives an observable with a test quote.
Unlike the real `getQuote()` method, this spy bypasses the server and returns a synchronous observable whose value is available immediately.

You can write many useful tests with this spy, even though its `Observable` is synchronous.
-->
컴포넌트를 테스트할 때는 이 컴포넌트에 주입되는 서비스 클래스의 public API만 신경쓰면 됩니다.
그리고 일반적으로 리모트 서버로 보내는 HTTP 요청은 생략하고 다른 로직으로 대체합니다.
그래서 `app/twain/twain.component.spec.ts` 파일의 환경설정 코드는 이렇게 구성되어 있습니다:

<code-example header="app/twain/twain.component.spec.ts (환경설정)" path="testing/src/app/twain/twain.component.spec.ts" region="setup"></code-example>

<a id="service-spy"></a>

스파이 코드를 선언한 부분을 봅시다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="spy"></code-example>

이 스파이는 테스트 동작에 사용되는 `getQuote` 옵저버블을 대신합니다.
이 객체는 실제 `getQuote()` 메서드가 서버로 요청을 보내고 받는 동작을 실제로 수행하지 않고 동기 방식으로 옵저버블로 데이터를 전달합니다.

스파이를 활용하면 테스트 코드를 간단하게 작성할 수 있습니다.
게다가 이 스파이는 동기 방식으로 동작하기 때문에 비동기 옵저버블을 다루는 것보다 편합니다.


<a id="sync-tests"></a>

<!--
#### Synchronous tests
-->
#### 동기 테스트

<!--
A key advantage of a synchronous `Observable` is that you can often turn asynchronous processes into synchronous tests.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="sync-test"></code-example>

Because the spy result returns synchronously, the `getQuote()` method updates the message on screen immediately *after* the first change detection cycle during which Angular calls `ngOnInit`.

You're not so lucky when testing the error path.
Although the service spy will return an error synchronously, the component method calls `setTimeout()`.
The test must wait at least one full turn of the JavaScript engine before the value becomes available.
The test must become *asynchronous*.
-->
`Observable`을 동기 방식으로 사용했을 때 가장 좋은 점은 비동기 동작을 동기 방식으로 변경할 수 있다는 것입니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="sync-test"></code-example>

이 스파이는 데이터를 즉시 반환하는 옵저버블이기 때문에 `getQuote()` 메서드로 받아오는 메시지도 Angular가 `ngOnInit` 라이프 싸이클 메서드를 실행하자마자 즉시 화면에 표시됩니다.

하지만 에러가 발생했을 때는 상황이 조금 다릅니다.
스파이 서비스가 에러를 에러를 동기 방식으로 반환하기는 하지만 컴포넌트 메서드가 `setTimeout()`을 실행하기 때문입니다.
그래서 이 테스트 코드에서 새로 할당된 값을 확인하려면 JavaScript 엔진 실행 싸이클을 한 번 기다려야 합니다.
결국 테스트가 *비동기로* 동작해야 합니다.


<a id="fake-async"></a>

<!--
#### Async test with `fakeAsync()`
-->
#### `fakeAsync()` 로 비동기 테스트하기

<!--
To use `fakeAsync()` functionality, you must import `zone.js/testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

The following test confirms the expected behavior when the service returns an `ErrorObservable`.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="error-test"></code-example>

<div class="alert is-helpful">

**NOTE**: <br />
The `it()` function receives an argument of the following form.

</div>

<code-example format="javascript" language="javascript">

fakeAsync(() =&gt; { /* test body */ })

</code-example>

The `fakeAsync()` function enables a linear coding style by running the test body in a special `fakeAsync test zone`.
The test body appears to be synchronous.
There is no nested syntax \(like a `Promise.then()`\) to disrupt the flow of control.

<div class="alert is-helpful">

Limitation: The `fakeAsync()` function won't work if the test body makes an `XMLHttpRequest` \(XHR\) call.
XHR calls within a test are rare, but if you need to call XHR, see the [`waitForAsync()`](#waitForAsync) section.

</div>
-->
`fakeAsync()` 기능을 사용하려면 테스트 환경설정 파일에서 `zone.js/testing` 라이브러리를 로드해야 합니다.
그리고 Angular CLI로 프로젝트를 생성했다면 `src/test.ts` 파일에 `zone-testing`이 이미 추가되어 있습니다.

아래 코드는 서비스가 `ErrorObservable`을 반환했을 때 에러를 처리하는 테스트 코드입니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="error-test"></code-example>

<div class="alert is-helpful">

**참고**: <br />
이 코드에서 `it()` 함수가 받는 인자의 형태는 이렇습니다.

</div>

<code-example format="javascript" language="javascript">

fakeAsync(() =&gt; { /* 테스트 코드 */ })

</code-example>

`fakeAsync()` 함수를 활용하면 테스트 코드가 `fakeAsync 테스트 존` 안에서 실행되기 때문에 코드를 동기 방식으로 작성할 수 있습니다.
그리고 테스트 코드도 동기 방식으로 실행되는 것처럼 보입니다.
코드 실행 흐름을 헷갈리게 만드는 `Promise.then()`와 같은 문법은 사용하지 않아도 됩니다.

<div class="alert is-helpful">

한계: `fakeAsync()` 함수 안에서 `XMLHttpRequest` (XHR)를 활용하는 코드는 제대로 동작하지 않습니다.
테스트 코드에서 XHR 요청을 실제로 보내는 경우는 거의 없습니다.
실제로 요청을 보내야 한다면 [`waitForAsync()`](#waitForAsync) 섹션을 참고하세요.

</div>


<a id="tick"></a>

<!--
#### The `tick()` function
-->
#### `tick()` 함수

<!--
You do have to call [tick()](api/core/testing/tick) to advance the virtual clock.

Calling [tick()](api/core/testing/tick) simulates the passage of time until all pending asynchronous activities finish.
In this case, it waits for the error handler's `setTimeout()`.

The [tick()](api/core/testing/tick) function accepts `millis` and `tickOptions` as parameters. The `millis` parameter specifies how much the virtual clock advances and defaults to `0` if not provided.
For example, if you have a `setTimeout(fn, 100)` in a `fakeAsync()` test, you need to use `tick(100)` to trigger the fn callback.
The optional `tickOptions` parameter has a property named `processNewMacroTasksSynchronously`. The `processNewMacroTasksSynchronously` property represents whether to invoke new generated macro tasks when ticking and defaults to `true`.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick"></code-example>

The [tick()](api/core/testing/tick) function is one of the Angular testing utilities that you import with `TestBed`.
It's a companion to `fakeAsync()` and you can only call it within a `fakeAsync()` body.
-->
[tick()](api/core/testing/tick) 함수는 가상 시계를 앞으로 감는 용도로 사용합니다.

그래서 [tick()](api/core/testing/tick) 함수를 실행하면 다음 비동기 작업이 있는 시점까지 시간이 지난 것으로 간주할 수 있습니다.
위 섹션에서 다룬 코드에서는 에러가 처리되는 `setTimeout()` 시점으로 이동합니다.

[tick()](api/core/testing/tick) 함수는 밀리초 단위 숫자\(`millis`\)나 `tickOptions` 객체를 인자로 받아서 원하는 시간 만큼 이동할 수 있으며, 인자 없이 사용하면 0이 사용됩니다.
그래서 아래 코드처럼 `fakeAsync()` 안에서 `setTimeout(fn, 100)`을 사용한 후에 `tick()`을 실행하면 타이머 콜백 함수를 실행할 수 있습니다.
`tickOptions`는 옵션 객체이며 `processNewMacroTasksSynchronously` 프로퍼티를 지정할 수 있습니다.
이 옵션의 기본값은 `true`이고, `true`를 사용하면 다음 매크로 태스크를 즉시 실행합니다.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick"></code-example>

[tick()](api/core/testing/tick) 함수는 `TestBed` 라이브러리가 제공하는 함수 중 하나이며 `fakeAsync()` 안에서만 사용할 수 있습니다.


#### tickOptions

<!--
In this example, you have a new macro task, the nested `setTimeout` function. By default, when the `tick` is setTimeout, `outside` and `nested` will both be triggered.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick-new-macro-task-sync"></code-example>

In some case, you don't want to trigger the new macro task when ticking. You can use `tick(millis, {processNewMacroTasksSynchronously: false})` to not invoke a new macro task.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick-new-macro-task-async"></code-example>
-->
이 예제에서 `setTimeout` 함수 안에는 매크로 태스크가 하나 있습니다.
기본적으로는 `outside`와 `nested`가 동시에 실행됩니다.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick-new-macro-task-sync"></code-example>

상황에 따라 원하는 타이머만 실행하려면 `tick(밀리초, {processNewMacroTasksSynchronously: false})`라고 실행하면 됩니다.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-tick-new-macro-task-async"></code-example>


<!--
#### Comparing dates inside fakeAsync()
-->
#### `fakeAsync()` 안에서 시간 확인하기

<!--
`fakeAsync()` simulates passage of time, which lets you calculate the difference between dates inside `fakeAsync()`.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-date"></code-example>
-->
`fakeAsync()`는 시간이 경과하는 것을 시뮬레이션하는 함수입니다.
그래서 아래 코드처럼 구현하면 `fakeAsync()` 안에서 얼마나 시간이 흘렀는지 확인할 수 있습니다.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-date"></code-example>


<!--
#### jasmine.clock with fakeAsync()
-->
#### jasmine.clock과 함께 사용하기

<!--
Jasmine also provides a `clock` feature to mock dates.
Angular automatically runs tests that are run after `jasmine.clock().install()` is called inside a `fakeAsync()` method until `jasmine.clock().uninstall()` is called.
`fakeAsync()` is not needed and throws an error if nested.

By default, this feature is disabled.
To enable it, set a global flag before importing `zone-testing`.

If you use the Angular CLI, configure this flag in `src/test.ts`.

<code-example format="typescript" language="typescript">

(window as any)['&lowbar;&lowbar;zone&lowbar;symbol__fakeAsyncPatchLock'] = true;
import 'zone.js/testing';

</code-example>

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-clock"></code-example>
-->
Jasmine도 시간을 조작하는 `clock` 기능을 제공합니다.
Angular는 `fakeAsync()` 함수 안에서 `jasmine.clock().install()`이 실행되면 `jasmine.clock().uninstall()`이 실행되기 전까지 테스트 코드의 시간을 자동으로 진행합니다.
`fakeAsync()`와 비슷한 동작을 하기 때문에 `fakeAsync()`를 명시적으로 실행할 필요는 없으며, `fakeAsync()`가 필요한 상황이라면 에러가 발생합니다.

이 기능은 기본적으로 비활성화되어 있습니다.
이 기능을 활성화하려면 `zone-testing`을 로드하기 전에 전역 플래그 값을 지정해야 합니다.

Angular CLI로 생성한 프로젝트라면 `src/test.ts` 파일에 이렇게 지정하면 됩니다.

<code-example format="typescript" language="typescript">

(window as any)['&lowbar;&lowbar;zone&lowbar;symbol__fakeAsyncPatchLock'] = true;
import 'zone.js/testing';

</code-example>

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-clock"></code-example>


<!--
#### Using the RxJS scheduler inside fakeAsync()
-->
#### `fakeAsync()` 안에서 RxJS 스케쥴러 사용하기

<!--
You can also use RxJS scheduler in `fakeAsync()` just like using `setTimeout()` or `setInterval()`, but you need to import `zone.js/plugins/zone-patch-rxjs-fake-async` to patch RxJS scheduler.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-rxjs"></code-example>
-->
RxJS 스케쥴러는 `fakeAsync()` 안에서 `setTimeout()`이나 `setInterval()`과 비슷하게 사용할 수 있지만, RxJS 스케쥴러를 사용하려면 `zone.js/plugins/zone-patch-rxjs-fake-async` 라이브러리를 추가로 로드해야 합니다.

<code-example path="testing/src/app/demo/async-helper.spec.ts" region="fake-async-test-rxjs"></code-example>


<!--
#### Support more macroTasks
-->
#### 매크로 태스크 지원하기

<!--
By default, `fakeAsync()` supports the following macro tasks.

*   `setTimeout`
*   `setInterval`
*   `requestAnimationFrame`
*   `webkitRequestAnimationFrame`
*   `mozRequestAnimationFrame`

If you run other macro tasks such as `HTMLCanvasElement.toBlob()`, an *"Unknown macroTask scheduled in fake async test"* error is thrown.

<code-tabs>
    <code-pane header="src/app/shared/canvas.component.spec.ts (failing)" path="testing/src/app/shared/canvas.component.spec.ts" region="without-toBlob-macrotask"></code-pane>
    <code-pane header="src/app/shared/canvas.component.ts" path="testing/src/app/shared/canvas.component.ts" region="main"></code-pane>
</code-tabs>

If you want to support such a case, you need to define the macro task you want to support in `beforeEach()`.
For example:

<code-example header="src/app/shared/canvas.component.spec.ts (excerpt)" path="testing/src/app/shared/canvas.component.spec.ts" region="enable-toBlob-macrotask"></code-example>

<div class="alert is-helpful">

**NOTE**: <br />
In order to make the `<canvas>` element Zone.js-aware in your app, you need to import the `zone-patch-canvas` patch \(either in `polyfills.ts` or in the specific file that uses `<canvas>`\):

</div>

<code-example header="src/polyfills.ts or src/app/shared/canvas.component.ts" path="testing/src/app/shared/canvas.component.ts" region="import-canvas-patch"></code-example>
-->
`fakeAsync()` 안에서는 이런 매크로 태스크를 지원합니다.

*   `setTimeout`
*   `setInterval`
*   `requestAnimationFrame`
*   `webkitRequestAnimationFrame`
*   `mozRequestAnimationFrame`

하지만 `HTMLCanvasElement.toBlob()`를 실행하면 *"Unknown macroTask scheduled in fake async test"* 에러가 발생합니다.

<code-tabs>
    <code-pane header="src/app/shared/canvas.component.spec.ts (테스트 실패)" path="testing/src/app/shared/canvas.component.spec.ts" region="without-toBlob-macrotask"></code-pane>
    <code-pane header="src/app/shared/canvas.component.ts" path="testing/src/app/shared/canvas.component.ts" region="main"></code-pane>
</code-tabs>

이런 코드를 사용하려면 `beforeEach()` 함수에 매크로 태스크를 직접 정의해야 합니다:

<code-example header="src/app/shared/canvas.component.spec.ts (일부)" path="testing/src/app/shared/canvas.component.spec.ts" region="enable-toBlob-macrotask"></code-example>

<div class="alert is-helpful">

**참고**: <br />
`<canvas>` 엘리먼트와 같이 Zone.js와 관련된 엘리먼트를 테스트하려면 `zone-patch-canvas` 패치를 추가해야 할 수도 있습니다.
이 패치는 적용하려는 곳이 여러 곳이면 `polyfills.ts` 파일에, 파일 하나에만 적용하려면 `<canvas>`가 사용된 파일에 적용하면 됩니다:

</div>

<code-example header="src/polyfills.ts or src/app/shared/canvas.component.ts" path="testing/src/app/shared/canvas.component.ts" region="import-canvas-patch"></code-example>


<!--
#### Async observables
-->
#### 비동기 옵저버블

<!--
You might be satisfied with the test coverage of these tests.

However, you might be troubled by the fact that the real service doesn't quite behave this way.
The real service sends requests to a remote server.
A server takes time to respond and the response certainly won't be available immediately as in the previous two tests.

Your tests will reflect the real world more faithfully if you return an *asynchronous* observable from the `getQuote()` spy like this.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="async-setup"></code-example>
-->
테스트 코드에 대한 테스트 커버리지 정보가 함께 제공되면 더 나을 수 있습니다.

하지만 실제 서비스 객체를 사용하면서 이런 기능을 구현하기는 쉽지 않습니다.
실세 서비스 객체는 리모트 서버로 HTTP 요청을 보낼 수도 있기 때문입니다.
서버로 HTTP 요청을 보내면 응답을 받기까지 시간이 필요하기 때문에 이전에 살펴봤던 두 테스트 코드처럼 즉시 완료할 수 없습니다.

그렇다면 *비동기로* 동작하는 옵저버블을 흉내내기 위해 `getQuote()` 스파이를 만들어서 사용하면 됩니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="async-setup"></code-example>


<!--
#### Async observable helpers
-->
#### 비동기 옵저버블 헬퍼

<!--
The async observable was produced by an `asyncData` helper.
The `asyncData` helper is a utility function that you'll have to write yourself, or copy this one from the sample code.

<code-example header="testing/async-observable-helpers.ts" path="testing/src/testing/async-observable-helpers.ts" region="async-data"></code-example>

This helper's observable emits the `data` value in the next turn of the JavaScript engine.

The [RxJS `defer()` operator](http://reactivex.io/documentation/operators/defer.html) returns an observable.
It takes a factory function that returns either a promise or an observable.
When something subscribes to *defer*'s observable, it adds the subscriber to a new observable created with that factory.

The `defer()` operator transforms the `Promise.resolve()` into a new observable that, like `HttpClient`, emits once and completes.
Subscribers are unsubscribed after they receive the data value.

There's a similar helper for producing an async error.

<code-example path="testing/src/testing/async-observable-helpers.ts" region="async-error"></code-example>
-->
`asyncData` 헬퍼 함수는 비동기 옵저버블을 만들어서 반환합니다.
그렇다면 이 헬퍼 함수는 개발자가 원하는 대로 만들어서 사용해도 되고 아래 코드를 기반으로 활용해도 됩니다.

<code-example header="testing/async-observable-helpers.ts" path="testing/src/testing/async-observable-helpers.ts" region="async-data"></code-example>

이 헬퍼 함수는 JavaScript 엔진의 다음 실행 싸이클에 `data` 값을 옵저버블로 보냅니다.

[RxJS `defer()` 연산자](http://reactivex.io/documentation/operators/defer.html)는 팩토리 함수를 인자로 받아서 프라미스나 옵저버블을 반환합니다.
그리고 누군가 이 옵저버블을 반환하면 새로운 옵저버블이 생성됩니다.

`defer()` 연산자는 `Promise.resolve()`를 옵저버블로 변환하며 `HttpClient`와 비슷하게 데이터를 하나 전달하고 종료됩니다.
데이터를 받은 구독자들도 모두 구독이 해지됩니다.

비동기 에러를 발생시키는 헬퍼는 이렇게 구현합니다.

<code-example path="testing/src/testing/async-observable-helpers.ts" region="async-error"></code-example>


<!--
#### More async tests
-->
#### 비동기 더 활용하기

<!--
Now that the `getQuote()` spy is returning async observables, most of your tests will have to be async as well.

Here's a `fakeAsync()` test that demonstrates the data flow you'd expect in the real world.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="fake-async-test"></code-example>

Notice that the quote element displays the placeholder value \(`'...'`\) after `ngOnInit()`.
The first quote hasn't arrived yet.

To flush the first quote from the observable, you call [tick()](api/core/testing/tick).
Then call `detectChanges()` to tell Angular to update the screen.

Then you can assert that the quote element displays the expected text.
-->
이제 `getQuote()` 스파이는 비동기 옵저버블을 반환하기 때문에, 테스트 코드도 비동기로 실행되어야 합니다.

그래서 실제 운영 환경에서 동작하는 흐름과 동일하게 실행하기 위해 `fakeAsync()`를 사용해야 합니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="fake-async-test"></code-example>

`ngOnInit()`이 실행된 후에는 명언이 표시되는 엘리먼트가 `'...'`로 표시됩니다.
아직 첫 번째 응답은 받지 못했습니다.

이제 옵저버블로 전달되는 첫번째 명언을 표시하려면 [tick()](api/core/testing/tick)을 실행하면 됩니다.
그리고 `detectChanges()`를 실행하면 Angular가 화면을 갱신합니다.

이제 화면에 표시되는 엘리먼트가 원하는 문구가 맞는지 확인하면 됩니다.


<a id="waitForAsync"></a>

<!--
#### Async test with `waitForAsync()`
-->
#### `waitForAsync()` 로 비동기 테스트하기

<!--
To use `waitForAsync()` functionality, you must import `zone.js/testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

Here's the previous `fakeAsync()` test, re-written with the `waitForAsync()` utility.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="waitForAsync-test"></code-example>

The `waitForAsync()` utility hides some asynchronous boilerplate by arranging for the tester's code to run in a special *async test zone*.
You don't need to pass Jasmine's `done()` into the test and call `done()` because it is `undefined` in promise or observable callbacks.

But the test's asynchronous nature is revealed by the call to `fixture.whenStable()`, which breaks the linear flow of control.

When using an `intervalTimer()` such as `setInterval()` in `waitForAsync()`, remember to cancel the timer with `clearInterval()` after the test, otherwise the `waitForAsync()` never ends.
-->
`waitForAsync()` 함수를 사용하려면 테스트 환경설정 파일에 `zone.js/testing`을 로드해야 합니다.
Angular CLI로 프로젝트를 생성했다면 `src/test.ts` 파일에서 이미 `zone-testing`을 로드하고 있습니다.

이전에 작성했던 `fakeAsync()` 테스트 코드를 `waitForAsync()`를 활용하는 방식으로 재작성해보면 이렇습니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="waitForAsync-test"></code-example>

`waitForAsync()` 유틸리티는 비동기 로직들을 자동으로 재구성해서 _비동기 테스트 존_ 안에서 실행합니다.
그래서 Jasmine이 제공하는 `done()` 함수를 테스트 함수에 전달할 필요가 없으며 명시적으로 `done()`을 실행할 필요도 없습니다.

비동기로 실행되는 코드는 `fixture.whenStable()`을 활용하면 동기 방식으로 구성할 수 있습니다.

`waitForAsync()` 안에서 `setInterval()`과 같은 타이머를 사용하면 테스트가 종료된 후에 `clearInterval()`로 타이머를 종료해야 합니다.
이 타이머를 종료하지 않으면 `waitForAsync()`는 종료되지 않습니다.


<a id="when-stable"></a>

#### `whenStable`

<!--
The test must wait for the `getQuote()` observable to emit the next quote.
Instead of calling [tick()](api/core/testing/tick), it calls `fixture.whenStable()`.

The `fixture.whenStable()` returns a promise that resolves when the JavaScript engine's task queue becomes empty.
In this example, the task queue becomes empty when the observable emits the first quote.

The test resumes within the promise callback, which calls `detectChanges()` to update the quote element with the expected text.
-->
`getQuote()` 테스트 코드는 옵저버블로 데이터가 전달될 때까지 계속 기다립니다.
이 때 [tick()](api/core/testing/tick)를 실행해도 되지만 `fixture.whenStable()`를 활용해도 됩니다.

`fixture.whenStable()`은 JavaScript 엔진의 태스크 큐가 비는 시점에 프라미스가 완료된 상태를 반환합니다.
이 예제에서 태스크 큐는 옵저버블로 첫번째 데이터가 전달된 후에 비게 됩니다.

그러면 프라미스 콜백으로 지정된 테스트 코드가 계속 실행되면서 `detectChanges()`가 실행되고 화면에 보이는 엘리먼트의 문구를 갱신합니다.


<a id="jasmine-done"></a>

#### Jasmine `done()`

<!--
While the `waitForAsync()` and `fakeAsync()` functions greatly simplify Angular asynchronous testing, you can still fall back to the traditional technique and pass `it` a function that takes a [`done` callback](https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support).

You can't call `done()` in `waitForAsync()` or `fakeAsync()` functions, because the `done parameter` is `undefined`.

Now you are responsible for chaining promises, handling errors, and calling `done()` at the appropriate moments.

Writing test functions with `done()`, is more cumbersome than `waitForAsync()`and `fakeAsync()`, but it is occasionally necessary when code involves the `intervalTimer()` like `setInterval`.

Here are two more versions of the previous test, written with `done()`.
The first one subscribes to the `Observable` exposed to the template by the component's `quote` property.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="quote-done-test"></code-example>

The RxJS `last()` operator emits the observable's last value before completing, which will be the test quote.
The `subscribe` callback calls `detectChanges()` to update the quote element with the test quote, in the same manner as the earlier tests.

In some tests, you're more interested in how an injected service method was called and what values it returned, than what appears on screen.

A service spy, such as the `qetQuote()` spy of the fake `TwainService`, can give you that information and make assertions about the state of the view.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="spy-done-test"></code-example>
-->
`waitForAsync()`와 `fakeAsync()`가 Angular에서 진행되는 비동기 테스트 코드를 아주 단순하게 만들어주기는 하지만, `it` 함수에 [`done` 콜백](https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support)을 전달하는 기존 방식도 활용할 수 있습니다.

하지만 `waitForAsync()`나 `fakeAsync()` 함수 안에서 `done()` 함수를 실행할 수는 없습니다.
왜냐라면 `done()` 함수의 인자는 항상 `undefined`이기 때문입니다.

Jasmine `done()` 함수를 직접 활용하는 경우에는 프라미스나 에러를 직접 처리해야 하며 `done()`도 적절한 시점에 실행해야 합니다.

그래서 `done()`을 직접 활용하면 `waitForAsync()`나 `fakeAsync()`를 활용하는 것보다 신경쓸 내용이 많지만, `setInterval`같은 인터벌 함수를 사용하는 경우에는 이 방식을 꼭 사용해야 하는 경우도 있습니다.

이전에 작성한 테스트 코드를 `done()`을 활용하는 방식으로 작성해보면 이렇습니다.
첫번째로 살펴볼 코드는 컴포넌트의 `quote` 옵저버블 프로퍼티를 구독해서 테스트하는 코드입니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="quote-done-test"></code-example>

RxJS `last()` 연산자는 옵저버블이 종료되기 전까지 전달된 데이터 중 마지막 데이터를 스트림으로 보냅니다.
그래서 `subscribe()` 콜백에서는 `detectChanges()`를 실행해서 엘리먼트의 문구를 마지막 데이터로 갱신하며, 나머지 코드는 위 코드와 비슷합니다.

경우에 따라서는 의존성으로 주입된 서비스의 메서드를 어떻게 실행하고 어떤 값을 반환하며, 화면에 어떻게 반영되는지가 더 중요할 수 있습니다.

가짜 `TwainService`에 `getQuote()` 스파이를 만드는 방식을 활용하면 원하는 시점에 화면이 어떤 상태가 되는지 원하는 대로 검증할 수 있습니다.

<code-example path="testing/src/app/twain/twain.component.spec.ts" region="spy-done-test"></code-example>


<a id="marble-testing"></a>

<!--
## Component marble tests
-->
## 컴포넌트 마블 테스트

<!--
The previous `TwainComponent` tests simulated an asynchronous observable response from the `TwainService` with the `asyncData` and `asyncError` utilities.

These are short, simple functions that you can write yourself.
Unfortunately, they're too simple for many common scenarios.
An observable often emits multiple times, perhaps after a significant delay.
A component might coordinate multiple observables with overlapping sequences of values and errors.

**RxJS marble testing** is a great way to test observable scenarios, both simple and complex.
You've likely seen the [marble diagrams](https://rxmarbles.com) that illustrate how observables work.
Marble testing uses a similar marble language to specify the observable streams and expectations in your tests.

The following examples revisit two of the `TwainComponent` tests with marble testing.

Start by installing the `jasmine-marbles` npm package.
Then import the symbols you need.

<code-example header="app/twain/twain.component.marbles.spec.ts (import marbles)" path="testing/src/app/twain/twain.component.marbles.spec.ts" region="import-marbles"></code-example>

Here's the complete test for getting a quote:

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="get-quote-test"></code-example>

Notice that the Jasmine test is synchronous.
There's no `fakeAsync()`.
Marble testing uses a test scheduler to simulate the passage of time in a synchronous test.

The beauty of marble testing is in the visual definition of the observable streams.
This test defines a [*cold* observable](#cold-observable) that waits three [frames](#marble-frame) \(`---`\), emits a value \(`x`\), and completes \(`|`\).
In the second argument you map the value marker \(`x`\) to the emitted value \(`testQuote`\).

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="test-quote-marbles"></code-example>

The marble library constructs the corresponding observable, which the test sets as the `getQuote` spy's return value.

When you're ready to activate the marble observables, you tell the `TestScheduler` to *flush* its queue of prepared tasks like this.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="test-scheduler-flush"></code-example>

This step serves a purpose analogous to [tick()](api/core/testing/tick) and `whenStable()` in the earlier `fakeAsync()` and `waitForAsync()` examples.
The balance of the test is the same as those examples.
-->
이전 섹션에서 살펴본 `TwainComponent` 테스트 코드는 `TwainService`에서 전달되는 비동기 옵저버블을 처리하기 위해 `asyncData`와 `asyncError` 유틸 함수를 사용했습니다.

이정도 함수는 짧고 간단하기 때문에 직접 만들어서 쓰기에 문제될 정도는 아닙니다.
하지만 보통은 이보다 복잡한 시나리오로 동작합니다.
옵저버블로 데이터가 여러번 전달될 수 있으며 데이터가 전달되는 사이에 시간 간격이 있는 경우도 있습니다.
그리고 옵저버블 여러 개를 활용하면서 전달되는 데이터와 에러를 다양하게 활용할 수도 있습니다.

**RxJS 마블(marble) 테스트**를 활용하면 간단한 시나리오는 물론이고 복잡한 시나리오로 동작하는 옵저버블도 테스트할 수 있습니다.
옵저버블이 동작하는 모습을 표현하는 [마블 다이어그램](https://rxmarbles.com/)을 본 적이 있을 것입니다.
마블 테스트는 이와 비슷한 문법을 사용해서 옵저버블이 정해진 대로 동작하는지 검사하는 방식입니다.

이번 섹션에서는 `TwainComponent`에 마블 테스트를 적용해 봅시다.

먼저, `jasmine-marbles` npm 패키지를 설치하고 마블 테스트에 필요한 심볼을 로드합니다.

<code-example header="app/twain/twain.component.marbles.spec.ts (심볼 로드하기)" path="testing/src/app/twain/twain.component.marbles.spec.ts" region="import-marbles"></code-example>

테스트 코드를 마블 테스트 방식으로 작성하면 이렇습니다:

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="get-quote-test"></code-example>

Jasmine 테스트 코드는 동기 방식으로 동작한다는 것을 잊지 마세요.
그래서 `fakeAsync()`가 사용되지 않았습니다.
마블 테스트는 시간이 지난 것을 동기 테스트 코드 안에서 시뮬레이션하기 위해 별도 테스트 스케쥴러를 사용합니다.

마블 테스트가 좋은 점은 옵저버블 스트림으로 전달되는 데이터를 시각적으로 표현할 수 있다는 것입니다.
아래 코드는 3 [프레임](#marble-frame) \(`---`\) 동안 기다렸다가 데이터\(`x`\)를 전달하고 종료되는\(`|`\) [_콜드(cold)_ 옵저버블](#cold-observable)을 정의하는 코드입니다.
두 번째 인자는 데이터가 전달되는 시점\(`x`\)에 실제로 전달될 데이터\(`testQuote`\)입니다.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="test-quote-marbles"></code-example>

그리고 마블 라이브러리는 옵저버블 관련 기능을 제공하기 때문에 `getQuote`에 스파이를 연결할 수 있습니다.

마블 옵저버블을 시작할 준비가 되었다면 `TestScheduler.flush()`를 실행해서 큐에 있는 내용을 비우면 됩니다.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="test-scheduler-flush"></code-example>

지금 단계에서는 이전에 사용했던 `fakeAsync()`, `waitForAsync()`와 비슷한 용도로 [tick()](api/core/testing/tick)과 `whenStable()`를 사용했습니다.
다른 부분은 이전에 살펴봤던 코드와 같습니다.


<!--
#### Marble error testing
-->
#### 마블 테스트 : 에러 처리

<!--
Here's the marble testing version of the `getQuote()` error test.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="error-test"></code-example>

It's still an async test, calling `fakeAsync()` and [tick()](api/core/testing/tick), because the component itself calls `setTimeout()` when processing errors.

Look at the marble observable definition.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="error-marbles"></code-example>

This is a *cold* observable that waits three frames and then emits an error, the hash \(`#`\) character indicates the timing of the error that is specified in the third argument.
The second argument is null because the observable never emits a value.
-->
`getQuote()` 에러 테스트 코드를 마블 테스트 방식으로 작성해보면 이렇습니다.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="error-test"></code-example>

이 테스트 코드도 `setTimeout()` 안에서 비동기로 에러가 발생하기 때문에 `fakeAsync()`와 [tick()](api/core/testing/tick)을 사용했습니다.

마블 스타일로 에러 옵저버블을 정의해보면 이렇습니다.

<code-example path="testing/src/app/twain/twain.component.marbles.spec.ts" region="error-marbles"></code-example>

이 옵저버블은 3 프레임을 기다린 후에 에러를 발생시키는 *콜드\(cold\)* 옵저버블입니다.
그리고 세 번째 인자는 에러가 발생하는 시점\(`#`\)에 실제로 전달될 에러 객체입니다.
두 번째 인자는 옵저버블로 전달될 데이터를 지정하지만, 이 예제에서는 데이터를 전달하지 않기 때문에 null을 지정했습니다.


<!--
#### Learn about marble testing
-->
#### 마블 테스트 활용하기

<a id="marble-frame"></a>

<!--
A *marble frame* is a virtual unit of testing time.
Each symbol \(`-`, `x`, `|`, `#`\) marks the passing of one frame.

<a id="cold-observable"></a>

A *cold* observable doesn't produce values until you subscribe to it.
Most of your application observables are cold.
All [*HttpClient*](guide/http) methods return cold observables.

A *hot* observable is already producing values *before* you subscribe to it.
The [`Router.events`](api/router/Router#events) observable, which reports router activity, is a *hot* observable.

RxJS marble testing is a rich subject, beyond the scope of this guide.
Learn about it on the web, starting with the [official documentation](https://rxjs.dev/guide/testing/marble-testing).
-->
*마블 프레임\(marble frame\)* 은 테스트 환경에서 동작하는 가상 시간 단위입니다.
그리고 마블 프레임에서 사용하는 개별 심볼\(`-`, `x`, `|`, `#`\)은 프레임 하나를 차지합니다.

<a id="cold-observable"></a>

*콜드\(cold\)* 옵저버블은 누군가가 옵저버블을 구독하기 전까지는 데이터를 전달하지 않습니다.
그리고 애플리케이션에서 사용하는 옵저버블 대부분은 콜드 옵저버블입니다.
[*HttpClient*](guide/http) 메서드들도 모두 콜드 옵저버블을 반환합니다.

*핫\(hot\)* 옵저버블은 누군가 옵저버블을 구독하지 않아도 데이터를 보냅니다.
라우터의 상태를 옵저버블로 전달하는 [`Router.events`](api/router/Router#events) 프로퍼티가 *핫* 옵저버블입니다.

RxJS 마블 테스트는 이 문서에서 다루는 내용 말고도 수많은 옵저버블 생성자를 지원합니다.
자세한 내용은 [공식 문서](https://rxjs.dev/guide/testing/marble-testing)를 참고하세요.


<a id="component-with-input-output"></a>

<!--
## Component with inputs and outputs
-->
## 입출력 프로퍼티가 있는 컴포넌트

<!--
A component with inputs and outputs typically appears inside the view template of a host component.
The host uses a property binding to set the input property and an event binding to listen to events raised by the output property.

The testing goal is to verify that such bindings work as expected.
The tests should set input values and listen for output events.

The `DashboardHeroComponent` is a tiny example of a component in this role.
It displays an individual hero provided by the `DashboardComponent`.
Clicking that hero tells the `DashboardComponent` that the user has selected the hero.

The `DashboardHeroComponent` is embedded in the `DashboardComponent` template like this:

<code-example header="app/dashboard/dashboard.component.html (excerpt)" path="testing/src/app/dashboard/dashboard.component.html" region="dashboard-hero"></code-example>

The `DashboardHeroComponent` appears in an `*ngFor` repeater, which sets each component's `hero` input property to the looping value and listens for the component's `selected` event.

Here's the component's full definition:

<a id="dashboard-hero-component"></a>

<code-example header="app/dashboard/dashboard-hero.component.ts (component)" path="testing/src/app/dashboard/dashboard-hero.component.ts" region="component"></code-example>

While testing a component this simple has little intrinsic value, it's worth knowing how.
Use one of these approaches:

*   Test it as used by `DashboardComponent`
*   Test it as a stand-alone component
*   Test it as used by a substitute for `DashboardComponent`

A quick look at the `DashboardComponent` constructor discourages the first approach:

<code-example header="app/dashboard/dashboard.component.ts (constructor)" path="testing/src/app/dashboard/dashboard.component.ts" region="ctor"></code-example>

The `DashboardComponent` depends on the Angular router and the `HeroService`.
You'd probably have to replace them both with test doubles, which is a lot of work.
The router seems particularly challenging.

<div class="alert is-helpful">

The [following discussion](#routing-component) covers testing components that require the router.

</div>

The immediate goal is to test the `DashboardHeroComponent`, not the `DashboardComponent`, so, try the second and third options.
-->
컴포넌트에는 입력 프로퍼티와 출력 프로퍼티가 존재하는 경우가 많습니다.
이 컴포넌트는 호스트 엘리먼트에서 바인딩한 데이터로 프로퍼티 값을 설정하며 출력 프로퍼티로 호스트 컴포넌트에 이벤트를 보냅니다.

컴포넌트를 테스트할 때는 이런 입출력 프로퍼티가 정해진 대로 바인딩되었는지 검사하는 것도 중요합니다.
입력값이 제대로 프로퍼티에 할당되었는지, 출력 이벤트는 제대로 감지되는지 확인하는 테스트 코드를 작성하면 됩니다.

이런 내용을 `DashboardHeroComponent`로 확인해 봅시다.
이 컴포넌트는 `DashboardComponent`에서 받은 개별 히어로 데이터를 화면에 표시합니다.
그리고 히어로 이름을 클릭하면 사용자가 선택한 히어로를 `DashboardComponent`로 보냅니다.

`DashboardHeroComponent`는 `DashboardComponent` 템플릿에 이렇게 사용되었습니다:

<code-example header="app/dashboard/dashboard.component.html (일부)" path="testing/src/app/dashboard/dashboard.component.html" region="dashboard-hero"></code-example>

`DashboardHeroComponent`는 `*ngFor`로 반복되면서 개별 컴포넌트마다 `hero`를 입력 프로퍼티로 전달합니다.
그리고 `selected` 이벤트를 감지하는 방식으로 구현되었습니다.

컴포넌트 전체 코드는 이렇게 구현되었습니다:

<a id="dashboard-hero-component"></a>

<code-example header="app/dashboard/dashboard-hero.component.ts (컴포넌트)" path="testing/src/app/dashboard/dashboard-hero.component.ts" region="component"></code-example>

이 컴포넌트는 아주 간단하지만 테스트로 다루기에는 충분합니다.
이런 방식을 사용할 수 있습니다:

*   `DashboardComponent` 위에서 테스트합니다.
*   이 컴포넌트만 단독으로 테스트합니다.
*   `DashboardComponent`를 대체한 상태로 테스트합니다.

첫 번째 방식으로 진행하기 위해 `DashboardComponent`의 생성자를 확인해보면 이렇습니다:

<code-example header="app/dashboard/dashboard.component.ts (컴포넌트 생성자)" path="testing/src/app/dashboard/dashboard.component.ts" region="ctor"></code-example>

`DashboardComponent`는 Angular 라우터와 `HeroService`를 의존성으로 주입받습니다.
그래서 이 객체들은 목 객체로 대체해야 할 수 있습니다.
실제 객체를 활용하면 테스트 코드가 복잡해집니다.

<div class="alert is-helpful">

컴포넌트를 테스트할 때 라우터를 대체하는 방법은 [아래에서 설명](#routing-component)합니다.

</div>

지금 작성하는 테스트 코드의 목적은 `DashboardHeroComponent`를 테스트하는 것이지 `DashboardComponent`를 테스트하는 것이 아닙니다.
그러니 첫 번째 방법은 생략하고 두 번째 방법과 세 번째 방법으로 테스트 코드를 작성해 봅시다.


<a id="dashboard-standalone"></a>

<!--
#### Test `DashboardHeroComponent` stand-alone
-->
#### `DashboardHeroComponent` 단독으로 테스트하기

<!--
Here's the meat of the spec file setup.

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (setup)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="setup"></code-example>

Notice how the setup code assigns a test hero \(`expectedHero`\) to the component's `hero` property, emulating the way the `DashboardComponent` would set it using the property binding in its repeater.

The following test verifies that the hero name is propagated to the template using a binding.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="name-test"></code-example>

Because the [template](#dashboard-hero-component) passes the hero name through the Angular `UpperCasePipe`, the test must match the element value with the upper-cased name.

<div class="alert is-helpful">

This small test demonstrates how Angular tests can verify a component's visual representation &mdash;something not possible with [component class tests](guide/testing-components-basics#component-class-testing)&mdash; at low cost and without resorting to much slower and more complicated end-to-end tests.

</div>
-->
테스트 코드의 환경설정 부분은 이렇습니다.

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (환경설정)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="setup"></code-example>

이 환경설정 코드에서 히어로 데이터 `expectedHero`를 자식 컴포넌트 `hero` 프로퍼티로 어떻게 전달하는지 확인해 보세요.
이 코드는 `DashboardComponent`가 `*ngFor` 안에서 프로퍼티 바인딩하는 것을 대신하는 코드입니다.

아래 코드는 이렇게 전달된 히어로의 이름이 템플릿에 제대로 표시되는지 확인하는 테스트 코드입니다.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="name-test"></code-example>

`DashboardHeroComponent`의 [템플릿](#dashboard-hero-component)은 히어로 이름을 Angular가 제공하는 `UpperCasePipe`로 전달하기 때문에 테스트 코드에서 히어로 이름을 확인할 때도 대문자로 확인합니다.

<div class="alert is-helpful">

이번 섹션에서는 [컴포넌트 클래스 테스트](guide/testing-components-basics#component-class-testing)로는 확인하기 어려운 컴포넌트의 시각 표현 부분을 테스트하는 것에 대해 다뤘습니다.
엔드-투-엔드 테스트로 같은 내용을 검증하는 테스트 코드를 작성하는 것보다 훨씬 빠르고 간단합니다.

</div>


<!--
#### Clicking
-->
#### 클릭 확인

<!--
Clicking the hero should raise a `selected` event that the host component \(`DashboardComponent` presumably\) can hear:

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test"></code-example>

The component's `selected` property returns an `EventEmitter`, which looks like an RxJS synchronous `Observable` to consumers.
The test subscribes to it *explicitly* just as the host component does *implicitly*.

If the component behaves as expected, clicking the hero's element should tell the component's `selected` property to emit the `hero` object.

The test detects that event through its subscription to `selected`.
-->
Clicking the hero should raise a `selected` event that the host component \(`DashboardComponent` presumably\) can hear:

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test"></code-example>

The component's `selected` property returns an `EventEmitter`, which looks like an RxJS synchronous `Observable` to consumers.
The test subscribes to it *explicitly* just as the host component does *implicitly*.

If the component behaves as expected, clicking the hero's element should tell the component's `selected` property to emit the `hero` object.

The test detects that event through its subscription to `selected`.


<a id="trigger-event-handler"></a>

#### `triggerEventHandler`

<!--
The `heroDe` in the previous test is a `DebugElement` that represents the hero `<div>`.

It has Angular properties and methods that abstract interaction with the native element.
This test calls the `DebugElement.triggerEventHandler` with the "click" event name.
The "click" event binding responds by calling `DashboardHeroComponent.click()`.

The Angular `DebugElement.triggerEventHandler` can raise *any data-bound event* by its *event name*.
The second parameter is the event object passed to the handler.

The test triggered a "click" event.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="trigger-event-handler"></code-example>

In this case, the test correctly assumes that the runtime event handler, the component's `click()` method, doesn't care about the event object.

<div class="alert is-helpful">

Other handlers are less forgiving.
For example, the `RouterLink` directive expects an object with a `button` property that identifies which mouse button, if any, was pressed during the click.
The `RouterLink` directive throws an error if the event object is missing.

</div>
-->
위 테스트에서 사용했던 `heroDe`는 히어로 `<div>`를 의미하는 `DebugElement` 객체입니다.

이 객체는 브라우저의 표준 엘리먼트와 상호작용할 수 있는 프로퍼티와 메서드를 제공합니다.
그래서 이 테스트 코드에서는 `DebugElement.triggerEventHandler()` 함수로 클릭 이벤트를 직접 실행했습니다.
그리고 클릭 이벤트는 `DashboardHeroComponent.click()`을 실행하도록 이벤트 바인딩되어 있습니다.

`DebugElement.triggerEventHandler()` 메서드는 이벤트 이름과 전달되는 이벤트 객체를 자유롭게 선택할 수 있습니다.
핸들러에 전달되는 이벤트 객체는 두 번째 인자로 전달합니다.

결국 이 테스트 코드는 `null` 객체로 "click" 이벤트를 발생시킵니다.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="trigger-event-handler"></code-example>

이 테스트 코드에서는 호스트 컴포넌트의 `click()` 메서드가 이벤트 객체는 신경쓰지 않는다고 간주합시다.

<div class="alert is-helpful">

핸들러는 보통 이렇게 관대하지 않습니다.
예를 들면 `RouterLink` 디렉티브는 클릭이 어떤 마우스 버튼에서 발생했는지 확인하기 위해 `button` 프로퍼티가 필요합니다.
이벤트 객체가 누락되면 에러가 발생합니다.

</div>


<!--
#### Click the element
-->
#### 엘리먼트 클릭하기

<!--
The following test alternative calls the native element's own `click()` method, which is perfectly fine for *this component*.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test-2"></code-example>
-->
아래 코드는 `DebugElement`를 활용하는 대신 표준 엘리먼트가 제공하는 `click()` 메서드를 활용하는 코드입니다.
*이 컴포넌트* 는 이렇게 테스트해도 원하는 내용을 확인할 수 있습니다.

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test-2"></code-example>


<a id="click-helper"></a>

<!--
#### `click()` helper
-->
#### `click()` 헬퍼

<!--
Clicking a button, an anchor, or an arbitrary HTML element is a common test task.

Make that consistent and straightforward by encapsulating the *click-triggering* process in a helper such as the following `click()` function:

<code-example header="testing/index.ts (click helper)" path="testing/src/testing/index.ts" region="click-event"></code-example>

The first parameter is the *element-to-click*.
If you want, pass a custom event object as the second parameter.
The default is a partial [left-button mouse event object](https://developer.mozilla.org/docs/Web/API/MouseEvent/button) accepted by many handlers including the `RouterLink` directive.

<div class="alert is-important">

The `click()` helper function is **not** one of the Angular testing utilities.
It's a function defined in *this guide's sample code*.
All of the sample tests use it.
If you like it, add it to your own collection of helpers.

</div>

Here's the previous test, rewritten using the click helper.

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (test with click helper)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test-3"></code-example>
-->
버튼이나 `<a>` 엘리먼트를 클릭하는 것은 기본 테스트 작업 중 하나입니다.

일관되게 *클릭을 트리거링하는* 과정은 `click()` 헬퍼 함수로 구성해 봅시다:

<code-example header="testing/index.ts (클릭 헬퍼)" path="testing/src/testing/index.ts" region="click-event"></code-example>

첫 번째 인자는 클릭할 엘리먼트입니다.
그리고 필요한 경우에는 두 번째 인자로 커스텀 이벤트 객체를 전달할 수 있습니다.
기본값은 일반적으로 활용되는 [마우스 왼쪽 버튼 이벤트 객체](https://developer.mozilla.org/docs/Web/API/MouseEvent/button)입니다.

<div class="alert is-important">

`click()` 헬퍼 함수는 Angular가 제공하는 테스트 관련 기능이 **아닙니다**.
이 함수는 가이드 문서에서 예제를 설명하기 위해 정의한 코드이며 테스트 코드에서만 이 헬퍼 함수를 사용합니다.
이런 함수가 더 있다면 헬퍼들을 모아서 따로 구성하는 것도 좋습니다.

</div>

이전에 작성한 테스트 코드를 클릭 헬퍼를 사용하는 방식으로 수정하면 이렇습니다:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (클릭 헬퍼를 사용하는 테스트 코드)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="click-test-3"></code-example>


<a id="component-inside-test-host"></a>

<!--
## Component inside a test host
-->
## 테스트 호스트 안에서 테스트하기

<!--
The previous tests played the role of the host `DashboardComponent` themselves.
But does the `DashboardHeroComponent` work correctly when properly data-bound to a host component?

You could test with the actual `DashboardComponent`.
But doing so could require a lot of setup, especially when its template features an `*ngFor` repeater, other components, layout HTML, additional bindings, a constructor that injects multiple services, and it starts interacting with those services right away.

Imagine the effort to disable these distractions, just to prove a point that can be made satisfactorily with a *test host* like this one:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (test host)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host"></code-example>

This test host binds to `DashboardHeroComponent` as the `DashboardComponent` would but without the noise of the `Router`, the `HeroService`, or the `*ngFor` repeater.

The test host sets the component's `hero` input property with its test hero.
It binds the component's `selected` event with its `onSelected` handler, which records the emitted hero in its `selectedHero` property.

Later, the tests will be able to check `selectedHero` to verify that the `DashboardHeroComponent.selected` event emitted the expected hero.

The setup for the `test-host` tests is similar to the setup for the stand-alone tests:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (test host setup)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-setup"></code-example>

This testing module configuration shows three important differences:

*   It *declares* both the `DashboardHeroComponent` and the `TestHostComponent`
*   It *creates* the `TestHostComponent` instead of the `DashboardHeroComponent`
*   The `TestHostComponent` sets the `DashboardHeroComponent.hero` with a binding

The `createComponent` returns a `fixture` that holds an instance of `TestHostComponent` instead of an instance of `DashboardHeroComponent`.

Creating the `TestHostComponent` has the side effect of creating a `DashboardHeroComponent` because the latter appears within the template of the former.
The query for the hero element \(`heroEl`\) still finds it in the test DOM, albeit at greater depth in the element tree than before.

The tests themselves are almost identical to the stand-alone version:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (test-host)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-tests"></code-example>

Only the selected event test differs.
It confirms that the selected `DashboardHeroComponent` hero really does find its way up through the event binding to the host component.
-->
이전에 살펴본 테스트 코드에서 호스트 엘리먼트의 역할은 `DashboardComponent`가 직접 합니다.
그런데 호스트 컴포넌트가 바뀐 경우에도 데이터 바인딩만 제대로 된다면 `DashboardHeroComponent`가 동작할까요?

`DashboardHeroComponent`를 테스트할 때 실제 호스트 컴포넌트인 `DashboardComponent`를 사용해도 테스트를 진행할 수 있습니다.
하지만 실제 호스트 컴포넌트를 사용하기 위해 설정해야 할 내용이 훨씬 많아질 수 있습니다.
`*ngFor`는 물론이고 상호작용하는 컴포넌트나 서비스가 더 필요할 수 있고, 바인딩되는 프로퍼티가 더 있을 수 있으며 HTML 레이아웃도 동적으로 변경될 수 있습니다.

이런 요구조건을 다 만족시키기 위해 노력하는 것보다는 검증하려는 컴포넌트만 집중하기 위해 *테스트 호스트* 를 따로 만드는 것이 좋습니다:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (테스트 호스트)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host"></code-example>

이 테스트 호스트는 `DashboardComponent`와 같은 방식으로 `DashboardHeroComponent`를 바인딩하면서도, `DashboardHeroComponent`에 사용하던 `Router`, `HeroService`, `*ngFor`를 신경쓰지 않을 수 있습니다.

그리고 컴포넌트에 있는 테스트 히어로 데이터로 `DashboardHeroComponent`의 `hero` 프로퍼티를 바인딩하며, `onSelected` 핸들러로 `selected` 이벤트를 감지합니다.

`DashboardHeroComponent`에서 `selected` 이벤트가 발생하면 히어로 데이터가 `selectedHero` 프로퍼티에 할당되기 때문에 데이터가 제대로 전달되었는지 확인할 수 있습니다.

*테스트 호스트* 를 활용하는 테스트 코드는 컴포넌트만 단독으로 테스트했던 코드와 비슷합니다:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (테스트 호스트 환경설정)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-setup"></code-example>

이 테스트 모듈 환경설정에서 이전과 다른 부분이 3가지 있습니다:

*   `DashboardHeroComponent`와 함께 `TestHostComponent`를 등록합니다.
*   `DashboardHeroComponent` 대신 `TestHostComponent`를 생성합니다.
*   `DashboardHeroComponent.hero` 프로퍼티는 `TestHostComponent`가 바인딩합니다.

`createComponent()`를 실행하면 이제 `DashboardHeroComponent` 인스턴스가 아니라 `TestHostComponent` 인스턴스가 포함된 `fixture`를 반환합니다.

`TestHostComponent`를 생성하면 이 컴포넌트 템플릿에 사용된 `DashboardHeroComponent`도 함께 생성됩니다.
그래서 테스트 DOM에서 히어로 엘리먼트\(`heroEl`\)를 쿼리하면 엘리먼트 트리를 깊이 들어가지 않아도 원하는 컴포넌트를 찾을 수 있습니다.

나머지 코드는 컴포넌트를 단독으로 테스트했던 코드와 거의 비슷합니다:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (호스트 테스트하기)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-tests"></code-example>

히어로가 선택되었을 때를 테스트하는 로직은 조금 다릅니다.
이 테스트 코드에서는 호스트 컴포넌트에 이벤트 바인딩으로 전달된 객체를 검사하는 방식을 사용했습니다.


<a id="routing-component"></a>

<!--
## Routing component
-->
## 라우터를 활용하는 컴포넌트

<!--
A *routing component* is a component that tells the `Router` to navigate to another component.
The `DashboardComponent` is a *routing component* because the user can navigate to the `HeroDetailComponent` by clicking on one of the *hero buttons* on the dashboard.

Routing is pretty complicated.
Testing the `DashboardComponent` seemed daunting in part because it involves the `Router`, which it injects together with the `HeroService`.

<code-example header="app/dashboard/dashboard.component.ts (constructor)" path="testing/src/app/dashboard/dashboard.component.ts" region="ctor"></code-example>

<code-example header="app/dashboard/dashboard.component.ts (goToDetail)" path="testing/src/app/dashboard/dashboard.component.ts" region="goto-detail" ></code-example>

Angular provides test helpers to reduce boilerplate and more effectively test code which depends on the Router and HttpClient.

<code-example header="app/dashboard/dashboard.component.spec.ts" path="testing/src/app/dashboard/dashboard.component.spec.ts" region="router-harness"></code-example>

The following test clicks the displayed hero and confirms that we navigate to the expected URL.

<code-example header="app/dashboard/dashboard.component.spec.ts (navigate test)" path="testing/src/app/dashboard/dashboard.component.spec.ts" region="navigate-test"></code-example>
-->
`Router`를 사용해서 다른 컴포넌트로 전환하는 컴포넌트가 있습니다.
`DashboardComponent`도 대시보드에서 _히어로 버튼_ 중 하나를 클릭하면 `HeroDetailComponent` 화면으로 이동하기 때문에 라우터를 활용하는 컴포넌트입니다.

라우터 객체는 아주 복잡합니다.
그리고 `DashboardComponent`는 `Router` 뿐 아니라 `HeroService`도 함께 의존성 객체로 주입되고 있으니 테스트하기에는 너무 어려워 보입니다.

<code-example header="app/dashboard/dashboard.component.ts (생성자)" path="testing/src/app/dashboard/dashboard.component.ts" region="ctor"></code-example>

<code-example header="app/dashboard/dashboard.component.ts (goToDetail())" path="testing/src/app/dashboard/dashboard.component.ts" region="goto-detail" ></code-example>

Angular는 라우터나 HttpClient를 테스트할 때 편하게 활용할 수 있는 테스트 헬퍼를 제공합니다.

<code-example header="app/dashboard/dashboard.component.spec.ts" path="testing/src/app/dashboard/dashboard.component.spec.ts" region="router-harness"></code-example>

아래 코드는 화면에 있는 히어로 엘리먼트를 클릭했을 때 지정된 주소로 잘 이동했는지 확인하는 테스트 코드입니다.

<code-example header="app/dashboard/dashboard.component.spec.ts (네비게이션 테스트)" path="testing/src/app/dashboard/dashboard.component.spec.ts" region="navigate-test"></code-example>


<a id="routed-component-w-param"></a>

<!--
## Routed components
-->
## 라우팅 대상이 되는 컴포넌트

<!--
A *routed component* is the destination of a `Router` navigation.
It can be trickier to test, especially when the route to the component *includes parameters*.
The `HeroDetailComponent` is a *routed component* that is the destination of such a route.

When a user clicks a *Dashboard* hero, the `DashboardComponent` tells the `Router` to navigate to `heroes/:id`.
The `:id` is a route parameter whose value is the `id` of the hero to edit.

The `Router` matches that URL to a route to the `HeroDetailComponent`.
It creates an `ActivatedRoute` object with the routing information and injects it into a new instance of the `HeroDetailComponent`.

Here's the `HeroDetailComponent` constructor:

<code-example header="app/hero/hero-detail.component.ts (constructor)" path="testing/src/app/hero/hero-detail.component.ts" region="ctor"></code-example>

The `HeroDetail` component needs the `id` parameter so it can fetch the corresponding hero using the `HeroDetailService`.
The component has to get the `id` from the `ActivatedRoute.paramMap` property which is an `Observable`.

It can't just reference the `id` property of the `ActivatedRoute.paramMap`.
The component has to *subscribe* to the `ActivatedRoute.paramMap` observable and be prepared for the `id` to change during its lifetime.

<code-example header="app/hero/hero-detail.component.ts (ngOnInit)" path="testing/src/app/hero/hero-detail.component.ts" region="ng-on-init"></code-example>

<div class="alert is-helpful">

The [ActivatedRoute in action](guide/router-tutorial-toh#activated-route-in-action) section of the [Router tutorial: tour of heroes](guide/router-tutorial-toh) guide covers `ActivatedRoute.paramMap` in more detail.

</div>

Tests can explore how the `HeroDetailComponent` responds to different `id` parameter values by navigating to different routes.
-->
*라우팅 대상이 되는 컴포넌트* 는 `Router`가 화면을 전환할 때 목적지가 되는 컴포넌트를 의미합니다.
이런 컴포넌트를 테스트하려면 약간의 트릭을 사용해야 하며, 특히 *라우팅 규칙에 라우팅 인자가 들어있다면* 더 그렇습니다.
`HeroDetailComponent`는 *라우팅 규칙의 대상이 되는 컴포넌트*입니다.

사용자가 *대시보드* 에서 히어로를 클릭하면 `DashboardComponent`는 `heroes/:id`라는 주소로 이동하도록 `Router`에게 요청합니다.
이 주소에서 `:id` 부분이 정보를 수정할 히어로의 `id`에 해당하는 라우팅 인자입니다.

`Router`는 이 주소를 만나면 `HeroDetailComponent`로 전환합니다.
그리고 이 때 라우팅 정보에 대한 `ActivatedRoute` 객체가 `HeroDetailComponent` 인스턴스에 의존성으로 주입됩니다.

`HeroDetailComponent`의 생성자는 이렇습니다:

<code-example header="app/hero/hero-detail.component.ts (생성자)" path="testing/src/app/hero/hero-detail.component.ts" region="ctor"></code-example>

`HeroDetail` 컴포넌트는 `HeroDetailService`에서 원하는 히어로 데이터를 가져오기 위해 `id` 인자가 필요합니다.
그래서 `Observable`로 제공되는 `ActivatedRoute.paramMap` 프로퍼티를 참조하면 원하는 `id` 값을 참조할 수 있습니다.

`ActivatedRoute.paramMap`에서 `id` 프로퍼티를 직접 참조할 수는 없습니다.
이 프로퍼티는 옵저버블로 제공되기 때문에 반드시 *구독* 해야 하며, 이렇게 해야 라우팅 인자가 변경될때마다 전달되는 `id` 값에 대응할 수 있습니다.

<code-example header="app/hero/hero-detail.component.ts (ngOnInit())" path="testing/src/app/hero/hero-detail.component.ts" region="ng-on-init"></code-example>

<div class="alert is-helpful">

`ActivatedRoute.paramMap`에 대해 자세하게 알아보려면 [라우터 튜토리얼: 히어로들의 여행](guide/router-tutorial-toh) 문서의 [ActivatedRoute 활용하기](guide/router-tutorial-toh#activated-route-in-action) 섹션을 참고하세요.

</div>

이제 테스트 코드에서는 `HeroDetailComponent` 생성자로 주입되는 `ActivatedRoute` 객체의 `id` 값을 바꿔보면서 이 컴포넌트가 어떻게 반응하는지 테스트하면 됩니다.


<!--
#### Testing with the `RouterTestingHarness`
-->
#### `RouterTestingHarness` 사용해서 테스트하기

<!--
Here's a test demonstrating the component's behavior when the observed `id` refers to an existing hero:

<code-example header="app/hero/hero-detail.component.spec.ts (existing id)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-good-id"></code-example>

<div class="alert is-helpful">

In the following section, the `createComponent()` method and `page` object are discussed.
Rely on your intuition for now.

</div>

When the `id` cannot be found, the component should re-route to the `HeroListComponent`.

The test suite setup provided the same router harness [described above](#routing-component).

This test expects the component to try to navigate to the `HeroListComponent`.

<code-example header="app/hero/hero-detail.component.spec.ts (bad id)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-bad-id"></code-example>
-->
아래 코드는 존재하는 히어로의 `id`를 받았을 때 컴포넌트의 동작을 테스트하는 코드입니다:

<code-example header="app/hero/hero-detail.component.spec.ts (id가 존재하는 경우)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-good-id"></code-example>

<div class="alert is-helpful">

`createComponent()` 메서드와 `page` 객체는 이후 섹션에서 다룹니다.
지금 꼭 알아야 하는 내용은 아닙니다.

</div>

전달된 `id`와 맞는 히어로를 찾을 수 없으면 다시 `HeroListComponent`로 이동해야 합니다.

이 때 실제 화면이동은 스파이로 대체하기 위해 [위에서 설명한](#routing-component) 라우터 목 객체를 사용해서 테스트 코드의 환경설정을 했습니다.

아래 코드는 다시 `HeroListComponent`로 이동하는지 검사하는 테스트 코드입니다.

<code-example header="app/hero/hero-detail.component.spec.ts (유효하지 않은 id)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-bad-id"></code-example>


<a id="nested-component-tests"></a>
<!--
## Nested component tests
-->
## 중첩된 컴포넌트 테스트하기

<!--
Component templates often have nested components, whose templates might contain more components.

The component tree can be very deep and, most of the time, the nested components play no role in testing the component at the top of the tree.

The `AppComponent`, for example, displays a navigation bar with anchors and their `RouterLink` directives.

<code-example header="app/app.component.html" path="testing/src/app/app.component.html"></code-example>

To validate the links, you don't need the `Router` to navigate and you don't need the `<router-outlet>` to mark where the `Router` inserts *routed components*.

The `BannerComponent` and `WelcomeComponent` \(indicated by `<app-banner>` and `<app-welcome>`\) are also irrelevant.

Yet any test that creates the `AppComponent` in the DOM also creates instances of these three components and, if you let that happen, you'll have to configure the `TestBed` to create them.

If you neglect to declare them, the Angular compiler won't recognize the `<app-banner>`, `<app-welcome>`, and `<router-outlet>` tags in the `AppComponent` template and will throw an error.

If you declare the real components, you'll also have to declare *their* nested components and provide for *all* services injected in *any* component in the tree.

That's too much effort just to answer a few simple questions about links.

This section describes two techniques for minimizing the setup.
Use them, alone or in combination, to stay focused on testing the primary component.
-->
컴포넌트 템플릿에는 컴포넌트가 여러개 존재하면서 중첩된 컴포넌트가 있을 수도 있습니다.

컴포넌트 트리는 얼마든지 복잡하게 구성될 수 있지만, 사실 테스트하는 컴포넌트 외에는 별 역할을 하지 않는 경우가 많습니다.

`AppComponent`를 예로 들면, `RouterLink` 디렉티브가 사용된 네비게이션 바와 앵커 엘리먼트가 있다고 합시다.

<code-example header="app/app.component.html" path="testing/src/app/app.component.html"></code-example>

링크가 제대로 동작하는지 확인하려고 해도 실제로 화면을 전환하는 `Router`는 필요 없으며, 라우팅 대상이 되는 컴포넌트가 들어갈 `<router-outlet>`도 필요하지 않습니다.

`BannerComponent`\(`<app-banner>`\)와 `WelcomeComponent`\(`<app-welcome>`\)도 지금 테스트하는 기능과는 관계가 없습니다.

하지만 `AppComponent` 인스턴스를 그대로 생성하면 관련 컴포넌트들도 함께 생성되기 때문에 이 컴포넌트들에 대한 설정도 추가로 해줘야 합니다.

만약 이 컴포넌트들을 등록하지 않은 채로 컴파일하면 Angular 컴파일러가 `AppComponent` 템플릿에 사용된 `<app-banner>`, `<app-welcome>`, `<router-outlet>`를 확인할 수 없기 때문에 에러가 발생합니다.

하지만 실제 컴포넌트를 등록하면 이 컴포넌트 내부에 있는 다른 컴포넌트도 또 등록해야 하며, 이와 관련된 서비스 객체도 모두 의존성으로 주입할 수 있도록 준비해야 합니다.

링크가 제대로 동작하는지 확인하려고 하는데 이런 노력은 필요 없습니다.

이번 섹션에서는 환경설정을 최소화하는 테크닉에 대해 알아봅시다.
이제부터 설명하는 두가지 방법을 활용하면 테스트하려는 대상 컴포넌트에만 집중하는 데에 도움이 될 것입니다.


<a id="stub-component"></a>

<!--
##### Stubbing unneeded components
-->
##### 필요없는 컴포넌트 목으로 대체하기

<!--
In the first technique, you create and declare stub versions of the components and directive that play little or no role in the tests.

<code-example header="app/app.component.spec.ts (stub declaration)" path="testing/src/app/app.component.spec.ts" region="component-stubs"></code-example>

The stub selectors match the selectors for the corresponding real components.
But their templates and classes are empty.

Then declare them in the `TestBed` configuration next to the components, directives, and pipes that need to be real.

<code-example header="app/app.component.spec.ts (TestBed stubs)" path="testing/src/app/app.component.spec.ts" region="testbed-stubs"></code-example>

The `AppComponent` is the test subject, so of course you declare the real version.

The rest are stubs.
-->
첫 번째 테크닉은 테스트와 관련이 없는 컴포넌트와 디렉티브를 목으로 만들어서 등록하는 것입니다.

<code-example header="app/app.component.spec.ts (목 객체 정의하기)" path="testing/src/app/app.component.spec.ts" region="component-stubs"></code-example>

목 컴포넌트의 셀렉터는 대체하려는 컴포넌트와 같은 셀렉터를 사용하면 됩니다.
셀렉터는 같지만 템플릿과 클래스가 비어있는 컴포넌트를 등록하는 셈입니다.

그리고 이렇게 정의한 목 컴포넌트를 `TestBed` 환경설정에 등록합니다.

<code-example header="app/app.component.spec.ts (TestBed에 목 객체 등록하기)" path="testing/src/app/app.component.spec.ts" region="testbed-stubs"></code-example>

이 테스트 코드가 테스트하는 대상은 `AppComponent`이기 때문에 `AppComponent`는 실제 컴포넌트를 등록해야 합니다.

나머지는 모두 목 객체입니다.


<a id="no-errors-schema"></a>

#### `NO_ERRORS_SCHEMA`

<!--
In the second approach, add `NO_ERRORS_SCHEMA` to the `TestBed.schemas` metadata.

<code-example header="app/app.component.spec.ts (NO_ERRORS_SCHEMA)" path="testing/src/app/app.component.spec.ts" region="no-errors-schema"></code-example>

The `NO_ERRORS_SCHEMA` tells the Angular compiler to ignore unrecognized elements and attributes.

The compiler recognizes the `<app-root>` element and the `routerLink` attribute because you declared a corresponding `AppComponent` and `RouterLink` in the `TestBed` configuration.

But the compiler won't throw an error when it encounters `<app-banner>`, `<app-welcome>`, or `<router-outlet>`.
It simply renders them as empty tags and the browser ignores them.

You no longer need the stub components.
-->
두 번째 테크닉은 `TestBed.schemas` 메타데이터에 `NO_ERRORS_SCHEMA`를 지정하는 것입니다.

<code-example header="app/app.component.spec.ts (NO_ERRORS_SCHEMA)" path="testing/src/app/app.component.spec.ts" region="no-errors-schema"></code-example>

`NO_ERRORS_SCHEMA`를 사용하면 Angular 컴파일러가 확인할 수 없는 엘리먼트와 어트리뷰트는 모두 무시합니다.

이 경우에는 Angular 컴파일러가 `<app-root>` 엘리먼트와 `routerLink` 어트리뷰트만 인식할 수 있습니다.
왜냐하면 `TestBed` 환경설정에 `AppComponent`와 `RouterLink`만 등록되어 있기 때문입니다.

Angualr 컴파일러는 `<app-banner>`, `<app-welcome>`, `<router-outlet>`에 해당하는 객체를 찾을 수 없지만 에러가 발생하지는 않습니다.
이 태그들은 비어있는 태그로 렌더링되며 브라우저도 이 태그들을 무시합니다.

컴포넌트를 목 객체로 대체할 필요도 없습니다.


<!--
#### Use both techniques together
-->
#### 두가지 방법 동시에 사용하기

<!--
These are techniques for *Shallow Component Testing*, so-named because they reduce the visual surface of the component to just those elements in the component's template that matter for tests.

The `NO_ERRORS_SCHEMA` approach is the easier of the two but don't overuse it.

The `NO_ERRORS_SCHEMA` also prevents the compiler from telling you about the missing components and attributes that you omitted inadvertently or misspelled.
You could waste hours chasing phantom bugs that the compiler would have caught in an instant.

The *stub component* approach has another advantage.
While the stubs in *this* example were empty, you could give them stripped-down templates and classes if your tests need to interact with them in some way.

In practice you will combine the two techniques in the same setup, as seen in this example.

<code-example header="app/app.component.spec.ts (mixed setup)" path="testing/src/app/app.component.spec.ts" region="mixed-setup"></code-example>

The Angular compiler creates the `BannerStubComponent` for the `<app-banner>` element and applies the `RouterLink` to the anchors with the `routerLink` attribute, but it ignores the `<app-welcome>` and `<router-outlet>` tags.
-->
두가지 테크닉은 *얕은 컴포넌트 테스트\(shallow component testing\)* 를 하기 위한 방법입니다.
컴포넌트 템플릿에서 테스트와 관련없는 부분을 생략하기 때문에 이런 이름이 붙었습니다.

그리고 두 가지 테크닉 중에는 `NO_ERRORS_SCHEMA`를 활용하는 방법이 더 쉽지만 이 방법을 너무 많이 사용하면 안됩니다.

`NO_ERRORS_SCHEMA`는 컴포넌트나 어트리뷰트 이름을 잘못 사용했을 때도 해당 객체를 무시합니다.
이런 경우에는 에러도 표시되지 않기 때문에 문제를 해결하기 위해 많은 시간을 허비할 수도 있습니다.

컴포넌트를 목 객체로 대신하는 방법의 장점이 또 있습니다.
테스트하려는 컴포넌트가 이런 컴포넌트와 상호작용하는 로직이 있다면, 꼭 필요한 부분만 작성해서 이 동작을 실제로 확인할 수 있습니다.

두 가지 테크닉을 동시에 활용하려면 환경설정 코드를 이렇게 구성하면 됩니다.

<code-example header="app/app.component.spec.ts (환경설정)" path="testing/src/app/app.component.spec.ts" region="mixed-setup"></code-example>

이렇게 작성하면 Angular 컴파일러는 `<app-banner>` 엘리먼트를 `BannerComponentStub`으로 대체하며, `routerLink` 어트리뷰트를 `RouterLinkStubDirective`로 대체합니다.
`<app-welcome>`과 `<router-outlet>` 태그는 무시합니다.


<a id="by-directive"></a>
<a id="inject-directive"></a>

#### `By.directive` and injected directives

<!--
A little more setup triggers the initial data binding and gets references to the navigation links:

<code-example header="app/app.component.spec.ts (test setup)" path="testing/src/app/app.component.spec.ts" region="test-setup"></code-example>

Three points of special interest:

*   Locate the anchor elements with an attached directive using `By.directive`
*   The query returns `DebugElement` wrappers around the matching elements
*   Each `DebugElement` exposes a dependency injector with the specific instance of the directive attached to that element

The `AppComponent` links to validate are as follows:

<code-example header="app/app.component.html (navigation links)" path="testing/src/app/app.component.html" region="links"></code-example>

<a id="app-component-tests"></a>

Here are some tests that confirm those links are wired to the `routerLink` directives as expected:

<code-example header="app/app.component.spec.ts (selected tests)" path="testing/src/app/app.component.spec.ts" region="tests"></code-example>
-->
데이터 초기값을 바인딩하려면 네비게이션 링크 인스턴스를 가져와야 합니다:

<code-example header="app/app.component.spec.ts (테스트 환경설정)" path="testing/src/app/app.component.spec.ts" region="test-setup"></code-example>

이 코드에서 이런 내용이 중요합니다:

*   앵커 엘리먼트에 적용된 디렉티브는 `By.directive`로 참조할 수 있습니다.
*   `queryAll()` 함수는 해당 엘리먼트를 래핑한 `DebugElement`를 반환합니다.
*   개별 `DebugElement`에 있는 의존성 주입기(인젝터)를 활용하면 해당 엘리먼트 인스턴스에 있는 디렉티브 인스턴스를 참조할 수 있습니다.

검사해야 할 `AppComponent` 링크들은 이렇습니다:

<code-example header="app/app.component.html (네비게이션 링크)" path="testing/src/app/app.component.html" region="links"></code-example>

<a id="app-component-tests"></a>

이제 개별 링크가 `routerLink` 디렉티브와 잘 연결되었는지 테스트하려면 테스트 코드를 이렇게 작성하면 됩니다:

<code-example header="app/app.component.spec.ts (링크 테스트)" path="testing/src/app/app.component.spec.ts" region="tests"></code-example>


<a id="page-object"></a>

<!--
## Use a `page` object
-->
## `page` 객체 사용하기

<!--
The `HeroDetailComponent` is a simple view with a title, two hero fields, and two buttons.

<div class="lightbox">

<img alt="HeroDetailComponent in action" src="generated/images/guide/testing/hero-detail.component.png">

</div>

But there's plenty of template complexity even in this simple form.

<code-example
  path="testing/src/app/hero/hero-detail.component.html" header="app/hero/hero-detail.component.html"></code-example>

Tests that exercise the component need &hellip;

*   To wait until a hero arrives before elements appear in the DOM
*   A reference to the title text
*   A reference to the name input box to inspect and set it
*   References to the two buttons so they can click them
*   Spies for some of the component and router methods

Even a small form such as this one can produce a mess of tortured conditional setup and CSS element selection.

Tame the complexity with a `Page` class that handles access to component properties and encapsulates the logic that sets them.

Here is such a `Page` class for the `hero-detail.component.spec.ts`

<code-example header="app/hero/hero-detail.component.spec.ts (Page)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="page"></code-example>

Now the important hooks for component manipulation and inspection are neatly organized and accessible from an instance of `Page`.

A `createComponent` method creates a `page` object and fills in the blanks once the `hero` arrives.

<code-example header="app/hero/hero-detail.component.spec.ts (createComponent)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="create-component"></code-example>

Here are a few more `HeroDetailComponent` tests to reinforce the point.

<code-example header="app/hero/hero-detail.component.spec.ts (selected tests)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="selected-tests"></code-example>
-->
`HeroDetailComponent`는 제목과 히어로 필드 2개, 버튼 2개로 구성된 컴포넌트입니다.

<div class="lightbox">

<img alt="HeroDetailComponent in action" src="generated/images/guide/testing/hero-detail.component.png">

</div>

하지만 이렇게 간단한 폼도 템플릿은 얼마든지 복잡하게 구성될 수 있습니다.

<code-example
  path="testing/src/app/hero/hero-detail.component.html" header="app/hero/hero-detail.component.html"></code-example>

이 컴포넌트를 테스트하려면 &hellip;

*   컴포넌트가 히어로 데이터를 받아 DOM에 표시될 때까지 기다려야 합니다.
*   제목을 참조해와야 합니다.
*   이름을 입력하는 입력 필드를 참조해와야 합니다.
*   클릭할 수 있는 버튼을 참조해와야 합니다.
*   일부 컴포넌트와 라우터는 목 객체로 대신해야 합니다.

이렇게 간단한 폼을 테스트할 때도 미리 준비해야 하는 환경설정과 CSS 엘리먼트 쿼리 로직이 많아질 수 있습니다.

이 문제를 간단하게 하려면 `Page` 클래스를 별도로 만들어서 컴포넌트 프로퍼티를 직접 다루고 환경설정 코드도 캡슐화하는 것이 좋습니다.

`hero-detail.component.spec.ts` 파일에서 사용하는 `Page` 클래스 코드는 이렇습니다.

<code-example header="app/hero/hero-detail.component.spec.ts (Page)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="page"></code-example>

이제 컴포넌트를 조작하고 검사하는 동작은 `Page` 객체의 인스턴스를 활용하는 것이 더 간단합니다.

`createComponent` 메서드는 `page` 객체를 생성하고 `hero` 데이터가 전달되기 전까지 사용할 기본값을 채우는 동작을 합니다.

<code-example header="app/hero/hero-detail.component.spec.ts (createComponent())" path="testing/src/app/hero/hero-detail.component.spec.ts" region="create-component"></code-example>

몇가지 테스트를 더 추가해보면 이렇게 활용할 수 있습니다.

<code-example header="app/hero/hero-detail.component.spec.ts (selected tests)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="selected-tests"></code-example>


<a id="compile-components"></a>

<!--
## Calling `compileComponents()`
-->
## `compileComponents()` 실행하기

<!--
<div class="alert is-helpful">

Ignore this section if you *only* run tests with the CLI `ng test` command because the CLI compiles the application before running the tests.

</div>

If you run tests in a **non-CLI environment**, the tests might fail with a message like this one:

<code-example format="output" hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</code-example>

The root of the problem is at least one of the components involved in the test specifies an external template or CSS file as the following version of the `BannerComponent` does.

<code-example header="app/banner/banner-external.component.ts (external template & css)" path="testing/src/app/banner/banner-external.component.ts"></code-example>

The test fails when the `TestBed` tries to create the component.

<code-example avoid header="app/banner/banner-external.component.spec.ts (setup that fails)" path="testing/src/app/banner/banner-external.component.spec.ts" region="setup-may-fail"></code-example>

Recall that the application hasn't been compiled.
So when you call `createComponent()`, the `TestBed` compiles implicitly.

That's not a problem when the source code is in memory.
But the `BannerComponent` requires external files that the compiler must read from the file system, an inherently *asynchronous* operation.

If the `TestBed` were allowed to continue, the tests would run and fail mysteriously before the compiler could finish.

The preemptive error message tells you to compile explicitly with `compileComponents()`.
-->
<div class="alert is-helpful">

테스트를 실행할 때 Angular CLI `ng test` 명령만 사용한다면 이 섹션은 건너뛰어도 됩니다.
Angular CLI는 테스트를 실행하기 전에 애플리케이션을 자동으로 빌드합니다.

</div>

Angular CLI를 사용하지 않고 테스트를 실행한다면 이런 에러가 발생하면서 테스트 실행이 실패합니다:

<code-example format="output" hideCopy language="shell">

Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.

</code-example>

이 문제의 원인은 테스트 코드에서 사용하는 컴포넌트 중에 외부 템플릿 파일이나 외부 CSS 파일을 사용하는 컴포넌트가 있기 때문입니다.
지금 다루는 예제에서는 `BannerComponent`가 원인입니다.

<code-example header="app/banner/banner-external.component.ts (외부 템플릿 & CSS)" path="testing/src/app/banner/banner-external.component.ts"></code-example>

그래서 이 테스트는 `TestBed`가 컴포넌트를 생성하는 부분에서 실패합니다.

<code-example avoid header="app/banner/banner-external.component.spec.ts (실행에 실패한 테스트 코드 환경설정)" path="testing/src/app/banner/banner-external.component.spec.ts" region="setup-may-fail"></code-example>

문제는 컴포넌트가 컴파일되지 않았다는 것입니다.
그래서 `createComponent()`를 실행해야 `TestBed`가 컴포넌트를 컴파일합니다.

소스 코드가 메모리에 있는 경우는 문제가 되지 않습니다.
하지만 `BannerComponent`를 컴파일하려면 외부 파일을 참조하기 위해 파일 시스템을 사용해야 하고, 이 파일 시스템은 *비동기로* 동작하기 때문에 문제가 생깁니다.

그래서 테스트를 더 진행하려면 컴포넌트가 컴파일되는 과정이 끝날때까지 기다려야 합니다.

앞서 다룬 에러 메시지를 다시 확인해보면, `compileComponents()`를 실행하지 않았기 때문에 발생한 에러라는 것을 확인할 수 있습니다.


<!--
#### `compileComponents()` is async
-->
#### `compileComponents()` 는 비동기로 동작합니다.

<!--
You must call `compileComponents()` within an asynchronous test function.

<div class="alert is-critical">

If you neglect to make the test function async (for example, forget to use `waitForAsync()` as described), you'll see this error message

<code-example format="output" hideCopy language="shell">

Error: ViewDestroyedError: Attempt to use a destroyed view

</code-example>

</div>

A typical approach is to divide the setup logic into two separate `beforeEach()` functions:

| Functions                   | Details |
|:---                         |:---     |
| Asynchronous `beforeEach()` | Compiles the components      |
| Synchronous `beforeEach()`  | Performs the remaining setup |
-->
`compileComponents()`는 비동기 테스트 함수 안에서 실행해야 합니다.

<div class="alert is-critical">

`waitForAsync()`와 같은 비동기 테스트 함수를 사용하지 않으면 이런 에러가 발생합니다.

<code-example format="output" hideCopy language="shell">

Error: ViewDestroyedError: Attempt to use a destroyed view

</code-example>

</div>

일반적인 방법은 환경설정 로직을 `beforeEach()` 2개로 나누는 것입니다:

| 함수                 | 설명             |
|:-------------------|:---------------|
| 비동기 `beforeEach()` | 컴포넌트를 컴파일합니다.  |
| 동기 `beforeEach()`  | 나머지 환경설정을 합니다. |


<!--
#### The async `beforeEach`
-->
#### 비동기 `beforeEach`

<!--
Write the first async `beforeEach` like this.

<code-example header="app/banner/banner-external.component.spec.ts (async beforeEach)" path="testing/src/app/banner/banner-external.component.spec.ts" region="async-before-each"></code-example>

The `TestBed.configureTestingModule()` method returns the `TestBed` class so you can chain calls to other `TestBed` static methods such as `compileComponents()`.

In this example, the `BannerComponent` is the only component to compile.
Other examples configure the testing module with multiple components and might import application modules that hold yet more components.
Any of them could require external files.

The `TestBed.compileComponents` method asynchronously compiles all components configured in the testing module.

<div class="alert is-important">

Do not re-configure the `TestBed` after calling `compileComponents()`.

</div>

Calling `compileComponents()` closes the current `TestBed` instance to further configuration.
You cannot call any more `TestBed` configuration methods, not `configureTestingModule()` nor any of the `override...` methods.
The `TestBed` throws an error if you try.

Make `compileComponents()` the last step before calling `TestBed.createComponent()`.
-->
첫 번째 비동기 `beforeEach()`는 이렇게 작성합니다.

<code-example header="app/banner/banner-external.component.spec.ts (비동기 beforeEach())" path="testing/src/app/banner/banner-external.component.spec.ts" region="async-before-each"></code-example>

그리고 `TestBed.configureTestinModule()` 메서드는 `TestBed` 클래스를 반환하기 때문에 `TestBed` 클래스가 제공하는 정적 메소드를 바로 체이닝해서 실행할 수 있습니다.

지금 다루는 예제에서는 컴파일되는 컴포넌트가 `BannerComponent` 뿐입니다.
하지만 컴포넌트가 여러개 사용되는 테스트 모듈의 환경을 설정할 때는 컴포넌트와 모듈을 더 로드해야 할 수도 있습니다.
외부 파일을 로드해야 할 수도 있습니다.

`TestBed.compileComponents()` 메서드는 테스트 모듈에 등록된 컴포넌트를 모두 비동기로 컴파일하는 메서드입니다.

<div class="alert is-important">

`compileComponents()`를 실행한 후에는 `TestBed` 설정을 변경하지 마세요.

</div>

`compileComponents()`를 실행하면 `TestBed` 인스턴스의 현재 설정이 확정되며 더이상 변경되지 않습니다.
그래서 이후에는 `configureTestingModule`, `override...`와 같은 테스트 모듈 환경설정 메서드를 실행할 수 없습니다.
실행하면 에러가 발생합니다.

그래서 `compileComponents()`는 `TestBed.createComponent()`를 실행하기 직전에 실행해야 합니다.


<!--
#### The synchronous `beforeEach`
-->
#### 동기 `beforeEach`

<!--
The second, synchronous `beforeEach()` contains the remaining setup steps, which include creating the component and querying for elements to inspect.

<code-example header="app/banner/banner-external.component.spec.ts (synchronous beforeEach)" path="testing/src/app/banner/banner-external.component.spec.ts" region="sync-before-each"></code-example>

Count on the test runner to wait for the first asynchronous `beforeEach` to finish before calling the second.
-->
두 번째로 구현하는 동기 `beforeEach()`에는 나머지 환경설정 로직을 작성합니다.
컴포넌트를 생성하고 엘리먼트를 쿼리하는 로직을 작성하면 됩니다.

<code-example header="app/banner/banner-external.component.spec.ts (동기 beforeEach())" path="testing/src/app/banner/banner-external.component.spec.ts" region="sync-before-each"></code-example>

테스트 러너는 이 함수 이전에 작성한 비동기 `beforeEach()` 실행이 완전히 끝난 후에 두 번째 `beforeEach()` 함수를 실행합니다.


<!--
#### Consolidated setup
-->
#### 한 번에 설정하기

<!--
You can consolidate the two `beforeEach()` functions into a single, async `beforeEach()`.

The `compileComponents()` method returns a promise so you can perform the synchronous setup tasks *after* compilation by moving the synchronous code after the `await` keyword, where the promise has been resolved.

<code-example header="app/banner/banner-external.component.spec.ts (one beforeEach)" path="testing/src/app/banner/banner-external.component.spec.ts" region="one-before-each"></code-example>
-->
`beforeEach()` 함수를 둘로 나누는 대신 비동기 `beforeEach()` 하나로 통합하는 방법도 있습니다.

`compileComponents()` 메서드는 프라미스를 반환하기 때문에, 컴포넌트를 컴파일한 *이후에* 필요한 동기 환경설정 작업은 프라미스의 `then()` 콜백으로 이어서 작성할 수 있습니다.

<code-example header="app/banner/banner-external.component.spec.ts (beforeEach() 하나로 구성하기)" path="testing/src/app/banner/banner-external.component.spec.ts" region="one-before-each"></code-example>


<!--
#### `compileComponents()` is harmless
-->
#### `compileComponents()`는 위험하지 않습니다.

<!--
There's no harm in calling `compileComponents()` when it's not required.

The component test file generated by the CLI calls `compileComponents()` even though it is never required when running `ng test`.

The tests in this guide only call `compileComponents` when necessary.
-->
`compileComponents()`는 필요하지 않은 시점에 실행하더라도 아무 문제가 발생하지 않습니다.

Angular CLI가 자동으로 생성한 컴포넌트 테스트 파일도 이 메서드가 필요한 지는 알 수 없지만 기본적으로 `compileComponents()`를 실행합니다.

다만 이 문서에서는 꼭 필요할 때만 `compileComponents()`를 실행했습니다.


<a id="import-module"></a>

<!--
## Setup with module imports
-->
## 모듈을 로드하는 방식으로 환경설정 하기

<!--
Earlier component tests configured the testing module with a few `declarations` like this:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (configure TestBed)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="config-testbed"></code-example>

The `DashboardComponent` is simple.
It needs no help.
But more complex components often depend on other components, directives, pipes, and providers and these must be added to the testing module too.

Fortunately, the `TestBed.configureTestingModule` parameter parallels the metadata passed to the `@NgModule` decorator which means you can also specify `providers` and `imports`.

The `HeroDetailComponent` requires a lot of help despite its small size and simple construction.
In addition to the support it receives from the default testing module `CommonModule`, it needs:

*   `NgModel` and friends in the `FormsModule` to enable two-way data binding
*   The `TitleCasePipe` from the `shared` folder
*   The Router services
*   The Hero data access services

One approach is to configure the testing module from the individual pieces as in this example:

<code-example header="app/hero/hero-detail.component.spec.ts (FormsModule setup)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-forms-module"></code-example>

<div class="alert is-helpful">

Notice that the `beforeEach()` is asynchronous and calls `TestBed.compileComponents` because the `HeroDetailComponent` has an external template and css file.

As explained in [Calling `compileComponents()`](#compile-components), these tests could be run in a non-CLI environment where Angular would have to compile them in the browser.

</div>
-->
위에서 살펴본 테스트 코드에서 테스트 모듈의 환경설정은 `declarations`를 사용해서 이렇게 설정했습니다:

<code-example header="app/dashboard/dashboard-hero.component.spec.ts (TestBed 환경설정)" path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="config-testbed"></code-example>

`DashboardComponent`는 아직 간단합니다.
이정도는 별다른 헬퍼가 필요하지 않습니다.
하지만 테스트하려는 컴포넌트가 더 복잡해져서 다른 컴포넌트, 디렉티브, 파이프, 서비스 프로바이더를 활용해야 한다면 테스트 모듈에도 이 항목들을 모두 등록해야 합니다.

다행히, `TestBed.configureTestingModule` 인자는 `@NgModule` 데코레이터에 사용하는 메타데이터 형식과 같기 때문에 `providers`와 `imports` 배열도 사용할 수 있습니다.

`HeroDetailComponent` 자체는 간단하지만 이 컴포넌트를 생성하기 위해 필요한 항목들이 많습니다.
그렇다면 테스트 모듈의 기본 설정으로 활용할 수 있는 `CommonModule` 모듈을 만들어 봅시다.
이 모듈에는:

*   양방향 데이터 바인딩을 사용하기 위해 `FormsModule`이 제공하는 `NgModel` 관련 심볼을 등록합니다.
*   `shared` 폴더에 있는 `TitleCasePipe`를 등록합니다.
*   라우터 서비스를 등록합니다.
*   서비스로 가져올 히어로 데이터를 등록합니다.

이런 설정들을 한 번에 모으면 이렇게 구현할 수 있습니다:

<code-example header="app/hero/hero-detail.component.spec.ts (FormsModule 환경설정)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-forms-module"></code-example>

<div class="alert is-helpful">

이 환경설정 코드에서 `beforeEach()`는 비동기이며 `TestBed.compileComponents()`도 실행합니다.
`HeroDetailComponent`의 템플릿 파일과 스타일 파일이 별도 파일이기 때문에 이렇게 사용했습니다.

그리고 이전에 살펴본 [`compileComponents()` 실행하기](#compile-components) 섹션에서 살펴봤듯이, 이 환경설정 코드는 명시적으로 컴포넌트를 컴파일하기 때문에 Angular CLI로 실행하지 않아도 테스트 코드를 실행할 수 있습니다.

</div>


<!--
#### Import a shared module
-->
#### 공유 모듈 로드하기

<!--
Because many application components need the `FormsModule` and the `TitleCasePipe`, the developer created a `SharedModule` to combine these and other frequently requested parts.

The test configuration can use the `SharedModule` too as seen in this alternative setup:

<code-example header="app/hero/hero-detail.component.spec.ts (SharedModule setup)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-shared-module"></code-example>

It's a bit tighter and smaller, with fewer import statements, which are not shown in this example.
-->
`FormsModule`과 `TitleCasePipe`가 애플리케이션 곳곳에 사용된다면 이 부분을 `SharedModule`로 만들어두고 재사용하는 것이 편합니다.

환경설정을 이렇게 구성하면 됩니다:

<code-example header="app/hero/hero-detail.component.spec.ts (SharedModule 환경설정)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-shared-module"></code-example>

이제 이 모듈을 활용하면 환경설정 코드가 더 간단해질 것입니다.


<a id="feature-module-import"></a>

<!--
#### Import a feature module
-->
#### 기능 모듈 로드하기

<!--
The `HeroDetailComponent` is part of the `HeroModule` [Feature Module](guide/feature-modules) that aggregates more of the interdependent pieces including the `SharedModule`.
Try a test configuration that imports the `HeroModule` like this one:

<code-example header="app/hero/hero-detail.component.spec.ts (HeroModule setup)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-hero-module"></code-example>

Only the *test doubles* in the `providers` remain.
Even the `HeroDetailComponent` declaration is gone.

In fact, if you try to declare it, Angular will throw an error because `HeroDetailComponent` is declared in both the `HeroModule` and the `DynamicTestModule` created by the `TestBed`.

<div class="alert is-helpful">

Importing the component's feature module can be the best way to configure tests when there are many mutual dependencies within the module and the module is small, as feature modules tend to be.

</div>
-->
`HeroDetailComponent`는 `HeroModule`이라는 [기능 모듈](guide/feature-modules)에 포함되어 있으며 `HeroModule`은 `SharedModule`을 포함해서 다른 구성요소들과도 연관되어 있습니다.
그렇다면 `HeroModule`을 로드해서 활용하는 테스트 환경설정 코드는 이렇게 구성할 수 있습니다:

<code-example header="app/hero/hero-detail.component.spec.ts (HeroModule 환경설정)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-hero-module"></code-example>

`HeroModule`을 제외하면 모두 *목 객체* 를 등록하는 것 뿐입니다.
`HeroDetailComponent`를 등록하는 코드도 없습니다.

사실 이렇게 선언하면 `HeroDetailComponent`가 `HeroModule`과 `DynamicTestModule`에 중복 등록되기 때문에 에러가 발생합니다.

<div class="alert is-helpful">

테스트 환경을 구성할 때는 컴포넌트를 포함하는 기능 모듈을 통째로 로드하는 방식이 가장 간단합니다.
모듈을 통째로 로드하면 모듈 안에서 필요한 의존성 관계도 모듈 안에서 자동으로 구성됩니다.

</div>


<a id="component-override"></a>

<!--
## Override component providers
-->
## 컴포넌트 프로바이더 오버라이드하기

<!--
The `HeroDetailComponent` provides its own `HeroDetailService`.

<code-example header="app/hero/hero-detail.component.ts (prototype)" path="testing/src/app/hero/hero-detail.component.ts" region="prototype"></code-example>

It's not possible to stub the component's `HeroDetailService` in the `providers` of the `TestBed.configureTestingModule`.
Those are providers for the *testing module*, not the component.
They prepare the dependency injector at the *fixture level*.

Angular creates the component with its *own* injector, which is a *child* of the fixture injector.
It registers the component's providers \(the `HeroDetailService` in this case\) with the child injector.

A test cannot get to child injector services from the fixture injector.
And `TestBed.configureTestingModule` can't configure them either.

Angular has created new instances of the real `HeroDetailService` all along!

<div class="alert is-helpful">

These tests could fail or timeout if the `HeroDetailService` made its own XHR calls to a remote server.
There might not be a remote server to call.

Fortunately, the `HeroDetailService` delegates responsibility for remote data access to an injected `HeroService`.

<code-example header="app/hero/hero-detail.service.ts (prototype)" path="testing/src/app/hero/hero-detail.service.ts" region="prototype"></code-example>

The [previous test configuration](#feature-module-import) replaces the real `HeroService` with a `TestHeroService` that intercepts server requests and fakes their responses.

</div>

What if you aren't so lucky.
What if faking the `HeroService` is hard?
What if `HeroDetailService` makes its own server requests?

The `TestBed.overrideComponent` method can replace the component's `providers` with easy-to-manage *test doubles* as seen in the following setup variation:

<code-example header="app/hero/hero-detail.component.spec.ts (Override setup)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-override"></code-example>

Notice that `TestBed.configureTestingModule` no longer provides a fake `HeroService` because it's [not needed](#spy-stub).
-->
`HeroDetailComponent`는 컴포넌트 자체에서 `HeroDetailService`를 등록하고 있습니다.

<code-example header="app/hero/hero-detail.component.ts (프로토타입)" path="testing/src/app/hero/hero-detail.component.ts" region="prototype"></code-example>

이 서비스 프로바이더는 컴포넌트에 등록되어 있기 때문에 `TestBed.configureTestingModule()`에 서비스 프로바이더의 목 객체를 등록하는 방법으로는 대체할 수 없습니다.
`TestBed.configureTestingModule()`에 등록하는 서비스 프로바이더는 *테스트 모듈* 에 등록하는 것이지 컴포넌트에 등록하는 것이 아닙니다.
그래서 이 서비스 프로바이더를 목 객체로 등록하려면 *픽스쳐 계층* 에 있는 인젝터를 사용해야 합니다.

Angular는 컴포넌트를 생성할 때 픽스쳐 인젝터의 자식 인젝터로 컴포넌트 인젝터를 함께 생성하며, 컴포넌트에 등록된 `HeroDetailService`는 이 컴포넌트 인젝터에 등록됩니다.

하지만 픽스쳐 인젝터로는 자식 인젝터에 등록된 서비스를 참조할 수 없습니다.
`TestBed.configureTestingModule()`도 마찬가지입니다.

그래서 Angular는 실제 `HeroDetailService` 클래스의 인스턴스를 생성합니다!

<div class="alert is-helpful">

`HeroDetailService` 메서드가 리모트 서버로 XHR 요청을 보낸다면 이 테스트 코드가 실패하거나 타임아웃이 발생할 수 있습니다.
리모트 서버가 준비되지 않았을 수도 있습니다.

다행히, `HeroDetailService`는 의존성으로 주입되는 `HeroService`를 활용해서 데이터를 요청합니다.

<code-example header="app/hero/hero-detail.service.ts (프로토타입)" path="testing/src/app/hero/hero-detail.service.ts" region="prototype"></code-example>

그래서 [이전 섹션에서 설명한](#feature-module-import)대로 실제 `HeroService`를 `TestHeroService`로 대체하면 서버로 보내는 요청을 가로채서 원하는 응답으로 대체할 수 있습니다.

</div>

좋지 않은 경우를 생각해 봅시다.
`HeroService`를 대체하기 어렵다면 어떨까요?
`HeroDetailService`가 직접 서버로 요청을 보낸다면 어떨까요?

`TestBed.overrideComponent()` 메서드는 컴포넌트의 `providers`에 등록된 의존성 객체를 다른 객체로 대체하는 메서드입니다.
이렇게 사용합니다:

<code-example header="app/hero/hero-detail.component.spec.ts (환경설정 오버라이드하기)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-override"></code-example>

`TestBed.configureTestingModule()`에는 이제 `HeroService`를 대체하는 코드가 없습니다.
이 코드는 이제 [필요하지 않습니다](#spy-stub).

<a id="override-component-method"></a>

<!--
#### The `overrideComponent` method
-->
#### `overrideComponent` 메서드

<!--
Focus on the `overrideComponent` method.

<code-example header="app/hero/hero-detail.component.spec.ts (overrideComponent)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-component-method"></code-example>

It takes two arguments: the component type to override \(`HeroDetailComponent`\) and an override metadata object.
The [override metadata object](guide/testing-utility-apis#metadata-override-object) is a generic defined as follows:

<code-example language="javascript">

type MetadataOverride&lt;T&gt; = {
  add?: Partial&lt;T&gt;;
  remove?: Partial&lt;T&gt;;
  set?: Partial&lt;T&gt;;
};

</code-example>

A metadata override object can either add-and-remove elements in metadata properties or completely reset those properties.
This example resets the component's `providers` metadata.

The type parameter, `T`, is the kind of metadata you'd pass to the `@Component` decorator:

<code-example language="javascript">

selector?: string;
template?: string;
templateUrl?: string;
providers?: any[];
&hellip;

</code-example>
-->
`overrideComponent` 메서드를 봅시다.

<code-example header="app/hero/hero-detail.component.spec.ts (overrideComponent())" path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-component-method"></code-example>

이 메서드는 인자를 2개 받는데, 첫 번째는 오버라이드 하려는 컴포넌트\(`HeroDetailComponent`\)이고, 두 번째는 오버라이드 메타데이터 객체입니다.
[오버라이드 메타데이터 객체](guide/testing-utility-apis#metadata-override-object) 제네릭은 이렇게 선언되어 있습니다:

<code-example language="javascript">

type MetadataOverride&lt;T&gt; = {
  add?: Partial&lt;T&gt;;
  remove?: Partial&lt;T&gt;;
  set?: Partial&lt;T&gt;;
};

</code-example>

메타데이터 오버라이드 객체는 기존 메타데이터를 수정하거나 온전히 대체하는 방식으로 지정할 수 있습니다.
위 예제 코드는 컴포넌트의 `providers` 메타데이터를 완전히 대체하는 방식으로 사용되었습니다.

타입 `T`는 `@Component` 데코레이터에 전달하는 메타데이터의 타입을 가리킵니다:

<code-example language="javascript">

selector?: string;
template?: string;
templateUrl?: string;
providers?: any[];
&hellip;

</code-example>


<a id="spy-stub"></a>

<!--
#### Provide a *spy stub* (`HeroDetailServiceSpy`)
-->
#### `HeroDetailServiceSpy` *목 객체* 등록하기

<!--
This example completely replaces the component's `providers` array with a new array containing a `HeroDetailServiceSpy`.

The `HeroDetailServiceSpy` is a stubbed version of the real `HeroDetailService` that fakes all necessary features of that service.
It neither injects nor delegates to the lower level `HeroService` so there's no need to provide a test double for that.

The related `HeroDetailComponent` tests will assert that methods of the `HeroDetailService` were called by spying on the service methods.
Accordingly, the stub implements its methods as spies:

<code-example header="app/hero/hero-detail.component.spec.ts (HeroDetailServiceSpy)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="hds-spy"></code-example>
-->
위에서 다룬 테스트 코드처럼 사용하면 컴포넌트의 `providers` 배열이 `HeroDetailServiceSpy`가 들어있는 새로운 배열로 완전히 대체됩니다.

`HeroDetailServiceSpy`는 `HeroDetailService`를 대체하는 클래스이며, 서비스가 제공하는 기능은 모두 기존 기능을 대체하는 방식으로 정의되어 있습니다.
원래 서비스 클래스에 필요한 `HeroService`는 의존성으로 주입되지 않으니 목 객체를 준비할 필요도 없습니다.

`HeroDetailService` 메서드를 활용하는 `HeroDetailComponent` 테스트 코드는 목 서비스로 대체된 코드로 처리되기 때문에 아무런 문제가 발생하지 않습니다.
목 객체는 이렇게 정의되어 있습니다:

<code-example header="app/hero/hero-detail.component.spec.ts (HeroDetailServiceSpy)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="hds-spy"></code-example>


<a id="override-tests"></a>

<!--
#### The override tests
-->
#### 오버라이드를 활용한 테스트 코드

<!--
Now the tests can control the component's hero directly by manipulating the spy-stub's `testHero` and confirm that service methods were called.

<code-example header="app/hero/hero-detail.component.spec.ts (override tests)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-tests"></code-example>
-->
이제 컴포넌트 로직은 스파이에 있는 `testHero` 객체를 직접 조작하는 방식으로 테스트할 수 있습니다.

<code-example header="app/hero/hero-detail.component.spec.ts (오버라이드를 활용한 테스트 코드)" path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-tests"></code-example>


<a id="more-overrides"></a>

<!--
#### More overrides
-->
#### 오버라이드 더 활용하기

<!--
The `TestBed.overrideComponent` method can be called multiple times for the same or different components.
The `TestBed` offers similar `overrideDirective`, `overrideModule`, and `overridePipe` methods for digging into and replacing parts of these other classes.

Explore the options and combinations on your own.
-->
`TestBed.overrideComponent()` 메서드는 컴포넌트를 대상으로 여러번 실행할 수도 있습니다.
그리고 이 메서드와 비슷하게 활용할 수 있는 `overrideDirective()`, `overrideModule()`, `overridePipe()` 메서드를 제공하기 때문에, 클래스의 원하는 부분만 대체할 수도 있습니다.

어떻게 활용할 지는 여러분에게 달려있습니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
