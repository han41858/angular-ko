<!--
# Setting up the local environment and workspace
-->

<a id="setting-up-the-local-environment-and-workspace"></a>

# 로컬 환경과 워크스페이스 설정하기

<!--
This guide explains how to set up your environment for Angular development using the [Angular CLI](cli 'CLI command reference').
It includes information about installing the CLI, creating an initial workspace and starter app, and running that app locally to verify your setup.

<docs-callout title="Try Angular without local setup">

If you are new to Angular, you might want to start with [Try it now!](tutorials/learn-angular), which introduces the essentials of Angular in your browser.
This standalone tutorial takes advantage of the interactive [StackBlitz](https://stackblitz.com) environment for online development.
You don't need to set up your local environment until you're ready.

</docs-callout>
-->

이 가이드에서는 [Angular CLI](cli 'CLI 명령 레퍼런스')로 Angular 개발 환경을 설정하는 방법을 알아봅니다.
CLI 설치, 초기 워크스페이스와 시작용 앱 생성, 설정 확인을 위한 로컬 앱 실행 방법을 설명합니다.

<docs-callout title="로컬 환경을 설정하지 않고 Angular 체험하기">

Angular를 처음 사용한다면 브라우저에서 Angular의 핵심을 소개하는 [지금 시작하기](tutorials/learn-angular)부터 살펴보세요.
이 독립적인 튜토리얼은 온라인 개발을 위한 대화형 [StackBlitz](https://stackblitz.com) 환경을 활용합니다.
준비가 될 때까지 로컬 환경을 설정하지 않아도 됩니다.

</docs-callout>

<!--
## Before you start
-->

<a id="before-you-start"></a>

## 시작하기 전에

<!--
To use Angular CLI, you should be familiar with the following:

<docs-pill-row>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"/>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/HTML" title="HTML"/>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="CSS"/>
</docs-pill-row>

You should also be familiar with usage of command line interface (CLI) tools and have a general understanding of command shells.
Knowledge of [TypeScript](https://www.typescriptlang.org) is helpful, but not required.
-->

Angular CLI를 사용하려면 다음 기술에 익숙해야 합니다:

<docs-pill-row>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"/>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/HTML" title="HTML"/>
  <docs-pill href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="CSS"/>
</docs-pill-row>

명령줄 인터페이스(CLI) 도구 사용법과 명령어 셸의 기본 개념도 알고 있어야 합니다.
[TypeScript](https://www.typescriptlang.org)를 알고 있으면 도움이 되지만 필수는 아닙니다.

<!--
## Dependencies
-->

<a id="dependencies"></a>

## 의존성

<!--
To install Angular CLI on your local system, you need to install [Node.js](https://nodejs.org/).
Angular CLI uses Node and its associated package manager, npm, to install and run JavaScript tools outside the browser.

[Download and install Node.js](https://nodejs.org/en/download), which will include the `npm` CLI as well.
Angular requires an [active LTS or maintenance LTS](https://nodejs.org/en/about/previous-releases) version of Node.js.
See [Angular's version compatibility](reference/versions) guide for more information.
-->

로컬 시스템에 Angular CLI를 설치하려면 [Node.js](https://nodejs.org/)가 필요합니다.
Angular CLI는 Node와 패키지 매니저인 npm을 사용해서 브라우저 밖에서 JavaScript 도구를 설치하고 실행합니다.

[Node.js를 다운로드하고 설치](https://nodejs.org/en/download)하면 `npm` CLI도 함께 설치됩니다.
Angular를 사용하려면 [활성 LTS 또는 유지보수 LTS](https://nodejs.org/en/about/previous-releases) 버전의 Node.js가 필요합니다.
자세한 내용은 [Angular 버전 호환성](reference/versions) 가이드를 참고하세요.

<!--
## Install the Angular CLI
-->

<a id="install-the-angular-cli"></a>

## Angular CLI 설치하기

<!--
To install the Angular CLI, open a terminal window and run the following command:

<docs-code-multifile>
   <docs-code
     header="npm"
     language="shell"
     >
     npm install -g @angular/cli
     </docs-code>
   <docs-code
     header="pnpm"
     language="shell"
     >
     pnpm install -g @angular/cli
     </docs-code>
   <docs-code
     header="yarn"
     language="shell"
     >
     yarn global add @angular/cli
     </docs-code>
   <docs-code
     header="bun"
     language="shell"
     >
     bun install -g @angular/cli
     </docs-code>

 </docs-code-multifile>
-->

Angular CLI를 설치하려면 터미널 창을 열고 다음 명령어를 실행하세요:

<docs-code-multifile>
   <docs-code
     header="npm"
     language="shell"
     >
     npm install -g @angular/cli
     </docs-code>
   <docs-code
     header="pnpm"
     language="shell"
     >
     pnpm install -g @angular/cli
     </docs-code>
   <docs-code
     header="yarn"
     language="shell"
     >
     yarn global add @angular/cli
     </docs-code>
   <docs-code
     header="bun"
     language="shell"
     >
     bun install -g @angular/cli
     </docs-code>

 </docs-code-multifile>

<!--
### Powershell execution policy
-->

<a id="powershell-execution-policy"></a>

### PowerShell 실행 정책

<!--
On Windows client computers, the execution of PowerShell scripts is disabled by default, so the above command may fail with an error.
To allow the execution of PowerShell scripts, which is needed for npm global binaries, you must set the following <a href="https://docs.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies" target="_blank">execution policy</a>:

```sh

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

```

Carefully read the message displayed after executing the command and follow the instructions. Make sure you understand the implications of setting an execution policy.
-->

Windows 클라이언트 컴퓨터에서는 기본적으로 PowerShell 스크립트 실행이 비활성화되어 있기 때문에 위 명령어를 실행하면 오류가 발생할 수 있습니다.
npm 전역 실행 파일에 필요한 PowerShell 스크립트 실행을 허용하려면 다음 <a href="https://docs.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies" target="_blank">실행 정책</a>을 설정해야 합니다:

```sh

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

```

명령어 실행 후 표시되는 메시지를 주의 깊게 읽고 안내를 따르세요.
실행 정책을 설정하면 어떤 영향을 미치는지 이해해야 합니다.

<!--
### Unix permissions
-->

<a id="unix-permissions"></a>

### Unix 권한

<!--
On some Unix-like setups, global scripts may be owned by the root user, so to the above command may fail with a permission error.
Run with `sudo` to execute the command as the root user and enter your password when prompted:

<docs-code-multifile>
   <docs-code
     header="npm"
     language="shell"
     >
     sudo npm install -g @angular/cli
     </docs-code>
   <docs-code
     header="pnpm"
     language="shell"
     >
     sudo pnpm install -g @angular/cli
     </docs-code>
   <docs-code
     header="yarn"
     language="shell"
     >
     sudo yarn global add @angular/cli
     </docs-code>
   <docs-code
     header="bun"
     language="shell"
     >
     sudo bun install -g @angular/cli
     </docs-code>

 </docs-code-multifile>

Make sure you understand the implications of running commands as root.
-->

일부 Unix 계열 환경에서는 전역 스크립트의 소유자가 root 사용자이기 때문에 위 명령어를 실행하면 권한 오류가 발생할 수 있습니다.
`sudo`를 사용해서 root 사용자 권한으로 명령어를 실행하고, 비밀번호를 요청하면 입력하세요:

<docs-code-multifile>
   <docs-code
     header="npm"
     language="shell"
     >
     sudo npm install -g @angular/cli
     </docs-code>
   <docs-code
     header="pnpm"
     language="shell"
     >
     sudo pnpm install -g @angular/cli
     </docs-code>
   <docs-code
     header="yarn"
     language="shell"
     >
     sudo yarn global add @angular/cli
     </docs-code>
   <docs-code
     header="bun"
     language="shell"
     >
     sudo bun install -g @angular/cli
     </docs-code>

 </docs-code-multifile>

root 권한으로 명령어를 실행하면 어떤 영향을 미치는지 이해해야 합니다.

<!--
## Create a workspace and initial application
-->

<a id="create-a-workspace-and-initial-application"></a>

## 워크스페이스와 초기 애플리케이션 생성하기

<!--
You develop apps in the context of an Angular **workspace**.

To create a new workspace and initial starter app, run the CLI command `ng new` and provide the name `my-app`, as shown here, then answer prompts about features to include:

```shell

ng new my-app

```

The Angular CLI installs the necessary Angular npm packages and other dependencies.
This can take a few minutes.

The CLI creates a new workspace and a small welcome app in a new directory with the same name as the workspace, ready to run.
Navigate to the new directory so subsequent commands use this workspace.

```shell

cd my-app

```
-->

Angular 앱은 **워크스페이스** 안에서 개발합니다.

새 워크스페이스와 시작용 앱을 생성하려면 다음과 같이 CLI의 `ng new` 명령어에 `my-app`이라는 이름을 지정해서 실행한 뒤, 포함할 기능을 묻는 질문에 답하면 됩니다:

```shell

ng new my-app

```

Angular CLI는 필요한 Angular npm 패키지와 다른 의존성을 설치합니다.
이 과정에는 몇 분 정도 걸릴 수 있습니다.

CLI는 워크스페이스와 같은 이름의 새 디렉터리에 워크스페이스와 바로 실행할 수 있는 작은 환영 앱을 생성합니다.
이후 명령어가 이 워크스페이스에서 실행되도록 새 디렉터리로 이동하세요.

```shell

cd my-app

```

<!--
## Run the application
-->

<a id="run-the-application"></a>

## 애플리케이션 실행하기

<!--
The Angular CLI includes a development server, for you to build and serve your app locally. Run the following command:

```shell

ng serve --open

```

The `ng serve` command launches the server, watches your files, as well as rebuilds the app and reloads the browser as you make changes to those files.

The `--open` (or just `-o`) option automatically opens your browser to `http://localhost:4200/` to view the generated application.
-->

Angular CLI에는 앱을 로컬에서 빌드하고 제공하는 개발 서버가 포함되어 있습니다.
다음 명령어를 실행하세요:

```shell

ng serve --open

```

`ng serve` 명령어는 서버를 시작하고 파일의 변경을 감지하며, 파일이 변경되면 앱을 다시 빌드하고 브라우저를 새로고침합니다.

`--open`(또는 `-o`) 옵션을 지정하면 브라우저에서 `http://localhost:4200/`을 자동으로 열어서 생성된 애플리케이션을 보여줍니다.

<!--
## Workspaces and project files
-->

<a id="workspaces-and-project-files"></a>

## 워크스페이스와 프로젝트 파일

<!--
The [`ng new`](cli/new) command creates an [Angular workspace](reference/configs/workspace-config) folder and generates a new application inside it.
A workspace can contain multiple applications and libraries.
The initial application created by the [`ng new`](cli/new) command is at the root directory of the workspace.
When you generate an additional application or library in an existing workspace, it goes into a `projects/` subfolder by default.

A newly generated application contains the source files for a root component and template.
Each application has a `src` folder that contains its components, data, and assets.

You can edit the generated files directly, or add to and modify them using CLI commands.
Use the [`ng generate`](cli/generate) command to add new files for additional components, directives, pipes, services, and more.
Commands such as [`ng add`](cli/add) and [`ng generate`](cli/generate), which create or operate on applications and libraries, must be executed
from within a workspace. By contrast, commands such as `ng new` must be executed _outside_ a workspace because they will create a new one.
-->

[`ng new`](cli/new) 명령어는 [Angular 워크스페이스](reference/configs/workspace-config) 폴더를 만들고 그 안에 새 애플리케이션을 생성합니다.
워크스페이스 하나에는 여러 애플리케이션과 라이브러리를 포함할 수 있습니다.
[`ng new`](cli/new) 명령어로 생성하는 초기 애플리케이션은 워크스페이스의 최상위 디렉터리에 위치합니다.
기존 워크스페이스에 애플리케이션이나 라이브러리를 추가로 생성하면 기본적으로 `projects/` 하위 폴더에 위치합니다.

새로 생성한 애플리케이션에는 최상위 컴포넌트와 템플릿의 소스 파일이 포함됩니다.
각 애플리케이션에는 컴포넌트, 데이터, 정적 리소스를 보관하는 `src` 폴더가 있습니다.

생성된 파일은 직접 편집하거나 CLI 명령어로 추가하고 수정할 수 있습니다.
컴포넌트, 디렉티브, 파이프, 서비스 등을 위한 새 파일을 추가하려면 [`ng generate`](cli/generate) 명령어를 사용하세요.
애플리케이션이나 라이브러리를 생성하거나 조작하는 [`ng add`](cli/add), [`ng generate`](cli/generate) 등의 명령어는 워크스페이스 안에서 실행해야 합니다.
반면 `ng new`와 같은 명령어는 워크스페이스를 새로 생성하기 때문에 워크스페이스 _밖에서_ 실행해야 합니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
- Learn more about the [file structure](reference/configs/file-structure) and [configuration](reference/configs/workspace-config) of the generated workspace.

- Test your new application with [`ng test`](cli/test).

- Generate boilerplate like components, directives, and pipes with [`ng generate`](cli/generate).

- Deploy your new application and make it available to real users with [`ng deploy`](cli/deploy).

- Set up and run end-to-end tests of your application with [`ng e2e`](cli/e2e).
-->

- 생성된 워크스페이스의 [파일 구조](reference/configs/file-structure)와 [설정](reference/configs/workspace-config)을 자세히 알아보세요.

- [`ng test`](cli/test)로 새 애플리케이션을 테스트하세요.

- [`ng generate`](cli/generate)로 컴포넌트, 디렉티브, 파이프 등의 기본 코드를 생성하세요.

- [`ng deploy`](cli/deploy)로 새 애플리케이션을 배포해서 실제 사용자가 이용할 수 있게 하세요.

- [`ng e2e`](cli/e2e)로 애플리케이션의 엔드 투 엔드 테스트를 설정하고 실행하세요.
