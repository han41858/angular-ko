<!--
# Set up the form model
-->

# 폼 모델 구성하기

<!--
Every Signal Form starts with a form data model - a signal that defines the shape of your data, and stores your form data.
-->

모든 시그널 폼은 폼 데이터 모델에서 시작합니다. 폼 데이터 모델은 데이터 구조를 정의하고 폼 데이터를 저장하는 시그널입니다.

<!--
In this lesson, you'll learn how to:

- Define a TypeScript interface for your form data
- Create a signal to hold form values
- Use the `form()` function to create a Signal Form

Let's build the foundation for our login form!
-->

이번 단계에서는 다음 내용을 배웁니다:

- 폼 데이터를 위한 TypeScript 인터페이스 정의하기
- 폼 값을 저장할 시그널 생성하기
- `form()` 함수로 시그널 폼 생성하기

로그인 폼의 기초를 만들어 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Define the LoginData interface">
-->

<docs-step title="LoginData 인터페이스 정의하기">

<a id="define-the-logindata-interface"></a>

<!--
Create a TypeScript interface that defines the structure of your login form data. The form will have:

- An `email` field (string)
- A `password` field (string)
- A `rememberMe` field (boolean)
-->

로그인 폼 데이터의 구조를 정의하는 TypeScript 인터페이스를 만듭니다. 폼에는 다음 필드가 필요합니다:

- `email` 필드(문자열)
- `password` 필드(문자열)
- `rememberMe` 필드(불리언)

```ts
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
```

<!--
Add this interface above the `@Component` decorator.
-->

이 인터페이스를 `@Component` 데코레이터 위에 추가하세요.
</docs-step>

<!--
<docs-step title="Import signal and form">
-->

<docs-step title="signal과 form 불러오기">

<a id="import-signal-and-form"></a>

<!--
Import the `signal` function from `@angular/core` and the `form` function from `@angular/forms/signals`:
-->

`@angular/core`에서 `signal` 함수를, `@angular/forms/signals`에서 `form` 함수를 불러옵니다:

```ts
import {Component, signal} from '@angular/core';
import {form} from '@angular/forms/signals';
```

</docs-step>

<!--
<docs-step title="Create the form model signal">
-->

<docs-step title="폼 모델 시그널 생성하기">

<a id="create-the-form-model-signal"></a>

<!--
In your component class, create a `loginModel` signal with initial values. Use the `LoginData` interface as the type parameter:
-->

컴포넌트 클래스에 초깃값을 지정한 `loginModel` 시그널을 만듭니다. 타입 인자에는 `LoginData` 인터페이스를 사용하세요:

```ts
loginModel = signal<LoginData>({
  email: '',
  password: '',
  rememberMe: false,
});
```

<!--
The initial values start as empty strings for text fields and `false` for the checkbox.
-->

텍스트 필드의 초깃값은 빈 문자열이고, 체크박스의 초깃값은 `false`입니다.
</docs-step>

<!--
<docs-step title="Create the form">
-->

<docs-step title="폼 생성하기">

<a id="create-the-form"></a>

<!--
Now create the form by passing your model signal to the `form()` function:
-->

이제 모델 시그널을 `form()` 함수에 전달해서 폼을 만듭니다:

```ts
loginForm = form(this.loginModel);
```

<!--
The `form()` function creates a form from your model, giving you access to field state and validation.
-->

`form()` 함수는 모델로 폼을 생성하며, 필드 상태와 유효성 검사에 접근할 수 있게 합니다.
</docs-step>

</docs-workflow>

<!--
Excellent! You've set up your form model. The `loginModel` signal holds your form data, and the `loginForm` provides access to each field with type safety.
-->

폼 모델을 구성했습니다! `loginModel` 시그널은 폼 데이터를 저장하고, `loginForm`을 사용하면 타입 안전성을 유지하면서 각 필드에 접근할 수 있습니다.

<!--
Next, you'll learn [how to connect your form to the template](/tutorials/signal-forms/2-connect-form-template)!
-->

다음 단계에서는 [폼을 템플릿에 연결하는 방법](/tutorials/signal-forms/2-connect-form-template)을 배웁니다!
