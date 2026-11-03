<!--
# The Angular CLI
-->

<a id="the-angular-cli"></a>

# Angular CLI

<!--
The Angular CLI is a command-line interface tool which allows you to scaffold, develop, test, deploy, and maintain Angular applications directly from a command shell.

Angular CLI is published on npm as the `@angular/cli` package and includes a binary named `ng`. Commands invoking `ng` are using the Angular CLI.

<docs-callout title="Try Angular without local setup">

If you are new to Angular, you might want to start with [Try it now!](tutorials/learn-angular), which introduces the essentials of Angular in the context of a ready-made basic online store app for you to examine and modify.
This standalone tutorial takes advantage of the interactive [StackBlitz](https://stackblitz.com) environment for online development.
You don't need to set up your local environment until you're ready.

</docs-callout>

<docs-card-container>
  <docs-card title="Getting Started" link="Get Started" href="tools/cli/setup-local">
    Install Angular CLI to create and build your first app.
  </docs-card>
  <docs-card title="Command Reference" link="Learn More" href="cli">
    Discover CLI commands to make you more productive with Angular.
  </docs-card>
  <docs-card title="Schematics" link="Learn More" href="tools/cli/schematics">
    Create and run schematics to generate and modify source files in your application automatically.
  </docs-card>
  <docs-card title="Builders" link="Learn More" href="tools/cli/cli-builder">
    Create and run builders to perform complex transformations from your source code to generated build outputs.
  </docs-card>
</docs-card-container>
-->

Angular CLI는 명령어 셸에서 Angular 애플리케이션의 기본 구조를 생성하고 개발, 테스트, 배포, 유지보수할 수 있는 명령줄 인터페이스 도구입니다.

Angular CLI는 npm에 `@angular/cli` 패키지로 배포되며 `ng`라는 실행 파일을 제공합니다.
`ng`를 실행하는 명령어는 Angular CLI를 사용하는 것입니다.

<docs-callout title="로컬 환경을 설정하지 않고 Angular 체험하기">

Angular를 처음 사용한다면 [지금 시작하기](tutorials/learn-angular)부터 살펴보세요.
미리 만들어진 기본 온라인 쇼핑몰 앱을 살펴보고 수정하면서 Angular의 핵심을 익힐 수 있습니다.
이 독립적인 튜토리얼은 온라인 개발을 위한 대화형 [StackBlitz](https://stackblitz.com) 환경을 활용합니다.
준비가 될 때까지 로컬 환경을 설정하지 않아도 됩니다.

</docs-callout>

<docs-card-container>
  <docs-card title="시작하기" link="시작하기" href="tools/cli/setup-local">
    Angular CLI를 설치하고 첫 앱을 생성하고 빌드해 보세요.
  </docs-card>
  <docs-card title="명령어 레퍼런스" link="자세히 알아보기" href="cli">
    Angular 작업의 생산성을 높여주는 CLI 명령어를 알아보세요.
  </docs-card>
  <docs-card title="스키매틱" link="자세히 알아보기" href="tools/cli/schematics">
    스키매틱을 만들고 실행해서 애플리케이션의 소스 파일을 자동으로 생성하고 수정하세요.
  </docs-card>
  <docs-card title="빌더" link="자세히 알아보기" href="tools/cli/cli-builder">
    빌더를 만들고 실행해서 소스 코드를 빌드 결과물로 변환하는 복잡한 작업을 수행하세요.
  </docs-card>
</docs-card-container>

<!--
## CLI command-language syntax
-->

<a id="cli-command-language-syntax"></a>

## CLI 명령어 문법

<!--
Angular CLI roughly follows Unix/POSIX conventions for option syntax.
-->

Angular CLI의 옵션 문법은 대체로 Unix/POSIX 관례를 따릅니다.

<!--
### Boolean options
-->

<a id="boolean-options"></a>

### 불리언 옵션

<!--
Boolean options have two forms: `--this-option` sets the flag to `true`, `--no-this-option` sets it to `false`.
You can also use `--this-option=false` or `--this-option=true`.
If neither option is supplied, the flag remains in its default state, as listed in the reference documentation.
-->

불리언 옵션에는 두 가지 형식이 있습니다.
`--this-option`은 플래그를 `true`로 설정하고 `--no-this-option`은 `false`로 설정합니다.
`--this-option=false`나 `--this-option=true`로 지정할 수도 있습니다.
어느 옵션도 지정하지 않으면 레퍼런스 문서에 나와 있는 기본값이 유지됩니다.

<!--
### Array options
-->

<a id="array-options"></a>

### 배열 옵션

<!--
Array options can be provided in two forms: `--option value1 value2` or `--option value1 --option value2`.
-->

배열 옵션은 `--option value1 value2` 또는 `--option value1 --option value2` 형식으로 지정할 수 있습니다.

<!--
### Key/value options
-->

<a id="keyvalue-options"></a>

<a id="key-value-options"></a>

### 키/값 옵션

<!--
Some options like `--define` expect an array of `key=value` pairs as their values.
Just like array options, key/value options can be provided in two forms:
`--define 'KEY_1="value1"' KEY_2=true` or `--define 'KEY_1="value1"' --define KEY_2=true`.
-->

`--define`과 같은 일부 옵션은 `key=value` 쌍으로 구성된 배열을 값으로 받습니다.
키/값 옵션도 배열 옵션과 마찬가지로 두 가지 형식으로 지정할 수 있습니다:
`--define 'KEY_1="value1"' KEY_2=true` 또는 `--define 'KEY_1="value1"' --define KEY_2=true`.

<!--
### Relative paths
-->

<a id="relative-paths"></a>

### 상대 경로

<!--
Options that specify files can be given as absolute paths, or as paths relative to the current working directory, which is generally either the workspace or project root.
-->

파일을 지정하는 옵션에는 절대 경로나 현재 작업 디렉터리를 기준으로 한 상대 경로를 사용할 수 있습니다.
현재 작업 디렉터리는 일반적으로 워크스페이스나 프로젝트의 최상위 디렉터리입니다.
