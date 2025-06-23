<!--
# Updating the Component Class
-->
# 컴포넌트 클래스 수정하기

<!--
In Angular, the component's logic and behavior are defined in the component's TypeScript class.

Note: Learn more about [showing dynamic text in the essentials guide](/essentials/templates#showing-dynamic-text).

In this activity, you'll learn how to update the component class and how to use [interpolation](/guide/templates/binding#render-dynamic-text-with-text-interpolation).

<hr />

<docs-workflow>

<docs-step title="Add a property called `city`">
Update the component class by adding a property called `city` to the `App` class.

```ts
export class App {
  city = 'San Francisco';
}
```

The `city` property is of type `string` but you can omit the type because of [type inference in TypeScript](https://www.typescriptlang.org/docs/handbook/type-inference.html). The `city` property can be used in the `App` class and can be referenced in the component template.

<br>

To use a class property in a template, you have to use the `{{ }}` syntax.
</docs-step>

<docs-step title="Update the component template">
Update the `template` property to match the following HTML:

```ts
template: `Hello {{ city }}`,
```

This is an example of interpolation and is a part of Angular template syntax. It enables you to do much more than put dynamic text in a template. You can also use this syntax to call functions, write expressions and more.
</docs-step>

<docs-step title="More practice with interpolation">
Try this - add another set of `{{ }}` with the contents being `1 + 1`:

```ts
template: `Hello {{ city }}, {{ 1 + 1 }}`,
```

Angular evaluates the contents of the `{{ }}` and renders the output in the template.
</docs-step>

</docs-workflow>

This is just the beginning of what's possible with Angular templates, keep on learning to find out more.
-->
컴포넌트의 로직이나 동작은 컴포넌트의 TypeScript 클래스에 정의합니다.

참고: [동적 텍스트 표시하기 핵심 가이드](/essentials/templates#showing-dynamic-text) 문서를 참고하세요.

이번에는 컴포넌트 클래스를 수정해보고 [문자열 바인딩(interpolation)](/guide/templates/binding#render-dynamic-text-with-text-interpolation)은 어떻게 사용하는지 알아봅시다.

<hr />

<docs-workflow>

<docs-step title="`city` 프로퍼티를 추가하세요">
컴포넌트 클래스를 수정해 봅시다. `App` 클래스에 `city` 라는 프로퍼티를 추가해 보세요.

```ts
export class App {
  city = 'San Francisco';
}
```

`city` 프로퍼티는 `string` 타입이겠지만 [TypeScript는 타입을 추론](https://www.typescriptlang.org/docs/handbook/type-inference.html) 하기 때문에 타입 지정은 생략할 수 있습니다.
`app` 클래스에 선언된 `city` 프로피터는 컴포넌트 템플릿에 사용하게 될 것입니다.

<br>

템플릿에 클래스 프로퍼티를 사용하려면 `{{ }}` 문법을 사용하면 됩니다.
</docs-step>

<docs-step title="컴포넌트 템플릿을 수정해 보세요">

`template` 프로퍼티를 다음과 같이 수정합니다:

```ts
template: `Hello {{ city }}`,
```

문자열 바인딩(interpolation)은 Angular가 제공하는 템플릿 문법입니다.
문자열 바인딩을 활용하면 동적 텍스트를 템플릿에 자유롭게 추가할 수 있습니다.
그리고 이 문법에 표현식을 사용하면 함수를 실행할 수도 있습니다.
</docs-step>

<docs-step title="문자열 바인딩을 더 활용해 보세요">

문자열 바인딩 문법(`{{ }}`) 에 `1 + 1` 을 입력해 보세요:

```ts
template: `Hello {{ city }}, {{ 1 + 1 }}`,
```

그러면 `{{ }}` 안의 표현식이 실행된 결과가 템플릿에 표시됩니다.
</docs-step>

</docs-workflow>

Angular 템플릿에서 할 수 있는 것은 이뿐만이 아닙니다.
다음 튜토리얼을 진행하면서 좀 더 알아봅시다.