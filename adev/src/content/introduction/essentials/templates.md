<docs-decorative-header title="템플릿" imgSrc="adev/src/assets/images/templates.svg"> <!-- markdownlint-disable-line -->
사용자 입력에 동적으로 반응하려면 템플릿 문법을 사용하면 됩니다.
</docs-decorative-header>

<!--
Component templates aren't just static HTML— they can use data from your component class and set up handlers for user interaction.
-->
컴포넌트 템플릿은 단순한 정적 HTML이 아닙니다.
컴포넌트 템플릿은 컴포넌트 클래스에 있는 데이터를 불러오거나 사용자의 동작을 감지하는 핸들러에 반응합니다. 


<!--
## Showing dynamic text
-->
## 동적 텍스트 표시하기

<!--
In Angular, a *binding* creates a dynamic connection between a component's template and its data. This connection ensures that changes to the component's data automatically update the rendered template.

You can create a binding to show some dynamic text in a template by using double curly-braces:

```angular-ts
@Component({
  selector: 'user-profile',
  template: `<h1>Profile for {{userName()}}</h1>`,
})
export class TodoListItem {
  userName = signal('pro_programmer_123');
}
```

When Angular renders the component, you see:

```html
<h1>Profile for pro_programmer_123</h1>
```

Angular automatically keeps the binding up-to-date when the value of the signal changes. Building on
the example above, if we update the value of the `userName` signal:

```typescript
this.userName.set('cool_coder_789');
```

The rendered page updates to reflect the new value:

```html
<h1>Profile for cool_coder_789</h1>
```
-->
Angular는 컴포넌트 템플릿과 컴포넌트 데이터를 *바인딩해서* 동적으로 연결합니다.
이후에 컴포넌트 데이터가 변경되면 렌더링된 템플릿을 자동으로 갱신합니다.

템플릿에 동적 텍스트를 바인딩하려면 이중 중괄호(`{{`, `}}`)를 사용하면 됩니다:

```angular-ts
@Component({
  selector: 'user-profile',
  template: `<h1>Profile for {{userName()}}</h1>`,
})
export class TodoListItem {
  userName = signal('pro_programmer_123');
}
```

이제 Angular가 컴포넌트를 렌더링하면 이런 화면을 볼 수 있습니다:

```html
<h1>Profile for pro_programmer_123</h1>
```

이제 Angular는 시그널이 변경되는 것을 자동으로 추적하게 됩니다.
위 예제에서 선언한 `userName` 시그널의 값을 변경해 봅시다:

```typescript
this.userName.set('cool_coder_789');
```

그러면 화면이 다음과 같이 변경됩니다:

```html
<h1>Profile for cool_coder_789</h1>
```

<!--
## Setting dynamic properties and attributes
-->
## 동적 프로퍼티, 동적 어트리뷰트 연결하기

<!--
Angular supports binding dynamic values into DOM properties with square brackets:

```angular-ts
@Component({
  /*...*/
  // Set the `disabled` property of the button based on the value of `isValidUserId`.
  template: `<button [disabled]="isValidUserId()">Save changes</button>`,
})
export class UserProfile {
  isValidUserId = signal(false);
}
```

You can also bind to HTML _attributes_ by prefixing the attribute name with `attr.`:

```angular-html
<!- Bind the `role` attribute on the `<ul>` element to value of `listRole`. ->
<ul [attr.role]="listRole()">
```

Angular automatically updates DOM properties and attribute when the bound value changes.
-->
대괄호(`[`, `]`)를 사용하면 DOM 프로퍼티를 동적으로 바인딩할 수 있습니다:

```angular-ts
@Component({
  /*...*/
  // `isValidUserId` 시그널 값에 따라 `disabled` 프로퍼티 값을 설정합니다.
  template: `<button [disabled]="isValidUserId()">Save changes</button>`,
})
export class UserProfile {
  isValidUserId = signal(false);
}
```

그리고 `attr.` 접두사를 붙이면 HTML _어트리뷰트_ 를 바인딩할 수 있습니다:

```angular-html
<!-- `listRole` 시그널 값을 `<ul>` 엘리먼트의 `role` 어트리뷰트에 바인딩합니다. -->
<ul [attr.role]="listRole()">
```

이제 DOM 프로퍼티와 어트리뷰트 값이 변경되면 Angular가 자동으로 DOM을 갱신합니다.


<!--
## Handling user interaction
-->
## 사용자 입력 처리하기

<!--
Angular lets you add event listeners to an element in your template with parentheses:

```angular-ts
@Component({
  /*...*/
  // Add an 'click' event handler that calls the `cancelSubscription` method. 
  template: `<button (click)="cancelSubscription()">Cancel subscription</button>`,
})
export class UserProfile {
  /* ... */
  
  cancelSubscription() { /* Your event handling code goes here. */  }
}
```

If you need to pass the [event](https://developer.mozilla.org/docs/Web/API/Event) object to your listener, you can use Angular's built-in `$event` variable inside the function call:

```angular-ts
@Component({
  /*...*/
  // Add an 'click' event handler that calls the `cancelSubscription` method. 
  template: `<button (click)="cancelSubscription($event)">Cancel subscription</button>`,
})
export class UserProfile {
  /* ... */
  
  cancelSubscription(event: Event) { /* Your event handling code goes here. */  }
}
```
-->
템플릿 엘리먼트에 소괄호(`(`, `)`)를 사용하면 이벤트 리스너를 추가할 수 있습니다:

```angular-ts
@Component({
  /*...*/
  // `cancelSubscription` 메서드를 실행하는 `click` 이벤트 핸들러를 추가합니다. 
  template: `<button (click)="cancelSubscription()">Cancel subscription</button>`,
})
export class UserProfile {
  /* ... */
  
  cancelSubscription() { /* 이벤트를 처리하는 코드는 여기에 작성합니다. */  }
}
```

[이벤트](https://developer.mozilla.org/docs/Web/API/Event) 객체를 이벤트 핸들러로 보내려면, 이벤트 핸들러 메서드를 실행하면서 Angular가 기본으로 제공하는 `$event` 변수를 전달하면 됩니다:

```angular-ts
@Component({
  /*...*/
  // `cancelSubscription` 메서드를 실행하는 `click` 이벤트 핸들러를 추가합니다. 
  template: `<button (click)="cancelSubscription($event)">Cancel subscription</button>`,
})
export class UserProfile {
  /* ... */
  
  cancelSubscription(event: Event) { /* 이벤트를 처리하는 코드는 여기에 작성합니다. */  }
}
```

<!--
## Control flow with `@if` and `@for`
-->
## `@if`와 `@for`로 흐름 제어하기

<!--
You can conditionally hide and show parts of a template with Angular's `@if` block:
-->
`@if` 블록을 사용하면 템플릿의 특정 영역을 표시하거나 감출 수 있습니다:

```angular-html
<h1>User profile</h1>

@if (isAdmin()) {
  <h2>Admin settings</h2>
  <!-- ... -->
}
```

<!--
The `@if` block also supports an optional `@else` block:
-->
`@if` 블록을 사용할 때 `@else` 블록을 함께 사용할 수도 있습니다:

```angular-html
<h1>User profile</h1>

@if (isAdmin()) {
  <h2>Admin settings</h2>
  <!-- ... -->
} @else {
  <h2>User settings</h2>
  <!-- ... -->  
}
```

<!--
You can repeat part of a template multiple times with Angular's `@for` block:
-->
특정 템플릿 영역을 반복하려면 `@for` 블록을 사용하면 됩니다:

```angular-html
<h1>User profile</h1>

<ul class="user-badge-list">
  @for (badge of badges(); track badge.id) {
    <li class="user-badge">{{badge.name}}</li>
  }
</ul>
```

<!--
Angular's uses the `track` keyword, shown in the example above, to associate data with the DOM elements created by `@for`. See [_Why is track in @for blocks important?_](guide/templates/control-flow#why-is-track-in-for-blocks-important) for more info.

TIP: Want to know more about Angular templates? See the [In-depth Templates guide](guide/templates) for the full details.
-->
위 예제에서 `@for` 문으로 DOM에서 반복되는 개별 객체를 구분하기 위해 `track` 키워드를 사용합니다.
자세한 내용은 [_왜 @for 블록에 track이 중요한가요?_](guide/templates/control-flow#why-is-track-in-for-blocks-important) 문서를 참고하세요.

팁: 템플릿을 더 자세하게 알아보고 싶은가요? 그렇다면 [템플릿 심화 가이드](guide/templates) 문서를 참고하세요.


<!--
## Next Step
-->
## 다음 단계

<!--
Now that you have dynamic data and templates in the application, it's time to learn how to enhance templates by conditionally hiding or showing certain elements, looping over elements, and more.

<docs-pill-row>
  <docs-pill title="Modular design with dependency injection" href="essentials/dependency-injection" />
  <docs-pill title="In-depth template guide" href="guide/templates" />
</docs-pill-row>
-->
이제 동적 데이터와 템플릿을 연결하는 방법을 알아봤습니다.
그리고 조건에 따라 템플릿의 특정 부분을 표시하거나, 표시하지 않는 방법을 알아봤고 어떤 템플릿 부분을 반복하는 방법을 알아봤습니다.

<docs-pill-row>
  <docs-pill title="의존성 주입을 활용한 모듈 디자인" href="essentials/dependency-injection" />
  <docs-pill title="템플릿 심화 가이드" href="guide/templates" />
</docs-pill-row>
