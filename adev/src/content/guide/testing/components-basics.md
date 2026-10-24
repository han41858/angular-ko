<!--
# Basics of testing components
-->

<a id="basics-of-testing-components"></a>

# 컴포넌트 테스트 기초

<!--
A component, unlike all other parts of an Angular application, combines an HTML template and a TypeScript class.
The component truly is the template and the class _working together_.
To adequately test a component, you should test that they work together as intended.

Such tests require creating the component's host element in the browser DOM, as Angular does, and investigating the component class's interaction with the DOM as described by its template.

The Angular `TestBed` facilitates this kind of testing as you'll see in the following sections.
But in many cases, _testing the component class alone_, without DOM involvement, can validate much of the component's behavior in a straightforward, more obvious way.
-->

컴포넌트는 Angular 애플리케이션의 다른 구성 요소와 달리 HTML 템플릿과 TypeScript 클래스를 결합합니다.
템플릿과 클래스가 _함께 동작_ 해야 비로소 컴포넌트라고 할 수 있습니다.
컴포넌트를 충분히 테스트하려면 둘이 의도한 대로 함께 동작하는지 확인해야 합니다.

이런 테스트에서는 Angular가 하는 것처럼 브라우저 DOM에 컴포넌트의 호스트 엘리먼트를 생성하고, 컴포넌트 클래스가 템플릿에 정의된 대로 DOM과 상호작용하는지 확인해야 합니다.

다음 내용에서 살펴보듯이 Angular `TestBed`를 사용하면 이런 테스트를 쉽게 작성할 수 있습니다.
하지만 많은 경우 DOM 없이 _컴포넌트 클래스만 테스트_ 해도 컴포넌트 동작의 상당 부분을 더 간단하고 명확하게 검증할 수 있습니다.

<!--
## Component DOM testing
-->

<a id="component-dom-testing"></a>

## 컴포넌트 DOM 테스트

<!--
A component is more than just its class.
A component interacts with the DOM and with other components.
Classes alone cannot tell you if the component is going to render properly, respond to user input and gestures, or integrate with its parent and child components.

- Is `Lightswitch.clicked()` bound to anything such that the user can invoke it?
- Is the `Lightswitch.message` displayed?
- Can the user actually select the hero displayed by the `DashboardHero` component?
- Is the hero name displayed as expected \(such as uppercase\)?
- Is the welcome message displayed by the template of the `Welcome` component?

These might not be troubling questions for the preceding simple components illustrated.
But many components have complex interactions with the DOM elements described in their templates, causing HTML to appear and disappear as the component state changes.

To answer these kinds of questions, you have to create the DOM elements associated with the components, you must examine the DOM to confirm that component state displays properly at the appropriate times, and you must simulate user interaction with the screen to determine whether those interactions cause the component to behave as expected.

To write these kinds of test, you'll use additional features of the `TestBed` as well as other testing helpers.
-->

컴포넌트는 단순한 클래스 이상입니다.
컴포넌트는 DOM 및 다른 컴포넌트와 상호작용합니다.
클래스만으로는 컴포넌트가 올바르게 렌더링되는지, 사용자 입력과 제스처에 반응하는지, 부모 및 자식 컴포넌트와 연동되는지 알 수 없습니다.

- 사용자가 `Lightswitch.clicked()`를 실행할 수 있도록 무언가에 바인딩되어 있나요?
- `Lightswitch.message`가 표시되나요?
- 사용자가 `DashboardHero` 컴포넌트에 표시된 히어로를 실제로 선택할 수 있나요?
- 히어로 이름이 예상한 대로\(예: 대문자로\) 표시되나요?
- `Welcome` 컴포넌트 템플릿에 환영 메시지가 표시되나요?

앞에서 예로 든 간단한 컴포넌트라면 이런 질문이 큰 문제가 아닐 수도 있습니다.
하지만 많은 컴포넌트는 템플릿의 DOM 엘리먼트와 복잡하게 상호작용하며, 컴포넌트 상태가 바뀔 때 HTML이 나타나거나 사라집니다.

이런 내용을 확인하려면 컴포넌트에 대응하는 DOM 엘리먼트를 만들고, 적절한 시점에 컴포넌트 상태가 제대로 표시되는지 DOM을 검사해야 합니다.
또 사용자가 화면과 상호작용하는 상황을 재현해서 컴포넌트가 예상대로 동작하는지 확인해야 합니다.

이런 테스트를 작성할 때는 `TestBed`의 추가 기능과 다른 테스트 헬퍼를 사용합니다.

<!--
### CLI-generated tests
-->

<a id="cli-generated-tests"></a>

### CLI로 생성한 테스트

<!--
The CLI creates an initial test file for you by default when you ask it to generate a new component.

For example, the following CLI command generates a `Banner` component in the `app/banner` folder \(with inline template and styles\):

```shell
ng generate component banner --inline-template --inline-style
```

It also generates an initial test file for the component, `banner.spec.ts`, that looks like this:

```ts
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Banner} from './banner';

describe('Banner', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
-->

CLI로 새 컴포넌트를 생성하면 기본으로 초기 테스트 파일도 만들어집니다.

예를 들어 다음 CLI 명령은 `app/banner` 폴더에 인라인 템플릿과 스타일을 사용하는 `Banner` 컴포넌트를 생성합니다.

```shell
ng generate component banner --inline-template --inline-style
```

컴포넌트의 초기 테스트 파일 `banner.spec.ts`도 다음과 같이 생성됩니다.

```ts
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Banner} from './banner';

describe('Banner', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

<!--
### Reduce the setup
-->

<a id="reduce-the-setup"></a>

### 설정 간소화하기

<!--
Only the last three lines of this file actually test the component and all they do is assert that Angular can create the component.

The rest of the file is boilerplate setup code anticipating more advanced tests that _might_ become necessary if the component evolves into something substantial.

You'll learn about these advanced test features in the following sections.
For now, you can radically reduce this test file to a more manageable size:

```ts
describe('Banner (minimal)', () => {
  it('should create', () => {
    const fixture = TestBed.createComponent(Banner);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
```

Later you'll call `TestBed.configureTestingModule()` with imports, providers, and more declarations to suit your testing needs.
Optional `override` methods can further fine-tune aspects of the configuration.

NOTE: `TestBed.compileComponents` is only required when `@defer` blocks are used in the tested components.
-->

이 파일에서 실제로 컴포넌트를 테스트하는 코드는 마지막 세 줄뿐입니다.
Angular가 컴포넌트를 생성할 수 있는지만 확인합니다.

나머지는 컴포넌트가 복잡해졌을 때 _필요할 수도 있는_ 고급 테스트를 대비한 기본 설정 코드입니다.

이런 고급 테스트 기능은 다음 내용에서 알아봅니다.
지금은 테스트 파일을 관리하기 쉬운 크기로 크게 줄여봅시다.

```ts
describe('Banner (minimal)', () => {
  it('should create', () => {
    const fixture = TestBed.createComponent(Banner);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
```

나중에 테스트 요구사항에 맞게 imports, providers, 추가 declarations를 지정해서 `TestBed.configureTestingModule()`을 실행하게 됩니다.
필요하다면 `override` 메서드로 설정을 더 세밀하게 조정할 수 있습니다.

참고: `TestBed.compileComponents`는 테스트할 컴포넌트에 `@defer` 블록이 있을 때만 필요합니다.

<!--
### `createComponent()`
-->


### `createComponent()`

<!--
After configuring `TestBed`, you call its `createComponent()` method.

```ts
const fixture = TestBed.createComponent(Banner);
```

`TestBed.createComponent()` creates an instance of the `Banner` component, adds a corresponding element to the test-runner DOM, and returns a [`ComponentFixture`](#componentfixture).

IMPORTANT: Do not re-configure `TestBed` after calling `createComponent`.

The `createComponent` method freezes the current `TestBed` definition, closing it to further configuration.

You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`, nor any of the `override...` methods.
If you try, `TestBed` throws an error.
-->

`TestBed`를 설정한 후에는 `createComponent()` 메서드를 실행합니다.

```ts
const fixture = TestBed.createComponent(Banner);
```

`TestBed.createComponent()`는 `Banner` 컴포넌트 인스턴스를 생성하고 테스트 러너의 DOM에 대응하는 엘리먼트를 추가한 후 [`ComponentFixture`](#componentfixture)를 반환합니다.

중요: `createComponent`를 실행한 후에는 `TestBed`를 다시 설정하지 마세요.

`createComponent` 메서드를 실행하면 현재 `TestBed` 정의가 고정되어 더 이상 설정할 수 없습니다.

`configureTestingModule()`, `override...` 등 `TestBed` 설정 메서드를 추가로 실행할 수 없습니다.
실행하면 `TestBed`가 오류를 발생시킵니다.

<!--
### `ComponentFixture`
-->


### `ComponentFixture`

<!--
The [`ComponentFixture`](api/core/testing/ComponentFixture) is a test harness for interacting with the created component and its corresponding element.

Access the component instance through the fixture and confirm it exists with an expectation:

```ts
const component = fixture.componentInstance;
expect(component).toBeDefined();
```
-->

[`ComponentFixture`](api/core/testing/ComponentFixture)는 생성한 컴포넌트와 이에 대응하는 엘리먼트와 상호작용하는 테스트 하네스입니다.

픽스처를 통해 컴포넌트 인스턴스에 접근하고, 검증문으로 인스턴스가 존재하는지 확인합니다.

```ts
const component = fixture.componentInstance;
expect(component).toBeDefined();
```

<!--
### `beforeEach()`
-->


### `beforeEach()`

<!--
You will add more tests as this component evolves.
Rather than duplicate the `TestBed` configuration for each test, you refactor to pull the setup into a `beforeEach()` and some supporting variables:

```ts
describe('Banner (with beforeEach)', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;

    await fixture.whenStable(); // necessary to wait for the initial rendering
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

HELPFUL: By awaiting the initial rendering in the `beforeEach` with `await fixture.whenStable` the single tests synchronous.

Now add a test that gets the component's element from `fixture.nativeElement` and looks for the expected text.

```ts
it('should contain "banner works!"', () => {
  const bannerElement: HTMLElement = fixture.nativeElement;
  expect(bannerElement.textContent).toContain('banner works!');
});
```
-->

컴포넌트가 발전하면 테스트도 추가하게 됩니다.
각 테스트마다 `TestBed` 설정을 반복하지 않도록 설정을 `beforeEach()`와 보조 변수로 분리해 봅시다.

```ts
describe('Banner (with beforeEach)', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;

    await fixture.whenStable(); // 초기 렌더링이 끝날 때까지 기다려야 합니다
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
```

참고: `beforeEach`에서 `await fixture.whenStable`로 초기 렌더링이 끝날 때까지 기다리면 개별 테스트를 동기적으로 작성할 수 있습니다.

이제 `fixture.nativeElement`에서 컴포넌트 엘리먼트를 가져오고 예상한 텍스트를 확인하는 테스트를 추가합니다.

```ts
it('should contain "banner works!"', () => {
  const bannerElement: HTMLElement = fixture.nativeElement;
  expect(bannerElement.textContent).toContain('banner works!');
});
```

<!--
### create a `setup` function
-->

<a id="create-a-setup-function"></a>

### `setup` 함수 만들기

<!--
As an alternative to `beforeEach`, you can also create a setup function that you will call in every test.
A setup function has the advantage of being customizable via parameters.

Here is an example of what a setup function could look like:

```ts
function setup(providers?: Provider[]): ComponentFixture<Banner> {
  TestBed.configureTestingModule({providers});
  return TestBed.createComponent(Banner);
}
```
-->

`beforeEach` 대신 각 테스트에서 호출하는 설정 함수를 만들 수도 있습니다.
설정 함수는 파라미터로 동작을 조정할 수 있다는 장점이 있습니다.

설정 함수는 다음과 같이 작성할 수 있습니다.

```ts
function setup(providers?: Provider[]): ComponentFixture<Banner> {
  TestBed.configureTestingModule({providers});
  return TestBed.createComponent(Banner);
}
```

<!--
### `nativeElement`
-->


### `nativeElement`

<!--
The value of `ComponentFixture.nativeElement` has the `any` type.
Later you'll encounter the `DebugElement.nativeElement` and it too has the `any` type.

Angular can't know at compile time what kind of HTML element the `nativeElement` is or if it even is an HTML element.
The application might be running on a _non-browser platform_, such as the server or a node environment, where the element might have a diminished API or not exist at all.

The tests in this guide are designed to run in a browser so a `nativeElement` value will always be an `HTMLElement` or one of its derived classes.

Knowing that it is an `HTMLElement` of some sort, use the standard HTML `querySelector` to dive deeper into the element tree.

Here's another test that calls `HTMLElement.querySelector` to get the paragraph element and look for the banner text:

```ts
it('should have <p> with "banner works!"', () => {
  const bannerElement: HTMLElement = fixture.nativeElement;
  const p = bannerElement.querySelector('p')!;
  expect(p.textContent).toEqual('banner works!');
});
```
-->

`ComponentFixture.nativeElement` 값은 `any` 타입입니다.
뒤에서 살펴볼 `DebugElement.nativeElement`도 `any` 타입입니다.

Angular는 컴파일 시점에 `nativeElement`가 어떤 HTML 엘리먼트인지, HTML 엘리먼트이기는 한지 알 수 없습니다.
애플리케이션이 서버나 node 환경처럼 _브라우저가 아닌 플랫폼_ 에서 실행될 수 있기 때문입니다.
이런 환경에서는 엘리먼트 API가 제한되거나 엘리먼트 자체가 없을 수도 있습니다.

이 문서의 테스트는 브라우저에서 실행하도록 작성했으므로, `nativeElement` 값은 항상 `HTMLElement`이거나 이를 상속하는 클래스입니다.

`HTMLElement`라는 것을 알 수 있으므로 표준 HTML `querySelector`를 사용해서 엘리먼트 트리 안쪽에 접근할 수 있습니다.

다음 테스트는 `HTMLElement.querySelector`로 문단 엘리먼트를 가져오고 배너 텍스트를 확인합니다.

```ts
it('should have <p> with "banner works!"', () => {
  const bannerElement: HTMLElement = fixture.nativeElement;
  const p = bannerElement.querySelector('p')!;
  expect(p.textContent).toEqual('banner works!');
});
```

<!--
### `DebugElement`
-->


### `DebugElement`

<!--
The Angular _fixture_ provides the component's element directly through the `fixture.nativeElement`.

```ts
const bannerElement: HTMLElement = fixture.nativeElement;
```

This is actually a convenience method, implemented as `fixture.debugElement.nativeElement`.

```ts
const bannerDe: DebugElement = fixture.debugElement;
const bannerEl: HTMLElement = bannerDe.nativeElement;
```

There's a good reason for this circuitous path to the element.

The properties of the `nativeElement` depend upon the runtime environment.
You could be running these tests on a _non-browser_ platform that doesn't have a DOM or whose DOM-emulation doesn't support the full `HTMLElement` API.

Angular relies on the `DebugElement` abstraction to work safely across _all supported platforms_.
Instead of creating an HTML element tree, Angular creates a `DebugElement` tree that wraps the _native elements_ for the runtime platform.
The `nativeElement` property unwraps the `DebugElement` and returns the platform-specific element object.

Because the sample tests for this guide are designed to run only in a browser, a `nativeElement` in these tests is always an `HTMLElement` whose familiar methods and properties you can explore within a test.

Here's the previous test, re-implemented with `fixture.debugElement.nativeElement`:

```ts
it('should find the <p> with fixture.debugElement.nativeElement', () => {
  const bannerDe: DebugElement = fixture.debugElement;
  const bannerEl: HTMLElement = bannerDe.nativeElement;
  const p = bannerEl.querySelector('p')!;
  expect(p.textContent).toEqual('banner works!');
});
```

The `DebugElement` has other methods and properties that are useful in tests, as you'll see elsewhere in this guide.

You import the `DebugElement` symbol from the Angular core library.

```ts
import {DebugElement} from '@angular/core';
```
-->

Angular _픽스처_ 는 `fixture.nativeElement`로 컴포넌트 엘리먼트를 바로 제공합니다.

```ts
const bannerElement: HTMLElement = fixture.nativeElement;
```

실제로는 편의를 위해 제공하는 접근 방식이며, 내부적으로는 `fixture.debugElement.nativeElement`로 구현되어 있습니다.

```ts
const bannerDe: DebugElement = fixture.debugElement;
const bannerEl: HTMLElement = bannerDe.nativeElement;
```

엘리먼트에 이렇게 간접적으로 접근하는 데에는 이유가 있습니다.

`nativeElement`의 프로퍼티는 실행 환경에 따라 달라집니다.
DOM이 없거나 DOM 에뮬레이션이 전체 `HTMLElement` API를 지원하지 않는 _브라우저 이외의_ 플랫폼에서 테스트를 실행할 수도 있습니다.

Angular는 _지원하는 모든 플랫폼_ 에서 안전하게 동작하기 위해 `DebugElement` 추상화를 사용합니다.
HTML 엘리먼트 트리를 만드는 대신 실행 플랫폼의 _네이티브 엘리먼트_ 를 감싸는 `DebugElement` 트리를 생성합니다.
`nativeElement` 프로퍼티는 `DebugElement` 안의 플랫폼별 엘리먼트 객체를 반환합니다.

이 문서의 예제 테스트는 브라우저에서만 실행하도록 작성했으므로 `nativeElement`는 항상 `HTMLElement`입니다.
따라서 익숙한 메서드와 프로퍼티를 테스트에서 사용할 수 있습니다.

앞의 테스트를 `fixture.debugElement.nativeElement`로 다시 구현하면 다음과 같습니다.

```ts
it('should find the <p> with fixture.debugElement.nativeElement', () => {
  const bannerDe: DebugElement = fixture.debugElement;
  const bannerEl: HTMLElement = bannerDe.nativeElement;
  const p = bannerEl.querySelector('p')!;
  expect(p.textContent).toEqual('banner works!');
});
```

`DebugElement`에는 테스트에 유용한 다른 메서드와 프로퍼티도 있습니다.
이 문서의 다른 부분에서 알아봅니다.

`DebugElement` 심볼은 Angular core 라이브러리에서 로드합니다.

```ts
import {DebugElement} from '@angular/core';
```

<!--
### `By.css()`
-->


### `By.css()`

<!--
Although the tests in this guide all run in the browser, some applications might run on a different platform at least some of the time.

For example, the component might render first on the server as part of a strategy to make the application launch faster on poorly connected devices.
The server-side renderer might not support the full HTML element API.
If it doesn't support `querySelector`, the previous test could fail.

The `DebugElement` offers query methods that work for all supported platforms.
These query methods take a _predicate_ function that returns `true` when a node in the `DebugElement` tree matches the selection criteria.

You create a _predicate_ with the help of a `By` class imported from a library for the runtime platform.
Here's the `By` import for the browser platform:

```ts
import {By} from '@angular/platform-browser';
```

The following example re-implements the previous test with `DebugElement.query()` and the browser's `By.css` method.

```ts
it('should find the <p> with fixture.debugElement.query(By.css)', () => {
  const bannerDe: DebugElement = fixture.debugElement;
  const paragraphDe = bannerDe.query(By.css('p'));
  const p: HTMLElement = paragraphDe.nativeElement;
  expect(p.textContent).toEqual('banner works!');
});
```

Some noteworthy observations:

- The `By.css()` static method selects `DebugElement` nodes with a [standard CSS selector](https://developer.mozilla.org/docs/Learn/CSS/Building_blocks/Selectors 'CSS selectors').
- The query returns a `DebugElement` for the paragraph.
- You must unwrap that result to get the paragraph element.

When you're filtering by CSS selector and only testing properties of a browser's _native element_, the `By.css` approach might be overkill.

It's often more straightforward and clear to filter with a standard `HTMLElement` method such as `querySelector()` or `querySelectorAll()`.
-->

이 문서의 테스트는 모두 브라우저에서 실행되지만, 어떤 애플리케이션은 적어도 일부 시점에는 다른 플랫폼에서 실행될 수 있습니다.

예를 들어 연결 상태가 좋지 않은 기기에서도 애플리케이션을 빠르게 시작하도록 컴포넌트를 서버에서 먼저 렌더링할 수 있습니다.
서버 측 렌더러는 전체 HTML 엘리먼트 API를 지원하지 않을 수도 있습니다.
`querySelector`를 지원하지 않는다면 앞의 테스트는 실패할 수 있습니다.

`DebugElement`는 지원하는 모든 플랫폼에서 동작하는 쿼리 메서드를 제공합니다.
이 메서드는 `DebugElement` 트리의 노드가 선택 조건에 맞으면 `true`를 반환하는 _조건식_ 함수를 받습니다.

실행 플랫폼의 라이브러리에서 로드한 `By` 클래스로 _조건식_ 을 만들 수 있습니다.
브라우저 플랫폼에서는 다음과 같이 `By`를 로드합니다.

```ts
import {By} from '@angular/platform-browser';
```

다음 예제는 앞의 테스트를 `DebugElement.query()`와 브라우저의 `By.css` 메서드로 다시 구현한 것입니다.

```ts
it('should find the <p> with fixture.debugElement.query(By.css)', () => {
  const bannerDe: DebugElement = fixture.debugElement;
  const paragraphDe = bannerDe.query(By.css('p'));
  const p: HTMLElement = paragraphDe.nativeElement;
  expect(p.textContent).toEqual('banner works!');
});
```

다음 내용을 확인해 보세요.

- `By.css()` 정적 메서드는 [표준 CSS 셀렉터](https://developer.mozilla.org/docs/Learn/CSS/Building_blocks/Selectors 'CSS 셀렉터')로 `DebugElement` 노드를 선택합니다.
- 쿼리는 문단을 나타내는 `DebugElement`를 반환합니다.
- 문단 엘리먼트를 가져오려면 이 결과에서 실제 엘리먼트를 꺼내야 합니다.

CSS 셀렉터로 필터링하고 브라우저의 _네이티브 엘리먼트_ 프로퍼티만 테스트한다면 `By.css`는 과할 수도 있습니다.

`querySelector()`나 `querySelectorAll()` 같은 표준 `HTMLElement` 메서드로 필터링하는 것이 더 간단하고 명확한 경우가 많습니다.
