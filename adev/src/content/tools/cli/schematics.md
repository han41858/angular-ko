<!--
# Generating code using schematics
-->

<a id="generating-code-using-schematics"></a>

# 스키매틱으로 코드 생성하기

<!--
A schematic is a template-based code generator that supports complex logic.
It is a set of instructions for transforming a software project by generating or modifying code.
Schematics are packaged into collections and installed with npm.

The schematic collection can be a powerful tool for creating, modifying, and maintaining any software project, but is particularly useful for customizing Angular projects to suit the particular needs of your own organization.
You might use schematics, for example, to generate commonly-used UI patterns or specific components, using predefined templates or layouts.
Use schematics to enforce architectural rules and conventions, making your projects consistent and interoperative.
-->

스키매틱은 복잡한 로직을 지원하는 템플릿 기반 코드 생성기입니다.
코드를 생성하거나 수정해서 소프트웨어 프로젝트를 변환하는 명령의 집합입니다.
스키매틱은 컬렉션으로 묶어서 패키지로 배포하며 npm으로 설치합니다.

스키매틱 컬렉션은 어떤 소프트웨어 프로젝트든 생성하고 수정하고 유지보수하는 강력한 도구가 될 수 있지만, Angular 프로젝트를 조직의 요구사항에 맞게 구성할 때 특히 유용합니다.
예를 들어 미리 정의한 템플릿이나 레이아웃으로 자주 사용하는 UI 패턴이나 특정 컴포넌트를 생성할 수 있습니다.
스키매틱으로 아키텍처 규칙과 관례를 적용하면 프로젝트의 일관성과 상호운용성을 유지할 수 있습니다.

<!--
## Schematics for the Angular CLI
-->

<a id="schematics-for-the-angular-cli"></a>

## Angular CLI용 스키매틱

<!--
Schematics are part of the Angular ecosystem.
The Angular CLI uses schematics to apply transforms to a web-app project.
You can modify these schematics, and define new ones to do things like update your code to fix breaking changes in a dependency, for example, or to add a new configuration option or framework to an existing project.

Schematics that are included in the `@schematics/angular` collection are run by default by the commands `ng generate` and `ng add`.
The package contains named schematics that configure the options that are available to the CLI for `ng generate` sub-commands, such as `ng generate component` and `ng generate service`.
The sub-commands for `ng generate` are shorthand for the corresponding schematic.
To specify and generate a particular schematic, or a collection of schematics, using the long form:

```shell

ng generate my-schematic-collection:my-schematic-name

```

or

```shell

ng generate my-schematic-name --collection collection-name

```
-->

스키매틱은 Angular 생태계의 일부입니다.
Angular CLI는 스키매틱으로 웹 앱 프로젝트에 변환 작업을 적용합니다.
이 스키매틱을 수정하거나 새로 정의해서 의존성의 호환성이 깨지는 변경에 맞춰 코드를 수정하거나 기존 프로젝트에 새 설정 옵션이나 프레임워크를 추가할 수 있습니다.

`ng generate`와 `ng add` 명령어는 기본적으로 `@schematics/angular` 컬렉션에 포함된 스키매틱을 실행합니다.
이 패키지에는 `ng generate component`, `ng generate service` 등의 `ng generate` 하위 명령어에서 CLI가 사용할 수 있는 옵션을 설정하는 이름 있는 스키매틱이 들어 있습니다.
`ng generate`의 하위 명령어는 해당 스키매틱을 간단하게 실행하는 표현입니다.
특정 스키매틱이나 스키매틱 컬렉션을 지정해서 생성하려면 전체 형식을 사용하세요:

```shell

ng generate my-schematic-collection:my-schematic-name

```

또는

```shell

ng generate my-schematic-name --collection collection-name

```

<!--
### Configuring CLI schematics
-->

<a id="configuring-cli-schematics"></a>

### CLI 스키매틱 설정하기

<!--
A JSON schema associated with a schematic tells the Angular CLI what options are available to commands and sub-commands, and determines the defaults.
These defaults can be overridden by providing a different value for an option on the command line.
See [Workspace Configuration](reference/configs/workspace-config) for information about how to change the generation option defaults for your workspace.

The JSON schemas for the default schematics used by the CLI to generate projects and parts of projects are collected in the package [`@schematics/angular`](https://github.com/angular/angular-cli/tree/main/packages/schematics/angular).
The schema describes the options available to the CLI for each of the `ng generate` sub-commands, as shown in the `--help` output.
-->

스키매틱에 연결된 JSON 스키마는 명령어와 하위 명령어에서 사용할 수 있는 옵션과 기본값을 Angular CLI에 알려줍니다.
명령줄에서 옵션에 다른 값을 지정하면 이 기본값을 덮어쓸 수 있습니다.
워크스페이스의 생성 옵션 기본값을 변경하는 방법은 [워크스페이스 설정](reference/configs/workspace-config)을 참고하세요.

CLI가 프로젝트와 프로젝트 구성 요소를 생성하는 데 사용하는 기본 스키매틱의 JSON 스키마는 [`@schematics/angular`](https://github.com/angular/angular-cli/tree/main/packages/schematics/angular) 패키지에 모여 있습니다.
이 스키마는 `--help` 출력에 표시되는 것처럼 각 `ng generate` 하위 명령어에서 CLI가 사용할 수 있는 옵션을 설명합니다.

<!--
## Developing schematics for libraries
-->

<a id="developing-schematics-for-libraries"></a>

## 라이브러리용 스키매틱 개발하기

<!--
As a library developer, you can create your own collections of custom schematics to integrate your library with the Angular CLI.

- An _add schematic_ lets developers install your library in an Angular workspace using `ng add`
- _Generation schematics_ can tell the `ng generate` sub-commands how to modify projects, add configurations and scripts, and scaffold artifacts that are defined in your library
- An _update schematic_ can tell the `ng update` command how to update your library's dependencies and adjust for breaking changes when you release a new version

For more details of what these look like and how to create them, see:

<docs-pill-row>
  <docs-pill href="tools/cli/schematics-authoring" title="Authoring Schematics"/>
  <docs-pill href="tools/cli/schematics-for-libraries" title="Schematics for Libraries"/>
</docs-pill-row>
-->

라이브러리 개발자는 커스텀 스키매틱 컬렉션을 만들어서 라이브러리를 Angular CLI와 통합할 수 있습니다.

- _추가 스키매틱_ 을 제공하면 개발자가 `ng add`로 Angular 워크스페이스에 라이브러리를 설치할 수 있습니다.
- _생성 스키매틱_ 은 `ng generate` 하위 명령어에 프로젝트 수정, 설정과 스크립트 추가, 라이브러리에 정의된 구성 요소의 기본 코드 생성 방법을 알려줍니다.
- _업데이트 스키매틱_ 은 새 버전을 배포할 때 `ng update` 명령어에 라이브러리 의존성을 업데이트하고 호환성이 깨지는 변경에 대응하는 방법을 알려줍니다.

구체적인 형태와 작성 방법은 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="tools/cli/schematics-authoring" title="스키매틱 작성하기"/>
  <docs-pill href="tools/cli/schematics-for-libraries" title="라이브러리용 스키매틱"/>
</docs-pill-row>

<!--
### Add schematics
-->

<a id="add-schematics"></a>

### 추가 스키매틱

<!--
An _add schematic_ is typically supplied with a library, so that the library can be added to an existing project with `ng add`.
The `add` command uses your package manager to download new dependencies, and invokes an installation script that is implemented as a schematic.

For example, the [`@angular/material`](https://material.angular.dev/guide/schematics) schematic tells the `add` command to install and set up Angular Material and theming, and register new starter components that can be created with `ng generate`.
Look at this one as an example and model for your own add schematic.

Partner and third party libraries also support the Angular CLI with add schematics.
For example, `@ng-bootstrap/schematics` adds [ng-bootstrap](https://ng-bootstrap.github.io) to an app, and `@clr/angular` installs and sets up [Clarity from VMWare](https://clarity.design/documentation/get-started).

An _add schematic_ can also update a project with configuration changes, add additional dependencies \(such as polyfills\), or scaffold package-specific initialization code.
For example, the `@angular/pwa` schematic turns your application into a PWA by adding an application manifest and service worker.
-->

_추가 스키매틱_ 은 보통 라이브러리와 함께 제공하며, `ng add`로 기존 프로젝트에 라이브러리를 추가할 수 있게 합니다.
`add` 명령어는 패키지 매니저로 새 의존성을 다운로드하고 스키매틱으로 구현된 설치 스크립트를 실행합니다.

예를 들어 [`@angular/material`](https://material.angular.dev/guide/schematics) 스키매틱은 `add` 명령어가 Angular Material과 테마를 설치하고 설정하며, `ng generate`로 생성할 수 있는 새로운 시작용 컴포넌트를 등록하도록 합니다.
추가 스키매틱을 직접 만들 때 이 스키매틱을 예제와 모델로 참고하세요.

파트너와 서드 파티 라이브러리도 추가 스키매틱으로 Angular CLI를 지원합니다.
예를 들어 `@ng-bootstrap/schematics`는 앱에 [ng-bootstrap](https://ng-bootstrap.github.io)을 추가하고, `@clr/angular`는 [VMWare의 Clarity](https://clarity.design/documentation/get-started)를 설치하고 설정합니다.

_추가 스키매틱_ 은 프로젝트의 설정을 변경하거나 추가 의존성(폴리필 등)을 설치하거나 패키지별 초기화 코드를 생성할 수도 있습니다.
예를 들어 `@angular/pwa` 스키매틱은 애플리케이션 매니페스트와 서비스 워커를 추가해서 애플리케이션을 PWA로 만듭니다.

<!--
### Generation schematics
-->

<a id="generation-schematics"></a>

### 생성 스키매틱

<!--
Generation schematics are instructions for the `ng generate` command.
The documented sub-commands use the default Angular generation schematics, but you can specify a different schematic \(in place of a sub-command\) to generate an artifact defined in your library.

Angular Material, for example, supplies generation schematics for the UI components that it defines.
The following command uses one of these schematics to render an Angular Material `<mat-table>` that is pre-configured with a datasource for sorting and pagination.

```shell

ng generate @angular/material:table <component-name>

```
-->

생성 스키매틱은 `ng generate` 명령어를 위한 지침입니다.
문서에 나와 있는 하위 명령어는 기본 Angular 생성 스키매틱을 사용하지만, 하위 명령어 대신 다른 스키매틱을 지정하면 라이브러리에 정의된 구성 요소를 생성할 수 있습니다.

예를 들어 Angular Material은 자체 UI 컴포넌트를 위한 생성 스키매틱을 제공합니다.
다음 명령어는 이러한 스키매틱 중 하나를 사용해서 정렬과 페이지 나누기를 위한 데이터 소스가 미리 설정된 Angular Material `<mat-table>`을 생성합니다.

```shell

ng generate @angular/material:table <component-name>

```

<!--
### Update schematics
-->

<a id="update-schematics"></a>

### 업데이트 스키매틱

<!--
The `ng update` command can be used to update your workspace's library dependencies.
If you supply no options or use the help option, the command examines your workspace and suggests libraries to update.

```shell

ng update
We analyzed your package.json, there are some packages to update:

    Name                                      Version                     Command to update
    --------------------------------------------------------------------------------
    @angular/cdk                       7.2.2 -> 7.3.1           ng update @angular/cdk
    @angular/cli                       7.2.3 -> 7.3.0           ng update @angular/cli
    @angular/core                      7.2.2 -> 7.2.3           ng update @angular/core
    @angular/material                  7.2.2 -> 7.3.1           ng update @angular/material
    rxjs                                      6.3.3 -> 6.4.0           ng update rxjs

```

If you pass the command a set of libraries to update, it updates those libraries, their peer dependencies, and the peer dependencies that depend on them.

HELPFUL: If there are inconsistencies \(for example, if peer dependencies cannot be matched by a simple [semver](https://semver.io) range\), the command generates an error and does not change anything in the workspace.

We recommend that you do not force an update of all dependencies by default.
Try updating specific dependencies first.

For more about how the `ng update` command works, see [Update Command](https://github.com/angular/angular-cli/blob/main/docs/specifications/update.md).

If you create a new version of your library that introduces potential breaking changes, you can provide an _update schematic_ to enable the `ng update` command to automatically resolve any such changes in the project being updated.

For example, suppose you want to update the Angular Material library.

```shell
ng update @angular/material
```

This command updates both `@angular/material` and its dependency `@angular/cdk` in your workspace's `package.json`.
If either package contains an update schematic that covers migration from the existing version to a new version, the command runs that schematic on your workspace.
-->

`ng update` 명령어로 워크스페이스의 라이브러리 의존성을 업데이트할 수 있습니다.
옵션을 지정하지 않거나 도움말 옵션을 사용하면 워크스페이스를 검사하고 업데이트할 라이브러리를 제안합니다.

```shell

ng update
We analyzed your package.json, there are some packages to update:

    Name                                      Version                     Command to update
    --------------------------------------------------------------------------------
    @angular/cdk                       7.2.2 -> 7.3.1           ng update @angular/cdk
    @angular/cli                       7.2.3 -> 7.3.0           ng update @angular/cli
    @angular/core                      7.2.2 -> 7.2.3           ng update @angular/core
    @angular/material                  7.2.2 -> 7.3.1           ng update @angular/material
    rxjs                                      6.3.3 -> 6.4.0           ng update rxjs

```

업데이트할 라이브러리 목록을 명령어에 전달하면 해당 라이브러리, 그 피어 의존성, 해당 라이브러리를 피어 의존성으로 사용하는 의존성을 업데이트합니다.

도움말: 의존성이 일관되지 않으면(예를 들어 간단한 [semver](https://semver.io) 범위로 피어 의존성을 맞출 수 없다면) 명령어는 오류를 발생시키고 워크스페이스를 변경하지 않습니다.

처음부터 모든 의존성을 강제로 업데이트하는 방식은 권장하지 않습니다.
먼저 특정 의존성부터 업데이트해 보세요.

`ng update` 명령어의 동작 방식은 [업데이트 명령어](https://github.com/angular/angular-cli/blob/main/docs/specifications/update.md)를 참고하세요.

호환성이 깨질 수 있는 변경을 포함한 새 라이브러리 버전을 만든다면 _업데이트 스키매틱_ 을 제공해서 `ng update` 명령어가 업데이트 대상 프로젝트에 필요한 변경을 자동으로 적용하게 할 수 있습니다.

예를 들어 Angular Material 라이브러리를 업데이트한다고 해 봅시다.

```shell
ng update @angular/material
```

이 명령어는 워크스페이스의 `package.json`에서 `@angular/material`과 그 의존성인 `@angular/cdk`를 모두 업데이트합니다.
둘 중 어느 패키지든 기존 버전에서 새 버전으로 마이그레이션하는 업데이트 스키매틱이 있다면 워크스페이스에서 해당 스키매틱을 실행합니다.
