<!--
<docs-decorative-header title="Angular Internationalization (i18n)" imgSrc="adev/src/assets/images/i18n.svg"> <!- markdownlint-disable-line ->
</docs-decorative-header>
-->

<a id="angular-internationalization-i18n"></a>

<docs-decorative-header title="Angular 국제화(i18n)" imgSrc="adev/src/assets/images/i18n.svg">
</docs-decorative-header>

<!--
_Internationalization_, sometimes referenced as i18n, is the process of designing and preparing your project for use in different locales around the world.
_Localization_ is the process of building versions of your project for different locales.
The localization process includes the following actions.

- Extract text for translation into different languages
- Format data for a specific locale

A _locale_ identifies a region in which people speak a particular language or language variant.
Possible regions include countries and geographical regions.
A locale determines the formatting and parsing of the following details.

- Measurement units including date and time, numbers, and currencies
- Translated names including time zones, languages, and countries

For a quick introduction to localization and internationalization watch this video:

<docs-video src="https://www.youtube.com/embed/KNTN-nsbV7M"/>
-->

_국제화(Internationalization)_ 는 i18n이라고도 하며, 프로젝트를 전 세계 여러 지역에서 사용할 수 있도록 설계하고 준비하는 과정입니다.
_현지화(Localization)_ 는 여러 지역에 맞는 프로젝트 버전을 만드는 과정입니다.
현지화 과정에는 다음 작업이 포함됩니다.

- 여러 언어로 번역할 텍스트 추출
- 특정 지역에 맞게 데이터 형식 지정

_지역(locale)_ 은 특정 언어나 언어의 변형을 사용하는 지역을 나타냅니다.
이 지역에는 국가나 지리적 지역이 포함될 수 있습니다.
지역은 다음 항목의 형식을 지정하고 파싱하는 방식을 결정합니다.

- 날짜와 시간, 숫자, 통화 등의 측정 단위
- 시간대, 언어, 국가 등의 번역된 이름

현지화와 국제화를 간단히 알아보려면 다음 동영상을 참고하세요.

<docs-video src="https://www.youtube.com/embed/KNTN-nsbV7M"/>

<!--
## Learn about Angular internationalization
-->

<a id="learn-about-angular-internationalization"></a>

## Angular 국제화 알아보기

<!--
<docs-card-container>
  <docs-card title="Add the localize package" href="guide/i18n/add-package">
    Learn how to add the Angular Localize package to your project
  </docs-card>
  <docs-card title="Refer to locales by ID" href="guide/i18n/locale-id">
    Learn how to identify and specify a locale identifier for your project
  </docs-card>
  <docs-card title="Format data based on locale" href="guide/i18n/format-data-locale">
    Learn how to implement localized data pipes and override the locale for your project
  </docs-card>
  <docs-card title="Prepare component for translation" href="guide/i18n/prepare">
    Learn how to specify source text for translation
  </docs-card>
  <docs-card title="Work with translation files" href="guide/i18n/translation-files">
    Learn how to review and process translation text
  </docs-card>
  <docs-card title="Merge translations into the application" href="guide/i18n/merge">
    Learn how to merge translations and build your translated application
  </docs-card>
  <docs-card title="Deploy multiple locales" href="guide/i18n/deploy">
    Learn how to deploy multiple locales for your application
  </docs-card>
  <docs-card title="Import global variants of the locale data" href="guide/i18n/import-global-variants">
    Learn how to import locale data for language variants
  </docs-card>
  <docs-card title="Manage marked text with custom IDs" href="guide/i18n/manage-marked-text">
    Learn how to implement custom IDs to help you manage your marked text
  </docs-card>
  <docs-card title="Internationalization example" href="guide/i18n/example">
    Review an example of Angular internationalization.
  </docs-card>
</docs-card-container>
-->

<docs-card-container>
  <docs-card title="localize 패키지 추가하기" href="guide/i18n/add-package">
    프로젝트에 Angular Localize 패키지를 추가하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="ID로 지역 참조하기" href="guide/i18n/locale-id">
    프로젝트의 지역 식별자를 확인하고 지정하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="지역에 맞게 데이터 형식 지정하기" href="guide/i18n/format-data-locale">
    현지화된 데이터 파이프를 구현하고 프로젝트의 지역을 재정의하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="컴포넌트 번역 준비하기" href="guide/i18n/prepare">
    번역할 원문을 지정하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="번역 파일 다루기" href="guide/i18n/translation-files">
    번역할 텍스트를 검토하고 처리하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="애플리케이션에 번역 병합하기" href="guide/i18n/merge">
    번역을 병합하고 번역된 애플리케이션을 빌드하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="여러 지역 배포하기" href="guide/i18n/deploy">
    애플리케이션의 여러 지역을 배포하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="지역 데이터의 전역 버전 불러오기" href="guide/i18n/import-global-variants">
    언어 변형에 맞는 지역 데이터를 불러오는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="커스텀 ID로 표시된 텍스트 관리하기" href="guide/i18n/manage-marked-text">
    표시된 텍스트를 관리하는 데 도움이 되는 커스텀 ID를 구현하는 방법을 알아봅니다.
  </docs-card>
  <docs-card title="국제화 예제" href="guide/i18n/example">
    Angular 국제화 예제를 살펴봅니다.
  </docs-card>
</docs-card-container>
