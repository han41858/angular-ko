<!--
# Angular workspace configuration
-->
# 워크스페이스 설정

<!--
A file named `angular.json` at the root level of an Angular [workspace](guide/glossary#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI.
Path values given in the configuration are relative to the root workspace folder.
-->
Angular [워크스페이스](guide/glossary#workspace) 최상위 폴더에 있는 `angular.json` 파일은 워크스페이스와 프로젝트를 대상으로 Angular CLI를 실행할 때 기본값으로 적용될 내용을 설정하는 파일입니다.
이 파일에 사용하는 모든 주소는 워크스페이스 최상위 폴더를 기준으로 하는 상대 주소입니다.

<!--
## Overall JSON structure
-->
## JSON 파일의 최상위 계층

<!--
At the top level of `angular.json`, a few properties configure the workspace, and a `projects` section contains the remaining per-project configuration options. CLI defaults set at the workspace level can be overridden by defaults set at the project level, and defaults set at the project level can be overridden on the command line.

The following properties, at the top level of the file, configure the workspace.

* `version`: The configuration-file version.
* `newProjectRoot`: Path where new projects are created. Absolute or relative to the workspace folder.
* `defaultProject`: Default project name to use in commands, where not provided as an argument. When you use `ng new` to create a new application in a new workspace, that application is the default project for the workspace until you change it here.
* `schematics` : A set of [schematics](guide/glossary#schematic) that customize the `ng generate` sub-command option defaults for this workspace. See [Generation schematics](#schematics) below.
* `projects` : Contains a subsection for each project (library or application) in the workspace, with the per-project configuration options.

The initial application that you create with `ng new app_name` is listed under "projects":
-->
`angular.json` 파일의 최상위 계층에는 워크스페이스를 설정하는 프로퍼티가 존재합니다.
이 계층에서 `projects` 섹션을 정의하면 특정 프로젝트에 옵션을 지정할 수 있습니다.
Angular CLI가 기본으로 구성한 워크스페이스 설정은 프로젝트 계층에서 오버라이드할 수 있으며, 프로젝트 계층에 지정된 설정은 커맨드라인에서 오버라이드할 수 있습니다.

`angular.json` 파일의 최상위 계층에는 워크스페이스의 환경을 구성하는 프로퍼티가 다음과 같이 존재합니다.

* `version`: 설정 파일의 버전을 의미합니다.
* `newProjectRoot`: 새로운 프로젝트가 생성될 위치를 지정합니다. 워크스페이스 폴더를 기준으로 절대주소를 사용하거나 상대주소를 사용합니다.
* `defaultProject`: 특정 프로젝트를 지정하지 않고 Angular CLI 명령을 실행할 때 기본 대상이 되는 프로젝트를 지정합니다. `ng new` 명령을 실행해서 새 워크스페이스와 새 앱을 실행하면 이 프로젝트가 워크스페이스의 기본 프로젝트로 지정됩니다.
* `schematics` : 워크스페이스에서 `ng generate` 명령으로 동작하는 [스키매틱](guide/glossary#schematic)을 구성합니다. 자세한 내용은 아래 [스키매틱 생성하기](#schematics) 섹션을 참고하세요.
* `projects`: 라이브러리나 앱, e2e 테스트 앱 등 워크스페이스에 존재하는 각각의 프로젝트에 적용되는 옵션을 지정합니다.

`ng new app_name` 명령을 실행해서 앱을 생성하면 이 앱은 "projects" 목록에 둥록되는데, 이 때 이 앱에 적용되는 엔드-투-엔드 테스트 앱도 함께 등록됩니다:

<code-example language="json">

"projects": {
  "app_name": {
    ...
  }
  ...
}

</code-example>

<!--
Each additional app that you create with `ng generate application` has a corresponding end-to-end test project, with its own configuration section.
When you create a library project with `ng generate library`, the library project is also added to the `projects` section.
-->
`ng generate application` 명령을 실행해서 앱을 생성하면 엔드-투-엔드 테스트 프로젝트도 함께 생성되며, 이 프로젝트에 해당하는 환경 설정도 `angular.json` 파일에 자동으로 생성됩니다.
그리고 `ng generate library` 명령을 실행해서 라이브러리 프로젝트를 생성하면 이 라이브러리 프로젝트도 `projects` 섹션에 추가됩니다.

<div class="alert is-helpful">

  <!--
  Note that the `projects` section of the configuration file does not correspond exactly to the workspace file structure.
  * The initial application created by `ng new` is at the top level of the workspace file structure.
  * Additional applications and libraries go into a `projects` folder in the workspace.

  For more information, see [Workspace and project file structure](guide/file-structure).
  -->
  `angular.json` 파일의 `projects` 섹션 구조가 워크스페이스 파일 구조와 정확히 일치하지는 않습니다.
  * `ng new` 명령을 실행해서 만든 앱은 워크스페이스 파일 구조의 최상위 계층에 존재합니다.
  * 그 이후에 추가되는 앱과 라이브러리는 이 워크스페이스의 `projects` 폴더 안에 생성됩니다.

  더 자세한 내용은 [워크스페이스와 프로젝트 파일 구조](guide/file-structure) 문서를 참고하세요.

</div>


<!--
## Strict mode
-->
## Strict 모드

<!--
When you create new workspaces and projects, you have the option to use Angular's strict mode, which can help you write better, more maintainable code.
For more information, see [Strict mode](/guide/strict-mode).
-->
워크스페이스나 프로젝트를 새로 생성할 때 Angular가 제공하는 strict 모드를 활성화할 수 있습니다.
strict 모드를 사용하면 유지보수하기 유리한 코드를 작성할 수 있습니다.
자세한 내용은 [Strict 모드](/guide/strict-mode) 문서를 참고하세요.


<!--
## Project configuration options
-->
## 프로젝트 옵션

<!--
The following top-level configuration properties are available for each project, under `projects:<project_name>`.
-->
다음 옵션들은 프로젝트에 적용하는 프로퍼티 중 최상위 계층에 존재하는 프로퍼티입니다.

<code-example language="json">

    "my-app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {}
    }

</code-example>

<!--
| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| `root`          | The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace. |
| `sourceRoot`    | The root folder for this project's source files. |
| `projectType`   | One of "application" or "library". An application can run independently in a browser, while a library cannot.|
| `prefix`        | A string that Angular prepends to generated selectors. Can be customized to identify an application or feature area. |
| `schematics`    | A set of schematics that customize the `ng generate` sub-command option defaults for this project. See [Generation schematics](#schematics) below.  |
| `architect`     | Configuration defaults for Architect builder targets for this project. |
-->
| 프로퍼티 | 설명 |
| :-------------- | :---------------------------- |
| `root`          | 프로젝트 파일의 최상위 폴더를 지정하며, 워크스페이스 폴더로부터 상대 경로로 지정합니다. 워크스페이스 기본 앱은 워크스페이스 최상위 계층에 존재하기 때문에 빈 문자열로 지정됩니다. |
| `sourceRoot`    | 프로젝트의 소스 파일이 위치하는 폴더를 지정합니다. |
| `projectType`   | 프로젝트 타입을 "application"이나 "library" 중 하나로 지정합니다. 애플리케이션 프로젝트는 브라우저에 단독으로 실행할 수 있지만 라이브러리는 이렇게 실행할 수 없습니다. 기본 앱과 e2e 테스트 앱은 모두 "application" 타입입니다.|
| `prefix`        | Angular CLI가 자동으로 생성하는 셀렉터의 접두사를 지정합니다. 앱 단위나 기능모듈 단위로 지정할 수 있습니다. |
| `schematics`    | 프로젝트에서 `ng generate` 명령으로 사용하는 스키매틱을 구성합니다.자세한 내용은 아래 [스키매틱 생성하기](#schematics) 섹션을 참고하세요. |
| `architect`     | 프로젝트에 적용되는 기본 Architect 빌더 옵션을 설정합니다. |


{@a schematics}
{@a generation-schematics}
<!--
## Generation schematics
-->
## 스키매틱 생성하기

<!--
Angular generation [schematics](guide/glossary#schematic) are instructions for modifying a project by adding files or modifying existing files.
Individual schematics for the default Angular CLI `ng generate` sub-commands are collected in the package `@schematics/angular`.
Specify the schematic name for a subcommand in the format `schematic-package:schematic-name`;
for example, the schematic for generating a component is `@schematics/angular:component`.

The JSON schemas for the default schematics used by the CLI to generate projects and parts of projects are collected in the package [`@schematics/angular`](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/application/schema.json).
The schema describes the options available to the CLI for each of the `ng generate` sub-commands, as shown in the `--help` output.

The fields given in the schema correspond to the allowed argument values and defaults for the CLI sub-command options.
You can update your workspace schema file to set a different default for a sub-command option.
-->
Angular에서 생성 [스키매틱(schematics)](guide/glossary#schematic)을 정의하면 Angular 구성요소를 프로젝트에 추가하면서 미리 정해둔 대로 프로젝트 파일을 자동 수정할 수 있습니다.
Angular CLI로 `ng generate` 명령을 사용할 때 활용되는 스키매틱은 `@schematics/angular` 패키지에서 제공하는 것입니다.
이 때 `ng generate` 뒤에 오는 세부 명령은 `schematic-package:스키매틱-이름` 형식으로 지정되어 있기 때문에 컴포넌트 생성 명령은 `@schematics/angular:component` 스키매틱으로 정의되어 있습니다.

그리고 Angular CLI로 프로젝트와 구성요소를 생성할 떄 사용되는 JSON 스키마는 [`@schematics/angular`](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/application/schema.json) 패키지로 제공됩니다.
`ng generate` 명령에 어떤 옵션을 사용할 수 있는지 알아보려면 `ng generate --help` 명령을 실행해서 도움말을 확인해 보세요.

워크스페이스에 있는 스키마 파일을 변경하면 세부 명령의 기본 옵션값을 변경할 수 있습니다.


{@a architect}

{@a project-tool-configuration-options}

<!--
## Project tool configuration options
-->
## Architect 옵션

<!--
Architect is the tool that the CLI uses to perform complex tasks, such as compilation and test running.
Architect is a shell that runs a specified [builder](guide/glossary#builder) to perform a given task, according to a [target](guide/glossary#target) configuration.
You can define and configure new builders and targets to extend the CLI.
See [Angular CLI Builders](guide/cli-builder).
-->
Architect는 Angular CLI가 애플리케이션 빌드나 테스트 작업같이 복잡한 로직을 실행할 때 활용하는 툴입니다.
Architect는 [빌더(builder)](guide/glossary#builder)를 사용해서 [빌드 대상](guide/glossary#target)과 관련된 환경설정 값으로 해당 작업을 수행합니다.
그리고 필요한 경우에는 빌더나 빌드 대상을 추가해서 Angular CLI의 기능을 확장할 수도 있습니다.
자세한 내용은 [Angular LCI 빌더](guide/cli-builder) 문서를 참고하세요.


{@a default-build-targets}

<!--
### Default Architect builders and targets
-->
### Architect 기본 빌더, 기본 빌드 대상

<!--
Angular defines default builders for use with specific CLI commands, or with the general `ng run` command.
The JSON schemas that define the options and defaults for each of these default builders are collected in the [`@angular-devkit/build-angular`](https://github.com/angular/angular-cli/blob/master/packages/angular/cli/lib/config/schema.json) package.
The schemas configure options for the following builders.

* app-shell
* browser
* dev-server
* extract-i18n
* karma
* protractor
* server
* tslint
-->
Angular는 Angular CLI를 사용할 때 활용할 빌더와 기본 옵션을 미리 지정해두었습니다.
Angular CLI 명령의 기본 옵션과 기본 빌드 대상은 [`@angular-devkit/build-angular`](https://github.com/angular/angular-cli/blob/master/packages/angular/cli/lib/config/schema.json) 패키지에 정의되어 있으며, 다음 빌더들이 활용됩니다.

* app-shell
* browser
* dev-server
* extract-i18n
* karma
* protractor
* server
* tslint


<!--
### Configuring builder targets
-->
### 빌드 대상 지정하기

<!--
The `architect` section of `angular.json` contains a set of Architect targets.
Many of the targets correspond to the CLI commands that run them.
Some additional predefined targets can be run using the `ng run` command, and you can define your own targets.

Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs.
In addition, each target has an `options` section that configures default options for the target, and a `configurations` section that names and specifies alternative configurations for the target.
See the example in [Build target](#build-target) below.
-->
Architect 빌드 대상은 `angular.json` 파일의 `architect` 섹션에서 지정합니다.
이 섹션에서 지정하는 내용은 Angular CLI 명령이 실행될 때 적용되며, 이 파일에 지정하지 않은 빌드 대상은 `ng run` 명령으로 실행할 수 있습니다.

`architect` 섹션에 지정하는 객체의 키는 npm 패키지 형태로 배포되는 빌더 이름을 지정합니다.
그리고 이 객체에 `options` 섹션을 지정하면 해당 빌드 대상을 실행하면서 기본값으로 사용할 옵션을 지정할 수 있습니다.
환경에 따라 기본 옵션이 달라진다면 `configurations`에서 해당 빌드에 대한 설정을 추가 구성하면 됩니다.
자세한 내용은 아래 [빌드 대상](#build-target) 예제를 참고하세요.


<code-example language="json">

      "architect": {
        "build": { },
        "serve": { },
        "e2e" : { },
        "test": { },
        "lint": { },
        "extract-i18n": { },
        "server": { },
        "app-shell": { }
      }

</code-example>

<!--
* The `architect/build` section configures defaults for options of the `ng build` command.
See [Build target](#build-target) below for more information.

* The `architect/serve` section overrides build defaults and supplies additional serve defaults for the `ng serve` command. In addition to the options available for the `ng build` command, it adds options related to serving the application.

* The `architect/e2e` section overrides build-option defaults for building end-to-end testing applications using the `ng e2e` command.

* The `architect/test` section overrides build-option defaults for test builds and supplies additional test-running defaults for the `ng test` command.

* The `architect/lint` section configures defaults for options of the `ng lint` command, which performs code analysis on project source files. The default linting tool for Angular is [TSLint](https://palantir.github.io/tslint/).

* The `architect/extract-i18n` section configures defaults for options of the `ng extract-i18n` command, which extracts marked message strings from source code and outputs translation files.

* The `architect/server` section configures defaults for creating a Universal application with server-side rendering, using the `ng run <project>:server` command.

* The `architect/app-shell` section configures defaults for creating an application shell for a progressive web application (PWA), using the `ng run <project>:app-shell` command.

In general, the options for which you can configure defaults correspond to the command options listed in the [CLI reference page](cli) for each command.
Note that all options in the configuration file must use [camelCase](guide/glossary#case-conventions), rather than dash-case.
-->
* `architect/build` 섹션에는 `ng build` 명령을 실행할 때 적용될 옵션을 지정합니다.
자세한 내용은 아래 [빌드 대상](#build-target) 섹션을 참고하세요.

* `architect/serve` 섹션에는 `ng serve` 명령을 실행할 때 적용될 옵션을 지정하며, 이 옵션은 빌드 옵션을 오버라이드합니다. `ng serve` 명령을 실행하면 `ng build`에 적용된 옵션이 먼저 적용되며, `architect/serve` 섹션에 추가된 옵션을 추가로 적용해서 앱이 실행됩니다.

* `architect/e2e` 섹션에는 `ng e2e` 명령을 실행해서 엔드-투-엔드 테스트를 실행할 때 적용될 옵션을 지정합니다.

* `architect/test` 섹션에는 `ng test` 명령을 실행할 때 적용될 옵션을 지정하며, 이 옵션은 빌드 옵션을 오버라이드합니다.

* `architect/lint` 섹션에는 `ng lint` 명령을 실행할 때 적용될 옵션을 지정합니다. Lint 툴은 코딩 스타일을 일관된 형식 작성했는지 검사하는 정적 분석 툴이며, Angular가 사용하는 기본 Lint 툴은 [TSLint](https://palantir.github.io/tslint/) 입니다.

* `architect/extract-i18n` 섹션에는 `ng xi18n` 명령을 실행했을 때 실행되는 `ng-xi18n` 툴에 적용될 옵션을 지정합니다. 이 명령은 다국어 지원을 위해 소스 코드에서 문자열을 추출할 때 사용합니다.

* `architect/server` 섹션에는 `ng run <프로젝트>:server` 명령을 실행해서 서버-사이드 렌더링을 지원하는 유니버설 앱을 생성할 때 적용되는 옵션을 지정합니다.

* `architect/app-shell` 섹션에는 `ng run <프로젝트>:app-shell` 명령을 실행해서 PWA 앱의 기본 틀을 생성할 때 적용될 옵션을 지정합니다.

일반적으로 섹션들에 지정할 수 있는 옵션은 Angular CLI를 실행할 때 적용하는 옵션과 같으며, 전체 목록은 [Angular CLI 페이지](cli)에서 확인할 수 있습니다.
모든 옵션은 대시 케이스가 아니라 [캐멀 케이스(camelCase)](guide/glossary#case-conventions)로 작성해야 합니다.

{@a build-target}

<!--
## Build target
-->
## 빌드 대상

<!--
The `architect/build` section configures defaults for options of the `ng build` command. It has the following top-level properties.

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| `builder`       | The npm package for the build tool used to create this target. The default builder for an application (`ng build myApp`) is `@angular-devkit/build-angular:browser`, which uses the [webpack](https://webpack.js.org/) package bundler. Note that a different builder is used for building a library (`ng build myLib`). |
| `options`       | This section contains default build target options, used when no named alternative configuration is specified. See [Default build targets](#default-build-targets) below. |
| `configurations`| This section defines and names alternative configurations for different intended destinations. It contains a section for each named configuration, which sets the default options for that intended environment. See [Alternate build configurations](#build-configs) below. |
-->
`architect/build` 섹션에는 `ng build` 명령을 실행할 때 적용될 옵션을 지정합니다. 이 옵션의 최상위 계층에는 다음과 같은 프로퍼티를 지정할 수 있습니다.

| 프로퍼티 | 설명 |
| :-------------- | :---------------------------- |
| `builder`       | 앱을 빌드할 때 사용하는 npm 패키지를 지정합니다. 기본값은 [webpack](https://webpack.js.org/) 패키지 번들러를 기반으로 동작하는 `@angular-devkit/build-angular:browser`입니다. |
| `options`       | 빌드할 때 기본 빌드 대상에 적용될 옵션을 지정합니다. 자세한 내용은 아래 [기본 빌드 대상](#default-build-targets) 섹션을 참고하세요. |
| `configurations`| 환경 설정을 대체할 수 있는 옵션을 지정합니다. 이 옵션을 사용하면 애플리케이션을 여러 환경에서 동작할 수 있도록 빌드할 때 각기 다른 설정 파일을 지정할 수 있습니다. 자세한 내용은 아래 [빌드 옵션 변경](#build-configs) 섹션을 참고하세요. |


{@a build-configs}

<!--
### Alternate build configurations
-->
### 빌드 옵션 변경

<!--
Angular CLI comes with two build configurations: `production` and `development`. By default, the `ng build` command uses the `production` configuration, which applies a number of build optimizations, including:
* Bundling files
* Minimizing excess whitespace
* Removing comments and dead code
* Rewriting code to use short, mangled names (minification)

You can define and name additional alternate configurations (such as `stage`, for instance) appropriate to your development process. Some examples of different build configurations are `stable`, `archive` and `next` used by AIO itself, and the individual locale-specific configurations required for building localized versions of an application. For details, see [Internationalization (i18n)](guide/i18n#merge-aot).

You can select an alternate configuration by passing its name to the `--configuration` command line flag.

You can also pass in more than one configuration name as a comma-separated list. For example, to apply both `stage` and `fr` build configurations, use the command `ng build --configuration stage,fr`. In this case,  the command parses the named configurations from left to right. If multiple configurations change the same setting, the last-set value is the final one.

If the `--prod` command line flag is also used, it is applied first, and its settings can be overridden by any configurations specified via the `--configuration` flag.
-->
Angular CLI는 `production`, `development` 환경을 기본으로 구성합니다.
따로 환경을 지정하지 않은 채로 `ng build` 명령을 실행하면 `production` 환경설정이 적용되며, 이 환경에서는 다음과 같은 빌드 최적화 과정이 추가됩니다:

* 파일을 번들링합니다.
* 공백문자를 제거합니다.
* 주석과 데드 코드를 제거합니다.
* 코드를 난독화해서 용량을 줄입니다.

개발 과정에 필요하다면 `stage`와 같은 빌드 설정을 추가할 수도 있습니다. 그래서 Angular IO (Angular 공식 가이드 문서) 프로젝트는 `stable`, `archive`, `next`와 같은 빌드 설정을 추가로 정의해서 사용하고 있으며, 애플리케이션에 다국어를 적용하기 위한 설정도 추가할 수 있습니다. 자세한 내용은 [Internationalization (i18n)](guide/i18n#merge-aot) 문서를 참고하세요.

커맨드라인에서 `--configuration` 옵션을 사용하면 빌드하는 환경을 변경할 수 있습니다.

이 때 쉼표(`,`)로 구분해서 여러 환경을 지정할 수도 있습니다.
그래서 `stage` 환경과 `fr` 환경을 동시에 적용해서 애플리케이션을 빌드하려면 `ng build --configuration stage,fr`과 같이 실행하면 됩니다.
이 경우에 환경설정으로 지정한 이름은 왼쪽에서 오른쪽으로 파싱됩니다.
그래서 환경설정 중에 충돌하는 항목이 있으면 가장 마지막에 지정된 값이 사용됩니다.

`--prod` 옵션도 비슷하게 동작합니다.
`--prod` 옵션을 `--configuration`보다 먼저 사용하면 `--prod`에서 설정한 환경설정 값을 `--configuration`이 오버라이드할 수 있습니다.


{@a build-props}

<!--
### Additional build and test options
-->
### 빌드/테스트 추가 옵션

<!--
The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), [`ng serve`](cli/serve), and [`ng test`](cli/test) commands. For details of those options and their possible values, see the [CLI Reference](cli).

Some additional options can only be set through the configuration file, either by direct editing or with the [`ng config`](cli/config) command.

| OPTIONS PROPERTIES | DESCRIPTION |
| :------------------------- | :---------------------------- |
| `assets`                   | An object containing paths to static assets to add to the global context of the project. The default paths point to the project's icon file and its `assets` folder. See more in [Assets configuration](#asset-config) below. |
| `styles`                   | An array of style files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors: [sass/scss](https://sass-lang.com/), [less](http://lesscss.org/), and [stylus](https://stylus-lang.com/). See more in [Styles and scripts configuration](#style-script-config) below. |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors. See more in [Styles and scripts configuration](#style-script-config) below. |
| `scripts`                  | An object containing JavaScript script files to add to the global context of the project. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`. See more in [Styles and scripts configuration](#style-script-config) below. |
| `budgets`                  | Default size-budget type and threshholds for all or parts of your application. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](guide/build#configure-size-budgets). (Not available in `test` section.) |
| `fileReplacements`         | An object containing files and their compile-time replacements. See more in [Configure target-specific file replacements](guide/build#configure-target-specific-file-replacements).|
-->
이 환경설정 파일의 내용은 [`ng build`](cli/build), [`ng serve`](cli/serve), [`ng test`](cli/test) 명령에 적용됩니다. 이 명령에 사용할 수 있는 옵션의 목록은 [Angular CLI](cli) 문서를 참고하세요.

그런데 Angular CLI 명령을 실행하면서 사용하는 옵션 외에 `angular.json` 파일에만 설정할 수 있는 옵션도 있습니다. 이 옵션은 [`ng config`](cli/config) 명령으로 설정해도 됩니다.

| 옵션값 | 설명 |
| :------------------------- | :---------------------------- |
| `assets`                   | 프로젝트 전역에 사용되는 정적 리소스를 지정합니다. 기본 경로는 `asssets` 입니다. 자세한 내용은 아래 [애셋 환경설정](#asset-config) 섹션을 참고하세요. |
| `styles`                   | 프로젝트 전역에 사용되는 스타일 파일을 지정합니다. Angular는 기본 CSS는 물론이고 [sass/scss](https://sass-lang.com/), [less](http://lesscss.org/), [stylus](https://stylus-lang.com/)도 기본으로 지원합니다. 자세한 내용은 아래 [스타일, 스크립트 환경설정](#style-script-config) 섹션을 참고하세요. |
| `stylePreprocessorOptions` | 스타일 전처리기에 전달할 옵션을 키-값 형태로 지정합니다. 자세한 내용은 아래 [스타일, 스크립트 환경설정](#style-script-config) 섹션을 참고하세요. |
| `scripts`                  | 프로젝트 전역에 사용되는 JavaScript 파일을 지정합니다. 이 때 지정되는 JavaScript 파일들은 `index.html`에 `<script>` 태그로 자동 추가됩니다. 자세한 내용은 아래 [스타일, 스크립트 환경설정](#style-script-config) 섹션을 참고하세요. |
| `budgets`                  | 애플리케이션 빌드 결과물의 한계 크기를 지정합니다. 애플리케이션을 빌드해서 생성되는 빌드 결과물의 크기가 이 옵션에서 지정된 값보다 크면 경고 메시지나 에러 메시지를 출력합니다. 자세한 내용은 [빌드 결과물 크기 지정하기](guide/build#configure-size-budgets) 문서를 참고하세요. (`test` 환경설정에는 적용되지 않습니다.) |
| `fileReplacements`         | 컴파일 시점에 기본 옵션을 대체할 파일을 지정합니다. 자세한 내용은 [빌드 환경에 맞게 환경설정 파일 교체하기](guide/build#configure-target-specific-file-replacements) 문서를 참고하세요. |


{@a complex-config}

<!--
## Complex configuration values
-->
## 복잡한 환경설정 값들

<!--
The options `assets`, `styles`, and `scripts` can have either simple path string values, or object values with specific fields.
The `sourceMap` and `optimization` options can be set to a simple Boolean value with a command flag, but can also be given a complex value using the configuration file.
The following sections provide more details of how these complex values are used in each case.
-->
`assets`, `styles`, `scripts` 필드에는 경로를 지정하거나 미리 정해져 있는 형식으로 객체를 할당하는 방식으로 사용합니다.
그런데 `sourceMap`이나 `optimization` 옵션에는 간단하게 불리언 값을 지정할 수도 있지만 복잡한 값으로 구성할 수도 있습니다.
어떻게 활용할 수 있는지 알아봅시다.


{@a asset-config}
{@a assets-configuration}
<!--
### Assets configuration
-->
### 애셋 환경설정

<!--
Each `build` target configuration can include an `assets` array that lists files or folders you want to copy as-is when building your project.
By default, the `src/assets/` folder and `src/favicon.ico` are copied over.

<code-example language="json">

"assets": [
  "src/assets",
  "src/favicon.ico"
]

</code-example>

To exclude an asset, you can remove it from the assets configuration.

You can further configure assets to be copied by specifying assets as objects, rather than as simple paths relative to the workspace root.
A asset specification object can have the following fields.

* `glob`:  A [node-glob](https://github.com/isaacs/node-glob/blob/master/README.md) using `input` as base directory.
* `input`: A path relative to the workspace root.
* `output`: A path relative to `outDir` (default is `dist/`*project-name*). Because of the security implications, the CLI never writes files outside of the project output path.
* `ignore`: A list of globs to exclude.
* `followSymlinks`: Allow glob patterns to follow symlink directories. This allows subdirectories of the symlink to be searched. Defaults to `false`.

For example, the default asset paths can be represented in more detail using the following objects.

<code-example language="json">

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

</code-example>

You can use this extended configuration to copy assets from outside your project.
For example, the following configuration copies assets from a node package:

<code-example language="json">

"assets": [
 {
   "glob": "**/*",
   "input": "./node_modules/some-package/images",
   "output": "/some-package/"
 }
]

</code-example>

The contents of `node_modules/some-package/images/` will be available in `dist/some-package/`.

The following example uses the `ignore` field to exclude certain files in the assets folder from being copied into the build:

<code-example language="json">

"assets": [
 {
   "glob": "**/*",
   "input": "src/assets/",
   "ignore": ["**/*.svg"],
   "output": "/assets/"
 }
]

</code-example>
-->
개별 `build` 환경설정에는 모두 `assets` 배열이 존재합니다.
이 배열에는 프로젝트를 빌드한 이후에 빌드 결과물 폴더에 복사할 파일과 폴더를 지정합니다.
기본 대상은 `src/assets/` 폴더와 `src/favicon.ico` 파일이 지정되어 있습니다.

<code-example language="json">

"assets": [
  "src/assets",
  "src/favicon.ico"
]

</code-example>

이 중에서 필요없는 것이 있다면 `assets` 배열에서 제거하면 됩니다.

애셋 환경설정이 복잡하다면 워크스페이스 최상위 폴더를 기준으로 하는 경로를 지정하는 대신, 객체 형태를 사용할 수도 있습니다.
객체는 이런 필드로 구성하면 됩니다.

* `glob`:  `input` 디렉토리에서 지정할 대상을 [node-glob](https://github.com/isaacs/node-glob/blob/master/README.md) 패턴으로 지정합니다.
* `input`: 워크스페이스 최상위 폴더 기준으로 대상 폴더를 지정합니다.
* `output`: `outDir`의 경로를 지정합니다(기본값은 `dist/`*프로젝트-이름*). 프로젝트 밖으로 빌드 결과물을 생성하는 방식은 보안 이슈 때문에 허용되지 않습니다.
* `ignore`: 제외할 파일 패턴을 지정합니다.
* `followSymlinks`: glob 패턴이 symlink 디렉토리도 참조할 것인지 지정합니다. 기본값은 `false`이며, 이 플래그에 `true` 값을 지정하면 symlink로 연결된 하위 폴더도 대상이 됩니다.

그래서 기본 애셋 경로들을 객체 형식으로 자세하게 풀어서 작성해보면 이렇습니다.

<code-example language="json">

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

</code-example>

이 방식을 확장하면 프로젝트 밖에 있는 애셋을 복사할 수도 있습니다.
아래 코드는 node 패키지에 있는 파일을 복사하도록 구성한 환경설정입니다:

<code-example language="json">

"assets": [
 {
   "glob": "**/*",
   "input": "./node_modules/some-package/images",
   "output": "/some-package/"
 }
]

</code-example>

이렇게 구성하면 `node_modules/some-package/images/`에 있는 파일들이 `dist/some-package/`로 복사됩니다.

그리고 아래 코드는 대상 폴더에 있는 파일들 중 특정 확장자를 복사하지 않기 위해 `ignore` 필드를 지정한 환경설정입니다:

<code-example language="json">

"assets": [
 {
   "glob": "**/*",
   "input": "src/assets/",
   "ignore": ["**/*.svg"],
   "output": "/assets/"
 }
]

</code-example>



{@a style-script-config}
{@a styles-and-scripts-configuration}
<!--
### Styles and scripts configuration
-->
### 스타일, 스크립트 환경설정

<!--
An array entry for the `styles` and `scripts` options can be a simple path string, or an object that points to an extra entry-point file.
The associated builder will load that file and its dependencies as a separate bundle during the build.
With a configuration object, you have the option of naming the bundle for the entry point, using a `bundleName` field.

The bundle is injected by default, but you can set `inject` to false to exclude the bundle from injection.
For example, the following object values create and name a bundle that contains styles and scripts, and excludes it from injection:

<code-example language="json">

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

</code-example>

You can mix simple and complex file references for styles and scripts.

<code-example language="json">

"styles": [
  "src/styles.css",
  "src/more-styles.css",
  { "input": "src/lazy-style.scss", "inject": false },
  { "input": "src/pre-rename-style.scss", "bundleName": "renamed-style" },
]

</code-example>
-->
`build` 환경설정에는 프로젝트를 빌드할 때 복사할 파일이나 폴더를 지정하기 위해 `assets` 배열을 사용할 수 있습니다.
기본값은 `src/assets/` 폴더와 `src/favicon.ico` 파일을 복사하도록 구성되어 있습니다.

<code-example language="json">

"assets": [
  "src/assets",
  "src/favicon.ico"
]

</code-example>

이 애셋을 복사하지 않으려면 배열에서 제거하기만 하면 됩니다.

`assets` 배열에는 워크스페이스 최상위 폴더를 기준으로 상대주소를 문자열로 지정할 수도 있지만, 객체 형태로 지정할 수도 있습니다.
이 때 객체에는 이런 필드를 사용합니다.

* `glob`:  `input` 폴더에서 파일을 선택할 [node-glob](https://github.com/isaacs/node-glob/blob/master/README.md)를 지정합니다.
* `input`: 소스 폴더를 워크스페이스 최상위 경로의 상대경로로 지정합니다.
* `output`: 복사할 위치를 `outDir`의 상대경로로 지정합니다(기본값은 `dist/*프로젝트-이름*` 입니다). 보안 문제가 있을 수 있기 때문에 Angular CLI는 `outDir` 안쪽에만 파일을 씁니다.
* `ignore`: 제외할 파일 패턴을 지정합니다.
* `followSymlinks`: glob 패턴이 symlink 디렉토리도 참조할 것인지 지정합니다. 기본값은 `false`이며, 이 플래그에 `true` 값을 지정하면 symlink로 연결된 하위 폴더도 대상이 됩니다.

그래서 기본 설정을 객체 형태로 바꿔보면 이렇게 표현할 수 있습니다.

<code-example language="json">

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

</code-example>

이 방식을 사용하면 프로젝트 외부에 있는 애셋도 복사해 올 수 있습니다.
node 패키지 안에서 복사해오려면 이렇게 작성하면 됩니다:

<code-example language="json">

"assets": [
 {
   "glob": "**/*",
   "input": "./node_modules/some-package/images",
   "output": "/some-package/"
 }
]

</code-example>

이렇게 작성하면 `node_modules/some-package/images/`가 `dist/some-package`에 복사됩니다.

그리고 아래 예제는 복사할 폴더에서 일부 파일을 제외하기 위해 `ignore` 필드를 사용한 예제입니다:

<code-example language="json">

"assets": [
 { 
   "glob": "**/*",
   "input": "src/assets/",
   "ignore": ["**/*.svg"],
   "output": "/assets/" 
 }
]

</code-example>


{@a style-preprocessor}

<!--
#### Style preprocessor options
-->
#### 스타일 전처리기 옵션

<!--
In Sass and Stylus you can make use of the `includePaths` functionality for both component and global styles, which allows you to add extra base paths that will be checked for imports.

To add paths, use the `stylePreprocessorOptions` option:

<code-example language="json">

"stylePreprocessorOptions": {
  "includePaths": [
    "src/style-paths"
  ]
}

</code-example>

Files in that folder, such as `src/style-paths/_variables.scss`, can be imported from anywhere in your project without the need for a relative path:

```ts
// src/app/app.component.scss
// A relative path works
@import '../style-paths/variables';
// But now this works as well
@import 'variables';
```

Note that you will also need to add any styles or scripts to the `test` builder if you need them for unit tests.
See also [Using runtime-global libraries inside your app](guide/using-libraries#using-runtime-global-libraries-inside-your-app).
-->
Sass나 Stylus를 사용한다면 `includePaths` 필드를 지정해서 추가 컴포넌트나 전역 스타일을 불러올 수 있습니다.

`includePaths` 필드는 `stylePreprocessorOptions` 옵션 안에 사용합니다:

<code-example language="json">

"stylePreprocessorOptions": {
  "includePaths": [
    "src/style-paths"
  ]
}

</code-example>

이 폴더에 `src/style-paths/_variables.scss`라는 파일이 있다면, 이제 이 파일은 상대경로를 사용하지 않아도 프로젝트에 불러올 수 있습니다:

```ts
// src/app/app.component.scss
// 상대주소는 기본으로 동작합니다.
@import '../style-paths/variables';
// 이 방식도 동작합니다.
@import 'variables';
```

이 방식은 유닛 테스트를 진행하기 위해 `test` 빌더를 별도로 설정할 때도 활용하면 좋습니다.
[앱에서 전역 컨텍스트에 있는 라이브러리 사용하기](guide/using-libraries#using-runtime-global-libraries-inside-your-app) 문서를 참고하세요.


{@a optimization-configuration}

<!--
### Optimization configuration
-->
### 빌드 최적화, 소스 맵 환경설정

<!--
The `optimization` browser builder option can be either a Boolean or an Object for more fine-tune configuration. This option enables various optimizations of the build output, including:

- Minification of scripts and styles
- Tree-shaking
- Dead-code elimination
- Inlining of critical CSS
- Fonts inlining

There are several options that can be used to fine-tune the optimization of an application.

<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>Option</th>
<th width="40%">Description</th>
<th>Value Type</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>scripts</code></td>
<td>Enables optimization of the scripts output.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>styles</code></td>
<td>Enables optimization of the styles output.</td>
<td><code>boolean|<a href="#styles-optimization-options">Styles optimization options</a></code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>fonts</code></td>
<td>Enables optimization for fonts.<br><strong>Note:</strong> This requires internet access.</td>
<td><code class="no-auto-link">boolean|<a href="#fonts-optimization-options">Fonts optimization options</a></code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>
-->
`optimization` 브라우저 빌더 옵션에는 불리언이나 객체를 지정할 수 있습니다.
이 옵션으로 설정할 수 있는 항목은 이런 것들이 있습니다:

- 스크립트/스타일 파일을 압축할 것인지
- 트리 셰이킹 할 것인지
- 데드 코드를 제거할 것인지
- 주요 CSS 파일을 인라인으로 변환할 것인지
- 폰트를 인라인으로 포함할 것인지

그리고 이런 옵션들을 더 지정할 수 있습니다.

<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>옵션</th>
<th width="40%">설명</th>
<th>타입</th>
<th>기본값</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>scripts</code></td>
<td>스크립트 파일을 최적화할 것인지 지정합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>styles</code></td>
<td>스타일 파일을 최적화할 것인지 지정합니다.</td>
<td><code>boolean|<a href="#styles-optimization-options">스타일 최적화 옵션</a></code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>fonts</code></td>
<td>폰트를 최적화할 것인지 지정합니다.<br><strong>참고:</strong> 인터넷 연결이 필요합니다.</td>
<td><code class="no-auto-link">boolean|<a href="#fonts-optimization-options">폰트 최적화 옵션</a></code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>


{@a styles-optimization-options}
<!--
#### Styles optimization options
-->
#### 스타일 최적화 옵션

<!--
<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>Option</th>
<th width="40%">Description</th>
<th>Value Type</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>minify</code></td>
<td>Minify CSS definitions by removing extraneous whitespace and comments, merging identifiers and minimizing values.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>inlineCritical</code></td>
<td>Extract and inline critical CSS definitions to improve <a href="https://web.dev/first-contentful-paint/">First Contentful Paint.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>
-->
<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>옵션</th>
<th width="40%">설명</th>
<th>타입</th>
<th>기본값</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>minify</code></td>
<td>공백문자, 주석을 제거하고 일부 코드를 병합해서 CSS 정의 코드를 압축합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>inlineCritical</code></td>
<td><a href="https://web.dev/first-contentful-paint/">화면이 최초로 그려지는 성능(First Contentful Paint)</a>을 향상시키기 위해 주요 CSS를 추출하고 인라인으로 만듭니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>


{@a fonts-optimization-options}
<!--
#### Fonts optimization options
-->
#### 폰트 최적화 옵션

<!--
<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>Option</th>
<th width="40%">Description</th>
<th>Value Type</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>inline</code></td>
<td>Reduce <a href="https://web.dev/render-blocking-resources/">render blocking requests</a> by inlining external Google fonts and icons CSS definitions in the application's HTML index file.<br><strong>Note:</strong>This requires internet access.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>


You can supply a value such as the following to apply optimization to one or the other:

<code-example language="json">

  "optimization": {
    "scripts": true,
    "styles": {
      "minify": true,
      "inlineCritical": true
    },
    "fonts": true
  }

</code-example>

<div class="alert is-helpful">

   For [Universal](guide/glossary#universal), you can reduce the code rendered in the HTML page by
   setting styles optimization to `true`.

</div>
-->
<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>옵션</th>
<th width="40%">설명</th>
<th>타입</th>
<th>기본값</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>inline</code></td>
<td>애플리케이션의 index 파일에 필요한 외부 Google 폰트, 아이콘 CSS 정의를 인라인으로 심어서 <a href="https://web.dev/render-blocking-resources/">렌더링을 방해하는 요청</a>을 줄입니다.<br><strong>참고:</strong>인터넷 연결이 필요합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
</tbody>
</table>

빌드 최적화 옵션은 이런 형태로도 지정할 수 있습니다:

<code-example language="json">

  "optimization": {
    "scripts": true,
    "styles": {
      "minify": true,
      "inlineCritical": true
    },
    "fonts": true
  }

</code-example>

<div class="alert is-helpful">

   스타일 최적화 옵션을 `true`로 설정하고 Angular [Universal](guide/glossary#universal)을 함께 활용하면 HTML 페이지를 렌더링하기 위해 필요한 코드의 양을 줄일 수 있습니다.

</div>


<!--
### Source map configuration
-->
### 소스맵 환경설정

<!--
The `sourceMap` browser builder option can be either a Boolean or an Object for more fine-tune configuration to control the source maps of an application.

<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>Option</th>
<th width="40%">Description</th>
<th>Value Type</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>scripts</code></td>
<td>Output source maps for all scripts.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>styles</code></td>
<td>Output source maps for all styles.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>vendor</code></td>
<td>Resolve vendor packages source maps.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>false</code></td>
</tr>
<tr>
<td><code>hidden</code></td>
<td>Output source maps used for error reporting tools.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>false</code></td>
</tr>
</tbody>
</table>


The example below shows how to toggle one or more values to configure the source map outputs:

<code-example language="json">

  "sourceMap": {
    "scripts": true,
    "styles": false,
    "hidden": true,
    "vendor": true
  }

</code-example>

<div class="alert is-helpful">

   When using hidden source maps, source maps will not be referenced in the bundle.
   These are useful if you only want source maps to map error stack traces in error reporting tools,
   but don't want to expose your source maps in the browser developer tools.

</div>
-->
`sourceMap` 브라우저 빌더 옵션에는 불리언이나 객체를 지정할 수 있습니다.
이 옵션은 애플리케이션의 소스맵을 어떻게 생성할지 지정합니다.

<table class="is-full-width is-fixed-layout">
<thead>
<tr>
<th>옵션</th>
<th width="40%">설명</th>
<th>타입</th>
<th>기본값</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>scripts</code></td>
<td>모든 스크립트 파일마다 소스맵을 생성합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>styles</code></td>
<td>모든 스타일 파일마다 소스맵을 생성합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>true</code></td>
</tr>
<tr>
<td><code>vendor</code></td>
<td>서드 파티 패키지용 소스맵을 생성합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>false</code></td>
</tr>
<tr>
<td><code>hidden</code></td>
<td>에러 확인툴 용으로 활용하는 소스맵을 생성합니다.</td>
<td><code class="no-auto-link">boolean</code></td>
<td><code>false</code></td>
</tr>
</tbody>
</table>


소스맵 환경설정은 이렇게 지정합니다:

<code-example language="json">

  "sourceMap": {
    "scripts": true,
    "styles": false,
    "hidden": true,
    "vendor": true
  }

</code-example>

<div class="alert is-helpful">

   소스맵을 감추면 빌드 결과물에서 소스맵을 참조하지 않습니다.
   이 옵션은 에러를 처리할 때는 소스맵을 활용하지만 개발자 도구에 노출되는 것을 방지할 때 사용하면 됩니다.

</div>
