<!--
# Transforming Data Using Pipes
-->
# 파이프로 데이터 표시형식 변환하기

<!--
Use [pipes](guide/glossary#pipe "Definition of a pipe") to transform strings, currency amounts, dates, and other data for display.
Pipes are simple functions to use in [template expressions](guide/glossary#template-expression "Definition of template expression") to accept an input value and return a transformed value.
Pipes are useful because you can use them throughout your application, while only declaring each pipe once.
For example, you would use a pipe to show a date as **April 15, 1988** rather than the raw string format.

<div class="alert is-helpful">

For the sample application used in this topic, see the <live-example></live-example>.

</div>

Angular provides built-in pipes for typical data transformations, including transformations for internationalization \(i18n\), which use locale information to format data.
The following are commonly used built-in pipes for data formatting:

| Pipes                                       | Details |
|:---                                         |:---     |
| [`DatePipe`](api/common/DatePipe)           | Formats a date value according to locale rules.                                              |
| [`UpperCasePipe`](api/common/UpperCasePipe) | Transforms text to all upper case.                                                           |
| [`LowerCasePipe`](api/common/LowerCasePipe) | Transforms text to all lower case.                                                           |
| [`CurrencyPipe`](api/common/CurrencyPipe)   | Transforms a number to a currency string, formatted according to locale rules.               |
| [`DecimalPipe`](api/common/DecimalPipe)     | Transforms a number into a string with a decimal point, formatted according to locale rules. |
| [`PercentPipe`](api/common/PercentPipe)     | Transforms a number to a percentage string, formatted according to locale rules.             |

<div class="alert is-helpful">

*   For a complete list of built-in pipes, see the [pipes API documentation](api/common#pipes "Pipes API reference summary").
*   To learn more about using pipes for internationalization \(i18n\) efforts, see [formatting data based on locale][AioGuideI18nCommonFormatDataLocale].

</div>

Create pipes to encapsulate custom transformations and use your custom pipes in template expressions.
-->
[파이프](guide/glossary#pipe "Definition of a pipe")를 사용하면 문자열, 통화, 일자와 같은 데이터를 원하는 형태로 화면에 표시할 수 있습니다.
파이프는 [템플릿 표현식](guide/glossary#template-expression "Definition of template expression")과 마찬가지로 어떤 값을 입력받아서 변환된 데이터를 반환하는 함수입니다.
특히 파이프는 한번만 선언해두면 애플리케이션 어느곳이든 자유롭게 사용할 수 있기 때문에 유용합니다.
문자열을 `toString()`으로 변환해서 화면에 표시하는 것보다는 *April 15, 1988* 이라고 표시하는 것이 사용자가 알아보기 편하기 때문에 파이프는 Angular 앱 곳곳에 자주 사용합니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>

Angular는 일반적인 데이터 변환용으로 사용할 수 있는 기본 파이프를 몇가지 지원하며, 이 때 지역이나 국가에서 자주 사용하는 형식에 맞는 국제화(internationalization, i18n)도 지원합니다.
자주 사용하는 기본 파이프는 이런 것들이 있습니다:

| 파이프                                         | 설명                                             |
|:--------------------------------------------|:-----------------------------------------------|
| [`DatePipe`](api/common/DatePipe)           | 날짜 데이터를 원하는 형식으로 변환합니다.                        |
| [`UpperCasePipe`](api/common/UpperCasePipe) | 문자열을 모두 대문자로 변환합니다.                            |
| [`LowerCasePipe`](api/common/LowerCasePipe) | 문자열을 모두 소문자로 변환합니다.                            |
| [`CurrencyPipe`](api/common/CurrencyPipe)   | 숫자를 통화 단위로 변환합니다. 지역에 맞는 표시 형식도 적용할 수 있습니다.    |
| [`DecimalPipe`](api/common/DecimalPipe)     | 숫자가 표시되는 자릿수를 지정합니다. 지역에 맞는 표시 형식도 적용할 수 있습니다. |
| [`PercentPipe`](api/common/PercentPipe)     | 숫자를 백분율로 변환합니다. 지역에 맞는 표시 형식도 적용할 수 있습니다.      |

<div class="alert is-helpful">

*   Angular가 제공하는 기본 파이프를 살펴보려면 [파이프 API 문서](api/common#pipes "Pipes API reference summary")를 참고하세요.
*   파이프에 국제화\(internationalization, i18n\)가 적용되는 과정을 자세하게 확인하려면 [지역에 맞게 데이터 변환하기][AioGuideI18nCommonFormatDataLocale] 문서를 참고하세요.

</div>

Create pipes to encapsulate custom transformations and use your custom pipes in template expressions.


<!--
## Prerequisites
-->
## 사전지식

<!--
To use pipes you should have a basic understanding of the following:

*   [Typescript](guide/glossary#typescript "Definition of Typescript") and HTML5 programming
*   [Templates](guide/glossary#template "Definition of a template") in HTML with CSS styles
*   [Components](guide/glossary#component "Definition of a component")
-->
파이프에 대해 이해하려면 다음 내용들을 먼저 이해하고 있는 것이 좋습니다:

*   [Typescript](guide/glossary#typescript "Definition of Typescript")와 HTML5 문법
*   [템플릿](guide/glossary#template "Definition of a template")에서 HTML과 CSS 스타일을 구성하는 방법
*   [컴포넌트](guide/glossary#component "Definition of a component")


<!--
## Using a pipe in a template
-->
## 템플릿에 파이프 사용하기

<!--
To apply a pipe, use the pipe operator (`|`) within a template expression as shown in the following code example.

<code-example header="birthday.component.html (template)" path="pipes/src/app/birthday.component.html"></code-example>

The component's `birthday` value flows through the pipe operator (`|`) to the [`DatePipe`](api/common/DatePipe) whose pipe name is `date`.
The pipe renders the date in the default format as **Apr 15, 1988**.

Look at the component class.

<code-example header="birthday.component.ts (class)" path="pipes/src/app/birthday.component.ts"></code-example>

Because this is a [standalone component](guide/standalone-components), it imports the `DatePipe` from `@angular/common`, the source of all built-in pipes.
-->
파이프를 사용하려면 템플릿 표현식에 파이프 연산자\(`|`\)를 사용하고 파이프 *이름*을 지정하면 됩니다.

<code-example header="birthday.component.html (템플릿)" path="pipes/src/app/birthday.component.html"></code-example>

그러면 컴포넌트의 `birthday` 값이 파이프 연산자(`|`)를 통해 파이프 이름이 `date`인 [`DatePipe`](api/common/DatePipe)로 전달됩니다.
이 파이프는 날짜 데이터를 시스템 기본 형식인 **Apr 15, 1988** 라고 변환합니다.

컴포넌트 클래스는 이렇습니다.

<code-example header="birthday.component.ts (클래스)" path="pipes/src/app/birthday.component.ts"></code-example>

이 컴포넌트는 [단독 컴포넌트](guide/standalone-components)이기 때문에 `@angular/common`에서 `DatePipe`를 직접 불러왔습니다.


<a id="parameterizing-a-pipe"></a>

<!--
## Transforming data with parameters and chained pipes
-->
## 추가 형식 지정하기, 체이닝하기

<!--
Some pipes have *optional* parameters to fine-tune the pipe's output.

For example, the [`CurrencyPipe`](api/common/CurrencyPipe "API reference") accepts a country code as a parameter.
To specify the parameter, follow the pipe name (`currency`) with a colon (`:`) and the parameter value (a country code).

The template expression `{{ amount | currency:'EUR' }}` displays the amount, prefixed with the Euros symbol (€).

Some pipes accept multiple *optional* parameters. Pass each parameter to the pipe, separated by colons.

For example, `{{ amount | currency:'EUR':'Euros '}}` displays the amount with the label "Euros" (the second parameter) instead of the Euros symbol.

Some pipes, such as [`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe"), *require* at least one parameter and may allow more *optional* parameters. 

The expression `{{ anArray | slice:1:5 }}` displays a new string containing a subset of the elements starting with element `1` and ending with element `5`.
-->
파이프 중에는 변환값을 조정하는 인자를 *추가로* 받는 파이프도 있습니다.

[`CurrencyPipe`](api/common/CurrencyPipe "API reference")를 예를 들면, 이 파이프는 국가 코드를 인자로 받습니다.
추가 인자는 파이프 이름(`currency`) 뒤에 콜론(`:`)를 붙이고 전달하면 됩니다.

템플릿 표현식에  `{{ amount | currency:'EUR' }}` 라고 사용하면 `amount`에 있는 숫자가 유로 단위로 변환된 후에 유로 기호(€)를 붙여 표시됩니다.

파이프 중에는 *추가* 인자를 여러개 받는 파이프도 있습니다.
개별 인자는 콜론으로 구분합니다.

그래서 `{{ amount | currency:'EUR':'Euros '}}` 라고 사용하면 숫자를 유로 단위로 변환한 후에 유로 기호 대신 "Euros"가 붙습니다.

그리고 [`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe")와 같이, 최대 개수는 제한이 없지만 최소한 인자 하나를 *필수로* 요구하는 파이프도 있습니다. 

`{{ anArray | slice:1:5 }}`라고 사용하면 배열이나 문자열에서 `1`번째 엘리먼트부터 `5`번째 엘리먼트까지를 반환합니다.


<!--
## Example: Formatting a date
-->
## 예제: 날짜 형식 지정하기

<!--
The following example demonstrates two ways to format a hero's birthdate with the [`DatePipe`](api/common/DatePipe "API reference").

<code-tabs>
    <code-pane header="birthday-formatting.component.html (template)" path="pipes/src/app/birthday-formatting.component.html"></code-pane>
    <code-pane header="birthday-formatting.component.ts (class)" path="pipes/src/app/birthday-formatting.component.ts"></code-pane>
</code-tabs>

In the template, the first expression passes the birthdate to the `DatePipe` *with a literal* date format parameter, "shortDate". The output is **04/15/88**.

The second expression passes the birthdate to the `DatePipe` with a date format parameter *bound to a component property* (`format`). 

Clicking the "Toggle" button switches that property value between two of the [many possible pre-defined formats](api/common/DatePipe#pre-defined-format-options), `'mediumDate'` and `'fullDate'`. The output is either **April 15, 1988** or **Friday, April 15, 1988**.

The page displays the birthdate in the specified format.
-->
아래 코드는 히어로의 생일을 [`DatePipe`](api/common/DatePipe "API reference")로 변환해서 표시하는 예제 코드입니다.

<code-tabs>
    <code-pane header="birthday-formatting.component.html (템플릿)" path="pipes/src/app/birthday-formatting.component.html"></code-pane>
    <code-pane header="birthday-formatting.component.ts (클래스)" path="pipes/src/app/birthday-formatting.component.ts"></code-pane>
</code-tabs>

템플릿에서 첫번째 표현식은 `DatePipe`의 추가 인자로 "shortDate"를 지정했습니다. 화면에는 **04/15/88**라고 표시됩니다.

두번째 표현식은 `DatePipe`의 추가 인자로 *컴포넌트 프로프티(`format`)* 를 바인딩했습니다. 

사용자가 화면에서 "Toggle" 버튼을 클릭하면 [사전에 정의된 형식](api/common/DatePipe#pre-defined-format-options) 중에서 `'mediumDate'`과 `'fullDate'`를 전환합니다.
그래서 화면에는 **April 15, 1988** 나 **Friday, April 15, 1988** 가 표시됩니다.


<!--
## Example: Chaining two pipes together
-->
## 예제: 파이프 체이닝

<!--
Connect multiple pipes, using "pipe chaining syntax", so that the output of one pipe becomes the input to the next.

The following example passes the birthdate to the `DatePipe` and then forwards the result to the [`UpperCasePipe`](api/common/UpperCasePipe "API reference") pipe, using "pipe chaining syntax".

Once again, it demonstrates the `DatePipe` both *with* and *without* a format parameter. Note that both results (**APR 15, 1988** and **FRIDAY, APRIL 15, 1988**) are in uppercase.

<code-tabs>
    <code-pane header="birthday-pipe-chaining.component.html (template)" path="pipes/src/app/birthday-pipe-chaining.component.html"></code-pane>
    <code-pane header="birthday-pipe-chaining.component.ts (class)" path="pipes/src/app/birthday-pipe-chaining.component.ts"></code-pane>
</code-tabs>

Switch to the class file to see that this is a [standalone component](guide/standalone-components); it imports the two pipes from `@angular/common`, the source of all built-in pipes.
-->
한 파이프에서 나온 출력값을 다른 파이프의 입력으로 전달하면서 파이프 여러개를 한 번에 연결하는 것을 파이프 체이닝이라고 합니다.

아레 예제는 히어로의 생일 데이터를 `DatePipe`로 전달한 후에 [`UpperCasePipe`](api/common/UpperCasePipe "API reference")로 다시 전달하는 파이프 체이닝 예제입니다.

다시 한 번 언급하지만, `DatePipe`는 날짜 형식을 인자로 받거나 생략할 수 있습니다.
그래서 화며에는 이전 예제의 결과값이 대문자로 변환되어 **APR 15, 1988** and **FRIDAY, APRIL 15, 1988**가 표시됩니다.

<code-tabs>
    <code-pane header="birthday-pipe-chaining.component.html (템플릿)" path="pipes/src/app/birthday-pipe-chaining.component.html"></code-pane>
    <code-pane header="birthday-pipe-chaining.component.ts (클래스)" path="pipes/src/app/birthday-pipe-chaining.component.ts"></code-pane>
</code-tabs>

이 클래스는 [단독 컴포넌트](guide/standalone-components)이기 때문에 파이프를 로드하기 위해 `@angular/common` 패키지를 참조합니다.


<a id="Custom-pipes"></a>

<!--
## Creating pipes for custom data transformations
-->
## 커스텀 파이프 만들기

<!--
Create custom pipes to encapsulate transformations that are not provided with the built-in pipes.
Then, use your custom pipe in template expressions, the same way you use built-in pipes &mdash;to transform input values to output values for display.
-->
Create custom pipes to encapsulate transformations that are not provided with the built-in pipes.
Then, use your custom pipe in template expressions, the same way you use built-in pipes &mdash;to transform input values to output values for display.
Angular 기본 파이프로 원하는 변환작업을 수행할 수 없다면 커스텀 파이프를 만들어서 활용하면 됩니다.
커스텀 파이프는 기본 파이프와 같은 방식으로 템플릿 표현식에 사용할 수 있으며, 데이터를 화면에 원하는 형태로 표시하기 위해 어떤 값을 받아서 가공하고 반환한다는 점도 같습니다.


<!--
### Marking a class as a pipe
-->
### 클래스를 파이프로 지정하기

<!--
To mark a class as a pipe and supply configuration metadata, apply the [`@Pipe`](api/core/Pipe "API reference for Pipe") [decorator](guide/glossary#decorator--decoration "Definition for decorator") to the class.
Use [UpperCamelCase](guide/glossary#case-types "Definition of case types") \(the general convention for class names\) for the pipe class name, and [camelCase](guide/glossary#case-types "Definition of case types") for the corresponding `name` string.
Do not use hyphens in the `name`.
For details and more examples, see [Pipe names](guide/styleguide#pipe-names "Pipe names in the Angular coding style guide").

Use `name` in template expressions as you would for a built-in pipe.

<div class="alert is-important">

*   Include your pipe in the `declarations` field of the `NgModule` metadata in order for it to be available to a template.
    See the `app.module.ts` file in the example application \(<live-example></live-example>\).
    For details, see [NgModules](guide/ngmodules "NgModules introduction").

*   Register your custom pipes.
    The [Angular CLI](cli "CLI Overview and Command Reference") [`ng generate pipe`](cli/generate#pipe "ng generate pipe in the CLI Command Reference") command registers the pipe automatically.

</div>
-->
클래스에 [`@Pipe`](api/core/Pipe "API reference for Pipe") [데코레이터](guide/glossary#decorator--decoration "Definition for decorator")를 지정하고 필요한 내용을 메타데이터에 작성하면 클래스를 파이프로 만들 수 있습니다.
이 때 파이프 클래스 이름은 일반적인 스타일로 [대문자 캐멀 케이스(UpperCamelCase)](guide/glossary#case-types "Definition of case types")로 작성하며 메타데이터 `name`에 해당하는 문자열은 [캐멀 케이스(camelCase)](guide/glossary#case-types "Definition of case types")로 지정합니다.
`name`에 하이픈\(`-`\)을 사용하지 마세요.
자세한 내용은 코딩스타일 가이드 [Pipe 이름](guide/styleguide#pipe-names "Pipe names in the Angular coding style guide") 섹션을 참고하세요.

파이프의 `name`으로 지정한 문자열은 Angular 기본 파이프와 같은 방식으로 템플릿 표현식에 사용할 수 있습니다.

<div class="alert is-important">

*   클래스에 파이프 데코레이터를 붙여서 파이프로 선언한 후에는 `NgModule` 메타데이터의 `declarations` 필드에 이 파이프를 등록해야 템플릿에 사용할 수 있습니다.
    예제 앱\(<live-example></live-example>\)의 `app.module.ts` 파일에서 이 내용을 확인할 수 있습니다.
    자세한 내용은 [NgModules](guide/ngmodules "NgModules introduction") 문서를 참고하세요.

*   [Angular CLI](cli "CLI Overview and Command Reference")로 [`ng generate pipe`](cli/generate#pipe "ng generate pipe in the CLI Command Reference") 명령을 실행하면 파이프를 생성하고 자동으로 등록합니다.

</div>


<!--
### Using the PipeTransform interface
-->
### PipeTransform 인터페이스 적용하기

<!--
Implement the [`PipeTransform`](api/core/PipeTransform "API reference for PipeTransform") interface in your custom pipe class to perform the transformation.

Angular invokes the `transform` method with the value of a binding as the first argument, and any parameters as the second argument in list form, and returns the transformed value.
-->
커스텀 파이프 클래스가 제대로 동작하려면 [`PipeTransform`](api/core/PipeTransform "API reference for PipeTransform") 인터페이스를 받아서\(`implements`\) 구현해야 합니다.

템플릿 표현식에 커스텀 파이프가 사용되면 Angular가 `transform()` 메소드를 실행하며 이 때 인자가 함께 전달되면 `transform()` 메소드가 실행될 때 인자로 전달됩니다.


<!--
### Example: Transforming a value exponentially
-->
### 예제: 지수 변환하기

<!--
In a game, you might want to implement a transformation that raises a value exponentially to increase a hero's power.
For example, if the hero's score is 2, boosting the hero's power exponentially by 10 produces a score of 1024.
Use a custom pipe for this transformation.

The following code example shows two component definitions:

| Files                          | Details |
|:---                            |:---     |
| `exponential-strength.pipe.ts` | Defines a custom pipe named `exponentialStrength` with the `transform` method that performs the transformation. It defines an argument to the `transform` method \(`exponent`\) for a parameter passed to the pipe. |
| `power-booster.component.ts`   | Demonstrates how to use the pipe, specifying a value \(`2`\) and the exponent parameter \(`10`\).                                                                                                                   |

<code-tabs>
    <code-pane header="src/app/exponential-strength.pipe.ts" path="pipes/src/app/exponential-strength.pipe.ts"></code-pane>
    <code-pane header="src/app/power-booster.component.ts" path="pipes/src/app/power-booster.component.ts"></code-pane>
</code-tabs>

<!-todo: replace with screen capture ->

The browser displays the following:

<code-example format="output" hideCopy language="none">

Power Booster

Superpower boost: 1024

</code-example>

<div class="alert is-helpful">

To examine the behavior the `exponentialStrength` pipe in the <live-example></live-example>, change the value and optional exponent in the template.

</div>
-->
게임을 만드는데 어떤 히어로의 파워를 제곱해서 표현하는 기능을 구현한다고 합시다.
히어로 점수가 2라면 파워는 2의 10제곱인 1024라고 표현하는 식입니다.
이런 데이터 변환은 커스텀 파이프를 활용하면 구현할 수 있습니다.

아래 두 파일의 내용을 확인해 보세요:

| 파일                             | 설명                                                                                              |
|:-------------------------------|:------------------------------------------------------------------------------------------------|
| `exponential-strength.pipe.ts` | `exponentialStrength`라는 이름으로 커스텀 파이프가 정의되어 있으며, 변환 로직은 이 파이프 클래스의 `transform()` 메소드에 구현되어 있습니다. |
| `power-booster.component.ts`   | 파이프는 이렇게 사용합니다. `2` 값을 `10` 제곱하도록 파이프 인자를 지정했습니다.                                               |

<code-tabs>
    <code-pane header="src/app/exponential-strength.pipe.ts" path="pipes/src/app/exponential-strength.pipe.ts"></code-pane>
    <code-pane header="src/app/power-booster.component.ts" path="pipes/src/app/power-booster.component.ts"></code-pane>
</code-tabs>

그러면 브라우저에 이렇게 표시됩니다:

<code-example format="output" hideCopy language="none">

Power Booster

Superpower boost: 1024

</code-example>

<div class="alert is-helpful">

`exponentialStrength` 파이프가 직접 동작하는 것을 확인하려면 <live-example></live-example>를 참고하세요. 템플릿에 지정한 파이프 인자 값을 바꾸면 결과값도 변경됩니다.

</div>


<a id="change-detection"></a>

<!--
## Detecting changes with data binding in pipes
-->
## 파이프에 바인딩된 데이터 변화감지

<!--
You use [data binding](guide/glossary#data-binding "Definition of data binding") with a  pipe to display values and respond to user actions.
If the data is a primitive input value, such as `String` or `Number`, or an object reference as input, such as `Date` or `Array`, Angular executes the pipe whenever it detects a change for the input value or reference.

For example, you could change the previous custom pipe example to use two-way data binding with `ngModel` to input the amount and boost factor, as shown in the following code example.

<code-example header="src/app/power-boost-calculator.component.ts" path="pipes/src/app/power-boost-calculator.component.ts"></code-example>

The `exponentialStrength` pipe executes every time the user changes the "normal power" value or the "boost factor".

Angular detects each change and immediately runs the pipe.
This is fine for primitive input values.
However, if you change something *inside* a composite object \(such as the month of a date, an element of an array, or an object property\), you need to understand how change detection works, and how to use an `impure` pipe.
-->
파이프에 [데이터를 바인딩](guide/glossary#data-binding "Definition of data binding")하면 사용자의 동작에 반응하는 방식으로 파이프를 실행할 수 있습니다.
이 때 파이프에 전달되는 인자가 `String`, `Number`와 같은 기본 자료형이라면 값이 변경될 때, `Date`, `Array`와 같은 객체 참조 형태라면 참조하는 객체가 변경될 때마다 파이프의 변환로직이 실행됩니다.

그래서 이전 섹션에서 구현했던 커스텀 파이프에 `ngModel`로 양방향 바인딩을 연결하면 다음과 같이 구현할 수 있습니다.

<code-example header="src/app/power-boost-calculator.component.ts" path="pipes/src/app/power-boost-calculator.component.ts"></code-example>

이제 `exponentialStrength` 파이프는 사용자가 "normal power" 값이나 "boost factor" 값을 변경할 때마다 실행되는 것을 확인할 수 있습니다.

Angular는 인자값이 변경되거나 참조 객체가 변경되는 것을 감지할 때마다 파이프 함수를 다시 실행합니다.
인자가 기본 자료형인 경우에는 크게 문제되지 않습니다.
하지만 Date 객체의 월이 바뀌거나 배열 안에 있는 엘리먼트가 변경되는 경우, 오브젝트 프로퍼티가 변경되는 경우와 같이 객체 *안에 있는* 데이터가 변경되는 경우에는 파이프가 변화를 어떻게 감지하고 동작하는지 제대로 이해해야 합니다.
그런 다음에는 순수하지 않은\(impure\) 파이프를 어떻게 사용하는지 알아봅시다.


<!--
### How change detection works
-->
### 변화를 감지하는 방식

<!--
Angular looks for changes to data-bound values in a [change detection](guide/glossary#change-detection "Definition of change detection") process that runs after every DOM event: every keystroke, mouse move, timer tick, and server response.
The following example, which doesn't use a pipe, demonstrates how Angular uses its default change detection strategy to monitor and update its display of every hero in the `heroes` array.
The example tabs show the following:

| Files                               | Details |
|:---                                 |:---     |
| `flying-heroes.component.html (v1)` | The `*ngFor` repeater displays the hero names.                     |
| `flying-heroes.component.ts (v1)`   | Provides heroes, adds heroes into the array, and resets the array. |

<code-tabs>
    <code-pane header="src/app/flying-heroes.component.html (v1)" path="pipes/src/app/flying-heroes.component.html" region="template-1"></code-pane>
    <code-pane header="src/app/flying-heroes.component.ts (v1)" path="pipes/src/app/flying-heroes.component.ts" region="v1"></code-pane>
</code-tabs>

Angular updates the display every time the user adds a hero.
If the user clicks the **Reset** button, Angular replaces `heroes` with a new array of the original heroes and updates the display.
If you add the ability to remove or change a hero, Angular would detect those changes and update the display as well.

However, executing a pipe to update the display with every change would slow down your application's performance.
So Angular uses a faster change-detection algorithm for executing a pipe, as described in the next section.
-->
Angular는 키입력, 마우스 이동, 타이머 만료, 서버 응답과 같은 DOM 이벤트가 발생할 때마다 [변화 감지 동작](guide/glossary#change-detection "Definition of change detection")을 실행하고 바인딩된 데이터가 변경되었는지 검사합니다.
아래 예제는 파이프를 사용하지 않았지만 Angular의 기본 변화 감지 로직이 어떻게 동작하는지 확인할 수 있는 예제 코드입니다.
이런 내용을 확인해 보세요:

| 파일                                  | 설명                                                                         |
|:------------------------------------|:---------------------------------------------------------------------------|
| `flying-heroes.component.html (v1)` | 히어로의 이름을 표시하기 위해 `*ngFor` 를 사용했습니다.                                        |
| `flying-heroes.component.ts (v1)`   | 템플릿에 사용할 `heroes` 배열이 선언되어 있으며, 이 배열에 히어로를 추가하거나 배열을 초기화하는 메서드가 정의되어 있습니다. |

<code-tabs>
    <code-pane header="src/app/flying-heroes.component.html (v1)" path="pipes/src/app/flying-heroes.component.html" region="template-1"></code-pane>
    <code-pane header="src/app/flying-heroes.component.ts (v1)" path="pipes/src/app/flying-heroes.component.ts" region="v1"></code-pane>
</code-tabs>

이제 사용자가 히어로를 추가하면 그 때마다 Angular가 화면을 갱신합니다.
사용자가 **Reset** 버튼을 클릭하면 Angular가 `heroes` 배열을 새 배열로 교체하면서 이 때 변경된 내용도 화면에 표시됩니다.
히어로 한명을 제거하거나 추가하는 경우에도 변경된 내용이 화면에 표시됩니다.

그런데 화면이 갱신될때마다 파이프가 계속 실행되면 앱 성능을 저하할 수 있습니다.
그래서 Angular는 파이프를 실행할 때 조금 다른 변화 감지 알고리즘을 사용합니다.
다음 섹션에서 이 내용에 대해 알아봅시다.


<a id="pure-and-impure-pipes"></a>

<!--
### Detecting pure changes to primitives and object references
-->
### 기본 자료형의 값이 변경되었는지, 객체 참조가 변경되었는지 감지하기

<!--
By default, pipes are defined as *pure* so that Angular executes the pipe only when it detects a *pure change* to the input value.
A pure change is either a change to a primitive input value \(such as `String`, `Number`, `Boolean`, or `Symbol`\), or a changed object reference \(such as `Date`, `Array`, `Function`, or `Object`\).

<a id="pure-pipe-pure-fn"></a>

A pure pipe must use a pure function, which is one that processes inputs and returns values without side effects.
In other words, given the same input, a pure function should always return the same output.

With a pure pipe, Angular ignores changes within composite objects, such as a newly added element of an existing array, because checking a primitive value or object reference is much faster than performing a deep check for differences within objects.
Angular can quickly determine if it can skip executing the pipe and updating the view.

However, a pure pipe with an array as input might not work the way you want.
To demonstrate this issue, change the previous example to filter the list of heroes to just those heroes who can fly.
Use the `FlyingHeroesPipe` in the `*ngFor` repeater as shown in the following code.
The tabs for the example show the following:

*   The template \(`flying-heroes.component.html (flyers)`\) with the new pipe
*   The `FlyingHeroesPipe` custom pipe implementation \(`flying-heroes.pipe.ts`\)

<code-tabs>
    <code-pane header="src/app/flying-heroes.component.html (flyers)" path="pipes/src/app/flying-heroes.component.html" region="template-flying-heroes"></code-pane>
    <code-pane header="src/app/flying-heroes.pipe.ts" path="pipes/src/app/flying-heroes.pipe.ts" region="pure"></code-pane>
</code-tabs>

The application now shows unexpected behavior: When the user adds flying heroes, none of them appear under "Heroes who fly."
This happens because the code that adds a hero does so by pushing it onto the `heroes` array:

<code-example header="src/app/flying-heroes.component.ts" path="pipes/src/app/flying-heroes.component.ts" region="push"></code-example>

The change detector ignores changes to elements of an array, so the pipe doesn't run.

The reason Angular ignores the changed array element is that the *reference* to the array hasn't changed.
Because the array is the same, Angular does not update the display.

One way to get the behavior you want is to change the object reference itself.
Replace the array with a new array containing the newly changed elements, and then input the new array to the pipe.
In the preceding example, create an array with the new hero appended, and assign that to `heroes`.
Angular detects the change in the array reference and executes the pipe.

To summarize, if you mutate the input array, the pure pipe doesn't execute.
If you *replace* the input array, the pipe executes and the display is updated.

The preceding example demonstrates changing a component's code to accommodate a pipe.

To keep your component independent of HTML templates that use pipes, you can, as an alternative, use an *impure* pipe to detect changes within composite objects such as arrays, as described in the next section.
-->
기본적으로 파이프는 *순수한\(pure\)* 상태로 정의되며 Angular는 이 파이프로 입력받는 값이 *정말 변경된 것\(pure change\)*을 감지할 때만 파이프 로직을 실행합니다.
이 때 값이 정말 변경되었다는 것은 `String`, `Number`, `Boolean`, `Symbol`과 같은 기본 자료형의 값이 변경되었거나, `Date`, `Array`, `Function`, `Object`와 같은 객체 참조가 변경된 것을 의미합니다.

<a id="pure-pipe-pure-fn"></a>

순수한 파이프\(pure pipe\)는 순수 함수\(pure function\)로 구현해야 하며, 이 말은 입력값을 받고 값을 반환할 때까지 외부의 영향을 받지 않아야 한다는 것을 의미합니다.
이를 다르게 표현하면, 어떤 값이 입력된다면 언제나 값을 반환해야 한다는 것을 의미합니다.

순수한 파이프를 사용하면 Angular는 객체 안에서 발생한 변화는 무시합니다.
그래서 배열 참조가 그대로인 상태로 항목이 추가되는 것을 감지하지 않는데, 이는 객체를 깊이 검사\(deep check\)하는 것보다 객체 참조가 변경되는 것만 감지하는 것이 훨씬 빠르기 때문입니다.
이 과정에서 변화가 감지되지 않으면 파이프 실행을 생략하고 넘어갑니다.

하지만 이 때문에 순수한 파이프에 배열을 인자로 전달하면 예상한 대로 파이프가 실행되지 않습니다.
이 현상을 확인하기 위해 이전에 만들었던 예제 코드를 살짝 바꿔서, 히어로 중에 날 수 있는 히어로만 필터링하는 파이프를 만들어 봅시다.
`*ngFor`로 `heroes` 배열을 순회할 때 `FlyingHeroesPipe`를 사용해서 다음과 같이 구현합니다:

*   새로 만드는 파이프는 템플릿 파일 `flying-heroes.component.html`에 사용합니다.
*   커스텀 파이프 `FlyingHeroesPipe`는 `flying-heroes.pipe.ts` 파일에 구현합니다.

<code-tabs>
    <code-pane header="src/app/flying-heroes.component.html (flyers)" path="pipes/src/app/flying-heroes.component.html" region="template-flying-heroes"></code-pane>
    <code-pane header="src/app/flying-heroes.pipe.ts" path="pipes/src/app/flying-heroes.pipe.ts" region="pure"></code-pane>
</code-tabs>

이렇게 구현하면 앱이 이상하게 동작합니다.
사용자가 비행할 수 있는 히어로를 추가해도 이 히어로는 "Heroes who fly." 아래에 표시되지 않습니다:

<code-example header="src/app/flying-heroes.component.ts" path="pipes/src/app/flying-heroes.component.ts" region="push"></code-example>

Angular 변화 감지기\(change detector\)는 배열의 항목이 변경된 것을 감지하지 않기 때문에 파이프도 실행되지 않습니다.

원인은 이전에 설명했듯이 `heroes` 배열을 *참조*하는 것은 그대로인 채로 배열 안에 항목을 추가했기 때문입니다.
그래서 파이프 인자가 변경되지 않은 것으로 간주하고 화면을 갱신하지 않습니다.

이 예제에서 참조하는 객체를 바꾸면 처음 의도한 대로 동작합니다.
원래 배열에 있던 항목과 새로 추가된 항목을 더해서 새로운 배열을 생성하고 이 배열을 `heroes`에 할당한 후에 파이프의 인자로 전달하면 됩니다.
그러면 파이프가 참조하는 배열이 변경되었기 때문에 Angular도 파이프 로직을 실행합니다.

정리하자면, 순수한 파이프에 입력 배열을 인자로 전달하면 이 배열 참조가 변경되지 않는 이상 파이프가 동작하지 않습니다.
이 경우에는 인자로 전달되는 배열 자체를 교체해야 합니다.

이 예제를 통해 파이프와 컴포넌트가 어떻게 연동되는지 알아봤습니다.

하지만 컴포넌트를 간단하게 유지하면서 HTML 템플릿과 분리된 상태를 유지하려는 용도로 파이프를 사용한다면, *순수하지 않은\(impure\)* 파이프를 사용해서 변화를 감지하는 방식이 더 나을 수 있습니다.
이 내용은 다음 섹션에서 살펴봅시다.


<a id="impure-flying-heroes"></a>

<!--
### Detecting impure changes within composite objects
-->
### 객체 안에서 변경된 내용 감지하기

<!--
To execute a custom pipe after a change *within* a composite object, such as a change to an element of an array, you need to define your pipe as `impure` to detect impure changes.
Angular executes an impure pipe every time it detects a change with every keystroke or mouse movement.

<div class="alert is-important">

While an impure pipe can be useful, be careful using one.
A long-running impure pipe could dramatically slow down your application.

</div>

Make a pipe impure by setting its `pure` flag to `false`:

<code-example header="src/app/flying-heroes.pipe.ts" path="pipes/src/app/flying-heroes.pipe.ts" region="pipe-decorator"></code-example>

The following code shows the complete implementation of `FlyingHeroesImpurePipe`, which extends `FlyingHeroesPipe` to inherit its characteristics.
The example shows that you don't have to change anything else&mdash;the only difference is setting the `pure` flag as `false` in the pipe metadata.

<code-tabs>
    <code-pane header="src/app/flying-heroes.pipe.ts (FlyingHeroesImpurePipe)" path="pipes/src/app/flying-heroes.pipe.ts" region="impure"></code-pane>
    <code-pane header="src/app/flying-heroes.pipe.ts (FlyingHeroesPipe)" path="pipes/src/app/flying-heroes.pipe.ts" region="pure"></code-pane>
</code-tabs>

`FlyingHeroesImpurePipe` is a good candidate for an impure pipe because the `transform` function is trivial and fast:

<code-example header="src/app/flying-heroes.pipe.ts (filter)" path="pipes/src/app/flying-heroes.pipe.ts" region="filter"></code-example>

You can derive a `FlyingHeroesImpureComponent` from `FlyingHeroesComponent`.
As shown in the following code, only the pipe in the template changes.

<code-example header="src/app/flying-heroes-impure.component.html (excerpt)" path="pipes/src/app/flying-heroes-impure.component.html" region="template-flying-heroes"></code-example>

<div class="alert is-helpful">

To confirm that the display updates as the user adds heroes, see the <live-example></live-example>.

</div>
-->
배열 안에 있는 항목이 변경되는 것과 같이 객체 *안에서* 변경된 것을 감지해서 커스텀 파이프가 실행되려면 파이프를 순수하지 않게(impure) 선언해야 합니다.
그러면 Angular 변화 감지가 동작하는 시점마다 순수하지 않은 파이프도 항상 실행됩니다.

<div class="alert is-important">

순수하지 않은 파이프가 유용하긴 하지만 사용에 주의해야 합니다.
이런 파이프 안에서 무거운 로직을 실행하면 앱 성능이 급격하게 저하될 수 있습니다.

</div>

순수하지 않은 파이프를 정의하려면 `pure` 플래그에 `false` 값을 지정하면 됩니다:

<code-example header="src/app/flying-heroes.pipe.ts" path="pipes/src/app/flying-heroes.pipe.ts" region="pipe-decorator"></code-example>

아래 코드에서 `FlyingHeroesImpurePipe`는 `FlyingHeroesPipe`를 상속받도록 구현했습니다.
따라서 파이프가 동작하는 로직은 모두 똑같고 파이프 메타데이터의 `pure` 플래그에 `false` 값을 지정한 것만 다릅니다.

<code-tabs>
    <code-pane header="src/app/flying-heroes.pipe.ts (FlyingHeroesImpurePipe)" path="pipes/src/app/flying-heroes.pipe.ts" region="impure"></code-pane>
    <code-pane header="src/app/flying-heroes.pipe.ts (FlyingHeroesPipe)" path="pipes/src/app/flying-heroes.pipe.ts" region="pure"></code-pane>
</code-tabs>

이 정도라면 `FlyingHeroesImpurePipe`에 있는 `transform()` 함수가 간단하고 실행도 빨리 끝나기 때문에 사용하기에 문제가 없습니다:

<code-example header="src/app/flying-heroes.pipe.ts (filter)" path="pipes/src/app/flying-heroes.pipe.ts" region="filter"></code-example>

`FlyingHeroesImpureComponent`는 `FlyingHeroesComponent`에 사용할 수 있습니다.
아래 코드처럼 템플릿에서 사용하는 파이프를 변경하기만 하면 됩니다.

<code-example header="src/app/flying-heroes-impure.component.html (일부)" path="pipes/src/app/flying-heroes-impure.component.html" region="template-flying-heroes"></code-example>

<div class="alert is-helpful">

<live-example></live-example>에서 히어로를 추가했을 때 화면이 갱신되는 것을 확인해 보세요.

</div>


<a id="async-pipe"></a>

<!--
## Unwrapping data from an observable
-->
## 옵저버블에서 데이터 추출하기

<!--
[Observables](guide/glossary#observable "Definition of observable") let you pass messages between parts of your application.
Observables are recommended for event handling, asynchronous programming, and handling multiple values.
Observables can deliver single or multiple values of any type, either synchronously \(as a function delivers a value to its caller\) or asynchronously on a schedule.

<div class="alert is-helpful">

For details and examples of observables, see the [Observables Overview](guide/observables#using-observables-to-pass-values "Using observables to pass values").

</div>

Use the built-in [`AsyncPipe`](api/common/AsyncPipe "API description of AsyncPipe") to accept an observable as input and subscribe to the input automatically.
Without this pipe, your component code would have to subscribe to the observable to consume its values, extract the resolved values, expose them for binding, and unsubscribe when the observable is destroyed in order to prevent memory leaks.
`AsyncPipe` is an impure pipe that saves boilerplate code in your component to maintain the subscription and keep delivering values from that observable as they arrive.

The following code example binds an observable of message strings
(`message$`) to a view with the `async` pipe.

<code-example header="src/app/hero-async-message.component.ts" path="pipes/src/app/hero-async-message.component.ts"></code-example>
-->
[옵저버블](guide/glossary#observable "Definition of observable")은 애플리케이션 안에서 메시지를 전달하는 용도로 활용할 수 있습니다.
그리고 옵저버블은 동기/비동기 방식을 선택해서 실행할 수 있으며 데이터를 여러번 전달할 수도 있기 때문에 이벤트를 처리할 때 자주 사용됩니다.

<div class="alert is-helpful">

옵저버블에 대해 자세하게 알아보려면 [옵저버블 개요](guide/observables#using-observables-to-pass-values "Using observables to pass values"") 섹션을 참고하세요.

</div>

Angular가 제공하는 [`AsyncPipe`](api/common/AsyncPipe "API description of AsyncPipe")를 사용하면서 파이프 인자로 옵저버블을 지정하면, 이 파이프는 옵저버블을 자동으로 구독하고 데이터를 추출해서 파이프 로직을 실행합니다.
원래는 컴포넌트 코드에서 옵저버블을 구독해야 하고, 옵저버블로 전달되는 데이터를 추출해야 하며, 이 데이터를 템플릿에 바인딩해야 하고 옵저버블이 종료되었을 때 메모리 누수를 방지하기 위해 옵저버블 구독을 해지해야 합니다.
`AsyncPipe`는 사용하면 이 과정을 자동으로 처리하며, 옵저버블 객체를 처리할 수 있도록 순수하지 않은 파이프로 구현되었습니다.

아래 예제 코드는 옵저버블 메시지 스트림 `message$`로 데이터를 전달받기 위해 `async` 파이프를 사용하는 예제 코드입니다.

<code-example header="src/app/hero-async-message.component.ts" path="pipes/src/app/hero-async-message.component.ts"></code-example>


<a id="no-filter-pipe"></a>

<!--
## Caching HTTP requests
-->
## HTTP 요청 캐싱하기

<!--
To [communicate with backend services using HTTP](guide/understanding-communicating-with-http "Communicating with backend services using HTTP"), the `HttpClient` service uses observables and offers the `HttpClient.get()` method to fetch data from a server.
The asynchronous method sends an HTTP request, and returns an observable that emits the requested data for the response.

As shown in the previous section, use the impure `AsyncPipe` to accept an observable as input and subscribe to the input automatically.
You can also create an impure pipe to make and cache an HTTP request.

Impure pipes are called whenever change detection runs for a component, which could be as often as every few milliseconds.
To avoid performance problems, call the server only when the requested URL changes, as shown in the following example, and use the pipe to cache the server response.
The tabs show the following:

*   The `fetch` pipe \(`fetch-json.pipe.ts`\).
*   A harness component \(`hero-list.component.ts`\) for demonstrating the request, using a template that defines two bindings to the pipe requesting the heroes from the `heroes.json` file.
    The second binding chains the `fetch` pipe with the built-in `JsonPipe` to display the same hero data in JSON format.

<code-tabs>
    <code-pane header="src/app/fetch-json.pipe.ts" path="pipes/src/app/fetch-json.pipe.ts"></code-pane>
    <code-pane header="src/app/hero-list.component.ts" path="pipes/src/app/hero-list.component.ts"></code-pane>
</code-tabs>

In the preceding example, a breakpoint on the pipe's request for data shows the following:

*   Each binding gets its own pipe instance.
*   Each pipe instance caches its own URL and data and calls the server only once.

The `fetch` and `fetch-json` pipes display the heroes in the browser as follows:

<code-example format="output" hideCopy language="none">

Heroes from JSON File

Windstorm
Bombasto
Magneto
Tornado

Heroes as JSON: [ { "name": "Windstorm", "canFly": true }, { "name": "Bombasto", "canFly": false }, { "name": "Magneto", "canFly": false }, { "name": "Tornado", "canFly": true } ]

</code-example>

<div class="alert is-helpful">

The built-in [JsonPipe](api/common/JsonPipe "API description for JsonPipe") provides a way to diagnose a mysteriously failing data binding or to inspect an object for future binding.

</div>
-->
[백엔드 서비스와 HTTP로 통신](guide/understanding-communicating-with-http "Communicating with backend services using HTTP")하려면 `HttpClient` 서비스가 제공하는 `HttpClient.get()`와 같은 함수로 서버에서 데이터를 받아와야 하는데 이런 함수는 옵저버블을 반환합니다.

이전 섹션에서 알아본 것처럼 `AsyncPipe`는 순수하지 않은 파이프이며, 파이프 인자로 받은 옵저버블을 자동으로 구독하며 옵저버블로 전달된 데이터를 추출하는 것도 자동으로 합니다.
이 방식을 활용하면 HTTP 요청을 보내고 캐싱하는 파이프를 만들 수 있습니다.

순수하지 않은 파이프는 컴포넌트에서 변화감지 로직이 동작할 때마다 실행되기 때문에 몇 밀리초마다 실행될 수도 있습니다.
이 때 성능이 저하되는 것을 피하려면 서버로 요청하는 URL이 변경될 때만 파이프 로직을 실행하고 서버에서 받은 응답을 캐싱하는 방법을 사용하는 것이 좋습니다.
이 내용을 확인해 봅시다:

*   `fetch-json.pipe.ts` 파일에 `fetch` 파이프를 구현합니다.
*   파이프를 사용해서 요청을 보내는 컴포넌트는 `hero-list.component.ts` 입니다.
    이 컴포넌트 템플릿은 `heroes.json` 파일에서 히어로 목록을 파이프로 불러오는 코드가 두 번 사용되었는데, 두번째 사용된 코드에는 `fetch` 파이프와 기본 파이프 `JsonPipe`를 사용해서 데이터를 JSON 형식으로 화면에 표시합니다.

<code-tabs>
    <code-pane header="src/app/fetch-json.pipe.ts" path="pipes/src/app/fetch-json.pipe.ts"></code-pane>
    <code-pane header="src/app/hero-list.component.ts" path="pipes/src/app/hero-list.component.ts"></code-pane>
</code-tabs>

이 예제를 실행했을 때 파이프는 다음과 같이 동작합니다:

*   파이프가 사용된 곳마다 개별 파이프 인스턴스가 생성됩니다.
*   개별 파이프 인스턴스는 URL과 데이터를 캐싱하기 때문에 서버로 요청을 한 번만 보냅니다.

그래서 브라우저를 보면 이렇게 동작하는 것을 확인할 수 있습니다.

<code-example format="output" hideCopy language="none">

Heroes from JSON File

Windstorm
Bombasto
Magneto
Tornado

Heroes as JSON: [ { "name": "Windstorm", "canFly": true }, { "name": "Bombasto", "canFly": false }, { "name": "Magneto", "canFly": false }, { "name": "Tornado", "canFly": true } ]

</code-example>

<div class="alert is-helpful">

[JsonPipe](api/common/JsonPipe "API description for JsonPipe")는 데이터 바인딩이 왜 실패했는지 확인하거나 바인딩할 객체를 미리 확인하는 용도로도 활용할 수 있습니다.

</div>


<!--
## Pipes and precedence
-->
## 파이프와 우선순위

<!--
Sometimes you want to choose between two values, based on some condition, before passing the choice to the pipe. You could use the JavaScript ternary operator (`?:`) in the template to make that choice.

Beware! The pipe operator has a higher precedence than the JavaScript ternary operator (`?:`).

If you simply write the expression as if it were evaluated left-to-right, you might be surprised by the result. For example, 
```
condition ? a : b | pipe 
```
is parsed as 
```
condition ? a : (b | pipe)
``` 
The value of `b` passes through `pipe`; the value of `a` *will not*.

If you want the pipe to apply to the result of the ternary expression, wrap the entire expression in parentheses. For example, 
```
(condition ? a : b) | pipe
```
In general, you should always use parentheses to be sure Angular evaluates the expression as you intend.

The "Pipes and Precedence" section of the <live-example noDownload>pipes example</live-example> explores this issue in more detail.
-->
때로는 파이프에 전달할 값을 둘 중에 선택해야 하는 경우가 있습니다.
이런 경우에는 보통 JavaScript 삼항 연산자(`?:`)를 사용합니다.

하지만 조심하세요!
파이프 연산자는 JavaScript 삼항 연산자보다 우선순위가 높습니다.

그래서 왼쪽부터 오른쪽으로 평가되겠구나 생각하고 표현식을 작성하면 예상치 못할 결과를 확인할 수 있습니다.
예를 들면,

```
조건 ? a : b | pipe 
```

는 이렇게 파싱됩니다.

```
조건 ? a : (b | pipe)
``` 

결국 `b` 값이 `pipe`로 전달되며, `a`가 파이프로 전달되는 경우는 *없습니다.*

삼항 연산자를 활용해서 값을 결정하고 그 값을 파이프로 전달하려면 이렇게 작성해야 합니다.

```
(조건 ? a : b) | pipe
```

표현식을 의도한대로 실행하려면 항상 괄호(`(`, `)`)를 사용하는 것이 좋습니다.

이 내용을 더 자세하게 확인하려면 <live-example noDownload>파이프 예제</live-example>의 "Pipes and Precedence" 섹션을 참고하세요.


<!-- links -->

[AioGuideI18nCommonFormatDataLocale]: guide/i18n-common-format-data-locale "Format data based on locale | Angular"

<!-- end links -->

@reviewed 2023-08-14
