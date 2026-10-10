<!--
# Manage marked text with custom IDs
-->

<a id="manage-marked-text-with-custom-ids"></a>

# 커스텀 ID로 표시된 텍스트 관리하기

<!--
The Angular extractor generates a file with a translation unit entry each of the following instances.

- Each `i18n` attribute in a component template
- Each [`$localize`][ApiLocalizeInitLocalize] tagged message string in component code

As described in [How meanings control text extraction and merges][GuideI18nCommonPrepareHowMeaningsControlTextExtractionAndMerges], Angular assigns each translation unit a unique ID.

The following example displays translation units with unique IDs.

<docs-code header="messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="generated-id"/>

When you change the translatable text, the extractor generates a new ID for that translation unit.
In most cases, changes in the source text also require a change to the translation.
Therefore, using a new ID keeps the text change in sync with translations.

However, some translation systems require a specific form or syntax for the ID.
To address the requirement, use a custom ID to mark text.
Most developers don't need to use a custom ID.
If you want to use a unique syntax to convey additional metadata, use a custom ID.
Additional metadata may include the library, component, or area of the application in which the text appears.

To specify a custom ID in the `i18n` attribute or [`$localize`][ApiLocalizeInitLocalize] tagged message string, use the `@@` prefix.
The following example defines the `introductionHeader` custom ID in a heading element.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-solo-id"/>

The following example defines the `introductionHeader` custom ID for a variable.

```ts
variableText1 = $localize`:@@introductionHeader:Hello i18n!`;
```

When you specify a custom ID, the extractor generates a translation unit with the custom ID.

<docs-code header="messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="custom-id"/>

If you change the text, the extractor does not change the ID.
As a result, you don't have to take the extra step to update the translation.
The drawback of using custom IDs is that if you change the text, your translation may be out-of-sync with the newly changed source text.
-->

Angular 추출 도구는 다음 항목마다 번역 단위 항목을 만들어 파일로 생성합니다.

- 컴포넌트 템플릿의 각 `i18n` 어트리뷰트
- 컴포넌트 코드에서 [`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 각 메시지 문자열

[의미가 텍스트 추출과 병합을 제어하는 방식][GuideI18nCommonPrepareHowMeaningsControlTextExtractionAndMerges]에서 설명한 것처럼, Angular는 각 번역 단위에 고유한 ID를 부여합니다.

다음 예제는 고유한 ID가 있는 번역 단위를 보여줍니다.

<docs-code header="messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="generated-id"/>

번역할 텍스트를 변경하면 추출 도구가 해당 번역 단위의 ID를 새로 생성합니다.
원문이 변경되면 대부분 번역도 변경해야 합니다.
따라서 새 ID를 사용하면 원문 변경 사항과 번역을 동기화할 수 있습니다.

하지만 일부 번역 시스템은 ID에 특정 형식이나 구문을 요구합니다.
이 요구사항을 충족하려면 커스텀 ID로 텍스트를 표시하세요.
대부분의 개발자는 커스텀 ID를 사용할 필요가 없습니다.
별도의 구문으로 추가 메타데이터를 전달하려는 경우에 커스텀 ID를 사용하세요.
추가 메타데이터에는 해당 텍스트가 나타나는 라이브러리, 컴포넌트, 애플리케이션 영역 등이 포함될 수 있습니다.

`i18n` 어트리뷰트나 [`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 메시지 문자열에 커스텀 ID를 지정하려면 `@@` 접두사를 사용하세요.
다음 예제는 제목 엘리먼트에 `introductionHeader` 커스텀 ID를 정의합니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-solo-id"/>

다음 예제는 변수에 `introductionHeader` 커스텀 ID를 정의합니다.

```ts
variableText1 = $localize`:@@introductionHeader:Hello i18n!`;
```

커스텀 ID를 지정하면 추출 도구가 해당 커스텀 ID를 가진 번역 단위를 생성합니다.

<docs-code header="messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="custom-id"/>

텍스트를 변경해도 추출 도구는 ID를 변경하지 않습니다.
따라서 번역을 갱신하기 위한 추가 단계를 거칠 필요가 없습니다.
다만 커스텀 ID를 사용하면 텍스트를 변경했을 때 기존 번역과 변경된 원문이 일치하지 않을 수 있다는 단점이 있습니다.

<!--
## Use a custom ID with a description
-->

<a id="use-a-custom-id-with-a-description"></a>

## 설명과 함께 커스텀 ID 사용하기

<!--
Use a custom ID in combination with a description and a meaning to further help the translator.

The following example includes a description, followed by the custom ID.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-id"/>

The following example defines the `introductionHeader` custom ID and description for a variable.

```ts
variableText2 = $localize`:An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

The following example adds a meaning.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-meaning-and-id"/>

The following example defines the `introductionHeader` custom ID for a variable.

```ts
variableText3 = $localize`:site header|An introduction header for this sample@@introductionHeader:Hello i18n!`;
```
-->

번역자에게 더 많은 도움을 주려면 커스텀 ID에 설명과 의미를 함께 지정하세요.

다음 예제에는 설명 뒤에 커스텀 ID가 포함되어 있습니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-id"/>

다음 예제는 변수에 `introductionHeader` 커스텀 ID와 설명을 정의합니다.

```ts
variableText2 = $localize`:An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

다음 예제는 의미를 추가합니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-meaning-and-id"/>

다음 예제는 변수에 `introductionHeader` 커스텀 ID를 정의합니다.

```ts
variableText3 = $localize`:site header|An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

<!--
### Define unique custom IDs
-->

<a id="define-unique-custom-ids"></a>

### 고유한 커스텀 ID 정의하기

<!--
Be sure to define custom IDs that are unique.
If you use the same ID for two different text elements, the extraction tool extracts only the first one, and Angular uses the translation in place of both original text elements.

For example, in the following code snippet the same `myId` custom ID is defined for two different text elements.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-duplicate-custom-id"/>

The following displays the translation in French.

<docs-code header="src/locale/messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="i18n-duplicate-custom-id"/>

Both elements now use the same translation \(`Bonjour`\), because both were defined with the same custom ID.

<docs-code path="adev/src/content/examples/i18n/doc-files/rendered-output.html"/>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API | Angular'
[GuideI18nCommonPrepareHowMeaningsControlTextExtractionAndMerges]: guide/i18n/prepare#h1-example 'How meanings control text extraction and merges - Prepare components for translations | Angular'
-->

커스텀 ID는 반드시 고유하게 정의하세요.
서로 다른 두 텍스트 엘리먼트에 같은 ID를 사용하면 추출 도구는 첫 번째 엘리먼트만 추출하고, Angular는 두 원문 엘리먼트 모두에 같은 번역을 사용합니다.

예를 들어 다음 코드에서는 서로 다른 두 텍스트 엘리먼트에 같은 `myId` 커스텀 ID를 정의합니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-duplicate-custom-id"/>

다음은 프랑스어 번역입니다.

<docs-code header="src/locale/messages.fr.xlf" path="adev/src/content/examples/i18n/doc-files/messages.fr.xlf" visibleRegion="i18n-duplicate-custom-id"/>

두 엘리먼트에 같은 커스텀 ID를 정의했기 때문에 이제 두 엘리먼트 모두 같은 번역(`Bonjour`)을 사용합니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/rendered-output.html"/>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API | Angular'
[GuideI18nCommonPrepareHowMeaningsControlTextExtractionAndMerges]: guide/i18n/prepare#h1-example '의미가 텍스트 추출과 병합을 제어하는 방식 - 컴포넌트 번역 준비하기 | Angular'
