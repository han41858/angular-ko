<!--
# Add form submission
-->

# 폼 제출 추가하기

<!--
Finally, let's learn how to handle form submission. You'll learn how to use the `submit()` function to run async operations when the form is valid, and disable the submit button when the form has errors.
-->

마지막으로 폼 제출을 처리하는 방법을 배워봅시다. `submit()` 함수를 사용해서 폼이 유효할 때 비동기 작업을 실행하고, 폼에 오류가 있을 때 제출 버튼을 비활성화하는 방법을 배웁니다.

<!--
In this activity, you'll learn how to:

- Import the `submit()` function
- Create a submission handler method
- Use `submit()` to run logic only when valid
- Disable the submit button based on form state

Let's complete the form!
-->

이번 실습에서는 다음 내용을 배웁니다:

- `submit()` 함수 불러오기
- 제출 핸들러 메서드 만들기
- `submit()`으로 폼이 유효할 때만 로직 실행하기
- 폼 상태에 따라 제출 버튼 비활성화하기

폼을 완성해 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Import the submit function">
-->

<docs-step title="submit 함수 불러오기">

<a id="import-the-submit-function"></a>

<!--
Import the `submit` function from `@angular/forms/signals`:
-->

`@angular/forms/signals`에서 `submit` 함수를 불러옵니다:

```ts
import {form, FormField, required, email, submit} from '@angular/forms/signals';
```

</docs-step>

<!--
<docs-step title="Add the onSubmit method">
-->

<docs-step title="onSubmit 메서드 추가하기">

<a id="add-the-onsubmit-method"></a>

<!--
In your component class, add an `onSubmit()` method that handles form submission:
-->

컴포넌트 클래스에 폼 제출을 처리하는 `onSubmit()` 메서드를 추가합니다:

```ts
onSubmit(event: Event) {
  event.preventDefault();
  submit(this.loginForm, async () => {
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    // Add your login logic here
  });
}
```

<!--
The `submit()` function only runs your async callback if the form is valid. It also handles the form's submission state automatically.
-->

`submit()` 함수는 폼이 유효할 때만 비동기 콜백을 실행합니다. 폼의 제출 상태도 자동으로 처리합니다.
</docs-step>

<!--
<docs-step title="Bind the submit handler to the form">
-->

<docs-step title="제출 핸들러를 폼에 바인딩하기">

<a id="bind-the-submit-handler-to-the-form"></a>

<!--
In your template, bind the `onSubmit()` method to the form's submit event:
-->

템플릿에서 `onSubmit()` 메서드를 폼의 submit 이벤트에 바인딩합니다:

```html
<form (submit)="onSubmit($event)"></form>
```

</docs-step>

<!--
<docs-step title="Disable the button when form is invalid">
-->

<docs-step title="폼이 유효하지 않을 때 버튼 비활성화하기">

<a id="disable-the-button-when-form-is-invalid"></a>

<!--
Update the submit button to be disabled when the form is invalid:
-->

폼이 유효하지 않으면 제출 버튼이 비활성화되도록 수정합니다:

```html
<button type="submit" [disabled]="loginForm().invalid()">Log in</button>
```

<!--
This prevents submission when the form has validation errors.
-->

폼에 유효성 검사 오류가 있으면 제출할 수 없게 합니다.
</docs-step>

</docs-workflow>

<!--
Congratulations! You've built a complete login form with Signal Forms.
-->

축하합니다! 시그널 폼으로 로그인 폼을 완성했습니다.

<!--
Ready to see what you've learned and explore advanced topics? Continue to [the next steps](/tutorials/signal-forms/6-next-steps)!
-->

배운 내용을 정리하고 심화 주제를 살펴볼까요? [다음 단계](/tutorials/signal-forms/6-next-steps)로 이동하세요!
