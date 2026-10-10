<!--
# Using component harnesses in tests
-->

<a id="using-component-harnesses-in-tests"></a>

# 테스트에서 컴포넌트 하네스 사용하기

<!--
## Before you start
-->

<a id="before-you-start"></a>

## 시작하기 전에

<!--
TIP: This guide assumes you've already read the [component harnesses overview guide](guide/testing/component-harnesses-overview). Read that first if you're new to using component harnesses.
-->

팁: 이 문서는 [컴포넌트 하네스 개요](guide/testing/component-harnesses-overview)를 읽었다고 가정합니다.
컴포넌트 하네스를 처음 사용한다면 먼저 해당 문서를 읽어보세요.

<!--
### CDK Installation
-->

<a id="cdk-installation"></a>

### CDK 설치하기

<!--
The [Component Dev Kit (CDK)](https://material.angular.dev/cdk/categories) is a set of behavior primitives for building components. To use the component harnesses, first install `@angular/cdk` from npm. You can do this from your terminal using the Angular CLI:

```shell
ng add @angular/cdk
```
-->

[Component Dev Kit(CDK)](https://material.angular.dev/cdk/categories)는 컴포넌트의 동작을 구현하는 기본 요소 모음입니다.
컴포넌트 하네스를 사용하려면 먼저 npm에서 `@angular/cdk`를 설치해야 합니다.
터미널에서 Angular CLI로 설치할 수 있습니다.

```shell
ng add @angular/cdk
```

<!--
## Test harness environments and loaders
-->

<a id="test-harness-environments-and-loaders"></a>

## 테스트 하네스 환경과 로더

<!--
You can use component test harnesses in different test environments. Angular CDK supports two built-in environments:

- Unit tests with Angular's `TestBed`
- End-to-end tests with [WebDriver](https://developer.mozilla.org/en-US/docs/Web/WebDriver)

Each environment provides a <strong>harness loader</strong>. The loader creates the harness instances you use throughout your tests. See below for more specific guidance on supported testing environments.

Additional testing environments require custom bindings. See the [adding harness support for additional testing environments guide](guide/testing/component-harnesses-testing-environments) for more information.
-->

컴포넌트 테스트 하네스는 여러 테스트 환경에서 사용할 수 있습니다.
Angular CDK는 두 가지 환경을 기본으로 지원합니다.

- Angular `TestBed`를 사용하는 단위 테스트
- [WebDriver](https://developer.mozilla.org/en-US/docs/Web/WebDriver)를 사용하는 E2E 테스트

각 환경은 <strong>하네스 로더</strong>를 제공합니다.
로더는 테스트에서 사용할 하네스 인스턴스를 생성합니다.
지원하는 테스트 환경별 사용 방법은 아래 내용을 참고하세요.

다른 테스트 환경을 사용하려면 별도의 연결 구현이 필요합니다.
자세한 내용은 [추가 테스트 환경에서 하네스 지원하기](guide/testing/component-harnesses-testing-environments)를 참고하세요.

<!--
### Using the loader from `TestbedHarnessEnvironment` for unit tests
-->

<a id="using-the-loader-from-testbedharnessenvironment-for-unit-tests"></a>

### 단위 테스트에서 `TestbedHarnessEnvironment` 로더 사용하기

<!--
For unit tests you can create a harness loader from [TestbedHarnessEnvironment](/api/cdk/testing/testbed/TestbedHarnessEnvironment). This environment uses a [component fixture](api/core/testing/ComponentFixture) created by Angular's `TestBed`.

To create a harness loader rooted at the fixture's root element, use the `loader()` method:

```ts
const fixture = TestBed.createComponent(MyComponent);

// Create a harness loader from the fixture
const loader = TestbedHarnessEnvironment.loader(fixture);
...

// Use the loader to get harness instances
const myComponentHarness = await loader.getHarness(MyComponent);
```

To create a harness loader for harnesses for elements that fall outside the fixture, use the `documentRootLoader()` method. For example, code that displays a floating element or pop-up often attaches DOM elements directly to the document body, such as the `Overlay` service in Angular CDK.

You can also create a harness loader directly with `harnessForFixture()` for a harness at that fixture's root element directly.
-->

단위 테스트에서는 [TestbedHarnessEnvironment](/api/cdk/testing/testbed/TestbedHarnessEnvironment)로 하네스 로더를 만들 수 있습니다.
이 환경은 Angular `TestBed`로 생성한 [컴포넌트 픽스처](api/core/testing/ComponentFixture)를 사용합니다.

픽스처의 최상위 엘리먼트를 기준으로 하네스 로더를 만들려면 `loader()` 메서드를 사용하세요.

```ts
const fixture = TestBed.createComponent(MyComponent);

// 픽스처에서 하네스 로더를 생성합니다
const loader = TestbedHarnessEnvironment.loader(fixture);
...

// 로더로 하네스 인스턴스를 가져옵니다
const myComponentHarness = await loader.getHarness(MyComponent);
```

픽스처 바깥에 있는 엘리먼트의 하네스를 가져올 로더를 만들려면 `documentRootLoader()` 메서드를 사용하세요.
예를 들어 떠 있는 엘리먼트나 팝업을 표시하는 코드는 DOM 엘리먼트를 문서의 body에 직접 추가하는 경우가 많습니다.
Angular CDK의 `Overlay` 서비스가 이에 해당합니다.

픽스처의 최상위 엘리먼트에 있는 하네스는 `harnessForFixture()`로 직접 생성할 수도 있습니다.

<!--
### Using the loader from `SeleniumWebDriverHarnessEnvironment` for end-to-end tests
-->

<a id="using-the-loader-from-seleniumwebdriverharnessenvironment-for-end-to-end-tests"></a>

### E2E 테스트에서 `SeleniumWebDriverHarnessEnvironment` 로더 사용하기

<!--
For WebDriver-based end-to-end tests you can create a harness loader with `SeleniumWebDriverHarnessEnvironment`.

Use the `loader()` method to get the harness loader instance for the current HTML document, rooted at the document's root element. This environment uses a WebDriver client.

```ts
let wd: webdriver.WebDriver = getMyWebDriverClient();
const loader = SeleniumWebDriverHarnessEnvironment.loader(wd);
...
const myComponentHarness = await loader.getHarness(MyComponent);
```
-->

WebDriver 기반 E2E 테스트에서는 `SeleniumWebDriverHarnessEnvironment`로 하네스 로더를 만들 수 있습니다.

`loader()` 메서드로 현재 HTML 문서의 최상위 엘리먼트를 기준으로 하는 하네스 로더 인스턴스를 가져오세요.
이 환경은 WebDriver 클라이언트를 사용합니다.

```ts
let wd: webdriver.WebDriver = getMyWebDriverClient();
const loader = SeleniumWebDriverHarnessEnvironment.loader(wd);
...
const myComponentHarness = await loader.getHarness(MyComponent);
```

<!--
## Using a harness loader
-->

<a id="using-a-harness-loader"></a>

## 하네스 로더 사용하기

<!--
Harness loader instances correspond to a specific DOM element and are used to create component harness instances for elements under that specific element.

To get `ComponentHarness` for the first instance of the element, use the `getHarness()` method. To get all `ComponentHarness` instances, use the `getAllHarnesses()` method.

```ts
// Get harness for first instance of the element
const myComponentHarness = await loader.getHarness(MyComponent);

// Get harnesses for all instances of the element
const myComponentHarnesses = await loader.getAllHarnesses(MyComponent);
```

In addition to `getHarness` and `getAllHarnesses`, `HarnessLoader` has several other useful methods for querying for harnesses:

- `getHarnessAtIndex(...)`: Gets the harness for a component that matches the given criteria at a specific index.
- `countHarnesses(...)`: Counts the number of component instances that match the given criteria.
- `hasHarness(...)`: Checks if at least one component instance matches the given criteria.

As an example, consider a reusable dialog-button component that opens a dialog on click. It contains the following components, each with a corresponding harness:

- `MyDialogButton` (composes the `MyButton` and `MyDialog` with a convenient API)
- `MyButton` (a standard button component)
- `MyDialog` (a dialog appended to `document.body` by `MyDialogButton` upon click)

The following test loads harnesses for each of these components:

```ts
let fixture: ComponentFixture<MyDialogButton>;
let loader: HarnessLoader;
let rootLoader: HarnessLoader;

beforeEach(() => {
  fixture = TestBed.createComponent(MyDialogButton);
  loader = TestbedHarnessEnvironment.loader(fixture);
  rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
});

it('loads harnesses', async () => {
  // Load a harness for the bootstrapped component with `harnessForFixture`
  dialogButtonHarness = await TestbedHarnessEnvironment.harnessForFixture(
    fixture,
    MyDialogButtonHarness,
  );

  // The button element is inside the fixture's root element, so we use `loader`.
  const buttonHarness = await loader.getHarness(MyButtonHarness);

  // Click the button to open the dialog
  await buttonHarness.click();

  // The dialog is appended to `document.body`, outside of the fixture's root element,
  // so we use `rootLoader` in this case.
  const dialogHarness = await rootLoader.getHarness(MyDialogHarness);

  // ... make some assertions
});
```
-->

하네스 로더 인스턴스는 특정 DOM 엘리먼트에 대응하며, 해당 엘리먼트 아래에 있는 엘리먼트의 컴포넌트 하네스 인스턴스를 생성합니다.

첫 번째 엘리먼트의 `ComponentHarness`를 가져오려면 `getHarness()` 메서드를 사용하세요.
모든 `ComponentHarness` 인스턴스를 가져오려면 `getAllHarnesses()` 메서드를 사용합니다.

```ts
// 첫 번째 엘리먼트의 하네스를 가져옵니다
const myComponentHarness = await loader.getHarness(MyComponent);

// 모든 엘리먼트의 하네스를 가져옵니다
const myComponentHarnesses = await loader.getAllHarnesses(MyComponent);
```

`HarnessLoader`에는 `getHarness`, `getAllHarnesses` 외에도 하네스를 조회하는 유용한 메서드가 있습니다.

- `getHarnessAtIndex(...)`: 주어진 조건과 일치하는 컴포넌트 중 특정 인덱스에 있는 컴포넌트의 하네스를 가져옵니다.
- `countHarnesses(...)`: 주어진 조건과 일치하는 컴포넌트 인스턴스의 개수를 구합니다.
- `hasHarness(...)`: 주어진 조건과 일치하는 컴포넌트 인스턴스가 하나 이상 있는지 확인합니다.

예를 들어 클릭하면 대화상자를 여는 재사용 가능한 대화상자 버튼 컴포넌트를 생각해 봅시다.
다음 컴포넌트로 구성되며 각각에 대응하는 하네스가 있습니다.

- `MyDialogButton`: `MyButton`과 `MyDialog`를 조합하고 편리한 API를 제공합니다.
- `MyButton`: 일반적인 버튼 컴포넌트입니다.
- `MyDialog`: 클릭했을 때 `MyDialogButton`이 `document.body`에 추가하는 대화상자입니다.

다음 테스트는 각 컴포넌트의 하네스를 로드합니다.

```ts
let fixture: ComponentFixture<MyDialogButton>;
let loader: HarnessLoader;
let rootLoader: HarnessLoader;

beforeEach(() => {
  fixture = TestBed.createComponent(MyDialogButton);
  loader = TestbedHarnessEnvironment.loader(fixture);
  rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
});

it('loads harnesses', async () => {
  // `harnessForFixture`로 부트스트랩된 컴포넌트의 하네스를 로드합니다
  dialogButtonHarness = await TestbedHarnessEnvironment.harnessForFixture(
    fixture,
    MyDialogButtonHarness,
  );

  // 버튼 엘리먼트가 픽스처의 최상위 엘리먼트 안에 있으므로 `loader`를 사용합니다.
  const buttonHarness = await loader.getHarness(MyButtonHarness);

  // 버튼을 클릭해서 대화상자를 엽니다
  await buttonHarness.click();

  // 대화상자는 픽스처의 최상위 엘리먼트 바깥인 `document.body`에 추가되므로
  // 이 경우에는 `rootLoader`를 사용합니다.
  const dialogHarness = await rootLoader.getHarness(MyDialogHarness);

  // ... 결과를 검증합니다
});
```

<!--
### Harness behavior in different environments
-->

<a id="harness-behavior-in-different-environments"></a>

### 환경에 따른 하네스 동작

<!--
Harnesses may not behave exactly the same in all environments. Some differences are unavoidable between the real user interaction versus the simulated events generated in unit tests. Angular CDK makes a best effort to normalize the behavior to the extent possible.
-->

하네스가 모든 환경에서 완전히 똑같이 동작하지는 않을 수 있습니다.
실제 사용자 상호작용과 단위 테스트에서 발생시키는 가상 이벤트 사이에는 피할 수 없는 차이가 있습니다.
Angular CDK는 가능한 범위에서 동작을 일관되게 맞춥니다.

<!--
### Interacting with child elements
-->

<a id="interacting-with-child-elements"></a>

### 자식 엘리먼트와 상호작용하기

<!--
To interact with elements below the root element of this harness loader, use the `HarnessLoader` instance of a child element. For the first instance of the child element, use the `getChildLoader()` method. For all instances of the child element, use the `getAllChildLoaders()` method.

```ts
const myComponentHarness = await loader.getHarness(MyComponent);

// Get loader for first instance of child element with '.child' selector
const childLoader = await myComponentHarness.getLoader('.child');

// Get loaders for all instances of child elements with '.child' selector
const allChildLoaders = await myComponentHarness.getAllChildLoaders('.child');
```
-->

하네스 로더의 최상위 엘리먼트 아래에 있는 엘리먼트와 상호작용하려면 자식 엘리먼트의 `HarnessLoader` 인스턴스를 사용하세요.
첫 번째 자식 엘리먼트에는 `getChildLoader()`, 모든 자식 엘리먼트에는 `getAllChildLoaders()` 메서드를 사용합니다.

```ts
const myComponentHarness = await loader.getHarness(MyComponent);

// '.child' 셀렉터와 일치하는 첫 번째 자식 엘리먼트의 로더를 가져옵니다
const childLoader = await myComponentHarness.getLoader('.child');

// '.child' 셀렉터와 일치하는 모든 자식 엘리먼트의 로더를 가져옵니다
const allChildLoaders = await myComponentHarness.getAllChildLoaders('.child');
```

<!--
### Filtering harnesses
-->

<a id="filtering-harnesses"></a>

### 하네스 필터링하기

<!--
When a page contains multiple instances of a particular component, you may want to filter based on some property of the component to get a particular component instance. You can use a <strong>harness predicate</strong>, a class used to associate a `ComponentHarness` class with predicates functions that can be used to filter component instances, to do so.

When you ask a `HarnessLoader` for a harness, you're actually providing a HarnessQuery. A query can be one of two things:

- A harness constructor. This just gets that harness
- A `HarnessPredicate`, which gets harnesses that are filtered based on one or more conditions

`HarnessPredicate` does support some base filters (selector, ancestor) that work on anything that extends `ComponentHarness`.

```ts
// Example of loading a MyButtonComponentHarness with a harness predicate
const disabledButtonPredicate = new HarnessPredicate(MyButtonComponentHarness, {
  selector: '[disabled]',
});
const disabledButton = await loader.getHarness(disabledButtonPredicate);
```

However it's common for harnesses to implement a static `with()` method that accepts component-specific filtering options and returns a `HarnessPredicate`.

```ts
// Example of loading a MyButtonComponentHarness with a specific selector
const button = await loader.getHarness(MyButtonComponentHarness.with({selector: 'btn'}));
```

For more details refer to the specific harness documentation since additional filtering options are specific to each harness implementation.
-->

페이지에 같은 컴포넌트의 인스턴스가 여러 개 있으면 컴포넌트 프로퍼티를 기준으로 필터링해서 특정 인스턴스를 가져와야 할 수 있습니다.
이때 <strong>하네스 조건식</strong>을 사용할 수 있습니다.
하네스 조건식은 `ComponentHarness` 클래스와 컴포넌트 인스턴스를 필터링하는 조건식 함수를 연결하는 클래스입니다.

`HarnessLoader`에 하네스를 요청할 때 실제로 전달하는 것은 HarnessQuery입니다.
쿼리는 다음 두 가지 중 하나입니다.

- 하네스 생성자: 해당 하네스를 가져옵니다.
- `HarnessPredicate`: 하나 이상의 조건으로 필터링한 하네스를 가져옵니다.

`HarnessPredicate`는 `ComponentHarness`를 상속하는 모든 클래스에 사용할 수 있는 기본 필터(selector, ancestor)를 지원합니다.

```ts
// 하네스 조건식으로 MyButtonComponentHarness를 로드하는 예제
const disabledButtonPredicate = new HarnessPredicate(MyButtonComponentHarness, {
  selector: '[disabled]',
});
const disabledButton = await loader.getHarness(disabledButtonPredicate);
```

하지만 보통 하네스에는 컴포넌트별 필터 옵션을 받고 `HarnessPredicate`를 반환하는 `with()` 정적 메서드를 구현합니다.

```ts
// 특정 셀렉터로 MyButtonComponentHarness를 로드하는 예제
const button = await loader.getHarness(MyButtonComponentHarness.with({selector: 'btn'}));
```

추가 필터 옵션은 하네스 구현마다 다르므로 자세한 내용은 각 하네스 문서를 참고하세요.

<!--
## Using test harness APIs
-->

<a id="using-test-harness-apis"></a>

## 테스트 하네스 API 사용하기

<!--
While every harness defines an API specific to its corresponding component, they all share a common base class, [ComponentHarness](/api/cdk/testing/ComponentHarness). This base class defines a static property, `hostSelector`, that matches the harness class to instances of the component in the DOM.

Beyond that, the API of any given harness is specific to its corresponding component; refer to the component's documentation to learn how to use a specific harness.

As an example, the following is a test for a component that uses the [Angular Material slider component harness](https://material.angular.dev/components/slider/api#MatSliderHarness):

```ts
it('should get value of slider thumb', async () => {
  const slider = await loader.getHarness(MatSliderHarness);
  const thumb = await slider.getEndThumb();
  expect(await thumb.getValue()).toBe(50);
});
```
-->

각 하네스는 해당 컴포넌트에 맞는 API를 정의하지만, 모두 [ComponentHarness](/api/cdk/testing/ComponentHarness)라는 공통 기본 클래스를 사용합니다.
이 기본 클래스의 `hostSelector` 정적 프로퍼티는 하네스 클래스와 DOM의 컴포넌트 인스턴스를 연결합니다.

그 외의 하네스 API는 해당 컴포넌트마다 다릅니다.
특정 하네스의 사용 방법은 컴포넌트 문서를 참고하세요.

예를 들어 다음은 [Angular Material 슬라이더 컴포넌트 하네스](https://material.angular.dev/components/slider/api#MatSliderHarness)를 사용하는 컴포넌트 테스트입니다.

```ts
it('should get value of slider thumb', async () => {
  const slider = await loader.getHarness(MatSliderHarness);
  const thumb = await slider.getEndThumb();
  expect(await thumb.getValue()).toBe(50);
});
```

<!--
## Interop with Angular change detection
-->

<a id="interop-with-angular-change-detection"></a>

## Angular 변화 감지와 연동하기

<!--
By default, test harnesses runs Angular's [change detection](/best-practices/runtime-performance) before reading the state of a DOM element and after interacting with a DOM element.

There may be times that you need finer-grained control over change detection in your tests. such as checking the state of a component while an async operation is pending. In these cases use the `manualChangeDetection` function to disable automatic handling of change detection for a block of code.

```ts
it('checks state while async action is in progress', async () => {
  const buttonHarness = loader.getHarness(MyButtonHarness);
  await manualChangeDetection(async () => {
    await buttonHarness.click();
    fixture.detectChanges();
    // Check expectations while async click operation is in progress.
    expect(isProgressSpinnerVisible()).toBe(true);
    await fixture.whenStable();
    // Check expectations after async click operation complete.
    expect(isProgressSpinnerVisible()).toBe(false);
  });
});
```

Almost all harness methods are asynchronous and return a `Promise` to support the following:

- Support for unit tests
- Support for end-to-end tests
- Insulate tests against changes in asynchronous behavior

The Angular team recommends using [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to improve the test readability. Calling `await` blocks the execution of your test until the associated `Promise` resolves.

Occasionally, you may want to perform multiple actions simultaneously and wait until they're all done rather than performing each action sequentially. For example, read multiple properties of a single component. In these situations use the `parallel` function to parallelize the operations. The parallel function works similarly to `Promise.all`, while also optimizing change detection checks.

```ts
it('reads properties in parallel', async () => {
  const checkboxHarness = loader.getHarness(MyCheckboxHarness);
  // Read the checked and intermediate properties simultaneously.
  const [checked, indeterminate] = await parallel(() => [
    checkboxHarness.isChecked(),
    checkboxHarness.isIndeterminate(),
  ]);
  expect(checked).toBe(false);
  expect(indeterminate).toBe(true);
});
```
-->

테스트 하네스는 기본으로 DOM 엘리먼트의 상태를 읽기 전과 DOM 엘리먼트와 상호작용한 후에 Angular [변화 감지](/best-practices/runtime-performance)를 실행합니다.

비동기 작업이 진행 중일 때 컴포넌트 상태를 확인하는 등, 테스트에서 변화 감지를 더 세밀하게 제어해야 할 수 있습니다.
이때는 `manualChangeDetection` 함수로 특정 코드 블록의 자동 변화 감지 처리를 비활성화하세요.

```ts
it('checks state while async action is in progress', async () => {
  const buttonHarness = loader.getHarness(MyButtonHarness);
  await manualChangeDetection(async () => {
    await buttonHarness.click();
    fixture.detectChanges();
    // 비동기 클릭 동작이 진행 중일 때 예상한 상태인지 확인합니다.
    expect(isProgressSpinnerVisible()).toBe(true);
    await fixture.whenStable();
    // 비동기 클릭 동작이 끝난 후 예상한 상태인지 확인합니다.
    expect(isProgressSpinnerVisible()).toBe(false);
  });
});
```

거의 모든 하네스 메서드는 다음 목적을 위해 비동기로 동작하고 `Promise`를 반환합니다.

- 단위 테스트 지원
- E2E 테스트 지원
- 비동기 동작이 변경되어도 테스트가 영향을 받지 않도록 보호

Angular 팀은 테스트의 가독성을 높이기 위해 [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 사용을 권장합니다.
`await`를 사용하면 해당 `Promise`가 이행될 때까지 테스트 실행을 기다립니다.

각 동작을 순서대로 실행하지 않고 여러 동작을 동시에 실행한 뒤 모두 끝날 때까지 기다려야 할 때도 있습니다.
컴포넌트 하나의 여러 프로퍼티를 읽는 경우가 예입니다.
이때는 `parallel` 함수로 작업을 병렬 실행하세요.
이 함수는 `Promise.all`과 비슷하게 동작하면서 변화 감지 검사도 최적화합니다.

```ts
it('reads properties in parallel', async () => {
  const checkboxHarness = loader.getHarness(MyCheckboxHarness);
  // checked와 intermediate 프로퍼티를 동시에 읽습니다.
  const [checked, indeterminate] = await parallel(() => [
    checkboxHarness.isChecked(),
    checkboxHarness.isIndeterminate(),
  ]);
  expect(checked).toBe(false);
  expect(indeterminate).toBe(true);
});
```
