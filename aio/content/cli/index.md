<!--
# CLI Overview and Command Reference
-->
# CLI Overview and Command Reference
<!-- # CLI 개요, 명령 -->

<!--
The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications directly from a command shell.
-->
Angular CLI는 커맨드라인 인터페이스 툴입니다.
이 툴을 활용하면 커맨드 셸에서 직접 Angular 애플리케이션을 생성하거나, 개발할 수 있고, 구성요소를 생성할 수 있으며, 유지보수할 수 있습니다.


<!--
## Installing Angular CLI
-->
## Angular CLI 설치하기

<!--
Major versions of Angular CLI follow the supported major version of Angular, but minor versions can be released separately.

Install the CLI using the `npm` package manager:
<code-example language="bash">
npm install -g @angular/cli
</code-example>

For details about changes between versions, and information about updating from previous releases,
see the Releases tab on GitHub: https://github.com/angular/angular-cli/releases
-->
Angular CLI의 메이저 버전은 Angular의 메이저 버전에 따라 배포되지만, 마이너 버전이 별도로 배포될 수 있습니다.

Angular CLI를 설치하려면 `npm` 패키지 매니저로 이런 명령을 실행하면 됩니다:1

<code-example language="bash">
npm install -g @angular/cli
</code-example>

새 버전에서 어떤 내용이 변경되었는지 확인하려면 GitHub 릴리즈 탭을 참고하세요: https://github.com/angular/angular-cli/releases


<!--
## Basic workflow
-->
## 기본 사용방법

<!--
Invoke the tool on the command line through the `ng` executable.
Online help is available on the command line.
Enter the following to list commands or options for a given command (such as [generate](cli/generate)) with a short description.

<code-example language="bash">
ng help
ng generate --help
</code-example>

To create, build, and serve a new, basic Angular project on a development server, go to the parent directory of your new workspace use the following commands:

<code-example language="bash">
ng new my-first-project
cd my-first-project
ng serve
</code-example>

In your browser, open http://localhost:4200/ to see the new application run.
When you use the [ng serve](cli/serve) command to build an application and serve it locally, the server automatically rebuilds the application and reloads the page when you change any of the source files.

<div class="alert is-helpful">

   When you run `ng new my-first-project` a new folder, named `my-first-project`, will be created in the current working directory. Since you want to be able to create files inside that folder, make sure you have sufficient rights in the current working directory before running the command.

   If the current working directory is not the right place for your project, you can change to a more appropriate directory by running `cd <path-to-other-directory>` first.

</div>
-->
Angular CLI는 커맨드라인에서 `ng` 명령으로 실행할 수 있으며, 이 명령을 활용하면 커맨드라인에서 온라인 도움말을 사용할 수도 있습니다.
아래 명령을 실행하면 Angular CLI로 실행할 수 있는 명령에 대해 알아볼 수 있으며, [generate](cli/generate)와 같은 세부 명령에 대한 정보도 확인할 수 있습니다.

<code-example language="bash">
ng help
ng generate --help
</code-example>

개발 서버에 Angular 프로젝트를 생성하거나 빌드하고 실행하려면 원하는 위치로 이동해서 이런 명령을 실행하면 됩니다:

<code-example language="bash">
ng new my-first-project
cd my-first-project
ng serve
</code-example>

이 명령들을 실행한 후에 브라우저에서 http://localhost:4200 로 접근하면 애플리케이션이 실행되는 것을 확인할 수 있습니다.
[ng serve](cli/serve) 명령을 실행하면 로컬 개발환경에서 애플리케이션을 빌드한 후에 서버를 실행하며, 소스 코드가 변경되면 자동으로 재빌드하고 화면을 갱신합니다.


<div class="alert is-helpful">

`ng new my-first-project` 명령을 실행하면 현재 폴더에 `my-first-project`라는 폴더가 새로 생성됩니다.
앞으로 작업은 이렇게 생성된 폴더 안에서 하기 때문에, 명령을 실행하기 전에 해당 폴더에서 작업할 권한이 있는지 꼭 확인하세요.

현재 위치한 폴더가 아니라 다른 폴더에 프로젝트를 생성하려면 `cd <다른-폴더>` 명령을 실행해서 적절한 위치로 이동해야 합니다.

</div>


<!--
## Workspaces and project files
-->
## 워크스페이스, 프로젝트 파일

<!--
The [ng new](cli/new) command creates an *Angular workspace* folder and generates a new application skeleton.
A workspace can contain multiple applications and libraries.
The initial application created by the [ng new](cli/new) command is at the top level of the workspace.
When you generate an additional application or library in a workspace, it goes into a `projects/` subfolder.

A newly generated application contains the source files for a root module, with a root component and template.
Each application has a `src` folder that contains the logic, data, and assets.

You can edit the generated files directly, or add to and modify them using CLI commands.
Use the [ng generate](cli/generate) command to add new files for additional components and services, and code for new pipes, directives, and so on.
Commands such as [add](cli/add) and [generate](cli/generate), which create or operate on applications and libraries, must be executed from within a workspace or project folder.

* See more about the [Workspace file structure](guide/file-structure).
-->
[ng new](cli/new) 명령을 실행하면 *Angular 워크스페이스* 폴더를 생성하고 이 폴더 안에 애플리케이션 기본 코드를 생성합니다.
워크스페이스에는 애플리케이션과 라이브러리가 여러개 존재할 수도 있습니다.
[ng new](cli/new) 명령을 실행하면 워크스페이스 최상위 계층에 애플리케이션이 생성됩니다.
이후에 이 워크스페이스에서 추가로 애플리케이션이나 라이브러리를 생성하면 이 프로젝트는 `proejcts/` 폴더 아래 생성됩니다.

자동으로 생성된 애플리케이션에는 최상위 컴포넌트, 템플릿이 들어있습니다.
그리고 `src` 폴더 아래 애플리케이션에 필요한 로직, 데이터, 리소스가 들어갑니다.

이렇게 생성된 파일들은 직접 수정할 수 있으며, Angular CLI를 사용해서 더 추가하거나 수정할 수 있습니다.
[ng generate](cli/generate) 명령을 실행하면 컴포넌트, 서비스, 파이프, 디렉티브 등을 생성할 수 있습니다.
Angular 명령 중에서 [add](cli/add)나 [generate](cli/generate) 명령과 같이 애플리케이션이나 라이브러리를 대상으로 동작하는 명령은 반드시 워크스페이스나 프로젝트 폴더 안에서 실행해야 합니다.

* 자세한 내용은 [워크스페이스 파일 구조](guide/file-structure) 문서를 참고하세요.


<!--
### Workspace and project configuration
-->
### 워크스페이스, 프로젝트 환경설정

<!--
A single workspace configuration file, `angular.json`, is created at the top level of the workspace.
This is where you can set per-project defaults for CLI command options, and specify configurations to use when the CLI builds a project for different targets.

The [ng config](cli/config) command lets you set and retrieve configuration values from the command line, or you can edit the `angular.json` file directly.
Note that option names in the configuration file must use [camelCase](guide/glossary#case-types), while option names supplied to commands can use either camelCase or dash-case.

* See more about [Workspace Configuration](guide/workspace-config).
* See the [complete schema](https://github.com/angular/angular-cli/wiki/angular-workspace) for `angular.json`.
-->
워크스페이스 환경설정 파일 `angular.json`은 워크스페이스 최상위 폴더에 생성됩니다.
이 파일에는 Angular CLI 명령이 동작할 때 활용되는 옵션이나 빌드할 대상 등을 지정합니다.

[ng config](cli/config) 명령을 실행하면 커맨드라인에서 이 환경설정 파일의 내용을 변경할 수 있습니다.
`angular.json` 파일을 직접 수정해도 됩니다.
이 때 커맨드라인에서는 캐멀 케이스(camelCase)나 대시 케이스(dash-case)로 사용하는 옵션의 이름도 환경설정 파일 안에서는 반드시 [캐멀 케이스(camelCase)](guide/glossary#case-types)로 사용해야 합니다.

* 자세한 내용은 [워크스페이스 환경설정](guide/workspace-config) 문서를 참고하세요.
* `angular.json` 파일에 적용되는 [스키마 전체 목록](https://github.com/angular/angular-cli/wiki/angular-workspace)도 확인해 보세요.


<!--
## CLI command-language syntax
-->
## CLI 명령어 사용방법

<!--
Command syntax is shown as follows:

`ng` *commandNameOrAlias* *requiredArg* [*optionalArg*] `[options]`

* Most commands, and some options, have aliases. Aliases are shown in the syntax statement for each command.

* Option names are prefixed with a double dash (--).
    Option aliases are prefixed with a single dash (-).
    Arguments are not prefixed.
    For example:
    <code-example language="bash">
        ng build my-app -c production
    </code-example>

* Typically, the name of a generated artifact can be given as an argument to the command or specified with the --name option.

* Argument and option names can be given in either
[camelCase or dash-case](guide/glossary#case-types).
`--myOptionName` is equivalent to `--my-option-name`.
-->
Angular CLI로 명령을 실행하는 방법은 이렇습니다:

`ng` *commandNameOrAlias* *requiredArg* [*optionalArg*] `[options]`

* 명령이나 옵션은 별칭(alias)이 존재하는 경우가 많습니다. 아래 표를 확인해 보세요.

* 옵션 이름은 대시 2개(`--`)로 시작합니다.
  그리고 옵션의 별칭은 대시 1개(`-`)로 시작합니다.
  인자에는 접두사가 없습니다.
  그래서 이렇게 사용합니다:

    <code-example language="bash">
        ng build my-app -c production
    </code-example>

* [`ng generate`](cli/generate) 명령으로 생성하려는 대상은 커맨드라인에서 인자로 지정하거나 --name 옵션으로 지정합니다.

* 인자나 옵션 이름은 [캐멀 케이스나 대시-케이스](guide/glossary#case-types)를 모두 사용할 수 있습니다.
`--myOptionName`은 `--my-option-name`과 같습니다.


<!--
### Boolean options
-->
### 불리언 옵션

<!--
Boolean options have two forms: `--this-option` sets the flag to `true`, `--no-this-option` sets it to `false`.
If neither option is supplied, the flag remains in its default state, as listed in the reference documentation.
-->
불리언 옵션은 두 가지 형태로 사용됩니다.
`--thisOption`은 플래그 값을 `true`로 설정하며, `--noThisOption`은 해당 플래그 값을 `false`로 설정합니다.
옵션값이 지정되지 않으면 기본값이 사용됩니다.


<!--
### Relative paths
-->
### 상대 경로

<!--
Options that specify files can be given as absolute paths, or as paths relative to the current working directory, which is generally either the workspace or project root.
-->
옵션값으로 특정 파일을 가리키려면 절대주소를 사용하거나 현재 작업중인 폴더를 기준으로 상대주소로 사용하면 됩니다.
워크스페이스 폴더나 프로젝트 폴더인 경우에도 그렇습니다.


<!--
### Schematics
-->
### 스키매틱

<!--
The [ng generate](cli/generate) and  [ng add](cli/add) commands take as an argument the artifact or library to be generated or added to the current project.
In addition to any general options, each artifact or library defines its own options in a *schematic*.
Schematic options are supplied to the command in the same format as immediate command options.
-->
[ng generate](cli/generate) 명령이나 [ng add](cli/add) 명령은 현재 프로젝트에 생성할 Angular 구성요소를 인자로 하나 받습니다.
이 인자에 사용할 수 있는 옵션은 개별 해당 인자의 *스키매틱(schematic)*에 정의되어 있습니다.
스키매틱 옵션은 Angular CLI 명령에 옵션을 사용한 것과 같은 방식으로 지정합니다.