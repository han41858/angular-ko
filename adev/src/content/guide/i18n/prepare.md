<!--
# Prepare component for translation
-->

<a id="prepare-component-for-translation"></a>

# 컴포넌트 번역 준비하기

<!--
To prepare your project for translation, complete the following actions.

- Use the `i18n` attribute to mark text in component templates
- Use the `i18n-` attribute to mark attribute text strings in component templates
- Use the `$localize` tagged message string to mark text strings in component code
-->

프로젝트의 번역을 준비하려면 다음 작업을 수행하세요.

- `i18n` 어트리뷰트로 컴포넌트 템플릿의 텍스트 표시
- `i18n-` 어트리뷰트로 컴포넌트 템플릿의 어트리뷰트 문자열 표시
- `$localize` 태그가 붙은 메시지 문자열로 컴포넌트 코드의 문자열 표시

<!--
## Mark text in component template
-->

<a id="mark-text-in-component-template"></a>

## 컴포넌트 템플릿의 텍스트 표시하기

<!--
In a component template, the i18n metadata is the value of the `i18n` attribute.

```html
<element i18n="{i18n_metadata}">{string_to_translate}</element>
```

Use the `i18n` attribute to mark a static text message in your component templates for translation.
Place it on every element tag that contains fixed text you want to translate.

HELPFUL: The `i18n` attribute is a custom attribute that the Angular tools and compilers recognize.
-->

컴포넌트 템플릿에서 i18n 메타데이터는 `i18n` 어트리뷰트의 값입니다.

```html
<element i18n="{i18n_metadata}">{string_to_translate}</element>
```

컴포넌트 템플릿의 정적 텍스트 메시지를 번역 대상으로 표시하려면 `i18n` 어트리뷰트를 사용하세요.
번역하려는 고정 텍스트가 들어 있는 모든 엘리먼트 태그에 이 어트리뷰트를 추가하세요.

도움말: `i18n` 어트리뷰트는 Angular 도구와 컴파일러가 인식하는 커스텀 어트리뷰트입니다.

<!--
### `i18n` example
-->

<a id="i18n-example"></a>

### `i18n` 예제

<!--
The following `<h1>` tag displays a simple English language greeting, "Hello i18n!".

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="greeting"/>

To mark the greeting for translation, add the `i18n` attribute to the `<h1>` tag.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute"/>
-->

다음 `<h1>` 태그는 간단한 영어 인사말인 "Hello i18n!"을 표시합니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="greeting"/>

인사말을 번역 대상으로 표시하려면 `<h1>` 태그에 `i18n` 어트리뷰트를 추가하세요.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute"/>

<!--
### using conditional statement with `i18n`
-->

<a id="using-conditional-statement-with-i18n"></a>

### `i18n`과 조건문 함께 사용하기

<!--
The following `<div>` tag will display translated text as part of `div` and `aria-label` based on toggle status

<docs-code-multifile>
    <docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html"  region="i18n-conditional"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/i18n/src/app/app.component.ts" visibleLines="[[14,21],[33,37]]"/>
</docs-code-multifile>
-->

다음 `<div>` 태그는 토글 상태에 따라 `div`와 `aria-label`에 번역된 텍스트를 표시합니다.

<docs-code-multifile>
    <docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html"  region="i18n-conditional"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/i18n/src/app/app.component.ts" visibleLines="[[14,21],[33,37]]"/>
</docs-code-multifile>

<!--
### Translate inline text without HTML element
-->

<a id="translate-inline-text-without-html-element"></a>

### HTML 엘리먼트 없이 인라인 텍스트 번역하기

<!--
Use the `<ng-container>` element to associate a translation behavior for specific text without changing the way text is displayed.

HELPFUL: Each HTML element creates a new DOM element.
To avoid creating a new DOM element, wrap the text in an `<ng-container>` element.
The following example shows the `<ng-container>` element transformed into a non-displayed HTML comment.

<docs-code path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-ng-container"/>
-->

텍스트가 표시되는 방식을 바꾸지 않고 특정 텍스트에 번역 동작을 연결하려면 `<ng-container>` 엘리먼트를 사용하세요.

도움말: 각 HTML 엘리먼트는 새 DOM 엘리먼트를 생성합니다.
새 DOM 엘리먼트를 생성하지 않으려면 텍스트를 `<ng-container>` 엘리먼트로 감싸세요.
다음 예제는 `<ng-container>` 엘리먼트가 화면에 표시되지 않는 HTML 주석으로 변환되는 모습을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-ng-container"/>

<!--
### Name the interpolation placeholder
-->

<a id="name-the-interpolation-placeholder"></a>

### 문자열 보간 플레이스홀더에 이름 지정하기

<!--
By default, Angular generates a placeholder name for each interpolation in a translated message. To give it a meaningful name that helps translators understand the context, add an `//i18n(ph="name")` comment inside the interpolation.

```html
<element i18n>{{ expression //i18n(ph="placeholder_name") }}</element>
```

For example:

```html
<p i18n>Hello, {{ username //i18n(ph="name") }}!</p>
```

This is the template equivalent of naming a placeholder in component code with [`$localize`][ApiLocalizeInitLocalize]:

```ts
$localize`Hello, ${username}:name:!`;
```
-->

기본적으로 Angular는 번역된 메시지의 각 문자열 보간에 플레이스홀더 이름을 생성합니다.
번역자가 문맥을 이해하는 데 도움이 되는 이름을 지정하려면 문자열 보간 안에 `//i18n(ph="name")` 주석을 추가하세요.

```html
<element i18n>{{ expression //i18n(ph="placeholder_name") }}</element>
```

예를 들면 다음과 같습니다.

```html
<p i18n>Hello, {{ username //i18n(ph="name") }}!</p>
```

이는 컴포넌트 코드에서 [`$localize`][ApiLocalizeInitLocalize]로 플레이스홀더에 이름을 지정하는 것과 같은 작업을 템플릿에서 수행하는 방법입니다.

```ts
$localize`Hello, ${username}:name:!`;
```

<!--
## Mark element attributes for translations
-->

<a id="mark-element-attributes-for-translations"></a>

## 엘리먼트 어트리뷰트를 번역 대상으로 표시하기

<!--
In a component template, the i18n metadata is the value of the `i18n-{attribute_name}` attribute.

```html
<element i18n-{attribute_name}="{i18n_metadata}" {attribute_name}="{attribute_value}" />
```

The attributes of HTML elements include text that should be translated along with the rest of the displayed text in the component template.

Use `i18n-{attribute_name}` with any attribute of any element and replace `{attribute_name}` with the name of the attribute.
Use the following syntax to assign a meaning, description, and custom ID.

```html
i18n-{attribute_name}="{meaning}|{description}@@{id}"
```
-->

컴포넌트 템플릿에서 i18n 메타데이터는 `i18n-{attribute_name}` 어트리뷰트의 값입니다.

```html
<element i18n-{attribute_name}="{i18n_metadata}" {attribute_name}="{attribute_value}" />
```

HTML 엘리먼트의 어트리뷰트에는 컴포넌트 템플릿에 표시되는 다른 텍스트와 함께 번역해야 하는 텍스트가 포함될 수 있습니다.

어떤 엘리먼트의 어트리뷰트에든 `i18n-{attribute_name}`을 사용할 수 있습니다.
`{attribute_name}`은 해당 어트리뷰트 이름으로 바꾸세요.
다음 구문으로 의미, 설명, 커스텀 ID를 지정하세요.

```html
i18n-{attribute_name}="{meaning}|{description}@@{id}"
```

<!--
### `i18n-title` example
-->

<a id="i18n-title-example"></a>

### `i18n-title` 예제

<!--
To translate the title of an image, review this example.
The following example displays an image with a `title` attribute.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-title"/>

To mark the title attribute for translation, complete the following action.

Add the `i18n-title` attribute

The following example displays how to mark the `title` attribute on the `img` tag by adding `i18n-title`.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-title-translate"/>
-->

이미지의 제목을 번역하려면 다음 예제를 살펴보세요.
다음 예제는 `title` 어트리뷰트가 있는 이미지를 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-title"/>

제목 어트리뷰트를 번역 대상으로 표시하려면 다음 작업을 수행하세요.

`i18n-title` 어트리뷰트를 추가합니다.

다음 예제는 `i18n-title`을 추가해 `img` 태그의 `title` 어트리뷰트를 번역 대상으로 표시하는 방법을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-title-translate"/>

<!--
## Mark text in component code
-->

<a id="mark-text-in-component-code"></a>

## 컴포넌트 코드의 텍스트 표시하기

<!--
In component code, the translation source text and the metadata are surrounded by backtick \(<code>&#96;</code>\) characters.

Use the [`$localize`][ApiLocalizeInitLocalize] tagged message string to mark a string in your code for translation.

```ts
$localize`string_to_translate`;
```

The i18n metadata is surrounded by colon \(`:`\) characters and prepends the translation source text.

```ts
$localize`:{i18n_metadata}:string_to_translate`;
```
-->

컴포넌트 코드에서는 번역할 원문과 메타데이터를 백틱(<code>&#96;</code>)으로 감쌉니다.

코드의 문자열을 번역 대상으로 표시하려면 [`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 메시지 문자열을 사용하세요.

```ts
$localize`string_to_translate`;
```

i18n 메타데이터는 콜론(`:`)으로 감싸고 번역할 원문 앞에 붙입니다.

```ts
$localize`:{i18n_metadata}:string_to_translate`;
```

<!--
### Include interpolated text
-->

<a id="include-interpolated-text"></a>

### 보간된 텍스트 포함하기

<!--
Include [interpolations](guide/templates/binding#render-dynamic-text-with-text-interpolation) in a [`$localize`][ApiLocalizeInitLocalize] tagged message string.

```ts
$localize`string_to_translate ${variable_name}`;
```
-->

[`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 메시지 문자열에 [문자열 보간](guide/templates/binding#render-dynamic-text-with-text-interpolation)을 포함하세요.

```ts
$localize`string_to_translate ${variable_name}`;
```

<!--
### Name the interpolation placeholder
-->

<a id="name-the-interpolation-placeholder-1"></a>

### 문자열 보간 플레이스홀더에 이름 지정하기

<!--
```ts
$localize`string_to_translate ${variable_name}:placeholder_name:`;
```
-->

```ts
$localize`string_to_translate ${variable_name}:placeholder_name:`;
```

<!--
### Conditional syntax for translations
-->

<a id="conditional-syntax-for-translations"></a>

### 번역을 위한 조건문 구문

<!--
```ts
return this.show ? $localize`Show Tabs` : $localize`Hide tabs`;
```
-->

```ts
return this.show ? $localize`Show Tabs` : $localize`Hide tabs`;
```

<!--
## i18n metadata for translation
-->

<a id="i18n-metadata-for-translation"></a>

## 번역을 위한 i18n 메타데이터

<!--
```html
{meaning}|{description}@@{custom_id}
```

The following parameters provide context and additional information to reduce confusion for your translator.

| Metadata parameter | Details                                                               |
| :----------------- | :-------------------------------------------------------------------- |
| Custom ID          | Provide a custom identifier                                           |
| Description        | Provide additional information or context                             |
| Meaning            | Provide the meaning or intent of the text within the specific context |

For additional information about custom IDs, see [Manage marked text with custom IDs][GuideI18nOptionalManageMarkedText].
-->

```html
{meaning}|{description}@@{custom_id}
```

다음 인자는 문맥과 추가 정보를 제공해 번역자가 혼동하지 않도록 돕습니다.

| 메타데이터 인자 | 설명                                             |
| :-------------- | :----------------------------------------------- |
| 커스텀 ID       | 커스텀 식별자를 제공합니다.                      |
| 설명            | 추가 정보나 문맥을 제공합니다.                   |
| 의미            | 특정 문맥에서 텍스트의 의미나 의도를 제공합니다. |

커스텀 ID에 대한 자세한 내용은 [커스텀 ID로 표시된 텍스트 관리하기][GuideI18nOptionalManageMarkedText]를 참고하세요.

<!--
### Add helpful descriptions and meanings
-->

<a id="add-helpful-descriptions-and-meanings"></a>

### 도움이 되는 설명과 의미 추가하기

<!--
To translate a text message accurately, provide additional information or context for the translator.

Add a _description_ of the text message as the value of the `i18n` attribute or [`$localize`][ApiLocalizeInitLocalize] tagged message string.

The following example shows the value of the `i18n` attribute.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-desc"/>

The following example shows the value of the [`$localize`][ApiLocalizeInitLocalize] tagged message string with a description.

```ts
$localize`:An introduction header for this sample:Hello i18n!`;
```

The translator may also need to know the meaning or intent of the text message within this particular application context, in order to translate it the same way as other text with the same meaning.
Start the `i18n` attribute value with the _meaning_ and separate it from the _description_ with the `|` character: `{meaning}|{description}`.
-->

텍스트 메시지를 정확하게 번역할 수 있도록 번역자에게 추가 정보나 문맥을 제공하세요.

텍스트 메시지의 _설명_ 을 `i18n` 어트리뷰트나 [`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 메시지 문자열의 값으로 추가하세요.

다음 예제는 `i18n` 어트리뷰트의 값을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-desc"/>

다음 예제는 설명이 포함된 [`$localize`][ApiLocalizeInitLocalize] 태그 메시지 문자열의 값을 보여줍니다.

```ts
$localize`:An introduction header for this sample:Hello i18n!`;
```

같은 의미를 가진 다른 텍스트와 일관되게 번역하려면, 번역자는 해당 애플리케이션 문맥에서 텍스트 메시지가 어떤 의미나 의도를 갖는지도 알아야 할 수 있습니다.
`i18n` 어트리뷰트 값을 _의미_ 로 시작하고 `|` 문자로 _설명_ 과 구분하세요.
형식은 `{meaning}|{description}`입니다.

<!--
#### `h1` example
-->

<a id="h1-example"></a>

#### `h1` 예제

<!--
For example, you may want to specify that the `<h1>` tag is a site header that you need translated the same way, whether it is used as a header or referenced in another section of text.

The following example shows how to specify that the `<h1>` tag must be translated as a header or referenced elsewhere.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-meaning"/>

The result is any text marked with `site header`, as the _meaning_ is translated exactly the same way.

The following code example shows the value of the [`$localize`][ApiLocalizeInitLocalize] tagged message string with a meaning and a description.

```ts
$localize`:site header|An introduction header for this sample:Hello i18n!`;
```

<docs-callout title="How meanings control text extraction and merges">

The Angular extraction tool generates a translation unit entry for each `i18n` attribute in a template.
The Angular extraction tool assigns each translation unit a unique ID based on the _meaning_ and _description_.

HELPFUL: For more information about the Angular extraction tool, see [Work with translation files](guide/i18n/translation-files).

The same text elements with different _meanings_ are extracted with different IDs.
For example, if the word "right" uses the following two definitions in two different locations, the word is translated differently and merged back into the application as different translation entries.

- `correct` as in "you are right"
- `direction` as in "turn right"

If the same text elements meet the following conditions, the text elements are extracted only once and use the same ID.

- Same meaning or definition
- Different descriptions

That one translation entry is merged back into the application wherever the same text elements appear.

</docs-callout>
-->

예를 들어 `<h1>` 태그가 사이트의 제목임을 명시하고, 제목으로 사용하든 다른 텍스트에서 참조하든 동일하게 번역하도록 지정할 수 있습니다.

다음 예제는 `<h1>` 태그를 제목으로 사용하거나 다른 곳에서 참조할 때 동일하게 번역해야 한다는 것을 지정하는 방법을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" region="i18n-attribute-meaning"/>

이렇게 하면 _의미_ 가 `site header`로 표시된 모든 텍스트가 정확히 같은 방식으로 번역됩니다.

다음 코드 예제는 의미와 설명이 포함된 [`$localize`][ApiLocalizeInitLocalize] 태그 메시지 문자열의 값을 보여줍니다.

```ts
$localize`:site header|An introduction header for this sample:Hello i18n!`;
```

<docs-callout title="의미가 텍스트 추출과 병합을 제어하는 방식">

Angular 추출 도구는 템플릿의 각 `i18n` 어트리뷰트에 대한 번역 단위 항목을 생성합니다.
Angular 추출 도구는 _의미_ 와 _설명_ 을 기준으로 각 번역 단위에 고유한 ID를 부여합니다.

도움말: Angular 추출 도구에 대한 자세한 내용은 [번역 파일 다루기](guide/i18n/translation-files)를 참고하세요.

같은 텍스트 엘리먼트라도 _의미_ 가 다르면 서로 다른 ID로 추출됩니다.
예를 들어 "right"라는 단어를 두 위치에서 다음과 같이 서로 다른 의미로 사용하면, 각각 다르게 번역되고 별도의 번역 항목으로 애플리케이션에 병합됩니다.

- "you are right"에서처럼 `correct`(옳음)라는 의미
- "turn right"에서처럼 `direction`(방향)이라는 의미

같은 텍스트 엘리먼트가 다음 조건을 만족하면 한 번만 추출되며 같은 ID를 사용합니다.

- 의미나 정의가 같습니다.
- 설명은 다릅니다.

이 하나의 번역 항목은 같은 텍스트 엘리먼트가 나타나는 애플리케이션의 모든 위치에 병합됩니다.

</docs-callout>

<!--
## ICU expressions
-->

<a id="icu-expressions"></a>

## ICU 표현식

<!--
ICU expressions help you mark alternate text in component templates to meet conditions.
An ICU expression includes a component property, an ICU clause, and the case statements surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
{ component_property, icu_clause, case_statements }
```

The component property defines the variable.
An ICU clause defines the type of conditional text.

| ICU clause                                                           | Details                                                             |
| :------------------------------------------------------------------- | :------------------------------------------------------------------ |
| [`plural`][GuideI18nCommonPrepareMarkPlurals]                        | Mark the use of plural numbers                                      |
| [`select`][GuideI18nCommonPrepareMarkAlternatesAndNestedExpressions] | Mark choices for alternate text based on your defined string values |

To simplify translation, use International Components for Unicode clauses \(ICU clauses\) with regular expressions.

HELPFUL: The ICU clauses adhere to the [ICU Message Format][GithubUnicodeOrgIcuUserguideFormatParseMessages] specified in the [CLDR pluralization rules][UnicodeCldrIndexCldrSpecPluralRules].
-->

ICU 표현식을 사용하면 조건에 따라 표시할 대체 텍스트를 컴포넌트 템플릿에 지정할 수 있습니다.
ICU 표현식은 여는 중괄호(`{`)와 닫는 중괄호(`}`) 안에 컴포넌트 프로퍼티, ICU 절, 조건별 구문을 포함합니다.

```html
{ component_property, icu_clause, case_statements }
```

컴포넌트 프로퍼티는 변수를 정의합니다.
ICU 절은 조건부 텍스트의 유형을 정의합니다.

| ICU 절                                                               | 설명                                                     |
| :------------------------------------------------------------------- | :------------------------------------------------------- |
| [`plural`][GuideI18nCommonPrepareMarkPlurals]                        | 복수형 숫자의 사용을 표시합니다.                         |
| [`select`][GuideI18nCommonPrepareMarkAlternatesAndNestedExpressions] | 정의한 문자열 값에 따라 선택할 대체 텍스트를 표시합니다. |

번역을 단순화하려면 정규 표현식과 함께 International Components for Unicode 절(ICU 절)을 사용하세요.

도움말: ICU 절은 [CLDR 복수형 규칙][UnicodeCldrIndexCldrSpecPluralRules]에서 지정한 [ICU 메시지 형식][GithubUnicodeOrgIcuUserguideFormatParseMessages]을 따릅니다.

<!--
### Mark plurals
-->

<a id="mark-plurals"></a>

### 복수형 표시하기

<!--
Different languages have different pluralization rules that increase the difficulty of translation.
Because other locales express cardinality differently, you may need to set pluralization categories that do not align with English.
Use the `plural` clause to mark expressions that may not be meaningful if translated word-for-word.

```html
{ component_property, plural, pluralization_categories }
```

After the pluralization category, enter the default text \(English\) surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
pluralization_category { }
```

The following pluralization categories are available for English and may change based on the locale.

| Pluralization category | Details                    | Example                    |
| :--------------------- | :------------------------- | :------------------------- |
| `zero`                 | Quantity is zero           | `=0 { }` <br /> `zero { }` |
| `one`                  | Quantity is 1              | `=1 { }` <br /> `one { }`  |
| `two`                  | Quantity is 2              | `=2 { }` <br /> `two { }`  |
| `few`                  | Quantity is 2 or more      | `few { }`                  |
| `many`                 | Quantity is a large number | `many { }`                 |
| `other`                | The default quantity       | `other { }`                |

If none of the pluralization categories match, Angular uses `other` to match the standard fallback for a missing category.

```html
other { default_quantity }
```

HELPFUL: For more information about pluralization categories, see [Choosing plural category names][UnicodeCldrIndexCldrSpecPluralRulesTocChoosingPluralCategoryNames] in the [CLDR - Unicode Common Locale Data Repository][UnicodeCldrMain].

<docs-callout header='Background: Locales may not support some pluralization categories'>

Many locales don't support some of the pluralization categories.
The default locale \(`en-US`\) uses a very simple `plural()` function that doesn't support the `few` pluralization category.
Another locale with a simple `plural()` function is `es`.
The following code example shows the [en-US `plural()`][GithubAngularAngularBlobEcffc3557fe1bff9718c01277498e877ca44588dPackagesCoreSrcI18nLocaleEnTsL14L18] function.

<docs-code path="adev/src/content/examples/i18n/doc-files/locale_plural_function.ts" class="no-box" hideCopy/>

The `plural()` function only returns 1 \(`one`\) or 5 \(`other`\).
The `few` category never matches.

</docs-callout>
-->

언어마다 복수형 규칙이 다르기 때문에 번역이 더 어려워질 수 있습니다.
다른 지역에서는 수량을 표현하는 방식이 다르므로 영어와 맞지 않는 복수형 범주를 설정해야 할 수 있습니다.
단어를 그대로 옮겨서는 의미가 통하지 않을 수 있는 표현식을 `plural` 절로 표시하세요.

```html
{ component_property, plural, pluralization_categories }
```

복수형 범주 뒤에 여는 중괄호(`{`)와 닫는 중괄호(`}`)로 감싼 기본 텍스트(영어)를 입력하세요.

```html
pluralization_category { }
```

영어에서는 다음 복수형 범주를 사용할 수 있으며, 지역에 따라 달라질 수 있습니다.

| 복수형 범주 | 설명                 | 예제                       |
| :---------- | :------------------- | :------------------------- |
| `zero`      | 수량이 0입니다.      | `=0 { }` <br /> `zero { }` |
| `one`       | 수량이 1입니다.      | `=1 { }` <br /> `one { }`  |
| `two`       | 수량이 2입니다.      | `=2 { }` <br /> `two { }`  |
| `few`       | 수량이 2 이상입니다. | `few { }`                  |
| `many`      | 수량이 큰 수입니다.  | `many { }`                 |
| `other`     | 기본 수량입니다.     | `other { }`                |

일치하는 복수형 범주가 없으면 Angular는 누락된 범주를 위한 표준 대체값으로 `other`를 사용합니다.

```html
other { default_quantity }
```

도움말: 복수형 범주에 대한 자세한 내용은 [CLDR - 유니코드 공통 지역 데이터 저장소][UnicodeCldrMain]의 [복수형 범주 이름 선택하기][UnicodeCldrIndexCldrSpecPluralRulesTocChoosingPluralCategoryNames]를 참고하세요.

<docs-callout header='배경: 지역에 따라 일부 복수형 범주를 지원하지 않을 수 있습니다'>

많은 지역은 일부 복수형 범주를 지원하지 않습니다.
기본 지역(`en-US`)은 `few` 복수형 범주를 지원하지 않는 매우 단순한 `plural()` 함수를 사용합니다.
간단한 `plural()` 함수를 사용하는 또 다른 지역으로 `es`가 있습니다.
다음 코드 예제는 [en-US의 `plural()`][GithubAngularAngularBlobEcffc3557fe1bff9718c01277498e877ca44588dPackagesCoreSrcI18nLocaleEnTsL14L18] 함수를 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/locale_plural_function.ts" class="no-box" hideCopy/>

`plural()` 함수는 1(`one`) 또는 5(`other`)만 반환합니다.
`few` 범주는 일치하는 경우가 없습니다.

</docs-callout>

<!--
#### `minutes` example
-->

<a id="minutes-example"></a>

#### `minutes` 예제

<!--
If you want to display the following phrase in English, where `x` is a number.

<!-todo: replace output docs-code with screen capture image ->

```html
updated x minutes ago
```

And you also want to display the following phrases based on the cardinality of `x`.

<!-todo: replace output docs-code with screen capture image ->

```html
updated just now
```

<!-todo: replace output docs-code with screen capture image ->

```html
updated one minute ago
```

Use HTML markup and [interpolations](guide/templates/binding#render-dynamic-text-with-text-interpolation).
The following code example shows how to use the `plural` clause to express the previous three situations in a `<span>` element.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-plural"/>

Review the following details in the previous code example.

| Parameters                        | Details                                                                                                               |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `minutes`                         | The first parameter specifies the component property is `minutes` and determines the number of minutes.               |
| `plural`                          | The second parameter specifies the ICU clause is `plural`.                                                            |
| `=0 {just now}`                   | For zero minutes, the pluralization category is `=0`. The value is `just now`.                                        |
| `=1 {one minute}`                 | For one minute, the pluralization category is `=1`. The value is `one minute`.                                        |
| `other {{{minutes}} minutes ago}` | For any unmatched cardinality, the default pluralization category is `other`. The value is `{{minutes}} minutes ago`. |

`{{minutes}}` is an [interpolation](guide/templates/binding#render-dynamic-text-with-text-interpolation).
-->

`x`가 숫자일 때 다음 문구를 영어로 표시하려고 한다고 가정해 봅시다.

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
updated x minutes ago
```

또한 `x`의 수량에 따라 다음 문구도 표시하려고 합니다.

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
updated just now
```

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
updated one minute ago
```

HTML 마크업과 [문자열 보간](guide/templates/binding#render-dynamic-text-with-text-interpolation)을 사용하세요.
다음 코드 예제는 `plural` 절로 앞의 세 상황을 `<span>` 엘리먼트에 표현하는 방법을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-plural"/>

앞의 코드 예제에서 다음 내용을 살펴보세요.

| 인자                              | 설명                                                                                                                |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `minutes`                         | 첫 번째 인자는 컴포넌트 프로퍼티를 `minutes`로 지정하며, 분 단위의 수를 결정합니다.                                 |
| `plural`                          | 두 번째 인자는 ICU 절을 `plural`로 지정합니다.                                                                      |
| `=0 {just now}`                   | 0분이면 복수형 범주는 `=0`입니다. 값은 `just now`입니다.                                                            |
| `=1 {one minute}`                 | 1분이면 복수형 범주는 `=1`입니다. 값은 `one minute`입니다.                                                          |
| `other {{{minutes}} minutes ago}` | 어느 범주와도 일치하지 않는 수량에는 기본 복수형 범주인 `other`를 사용합니다. 값은 `{{minutes}} minutes ago`입니다. |

`{{minutes}}`는 [문자열 보간](guide/templates/binding#render-dynamic-text-with-text-interpolation)입니다.

<!--
### Mark alternates and nested expressions
-->

<a id="mark-alternates-and-nested-expressions"></a>

### 선택 표현식과 중첩된 표현식 표시하기

<!--
The `select` clause marks choices for alternate text based on your defined string values.

```html
{ component_property, select, selection_categories }
```

Translate all of the alternates to display alternate text based on the value of a variable.

After the selection category, enter the text \(English\) surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
selection_category { text }
```

Different locales have different grammatical constructions that increase the difficulty of translation.
Use HTML markup.
If none of the selection categories match, Angular uses `other` to match the standard fallback for a missing category.

```html
other { default_value }
```
-->

`select` 절은 정의한 문자열 값에 따라 선택할 대체 텍스트를 표시합니다.

```html
{ component_property, select, selection_categories }
```

변수 값에 따라 대체 텍스트를 표시할 수 있도록 모든 선택지를 번역하세요.

선택 범주 뒤에 여는 중괄호(`{`)와 닫는 중괄호(`}`)로 감싼 텍스트(영어)를 입력하세요.

```html
selection_category { text }
```

지역마다 문법 구조가 다르기 때문에 번역이 더 어려워질 수 있습니다.
HTML 마크업을 사용하세요.
일치하는 선택 범주가 없으면 Angular는 누락된 범주를 위한 표준 대체값으로 `other`를 사용합니다.

```html
other { default_value }
```

<!--
#### `gender` example
-->

<a id="gender-example"></a>

#### `gender` 예제

<!--
If you want to display the following phrase in English.

<!-todo: replace output docs-code with screen capture image ->

```html
The author is other
```

And you also want to display the following phrases based on the `gender` property of the component.

<!-todo: replace output docs-code with screen capture image ->

```html
The author is female
```

<!-todo: replace output docs-code with screen capture image ->

```html
The author is male
```

The following code example shows how to bind the `gender` property of the component and use the `select` clause to express the previous three situations in a `<span>` element.

The `gender` property binds the outputs to each of following string values.

| Value  | English value |
| :----- | :------------ |
| female | `female`      |
| male   | `male`        |
| other  | `other`       |

The `select` clause maps the values to the appropriate translations.
The following code example shows `gender` property used with the select clause.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-select"/>
-->

다음 문구를 영어로 표시하려고 한다고 가정해 봅시다.

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
The author is other
```

또한 컴포넌트의 `gender` 프로퍼티에 따라 다음 문구도 표시하려고 합니다.

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
The author is female
```

<!--todo: 출력 docs-code를 화면 캡처 이미지로 교체 --->

```html
The author is male
```

다음 코드 예제는 컴포넌트의 `gender` 프로퍼티를 바인딩하고 `select` 절을 사용해 앞의 세 상황을 `<span>` 엘리먼트에 표현하는 방법을 보여줍니다.

`gender` 프로퍼티는 출력을 다음 각 문자열 값에 바인딩합니다.

| 값   | 영어 값  |
| :--- | :------- |
| 여성 | `female` |
| 남성 | `male`   |
| 기타 | `other`  |

`select` 절은 각 값을 적절한 번역에 대응시킵니다.
다음 코드 예제는 select 절과 함께 사용하는 `gender` 프로퍼티를 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-select"/>

<!--
#### `gender` and `minutes` example
-->

<a id="gender-and-minutes-example"></a>

#### `gender`와 `minutes` 예제

<!--
Combine different clauses together, such as the `plural` and `select` clauses.
The following code example shows nested clauses based on the `gender` and `minutes` examples.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-nested"/>
-->

`plural` 절과 `select` 절처럼 서로 다른 절을 조합할 수 있습니다.
다음 코드 예제는 `gender`와 `minutes` 예제를 바탕으로 절을 중첩한 모습을 보여줍니다.

<docs-code header="app.component.html" path="adev/src/content/examples/i18n/src/app/app.component.html" region="i18n-nested"/>

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/translation-files" title="Work with translation files"/>
</docs-pill-row>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API  | Angular'
[GuideI18nCommonPrepareMarkAlternatesAndNestedExpressions]: guide/i18n/prepare#mark-alternates-and-nested-expressions 'Mark alternates and nested expressions - Prepare templates for translation | Angular'
[GuideI18nCommonPrepareMarkPlurals]: guide/i18n/prepare#mark-plurals 'Mark plurals - Prepare component for translation | Angular'
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text 'Manage marked text with custom IDs | Angular'
[GithubAngularAngularBlobEcffc3557fe1bff9718c01277498e877ca44588dPackagesCoreSrcI18nLocaleEnTsL14L18]: https://github.com/angular/angular/blob/ecffc3557fe1bff9718c01277498e877ca44588d/packages/core/src/i18n/locale_en.ts#L14-L18 'Line 14 to 18 - angular/packages/core/src/i18n/locale_en.ts | angular/angular | GitHub'
[GithubUnicodeOrgIcuUserguideFormatParseMessages]: https://unicode-org.github.io/icu/userguide/format_parse/messages 'ICU Message Format - ICU Documentation | Unicode | GitHub'
[UnicodeCldrMain]: https://cldr.unicode.org 'Unicode CLDR Project'
[UnicodeCldrIndexCldrSpecPluralRules]: http://cldr.unicode.org/index/cldr-spec/plural-rules 'Plural Rules | CLDR - Unicode Common Locale Data Repository | Unicode'
[UnicodeCldrIndexCldrSpecPluralRulesTocChoosingPluralCategoryNames]: http://cldr.unicode.org/index/cldr-spec/plural-rules#TOC-Choosing-Plural-Category-Names 'Choosing Plural Category Names - Plural Rules | CLDR - Unicode Common Locale Data Repository | Unicode'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/translation-files" title="번역 파일 다루기"/>
</docs-pill-row>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API  | Angular'
[GuideI18nCommonPrepareMarkAlternatesAndNestedExpressions]: guide/i18n/prepare#mark-alternates-and-nested-expressions '선택 표현식과 중첩된 표현식 표시하기 - 템플릿 번역 준비하기 | Angular'
[GuideI18nCommonPrepareMarkPlurals]: guide/i18n/prepare#mark-plurals '복수형 표시하기 - 컴포넌트 번역 준비하기 | Angular'
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text '커스텀 ID로 표시된 텍스트 관리하기 | Angular'
[GithubAngularAngularBlobEcffc3557fe1bff9718c01277498e877ca44588dPackagesCoreSrcI18nLocaleEnTsL14L18]: https://github.com/angular/angular/blob/ecffc3557fe1bff9718c01277498e877ca44588d/packages/core/src/i18n/locale_en.ts#L14-L18 '14~18번째 줄 - angular/packages/core/src/i18n/locale_en.ts | angular/angular | GitHub'
[GithubUnicodeOrgIcuUserguideFormatParseMessages]: https://unicode-org.github.io/icu/userguide/format_parse/messages 'ICU 메시지 형식 - ICU 문서 | Unicode | GitHub'
[UnicodeCldrMain]: https://cldr.unicode.org 'Unicode CLDR Project'
[UnicodeCldrIndexCldrSpecPluralRules]: http://cldr.unicode.org/index/cldr-spec/plural-rules '복수형 규칙 | CLDR - 유니코드 공통 지역 데이터 저장소 | Unicode'
[UnicodeCldrIndexCldrSpecPluralRulesTocChoosingPluralCategoryNames]: http://cldr.unicode.org/index/cldr-spec/plural-rules#TOC-Choosing-Plural-Category-Names '복수형 범주 이름 선택하기 - 복수형 규칙 | CLDR - 유니코드 공통 지역 데이터 저장소 | Unicode'
