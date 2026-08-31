<!--
# Field metadata
-->

# 필드 메타데이터

<!--
Field metadata is reactive data you can attach to an individual field. Angular's built-in constraint validators like `required()` and `min()` use this system internally. In other words, every time you call a validator, you're contributing to a metadata key for that particular field.

This guide covers the metadata system in depth: how reducers combine contributions from multiple schema rules, how to write custom reducers, how reading composes with `hasMetadata()`, and how managed metadata ties lifecycle-aware objects to individual fields.
-->

필드 메타데이터(field metadata)는 개별 필드에 붙일 수 있는 데이터를 의미합니다.
Angular가 제공하는 유효성 검사 함수 `required()`나 `min()`는 이 시스템을 내부적으로 활용합니다.
즉, 유효성 검사 함수를 실행할 때마다 해당 필드의 메타데이터 키에 영향을 미치게 됩니다.

이 문서는 메타데이터 시스템을 깊이 있게 다룹니다.
리듀서(reducer)가 여러 스키마 규칙을 어떻게 조합하는지, 커스텀 리듀서는 어떻게 구현하는지, `hasMetadata()`는 어떻게 활용하는지, Angular가 관리하는 메타데이터가 생명주기 객체와 연관되어 개별 필드에 어떻게 적용되는지 설명합니다.

<!--
## You have already been using metadata
-->

## 메타데이터는 이미 사용하고 있었습니다

<!--
When you call `required()` in a schema and read `.required()` on the resulting field in a template, you are using the metadata system. `state.required` is not a special-case property. It is a convenience getter that returns the current value of a built-in `REQUIRED` metadata key.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, required, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        @if (registrationForm.username().required()) {
          <span class="required-marker" aria-hidden="true">*</span>
        }
        <input [formField]="registrationForm.username" />
      </label>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    required(path.username);
  });
}
```

Calling `required(path.username)` contributes a value to the `REQUIRED` metadata key on that field. Reading `registrationForm.username().required()` returns the accumulated value. The metadata key is the bridge connecting the two.

Several built-in constraint validators follow this pattern:

| Validator     | Metadata key | Type                  | `FieldState` getter |
| ------------- | ------------ | --------------------- | ------------------- |
| `required()`  | `REQUIRED`   | `boolean`             | `required`          |
| `min()`       | `MIN`        | `number \| undefined` | `min`               |
| `max()`       | `MAX`        | `number \| undefined` | `max`               |
| `minLength()` | `MIN_LENGTH` | `number \| undefined` | `minLength`         |
| `maxLength()` | `MAX_LENGTH` | `number \| undefined` | `maxLength`         |
| `pattern()`   | `PATTERN`    | `RegExp[]`            | `pattern`           |

Non-constraint validators like `email()` and `validate()` do not contribute to metadata. They run their check and surface a validation error, but they do not publish a reactive value for templates to read.
-->

스키마 함수에서 `required()` 함수를 사용하고 템플릿에서 `.required()`로 결과값을 읽으면, 메타데이터 시스템을 활용하고 있는 것입니다.
`state.required`는 특별한 프로퍼티가 아닙니다.
내장 `REQUIRED` 메타데이터 키의 현재값을 반환하는 게터(getter)입니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, required, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        @if (registrationForm.username().required()) {
          <span class="required-marker" aria-hidden="true">*</span>
        }
        <input [formField]="registrationForm.username" />
      </label>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    required(path.username);
  });
}
```

`required(path.username)`을 실행하면 `REQUIRED` 메타데이터가 해당 필드에 적용됩니다.
그리고 `registrationForm.username().required()`를 실행하면 누적된 값이 반환됩니다.
메타데이터 키는 이 둘을 연결하는 다리 역할을 합니다.

내장 유효성 검사 몇가지가 이 방식을 따릅니다:
Several built-in constraint validators follow this pattern:

| 유효성 검사 함수 | 메타데이터 키 | 타입                  | `FieldState` 게터 |
| ---------------- | ------------- | --------------------- | ----------------- |
| `required()`     | `REQUIRED`    | `boolean`             | `required`        |
| `min()`          | `MIN`         | `number \| undefined` | `min`             |
| `max()`          | `MAX`         | `number \| undefined` | `max`             |
| `minLength()`    | `MIN_LENGTH`  | `number \| undefined` | `minLength`       |
| `maxLength()`    | `MAX_LENGTH`  | `number \| undefined` | `maxLength`       |
| `pattern()`      | `PATTERN`     | `RegExp[]`            | `pattern`         |

`email()`이나 `validate()`와 같이 비제약 조건 유효성 검사 함수는 메타데이터에 영향을 미치지 않습니다.
이 함수들은 유효성 검사를 실행하고 유효성 검사 에러를 반환하지만, 템플릿에서 읽을 수 있는 반응형 값을 제공하지는 않습니다.

<!--
## When to use custom metadata
-->

## 커스텀 메타데이터는 언제 사용할까요

<!--
When you need reactive data attached to a specific field that built-in state signals like `valid()`, `disabled()`, and `touched()` do not cover, use **custom metadata**.

Some examples might include:

- **Configuration attached to reusable field schemas.** A currency symbol on a price field, so any template or custom control rendering the field can display it. Or `MIN_DATE` and `MAX_DATE` on a date field, read by a reusable range picker.
- **Parsed values shared between rules on one field.** A phone number parsed once into E.164 format, so a format validator and a uniqueness check both read the same canonical form without reparsing.
- **Display hints assembled from the field's state.** A severity level (`'info' | 'warning' | 'error'`) that the UI maps to badges and icons, or a context-aware help message that changes based on what the user has typed and which other fields are filled in.

If you find yourself keeping a parallel `Map<fieldKey, value>` alongside your form to track something per field, that is a sign metadata is the right tool. Metadata stays colocated with the schema, stays reactive, and participates in the field's lifecycle.
-->

**커스텀 메타데이터**는 `valid()`, `disabled()`, `touched()`와 같은 내장 상태 시그널이 다루지 않는 반응형 데이터가 필요할 때 사용합니다.

이런 시나리오를 생각해 봅시다:

- **재사용 가능한 필드 스키마를 설정할 때** - 가격 필드에 통화 기호를 추가해서 해당 필드를 렌더링하는 모든 템플릿이나 커스텀 컨트롤에서 통화를 표시할 수 있도록 합니다. 또는 날짜 필드에 `MIN_DATE`와 `MAX_DATE`를 추가해서 선택 가능한 범위를 제한할 수 있습니다.
- **한 필드의 값을 파싱해서 여러 규칙에서 활용할 때** - 전화번호를 E.164 형식으로 한 번만 파싱해서 형식 유효성 검사 함수와 중복 검사에 동시에 사용하는 경우
- **필드 상태에 따라 힌트를 표시할 때** - `'info' | 'warning' | 'error'`와 같은 심각도 수준을 UI에서 배지나 아이콘으로 표시하거나, 사용자가 입력한 내용과 다른 필드에 입력된 내용에 따라 도움말 메시지를 변경할 때

만약 각 필드별로 정보를 추적하기 위해 폼과 함께 `Map<fieldKey, value>`를 사용하는 것을 고려한다면, 메타데이터를 활용하는 것이 좋습니다.
메타데이터는 스키마와 함께 저장되고, 반응형으로 동작하며, 필드의 라이프싸이클 전반에 관여합니다.

<!--
## Creating a metadata key
-->

## 메타데이터 키 만들기

<!--
When you want to create a custom key, call `createMetadataKey<TWrite>()`. The type parameter describes the value your schema rules will contribute.

```ts
import {createMetadataKey} from '@angular/forms/signals';

export const USERNAME_HELP = createMetadataKey<string>();
```

Every `createMetadataKey()` call creates a new unique key. Two calls with matching type parameters are still two distinct keys, so define each key once at module scope and import it wherever it's needed.

NOTE: A key created without a reducer uses "override" semantics by default: the last contribution wins if multiple rules set the key.
-->

커스텀 키를 생성하려면 `createMetadataKey<TWrite>()`를 실행하면 됩니다.
이 때 타입은 스키마 규칙이 다룰 값의 타입을 의미합니다.

```ts
import {createMetadataKey} from '@angular/forms/signals';

export const USERNAME_HELP = createMetadataKey<string>();
```

`createMetadataKey()`를 실행하면 고유한 키가 생성됩니다.
타입이 같더라도 이 함수가 두 번 실행되면 서로 다른 키로 간주되기 때문에, 각 키는 모듈 범위에서 한 번만 정의하고 필요한 곳으로 가져와야 합니다.

참고: 리듀서 없이 생성한 키는 기본적으로 "오버라이드" 의미로 사용됩니다: 한 키로 규칙이 여러번 사용되면, 마지막에 추가한 규칙이 우선합니다.

<!--
## Setting values from a schema
-->

## 스키마에서 값 설정하기

<!--
When you need to register a value for the key on a specific field, use `metadata(path, key, logic)` inside a schema function.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, metadata, FormField} from '@angular/forms/signals';
import {USERNAME_HELP} from './metadata-keys';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>
      <p class="help">{{ usernameHelp() }}</p>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    metadata(path.username, USERNAME_HELP, ({value}) => {
      const username = value();
      if (username.length === 0) {
        return 'Choose a unique username between 3 and 20 characters.';
      }
      if (username.length < 3) {
        return 'Keep typing, usernames are at least 3 characters.';
      }
      if (username.length > 20) {
        return 'Usernames are at most 20 characters.';
      }
      return 'Looks good.';
    });
  });

  usernameHelp = computed(() => this.registrationForm.username().metadata(USERNAME_HELP)?.() ?? '');
}
```

The logic function receives the field's context, which exposes `value` as a signal of the field's current value, `state` as the field's `FieldState`, and methods like `valueOf(path)` and `stateOf(path)` for reading other fields in the same form. Any signal the function reads becomes a reactive dependency: when `value()` changes, the metadata recomputes, and any template reading the key updates.
-->

특정 필드의 키에 값을 등록해야 할 때는 스키마 함수 안에서 `metadata(path, key, logic)`을 사용하면 됩니다.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, metadata, FormField} from '@angular/forms/signals';
import {USERNAME_HELP} from './metadata-keys';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>
      <p class="help">{{ usernameHelp() }}</p>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    metadata(path.username, USERNAME_HELP, ({value}) => {
      const username = value();
      if (username.length === 0) {
        return 'Choose a unique username between 3 and 20 characters.';
      }
      if (username.length < 3) {
        return 'Keep typing, usernames are at least 3 characters.';
      }
      if (username.length > 20) {
        return 'Usernames are at most 20 characters.';
      }
      return 'Looks good.';
    });
  });

  usernameHelp = computed(() => this.registrationForm.username().metadata(USERNAME_HELP)?.() ?? '');
}
```

논리 함수는 필드 컨텍스트를 인자로 받으며, 이 컨텍스트는 필드의 현재 값을 표현하는 `value` 시그널, 상태를 나타내는 `fieldState` 시그널, `valueOf(path)`나 `stateOf(path)`와 같이 폼 내의 다른 필드를 읽는 메서드를 제공합니다.
함수가 읽는 모든 시그널은 반응형이 됩니다.
`value()`가 변경되면 ㅇ메타데이터가 다시 계산되고, 해당 키를 읽는 템플릿이 모두 갱신됩니다.

<!--
## Reading metadata from a field
-->

## 필드의 메타데이터 읽기

<!--
`hasMetadata(key)` returns `true` if any schema rule registered the key on this field. `state.metadata(key)` returns `undefined` when no rule has registered the key, and a signal of the current reduced value otherwise.

```ts
registrationForm.username().hasMetadata(USERNAME_HELP); // true if any metadata() rule registered this key
```

The shape of that inner value (whether it can itself be `undefined`, what type it holds) depends on the key's reducer. Reducers are covered in the next section.

When the key may not be registered, gate the read with `hasMetadata()`:

```angular-html
@if (registrationForm.username().hasMetadata(USERNAME_HELP)) {
  <p class="help">{{ registrationForm.username().metadata(USERNAME_HELP)!() }}</p>
}
```

When you know a rule always registers the key (because the schema in the same file does so), you can skip the `hasMetadata()` check and use optional chaining as a compact alternative:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)?.();
// message: string | undefined
```

Or, when the rule is guaranteed to have registered, drop the optional chain and assert:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)!();
// message: string | undefined (still, because the inner value may be undefined)
```

The component example above uses optional chaining inside a `computed()` so the template binds to a plain `string`, with an empty fallback for the initial frame.

This is the whole API for a single contributor. The next section covers what happens when more than one schema rule contributes to the same key, and how to combine those contributions with reducers.
-->

`hashMetadata(key)`를 사용하면 필드에 해당 키가 등록되어 있을 때 `true`를 반환합니다.
그리고 검사 규칙에 등록된 키가 없으면 `state.metadata(key)`가 `undefined`를 반환하며, 그렇지 않으면 현재 리듀스 된 값을 시그널로 반환합니다.

```ts
registrationForm.username().hasMetadata(USERNAME_HELP); // USERNAME_HELP 키가 등록되어 있으면 metadata()가 true를 반환합니다.
```

메타데이터 키가 `undefined`를 반환하는 것에 관계없이 내부 값의 형태는 리듀서에 따라 달라집니다.
리듀서는 다음 섹션에서 알아봅시다.

키가 등록되어 있지 않을 가능성이 있다면, `hasMetadata()`를 사용하면 됩니다:

```angular-html
@if (registrationForm.username().hasMetadata(USERNAME_HELP)) {
  <p class="help">{{ registrationForm.username().metadata(USERNAME_HELP)!() }}</p>
}
```

키가 언제나 등록되어 있다면, `hasMetadata()` 검사를 생략하고 간결하게 선택적 체이닝을 사용하면 됩니다:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)?.();
// message: string | undefined
```

아니면 키가 등록되어 있다는 것이 명확하다면, 선택적 체이닝과 에러 발생을 생략할 수도 있습니다:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)!();
// message: string | undefined (내부 값은 여전히 undefined일 수 있습니다.)
```

위 컴포넌트 예제는 `computed()` 안에서 선택적 체이닝을 사용하면서 템플릿에 일반 `string`을 바인딩합니다.
초기값이 비어있으면 공백이 바인딩 됩니다.

영향을 주는 항목이 하나인 경우는 이것으로 충분합니다.
다음 섹션에서는 둘 이상의 스키마 규칙이 동일한 키에 영향을 미치는 경우 발생하는 상황과 리듀서를 이용하여 영향을 결합하는 방법을 다룹니다.

<!--
## Combining contributions with reducers
-->

## 영향도 결합하기: 리듀서(reducer)

<!--
Override semantics work when only one rule contributes to a key on a given field. As soon as two rules contribute, the first value is silently discarded:

```ts
const HELP = createMetadataKey<string>();

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});
```

After both rules run, `state.metadata(HELP)!()` returns only the second message. This is almost never what you want. Contributions often come from different sources: two schemas composed with `apply()` that each attach help text, or multiple validation rules that each contribute a hint.

To combine contributions, pass a reducer to `createMetadataKey()`. A reducer describes how to fold individual values into an accumulated result:

```ts
import {createMetadataKey, MetadataReducer} from '@angular/forms/signals';

const HELP = createMetadataKey<string, string[]>(MetadataReducer.list());

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});

// state.metadata(HELP)!() === [
//   'Choose something unique across the system.',
//   'Usernames are 3 to 20 characters.',
// ]
```

Notice the two type parameters on `createMetadataKey<TWrite, TAcc>`: the first is the type each rule contributes, the second is the type the reducer produces. With `list()`, rules contribute a `string` and the field reads back a `string[]`.
-->

오버라이드 시맨틱(override semantics)은 해당 필드의 키에 검사 규칙이 하나만 영향을 미칠 때 사용합니다.
그런데 검사 규칙이 둘이 되면 첫번째 값은 아무 설명 없이 무시됩니다:

```ts
const HELP = createMetadataKey<string>();

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});
```

두 검사 규칙이 실행되면 `state.metadata(HELP)!()`는 두 번째 메시지를 반환합니다.
이런 상황은 대부분 원하는 상황이 아닙니다.
영향은 종종 여러 곳에서 옵니다.
`pply()`를 사용해서 각 도움말 텍스트를 붙이는 두 개의 스키마가 결합되거나, 힌트를 적용하는 유효성 검사 규칙이 여러개 사용되는 경우가 그렇습니다.

영향을 결합하려면 리듀서를 `createMetadataKey()`에 전달하면 됩니다.
리듀서는 개별 값을 어떻게 조합해서 결과를 생성하는지 정하는 함수입니다:

```ts
import {createMetadataKey, MetadataReducer} from '@angular/forms/signals';

const HELP = createMetadataKey<string, string[]>(MetadataReducer.list());

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});

// state.metadata(HELP)!() === [
//   'Choose something unique across the system.',
//   'Usernames are 3 to 20 characters.',
// ]
```

`createMetadataKey<TWrite, TAcc>`라는 타입을 주의깊게 보세요.
첫번째 타입은 각 검사 규칙이 제공하는 타입이고, 두번째 타입은 리듀서가 반환하는 타입입니다.
`list()`를 사용하면 `string`을 만드는 검사 규칙을 `string[]` 타입으로 조합할 수 있습니다.

<!--
### Built-in reducers
-->

### 기본 리듀서

<!--
Angular provides six built-in reducers on the [`MetadataReducer`](api/forms/signals/MetadataReducer) namespace. `override()` has two forms with slightly different semantics, listed separately in the table:

| Reducer        | Accumulator type      | What it does                                                           | Initial value |
| -------------- | --------------------- | ---------------------------------------------------------------------- | ------------- |
| `list<T>()`    | `T[]`                 | Accepts `T \| undefined` contributions; appends non-`undefined` values | `[]`          |
| `or()`         | `boolean`             | `true` if any contribution is `true`                                   | `false`       |
| `and()`        | `boolean`             | `true` only if every contribution is `true`                            | `true`        |
| `min()`        | `number \| undefined` | Keeps the smallest contributed number                                  | `undefined`   |
| `max()`        | `number \| undefined` | Keeps the largest contributed number                                   | `undefined`   |
| `override()`   | `T \| undefined`      | Last contribution replaces previous (the default)                      | `undefined`   |
| `override(fn)` | `T`                   | Same, but with a provided initial value                                | `fn()`        |

`list()` is the only built-in reducer whose item type is wider than its accumulator's element type. A rule may contribute `undefined` and the reducer will silently drop it. This is how the built-in `PATTERN` key handles dynamic `pattern()` rules whose logic function returns `undefined`: the `undefined` contribution is skipped rather than included in the final regex list.
-->

Angular는 6가지 리듀서를 [`MetadataReducer`](api/forms/signals/MetadataReducer) 네임스페이스로 제공합니다.
`override()`는 약간 다른 의미를 가진 두 가지 형식을 가지고 있으며, 전체 리듀서는 아래 표로 확인해 보세요:

| 리듀서         | 누적 타입             | 어떤 동작을 하는지                                              | 초기값      |
| -------------- | --------------------- | --------------------------------------------------------------- | ----------- |
| `list<T>()`    | `T[]`                 | `T \| undefined` 를 받아서 `undefined` 값이 아닌 값을 합칩니다. | `[]`        |
| `or()`         | `boolean`             | 어떠한 영향의 결과가 `true`면 `true`를 반환합니다.              | `false`     |
| `and()`        | `boolean`             | 모든 영향의 결과가 `true`면 `true를 반환합니다.                 | `true`      |
| `min()`        | `number \| undefined` | 가장 작은 값을 유지합니다.                                      | `undefined` |
| `max()`        | `number \| undefined` | 가장 큰 값을 유지합니다.                                        | `undefined` |
| `override()`   | `T \| undefined`      | 마지막 값이 남습니다. (기본 동작)                               | `undefined` |
| `override(fn)` | `T`                   | 위와 동일하지만 초기값을 받습니다.                              | `fn()`      |

`list()`는 리듀서 중에서 처리하는 항목의 타입보다 넓은 타입을 받는 리듀서로 유일합니다.
검사 규칙에서 `undefined`를 반환하면, 리듀서는 이 값을 제거합니다.
기본 `PATTERN` 키는 논리 함수가 `undefined`를 반환하는 동적 `pattern()` 규칙을 다음과 같이 처리합니다.
`undefined` 영향은 최종 정규식 목록에 포함되지 않고 건너뜁니다.

<!--
### How built-in validator keys use reducers
-->

### 내장 유효성 검사 키가 리듀서를 활용하는 방법

<!--
While `MetadataReducer.min()` and `MetadataReducer.max()` are reducers, you may be surprised to learn that they are not validators. `MetadataReducer.min()` picks the smallest contribution to a key, while the `min()` validator enforces a lower bound on a field's value. They share a name but solve different problems.

The built-in constraint keys pick their reducers based on what "strictest" means for the constraint, which is often the opposite of what the key's name suggests:

| Key          | Reducer          | Reasoning                                                                                                                             |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRED`   | `or()`           | If any `required()` rule evaluates to `true`, the field is required.                                                                  |
| `MIN`        | `max()`          | A minimum-value constraint is strictest when largest. If one rule requires `>= 5` and another `>= 10`, the effective minimum is `10`. |
| `MAX`        | `min()`          | A maximum-value constraint is strictest when smallest. If one rule caps at `100` and another at `50`, the effective maximum is `50`.  |
| `MIN_LENGTH` | `max()`          | Same logic as `MIN`: the longest required length wins.                                                                                |
| `MAX_LENGTH` | `min()`          | Same logic as `MAX`: the shortest allowed length wins.                                                                                |
| `PATTERN`    | `list<RegExp>()` | Each `pattern()` call contributes a regex; the value must match all of them.                                                          |

This pairing of "strictest wins" is why calling `min(path.age, 18)` and `min(path.age, 21)` in two composed schemas works correctly. Each call registers its own validator that enforces its specific bound (so a value below either bound fails validation). Separately, each call contributes to the public `MIN` key, and `state.metadata(MIN)!()` reports the aggregate (`21`) so UI and custom controls can read the effective minimum.
-->

`MetadataReducer.min()`와 `MetadataReducer.max()`는 리듀서이지만, 유효성 검사 함수는 아닙니다.
`MetadataReducer.min()`은 가장 작은 값을 전달하는 키를 선택하지만, `min()` 유효성 검사는 필드 값의 하한을 강제합니다.
이름은 같지만 서로 다른 문제를 해결합니다.

기본 제약 조건 키는 제약 조건에 대해 "가장 엄격한" 것이 무엇을 의미하는지에 따라 리듀서를 선택하는데, 때로는 키 이름이 의미하는 것과 반대이기도 합니다:

| 키           | 리듀서           | 이유                                                                                                                                                   |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUIRED`   | `or()`           | `required()` 규칙 중 하나라도 `true`를 반환하면 필드는 필수 항목이 됩니다.                                                                             |
| `MIN`        | `max()`          | 최소값 제약 조건은 값이 가장 클 때 가장 엄격합니다. 한 규칙이 `>= 5` 이고 다른 규칙이 `>= 10`이면, 유효 최소값은 `10`이 됩니다.                        |
| `MAX`        | `min()`          | 최대값 제약 조건은 값이 가장 작을 때 가장 엄격합니다. 한 규칙이 `100`을 상한으로 하고 다른 규칙이 `50`을 상한으로 한다면, 유효 최대값은 `50`이 됩니다. |
| `MIN_LENGTH` | `max()`          | `MIN`과 비슷합니다. 가장 긴 항목이 우선입니다.                                                                                                         |
| `MAX_LENGTH` | `min()`          | `MAX`와 비슷합니다. 가장 짧은 항목이 우선입니다.                                                                                                       |
| `PATTERN`    | `list<RegExp>()` | 개별 `pattern()` 호출은 각각 정규표현식을 반환하며, 모든 정규표현식을 통과해야 합니다.                                                                 |

이렇게 "가장 엄격한 조건이 우선"하기 때문에 `min(path.age, 18)`과 `min(path.age, 21)`이 동시에 사용되어도 문제없이 동작합니다.
검사 규칙이 등록될 때마다 유효성 검사 함수는 경계값을 조정합니다.
따라서 경계값에 해당되지 않는 유효성 검사는 실패합니다.
별도로, 개별 호출은 `MIN` 키에 영향을 미치며, `state.metadata(MIN)!()`가 반환하는 값은 `21`이기 때문에 화면이나 커스텀 컨트롤에서는 유효 최소값을 활용할 수 있습니다.

<!--
### Writing a custom reducer
-->

### 커스텀 리듀서 정의하기

<!--
When you want to write your own reducer, implement an object matching the `MetadataReducer<TAcc, TItem>` interface:

```ts
interface MetadataReducer<TAcc, TItem> {
  reduce: (acc: TAcc, item: TItem) => TAcc;
  getInitial: () => TAcc;
}
```

You can define a custom reducer when none of the built-ins match the semantics you need. For example, a `SEVERITY` key that keeps the most severe level contributed by any rule:

```ts
import {createMetadataKey, type MetadataReducer} from '@angular/forms/signals';

type Severity = 'info' | 'warning' | 'error';

const SEVERITY_RANK: Record<Severity, number> = {info: 0, warning: 1, error: 2};

const maxSeverity: MetadataReducer<Severity | undefined, Severity> = {
  reduce(acc, item) {
    if (acc === undefined) return item;
    return SEVERITY_RANK[item] > SEVERITY_RANK[acc] ? item : acc;
  },
  getInitial: () => undefined,
};

export const SEVERITY = createMetadataKey<Severity, Severity | undefined>(maxSeverity);
```

Any number of rules can now contribute a severity, and the field reports the highest:

```ts
form(model, (path) => {
  metadata(path.password, SEVERITY, () => 'info');
  metadata(path.password, SEVERITY, ({value}) => (value().length < 12 ? 'warning' : 'info'));
  metadata(path.password, SEVERITY, ({value}) =>
    /password|1234/i.test(value()) ? 'error' : 'info',
  );
});
```

The reducer runs whenever any contribution's signals change, so `state.metadata(SEVERITY)!()` stays in sync with the current worst case across all rules.

TIP: Keep your reducers pure: `reduce()` should depend only on its two arguments, and `getInitial()` should return the same value every time it is called. Reducers run inside a reactive computation that re-executes when any contribution's signals change, so impure reducers produce inconsistent metadata.
-->

리듀서를 직접 만들려면 `MetadataReducer<TAcc, TItem>` 인터페이스에 맞게 객체를 구현하면 됩니다:

```ts
interface MetadataReducer<TAcc, TItem> {
  reduce: (acc: TAcc, item: TItem) => TAcc;
  getInitial: () => TAcc;
}
```

Angular가 기본으로 제공하는 리듀서로 충분하지 않다면, 커스텀 리듀서를 정의할 수 있습니다.
예를 들면, 모든 검사 규칙에서 발생한 심각도 중 가장 높은 심각도를 정하는 `SEVERITY` 키를 지정한다고 합시다:

```ts
import {createMetadataKey, type MetadataReducer} from '@angular/forms/signals';

type Severity = 'info' | 'warning' | 'error';

const SEVERITY_RANK: Record<Severity, number> = {info: 0, warning: 1, error: 2};

const maxSeverity: MetadataReducer<Severity | undefined, Severity> = {
  reduce(acc, item) {
    if (acc === undefined) return item;
    return SEVERITY_RANK[item] > SEVERITY_RANK[acc] ? item : acc;
  },
  getInitial: () => undefined,
};

export const SEVERITY = createMetadataKey<Severity, Severity | undefined>(maxSeverity);
```

이제 심각도를 반환하는 규칙 검사는 여러 개라도 문제없이 사용할 수 있으며, 리듀서는 그 중에 가장 높은 심각도를 유지합니다:

```ts
form(model, (path) => {
  metadata(path.password, SEVERITY, () => 'info');
  metadata(path.password, SEVERITY, ({value}) => (value().length < 12 ? 'warning' : 'info'));
  metadata(path.password, SEVERITY, ({value}) =>
    /password|1234/i.test(value()) ? 'error' : 'info',
  );
});
```

리듀서는 영향을 주는 검사 규칙들이 변경될 때마다 실행되기 때문에, `state.metadata(SEVERITY)!()`는 모든 규칙의 결과와 동기화 된 상태를 유지합니다.

팁: 리듀서를 순수 함수(pure function)로 작성하세요. `reduce()`는 전달받는 두 인자에만 의존해야 하며, `getInitial()`은 매번 똑같은 값을 반환해야 합니다.
리듀서는 검사 규칙의 신호가 변경될 때마다 다시 실행되기 때문에, 순수 함수가 아닌 리듀서는 일관성 없는 메타데이터 값을 반환합니다.

<!--
## Attaching lifecycle-aware objects with managed metadata
-->

## 메타데이터에 라이프싸이클 객체

<!--
Managed metadata stores a lifecycle-aware object on a field instead of a reactive value. Use it for per-field objects like a `resource()` that fetches external data, an `effect()` that syncs to an outside system, or a service handle scoped to a single field.
-->

관리형 메타데이터는 반응형 값 대신 필드에 라이프싸이클 관련 객체를 저장합니다.
외부 데이터를 가져오는 `resource()`, 외부 시스템과 동기화하는 `effect()`, 단일 필드에 한정된 서비스 핸들과 같은 필드별 객체에 사용할 수 있습니다.

<!--
### Creating a managed key
-->

### 관리형 키 생성하기

<!--
When you want to define a managed key, call `createManagedMetadataKey<TRead, TWrite>(create)`. The `create` function you pass produces the value the key holds.

```ts
import {Signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {createManagedMetadataKey} from '@angular/forms/signals';

export interface UrlPreview {
  title: string;
  description?: string;
  image?: string;
}

export const URL_PREVIEW = createManagedMetadataKey((_state, url: Signal<string | undefined>) => {
  return httpResource<UrlPreview>(() => {
    const currentUrl = url();
    return currentUrl ? {url: '/api/url-preview', params: {url: currentUrl}} : undefined;
  });
});
```

The `create` function receives the field's `FieldState` and a `Signal<TAcc>` of data contributed by `metadata()` rules for this key, and returns whatever object should live on the field. The return value is stored as-is: unlike non-managed keys, the framework does not wrap it in a `computed()`.

`create` runs once when a field is constructed, inside the field's injection context. That lets you call `inject()`, `resource()`, and `effect()` inside `create`, and ties cleanup to the field's lifecycle: when the field is destroyed, Angular destroys the injection context, and any `resource()`, `effect()`, or `DestroyRef` callback you registered there cleans up automatically.

Because `create` itself is not reactive, any behavior that needs to respond to signal changes has to live inside an `effect()`, `resource()`, or `httpResource()` set up during that initial call. `URL_PREVIEW` demonstrates the pattern: the `httpResource()` reads the URL signal inside its request function, so the request re-runs whenever the signal changes. The schema rule (`metadata(path.url, URL_PREVIEW, ({value}) => value())`) decides what data to feed in; the managed key decides what to do with it.
-->

관리형 키를 정의하려면 `createManagedMetadataKey<TRead, TWrite>(create)`를 실행하면 됩니다.
`create`는 전달되는 값을 키에 저장하는 함수입니다.

```ts
import {Signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {createManagedMetadataKey} from '@angular/forms/signals';

export interface UrlPreview {
  title: string;
  description?: string;
  image?: string;
}

export const URL_PREVIEW = createManagedMetadataKey((_state, url: Signal<string | undefined>) => {
  return httpResource<UrlPreview>(() => {
    const currentUrl = url();
    return currentUrl ? {url: '/api/url-preview', params: {url: currentUrl}} : undefined;
  });
});
```

`create` 함수는 필드의 `FieldState`와 해당 키에 대한 `metadata()` 규칙에서 제공하는 데이터의 `Signal<TAcc>`를 인자로 받아 필드에 저장될 객체를 반환합니다.
반환값은 그대로 저장됩니다.
관리되지 않는 키와 달리 프레임워크는 해당 값을 `computed()`로 래핑하지 않습니다.

`create`는 필드의 의존성 주입 컨텍스트 안에서 필드가 생성될 때 한 번만 실행됩니다.
그래서 `create` 함수 안에서 `inject()`나 `resource()`, `effect()`를 실행할 수 있으며, 필드의 수명 주기에 따라 정리 작업을 실행할 수도 있습니다.
그리고 필드가 종료되면 Angular가 의존성 주입 컨텍스트도 종료하기 때문에 `resource()`, `effect()`, `DestroyRef` 콜백 함수가 자동으로 실행됩니다.

`create` 자체는 반응형이 아니기 떄문에 시그널 변경에 반응해야 하는 모든 동작은 `effect()`, `resource()`, `httpResource()` 내부에 있어야 합니다.
`URL_PREVIEW`도 이런 방식입니다.
`httpResource()`는 URL 시그널을 읽기 때문에, 시그널이 변경될 때마다 HTTP 요청이 다시 실행됩니다.
스키마 규칙 `metadata(path.url, URL_PREVIEW, ({value}) => value())`는 어떤 데이터를 입력할 지 결정하고, 관리 키는 입력된 데이터를 어떻게 처리할 지 결정합니다.

<!--
### Using a managed key in a form
-->

### 폼에서 관리 키 사용하기

<!--
When you need to use a managed key in a form, register a `metadata()` rule for the key, and then read the returned object from the field state.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {applyEach, form, metadata, FormField} from '@angular/forms/signals';
import {URL_PREVIEW} from './url-preview';

@Component({
  selector: 'app-link-editor',
  imports: [FormField],
  template: `
    <form>
      @for (link of linksForm.links; track link) {
        <fieldset>
          <label>
            URL
            <input [formField]="link.url" />
          </label>
          <!- Read the URL_PREVIEW key for this link's url field; the result is the resource its create function produced ->
          @let preview = link.url().metadata(URL_PREVIEW);
          @if (preview?.isLoading()) {
            <p>Loading preview...</p>
          } @else if (preview?.hasValue() && preview.value(); as data) {
            <article class="preview">
              <h3>{{ data.title }}</h3>
              @if (data.description) {
                <p>{{ data.description }}</p>
              }
            </article>
          } @else if (preview?.error()) {
            <p class="error">Could not load preview.</p>
          }
        </fieldset>
      }
      <button type="button" (click)="addLink()">Add link</button>
    </form>
  `,
})
export class LinkEditor {
  linksModel = signal({links: [{url: ''}]});

  linksForm = form(this.linksModel, (path) => {
    // Register the URL_PREVIEW key on each link's url field.
    // applyEach runs the schema per item, so create() runs once per link
    // and each link gets its own resource.
    applyEach(path.links, (itemPath) => {
      metadata(itemPath.url, URL_PREVIEW, ({value}) => value());
    });
  });

  addLink() {
    this.linksForm.links().value.update((links) => [...links, {url: ''}]);
  }
}
```

Each array item gets its own `URL_PREVIEW` resource because `applyEach` registers the schema rules against each item independently. When the user adds a link, `create` runs for the new item's field. When a link is removed (not shown here, but a common pattern), the framework tears down that field's injector along with the resource.
-->

폼에서 관리 키를 사용해야 하는 경우 해당 키에 대한 `metadata()` 규칙을 등록한 다음 필드 상태에서 반환하는 값을 읽어보세요.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {applyEach, form, metadata, FormField} from '@angular/forms/signals';
import {URL_PREVIEW} from './url-preview';

@Component({
  selector: 'app-link-editor',
  imports: [FormField],
  template: `
    <form>
      @for (link of linksForm.links; track link) {
        <fieldset>
          <label>
            URL
            <input [formField]="link.url" />
          </label>
          <!-- 이 링크의 `url` 필드에 대해 `URL_PREVIEW` 키를 읽으면, 해당 링크의 생성 함수가 생성한 리소스를 결과로 반환합니다. -->
          @let preview = link.url().metadata(URL_PREVIEW);
          @if (preview?.isLoading()) {
            <p>Loading preview...</p>
          } @else if (preview?.hasValue() && preview.value(); as data) {
            <article class="preview">
              <h3>{{ data.title }}</h3>
              @if (data.description) {
                <p>{{ data.description }}</p>
              }
            </article>
          } @else if (preview?.error()) {
            <p class="error">Could not load preview.</p>
          }
        </fieldset>
      }
      <button type="button" (click)="addLink()">Add link</button>
    </form>
  `,
})
export class LinkEditor {
  linksModel = signal({links: [{url: ''}]});

  linksForm = form(this.linksModel, (path) => {
    // URL_PREVIEW 키를 개별 링크 url 필드에 등록합니다.
    // applyEach는 스키마 항목마다 실행되기 때문에 create()도 링크마다 한 번씩 실행됩니다.
    // 개별 링크는 고유한 리소스를 갖습니다.
    applyEach(path.links, (itemPath) => {
      metadata(itemPath.url, URL_PREVIEW, ({value}) => value());
    });
  });

  addLink() {
    this.linksForm.links().value.update((links) => [...links, {url: ''}]);
  }
}
```

배열의 각 항목은 `applyEach`가 각 항목에 대해 스키마 규칙을 독립적으로 등록하기 때문에 각각 `URL_PREVIEW` 리소스를 갖습니다.
사용자가 링크를 추가하면 새 항목 필드에 대해 `create()`가 실행됩니다.
그리고 링크가 제거되면 해당 필드의 인젝터와 리소스가 함께 제거됩니다.

<!--
## Next steps
-->

## 다음 단계

<!--
Remember that metadata exists so reactive data can travel with the field through schema composition, accumulate across rules, and tear down with the field's lifecycle. It leverages the same system Angular's built-in validators use, and can be tailored to your own use cases.

For detailed API documentation, see:

- [`createMetadataKey()`](api/forms/signals/createMetadataKey) - Define a metadata key with optional reducer
- [`createManagedMetadataKey()`](api/forms/signals/createManagedMetadataKey) - Define a lifecycle-aware metadata key
- [`metadata()`](api/forms/signals/metadata) - Contribute a value to a metadata key in a schema
- [`MetadataReducer`](api/forms/signals/MetadataReducer) - Built-in reducers for combining contributions

For additional related guides on Signal Forms, check out:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/form-logic" title="Adding form logic" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/async-operations" title="Async operations" />
</docs-pill-row>
-->

메타데이터는 반응형 데이터가 스키마 구성을 통해 필드와 함께 이동하고, 규칙 전반에 걸쳐 누적되며, 필드의 라이프싸이클에 맞춰 함께 소멸될 수 있도록 존재한다는 점을 기억하세요.
이는 Angular의 내장 유효성 검사 함수가 사용하는 것과 동일한 시스템을 활용하며, 필요한 사례에 맞게 사용자 정의할 수 있습니다.

자세한 내용은 API 문서를 참고하세요:

- [`createMetadataKey()`](api/forms/signals/createMetadataKey) - 선택적 리듀서를 사용해서 메타데이터 키를 정의합니다.
- [`createManagedMetadataKey()`](api/forms/signals/createManagedMetadataKey) - 라이프싸이클 관련 메타데이터 키를 정의합니다.
- [`metadata()`](api/forms/signals/metadata) - 스키마의 메타데이터 키에 값을 추가합니다.
- [`MetadataReducer`](api/forms/signals/MetadataReducer) - 영향도를 결합하는 기본 리듀서입니다.

시그널 폼을 다루는 이런 문서도 확인해 보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/form-logic" title="폼 로직 추가하기" />
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/async-operations" title="비동기 동작" />
</docs-pill-row>
