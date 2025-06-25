<!--
# Control Flow in Components - `@for`
-->
# 흐름 제어 - `@for`

<!--
Often when building web applications, you need to repeat some code a specific number of times - for example, given an array of names, you may want to display each name in a `<p>` tag.

Note: Learn more about [control flow in the essentials guide](/essentials/templates#control-flow-with-if-and-for).

In this activity, you'll learn how to use `@for` to repeat elements in a template.

<hr/>

The syntax that enables repeating elements in a template is `@for`.

Here's an example of how to use the `@for` syntax in a component:

```angular-ts
@Component({
  ...
  template: `
    @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
  `,
})
export class App {
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, {id: 'linux', name: 'Linux'}];
}
```

Two things to take note of:

- There is an `@` prefix for the `for` because it is a special syntax called [Angular template syntax](guide/templates)
- For applications using v16 and older please refer to the [Angular documentation for NgFor](guide/directives/structural-directives)

<docs-workflow>

<docs-step title="Add the `users` property">
In the `App` class, add a property called `users` that contains users and their names.

```ts
[{id: 0, name: 'Sarah'}, {id: 1, name: 'Amy'}, {id: 2, name: 'Rachel'}, {id: 3, name: 'Jessica'}, {id: 4, name: 'Poornima'}]
```

</docs-step>

<docs-step title="Update the template">
Update the template to display each user name in a `p` element using the `@for` template syntax.

```angular-html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
}
```

NOTE: the use of `track` is required, you may use the `id` or some other unique identifier.

</docs-step>

</docs-workflow>

This type of functionality is called control flow. Next, you'll learn to customize and communicate with components - by the way, you're doing a great job so far.
-->
웹 애플리케이션을 개발하다보면, 이름들이 모여있는 배열과 같이 코드를 반복해야 하는 경우가 있습니다.
개별 이름마다 `<p>` 태그를 반복하려는 경우가 그렇습니다.

참고: [흐름 제어 핵심 가이드](/essentials/templates#control-flow-with-if-and-for) 문서를 참고하세요.

이번에는 템플릿 엘리먼트를 반복하는 `@for`를 어떻게 사용하는지 알아봅시다.

<hr/>

템플릿에서 엘리먼트를 반복하려면 `@for`를 사용하면 됩니다.

아래 예제를 확인해 보세요:

```angular-ts
@Component({
  ...
  template: `
    @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
  `,
})
export class App {
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, {id: 'linux', name: 'Linux'}];
}
```

이 코드에서 중요한 점이 두가지 있습니다:

- [Angular 템플릿 문법](guide/templates)을 사용하기 위해 `for` 앞에는 `@` 접두사가 붙습니다. 
- Angulav 16 버전이나 이전 버전에서는 [Angular NgFor 문서](guide/directives/structural-directives)를 참고하세요.

<docs-workflow>

<docs-step title="`users` 프로퍼티를 추가해 보세요">

`App` 컴포넌트 클래스에 `users` 프로퍼티를 추가하고 사용자의 이름들을 지정합니다.

```ts
[{id: 0, name: 'Sarah'}, {id: 1, name: 'Amy'}, {id: 2, name: 'Rachel'}, {id: 3, name: 'Jessica'}, {id: 4, name: 'Poornima'}]
```

</docs-step>

<docs-step title="템플릿을 수정하세요">

이제 사용자 이름마다 `p` 엘리먼트를 반복하도록 템플릿 문법 `@for` 를 사용해 보세요.

```angular-html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
}
```

참고: `track`은 필수 항목입니다. 이번 예제에서는 `id` 프로퍼티를 기준으로 객체를 구분합니다.

</docs-step>

</docs-workflow>

이런 기능을 흐름 제어라고 합니다.
다음에는 컴포넌트를 커스터마이징하고 컴포넌트끼리 통신하는 방법을 알아봅시다.