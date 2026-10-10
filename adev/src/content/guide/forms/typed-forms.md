<!--
# Typed Forms
-->

<a id="typed-forms"></a>

# 타입이 지정된 폼

<!--
As of Angular 14, reactive forms are strictly typed by default.

As background for this guide, you should already be familiar with [Angular Reactive Forms](guide/forms/reactive-forms).
-->

Angular 14부터 반응형 폼에는 기본적으로 엄격한 타입이 적용됩니다.

이 가이드를 읽기 전에 [Angular 반응형 폼](guide/forms/reactive-forms)에 익숙해야 합니다.

<!--
## Overview of Typed Forms
-->

<a id="overview-of-typed-forms"></a>

## 타입이 지정된 폼 개요

<!--
<docs-video src="https://www.youtube.com/embed/L-odCf4MfJc" alt="Typed Forms in Angular" />

With Angular reactive forms, you explicitly specify a _form model_. As a simple example, consider this basic user login form:

```ts
const login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
```

Angular provides many APIs for interacting with this `FormGroup`. For example, you may call `login.value`, `login.controls`, `login.patchValue`, etc. (For a full API reference, see the [API documentation](api/forms/FormGroup).)

In previous Angular versions, most of these APIs included `any` somewhere in their types, and interacting with the structure of the controls, or the values themselves, was not type-safe. For example: you could write the following invalid code:

```ts
const emailDomain = login.value.email.domain;
```

With strictly typed reactive forms, the above code does not compile, because there is no `domain` property on `email`.

In addition to the added safety, the types enable a variety of other improvements, such as better autocomplete in IDEs and an explicit way to specify form structure.

These improvements currently apply only to _reactive_ forms (not [_template-driven_ forms](guide/forms/template-driven-forms)).
-->

<docs-video src="https://www.youtube.com/embed/L-odCf4MfJc" alt="Angular에서 타입이 지정된 폼 사용하기" />

Angular 반응형 폼을 사용하면 _폼 모델_ 을 명시적으로 지정합니다.
간단한 예로 다음과 같은 기본 로그인 폼을 살펴봅시다:

```ts
const login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
```

Angular는 이 `FormGroup`을 다룰 수 있는 다양한 API를 제공합니다.
예를 들어 `login.value`, `login.controls`, `login.patchValue` 등을 사용할 수 있습니다.
전체 API 레퍼런스는 [API 문서](api/forms/FormGroup)를 참고하세요.

이전 Angular 버전에서는 이런 API 대부분의 타입에 `any`가 포함되어 있어서, 컨트롤 구조나 값을 다룰 때 타입 안전성을 보장하지 못했습니다.
예를 들어 다음과 같이 잘못된 코드를 작성할 수 있었습니다:

```ts
const emailDomain = login.value.email.domain;
```

엄격한 타입이 적용된 반응형 폼에서는 `email`에 `domain` 프로퍼티가 없기 때문에 위 코드를 컴파일할 수 없습니다.

타입을 사용하면 안전성이 높아질 뿐 아니라 IDE의 자동완성이 개선되고 폼 구조를 명시적으로 지정할 수 있는 등 여러 이점이 있습니다.

이런 개선 사항은 현재 _반응형_ 폼에만 적용되며, [_템플릿 기반_ 폼](guide/forms/template-driven-forms)에는 적용되지 않습니다.

<!--
## Untyped Forms
-->

<a id="untyped-forms"></a>

## 타입이 지정되지 않은 폼

<!--
Non-typed forms are still supported, and will continue to work as before. To use them, you must import the `Untyped` symbols from `@angular/forms`:

```ts
const login = new UntypedFormGroup({
  email: new UntypedFormControl(''),
  password: new UntypedFormControl(''),
});
```

Each `Untyped` symbol has exactly the same semantics as in previous Angular versions. By removing the `Untyped` prefixes, you can incrementally enable the types.
-->

타입이 지정되지 않은 폼도 계속 지원하며 이전과 같은 방식으로 동작합니다.
이 방식을 사용하려면 `@angular/forms`에서 `Untyped`로 시작하는 심볼을 로드해야 합니다:

```ts
const login = new UntypedFormGroup({
  email: new UntypedFormControl(''),
  password: new UntypedFormControl(''),
});
```

각 `Untyped` 심볼은 이전 Angular 버전과 정확히 같은 방식으로 동작합니다.
`Untyped` 접두사를 제거하면서 점진적으로 타입을 적용할 수 있습니다.

<!--
## `FormControl`: Getting Started
-->

<a id="formcontrol-getting-started"></a>

## `FormControl` 시작하기

<!--
The simplest possible form consists of a single control:

```ts
const email = new FormControl('angularrox@gmail.com');
```

This control will be automatically inferred to have the type `FormControl<string|null>`. TypeScript will automatically enforce this type throughout the [`FormControl` API](api/forms/FormControl), such as `email.value`, `email.valueChanges`, and `email.setValue(...)`.
-->

가장 간단한 폼은 컨트롤 하나로 구성합니다:

```ts
const email = new FormControl('angularrox@gmail.com');
```

이 컨트롤의 타입은 자동으로 `FormControl<string|null>`로 추론됩니다.
TypeScript는 `email.value`, `email.valueChanges`, `email.setValue(...)` 등 [`FormControl` API](api/forms/FormControl) 전체에서 이 타입을 적용합니다.

<!--
### Nullability
-->

<a id="nullability"></a>

### null 허용 여부

<!--
You might wonder: why does the type of this control include `null`? This is because the control can become `null` at any time, by calling reset:

```ts
const email = new FormControl('angularrox@gmail.com');
email.reset();
console.log(email.value); // null
```

TypeScript will enforce that you always handle the possibility that the control has become `null`. If you want to make this control non-nullable, you may use the `nonNullable` option. This will cause the control to reset to its initial value, instead of `null`:

```ts
const email = new FormControl('angularrox@gmail.com', {nonNullable: true});
email.reset();
console.log(email.value); // angularrox@gmail.com
```

To reiterate, this option affects the runtime behavior of your form when `.reset()` is called, and should be flipped with care.
-->

컨트롤 타입에 `null`이 포함된 이유가 궁금할 수 있습니다.
`reset`을 실행하면 언제든 컨트롤 값이 `null`이 될 수 있기 때문입니다:

```ts
const email = new FormControl('angularrox@gmail.com');
email.reset();
console.log(email.value); // null
```

TypeScript는 컨트롤 값이 `null`일 가능성을 항상 처리하도록 요구합니다.
컨트롤이 `null` 값을 갖지 않도록 하려면 `nonNullable` 옵션을 사용하면 됩니다.
이 옵션을 지정하면 컨트롤을 초기화할 때 `null` 대신 초기값으로 되돌립니다:

```ts
const email = new FormControl('angularrox@gmail.com', {nonNullable: true});
email.reset();
console.log(email.value); // angularrox@gmail.com
```

다시 말해 이 옵션은 `.reset()`을 실행할 때 폼의 런타임 동작에도 영향을 미치므로, 주의해서 변경해야 합니다.

<!--
### Specifying an Explicit Type
-->

<a id="specifying-an-explicit-type"></a>

### 타입을 명시적으로 지정하기

<!--
It is possible to specify the type, instead of relying on inference. Consider a control that is initialized to `null`. Because the initial value is `null`, TypeScript will infer `FormControl<null>`, which is narrower than we want.

```ts
const email = new FormControl(null);
email.setValue('angularrox@gmail.com'); // Error!
```

To prevent this, we explicitly specify the type as `string|null`:

```ts
const email = new FormControl<string | null>(null);
email.setValue('angularrox@gmail.com');
```
-->

타입 추론에 의존하지 않고 타입을 직접 지정할 수도 있습니다.
초기값이 `null`인 컨트롤을 생각해 봅시다.
초기값이 `null`이면 TypeScript는 원하는 범위보다 좁은 `FormControl<null>`로 타입을 추론합니다.

```ts
const email = new FormControl(null);
email.setValue('angularrox@gmail.com'); // 에러가 발생합니다!
```

이 문제를 방지하려면 타입을 `string|null`로 명시합니다:

```ts
const email = new FormControl<string | null>(null);
email.setValue('angularrox@gmail.com');
```

<!--
## `FormArray`: Dynamic, Homogenous Collections
-->

<a id="formarray-dynamic-homogenous-collections"></a>

## `FormArray`: 같은 타입의 컨트롤을 동적으로 관리하기

<!--
A `FormArray` contains an open-ended list of controls. The type parameter corresponds to the type of each inner control:

```ts
const names = new FormArray([new FormControl('Alex')]);
names.push(new FormControl('Jess'));
```

Pass an array of controls to `aliases.push()` when you need to add several entries at once.

```ts
const aliases = new FormArray([new FormControl('ng')]);
aliases.push([new FormControl('ngDev'), new FormControl('ngAwesome')]);
```

This `FormArray` will have the inner controls type `FormControl<string|null>`.

If you want to have multiple different element types inside the array, you must use `UntypedFormArray`, because TypeScript cannot infer which element type will occur at which position.

A `FormArray` also provides a `clear()` method to remove all controls it contains:

```ts
const aliases = new FormArray([new FormControl('ngDev'), new FormControl('ngAwesome')]);
aliases.clear();
console.log(aliases.length); // 0
```
-->

`FormArray`에는 개수가 정해지지 않은 컨트롤 목록을 담습니다.
타입 인자는 내부의 각 컨트롤 타입에 해당합니다:

```ts
const names = new FormArray([new FormControl('Alex')]);
names.push(new FormControl('Jess'));
```

여러 항목을 한 번에 추가하려면 `aliases.push()`에 컨트롤 배열을 전달합니다.

```ts
const aliases = new FormArray([new FormControl('ng')]);
aliases.push([new FormControl('ngDev'), new FormControl('ngAwesome')]);
```

이 `FormArray` 내부 컨트롤의 타입은 `FormControl<string|null>`입니다.

배열에 서로 다른 여러 타입의 항목을 담으려면 `UntypedFormArray`를 사용해야 합니다.
TypeScript가 각 위치에 어떤 타입의 항목이 올지 추론할 수 없기 때문입니다.

`FormArray`는 내부의 모든 컨트롤을 제거하는 `clear()` 메서드도 제공합니다:

```ts
const aliases = new FormArray([new FormControl('ngDev'), new FormControl('ngAwesome')]);
aliases.clear();
console.log(aliases.length); // 0
```

<!--
## `FormGroup` and `FormRecord`
-->

<a id="formgroup-and-formrecord"></a>

## `FormGroup`과 `FormRecord`

<!--
Angular provides the `FormGroup` type for forms with an enumerated set of keys, and a type called `FormRecord`, for open-ended or dynamic groups.
-->

Angular는 키 목록이 정해진 폼에 사용할 `FormGroup` 타입과, 키가 정해지지 않았거나 동적으로 구성하는 그룹에 사용할 `FormRecord` 타입을 제공합니다.

<!--
### Partial Values
-->

<a id="partial-values"></a>

### 일부 값만 포함하는 경우

<!--
Consider again a login form:

```ts
const login = new FormGroup({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
});
```

On any `FormGroup`, it is [possible to disable controls](api/forms/FormGroup). Any disabled control will not appear in the group's value.

As a consequence, the type of `login.value` is `Partial<{email: string, password: string}>`. The `Partial` in this type means that each member might be undefined.

More specifically, the type of `login.value.email` is `string|undefined`, and TypeScript will enforce that you handle the possibly `undefined` value (if you have `strictNullChecks` enabled).

If you want to access the value _including_ disabled controls, and thus bypass possible `undefined` fields, you can use `login.getRawValue()`.
-->

로그인 폼을 다시 살펴봅시다:

```ts
const login = new FormGroup({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
});
```

모든 `FormGroup`에서는 [컨트롤을 비활성화할 수 있습니다](api/forms/FormGroup).
비활성화된 컨트롤은 그룹의 값에 포함되지 않습니다.

따라서 `login.value`의 타입은 `Partial<{email: string, password: string}>`입니다.
이 타입의 `Partial`은 각 프로퍼티의 값이 undefined일 수 있다는 의미입니다.

구체적으로 `login.value.email`의 타입은 `string|undefined`이며, TypeScript는 `strictNullChecks`가 활성화되어 있다면 값이 `undefined`일 가능성을 처리하도록 요구합니다.

비활성화된 컨트롤의 값까지 _포함해서_ 가져오고, 이로 인해 필드가 `undefined`가 되는 것을 피하려면 `login.getRawValue()`를 사용하면 됩니다.

<!--
### Optional Controls and Dynamic Groups
-->

<a id="optional-controls-and-dynamic-groups"></a>

### 선택적 컨트롤과 동적 그룹

<!--
Some forms have controls that may or may not be present, which can be added and removed at runtime. You can represent these controls using _optional fields_:

```ts
interface LoginForm {
  email: FormControl<string>;
  password?: FormControl<string>;
}

const login = new FormGroup<LoginForm>({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
});

login.removeControl('password');
```

In this form, we explicitly specify the type, which allows us to make the `password` control optional. TypeScript will enforce that only optional controls can be added or removed.
-->

어떤 폼에는 존재할 수도 있고 존재하지 않을 수도 있는 컨트롤이 있으며, 런타임에 이를 추가하거나 제거할 수 있습니다.
이런 컨트롤은 _선택적 필드_ 로 표현합니다:

```ts
interface LoginForm {
  email: FormControl<string>;
  password?: FormControl<string>;
}

const login = new FormGroup<LoginForm>({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
});

login.removeControl('password');
```

이 폼에서는 타입을 명시적으로 지정해서 `password` 컨트롤을 선택적으로 사용하도록 설정합니다.
TypeScript는 선택적 컨트롤만 추가하거나 제거할 수 있도록 제한합니다.

<!--
### `FormRecord`
-->

<a id="formrecord"></a>

### `FormRecord`

<!--
Some `FormGroup` usages do not fit the above pattern because the keys are not known ahead of time. The `FormRecord` class is designed for that case:

```ts
const addresses = new FormRecord<FormControl<string | null>>({});
addresses.addControl('Andrew', new FormControl('2340 Folsom St'));
```

Any control of type `string|null` can be added to this `FormRecord`.

If you need a `FormGroup` that is both dynamic (open-ended) and heterogeneous (the controls are different types), no improved type safety is possible, and you should use `UntypedFormGroup`.

A `FormRecord` can also be built with the `FormBuilder`:

```ts
const addresses = fb.record({'Andrew': '2340 Folsom St'});
```
-->

키를 미리 알 수 없는 경우에는 앞에서 살펴본 `FormGroup` 사용 방식이 맞지 않을 수 있습니다.
`FormRecord` 클래스는 이런 경우에 사용하도록 설계되었습니다:

```ts
const addresses = new FormRecord<FormControl<string | null>>({});
addresses.addControl('Andrew', new FormControl('2340 Folsom St'));
```

이 `FormRecord`에는 값의 타입이 `string|null`인 컨트롤을 추가할 수 있습니다.

동적이면서 키가 정해지지 않고, 컨트롤마다 타입도 다른 `FormGroup`이 필요하다면 타입 안전성을 더 높일 수 없으므로 `UntypedFormGroup`을 사용해야 합니다.

`FormBuilder`로 `FormRecord`를 생성할 수도 있습니다:

```ts
const addresses = fb.record({'Andrew': '2340 Folsom St'});
```

<!--
## `FormBuilder` and `NonNullableFormBuilder`
-->

<a id="formbuilder-and-nonnullableformbuilder"></a>

## `FormBuilder`와 `NonNullableFormBuilder`

<!--
The `FormBuilder` class has been upgraded to support the new types as well, in the same manner as the above examples.

Additionally, an additional builder is available: `NonNullableFormBuilder`. This type is shorthand for specifying `{nonNullable: true}` on every control, and can eliminate significant boilerplate from large non-nullable forms. You can access it using the `nonNullable` property on a `FormBuilder`:

```ts
const fb = new FormBuilder();
const login = fb.nonNullable.group({
  email: '',
  password: '',
});
```

On the above example, both inner controls will be non-nullable (i.e. `nonNullable` will be set).

You can also inject it using the name `NonNullableFormBuilder`.
-->

`FormBuilder` 클래스도 앞의 예제와 같은 방식으로 새로운 타입을 지원하도록 개선되었습니다.

추가로 `NonNullableFormBuilder`도 사용할 수 있습니다.
이 타입은 모든 컨트롤에 `{nonNullable: true}`를 지정하는 것을 간단하게 표현하며, null을 허용하지 않는 대규모 폼에서 반복 코드를 크게 줄일 수 있습니다.
`FormBuilder`의 `nonNullable` 프로퍼티로 접근할 수 있습니다:

```ts
const fb = new FormBuilder();
const login = fb.nonNullable.group({
  email: '',
  password: '',
});
```

위 예제의 내부 컨트롤 두 개는 모두 null을 허용하지 않습니다.
즉, `nonNullable`이 설정됩니다.

`NonNullableFormBuilder`라는 이름으로 직접 주입할 수도 있습니다.
