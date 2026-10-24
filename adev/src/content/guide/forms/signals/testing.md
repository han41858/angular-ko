<!--
# Testing Signal Forms

Forms are often critical to applications, and testing gives you confidence they behave correctly as the codebase changes. Signal Forms keeps most of its logic in the schema rather than the template, which means you can test the majority of form behavior without rendering a component.

This guide walks through how to set up those tests, starting with isolated logic tests and then covering component-bound tests for cases where DOM interaction matters.
-->

<a id="testing-signal-forms"></a>

# Signal Forms 테스트하기

폼은 애플리케이션에서 중요한 역할을 하는 경우가 많습니다. 테스트를 작성하면 코드가 변경되어도 폼이 올바르게 동작하는지 확인할 수 있습니다. Signal Forms는 대부분의 로직을 템플릿이 아닌 스키마에 두므로, 컴포넌트를 렌더링하지 않고도 대부분의 폼 동작을 테스트할 수 있습니다.

이 가이드에서는 독립적인 로직 테스트부터 시작하여, DOM 상호작용이 필요한 컴포넌트 기반 테스트까지 설정하는 방법을 살펴봅니다.

<!--
## Testing form logic in isolation

When you only need to verify validation, disabled state, required state, or error output, test the form directly instead of rendering a component. Isolated tests keep the setup small and let the test focus on the form's behavior.

The key requirement is the injector. Signal Forms needs an injection context during form creation. If a test calls `form()` without one, the call throws before the test can assert anything about the form.

The most direct way to satisfy this requirement is to pass an injector explicitly. The following test creates a form with a `required` rule and verifies that the field becomes valid after receiving a value:

```ts {header: 'profile-form.spec.ts'}
import {Injector, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('marks required fields as invalid until they have a value', () => {
    const model = signal({name: ''});

    const profileForm = form(
      model,
      (path) => {
        required(path.name);
      },
      {injector: TestBed.inject(Injector)},
    );

    expect(profileForm.name().valid()).toBe(false);
    expect(profileForm.name().errors()).toEqual([expect.objectContaining({kind: 'required'})]);

    profileForm.name().value.set('Ada');

    expect(profileForm.name().valid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([]);
  });
});
```

This pattern works well for most isolated tests because the injector requirement stays visible at the call site. It also mirrors how Signal Forms unit tests in Angular's source create forms.

When the code under test calls `form()` internally, you may not be able to pass the injector directly. In that case, wrap the call in an ambient injection context:

```ts {header: 'profile-form.spec.ts'}
import {signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('can create a form inside an injection context', () => {
    const model = signal({name: ''});

    TestBed.runInInjectionContext(() => {
      const profileForm = form(model, (path) => {
        required(path.name);
      });

      expect(profileForm.name().valid()).toBe(false);
    });
  });
});
```

Both patterns produce the same kind of form. Passing `{injector}` is often the clearest choice when the test creates the form directly. `TestBed.runInInjectionContext()` is useful when the code under test calls `form()` internally and you need to supply the surrounding injection context.

Once the form exists, test it through field state signals. Common assertions include `valid()`, `invalid()`, `disabled()`, `required()`, and `errors()`. For most form logic, that is enough to verify the behavior without involving the DOM.
-->

<a id="testing-form-logic-in-isolation"></a>

## 폼 로직을 독립적으로 테스트하기

유효성 검사, 비활성화 상태, 필수 상태, 오류 결과만 확인하면 된다면 컴포넌트를 렌더링하는 대신 폼을 직접 테스트하세요. 독립적인 테스트는 설정이 간단하며 폼의 동작에 집중할 수 있습니다.

핵심 요구 사항은 인젝터입니다. Signal Forms는 폼을 생성할 때 의존성 주입 컨텍스트가 필요합니다. 컨텍스트 없이 `form()`을 호출하면 폼에 대한 검증을 시작하기도 전에 오류가 발생합니다.

가장 직접적인 방법은 인젝터를 명시적으로 전달하는 것입니다. 다음 테스트는 `required` 규칙을 가진 폼을 만들고, 필드에 값을 지정하면 유효한 상태가 되는지 확인합니다:

```ts {header: 'profile-form.spec.ts'}
import {Injector, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('marks required fields as invalid until they have a value', () => {
    const model = signal({name: ''});

    const profileForm = form(
      model,
      (path) => {
        required(path.name);
      },
      {injector: TestBed.inject(Injector)},
    );

    expect(profileForm.name().valid()).toBe(false);
    expect(profileForm.name().errors()).toEqual([expect.objectContaining({kind: 'required'})]);

    profileForm.name().value.set('Ada');

    expect(profileForm.name().valid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([]);
  });
});
```

이 패턴은 호출하는 곳에서 인젝터가 필요하다는 사실을 명확하게 보여 주므로 대부분의 독립적인 테스트에 적합합니다. Angular 소스의 Signal Forms 단위 테스트에서도 같은 방식으로 폼을 생성합니다.

테스트 대상 코드가 내부에서 `form()`을 호출하면 인젝터를 직접 전달하기 어려울 수 있습니다. 이때는 호출을 의존성 주입 컨텍스트로 감싸세요:

```ts {header: 'profile-form.spec.ts'}
import {signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('can create a form inside an injection context', () => {
    const model = signal({name: ''});

    TestBed.runInInjectionContext(() => {
      const profileForm = form(model, (path) => {
        required(path.name);
      });

      expect(profileForm.name().valid()).toBe(false);
    });
  });
});
```

두 방식 모두 같은 종류의 폼을 만듭니다. 테스트가 폼을 직접 생성한다면 `{injector}`를 전달하는 편이 대체로 더 명확합니다. 테스트 대상 코드가 내부에서 `form()`을 호출하여 바깥에서 주입 컨텍스트를 제공해야 한다면 `TestBed.runInInjectionContext()`가 유용합니다.

폼을 생성한 뒤에는 필드 상태 시그널로 테스트합니다. 일반적으로 `valid()`, `invalid()`, `disabled()`, `required()`, `errors()`를 검증합니다. 대부분의 폼 로직은 DOM 없이 이것만으로도 동작을 확인할 수 있습니다.

<!--
## Testing a form with multiple rules

After the injector setup is in place, a good next step is a complete test that exercises a few pieces of form logic together. This kind of test is still isolated, but it looks much closer to a real application form.

For example, this test verifies both a basic required rule and a conditional required rule that depends on another field:

```ts {header: 'profile-form.spec.ts'}
import {Injector, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('updates validation state when related fields change', () => {
    const model = signal({
      name: '',
      age: 5,
    });

    const profileForm = form(
      model,
      (path) => {
        required(path.name);
        required(path.name, {
          error: (ctx) => ({kind: `required-${ctx.valueOf(path.age)}`}),
          when: ({valueOf}) => valueOf(path.age) > 10,
        });
      },
      {injector: TestBed.inject(Injector)},
    );

    expect(profileForm.name().invalid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([expect.objectContaining({kind: 'required'})]);

    profileForm.age().value.set(15);

    expect(profileForm.name().errors()).toEqual([
      expect.objectContaining({kind: 'required'}),
      expect.objectContaining({kind: 'required-15'}),
    ]);

    profileForm.name().value.set('Ada');

    expect(profileForm.name().valid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([]);
  });
});
```

This example shows an important testing pattern: update one field, then assert against the state of another field. Because Signal Forms rules are reactive, a field's validation can depend on sibling values, parent values, or other derived conditions. Tests should verify those relationships directly instead of only checking the field that changed.

For validation-focused tests, `errors()` is usually the most useful assertion. `valid()` and `invalid()` tell you whether the field currently passes validation, but `errors()` shows which rule produced the failure. That becomes especially useful once a field has multiple validators or conditional rules.

The same structure works for most everyday form tests:

1. Create a model signal with the smallest shape that reproduces the behavior.
1. Build the form with an explicit injector.
1. Assert the initial field state.
1. Change a field with `.value.set(...)`, including sibling fields when testing cross-field rules.
1. Assert the updated state signals, usually `errors()`, `valid()`, or `invalid()`.

When a test is about schema behavior rather than rendering, default to this isolated style. It is faster than a component test and makes it easier to see which rule is responsible when the behavior changes.
-->

<a id="testing-a-form-with-multiple-rules"></a>

## 여러 규칙이 있는 폼 테스트하기

인젝터를 설정했다면 여러 폼 로직을 함께 실행하는 완전한 테스트를 작성해 보세요. 여전히 독립적인 테스트이지만 실제 애플리케이션의 폼과 더 비슷합니다.

예를 들어 다음 테스트는 기본 필수 규칙과 다른 필드에 의존하는 조건부 필수 규칙을 함께 검증합니다:

```ts {header: 'profile-form.spec.ts'}
import {Injector, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {form, required} from '@angular/forms/signals';
import {describe, expect, it} from 'vitest';

describe('profile form', () => {
  it('updates validation state when related fields change', () => {
    const model = signal({
      name: '',
      age: 5,
    });

    const profileForm = form(
      model,
      (path) => {
        required(path.name);
        required(path.name, {
          error: (ctx) => ({kind: `required-${ctx.valueOf(path.age)}`}),
          when: ({valueOf}) => valueOf(path.age) > 10,
        });
      },
      {injector: TestBed.inject(Injector)},
    );

    expect(profileForm.name().invalid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([expect.objectContaining({kind: 'required'})]);

    profileForm.age().value.set(15);

    expect(profileForm.name().errors()).toEqual([
      expect.objectContaining({kind: 'required'}),
      expect.objectContaining({kind: 'required-15'}),
    ]);

    profileForm.name().value.set('Ada');

    expect(profileForm.name().valid()).toBe(true);
    expect(profileForm.name().errors()).toEqual([]);
  });
});
```

이 예제는 필드 하나를 변경하고 다른 필드의 상태를 검증하는 중요한 테스트 패턴을 보여 줍니다. Signal Forms의 규칙은 반응형이므로 필드의 유효성 검사가 형제 필드의 값, 부모 필드의 값, 또는 다른 파생 조건에 의존할 수 있습니다. 변경한 필드만 확인하지 말고 이런 관계를 직접 검증하세요.

유효성 검사에 집중하는 테스트에서는 보통 `errors()`를 검증하는 것이 가장 유용합니다. `valid()`와 `invalid()`는 현재 필드가 검사를 통과하는지 알려 주지만, `errors()`는 어떤 규칙 때문에 실패했는지 보여 줍니다. 검사 함수나 조건부 규칙이 여러 개 있을 때 특히 유용합니다.

대부분의 폼 테스트는 같은 구조를 따릅니다:

1. 테스트할 동작을 재현하는 최소 구조의 모델 시그널을 만듭니다.
1. 인젝터를 명시적으로 전달하여 폼을 생성합니다.
1. 초기 필드 상태를 검증합니다.
1. `.value.set(...)`으로 필드를 변경합니다. 필드 간 규칙을 테스트할 때는 형제 필드도 변경합니다.
1. 갱신된 상태 시그널을 검증합니다. 보통 `errors()`, `valid()`, `invalid()`를 확인합니다.

렌더링이 아니라 스키마 동작을 확인하는 테스트라면 이 독립적인 방식을 기본으로 사용하세요. 컴포넌트 테스트보다 빠르며 동작이 변경되었을 때 어떤 규칙이 원인인지 파악하기 쉽습니다.

<!--
## Testing forms bound to components

When you need to verify behavior that depends on template bindings, user interaction through `dispatchEvent`, or custom form controls that manage their own rendering, isolated tests are not enough. You need component-bound tests to render the template so that you can interact with actual DOM elements.

### Setting up a component test

Component-bound tests render the component so you can interact with actual DOM elements. Create the component with `TestBed.createComponent()` and wait for rendering to complete before asserting:

```angular-ts {header: 'profile-form.ts'}
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-profile-form',
  imports: [FormField],
  template: `<input [formField]="profileForm.name" />`,
})
export class ProfileForm {
  readonly model = signal({name: 'Ada'});
  readonly profileForm = form(this.model, (path) => {
    required(path.name);
  });
}
```

```ts {header: 'profile-form.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {describe, expect, it} from 'vitest';
import {ProfileForm} from './profile-form';

describe('ProfileForm', () => {
  it('reflects model values in the DOM and updates the model on user input', async () => {
    const fixture = TestBed.createComponent(ProfileForm);
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    // Model → View: the input reflects the model's initial value
    expect(input.value).toBe('Ada');

    // View → Model: simulate the user clearing the field
    input.value = '';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(fixture.componentInstance.profileForm.name().value()).toBe('');
    expect(fixture.componentInstance.profileForm.name().valid()).toBe(false);
  });
});
```

Notice that the component uses `form()` without an explicit injector because the component's own injection context provides it automatically. After each change, `await fixture.whenStable()` waits for rendering and effects to complete before asserting.

The same pattern works for async operations such as async validators or server calls. Call `await fixture.whenStable()` after the async work resolves.
-->

<a id="testing-forms-bound-to-components"></a>

## 컴포넌트에 바인딩된 폼 테스트하기

템플릿 바인딩에 의존하는 동작, `dispatchEvent`를 사용하는 사용자 상호작용, 자체 렌더링을 관리하는 커스텀 폼 컨트롤을 검증해야 한다면 독립적인 테스트만으로는 충분하지 않습니다. 템플릿을 렌더링하는 컴포넌트 기반 테스트로 실제 DOM 엘리먼트와 상호작용해야 합니다.

<a id="setting-up-a-component-test"></a>

### 컴포넌트 테스트 설정하기

컴포넌트 기반 테스트는 컴포넌트를 렌더링하므로 실제 DOM 엘리먼트와 상호작용할 수 있습니다. `TestBed.createComponent()`로 컴포넌트를 생성하고 렌더링이 끝난 뒤에 검증하세요:

```angular-ts {header: 'profile-form.ts'}
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-profile-form',
  imports: [FormField],
  template: `<input [formField]="profileForm.name" />`,
})
export class ProfileForm {
  readonly model = signal({name: 'Ada'});
  readonly profileForm = form(this.model, (path) => {
    required(path.name);
  });
}
```

```ts {header: 'profile-form.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {describe, expect, it} from 'vitest';
import {ProfileForm} from './profile-form';

describe('ProfileForm', () => {
  it('reflects model values in the DOM and updates the model on user input', async () => {
    const fixture = TestBed.createComponent(ProfileForm);
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    // 모델 → 뷰: 입력 엘리먼트에 모델의 초기값이 반영됩니다.
    expect(input.value).toBe('Ada');

    // 뷰 → 모델: 사용자가 필드를 비우는 동작을 흉내 냅니다.
    input.value = '';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(fixture.componentInstance.profileForm.name().value()).toBe('');
    expect(fixture.componentInstance.profileForm.name().valid()).toBe(false);
  });
});
```

컴포넌트 자체의 의존성 주입 컨텍스트가 자동으로 제공되므로 여기서는 인젝터를 명시하지 않고 `form()`을 사용합니다. 변경 후에는 `await fixture.whenStable()`로 렌더링과 이펙트 함수가 끝날 때까지 기다린 다음 검증합니다.

비동기 유효성 검사나 서버 호출 같은 비동기 작업에도 같은 패턴을 사용합니다. 비동기 작업이 완료된 뒤 `await fixture.whenStable()`을 호출하세요.

<!--
## When to use each approach

| What you need to verify                              | Approach        |
| ---------------------------------------------------- | --------------- |
| Validation rules, `errors()`, `valid()`, `invalid()` | Isolated        |
| Disabled, required, or readonly state                | Isolated        |
| Cross-field reactive dependencies                    | Isolated        |
| Conditional schemas (`applyWhen`, `applyWhenValue`)  | Isolated        |
| Input values rendering in the DOM                    | Component-bound |
| User typing updating the model                       | Component-bound |
| Custom form controls with their own templates        | Component-bound |
| Focus management or accessibility attributes         | Component-bound |

Most forms only need isolated tests. The form's logic (such as validation, disabled state, cross-field rules) lives in the schema, and schemas do not need a template to run. Component-bound tests add value when the behavior you care about crosses the boundary between the form and the DOM.
-->

<a id="when-to-use-each-approach"></a>

## 상황에 맞는 테스트 방식 선택하기

| 검증할 동작                                          | 방식                 |
| ---------------------------------------------------- | -------------------- |
| 유효성 검사 규칙, `errors()`, `valid()`, `invalid()` | 독립적인 테스트      |
| 비활성화, 필수, 읽기 전용 상태                       | 독립적인 테스트      |
| 필드 간 반응형 의존 관계                             | 독립적인 테스트      |
| 조건부 스키마(`applyWhen`, `applyWhenValue`)         | 독립적인 테스트      |
| DOM에 렌더링된 입력 값                               | 컴포넌트 기반 테스트 |
| 사용자 입력에 따른 모델 갱신                         | 컴포넌트 기반 테스트 |
| 자체 템플릿이 있는 커스텀 폼 컨트롤                  | 컴포넌트 기반 테스트 |
| 포커스 관리 또는 접근성 속성                         | 컴포넌트 기반 테스트 |

대부분의 폼에는 독립적인 테스트만 있으면 됩니다. 유효성 검사, 비활성화 상태, 필드 간 규칙 같은 폼 로직은 스키마에 있으며, 스키마를 실행할 때는 템플릿이 필요하지 않습니다. 확인할 동작이 폼과 DOM 사이를 오갈 때 컴포넌트 기반 테스트가 유용합니다.

<!--
## Next steps

This guide covered testing Signal Forms in isolation and with component templates. Here are related guides that explore other aspects of Signal Forms:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/form-submission" title="Form submission" />
</docs-pill-row>
-->

<a id="next-steps"></a>

## 다음 단계

이 가이드에서는 Signal Forms를 독립적으로 테스트하는 방법과 컴포넌트 템플릿으로 테스트하는 방법을 살펴봤습니다. 관련 가이드에서 다른 기능도 알아보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/form-submission" title="폼 제출" />
</docs-pill-row>
