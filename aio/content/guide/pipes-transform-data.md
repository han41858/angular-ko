<!--
# Transforming data with parameters and chained pipes
-->
# 파이프에 인자 활용하기, 체이닝하기

<!--
Use optional parameters to fine-tune a pipe's output.
For example, use the [`CurrencyPipe`](api/common/CurrencyPipe "API reference") with a country code such as EUR as a parameter.
The template expression `{{ amount | currency:'EUR' }}` transforms the `amount` to currency in euros.
Follow the pipe name (`currency`) with a colon (`:`) and the parameter value (`'EUR'`).

If the pipe accepts multiple parameters, separate the values with colons.
For example, `{{ amount | currency:'EUR':'Euros '}}` adds the second parameter, the string literal `'Euros '`, to the output string. Use any valid template expression as a parameter, such as a string literal or a component property.

Some pipes require at least one parameter and allow more optional parameters, such as [`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe"). For example, `{{ slice:1:5 }}` creates a new array or string containing a subset of the elements starting with element `1` and ending with element `5`.
-->
파이프에 인자를 옵션으로 사용하면 파이프를 더 다양하게 활용할 수 있습니다.
[`CurrencyPipe`](api/common/CurrencyPipe "API reference")라면 EUR과 같은 국가 코드를 전달하는 것이 이런 방식입니다.
그래서 `{{ amount | currency:'EUR' }}`라는 템플릿 표현식을 사용하면 `amount`를 유로 통화 형식으로 변환할 수 있습니다.
옵션 인자(`'EUR'`)은 파이프 이름(`currency`) 뒤에 콜론(`:`)을 붙인 뒤에 사용합니다.

파이프가 인자를 여러개 받는다면 콜론으로 구분하면 됩니다.
`{{ amount | currency:'EUR':'Euros '}}`라는 표현식에는 인자가 2개 사용되었는데, 이렇게 사용하면 첫번째 인자에 따라 유로 통화 형식으로 변환한 후에 문자열 앞에 `'Euros `를 붙입니다.
이 때 인자로 문자열 타입을 사용할 수 이씅며, 컴포넌트 프로퍼티를 사용해도 됩니다.

파이프 중에는 옵션 인자가 하나 이상 필요하거나, 옵션 인자를 여러개 사용할 수 있는 것들이 있습니다.
[`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe")가 그런데, `{{ slice:1:5 }}`라고 사용하면 문자열을 `1`번째 엘리먼트부터 `5`번째 엘리먼트까지 잘라서 반환합니다.


<!--
## Example: Formatting a date
-->
## 예제: 날짜 변환하기

<!--
The tabs in the following example demonstrates toggling between two different formats (`'shortDate'` and `'fullDate'`):

*   The `app.component.html` template uses a format parameter for the [`DatePipe`](api/common/DatePipe) (named `date`) to show the date as **04/15/88**.
*   The `hero-birthday2.component.ts` component binds the pipe's format parameter to the component's `format` property in the `template` section, and adds a button for a click event bound to the component's `toggleFormat()` method.
*   The `hero-birthday2.component.ts` component's `toggleFormat()` method toggles the component's `format` property between a short form
(`'shortDate'`) and a longer form (`'fullDate'`).

<code-tabs>
    <code-pane header="src/app/app.component.html" region="format-birthday" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero-birthday2.component.ts (template)" region="template" path="pipes/src/app/hero-birthday2.component.ts"></code-pane>
    <code-pane header="src/app/hero-birthday2.component.ts (class)" region="class" path="pipes/src/app/hero-birthday2.component.ts"></code-pane>
</code-tabs>

Clicking the **Toggle Format** button alternates the date format between **04/15/1988** and **Friday, April 15, 1988**.

<div class="alert is-helpful">

For `date` pipe format options, see [DatePipe](api/common/DatePipe "DatePipe API Reference page").

</div>
-->
아래 예제 코드는 날짜를 `'shortDate'` 형식과 `'fullDate'` 형식으로 변환하는 코드입니다.

*   `app.component.html` 템플릿에서는 [`DatePipe`](api/common/DatePipe)를 사용하기 위해 `date`라는 파이프 이름을 사용했습니다. 날짜는 **04/15/88** 라는 형식이 됩니다.
*   `hero-birthday2.component.ts` 컴포넌트에서는 컴포넌트의 `format` 프로퍼티를 사용해서 파이프에 전달할 인자를 결정합니다. 인자는 컴포넌트의 `toggleFormat()` 메서드에서 토글합니다.
*   `hero-birthday2.component.ts` 컴포넌트의 `toggleFormat()` 메서드는 컴포넌트의 `format` 프로퍼티를 `'shortDate'`나 `'fullDate'`로 토글합니다.

<code-tabs>
    <code-pane header="src/app/app.component.html" region="format-birthday" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero-birthday2.component.ts (템플릿)" region="template" path="pipes/src/app/hero-birthday2.component.ts"></code-pane>
    <code-pane header="src/app/hero-birthday2.component.ts (클래스)" region="class" path="pipes/src/app/hero-birthday2.component.ts"></code-pane>
</code-tabs>

이제 **Toggle Format** 버튼을 클릭하면 날짜가 **04/15/1988** 이나 **Friday, April 15, 1988** 형식으로 토글됩니다.

<div class="alert is-helpful">

`date` 파이프에 사용할 수 있는 형식을 알아보려면 [DatePipe](api/common/DatePipe "DatePipe API Reference page") 문서를 참고하세요.

</div>


<!--
## Example: Applying two formats by chaining pipes
-->
## 예제: 파이프 체이닝하기

<!--
Chain pipes so that the output of one pipe becomes the input to the next.

In the following example, chained pipes first apply a format to a date value, then convert the formatted date to uppercase characters.
The first tab for the `src/app/app.component.html` template chains `DatePipe` and `UpperCasePipe` to display the birthday as **APR 15, 1988**.
The second tab for the `src/app/app.component.html` template passes the `fullDate` parameter to `date` before chaining to `uppercase`, which produces **FRIDAY, APRIL 15, 1988**.

<code-tabs>
    <code-pane header="src/app/app.component.html (1)" region="chained-birthday" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/app.component.html (2)" region="chained-parameter-birthday" path="pipes/src/app/app.component.html"></code-pane>
</code-tabs>
-->
파이프는 체이닝하는 방식으로도 사용할 수 있습니다.

아래 예제는 날짜를 파이프에 전달해서 형식을 변환한 후에, 문자를 대문자로 변환하는 예제 코드입니다.
첫번째 탭은 `src/app/app.component.html` 템플릿인데, 이 파일에서는 `DatePipe`를 사용한 후에 `UpperCasePipe`를 사용했기 때문에 화면에는 **APR 15, 1988**가 표시됩니다.
그리고 두번째 탭에서는 날짜를 `fullDate` 형식으로 변환한 후에 `uppercase` 파이프를 사용했기 때문에 화면에는 **FRIDAY, APRIL 15, 1988**가 표시됩니다.

<code-tabs>
    <code-pane header="src/app/app.component.html (1)" region="chained-birthday" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/app.component.html (2)" region="chained-parameter-birthday" path="pipes/src/app/app.component.html"></code-pane>
</code-tabs>


@reviewed 2022-4-01
