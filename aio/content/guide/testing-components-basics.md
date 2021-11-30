<!--
# Basics of testing components
-->
# 컴포넌트 테스트 기본

<!--
A component, unlike all other parts of an Angular application,
combines an HTML template and a TypeScript class.
The component truly is the template and the class _working together_. To adequately test a component, you should test that they work together
as intended.

Such tests require creating the component's host element in the browser DOM,
as Angular does, and investigating the component class's interaction with
the DOM as described by its template.

The Angular `TestBed` facilitates this kind of testing as you'll see in the following sections.
But in many cases, _testing the component class alone_, without DOM involvement,
can validate much of the component's behavior in an straightforward, more obvious way.

<div class="alert is-helpful">

  For a hands-on experience, <live-example name="testing" stackblitz="specs" noDownload>run tests and explore the test code</live-example> in your browser as your read this guide.

  If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>
-->
Angular 애플리케이션을 구성하는 다른 요소와 다르게, 컴포넌트는 HTML 템플릿과 TypeScript 클래스로 구성됩니다.
컴포넌트는 사실 템플릿과 클래스가 _함께 동작하는_ 것이라고 볼 수 있습니다.
그래서 컴포넌트를 테스트한다는 것은 템플릿과 클래스가 의도된 대로 동작하는지 테스트하는 것을 의미합니다.

컴포넌트를 테스트하려면 Angular가 그랬던 것 처럼 브라우저 DOM에 컴포넌트 호스트 엘리먼트를 추가해야 합니다.
그래야 호스트 엘리먼트 안으로 컴포넌트 템플릿이 구성되며, 컴포넌트 클래스가 이 템플릿과 상호작용할 수 있습니다.

컴포넌트 테스트 환경은 Angular `TestBed`로 구성합니다.
이 내용은 아래 섹션에서 자세하게 알아봅시다.

보통은 DOM을 신경쓰지 않고 _클래스만 따로 테스트_ 하기도 합니다.
컴포넌트의 동작만 간단하게 확인한다면 이 방식이 편합니다.


<div class="alert is-helpful">

  이 문서에서 다루는 예제 앱은 <live-example name="testing" stackblitz="specs" noDownload>테스트 코드 확인하고 실행하기</live-example>에서 확인할 수 있습니다.

  이 문서에서 다루는 테스트 기능은 <live-example name="testing" noDownload>브라우저에서 실행하기</live-example>나 <live-example name="testing" downloadOnly>내려받아 로컬에서 실행하기</live-example>에서 확인할 수 있습니다.

</div>


{@a component-class-testing}

<!--
## Component class testing
-->
## 컴포넌트 클래스 테스트하기

<!--
Test a component class on its own as you would test a service class.

Component class testing should be kept very clean and simple.
It should test only a single unit.
At first glance, you should be able to understand
what the test is testing.

Consider this `LightswitchComponent` which toggles a light on and off
(represented by an on-screen message) when the user clicks the button.

<code-example
  path="testing/src/app/demo/demo.ts"
  region="LightswitchComp"
  header="app/demo/demo.ts (LightswitchComp)"></code-example>

You might decide only to test that the `clicked()` method
toggles the light's _on/off_ state and sets the message appropriately.

This component class has no dependencies. To test these types of classes, follow the same steps as you would for a service that has no dependencies:

1. Create a component using the new keyword.
2. Poke at its API.
3. Assert expectations on its public state.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="Lightswitch"
  header="app/demo/demo.spec.ts (Lightswitch tests)"></code-example>

Here is the `DashboardHeroComponent` from the _Tour of Heroes_ tutorial.

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="class"
  header="app/dashboard/dashboard-hero.component.ts (component)"></code-example>

It appears within the template of a parent component,
which binds a _hero_ to the `@Input` property and
listens for an event raised through the _selected_ `@Output` property.

You can test that the class code works without creating the `DashboardHeroComponent`
or its parent component.

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="class-only"
  header="app/dashboard/dashboard-hero.component.spec.ts (class tests)"></code-example>

When a component has dependencies, you might want to use the `TestBed` to both
create the component and its dependencies.

The following `WelcomeComponent` depends on the `UserService` to know the name of the user to greet.

<code-example
  path="testing/src/app/welcome/welcome.component.ts"
  region="class"
  header="app/welcome/welcome.component.ts"></code-example>

You might start by creating a mock of the `UserService` that meets the minimum needs of this component.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="mock-user-service"
  header="app/welcome/welcome.component.spec.ts (MockUserService)"></code-example>

Then provide and inject _both the_ **component** _and the service_ in the `TestBed` configuration.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-before-each"
  header="app/welcome/welcome.component.spec.ts (class-only setup)"></code-example>

Then exercise the component class, remembering to call the [lifecycle hook methods](guide/lifecycle-hooks) as Angular does when running the application.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-tests"
  header="app/welcome/welcome.component.spec.ts (class-only tests)"></code-example>
-->
컴포넌트 클래스를 테스트하는 것은 서비스 클래스를 테스트하는 것과 비슷합니다.

컴포넌트 클래스를 테스트하는 코드는 원하는 동작 하나만 검증할 수 있도록 아주 간단하게 작성해야 합니다.
코드를 처음 보자마자 이 코드가 무엇을 테스트하는 코드인지 알 수 있어야 합니다.

사용자가 버튼을 클릭할 때마다 불을 켜고 끄는 `LightswitchComponent`가 있다고 합시다.
불이 켜진 상태는 화면에 표시되는 메시지로 표현합니다.

<code-example
  path="testing/src/app/demo/demo.ts"
  region="LightswitchComp"
  header="app/demo/demo.ts (LightswitchComp)"></code-example>

이 클래스 코드를 보면 `clicked()` 메서드가 _켜지고/꺼진_ 상태를 토글하면서 메시지를 제대로 출력하는지 검사하면 되겠다고 판단할 수 있습니다.

이 컴포넌트 클래스에 주입되는 의존성 객체는 없습니다.
그렇다면 의존성 객체가 없는 서비스 클래스를 테스트했던 것과 비슷하게 진행하면 됩니다:

1. `new` 키워드로 컴포넌트 인스턴스를 생성합니다.
2. 컴포넌트 메서드를 실행합니다.
3. 컴포넌트 내부 상태가 변경된 것을 확인합니다.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="Lightswitch"
  header="app/demo/demo.spec.ts (Lightswitch 테스트)"></code-example>

_히어로들의 여행_ 튜토리얼에서 다룬 `DashboardHeroComponent` 컴포넌트 코드는 이렇습니다.

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="class"
  header="app/dashboard/dashboard-hero.component.ts (컴포넌트)"></code-example>

이 컴포넌트는 부모 컴포넌트 안에 위치하면서 `@Input` _hero_ 프로퍼티로 데이터를 바인딩 받아오고 `@Output` _selected_ 프로퍼티로 이벤트를 보냅니다.

이 컴포넌트 코드를 테스트하려면 부모 컴포넌트 없이 이렇게 구성하면 됩니다.

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="class-only"
  header="app/dashboard/dashboard-hero.component.spec.ts (클래스 테스트하기)"></code-example>

컴포넌트에 주입되는 의존성 객체가 있다면 `TestBed`에 해당 컴포넌트와 관련 의존성 객체를 모두 등록해야 합니다.

아래 `WelcomeComponent`는 `UserService`를 의존성으로 주입받습니다.

<code-example
  path="testing/src/app/welcome/welcome.component.ts"
  region="class"
  header="app/welcome/welcome.component.ts"></code-example>

이런 경우에는 컴포넌트를 테스트할 때 꼭 필요한 내용만 목으로 구성해서 `UserService`를 구성하면 됩니다.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="mock-user-service"
  header="app/welcome/welcome.component.spec.ts (MockUserService)"></code-example>

이렇게 만든 목 서비스를 **컴포넌트** 와 함께 `TestBed`에 등록하면 컴포넌트에서 의존성으로 주입받을 수 있습니다.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-before-each"
  header="app/welcome/welcome.component.spec.ts (환경설정)"></code-example>

그리고 컴포넌트 클래스가 실제처럼 동작하는 것을 확인하려면 Angular가 자동으로 하는 것처럼 [라이프싸이클 후킹 함수](guide/lifecycle-hooks)를 실행하면 됩니다.

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-tests"
  header="app/welcome/welcome.component.spec.ts (클래스 테스트하기)"></code-example>


<!--
## Component DOM testing
-->
## 컴포넌트 DOM 테스트하기

<!--
Testing the component _class_ is as straightforward as [testing a service](guide/testing-services).

But a component is more than just its class.
A component interacts with the DOM and with other components.
The _class-only_ tests can tell you about class behavior.
They cannot tell you if the component is going to render properly,
respond to user input and gestures, or integrate with its parent and child components.

None of the preceding _class-only_ tests can answer key questions about how the
components actually behave on screen.

- Is `Lightswitch.clicked()` bound to anything such that the user can invoke it?
- Is the `Lightswitch.message` displayed?
- Can the user actually select the hero displayed by `DashboardHeroComponent`?
- Is the hero name displayed as expected (i.e, in uppercase)?
- Is the welcome message displayed by the template of `WelcomeComponent`?

These might not be troubling questions for the preceding simple components illustrated.
But many components have complex interactions with the DOM elements
described in their templates, causing HTML to appear and disappear as
the component state changes.

To answer these kinds of questions, you have to create the DOM elements associated
with the components, you must examine the DOM to confirm that component state
displays properly at the appropriate times, and you must simulate user interaction
with the screen to determine whether those interactions cause the component to
behave as expected.

To write these kinds of test, you'll use additional features of the `TestBed`
as well as other testing helpers.
-->
컴포넌트 _클래스_ 를 테스트하는 것은 [서비스 클래스를 테스트](guide/testing-services)하는 것만큼 쉽습니다.

하지만 컴포넌트에는 클래스만 있는 것이 아닙니다.
컴포넌트는 DOM과 상호작용하기도 하고 다른 컴포넌트와 상호작용하기도 합니다.
그래서 _컴포넌트 클래스만_ 테스트하면 이 컴포넌트가 제대로 렌더링 되는지, 사용자가 입력하는 내용과 이벤트를 제대로 처리하는지, 부모/자식 컴포넌트와 상호작용은 제대로 하는지 확인할 수 없습니다.

컴포넌트 클래스만 테스트하면 화면에서 실제로 동작하는 이런 동작을 검증할 수 없습니다.

- `Lightswitch.clicked()`는 사용자가 조작할 수 있는 무언가와 바인딩되어 있을까?
- `Lightswitch.message`는 화면에 표시되고 있을까?
- `DashboardHeroComponent`에서 사용자가 히어로 한 명을 선택할 수 있을까?
- 히어로 이름은 지정한 형식으로 표시되고 있을까?
- `WelcomeComponent` 템플릿에는 환영 메시지가 제대로 표시되고 있을까?

컴포넌트가 위에서 살펴본 정도로 간단하다면 간단하게 이 질문에 대답할 수 있습니다.
하지만 컴포넌트 상태에 따라 HTML 프래그먼트를 표시하거나 감추면서 템플릿에 있는 DOM 엘리먼트와 복잡하게 상호작용하는 경우는 쉽게 대답할 수 없을 것입니다.

그렇다면 컴포넌트에 해당되는 DOM 엘리먼트를 생성해두고 컴포넌트 상태에 따라 DOM이 제대로 갱신되는지 확인해야 하며, 사용자가 화면을 조작하듯이 상호작용도 시뮬레이션하면서 컴포넌트가 예상대로 동작하는지 확인해야 합니다.

이런 테스트 코드를 작성하려면 `TestBed`와 같은 테스트 유틸을 활용하면 됩니다.


<!--
### CLI-generated tests
-->
### Angular CLI가 생성한 테스트 코드

<!--
The CLI creates an initial test file for you by default when you ask it to
generate a new component.

For example, the following CLI command generates a `BannerComponent` in the `app/banner` folder (with inline template and styles):

<code-example language="sh">
ng generate component banner --inline-template --inline-style --module app
</code-example>

It also generates an initial test file for the component, `banner-external.component.spec.ts`, that looks like this:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v1"
  header="app/banner/banner-external.component.spec.ts (initial)"></code-example>

<div class="alert is-helpful">

Because `compileComponents` is asynchronous, it uses
the [`waitForAsync`](api/core/testing/waitForAsync) utility
function imported from `@angular/core/testing`.

Refer to the [waitForAsync](guide/testing-components-scenarios#waitForAsync) section for more details.

</div>
-->
Angular CLI로 컴포넌트를 새로 생성하면 기본 테스트 코드도 함께 생성됩니다.

아래 명령을 실행하면 `app/banner` 폴더에 `BannerComponent`가 생성됩니다.
그리고 명령을 실행할 때 지정한 대로 템플릿과 스타일이 인라인으로 구성됩니다:

<code-example language="sh" class="code-shell">
ng generate component banner --inline-template --inline-style --module app
</code-example>

명령이 실행되고 나면 기본 테스트 코드가 `banner-external.component.spec.ts` 파일에 생성된 것을 확인할 수 있습니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v1"
  header="app/banner/banner-external.component.spec.ts (기본 코드)"></code-example>

<div class="alert is-helpful">

`compileComponents`는 비동기로 실행되기 때문에 `@angular/core/testing` 라이브러리로 제공되는 [`waitForAsync`](api/core/testing/waitForAsync)를 사용해야 합니다.

자세한 내용은 [waitForAsync](guide/testing-components-scenarios#waitForAsync) 섹션을 참고하세요.

</div>


<!--
### Reduce the setup
-->
### 환경설정 코드 줄이기

<!--
Only the last three lines of this file actually test the component
and all they do is assert that Angular can create the component.

The rest of the file is boilerplate setup code anticipating more advanced tests that _might_ become necessary if the component evolves into something substantial.

You'll learn about these advanced test features in the following sections.
For now, you can radically reduce this test file to a more manageable size:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v2"
  header="app/banner/banner-initial.component.spec.ts (minimal)"></code-example>

In this example, the metadata object passed to `TestBed.configureTestingModule`
simply declares `BannerComponent`, the component to test.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="configureTestingModule">
</code-example>

<div class="alert is-helpful">

There's no need to declare or import anything else.
The default test module is pre-configured with
something like the `BrowserModule` from `@angular/platform-browser`.

Later you'll call `TestBed.configureTestingModule()` with
imports, providers, and more declarations to suit your testing needs.
Optional `override` methods can further fine-tune aspects of the configuration.

</div>
-->
사실 위 코드에서 컴포넌트가 제대로 생성되었는지 테스트하는 코드는 마지막 세 줄입니다.

나머지는 이후에 도입할 테스트 유틸리티까지 고려하면서 컴포넌트를 준비하고 특정 상태로 만드는 환경설정 코드입니다.

테스트 유틸리티에 대해서는 이후 섹션에서 다룹니다.
지금은 꼭 필요한 내용만 남겨서 환경설정 코드를 줄여봅시다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v2"
  header="app/banner/banner-initial.component.spec.ts (최소 코드)"></code-example>

이 예제에서는 `TestBed.configureTestingModule`에 전달하는 메타데이터 객체로 테스트하려는 컴포넌트 `BannerComponent`만 등록했습니다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="configureTestingModule">
</code-example>

<div class="alert is-helpful">

이 코드에서 추가로 선언하거나 로드해야 하는 것은 없습니다.
`@angular/platform-browser`가 제공하는 `BrowserModule`은 기본 설정이 완료된 상태로 제공됩니다.

이후에는 `TestBed.configureTestingModule()`에 다른 모듈을 로드하고, 서비스를 등록하며, 테스트에 필요한 항목들을 추가로 로드해 봅시다.
이 환경설정을 기반으로 특정 부분만 오버라이드 하는 방법도 있습니다.

</div>


{@a create-component}

### _createComponent()_

<!--
After configuring `TestBed`, you call its `createComponent()` method.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="createComponent">
</code-example>

`TestBed.createComponent()` creates an instance of the `BannerComponent`,
adds a corresponding element to the test-runner DOM,
and returns a [`ComponentFixture`](#component-fixture).

<div class="alert is-important">

Do not re-configure `TestBed` after calling `createComponent`.

The `createComponent` method freezes the current `TestBed` definition,
closing it to further configuration.

You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`,
nor `get()`, nor any of the `override...` methods.
If you try, `TestBed` throws an error.

</div>
-->
`TestBed` 환경설정을 끝내고 나면 `TestBed`가 제공하는 `createComponent()` 메서드를 실행할 수 있습니다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="createComponent">
</code-example>

`TestBed.createComponent()` 메서드를 실행하면 `BannerComponent` 인스턴스가 생성되면서 테스트 환경 DOM에 `BannerComponent` 엘리먼트를 추가하고 [`ComponentFixture`](#component-fixture)를 반환합니다.


<div class="alert is-important">

`createComponent`를 실행하고 난 후에는 `TestBed` 구성을 변경하지 마세요.

`createComponent` 메서드는 실행 시점에 지정된 `TestBed` 환경설정을 참조하며, 이후에 변경되는 사항은 반영하지 않습니다.

그리고 `createComponent` 메서드를 실행하고 나면 `configureTestingModule()`, `get()`, `override...` 메소드가 아닌 환경설정 메소드를 실행할 수 없습니다.
이렇게 사용하면 `TestBed`에서 에러가 발생합니다.

</div>


{@a component-fixture}

### _ComponentFixture_

<!--
The [ComponentFixture](api/core/testing/ComponentFixture) is a test harness for interacting with the created component and its corresponding element.

Access the component instance through the fixture and confirm it exists with a Jasmine expectation:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="componentInstance">
</code-example>
-->
[ComponentFixture](api/core/testing/ComponentFixture)는 생성된 컴포넌트 클래스와 컴포넌트 엘리먼트를 직접 조작할 수 있는 테스트 도구입니다.

이 객체와 Jasmine 테스트 함수를 사용하면 컴포넌트 인스턴스의 상태를 검사할 수 있습니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="componentInstance">
</code-example>


### _beforeEach()_

<!--
You will add more tests as this component evolves.
Rather than duplicate the `TestBed` configuration for each test,
you refactor to pull the setup into a Jasmine `beforeEach()` and some supporting variables:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v3"
 ></code-example>

Now add a test that gets the component's element from `fixture.nativeElement` and
looks for the expected text.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-2">
</code-example>
-->
컴포넌트에 기능을 추가하다 보면 더 많은 테스트를 작성해야 할 수 있습니다.
이런 경우에 매 테스트 스펙마다 `TestBed` 환경설정을 반복하는 것보다는 Jasmine이 제공하는 `beforeEach()`에 환경설정 코드를 작성하는 것이 더 좋습니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v3"
 ></code-example>

이제 `fixture.nativeElement`로 컴포넌트 엘리먼트를 참조하는 코드와 이 엘리먼트의 텍스트가 제대로 표시되는지 검사하는 테스트 코드를 작성해 봅시다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-2">
</code-example>


{@a native-element}

### _nativeElement_

<!--
The value of `ComponentFixture.nativeElement` has the `any` type.
Later you'll encounter the `DebugElement.nativeElement` and it too has the `any` type.

Angular can't know at compile time what kind of HTML element the `nativeElement` is or
if it even is an HTML element.
The application might be running on a _non-browser platform_, such as the server or a
[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API),
where the element might have a diminished API or not exist at all.

The tests in this guide are designed to run in a browser so a
`nativeElement` value will always be an `HTMLElement` or
one of its derived classes.

Knowing that it is an `HTMLElement` of some sort, use
the standard HTML `querySelector` to dive deeper into the element tree.

Here's another test that calls `HTMLElement.querySelector` to get the paragraph element and look for the banner text:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-3">
</code-example>
-->
`ComponentFixture.nativeElement`는 `any` 타입입니다.
그리고 이후에 살펴볼 `DebugElement.nativeElement`도 `any` 타입입니다.

Angular는 컴파일 시점에 `nativeElement`가 어떤 종류인지 알 수 없으며, 심지어 이 객체가 HTML 엘리먼트라는 것도 알 수 없습니다.
왜냐하면 Angluar 앱은 서버나 [웹 워커(Web Worker)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 같이 _브라우저가 아닌 플랫폼_ 에서도 실행될 수 있기 때문에 엘리먼트 API 중 일부나 전체가 없을 수 있기 때문입니다.

이 문서에서는 테스트하는 Angular 앱이 브라우저에서 실행된다고 간주하고 `nativeElement`가 `HTMLElement` 종류 중 하나인 것으로 생각하겠습니다.

테스트하는 대상이 `HTMLElement` 종류 중 하나라고 하면 이제 이 엘리먼트를 대상으로 `querySelector`와 같은 메서드를 사용할 수 있기 때문에 엘리먼트 안쪽으로 자유롭게 들어가 볼 수 있습니다.

엘리먼트 템플릿에 있는 문구를 `HTMLElement.querySelector`로 테스트하는 코드는 이렇습니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-3">
</code-example>


{@a debug-element}

### _DebugElement_

<!--
The Angular _fixture_ provides the component's element directly through the `fixture.nativeElement`.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="nativeElement">
</code-example>

This is actually a convenience method, implemented as `fixture.debugElement.nativeElement`.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="debugElement-nativeElement">
</code-example>

There's a good reason for this circuitous path to the element.

The properties of the `nativeElement` depend upon the runtime environment.
You could be running these tests on a _non-browser_ platform that doesn't have a DOM or
whose DOM-emulation doesn't support the full `HTMLElement` API.

Angular relies on the `DebugElement` abstraction to work safely across _all supported platforms_.
Instead of creating an HTML element tree, Angular creates a `DebugElement` tree that wraps the _native elements_ for the runtime platform.
The `nativeElement` property unwraps the `DebugElement` and returns the platform-specific element object.

Because the sample tests for this guide are designed to run only in a browser,
a `nativeElement` in these tests is always an `HTMLElement`
whose familiar methods and properties you can explore within a test.

Here's the previous test, re-implemented with `fixture.debugElement.nativeElement`:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-4">
</code-example>

The `DebugElement` has other methods and properties that
are useful in tests, as you'll see elsewhere in this guide.

You import the `DebugElement` symbol from the Angular core library.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-debug-element">
</code-example>
-->
`fixture.nativeElement`를 참조하면 컴포넌트 엘리먼트에 직접 접근할 수 있습니다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="nativeElement">
</code-example>

이 방법은 확실히 `fixture.debugElement.nativeElement`라고 참조하는 것보다는 편합니다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="debugElement-nativeElement">
</code-example>

참조하는 방식이 약간 혼란스러운 이유가 있습니다.

`nativeElement` 안에 있는 프로퍼티들은 Angular 앱이 실행되는 환경에 따라 달라집니다.
_브라우저가 아닌_ 플랫폼에서 테스트를 실행한다면 DOM이 존재하지 않으며, DOM을 대신하는 객체가 있다고 해도 `HTMLElement`의 모든 API를 제공한다고 보장할 수 없습니다.

그래서 `DebugElement`는 _모든 플랫폼에_ 필요한 기능을 제공하기 위해 도입되었습니다.
Angular는 HTML 엘리먼트 트리를 직접 생성하지 않고 Angular 앱이 실행되는 플랫폼의 _네이티브 엘리먼트_ 를 래핑한 `DebugElement` 트리를 구성합니다.
그리고 `nativeElement` 프로퍼티는 `DebugElement`를 해당 플랫폼에 맞게 풀어 놓은(unwrap) 객체입니다.

이 문서에서는 테스트하려는 앱이 브라우저에서만 실행된다고 가정하기 때문에 `nativeElement`는 항상 `HTMLElement`입니다.
그래서 테스트 코드를 작성할 때 `HTMLElement`가 제공하는 메서드를 자유롭게 사용할 수 있습니다.

이전에 작성한 테스트 코드를 `fixture.debugElement.nativeElement` 방식으로 다시 작성해보면 이렇습니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-4">
</code-example>

이 문서에서 다루는 범위를 벗어나기 때문에 언급하지는 않겠지만, `DebugElement`에는 테스트에 활용할만한 메서드와 프로퍼티가 더 있습니다.

`DebugElement` 심볼은 `@angular/core` 라이브러리에서 불러올 수 있습니다.


{@a by-css}
### _By.css()_

<!--
Although the tests in this guide all run in the browser,
some applications might run on a different platform at least some of the time.

For example, the component might render first on the server as part of a strategy to make the application launch faster on poorly connected devices. The server-side renderer might not support the full HTML element API.
If it doesn't support `querySelector`, the previous test could fail.

The `DebugElement` offers query methods that work for all supported platforms.
These query methods take a _predicate_ function that returns `true` when a node in the `DebugElement` tree matches the selection criteria.

You create a _predicate_ with the help of a `By` class imported from a
library for the runtime platform. Here's the `By` import for the browser platform:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-by">
</code-example>

The following example re-implements the previous test with
`DebugElement.query()` and the browser's `By.css` method.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-5">
</code-example>

Some noteworthy observations:

- The `By.css()` static method selects `DebugElement` nodes
  with a [standard CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors 'CSS selectors').
- The query returns a `DebugElement` for the paragraph.
- You must unwrap that result to get the paragraph element.

When you're filtering by CSS selector and only testing properties of a browser's _native element_, the `By.css` approach might be overkill.

It's often straightforward and more clear to filter with a standard `HTMLElement` method
such as `querySelector()` or `querySelectorAll()`.
-->
이 문서는 브라우저에서 실행되는 Angular 앱을 테스트하는 것으로 간주하고 있지만, 상황에 따라 다른 플랫폼에서 실행해야 하는 경우가 있습니다.

예를 들면, 인터넷 연결 상태가 좋지 않은 애플리케이션에서 첫 화면을 빠르게 띄우기 위해 서버에서 컴포넌트를 미리 렌더링 하는 경우가 있습니다.
하지만 서버 사이드 렌더링을 할 때는 HTML 엘리먼트 API를 온전히 사용할 수 없습니다.
`querySelector`도 지원되지 않기 때문에 위에서 작성한 테스트는 실패할 것입니다.

이 때 모든 플랫폼에서 활용할 수 있는 쿼리 메서드를 `DebugElement`가 제공합니다.
`query()` 메서드는 매칭 함수를 인자로 받는데, 이 매칭 함수는 `DebugElement` 트리를 순회하다가 조건에 맞는 노드를 발견하면 `true`를 반환하는 함수입니다.

매칭 함수는 런타임 플랫폼에 맞는 `By` 클래스를 활용하면 됩니다.
브라우저 플랫폼에서는 이렇게 사용합니다:

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-by">
</code-example>

위 예제에서 `DebugElement.query()`라고 구현했던 것을 `By.css` 메서드로 바꿔보면 이렇습니다.

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-5">
</code-example>

이런 내용을 확인해 보세요:

- `By.css()` 정적 메서드는 [표준 CSS 셀렉터](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors 'CSS selectors')에 해당하는 `DebugElement` 노드를 찾습니다.

- `DebugElement` 에서 `<p>` 엘리먼트를 찾습니다.

- 쿼리 결과는 `nativeElement`로 참조해야 합니다.

그런데 브라우저에서는 엘리먼트를 찾을 때 `By.css`를 사용하는 것이 조금 과할 수 있습니다.

상황에 따라 `HTMLElement`가 제공하는 `querySelector()`나 `querySelectorAll()`을 사용하는 것이 나을 수 있습니다.