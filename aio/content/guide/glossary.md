<!--
# Glossary
-->
# 용어사전

<!--
Angular has its own vocabulary.
Most Angular terms are common English words or computing terms
that have a specific meaning within the Angular system.

This glossary lists the most prominent terms
and a few less familiar ones with unusual or
unexpected definitions.

[A](#A) [B](#B) [C](#C) [D](#D) [E](#E) [F](#F) [G](#G) [H](#H) [I](#I)
[J](#J) [K](#K) [L](#L) [M](#M) [N](#N) [O](#O) [P](#P) [Q](#Q) [R](#R)
[S](#S) [T](#T) [U](#U) [V](#V) [W](#W) [X](#X) [Y](#Y) [Z](#Z)
-->
Angular에서 사용하는 용어들이 있습니다.
이 용어들은 Angular에 사용되는 개념을 설명하기 위해 자주 사용되는 영어 단어나 컴퓨터 용어를 도입한 경우가 많습니다.

이 용어들 중에서 중요한 용어, 단어만 보면 의미를 쉽게 파악할 수 없는 용어에 대해 알아봅시다.

[A](#A) [B](#B) [C](#C) [D](#D) [E](#E) [F](#F) [G](#G) [H](#H) [I](#I)
[J](#J) [K](#K) [L](#L) [M](#M) [N](#N) [O](#O) [P](#P) [Q](#Q) [R](#R)
[S](#S) [T](#T) [U](#U) [V](#V) [W](#W) [X](#X) [Y](#Y) [Z](#Z)


{@a A}
{@a aot}
{@a ahead-of-time-aot-compilation}
<!--
## ahead-of-time (AOT) compilation
-->
## AOT(Ahead-of-time) 컴파일

<!--
The Angular ahead-of-time (AOT) compiler converts Angular HTML and TypeScript code
into efficient JavaScript code during the build phase, before the browser downloads
and runs that code.
This is the best compilation mode for production environments, with decreased load time and increased performance compared to [just-in-time (JIT) compilation](#jit).

By compiling your application using the `ngc` command-line tool, you can bootstrap directly to a module factory, so you don't need to include the Angular compiler in your JavaScript bundle.
-->
AOT 컴파일러는 Angular HTML 템플릿과 TypeScript 코드를 빌드 단계에서 JavaScript 코드로 변환하며, 이렇게 변환된 코드는 브라우저가 다운로드해서 실행합니다.
운영환경이라면 로딩 시간과 성능 측면에서 [JIT(Just-in-time)](#jit) 컴파일러보다 유리합니다.

커맨드 라인 툴 `ngc`를 사용해서 컴파일하면 모듈 팩토리 코드를 그대로 부트스트랩할 수 있기 때문에, 클라이언트로 Angular 컴파일러 코드를 전달할 필요도 없습니다.


{@a angular-element}

<!--
## Angular element
-->
## Angular 엘리먼트

<!--
An Angular [component](#component) packaged as a [custom element](#custom-element).

Learn more in [Angular Elements Overview](guide/elements).
-->
[커스텀 엘리먼트](#custom-element)로 동작하도록 패키징된 Angular [컴포넌트](#component)를 의미합니다.

자세한 내용은 [Angular Elements 개요](guide/elements) 문서를 참고하세요.


{@a annotation}

<!--
## annotation
-->
## 어노테이션(annotation)

<!--
A structure that provides metadata for a class. See [decorator](#decorator).
-->
클래스에 메타데이터를 적용하는 구조를 의미합니다.
[데코레이터](#decorator) 섹션을 참고하세요.


{@a app-shell}

<!--
## app-shell
-->
## 앱 기본코드(app-shell)

<!--
App shell is a way to render a portion of your application via a route at build time.
This gives users a meaningful first paint of your application that appears quickly because the browser can render static HTML and CSS without the need to initialize JavaScript.

Learn more in [The App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).

You can use the Angular CLI to [generate](cli/generate#appshell) an app shell.
This can improve the user experience by quickly launching a static rendered page (a skeleton common to all pages) while the browser downloads the full client version and switches to it automatically after the code loads.

See also [Service Worker and PWA](guide/service-worker-intro).
-->
앱 기본코드는 애플리케이션이 실행되면서 특정 컴포넌트를 렌더링하는 구조를 제공합니다.
그리고 앱 기본코드는 브라우저가 처리할 수 있는 정적 HTML과 CSS로 제공되기 때문에 사용자에게 "의미있는 첫번째 화면(meaningful first paint)"를 보여주는 역할도 합니다.

자세한 내용은 [앱 기본코드 모델](https://developers.google.com/web/fundamentals/architecture/app-shell) 문서를 참고하세요.

앱 기본코드는 Angular CLI로 [생성](cli/generate#appshell)할 수도 있습니다.
앱 기본코드를 사용하면 브라우저가 Angular 코드를 전부 받기 전에 정적으로 렌더링된 화면을 사용자에게 빠르게 보여줄 수 있으며, 코드를 모두 받고 난 후에는 동적으로 실행되는 애플리케이션 화면으로 전환할 수 있습니다.

[서비스 워커와 PWA](guide/service-worker-intro) 문서도 참고해 보세요.


{@a architect}

<!--
## Architect
-->
## 아키텍트(Architect)

<!--
The tool that the CLI uses to perform complex tasks such as compilation and test running, according to a provided configuration.
Architect is a shell that runs a [builder](#builder) (defined in an [npm package](#npm-package)) with a given [target configuration](#target).

In the [workspace configuration file](guide/workspace-config#project-tool-configuration-options), an "architect" section provides configuration options for Architect builders.

For example, a built-in builder for linting is defined in the package `@angular-devkit/build_angular:tslint`, which uses the [TSLint](https://palantir.github.io/tslint/) tool to perform linting, with a configuration specified in a `tslint.json` file.

Use the [CLI command `ng run`](cli/run) to invoke a builder by specifying a [target configuration](#target) associated with that builder.
Integrators can add builders to enable tools and workflows to run through the Angular CLI. For example, a custom builder can replace the third-party tools used by the built-in implementations for CLI commands such as `ng build` or `ng test`.
-->
컴파일, 테스트 실행과 같이 특정 환경설정으로 동작하는 Angular CLI의 복잡한 과정을 처리하기 위한 툴입니다.
아키텍트는 [특정 환경설정](#target)으로 동작하는 [npm 패키지](#npm-package)를 [빌더](#builder) 형태로 실행하는 셸(shell)입니다.

[워크스페이스 환경설정 파일](guide/workspace-config#project-tool-configuration-options) 섹션에서도 확인할 수 있듯이, 이 환경설정 파일의 "architect" 섹션을 확인하면 아키텍트 빌드 옵션이 어떻게 지정되어 있는지 확인할 수 있습니다.

예를 들면, 기본 린트 툴은 `@angular-devkit/build_angular:tslint` 패키지이며, 이 패키지는 [TSLint](https://palantir.github.io/tslint/)를 활용하고, 이 패키지가 실행될 때 `tslint.json` 파일에 설정된 규칙을 따릅니다.

[Angular CLI `ng run`](cli/run) 명령을 실행하면 [원하는 환경설정](#target)으로 빌더를 직접 실행할 수 있습니다.
그래서 프로젝트 관리자가 원하는 대로 툴과 실행동작을 추가할 수 있습니다.
`ng build`나 `ng test` 명령이 Angular CLI가 아니라 서드 파티 툴을 사용하도록 변경할 수도 있습니다.


{@a attribute-directive}


{@a attribute-directives}


<!--
## attribute directives
-->
## 어트리뷰트 디렉티브(attribute directives)

<!--
A category of [directive](#directive) that can listen to and modify the behavior of
other HTML elements, attributes, properties, and components. They are usually represented
as HTML attributes, hence the name.

Learn more in [Attribute Directives](guide/attribute-directives).
-->
[디렉티브](#directive)의 한 종류이며, HTML 엘리먼트, 어트리뷰트, 프로퍼티, 컴포넌트의 행동을 감지하고 확장하는 역할을 합니다.
이름에서 알 수 있듯이, 이 디렉티브는 HTML 어트리뷰트와 비슷하게 동작합니다.

자세한 내용은 [어트리뷰트 디렉티브](guide/attribute-directives) 문서를 참고하세요.


{@a B}

{@a binding}

<!--
## binding
-->
## 바인딩(binding)

<!--
Generally, the practice of setting a variable or property to a data value.
Within Angular, typically refers to [data binding](#data-binding),
which coordinates DOM object properties with data object properties.

Sometimes refers to a [dependency-injection](#dependency-injection) binding
between a [token](#token) and a dependency [provider](#provider).
-->
일반적으로는 변수나 프로퍼티 값을 할당하는 것을 의미합니다.
Angular에서는 DOM 객체의 프로퍼티와 데이터 객체의 프로퍼티를 [데이터 바인딩](#data-binding)하는 것을 의미합니다.

[의존성 주입](#dependency-injection)에서는 [토큰(token)](#token)과 [프로바이더(provider)](#provider)를 연결하는 것을 의미합니다.


{@a bootstrap}

<!--
## bootstrap
-->
## 부트스트랩(bootstrap)

<!--
A way to initialize and launch an app or system.

In Angular, an app's root NgModule (`AppModule`) has a `bootstrap` property that identifies the app's top-level [components](#component).
During the bootstrap process, Angular creates and inserts these components into the `index.html` host web page.
You can bootstrap multiple apps in the same `index.html`. Each app contains its own components.

Learn more in [Bootstrapping](guide/bootstrapping).
-->
애플리케이션이나 시스템을 초기화하고 실행하는 것을 의미합니다.

Angular에서는 애플리케이션 최상위 NgModule(`AppModule`)에 지정된 `bootstrap` 프로퍼티에 따라 애플리케이션 최상위 [컴포넌트](#component)를 생성합니다.
부트스트랩 과정 중에는 Angular가 최상위 컴포넌트를 생성해서 호스트 웹 페이지 `index.html`에 추가합니다.
그리고 `index.html` 파일 하나에 여러 개의 앱을 부트스트랩할 수도 있습니다.
각 앱들은 각각 컴포넌트를 구성합니다.

자세한 내용은 [부트스트랩](guide/bootstrapping) 문서를 참고하세요.


{@a builder}

<!--
## builder
-->
## 빌더(builder)

<!--
A function that uses the [Architect](#architect) API to perform a complex process such as "build" or "test".
The builder code is defined in an [npm package](#npm-package).

For example, [BrowserBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/browser) runs a [webpack](https://webpack.js.org/) build for a browser target and [KarmaBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/karma) starts the Karma server and runs a webpack build for unit tests.

The [CLI command `ng run`](cli/run) invokes a builder with a specific [target configuration](#target).
The [workspace configuration](guide/workspace-config) file, `angular.json`, contains default configurations for built-in builders.
-->
[아키텍트](#architect) API를 활용해서 애플리케이션을 빌드하거나 테스트하는 함수를 의미합니다.
빌더 코드는 [npm 패키지](#npm-package)로 제공됩니다.

예를 들면, [BrowserBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/browser)는 [webpack](https://webpack.js.org/)을 사용해서 애플리케이션 코드를 빌드하며, [KarmaBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/karma)는 Karma 서버를 실행하고 유닛 테스트를 실행합니다.

[Angular CLI `ng run`](cli/run) 명령을 실행하면 [특정 환경설정](#target)으로 빌더를 직접 실행할 수 있습니다.
기본 빌더는 [워크스페이스 환경설정 파일](guide/workspace-config) `angular.json` 파일에 정의되어 있습니다.


{@a C}

{@a case-conventions}
{@a dash-case}
{@a camelcase}
{@a kebab-case}
{@a case-types}

<!--
## case types
-->
## 대소문자 표기법 종류(case types)

<!--
Angular uses capitalization conventions to distinguish the names of various types, as described in the [naming guidelines section](guide/styleguide#02-01) of the Style Guide. Here's a summary of the case types:

* camelCase : Symbols, properties, methods, pipe names, non-component directive selectors, constants.
Standard or lower camel case uses lowercase on the first letter of the item. For example, "selectedHero".

* UpperCamelCase (or PascalCase): Class names, including classes that define components, interfaces, NgModules, directives, and pipes,
Upper camel case uses uppercase on the first letter of the item. For example, "HeroListComponent".

* dash-case (or "kebab-case"): Descriptive part of file names, component selectors. For example, "app-hero-list".

* underscore_case (or "snake_case"): Not typically used in Angular. Snake case uses words connected with underscores.
For example, "convert_link_mode".

* UPPER_UNDERSCORE_CASE (or UPPER_SNAKE_CASE, or SCREAMING_SNAKE_CASE): Traditional for constants (acceptable, but prefer camelCase).
Upper snake case uses words in all capital letters connected with underscores. For example, "FIX_ME".
-->
Angular는 타입 이름을 대문자 컨벤션으로 사용합니다.
스타일 가이드 문서의 [명명 규칙 섹션](guide/styleguide#02-01)을 참고하세요.
이 문서에서는 간단하게만 살펴봅시다:

* 캐멀 케이스(camelCase) : 심볼, 프로퍼티, 메서드, 파이프 이름, 디렉티브 셀렉터, 상수에 사용합니다.
"selectedHero"와 같이 첫 글자를 소문자로 시작합니다.

* 대문자 캐멀 케이스(UpperCamelCase, PascalCase) : 클래스, 컴포넌트 클래스, 인터페이스, NgModule, 디렉티브, 파이프에 사용합니다.
"HeroListComponent"와 같이 첫 글자를 대문자로 시작합니다.

* 대시-케이스(dash-case, kebab-case) : 파일 이름, 컴포넌트 셀렉터에 사용합니다.
ex. "app-hero-list"

* 밑줄_케이스(underscore_case, snake_case) : Angular에서는 거의 사용되지 않습니다.
ex. "convert_link_mode"

* 대문자_밑줄_케이스(UPPER_UNDERSCORE_CASE, UPPER_SNAKE_CASE, SCREAMING_SNAKE_CASE) : 전통적으로 상수에 사용했습니다.
ex. "FIX_ME"


{@a change-detection}

<!--
## change detection
-->
## 변화 감지(change detection)

<!--
The mechanism by which the Angular framework synchronizes the state of an application's UI with the state of the data.
The change detector checks the current state of the data model whenever it runs, and maintains it as the previous state to compare on the next iteration.

As the application logic updates component data, values that are bound to DOM properties in the view can change.
The change detector is responsible for updating the view to reflect the current data model.
Similarly, the user can interact with the UI, causing events that change the state of the data model.
These events can trigger change detection.

Using the default ("CheckAlways") change-detection strategy, the change detector goes through the [view hierarchy](#view-tree) on each VM turn to check every [data-bound property](#data-binding) in the template. In the first phase, it compares the current state of the dependent data with the previous state, and collects changes.
In the second phase, it updates the page DOM to reflect any new data values.

If you set the `OnPush` ("CheckOnce") change-detection strategy, the change detector runs only when [explicitly invoked] (api/core/ChangeDetectorRef), or when it is triggered by an `Input` reference change or event handler. This typically improves performance. For more information, see [Optimize Angular's change detection](https://web.dev/faster-angular-change-detection/).
-->
Angular 프레임워크가 애플리케이션의 UI 상태와 데이터 상태를 동기화하는 구조를 의미합니다.
변화 감지가 실행되면 데이터 모델의 현재 상태를 검사하고 이 상태를 다음 변화 감지 싸이클까지 유지해서 상태를 변경해야 할지 결정합니다.

그래서 애플리케이션이 컴포넌트 데이터를 변경하면 이 내용이 DOM 프로퍼티에 반영되는 것을 확인할 수 있습니다.
변화 감지는 화면에 변경된 내용을 데이터 모델에 반영하는 역할도 합니다.
사용자가 UI에서 어떤 동작을 하면 이벤트가 발생하고 데이터 모델의 상태를 변경시키는 식입니다.
이벤트는 변화 감지를 발생시킨다고 볼 수 있습니다.

기본 변화 감지 정책("CheckAlways")를 사용하면 템플릿에 [데이터가 프로퍼티에 바인딩](#data-binding) 될 때마다 [뷰 계층](#view-tree)을 따라 내려가며 변화 감지가 동작합니다.
이 때 첫 번째 단계에서는 현재 상태와 이전 상태를 비교해서 변화가 발생한 상태를 모두 취합하며, 두 번째 단계에서는 새로운 데이터로 페이지 DOM을 갱신합니다.

변화 감지 정책으로 `OnPush`("CheckOnce")를 사용하면 변화 감지 동작은 개발자가 [명시적으로 실행](api/core/ChangeDetectorRef)하거나 `Input` 값이 변경되었을 때, 이벤트 핸들러가 동작했을 때만 실행됩니다.
일반적으로 이 정책은 성능을 향상시키기 위한 용도로 사용됩니다.
자세한 내용은 [Angular 변화 감지 동작 최적화하기](https://web.dev/faster-angular-change-detection/) 문서를 참고하세요.


{@a class-decorator}

<!--
## class decorator
-->
## 클래스 데코레이터(class decorator)

<!--
A [decorator](#decorator) that appears immediately before a class definition, which declares the class to be of the given type, and provides metadata suitable to the type.

The following decorators can declare Angular class types:
* `@Component()`
* `@Directive()`
* `@Pipe()`
* `@Injectable()`
* `@NgModule()`
-->
클래스 앞에 지정하는 [데코레이터](#decorator)를 의미합니다.
클래스를 특정 타입으로 지정하거나 해당 타입에 맞는 메타데이터를 지정하는 용도로 사용합니다.

Angular 클래스 타입에 지정할 수 있는 데코레이터는 이런 것들이 있습니다:
* `@Component()`
* `@Directive()`
* `@Pipe()`
* `@Injectable()`
* `@NgModule()`


{@a class-field-decorator}

<!--
## class field decorator
-->
## 클래스 필드 데코레이터(class field decorator)

<!--
A [decorator](#decorator) statement immediately before a field in a class definition that declares the type of that field. Some examples are `@Input` and `@Output`.
-->
클래스 필드 앞에 지정하는 [데코레이터](#decorator)를 의미합니다.
해당 필드를 `@Input`, `@Output`과 같은 특정 타입으로 지정합니다.


{@a collection}

<!--
## collection
-->
## 콜렉션(collection)

<!--
In Angular, a set of related [schematics](#schematic) collected in an [npm package](#npm-package).
-->
Angular에서는 [npm 패키지](#npm-package)로 구성된 [스키매틱](#schematic) 묶음을 의미합니다.


{@a cli}
{@a command-line-interface-cli}
<!--
## command-line interface (CLI)
-->
## 커맨드라인 인터페이스(command-line interface, CLI)

<!--
The [Angular CLI](cli) is a command-line tool for managing the Angular development cycle. Use it to create the initial filesystem scaffolding for a [workspace](#workspace) or [project](#project), and to run [schematics](#schematic) that add and modify code for initial generic versions of various elements. The CLI supports all stages of the development cycle, including building, testing, bundling, and deployment.

* To begin using the CLI for a new project, see [Local Environment Setup](guide/setup-local "Setting up for Local Development").
* To learn more about the full capabilities of the CLI, see the [CLI command reference](cli).

See also [Schematics CLI](#schematics-cli).
-->
[Angular CLI](cli)는 Angular 개발 과정에 사용하는 커맨드라인 툴입니다.
Angular CLI를 활용하면 [워크스페이스](#workspace)나 [프로젝트](#project)와 같은 파일시스템 기본 틀을 생성할 수 있고, [스키매틱](#schematic)을 실행할 수 있으며, Angular 구성요소를 자동으로 생성할 수 있습니다.

* Angular CLI를 사용해서 프로젝트를 시작하려면 [로컬 개발환경 설정](guide/setup-local "Setting up for Local Development") 문서를 참고하세요.

* Angular CLI를 사용하는 방법에 대해 알아보려면 [CLI 명령 참고](cli) 문서를 참고하세요.

[스키매틱 CLI](#schematics-cli) 섹션도 확인해 보세요.


{@a component}

<!--
## component
-->
## 컴포넌트(component)

<!--
A class with the `@Component()` [decorator](#decorator) that associates it with a companion [template](#template). Together, the component class and template define a [view](#view).
A component is a special type of [directive](#directive).
The `@Component()` decorator extends the `@Directive()` decorator with template-oriented features.

An Angular component class is responsible for exposing data and handling most of the view's display and user-interaction logic through [data binding](#data-binding).

Read more about component classes, templates, and views in [Introduction to Angular concepts](guide/architecture).
-->
`@Component()` [데코레이터](#decorator)를 사용해서 [템플릿](#template)과 연결된 클래스를 의미합니다.
[뷰](#view)는 이 컴포넌트 클래스와 템플릿이 조합되어 렌더링됩니다.
컴포넌트는 [디렉티브](#directive)의 특수한 타입이라고 할 수 있습니다.
`@Component()` 데코레이터는 `@Directive()` 데코레이터를 기반으로 템플릿 관련 기능을 확장한 것입니다.


Angular 컴포넌트 클래스는 화면에 표시될 데이터를 제공하며 화면에서 일어나는 모든 동작과 사용자 입력을 [데이터 바인딩](#data-binding)으로 처리합니다.

컴포넌트 클래스, 템플릿, 뷰에 대해 알아보려면 [Angular 개요](guide/architecture) 문서를 참고하세요.


{@a configuration}
<!--
## configuration
-->
## 환경설정(configuration)

<!--
See  [workspace configuration](#cli-config)
-->
[워크스페이스 환경설정](#cli-config) 섹션을 참고하세요.


{@a content-projection}

<!--
## content projection
-->
## 컨텐츠 프로젝션(content projection)

<!--
A way to insert DOM content from outside a component into the component's view in a designated spot.

For more information, see [Responding to changes in content](guide/lifecycle-hooks#content-projection).
-->
컴포넌트 밖에서 컴포넌트 안쪽으로 DOM 컨텐츠를 전달해서 표시하는 것을 의미합니다.

자세한 내용은 [외부 컨텐츠 변경사항 감지하기](guide/lifecycle-hooks#content-projection) 문서를 참고하세요.


{@a custom-element}

<!--
## custom element
-->
## 커스텀 엘리먼트(custom element)

<!--
A web platform feature, currently supported by most browsers and available in other browsers through polyfills (see [Browser support](guide/browser-support)).

The custom element feature extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. A custom element (also called a *web component*) is recognized by a browser when it's added to the [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry).

You can use the API to transform an Angular component so that it can be registered with the browser and used in any HTML that you add directly to the DOM within an Angular app. The custom element tag inserts the component's view, with change-detection and data-binding functionality, into content that would otherwise be displayed without Angular processing.

See [Angular element](#angular-element).

See also [dynamic component loading](#dynamic-components).
-->
웹 플랫폼이 제공하는 기능이며, 최신 브라우저는 모두 지원하고 오래된 브라우저는 폴리필을 활용하면 사용할 수 있습니다.
[브라우저 지원](guide/browser-support) 문서를 참고하세요.

커스텀 엘리먼트는 JavaScript 코드로 동작하는 태그를 정의해서 표준 HTML 문법을 확장하는 것을 의미합니다.
커스텀 엘리먼트는 *웹 컴포넌트(web component)* 라고도 하며, 브라우저 [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)에 추가하면 사용할 수 있습니다.

커스텀 엘리먼트는 Angular 컴포넌트로 변환할 수 있기 때문에 Angular 애플리케이션의 DOM 안에서는 커스텀 엘리먼트를 자유롭게 사용할 수 있습니다.
이렇게 사용되는 커스텀 엘리먼트 태그는 컴포넌트의 화면을 구성하거나, Angular의 변화 감지, 데이터 바인딩 기능을 활용할 수 있으며, Angular의 동작과 별개로 컨텐츠를 추가할 수도 있습니다.

자세한 내용은 [Angular 엘리먼트](#angular-element) 섹션과 [컴포넌트 동적 로드하기](#dynamic-components) 섹션을 참고하세요.


{@a D}

{@a data-binding}

<!--
## data binding
-->
## 데이터 바인딩(data binding)

<!--
A process that allows apps to display data values to a user and respond to user
actions (such as clicks, touches, and keystrokes).

In data binding, you declare the relationship between an HTML widget and a data source
and let the framework handle the details.
Data binding is an alternative to manually pushing application data values into HTML, attaching
event listeners, pulling changed values from the screen, and
updating application data values.

Read about the following forms of binding in Angular's [Template Syntax](guide/template-syntax):

 * [Interpolation](guide/interpolation)
 * [Property binding](guide/property-binding)
 * [Event binding](guide/event-binding)
 * [Attribute binding](guide/attribute-binding)
 * [Class binding](guide/attribute-binding#class-binding)
 * [Style binding](guide/attribute-binding#style-binding)
 * [Two-way data binding with ngModel](guide/built-in-directives#ngModel)
-->
사용자가 볼 수 있도록 데이터를 화면에 표시하거나 사용자의 동작(ex. 클릭, 터치, 키입력)에 반응하는 과정을 의미합니다.

데이터 바인딩을 사용하려면 HTML 위젯과 데이터 소스의 관계를 정의해야 하며, 이 관계를 정의하고 나면 프레임워크가 필요한 작업을 알아서 처리합니다.
데이터 바인딩은 애플리케이션 데이터를 HTML로 밀어넣거나 이벤트 리스너를 붙이는 과정, 화면에서 변경된 내용을 끌어와서 애플리케이션 데이터를 갱신하는 과정을 대신하는 것입니다.

Angular [템플릿 문법](guide/template-syntax)에서 다루는 데이터 바인딩의 종류는 이런 것들이 있습니다:

 * [문자열 바인딩(Interpolation)](guide/interpolation)
 * [프로퍼티 바인딩(Property binding)](guide/property-binding)
 * [이벤트 바인딩(Event binding)](guide/event-binding)
 * [어트리뷰트 바인딩(Attribute binding)](guide/attribute-binding)
 * [클래스 바인딩(Class binding)](guide/attribute-binding#class-binding)
 * [스타일 바인딩(Style binding)](guide/attribute-binding#style-binding)
 * [ngModel을 활용하는 양방향 바인딩(Two-way data binding with ngModel)](guide/built-in-directives#ngModel)


{@a declarable}

<!--
## declarable
-->
## 선언할 수 있는 항목(declarable)

<!--
A class type that you can add to the `declarations` list of an [NgModule](#ngmodule).
You can declare [components](#component), [directives](#directive), and [pipes](#pipe).

Don't declare the following:
* A class that's already declared in another NgModule
* An array of directives imported from another package. For example, don't declare `FORMS_DIRECTIVES` from `@angular/forms`
* NgModule classes
* Service classes
* Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes
-->
[NgModule](#ngmodule) `declarations` 배열에 등록할 수 있는 클래스 타입을 의미합니다.
이 배열에는 [컴포넌트](#component), [디렉티브](#directive), [파이프](#pipe)를 등록할 수 있습니다.

이런 클래스는 등록할 수 없습니다:

* 다른 NgModule에 등록된 클래스
* 다른 패키지에서 불러온 디렉티브 배열(ex. `@angular/forms`에서 불러온 `FORMS_DIRECTIVES`)
* NgModule 클래스
* 서비스 클래스
* Angular 구성요소가 아닌 클래스, 객체(문자열, 숫자, 함수, 데이터 모델, 환경설정, 비즈니스 로직, 헬퍼 클래스)


{@a decorator}

{@a decoration}
{@a decorator--decoration}
<!--
## decorator | decoration
-->
## 데코레이터(decorator), 데코레이션(decoration)

<!--
A function that modifies a class or property definition. Decorators (also called *annotations*) are an experimental (stage 2) [JavaScript language feature](https://github.com/wycats/javascript-decorators).
TypeScript adds support for decorators.

Angular defines decorators that attach metadata to classes or properties
so that it knows what those classes or properties mean and how they should work.

See [class decorator](#class-decorator), [class field decorator](#class-field-decorator).
-->
클래스나 클래스 프로퍼티의 동작을 변경하는 함수를 의미합니다.
데코레이터(어노테이션, annotation)은 [JavaScript 언어 스펙](https://github.com/wycats/javascript-decorators) 중 실험적인(스테이지 2) 기능에 해당됩니다.
TypeScript는 데코레이터를 지원하고 있습니다.

Angular는 데코레이터에 메타데이터를 지정하는 방식으로 클래스나 클래스 프로퍼티를 확장합니다.

[클래스 데코레이터](#class-decorator), [클래스 필드 데코레이터](#class-field-decorator)도 확인해 보세요.


{@a di}

{@a dependency-injection}
{@a dependency-injection-di}

<!--
## dependency injection (DI)
-->
## 의존성 주입(dependency injection, DI)

<!--
A design pattern and mechanism for creating and delivering some parts of an application (dependencies) to other parts of an application that require them.

In Angular, dependencies are typically services, but they also can be values, such as strings or functions.
An [injector](#injector) for an app (created automatically during bootstrap) instantiates dependencies when needed, using a configured [provider](#provider) of the service or value.

Learn more in [Dependency Injection in Angular](guide/dependency-injection).
-->
애플리케이션의 일부(의존성 객체)를 사용하는 시점에 외부에서 생성해서 전달하는 디자인 패턴이자 동작 방식을 의미합니다.

Angular에서 의존성 객체는 일반적으로 서비스이지만, 특정 값이나 문자열, 함수도 의존성 객체가 될 수 잇습니다.
애플리케이션은 부트스트랩 단계에서 자동으로 [인젝터(injector)](#injector)를 생성하며, 필요한 시점에 이 인젝터가 [프로바이더](#provider)에 등록된 대로 의존성 객체를 생성해서 전달합니다.

자세한 내용은 [Angular의 의존성 주입](guide/dependency-injection) 문서를 참고하세요.


{@a di-token}

<!--
## DI token
-->
## 의존성 객체 토큰(DI token)

<!--
A lookup token associated with a dependency [provider](#provider), for use with the [dependency injection](#di) system.
-->
[의존성 주입](#di) 시스템에서 의존성 객체의 [프로바이더](#provider)를 찾을 때 사용하는 토큰입니다.


{@a differential-loading}

<!--
## differential loading
-->
## 증분 로딩(differential loading)

<!--
A build technique that creates two bundles for an application. One smaller bundle is for modern browsers. A second, larger bundle allows the application to run correctly in older browsers (such as IE11) that do not support all modern browser APIs.

For more information, see the [Deployment](guide/deployment#differential-loading) guide.
-->
애플리케이션 빌드 결과물을 두 벌로 생성하는 테크닉을 의미합니다.
이 방식을 사용하면 최신 브라우저에서 동작하는 작은 빌드 결과물을 한 벌 생성하고, 최신 브라우저 API를 지원하지 않는 오래된 브라우저(ex. IE11)에서 동작하는 빌드 결과물을 한 벌 생성합니다.

자세한 내용은 [배포](guide/deployment#differential-loading) 문서를 참고하세요.


{@a directive}
{@a directives}

<!--
## directive
-->
## 디렉티브(directive)

<!--
A class that can modify the structure of the DOM or modify attributes in the DOM and component data model. A directive class definition is immediately preceded by a `@Directive()` [decorator](#decorator) that supplies metadata.

A directive class is usually associated with an HTML element or attribute, and that element or attribute is often referred to as the directive itself. When Angular finds a directive in an HTML [template](#template), it creates the matching directive class instance and gives the instance control over that portion of the browser DOM.

There are three categories of directive:
* [Components](#component) use `@Component()` (an extension of `@Directive()`) to associate a template with a class.

* [Attribute directives](#attribute-directive) modify behavior and appearance of page elements.

* [Structural directives](#structural-directive) modify the structure of the DOM.

Angular supplies a number of built-in directives that begin with the `ng` prefix.
You can also create new directives to implement your own functionality.
You associate a *selector* (an HTML tag such as `<my-directive>`) with a custom directive, thereby extending the [template syntax](guide/template-syntax) that you can use in your apps.
-->
DOM 구조, 어트리뷰트 동작, 컴포넌트 데이터 모델을 조작하는 클래스를 의미합니다.
디렉티브 클래스는 메타데이터를 `@Directive()` [데코레이터](#decorator)에 전달하고 클래스 앞에 붙여 선언합니다.

디렉티브 클래스는 일반적으로 HTML 엘리먼트나 어트리뷰트와 관련이 있으며, 디렉티브 자체를 조작하기도 합니다.
Angular는 HTML [템플릿](#template)에서 디렉티브 클래스와 매칭되는 셀렉터를 찾으면 해당 디렉티브 클래스의 인스턴스를 생성하며, 이 인스턴스가 브라우저 DOM을 조작합니다.

디렉티브는 3종류로 구분할 수 있습니다:

* [컴포넌트(component)](#component) : `@Directive()`를 확장한 `@Component()` 데코레이터를 사용합니다. 템플릿과 클래스 코드를 묶은 단위입니다.

* [어트리뷰트 디렉티브(attribute directive)](#attribute-directive) : 엘리먼트의 동작이나 모습을 조작합니다.

* [구조 디렉티브(structural directive)](#structural-directive) : DOM 구조를 조작합니다.

Angular가 제공하는 기본 디렉티브는 모두 `ng` 접두사로 시작됩니다.
그리고 필요한 로직을 담아 새로운 디렉티브를 만드는 것도 가능합니다.
디렉티브의 *셀렉터*를 `<my-directive>`와 같이 정의한 후에 [템플릿 문법](guide/template-syntax)에 따라 원하는 동작을 하면 됩니다.


{@a dom}

<!--
## domain-specific language (DSL)
-->
## 특정 도메인 언어(domain-specific language, DSL)

<!--
A special-purpose library or API; see [Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language).
Angular extends TypeScript with domain-specific languages for a number of domains relevant to Angular apps, defined in NgModules such as [animations](guide/animations), [forms](guide/forms), and [routing and navigation](guide/router).
-->
특정 용도로 사용되는 라이브러리나 API를 의미합니다.
[Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language) 문서를 참고하세요.
Angular는 TypeScript를 특정 도메인 언어로 사용해서 Angular앱에 필요한 기능을 구현하고 있습니다.
[애니메이션](guide/animations), [폼](guide/forms), [라우팅과 네비게이션](guide/router) 등이 그렇습니다.


{@a dynamic-components}

<!--
## dynamic component loading
-->
## 컴포넌트 동적 로드하기

<!--
A technique for adding a component to the DOM at run time. Requires that you exclude the component from compilation and then connect it to Angular's change-detection and event-handling framework when you add it to the DOM.

See also [custom element](#custom-element), which provides an easier path with the same result.
-->
실행시점에 컴포넌트를 DOM에 추가하는 테크닉을 의미합니다.
이 컴포넌트는 DOM에 추가되는 시점에 컴파일되며 이 시점부터 Angular의 변화 감지 동작과 이벤트 처리 동작이 연결됩니다.

[커스텀 엘리먼트](#custom-element)를 사용해도 같은 효과를 낼 수 있지만 커스텀 엘리먼트를 활용하는 방법이 좀 더 쉽습니다.


{@a E}

{@a eager-loading}

<!--
## eager loading
-->
## 즉시 로딩(eager loading)

<!--
NgModules or components that are loaded on launch are called eager-loaded, to distinguish them from those
that are loaded at run time (lazy-loaded).
See [lazy loading](#lazy-load).
-->
애플리케이션이 로드되면서 함께 로드되는 NgModule이나 컴포넌트를 즉시 로딩(eager-loaded)되었다고 합니다.
실행시점에 로드되는 지연로딩(lazy-loaded)과는 다릅니다.

[지연 로딩](#lazy-load) 섹션을 참고하세요.


{@a ecma}

## ECMAScript

<!--
The [official JavaScript language specification](https://en.wikipedia.org/wiki/ECMAScript).

Not all browsers support the latest ECMAScript standard, but you can use a [transpiler](#transpile) (like [TypeScript](#typescript)) to write code using the latest features, which will then be transpiled to code that runs on versions that are supported by browsers.

To learn more, see [Browser Support](guide/browser-support).
-->
[JavaScript 언어의 공식 스펙](https://en.wikipedia.org/wiki/ECMAScript)을 의미합니다.

모든 브라우저가 ECMAScript 표준을 지원하는 것은 아니기 때문에 최신 기능을 활용하려면 [TypeScript](#typescript)와 같은 [트랜스파일러](#transpile)를 사용해서 브라우저 버전에 맞는 코드로 변환해야 합니다.

자세한 내용을 알아보려면 [브라우저 지원](guide/browser-support) 문서를 참고하세요.


{@a element}

<!--
## element
-->
## 엘리먼트(element)

<!--
Angular defines an `ElementRef` class to wrap render-specific native UI elements.
In most cases, this allows you to use Angular templates and data binding to access DOM elements
without reference to the native element.

The documentation generally refers to *elements* (`ElementRef` instances), as distinct from  *DOM elements*
(which can be accessed directly if necessary).

Compare to [custom element](#custom-element).
-->
Angular는 표준 UI 엘리먼트를 랩핑하는 `ElementRef` 클래스를 제공합니다.
그래서 보통은 표준 엘리먼트를 직접 참조하지 않아도 Angular 템플릿과 데이터 바인딩을 처리할 수 있습니다.

Angular 가이드 문서에서 언급하는 *엘리먼트* 는 보통 *DOM 엘리먼트* 를 의미합니다.

[커스텀 엘리먼트](#custom-element)와는 어떻게 다른지 확인해 보세요.


{@a entry-point}

<!--
## entry point
-->
## 진입점(entry point)

<!--
A [JavaScript module](#module) that is intended to be imported by a user of [an
npm package](guide/npm-packages). An entry-point module typically re-exports
symbols from other internal modules. A package can contain multiple
entry points. For example, the `@angular/core` package has two entry-point
modules, which can be imported using the module names `@angular/core` and
`@angular/core/testing`.
-->
[npm 패키지](guide/npm-packages)로 제공되어 개발자가 로드해서 사용하는 [JavaScript 모듈](#module)를 의미합니다.
진입점이 되는 모듈은 일반적으로 다른 내부 모듈의 심볼을 불러와서 다시 외부로 공개(re-export) 하는 방식으로 구성됩니다.
예를 들어 `@angular/core` 패키지에는 진입점이 되는 모듈이 2개 있는데, 각각 `@angular/core`와 `@angular/core/testing` 모듈을 로드합니다.


{@a F}

{@a form-control}

<!--
## form control
-->
## 폼 컨트롤(form control)

<!--
A instance of `FormControl`, which is a fundamental building block for Angular forms. Together with `FormGroup` and `FormArray`, tracks the value, validation, and status of a form input element.

Read more forms in the [Introduction to forms in Angular](guide/forms-overview).
-->
Angular 폼을 구성하는 개별 구성요소인 `FormControl` 인스턴스를 의미합니다.
폼 컨트롤은 `FormGroup`이나 `FormArray`로 묶어서 관리할 수 있으며, 폼 입력 엘리먼트의 값을 추적하면서 유효성을 검사하고 폼의 상태를 관리합니다.

자세한 내용은 [Angular 폼 소개](guide/forms-overview) 문서를 참고하세요.


{@a form-model}

<!--
## form model
-->
## 폼 모델(form model)

<!--
The "source of truth" for the value and validation status of a form input element at a given point in time. When using [reactive forms](#reactive-forms), the form model is created explicitly in the component class. When using [template-driven forms](#template-driven-forms), the form model is implicitly created by directives.

Learn more about reactive and template-driven forms in the [Introduction to forms in Angular](guide/forms-overview).
-->
폼 입력 엘리먼트의 값과 유효성 상태를 참조할 때 사용하는 "원천 소스(source of truth)"를 의미합니다.
[반응형 폼](#reactive-forms)을 사용하면 컴포넌트 클래스에 명시적으로 폼 모델을 구성하고, [템플릿 기반 폼](#template-driven-forms)을 사용하면 디렉티브로 폼 모델을 구성합니다.

반응형 폼과 템플릿 기반 폼에 대해 알아보려면 [Angular 폼 소개](guide/forms-overview) 문서를 참고하세요.


{@a form-validation}

<!--
## form validation
-->
## 폼 유효성 검사(form validation)

<!--
A check that runs when form values change and reports whether the given values are correct and complete, according to the defined constraints. Reactive forms apply [validator functions](guide/form-validation#adding-to-reactive-forms). Template-driven forms use [validator directives](guide/form-validation#adding-to-template-driven-forms).


To learn more, see [Form Validation](guide/form-validation).
-->
폼 값이 변경되었을 때 정해진 규칙에 따라 이 값을 검사해서 값이 유효한지, 입력이 끝났는지 판단하는 과정을 의미합니다.
반응형 폼은 [유효성 검사 함수](guide/form-validation#adding-to-reactive-forms)를 사용하며 템플릿 기반 폼은 [유효성 검사 디렉티브](guide/form-validation#adding-to-template-driven-forms)를 사용합니다.

자세한 내용은 [폼 유효성 검사](guide/form-validation) 문서를 참고하세요.

{@a G}


{@a H}

{@a I}


{@a immutability}

<!--
## immutability
-->
## 불변성(immutability)

<!--
The ability to alter the state of a value after its creation. [Reactive forms](#reactive-forms) perform immutable changes in that
each change to the data model produces a new data model rather than modifying the existing one. [Template-driven forms](#template-driven-forms) perform mutable changes with `NgModel` and [two-way data binding](#data-binding) to modify the existing data model in place.
-->
생성된 후에 상태가 변경될 수 있는 성질을 의미합니다.
[반응형 폼](#reactive-forms)에서는 불변성을 기반으로 하기 때문에 개별 데이터가 변경될 때마다 기존 데이터 모델을 활용하지 않고 새로운 데이터 모델을 생성합니다.
[템플릿 기반 폼](#template-driven-forms)은 `NgModel`과 [양방향 데이터 바인딩](#data-binding)을 활용해서 기존 데이터 모델 내부 값을 변경합니다.


{@a injectable}

<!--
## injectable
-->
## 의존성으로 주입할 수 있는 객체(injectable)

<!--
An Angular class or other definition that provides a dependency using the [dependency injection](#di) mechanism. An injectable [service](#service) class must be marked by the `@Injectable()` [decorator](#decorator). Other items, such as constant values, can also be injectable.
-->
[의존성 주입](#di) 메커니즘에 의해 의존성 객체로 주입될 수 있는 Angular 클래스나 객체를 의미합니다.
의존성으로 주입되는 [서비스](#service) 클래스는 반드시 `@Injectable()` [데코레이터](#decorator)가 지정되어야 하며, 상수는 데코레이터가 지정되지 않아도 의존성 객체로 주입될 수 있습니다.


{@a injector}

<!--
## injector
-->
## 인젝터(injector)

<!--
An object in the Angular [dependency-injection](#dependency-injection) system
that can find a named dependency in its cache or create a dependency
using a configured [provider](#provider).
Injectors are created for NgModules automatically as part of the bootstrap process
and are inherited through the component hierarchy.

* An injector provides a singleton instance of a dependency, and can inject this same instance in multiple components.

* A hierarchy of injectors at the NgModule and component level can provide different instances of a dependency to their own components and child components.

* You can configure injectors with different providers that can provide different implementations of the same dependency.

Learn more about the injector hierarchy in [Hierarchical Dependency Injectors](guide/hierarchical-dependency-injection).
-->
Angular [의존성 주입](#dependency-injection) 시스템 안에 있는 객체로, 미리 설정된 [프로바이더](#provider) 대로 의존성 객체를 생성하고 캐싱하는 역할을 합니다.
인젝터는 애플리케이션 부트스트랩 과정 중에 NgModule이 자동으로 생성하며, 컴포넌트 계층에 따라 개별 인젝터가 생성됩니다.

* 인젝터는 의존성 객체를 싱글턴(singleton) 인스턴스로 관리하기 때문에, 여러 컴포넌트에 같은 인스턴스를 주입할 수 있습니다.

* NgModule와 컴포넌트 계층에 따라 구성되는 인젝터 계층에 따라 의존성 객체가 다른 인스턴스로 주입될 수 있습니다.

* 어떤 의존성 객체를 다른 객체가 대신하도록 프로바이더를 등록할 수 있습니다.

인젝터 계층에 대해 자세하게 알아보려면 [인젝터 계층](guide/hierarchical-dependency-injection) 문서를 참고하세요.


{@a input}

<!--
## input
-->
## 입력 프로퍼티 데코레이터(input)

<!--
When defining a [directive](#directive), the `@Input()` decorator on a directive property
makes that property available as a *target* of a [property binding](guide/property-binding).
Data values flow into an input property from the data source identified
in the [template expression](#template-expression) to the right of the equal sign.

To learn more, see [input and output properties](guide/inputs-outputs).
-->
[디렉티브](#directive)를 정의할 때 디렉티브 프로퍼티에 `@Input()` 데코레이터를 붙이면 이 프로퍼티를 [프로퍼티 바인딩](guide/property-binding) *대상* 으로 만들 수 있습니다.
[템플릿 표현식](#template-expression)에서 등호(`=`) 오른쪽에 있는 데이터 값이 이 입력 프로퍼티를 통해 디렉티브 안쪽으로 전달됩니다.

자세한 내용은 [입출력 프로퍼티](guide/inputs-outputs) 문서를 참고하세요.



{@a interpolation}

<!--
## interpolation
-->
## 문자열 바인딩(interpolation)

<!--
A form of property [data binding](#data-binding) in which a [template expression](#template-expression) between double-curly braces renders as text.
That text can be concatenated with neighboring text before it is assigned to an element property
or displayed between element tags, as in this example.

```html
<label>My current hero is {{hero.name}}</label>
```


Read more in the [Interpolation](guide/interpolation) guide.
-->
[템플릿 표현식](#template-expression)에서 이중 중괄호(`{{`, `}}`)로 [바인딩된 데이터](#data-binding)를 문자열로 렌더링하는 방식입니다.
이 문자열은 이웃한 문자열과 조합되어 엘리먼트 프로퍼티로 할당되거나 엘리먼트 태그 안에 표시됩니다.

```html
<label>My current hero is {{hero.name}}</label>
```

자세한 내용은 [문자열 바인딩](guide/interpolation) 문서를 참고하세요.


{@a ivy}

## Ivy

<!--
Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7).
With the version 9 release of Angular, the new compiler and runtime instructions are used by default instead of the older compiler and runtime, known as [View Engine](#ve).

See [Angular Ivy](guide/ivy).
-->
Ivy는 Angular의 [다음 세대 컴파일러이자 렌더링 파이프라인](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7)의 코드명입니다.
Angular 9 버전부터는 이전까지 사용하던 [View Engine](#ve)대신 이 컴파일러가 기본으로 사용됩니다.

자세한 내용은 [Angular Ivy](guide/ivy) 문서를 참고하세요.


{@a J}

{@a javascript}

## JavaScript

<!--
See [ECMAScript](#ecma), [TypeScript](#typescript).
-->
[ECMAScript](#ecma), [TypeScript](#typescript) 섹션을 참고하세요.


{@a jit}


## just-in-time (JIT) compilation

The Angular just-in-time (JIT) compiler converts your Angular HTML and TypeScript code into
efficient JavaScript code at run time, as part of bootstrapping.

JIT compilation is the default (as opposed to AOT compilation) when you run Angular's `ng build` and `ng serve` CLI commands, and is a good choice during development.
JIT mode is strongly discouraged for production use
because it results in large application payloads that hinder the bootstrap performance.

Compare to [ahead-of-time (AOT) compilation](#aot).


{@a K}


{@a L}

{@a lazy-load}

## lazy loading

A process that speeds up application load time by splitting the application into multiple bundles and loading them on demand.
For example, dependencies can be lazy loaded as needed&mdash;as opposed to [eager-loaded](#eager-loading) modules that are required by the root module and are thus loaded on launch.

The [router](#router) makes use of lazy loading to load child views only when the parent view is activated.
Similarly, you can build custom elements that can be loaded into an Angular app when needed.

{@a library}

## library

In Angular, a [project](#project) that provides functionality that can be included in other Angular apps.
A library isn't a complete Angular app and can't run independently.
(To add re-usable Angular functionality to non-Angular web apps, you can use Angular [custom elements](#angular-element).)

* Library developers can use the [Angular CLI](#cli) to `generate` scaffolding for a new library in an existing [workspace](#workspace), and can publish a library as an `npm` package.

* Application developers can use the [Angular CLI](#cli) to `add` a published library for use with an application in the same [workspace](#workspace).

See also [schematic](#schematic).

{@a lifecycle-hook}

## lifecycle hook

An interface that allows you to tap into the lifecycle of [directives](#directive) and [components](#component) as they are created, updated, and destroyed.

Each interface has a single hook method whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit`.

Angular calls these hook methods in the following order:

* `ngOnChanges`: When an [input](#input)/[output](#output) binding value changes.
* `ngOnInit`: After the first `ngOnChanges`.
* `ngDoCheck`: Developer's custom change detection.
* `ngAfterContentInit`: After component content initialized.
* `ngAfterContentChecked`: After every check of component content.
* `ngAfterViewInit`: After a component's views are initialized.
* `ngAfterViewChecked`: After every check of a component's views.
* `ngOnDestroy`: Just before the directive is destroyed.

To learn more, see [Lifecycle Hooks](guide/lifecycle-hooks).

{@a M}

{@a module}

## module

In general, a module collects a block of code dedicated to a single purpose. Angular uses standard JavaScript modules and also defines an Angular module, `NgModule`.

In JavaScript (ECMAScript), each file is a module and all objects defined in the file belong to that module. Objects can exported, making them public, and public objects can be imported for use by other modules.

Angular ships as a collection of JavaScript modules (also called libraries). Each Angular library name begins with the `@angular` prefix. Install Angular libraries with the [npm package manager](https://docs.npmjs.com/getting-started/what-is-npm) and import parts of them with JavaScript `import` declarations.

Compare to [NgModule](#ngmodule).


{@a N}

{@a ngcc}

## ngcc

Angular compatibility compiler.
If you build your app using [Ivy](#ivy), but it depends on libraries that have not been compiled with Ivy, the CLI uses `ngcc` to automatically update the dependent libraries to use Ivy.


{@a ngmodule}

## NgModule

A class definition preceded by the `@NgModule()` [decorator](#decorator), which declares and serves as a manifest for a block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.

Like a [JavaScript module](#module), an NgModule can export functionality for use by other NgModules and import public functionality from other NgModules.
The metadata for an NgModule class collects components, directives, and pipes that the application uses along with the list of imports and exports. See also [declarable](#declarable).

NgModules are typically named after the file in which the exported thing is defined. For example, the Angular [DatePipe](api/common/DatePipe) class belongs to a feature module named `date_pipe` in the file `date_pipe.ts`. You import them from an Angular [scoped package](#scoped-package) such as `@angular/core`.

Every Angular application has a root module. By convention, the class is called `AppModule` and resides in a file named `app.module.ts`.

To learn more, see [NgModules](guide/ngmodules).

{@a npm-package}

## npm package

The [npm package manager](https://docs.npmjs.com/getting-started/what-is-npm) is used to distribute and load Angular modules and libraries.

Learn more about how Angular uses [Npm Packages](guide/npm-packages).

{@a ngc}

## ngc
`ngc` is a Typescript-to-Javascript transpiler that processes Angular decorators, metadata, and templates, and emits JavaScript code.
The most recent implementation is internally referred to as `ngtsc` because it's a minimalistic wrapper around the TypeScript compiler `tsc` that adds a transform for processing Angular code.

{@a O}

{@a observable}

## observable

A producer of multiple values, which it pushes to [subscribers](#subscriber). Used for asynchronous event handling throughout Angular. You execute an observable by subscribing to it with its `subscribe()` method, passing callbacks for notifications of new values, errors, or completion.

Observables can deliver single or multiple values of any type to subscribers, either synchronously (as a function delivers a value to its caller) or on a schedule. A subscriber receives notification of new values as they are produced and notification of either normal completion or error completion.

Angular uses a third-party library called [Reactive Extensions (RxJS)](http://reactivex.io/rxjs/).

To learn more, see [Observables](guide/observables).


{@a observer}

## observer

An object passed to the `subscribe()` method for an [observable](#observable). The object defines the callbacks for the [subscriber](#subscriber).

{@a output}

## output

When defining a [directive](#directive), the `@Output{}` decorator on a directive property
makes that property available as a *target* of [event binding](guide/event-binding).
Events stream *out* of this property to the receiver identified
in the [template expression](#template-expression) to the right of the equal sign.

To learn more, see [Input and Output Properties](guide/inputs-outputs).


{@a P}

{@a pipe}

## pipe

A class which is preceded by the `@Pipe{}` decorator and which defines a function that transforms input values to output values for display in a [view](#view). Angular defines various pipes, and you can define new pipes.

To learn more, see [Pipes](guide/pipes).

{@a platform}

## platform

In Angular terminology, a platform is the context in which an Angular application runs.
The most common platform for Angular applications is a web browser, but it can also be an operating system for a mobile device, or a web server.

Support for the various Angular run-time platforms is provided by the `@angular/platform-*` packages. These packages allow applications that make use of `@angular/core` and `@angular/common` to execute in different environments by providing implementation for gathering user input and rendering UIs for the given platform. Isolating platform-specific functionality allows the developer to make platform-independent use of the rest of the framework.

* When running in a web browser, [`BrowserModule`](api/platform-browser/BrowserModule) is imported from the `platform-browser` package, and supports services that simplify security and event processing, and allows applications to access browser-specific features, such as interpreting keyboard input and controlling the title of the document being displayed. All applications running in the browser use the same platform service.

* When [server-side rendering](#server-side-rendering) (SSR) is used, the [`platform-server`](api/platform-server) package provides web server implementations of the `DOM`, `XMLHttpRequest`, and other low-level features that don't rely on a browser.

{@a polyfill}

## polyfill

An [npm package](guide/npm-packages) that plugs gaps in a browser's JavaScript implementation.
See [Browser Support](guide/browser-support) for polyfills that support particular functionality for particular platforms.

{@a project}

## project

In the Angular CLI, a standalone application or [library](#library) that can be created or modified by a CLI command.

A project, as generated by the [`ng new`](cli/new), contains the set of source files, resources, and configuration files that you need to develop and test the application using the CLI. Projects can also be created with the `ng generate application` and `ng generate library` commands.

For more information, see [Project File Structure](guide/file-structure).

The [`angular.json`](guide/workspace-config) file configures all projects in a [workspace](#workspace).

{@a provider}

## provider

An object that implements one of the [`Provider`](api/core/Provider) interfaces. A provider object defines how to obtain an injectable dependency associated with a [DI token](#token).
An [injector](#injector) uses the provider to create a new instance of a dependency
for a class that requires it.

Angular registers its own providers with every injector, for services that Angular defines.
You can register your own providers for services that your app needs.

See also [service](#service), [dependency injection](#di).

Learn more in [Dependency Injection](guide/dependency-injection).


{@a Q}

{@a R}

{@a reactive-forms}

## reactive forms

A framework for building Angular forms through code in a component.
The alternative is a [template-driven form](#template-driven-forms).

When using reactive forms:

* The "source of truth", the form model, is defined in the component class.
* Validation is set up through validation functions rather than validation directives.
* Each control is explicitly created in the component class by creating a `FormControl` instance manually or with `FormBuilder`.
* The template input elements do *not* use `ngModel`.
* The associated Angular directives are prefixed with `form`, such as `formControl`, `formGroup`, and `formControlName`.

The alternative is a template-driven form. For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms](guide/forms-overview).

{@a resolver}

## resolver

A class that implements the [Resolve](api/router/Resolve "API reference") interface (or a function with the same signature as the [resolve() method](api/router/Resolve#resolve "API reference")) that you use to produce or retrieve data that is needed before navigation to a requested route can be completed.

Resolvers run after all [route guards](#route-guard "Definition") for a route tree have been executed and have succeeded.

See an example of using a [resolve guard](guide/router-tutorial-toh#resolve-guard "Routing techniques tutorial") to retrieve dynamic data.

{@a route-guard}

## route guard

A method that controls navigation to a requested route in a routing application.
Guards determine whether a route can be activated or deactivated, and whether a lazy-loaded module can be loaded.

Learn more in the [Routing and Navigation](guide/router#preventing-unauthorized-access "Examples") guide.


{@a router}
{@a router-module}

## router

A tool that configures and implements navigation among states and [views](#view) within an Angular app.

The `Router` module is an [NgModule](#ngmodule) that provides the necessary service providers and directives for navigating through application views. A [routing component](#routing-component) is one that imports the `Router` module and whose template contains a `RouterOutlet` element where it can display views produced by the router.

The router defines navigation among views on a single page, as opposed to navigation among pages. It interprets URL-like links to determine which views to create or destroy, and which components to load or unload. It allows you to take advantage of [lazy loading](#lazy-load) in your Angular apps.

To learn more, see [Routing and Navigation](guide/router).

{@a router-outlet}

## router outlet

A [directive](#directive) that acts as a placeholder in a routing component's template. Angular dynamically renders the template based on the current router state.

{@a router-component}

## routing component

An Angular [component](#component) with a `RouterOutlet` directive in its template that displays views based on router navigations.

For more information, see [Routing and Navigation](guide/router).

{@a rule}

## rule

In [schematics](#schematic), a function that operates on a [file tree](#file-tree) to create, delete, or modify files in a specific manner.

{@a S}

{@a schematic}

## schematic

A scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code.
A schematic defines [rules](#rule) that operate on a virtual file system called a [tree](#file-tree).

The [Angular CLI](#cli) uses schematics to generate and modify [Angular projects](#project) and parts of projects.

* Angular provides a set of schematics for use with the CLI. See the [Angular CLI command reference](cli). The [`ng add`](cli/add) command runs schematics as part of adding a library to your project. The [`ng generate`](cli/generate) command runs schematics to create apps, libraries, and Angular code constructs.

* [Library](#library) developers can create schematics that enable the Angular CLI to add and update their published libraries, and to generate artifacts the library defines.
Add these schematics to the npm package that you use to publish and share your library.

For more information, see [Schematics](guide/schematics) and [Integrating Libraries with the CLI](guide/creating-libraries#integrating-with-the-cli).

{@a schematics-cli}

## Schematics CLI

Schematics come with their own command-line tool.
Using Node 6.9 or above, install the Schematics CLI globally:

<code-example language="bash">
npm install -g @angular-devkit/schematics-cli
</code-example>

This installs the `schematics` executable, which you can use to create a new schematics [collection](#collection) with an initial named schematic. The collection folder is a workspace for schematics. You can also use the `schematics` command to add a new schematic to an existing collection, or extend an existing schematic.

{@a scoped-package}

## scoped package

A way to group related [npm packages](guide/npm-packages).
NgModules are delivered within scoped packages whose names begin with the Angular *scope name* `@angular`. For example, `@angular/core`, `@angular/common`, `@angular/forms`, and `@angular/router`.

Import a scoped package in the same way that you import a normal package.

<code-example path="architecture/src/app/app.component.ts" header="architecture/src/app/app.component.ts (import)" region="import">

</code-example>

{@a server-side-rendering}

## server-side rendering

A technique that generates static application pages on the server, and can generate and serve those pages in response to requests from browsers.
It can also pre-generate pages as HTML files that you serve later.

This technique can improve performance on mobile and low-powered devices and improve the user experience by showing a static first page quickly while the client-side app is loading.
The static version can also make your app more visible to web crawlers.

You can easily prepare an app for server-side rendering by using the [CLI](#cli) to run the [Angular Universal](#universal) tool, using the `@nguniversal/express-engine` [schematic](#schematic).


{@a service}

## service

In Angular, a class with the [@Injectable()](#injectable) decorator that encapsulates non-UI logic and code that can be reused across an application.
Angular distinguishes components from services to increase modularity and reusability.

The `@Injectable()` metadata allows the service class to be used with the [dependency injection](#di) mechanism.
The injectable class is instantiated by a [provider](#provider).
[Injectors](#injector) maintain lists of providers and use them to provide service instances when they are required by components or other services.

To learn more, see [Introduction to Services and Dependency Injection](guide/architecture-services).

{@a structural-directive}
{@a structural-directives}

## structural directives

A category of [directive](#directive) that is responsible for shaping HTML layout by modifying the DOM&mdash;that is, adding, removing, or manipulating elements and their children.

To learn more, see [Structural Directives](guide/structural-directives).

{@a subscriber}

## subscriber

A function that defines how to obtain or generate values or messages to be published. This function is executed when a consumer calls the `subscribe()` method of an [observable](#observable).

The act of subscribing to an observable triggers its execution, associates callbacks with it, and creates a `Subscription` object that lets you unsubscribe.

The `subscribe()` method takes a JavaScript object (called an [observer](#observer)) with up to three callbacks, one for each type of notification that an observable can deliver:

* The `next` notification sends a value such as a number, a string, or an object.
* The `error` notification sends a JavaScript Error or exception.
* The `complete` notification doesn't send a value, but the handler is called when the call completes. Scheduled values can continue to be returned after the call completes.

{@a T}

{@a target}

## target

A buildable or runnable subset of a [project](#project), configured as an object in the [workspace configuration file](guide/workspace-config#project-tool-configuration-options), and executed by an [Architect](#architect) [builder](#builder).

In the `angular.json` file, each project has an "architect" section that contains targets which configure builders. Some of these targets correspond to [CLI commands](#cli), such as `build`, `serve`, `test`, and `lint`.

For example, the Architect builder invoked by the `ng build` command to compile a project uses a particular build tool, and has a default configuration whose values can be overridden on the command line. The `build` target also defines an alternate configuration for a "production" build, that can be invoked with the `--prod` flag on the `build` command.

The Architect tool provides a set of builders. The [`ng new` command](cli/new) provides a set of targets for the initial application project. The [`ng generate application`](cli/generate#application) and [`ng generate library`](cli/generate#library) commands provide a set of targets for each new [project](#project). These targets, their options and configurations, can be customized to meet the needs of your project. For example, you may want to add a "staging" or "testing" configuration to a project's "build" target.

You can also define a custom builder, and add a target to the project configuration that uses your custom builder. You can then run the target using the [`ng run`](cli/run) CLI command.

{@a template}

## template

Code that defines how to render a component's [view](#view).

A template combines straight HTML with Angular [data-binding](#data-binding) syntax, [directives](#directive),
and [template expressions](#template-expression) (logical constructs).
The Angular elements insert or calculate values that modify the HTML elements before the page is displayed. Learn more about Angular template language in the [Template Syntax](guide/template-syntax) guide.

A template is associated with a [component class](#component) through the `@Component()` [decorator](#decorator). The template code can be provided inline, as the value of the `template` property, or in a separate HTML file linked through the `templateUrl` property.

Additional templates, represented by `TemplateRef` objects, can define alternative or *embedded* views, which can be referenced from multiple components.

{@a template-driven-forms}

## template-driven forms

A format for building Angular forms using HTML forms and input elements in the view.
The alternative format uses the [reactive forms](#reactive-forms) framework.

When using template-driven forms:

* The "source of truth" is the template. The validation is defined using attributes on the individual input elements.
* [Two-way binding](#data-binding) with `ngModel` keeps the component model synchronized with the user's entry into the input elements.
* Behind the scenes, Angular creates a new control for each input element, provided you have set up a `name` attribute and two-way binding for each input.
* The associated Angular directives are prefixed with `ng` such as `ngForm`, `ngModel`, and `ngModelGroup`.

The alternative is a reactive form. For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms](guide/forms-overview).

{@a template-expression}

## template expression

A TypeScript-like syntax that Angular evaluates within a [data binding](#data-binding).

Read about how to write template expressions in the [template expressions](guide/interpolation#template-expressions) section of the [Interpolation](guide/interpolation) guide.

{@a template-reference-variable}

## template reference variable

A variable defined in a template that references an instance associated with an element, such as a directive instance, component instance, template as in `TemplateRef`, or DOM element.
After declaring a template reference variable on an element in a template,
you can access values from that variable elsewhere within the same template.
The following example defines a template reference variable named `#phone`.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

For more information, see the [Template reference variable](guide/template-reference-variables) guide.

{@a token}

## token

An opaque identifier used for efficient table lookup. In Angular, a [DI token](#di-token) is used to find [providers](#provider) of dependencies in the [dependency injection](#di) system.

{@a transpile}

## transpile

The translation process that transforms one version of JavaScript to another version; for example, down-leveling ES2015 to the older ES5 version.

{@a file-tree}

## tree

In [schematics](#schematic), a virtual file system represented by the `Tree` class.
Schematic [rules](#rule) take a tree object as input, operate on them, and return a new tree object.

{@a typescript}

## TypeScript

A programming language based on JavaScript that is notable for its optional typing system.
TypeScript provides compile-time type checking and strong tooling support (such as
code completion, refactoring, inline documentation, and intelligent search).
Many code editors and IDEs support TypeScript either natively or with plug-ins.

TypeScript is the preferred language for Angular development.
Read more about TypeScript at [typescriptlang.org](http://www.typescriptlang.org/).

## TypeScript configuration file

A file specifies the root files and the compiler options required to compile a TypeScript project. For more information, see [TypeScript configuration](/guide/typescript-configuration).


{@a U}

{@a unidirectional-data-flow}

## unidirectional data flow

A data flow model where the component tree is always checked for changes in one direction (parent to child), which prevents cycles in the change detection graph.

In practice, this means that data in Angular flows downward during change detection.
A parent component can easily change values in its child components because the parent is checked first.
A failure could occur, however, if a child component tries to change a value in its parent during change detection (inverting the expected data flow), because the parent component has already been rendered.
In development mode, Angular throws the `ExpressionChangedAfterItHasBeenCheckedError` error if your app attempts to do this, rather than silently failing to render the new value.

To avoid this error, a [lifecycle hook](guide/lifecycle-hooks) method that seeks to make such a change should trigger a new change detection run. The new run follows the same direction as before, but succeeds in picking up the new value.

{@a universal}

## Universal

A tool for implementing [server-side rendering](#server-side-rendering) of an Angular application.
When integrated with an app, Universal generates and serves static pages on the server in response to requests from browsers.
The initial static page serves as a fast-loading placeholder while the full application is being prepared for normal execution in the browser.

To learn more, see [Angular Universal: server-side rendering](guide/universal).

{@a V}

{@a view}

## view

The smallest grouping of display elements that can be created and destroyed together.
Angular renders a view under the control of one or more [directives](#directive).

A [component](#component) class and its associated [template](#template) define a view.
A view is specifically represented by a `ViewRef` instance associated with a component.
A view that belongs immediately to a component is called a *host view*.
Views are typically collected into [view hierarchies](#view-tree).

Properties of elements in a view can change dynamically, in response to user actions;
the structure (number and order) of elements in a view can't.
You can change the structure of elements by inserting, moving, or removing nested views within their view containers.

View hierarchies can be loaded and unloaded dynamically as the user navigates through the application, typically under the control of a [router](#router).

{@a ve}

## View Engine

The compilation and rendering pipeline used by Angular before version 9. Compare [Ivy](#ivy).


{@a view-tree}

## view hierarchy

A tree of related views that can be acted on as a unit. The root view is a component's *host view*. A host view can be the root of a tree of *embedded views*, collected in a *view container* (`ViewContainerRef`) attached to an anchor element in the hosting component. The view hierarchy is a key part of Angular [change detection](#change-detection).

The view hierarchy doesn't imply a component hierarchy. Views that are embedded in the context of a particular hierarchy can be host views of other components. Those components can be in the same NgModule as the hosting component, or belong to other NgModules.

{@a W}
{@a web-component}

## web component

See [custom element](#custom-element).

{@a workspace}

## workspace

A collection of Angular [projects](#project) (that is, applications and libraries) powered by the [Angular CLI] (#cli) that are typically co-located in a single source-control repository (such as [git](https://git-scm.com/)).

The [CLI](#cli) [`ng new` command](cli/new) creates a file system directory (the "workspace root").
In the workspace root, it also creates the workspace [configuration file](#configuration) (`angular.json`) and, by default, an initial application project with the same name.

Commands that create or operate on apps and libraries (such as `add` and `generate`) must be executed from within a workspace folder.

For more information, see [Workspace Configuration](guide/workspace-config).

{@a cli-config}

{@a config}

## workspace configuration

A file named `angular.json` at the root level of an Angular [workspace](#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools that are provided by or integrated with the [Angular CLI](#cli).

For more information, see [Workspace Configuration](guide/workspace-config).

Additional project-specific configuration files are used by tools, such as `package.json` for the [npm package manager](#npm-package), `tsconfig.json` for [TypeScript transpilation](#transpile), and `tslint.json` for [TSLint](https://palantir.github.io/tslint/).

For more information, see [Workspace and Project File Structure](guide/file-structure).

{@a X}


{@a Y}


{@a Z}
{@a zone}

## zone

An execution context for a set of asynchronous tasks. Useful for debugging, profiling, and testing apps that include asynchronous operations such as event processing, promises, and calls to remote servers.

An Angular app runs in a zone where it can respond to asynchronous events by checking for data changes and updating the information it displays by resolving [data bindings](#data-binding).

A zone client can take action before and after an async operation completes.

Learn more about zones in this
[Brian Ford video](https://www.youtube.com/watch?v=3IqtmUscE_U).
