<!--
# Display validation errors
-->

# 유효성 검사 에러 표시하기

<!--
Now that you're able to validate the form, it's important to show validation errors to users.
-->

이제 폼의 유효성을 검사할 수 있으므로, 사용자에게 유효성 검사 에러를 표시해야 합니다.

<!--
In this activity, you'll learn how to:

- Access field state with validation signals
- Use `@if` to conditionally display errors
- Loop through errors with `@for`
- Show errors only after user interaction

Let's display validation feedback!
-->

이번 실습에서는 다음 내용을 배웁니다:

- 유효성 검사 시그널로 필드 상태에 접근하기
- `@if`로 조건에 따라 에러 표시하기
- `@for`로 에러 목록 순회하기
- 사용자가 상호작용한 후에만 에러 표시하기

유효성 검사 결과를 표시해 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Add error display for email field">
-->

<docs-step title="이메일 필드에 에러 표시 추가하기">

<a id="add-error-display-for-email-field"></a>

<!--
Below the email input, add conditional error display. This will only show errors when the field is both invalid and touched:
-->

이메일 입력 엘리먼트 아래에 조건부 에러 표시를 추가합니다. 필드가 유효하지 않으면서 touched 상태일 때만 에러가 표시됩니다:

```angular-html
<label>
  Email
  <input type="email" [formField]="loginForm.email" />
</label>
@if (loginForm.email().invalid() && loginForm.email().touched()) {
  <div class="error">
    @for (error of loginForm.email().errors(); track error.kind) {
      <span>{{ error.message }}</span>
    }
  </div>
}
```

<!--
The `loginForm.email()` call accesses the field's state signal. The `invalid()` method returns `true` when validation fails, `touched()` returns `true` after the user has interacted with the field, and `errors()` provides an array of validation errors with their custom messages.
-->

`loginForm.email()`을 호출하면 필드의 상태 시그널에 접근합니다. `invalid()`는 유효성 검사에 실패했을 때 `true`를 반환하고, `touched()`는 사용자가 필드와 상호작용한 후 `true`를 반환합니다. `errors()`는 커스텀 메시지가 포함된 유효성 검사 에러 배열을 제공합니다.
</docs-step>

<!--
<docs-step title="Add error display for password field">
-->

<docs-step title="비밀번호 필드에 에러 표시 추가하기">

<a id="add-error-display-for-password-field"></a>

<!--
Below the password input, add the same pattern for password errors:
-->

비밀번호 입력 엘리먼트 아래에도 같은 방식으로 비밀번호 에러 표시를 추가합니다:

```angular-html
<label>
  Password
  <input type="password" [formField]="loginForm.password" />
</label>
@if (loginForm.password().invalid() && loginForm.password().touched()) {
  <div class="error">
    @for (error of loginForm.password().errors(); track error.kind) {
      <span>{{ error.message }}</span>
    }
  </div>
}
```

</docs-step>

</docs-workflow>

<!--
Excellent! You've added error display to your form. The errors appear only after users interact with a field, providing helpful feedback without being intrusive.
-->

폼에 에러 표시를 추가했습니다! 사용자가 필드와 상호작용한 후에만 에러가 나타나므로, 입력을 방해하지 않으면서 필요한 안내를 제공합니다.

<!--
Next, you'll learn [how to handle form submission](/tutorials/signal-forms/5-add-submission)!
-->

다음 단계에서는 [폼 제출을 처리하는 방법](/tutorials/signal-forms/5-add-submission)을 배웁니다!
