<!--
# Adding form logic
-->

# 폼 로직 추가하기

<!--
Signal Forms allow you to add logic to your form using schemas. Validation logic is covered in the [Validation guide](guide/forms/signals/validation), and this guide discusses other rules available in schemas. You can disable fields conditionally, hide them based on other values, make them readonly, debounce user input, and attach metadata for custom controls.

This guide shows you how to use rules like `disabled()`, `hidden()`, `readonly()`, `debounce()`, and `metadata()` to control field behavior.
-->

스키마를 활용하면 원하는 폼 로직을 시그널 폼에 추가할 수 있습니다.
[유효성 검사 문서](guide/forms/signals/validation)에서 다룬 유효성 검사 외에, 이 문서는 스키마에서 활용할 수 있는 유효성 검사를 알아봅시다.
폼 필드는 조건에 따라 비활성화 할 수 있으며, 다른 값에 연동되며 화면에서 감출 수도 있고, 읽기 전용으로 만들거나 커스텀 컨트롤에 메타데이터를 추가할 수도 있습니다.

이 문서는 `disabled()`, `hidden()`, `readonly()`, `debounce()`, `metadat()`를 활용한 필드 동작 제어 방법을 알아봅시다.

<!--
## When to add form logic
-->

## 폼 로직은 언제 추가하나요

<!--
Use rules when field behavior depends on other field values or needs to update reactively. For example:

- A coupon code field that's disabled when the order total is too low
- An address field that's hidden unless shipping is required
- A search field that debounces to reduce API calls
-->

다른 필드 값에 따라 유효성 검사 규칙이 달라지거나 반응형으로 갱신되어야 할 때 사용하세요.
예를 들자면:

- 총 금액이 너무 낮을 때 쿠폰 코드를 비활성화 할 때
- 배송이 필수할 때만 주소 입력 필드를 활성화 할 때
- API 요청을 줄이기 위해 검색 필드 요청 횟수를 줄일 때

<!--
## How rules work
-->

## 규칙은 어떻게 동작하나요

<!--
Rules bind reactive logic to specific fields in your form. Most conditional rules accept an options object with a `when` function. The `when` function automatically recomputes whenever the signals it references change, just like a `computed`.

```ts
const orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  //~~~~~~ ~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //rule     path                   reactive logic function
});
```

Reactive logic functions receive a `FieldContext` object that provides access to field values and state through helper functions like `valueOf()` and `stateOf()`. It is often destructured to access these helpers directly.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

For complete details on `FieldContext` properties and methods, see the [Validation guide](guide/forms/signals/validation).
-->

조건부 규칙은 폼 필드에 반응형 로직을 바인딩하는 것으로 추가합니다.
대부분은 `when` 함수가 정의된 옵션 객체를 활용합니다.
이 `when` 함수는 `computed()`처럼 참조하는 시그널이 변경될 때마다 자동으로 다시 실행됩니다.

```ts
const orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  //~~~~~~ ~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //규칙           경로                            반응형 로직 함수
});
```

반응형 로직 함수는 `FieldContext` 객체를 받는데, 이 객체를 활용해서 필드 값에 접근하거나 `valueOf()`나 `stateOf()`와 같은 헬퍼 함수로 필드 상태에 접근할 수 있습니다.
헬퍼 함수에 접근할 때는 구조 분해 문법을 사용하는 경우가 많습니다.

참고: 스키마 콜백 인자(이 예제에서는 `schemaPath`)는 폼의 모든 필드에 접근할 수 있는 `SchemaPathTree` 객체입니다.
변수 이름은 원하는 것으로 변경해도 됩니다.

`FieldContext` 객체의 프로퍼티와 메서드를 더 알아보려면 [유효성 검사 문서](guide/forms/signals/validation)를 참고하세요.

<!--
## Prevent field updates with `disabled()`
-->

## 필드 비활성화: `disabled()`

<!--
The `disabled()` rule configures a field's disabled state.

It works with the `[formField]` directive to automatically bind the `disabled` attribute based on the field's state, so you don't need to manually add `[disabled]="yourForm.fieldName().disabled()"` to your template.

NOTE: Disabled fields skip validation - they don't participate in form validation checks. The field's value is preserved but not validated. For details on validation behavior, see the [Validation guide](guide/forms/signals/validation).
-->

`disabled()`는 필드의 비활성화 상태를 설정합니다.

`disabled()`는 `[formField]` 디렉티브와 함께 동작하며 필드 상태에 따라 `disabled` 어트리뷰트를 자동으로 바인딩합니다.
템플릿에서 `[disabled]="yourForm.fieldName().disabled()"`와 같은 코드를 작성할 필요는 없습니다.

참고: 비활성화 된 필드는 유효성 검사에 영향을 주지 않습니다.
필드의 값은 유지되지만 유효성 검사에 관여되지 않습니다.
유효성 검사에 대해 자세하게 알아보려면 [유효성 검사](guide/forms/signals/validation)문서를 참고하세요.

<!--
### Always disabled
-->

### 항상 비활성화 되는 경우

<!--
To disable a field permanently, call `disabled()` with just the field path:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-settings',
  imports: [FormField],
  template: `
    <label>
      System ID (cannot be changed)
      <input [formField]="settingsForm.systemId" />
    </label>
  `,
})
export class Settings {
  settingsModel = signal({
    systemId: 'SYS-12345',
    userName: '',
  });

  settingsForm = form(this.settingsModel, (schemaPath) => {
    disabled(schemaPath.systemId);
  });
}
```
-->

필드를 완전히 비활성화 하려면 `disabled()`로 필드 경로를 지정하면 됩니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-settings',
  imports: [FormField],
  template: `
    <label>
      System ID (cannot be changed)
      <input [formField]="settingsForm.systemId" />
    </label>
  `,
})
export class Settings {
  settingsModel = signal({
    systemId: 'SYS-12345',
    userName: '',
  });

  settingsForm = form(this.settingsModel, (schemaPath) => {
    disabled(schemaPath.systemId);
  });
}
```

<!--
### Conditional disabling
-->

### 조건부 비활성화

<!--
To disable a field based on conditions, provide a `when` function that returns `true` (disabled) or `false` (enabled):

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>
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

In this example, when the order total is less than $50, the coupon code field is disabled.
-->

필드를 조건에 따라 비활성화 하려면 `true` 값이나 `false` 값을 반환하는 `when` 함수를 정의하면 됩니다.
`true`를 반환하면 필드가 비활성화되고, `false`를 반환하면 필드가 활성화됩니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>
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

이 예제 코드에서는 주문 금액이 $50 미만일 때 쿠폰 코드 필드가 비활성화 됩니다.

<!--
### Disabled reasons
-->

### 비활성화 사유

<!--
When you disable a field, provide user-facing explanations by returning a string instead of `true`:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>

    @if (orderForm.couponCode().disabled()) {
      <div class="info">
        @for (reason of orderForm.couponCode().disabledReasons(); track reason) {
          <p>{{ reason.message }}</p>
        }
      </div>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {
      when: ({valueOf}) =>
        valueOf(schemaPath.total) < 50 ? 'Order must be $50 or more to use a coupon' : false,
    });
  });
}
```

The `when` function returns:

- A **string** to disable the field with a reason
- `false` to enable the field (not just any falsy value - use `false` explicitly)

Access the reasons through the `disabledReasons()` signal on the field state. Each reason has a `message` property containing the string you returned.
-->

폼 필드를 비활성화 할 때 `true` 값 대신 문자열을 반환하면 사용자에게 표시할 메시지를 지정할 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>

    @if (orderForm.couponCode().disabled()) {
      <div class="info">
        @for (reason of orderForm.couponCode().disabledReasons(); track reason) {
          <p>{{ reason.message }}</p>
        }
      </div>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {
      when: ({valueOf}) =>
        valueOf(schemaPath.total) < 50 ? 'Order must be $50 or more to use a coupon' : false,
    });
  });
}
```

`when` 함수가 반환하는 타입은 이렇습니다:

- 문자열 - 비활성화 사유를 전달하며 필드를 비활성화 할 때
- `false` - 필드 활성화, 거짓으로 평가되는 값이 아니라 `false`를 사용하세요.

비활성화 사유를 확인하려면 폼 필드의 `disabledReasons()` 시그널을 확인하면 됩니다.
`when` 함수가 반환하는 문자열은 `message` 프로퍼티로 전달됩니다.

<!--
#### Multiple disabled reasons
-->

#### 비활성화 사유가 여러개일 때

<!--
You can also call `disabled()` multiple times on the same field, and all of the returned reasons accumulate:

```angular-ts
orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) =>
      !valueOf(schemaPath.hasAccount) ? 'You must have an account to use promo codes' : false,
  });
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) => (valueOf(schemaPath.total) < 25 ? 'Order must be at least $25' : false),
  });
});
```

If both conditions are true, the field shows both disabled reasons. This pattern is useful for complex availability rules that you want to keep separate.
-->

`disabled()`는 한 필드에서 여러번 실행될 수도 있습니다.
반환하는 값은 모두 누적됩니다:

```angular-ts
orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) =>
      !valueOf(schemaPath.hasAccount) ? 'You must have an account to use promo codes' : false,
  });
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) => (valueOf(schemaPath.total) < 25 ? 'Order must be at least $25' : false),
  });
});
```

두 조건이 모두 `true`면 비활성화 사유는 모두 표시됩니다.
이 방식은 복잡한 로직을 분리해서 관리할 때 유용합니다.

<!--
## Configuring `hidden()` state on fields
-->

## 화면에서 감추기: `hidden()`

<!--
The `hidden()` rule configures a field's hidden state. However, this only sets a programmatic state. **You control whether the field appears in the UI**.

IMPORTANT: Unlike `disabled` and `readonly`, there is no native DOM property for `hidden` state. The `[formField]` directive does not apply a `hidden` attribute to elements. You must use `@if` or CSS in your template to conditionally render fields based on the `hidden()` state.

NOTE: Like disabled fields, hidden fields also skip validation. See the [Validation guide](guide/forms/signals/validation) for details.
-->

필드를 화면에서 감추려면 `hidden()`을 활용하면 됩니다.
이 규칙은 로직으로만 설정할 수 있습니다.
**필드가 표시될 지 결정하는 것은 화면에서 입니다.**

중요: `disabled`, `readonly`와는 다르게, `hidden`는 상태는 표준 DOM 프로퍼티로 존재하지 않습니다.
`[formField]` 디렉티브는 엘리먼트에 `hidden` 어트리뷰트를 적용하지 않습니다.
`hidden()` 상태에 따라 폼 필드를 조건부로 화면에 표시하려면 `@if`나 CSS를 사용해야 합니다.

참고: `disabled` 필드와 비슷하게 `hidden` 필드도 유효성 검사에 영향을 주지 않습니다.
자세한 내용은 [유효성 검사](guide/forms/signals/validation) 문서를 참고하세요.

<!--
### Basic field hiding
-->

### 기본 활용

<!--
Use `hidden()` with a `when` function that returns `true` (hidden) or `false` (visible):

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
-->

`hidden()`은 `when` 함수가 `true`를 반환하면 화면에서 감춰지고, `false`를 반환하면 화면에 표시됩니다:

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

<!--
## Display uneditable fields with `readonly()`
-->

## 화면에 표시되지만 수정할 수 없는 필드: `readonly()`

<!--
The `readonly()` rule prevents users from updating a field. The `[FormField]` directive automatically binds this state to the HTML `readonly` attribute, which prevents editing while still allowing users to focus and select text.

NOTE: Readonly fields skip [validation](guide/forms/signals/validation).
-->

`readonly()` 규칙을 적용하면 사용자가 필드 값을 수정할 수 없습니다.
`[formField]` 디렉티브는 상태에 따라 HTML `readonly` 어트리뷰트 자동으로 바인딩하는데, 이 어트리뷰트가 설정되면 사용자는 포커스를 옮기거나 텍스트를 선택할 수 있지만, 값을 수정할 수는 없습니다.

참고: 읽기 전용 필드는 [유효성 검사](guide/forms/signals/validation)에 영향을 주지 않습니다.

<!--
### Always readonly
-->

### 항상 읽기 전용인 경우

<!--
To make a field permanently readonly, call `readonly()` with just the field path:

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

The `[FormField]` directive automatically binds the `readonly` attribute based on the field's state.
-->

폼 필드를 항상 읽기 전용으로 지정하려면 `readonly()`에 필드 경로를 지정하면 됩니다:

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

`[formField]` 디렉티브는 필드 상태에 따라 HTML `readonly` 어트리뷰트를 자동으로 바인딩합니다.

<!--
### Conditional readonly
-->

### 조건부 읽기 전용

<!--
To make a field readonly based on conditions, provide a `when` function:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-document',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="documentForm.isLocked" />
      Lock document
    </label>

    <label>
      Document Title
      <input [formField]="documentForm.title" />
    </label>
  `,
})
export class Document {
  documentModel = signal({
    isLocked: false,
    title: 'Untitled',
  });

  documentForm = form(this.documentModel, (schemaPath) => {
    readonly(schemaPath.title, {when: ({valueOf}) => valueOf(schemaPath.isLocked)});
  });
}
```

When `isLocked` is true, the title field becomes readonly.
-->

조건에 따라 필드를 읽기 전용으로 지정하려면 `when` 함수를 사용하면 됩니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-document',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="documentForm.isLocked" />
      Lock document
    </label>

    <label>
      Document Title
      <input [formField]="documentForm.title" />
    </label>
  `,
})
export class Document {
  documentModel = signal({
    isLocked: false,
    title: 'Untitled',
  });

  documentForm = form(this.documentModel, (schemaPath) => {
    readonly(schemaPath.title, {when: ({valueOf}) => valueOf(schemaPath.isLocked)});
  });
}
```

이렇게 구현하면 `isLocked` 값이 `true`일 때 `title` 필드는 읽기 전용이 됩니다.

<!--
## Choose between hidden, disabled, and readonly
-->

## 숨김, 비활성화, 읽기 전용 선택 기준

<!--
These three configuration functions control field availability in different ways:

Choose `hidden()` when the field:

- Should not appear in the UI at all
- Is irrelevant to the current form state
- Example: Shipping address fields when "same as billing" is checked

Choose `disabled()` when the field:

- Should be visible but not editable
- Needs to show why it's unavailable (using disabled reasons)
- Should be excluded from HTML form submission
- Example: Submit button disabled until form is valid, approval fields disabled for non-admin users

Choose `readonly()` when the field:

- Should be visible but not editable
- Contains data users need to see, select, or copy
- Should be included in HTML form submission
- Example: Order confirmation number, system-generated reference codes

All three skip validation and prevent user editing while active. The key differences:

| Feature                          | `hidden()` | `disabled()` | `readonly()` |
| -------------------------------- | ---------- | ------------ | ------------ |
| Visible in UI                    | No         | Yes          | Yes          |
| Users can focus/select           | No         | No           | Yes          |
| Included in HTML form submission | No         | No           | Yes          |
-->

폼 필드의 활성화 상태를 조작하는 방법은 3가지 입니다:

`hidden()`는 이런 경우에 사용하세요:

- 화면에 표시하지 않을 때
- 폼 상태에 영향을 주지 않을 때
- 예시: "배송지가 주문자 주소와 동일" 할 때 배송 주소 필드

`disabled()`는 이런 경우에 사용하세요:

- 화면에 표시하지만 수정하지 않아야 할 때
- 비활성화 사유와 같이 동작하지 않는 이유를 표시할 때
- HTML 폼 제출과 무관한 필드
- 예시: 폼이 활성화 되기 전까지는 폼 제출 버튼을 비활성화 할 때, 관리자에게만 승인 필드를 활성화 할 때

`readonly()`는 이런 경우에 사용하세요:

- 화면에 표시하지만 수정하지 않아야 할 때
- 사용자가 보거나, 선택하거나, 복사해야 하는 데이터를 표시할 때
- HTML 폼 제출에 필요한 필드할 때
- 예시: 주문 확인 번호, 시스템이 생성한 참조 코드

활성화 되었을 때 유효성 검사 영향 여부나 사용자가 수정 가능한지는 이렇게 다릅니다:

| 기능                                        | `hidden()` | `disabled()` | `readonly()` |
| ------------------------------------------- | ---------- | ------------ | ------------ |
| 화면에 보이는지                             | X          | O            | O            |
| 사용자가 포커스를 옮기거나 선택할 수 있는지 | X          | X            | O            |
| HTML 폼 제출에 포함되는지                   | X          | X            | O            |

<!--
## Delay input operations with `debounce()`
-->

## 입력값 전달 속도 늦추기: `debounce()`

<!--
The `debounce()` rule delays updating the form model. This is useful for performance optimization and reducing unnecessary operations during rapid input.
-->

`debounce()`를 활용하면 폼 모델이 갱신하는 속도를 늦춥니다.
사용자의 빠른 입력에 매번 반응하여 전체 성능이 저하되는 것을 방지할 때 유용합니다.

<!--
### What debouncing does
-->

### `debounce()`가 하는 작업

<!--
Without debouncing, every keystroke immediately updates the form model. This can trigger:

- Expensive computed signals that recalculate on every change
- Validation checks after each character
- API calls or other side effects tied to the model value

Debouncing delays these updates and reduces unnecessary work.
-->

입력값 전달 속도를 늦추지 않으면, 사용자가 입력하는 키마다 폼 모델을 갱신해야 합니다.
이러면:

- 모든 변화에 맞춰 시그널 재계산이 실행되기 때문에 연산 자원을 낭비합니다.
- 문자가 매번 입력될 때마다 유효성 검사가 실행됩니다.
- 모델 값과 연결된 API 호출이나 기타 효과들이 발생합니다.

`debounce()`를 활용하면 값이 불필요한 작업을 줄일 수 있습니다.

<!--
### Basic debouncing
-->

### 기본 디바운싱

<!--
You can debounce a field by specifying a delay in milliseconds:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>

    <p>Searching for: {{ searchForm.query().value() }}</p>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, 300);
  });
}
```

With a 300ms debounce:

- User types in the input field
- Form model updates only after 300ms of typing inactivity
- If user keeps typing, the timer resets with each keystroke
- Once user pauses for 300ms, the model updates with the final value
-->

디바운스는 밀리초 단위로 지정합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>

    <p>Searching for: {{ searchForm.query().value() }}</p>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, 300);
  });
}
```

300ms로 디바운스를 설정하면:

- 사용자가 입력 필드에 값을 입력했을 때
- 300ms 동안 입력이 멈춰야 폼 모델을 갱신합니다.
- 이 시간 안에 입력이 들어오면, 타이머가 새로 시작됩니다.
- 사용자가 300ms 동안 입력을 멈추면, 폼 모델이 최종값으로 갱신됩니다.

<!--
### Timing guarantees
-->

### 타이밍 보장

<!--
The `debounce()` function ensures users don't lose data through these mechanisms:

- **When marked as touched:** The value syncs immediately, aborting any pending debounce delay. This happens when the field loses focus (blur) or when explicitly marked as touched.
- **On form submission:** All fields are marked as touched before validation, which ensures all debounced values sync immediately.

This means users can type quickly, tab away, or submit the form without waiting for debounce delays to expire.
-->

`debounce()` 함수를 사용하면 이런 과정을 거칩니다:

- **사용자가 접근하면:** 지정된 시간동안 값 동기화가 중단됩니다.
- **폼 제출 시:** 유효성 검사를 실행하기 전에 모든 필드를 `touched` 상태로 변경합니다. 필드의 모든 값은 동기화됩니다.

사용자가 빠르게 입력하고, 다른 곳으로 포커스를 이동하면, 디바운스 딜레이가 만료되기 전에 폼을 제출할 수 있습니다.

<!--
### Custom debounce logic
-->

### 커스텀 디바운스 로직

<!--
For advanced control, provide a debouncer function that controls when to synchronize the value. This function is called every time the control value is updated and can return either `undefined` to synchronize immediately, or a Promise that prevents synchronization until it resolves:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, () => {
      // Return a promise that resolves after 500ms
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    });
  });
}
```

The debouncer function can return:

- `undefined` to synchronize the value immediately
- A `Promise<void>` that prevents synchronization until it resolves

Use cases for custom debounce logic:

- Implementing custom timing logic beyond simple delays
- Coordinating synchronization with external events
- Conditional debouncing based on application state
-->

좀 더 정밀하게 제어하려면, 디바운서(debouncer) 함수를 정의해서 값을 언제 동기화해야 하는지 지정하면 됩니다.
이 함수는 폼 컨트롤의 값이 변경될 때마다 실행되는데, 값을 즉시 동기화하려면 `undefined`나 실행이 완료된 Promise를 반환하면 됩니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, debounce} from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  imports: [FormField],
  template: `
    <label>
      Search
      <input [formField]="searchForm.query" />
    </label>
  `,
})
export class Search {
  searchModel = signal({
    query: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.query, () => {
      // 500ms 후에 종료되는 Promise를 반환합니다.
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    });
  });
}
```

디바운서 함수가 반환하는 값에 따라 동작이 다릅니다:

- `undefined` - 값을 즉시 동기화 할 때
- `Promise<void>` - Promise가 완료될 때까지 동기화를 멈춤니다.

커스텀 디바운스 로직은 이런 경우에 사용합니다:

- 단순하게 지연하지 않고 타이밍 로직을 커스터마이징 할 때
- 외부 이벤트와 동기화를 맞춰야 할 때
- 애플리케이션 상태에 따라 디바운스 로직을 적용할 때

<!--
### When to use debouncing
-->

### 언제 사용하나요?

<!--
Debouncing is most useful when:

- You have expensive computed signals that depend on the field value
- The field triggers API calls or other side effects
- You want to reduce validation overhead during rapid typing
- Performance profiling shows model updates are causing slowdowns

Don't use debouncing if:

- The field needs immediate updates for good UX (such as calculator inputs)
- The performance benefit is negligible
- Users expect real-time feedback
-->

디바운스는 이런 경우에 유용합니다:

- 필드 값이 변경되면 무거운 시그널 작업이 필요할 때
- 필드 값이 변경되면 API나 다른 작업을 호출하는 경우
- 너무 빠르게 입력했을 때 유효성 검사 부하를 줄이려고 할 때
- 폼 모델 갱신으로 속도 저하가 발생하는 경우

이런 경우는 사용하지 마세요:

- 좋은 UX를 위해 필드값이 즉시 갱신되어야 하는 경우(예시. 계산기)
- 디바운싱을 적용해서 얻는 성능 이득이 적을 때
- 사용자가 실시간 피드백을 기대할 때

<!--
## Associate data with a field using `metadata()`
-->

## 데이터와 필드 연관짓기: `metadata()`

<!--
Metadata attaches reactive data to a field. Validation rules use this system internally, and you can publish your own keys for application-specific information like help text, configuration, or computed display values.

Signal Forms provides six pre-defined metadata keys that built-in validators populate automatically:

| Key          | Populated by  | Read via              |
| ------------ | ------------- | --------------------- |
| `REQUIRED`   | `required()`  | `field().required()`  |
| `MIN`        | `min()`       | `field().min()`       |
| `MAX`        | `max()`       | `field().max()`       |
| `MIN_LENGTH` | `minLength()` | `field().minLength()` |
| `MAX_LENGTH` | `maxLength()` | `field().maxLength()` |
| `PATTERN`    | `pattern()`   | `field().pattern()`   |

The `[formField]` directive automatically binds five of these (`REQUIRED`, `MIN`, `MAX`, `MIN_LENGTH`, and `MAX_LENGTH`) to the corresponding HTML attribute on a native form control. `PATTERN` is the exception, because Signal Forms supports multiple patterns per field but the HTML `pattern` attribute accepts only a single regular expression.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age',
  imports: [FormField],
  template: `
    <label>
      Age (between {{ ageForm.age().min?.() }} and {{ ageForm.age().max?.() }})
      <input type="number" [formField]="ageForm.age" />
    </label>

    @if (ageForm.age().required()) {
      <span class="required-indicator">*</span>
    }
  `,
})
export class Age {
  ageModel = signal({age: 0});

  ageForm = form(this.ageModel, (schemaPath) => {
    required(schemaPath.age);
    min(schemaPath.age, 18);
    max(schemaPath.age, 120);
  });
}
```
-->

메타데이터는 필드에 반응형 데이터를 연결합니다.
도움말과 같은 애플리케이션별 정보, 환경설정, 계산값 등을 지정할 수 있으며, 이런 메타데이터는 유효성 검사 규칙에서 활용할 수 있습니다.

시그널 폼은 기본적으로 6개 메타데이터 키를 제공합니다:

| 키           | 관련 검사 함수 | 사용방식              |
| ------------ | -------------- | --------------------- |
| `REQUIRED`   | `required()`   | `field().required()`  |
| `MIN`        | `min()`        | `field().min()`       |
| `MAX`        | `max()`        | `field().max()`       |
| `MIN_LENGTH` | `minLength()`  | `field().minLength()` |
| `MAX_LENGTH` | `maxLength()`  | `field().maxLength()` |
| `PATTERN`    | `pattern()`    | `field().pattern()`   |

`[formField]` 디렉티므는 위 5개 키를 폼 넌트롤의 HTML 어트리뷰트에 자동으로 바인딩합니다.
`PATTERN`은 예외인데, 시그널 폼은 패턴을 여러개 설정할 수 있지만 HTML `pattern` 어트리뷰트는 정규 표현식을 하나만 받을 수 있기 때문입니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age',
  imports: [FormField],
  template: `
    <label>
      Age (between {{ ageForm.age().min?.() }} and {{ ageForm.age().max?.() }})
      <input type="number" [formField]="ageForm.age" />
    </label>

    @if (ageForm.age().required()) {
      <span class="required-indicator">*</span>
    }
  `,
})
export class Age {
  ageModel = signal({age: 0});

  ageForm = form(this.ageModel, (schemaPath) => {
    required(schemaPath.age);
    min(schemaPath.age, 18);
    max(schemaPath.age, 120);
  });
}
```

<!--
### Reactive metadata
-->

### 반응형 메타데이터

<!--
Validation rules can derive their constraints from other fields, making the published metadata reactive:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, max} from '@angular/forms/signals';

@Component({
  selector: 'app-inventory',
  imports: [FormField],
  template: `
    <label>
      Item
      <select [formField]="inventoryForm.item">
        <option value="widget">Widget</option>
        <option value="gadget">Gadget</option>
      </select>
    </label>

    <label>
      Quantity (max: {{ inventoryForm.quantity().max?.() }})
      <input type="number" [formField]="inventoryForm.quantity" />
    </label>
  `,
})
export class Inventory {
  inventoryModel = signal({
    item: 'widget',
    quantity: 0,
  });

  inventoryForm = form(this.inventoryModel, (schemaPath) => {
    max(schemaPath.quantity, ({valueOf}) => {
      const item = valueOf(schemaPath.item);
      return item === 'widget' ? 100 : 50;
    });
  });
}
```

The `max()` validation rule sets the `MAX` metadata reactively based on the selected item, so any template or control reading `field().max()` updates whenever the item changes.

For deeper coverage, including how to define custom keys, combine contributions with reducers, and use managed metadata for lifecycle-aware objects, see the [Field metadata guide](guide/forms/signals/field-metadata).
-->

유효성 검사 규칙은 다른 필드를 참조할 수 있기 때문에, 메타데이터도 참조할 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, max} from '@angular/forms/signals';

@Component({
  selector: 'app-inventory',
  imports: [FormField],
  template: `
    <label>
      Item
      <select [formField]="inventoryForm.item">
        <option value="widget">Widget</option>
        <option value="gadget">Gadget</option>
      </select>
    </label>

    <label>
      Quantity (max: {{ inventoryForm.quantity().max?.() }})
      <input type="number" [formField]="inventoryForm.quantity" />
    </label>
  `,
})
export class Inventory {
  inventoryModel = signal({
    item: 'widget',
    quantity: 0,
  });

  inventoryForm = form(this.inventoryModel, (schemaPath) => {
    max(schemaPath.quantity, ({valueOf}) => {
      const item = valueOf(schemaPath.item);
      return item === 'widget' ? 100 : 50;
    });
  });
}
```

`max()` 유효성 검사 함수는 해당 항목의 `field().max()` 값에 따라 `MAX` 메타데이터를 설정합니다.

커스텀 키를 정의하는 방법, 리듀서(reducer)를 활용하는 방법, 라이프 싸이클 관련 객체에서 메타데이터를 활용하는 방법 등 더 자세한 내용을 알아보려면 [필드 메타데이터](guide/forms/signals/field-metadata)를 참고하세요.

<!--
## Combining rules
-->

## 유효성 검사 조합하기

<!--
You can apply multiple rules to the same field, and you can use conditional logic to apply entire groups of rules based on form state.
-->

폼 필드에는 유효성 검사 규칙을 여러개 지정할 수 있으며, 폼 상태에 따라 조건부로 적용할 수도 있습니다.

<!--
### Multiple rules on one field
-->

### 필드 상태 여러개 적용하기

<!--
Apply multiple rules to configure all aspects of a field's behavior:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled, hidden, debounce, metadata} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

@Component({
  selector: 'app-promo',
  imports: [FormField],
  template: `
    @if (!promoForm.promoCode().hidden()) {
      <label>
        Promo Code
        <input [formField]="promoForm.promoCode" />
      </label>
    }
  `,
})
export class Promo {
  promoModel = signal({
    hasAccount: false,
    subscriptionType: 'free' as 'free' | 'premium',
    promoCode: '',
  });

  promoForm = form(this.promoModel, (schemaPath) => {
    disabled(schemaPath.promoCode, {
      when: ({valueOf}) => (!valueOf(schemaPath.hasAccount) ? 'You must have an account' : false),
    });
    hidden(schemaPath.promoCode, {
      when: ({valueOf}) => valueOf(schemaPath.subscriptionType) === 'free',
    });
    debounce(schemaPath.promoCode, 300);
    metadata(schemaPath.promoCode, PLACEHOLDER, () => 'Enter promo code');
  });
}
```

These rules work together:

- Hidden takes precedence - if the field is hidden, disabled state doesn't matter
- Disabled prevents editing regardless of readonly state
- Debouncing affects model updates regardless of other state
- Metadata is independent and always available
-->

필드에는 상태를 여러개 적용할 수 있습니다::

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled, hidden, debounce, metadata} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

@Component({
  selector: 'app-promo',
  imports: [FormField],
  template: `
    @if (!promoForm.promoCode().hidden()) {
      <label>
        Promo Code
        <input [formField]="promoForm.promoCode" />
      </label>
    }
  `,
})
export class Promo {
  promoModel = signal({
    hasAccount: false,
    subscriptionType: 'free' as 'free' | 'premium',
    promoCode: '',
  });

  promoForm = form(this.promoModel, (schemaPath) => {
    disabled(schemaPath.promoCode, {
      when: ({valueOf}) => (!valueOf(schemaPath.hasAccount) ? 'You must have an account' : false),
    });
    hidden(schemaPath.promoCode, {
      when: ({valueOf}) => valueOf(schemaPath.subscriptionType) === 'free',
    });
    debounce(schemaPath.promoCode, 300);
    metadata(schemaPath.promoCode, PLACEHOLDER, () => 'Enter promo code');
  });
}
```

그러면 이렇게 동작합니다:

- `hidden` 상태가 최우선 순위입니다 - 필드가 감춰지면 disabled 상태는 영향을 미치지 않습니다.
- `disabled` 상태가 적용되면 `readonly` 상태와 관련없이 수정이 금지됩니다.
- 디바운싱은 모델 값 갱신에 영향을 줍니다. 다른 상태에는 영향을 받지 않습니다.
- 메타데이터는 언제나 독립적으로 적용됩니다.

<!--
### Conditional logic with applyWhen
-->

### 조건부로 적용하기: `applyWhen`

<!--
Use `applyWhen()` to conditionally apply entire groups of rules:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, applyWhen, required, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-address',
  imports: [FormField],
  template: `
    <label>
      Country
      <select [formField]="addressForm.country">
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
    </label>

    <label>
      Zip/Postal Code
      <input [formField]="addressForm.zipCode" />
    </label>
  `,
})
export class Address {
  addressModel = signal({
    country: 'US',
    zipCode: '',
  });

  addressForm = form(this.addressModel, (schemaPath) => {
    applyWhen(
      schemaPath,
      ({valueOf}) => valueOf(schemaPath.country) === 'US',
      (schemaPath) => {
        // 국가가 US인 경우에만 적용됩니다.
        required(schemaPath.zipCode);
        pattern(schemaPath.zipCode, /^\d{5}(-\d{4})?$/);
      },
    );
  });
}
```

The `applyWhen()` function receives:

1. A path to apply logic to (often the root form path)
2. A reactive logic function that returns `true` (apply) or `false` (don't apply)
3. A schema function that defines the conditional rules

The conditional rules only run when the condition is true. This is useful for complex forms where validation rules or behavior changes based on user choices.
-->

`applyWhen()`을 활용하면 규칙 일부를 그룹으로 묶어 한 번에 조건부로 적용할 수 있습니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, applyWhen, required, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-address',
  imports: [FormField],
  template: `
    <label>
      Country
      <select [formField]="addressForm.country">
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
    </label>

    <label>
      Zip/Postal Code
      <input [formField]="addressForm.zipCode" />
    </label>
  `,
})
export class Address {
  addressModel = signal({
    country: 'US',
    zipCode: '',
  });

  addressForm = form(this.addressModel, (schemaPath) => {
    applyWhen(
      schemaPath,
      ({valueOf}) => valueOf(schemaPath.country) === 'US',
      (schemaPath) => {
        // 국가가 US인 경우에만 적용됩니다.
        required(schemaPath.zipCode);
        pattern(schemaPath.zipCode, /^\d{5}(-\d{4})?$/);
      },
    );
  });
}
```

`applyWhen()` 함수는 인자를 3개 받습니다:

1. 로직이 적용될 경로
2. `true`나 `false`를 반환하는 반응형 로직 함수
3. 조건부로 적용될 규칙을 정의한 스키마 함수

조건부 규칙은 해당 조건이 `true` 일 때만 실행됩니다.
이 방식은 사용자의 선택에 따라 유효성 검사나 동작이 달라져야 하는 복잡한 폼의 경우에 유용합니다.

<!--
### Reusable schema functions
-->

### 재사용 가능한 스키마 함수

<!--
Extract common rule configurations into reusable functions:

```ts
import {SchemaPath, debounce, metadata, maxLength} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

function emailFieldConfig(path: SchemaPath<string>) {
  debounce(path, 300);
  metadata(path, PLACEHOLDER, () => 'user@example.com');
  maxLength(path, 255);
}

// Use in multiple forms
const contactForm = form(contactModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
  emailFieldConfig(schemaPath.alternateEmail);
});

const registrationForm = form(registrationModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
});
```

This pattern is useful when you have standard field configurations that you use across multiple forms in your application.
-->

유효성 검사 규칙 중 공통된 부분은 재사용 가능하도록 함수로 분리하세요:

```ts
import {SchemaPath, debounce, metadata, maxLength} from '@angular/forms/signals';
import {PLACEHOLDER} from './metadata-keys';

function emailFieldConfig(path: SchemaPath<string>) {
  debounce(path, 300);
  metadata(path, PLACEHOLDER, () => 'user@example.com');
  maxLength(path, 255);
}

// 여러 폼에 재사용합니다
const contactForm = form(contactModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
  emailFieldConfig(schemaPath.alternateEmail);
});

const registrationForm = form(registrationModel, (schemaPath) => {
  emailFieldConfig(schemaPath.email);
});
```

이 방식은 여러 폼에 적용되는 일반적인 필드 환경설정을 구성할 때 유용합니다.

<!--
## Next steps
-->

## 다음 단계

<!--
To learn more about Signal Forms, check out these related guides:

- [Field State Management](guide/forms/signals/field-state-management) - Learn how to use the state signals created by these functions in your templates and component logic
- [Validation](guide/forms/signals/validation) - Learn about validation rules and error handling
- [Custom Controls](guide/forms/signals/custom-controls) - Learn how custom controls can read metadata and state to configure themselves automatically
-->

이런 내용도 확인해 보세요:

- [필드 상태 관리](guide/forms/signals/field-state-management) - 템플릿과 컴포넌트 로직에서 상태 시그널을 어떻게 활용하는지 안내합니다.
- [유효성 검사](guide/forms/signals/validation) - 폼의 유효성을 검사하고 에러가 발생했을 때 처리하는 방법을 안내합니다.
- [커스텀 컨트롤](guide/forms/signals/custom-controls) - 커스텀 폼 컨트롤이 폼 필드의 메타데이터와 상태를 어떻게 활용할 수 있는지 안내합니다.
