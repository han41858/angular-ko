<!--
# Validating forms
-->
# 폼 유효성 검사

<!--
Another common scenario when working with forms is the need to validate the inputs to ensure the correct data is submitted.

Note: Learn more about [validating form input in the in-depth guide](/guide/forms/reactive-forms#validating-form-input).

In this activity, you'll learn how to validate forms with reactive forms.

<hr>

<docs-workflow>

<docs-step title="Import Validators">

Angular provides a set of validation tools. To use them, first update the component to import `Validators` from `@angular/forms`.

<docs-code language="ts" highlight="[1]">
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({...})
export class App {}
</docs-code>

</docs-step>

<docs-step title="Add validation to form">

Every `FormControl` can be passed the `Validators` you want to use for validating the `FormControl` values. For example, if you want to make the `name` field in `profileForm` required then use `Validators.required`.
For the `email` field in our Angular form, we want to ensure it's not left empty and follows a valid email address structure. We can achieve this by combining the `Validators.required` and `Validators.email` validators in an array.
Update the `name` and `email` `FormControl`:

```ts
profileForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

</docs-step>

<docs-step title="Check form validation in template">

To determine if a form is valid, the `FormGroup` class has a `valid` property.
You can use this property to dynamically bind attributes. Update the submit `button` to be enabled based on the validity of the form.

```angular-html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

</docs-step>

</docs-workflow>

You now know the basics around how validation works with reactive forms.

Great job learning these core concepts of working with forms in Angular. If you want to learn more, be sure to refer to the [Angular forms documentation](guide/forms/form-validation).
-->
폼을 다루다 보면 폼에 입력된 값을 제출하기 전에 유효성 검사를 해야 하는 경우가 일반적입니다.

참고: 자세한 내용은[폼 유효성 검사 심화 가이드](/guide/forms/reactive-forms#validating-form-input) 문서를 참고하세요.

이번 튜토리얼에서는 반응형 폼의 유효성을 검사해 봅시다.

<hr>

<docs-workflow>

<docs-step title="유효성 검사 함수를 로드합니다">

Angular는 자체 유효성 검사 툴을 제공합니다.
이 툴을 사용하려면 먼저 `@angular/forms` 패키지로 제공되는 `Validators`를 로드합니다.

<docs-code language="ts" highlight="[1]">
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({...})
export class App {}
</docs-code>

</docs-step>

<docs-step title="폼에 유효성 검사 함수를 적용하세요">

`FormControl`은 폼 컨트롤의 값을 검사하기 위해 `Validators` 를 인자로 받을 수 있습니다.
예를 들면, `profileForm` 중 `name` 필드 값이 필수라면 `Validators.required`를 지정하면 됩니다.
그리고 `email` 필드가 값이 필수인 동시에 유효한 이메일 형식인지 검사하려면 `Validators.required`와 `Validators.email`을 배열로 묶어서 적용하면 됩니다.
`name` 폼 컨트롤과 `email` 폼 컨트롤을 수정해 봅시다:

```ts
profileForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

</docs-step>

<docs-step title="템플릿에 유효성 검사 함수를 적용하세요">

폼에 입력된 값들이 적절한지 확인하려면 `FormGroup` 클래스에 있는 `valid` 프로퍼티를 참조하면 됩니다.
이 프로퍼티는 어트리뷰트로 바인딩되어 동적으로 값이 변경되는 프로퍼티입니다.
폼 유효성 상태에 따라 폼 제출 버튼을 비활성화하는 기능을 추가해 보세요.

```angular-html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

</docs-step>

</docs-workflow>

지금까지 반응형 폼에 기본적인 유효성 검사 적용방법을 알아봤습니다.

Angular에서 폼을 다루는 데 필요한 핵심 개념에 대해 학습을 잘 마치셨습니다!
더 자세한 내용은 [Angular 폼 문서](guide/forms/form-validation)를 참고하세요.
