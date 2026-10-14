<!--
# Ahead-of-time (AOT) compilation
-->

<a id="ahead-of-time-aot-compilation"></a>

# 사전(AOT) 컴파일

<!--
An Angular application consists mainly of components and their HTML templates.
Because the components and templates provided by Angular cannot be understood by the browser directly, Angular applications require a compilation process before they can run in a browser.

The Angular ahead-of-time (AOT) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase _before_ the browser downloads and runs that code.
Compiling your application during the build process provides a faster rendering in the browser.

This guide explains how to specify metadata and apply available compiler options to compile your applications efficiently using the AOT compiler.

HELPFUL: [Watch Alex Rickabaugh explain the Angular compiler](https://www.youtube.com/watch?v=anphffaCZrQ) at AngularConnect 2019.

Here are some reasons you might want to use AOT.

| Reasons                                 | Details                                                                                                                                                                                                                                            |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Faster rendering                        | With AOT, the browser downloads a pre-compiled version of the application. The browser loads executable code so it can render the application immediately, without waiting to compile the application first.                                       |
| Fewer asynchronous requests             | The compiler _inlines_ external HTML templates and CSS style sheets within the application JavaScript, eliminating separate ajax requests for those source files.                                                                                  |
| Smaller Angular framework download size | There's no need to download the Angular compiler if the application is already compiled. The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.                                              |
| Detect template errors earlier          | The AOT compiler detects and reports template binding errors during the build step before users can see them.                                                                                                                                      |
| Better security                         | AOT compiles HTML templates and components into JavaScript files long before they are served to the client. With no templates to read and no risky client-side HTML or JavaScript evaluation, there are fewer opportunities for injection attacks. |
-->

Angular 애플리케이션은 주로 컴포넌트와 해당 컴포넌트의 HTML 템플릿으로 구성됩니다.
브라우저는 Angular가 제공하는 컴포넌트와 템플릿을 직접 이해할 수 없기 때문에 Angular 애플리케이션이 브라우저에서 실행되려면 컴파일 과정이 필요합니다.

Angular의 사전 컴파일(Ahead-of-time, AOT) 컴파일러는 브라우저가 코드를 다운로드하고 실행하기 _전에_ 빌드 단계에서 Angular HTML과 TypeScript 코드를 효율적인 JavaScript 코드로 변환합니다.
빌드 과정에서 애플리케이션을 컴파일하면 브라우저에서 더 빠르게 렌더링할 수 있습니다.

이 가이드에서는 AOT 컴파일러로 애플리케이션을 효율적으로 컴파일하기 위해 메타데이터를 지정하고 컴파일러 옵션을 적용하는 방법을 알아봅니다.

도움말: AngularConnect 2019에서 [Alex Rickabaugh가 Angular 컴파일러를 설명하는 영상](https://www.youtube.com/watch?v=anphffaCZrQ)을 확인해 보세요.

AOT를 사용하는 이유는 다음과 같습니다.

| 이유                                  | 설명                                                                                                                                                                                                                       |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 빠른 렌더링                           | AOT를 사용하면 브라우저가 미리 컴파일된 애플리케이션을 다운로드합니다. 실행 가능한 코드를 불러오므로 먼저 애플리케이션을 컴파일할 필요 없이 바로 렌더링할 수 있습니다.                                                     |
| 비동기 요청 감소                      | 컴파일러는 외부 HTML 템플릿과 CSS 스타일시트를 애플리케이션 JavaScript에 _인라인으로 포함_ 하므로 해당 소스 파일을 위한 별도 Ajax 요청이 필요하지 않습니다.                                                                |
| Angular 프레임워크 다운로드 크기 감소 | 애플리케이션이 이미 컴파일되어 있다면 Angular 컴파일러를 다운로드할 필요가 없습니다. 컴파일러는 Angular 자체 크기의 약 절반을 차지하므로 이를 제외하면 애플리케이션 전송 크기가 크게 줄어듭니다.                           |
| 템플릿 오류 조기 발견                 | AOT 컴파일러는 사용자가 오류를 만나기 전에 빌드 단계에서 템플릿 바인딩 오류를 감지하고 보고합니다.                                                                                                                         |
| 보안 향상                             | AOT는 클라이언트에 제공하기 훨씬 전에 HTML 템플릿과 컴포넌트를 JavaScript 파일로 컴파일합니다. 읽어야 할 템플릿이 없고 클라이언트에서 위험한 HTML이나 JavaScript 평가를 수행하지 않으므로 주입 공격의 가능성이 줄어듭니다. |

<!--
## Choosing a compiler
-->

<a id="choosing-a-compiler"></a>

## 컴파일러 선택하기

<!--
Angular offers two ways to compile your application:

| Angular compile       | Details                                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------ |
| Just-in-Time \(JIT\)  | Compiles your application in the browser at runtime. This was the default until Angular 8.        |
| Ahead-of-Time \(AOT\) | Compiles your application and libraries at build time. This is the default starting in Angular 9. |

When you run the [`ng build`](cli/build) \(build only\) or [`ng serve`](cli/serve) \(build and serve locally\) CLI commands, the type of compilation \(JIT or AOT\) depends on the value of the `aot` property in your build configuration specified in `angular.json`.
By default, `aot` is set to `true` for new CLI applications.

See the [CLI command reference](cli) and [Building and serving Angular apps](tools/cli/build) for more information.
-->

Angular는 두 가지 애플리케이션 컴파일 방식을 제공합니다:

| Angular 컴파일 방식 | 설명                                                                                     |
| :------------------ | :--------------------------------------------------------------------------------------- |
| 적시 컴파일(JIT)    | 실행 시점에 브라우저에서 애플리케이션을 컴파일합니다. Angular 8까지 기본 방식이었습니다. |
| 사전 컴파일(AOT)    | 빌드 시점에 애플리케이션과 라이브러리를 컴파일합니다. Angular 9부터 기본 방식입니다.     |

CLI의 [`ng build`](cli/build)(빌드만 수행) 또는 [`ng serve`](cli/serve)(빌드 후 로컬에서 제공) 명령어를 실행할 때 컴파일 방식(JIT 또는 AOT)은 `angular.json`의 빌드 설정에 지정한 `aot` 프로퍼티 값에 따라 결정됩니다.
새 CLI 애플리케이션에서는 기본적으로 `aot`가 `true`로 설정됩니다.

자세한 내용은 [CLI 명령어 레퍼런스](cli)와 [Angular 앱 빌드하고 실행하기](tools/cli/build)를 참고하세요.

<!--
## How AOT works
-->

<a id="how-aot-works"></a>

## AOT 동작 방식

<!--
The Angular AOT compiler extracts **metadata** to interpret the parts of the application that Angular is supposed to manage.
You can specify the metadata explicitly in **decorators** such as `@Component()`, or implicitly in the constructor declarations of the decorated classes.
The metadata tells Angular how to construct instances of your application classes and interact with them at runtime.

In the following example, the `@Component()` metadata object and the class constructor tell Angular how to create and display an instance of `Typical`.

```angular-ts
@Component({
  selector: 'app-typical',
  template: '<div>A typical component for {{data().name}}</div>',
})
export class Typical {
  data = input.required<TypicalData>();
  private someService = inject(SomeService);
}
```

The Angular compiler extracts the metadata _once_ and generates a _factory_ for `Typical`.
When it needs to create a `Typical` instance, Angular calls the factory, which produces a new visual element, bound to a new instance of the component class with its injected dependency.
-->

Angular AOT 컴파일러는 Angular가 관리해야 하는 애플리케이션의 부분을 해석하기 위해 **메타데이터**를 추출합니다.
메타데이터는 `@Component()`와 같은 **데코레이터**에 명시적으로 지정하거나 데코레이터가 적용된 클래스의 생성자 선언에 암묵적으로 지정할 수 있습니다.
메타데이터는 애플리케이션 클래스의 인스턴스를 생성하고 실행 시점에 상호작용하는 방법을 Angular에 알려줍니다.

다음 예제에서 `@Component()` 메타데이터 객체와 클래스 생성자는 Angular에 `Typical` 인스턴스를 만들고 표시하는 방법을 알려줍니다.

```angular-ts
@Component({
  selector: 'app-typical',
  template: '<div>A typical component for {{data().name}}</div>',
})
export class Typical {
  data = input.required<TypicalData>();
  private someService = inject(SomeService);
}
```

Angular 컴파일러는 메타데이터를 _한 번_ 추출하고 `Typical`의 _팩토리_ 를 생성합니다.
`Typical` 인스턴스가 필요하면 Angular는 팩토리를 호출합니다.
팩토리는 의존성이 주입된 새 컴포넌트 클래스 인스턴스와 바인딩된 새 화면 엘리먼트를 생성합니다.

<!--
### Compilation phases
-->

<a id="compilation-phases"></a>

### 컴파일 단계

<!--
There are three phases of AOT compilation.

|     | Phase                  | Details                                                                                                                                                                                                                                                                                                                     |
| :-- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | code analysis          | In this phase, the TypeScript compiler and _AOT collector_ create a representation of the source. The collector does not attempt to interpret the metadata it collects. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.                                           |
| 2   | code generation        | In this phase, the compiler's `StaticReflector` interprets the metadata collected in phase 1, performs additional validation of the metadata, and throws an error if it detects a metadata restriction violation.                                                                                                           |
| 3   | template type checking | In this phase, the Angular _template compiler_ uses the TypeScript compiler to validate the binding expressions in templates. Strict checking in this phase is enabled by default and controlled by the `strictTemplates` configuration option; see [Angular compiler options](reference/configs/angular-compiler-options). |
-->

AOT 컴파일은 세 단계로 진행됩니다.

| 순서 | 단계             | 설명                                                                                                                                                                                                                                                                           |
| :--- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | 코드 분석        | TypeScript 컴파일러와 _AOT 수집기_ 가 소스를 표현하는 데이터를 생성합니다. 수집기는 수집한 메타데이터를 해석하지 않습니다. 가능한 범위에서 메타데이터를 표현하고 메타데이터 문법 위반을 발견하면 오류를 기록합니다.                                                            |
| 2    | 코드 생성        | 컴파일러의 `StaticReflector`가 1단계에서 수집한 메타데이터를 해석하고 추가로 검증하며, 메타데이터 제약 위반을 발견하면 오류를 발생시킵니다.                                                                                                                                    |
| 3    | 템플릿 타입 검사 | 이 단계에서 Angular _템플릿 컴파일러_ 가 TypeScript 컴파일러를 사용해서 템플릿의 바인딩 표현식을 검증합니다. 엄격한 검사는 기본적으로 활성화되며 `strictTemplates` 설정 옵션으로 제어합니다. [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)을 참고하세요. |

<!--
### Metadata restrictions
-->

<a id="metadata-restrictions"></a>

### 메타데이터 제약

<!--
You write metadata in a _subset_ of TypeScript that must conform to the following general constraints:

- Limit [expression syntax](#expression-syntax-limitations) to the supported subset of JavaScript
- Only reference exported symbols after [code folding](#code-folding)
- Only call [functions supported](#supported-classes-and-functions) by the compiler
- Input/Outputs and data-bound class members must be public or protected.For additional guidelines and instructions on preparing an application for AOT compilation, see [Angular: Writing AOT-friendly applications](https://medium.com/sparkles-blog/angular-writing-aot-friendly-applications-7b64c8afbe3f).

HELPFUL: Errors in AOT compilation commonly occur because of metadata that does not conform to the compiler's requirements \(as described more fully below\).
For help in understanding and resolving these problems, see [AOT Metadata Errors](tools/cli/aot-metadata-errors).
-->

메타데이터는 TypeScript의 _일부 문법_ 으로 작성하며 다음 일반 제약을 따라야 합니다:

- [표현식 문법](#expression-syntax-limitations)은 지원되는 JavaScript 문법으로 제한합니다.
- [코드 접기](#code-folding) 이후에는 내보낸 심볼만 참조합니다.
- 컴파일러가 [지원하는 함수](#supported-classes-and-functions)만 호출합니다.
- 입력/출력과 데이터 바인딩에 사용하는 클래스 멤버는 public 또는 protected여야 합니다.
  AOT 컴파일에 맞춰 애플리케이션을 준비하는 추가 지침은 [Angular: AOT에 적합한 애플리케이션 작성하기](https://medium.com/sparkles-blog/angular-writing-aot-friendly-applications-7b64c8afbe3f)를 참고하세요.

도움말: AOT 컴파일 오류는 아래에서 자세히 설명하는 컴파일러 요구사항을 충족하지 못하는 메타데이터 때문에 발생하는 경우가 많습니다.
이러한 문제를 이해하고 해결하는 방법은 [AOT 메타데이터 오류](tools/cli/aot-metadata-errors)를 참고하세요.

<!--
### Configuring AOT compilation
-->

<a id="configuring-aot-compilation"></a>

### AOT 컴파일 설정하기

<!--
You can provide options in the [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) that controls the compilation process.
See [Angular compiler options](reference/configs/angular-compiler-options) for a complete list of available options.
-->

[TypeScript 설정 파일](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)에 옵션을 지정해서 컴파일 과정을 제어할 수 있습니다.
사용할 수 있는 모든 옵션은 [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)을 참고하세요.

<!--
## Phase 1: Code analysis
-->

<a id="phase-1-code-analysis"></a>

## 1단계: 코드 분석

<!--
The TypeScript compiler does some of the analytic work of the first phase.
It emits the `.d.ts` _type definition files_ with type information that the AOT compiler needs to generate application code.
At the same time, the AOT **collector** analyzes the metadata recorded in the Angular decorators and outputs metadata information in **`.metadata.json`** files, one per `.d.ts` file.

You can think of `.metadata.json` as a diagram of the overall structure of a decorator's metadata, represented as an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

HELPFUL: Angular's [schema.ts](https://github.com/angular/angular/blob/12.2.x/packages/compiler-cli/src/metadata/schema.ts) describes the JSON format as a collection of TypeScript interfaces.
-->

첫 번째 단계의 분석 작업 일부는 TypeScript 컴파일러가 수행합니다.
AOT 컴파일러가 애플리케이션 코드를 생성하는 데 필요한 타입 정보를 담은 `.d.ts` _타입 정의 파일_ 을 출력합니다.
동시에 AOT **수집기**는 Angular 데코레이터에 기록된 메타데이터를 분석하고 각 `.d.ts` 파일에 대응하는 **`.metadata.json`** 파일에 메타데이터 정보를 출력합니다.

`.metadata.json`은 데코레이터 메타데이터의 전체 구조를 [추상 구문 트리(AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)로 표현한 도식이라고 생각하면 됩니다.

도움말: Angular의 [schema.ts](https://github.com/angular/angular/blob/12.2.x/packages/compiler-cli/src/metadata/schema.ts)는 TypeScript 인터페이스 집합으로 JSON 형식을 설명합니다.

<!--
### Expression syntax limitations
-->

<a id="expression-syntax-limitations"></a>

### 표현식 문법의 제한

<!--
The AOT collector only understands a subset of JavaScript.
Define metadata objects with the following limited syntax:

| Syntax                    | Example                                                    |
| :------------------------ | :--------------------------------------------------------- |
| Literal object            | `{cherry: true, apple: true, mincemeat: false}`            |
| Literal array             | `['cherries', 'flour', 'sugar']`                           |
| Spread in literal array   | `['apples', 'flour', …]`                                   |
| Calls                     | `bake(ingredients)`                                        |
| New                       | `new Oven()`                                               |
| Property access           | `pie.slice`                                                |
| Array index               | `ingredients[0]`                                           |
| Identity reference        | `Component`                                                |
| A template string         | <code>`pie is ${multiplier} times better than cake`</code> |
| Literal string            | `'pi'`                                                     |
| Literal number            | `3.14153265`                                               |
| Literal boolean           | `true`                                                     |
| Literal null              | `null`                                                     |
| Supported prefix operator | `!cake`                                                    |
| Supported binary operator | `a+b`                                                      |
| Conditional operator      | `a ? b : c`                                                |
| Parentheses               | `(a+b)`                                                    |

If an expression uses unsupported syntax, the collector writes an error node to the `.metadata.json` file.
The compiler later reports the error if it needs that piece of metadata to generate the application code.

HELPFUL: If you want `ngc` to report syntax errors immediately rather than produce a `.metadata.json` file with errors, set the `strictMetadataEmit` option in the TypeScript configuration file.

```json

"angularCompilerOptions": {
  …
  "strictMetadataEmit" : true
}

```

Angular libraries have this option to ensure that all Angular `.metadata.json` files are clean and it is a best practice to do the same when building your own libraries.
-->

AOT 수집기는 JavaScript 문법의 일부만 이해합니다.
메타데이터 객체는 다음과 같이 제한된 문법으로 정의하세요:

| 문법                    | 예제                                                       |
| :---------------------- | :--------------------------------------------------------- |
| 객체 리터럴             | `{cherry: true, apple: true, mincemeat: false}`            |
| 배열 리터럴             | `['cherries', 'flour', 'sugar']`                           |
| 배열 리터럴의 전개 구문 | `['apples', 'flour', …]`                                   |
| 호출                    | `bake(ingredients)`                                        |
| new                     | `new Oven()`                                               |
| 프로퍼티 접근           | `pie.slice`                                                |
| 배열 인덱스             | `ingredients[0]`                                           |
| 식별자 참조             | `Component`                                                |
| 템플릿 문자열           | <code>`pie is ${multiplier} times better than cake`</code> |
| 문자열 리터럴           | `'pi'`                                                     |
| 숫자 리터럴             | `3.14153265`                                               |
| 불리언 리터럴           | `true`                                                     |
| null 리터럴             | `null`                                                     |
| 지원되는 전위 연산자    | `!cake`                                                    |
| 지원되는 이항 연산자    | `a+b`                                                      |
| 조건 연산자             | `a ? b : c`                                                |
| 괄호                    | `(a+b)`                                                    |

표현식에 지원하지 않는 문법을 사용하면 수집기가 `.metadata.json` 파일에 오류 노드를 기록합니다.
나중에 애플리케이션 코드를 생성할 때 해당 메타데이터가 필요하면 컴파일러가 오류를 보고합니다.

도움말: 오류가 포함된 `.metadata.json` 파일을 생성하는 대신 `ngc`가 즉시 문법 오류를 보고하게 하려면 TypeScript 설정 파일에서 `strictMetadataEmit` 옵션을 설정하세요.

```json

"angularCompilerOptions": {
  …
  "strictMetadataEmit" : true
}

```

Angular 라이브러리는 모든 Angular `.metadata.json` 파일에 오류가 없도록 이 옵션을 사용합니다.
직접 라이브러리를 빌드할 때도 같은 설정을 사용하는 것이 좋습니다.

<!--
### Code folding
-->

<a id="code-folding"></a>

### 코드 접기

<!--
The compiler can only resolve references to **_exported_** symbols.
The collector, however, can evaluate an expression during collection and record the result in the `.metadata.json`, rather than the original expression.
This allows you to make limited use of non-exported symbols within expressions.

For example, the collector can evaluate the expression `1 + 2 + 3 + 4` and replace it with the result, `10`.
This process is called _folding_.
An expression that can be reduced in this manner is _foldable_.

The collector can evaluate references to module-local `const` declarations and initialized `var` and `let` declarations, effectively removing them from the `.metadata.json` file.

Consider the following component definition:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template,
})
export class Hero {
  hero = input.required<Hero>();
}
```

The compiler could not refer to the `template` constant because it isn't exported.
The collector, however, can fold the `template` constant into the metadata definition by in-lining its contents.
The effect is the same as if you had written:

```angular-ts
@Component({
  selector: 'app-hero',
  template: '<div>{{hero().name}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

There is no longer a reference to `template` and, therefore, nothing to trouble the compiler when it later interprets the _collector's_ output in `.metadata.json`.

You can take this example a step further by including the `template` constant in another expression:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template + '<div>{{hero().title}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

The collector reduces this expression to its equivalent _folded_ string:

```angular-ts
'<div>{{hero().name}}</div><div>{{hero().title}}</div>';
```
-->

컴파일러는 **_내보낸_** 심볼의 참조만 해석할 수 있습니다.
하지만 수집기는 수집 과정에서 표현식을 평가하고 원래 표현식 대신 결과를 `.metadata.json`에 기록할 수 있습니다.
따라서 표현식 안에서 내보내지 않은 심볼도 제한적으로 사용할 수 있습니다.

예를 들어 수집기는 `1 + 2 + 3 + 4` 표현식을 평가해서 결과인 `10`으로 대체할 수 있습니다.
이 과정을 _접기(folding)_ 라고 합니다.
이렇게 줄일 수 있는 표현식은 _접을 수 있는 표현식_ 입니다.

수집기는 모듈 내부의 `const` 선언과 초기화된 `var`, `let` 선언에 대한 참조를 평가해서 `.metadata.json` 파일에서 사실상 제거할 수 있습니다.

다음 컴포넌트 정의를 살펴봅시다:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template,
})
export class Hero {
  hero = input.required<Hero>();
}
```

`template` 상수는 내보내지 않았으므로 컴파일러가 참조할 수 없습니다.
하지만 수집기는 `template` 상수의 내용을 인라인으로 넣어서 메타데이터 정의에 접어 넣을 수 있습니다.
이는 다음과 같이 작성한 것과 같습니다:

```angular-ts
@Component({
  selector: 'app-hero',
  template: '<div>{{hero().name}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

이제 `template` 참조가 없으므로 컴파일러가 나중에 `.metadata.json`에 기록된 _수집기의_ 출력을 해석할 때 문제가 발생하지 않습니다.

이 예제에서 더 나아가 `template` 상수를 다른 표현식에 포함할 수도 있습니다:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template + '<div>{{hero().title}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

수집기는 이 표현식을 동일한 의미의 _접힌_ 문자열로 줄입니다:

```angular-ts
'<div>{{hero().name}}</div><div>{{hero().title}}</div>';
```

<!--
#### Foldable syntax
-->

<a id="foldable-syntax"></a>

#### 접을 수 있는 문법

<!--
The following table describes which expressions the collector can and cannot fold:

| Syntax                           | Foldable                                 |
| :------------------------------- | :--------------------------------------- |
| Literal object                   | yes                                      |
| Literal array                    | yes                                      |
| Spread in literal array          | no                                       |
| Calls                            | no                                       |
| New                              | no                                       |
| Property access                  | yes, if target is foldable               |
| Array index                      | yes, if target and index are foldable    |
| Identity reference               | yes, if it is a reference to a local     |
| A template with no substitutions | yes                                      |
| A template with substitutions    | yes, if the substitutions are foldable   |
| Literal string                   | yes                                      |
| Literal number                   | yes                                      |
| Literal boolean                  | yes                                      |
| Literal null                     | yes                                      |
| Supported prefix operator        | yes, if operand is foldable              |
| Supported binary operator        | yes, if both left and right are foldable |
| Conditional operator             | yes, if condition is foldable            |
| Parentheses                      | yes, if the expression is foldable       |

If an expression is not foldable, the collector writes it to `.metadata.json` as an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) for the compiler to resolve.
-->

수집기가 접을 수 있는 표현식과 접을 수 없는 표현식은 다음과 같습니다:

| 문법                    | 접기 가능 여부                                  |
| :---------------------- | :---------------------------------------------- |
| 객체 리터럴             | 가능                                            |
| 배열 리터럴             | 가능                                            |
| 배열 리터럴의 전개 구문 | 불가능                                          |
| 호출                    | 불가능                                          |
| new                     | 불가능                                          |
| 프로퍼티 접근           | 대상이 접을 수 있는 표현식이면 가능             |
| 배열 인덱스             | 대상과 인덱스 모두 접을 수 있는 표현식이면 가능 |
| 식별자 참조             | 로컬 참조이면 가능                              |
| 치환이 없는 템플릿      | 가능                                            |
| 치환이 있는 템플릿      | 치환 부분을 접을 수 있으면 가능                 |
| 문자열 리터럴           | 가능                                            |
| 숫자 리터럴             | 가능                                            |
| 불리언 리터럴           | 가능                                            |
| null 리터럴             | 가능                                            |
| 지원되는 전위 연산자    | 피연산자를 접을 수 있으면 가능                  |
| 지원되는 이항 연산자    | 왼쪽과 오른쪽 모두 접을 수 있으면 가능          |
| 조건 연산자             | 조건을 접을 수 있으면 가능                      |
| 괄호                    | 표현식을 접을 수 있으면 가능                    |

표현식을 접을 수 없으면 수집기는 컴파일러가 해석할 수 있도록 `.metadata.json`에 [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)로 기록합니다.

<!--
## Phase 2: code generation
-->

<a id="phase-2-code-generation"></a>

## 2단계: 코드 생성

<!--
The collector makes no attempt to understand the metadata that it collects and outputs to `.metadata.json`.
It represents the metadata as best it can and records errors when it detects a metadata syntax violation.
It's the compiler's job to interpret the `.metadata.json` in the code generation phase.

The compiler understands all syntax forms that the collector supports, but it may reject _syntactically_ correct metadata if the _semantics_ violate compiler rules.
-->

수집기는 수집해서 `.metadata.json`에 출력하는 메타데이터를 이해하려고 하지 않습니다.
가능한 범위에서 메타데이터를 표현하고 문법 위반을 발견하면 오류를 기록합니다.
코드 생성 단계에서 `.metadata.json`을 해석하는 것은 컴파일러의 역할입니다.

컴파일러는 수집기가 지원하는 모든 문법 형식을 이해합니다.
하지만 _문법적으로_ 올바른 메타데이터라도 _의미_ 가 컴파일러 규칙에 어긋나면 거부할 수 있습니다.

<!--
### Public or protected symbols
-->

<a id="public-or-protected-symbols"></a>

### public 또는 protected 심볼

<!--
The compiler can only reference _exported symbols_.

- Decorated component class members must be public or protected.
  You cannot make an `input()` property private.

- Data bound properties must also be public or protected
-->

컴파일러는 _내보낸 심볼_ 만 참조할 수 있습니다.

- 데코레이터가 적용된 컴포넌트 클래스 멤버는 public 또는 protected여야 합니다.
  `input()` 프로퍼티를 private으로 지정할 수 없습니다.

- 데이터 바인딩에 사용하는 프로퍼티도 public 또는 protected여야 합니다.

<!--
### Supported classes and functions
-->

<a id="supported-classes-and-functions"></a>

### 지원하는 클래스와 함수

<!--
The collector can represent a function call or object creation with `new` as long as the syntax is valid.
The compiler, however, can later refuse to generate a call to a _particular_ function or creation of a _particular_ object.

The compiler can only create instances of certain classes, supports only core decorators, and only supports calls to macros \(functions or static methods\) that return expressions.

| Compiler action      | Details                                                                                                              |
| :------------------- | :------------------------------------------------------------------------------------------------------------------- |
| New instances        | The compiler only allows metadata that create instances of the class `InjectionToken` from `@angular/core`.          |
| Supported decorators | The compiler only supports metadata for the [Angular decorators in the `@angular/core` module](/api?type=decorator). |
-->

수집기는 문법이 올바르다면 함수 호출이나 `new`를 사용한 객체 생성을 표현할 수 있습니다.
하지만 컴파일러는 나중에 _특정_ 함수 호출이나 _특정_ 객체 생성을 위한 코드 생성을 거부할 수 있습니다.

컴파일러는 특정 클래스의 인스턴스만 생성할 수 있고, 핵심 데코레이터만 지원하며, 표현식을 반환하는 매크로(함수 또는 정적 메서드)의 호출만 지원합니다.

| 컴파일러 동작       | 설명                                                                                                        |
| :------------------ | :---------------------------------------------------------------------------------------------------------- |
| 새 인스턴스         | 컴파일러는 `@angular/core`의 `InjectionToken` 클래스 인스턴스를 생성하는 메타데이터만 허용합니다.           |
| 지원하는 데코레이터 | 컴파일러는 [`@angular/core` 모듈의 Angular 데코레이터](/api?type=decorator)에 대한 메타데이터만 지원합니다. |

<!--
### Functions and static method calls
-->

<a id="functions-and-static-method-calls"></a>

### 함수와 정적 메서드 호출

<!--
The collector accepts any function or static method that contains a single `return` statement.
The compiler, however, only supports macros in the form of functions or static methods that return an _expression_.

For example, consider the following function:

```ts
export function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

You can call the `wrapInArray` in a metadata definition because it returns the value of an expression that conforms to the compiler's restrictive JavaScript subset.

You might use `wrapInArray()` like this:

```ts
@NgModule({
  declarations: wrapInArray(Typical),
})
export class TypicalModule {}
```

The compiler treats this usage as if you had written:

```ts
@NgModule({
  declarations: [Typical],
})
export class TypicalModule {}
```

The Angular [`RouterModule`](api/router/RouterModule) exports two macro static methods, `forRoot` and `forChild`, to help declare root and child routes.
Review the [source code](https://github.com/angular/angular/blob/main/packages/router/src/router_module.ts#L139 'RouterModule.forRoot source code')
for these methods to see how macros can simplify configuration of complex [NgModules](guide/ngmodules/overview).
-->

수집기는 하나의 `return` 구문을 포함하는 모든 함수나 정적 메서드를 받아들입니다.
하지만 컴파일러는 _표현식_ 을 반환하는 함수나 정적 메서드 형태의 매크로만 지원합니다.

예를 들어 다음 함수를 살펴봅시다:

```ts
export function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

`wrapInArray`는 컴파일러가 제한적으로 지원하는 JavaScript 문법을 따르는 표현식의 값을 반환하므로 메타데이터 정의에서 호출할 수 있습니다.

`wrapInArray()`는 다음과 같이 사용할 수 있습니다:

```ts
@NgModule({
  declarations: wrapInArray(Typical),
})
export class TypicalModule {}
```

컴파일러는 이를 다음과 같이 작성한 것으로 처리합니다:

```ts
@NgModule({
  declarations: [Typical],
})
export class TypicalModule {}
```

Angular의 [`RouterModule`](api/router/RouterModule)은 최상위 및 하위 라우팅 규칙을 쉽게 선언하도록 `forRoot`와 `forChild`라는 두 매크로 정적 메서드를 내보냅니다.
이 메서드의 [소스 코드](https://github.com/angular/angular/blob/main/packages/router/src/router_module.ts#L139 'RouterModule.forRoot 소스 코드')를 살펴보고 매크로가 복잡한 [NgModule](guide/ngmodules/overview) 설정을 어떻게 단순하게 만드는지 확인해 보세요.

<!--
## Phase 3: Template type checking
-->

<a id="phase-3-template-type-checking"></a>

## 3단계: 템플릿 타입 검사

<!--
One of the Angular compiler's most helpful features is the ability to type-check expressions within templates, and catch any errors before they cause crashes at runtime.
In the template type-checking phase, the Angular template compiler uses the TypeScript compiler to validate the binding expressions in templates.

Strict checking in this phase is enabled by default and controlled by the compiler option `"strictTemplates"` in the `"angularCompilerOptions"` of the project's TypeScript configuration file
(see [Angular Compiler Options](reference/configs/angular-compiler-options)).

Template validation produces error messages when a type error is detected in a template binding
expression, similar to how type errors are reported by the TypeScript compiler against code in a `.ts`
file.

For example, consider the following component:

```angular-ts
@Component({
  selector: 'my-component',
  template: '{{person.addresss.street}}',
})
class MyComponent {
  person?: Person;
}
```

This produces the following error:

```shell {hideCopy}

my.component.ts.MyComponent.html(1,1): : Property 'addresss' does not exist on type 'Person'. Did you mean 'address'?

```

The file name reported in the error message, `my.component.ts.MyComponent.html`, is a synthetic file
generated by the template compiler that holds contents of the `MyComponent` class template.
The compiler never writes this file to disk.
The line and column numbers are relative to the template string in the `@Component` annotation of the class, `MyComponent` in this case.
If a component uses `templateUrl` instead of `template`, the errors are reported in the HTML file referenced by the `templateUrl` instead of a synthetic file.

The error location is the beginning of the text node that contains the interpolation expression with the error.
If the error is in an attribute binding such as `[value]="person.address.street"`, the error
location is the location of the attribute that contains the error.

The validation uses the TypeScript type checker and the options supplied to the TypeScript compiler to control how detailed the type validation is.
For example, if the `strictNullChecks` TypeScript option is enabled, the error

```shell {hideCopy}

my.component.ts.MyComponent.html(1,1): : Object is possibly 'undefined'

```

is reported as well as the above error message.
-->

Angular 컴파일러의 가장 유용한 기능 중 하나는 템플릿 안의 표현식에 대해 타입을 검사하고 실행 중 오류가 발생하기 전에 문제를 발견하는 기능입니다.
템플릿 타입 검사 단계에서 Angular 템플릿 컴파일러는 TypeScript 컴파일러로 템플릿의 바인딩 표현식을 검증합니다.

이 단계의 엄격한 검사는 기본적으로 활성화되며 프로젝트의 TypeScript 설정 파일에서 `"angularCompilerOptions"`의 `"strictTemplates"` 컴파일러 옵션으로 제어합니다([Angular 컴파일러 옵션](reference/configs/angular-compiler-options) 참고).

템플릿 검증은 바인딩 표현식에서 타입 오류를 발견하면 오류 메시지를 생성합니다.
TypeScript 컴파일러가 `.ts` 파일의 코드에서 타입 오류를 보고하는 것과 비슷합니다.

예를 들어 다음 컴포넌트를 살펴봅시다:

```angular-ts
@Component({
  selector: 'my-component',
  template: '{{person.addresss.street}}',
})
class MyComponent {
  person?: Person;
}
```

다음 오류가 발생합니다:

```shell {hideCopy}

my.component.ts.MyComponent.html(1,1): : Property 'addresss' does not exist on type 'Person'. Did you mean 'address'?

```

오류 메시지에 표시된 `my.component.ts.MyComponent.html` 파일은 템플릿 컴파일러가 생성한 가상 파일이며 `MyComponent` 클래스의 템플릿 내용이 들어 있습니다.
컴파일러는 이 파일을 디스크에 쓰지 않습니다.
줄과 열 번호는 해당 클래스(이 예제에서는 `MyComponent`)의 `@Component` 어노테이션에 있는 템플릿 문자열을 기준으로 합니다.
컴포넌트가 `template` 대신 `templateUrl`을 사용하면 가상 파일이 아니라 `templateUrl`이 참조하는 HTML 파일을 기준으로 오류를 보고합니다.

오류 위치는 문제가 있는 보간 표현식을 포함한 텍스트 노드의 시작 지점입니다.
`[value]="person.address.street"`와 같은 어트리뷰트 바인딩에 오류가 있으면 해당 어트리뷰트의 위치를 보고합니다.

검증에는 TypeScript 타입 검사기를 사용하며 TypeScript 컴파일러에 전달한 옵션으로 타입 검증의 엄격함을 제어합니다.
예를 들어 TypeScript의 `strictNullChecks` 옵션을 활성화하면 앞의 오류 메시지와 함께 다음 오류도 보고합니다.

```shell {hideCopy}

my.component.ts.MyComponent.html(1,1): : Object is possibly 'undefined'

```

<!--
### Type narrowing
-->

<a id="type-narrowing"></a>

### 타입 좁히기

<!--
The expression used in an `ngIf` directive is used to narrow type unions in the Angular
template compiler, the same way the `if` expression does in TypeScript.
For example, to avoid `Object is possibly 'undefined'` error in the template above, modify it to only emit the interpolation if the value of `person` is initialized as shown below:

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person"> {{person.address.street}} </span>',
})
class MyComponent {
  person?: Person;
}
```

Using `*ngIf` allows the TypeScript compiler to infer that the `person` used in the binding expression will never be `undefined`.

For more information about input type narrowing, see [Improving template type checking for custom directives](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives).
-->

Angular 템플릿 컴파일러는 TypeScript의 `if` 표현식과 같은 방식으로 `ngIf` 디렉티브의 표현식을 사용해서 유니온 타입을 좁힙니다.
예를 들어 앞의 템플릿에서 `Object is possibly 'undefined'` 오류를 피하려면 다음과 같이 `person` 값이 초기화되었을 때만 보간 표현식을 출력하도록 수정하세요:

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person"> {{person.address.street}} </span>',
})
class MyComponent {
  person?: Person;
}
```

`*ngIf`를 사용하면 TypeScript 컴파일러는 바인딩 표현식의 `person`이 절대 `undefined`가 아니라고 추론할 수 있습니다.

입력 타입 좁히기에 대한 자세한 내용은 [커스텀 디렉티브의 템플릿 타입 검사 개선하기](/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives)를 참고하세요.

<!--
### Non-null type assertion operator
-->

<a id="non-null-type-assertion-operator"></a>

### null이 아님을 단언하는 타입 연산자

<!--
Use the non-null type assertion operator to suppress the `Object is possibly 'undefined'` error when it is inconvenient to use `*ngIf` or when some constraint in the component ensures that the expression is always non-null when the binding expression is interpolated.

In the following example, the `person` and `address` properties are always set together, implying that `address` is always non-null if `person` is non-null.
There is no convenient way to describe this constraint to TypeScript and the template compiler, but the error is suppressed in the example by using `address!.street`.

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person"> {{person.name}} lives on {{address!.street}} </span>',
})
class MyComponent {
  person?: Person;
  address?: Address;

  setData(person: Person, address: Address) {
    this.person = person;
    this.address = address;
  }
}
```

The non-null assertion operator should be used sparingly as refactoring of the component might break this constraint.

In this example it is recommended to include the checking of `address` in the `*ngIf` as shown below:

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person && address"> {{person.name}} lives on {{address.street}} </span>',
})
class MyComponent {
  person?: Person;
  address?: Address;

  setData(person: Person, address: Address) {
    this.person = person;
    this.address = address;
  }
}
```
-->

`*ngIf`를 사용하기 불편하거나 컴포넌트의 어떤 제약 때문에 바인딩 표현식을 보간할 때 항상 null이 아님이 보장된다면, null이 아님을 단언하는 타입 연산자로 `Object is possibly 'undefined'` 오류를 억제할 수 있습니다.

다음 예제에서 `person`과 `address` 프로퍼티는 항상 함께 설정되므로 `person`이 null이 아니면 `address`도 항상 null이 아닙니다.
이 제약을 TypeScript와 템플릿 컴파일러에 쉽게 설명할 방법은 없지만 `address!.street`를 사용해서 오류를 억제합니다.

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person"> {{person.name}} lives on {{address!.street}} </span>',
})
class MyComponent {
  person?: Person;
  address?: Address;

  setData(person: Person, address: Address) {
    this.person = person;
    this.address = address;
  }
}
```

컴포넌트를 리팩터링하면 이 제약이 깨질 수 있으므로 null 아님 단언 연산자는 꼭 필요한 경우에만 사용해야 합니다.

이 예제에서는 다음과 같이 `*ngIf`에 `address` 검사도 포함하는 것을 권장합니다:

```angular-ts
@Component({
  selector: 'my-component',
  template: '<span *ngIf="person && address"> {{person.name}} lives on {{address.street}} </span>',
})
class MyComponent {
  person?: Person;
  address?: Address;

  setData(person: Person, address: Address) {
    this.person = person;
    this.address = address;
  }
}
```
