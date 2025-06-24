<!--
# Control Flow in Components - `@if`
-->
# 흐름 제어 - `@if`

<!--
Deciding what to display on the screen for a user is a common task in application development. Many times, the decision is made programmatically using conditions.

To express conditional displays in templates, Angular uses the `@if` template syntax.

Note: Learn more about [control flow in the essentials guide](/essentials/templates#control-flow-with-if-and-for).

In this activity, you'll learn how to use conditionals in templates.

<hr/>

The syntax that enables the conditional display of elements in a template is `@if`.

Here's an example of how to use the `@if` syntax in a component:

```angular-ts
@Component({
  ...
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
  `,
})
class App {
  isLoggedIn = true;
}
```

Two things to take note of:

- There is an `@` prefix for the `if` because it is a special type of syntax called [Angular template syntax](guide/templates)
- For applications using v16 and older please refer to the [Angular documentation for NgIf](guide/directives/structural-directives) for more information.

<docs-workflow>

<docs-step title="Create a property called `isServerRunning`">
In the `App` class, add a `boolean` property called `isServerRunning`, set the initial value to `true`.
</docs-step>

<docs-step title="Use `@if` in the template">
Update the template to display the message `Yes, the server is running` if the value of `isServerRunning` is `true`.

</docs-step>

<docs-step title="Use `@else` in the template">
Now Angular supports native template syntax for defining the else case with the `@else` syntax. Update the template to display the message `No, the server is not running` as the else case.

Here's an example:

```angular-ts
template: `
  @if (isServerRunning) { ... }
  @else { ... }
`;
```

Add your code to fill in the missing markup.

</docs-step>

</docs-workflow>

This type of functionality is called conditional control flow. Next you'll learn how to repeat items in a template.
-->
앱을 개발하다보면 사용자에게 어떤 화면을 표시해야 할 지 판단할 일이 많습니다.
그리고 이런 경우는 대부분 앱 상태에 따라 조건으로 결정됩니다.

템플릿에서 조건에 따라 엘리먼트를 표시하거나 표시하지 않으려면 템플릿 문법 `@if` 를 사용하면 됩니다.

참고: [흐름 제어 핵심 가이드](/essentials/templates#control-flow-with-if-and-for) 문서를 참고하세요.

이번에는 템플릿에 조건을 지정해 봅시다.

<hr/>

조건에 따라 엘리먼트를 화면에 표시하거나 표시하지 않으려면 `@if` 를 사용합니다.

이렇게 사용하면 됩니다:

```angular-ts
@Component({
  ...
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
  `,
})
class App {
  isLoggedIn = true;
}
```

두 가지가 중요합니다:

- `if` 앞에는 `@`가 붙습니다. 이 문자는 [Angular 템플릿 문법](guide/templates)이라는 것을 의미합니다.
- v16 버전이나 이전 버전에서는 [Angular NgIf 문서](guide/directives/structural-directives) 를 참고하세요.

<docs-workflow>

<docs-step title="`isServerRunning` 프로퍼티를 추가해 봅시다">

`App` 컴포넌트 클래스에 `boolean` 타입으로 `isServerRunning` 프로퍼티를 선언하고 이 프로퍼티 값으로 `true` 를 지정합니다.

</docs-step>

<docs-step title="템플릿에 `@if` 사용하기">

`isServerRunning`의 값이 `true`라면 `Yes, the server is running`을 표시하도록 템플릿을 수정합니다.

</docs-step>

<docs-step title="템플릿에 `@else` 사용하기">

Angular는 else에 해당하는 템플릿 문법 `@else`를 제공합니다.
템플릿을 수정해서 else인 경우에 `No, the server is not running`이 표시되게 수정해 봅시다.

예제를 봅시다:

```angular-ts
template: `
  @if (isServerRunning) { ... }
  @else { ... }
`;
```

빠진 마크업을 직접 작성해 보세요.

</docs-step>

</docs-workflow>

이런 기능을 조건부 흐름 제어라고 합니다.
다음 예제에서는 항목을 반복하는 방법을 알아봅시다.
