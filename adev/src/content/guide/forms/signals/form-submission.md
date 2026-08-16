<!--
# Form submission
-->

# 폼 제출

<!--
When a user submits a form, your application typically needs to handle multiple concerns at once: surfacing validation errors, preventing duplicate submission, sending data to a server, and much more. Handling each of these manually can be tedious and prone to error.

Signal Forms provides a `submit()` function that helps you manage the form submission lifecycle. This guide walks through how to use it.
-->

사용자가 폼을 제출하면 애플리케이션은 보통 여러 작업을 동시에 처리해야 합니다: 유효성 검사 결과를 표시하고, 중복 제출을 방지해야 하며, 서버로 데이터를 보내는 등의 작업이 그렇습니다.
이런 작업을 각각 수동으로 처리하는 것은 번거로운 일이며, 오류 가능성도 올리는 일입니다.

시그널 폼은 폼 제출 과정을 단순하게 관리하도록 `submit()` 함수를 제공합니다.
이 문서에서는 `submit()` 함수의 사용 방법을 알아봅시다.

<!--
## What does `submit()` do?
-->

## `submit()` 함수는 뭘 하나요?

<!--
The `submit()` function runs through a specific sequence:

1. **Mark interactive fields as touched** — Fields that display errors only after being touched will now show their validation errors. Hidden, disabled, and readonly fields are skipped.
1. **Check validation** — If any validation rules have failed, submission stops and the `action` function does not run.
1. **Run the action** — The `action` function executes with the form's current value. While it runs, `submitting()` returns `true`.
1. **Handle the result** — If the action returns errors, they are routed to their target fields. If it returns nothing, the submission is treated as successful.

The `submit()` function returns a `Promise<boolean>` that resolves to `true` when the action completes without errors, and `false` when validation fails or the action returns errors.
-->

`submit()` 함수는 이런 과정을 수행합니다:

1. **모든 필드를 `touched` 상태로 바꿉니다** — 필드에서 발생한 에러는 `touched` 상태일 때만 오류가 표시되지만, 이제는 전체 에러가 표시됩니다. 숨겨진 필드, 비활성화된 필드, 읽기 전용 필드의 유효성 검사는 생략합니다.
1. **유효성 검사를 실행합니다** — 유효성 검사가 실패하면 폼 제출을 멈추고 `action` 함수가 실행되지 않습니다.
1. **`action` 함수를 실행합니다** — `action` 함수는 폼의 현재 값을 실행합니다. 이 함수가 실행되는 동안 `submitting()` 함수는 `true` 값을 반환합니다.
1. **결과를 처리합니다** — `action` 함수가 에러를 반환하면 오류가 해당 필드로 전달됩니다. 에러가 발생하지 않으면 폼 제출이 처리됩니다.

`submit()` 함수는 `Promise<boolean>` 타입을 반환하는데, `action` 함수가 에러 없이 완료되면 `true`를 반환하며, `action` 함수가 에러를 반환하면 `false`를 반환합니다.

<!--
## Setting up form submission with `FormRoot`
-->

## `FormRoot`에 폼 제출 방법 등록하기

<!--
The most common way to use the `submit()` function is through the `FormRoot` directive.

The `FormRoot` directive handles three things automatically when bound to a `<form>` element:

1. **Sets [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#novalidate)** — Disables the browser's built-in validation so Signal Forms manages validation instead
1. **Prevents default** — Stops the browser from navigating on form submission
1. **Calls `submit()`** — Triggers the submission flow when the user submits the form

NOTE: The `FormRoot` directive sets the `novalidate` attribute on the `form` element automatically. You do not need to add it manually when using `FormRoot`.

`FormRoot` handles the submission event, but you still need to tell it _what to do_ with the form data. That requires three things:

1. Bind your form to the `FormRoot` directive
1. Pass a `submission` option to the `form()` function
1. Define an `action` function within the `submission` option that manages the submitted data

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, FormRoot, required} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="contactForm">
      <label>
        Name
        <input [formField]="contactForm.name" />
      </label>

      <label>
        Email
        <input type="email" [formField]="contactForm.email" />
      </label>

      <button type="submit">Send</button>
    </form>
  `,
})
export class Contact {
  contactModel = signal({
    name: '',
    email: '',
  });

  contactForm = form(
    this.contactModel,
    (schemaPath) => {
      required(schemaPath.name);
      required(schemaPath.email);
    },
    {
      submission: {
        action: async (field) => {
          const result = await saveContact(field().value());
          if (result.ok) return;

          return {kind: 'serverError', message: 'Failed to submit form'};
        },
      },
    },
  );
}
```

The `action` function runs only when no validation rules have failed. By default, pending async validators do not block submission (see [Controlling validation gating](#controlling-validation-gating-with-ignorevalidators) for more details). The action receives the field tree and a `detail` object with `root` and `submitted` field trees, which is useful when submitting a sub-form.

After validation passes, the action itself may still fail due to scenarios such as a network error or duplicate entry. In those cases, you can surface the failure by returning the error(s). On the other hand, to indicate success, you only need to return `null` or `undefined`, or call an empty `return`.
-->

`submit()` 함수를 사용하는 가장 일반적인 방법은 `FormRoot` 디렉티브를 통하는 것입니다.

`FormRoot` 디렉티브가 `<form>` 엘리먼트에 바인딩되면 다음 작업을 자동으로 처리합니다:

1. **[`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#novalidate)를 설정합니다** — 브라우저의 기본 유효성 검사를 비활성화하여 시그널 폼이 유효성 검사를 처리하도록 합니다.
1. **기본값 방지** — 브라우저의 내장 폼 제출 기능을 방지합니다
1. **`submit()` 함수를 실행합니다** — Angular의 기능으로 폼을 제출합니다.

참고: `FormRoot` 디렉티브는 `form` 엘리먼트에 `novalidate` 어트리뷰트를 자동으로 지정합니다.
수동으로 지정할 필요는 없습니다.

`FormRoot`가 폼 제출 이벤트를 받더라도 개발자는 폼 데이터로 _무엇을_ 할 지 지정해야 합니다.
일반적으로 3가지가 필요합니다:

1. 폼과 `FormRoot` 디렉티브를 바인딩합니다.
1. `form()` 함수에 `submission` 옵션을 전달합니다.
1. 폼 제출 데이터를 관리하기 위해 `submission` 옵션에 `action` 함수를 정의합니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, FormRoot, required} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="contactForm">
      <label>
        Name
        <input [formField]="contactForm.name" />
      </label>

      <label>
        Email
        <input type="email" [formField]="contactForm.email" />
      </label>

      <button type="submit">Send</button>
    </form>
  `,
})
export class Contact {
  contactModel = signal({
    name: '',
    email: '',
  });

  contactForm = form(
    this.contactModel,
    (schemaPath) => {
      required(schemaPath.name);
      required(schemaPath.email);
    },
    {
      submission: {
        action: async (field) => {
          const result = await saveContact(field().value());
          if (result.ok) return;

          return {kind: 'serverError', message: 'Failed to submit form'};
        },
      },
    },
  );
}
```

`action` 함수는 유효성 검사가 모두 통과할 때만 실행됩니다.
기본적으로, 비동기 유효성 검사는 폼 제출을 차단하지 않습니다.
자세한 내용은 [유효성 검사 타이밍 제어](#controlling-validation-gating-with-ignorevalidators) 섹션을 참고하세요.
`action` 함수는 필드 트리와 함께 `root`와 `submitted` 필드 트리를 표현하는 `detail` 객체를 인자로 받습니다.

유효성 검사가 통과된 후에도, 네트워크 에러나 중복 오류과 같은 상황으로 `action` 함수는 실패할 수 있습니다.
이런 경우에는 에러를 반환해서 화면에 에러를 표시할 수 있습니다.
반대로, 에러가 아님을 표현하려면 `action` 함수가 `null` 이나 `undefined`을 반환하거나, 빈 값으로 `return` 을 실행하면 됩니다.

<!--
## Showing submission state with `submitting()`
-->

## 폼 제출 상태 표시하기: `submitting()`

<!--
When you need to track whether the form is in the process of submitting, Signal Forms provides a `submitting()` signal that returns `true` while the `action` function is running. Use it to show loading indicators or disable the submit button to prevent duplicate submissions.

```angular-html
<button type="submit" [disabled]="contactForm().submitting()">
  @if (contactForm().submitting()) {
    Sending...
  } @else {
    Send
  }
</button>
```

Once the `action` function succeeds or returns an error, the `submitting()` signal automatically resets back to `false`.
-->

폼 제출이 진행되는 상태를 추적하려면 시그널 폼의 `submitting()` 시그널을 확인하면 됩니다.
`action` 함수가 실행되는 중에는 이 시그널이 `true`를 반환합니다.
이 시그널은 로딩중임을 표시하거나 중복 제출을 막기 위해 폼 제출 버튼을 비활성화 할 때 사용하면 좋습니다.

```angular-html
<button type="submit" [disabled]="contactForm().submitting()">
  @if (contactForm().submitting()) {
    Sending...
  } @else {
    Send
  }
</button>
```

`action` 함수 실행이 완료되거나 에러를 반환하면 `submitting()` 시그널은 `false`를 반환합니다.

<!--
## Managing submission errors
-->

## 폼 제출 에러 관리하기

<!--
### Server errors
-->

### 서버 에러

<!--
When your `action` function communicates with a server, the server may return errors that need to appear on specific fields. Return these errors from the `action` to route them to their target fields.
-->

`action` 함수가 서버와 통신하고 나서 서버가 특정 필드에서 에러가 발생했다고 결과를 반환할 수 있습니다.
이 경우에는 서버에서 받은 에러를 `action`으로 반환해서 화면에 있는 필드에서 에러가 발생했다고 표시하면 됩니다.

<!--
#### Errors on the submitted field
-->

#### 필드 에러

<!--
By default, errors returned from the `action` are assigned to the submitted field (the field tree you passed to `submit()`):

```ts
action: async (field) => {
  const result = await saveContact(field().value());
  if (result.ok) return;

  return {kind: 'serverError', message: 'Failed to submit form'};
};
```
-->

기본적으로 `action` 함수에서 반환하는 에러는 해당 에러가 발생한 필드로 전달됩니다.
`submit()`에 필드 트리를 전달했기 때문입니다:

```ts
action: async (field) => {
  const result = await saveContact(field().value());
  if (result.ok) return;

  return {kind: 'serverError', message: 'Failed to submit form'};
};
```

<!--
#### Errors on specific fields
-->

#### 특정 필드에서 발생한 에러

<!--
When you want to route an error to a specific field, include a `fieldTree` property pointing to that field:

```ts
action: async (field) => {
  const result = await saveContact(field().value());
  if (result.ok) return;

  return {kind: 'taken', message: result.message, fieldTree: field.email};
};
```
-->

에러가 발생한 것을 특정 필드에 표시하려면 `fieldTree` 프로퍼티로 해당 필드를 가리키면 됩니다:

```ts
action: async (field) => {
  const result = await saveContact(field().value());
  if (result.ok) return;

  return {kind: 'taken', message: result.message, fieldTree: field.email};
};
```

<!--
#### Multiple errors
-->

#### 동시에 발생한 에러

<!--
When you want to report errors on multiple fields, return an array:

```ts
action: async (field) => {
  const result = await registerUser(field().value());
  if (result.ok) return;

  return result.errors.map((err: {field: string; message: string}) => ({
    kind: 'serverError',
    message: err.message,
    fieldTree: field[err.field as keyof typeof field],
  }));
};
```
-->

여러 필드에서 에러가 동시에 발생한 것을 표시하려면 에러를 배열 형태로 반환하면 됩니다:

```ts
action: async (field) => {
  const result = await registerUser(field().value());
  if (result.ok) return;

  return result.errors.map((err: {field: string; message: string}) => ({
    kind: 'serverError',
    message: err.message,
    fieldTree: field[err.field as keyof typeof field],
  }));
};
```

<!--
### Auto-clearing submission errors
-->

### 폼 제출 에러 초기화하기

<!--
Submission errors clear automatically when the user edits the field. If the `action` returns an error on the email field, that error disappears as soon as the user changes the email value.

This differs from validation errors, which recompute reactively. Validation rules run again on each change and may produce the same error. Submission errors are one-time results from the server — once cleared, they do not reappear unless the form is submitted again.

TIP: Submission errors appear alongside validation errors in the field's `errors()` signal. For guidance on displaying errors in your template, see the [Field State Management guide](guide/forms/signals/field-state-management).
-->

사용자가 필드값을 수정하면 폼 제출 에러가 자동으로 초기화됩니다.
만약 `email` 필드에서 발생한 에러가 `action`으로 반환되었다면, 사용자가 `email` 필드의 값을 변경하면서 에러가 사라집니다.

사용자가 필드값을 변경했을 때 실행되는 유효성 검사와는 다릅니다.
유효성 검사 규칙은 필드값이 변경될 때마다 실행되며 같은 에러가 계속 발생할 수 있습니다.
폼 제출 에러는 서버에서 결과를 받았을 때 한 번, 필드값을 수정할 때 한 번만 초기화되며, 다시 폼을 제출하기 전까지는 표시되지 않습니다.

팁: 폼 제출 에러는 필드의 `errors()` 시그널로 유효성 검사 에러와 함께 전달됩니다.
템플릿에 에러를 표시하는 방법은 [필드 상태 관리](guide/forms/signals/field-state-management) 문서를 참고하세요.

<!--
## Handling invalid submissions with `onInvalid`
-->

## 유효성 검사 오류 처리하기: `onInvalid`

<!--
When validation fails, the `action` function does not run. If you need to respond to a failed submission attempt — such as scrolling to the first error, showing a toast, or focusing an invalid field — use the `onInvalid` callback.

```ts
contactForm = form(
  this.contactModel,
  (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  },
  {
    submission: {
      action: async (field) => {
        await saveContact(field().value());
      },
      onInvalid: (field) => {
        const firstError = field().errorSummary()[0];
        firstError?.fieldTree().focusBoundControl();
      },
    },
  },
);
```

The `onInvalid` callback receives the same `(field, detail)` parameters as `action`. It runs after all interactive fields are marked as touched, so validation errors are already visible in the UI when it executes.
-->

유효성 검사가 실패하면 `action` 함수는 실행되지 않습니다.
에러가 발생한 첫번째 위치로 이동하거나, 토스트를 표시하고, 오류가 발생한 필드에 포커스를 옮기는 등 폼 제출 단계에서 발생한 에러에 반응할 때는 `onInvalid` 콜백을 사용합니다.

```ts
contactForm = form(
  this.contactModel,
  (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  },
  {
    submission: {
      action: async (field) => {
        await saveContact(field().value());
      },
      onInvalid: (field) => {
        const firstError = field().errorSummary()[0];
        firstError?.fieldTree().focusBoundControl();
      },
    },
  },
);
```

`onInvalid` 콜백 함수는 `action`과 마찬가지로 `(field, detail)` 인자를 받습니다.
`onInvalid` 함수는 모든 필드가 `touched`로 처리된 후 실행되기 때문에, 이 함수가 실행되는 시점에는 화면에 이미 에러가 표시되어 있을 것입니다.

<a id="controlling-validation-gating-with-ignorevalidators"></a>

<!--
## Controlling validation gating with `ignoreValidators`
-->

## 유효성 검사 타이밍 제어하기: `ignoreValidators`

<!--
By default, `submit()` ignores pending validators. If no validators have failed, the action runs even if some async validators are still in progress. The `ignoreValidators` option gives you control over this behavior.

| Value       | Behavior                                                                 |
| ----------- | ------------------------------------------------------------------------ |
| `'pending'` | Submit if no validators have failed, even if some are pending (default)  |
| `'none'`    | Submit only if all validators pass — pending validators block submission |
| `'all'`     | Always submit regardless of validation state                             |

```ts
contactForm = form(
  this.contactModel,
  (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  },
  {
    submission: {
      action: async (field) => {
        await saveContact(field().value());
      },
      ignoreValidators: 'none',
    },
  },
);
```

Use `'none'` when your form has async validators (such as checking username availability) and you need all validation to complete before submitting. Use `'all'` for draft-saving scenarios where you want to persist data regardless of validation state.
-->

기본적으로 `sugmit()`은 진행중인 유효성 검사는 무시합니다.
그리고 실패한 유효성 검사가 없다면, 비동기 유효성 검사가 진행중이더라도 `action`이 실행됩니다.
이 동작을 변경하려면 `ignoreValidators` 옵션을 지정하면 됩니다.

| 값          | 동작                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `'pending'` | 보류 중인 유효성 검사가 있어도, 유효성 검사가 실패하지 않으면 폼을 제출합니다(기본값)                   |
| `'none'`    | 모든 유효성 검사가 통과된 후에 폼을 제출합니다. 비동기 유효성 검사가 진행중이면 폼은 제출되지 않습니다. |
| `'all'`     | 유효성 검사 결과와 관계없이 폼을 제출합니다.                                                            |

```ts
contactForm = form(
  this.contactModel,
  (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  },
  {
    submission: {
      action: async (field) => {
        await saveContact(field().value());
      },
      ignoreValidators: 'none',
    },
  },
);
```

폼에서 사용자 이름을 중복 체크하는 것과 같은 비동기 유효성 검사가 포함되어 있으면 모든 유효성 검사가 종료된 후에 폼을 제출하는 것이 좋습니다.
이 경우에는 `'none'` 값을 사용하세요.
유효성 검사 상태에 관계없이 일단 데이터를 저장해야 하는 경우라면 `'all'` 값을 사용하세요.

<!--
## Manual submission with `submit()`
-->

## 수동 폼 제출: `submit()`

<!--
The `FormRoot` directive is the most common way to trigger submission, but you can also call `submit()` directly. This is useful for multi-step wizards, auto-save, or triggering submission from outside the form element.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, submit} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  template: `
    <label>
      Name
      <input [formField]="contactForm.name" />
    </label>

    <label>
      Email
      <input type="email" [formField]="contactForm.email" />
    </label>

    <button (click)="onSave()">Save</button>
  `,
})
export class Contact {
  contactModel = signal({
    name: '',
    email: '',
  });

  contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  });

  async onSave() {
    // When calling `submit()` directly, you pass the action as the second argument
    // instead of configuring it in `FormOptions`.
    const success = await submit(this.contactForm, async (field) => {
      const result = await saveContact(field().value());
      if (result.ok) return;

      return {kind: 'serverError', message: 'Failed to save'};
    });

    if (success) {
      // Handle success — navigate, show confirmation, etc.
    }
  }
}
```
-->

일반적으로 폼을 제출하려면 `FormRoot` 디렉티브를 사용하지만, `submit()`을 직접 실행할 수도 있습니다.
여러 단계로 구성된 마법사, 자동 저장, 폼 엘리먼트 밖에서 폼 제출을 제어할 때 이 방식이 유용합니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, submit} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  template: `
    <label>
      Name
      <input [formField]="contactForm.name" />
    </label>

    <label>
      Email
      <input type="email" [formField]="contactForm.email" />
    </label>

    <button (click)="onSave()">Save</button>
  `,
})
export class Contact {
  contactModel = signal({
    name: '',
    email: '',
  });

  contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
  });

  async onSave() {
    // `submit()`을 직접 실행하면, 두번째 인자로 `FormOptions` 대신 실행 함수를 전달합니다.
    const success = await submit(this.contactForm, async (field) => {
      const result = await saveContact(field().value());
      if (result.ok) return;

      return {kind: 'serverError', message: 'Failed to save'};
    });

    if (success) {
      // 폼 제출에 성공했을 때 로직을 작성합니다 — 화면 이동, 확인 메시지 등
    }
  }
}
```

<!--
## Handling side effects
-->

## 추가 동작 실행하기

<!--
The `submit()` function returns a `Promise<boolean>` — `true` when the action completes without errors, `false` when validation fails or the action returns errors. Use this to trigger side effects like navigation or notifications.

```ts
async onSave() {
  const success = await submit(this.contactForm, async (field) => {
    await saveContact(field().value());
  });

  if (success) {
    await this.router.navigate(['/confirmation']);
  }
}
```

When the action produces data that a side effect needs, such as a server-generated ID, handle the side effect inside the action:

```ts
async onSave() {
  await submit(this.contactForm, async (field) => {
    const contact = await createContact(field().value());
    await this.router.navigate(['/confirmation', contact.id]);
  });
}
```

When using `FormRoot`, side effects also go inside the `action` since `FormRoot` calls `submit()` internally:

```ts
submission: {
  action: async (field) => {
    const result = await saveContact(field().value());
    if (result.ok) {
      await this.router.navigate(['/confirmation']);
      return;
    }

    return {kind: 'serverError', message: 'Failed to submit form'};
  },
}
```
-->

`submit()` 함수는 `Promise<boolean>`을 반환하는데, `action`이 에러 없이 종료되면 `true`를 반환하고, 에러가 발생하면 `false` 를 반환합니다.
네비게이션이나 사용자 알림을 수행하려면 이 방식을 활용하면 됩니다.

```ts
async onSave() {
  const success = await submit(this.contactForm, async (field) => {
    await saveContact(field().value());
  });

  if (success) {
    await this.router.navigate(['/confirmation']);
  }
}
```

추가 동작을 실행하면서 데이터를 전달하려면 함수 안에서 처리하면 됩니다:

```ts
async onSave() {
  await submit(this.contactForm, async (field) => {
    const contact = await createContact(field().value());
    await this.router.navigate(['/confirmation', contact.id]);
  });
}
```

`formRoot`를 사용할 때는 `action`은 `FormRoot`가 `submit()`을 실행하는 것과 마찬가지로 동작합니다:

```ts
submission: {
  action: async (field) => {
    const result = await saveContact(field().value());
    if (result.ok) {
      await this.router.navigate(['/confirmation']);
      return;
    }

    return {kind: 'serverError', message: 'Failed to submit form'};
  },
}
```

<!--
## Concurrent submissions
-->

## 동시 제출

<!--
When a submission is in progress, subsequent calls to `submit()` for the same form or any of its parents return `false` immediately without running the action. This prevents duplicate submissions and side effects if a user triggers the submit action multiple times quickly.
-->

폼 제출이 진행중일 때 같은 폼이나 부모 폼에서 다시 한 번 `submit()`을 실행하면 폼 제출 함수가 실행되지 않고 `false` 값을 즉시 반환합니다.
이 동작은 사용자가 폼 제출 버튼을 빠르게 여러번 누르는 경우 발생할 수 있는 폼 중복 제출을 방지하기 위한 것입니다.

<!--
## Next steps
-->

## 다음 단계

<!--
This guide covered submitting forms and handling form submission errors. Related guides explore other aspects of Signal Forms:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/form-logic" title="Adding form logic" />
</docs-pill-row>
-->

이 문서에서는 폼을 제출하고 그 과정에서 발생하는 에러를 처리하는 방법을 알아봤습니다.
이런 내용도 확인해 보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/form-logic" title="폼 로직" />
</docs-pill-row>
