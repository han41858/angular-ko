<!--
# Format data based on locale
-->

<a id="format-data-based-on-locale"></a>

# 지역에 맞게 데이터 형식 지정하기

<!--
Angular provides the following built-in data transformation [pipes](guide/templates/pipes).
The data transformation pipes use the [`LOCALE_ID`][ApiCoreLocaleId] token to format data based on rules of each locale.

| Data transformation pipe                | Details                                           |
| :-------------------------------------- | :------------------------------------------------ |
| [`DatePipe`][ApiCommonDatepipe]         | Formats a date value.                             |
| [`CurrencyPipe`][ApiCommonCurrencypipe] | Transforms a number into a currency string.       |
| [`DecimalPipe`][ApiCommonDecimalpipe]   | Transforms a number into a decimal number string. |
| [`PercentPipe`][ApiCommonPercentpipe]   | Transforms a number into a percentage string.     |
-->

Angular는 데이터를 변환하는 다음 내장 [파이프](guide/templates/pipes)를 제공합니다.
데이터 변환 파이프는 [`LOCALE_ID`][ApiCoreLocaleId] 토큰을 사용해 각 지역의 규칙에 맞게 데이터 형식을 지정합니다.

| 데이터 변환 파이프                      | 설명                               |
| :-------------------------------------- | :--------------------------------- |
| [`DatePipe`][ApiCommonDatepipe]         | 날짜 값의 형식을 지정합니다.       |
| [`CurrencyPipe`][ApiCommonCurrencypipe] | 숫자를 통화 문자열로 변환합니다.   |
| [`DecimalPipe`][ApiCommonDecimalpipe]   | 숫자를 십진수 문자열로 변환합니다. |
| [`PercentPipe`][ApiCommonPercentpipe]   | 숫자를 백분율 문자열로 변환합니다. |

<!--
## Use DatePipe to display the current date
-->

<a id="use-datepipe-to-display-the-current-date"></a>

## DatePipe로 현재 날짜 표시하기

<!--
To display the current date in the format for the current locale, use the following format for the `DatePipe`.

```angular-html
{{ today | date }}
```
-->

현재 지역의 형식으로 현재 날짜를 표시하려면 `DatePipe`를 다음과 같이 사용하세요.

```angular-html
{{ today | date }}
```

<!--
## Override current locale for CurrencyPipe
-->

<a id="override-current-locale-for-currencypipe"></a>

## CurrencyPipe의 현재 지역 재정의하기

<!--
Add the `locale` parameter to the pipe to override the current value of `LOCALE_ID` token.

To force the currency to use American English \(`en-US`\), use the following format for the `CurrencyPipe`

```angular-html
{{ amount | currency: 'en-US' }}
```

HELPFUL: The locale specified for the `CurrencyPipe` overrides the global `LOCALE_ID` token of your application.
-->

파이프에 `locale` 인자를 추가하면 현재 `LOCALE_ID` 토큰 값을 재정의할 수 있습니다.

통화에 미국 영어(`en-US`)를 사용하도록 지정하려면 `CurrencyPipe`를 다음과 같이 사용하세요.

```angular-html
{{ amount | currency: 'en-US' }}
```

도움말: `CurrencyPipe`에 지정한 지역은 애플리케이션의 전역 `LOCALE_ID` 토큰보다 우선합니다.

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/prepare" title="Prepare component for translation"/>
</docs-pill-row>

[ApiCommonCurrencypipe]: api/common/CurrencyPipe 'CurrencyPipe | Common - API | Angular'
[ApiCommonDatepipe]: api/common/DatePipe 'DatePipe | Common - API | Angular'
[ApiCommonDecimalpipe]: api/common/DecimalPipe 'DecimalPipe | Common - API | Angular'
[ApiCommonPercentpipe]: api/common/PercentPipe 'PercentPipe | Common - API | Angular'
[ApiCoreLocaleId]: api/core/LOCALE_ID 'LOCALE_ID | Core - API | Angular'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/prepare" title="컴포넌트 번역 준비하기"/>
</docs-pill-row>

[ApiCommonCurrencypipe]: api/common/CurrencyPipe 'CurrencyPipe | Common - API | Angular'
[ApiCommonDatepipe]: api/common/DatePipe 'DatePipe | Common - API | Angular'
[ApiCommonDecimalpipe]: api/common/DecimalPipe 'DecimalPipe | Common - API | Angular'
[ApiCommonPercentpipe]: api/common/PercentPipe 'PercentPipe | Common - API | Angular'
[ApiCoreLocaleId]: api/core/LOCALE_ID 'LOCALE_ID | Core - API | Angular'
