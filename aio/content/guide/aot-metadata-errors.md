<!--
# AOT metadata errors
-->
# AOT 메타데이터 에러

<!--
The following are metadata errors you may encounter, with explanations and suggested corrections.
-->
AOT 컴파일러를 사용하다보면 다음과 같은 에러가 발생할 수 있습니다.
이 에러가 왜 발생하는지, 어떻게 해결하면 되는지 알아봅시다.


[Expression form not supported](#expression-form-not-supported) <br /> 
[Reference to a local (non-exported) symbol](#reference-to-a-local-symbol) <br /> 
[Only initialized variables and constants](#only-initialized-variables) <br /> 
[Reference to a non-exported class](#reference-to-a-non-exported-class) <br /> 
[Reference to a non-exported function](#reference-to-a-non-exported-function) <br /> 
[Function calls are not supported](#function-calls-not-supported) <br /> 
[Destructured variable or constant not supported](#destructured-variable-not-supported) <br /> 
[Could not resolve type](#could-not-resolve-type) <br /> 
[Name expected](#name-expected) <br /> 
[Unsupported enum member name](#unsupported-enum-member-name) <br /> 
[Tagged template expressions are not supported](#tagged-template-expressions-not-supported) <br /> 
[Symbol reference expected](#symbol-reference-expected) <br /> 


<a id="expression-form-not-supported"></a>
## Expression form not supported

<div class="alert is-helpful">

<!--
*The compiler encountered an expression it didn't understand while evaluating Angular metadata.*
-->
_메타데이터 표현식에 지원하지 않는 문법이 사용되었습니다._

</div>

<!--
Language features outside of the compiler's [restricted expression syntax](guide/aot-compiler#expression-syntax)
can produce this error, as seen in the following example:

<code-example format="typescript" language="typescript">

// ERROR
export class Fooish { &hellip; }
&hellip;
const prop = typeof Fooish; // typeof is not valid in metadata
  &hellip;
  // bracket notation is not valid in metadata
  { provide: 'token', useValue: { [prop]: 'value' } };
  &hellip;

</code-example>

You can use `typeof` and bracket notation in normal application code.
You just can't use those features within expressions that define Angular metadata.

Avoid this error by sticking to the compiler's [restricted expression syntax](guide/aot-compiler#expression-syntax)
when writing Angular metadata
and be wary of new or unusual TypeScript features.
-->
AOT 컴파일러는 [제한된 기능으로만 표현식 문법](guide/aot-compiler#expression-syntax)을 지원합니다.
다음과 같은 코드는 에러가 발생합니다:

<code-example format="typescript" language="typescript">

// 에러
export class Fooish { &hellip; }
  &hellip;
  const prop = typeof Fooish; // typeof는 메타데이터에 사용할 수 없습니다.
  &hellip;
  // 메타데이터에서 대괄호 참조를 사용할 수 없습니다.
  { provide: 'token', useValue: { [prop]: 'value' } };
  &hellip;

</code-example>

애플리케이션 코드에는 `typeof` 연산자나 대괄호 참조를 사용할 수 있습니다.
하지만 이런 코드는 Angular 메타데이터 표현식에 사용할 수 없습니다.

이 에러를 해결하려면 Angular 메타데이터에 사용할 수 있는 [제한된 표현식 문법](guide/aot-compiler#expression-syntax)으로만 코드를 작성해야 합니다.
사용하려는 TypeScript 기능을 지원하는지 확인해 보세요.


<a id="reference-to-a-local-symbol"></a>

## Reference to a local (non-exported) symbol

<div class="alert is-helpful">

<!--
*Reference to a local \(non-exported\) symbol 'symbol name'. Consider exporting the symbol.*
-->
*로컬 심볼을 사용했습니다. 심볼을 파일 외부로 공개\(export\)하세요.*

</div>

<!--
The compiler encountered a reference to a locally defined symbol that either wasn't exported or wasn't initialized.

Here's a `provider` example of the problem.

<code-example format="typescript" language="typescript">

// ERROR
let foo: number; // neither exported nor initialized

&commat;Component({
  selector: 'my-component',
  template: &hellip; ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

</code-example>

The compiler generates the component factory, which includes the `useValue` provider code, in a separate module. *That* factory module can't reach back to *this* source module to access the local \(non-exported\) `foo` variable.

You could fix the problem by initializing `foo`.

<code-example format="typescript" language="typescript">

let foo = 42; // initialized

</code-example>

The compiler will [fold](guide/aot-compiler#code-folding) the expression into the provider as if you had written this.

<code-example format="typescript" language="typescript">

providers: [
  { provide: Foo, useValue: 42 }
]

</code-example>

Alternatively, you can fix it by exporting `foo` with the expectation that `foo` will be assigned at runtime when you actually know its value.

<code-example format="typescript" language="typescript">

// CORRECTED
export let foo: number; // exported

&commat;Component({
  selector: 'my-component',
  template: &hellip; ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

</code-example>

Adding `export` often works for variables referenced in metadata such as `providers` and `animations` because the compiler can generate *references* to the exported variables in these expressions. It doesn't need the *values* of those variables.

Adding `export` doesn't work when the compiler needs the *actual value*
in order to generate code.
For example, it doesn't work for the `template` property.

<code-example format="typescript" language="typescript">

// ERROR
export let someTemplate: string; // exported but not initialized

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

The compiler needs the value of the `template` property *right now* to generate the component factory.
The variable reference alone is insufficient.
Prefixing the declaration with `export` merely produces a new error, "[`Only initialized variables and constants can be referenced`](#only-initialized-variables)".

<a id="only-initialized-variables"></a>
-->
외부로 공개(export)되지 않은 심볼이 사용되었거나 이 변수가 초기화되지 않았을 때 발생합니다.

아래 코드에서는 `provider`를 처리할 때 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
let foo: number; // export로 지정되지 않았으며 초기화되지도 않았습니다.

&commat;Component({
  selector: 'my-component',
  template: &hellip; ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

</code-example>

컴파일러는 다른 모듈에 있는 프로바이더를 참조하는 `useValue` 코드를 만났을 때 컴포넌트 팩토리를 생성합니다.
이 때 현재 모듈에서 사용하는 심볼 `foo`는 모듈 외부로 공개되지 않았기 때문에 외부 모듈이 현재 소스 코드에 접근할 수 없습니다.

먼저 `foo`를 초기화하지 않은 문제부터 해결해 봅시다.

<code-example format="typescript" language="typescript">

let foo = 42; // 초기화

</code-example>

그러면 컴파일러가 표현식을 [폴딩](guide/aot-compiler#code-folding)하면서 다음과 같은 형태로 변환합니다.

<code-example format="typescript" language="typescript">

providers: [
  { provide: Foo, useValue: 42 }
]

</code-example>

`foo` 변수값이 실행시점에 할당되기 때문에 이 변수를 사용하는 시점에 언제나 값이 존재한다면 `foo` 변수에 `export`를 지정하는 방법으로도 해결할 수 있습니다.

<code-example format="typescript" language="typescript">

// 정상 코드
export let foo: number; // export로 지정됨

&commat;Component({
  selector: 'my-component',
  template: &hellip; ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

</code-example>

`export`를 지정하는 방식은 `providers`나 `animations`에 사용하는 변수에 활용하면 이 에러를 해결할 수 있습니다.
컴파일러는 이런 표현식을 처리할 때 변수를 *참조* 하는 코드만 생성하기 때문입니다.
이 시점에는 변수에 어떤 값이 있느냐는 중요하지 않습니다.

하지만 컴파일러 처리 단계에서 *실제로 값이 필요한 경우* 에는 사용할 수 없습니다.
아래 코드에서는 `template` 프로퍼티를 처리할 때 문제가 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
export let someTemplate: string; // export가 지정되었지만 초기화되지 않았습니다.

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

컴파일러가 컴포넌트 팩토리를 생성하려면 `template` 프로퍼티 값이 *컴파일러 처리 시점* 에 필요합니다.
변수만 지정하는 것으로는 해결되지 않습니다.

때로는 `export`를 지정하더라도 "[`Only initialized variables and constants can be referenced`](#only-initialized-variables)" 에러가 발생할 수 있으니 주의하세요.

<a id="only-initialized-variables"></a>

## Only initialized variables and constants

<div class="alert is-helpful">

<!--
*Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler.*
-->
*템플릿 컴파일러가 참조하는 변수의 값이 할당되지 않았습니다.*

</div>

<!--
The compiler found a reference to an exported variable or static field that wasn't initialized.
It needs the value of that variable to generate code.

The following example tries to set the component's `template` property to the value of the exported `someTemplate` variable which is declared but *unassigned*.

<code-example format="typescript" language="typescript">

// ERROR
export let someTemplate: string;

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

You'd also get this error if you imported `someTemplate` from some other module and neglected to initialize it there.

<code-example format="typescript" language="typescript">

// ERROR - not initialized there either
import { someTemplate } from './config';

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

The compiler cannot wait until runtime to get the template information.
It must statically derive the value of the `someTemplate` variable from the source code so that it can generate the component factory, which includes instructions for building the element based on the template.

To correct this error, provide the initial value of the variable in an initializer clause *on the same line*.

<code-example format="typescript" language="typescript">

// CORRECTED
export let someTemplate = '&lt;h1&gt;Greetings from Angular&lt;/h1&gt;';

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>
-->
컴파일러가 참조하는 `export` 변수나 정적 필드의 값이 할당되지 않았을 때 발생합니다.
코드를 생성하려면 이 변수의 값이 필요합니다.

아래 코드에서 컴포넌트 `template` 프로퍼티에 사용된 변수 `someTemplate`는 `export`가 지정되었지만 값이 *할당되지 않았습니다.*

<code-example format="typescript" language="typescript">

// 에러
export let someTemplate: string;

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

이 에러는 `someTemplate` 변수를 다른 모듈에서 참조해 오는 경우에도 발생할 수 있습니다.

<code-example format="typescript" language="typescript">

// 에러 - 다른 모듈에서도 초기화하지 않은 경우
import { someTemplate } from './config';

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

템플릿 정보는 컴파일 시점에 처리되어야 합니다.
컴포넌트 팩토리 코드를 생성하려면 `someTemplate` 변수의 실제 값이 반드시 할당되어 있어야 하기 때문입니다.
그래야 템플릿 안에 사용된 다른 엘리먼트를 확인할 수 있습니다.

이 에러를 해결하려면 *변수의 초기값을 할당*하면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
export let someTemplate = '&lt;h1&gt;Greetings from Angular&lt;/h1&gt;';

&commat;Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

</code-example>

<a id="reference-to-a-non-exported-class"></a>

## Reference to a non-exported class

<div class="alert is-helpful">

<!--
*Reference to a non-exported class `<class name>`.*
*Consider exporting the class.*
-->
*외부로 공개(export)되지 않은 클래스 이름이 사용되었습니다.*
*클래스를 파일 외부로 공개하세요.*

</div>

<!--
Metadata referenced a class that wasn't exported.

For example, you may have defined a class and used it as an injection token in a providers array but neglected to export that class.

<code-example format="typescript" language="typescript">

// ERROR
abstract class MyStrategy { }

  &hellip;
  providers: [
    { provide: MyStrategy, useValue: &hellip; }
  ]
  &hellip;

</code-example>

Angular generates a class factory in a separate module and that factory [can only access exported classes](guide/aot-compiler#exported-symbols).
To correct this error, export the referenced class.

<code-example format="typescript" language="typescript">

// CORRECTED
export abstract class MyStrategy { }

  &hellip;
  providers: [
    { provide: MyStrategy, useValue: &hellip; }
  ]
  &hellip;

</code-example>
-->
메타데이터에서 외부로 공개되지 않은 클래스를 참조했습니다.

클래스를 선언해서 프로바이더 배열에 추가했지만 이 클래스가 파일 외부로 공개되지 않았을 때 발생합니다.

<code-example format="typescript" language="typescript">

// ERROR
abstract class MyStrategy { }

  &hellip;
  providers: [
    { provide: MyStrategy, useValue: &hellip; }
  ]
  &hellip;

</code-example>

Angular는 별도 모듈로 클래스 팩토리를 생성하기 때문에 [외부로 공개된 클래스만 참조할 수 있습니다](guide/aot-compiler#exported-symbols).
이 에러를 해결하려면 클래스에 `export`를 붙이면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
export abstract class MyStrategy { }

  &hellip;
  providers: [
    { provide: MyStrategy, useValue: &hellip; }
  ]
  &hellip;

</code-example>


<a id="reference-to-a-non-exported-function"></a>

## Reference to a non-exported function

<div class="alert is-helpful">

<!--
*Metadata referenced a function that wasn't exported.*
-->
*메타데이터에서 외부로 공개되지 않은 함수를 참조했습니다.*

</div>

<!--
For example, you may have set a providers `useFactory` property to a locally defined function that you neglected to export.

<code-example format="typescript" language="typescript">

// ERROR
function myStrategy() { &hellip; }

  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  &hellip;

</code-example>

Angular generates a class factory in a separate module and that factory [can only access exported functions](guide/aot-compiler#exported-symbols).
To correct this error, export the function.

<code-example format="typescript" language="typescript">

// CORRECTED
export function myStrategy() { &hellip; }

  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  &hellip;

</code-example>
-->
프로바이더에 `useFactory`를 사용했는데, 이 때 외부로 공개되지 않은 로컬 함수를 사용했을 때 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
function myStrategy() { &hellip; }

  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  &hellip;

</code-example>

Angular는 별도 모듈로 클래스 팩토리를 생성하기 때문에 [외부로 공개된 함수만 참조할 수 있습니다](guide/aot-compiler#exported-symbols).
이 에러를 해결하려면 함수에 `export`를 붙이면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
export function myStrategy() { &hellip; }

  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  &hellip;

</code-example>


<a id="function-calls-not-supported"></a>

## Function calls are not supported

<div class="alert is-helpful">

<!--
*Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function.*
-->
*메타데이터 안에서는 함수를 실행할 수 없습니다. 익명 함수나 람다 함수 대신 이름이 있는 함수에 `export`를 지정해서 사용하세요.*

</div>

<!--
The compiler does not currently support [function expressions or lambda functions](guide/aot-compiler#function-expression).
For example, you cannot set a provider's `useFactory` to an anonymous function or arrow function like this.

<code-example format="typescript" language="typescript">

// ERROR
  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: function() { &hellip; } },
    { provide: OtherStrategy, useFactory: () =&gt; { &hellip; } }
  ]
  &hellip;

</code-example>

You also get this error if you call a function or method in a provider's `useValue`.

<code-example format="typescript" language="typescript">

// ERROR
import { calculateValue } from './utilities';

  &hellip;
  providers: [
    { provide: SomeValue, useValue: calculateValue() }
  ]
  &hellip;

</code-example>

To correct this error, export a function from the module and refer to the function in a `useFactory` provider instead.

<code-example format="typescript" language="typescript">

// CORRECTED
import { calculateValue } from './utilities';

export function myStrategy() { &hellip; }
export function otherStrategy() { &hellip; }
export function someValueFactory() {
  return calculateValue();
}
  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy },
    { provide: OtherStrategy, useFactory: otherStrategy },
    { provide: SomeValue, useFactory: someValueFactory }
  ]
  &hellip;

</code-example>
-->
AOT 컴파일러는 [함수 표현식이나 람다 함수](guide/aot-compiler#function-expression)를 지원하지 않습니다.
그래서 `providers` 배열에 `useFactory`를 사용할 때 다음과 같이 익명 함수를 사용하면 에러가 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: function() { &hellip; } },
    { provide: OtherStrategy, useFactory: () =&gt; { &hellip; } }
  ]
  &hellip;

</code-example>

그리고 다음과 같이 `providers` 배열에 `useValue`를 사용하면서 함수를 실행해도 이 에러가 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
import { calculateValue } from './utilities';

  &hellip;
  providers: [
    { provide: SomeValue, useValue: calculateValue() }
  ]
  &hellip;

</code-example>

이 에러를 해결하려면 함수에 이름을 지정하고 `export`로 지정한 후에 `providers`에 `useFactory`로 등록하면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
import { calculateValue } from './utilities';

export function myStrategy() { &hellip; }
export function otherStrategy() { &hellip; }
export function someValueFactory() {
  return calculateValue();
}
  &hellip;
  providers: [
    { provide: MyStrategy, useFactory: myStrategy },
    { provide: OtherStrategy, useFactory: otherStrategy },
    { provide: SomeValue, useFactory: someValueFactory }
  ]
  &hellip;

</code-example>


<a id="destructured-variable-not-supported"></a>

## Destructured variable or constant not supported

<div class="alert is-helpful">

<!--
*Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring.*
-->
*비구조화 할당으로 초기화한 변수를 참조했습니다. AOT 컴파일러는 비구조화 할당을 지원하지 않습니다.*

</div>

<!--
The compiler does not support references to variables assigned by [destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

For example, you cannot write something like this:

<code-example format="typescript" language="typescript">

// ERROR
import { configuration } from './configuration';

// destructured assignment to foo and bar
const {foo, bar} = configuration;
  &hellip;
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  &hellip;

</code-example>

To correct this error, refer to non-destructured values.

<code-example format="typescript" language="typescript">

// CORRECTED
import { configuration } from './configuration';
  &hellip;
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  &hellip;

</code-example>
-->
AOT 컴파일러는 [비구조화 할당(destructuring)](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring) 으로 초기화한 변수를 지원하지 않습니다.

그래서 다음과 같이 작성하면 에러가 발생합니다:

<code-example format="typescript" language="typescript">

// 에러
import { configuration } from './configuration';

// foo, bar는 비구조화 할당으로 초기화했습니다.
const {foo, bar} = configuration;
  &hellip;
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  &hellip;

</code-example>

이 에러를 수정하려면 비구조화 할당 문법을 사용하지 않으면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
import { configuration } from './configuration';
  &hellip;
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  &hellip;

</code-example>


<a id="could-not-resolve-type"></a>

## Could not resolve type

<div class="alert is-helpful">

<!--
*The compiler encountered a type and can't determine which module exports that type.*
-->
*알 수 없는 타입이 사용되었습니다.*

</div>

<!--
This can happen if you refer to an ambient type.
For example, the `Window` type is an ambient type declared in the global `.d.ts` file.

You'll get an error if you reference it in the component constructor, which the compiler must statically analyze.

<code-example format="typescript" language="typescript">

// ERROR
&commat;Component({ })
export class MyComponent {
  constructor (private win: Window) { &hellip; }
}

</code-example>

TypeScript understands ambient types so you don't import them.
The Angular compiler does not understand a type that you neglect to export or import.

In this case, the compiler doesn't understand how to inject something with the `Window` token.

Do not refer to ambient types in metadata expressions.

If you must inject an instance of an ambient type,
you can finesse the problem in four steps:

1.  Create an injection token for an instance of the ambient type.
1.  Create a factory function that returns that instance.
1.  Add a `useFactory` provider with that factory function.
1.  Use `@Inject` to inject the instance.

Here's an illustrative example.

<code-example format="typescript" language="typescript">

// CORRECTED
import { Inject } from '&commat;angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

&commat;Component({
  &hellip;
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (&commat;Inject(WINDOW) private win: Window) { &hellip; }
}

</code-example>

The `Window` type in the constructor is no longer a problem for the compiler because it
uses the `@Inject(WINDOW)` to generate the injection code.

Angular does something similar with the `DOCUMENT` token so you can inject the browser's `document` object \(or an abstraction of it, depending upon the platform in which the application runs\).

<code-example format="typescript" language="typescript">

import { Inject }   from '&commat;angular/core';
import { DOCUMENT } from '&commat;angular/common';

&commat;Component({ &hellip; })
export class MyComponent {
  constructor (&commat;Inject(DOCUMENT) private doc: Document) { &hellip; }
}

</code-example>
-->
이 에러는 묵시적으로 사용하는 타입을 사용한 경우에 발생할 수 있습니다.
전역 `.d.ts` 파일에 `Window` 타입이 정의되어 있다고 합시다.

이 타입을 컴포넌트 생성자에 사용하면 에러가 발생합니다.
컴파일러는 모든 타입을 정적으로 확인할 수 있어야 합니다.

<code-example format="typescript" language="typescript">

// 에러
&commat;Component({ })
export class MyComponent {
  constructor (private win: Window) { &hellip; }
}

</code-example>

묵시적인 타입은 TypeScript가 자동으로 인식할 수 있기 때문에 이 타입을 로드하지 않아도 코드를 작성할 수 있습니다.
하지만 Angular 컴파일러는 출처가 정확하게 확인된 타입만 사용합니다.

그래서 위와 같이 코드를 작성하면 `Window` 토큰와 연결된 의존성 객체를 어떻게 찾아야 하는지 Angular가 알 수 없습니다.

메타데이터 표현식에는 암묵적인(ambient) 타입을 사용하면 안됩니다.

다만, 묵시적인 타입의 인스턴스를 꼭 사용해야 한다면 다음 단계를 거쳐 사용할 수 있습니다:

1.  묵시적인 타입으로 의존성 주입 토큰을 생성합니다.
1.  인스턴스를 반환하는 팩토리 함수를 정의합니다.
1.  프로바이더에 `useFactory`를 사용해서 팩토리 함수를 등록합니다.
1.  `@Inject`를 사용해서 인스턴스를 의존성으로 주입합니다.

코드로 살펴보면 이렇습니다.

<code-example format="typescript" language="typescript">

// 정상 코드
import { Inject } from '&commat;angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

&commat;Component({
  &hellip;
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (&commat;Inject(WINDOW) private win: Window) { &hellip; }
}

</code-example>

이렇게 작성하면 생성자에 의존성으로 주입하기 위해 사용된 `Window` 타입은 더이상 문제가 되지 않습니다.
`@Inject(WINDOW)`를 사용해서 타입을 정확하게 지정했기 때문입니다.

이 방식은 브라우저의 `document` 객체\(또는 플랫폼에 따라 추상화된 객체\)를 의존성으로 주입할 때도 사용할 수 있습니다.
플랫폼마다 사용방법이 조금씩 다를 수 있지만, `DOCUMENT` 토큰을 아래 코드처럼 사용하면 됩니다.

<code-example format="typescript" language="typescript">

import { Inject }   from '&commat;angular/core';
import { DOCUMENT } from '&commat;angular/common';

&commat;Component({ &hellip; })
export class MyComponent {
  constructor (&commat;Inject(DOCUMENT) private doc: Document) { &hellip; }
}

</code-example>


<a id="name-expected"></a>

## Name expected

<div class="alert is-helpful">

<!--
*The compiler expected a name in an expression it was evaluating.*
-->
*표현식을 평가할 때 이름이 필요합니다.*

</div>

<!--
This can happen if you use a number as a property name as in the following example.

<code-example format="typescript" language="typescript">

// ERROR
provider: [{ provide: Foo, useValue: { 0: 'test' } }]

</code-example>

Change the name of the property to something non-numeric.

<code-example format="typescript" language="typescript">

// CORRECTED
provider: [{ provide: Foo, useValue: { '0': 'test' } }]

</code-example>
-->
이 에러는 객체의 프로퍼티명으로 숫자를 사용할 때 발생할 수 있습니다.

<code-example format="typescript" language="typescript">

// 에러
provider: [{ provide: Foo, useValue: { 0: 'test' } }]

</code-example>

이 에러를 해결하려면 숫자가 아닌 형태로 프로퍼티 이름을 선언하면 됩니다.

<code-example format="typescript" language="typescript">

// 정상 코드
provider: [{ provide: Foo, useValue: { '0': 'test' } }]

</code-example>


<a id="unsupported-enum-member-name"></a>

## Unsupported enum member name

<div class="alert is-helpful">

<!--
*Angular couldn't determine the value of the [enum member](https://www.typescriptlang.org/docs/handbook/enums.html) that you referenced in metadata.*
-->
*메타데이터에 사용한 [enum 멤버](https://www.typescriptlang.org/docs/handbook/enums.html)의 값을 확인할 수 없습니다.*

</div>

<!--
The compiler can understand simple enum values but not complex values such as those derived from computed properties.

<code-example format="typescript" language="typescript">

// ERROR
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // computed
}

  &hellip;
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // ok
    { provide: DangerColor, useValue: Colors.Red }   // ok
    { provide: StrongColor, useValue: Colors.Blue }  // bad
  ]
  &hellip;

</code-example>

Avoid referring to enums with complicated initializers or computed properties.
-->
AOT 컴파일러는 간단한 enum 값을 참조할 수 있지만 추가 연산이 필요한 값은 참조할 수 없습니다.

<code-example format="typescript" language="typescript">

// 에러
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // 연산이 필요한 값
}

  &hellip;
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // ok
    { provide: DangerColor, useValue: Colors.Red }   // ok
    { provide: StrongColor, useValue: Colors.Blue }  // bad
  ]
  &hellip;

</code-example>

Avoid referring to enums with complicated initializers or computed properties.


<a id="tagged-template-expressions-not-supported"></a>

## Tagged template expressions are not supported

<div class="alert is-helpful">

<!--
*Tagged template expressions are not supported in metadata.*
-->
*태그 템플릿 표현식은 지원하지 않습니다.*

</div>

<!--
The compiler encountered a JavaScript ES2015 [tagged template expression](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) such as the following.

<code-example format="typescript" language="typescript">

// ERROR
const expression = 'funky';
const raw = String.raw`A tagged template &dollar;{expression} string`;
 &hellip;
 template: '&lt;div&gt;' + raw + '&lt;/div&gt;'
 &hellip;

</code-example>

[`String.raw()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/raw) is a *tag function* native to JavaScript ES2015.

The AOT compiler does not support tagged template expressions; avoid them in metadata expressions.
-->
이 에러는 JavaScript ES2015 [태그 템플릿 표현식](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals)을 사용했을 때 발생합니다.

<code-example format="typescript" language="typescript">

// 에러
const expression = 'funky';
const raw = String.raw`A tagged template &dollar;{expression} string`;
 &hellip;
 template: '&lt;div&gt;' + raw + '&lt;/div&gt;'
 &hellip;

</code-example>

[`String.raw()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/raw)는 JavaScript ES2015부터 제공하는 *태그 함수* 입니다.

AOT 컴파일러는 이 표현식을 지원하지 않습니다.


<a id="symbol-reference-expected"></a>

## Symbol reference expected

<div class="alert is-helpful">

<!--
*The compiler expected a reference to a symbol at the location specified in the error message.*
-->
*에러 메시지에 표시된 심볼을 제대로 참조하고 있는지 확인하세요.*

</div>

<!--
This error can occur if you use an expression in the `extends` clause of a class.
-->
이 에러는 표현식 안에서 `extends`를 사용했을 때 발생합니다.

<!--todo: Chuck: After reviewing your PR comment I'm still at a loss. See [comment there](https://github.com/angular/angular/pull/17712#discussion_r132025495). -->

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
