<!--
# Angular coding style guide
-->

<a id="angular-coding-style-guide"></a>

# Angular 코딩 스타일 가이드

<!--
## Introduction
-->

<a id="introduction"></a>

## 소개

<!--
This guide covers a range of style conventions for Angular application code. These recommendations
are not required for Angular to work, but instead establish a set of coding practices that promote
consistency across the Angular ecosystem. A consistent set of practices makes it easier to share
code and move between projects.

This guide does _not_ cover TypeScript or general coding practices unrelated to Angular. For
TypeScript, check
out [Google's TypeScript style guide](https://google.github.io/styleguide/tsguide.html).
-->

이 가이드는 Angular 애플리케이션 코드에 적용할 여러 스타일 규칙을 설명합니다.
이 권장 사항은 Angular가 동작하기 위한 필수 조건이 아니라, Angular 생태계 전반의 일관성을 높이기 위한 코딩 관례입니다.
일관된 관례가 있으면 코드를 공유하고 프로젝트 사이를 이동하기 쉬워집니다.

이 가이드는 Angular와 관련 없는 TypeScript나 일반적인 코딩 관례는 다루지 _않습니다_.
TypeScript에 관해서는 [Google TypeScript 스타일 가이드](https://google.github.io/styleguide/tsguide.html)를 확인하세요.

<!--
### When in doubt, prefer consistency
-->

<a id="when-in-doubt-prefer-consistency"></a>

### 판단하기 어렵다면 일관성을 우선하세요

<!--
Whenever you encounter a situation in which these rules contradict the style of a particular file,
prioritize maintaining consistency within a file. Mixing different style conventions in a single
file creates more confusion than diverging from the recommendations in this guide.
-->

이 규칙이 특정 파일의 스타일과 충돌한다면 해당 파일 내의 일관성을 유지하는 데 우선순위를 두세요.
한 파일 안에 여러 스타일 규칙을 섞는 것은 이 가이드의 권장 사항에서 벗어나는 것보다 혼란을 더 크게 만듭니다.

<!--
## Naming
-->

<a id="naming"></a>

## 이름 짓기

<!--
### Separate words in file names with hyphens
-->

<a id="separate-words-in-file-names-with-hyphens"></a>

### 파일 이름의 단어는 하이픈으로 구분하세요

<!--
Separate words within a file name with hyphens (`-`). For example, a component named `UserProfile`
has a file name `user-profile.ts`.
-->

파일 이름의 단어는 하이픈(`-`)으로 구분하세요.
예를 들어 `UserProfile`이라는 컴포넌트의 파일 이름은 `user-profile.ts`입니다.

<!--
### Use the same name for a file's tests with `.spec` at the end
-->

<a id="use-the-same-name-for-a-files-tests-with-spec-at-the-end"></a>

### 테스트 파일에는 같은 이름을 사용하고 끝에 `.spec`을 붙이세요

<!--
For unit tests, end file names with `.spec.ts`. For example, the unit test file for
the `UserProfile` component has the file name `user-profile.spec.ts`.
-->

단위 테스트의 파일 이름은 `.spec.ts`로 끝나게 하세요.
예를 들어 `UserProfile` 컴포넌트의 단위 테스트 파일 이름은 `user-profile.spec.ts`입니다.

<!--
### Match file names to the TypeScript identifier within
-->

<a id="match-file-names-to-the-typescript-identifier-within"></a>

### 파일 이름은 내부 TypeScript 식별자와 맞추세요

<!--
File names should generally describe the contents of the code in the file. When the file contains a
TypeScript class, the file name should reflect that class name. For example, a file containing a
component named `UserProfile` has the name `user-profile.ts`.

If the file contains more than one primary namable identifier, choose a name that describes the
common theme to the code within. If the code in a file does not fit within a common theme or feature
area, consider breaking the code up into different files. Avoid overly generic file names
like `helpers.ts`, `utils.ts`, or `common.ts`.
-->

파일 이름은 일반적으로 그 안에 있는 코드의 내용을 설명해야 합니다.
파일에 TypeScript 클래스가 있다면 파일 이름에 클래스 이름을 반영하세요.
예를 들어 `UserProfile` 컴포넌트가 있는 파일의 이름은 `user-profile.ts`입니다.

파일에 이름을 붙일 수 있는 주요 식별자가 여러 개 있다면 코드의 공통 주제를 설명하는 이름을 선택하세요.
파일의 코드가 하나의 공통 주제나 기능 영역에 속하지 않는다면 여러 파일로 나누는 것을 고려하세요.
`helpers.ts`, `utils.ts`, `common.ts`처럼 지나치게 포괄적인 파일 이름은 피하세요.

<!--
### Use the same file name for a component's TypeScript, template, and styles
-->

<a id="use-the-same-file-name-for-a-components-typescript-template-and-styles"></a>

### 컴포넌트의 TypeScript, 템플릿, 스타일 파일은 같은 이름을 사용하세요

<!--
Components typically consist of one TypeScript file, one template file, and one style file. These
files should share the same name with different file extensions. For example, a `UserProfile`
component can have the files `user-profile.ts`, `user-profile.html`, and `user-profile.css`.

If a component has more than one style file, append the name with additional words that describe the
styles specific to that file. For example, `UserProfile` might have style
files `user-profile-settings.css` and `user-profile-subscription.css`.
-->

컴포넌트는 보통 TypeScript 파일 하나, 템플릿 파일 하나, 스타일 파일 하나로 구성됩니다.
이 파일들은 이름을 같게 하고 확장자만 다르게 해야 합니다.
예를 들어 `UserProfile` 컴포넌트는 `user-profile.ts`, `user-profile.html`, `user-profile.css` 파일로 구성할 수 있습니다.

컴포넌트에 스타일 파일이 여러 개라면 각 파일에 고유한 스타일을 설명하는 단어를 이름에 덧붙이세요.
예를 들어 `UserProfile`에는 `user-profile-settings.css`와 `user-profile-subscription.css` 스타일 파일이 있을 수 있습니다.

<!--
## Project structure
-->

<a id="project-structure"></a>

## 프로젝트 구조

<!--
### All the application's code goes in a directory named `src`
-->

<a id="all-the-applications-code-goes-in-a-directory-named-src"></a>

### 애플리케이션 코드는 모두 `src` 디렉터리에 두세요

<!--
All of your Angular UI code (TypeScript, HTML, and styles) should live inside a directory
named `src`. Code that's not related to UI, such as configuration files or scripts, should live
outside the `src` directory.

This keeps the root application directory consistent between different Angular projects and creates
a clear separation between UI code and other code in your project.
-->

Angular UI 코드(TypeScript, HTML, 스타일)는 모두 `src`라는 디렉터리 안에 두어야 합니다.
설정 파일이나 스크립트처럼 UI와 관련 없는 코드는 `src` 디렉터리 바깥에 두세요.

이렇게 하면 Angular 프로젝트마다 루트 디렉터리의 구성이 일관되고, 프로젝트의 UI 코드와 다른 코드를 명확하게 구분할 수 있습니다.

<!--
### Bootstrap your application in a file named `main.ts` directly inside `src`
-->

<a id="bootstrap-your-application-in-a-file-named-maints-directly-inside-src"></a>

### `src` 바로 아래의 `main.ts` 파일에서 애플리케이션을 부트스트랩하세요

<!--
The code to start up, or **bootstrap**, an Angular application should always live in a file
named `main.ts`. This represents the primary entry point to the application.
-->

Angular 애플리케이션을 시작하는, 즉 **부트스트랩**하는 코드는 항상 `main.ts`라는 파일에 두어야 합니다.
이 파일이 애플리케이션의 주요 진입점입니다.

<!--
### Group closely related files together in the same directory
-->

<a id="group-closely-related-files-together-in-the-same-directory"></a>

### 밀접하게 관련된 파일은 같은 디렉터리에 모으세요

<!--
Angular components consist of a TypeScript file and, optionally, a template and one or more style
files. You should group these together in the same directory.

Unit tests should live in the same directory as the code-under-test. Avoid collecting unrelated
tests into a single `tests` directory.
-->

Angular 컴포넌트는 TypeScript 파일과 선택적인 템플릿 파일, 하나 이상의 스타일 파일로 구성됩니다.
이 파일들은 같은 디렉터리에 모아야 합니다.

단위 테스트는 테스트 대상 코드와 같은 디렉터리에 두세요.
서로 관련 없는 테스트를 하나의 `tests` 디렉터리에 모으는 것은 피하세요.

<!--
### Organize your project by feature areas
-->

<a id="organize-your-project-by-feature-areas"></a>

### 프로젝트는 기능 영역별로 구성하세요

<!--
Organize your project into subdirectories based on the features of your application or common themes
to the code in those directories. For example, the project structure for a movie theater site,
MovieReel, might look like this:

```
src/
├─ movie-reel/
│ ├─ show-times/
│ │ ├─ film-calendar/
│ │ ├─ film-details/
│ ├─ reserve-tickets/
│ │ ├─ payment-info/
│ │ ├─ purchase-confirmation/
```

Avoid creating subdirectories based on the type of code that lives in those directories. For
example, avoid creating directories like `components`, `directives`, and `services`.

Avoid putting so many files into one directory that it becomes hard to read or navigate. As the
number of files in a directory grows, consider splitting further into additional sub-directories.
-->

애플리케이션의 기능이나 코드의 공통 주제를 기준으로 프로젝트를 하위 디렉터리로 나누세요.
예를 들어 영화관 사이트 MovieReel의 프로젝트 구조는 다음과 같을 수 있습니다:

```
src/
├─ movie-reel/
│ ├─ show-times/
│ │ ├─ film-calendar/
│ │ ├─ film-details/
│ ├─ reserve-tickets/
│ │ ├─ payment-info/
│ │ ├─ purchase-confirmation/
```

디렉터리에 들어가는 코드의 종류를 기준으로 하위 디렉터리를 만들지 마세요.
예를 들어 `components`, `directives`, `services` 같은 디렉터리는 피하세요.

한 디렉터리에 파일을 너무 많이 넣어 읽거나 탐색하기 어려워지지 않도록 하세요.
파일 수가 늘어나면 하위 디렉터리로 더 나누는 것을 고려하세요.

<!--
### One concept per file
-->

<a id="one-concept-per-file"></a>

### 파일 하나에는 개념 하나를 담으세요

<!--
Prefer focusing source files on a single _concept_. For Angular classes specifically, this usually
means one component, directive, or service per file. However, it's okay if a file contains more than
one component or directive if your classes are relatively small and they tie together as part of a
single concept.

When in doubt, go with the approach that leads to smaller files.
-->

소스 파일은 하나의 _개념_ 에 집중하는 것이 좋습니다.
Angular 클래스에서는 보통 파일마다 컴포넌트, 디렉티브, 서비스 중 하나를 두는 것을 뜻합니다.
다만 클래스가 비교적 작고 하나의 개념으로 긴밀히 연결된다면 한 파일에 여러 컴포넌트나 디렉티브를 두어도 괜찮습니다.

판단하기 어렵다면 파일이 더 작아지는 방식을 선택하세요.

<!--
## Dependency injection
-->

<a id="dependency-injection"></a>

## 의존성 주입

<!--
### Prefer the `inject` function over constructor parameter injection
-->

<a id="prefer-the-inject-function-over-constructor-parameter-injection"></a>

### 생성자 매개변수 주입보다 `inject` 함수를 사용하세요

<!--
Prefer using the [`inject`](/api/core/inject) function over injecting constructor parameters. The [`inject`](/api/core/inject) function works the same way as constructor parameter injection, but offers several style advantages:

- [`inject`](/api/core/inject) is generally more readable, especially when a class injects many dependencies.
- It's more syntactically straightforward to add comments to injected dependencies
- [`inject`](/api/core/inject) offers better type inference.
- When targeting ES2022+ with [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields), you can avoid separating field declaration and initialization when fields read on injected dependencies.

[You can refactor existing code to `inject` with an automatic tool](reference/migrations/inject-function).
-->

생성자 매개변수로 주입하는 것보다 [`inject`](/api/core/inject) 함수를 사용하는 것이 좋습니다.
[`inject`](/api/core/inject) 함수는 생성자 매개변수 주입과 같은 방식으로 동작하지만, 스타일 측면에서 다음과 같은 이점이 있습니다:

- [`inject`](/api/core/inject)는 대체로 읽기 쉬우며, 특히 클래스가 많은 의존성을 주입할 때 유리합니다.
- 주입한 의존성에 주석을 추가하는 문법이 더 간단합니다.
- [`inject`](/api/core/inject)는 타입 추론이 더 좋습니다.
- ES2022 이상을 대상으로 [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields)를 사용할 때, 필드가 주입된 의존성을 참조하더라도 필드 선언과 초기화를 분리하지 않아도 됩니다.

[자동화 도구로 기존 코드를 `inject` 방식으로 리팩터링할 수 있습니다](reference/migrations/inject-function).

<!--
## Components and directives
-->

<a id="components-and-directives"></a>

## 컴포넌트와 디렉티브

<!--
### Choosing component selectors
-->

<a id="choosing-component-selectors"></a>

### 컴포넌트 셀렉터 선택하기

<!--
See
the [Components guide for details on choosing component selectors](guide/components/selectors#choosing-a-selector).
-->

[컴포넌트 가이드의 셀렉터 선택하기](guide/components/selectors#choosing-a-selector)를 참고하세요.

<!--
### Naming component and directive members
-->

<a id="naming-component-and-directive-members"></a>

### 컴포넌트와 디렉티브 멤버의 이름 짓기

<!--
See the Components guide for details
on [naming input properties](guide/components/inputs#choosing-input-names)
and [naming output properties](guide/components/outputs#choosing-event-names).
-->

컴포넌트 가이드의 [입력 프로퍼티 이름 짓기](guide/components/inputs#choosing-input-names)와 [출력 프로퍼티 이름 짓기](guide/components/outputs#choosing-event-names)를 참고하세요.

<!--
### Choosing directive selectors
-->

<a id="choosing-directive-selectors"></a>

### 디렉티브 셀렉터 선택하기

<!--
Directives should use the
same [application-specific prefix](guide/components/selectors#selector-prefixes)
as your components.

When using an attribute selector for a directive, use a camelCase attribute name. For example, if
your application is named "MovieReel" and you build a directive that adds a tooltip to an element,
you might use the selector `[mrTooltip]`.
-->

디렉티브는 컴포넌트와 같은 [애플리케이션 고유의 접두사](guide/components/selectors#selector-prefixes)를 사용해야 합니다.

디렉티브에 어트리뷰트 셀렉터를 사용한다면 어트리뷰트 이름에 카멜 표기법을 사용하세요.
예를 들어 애플리케이션 이름이 "MovieReel"이고 요소에 툴팁을 추가하는 디렉티브를 만든다면 `[mrTooltip]` 셀렉터를 사용할 수 있습니다.

<!--
### Group Angular-specific properties before methods
-->

<a id="group-angular-specific-properties-before-methods"></a>

### Angular 고유의 프로퍼티는 메서드 앞에 모으세요

<!--
Components and directives should group Angular-specific properties together, typically near the top
of the class declaration. This includes injected dependencies, inputs, outputs, and queries. Define
these and other properties before the class's methods.

This practice makes it easier to find the class's template APIs and dependencies.
-->

컴포넌트와 디렉티브의 Angular 고유 프로퍼티는 보통 클래스 선언의 윗부분에 모아두어야 합니다.
주입한 의존성, 입력, 출력, 쿼리가 여기에 해당합니다.
이러한 프로퍼티와 다른 프로퍼티는 클래스 메서드보다 앞에 정의하세요.

이렇게 하면 클래스의 템플릿 API와 의존성을 쉽게 찾을 수 있습니다.

<!--
### Keep components and directives focused on presentation
-->

<a id="keep-components-and-directives-focused-on-presentation"></a>

### 컴포넌트와 디렉티브는 화면 표현에 집중하도록 하세요

<!--
Code inside your components and directives should generally relate to the UI shown on the page. For
code that makes sense on its own, decoupled from the UI, prefer refactoring to other files. For
example, you can factor form validation rules or data transformations into separate functions or
classes.
-->

컴포넌트와 디렉티브 내부의 코드는 대체로 페이지에 표시되는 UI와 관련되어야 합니다.
UI와 분리해도 독립적으로 의미가 있는 코드는 다른 파일로 옮기는 것이 좋습니다.
예를 들어 폼 유효성 검사 규칙이나 데이터 변환을 별도의 함수나 클래스로 분리할 수 있습니다.

<!--
### Avoid overly complex logic in templates
-->

<a id="avoid-overly-complex-logic-in-templates"></a>

### 템플릿에 지나치게 복잡한 로직을 넣지 마세요

<!--
Angular templates are designed to
accommodate [JavaScript-like expressions](guide/templates/expression-syntax).
You should take advantage of these expressions to capture relatively straightforward logic directly
in template expressions.

When the code in a template gets too complex, though, refactor logic into the TypeScript code (typically with a [computed](guide/signals#computed-signals)).

There's no one hard-and-fast rule that determines what constitutes "complex". Use your best
judgement.
-->

Angular 템플릿은 [JavaScript와 유사한 표현식](guide/templates/expression-syntax)을 사용할 수 있도록 설계되었습니다.
비교적 간단한 로직은 이러한 템플릿 표현식에 직접 작성하면 됩니다.

하지만 템플릿 코드가 너무 복잡해지면 로직을 TypeScript 코드로 옮기세요(보통 [computed](guide/signals#computed-signals)를 사용합니다).

어느 정도가 "복잡한지"를 정하는 절대적인 기준은 없습니다.
상황에 맞게 판단하세요.

<!--
### Use `protected` on class members that are only used by a component's template
-->

<a id="use-protected-on-class-members-that-are-only-used-by-a-components-template"></a>

### 컴포넌트 템플릿에서만 사용하는 클래스 멤버에는 `protected`를 사용하세요

<!--
A component class's public members intrinsically define a public API that's accessible via
dependency injection and [queries](guide/components/queries). Prefer `protected`
access for any members that are meant to be read from the component's template.

```ts
@Component({
  ...,
  template: `<p>{{ fullName() }}</p>`,
})
export class UserProfile {
  firstName = input();
  lastName = input();

// `fullName` is not part of the component's public API, but is used in the template.
  protected fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}
```
-->

컴포넌트 클래스의 공개 멤버는 의존성 주입과 [쿼리](guide/components/queries)로 접근할 수 있는 공개 API를 구성합니다.
컴포넌트 템플릿에서 읽는 용도의 멤버에는 `protected` 접근 제한자를 사용하는 것이 좋습니다.

```ts
@Component({
  ...,
  template: `<p>{{ fullName() }}</p>`,
})
export class UserProfile {
  firstName = input();
  lastName = input();

// `fullName`은 컴포넌트의 공개 API가 아니며 템플릿에서 사용합니다.
  protected fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}
```

<!--
### Use `readonly` for properties that shouldn't change
-->

<a id="use-readonly-for-properties-that-shouldnt-change"></a>

### 변경하면 안 되는 프로퍼티에는 `readonly`를 사용하세요

<!--
Mark component and directive properties initialized by Angular as `readonly`. This includes
properties initialized by `input`, `model`, `output`, and queries. The readonly access modifier
ensures that the value set by Angular is not overwritten.

```ts
@Component(/* ... */)
export class UserProfile {
  readonly userId = input();
  readonly userSaved = output();
  readonly userName = model();
}
```

For components and directives that use the decorator-based `@Input`, `@Output`, and query APIs, this
advice applies to output properties and queries, but not input properties.

```ts
@Component(/* ... */)
export class UserProfile {
  @Output() readonly userSaved = new EventEmitter<void>();
  @ViewChildren(PaymentMethod) readonly paymentMethods?: QueryList<PaymentMethod>;
}
```
-->

Angular가 초기화하는 컴포넌트와 디렉티브 프로퍼티는 `readonly`로 표시하세요.
`input`, `model`, `output`, 쿼리로 초기화하는 프로퍼티가 여기에 해당합니다.
readonly 접근 제한자는 Angular가 설정한 값을 덮어쓰지 못하도록 합니다.

```ts
@Component(/* ... */)
export class UserProfile {
  readonly userId = input();
  readonly userSaved = output();
  readonly userName = model();
}
```

데코레이터 기반의 `@Input`, `@Output`, 쿼리 API를 사용하는 컴포넌트와 디렉티브에서는 이 지침이 출력 프로퍼티와 쿼리에 적용되지만 입력 프로퍼티에는 적용되지 않습니다.

```ts
@Component(/* ... */)
export class UserProfile {
  @Output() readonly userSaved = new EventEmitter<void>();
  @ViewChildren(PaymentMethod) readonly paymentMethods?: QueryList<PaymentMethod>;
}
```

<!--
### Prefer `class` and `style` over `ngClass` and `ngStyle`
-->

<a id="prefer-class-and-style-over-ngclass-and-ngstyle"></a>

### `ngClass`와 `ngStyle`보다 `class`와 `style`을 사용하세요

<!--
Prefer `class` and `style` bindings over using the [`NgClass`](/api/common/NgClass) and [`NgStyle`](/api/common/NgStyle) directives.

```html {prefer}
<div [class.admin]="isAdmin" [class.dense]="density === 'high'">
  <div [style.color]="textColor" [style.background-color]="backgroundColor">
    <!- OR ->
    <div [class]="{admin: isAdmin, dense: density === 'high'}">
      <div [style]="{'color': textColor, 'background-color': backgroundColor}"></div>
    </div>
  </div>
</div>
```

```html {avoid}
<div [ngClass]="{admin: isAdmin, dense: density === 'high'}">
  <div [ngStyle]="{'color': textColor, 'background-color': backgroundColor}"></div>
</div>
```

Both `class` and `style` bindings use a more straightforward syntax that aligns closely with
standard HTML attributes. This makes your templates easier to read and understand, especially for
developers familiar with basic HTML.

Additionally, the `NgClass` and `NgStyle` directives incur an additional performance cost compared
to the built-in `class` and `style` binding syntax.

For more details, refer to the [bindings guide](/guide/templates/binding#css-class-and-style-property-bindings)
-->

[`NgClass`](/api/common/NgClass)와 [`NgStyle`](/api/common/NgStyle) 디렉티브보다 `class`와 `style` 바인딩을 사용하는 것이 좋습니다.

```html {prefer}
<div [class.admin]="isAdmin" [class.dense]="density === 'high'">
  <div [style.color]="textColor" [style.background-color]="backgroundColor">
    <!-- 또는 -->
    <div [class]="{admin: isAdmin, dense: density === 'high'}">
      <div [style]="{'color': textColor, 'background-color': backgroundColor}"></div>
    </div>
  </div>
</div>
```

```html {avoid}
<div [ngClass]="{admin: isAdmin, dense: density === 'high'}">
  <div [ngStyle]="{'color': textColor, 'background-color': backgroundColor}"></div>
</div>
```

`class`와 `style` 바인딩은 모두 표준 HTML 어트리뷰트에 가까운 간단한 문법을 사용합니다.
특히 기본 HTML에 익숙한 개발자가 템플릿을 읽고 이해하기 쉽습니다.

또한 `NgClass`와 `NgStyle` 디렉티브는 내장된 `class`, `style` 바인딩 문법보다 추가 성능 비용이 발생합니다.

자세한 내용은 [바인딩 가이드](/guide/templates/binding#css-class-and-style-property-bindings)를 참고하세요.

<!--
### Name event handlers for what they _do_, not for the triggering event
-->

<a id="name-event-handlers-for-what-they-do-not-for-the-triggering-event"></a>

### 이벤트 핸들러의 이름은 이벤트가 아니라 _수행하는 동작_ 을 나타내도록 지으세요

<!--
Prefer naming event handlers for the action they perform rather than for the triggering event:

```html {prefer}
<button (click)="saveUserData()">Save</button>
```

```html {avoid}
<button (click)="handleClick()">Save</button>
```

Using meaningful names like this makes it easier to tell what an event does from reading the
template.

For keyboard events, you can use Angular's key event modifiers with specific handler names:

```html
<textarea (keydown.control.enter)="commitNotes()" (keydown.control.space)="showSuggestions()">
```

Sometimes, event handling logic is especially long or complex, making it impractical to declare a
single well-named handler. In these cases, it's fine to fall back to a name like 'handleKeydown' and
then delegate to more specific behaviors based on the event details:

```ts
@Component(/* ... */)
class RichText {
  handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey) {
      if (event.key === 'B') {
        this.activateBold();
      } else if (event.key === 'I') {
        this.activateItalic();
      }
      // ...
    }
  }
}
```
-->

이벤트 핸들러의 이름은 실행을 유발한 이벤트보다 수행하는 동작을 나타내도록 짓는 것이 좋습니다:

```html {prefer}
<button (click)="saveUserData()">Save</button>
```

```html {avoid}
<button (click)="handleClick()">Save</button>
```

이처럼 의미 있는 이름을 사용하면 템플릿만 읽어도 이벤트가 어떤 동작을 하는지 쉽게 알 수 있습니다.

키보드 이벤트에서는 구체적인 핸들러 이름과 Angular의 키 이벤트 수식어를 함께 사용할 수 있습니다:

```html
<textarea (keydown.control.enter)="commitNotes()" (keydown.control.space)="showSuggestions()">
```

이벤트 처리 로직이 매우 길거나 복잡하면 적절한 이름의 핸들러 하나로 선언하기 어려울 수 있습니다.
이 경우에는 'handleKeydown' 같은 이름을 사용하고 이벤트 세부 정보에 따라 더 구체적인 동작으로 위임해도 괜찮습니다:

```ts
@Component(/* ... */)
class RichText {
  handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey) {
      if (event.key === 'B') {
        this.activateBold();
      } else if (event.key === 'I') {
        this.activateItalic();
      }
      // ...
    }
  }
}
```

<!--
### Keep lifecycle methods simple
-->

<a id="keep-lifecycle-methods-simple"></a>

### 생명주기 메서드는 간단하게 유지하세요

<!--
Avoid putting long or complex logic inside lifecycle hooks like `ngOnInit`. Instead, prefer creating
well-named methods to contain that logic and then _call those methods_ in your lifecycle hooks.
Lifecycle hook names describe _when_ they run, meaning that the code inside doesn't have a
meaningful name that describes what the code inside is doing.

```ts {prefer}
ngOnInit() {
  this.startLogging();
  this.runBackgroundTask();
}
```

```ts {avoid}
ngOnInit() {
  this.logger.setMode('info');
  this.logger.monitorErrors();
  // ...and all the rest of the code that would be unrolled from these methods.
}
```
-->

`ngOnInit` 같은 생명주기 후킹 메서드에 길고 복잡한 로직을 넣지 마세요.
대신 로직을 설명하는 이름의 메서드를 만들고 생명주기 후킹 메서드에서 _그 메서드를 호출_ 하는 것이 좋습니다.
생명주기 후킹 메서드의 이름은 _언제_ 실행되는지를 나타내므로, 내부 코드가 어떤 일을 하는지 설명하는 의미 있는 이름이 되지는 못합니다.

```ts {prefer}
ngOnInit() {
  this.startLogging();
  this.runBackgroundTask();
}
```

```ts {avoid}
ngOnInit() {
  this.logger.setMode('info');
  this.logger.monitorErrors();
  // ...그리고 이 메서드들에서 펼쳐 쓴 나머지 코드가 이어집니다.
}
```

<!--
### Use lifecycle hook interfaces
-->

<a id="use-lifecycle-hook-interfaces"></a>

### 생명주기 후킹 인터페이스를 사용하세요

<!--
Angular provides a TypeScript interface for each lifecycle method. When adding a lifecycle hook to
your class, import and `implement` these interfaces to ensure that the methods are named correctly.

```ts
import {Component, OnInit} from '@angular/core';

@Component(/* ... */)
export class UserProfile implements OnInit {
  // The `OnInit` interface ensures this method is named correctly.
  ngOnInit() {
    /* ... */
  }
}
```
-->

Angular는 각 생명주기 메서드에 해당하는 TypeScript 인터페이스를 제공합니다.
클래스에 생명주기 후킹 메서드를 추가할 때는 해당 인터페이스를 가져와 `implement`하여 메서드 이름이 올바른지 확인하세요.

```ts
import {Component, OnInit} from '@angular/core';

@Component(/* ... */)
export class UserProfile implements OnInit {
  // `OnInit` 인터페이스는 이 메서드의 이름이 올바른지 확인합니다.
  ngOnInit() {
    /* ... */
  }
}
```
