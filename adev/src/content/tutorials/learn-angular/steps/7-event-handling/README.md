<!--
# Event handling
-->
# 이벤트 처리

<!--
Event handling enables interactive features on web apps. It gives you the ability as a developer to respond to user actions like button presses, form submissions and more.

Note: Learn more about [handling user interaction in the essentials guide](/essentials/templates#handling-user-interaction).

In this activity, you'll learn how to add an event handler.

<hr />

In Angular you bind to events with the parentheses syntax `()`. On a given element, wrap the event you want to bind to with parentheses and set an event handler. Consider this `button` example:

```angular-ts
@Component({
  ...
  template: `<button (click)="greet()">`
})
export class App {
  greet() {
    console.log('Hello, there 👋');
  }
}
```

In this example, the `greet()` function will run every time the button is clicked. Take note that the `greet()` syntax includes the trailing parenthesis.

Alright, your turn to give this a try:

<docs-workflow>

<docs-step title="Add an event handler">
Add the `showSecretMessage()` event handler function in the `App` class. Use the following code as the implementation:

```ts
showSecretMessage() {
  this.message = 'Way to go 🚀';
}
```

</docs-step>

<docs-step title="Bind to the template event">
Update the template code in `app.ts` to bind to the `mouseover` event of the `section` element.

```angular-html
<section (mouseover)="showSecretMessage()">
```

</docs-step>

</docs-workflow>

And with a few steps in the code you've created your first event handler in Angular. Seems like you are getting pretty good at this, keep up the good work.
-->
이벤트 처리 기능을 활용하면 웹 앱과 사용자가 상호작용할 수 있습니다.
이벤트 처리는 버튼을 누르거나 폼을 제출하는 등의 작업을 의미합니다.

참고: [사용자 입력 처리하기 핵심 가이드](/essentials/templates#handling-user-interaction) 문서를 참고하세요.

이번에는 이벤트 핸들러를 어떻게 추가할 수 있는지 알아봅시다.

<hr />

이벤트를 소괄호(`(`, `)`)로 감싸면 이벤트를 바인딩 할 수 있습니다.
그리고 소괄호 오른쪽에 이벤트를 처리할 핸들러를 지정하면 됩니다.
`button` 예제를 봅시다:

```angular-ts
@Component({
    ...
    template: `<button (click)="greet()">`
})
class App {
    greet() {
        console.log('Hello, there 👋');
    }
}
```

위 예제처럼 구현하면 버튼을 클릭할 때마다 `greet()` 함수가 실행됩니다.
`greet()` 함수를 실행하기 위해 소괄호를 붙이는 것을 잊지 마세요.

자, 이제 직접 수정해 봅시다:

<docs-workflow>

<docs-step title="이벤트 핸들러를 추가해 보세요">

`App` 컴포넌트 클래스에 `onMouseOver` 이벤트 핸들러 함수를 추가합니다.
이렇게 구현해 봅시다:

```ts
onMouseOver() {
    this.message = 'Way to go 🚀';
}
```

</docs-step>

<docs-step title="템플릿에서 이벤트를 바인딩합니다">

`app.ts` 파일에 있는 템플릿에서 `section` 엘리먼트에 `mouseover` 이벤트를 바인딩 해보세요.

```angular-html
<section (mouseover)="onMouseOver()">
```

</docs-step>

</docs-workflow>

간단한 작업만으로 이벤트 핸들러를 구현해 봤습니다.
꽤 잘하시는 것 같네요.
계속 해봅시다.