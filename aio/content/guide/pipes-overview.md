<!--
# Understanding Pipes
-->
# 파이프 이해하기

<!--
Use [pipes](guide/glossary#pipe "Definition of a pipe") to transform strings, currency amounts, dates, and other data for display.
-->
[파이프](guide/glossary#pipe "Definition of a pipe")를 사용하면 문자열, 통화금액, 날짜 등의 데이터를 원하는 형태로 표시할 수 있습니다.


<!--
## What is a pipe
-->
## 파이프란?

<!--
Pipes are simple functions to use in [template expressions](/guide/glossary#template-expression "Definition of template expression") to accept an input value and return a transformed value. Pipes are useful because you can use them throughout your application, while only declaring each pipe once.
For example, you would use a pipe to show a date as **April 15, 1988** rather than the raw string format.

<div class="alert is-helpful">

For the sample application used in this topic, see the <live-example name="pipes"></live-example>.

</div>
-->
파이프는 [템플릿 표현식](/guide/glossary#template-expression "Definition of template expression")에 사용하는 간단한 함수인데, 입력값을 받아서 이 값을 변환해서 반환합니다.
파이프는 한 번만 선언해두면 애플리케이션 전역에 자유롭게 사용할 수 있기 때문에 활용하기 좋습니다.
그래서 날짜를 문자열 그대로 표현하는 대신 **April 15, 1988**와 같은 형식으로 변환할 때 자주 사용합니다.

<div class="alert is-helpful">

예제 앱을 확인하려면 <live-example></live-example>를 참고하세요.

</div>


<!--
## Built-in pipes
-->
## 기본 파이프

<!--
Angular provides built-in pipes for typical data transformations, including transformations for internationalization (i18n), which use locale information to format data.
The following are commonly used built-in pipes for data formatting:

*   [`DatePipe`](api/common/DatePipe): Formats a date value according to locale rules.
*   [`UpperCasePipe`](api/common/UpperCasePipe): Transforms text to all upper case.
*   [`LowerCasePipe`](api/common/LowerCasePipe): Transforms text to all lower case.
*   [`CurrencyPipe`](api/common/CurrencyPipe): Transforms a number to a currency string, formatted according to locale rules.
*   [`DecimalPipe`](/api/common/DecimalPipe): Transforms a number into a string with a decimal point, formatted according to locale rules.
*   [`PercentPipe`](api/common/PercentPipe): Transforms a number to a percentage string, formatted according to locale rules.

<div class="alert is-helpful">

*   For a complete list of built-in pipes, see the [pipes API documentation](/api/common#pipes "Pipes API reference summary").
*   To learn more about using pipes for internationalization (i18n) efforts, see [formatting data based on locale][AioGuideI18nCommonFormatDataLocale].

</div>

Create pipes to encapsulate custom transformations and use your custom pipes in template expressions.
-->
Angular는 국제화(internationalization, i18n)를 적용할 때 날짜 형식을 변경하는 등 데이터 변환작업에 활용할 수 있는 기본 파이프를 제공하는 것이 있습니다.
기본 파이프는 이런것 들이 있습니다:

*   [`DatePipe`](api/common/DatePipe): 날짜를 원하는 형식으로 변환합니다.
*   [`UpperCasePipe`](api/common/UpperCasePipe): 문자열을 대문자로 변경합니다.
*   [`LowerCasePipe`](api/common/LowerCasePipe): 문자열을 소문자로 변경합니다.
*   [`CurrencyPipe`](api/common/CurrencyPipe): 숫자를 지역에 맞는 통화단위로 변경합니다.
*   [`DecimalPipe`](/api/common/DecimalPipe): 숫자를 지역에 맞는 숫자 표현으로 변경합니다.
*   [`PercentPipe`](api/common/PercentPipe): 숫자를 지열에 맞는 퍼센트 문자열로 변경합니다.

<div class="alert is-helpful">

*   기본 파이프의 전체 목록을 확인하려면 [파이프 API 문서](/api/common#pipes "Pipes API reference summary")를 참고하세요.
*   파이프를 국제화(internationalization, i18n) 용도로 사용하는 방법에 대해 알아보려면 [지역에 맞게 날짜 표현하기][AioGuideI18nCommonFormatDataLocale] 문서를 참고하세요.

</div>

데이터를 필요한대로 변환하려면 커스텀 파이프를 만들어서 활용할 수도 있습니다.


<!--
## Pipes and precedence
-->
## 파이프와 우선순위

<!--
The pipe operator has a higher precedence than the ternary operator (`?:`), which means `a ? b : c | x` is parsed as `a ? b : (c | x)`.
The pipe operator cannot be used without parentheses in the first and second operands of `?:`.

Due to precedence, if you want a pipe to apply to the result of a ternary, wrap the entire expression in parentheses; for example, `(a ? b : c) | x`.

<code-example path="pipes/src/app/precedence.component.html" region="precedence" header="src/app/precedence.component.html"></code-example>
-->
파이프 연산자는 삼항연산자(`?:`)보다 우선순위가 높기 때문에, `a ? b : c | x`는 `a ? b : (c | x)`라는 의미와 같습니다.
그래서 삼항연산자의 첫번째 항목이나 두번째 항목에 파이프를 적용하려면 소괄호를 사용해야 합니다.

이런 우선순위 정책때문에 삼항연산자 전체 결과에 파이프를 적용하려면 `(a ? b : c) | x`와 같이 사용해야 합니다.

<code-example path="pipes/src/app/precedence.component.html" region="precedence" header="src/app/precedence.component.html"></code-example>


<!-- links -->

[AioGuideI18nCommonFormatDataLocale]: guide/i18n-common-format-data-locale "Format data based on locale | Angular"

<!-- end links -->

@reviewed 2022-04-01
