<!--
# Typed Forms
-->
# 엄격한 타입의 폼

<!--
As of Angular 14, reactive forms are strictly typed by default.
-->
Angular 14 부터는 반응형 폼에 엄격한 타입이 기본으로 적용됩니다.


<a id="prerequisites"></a>

<!--
## Prerequisites
-->
## 사전지식

<!--
As background for this guide, you should already be familiar with [Angular Reactive Forms](guide/reactive-forms "Reactive Forms").
-->
[Angular 반응형 폼](guide/reactive-forms "Reactive Forms")을 익숙하게 활용할 수 있을 때 이 문서를 보는 것이 좋습니다.


<a id="intro"></a>

<!--
## Overview of Typed Forms
-->
## 엄격한 타입의 폼 개요

<!--
<iframe width="560" height="315" src="https://www.youtube.com/embed/L-odCf4MfJc" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

With Angular reactive forms, you explicitly specify a *form model*. As a simple example, consider this basic user login form:

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

In addition to the added safety, the types enable a variety of other improvements, such as better autocomplete in IDEs, and an explicit way to specify form structure.

These improvements currently apply only to *reactive* forms (not [*template-driven* forms](guide/forms "Forms Guide")).
-->
<iframe width="560" height="315" src="https://www.youtube.com/embed/L-odCf4MfJc" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Angular 반응형 폼을 사용할 때는 *폼 모델*을 명시적으로 정의해야 합니다.
기본 로그인 폼이라면 이렇습니다:

```ts
const login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
});
```

Angular 는 `FormGroup`을 활용할 수 있는 API를 다양하게 제공합니다.
그래서 `login.value`나 `login.controls`, `login.patchValue`와 같이 활용할 수 있습니다.
(API 전체 목록을 확인하려면 [API 문서](api/forms/FormGroup)를 참고하세요.)

이전 버전까지는 API 대부분이 `any` 타입으로 동작했기 때문에, 폼 컨트롤을 사용할 때, 값에 접근할 때 모두 타입이 안전하지 않았습니다.
그래서 이렇게 잘못된 코드도 작성할 수 있습니다:

```ts
const emailDomain = login.value.email.domain;
```

이제는 반응형 폼에 엄격한 타입이 적용되었기 때문에 `email` 객체에 `domain` 프로퍼티가 없다면 컴파일되지 않습니다.

타입 측면에서 안전한 것 외에도, 폼에 엄격한 타입이 도입되면 폼 구조를 좀 더 명확하게 정의할 수 있기 때문에 IDE의 자동완성 활용도를 더 높일 수 있습니다.

이 개선사항은 현재 *반응형* 폼에 적용되었습니다.
([템플릿 기반 폼](guide/forms "Forms Guide")에는 아직 적용되지 않았습니다.)



<a id="automated-migration"></a>

<!--
## Automated Untyped Forms Migration
-->
## 타입이 느슨한 폼으로 자동 마이그레이션

<!--
When upgrading to Angular 14, an included migration will automatically replace all the forms classes in your code with corresponding untyped versions. For example, the snippet from above would become:

```ts
const login = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
});
```

Each `Untyped` symbol has exactly the same semantics as in previous Angular versions, so your application should continue to compile as before. By removing the `Untyped` prefixes, you can incrementally enable the types.
-->
Angular를 14버전으로 업그레이드하면 마이그레이션 코드가 자동으로 실행되면서 모든 폼 클래스를 타입이 느슨한 폼로 변환합니다:

```ts
const login = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
});
```

`Untyped` 접두사가 붙긴 했지만 이 클래스들은 이전 버전에 사용했던 클래스와 정확히 같기 때문에, 애플리케이션도 정상적으로 컴파일됩니다.
이제 `Untyped` 접두사를 제거하면 폼에 타입을 적용할 수 있습니다.


<a id="form-control-inference"></a>

<!--
## `FormControl`: Getting Started
-->
## `FormControl`: 시작하기

<!--
The simplest possible form consists of a single control:

```ts
const email = new FormControl('angularrox@gmail.com');
```

This control will be automatically inferred to have the type `FormControl<string|null>`. TypeScript will automatically enforce this type throughout the [`FormControl` API](api/forms/FormControl), such as `email.value`, `email.valueChanges`, `email.setValue(...)`, etc.
-->
폼 컨트롤이 하나인 가장 단순한 폼부터 시작해 봅시다:

```ts
const email = new FormControl('angularrox@gmail.com');
```

이렇게 사용하면 폼 컨트롤의 타입은 `FormControl<string|null>`로 추론됩니다.
그리고 TypeScript도 이 타입을 [`FormControl` API](api/forms/FormControl)에 적용하기 때문에 `email.value`나 `email.valueChanges`, `email.setValue(...)`와 같은 방식으로 활용할 수 있습니다.



<!--
### Nullability 
-->
### Null 가능성(Nullability)

<!--
You might wonder: why does the type of this control include `null`?  This is because the control can become `null` at any time, by calling reset:

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
이 시점에 궁금할 수 있습니다: 타입에 왜 `null`이 들어있을까요?
왜냐하면 폼을 초기화하면 `null` 값이 될 수 있기 때문입니다.

```ts
const email = new FormControl('angularrox@gmail.com');
email.reset();
console.log(email.value); // null
```

이제 TypeScript는 폼 컨트롤의 값이 `null`이 될 수 있다는 가능성을 열어둡니다.
그래서 폼 컨트롤 값이 `null`이 되지 않는 것을 명확하게 지정하려면 `nonNullable` 옵션을 사용하면 됩니다.
이렇게 구현하고 폼 컨트롤을 초기화하면 `null` 대신 초기값으로 돌아갑니다:

```ts
const email = new FormControl('angularrox@gmail.com', {nonNullable: true});
email.reset();
console.log(email.value); // angularrox@gmail.com
```

이 동작은 실행 시점에 `.reset()`이 실행된 경우에도 동일합니다.


<!--
### Specifying an Explicit Type
-->
### 정확한 타입 지정하기

<!--
It is possible to specify the type, instead of relying on inference. Consider a control that is initialized to `null`. Because the initial value is `null`, TypeScript will infer `FormControl<null>`, which is narrower than we want.

```ts
const email = new FormControl(null);
email.setValue('angularrox@gmail.com'); // Error!
```

To prevent this, we explicitly specify the type as `string|null`:

```ts
const email = new FormControl<string|null>(null);
email.setValue('angularrox@gmail.com');
```
-->
타입은 추론하지 않고 직접 지정할 수도 있습니다.
`null` 값으로 초기화되는 폼 컨트롤이 하나 있다고 합니다.
그러면 초기값으로 `null`이 사용되었기 때문에 TypeScript는 이 폼 컨트롤을 `FormControl<null>` 타입으로 추론하고, 폼 컨트롤의 타입을 더 확장할 수 없습니다.

```ts
const email = new FormControl(null);
email.setValue('angularrox@gmail.com'); // 에러!
```

이 문제를 해결하려면 타입을 `string|null` 이라고 명확하게 지정하면 됩니다:

```ts
const email = new FormControl<string|null>(null);
email.setValue('angularrox@gmail.com');
```


<a id="form-array"></a>

<!--
## `FormArray`: Dynamic, Homogenous Collections
-->
## `FormArray`: 같은 타입을 동적으로 모은 컬렉션

<!--
A `FormArray` contains an open-ended list of controls. The type parameter corresponds to the type of each inner control:

```ts
const names = new FormArray([new FormControl('Alex')]);
names.push(new FormControl('Jess'));
```

This `FormArray` will have the inner controls type `FormControl<string|null>`.

If you want to have multiple different element types inside the array, you must use `UntypedFormArray`, because TypeScript cannot infer which element type will occur at which position.
-->
`FormArray`는 폼 컨트롤을 제한없이 담을 수 있습니다.
이 때 타입을 지정하면 개별 컨트롤의 타입을 지정할 수 있습니다:

```ts
const names = new FormArray([new FormControl('Alex')]);
names.push(new FormControl('Jess'));
```

이렇게 구현하면 `FormArray`의 타입은 안쪽에 있는 폼 컨트롤 타입인 `FormControl<string|null>`가 됩니다.

배열 안에 다양한 엘리먼트 타입을 사용한다면 TypeScript의 추론 한계를 마주할 수 있기 때문에, 이런 경우에는 `UntypedFormArray`를 사용해야 할 수도 있습니다.


<a id="form-group-record"></a>

<!--
## `FormGroup` and `FormRecord`
-->
## `FormGroup`, `FormRecord`

<!--
Angular provides the `FormGroup` type for forms with an enumerated set of keys, and a type called `FormRecord`, for open-ended or dynamic groups.
-->
`FormGroup` 중에서 키를 제한하지 않아서 동적으로 확장될 수 있는 폼 그룹을 `FormRecord`라고 합니다.


<!--
### Partial Values
-->
## 객체의 일부

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

If you want to access the value *including* disabled controls, and thus bypass possible `undefined` fields, you can use `login.getRawValue()`.
-->
로그인 폼을 다시 한 번 봅시다:

```ts
const login = new FormGroup({
    email: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
});
```

`FormGroup`이라면 [폼 컨트롤을 비활성화할 가능성](api/forms/FormGroup)이 있습니다.
그리고 비활성화된 폼 컨트롤은 그룹에 값을 반영하지 않습니다.

따라서 `login.value`는 `Partial<{email: string, password: string}>`이 됩니다.
`Partial`은 객체의 키가 존재하지 않을 수 있다는 것을 의미하는 키워드입니다.

좀 더 구체적으로 이야기하면, `login.value.email`의 타입은 `string|undefined`이기 때문에, TypeScript도 이 값이 `undefined`가 될 수 있다는 것을 강제하게 됩니다(`strictNullChecks`를 활성화한 경우에 그렇습니다).

그래서 비활성화된 폼 컨트롤 중에서 `undefined` 필드를 포함한 전체 값을 참조하려면 `login.getRawValue()`를 사용하면 됩니다.


<!--
### Optional Controls and Dynamic Groups
-->
### 생략 가능한 폼 컨트롤과 동적 그룹

<!--
Some forms have controls that may or may not be present, which can be added and removed at runtime. You can represent these controls using *optional fields*:

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
어떤 폼은 실행시점에 폼 컨트롤이 추가되거나 제거되기 때문에 폼 컨트롤의 존재 자체가 변경되는 경우가 있습니다.
이런 경우라면 *생략 가능한 필드*로 정의할 수 있습니다:

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

이 폼에는 타입을 명확하게 지정했기 때문에 `password` 폼 컨트롤이 생략될 수 있습니다.
TypeScript도 그렇게 동작합니다.


### `FormRecord`

<!--
Some `FormGroup` usages do not fit the above pattern because the keys are not known ahead of time. The `FormRecord` class is designed for that case:

```ts
const addresses = new FormRecord<FormControl<string|null>>({});
addresses.addControl('Andrew', new FormControl('2340 Folsom St'));
```

Any control of type `string|null` can be added to this `FormRecord`.

If you need a `FormGroup` that is both dynamic (open-ended) and heterogeneous (the controls are different types), no improved type safety is possible, and you should use `UntypedFormGroup`.

A `FormRecord` can also be built with the `FormBuilder`:

```ts
const addresses = fb.record({'Andrew': '2340 Folsom St'});
```
-->
`FormGroup`을 사용하다보면 실행시점에 키가 추가되는 경우가 있습니다.
이런 경우에는 `FormRecord`를 사용할 수 있습니다:

```ts
const addresses = new FormRecord<FormControl<string|null>>({});
addresses.addControl('Andrew', new FormControl('2340 Folsom St'));
```

`string|null` 타입의 폼 컨트롤이라면 이 `FormRecord`에 얼마든지 추가할 수 있습니다.

하지만 `FormGroup`을 구성하는데 이 폼 그룹이 다양한 타입으로, 동적으로 확장된다면 특정 타입으로 제한할 수 없습니다.
이런 경우는 `UntypedFormGroup`를 사용해야 합니다.

`FormRecord`는 `FormBuilder`로도 선언할 수 있습니다:

```ts
const addresses = fb.record({'Andrew': '2340 Folsom St'});
```


<!--
## `FormBuilder` and `NonNullableFormBuilder`
-->
## `FormBuilder`, `NonNullableFormBuilder`

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
`FormBuilder` 클래스는 이전 버전과 같은 방식으로 사용하지만, 폼에 타입 기능이 도입되면서 더 강력해졌습니다.

그리고 기존 방식 외에 이제는 `NonNullableFormBuilder`를 사용할 수 있습니다.
이 타입은 `{nonNullable: true}`를 축약한 클래스이며, 내부에 있는 모든 폼 컨트롤에 적용됩니다.
`FormBuilder`를 사용할 때 `nonNullable` 프로퍼티를 사용하면 됩니다:

```ts
const fb = new FormBuilder();
const login = fb.nonNullable.group({
    email: '',
    password: '',
});
```

이 예제에서 폼 그룹 안에 있는 폼 컨트롤은 모두 `nonNullable`이 지정된 것처럼 `null` 값을 허용하지 않습니다.

`NonNullableFormBuilder` 클래스를 의존성으로 주입받는 방식으로도 동일하게 구현할 수 있습니다.


<!-- links -->

<!-- external links -->

[NinjaSquadTypedFormsBlog]: https://blog.ninja-squad.com/2022/04/21/strictly-typed-forms-angular/ "NinjaSquad | Strictly typed forms in Angular"

<!-- end links -->

@reviewed 2022-05-10
