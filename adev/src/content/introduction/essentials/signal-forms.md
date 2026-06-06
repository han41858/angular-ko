<!--
<docs-decorative-header title="Forms with signals" imgSrc="adev/src/assets/images/signals.svg"> </docs-decorative-header>
-->

Signal Forms manage form state using Angular signals to provide automatic synchronization between your data model and the UI with Angular Signals.

This guide walks you through the core concepts to create forms with Signal Forms. Here's how it works:
-->

<docs-decorative-header title="시그널 폼" imgSrc="adev/src/assets/images/signals.svg"> </docs-decorative-header>

시그널 폼은 Angular 시그널을 사용해서 폼 상태를 관리하며, 데이터 모델과 UI를 동기화 할 때도 Angular 시그널을 활용합니다.

이 문서에서는 시그널 폼을 어떻게 만드는지 핵심을 알아봅시다.
이렇게 구현합니다:

<!--
## Creating your first form
-->

## 첫번째 폼 만들기

<!--
### 1. Create a form model with `signal()`
-->

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

### 2. `form()`을 실행해서 폼 모델을 `FieldTree`로 변환하기

<!--
Then, you pass your form model into the `form()` function to create a **field tree** - an object structure that mirrors your model's shape, allowing you to access fields with dot notation:

```ts
const loginForm = form(loginModel);

// Access fields directly by property name
loginForm.email;
loginForm.password;
```
-->

그리고 폼 모델을 `form()` 함수로 전달해서 이 폼 모델을 **필드 트리** 로 변환합니다.
필드 트리는 데이터 모델을 표현하는 객체이며, 객체이기 때문에 객체 프로퍼티처럼 접근할 수 있습니다:

```ts
const loginForm = form(loginModel);

// 프로퍼티 이름으로 직접 접근합니다.
loginForm.email;
loginForm.password;
```

<!--
### 3. Bind HTML inputs with `[formField]` directive
-->

### 3. `[formField]` 디렉티브로 HTML 입력 필드를 바인딩 합니다.

<!--
Next, you bind your HTML inputs to the form using the `[formField]` directive, which creates two-way binding between them:

```html
<input type="email" [formField]="loginForm.email" />
<input type="password" [formField]="loginForm.password" />
```

As a result, user changes (such as typing in the field) automatically updates the form.

NOTE: The `[formField]` directive also syncs field state for attributes like `required`, `disabled`, and `readonly` when appropriate.
-->

그 다음에는 HTML 입력 엘리먼트에 `[formField]` 디렉티브를 양방향 바인딩해서 폼과 연결합니다:

```html
<input type="email" [field]="loginForm.email" />
<input type="password" [field]="loginForm.password" />
```

그러면 사용자가 입력 엘리먼트의 값을 변경하면 폼에 있는 데이터도 자동으로 갱신됩니다.

참고: `[formField]` 디렉티브는 `required`, `disabled`, `readonly`와 같은 어트리뷰트 값도 동기화합니다.

<!--
### 4. Read field values with `value()`
-->

### 4. 필드 값 읽기: `value()`

<!--
You can access field state by calling the field as a function. This returns a `FieldState` object containing reactive signals for the field's value, validation status, and interaction state:

```ts
loginForm.email(); // Returns FieldState with value(), valid(), touched(), etc.
```

To read the field's current value, access the `value()` signal:

```html
<!- Render form value that updates automatically as user types ->
<p>Email: {{ loginForm.email().value() }}</p>
```

```ts
// Get the current value
const currentEmail = loginForm.email().value();
```
-->

필드 상태는 필드를 함수처럼 실행하면 접근할 수 있습니다.
이 때 접근하는 `FieldState` 객체에는 필드의 값, 유효성 검사 상태, 상호작용 상태를 표현하는 반응형 시그널이 모두 포함됩니다:

```ts
loginForm.email(); // value(), valid(), touched() 등 값이 포함된 FieldState를 반환합니다.
```

그래서 입력 필드의 현재 값을 읽으려면 `value()` 시그널을 읽으면 됩니다:

```html
<!-- 사용자가 입력한 값을 화면에 렌더링합니다. -->
<p>Email: {{ loginForm.email().value() }}</p>
```

```ts
// 현재값을 참조합니다.
const currentEmail = loginForm.email().value();
```

<!--
### 5. Update field values with `set()`
-->

### 5. 필드값 변경하기: `set()`

<!--
You can programmatically update a field's value using the `value.set()` method. This updates both the field and the underlying model signal:

```ts
// Update the value programmatically
loginForm.email().value.set('alice@wonderland.com');
```

As a result, both the field value and the model signal are updated automatically:

```ts
// The model signal is also updated
console.log(loginModel().email); // 'alice@wonderland.com'
```

Here's a complete example:

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.css"/>
</docs-code-multifile>
-->

필드값은 `value.set()` 메서드를 사용해서 코드로 변경할 수 있습니다.
이 메서드를 실행하면 필드의 값과 모델 시그널 값을 모두 변경합니다:

```ts
// 코드로 필드 값을 변경합니다.
loginForm.email().value.set('alice@wonderland.com');
```

그러면 필드 값과 모델 시그널 값이 모두 변경된 것을 확인할 수 있습니다:

```ts
// 모델 시그널도 함께 변경됩니다.
console.log(loginModel().email); // 'alice@wonderland.com'
```

전체 예제 코드를 확인해 보세요:

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-simple/app/app.css"/>
</docs-code-multifile>

<!--
## Basic usage
-->

## 활용 방법

<!--
The `[formField]` directive works with all standard HTML input types. Here are the most common patterns:
-->

`[formField]` 디렉티브는 표준 HTML 입력 필드라면 어디에라도 사용할 수 있습니다.
이렇게 사용하면 됩니다:

<!--
### Text inputs
-->

### 텍스트 입력

<!--
Text inputs work with various `type` attributes and textareas:

```html
<!- Text and email ->
<input type="text" [formField]="form.name" />
<input type="email" [formField]="form.email" />
```
-->

텍스트 입력은 다양한 `type`과 함께 사용할 수 있ㅅ브니다:

```html
<!-- 텍스트, 이메일 -->
<input type="text" [formField]="form.name" />
<input type="email" [formField]="form.email" />
```

<!--
#### Numbers
-->

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

#### 여러줄 텍스트

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

체크박스가 여러개라면 개별 필드마다 불리언 값을 연결합니다:

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

```html
<!-- 정적 옵션 -->
<select [field]="form.country">
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

참고: 셀렉트 엘리먼트에 `multiple` 옵션을 지정하면 `[field]` 디렉티브를 사용할 수 없습니다.

<!--
## Validation and state
-->

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

Each form field exposes its validation state through signals. For example, you can check `field().valid()` to see if validation passes, `field().touched()` to see if the user has interacted with it, and `field().errors()` to get the list of validation errors.

Here's a complete example:

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.css"/>
</docs-code-multifile>
-->

시그널 폼은 폼 필드에 사용할 수 있는 유효성 검사 함수를 기본으로 제공합니다.
폼 필드에 유효성 검사 함수를 적용하려면 `form()` 함수를 실행할 때 두번째 인자로 스키마 함수(scheme function)를 전달하면 됩니다:

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

그리고 유효성 검사 함수의 두번째 인자로 옵션 객체를 전달하면서 에러 메시지를 커스터마이징 할 수 있습니다:

```ts
required(schemaPath.email, {message: 'Email is required'});
email(schemaPath.email, {message: 'Please enter a valid email address'});
```

개별 폼 필드는 유효성 검사 상태를 시그널로 표현합니다.
그래서 유효성 검사를 통과했다면 `field().valid()`를 확인하면 되고, 사용자가 입력 엘리먼트에 접근했는지 확인하려면 `field().touched()`를 확인하면 되고, 유효성 검사에서 발생한 에러를 확인하려면 `field().errors()`를 확인하면 됩니다.

전체 예제 코드를 확인해 보세요:

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation/app/app.css"/>
</docs-code-multifile>

<!--
### Field State Signals
-->

### 필드 상태 시그널

<!--
Every `field()` provides these state signals:

| State        | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `valid()`    | Returns `true` if the field passes all validation rules                    |
| `touched()`  | Returns `true` if the user has focused and blurred the field               |
| `dirty()`    | Returns `true` if the user has changed the value                           |
| `disabled()` | Returns `true` if the field is disabled                                    |
| `readonly()` | Returns `true` if the field is readonly                                    |
| `pending()`  | Returns `true` if async validation is in progress                          |
| `errors()`   | Returns an array of validation errors with `kind` and `message` properties |
-->

`field()`로 확인할 수 있는 상태값 시그널은 이렇습니다:

| 상태         | 설명                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `valid()`    | 유효성 검사를 모두 통과하면 `true`를 반환합니다.                                                      |
| `touched()`  | 사용자가 입력 엘리먼트에 접근했다가 빠져나가면 `true`를 반환합니다.                                   |
| `dirty()`    | 사용자가 값을 바꾸면 `true`를 반환합니다.                                                             |
| `disabled()` | 필드가 비활성화되면 `true`를 반환합니다.                                                              |
| `readonly()` | 필드가 읽기 전용이면 `true`를 반환합니다.                                                             |
| `pending()`  | 비동기 유효성 검사가 진행중이면 `true`를 반환합니다.                                                  |
| `errors()`   | 유효성 검사에서 발생한 에러 배열을 반환합니다. 에러 객체에는 `kind`, `message` 프로퍼티가 존재합니다. |

<!--
## Next steps
-->

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
  <docs-pill title="의존성 주입을 활용하는 모듈 디자인" href="essentials/dependency-injection" />
</docs-pill-row>
