<!--
# Structural directives
-->
# 구조 디렉티브(Structural Directives)

<!--
Structural directives are directives applied to an `<ng-template>` element that conditionally or repeatedly render the content of that `<ng-template>`.
-->
구조 디렉티브는 `<ng-template>` 엘리먼트에 적용되어 조건에 따라 내용물을 렌더링하거나, `<ng-template>` 내용물을 반복해서 렌더링하는 디렉티브입니다.


<!--
## Example use case
-->
## 활용 예제

<!--
In this guide you'll build a structural directive which fetches data from a given data source and renders its template when that data is available. This directive is called `SelectDirective`, after the SQL keyword `SELECT`, and match it with an attribute selector `[select]`.

`SelectDirective` will have an input naming the data source to be used, which you will call `selectFrom`. The `select` prefix for this input is important for the [shorthand syntax](#structural-directive-shorthand). The directive will instantiate its `<ng-template>` with a template context providing the selected data.

The following is an example of using this directive directly on an `<ng-template>` would look like:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p>The data is: {{ data }}</p>
</ng-template>
```

The structural directive can wait for the data to become available and then render its `<ng-template>`.

HELPFUL: Note that Angular's `<ng-template>` element defines a template that doesn't render anything by default, if you just wrap elements in an `<ng-template>` without applying a structural directive those elements will not be rendered.

For more information, see the [ng-template API](api/core/ng-template) documentation.
-->
이 문서에서는 데이터 소스에서 데이터를 받아와서 해당 데이터가 준비되었을 때 템플릿에 렌더링하는 구조 디렉티브를 만들어 봅시다.
이 디렉티브는 SQL 키워드 `SELECT`를 따와서 `SelectDirective`라고 하며, 어트리뷰트 셀렉터는 `[select]`로 지정합니다.

`SelectDirective`는 데이터 소스 이름을 `selectFrom` 입력으로 받아 받습니다.
이 때 사용한 `select` 접두사는 [단축 문법](#structural-directive-shorthand)입니다.
디렉티브는 데이터가 준비되면 이 데이터를 제공하는 템플릿 컨텍스트를 구성하며 `<ng-template>` 인스턴스를 생성합니다.

디렉티브를 `<ng-template>`에 직접 사용하면 이렇게 작성할 수 있습니다:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p>The data is: {{ data }}</p>
</ng-template>
```

그러면 구조 디렉티브는 데이터가 사용할 수 있을 때까지 기다린 후에, `<ng-template>`을 화면에 렌더링합니다.

참고: Angular가 제공하는 `<ng-template>` 엘리먼트는 템플릿을 정의하며, 그 자체로는 화면에 아무것도 렌더링하지 않습니다. `<ng-template>` 엘리먼트는 구조 디렉티브와 함께 사용합니다.

더 자세한 내용을 확인하려면 [ng-template API](api/core/ng-template) 문서를 참고하세요.


<!--
## Structural directive shorthand
-->
## 구조 디렉티브 단축 문법

<!--
Angular supports a shorthand syntax for structural directives which avoids the need to explicitly author an `<ng-template>` element.

Structural directives can be applied directly on an element by prefixing the directive attribute selector with an asterisk (`*`), such as `*select`. Angular transforms the asterisk in front of a structural directive into an `<ng-template>` that hosts the directive and surrounds the element and its descendants.

You can use this with `SelectDirective` as follows:

```angular-html
<p *select="let data from source">The data is: {{data}}</p>
```

This example shows the flexibility of structural directive shorthand syntax, which is sometimes called _microsyntax_.

When used in this way, only the structural directive and its bindings are applied to the `<ng-template>`. Any other attributes or bindings on the `<p>` tag are left alone. For example, these two forms are equivalent:

```angular-html
<!- Shorthand syntax: ->
<p class="data-view" *select="let data from source">The data is: {{data}}</p>

<!- Long-form syntax: ->
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{data}}</p>
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
<p *select="let data from source">The data is: {{data}}</p>
```

이 방식은 구조 디렉티브를 유연하게 사용하는 단축 문법이며, _마이크로 문법(microsyntax)_ 라고도 합니다.

이렇게 사용하면 구조 디렉티브 자체와 구조 디렉티브 바인딩은 `<ng-template>`으로 옮겨갑니다.
그리고 다른 어트리뷰트와 바인딩은 원래 엘리먼트에 그대로 남습니다.
그래서 아래 두 코드가 실행되는 결과는 같습니다:

```angular-html
<!-- 단축 문법: -->
<p class="data-view" *select="let data from source">The data is: {{data}}</p>

<!-- 긴 형식의 문법: -->
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{data}}</p>
</ng-template>
```

단축 문법은 사용자 편의를 위해 제공되는 것입니다.
더 자세한 [문법](#structural-directive-syntax-reference)은 아래에서 설명하며, 위 코드에 대해 간단하게 설명하면 이렇습니다:

`*select` 표현식은 `let data`와 같습니다.
템플릿 변수 `data`를 선언합니다.
그런데 이 선언문 뒤에 할당 표현이 없기 때문에 템플릿 변수 `data` 값은 템플릿 컨텍스트에 존재하는 `$implicit` 값이 됩니다.

두번째 부분 `from source`는 키-표현식 쌍입니다.
`from`은 바인딩 키이며, `source`는 일반적인 템플릿 표현식입니다.
바인딩 키는 파스칼 케이스(PascalCase)로 변환되어 구조 디렉티브 셀렉터 뒤에 오는 구문의 프로퍼티와 맵핑됩니다.
그래서 `from` 키는 `selecteFrom`과 매핑되어 `source` 표현식과 바인딩됩니다.
구조 디렉티브는 보통 구조 디렉티브의 셀렉터와 같은 접두사를 사용하는 것이 일반적입니다.


<!--
## One structural directive per element
-->
## 구조 디렉티브는 엘리먼트에 하나씩

<!--
You can only apply one structural directive per element when using the shorthand syntax. This is because there is only one `<ng-template>` element onto which that directive gets unwrapped. Multiple directives would require multiple nested `<ng-template>`, and it's unclear which directive should be first. `<ng-container>` can be used when to create wrapper layers when multiple structural directives need to be applied around the same physical DOM element or component, which allows the user to define the nested structure.
-->
단축 문법을 사용하는 경우에 구조 디렉티브는 엘리먼트에 하나만 사용할 수 있습니다.
왜냐하면 구조 디렉티브마다 `<ng-template>` 엘리먼트가 연결되어야 하기 때문입니다.
디렉티브를 여러개 사용한다면 `<ng-template>`을 여러개 중첩해야 하는데, 이 경우에는 어떤 디렉티브를 먼저 적용해야 하는지 결정할 수 없습니다.
구조 디렉티브 여러 개를 DOM 엘리먼트나 컴포넌트 하나에 적용해야 한다면, `<ng-container>`를 사용해서 가상으로 중첩된 DOM 구조를 만들면 됩니다.


<!--
## Creating a structural directive
-->
## 구조 디렉티브 만들기

<!--
This section guides you through creating the `SelectDirective`.

<docs-workflow>
<docs-step title="Generate the directive">
Using the Angular CLI, run the following command, where `select` is the name of the directive:

```shell
ng generate directive select
```

Angular creates the directive class and specifies the CSS selector, `[select]`, that identifies the directive in a template.
</docs-step>
<docs-step title="Make the directive structural">
Import `TemplateRef`, and `ViewContainerRef`. Inject `TemplateRef` and `ViewContainerRef` in the directive as private properties.

```ts
import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
}

```

</docs-step>
<docs-step title="Add the 'selectFrom' input">
Add a `selectFrom` `@Input()` property.

```ts
export class SelectDirective {
  // ...

  @Input({required: true}) selectFrom!: DataSource;
}
```

</docs-step>
<docs-step title="Add the business logic">
With `SelectDirective` now scaffolded as a structural directive with its input, you can now add the logic to fetch the data and render the template with it:

```ts
export class SelectDirective {
  // ...

  async ngOnInit() {
    const data = await this.selectFrom.load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      // Create the embedded view with a context object that contains
      // the data via the key `$implicit`.
      $implicit: data,
    });
  }
}
```

</docs-step>
</docs-workflow>

That's it - `SelectDirective` is up and running. A follow-up step might be to [add template type-checking support](#typing-the-directives-context).
-->
이번 섹션에서는 `SelectDirective`를 만들어 봅시다.

<docs-workflow>
<docs-step title="디렉티브 생성하기">
다음 Angular CLI 명령을 실행하면 `select` 라는 이름으로 디렉티브를 생성할 수 있습니다:

```shell
ng generate directive select
```

명령을 실행하면 Angular가 디렉티브 클래스를 생성하고, 템플릿에 사용하는 CSS 셀렉터를 `[select]` 라고 지정합니다.
</docs-step>
<docs-step title="디렉티브 구조 생성하기">
`TemplateRef`, `ViewContainerRef` 심볼을 로드합니다.
그리고 이 심볼들을 private 프로퍼티로 의존성 주입합니다.

```ts
import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[select]',
})
export class SelectDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
}

```

</docs-step>
<docs-step title="'selectFrom' 입력 프로퍼티 추가하기">
`selecttFrom` `@Input()` 프로퍼티를 추가합니다.

```ts
export class SelectDirective {
  // ...

  @Input({required: true}) selectFrom!: DataSource;
}
```

</docs-step>
<docs-step title="동작 로직 추가하기">
이제 `SelectDirective`는 입력값을 받을 수 있도록 확장되었습니다. 데이터를 불러와서 템플릿에 렌더링하는 로직을 추가합니다:

```ts
export class SelectDirective {
  // ...

  async ngOnInit() {
    const data = await this.selectFrom.load();
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      // 받아온 데이터를 `$implicit` 키에 담아 임베디드 뷰를 생성합니다.
      $implicit: data,
    });
  }
}
```

</docs-step>
</docs-workflow>

이제 됐습니다. 다음 단계로 [템플릿 타입 검사](#typing-the-directives-context) 단계를 더 진행해 볼 수 있습니다.


<!--
## Structural directive syntax reference
-->
## 구조 디렉티브 문법

<!--
When you write your own structural directives, use the following syntax:

<docs-code hideCopy language="typescript">

*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"

</docs-code>

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

<docs-code hideCopy language="typescript">

*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"

</docs-code>

구조 디렉티브 문법 각각의 역할은 이렇습니다:

```ts
as = :export "as" :local ";"?
keyExp = :key ":"? :expression ("as" :local)? ";"?
let = "let" :local "=" :export ";"?
```

| 키워드      | 설명                                            |
| :----------- | :------------------------------------------------- |
| `prefix`     | HTML 어트리뷰트 키                                 |
| `key`        | HTML 어트리뷰트 키                                 |
| `local`      | 템플릿에서 사용할 지역 변수 이름           |
| `export`     | 디렉티브 외부에서 사용할 이름 |
| `expression` | 표준 Angular 표현식                        |


<!--
### How Angular translates shorthand
-->
### Angular가 단축 문법을 처리하는 방식

<!--
Angular translates structural directive shorthand into the normal binding syntax as follows:

| Shorthand | Translation |
|:--- |:--- |
| `prefix` and naked `expression` | `[prefix]="expression"` |
| `keyExp` | `[prefixKey]="expression"` (The `prefix` is added to the `key`) |
| `let local` | `let-local="export"` |
-->
Angular는 구조 디렉티브 단축 문법을 다음과 같이 일반 바인딩 문법으로 변환해서 처리합니다:

| 단축 문법 | 변환 결 |
|:--- |:--- |
| `prefix`, 일반 `expression` | `[prefix]="expression"` |
| `keyExp` | `[prefixKey]="expression"` (`prefix` 는 `key` 앞에 붙습니다.) |
| `let local` | `let-local="export"` |


<!--
### Shorthand examples
-->
### 단축 문법 예제

<!--
The following table provides shorthand examples:

| Shorthand | How Angular interprets the syntax |
|:--- |:--- |
| `*myDir="let item of [1,2,3]"` | `<ng-template myDir let-item [myDirOf]="[1, 2, 3]">` |
| `*myDir="let item of [1,2,3] as items; trackBy: myTrack; index as i"` | `<ng-template myDir let-item [myDirOf]="[1,2,3]" let-items="myDirOf" [myDirTrackBy]="myTrack" let-i="index">` |
| `*ngComponentOutlet="componentClass";` | `<ng-template [ngComponentOutlet]="componentClass">` |
| `*ngComponentOutlet="componentClass; inputs: myInputs";` | `<ng-template [ngComponentOutlet]="componentClass" [ngComponentOutletInputs]="myInputs">` |
| `*myDir="exp as value"` | `<ng-template [myDir]="exp" let-value="myDir">` |
-->
단축 문법이 어떻게 사용되는지 몇가지 예제를 살펴봅시다:

| 단축 문법 | Angular가 해석하고 나면 |
|:--- |:--- |
| `*myDir="let item of [1,2,3]"` | `<ng-template myDir let-item [myDirOf]="[1, 2, 3]">` |
| `*myDir="let item of [1,2,3] as items; trackBy: myTrack; index as i"` | `<ng-template myDir let-item [myDirOf]="[1,2,3]" let-items="myDirOf" [myDirTrackBy]="myTrack" let-i="index">` |
| `*ngComponentOutlet="componentClass";` | `<ng-template [ngComponentOutlet]="componentClass">` |
| `*ngComponentOutlet="componentClass; inputs: myInputs";` | `<ng-template [ngComponentOutlet]="componentClass" [ngComponentOutletInputs]="myInputs">` |
| `*myDir="exp as value"` | `<ng-template [myDir]="exp" let-value="myDir">` |



<!--
## Improving template type checking for custom directives
-->
## 템플릿 타입 검사 강화하기

<!--
You can improve template type checking for custom directives by adding template guards to your directive definition.
These guards help the Angular template type checker find mistakes in the template at compile time, which can avoid runtime errors.
Two different types of guards are possible:

* `ngTemplateGuard_(input)` lets you control how an input expression should be narrowed based on the type of a specific input.
* `ngTemplateContextGuard` is used to determine the type of the context object for the template, based on the type of the directive itself.

This section provides examples of both kinds of guards.
For more information, see [Template type checking](tools/cli/template-typecheck "Template type-checking guide").
-->
디렉티브를 정의할 때 템플릿 가드를 추가하면 템플릿 타입 검사를 강화할 수 있습니다.
이 가드를 추가하면 컴파일 시점에 Angular 템플릿 타입 검사기가 동작하면서 실수를 찾아낼 수 있기 때문에, 실행 시점에 에러가 발생하는 것을 방지합니다.
가드는 두가지 종류가 있습니다:

* `ngTemplateGuard_(input)` - 입력값의 타입에 따라 입력 표현식 타입을 좁힐 수 있습니다.
* `ngTemplateContextGuard` - 디렉티브 자체 타입에 따라 템플릿 컨텍스트 객체의 타입을 결정합니다.

이번 섹션에서는 두 가드의 예제만 다룹니다.
더 자세한 내용은 [템플릿 타입 검사](tools/cli/template-typecheck "Template type-checking guide") 문서를 참고하세요.


<!--
### Type narrowing with template guards
-->
### 템플릿 가드로 타입 좁히기

<!--
A structural directive in a template controls whether that template is rendered at run time. Some structural directives want to perform type narrowing based on the type of input expression.

There are two narrowings which are possible with input guards:

* Narrowing the input expression based on a TypeScript type assertion function.
* Narrowing the input expression based on its truthiness.

To narrow the input expression by defining a type assertion function:

```ts
// This directive only renders its template if the actor is a user.
// You want to assert that within the template, the type of the `actor`
// expression is narrowed to `User`.
@Directive(...)
class ActorIsUser {
  @Input() actor: User|Robot;

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User|Robot): expr is User {
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
  @Input() condition!: any;

  static ngTemplateGuard_condition: 'binding';
}
```

The template type-checker will behave as if the expression bound to `condition` was asserted to be truthy within the template.
-->
템플릿에 사용되는 구조 디렉티브는 템플릿을 렌더링 할 지 결정합니다.
그래서 때로는 입력 표현식의 타입을 기반으로 타입을 좁혀야 하는 경우가 있습니다.

입력 가드로 타입을 좁히는 방법은 두 가지 입니다:

* TypeScript 타입 경고(assertion) 함수를 사용하는 방법해서 입력 표현식 타입을 좁히는 방법
* 입력 표현식의 참/거짓 여부로 입력 표현식 타입을 좁히는 방법

타입 경고 함수를 사용하는 방식은 이렇습니다:

```ts
// 이 디렉티브는 사용자가 사람일 때만 템플릿을 렌더링합니다.
// 이 경우 `actor` 표현식의 타입을 `User`로 좁힐 수 있습니다.
@Directive(...)
class ActorIsUser {
  @Input() actor: User|Robot;

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User|Robot): expr is User {
    // 반환 구문은 필요없지만, TypeScript 에러를 방지하기 위해 선언합니다.
    return true;
  }
}
```

템플릿 안에서는 타입 검사가 마치 바인딩 된 표현식에 `ngTemplateGuard_actor`가 경고 함수로 사용되는 것처럼 동작합니다.

디렉티브 중에는 입력값이 참인 경우에 템플릿을 렌더링하는 경우가 있습니다.
이 경우에는 타입 검사 함수가 "참" 의 의미를 완벽하게 이해할 수는 없기 때문에, 바인딩 표현식에 가드를 사용해야 하는 것을 알리기 위해 `'binding'` 값을 사용합니다.

```ts
@Directive(...)
class CustomIf {
  @Input() condition!: any;

  static ngTemplateGuard_condition: 'binding';
}
```

템플릿 타입 검사기는 이제 `condition`에 바인딩된 표현식이 참으로 평가되는 것을 확인한 것처럼 동작합니다.


<!--
### Typing the directive's context
-->
### 디렉티브 컨텍스트에 타입 지정하기

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
  @Input({required: true}) selectFrom!: DataSource<T>;

  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
```
-->
템플릿 안에서 구조 디렉티브의 인스턴스가 생성되면, 정적 `ngTemplateContextGuard` 타입 경고 함수를 사용해서 템플릿 안에 있는 타입을 지정할 수 있습니다.
이 함수는 디렉티브 타입을 활용할 수 있기 때문에 디렉티브가 제네릭 타입인 경우 특히 유용합니다.

위에서 살펴봤던 `SelectDirective`의 경우에는 데이터 소스가 제네릭인 경우라도 `ngTemplateContextGuard`를 정의해서 데이터 타입을 정확하게 지정할 수 있습니다.

```ts
// 템플릿 컨텍스트를 표현하는 인터페이스를 선언합니다:
export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive(...)
export class SelectDirective<T> {
  // 입력으로 받은 `DataSource`을 제네릭 `T` 타입으로 선언합니다.
  @Input({required: true}) selectFrom!: DataSource<T>;

  // 디렉티브의 제네릭 타입을 활용해서 컨텍스트의 타입을 좁힙니다.
  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    // 이전에 봤던 예제처럼, 가드 함수는 실행 시점에 실제로 실행되지 않지만, TypeScript 에러를 방지하기 위해 선언합니다.
    return true;
  }
}
```
