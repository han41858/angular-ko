<!--
# Workspace npm dependencies
-->
# 워크스페이스 npm 패키지

<!--
The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?") and distributed using the [npm registry](https://docs.npmjs.com/).

You can download and install these npm packages by using the [npm CLI client](https://docs.npmjs.com/cli/install), which is installed with and runs as a [Node.js®](https://nodejs.org "Nodejs.org") application. By default, the Angular CLI uses the npm client.

Alternatively, you can use the [yarn client](https://yarnpkg.com/) for downloading and installing npm packages.


<div class="alert is-helpful">

See [Local Environment Setup](guide/setup-local "Setting up for Local Development") for information about the required versions and installation of `Node.js` and `npm`.

If you already have projects running on your machine that use other versions of Node.js and npm, consider using [nvm](https://github.com/creationix/nvm) to manage the multiple versions of Node.js and npm.

</div>
-->
Angular 프레임워크와 Angular CLI, Angular 애플리케이션이 활용하는 컴포넌트들은 모두 [npm 패키지](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?") 형태로 빌드되어 [npm 저장소](https://docs.npmjs.com/)에 배포됩니다.

이런 npm 패키지들은 [npm CLI 클라이언트](https://docs.npmjs.com/cli/install)를 사용해서 다운로드 받고 설치할 수 있으며, [Node.js®](https://nodejs.org "Nodejs.org") 애플리케이션이 실행하는 것처럼 실행할 수 있습니다.
Angular CLI는 npm 클라이언트를 기본 패키지 매니저로 사용합니다.

npm 대신 [yarn 클라이언트](https://yarnpkg.com/)를 사용할 수도 있습니다.


<div class="alert is-helpful">

Angular 애플리케이션 개발에 필요한 `Node.js`, `npm` 버전과 설치 방법을 확인하려면 [로컬 개발환경 설정](guide/setup-local "Setting up for Local Development") 문서를 참고하세요.

프로젝트마다 필요한 Node.js, npm 버전이 다르다면 [nvm](https://github.com/creationix/nvm)을 사용해서 Node.js, npm 버전을 여러개 관리하는 방법도 고려해볼 수 있습니다.

</div>


## `package.json`

<!--
Both `npm` and `yarn` install the packages that are identified in a [`package.json`](https://docs.npmjs.com/files/package.json) file.

The CLI command `ng new` creates a `package.json` file when it creates the new workspace.
This `package.json` is used by all projects in the workspace, including the initial application project that is created by the CLI when it creates the workspace.

Initially, this `package.json` includes _a starter set of packages_, some of which are required by Angular and others that support common application scenarios.
You add packages to `package.json` as your application evolves.
You may even remove some.

The `package.json` is organized into two groups of packages:

* [Dependencies](guide/npm-packages#dependencies) are essential to *running* applications.
* [DevDependencies](guide/npm-packages#dev-dependencies) are only necessary to *develop* applications.

<div class="alert is-helpful">

**Library developers:** By default, the CLI command [`ng generate library`](cli/generate) creates a `package.json` for the new library. That `package.json` is used when publishing the library to npm.
For more information, see the CLI wiki page [Library Support](https://github.com/angular/angular-cli/wiki/stories-create-library).
</div>
-->
`npm`과 `yarn`은 모두 [`package.json`](https://docs.npmjs.com/files/package.json)에 등록된 패키지를 설치합니다.

Angular CLI로 `ng new` 명령을 실행하면 새로운 워크스페이스를 생성하면서 이 워크스페이스에 `package.json` 파일을 생성합니다.
이 때 생성된 `package.json` 파일은 워크스페이스를 생성하며 함께 생성된 앱 프로젝트를 포함해서 워크스페이스 안에 있는 모든 프로젝트에 영향을 미칩니다.

워크스페이스를 생성하면서 함께 생성된 `package.json`에는 Angular를 실행할 때 꼭 필요한 _스타터 패키지_ 들이 포함됩니다.
애플리케이션을 개발하다 보면 `package.json` 파일에 패키지를 추가하거나 제거하는 경우도 자주 생깁니다.

`package.json`에 등록된 패키지는 두 그룹으로 구분할 수 있습니다:

* [Dependencies](guide/npm-packages#dependencies): 애플리케이션을 *실행할 때* 꼭 필요한 패키지들
* [DevDependencies](guide/npm-packages#dev-dependencies): 애플리케이션을 *개발할 때*만 필요한 패키지들


<div class="alert is-helpful">

**라이브러리 개발자에게:**  Angular CLI로 [`ng generate library`](cli/generate) 명령을 실행하면 새 라이브러리를 생성하면서 이 라이브러리에 `package.json` 파일을 생성하는데, 이 파일은 npm 저장소에 라이브러리를 배포할 때 사용됩니다.
자세한 내용은 Angular CLI wiki 페이지 중 [라이브러리 지원](https://github.com/angular/angular-cli/wiki/stories-create-library) 문서를 참고하세요.

</div>


{@a dependencies}

## Dependencies

<!--
The packages listed in the `dependencies` section of `package.json` are essential to *running* applications.

The `dependencies` section of `package.json` contains:

* [**Angular packages**](#angular-packages): Angular core and optional modules; their package names begin `@angular/`.

* [**Support packages**](#support-packages): 3rd party libraries that must be present for Angular applications to run.

* [**Polyfill packages**](#polyfills): Polyfills plug gaps in a browser's JavaScript implementation.

To add a new dependency, use the [`ng add`](cli/add) command.
-->
`package.json` 파일의 `dependencies` 섹션에 등록된 패키지들은 애플리케이션을 *실행할 때* 꼭 필요합니다.

이 섹션에는 이런 패키지들이 등록됩니다:

* [**Angular 패키지**](#angular-packages): Angular 코어 라이브러리와 모듈. `@angular/`라는 이름으로 시작합니다.

* [**지원 패키지**](#support-packages): Angular 애플리케이션을 실행할 때 필요한 서드 파티 라이브러리

* [**폴리필 패키지**](#polyfills): 브라우저 JavaScript 호환성을 맞추기 위한 폴리필


{@a angular-packages}
<!--
### Angular packages
-->
### Angluar 패키지

<!--
The following Angular packages are included as dependencies in the default `package.json` file for a new Angular workspace.
For a complete list of Angular packages, see the [API reference](https://angular.io/api?type=package).

Package name                               | Description
----------------------------------------   | --------------------------------------------------
[**@angular/animations**](api/animations) | Angular's animations library makes it easy to define and apply animation effects such as page and list transitions. For more information, see the [Animations guide](guide/animations).
[**@angular/common**](api/common) | The commonly-needed services, pipes, and directives provided by the Angular team. The [`HttpClientModule`](api/common/http/HttpClientModule) is also here, in the [`@angular/common/http`](api/common/http) subfolder. For more information, see the [HttpClient guide](guide/http).
**@angular/compiler** | Angular's template compiler. It understands templates and can convert them to code that makes the application run and render. Typically you don’t interact with the compiler directly; rather, you use it indirectly using `platform-browser-dynamic` when JIT compiling in the browser. For more information, see the [Ahead-of-time Compilation guide](guide/aot-compiler).
[**@angular/core**](api/core) | Critical runtime parts of the framework that are needed by every application. Includes all metadata decorators, `Component`, `Directive`,  dependency injection, and the component lifecycle hooks.
[**@angular/forms**](api/forms) | Support for both [template-driven](guide/forms) and [reactive forms](guide/reactive-forms). For information about choosing the best forms approach for your app, see [Introduction to forms](guide/forms-overview).
[**@angular/<br />platform&#8209;browser**](api/platform-browser) | Everything DOM and browser related, especially the pieces that help render into the DOM. This package also includes the `bootstrapModuleFactory()` method for bootstrapping applications for production builds that pre-compile with [AOT](guide/aot-compiler).
[**@angular/<br />platform&#8209;browser&#8209;dynamic**](api/platform-browser-dynamic) | Includes [providers](api/core/Provider) and methods to compile and run the application on the client using the [JIT compiler](guide/aot-compiler).
[**@angular/router**](api/router) | The router module navigates among your application pages when the browser URL changes. For more information, see [Routing and Navigation](guide/router).
-->
아래 나열한 Angular 패키지들은 Angular 워크스페이스를 생성할 때 기본으로 `package.json` 파일에 등록되는 패키지들입니다.
Angular 패키지 전체 목록을 확인하려면 [API 문서](api?type=package)를 참고하세요.

패키지 이름                               | 설명
----------------------------------------   | --------------------------------------------------
[**@angular/animations**](api/animations) | 화면을 전환하거나 목록을 전환하는 등 Angular 앱에 필요한 애니메이션을 쉽게 정의하고 적용할 수 있는 기능을 제공하는 애니메이션 라이브러리입니다. 자세한 내용은 [애니메이션 가이드](guide/animations) 문서를 참고하세요.
[**@angular/common**](api/common) | 일반적으로 사용되는 서비스, 파이프, 디렉티브를 제공하는 패키지입니다. Angular 앱에서 사용하는 [`HttpClientModule`](api/common/http/HttpClientModule)도 이 패키지의 하위 폴더 [`@angular/common/http`](api/common/http)에서 제공합니다. 자세한 내용은 [HttpClient 가이드](guide/http) 문서를 참고하세요.
**@angular/compiler** | Angular 템플릿 컴파일러입니다. 이 컴파일러는 템플릿을 읽어서 애플리케이션이 실행하고 렌더링할 수 있는 코드로 변환합니다. 보통은 이 컴파일러를 직접 사용하지 않고 브라우저에서 JIT 컴파일할 때는 `platform-browser-dynamic` 패키지를 사용합니다. 자세한 내용은 [AOT 컴파일 가이드](guide/aot-compiler) 문서를 참고하세요.
[**@angular/core**](api/core) | 애플리케이션을 실행할 때 가장 중요한 프레임워크의 핵심 코드입니다. `Component`, `Directive`와 같은 데코레이터, 의존성 주입 시스템, 컴포넌트 라이프싸이클 후킹 함수를 제공합니다.
[**@angular/forms**](api/forms) | [템플릿 기반 폼](guide/forms)과 [반응형 폼](guide/reactive-forms)을 제공하는 패키지입니다. 폼을 구성할 때 둘 중 어느 방식을 사용해야 하는지 알아보려면 [폼 소개](guide/forms-overview) 문서를 참고하세요.
[**@angular/<br />platform&#8209;browser**](api/platform-browser) | DOM과 브라우저 관련 코드, 특히 DOM에 렌더링할 때 필요한 코드를 제공하는 패키지입니다. 이 패키지는 [AOT 컴파일러](guide/aot-compiler)로 빌드한 애플리케이션을 브라우저에서 실행시킬 때 사용하는 `bootstrapModuleFactory()` 메서드도 제공합니다.
[**@angular/<br />platform&#8209;browser&#8209;dynamic**](api/platform-browser-dynamic) | [JIT 컴파일러](guide/aot-compiler)로 애플리케이션을 컴파일하고 실행할 때 필요한 [프로바이더](api/core/Provider)를 제공하는 패키지입니다.
[**@angular/router**](api/router) | 브라우저 URL이 변경될 때 애플리케이션 화면을 전환하는 라우터 모듈을 제공하는 패키지입니다. 자세한 내용은 [라우팅, 네비게이션](guide/router) 문서를 참고하세요.



{@a support-packages}
<!--
### Support packages
-->
### 지원 패키지

<!--
The following support packages are included as dependencies in the default `package.json` file for a new Angular workspace.


Package name                               | Description
----------------------------------------   | --------------------------------------------------
[**rxjs**](https://github.com/ReactiveX/rxjs) | Many Angular APIs return [_observables_](guide/glossary#observable). RxJS is an implementation of the proposed [Observables specification](https://github.com/tc39/proposal-observable) currently before the [TC39](https://www.ecma-international.org/memento/tc39.htm) committee, which determines standards for the JavaScript language.
[**zone.js**](https://github.com/angular/zone.js) | Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events. Zone.js is an implementation of a [specification](https://gist.github.com/mhevery/63fdcdf7c65886051d55) currently before the [TC39](https://www.ecma-international.org/memento/tc39.htm) committee that determines standards for the JavaScript language.
-->
아래 나열한 패키지들은 Angular 워크스페이스를 생성할 때 기본으로 `package.json` 파일에 등록되는 패키지들입니다.

패키지 이름                               | 설명
----------------------------------------   | --------------------------------------------------
[**rxjs**](https://github.com/ReactiveX/rxjs) | Angular가 제공하는 API들 중에서 [_옵저버블(observable)_](guide/glossary#observable)을 반환하는 API가 많이 있습니다. RxJS는 JavaScript 언어의 표준을 관리하는 [TC39](https://www.ecma-international.org/memento/tc39.htm) 위원회의 표준에 맞게 [옵저버블 표준](https://github.com/tc39/proposal-observable)을 구현한 라이브러리입니다.
[**zone.js**](https://github.com/angular/zone.js) | Angular는 JavaScript 컨텍스트에서 발생한 이벤트를 처리할 때 zone.js 라이브러리를 활용해서 변화를 감지합니다. Zone.js는 JavaScript 언어의 표준을 관리하는 [TC39](https://www.ecma-international.org/memento/tc39.htm) 위원회의 표준에 맞게 [실행 컨텍스트 표준](https://gist.github.com/mhevery/63fdcdf7c65886051d55)을 구현한 라이브러리입니다.


{@a polyfills}
<!--
### Polyfill packages
-->
### 폴리필 패키지

<!--
Many browsers lack native support for some features in the latest HTML standards,
features that Angular requires.
[_Polyfills_](https://en.wikipedia.org/wiki/Polyfill_(programming)) can emulate the missing features.
The [Browser Support](guide/browser-support) guide explains which browsers need polyfills and
how you can add them.
-->
Angular 실행에 필요한 최신 HTML 표준 중 일부 기능은 브라우저에서 제공하지 않는 경우가 있습니다.
[폴리필(polyfill)](https://en.wikipedia.org/wiki/Polyfill_(programming))은 이렇게 빠진 기능을 채워넣는 역할을 합니다.
어떤 브라우저가 폴리필이 필요한지, 폴리필을 추가하려면 어떻게 해야하는지 알아보려면 [브라우저 지원](guide/browser-support) 문서를 참고하세요.


{@a dev-dependencies}

## DevDependencies

<!--
The packages listed in the `devDependencies` section of `package.json` help you develop the application on your local machine. You don't deploy them with the production application.

To add a new `devDependency`, use either one of the following commands:

<code-example language="sh">
  npm install --save-dev &lt;package-name&gt;
</code-example>

<code-example language="sh">
  yarn add --dev &lt;package-name&gt;
</code-example>

The following `devDependencies` are provided in the default `package.json` file for a new Angular workspace.


Package name                               | Description
----------------------------------------   | -----------------------------------
[**@angular&#8209;devkit/<br />build&#8209;angular**](https://github.com/angular/angular-cli/) | The Angular build tools.
[**@angular/cli**](https://github.com/angular/angular-cli/) | The Angular CLI tools.
**@angular/<br />compiler&#8209;cli** | The Angular compiler, which is invoked by the Angular CLI's `ng build` and `ng serve` commands.
**@types/... ** | TypeScript definition files for 3rd party libraries such as Jasmine and Node.js.
**jasmine/... ** | Packages to support the [Jasmine](https://jasmine.github.io/) test library.
**karma/... ** | Packages to support the [karma](https://www.npmjs.com/package/karma) test runner.
[**typescript**](https://www.npmjs.com/package/typescript) | The TypeScript language server, including the *tsc* TypeScript compiler.
-->
로컬 환경에서 애플리케이션을 개발할 때 필요한 패키지는 `package.json` 파일의 `devDependencies` 섹션에 추가합니다.
이 패키지들은 운영용 애플리케이션에 포함시킬 필요가 없습니다.

`devDependency`에 패키지를 추가하려면 이런 명령을 실행하면 됩니다:

<code-example language="sh">
  npm install --save-dev &lt;package-name&gt;
</code-example>

<code-example language="sh">
  yarn add --dev &lt;package-name&gt;
</code-example>

아래 패키지들은 Angular 워크스페이스를 생성할 때 기본으로 `package.json` 파일에 등록되는 패키지들입니다.


패키지 이름                               | 설명
----------------------------------------   | -----------------------------------
[**@angular&#8209;devkit/<br />build&#8209;angular**](https://github.com/angular/angular-cli/) | Angular 애플리케이션을 빌드하는 툴입니다.
[**@angular/cli**](https://github.com/angular/angular-cli/) | Angular CLI 툴입니다.
**@angular/<br />compiler&#8209;cli** | Angular CLI로 `ng build`, `ng serve` 명령을 실행할 때 사용되는 Angular 컴파일러입니다.
**@types/...** | Jasmine과 Node.js 라이브러리에 TypeScript 정의 파일을 추가하는 라이브러리 입니다.
**jasmine/...** | [Jamine](https://jasmine.github.io/)를 실행할 때 필요한 라이브러리입니다.
**karma/...** | [karma](https://www.npmjs.com/package/karma) 테스트 러너를 실행할 때 필요한 라이브러리 입니다.
[**typescript**](https://www.npmjs.com/package/typescript) | TypeScript 언어 서버, TypeScript 컴파일러(*tsc*)를 제공하는 라이브러리입니다.


<!--
## Related information
-->
## 관련 정보

<!--
 For information about how the Angular CLI handles packages see the following guides:

 * [Building and serving](guide/build) describes how packages come together to create a development build.
 * [Deployment](guide/deployment) describes how packages come together to create a production build.
-->
Angular CLI가 이 패키지들을 어떻게 활용하는지 알아보려면 이런 문서를 참고하세요:

* [빌드하고 실행하기](guide/build): 패키지들을 조합해서 개발용으로 빌드하는 방법을 설명합니다.
* [배포](guide/deployment): 패키지들을 조합해서 운영용으로 빌드하는 방법을 설명합니다.
