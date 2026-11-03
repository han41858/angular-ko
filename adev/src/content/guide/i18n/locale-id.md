<!--
# Refer to locales by ID
-->

<a id="refer-to-locales-by-id"></a>

# ID로 지역 참조하기

<!--
Angular uses the Unicode _locale identifier_ \(Unicode locale ID\) to find the correct locale data for internationalization of text strings.

<docs-callout title="Unicode locale ID">

- A locale ID conforms to the [Unicode Common Locale Data Repository (CLDR) core specification][UnicodeCldrDevelopmentCoreSpecification].
  For more information about locale IDs, see [Unicode Language and Locale Identifiers][UnicodeCldrDevelopmentCoreSpecificationLocaleID].

- CLDR and Angular use [BCP 47 tags][RfcEditorInfoBcp47] as the base for the locale ID

</docs-callout>

A locale ID specifies the language, country, and an optional code for further variants or subdivisions.
A locale ID consists of the language identifier, a hyphen \(`-`\) character, and the locale extension.

```html
{language_id}-{locale_extension}
```

HELPFUL: To accurately translate your Angular project, you must decide which languages and locales you are targeting for internationalization.

Many countries share the same language, but differ in usage.
The differences include grammar, punctuation, formats for currency, decimal numbers, dates, and so on.

For the examples in this guide, use the following languages and locales.

| Language | Locale                   | Unicode locale ID |
| :------- | :----------------------- | :---------------- |
| English  | Canada                   | `en-CA`           |
| English  | United States of America | `en-US`           |
| French   | Canada                   | `fr-CA`           |
| French   | France                   | `fr-FR`           |

The [Angular repository][GithubAngularAngularTreeMasterPackagesCommonLocales] includes common locales.

<docs-callout>
For a list of language codes, see [ISO 639-2](https://www.loc.gov/standards/iso639-2).
</docs-callout>
-->

Angular는 유니코드 _지역 식별자_(유니코드 지역 ID)를 사용해 텍스트 문자열의 국제화에 필요한 지역 데이터를 찾습니다.

<docs-callout title="유니코드 지역 ID">

- 지역 ID는 [유니코드 공통 지역 데이터 저장소(CLDR) 핵심 명세][UnicodeCldrDevelopmentCoreSpecification]를 따릅니다.
  지역 ID에 대한 자세한 내용은 [유니코드 언어 및 지역 식별자][UnicodeCldrDevelopmentCoreSpecificationLocaleID]를 참고하세요.

- CLDR과 Angular는 [BCP 47 태그][RfcEditorInfoBcp47]를 지역 ID의 기준으로 사용합니다.

</docs-callout>

지역 ID는 언어와 국가를 지정하며, 추가 변형이나 세부 구분을 위한 코드를 선택적으로 포함합니다.
지역 ID는 언어 식별자, 하이픈(`-`), 지역 확장자로 구성됩니다.

```html
{language_id}-{locale_extension}
```

도움말: Angular 프로젝트를 정확하게 번역하려면 국제화 대상으로 삼을 언어와 지역을 정해야 합니다.

여러 국가에서 같은 언어를 사용하더라도 사용 방식은 다를 수 있습니다.
문법, 구두점, 통화·소수·날짜의 형식 등이 다릅니다.

이 가이드의 예제에서는 다음 언어와 지역을 사용합니다.

| 언어     | 지역   | 유니코드 지역 ID |
| :------- | :----- | :--------------- |
| 영어     | 캐나다 | `en-CA`          |
| 영어     | 미국   | `en-US`          |
| 프랑스어 | 캐나다 | `fr-CA`          |
| 프랑스어 | 프랑스 | `fr-FR`          |

[Angular 저장소][GithubAngularAngularTreeMasterPackagesCommonLocales]에는 일반적으로 사용하는 지역이 포함되어 있습니다.

<docs-callout>
언어 코드 목록은 [ISO 639-2](https://www.loc.gov/standards/iso639-2)를 참고하세요.
</docs-callout>

<!--
## Set the source locale ID
-->

<a id="set-the-source-locale-id"></a>

## 원본 지역 ID 설정하기

<!--
Use the Angular CLI to set the source language in which you are writing the component template and code.

By default, Angular uses `en-US` as the source locale of your project.

To change the source locale of your project for the build, complete the following actions.

1. Open the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file.
2. Add or modify the `sourceLocale` field inside the `i18n` section:

```json
{
  "projects": {
    "your-project": {
      "i18n": {
        "sourceLocale": "ca" // Use your desired locale code
      }
    }
  }
}
```
-->

Angular CLI로 컴포넌트 템플릿과 코드를 작성하는 원본 언어를 설정하세요.

Angular는 기본적으로 프로젝트의 원본 지역으로 `en-US`를 사용합니다.

빌드에 사용할 프로젝트의 원본 지역을 변경하려면 다음 단계를 진행하세요.

1. [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일을 엽니다.
2. `i18n` 섹션 안의 `sourceLocale` 필드를 추가하거나 수정합니다.

```json
{
  "projects": {
    "your-project": {
      "i18n": {
        "sourceLocale": "ca" // 사용할 지역 코드를 지정합니다.
      }
    }
  }
}
```

<!--
## Read the active locale outside dependency injection
-->

<a id="read-the-active-locale-outside-dependency-injection"></a>

## 의존성 주입 밖에서 현재 지역 읽기

<!--
Inside a component or service, inject the `LOCALE_ID` token to get the active locale.

If you can't inject `LOCALE_ID`, for example in a plain function outside an injection context, read `$localize.locale`.
Each localized build sets this value, and it is what the default `LOCALE_ID` factory reads.
If your application provides its own `LOCALE_ID`, `$localize.locale` does not reflect it.

```ts
declare const $localize: {locale?: string};

export const locale = (typeof $localize !== 'undefined' && $localize.locale) || 'en-US';
```

Put this in a file that has an `import` or `export`. If your project already includes the `@angular/localize` types, omit the `declare` line.
-->

컴포넌트나 서비스 안에서는 `LOCALE_ID` 토큰을 주입해서 현재 지역을 가져오세요.

주입 컨텍스트 밖의 일반 함수처럼 `LOCALE_ID`를 주입할 수 없는 경우에는 `$localize.locale`을 읽으세요.
지역별 빌드마다 이 값이 설정되며, 기본 `LOCALE_ID` 팩토리도 이 값을 읽습니다.
애플리케이션에서 자체 `LOCALE_ID`를 제공하더라도 `$localize.locale`에는 반영되지 않습니다.

```ts
declare const $localize: {locale?: string};

export const locale = (typeof $localize !== 'undefined' && $localize.locale) || 'en-US';
```

이 코드는 `import`나 `export`가 있는 파일에 작성하세요.
프로젝트에 이미 `@angular/localize` 타입이 포함되어 있다면 `declare` 줄은 생략하세요.

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/format-data-locale" title="Format data based on locale"/>
</docs-pill-row>

[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular workspace configuration | Angular'
[GithubAngularAngularTreeMasterPackagesCommonLocales]: https://github.com/angular/angular/tree/main/packages/common/locales 'angular/packages/common/locales | angular/angular | GitHub'
[RfcEditorInfoBcp47]: https://www.rfc-editor.org/info/bcp47 'BCP 47 | RFC Editor'
[UnicodeCldrDevelopmentCoreSpecification]: https://cldr.unicode.org/index/cldr-spec 'Core Specification | Unicode CLDR Project'
[UnicodeCldrDevelopmentCoreSpecificationLocaleID]: https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code 'Unicode Language and Locale Identifiers - Core Specification | Unicode CLDR Project'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/format-data-locale" title="지역에 맞게 데이터 형식 지정하기"/>
</docs-pill-row>

[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular 작업 공간 설정 | Angular'
[GithubAngularAngularTreeMasterPackagesCommonLocales]: https://github.com/angular/angular/tree/main/packages/common/locales 'angular/packages/common/locales | angular/angular | GitHub'
[RfcEditorInfoBcp47]: https://www.rfc-editor.org/info/bcp47 'BCP 47 | RFC Editor'
[UnicodeCldrDevelopmentCoreSpecification]: https://cldr.unicode.org/index/cldr-spec '핵심 명세 | Unicode CLDR Project'
[UnicodeCldrDevelopmentCoreSpecificationLocaleID]: https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code '유니코드 언어 및 지역 식별자 - 핵심 명세 | Unicode CLDR Project'
