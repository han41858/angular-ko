<!--
# Validation
-->
# 유효성 검사

<!--
Forms need validation to ensure users provide correct, complete data before submission. Without validation, you would need to handle data quality issues on the server, provide poor user experience with unclear error messages, and manually check every constraint.

Signal Forms provides a schema-based validation approach. Validation rules bind to fields using a schema function, run automatically when values change, and expose errors through field state signals. This enables reactive validation that updates as users interact with the form.

<docs-code-multifile preview hideCode path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.css"/>
</docs-code-multifile>
-->
사용자가 폼을 제출하기 전에 폼에 입력한 내용이 맞는지 확인하려면 유효성 검사를 해야 합니다.
유효성 검사가 없으면 서버에서 데이터 유효성을 검사해야 하고, 명확하지 않은 오류 메시지로 사용자 경험을 악화시킬 수 있으며, 모든 제약 조건을 수동으로 확인해야 합니다.

시그널 폼은 스키마 기반으로 유효성을 검사합니다.
유효성 검사 규칙은 스키마 함수를 사용해서 필드와 바인딩하며, 값이 변경되었을 때 자동으로 실행되고 필드 상태 시그널에 따라 에러 메시지를 표시합니다.
시그널 폼을 활용하면 사용자가 폼과 상호작용하면서 실시간으로 업데이트되는 반응형 유효성 검사가 가능합니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.html"/>
  <docs-code header="app.css" path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.css"/>
</docs-code-multifile>


<!--
## Validation basics
-->
## 기초 개념

<!--
Validation in Signal Forms is defined through a schema function passed as the second argument to `form()`.
-->
시그널 폼에서 유효성 검사는 `form()`을 실행할 때 두 번째 인자로 스키마 함수를 전달하면 됩니다.


<!--
### The schema function
-->
### 스키마(schema) 함수

<!--
The schema function receives a `SchemaPathTree` object that lets you define your validation rules:

<docs-code
  header="app.ts"
  path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts"
  visibleLines="[21,22,23,24,25,26,27]"
  highlight="[23,24,26]"
/>

The schema function runs once during form initialization. Validation rules bind to fields using the schema path parameter (such as `schemaPath.email`, `schemaPath.password`), and validation runs automatically whenever field values change.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.
-->
스키마 함수는 유효성 검사 규칙을 `SchemaPathTree` 객체 형식으로 정의해서 인자로 받습니다:

<docs-code
  header="app.ts"
  path="adev/src/content/examples/signal-forms/src/login-validation-complete/app/app.ts"
  visibleLines="[21,22,23,24,25,26,27]"
  highlight="[23,24,26]"
/>

스키마 함수는 폼이 초기화 될 때 한 번 실행됩니다.
유효성 검사 규칙은 `schemaPath.email`이나 `schemaPath.password`와 같이 스키마 경로 배개변수를 사용해서 필드에 바인딩되며, 필드값이 변경될 때마다 유효성 검사가 자동으로 실행됩니다.

참고: 스키마 콜백 함수의 인자(`schemaPath`)는 폼에 있는 모든 필드를 접근할 수 있는 `SchemaPathTree` 객체입니다.
인자의 이름은 원하는 대로 변경해도 됩니다.


<!--
### How validation works
-->
### 유효성 검사가 동작하는 방식

<!--
Validation in Signal Forms follows this pattern:

1. **Define validation rules in schema** - Bind validation rules to fields in the schema function
2. **Automatic execution** - Validation rules run when field values change
3. **Error propagation** - Validation errors are exposed through field state signals
4. **Reactive updates** - UI automatically updates when validation state changes

Validation runs on every value change for interactive fields. Hidden and disabled fields don't run validation - their validation rules are skipped until the field becomes interactive again.
-->
시그널 폼의 츄효성 검사는 이런 방식으로 동작합니다:

1. **유효성 검사 규칙을 스키마에 정의합니다** - 스키마 함수 안에서 유효성검사 규칙이 필드와 바인딩 됩니다.
2. **자동 실행** - 값이 변경될 때마다 유효성 검사가 실행됩니다.
3. **에러 전파** - 유효성 검사로 에러가 발생하면 상태 시그널로 전달됩니다.
4. **반응형 업데이트** - 유효성 검사 결과에 따라 UI가 자동으로 갱신됩니다.

유효성 검사는 사용자가 필드와 상호작용하면서 값이 변경될 때마다 실행됩니다.
화면에서 감춰져 있거나, 비활성화된 필드는 다시 상호작용한 필드가 되기 전까지는 유효성 검사에 영향을 주지 않습니다.


<!--
### Validation timing
-->
### 유효성 검사 시점

<!--
Validation rules execute in this order:

1. **Synchronous validation** - All synchronous validation rules run when value changes
2. **Asynchronous validation** - Asynchronous validation rules run only after all synchronous validation rules pass
3. **Field state updates** - The `valid()`, `invalid()`, `errors()`, and `pending()` signals update

Synchronous validation rules (like `required()`, `email()`) complete immediately. Asynchronous validation rules (like `validateHttp()`) may take time and set the `pending()` signal to `true` while executing.

All validation rules run on every change - validation doesn't short-circuit after the first error. If a field has both `required()` and `email()` validation rules, both run, and both can produce errors simultaneously.
-->
유효성 검사는 이런 순서로 실행됩니다:

1. **동기(synchronous) 검사** - 값이 변경되면 동기 검사가 모두 실행됩니다.
2. **비동기(Asynchronous) 검사** - 동기 검사가 모두 성공하면 비동기 검사가 실행됩니다.
3. **필드 상태 갱신** - `valid()`, `invalid()`, `errors()`, `pending()` 시그널이 갱신됩니다.

`required()`나 `email()`과 같은 동기 유효성 검사는 실행이 즉시 종료됩니다.
`validateHttp()`와 같은 비동기 유효성 검사는 시간이 조금 걸리기 때문에, 비동기 검사가 실행되는 중에는 `pending()` 시그널의 값이 `true`가 됩니다.

유효성 검사는 값이 변경될 때마다 실행되며, 에러가 먼저 발생하는 유효성 검사가 있어도 진행중인 검사가 중단되지는 않습니다.
어떤 필드에 `required()` 규칙과 `email()` 규칙이 함께 있으면, 동시에 실행되며, 동시에 에러가 발생할 수 있습니다.


<!--
## Built-in validation rules
-->
## 기본 유효성 검사

<!--
Signal Forms provides validation rules for common validation scenarios. All built-in validation rules accept an options object for custom error messages and conditional logic.
-->
시그널 폼이 기본적으로 제공하는 유효성 검사가 있습니다.
기본 유효성 검사 규칙은 옵션 객체를 받는데, 이 객체를 사용해서 에러 메시지와 조건 로직을 추가로 지정할 수 있습니다.


### `required()`

<!--
The `required()` validation rule ensures a field has a value:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>

      <label>
        Email
        <input type="email" [formField]="registrationForm.email" />
      </label>

      <button type="submit">Register</button>
    </form>
  `,
})
export class RegistrationComponent {
  registrationModel = signal({
    username: '',
    email: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.email, {message: 'Email is required'});
  });
}
```

A field is considered "empty" when:

| Condition                | Example |
| ------------------------ | ------- |
| Value is `null`          | `null`, |
| Value is an empty string | `''`    |

For conditional requirements, use the `when` option:

```ts
registrationForm = form(this.registrationModel, (schemaPath) => {
  required(schemaPath.promoCode, {
    message: 'Promo code is required for discounts',
    when: ({valueOf}) => valueOf(schemaPath.applyDiscount),
  });
});
```

The validation rule only runs when the `when` function returns `true`.

NOTE: `required` will return `true` for empty array. Use [`minLength()`](#minlength-and-maxlength) to validate arrays.
-->
`required()`는 필드에 값이 있어야 통과합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>

      <label>
        Email
        <input type="email" [formField]="registrationForm.email" />
      </label>

      <button type="submit">Register</button>
    </form>
  `,
})
export class RegistrationComponent {
  registrationModel = signal({
    username: '',
    email: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.email, {message: 'Email is required'});
  });
}
```

이런 경우는 필드가 "빈 값"인 것으로 판단합니다:

| 조건                | 예제    |
|---------------------|---------|
| 값이 `null` 일 때   | `null`, |
| 값이 빈 문자열일 때 | `''`    |

조건부로 필수 항목이라면 `when` 옵션을 사용하면 됩니다:

```ts
registrationForm = form(this.registrationModel, (schemaPath) => {
  required(schemaPath.promoCode, {
    message: 'Promo code is required for discounts',
    when: ({valueOf}) => valueOf(schemaPath.applyDiscount),
  });
});
```

유효성 검사 규칙은 `when` 함수 결과가 `true`일때만 실행됩니다.

참고: `required()`는 빈 배열에서도 `true` 값을 반환합니다.
배열을 검사하려면 [`minLength()`](#minlength-and-maxlength) 섹션을 참고하세요.


### `email()`

<!--
The `email()` validation rule checks for valid email format:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Your Email
        <input type="email" [formField]="contactForm.email" />
      </label>
    </form>
  `,
})
export class ContactComponent {
  contactModel = signal({email: ''});

  contactForm = form(this.contactModel, (schemaPath) => {
    email(schemaPath.email, {message: 'Please enter a valid email address'});
  });
}
```

The `email()` validation rule uses a standard email format regex. It accepts addresses like `user@example.com` but rejects malformed addresses like `user@` or `@example.com`.
-->
`email()` 규칙은 이메일 형식일 때 통과합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Your Email
        <input type="email" [formField]="contactForm.email" />
      </label>
    </form>
  `,
})
export class ContactComponent {
  contactModel = signal({email: ''});

  contactForm = form(this.contactModel, (schemaPath) => {
    email(schemaPath.email, {message: 'Please enter a valid email address'});
  });
}
```

`email()`은 표준 이메일 형식을 정규표현식으로 검사합니다.
`user@example.com`과 같은 주소는 유효성 검사를 통과하지만 `user@`나 `@example.com`과 같이 이메일 주소가 아닌 경우는 유효성 검사를 실패합니다.


<!--
### min() and max()
-->
### `min()`, `max()`

<!--
The `min()` and `max()` validation rules work with numeric values:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Age
        <input type="number" [formField]="ageForm.age" />
      </label>

      <label>
        Rating (1-5)
        <input type="number" [formField]="ageForm.rating" />
      </label>
    </form>
  `,
})
export class AgeFormComponent {
  ageModel = signal({
    age: 0,
    rating: 0,
  });

  ageForm = form(this.ageModel, (schemaPath) => {
    min(schemaPath.age, 18, {message: 'You must be at least 18 years old'});
    max(schemaPath.age, 120, {message: 'Please enter a valid age'});

    min(schemaPath.rating, 1, {message: 'Rating must be at least 1'});
    max(schemaPath.rating, 5, {message: 'Rating cannot exceed 5'});
  });
}
```

You can use computed values for dynamic constraints:

```ts
ageForm = form(this.ageModel, (schemaPath) => {
  min(schemaPath.participants, () => this.minimumRequired(), {
    message: 'Not enough participants',
  });
});
```
-->
`min()`, `max()`는 숫자의 크기를 검사합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Age
        <input type="number" [formField]="ageForm.age" />
      </label>

      <label>
        Rating (1-5)
        <input type="number" [formField]="ageForm.rating" />
      </label>
    </form>
  `,
})
export class AgeFormComponent {
  ageModel = signal({
    age: 0,
    rating: 0,
  });

  ageForm = form(this.ageModel, (schemaPath) => {
    min(schemaPath.age, 18, {message: 'You must be at least 18 years old'});
    max(schemaPath.age, 120, {message: 'Please enter a valid age'});

    min(schemaPath.rating, 1, {message: 'Rating must be at least 1'});
    max(schemaPath.rating, 5, {message: 'Rating cannot exceed 5'});
  });
}
```
기준값은 동적으로 지정할 수도 있습니다:

```ts
ageForm = form(this.ageModel, (schemaPath) => {
  min(schemaPath.participants, () => this.minimumRequired(), {
    message: 'Not enough participants',
  });
});
```


<a id="minlength-and-maxlength"></a>
<!--
### minLength() and maxLength()
-->
### `minLength()`, `maxLength()`

<!--
The `minLength()` and `maxLength()` validation rules work with strings and arrays:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, minLength, maxLength} from '@angular/forms/signals';

@Component({
  selector: 'app-password-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Password
        <input type="password" [formField]="passwordForm.password" />
      </label>

      <label>
        Bio
        <textarea [formField]="passwordForm.bio"></textarea>
      </label>
    </form>
  `,
})
export class PasswordFormComponent {
  passwordModel = signal({
    password: '',
    bio: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});
    maxLength(schemaPath.password, 100, {message: 'Password is too long'});

    maxLength(schemaPath.bio, 500, {message: 'Bio cannot exceed 500 characters'});
  });
}
```

For strings, "length" means the number of characters. For arrays, "length" means the number of elements.
-->
`minLength()`, `maxLength()`는 문자열이나 배열의 길이를 검사합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, minLength, maxLength} from '@angular/forms/signals';

@Component({
  selector: 'app-password-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Password
        <input type="password" [formField]="passwordForm.password" />
      </label>

      <label>
        Bio
        <textarea [formField]="passwordForm.bio"></textarea>
      </label>
    </form>
  `,
})
export class PasswordFormComponent {
  passwordModel = signal({
    password: '',
    bio: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});
    maxLength(schemaPath.password, 100, {message: 'Password is too long'});

    maxLength(schemaPath.bio, 500, {message: 'Bio cannot exceed 500 characters'});
  });
}
```

문자열이라면 "length"는 문자의 개수를 의미합니다.
그리고 배열이라면 "length"는 항목의 개수를 의미합니다.


<!--
### pattern()
-->
### `pattern()`

<!--
The `pattern()` validation rule validates against a regular expression:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-phone-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Phone Number
        <input [formField]="phoneForm.phone" placeholder="555-123-4567" />
      </label>

      <label>
        Postal Code
        <input [formField]="phoneForm.postalCode" placeholder="12345" />
      </label>
    </form>
  `,
})
export class PhoneFormComponent {
  phoneModel = signal({
    phone: '',
    postalCode: '',
  });

  phoneForm = form(this.phoneModel, (schemaPath) => {
    pattern(schemaPath.phone, /^\d{3}-\d{3}-\d{4}$/, {
      message: 'Phone must be in format: 555-123-4567',
    });

    pattern(schemaPath.postalCode, /^\d{5}$/, {
      message: 'Postal code must be 5 digits',
    });
  });
}
```

Common patterns:

| Pattern Type     | Regular Expression      | Example      |
| ---------------- | ----------------------- | ------------ |
| Phone            | `/^\d{3}-\d{3}-\d{4}$/` | 555-123-4567 |
| Postal code (US) | `/^\d{5}$/`             | 12345        |
| Alphanumeric     | `/^[a-zA-Z0-9]+$/`      | abc123       |
| URL-safe         | `/^[a-zA-Z0-9_-]+$/`    | my-url_123   |
-->
`pattern()`은 문자열이 정규표현식을 통과하는지 검사합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-phone-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Phone Number
        <input [formField]="phoneForm.phone" placeholder="555-123-4567" />
      </label>

      <label>
        Postal Code
        <input [formField]="phoneForm.postalCode" placeholder="12345" />
      </label>
    </form>
  `,
})
export class PhoneFormComponent {
  phoneModel = signal({
    phone: '',
    postalCode: '',
  });

  phoneForm = form(this.phoneModel, (schemaPath) => {
    pattern(schemaPath.phone, /^\d{3}-\d{3}-\d{4}$/, {
      message: 'Phone must be in format: 555-123-4567',
    });

    pattern(schemaPath.postalCode, /^\d{5}$/, {
      message: 'Postal code must be 5 digits',
    });
  });
}
```

사용 방법:

| 패턴           | 정규표현식              | 예시         |
|----------------|-------------------------|--------------|
| 전화번호       | `/^\d{3}-\d{3}-\d{4}$/` | 555-123-4567 |
| 우편번호(미국) | `/^\d{5}$/`             | 12345        |
| 영문자, 숫자   | `/^[a-zA-Z0-9]+$/`      | abc123       |
| URL            | `/^[a-zA-Z0-9_-]+$/`    | my-url_123   |


<!--
## Validation of array items
-->
## 배열 항목 검사

<!--
Forms can include arrays of nested objects (for example, a list of order items). To apply validation rules to each item in an array, use `applyEach()` inside your schema function. `applyEach()` iterates the array path and supplies a path for each item where you can apply validators just like top-level fields.

```ts
import {Component, signal} from '@angular/core';
import {applyEach, FormField, form, min, required, SchemaPathTree} from '@angular/forms/signals';

type Item = {name: string; quantity: number};

interface Order {
  title: string;
  description: string;
  items: Item[];
}

function ItemSchema(item: SchemaPathTree<Item>) {
  required(item.name, {message: 'Item name is required'});
  min(item.quantity, 1, {message: 'Quantity must be at least 1'});
}

@Component(/* ... */)
export class OrderComponent {
  orderModel = signal<Order>({
    title: '',
    description: '',
    items: [{name: '', quantity: 0}],
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.description);

    applyEach(schemaPath.items, ItemSchema);
  });
}
```
-->
폼에는 장바구니와 같이 객체 배열이 있을 수 있습니다.
배열 안의 개별 항목에 유효성 검사를 적용하려면 스키마 함수 안에서 `applyEach()`를 사용하면 됩니다.
`applyEach()`는 지정된 경로의 배열을 순회하면서 최상위 계층에서 유효성 검사를 수행하듯이 개별 필드를 검사할 수 있습니다.

```ts
import {Component, signal} from '@angular/core';
import {applyEach, FormField, form, min, required, SchemaPathTree} from '@angular/forms/signals';

type Item = {name: string; quantity: number};

interface Order {
  title: string;
  description: string;
  items: Item[];
}

function ItemSchema(item: SchemaPathTree<Item>) {
  required(item.name, {message: 'Item name is required'});
  min(item.quantity, 1, {message: 'Quantity must be at least 1'});
}

@Component(/* ... */)
export class OrderComponent {
  orderModel = signal<Order>({
    title: '',
    description: '',
    items: [{name: '', quantity: 0}],
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.description);

    applyEach(schemaPath.items, ItemSchema);
  });
}
```


<!--
## Validation errors
-->
## 유효성 검사 에러

<!--
When validation rules fail, they produce error objects that describe what went wrong. Understanding error structure helps you provide clear feedback to users.

<!- TODO: Uncomment when field state management guide is published

NOTE: This section covers the errors that validation rules produce. For displaying and using validation errors in your UI, see the [Field State Management guide](guide/forms/signals/field-state-management). ->
-->
유효성 검사가 실패하면 유효성 검사 함수는 무엇이 잘못되었는지 설명하는 에러 객체를 반환합니다.
사용자에게 명확한 피드백을 제공하기 위해 에러 객체의 구조를 이해해 봅시다.


<!--
### Error structure
-->
### 에러 객체의 구조

<!--
Each validation error object contains these properties:

| Property  | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `kind`    | The validation rule that failed (e.g., "required", "email", "minLength") |
| `message` | Optional human-readable error message                                    |

Built-in validation rules automatically set the `kind` property. The `message` property is optional - you can provide custom messages through validation rule options.
-->
에러 객체는 이런 프로퍼티를 갖습니다:

| 프로퍼티  | 설명                                                               |
|-----------|--------------------------------------------------------------------|
| `kind`    | 유효성 검사가 실패한 규칙 (예시. "required", "email", "minLength") |
| `message` | 사람이 읽을 수 있는 에러 메시지(생략 가능)                         |

Angular가 기본으로 제공하는 유효성 검사 규칙은 `kind` 프로퍼티 값이 자동으로 설정됩니다.
`message` 프로퍼티는 유효성 검사 규칙을 정의할 때 옵션으로 전달할 수 있으며, 생략할 수 있습니다.


<!--
### Custom error messages
-->
### 커스텀 에러 메시지

<!--
All built-in validation rules accept a `message` option for custom error text:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="signupForm.username" />
      </label>

      <label>
        Password
        <input type="password" [formField]="signupForm.password" />
      </label>
    </form>
  `,
})
export class SignupComponent {
  signupModel = signal({
    username: '',
    password: '',
  });

  signupForm = form(this.signupModel, (schemaPath) => {
    required(schemaPath.username, {
      message: 'Please choose a username',
    });

    required(schemaPath.password, {
      message: 'Password cannot be empty',
    });
    minLength(schemaPath.password, 12, {
      message: 'Password must be at least 12 characters for security',
    });
  });
}
```

Custom messages should be clear, specific, and tell users how to fix the problem. Instead of "Invalid input", use "Password must be at least 12 characters for security".
-->
Angular가 제공하는 기본 유효성 검사 함수는 `message` 옵션으로 커스텀 에러 문구를 받을 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="signupForm.username" />
      </label>

      <label>
        Password
        <input type="password" [formField]="signupForm.password" />
      </label>
    </form>
  `,
})
export class SignupComponent {
  signupModel = signal({
    username: '',
    password: '',
  });

  signupForm = form(this.signupModel, (schemaPath) => {
    required(schemaPath.username, {
      message: 'Please choose a username',
    });

    required(schemaPath.password, {
      message: 'Password cannot be empty',
    });
    minLength(schemaPath.password, 12, {
      message: 'Password must be at least 12 characters for security',
    });
  });
}
```

커스텀 메시지는 명확하고, 구체적이며, 문제를 어떻게 해결하는지 알려줘야 합니다.
"잘못된 입력" 이라고 알려주는 대신, "비밀번호는 보안을 위해 최소한 12자 이상이어야 합니다" 라는 문구를 사용하세요.


<!--
### Multiple errors per field
-->
### 필드 하나에 에러가 여러개 발생한 경우

<!--
When a field has multiple validation rules, each validation rule runs independently and can produce an error:

```ts
signupForm = form(this.signupModel, (schemaPath) => {
  required(schemaPath.email, {message: 'Email is required'});
  email(schemaPath.email, {message: 'Enter a valid email address'});
  minLength(schemaPath.email, 5, {message: 'Email is too short'});
});
```

If the email field is empty, only the `required()` error appears. If the user types "a@b", both `email()` and `minLength()` errors appear. All validation rules run - validation doesn't stop after the first failure.

TIP: Use the `touched() && invalid()` pattern in your templates to prevent errors from appearing before users have interacted with a field. For comprehensive guidance on displaying validation errors, see the [Field State Management guide](guide/forms/signals/field-state-management#conditional-error-display).
-->
한 필드에 유효성 검사 규칙이 여러개 적용된 경우에는 개별 유효성 검사 규칙이 독립적으로 실행되며 에러가 발생할 수 있습니다:

```ts
signupForm = form(this.signupModel, (schemaPath) => {
  required(schemaPath.email, {message: 'Email is required'});
  email(schemaPath.email, {message: 'Enter a valid email address'});
  minLength(schemaPath.email, 5, {message: 'Email is too short'});
});
```

이메일 필드가 빈 값이라면 `required()` 에러만 발생합니다.
사용자가 "a@b" 라고 입력하면 `email()` 에러와 `minLength()` 에러가 발생합니다.
유효성 검사 규칙 중에서 에러가 발생하는 것이 있더라도, 유효성 검사 규칙은 모두 실행됩니다.

참고: 사용자가 필드에 접근한 이후에만 템플릿에 에러를 표시하려면 `touched() && invalid()` 패턴을 사용하세요.
유효성 검사 에러에 대해 자세하게 알아보려면 [필드 상태 관리 문서](guide/forms/signals/field-state-management#conditional-error-display)를 참고하세요.


<!--
## Custom validation rules
-->
## 커스텀 유효성 검사 규칙

<!--
While built-in validation rules handle common cases, you'll often need custom validation logic for business rules, complex formats, or domain-specific constraints.
-->
기본 유효성 검사 규칙은 일반적인 경우에 사용할 수 있지만, 비즈니스 로직이나 복잡한 형식, 도메인에 특화된 규칙은 커스텀 유효성 검사 규칙으로 정의할 수 있습니다.


<!--
### Using validate()
-->
### `validate()` 활용하기

<!--
The `validate()` function creates custom validation rules. It receives a validator function that accesses the field context and returns:

| Return Value          | Meaning          |
| --------------------- | ---------------- |
| Error object          | Value is invalid |
| `null` or `undefined` | Value is valid   |

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-url-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Website URL
        <input [formField]="urlForm.website" />
      </label>
    </form>
  `,
})
export class UrlFormComponent {
  urlModel = signal({website: ''});

  urlForm = form(this.urlModel, (schemaPath) => {
    validate(schemaPath.website, ({value}) => {
      if (!value().startsWith('https://')) {
        return {
          kind: 'https',
          message: 'URL must start with https://',
        };
      }

      return null;
    });
  });
}
```

The validator function receives a `FieldContext` object with:

| Property        | Type       | Description                                 |
| --------------- | ---------- | ------------------------------------------- |
| `value`         | Signal     | Signal containing the current field value   |
| `state`         | FieldState | The field state reference                   |
| `field`         | FieldTree  | The field tree reference                    |
| `valueOf()`     | Method     | Get the value of another field by path      |
| `stateOf()`     | Method     | Get the state of another field by path      |
| `fieldTreeOf()` | Method     | Get the field tree of another field by path |
| `pathKeys`      | Signal     | Path keys from root to current field        |

NOTE: Child fields also have a `key` signal, and array item fields have both `key` and `index` signals.

Return an error object with `kind` and `message` when validation fails. Return `null` or `undefined` when validation passes.
-->
커스텀 유효성 검사 규칙을 만들 때는 `validate()` 함수를 활용합니다.
이 함수는 필드 컨텍스트를 인자로 받고 결과를 반환하는 함수입니다:

| 반환값                  | 의미               |
|-------------------------|--------------------|
| 에러 객체               | 값이 유효하지 않음 |
| `null` 또는 `undefined` | 값이 유효함        |

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-url-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Website URL
        <input [formField]="urlForm.website" />
      </label>
    </form>
  `,
})
export class UrlFormComponent {
  urlModel = signal({website: ''});

  urlForm = form(this.urlModel, (schemaPath) => {
    validate(schemaPath.website, ({value}) => {
      if (!value().startsWith('https://')) {
        return {
          kind: 'https',
          message: 'URL must start with https://',
        };
      }

      return null;
    });
  });
}
```

유효성 검사 함수가 인자로 받는 `FieldContext` 객체에는 이런 프로퍼티가 존재합니다:

| 프로퍼티        | 타입       | 설명                                                  |
|-----------------|------------|-------------------------------------------------------|
| `value`         | 시그널     | 현재 값을 표현하는 시그널                             |
| `state`         | FieldState | FieldState 객체 참조                                  |
| `field`         | FieldTree  | FieldTree 객체 참조                                   |
| `valueOf()`     | 메서드     | 경로에 해당하는 다른 필드의 값을 가져옵니다.          |
| `stateOf()`     | 메서드     | 경로에 해당하는 다른 필드의 상태를 가져옵니다.        |
| `fieldTreeOf()` | 메서드     | 경로에 해당하는 다른 필드 트리를 가져옵니다.          |
| `pathKeys`      | 시그널     | 최상위 경로부터 현재 필드에 이르는 경로를 표현합니다. |

참고: 자식 필드에도 `key` 시그널이 존재하며, 배열 항목 필드에는 `key`와 `index` 시그널이 함께 존재합니다.

유효성 검사에 실패하면 `kind` 프로퍼티와 `message` 프로퍼티를 설정해서 에러 객체를 반환하면 됩니다.
유효성 검사에 성공하면 `null`이나 `undefined`를 반환하면 됩니다.


<!--
### Using validateTree()
-->
### `validateTree()` 활용하기

<!--
The `validateTree()` function creates custom validation rules that can target multiple fields or provide complex validation logic for a whole subtree.

```angular-ts
import {Component, model} from '@angular/core';
import {form, FormField, validateTree} from '@angular/forms/signals';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  /* ... */
})
export class UserFormComponent {
  readonly userModel = model<User>({
    firstName: '',
    lastName: '',
  });

  userForm = form(this.userModel, (path) => {
    validateTree(path, (ctx) => {
      if (ctx.valueOf(path.firstName).length < 5) {
        return {
          kind: 'minLength5',
          message: 'First name must be at least 5 characters',
          fieldTree: ctx.fieldTree.lastName,
        };
      }

      return null;
    });
  });
}
```

The `validateTree()` validator function receives the same `FieldContext` object as `validate()`.
-->
필드 여러개를 한꺼번에 검사하거나, 필드 트리를 기준으로 복잡한 검사 로직을 구현할 때는 `validateTree()` 함수를 사용합니다.

```angular-ts
import {Component, model} from '@angular/core';
import {form, FormField, validateTree} from '@angular/forms/signals';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  /* ... */
})
export class UserFormComponent {
  readonly userModel = model<User>({
    firstName: '',
    lastName: '',
  });

  userForm = form(this.userModel, (path) => {
    validateTree(path, (ctx) => {
      if (ctx.valueOf(path.firstName).length < 5) {
        return {
          kind: 'minLength5',
          message: 'First name must be at least 5 characters',
          fieldTree: ctx.fieldTree.lastName,
        };
      }

      return null;
    });
  });
}
```

`validateTree()` 함수는 `validate()`와 마찬가지로 `FieldContext` 객체를 인자로 받습니다.


<!--
### Reusable validation rules
-->
### 유효성 검사 규칙 재사용하기

<!--
Create reusable validation rule functions by wrapping `validate()`:

```ts
function url(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    try {
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL',
      };
    }
  });
}

function phoneNumber(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!phoneRegex.test(value())) {
      return {
        kind: 'phoneNumber',
        message: options?.message || 'Phone must be in format: 555-123-4567',
      };
    }

    return null;
  });
}
```

You can use custom validation rules just like built-in validation rules:

```ts
urlForm = form(this.urlModel, (schemaPath) => {
  url(schemaPath.website, {message: 'Please enter a valid website URL'});
  phoneNumber(schemaPath.phone);
});
```
-->
유효성 검사 규칙 함수를 `validate()`로 랩핑하면 이 검사 규칙을 재활용할 수 있습니다:

```ts
function url(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    try {
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL',
      };
    }
  });
}

function phoneNumber(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!phoneRegex.test(value())) {
      return {
        kind: 'phoneNumber',
        message: options?.message || 'Phone must be in format: 555-123-4567',
      };
    }

    return null;
  });
}
```

이렇게 만든 커스텀 유효성 검사 규칙은 기본 유효성 검사 규칙과 같은 방법으로 사용합니다:

```ts
urlForm = form(this.urlModel, (schemaPath) => {
  url(schemaPath.website, {message: 'Please enter a valid website URL'});
  phoneNumber(schemaPath.phone);
});
```


<!--
## Cross-field validation
-->
## 교차 필드 검사

<!--
Cross-field validation compares or relates multiple field values.

A common scenario for cross-field validation is password confirmation:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-password-change',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        New Password
        <input type="password" [formField]="passwordForm.password" />
      </label>

      <label>
        Confirm Password
        <input type="password" [formField]="passwordForm.confirmPassword" />
      </label>

      <button type="submit">Change Password</button>
    </form>
  `,
})
export class PasswordChangeComponent {
  passwordModel = signal({
    password: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    required(schemaPath.password, {message: 'Password is required'});
    minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});

    required(schemaPath.confirmPassword, {message: 'Please confirm your password'});

    validate(schemaPath.confirmPassword, ({value, valueOf}) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.password);

      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });
}
```

The confirmation validation rule accesses the password field value using `valueOf(schemaPath.password)` and compares it to the confirmation value. This validation rule runs reactively - if either password changes, validation reruns automatically.
-->
교차 필드 유효성 검사는 여러 필드의 값을 비교하거나 연관시켜 검사하는 방식입니다.

비밀번호를 확인하는 경우에 일반적으로 사용합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-password-change',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        New Password
        <input type="password" [formField]="passwordForm.password" />
      </label>

      <label>
        Confirm Password
        <input type="password" [formField]="passwordForm.confirmPassword" />
      </label>

      <button type="submit">Change Password</button>
    </form>
  `,
})
export class PasswordChangeComponent {
  passwordModel = signal({
    password: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    required(schemaPath.password, {message: 'Password is required'});
    minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});

    required(schemaPath.confirmPassword, {message: 'Please confirm your password'});

    validate(schemaPath.confirmPassword, ({value, valueOf}) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.password);

      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });
}
```

비밀번호를 확인하는 유효성 검사는 `valueOf(schemaPath.password)`로 비밀번호 필드를 참조한 후에 확인 필드에 입력한 값과 비교합니다.
비밀번호가 변경되거나 비밀번호 확인 값이 변경되면 유효성 검사는 자동으로 다시 실행됩니다.


<!--
## Conditional validation
-->
## 조건부 유효성 검사

<!--
Sometimes a validation rule should apply only under certain conditions, such as validating a shipping address only when an order ships internationally, or applying a different set of rules to each variant of a union-typed field.

Because validation rules live in the schema function, you apply them conditionally with the same structural functions that compose schemas:

- Use [`applyWhen()`](guide/forms/signals/form-logic#conditional-logic-with-applywhen) to activate a group of rules based on reactive form state, including the values of other fields.
- Use [`applyWhenValue()`](guide/forms/signals/schemas#type-narrowing-with-applywhenvalue) to apply rules based on a field's own value. When the predicate is a type guard, the rules are typed to the narrowed value, which makes it the recommended way to validate discriminated unions and other variant types.

For complete examples, including reusable schemas and discriminated unions, see the [Schemas and schema composability guide](guide/forms/signals/schemas).
-->
때로는 특정 조건을 만족했을 때만 유효성 검사가 동작해야 하는 경우가 있습니다.
예를 들면 국제 배송을 선택했을 때만 배송 주소를 검사한다든가, 유니언 타입 필드에 각각 검사 규칙을 검사하는 경우가 그렇습니다.

유효성 검사 규칙은 스키마 함수 안에 정의하기 때문에, 조건부 유효성 검사도 스키마로 정의합니다:

- [`applyWhen()`](guide/forms/signals/form-logic#conditional-logic-with-applywhen) - 폼 상태에 반응하며 특정 조건이 되었을 때만 유효성 검사를 진행할 때 사용합니다.
- [`applyWhenValue()`](guide/forms/signals/schemas#type-narrowing-with-applywhenvalue) - 해당 필드 값에 따라 유효성 검사를 진행할 때 사용합니다. 타입 가드를 사용하는 경우, 유효성 검사 규칙의 타입이 축소되는데, 이 방식은 유니언 타입이나 확장 타입을 검증할 때 권장합니다.

스키마를 재사용하고 유니언을 구분하는 예제 코드는 [스키마와 스키마 조합](guide/forms/signals/schemas) 문서를 참고하세요.


<!--
## Async validation
-->
## 비동기 유효성 검사

<!--
Async validation handles validation that requires external data sources, like checking username availability on a server or validating against an API.
-->
서버에 사용자 이름이 중복되지 않았는지, API를 통해서 검사하는 것과 같이 외부 데이터를 활용하는 유효성 검사는 비동기로 동작합니다.


<!--
### Using validateHttp()
-->
### `validateHttp()` 활용하기

<!--
The `validateHttp()` function performs HTTP-based validation:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, validateHttp} from '@angular/forms/signals';

@Component({
  selector: 'app-username-form',|
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="usernameForm.username" />

        @if (usernameForm.username().pending()) {
          <span class="checking">Checking availability...</span>
        }
      </label>
    </form>
  `,
})
export class UsernameFormComponent {
  usernameModel = signal({username: ''});

  usernameForm = form(this.usernameModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});

    validateHttp(schemaPath.username, {
      request: ({value}) => `/api/check-username?username=${value()}`,
      onSuccess: (response: any) => {
        if (response.taken) {
          return {
            kind: 'usernameTaken',
            message: 'Username is already taken',
          };
        }
        return null;
      },
      onError: (error) => ({
        kind: 'networkError',
        message: 'Could not verify username availability',
      }),
    });
  });
}
```

The `validateHttp()` validation rule:

1. Calls the URL or request returned by the `request` function
2. Maps the successful response to a validation error or `null` using `onSuccess`
3. Handles request failures (network errors, HTTP errors) using `onError`
4. Sets `pending()` to `true` while the request is in progress
5. Only runs after all synchronous validation rules pass
-->
`validateHttp()` 함수는 HTTP를 기반으로 동작하는 유효성 검사입니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, validateHttp} from '@angular/forms/signals';

@Component({
  selector: 'app-username-form',|
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="usernameForm.username" />

        @if (usernameForm.username().pending()) {
          <span class="checking">Checking availability...</span>
        }
      </label>
    </form>
  `,
})
export class UsernameFormComponent {
  usernameModel = signal({username: ''});

  usernameForm = form(this.usernameModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});

    validateHttp(schemaPath.username, {
      request: ({value}) => `/api/check-username?username=${value()}`,
      onSuccess: (response: any) => {
        if (response.taken) {
          return {
            kind: 'usernameTaken',
            message: 'Username is already taken',
          };
        }
        return null;
      },
      onError: (error) => ({
        kind: 'networkError',
        message: 'Could not verify username availability',
      }),
    });
  });
}
```

`validateHttp()` 는 이렇게 동작합니다:

1. `request()` 함수로 외부 요청을 보냅니다.
2. 응답 성공은 `onSuccess`에 `null`을 보내고, 아니면 유효성 검사 에러를 반환합니다.
3. 네트워크 오류나 HTTP 오류 등 요청 자체가 실패한 경우는 `onError`에서 다룹니다.
4. 요청을 보내고 응답을 받기 전까지는 `pending()` 시그널의 값이 `true`가 됩니다.
5. 비동기 유효성 검사는 동기 유효성 검사를 모두 통과했을 때만 실행됩니다.


<!--
### Pending state
-->
### `pending` 상태

<!--
While async validation runs, the field's `pending()` signal returns `true`. Use this to show loading indicators:

```angular-html
@if (form.username().pending()) {
  <span class="spinner">Checking...</span>
}
```

The `valid()` signal returns `false` while validation is pending, even if there are no errors yet. The `invalid()` signal only returns `true` if errors exist.
-->
비동기 유효성 검사가 시작되면 필드의 `pending()` 시그널은 `true`를 반환합니다.
로딩바가 필요하다면 이 시그널을 활용하면 됩니다:

```angular-html
@if (form.username().pending()) {
  <span class="spinner">Checking...</span>
}
```

비동기 유효성 검사가 진행중이면 `valid()` 시그널은 `false`를 반환합니다.
에러가 발생하지 않은 경우에도 그렇습니다.
`invalid()` 시그널은 에러가 발생했을 때만 `true`를 반환합니다.


<!--
## Integration with schema validation libraries
-->
## 스키마 라이브러리와 통합하기

<!--
Signal Forms have built-in support for libraries that conform to [Standard Schema](https://standardschema.dev/) like [Zod](https://zod.dev/) or [Valibot](https://valibot.dev/). The integration is provided via the `validateStandardSchema` function. This allows you to use existing schemas while maintaining Signal Forms' reactive validation benefits.

```ts
import {form, validateStandardSchema} from '@angular/forms/signals';
import * as z from 'zod';

// Define your schema
const userSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// Use with Signal Forms
const userForm = form(signal({email: '', password: ''}), (schemaPath) => {
  validateStandardSchema(schemaPath, userSchema);
});
```
-->
시그널 폼은 기본 유효성 검사 함수도 제공하지만 [Zod](https://zod.dev/)나 [Valibot](https://valibot.dev/)와 같은 [표준 스키마](https://standardschema.dev/) 라이브러리와도 호환됩니다.
이 경우는 `validateStandardSchema()` 함수를 사용하는데, 기존 스키마를 사용하면서 시그널 폼의 반응형 유효성 검사를 확장할 수 있습니다.

```ts
import {form, validateStandardSchema} from '@angular/forms/signals';
import * as z from 'zod';

// 스키마를 정의합니다.
const userSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// 시그널 폼에 적용합니다.
const userForm = form(signal({email: '', password: ''}), (schemaPath) => {
  validateStandardSchema(schemaPath, userSchema);
});
```


<!--
### Dynamic schemas
-->
### 동적 스키마

<!--
You can pass a signal instead of a static schema so the validation schema updates automatically when its dependencies change.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, FormField, validateStandardSchema} from '@angular/forms/signals';
import z from 'zod';

@Component({
  /* ... */
})
export class DynamicSchema {
  model = signal({document: '', type: 'dni'});

  // Schema reacts automatically to type changes
  schema = computed(() =>
    z.object({
      document:
        this.model().type === 'dni'
          ? z.string().length(8, 'DNI must be 8 digits')
          : z.string().min(12, 'Passport must be at least 12 characters'),
    }),
  );

  f = form(this.model, (p) => validateStandardSchema(p, () => this.schema()));
}
```
-->
정적 스키마 대신 시그널을 인자로 전달하면, 유효성 검사의 의존성을 동적으로 변경할 수 있습니다.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, FormField, validateStandardSchema} from '@angular/forms/signals';
import z from 'zod';

@Component({
  /* ... */
})
export class DynamicSchema {
  model = signal({document: '', type: 'dni'});

  // 타입에 따라 스키마가 자동으로 변경됩니다.
  schema = computed(() =>
    z.object({
      document:
        this.model().type === 'dni'
          ? z.string().length(8, 'DNI must be 8 digits')
          : z.string().min(12, 'Passport must be at least 12 characters'),
    }),
  );

  f = form(this.model, (p) => validateStandardSchema(p, () => this.schema()));
}
```


<!--
## Next steps
-->
## 다음 단계

<!--
This guide covered creating and applying validation rules. Related guides explore other aspects of Signal Forms:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/models" title="Form models" />
  <docs-pill href="guide/forms/signals/form-logic" title="Adding form logic" />
  <docs-pill href="guide/forms/signals/schemas" title="Schemas and schema composability" />
</docs-pill-row>
-->
이번 문서는 유효성 검사 규칙을 만들고 적용하는 방법을 안내했습니다.
시그널 폼을 더 알아보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/models" title="폼 모델" />
  <docs-pill href="guide/forms/signals/form-logic" title="폼 로직 추가하기" />
  <docs-pill href="guide/forms/signals/schemas" title="스키마와 스키마 조합하기" />
</docs-pill-row>
