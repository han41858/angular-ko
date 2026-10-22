<!--
# Dynamic Forms with JSON

Some forms can't define their structure at compile time. Server-driven forms, admin panels, multi-tenant applications, and CMS-managed content all need to render fields from configuration delivered at runtime, typically as JSON from a backend, an admin tool, or per-tenant settings.

This guide shows how to build forms whose model, schema, validation, and rendering are all derived from a single runtime configuration.
-->

<a id="dynamic-forms-with-json"></a>

# JSON으로 동적 폼 만들기

컴파일 시점에는 구조를 정할 수 없는 폼도 있습니다. 서버 기반 폼, 관리자 화면, 멀티테넌트 애플리케이션, CMS에서 관리하는 콘텐츠는 모두 실행 중에 전달되는 설정을 바탕으로 필드를 렌더링해야 합니다. 이런 설정은 보통 백엔드, 관리 도구, 테넌트별 설정에서 JSON으로 제공됩니다.

이 가이드에서는 실행 시점의 설정 하나에서 모델, 스키마, 유효성 검사, 렌더링을 모두 구성하는 폼을 만드는 방법을 알아봅니다.

<!--
## When to use JSON-driven forms

This pattern is a good choice when:

- A backend defines which fields appear based on user role, feature flags, or business rules
- Non-developers configure form structure through an admin panel or CMS
- Each tenant in a multi-tenant application has its own form structure stored as configuration
- Forms need to evolve without redeploying the frontend

Use a static form (with fields defined directly in your component) when the structure is known at build time. Static forms get full TypeScript checking on every field, plus straightforward testing and tooling support.
-->

<a id="when-to-use-json-driven-forms"></a>

## JSON 기반 폼을 사용하기 적합한 경우

다음과 같은 상황에 적합한 패턴입니다:

- 백엔드가 사용자 역할, 기능 플래그, 업무 규칙에 따라 표시할 필드를 결정하는 경우
- 개발자가 아닌 사람이 관리자 화면이나 CMS에서 폼 구조를 설정하는 경우
- 멀티테넌트 애플리케이션에서 테넌트마다 별도의 폼 구조를 설정으로 저장하는 경우
- 프론트엔드를 다시 배포하지 않고 폼을 변경해야 하는 경우

빌드 시점에 구조를 안다면 컴포넌트에 필드를 직접 정의하는 정적 폼을 사용하세요. 정적 폼은 모든 필드에 대해 완전한 TypeScript 검사를 받을 수 있고, 테스트와 도구 지원도 단순합니다.

<!--
## Defining a typed field config

When you want to render fields from runtime configuration, start with a TypeScript type that captures the shape of each field. A discriminated union by `kind` lets each variant declare its own validation options:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean}
  | {kind: 'number'; name: string; label: string; required?: boolean; min?: number; max?: number};
```

Every variant has a name, label, and optional `required` flag. Number fields additionally accept `min` and `max` bounds. Add new variants by adding new `kind` branches.

A concrete config might look like this:

```ts
const profileConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
  {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
];
```

In practice this `FieldConfig[]` typically arrives from your backend, an admin panel, or a CMS. For brevity, the examples below use an in-component literal.
-->

<a id="defining-a-typed-field-config"></a>

## 타입이 있는 필드 설정 정의하기

실행 시점의 설정으로 필드를 렌더링하려면 먼저 각 필드의 구조를 표현하는 TypeScript 타입을 정의하세요. `kind`를 구분자로 사용하는 유니언 타입을 사용하면 종류마다 고유한 유효성 검사 옵션을 선언할 수 있습니다:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean}
  | {kind: 'number'; name: string; label: string; required?: boolean; min?: number; max?: number};
```

모든 종류의 필드는 이름, 라벨, 선택적 `required` 플래그를 가집니다. 숫자 필드는 `min`, `max` 범위도 지정할 수 있습니다. 새로운 종류가 필요하면 `kind` 분기를 추가하세요.

구체적인 설정은 다음과 같습니다:

```ts
const profileConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
  {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
];
```

실제로 이 `FieldConfig[]`는 대체로 백엔드, 관리자 화면, CMS에서 전달됩니다. 아래 예제는 간결하게 보여 주기 위해 컴포넌트 안의 리터럴을 사용합니다.

<!--
## Building the model from config

The form's model needs one entry per field with a default value matching the field's kind. A small helper handles this:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null> {
  const initial: Record<string, string | number | null> = {};
  for (const config of configs) {
    initial[config.name] = config.kind === 'number' ? null : '';
  }
  return initial;
}
```

The model uses `Record<string, string | number | null>` because the keys are not known ahead of time.

In addition, numeric fields initialize to `null` rather than `0` so an empty field reads as empty. With `0`, [`required()`](api/forms/signals/required) would treat the field as already filled, and any [`min()`](api/forms/signals/min) constraint above zero would flag the field invalid before the user enters anything.
-->

<a id="building-the-model-from-config"></a>

## 설정으로 모델 만들기

폼 모델에는 각 필드의 종류에 맞는 기본값을 가진 항목이 하나씩 필요합니다. 작은 헬퍼 함수로 처리할 수 있습니다:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null> {
  const initial: Record<string, string | number | null> = {};
  for (const config of configs) {
    initial[config.name] = config.kind === 'number' ? null : '';
  }
  return initial;
}
```

키를 미리 알 수 없으므로 모델은 `Record<string, string | number | null>`을 사용합니다.

숫자 필드는 빈 필드가 빈 값으로 처리되도록 `0` 대신 `null`로 초기화합니다. `0`을 사용하면 [`required()`](api/forms/signals/required)가 이미 입력된 것으로 판단하고, 0보다 큰 [`min()`](api/forms/signals/min) 제약 조건은 사용자가 입력하기 전부터 필드를 유효하지 않은 상태로 만듭니다.

<!--
## Building the schema from config

The schema is also derived from the config. You can loop through each entry and apply the validators that match its kind:

```ts
import {required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (path) => {
    for (const config of configs) {
      const fieldPath = path[config.name];

      if (config.required) {
        required(fieldPath);
      }

      if (config.kind === 'number') {
        const numberPath = fieldPath as unknown as SchemaPath<number | null>;
        if (config.min !== undefined) min(numberPath, config.min);
        if (config.max !== undefined) max(numberPath, config.max);
      }
    }
  };
}
```

The discriminated union narrows `config` inside each branch, so `config.min` and `config.max` are typed correctly when `config.kind === 'number'`.
-->

<a id="building-the-schema-from-config"></a>

## 설정으로 스키마 만들기

스키마도 설정에서 만듭니다. 각 항목을 순회하며 종류에 맞는 유효성 검사 함수를 적용할 수 있습니다:

```ts
import {required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (path) => {
    for (const config of configs) {
      const fieldPath = path[config.name];

      if (config.required) {
        required(fieldPath);
      }

      if (config.kind === 'number') {
        const numberPath = fieldPath as unknown as SchemaPath<number | null>;
        if (config.min !== undefined) min(numberPath, config.min);
        if (config.max !== undefined) max(numberPath, config.max);
      }
    }
  };
}
```

구분된 유니언 타입은 각 분기 안에서 `config`의 타입을 좁힙니다. 따라서 `config.kind === 'number'`일 때 `config.min`과 `config.max`의 타입이 올바르게 지정됩니다.

<!--
## Expressing conditional rules in config

Some validation rules only make sense under certain conditions. For example, US state codes need validating only when the country is the US. Express these dependencies in the config by adding a `when` discriminator that names another field and the value it must equal:

```ts
type WhenCondition = {field: string; equals: string | number};

type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    };
```

Update `buildSchema()` to translate `when` into an [`applyWhen()`](api/forms/signals/applyWhen) call. Shared rule application logic moves into a small closure so the conditional and unconditional branches both call the same function:

```ts
import {applyWhen, required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];
        if (config.required) required(fieldPath);
        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

When `applyWhen()`'s condition is true, the rules inside activate. When the condition becomes false, the rules deactivate and the field's validation state clears. Because the condition function reads through `valueOf(rootPath[field])`, the form re-evaluates the gate every time the referenced field changes.

A config that uses `when` looks like this:

```ts
const addressConfig: FieldConfig[] = [
  {kind: 'text', name: 'country', label: 'Country', required: true},
  {
    kind: 'text',
    name: 'stateCode',
    label: 'State',
    required: true,
    when: {field: 'country', equals: 'US'},
  },
];
```

The `stateCode` field only requires a value when `country` is `'US'`. Users entering any other country can leave `stateCode` blank without blocking submission.

For more complex conditions (multiple fields, ranges, or non-equality checks), extend `WhenCondition` with additional discriminators (such as `in: string[]` or `notEquals: string | number`) and translate each variant inside `buildSchema()`. The principle is the same: the config carries the data, `buildSchema()` translates it to `applyWhen()` calls.

To gate visibility instead of validation, follow the same pattern using [`hidden()`](api/forms/signals/hidden) on the field path. See [Configuring `hidden()` state on fields](guide/forms/signals/form-logic#configuring-hidden-state-on-fields) for details.
-->

<a id="expressing-conditional-rules-in-config"></a>

## 설정으로 조건부 규칙 표현하기

일부 검사 규칙은 특정 조건에서만 의미가 있습니다. 예를 들어 미국의 주 코드는 국가가 미국일 때만 검사해야 합니다. 다른 필드의 이름과 그 필드가 가져야 할 값을 지정하는 `when` 구분자를 추가하여 이런 의존 관계를 설정에 표현하세요:

```ts
type WhenCondition = {field: string; equals: string | number};

type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    };
```

`buildSchema()`가 `when`을 [`applyWhen()`](api/forms/signals/applyWhen) 호출로 변환하도록 수정하세요. 규칙을 적용하는 공통 로직을 작은 클로저로 옮기면 조건이 있는 분기와 없는 분기에서 같은 함수를 호출할 수 있습니다:

```ts
import {applyWhen, required, min, max, SchemaFn, SchemaPath} from '@angular/forms/signals';

function buildSchema(configs: FieldConfig[]): SchemaFn<Record<string, string | number | null>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];
        if (config.required) required(fieldPath);
        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

`applyWhen()`의 조건이 참이면 내부 규칙이 활성화됩니다. 조건이 거짓이 되면 규칙이 비활성화되고 필드의 유효성 검사 상태가 초기화됩니다. 조건 함수가 `valueOf(rootPath[field])`로 값을 읽으므로 참조한 필드가 변경될 때마다 조건을 다시 평가합니다.

`when`을 사용하는 설정은 다음과 같습니다:

```ts
const addressConfig: FieldConfig[] = [
  {kind: 'text', name: 'country', label: 'Country', required: true},
  {
    kind: 'text',
    name: 'stateCode',
    label: 'State',
    required: true,
    when: {field: 'country', equals: 'US'},
  },
];
```

`stateCode` 필드는 `country`가 `'US'`일 때만 필수입니다. 다른 국가를 입력한 사용자는 `stateCode`를 비워 두어도 제출할 수 있습니다.

여러 필드, 범위, 같음 이외의 비교처럼 더 복잡한 조건이 필요하면 `WhenCondition`에 `in: string[]`, `notEquals: string | number` 같은 구분자를 추가하고 `buildSchema()`에서 종류별로 변환하세요. 설정은 데이터를 담고 `buildSchema()`가 이를 `applyWhen()` 호출로 변환한다는 원리는 같습니다.

유효성 검사 대신 표시 여부를 제어하려면 같은 패턴으로 필드 경로에 [`hidden()`](api/forms/signals/hidden)을 적용하세요. 자세한 내용은 [필드의 `hidden()` 상태 설정하기](guide/forms/signals/form-logic#configuring-hidden-state-on-fields)를 참고하세요.

<!--
## Expressing repeating fields in config

Some configurations need fields that grow and shrink at runtime, like a list of phone numbers, tags, or invoice line items. Add an `array` kind to the config and translate it to [`applyEach()`](api/forms/signals/applyEach) so per-item rules apply uniformly as items come and go.

Extend `FieldConfig` with an `array` variant. This example uses arrays of strings; the same approach scales to arrays of objects by replacing the item shape with a record:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    }
  | {kind: 'array'; name: string; label: string; itemRequired?: boolean; when?: WhenCondition};
```

Update `buildModel()` to initialize array fields with an empty array. The model widens to include `string[]`:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null | string[]> {
  const initial: Record<string, string | number | null | string[]> = {};
  for (const config of configs) {
    if (config.kind === 'number') initial[config.name] = null;
    else if (config.kind === 'array') initial[config.name] = [];
    else initial[config.name] = '';
  }
  return initial;
}
```

Update `buildSchema()` to apply per-item rules with `applyEach()`. The path coming from a `Record<string, string | number | null | string[]>` model is too broad for `applyEach()` (and for `min()` / `max()`) to type-check directly, so cast `fieldPath` to the appropriate shape inside each `kind` branch:

```ts
import {
  applyEach,
  applyWhen,
  required,
  min,
  max,
  SchemaFn,
  SchemaPath,
} from '@angular/forms/signals';

function buildSchema(
  configs: FieldConfig[],
): SchemaFn<Record<string, string | number | null | string[]>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];

        if (config.kind === 'array') {
          const arrayPath = fieldPath as unknown as SchemaPath<string[]>;
          if (config.itemRequired) {
            applyEach(arrayPath, (item) => required(item));
          }
          return;
        }

        if (config.required) required(fieldPath);

        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

The casts inside each branch are deliberate escape hatches: you're trading the compiler's structural guarantee for a runtime invariant the surrounding `kind` check enforces. Each cast is scoped to a `kind` block, so the assumption stays local and straightforward to audit.

A config that uses the `array` kind looks like this:

```ts
const contactConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full name', required: true},
  {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
];
```

To render an array field, iterate it with `@for` and let users add or remove items by updating the model signal. Add a typed accessor that returns a [`FieldTree`](api/forms/signals/FieldTree) so the iteration sees the array structure, and define methods to grow and shrink the model:

```ts
import {FieldTree} from '@angular/forms/signals';

// inside the component class
asArrayField(name: string): FieldTree<string[]> {
  return this.dynamicForm[name] as unknown as FieldTree<string[]>;
}

addItem(name: string) {
  this.model.update(current => ({
    ...current,
    [name]: [...(current[name] as string[]), ''],
  }));
}

removeItem(name: string, index: number) {
  this.model.update(current => ({
    ...current,
    [name]: (current[name] as string[]).filter((_, i) => i !== index),
  }));
}
```

`FieldTree<string[]>` is iterable, so `@for` can walk it; each item is a `FieldTree<string>` that satisfies `[formField]` directly. Leaf fields can use `Field<T>` accessors instead, since `Field<T>` is the callable signature without iteration.

In the template, render an array case like this:

```angular-html
@case ('array') {
  <fieldset>
    <legend>{{ config.label }}</legend>
    @for (item of asArrayField(config.name); track item) {
      <input type="text" [formField]="item" />
      <button type="button" (click)="removeItem(config.name, $index)">Remove</button>
    }
    <button type="button" (click)="addItem(config.name)">Add</button>
  </fieldset>
}
```

The `addItem()` method extends the model; the form re-derives the array's fields automatically. New items start with fresh validation state. The `removeItem()` method filters the model. Because arrays of primitives are [tracked by position](#tracking-item-identity), field state is tied to the index rather than the value: when an item is removed, subsequent values shift into earlier positions and inherit their existing field state, while the trailing field is dropped.

### Tracking item identity

Signal Forms tracks each item in an array of objects by its identity. When you store a reference to a field at a specific position, that reference follows the underlying data, not the position. Reading state through the held reference returns the data even if it has moved:

```ts
const contactModel = signal([
  {name: 'Alice', phone: '555-0001'},
  {name: 'Bob', phone: '555-0002'},
]);

const contactForm = form(contactModel);

// Hold a reference to the field that's currently at index 0 (Alice).
const aliceField = contactForm[0];

// Swap the array items so Bob is at index 0, Alice at index 1.
contactModel.update(([alice, bob]) => [bob, alice]);

// The held reference still points to Alice's field, even after the swap.
console.log(aliceField().value().phone); // '555-0001' (Alice's number)
console.log(contactForm[0]().value().phone); // '555-0002' (Bob, now at index 0)
```

This identity tracking prevents bugs when sorting, reordering, or filtering, as long as the referenced item remains in the array. Stored field references remain valid even when array order changes; removing the referenced item itself orphans the held reference.

For arrays of primitives (the `phoneNumbers` example above), Signal Forms tracks items positionally instead: index 0 always refers to whatever value is currently at position 0.

Identity here is by JavaScript object reference, not by a logical id like a database key. If you replace the array with freshly-deserialized objects (for example, after a server reload), field state doesn't follow the logical item even when each item's `id` is unchanged. The guarantee covers in-memory operations like sorting, reordering, and filtering, not data refresh.
-->

<a id="expressing-repeating-fields-in-config"></a>

## 설정으로 반복 필드 표현하기

전화번호, 태그, 청구서 항목 목록처럼 실행 중에 늘어나거나 줄어드는 필드가 필요한 경우도 있습니다. 설정에 `array` 종류를 추가하고 [`applyEach()`](api/forms/signals/applyEach)로 변환하면 항목이 추가되거나 삭제될 때도 동일한 항목별 규칙을 적용할 수 있습니다.

`FieldConfig`에 `array` 종류를 추가하세요. 이 예제는 문자열 배열을 사용하지만, 항목 구조를 레코드로 바꾸면 객체 배열에도 같은 방식을 적용할 수 있습니다:

```ts
type FieldConfig =
  | {kind: 'text'; name: string; label: string; required?: boolean; when?: WhenCondition}
  | {
      kind: 'number';
      name: string;
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
      when?: WhenCondition;
    }
  | {kind: 'array'; name: string; label: string; itemRequired?: boolean; when?: WhenCondition};
```

배열 필드를 빈 배열로 초기화하도록 `buildModel()`을 수정하세요. 모델 타입에는 `string[]`을 추가합니다:

```ts
function buildModel(configs: FieldConfig[]): Record<string, string | number | null | string[]> {
  const initial: Record<string, string | number | null | string[]> = {};
  for (const config of configs) {
    if (config.kind === 'number') initial[config.name] = null;
    else if (config.kind === 'array') initial[config.name] = [];
    else initial[config.name] = '';
  }
  return initial;
}
```

`buildSchema()`에서 `applyEach()`로 항목별 규칙을 적용하도록 수정하세요. `Record<string, string | number | null | string[]>` 모델의 경로는 타입 범위가 너무 넓어 `applyEach()`나 `min()`, `max()`의 타입 검사를 직접 통과하지 못합니다. 각 `kind` 분기 안에서 `fieldPath`를 적절한 타입으로 변환하세요:

```ts
import {
  applyEach,
  applyWhen,
  required,
  min,
  max,
  SchemaFn,
  SchemaPath,
} from '@angular/forms/signals';

function buildSchema(
  configs: FieldConfig[],
): SchemaFn<Record<string, string | number | null | string[]>> {
  return (rootPath) => {
    for (const config of configs) {
      const applyRules = (path: typeof rootPath) => {
        const fieldPath = path[config.name];

        if (config.kind === 'array') {
          const arrayPath = fieldPath as unknown as SchemaPath<string[]>;
          if (config.itemRequired) {
            applyEach(arrayPath, (item) => required(item));
          }
          return;
        }

        if (config.required) required(fieldPath);

        if (config.kind === 'number') {
          const numberPath = fieldPath as unknown as SchemaPath<number | null>;
          if (config.min !== undefined) min(numberPath, config.min);
          if (config.max !== undefined) max(numberPath, config.max);
        }
      };

      if (config.when) {
        const {field, equals} = config.when;
        applyWhen(rootPath, ({valueOf}) => valueOf(rootPath[field]) === equals, applyRules);
      } else {
        applyRules(rootPath);
      }
    }
  };
}
```

각 분기의 타입 단언은 의도적으로 타입 검사를 벗어나는 방법입니다. 컴파일러의 구조적 보장 대신 주변의 `kind` 검사가 실행 시점에 보장하는 조건에 의존합니다. 단언을 각 `kind` 블록 안으로 제한하므로 가정의 범위가 좁고 확인하기 쉽습니다.

`array` 종류를 사용하는 설정은 다음과 같습니다:

```ts
const contactConfig: FieldConfig[] = [
  {kind: 'text', name: 'fullName', label: 'Full name', required: true},
  {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
];
```

배열 필드를 렌더링할 때는 `@for`로 순회하고, 모델 시그널을 갱신하여 사용자가 항목을 추가하거나 삭제할 수 있게 하세요. 순회할 때 배열 구조를 알 수 있도록 [`FieldTree`](api/forms/signals/FieldTree)를 반환하는 타입이 지정된 접근자를 추가하고, 모델의 항목을 늘리거나 줄이는 메서드를 정의하세요:

```ts
import {FieldTree} from '@angular/forms/signals';

// 컴포넌트 클래스 내부
asArrayField(name: string): FieldTree<string[]> {
  return this.dynamicForm[name] as unknown as FieldTree<string[]>;
}

addItem(name: string) {
  this.model.update(current => ({
    ...current,
    [name]: [...(current[name] as string[]), ''],
  }));
}

removeItem(name: string, index: number) {
  this.model.update(current => ({
    ...current,
    [name]: (current[name] as string[]).filter((_, i) => i !== index),
  }));
}
```

`FieldTree<string[]>`는 반복 가능한 객체이므로 `@for`로 순회할 수 있습니다. 각 항목은 `[formField]`에 바로 바인딩할 수 있는 `FieldTree<string>`입니다. 말단 필드에는 `Field<T>` 접근자를 사용해도 됩니다. `Field<T>`는 순회 기능 없이 호출 시그니처만 제공하기 때문입니다.

템플릿에서 배열 종류는 다음과 같이 렌더링합니다:

```angular-html
@case ('array') {
  <fieldset>
    <legend>{{ config.label }}</legend>
    @for (item of asArrayField(config.name); track item) {
      <input type="text" [formField]="item" />
      <button type="button" (click)="removeItem(config.name, $index)">Remove</button>
    }
    <button type="button" (click)="addItem(config.name)">Add</button>
  </fieldset>
}
```

`addItem()`이 모델을 확장하면 폼이 배열의 필드를 자동으로 다시 구성합니다.
새 항목은 새로운 유효성 검사 상태로 시작합니다.
`removeItem()`은 모델을 필터링합니다.
원시 값 배열은 [위치로 추적](#tracking-item-identity)하므로 필드 상태는 값이 아니라 인덱스에 연결됩니다.
항목을 삭제하면 뒤에 있던 값이 앞쪽 위치로 이동하면서 해당 위치의 기존 필드 상태를 이어받고, 마지막 필드는 제거됩니다.

<a id="tracking-item-identity"></a>

### 항목의 동일성 추적하기

Signal Forms는 객체 배열의 각 항목을 객체의 동일성으로 추적합니다. 특정 위치의 필드 참조를 저장하면 참조는 위치가 아니라 원본 데이터를 따라갑니다. 항목이 이동하더라도 저장한 참조로 상태를 읽으면 해당 데이터를 얻을 수 있습니다:

```ts
const contactModel = signal([
  {name: 'Alice', phone: '555-0001'},
  {name: 'Bob', phone: '555-0002'},
]);

const contactForm = form(contactModel);

// 현재 인덱스 0에 있는 필드(Alice)의 참조를 저장합니다.
const aliceField = contactForm[0];

// Bob이 인덱스 0, Alice가 인덱스 1에 오도록 배열 항목을 바꿉니다.
contactModel.update(([alice, bob]) => [bob, alice]);

// 위치를 바꿔도 저장한 참조는 여전히 Alice의 필드를 가리킵니다.
console.log(aliceField().value().phone); // '555-0001' (Alice의 번호)
console.log(contactForm[0]().value().phone); // '555-0002' (현재 인덱스 0에 있는 Bob)
```

참조한 항목이 배열에 남아 있다면, 동일성 추적은 정렬, 순서 변경, 필터링 시 발생할 수 있는 버그를 방지합니다. 배열의 순서가 달라져도 저장한 필드 참조는 유효합니다. 참조한 항목 자체를 삭제하면 저장된 참조는 연결 대상을 잃습니다.

위의 `phoneNumbers`처럼 원시 값 배열에서는 위치로 항목을 추적합니다. 인덱스 0은 항상 현재 0번째 위치의 값을 가리킵니다.

여기서 동일성은 데이터베이스 키 같은 논리적 ID가 아니라 JavaScript 객체 참조를 기준으로 합니다. 서버에서 다시 불러오는 등 새로 역직렬화한 객체로 배열을 교체하면 항목의 `id`가 같아도 필드 상태가 논리적 항목을 따라가지 않습니다. 이 보장은 메모리 안에서의 정렬, 순서 변경, 필터링에 적용되며 데이터 새로고침에는 적용되지 않습니다.

<!--
## Validating the config

Configs from external sources need validation before the form is built. Several failure modes can hide in untrusted JSON:

- Duplicate `name` values overwrite earlier model entries and break the `track config.name` expression in the template.
- A `when` clause that names a non-existent field fails at runtime when the condition first evaluates.
- A `when` clause that compares against an `array` field has no defined equality semantics.
- A `when.equals` value whose type doesn't match the referenced field's kind silently never matches, hiding the conditional behavior as if the rule were never active.

Catch all four at the boundary:

```ts
function validateConfigs(configs: FieldConfig[]): FieldConfig[] {
  const knownNames = new Set<string>();

  for (const config of configs) {
    if (knownNames.has(config.name)) {
      throw new Error(`Duplicate field name in config: "${config.name}"`);
    }
    knownNames.add(config.name);
  }

  for (const config of configs) {
    if (!config.when) continue;
    if (!knownNames.has(config.when.field)) {
      throw new Error(
        `Field "${config.name}" references unknown field "${config.when.field}" in its 'when' condition.`,
      );
    }
    const referenced = configs.find((c) => c.name === config.when!.field)!;
    if (referenced.kind === 'array') {
      throw new Error(
        `Field "${config.name}" cannot use 'when' to compare against array field "${config.when.field}".`,
      );
    }
    const expected = referenced.kind === 'text' ? 'string' : 'number';
    if (typeof config.when.equals !== expected) {
      throw new Error(
        `Field "${config.name}" compares ${referenced.kind} field "${config.when.field}" against a ${typeof config.when.equals} value; expected a ${expected}.`,
      );
    }
  }

  return configs;
}
```

The first pass enforces uniqueness; the second pass walks each `when` clause to confirm the referenced field exists, isn't an array, and is being compared against a value of the right type. The function returns the configs unchanged on success, so it composes cleanly with the field initializer that holds the configs in the component. Failures surface at the boundary between your application and the upstream source rather than as opaque form misbehavior later.
-->

<a id="validating-the-config"></a>

## 설정 검증하기

외부에서 받은 설정은 폼을 만들기 전에 검증해야 합니다. 신뢰할 수 없는 JSON에는 다음과 같은 문제가 숨어 있을 수 있습니다:

- `name`이 중복되면 앞선 모델 항목을 덮어쓰며 템플릿의 `track config.name` 표현식도 제대로 동작하지 않습니다.
- `when`에서 존재하지 않는 필드를 참조하면 조건을 처음 평가할 때 런타임 에러가 발생합니다.
- `when`에서 `array` 필드를 비교하는 경우에는 동일성 비교의 의미가 정의되어 있지 않습니다.
- `when.equals`의 타입이 참조한 필드 종류와 다르면 조용히 일치하지 않는 것으로 처리됩니다. 규칙이 처음부터 활성화되지 않은 것처럼 조건부 동작이 드러나지 않습니다.

데이터를 받는 경계에서 네 가지 문제를 모두 확인하세요:

```ts
function validateConfigs(configs: FieldConfig[]): FieldConfig[] {
  const knownNames = new Set<string>();

  for (const config of configs) {
    if (knownNames.has(config.name)) {
      throw new Error(`Duplicate field name in config: "${config.name}"`);
    }
    knownNames.add(config.name);
  }

  for (const config of configs) {
    if (!config.when) continue;
    if (!knownNames.has(config.when.field)) {
      throw new Error(
        `Field "${config.name}" references unknown field "${config.when.field}" in its 'when' condition.`,
      );
    }
    const referenced = configs.find((c) => c.name === config.when!.field)!;
    if (referenced.kind === 'array') {
      throw new Error(
        `Field "${config.name}" cannot use 'when' to compare against array field "${config.when.field}".`,
      );
    }
    const expected = referenced.kind === 'text' ? 'string' : 'number';
    if (typeof config.when.equals !== expected) {
      throw new Error(
        `Field "${config.name}" compares ${referenced.kind} field "${config.when.field}" against a ${typeof config.when.equals} value; expected a ${expected}.`,
      );
    }
  }

  return configs;
}
```

첫 번째 순회는 이름의 고유성을 검사합니다. 두 번째 순회는 각 `when`을 확인하여 참조한 필드가 존재하는지, 배열이 아닌지, 올바른 타입의 값과 비교하는지 검사합니다. 성공하면 설정을 그대로 반환하므로 컴포넌트에서 설정을 보관하는 필드 초기화 코드와 자연스럽게 결합할 수 있습니다. 나중에 폼이 이해하기 어려운 오동작을 일으키는 대신 애플리케이션과 외부 데이터 소스의 경계에서 문제를 알 수 있습니다.

<!--
## Rendering the form dynamically

In the component, use `@for` to iterate the configs and `@switch` on `kind` to pick the right input control:

```angular-ts
import {Component, signal} from '@angular/core';
import {Field, FieldTree, form, FormField, FormRoot} from '@angular/forms/signals';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="dynamicForm">
      @for (config of configs; track config.name) {
        @switch (config.kind) {
          @case ('text') {
            <label>
              {{ config.label }}
              <input type="text" [formField]="asTextField(config.name)" />
            </label>
          }
          @case ('number') {
            <label>
              {{ config.label }}
              <input type="number" [formField]="asNumberField(config.name)" />
            </label>
          }
          @case ('array') {
            <fieldset>
              <legend>{{ config.label }}</legend>
              @for (item of asArrayField(config.name); track item; let i = $index) {
                <input type="text" [formField]="item" />
                <button type="button" (click)="removeItem(config.name, i)">Remove</button>
              }
              <button type="button" (click)="addItem(config.name)">Add</button>
            </fieldset>
          }
        }
      }
    </form>
  `,
})
export class DynamicForm {
  configs: FieldConfig[] = validateConfigs([
    {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
    {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
    {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
  ]);

  model = signal(buildModel(this.configs));

  dynamicForm = form(this.model, buildSchema(this.configs));

  asTextField(name: string): Field<string> {
    // <input type="text"> requires Field<string>.
    return this.dynamicForm[name] as unknown as Field<string>;
  }

  asNumberField(name: string): Field<number | null> {
    // <input type="number"> requires Field<number | null>.
    return this.dynamicForm[name] as unknown as Field<number | null>;
  }

  asArrayField(name: string): FieldTree<string[]> {
    // FieldTree (not Field) so @for can iterate the array.
    return this.dynamicForm[name] as unknown as FieldTree<string[]>;
  }

  addItem(name: string) {
    this.model.update((current) => ({
      ...current,
      [name]: [...(current[name] as string[]), ''],
    }));
  }

  removeItem(name: string, index: number) {
    this.model.update((current) => ({
      ...current,
      [name]: (current[name] as string[]).filter((_, i) => i !== index),
    }));
  }
}
```

Template type-checking treats `dynamicForm[name]` as an independent expression, so the `@switch` narrowing on `config.kind` doesn't reach the indexed access. The accessors restate that narrowing as a cast at the binding site, and the matching `kind` branch guarantees the narrowed type is correct at runtime.

Because the model and schema are both derived from the same `FieldConfig[]` at component construction, they can't drift apart for a given config. The example above assumes the config is available synchronously when the component is created.
-->

<a id="rendering-the-form-dynamically"></a>

## 폼을 동적으로 렌더링하기

컴포넌트에서는 `@for`로 설정을 순회하고 `kind`에 대한 `@switch`로 알맞은 입력 컨트롤을 선택하세요:

```angular-ts
import {Component, signal} from '@angular/core';
import {Field, FieldTree, form, FormField, FormRoot} from '@angular/forms/signals';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="dynamicForm">
      @for (config of configs; track config.name) {
        @switch (config.kind) {
          @case ('text') {
            <label>
              {{ config.label }}
              <input type="text" [formField]="asTextField(config.name)" />
            </label>
          }
          @case ('number') {
            <label>
              {{ config.label }}
              <input type="number" [formField]="asNumberField(config.name)" />
            </label>
          }
          @case ('array') {
            <fieldset>
              <legend>{{ config.label }}</legend>
              @for (item of asArrayField(config.name); track item; let i = $index) {
                <input type="text" [formField]="item" />
                <button type="button" (click)="removeItem(config.name, i)">Remove</button>
              }
              <button type="button" (click)="addItem(config.name)">Add</button>
            </fieldset>
          }
        }
      }
    </form>
  `,
})
export class DynamicForm {
  configs: FieldConfig[] = validateConfigs([
    {kind: 'text', name: 'fullName', label: 'Full Name', required: true},
    {kind: 'number', name: 'age', label: 'Age', required: true, min: 18, max: 120},
    {kind: 'array', name: 'phoneNumbers', label: 'Phone numbers', itemRequired: true},
  ]);

  model = signal(buildModel(this.configs));

  dynamicForm = form(this.model, buildSchema(this.configs));

  asTextField(name: string): Field<string> {
    // <input type="text">에는 Field<string>이 필요합니다.
    return this.dynamicForm[name] as unknown as Field<string>;
  }

  asNumberField(name: string): Field<number | null> {
    // <input type="number">에는 Field<number | null>이 필요합니다.
    return this.dynamicForm[name] as unknown as Field<number | null>;
  }

  asArrayField(name: string): FieldTree<string[]> {
    // @for로 배열을 순회할 수 있도록 Field 대신 FieldTree를 사용합니다.
    return this.dynamicForm[name] as unknown as FieldTree<string[]>;
  }

  addItem(name: string) {
    this.model.update((current) => ({
      ...current,
      [name]: [...(current[name] as string[]), ''],
    }));
  }

  removeItem(name: string, index: number) {
    this.model.update((current) => ({
      ...current,
      [name]: (current[name] as string[]).filter((_, i) => i !== index),
    }));
  }
}
```

템플릿 타입 검사는 `dynamicForm[name]`을 독립적인 표현식으로 처리하므로, `@switch`가 `config.kind`의 타입을 좁혀도 인덱스 접근에는 적용되지 않습니다. 접근자는 바인딩 위치에서 타입 단언으로 이 범위를 다시 명시합니다. 일치하는 `kind` 분기가 실행 시점에 좁힌 타입이 올바르다는 것을 보장합니다.

모델과 스키마 모두 컴포넌트 생성 시 같은 `FieldConfig[]`에서 만들어지므로 주어진 설정에 대해 서로 어긋날 수 없습니다. 위 예제는 컴포넌트를 생성할 때 설정을 동기적으로 사용할 수 있다고 가정합니다.

<!--
## Next steps

JSON-driven forms keep their model and schema aligned by deriving both from the same `FieldConfig[]`. Each extension in this guide (conditional rules, repeating fields) widens the type and adds a translation step inside `buildSchema()` while preserving that alignment. The model and schema stay locked together, regardless of where the config comes from or how it grows.

For related guides cover other aspects of Signal Forms, check out:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/schemas" title="Schemas and schema composability" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/form-logic" title="Adding form logic" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
</docs-pill-row>

For detailed API documentation, see:

- [`form()`](api/forms/signals/form) - Create a form from a model signal
- [`applyWhen()`](api/forms/signals/applyWhen) - Apply a schema conditionally based on reactive state
- [`applyEach()`](api/forms/signals/applyEach) - Apply a schema to each item in an array field
- [`FieldTree`](api/forms/signals/FieldTree) - Navigable tree of fields exposed by `form()`
- [`SchemaFn`](api/forms/signals/SchemaFn) - Type signature for schema functions
-->

<a id="next-steps"></a>

## 다음 단계

JSON 기반 폼은 같은 `FieldConfig[]`에서 모델과 스키마를 생성하여 둘을 일치시킵니다. 이 가이드에서 다룬 조건부 규칙과 반복 필드 확장은 타입의 범위를 넓히고 `buildSchema()` 안에 변환 단계를 추가하면서도 이 일관성을 유지합니다. 설정의 출처나 확장 방식과 관계없이 모델과 스키마는 함께 동작합니다.

Signal Forms의 다른 기능은 관련 가이드를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/schemas" title="스키마와 스키마 조합" />
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/form-logic" title="폼 로직 추가하기" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
</docs-pill-row>

자세한 API 문서는 다음을 참고하세요:

- [`form()`](api/forms/signals/form) - 모델 시그널로 폼 생성하기
- [`applyWhen()`](api/forms/signals/applyWhen) - 반응형 상태에 따라 조건부로 스키마 적용하기
- [`applyEach()`](api/forms/signals/applyEach) - 배열 필드의 각 항목에 스키마 적용하기
- [`FieldTree`](api/forms/signals/FieldTree) - `form()`이 제공하는 탐색 가능한 필드 트리
- [`SchemaFn`](api/forms/signals/SchemaFn) - 스키마 함수의 타입 시그니처
