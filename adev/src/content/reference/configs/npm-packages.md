<!--
# Workspace npm dependencies
-->

<a id="workspace-npm-dependencies"></a>

# 워크스페이스 npm 의존성

<!--
The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm 'What is npm?') and distributed using the [npm registry](https://docs.npmjs.com).

You can download and install these npm packages by using the [npm CLI client](https://docs.npmjs.com/cli/install).
By default, Angular CLI uses the npm client.

HELPFUL: See [Local Environment Setup](tools/cli/setup-local 'Setting up for Local Development') for information about the required versions and installation of `Node.js` and `npm`.

If you already have projects running on your machine that use other versions of Node.js and npm, consider using [nvm](https://github.com/creationix/nvm) to manage the multiple versions of Node.js and npm.
-->

Angular 프레임워크, Angular CLI, Angular 애플리케이션에서 사용하는 컴포넌트는 [npm 패키지](https://docs.npmjs.com/getting-started/what-is-npm 'npm이란?')로 묶어 [npm 레지스트리](https://docs.npmjs.com)를 통해 배포합니다.

이 npm 패키지는 [npm CLI 클라이언트](https://docs.npmjs.com/cli/install)로 다운로드하고 설치할 수 있습니다.
Angular CLI는 기본적으로 npm 클라이언트를 사용합니다.

HELPFUL: 필요한 `Node.js`와 `npm` 버전 및 설치 방법은 [로컬 환경 설정](tools/cli/setup-local '로컬 개발 환경 설정')을 참고하세요.

컴퓨터에서 다른 버전의 Node.js와 npm을 사용하는 프로젝트를 이미 실행 중이라면, 여러 버전의 Node.js와 npm을 관리하는 [nvm](https://github.com/creationix/nvm)을 사용해 보세요.

<!--
## `package.json`
-->

<a id="packagejson"></a>

## `package.json` 파일

<!--
`npm` installs the packages identified in a [`package.json`](https://docs.npmjs.com/files/package.json) file.

The CLI command `ng new` creates a `package.json` file when it creates the new workspace.
This `package.json` is used by all projects in the workspace, including the initial application project that is created by the CLI when it creates the workspace.
Libraries created with `ng generate library` will include their own `package.json` file.

Initially, this `package.json` includes _a starter set of packages_, some of which are required by Angular and others that support common application scenarios.
You add packages to `package.json` as your application evolves.
-->

`npm`은 [`package.json`](https://docs.npmjs.com/files/package.json) 파일에 지정한 패키지를 설치합니다.

CLI 명령어 `ng new`는 새 워크스페이스를 생성할 때 `package.json` 파일을 생성합니다.
이 `package.json`은 CLI가 워크스페이스를 생성할 때 함께 만드는 최초 애플리케이션 프로젝트를 포함해 워크스페이스의 모든 프로젝트에서 사용합니다.
`ng generate library`로 생성한 라이브러리에는 별도의 `package.json` 파일이 포함됩니다.

처음 생성된 `package.json`에는 _기본 패키지 모음_ 이 들어 있습니다. 이 중 일부는 Angular에 필수이며, 나머지는 일반적인 애플리케이션 사용 사례를 지원합니다.
애플리케이션을 발전시키면서 `package.json`에 패키지를 추가하면 됩니다.

<!--
## Default Dependencies
-->

<a id="default-dependencies"></a>

## 기본 의존성

<!--
The following Angular packages are included as dependencies in the default `package.json` file for a new Angular workspace.
For a complete list of Angular packages, see the [API reference](api).

| Package name                                                     | Details                                                                                                                                                                                        |
| :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@angular/common`](api#angular_common)                          | The commonly-needed services, pipes, and directives provided by the Angular team.                                                                                                              |
| `@angular/compiler`                                              | Angular's template compiler. It understands Angular templates and can convert them to code that makes the application run.                                                                     |
| `@angular/compiler-cli`                                          | Angular's compiler which is invoked by the Angular CLI's `ng build` and `ng serve` commands. It processes Angular templates with `@angular/compiler` inside a standard TypeScript compilation. |
| [`@angular/core`](api#angular_core)                              | Critical runtime parts of the framework that are needed by every application. Includes all metadata decorators such as `@Component`, dependency injection, and component lifecycle hooks.      |
| [`@angular/forms`](api#angular_forms)                            | Support for both [template-driven](guide/forms) and [reactive forms](guide/forms/reactive-forms). See [Introduction to forms](guide/forms).                                                    |
| [`@angular/platform-browser`](api#angular_platform-browser)      | Everything DOM and browser related, especially the pieces that help render into the DOM.                                                                                                       |
| [`@angular/router`](api#angular_router)                          | The router module navigates among your application pages when the browser URL changes. For more information, see [Routing and Navigation](guide/routing).                                      |
| [`@angular/cli`](https://github.com/angular/angular-cli)         | Contains the Angular CLI binary for running `ng` commands.                                                                                                                                     |
| [`@angular/build`](https://www.npmjs.com/package/@angular/build) | Contains default CLI builders for bundling, testing, and serving Angular applications and libraries.                                                                                           |
| [`rxjs`](https://www.npmjs.com/package/rxjs)                     | A library for reactive programming using `Observables`.                                                                                                                                        |
| [`typescript`](https://www.npmjs.com/package/typescript)         | The TypeScript compiler, language server, and built-in type definitions.                                                                                                                       |
-->

새 Angular 워크스페이스의 기본 `package.json` 파일에는 다음 Angular 패키지가 의존성으로 포함됩니다.
Angular 패키지 전체 목록은 [API 레퍼런스](api)를 참고하세요.

| 패키지 이름                                                      | 설명                                                                                                                                                                              |
| :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@angular/common`](api#angular_common)                          | Angular 팀이 제공하는, 자주 필요한 서비스, 파이프, 디렉티브입니다.                                                                                                                |
| `@angular/compiler`                                              | Angular 템플릿 컴파일러입니다. Angular 템플릿을 해석하고 애플리케이션을 실행하는 코드로 변환할 수 있습니다.                                                                       |
| `@angular/compiler-cli`                                          | Angular CLI의 `ng build`와 `ng serve` 명령어가 실행하는 Angular 컴파일러입니다. 표준 TypeScript 컴파일 과정에서 `@angular/compiler`를 사용해 Angular 템플릿을 처리합니다.         |
| [`@angular/core`](api#angular_core)                              | 모든 애플리케이션에 필요한 프레임워크의 핵심 런타임 구성 요소입니다. `@Component`와 같은 모든 메타데이터 데코레이터, 의존성 주입, 컴포넌트 라이프사이클 후킹 메서드를 포함합니다. |
| [`@angular/forms`](api#angular_forms)                            | [템플릿 기반 폼](guide/forms)과 [반응형 폼](guide/forms/reactive-forms)을 모두 지원합니다. [폼 소개](guide/forms)를 참고하세요.                                                   |
| [`@angular/platform-browser`](api#angular_platform-browser)      | DOM과 브라우저에 관련된 모든 기능, 특히 DOM 렌더링을 지원하는 구성 요소를 제공합니다.                                                                                             |
| [`@angular/router`](api#angular_router)                          | 라우터 모듈은 브라우저 URL이 변경될 때 애플리케이션 페이지 사이를 이동합니다. 자세한 내용은 [라우팅과 내비게이션](guide/routing)을 참고하세요.                                    |
| [`@angular/cli`](https://github.com/angular/angular-cli)         | `ng` 명령어를 실행하는 Angular CLI 바이너리를 포함합니다.                                                                                                                         |
| [`@angular/build`](https://www.npmjs.com/package/@angular/build) | Angular 애플리케이션과 라이브러리를 번들링하고 테스트하며 제공하는 기본 CLI 빌더를 포함합니다.                                                                                    |
| [`rxjs`](https://www.npmjs.com/package/rxjs)                     | `Observables`를 사용하는 반응형 프로그래밍 라이브러리입니다.                                                                                                                      |
| [`typescript`](https://www.npmjs.com/package/typescript)         | TypeScript 컴파일러, 언어 서버, 내장 타입 정의입니다.                                                                                                                             |
