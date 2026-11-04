<!--
# Component harnesses overview
-->

<a id="component-harnesses-overview"></a>

# 컴포넌트 하네스 개요

<!--
A <strong>component harness</strong> is a class that allows tests to interact with components the way an end user does via a supported API. You can create test harnesses for any component, ranging from small reusable widgets to full pages.

Harnesses offer several benefits:

- They make tests less brittle by insulating themselves against implementation details of a component, such as its DOM structure
- They make tests become more readable and easier to maintain
- They can be used across multiple testing environments

```ts
// Example of test with a harness for a component called MyButtonComponent
it('should load button with exact text', async () => {
  const button = await loader.getHarness(MyButtonComponentHarness);
  expect(await button.getText()).toBe('Confirm');
});
```

Component harnesses are especially useful for shared UI widgets. Developers often write tests that depend on private implementation details of widgets, such as DOM structure and CSS classes. Those dependencies make tests brittle and hard to maintain. Harnesses offer an alternative— a supported API that interacts with the widget the same way an end-user does. Widget implementation changes now become less likely to break user tests. For example, [Angular Material](https://material.angular.dev/components/categories) provides a test harness for each component in the library.

Component harnesses support multiple testing environments. You can use the same harness implementation in both unit and end-to-end tests. Test authors only need to learn one API and component authors don't have to maintain separate unit and end-to-end test implementations.

Many developers can be categorized by one of the following developer type categories: test authors, component harness authors, and harness environment authors. Use the table below to find the most relevant section in this guide based on these categories:

| Developer Type              | Description                                                                                                                                                                                                                                                                                            | Relevant Section                                                                                             |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| Test Authors                | Developers that use component harnesses written by someone else to test their application. For example, this could be an app developer who uses a third-party menu component and needs to interact with the menu in a unit test.                                                                       | [Using component harnesses in tests](guide/testing/using-component-harnesses)                                |
| Component harness authors   | Developers who maintain some reusable Angular components and want to create a test harness for its users to use in their tests. For example, an author of a third party Angular component library or a developer who maintains a set of common components for a large Angular application.             | [Creating component harnesses for your components](guide/testing/creating-component-harnesses)               |
| Harness environment authors | Developers who want to add support for using component harnesses in additional testing environments. For information on supported testing environments out-of-the-box, see the [test harness environments and loaders](guide/testing/using-component-harnesses#test-harness-environments-and-loaders). | [Adding support for additional testing environments](guide/testing/component-harnesses-testing-environments) |

For the full API reference, please see the [Angular CDK's component harness API reference page](/api#angular_cdk_testing).
-->

<strong>컴포넌트 하네스</strong>는 공식적으로 지원되는 API로 실제 사용자와 같은 방식으로 컴포넌트와 상호작용할 수 있게 하는 클래스입니다.
재사용하는 작은 위젯부터 페이지 전체까지 어떤 컴포넌트에도 테스트 하네스를 만들 수 있습니다.

하네스를 사용하면 다음과 같은 장점이 있습니다.

- 컴포넌트의 DOM 구조와 같은 내부 구현에 의존하지 않으므로 변경에 쉽게 깨지지 않는 테스트를 작성할 수 있습니다.
- 테스트를 읽기 쉽고 유지보수하기 편합니다.
- 여러 테스트 환경에서 사용할 수 있습니다.

```ts
// MyButtonComponent의 하네스를 사용하는 테스트 예제
it('should load button with exact text', async () => {
  const button = await loader.getHarness(MyButtonComponentHarness);
  expect(await button.getText()).toBe('Confirm');
});
```

컴포넌트 하네스는 공유하는 UI 위젯에 특히 유용합니다.
개발자는 DOM 구조나 CSS 클래스처럼 위젯의 비공개 구현에 의존하는 테스트를 작성하는 경우가 많습니다.
이런 의존성이 있으면 테스트가 변경에 취약해지고 유지보수하기 어려워집니다.
하네스는 실제 사용자와 같은 방식으로 위젯과 상호작용하는 공식 지원 API를 제공합니다.
그러면 위젯의 구현이 변경되어도 이를 사용하는 테스트가 실패할 가능성이 줄어듭니다.
예를 들어 [Angular Material](https://material.angular.dev/components/categories)은 라이브러리의 각 컴포넌트에 테스트 하네스를 제공합니다.

컴포넌트 하네스는 여러 테스트 환경을 지원합니다.
단위 테스트와 E2E 테스트에서 같은 하네스 구현을 사용할 수 있습니다.
테스트를 작성하는 개발자는 API 하나만 익히면 되고, 컴포넌트 개발자는 단위 테스트와 E2E 테스트용 구현을 따로 관리할 필요가 없습니다.

개발자는 테스트 작성자, 컴포넌트 하네스 작성자, 하네스 환경 작성자로 구분할 수 있습니다.
아래 표에서 해당하는 역할에 맞는 문서를 확인하세요.

| 개발자 역할            | 설명                                                                                                                                                                                                                                      | 관련 문서                                                                           |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| 테스트 작성자          | 다른 사람이 만든 컴포넌트 하네스로 애플리케이션을 테스트하는 개발자입니다. 예를 들어 서드 파티 메뉴 컴포넌트를 사용하고 단위 테스트에서 메뉴와 상호작용해야 하는 애플리케이션 개발자가 해당합니다.                                        | [테스트에서 컴포넌트 하네스 사용하기](guide/testing/using-component-harnesses)      |
| 컴포넌트 하네스 작성자 | 재사용할 수 있는 Angular 컴포넌트를 관리하면서, 사용자가 테스트에 활용할 하네스를 만들려는 개발자입니다. 서드 파티 Angular 컴포넌트 라이브러리 작성자나 대규모 Angular 애플리케이션의 공통 컴포넌트를 관리하는 개발자가 해당합니다.       | [컴포넌트 하네스 만들기](guide/testing/creating-component-harnesses)                |
| 하네스 환경 작성자     | 추가 테스트 환경에서 컴포넌트 하네스를 사용할 수 있도록 지원하려는 개발자입니다. 기본으로 지원하는 테스트 환경은 [테스트 하네스 환경과 로더](guide/testing/using-component-harnesses#test-harness-environments-and-loaders)를 참고하세요. | [추가 테스트 환경 지원하기](guide/testing/component-harnesses-testing-environments) |

전체 API는 [Angular CDK 컴포넌트 하네스 API 문서](/api#angular_cdk_testing)를 참고하세요.
