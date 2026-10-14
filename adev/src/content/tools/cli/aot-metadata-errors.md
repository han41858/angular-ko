<!--
# AOT metadata errors
-->

<a id="aot-metadata-errors"></a>

# AOT 메타데이터 오류

<!--
The following are metadata errors you may encounter, with explanations and suggested corrections.
-->

발생할 수 있는 메타데이터 오류와 그 원인, 수정 방법은 다음과 같습니다.

<!--
## Expression form not supported
-->

<a id="expression-form-not-supported"></a>

## 지원하지 않는 표현식 형식

<!--
HELPFUL: The compiler encountered an expression it didn't understand while evaluating Angular metadata.

Language features outside of the compiler's [restricted expression syntax](tools/cli/aot-compiler)
can produce this error, as seen in the following example:

```ts
// ERROR
export class Fooish { … }
…
const prop = typeof Fooish; // typeof is not valid in metadata
  …
  // bracket notation is not valid in metadata
  { provide: 'token', useValue: { [prop]: 'value' } };
  …
```

You can use `typeof` and bracket notation in normal application code.
You just can't use those features within expressions that define Angular metadata.

Avoid this error by sticking to the compiler's [restricted expression syntax](tools/cli/aot-compiler)
when writing Angular metadata
and be wary of new or unusual TypeScript features.
-->

도움말: 컴파일러가 Angular 메타데이터를 평가하는 과정에서 해석할 수 없는 표현식을 만났습니다.

다음 예제처럼 컴파일러의 [제한된 표현식 문법](tools/cli/aot-compiler)에서 벗어난 언어 기능을 사용하면 이 오류가 발생할 수 있습니다:

```ts
// 오류
export class Fooish { … }
…
const prop = typeof Fooish; // 메타데이터에서는 typeof를 사용할 수 없습니다.
  …
  // 메타데이터에서는 대괄호 표기법을 사용할 수 없습니다.
  { provide: 'token', useValue: { [prop]: 'value' } };
  …
```

일반 애플리케이션 코드에서는 `typeof`와 대괄호 표기법을 사용할 수 있습니다.
하지만 Angular 메타데이터를 정의하는 표현식 안에서는 사용할 수 없습니다.

이 오류를 방지하려면 Angular 메타데이터를 작성할 때 컴파일러의 [제한된 표현식 문법](tools/cli/aot-compiler)을 따르고, 새롭거나 일반적이지 않은 TypeScript 기능을 사용할 때 주의하세요.

<!--
## Reference to a local (non-exported) symbol
-->

<a id="reference-to-a-local-non-exported-symbol"></a>

## 내보내지 않은 로컬 심볼 참조

<!--
HELPFUL: Reference to a local \(non-exported\) symbol 'symbol name'. Consider exporting the symbol.

The compiler encountered a reference to a locally defined symbol that either wasn't exported or wasn't initialized.

Here's a `provider` example of the problem.

```ts

// ERROR
let foo: number; // neither exported nor initialized

@Component({
  selector: 'my-component',
  template: … ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

```

The compiler generates the component factory, which includes the `useValue` provider code, in a separate module. _That_ factory module can't reach back to _this_ source module to access the local \(non-exported\) `foo` variable.

You could fix the problem by initializing `foo`.

```ts
let foo = 42; // initialized
```

The compiler will [fold](tools/cli/aot-compiler#code-folding) the expression into the provider as if you had written this.

```ts
providers: [{provide: Foo, useValue: 42}];
```

Alternatively, you can fix it by exporting `foo` with the expectation that `foo` will be assigned at runtime when you actually know its value.

```ts
// CORRECTED
export let foo: number; // exported

@Component({
  selector: 'my-component',
  template: … ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}
```

Adding `export` often works for variables referenced in metadata such as `providers` and `animations` because the compiler can generate _references_ to the exported variables in these expressions. It doesn't need the _values_ of those variables.

Adding `export` doesn't work when the compiler needs the _actual value_
in order to generate code.
For example, it doesn't work for the `template` property.

```ts
// ERROR
export let someTemplate: string; // exported but not initialized

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

The compiler needs the value of the `template` property _right now_ to generate the component factory.
The variable reference alone is insufficient.
Prefixing the declaration with `export` merely produces a new error, "[`Only initialized variables and constants can be referenced`](#only-initialized-variables-and-constants)".
-->

도움말: 내보내지 않은 로컬 심볼 'symbol name'을 참조했습니다.
해당 심볼을 내보내는 것을 고려하세요.

컴파일러가 로컬에 정의된 심볼의 참조를 발견했지만 해당 심볼을 내보내지 않았거나 초기화하지 않았습니다.

다음 `provider` 예제에서 이 문제가 발생합니다.

```ts

// 오류
let foo: number; // 내보내지도 초기화하지도 않았습니다.

@Component({
  selector: 'my-component',
  template: … ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

```

컴파일러는 `useValue` 프로바이더 코드를 포함하는 컴포넌트 팩토리를 별도 모듈에 생성합니다.
_해당_ 팩토리 모듈은 _이_ 소스 모듈의 내보내지 않은 로컬 변수 `foo`에 접근할 수 없습니다.

`foo`를 초기화하면 문제를 해결할 수 있습니다.

```ts
let foo = 42; // 초기화했습니다.
```

컴파일러는 표현식을 [접어서](tools/cli/aot-compiler#code-folding) 다음과 같이 작성한 것처럼 프로바이더에 반영합니다.

```ts
providers: [{provide: Foo, useValue: 42}];
```

또는 실제 값을 알 수 있는 실행 시점에 `foo`에 값을 할당할 계획이라면 `foo`를 내보내서 해결할 수도 있습니다.

```ts
// 수정한 코드
export let foo: number; // 내보냈습니다.

@Component({
  selector: 'my-component',
  template: … ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}
```

`providers`, `animations`와 같은 메타데이터에서 참조하는 변수는 `export`를 추가하면 해결되는 경우가 많습니다.
이러한 표현식에서 컴파일러는 내보낸 변수에 대한 _참조_ 를 생성할 수 있기 때문에 변수의 _값_ 은 필요하지 않습니다.

하지만 컴파일러가 코드를 생성하기 위해 _실제 값_ 을 필요로 한다면 `export`를 추가해도 해결되지 않습니다.
예를 들어 `template` 프로퍼티에서는 이 방법을 사용할 수 없습니다.

```ts
// 오류
export let someTemplate: string; // 내보냈지만 초기화하지 않았습니다.

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

컴포넌트 팩토리를 생성하려면 컴파일러는 `template` 프로퍼티의 값을 _바로 지금_ 알아야 합니다.
변수 참조만으로는 충분하지 않습니다.
선언 앞에 `export`를 추가하면 "[`Only initialized variables and constants can be referenced`](#only-initialized-variables-and-constants)"라는 새로운 오류가 발생할 뿐입니다.

<!--
## Only initialized variables and constants
-->

<a id="only-initialized-variables-and-constants"></a>

## 초기화한 변수와 상수만 참조할 수 있습니다

<!--
HELPFUL: _Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler._

The compiler found a reference to an exported variable or static field that wasn't initialized.
It needs the value of that variable to generate code.

The following example tries to set the component's `template` property to the value of the exported `someTemplate` variable which is declared but _unassigned_.

```ts
// ERROR
export let someTemplate: string;

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

You'd also get this error if you imported `someTemplate` from some other module and neglected to initialize it there.

```ts
// ERROR - not initialized there either
import {someTemplate} from './config';

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

The compiler cannot wait until runtime to get the template information.
It must statically derive the value of the `someTemplate` variable from the source code so that it can generate the component factory, which includes instructions for building the element based on the template.

To correct this error, provide the initial value of the variable in an initializer clause _on the same line_.

```ts
// CORRECTED
export let someTemplate = '<h1>Greetings from Angular</h1>';

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```
-->

도움말: _템플릿 컴파일러가 변수의 값을 알아야 하므로 초기화한 변수와 상수만 참조할 수 있습니다._

컴파일러가 내보낸 변수나 정적 필드의 참조를 발견했지만 해당 변수나 필드를 초기화하지 않았습니다.
코드를 생성하려면 해당 변수의 값이 필요합니다.

다음 예제는 선언만 하고 _값을 할당하지 않은_ `someTemplate` 변수를 내보낸 뒤 그 값으로 컴포넌트의 `template` 프로퍼티를 설정하려고 합니다.

```ts
// 오류
export let someTemplate: string;

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

다른 모듈에서 `someTemplate`을 가져오더라도 해당 모듈에서 초기화하지 않았다면 같은 오류가 발생합니다.

```ts
// 오류: 가져온 모듈에서도 초기화하지 않았습니다.
import {someTemplate} from './config';

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

컴파일러는 템플릿 정보를 얻기 위해 실행 시점까지 기다릴 수 없습니다.
소스 코드에서 `someTemplate` 변수의 값을 정적으로 알아내야 템플릿에 따라 엘리먼트를 구성하는 명령을 포함한 컴포넌트 팩토리를 생성할 수 있습니다.

이 오류를 수정하려면 선언과 _같은 줄에서_ 초기화 구문으로 변수의 초기값을 지정하세요.

```ts
// 수정한 코드
export let someTemplate = '<h1>Greetings from Angular</h1>';

@Component({
  selector: 'my-component',
  template: someTemplate,
})
export class MyComponent {}
```

<!--
## Reference to a non-exported class
-->

<a id="reference-to-a-non-exported-class"></a>

## 내보내지 않은 클래스 참조

<!--
HELPFUL: _Reference to a non-exported class `<class name>`._
_Consider exporting the class._

Metadata referenced a class that wasn't exported.

For example, you may have defined a class and used it as an injection token in a providers array but neglected to export that class.

```ts
// ERROR
abstract class MyStrategy { }

  …
  providers: [
    { provide: MyStrategy, useValue: … }
  ]
  …
```

Angular generates a class factory in a separate module and that factory [can only access exported classes](tools/cli/aot-compiler#public-or-protected-symbols).
To correct this error, export the referenced class.

```ts
// CORRECTED
export abstract class MyStrategy { }

  …
  providers: [
    { provide: MyStrategy, useValue: … }
  ]
  …
```
-->

도움말: _내보내지 않은 클래스 `<class name>`을 참조했습니다._
_해당 클래스를 내보내는 것을 고려하세요._

메타데이터가 내보내지 않은 클래스를 참조했습니다.

예를 들어 클래스를 정의하고 프로바이더 배열에서 주입 토큰으로 사용했지만 해당 클래스를 내보내지 않았을 수 있습니다.

```ts
// 오류
abstract class MyStrategy { }

  …
  providers: [
    { provide: MyStrategy, useValue: … }
  ]
  …
```

Angular는 별도 모듈에 클래스 팩토리를 생성하며 이 팩토리는 [내보낸 클래스에만 접근할 수 있습니다](tools/cli/aot-compiler#public-or-protected-symbols).
이 오류를 수정하려면 참조하는 클래스를 내보내세요.

```ts
// 수정한 코드
export abstract class MyStrategy { }

  …
  providers: [
    { provide: MyStrategy, useValue: … }
  ]
  …
```

<!--
## Destructured variable or constant not supported
-->

<a id="destructured-variable-or-constant-not-supported"></a>

## 구조 분해한 변수나 상수는 지원하지 않습니다

<!--
HELPFUL: _Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring._

The compiler does not support references to variables assigned by [destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

For example, you cannot write something like this:

```ts
// ERROR
import { configuration } from './configuration';

// destructured assignment to foo and bar
const {foo, bar} = configuration;
  …
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  …
```

To correct this error, refer to non-destructured values.

```ts
// CORRECTED
import { configuration } from './configuration';
  …
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  …
```
-->

도움말: _템플릿 컴파일러는 내보낸 구조 분해 변수나 상수의 참조를 지원하지 않습니다.
구조 분해를 사용하지 않도록 코드를 단순하게 작성해 보세요._

컴파일러는 [구조 분해](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring)로 값을 할당한 변수의 참조를 지원하지 않습니다.

예를 들어 다음과 같이 작성할 수 없습니다:

```ts
// 오류
import { configuration } from './configuration';

// 구조 분해로 foo와 bar에 값을 할당합니다.
const {foo, bar} = configuration;
  …
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  …
```

이 오류를 수정하려면 구조 분해하지 않은 값을 참조하세요.

```ts
// 수정한 코드
import { configuration } from './configuration';
  …
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  …
```

<!--
## Could not resolve type
-->

<a id="could-not-resolve-type"></a>

## 타입을 확인할 수 없습니다

<!--
HELPFUL: _The compiler encountered a type and can't determine which module exports that type._

This can happen if you refer to an ambient type.
For example, the `Window` type is an ambient type declared in the global `.d.ts` file.

You'll get an error if you reference it in the component constructor, which the compiler must statically analyze.

```ts
// ERROR
@Component({ })
export class MyComponent {
  constructor (private win: Window) { … }
}
```

TypeScript understands ambient types so you don't import them.
The Angular compiler does not understand a type that you neglect to export or import.

In this case, the compiler doesn't understand how to inject something with the `Window` token.

Do not refer to ambient types in metadata expressions.

If you must inject an instance of an ambient type,
you can finesse the problem in four steps:

1. Create an injection token for an instance of the ambient type.
1. Create a factory function that returns that instance.
1. Add a `useFactory` provider with that factory function.
1. Use `@Inject` to inject the instance.

Here's an illustrative example.

```ts
// CORRECTED
import { Inject } from '@angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

@Component({
  …
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (@Inject(WINDOW) private win: Window) { … }
}
```

The `Window` type in the constructor is no longer a problem for the compiler because it
uses the `@Inject(WINDOW)` to generate the injection code.

Angular does something similar with the `DOCUMENT` token so you can inject the browser's `document` object \(or an abstraction of it, depending upon the platform in which the application runs\).

```ts
import { Inject }   from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({ … })
export class MyComponent {
  constructor (@Inject(DOCUMENT) private doc: Document) { … }
}
```
-->

도움말: _컴파일러가 타입을 발견했지만 어느 모듈이 해당 타입을 내보내는지 확인할 수 없습니다._

주변 환경 타입(ambient type)을 참조하면 이 문제가 발생할 수 있습니다.
예를 들어 `Window` 타입은 전역 `.d.ts` 파일에 선언된 주변 환경 타입입니다.

컴파일러가 정적으로 분석해야 하는 컴포넌트 생성자에서 이 타입을 참조하면 오류가 발생합니다.

```ts
// 오류
@Component({ })
export class MyComponent {
  constructor (private win: Window) { … }
}
```

TypeScript는 주변 환경 타입을 이해하기 때문에 따로 가져올 필요가 없습니다.
하지만 Angular 컴파일러는 내보내거나 가져오지 않은 타입을 이해하지 못합니다.

이 경우 컴파일러는 `Window` 토큰으로 어떻게 의존성을 주입해야 하는지 알지 못합니다.

메타데이터 표현식에서 주변 환경 타입을 참조하지 마세요.

주변 환경 타입의 인스턴스를 반드시 주입해야 한다면 다음 네 단계로 해결할 수 있습니다:

1. 주변 환경 타입의 인스턴스를 위한 주입 토큰을 만듭니다.
1. 해당 인스턴스를 반환하는 팩토리 함수를 만듭니다.
1. 이 팩토리 함수를 사용하는 `useFactory` 프로바이더를 추가합니다.
1. `@Inject`로 인스턴스를 주입합니다.

다음 예제를 참고하세요.

```ts
// 수정한 코드
import { Inject } from '@angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

@Component({
  …
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (@Inject(WINDOW) private win: Window) { … }
}
```

컴파일러는 `@Inject(WINDOW)`를 사용해서 주입 코드를 생성하므로 생성자의 `Window` 타입은 더 이상 문제가 되지 않습니다.

Angular는 `DOCUMENT` 토큰에도 비슷한 방식을 사용합니다.
따라서 브라우저의 `document` 객체 또는 애플리케이션이 실행되는 플랫폼에 따른 추상화 객체를 주입할 수 있습니다.

```ts
import { Inject }   from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({ … })
export class MyComponent {
  constructor (@Inject(DOCUMENT) private doc: Document) { … }
}
```

<!--
## Name expected
-->

<a id="name-expected"></a>

## 이름이 필요합니다

<!--
HELPFUL: _The compiler expected a name in an expression it was evaluating._

This can happen if you use a number as a property name as in the following example.

```ts
// ERROR
provider: [{provide: Foo, useValue: {0: 'test'}}];
```

Change the name of the property to something non-numeric.

```ts
// CORRECTED
provider: [{provide: Foo, useValue: {'0': 'test'}}];
```
-->

도움말: _컴파일러가 평가하는 표현식에 이름이 필요합니다._

다음 예제처럼 프로퍼티 이름에 숫자를 사용하면 이 문제가 발생할 수 있습니다.

```ts
// 오류
provider: [{provide: Foo, useValue: {0: 'test'}}];
```

프로퍼티 이름을 숫자가 아닌 값으로 변경하세요.

```ts
// 수정한 코드
provider: [{provide: Foo, useValue: {'0': 'test'}}];
```

<!--
## Unsupported enum member name
-->

<a id="unsupported-enum-member-name"></a>

## 지원하지 않는 열거형 멤버 이름

<!--
HELPFUL: _Angular couldn't determine the value of the [enum member](https://www.typescriptlang.org/docs/handbook/enums.html) that you referenced in metadata._

The compiler can understand simple enum values but not complex values such as those derived from computed properties.

```ts
// ERROR
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // computed
}

  …
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // ok
    { provide: DangerColor, useValue: Colors.Red }   // ok
    { provide: StrongColor, useValue: Colors.Blue }  // bad
  ]
  …
```

Avoid referring to enums with complicated initializers or computed properties.
-->

도움말: _Angular가 메타데이터에서 참조한 [열거형 멤버](https://www.typescriptlang.org/docs/handbook/enums.html)의 값을 확인할 수 없습니다._

컴파일러는 단순한 열거형 값은 이해하지만 계산된 프로퍼티에서 얻는 값과 같은 복잡한 값은 이해하지 못합니다.

```ts
// 오류
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // 계산된 값
}

  …
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // 정상
    { provide: DangerColor, useValue: Colors.Red }   // 정상
    { provide: StrongColor, useValue: Colors.Blue }  // 오류
  ]
  …
```

복잡한 초기화 구문이나 계산된 프로퍼티를 가진 열거형은 참조하지 마세요.

<!--
## Tagged template expressions are not supported
-->

<a id="tagged-template-expressions-are-not-supported"></a>

## 태그드 템플릿 표현식은 지원하지 않습니다

<!--
HELPFUL: _Tagged template expressions are not supported in metadata._

The compiler encountered a JavaScript ES2015 [tagged template expression](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) such as the following.

```ts

// ERROR
const expression = 'funky';
const raw = String.raw`A tagged template ${expression} string`;
 …
 template: '<div>' + raw + '</div>'
 …

```

[`String.raw()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/raw) is a _tag function_ native to JavaScript ES2015.

The AOT compiler does not support tagged template expressions; avoid them in metadata expressions.
-->

도움말: _메타데이터에서는 태그드 템플릿 표현식을 지원하지 않습니다._

컴파일러가 다음과 같은 JavaScript ES2015 [태그드 템플릿 표현식](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals)을 발견했습니다.

```ts

// 오류
const expression = 'funky';
const raw = String.raw`A tagged template ${expression} string`;
 …
 template: '<div>' + raw + '</div>'
 …

```

[`String.raw()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/raw)는 JavaScript ES2015에 내장된 _태그 함수_ 입니다.

AOT 컴파일러는 태그드 템플릿 표현식을 지원하지 않으므로 메타데이터 표현식에서 사용하지 마세요.

<!--
## Symbol reference expected
-->

<a id="symbol-reference-expected"></a>

## 심볼 참조가 필요합니다

<!--
HELPFUL: _The compiler expected a reference to a symbol at the location specified in the error message._

This error can occur if you use an expression in the `extends` clause of a class.

<!-todo: Chuck: After reviewing your PR comment I'm still at a loss. See [comment there](https://github.com/angular/angular/pull/17712#discussion_r132025495). ->
-->

도움말: _오류 메시지에 지정된 위치에서 컴파일러가 심볼 참조를 예상했습니다._

클래스의 `extends` 절에 표현식을 사용하면 이 오류가 발생할 수 있습니다.

<!--todo: Chuck: PR 의견을 살펴봤지만 여전히 이해하지 못했습니다. [해당 의견](https://github.com/angular/angular/pull/17712#discussion_r132025495)을 참고하세요. -->
