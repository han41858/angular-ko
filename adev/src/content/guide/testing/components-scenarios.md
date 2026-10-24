<!--
# Component testing scenarios
-->

<a id="component-testing-scenarios"></a>

# 컴포넌트 테스트 시나리오

<!--
This guide explores common component testing use cases.
-->

이 문서에서는 자주 사용하는 컴포넌트 테스트 사례를 알아봅니다.

<!--
## Component binding
-->

<a id="component-binding"></a>

## 컴포넌트 바인딩

<!--
In the example application, the `Banner` component presents static title text in the HTML template.

After a few changes, the `Banner` component presents a dynamic title by binding to the component's `title` property like this.

```angular-ts {header: "banner.ts"}
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{ title() }}</h1>',
  styles: ['h1 { color: green; font-size: 350%}'],
})
export class Banner {
  title = signal('Test Tour of Heroes');
}
```

As minimal as this is, you decide to add a test to confirm that component actually displays the right content where you think it should.
-->

예제 애플리케이션의 `Banner` 컴포넌트는 HTML 템플릿에 정적인 제목 텍스트를 표시합니다.

코드를 조금 변경해서 컴포넌트의 `title` 프로퍼티를 바인딩하면 동적인 제목을 표시할 수 있습니다.

```angular-ts {header: "banner.ts"}
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{ title() }}</h1>',
  styles: ['h1 { color: green; font-size: 350%}'],
})
export class Banner {
  title = signal('Test Tour of Heroes');
}
```

간단한 기능이지만 컴포넌트가 원하는 위치에 올바른 내용을 표시하는지 확인하는 테스트를 추가해 봅시다.

<!--
### Query for the `<h1>`
-->

<a id="query-for-the-h1"></a>

### `<h1>` 조회하기

<!--
You'll write a sequence of tests that inspect the value of the `<h1>` element that wraps the _title_ property interpolation binding.

You update the `beforeEach` to find that element with a standard HTML `querySelector` and assign it to the `h1` variable.

```ts {header: "banner.component.spec.ts"}
let component: Banner;
let fixture: ComponentFixture<Banner>;
let h1: HTMLElement;

beforeEach(() => {
  fixture = TestBed.createComponent(Banner);
  component = fixture.componentInstance; // Banner test instance
  h1 = fixture.nativeElement.querySelector('h1');
});
```
-->

_title_ 프로퍼티의 문자열 바인딩을 감싸는 `<h1>` 엘리먼트의 값을 확인하는 테스트를 작성하겠습니다.

표준 HTML `querySelector`로 이 엘리먼트를 찾아 `h1` 변수에 할당하도록 `beforeEach`를 수정합니다.

```ts {header: "banner.component.spec.ts"}
let component: Banner;
let fixture: ComponentFixture<Banner>;
let h1: HTMLElement;

beforeEach(() => {
  fixture = TestBed.createComponent(Banner);
  component = fixture.componentInstance; // 테스트할 Banner 인스턴스
  h1 = fixture.nativeElement.querySelector('h1');
});
```

<!--
### `createComponent()` does not bind data
-->

<a id="createcomponent-does-not-bind-data"></a>

### `createComponent()`는 데이터를 바인딩하지 않습니다

<!--
For your first test you'd like to see that the screen displays the default `title`.
Your instinct is to write a test that immediately inspects the `<h1>` like this:

```ts
it('should display original title', () => {
  expect(h1.textContent).toContain(component.title());
});
```

_That test fails_ with the message:

```shell {hideCopy}
expected '' to contain 'Test Tour of Heroes'.
```

Binding happens when Angular performs **change detection**.

In production, change detection kicks in automatically when Angular creates a component or the user enters a keystroke, for example.

The `TestBed.createComponent` does not trigger change detection synchronously; a fact confirmed in the revised test:

```ts
it('no title in the DOM after createComponent()', () => {
  expect(h1.textContent).toEqual('');
});
```
-->

첫 번째 테스트에서는 화면에 기본 `title`이 표시되는지 확인하려고 합니다.
다음과 같이 `<h1>`을 바로 검사하는 테스트를 작성하기 쉽습니다.

```ts
it('should display original title', () => {
  expect(h1.textContent).toContain(component.title());
});
```

하지만 다음 메시지와 함께 _테스트가 실패합니다_.

```shell {hideCopy}
expected '' to contain 'Test Tour of Heroes'.
```

바인딩은 Angular가 **변경 감지**를 실행할 때 이루어집니다.

실제 애플리케이션에서는 Angular가 컴포넌트를 생성하거나 사용자가 키를 입력할 때 변경 감지가 자동으로 실행됩니다.

`TestBed.createComponent`는 변경 감지를 동기적으로 실행하지 않습니다.
수정한 테스트에서 이를 확인할 수 있습니다.

```ts
it('no title in the DOM after createComponent()', () => {
  expect(h1.textContent).toEqual('');
});
```

<!--
### `whenStable()`
-->

### `whenStable()`

<!--
You can tell the `TestBed` to wait for change detection to run with `await fixture.whenStable()`.
Only then does the `<h1>` have the expected title.

```ts
it('should display original title', async () => {
  await fixture.whenStable();
  expect(h1.textContent).toContain(component.title());
});
```

Delayed change detection is intentional and useful.
It gives the tester an opportunity to inspect and change the state of the component _before Angular initiates data binding and calls [lifecycle hooks](guide/components/lifecycle)_.

Here's another test that changes the component's `title` property _before_ calling `fixture.whenStable()`.

```ts
it('should display a different test title', async () => {
  component.title.set('Test Title');
  await fixture.whenStable();
  expect(h1.textContent).toContain('Test Title');
});
```
-->

`await fixture.whenStable()`로 `TestBed`가 변경 감지 실행을 기다리게 할 수 있습니다.
그런 다음에야 `<h1>`에 예상한 제목이 표시됩니다.

```ts
it('should display original title', async () => {
  await fixture.whenStable();
  expect(h1.textContent).toContain(component.title());
});
```

변경 감지를 지연하는 것은 의도된 동작이며 유용합니다.
_Angular가 데이터 바인딩을 시작하고 [라이프사이클 훅](guide/components/lifecycle)을 실행하기 전에_ 테스트에서 컴포넌트 상태를 확인하고 변경할 기회를 제공하기 때문입니다.

다음 테스트는 `fixture.whenStable()`을 실행하기 _전에_ 컴포넌트의 `title` 프로퍼티를 변경합니다.

```ts
it('should display a different test title', async () => {
  component.title.set('Test Title');
  await fixture.whenStable();
  expect(h1.textContent).toContain('Test Title');
});
```

<!--
### Binding signals to inputs
-->

<a id="binding-signals-to-inputs"></a>

### 입력 프로퍼티에 시그널 바인딩하기

<!--
To reflect changes to inputs and listen to outputs you can dynamically bind signals to inputs and functions to outputs.

```ts
import {inputBinding, outputBinding} from '@angular/core';

const fixture = TestBed.createComponent(ValueDisplay, {
  bindings: [
    inputBinding('value', value),
    outputBinding('valueChange', () =>  (/* ... */) ),
  ],
});
```
-->

입력값의 변경을 반영하고 출력 이벤트를 감지하려면 입력 프로퍼티에는 시그널을, 출력 프로퍼티에는 함수를 동적으로 바인딩할 수 있습니다.

```ts
import {inputBinding, outputBinding} from '@angular/core';

const fixture = TestBed.createComponent(ValueDisplay, {
  bindings: [
    inputBinding('value', value),
    outputBinding('valueChange', () =>  (/* ... */) ),
  ],
});
```

<!--
### Change an input value with `dispatchEvent()`
-->

<a id="change-an-input-value-with-dispatchevent"></a>

### `dispatchEvent()`로 입력값 변경하기

<!--
To simulate user input, find the input element and set its `value` property.

But there is an essential, intermediate step.

Angular doesn't know that you set the input element's `value` property.
It won't read that property until you raise the element's `input` event by calling `dispatchEvent()`.

The following example of a component using the `TitleCasePipe` demonstrates the proper sequence.

```ts
it('should convert hero name to Title Case', async () => {
  const hostElement = fixture.nativeElement;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // simulate user entering a new name into the input box
  nameInput.value = 'quick BROWN  fOx';

  // Dispatch a DOM event so that Angular learns of input value change.
  nameInput.dispatchEvent(new Event('input'));

  // Wait for Angular to update the display binding through the title pipe
  await fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```
-->

사용자 입력을 재현하려면 입력 엘리먼트를 찾아 `value` 프로퍼티를 설정합니다.

하지만 그 사이에 꼭 필요한 단계가 있습니다.

Angular는 입력 엘리먼트의 `value` 프로퍼티를 직접 설정했다는 것을 알지 못합니다.
`dispatchEvent()`로 엘리먼트의 `input` 이벤트를 발생시켜야 이 프로퍼티를 읽습니다.

`TitleCasePipe`를 사용하는 다음 컴포넌트 예제에서 올바른 순서를 확인할 수 있습니다.

```ts
it('should convert hero name to Title Case', async () => {
  const hostElement = fixture.nativeElement;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // 사용자가 입력 필드에 새 이름을 입력하는 상황을 재현합니다
  nameInput.value = 'quick BROWN  fOx';

  // Angular가 입력값 변경을 알 수 있도록 DOM 이벤트를 발생시킵니다.
  nameInput.dispatchEvent(new Event('input'));

  // Angular가 title 파이프로 화면의 바인딩을 갱신할 때까지 기다립니다
  await fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```

<!--
## Component with a dependency
-->

<a id="component-with-a-dependency"></a>

## 의존성이 있는 컴포넌트

<!--
Components often have service dependencies.

The `Welcome` component displays a welcome message to the logged-in user.
It knows who the user is based on a property of the injected `UserAuthentication`:

```angular-ts
import {Component, inject, OnInit, signal} from '@angular/core';
import {UserAuthentication} from '../model/user.authentication';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome"><i>{{ welcome() }}</i></h3>',
})
export class Welcome {
  private userAuth = inject(UserAuthentication);
  welcome = signal(
    this.userAuth.isLoggedIn() ? `Welcome, ${this.userAuth.user().name}` : 'Please log in.',
  );
}
```

The `Welcome` component has decision logic that interacts with the service, logic that makes this component worth testing.
-->

컴포넌트는 서비스에 의존하는 경우가 많습니다.

`Welcome` 컴포넌트는 로그인한 사용자에게 환영 메시지를 표시합니다.
주입된 `UserAuthentication`의 프로퍼티로 사용자가 누구인지 확인합니다.

```angular-ts
import {Component, inject, OnInit, signal} from '@angular/core';
import {UserAuthentication} from '../model/user.authentication';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome"><i>{{ welcome() }}</i></h3>',
})
export class Welcome {
  private userAuth = inject(UserAuthentication);
  welcome = signal(
    this.userAuth.isLoggedIn() ? `Welcome, ${this.userAuth.user().name}` : 'Please log in.',
  );
}
```

`Welcome` 컴포넌트에는 서비스와 상호작용하는 판단 로직이 있으므로 테스트할 가치가 있습니다.

<!--
### Provide service test doubles
-->

<a id="provide-service-test-doubles"></a>

### 서비스 테스트 대역 제공하기

<!--
A _component-under-test_ doesn't have to be provided with real services.

Injecting the real `UserAuthentication` could be difficult.
The real service might ask the user for login credentials and attempt to reach an authentication server.
These behaviors can be hard to intercept. Be aware that using test doubles makes the test behave differently from production so use them sparingly.
-->

_테스트할 컴포넌트_ 에 반드시 실제 서비스를 제공할 필요는 없습니다.

실제 `UserAuthentication`을 주입하기 어려울 수 있습니다.
실제 서비스는 사용자에게 로그인 정보를 요구하거나 인증 서버에 접근할 수 있습니다.
이런 동작을 가로채기는 어려울 수 있습니다.
다만 테스트 대역을 사용하면 실제 애플리케이션과 테스트의 동작이 달라진다는 점을 고려해서 필요한 경우에만 사용하세요.

<!--
### Get injected services
-->

<a id="get-injected-services"></a>

### 주입된 서비스 가져오기

<!--
The tests need access to the `UserAuthentication` injected into the `Welcome` component.

Angular has a hierarchical injection system.
There can be injectors at multiple levels, from the root injector created by the `TestBed` down through the component tree.

The safest way to get the injected service, the way that **_always works_**,
is to **get it from the injector of the _component-under-test_**.
The component injector is a property of the fixture's `DebugElement`.

```ts
// UserAuthentication actually injected into the component
userAuth = fixture.debugElement.injector.get(UserAuthentication);
```

HELPFUL: This is _usually_ not necessary. Services are often provided in the root or the TestBed overrides and can be retrieved more easily with `TestBed.inject()` (see below).
-->

테스트에서는 `Welcome` 컴포넌트에 주입된 `UserAuthentication`에 접근해야 합니다.

Angular는 계층적인 의존성 주입 시스템을 사용합니다.
`TestBed`가 생성한 최상위 인젝터부터 컴포넌트 트리 아래까지 여러 수준에 인젝터가 있을 수 있습니다.

주입된 서비스를 가져오는 가장 안전하고 **_항상 동작하는_** 방법은 ***테스트할 컴포넌트* 의 인젝터에서 가져오는 것**입니다.
컴포넌트 인젝터는 픽스처의 `DebugElement` 프로퍼티로 제공됩니다.

```ts
// 컴포넌트에 실제로 주입된 UserAuthentication
userAuth = fixture.debugElement.injector.get(UserAuthentication);
```

참고: _대부분_ 은 이렇게 할 필요가 없습니다.
서비스는 최상위에서 제공하거나 TestBed에서 재정의하는 경우가 많으므로, 아래에서 설명하는 `TestBed.inject()`로 더 간단하게 가져올 수 있습니다.

<!--
### `TestBed.inject()`
-->

### `TestBed.inject()`

<!--
This is easier to remember and less verbose than retrieving a service using the fixture's `DebugElement`.

In this test suite, the _only_ provider of `UserAuthentication` is the root testing module, so it is safe to call `TestBed.inject()` as follows:

```ts
userAuth = TestBed.inject(UserAuthentication);
```

HELPFUL: For a use case in which `TestBed.inject()` does not work, see the [_Override component providers_](#override-component-providers) section that explains when and why you must get the service from the component's injector instead.
-->

픽스처의 `DebugElement`로 서비스를 가져오는 것보다 기억하기 쉽고 코드도 간결합니다.

이 테스트 모음에서 `UserAuthentication`의 _유일한_ 프로바이더는 최상위 테스트 모듈에 있으므로, 다음과 같이 `TestBed.inject()`를 안전하게 사용할 수 있습니다.

```ts
userAuth = TestBed.inject(UserAuthentication);
```

참고: `TestBed.inject()`로 가져올 수 없는 경우는 [_컴포넌트 프로바이더 재정의하기_](#override-component-providers)를 참고하세요.
언제, 왜 컴포넌트 인젝터에서 서비스를 가져와야 하는지 설명합니다.

<!--
### Final setup and tests
-->

<a id="final-setup-and-tests"></a>

### 최종 설정과 테스트

<!--
Here's the complete `beforeEach()`, using `TestBed.inject()`:

```ts
let fixture: ComponentFixture<Welcome>;
let comp: Welcome;
let userAuth: UserAuthentication; // the TestBed injected service
let el: HTMLElement; // the DOM element with the welcome message

beforeEach(() => {
  fixture = TestBed.createComponent(Welcome);
  comp = fixture.componentInstance;

  // UserAuthentication from the root injector
  userAuth = TestBed.inject(UserAuthentication);

  //  get the "welcome" element by CSS selector (e.g., by class name)
  el = fixture.nativeElement.querySelector('.welcome');
});
```

And here are some tests:

```ts
it('should welcome the user', async () => {
  await fixture.whenStable();
  const content = el.textContent;

  expect(content, '"Welcome ..."').toContain('Welcome');
  expect(content, 'expected name').toContain('Test User');
});

it('should welcome "Bubba"', async () => {
  userAuth.user.set({name: 'Bubba'}); // welcome message hasn't been shown yet
  await fixture.whenStable();

  expect(el.textContent).toContain('Bubba');
});

it('should request login if not logged in', async () => {
  userAuth.isLoggedIn.set(false); // welcome message hasn't been shown yet
  await fixture.whenStable();
  const content = el.textContent;

  expect(content, 'not welcomed').not.toContain('Welcome');
  expect(content, '"log in"').toMatch(/log in/i);
});
```

The first is a sanity test; it confirms that the `UserAuthentication` is called and working.

HELPFUL: The 2nd argument of `expect` \(for example, `'expected name'`\) is an optional failure label.
If the expectation fails, Vitest appends this label to the expectation failure message.
In a spec with multiple expectations, it can help clarify what went wrong and which expectation failed.

The remaining tests confirm the logic of the component when the service returns different values.
The second test validates the effect of changing the user name.
The third test checks that the component displays the proper message when there is no logged-in user.
-->

`TestBed.inject()`를 사용하는 전체 `beforeEach()`는 다음과 같습니다.

```ts
let fixture: ComponentFixture<Welcome>;
let comp: Welcome;
let userAuth: UserAuthentication; // TestBed가 주입한 서비스
let el: HTMLElement; // 환영 메시지가 있는 DOM 엘리먼트

beforeEach(() => {
  fixture = TestBed.createComponent(Welcome);
  comp = fixture.componentInstance;

  // 최상위 인젝터의 UserAuthentication
  userAuth = TestBed.inject(UserAuthentication);

  // CSS 셀렉터(예: 클래스 이름)로 "welcome" 엘리먼트를 가져옵니다
  el = fixture.nativeElement.querySelector('.welcome');
});
```

테스트는 다음과 같이 작성합니다.

```ts
it('should welcome the user', async () => {
  await fixture.whenStable();
  const content = el.textContent;

  expect(content, '"Welcome ..."').toContain('Welcome');
  expect(content, 'expected name').toContain('Test User');
});

it('should welcome "Bubba"', async () => {
  userAuth.user.set({name: 'Bubba'}); // 환영 메시지가 아직 표시되지 않았습니다
  await fixture.whenStable();

  expect(el.textContent).toContain('Bubba');
});

it('should request login if not logged in', async () => {
  userAuth.isLoggedIn.set(false); // 환영 메시지가 아직 표시되지 않았습니다
  await fixture.whenStable();
  const content = el.textContent;

  expect(content, 'not welcomed').not.toContain('Welcome');
  expect(content, '"log in"').toMatch(/log in/i);
});
```

첫 번째는 기본 동작을 확인하는 테스트입니다.
`UserAuthentication`이 호출되고 동작하는지 확인합니다.

참고: `expect`의 두 번째 인자\(예: `'expected name'`\)는 선택적으로 지정하는 실패 설명입니다.
검증에 실패하면 Vitest가 실패 메시지에 이 설명을 추가합니다.
검증문이 여러 개 있는 테스트에서는 어떤 문제가 발생했고 어느 검증문이 실패했는지 파악하는 데 도움이 됩니다.

나머지 테스트는 서비스가 서로 다른 값을 반환할 때 컴포넌트 로직을 확인합니다.
두 번째 테스트는 사용자 이름을 변경했을 때의 동작을 검증합니다.
세 번째 테스트는 로그인한 사용자가 없을 때 적절한 메시지를 표시하는지 확인합니다.

<!--
## Component with async service
-->

<a id="component-with-async-service"></a>

## 비동기 서비스를 사용하는 컴포넌트

<!--
In this sample, the `About` component template hosts a `Twain` component.
The `Twain` component displays Mark Twain quotes.

```angular-html
<p class="twain">
  <i>{{ quote | async }}</i>
</p>
<button type="button" (click)="getQuote()">Next quote</button>
@if (errorMessage()) {
  <p class="error">{{ errorMessage() }}</p>
}
```

HELPFUL: The value of the component's `quote` property passes through an `AsyncPipe`.
That means the property returns either a `Promise` or an `Observable`.

In this example, the `TwainQuotes.getQuote()` method tells you that the `quote` property returns an `Observable`.

```ts
getQuote() {
  this.errorMessage.set('');
  this.quote = this.twainQuotes.getQuote().pipe(
    startWith('...'),
    catchError((err: any) => {
      this.errorMessage.set(err.message || err.toString());
      return of('...'); // reset message to placeholder
    }),
  );
}
```

The `Twain` component gets quotes from an injected `TwainQuotes`.
The component starts the returned `Observable` with a placeholder value \(`'...'`\), before the service can return its first quote.

The `catchError` intercepts service errors, prepares an error message, and returns the placeholder value on the success channel.

These are all features you'll want to test.
-->

이 예제에서 `About` 컴포넌트 템플릿에는 `Twain` 컴포넌트가 있습니다.
`Twain` 컴포넌트는 마크 트웨인의 명언을 표시합니다.

```angular-html
<p class="twain">
  <i>{{ quote | async }}</i>
</p>
<button type="button" (click)="getQuote()">Next quote</button>
@if (errorMessage()) {
  <p class="error">{{ errorMessage() }}</p>
}
```

참고: 컴포넌트의 `quote` 프로퍼티 값은 `AsyncPipe`를 통과합니다.
따라서 이 프로퍼티는 `Promise`나 `Observable`을 반환합니다.

이 예제에서는 `TwainQuotes.getQuote()` 메서드를 보면 `quote` 프로퍼티가 `Observable`을 반환한다는 것을 알 수 있습니다.

```ts
getQuote() {
  this.errorMessage.set('');
  this.quote = this.twainQuotes.getQuote().pipe(
    startWith('...'),
    catchError((err: any) => {
      this.errorMessage.set(err.message || err.toString());
      return of('...'); // 메시지를 임시 값으로 되돌립니다
    }),
  );
}
```

`Twain` 컴포넌트는 주입된 `TwainQuotes`에서 명언을 가져옵니다.
서비스가 첫 번째 명언을 반환하기 전에 표시할 수 있도록 반환된 `Observable`을 임시 값\(`'...'`\)으로 시작합니다.

`catchError`는 서비스 오류를 가로채고 오류 메시지를 준비한 뒤, 정상 값 전달 경로로 임시 값을 반환합니다.

이 기능들은 모두 테스트해 보는 것이 좋습니다.

<!--
### Testing by mocking http requests with the `HttpTestingController`.
-->

<a id="testing-by-mocking-http-requests-with-the-httptestingcontroller"></a>

### `HttpTestingController`로 HTTP 요청을 모킹해서 테스트하기

<!--
When testing a component, only the service's public API should matter.
In general, tests themselves should not make calls to remote servers.
They should emulate such calls.

In the case your async service relies on the `HttpClient` to load remote data, it is recommended to return mock responses at the HTTP level with the `HttpTestingController`.

For more details on mocking the `HttpBackend`, refer to the [dedicated guide](guide/http/testing).
-->

컴포넌트를 테스트할 때는 서비스의 공개 API에만 관심을 두어야 합니다.
일반적으로 테스트 자체가 원격 서버에 요청을 보내서는 안 됩니다.
그런 요청을 재현해야 합니다.

비동기 서비스가 `HttpClient`로 원격 데이터를 로드한다면 `HttpTestingController`로 HTTP 수준에서 목 응답을 반환하는 방식을 권장합니다.

`HttpBackend` 모킹에 대한 자세한 내용은 [HTTP 테스트](guide/http/testing) 문서를 참고하세요.

<!--
### Testing by providing a stubbed implementation of a service.
-->

<a id="testing-by-providing-a-stubbed-implementation-of-a-service"></a>

### 서비스의 스텁 구현으로 테스트하기

<!--
When mocking async request at the http level isn't possible, an alternative is to leverage spies.

The setup in this `app/twain/twain-quotes.spec.ts` shows one way to do that:

```ts {header: "twain.spec.ts"}
class TwainQuotesStub implements TwainQuotes {
  private testQuote = 'Test Quote';

  getQuote() {
    return of(this.testQuote);
  }

  // ... Implement everything to conform to the API
}

beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
  });

  fixture = TestBed.createComponent(Twain);
  component = fixture.componentInstance;
  await fixture.whenStable();
  quoteEl = fixture.nativeElement.querySelector('.twain');
});
```

Focus on the how the stub implementation replaces the original one.

```ts
TestBed.configureTestingModule({
  providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
});
```

The stub is designed in such a way that any component or service that injects it will receive the stubbed implementation.
It means that any call to `getQuote` receives an observable with a test quote.

Unlike the real `getQuote()` method, this spy bypasses the server and returns a synchronous observable whose value is available immediately.
-->

HTTP 수준에서 비동기 요청을 모킹할 수 없다면 스파이를 활용할 수 있습니다.

`app/twain/twain-quotes.spec.ts`의 다음 설정은 그 방법 중 하나입니다.

```ts {header: "twain.spec.ts"}
class TwainQuotesStub implements TwainQuotes {
  private testQuote = 'Test Quote';

  getQuote() {
    return of(this.testQuote);
  }

  // ... API에 맞게 모든 기능을 구현합니다
}

beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
  });

  fixture = TestBed.createComponent(Twain);
  component = fixture.componentInstance;
  await fixture.whenStable();
  quoteEl = fixture.nativeElement.querySelector('.twain');
});
```

스텁 구현이 원래 구현을 어떻게 대체하는지 확인해 보세요.

```ts
TestBed.configureTestingModule({
  providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
});
```

이 스텁은 이를 주입하는 모든 컴포넌트나 서비스가 스텁 구현을 받도록 구성되어 있습니다.
따라서 `getQuote`를 호출하면 항상 테스트용 명언이 담긴 옵저버블을 받습니다.

실제 `getQuote()` 메서드와 달리 이 스파이는 서버를 거치지 않고 값을 즉시 사용할 수 있는 동기 옵저버블을 반환합니다.

<!--
### Async test with a Vitest fake timers
-->

<a id="async-test-with-a-vitest-fake-timers"></a>

### Vitest 가상 타이머로 비동기 테스트하기

<!--
To mock async functions like `setTimeout` or `Promise`s, you can leverage Vitest fake timers to control whenever they fire.

```ts
it('should display error when TwainQuotes service fails', async () => {
  class TwainQuotesStub implements TwainQuotes {
    getQuote() {
      return defer(() => {
        return new Promise<string>((_, reject) => {
          setTimeout(() => reject('TwainService test failure'));
        });
      });
    }

    // ... Implement everything to conform to the API
  }

  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
  });

  vi.useFakeTimers(); // setting up the fake timers
  const fixture = TestBed.createComponent(TwainComponent);

  // rendering isn't async, we need to flush
  await vi.runAllTimersAsync();

  await expect(fixture.nativeElement.querySelector('.error')!.textContent).toMatch(/test failure/);
  expect(fixture.nativeElement.querySelector('.twain')!.textContent).toBe('...');

  vi.useRealTimers(); // resets to regular async execution
});
```
-->

`setTimeout`이나 `Promise` 같은 비동기 동작을 모킹할 때는 Vitest 가상 타이머로 실행 시점을 제어할 수 있습니다.

```ts
it('should display error when TwainQuotes service fails', async () => {
  class TwainQuotesStub implements TwainQuotes {
    getQuote() {
      return defer(() => {
        return new Promise<string>((_, reject) => {
          setTimeout(() => reject('TwainService test failure'));
        });
      });
    }

    // ... API에 맞게 모든 기능을 구현합니다
  }

  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: TwainQuotesStub}],
  });

  vi.useFakeTimers(); // 가상 타이머를 설정합니다
  const fixture = TestBed.createComponent(TwainComponent);

  // 렌더링이 비동기가 아니므로 대기 작업을 처리해야 합니다
  await vi.runAllTimersAsync();

  await expect(fixture.nativeElement.querySelector('.error')!.textContent).toMatch(/test failure/);
  expect(fixture.nativeElement.querySelector('.twain')!.textContent).toBe('...');

  vi.useRealTimers(); // 일반적인 비동기 실행으로 되돌립니다
});
```

<!--
### More async tests
-->

<a id="more-async-tests"></a>

### 비동기 테스트 더 알아보기

<!--
With the stubbed service returning async observables, most of your tests will have to be async as well.

Here's a test that demonstrates the data flow you'd expect in the real world.

```ts
class MockTwainQuotes implements TwainQuotes {
  private subject = new Subject<string>();

  getQuote() {
    return this.subject.asObservable();
  }

  emit(val: string) {
    this.subject.next(val);
  }
}

it('should show quote after getQuote (success)', async () => {
  vi.useFakeTimers();

  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: MockTwainQuotes}],
  });

  const fixture = TestBed.createComponent(TwainComponent);
  const twainQuotes = TestBed.inject(TwainQuotes) as MockTwainQuotes;
  await vi.runAllTimersAsync(); // render before the quote is received

  const quoteEl = fixture.nativeElement.querySelector('.twain');
  expect(quoteEl.textContent).toBe('...');

  twainQuotes.emit('Twain Quote'); // emits the quote
  await vi.runAllTimersAsync(); // render with the quote received

  expect(quoteEl.textContent).toBe('Twain Quote');
  expect(fixture.nativeElement.querySelector('.error')).toBeNull();

  vi.useRealTimers();
});
```

Notice that the quote element displays the placeholder value \(`'...'`\) on first rendering.
The first quote hasn't arrived yet.

Then you can assert that the quote element displays the expected text.
-->

스텁 서비스가 비동기 옵저버블을 반환한다면 대부분의 테스트도 비동기로 작성해야 합니다.

다음 테스트는 실제 환경에서 예상하는 데이터 흐름을 보여줍니다.

```ts
class MockTwainQuotes implements TwainQuotes {
  private subject = new Subject<string>();

  getQuote() {
    return this.subject.asObservable();
  }

  emit(val: string) {
    this.subject.next(val);
  }
}

it('should show quote after getQuote (success)', async () => {
  vi.useFakeTimers();

  TestBed.configureTestingModule({
    providers: [{provide: TwainQuotes, useClass: MockTwainQuotes}],
  });

  const fixture = TestBed.createComponent(TwainComponent);
  const twainQuotes = TestBed.inject(TwainQuotes) as MockTwainQuotes;
  await vi.runAllTimersAsync(); // 명언을 받기 전에 렌더링합니다

  const quoteEl = fixture.nativeElement.querySelector('.twain');
  expect(quoteEl.textContent).toBe('...');

  twainQuotes.emit('Twain Quote'); // 명언을 발행합니다
  await vi.runAllTimersAsync(); // 명언을 받은 상태로 렌더링합니다

  expect(quoteEl.textContent).toBe('Twain Quote');
  expect(fixture.nativeElement.querySelector('.error')).toBeNull();

  vi.useRealTimers();
});
```

처음 렌더링할 때 명언 엘리먼트에 임시 값\(`'...'`\)이 표시되는 것을 확인해 보세요.
아직 첫 번째 명언이 도착하지 않았기 때문입니다.

그런 다음 명언 엘리먼트에 예상한 텍스트가 표시되는지 검증할 수 있습니다.

<!--
### Async tests with `zone.js` and `fakeAsync`
-->

<a id="async-tests-with-zonejs-and-fakeasync"></a>

### `zone.js`와 `fakeAsync`로 비동기 테스트하기

<!--
The `fakeAsync` helper function is another mock clock that relies on patching asynchronous APIs with `zone.js`. It was commonly used in `zone.js` based applications for testing. The use of `fakeAsync` is no longer recommended.

TIP: Prefer using native async testing strategies or other fake timers (also called mock clocks) like those from Vitest or Jasmine.

IMPORTANT: `fakeAsync` requires `zone.js`. To use it with the Vitest test runner, add the `zone.js/plugins/vitest-patch` polyfill as described in [the Vitest migration guide](guide/testing/migrating-to-vitest#zonejs-vitest-patch).
-->

`fakeAsync` 헬퍼 함수도 가상 시계를 제공합니다.
`zone.js`로 비동기 API를 패치하는 방식이며, `zone.js` 기반 애플리케이션의 테스트에서 자주 사용했습니다.
이제는 `fakeAsync` 사용을 권장하지 않습니다.

팁: 네이티브 비동기 테스트 방식이나 Vitest, Jasmine이 제공하는 가상 타이머(목 시계라고도 합니다)를 우선 사용하세요.

중요: `fakeAsync`에는 `zone.js`가 필요합니다. Vitest 테스트 러너에서 사용하려면 [Vitest 마이그레이션 가이드](guide/testing/migrating-to-vitest#zonejs-vitest-patch)에 설명된 대로 `zone.js/plugins/vitest-patch` 폴리필을 추가하세요.

<!--
## Component with inputs and outputs
-->

<a id="component-with-inputs-and-outputs"></a>

## 입력과 출력이 있는 컴포넌트

<!--
A component with inputs and outputs typically appears inside the view template of a host component.
The host uses a property binding to set the input property and an event binding to listen to events raised by the output property.

The testing goal is to verify that such bindings work as expected.
The tests should set input values and listen for output events.

The `DashboardHero` component is a tiny example of a component in this role.
It displays an individual hero provided by the `Dashboard` component.
Clicking that hero tells the `Dashboard` component that the user has selected the hero.

The `DashboardHero` component is embedded in the `Dashboard` component template like this:

```angular-html
@for (hero of heroes; track hero) {
  <dashboard-hero class="col-1-4" [hero]="hero" (selected)="gotoDetail($event)" />
}
```

The `DashboardHero` component appears in an `@for` block, which sets each component's `hero` input property to the looping value and listens for the component's `selected` event.

Here's the component's full definition:

```angular-ts
@Component({
  selector: 'dashboard-hero',
  imports: [UpperCasePipe],
  template: `
    <button type="button" (click)="click()" class="hero">
      {{ hero().name | uppercase }}
    </button>
  `,
})
export class DashboardHero {
  readonly hero = input.required<Hero>();
  readonly selected = output<Hero>();

  click() {
    this.selected.emit(this.hero());
  }
}
```

While testing a component this simple has little intrinsic value, it's worth knowing how.
Use one of these approaches:

- Test it as used by the `Dashboard` component
- Test it as a standalone component
- Test it as used by a substitute for the `Dashboard` component

The immediate goal is to test the `DashboardHero` component, not the `Dashboard` component, so, try the second and third options.
-->

입력과 출력이 있는 컴포넌트는 보통 호스트 컴포넌트의 뷰 템플릿 안에 있습니다.
호스트는 프로퍼티 바인딩으로 입력 프로퍼티를 지정하고, 이벤트 바인딩으로 출력 프로퍼티가 발생시키는 이벤트를 감지합니다.

이런 바인딩이 예상대로 동작하는지 검증하는 것이 테스트의 목표입니다.
테스트에서는 입력값을 설정하고 출력 이벤트를 감지해야 합니다.

`DashboardHero`는 이런 역할을 하는 간단한 컴포넌트입니다.
`Dashboard` 컴포넌트가 제공하는 히어로 하나를 표시합니다.
사용자가 히어로를 클릭하면 `Dashboard` 컴포넌트에 선택한 히어로를 알립니다.

`DashboardHero` 컴포넌트는 `Dashboard` 템플릿에 다음과 같이 들어갑니다.

```angular-html
@for (hero of heroes; track hero) {
  <dashboard-hero class="col-1-4" [hero]="hero" (selected)="gotoDetail($event)" />
}
```

`DashboardHero` 컴포넌트는 `@for` 블록 안에 있습니다.
각 컴포넌트의 `hero` 입력 프로퍼티를 반복 중인 값으로 지정하고 컴포넌트의 `selected` 이벤트를 감지합니다.

컴포넌트 전체 정의는 다음과 같습니다.

```angular-ts
@Component({
  selector: 'dashboard-hero',
  imports: [UpperCasePipe],
  template: `
    <button type="button" (click)="click()" class="hero">
      {{ hero().name | uppercase }}
    </button>
  `,
})
export class DashboardHero {
  readonly hero = input.required<Hero>();
  readonly selected = output<Hero>();

  click() {
    this.selected.emit(this.hero());
  }
}
```

이렇게 간단한 컴포넌트는 테스트 자체의 이점이 크지 않지만, 테스트 방법은 알아둘 만합니다.
다음 방법 중 하나를 사용할 수 있습니다.

- `Dashboard` 컴포넌트에서 사용하는 상태로 테스트합니다.
- 독립적인 컴포넌트로 테스트합니다.
- `Dashboard`를 대신하는 컴포넌트에서 사용하는 상태로 테스트합니다.

지금은 `Dashboard`가 아니라 `DashboardHero`를 테스트하는 것이 목표이므로 두 번째와 세 번째 방법을 살펴봅시다.

<!--
### Test the `DashboardHero` component standalone
-->

<a id="test-the-dashboardhero-component-standalone"></a>

### `DashboardHero` 컴포넌트를 독립적으로 테스트하기

<!--
Here's the meat of the spec file setup.

```ts
let fixture: ComponentFixture<DashboardHero>;
let comp: DashboardHero;
let heroDe: DebugElement;
let heroEl: HTMLElement;
let expectedHero: Hero;

beforeEach(async () => {
  fixture = TestBed.createComponent(DashboardHero);
  comp = fixture.componentInstance;

  // find the hero's DebugElement and element
  heroDe = fixture.debugElement.query(By.css('.hero'));
  heroEl = heroDe.nativeElement;

  // mock the hero supplied by the parent component
  expectedHero = {id: 42, name: 'Test Name'};

  // simulate the parent setting the input property with that hero
  fixture.componentRef.setInput('hero', expectedHero);

  // wait for initial data binding
  await fixture.whenStable();
});
```

Notice how the setup code assigns a test hero \(`expectedHero`\) to the component's `hero` property, emulating the way the `Dashboard` would set it using the property binding in its repeater.

The following test verifies that the hero name is propagated to the template using a binding.

```ts
it('should display hero name in uppercase', () => {
  const expectedPipedName = expectedHero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});
```

Because the template passes the hero name through the Angular `UpperCasePipe`, the test must match the element value with the upper-cased name.
-->

테스트 파일 설정의 핵심 부분은 다음과 같습니다.

```ts
let fixture: ComponentFixture<DashboardHero>;
let comp: DashboardHero;
let heroDe: DebugElement;
let heroEl: HTMLElement;
let expectedHero: Hero;

beforeEach(async () => {
  fixture = TestBed.createComponent(DashboardHero);
  comp = fixture.componentInstance;

  // 히어로의 DebugElement와 엘리먼트를 찾습니다
  heroDe = fixture.debugElement.query(By.css('.hero'));
  heroEl = heroDe.nativeElement;

  // 부모 컴포넌트가 제공하는 히어로를 모킹합니다
  expectedHero = {id: 42, name: 'Test Name'};

  // 부모가 해당 히어로를 입력 프로퍼티에 지정하는 상황을 재현합니다
  fixture.componentRef.setInput('hero', expectedHero);

  // 초기 데이터 바인딩을 기다립니다
  await fixture.whenStable();
});
```

설정 코드가 테스트용 히어로\(`expectedHero`\)를 컴포넌트의 `hero` 프로퍼티에 할당하는 방식을 확인해 보세요.
`Dashboard`가 반복문 안의 프로퍼티 바인딩으로 값을 지정하는 방식을 재현합니다.

다음 테스트는 히어로 이름이 바인딩을 통해 템플릿에 전달되는지 검증합니다.

```ts
it('should display hero name in uppercase', () => {
  const expectedPipedName = expectedHero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});
```

템플릿에서 히어로 이름에 Angular `UpperCasePipe`를 적용하므로, 테스트에서도 대문자로 변환한 이름과 엘리먼트 값을 비교해야 합니다.

<!--
### Clicking
-->

<a id="clicking"></a>

### 클릭하기

<!--
Clicking the hero should raise a `selected` event that the host component \(`Dashboard` presumably\) can hear:

```ts
it('should raise selected event when clicked (triggerEventHandler)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  heroDe.triggerEventHandler('click');
  expect(selectedHero).toBe(expectedHero);
});
```

The component's `selected` property is an `OutputEmitterRef`, whose `subscribe` method notifies subscribers synchronously.
The test subscribes to it _explicitly_ just as the host component does _implicitly_.

If the component behaves as expected, clicking the hero's element should tell the component's `selected` property to emit the `hero` object.

The test detects that event through its subscription to `selected`.
-->

히어로를 클릭하면 호스트 컴포넌트\(이 경우에는 `Dashboard`\)가 감지할 수 있는 `selected` 이벤트가 발생해야 합니다.

```ts
it('should raise selected event when clicked (triggerEventHandler)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  heroDe.triggerEventHandler('click');
  expect(selectedHero).toBe(expectedHero);
});
```

컴포넌트의 `selected` 프로퍼티는 `OutputEmitterRef`입니다. 이 객체의 `subscribe` 메서드는 구독자에게 동기적으로 알립니다.
호스트 컴포넌트가 _묵시적으로_ 구독하는 것을 테스트에서는 _명시적으로_ 구독합니다.

컴포넌트가 예상대로 동작한다면 히어로 엘리먼트를 클릭했을 때 `selected` 프로퍼티가 `hero` 객체를 발행해야 합니다.

테스트는 `selected` 구독을 통해 이 이벤트를 감지합니다.

<!--
### `triggerEventHandler`
-->

### `triggerEventHandler`

<!--
The `heroDe` in the previous test is a `DebugElement` that represents the hero `<button>`.

It has Angular properties and methods that abstract interaction with the native element.
This test calls the `DebugElement.triggerEventHandler` with the "click" event name.
The "click" event binding responds by calling `DashboardHero.click()`.

The Angular `DebugElement.triggerEventHandler` can raise _any data-bound event_ by its _event name_.
The second parameter is the event object passed to the handler.

The test triggered a "click" event.

```ts
heroDe.triggerEventHandler('click');
```

In this case, the test correctly assumes that the runtime event handler, the component's `click()` method, doesn't care about the event object.

HELPFUL: Other handlers are less forgiving.
For example, the `RouterLink` directive expects an object with a `button` property that identifies which mouse button, if any, was pressed during the click.
The `RouterLink` directive throws an error if the event object is missing.
-->

앞의 테스트에서 `heroDe`는 히어로 `<button>`를 나타내는 `DebugElement`입니다.

네이티브 엘리먼트와의 상호작용을 추상화하는 Angular 프로퍼티와 메서드를 제공합니다.
이 테스트는 이벤트 이름 "click"을 전달해서 `DebugElement.triggerEventHandler`를 실행합니다.
"click" 이벤트 바인딩은 이에 반응해서 `DashboardHero.click()`을 실행합니다.

Angular `DebugElement.triggerEventHandler`는 _이벤트 이름_ 으로 _데이터 바인딩된 모든 이벤트_ 를 발생시킬 수 있습니다.
두 번째 인자는 핸들러에 전달할 이벤트 객체입니다.

테스트에서는 "click" 이벤트를 발생시켰습니다.

```ts
heroDe.triggerEventHandler('click');
```

이 경우에는 실제 이벤트 핸들러인 컴포넌트의 `click()` 메서드가 이벤트 객체를 사용하지 않는다는 가정이 맞습니다.

참고: 다른 핸들러에서는 그렇지 않을 수 있습니다.
예를 들어 `RouterLink` 디렉티브는 클릭할 때 어떤 마우스 버튼을 눌렀는지 나타내는 `button` 프로퍼티가 있는 객체를 기대합니다.
이벤트 객체를 전달하지 않으면 `RouterLink` 디렉티브에서 오류가 발생합니다.

<!--
### Click the element
-->

<a id="click-the-element"></a>

### 엘리먼트 클릭하기

<!--
The following test alternative calls the native element's own `click()` method, which is perfectly fine for _this component_.

```ts
it('should raise selected event when clicked (element.click)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  heroEl.click();
  expect(selectedHero).toBe(expectedHero);
});
```
-->

다음과 같이 네이티브 엘리먼트 자체의 `click()` 메서드를 실행하는 방법도 있습니다.
_이 컴포넌트_ 에는 적절한 방법입니다.

```ts
it('should raise selected event when clicked (element.click)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  heroEl.click();
  expect(selectedHero).toBe(expectedHero);
});
```

<!--
### `click()` helper
-->

<a id="click-helper"></a>

### `click()` 헬퍼

<!--
Clicking a button, an anchor, or an arbitrary HTML element is a common test task.

Make that consistent and straightforward by encapsulating the _click-triggering_ process in a helper such as the following `click()` function:

```ts
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2},
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left,
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
```

The first parameter is the _element-to-click_.
If you want, pass a custom event object as the second parameter.
The default is a partial [left-button mouse event object](https://developer.mozilla.org/docs/Web/API/MouseEvent/button) accepted by many handlers including the `RouterLink` directive.

IMPORTANT: The `click()` helper function is **not** one of the Angular testing utilities.
It's a function defined in _this guide's sample code_.
All of the sample tests use it.
If you like it, add it to your own collection of helpers.

Here's the previous test, rewritten using the click helper.

```ts
it('should raise selected event when clicked (click helper with DebugElement)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  click(heroDe); // click helper with DebugElement

  expect(selectedHero).toBe(expectedHero);
});
```
-->

버튼, 링크, 임의의 HTML 엘리먼트를 클릭하는 것은 테스트에서 자주 하는 작업입니다.

다음 `click()` 함수처럼 _클릭을 발생시키는_ 과정을 헬퍼로 감싸면 일관되고 간단하게 사용할 수 있습니다.

```ts
/** RouterLink 이벤트 핸들러를 위해 `DebugElement.triggerEventHandler`에 전달할 버튼 이벤트 */
export const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2},
};

/** 엘리먼트 클릭을 재현합니다. 기본값은 마우스 왼쪽 버튼 클릭 이벤트입니다. */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left,
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
```

첫 번째 인자는 _클릭할 엘리먼트_ 입니다.
필요하면 두 번째 인자로 커스텀 이벤트 객체를 전달하세요.
기본값은 `RouterLink` 디렉티브를 비롯한 여러 핸들러가 처리할 수 있는 [마우스 왼쪽 버튼 이벤트 객체](https://developer.mozilla.org/docs/Web/API/MouseEvent/button)의 일부입니다.

중요: `click()` 헬퍼 함수는 Angular 테스트 유틸리티가 **아닙니다**.
_이 문서의 예제 코드_ 에 정의한 함수입니다.
모든 예제 테스트가 이 함수를 사용합니다.
유용하다면 직접 사용하는 헬퍼 모음에 추가해 보세요.

앞의 테스트를 click 헬퍼로 다시 작성하면 다음과 같습니다.

```ts
it('should raise selected event when clicked (click helper with DebugElement)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

  click(heroDe); // DebugElement에 click 헬퍼를 사용합니다

  expect(selectedHero).toBe(expectedHero);
});
```

<!--
## Component inside a test host
-->

<a id="component-inside-a-test-host"></a>

## 테스트 호스트 안의 컴포넌트

<!--
The previous tests played the role of the host `Dashboard` component themselves.
But does the `DashboardHero` component work correctly when properly data-bound to a host component?

```angular-ts
@Component({
  imports: [DashboardHero],
  template: ` <dashboard-hero [hero]="hero" (selected)="onSelected($event)" />`,
})
class TestHost {
  hero: Hero = {id: 42, name: 'Test Name'};
  selectedHero: Hero | undefined;

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}
```

The test host sets the component's `hero` input property with its test hero.
It binds the component's `selected` event with its `onSelected` handler, which records the emitted hero in its `selectedHero` property.

Later, the tests will be able to check `selectedHero` to verify that the `DashboardHero.selected` event emitted the expected hero.

The setup for the `test-host` tests is similar to the setup for the stand-alone tests:

```ts
beforeEach(async () => {
  // create TestHost instead of DashboardHero
  fixture = TestBed.createComponent(TestHost);
  testHost = fixture.componentInstance;
  heroEl = fixture.nativeElement.querySelector('.hero');

  await fixture.whenStable();
});
```

This testing module configuration shows two important differences:

- It _creates_ the `TestHost` component instead of the `DashboardHero`
- The `TestHost` component sets the `DashboardHero.hero` with a binding

The `createComponent` returns a `fixture` that holds an instance of `TestHost` instead of an instance of `DashboardHero`.

Creating the `TestHost` has the side effect of creating a `DashboardHero` because the latter appears within the template of the former.
The query for the hero element \(`heroEl`\) still finds it in the test DOM, albeit at greater depth in the element tree than before.

The tests themselves are almost identical to the stand-alone version:

```ts
it('should display hero name', () => {
  const expectedPipedName = testHost.hero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});

it('should raise selected event when clicked', () => {
  click(heroEl);
  // selected hero should be the same data bound hero
  expect(testHost.selectedHero).toBe(testHost.hero);
});
```

Only the selected event test differs.
It confirms that the selected `DashboardHero` hero really does find its way up through the event binding to the host component.
-->

앞의 테스트는 호스트인 `Dashboard` 컴포넌트의 역할을 직접 수행했습니다.
그렇다면 `DashboardHero`를 호스트 컴포넌트에 실제로 데이터 바인딩했을 때도 제대로 동작할까요?

```angular-ts
@Component({
  imports: [DashboardHero],
  template: ` <dashboard-hero [hero]="hero" (selected)="onSelected($event)" />`,
})
class TestHost {
  hero: Hero = {id: 42, name: 'Test Name'};
  selectedHero: Hero | undefined;

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}
```

테스트 호스트는 테스트용 히어로를 컴포넌트의 `hero` 입력 프로퍼티로 지정합니다.
또한 컴포넌트의 `selected` 이벤트를 `onSelected` 핸들러에 바인딩하고, 이 핸들러는 전달받은 히어로를 `selectedHero` 프로퍼티에 저장합니다.

이후 테스트에서는 `selectedHero`를 확인해서 `DashboardHero.selected` 이벤트가 예상한 히어로를 전달했는지 검증할 수 있습니다.

`test-host` 테스트의 설정은 독립적인 테스트 설정과 비슷합니다.

```ts
beforeEach(async () => {
  // DashboardHero 대신 TestHost를 생성합니다
  fixture = TestBed.createComponent(TestHost);
  testHost = fixture.componentInstance;
  heroEl = fixture.nativeElement.querySelector('.hero');

  await fixture.whenStable();
});
```

이 테스트 모듈 설정에는 두 가지 중요한 차이가 있습니다.

- `DashboardHero` 대신 `TestHost` 컴포넌트를 _생성_ 합니다.
- `TestHost` 컴포넌트가 바인딩으로 `DashboardHero.hero`를 지정합니다.

`createComponent`는 `DashboardHero`가 아닌 `TestHost` 인스턴스를 담은 `fixture`를 반환합니다.

`TestHost` 템플릿에 `DashboardHero`가 있으므로 `TestHost`를 생성하면 `DashboardHero`도 함께 생성됩니다.
히어로 엘리먼트\(`heroEl`\)는 이전보다 엘리먼트 트리의 더 깊은 곳에 있지만, 쿼리로 여전히 테스트 DOM에서 찾을 수 있습니다.

테스트 자체는 독립적인 테스트와 거의 같습니다.

```ts
it('should display hero name', () => {
  const expectedPipedName = testHost.hero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});

it('should raise selected event when clicked', () => {
  click(heroEl);
  // 선택한 히어로는 데이터 바인딩한 히어로와 같아야 합니다
  expect(testHost.selectedHero).toBe(testHost.hero);
});
```

선택 이벤트 테스트만 다릅니다.
선택한 `DashboardHero`의 히어로가 이벤트 바인딩을 거쳐 호스트 컴포넌트까지 실제로 전달되는지 확인합니다.

<!--
## Routing component
-->

<a id="routing-component"></a>

## 라우팅을 실행하는 컴포넌트

<!--
A _routing component_ is a component that tells the `Router` to navigate to another component.
The `Dashboard` component is a _routing component_ because the user can navigate to the `HeroDetail` component by clicking on one of the _hero buttons_ on the dashboard.

Angular provides test helpers to reduce boilerplate and more effectively test code which depends on `HttpClient`. The `provideRouter` function can be used directly in the test module as well.

```ts
beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([{path: '**', component: Dashboard}]),
      provideHttpClientTesting(),
      HeroService,
    ],
  });
  harness = await RouterTestingHarness.create();
  comp = await harness.navigateByUrl('/', Dashboard);
  TestBed.inject(HttpTestingController).expectOne('api/heroes').flush(getTestHeroes());
});
```

The following test clicks the displayed hero and confirms that we navigate to the expected URL.

```ts
it('should tell navigate when hero clicked', async () => {
  // get first <dashboard-hero> DebugElement
  const heroDe = harness.routeDebugElement!.query(By.css('dashboard-hero'));
  heroDe.triggerEventHandler('selected', comp.heroes[0]);

  // expecting to navigate to id of the component's first hero
  const id = comp.heroes[0].id;
  expect(TestBed.inject(Router).url, 'should nav to HeroDetail for first hero').toEqual(
    `/heroes/${id}`,
  );
});
```
-->

_라우팅을 실행하는 컴포넌트_ 는 `Router`에 다른 컴포넌트로 이동하도록 요청하는 컴포넌트입니다.
사용자가 대시보드의 _히어로 버튼_ 을 클릭하면 `HeroDetail`로 이동할 수 있으므로 `Dashboard`는 _라우팅을 실행하는 컴포넌트_ 입니다.

Angular는 기본 설정 코드를 줄이고 `HttpClient`에 의존하는 코드를 더 효과적으로 테스트하는 헬퍼를 제공합니다.
테스트 모듈에서 `provideRouter` 함수도 직접 사용할 수 있습니다.

```ts
beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([{path: '**', component: Dashboard}]),
      provideHttpClientTesting(),
      HeroService,
    ],
  });
  harness = await RouterTestingHarness.create();
  comp = await harness.navigateByUrl('/', Dashboard);
  TestBed.inject(HttpTestingController).expectOne('api/heroes').flush(getTestHeroes());
});
```

다음 테스트는 화면의 히어로를 클릭하고 예상한 URL로 이동하는지 확인합니다.

```ts
it('should tell navigate when hero clicked', async () => {
  // 첫 번째 <dashboard-hero>의 DebugElement를 가져옵니다
  const heroDe = harness.routeDebugElement!.query(By.css('dashboard-hero'));
  heroDe.triggerEventHandler('selected', comp.heroes[0]);

  // 컴포넌트의 첫 번째 히어로 ID로 이동해야 합니다
  const id = comp.heroes[0].id;
  expect(TestBed.inject(Router).url, 'should nav to HeroDetail for first hero').toEqual(
    `/heroes/${id}`,
  );
});
```

<!--
## Routed components
-->

<a id="routed-components"></a>

## 라우팅 대상 컴포넌트

<!--
A _routed component_ is the destination of a `Router` navigation.
It can be trickier to test, especially when the route to the component _includes parameters_.
The `HeroDetail` is a _routed component_ that is the destination of such a route.

When a user clicks a _Dashboard_ hero, the `Dashboard` tells the `Router` to navigate to `heroes/:id`.
The `:id` is a route parameter whose value is the `id` of the hero to edit.

The `Router` matches that URL to a route to the `HeroDetail`.
It creates an `ActivatedRoute` object with the routing information and injects it into a new instance of the `HeroDetail`.

Here are the services injected into `HeroDetail`:

```ts
private heroDetailService = inject(HeroDetailService);
private route = inject(ActivatedRoute);
private router = inject(Router);
```

The `HeroDetail` component needs the `id` parameter so it can fetch the corresponding hero using the `HeroDetailService`.
The component has to get the `id` from the `ActivatedRoute.paramMap` property which is an `Observable`.

It can't just reference the `id` property of the `ActivatedRoute.paramMap`.
The component has to _subscribe_ to the `ActivatedRoute.paramMap` observable and be prepared for the `id` to change during its lifetime.

```ts
constructor() {
  // get hero when `id` param changes
  this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
}
```

Tests can explore how the `HeroDetail` responds to different `id` parameter values by navigating to different routes.
-->

_라우팅 대상 컴포넌트_ 는 `Router`가 이동하는 목적지입니다.
특히 컴포넌트의 라우팅 규칙에 _파라미터가 포함되어 있으면_ 테스트가 더 까다로울 수 있습니다.
`HeroDetail`은 이런 라우팅 규칙의 목적지인 _라우팅 대상 컴포넌트_ 입니다.

사용자가 _Dashboard_ 의 히어로를 클릭하면 `Dashboard`는 `Router`에 `heroes/:id`로 이동하도록 요청합니다.
`:id`는 수정할 히어로의 `id`를 값으로 갖는 라우팅 규칙 파라미터입니다.

`Router`는 이 URL에 대응하는 `HeroDetail` 라우팅 규칙을 찾습니다.
라우팅 정보로 `ActivatedRoute` 객체를 생성한 뒤 새 `HeroDetail` 인스턴스에 주입합니다.

`HeroDetail`에 주입하는 서비스는 다음과 같습니다.

```ts
private heroDetailService = inject(HeroDetailService);
private route = inject(ActivatedRoute);
private router = inject(Router);
```

`HeroDetail` 컴포넌트는 `HeroDetailService`로 해당 히어로를 가져오기 위해 `id` 파라미터가 필요합니다.
컴포넌트는 `Observable`인 `ActivatedRoute.paramMap` 프로퍼티에서 `id`를 가져와야 합니다.

`ActivatedRoute.paramMap`의 `id` 프로퍼티를 단순히 참조할 수는 없습니다.
`ActivatedRoute.paramMap` 옵저버블을 _구독_ 하고 컴포넌트가 동작하는 동안 `id`가 변경될 수 있다는 점에 대비해야 합니다.

```ts
constructor() {
  // `id` 파라미터가 바뀌면 히어로를 가져옵니다
  this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
}
```

서로 다른 라우팅 규칙으로 이동하면 여러 `id` 파라미터 값에 `HeroDetail`이 어떻게 반응하는지 테스트할 수 있습니다.

<!--
## Nested component tests
-->

<a id="nested-component-tests"></a>

## 중첩 컴포넌트 테스트

<!--
Component templates often have nested components, whose templates might contain more components.

The component tree can be very deep and sometimes the nested components play no role in testing the component at the top of the tree.

The `App` component, for example, displays a navigation bar with anchors and their `RouterLink` directives.

```angular-html
<app-banner />
<app-welcome />

<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet />
```

To validate the links but not the navigation, you don't need the `Router` to navigate and you don't need the `<router-outlet>` to mark where the `Router` inserts _routed components_.

The `Banner` and `Welcome` components \(indicated by `<app-banner>` and `<app-welcome>`\) are also irrelevant.

Yet any test that creates the `App` component in the DOM also creates instances of these three components and, if you let that happen, you'll have to configure the `TestBed` to create them.

If you neglect to declare them, the Angular compiler won't recognize the `<app-banner>`, `<app-welcome>`, and `<router-outlet>` tags in the `App` template and will throw an error.

If you declare the real components, you'll also have to declare _their_ nested components and provide for _all_ services injected in _any_ component in the tree.

This section describes two techniques for minimizing the setup.
Use them, alone or in combination, to stay focused on testing the primary component.
-->

컴포넌트 템플릿에는 다른 컴포넌트가 들어가는 경우가 많으며, 그 컴포넌트의 템플릿에도 또 다른 컴포넌트가 있을 수 있습니다.

컴포넌트 트리는 아주 깊어질 수 있고, 중첩된 컴포넌트가 최상위 컴포넌트 테스트에는 필요하지 않은 경우도 있습니다.

예를 들어 `App` 컴포넌트는 링크와 `RouterLink` 디렉티브로 구성된 내비게이션 바를 표시합니다.

```angular-html
<app-banner />
<app-welcome />

<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet />
```

이동 동작이 아니라 링크만 검증한다면 `Router`가 실제로 이동할 필요가 없습니다.
`Router`가 _라우팅 대상 컴포넌트_ 를 삽입할 위치를 표시하는 `<router-outlet>`도 필요하지 않습니다.

`<app-banner>`, `<app-welcome>`으로 표시된 `Banner`, `Welcome` 컴포넌트도 관련이 없습니다.

하지만 DOM에 `App` 컴포넌트를 생성하는 테스트는 이 세 컴포넌트의 인스턴스도 생성합니다.
그대로 생성하려면 `TestBed`에서도 이를 생성할 수 있도록 설정해야 합니다.

선언하지 않으면 Angular 컴파일러는 `App` 템플릿의 `<app-banner>`, `<app-welcome>`, `<router-outlet>` 태그를 인식하지 못하고 오류를 발생시킵니다.

실제 컴포넌트를 선언하면 _그 안의_ 중첩 컴포넌트도 선언해야 하고, 트리에 있는 _모든_ 컴포넌트에 주입되는 _모든_ 서비스도 제공해야 합니다.

여기서는 설정을 줄이는 두 가지 방법을 알아봅니다.
한 가지를 사용하거나 둘을 조합해서 주요 컴포넌트 테스트에 집중할 수 있습니다.

<!--
### Stubbing unneeded components
-->

<a id="stubbing-unneeded-components"></a>

### 불필요한 컴포넌트를 스텁으로 대체하기

<!--
In the first technique, you create and declare stub versions of the components and directive that play little or no role in the tests.

```ts
@Component({selector: 'app-banner', template: ''})
class BannerStub {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStub {}

@Component({selector: 'app-welcome', template: ''})
class WelcomeStub {}
```

The stub selectors match the selectors for the corresponding real components.
But their templates and classes are empty.

Then declare them by overriding the `imports` of your component using `TestBed.overrideComponent`.

```ts
let comp: App;
let fixture: ComponentFixture<App>;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    set: {
      imports: [RouterLink, BannerStub, RouterOutletStub, WelcomeStub],
    },
  });

  fixture = TestBed.createComponent(App);
  comp = fixture.componentInstance;
});
```

HELPFUL: The `set` key in this example replaces all the existing imports on your component, make sure to import all dependencies, not only the stubs. Alternatively you can use the `remove`/`add` keys to selectively remove and add imports.
-->

첫 번째 방법은 테스트에 거의 필요하지 않거나 전혀 필요하지 않은 컴포넌트와 디렉티브의 스텁을 만들어 선언하는 것입니다.

```ts
@Component({selector: 'app-banner', template: ''})
class BannerStub {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStub {}

@Component({selector: 'app-welcome', template: ''})
class WelcomeStub {}
```

스텁의 셀렉터는 실제 컴포넌트와 같습니다.
하지만 템플릿과 클래스는 비어 있습니다.

그런 다음 `TestBed.overrideComponent`로 컴포넌트의 `imports`를 재정의해서 스텁을 선언합니다.

```ts
let comp: App;
let fixture: ComponentFixture<App>;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    set: {
      imports: [RouterLink, BannerStub, RouterOutletStub, WelcomeStub],
    },
  });

  fixture = TestBed.createComponent(App);
  comp = fixture.componentInstance;
});
```

참고: 이 예제의 `set` 키는 컴포넌트의 기존 imports 전체를 교체합니다.
스텁뿐 아니라 필요한 모든 의존성을 로드해야 합니다.
대신 `remove`와 `add` 키로 imports를 선택적으로 제거하고 추가할 수도 있습니다.

<!--
### `NO_ERRORS_SCHEMA`
-->

### `NO_ERRORS_SCHEMA`

<!--
In the second approach, add `NO_ERRORS_SCHEMA` to the metadata overrides of your component.

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    set: {
      imports: [], // resets all imports
      schemas: [NO_ERRORS_SCHEMA],
    },
  });
});
```

The `NO_ERRORS_SCHEMA` tells the Angular compiler to ignore unrecognized elements and attributes.

The compiler recognizes the `<app-root>` element and the `routerLink` attribute because you declared a corresponding `App` component and `RouterLink` in the `TestBed` configuration.

But the compiler won't throw an error when it encounters `<app-banner>`, `<app-welcome>`, or `<router-outlet>`.
It simply renders them as empty tags and the browser ignores them.

You no longer need the stub components.
-->

두 번째 방법은 컴포넌트 메타데이터를 재정의하면서 `NO_ERRORS_SCHEMA`를 추가하는 것입니다.

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    set: {
      imports: [], // 모든 imports를 초기화합니다
      schemas: [NO_ERRORS_SCHEMA],
    },
  });
});
```

`NO_ERRORS_SCHEMA`는 Angular 컴파일러가 인식하지 못하는 엘리먼트와 어트리뷰트를 무시하도록 합니다.

`TestBed` 설정에 대응하는 `App` 컴포넌트와 `RouterLink`를 선언했으므로 컴파일러는 `<app-root>` 엘리먼트와 `routerLink` 어트리뷰트를 인식합니다.

하지만 `<app-banner>`, `<app-welcome>`, `<router-outlet>`을 만나도 오류를 발생시키지 않습니다.
빈 태그로 렌더링하고, 브라우저는 이를 무시합니다.

이제 스텁 컴포넌트가 필요하지 않습니다.

<!--
### Use both techniques together
-->

<a id="use-both-techniques-together"></a>

### 두 방법 함께 사용하기

<!--
These are techniques for _Shallow Component Testing_, so-named because they reduce the visual surface of the component to just those elements in the component's template that matter for tests.

The `NO_ERRORS_SCHEMA` approach is the easier of the two but don't overuse it.

The `NO_ERRORS_SCHEMA` also prevents the compiler from telling you about the missing components and attributes that you omitted inadvertently or misspelled.
You could waste hours chasing phantom bugs that the compiler would have caught in an instant.

The _stub component_ approach has another advantage.
While the stubs in _this_ example were empty, you could give them stripped-down templates and classes if your tests need to interact with them in some way.

In practice you will combine the two techniques in the same setup, as seen in this example.

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    remove: {imports: [RouterOutlet, Welcome]},
    set: {schemas: [NO_ERRORS_SCHEMA]},
  });
});
```

The Angular compiler creates the `BannerStub` for the `<app-banner>` element and applies the `RouterLink` to the anchors with the `routerLink` attribute, but it ignores the `<app-welcome>` and `<router-outlet>` tags.
-->

이런 방식을 _얕은 컴포넌트 테스트(Shallow Component Testing)_ 라고 합니다.
컴포넌트 템플릿에서 테스트에 필요한 엘리먼트만 남겨 화면 구성을 줄이기 때문입니다.

두 방법 중에서는 `NO_ERRORS_SCHEMA`가 간단하지만 남용하지 마세요.

`NO_ERRORS_SCHEMA`를 사용하면 실수로 빠뜨리거나 이름을 잘못 적은 컴포넌트와 어트리뷰트도 컴파일러가 알려주지 못합니다.
컴파일러가 즉시 발견할 수 있는 오류를 찾느라 몇 시간을 허비할 수 있습니다.

_스텁 컴포넌트_ 방식에는 또 다른 장점이 있습니다.
_이_ 예제에서는 스텁이 비어 있지만, 테스트에서 스텁과 상호작용해야 한다면 단순화한 템플릿과 클래스를 제공할 수 있습니다.

실제로는 다음 예제처럼 두 방식을 하나의 설정에서 함께 사용하기도 합니다.

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), UserAuthentication],
  }).overrideComponent(App, {
    remove: {imports: [RouterOutlet, Welcome]},
    set: {schemas: [NO_ERRORS_SCHEMA]},
  });
});
```

Angular 컴파일러는 `<app-banner>` 엘리먼트에 `BannerStub`을 생성하고 `routerLink` 어트리뷰트가 있는 링크에는 `RouterLink`를 적용합니다.
하지만 `<app-welcome>`과 `<router-outlet>` 태그는 무시합니다.

<!--
### `By.directive` and injected directives
-->

<a id="bydirective-and-injected-directives"></a>

### `By.directive`와 주입된 디렉티브

<!--
A little more setup triggers the initial data binding and gets references to the navigation links:

```ts
beforeEach(async () => {
  await fixture.whenStable();

  // find DebugElements with an attached RouterLinkStubDirective
  linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

  // get attached link directive instances
  // using each DebugElement's injector
  routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
});
```

Three points of special interest:

- Locate the anchor elements with an attached directive using `By.directive`
- The query returns `DebugElement` wrappers around the matching elements
- Each `DebugElement` exposes a dependency injector with the specific instance of the directive attached to that element

The `App` component links to validate are as follows:

```angular-html
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/about">About</a>
</nav>
```

Here are some tests that confirm those links are wired to the `routerLink` directives as expected:

```ts
it('can get RouterLinks from template', () => {
  expect(routerLinks.length, 'should have 3 routerLinks').toBe(3);
  expect(routerLinks[0].href).toBe('/dashboard');
  expect(routerLinks[1].href).toBe('/heroes');
  expect(routerLinks[2].href).toBe('/about');
});

it('can click Heroes link in template', async () => {
  const heroesLinkDe = linkDes[1]; // heroes link DebugElement

  TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
  heroesLinkDe.triggerEventHandler('click', {button: 0});

  await fixture.whenStable();

  expect(TestBed.inject(Router).url).toBe('/heroes');
});
```
-->

설정을 조금 더 추가해서 초기 데이터 바인딩을 실행하고 내비게이션 링크의 참조를 가져옵니다.

```ts
beforeEach(async () => {
  await fixture.whenStable();

  // RouterLinkStubDirective가 적용된 DebugElement를 찾습니다
  linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

  // 적용된 링크 디렉티브 인스턴스를 가져옵니다
  // 각 DebugElement의 인젝터를 사용합니다
  routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
});
```

세 가지 내용을 눈여겨보세요.

- `By.directive`로 디렉티브가 적용된 링크 엘리먼트를 찾습니다.
- 쿼리는 일치하는 엘리먼트를 감싼 `DebugElement`를 반환합니다.
- 각 `DebugElement`는 해당 엘리먼트에 적용된 디렉티브 인스턴스가 들어 있는 의존성 인젝터를 제공합니다.

검증할 `App` 컴포넌트의 링크는 다음과 같습니다.

```angular-html
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/about">About</a>
</nav>
```

다음 테스트는 링크가 예상대로 `routerLink` 디렉티브에 연결되는지 확인합니다.

```ts
it('can get RouterLinks from template', () => {
  expect(routerLinks.length, 'should have 3 routerLinks').toBe(3);
  expect(routerLinks[0].href).toBe('/dashboard');
  expect(routerLinks[1].href).toBe('/heroes');
  expect(routerLinks[2].href).toBe('/about');
});

it('can click Heroes link in template', async () => {
  const heroesLinkDe = linkDes[1]; // heroes 링크의 DebugElement

  TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
  heroesLinkDe.triggerEventHandler('click', {button: 0});

  await fixture.whenStable();

  expect(TestBed.inject(Router).url).toBe('/heroes');
});
```

<!--
## Use a `page` object
-->

<a id="use-a-page-object"></a>

## `page` 객체 사용하기

<!--
The `HeroDetail` component is a simple view with a title, two hero fields, and two buttons.

But there's plenty of template complexity even in this simple form.

```angular-html
@if (hero) {
  <div>
    <h2>
      <span>{{ hero.name | titlecase }}</span> Details
    </h2>
    <div><span>id: </span>{{ hero.id }}</div>
    <div>
      <label for="name">name: </label>
      <input id="name" [(ngModel)]="hero.name" placeholder="name" />
    </div>
    <button type="button" (click)="save()">Save</button>
    <button type="button" (click)="cancel()">Cancel</button>
  </div>
}
```

Tests that exercise the component need …

- To wait until a hero arrives before elements appear in the DOM
- A reference to the title text
- A reference to the name input box to inspect and set it
- References to the two buttons so they can click them

Even a small form such as this one can produce a mess of tortured conditional setup and CSS element selection.

Tame the complexity with a `Page` class that handles access to component properties and encapsulates the logic that sets them.

Here is such a `Page` class for the `hero-detail.component.spec.ts`

```ts
class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query<HTMLElement>('span');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return harness.routeNativeElement!.querySelector(selector)! as T;
  }

  private queryAll<T>(selector: string): T[] {
    return harness.routeNativeElement!.querySelectorAll(selector) as any as T[];
  }
}
```

Now the important hooks for component manipulation and inspection are neatly organized and accessible from an instance of `Page`.

A `createComponent` method creates a `page` object and fills in the blanks once the `hero` arrives.

```ts
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetail);
  page = new Page();

  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  await harness.fixture.whenStable();
}
```

Here are a few more `HeroDetail` component tests to reinforce the point.

```ts
it("should display that hero's name", () => {
  expect(page.nameDisplay.textContent).toBe(expectedHero.name);
});

it('should navigate when click cancel', () => {
  click(page.cancelBtn);
  expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
});

it('should save when click save but not navigate immediately', () => {
  click(page.saveBtn);
  expect(TestBed.inject(HttpTestingController).expectOne({method: 'PUT', url: 'api/heroes'}));
  expect(TestBed.inject(Router).url).toEqual('/heroes/41');
});

it('should navigate when click save and save resolves', async () => {
  click(page.saveBtn);
  await harness.fixture.whenStable();
  expect(TestBed.inject(Router).url).toEqual('/heroes/41');
});

it('should convert hero name to Title Case', async () => {
  // get the name's input and display elements from the DOM
  const hostElement: HTMLElement = harness.routeNativeElement!;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // simulate user entering a new name into the input box
  nameInput.value = 'quick BROWN  fOx';

  // Dispatch a DOM event so that Angular learns of input value change.
  nameInput.dispatchEvent(new Event('input'));

  // Wait for Angular to update the display binding through the title pipe
  await harness.fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```
-->

`HeroDetail` 컴포넌트는 제목, 히어로 필드 두 개, 버튼 두 개로 이루어진 간단한 뷰입니다.

하지만 이렇게 간단한 폼도 템플릿은 상당히 복잡할 수 있습니다.

```angular-html
@if (hero) {
  <div>
    <h2>
      <span>{{ hero.name | titlecase }}</span> Details
    </h2>
    <div><span>id: </span>{{ hero.id }}</div>
    <div>
      <label for="name">name: </label>
      <input id="name" [(ngModel)]="hero.name" placeholder="name" />
    </div>
    <button type="button" (click)="save()">Save</button>
    <button type="button" (click)="cancel()">Cancel</button>
  </div>
}
```

컴포넌트를 테스트하려면 다음 내용이 필요합니다.

- DOM에 엘리먼트가 나타나도록 히어로를 가져올 때까지 기다리기
- 제목 텍스트 참조
- 값을 확인하고 설정할 이름 입력 필드 참조
- 클릭할 버튼 두 개의 참조

작은 폼이라도 조건에 따른 설정과 CSS 엘리먼트 선택 코드가 복잡하게 얽힐 수 있습니다.

컴포넌트 프로퍼티에 접근하고 값을 설정하는 로직을 `Page` 클래스로 감싸면 복잡성을 줄일 수 있습니다.

`hero-detail.component.spec.ts`에서 사용할 `Page` 클래스는 다음과 같습니다.

```ts
class Page {
  // getter 프로퍼티는 호출될 때 DOM을 조회합니다.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query<HTMLElement>('span');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  //// 쿼리 헬퍼 ////
  private query<T>(selector: string): T {
    return harness.routeNativeElement!.querySelector(selector)! as T;
  }

  private queryAll<T>(selector: string): T[] {
    return harness.routeNativeElement!.querySelectorAll(selector) as any as T[];
  }
}
```

이제 컴포넌트를 조작하고 확인하는 주요 접근 지점이 잘 정리되었고, `Page` 인스턴스로 접근할 수 있습니다.

`createComponent` 메서드는 `page` 객체를 만들고 `hero`를 가져온 후 필요한 내용을 채웁니다.

```ts
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetail);
  page = new Page();

  const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);
  await harness.fixture.whenStable();
}
```

다음 `HeroDetail` 컴포넌트 테스트에서도 이 방식을 확인해 보세요.

```ts
it("should display that hero's name", () => {
  expect(page.nameDisplay.textContent).toBe(expectedHero.name);
});

it('should navigate when click cancel', () => {
  click(page.cancelBtn);
  expect(TestBed.inject(Router).url).toEqual(`/heroes/${expectedHero.id}`);
});

it('should save when click save but not navigate immediately', () => {
  click(page.saveBtn);
  expect(TestBed.inject(HttpTestingController).expectOne({method: 'PUT', url: 'api/heroes'}));
  expect(TestBed.inject(Router).url).toEqual('/heroes/41');
});

it('should navigate when click save and save resolves', async () => {
  click(page.saveBtn);
  await harness.fixture.whenStable();
  expect(TestBed.inject(Router).url).toEqual('/heroes/41');
});

it('should convert hero name to Title Case', async () => {
  // DOM에서 이름 입력 엘리먼트와 표시 엘리먼트를 가져옵니다
  const hostElement: HTMLElement = harness.routeNativeElement!;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // 사용자가 입력 필드에 새 이름을 입력하는 상황을 재현합니다
  nameInput.value = 'quick BROWN  fOx';

  // Angular가 입력값 변경을 알 수 있도록 DOM 이벤트를 발생시킵니다.
  nameInput.dispatchEvent(new Event('input'));

  // Angular가 title 파이프로 화면의 바인딩을 갱신할 때까지 기다립니다
  await harness.fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```

<!--
## Override component providers
-->

<a id="override-component-providers"></a>

## 컴포넌트 프로바이더 재정의하기

<!--
The `HeroDetail` provides its own `HeroDetailService`.

```ts
@Component({
  /* ... */
  providers: [HeroDetailService],
})
export class HeroDetail {
  private heroDetailService = inject(HeroDetailService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
}
```

It's not possible to stub the component's `HeroDetailService` in the `providers` of the `TestBed.configureTestingModule`.
Those are providers for the _testing module_, not the component.
They prepare the dependency injector at the _fixture level_.

Angular creates the component with its _own_ injector, which is a _child_ of the fixture injector.
It registers the component's providers \(the `HeroDetailService` in this case\) with the child injector.

A test cannot get to child injector services from the fixture injector.
And `TestBed.configureTestingModule` can't configure them either.

Angular has created new instances of the real `HeroDetailService` all along!

HELPFUL: These tests could fail or timeout if the `HeroDetailService` made its own XHR calls to a remote server.
There might not be a remote server to call.

Fortunately, the `HeroDetailService` delegates responsibility for remote data access to an injected `HeroService`.

```ts
@Service()
export class HeroDetailService {
  private heroService = inject(HeroService);
}
```

The previous test configuration replaces the real `HeroService` with a `TestHeroService` that intercepts server requests and fakes their responses.

What if you aren't so lucky.
What if faking the `HeroService` is hard?
What if `HeroDetailService` makes its own server requests?

The `TestBed.overrideComponent` method can replace the component's `providers` with easy-to-manage _test doubles_ as seen in the following setup variation:

```ts
beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      provideRouter([
        {path: 'heroes', component: HeroList},
        {path: 'heroes/:id', component: HeroDetail},
      ]),
      // HeroDetailService at this level is IRRELEVANT!
      {provide: HeroDetailService, useValue: {}},
    ],
  }).overrideComponent(HeroDetail, {
    set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
  });
});
```

Notice that `TestBed.configureTestingModule` no longer provides a fake `HeroService` because it's [not needed](#provide-a-spy-stub-herodetailservicespy).
-->

`HeroDetail`은 자체 `HeroDetailService`를 제공합니다.

```ts
@Component({
  /* ... */
  providers: [HeroDetailService],
})
export class HeroDetail {
  private heroDetailService = inject(HeroDetailService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
}
```

`TestBed.configureTestingModule`의 `providers`에서는 컴포넌트의 `HeroDetailService`를 스텁으로 대체할 수 없습니다.
이 프로바이더들은 컴포넌트가 아닌 _테스트 모듈_ 에 적용됩니다.
_픽스처 수준_ 의 의존성 인젝터를 구성하기 때문입니다.

Angular는 컴포넌트를 생성하면서 _자체_ 인젝터도 생성합니다.
이 인젝터는 픽스처 인젝터의 _자식_ 입니다.
컴포넌트의 프로바이더\(이 경우에는 `HeroDetailService`\)는 이 자식 인젝터에 등록합니다.

테스트에서는 픽스처 인젝터를 통해 자식 인젝터의 서비스에 접근할 수 없습니다.
`TestBed.configureTestingModule`로 설정할 수도 없습니다.

지금까지 Angular는 실제 `HeroDetailService`의 새 인스턴스를 생성하고 있었던 것입니다!

참고: `HeroDetailService`가 원격 서버로 XHR 요청을 직접 보낸다면 이 테스트는 실패하거나 시간이 초과될 수 있습니다.
요청할 원격 서버가 없을 수도 있기 때문입니다.

다행히 `HeroDetailService`는 원격 데이터 접근을 주입된 `HeroService`에 위임합니다.

```ts
@Service()
export class HeroDetailService {
  private heroService = inject(HeroService);
}
```

앞의 테스트 설정에서는 실제 `HeroService`를 서버 요청을 가로채고 가상 응답을 제공하는 `TestHeroService`로 교체했습니다.

그렇게 할 수 없다면 어떨까요?
`HeroService`를 대체하기 어렵다면 어떨까요?
`HeroDetailService`가 직접 서버에 요청한다면 어떨까요?

`TestBed.overrideComponent`로 컴포넌트의 `providers`를 관리하기 쉬운 _테스트 대역_ 으로 교체할 수 있습니다.
설정을 다음과 같이 변경해 봅시다.

```ts
beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      provideRouter([
        {path: 'heroes', component: HeroList},
        {path: 'heroes/:id', component: HeroDetail},
      ]),
      // 이 수준의 HeroDetailService는 관련이 없습니다!
      {provide: HeroDetailService, useValue: {}},
    ],
  }).overrideComponent(HeroDetail, {
    set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
  });
});
```

이제는 [필요하지 않기 때문에](#provide-a-spy-stub-herodetailservicespy) `TestBed.configureTestingModule`에서 가짜 `HeroService`를 제공하지 않는다는 점을 확인해 보세요.

<!--
### The `overrideComponent` method
-->

<a id="the-overridecomponent-method"></a>

### `overrideComponent` 메서드

<!--
Focus on the `overrideComponent` method.

```ts
.overrideComponent(HeroDetail, {
  set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
});
```

It takes two arguments: the component type to override \(`HeroDetail`\) and an override metadata object.
The [override metadata object](/guide/testing/utility-apis#testbed-class-summary) is a generic defined as follows:

```ts
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

A metadata override object can either add-and-remove elements in metadata properties or completely reset those properties.
This example resets the component's `providers` metadata.

The type parameter, `T`, is the kind of metadata you'd pass to the `@Component` decorator:

```ts
selector?: string;
template?: string;
templateUrl?: string;
providers?: any[];
…
```
-->

`overrideComponent` 메서드를 자세히 살펴봅시다.

```ts
.overrideComponent(HeroDetail, {
  set: {providers: [{provide: HeroDetailService, useClass: HeroDetailServiceSpy}]},
});
```

재정의할 컴포넌트 타입\(`HeroDetail`\)과 재정의 메타데이터 객체, 이렇게 두 인자를 받습니다.
[재정의 메타데이터 객체](/guide/testing/utility-apis#testbed-class-summary)는 다음과 같은 제네릭으로 정의됩니다.

```ts
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

메타데이터 재정의 객체로 메타데이터 프로퍼티의 항목을 추가하거나 제거할 수 있으며, 해당 프로퍼티 전체를 새로 지정할 수도 있습니다.
이 예제에서는 컴포넌트의 `providers` 메타데이터를 새로 지정합니다.

타입 파라미터 `T`는 `@Component` 데코레이터에 전달하는 메타데이터 타입입니다.

```ts
selector?: string;
template?: string;
templateUrl?: string;
providers?: any[];
…
```

<!--
### Provide a _spy stub_ (`HeroDetailServiceSpy`)
-->

<a id="provide-a-spy-stub-herodetailservicespy"></a>

### _스파이 스텁_ (`HeroDetailServiceSpy`) 제공하기

<!--
This example completely replaces the component's `providers` array with a new array containing a `HeroDetailServiceSpy`.

The `HeroDetailServiceSpy` is a stubbed version of the real `HeroDetailService` that fakes all necessary features of that service.
It neither injects nor delegates to the lower level `HeroService` so there's no need to provide a test double for that.

The related `HeroDetail` component tests will assert that methods of the `HeroDetailService` were called by spying on the service methods.
Accordingly, the stub implements its methods as spies:

```ts
import {vi} from 'vitest';

class HeroDetailServiceSpy {
  testHero: Hero = {...testHero};

  /* emit cloned test hero */
  getHero = vi.fn(() => asyncData({...this.testHero}));

  /* emit clone of test hero, with changes merged in */
  saveHero = vi.fn((hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
}
```
-->

이 예제는 컴포넌트의 `providers` 배열 전체를 `HeroDetailServiceSpy`가 들어 있는 새 배열로 교체합니다.

`HeroDetailServiceSpy`는 실제 `HeroDetailService`의 스텁으로, 테스트에 필요한 서비스 기능을 모두 대신 구현합니다.
하위 `HeroService`를 주입하거나 호출하지 않으므로 이를 위한 테스트 대역도 필요하지 않습니다.

관련 `HeroDetail` 컴포넌트 테스트는 서비스 메서드에 스파이를 적용해서 `HeroDetailService`의 메서드가 호출되는지 검증합니다.
따라서 스텁의 메서드를 스파이로 구현합니다.

```ts
import {vi} from 'vitest';

class HeroDetailServiceSpy {
  testHero: Hero = {...testHero};

  /* 복제한 테스트용 히어로를 발행합니다 */
  getHero = vi.fn(() => asyncData({...this.testHero}));

  /* 변경사항을 병합한 테스트용 히어로의 복제본을 발행합니다 */
  saveHero = vi.fn((hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
}
```

<!--
### The override tests
-->

<a id="the-override-tests"></a>

### 재정의한 서비스로 테스트하기

<!--
Now the tests can control the component's hero directly by manipulating the spy-stub's `testHero` and confirm that service methods were called.

```ts
let hdsSpy: HeroDetailServiceSpy;

beforeEach(async () => {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${testHero.id}`, HeroDetail);
  page = new Page();
  // get the component's injected HeroDetailServiceSpy
  hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as any;

  harness.detectChanges();
});

it('should have called `getHero`', () => {
  expect(hdsSpy.getHero, 'getHero called once').toHaveBeenCalledTimes(1);
});

it("should display stub hero's name", () => {
  expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
});

it('should save stub hero change', async () => {
  const origName = hdsSpy.testHero.name;
  const newName = 'New Name';

  page.nameInput.value = newName;

  page.nameInput.dispatchEvent(new Event('input')); // tell Angular

  expect(component.hero.name, 'component hero has new name').toBe(newName);
  expect(hdsSpy.testHero.name, 'service hero unchanged before save').toBe(origName);

  click(page.saveBtn);
  expect(hdsSpy.saveHero, 'saveHero called once').toHaveBeenCalledTimes(1);

  await harness.fixture.whenStable();
  expect(hdsSpy.testHero.name, 'service hero has new name after save').toBe(newName);
  expect(TestBed.inject(Router).url).toEqual('/heroes');
});
```
-->

이제 테스트에서는 스파이 스텁의 `testHero`를 조작해서 컴포넌트의 히어로를 직접 제어하고 서비스 메서드가 호출되는지 확인할 수 있습니다.

```ts
let hdsSpy: HeroDetailServiceSpy;

beforeEach(async () => {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${testHero.id}`, HeroDetail);
  page = new Page();
  // 컴포넌트에 주입된 HeroDetailServiceSpy를 가져옵니다
  hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as any;

  harness.detectChanges();
});

it('should have called `getHero`', () => {
  expect(hdsSpy.getHero, 'getHero called once').toHaveBeenCalledTimes(1);
});

it("should display stub hero's name", () => {
  expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
});

it('should save stub hero change', async () => {
  const origName = hdsSpy.testHero.name;
  const newName = 'New Name';

  page.nameInput.value = newName;

  page.nameInput.dispatchEvent(new Event('input')); // Angular에 알립니다

  expect(component.hero.name, 'component hero has new name').toBe(newName);
  expect(hdsSpy.testHero.name, 'service hero unchanged before save').toBe(origName);

  click(page.saveBtn);
  expect(hdsSpy.saveHero, 'saveHero called once').toHaveBeenCalledTimes(1);

  await harness.fixture.whenStable();
  expect(hdsSpy.testHero.name, 'service hero has new name after save').toBe(newName);
  expect(TestBed.inject(Router).url).toEqual('/heroes');
});
```

<!--
### More overrides
-->

<a id="more-overrides"></a>

### 다른 재정의 방법

<!--
The `TestBed.overrideComponent` method can be called multiple times for the same or different components.
The `TestBed` offers similar `overrideDirective`, `overrideModule`, and `overridePipe` methods for digging into and replacing parts of these other classes.

Explore the options and combinations on your own.
-->

`TestBed.overrideComponent`는 같은 컴포넌트나 서로 다른 컴포넌트에 여러 번 실행할 수 있습니다.
`TestBed`는 다른 클래스의 내부 설정을 찾아 교체하는 `overrideDirective`, `overrideModule`, `overridePipe` 메서드도 제공합니다.

여러 옵션과 조합을 직접 살펴보세요.
