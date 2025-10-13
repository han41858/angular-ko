<!--
# Pipes
-->
# 파이프(Pipes)

<!--
## Overview
-->
## 개요

<!--
Pipes are a special operator in Angular template expressions that allows you to transform data declaratively in your template. Pipes let you declare a transformation function once and then use that transformation across multiple templates. Angular pipes use the vertical bar character (`|`), inspired by the [Unix pipe](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>).

NOTE: Angular's pipe syntax deviates from standard JavaScript, which uses the vertical bar character for the [bitwise OR operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR). Angular template expressions do not support bitwise operators.

Here is an example using some built-in pipes that Angular provides:

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
       <!- Transform the company name to title-case and
       transform the purchasedOn date to a locale-formatted string ->
<h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>

	    <!- Transform the amount to a currency-formatted string ->
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```

When Angular renders the component, it will ensure that the appropriate date format and currency is based on the locale of the user. If the user is in the United States, it would render:

```angular-html
<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

See the [in-depth guide on i18n](/guide/i18n) to learn more about how Angular localizes values.
-->
파이프는 Angular 템플릿 표현식의 특수 연산자입니다.
파이프는 템플릿에 표시되는 데이터 형식을 변환하는 함수이며, 한 번 선언해 둔 뒤에 여러 템플릿에 사용할 수 있습니다.
파이프는 [Unix의 파이프](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>)에서 영감을 받아 파이프 기호(`|`)를 사용합니다.

참고: Angular의 파이프 구문은 표준 JavaScript [비트 OR 연산자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)와는 다릅니다.
Angular 템플릿 표현식은 비트 연산자를 지원하지 않습니다.

Angular가 제공하는 기본 파이프를 몇가지 사용해 봅시다:

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
       <!-- 회사명을 대문자 단어로 변환하고
       purchasedOn을 지역 날짜 표현으로 변환합니다. -->
<h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>

	    <!-- amount 값을 통화 형식으로 변환합니다. -->
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```

Angular는 컴포넌트를 렌더링하면서 사용자 환경에 맞는 통화와 날짜 형식을 사용합니다.
미국에 있는 사용자라면 이렇게 렌더링될 것입니다:

```angular-html
<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

Angular 현지화에 대한 내용은 [i18n 심화 가이드](/guide/i18n) 문서를 참고하세요.


<!--
### Built-in Pipes
-->
### 기본 파이프

<!--
Angular includes a set of built-in pipes in the `@angular/common` package:

| Name                                          | Description                                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`AsyncPipe`](api/common/AsyncPipe)           | Read the value from a `Promise` or an RxJS `Observable`.                                      |
| [`CurrencyPipe`](api/common/CurrencyPipe)     | Transforms a number to a currency string, formatted according to locale rules.                |
| [`DatePipe`](api/common/DatePipe)             | Formats a `Date` value according to locale rules.                                             |
| [`DecimalPipe`](api/common/DecimalPipe)       | Transforms a number into a string with a decimal point, formatted according to locale rules.  |
| [`I18nPluralPipe`](api/common/I18nPluralPipe) | Maps a value to a string that pluralizes the value according to locale rules.                 |
| [`I18nSelectPipe`](api/common/I18nSelectPipe) | Maps a key to a custom selector that returns a desired value.                                 |
| [`JsonPipe`](api/common/JsonPipe)             | Transforms an object to a string representation via `JSON.stringify`, intended for debugging. |
| [`KeyValuePipe`](api/common/KeyValuePipe)     | Transforms Object or Map into an array of key value pairs.                                    |
| [`LowerCasePipe`](api/common/LowerCasePipe)   | Transforms text to all lower case.                                                            |
| [`PercentPipe`](api/common/PercentPipe)       | Transforms a number to a percentage string, formatted according to locale rules.              |
| [`SlicePipe`](api/common/SlicePipe)           | Creates a new Array or String containing a subset (slice) of the elements.                    |
| [`TitleCasePipe`](api/common/TitleCasePipe)   | Transforms text to title case.                                                                |
| [`UpperCasePipe`](api/common/UpperCasePipe)   | Transforms text to all upper case.                                                            |
-->
`@angular/common` 패키지로 제공되는 기본 파이프는 이런 것들이 있습니다:

| 이름                                            | 설명                                                    |
|-----------------------------------------------|-------------------------------------------------------|
| [`AsyncPipe`](api/common/AsyncPipe)           | `Promise`나 RxJS `Observable` 에서 값을 읽습니다.              |
| [`CurrencyPipe`](api/common/CurrencyPipe)     | 지역 설정에 따라 숫자를 통화 형식으로 변환합니다.                          |
| [`DatePipe`](api/common/DatePipe)             | 지역 설정에 따라 `Date` 값의 출력 형식을 변환합니다.                     |
| [`DecimalPipe`](api/common/DecimalPipe)       | 지역 설정에 따라 숫자 형식을 변환합니다.                               |
| [`I18nPluralPipe`](api/common/I18nPluralPipe) | 지역 설정에 따라 복수에 해당하는 문자열을 맵핑합니다.                        |
| [`I18nSelectPipe`](api/common/I18nSelectPipe) | 원하는 값을 반환하는 커스텀 셀렉터 키를 맵핑합니다.                         |
| [`JsonPipe`](api/common/JsonPipe)             | 객체를 `JSON.stringify` 결과 문자열로 변환합니다. 디버깅 용으로 자주 사용합니다. |
| [`KeyValuePipe`](api/common/KeyValuePipe)     | 객체나 Map을 키-값 쌍 배열로 변환합니다.                             |
| [`LowerCasePipe`](api/common/LowerCasePipe)   | 문자를 모두 소문자로 변환합니다.                                    |
| [`PercentPipe`](api/common/PercentPipe)       | 지역 설정에 따라 숫자를 백분율 문자열로 변환합니다.                         |
| [`SlicePipe`](api/common/SlicePipe)           | 주어진 콜렉션을 나눠서 새로운 배열이나 문자열을 반환합니다.                     |
| [`TitleCasePipe`](api/common/TitleCasePipe)   | 단어의 첫글자를 대문자로 변환합니다.                                  |
| [`UpperCasePipe`](api/common/UpperCasePipe)   | 문자를 모두 대문자로 변환합니다.                                    |


<!--
## Using pipes
-->
## 파이프 활용하기

<!--
Angular's pipe operator uses the vertical bar character (`|`), within a template expression. The pipe operator is a binary operator– the left-hand operand is the value passed to the transformation function, and the right side operand is the name of the pipe and any additional arguments (described below).

```angular-html
<p>Total: {{ amount | currency }}</p>
```

In this example, the value of `amount` is passed into the `CurrencyPipe` where the pipe name is `currency`. It then renders the default currency for the user’s locale.
-->
파이프는 템플릿 표현식 안에서 세로 막대 기호(`|`)를 사용하면 됩니다.
파이프 기호 왼쪽에는 변환 함수로 전달할 값을 지정하며, 파이프 기호 오른쪽에는 적용할 파이프 이름과 추가 인자를 지정합니다.

```angular-html
<p>Total: {{ amount | currency }}</p>
```

이 예제를 보면, `amount` 값이 `currency` 라는 이름으로 사용되는 `CurrencyPipe`로 전달된다는 것을 확인할 수 있습니다.
파이프 변환 결과는 지역 설정에 맞는 기본 통화 형식으로 표시됩니다.


<!--
### Combining multiple pipes in the same expression
-->
### 한 표현식에서 파이프 여러개 사용하기

<!--
You can apply multiple transformations to a value by using multiple pipe operators. Angular runs the pipes from left to right.

The following example demonstrates a combination of pipes to display a localized date in all uppercase:

```angular-html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```
-->
파이프는 왼쪽부터 오른쪽으로 여러 개를 연달아서 적용할 수 있습니다.

아래 예제 코드는 날짜를 지역 설정에 따라 표시한 후 대문자로 변환하는 예제 코드입니다:

```angular-html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```


<!--
### Passing parameters to pipes
-->
### 파이프에 인자 전달하기

<!--
Some pipes accept parameters to configure the transformation. To specify a parameter, append the pipe name with a colon (`:`) followed by the parameter value.

For example, the `DatePipe` is able to take parameters to format the date in a specific way.

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>
```

Some pipes may accept multiple parameters. You can specify additional parameter values separated by the colon character (`:`).

For example, we can also pass a second optional parameter to control the timezone.

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```
-->
파이프 중에는 변환 결과를 커스터마이징하는 인자를 추가로 받는 경우가 있습니다.
인자를 전달하려면 파이프 이름 뒤에 콜론(`:`)을 붙이고 인자를 지정하면 됩니다.

예를 들어 `DatePipe`는 형식을 구체적으로 지정하는 인자를 받을 수 있습니다.

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>
```

인자를 여러개 받는 파이프도 있습니다.
이 경우는 콜론(`:`)을 더 사용하면 됩니다:


```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```


<!--
## How pipes work
-->
## 파이프는 어떻게 동작할까요

<!--
Conceptually, pipes are functions that accept an input value and return a transformed value.

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  template: `
    <main>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class AppComponent {
  amount = 123.45;
}
```

In this example:

1. `CurrencyPipe` is imported from `@angular/common`
1. `CurrencyPipe` is added to the `imports` array
1. The `amount` data is passed to the `currency` pipe
-->
개념적으로 볼 때, 파이프는 입력된 값을 변환해서 반환하는 함수입니다.

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  template: `
    <main>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class AppComponent {
  amount = 123.45;
}
```

이 예제를 보면:

1. `@angular/common` 패키지에서 `CurrencyPipe`를 로드합니다.
1. `imports` 배열에 `CurrencyPipe`를 추가합니다.
1. `currency` 파이프로 `amount` 데이터를 전달합니다.


<!--
### Pipe operator precedence
-->
### 파이프 연산자 우선순위

<!--
The pipe operator has lower precedence than other binary operators, including `+`, `-`, `*`, `/`, `%`, `&&`, `||`, and `??`.

```angular-html
<!- firstName and lastName are concatenated before the result is passed to the uppercase pipe ->
{{ firstName + lastName | uppercase }}
```

The pipe operator has higher precedence than the conditional (ternary) operator.

```angular-html
{{ (isAdmin ? 'Access granted' : 'Access denied') | uppercase }}
```

If the same expression were written without parentheses:

```angular-html
{{ isAdmin ? 'Access granted' : 'Access denied' | uppercase }}
```

It will be parsed instead as:

```angular-html
{{ isAdmin ? 'Access granted' : ('Access denied' | uppercase) }}
```

Always use parentheses in your expressions when operator precedence may be ambiguous.
-->
파이프 연산자는 `+`, `-`, `*`, `/`, `%`, `&&`, `||`, `??` 와 같은 이진 연산자보다 우선순위가 낮습니다.

```angular-html
<!-- firstName 과 lastName 을 조합하고 대문자 파이프로 전달합니다. -->
{{ firstName + lastName | uppercase }}
```

파이프 연산자는 삼항연산자보다는 우선순위가 높습니다.

```angular-html
{{ (isAdmin ? 'Access granted' : 'Access denied') | uppercase }}
```

그래서 괄호를 사용하지 않아도 됩니다:

```angular-html
{{ isAdmin ? 'Access granted' : 'Access denied' | uppercase }}
```

하지만 이렇게 작성하면 결과가 달라집니다:

```angular-html
{{ isAdmin ? 'Access granted' : ('Access denied' | uppercase) }}
```

연산자 우선순위가 모호하다면 반드시 괄호를 사용하세요.


<!--
### Change detection with pipes
-->
### 파이프가 변화를 감지하는 방식

<!--
By default, all pipes are considered `pure`, which means that it only executes when a primitive input value (such as a `String`, `Number`, `Boolean`, or `Symbol`) or a object reference (such as `Array`, `Object`, `Function`, or `Date`) is changed. Pure pipes offer a performance advantage because Angular can avoid calling the transformation function if the passed value has not changed.

As a result, this means that mutations to object properties or array items are not detected unless the entire object or array reference is replaced with a different instance. If you want this level of change detection, refer to [detecting changes within arrays or objects](#detecting-change-within-arrays-or-objects).
-->
기본적으로 파이프는 순수 함수(pure function)입니다.
`String`, `Number`, `Boolean`, `Symbol`과 같은 기본 타입이나 `Array`, `Object`, `Function`, `Date`와 같은 객체를 입력값으로 받습니다.
순수 파이프는 입력값이 변경되지 않으면 변환 함수를 실행하지 않기 때문에 성능면에서 유리합니다.

그래서 객체나 배열은 참조 자체가 변경되지 않으면 데이터가 변경된 것으로 인식하지 않습니다.
참조는 동일하지만 내부 데이터가 변경된 경우라면 [배열이나 객체 내부 변화 감지하기](#detecting-change-within-arrays-or-objects) 섹션을 참고하세요.


<!--
## Creating custom pipes
-->
## 커스텀 파이프 정의하기

<!--
You can define a custom pipe by implementing a TypeScript class with the `@Pipe` decorator. A pipe must have two things:

- A name, specified in the pipe decorator
- A method named `transform` that performs the value transformation.

The TypeScript class should additionally implement the `PipeTransform` interface to ensure that it satisfies the type signature for a pipe.

Here is an example of a custom pipe that transforms strings to kebab case:

```angular-ts
// kebab-case.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
```
-->
TypeScript 클래스에 `@Pipe` 데코레이터를 붙이면 커스텀 파이프를 정의할 수 있습니다.
커스텀 파이프는 두 가지를 꼭 지정해야 합니다:

- 이름 - 파이프 데코레이터에서 지정합니다.
- 값을 변환하는 `transform` 메서드

그리고 TypeScript 클래스는 파이프 구현 방식에 맞도록 `PipeTransform` 인터페이스를 확장해야 합니다.

문자열을 케밥 케이스로 변환하는 커스텀 파이프는 이렇게 구현하면 됩니다:

```angular-ts
// kebab-case.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
```

<!--
### Using the `@Pipe` decorator
-->
### `@Pipe` 데코레이터 활용하기

<!--
When creating a custom pipe, import `Pipe` from the `@angular/core` package and use it as a decorator for the TypeScript class.

```angular-ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe {}
```

The `@Pipe` decorator requires a `name` that controls how the pipe is used in a template.
-->
커스텀 파이프를 생성하려면 `@angular/core` 패키지에서 `Pipe` 심볼을 로드해서 TypeScript 클래스에 데코레이터로 지정하면 됩니다.

```angular-ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe {}
```

`@Pipe` 데코레이터는 템플릿에서 사용할 수 있도록 `name`을 반드시 지정해야 합니다.


<!--
### Naming convention for custom pipes
-->
### 커스텀 파이프의 명명규칙

<!--
The naming convention for custom pipes consists of two conventions:

- `name` - camelCase is recommended. Do not use hyphens.
- `class name` - PascalCase version of the `name` with `Pipe` appended to the end
-->
커스텀 파이프는 다음과 같은 명명규칙을 따르면 됩니다:

- `name` - 캐멀 케이스(camelCase)를 추천합니다. 하이픈은 사용하지 마세요.
- `class name` - `name`을 파스칼 케이스(PascalCase)로 변환한 후 `Pipe`를 붙이세요.


<!--
### Implement the `PipeTransform` interface
-->
## `PipeTransform` 인터페이스 확장하기

<!--
In addition to the `@Pipe` decorator, custom pipes should always implement the `PipeTransform` interface from `@angular/core`.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {}
```

Implementing this interface ensures that your pipe class has the correct structure.
-->
커스텀 파이프는 `@angular/core` 패키지로 제공되는 `PipeTransform` 인터페이스를 확장해야 합니다.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {}
```

이 인터페이스를 활용하면 파이프 구현 요건에 맞게 파이프 클래스를 구현할 수 있습니다.


<!--
### Transforming the value of a pipe
-->
### 입력받은 값 변환하기

<!--
Every transformation is invoked by the `transform` method with the first parameter being the value being passed in and the return value being the transformed value.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string): string {
    return `My custom transformation of ${value}.`
  }
}
```
-->
파이프의 변환 과정은 `transform` 메서드에서 이루어집니다.
파이프로 전달한 값이 이 메서드의 인자로 전달되며, 값을 변환한 후에 함수의 반환값으로 반환하면 됩니다.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string): string {
    return `My custom transformation of ${value}.`
  }
}
```


<!--
### Adding parameters to a custom pipe
-->
### 커스텀 파이프의 옵션 인자 추가하기

<!--
You can add parameters to your transformation by adding additional parameters to the `transform` method:

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`

    if (format === 'uppercase') {
      return msg.toUpperCase()
    } else {
      return msg
    }
  }
}
```
-->
파이프에 추가로 전달한 옵션은 `transform` 메서드의 추가 인자로 받을 수 있습니다:

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`

    if (format === 'uppercase') {
      return msg.toUpperCase()
    } else {
      return msg
    }
  }
}
```


<!--
### Detecting change within arrays or objects
-->
### 배열과 객체의 변화 감지하기

<!--
When you want a pipe to detect changes within arrays or objects, it must be marked as an impure function by passing the `pure` flag with a value of `false`.

Avoid creating impure pipes unless absolutely necessary, as they can incur a significant performance penalty if used without care.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNamesImpure',
  pure: false,
})
export class JoinNamesImpurePipe implements PipeTransform {
  transform(names: string[]): string {
    return names.join();
  }
}
```

Angular developers often adopt the convention of including `Impure` in the pipe `name` and class name to indicate the potential performance pitfall to other developers.
-->
파이프가 배열이나 객체 내부의 변화를 감지하려면 `@Pipe` 데코레이터에 `pure` 플래그를 `false`로 지정해서 순수하지 않은 함수라고 표시하면 됩니다.

순수하지 않은 함수는 파이프는 꼭 필요한 경우가 아닌 한 사용하지 마세요.
주의해서 사용하지 않으면 성능이 심각하게 나빠질 수 있습니다.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNamesImpure',
  pure: false,
})
export class JoinNamesImpurePipe implements PipeTransform {
  transform(names: string[]): string {
    return names.join();
  }
}
```

서드 파티 파이프 중에 성능 저하가 우려되는 파이프는 TypeScript 클래스와 `name`에 `Impure` 접미사를 붙여서 경고하는 경우도 있습니다.
