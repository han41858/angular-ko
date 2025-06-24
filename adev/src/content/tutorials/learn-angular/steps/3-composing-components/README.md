<!--
# Composing Components
-->
# 컴포넌트 적용하기

<!--
You've learned to update the component template, component logic, and component styles, but how do you use a component in your application?

The `selector` property of the component configuration gives you a name to use when referencing the component in another template. You use the `selector` like an HTML tag, for example `app-user` would be `<app-user />` in the template.

Note: Learn more about [using components in the essentials guide](/essentials/components#using-components).

In this activity, you'll learn how to compose components.

<hr/>

In this example, there are two components `User` and `App`.

<docs-workflow>

<docs-step title="Add a reference to `User`">
Update the `App` template to include a reference to the `User` which uses the selector `app-user`. Be sure to add `User` to the imports array of `App`, this makes it available for use in the `App` template.

```ts
template: `<app-user />`,
imports: [User]
```

The component now displays the message `Username: youngTech`. You can update the template code to include more markup.
</docs-step>

<docs-step title="Add more markup">
Because you can use any HTML markup that you want in a template, try updating the template for `App` to also include more HTML elements. This example will add a `<section>` element as the parent of the `<app-user>` element.

```ts
template: `<section><app-user /></section>`,
```

</docs-step>

</docs-workflow>
You can use as much HTML markup and as many components as you need to bring your app idea to reality. You can even have multiple copies of your component on the same page.

That's a great segue, how would you conditionally show a component based on data? Head to the next section to find out.
-->
지금까지 컴포넌트의 템플릿, 클래스 로직, 스타일 수정방법을 알아봤습니다.
그런데 이 컴포넌트는 애플리케이션에 어떻게 적용할 수 있을까요?

컴포넌트 설정 프로퍼티 중 `selector` 프로퍼티가 다른 템플릿에 사용되면 그 위치에 컴포넌트를 두겠다는 것을 의미합니다.
그래서 `selector` 는 HTML 태그처럼 사용하며, `selector` 가 `app-user` 라면 템플릿에 `<app-user />` 라고 사용하면 됩니다.

참고: [컴포넌트 조합하기 핵심 가이드](/essentials/components#using-components) 문서를 참고하세요.

이제 컴포넌트를 적용해 봅시다.

<hr/>

이번 예제에는 `User` 컴포넌트와 `App` 컴포넌트가 있습니다.

<docs-workflow>

<docs-step title="`User` 컴포넌트를 추가해 보세요">

`User` 컴포넌트를 `App` 컴포넌트 템플릿에 적용하기 위해 셀렉터로 지정한 `app-user` 를 추가합니다.
`App` 컴포넌트의 `imports` 배열에 `User` 컴포넌트를 추가하는 것을 잊지 마세요.
추가하지 않으면 `User` 컴포넌트를 사용할 수 없습니다.

```ts
template: `<app-user />`,
imports: [User]
```

이제 `Username: youngTech`라는 메시지가 화면에 표시됩니다.
템플릿을 좀 더 수정해 봅시다.

</docs-step>

<docs-step title="마크업을 추가해 보세요">

컴포넌트 템플릿에는 HTML 마크업을 자유롭게 사용할 수 있기 때문에 `App` 컴포넌트 템플릿을 좀 더 수정해 봅시다.
이번에는 `<app-user>` 엘리먼트를 감싸는 `<section>` 엘리먼트를 추가해 봅시다.

```ts
template: `<section><app-user /></section>`,
```

</docs-step>

</docs-workflow>

앱을 구현하는 동안 HTML 마크업과 컴포넌트는 얼마든지 자유롭게 추가할 수 있습니다.
그리고 한 화면에 컴포넌트를 동시에 여러번 사용할 수도 있습니다.

어떤 조건에 따라 컴포넌트를 표시하거나 표시하지 않으려면 어떻게 해야 할까요?
다음 예제에서 살펴 봅시다.
