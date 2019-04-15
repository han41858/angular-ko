<h1 class="no-toc">CLI Command Reference</h1>

<!-- The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications. You can use the tool directly in a command shell, or indirectly through an interactive UI such as [Angular Console](https://angularconsole.com). -->
Angular CLI는 Angular 애플리케이션을 초기화, 개발, Scaffold, 유지 및 관리하는데 사용하는 명령 줄 인터페이스 도구입니다. 이 도구를 Command Shell에서 직접 사용할 수 있으며, [Angular Console](https://angularconsole.com)과 같은 대화형 UI를 통해 간접적으로도 사용할 수 있습니다.
## Installing Angular CLI

<!-- Major versions of Angular CLI follow the supported major version of Angular, but minor versions can be released separately.

Install the CLI using the `npm` package manager: -->
Angular CLI의 주요 버전은 Angular를 지원하는 주 버전을 따르지만, 별도로 보조 버전으로 릴리즈할 수 있습니다.

`npm` 패키지 관리자를 사용하여 CLI를 설치해보세요:

<code-example format="." language="bash">
npm install -g @angular/cli
</code-example>

<!-- For details about changes between versions, and information about updating from previous releases,
see the Releases tab on GitHub: https://github.com/angular/angular-cli/releases -->

버전 사이의 자세한 변경사항과 또는 업데이트에 대한 자세한 내용은 GitHub: https://github.com/angular/angular-cli/releases의 릴리즈 탭을 참조해주세요.

## Basic workflow

<!-- Invoke the tool on the command line through the `ng` executable.
Online help is available on the command line.
Enter the following to list commands or options for a given command (such as [generate](cli/generate)) with a short description. -->

명령 줄에서 `ng` 실행 명령어를 입력하여 도구를 호출하세요.
온라인 도움말을 명령 줄에서도 이용 가능합니다.
지정된 명령(예: [generate](cli/generate))에 대한 명령 또는 옵션을 간단한 설명으로 확인하고 싶으시면, 다음의 명령어를 입력해주세요.

<code-example format="." language="bash">
ng help
ng generate --help
</code-example>

<!-- To create, build, and serve a new, basic Angular project on a development server, go to the parent directory of your new workspace use the following commands: -->

개발 서버에서, 새로운 프로젝트를 만들고, 빌드 및 서비스하려면, 새 workspace의 상위 디렉터리에서 아래의 명령어를 입력하고, workspace로 이동하세요.

<code-example format="." language="bash">
ng new my-first-project
cd my-first-project
ng serve
</code-example>

<!-- In your browser, open http://localhost:4200/ to see the new app run.
When you use the [ng serve](cli/serve) command to build an app and serve it locally, the server automatically rebuilds the app and reloads the page when you change any of the source files. -->

브라우저에서 http://localhost:4200/ 를 입력하여 새로운 앱이 실행되는지 확인합니다. [ng serve](cli/serve) 명령을 사용하여 앱을 빌드시키고, 로컬로 서비스할 때, 원본 파일을 변경하면 서버가 자동으로 앱을 재구성하고 페이지를 다시 로드합니다.

## Workspaces and project files

<!-- The [ng new](cli/new) command creates an *Angular workspace* folder and generates a new app skeleton.
A workspace can contain multiple apps and libraries.
The initial app created by the [ng new](cli/new) command is at the top level of the workspace.
When you generate an additional app or library in a workspace, it goes into a `projects/` subfolder. -->

[ng new](cli/new) 명령어는 *Angular workspace* 폴더를 생성하고 새로운 앱 뼈대를 생성합니다.
workspace는 여러 개의 앱과 라이브러리가 포함될 수 있습니다.
[ng new](cli/new) 명령어로 생성된 초기 응용 프로그램은 workspace의 최상위층에 있습니다.
workspace에서 추가적인 앱 또는 라이브러리를 생성하면 `project/`의 하위 폴더로 이동합니다.

<!-- A newly generated app contains the source files for a root module, with a root component and template.
Each app has a `src` folder that contains the logic, data, and assets. -->

새로 생성된 앱은 root 구성요소와 템플릿, 그리고 root 모듈용 소스 파일을 포함하고 있습니다.
각 앱에는 logic, data 그리고 asserts를 포함하는 `src` 폴더가 있습니다.

<!-- You can edit the generated files directly, or add to and modify them using CLI commands.
Use the [ng generate](cli/generate) command to add new files for additional components and services, and code for new pipes, directives, and so on.
Commands such as [add](cli/add) and [generate](cli/generate), which create or operate on apps and libraries, must be executed from within a workspace or project folder. -->

생성된 파일을 직접 편집하거나 CLI 명령어를 이용하여 추가 및 수정할 수 있습니다.
[ng generate](cli/generate) 명령어를 이용하여 추가적인 구성요소 및 서비스를 추가하거나 새로운 pipe, directives 등에 대한 코드를 작성하세요.
앱과 라이브러리를 생성하거나 작동하는 [add](cli/add) 및 [generate](cli/generate) 같은 명령어는 반드시 작업 영역 또는 프로젝트 폴더 내에서 실행되어야 합니다.

<!-- * See more about the [Workspace file structure](guide/file-structure). -->
* [workspace 파일 구조](guide/file-structure)에 대해서 자세히 알아보세요.

### Workspace and project configuration

<!-- A single workspace configuration file, `angular.json`, is created at the top level of the workspace.
This is where you can set per-project defaults for CLI command options, and specify configurations to use when the CLI builds a project for different targets. -->

하나의 workspace 구성 파일인 `angular.json`이 workspace의 최상위층에 작성됩니다.
여기에서 CLI 명령 옵션에 대한 프로젝트별로 기본값을 설정할 수 있으며, CLI가 다른 대상에 대해서 프로젝트를 빌드할 때 사용할 구성 값을 설정할 수 있습니다.

<!-- The [ng config](cli/config) command lets you set and retrieve configuration values from the command line, or you can edit the `angular.json` file directly.
Note that option names in the configuration file must use [camelCase](guide/glossary#case-types), while option names supplied to commands can use either camelCase or dash-case. -->

[ng config](cli/config) 명령어를 사용하여 명령 줄에서 구성 값을 설정 및 검색하거나, `angular.json` 파일을 직접 편집할 수 있습니다.
구성 파일의 옵션 이름에는 [camelCase](guide/glossary#case-types)가 반드시 사용되어야 하며, 명령에 제공된 옵션 이름에는 camelCase 또는 dash-case를 사용할 수 있습니다.

<!-- * See more about [Workspace Configuration](guide/workspace-config).
* See the [complete schema](https://github.com/angular/angular-cli/wiki/angular-workspace) for `angular.json`. -->
* [Workspace 구성](guide/workspace-config)에 대한 자세한 내용을 알아보세요.
* `angular.json`의 [전체 스키마](https://github.com/angular/angular-cli/wiki/angular-workspace)에 대한 자세한 내용을 알아보세요.

## CLI command-language syntax

<!-- Command syntax is shown as follows: -->
명령 구문은 다음과 같습니다.

`ng` *commandNameOrAlias* *requiredArg* [*optionalArg*] `[options]`

<!-- * Most commands, and some options, have aliases. Aliases are shown in the syntax statement for each command. -->

* 대부분의 명령어와 일부 옵션에는 별칭이 있습니다. 별칭은 각 명령에 대한 구문 문에 표시됩니다.

<!-- * Option names are prefixed with a double dash (--).
    Option aliases are prefixed with a single dash (-).
    Arguments are not prefixed.
    For example:  -->
* 옵션 이름의 접두사는 이중 대시(--)입니다.
    옵션의 별칭 앞에는 단일 대시(-)가 붙습니다.
    인수에는 접두사가 붙지 않습니다.
    예를 들면 아래와 같습니다:

    <code-example format="." language="bash">
        ng build my-app -c production
    </code-example>

<!-- * Typically, the name of a generated artifact can be given as an argument to the command or specified with the --name option. -->

* 일반적으로, 생성된 아티팩트의 이름은 명령에 대한 인수로 지정하거나 --name 옵션을 사용하여 지정할 수 있습니다.

<!-- * Argument and option names can be given in either
[camelCase or dash-case](guide/glossary#case-types).
`--myOptionName` is equivalent to `--my-option-name`. -->

* 인수와 옵션 이름은 다음 중 하나로 지정할 수 있습니다.
[camelCase or dash-case](guide/glossary#case-types).
`--myOptionName`은 `--my-option-name`와 같습니다.

### Boolean and enumerated options

<!-- Boolean options have two forms: `--thisOption` sets the flag, `--noThisOption` clears it.
If neither option is supplied, the flag remains in its default state, as listed in the reference documentation.

Allowed values are given with each enumerated option description, with the default value in **bold**. -->

Boolean 옵션은 두 가지 형태가 있습니다: `--thisOption`은 플래그를 설정합니다. `--noThisOption` 이 옵션은 플래그를 삭제합니다.
두 옵션 모두 지정하지 않으면, 해당 플래그는 참조 문서에 나열된 대로 기본 상태로 유지됩니다.

허용되는 값은 각 열거된 각 옵션과 함께 제공되며 기본값은 **bold**입니다.

### Relative paths

<!-- Options that specify files can be given as absolute paths, or as paths relative to the current working directory, which is generally either the workspace or project root. -->

파일을 지정하는 옵션은 절대 경로 또는 현재 작업 디렉터리(일반적으로 workspace 또는 프로젝트 루트)에 상대적인 경로로 지정할 수 있습니다.

### Schematics

<!-- The [ng generate](cli/generate) and  [ng add](cli/add) commands take as an argument the artifact or library to be generated or added to the current project.
In addition to any general options, each artifact or library defines its own options in a *schematic*.
Schematic options are supplied to the command in the same format as immediate command options. -->

[ng generate](cli/generate)및 [ng add](cli/add) 명령어는 현재 프로젝트에 생성되거나 추가된 아티팩트 또는 라이브러리를 인수로 사용합니다.
각 아티팩트 또는 라이브러리는 일반 옵션 외에도 *schematic*에서 고유한 옵션을 정의합니다.
Schematic 옵션은 즉시 명령 옵션과 동일한 형식으로 명령에 제공됩니다.