<!--
<docs-decorative-header title="Forms with signals" imgSrc="adev/src/assets/images/signals.svg"> </docs-decorative-header>
-->

<docs-decorative-header title="시그널 폼" imgSrc="adev/src/assets/images/signals.svg"> </docs-decorative-header>

<!--
Signal Forms manage form state using Angular signals to provide automatic synchronization between your data model and the UI with Angular Signals.

This guide walks you through the core concepts to create forms with Signal Forms. Here's how it works:
-->

시그널 폼은 Angular 시그널을 사용해서 폼 상태를 관리하며, 데이터 모델과 UI를 동기화할 때도 Angular 시그널을 활용합니다.

이 문서에서는 시그널 폼을 어떻게 만드는지 핵심을 알아봅시다.
이렇게 구현합니다:

<!--
## Creating your first form
-->

<a id="creating-your-first-form"></a>

## 첫번째 폼 만들기

<!--
### 1. Create a form model with `signal()`
-->

<a id="1-create-a-form-model-with-signal"></a>

### 1. 폼 모델 생성하기: `signal()`

<!--
Every form starts by creating a signal that holds your form's data model:
-->

모든 폼은 폼 데이터 모델을 저장할 시그널을 만드는 것부터 시작합니다:

```ts
interface LoginData {
  email: string;
  password: string;
}

const loginModel = signal<LoginData>({
  email: '',
  password: '',
});
```

<!--
### 2. Pass the form model to `form()` to create a `FieldTree`
-->

<a id="2-pass-the-form-model-to-form-to-create-a-fieldtree"></a>

### 2. `form()`을 실행해서 폼 모델을 `FieldTree`로 변환하기

<!--
Then, you pass your form model into the `form()` function to create a **field tree** - an object structure that mirrors your model's shape, allowing you to access fields with dot notation.

Both the root form object and its nested properties are `FieldTree` nodes:

```ts
const loginForm = form(loginModel);

loginForm; // is a FieldTree
loginForm.email; // is also a FieldTree
```
-->

그리고 폼 모델을 `form()` 함수로 전달해서 이 폼 모델을 **필드 트리** 로 변환합니다.
필드 트리는 데이터 모델을 표현하는 객체이며, 객체이기 때문에 객체 프로퍼티처럼 접근할 수 있습니다.

최상위 폼 객체와 그 안에 중첩된 프로퍼티는 모두 `FieldTree` 노드입니다:

```ts
const loginForm = form(loginModel);

loginForm; // FieldTree입니다.
loginForm.email; // 이 값도 FieldTree입니다.
```

<!--
### 3. Bind HTML inputs with `[formField]` directive
-->

<a id="3-bind-html-inputs-with-formfield-directive"></a>

### 3. `[formField]` 디렉티브로 HTML 입력 필드를 바인딩합니다.

<!--
Next, you bind your HTML inputs to the form using the `[formField]` directive, which creates two-way binding between them:

```html
<input type="email" [formField]="loginForm.email" />
<input type="password" [formField]="loginForm.password" />
```

As a result, user changes (such as typing in the field) automatically updates the form.

NOTE: The `[formField]` directive also syncs field state for attributes like `required`, `disabled`, and `readonly` when appropriate.
-->

그다음에는 HTML 입력 엘리먼트에 `[formField]` 디렉티브를 양방향 바인딩해서 폼과 연결합니다:

```html
<input type="email" [formField]="loginForm.email" />
<input type="password" [formField]="loginForm.password" />
```

그러면 사용자가 입력 엘리먼트의 값을 변경하면 폼에 있는 데이터도 자동으로 갱신됩니다.

참고: `[formField]` 디렉티브는 `required`, `disabled`, `readonly`와 같은 어트리뷰트 값도 동기화합니다.

<!--
### 4. Read state with `FieldTree` signals
-->

<a id="4-read-state-with-fieldtree-signals"></a>

### 4. `FieldTree` 시그널로 상태 읽기

<!--
You can access state for any part of the tree by calling the `FieldTree` node as a function. This returns a state object containing reactive signals for the value, validation status, and interaction state:

```ts
loginForm(); // Returns state for the whole form
loginForm.email(); // Returns state for the email field
```

To read the current value, access the `value()` signal:

```html
<!- Render values that update automatically as user types ->
<p>Form value: {{ loginForm().value() | json }}</p>
<p>Email: {{ loginForm.email().value() }}</p>
```

```ts
// Get the current value
const currentEmail = loginForm.email().value();
```
-->

`FieldTree` 노드를 함수처럼 실행하면 트리의 어느 부분에서든 상태에 접근할 수 있습니다.
반환된 상태 객체에는 값, 유효성 검사 상태, 상호작용 상태를 표현하는 반응형 시그널이 포함됩니다:

```ts
loginForm(); // 폼 전체의 상태를 반환합니다.
loginForm.email(); // 이메일 필드의 상태를 반환합니다.
```

현재 값을 읽으려면 `value()` 시그널을 읽으면 됩니다:

```html
<!-- 사용자가 입력한 값을 화면에 렌더링합니다. -->
<p>Form value: {{ loginForm().value() | json }}</p>
<p>Email: {{ loginForm.email().value() }}</p>
```

```ts
// 현재값을 참조합니다.
const currentEmail = loginForm.email().value();
```

<!--
### 5. Update values with `set()`
-->

<a id="5-update-values-with-set"></a>

### 5. 값 변경하기: `set()`

<!--
You can programmatically update values using the `value.set()` method on any node. This updates both the `FieldTree` and the underlying model signal:

```ts
// Update the value programmatically
loginForm.email().value.set('alice@wonderland.com');
```

As a result, both the field value and the model signal are updated automatically:

```ts
// The model signal is also updated
console.log(loginModel().email); // 'alice@wonderland.com'
```

### Complete example

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.css"/>
</docs-code-multifile>
-->

어떤 노드에서든 `value.set()` 메서드를 사용해서 코드로 값을 변경할 수 있습니다.
이 메서드를 실행하면 `FieldTree`와 모델 시그널 값을 모두 변경합니다:

```ts
// 코드로 필드 값을 변경합니다.
loginForm.email().value.set('alice@wonderland.com');
```

그러면 필드 값과 모델 시그널 값이 모두 변경된 것을 확인할 수 있습니다:

```ts
// 모델 시그널도 함께 변경됩니다.
console.log(loginModel().email); // 'alice@wonderland.com'
```

<a id="complete-example"></a>

### 전체 예제

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.css"/>
</docs-code-multifile>

<!--
## Basic usage
-->

<a id="basic-usage"></a>

## 활용 방법

<!--
The `[formField]` directive works with all standard HTML input types. Here are the most common patterns:
-->

`[formField]` 디렉티브는 표준 HTML 입력 필드라면 어디에라도 사용할 수 있습니다.
이렇게 사용하면 됩니다:

<!--
### Text inputs
-->

<a id="text-inputs"></a>

### 텍스트 입력

<!--
Text inputs work with various `type` attributes and textareas:

```html
<!- Text and email ->
<input type="text" [formField]="form.name" />
<input type="email" [formField]="form.email" />
```
-->

텍스트 입력은 다양한 `type`과 함께 사용할 수 있습니다:

```html
<!-- 텍스트, 이메일 -->
<input type="text" [formField]="form.name" />
<input type="email" [formField]="form.email" />
```

<!--
#### Numbers
-->

<a id="numbers"></a>

#### 숫자

<!--
Number inputs automatically convert between strings and numbers:

```html
<!- Number - automatically converts to number type ->
<input type="number" [formField]="form.age" />
```
-->

숫자 입력 필드에 바인딩하면 문자열 타입과 숫자 타입을 자동으로 변환합니다:

```html
<!-- 숫자 - 숫자 타입으로 자동 변환합니다. -->
<input type="number" [formField]="form.age" />
```

<!--
#### Date and time
-->

<a id="date-and-time"></a>

#### 날짜, 시각

<!--
Date inputs store values as `YYYY-MM-DD` strings, and time inputs use `HH:mm` format:

```html
<!- Date and time - stores as ISO format strings ->
<input type="date" [formField]="form.eventDate" />
<input type="time" [formField]="form.eventTime" />
```

If you need to convert date strings to Date objects, you can do so by passing the field value into `Date()`:

```ts
const dateObject = new Date(form.eventDate().value());
```
-->

날짜 입력 필드는 `YYYY-MM-DD` 문자열 타입으로 값을 저장하며, 시각 입력 필드는 `HH:mm` 형식으로 값을 저장합니다:

```html
<!-- 날짜, 시각 - ISO 문자열 형식으로 값을 저장합니다. -->
<input type="date" [formField]="form.eventDate" />
<input type="time" [formField]="form.eventTime" />
```

문자열 타입 날짜를 Date 객체로 변환하려면 `Date()` 생성자를 활용하면 됩니다:

```ts
const dateObject = new Date(form.eventDate().value());
```

<!--
#### Multiline text
-->

<a id="multiline-text"></a>

#### 여러 줄 텍스트

<!--
Textareas work the same way as text inputs:

```html
<!- Textarea ->
<textarea [formField]="form.message" rows="4"></textarea>
```
-->

문자 입력 필드와 동일합니다:

```html
<!-- Textarea -->
<textarea [formField]="form.message" rows="4"></textarea>
```

<!--
### Checkboxes
-->

<a id="checkboxes"></a>

### 체크박스

<!--
Checkboxes bind to boolean values:

```html
<!- Single checkbox ->
<label>
  <input type="checkbox" [formField]="form.agreeToTerms" />
  I agree to the terms
</label>
```
-->

체크박스는 불리언 값을 바인딩합니다:

```html
<!-- 단일 체크박스 -->
<label>
  <input type="checkbox" [formField]="form.agreeToTerms" />
  I agree to the terms
</label>
```

<!--
#### Multiple checkboxes
-->

<a id="multiple-checkboxes"></a>

#### 여러 체크박스

<!--
For multiple options, create a separate boolean `formField` for each:

```html
<label>
  <input type="checkbox" [formField]="form.emailNotifications" />
  Email notifications
</label>
<label>
  <input type="checkbox" [formField]="form.smsNotifications" />
  SMS notifications
</label>
```
-->

체크박스가 여러 개라면 개별 필드마다 불리언 값을 연결합니다:

```html
<label>
  <input type="checkbox" [formField]="form.emailNotifications" />
  Email notifications
</label>
<label>
  <input type="checkbox" [formField]="form.smsNotifications" />
  SMS notifications
</label>
```

<!--
### Radio buttons
-->

<a id="radio-buttons"></a>

### 라디오 버튼

<!--
Radio buttons work similarly to checkboxes. As long as the radio buttons use the same `[formField]` value, Signal Forms will automatically bind the same `name` attribute to all of them:

```html
<label>
  <input type="radio" value="free" [formField]="form.plan" />
  Free
</label>
<label>
  <input type="radio" value="premium" [formField]="form.plan" />
  Premium
</label>
```

When a user selects a radio button, the form `formField` stores the value from that radio button's `value` attribute. For example, selecting "Premium" sets `form.plan().value()` to `"premium"`.
-->

라디오 버튼은 체크박스와 비슷하게 동작합니다.
라디오 버튼의 `[formField]` 값이 같다면, 시그널 폼은 이 라디오 버튼에 같은 `name` 어트리뷰트 값을 바인딩합니다:

```html
<label>
  <input type="radio" value="free" [formField]="form.plan" />
  Free
</label>
<label>
  <input type="radio" value="premium" [formField]="form.plan" />
  Premium
</label>
```

이렇게 구현하면 사용자가 라디오 버튼을 클릭했을 때 폼의 `field`가 개별 라디오 버튼의 `value` 어트리뷰트값을 저장합니다.
그래서 "Premium" 버튼을 선택하면 `form.plan().value()` 값은 `"premium"`이 됩니다.

<!--
### Select dropdowns
-->

<a id="select-dropdowns"></a>

### 드롭다운 셀렉트

<!--
Select elements work with both static and dynamic options:

```angular-html
<!- Static options ->
<select [formField]="form.country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>

<!- Dynamic options with @for ->
<select [formField]="form.productId">
  <option value="">Select a product</option>
  @for (product of products; track product.id) {
    <option [value]="product.id">{{ product.name }}</option>
  }
</select>
```

NOTE: Multiple select (`<select multiple>`) is not supported by the `[formField]` directive at this time.
-->

셀렉트 엘리먼트는 정적인 옵션과 동적인 옵션을 모두 사용할 수 있습니다:

```angular-html
<!-- 정적 옵션 -->
<select [formField]="form.country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>

<!-- @for 를 사용하는 동적 옵션 -->
<select [formField]="form.productId">
  <option value="">Select a product</option>
  @for (product of products; track product.id) {
    <option [value]="product.id">{{ product.name }}</option>
  }
</select>
```

참고: 셀렉트 엘리먼트에 `multiple` 옵션을 지정하면 `[formField]` 디렉티브를 사용할 수 없습니다.

<!--
## Validation and state
-->

<a id="validation-and-state"></a>

## 유효성 검사, 유효성 검사 상태

<!--
Signal Forms provides built-in validators that you can apply to your form fields. To add validation, pass a schema function as the second argument to `form()`:

```ts
const loginForm = form(loginModel, (schemaPath) => {
  debounce(schemaPath.email, 500);
  required(schemaPath.email);
  email(schemaPath.email);
});
```

The schema function receives a **schema path** parameter that provides paths to your fields for configuring validation rules.

Common validators include:

- **`required()`** - Ensures the field has a value
- **`email()`** - Validates email format
- **`min()`** / **`max()`** - Validates number ranges
- **`minLength()`** / **`maxLength()`** - Validates string or collection length
- **`pattern()`** - Validates against a regex pattern

You can also customize error messages by passing an options object as the second argument to the validator:

```ts
required(schemaPath.email, {message: 'Email is required'});
email(schemaPath.email, {message: 'Please enter a valid email address'});
```

Each node in the `FieldTree` exposes its validation and interaction state through reactive signals.

### FieldTree State Signals

Every node in the tree, including the root form object, provides the same signals to track its state. Since every node is a `FieldTree`, the API for monitoring validity and interaction is identical at every level.

| State        | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `valid()`    | Returns `true` if the node passes all validation rules                          |
| `invalid()`  | Returns `true` if there are validation errors                                   |
| `pending()`  | Returns `true` if async validation is in progress                               |
| `touched()`  | Returns `true` if the user has focused and blurred the field or any child field |
| `dirty()`    | Returns `true` if the value has been changed by the user                        |
| `disabled()` | Returns `true` if the node is disabled                                          |
| `readonly()` | Returns `true` if the node is readonly                                          |
| `errors()`   | Returns an array of validation errors with `kind` and `message` properties      |

### Complete example {#complete-example-validation}

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.css"/>
</docs-code-multifile>
-->

시그널 폼은 폼 필드에 사용할 수 있는 유효성 검사 함수를 기본으로 제공합니다.
폼 필드에 유효성 검사 함수를 적용하려면 `form()` 함수를 실행할 때 두번째 인자로 스키마 함수(schema function)를 전달하면 됩니다:

```ts
const loginForm = form(loginModel, (schemaPath) => {
  debounce(schemaPath.email, 500);
  required(schemaPath.email);
  email(schemaPath.email);
});
```

스키마 함수는 유효성 검사 규칙을 지정하는 **스키마 경로(schema path)** 를 인자로 받습니다.

이런 함수를 자주 사용합니다:

- **`required()`** - 필드에 값이 존재해야 합니다.
- **`email()`** - 이메일 형식인지 검사합니다.
- **`min()`** / **`max()`** - 입력된 숫자의 범위를 검사합니다.
- **`minLength()`** / **`maxLength()`** - 문자열이나 배열의 길이를 검사합니다.
- **`pattern()`** - 정규표현식 형식에 맞는지 검사합니다.

그리고 유효성 검사 함수의 두번째 인자로 옵션 객체를 전달하면서 오류 메시지를 커스터마이징할 수 있습니다:

```ts
required(schemaPath.email, {message: 'Email is required'});
email(schemaPath.email, {message: 'Please enter a valid email address'});
```

`FieldTree`의 각 노드는 유효성 검사 상태와 상호작용 상태를 반응형 시그널로 표현합니다.

<a id="fieldtree-state-signals"></a>

### FieldTree 상태 시그널

최상위 폼 객체를 포함한 트리의 모든 노드는 상태를 확인하는 동일한 시그널을 제공합니다.
모든 노드가 `FieldTree`이므로 어느 단계에서든 같은 API로 유효성 검사 상태와 상호작용 상태를 확인할 수 있습니다.

| 상태         | 설명                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| `valid()`    | 노드가 모든 유효성 검사 규칙을 통과하면 `true`를 반환합니다.                |
| `invalid()`  | 유효성 검사 오류가 있으면 `true`를 반환합니다.                              |
| `pending()`  | 비동기 유효성 검사가 진행 중이면 `true`를 반환합니다.                       |
| `touched()`  | 사용자가 해당 필드나 자식 필드에 접근했다가 빠져나가면 `true`를 반환합니다. |
| `dirty()`    | 사용자가 값을 변경했으면 `true`를 반환합니다.                               |
| `disabled()` | 노드가 비활성화되면 `true`를 반환합니다.                                    |
| `readonly()` | 노드가 읽기 전용이면 `true`를 반환합니다.                                   |
| `errors()`   | `kind`, `message` 프로퍼티가 있는 유효성 검사 오류 배열을 반환합니다.       |

<a id="complete-example-validation"></a>

<a id="전체-예제-전체-예제-2"></a>

### 전체 예제 {#ko-complete-example-validation}

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.css"/>
</docs-code-multifile>

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
To learn more about Signal Forms and how it works, check out the in-depth guides:

- [Overview](guide/forms/signals/overview) - Introduction to Signal Forms and when to use them
- [Form models](guide/forms/signals/models) - Creating and managing form data with signals
- [Field state management](guide/forms/signals/field-state-management) - Working with validation state, interaction tracking, and field visibility
- [Validation](guide/forms/signals/validation) - Built-in validators, custom validation rules, and async validation

<docs-pill-row>
  <docs-pill title="Modular design with dependency injection" href="essentials/dependency-injection" />
</docs-pill-row>
-->

시그널 폼이 동작하는 것을 더 자세하게 알아보려면 이런 내용을 확인해 보세요:

- [개요](guide/forms/signals/overview) - 시그널 폼이 무엇인지, 언제 사용하는지 설명합니다.
- [폼 모델](guide/forms/signals/models) - 폼 데이터를 시그널로 생성하고 관리합니다.
- [필드 상태 관리](guide/forms/signals/field-state-management) - 유효성 검사 결과를 활용하는 방법, 사용자 상호작용 상태 확인, 필드의 가시성을 관리합니다.
- [유효성 검사](guide/forms/signals/validation) - 기본 유효성 검사 함수, 커스텀 유효성 검사, 비동기 유효성 검사를 다룹니다.

<docs-pill-row>
  <docs-pill title="의존성 주입을 활용한 모듈 디자인 패턴" href="essentials/dependency-injection" />
</docs-pill-row>
