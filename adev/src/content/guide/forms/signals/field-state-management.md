<!--
# Field state management
-->

# 필드 상태 관리

<!--
Signal Forms' field state allows you to react to user interactions by providing reactive signals for validation status (such as `valid`, `invalid`, `errors`), interaction tracking (such as `touched`, `dirty`), and availability (such as `disabled`, `hidden`).
-->

시그널 폼의 필드 상태를 확인하면 사용자가 입력한 내용이 맞게 입력되었는지(`valid`, `invalid`, `errors`), 사용자가 상호작용을 했는지(`touched`, `dirty`), 필드를 사용할 수 있는지(`disabled`, `hidden`) 확인할 수 있습니다.

<!--
## Understanding field state
-->

## 필드 상태 이해하기

<!--
When you create a form with the [`form()`](api/forms/signals/form) function, it returns a **field tree** - an object structure that mirrors your form model. Each field in the tree is accessible via dot notation (like [`form.email`](api/forms/signals/form#email)).
-->

[`form()`](api/forms/signals/form) 함수로 폼을 생성하면 폼 모델을 객체 형태로 반영하는 **필드 트리(field tree)** 를 반환합니다.
그러면 이 트리의 개별 필드를 [`form.email`](api/forms/signals/form#email)와 같이 객체 참조 방식으로 접근할 수 있습니다.

<!--
### Accessing field state
-->

### 필드 상태에 접근하기

<!--
When you call any field in the field tree as a function (like [`form.email()`](api/forms/signals/form#email)), it returns a `FieldState` object containing reactive signals that track the field's validation, interaction, and availability state. For example, the `invalid()` signal tells you whether the field has validation errors:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <input type="email" [formField]="registrationForm.email" />

    @if (registrationForm.email().invalid()) {
      <p class="error">Email has validation errors:</p>
      <ul>
        @for (error of registrationForm.email().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

In this example, the template checks `registrationForm.email().invalid()` to determine whether to display an error message.
-->

필드 트리에 있는 개별 필드는 모두 [`form.email()`](api/forms/signals/form#email) 같은 방식으로 실행할 수 있는데, 이렇게 실행하면 필드의 유효성, 사용자의 접근 기록, 사용할 수 있는 상태 등을 반응형 시그널로 확인할 수 있는 `FieldState` 객체를 반환합니다.
예를 들면, `invalid()` 시그널은 필드 유효성 검사 상태를 표현합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <input type="email" [formField]="registrationForm.email" />

    @if (registrationForm.email().invalid()) {
      <p class="error">Email has validation errors:</p>
      <ul>
        @for (error of registrationForm.email().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

이 예제를 보면, 템플릿에서 에러 메시지를 표시하기 위해 `registrationForm.email().invalid()`를 확인하는 것을 확인할 수 있습니다.

<!--
### Field state signals
-->

### 필드 상태 시그널

<!--
The most commonly used signal is `value()`, a `WritableSignal` that provides access to the field's current value:

```ts
const emailValue = registrationForm.email().value();
console.log(emailValue); // Current email string
```

Beyond `value()`, field state includes signals for validation, interaction tracking, and availability control:

| Category                                | Signal       | Description                                                                       |
| --------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| **[Validation](#validation-state)**     | `valid()`    | Field passes all validation rules and has no pending validators                   |
|                                         | `invalid()`  | Field has validation errors                                                       |
|                                         | `errors()`   | Array of validation error objects                                                 |
|                                         | `pending()`  | Async validation in progress                                                      |
| **[Interaction](#interaction-state)**   | `touched()`  | User has focused and blurred the field (if interactive)                           |
|                                         | `dirty()`    | User has modified the field (if interactive), even if value matches initial state |
| **[Availability](#availability-state)** | `disabled()` | Field is disabled and doesn't affect parent form state                            |
|                                         | `hidden()`   | Indicates field should be hidden; visibility in template is controlled with `@if` |
|                                         | `readonly()` | Field is readonly and doesn't affect parent form state                            |

These signals enable you to build responsive form user experiences that react to user behavior. The sections below explore each category in detail.
-->

가장 많이 사용하는 시그널은 필드의 현재값을 반환하는 `WwritableSignal` 타입의 `value()` 입니다:

```ts
const emailValue = registrationForm.email().value();
console.log(emailValue); // 현재 email 문자열
```

`value()`는 필드의 값을 전달하는 것 외에 유효성 검사, 사용자의 상호작용 상태, 가용성 상태도 확인할 수 있습니다:

| 분류                                      | 시그널       | 의미                                                                                            |
| ----------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------- | --- |
| **[유효성 검사](#validation-state)**      | `valid()`    | 진행중인 검사 없이 모든 필드가 유효성 검사를 통과했습니다                                       | .   |
|                                           | `invalid()`  | 유효성 검사 결과 에러가 발생했습니다.                                                           |
|                                           | `errors()`   | 유효성 검사를 통과하지 못한 에러 목록                                                           |
|                                           | `pending()`  | 비동기 유효성 검사가 완료되었는지                                                               |
| **[사용자 상호작용](#interaction-state)** | `touched()`  | 사용자가 필드에 접근했다가 다른 곳으로 이동했습니다.                                            |
|                                           | `dirty()`    | 사용자가 필드 값을 수정했습니다.                                                                |
| **[비활성화 상태](#availability-state)**  | `disabled()` | 필드가 비활성화되어, 전체 폼에 영향을 주지 않습니다.                                            |
|                                           | `hidden()`   | 필드가 숨겨져 있어야 합니다. 템플릿에서 `@if`를 사용해서 폼 컨트롤을 표시하지 않을 수 있습니다. |
|                                           | `readonly()` | 필드가 읽기전용이며, 전체 폼에 영향을 줒 ㅣ않습니다.                                            |

이 시그널들을 활용하면 사용자의 상호작용에 반응하는 방식으로 반응형 폼을 구성할 수 있습니다.
개별 항목을 자세하게 알아봅시다.

<a id="validation-state"></a>

<!--
## Validation state
-->

## 유효성 검사 상태

<!--
Validation state signals tell you whether a field is valid and what errors it contains.

NOTE: This guide focuses on **using** validation state in your templates and logic (such as reading `valid()`, `invalid()`, `errors()` to display feedback). For information on **defining** validation rules and creating custom validators, see the [Validation guide](guide/forms/signals/validation).
-->

유효성 검사 상태를 표현하는 시그널은 개별 필드가 유효한지, 에러가 발생했는지 의미합니다.

참고: 이 문서는 템플릿과 컴포넌트 로직에서 `valid()`, `invalid()`, `errors()`와 같은 유효성 검사 상태로 활용하는 방법을 안내합니다.
유효성 검사 규칙을 **정의하고** 커스텀 유효성 검사기를 활용하는 방법은 [유효성 검사](guide/forms/signals/validation) 문서를 참고하세요.

<!--
### Checking validity
-->

### 검사 결과 확인하기

<!--
Use `valid()` and `invalid()` to check validation status:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().invalid()) {
      <p class="error">Email is invalid</p>
    }
    @if (loginForm.email().valid()) {
      <p class="success">Email looks good</p>
    }
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

| Signal      | Returns `true` when                                             |
| ----------- | --------------------------------------------------------------- |
| `valid()`   | Field passes all validation rules and has no pending validators |
| `invalid()` | Field has validation errors                                     |

When checking validity in code, use `invalid()` instead of `!valid()` if you want to distinguish between "has errors" and "validation pending." The reason for this is that both `valid()` and `invalid()` can be `false` simultaneously when async validation is pending because the field isn't valid yet since validation not complete and is also isn't invalid since no errors have been found yet.
-->

`valid()`와 `vinvalid()`를 확인하면 유효성 검사 결과를 확인할 수 있습니다:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().invalid()) {
      <p class="error">Email is invalid</p>
    }
    @if (loginForm.email().valid()) {
      <p class="success">Email looks good</p>
    }
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

| 시그널      | `true`를 반환하는 경우                                   |
| ----------- | -------------------------------------------------------- |
| `valid()`   | 진행중인 검사 없이 필드가 유효성 검사 규칙을 통과한 경우 |
| `invalid()` | 유효성 검사 에러가 발생한 경우                           |

컴포넌트 코드에서 유효성 검사를 확인할 때 "에러 있음" 과 "유효성 검사 진행중"을 구분하려면 `!valid()` 대신 `invalid()`를 활용하세요.
비동기 유효성 검사가 아직 완료되지 않아 필드가 아직 유효하지 않은 상태라면 `valid()`와 `invalid()`가 모두 `false` 이기 때문입니다.
이 상태는 오류가 아직 확인되지 않은 상태일 수 있습니다.

<!--
### Reading validation errors
-->

### 유효성 검사 에러 확인하기

<!--
Access the array of validation errors with `errors()`. Each error object contains:

| Property    | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `kind`      | The validation rule that failed (such as "required" or "email") |
| `message`   | Optional human-readable error message                           |
| `fieldTree` | Reference to the `FieldTree` where the error occurred           |

NOTE: The `message` property is optional. Validators can provide custom error messages, but if not specified, you may need to map error `kind` values to your own messages.

Here's an example of how to display errors in your template:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().errors().length > 0) {
      <div class="errors">
        @for (error of loginForm.email().errors(); track error) {
          <p>{{ error.message }}</p>
        }
      </div>
    }
  `
})
```

This approach loops through all errors for a field, displaying each error message to the user.
-->

`errors()`를 확인하면 유효성 검사에서 발생한 에러 목록을 확인할 수 있습니다.
개별 에러 객체에는 이런 필드가 존재합니다:

| 프로퍼티    | 설명                                              |
| ----------- | ------------------------------------------------- |
| `kind`      | "required"나 "email" 같이 실패한 유효성 검사 이름 |
| `message`   | (생략 가능) 사람이 읽을 에러 메시지               |
| `fieldTree` | 에러가 발생한 `FieldTree` 참조                    |

참고: `message` 프로퍼티는 생략할 수 있습니다.
유효성 검사 함수도 커스텀 에러 메시지를 표시할 수 있지만, 이 프로퍼티를 지정하지 않은 경우라면 `kind` 값으로 에러 메시지를 매칭시켜야 합니다.

템플릿에서 오류를 표시하는 예제 코드를 확인해 봅시다:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().errors().length > 0) {
      <div class="errors">
        @for (error of loginForm.email().errors(); track error) {
          <p>{{ error.message }}</p>
        }
      </div>
    }
  `
})
```

이 코드는 필드에 발생한 모든 에러 메시지를 표시합니다.

<!--
### Pending validation
-->

### 유효성 검사 진행 상태

<!--
The `pending()` signal indicates async validation is in progress:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="signupForm.email" />

    @if (signupForm.email().pending()) {
      <p>Checking if email is available...</p>
    }

    @if (signupForm.email().invalid() && !signupForm.email().pending()) {
      <p>Email is already taken</p>
    }
  `
})
```

This signal enables you to show loading states while async validation executes.
-->

`pending()` 시그널을 확인하면 비동기 유효성 검사가 진행중인지 확인할 수 있습니다:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="signupForm.email" />

    @if (signupForm.email().pending()) {
      <p>Checking if email is available...</p>
    }

    @if (signupForm.email().invalid() && !signupForm.email().pending()) {
      <p>Email is already taken</p>
    }
  `
})
```

이 시그널은 비동기 유효성 검사가 실행중일 때 로딩 상태를 표시하는 용도로 활용할 수 있습니다.

<a id="interaction-state"></a>

<!--
## Interaction state
-->

## 사용자 상호작용 상태

<!--
Interaction state tracks whether users have interacted with fields, enabling patterns like "show errors only after the user has touched a field."
-->

사용자가 필드에 접근한 이후에만 에러를 표시하려면, 사용자가 필드에 접근했었는지 확인해야 합니다.

<!--
### Touched state
-->

### `touched` 상태

<!--
The `touched()` signal tracks whether a user has focused and then blurred a field. It becomes `true` when a user focuses and then blurs a field through user interaction (not programmatically). Hidden, disabled, and readonly fields are non-interactive and don't become touched from user interactions.
-->

`touched()` 시그널은 사용자가 필드에 접근했었는지, 접근했다가 다른 곳으로 옮겼는지 표현합니다.
사용자가 필드에 접근했다가 다른 곳으로 옮겨가면 `true` 상태가 됩니다.
필드가 숨겨져 있거나, 비활성화되었거나, 읽기 전용인 필드는 사용자가 상호작용할 수 없기 때문에 `touched` 상태가 되지 않습니다.

<!--
### Dirty state
-->

### `dirty` 상태

<!--
Forms often need to detect whether data has actually changed - for example, to warn users about unsaved changes or to enable a save button only when necessary. The `dirty()` signal tracks whether the user has modified the field.

The `dirty()` signal becomes `true` when the user modifies an interactive field's value, and remains `true` even if the value is changed back to match the initial value:

```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="profileForm.name" />
      <input [formField]="profileForm.bio" />

      @if (profileForm().dirty()) {
        <p class="warning">You have unsaved changes</p>
      }
    </form>
  `,
})
export class Profile {
  profileModel = signal({name: 'Alice', bio: 'Developer'});
  profileForm = form(this.profileModel);
}
```

Use `dirty()` for "unsaved changes" warnings or to enable save buttons only when data has changed.
-->

폼은 데이터가 실제로 변경되었는지 확인해야 하는 경우가 많습니다.
저장하지 않은 변경사항이 있다고 사용자에게 알리거나, 필요할 때만 저장 버튼을 활성화하는 식입니다.

`dirty()` 시그널은 사용자가 필드의 값을 변경했을 때 `true` 를 전달하며, 이후에 다시 변경되어 초기값과 같아져도 `true` 상태로 남습니다:

```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="profileForm.name" />
      <input [formField]="profileForm.bio" />

      @if (profileForm().dirty()) {
        <p class="warning">You have unsaved changes</p>
      }
    </form>
  `,
})
export class Profile {
  profileModel = signal({name: 'Alice', bio: 'Developer'});
  profileForm = form(this.profileModel);
}
```

저장하지 않은 변경사항을 사용자에게 알리거나 데이터가 실제로 변경되었을 때만 저장 버튼을 활성화 하려면 `dirty()` 시그널을 활용하세요.

<!--
### Touched vs dirty
-->

### `touched` vs `dirty`

<!--
These signals track different user interactions:

| Signal      | When it becomes true                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `touched()` | User has focused and blurred an interactive field (even if they didn't change anything)                                         |
| `dirty()`   | User has modified an interactive field (even if they never blurred it, and even if the current value matches the initial value) |

A field can be in different combinations:

| State                  | Scenario                                                  |
| ---------------------- | --------------------------------------------------------- |
| Touched but not dirty  | User focused and blurred the field but made no changes    |
| Both touched and dirty | User focused the field, changed the value, and blurred it |

NOTE: Hidden, disabled, and readonly fields are non-interactive - they don't become touched or dirty from user interactions.
-->

사용자의 상호작용을 추적하는 시그널이 있습니다:

| 시그널      | true가 되는 경우                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| `touched()` | 사용자가 필드에 접근했다가 다른 곳으로 이동했을 때. 아무것도 변경하지 않아도 상관없습니다.               |
| `dirty()`   | 사용자가 필드 값을 변경했을 때. 포커스를 다른 곳으로 옮기지 않아도, 초기값으로 다시 바꿔도 남아있습니다. |

시그널은 여러가지로 조합할 수 있습니다:

| 상태                               | 시나리오                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `touched` 활성화, `dirty` 비활성화 | 사용자가 필드에 접근했지만 아무것도 수정하지 않았습니다.                 |
| `touched` 활성화, `dirty` 활성화   | 사용자가 필드에 접근했고 값을 바꾼 후에 포커스를 다른 곳으로 옮겼습니다. |

참고: 화면에 표시되지 않거나, 비활성화되었거나, 읽기 전용인 필드는 사용자와 상호작용할 수 없기 때문에, `touched`, `dirty` 상태가 되지 않습니다.

<a id="availability-state"></a>

<!--
## Availability state
-->

## 가용성 상태

<!--
Availability state signals control whether fields are interactive, editable, or visible. Disabled, hidden, and readonly fields are non-interactive. They don't affect whether their parent form is valid, touched, or dirty.
-->

가용성 상태 시그널은 사용자가 필드와 상호작용 할 수 있는지, 값을 수정할 수 있는지, 화면에 표시되는지 표현합니다.
비활성화 되었거나, 숨겨져 있거나, 읽기 전용인 필드는 사용자와 상호작용 할 수 없습니다.
그래서 부모 폼의 유효성 상태, `touched`, `dirty` 상태에 영향을 주지 않습니다.

<!--
### Disabled fields
-->

### 비활성화 된 필드

<!--
The `disabled()` signal indicates whether a field accepts user input. Disabled fields appear in the UI but users cannot interact with them.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  // TIP: The `[formField]` directive automatically binds the `disabled` attribute based
  // on the field's `disabled()` state, so you don't need to manually add `[disabled]="field().disabled()"`
  template: `
    <input [formField]="orderForm.couponCode" />

    @if (orderForm.couponCode().disabled()) {
      <p class="info">Coupon code is only available for orders over $50</p>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  });
}
```

In this example, we use `valueOf(schemaPath.total)` to check the value of the `total` field to determine whether `couponCode` should be disabled.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

When defining rules like `disabled()`, `hidden()`, or `readonly()`, the `when` function receives a `FieldContext` object that is typically destructured (such as `({valueOf})`). Two methods commonly used in validation rules are:

- `valueOf(schemaPath.otherField)` - Read the value of another field in the form
- `value()` - A signal containing the value of the field the rule is applied to

Disabled fields don't contribute to the parent form's validation state. Even if a disabled field would be invalid, the parent form can still be valid. The `disabled()` state affects interactivity and validation, but does not change the field's value.
-->

`disabled()` 시그널은 필드가 사용자의 입력을 받을 수 있는 상태인지 표현합니다.
비활성화 된 필드는 화면에 표시되지만 조작할 수 없습니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  // 팁: `[formField]` 디렉티브가 `disabled()` 상태에 따라 엘리먼트의 `disabled` 어트리뷰트를 자동으로 바인딩합니다.
  // `[disabled]="field().disabled()"` 라고 지정할 필요가 없습니다.
  template: `
    <input [formField]="orderForm.couponCode" />

    @if (orderForm.couponCode().disabled()) {
      <p class="info">Coupon code is only available for orders over $50</p>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  });
}
```

위 예제 코드는 `valueOf(schemaPath.totla)`을 사용해서 `total` 필드 값에 따라 `couponCode`가 비활성화될 지 결정합니다.

참고: `schemaPath`와 같이 스키마 콜백 함수의 인자는 폼 전체 필드에 접근할 수 있는 `SchemaPathTree` 객체입니다.
변수 이름은 원하는 대로 지정할 수 있습니다.

`disabled()`, `hidden()`, `readonly()`와 같은 규칙을 정의할 때 `when` 함수는 일반적으로 구조 분해된 `FieldContext` 객체를 인자로 받습니다.
이 객체에서 자주 사용되는 메서드가 있습니다:

- `valueOf(schemaPath.otherField)` - 폼 안에 있는 다른 필드의 값을 읽습니다.
- `value()` - 필드의 값을 시그널로 전달합니다.

비활성화 된 필드는 부모 폼의 유효성 검사 상태에 영향을 주지 않습니다.
비활성화 된 필드에서 유효성 검사가 실패하더라도, 부모 폼은 유효할 수 있습니다.
`disabled()` 상태는 사용자의 상호작용 이력, 유효성 검사 결과에는 영향을 주지만, 필드 값에는 영향을 주지 않습니다.

<!--
### Hidden fields
-->

### 숨겨진 필드

<!--
The `hidden()` signal indicates whether a field is conditionally hidden. Use `hidden()` with `@if` to show or hide fields based on conditions:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-profile',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="profileForm.isPublic" />
      Make profile public
    </label>

    @if (!profileForm.publicUrl().hidden()) {
      <label>
        Public URL
        <input [formField]="profileForm.publicUrl" />
      </label>
    }
  `,
})
export class Profile {
  profileModel = signal({
    isPublic: false,
    publicUrl: '',
  });

  profileForm = form(this.profileModel, (schemaPath) => {
    hidden(schemaPath.publicUrl, {when: ({valueOf}) => !valueOf(schemaPath.isPublic)});
  });
}
```

Hidden fields don't participate in validation. If a required field is hidden, it won't prevent form submission. The `hidden()` state affects availability and validation, but does not change the field's value.
-->

`hidden()` 시그널은 필드가 표시되는지를 표현합니다.
`hidden()` 시그널의 상태에 따라 `@if`로 필드를 화면에 표시하거나 감출 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-profile',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="profileForm.isPublic" />
      Make profile public
    </label>

    @if (!profileForm.publicUrl().hidden()) {
      <label>
        Public URL
        <input [formField]="profileForm.publicUrl" />
      </label>
    }
  `,
})
export class Profile {
  profileModel = signal({
    isPublic: false,
    publicUrl: '',
  });

  profileForm = form(this.profileModel, (schemaPath) => {
    hidden(schemaPath.publicUrl, {when: ({valueOf}) => !valueOf(schemaPath.isPublic)});
  });
}
```

숨겨진 필드는 전체 폼 유효성 검사에 영향을 주지 않습니다.
필수 항목이 감춰져 있어도 폼 제출이 막히지 않습니다.
`hidden()` 상태는 필드의 가용성과 유효성 검사에 영향을 주지만, 필드의 값에는 영향을 주지 않습니다.

<!--
### Readonly fields
-->

### 읽기 전용 필드

<!--
The `readonly()` signal indicates whether a field is readonly. Readonly fields display their value but users cannot edit them:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-account',
  imports: [FormField],
  template: `
    <label>
      Username (cannot be changed)
      <input [formField]="accountForm.username" />
    </label>

    <label>
      Email
      <input [formField]="accountForm.email" />
    </label>
  `,
})
export class Account {
  accountModel = signal({
    username: 'johndoe',
    email: 'john@example.com',
  });

  accountForm = form(this.accountModel, (schemaPath) => {
    readonly(schemaPath.username);
  });
}
```

NOTE: The `[formField]` directive automatically binds the `readonly` attribute based on the field's `readonly()` state, so you don't need to manually add `[readonly]="field().readonly()"`.

Like disabled and hidden fields, readonly fields are non-interactive and don't affect parent form state. The `readonly()` state affects editability and validation, but does not change the field's value.
-->

`readonly()` 시그널은 필드가 읽기 전용인지 표현합니다.
읽기 전용 필드는 값을 화면에 표시하지만 사용자가 수정할 수 없습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-account',
  imports: [FormField],
  template: `
    <label>
      Username (cannot be changed)
      <input [formField]="accountForm.username" />
    </label>

    <label>
      Email
      <input [formField]="accountForm.email" />
    </label>
  `,
})
export class Account {
  accountModel = signal({
    username: 'johndoe',
    email: 'john@example.com',
  });

  accountForm = form(this.accountModel, (schemaPath) => {
    readonly(schemaPath.username);
  });
}
```

참고: `[formField]` 디렉티브는 `readonly()` 상태에 따라 필드의 `readonly` 어트리뷰트를 자동으로 바인딩합니다.
`[readonly]="field().readonly()"`와 같은 로직을 작성할 필요가 없습니다.

비활성화 된 필드나 감춰진 필드와 마찬가지로, 읽기 전용 필드는 사용자와 상호작용 할 수 없으며, 부모 폼 상태에도 영향을 주지 않습니다.
`readonly()` 상태는 유효성 검사에 영향을 주지만 필드의 값에는 영향을 주지 않습니다.

<!--
### When to use each
-->

### 언제 사용해야 할까요

| 시그널       | 의미                                                          | 사용자가 볼 수 있는지   | 사용자가 상호작용 할 수 있는지 | 유효성 검사에 영향을 주는지 |
| ------------ | ------------------------------------------------------------- | ----------------------- | ------------------------------ | --------------------------- |
| `disabled()` | 필드를 사용할 수 없습니다 (다른 필드 값도 활용할 수 있습니다) | O                       | X                              | X                           |
| `hidden()`   | 필드가 현재 컨텍스트에 영향을 주지 않습니다                   | X (`@if`를 사용한 경우) | X                              | X                           |
| `readonly()` | 필드가 화면에는 표시되지만 수정할 수 없습니다                 | O                       | X                              | X                           |

<!--
## Form-level state
-->

## 폼 계층 상태

<!--
The root form is also a field in the field tree. When you call it as a function, it also returns a `FieldState` object that aggregates the state of all child fields.
-->

최상위 폼도 필드 트리의 필드로 간주됩니다.
그래서 최상위 폼을 함수처럼 실행하면 전체 자식 폼 상태에 접근할 수 있는 `FieldState` 객체를 반환합니다.

<!--
### Accessing form state
-->

### 폼 상태에 접근하기

<!--
```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="loginForm.email" />
      <input [formField]="loginForm.password" />

      <button [disabled]="!loginForm().valid()">Sign In</button>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

In this example, the form is valid only when all child fields are valid. This allows you to enable/disable submit buttons based on overall form validity.
-->

```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="loginForm.email" />
      <input [formField]="loginForm.password" />

      <button [disabled]="!loginForm().valid()">Sign In</button>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

이 예시에서는, 전체 자식 필드가 유효성 검사를 통과해야 전체 폼이 유효합니다.
이 방식을 활용하면 전체 폼의 유효성 검사에 따라 폼 제출 버튼의 활성화/비활성화 상태를 변경할 수 있습니다.

<!--
### Form-level signals
-->

### 폼 계층 시그널

<!--
Because the root form is a field, it has the same signals (such as `valid()`, `invalid()`, `touched()`, `dirty()`, etc.).

| Signal      | Form-level behavior                                            |
| ----------- | -------------------------------------------------------------- |
| `valid()`   | All interactive fields are valid and no validators are pending |
| `invalid()` | At least one interactive field has validation errors           |
| `pending()` | At least one interactive field has pending async validation    |
| `touched()` | User has touched at least one interactive field                |
| `dirty()`   | User has modified at least one interactive field               |
-->

최상위 폼도 필드로 간주하기 때문에 `valid()`, `invalid()`, `touched()`, `dirty()` 과 같은 시그널이 동일하게 존재합니다.

| 시그널      | 폼 계층에서는                                                             |
| ----------- | ------------------------------------------------------------------------- |
| `valid()`   | 상호작용할 수 있는 필드가 모두 유효하고, 진행중인 유효성 검사도 없습니다. |
| `invalid()` | 1개 이상 필드에 유효성 검사 오류가 발생했습니다.                          |
| `pending()` | 1개 이상 필드에 유효성 검사가 진행중입니다.                               |
| `touched()` | 사용자가 어떠한 필드라도 접근했습니다.                                    |
| `dirty()`   | 사용자가 어떠한 필드라도 값을 변경했습니다.                               |

<!--
### When to use form-level vs field-level
-->

### 폼 계층 vs 필드 계층

<!--
**Use form-level state for:**

- Submit button enabled/disabled state
- "Save" button state
- Overall form validity checks
- Unsaved changes warnings

**Use field-level state for:**

- Individual field error messages
- Field-specific styling
- Per-field validation feedback
- Conditional field availability
-->

**폼 계층 상태는 이런 경우 사용합니다:**

- 홈 제출 버튼을 활성화/비활성화 할 때
- "저장" 버튼의 상태를 조작할 때
- 전체 폼의 유효성을 검사할 때
- 저장하지 않은 변동사항이 있다고 알릴 때

**필드 계층 상태는 이런 경우 사용합니다:**

- 개별 필드의 에러 메시지를 표시할 때
- 개별 필드의 스타일을 지정할 때
- 개별 필드의 유효성 결과를 활용할 때
- 필드의 구조를 조건에 따라 변경할 때

<!--
## State propagation
-->

## 상태 전파

<!--
Field state propagates from child fields up through parent field groups to the root form.
-->

필드 상태는 자식 필드에서 부모 필드로 전파되며, 결국 최상위 폼 단위까지 전파됩니다.

<!--
### How child state affects parent forms
-->

### 자식 필드의 상태가 부모 필드에 어떻게 영향을 미칠까요

<!--
When a child field becomes invalid, its parent field group becomes invalid, and so does the root form. When a child becomes touched or dirty, the parent field group and root form reflect that change. This aggregation allows you to check validity at any level - field or entire form.

```ts
const userModel = signal({
  profile: {
    firstName: '',
    lastName: '',
  },
  address: {
    street: '',
    city: '',
  },
});

const userForm = form(userModel);

// If firstName is invalid, profile is invalid
userForm.profile.firstName().invalid() === true;
// → userForm.profile().invalid() === true
// → userForm().invalid() === true
```
-->

자식 필드가 유효하지 않으면 그 부모 필드 그룹이 유효하지 않게 되며, 최상위 폼까지 유효하지 않은 상태가 됩니다.
그리고 자식 필드가 `touched` 상태가 되거나 `dirty` 상태가 되면 부모 필드 그룹에도 반영됩니다.
이런 전파 기능을 통해 개별 폼이나 전체 폼에서 유효성을 확인할 수 있습니다.

```ts
const userModel = signal({
  profile: {
    firstName: '',
    lastName: '',
  },
  address: {
    street: '',
    city: '',
  },
});

const userForm = form(userModel);

// firstName이 유효하지 않으면 profile도 유효하지 않습니다.
userForm.profile.firstName().invalid() === true;
// → userForm.profile().invalid() === true
// → userForm().invalid() === true
```

<!--
### Hidden, disabled, and readonly fields
-->

### `hidden`, `disabled`, `readonly`

<!--
Hidden, disabled, and readonly fields are non-interactive and don't affect parent form state:

```ts
const orderModel = signal({
  customerName: '',
  requiresShipping: false,
  shippingAddress: '',
});

const orderForm = form(orderModel, (schemaPath) => {
  hidden(schemaPath.shippingAddress, {when: ({valueOf}) => !valueOf(schemaPath.requiresShipping)});
});
```

In this example, when `shippingAddress` is hidden, it doesn't affect form validity. As a result, even if `shippingAddress` is empty and required, the form can be valid.

This behavior prevents hidden, disabled, or readonly fields from blocking form submission or affecting validation, touched, and dirty state.
-->

숨겨진 필드, 비활성화 된 필드, 읽기전용 필드는 사용자와 상호작용할 수 없기 때문에 부모 폼 상태에 영향을 주지 않습니다:

```ts
const orderModel = signal({
  customerName: '',
  requiresShipping: false,
  shippingAddress: '',
});

const orderForm = form(orderModel, (schemaPath) => {
  hidden(schemaPath.shippingAddress, {when: ({valueOf}) => !valueOf(schemaPath.requiresShipping)});
});
```

이 예제에서 `shippingAddress`가 화면에서 숨겨지면 폼 유효성 상태에 영향을 주지 않습니다.
따라서 `shippingAddress`가 필수 입력 항목이지만 빈 값이어도 폼은 유효한 상태가 됩니다.

숨겨진 필드, 비활성화 된 필드, 읽기 전용 필드는 유효성 검사, 사용자가 접근했거나 값을 수정했는지 여부에 따라 폼 제출을 막는 경우에 영향을 주지 않습니다.

<!--
## Using state in templates
-->

## 템플릿에서 상태 활용하기

<!--
Field state signals integrate seamlessly with Angular templates, enabling reactive form user experiences without manual event handling.
-->

필드 상태 시그널은 Angular 템플릿과 경계없이 통합되어, 별도 이벤트 처리 없이도 반응평 폼 경험을 제공합니다.

<!--
### Conditional error display
-->

### 조건부 에러 표시

<!--
Show errors only after a user has interacted with a field:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <label>
      Email
      <input type="email" [formField]="signupForm.email" />
    </label>

    @if (signupForm.email().touched() && signupForm.email().invalid()) {
      <p class="error">{{ signupForm.email().errors()[0].message }}</p>
    }
  `,
})
export class Signup {
  signupModel = signal({email: '', password: ''});

  signupForm = form(this.signupModel, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

This pattern prevents showing errors before users have had a chance to interact with the field. Errors appear only after the user has focused and then left the field.
-->

에러는 사용자가 상호작용한 후에만 표시하는 것이 좋습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <label>
      Email
      <input type="email" [formField]="signupForm.email" />
    </label>

    @if (signupForm.email().touched() && signupForm.email().invalid()) {
      <p class="error">{{ signupForm.email().errors()[0].message }}</p>
    }
  `,
})
export class Signup {
  signupModel = signal({email: '', password: ''});

  signupForm = form(this.signupModel, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

이 방식을 활용하면 사용자가 아직 필드를 조작하기 전에 에러가 표시되는 것을 방지할 수 있습니다.
에러 메시지는 사용자가 필드에 접근한 이후에만 표시됩니다.

<!--
### Conditional field availability
-->

### 조건부 필드 활성화

<!--
Use the `hidden()` signal with `@if` to show or hide fields conditionally:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="orderForm.requiresShipping" />
      Requires shipping
    </label>

    @if (!orderForm.shippingAddress().hidden()) {
      <label>
        Shipping Address
        <input [formField]="orderForm.shippingAddress" />
      </label>
    }
  `,
})
export class Order {
  orderModel = signal({
    requiresShipping: false,
    shippingAddress: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    hidden(schemaPath.shippingAddress, {
      when: ({valueOf}) => !valueOf(schemaPath.requiresShipping),
    });
  });
}
```

Hidden fields don't participate in validation, allowing the form to be submitted even if the hidden field would otherwise be invalid.
-->

`hidden()` 시그널과 `@if` 시그널을 함께 활용하면 조건에 따라 필드를 화면에 표시하거나 숨길 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="orderForm.requiresShipping" />
      Requires shipping
    </label>

    @if (!orderForm.shippingAddress().hidden()) {
      <label>
        Shipping Address
        <input [formField]="orderForm.shippingAddress" />
      </label>
    }
  `,
})
export class Order {
  orderModel = signal({
    requiresShipping: false,
    shippingAddress: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    hidden(schemaPath.shippingAddress, {
      when: ({valueOf}) => !valueOf(schemaPath.requiresShipping),
    });
  });
}
```

화면에서 감춰진 필드는 유효성 검사에 영향을 주지 않기 때문에, 이 필드가 유효하지 않은 경우에도 폼 제출은 영향을 받지 않습니다.

<!--
### Tracking values for array fields
-->

### 배열 필드의 값 추적하기

<!--
In signal forms, a `@for` block over a set of fields should be tracked by field identity.

```angular-ts
@Component({
  imports: [FormField],
  template: `
    @for (field of form.emails; track field) {
      <input [formField]="field" />
    }
  `,
})
export class App {
  formModel = signal({emails: ['john.doe@mail.com', 'max.musterman@mail.com']});
  form = form(this.formModel);
}
```

The forms system is already tracking the model values within the array and maintaining a stable identity of the fields it creates automatically.

When an item changes, it may represent a new logical entity even if some of its properties look the same. Tracking by identity ensures the framework treats it as a distinct item rather than reusing existing UI elements. This prevents stateful elements, like form inputs, from being incorrectly shared and keeps bindings aligned with the correct part of the model.
-->

시그널 폼에서 `@for` 블럭은 필드 참조를 기준으로 항목을 추적합니다.

```angular-ts
@Component({
  imports: [FormField],
  template: `
    @for (field of form.emails; track field) {
      <input [formField]="field" />
    }
  `,
})
export class App {
  formModel = signal({emails: ['john.doe@mail.com', 'max.musterman@mail.com']});
  form = form(this.formModel);
}
```

폼 시스템은 배열 안에서 필드를 참조하며 자동으로 모델 값을 추적합니다.
필드를 참조하는 방식은 Angular 프레임워크가 기존 UI 엘리먼트를 재사용하는 방식보다 유리합니다.
이를 통해 폼 상태가 작못 저장되는 것을 방지하고 바인딩도 순서대로 제대로 연결합니다.

<!--
## Using field state in component logic
-->

## 컴포넌트 로직에서 필드 상태 활용하기

<!--
Field state signals work with Angular's reactive primitives like `computed()` and `effect()` for advanced form logic.
-->

필드 상태 시그널은 Angular가 제공하는 `computed()`, `effect()`와 반응형으로 연동할 수 있습니다.

<!--
### Validation checks before submission
-->

### 폼 제출 전 유효성 검사

<!--
Check form validity in component methods:

```ts
export class Registration {
  registrationModel = signal({
    username: '',
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel);

  async onSubmit() {
    // Wait for any pending async validation
    if (this.registrationForm().pending()) {
      console.log('Waiting for validation...');
      return;
    }

    // Guard against invalid submissions
    if (this.registrationForm().invalid()) {
      console.error('Form is invalid');
      return;
    }

    const data = this.registrationModel();
    await this.api.register(data);
  }
}
```

This ensures only valid, fully-validated data reaches your API.
-->

컴포넌트 메서드에서 폼 유효성을 검사해 봅시다:

```ts
export class Registration {
  registrationModel = signal({
    username: '',
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel);

  async onSubmit() {
    // 비동기 유효성 검사가 완료될 때까지 기다립니다.
    if (this.registrationForm().pending()) {
      console.log('Waiting for validation...');
      return;
    }

    // 유효하지 않은 상태에서 폼 제출을 방지합니다.
    if (this.registrationForm().invalid()) {
      console.error('Form is invalid');
      return;
    }

    const data = this.registrationModel();
    await this.api.register(data);
  }
}
```

이제 폼은 유효할 때만 제출할 수 있습니다.

<!--
### Derived state with computed
-->

### `computed()` 파생 상태

<!--
Create computed signals based on field state to automatically update when the underlying field state changes:

```ts
export class Password {
  passwordModel = signal({password: '', confirmPassword: ''});
  passwordForm = form(this.passwordModel);

  // Compute password strength indicator
  passwordStrength = computed(() => {
    const password = this.passwordForm.password().value();
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  });

  // Check if all required fields are filled
  allFieldsFilled = computed(() => {
    return (
      this.passwordForm.password().value().length > 0 &&
      this.passwordForm.confirmPassword().value().length > 0
    );
  });
}
```
-->

필드 상태와 연동되는 시그널을 만들면, 필드 상태에 따라 자동으로 실행되는 로직을 만들 수 있습니다:

```ts
export class Password {
  passwordModel = signal({password: '', confirmPassword: ''});
  passwordForm = form(this.passwordModel);

  // 패스워드의 복잡도를 표시합니다.
  passwordStrength = computed(() => {
    const password = this.passwordForm.password().value();
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  });

  // 필수 항목이 모두 입력되었는지 확인합니다.
  allFieldsFilled = computed(() => {
    return (
      this.passwordForm.password().value().length > 0 &&
      this.passwordForm.confirmPassword().value().length > 0
    );
  });
}
```

<!--
### Programmatic state changes
-->

### 로직으로 상태 변경

<!--
While field state typically updates through user interactions (typing, focusing, blurring), you sometimes need to control it programmatically. Common scenarios include form submission and resetting forms.
-->

필드의 상태는 일반적으로 사용자와 상호작용하면서 변경되지만, 때로는 로직으로 조작하는 경우도 있습니다.
폼을 제출한 후에 초기화하는 것이 일반적입니다.

<!--
#### Form submission
-->

#### 폼 제출

<!--
Signal Forms provides a `FormRoot` directive that simplifies form submission. It automatically prevents the default browser form submission behavior and sets the `novalidate` attribute on the `<form>` element.

```angular-ts
import {FormField, FormRoot} from '@angular/forms/signals';

@Component({
  imports: [FormRoot, FormField],
  template: `
    <form [formRoot]="registrationForm">
      <input [formField]="registrationForm.username" />
      <input type="email" [formField]="registrationForm.email" />
      <input type="password" [formField]="registrationForm.password" />

      <button type="submit">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: '', email: '', password: ''});

  registrationForm = form(
    this.registrationModel,
    (schemaPath) => {
      required(schemaPath.username);
      email(schemaPath.email);
      required(schemaPath.password);
    },
    {
      submission: {
        action: async () => this.submitToServer(),
      },
    },
  );

  private submitToServer() {
    // Send data to server
  }
}
```

When you use `FormRoot`, submitting the form automatically calls the `submit()` function, which marks all fields as touched (revealing validation errors) and executes your `action` callback if the form is valid.

You can also submit a form manually, without using the directive, by calling `submit(this.registrationForm)`. When explicitly calling the `submit` function like this, you can pass a `FormSubmitOptions` to override the default `submission` logic for the form: `submit(this.registrationForm, {action: () => /* ... */ })`.
-->

시그널 폼은 폼 제출을 간단하게 구현하기 위해 `FormRoot` 디렉티브를 제공합니다.
이 디렉티브는 브라우저의 기본 폼 제출 동작을 막고 `<form>` 엘리먼트에 `novalidate` 어트리뷰트를 추가합니다.

```angular-ts
import {FormField, FormRoot} from '@angular/forms/signals';

@Component({
  imports: [FormRoot, FormField],
  template: `
    <form [formRoot]="registrationForm">
      <input [formField]="registrationForm.username" />
      <input type="email" [formField]="registrationForm.email" />
      <input type="password" [formField]="registrationForm.password" />

      <button type="submit">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: '', email: '', password: ''});

  registrationForm = form(
    this.registrationModel,
    (schemaPath) => {
      required(schemaPath.username);
      email(schemaPath.email);
      required(schemaPath.password);
    },
    {
      submission: {
        action: async () => this.submitToServer(),
      },
    },
  );

  private submitToServer() {
    // 데이터를 서버로 보냅니다.
  }
}
```

`formRoot`를 사용하면 폼을 제출할 때 `submit()` 함수가 자동으로 실행됩니다.
이 함수는 모든 필드의 유효성 검사 결과를 완료된 것으로 표시하고, 폼이 유효한 경우 `action` 콜백 함수를 실행합니다.

디렉티브를 사용하지 않고 `submit(this.registrationForm)`을 실행해서 수동으로 폼을 제출할 수도 있습니다.
`submit()` 함수를 명시적으로 호출할 때는 `FormSubmitOptioins`를 전달해서 폼의 기본 제출 로직을 재정의할 수 있습니다: `submit(this.registrationForm, {action: () => /* ... */ })`

<!--
#### Resetting forms after submission
-->

#### 폼 제출 후 폼 초기화

<!--
After successfully submitting a form, you may want to return it to its initial state - clearing both user interaction history and field values. The `reset()` method clears the touched and dirty flags. You can also pass an optional value to `reset()` to update the model data:

```ts
export class Contact {
  private readonly INITIAL_MODEL = {name: '', email: '', message: ''};
  contactModel = signal({...this.INITIAL_MODEL});
  contactForm = form(this.contactModel, {
    submission: {
      action: async (f) => {
        await this.api.sendMessage(this.contactModel());
        // Clear interaction state (touched, dirty) and reset to initial values
        f().reset({...this.INITIAL_MODEL});
      },
    },
  });
}
```

This ensures the form is ready for new input without showing stale error messages or dirty state indicators.
-->

폼을 제출하고 나면 사용자가 상호작용했던 기록과 필드 값을 모두 초기화하는 것이 일반적입니다.
이 때 `reset()` 메서드를 실행하면 `touched` 플래그와 `dirty` 플래그를 초기화합니다.
`reset()` 메서드를 실행하면서 새로운 값으로 폼을 설정하려면 인자로 전달하면 됩니다:

```ts
export class Contact {
  private readonly INITIAL_MODEL = {name: '', email: '', message: ''};
  contactModel = signal({...this.INITIAL_MODEL});
  contactForm = form(this.contactModel, {
    submission: {
      action: async (f) => {
        await this.api.sendMessage(this.contactModel());
        // touched, dirty 등 상호작용 기록을 초기화하고 초기값으로 돌립니다.
        f().reset({...this.INITIAL_MODEL});
      },
    },
  });
}
```

이렇게 하면 폼의 에러 메시지와 `dirty` 상태가 초기화되며 새로운 값을 입력받을 준비가 됩니다.

<!--
## Styling based on validation state
-->

## 유효성 검사 상태에 따라 스타일 지정하기

<!--
You can apply custom styles to your form by binding CSS classes based on the validation state:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input
      type="email"
      [formField]="form.email"
      [class.is-invalid]="form.email().touched() && form.email().invalid()"
      [class.is-valid]="form.email().touched() && form.email().valid()"
    />
  `,
  styles: `
    input.is-invalid {
      border: 2px solid red;
      background-color: white;
    }

    input.is-valid {
      border: 2px solid green;
    }
  `,
})
export class StyleExample {
  model = signal({email: ''});

  form = form(this.model, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

Checking both `touched()` and validation state ensures styles only appear after the user has interacted with the field.
-->

유효성 검사 결과에 따라 CSS 클래스를 바인딩하면 폼에 커스텀 스타일을 지정할 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input
      type="email"
      [formField]="form.email"
      [class.is-invalid]="form.email().touched() && form.email().invalid()"
      [class.is-valid]="form.email().touched() && form.email().valid()"
    />
  `,
  styles: `
    input.is-invalid {
      border: 2px solid red;
      background-color: white;
    }

    input.is-valid {
      border: 2px solid green;
    }
  `,
})
export class StyleExample {
  model = signal({email: ''});

  form = form(this.model, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

`touched()`와 유효성 검사 상태를 확인하면 사용자가 상호작용한 후에 에러 스타일을 지정할 수 있습니다.

<!---
## Next steps
-->

## 다음 단계

<!--
This guide covered validation and availability status handling, interaction tracking and field state propagation. Related guides explore other aspects of Signal Forms:

<!- TODO: UNCOMMENT WHEN THE GUIDES ARE AVAILABLE ->
<docs-pill-row>
  <docs-pill href="guide/forms/signals/models" title="Form models" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/custom-controls" title="Custom controls" />
  <!- <docs-pill href="guide/forms/signals/arrays" title="Working with Arrays" /> ->
</docs-pill-row>
-->

이번 문서는 유효성 검사, 가용성 상태 처리, 사용자의 상호작용을 추적하고 필드 상태가 전파되는 것을 다뤘습니다.
시그널 폼의 이런 내용도 확인해 보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/models" title="폼 모델" />
  <docs-pill href="guide/forms/signals/validation" title="유료성 검사" />
  <docs-pill href="guide/forms/signals/custom-controls" title="커스텀 컨트롤" />
  <!-- <docs-pill href="guide/forms/signals/arrays" title="Working with Arrays" /> -->
</docs-pill-row>
