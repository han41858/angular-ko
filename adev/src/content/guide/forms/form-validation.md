<!--
# Validating form input
-->

<a id="validating-form-input"></a>

# 폼 입력 유효성 검사하기

<!--
You can improve overall data quality by validating user input for accuracy and completeness.
This page shows how to validate user input from the UI and display useful validation messages, in both reactive and template-driven forms.
-->

사용자 입력이 정확하고 완전한지 검사하면 전반적인 데이터 품질을 높일 수 있습니다.
이 문서에서는 반응형 폼과 템플릿 기반 폼에서 UI를 통해 받은 사용자 입력을 검증하고, 유용한 검사 메시지를 표시하는 방법을 알아봅니다.

<!--
## Validating input in template-driven forms
-->

<a id="validating-input-in-template-driven-forms"></a>

## 템플릿 기반 폼에서 입력 검증하기

<!--
To add validation to a template-driven form, you add the same validation attributes as you would with [native HTML form validation](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5/Constraint_validation).
Angular uses directives to match these attributes with validator functions in the framework.

Every time the value of a form control changes, Angular runs validation and generates either a list of validation errors that results in an `INVALID` status, or `null`, which results in a `VALID` status.

You can then inspect the control's state by exporting `ngModel` to a local template variable.
The following example exports `NgModel` into a variable called `name`:

<docs-code header="actor-form-template.component.html (name)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="name-with-error-msg"/>

Notice the following features illustrated by the example.

- The `<input>` element carries the HTML validation attributes: `required` and `minlength`.
  It also carries a custom validator directive, `forbiddenName`.
  For more information, see the [Custom validators](#defining-custom-validators) section.

- `#name="ngModel"` exports `NgModel` into a local variable called `name`.
  `NgModel` mirrors many of the properties of its underlying `FormControl` instance, so you can use this in the template to check for control states such as `valid` and `dirty`.
  For a full list of control properties, see the [AbstractControl](api/forms/AbstractControl) API reference.
  - The outermost `@if` reveals a set of nested messages but only if the `name` is invalid and the control is either `dirty` or `touched`.

  - Each nested `@if` can present a custom message for one of the possible validation errors.
    There are messages for `required`, `minlength`, and `forbiddenName`.

HELPFUL: To prevent the validator from displaying errors before the user has a chance to edit the form, you should check for either the `dirty` or `touched` states in a control.

- When the user changes the value in the watched field, the control is marked as "dirty"
- When the user blurs the form control element, the control is marked as "touched"
-->

템플릿 기반 폼에 유효성 검사를 추가하려면 [네이티브 HTML 폼 유효성 검사](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5/Constraint_validation)에서 사용하는 것과 같은 유효성 검사 어트리뷰트를 추가하면 됩니다.
Angular는 디렉티브를 사용해서 이 어트리뷰트를 프레임워크의 검증 함수와 연결합니다.

폼 컨트롤의 값이 변경될 때마다 Angular는 유효성 검사를 실행합니다.
검사에 실패하면 유효성 검사 오류 목록을 생성하고 상태를 `INVALID`로 지정하며, 통과하면 `null`을 반환하고 상태를 `VALID`로 지정합니다.

`ngModel`을 템플릿 지역 변수로 내보내면 컨트롤 상태를 확인할 수 있습니다.
다음 예제에서는 `NgModel`을 `name` 변수로 내보냅니다:

<docs-code header="actor-form-template.component.html (name)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="name-with-error-msg"/>

이 예제에서 다음 내용을 확인해 보세요.

- `<input>` 엘리먼트에는 HTML 유효성 검사 어트리뷰트인 `required`와 `minlength`가 있습니다.
  커스텀 검증 디렉티브인 `forbiddenName`도 있습니다.
  자세한 내용은 [커스텀 검증 함수](#defining-custom-validators) 섹션을 참고하세요.

- `#name="ngModel"`은 `NgModel`을 `name` 지역 변수로 내보냅니다.
  `NgModel`은 내부 `FormControl` 인스턴스의 여러 프로퍼티를 제공하므로, 템플릿에서 `valid`, `dirty` 등의 컨트롤 상태를 확인할 수 있습니다.
  컨트롤 프로퍼티의 전체 목록은 [AbstractControl](api/forms/AbstractControl) API 레퍼런스를 참고하세요.
  - 가장 바깥쪽 `@if`는 `name`이 유효하지 않으면서 컨트롤이 `dirty` 또는 `touched` 상태일 때만 내부 메시지를 표시합니다.

  - 내부의 각 `@if`는 발생할 수 있는 유효성 검사 오류별로 메시지를 표시합니다.
    `required`, `minlength`, `forbiddenName` 오류에 대한 메시지가 있습니다.

참고: 사용자가 폼을 수정하기도 전에 오류가 표시되지 않도록 컨트롤이 `dirty` 또는 `touched` 상태인지 확인하는 것이 좋습니다.

- 사용자가 감시 중인 필드의 값을 변경하면 컨트롤은 "dirty" 상태가 됩니다.
- 폼 컨트롤 엘리먼트에서 포커스가 벗어나면 컨트롤은 "touched" 상태가 됩니다.

<!--
## Validating input in reactive forms
-->

<a id="validating-input-in-reactive-forms"></a>

## 반응형 폼에서 입력 검증하기

<!--
In a reactive form, the source of truth is the component class.
Instead of adding validators through attributes in the template, you add validator functions directly to the form control model in the component class.
Angular then calls these functions whenever the value of the control changes.
-->

반응형 폼에서는 컴포넌트 클래스가 원본 데이터를 관리합니다.
템플릿의 어트리뷰트로 검증 함수를 추가하는 대신, 컴포넌트 클래스의 폼 컨트롤 모델에 검증 함수를 직접 추가합니다.
그러면 Angular는 컨트롤 값이 변경될 때마다 이 함수를 실행합니다.

<!--
### Validator functions
-->

<a id="validator-functions"></a>

### 검증 함수

<!--
Validator functions can be either synchronous or asynchronous.

| Validator type   | Details                                                                                                                                                                                                                 |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sync validators  | Synchronous functions that take a control instance and immediately return either a set of validation errors or `null`. Pass these in as the second argument when you instantiate a `FormControl`.                       |
| Async validators | Asynchronous functions that take a control instance and return a Promise or Observable that later emits a set of validation errors or `null`. Pass these in as the third argument when you instantiate a `FormControl`. |

For performance reasons, Angular only runs async validators if all sync validators pass.
Each must complete before errors are set.
-->

검증 함수는 동기 또는 비동기 방식으로 동작할 수 있습니다.

| 검증 함수 종류   | 설명                                                                                                                                                                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 동기 검증 함수   | 컨트롤 인스턴스를 인자로 받고, 유효성 검사 오류 모음 또는 `null`을 즉시 반환하는 동기 함수입니다. `FormControl` 인스턴스를 생성할 때 두 번째 인자로 전달합니다.                                   |
| 비동기 검증 함수 | 컨트롤 인스턴스를 인자로 받고, 이후 유효성 검사 오류 모음 또는 `null`을 전달하는 Promise나 옵저버블을 반환하는 비동기 함수입니다. `FormControl` 인스턴스를 생성할 때 세 번째 인자로 전달합니다. |

성능을 고려해서 Angular는 모든 동기 검증 함수를 통과한 경우에만 비동기 검증 함수를 실행합니다.
각 비동기 검증이 완료된 후에 오류가 설정됩니다.

<!--
### Built-in validator functions
-->

<a id="built-in-validator-functions"></a>

### 내장 검증 함수

<!--
You can choose to [write your own validator functions](#defining-custom-validators), or you can use some of Angular's built-in validators.

The same built-in validators that are available as attributes in template-driven forms, such as `required` and `minlength`, are all available to use as functions from the `Validators` class.
For a full list of built-in validators, see the [Validators](api/forms/Validators) API reference.

To update the actor form to be a reactive form, use some of the same
built-in validators —this time, in function form, as in the following example.

<docs-code header="actor-form-reactive.component.ts (validator functions)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.1.ts" region="form-group"/>

In this example, the `name` control sets up two built-in validators —`Validators.required` and `Validators.minLength(4)`— and one custom validator, `forbiddenNameValidator`.

All of these validators are synchronous, so they are passed as the second argument.
Notice that you can support multiple validators by passing the functions in as an array.

This example also adds a few getter methods.
In a reactive form, you can always access any form control through the `get` method on its parent group, but sometimes it's useful to define getters as shorthand for the template.

If you look at the template for the `name` input again, it is fairly similar to the template-driven example.

<docs-code header="actor-form-reactive.component.html (name with error msg)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.html" region="name-with-error-msg"/>

This form differs from the template-driven version in that it no longer exports any directives. Instead, it uses the `name` getter defined in the component class.

Notice that the `required` attribute is still present in the template. Although it's not necessary for validation, it should be retained for accessibility purposes.
-->

[검증 함수를 직접 작성](#defining-custom-validators)하거나 Angular에 내장된 검증 함수를 사용할 수 있습니다.

템플릿 기반 폼에서 어트리뷰트로 사용하는 `required`, `minlength` 등의 내장 검증 기능은 모두 `Validators` 클래스의 함수로도 사용할 수 있습니다.
전체 내장 검증 함수 목록은 [Validators](api/forms/Validators) API 레퍼런스를 참고하세요.

배우 입력 폼을 반응형 폼으로 바꾸려면, 같은 내장 검증 기능을 다음 예제처럼 함수 형태로 사용하면 됩니다.

<docs-code header="actor-form-reactive.component.ts (검증 함수)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.1.ts" region="form-group"/>

이 예제의 `name` 컨트롤에는 내장 검증 함수인 `Validators.required`, `Validators.minLength(4)`와 커스텀 검증 함수인 `forbiddenNameValidator`를 설정합니다.

모두 동기 검증 함수이므로 두 번째 인자로 전달합니다.
여러 검증 함수를 사용하려면 함수 배열을 전달하면 됩니다.

이 예제에는 getter 메서드도 몇 개 추가했습니다.
반응형 폼에서는 상위 그룹의 `get` 메서드로 모든 폼 컨트롤에 접근할 수 있지만, 템플릿에서 간편하게 사용하도록 getter를 정의하면 편리할 때가 있습니다.

`name` 입력의 템플릿을 다시 보면 템플릿 기반 예제와 상당히 비슷합니다.

<docs-code header="actor-form-reactive.component.html (name과 오류 메시지)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.html" region="name-with-error-msg"/>

템플릿 기반 버전과 달리 이 폼에서는 디렉티브를 내보내지 않습니다.
대신 컴포넌트 클래스에 정의한 `name` getter를 사용합니다.

템플릿에 `required` 어트리뷰트가 여전히 남아 있다는 점도 확인해 보세요.
유효성 검사에는 필요하지 않지만, 접근성을 위해 유지해야 합니다.

<!--
## Defining custom validators
-->

<a id="defining-custom-validators"></a>

## 커스텀 검증 함수 정의하기

<!--
The built-in validators don't always match the exact use case of your application, so you sometimes need to create a custom validator.

Consider the `forbiddenNameValidator` function from the previous example.
Here's what the definition of that function looks like.

<docs-code header="forbidden-name.directive.ts (forbiddenNameValidator)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="custom-validator"/>

The function is a factory that takes a regular expression to detect a _specific_ forbidden name and returns a validator function.

In this sample, the forbidden name is "bob", so the validator rejects any actor name containing "bob".
Elsewhere it could reject "alice" or any name that the configuring regular expression matches.

The `forbiddenNameValidator` factory returns the configured validator function.
That function takes an Angular control object and returns _either_ null if the control value is valid _or_ a validation error object.
The validation error object typically has a property whose name is the validation key, `'forbiddenName'`, and whose value is an arbitrary dictionary of values that you could insert into an error message, `{name}`.

Custom async validators are similar to sync validators, but they must instead return a Promise or observable that later emits null or a validation error object.
In the case of an observable, the observable must complete, at which point the form uses the last value emitted for validation.
-->

내장 검증 함수가 애플리케이션의 요구사항에 정확히 맞지 않을 수 있으므로, 때로는 커스텀 검증 함수를 만들어야 합니다.

앞의 예제에 사용한 `forbiddenNameValidator` 함수를 살펴봅시다.
이 함수는 다음과 같이 정의합니다.

<docs-code header="forbidden-name.directive.ts (forbiddenNameValidator)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="custom-validator"/>

이 함수는 _특정_ 금지된 이름을 찾을 정규 표현식을 받고, 검증 함수를 반환하는 팩토리입니다.

이 예제에서는 "bob"을 금지하므로, "bob"이 포함된 배우 이름을 허용하지 않습니다.
설정하는 정규 표현식에 따라 "alice"나 다른 이름을 허용하지 않도록 할 수도 있습니다.

`forbiddenNameValidator` 팩토리는 설정이 반영된 검증 함수를 반환합니다.
이 검증 함수는 Angular 컨트롤 객체를 받고, 컨트롤 값이 유효하면 null을, 유효하지 않으면 유효성 검사 오류 객체를 반환합니다.
일반적으로 오류 객체의 프로퍼티 이름은 `'forbiddenName'` 같은 유효성 검사 키이며, 값은 오류 메시지에 활용할 수 있는 `{name}` 같은 임의의 값 모음입니다.

커스텀 비동기 검증 함수도 동기 검증 함수와 비슷하지만, null이나 유효성 검사 오류 객체를 나중에 전달하는 Promise 또는 옵저버블을 반환해야 합니다.
옵저버블을 반환하는 경우에는 반드시 완료되어야 하며, 폼은 완료 시점에 마지막으로 전달된 값을 유효성 검사 결과로 사용합니다.

<!--
### Adding custom validators to reactive forms
-->

<a id="adding-custom-validators-to-reactive-forms"></a>

### 반응형 폼에 커스텀 검증 함수 추가하기

<!--
In reactive forms, add a custom validator by passing the function directly to the `FormControl`.

<docs-code header="actor-form-reactive.component.ts (validator functions)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.1.ts" region="custom-validator"/>
-->

반응형 폼에서는 `FormControl`에 함수를 직접 전달해서 커스텀 검증 함수를 추가합니다.

<docs-code header="actor-form-reactive.component.ts (검증 함수)" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.1.ts" region="custom-validator"/>

<!--
### Adding custom validators to template-driven forms
-->

<a id="adding-custom-validators-to-template-driven-forms"></a>

### 템플릿 기반 폼에 커스텀 검증 함수 추가하기

<!--
In template-driven forms, add a directive to the template, where the directive wraps the validator function.
For example, the corresponding `ForbiddenValidatorDirective` serves as a wrapper around the `forbiddenNameValidator`.

Angular recognizes the directive's role in the validation process because the directive registers itself with the `NG_VALIDATORS` provider, as shown in the following example.
`NG_VALIDATORS` is a predefined provider with an extensible collection of validators.

<docs-code header="forbidden-name.directive.ts (providers)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="directive-providers"/>

The directive class then implements the `Validator` interface, so that it can easily integrate with Angular forms.
Here is the rest of the directive to help you get an idea of how it all comes together.

<docs-code header="forbidden-name.directive.ts (directive)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="directive"/>

Once the `ForbiddenValidatorDirective` is ready, you can add its selector, `appForbiddenName`, to any input element to activate it.
For example:

<docs-code header="actor-form-template.component.html (forbidden-name-input)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="name-input"/>

HELPFUL: Notice that the custom validation directive is instantiated with `useExisting` rather than `useClass`.
The registered validator must be _this instance_ of the `ForbiddenValidatorDirective` —the instance in the form with its `forbiddenName` property bound to "bob".

If you were to replace `useExisting` with `useClass`, then you'd be registering a new class instance, one that doesn't have a `forbiddenName`.
-->

템플릿 기반 폼에서는 검증 함수를 감싼 디렉티브를 템플릿에 추가합니다.
예를 들어 `ForbiddenValidatorDirective`는 `forbiddenNameValidator`를 감싸는 역할을 합니다.

다음 예제처럼 디렉티브가 자신을 `NG_VALIDATORS` 프로바이더에 등록하면 Angular가 해당 디렉티브를 유효성 검사 과정에 사용하는 것으로 인식합니다.
`NG_VALIDATORS`는 검증 함수를 확장해서 등록할 수 있도록 미리 정의된 프로바이더입니다.

<docs-code header="forbidden-name.directive.ts (providers)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="directive-providers"/>

디렉티브 클래스는 `Validator` 인터페이스를 구현해서 Angular 폼과 쉽게 연동할 수 있도록 합니다.
전체 구성을 이해할 수 있도록 디렉티브의 나머지 코드를 살펴봅시다.

<docs-code header="forbidden-name.directive.ts (디렉티브)" path="adev/src/content/examples/form-validation/src/app/shared/forbidden-name.directive.ts" region="directive"/>

`ForbiddenValidatorDirective`를 만들었다면 입력 엘리먼트에 셀렉터인 `appForbiddenName`을 추가해서 활성화할 수 있습니다.
예를 들면 다음과 같습니다:

<docs-code header="actor-form-template.component.html (forbidden-name-input)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="name-input"/>

참고: 커스텀 유효성 검사 디렉티브는 `useClass`가 아니라 `useExisting`으로 등록합니다.
등록하는 검증 함수는 `forbiddenName` 프로퍼티가 "bob"에 바인딩된, 폼 안의 _해당_ `ForbiddenValidatorDirective` 인스턴스여야 합니다.

`useExisting`을 `useClass`로 바꾸면 `forbiddenName` 값이 없는 새 클래스 인스턴스가 등록됩니다.

<!--
## Control status CSS classes
-->

<a id="control-status-css-classes"></a>

## 컨트롤 상태 CSS 클래스

<!--
Angular automatically mirrors many control properties onto the form control element as CSS classes.
Use these classes to style form control elements according to the state of the form.
The following classes are currently supported.

- `.ng-valid`
- `.ng-invalid`
- `.ng-pending`
- `.ng-pristine`
- `.ng-dirty`
- `.ng-untouched`
- `.ng-touched`
- `.ng-submitted` \(enclosing form element only\)

In the following example, the actor form uses the `.ng-valid` and `.ng-invalid` classes to
set the color of each form control's border.

<docs-code header="forms.css (status classes)" path="adev/src/content/examples/form-validation/src/assets/forms.css"/>
-->

Angular는 여러 컨트롤 프로퍼티를 폼 컨트롤 엘리먼트의 CSS 클래스에 자동으로 반영합니다.
이 클래스를 사용하면 폼 상태에 따라 폼 컨트롤 엘리먼트에 스타일을 적용할 수 있습니다.
현재 다음 클래스를 지원합니다.

- `.ng-valid`
- `.ng-invalid`
- `.ng-pending`
- `.ng-pristine`
- `.ng-dirty`
- `.ng-untouched`
- `.ng-touched`
- `.ng-submitted` \(컨트롤을 감싸는 form 엘리먼트에만 적용\)

다음 배우 입력 폼 예제에서는 `.ng-valid`와 `.ng-invalid` 클래스로 각 폼 컨트롤의 테두리 색상을 지정합니다.

<docs-code header="forms.css (상태 클래스)" path="adev/src/content/examples/form-validation/src/assets/forms.css"/>

<!--
## Cross-field validation
-->

<a id="cross-field-validation"></a>

## 여러 필드를 함께 검증하기

<!--
A cross-field validator is a [custom validator](#defining-custom-validators 'Read about custom validators') that compares the values of different fields in a form and accepts or rejects them in combination.
For example, you might have a form that offers mutually incompatible options, so that if the user can choose A or B, but not both.
Some field values might also depend on others; a user might be allowed to choose B only if A is also chosen.

The following cross validation examples show how to do the following:

- Validate reactive or template-based form input based on the values of two sibling controls,
- Show a descriptive error message after the user interacted with the form and the validation failed.

The examples use cross-validation to ensure that actors do not reuse the same name in their role by filling out the Actor Form.
The validators do this by checking that the actor names and roles do not match.
-->

교차 필드 검증 함수는 폼의 서로 다른 필드 값을 비교해서, 값의 조합이 유효한지 판단하는 [커스텀 검증 함수](#defining-custom-validators '커스텀 검증 함수 알아보기')입니다.
예를 들어 서로 양립할 수 없는 선택지를 제공해서 사용자가 A나 B 중 하나만 선택하고 둘을 함께 선택할 수 없도록 하는 폼이 있을 수 있습니다.
어떤 필드 값이 다른 필드에 의존할 수도 있습니다.
예를 들어 A를 선택한 경우에만 B를 선택할 수 있도록 할 수 있습니다.

다음 교차 검증 예제에서는 아래 내용을 알아봅니다:

- 같은 수준에 있는 두 컨트롤의 값을 기준으로 반응형 폼이나 템플릿 기반 폼 입력을 검증합니다.
- 사용자가 폼과 상호작용한 뒤 유효성 검사를 통과하지 못하면 설명 메시지를 표시합니다.

이 예제에서는 배우 입력 폼을 작성할 때 배우 이름과 배역 이름을 동일하게 사용하지 않도록 교차 검증합니다.
검증 함수는 배우 이름과 배역이 서로 다른지 확인합니다.

<!--
### Adding cross-validation to reactive forms
-->

<a id="adding-cross-validation-to-reactive-forms"></a>

### 반응형 폼에 교차 검증 추가하기

<!--
The form has the following structure:

```ts
const actorForm = new FormGroup({
  'name': new FormControl(),
  'role': new FormControl(),
  'skill': new FormControl(),
});
```

Notice that the `name` and `role` are sibling controls.
To evaluate both controls in a single custom validator, you must perform the validation in a common ancestor control: the `FormGroup`.
You query the `FormGroup` for its child controls so that you can compare their values.

To add a validator to the `FormGroup`, pass the new validator in as the second argument on creation.

```ts
const actorForm = new FormGroup(
  {
    'name': new FormControl(),
    'role': new FormControl(),
    'skill': new FormControl(),
  },
  {validators: unambiguousRoleValidator},
);
```

The validator code is as follows.

<docs-code header="unambiguous-role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.directive.ts" region="cross-validation-validator"/>

The `unambiguousRoleValidator` validator implements the `ValidatorFn` interface.
It takes an Angular control object as an argument and returns either null if the form is valid, or `ValidationErrors` otherwise.

The validator retrieves the child controls by calling the `FormGroup`'s [get](api/forms/AbstractControl#get) method, then compares the values of the `name` and `role` controls.

If the values do not match, the role is unambiguous, both are valid, and the validator returns null.
If they do match, the actor's role is ambiguous and the validator must mark the form as invalid by returning an error object.

To provide better user experience, the template shows an appropriate error message when the form is invalid.

<docs-code header="actor-form-reactive.component.html" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.html" region="cross-validation-error-message"/>

This `@if` displays the error if the `FormGroup` has the cross validation error returned by the `unambiguousRoleValidator` validator, but only if the user finished [interacting with the form](#control-status-css-classes).
-->

폼 구조는 다음과 같습니다:

```ts
const actorForm = new FormGroup({
  'name': new FormControl(),
  'role': new FormControl(),
  'skill': new FormControl(),
});
```

`name`과 `role`은 같은 수준에 있는 컨트롤입니다.
하나의 커스텀 검증 함수로 두 컨트롤을 함께 검사하려면 공통 상위 컨트롤인 `FormGroup`에서 검사해야 합니다.
`FormGroup`에서 하위 컨트롤을 조회하면 값을 비교할 수 있습니다.

`FormGroup`에 검증 함수를 추가하려면 생성할 때 두 번째 인자로 전달합니다.

```ts
const actorForm = new FormGroup(
  {
    'name': new FormControl(),
    'role': new FormControl(),
    'skill': new FormControl(),
  },
  {validators: unambiguousRoleValidator},
);
```

검증 함수의 코드는 다음과 같습니다.

<docs-code header="unambiguous-role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.directive.ts" region="cross-validation-validator"/>

`unambiguousRoleValidator` 검증 함수는 `ValidatorFn` 인터페이스를 구현합니다.
Angular 컨트롤 객체를 인자로 받고, 폼이 유효하면 null을, 그렇지 않으면 `ValidationErrors`를 반환합니다.

이 검증 함수는 `FormGroup`의 [get](api/forms/AbstractControl#get) 메서드로 하위 컨트롤을 가져온 뒤 `name`과 `role` 컨트롤의 값을 비교합니다.

값이 다르면 배역을 명확히 구분할 수 있고 두 값이 모두 유효하므로 null을 반환합니다.
값이 같으면 배우와 배역을 혼동할 수 있으므로, 오류 객체를 반환해서 폼이 유효하지 않다고 표시해야 합니다.

사용자 경험을 개선하기 위해 폼이 유효하지 않을 때 템플릿에 적절한 오류 메시지를 표시합니다.

<docs-code header="actor-form-reactive.component.html" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.html" region="cross-validation-error-message"/>

이 `@if`는 `FormGroup`에 `unambiguousRoleValidator`가 반환한 교차 검증 오류가 있을 때 메시지를 표시합니다.
단, 사용자가 [폼과 상호작용한 뒤에만](#control-status-css-classes) 표시합니다.

<!--
### Adding cross-validation to template-driven forms
-->

<a id="adding-cross-validation-to-template-driven-forms"></a>

### 템플릿 기반 폼에 교차 검증 추가하기

<!--
For a template-driven form, you must create a directive to wrap the validator function.
You provide that directive as the validator using the [`NG_VALIDATORS` token](/api/forms/NG_VALIDATORS), as shown in the following example.

<docs-code header="unambiguous-role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.directive.ts" region="cross-validation-directive"/>

You must add the new directive to the HTML template.
Because the validator must be registered at the highest level in the form, the following template puts the directive on the `form` tag.

<docs-code header="actor-form-template.component.html" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="cross-validation-register-validator"/>

To provide better user experience, an appropriate error message appears when the form is invalid.

<docs-code header="actor-form-template.component.html" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="cross-validation-error-message"/>

This is the same in both template-driven and reactive forms.
-->

템플릿 기반 폼에서는 검증 함수를 감싼 디렉티브를 만들어야 합니다.
다음 예제처럼 [`NG_VALIDATORS` 토큰](/api/forms/NG_VALIDATORS)을 사용해서 이 디렉티브를 검증 함수로 제공합니다.

<docs-code header="unambiguous-role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/unambiguous-role.directive.ts" region="cross-validation-directive"/>

새 디렉티브를 HTML 템플릿에 추가해야 합니다.
이 검증 함수는 폼의 최상위 수준에 등록해야 하므로, 다음 템플릿에서는 `form` 태그에 디렉티브를 적용합니다.

<docs-code header="actor-form-template.component.html" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="cross-validation-register-validator"/>

사용자 경험을 개선하기 위해 폼이 유효하지 않을 때 적절한 오류 메시지를 표시합니다.

<docs-code header="actor-form-template.component.html" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="cross-validation-error-message"/>

이 부분은 템플릿 기반 폼과 반응형 폼에서 동일합니다.

<!--
## Creating asynchronous validators
-->

<a id="creating-asynchronous-validators"></a>

## 비동기 검증 함수 만들기

<!--
Asynchronous validators implement the `AsyncValidatorFn` and `AsyncValidator` interfaces.
These are very similar to their synchronous counterparts, with the following differences.

- The `validate()` functions must return a Promise or an observable,
- The observable returned must be finite, meaning that it must complete at some point.
  To convert an infinite observable into a finite one, pipe the observable through a filtering operator such as `first`, `last`, `take`, or `takeUntil`.

Asynchronous validation happens after the synchronous validation, and is performed only if the synchronous validation is successful.
This check lets forms avoid potentially expensive async validation processes \(such as an HTTP request\) if the more basic validation methods have already found invalid input.

After asynchronous validation begins, the form control enters a `pending` state.
Inspect the control's `pending` property and use it to give visual feedback about the ongoing validation operation.

A common UI pattern is to show a spinner while the async validation is being performed.
The following example shows how to achieve this in a template-driven form.

```angular-html
<input [(ngModel)]="name" #model="ngModel" appSomeAsyncValidator />

@if (model.pending) {
  <app-spinner />
}
```
-->

비동기 검증 함수는 `AsyncValidatorFn` 또는 `AsyncValidator` 인터페이스를 구현합니다.
동기 검증 함수와 매우 비슷하지만 다음과 같은 차이가 있습니다.

- `validate()` 함수는 Promise 또는 옵저버블을 반환해야 합니다.
- 반환하는 옵저버블은 유한해야 합니다.
  즉, 언젠가는 완료되어야 합니다.
  무한한 옵저버블을 유한한 옵저버블로 바꾸려면 `first`, `last`, `take`, `takeUntil` 같은 필터링 연산자를 파이프로 연결하면 됩니다.

비동기 유효성 검사는 동기 유효성 검사 이후에, 동기 검사를 통과한 경우에만 실행합니다.
따라서 기본적인 검사에서 이미 유효하지 않은 입력을 발견했다면 HTTP 요청처럼 비용이 많이 들 수 있는 비동기 검사 과정을 생략할 수 있습니다.

비동기 유효성 검사가 시작되면 폼 컨트롤은 `pending` 상태가 됩니다.
컨트롤의 `pending` 프로퍼티를 확인해서 검사가 진행 중임을 화면에 표시할 수 있습니다.

비동기 검사가 진행되는 동안 로딩 표시를 보여주는 것이 일반적인 UI 패턴입니다.
다음 예제는 템플릿 기반 폼에서 이를 구현하는 방법입니다.

```angular-html
<input [(ngModel)]="name" #model="ngModel" appSomeAsyncValidator />

@if (model.pending) {
  <app-spinner />
}
```

<!--
### Implementing a custom async validator
-->

<a id="implementing-a-custom-async-validator"></a>

### 커스텀 비동기 검증 함수 구현하기

<!--
In the following example, an async validator ensures that actors are cast for a role that is not already taken.
New actors are constantly auditioning and old actors are retiring, so the list of available roles cannot be retrieved ahead of time.
To validate the potential role entry, the validator must initiate an asynchronous operation to consult a central database of all currently cast actors.

The following code creates the validator class, `UniqueRoleValidator`, which implements the `AsyncValidator` interface.

<docs-code header="role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/role.directive.ts" region="async-validator"/>

The `actorsService` property is initialized with an instance of the `ActorsService` token, which defines the following interface.

```ts
interface ActorsService {
  isRoleTaken: (role: string) => Observable<boolean>;
}
```

In a real world application, the `ActorsService` would be responsible for making an HTTP request to the actor database to check if the role is available.
From the validator's point of view, the actual implementation of the service is not important, so the example can just code against the `ActorsService` interface.

As the validation begins, the `UniqueRoleValidator` delegates to the `ActorsService` `isRoleTaken()` method with the current control value.
At this point the control is marked as `pending` and remains in this state until the observable chain returned from the `validate()` method completes.

The `isRoleTaken()` method dispatches an HTTP request that checks if the role is available, and returns `Observable<boolean>` as the result.
The `validate()` method pipes the response through the `map` operator and transforms it into a validation result.

The method then, like any validator, returns `null` if the form is valid, and `ValidationErrors` if it is not.
This validator handles any potential errors with the `catchError` operator.
In this case, the validator treats the `isRoleTaken()` error as a successful validation, because failure to make a validation request does not necessarily mean that the role is invalid.
You could handle the error differently and return the `ValidationError` object instead.

After some time passes, the observable chain completes and the asynchronous validation is done.
The `pending` flag is set to `false`, and the form validity is updated.
-->

다음 예제의 비동기 검증 함수는 배우가 아직 다른 배우에게 배정되지 않은 배역을 맡도록 합니다.
새 배우가 계속 오디션을 보고 기존 배우가 은퇴하므로, 선택할 수 있는 배역 목록을 미리 가져올 수는 없습니다.
입력한 배역을 검증하려면 현재 배역을 맡은 배우들의 중앙 데이터베이스를 조회하는 비동기 작업을 시작해야 합니다.

다음 코드는 `AsyncValidator` 인터페이스를 구현한 `UniqueRoleValidator` 검증 클래스를 만듭니다.

<docs-code header="role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/role.directive.ts" region="async-validator"/>

`actorsService` 프로퍼티는 다음 인터페이스를 정의하는 `ActorsService` 토큰의 인스턴스로 초기화합니다.

```ts
interface ActorsService {
  isRoleTaken: (role: string) => Observable<boolean>;
}
```

실제 애플리케이션에서는 `ActorsService`가 배우 데이터베이스에 HTTP 요청을 보내 배역을 선택할 수 있는지 확인합니다.
검증 함수에서는 서비스의 실제 구현이 중요하지 않으므로, 이 예제는 `ActorsService` 인터페이스를 기준으로 작성할 수 있습니다.

유효성 검사를 시작하면 `UniqueRoleValidator`는 현재 컨트롤 값을 `ActorsService`의 `isRoleTaken()` 메서드에 전달해서 작업을 위임합니다.
이때 컨트롤은 `pending` 상태가 되며, `validate()` 메서드가 반환한 옵저버블 체인이 완료될 때까지 이 상태를 유지합니다.

`isRoleTaken()` 메서드는 배역을 선택할 수 있는지 확인하는 HTTP 요청을 보내고 결과로 `Observable<boolean>`을 반환합니다.
`validate()` 메서드는 응답을 `map` 연산자로 전달해서 유효성 검사 결과로 변환합니다.

그런 다음 다른 검증 함수와 마찬가지로 폼이 유효하면 `null`을, 그렇지 않으면 `ValidationErrors`를 반환합니다.
이 검증 함수는 발생할 수 있는 오류를 `catchError` 연산자로 처리합니다.
이 예제에서는 `isRoleTaken()`의 오류를 유효성 검사 통과로 처리합니다.
검사 요청에 실패했다고 해서 반드시 배역이 유효하지 않은 것은 아니기 때문입니다.
오류를 다르게 처리해서 `ValidationError` 객체를 반환하도록 할 수도 있습니다.

시간이 지나 옵저버블 체인이 완료되면 비동기 유효성 검사도 끝납니다.
`pending` 값은 `false`가 되고 폼의 유효성 상태가 갱신됩니다.

<!--
### Adding async validators to reactive forms
-->

<a id="adding-async-validators-to-reactive-forms"></a>

### 반응형 폼에 비동기 검증 함수 추가하기

<!--
To use an async validator in reactive forms, begin by injecting the validator into a property of the component class.

<docs-code header="actor-form-reactive.component.ts" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.2.ts" region="async-validator-inject"/>

Then, pass the validator function directly to the `FormControl` to apply it.

In the following example, the `validate` function of `UniqueRoleValidator` is applied to `roleControl` by passing it to the control's `asyncValidators` option and binding it to the instance of `UniqueRoleValidator` that was injected into `ActorFormReactiveComponent`.
The value of `asyncValidators` can be either a single async validator function, or an array of functions.
To learn more about `FormControl` options, see the [AbstractControlOptions](api/forms/AbstractControlOptions) API reference.

<docs-code header="actor-form-reactive.component.ts" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.2.ts" region="async-validator-usage"/>
-->

반응형 폼에서 비동기 검증 함수를 사용하려면 먼저 컴포넌트 클래스의 프로퍼티에 검증 객체를 주입합니다.

<docs-code header="actor-form-reactive.component.ts" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.2.ts" region="async-validator-inject"/>

그런 다음 검증 함수를 `FormControl`에 직접 전달해서 적용합니다.

다음 예제에서는 `UniqueRoleValidator`의 `validate` 함수를 컨트롤의 `asyncValidators` 옵션에 전달하고, `ActorFormReactiveComponent`에 주입한 `UniqueRoleValidator` 인스턴스에 바인딩해서 `roleControl`에 적용합니다.
`asyncValidators`에는 비동기 검증 함수 하나 또는 함수 배열을 지정할 수 있습니다.
`FormControl` 옵션에 대해 자세히 알아보려면 [AbstractControlOptions](api/forms/AbstractControlOptions) API 레퍼런스를 참고하세요.

<docs-code header="actor-form-reactive.component.ts" path="adev/src/content/examples/form-validation/src/app/reactive/actor-form-reactive.component.2.ts" region="async-validator-usage"/>

<!--
### Adding async validators to template-driven forms
-->

<a id="adding-async-validators-to-template-driven-forms"></a>

### 템플릿 기반 폼에 비동기 검증 함수 추가하기

<!--
To use an async validator in template-driven forms, create a new directive and register the `NG_ASYNC_VALIDATORS` provider on it.

In the example below, the directive injects the `UniqueRoleValidator` class that contains the actual validation logic and invokes it in the `validate` function, triggered by Angular when validation should happen.

<docs-code header="role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/role.directive.ts" region="async-validator-directive"/>

Then, as with synchronous validators, add the directive's selector to an input to activate it.

<docs-code header="actor-form-template.component.html (unique-unambiguous-role-input)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="role-input"/>
-->

템플릿 기반 폼에서 비동기 검증 함수를 사용하려면 새 디렉티브를 만들고 `NG_ASYNC_VALIDATORS` 프로바이더에 등록합니다.

다음 예제에서 디렉티브는 실제 검증 로직을 가진 `UniqueRoleValidator` 클래스를 주입받습니다.
Angular가 유효성 검사를 실행할 때 호출하는 `validate` 함수에서 이 객체를 사용합니다.

<docs-code header="role.directive.ts" path="adev/src/content/examples/form-validation/src/app/shared/role.directive.ts" region="async-validator-directive"/>

그런 다음 동기 검증 함수와 마찬가지로 입력 엘리먼트에 디렉티브 셀렉터를 추가해서 활성화합니다.

<docs-code header="actor-form-template.component.html (unique-unambiguous-role-input)" path="adev/src/content/examples/form-validation/src/app/template/actor-form-template.component.html" region="role-input"/>

<!--
### Optimizing performance of async validators
-->

<a id="optimizing-performance-of-async-validators"></a>

### 비동기 검증 함수 성능 최적화하기

<!--
By default, all validators run after every form value change.
With synchronous validators, this does not normally have a noticeable impact on application performance.
Async validators, however, commonly perform some kind of HTTP request to validate the control.
Dispatching an HTTP request after every keystroke could put a strain on the backend API, and should be avoided if possible.

You can delay updating the form validity by changing the `updateOn` property from `change` (default) to `submit` or `blur`.

With template-driven forms, set the property in the template.

```angular-html
<input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}" />
```

With reactive forms, set the property in the `FormControl` instance.

```ts
new FormControl('', {updateOn: 'blur'});
```
-->

기본적으로 모든 검증 함수는 폼 값이 변경될 때마다 실행됩니다.
동기 검증 함수는 보통 애플리케이션 성능에 눈에 띄는 영향을 미치지 않습니다.
하지만 비동기 검증 함수는 컨트롤을 검증하기 위해 HTTP 요청을 보내는 경우가 많습니다.
키를 누를 때마다 HTTP 요청을 보내면 백엔드 API에 부담을 줄 수 있으므로 가능하면 피하는 것이 좋습니다.

`updateOn` 프로퍼티를 기본값인 `change`에서 `submit` 또는 `blur`로 바꾸면 폼 유효성 상태를 갱신하는 시점을 늦출 수 있습니다.

템플릿 기반 폼에서는 템플릿에 프로퍼티를 설정합니다.

```angular-html
<input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}" />
```

반응형 폼에서는 `FormControl` 인스턴스에 프로퍼티를 설정합니다.

```ts
new FormControl('', {updateOn: 'blur'});
```

<!--
## Managing validators dynamically in reactive forms
-->

<a id="managing-validators-dynamically-in-reactive-forms"></a>

## 반응형 폼에서 검증 함수를 동적으로 관리하기

<!--
In complex reactive forms, you may need to add, remove, or modify validators based on user input or application state.
Angular provides several methods on `AbstractControl` to manage validators at runtime without recreating form controls.
-->

복잡한 반응형 폼에서는 사용자 입력이나 애플리케이션 상태에 따라 검증 함수를 추가하거나 제거하거나 변경해야 할 수 있습니다.
Angular는 폼 컨트롤을 다시 생성하지 않고도 런타임에 검증 함수를 관리할 수 있도록 `AbstractControl`에 여러 메서드를 제공합니다.

<!--
### Adding and removing validators
-->

<a id="adding-and-removing-validators"></a>

### 검증 함수 추가하고 제거하기

<!--
The [`addValidators`](api/forms/AbstractControl#addValidators) and [`removeValidators`](api/forms/AbstractControl#removeValidators) methods allow you to modify a control's validators after initialization.

```ts
onCountryChange(country: string) {
    const postalCodeControl = this.profileForm.get('postalCode');

    if (country === 'US') {
      // Add validators for US postal codes
      postalCodeControl.addValidators([Validators.required, Validators.pattern(/^\d{5}$/)]);
    } else {
      // Remove validators when not US
      postalCodeControl.removeValidators([Validators.required]);
    }

    postalCodeControl.updateValueAndValidity();
}
```
-->

[`addValidators`](api/forms/AbstractControl#addValidators)와 [`removeValidators`](api/forms/AbstractControl#removeValidators) 메서드를 사용하면 초기화 이후에도 컨트롤의 검증 함수를 변경할 수 있습니다.

```ts
onCountryChange(country: string) {
    const postalCodeControl = this.profileForm.get('postalCode');

    if (country === 'US') {
      // 미국 우편번호 검증 함수를 추가합니다.
      postalCodeControl.addValidators([Validators.required, Validators.pattern(/^\d{5}$/)]);
    } else {
      // 미국이 아니면 검증 함수를 제거합니다.
      postalCodeControl.removeValidators([Validators.required]);
    }

    postalCodeControl.updateValueAndValidity();
}
```

<!--
### Replacing all validators
-->

<a id="replacing-all-validators"></a>

### 모든 검증 함수 교체하기

<!--
Use [`setValidators`](api/forms/AbstractControl#setValidators) to replace all existing synchronous validators on a control, or [`clearValidators`](api/forms/AbstractControl#clearValidators) to remove all validators.

```ts
toggleStrictNameValidation(isStrict: boolean) {
  const nameControl = this.profileForm.get('name');

  if (isStrict) {
    // Set strict validation rules
    nameControl.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]);
  } else {
    // Clear all validators
    nameControl.clearValidators();
  }

  nameControl.updateValueAndValidity();
}
```

The same pattern applies to async validators using [`addAsyncValidators`](api/forms/AbstractControl#addAsyncValidators), [`removeAsyncValidators`](api/forms/AbstractControl#removeAsyncValidators), [`setAsyncValidators`](api/forms/AbstractControl#setAsyncValidators), and [`clearAsyncValidators`](api/forms/AbstractControl#clearAsyncValidators).
-->

컨트롤의 기존 동기 검증 함수를 모두 교체하려면 [`setValidators`](api/forms/AbstractControl#setValidators)를 사용하고, 모두 제거하려면 [`clearValidators`](api/forms/AbstractControl#clearValidators)를 사용합니다.

```ts
toggleStrictNameValidation(isStrict: boolean) {
  const nameControl = this.profileForm.get('name');

  if (isStrict) {
    // 엄격한 유효성 검사 규칙을 설정합니다.
    nameControl.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]);
  } else {
    // 모든 검증 함수를 제거합니다.
    nameControl.clearValidators();
  }

  nameControl.updateValueAndValidity();
}
```

비동기 검증 함수에도 [`addAsyncValidators`](api/forms/AbstractControl#addAsyncValidators), [`removeAsyncValidators`](api/forms/AbstractControl#removeAsyncValidators), [`setAsyncValidators`](api/forms/AbstractControl#setAsyncValidators), [`clearAsyncValidators`](api/forms/AbstractControl#clearAsyncValidators)를 사용해서 같은 패턴을 적용할 수 있습니다.

<!--
### Triggering validation updates
-->

<a id="triggering-validation-updates"></a>

### 유효성 검사 상태 갱신하기

<!--
After modifying validators, call [`updateValueAndValidity`](api/forms/AbstractControl#updateValueAndValidity) to recalculate the control's validation status.
This method accepts options to control update behavior.

```ts
// Update control and notify parent
control.updateValueAndValidity();

// Update control only, don't notify parent or emit events
control.updateValueAndValidity({onlySelf: true, emitEvent: false});
```
-->

검증 함수를 변경한 뒤에는 [`updateValueAndValidity`](api/forms/AbstractControl#updateValueAndValidity)를 실행해서 컨트롤의 유효성 검사 상태를 다시 계산합니다.
이 메서드는 갱신 동작을 제어하는 옵션을 받습니다.

```ts
// 컨트롤을 갱신하고 상위 컨트롤에 알립니다.
control.updateValueAndValidity();

// 상위 컨트롤에 알리거나 이벤트를 보내지 않고 이 컨트롤만 갱신합니다.
control.updateValueAndValidity({onlySelf: true, emitEvent: false});
```

<!--
## Interaction with native HTML form validation
-->

<a id="interaction-with-native-html-form-validation"></a>

## 네이티브 HTML 폼 유효성 검사와 함께 사용하기

<!--
By default, Angular disables [native HTML form validation](https://developer.mozilla.org/docs/Web/Guide/HTML/Constraint_validation) by adding the `novalidate` attribute on the enclosing `<form>` and uses directives to match these attributes with validator functions in the framework.
If you want to use native validation **in combination** with Angular-based validation, you can re-enable it with the `ngNativeValidate` directive.
See the [API docs](api/forms/NgForm#native-dom-validation-ui) for details.
-->

Angular는 기본적으로 바깥쪽 `<form>`에 `novalidate` 어트리뷰트를 추가해서 [네이티브 HTML 폼 유효성 검사](https://developer.mozilla.org/docs/Web/Guide/HTML/Constraint_validation)를 비활성화하고, 디렉티브로 유효성 검사 어트리뷰트를 프레임워크의 검증 함수와 연결합니다.
Angular 유효성 검사와 네이티브 유효성 검사를 **함께** 사용하려면 `ngNativeValidate` 디렉티브로 네이티브 검사를 다시 활성화할 수 있습니다.
자세한 내용은 [API 문서](api/forms/NgForm#native-dom-validation-ui)를 참고하세요.
