<!--
# Template type checking
-->

<a id="template-type-checking"></a>

# 템플릿 타입 검사

<!--
## Overview of template type checking
-->

<a id="overview-of-template-type-checking"></a>

## 템플릿 타입 검사 개요

<!--
Just as TypeScript catches type errors in your code, Angular checks the expressions and bindings within the templates of your application and can report any type errors it finds.
Angular currently has three modes of doing this, depending on the value of the `fullTemplateTypeCheck` and `strictTemplates` flags in [Angular's compiler options](reference/configs/angular-compiler-options).
-->

TypeScript가 코드의 타입 오류를 찾아내듯이 Angular도 애플리케이션 템플릿의 표현식과 바인딩을 검사하고 발견한 타입 오류를 보고할 수 있습니다.
Angular에는 현재 세 가지 검사 모드가 있으며, [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)의 `fullTemplateTypeCheck`와 `strictTemplates` 플래그 값으로 결정됩니다.

<!--
### Basic mode
-->

<a id="basic-mode"></a>

### 기본 모드

<!--
In the most basic type-checking mode, with the `fullTemplateTypeCheck` flag set to `false`, Angular validates only top-level expressions in a template.

If you write `<map [city]="user.address.city">`, the compiler verifies the following:

- `user` is a property on the component class
- `user` is an object with an address property
- `user.address` is an object with a city property

The compiler does not verify that the value of `user.address.city` is assignable to the city input of the `<map>` component.

The compiler also has some major limitations in this mode:

- Importantly, it doesn't check embedded views, such as `*ngIf`, `*ngFor`, other `<ng-template>` embedded view.
- It doesn't figure out the types of `#refs`, the results of pipes, or the type of `$event` in event bindings.

In many cases, these things end up as type `any`, which can cause subsequent parts of the expression to go unchecked.
-->

가장 기본적인 타입 검사 모드에서는 `fullTemplateTypeCheck` 플래그가 `false`이며, Angular는 템플릿의 최상위 표현식만 검증합니다.

`<map [city]="user.address.city">`라고 작성하면 컴파일러는 다음을 확인합니다:

- `user`가 컴포넌트 클래스의 프로퍼티인지 확인합니다.
- `user`가 address 프로퍼티를 가진 객체인지 확인합니다.
- `user.address`가 city 프로퍼티를 가진 객체인지 확인합니다.

컴파일러는 `user.address.city` 값을 `<map>` 컴포넌트의 city 입력에 할당할 수 있는지는 확인하지 않습니다.

이 모드에는 다음과 같은 주요 제약도 있습니다:

- `*ngIf`, `*ngFor` 및 다른 `<ng-template>` 내장 뷰를 검사하지 않습니다.
- `#refs`의 타입, 파이프 결과의 타입, 이벤트 바인딩에서 `$event`의 타입을 알아내지 않습니다.

이러한 항목은 대부분 `any` 타입이 되어 표현식의 뒷부분이 검사되지 않을 수 있습니다.

<!--
### Full mode
-->

<a id="full-mode"></a>

### 전체 모드

<!--
If the `fullTemplateTypeCheck` flag is set to `true`, Angular is more aggressive in its type-checking within templates.
In particular:

- Embedded views \(such as those within an `*ngIf` or `*ngFor`\) are checked
- Pipes have the correct return type
- Local references to directives and pipes have the correct type \(except for any generic parameters, which will be `any`\)

The following still have type `any`.

- Local references to DOM elements
- The `$event` object
- Safe navigation expressions

IMPORTANT: The `fullTemplateTypeCheck` flag has been deprecated in Angular 13.
The `strictTemplates` family of compiler options should be used instead.
-->

`fullTemplateTypeCheck` 플래그가 `true`이면 Angular가 템플릿의 타입을 더 적극적으로 검사합니다.
특히 다음과 같은 차이가 있습니다:

- `*ngIf`, `*ngFor` 내부와 같은 내장 뷰도 검사합니다.
- 파이프의 반환 타입을 올바르게 확인합니다.
- 디렉티브와 파이프의 지역 참조에 올바른 타입을 부여합니다.
  단, 제네릭 매개변수는 `any`가 됩니다.

다음 항목은 여전히 `any` 타입입니다.

- DOM 엘리먼트의 지역 참조
- `$event` 객체
- 안전한 탐색 표현식

중요: `fullTemplateTypeCheck` 플래그는 Angular 13에서 사용 중단되었습니다.
대신 `strictTemplates` 계열의 컴파일러 옵션을 사용해야 합니다.

<!--
### Strict mode
-->

<a id="strict-mode"></a>

### 엄격 모드

<!--
Angular maintains the behavior of the `fullTemplateTypeCheck` flag, and introduces a third "strict mode".
Strict mode is a superset of full mode, and is accessed by setting the `strictTemplates` flag to true.
This flag supersedes the `fullTemplateTypeCheck` flag.

In addition to the full mode behavior, Angular does the following:

- Verifies that component/directive bindings are assignable to their `input()`s
- Obeys TypeScript's `strictNullChecks` flag when validating the preceding mode
- Infers the correct type of components/directives, including generics
- Infers template context types where configured \(for example, allowing correct type-checking of `NgFor`\)
- Infers the correct type of `$event` in component/directive, DOM, and animation event bindings
- Infers the correct type of local references to DOM elements, based on the tag name \(for example, the type that `document.createElement` would return for that tag\)
-->

Angular는 `fullTemplateTypeCheck` 플래그의 동작을 유지하면서 세 번째 모드인 "엄격 모드"를 제공합니다.
엄격 모드는 전체 모드의 기능을 모두 포함하며 `strictTemplates` 플래그를 true로 설정하면 사용할 수 있습니다.
이 플래그는 `fullTemplateTypeCheck` 플래그를 대체합니다.

전체 모드의 동작에 더해 Angular는 다음을 수행합니다:

- 컴포넌트/디렉티브 바인딩을 해당 `input()`에 할당할 수 있는지 확인합니다.
- 앞의 검증 과정에서 TypeScript의 `strictNullChecks` 플래그를 따릅니다.
- 제네릭을 포함한 컴포넌트/디렉티브의 올바른 타입을 추론합니다.
- 설정된 경우 템플릿 컨텍스트 타입을 추론합니다.
  예를 들어 `NgFor`의 타입을 올바르게 검사할 수 있습니다.
- 컴포넌트/디렉티브, DOM, 애니메이션 이벤트 바인딩에서 `$event`의 올바른 타입을 추론합니다.
- 태그 이름을 기준으로 DOM 엘리먼트 지역 참조의 올바른 타입을 추론합니다.
  예를 들어 해당 태그에 대해 `document.createElement`가 반환하는 타입을 사용합니다.

<!--
## Checking of `*ngFor`
-->

<a id="checking-of-ngfor"></a>

## `*ngFor` 검사하기

<!--
The three modes of type-checking treat embedded views differently.
Consider the following example.

```ts {header:"User interface"}
interface User {
  name: string;
  address: {
    city: string;
    state: string;
  };
}
```

```html
<div *ngFor="let user of users">
  <h2>{{config.title}}</h2>
  <span>City: {{user.address.city}}</span>
</div>
```

The `<h2>` and the `<span>` are in the `*ngFor` embedded view.
In basic mode, Angular doesn't check either of them.
However, in full mode, Angular checks that `config` and `user` exist and assumes a type of `any`.
In strict mode, Angular knows that the `user` in the `<span>` has a type of `User`, and that `address` is an object with a `city` property of type `string`.
-->

세 가지 타입 검사 모드는 내장 뷰를 서로 다르게 처리합니다.
다음 예제를 살펴봅시다.

```ts {header:"User interface"}
interface User {
  name: string;
  address: {
    city: string;
    state: string;
  };
}
```

```html
<div *ngFor="let user of users">
  <h2>{{config.title}}</h2>
  <span>City: {{user.address.city}}</span>
</div>
```

`<h2>`와 `<span>`은 `*ngFor` 내장 뷰 안에 있습니다.
기본 모드에서는 Angular가 둘 다 검사하지 않습니다.
전체 모드에서는 `config`와 `user`가 존재하는지 확인하고 타입을 `any`로 간주합니다.
엄격 모드에서는 `<span>`의 `user`가 `User` 타입이고, `address`는 `string` 타입의 `city` 프로퍼티를 가진 객체라는 것을 알고 있습니다.

<!--
## Troubleshooting template errors
-->

<a id="troubleshooting-template-errors"></a>

## 템플릿 오류 해결하기

<!--
With strict mode, you might encounter template errors that didn't arise in either of the previous modes.
These errors often represent genuine type mismatches in the templates that were not caught by the previous tooling.
If this is the case, the error message should make it clear where in the template the problem occurs.

There can also be false positives when the typings of an Angular library are either incomplete or incorrect, or when the typings don't quite line up with expectations as in the following cases.

- When a library's typings are wrong or incomplete \(for example, missing `null | undefined` if the library was not written with `strictNullChecks` in mind\)
- When a library's input types are too narrow and the library hasn't added appropriate metadata for Angular to figure this out.
  This usually occurs with disabled or other common Boolean inputs used as attributes, for example, `<input disabled>`.

- When using `$event.target` for DOM events \(because of the possibility of event bubbling, `$event.target` in the DOM typings doesn't have the type you might expect\)

In case of a false positive like these, there are a few options:

- Use the `$any()` type-cast function in certain contexts to opt out of type-checking for a part of the expression
- Disable strict checks entirely by setting `strictTemplates: false` in the application's TypeScript configuration file, `tsconfig.json`
- Disable certain type-checking operations individually, while maintaining strictness in other aspects, by setting a _strictness flag_ to `false`
- If you want to use `strictTemplates` and `strictNullChecks` together, opt out of strict null type checking specifically for input bindings using `strictNullInputTypes`

Unless otherwise commented, each following option is set to the value for `strictTemplates` \(`true` when `strictTemplates` is `true` and conversely, the other way around\).

| Strictness flag              | Effect                                                                                                                                                                                                                                                                                                                                                                        |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strictInputTypes`           | Whether the assignability of a binding expression to the `@Input()` field is checked. Also affects the inference of directive generic types.                                                                                                                                                                                                                                  |
| `strictInputAccessModifiers` | Whether access modifiers such as `private`/`protected`/`readonly` are honored when assigning a binding expression to an `@Input()` or `input()`. If disabled, the access modifiers of the input are ignored; only the type is checked. This option is `false` by default, even with `strictTemplates` set to `true`. Note: This checking only applies to inputs, not outputs. |
| `strictNullInputTypes`       | Whether `strictNullChecks` is honored when checking `@Input()` bindings \(per `strictInputTypes`\). Turning this off can be useful when using a library that was not built with `strictNullChecks` in mind.                                                                                                                                                                   |
| `strictAttributeTypes`       | Whether to check `@Input()` bindings that are made using text attributes. For example, `<input matInput disabled="true">` \(setting the `disabled` property to the string `'true'`\) vs `<input matInput [disabled]="true">` \(setting the `disabled` property to the boolean `true`\).                                                                                       |
| `strictSafeNavigationTypes`  | Whether the return type of safe navigation operations \(for example, `user?.name` will be correctly inferred based on the type of `user`\). If disabled, `user?.name` will be of type `any`.                                                                                                                                                                                  |
| `strictDomLocalRefTypes`     | Whether local references to DOM elements will have the correct type. If disabled `ref` will be of type `any` for `<input #ref>`.                                                                                                                                                                                                                                              |
| `strictOutputEventTypes`     | Whether `$event` will have the correct type for event bindings to component/directive an `@Output()`, or to animation events. If disabled, it will be `any`.                                                                                                                                                                                                                  |
| `strictDomEventTypes`        | Whether `$event` will have the correct type for event bindings to DOM events. If disabled, it will be `any`.                                                                                                                                                                                                                                                                  |
| `strictContextGenerics`      | Whether the type parameters of generic components will be inferred correctly \(including any generic bounds\). If disabled, any type parameters will be `any`.                                                                                                                                                                                                                |
| `strictLiteralTypes`         | Whether object and array literals declared in the template will have their type inferred. If disabled, the type of such literals will be `any`. This flag is `true` when _either_ `fullTemplateTypeCheck` or `strictTemplates` is set to `true`.                                                                                                                              |

If you still have issues after troubleshooting with these flags, fall back to full mode by disabling `strictTemplates`.

If that doesn't work, an option of last resort is to turn off full mode entirely with `fullTemplateTypeCheck: false`.

A type-checking error that you cannot resolve with any of the recommended methods can be the result of a bug in the template type-checker itself.
If you get errors that require falling back to basic mode, it is likely to be such a bug.
If this happens, [file an issue](https://github.com/angular/angular/issues) so the team can address it.
-->

엄격 모드에서는 앞의 두 모드에서 나타나지 않던 템플릿 오류가 발생할 수 있습니다.
이러한 오류는 이전 도구가 발견하지 못한 실제 템플릿 타입 불일치를 나타내는 경우가 많습니다.
이 경우 오류 메시지에서 템플릿의 어느 부분에 문제가 있는지 명확하게 확인할 수 있습니다.

하지만 Angular 라이브러리의 타입 정의가 불완전하거나 잘못되었거나 다음과 같이 예상과 완전히 일치하지 않으면 잘못된 오류가 보고될 수도 있습니다.

- 라이브러리의 타입 정의가 잘못되었거나 불완전한 경우입니다.
  예를 들어 `strictNullChecks`를 고려하지 않고 작성해서 `null | undefined`가 빠져 있을 수 있습니다.
- 라이브러리의 입력 타입 범위가 너무 좁고 Angular가 이를 파악할 수 있는 적절한 메타데이터가 없는 경우입니다.
  주로 `<input disabled>`처럼 disabled 등의 일반적인 불리언 입력을 어트리뷰트로 사용할 때 발생합니다.

- DOM 이벤트에서 `$event.target`을 사용하는 경우입니다.
  이벤트 버블링 가능성 때문에 DOM 타입 정의의 `$event.target`은 예상한 타입과 다를 수 있습니다.

이렇게 잘못된 오류가 보고될 때는 다음 방법을 사용할 수 있습니다:

- 특정 위치에서 `$any()` 타입 변환 함수를 사용해서 표현식 일부를 타입 검사에서 제외합니다.
- 애플리케이션의 TypeScript 설정 파일 `tsconfig.json`에서 `strictTemplates: false`로 설정해서 엄격 검사를 모두 비활성화합니다.
- _엄격성 플래그_ 를 `false`로 설정해서 특정 타입 검사만 비활성화하고 다른 검사는 엄격하게 유지합니다.
- `strictTemplates`와 `strictNullChecks`를 함께 사용하려면 `strictNullInputTypes`로 입력 바인딩에 대해서만 엄격한 null 타입 검사를 제외할 수 있습니다.

별도 설명이 없다면 다음 옵션의 값은 `strictTemplates`와 같습니다(`strictTemplates`가 `true`이면 `true`이고 그 반대도 같습니다).

| 엄격성 플래그                | 효과                                                                                                                                                                                                                                                                                                             |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strictInputTypes`           | 바인딩 표현식을 `@Input()` 필드에 할당할 수 있는지 검사합니다. 디렉티브의 제네릭 타입 추론에도 영향을 줍니다.                                                                                                                                                                                                    |
| `strictInputAccessModifiers` | 바인딩 표현식을 `@Input()`이나 `input()`에 할당할 때 `private`/`protected`/`readonly` 등의 접근 제어자를 준수할지 결정합니다. 비활성화하면 입력의 접근 제어자를 무시하고 타입만 검사합니다. `strictTemplates`가 `true`여도 기본값은 `false`입니다. 참고: 이 검사는 입력에만 적용하며 출력에는 적용하지 않습니다. |
| `strictNullInputTypes`       | `strictInputTypes`에 따라 `@Input()` 바인딩을 검사할 때 `strictNullChecks`를 준수할지 결정합니다. `strictNullChecks`를 고려하지 않고 만든 라이브러리를 사용할 때 비활성화하면 도움이 될 수 있습니다.                                                                                                             |
| `strictAttributeTypes`       | 텍스트 어트리뷰트로 지정한 `@Input()` 바인딩을 검사할지 결정합니다. 예를 들어 `<input matInput disabled="true">`는 `disabled` 프로퍼티를 문자열 `'true'`로 설정하고, `<input matInput [disabled]="true">`는 불리언 `true`로 설정합니다.                                                                          |
| `strictSafeNavigationTypes`  | 안전한 탐색 연산의 반환 타입을 올바르게 추론할지 결정합니다. 예를 들어 `user?.name`의 타입을 `user`의 타입을 바탕으로 추론합니다. 비활성화하면 `user?.name`은 `any` 타입이 됩니다.                                                                                                                               |
| `strictDomLocalRefTypes`     | DOM 엘리먼트의 지역 참조가 올바른 타입을 가질지 결정합니다. 비활성화하면 `<input #ref>`의 `ref`는 `any` 타입이 됩니다.                                                                                                                                                                                           |
| `strictOutputEventTypes`     | 컴포넌트/디렉티브의 `@Output()`이나 애니메이션 이벤트 바인딩에서 `$event`가 올바른 타입을 가질지 결정합니다. 비활성화하면 `any`가 됩니다.                                                                                                                                                                        |
| `strictDomEventTypes`        | DOM 이벤트 바인딩에서 `$event`가 올바른 타입을 가질지 결정합니다. 비활성화하면 `any`가 됩니다.                                                                                                                                                                                                                   |
| `strictContextGenerics`      | 제네릭 제약을 포함한 제네릭 컴포넌트의 타입 매개변수를 올바르게 추론할지 결정합니다. 비활성화하면 모든 타입 매개변수가 `any`가 됩니다.                                                                                                                                                                           |
| `strictLiteralTypes`         | 템플릿에 선언된 객체 및 배열 리터럴의 타입을 추론할지 결정합니다. 비활성화하면 이러한 리터럴의 타입은 `any`가 됩니다. `fullTemplateTypeCheck`나 `strictTemplates` 중 _어느 하나라도_ `true`이면 이 플래그는 `true`입니다.                                                                                        |

이 플래그로 문제를 해결하지 못하면 `strictTemplates`를 비활성화해서 전체 모드로 돌아가세요.

그래도 해결되지 않으면 마지막 수단으로 `fullTemplateTypeCheck: false`를 설정해서 전체 모드도 완전히 끌 수 있습니다.

권장한 어떤 방법으로도 해결되지 않는 타입 검사 오류는 템플릿 타입 검사기 자체의 버그일 수 있습니다.
기본 모드로 돌아가야만 해결되는 오류라면 이러한 버그일 가능성이 높습니다.
이 경우 팀에서 해결할 수 있도록 [이슈를 등록](https://github.com/angular/angular/issues)해 주세요.

<!--
## Inputs and type-checking
-->

<a id="inputs-and-type-checking"></a>

## 입력과 타입 검사

<!--
The template type checker checks whether a binding expression's type is compatible with that of the corresponding directive input.
As an example, consider the following component:

```angular-ts
export interface User {
  name: string;
}

@Component({
  selector: 'user-detail',
  template: '{{ user.name }}',
})
export class UserDetailComponent {
  user = input.required<User>();
}
```

The `AppComponent` template uses this component as follows:

```angular-ts
@Component({
  selector: 'app-root',
  template: '<user-detail [user]="selectedUser"></user-detail>',
})
export class AppComponent {
  selectedUser: User | null = null;
}
```

Here, during type checking of the template for `AppComponent`, the `[user]="selectedUser"` binding corresponds with the `UserDetailComponent.user` input.
Therefore, Angular assigns the `selectedUser` property to `UserDetailComponent.user`, which would result in an error if their types were incompatible.
TypeScript checks the assignment according to its type system, obeying flags such as `strictNullChecks` as they are configured in the application.

Avoid run-time type errors by providing more specific in-template type requirements to the template type checker.
Make the input type requirements for your own directives as specific as possible by providing template-guard functions in the directive definition.
See [Improving template type checking for custom directives](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives) in this guide.
-->

템플릿 타입 검사기는 바인딩 표현식의 타입이 해당 디렉티브 입력의 타입과 호환되는지 확인합니다.
예를 들어 다음 컴포넌트를 살펴봅시다:

```angular-ts
export interface User {
  name: string;
}

@Component({
  selector: 'user-detail',
  template: '{{ user.name }}',
})
export class UserDetailComponent {
  user = input.required<User>();
}
```

`AppComponent` 템플릿은 이 컴포넌트를 다음과 같이 사용합니다:

```angular-ts
@Component({
  selector: 'app-root',
  template: '<user-detail [user]="selectedUser"></user-detail>',
})
export class AppComponent {
  selectedUser: User | null = null;
}
```

`AppComponent` 템플릿의 타입을 검사할 때 `[user]="selectedUser"` 바인딩은 `UserDetailComponent.user` 입력에 대응합니다.
따라서 Angular는 `selectedUser` 프로퍼티를 `UserDetailComponent.user`에 할당하며 타입이 호환되지 않으면 오류가 발생합니다.
TypeScript는 자체 타입 시스템으로 할당을 검사하며 애플리케이션에 설정된 `strictNullChecks` 등의 플래그를 따릅니다.

실행 중 타입 오류를 방지하려면 템플릿 타입 검사기에 템플릿 내부의 타입 요구사항을 더 구체적으로 제공하세요.
직접 작성한 디렉티브 정의에 템플릿 가드 함수를 제공해서 입력 타입 요구사항을 최대한 구체적으로 지정하세요.
이 가이드의 [커스텀 디렉티브의 템플릿 타입 검사 개선하기](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives)를 참고하세요.

<!--
### Strict null checks
-->

<a id="strict-null-checks"></a>

### 엄격한 null 검사

<!--
When you enable `strictTemplates` and the TypeScript flag `strictNullChecks`, typecheck errors might occur for certain situations that might not easily be avoided.
For example:

- A nullable value that is bound to a directive from a library which did not have `strictNullChecks` enabled.

  For a library compiled without `strictNullChecks`, its declaration files will not indicate whether a field can be `null` or not.
  For situations where the library handles `null` correctly, this is problematic, as the compiler will check a nullable value against the declaration files which omit the `null` type.
  As such, the compiler produces a type-check error because it adheres to `strictNullChecks`.

- Using the `async` pipe with an Observable which you know will emit synchronously.

  The `async` pipe currently assumes that the Observable it subscribes to can be asynchronous, which means that it's possible that there is no value available yet.
  In that case, it still has to return something —which is `null`.
  In other words, the return type of the `async` pipe includes `null`, which might result in errors in situations where the Observable is known to emit a non-nullable value synchronously.

There are two potential workarounds to the preceding issues:

- In the template, include the non-null assertion operator `!` at the end of a nullable expression, such as

```html
<user-detail [user]="user!"></user-detail>
```

In this example, the compiler disregards type incompatibilities in nullability, just as in TypeScript code.
In the case of the `async` pipe, notice that the expression needs to be wrapped in parentheses, as in

```html
<user-detail [user]="(user$ | async)!"></user-detail>
```

- Disable strict null checks in Angular templates completely.

  When `strictTemplates` is enabled, it is still possible to disable certain aspects of type checking.
  Setting the option `strictNullInputTypes` to `false` disables strict null checks within Angular templates.
  This flag applies for all components that are part of the application.
-->

`strictTemplates`와 TypeScript의 `strictNullChecks` 플래그를 활성화하면 쉽게 피하기 어려운 상황에서 타입 검사 오류가 발생할 수 있습니다.
예를 들면 다음과 같습니다:

- `strictNullChecks`를 활성화하지 않은 라이브러리의 디렉티브에 null일 수 있는 값을 바인딩하는 경우입니다.

  `strictNullChecks` 없이 컴파일한 라이브러리의 선언 파일에는 필드가 `null`일 수 있는지 표시되지 않습니다.
  라이브러리가 `null`을 올바르게 처리하더라도, 컴파일러는 `null` 타입이 빠진 선언 파일을 기준으로 null일 수 있는 값을 검사하므로 문제가 됩니다.
  컴파일러는 `strictNullChecks`를 준수하기 때문에 타입 검사 오류를 발생시킵니다.

- 값을 동기적으로 방출한다는 것을 알고 있는 Observable에 `async` 파이프를 사용하는 경우입니다.

  현재 `async` 파이프는 구독하는 Observable이 비동기일 수 있다고 가정하므로 아직 사용할 수 있는 값이 없을 가능성을 고려합니다.
  이 경우에도 무언가를 반환해야 하며 그 값이 `null`입니다.
  즉, `async` 파이프의 반환 타입에는 `null`이 포함됩니다.
  따라서 Observable이 null이 아닌 값을 동기적으로 방출한다고 알고 있더라도 오류가 발생할 수 있습니다.

위 문제에는 두 가지 우회 방법이 있습니다:

- 템플릿에서 null일 수 있는 표현식 끝에 null 아님 단언 연산자 `!`를 추가합니다.
  예를 들면 다음과 같습니다.

```html
<user-detail [user]="user!"></user-detail>
```

이 예제에서 컴파일러는 TypeScript 코드에서와 마찬가지로 null 허용 여부에 따른 타입 불일치를 무시합니다.
`async` 파이프를 사용하는 경우에는 다음과 같이 표현식을 괄호로 감싸야 합니다.

```html
<user-detail [user]="(user$ | async)!"></user-detail>
```

- Angular 템플릿의 엄격한 null 검사를 완전히 비활성화합니다.

  `strictTemplates`가 활성화되어 있어도 타입 검사의 특정 부분을 비활성화할 수 있습니다.
  `strictNullInputTypes` 옵션을 `false`로 설정하면 Angular 템플릿에서 엄격한 null 검사를 비활성화합니다.
  이 플래그는 애플리케이션에 포함된 모든 컴포넌트에 적용됩니다.

<!--
### Advice for library authors
-->

<a id="advice-for-library-authors"></a>

### 라이브러리 작성자를 위한 권장사항

<!--
As a library author, you can take several measures to provide an optimal experience for your users.
First, enabling `strictNullChecks` and including `null` in an input's type, as appropriate, communicates to your consumers whether they can provide a nullable value or not.
Additionally, it is possible to provide type hints that are specific to the template type checker.
See [Improving template type checking for custom directives](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives), and [Input setter coercion](#input-setter-coercion).
-->

라이브러리 작성자는 사용자에게 좋은 경험을 제공하기 위해 몇 가지 조치를 할 수 있습니다.
먼저 `strictNullChecks`를 활성화하고 필요한 입력 타입에 `null`을 포함하면 사용자가 null일 수 있는 값을 전달해도 되는지 알 수 있습니다.
또한 템플릿 타입 검사기에 특화된 타입 힌트를 제공할 수 있습니다.
[커스텀 디렉티브의 템플릿 타입 검사 개선하기](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives)와 [입력 세터의 타입 변환](#input-setter-coercion)을 참고하세요.

<!--
## Input setter coercion
-->

<a id="input-setter-coercion"></a>

## 입력 세터의 타입 변환

<!--
Occasionally it is desirable for the `input()` property of a directive or component to alter the value bound to it, typically using a `transform` function for the input.
As an example, consider this custom button component:

Consider the following directive:

```angular-ts
@Component({
  selector: 'submit-button',
  template: `
    <div class="wrapper">
      <button [disabled]="disabled">Submit</button>
    </div>
  `,
})
class SubmitButton {
  disabled = input.required({transform: booleanAttribute});
}
```

Here, the `disabled` input of the component is being passed on to the `<button>` in the template.
All of this works as expected, as long as a `boolean` value is bound to the input.
But, suppose a consumer uses this input in the template as an attribute:

```html
<submit-button disabled></submit-button>
```

This has the same effect as the binding:

```html
<submit-button [disabled]="''"></submit-button>
```

At runtime, the input will be set to the empty string, which is not a `boolean` value.
Angular component libraries that deal with this problem often "coerce" the value into the right type in the setter:

```ts

set disabled(value: boolean) {
  this._disabled = (value === '') || value;
}

```

It would be ideal to change the type of `value` here, from `boolean` to `boolean|''`, to match the set of values which are actually accepted by the setter.
TypeScript prior to version 4.3 requires that both the getter and setter have the same type, so if the getter should return a `boolean` then the setter is stuck with the narrower type.

If the consumer has Angular's strictest type checking for templates enabled, this creates a problem: the empty string \(`''`\) is not actually assignable to the `disabled` field, which creates a type error when the attribute form is used.

As a workaround for this problem, Angular supports checking a wider, more permissive type for `@Input()` than is declared for the input field itself.
Enable this by adding a static property with the `ngAcceptInputType_` prefix to the component class:

```ts
class SubmitButton {
  private _disabled: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value === '' || value;
  }

  static ngAcceptInputType_disabled: boolean | '';
}
```

Since TypeScript 4.3, the setter could have been declared to accept `boolean|''` as type, making the input setter coercion field obsolete.
As such, input setters coercion fields have been deprecated.

This field does not need to have a value.
Its existence communicates to the Angular type checker that the `disabled` input should be considered as accepting bindings that match the type `boolean|''`.
The suffix should be the `@Input` _field_ name.

Care should be taken that if an `ngAcceptInputType_` override is present for a given input, then the setter should be able to handle any values of the overridden type.
-->

때로는 디렉티브나 컴포넌트의 `input()` 프로퍼티가 바인딩된 값을 변환하는 것이 좋습니다.
일반적으로 입력의 `transform` 함수를 사용합니다.
예를 들어 다음 커스텀 버튼 컴포넌트를 살펴봅시다:

다음 디렉티브를 살펴보세요:

```angular-ts
@Component({
  selector: 'submit-button',
  template: `
    <div class="wrapper">
      <button [disabled]="disabled">Submit</button>
    </div>
  `,
})
class SubmitButton {
  disabled = input.required({transform: booleanAttribute});
}
```

여기서 컴포넌트의 `disabled` 입력은 템플릿의 `<button>`으로 전달됩니다.
입력에 `boolean` 값을 바인딩하면 모두 예상대로 동작합니다.
하지만 사용자가 이 입력을 템플릿에서 어트리뷰트로 사용한다고 가정해 봅시다:

```html
<submit-button disabled></submit-button>
```

이는 다음 바인딩과 같은 효과를 냅니다:

```html
<submit-button [disabled]="''"></submit-button>
```

실행 시점에 입력은 `boolean` 값이 아닌 빈 문자열로 설정됩니다.
이 문제를 처리하는 Angular 컴포넌트 라이브러리는 세터에서 값을 올바른 타입으로 "강제 변환"하는 경우가 많습니다:

```ts

set disabled(value: boolean) {
  this._disabled = (value === '') || value;
}

```

세터가 실제로 받아들이는 값의 범위에 맞도록 `value` 타입을 `boolean`에서 `boolean|''`로 변경하는 것이 이상적입니다.
TypeScript 4.3 이전에는 게터와 세터의 타입이 같아야 했으므로 게터가 `boolean`을 반환해야 한다면 세터도 더 좁은 타입을 사용할 수밖에 없습니다.

사용자가 Angular의 가장 엄격한 템플릿 타입 검사를 활성화하면 문제가 됩니다.
빈 문자열(`''`)은 실제로 `disabled` 필드에 할당할 수 없기 때문에 어트리뷰트 형식을 사용할 때 타입 오류가 발생합니다.

이를 해결하기 위해 Angular는 입력 필드 자체에 선언된 것보다 더 넓고 허용 범위가 큰 타입으로 `@Input()`을 검사하는 기능을 지원합니다.
컴포넌트 클래스에 `ngAcceptInputType_` 접두사가 붙은 정적 프로퍼티를 추가해서 활성화할 수 있습니다:

```ts
class SubmitButton {
  private _disabled: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value === '' || value;
  }

  static ngAcceptInputType_disabled: boolean | '';
}
```

TypeScript 4.3부터는 세터가 `boolean|''` 타입을 받도록 선언할 수 있으므로 입력 세터 타입 변환 필드가 필요하지 않습니다.
따라서 입력 세터 타입 변환 필드는 사용 중단되었습니다.

이 필드에 값을 지정할 필요는 없습니다.
필드가 존재하면 Angular 타입 검사기는 `disabled` 입력이 `boolean|''` 타입에 맞는 바인딩을 받을 수 있다고 판단합니다.
접미사는 `@Input` _필드_ 이름이어야 합니다.

특정 입력에 `ngAcceptInputType_` 재정의가 있다면 세터가 재정의된 타입의 모든 값을 처리할 수 있어야 한다는 점에 주의하세요.

<!--
## Disabling type checking using `$any()`
-->

<a id="disabling-type-checking-using-any"></a>

## `$any()`로 타입 검사 비활성화하기

<!--
Disable checking of a binding expression by surrounding the expression in a call to the `$any()` cast pseudo-function.
The compiler treats it as a cast to the `any` type just like in TypeScript when a `<any>` or `as any` cast is used.

In the following example, casting `person` to the `any` type suppresses the error `Property address does not exist`.

```angular-ts
@Component({
  selector: 'my-component',
  template: '{{$any(person).address.street}}',
})
class MyComponent {
  person?: Person;
}
```
-->

바인딩 표현식을 `$any()` 타입 변환 의사 함수 호출로 감싸면 해당 표현식의 검사를 비활성화할 수 있습니다.
컴파일러는 TypeScript에서 `<any>`나 `as any`를 사용하는 것처럼 이를 `any` 타입으로의 변환으로 처리합니다.

다음 예제에서는 `person`을 `any` 타입으로 변환해서 `Property address does not exist` 오류를 억제합니다.

```angular-ts
@Component({
  selector: 'my-component',
  template: '{{$any(person).address.street}}',
})
class MyComponent {
  person?: Person;
}
```
