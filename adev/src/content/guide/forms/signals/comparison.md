<!--
# Comparison with other form approaches
-->

<a id="comparison-with-other-form-approaches"></a>

# 다른 폼 구현 방식과 비교하기

<!--
Angular provides three approaches to building forms: Signal Forms, Reactive Forms, and Template-driven Forms. Each has distinct patterns for managing state, validation, and data flow. This guide helps you understand the differences and choose the right approach for your project.
-->

Angular는 폼을 만드는 세 가지 방식으로 Signal Forms, 반응형 폼, 템플릿 기반 폼을 제공합니다.
각 방식은 상태, 유효성 검사, 데이터 흐름을 관리하는 패턴이 다릅니다.
이 가이드에서는 세 방식의 차이를 이해하고 프로젝트에 알맞은 방식을 선택하는 방법을 알아봅니다.

<!--
## Quick comparison
-->

<a id="quick-comparison"></a>

## 한눈에 비교하기

<!--
| Feature          | Signal Forms                       | Reactive Forms                        | Template-driven Forms   |
| ---------------- | ---------------------------------- | ------------------------------------- | ----------------------- |
| Source of truth  | User-defined writable signal model | `FormControl`/`FormGroup`             | User model in component |
| Type safety      | Inferred from model                | Explicit with typed forms             | Minimal                 |
| Validation       | Schema with path-based validators  | List of validators passed to Controls | Directive-based         |
| State management | Signal-based                       | Observable-based                      | Angular-managed         |
| Setup            | Signal + schema function           | FormControl tree                      | NgModel in template     |
| Best for         | Signal-based apps                  | Complex forms                         | Simple forms            |
| Learning curve   | Medium                             | Medium-High                           | Low                     |
| Status           | Stable (v22+)                      | Stable                                | Stable                  |
-->

| 기능        | Signal Forms                            | 반응형 폼                        | 템플릿 기반 폼         |
| ----------- | --------------------------------------- | -------------------------------- | ---------------------- |
| 원본 데이터 | 사용자가 정의한 쓰기 가능한 시그널 모델 | `FormControl`/`FormGroup`        | 컴포넌트의 사용자 모델 |
| 타입 안전성 | 모델에서 추론                           | 타입이 지정된 폼으로 명시        | 제한적                 |
| 유효성 검사 | 경로 기반 검증 함수를 사용하는 스키마   | 컨트롤에 전달하는 검증 함수 목록 | 디렉티브 기반          |
| 상태 관리   | 시그널 기반                             | 옵저버블 기반                    | Angular가 관리         |
| 구성        | 시그널과 스키마 함수                    | FormControl 트리                 | 템플릿의 NgModel       |
| 적합한 용도 | 시그널 기반 애플리케이션                | 복잡한 폼                        | 간단한 폼              |
| 학습 난이도 | 보통                                    | 보통~높음                        | 낮음                   |
| 상태        | 안정화(v22 이상)                        | 안정화                           | 안정화                 |

<!--
## By example: Login form
-->

<a id="by-example-login-form"></a>

## 예제로 비교하기: 로그인 폼

<!--
The best way to understand the differences is to see the same form implemented in all three approaches.

<docs-code-multifile>
  <docs-code language="angular-ts" header="Signal forms" path="adev/src/content/examples/signal-forms/src/comparison/app/signal-forms.ts"/>
  <docs-code header="Reactive forms" path="adev/src/content/examples/signal-forms/src/comparison/app/reactive-forms.ts"/>
  <docs-code header="Template-driven forms" path="adev/src/content/examples/signal-forms/src/comparison/app/template-driven-forms.ts"/>
</docs-code-multifile>
-->

세 방식으로 같은 폼을 구현한 예제를 보면 차이를 가장 쉽게 이해할 수 있습니다.

<docs-code-multifile>
  <docs-code language="angular-ts" header="Signal Forms" path="adev/src/content/examples/signal-forms/src/comparison/app/signal-forms.ts"/>
  <docs-code header="반응형 폼" path="adev/src/content/examples/signal-forms/src/comparison/app/reactive-forms.ts"/>
  <docs-code header="템플릿 기반 폼" path="adev/src/content/examples/signal-forms/src/comparison/app/template-driven-forms.ts"/>
</docs-code-multifile>

<!--
## Understanding the differences
-->

<a id="understanding-the-differences"></a>

## 차이점 이해하기

<!--
The three approaches make different design choices that affect how you write and maintain your forms. These differences stem from where each approach stores form state and how it manages validation.
-->

세 방식은 설계가 다르기 때문에 폼을 작성하고 유지보수하는 방식에도 차이가 있습니다.
이런 차이는 폼 상태를 어디에 저장하고 유효성 검사를 어떻게 관리하는지에서 비롯됩니다.

<!--
### Where your form data lives
-->

<a id="where-your-form-data-lives"></a>

### 폼 데이터를 저장하는 위치

<!--
The most fundamental difference is where each approach considers the "source of truth" for form values.

Signal Forms stores data in a writable signal. When you need the current form values, you call the signal:

```ts
const credentials = this.loginModel(); // { email: '...', password: '...' }
```

This keeps your form data in a single reactive container that automatically notifies Angular when values change. The form structure mirrors your data model exactly.

Reactive Forms stores data inside FormControl and FormGroup instances. You access values through the form hierarchy:

```ts
const credentials = this.loginForm.value; // { email: '...', password: '...' }
```

This separates form state management from your component's data model. The form structure is explicit but requires more setup code.

Template-driven Forms stores data in component properties. You access values directly:

```ts
const credentials = {email: this.email, password: this.password};
```

This is the most direct approach but requires manually assembling values when you need them. Angular manages form state through directives in the template.
-->

가장 근본적인 차이는 폼 값의 원본 데이터(source of truth)를 어디에 두는지입니다.

Signal Forms는 값을 쓸 수 있는 시그널에 데이터를 저장합니다.
현재 폼 값이 필요하면 시그널을 실행합니다:

```ts
const credentials = this.loginModel(); // { email: '...', password: '...' }
```

이 방식은 폼 데이터를 하나의 반응형 컨테이너에 저장하고, 값이 변경되면 Angular에 자동으로 알립니다.
폼 구조는 데이터 모델과 정확히 일치합니다.

반응형 폼은 FormControl과 FormGroup 인스턴스에 데이터를 저장합니다.
폼 계층을 통해 값에 접근합니다:

```ts
const credentials = this.loginForm.value; // { email: '...', password: '...' }
```

이 방식은 폼 상태 관리를 컴포넌트의 데이터 모델과 분리합니다.
폼 구조를 명시적으로 정의하지만, 설정 코드가 더 많이 필요합니다.

템플릿 기반 폼은 컴포넌트 프로퍼티에 데이터를 저장합니다.
값에 직접 접근합니다:

```ts
const credentials = {email: this.email, password: this.password};
```

가장 직접적인 방식이지만, 여러 값을 한데 모아야 할 때는 직접 구성해야 합니다.
Angular는 템플릿의 디렉티브를 통해 폼 상태를 관리합니다.

<!--
### How validation works
-->

<a id="how-validation-works"></a>

### 유효성 검사 방식

<!--
Each approach defines validation rules differently, affecting where your validation logic lives and how you maintain it.

Signal Forms uses a schema function where you bind validators to field paths:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
});
```

All validation rules live together in one place. The schema function runs once during form creation, and validators execute automatically when field values change. Error messages are part of the validation definition.

Reactive Forms attaches validators when creating controls:

```ts
loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

Validators are tied to individual controls in the form structure. This distributes validation across your form definition. Error messages typically live in your template.

Template-driven Forms uses directive attributes in the template:

```html
<input [(ngModel)]="email" required email />
```

Validation rules live in your template alongside the HTML. This keeps validation close to the UI but spreads logic across template and component.
-->

각 방식은 유효성 검사 규칙을 정의하는 방법이 다릅니다.
이에 따라 유효성 검사 로직의 위치와 유지보수 방법도 달라집니다.

Signal Forms는 스키마 함수에서 필드 경로에 검증 함수를 연결합니다:

```ts
loginForm = form(this.loginModel, (fieldPath) => {
  required(fieldPath.email, {message: 'Email is required'});
  email(fieldPath.email, {message: 'Enter a valid email address'});
});
```

모든 유효성 검사 규칙을 한곳에 모아 정의합니다.
스키마 함수는 폼을 생성할 때 한 번 실행되고, 필드 값이 변경되면 검증 함수가 자동으로 실행됩니다.
에러 메시지도 유효성 검사 정의에 포함합니다.

반응형 폼은 컨트롤을 생성할 때 검증 함수를 연결합니다:

```ts
loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

검증 함수는 폼 구조의 개별 컨트롤에 연결됩니다.
따라서 유효성 검사 로직이 폼 정의 곳곳에 나뉘어 배치됩니다.
에러 메시지는 일반적으로 템플릿에 작성합니다.

템플릿 기반 폼은 템플릿에서 디렉티브 어트리뷰트를 사용합니다:

```html
<input [(ngModel)]="email" required email />
```

유효성 검사 규칙은 템플릿의 HTML과 함께 작성합니다.
유효성 검사 로직을 UI 가까이에 둘 수 있지만, 로직이 템플릿과 컴포넌트에 나뉘어 배치됩니다.

<!--
### Type safety and autocomplete
-->

<a id="type-safety-and-autocomplete"></a>

### 타입 안전성과 자동완성

<!--
TypeScript integration differs significantly between approaches, affecting how much the compiler helps you avoid errors.

Signal Forms infers types from your model structure:

```ts
const loginModel = signal({email: '', password: ''});
const loginForm = form(loginModel);
// TypeScript knows: loginForm.email exists and returns FieldState<string>
```

You define your data shape once in the signal, and TypeScript automatically knows what fields exist and their types. Accessing `loginForm.username` (which doesn't exist) produces a type error.

Reactive Forms requires explicit type annotations with typed forms:

```ts
const loginForm = new FormGroup({
  email: new FormControl<string>(''),
  password: new FormControl<string>(''),
});
// TypeScript knows: loginForm.controls.email is FormControl<string>
```

You specify types for each control individually. TypeScript validates your form structure, but you maintain type information separately from your data model.

Template-driven Forms offers minimal type safety:

```ts
email = '';
password = '';
// TypeScript only knows these are strings, no form-level typing
```

TypeScript understands your component properties but has no knowledge of form structure or validation. You lose compile-time checking for form operations.
-->

각 방식은 TypeScript와 연동하는 방법이 크게 다르므로, 컴파일러가 에러를 방지하는 데 도움을 주는 정도도 다릅니다.

Signal Forms는 모델 구조에서 타입을 추론합니다:

```ts
const loginModel = signal({email: '', password: ''});
const loginForm = form(loginModel);
// TypeScript는 loginForm.email이 존재하며 FieldState<string>을 반환한다는 것을 알 수 있습니다.
```

시그널에서 데이터 구조를 한 번 정의하면 TypeScript가 필드의 존재 여부와 타입을 자동으로 알 수 있습니다.
존재하지 않는 `loginForm.username`에 접근하면 타입 에러가 발생합니다.

반응형 폼은 타입이 지정된 폼을 사용해서 타입을 명시적으로 지정해야 합니다:

```ts
const loginForm = new FormGroup({
  email: new FormControl<string>(''),
  password: new FormControl<string>(''),
});
// TypeScript는 loginForm.controls.email의 타입이 FormControl<string>이라는 것을 알 수 있습니다.
```

각 컨트롤의 타입을 개별적으로 지정합니다.
TypeScript가 폼 구조를 검사하지만, 타입 정보는 데이터 모델과 별도로 관리해야 합니다.

템플릿 기반 폼은 제한적인 타입 안전성만 제공합니다:

```ts
email = '';
password = '';
// TypeScript는 문자열이라는 것만 알 수 있으며, 폼 수준의 타입 정보는 없습니다.
```

TypeScript는 컴포넌트 프로퍼티를 이해하지만, 폼 구조나 유효성 검사 정보는 알지 못합니다.
따라서 폼 관련 작업을 컴파일 시점에 검사할 수 없습니다.

<!--
## Choose your approach
-->

<a id="choose-your-approach"></a>

## 구현 방식 선택하기

<!--
### Use Signal Forms if:
-->

<a id="use-signal-forms-if"></a>

### Signal Forms가 적합한 경우

<!--
- You're building new signal-based applications (Angular v22+)
- You want type safety inferred from your model structure
- Schema-based validation appeals to you
- Your team is familiar with signals
-->

- 시그널 기반의 새 애플리케이션을 만드는 경우(Angular v22 이상)
- 모델 구조에서 타입 안전성을 추론하고 싶은 경우
- 스키마 기반 유효성 검사 방식을 선호하는 경우
- 팀원들이 시그널에 익숙한 경우

<!--
### Use Reactive Forms if:
-->

<a id="use-reactive-forms-if"></a>

### 반응형 폼이 적합한 경우

<!--
- You need production-ready stability
- You're building complex, dynamic forms
- You prefer observable-based patterns
- You need fine-grained control over form state
- You're working on an existing reactive forms codebase
-->

- 운영 환경에서 검증된 안정성이 필요한 경우
- 복잡하고 동적인 폼을 만드는 경우
- 옵저버블 기반 패턴을 선호하는 경우
- 폼 상태를 세밀하게 제어해야 하는 경우
- 기존 반응형 폼 코드를 유지보수하는 경우

<!--
### Use Template-driven Forms if:
-->

<a id="use-template-driven-forms-if"></a>

### 템플릿 기반 폼이 적합한 경우

<!--
- You're building simple forms (login, contact, search)
- You're doing rapid prototyping
- Your form logic is straightforward
- You prefer keeping form logic in templates
- You're working on an existing template-driven codebase
-->

- 로그인, 문의, 검색과 같은 간단한 폼을 만드는 경우
- 프로토타입을 빠르게 만드는 경우
- 폼 로직이 단순한 경우
- 폼 로직을 템플릿에 두는 방식을 선호하는 경우
- 기존 템플릿 기반 폼 코드를 유지보수하는 경우

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
To learn more about each approach:

- **Signal Forms**: See the [Overview guide](guide/forms/signals/overview) to get started, or dive into [Form Models](guide/forms/signals/models), [Validation](guide/forms/signals/validation), and [Field State Management](guide/forms/signals/field-state-management)
- **Reactive Forms**: See the [Reactive Forms guide](guide/forms/reactive-forms) in Angular documentation
- **Template-driven Forms**: See the [Template-driven Forms guide](guide/forms/template-driven-forms) in Angular documentation
-->

각 방식을 자세하게 알아보려면 다음 문서를 참고하세요:

- **Signal Forms**: [개요 가이드](guide/forms/signals/overview)로 시작하거나, [폼 모델](guide/forms/signals/models), [유효성 검사](guide/forms/signals/validation), [필드 상태 관리](guide/forms/signals/field-state-management)를 자세히 알아보세요.
- **반응형 폼**: Angular 문서의 [반응형 폼 가이드](guide/forms/reactive-forms)를 참고하세요.
- **템플릿 기반 폼**: Angular 문서의 [템플릿 기반 폼 가이드](guide/forms/template-driven-forms)를 참고하세요.
