<!--
# Work with translation files
-->

<a id="work-with-translation-files"></a>

# 번역 파일 다루기

<!--
After you prepare a component for translation, use the [`extract-i18n`][CliExtractI18n] [Angular CLI][CliMain] command to extract the marked text in the component into a _source language_ file.

The marked text includes text marked with `i18n`, attributes marked with `i18n-`_attribute_, and text tagged with `$localize` as described in [Prepare component for translation][GuideI18nCommonPrepare].

Complete the following steps to create and update translation files for your project.

1. [Extract the source language file][GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile].
   1. Optionally, change the location, format, and name.
1. Copy the source language file to [create a translation file for each language][GuideI18nCommonTranslationFilesCreateATranslationFileForEachLanguage].
1. [Translate each translation file][GuideI18nCommonTranslationFilesTranslateEachTranslationFile].
1. Translate plurals and alternate expressions separately.
   1. [Translate plurals][GuideI18nCommonTranslationFilesTranslatePlurals].
   1. [Translate alternate expressions][GuideI18nCommonTranslationFilesTranslateAlternateExpressions].
   1. [Translate nested expressions][GuideI18nCommonTranslationFilesTranslateNestedExpressions].
-->

컴포넌트 번역 준비가 끝나면 [Angular CLI][CliMain]의 [`extract-i18n`][CliExtractI18n] 명령으로 컴포넌트에서 표시한 텍스트를 _원본 언어_ 파일로 추출하세요.

표시된 텍스트에는 [컴포넌트 번역 준비하기][GuideI18nCommonPrepare]에서 설명한 것처럼 `i18n`으로 표시한 텍스트, `i18n-`_어트리뷰트_ 로 표시한 어트리뷰트, `$localize` 태그가 붙은 텍스트가 포함됩니다.

프로젝트의 번역 파일을 생성하고 갱신하려면 다음 단계를 진행하세요.

1. [원본 언어 파일을 추출합니다][GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile].
   1. 필요하면 위치, 형식, 이름을 변경합니다.
1. 원본 언어 파일을 복사해 [언어별 번역 파일을 만듭니다][GuideI18nCommonTranslationFilesCreateATranslationFileForEachLanguage].
1. [각 번역 파일을 번역합니다][GuideI18nCommonTranslationFilesTranslateEachTranslationFile].
1. 복수형 표현식과 선택 표현식을 별도로 번역합니다.
   1. [복수형을 번역합니다][GuideI18nCommonTranslationFilesTranslatePlurals].
   1. [선택 표현식을 번역합니다][GuideI18nCommonTranslationFilesTranslateAlternateExpressions].
   1. [중첩된 표현식을 번역합니다][GuideI18nCommonTranslationFilesTranslateNestedExpressions].

<!--
## Extract the source language file
-->

<a id="extract-the-source-language-file"></a>

## 원본 언어 파일 추출하기

<!--
To extract the source language file, complete the following actions.

1. Open a terminal window.
1. Change to the root directory of your project.
1. Run the following CLI command.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-default"/>

The `extract-i18n` command creates a source language file named `messages.xlf` in the root directory of your project.
For more information about the XML Localization Interchange File Format \(XLIFF, version 1.2\), see [XLIFF][WikipediaWikiXliff].

Use the following [`extract-i18n`][CliExtractI18n] command options to change the source language file location, format, and file name.

| Command option  | Details                              |
| :-------------- | :----------------------------------- |
| `--format`      | Set the format of the output file    |
| `--out-file`    | Set the name of the output file      |
| `--output-path` | Set the path of the output directory |
-->

원본 언어 파일을 추출하려면 다음 단계를 진행하세요.

1. 터미널 창을 엽니다.
1. 프로젝트의 최상위 디렉터리로 이동합니다.
1. 다음 CLI 명령을 실행합니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-default"/>

`extract-i18n` 명령은 프로젝트의 최상위 디렉터리에 `messages.xlf`라는 원본 언어 파일을 생성합니다.
XML Localization Interchange File Format(XLIFF, 버전 1.2)에 대한 자세한 내용은 [XLIFF][WikipediaWikiXliff]를 참고하세요.

원본 언어 파일의 위치, 형식, 파일 이름을 변경하려면 [`extract-i18n`][CliExtractI18n] 명령에서 다음 옵션을 사용하세요.

| 명령 옵션       | 설명                               |
| :-------------- | :--------------------------------- |
| `--format`      | 출력 파일의 형식을 설정합니다.     |
| `--out-file`    | 출력 파일의 이름을 설정합니다.     |
| `--output-path` | 출력 디렉터리의 경로를 설정합니다. |

<!--
### Change the source language file location
-->

<a id="change-the-source-language-file-location"></a>

### 원본 언어 파일 위치 변경하기

<!--
To create a file in the `src/locale` directory, specify the output path as an option.
-->

`src/locale` 디렉터리에 파일을 생성하려면 옵션으로 출력 경로를 지정하세요.

<!--
#### `extract-i18n --output-path` example
-->

<a id="extract-i18n---output-path-example"></a>

#### `extract-i18n --output-path` 예제

<!--
The following example specifies the output path as an option.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-output-path"/>
-->

다음 예제는 옵션으로 출력 경로를 지정합니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-output-path"/>

<!--
### Change the source language file format
-->

<a id="change-the-source-language-file-format"></a>

### 원본 언어 파일 형식 변경하기

<!--
The `extract-i18n` command creates files in the following translation formats.

| Translation format | Details                                                                                                          | File extension    |
| :----------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------- |
| ARB                | [Application Resource Bundle][GithubGoogleAppResourceBundleWikiApplicationresourcebundlespecification]           | `.arb`            |
| JSON               | [JavaScript Object Notation][JsonMain]                                                                           | `.json`           |
| XLIFF 1.2          | [XML Localization Interchange File Format, version 1.2][OasisOpenDocsXliffXliffCoreXliffCoreHtml]                | `.xlf`            |
| XLIFF 2            | [XML Localization Interchange File Format, version 2][OasisOpenDocsXliffXliffCoreV20Cos01XliffCoreV20Cose01Html] | `.xlf`            |
| XMB                | [XML Message Bundle][UnicodeCldrDevelopmentDevelopmentProcessDesignProposalsXmb]                                 | `.xmb` \(`.xtb`\) |

Specify the translation format explicitly with the `--format` command option.

HELPFUL: The XMB format generates `.xmb` source language files, but uses`.xtb` translation files.
-->

`extract-i18n` 명령은 다음 번역 형식으로 파일을 생성할 수 있습니다.

| 번역 형식 | 설명                                                                                                          | 파일 확장자     |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :-------------- |
| ARB       | [Application Resource Bundle][GithubGoogleAppResourceBundleWikiApplicationresourcebundlespecification]        | `.arb`          |
| JSON      | [JavaScript Object Notation][JsonMain]                                                                        | `.json`         |
| XLIFF 1.2 | [XML Localization Interchange File Format, 버전 1.2][OasisOpenDocsXliffXliffCoreXliffCoreHtml]                | `.xlf`          |
| XLIFF 2   | [XML Localization Interchange File Format, 버전 2][OasisOpenDocsXliffXliffCoreV20Cos01XliffCoreV20Cose01Html] | `.xlf`          |
| XMB       | [XML Message Bundle][UnicodeCldrDevelopmentDevelopmentProcessDesignProposalsXmb]                              | `.xmb` (`.xtb`) |

`--format` 명령 옵션으로 번역 형식을 명시적으로 지정하세요.

도움말: XMB 형식에서는 원본 언어 파일을 `.xmb`로 생성하지만, 번역 파일은 `.xtb`를 사용합니다.

<!--
#### `extract-i18n --format` example
-->

<a id="extract-i18n---format-example"></a>

#### `extract-i18n --format` 예제

<!--
The following example demonstrates several translation formats.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-formats"/>
-->

다음 예제는 여러 번역 형식을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-formats"/>

<!--
### Change the source language file name
-->

<a id="change-the-source-language-file-name"></a>

### 원본 언어 파일 이름 변경하기

<!--
To change the name of the source language file generated by the extraction tool, use the `--out-file` command option.
-->

추출 도구가 생성하는 원본 언어 파일의 이름을 변경하려면 `--out-file` 명령 옵션을 사용하세요.

<!--
#### `extract-i18n --out-file` example
-->

<a id="extract-i18n---out-file-example"></a>

#### `extract-i18n --out-file` 예제

<!--
The following example demonstrates naming the output file.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-out-file"/>
-->

다음 예제는 출력 파일의 이름을 지정하는 방법을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="extract-i18n-out-file"/>

<!--
## Create a translation file for each language
-->

<a id="create-a-translation-file-for-each-language"></a>

## 언어별 번역 파일 만들기

<!--
To create a translation file for a locale or language, complete the following actions.

1. [Extract the source language file][GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile].
1. Make a copy of the source language file to create a _translation_ file for each language.
1. Rename the _translation_ file to add the locale.

   ```file {hideCopy}

   messages.xlf -> messages.{locale}.xlf

   ```

1. Create a new directory at your project root named `locale`.

   ```file {hideCopy}

   src/locale

   ```

1. Move the _translation_ file to the new directory.
1. Send the _translation_ file to your translator.
1. Repeat the above steps for each language you want to add to your application.
-->

지역이나 언어에 맞는 번역 파일을 만들려면 다음 단계를 진행하세요.

1. [원본 언어 파일을 추출합니다][GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile].
1. 원본 언어 파일을 복사해 언어별 _번역_ 파일을 만듭니다.
1. _번역_ 파일 이름에 지역을 추가합니다.

   ```file {hideCopy}

   messages.xlf --> messages.{locale}.xlf

   ```

1. 프로젝트 최상위 경로에 `locale`이라는 디렉터리를 만듭니다.

   ```file {hideCopy}

   src/locale

   ```

1. 새 디렉터리로 _번역_ 파일을 옮깁니다.
1. _번역_ 파일을 번역자에게 전달합니다.
1. 애플리케이션에 추가할 언어마다 위 단계를 반복합니다.

<!--
### `extract-i18n` example for French
-->

<a id="extract-i18n-example-for-french"></a>

### 프랑스어용 `extract-i18n` 예제

<!--
For example, to create a French translation file, complete the following actions.

1. Run the `extract-i18n` command.
1. Make a copy of the `messages.xlf` source language file.
1. Rename the copy to `messages.fr.xlf` for the French language \(`fr`\) translation.
1. Move the `fr` translation file to the `src/locale` directory.
1. Send the `fr` translation file to the translator.
-->

예를 들어 프랑스어 번역 파일을 만들려면 다음 단계를 진행하세요.

1. `extract-i18n` 명령을 실행합니다.
1. 원본 언어 파일인 `messages.xlf`를 복사합니다.
1. 프랑스어(`fr`) 번역에 사용할 사본의 이름을 `messages.fr.xlf`로 변경합니다.
1. `fr` 번역 파일을 `src/locale` 디렉터리로 옮깁니다.
1. `fr` 번역 파일을 번역자에게 전달합니다.

<!--
## Translate each translation file
-->

<a id="translate-each-translation-file"></a>

## 각 번역 파일 번역하기

<!--
Unless you are fluent in the language and have the time to edit translations, you will likely complete the following steps.

1. Send each translation file to a translator.
1. The translator uses an XLIFF file editor to complete the following actions.
   1. Create the translation.
   1. Edit the translation.
-->

해당 언어에 능숙하고 번역을 편집할 시간도 충분한 경우가 아니라면, 보통 다음 단계를 진행하게 됩니다.

1. 각 번역 파일을 번역자에게 전달합니다.
1. 번역자는 XLIFF 파일 편집기를 사용해 다음 작업을 수행합니다.
   1. 번역을 작성합니다.
   1. 번역을 편집합니다.

<!--
### Translation process example for French
-->

<a id="translation-process-example-for-french"></a>

### 프랑스어 번역 과정 예제

<!--
To demonstrate the process, review the `messages.fr.xlf` file in the [Example Angular Internationalization application][GuideI18nExample]. The [Example Angular Internationalization application][GuideI18nExample] includes a French translation for you to edit without a special XLIFF editor or knowledge of French.

The following actions describe the translation process for French.

1. Open `messages.fr.xlf` and find the first `<trans-unit>` element.
   This is a _translation unit_, also known as a _text node_, that represents the translation of the `<h1>` greeting tag that was previously marked with the `i18n` attribute.

   <docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-hello-before"/>

   The `id="introductionHeader"` is a [custom ID][GuideI18nOptionalManageMarkedText], but without the `@@` prefix required in the source HTML.

1. Duplicate the `<source>... </source>` element in the text node, rename it to `target`, and then replace the content with the French text.

   <docs-code header="src/locale/messages.fr.xlf (<trans-unit>, after translation)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-hello"/>

   In a more complex translation, the information and context in the [description and meaning elements][GuideI18nCommonPrepareAddHelpfulDescriptionsAndMeanings] help you choose the right words for translation.

1. Translate the other text nodes.
   The following example displays the way to translate.

   <docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-other-nodes"/>

IMPORTANT: Don't change the IDs for translation units.
Each `id` attribute is generated by Angular and depends on the content of the component text and the assigned meaning.

If you change either the text or the meaning, then the `id` attribute changes.
For more about managing text updates and IDs, see [custom IDs][GuideI18nOptionalManageMarkedText].
-->

번역 과정을 알아보려면 [Angular 국제화 예제 애플리케이션][GuideI18nExample]의 `messages.fr.xlf` 파일을 살펴보세요.
[Angular 국제화 예제 애플리케이션][GuideI18nExample]에는 프랑스어 번역이 포함되어 있어, 별도의 XLIFF 편집기가 없거나 프랑스어를 몰라도 편집해 볼 수 있습니다.

프랑스어 번역 과정은 다음과 같습니다.

1. `messages.fr.xlf`를 열고 첫 번째 `<trans-unit>` 엘리먼트를 찾습니다.
   이 엘리먼트는 _텍스트 노드_ 라고도 하는 _번역 단위_ 이며, 앞서 `i18n` 어트리뷰트로 표시한 `<h1>` 인사말 태그의 번역을 나타냅니다.

   <docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-hello-before"/>

   `id="introductionHeader"`는 [커스텀 ID][GuideI18nOptionalManageMarkedText]이지만, 원본 HTML에서 필요한 `@@` 접두사는 포함하지 않습니다.

1. 텍스트 노드의 `<source>... </source>` 엘리먼트를 복제하고 이름을 `target`으로 바꾼 다음, 내용을 프랑스어 텍스트로 교체합니다.

   <docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;, 번역 후)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-hello"/>

   더 복잡한 번역에서는 [설명과 의미 엘리먼트][GuideI18nCommonPrepareAddHelpfulDescriptionsAndMeanings]의 정보와 문맥이 적절한 번역 어휘를 고르는 데 도움이 됩니다.

1. 다른 텍스트 노드를 번역합니다.
   다음 예제는 번역하는 방법을 보여줍니다.

   <docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-other-nodes"/>

중요: 번역 단위의 ID를 변경하지 마세요.
각 `id` 어트리뷰트는 Angular가 생성하며, 컴포넌트 텍스트의 내용과 지정된 의미에 따라 결정됩니다.

텍스트나 의미 중 하나를 변경하면 `id` 어트리뷰트도 변경됩니다.
텍스트 갱신과 ID 관리에 대한 자세한 내용은 [커스텀 ID][GuideI18nOptionalManageMarkedText]를 참고하세요.

<!--
## Translate plurals
-->

<a id="translate-plurals"></a>

## 복수형 번역하기

<!--
Add or remove plural cases as needed for each language.

HELPFUL: For language plural rules, see [CLDR plural rules][GithubUnicodeOrgCldrStagingChartsLatestSupplementalLanguagePluralRulesHtml].
-->

각 언어에 맞게 필요한 복수형 경우를 추가하거나 제거하세요.

도움말: 언어별 복수형 규칙은 [CLDR 복수형 규칙][GithubUnicodeOrgCldrStagingChartsLatestSupplementalLanguagePluralRulesHtml]을 참고하세요.

<!--
### `minute` `plural` example
-->

<a id="minute-plural-example"></a>

### `minute`의 `plural` 예제

<!--
To translate a `plural`, translate the ICU format match values.

- `just now`
- `one minute ago`
- `<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago`

The following example displays the way to translate.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-plural"/>
-->

`plural`을 번역하려면 ICU 형식에서 각 경우에 대응하는 값을 번역하세요.

- `just now`
- `one minute ago`
- `<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago`

다음 예제는 번역하는 방법을 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-plural"/>

<!--
## Translate alternate expressions
-->

<a id="translate-alternate-expressions"></a>

## 선택 표현식 번역하기

<!--
Angular also extracts alternate `select` ICU expressions as separate translation units.
-->

Angular는 값을 선택하는 `select` ICU 표현식도 별도의 번역 단위로 추출합니다.

<!--
### `gender` `select` example
-->

<a id="gender-select-example"></a>

### `gender`의 `select` 예제

<!--
The following example displays a `select` ICU expression in the component template.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-select"/>

In this example, Angular extracts the expression into two translation units.
The first contains the text outside of the `select` clause, and uses a placeholder for `select` \(`<x id="ICU">`\):

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-select-1"/>

IMPORTANT: When you translate the text, move the placeholder if necessary, but don't remove it.
If you remove the placeholder, the ICU expression is removed from your translated application.

The following example displays the second translation unit that contains the `select` clause.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-select-2"/>

The following example displays both translation units after translation is complete.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-select"/>
-->

다음 예제는 컴포넌트 템플릿에 있는 `select` ICU 표현식을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-select"/>

이 예제에서 Angular는 표현식을 두 개의 번역 단위로 추출합니다.
첫 번째 번역 단위에는 `select` 절 바깥의 텍스트가 들어 있으며, `select` 대신 플레이스홀더(`<x id="ICU">`)를 사용합니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-select-1"/>

중요: 텍스트를 번역할 때 필요하면 플레이스홀더를 옮길 수 있지만, 제거해서는 안 됩니다.
플레이스홀더를 제거하면 번역된 애플리케이션에서 ICU 표현식이 사라집니다.

다음 예제는 `select` 절이 들어 있는 두 번째 번역 단위를 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-select-2"/>

다음 예제는 번역이 끝난 두 번역 단위를 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translated-select"/>

<!--
## Translate nested expressions
-->

<a id="translate-nested-expressions"></a>

## 중첩된 표현식 번역하기

<!--
Angular treats a nested expression in the same manner as an alternate expression.
Angular extracts the expression into two translation units.
-->

Angular는 중첩된 표현식을 선택 표현식과 같은 방식으로 처리합니다.
Angular는 표현식을 두 개의 번역 단위로 추출합니다.

<!--
### Nested `plural` example
-->

<a id="nested-plural-example"></a>

### 중첩된 `plural` 예제

<!--
The following example displays the first translation unit that contains the text outside of the nested expression.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested-1"/>

The following example displays the second translation unit that contains the complete nested expression.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested-2"/>

The following example displays both translation units after translating.

<docs-code header="src/locale/messages.fr.xlf (<trans-unit>)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested"/>
-->

다음 예제는 중첩된 표현식 바깥의 텍스트가 들어 있는 첫 번째 번역 단위를 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested-1"/>

다음 예제는 중첩된 표현식 전체가 들어 있는 두 번째 번역 단위를 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested-2"/>

다음 예제는 번역이 끝난 두 번역 단위를 보여줍니다.

<docs-code header="src/locale/messages.fr.xlf (&lt;trans-unit&gt;)" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" region="translate-nested"/>

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/merge" title="Merge translations into the app"/>
</docs-pill-row>

[CliMain]: cli 'CLI Overview and Command Reference | Angular'
[CliExtractI18n]: cli/extract-i18n 'ng extract-i18n | CLI | Angular'
[GuideI18nCommonPrepare]: guide/i18n/prepare 'Prepare component for translation | Angular'
[GuideI18nCommonPrepareAddHelpfulDescriptionsAndMeanings]: guide/i18n/prepare#add-helpful-descriptions-and-meanings 'Add helpful descriptions and meanings - Prepare component for translation | Angular'
[GuideI18nCommonTranslationFilesCreateATranslationFileForEachLanguage]: guide/i18n/translation-files#create-a-translation-file-for-each-language 'Create a translation file for each language - Work with translation files | Angular'
[GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile]: guide/i18n/translation-files#extract-the-source-language-file 'Extract the source language file - Work with translation files | Angular'
[GuideI18nCommonTranslationFilesTranslateAlternateExpressions]: guide/i18n/translation-files#translate-alternate-expressions 'Translate alternate expressions - Work with translation files | Angular'
[GuideI18nCommonTranslationFilesTranslateEachTranslationFile]: guide/i18n/translation-files#translate-each-translation-file 'Translate each translation file - Work with translation files | Angular'
[GuideI18nCommonTranslationFilesTranslateNestedExpressions]: guide/i18n/translation-files#translate-nested-expressions 'Translate nested expressions - Work with translation files | Angular'
[GuideI18nCommonTranslationFilesTranslatePlurals]: guide/i18n/translation-files#translate-plurals 'Translate plurals - Work with translation files | Angular'
[GuideI18nExample]: guide/i18n/example 'Example Angular Internationalization application | Angular'
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text 'Manage marked text with custom IDs | Angular'
[GithubGoogleAppResourceBundleWikiApplicationresourcebundlespecification]: https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification 'ApplicationResourceBundleSpecification | google/app-resource-bundle | GitHub'
[GithubUnicodeOrgCldrStagingChartsLatestSupplementalLanguagePluralRulesHtml]: https://cldr.unicode.org/index/cldr-spec/plural-rules 'Language Plural Rules - CLDR Charts | Unicode | GitHub'
[JsonMain]: https://www.json.org 'Introducing JSON | JSON'
[OasisOpenDocsXliffXliffCoreXliffCoreHtml]: https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html 'XLIFF Version 1.2 Specification | Oasis Open Docs'
[OasisOpenDocsXliffXliffCoreV20Cos01XliffCoreV20Cose01Html]: https://docs.oasis-open.org/xliff/xliff-core/v2.0/cos01/xliff-core-v2.0-cos01.html 'XLIFF Version 2.0 | Oasis Open Docs'
[UnicodeCldrDevelopmentDevelopmentProcessDesignProposalsXmb]: https://cldr.unicode.org/development/development-process/design-proposals/xmb 'XMB | CLDR - Unicode Common Locale Data Repository | Unicode'
[WikipediaWikiXliff]: https://en.wikipedia.org/wiki/XLIFF 'XLIFF | Wikipedia'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/merge" title="앱에 번역 병합하기"/>
</docs-pill-row>

[CliMain]: cli 'CLI 개요와 명령어 참조 | Angular'
[CliExtractI18n]: cli/extract-i18n 'ng extract-i18n | CLI | Angular'
[GuideI18nCommonPrepare]: guide/i18n/prepare '컴포넌트 번역 준비하기 | Angular'
[GuideI18nCommonPrepareAddHelpfulDescriptionsAndMeanings]: guide/i18n/prepare#add-helpful-descriptions-and-meanings '도움이 되는 설명과 의미 추가하기 - 컴포넌트 번역 준비하기 | Angular'
[GuideI18nCommonTranslationFilesCreateATranslationFileForEachLanguage]: guide/i18n/translation-files#create-a-translation-file-for-each-language '언어별 번역 파일 만들기 - 번역 파일 다루기 | Angular'
[GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile]: guide/i18n/translation-files#extract-the-source-language-file '원본 언어 파일 추출하기 - 번역 파일 다루기 | Angular'
[GuideI18nCommonTranslationFilesTranslateAlternateExpressions]: guide/i18n/translation-files#translate-alternate-expressions '선택 표현식 번역하기 - 번역 파일 다루기 | Angular'
[GuideI18nCommonTranslationFilesTranslateEachTranslationFile]: guide/i18n/translation-files#translate-each-translation-file '각 번역 파일 번역하기 - 번역 파일 다루기 | Angular'
[GuideI18nCommonTranslationFilesTranslateNestedExpressions]: guide/i18n/translation-files#translate-nested-expressions '중첩된 표현식 번역하기 - 번역 파일 다루기 | Angular'
[GuideI18nCommonTranslationFilesTranslatePlurals]: guide/i18n/translation-files#translate-plurals '복수형 번역하기 - 번역 파일 다루기 | Angular'
[GuideI18nExample]: guide/i18n/example 'Angular 국제화 예제 애플리케이션 | Angular'
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text '커스텀 ID로 표시된 텍스트 관리하기 | Angular'
[GithubGoogleAppResourceBundleWikiApplicationresourcebundlespecification]: https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification 'ApplicationResourceBundleSpecification | google/app-resource-bundle | GitHub'
[GithubUnicodeOrgCldrStagingChartsLatestSupplementalLanguagePluralRulesHtml]: https://cldr.unicode.org/index/cldr-spec/plural-rules '언어별 복수형 규칙 - CLDR Charts | Unicode | GitHub'
[JsonMain]: https://www.json.org 'JSON 소개 | JSON'
[OasisOpenDocsXliffXliffCoreXliffCoreHtml]: https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html 'XLIFF 버전 1.2 명세 | Oasis Open Docs'
[OasisOpenDocsXliffXliffCoreV20Cos01XliffCoreV20Cose01Html]: https://docs.oasis-open.org/xliff/xliff-core/v2.0/cos01/xliff-core-v2.0-cos01.html 'XLIFF 버전 2.0 | Oasis Open Docs'
[UnicodeCldrDevelopmentDevelopmentProcessDesignProposalsXmb]: https://cldr.unicode.org/development/development-process/design-proposals/xmb 'XMB | CLDR - 유니코드 공통 지역 데이터 저장소 | Unicode'
[WikipediaWikiXliff]: https://en.wikipedia.org/wiki/XLIFF 'XLIFF | Wikipedia'
