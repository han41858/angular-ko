<!--
# Adding harness support for additional testing environments
-->

<a id="adding-harness-support-for-additional-testing-environments"></a>

# 추가 테스트 환경에서 하네스 지원하기

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
### When does adding support for a test environment make sense?
-->

<a id="when-does-adding-support-for-a-test-environment-make-sense"></a>

### 테스트 환경 지원을 추가해야 하는 경우

<!--
To use component harnesses in the following environments, you can use Angular CDK's two built-in environments:

- Unit tests
- WebDriver end-to-end tests

To use a supported testing environment, read the [Creating harnesses for your components guide](guide/testing/creating-component-harnesses).

Otherwise, to add support for other environments, you need to define how to interact with a DOM element and how DOM interactions work in your environment. Continue reading to learn more.
-->

다음 환경에서 컴포넌트 하네스를 사용하려면 Angular CDK에 기본으로 제공되는 두 가지 환경을 사용하면 됩니다.

- 단위 테스트
- WebDriver E2E 테스트

지원되는 테스트 환경을 사용하려면 [컴포넌트 하네스 만들기](guide/testing/creating-component-harnesses)를 참고하세요.

다른 환경을 지원하려면 DOM 엘리먼트와 상호작용하는 방법과 해당 환경에서 DOM 상호작용이 동작하는 방식을 정의해야 합니다.
이어지는 내용을 확인해 보세요.

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
## Creating a `TestElement` implementation
-->

<a id="creating-a-testelement-implementation"></a>

## `TestElement` 구현하기

<!--
Every test environment must define a `TestElement` implementation. The `TestElement` interface serves as an environment-agnostic representation of a DOM element. It enables harnesses to interact with DOM elements regardless of the underlying environment. Because some environments don't support interacting with DOM elements synchronously (e.g. WebDriver), all `TestElement` methods are asynchronous, returning a `Promise` with the result of the operation.

`TestElement` offers a number of methods to interact with the underlying DOM such as `blur()`, `click()`, `getAttribute()`, and more. See the [TestElement API reference page](/api/cdk/testing/TestElement) for the full list of methods.

The `TestElement` interface consists largely of methods that resemble methods available on `HTMLElement`. Similar methods exist in most test environments, which makes implementing the methods fairly straightforward. However, one important difference to note when implementing the `sendKeys` method, is that the key codes in the `TestKey` enum likely differ from the key codes used in the test environment. Environment authors should maintain a mapping from `TestKey` codes to the codes used in the particular testing environment.

The [UnitTestElement](/api/cdk/testing/testbed/UnitTestElement) and [SeleniumWebDriverElement](/api/cdk/testing/selenium-webdriver/SeleniumWebDriverElement) implementations in Angular CDK serve as good examples of implementations of this interface.
-->

각 테스트 환경은 `TestElement` 구현을 정의해야 합니다.
`TestElement` 인터페이스는 특정 환경에 의존하지 않는 방식으로 DOM 엘리먼트를 표현합니다.
그래서 하네스는 실행 환경과 관계없이 DOM 엘리먼트와 상호작용할 수 있습니다.
WebDriver처럼 DOM 엘리먼트와 동기적으로 상호작용할 수 없는 환경도 있으므로, 모든 `TestElement` 메서드는 비동기로 동작하고 실행 결과를 `Promise`로 반환합니다.

`TestElement`는 `blur()`, `click()`, `getAttribute()` 등 DOM과 상호작용하는 여러 메서드를 제공합니다.
전체 메서드는 [TestElement API 문서](/api/cdk/testing/TestElement)를 참고하세요.

`TestElement` 인터페이스의 메서드는 대부분 `HTMLElement`에서 제공하는 메서드와 비슷합니다.
대부분의 테스트 환경에도 비슷한 메서드가 있어서 구현은 비교적 간단합니다.
다만 `sendKeys`를 구현할 때는 중요한 차이를 주의해야 합니다.
`TestKey` 열거형의 키 코드가 테스트 환경에서 사용하는 키 코드와 다를 수 있습니다.
환경 작성자는 `TestKey` 코드와 해당 테스트 환경의 코드를 대응시키는 매핑을 관리해야 합니다.

Angular CDK의 [UnitTestElement](/api/cdk/testing/testbed/UnitTestElement)와 [SeleniumWebDriverElement](/api/cdk/testing/selenium-webdriver/SeleniumWebDriverElement)를 이 인터페이스의 구현 예제로 참고할 수 있습니다.

<!--
## Creating a `HarnessEnvironment` implementation
-->

<a id="creating-a-harnessenvironment-implementation"></a>

## `HarnessEnvironment` 구현하기

<!--
Test authors use `HarnessEnvironment` to create component harness instances for use in tests. `HarnessEnvironment` is an abstract class that must be extended to create a concrete subclass for the new environment. When supporting a new test environment, create a `HarnessEnvironment` subclass that adds concrete implementations for all abstract members.

`HarnessEnvironment` has a generic type parameter: `HarnessEnvironment<E>`. This parameter, `E`, represents the raw element type of the environment. For example, this parameter is Element for unit test environments.

The following are the abstract methods that must be implemented:

| Method                                                       | Description                                                                                                                                                          |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `abstract getDocumentRoot(): E`                              | Gets the root element for the environment (e.g. `document.body`).                                                                                                    |
| `abstract createTestElement(element: E): TestElement`        | Creates a `TestElement` for the given raw element.                                                                                                                   |
| `abstract createEnvironment(element: E): HarnessEnvironment` | Creates a `HarnessEnvironment` rooted at the given raw element.                                                                                                      |
| `abstract getAllRawElements(selector: string): Promise<E[]>` | Gets all of the raw elements under the root element of the environment matching the given selector.                                                                  |
| `abstract forceStabilize(): Promise<void>`                   | Gets a `Promise` that resolves when the `NgZone` is stable. Additionally, if applicable, tells `NgZone` to stabilize (e.g. calling `flush()` in a `fakeAsync` test). |
| `abstract waitForTasksOutsideAngular(): Promise<void>`       | Gets a `Promise` that resolves when the parent zone of `NgZone` is stable.                                                                                           |

In addition to implementing the missing methods, this class should provide a way for test authors to get `ComponentHarness` instances. You should define a protected constructor and provide a static method called `loader` that returns a `HarnessLoader` instance. This allows test authors to write code like: `SomeHarnessEnvironment.loader().getHarness(...)`. Depending on the needs of the particular environment, the class may provide several different static methods or require arguments to be passed. (e.g. the `loader` method on `TestbedHarnessEnvironment` takes a `ComponentFixture`, and the class provides additional static methods called `documentRootLoader` and `harnessForFixture`).

The [`TestbedHarnessEnvironment`](/api/cdk/testing/testbed/TestbedHarnessEnvironment) and [SeleniumWebDriverHarnessEnvironment](/api/cdk/testing/selenium-webdriver/SeleniumWebDriverHarnessEnvironment) implementations in Angular CDK serve as good examples of implementations of this interface.
-->

테스트 작성자는 `HarnessEnvironment`로 테스트에 사용할 컴포넌트 하네스 인스턴스를 생성합니다.
`HarnessEnvironment`는 추상 클래스이므로, 새 환경을 지원하려면 이를 상속하는 구체적인 하위 클래스를 만들어야 합니다.
새 테스트 환경을 지원할 때는 `HarnessEnvironment`를 상속하고 모든 추상 멤버를 구현하세요.

`HarnessEnvironment`에는 `HarnessEnvironment<E>`라는 제네릭 타입 파라미터가 있습니다.
`E`는 해당 환경의 원시 엘리먼트 타입을 나타냅니다.
예를 들어 단위 테스트 환경에서는 Element 타입입니다.

구현해야 하는 추상 메서드는 다음과 같습니다.

| 메서드                                                       | 설명                                                                                                                                                           |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `abstract getDocumentRoot(): E`                              | 환경의 최상위 엘리먼트(예: `document.body`)를 가져옵니다.                                                                                                      |
| `abstract createTestElement(element: E): TestElement`        | 주어진 원시 엘리먼트에 대한 `TestElement`를 생성합니다.                                                                                                        |
| `abstract createEnvironment(element: E): HarnessEnvironment` | 주어진 원시 엘리먼트를 최상위 엘리먼트로 사용하는 `HarnessEnvironment`를 생성합니다.                                                                           |
| `abstract getAllRawElements(selector: string): Promise<E[]>` | 환경의 최상위 엘리먼트 아래에서 주어진 셀렉터와 일치하는 원시 엘리먼트를 모두 가져옵니다.                                                                      |
| `abstract forceStabilize(): Promise<void>`                   | `NgZone`이 안정화되면 이행되는 `Promise`를 가져옵니다. 필요하다면 `NgZone`이 안정화되도록 처리합니다. 예를 들어 `fakeAsync` 테스트에서 `flush()`를 실행합니다. |
| `abstract waitForTasksOutsideAngular(): Promise<void>`       | `NgZone`의 부모 존이 안정화되면 이행되는 `Promise`를 가져옵니다.                                                                                               |

추상 메서드를 구현하는 것 외에도 테스트 작성자가 `ComponentHarness` 인스턴스를 가져올 수 있는 방법을 제공해야 합니다.
생성자를 protected로 정의하고 `HarnessLoader` 인스턴스를 반환하는 `loader` 정적 메서드를 제공하세요.
그러면 테스트 작성자는 `SomeHarnessEnvironment.loader().getHarness(...)`와 같은 코드를 작성할 수 있습니다.
환경에 따라 여러 정적 메서드를 제공하거나 인자를 요구할 수도 있습니다.
예를 들어 `TestbedHarnessEnvironment`의 `loader` 메서드는 `ComponentFixture`를 인자로 받으며, 이 클래스에는 `documentRootLoader`, `harnessForFixture` 정적 메서드도 있습니다.

Angular CDK의 [`TestbedHarnessEnvironment`](/api/cdk/testing/testbed/TestbedHarnessEnvironment)와 [SeleniumWebDriverHarnessEnvironment](/api/cdk/testing/selenium-webdriver/SeleniumWebDriverHarnessEnvironment)를 이 인터페이스의 구현 예제로 참고할 수 있습니다.

<!--
## Handling auto change detection
-->

<a id="handling-auto-change-detection"></a>

## 자동 변화 감지 처리하기

<!--
In order to support the `manualChangeDetection` and parallel APIs, your environment should install a handler for the auto change detection status.

When your environment wants to start handling the auto change detection status it can call `handleAutoChangeDetectionStatus(handler)`. The handler function will receive a `AutoChangeDetectionStatus` which has two properties `isDisabled` and `onDetectChangesNow()`. See the [AutoChangeDetectionStatus API reference page](/api/cdk/testing/AutoChangeDetectionStatus) for more information.
If your environment wants to stop handling auto change detection status it can call `stopHandlingAutoChangeDetectionStatus()`.
-->

`manualChangeDetection`과 parallel API를 지원하려면 환경에 자동 변화 감지 상태를 처리하는 핸들러를 등록해야 합니다.

자동 변화 감지 상태 처리를 시작하려면 `handleAutoChangeDetectionStatus(handler)`를 실행합니다.
핸들러 함수는 `isDisabled`, `onDetectChangesNow()`라는 두 프로퍼티가 있는 `AutoChangeDetectionStatus`를 전달받습니다.
자세한 내용은 [AutoChangeDetectionStatus API 문서](/api/cdk/testing/AutoChangeDetectionStatus)를 참고하세요.
자동 변화 감지 상태 처리를 중단하려면 `stopHandlingAutoChangeDetectionStatus()`를 실행합니다.
