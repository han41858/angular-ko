<!--
# Angular workspace configuration
-->

<a id="angular-workspace-configuration"></a>

# Angular 워크스페이스 설정

<!--
The `angular.json` file at the root level of an Angular workspace provides workspace-wide and project-specific configuration defaults. These are used for build and development tools provided by the Angular CLI.
Path values given in the configuration are relative to the root workspace directory.
-->

Angular 워크스페이스 루트에 있는 `angular.json` 파일은 워크스페이스 전체와 개별 프로젝트의 기본 설정을 제공합니다. 이 설정은 Angular CLI가 제공하는 빌드 및 개발 도구에서 사용합니다.
설정에 지정하는 경로 값은 워크스페이스 루트 디렉터리를 기준으로 하는 상대 경로입니다.

<!--
## General JSON structure
-->

<a id="general-json-structure"></a>

## JSON의 전체 구조

<!--
At the top-level of `angular.json`, a few properties configure the workspace and a `projects` section contains the remaining per-project configuration options.
You can override Angular CLI defaults set at the workspace level through defaults set at the project level.
You can also override defaults set at the project level using the command line.
-->

`angular.json`의 최상위에는 워크스페이스를 설정하는 몇 가지 프로퍼티가 있고, `projects` 섹션에는 나머지 프로젝트별 설정 옵션이 있습니다.
프로젝트 수준의 기본값으로 워크스페이스 수준에서 설정한 Angular CLI 기본값을 덮어쓸 수 있습니다.
명령줄을 사용하여 프로젝트 수준의 기본값도 덮어쓸 수 있습니다.

<!--
The following properties, at the top-level of the file, configure the workspace.
-->

파일의 최상위에 있는 다음 프로퍼티로 워크스페이스를 설정합니다.

<!--
| Properties       | Details                                                                                                                                                                                        |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`        | The configuration-file version.                                                                                                                                                                |
| `newProjectRoot` | Path where new projects are created through tools like `ng generate application` or `ng generate library`. Path can be absolute or relative to the workspace directory. Defaults to `projects` |
| `cli`            | A set of options that customize the [Angular CLI](tools/cli). See [Angular CLI configuration options](#angular-cli-configuration-options) below.                                               |
| `schematics`     | A set of [schematics](tools/cli/schematics) that customize the `ng generate` sub-command option defaults for this workspace. See [schematics](#schematics) below.                              |
| `projects`       | Contains a subsection for each application or library in the workspace, with project-specific configuration options.                                                                           |
-->

| 프로퍼티         | 설명                                                                                                                                                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`        | 설정 파일의 버전입니다.                                                                                                                                                                            |
| `newProjectRoot` | `ng generate application`이나 `ng generate library` 같은 도구로 새 프로젝트를 생성할 경로입니다. 절대 경로나 워크스페이스 디렉터리 기준 상대 경로를 사용할 수 있습니다. 기본값은 `projects`입니다. |
| `cli`            | [Angular CLI](tools/cli)를 사용자 정의하는 옵션 집합입니다. 아래 [Angular CLI 설정 옵션](#angular-cli-configuration-options)을 참고하세요.                                                         |
| `schematics`     | 이 워크스페이스의 `ng generate` 하위 명령어 옵션 기본값을 사용자 정의하는 [스키매틱](tools/cli/schematics) 집합입니다. 아래 [스키매틱](#schematics)을 참고하세요.                                  |
| `projects`       | 워크스페이스의 각 애플리케이션이나 라이브러리에 대한 하위 섹션을 포함하며, 프로젝트별 설정 옵션을 지정합니다.                                                                                      |

<!--
The initial application that you create with `ng new app-name` is listed under "projects":
-->

`ng new app-name`으로 생성한 초기 애플리케이션은 "projects" 아래에 나열됩니다.

<!--
When you create a library project with `ng generate library`, the library project is also added to the `projects` section.
-->

`ng generate library`로 라이브러리 프로젝트를 생성하면 해당 프로젝트도 `projects` 섹션에 추가됩니다.

<!--
HELPFUL: The `projects` section of the configuration file does not correspond exactly to the workspace file structure.
-->

HELPFUL: 설정 파일의 `projects` 섹션은 워크스페이스의 파일 구조와 정확히 일치하지 않습니다.

<!-- markdownlint-disable-next-line MD032 -->

<!--
- The initial application created by `ng new` is at the top level of the workspace file structure.
- Other applications and libraries are under the `projects` directory by default.
-->

- `ng new`로 생성한 초기 애플리케이션은 워크스페이스 파일 구조의 최상위에 있습니다.
- 다른 애플리케이션과 라이브러리는 기본적으로 `projects` 디렉터리 아래에 있습니다.

<!--
For more information, see [Workspace and project file structure](reference/configs/file-structure).
-->

자세한 내용은 [워크스페이스와 프로젝트 파일 구조](reference/configs/file-structure)를 참고하세요.

<!--
## Angular CLI configuration options
-->

<a id="angular-cli-configuration-options"></a>

## Angular CLI 설정 옵션

<!--
The following properties are a set of options that customize the Angular CLI.
-->

다음 프로퍼티는 Angular CLI를 사용자 정의하는 옵션입니다.

<!--
| Property               | Details                                                                                                                                                                    | Value type                            | Default value |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------ |
| `analytics`            | Share anonymous usage data with the Angular Team. A boolean value indicates whether or not to share data, while a UUID string shares data using a pseudonymous identifier. | `boolean` \| `string`                 | `false`       |
| `cache`                | Control [persistent disk cache](cli/cache) used by [Angular CLI Builders](tools/cli/cli-builder).                                                                          | [Cache options](#cache-options)       | `{}`          |
| `schematicCollections` | List schematics collections to use in `ng generate`.                                                                                                                       | `string[]`                            | `[]`          |
| `packageManager`       | The preferred package manager tool to use.                                                                                                                                 | `npm` \| `pnpm` \| `yarn` \| `bun`    | `npm`         |
| `warnings`             | Control Angular CLI specific console warnings.                                                                                                                             | [Warnings options](#warnings-options) | `{}`          |
-->

| 프로퍼티               | 설명                                                                                                                                                    | 값의 타입                          | 기본값  |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------- | :------ |
| `analytics`            | 익명 사용 데이터를 Angular 팀과 공유합니다. 불리언 값은 데이터 공유 여부를 나타내며, UUID 문자열을 지정하면 가명 식별자를 사용하여 데이터를 공유합니다. | `boolean` \| `string`              | `false` |
| `cache`                | [Angular CLI 빌더](tools/cli/cli-builder)가 사용하는 [영구 디스크 캐시](cli/cache)를 제어합니다.                                                        | [캐시 옵션](#cache-options)        | `{}`    |
| `schematicCollections` | `ng generate`에서 사용할 스키매틱 컬렉션 목록입니다.                                                                                                    | `string[]`                         | `[]`    |
| `packageManager`       | 사용할 기본 패키지 관리자 도구입니다.                                                                                                                   | `npm` \| `pnpm` \| `yarn` \| `bun` | `npm`   |
| `warnings`             | Angular CLI 전용 콘솔 경고를 제어합니다.                                                                                                                | [경고 옵션](#warnings-options)     | `{}`    |

<!--
### Cache options
-->

<a id="cache-options"></a>

### 캐시 옵션

<!--
| Property      | Details                                                                                                                                                                                                                                       | Value type               | Default value    |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :--------------- |
| `enabled`     | Configure whether disk caching is enabled for builds.                                                                                                                                                                                         | `boolean`                | `true`           |
| `environment` | Configure in which environment disk cache is enabled.<br><br>_ `ci` enables caching only in continuous integration (CI) environments.<br>_ `local` enables caching only _outside_ of CI environments.<br>\* `all` enables caching everywhere. | `local` \| `ci` \| `all` | `local`          |
| `path`        | The directory used to stored cache results.                                                                                                                                                                                                   | `string`                 | `.angular/cache` |
-->

| 프로퍼티      | 설명                                                                                                                                                                                                    | 값의 타입                | 기본값           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------- | :--------------- |
| `enabled`     | 빌드에 디스크 캐시를 사용할지 설정합니다.                                                                                                                                                               | `boolean`                | `true`           |
| `environment` | 디스크 캐시를 사용할 환경을 설정합니다.<br><br>- `ci`: 지속적 통합(CI) 환경에서만 캐시를 사용합니다.<br>- `local`: CI 환경 *외부*에서만 캐시를 사용합니다.<br>- `all`: 모든 환경에서 캐시를 사용합니다. | `local` \| `ci` \| `all` | `local`          |
| `path`        | 캐시 결과를 저장할 디렉터리입니다.                                                                                                                                                                      | `string`                 | `.angular/cache` |

<!--
### Warnings options
-->

<a id="warnings-options"></a>

### 경고 옵션

<!--
| Property          | Details                                                                         | Value type | Default value |
| :---------------- | :------------------------------------------------------------------------------ | :--------- | :------------ |
| `versionMismatch` | Show a warning when the global Angular CLI version is newer than the local one. | `boolean`  | `true`        |
-->

| 프로퍼티          | 설명                                                              | 값의 타입 | 기본값 |
| :---------------- | :---------------------------------------------------------------- | :-------- | :----- |
| `versionMismatch` | 전역 Angular CLI 버전이 로컬 버전보다 최신이면 경고를 표시합니다. | `boolean` | `true` |

<!--
## Project configuration options
-->

<a id="project-configuration-options"></a>

## 프로젝트 설정 옵션

<!--
The following top-level configuration properties are available for each project, under `projects['project-name']`.
-->

각 프로젝트의 `projects['project-name']` 아래에서 다음 최상위 설정 프로퍼티를 사용할 수 있습니다.

<!--
| Property      | Details                                                                                                                                                                                                               | Value type                                                      | Default value   |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------- |
| `root`        | The root directory for this project's files, relative to the workspace directory. Empty for the initial application, which resides at the top level of the workspace.                                                 | `string`                                                        | None (required) |
| `projectType` | One of "application" or "library" An application can run independently in a browser, while a library cannot.                                                                                                          | `application` \| `library`                                      | None (required) |
| `sourceRoot`  | The root directory for this project's source files.                                                                                                                                                                   | `string`                                                        | `''`            |
| `prefix`      | A string that Angular prepends to selectors when generating new components, directives, and pipes using `ng generate`. Can be customized to identify an application or feature area.                                  | `string`                                                        | `'app'`         |
| `i18n`        | Internationalization options for the project. Defines the source locale and additional locales to build. See [Define locales in the build configuration](guide/i18n/merge#define-locales-in-the-build-configuration). | See [i18n options](#i18n-options)                               | `{}`            |
| `schematics`  | A set of schematics that customize the `ng generate` sub-command option defaults for this project. See the [Generation schematics](#schematics) section.                                                              | See [schematics](#schematics)                                   | `{}`            |
| `architect`   | Configuration defaults for Architect builder targets for this project.                                                                                                                                                | See [Configuring builder targets](#configuring-builder-targets) | `{}`            |
-->

| 프로퍼티      | 설명                                                                                                                                                                               | 값의 타입                                               | 기본값     |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------- |
| `root`        | 워크스페이스 디렉터리를 기준으로 한 프로젝트 파일의 루트 디렉터리입니다. 워크스페이스 최상위에 있는 초기 애플리케이션에서는 빈 값입니다.                                           | `string`                                                | 없음(필수) |
| `projectType` | `application` 또는 `library` 중 하나입니다. 애플리케이션은 브라우저에서 독립적으로 실행할 수 있지만 라이브러리는 그럴 수 없습니다.                                                 | `application` \| `library`                              | 없음(필수) |
| `sourceRoot`  | 프로젝트 소스 파일의 루트 디렉터리입니다.                                                                                                                                          | `string`                                                | `''`       |
| `prefix`      | Angular가 `ng generate`로 새 컴포넌트, 디렉티브, 파이프를 생성할 때 셀렉터 앞에 붙이는 문자열입니다. 애플리케이션이나 기능 영역을 식별하도록 사용자 정의할 수 있습니다.            | `string`                                                | `'app'`    |
| `i18n`        | 프로젝트의 국제화 옵션입니다. 원본 지역과 추가로 빌드할 지역을 정의합니다. [빌드 설정에서 지역 정의하기](guide/i18n/merge#define-locales-in-the-build-configuration)를 참고하세요. | [i18n 옵션](#i18n-options) 참고                         | `{}`       |
| `schematics`  | 이 프로젝트의 `ng generate` 하위 명령어 옵션 기본값을 사용자 정의하는 스키매틱 집합입니다. [스키매틱](#schematics) 섹션을 참고하세요.                                              | [스키매틱](#schematics) 참고                            | `{}`       |
| `architect`   | 프로젝트의 Architect 빌더 대상에 대한 기본 설정입니다.                                                                                                                             | [빌더 대상 설정하기](#configuring-builder-targets) 참고 | `{}`       |

<!--
## i18n options
-->

<a id="i18n-options"></a>

## i18n 옵션

<!--
Use the `i18n` project option to define the application's source locale and any additional locales to build.
-->

`i18n` 프로젝트 옵션으로 애플리케이션의 원본 지역과 추가로 빌드할 지역을 정의하세요.

<!--
| Property       | Details                                                                                                                              | Value type                                              | Default value |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------ |
| `sourceLocale` | The locale used in the application source code. Can be a locale identifier string or a [configuration object](#sourcelocale-object). | `string` \| [sourceLocale object](#sourcelocale-object) | `"en-US"`     |
| `locales`      | A map of locale identifiers to translation files or [locale configuration objects](#locale-object).                                  | `object`                                                | `{}`          |
-->

| 프로퍼티       | 설명                                                                                                                           | 값의 타입                                             | 기본값    |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :-------- |
| `sourceLocale` | 애플리케이션 소스 코드에서 사용하는 지역입니다. 지역 식별자 문자열이나 [설정 객체](#sourcelocale-object)를 사용할 수 있습니다. | `string` \| [sourceLocale 객체](#sourcelocale-object) | `"en-US"` |
| `locales`      | 지역 식별자를 번역 파일 또는 [지역 설정 객체](#locale-object)에 연결하는 맵입니다.                                             | `object`                                              | `{}`      |

<!--
### `sourceLocale` object
-->

<a id="sourcelocale-object"></a>

### `sourceLocale` 객체

<!--
Pass an object instead of a string to customize the output directory or base HREF for the source locale:
-->

원본 지역의 출력 디렉터리나 기본 HREF를 사용자 정의하려면 문자열 대신 객체를 전달하세요.

<!--
| Property   | Details                                                                                                                                       | Value type | Default value |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `code`     | The source locale identifier.                                                                                                                 | `string`   | `"en-US"`     |
| `baseHref` | Overrides the HTML `<base href>` for this locale. The output directory name stays as the locale code. Cannot be used together with `subPath`. | `string`   | Locale code   |
| `subPath`  | Sets both the output directory name and the HTML `<base href>` for this locale. Cannot be used together with `baseHref`.                      | `string`   | Locale code   |
-->

| 프로퍼티   | 설명                                                                                                                         | 값의 타입 | 기본값    |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------- | :-------- |
| `code`     | 원본 지역의 식별자입니다.                                                                                                    | `string`  | `"en-US"` |
| `baseHref` | 이 지역의 HTML `<base href>`를 덮어씁니다. 출력 디렉터리 이름은 지역 코드로 유지됩니다. `subPath`와 함께 사용할 수 없습니다. | `string`  | 지역 코드 |
| `subPath`  | 이 지역의 출력 디렉터리 이름과 HTML `<base href>`를 함께 설정합니다. `baseHref`와 함께 사용할 수 없습니다.                   | `string`  | 지역 코드 |

<!--
### Locale object
-->

<a id="locale-object"></a>

### 지역 객체

<!--
Each `locales` entry can be a path string, an array of paths, or an object:
-->

`locales`의 각 항목은 경로 문자열, 경로 배열 또는 객체일 수 있습니다.

<!--
| Property      | Details                                                                                                                                             | Value type             | Default value |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------ |
| `translation` | Path or paths to the translation file(s) for this locale.                                                                                           | `string` \| `string[]` |               |
| `baseHref`    | Overrides the HTML `<base href>` for this locale. The output directory name stays as the locale identifier. Cannot be used together with `subPath`. | `string`               | Locale code   |
| `subPath`     | Sets both the output directory name and the HTML `<base href>` for this locale. Cannot be used together with `baseHref`.                            | `string`               | Locale code   |
-->

| 프로퍼티      | 설명                                                                                                                           | 값의 타입              | 기본값    |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :-------- |
| `translation` | 이 지역의 번역 파일 경로 하나 또는 여러 개입니다.                                                                              | `string` \| `string[]` |           |
| `baseHref`    | 이 지역의 HTML `<base href>`를 덮어씁니다. 출력 디렉터리 이름은 지역 식별자로 유지됩니다. `subPath`와 함께 사용할 수 없습니다. | `string`               | 지역 코드 |
| `subPath`     | 이 지역의 출력 디렉터리 이름과 HTML `<base href>`를 함께 설정합니다. `baseHref`와 함께 사용할 수 없습니다.                     | `string`               | 지역 코드 |

<!--
HELPFUL: Use `subPath` rather than `baseHref` when you also need to rename the output directory — for example, to output to `de-DE/` instead of `de/`.
-->

HELPFUL: 출력 디렉터리 이름도 바꿔야 한다면 `baseHref` 대신 `subPath`를 사용하세요. 예를 들어 `de/` 대신 `de-DE/`로 출력할 때 사용할 수 있습니다.

<!--
## Schematics
-->

<a id="schematics"></a>

## 스키매틱

<!--
[Angular schematics](tools/cli/schematics) are instructions for modifying a project by adding new files or modifying existing files.
These can be configured by mapping the schematic name to a set of default options.
-->

[Angular 스키매틱](tools/cli/schematics)은 새 파일을 추가하거나 기존 파일을 수정하여 프로젝트를 변경하는 지침입니다.
스키매틱 이름을 기본 옵션 집합에 연결하여 설정할 수 있습니다.

<!--
The "name" of a schematic is in the format: `<schematic-package>:<schematic-name>`.
Schematics for the default Angular CLI `ng generate` sub-commands are collected in the package [`@schematics/angular`](https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/application/schema.json).
For example, the schematic for generating a component with `ng generate component` is `@schematics/angular:component`.
-->

스키매틱의 "이름"은 `<schematic-package>:<schematic-name>` 형식입니다.
기본 Angular CLI `ng generate` 하위 명령어의 스키매틱은 [`@schematics/angular`](https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/application/schema.json) 패키지에 모여 있습니다.
예를 들어 `ng generate component`로 컴포넌트를 생성하는 스키매틱은 `@schematics/angular:component`입니다.

<!--
The fields given in the schematic's schema correspond to the allowed command-line argument values and defaults for the Angular CLI sub-command options.
You can update your workspace schema file to set a different default for a sub-command option. For example, to disable `standalone` in `ng generate component` by default:
-->

스키매틱 스키마의 필드는 Angular CLI 하위 명령어 옵션에 허용되는 명령줄 인수 값과 기본값에 대응합니다.
워크스페이스 스키마 파일을 업데이트하여 하위 명령어 옵션의 기본값을 변경할 수 있습니다. 예를 들어 `ng generate component`에서 `standalone`을 기본적으로 비활성화하려면 다음과 같이 설정합니다.

```json
{
  "projects": {
    "my-app": {
      "schematics": {
        "@schematics/angular:component": {
          "standalone": false
        }
      }
    }
  }
}
```

<!--
## Configuring CLI builders
-->

<a id="configuring-cli-builders"></a>

## CLI 빌더 설정하기

<!--
Architect is the tool that the Angular CLI uses to perform complex tasks, such as compilation and test running.
Architect is a shell that runs a specified builder to perform a given task, according to a target configuration.
You can define and configure new builders and targets to extend the Angular CLI.
See [Angular CLI Builders](tools/cli/cli-builder).
-->

Architect는 Angular CLI가 컴파일이나 테스트 실행과 같은 복잡한 작업을 수행하는 데 사용하는 도구입니다.
Architect는 대상 설정에 따라 지정한 빌더를 실행하여 작업을 수행하는 셸입니다.
새로운 빌더와 대상을 정의하고 설정하여 Angular CLI를 확장할 수 있습니다.
[Angular CLI 빌더](tools/cli/cli-builder)를 참고하세요.

<!--
### Default Architect builders and targets
-->

<a id="default-architect-builders-and-targets"></a>

### 기본 Architect 빌더와 대상

<!--
Angular defines default builders for use with specific commands, or with the general `ng run` command.
The JSON schemas that define the options and defaults for each of these builders are collected in the [`@angular/build`](https://github.com/angular/angular-cli/blob/main/packages/angular/build/builders.json) package.
The schemas configure options for the following builders.
-->

Angular는 특정 명령어나 범용 `ng run` 명령어에서 사용할 기본 빌더를 정의합니다.
각 빌더의 옵션과 기본값을 정의하는 JSON 스키마는 [`@angular/build`](https://github.com/angular/angular-cli/blob/main/packages/angular/build/builders.json) 패키지에 모여 있습니다.
이 스키마로 다음 빌더의 옵션을 설정합니다.

<!--
### Configuring builder targets
-->

<a id="configuring-builder-targets"></a>

### 빌더 대상 설정하기

<!--
The `architect` section of `angular.json` contains a set of Architect targets.
Many of the targets correspond to the Angular CLI commands that run them.
Other targets can be executed using the `ng run` command, and you can define your own targets.
-->

`angular.json`의 `architect` 섹션에는 Architect 대상 집합이 있습니다.
대부분의 대상은 해당 대상을 실행하는 Angular CLI 명령어에 대응합니다.
다른 대상은 `ng run` 명령어로 실행할 수 있으며, 직접 대상을 정의할 수도 있습니다.

<!--
Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs.
Each target also has an `options` section that configures default options for the target, and a `configurations` section that names and specifies alternative configurations for the target.
See the example in [Build target](#build-target) below.
-->

각 대상 객체는 해당 대상의 `builder`를 지정합니다. 이는 Architect가 실행할 도구의 npm 패키지입니다.
각 대상에는 기본 옵션을 설정하는 `options` 섹션과 이름이 있는 대체 설정을 지정하는 `configurations` 섹션도 있습니다.
아래 [빌드 대상](#build-target)의 예제를 참고하세요.

<!--
| Property       | Details                                                                                                                                                                                              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build`        | Configures defaults for options of the `ng build` command. See the [Build target](#build-target) section for more information.                                                                       |
| `serve`        | Overrides build defaults and supplies extra serve defaults for the `ng serve` command. Besides the options available for the `ng build` command, it adds options related to serving the application. |
| `e2e`          | Overrides build defaults for building end-to-end testing applications using the `ng e2e` command.                                                                                                    |
| `test`         | Overrides build defaults for test builds and supplies extra test-running defaults for the `ng test` command.                                                                                         |
| `lint`         | Configures defaults for options of the `ng lint` command, which performs static code analysis on project source files.                                                                               |
| `extract-i18n` | Configures defaults for options of the `ng extract-i18n` command, which extracts localized message strings from source code and outputs translation files for internationalization.                  |
-->

| 프로퍼티       | 설명                                                                                                                                                       |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build`        | `ng build` 명령어 옵션의 기본값을 설정합니다. 자세한 내용은 [빌드 대상](#build-target) 섹션을 참고하세요.                                                  |
| `serve`        | 빌드 기본값을 덮어쓰고 `ng serve` 명령어의 추가 개발 서버 기본값을 지정합니다. `ng build` 명령어의 옵션 외에 애플리케이션 제공과 관련된 옵션을 추가합니다. |
| `e2e`          | `ng e2e` 명령어로 엔드투엔드 테스트 애플리케이션을 빌드할 때의 빌드 기본값을 덮어씁니다.                                                                   |
| `test`         | 테스트 빌드의 기본값을 덮어쓰고 `ng test` 명령어의 추가 테스트 실행 기본값을 지정합니다.                                                                   |
| `lint`         | 프로젝트 소스 파일의 정적 코드 분석을 수행하는 `ng lint` 명령어 옵션의 기본값을 설정합니다.                                                                |
| `extract-i18n` | 소스 코드에서 지역화할 메시지 문자열을 추출하고 국제화를 위한 번역 파일을 출력하는 `ng extract-i18n` 명령어 옵션의 기본값을 설정합니다.                    |

<!--
HELPFUL: All options in the configuration file must use `camelCase`, rather than `dash-case` as used on the command line.
-->

HELPFUL: 설정 파일의 모든 옵션은 명령줄에서 사용하는 `dash-case` 대신 `camelCase`로 작성해야 합니다.

<!--
## Build target
-->

<a id="build-target"></a>

## 빌드 대상

<!--
Each target under `architect` has the following properties:
-->

`architect` 아래의 각 대상에는 다음 프로퍼티가 있습니다.

<!--
| Property         | Details                                                                                                                                                                                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`        | The CLI builder used to create this target in the form of `<package-name>:<builder-name>`.                                                                                                                                                                    |
| `options`        | Build target default options.                                                                                                                                                                                                                                 |
| `configurations` | Alternative configurations for executing the target. Each configuration sets the default options for that intended environment, overriding the associated value under `options`. See [Alternate build configurations](#alternate-build-configurations) below. |
-->

| 프로퍼티         | 설명                                                                                                                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`        | 이 대상을 생성할 CLI 빌더입니다. `<package-name>:<builder-name>` 형식으로 지정합니다.                                                                                                          |
| `options`        | 빌드 대상의 기본 옵션입니다.                                                                                                                                                                   |
| `configurations` | 대상을 실행할 때 사용할 대체 설정입니다. 각 설정은 해당 환경의 기본 옵션을 지정하고 `options`의 대응하는 값을 덮어씁니다. 아래 [대체 빌드 설정](#alternate-build-configurations)을 참고하세요. |

<!--
For example, to configure a build with optimizations disabled:
-->

예를 들어 최적화를 비활성화한 빌드를 설정하려면 다음과 같이 작성합니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "optimization": false
          }
        }
      }
    }
  }
}
```

<!--
### Alternate build configurations
-->

<a id="alternate-build-configurations"></a>

### 대체 빌드 설정

<!--
Angular CLI comes with two build configurations: `production` and `development`.
By default, the `ng build` command uses the `production` configuration, which applies several build optimizations, including:
-->

Angular CLI는 `production`과 `development`라는 두 가지 빌드 설정을 제공합니다.
기본적으로 `ng build` 명령어는 `production` 설정을 사용하며, 다음과 같은 빌드 최적화를 적용합니다.

<!--
- Bundling files
- Minimizing excess whitespace
- Removing comments and dead code
- Minifying code to use short, mangled names
-->

- 파일 번들링
- 불필요한 공백 최소화
- 주석 및 사용하지 않는 코드 제거
- 식별자를 짧은 이름으로 바꾸는 코드 압축

<!--
You can define and name extra alternate configurations (such as `staging`, for instance) appropriate to your development process.
You can select an alternate configuration by passing its name to the `--configuration` command line flag.
-->

개발 과정에 맞게 `staging` 같은 대체 설정을 추가로 정의하고 이름을 붙일 수 있습니다.
명령줄의 `--configuration` 플래그에 이름을 전달하면 대체 설정을 선택할 수 있습니다.

<!--
For example, to configure a build where optimization is enabled only for production builds (`ng build --configuration production`):
-->

예를 들어 프로덕션 빌드(`ng build --configuration production`)에서만 최적화를 활성화하려면 다음과 같이 설정합니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "optimization": false
          },
          "configurations": {
            "production": {
              "optimization": true
            }
          }
        }
      }
    }
  }
}
```

<!--
You can also pass in more than one configuration name as a comma-separated list.
For example, to apply both `staging` and `french` build configurations, use the command `ng build --configuration staging,french`.
In this case, the command parses the named configurations from left to right.
If multiple configurations change the same setting, the last-set value is the final one.
In this example, if both `staging` and `french` configurations set the output path, the value in `french` would get used.
-->

쉼표로 구분한 목록으로 둘 이상의 설정 이름을 전달할 수도 있습니다.
예를 들어 `staging`과 `french` 빌드 설정을 모두 적용하려면 `ng build --configuration staging,french` 명령어를 사용합니다.
이 경우 명령어는 지정한 설정을 왼쪽에서 오른쪽 순서로 해석합니다.
여러 설정이 같은 항목을 변경하면 마지막으로 설정한 값이 최종값이 됩니다.
이 예제에서 `staging`과 `french`가 모두 출력 경로를 지정한다면 `french`의 값을 사용합니다.

<!--
### Extra build and test options
-->

<a id="extra-build-and-test-options"></a>

### 추가 빌드 및 테스트 옵션

<!--
The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), and [`ng test`](cli/test) commands.
For details of those options and their possible values, see the [Angular CLI Reference](cli).
-->

기본 빌드나 특정 대상을 위한 빌드에서 설정할 수 있는 옵션은 일반적으로 [`ng build`](cli/build)와 [`ng test`](cli/test) 명령어의 옵션에 대응합니다.
각 옵션과 사용 가능한 값의 자세한 내용은 [Angular CLI 레퍼런스](cli)를 참고하세요.

<!--
| Options properties         | Details                                                                                                                                                                                                                                                                  |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets`                   | An object containing paths to static assets to serve with the application. The default paths point to the project's `public` directory. See more in the [Assets configuration](#assets-configuration) section.                                                           |
| `styles`                   | An array of CSS files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors. See more in the [Styles and scripts configuration](#styles-and-scripts-configuration) section.                                      |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors. See more in the [Styles and scripts configuration](#styles-and-scripts-configuration) section.                                                                                                   |
| `inlineStyleLanguage`      | The stylesheet language to use for the application's inline component styles. Accepts `css`, `less`, `sass`, or `scss`, and defaults to `css`.                                                                                                                           |
| `scripts`                  | An object containing JavaScript files to add to the application. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`. See more in the [Styles and scripts configuration](#styles-and-scripts-configuration) section.         |
| `budgets`                  | Default size-budget type and thresholds for all or parts of your application. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](tools/cli/build#configuring-size-budgets). |
| `fileReplacements`         | An object containing files and their compile-time replacements. See more in [Configure target-specific file replacements](tools/cli/environments#configure-environment-specific-defaults).                                                                               |
| `index`                    | A base HTML document which loads the application. See more in [Index configuration](#index-configuration).                                                                                                                                                               |
| `security`                 | An object containing the key `autoCsp` that can be set to `true` or `false`                                                                                                                                                                                              |
-->

| 옵션 프로퍼티              | 설명                                                                                                                                                                                                                                                 |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets`                   | 애플리케이션과 함께 제공할 정적 리소스의 경로가 포함된 객체입니다. 기본 경로는 프로젝트의 `public` 디렉터리를 가리킵니다. 자세한 내용은 [정적 리소스 설정](#assets-configuration) 섹션을 참고하세요.                                                 |
| `styles`                   | 프로젝트의 전역 컨텍스트에 추가할 CSS 파일 배열입니다. Angular CLI는 CSS 임포트와 주요 CSS 전처리기를 모두 지원합니다. 자세한 내용은 [스타일 및 스크립트 설정](#styles-and-scripts-configuration) 섹션을 참고하세요.                                 |
| `stylePreprocessorOptions` | 스타일 전처리기에 전달할 옵션과 값의 쌍이 포함된 객체입니다. 자세한 내용은 [스타일 및 스크립트 설정](#styles-and-scripts-configuration) 섹션을 참고하세요.                                                                                           |
| `inlineStyleLanguage`      | 애플리케이션의 컴포넌트 인라인 스타일에 사용할 스타일시트 언어입니다. `css`, `less`, `sass`, `scss`를 사용할 수 있으며 기본값은 `css`입니다.                                                                                                         |
| `scripts`                  | 애플리케이션에 추가할 JavaScript 파일이 포함된 객체입니다. 스크립트는 `index.html`의 `<script>` 태그에 추가한 것과 동일하게 로드됩니다. 자세한 내용은 [스타일 및 스크립트 설정](#styles-and-scripts-configuration) 섹션을 참고하세요.                |
| `budgets`                  | 애플리케이션 전체 또는 일부에 대한 기본 크기 예산 유형과 임계값입니다. 출력 크기가 임계값에 도달하거나 초과할 때 경고 또는 오류를 보고하도록 빌더를 설정할 수 있습니다. [크기 예산 설정하기](tools/cli/build#configuring-size-budgets)를 참고하세요. |
| `fileReplacements`         | 파일과 컴파일 시점에 이를 대체할 파일이 포함된 객체입니다. 자세한 내용은 [대상별 파일 대체 설정하기](tools/cli/environments#configure-environment-specific-defaults)를 참고하세요.                                                                   |
| `index`                    | 애플리케이션을 로드하는 기본 HTML 문서입니다. 자세한 내용은 [인덱스 설정](#index-configuration)을 참고하세요.                                                                                                                                        |
| `security`                 | `true` 또는 `false`로 설정할 수 있는 `autoCsp` 키를 포함하는 객체입니다.                                                                                                                                                                             |

<!--
### Extra serve options
-->

<a id="extra-serve-options"></a>

### 추가 개발 서버 옵션

<!--
The dev-server comes with its own set of options that generaly correspond to the options available for the [`ng serve`](cli/serve) command.
-->

개발 서버는 자체 옵션을 제공하며, 일반적으로 [`ng serve`](cli/serve) 명령어에서 사용할 수 있는 옵션에 대응합니다.

<!--
| Options properties | Details                                                                                                                                                                                                                   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `allowedHosts`     | An array of host that the development server will respond to. This option sets the Vite option of the same name. For further details [see the vite docs](https://vite.dev/config/server-options.html#server-allowedhosts) |
-->

| 옵션 프로퍼티  | 설명                                                                                                                                                                                           |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedHosts` | 개발 서버가 응답할 호스트의 배열입니다. 이 옵션은 같은 이름의 Vite 옵션을 설정합니다. 자세한 내용은 [Vite 문서](https://vite.dev/config/server-options.html#server-allowedhosts)를 참고하세요. |

<!--
## Complex configuration values
-->

<a id="complex-configuration-values"></a>

## 복합 설정값

<!--
The `assets`, `index`, `outputPath`, `styles`, and `scripts` options can have either simple path string values, or object values with specific fields.
The `sourceMap` and `optimization` options can be set to a simple boolean value. They can also be given a complex value using the configuration file.
-->

`assets`, `index`, `outputPath`, `styles`, `scripts` 옵션은 단순한 경로 문자열이나 특정 필드를 가진 객체를 값으로 사용할 수 있습니다.
`sourceMap`과 `optimization` 옵션은 단순한 불리언 값으로 설정할 수 있으며, 설정 파일에서 복합 값을 지정할 수도 있습니다.

<!--
The following sections provide more details of how these complex values are used in each case.
-->

다음 섹션에서는 각 경우에 이러한 복합 값을 사용하는 방법을 자세히 설명합니다.

<!--
### Assets configuration
-->

<a id="assets-configuration"></a>

### 정적 리소스 설정

<!--
Each `build` target configuration can include an `assets` array that lists files or folders you want to copy as-is when building your project.
By default, the contents of the `public/` directory are copied over.
-->

각 `build` 대상 설정에는 프로젝트를 빌드할 때 그대로 복사할 파일이나 폴더를 나열하는 `assets` 배열을 포함할 수 있습니다.
기본적으로 `public/` 디렉터리의 내용이 복사됩니다.

<!--
To exclude an asset, you can remove it from the assets configuration.
-->

리소스를 제외하려면 정적 리소스 설정에서 해당 항목을 제거하세요.

<!--
You can further configure assets to be copied by specifying assets as objects, rather than as simple paths relative to the workspace root.
An asset specification object can have the following fields.
-->

복사할 정적 리소스를 워크스페이스 루트 기준의 단순 상대 경로 대신 객체로 지정하면 더 세부적으로 설정할 수 있습니다.
리소스 지정 객체에는 다음 필드를 사용할 수 있습니다.

<!--
| Fields           | Details                                                                                                                                   |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `glob`           | A [node-glob](https://github.com/isaacs/node-glob/blob/main/README.md) using `input` as base directory.                                   |
| `input`          | A path relative to the workspace root.                                                                                                    |
| `output`         | A path relative to `outDir`. Because of the security implications, the Angular CLI never writes files outside of the project output path. |
| `ignore`         | A list of globs to exclude.                                                                                                               |
| `followSymlinks` | Allow glob patterns to follow symlink directories. This allows subdirectories of the symlink to be searched. Defaults to `false`.         |
-->

| 필드             | 설명                                                                                                                                                   |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glob`           | `input`을 기본 디렉터리로 사용하는 [node-glob](https://github.com/isaacs/node-glob/blob/main/README.md) 패턴입니다.                                    |
| `input`          | 워크스페이스 루트 기준 상대 경로입니다.                                                                                                                |
| `output`         | `outDir` 기준 상대 경로입니다. 보안상의 이유로 Angular CLI는 프로젝트 출력 경로 바깥에 파일을 기록하지 않습니다.                                       |
| `ignore`         | 제외할 glob 패턴의 목록입니다.                                                                                                                         |
| `followSymlinks` | glob 패턴이 심볼릭 링크 디렉터리를 따라가도록 허용합니다. 이를 통해 심볼릭 링크가 가리키는 하위 디렉터리를 검색할 수 있습니다. 기본값은 `false`입니다. |

<!--
For example, the following asset objects copy the contents of `src/assets/` to `/assets/` and `src/favicon.ico` to the output root.
-->

예를 들어 다음 리소스 객체는 `src/assets/`의 내용을 `/assets/`로, `src/favicon.ico`를 출력 루트로 복사합니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets/",
                "output": "/assets/"
              },
              {
                "glob": "favicon.ico",
                "input": "src/",
                "output": "/"
              }
            ]
          }
        }
      }
    }
  }
}
```

<!--
The following example uses the `ignore` field to exclude certain files in the assets directory from being copied into the build:
-->

다음 예제는 `ignore` 필드를 사용하여 정적 리소스 디렉터리의 특정 파일이 빌드 결과에 복사되지 않도록 합니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets/",
                "ignore": ["**/*.svg"],
                "output": "/assets/"
              }
            ]
          }
        }
      }
    }
  }
}
```

<!--
### Styles and scripts configuration
-->

<a id="styles-and-scripts-configuration"></a>

### 스타일 및 스크립트 설정

<!--
An array entry for the `styles` and `scripts` options can be a simple path string, or an object that points to an extra entry-point file.
The associated builder loads that file and its dependencies as a separate bundle during the build.
With a configuration object, you have the option of naming the bundle for the entry point, using a `bundleName` field.
-->

`styles`와 `scripts` 옵션 배열의 항목은 단순한 경로 문자열이나 추가 진입점 파일을 가리키는 객체일 수 있습니다.
해당 빌더는 빌드 중에 파일과 그 의존성을 별도의 번들로 로드합니다.
설정 객체를 사용하면 `bundleName` 필드로 진입점의 번들 이름을 지정할 수 있습니다.

<!--
The bundle is injected by default, but you can set `inject` to `false` to exclude the bundle from injection.
For example, the following object values create and name a bundle that contains styles and scripts, and excludes it from injection:
-->

기본적으로 번들은 자동 삽입되지만 `inject`를 `false`로 설정하여 삽입하지 않도록 할 수 있습니다.
예를 들어 다음 객체 값은 스타일과 스크립트가 포함된 번들을 생성하고 이름을 지정하되 자동으로 삽입하지 않습니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "styles": [
              {
                "input": "src/external-module/styles.scss",
                "inject": false,
                "bundleName": "external-module"
              }
            ],
            "scripts": [
              {
                "input": "src/external-module/main.js",
                "inject": false,
                "bundleName": "external-module"
              }
            ]
          }
        }
      }
    }
  }
}
```

<!--
#### Style preprocessor options
-->

<a id="style-preprocessor-options"></a>

#### 스타일 전처리기 옵션

<!--
In Sass, you can make use of the `includePaths` feature for both component and global styles. This allows you to add extra base paths that are checked for imports.
-->

Sass에서는 컴포넌트 스타일과 전역 스타일 모두에 `includePaths` 기능을 사용할 수 있습니다. 이를 통해 임포트 시 검색할 기본 경로를 추가할 수 있습니다.

<!--
To add paths, use the `stylePreprocessorOptions` option:
-->

경로를 추가하려면 `stylePreprocessorOptions` 옵션을 사용하세요.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "stylePreprocessorOptions": {
              "includePaths": ["src/style-paths"]
            }
          }
        }
      }
    }
  }
}
```

<!--
Files in that directory, such as `src/style-paths/_variables.scss`, can be imported from anywhere in your project without the need for a relative path:
-->

`src/style-paths/_variables.scss` 같은 해당 디렉터리의 파일은 프로젝트 어디에서든 상대 경로 없이 임포트할 수 있습니다.

```scss {header: "src/app/app.scss"}
// A relative path works
@import '../style-paths/variables';

// But now this works as well
@import 'variables';
```

<!--
HELPFUL: You also need to add any styles or scripts to the `test` builder if you need them for unit tests.
See also [Using runtime-global libraries inside your application](tools/libraries/using-libraries#using-runtime-global-libraries-inside-your-app).
-->

HELPFUL: 단위 테스트에도 스타일이나 스크립트가 필요하다면 `test` 빌더에도 추가해야 합니다.
[애플리케이션에서 런타임 전역 라이브러리 사용하기](tools/libraries/using-libraries#using-runtime-global-libraries-inside-your-app)도 참고하세요.

<!--
### Optimization configuration
-->

<a id="optimization-configuration"></a>

### 최적화 설정

<!--
The `optimization` option can be either a boolean or an object for more fine-tune configuration.
This option enables various optimizations of the build output, including:
-->

`optimization` 옵션은 불리언 값이나 더 세밀한 설정을 위한 객체일 수 있습니다.
이 옵션은 다음과 같은 빌드 출력 최적화를 활성화합니다.

<!--
- Minification of scripts and styles
- Tree-shaking
- Dead-code elimination
- [Inlining of critical CSS](/tools/cli/build#critical-css-inlining)
- Fonts inlining
-->

- 스크립트와 스타일 압축
- 트리 셰이킹
- 사용하지 않는 코드 제거
- [중요 CSS 인라인 삽입](/tools/cli/build#critical-css-inlining)
- 글꼴 인라인 삽입

<!--
Several options can be used to fine-tune the optimization of an application.
-->

여러 옵션으로 애플리케이션 최적화를 세밀하게 조정할 수 있습니다.

<!--
| Options   | Details                                                        | Value type                                                               | Default value |
| :-------- | :------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------ |
| `scripts` | Enables optimization of the scripts output.                    | `boolean`                                                                | `true`        |
| `styles`  | Enables optimization of the styles output.                     | `boolean` \| [Styles optimization options](#styles-optimization-options) | `true`        |
| `fonts`   | Enables optimization for fonts. This requires internet access. | `boolean` \| [Fonts optimization options](#fonts-optimization-options)   | `true`        |
-->

| 옵션      | 설명                                                  | 값의 타입                                                       | 기본값 |
| :-------- | :---------------------------------------------------- | :-------------------------------------------------------------- | :----- |
| `scripts` | 스크립트 출력의 최적화를 활성화합니다.                | `boolean`                                                       | `true` |
| `styles`  | 스타일 출력의 최적화를 활성화합니다.                  | `boolean` \| [스타일 최적화 옵션](#styles-optimization-options) | `true` |
| `fonts`   | 글꼴 최적화를 활성화합니다. 인터넷 연결이 필요합니다. | `boolean` \| [글꼴 최적화 옵션](#fonts-optimization-options)    | `true` |

<!--
#### Styles optimization options
-->

<a id="styles-optimization-options"></a>

#### 스타일 최적화 옵션

<!--
| Options                 | Details                                                                                                                  | Value type | Default value |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `minify`                | Minify CSS definitions by removing extraneous whitespace and comments, merging identifiers, and minimizing values.       | `boolean`  | `true`        |
| `inlineCritical`        | Extract and inline critical CSS definitions to improve [First Contentful Paint](https://web.dev/first-contentful-paint). | `boolean`  | `true`        |
| `removeSpecialComments` | Remove comments in global CSS that contains `@license` or `@preserve` or that starts with `//!` or `/*!`.                | `boolean`  | `true`        |
-->

| 옵션                    | 설명                                                                                                                              | 값의 타입 | 기본값 |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------- | :----- |
| `minify`                | 불필요한 공백과 주석을 제거하고 식별자를 병합하며 값을 최소화하여 CSS 정의를 압축합니다.                                          | `boolean` | `true` |
| `inlineCritical`        | 중요한 CSS 정의를 추출하여 인라인으로 삽입함으로써 [First Contentful Paint](https://web.dev/first-contentful-paint)를 개선합니다. | `boolean` | `true` |
| `removeSpecialComments` | 전역 CSS에서 `@license` 또는 `@preserve`를 포함하거나 `//!` 또는 `/*!`로 시작하는 주석을 제거합니다.                              | `boolean` | `true` |

<!--
#### Fonts optimization options
-->

<a id="fonts-optimization-options"></a>

#### 글꼴 최적화 옵션

<!--
| Options  | Details                                                                                                                                                                                                             | Value type | Default value |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- | :------------ |
| `inline` | Reduce [render blocking requests](https://web.dev/render-blocking-resources) by inlining external Google Fonts and Adobe Fonts CSS definitions in the application's HTML index file. This requires internet access. | `boolean`  | `true`        |
-->

| 옵션     | 설명                                                                                                                                                                                                   | 값의 타입 | 기본값 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :----- |
| `inline` | 외부 Google Fonts와 Adobe Fonts의 CSS 정의를 애플리케이션의 HTML 인덱스 파일에 인라인으로 삽입하여 [렌더링 차단 요청](https://web.dev/render-blocking-resources)을 줄입니다. 인터넷 연결이 필요합니다. | `boolean` | `true` |

<!--
You can supply a value such as the following to apply optimization to one or the other:
-->

다음과 같은 값을 지정하여 각 항목의 최적화를 개별적으로 적용할 수 있습니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "optimization": {
              "scripts": true,
              "styles": {
                "minify": true,
                "inlineCritical": true
              },
              "fonts": true
            }
          }
        }
      }
    }
  }
}
```

<!--
### Source map configuration
-->

<a id="source-map-configuration"></a>

### 소스맵 설정

<!--
The `sourceMap` builder option can be either a boolean or an object for more fine-tune configuration to control the source maps of an application.
-->

`sourceMap` 빌더 옵션은 불리언 값이나 애플리케이션의 소스맵을 더 세밀하게 제어하기 위한 객체일 수 있습니다.

<!--
| Options          | Details                                                      | Value type | Default value |
| :--------------- | :----------------------------------------------------------- | :--------- | :------------ |
| `scripts`        | Output source maps for all scripts.                          | `boolean`  | `true`        |
| `styles`         | Output source maps for all styles.                           | `boolean`  | `true`        |
| `vendor`         | Resolve vendor packages source maps.                         | `boolean`  | `false`       |
| `hidden`         | Omit link to sourcemaps from the output JavaScript.          | `boolean`  | `false`       |
| `sourcesContent` | Output original source content for files within source maps. | `boolean`  | `true`        |
-->

| 옵션             | 설명                                                  | 값의 타입 | 기본값  |
| :--------------- | :---------------------------------------------------- | :-------- | :------ |
| `scripts`        | 모든 스크립트의 소스맵을 출력합니다.                  | `boolean` | `true`  |
| `styles`         | 모든 스타일의 소스맵을 출력합니다.                    | `boolean` | `true`  |
| `vendor`         | 외부 패키지의 소스맵을 해석합니다.                    | `boolean` | `false` |
| `hidden`         | 출력 JavaScript에서 소스맵 링크를 생략합니다.         | `boolean` | `false` |
| `sourcesContent` | 소스맵에 포함되는 파일의 원본 소스 코드를 출력합니다. | `boolean` | `true`  |

<!--
The example below shows how to toggle one or more values to configure the source map outputs:
-->

다음 예제는 하나 이상의 값을 켜거나 꺼서 소스맵 출력을 설정하는 방법을 보여줍니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "sourceMap": {
              "scripts": true,
              "styles": false,
              "hidden": true,
              "vendor": true
            }
          }
        }
      }
    }
  }
}
```

<!--
HELPFUL: When using hidden source maps, source maps are not referenced in the bundle.
These are useful if you only want source maps to map stack traces in error reporting tools without showing up in browser developer tools.
Note that even though `hidden` prevents the source map from being linked in the output bundle, your deployment process must take care not to serve the generated sourcemaps in production, or else the information is still leaked.
-->

HELPFUL: 숨겨진 소스맵을 사용하면 번들에서 소스맵을 참조하지 않습니다.
브라우저 개발자 도구에 표시하지 않고 오류 보고 도구에서 스택 트레이스를 매핑하는 데만 소스맵을 사용하려는 경우에 유용합니다.
`hidden`은 출력 번들에 소스맵 링크가 포함되지 않도록 할 뿐입니다. 배포 과정에서도 생성한 소스맵을 프로덕션에서 제공하지 않도록 해야 합니다. 그렇지 않으면 정보가 여전히 유출됩니다.

<!--
#### Source maps without sources content
-->

<a id="source-maps-without-sources-content"></a>

#### 원본 소스 코드가 없는 소스맵

<!--
You can generate source maps without the `sourcesContent` field, which contains the original source code.
This allows you to deploy source maps to production for better error reporting with original source names while protecting your source code from exposure.
-->

원본 소스 코드를 포함하는 `sourcesContent` 필드 없이 소스맵을 생성할 수 있습니다.
이를 통해 소스 코드가 노출되지 않도록 보호하면서 프로덕션에 소스맵을 배포하여 원본 소스 이름을 사용한 더 나은 오류 보고를 제공할 수 있습니다.

<!--
To exclude sources content from source maps, set the `sourcesContent` option to `false`:
-->

소스맵에서 원본 소스 코드를 제외하려면 `sourcesContent` 옵션을 `false`로 설정하세요.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "sourceMap": {
              "scripts": true,
              "styles": true,
              "sourcesContent": false
            }
          }
        }
      }
    }
  }
}
```

<!--
### Index configuration
-->

<a id="index-configuration"></a>

### 인덱스 설정

<!--
Configures generation of the application's HTML index.
-->

애플리케이션의 HTML 인덱스 생성을 설정합니다.

<!--
The `index` option can be either a string or an object for more fine-tune configuration.
-->

`index` 옵션은 문자열이나 더 세밀한 설정을 위한 객체일 수 있습니다.

<!--
When supplying the value as a string the filename of the specified path will be used for the generated file and will be created in the root of the application's configured output path.
-->

문자열 값을 지정하면 해당 경로의 파일 이름을 생성할 파일 이름으로 사용하며, 애플리케이션에 설정된 출력 경로의 루트에 파일을 생성합니다.

<!--
#### Index options
-->

<a id="index-options"></a>

#### 인덱스 옵션

<!--
| Options  | Details                                                                                                                                                                          | Value type | Default value   |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :-------------- |
| `input`  | The path of a file to use for the application's generated HTML index.                                                                                                            | `string`   | None (required) |
| `output` | The output path of the application's generated HTML index file. The full provided path will be used and will be considered relative to the application's configured output path. | `string`   | `index.html`    |
-->

| 옵션     | 설명                                                                                                                                                      | 값의 타입 | 기본값       |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :----------- |
| `input`  | 애플리케이션의 HTML 인덱스를 생성할 때 사용할 파일 경로입니다.                                                                                            | `string`  | 없음(필수)   |
| `output` | 생성된 애플리케이션 HTML 인덱스 파일의 출력 경로입니다. 지정한 전체 경로를 사용하며 애플리케이션에 설정된 출력 경로를 기준으로 한 상대 경로로 간주합니다. | `string`  | `index.html` |

<!--
### Output path configuration
-->

<a id="output-path-configuration"></a>

### 출력 경로 설정

<!--
The `outputPath` option can be either a String which will be used as the `base` value or an Object for more fine-tune configuration.
-->

`outputPath` 옵션은 `base` 값으로 사용할 문자열이나 더 세밀한 설정을 위한 객체일 수 있습니다.

<!--
Several options can be used to fine-tune the output structure of an application.
-->

여러 옵션으로 애플리케이션의 출력 구조를 세밀하게 조정할 수 있습니다.

<!--
| Options   | Details                                                                                                                                                           | Value type | Default value |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `base`    | Specify the output path relative to workspace root.                                                                                                               | `string`   |               |
| `browser` | The output directory name for your browser build is within the base output path. This can be safely served to users.                                              | `string`   | `browser`     |
| `server`  | The output directory name of your server build within the output path base.                                                                                       | `string`   | `server`      |
| `media`   | The output directory name for your media files located within the output browser directory. These media files are commonly referred to as resources in CSS files. | `string`   | `media`       |
-->

| 옵션      | 설명                                                                                                                                         | 값의 타입 | 기본값    |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :-------- |
| `base`    | 워크스페이스 루트를 기준으로 출력 경로를 지정합니다.                                                                                         | `string`  |           |
| `browser` | 기본 출력 경로 안에 생성할 브라우저 빌드의 출력 디렉터리 이름입니다. 이 디렉터리는 사용자에게 안전하게 제공할 수 있습니다.                   | `string`  | `browser` |
| `server`  | 기본 출력 경로 안에 생성할 서버 빌드의 출력 디렉터리 이름입니다.                                                                             | `string`  | `server`  |
| `media`   | 브라우저 출력 디렉터리 안에 생성할 미디어 파일의 출력 디렉터리 이름입니다. 이러한 미디어 파일은 일반적으로 CSS 파일에서 리소스로 참조합니다. | `string`  | `media`   |
