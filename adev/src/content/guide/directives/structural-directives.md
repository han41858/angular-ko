<!--
# Structural directives
-->

# 구조 디렉티브(Structural Directives)

<!--
Structural directives are directives applied to an `<ng-template>` element that conditionally or repeatedly render the content of that `<ng-template>`.
-->

구조 디렉티브는 `<ng-template>` 엘리먼트에 적용되어 조건에 따라 내용물을 렌더링하거나, `<ng-template>` 내용물을 반복해서 렌더링하는 디렉티브입니다.

<!--
For everyday conditional and repeated rendering, use Angular's built-in [control flow blocks](guide/templates/control-flow) (`@if`, `@for`, and `@switch`). Write a structural directive when you need reusable rendering behavior that control flow doesn't cover, such as gating content behind a permission check or providing a template with data from an external source.
-->

일반적인 조건부 렌더링이나 반복 렌더링에는 Angular의 내장 [제어 흐름 블록](guide/templates/control-flow)(`@if`, `@for`, `@switch`)을 사용하세요.
권한 검사에 따라 콘텐츠를 표시하거나 외부 소스의 데이터를 템플릿에 제공하는 등, 제어 흐름 블록만으로 처리할 수 없는 재사용 가능한 렌더링 동작이 필요할 때 구조 디렉티브를 작성하세요.

<!--
## Example use case
-->

<a id="example-use-case"></a>

## 활용 예제

<!--
This guide uses a directive called `SelectDirective` as its running example. The directive fetches data from a given data source and renders its template when that data is available. It is named after the SQL keyword `SELECT` and matched with an attribute selector, `[select]`.

`SelectDirective` has an input naming the data source to use, called `selectFrom`. The `select` prefix for this input is important for the [shorthand syntax](#structural-directive-shorthand). The directive instantiates its `<ng-template>` with a template context providing the selected data.

Using this directive directly on an `<ng-template>` looks like this:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p>The data is: {{ data }}</p>
</ng-template>
```

The structural directive can wait for the data to become available and then render its `<ng-template>`.

HELPFUL: Angular's `<ng-template>` element defines a template that doesn't render anything by default. If you wrap elements in an `<ng-template>` without applying a structural directive, those elements are not rendered.

For more information, see the [ng-template API](api/core/ng-template) documentation.
-->

이 문서에서는 데이터 소스에서 데이터를 받아와서 해당 데이터가 준비되었을 때 템플릿에 렌더링하는 구조 디렉티브를 만들어 봅시다.
이 디렉티브는 SQL 키워드 `SELECT`를 따와서 `SelectDirective`라고 하며, 어트리뷰트 셀렉터는 `[select]`로 지정합니다.

`SelectDirective`는 데이터 소스 이름을 `selectFrom` 입력으로 받습니다.
이때 사용한 `select` 접두사는 [단축 문법](#구조-디렉티브-단축-문법)입니다.
디렉티브는 데이터가 준비되면 이 데이터를 제공하는 템플릿 컨텍스트를 구성하며 `<ng-template>` 인스턴스를 생성합니다.

디렉티브를 `<ng-template>`에 직접 사용하면 이렇게 작성할 수 있습니다:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p>The data is: {{ data }}</p>
</ng-template>
```

그러면 구조 디렉티브는 데이터를 사용할 수 있을 때까지 기다린 후에, `<ng-template>`을 화면에 렌더링합니다.

참고: Angular가 제공하는 `<ng-template>` 엘리먼트는 템플릿을 정의하며, 그 자체로는 화면에 아무것도 렌더링하지 않습니다. `<ng-template>` 엘리먼트는 구조 디렉티브와 함께 사용합니다.

더 자세한 내용을 확인하려면 [ng-template API](api/core/ng-template) 문서를 참고하세요.

<!--
## Structural directive shorthand
-->

<a id="structural-directive-shorthand"></a>

## 구조 디렉티브 단축 문법

<!--
Angular supports a shorthand syntax for structural directives which avoids the need to explicitly author an `<ng-template>` element.

Structural directives can be applied directly on an element by prefixing the directive attribute selector with an asterisk (`*`), such as `*select`. Angular transforms the asterisk in front of a structural directive into an `<ng-template>` that hosts the directive and surrounds the element and its descendants.

You can use this with `SelectDirective` as follows:

```angular-html
<p *select="let data; from: source">The data is: {{ data }}</p>
```

This example shows the flexibility of structural directive shorthand syntax, which is sometimes called _microsyntax_.

When used in this way, only the structural directive and its bindings are applied to the `<ng-template>`. Any other attributes or bindings on the `<p>` tag are left alone. For example, these two forms are equivalent:

```angular-html
<!- Shorthand syntax: ->
<p class="data-view" *select="let data; from: source">The data is: {{ data }}</p>

<!- Long-form syntax: ->
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{ data }}</p>
</ng-template>
```

Shorthand syntax is expanded through a set of conventions. A more thorough [grammar](#structural-directive-syntax-reference) is defined below, but in the above example, this transformation can be explained as follows:

The first part of the `*select` expression is `let data`, which declares a template variable `data`. Since no assignment follows, the template variable is bound to the template context property `$implicit`.

The second piece of syntax is a key-expression pair, `from source`. `from` is a binding key and `source` is a regular template expression. Binding keys are mapped to properties by transforming them to PascalCase and prepending the structural directive selector. The `from` key is mapped to `selectFrom`, which is then bound to the expression `source`. This is why many structural directives will have inputs that are all prefixed with the structural directive's selector.
-->

Angular는 `<ng-template>` 엘리먼트 사용을 생략할 수 있도록 구조 디렉티브에 사용할 수 있는 단축 문법을 제공합니다.

구조 디렉티브는 엘리먼트에 사용하는 디렉티브 어트리뷰트 셀렉터 앞에 아스테리스크(`*`)를 붙여서 `*select`와 같이 지정할 수 있습니다.
그러면 Angular는 구조 디렉티브 앞에 붙은 아스테리스크를 `<ng-template>`으로 변환해서 엘리먼트를 감쌉니다.

그래서 `SelectDirective` 는 이렇게도 사용할 수 있습니다:

```angular-html
<p *select="let data; from: source">The data is: {{ data }}</p>
```

이 방식은 구조 디렉티브를 유연하게 사용하는 단축 문법이며, _마이크로 문법(microsyntax)_ 라고도 합니다.

이렇게 사용하면 구조 디렉티브 자체와 구조 디렉티브 바인딩은 `<ng-template>`으로 옮겨갑니다.
그리고 다른 어트리뷰트와 바인딩은 원래 엘리먼트에 그대로 남습니다.
그래서 아래 두 코드가 실행되는 결과는 같습니다:

```angular-html
<!-- 단축 문법: -->
<p class="data-view" *select="let data; from: source">The data is: {{ data }}</p>

<!-- 긴 형식의 문법: -->
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{ data }}</p>
</ng-template>
```

단축 문법은 사용자 편의를 위해 제공되는 것입니다.
더 자세한 [문법](#구조-디렉티브-문법)은 아래에서 설명하며, 위 코드에 대해 간단하게 설명하면 이렇습니다:

`*select` 표현식은 `let data`와 같습니다.
템플릿 변수 `data`를 선언합니다.
그런데 이 선언문 뒤에 할당 표현이 없기 때문에 템플릿 변수 `data` 값은 템플릿 컨텍스트에 존재하는 `$implicit` 값이 됩니다.

두번째 부분 `from source`는 키-표현식 쌍입니다.
`from`은 바인딩 키이며, `source`는 일반적인 템플릿 표현식입니다.
바인딩 키는 파스칼 케이스(PascalCase)로 변환되어 구조 디렉티브 셀렉터 뒤에 오는 구문의 프로퍼티와 맵핑됩니다.
그래서 `from` 키는 `selectFrom`과 매핑되어 `source` 표현식과 바인딩됩니다.
구조 디렉티브는 보통 구조 디렉티브의 셀렉터와 같은 접두사를 사용하는 것이 일반적입니다.

<!--
## One structural directive per element
-->

<a id="one-structural-directive-per-element"></a>

## 구조 디렉티브는 엘리먼트에 하나씩

<!--
You can only apply one structural directive per element when using the shorthand syntax. This is because there is only one `<ng-template>` element onto which that directive gets unwrapped. Multiple directives would require multiple nested `<ng-template>`, and it's unclear which directive should be first. `<ng-container>` can be used to create wrapper layers when multiple structural directives need to be applied around the same physical DOM element or component, which allows the user to define the nested structure.
-->

단축 문법을 사용하는 경우에 구조 디렉티브는 엘리먼트에 하나만 사용할 수 있습니다.
왜냐하면 구조 디렉티브마다 `<ng-template>` 엘리먼트가 연결되어야 하기 때문입니다.
디렉티브를 여러 개 사용한다면 `<ng-template>`을 여러 개 중첩해야 하는데, 이 경우에는 어떤 디렉티브를 먼저 적용해야 하는지 결정할 수 없습니다.
구조 디렉티브 여러 개를 DOM 엘리먼트나 컴포넌트 하나에 적용해야 한다면, `<ng-container>`를 사용해서 가상으로 중첩된 DOM 구조를 만들면 됩니다.

<!--
## Creating a structural directive

A structural directive is a directive class that injects two dependencies:

- [`TemplateRef`](api/core/TemplateRef) gives the directive access to the content of the `<ng-template>` it is applied to.
- [`ViewContainerRef`](api/core/ViewContainerRef) represents the location in the DOM where the directive can render that template.

The directive controls rendering by creating, or not creating, embedded views from the template in the view container. The complete `SelectDirective` looks like this:

```ts
import {Directive, TemplateRef, ViewContainerRef, inject, input} from '@angular/core';

export interface DataSource<T> {
  load(): Promise<T>;
}

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  selectFrom = input.required<DataSource<unknown>>();

  async ngOnInit() {
    const data = await this.selectFrom().load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      // Create the embedded view with a context object that contains
      // the data via the key `$implicit`.
      $implicit: data,
    });
  }
}
```

The `selectFrom` input names the data source the directive reads from. It uses [`input.required()`](guide/components/inputs#required-inputs) because the directive can't do anything useful without a data source.

When Angular initializes the directive, it loads the data and then renders the template by calling `createEmbeddedView()`. The second argument is the template's _context object_: values the template can bind to with `let` declarations. Assigning the data to the `$implicit` key makes it the default value that `let-data` (or `let data` in shorthand) receives.

NOTE: This example renders its template once, when the directive initializes. It does not re-render when the bound data source changes.

Once the directive works, consider [adding template type-checking support](#typing-the-directives-context).

HELPFUL: The CLI command [`ng generate directive`](tools/cli/schematics) scaffolds a directive along with its test file.
-->

## 구조 디렉티브 만들기 {#creating-a-structural-directive}

구조 디렉티브는 다음 두 의존성을 주입받는 디렉티브 클래스입니다.

- [`TemplateRef`](api/core/TemplateRef): 디렉티브가 적용된 `<ng-template>`의 콘텐츠에 접근할 수 있습니다.
- [`ViewContainerRef`](api/core/ViewContainerRef): 디렉티브가 템플릿을 렌더링할 DOM 위치를 나타냅니다.

디렉티브는 뷰 컨테이너에 템플릿의 내장 뷰를 생성할지 결정해서 렌더링을 제어합니다.
완성된 `SelectDirective`는 다음과 같습니다.

```ts
import {Directive, TemplateRef, ViewContainerRef, inject, input} from '@angular/core';

export interface DataSource<T> {
  load(): Promise<T>;
}

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  selectFrom = input.required<DataSource<unknown>>();

  async ngOnInit() {
    const data = await this.selectFrom().load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      // Create the embedded view with a context object that contains
      // the data via the key `$implicit`.
      $implicit: data,
    });
  }
}
```

`selectFrom` 입력 프로퍼티는 디렉티브가 읽을 데이터 소스를 지정합니다.
데이터 소스가 없으면 디렉티브가 의미 있는 작업을 할 수 없으므로 [`input.required()`](guide/components/inputs#required-inputs)를 사용합니다.

Angular가 디렉티브를 초기화하면 데이터를 로드한 뒤 `createEmbeddedView()`를 호출해서 템플릿을 렌더링합니다.
두 번째 인자는 `let` 선언으로 템플릿에서 바인딩할 수 있는 값들을 담은 _컨텍스트 객체_ 입니다.
데이터를 `$implicit` 키에 할당하면 `let-data`(단축 문법에서는 `let data`)가 받는 기본값이 됩니다.

참고: 이 예제는 디렉티브를 초기화할 때 템플릿을 한 번 렌더링합니다. 바인딩한 데이터 소스가 변경되어도 다시 렌더링하지 않습니다.

디렉티브가 동작하면 [템플릿 타입 검사 지원 추가하기](#typing-the-directives-context)를 고려하세요.

참고: CLI 명령어 [`ng generate directive`](tools/cli/schematics)를 사용하면 디렉티브와 테스트 파일의 기본 구조를 생성할 수 있습니다.

<!--
## Structural directive syntax reference
-->

<a id="structural-directive-syntax-reference"></a>

## 구조 디렉티브 문법

<!--
When you write your own structural directives, use the following syntax:

```ts {hideCopy}
_: prefix = "( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )_";
```

The following patterns describe each portion of the structural directive grammar:

```ts
as = :export "as" :local ";"?
keyExp = :key ":"? :expression ("as" :local)? ";"?
let = "let" :local "=" :export ";"?
```

| Keyword      | Details                                            |
| :----------- | :------------------------------------------------- |
| `prefix`     | HTML attribute key                                 |
| `key`        | HTML attribute key                                 |
| `local`      | Local variable name used in the template           |
| `export`     | Value exported by the directive under a given name |
| `expression` | Standard Angular expression                        |
-->

구조 디렉티브에는 이런 문법을 사용합니다:

```ts {hideCopy}
_: prefix = "( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )_";
```

구조 디렉티브 문법 각각의 역할은 이렇습니다:

```ts
as = :export "as" :local ";"?
keyExp = :key ":"? :expression ("as" :local)? ";"?
let = "let" :local "=" :export ";"?
```

| 키워드       | 설명                             |
| :----------- | :------------------------------- |
| `prefix`     | HTML 어트리뷰트 키               |
| `key`        | HTML 어트리뷰트 키               |
| `local`      | 템플릿에서 사용할 지역 변수 이름 |
| `export`     | 디렉티브 외부에서 사용할 이름    |
| `expression` | 표준 Angular 표현식              |

<!--
### How Angular translates shorthand
-->

<a id="how-angular-translates-shorthand"></a>

### Angular가 단축 문법을 처리하는 방식

<!--
Angular translates structural directive shorthand into the normal binding syntax as follows:

| Shorthand                       | Translation                                                     |
| :------------------------------ | :-------------------------------------------------------------- |
| `prefix` and naked `expression` | `[prefix]="expression"`                                         |
| `keyExp`                        | `[prefixKey]="expression"` (The `prefix` is added to the `key`) |
| `let local`                     | `let-local="export"`                                            |
-->

Angular는 구조 디렉티브 단축 문법을 다음과 같이 일반 바인딩 문법으로 변환해서 처리합니다:

| 단축 문법                   | 변환 결과                                                     |
| :-------------------------- | :------------------------------------------------------------ |
| `prefix`, 일반 `expression` | `[prefix]="expression"`                                       |
| `keyExp`                    | `[prefixKey]="expression"` (`prefix` 는 `key` 앞에 붙습니다.) |
| `let local`                 | `let-local="export"`                                          |

<!--
### Shorthand examples
-->

<a id="shorthand-examples"></a>

### 단축 문법 예제

<!--
The following table provides shorthand examples:

| Shorthand                                                             | How Angular interprets the syntax                                                                             |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `*myDir="let item of [1,2,3]"`                                        | `<ng-template myDir let-item [myDirOf]="[1, 2, 3]">`                                                          |
| `*myDir="let item of [1,2,3] as items; trackBy: myTrack; index as i"` | `<ng-template myDir let-item [myDirOf]="[1,2,3]" let-items="myDirOf" [myDirTrackBy]="myTrack" let-i="index">` |
| `*ngComponentOutlet="componentClass"`                                | `<ng-template [ngComponentOutlet]="componentClass">`                                                          |
| `*ngComponentOutlet="componentClass; inputs: myInputs"`              | `<ng-template [ngComponentOutlet]="componentClass" [ngComponentOutletInputs]="myInputs">`                     |
| `*myDir="exp as value"`                                               | `<ng-template [myDir]="exp" let-value="myDir">`                                                               |
-->

단축 문법이 어떻게 사용되는지 몇 가지 예제를 살펴봅시다:

| 단축 문법                                                             | Angular가 해석하고 나면                                                                                       |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `*myDir="let item of [1,2,3]"`                                        | `<ng-template myDir let-item [myDirOf]="[1, 2, 3]">`                                                          |
| `*myDir="let item of [1,2,3] as items; trackBy: myTrack; index as i"` | `<ng-template myDir let-item [myDirOf]="[1,2,3]" let-items="myDirOf" [myDirTrackBy]="myTrack" let-i="index">` |
| `*ngComponentOutlet="componentClass"`                                 | `<ng-template [ngComponentOutlet]="componentClass">`                                                          |
| `*ngComponentOutlet="componentClass; inputs: myInputs"`               | `<ng-template [ngComponentOutlet]="componentClass" [ngComponentOutletInputs]="myInputs">`                     |
| `*myDir="exp as value"`                                               | `<ng-template [myDir]="exp" let-value="myDir">`                                                               |

<!--
## Improving template type checking for custom directives
-->

<a id="improving-template-type-checking-for-custom-directives"></a>

## 템플릿 타입 검사 강화하기

<!--
You can improve template type checking for custom directives by adding template guards to your directive definition.
These guards help the Angular template type checker find mistakes in the template at compile time, which can avoid runtime errors.
Two different types of guards are possible:

- `ngTemplateGuard_(input)` lets you control how an input expression should be narrowed based on the type of a specific input.
- `ngTemplateContextGuard` is used to determine the type of the context object for the template, based on the type of the directive itself.

This section provides examples of both kinds of guards.
For more information, see [Template type checking](tools/cli/template-typecheck 'Template type-checking guide').
-->

디렉티브를 정의할 때 템플릿 가드를 추가하면 템플릿 타입 검사를 강화할 수 있습니다.
이 가드를 추가하면 컴파일 시점에 Angular 템플릿 타입 검사기가 동작하면서 실수를 찾아낼 수 있기 때문에, 실행 시점에 에러가 발생하는 것을 방지합니다.
가드는 두 가지 종류가 있습니다:

- `ngTemplateGuard_(input)` - 입력값의 타입에 따라 입력 표현식 타입을 좁힐 수 있습니다. -`ngTemplateContextGuard` - 디렉티브 자체 타입에 따라 템플릿 컨텍스트 객체의 타입을 결정합니다.

이번 섹션에서는 두 가드의 예제만 다룹니다.
더 자세한 내용은 [템플릿 타입 검사](tools/cli/template-typecheck 'Template type-checking guide') 문서를 참고하세요.

<!--
### Type narrowing with template guards
-->

<a id="type-narrowing-with-template-guards"></a>

### 템플릿 가드로 타입 좁히기

<!--
A structural directive in a template controls whether that template is rendered at run time. Some structural directives want to perform type narrowing based on the type of input expression.

There are two narrowings which are possible with input guards:

- Narrowing the input expression based on a TypeScript type assertion function.
- Narrowing the input expression based on its truthiness.

To narrow the input expression by defining a type assertion function:

```ts
// This directive only renders its template if the actor is a user.
// You want to assert that within the template, the type of the `actor`
// expression is narrowed to `User`.
@Directive(...)
class ActorIsUser {
  actor = input<User | Robot>();

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User | Robot): expr is User {
    // The return statement is unnecessary in practice, but included to
    // prevent TypeScript errors.
    return true;
  }
}
```

Type-checking will behave within the template as if the `ngTemplateGuard_actor` has been asserted on the expression bound to the input.

Some directives only render their templates when an input is truthy. It's not possible to capture the full semantics of truthiness in a type assertion function, so instead a literal type of `'binding'` can be used to signal to the template type-checker that the binding expression itself should be used as the guard:

```ts
@Directive(...)
class CustomIf {
  condition = input.required<boolean>();

  static ngTemplateGuard_condition: 'binding';
}
```

The template type-checker will behave as if the expression bound to `condition` was asserted to be truthy within the template.
-->

템플릿에 사용되는 구조 디렉티브는 템플릿을 렌더링할지 결정합니다.
그래서 때로는 입력 표현식의 타입을 기반으로 타입을 좁혀야 하는 경우가 있습니다.

입력 가드로 타입을 좁히는 방법은 두 가지입니다:

- TypeScript 타입 단언(assertion) 함수를 사용해서 입력 표현식 타입을 좁히는 방법
- 입력 표현식의 참/거짓 여부로 입력 표현식 타입을 좁히는 방법

타입 단언 함수를 사용하는 방식은 이렇습니다:

```ts
// 이 디렉티브는 사용자가 사람일 때만 템플릿을 렌더링합니다.
// 이 경우 `actor` 표현식의 타입을 `User`로 좁힐 수 있습니다.
@Directive(...)
class ActorIsUser {
  actor = input<User | Robot>();

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User | Robot): expr is User {
    // 반환 구문은 필요 없지만, TypeScript 에러를 방지하기 위해 선언합니다.
    return true;
  }
}
```

템플릿 안에서는 타입 검사가 마치 바인딩된 표현식에 `ngTemplateGuard_actor`가 타입 단언 함수로 사용되는 것처럼 동작합니다.

디렉티브 중에는 입력값이 참인 경우에 템플릿을 렌더링하는 경우가 있습니다.
이 경우에는 타입 검사 함수가 "참" 의 의미를 완벽하게 이해할 수는 없기 때문에, 바인딩 표현식에 가드를 사용해야 하는 것을 알리기 위해 `'binding'` 값을 사용합니다.

```ts
@Directive(...)
class CustomIf {
  condition = input.required<boolean>();

  static ngTemplateGuard_condition: 'binding';
}
```

템플릿 타입 검사기는 이제 `condition`에 바인딩된 표현식이 참으로 평가되는 것을 확인한 것처럼 동작합니다.

<!--
### Typing the directive's context
-->

### 디렉티브 컨텍스트에 타입 지정하기 {#typing-the-directives-context}

<!--
If your structural directive provides a context to the instantiated template, you can properly type it inside the template by providing a static `ngTemplateContextGuard` type assertion function. This function can use the type of the directive to derive the type of the context, which is useful when the type of the directive is generic.

For the `SelectDirective` described above, you can implement an `ngTemplateContextGuard` to correctly specify the data type, even if the data source is generic.

```ts
// Declare an interface for the template context:
export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive(...)
export class SelectDirective<T> {
  // The directive's generic type `T` will be inferred from the `DataSource` type
  // passed to the input.
  selectFrom = input.required<DataSource<T>>();

  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
```
-->

템플릿 안에서 구조 디렉티브의 인스턴스가 생성되면, 정적 `ngTemplateContextGuard` 타입 단언 함수를 사용해서 템플릿 안에 있는 타입을 지정할 수 있습니다.
이 함수는 디렉티브 타입을 활용할 수 있기 때문에 디렉티브가 제네릭 타입인 경우 특히 유용합니다.

위에서 살펴봤던 `SelectDirective`의 경우에는 데이터 소스가 제네릭인 경우라도 `ngTemplateContextGuard`를 정의해서 데이터 타입을 정확하게 지정할 수 있습니다.

```ts
// 템플릿 컨텍스트를 표현하는 인터페이스를 선언합니다:
export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive(...)
export class SelectDirective<T> {
  // 입력으로 받은 `DataSource`를 제네릭 `T` 타입으로 선언합니다.
  selectFrom = input.required<DataSource<T>>();

  // 디렉티브의 제네릭 타입을 활용해서 컨텍스트의 타입을 좁힙니다.
  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    // 이전에 봤던 예제처럼, 가드 함수는 실행 시점에 실제로 실행되지 않지만, TypeScript 에러를 방지하기 위해 선언합니다.
    return true;
  }
}
```

<!--
## What's next

<docs-pill-row>
  <docs-pill href="guide/directives/directive-composition-api" title="Directive composition API"/>
  <docs-pill href="guide/templates/ng-template" title="ng-template"/>
  <docs-pill href="guide/templates/control-flow" title="Control flow"/>
</docs-pill-row>
-->

## 다음 단계 {#whats-next}

<docs-pill-row>
  <docs-pill href="guide/directives/directive-composition-api" title="디렉티브 조합 API"/>
  <docs-pill href="guide/templates/ng-template" title="ng-template"/>
  <docs-pill href="guide/templates/control-flow" title="제어 흐름"/>
</docs-pill-row>
