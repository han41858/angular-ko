<!--
# Add validation to your form
-->

# 폼에 유효성 검사 추가하기

<!--
Adding validation to your form is critical to ensure users enter valid data. Signal Forms uses validators in a schema function that you pass to the `form()` function.
-->

사용자가 올바른 데이터를 입력하도록 하려면 폼에 유효성 검사를 추가해야 합니다. 시그널 폼은 `form()` 함수에 전달하는 스키마 함수 안에서 유효성 검사 함수를 사용합니다.

<!--
In this activity, you'll learn how to:

- Import built-in validators
- Define a schema function for your form
- Apply validators to specific fields with custom error messages

Let's add validation!
-->

이번 실습에서는 다음 내용을 배웁니다:

- 내장 유효성 검사 함수 불러오기
- 폼의 스키마 함수 정의하기
- 특정 필드에 커스텀 오류 메시지와 유효성 검사 함수 적용하기

유효성 검사를 추가해 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Import the validators">
-->

<docs-step title="유효성 검사 함수 불러오기">

<a id="import-the-validators"></a>

<!--
Import the `required` and `email` validators from `@angular/forms/signals`:
-->

`@angular/forms/signals`에서 `required`와 `email` 유효성 검사 함수를 불러옵니다:

```ts
import {form, FormField, required, email} from '@angular/forms/signals';
```

</docs-step>

<!--
<docs-step title="Add a schema function to your form">
-->

<docs-step title="폼에 스키마 함수 추가하기">

<a id="add-a-schema-function-to-your-form"></a>

<!--
Update your `form()` call to include a schema function as the second parameter. The schema function receives a `fieldPath` parameter that lets you access each field:
-->

`form()`을 호출할 때 두 번째 인자로 스키마 함수를 전달합니다. 스키마 함수는 각 필드에 접근할 수 있는 `fieldPath` 인자를 받습니다:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  // Validators will go here
});
```

</docs-step>

<!--
<docs-step title="Add validation to the email field">
-->

<docs-step title="이메일 필드에 유효성 검사 추가하기">

<a id="add-validation-to-the-email-field"></a>

<!--
Inside the schema function, add validation for the email field. Use both `required()` and `email()` validators:
-->

스키마 함수 안에 이메일 필드의 유효성 검사를 추가합니다. `required()`와 `email()` 유효성 검사 함수를 모두 사용하세요:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
});
```

<!--
The `message` option provides custom error messages for users.
-->

`message` 옵션은 사용자에게 보여줄 커스텀 오류 메시지를 지정합니다.
</docs-step>

<!--
<docs-step title="Add validation to the password field">
-->

<docs-step title="비밀번호 필드에 유효성 검사 추가하기">

<a id="add-validation-to-the-password-field"></a>

<!--
Add validation for the password field using the `required()` validator:
-->

`required()` 유효성 검사 함수를 사용해서 비밀번호 필드에 유효성 검사를 추가합니다:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
  required(fieldPath.password, {message: 'Password is required'});
});
```

</docs-step>

</docs-workflow>

<!--
Perfect! You've added validation to your form. The validators run automatically as users interact with the form. When validation fails, the field's state will reflect the errors.
-->

폼에 유효성 검사를 추가했습니다! 사용자가 폼과 상호작용하면 유효성 검사 함수가 자동으로 실행됩니다. 유효성 검사에 실패하면 필드 상태에 오류가 반영됩니다.

<!--
Next, you'll learn [how to display validation errors in the template](/tutorials/signal-forms/4-display-errors)!
-->

다음 단계에서는 [템플릿에 유효성 검사 오류를 표시하는 방법](/tutorials/signal-forms/4-display-errors)을 배웁니다!
