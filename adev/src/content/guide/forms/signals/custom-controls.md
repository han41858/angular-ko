<!--
# Custom Controls
-->

<a id="custom-controls"></a>

# 커스텀 컨트롤

<!--
NOTE: This guide assumes familiarity with [Signal Forms essentials](essentials/signal-forms).

The browser's built-in form controls (like input, select, textarea) handle common cases, but applications often need specialized inputs. A date picker with calendar UI, a rich text editor with formatting toolbar, or a tag selector with autocomplete all require custom implementations.

Signal Forms works with any component that implements specific interfaces. A **control interface** defines the properties and signals that allow your component to communicate with the form system. When your component implements one of these interfaces, the `[formField]` directive automatically connects your control to form state, validation, and data binding.
-->

참고: 이 문서는 [Signal Forms 핵심 가이드](essentials/signal-forms)의 내용을 이해하고 있다고 가정합니다.

브라우저에 내장된 폼 컨트롤(input, select, textarea 등)은 일반적인 입력을 처리할 수 있지만, 애플리케이션에 따라 특별한 입력 기능이 필요할 때가 있습니다.
달력 UI가 있는 날짜 선택기, 서식 도구 모음이 있는 리치 텍스트 편집기, 자동완성 기능이 있는 태그 선택기 등은 직접 구현해야 합니다.

Signal Forms는 특정 인터페이스를 구현한 컴포넌트와 함께 동작할 수 있습니다.
**컨트롤 인터페이스**는 컴포넌트가 폼 시스템과 통신하는 데 필요한 프로퍼티와 시그널을 정의합니다.
컴포넌트가 이 인터페이스 중 하나를 구현하면, `[formField]` 디렉티브가 컨트롤을 폼 상태, 유효성 검사, 데이터 바인딩에 자동으로 연결합니다.

<!--
HELPFUL: Custom Signal Form Controls [can be used](guide/forms/signals/migration#custom-controls) with Signal, Reactive and Template-Driven Forms without any extra compatibility code.
-->

도움말: 커스텀 Signal Form 컨트롤은 별도의 호환성 코드 없이 시그널 폼, 반응형 폼, 템플릿 기반 폼에서 [사용할 수 있습니다](guide/forms/signals/migration#custom-controls).

<!--
## Creating a basic custom control
-->

<a id="creating-a-basic-custom-control"></a>

## 기본 커스텀 컨트롤 만들기

<!--
Let's start with a minimal implementation and add features as needed.
-->

최소한의 기능부터 구현하고, 필요한 기능을 하나씩 추가해 봅시다.

<!--
### Minimal input control
-->

<a id="minimal-input-control"></a>

### 기본 입력 컨트롤

<!--
A basic custom input only needs to implement the `FormValueControl` interface and define the required `value` model signal.

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-input',
  template: `
    <div class="basic-input">
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        placeholder="Enter text..."
      />
    </div>
  `,
})
export class BasicInput implements FormValueControl<string> {
  /** The current input value */
  value = model('');
}
```
-->

기본 입력 컨트롤을 만들려면 `FormValueControl` 인터페이스를 구현하고, 필수 프로퍼티인 `value` 모델 시그널을 정의하면 됩니다.

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-input',
  template: `
    <div class="basic-input">
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        placeholder="Enter text..."
      />
    </div>
  `,
})
export class BasicInput implements FormValueControl<string> {
  /** 현재 입력 값 */
  value = model('');
}
```

<!--
### Minimal checkbox control
-->

<a id="minimal-checkbox-control"></a>

### 기본 체크박스 컨트롤

<!--
A checkbox-style control needs two things:

1. Implement the `FormCheckboxControl` interface so the `FormField` directive will recognize it as a form control
2. Provide a `checked` model signal

```angular-ts
import {Component, model, ChangeDetectionStrategy} from '@angular/core';
import {FormCheckboxControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-toggle',
  template: `
    <button type="button" [class.active]="checked()" (click)="toggle()">
      <span class="toggle-slider"></span>
    </button>
  `,
})
export class BasicToggle implements FormCheckboxControl {
  /** Whether the toggle is checked */
  checked = model<boolean>(false);

  toggle() {
    this.checked.update((val) => !val);
  }
}
```
-->

체크박스 형태의 컨트롤에는 다음 두 가지가 필요합니다:

1. `FormField` 디렉티브가 폼 컨트롤로 인식할 수 있도록 `FormCheckboxControl` 인터페이스를 구현합니다.
2. `checked` 모델 시그널을 정의합니다.

```angular-ts
import {Component, model, ChangeDetectionStrategy} from '@angular/core';
import {FormCheckboxControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-toggle',
  template: `
    <button type="button" [class.active]="checked()" (click)="toggle()">
      <span class="toggle-slider"></span>
    </button>
  `,
})
export class BasicToggle implements FormCheckboxControl {
  /** 토글의 선택 여부 */
  checked = model<boolean>(false);

  toggle() {
    this.checked.update((val) => !val);
  }
}
```

<!--
### Using your custom control
-->

<a id="using-your-custom-control"></a>

### 커스텀 컨트롤 사용하기

<!--
Once you've created a control, you can use it anywhere you would use a built-in input by adding the `FormField` directive to it:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {BasicInput} from './basic-input';
import {BasicToggle} from './basic-toggle';

@Component({
  imports: [FormField, BasicInput, BasicToggle],
  template: `
    <form novalidate>
      <label>
        Email
        <app-basic-input [formField]="registrationForm.email" />
      </label>

      <label>
        Accept terms
        <app-basic-toggle [formField]="registrationForm.acceptTerms" />
      </label>

      <button type="submit" [disabled]="registrationForm().invalid()">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    acceptTerms: false,
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.acceptTerms, {message: 'You must accept the terms'});
  });
}
```

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

The `[formField]` directive works identically for custom controls and built-in inputs. Signal Forms treats them the same - validation runs, state updates, and data binding works automatically.
-->

컨트롤을 만든 뒤에는 `FormField` 디렉티브를 추가해서 기본 입력 컨트롤을 사용하는 곳 어디에서나 사용할 수 있습니다:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {BasicInput} from './basic-input';
import {BasicToggle} from './basic-toggle';

@Component({
  imports: [FormField, BasicInput, BasicToggle],
  template: `
    <form novalidate>
      <label>
        Email
        <app-basic-input [formField]="registrationForm.email" />
      </label>

      <label>
        Accept terms
        <app-basic-toggle [formField]="registrationForm.acceptTerms" />
      </label>

      <button type="submit" [disabled]="registrationForm().invalid()">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    acceptTerms: false,
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.acceptTerms, {message: 'You must accept the terms'});
  });
}
```

참고: 스키마 콜백 함수가 받는 인자(이 예제의 `schemaPath`)는 폼의 모든 필드에 대한 경로를 제공하는 `SchemaPathTree` 객체입니다.
이 인자의 이름은 원하는 대로 지정해도 됩니다.

`[formField]` 디렉티브는 커스텀 컨트롤과 기본 입력 컨트롤에서 동일하게 동작합니다.
Signal Forms는 두 컨트롤을 같은 방식으로 처리하기 때문에 유효성 검사, 상태 갱신, 데이터 바인딩이 자동으로 동작합니다.

<!--
## Understanding control interfaces
-->

<a id="understanding-control-interfaces"></a>

## 컨트롤 인터페이스 이해하기

<!--
Now that you've seen custom controls in action, let's explore how they integrate with Signal Forms.
-->

커스텀 컨트롤이 동작하는 방식을 확인했으니, 이제 Signal Forms와 어떻게 연동되는지 알아봅시다.

<!--
### Control interfaces
-->

<a id="control-interfaces"></a>

### 컨트롤 인터페이스

<!--
The `BasicInput` and `BasicToggle` components you created implement specific control interfaces that tell Signal Forms how to interact with them.
-->

앞에서 만든 `BasicInput` 컴포넌트와 `BasicToggle` 컴포넌트는 각각 컨트롤 인터페이스를 구현합니다.
Signal Forms는 이 인터페이스를 통해 각 컴포넌트와 상호작용하는 방법을 알 수 있습니다.

<!--
#### FormValueControl
-->


#### FormValueControl

<!--
`FormValueControl` is the interface for most input types - text inputs, number inputs, date pickers, select dropdowns, and any control that edits a single value. When your component implements this interface:

- **Required property**: Your component must provide a `value` model signal
- **What the FormField directive does**: Binds the form field's value to your control's `value` signal

IMPORTANT: Controls implementing `FormValueControl` must NOT have a `checked` property
-->

`FormValueControl`은 텍스트 입력, 숫자 입력, 날짜 선택기, 드롭다운 선택 목록 등 하나의 값을 편집하는 대부분의 입력 컨트롤에 사용하는 인터페이스입니다.
컴포넌트가 이 인터페이스를 구현하면 다음과 같이 동작합니다:

- **필수 프로퍼티**: 컴포넌트에 `value` 모델 시그널을 정의해야 합니다.
- **FormField 디렉티브의 역할**: 폼 필드의 값을 컨트롤의 `value` 시그널에 바인딩합니다.

중요: `FormValueControl`을 구현한 컨트롤에는 `checked` 프로퍼티가 없어야 합니다.

<!--
#### FormCheckboxControl
-->


#### FormCheckboxControl

<!--
`FormCheckboxControl` is the interface for checkbox-like controls - toggles, switches, and any control that represents a boolean on/off state. When your component implements this interface:

- **Required property**: Your component must provide a `checked` model signal
- **What the FormField directive does**: Binds the form field's value to your control's `checked` signal

IMPORTANT: Controls implementing `FormCheckboxControl` must NOT have a `value` property
-->

`FormCheckboxControl`은 토글, 스위치 등 불리언 값으로 켜짐/꺼짐 상태를 표현하는 체크박스 형태의 컨트롤에 사용하는 인터페이스입니다.
컴포넌트가 이 인터페이스를 구현하면 다음과 같이 동작합니다:

- **필수 프로퍼티**: 컴포넌트에 `checked` 모델 시그널을 정의해야 합니다.
- **FormField 디렉티브의 역할**: 폼 필드의 값을 컨트롤의 `checked` 시그널에 바인딩합니다.

중요: `FormCheckboxControl`을 구현한 컨트롤에는 `value` 프로퍼티가 없어야 합니다.

<!--
### Optional state properties
-->

<a id="optional-state-properties"></a>

### 선택적으로 사용하는 상태 프로퍼티

<!--
Both `FormValueControl` and `FormCheckboxControl` extend `FormUiControl` - a base interface that provides optional properties for integrating with form state.

All properties are optional. Implement only what your control needs.
-->

`FormValueControl`과 `FormCheckboxControl`은 모두 `FormUiControl`을 상속합니다.
`FormUiControl`은 폼 상태와 연동할 때 선택적으로 사용할 수 있는 프로퍼티를 제공하는 기본 인터페이스입니다.

이 프로퍼티들은 모두 선택 사항입니다.
컨트롤에 필요한 프로퍼티만 구현하면 됩니다.

<!--
#### Interaction state
-->

<a id="interaction-state"></a>

#### 상호작용 상태

<!--
Track when users interact with your control:

| Property  | Purpose                                          |
| --------- | ------------------------------------------------ |
| `touched` | Whether the user has interacted with the field   |
| `dirty`   | Whether the value differs from its initial state |
-->

사용자가 컨트롤과 상호작용했는지 추적합니다:

| 프로퍼티  | 용도                                |
| --------- | ----------------------------------- |
| `touched` | 사용자가 필드와 상호작용했는지 여부 |
| `dirty`   | 현재 값이 초기 상태와 다른지 여부   |

<!--
#### Validation state
-->

<a id="validation-state"></a>

#### 유효성 검사 상태

<!--
Display validation feedback to users:

| Property  | Purpose                                 |
| --------- | --------------------------------------- |
| `errors`  | Array of current validation errors      |
| `invalid` | Whether the field has validation errors |
| `pending` | Whether async validation is in progress |
-->

유효성 검사 결과를 사용자에게 표시합니다:

| 프로퍼티  | 용도                                  |
| --------- | ------------------------------------- |
| `errors`  | 현재 유효성 검사 오류의 배열          |
| `invalid` | 필드에 유효성 검사 오류가 있는지 여부 |
| `pending` | 비동기 유효성 검사가 진행 중인지 여부 |

<!--
#### Availability state
-->

<a id="availability-state"></a>

#### 사용 가능 상태

<!--
Control whether users can interact with your field:

| Property          | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `disabled`        | Whether the field is disabled                            |
| `disabledReasons` | Reasons why the field is disabled                        |
| `readonly`        | Whether the field is readonly (visible but not editable) |
| `hidden`          | Whether the field is hidden from view                    |

NOTE: `disabledReasons` is an array of `DisabledReason` objects. Each object has a `fieldTree` property (reference to the field tree) and an optional `message` property. Access the message via `reason.message`.
-->

사용자가 필드와 상호작용할 수 있는지 제어합니다:

| 프로퍼티          | 용도                                                        |
| ----------------- | ----------------------------------------------------------- |
| `disabled`        | 필드가 비활성화되었는지 여부                                |
| `disabledReasons` | 필드가 비활성화된 이유                                      |
| `readonly`        | 필드가 읽기 전용인지 여부(화면에 표시되지만 편집할 수 없음) |
| `hidden`          | 필드가 화면에서 숨겨졌는지 여부                             |

참고: `disabledReasons`는 `DisabledReason` 객체의 배열입니다.
각 객체에는 필드 트리를 참조하는 `fieldTree` 프로퍼티와 선택적으로 사용하는 `message` 프로퍼티가 있습니다.
메시지는 `reason.message`로 참조할 수 있습니다.

<!--
#### Validation constraints
-->

<a id="validation-constraints"></a>

#### 유효성 검사 제약 조건

<!--
Receive validation constraint values from the form:

| Property    | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| `required`  | Whether the field is required                        |
| `min`       | Minimum numeric value (`undefined` if no constraint) |
| `max`       | Maximum numeric value (`undefined` if no constraint) |
| `minLength` | Minimum string length (undefined if no constraint)   |
| `maxLength` | Maximum string length (undefined if no constraint)   |
| `pattern`   | Array of regular expression patterns to match        |
-->

폼에서 유효성 검사에 사용하는 제약 조건 값을 전달받습니다:

| 프로퍼티    | 용도                                               |
| ----------- | -------------------------------------------------- |
| `required`  | 필드가 필수 항목인지 여부                          |
| `min`       | 숫자의 최솟값(제약 조건이 없으면 `undefined`)      |
| `max`       | 숫자의 최댓값(제약 조건이 없으면 `undefined`)      |
| `minLength` | 문자열의 최소 길이(제약 조건이 없으면 `undefined`) |
| `maxLength` | 문자열의 최대 길이(제약 조건이 없으면 `undefined`) |
| `pattern`   | 값이 일치해야 하는 정규 표현식 패턴의 배열         |

<!--
#### Field metadata
-->

<a id="field-metadata"></a>

#### 필드 메타데이터

<!--
| Property | Purpose                                                            |
| -------- | ------------------------------------------------------------------ |
| `name`   | The field's name attribute (which is unique across forms and apps) |

The "[Adding state signals](#adding-state-signals)" section below shows how to implement these properties in your controls.
-->

| 프로퍼티 | 용도                                                         |
| -------- | ------------------------------------------------------------ |
| `name`   | 필드의 name 어트리뷰트(폼과 애플리케이션 전체에서 고유한 값) |

이 프로퍼티들을 컨트롤에 구현하는 방법은 아래 [상태 시그널 추가하기](#adding-state-signals) 섹션에서 확인할 수 있습니다.

<!--
### How the FormField directive works
-->

<a id="how-the-formfield-directive-works"></a>

### FormField 디렉티브의 동작 방식

<!--
The `[formField]` directive detects which interface your control implements and automatically binds the appropriate signals:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {CustomInput} from './custom-input';
import {CustomToggle} from './custom-toggle';

@Component({
  selector: 'app-my-form',
  imports: [FormField, CustomInput, CustomToggle],
  template: `
    <form novalidate>
      <app-custom-input [formField]="userForm.username" />
      <app-custom-toggle [formField]="userForm.subscribe" />
    </form>
  `,
})
export class MyForm {
  formModel = signal({
    username: '',
    subscribe: false,
  });

  userForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
  });
}
```

TIP: For complete coverage of creating and managing form models, see the [Form Models guide](guide/forms/signals/models).

When you bind `[formField]="userForm.username"`, the FormField directive:

1. Detects your control implements `FormValueControl`
2. Internally accesses `userForm.username().value()` and binds it to your control's `value` model signal
3. Binds form state signals (`disabled()`, `errors()`, etc.) to your control's optional input signals
4. Updates occur automatically through signal reactivity
-->

`[formField]` 디렉티브는 컨트롤이 어떤 인터페이스를 구현했는지 감지하고, 알맞은 시그널을 자동으로 바인딩합니다:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {CustomInput} from './custom-input';
import {CustomToggle} from './custom-toggle';

@Component({
  selector: 'app-my-form',
  imports: [FormField, CustomInput, CustomToggle],
  template: `
    <form novalidate>
      <app-custom-input [formField]="userForm.username" />
      <app-custom-toggle [formField]="userForm.subscribe" />
    </form>
  `,
})
export class MyForm {
  formModel = signal({
    username: '',
    subscribe: false,
  });

  userForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
  });
}
```

팁: 폼 모델을 생성하고 관리하는 방법에 대해 자세히 알아보려면 [폼 모델 가이드](guide/forms/signals/models)를 참고하세요.

`[formField]="userForm.username"`으로 바인딩하면 FormField 디렉티브는 다음과 같이 동작합니다:

1. 컨트롤이 `FormValueControl`을 구현했는지 감지합니다.
2. 내부적으로 `userForm.username().value()`를 참조하고, 이 값을 컨트롤의 `value` 모델 시그널에 바인딩합니다.
3. 폼 상태 시그널(`disabled()`, `errors()` 등)을 컨트롤에 선택적으로 정의한 입력 시그널에 바인딩합니다.
4. 시그널의 반응성을 통해 변경 사항이 자동으로 반영됩니다.

<!--
## Adding state signals
-->

<a id="adding-state-signals"></a>

## 상태 시그널 추가하기

<!--
The minimal controls shown above work, but they don't respond to form state. You can add optional input signals to make your controls react to disabled state, display validation errors, and track user interaction.

Here's a comprehensive example that implements common state properties:

```angular-ts
import {Component, model, input, output, ChangeDetectionStrategy} from '@angular/core';
import {
  FormValueControl,
  WithOptionalFieldTree,
  ValidationError,
  DisabledReason,
} from '@angular/forms/signals';

@Component({
  selector: 'app-stateful-input',
  template: `
    @if (!hidden()) {
      <div class="input-container">
        <input
          type="text"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [class.invalid]="invalid()"
          [attr.aria-invalid]="invalid()"
          (blur)="touch.emit()"
        />

        @if (invalid()) {
          <div class="error-messages" role="alert">
            @for (error of errors(); track error) {
              <span class="error">{{ error.message }}</span>
            }
          </div>
        }

        @if (disabled() && disabledReasons().length > 0) {
          <div class="disabled-reasons">
            @for (reason of disabledReasons(); track reason) {
              <span>{{ reason.message }}</span>
            }
          </div>
        }
      </div>
    }
  `,
})
export class StatefulInput implements FormValueControl<string> {
  // Required
  value = model<string>('');

  // Writable interaction state - control updates these
  touched = input<boolean>(false);
  touch = output<void>();

  // Read-only state - form system manages these
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
}
```

As a result, you can use the control with validation and state management:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';
import {StatefulInput} from './stateful-input';

@Component({
  imports: [FormField, StatefulInput],
  template: `
    <form novalidate>
      <label>
        Email
        <app-stateful-input [formField]="loginForm.email" />
      </label>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: ''});

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

When the user types an invalid email, the FormField directive automatically updates `invalid()` and `errors()`. Your control can display the validation feedback.
-->

앞에서 만든 기본 컨트롤은 입력 기능은 동작하지만 폼 상태에는 반응하지 않습니다.
입력 시그널을 선택적으로 추가하면 비활성화 상태에 반응하고, 유효성 검사 오류를 표시하며, 사용자와의 상호작용을 추적할 수 있습니다.

자주 사용하는 상태 프로퍼티를 구현한 예제를 살펴봅시다:

```angular-ts
import {Component, model, input, output, ChangeDetectionStrategy} from '@angular/core';
import {
  FormValueControl,
  WithOptionalFieldTree,
  ValidationError,
  DisabledReason,
} from '@angular/forms/signals';

@Component({
  selector: 'app-stateful-input',
  template: `
    @if (!hidden()) {
      <div class="input-container">
        <input
          type="text"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [class.invalid]="invalid()"
          [attr.aria-invalid]="invalid()"
          (blur)="touch.emit()"
        />

        @if (invalid()) {
          <div class="error-messages" role="alert">
            @for (error of errors(); track error) {
              <span class="error">{{ error.message }}</span>
            }
          </div>
        }

        @if (disabled() && disabledReasons().length > 0) {
          <div class="disabled-reasons">
            @for (reason of disabledReasons(); track reason) {
              <span>{{ reason.message }}</span>
            }
          </div>
        }
      </div>
    }
  `,
})
export class StatefulInput implements FormValueControl<string> {
  // 필수 프로퍼티
  value = model<string>('');

  // 값을 쓸 수 있는 상호작용 상태 - 컨트롤에서 갱신합니다.
  touched = input<boolean>(false);
  touch = output<void>();

  // 읽기 전용 상태 - 폼 시스템에서 관리합니다.
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
}
```

이제 이 컨트롤을 유효성 검사와 상태 관리 기능에 연결해서 사용할 수 있습니다:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';
import {StatefulInput} from './stateful-input';

@Component({
  imports: [FormField, StatefulInput],
  template: `
    <form novalidate>
      <label>
        Email
        <app-stateful-input [formField]="loginForm.email" />
      </label>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: ''});

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

사용자가 유효하지 않은 이메일 주소를 입력하면 FormField 디렉티브가 `invalid()`와 `errors()`를 자동으로 갱신합니다.
컨트롤은 이 값을 사용해서 유효성 검사 결과를 표시할 수 있습니다.

<!--
### Working with `debounce('blur')`

The [`debounce('blur')`](api/forms/signals/debounce) rule delays updates from the UI to the form model until the field is blurred, instead of applying them on every keystroke. Built-in controls report a blur to the form automatically. A custom control only participates if it emits its `touch` output in response to the native [`blur` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event):

```angular-ts
import {Component, model, output} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  template: `
    <input
      type="text"
      [value]="value()"
      (input)="value.set($event.target.value)"
      (blur)="touch.emit()"
    />
  `,
})
export class CustomInput implements FormValueControl<string> {
  value = model('');
  touch = output<void>();
}
```

With the `touch` output in place, `debounce('blur')` behaves the same for your control as it does for built-in inputs:

```angular-ts
import {Component, signal} from '@angular/core';
import {debounce, form, FormField} from '@angular/forms/signals';
import {CustomInput} from './custom-input';

@Component({
  selector: 'app-root',
  imports: [CustomInput, FormField],
  template: `<app-custom-input [formField]="userForm.name" />`,
})
export class App {
  userModel = signal({name: ''});

  userForm = form(this.userModel, (schemaPath) => {
    debounce(schemaPath.name, 'blur');
  });
}
```

IMPORTANT: Emit `touch` on `blur` (when focus leaves the control), not on `focus`. Without the `touch` output the field never registers as blurred, so `debounce('blur')` has no effect on your control.
-->

<a id="working-with-debounceblur"></a>

### `debounce('blur')` 사용하기

[`debounce('blur')`](api/forms/signals/debounce) 규칙은 키를 누를 때마다 모델을 갱신하는 대신 필드에서 포커스가 벗어날 때까지 UI에서 폼 모델로의 갱신을 지연합니다. 기본 컨트롤은 포커스가 벗어났음을 폼에 자동으로 알립니다. 커스텀 컨트롤에서는 기본 [`blur` 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)에 응답하여 `touch` 출력을 내보내야 이 기능이 동작합니다:

```angular-ts
import {Component, model, output} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  template: `
    <input
      type="text"
      [value]="value()"
      (input)="value.set($event.target.value)"
      (blur)="touch.emit()"
    />
  `,
})
export class CustomInput implements FormValueControl<string> {
  value = model('');
  touch = output<void>();
}
```

`touch` 출력을 구현하면 커스텀 컨트롤에서도 기본 입력과 동일하게 `debounce('blur')`가 동작합니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {debounce, form, FormField} from '@angular/forms/signals';
import {CustomInput} from './custom-input';

@Component({
  selector: 'app-root',
  imports: [CustomInput, FormField],
  template: `<app-custom-input [formField]="userForm.name" />`,
})
export class App {
  userModel = signal({name: ''});

  userForm = form(this.userModel, (schemaPath) => {
    debounce(schemaPath.name, 'blur');
  });
}
```

중요: `touch`는 `focus`가 아니라 `blur`(컨트롤에서 포커스가 벗어날 때)에 내보내세요. `touch` 출력이 없으면 필드가 포커스를 잃었다는 사실이 기록되지 않아 `debounce('blur')`가 동작하지 않습니다.

<!--
## Value transformation

Controls sometimes display values differently than the form model stores them - a date picker might display "January 15, 2024" while storing "2024-01-15", or a currency input might show "$1,234.56" while storing 1234.56.

Use `transformedValue()` (from `@angular/forms/signals`) to keep the raw value shown in the UI in sync with the model value. It takes the control's `value` model signal plus a `parse` and a `format` function, and returns a writable signal holding the raw value:

- `format` converts the model value into the raw value the template renders.
- `parse` converts what the user typed back into a model value, and can report parse errors instead.

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl, transformedValue} from '@angular/forms/signals';

@Component({
  selector: 'number-input',
  template: `
    <input type="text" [value]="rawValue()" (input)="rawValue.set($event.target.value)" />
  `,
})
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val: string): {value: number | null} => ({value: val ? Number(val) : null}),
    format: (val: number | null): string => val?.toString() ?? '',
  });
}
```

Writing to the returned signal (`rawValue.set(...)`) runs `parse` and writes the result into `value`. Whenever the model changes from elsewhere - a `reset()`, a schema rule, or another part of the app - `format` runs again and the raw value updates to match.

### Reporting parse errors

Sometimes the raw value has no valid model representation - a half-typed date, or letters in a numeric field. The `NumberInput` above has this problem: `Number('abc')` is `NaN`, which `parse` happily writes into the model.

Return `{error}` instead:

```ts
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val) => {
      const parsed = val ? Number(val) : null;

      return Number.isNaN(parsed)
        ? {error: {kind: 'parse', message: `${val} is not a number`}}
        : {value: parsed};
    },
    format: (val) => val?.toString() ?? '',
  });
}
```

Return both `value` and `error` when you want to update the model _and_ flag a problem.

When the control is bound with `[formField]`, parse errors are automatically reported to the field, so they show up in the field's `errors()` signal alongside validation errors:

```angular-ts
@Component({
  imports: [NumberInput, FormField],
  template: `
    <number-input [formField]="orderForm.amount" />

    @for (error of orderForm.amount().errors(); track $index) {
      <!- {kind: 'parse', message: '...'} is reported here too ->
      <p class="error">{{ error.message }}</p>
    }
  `,
})
export class Order {
  orderModel = signal<{amount: number | null}>({amount: null});
  orderForm = form(this.orderModel);
}
```

A field with parse errors is invalid, which blocks submission the same way a failed validation rule does.

HELPFUL: Signal Forms uses the same mechanism for native inputs. When the browser cannot parse a value (for example, a partially typed date in `<input type="date">`), it surfaces as a `parse` error on the field. See [Native HTML validation](guide/forms/signals/validation#native-html-validation) for details.

### Resetting

Calling `reset()` on the field clears any pending parse errors and re-formats the raw value from the model, so a control left in an unparseable state returns to a clean display value:

```ts
orderForm.amount().reset();
```
-->

<a id="value-transformation"></a>

## 값 변환하기

컨트롤에 표시하는 값의 형식과 폼 모델에 저장하는 값의 형식이 다를 때가 있습니다.
예를 들어 날짜 선택기에는 "January 15, 2024"를 표시하면서 모델에는 "2024-01-15"를 저장하거나, 통화 입력 컨트롤에는 "$1,234.56"을 표시하면서 모델에는 1234.56을 저장할 수 있습니다.

`@angular/forms/signals`의 `transformedValue()`로 UI에 표시하는 원시 값과 모델 값을 동기화하세요. 컨트롤의 `value` 모델 시그널, `parse` 함수, `format` 함수를 전달하면 원시 값을 담는 쓰기 가능한 시그널을 반환합니다:

- `format`은 모델 값을 템플릿에 표시할 원시 값으로 변환합니다.
- `parse`는 사용자가 입력한 값을 모델 값으로 변환하거나 파싱 오류를 반환합니다.

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl, transformedValue} from '@angular/forms/signals';

@Component({
  selector: 'number-input',
  template: `
    <input type="text" [value]="rawValue()" (input)="rawValue.set($event.target.value)" />
  `,
})
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val: string): {value: number | null} => ({value: val ? Number(val) : null}),
    format: (val: number | null): string => val?.toString() ?? '',
  });
}
```

반환된 시그널에 `rawValue.set(...)`으로 값을 쓰면 `parse`를 실행하고 결과를 `value`에 기록합니다. `reset()`, 스키마 규칙, 애플리케이션의 다른 부분에서 모델을 변경하면 `format`을 다시 실행하여 원시 값을 모델과 일치시킵니다.

<a id="reporting-parse-errors"></a>

<a id="파싱-에러-알리기"></a>

### 파싱 오류 알리기

일부만 입력한 날짜나 숫자 필드에 입력한 문자처럼 원시 값을 유효한 모델 값으로 바꿀 수 없는 경우가 있습니다. 위의 `NumberInput`도 이 문제가 있습니다. `Number('abc')`는 `NaN`이지만 `parse`는 그대로 모델에 기록합니다.

이 경우에는 `{error}`를 반환하세요:

```ts
export class NumberInput implements FormValueControl<number | null> {
  readonly value = model.required<number | null>();

  protected readonly rawValue = transformedValue(this.value, {
    parse: (val) => {
      const parsed = val ? Number(val) : null;

      return Number.isNaN(parsed)
        ? {error: {kind: 'parse', message: `${val} is not a number`}}
        : {value: parsed};
    },
    format: (val) => val?.toString() ?? '',
  });
}
```

모델을 갱신하면서 문제도 알리려면 `value`와 `error`를 함께 반환하세요.

컨트롤을 `[formField]`로 바인딩하면 파싱 오류가 필드에 자동으로 전달되어 유효성 검사 오류와 함께 `errors()` 시그널에 표시됩니다:

```angular-ts
@Component({
  imports: [NumberInput, FormField],
  template: `
    <number-input [formField]="orderForm.amount" />

    @for (error of orderForm.amount().errors(); track $index) {
      <!-- {kind: 'parse', message: '...'}도 여기에 표시됩니다. -->
      <p class="error">{{ error.message }}</p>
    }
  `,
})
export class Order {
  orderModel = signal<{amount: number | null}>({amount: null});
  orderForm = form(this.orderModel);
}
```

파싱 오류가 있는 필드는 유효하지 않으므로 유효성 검사 규칙에 실패한 경우와 마찬가지로 제출을 차단합니다.

도움말: Signal Forms는 기본 입력에도 같은 방식을 사용합니다. 브라우저가 값을 파싱할 수 없으면(예: `<input type="date">`에 날짜를 일부만 입력한 경우) 필드에 `parse` 오류가 나타납니다. 자세한 내용은 [기본 HTML 유효성 검사](guide/forms/signals/validation#native-html-validation)를 참고하세요.

<a id="resetting"></a>

### 초기화하기

필드에 `reset()`을 호출하면 남아 있는 파싱 오류를 지우고 모델 값으로 원시 값의 형식을 다시 지정합니다. 파싱할 수 없는 상태의 컨트롤도 정상적인 표시 값으로 돌아옵니다:

```ts
orderForm.amount().reset();
```

<!--
## Validation integration
-->

<a id="validation-integration"></a>

## 유효성 검사 연동하기

<!--
Controls display validation state but don't perform validation. Validation happens in the form schema - your control receives `invalid()` and `errors()` signals from the FormField directive and displays them (as shown in the StatefulInput example above).

The FormField directive also passes validation constraint values like `required`, `min`, `max`, `minLength`, `maxLength`, and `pattern`. Your control can use these to enhance the UI:

```ts
export class NumberInput implements FormValueControl<number> {
  value = model<number>(0);

  // Constraint values from schema validation rules
  required = input<boolean>(false);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);
}
```

When you add `min()` and `max()` validation rules to the schema, the FormField directive passes these values to your control. Use them to apply HTML5 attributes or show constraint hints in your template.

IMPORTANT: Don't implement validation logic in your control. Define validation rules in the form schema and let your control display the results:

```ts {avoid}
// Avoid: Validation in control
export class BadControl implements FormValueControl<string> {
  value = model<string>('');
  isValid() {
    return this.value().length >= 8;
  } // Don't do this!
}
```

```ts {prefer}
// Good: Validation in schema, control displays results
accountForm = form(this.accountModel, (schemaPath) => {
  minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});
});
```
-->

컨트롤은 유효성 검사 상태를 표시하지만, 직접 유효성 검사를 수행하지는 않습니다.
유효성 검사는 폼 스키마에서 수행합니다.
컨트롤은 FormField 디렉티브로부터 `invalid()`와 `errors()` 시그널을 전달받고, 앞에서 살펴본 StatefulInput 예제처럼 검사 결과를 표시합니다.

FormField 디렉티브는 `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`과 같은 유효성 검사 제약 조건 값도 전달합니다.
컨트롤은 이 값들을 활용해서 UI를 개선할 수 있습니다:

```ts
export class NumberInput implements FormValueControl<number> {
  value = model<number>(0);

  // 스키마의 유효성 검사 규칙에서 전달받은 제약 조건 값
  required = input<boolean>(false);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);
}
```

스키마에 `min()`과 `max()` 유효성 검사 규칙을 추가하면 FormField 디렉티브가 이 값들을 컨트롤에 전달합니다.
이 값들을 HTML5 어트리뷰트에 적용하거나, 템플릿에서 제약 조건을 안내하는 데 활용하면 됩니다.

중요: 컨트롤 안에 유효성 검사 로직을 구현하면 안 됩니다.
유효성 검사 규칙은 폼 스키마에 정의하고, 컨트롤에는 검사 결과를 표시하세요:

```ts {avoid}
// 피해야 하는 방식: 컨트롤에서 유효성을 검사합니다.
export class BadControl implements FormValueControl<string> {
  value = model<string>('');
  isValid() {
    return this.value().length >= 8;
  } // 이렇게 구현하면 안 됩니다!
}
```

```ts {prefer}
// 권장하는 방식: 스키마에서 유효성을 검사하고 컨트롤은 결과를 표시합니다.
accountForm = form(this.accountModel, (schemaPath) => {
  minLength(schemaPath.password, 8, {message: 'Password must be at least 8 characters'});
});
```

<!--
## Making controls reusable

A custom control often carries implicit expectations about validation. An email input needs `required` and `email` rules in every form that uses it. Instead of relying on each consumer to redeclare those rules, package a companion schema alongside the control and export both from the same module:

```ts {header: 'email-input.ts'}
import {schema, required, email} from '@angular/forms/signals';

export const emailFieldSchema = schema<string>((path) => {
  required(path, {message: 'Email is required'});
  email(path, {message: 'Enter a valid email address'});
});
```

A consumer imports the companion schema and composes it into their form with `apply()`:

```ts {header: 'registration.ts'}
import {form, apply} from '@angular/forms/signals';
import {emailFieldSchema} from './email-input';

registrationForm = form(this.registrationModel, (path) => {
  apply(path.email, emailFieldSchema);
});
```

`apply()` merges the companion schema's rules into the parent form at the specified path. The consumer can still add more rules to the same field because `apply()` composes with other rules rather than replacing them. See the [Schemas guide](guide/forms/signals/schemas) for complete coverage of `schema()`, `apply()`, and conditional composition with `applyWhen()`.

### Design considerations

The consumer's model must initialize every field with a defined value. In Signal Forms, `undefined` signifies the absence of a field and not an empty value. For a reusable email control, that means the consumer should use `''` as the initial value, and not leave the property undefined. See the [Form Models guide](guide/forms/signals/models) for details on choosing initial values.

In addition, controls should not register their own effects for state management. The form system manages field state through internal effects. This means that your control receives state updates through input signals. If a control needs to transform values, use `transformedValue()` as shown in the "[Value transformation](#value-transformation)" section rather than an `effect()`.
-->

<a id="making-controls-reusable"></a>

## 컨트롤 재사용하기

커스텀 컨트롤에는 유효성 검사에 대한 암묵적인 전제가 있는 경우가 많습니다. 이메일 입력이라면 사용하는 모든 폼에 `required`와 `email` 규칙이 필요합니다. 사용하는 쪽에서 매번 규칙을 다시 선언하도록 하는 대신, 컨트롤과 함께 사용할 스키마를 만들어 같은 모듈에서 내보내세요:

```ts {header: 'email-input.ts'}
import {schema, required, email} from '@angular/forms/signals';

export const emailFieldSchema = schema<string>((path) => {
  required(path, {message: 'Email is required'});
  email(path, {message: 'Enter a valid email address'});
});
```

컨트롤을 사용하는 쪽에서는 이 스키마를 불러와 `apply()`로 폼에 결합합니다:

```ts {header: 'registration.ts'}
import {form, apply} from '@angular/forms/signals';
import {emailFieldSchema} from './email-input';

registrationForm = form(this.registrationModel, (path) => {
  apply(path.email, emailFieldSchema);
});
```

`apply()`는 함께 제공된 스키마의 규칙을 부모 폼의 지정한 경로에 병합합니다. 기존 규칙을 덮어쓰지 않고 조합하므로 같은 필드에 규칙을 추가할 수도 있습니다. `schema()`, `apply()`, `applyWhen()`을 사용하는 조건부 조합에 대한 자세한 내용은 [스키마 가이드](guide/forms/signals/schemas)를 참고하세요.

<a id="design-considerations"></a>

### 설계 시 고려 사항

컨트롤을 사용하는 모델은 모든 필드를 정의된 값으로 초기화해야 합니다. Signal Forms에서 `undefined`는 빈 값이 아니라 필드가 없다는 의미입니다. 재사용 가능한 이메일 컨트롤이라면 프로퍼티를 정의하지 않은 채 두지 말고 초기값으로 `''`를 사용하세요. 초기값 선택에 대한 자세한 내용은 [폼 모델 가이드](guide/forms/signals/models)를 참고하세요.

또한 컨트롤은 상태 관리를 위해 별도의 이펙트 함수를 등록하지 않아야 합니다. 폼 시스템이 내부 이펙트 함수로 필드 상태를 관리하며 컨트롤은 입력 시그널로 상태 변경을 전달받습니다. 값을 변환해야 한다면 `effect()` 대신 [값 변환](#value-transformation)에서 설명한 `transformedValue()`를 사용하세요.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
This guide covered building custom controls that integrate with Signal Forms. Related guides explore other aspects of Signal Forms:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/models" title="Form models" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <!- <docs-pill href="guide/forms/signals/arrays" title="Working with Arrays" /> ->
</docs-pill-row>
-->

이 문서에서는 Signal Forms와 연동되는 커스텀 컨트롤을 만드는 방법을 알아봤습니다.
Signal Forms의 다른 기능에 대해 알아보려면 다음 가이드를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/models" title="폼 모델" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <!-- <docs-pill href="guide/forms/signals/arrays" title="배열 다루기" /> -->
</docs-pill-row>
