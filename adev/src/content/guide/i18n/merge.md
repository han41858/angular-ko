<!--
# Merge translations into the application
-->

<a id="merge-translations-into-the-application"></a>

# 애플리케이션에 번역 병합하기

<!--
To merge the completed translations into your project, complete the following actions

1. Use the [Angular CLI][CliMain] to build a copy of the distributable files of your project
1. Use the `"localize"` option to replace all of the i18n messages with the valid translations and build a localized variant application.
   A variant application is a complete copy of the distributable files of your application translated for a single locale.

After you merge the translations, serve each distributable copy of the application using server-side language detection or different subdirectories.

HELPFUL: For more information about how to serve each distributable copy of the application, see [deploying multiple locales](guide/i18n/deploy).

For a compile-time translation of the application, the build process uses ahead-of-time (AOT) compilation to produce a small, fast, ready-to-run application.

HELPFUL: For a detailed explanation of the build process, see [Building and serving Angular apps][GuideBuild].
The build process works for translation files in the `.xlf` format or in another format that Angular understands, such as `.xtb`.
For more information about translation file formats used by Angular, see [Change the source language file format][GuideI18nCommonTranslationFilesChangeTheSourceLanguageFileFormat]

To build a separate distributable copy of the application for each locale, [define the locales in the build configuration][GuideI18nCommonMergeDefineLocalesInTheBuildConfiguration] in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file of your project.

This method shortens the build process by removing the requirement to perform a full application build for each locale.

To [generate application variants for each locale][GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale], use the `"localize"` option in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file.
Also, to [build from the command line][GuideI18nCommonMergeBuildFromTheCommandLine], use the [`build`][CliBuild] [Angular CLI][CliMain] command with the `--localize` option.

HELPFUL: Optionally, [apply specific build options for just one locale][GuideI18nCommonMergeApplySpecificBuildOptionsForJustOneLocale] for a custom locale configuration.
-->

완성된 번역을 프로젝트에 병합하려면 다음 단계를 진행하세요.

1. [Angular CLI][CliMain]로 프로젝트의 배포 파일 사본을 빌드합니다.
1. `"localize"` 옵션을 사용해 모든 i18n 메시지를 유효한 번역으로 교체하고 현지화된 애플리케이션 버전을 빌드합니다.
   현지화된 애플리케이션 버전은 하나의 지역에 맞게 번역된 애플리케이션 배포 파일의 완전한 사본입니다.

번역을 병합한 후에는 서버 측 언어 감지 기능이나 서로 다른 하위 디렉터리를 사용해 각 애플리케이션 배포 사본을 제공하세요.

도움말: 각 애플리케이션 배포 사본을 제공하는 방법에 대한 자세한 내용은 [여러 지역 배포하기](guide/i18n/deploy)를 참고하세요.

애플리케이션을 컴파일 시점에 번역할 때는 빌드 과정에서 AOT(ahead-of-time) 컴파일을 사용해 크기가 작고 빠르며 바로 실행할 수 있는 애플리케이션을 생성합니다.

도움말: 빌드 과정에 대한 자세한 설명은 [Angular 앱 빌드 및 실행하기][GuideBuild]를 참고하세요.
빌드 과정은 `.xlf` 형식이나 `.xtb`처럼 Angular가 이해할 수 있는 다른 형식의 번역 파일에 적용할 수 있습니다.
Angular가 사용하는 번역 파일 형식에 대한 자세한 내용은 [원본 언어 파일 형식 변경하기][GuideI18nCommonTranslationFilesChangeTheSourceLanguageFileFormat]를 참고하세요.

각 지역의 애플리케이션 배포 사본을 개별적으로 빌드하려면 프로젝트의 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일에서 [빌드 설정에 지역을 정의하세요][GuideI18nCommonMergeDefineLocalesInTheBuildConfiguration].

이 방법을 사용하면 지역마다 애플리케이션 전체를 빌드할 필요가 없어 빌드 시간이 줄어듭니다.

[지역별 애플리케이션 버전을 생성하려면][GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale] [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 `"localize"` 옵션을 사용하세요.
또한 [명령줄에서 빌드하려면][GuideI18nCommonMergeBuildFromTheCommandLine] [Angular CLI][CliMain]의 [`build`][CliBuild] 명령에 `--localize` 옵션을 사용하세요.

도움말: 필요하면 커스텀 지역 설정을 위해 [특정 지역에만 빌드 옵션을 적용할 수 있습니다][GuideI18nCommonMergeApplySpecificBuildOptionsForJustOneLocale].

<!--
## Define locales in the build configuration
-->

<a id="define-locales-in-the-build-configuration"></a>

## 빌드 설정에 지역 정의하기

<!--
Use the `i18n` project option in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file of your project to define locales for a project.

The following sub-options identify the source language and tell the compiler where to find supported translations for the project.

| Suboption      | Details                                                                                                                                                |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceLocale` | The locale you use within the application source code \(`en-US` by default\). Can also be an object with `code`, `baseHref`, and `subPath` properties. |
| `locales`      | A map of locale identifiers to translation files. Each entry can also be an object with `translation`, `baseHref`, and `subPath` properties.           |

For the full list of `i18n` properties and their types, see [i18n options][GuideWorkspaceConfigI18n].
-->

프로젝트의 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일에서 `i18n` 프로젝트 옵션으로 지역을 정의하세요.

다음 하위 옵션은 원본 언어를 식별하고, 프로젝트에서 지원하는 번역의 위치를 컴파일러에 알려줍니다.

| 하위 옵션      | 설명                                                                                                                                  |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `sourceLocale` | 애플리케이션 소스 코드에서 사용하는 지역입니다(기본값은 `en-US`). `code`, `baseHref`, `subPath` 프로퍼티를 가진 객체일 수도 있습니다. |
| `locales`      | 지역 식별자와 번역 파일을 연결하는 맵입니다. 각 항목은 `translation`, `baseHref`, `subPath` 프로퍼티를 가진 객체일 수도 있습니다.     |

`i18n` 프로퍼티와 타입의 전체 목록은 [i18n 옵션][GuideWorkspaceConfigI18n]을 참고하세요.

<!--
### `angular.json` for `en-US` and `fr` example
-->

<a id="angularjson-for-en-us-and-fr-example"></a>

### `en-US`와 `fr`의 `angular.json` 예제

<!--
For example, the following excerpt of an [`angular.json`][GuideWorkspaceConfig] workspace build configuration file sets the source locale to `en-US` and provides the path to the French \(`fr`\) locale translation file.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="locale-config"/>
-->

예를 들어 다음 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 일부에서는 원본 지역을 `en-US`로 설정하고 프랑스어(`fr`) 지역 번역 파일의 경로를 지정합니다.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="locale-config"/>

<!--
## Generate application variants for each locale
-->

<a id="generate-application-variants-for-each-locale"></a>

## 지역별 애플리케이션 버전 생성하기

<!--
To use your locale definition in the build configuration, use the `"localize"` option in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file to tell the CLI which locales to generate for the build configuration.

- Set `"localize"` to `true` for all the locales previously defined in the build configuration.
- Set `"localize"` to an array of a subset of the previously defined locale identifiers to build only those locale versions.
- Set `"localize"` to `false` to disable localization and not generate any locale-specific versions.

HELPFUL: Ahead-of-time (AOT) compilation is required to localize component templates.

If you changed this setting, set `"aot"` to `true` in order to use AOT.

HELPFUL: Due to the deployment complexities of i18n and the need to minimize rebuild time, the development server only supports localizing a single locale at a time.
If you set the `"localize"` option to `true` or to an array of more than one locale, and use `ng serve`, the development server logs a warning and disables localization.
If you want to develop against a specific locale, set the `"localize"` option to a specific locale.
For example, for French \(`fr`\), specify `"localize": ["fr"]`.

The CLI loads and registers the locale data, places each generated version in a locale-specific directory to keep it separate from other locale versions, and puts the directories within the configured `outputPath` for the project.
For each application variant the `lang` attribute of the `html` element is set to the locale.
The CLI also adjusts the HTML base HREF for each version of the application by adding the locale to the configured `baseHref`.

Set the `"localize"` property as a shared configuration to effectively inherit for all the configurations.
Also, set the property to override other configurations.
-->

빌드 설정에서 정의한 지역을 사용하려면 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 `"localize"` 옵션으로 해당 빌드 설정에서 생성할 지역을 CLI에 알려주세요.

- 빌드 설정에 정의한 모든 지역을 사용하려면 `"localize"`를 `true`로 설정합니다.
- 정의한 지역 중 일부만 빌드하려면 해당 지역 식별자를 배열에 담아 `"localize"`에 지정합니다.
- 현지화를 비활성화하고 지역별 버전을 생성하지 않으려면 `"localize"`를 `false`로 설정합니다.

도움말: 컴포넌트 템플릿을 현지화하려면 AOT(ahead-of-time) 컴파일이 필요합니다.

이 설정을 변경한 적이 있다면 AOT를 사용할 수 있도록 `"aot"`를 `true`로 설정하세요.

도움말: i18n 배포의 복잡성과 재빌드 시간을 최소화해야 한다는 점을 고려해, 개발 서버는 한 번에 하나의 지역만 현지화할 수 있습니다.
`"localize"` 옵션을 `true` 또는 둘 이상의 지역을 담은 배열로 설정하고 `ng serve`를 실행하면 개발 서버가 경고를 출력하고 현지화를 비활성화합니다.
특정 지역을 대상으로 개발하려면 `"localize"` 옵션에 해당 지역을 지정하세요.
예를 들어 프랑스어(`fr`)의 경우 `"localize": ["fr"]`로 지정합니다.

CLI는 지역 데이터를 불러오고 등록한 후, 생성된 각 버전을 다른 지역 버전과 구분하기 위해 지역별 디렉터리에 배치합니다.
이 디렉터리들은 프로젝트에 설정된 `outputPath` 안에 생성됩니다.
각 애플리케이션 버전의 `html` 엘리먼트에서 `lang` 어트리뷰트는 해당 지역으로 설정됩니다.
CLI는 설정된 `baseHref`에 지역을 추가해 각 애플리케이션 버전의 HTML 기준 HREF도 조정합니다.

모든 설정에서 상속받을 수 있도록 `"localize"` 프로퍼티를 공통 설정에 지정하세요.
다른 설정을 재정의하도록 이 프로퍼티를 지정할 수도 있습니다.

<!--
### `angular.json` include all locales from build example
-->

<a id="angularjson-include-all-locales-from-build-example"></a>

### `angular.json`에서 모든 지역을 빌드에 포함하는 예제

<!--
The following example displays the `"localize"` option set to `true` in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file, so that all locales defined in the build configuration are built.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-localize-true"/>
-->

다음 예제는 빌드 설정에 정의한 모든 지역을 빌드하도록 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 `"localize"` 옵션을 `true`로 설정한 모습입니다.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-localize-true"/>

<!--
## Build from the command line
-->

<a id="build-from-the-command-line"></a>

## 명령줄에서 빌드하기

<!--
Also, use the `--localize` option with the [`ng build`][CliBuild] command and your existing `production` configuration.
The CLI builds all locales defined in the build configuration.
If you set the locales in build configuration, it is similar to when you set the `"localize"` option to `true`.

HELPFUL: For more information about how to set the locales, see [Generate application variants for each locale][GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale].

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="build-localize"/>
-->

기존 `production` 설정으로 [`ng build`][CliBuild] 명령을 실행할 때 `--localize` 옵션을 사용할 수도 있습니다.
CLI는 빌드 설정에 정의한 모든 지역을 빌드합니다.
빌드 설정에 지역을 지정했다면 `"localize"` 옵션을 `true`로 설정한 것과 같은 방식으로 동작합니다.

도움말: 지역 설정 방법에 대한 자세한 내용은 [지역별 애플리케이션 버전 생성하기][GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale]를 참고하세요.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="build-localize"/>

<!--
## Apply specific build options for just one locale
-->

<a id="apply-specific-build-options-for-just-one-locale"></a>

## 특정 지역에만 빌드 옵션 적용하기

<!--
To apply specific build options to only one locale, specify a single locale to create a custom locale-specific configuration.

IMPORTANT: Use the [Angular CLI][CliMain] development server \(`ng serve`\) with only a single locale.
-->

하나의 지역에만 특정 빌드 옵션을 적용하려면 해당 지역 하나를 지정해 지역 전용 커스텀 설정을 만드세요.

중요: [Angular CLI][CliMain] 개발 서버(`ng serve`)는 하나의 지역에만 사용하세요.

<!--
### build for French example
-->

<a id="build-for-french-example"></a>

### 프랑스어 빌드 예제

<!--
The following example displays a custom locale-specific configuration using a single locale.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-single-locale"/>

Pass this configuration to the `ng serve` or `ng build` commands.
The following code example displays how to serve the French language file.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="serve-french"/>

For production builds, use configuration composition to run both configurations.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="build-production-french"/>

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-production-french" />
-->

다음 예제는 하나의 지역을 사용하는 지역 전용 커스텀 설정을 보여줍니다.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-single-locale"/>

이 설정을 `ng serve`나 `ng build` 명령에 전달하세요.
다음 코드 예제는 프랑스어 파일을 제공하는 방법을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="serve-french"/>

프로덕션 빌드에서는 설정을 조합해 두 설정을 모두 적용하세요.

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" region="build-production-french"/>

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="build-production-french" />

<!--
## Report missing translations
-->

<a id="report-missing-translations"></a>

## 누락된 번역 보고하기

<!--
When a translation is missing, the build succeeds but generates a warning such as `Missing translation for message "{translation_text}"`.
To configure the level of warning that is generated by the Angular compiler, specify one of the following levels.

| Warning level | Details                                              | Output                                                 |
| :------------ | :--------------------------------------------------- | :----------------------------------------------------- |
| `error`       | Throw an error and the build fails                   | n/a                                                    |
| `ignore`      | Do nothing                                           | n/a                                                    |
| `warning`     | Displays the default warning in the console or shell | `Missing translation for message "{translation_text}"` |

Specify the warning level in the `options` section for the `build` target of your [`angular.json`][GuideWorkspaceConfig] workspace build configuration file.
-->

번역이 누락되면 빌드는 성공하지만 `Missing translation for message "{translation_text}"`와 같은 경고가 발생합니다.
Angular 컴파일러가 생성하는 경고 수준을 설정하려면 다음 수준 중 하나를 지정하세요.

| 경고 수준 | 설명                                   | 출력                                                   |
| :-------- | :------------------------------------- | :----------------------------------------------------- |
| `error`   | 에러를 발생시키고 빌드를 실패시킵니다. | 해당 없음                                              |
| `ignore`  | 아무 작업도 하지 않습니다.             | 해당 없음                                              |
| `warning` | 콘솔이나 셸에 기본 경고를 표시합니다.  | `Missing translation for message "{translation_text}"` |

[`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 `build` 타깃에 있는 `options` 섹션에서 경고 수준을 지정하세요.

<!--
### `angular.json` `error` warning example
-->

<a id="angularjson-error-warning-example"></a>

### `angular.json`의 `error` 경고 예제

<!--
The following example displays how to set the warning level to `error`.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="missing-translation-error" />

HELPFUL: When you compile your Angular project into an Angular application, the instances of the `i18n` attribute are replaced with instances of the [`$localize`][ApiLocalizeInitLocalize] tagged message string.
This means that your Angular application is translated after compilation.
This also means that you can create localized versions of your Angular application without re-compiling your entire Angular project for each locale.

When you translate your Angular application, the _translation transformation_ replaces and reorders the parts \(static strings and expressions\) of the template literal string with strings from a collection of translations.
For more information, see [`$localize`][ApiLocalizeInitLocalize].

TLDR: Compile once, then translate for each locale.
-->

다음 예제는 경고 수준을 `error`로 설정하는 방법을 보여줍니다.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="missing-translation-error" />

도움말: Angular 프로젝트를 Angular 애플리케이션으로 컴파일하면 각 `i18n` 어트리뷰트가 [`$localize`][ApiLocalizeInitLocalize] 태그가 붙은 메시지 문자열로 바뀝니다.
따라서 Angular 애플리케이션은 컴파일 후에 번역됩니다.
또한 지역마다 Angular 프로젝트 전체를 다시 컴파일하지 않고도 현지화된 Angular 애플리케이션 버전을 만들 수 있습니다.

Angular 애플리케이션을 번역할 때 _번역 변환_ 과정은 템플릿 리터럴 문자열의 구성 요소(정적 문자열과 표현식)를 번역 모음의 문자열로 교체하고 순서를 재배치합니다.
자세한 내용은 [`$localize`][ApiLocalizeInitLocalize]를 참고하세요.

요약: 한 번 컴파일한 다음 지역별로 번역합니다.

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/deploy" title="Deploy multiple locales"/>
</docs-pill-row>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API | Angular'
[CliMain]: cli 'CLI Overview and Command Reference | Angular'
[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideBuild]: tools/cli/build 'Building and serving Angular apps | Angular'
[GuideI18nCommonMergeApplySpecificBuildOptionsForJustOneLocale]: guide/i18n/merge#apply-specific-build-options-for-just-one-locale 'Apply specific build options for just one locale - Merge translations into the application | Angular'
[GuideI18nCommonMergeBuildFromTheCommandLine]: guide/i18n/merge#build-from-the-command-line 'Build from the command line - Merge translations into the application | Angular'
[GuideI18nCommonMergeDefineLocalesInTheBuildConfiguration]: guide/i18n/merge#define-locales-in-the-build-configuration 'Define locales in the build configuration - Merge translations into the application | Angular'
[GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale]: guide/i18n/merge#generate-application-variants-for-each-locale 'Generate application variants for each locale - Merge translations into the application | Angular'
[GuideI18nCommonTranslationFilesChangeTheSourceLanguageFileFormat]: guide/i18n/translation-files#change-the-source-language-file-format 'Change the source language file format - Work with translation files | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular workspace configuration | Angular'
[GuideWorkspaceConfigI18n]: reference/configs/workspace-config#i18n-options 'i18n options - Angular workspace configuration | Angular'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/deploy" title="여러 지역 배포하기"/>
</docs-pill-row>

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API | Angular'
[CliMain]: cli 'CLI 개요와 명령어 참조 | Angular'
[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideBuild]: tools/cli/build 'Angular 앱 빌드 및 실행하기 | Angular'
[GuideI18nCommonMergeApplySpecificBuildOptionsForJustOneLocale]: guide/i18n/merge#apply-specific-build-options-for-just-one-locale '특정 지역에만 빌드 옵션 적용하기 - 애플리케이션에 번역 병합하기 | Angular'
[GuideI18nCommonMergeBuildFromTheCommandLine]: guide/i18n/merge#build-from-the-command-line '명령줄에서 빌드하기 - 애플리케이션에 번역 병합하기 | Angular'
[GuideI18nCommonMergeDefineLocalesInTheBuildConfiguration]: guide/i18n/merge#define-locales-in-the-build-configuration '빌드 설정에 지역 정의하기 - 애플리케이션에 번역 병합하기 | Angular'
[GuideI18nCommonMergeGenerateApplicationVariantsForEachLocale]: guide/i18n/merge#generate-application-variants-for-each-locale '지역별 애플리케이션 버전 생성하기 - 애플리케이션에 번역 병합하기 | Angular'
[GuideI18nCommonTranslationFilesChangeTheSourceLanguageFileFormat]: guide/i18n/translation-files#change-the-source-language-file-format '원본 언어 파일 형식 변경하기 - 번역 파일 다루기 | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular 작업 공간 설정 | Angular'
[GuideWorkspaceConfigI18n]: reference/configs/workspace-config#i18n-options 'i18n 옵션 - Angular 작업 공간 설정 | Angular'
