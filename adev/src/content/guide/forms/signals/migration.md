<!--
# Migrating existing forms to Signal Forms
-->

<a id="migrating-existing-forms-to-signal-forms"></a>

# 기존 폼을 시그널 폼으로 전환하기

<!--
This guide provides strategies for migrating existing codebases to Signal Forms, focusing on interoperability with
existing Reactive Forms.
-->

이 가이드에서는 기존 반응형 폼과의 연동을 중심으로, 기존 코드를 Signal Forms로 전환하는 방법을 알아봅니다.

<!--
## Top-down migration using `compatForm`
-->

<a id="top-down-migration-using-compatform"></a>

## `compatForm`으로 상위 폼부터 전환하기

<!--
Sometimes you may want to use existing reactive `FormControl` instances within a Signal Form. This is useful for
controls that involve:

- Complex asynchronous logic.
- Intricate RxJS operators that are not yet ported.
- Integration with existing third-party libraries.
-->

기존 반응형 `FormControl` 인스턴스를 Signal Form 안에서 사용해야 할 때가 있습니다.
다음과 같은 컨트롤에 유용합니다:

- 복잡한 비동기 로직이 있는 컨트롤
- 아직 전환하지 않은 복잡한 RxJS 연산자를 사용하는 컨트롤
- 기존 서드 파티 라이브러리와 연동하는 컨트롤

<!--
### Integrating a `FormControl` into a signal form
-->

<a id="integrating-a-formcontrol-into-a-signal-form"></a>

### Signal Form에 `FormControl` 통합하기

<!--
Consider an existing `passwordControl` that uses a specialized `enterprisePasswordValidator`. Instead of rewriting the
validator, you can bridge the control into your signal state.

We can do it using `compatForm`:

```typescript
import {signal} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';

// 1. Existing control with a specialized validator
const passwordControl = new FormControl('', {
  validators: [Validators.required, enterprisePasswordValidator()],
  nonNullable: true,
});

// 2. Wrap it inside your form state signal
const user = signal({
  email: '',
  password: passwordControl, // Nest the existing control directly
});

// 3. Create the form
const f = compatForm(user);

// Access values via the signal tree
console.log(f.email().value()); // Current email value
console.log(f.password().value()); // Current value of passwordControl

// Reactive state is proxied automatically
const isPasswordValid = f.password().valid();
const passwordErrors = f.password().errors(); // Returns CompatValidationError if the existing validator fails
```

In the template, use standard reactive syntax by binding the underlying control:

```angular-html
<form novalidate>
  <div>
    <label>
      Email:
      <input [formField]="f.email" />
    </label>
  </div>

  <div>
    <label>
      Password:
      <input [formField]="f.password" type="password" />
    </label>

    @if (f.password().touched() && f.password().invalid()) {
      <div class="error-list">
        @for (error of f.password().errors(); track error) {
          <p>{{ error.message || error.kind }}</p>
        }
      </div>
    }
  </div>
</form>
```

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.html"/>
</docs-code-multifile>
-->

특수한 `enterprisePasswordValidator`를 사용하는 기존 `passwordControl`이 있다고 해봅시다.
검증 함수를 다시 작성하는 대신 이 컨트롤을 시그널 상태에 연결할 수 있습니다.

`compatForm`을 사용하면 됩니다:

```typescript
import {signal} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';

// 1. 특수한 검증 함수를 사용하는 기존 컨트롤입니다.
const passwordControl = new FormControl('', {
  validators: [Validators.required, enterprisePasswordValidator()],
  nonNullable: true,
});

// 2. 폼 상태 시그널 안에 포함합니다.
const user = signal({
  email: '',
  password: passwordControl, // 기존 컨트롤을 그대로 중첩합니다.
});

// 3. 폼을 생성합니다.
const f = compatForm(user);

// 시그널 트리로 값에 접근합니다.
console.log(f.email().value()); // 현재 이메일 값
console.log(f.password().value()); // passwordControl의 현재 값

// 반응형 폼 상태를 자동으로 연결합니다.
const isPasswordValid = f.password().valid();
const passwordErrors = f.password().errors(); // 기존 검증 함수를 통과하지 못하면 CompatValidationError를 반환합니다.
```

템플릿에서는 기존 컨트롤에 바인딩하는 일반적인 반응형 폼 문법을 사용합니다:

```angular-html
<form novalidate>
  <div>
    <label>
      Email:
      <input [formField]="f.email" />
    </label>
  </div>

  <div>
    <label>
      Password:
      <input [formField]="f.password" type="password" />
    </label>

    @if (f.password().touched() && f.password().invalid()) {
      <div class="error-list">
        @for (error of f.password().errors(); track error) {
          <p>{{ error.message || error.kind }}</p>
        }
      </div>
    }
  </div>
</form>
```

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/compat-form-control-integration/app/app.html"/>
</docs-code-multifile>

<!--
### Integrating a `FormGroup` into a signal form
-->

<a id="integrating-a-formgroup-into-a-signal-form"></a>

### Signal Form에 `FormGroup` 통합하기

<!--
You can also wrap an entire `FormGroup`. This is common when a reusable sub-section of a form—such as an
**Address Block**—is still managed by existing Reactive Forms.

```typescript
import {signal} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';

// 1. An existing address group with its own validation logic
const addressGroup = new FormGroup({
  street: new FormControl('123 Angular Way', Validators.required),
  city: new FormControl('Mountain View', Validators.required),
  zip: new FormControl('94043', Validators.required),
});

// 2. Include it in the state like it's a value
const checkoutModel = signal({
  customerName: 'Pirojok the Cat',
  shippingAddress: addressGroup,
});

const f = compatForm(checkoutModel, (p) => {
  required(p.customerName);
});
```

The `shippingAddress` field acts as a branch in your Signal Form tree. You can bind these nested controls in your
template by accessing the underlying existing controls via `.control()`:

```angular-html
<form novalidate>
  <h3>Shipping Details</h3>

  <div>
    <label>
      Customer Name:
      <input [formField]="f.customerName" />
    </label>

    @if (f.customerName().touched() && f.customerName().invalid()) {
      <div class="error-list">
        <p>Customer name is required.</p>
      </div>
    }
  </div>

  <fieldset>
    <legend>Address</legend>

    @let street = f.shippingAddress().control().controls.street;
    <div>
      <label>
        Street:
        <input [formControl]="street" />
      </label>
      @if (street.touched && street.invalid) {
        <div class="error-list">
          <p>Street is required</p>
        </div>
      }
    </div>

    @let city = f.shippingAddress().control().controls.city;
    <div>
      <label>
        City:
        <input [formControl]="city" />
      </label>
      @if (city.touched && city.invalid) {
        <div class="error-list">
          <p>City is required</p>
        </div>
      }
    </div>

    @let zip = f.shippingAddress().control().controls.zip;
    <div>
      <label>
        Zip Code:
        <input [formControl]="zip" />
      </label>
      @if (zip.touched && zip.invalid) {
        <div class="error-list">
          <p>Zip Code is required</p>
        </div>
      }
    </div>
  </fieldset>
</form>
```

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.html"/>
</docs-code-multifile>
-->

`FormGroup` 전체를 감쌀 수도 있습니다.
**주소 입력 영역**처럼 재사용하는 폼의 일부를 여전히 기존 반응형 폼으로 관리하는 경우에 자주 사용하는 방식입니다.

```typescript
import {signal} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {compatForm} from '@angular/forms/signals/compat';

// 1. 자체 유효성 검사 로직이 있는 기존 주소 그룹입니다.
const addressGroup = new FormGroup({
  street: new FormControl('123 Angular Way', Validators.required),
  city: new FormControl('Mountain View', Validators.required),
  zip: new FormControl('94043', Validators.required),
});

// 2. 하나의 값처럼 상태에 포함합니다.
const checkoutModel = signal({
  customerName: 'Pirojok the Cat',
  shippingAddress: addressGroup,
});

const f = compatForm(checkoutModel, (p) => {
  required(p.customerName);
});
```

`shippingAddress` 필드는 Signal Form 트리의 한 갈래가 됩니다.
`.control()`로 내부의 기존 컨트롤에 접근해서 템플릿에 중첩 컨트롤을 바인딩할 수 있습니다:

```angular-html
<form novalidate>
  <h3>Shipping Details</h3>

  <div>
    <label>
      Customer Name:
      <input [formField]="f.customerName" />
    </label>

    @if (f.customerName().touched() && f.customerName().invalid()) {
      <div class="error-list">
        <p>Customer name is required.</p>
      </div>
    }
  </div>

  <fieldset>
    <legend>Address</legend>

    @let street = f.shippingAddress().control().controls.street;
    <div>
      <label>
        Street:
        <input [formControl]="street" />
      </label>
      @if (street.touched && street.invalid) {
        <div class="error-list">
          <p>Street is required</p>
        </div>
      }
    </div>

    @let city = f.shippingAddress().control().controls.city;
    <div>
      <label>
        City:
        <input [formControl]="city" />
      </label>
      @if (city.touched && city.invalid) {
        <div class="error-list">
          <p>City is required</p>
        </div>
      }
    </div>

    @let zip = f.shippingAddress().control().controls.zip;
    <div>
      <label>
        Zip Code:
        <input [formControl]="zip" />
      </label>
      @if (zip.touched && zip.invalid) {
        <div class="error-list">
          <p>Zip Code is required</p>
        </div>
      }
    </div>
  </fieldset>
</form>
```

<docs-code-multifile preview path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/signal-forms/src/compat-form-group-integration/app/app.html"/>
</docs-code-multifile>

<!--
### Accessing values
-->

<a id="accessing-values"></a>

### 값에 접근하기

<!--
While `compatForm` proxies value access on the `FormControl` level, the full form value preserves the control:

```typescript
const passwordControl = new FormControl('password' /** ... */);

const user = signal({
  email: '',
  password: passwordControl, // Nest the existing control directly
});

const form = compatForm(user);
form.password().value(); // 'password'
form().value(); // { email: '', password: FormControl}
```

If you need the whole form value, you'd have to build it manually:

```typescript
const formValue = computed(() => ({
  email: form.email().value(),
  password: form.password().value(),
})); // {email: '', password: ''}
```
-->

`compatForm`은 `FormControl` 수준에서 값에 대한 접근을 대신 처리하지만, 폼 전체의 값에는 컨트롤 자체가 유지됩니다:

```typescript
const passwordControl = new FormControl('password' /** ... */);

const user = signal({
  email: '',
  password: passwordControl, // 기존 컨트롤을 그대로 중첩합니다.
});

const form = compatForm(user);
form.password().value(); // 'password'
form().value(); // { email: '', password: FormControl}
```

폼 전체의 값이 필요하다면 직접 구성해야 합니다:

```typescript
const formValue = computed(() => ({
  email: form.email().value(),
  password: form.password().value(),
})); // {email: '', password: ''}
```

<!--
## Bottom-up migration
-->

<a id="bottom-up-migration"></a>

## 하위 컨트롤부터 전환하기

<!--
### Integrating a Signal Form into a `FormGroup`
-->

<a id="integrating-a-signal-form-into-a-formgroup"></a>

### `FormGroup`에 Signal Form 통합하기

<!--
You can use `SignalFormControl` to expose a signal-based form as a standard `FormControl`. This is useful when you want
to migrate leaf nodes of a form to Signals while keeping the parent `FormGroup` structure.

```typescript
import {Component, signal} from '@angular/core';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {required} from '@angular/forms/signals';

@Component({
  // ...
  imports: [ReactiveFormsModule],
})
export class UserProfile {
  // 1. Create a SignalFormControl, use signal form rules.
  emailControl = new SignalFormControl('', (p) => {
    required(p, {message: 'Email is required'});
  });

  // 2. Use it in an existing FormGroup
  form = new FormGroup({
    email: this.emailControl,
  });
}
```

The `SignalFormControl` synchronizes values bi-directionally between the **Signal Forms** system and the **Reactive Forms** system:

- **Signal -> Reactive**: Updating the value via Signal Forms updates the Reactive Form control immediately.

```typescript
// Signal Forms update
this.emailControl.fieldTree().value.set('new@example.com');

// Reactive Forms reflects the change
console.log(this.form.value); // {email: 'new@example.com'}
```

- **Reactive -> Signal**: Updating the value via the parent `FormGroup` updates the Signal Forms state.

```typescript
// Reactive Forms update
this.form.patchValue({email: 'other@example.com'});

// Signal Forms reflects the change
console.log(this.emailControl.fieldTree().value()); // 'other@example.com'
```
-->

`SignalFormControl`을 사용하면 시그널 기반 폼을 일반적인 `FormControl`로 제공할 수 있습니다.
상위 `FormGroup` 구조를 유지하면서 폼의 말단 노드부터 시그널로 전환할 때 유용합니다.

```typescript
import {Component, signal} from '@angular/core';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {required} from '@angular/forms/signals';

@Component({
  // ...
  imports: [ReactiveFormsModule],
})
export class UserProfile {
  // 1. SignalFormControl을 만들고 Signal Forms 규칙을 사용합니다.
  emailControl = new SignalFormControl('', (p) => {
    required(p, {message: 'Email is required'});
  });

  // 2. 기존 FormGroup에서 사용합니다.
  form = new FormGroup({
    email: this.emailControl,
  });
}
```

`SignalFormControl`은 **Signal Forms**와 **반응형 폼** 사이에서 값을 양방향으로 동기화합니다:

- **시그널 → 반응형 폼**: Signal Forms로 값을 변경하면 반응형 폼 컨트롤에 즉시 반영됩니다.

```typescript
// Signal Forms에서 값을 변경합니다.
this.emailControl.fieldTree().value.set('new@example.com');

// 반응형 폼에 변경 사항이 반영됩니다.
console.log(this.form.value); // {email: 'new@example.com'}
```

- **반응형 폼 → 시그널**: 상위 `FormGroup`으로 값을 변경하면 Signal Forms 상태에 반영됩니다.

```typescript
// 반응형 폼에서 값을 변경합니다.
this.form.patchValue({email: 'other@example.com'});

// Signal Forms에 변경 사항이 반영됩니다.
console.log(this.emailControl.fieldTree().value()); // 'other@example.com'
```

<!--
### Binding `SignalFormControl`
-->

<a id="binding-signalformcontrol"></a>

### `SignalFormControl` 바인딩하기

<!--
To use `SignalFormControl` in a `FormGroup`, pass it as a control and bind it in the template using `.fieldTree`:

```typescript
readonly emailControl = new SignalFormControl('', (p) => { required(p); });

readonly form = new FormGroup({
  name: new FormControl('Alice'),
  email: this.emailControl,
});
```

```angular-html {prefer}
<form [formGroup]="form">
  <!- Standard control ->
  <input formControlName="name" />

  <!- Signal control ->
  <input [formField]="emailControl.fieldTree" />
</form>
```

```angular-html {avoid}
<!- Avoid: Using formControlName or [formControl] for SignalFormControl ->
<input formControlName="email" />
<input [formControl]="emailControl" />
```
-->

`FormGroup`에서 `SignalFormControl`을 사용하려면 컨트롤로 전달하고, 템플릿에서는 `.fieldTree`로 바인딩합니다:

```typescript
readonly emailControl = new SignalFormControl('', (p) => { required(p); });

readonly form = new FormGroup({
  name: new FormControl('Alice'),
  email: this.emailControl,
});
```

```angular-html {prefer}
<form [formGroup]="form">
  <!-- 일반 컨트롤 -->
  <input formControlName="name" />

  <!-- 시그널 컨트롤 -->
  <input [formField]="emailControl.fieldTree" />
</form>
```

```angular-html {avoid}
<!-- 피해야 하는 방식: SignalFormControl에 formControlName이나 [formControl] 사용하기 -->
<input formControlName="email" />
<input [formControl]="emailControl" />
```

<!--
### Why `SignalFormControl` takes a value instead of a signal
-->

<a id="why-signalformcontrol-takes-a-value-instead-of-a-signal"></a>

### `SignalFormControl`이 시그널 대신 값을 받는 이유

<!--
In standard Signal Forms, you create a form by passing a signal: `form(mySignal)`.

However, `SignalFormControl` takes a **raw value** (like a string or object) as its first argument:

```typescript
// Takes a raw value, not a signal
const userControl = new SignalFormControl({
  email: 'pirojok@example.com',
});
```

`SignalFormControl` creates the signal internally to intercept writes and trigger the **synchronous updates** expected by Reactive Forms.

You can still access the internal signal via `.sourceValue`:

```typescript
const value = userControl.sourceValue();
```
-->

일반적인 Signal Forms에서는 `form(mySignal)`처럼 시그널을 전달해서 폼을 생성합니다.

하지만 `SignalFormControl`은 첫 번째 인자로 문자열이나 객체 같은 **값 자체**를 받습니다:

```typescript
// 시그널이 아닌 값 자체를 받습니다.
const userControl = new SignalFormControl({
  email: 'pirojok@example.com',
});
```

`SignalFormControl`은 내부에서 시그널을 생성해서 값 쓰기를 가로채고, 반응형 폼에서 기대하는 **동기 방식의 갱신**을 실행합니다.

내부 시그널에는 `.sourceValue`로 접근할 수 있습니다:

```typescript
const value = userControl.sourceValue();
```

<!--
### Disabling/Enabling control
-->

<a id="disablingenabling-control"></a>

### 컨트롤 비활성화와 활성화

<!--
Imperative APIs for changing the enabled/disabled state (like `enable()`, `disable()`) are intentionally not supported
in `SignalFormControl`. This is because the state of the control should be derived from the signal state and rules.

Attempting to call disable/enable would throw an error.

```typescript {avoid}
import {signal, effect} from '@angular/core';

export class UserProfile {
  readonly emailControl = new SignalFormControl('');

  readonly isLoading = signal(false);

  constructor() {
    // This will throw an error
    effect(() => {
      if (this.isLoading()) {
        this.emailControl.disable();
      } else {
        this.emailControl.enable();
      }
    });
  }
}
```

Instead, use disabled rule:

```typescript {prefer}
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {disabled} from '@angular/forms/signals';

export class UserProfile {
  readonly isLoading = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // The control becomes disabled whenever isLoading is true
    disabled(p, {when: () => this.isLoading()});
  });

  async saveData() {
    this.isLoading.set(true);
    // ... perform save ...
    this.isLoading.set(false);
  }
}
```
-->

`SignalFormControl`은 `enable()`, `disable()`처럼 활성화/비활성화 상태를 명령형으로 변경하는 API를 의도적으로 지원하지 않습니다.
컨트롤 상태는 시그널 상태와 규칙에서 도출되어야 하기 때문입니다.

활성화나 비활성화 메서드를 실행하면 에러가 발생합니다.

```typescript {avoid}
import {signal, effect} from '@angular/core';

export class UserProfile {
  readonly emailControl = new SignalFormControl('');

  readonly isLoading = signal(false);

  constructor() {
    // 에러가 발생합니다.
    effect(() => {
      if (this.isLoading()) {
        this.emailControl.disable();
      } else {
        this.emailControl.enable();
      }
    });
  }
}
```

대신 비활성화 규칙을 사용하세요:

```typescript {prefer}
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {disabled} from '@angular/forms/signals';

export class UserProfile {
  readonly isLoading = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // isLoading이 true이면 컨트롤이 비활성화됩니다.
    disabled(p, {when: () => this.isLoading()});
  });

  async saveData() {
    this.isLoading.set(true);
    // ... 저장을 수행합니다 ...
    this.isLoading.set(false);
  }
}
```

<!--
### Dynamic manipulation
-->

<a id="dynamic-manipulation"></a>

### 동적으로 조작하기

<!--
Imperative APIs for adding or removing validators (like `addValidators()`, `removeValidators()`, `setValidators()`) are
intentionally not supported in `SignalFormControl`.

Attempting to call these methods will throw an error.

```typescript {avoid}
export class UserProfile {
  readonly emailControl = new SignalFormControl('');
  readonly isRequired = signal(false);

  toggleRequired() {
    this.isRequired.update((v) => !v);
    // This will throw an error
    if (this.isRequired()) {
      this.emailControl.addValidators(Validators.required);
    } else {
      this.emailControl.removeValidators(Validators.required);
    }
  }
}
```

Instead, use `applyWhen` rule to conditionally apply validators:

```typescript {prefer}
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {applyWhen, required} from '@angular/forms/signals';

export class UserProfile {
  readonly isRequired = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // The control becomes required whenever isRequired is true
    applyWhen(
      p,
      () => this.isRequired(),
      (p) => {
        required(p);
      },
    );
  });
}
```
-->

`SignalFormControl`은 `addValidators()`, `removeValidators()`, `setValidators()`처럼 검증 함수를 명령형으로 추가하거나 제거하는 API를 의도적으로 지원하지 않습니다.

이 메서드들을 실행하면 에러가 발생합니다.

```typescript {avoid}
export class UserProfile {
  readonly emailControl = new SignalFormControl('');
  readonly isRequired = signal(false);

  toggleRequired() {
    this.isRequired.update((v) => !v);
    // 에러가 발생합니다.
    if (this.isRequired()) {
      this.emailControl.addValidators(Validators.required);
    } else {
      this.emailControl.removeValidators(Validators.required);
    }
  }
}
```

대신 `applyWhen` 규칙으로 조건에 따라 검증 함수를 적용하세요:

```typescript {prefer}
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {applyWhen, required} from '@angular/forms/signals';

export class UserProfile {
  readonly isRequired = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // isRequired가 true이면 필수 컨트롤이 됩니다.
    applyWhen(
      p,
      () => this.isRequired(),
      (p) => {
        required(p);
      },
    );
  });
}
```

<!--
### Manual Error Selection
-->

<a id="manual-error-selection"></a>

### 에러를 수동으로 지정하기

<!--
The `setErrors()` and `markAsPending()` methods are not supported. In Signal Forms, errors are derived from validation
rules and async validation status. If you need to report an error, it should be done declaratively via a validation rule
in the schema.
-->

`setErrors()`와 `markAsPending()` 메서드는 지원하지 않습니다.
Signal Forms에서는 유효성 검사 규칙과 비동기 유효성 검사 상태에 따라 에러가 결정됩니다.
에러를 표시해야 한다면 스키마의 유효성 검사 규칙을 통해 선언적으로 지정해야 합니다.

<!--
## Automatic status classes
-->

<a id="automatic-status-classes"></a>

## 상태 클래스 자동 적용하기

<!--
Reactive/Template Forms automatically adds [class attributes](/guide/forms/template-driven-forms#track-control-states) (
such as `.ng-valid` or `.ng-dirty`) to facilitate styling control states. Signal Forms does not do that.

If you want to preserve this behavior, you can provide the `NG_STATUS_CLASSES` preset:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';
import {NG_STATUS_CLASSES} from '@angular/forms/signals/compat';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: NG_STATUS_CLASSES,
    }),
  ],
});
```

You can also provide your own custom configuration to apply whatever classes you wish based on you custom logic:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: {
        'ng-valid': ({state}) => state().valid(),
        'ng-invalid': ({state}) => state().invalid(),
        'ng-touched': ({state}) => state().touched(),
        'ng-dirty': ({state}) => state().dirty(),
      },
    }),
  ],
});
```
-->

반응형 폼과 템플릿 기반 폼은 컨트롤 상태에 따라 스타일을 쉽게 적용할 수 있도록 `.ng-valid`, `.ng-dirty`와 같은 [클래스 어트리뷰트](/guide/forms/template-driven-forms#track-control-states)를 자동으로 추가합니다.
Signal Forms는 이 클래스를 자동으로 추가하지 않습니다.

기존 동작을 유지하려면 `NG_STATUS_CLASSES` 프리셋을 제공하면 됩니다:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';
import {NG_STATUS_CLASSES} from '@angular/forms/signals/compat';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: NG_STATUS_CLASSES,
    }),
  ],
});
```

직접 작성한 설정을 제공해서 원하는 로직에 따라 원하는 클래스를 적용할 수도 있습니다:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: {
        'ng-valid': ({state}) => state().valid(),
        'ng-invalid': ({state}) => state().invalid(),
        'ng-touched': ({state}) => state().touched(),
        'ng-dirty': ({state}) => state().dirty(),
      },
    }),
  ],
});
```
