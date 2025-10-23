<!--
# Expression Syntax
-->
# 표현식 문법

<!--
Angular expressions are based on JavaScript, but differ in some key ways. This guide walks through the similarities and differences between Angular expressions and standard JavaScript.
-->
Angular 표현식 문법은 JavaScript를 기반으로 하지만 몇가지는 다릅니다.
이 문서에서는 Angular 표현식 문법이 표준 JavaScript과 어떻게 비슷하고 다른지 알아봅시다.

<!--
## Value literals
-->
## 변수 타입

<!--
Angular supports a subset of [literal values](https://developer.mozilla.org/en-US/docs/Glossary/Literal) from JavaScript.
-->
Angular는 JavaScript의 [변수 타입](https://developer.mozilla.org/en-US/docs/Glossary/Literal) 중 몇가지를 제외하고 지원합니다.


<!--
### Supported value literals
-->
### 지원하는 타입

<!--
| Literal type           | Example values                  |
| ---------------------- | ------------------------------- |
| String                 | `'Hello'`, `"World"`            |
| Boolean                | `true`, `false`                 |
| Number                 | `123`, `3.14`                   |
| Object                 | `{name: 'Alice'}`               |
| Array                  | `['Onion', 'Cheese', 'Garlic']` |
| null                   | `null`                          |
| Template string        | `` `Hello ${name}` ``           |
| Tagged template string | `` tag`Hello ${name}` ``        |
-->
| 변수 타입           | 예시                              |
|-----------------|---------------------------------|
| 문자열             | `'Hello'`, `"World"`            |
| 불리언             | `true`, `false`                 |
| 숫자              | `123`, `3.14`                   |
| 객체              | `{name: 'Alice'}`               |
| 배열              | `['Onion', 'Cheese', 'Garlic']` |
| null            | `null`                          |
| 템플릿 문자열         | `` `Hello ${name}` ``           |
| 태그가 지정된 템플릿 문자열 | `` tag`Hello ${name}` ``        |


<!--
### Unsupported literals
-->
### 지원하지 않는 타임

<!--
| Literal type           | Example value            |
| ---------------------- | ------------------------ |
| RegExp                 | `/\d+/`                  |
| Tagged template string | `` tag`Hello ${name}` `` |
-->
| 변수 타입           | 예시      |
|-----------------|---------|
| 정규표현식           | `/\d+/` |


<!--
## Globals
-->
## 전역 변수

<!--
Angular expressions support the following [globals](https://developer.mozilla.org/en-US/docs/Glossary/Global_object):

- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [$any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

No other JavaScript globals are supported. Common JavaScript globals include `Number`, `Boolean`, `NaN`, `Infinity`, `parseInt`, and more.
-->
Angular 표현식에서는 다음과 같은 [전역](https://developer.mozilla.org/en-US/docs/Glossary/Global_object) 변수를 사용할 수 있습니다:

- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [$any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

이 외에 `Number`, `Boolean`, `NaN`, `Infinity`, `parseInt` 등 표준 JavaScript에서 지원하는 전역 객체는 지원하지 않습니다.


<!--
## Local variables
-->
## 지역 변수

<!--
Angular automatically makes special local variables available for use in expressions in specific contexts. These special variables always start with the dollar sign character (`$`).

For example, `@for` blocks make several local variables corresponding to information about the loop, such as `$index`.
-->
표현식의 특정 컨텍스트에서 사용할 수 있는 특별한 지역 변수들이 있습니다.
이 변수들은 Angular가 자동으로 선언한 것이며, 달러 기호(`$`)로 시작합니다.

`@for` 블록에서 실행 블록을 한 번씩 돌 때마다 변경되는 `$index`와 같은 변수가 이런 경우에 해당합니다.


<!--
## What operators are supported?
-->
## 어떤 연산자를 사용할 수 있나요?

<!--
### Supported operators
-->
### 지원하는 연산자

<!--
Angular supports the following operators from standard JavaScript.

| Operator              | Example(s)                               |
| --------------------- | ---------------------------------------- |
| Add / Concatenate     | `1 + 2`                                  |
| Subtract              | `52 - 3`                                 |
| Multiply              | `41 * 6`                                 |
| Divide                | `20 / 4`                                 |
| Remainder (Modulo)    | `17 % 5`                                 |
| Exponentiation        | `10 ** 3`                                |
| Parenthesis           | `9 * (8 + 4)`                            |
| Conditional (Ternary) | `a > b ? true : false`                   |
| And (Logical)         | `&&`                                     |
| Or (Logical)          | `\|\|`                                   |
| Not (Logical)         | `!`                                      |
| Nullish Coalescing    | `possiblyNullValue ?? 'default'`         |
| Comparison Operators  | `<`, `<=`, `>`, `>=`, `==`, `===`, `!==` |
| Unary Negation        | `-x`                                     |
| Unary Plus            | `+y`                                     |
| Property Accessor     | `person['name']`                         |
| typeof                | `typeof 42`                              |
| void                  | `void 1`                                 |
| in                    | `'model' in car`                         |

Angular expressions additionally also support the following non-standard operators:

| Operator                        | Example(s)                     |
| ------------------------------- | ------------------------------ |
| [Pipe](/guide/templates/pipes) | `{{ total \| currency }}`      |
| Optional chaining\*             | `someObj.someProp?.nestedProp` |
| Non-null assertion (TypeScript) | `someObj!.someProp`            |

NOTE: Optional chaining behaves differently from the standard JavaScript version in that if the left side of Angular’s optional chaining operator is `null` or `undefined`, it returns `null` instead of `undefined`.
-->
Angular 표현식에는 표준 JavaScript 연산자 중 다음과 같은 연산자를 사용할 수 있습니다.

| 연산자            | 예시                                       |
|----------------|------------------------------------------|
| 더하기 / 문자열 연결하기 | `1 + 2`                                  |
| 빼기             | `52 - 3`                                 |
| 곱하기            | `41 * 6`                                 |
| 나누기            | `20 / 4`                                 |
| 나머지 구하기        | `17 % 5`                                 |
| 지수 연산          | `10 ** 3`                                |
| 소괄호            | `9 * (8 + 4)`                            |
| 삼항 연산자         | `a > b ? true : false`                   |
| And 논리 연산      | `&&`                                     |
| Or 논리 연산       | `\|\|`                                   |
| Not 논리 연산      | `!`                                      |
| Null 병합        | `possiblyNullValue ?? 'default'`         |
| 비교 연산자         | `<`, `<=`, `>`, `>=`, `==`, `===`, `!==` |
| 단항 부정          | `-x`                                     |
| 단항 플러스         | `+y`                                     |
| 프로퍼티 접근        | `person['name']`                         |
| typeof         | `typeof 42`                              |
| void           | `void 1`                                 |
| in             | `'model' in car`                         |

그리고 표준 JavaScript 연산자 외에 다음과 같은 연산자도 지원합니다:

| 연산자                                        | 예시                             |
|--------------------------------------------|--------------------------------|
| [Pipe](/guide/templates/pipes)             | `{{ total \| currency }}`      |
| 옵셔널 체이닝\*                                  | `someObj.someProp?.nestedProp` |
| null 보장 연산자 (TypeScript) | `someObj!.someProp`            |

참고: 옵셔널 체이닝(Optional chaining)의 동작은 표준 JavaScript와 조금 다릅니다. Angular에서는 옵셔널 체이닝이 끊길 때 `undefined` 대신 `null`을 반환합니다.


<!--
### Unsupported operators
-->
### 지원하지 않는 연산자

<!--
| Operator              | Example(s)                        |
| --------------------- | --------------------------------- |
| All bitwise operators | `&`, `&=`, `~`, `\|=`, `^=`, etc. |
| Assignment operators  | `=`                               |
| Object destructuring  | `const { name } = person`         |
| Array destructuring   | `const [firstItem] = items`       |
| Comma operator        | `x = (x++, x)`                    |
| in                    | `'model' in car`                  |
| typeof                | `typeof 42`                       |
| void                  | `void 1`                          |
| instanceof            | `car instanceof Automobile`       |
| new                   | `new Car()`                       |
-->
| 연산자        | 예시                            |
|------------|-------------------------------|
| 비트 연산자     | `&`, `&=`, `~`, `\|=`, `^=` 등 |
| 할당 연산자     | `=`                           |
| 객체 분해 할당   | `const { name } = person`     |
| 배열 분해 할당   | `const [firstItem] = items`   |
| 쉼표 연산자     | `x = (x++, x)`                |
| in         | `'model' in car`              |
| typeof     | `typeof 42`                   |
| void       | `void 1`                      |
| instanceof | `car instanceof Automobile`   |
| new        | `new Car()`                   |


<!--
## Lexical context for expressions
-->
## 표현식의 컨텍스트

<!--
Angular expressions are evaluated within the context of the component class as well as any relevant [template variables](/guide/templates/variables), locals, and globals.

When referring to component class members, `this` is always implied. However, if a template declares a [template variables](guide/templates/variables) with the same name as a member, the variable shadows that member. You can unambiguously reference such a class member by explicitly using `this.`. This can be useful when creating an `@let` declaration that shadows a class member, e.g. for signal narrowing purposes.
-->
Angular 표현식에서는 컴포넌트 클래스의 컨텍스트 외에도 [템플릿 변수](/guide/templates/variables), 지역 변수, 전역 변수를 활용할 수 있습니다.

컴포넌트 클래스 멤버를 참조할 때는 `this`가 사용된 것으로 간주합니다.
하지만 템플릿에 클래스 멤버와 같은 이름으로 [템플릿 변수](guide/templates/variables)가 선언되어 있다면 템플릿 변수의 우선순위가 높습니다.
이 경우는 `this.`를 명시적으로 사용해서 클래스 멤버를 참조할 수 있습니다.
`@let`을 사용하면 더 유용합니다.


<!--
## Declarations
-->
## 변수 선언

<!--
Generally speaking, declarations are not supported in Angular expressions. This includes, but is not limited to:

| Declarations    | Example(s)                                  |
| --------------- | ------------------------------------------- |
| Variables       | `let label = 'abc'`, `const item = 'apple'` |
| Functions       | `function myCustomFunction() { }`           |
| Arrow Functions | `() => { }`                                 |
| Classes         | `class Rectangle { }`                       |
-->
일반적으로 Angular 표현식에서는 변수를 선언한다고 보기 어렵습니다.
이런 경우가 모두 해당됩니다:

| 선언        | 예시                                          |
|-----------|---------------------------------------------|
| 변수     | `let label = 'abc'`, `const item = 'apple'` |
| 함수     | `function myCustomFunction() { }`           |
| 화살표 함수 | `() => { }`                                 |
| 클래스       | `class Rectangle { }`                       |


<!--
# Event listener statements
-->
# 이벤트 리스너 실행문

<!--
Event handlers are **statements** rather than expressions. While they support all of the same syntax as Angular expressions, the are two key differences:

1. Statements **do support** assignment operators (but not destructing assignments)
1. Statements **do not support** pipes
-->
이벤트 핸들러는 표현식(expressions)이 아니고 **실행문(statements)** 입니다.
실행문은 Angular 표현식과 거의 비슷하지만, 두 가지가 다릅니다:

1. 할당 연산자를 지원합니다. (분해 할당은 지원하지 않습니다.)
1. 파이프를 허용하지 않습니다.
