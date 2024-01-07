<!--
# Transforming data with parameters and chained pipes
-->
# 파이프에 인자 활용하기, 체이닝하기

<!--
Some pipes have _optional_ parameters to fine-tune the pipe's output.

For example, the [`CurrencyPipe`](api/common/CurrencyPipe 'API reference') accepts a country code as a parameter.
To specify the parameter, follow the pipe name (`currency`) with a colon (`:`) and the parameter value (a country code).

The template expression `{{ amount | currency:'EUR' }}` displays the amount, prefixed with the Euros symbol (€).

Some pipes accept multiple _optional_ parameters. Pass each parameter to the pipe, separated by colons.

For example, `{{ amount | currency:'EUR':'Euros '}}` displays the amount with the label "Euros" (the second parameter) instead of the Euros symbol.

Some pipes, such as [`SlicePipe`](/api/common/SlicePipe 'API reference for SlicePipe'), _require_ at least one parameter and may allow more _optional_ parameters.

The expression `{{ anArray | slice:1:5 }}` displays a new string containing a subset of the elements starting with element `1` and ending with element `5`.
-->
파이프 중에는 변환값을 조정하는 인자를 _추가로_ 받는 파이프도 있습니다.

[`CurrencyPipe`](api/common/CurrencyPipe 'API reference')를 예를 들면, 이 파이프는 국가 코드를 인자로 받습니다.
추가 인자는 파이프 이름(`currency`) 뒤에 콜론(`:`)를 붙이고 전달하면 됩니다.

템플릿 표현식에  `{{ amount | currency:'EUR' }}` 라고 사용하면 `amount`에 있는 숫자가 유로 단위로 변환된 후에 유로 기호(€)를 붙여 표시됩니다.

파이프 중에는 _추가_ 인자를 여러개 받는 파이프도 있습니다.
개별 인자는 콜론으로 구분합니다.

그래서 `{{ amount | currency:'EUR':'Euros '}}` 라고 사용하면 숫자를 유로 단위로 변환한 후에 유로 기호 대신 "Euros"가 붙습니다.

그리고 [`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe")와 같이, 최대 개수는 제한이 없지만 최소한 인자 하나를 _필수로_ 요구하는 파이프도 있습니다.

`{{ anArray | slice:1:5 }}`라고 사용하면 배열이나 문자열에서 `1`번째 엘리먼트부터 `5`번째 엘리먼트까지를 반환합니다.


<!--
## Example: Formatting a date
-->
## 예제: 날짜 변환하기

<!--
The following example demonstrates two ways to format a hero's birthdate with the [`DatePipe`](api/common/DatePipe 'API reference').

<code-tabs>
    <code-pane header="birthday-formatting.component.html (template)" path="pipes/src/app/birthday-formatting.component.html"></code-pane>
    <code-pane header="birthday-formatting.component.ts (class)" path="pipes/src/app/birthday-formatting.component.ts"></code-pane>
</code-tabs>

In the template, the first expression passes the birthdate to the `DatePipe` _with a literal_ date format parameter, "shortDate". The output is **04/15/88**.

The second expression passes the birthdate to the `DatePipe` with a date format parameter _bound to a component property_ (`format`).

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

The following example passes the birthdate to the `DatePipe` and then forwards the result to the [`UpperCasePipe`](api/common/UpperCasePipe 'API reference') pipe, using "pipe chaining syntax".

Once again, it demonstrates the `DatePipe` both _with_ and _without_ a format parameter. Note that both results (**APR 15, 1988** and **FRIDAY, APRIL 15, 1988**) are in uppercase.

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


@reviewed 2023-08-14
