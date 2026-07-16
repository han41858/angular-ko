<!--
<docs-decorative-header title="Forms with Angular Signals" imgSrc="adev/src/assets/images/signals.svg"> <!- markdownlint-disable-line ->
</docs-decorative-header>
-->

<docs-decorative-header title="시그널 폼" imgSrc="adev/src/assets/images/signals.svg"> <!-- markdownlint-disable-line -->
</docs-decorative-header>

<!--
Signal Forms is an library that allows you to manage form state in Angular applications by building on the reactive foundation of signals. With automatic two-way binding, type-safe field access, and schema-based validation, Signal Forms help you create robust forms.

TIP: For a quick introduction to Signal Forms, see the [Signal Forms essentials guide](essentials/signal-forms).
-->

시그널 폼은 Angular 애플리케이션의 폼 상태를 시그널로 연결해서 반응형으로 구성하는 방식을 의미합니다.
양방향 바인딩이 자동으로 연결되며, 폼 필드에 접근할 때 타입 검사가 적용되며, 스키마 기반으로 유효성을 검사하기 때문에 직관적인 폼을 구성할 수 있습니다.

참고: 시그널 폼을 빠르게 알아보려면 [시그널 폼 핵심 가이드](essentials/signal-forms) 문서를 참고하세요.

<!--
## Why Signal Forms?
-->

## 왜 시그널 폼을 사용해야 할까요?

<!--
Building forms in web applications involves managing several interconnected concerns: tracking field values, validating user input, handling error states, and keeping the UI synchronized with your data model. Managing these concerns separately creates boilerplate code and complexity.

Signal Forms address these challenges by:

- **Synchronizing state automatically** - Automatically syncs the form data model with bound form fields
- **Providing type safety** - Supports fully type safe schemas & bindings between your UI controls and data model
- **Centralizing validation logic** - Define all validation rules in one place using a validation schema

Signal Forms work best in new applications built with signals. If you're working with an existing application that uses reactive forms, or if you need production stability guarantees, reactive forms remain a solid choice.

NOTE: If you're coming from template or reactive forms, you may be interested in the [comparison guide](guide/forms/signals/comparison).
-->

웹 애플리케이션에서 폼을 구성한다는 것은 필드 값을 추적하고 사용자가 입력한 값의 유효성을 검사하고, 에러 상태를 처리하며, 데이터 모델과 화면을 동기화해야 하는 것을 의미합니다.
이런 문제를 개별적으로 해결하려면 기본 코드가 늘어나고 복잡성이 증가합니다.

이런 문제를 시그널 폼은 이렇게 해결합니다:

- **상태를 자동으로 동기화합니다** - 폼 데이터 모델과 폼 필드를 자동으로 동기화 합니다.
- **타입 검사를 보장합니다** - 화면과 데이터 모델의 타입을 명확하게 정의합니다.
- **유효성 검사를 한 곳에서 처리합니다** - 유효성 검사 규칙은 모두 유효성 검사 스키마 하나로 정의합니다.

시그널 폼은 시그널 기반으로 동작하는 애플리케이션과 가장 잘 맞습니다.
기존 애플리케이션에서 반응형 폼을 사용하고 있거나, 이미 운영하고 있어서 안정성이 중요하다면 반응형 폼 방식을 그대로 둬도 됩니다.

참고: 반응형 폼이나 템플릿 기반 폼을 찾아 왔다면 [비교하는 문서](guide/forms/signals/comparison)를 참고하세요.

<!--
## Prerequisites
-->

## 조건

<!--
Signal Forms require:

- Angular v21 or higher
-->

시그널 폼을 사용하려면 Angular 버전이 v21 를 포함하여 이후 버전이어야 합니다.

<!--
## Setup
-->

## 환경설정

<!--
Signal Forms are already included in the `@angular/forms` package. Import the necessary functions and directives from `@angular/forms/signals`:

```ts
import {form, FormField, required, email} from '@angular/forms/signals';
```

The `FormField` directive must be imported into any component that binds form fields to HTML inputs:

```ts
@Component({
  // ...
  imports: [FormField],
})
```
-->

시그널 폼은 `@angular/forms` 패키지로 제공됩니다.
그래서 시그널 폼 구성에 필요한 함수나 디렉티브는 `@angular/forms/signals`에서 불러오면 됩니다.

```ts
import {form, FormField, required, email} from '@angular/forms/signals';
```

그 중에서 폼 필드 인스턴스와 HTML 입력 필드를 연결하는 `FormField` 디렉티브는 꼭 불러와야 합니다:

```ts
@Component({
  // ...
  imports: [FormField],
})
```

<!--
## Next steps
-->

## 다음 단계

<!--
To learn more about how Signal Forms work, check out the following guides:

<docs-pill-row>
  <docs-pill href="essentials/signal-forms" title="Signal forms essentials" />
  <docs-pill href="guide/forms/signals/models" title="Form models" />
  <docs-pill href="guide/forms/signals/model-design" title="Designing your form model" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/custom-controls" title="Custom controls" />
  <docs-pill href="guide/forms/signals/comparison" title="Comparison with other form systems" />
</docs-pill-row>
-->

시그널 폼에 대해 더 알아봅시다:

<docs-pill-row>
  <docs-pill href="essentials/signal-forms" title="시그널 폼 개요" />
  <docs-pill href="guide/forms/signals/models" title="폼 모델" />
  <docs-pill href="guide/forms/signals/model-design" title="폼 모델 설계" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/custom-controls" title="커스텀 폼 컨트롤" />
  <docs-pill href="guide/forms/signals/comparison" title="폼 구현방식 비교" />
</docs-pill-row>
