<!--
# Connect your form to the template
-->

# 폼을 템플릿에 연결하기

<!--
Now, you need to connect your form to the template using the `[formField]` directive. This creates two-way data binding between your form model and the input elements.
-->

이제 `[formField]` 디렉티브를 사용해서 폼을 템플릿에 연결합니다. 이렇게 하면 폼 모델과 입력 엘리먼트 사이에 양방향 데이터 바인딩이 만들어집니다.

<!--
In this lesson, you'll learn how to:

- Import the `FormField` directive
- Use the `[formField]` directive to bind form fields to inputs
- Connect text inputs and checkboxes to your form
- Display form field values in the template

Let's wire up the template!
-->

이번 단계에서는 다음 내용을 배웁니다:

- `FormField` 디렉티브 불러오기
- `[formField]` 디렉티브로 폼 필드를 입력 엘리먼트에 바인딩하기
- 텍스트 입력과 체크박스를 폼에 연결하기
- 템플릿에 폼 필드 값 표시하기

템플릿을 연결해 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Import the FormField directive">
-->

<docs-step title="FormField 디렉티브 불러오기">

<a id="import-the-formfield-directive"></a>

<!--
Import the `FormField` directive from `@angular/forms/signals` and add it to your component's imports array:
-->

`@angular/forms/signals`에서 `FormField` 디렉티브를 불러오고 컴포넌트의 imports 배열에 추가합니다:

```ts
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormField],
})
```

</docs-step>

<!--
<docs-step title="Bind the email field">
-->

<docs-step title="이메일 필드 바인딩하기">

<a id="bind-the-email-field"></a>

<!--
In your template, add the `[formField]` directive to the email input:
-->

템플릿의 이메일 입력 엘리먼트에 `[formField]` 디렉티브를 추가합니다:

```html
<input type="email" [formField]="loginForm.email" />
```

<!--
The `loginForm.email` expression accesses the email field from your form.
-->

`loginForm.email` 표현식은 폼의 이메일 필드에 접근합니다.
</docs-step>

<!--
<docs-step title="Bind the password field">
-->

<docs-step title="비밀번호 필드 바인딩하기">

<a id="bind-the-password-field"></a>

<!--
Add the `[formField]` directive to the password input:
-->

비밀번호 입력 엘리먼트에 `[formField]` 디렉티브를 추가합니다:

```html
<input type="password" [formField]="loginForm.password" />
```

</docs-step>

<!--
<docs-step title="Bind the checkbox field">
-->

<docs-step title="체크박스 필드 바인딩하기">

<a id="bind-the-checkbox-field"></a>

<!--
Add the `[formField]` directive to the checkbox input:
-->

체크박스 입력 엘리먼트에 `[formField]` 디렉티브를 추가합니다:

```html
<input type="checkbox" [formField]="loginForm.rememberMe" />
```

</docs-step>

<!--
<docs-step title="Display the form values">
-->

<docs-step title="폼 값 표시하기">

<a id="display-the-form-values"></a>

<!--
Below the form, there's a debug section to show current form values. Display each field value using `.value()`:
-->

폼 아래에는 현재 폼 값을 보여주는 디버깅 영역이 있습니다. `.value()`를 사용해서 각 필드의 값을 표시합니다:

```angular-html
<p>Email: {{ loginForm.email().value() }}</p>
<p>Password: {{ loginForm.password().value() ? '••••••••' : '(empty)' }}</p>
<p>Remember me: {{ loginForm.rememberMe().value() ? 'Yes' : 'No' }}</p>
```

<!--
Form field values are signals, so the displayed values update automatically as you type.
-->

폼 필드 값은 시그널이므로, 입력할 때마다 화면에 표시되는 값이 자동으로 갱신됩니다.
</docs-step>

</docs-workflow>

<!--
Great work! You've connected your form to the template and displayed the form values. The `[formField]` directive handles two-way data binding automatically - as you type, the `loginModel` signal updates, and the displayed values update immediately.
-->

폼을 템플릿에 연결하고 폼 값을 표시했습니다! `[formField]` 디렉티브는 양방향 데이터 바인딩을 자동으로 처리합니다. 값을 입력하면 `loginModel` 시그널이 갱신되고, 화면에 표시되는 값도 즉시 갱신됩니다.

<!--
Next, you'll learn [how to add validation to your form](/tutorials/signal-forms/3-add-validation)!
-->

다음 단계에서는 [폼에 유효성 검사를 추가하는 방법](/tutorials/signal-forms/3-add-validation)을 배웁니다!
