<!--
# Glossary
-->
# 용어사전

<!--
Angular has its own vocabulary.
Most Angular terms are common English words or computing terms that have a specific meaning within the Angular system.

This glossary lists the most prominent terms and a few less familiar ones with unusual or unexpected definitions.
-->
Angular에서 사용하는 용어들이 있습니다.
이 용어들은 Angular에 사용되는 개념을 설명하기 위해 자주 사용되는 영어 단어나 컴퓨터 용어를 도입한 경우가 많습니다.

이 용어들 중에서 중요한 용어, 단어만 보면 의미를 쉽게 파악할 수 없는 용어에 대해 알아봅시다.

[A][AioGuideGlossaryA]
[B][AioGuideGlossaryB]
[C][AioGuideGlossaryC]
[D][AioGuideGlossaryD]
[E][AioGuideGlossaryE]
[F][AioGuideGlossaryF]
[G][AioGuideGlossaryG]
[H][AioGuideGlossaryH]
[I][AioGuideGlossaryI]
[J][AioGuideGlossaryJ]
[K][AioGuideGlossaryK]
[L][AioGuideGlossaryL]
[M][AioGuideGlossaryM]
[N][AioGuideGlossaryN]
[O][AioGuideGlossaryO]
[P][AioGuideGlossaryP]
[Q][AioGuideGlossaryQ]
[R][AioGuideGlossaryR]
[S][AioGuideGlossaryS]
[T][AioGuideGlossaryT]
[U][AioGuideGlossaryU]
[V][AioGuideGlossaryV]
[W][AioGuideGlossaryW]
[X][AioGuideGlossaryX]
[Y][AioGuideGlossaryY]
[Z][AioGuideGlossaryZ]


<a id="aot"></a>
<a id="ahead-of-time-aot-compilation"></a>

<!--
## ahead-of-time (AOT) compilation
-->
## AOT(Ahead-of-time) 컴파일

<!--
The Angular ahead-of-time \(AOT\) compiler converts Angular HTML and TypeScript code into efficient JavaScript code during the build phase, before the browser downloads and runs that code.
This is the best compilation mode for production environments, with decreased load time and increased performance compared to [just-in-time (JIT) compilation][AioGuideGlossaryJustInTimeJitCompilation].

By compiling your application using the `ngc` command-line tool, you can bootstrap directly to a module factory, so you do not need to include the Angular compiler in your JavaScript bundle.
-->
AOT 컴파일러는 Angular HTML 템플릿과 TypeScript 코드를 빌드 단계에서 JavaScript 코드로 변환하며, 이렇게 변환된 코드는 브라우저가 다운로드해서 실행합니다.
운영환경이라면 로딩 시간과 성능 측면에서 [JIT(Just-in-time)][AioGuideGlossaryJustInTimeJitCompilation] 컴파일러보다 유리합니다.

커맨드 라인 툴 `ngc`를 사용해서 컴파일하면 모듈 팩토리 코드를 그대로 부트스트랩할 수 있기 때문에, 클라이언트로 Angular 컴파일러 코드를 전달할 필요도 없습니다.


<a id="angular-element"></a>

<!--
## Angular element
-->
## Angular 엘리먼트

<!--
An Angular [component][AioGuideGlossaryComponent] packaged as a [custom element][AioGuideGlossaryCustomElement].

Learn more in [Angular Elements Overview][AioGuideElements].
-->
[커스텀 엘리먼트][AioGuideGlossaryCustomElement]로 동작하도록 패키징된 Angular [컴포넌트][AioGuideGlossaryComponent]를 의미합니다.

자세한 내용은 [Angular Elements 개요][AioGuideElements] 문서를 참고하세요.


<!--
## Angular package format (APF)
-->
## Angular 패키지 형식 (Angular Package Format, APF)

<!--
An Angular specific specification for layout of npm packages that is used by all first-party Angular packages, and most third-party Angular libraries.

Learn more in the [Angular Package Format specification][AioGuideAngularPackageFormat].
-->
퍼스트 파티 Angular 패키지들은 Angular가 정산 형식에 따라 npm 패키지를 구성하며, 서드 파티 Angular 라이브러리 중에 이 형식을 차용하는 경우가 있습니다.

자세한 내용은 [Angular 패키지 형식 스펙][AioGuideAngularPackageFormat] 문서를 참고하세요.


<!--
## annotation
-->
## 어노테이션(annotation)

<!--
A structure that provides metadata for a class.
To learn more, see [decorator][AioGuideGlossaryDecoratorDecoration].
-->
클래스에 메타데이터를 적용하는 구조를 의미합니다.
[데코레이터][AioGuideGlossaryDecoratorDecoration] 섹션을 참고하세요.


<!--
## app-shell
-->
## 앱 기본코드(app-shell)

<!--
App shell is a way to render a portion of your application using a route at build time.
This gives users a meaningful first paint of your application that appears quickly because the browser can render static HTML and CSS without the need to initialize JavaScript.
To learn more, see [The App Shell Model][GoogleDevelopersWebFundamentalsArchitectureAppShell].

You can use the Angular CLI to [generate][AioCliGenerateAppShell] an app shell.
This can improve the user experience by quickly launching a static rendered page while the browser downloads the full client version and switches to it automatically after the code loads.
A static rendered page is a skeleton common to all pages.
To learn more, see [Service Worker and PWA][AioGuideServiceWorkerIntro].
-->
앱 기본코드는 애플리케이션이 실행되면서 특정 컴포넌트를 렌더링하는 구조를 제공합니다.
그리고 앱 기본코드는 브라우저가 처리할 수 있는 정적 HTML과 CSS로 제공되기 때문에 사용자에게 "의미있는 첫번째 화면\(meaningful first paint\)"를 보여주는 역할도 합니다.
자세한 내용은 [앱 기본코드 모델][GoogleDevelopersWebFundamentalsArchitectureAppShell] 문서를 참고하세요.

앱 기본코드는 Angular CLI로 [생성][AioCliGenerateAppShell]할 수도 있습니다.
앱 기본코드를 사용하면 브라우저가 Angular 코드를 전부 받기 전에 정적으로 렌더링된 화면을 사용자에게 빠르게 보여줄 수 있으며, 코드를 모두 받고 난 후에는 동적으로 실행되는 애플리케이션 화면으로 전환할 수 있습니다.
[서비스 워커와 PWA][AioGuideServiceWorkerIntro] 문서도 참고해 보세요.


<a id="architect"></a>

<!--
## Architect
-->
## 아키텍트(Architect)

<!--
The tool that the Angular CLI uses to perform complex tasks such as compilation and test running, according to a provided configuration.
Architect is a shell that runs a [builder][AioGuideGlossaryBuilder] with a given [target configuration][AioGuideGlossaryTarget].
The [builder][AioGuideGlossaryBuilder] is defined in an [npm package][AioGuideGlossaryNpmPackage].

In the [workspace configuration file][AioGuideWorkspaceConfigProjectToolConfigurationOptions], an "architect" section provides configuration options for Architect builders.

For example, a built-in builder for linting is defined in the package `@angular-devkit/build_angular:tslint`, which uses the [TSLint][GithubPalantirTslint] tool to perform linting, with a configuration specified in a `tslint.json` file.

Use the [`ng run`][AioCliRun] Angular CLI command to invoke a builder by specifying a [target configuration][AioGuideGlossaryTarget] associated with that builder.
Integrators can add builders to enable tools and workflows to run through the Angular CLI.
For example, a custom builder can replace the third-party tools used by the built-in implementations for Angular CLI commands, such as `ng build` or `ng test`.
-->
컴파일, 테스트 실행과 같이 특정 환경설정으로 동작하는 Angular CLI의 복잡한 과정을 처리하기 위한 툴입니다.
아키텍트는 [특정 환경설정][AioGuideGlossaryTarget]으로 동작하는 [npm 패키지][AioGuideGlossaryNpmPackage]를 [빌더][AioGuideGlossaryBuilder] 형태로 실행하는 셸(shell)입니다.

[워크스페이스 환경설정 파일][AioGuideWorkspaceConfigProjectToolConfigurationOptions] 섹션에서도 확인할 수 있듯이, 이 환경설정 파일의 "architect" 섹션을 확인하면 아키텍트 빌드 옵션이 어떻게 지정되어 있는지 확인할 수 있습니다.

예를 들면, 기본 린트 툴은 `@angular-devkit/build_angular:tslint` 패키지이며, 이 패키지는 [TSLint][GithubPalantirTslint]를 활용하고, 이 패키지가 실행될 때 `tslint.json` 파일에 설정된 규칙을 따릅니다.

[Angular CLI `ng run`][AioCliRun] 명령을 실행하면 [원하는 환경설정][AioGuideGlossaryTarget]으로 빌더를 직접 실행할 수 있습니다.
그래서 프로젝트 관리자가 원하는 대로 툴과 실행동작을 추가할 수 있습니다.
`ng build`나 `ng test` 명령이 Angular CLI가 아니라 서드 파티 툴을 사용하도록 변경할 수도 있습니다.


<a id="attribute-directive"></a>

<!--
## attribute directive
-->
## 어트리뷰트 디렉티브(attribute directives)

<!--
A category of [directive][AioGuideGlossaryDirective] that can listen to and modify the behavior of other HTML elements, attributes, properties, and components.
They are usually represented as HTML attributes, hence the name.

Learn more in [Attribute Directives][AioGuideAttributeDirectives].
-->
[디렉티브][AioGuideGlossaryDirective]의 한 종류이며, HTML 엘리먼트, 어트리뷰트, 프로퍼티, 컴포넌트의 행동을 감지하고 확장하는 역할을 합니다.
이름에서 알 수 있듯이, 이 디렉티브는 HTML 어트리뷰트와 비슷하게 동작합니다.

자세한 내용은 [어트리뷰트 디렉티브][AioGuideAttributeDirectives] 문서를 참고하세요.


<a id="binding"></a>

<!--
## binding
-->
## 바인딩(binding)

<!--
Generally, the practice of setting a variable or property to a data value.
Within Angular, typically refers to [data binding][AioGuideGlossaryDataBinding], which coordinates DOM object properties with data object properties.

Sometimes refers to a [dependency-injection][AioGuideGlossaryDependencyInjectionDi] binding between a [token][AioGuideGlossaryToken] and a dependency [provider][AioGuideGlossaryProvider].
-->
일반적으로는 변수나 프로퍼티 값을 할당하는 것을 의미합니다.
Angular에서는 DOM 객체의 프로퍼티와 데이터 객체의 프로퍼티를 [데이터 바인딩][AioGuideGlossaryDataBinding]하는 것을 의미합니다.

[의존성 주입][AioGuideGlossaryDependencyInjectionDi]에서는 [토큰(token)][AioGuideGlossaryToken]과 [프로바이더(provider)][AioGuideGlossaryProvider]를 연결하는 것을 의미합니다.


<!--
## bootstrap
-->
## 부트스트랩(bootstrap)

<!--
A way to initialize and launch an application or system.

In Angular, the `AppModule` root NgModule of an application has a `bootstrap` property that identifies the top-level [components][AioGuideGlossaryComponent] of the application.
During the bootstrap process, Angular creates and inserts these components into the `index.html` host web page.
You can bootstrap multiple applications in the same `index.html`.
Each application contains its own components.

Learn more in [Bootstrapping][AioGuideBootstrapping].
-->
애플리케이션이나 시스템을 초기화하고 실행하는 것을 의미합니다.

Angular에서는 애플리케이션 최상위 NgModule(`AppModule`)에 지정된 `bootstrap` 프로퍼티에 따라 애플리케이션 최상위 [컴포넌트][AioGuideGlossaryComponent]를 생성합니다.
부트스트랩 과정 중에는 Angular가 최상위 컴포넌트를 생성해서 호스트 웹 페이지 `index.html`에 추가합니다.
그리고 `index.html` 파일 하나에 여러 개의 앱을 부트스트랩할 수도 있습니다.
각 앱들은 각각 컴포넌트를 구성합니다.

자세한 내용은 [부트스트랩][AioGuideBootstrapping] 문서를 참고하세요.


<a id="builder"></a>

<!--
## builder
-->
## 빌더(builder)

<!--
A function that uses the [Architect][AioGuideGlossaryArchitect] API to perform a complex process such as "build" or "test".
The builder code is defined in an [npm package][AioGuideGlossaryNpmPackage].

For example, [BrowserBuilder][GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersBrowser] runs a [webpack][JsWebpackMain] build for a browser target and [KarmaBuilder][GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersKarma] starts the Karma server and runs a webpack build for unit tests.

The [`ng run`][AioCliRun] Angular CLI command invokes a builder with a specific [target configuration][AioGuideGlossaryTarget].
The [workspace configuration][AioGuideWorkspaceConfig] file, `angular.json`, contains default configurations for built-in builders.
-->
[아키텍트][AioGuideGlossaryArchitect] API를 활용해서 애플리케이션을 빌드하거나 테스트하는 함수를 의미합니다.
빌더 코드는 [npm 패키지][AioGuideGlossaryNpmPackage]로 제공됩니다.

예를 들면, [BrowserBuilder][GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersBrowser]는 [webpack][JsWebpackMain]을 사용해서 애플리케이션 코드를 빌드하며, [KarmaBuilder][GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersKarma]는 Karma 서버를 실행하고 유닛 테스트를 실행합니다.

[Angular CLI `ng run`][AioCliRun] 명령을 실행하면 [특정 환경설정][AioGuideGlossaryTarget]으로 빌더를 직접 실행할 수 있습니다.
기본 빌더는 [워크스페이스 환경설정 파일][AioGuideWorkspaceConfig] `angular.json` 파일에 정의되어 있습니다.


<a id ="camelcase"></a>

<a id="case-conventions"></a>
<a id="dash-case"></a>
<a id="case-types"></a>

<!--
## case types
-->
## 대소문자 표기법 종류(case types)

<!--
Angular uses capitalization conventions to distinguish the names of various types, as described in the [naming guidelines section][AioGuideStyleguide0201] of the Style Guide.
Here is a summary of the case types:

|                                                                           | Details                                                                                                                                                                      | example             |
|:---                                                                       |:---                                                                                                                                                                          |:---                 |
| camelCase                                                                 | Symbols, properties, methods, pipe names, non-component directive selectors, constants. <br /> Standard or lower camel case uses lowercase on the first letter of the item.  | `selectedHero`      |
| UpperCamelCase <br /> PascalCase                                          | Class names, including classes that define components, interfaces, NgModules, directives, and pipes. <br /> Upper camel case uses uppercase on the first letter of the item. | `HeroListComponent` |
| dash-case <br /> kebab-case                                               | Descriptive part of file names, component selectors.                                                                                                                         | `app-hero-list`     |
| underscore_case <br /> snake_case                                         | Not typically used in Angular. <br /> Snake case uses words connected with underscores.                                                                                      | `convert_link_mode` |
| UPPER_UNDERSCORE_CASE <br /> UPPER_SNAKE_CASE <br /> SCREAMING_SNAKE_CASE | Traditional for constants. <br /> This case is acceptable, but camelCase is preferred. <br /> Upper snake case uses words in all capital letters connected with underscores. | `FIX_ME`            |
-->
Angular는 타입 이름을 대문자 컨벤션으로 사용합니다.
스타일 가이드 문서의 [명명 규칙 섹션][AioGuideStyleguide0201]을 참고하세요.

|                                                                                               | 설명                                                    | 예제                  |
|:----------------------------------------------------------------------------------------------|:------------------------------------------------------|:--------------------|
| 캐멀 케이스(camelCase)                                                                             | 심볼, 프로퍼티, 메서드, 파이프 이름, 디렉티브 셀렉터, 상수에 사용합니다.           | `selectedHero`      |
| 대문자 캐멀 케이스(UpperCamelCase) <br /> 파스칼 케이스(PascalCase)                                         | 클래스, 컴포넌트 클래스, 인터페이스, NgModule, 디렉티브, 파이프에 사용합니다.     | `HeroListComponent` |
| 대시-케이스(dash-case), 케밥-케이스(kebab-case)                                                         | 파일 이름, 컴포넌트 셀렉터에 사용합니다.                               | `app-hero-list`     |
| 밑줄_케이스(underscore_case) <br /> 스네이크_케이스(snake_case)                                           | Angular에서는 거의 사용되지 않습니다.                              | `convert_link_mode` |
| 대문자_밑줄_케이스(UPPER_UNDERSCORE_CASE) <br /> 대문자_스네이크_케이스(UPPER_SNAKE_CASE, SCREAMING_SNAKE_CASE) | 전통적으로 상수에 사용했습니다. <br /> 이 방식도 괜찮지만, 캐멀 케이스를 더 권장합니다. | `FIX_ME`            |


<a id="change-detection"></a>

<!--
## change detection
-->
## 변화 감지(change detection)

<!--
The mechanism by which the Angular framework synchronizes the state of the UI of an application with the state of the data.
The change detector checks the current state of the data model whenever it runs, and maintains it as the previous state to compare on the next iteration.

As the application logic updates component data, values that are bound to DOM properties in the view can change.
The change detector is responsible for updating the view to reflect the current data model.
Similarly, the user can interact with the UI, causing events that change the state of the data model.
These events can trigger change detection.

Using the default change-detection strategy, the change detector goes through the [view hierarchy][AioGuideGlossaryViewHierarchy] on each VM turn to check every [data-bound property][AioGuideGlossaryDataBinding] in the template.
In the first phase, it compares the current state of the dependent data with the previous state, and collects changes.
In the second phase, it updates the page DOM to reflect any new data values.

If you set the `OnPush` change-detection strategy, the change detector runs only when [explicitly invoked][AioApiCoreChangedetectorref], or when it is triggered by an `Input` reference change or event handler.
This typically improves performance.
To learn more, see [Optimize the change detection in Angular][WebDevFasterAngularChangeDetection].
-->
Angular 프레임워크가 애플리케이션의 UI 상태와 데이터 상태를 동기화하는 구조를 의미합니다.
변화 감지가 실행되면 데이터 모델의 현재 상태를 검사하고 이 상태를 다음 변화 감지 싸이클까지 유지해서 상태를 변경해야 할지 결정합니다.

그래서 애플리케이션이 컴포넌트 데이터를 변경하면 이 내용이 DOM 프로퍼티에 반영되는 것을 확인할 수 있습니다.
변화 감지는 화면에 변경된 내용을 데이터 모델에 반영하는 역할도 합니다.
사용자가 UI에서 어떤 동작을 하면 이벤트가 발생하고 데이터 모델의 상태를 변경시키는 식입니다.
이벤트는 변화 감지를 발생시킨다고 볼 수 있습니다.

기본 변화 감지 정책를 사용하면 템플릿에 [데이터가 프로퍼티에 바인딩][AioGuideGlossaryDataBinding] 될 때마다 [뷰 계층][AioGuideGlossaryViewHierarchy]을 따라 내려가며 변화 감지가 동작합니다.
이 때 첫 번째 단계에서는 현재 상태와 이전 상태를 비교해서 변화가 발생한 상태를 모두 취합하며, 두 번째 단계에서는 새로운 데이터로 페이지 DOM을 갱신합니다.

변화 감지 정책으로 `OnPush`를 사용하면 변화 감지 동작은 개발자가 [명시적으로 실행][AioApiCoreChangedetectorref]하거나 `Input` 값이 변경되었을 때, 이벤트 핸들러가 동작했을 때만 실행됩니다.
일반적으로 이 정책은 성능을 향상시키기 위한 용도로 사용됩니다.
자세한 내용은 [Angular 변화 감지 동작 최적화하기][WebDevFasterAngularChangeDetection] 문서를 참고하세요.


<a id="decorator"></a>
<a id="class-decorator"></a>

<!--
## class decorator
-->
## 클래스 데코레이터(class decorator)

<!--
A [decorator][AioGuideGlossaryDecoratorDecoration] that appears immediately before a class definition, which declares the class to be of the given type, and provides metadata suitable to the type.

The following decorators can declare Angular class types.

*   `@Component()`
*   `@Directive()`
*   `@Pipe()`
*   `@Injectable()`
*   `@NgModule()`
-->
클래스 앞에 지정하는 [데코레이터][AioGuideGlossaryDecoratorDecoration]를 의미합니다.
클래스를 특정 타입으로 지정하거나 해당 타입에 맞는 메타데이터를 지정하는 용도로 사용합니다.

Angular 클래스 타입에 지정할 수 있는 데코레이터는 이런 것들이 있습니다:

*   `@Component()`
*   `@Directive()`
*   `@Pipe()`
*   `@Injectable()`
*   `@NgModule()`


<a id="class-field-decorator"></a>

<!--
## class field decorator
-->
## 클래스 필드 데코레이터(class field decorator)

<!--
A [decorator][AioGuideGlossaryDecoratorDecoration] statement immediately before a field in a class definition that declares the type of that field.
Some examples are `@Input` and `@Output`.
-->
클래스 필드 앞에 지정하는 [데코레이터][AioGuideGlossaryDecoratorDecoration]를 의미합니다.
해당 필드를 `@Input`, `@Output`과 같은 특정 타입으로 지정합니다.


<a id="collection"></a>

<!--
## collection
-->
## 콜렉션(collection)

<!--
In Angular, a set of related [schematics][AioGuideGlossarySchematic] collected in an [npm package][AioGuideGlossaryNpmPackage].
-->
Angular에서는 [npm 패키지][AioGuideGlossaryNpmPackage]로 구성된 [스키매틱][AioGuideGlossarySchematic] 묶음을 의미합니다.


<a id="cli"></a>
<a id="command-line-interface-cli"></a>

<!--
## command-line interface (CLI)
-->
## 커맨드라인 인터페이스(command-line interface, CLI)

<!--
The [Angular CLI][AioCliMain] is a command-line tool for managing the Angular development cycle.
Use it to create the initial filesystem scaffolding for a [workspace][AioGuideGlossaryWorkspace] or [project][AioGuideGlossaryProject], and to run [schematics][AioGuideGlossarySchematic] that add and modify code for initial generic versions of various elements.
The Angular CLI supports all stages of the development cycle, including building, testing, bundling, and deployment.

*   To begin using the Angular CLI for a new project, see [Local Environment Setup][AioGuideSetupLocal].
*   To learn more about the full capabilities of the Angular CLI, see the [Angular CLI command reference][AioCliMain].

See also [Schematics CLI][AioGuideGlossarySchematicsCli].
-->
[Angular CLI][AioCliMain]는 Angular 개발 과정에 사용하는 커맨드라인 툴입니다.
Angular CLI를 활용하면 [워크스페이스][AioGuideGlossaryWorkspace]나 [프로젝트][AioGuideGlossaryProject]와 같은 파일시스템 기본 틀을 생성할 수 있고, [스키매틱][AioGuideGlossarySchematic]을 실행할 수 있으며, Angular 구성요소를 자동으로 생성할 수 있습니다.
Angular CLI는 개발 단계, 빌드, 테스트, 번들링, 배포에 모두 사용됩니다.

*   Angular CLI를 사용해서 프로젝트를 시작하려면 [로컬 개발환경 설정][AioGuideSetupLocal] 문서를 참고하세요.
*   Angular CLI를 사용하는 방법에 대해 알아보려면 [CLI 명령 참고][AioCliMain] 문서를 참고하세요.

[스키매틱 CLI][AioGuideGlossarySchematicsCli] 섹션도 확인해 보세요.


<a id="component"></a>

<!--
## component
-->
## 컴포넌트(component)

<!--
A class with the `@Component()` [decorator][AioGuideGlossaryDecoratorDecoration] that associates it with a companion [template][AioGuideGlossaryTemplate].
Together, the component class and template define a [view][AioGuideGlossaryView].
A component is a special type of [directive][AioGuideGlossaryDirective].
The `@Component()` decorator extends the `@Directive()` decorator with template-oriented features.

An Angular component class is responsible for exposing data and handling most of the display and user-interaction logic of the view through [data binding][AioGuideGlossaryDataBinding].

Read more about component classes, templates, and views in [Introduction to Angular concepts][AioGuideArchitecture].
-->
`@Component()` [데코레이터][AioGuideGlossaryDecoratorDecoration]를 사용해서 [템플릿][AioGuideGlossaryTemplate]과 연결된 클래스를 의미합니다.
[뷰][AioGuideGlossaryView]는 이 컴포넌트 클래스와 템플릿이 조합되어 렌더링됩니다.
컴포넌트는 [디렉티브][AioGuideGlossaryDirective]의 특수한 타입이라고 할 수 있습니다.
`@Component()` 데코레이터는 `@Directive()` 데코레이터를 기반으로 템플릿 관련 기능을 확장한 것입니다.

Angular 컴포넌트 클래스는 화면에 표시될 데이터를 제공하며 화면에서 일어나는 모든 동작과 사용자 입력을 [데이터 바인딩][AioGuideGlossaryDataBinding]으로 처리합니다.

컴포넌트 클래스, 템플릿, 뷰에 대해 알아보려면 [Angular 개요][AioGuideArchitecture] 문서를 참고하세요.


<a id="configuration"></a>

<!--
## configuration
-->
## 환경설정(configuration)

<!--
See [workspace configuration][AioGuideGlossaryWorkspaceConfig]
-->
[워크스페이스 환경설정][AioGuideGlossaryWorkspaceConfig] 섹션을 참고하세요.


<!--
## content projection
-->
## 컨텐츠 프로젝션(content projection)

<!--
A way to insert DOM content from outside a component into the view of the component in a designated spot.

To learn more, see [Responding to changes in content][AioGuideLifecycleHooksRespondingToProjectedContentChanges].
-->
컴포넌트 밖에서 컴포넌트 안쪽으로 DOM 컨텐츠를 전달해서 표시하는 것을 의미합니다.

자세한 내용은 [외부 컨텐츠 변경사항 감지하기][AioGuideLifecycleHooksRespondingToProjectedContentChanges] 문서를 참고하세요.


<a id="custom-element"></a>

<!--
## custom element
-->
## 커스텀 엘리먼트(custom element)

<!--
A web platform feature, currently supported by most browsers and available in other browsers through polyfills.
See [Browser support][AioGuideBrowserSupport].

The custom element feature extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code.
A custom element is recognized by a browser when it is added to the [CustomElementRegistry][MdnDocsWebApiCustomelementregistry].
A custom element is also referenced as a *web component*.

You can use the API to transform an Angular component so that it can be registered with the browser and used in any HTML that you add directly to the DOM within an Angular application.
The custom element tag inserts the view of the component, with change-detection and data-binding functionality, into content that would otherwise be displayed without Angular processing.
See [Angular element][AioGuideGlossaryAngularElement].
See also [dynamic component loading][AioGuideGlossaryDynamicComponentLoading].
-->
웹 플랫폼이 제공하는 기능이며, 최신 브라우저는 모두 지원하고 오래된 브라우저는 폴리필을 활용하면 사용할 수 있습니다.
[브라우저 지원][AioGuideBrowserSupport] 문서를 참고하세요.

커스텀 엘리먼트는 JavaScript 코드로 동작하는 태그를 정의해서 표준 HTML 문법을 확장하는 것을 의미합니다.
커스텀 엘리먼트는 *웹 컴포넌트(web component)* 라고도 하며, 브라우저 [CustomElementRegistry][MdnDocsWebApiCustomelementregistry]에 추가하면 사용할 수 있습니다.

커스텀 엘리먼트는 Angular 컴포넌트로 변환할 수 있기 때문에 Angular 애플리케이션의 DOM 안에서는 커스텀 엘리먼트를 자유롭게 사용할 수 있습니다.
이렇게 사용되는 커스텀 엘리먼트 태그는 컴포넌트의 화면을 구성하거나, Angular의 변화 감지, 데이터 바인딩 기능을 활용할 수 있으며, Angular의 동작과 별개로 컨텐츠를 추가할 수도 있습니다.

자세한 내용은 [Angular 엘리먼트][AioGuideGlossaryAngularElement] 섹션과 [컴포넌트 동적 로드하기][AioGuideGlossaryDynamicComponentLoading] 섹션을 참고하세요.


<a id="data-binding"></a>

<!--
## data binding
-->
## 데이터 바인딩(data binding)

<!--
A process that allows applications to display data values to a user and respond to user actions.
User actions include clicks, touches, keystrokes, and so on.

In data binding, you declare the relationship between an HTML widget and a data source and let the framework handle the details.
Data binding is an alternative to manually pushing application data values into HTML, attaching event listeners, pulling changed values from the screen, and updating application data values.

Read about the following forms of binding of the [Template Syntax][AioGuideTemplateSyntax] in Angular:

*   [Interpolation][AioGuideInterpolation]
*   [Property binding][AioGuidePropertyBinding]
*   [Event binding][AioGuideEventBinding]
*   [Attribute binding][AioGuideAttributeBinding]
*   [Class and style binding][AioGuideAttributeBindingBindingToTheClassAttribute]
*   [Two-way data binding with ngModel][AioGuideBuiltInDirectivesDisplayingAndUpdatingPropertiesWithNgmodel]
-->
사용자가 볼 수 있도록 데이터를 화면에 표시하거나 사용자의 동작(ex. 클릭, 터치, 키입력)에 반응하는 과정을 의미합니다.

데이터 바인딩을 사용하려면 HTML 위젯과 데이터 소스의 관계를 정의해야 하며, 이 관계를 정의하고 나면 프레임워크가 필요한 작업을 알아서 처리합니다.
데이터 바인딩은 애플리케이션 데이터를 HTML로 밀어넣거나 이벤트 리스너를 붙이는 과정, 화면에서 변경된 내용을 끌어와서 애플리케이션 데이터를 갱신하는 과정을 대신하는 것입니다.

Angular [템플릿 문법][AioGuideTemplateSyntax]에서 다루는 데이터 바인딩의 종류는 이런 것들이 있습니다:

*   [문자열 바인딩(Interpolation)][AioGuideInterpolation]
*   [프로퍼티 바인딩(Property binding)][AioGuidePropertyBinding]
*   [이벤트 바인딩(Event binding)][AioGuideEventBinding]
*   [어트리뷰트 바인딩(Attribute binding)][AioGuideAttributeBinding]
*   [클래스 바인딩(Class binding), 스타일 바인딩(Style binding)][AioGuideAttributeBindingBindingToTheClassAttribute]
*   [ngModel을 활용하는 양방향 바인딩(Two-way data binding with ngModel)][AioGuideBuiltInDirectivesDisplayingAndUpdatingPropertiesWithNgmodel]


<a id="declarable"></a>

<!--
## declarable
-->
## 선언할 수 있는 항목(declarable)

<!--
A class type that you can add to the `declarations` list of an [NgModule][AioGuideGlossaryNgmodule].
You can declare [components][AioGuideGlossaryComponent], [directives][AioGuideGlossaryDirective], and [pipes][AioGuideGlossaryPipe].

Do not declare the following:

*   A class that is already declared in another NgModule
*   An array of directives imported from another package.
    For example, do not declare `FORMS_DIRECTIVES` from `@angular/forms`

*   NgModule classes
*   Service classes
*   Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes
-->
[NgModule][AioGuideGlossaryNgmodule] `declarations` 배열에 등록할 수 있는 클래스 타입을 의미합니다.
이 배열에는 [컴포넌트][AioGuideGlossaryComponent], [디렉티브][AioGuideGlossaryDirective], [파이프][AioGuideGlossaryPipe]를 등록할 수 있습니다.

이런 클래스는 등록할 수 없습니다:

*   다른 NgModule에 등록된 클래스
*   다른 패키지에서 불러온 디렉티브 배열
    ex. `@angular/forms`에서 불러온 `FORMS_DIRECTIVES`

*   NgModule 클래스
*   서비스 클래스
*   Angular 구성요소가 아닌 클래스, 문자열, 숫자, 함수, 데이터 모델, 환경설정, 비즈니스 로직, 헬퍼 클래스


<a id="decorator--decoration"></a>

<!--
## decorator | decoration
-->
## 데코레이터(decorator), 데코레이션(decoration)

<!--
A function that modifies a class or property definition.
Decorators are an experimental \(stage 3\) [JavaScript language feature][GithubTC39ProposalDecorators].
A decorator is also referenced as an *annotation*.
TypeScript adds support for decorators.

Angular defines decorators that attach metadata to classes or properties so that it knows what those classes or properties mean and how they should work.

To learn more, see [class decorator][AioGuideGlossaryClassDecorator].
See also [class field decorator][AioGuideGlossaryClassFieldDecorator].
-->
클래스나 클래스 프로퍼티의 동작을 변경하는 함수를 의미합니다.
데코레이터\(어노테이션, annotation\)은 [JavaScript 언어 스펙][GithubTC39ProposalDecorators] 중 실험적인\(스테이지 3\) 기능에 해당됩니다.
TypeScript는 데코레이터를 자체 지원합니다.

Angular는 데코레이터에 메타데이터를 지정하는 방식으로 클래스나 클래스 프로퍼티를 확장합니다.

[클래스 데코레이터][AioGuideGlossaryClassDecorator], [클래스 필드 데코레이터][AioGuideGlossaryClassFieldDecorator]도 확인해 보세요.


<a id="dependency-injection-di"></a>

<!--
## dependency injection (DI)
-->
## 의존성 주입(dependency injection, DI)

<!--
A design pattern and mechanism for creating and delivering some parts of an application \(dependencies\) to other parts of an application that require them.

In Angular, dependencies are typically services, but they also can be values, such as strings or functions.
An [injector][AioGuideGlossaryInjector] for an application \(created automatically during bootstrap\) instantiates dependencies when needed, using a configured [provider][AioGuideGlossaryProvider] of the service or value.
Learn more in [Dependency Injection in Angular][AioGuideDependencyInjection].
-->
애플리케이션의 일부(의존성 객체)를 사용하는 시점에 외부에서 생성해서 전달하는 디자인 패턴이자 동작 방식을 의미합니다.

Angular에서 의존성 객체는 일반적으로 서비스이지만, 특정 값이나 문자열, 함수도 의존성 객체가 될 수 잇습니다.
애플리케이션은 부트스트랩 단계에서 자동으로 [인젝터(injector)][AioGuideGlossaryInjector]를 생성하며, 필요한 시점에 이 인젝터가 [프로바이더][AioGuideGlossaryProvider]에 등록된 대로 의존성 객체를 생성해서 전달합니다.

자세한 내용은 [Angular의 의존성 주입][AioGuideDependencyInjection] 문서를 참고하세요.


<a id="di-token"></a>

<!--
## DI token
-->
## 의존성 객체 토큰(DI token)

<!--
A lookup token associated with a dependency [provider][AioGuideGlossaryProvider], for use with the [dependency injection][AioGuideGlossaryDependencyInjectionDi] system.
-->
[의존성 주입][AioGuideGlossaryDependencyInjectionDi] 시스템에서 의존성 객체의 [프로바이더][AioGuideGlossaryProvider]를 찾을 때 사용하는 토큰입니다.


<a id="directive"></a>

<!--
## directive
-->
## 디렉티브(directive)

<!--
A class that can modify the structure of the DOM or modify attributes in the DOM and component data model.
A directive class definition is immediately preceded by a `@Directive()` [decorator][AioGuideGlossaryDecoratorDecoration] that supplies metadata.

A directive class is usually associated with an HTML element or attribute, and that element or attribute is often referred to as the directive itself.
When Angular finds a directive in an HTML [template][AioGuideGlossaryTemplate], it creates the matching directive class instance and gives the instance control over that portion of the browser DOM.

There are three categories of directive:

*   [Components][AioGuideGlossaryComponent] use `@Component()` to associate a template with a class.
    `@Component()` is an extension of `@Directive()`.

*   [Attribute directives][AioGuideGlossaryAttributeDirective] modify behavior and appearance of page elements.
*   [Structural directives][AioGuideGlossaryStructuralDirective] modify the structure of the DOM.

Angular supplies a number of built-in directives that begin with the `ng` prefix.
You can also create new directives to implement your own functionality.
You associate a *selector* with a custom directive; this extends the [template syntax][AioGuideTemplateSyntax] that you can use in your applications.
A *selector* is an HTML tag, such as `<my-directive>`.

**UpperCamelCase**, such as `NgIf`, refers to a directive class.
You can use **UpperCamelCase** when describing properties and directive behavior.

**lowerCamelCase**, such as `ngIf` refers to the attribute name of a directive.
You can use **lowerCamelCase** when describing how to apply the directive to an element in the HTML template.
-->
DOM 구조, 어트리뷰트 동작, 컴포넌트 데이터 모델을 조작하는 클래스를 의미합니다.
디렉티브 클래스는 메타데이터를 `@Directive()` [데코레이터][AioGuideGlossaryDecoratorDecoration]에 전달하고 클래스 앞에 붙여 선언합니다.

디렉티브 클래스는 일반적으로 HTML 엘리먼트나 어트리뷰트와 관련이 있으며, 디렉티브 자체를 조작하기도 합니다.
Angular는 HTML [템플릿][AioGuideGlossaryTemplate]에서 디렉티브 클래스와 매칭되는 셀렉터를 찾으면 해당 디렉티브 클래스의 인스턴스를 생성하며, 이 인스턴스가 브라우저 DOM을 조작합니다.

디렉티브는 3종류로 구분할 수 있습니다:

*   [컴포넌트(Components)][AioGuideGlossaryComponent]는 `@Directive()`를 확장한 `@Component()` 데코레이터를 사용합니다.
    템플릿과 클래스 코드를 묶은 단위입니다.

*   [어트리뷰트 디렉티브(Attribute directives)][AioGuideGlossaryAttributeDirective]는 엘리먼트의 동작이나 모습을 조작합니다.
*   [구조 디렉티브(Structural directives)][AioGuideGlossaryStructuralDirective]는 DOM 구조를 조작합니다.

Angular가 제공하는 기본 디렉티브는 모두 `ng` 접두사로 시작됩니다.
그리고 필요한 로직을 담아 새로운 디렉티브를 만드는 것도 가능합니다.
디렉티브의 *셀렉터*를 `<my-directive>`와 같이 정의한 후에 [템플릿 문법][AioGuideTemplateSyntax]에 따라 원하는 동작을 하면 됩니다.

`NgIf`와 같은 **대문자 캐멀 케이스(UpperCamelCase)** 는 디렉티브 클래스를 의미합니다.
프로퍼티나 디렉티브의 동작을 설명할 때 **대문자 캐멀 케이스** 를 사용합니다.

`ngIf`와 같은 **소문자 캐멀 케이스(lowerCamelCase)** 는 디렉티브의 어트리뷰트 이름을 의미합니다.
HTML 템플릿 안에 있는 엘리먼트에 디렉티브를 적용할 때 **소문자 캐멀 케이스** 를 사용합니다.


<!--
## domain-specific language (DSL)
-->
## 특정 도메인 언어(domain-specific language, DSL)

<!--
A special-purpose library or API.
To learn more, see [Domain-specific language][WikipediaWikiDomainSpecificLanguage].
Angular extends TypeScript with domain-specific languages for a number of domains relevant to Angular applications, defined in NgModules such as [animations][AioGuideAnimations], [forms][AioGuideForms], and [routing and navigation][AioGuideRouter].
-->
특정 용도로 사용되는 라이브러리나 API를 의미합니다.
[Domain-specific language][WikipediaWikiDomainSpecificLanguage] 문서를 참고하세요.
Angular는 TypeScript를 특정 도메인 언어로 사용해서 Angular앱에 필요한 기능을 구현하고 있습니다.
[애니메이션][AioGuideAnimations], [폼][AioGuideForms], [라우팅과 네비게이션][AioGuideRouter] 등이 그렇습니다.


<a id="dynamic-component-loading"></a>

<!--
## dynamic component loading
-->
## 컴포넌트 동적 로드하기

<!--
A technique for adding a component to the DOM at run time.
Requires that you exclude the component from compilation and then connect it to the change-detection and event-handling framework of Angular when you add it to the DOM.

See also [custom element][AioGuideGlossaryCustomElement], which provides an easier path with the same result.
-->
실행시점에 컴포넌트를 DOM에 추가하는 테크닉을 의미합니다.
이 컴포넌트는 DOM에 추가되는 시점에 컴파일되며 이 시점부터 Angular의 변화 감지 동작과 이벤트 처리 동작이 연결됩니다.

[커스텀 엘리먼트][AioGuideGlossaryCustomElement]를 사용해도 같은 효과를 낼 수 있으며, 커스텀 엘리먼트를 활용하는 방법이 좀 더 쉽습니다.


<a id="eager-loading"></a>

<!--
## eager loading
-->
## 즉시 로딩(eager loading)

<!--
NgModules or components that are loaded on launch are referenced as eager-loaded, to distinguish them from those that are loaded at run time that are referenced as lazy-loaded.
See also [lazy loading][AioGuideGlossaryLazyLoading].
-->
애플리케이션이 로드되면서 함께 로드되는 NgModule이나 컴포넌트를 즉시 로딩(eager-loaded)되었다고 합니다.
실행시점에 로드되는 지연로딩(lazy-loaded)과는 다릅니다.

[지연 로딩][AioGuideGlossaryLazyLoading] 섹션을 참고하세요.

## ECMAScript

<!--
The [official JavaScript language specification][WikipediaWikiEcmascript].

Not all browsers support the latest ECMAScript standard, but you can use a [transpiler][AioGuideGlossaryTranspile] to write code using the latest features, which will then be transpiled to code that runs on versions that are supported by browsers.
A example of a [transpiler][AioGuideGlossaryTranspile] is [TypeScript][AioGuideGlossaryTypescript].
To learn more, see [Browser Support][AioGuideBrowserSupport].
-->
[JavaScript 언어의 공식 스펙][WikipediaWikiEcmascript]을 의미합니다.

모든 브라우저가 ECMAScript 표준을 지원하는 것은 아니기 때문에 최신 기능을 활용하려면 [TypeScript][AioGuideGlossaryTypescript]와 같은 [트랜스파일러][AioGuideGlossaryTranspile]를 사용해서 브라우저 버전에 맞는 코드로 변환해야 합니다.

자세한 내용을 알아보려면 [브라우저 지원][AioGuideBrowserSupport] 문서를 참고하세요.


<a id="element"></a>

<!--
## element
-->
## 엘리먼트(element)

<!--
Angular defines an `ElementRef` class to wrap render-specific native UI elements.
In most cases, this allows you to use Angular templates and data binding to access DOM elements without reference to the native element.

The documentation generally refers to *elements* as distinct from *DOM elements*.
*Elements* are instances of a `ElementRef` class.
*DOM elements* are able to be accessed directly, if necessary.

To learn more, see also [custom element][AioGuideGlossaryCustomElement].
-->
Angular는 표준 UI 엘리먼트를 랩핑하는 `ElementRef` 클래스를 제공합니다.
그래서 보통은 표준 엘리먼트를 직접 참조하지 않아도 Angular 템플릿과 데이터 바인딩을 처리할 수 있습니다.

Angular 가이드 문서에서 언급하는 *엘리먼트* 는 보통 *DOM 엘리먼트* 를 의미합니다.

[커스텀 엘리먼트][Angular는 표준 UI 엘리먼트를 랩핑하는 `ElementRef` 클래스를 제공합니다.
그래서 보통은 표준 엘리먼트를 직접 참조하지 않아도 Angular 템플릿과 데이터 바인딩을 처리할 수 있습니다.

Angular 가이드 문서에서 언급하는 *엘리먼트* 는 보통 *DOM 엘리먼트* 를 의미합니다.

[커스텀 엘리먼트][AioGuideGlossaryCustomElement]와는 어떻게 다른지 확인해 보세요.

<!--
## entry point
-->
## 진입점(entry point)

<!--
A [JavaScript module][AioGuideGlossaryModule] that is intended to be imported by a user of an [npm package][AioGuideNpmPackages].
An entry-point module typically re-exports symbols from other internal modules.
A package can contain multiple entry points.
For example, the `@angular/core` package has two entry-point modules, which can be imported using the module names `@angular/core` and `@angular/core/testing`.
-->
[npm 패키지][AioGuideNpmPackages]로 제공되어 개발자가 로드해서 사용하는 [JavaScript 모듈][AioGuideGlossaryModule]를 의미합니다.
진입점이 되는 모듈은 일반적으로 다른 내부 모듈의 심볼을 불러와서 다시 외부로 공개(re-export) 하는 방식으로 구성됩니다.
예를 들어 `@angular/core` 패키지에는 진입점이 되는 모듈이 2개 있는데, 각각 `@angular/core`와 `@angular/core/testing` 모듈을 로드합니다.


<a id="form-control"></a>

<!--
## form control
-->
## 폼 컨트롤(form control)

<!--
A instance of `FormControl`, which is a fundamental building block for Angular forms.
Together with `FormGroup` and `FormArray`, tracks the value, validation, and status of a form input element.

Read more forms in the [Introduction to forms in Angular][AioGuideFormsOverview].
-->
Angular 폼을 구성하는 개별 구성요소인 `FormControl` 인스턴스를 의미합니다.
폼 컨트롤은 `FormGroup`이나 `FormArray`로 묶어서 관리할 수 있으며, 폼 입력 엘리먼트의 값을 추적하면서 유효성을 검사하고 폼의 상태를 관리합니다.

자세한 내용은 [Angular 폼 소개][AioGuideFormsOverview] 문서를 참고하세요.


<!--
## form model
-->
## 폼 모델(form model)

<!--
The "source of truth" for the value and validation status of a form input element at a given point in time.
When using [reactive forms][AioGuideGlossaryReactiveForms], the form model is created explicitly in the component class.
When using [template-driven forms][AioGuideGlossaryTemplateDrivenForms], the form model is implicitly created by directives.

Learn more about reactive and template-driven forms in the [Introduction to forms in Angular][AioGuideFormsOverview].
-->
폼 입력 엘리먼트의 값과 유효성 상태를 참조할 때 사용하는 "원천 소스(source of truth)"를 의미합니다.
[반응형 폼][AioGuideGlossaryReactiveForms]을 사용하면 컴포넌트 클래스에 명시적으로 폼 모델을 구성하고, [템플릿 기반 폼][AioGuideGlossaryTemplateDrivenForms]을 사용하면 디렉티브로 폼 모델을 구성합니다.

반응형 폼과 템플릿 기반 폼에 대해 알아보려면 [Angular 폼 소개][AioGuideFormsOverview] 문서를 참고하세요.

<!--
## form validation
-->
## 폼 유효성 검사(form validation)

<!--
A check that runs when form values change and reports whether the given values are correct and complete, according to the defined constraints.
Reactive forms apply [validator functions][AioGuideFormValidationAddingCustomValidatorsToReactiveForms].
Template-driven forms use [validator directives][AioGuideFormValidationAddingCustomValidatorsToTemplateDrivenForms].

To learn more, see [Form Validation][AioGuideFormValidation].
-->
폼 값이 변경되었을 때 정해진 규칙에 따라 이 값을 검사해서 값이 유효한지, 입력이 끝났는지 판단하는 과정을 의미합니다.
반응형 폼은 [유효성 검사 함수][AioGuideFormValidationAddingCustomValidatorsToReactiveForms]를 사용하며 템플릿 기반 폼은 [유효성 검사 디렉티브][AioGuideFormValidationAddingCustomValidatorsToTemplateDrivenForms]를 사용합니다.

자세한 내용은 [폼 유효성 검사][AioGuideFormValidation] 문서를 참고하세요.


<a id="immutability"></a>

<!--
## immutability
-->
## 불변성(immutability)

<!--
The inability to alter the state of a value after its creation.
[Reactive forms][AioGuideGlossaryReactiveForms] perform immutable changes in that each change to the data model produces a new data model rather than modifying the existing one.
[Template-driven forms][AioGuideGlossaryTemplateDrivenForms] perform mutable changes with `NgModel` and [two-way data binding][AioGuideGlossaryDataBinding] to modify the existing data model in place.
-->
생성된 후에 상태가 변경될 수 있는 성질을 의미합니다.
[반응형 폼][AioGuideGlossaryReactiveForms]에서는 불변성을 기반으로 하기 때문에 개별 데이터가 변경될 때마다 기존 데이터 모델을 활용하지 않고 새로운 데이터 모델을 생성합니다.
[템플릿 기반 폼][AioGuideGlossaryTemplateDrivenForms]은 `NgModel`과 [양방향 데이터 바인딩][AioGuideGlossaryDataBinding]을 활용해서 기존 데이터 모델 내부 값을 변경합니다.


<a id="injectable"></a>

<!--
## injectable
-->
## 의존성으로 주입할 수 있는 객체(injectable)

<!--
An Angular class or other definition that provides a dependency using the [dependency injection][AioGuideGlossaryDependencyInjectionDi] mechanism.
An injectable [service][AioGuideGlossaryService] class must be marked by the `@Injectable()` [decorator][AioGuideGlossaryDecoratorDecoration].
Other items, such as constant values, can also be injectable.
-->
[의존성 주입][AioGuideGlossaryDependencyInjectionDi] 메커니즘에 의해 의존성 객체로 주입될 수 있는 Angular 클래스나 객체를 의미합니다.
의존성으로 주입되는 [서비스][AioGuideGlossaryService] 클래스는 반드시 `@Injectable()` [데코레이터][AioGuideGlossaryDecoratorDecoration]가 지정되어야 하며, 상수는 데코레이터가 지정되지 않아도 의존성 객체로 주입될 수 있습니다.


<a id="injector"></a>

<!--
## injector
-->
## 인젝터(injector)

<!--
An object in the Angular [dependency-injection][AioGuideGlossaryDependencyInjectionDi] system that can find a named dependency in its cache or create a dependency using a configured [provider][AioGuideGlossaryProvider].
Injectors are created for NgModules automatically as part of the bootstrap process and are inherited through the component hierarchy.

*   An injector provides a singleton instance of a dependency, and can inject this same instance in multiple components.
*   A hierarchy of injectors at the NgModule and component level can provide different instances of a dependency to their own components and child components.
*   You can configure injectors with different providers that can provide different implementations of the same dependency.

Learn more about the injector hierarchy in [Hierarchical Dependency Injectors][AioGuideHierarchicalDependencyInjection].
-->
Angular [의존성 주입][AioGuideGlossaryDependencyInjectionDi] 시스템 안에 있는 객체로, 미리 설정된 [프로바이더][AioGuideGlossaryProvider] 대로 의존성 객체를 생성하고 캐싱하는 역할을 합니다.
인젝터는 애플리케이션 부트스트랩 과정 중에 NgModule이 자동으로 생성하며, 컴포넌트 계층에 따라 개별 인젝터가 생성됩니다.

*   인젝터는 의존성 객체를 싱글턴(singleton) 인스턴스로 관리하기 때문에, 여러 컴포넌트에 같은 인스턴스를 주입할 수 있습니다.
*   NgModule와 컴포넌트 계층에 따라 구성되는 인젝터 계층에 따라 의존성 객체가 다른 인스턴스로 주입될 수 있습니다.
*   어떤 의존성 객체를 다른 객체가 대신하도록 프로바이더를 등록할 수 있습니다.

인젝터 계층에 대해 자세하게 알아보려면 [인젝터 계층][AioGuideHierarchicalDependencyInjection] 문서를 참고하세요.


<a id="input"></a>

<!--
## input
-->
## 입력 프로퍼티 데코레이터(input)

<!--
When defining a [directive][AioGuideGlossaryDirective], the `@Input()` decorator on a directive property makes that property available as a *target* of a [property binding][AioGuidePropertyBinding].
Data values flow into an input property from the data source identified in the [template expression][AioGuideGlossaryTemplateExpression] to the right of the equal sign.

To learn more, see [`@Input()` and `@Output()` decorator functions][AioGuideInputsOutputs].
-->
[디렉티브][AioGuideGlossaryDirective]를 정의할 때 디렉티브 프로퍼티에 `@Input()` 데코레이터를 붙이면 이 프로퍼티를 [프로퍼티 바인딩][AioGuidePropertyBinding] *대상* 으로 만들 수 있습니다.
[템플릿 표현식][AioGuideGlossaryTemplateExpression]에서 등호(`=`) 오른쪽에 있는 데이터 값이 이 입력 프로퍼티를 통해 디렉티브 안쪽으로 전달됩니다.

자세한 내용은 [입출력 프로퍼티][AioGuideInputsOutputs] 문서를 참고하세요.


<a id="interpolation"></a>

<!--
## interpolation
-->
## 문자열 바인딩(interpolation)

<!--
A form of property [data binding][AioGuideGlossaryDataBinding] in which a [template expression][AioGuideGlossaryTemplateExpression] between double-curly braces renders as text.
That text can be concatenated with neighboring text before it is assigned to an element property or displayed between element tags, as in this example.

<code-example format="html" language="html">

&lt;label&gt;My current hero is {{hero.name}}&lt;/label&gt;

</code-example>

Read more in the [Interpolation][AioGuideInterpolation] guide.
-->
[템플릿 표현식][AioGuideGlossaryTemplateExpression]에서 이중 중괄호(`{{`, `}}`)로 [바인딩된 데이터][AioGuideGlossaryDataBinding]를 문자열로 렌더링하는 방식입니다.
이 문자열은 이웃한 문자열과 조합되어 엘리먼트 프로퍼티로 할당되거나 엘리먼트 태그 안에 표시됩니다.

<code-example format="html" language="html">

&lt;label&gt;My current hero is {{hero.name}}&lt;/label&gt;

</code-example>

자세한 내용은 [문자열 바인딩][AioGuideInterpolation] 문서를 참고하세요.

## Ivy

<!--
Ivy is the historical code name for the current [compilation and rendering pipeline][AngularBlogAPlanForVersion80AndIvyB3318dfc19f7] in Angular.
It is now the only supported engine, so everything uses Ivy.
-->
Ivy는 현재 [컴파일러이자 렌더링 파이프라인][AngularBlogAPlanForVersion80AndIvyB3318dfc19f7]에 사용되는 템플릿 엔진의 코드명입니다.
현재 지원하는 템플릿 엔진은 모두 Ivy 입니다.

## JavaScript

<!--
To learn more, see [ECMAScript][AioGuideGlossaryEcmascript].
To learn more, see also [TypeScript][AioGuideGlossaryTypescript].
-->
[ECMAScript][AioGuideGlossaryEcmascript], [TypeScript][AioGuideGlossaryTypescript] 섹션을 참고하세요.


<a id="jit"></a>
<a id="just-in-time-jit-compilation"></a>

<!--
## just-in-time (JIT) compilation
-->
## JIT(just-in-time) 컴파일

<!--
The Angular just-in-time \(JIT\) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code at run time, as part of bootstrapping.

JIT compilation is the default \(as opposed to AOT compilation\) when you run the `ng build` and `ng serve` Angular CLI commands, and is a good choice during development.
JIT mode is strongly discouraged for production use because it results in large application payloads that hinder the bootstrap performance.

Compare to [ahead-of-time (AOT) compilation][AioGuideGlossaryAheadOfTimeAotCompilation].
-->
Angular JIT 컴파일러는 Angular HTML 템플릿과 TypeScript 코드를 브라우저에서 실행할 수 있는 JavaScript 코드로 변환하는 컴파일러이며, 애플리케이션이 부트스트랩되는 시점에 실행됩니다.

JIT 컴파일러는 개발단계에 활용하면 좋기 때문에 Angular 8 버전까지는 Angular CLI로 `ng build`나 `ng serve`명령을 실행하면 JIT 컴파일러가 사용되었습니다.
하지만 애플리케이션을 다운받아야 하는 용량이 커지고 부트스트랩 속도도 느리기 때문에 운영용으로는 사용하지 않는 것이 좋습니다.

[AOT 컴파일][AioGuideGlossaryAheadOfTimeAotCompilation]과 어떻게 다른지 확인해 보세요.


<a id="lazy-loading"></a>

<!--
## lazy loading
-->
## 지연 로딩(lazy loading)

<!--
A process that speeds up application load time by splitting the application into multiple bundles and loading them on demand.
For example, dependencies can be lazy loaded as needed.
The example differs from [eager-loaded][AioGuideGlossaryEagerLoading] modules that are required by the root module and are loaded on launch.

The [router][AioGuideGlossaryRouter] makes use of lazy loading to load child views only when the parent view is activated.
Similarly, you can build custom elements that can be loaded into an Angular application when needed.
-->
애플리케이션 로딩 시간을 줄이기 위해 애플리케이션을 작은 단위로 나누고 필요할 때 로드하는 과정을 의미합니다.
이와 반대로 [즉시 로딩][AioGuideGlossaryEagerLoading]되는 모듈은 애플리케이션이 실행되면서 로드되는 모듈을 의미하며, 애플리케이션 최상위 모듈이 즉시 로딩 모듈에 해당됩니다.

[라우터][AioGuideGlossaryRouter]를 사용하면 부모 화면이 활성화되었을 때만 자식 화면을 지연로딩할 수 있으며, 커스텀 엘리먼트를 사용할 때 로드하는 방식도 활용할 수 있습니다.


<a id="library"></a>

<!--
## library
-->
## library(라이브러리)

<!--
In Angular, a [project][AioGuideGlossaryProject] that provides functionality that can be included in other Angular applications.
A library is not a complete Angular application and cannot run independently.

To add re-usable Angular functionality to non-Angular web applications, use Angular [custom elements][AioGuideGlossaryAngularElement].

*   Library developers can use the [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] to `generate` scaffolding for a new library in an existing [workspace][AioGuideGlossaryWorkspace], and can publish a library as an `npm` package.
*   Application developers can use the [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] to `add` a published library for use with an application in the same [workspace][AioGuideGlossaryWorkspace].

See also [schematic][AioGuideGlossarySchematic].
-->
Angular 앱에 어떤 기능을 제공하는 [프로젝트][AioGuideGlossaryProject]를 의미합니다.
라이브러리는 완전한 Angular 앱이 아니며 단독으로 실행할 수도 없습니다.
Angular를 사용하지 않은 웹앱에서 Angular 기능을 사용하려면 Angular [커스텀 엘리먼트][AioGuideGlossaryAngularElement]를 참고하세요.

* 라이브러리 개발자라면 [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] `generate` 명령을 실행하면 기존에 존재하는 [워크스페이스][AioGuideGlossaryWorkspace] 안에 라이브러리 기본 코드를 생성할 수 있으며, 이 라이브러리는 `npm` 패키지로 배포할 수 있습니다.
* [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] `add` 명령을 실행하면 현재 [워크스페이스][AioGuideGlossaryWorkspace]에 있는 애플리케이션에 라이브러리를 추가할 수 있습니다.

[스키매틱][AioGuideGlossarySchematic] 섹션도 확인해 보세요.


<a id="lifecycle-hook"></a>

<!--
## lifecycle hook
-->
## 라이프싸이클 후킹 함수(lifecycle hook)

<!--
An interface that allows you to tap into the lifecycle of [directives][AioGuideGlossaryDirective] and [components][AioGuideGlossaryComponent] as they are created, updated, and destroyed.

Each interface has a single hook method whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit`.

Angular runs these hook methods in the following order:

|     | hook method             | Details                                                                                           |
|:--- |:---                     |:---                                                                                               |
| 1   | `ngOnChanges`           | When an [input][AioGuideGlossaryInput] or [output][AioGuideGlossaryOutput] binding value changes. |
| 2   | `ngOnInit`              | After the first `ngOnChanges`.                                                                    |
| 3   | `ngDoCheck`             | Developer's custom change detection.                                                              |
| 4   | `ngAfterContentInit`    | After component content initialized.                                                              |
| 5   | `ngAfterContentChecked` | After every check of component content.                                                           |
| 6   | `ngAfterViewInit`       | After the views of a component are initialized.                                                   |
| 7   | `ngAfterViewChecked`    | After every check of the views of a component.                                                    |
| 8   | `ngOnDestroy`           | Just before the directive is destroyed.                                                           |

To learn more, see [Lifecycle Hooks][AioGuideLifecycleHooks].
-->
[디렉티브][AioGuideGlossaryDirective]와 [컴포넌트][AioGuideGlossaryComponent]가 생성되고, 갱신된 후에 종료되는 라이프싸이클에 개발자가 개입할 수 있는 기능을 제공하는 인터페이스입니다.

라이프싸이클 후킹 인터페이스는 `ng` 접두사로 시작하며, 라이프싸이클 후킹 메서드 하나에 개입합니다.
예를 들어 `OnInit` 인터페이스가 제공하는 후킹 메서드 이름은 `ngOnInit` 입니다.

Angular는 이런 순서로 라이프싸이클 후킹 메서드를 실행합니다:

|     | 후킹 메서드                  | 설명                                                          |
|:--- |:------------------------|:------------------------------------------------------------|
| 1   | `ngOnChanges`           | [input][AioGuideGlossaryInput]/[output][AioGuideGlossaryOutput]에 바인딩된 값이 변경되었을 때 |
| 2   | `ngOnInit`              | 첫 번째 `ngOnChanges`가 실행되고 난 후 |
| 3   | `ngDoCheck`             | 개발자가 커스텀 변화 감지 싸이클을 실행했을 때 |
| 4   | `ngAfterContentInit`    | 컴포넌트 컨텐츠가 초기화 된 후 |
| 5   | `ngAfterContentChecked` | 컴포넌트 컨텐츠를 검사하고 난 후 매번 |
| 6   | `ngAfterViewInit`       | 컴포넌트 뷰가 초기화된 후 |
| 7   | `ngAfterViewChecked`    | After every check of the views of a component.              |
| 8   | `ngOnDestroy`           | Just before the directive is destroyed.                     |

To learn more, see [Lifecycle Hooks][AioGuideLifecycleHooks].


<a id="module"></a>

<!--
## module
-->
## 모듈(module)

<!--
In general, a module collects a block of code dedicated to a single purpose.
Angular uses standard JavaScript modules and also defines an Angular module, `NgModule`.

In JavaScript, or ECMAScript, each file is a module and all objects defined in the file belong to that module.
Objects can be exported, making them public, and public objects can be imported for use by other modules.

Angular ships as a collection of JavaScript modules.
A collection of JavaScript modules are also referenced as a library.
Each Angular library name begins with the `@angular` prefix.
Install Angular libraries with the [npm package manager][NpmjsDocsAboutNpm] and import parts of them with JavaScript `import` declarations.

Compare to [NgModule][AioGuideGlossaryNgmodule].
-->
일반적으로는 특정 용도로 활용되는 코드의 집합을 의미합니다.
Angular에서는 JavaScript 모듈과 함께 Angular 전용 모듈 `NgModule`을 사용합니다.

JavaScript\(ECMAScript\)에서는 개별 파일이 하나의 모듈이며 이 파일에 정의된 모든 객체가 모듈에 속한 객체입니다.
이 객체들은 `public`으로 만들어 모듈 외부로 공개될 수 있고, 외부 모듈에서는 이 객체를 불러와서 사용할 수 있습니다.

Angular가 제공하는 라이브러리는 `@angular`라는 이름으로 시작하며 JavaScript 모듈 형태로 제공됩니다.
[npm 패키지 매니저][NpmjsDocsAboutNpm]를 사용하면 필요한 Angular 라이브러리를 더 설치할 수 있으며, 이렇게 설치된 라이브러리는 JavaScript `import` 구문으로 불러옵니다.

[NgModule][AioGuideGlossaryNgmodule]과는 어떻게 다른지도 확인해 보세요.

## ngcc

<!--
Angular compatibility compiler.
If you build your application using [Ivy][AioGuideGlossaryIvy], but it depends on libraries that have not been compiled with Ivy, the Angular CLI uses `ngcc` to automatically update the dependent libraries to use Ivy.
-->
Angular 호환성 컴파일러(compatibility compiler)를 의미합니다.
[Ivy][AioGuideGlossaryIvy]로 개발한 애플리케이션에 Ivy로 컴파일되지 않은 라이브러리를 사용하면 Angular CLI가 `ngcc`를 사용해서 Ivy에 맞게 자동으로 조정합니다.

## NgModule

<!--
A class definition preceded by the `@NgModule()` [decorator][AioGuideGlossaryDecoratorDecoration], which declares and serves as a manifest for a block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.

Like a [JavaScript module][AioGuideGlossaryModule], an NgModule can export functionality for use by other NgModules and import public functionality from other NgModules.
The metadata for an NgModule class collects components, directives, and pipes that the application uses along with the list of imports and exports.
See also [declarable][AioGuideGlossaryDeclarable].

NgModules are typically named after the file in which the exported thing is defined.
For example, the Angular [DatePipe][AioApiCommonDatepipe] class belongs to a feature module named `date_pipe` in the file `date_pipe.ts`.
You import them from an Angular [scoped package][AioGuideGlossaryScopedPackage] such as `@angular/core`.

Every Angular application has a root module.
By convention, the class is named `AppModule` and resides in a file named `app.module.ts`.

To learn more, see [NgModules][AioGuideNgmodules].
-->
`@NgModule()` [데코레이터][AioGuideGlossaryDecoratorDecoration]가 지정된 클래스이며, 이 클래스는 애플리케이션의 도메인, 업무 흐름, 관련된 코드를 묶은 단위입니다.

[JavaScript 모듈][AioGuideGlossaryModule]과 비슷하게 NgModule도 다른 NgModule이 로드해서 사용할 수 있습니다.
NgModule의 메타데이터에는 이 모듈에 포함되고 외부로 공개될 컴포넌트, 디렉티브, 파이프를 등록합니다.
[선언할 수 있는 항목][AioGuideGlossaryDeclarable]을 참고하세요.

NgModule의 이름은 일반적으로 모듈이 정의된 파일의 이름과 같도록 지정합니다.
예를 들어 Angular [DatePipe][AioApiCommonDatepipe] 클래스는 `date_pipe` 기능 모듈에 속해 있으며, 이 모듈은 `date_pipe.ts` 파일에 정의되어 있습니다.
이 모듈은 `@angular/core`와 같은 Angular [패키지 그룹][AioGuideGlossaryScopedPackage]으로 제공됩니다.

Angular 애플리케이션에는 최상위 모듈이 반드시 존재합니다.
이 모듈은 일반적으로 `AppModule`이라고 하며 `app.module.ts` 파일에 정의합니다.

자세한 내용은 [NgModule][AioGuideNgmodules] 문서를 참고하세요.


<a id="npm-package"></a>

<!--
## npm package
-->
## npm 패키지

<!--
The [npm package manager][NpmjsDocsAboutNpm] is used to distribute and load Angular modules and libraries.

Learn more about how Angular uses [Npm Packages][AioGuideNpmPackages].
-->
Angular 모듈과 라이브러리는 [npm 패키지 매니저][NpmjsDocsAboutNpm]를 활용해서 배포됩니다.

Angular가 활용하는 npm 패키지를 확인하려면 [Npm 패키지][AioGuideNpmPackages] 문서를 참고하세요.

## ngc

<!--
`ngc` is a Typescript-to-Javascript transpiler that processes Angular decorators, metadata, and templates, and emits JavaScript code.
The most recent implementation is internally referred to as `ngtsc` because it is a minimalistic wrapper around the TypeScript compiler `tsc` that adds a transform for processing Angular code.
-->
`ngc`는 TypeScript로 작성된 Angular 데코레이터, 메타데이터, 템플릿 코드를 JavaScript 코드로 변환하는 트랜스파일러입니다.
이런 트랜스파일러 중에서 가장 많이 사용하는 것은 `ngtsc`인데, 이 트랜스파일러는 TypeScript 컴파일러 `tsc`에 Angular 코드를 변환하는 기능을 추가한 것입니다.


<a id="observable"></a>

<!--
## observable
-->
## 옵저버블(observable)

<!--
A producer of multiple values, which it pushes to [subscribers][AioGuideGlossarySubscriber].
Used for asynchronous event handling throughout Angular.
You execute an observable by subscribing to it with its `subscribe()` method, passing callbacks for notifications of new values, errors, or completion.

Observables can deliver in one the following ways a single value or multiple values of any type to subscribers.

*   Synchronously as a function delivers a value to the requester
*   Scheduled

A subscriber receives notification of new values as they are produced and notification of either normal completion or error completion.

Angular uses a third-party library named [Reactive Extensions (RxJS)][RxjsMain].
To learn more, see [Observables][AioGuideObservables].
-->
데이터를 [구독자(subscriber)][AioGuideGlossarySubscriber]에게 보내는 객체입니다.
이 객체는 Angular 전반에 걸쳐 비동기 이벤트를 처리할 때 사용됩니다.
옵저버블가 제공하는 `subscribe()` 메서드를 실행하면 이 옵저버블을 구독할 수 있으며, 이 메서드에 지정하는 콜백 함수로 데이터, 에러, 종료 신호를 받습니다.

옵저버블은 데이터를 동기 방식으로 하나만 보낼 수도 있지만 스케쥴에 따라 여러개 보낼 수도 있습니다.

그러면 구독자는 전달되는 값을 받아 처리한 후에 상태에 따라 스트림을 종료하거나 에러를 처리하면 됩니다.

Angular는 서드 파티 라이브러리 [Reactive Extensions(RxJS)][RxjsMain]를 사용합니다.
자세한 내용은 [옵저버블][AioGuideObservables] 문서를 참고하세요.


<a id="observer"></a>

<!--
## observer
-->
## 옵저버(observer)

<!--
An object passed to the `subscribe()` method for an [observable][AioGuideGlossaryObservable].
The object defines the callbacks for the [subscriber][AioGuideGlossarySubscriber].
-->
[옵저버블][AioGuideGlossaryObservable] `subscribe()` 메서드에 전달하는 객체입니다.
이 개체에는 [구독자][AioGuideGlossarySubscriber]가 반응할 콜백 함수를 정의합니다.


<a id="output"></a>

<!--
## output
-->
## 출력 프로퍼티 데코레이터(output)

<!--
When defining a [directive][AioGuideGlossaryDirective], the `@Output{}` decorator on a directive property makes that property available as a *target* of [event binding][AioGuideEventBinding].
Events stream *out* of this property to the receiver identified in the [template expression][AioGuideGlossaryTemplateExpression] to the right of the equal sign.

To learn more, see [`@Input()` and `@Output()` decorator functions][AioGuideInputsOutputs].
-->
[디렉티브(directive)][AioGuideGlossaryDirective]를 정의할 때 디렉티브 프로퍼티에 `@Output()` 데코레이터를 지정하면 이 프로퍼티를 [이벤트 바인딩][AioGuideEventBinding] *대상* 으로 지정할 수 있습니다.
그래서 이 프로퍼티를 거쳐 디렉티브 *밖으로* 전달되는 데이터는 [템플릿 표현식][AioGuideGlossaryTemplateExpression]으로 받아서 처리할 수 있습니다.

자세한 내용을 확인하려면 [입출력 프로퍼티][AioGuideInputsOutputs] 문서를 참고하세요.


<a id="pipe"></a>

<!--
## pipe
-->
## 파이프(pipe)

<!--
A class which is preceded by the `@Pipe{}` decorator and which defines a function that transforms input values to output values for display in a [view][AioGuideGlossaryView].
Angular defines various pipes, and you can define new pipes.

To learn more, see [Pipes][AioGuidePipes].
-->
`@Pipe()` 데코레이터가 지정된 클래스이며, 이 클래스는 입력으로 받은 값을 [화면][AioGuideGlossaryView]에 표시하기 적합한 형식으로 변환합니다.
용도에 따라 Angular가 제공하는 기본 파이프를 사용하거나 커스텀 파이프를 정의해서 사용하면 됩니다.

자세한 내용을 확인하려면 [파이프][AioGuidePipes] 문서를 참고하세요.

<!--
## platform
-->
## 플랫폼(platform)

<!--
In Angular terminology, a platform is the context in which an Angular application runs.
The most common platform for Angular applications is a web browser, but it can also be an operating system for a mobile device, or a web server.

Support for the various Angular run-time platforms is provided by the `@angular/platform-*` packages.
These packages allow applications that make use of `@angular/core` and `@angular/common` to execute in different environments by providing implementation for gathering user input and rendering UIs for the given platform.
Isolating platform-specific functionality allows the developer to make platform-independent use of the rest of the framework.

*   When running in a web browser, [`BrowserModule`][AioApiPlatformBrowserBrowsermodule] is imported from the `platform-browser` package, and supports services that simplify security and event processing, and allows applications to access browser-specific features, such as interpreting keyboard input and controlling the title of the document being displayed.
    All applications running in the browser use the same platform service.

*   When [server-side rendering (SSR)][AioGuideGlossaryServerSideRendering] is used, the [`platform-server`][AioApiPlatformServer] package provides web server implementations of the `DOM`, `XMLHttpRequest`, and other low-level features that do not rely on a browser.
-->
Angular에서는 Angular 애플리케이션이 실행되는 컨텍스트를 의미합니다.
가장 많이 사용되는 플랫폼은 웹 브라우저지만, 모바일 디바이스나 웹 서버가 플랫폼이 될 수도 있습니다.

Angular는 `@angular/platform-*` 패키지들로 다양한 플랫폼을 지원합니다.
이 패키지들은 `@angular/core`, `@angular/common`을 사용해서 각기 다른 환경에서 발생하는 사용자의 입력을 처리하거나 해당 플랫폼에 맞게 UI를 렌더링하면서 애플리케이션을 실행합니다.
특정 플랫폼에만 있는 기능을 활용할 수도 있습니다.

*   웹 브라우저를 사용한다면 `platform-browser` 패키지가 제공하는 [`BrowserModule`][AioApiPlatformBrowserBrowsermodule]을 로드해서 보안 정책, 이벤트를 처리하며, 키입력을 처리하거나 문서에 제목을 표시하는 등 브라우저용 기능을 제공하기도 합니다.
    브라우저에서 실행되는 애플리케이션은 모두 같은 플랫폼 서비스를 사용합니다.

*   [서버 사이드 렌더링(Server-side rendering, SSR)][AioGuideGlossaryServerSideRendering]을 사용한다면 [`platform-server`][AioApiPlatformServer] 패키지를 로드해서 웹 서버용 `DOM`, `XMLHttpReqeuest`를 처리합니다.
    브라우저에는 없는 기능을 사용하기도 합니다.

<!--
## polyfill
-->
## 폴리필(polyfill)

<!--
An [npm package][AioGuideNpmPackages] that plugs gaps in the JavaScript implementation of a browser.
See [Browser Support][AioGuideBrowserSupport] for polyfills that support particular functionality for particular platforms.
-->
브라우저 JavaScript 호환성을 맞출 때 사용하는 [npm 패키지][AioGuideNpmPackages] 입니다.
어떤 플랫폼에서 어떤 폴리필을 사용해야 하는지 알아보려면 [브라우저 지원][AioGuideBrowserSupport] 문서를 참고하세요.


<a id="project"></a>

<!--
## project
-->
## 프로젝트(project)

<!--
In the Angular CLI, a standalone application or [library][AioGuideGlossaryLibrary] that can be created or modified by a Angular CLI command.

A project, as generated by the [`ng new`][AioCliNew], contains the set of source files, resources, and configuration files that you need to develop and test the application using the Angular CLI.
Projects can also be created with the `ng generate application` and `ng generate library` commands.

To learn more, see [Project File Structure][AioGuideFileStructure].

The [`angular.json`][AioGuideWorkspaceConfig] file configures all projects in a [workspace][AioGuideGlossaryWorkspace].
-->
Angular에서는 Angular CLI 명령으로 생성/조작하는 단독 실행 애플리케이션이나 [라이브러리][AioGuideGlossaryLibrary]를 의미합니다.

Angular CLI [`ng new`][AioCliNew] 명령을 실행해서 프로젝트를 생성하면 이 애플리케이션을 개발하고 테스트할 때 필요한 기본 소스 파일, 기본 리소스, 환경설정 파일이 자동으로 구성됩니다.
프로젝트는 `ng generate application` 명령이나 `ng generate library` 명령을 실행해도 생성할 수 있습니다.

자세한 내용을 알아보려면 [프로젝트 파일 구조][AioGuideFileStructure] 문서를 참고하세요.

[워크스페이스][AioGuideGlossaryWorkspace]에 있는 모든 프로젝트는 [`angular.json`][AioGuideWorkspaceConfig] 환경설정 파일의 영향을 받습니다.


<a id="provider"></a>

<!--
## provider
-->
## 프로바이더(provider)

<!--
An object that implements one of the [`Provider`][AioApiCoreProvider] interfaces.
A provider object defines how to obtain an injectable dependency associated with a [DI token][AioGuideGlossaryDiToken].
An [injector][AioGuideGlossaryInjector] uses the provider to create a new instance of a dependency for a class that requires it.

Angular registers its own providers with every injector, for services that Angular defines.
You can register your own providers for services that your application needs.

See also [service][AioGuideGlossaryService].
See also [dependency injection][AioGuideGlossaryDependencyInjectionDi].

Learn more in [Dependency Injection][AioGuideDependencyInjection].
-->
[`Provider`][AioApiCoreProvider] 인터페이스로 구현한 객체입니다.
프로바이더 객체는 [DI 토큰][AioGuideGlossaryDiToken]에 해당하는 의존성 객체를 어떻게 얻어와야 할지 정의합니다.
[인젝터(injector)][AioGuideGlossaryInjector]는 프로바이더에 정의된 대로 새로운 인스턴스를 만들고, 주입받기를 요청한 클래스에 이 인스턴스를 주입합니다.

Angular의 기본 서비스는 모든 인젝터에 등록되어 있습니다.
그래서 개발자는 애플리케이션에 추가로 필요한 프로바이더만 등록하면 됩니다.

자세한 내용은 [서비스][AioGuideGlossaryService], [의존성 주입][AioGuideGlossaryDependencyInjectionDi] 섹션이나 [의존성 주입][AioGuideDependencyInjection] 문서를 참고하세요.


<a id="reactive-forms"></a>

<!--
## reactive forms
-->
## 반응형 폼(reactive forms)

<!--
A framework for building Angular forms through code in a component.
The alternative is a [template-driven form][AioGuideGlossaryTemplateDrivenForms].

When using reactive forms:

*   The "source of truth", the form model, is defined in the component class.
*   Validation is set up through validation functions rather than validation directives.
*   Each control is explicitly created in the component class by creating a `FormControl` instance manually or with `FormBuilder`.
*   The template input elements do *not* use `ngModel`.
*   The associated Angular directives are prefixed with `form`, such as `formControl`, `formGroup`, and `formControlName`.

The alternative is a template-driven form.
For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms][AioGuideFormsOverview].
-->
컴포넌트에서 Angular 폼을 구성하는 방식을 의미합니다.
다른 방식은 [템플릿 기반 폼][AioGuideGlossaryTemplateDrivenForms]이 있습니다.

반응형 폼을 사용하면:

*   "원천 소스(source of truth)"는 폼 모델이며 컴포넌트 클래스에 정의합니다.
*   유효성 검사는 디렉티브가 아니라 함수로 실행합니다.
*   폼 컨트롤은 컴포넌트 클래스에서 명시적으로 생성합니다. `FormControl` 인스턴스를 직접 생성하거나 `FormBuilder`를 사용할 수 있습니다.
*   템플릿 입력 엘리먼트에는 `ngModel`을 사용하지 *않습니다*.
*   관련 디렉티브는 `form` 접두사로 시작합니다: `formControl`, `formGroup`, `formControlName`

이 방식 대신 템플릿 기반 폼을 사용할 수도 있습니다.
둘 중 어떤 방식을 사용해야 하는지 알아보려면 [Angular 폼 소개][AioGuideFormsOverview] 문서를 참고하세요.

<!--
## resolver
-->
## 리졸버(resolver)

<!--
A class that implements the [Resolve][AioApiRouterResolve] interface that you use to produce or retrieve data that is needed before navigation to a requested route can be completed.
You may use a function with the same signature as the [resolve()][AioApiRouterResolve] method in place of the [Resolve][AioApiRouterResolve] interface.
Resolvers run after all [route guards][AioGuideGlossaryRouteGuard] for a route tree have been executed and have succeeded.

See an example of using a [resolve guard][AioGuideRouterTutorialTohResolvePreFetchingComponentData] to retrieve dynamic data.
-->
[Resolve][AioApiRouterResolve] 인터페이스로 구현하거나 [resolve() 메서드][AioApiRouterResolve]가 있는 클래스입니다.
이 클래스는 화면을 전환하기 전에 필요한 데이터를 미리 받아올 때 사용하며, 데이터가 모두 준비되면 라우팅 동작을 계속 진행합니다.

리졸버는 라우팅 트리에 존재하는 [라우팅 가드(route guards)][AioGuideGlossaryRouteGuard]가 모두 성공적으로 실행한 후에 실행됩니다.

동적으로 데이터를 받아오는 예제를 확인하려면 [리졸브 가드][AioGuideRouterTutorialTohResolvePreFetchingComponentData] 문서를 참고하세요.


<a id="route-guard"></a>

<!--
## route guard
-->
## 라우팅 가드(route guard)

<!--
A method that controls navigation to a requested route in a routing application.
Guards determine whether a route can be activated or deactivated, and whether a lazy-loaded module can be loaded.

Learn more in the [Routing and Navigation][AioGuideRouterPreventingUnauthorizedAccess] guide.
-->
화면 전환 요청을 조작하는 메서드를 의미합니다.
라우팅 가드를 사용하면 라우팅 규칙을 활성화할지 여부, 비활성화할지 여부, 지연로딩 대상 모듈을 로드할지 여부를 결정할 수 있습니다.

자세한 내용은 [라우팅, 네비게이션][AioGuideRouterPreventingUnauthorizedAccess] 문서를 참고하세요.


<a id="router"></a>

<!--
## router
-->
## 라우터(router)

<!--
A tool that configures and implements navigation among states and [views][AioGuideGlossaryView] within an Angular application.

The `Router` module is an [NgModule][AioGuideGlossaryNgmodule] that provides the necessary service providers and directives for navigating through application views.
A [routing component][AioGuideGlossaryRoutingComponent] is one that imports the `Router` module and whose template contains a `RouterOutlet` element where it can display views produced by the router.

The router defines navigation among views on a single page, as opposed to navigation among pages.
It interprets URL-like links to determine which views to create or destroy, and which components to load or unload.
It allows you to take advantage of [lazy loading][AioGuideGlossaryLazyLoading] in your Angular applications.

To learn more, see [Routing and Navigation][AioGuideRouter].
-->
애플리케이션 상태에 따라 화면을 전환하는 규칙을 정의하고, 이 규칙에 따라 화면을 전환하는 툴입니다.

`Router` 모듈은 [NgModule][AioGuideGlossaryNgmodule] 형태로 제공되며, 이 모듈에는 애플리케이션 화면을 전환할 때 필요한 서비스 프로바이더와 디렉티브들이 정의되어 있습니다.
라우터는 현재 라우팅 규칙에 해당하는 [라우팅 대상 컴포넌트][AioGuideGlossaryRoutingComponent]를 불러와서 `RouterOutlet` 엘리먼트에 표시합니다.

라우터는 페이지 자체를 전환하지 않고 한 화면 안에서 화면 일부를 갱신합니다.
어떤 화면이 표시될지는 URL과 비슷한 링크로 정의하며, 이 링크에 따라 컴포넌트가 로드되거나 종료됩니다.
라우터로 [지연 로딩][AioGuideGlossaryLazyLoading] 기능을 활용할 수도 있습니다.

자세한 내용은 [라우팅, 네비게이션][AioGuideRouter] 문서를 참고하세요.

<!--
## router outlet
-->
## 라우팅 영역(router outlet)

<!--
A [directive][AioGuideGlossaryDirective] that acts as a placeholder in the template of a routing component.
Angular dynamically renders the template based on the current router state.
-->
컴포넌트가 화면에 표시될 위치를 지정하는 [디렉티브][AioGuideGlossaryDirective]입니다.
Angular는 라우터의 현재 상테에 따라 동적으로 템플릿을 렌더링합니다.


<a id="routing-component"></a>

<!--
## routing component
-->
## 라우팅 대상 컴포넌트(routing component)

<!--
An Angular [component][AioGuideGlossaryComponent] with a `RouterOutlet` directive in its template that displays views based on router navigations.

To learn more, see [Routing and Navigation][AioGuideRouter].
-->
라우터가 화면을 전환할 때 `RouterOutlet` 디렉티브에 표시되는 [컴포넌트][AioGuideGlossaryComponent]를 의미합니다.

자세한 내용은 [라우팅, 네비게이션][AioGuideRouter] 문서를 참고하세요.


<a id="rule"></a>

<!--
## rule
-->
## 룰(rule)

<!--
In [schematics][AioGuideGlossarySchematic], a function that operates on a [file tree][AioGuideGlossaryTree] to create, delete, or modify files in a specific manner.
-->
[스키매틱(schematics)][AioGuideGlossarySchematic]에서 [파일 트리][AioGuideGlossaryTree]를 조작하면서 파일을 생성/삭제/수정하는 함수를 의미합니다.


<a id="schematic"></a>

<!--
## schematic
-->
## 스키매틱(schematic)

<!--
A scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code.
A schematic defines [rules][AioGuideGlossaryRule] that operate on a virtual file system referenced as a [tree][AioGuideGlossaryTree].

The [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] uses schematics to generate and modify [Angular projects][AioGuideGlossaryProject] and parts of projects.

*   Angular provides a set of schematics for use with the Angular CLI.
    See the [Angular CLI command reference][AioCliMain].
    The [`ng add`][AioCliAdd] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command runs schematics as part of adding a library to your project.
    The [`ng generate`][AioCliGenerate] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command runs schematics to create applications, libraries, and Angular code constructs.

*   [Library][AioGuideGlossaryLibrary] developers can create schematics that enable the Angular CLI to add and update their published libraries, and to generate artifacts the library defines.
    Add these schematics to the npm package that you use to publish and share your library.

To learn more, see [Schematics][AioGuideSchematics].
To learn more, see also [Integrating Libraries with the CLI][AioGuideCreatingLibrariesIntegratingWithTheCliUsingCodeGenerationSchematics].
-->
프로젝트 파일과 코드를 생성/수정/리팩토링/이동하는 방법을 정의한 라이브러리입니다.
스키매틱은 [룰][AioGuideGlossaryRule]을 정의해서 [트리][AioGuideGlossaryTree]라고 하는 가상 파일 시스템을 조작합니다.

[Angular CLI][AioGuideGlossaryCommandLineInterfaceCli]는 [Angular 프로젝트][AioGuideGlossaryProject]나 프로젝트 구성요소를 생성/수정할 때 이 스키매틱을 사용합니다.

*   Angular CLI가 사용하는 스키매틱은 Angular가 기본으로 제공합니다.
    [Angular CLI 명령 참고][AioCliMain] 문서를 확인해 보세요.
    [`ng add`][AioCliAdd] 명령을 실행하면 프로젝트에 라이브러리를 추가하는 스키매틱을 실행합니다.
    그리고 [`ng generate`][AioCliGenerate] 명령을 실행하면 애플리케이션이나 라이브러리, Angular 구성요소를 생성하는 스키매틱을 실행합니다.

*   [라이브러리][AioGuideGlossaryLibrary] 개발자라면 Angular CLI를 활용해서 라이브러리를 사용할 수 있도록 스키매틱을 추가로 정의할 수 있습니다.
    npm 패키지에 스키매틱을 추가하고 라이브러리를 배포하면 됩니다.

자세한 내용을 확인하려면 [스키매틱][AioGuideSchematics] 문서와 [Angular CLI에 라이브러리 통합하기][AioGuideCreatingLibrariesIntegratingWithTheCliUsingCodeGenerationSchematics] 문서를 참고하세요.


<a id="schematics-cli"></a>

<!--
## Schematics CLI
-->
## 스키매틱 CLI

<!--
Schematics come with their own command-line tool.
Use Node 6.9 or above to install the Schematics CLI globally.

<code-example format="shell" language="shell">

npm install -g @angular-devkit/schematics-cli

</code-example>

This installs the `schematics` executable, which you can use to create a new schematics [collection][AioGuideGlossaryCollection] with an initial named schematic.
The collection directory is a workspace for schematics.
You can also use the `schematics` command to add a new schematic to an existing collection, or extend an existing schematic.
-->
스키매틱은 커맨드라인 툴로 제공됩니다.
Node 6.9 이상 버전에서 스키매틱 CLI를 전역으로 설치하려면 이 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

npm install -g @angular-devkit/schematics-cli

</code-example>

이 명령을 실행하면 `schematics` 실행파일이 설치되는데, 이 파일을 사용해서 새로운 스키매틱 [콜렉션][AioGuideGlossaryCollection]을 만들 수 있습니다.
콜렉션 폴더는 스키매틱용 워크스페이스입니다.
`schematics` 명령은 기존에 존재하는 콜렉션에 새 스키매틱을 추가하거나, 기존 스키매틱을 확장할 때도 사용합니다.


<a id="scoped-package"></a>

<!--
## scoped package
-->
## 패키지 그룹(scoped package)

<!--
A way to group related [npm packages][AioGuideNpmPackages].
NgModules are delivered within scoped packages whose names begin with the Angular *scope name* `@angular`.
For example, `@angular/core`, `@angular/common`, `@angular/forms`, and `@angular/router`.

Import a scoped package in the same way that you import a normal package.

<code-example path="architecture/src/app/app.component.ts" header="architecture/src/app/app.component.ts (import)" region="import"></code-example>
-->
관련된 [npm 패키지][AioGuideNpmPackages]를 묶은 단위입니다.
패키지 그룹 안에 있는 NgModule은 Angular의 *그룹 이름* `@angular`로 시작합니다.
`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`들이 그렇습니다.

패키지 그룹을 사용하는 방법은 일반 npm 패키지를 사용하는 방법과 같습니다.

<code-example path="architecture/src/app/app.component.ts" header="architecture/src/app/app.component.ts (로드하기)" region="import"></code-example>


<a id="server-side-rendering"></a>

<!--
## server-side rendering
-->
## 서버 사이드 렌더링(server-side rendering)

<!--
A technique that generates static application pages on the server, and can generate and serve those pages in response to requests from browsers.
It can also pre-generate pages as HTML files that you serve later.

This technique can improve performance on mobile and low-powered devices and improve the user experience by showing a static first page quickly while the client-side application is loading.
The static version can also make your application more visible to web crawlers.

You can easily prepare an application for server-side rendering by using the [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] to run the [Angular Universal][AioGuideGlossaryUniversal] tool, using the `@nguniversal/express-engine` [schematic][AioGuideGlossarySchematic].
-->
애플리케이션 화면을 서버에 정적으로 빌드해두고, 브라우저 요청이 있을 때 이 화면을 그대로 제공하는 방식입니다.
미리 생성해둔 화면은 HTML 파일 형태로 제공됩니다.

이 방식을 활용하면 모바일 디바이스나 저사양 디바이스의 성능을 향상시킬 수 있으며, 첫 번째 화면이 정적으로 빠르게 표시되기 때문에 애플리케이션이 시작되는 시간도 짧아집니다.
애플리케이션 화면이 정적으로 제공되면 웹 크롤러에 대응할 수도 있습니다.

[Angular CLI][AioGuideGlossaryCommandLineInterfaceCli]로 [Angular Universal][AioGuideGlossaryUniversal] 툴을 실행하면 Angular 애플리케이션에 서버 사이드 렌더링을 적용할 수 있습니다.
이 때 `@nguniversal/express-engine` [스키매틱][AioGuideGlossarySchematic]을 사용합니다.


<a id="service"></a>

<!--
## service
-->
## 서비스(service)

<!--
In Angular, a class with the [@Injectable()][AioGuideGlossaryInjectable] decorator that encapsulates non-UI logic and code that can be reused across an application.
Angular distinguishes components from services to increase modularity and reusability.

The `@Injectable()` metadata allows the service class to be used with the [dependency injection][AioGuideGlossaryDependencyInjectionDi] mechanism.
The injectable class is instantiated by a [provider][AioGuideGlossaryProvider].
[Injectors][AioGuideGlossaryInjector] maintain lists of providers and use them to provide service instances when they are required by components or other services.

For To learn more, see [Introduction to Services and Dependency Injection][AioGuideArchitectureServices].
-->
Angular에서는 [`@Injectable()`][AioGuideGlossaryInjectable] 데코레이터가 지정된 클래스를 의미하는데, 이 클래스는 UI와 관계없는 로직이나 코드를 캡슐화해서 애플리케이션에 재사용됩니다.
애플리케이션 코드를 모듈화하거나 재사용하기에 유리하기 때문에 Angular 팀은 컴포넌트와 서비스를 확실하게 구분하기를 권장하고 있습니다.

`@Injectable()` 메타데이터를 사용하면 서비스 클래스를 [의존성 주입][AioGuideGlossaryDependencyInjectionDi] 메커니즘의 대상으로 만들 수 있습니다.
서비스 클래스를 생성하는 방법은 [프로바이더][AioGuideGlossaryProvider]에 정의하는데, 이 프로바이더는 [인젝터(injectors)][AioGuideGlossaryInjector]가 관리하며, 인젝터는 의존성 주입 요청을 받았을 때 프로바이더에 정해진 대로 서비스의 인스턴스를 생성해서 의존성으로 주입합니다.

자세한 내용은 [서비스와 의존성 주입][AioGuideArchitectureServices] 문서를 참고하세요.


<a id="structural-directive"></a>

<!--
## structural directive
-->
## 구조 디렉티브(structural directive)

<!--
A category of [directive][AioGuideGlossaryDirective] that is responsible for shaping HTML layout by modifying the DOM.
Modification of the DOM includes, adding, removing, or manipulating elements and the associated children.

To learn more, see [Structural Directives][AioGuideStructuralDirectives].
-->
[디렉티브][AioGuideGlossaryDirective] 중에서 DOM을 조작해서 HTML 레이아웃을 추가하거나, 제거하거나, 변경하는 디렉티브입니다.

자세한 내용을 알아보려면 [구조 디렉티브][AioGuideStructuralDirectives] 문서를 참고하세요.


<a id="subscriber"></a>

<!--
## subscriber
-->
## 구독자(subscriber)

<!--
A function that defines how to obtain or generate values or messages to be published.
This function is executed when a consumer runs the `subscribe()` method of an [observable][AioGuideGlossaryObservable].

The act of subscribing to an observable triggers its execution, associates callbacks with it, and creates a `Subscription` object that lets you unsubscribe.

The `subscribe()` method takes an [observer][AioGuideGlossaryObserver] JavaScript object with up to three callbacks, one for each type of notification that an observable can deliver.

*   The `next` notification sends a value such as a number, a string, or an object.
*   The `error` notification sends a JavaScript Error or exception.
*   The `complete` notification does not send a value, but the handler is run when the method completes.
    Scheduled values can continue to be returned after the method completes.
-->
옵저버블이 발생하는 값이나 메시지를 어떻게 처리할지 정의한 함수입니다.
이 함수는 [옵저버블][AioGuideGlossaryObservable]의 `subscribe()` 메서드를 실행한 이후에만 실행됩니다.

옵저버블을 구독한다는 것을 옵저버블을 시작한다고 볼 수 있으며, 이 옵저버블에 콜백을 연결하는 의미로도 볼 수 있습니다.
옵저버블을 구독하면 `Subscription` 객체를 생성하며, 이 객체를 사용해서 옵저버블 구독을 해지할 수 있습니다.

`subscribe()` 메서드는 [옵저버][AioGuideGlossaryObserver]라고 하는 JavaScript 객체를 인자로 받으며, 이 옵저버에 정의하는 콜백 함수는 옵저버블의 3가지 데이터 전달에 반응합니다.

*   `next`: 숫자, 문자열, 객체 데이터을 전달합니다.
*   `error`: JavaScript Error 객체나 예외가 발생했음을 알립니다.
*   `complete`: 옵저버블이 종료된 것을 알립니다.
    데이터를 전달하지는 않으며, 옵저버블을 종료한 후에 스케쥴러에 정의된 데이터를 반환할 수 있습니다.


<a id="target"></a>

<!--
## target
-->
## 빌드 대상(target)

<!--
A buildable or runnable subset of a [project][AioGuideGlossaryProject], configured as an object in the [workspace configuration file][AioGuideWorkspaceConfigProjectToolConfigurationOptions], and executed by an [Architect][AioGuideGlossaryArchitect] [builder][AioGuideGlossaryBuilder].

In the `angular.json` file, each project has an "architect" section that contains targets which configure builders.
Some of these targets correspond to Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command, such as `build`, `serve`, `test`, and `lint`.

For example, the Architect builder invoked by the `ng build` command to compile a project uses a particular build tool, and has a default configuration with values that you can override on the command line.
The `build` target also defines an alternate configuration for a "development" build, which you can invoke with the `--configuration development` flag on the `build` command.

The Architect tool provides a set of builders.
The [`ng new`][AioCliNew] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command provides a set of targets for the initial application project.
The [`ng generate application`][AioCliGenerateApplication] and [`ng generate library`][AioCliGenerateLibrary] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] commands provide a set of targets for each new [project][AioGuideGlossaryProject].
These targets, their options and configurations, can be customized to meet the needs of your project.
For example, you may want to add a "staging" or "testing" configuration to the "build" target of a project.

You can also define a custom builder, and add a target to the project configuration that uses your custom builder.
You can then run the target using the [`ng run`][AioCliRun] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command.
-->
[워크스페이스 환경설정 파일][AioGuideWorkspaceConfigProjectToolConfigurationOptions]에 정의하고 [아키텍트][AioGuideGlossaryArchitect] [빌더][AioGuideGlossaryBuilder]가 빌드하거나 실행할 수 있는 [프로젝트][AioGuideGlossaryProject]의 대상을 의미합니다.

`angular.json` 파일에는 개별 프로젝트마다 "architect" 섹션이 있으며, 이 섹션에 빌더의 대상을 정의합니다.
이 빌드 대상 중에는 [Angular CLI 명령][AioGuideGlossaryCommandLineInterfaceCli]의 `build`, `serve`, `test`, `lint`을 활용하는 것들도 있습니다.

예를 들어 `ng build` 명령을 싫애하면 아키텍트 빌더가 실행되며 빌드 툴로 프로젝트를 컴파일하는데, 이 때 환경설정에 지정된 기본값과 커맨드라인에서 지정된 옵션을 활용합니다.
`development` 환경으로 `build` 명령을 실행하려면 `--configuration development` 플래그를 붙이면 됩니다.

아키텍트 툴은 여러가지 빌더를 제공합니다.
[`ng new` 명령][AioCliNew]은 애플리케이션 프로젝트에 생성할 수 있는 빌드 대상을 여러가지 제공합니다.
[`ng generate application`][AioCliGenerateApplication] 명령이나 [`ng generate library`][AioCliGenerateLibrary] 명령은 각각 [프로젝트][AioGuideGlossaryProject]를 생성하는 빌드 대상을 제공합니다.
이런 빌드 대상을 활용할 때는 프로젝트에 필요한 대로 옵션이나 환경설정을 커스터마이징할 수 있습니다.
프로젝트 "build" 대상으로 "staging" 이나 "testing" 환경도 추가할 수 있습니다.

필요하다면 커스텀 빌더를 정의해서 프로젝트에 추가할 수도 있습니다.
이렇게 추가한 빌드 대상은 [`ng run`][AioGuideGlossaryCommandLineInterfaceCli] 명령으로 실행합니다.


<a id="template"></a>

<!--
## template
-->
## 템플릿(template)

<!--
Code that defines how to render the [view][AioGuideGlossaryView] of a component.

A template combines straight HTML with Angular [data-binding][AioGuideGlossaryDataBinding] syntax, [directives][AioGuideGlossaryDirective], and [template expressions][AioGuideGlossaryTemplateExpression] \(logical constructs\).
The Angular elements insert or calculate values that modify the HTML elements before the page is displayed.
Learn more about Angular template language in the [Template Syntax][AioGuideTemplateSyntax] guide.

A template is associated with a [component class][AioGuideGlossaryComponent] through the `@Component()` [decorator][AioGuideGlossaryDecoratorDecoration].
The template code can be provided inline, as the value of the `template` property, or in a separate HTML file linked through the `templateUrl` property.

Additional templates, represented by `TemplateRef` objects, can define alternative or *embedded* views, which can be referenced from multiple components.
-->
컴포넌트의 [뷰(view)][AioGuideGlossaryView]를 어떻게 렌더링할지 정의한 코드입니다.

템플릿은 일반 HTML 문법과 Angular [데이터 바인딩][AioGuideGlossaryDataBinding] 문법, [디렉티브][AioGuideGlossaryDirective], [템플릿 표현식][AioGuideGlossaryTemplateExpression]을 조합해서 정의합니다.
그리고 Angular 엘리먼트를 활용하면 화면이 표시되기 전에 HTML 엘리먼트에 엘리먼트를 더 추가하거나 값을 계산하는 로직을 변경할 수 있습니다.
Angular 템플릿에서 사용할 수 있는 문법을 알아보려면 [템플릿 문법][AioGuideTemplateSyntax] 문서를 참고하세요.

템플릿에는 `@Component()` [데코레이터][AioGuideGlossaryDecoratorDecoration]가 지정된 [컴포넌트 클래스][AioGuideGlossaryComponent]를 사용할 수 있습니다.
이 때 컴포넌트의 템플릿 코드는 `template` 프로퍼티를 사용해서 인라인으로 정의하거나 `templateUrl` 프로퍼티를 사용해서 별도 HTML 파일로 정의합니다.

Angular가 제공하는 `TemplateRef` 객체를 활용하면 대체 템플릿이나 *임베디드* 뷰를 구성할 수 있습니다.
이 객체는 여러 컴포넌트가 참조할 수도 잇습니다.


<a id="template-driven-forms"></a>

<!--
## template-driven forms
-->
## 템플릿 기반 폼(template-driven forms)

<!--
A format for building Angular forms using HTML forms and input elements in the view.
The alternative format uses the [reactive forms][AioGuideGlossaryReactiveForms] framework.

When using template-driven forms:

*   The "source of truth" is the template.
    The validation is defined using attributes on the individual input elements.

*   [Two-way binding][AioGuideGlossaryDataBinding] with `ngModel` keeps the component model synchronized with the user's entry into the input elements.
*   Behind the scenes, Angular creates a new control for each input element, provided you have set up a `name` attribute and two-way binding for each input.
*   The associated Angular directives are prefixed with `ng` such as `ngForm`, `ngModel`, and `ngModelGroup`.

The alternative is a reactive form.
For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms][AioGuideFormsOverview].
-->
뷰 안에서 HTML 폼 엘리먼트와 입력 엘리먼트로 Angular 폼을 구성하는 방식을 의미합니다.
이 방식 외에 [반응형 폼][AioGuideGlossaryReactiveForms]을 사용할 수도 있습니다.

템플릿 기반 폼을 사용할 때는:

*   "원천 소스(source of truth)"가 템플릿 안에 존재합니다.
    유효성 검사 로직은 개별 입력 엘리먼트의 어트리뷰트에 정의합니다.

*   `ngModel`로 컴포넌트 모델과 입력 엘리먼트를 [양방향 바인딩][AioGuideGlossaryDataBinding]으로 동기화할 수 있습니다.
*   Angular는 개별 입력 엘리먼트마다 폼 컨트롤을 생성하며, `name` 어트리뷰트를 사용해서 양방향 바인딩을 연결합니다.
*   관련 디렉티브는 `ng`라는 접두사로 시작합니다: `ngForm`, `ngModel`, `ngModelGroup`

템플릿 기반 폼 방식 외에 반응형 폼 방식을 사용할 수도 있습니다.
두 방식이 어떻게 다른지 알아보려면 [Angular 폼 소개][AioGuideFormsOverview] 문서를 참고하세요.


<a id="template-expression"></a>

<!--
## template expression
-->
## 템플릿 표현식(template expression)

<!--
A TypeScript-like syntax that Angular evaluates within a [data binding][AioGuideGlossaryDataBinding].
-->
Angular가 [데이터 바인딩][AioGuideGlossaryDataBinding]을 평가하는 문법이며 TypeScript 문법과 비슷합니다.

<!--todo: have Alex review this -->
<!-- Read about how to write template expressions in the [template expressions][AioGuideInterpolationTemplateExpressions] section of the [Interpolation][AioGuideInterpolation] guide. -->

<!--
## template reference variable
-->
## 템플릿 참조 변수(template reference variable)

<!--
A variable defined in a template that references an instance associated with an element, such as a directive instance, component instance, template as in `TemplateRef`, or DOM element.
After declaring a template reference variable on an element in a template, you can access values from that variable elsewhere within the same template.
The following example defines a template reference variable named `#phone`.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

To learn more, see [Template reference variable][AioGuideTemplateReferenceVariables].
-->
템플릿에서 엘리먼트와 관련된 인스턴스를 가리키는 변수를 의미합니다.
이 인스턴스는 디렉티브의 인스턴스, 컴포넌트의 인스턴스, `TemplateRef`로 표현되는 템플릿, DOM 엘리먼트 자체일 수 있습니다.
템플릿에 있는 엘리먼트에 템플릿 참조 변수를 선언하고 이 템플릿 안이라면 어디에서든 변수를 사용해서 인스턴스를 참조할 수 있습니다.
아래 코드는 `#phone`이라는 템플릿 참조 변수를 정의한 예제 코드입니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

자세한 내용은 [템플릿 참조 변수][AioGuideTemplateReferenceVariables] 문서를 참고하세요.

<!--
## template input variable
-->
## 템플릿 입력 변수(template input variable)

<!--
A template input variable is a variable you can reference within a single instance of the template.
You declare a template input variable using the `let` keyword as in `let customer`.

<code-example format="html" language="html">

&lt;tr *ngFor="let customer of customers;"&gt;
    &lt;td&gt;{{customer.customerNo}}&lt;/td&gt;
    &lt;td&gt;{{customer.name}}&lt;/td&gt;
    &lt;td&gt;{{customer.address}}&lt;/td&gt;
    &lt;td&gt;{{customer.city}}&lt;/td&gt;
    &lt;td&gt;{{customer.state}}&lt;/td&gt;
    &lt;button (click)="selectedCustomer=customer"&gt;Select&lt;/button&gt;
&lt;/tr&gt;

</code-example>

Read and learn more about [template input variables][AioGuideTemplateReferenceVariablesTemplateInputVariable].
-->
템플릿 입력 변수는 템플릿 인스턴스 안에서 참조할 수 있는 변수를 의미합니다.
이 변수는 `let` 키워드를 사용해서 `let customer`와 같이 선언합니다.

<code-example format="html" language="html">

&lt;tr *ngFor="let customer of customers;"&gt;
    &lt;td&gt;{{customer.customerNo}}&lt;/td&gt;
    &lt;td&gt;{{customer.name}}&lt;/td&gt;
    &lt;td&gt;{{customer.address}}&lt;/td&gt;
    &lt;td&gt;{{customer.city}}&lt;/td&gt;
    &lt;td&gt;{{customer.state}}&lt;/td&gt;
    &lt;button (click)="selectedCustomer=customer"&gt;Select&lt;/button&gt;
&lt;/tr&gt;

</code-example>

자세한 내용은 [템플릿 입력 변수][AioGuideTemplateReferenceVariables] 문서를 참고하세요.


<a id="token"></a>

<!--
## token
-->
## 토큰(token)

<!--
An opaque identifier used for efficient table lookup.
In Angular, a [DI token][AioGuideGlossaryDiToken] is used to find [providers][AioGuideGlossaryProvider] of dependencies in the [dependency injection][AioGuideGlossaryDependencyInjectionDi] system.
-->
테이블을 효율적으로 조회하기 위해 사용하는 임의의 식별자를 의미합니다.
Angular에서는 [의존성 주입][AioGuideGlossaryDiToken] 시스템에서 [프로바이더][AioGuideGlossaryProvider]를 찾을 때 [DI 토큰][AioGuideGlossaryDependencyInjectionDi]을 사용합니다.


<a id="transpile"></a>

<!--
## transpile
-->
## 트랜스파일(transpile)

<!--
The translation process that transforms one version of JavaScript to another version; for example, down-leveling ES2015 to the older ES5 version.
-->
특정 버전으로 작성된 JavaScript 코드를 다른 버전으로 변환하는 과정을 의미합니다.
ES2015 문법으로 작성된 코드를 ES5 문법으로 변환하는 경우가 그렇습니다.


<a id="tree"></a>

<!--
## tree
-->
## 트리(tree)

<!--
In [schematics][AioGuideGlossarySchematic], a virtual file system represented by the `Tree` class.
Schematic [rules][AioGuideGlossaryRule] take a tree object as input, operate on them, and return a new tree object.
-->
[스키매틱][AioGuideGlossarySchematic]에서는 `Tree` 클래스로 표현하는 가상 파일 시스템을 의미합니다.
스키매틱 [룰][AioGuideGlossaryRule]은 트리 객체를 입력으로 받아서 이 트리를 처리해서 새로운 트리 객체로 반환합니다.

## TypeScript

<!--
A programming language based on JavaScript that is notable for its optional typing system.
TypeScript provides compile-time type checking and strong tooling support
The type checking and tooling support include code completion, refactoring, inline documentation, and intelligent search.
Many code editors and IDEs support TypeScript either natively or with plug-ins.

TypeScript is the preferred language for Angular development.
To learn more about TypeScript, see [typescriptlang.org][TypescriptlangMain].
-->
JavaScript 문법을 바탕으로 정적 타입 시스템을 추가한 프로그래밍 언어입니다.
TypeScript는 컴파일 시점에 타입을 검사하는 기능을 제공하고, 코드 자동완성, 리팩토링, 인라인 문서, 지능형 검색과 같은 강력한 기능을 제공합니다.
현재는 TypeScript를 기본으로 지원하거나 플러그인 형태로 지원하는 코드 에디터와 IDE가 다수 존재합니다.

Angular를 개발할 때는 TypeScript를 사용합니다.
TypeScript에 대해 자세하게 알아보려면 [typescriptlang.org][TypescriptlangMain] 사이트를 참고하세요.


<!--
## TypeScript configuration file
-->
## TypeScript 환경설정 파일

<!--
A file specifies the root files and the compiler options required to compile a TypeScript project.
To learn more, see [TypeScript configuration][AioGuideTypescriptConfiguration].
-->
TypeScript 프로젝트를 컴파일하기 위해 최상위 파일과 컴파일러 옵션을 정의한 파일입니다.
자세한 내용을 알아보려면 [TypeScript 환경설정][AioGuideTypescriptConfiguration] 문서를 참고하세요.


<a id="unidirectional-data-flow"></a>

<!--
## unidirectional data flow
-->
## 단방향 데이터 흐름(unidirectional data flow)

<!--
A data flow model where the component tree is always checked for changes in one direction from parent to child, which prevents cycles in the change detection graph.

In practice, this means that data in Angular flows downward during change detection.
A parent component can easily change values in its child components because the parent is checked first.
A failure could occur, however, if a child component tries to change a value in its parent during change detection \(inverting the expected data flow\), because the parent component has already been rendered.
In development mode, Angular throws the `ExpressionChangedAfterItHasBeenCheckedError` error if your application attempts to do this, rather than silently failing to render the new value.

To avoid this error, a [lifecycle hook][AioGuideLifecycleHooks] method that seeks to make such a change should trigger a new change detection run.
The new run follows the same direction as before, but succeeds in picking up the new value.
-->
컴포넌트 트리에서 변화를 감지하기 위해 부모에서 자식으로 향하는 데이터 처리 흐름을 의미합니다.

이 말은 Angular의 데이터가 변화 감지 싸이클 중에는 아래 방향으로 흘러간다는 것을 의미합니다.
부모 컴포넌트는 자식 컴포넌트보다 먼저 검사되기 때문에 부모 컴포넌트에 있는 데이터는 자식 컴포넌트로 쉽게 전달될 수 있습니다.
하지만 부모 컴포넌트의 변화 감지 싸이클 중에 자식 컴포넌트에서 데이터를 변경하려고 하면 에러가 발생합니다.
부모 컴포넌트는 이미 렌더링된 상태이기 때문입니다.
Angular 개발모드에서 이런 상황이 발생하면 `ExpressionChangedAfterItHasBeenCheckedError` 에러가 발생하며 새로 변경된 데이터가 렌더링에 반영되지 않습니다.

이 에러를 해결하려면 [라이프싸이클 후킹][AioGuideLifecycleHooks] 메서드를 사용해서 새로운 변화 감지 싸이클을 시작해야 합니다.
변화 감지 싸이클이 시작되더라도 방향은 이전과 같지만, 새로운 싸이클에는 새로운 값이 반영됩니다.

## Universal

<!--
A tool for implementing [server-side rendering][AioGuideGlossaryServerSideRendering] of an Angular application.
When integrated with an app, Universal generates and serves static pages on the server in response to requests from browsers.
The initial static page serves as a fast-loading placeholder while the full application is being prepared for normal execution in the browser.
To learn more, see [Angular Universal: server-side rendering][AioGuideUniversal].
-->
Angular 애플리케이션에 [서버 사이드 렌더링][AioGuideGlossaryServerSideRendering]을 적용할 때 사용하는 툴입니다.
앱에 Universal이 적용되면 Universal이 정적 페이지를 서버에 생성하고 브라우저의 요청에 따라 이 페이지를 제공합니다.
이 때 정적 페이지는 브라우저에서 애플리케이션이 완전히 준비되기 전까지 빠르게 표시될 무언가를 제공하는 용도로 사용합니다.

자세한 내용을 알아보려면 [Angular Universal: 서버 사이드 렌더링][AioGuideUniversal] 문서를 참고하세요.


<a id="view"></a>

<!--
## view
-->
## 뷰(view)

<!--
The smallest grouping of display elements that can be created and destroyed together.
Angular renders a view under the control of one or more [directives][AioGuideGlossaryDirective].

A [component][AioGuideGlossaryComponent] class and its associated [template][AioGuideGlossaryTemplate] define a view.
A view is specifically represented by a `ViewRef` instance associated with a component.
A view that belongs immediately to a component is referenced as a *host view*.
Views are typically collected into [view hierarchies][AioGuideGlossaryViewHierarchy].

Properties of elements in a view can change dynamically, in response to user actions; the structure \(number and order\) of elements in a view cannot.
You can change the structure of elements by inserting, moving, or removing nested views within their view containers.

View hierarchies can be loaded and unloaded dynamically as the user navigates through the application, typically under the control of a [router][AioGuideGlossaryRouter].
-->
함께 생성되고 함께 제거되는 엘리먼트 그룹 중 가장 작은 단위를 의미합니다.
Angular는 [디렉티브][AioGuideGlossaryDirective]로 뷰가 렌더링되는 것을 제어합니다.

[컴포넌트][AioGuideGlossaryComponent]는 클래스와 [템플릿][AioGuideGlossaryTemplate]을 조합해서 뷰를 구성하며, 컴포넌트가 구성한 뷰는 `ViewRef` 인스턴스로 참조할 수 있습니다.
컴포넌트가 존재하는 뷰는 *호스트 뷰(host view)*라고 합니다.
뷰는 [뷰 계층(view hierarchies)][AioGuideGlossaryViewHierarchy] 형태로 구성됩니다.

뷰에 있는 엘리먼트 프로퍼티는 사용자의 동작에 따라 동적으로 변경되며, 뷰에 있는 엘리먼트의 구조(개수나 순서)는 영향을 미치지 않습니다.
엘리먼트 구조는 뷰 컨테이너 안에서 엘리먼트를 추가, 이동, 제거하는 방식으로 조작할 수 있습니다.

뷰 계층은 사용자가 접근하는 애플리케이션 화면에 따라 동적으로 로드되거나 제거됩니다.
Angular에서는 보통 [라우터][AioGuideGlossaryRouter]가 이 과정을 담당합니다.

<a id="ve"></a>

## View Engine

<!--
A previous compilation and rendering pipeline used by Angular.
It has since been replaced by [Ivy][AioGuideGlossaryIvy] and is no longer in use.
View Engine was deprecated in version 9 and removed in version 13.
-->
Angular가 이전에 사용하던 컴파일, 렌더링 파이프라인 엔진입니다.
View Engine은 9버전부터 지원 중단이 결정되었고, 13버전 부터는 [Ivy][AioGuideGlossaryIvy]로 완전히 대체되어 지금은 더이상 사용되지 않습니다.

<a id="view-tree"></a>
<a id="view-hierarchy"></a>

<!--
## view hierarchy
-->
## 뷰 계층(view hierarchy)

<!--
A tree of related views that can be acted on as a unit.
The root view referenced as the *host view* of a component.
A host view is the root of a tree of *embedded views*, collected in a `ViewContainerRef` view container attached to an anchor element in the hosting component.
The view hierarchy is a key part of Angular [change detection][AioGuideGlossaryChangeDetection].

The view hierarchy does not imply a component hierarchy.
Views that are embedded in the context of a particular hierarchy can be host views of other components.
Those components can be in the same NgModule as the hosting component, or belong to other NgModules.
-->
관련된 뷰를 묶어 트리 형태로 구성한 것을 의미합니다.
최상위 뷰는 컴포넌트의 *호스트 뷰(host view)* 입니다.
호스트 뷰는 *임베디드 뷰(embedded views)* 트리의 최상위 계층이 될 수 있으며, 호스트 컴포넌트의 앵커 엘리먼트에 따라 *뷰 컨테이너(view container)* (`ViewContainerRef`)로 구성되기도 합니다.
뷰 계층은 Angular [변화 감지(change detection)][AioGuideGlossaryChangeDetection] 싸이클에서도 중요한 역할을 합니다.

뷰 계층이 컴포넌트 계층과 똑같다고는 볼 수 없습니다.
어떤 뷰는 다른 컴포넌트 호스트 뷰 컨텍스트 안에 존재할 수 있습니다.
이 관계는 NgModule 하나에서 가능하며, 여러 NgModule에 걸쳐서도 가능합니다.


<a id="web-component"></a>

<!--
## web component
-->
## 웹 컴포넌트(web component)

<!--
See [custom element][AioGuideGlossaryCustomElement].
-->
[커스텀 엘리먼트][AioGuideGlossaryCustomElement]를 참고하세요.


<a id="workspace"></a>

<!--
## workspace
-->
## 워크스페이스(workspace)

<!--
A collection of Angular [projects][AioGuideGlossaryProject] \(that is, applications and libraries\) powered by the Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] that are typically co-located in a single source-control repository \(such as [git][GitScmMain]\).

The [`ng new`][AioCliNew] Angular [CLI][AioGuideGlossaryCommandLineInterfaceCli] command creates a file system directory \(the "workspace root"\).
In the workspace root, it also creates the workspace [configuration file][AioGuideGlossaryConfiguration] \(`angular.json`\) and, by default, an initial application project with the same name.

Commands that create or operate on applications and libraries \(such as `add` and `generate`\) must be executed from within a workspace directory.
To learn more, see [Workspace Configuration][AioGuideWorkspaceConfig].
-->
[Angular CLI][AioGuideGlossaryCommandLineInterfaceCli]로 생성한 Angular [프로젝트(애플리케이션, 라이브러리)][AioGuideGlossaryProject]를 의미합니다.
일반적으로 [git][GitScmMain]과 같은 코드 저장소 하나로 관리됩니다.

[Angular CLI][AioGuideGlossaryCommandLineInterfaceCli] [`ng new` 명령][AioCliNew]을 실행하면 워크스페이스 최상위에 해당하는 파일 시스템 디렉토리를 생성할 수 있습니다.
이 때 워크스페이스 최상위 폴더에 워크스페이스 [환경설정 파일][AioGuideGlossaryConfiguration] `angular.json` 파일을 함께 생성하며, 같은 이름으로 애플리케이션 프로젝트의 초기 코드를 생성합니다.

`ng add`나 `ng generate`와 같이 애플리케이션이나 라이브러리를 생성하거나 조작하는 명령은 반드시 워크스페이스 폴더 안에서 실행해야 합니다.

자세한 내용을 알아보려면 [워크스페이스 환경설정][AioGuideWorkspaceConfig] 문서를 참고하세요.


<a id="workspace-configuration"></a>

<!--
## workspace configuration
-->
## 워크스페이스 환경설정(workspace configuration)

<!--
A file named `angular.json` at the root level of an Angular [workspace][AioGuideGlossaryWorkspace] provides workspace-wide and project-specific configuration defaults for build and development tools that are provided by or integrated with the [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli].
To learn more, see [Workspace Configuration][AioGuideWorkspaceConfig].

Additional project-specific configuration files are used by tools, such as `package.json` for the [npm package manager][AioGuideGlossaryNpmPackage], `tsconfig.json` for [TypeScript transpilation][AioGuideGlossaryTranspile], and `tslint.json` for [TSLint][GithubPalantirTslint].
To learn more, see [Workspace and Project File Structure][AioGuideFileStructure].
-->
Angular [워크스페이스][AioGuideGlossaryWorkspace] 최상위 폴더에 위치한 `angular.json` 파일은 워크스페이스 전역과 특정 프로젝트에서 [Angular CLI][AioGuideGlossaryCommandLineInterfaceCli]를 사용할 때 적용될 기본 환경설정을 정의합니다.
자세한 내용을 알아보려면 [워크스페이스 환경설정][AioGuideWorkspaceConfig] 문서를 참고하세요.

이 파일 외에도 [npm 패키지 매니저][AioGuideGlossaryNpmPackage]를 설정하는 `package.json` 파일과 [TypeScript 트랜스파일][AioGuideGlossaryTranspile]을 설정하는 `tsconfig.json` 파일, [TSLint][GithubPalantirTslint] 규칙을 설정하는 `tslint.json` 파일도 존재합니다.
자세한 내용을 알아보려면 [워크스페이스와 프로젝트 파일 구조][AioGuideFileStructure] 문서를 참고하세요.


<a id="zone"></a>

<!--
## zone
-->
## 존(zone)

<!--
An execution context for a set of asynchronous tasks.
Useful for debugging, profiling, and testing applications that include asynchronous operations such as event processing, promises, and runs to remote servers.

An Angular application runs in a zone where it can respond to asynchronous events by checking for data changes and updating the information it displays by resolving [data bindings][AioGuideGlossaryDataBinding].

A zone client can take action before and after an async operation completes.

Learn more about zones in this [Brian Ford video][YoutubeWatchV3iqtmusceU].
-->
비동기 태스크가 실행되는 컨텍스트입니다.
이 컨텍스트는 이벤트 처리, 프로미스, 리모트 서버에서 받은 응답을 처리하는 비동기 작업을 디버깅하거나 점검, 테스트하는 용도로 사용됩니다.

Angular 애플리케이션은 데이터가 변경되거나 [데이터 바인딩][AioGuideGlossaryDataBinding]된 정보를 갱신할 때 존을 활용합니다.

존 클라이언트는 비동기 작업이 실행되기 전과 실행된 후에 추가 동작을 실행할 수 있습니다.

존에 대해 알아보려면 [Brian Ford의 영상][YoutubeWatchV3iqtmusceU]을 참고하세요.

<!-- links -->

[AioApiCommonDatepipe]: api/common/DatePipe "DatePipe | @angular/common - API | Angular"

[AioApiCoreChangedetectorref]: api/core/ChangeDetectorRef "ChangeDetectorRef | @angular/core - API | Angular"

[AioApiCoreProvider]: api/core/Provider "Provider | @angular/core - API | Angular"

[AioApiPlatformBrowserBrowsermodule]: api/platform-browser/BrowserModule "BrowserModule | @angular/platform-browser - API | Angular"

[AioApiPlatformServer]: api/platform-server "@angular/platform-server | API | Angular"

[AioApiRouterResolve]: api/router/Resolve "Resolve | @angular/router - API | Angular"

[AioCliAdd]: cli/add "ng add | CLI | Angular"

[AioCliGenerate]: cli/generate "ng generate | CLI | Angular"
[AioCliGenerateApplication]: cli/generate#application "application - ng generate | CLI | Angular"
[AioCliGenerateAppShell]: cli/generate#app-shell "app-shell - ng generate | CLI | Angular"
[AioCliGenerateLibrary]: cli/generate#library "library - ng generate | CLI | Angular"

[AioCliMain]: cli "CLI Overview and Command Reference | Angular"

[AioCliNew]: cli/new "ng new | CLI | Angular"

[AioCliRun]: cli/run "ng run | CLI | Angular"

[AioGuideAngularPackageFormat]: guide/angular-package-format "Angular Package Format | Angular"

[AioGuideAnimations]: guide/animations "Introduction to Angular animations | Angular"

[AioGuideArchitecture]: guide/architecture "Introduction to Angular concepts | Angular"

[AioGuideArchitectureServices]: guide/architecture-services "Introduction to services and dependency injection | Angular"

[AioGuideAttributeBinding]: guide/attribute-binding "Attribute binding | Angular"
[AioGuideAttributeBindingBindingToTheClassAttribute]: guide/class-binding "Class and style binding | Angular"

[AioGuideAttributeDirectives]: guide/attribute-directives "Attribute directives | Angular"

[AioGuideBootstrapping]: guide/bootstrapping "Launching your app with a root module | Angular"

[AioGuideBrowserSupport]: guide/browser-support "Browser support | Angular"

[AioGuideBuiltInDirectivesDisplayingAndUpdatingPropertiesWithNgmodel]: guide/built-in-directives#displaying-and-updating-properties-with-ngmodel "Displaying and updating properties with ngModel - Built-in directives | Angular"

[AioGuideLifecycleHooks]: guide/lifecycle-hooks "Lifecycle Hooks | Angular"

[AioGuideLifecycleHooksRespondingToProjectedContentChanges]: guide/lifecycle-hooks#responding-to-projected-content-changes "Responding to projected content changes - Lifecycle Hooks | Angular"

[AioGuideInputsOutputs]: guide/inputs-outputs "Sharing data between child and parent directives and components | Angular"

[AioGuideCreatingLibrariesIntegratingWithTheCliUsingCodeGenerationSchematics]: guide/creating-libraries#integrating-with-the-cli-using-code-generation-schematics "Integrating with the CLI using code-generation schematics - Creating libraries | Angular"

[AioGuideDependencyInjection]: guide/dependency-injection "Dependency injection in Angular | Angular"

[AioGuideElements]: guide/elements "Angular elements overview | Angular"

[AioGuideEventBinding]: guide/event-binding "Event binding | Angular"

[AioGuideForms]: guide/forms "Building a template-driven form | Angular"

[AioGuideFileStructure]: guide/file-structure "Workspace and project file structure | Angular"

[AioGuideFormsOverview]: guide/forms-overview "Introduction to forms in Angular | Angular"

[AioGuideFormValidation]: guide/form-validation "Validating form input | Angular"
[AioGuideFormValidationAddingCustomValidatorsToReactiveForms]: guide/form-validation#adding-custom-validators-to-reactive-forms "Adding custom validators to reactive forms - Validating form input | Angular"
[AioGuideFormValidationAddingCustomValidatorsToTemplateDrivenForms]: guide/form-validation#adding-custom-validators-to-template-driven-forms "Adding custom validators to template-driven forms - Validating form input | Angular"

[AioGuideGlossaryA]: guide/glossary#ahead-of-time-aot-compilation "A - Glossary | Angular"
[AioGuideGlossaryAheadOfTimeAotCompilation]: guide/glossary#ahead-of-time-aot-compilation "ahead-of-time (AOT) compilation - Glossary | Angular"
[AioGuideGlossaryAngularElement]: guide/glossary#angular-element "Angular element - Glossary | Angular"
[AioGuideGlossaryArchitect]: guide/glossary#architect "Architect - Glossary | Angular"
[AioGuideGlossaryAttributeDirective]: guide/glossary#attribute-directive "attribute directive - Glossary | Angular"
[AioGuideGlossaryB]: guide/glossary#binding "B - Glossary | Angular"
[AioGuideGlossaryBuilder]: guide/glossary#builder "builder - Glossary | Angular"
[AioGuideGlossaryC]: guide/glossary#case-types "C - Glossary | Angular"
[AioGuideGlossaryChangeDetection]: guide/glossary#change-detection " change detection - Glossary | Angular"
[AioGuideGlossaryClassDecorator]: guide/glossary#class-decorator "class decorator - Glossary | Angular"
[AioGuideGlossaryClassFieldDecorator]: guide/glossary#class-field-decorator "class field decorator - Glossary | Angular"
[AioGuideGlossaryCollection]: guide/glossary#collection "collection - Glossary | Angular"
[AioGuideGlossaryCommandLineInterfaceCli]: guide/glossary#command-line-interface-cli "command-line interface (CLI) - Glossary | Angular"
[AioGuideGlossaryComponent]: guide/glossary#component "component - Glossary | Angular"
[AioGuideGlossaryConfiguration]: guide/glossary#configuration "configuration - Glossary | Angular"
[AioGuideGlossaryCustomElement]: guide/glossary#custom-element "custom element - Glossary | Angular"
[AioGuideGlossaryD]: guide/glossary#data-binding "D - Glossary | Angular"
[AioGuideGlossaryDataBinding]: guide/glossary#data-binding "data binding - Glossary | Angular"
[AioGuideGlossaryDeclarable]: guide/glossary#declarable "declarable - Glossary | Angular"
[AioGuideGlossaryDecoratorDecoration]: guide/glossary#decorator--decoration "decorator | decoration - Glossary | Angular"
[AioGuideGlossaryDependencyInjectionDi]: guide/glossary#dependency-injection-di "dependency injection (DI) - Glossary | Angular"
[AioGuideGlossaryDirective]: guide/glossary#directive "directive - Glossary | Angular"
[AioGuideGlossaryDiToken]: guide/glossary#di-token "DI token - Glossary | Angular"
[AioGuideGlossaryDynamicComponentLoading]: guide/glossary#dynamic-component-loading "dynamic component loading - Glossary | Angular"
[AioGuideGlossaryE]: guide/glossary#eager-loading "E - Glossary | Angular"
[AioGuideGlossaryEagerLoading]: guide/glossary#eager-loading "eager loading - Glossary | Angular"
[AioGuideGlossaryEcmascript]: guide/glossary#ecmascript "ECMAScript - Glossary | Angular"
[AioGuideGlossaryF]: guide/glossary#form-control "F - Glossary | Angular"
[AioGuideGlossaryG]: guide/glossary#immutability "G - Glossary | Angular"
[AioGuideGlossaryH]: guide/glossary#immutability "H - Glossary | Angular"
[AioGuideGlossaryI]: guide/glossary#immutability "I - Glossary | Angular"
[AioGuideGlossaryInjectable]: guide/glossary#injectable "injectable - Glossary | Angular"
[AioGuideGlossaryInjector]: guide/glossary#injector "injector - Glossary | Angular"
[AioGuideGlossaryInput]: guide/glossary#input "input - Glossary | Angular"
[AioGuideGlossaryIvy]: guide/glossary#ivy "Ivy - Glossary | Angular"
[AioGuideGlossaryJ]: guide/glossary#javascript "J - Glossary | Angular"
[AioGuideGlossaryJustInTimeJitCompilation]: guide/glossary#just-in-time-jit-compilation "just-in-time (JIT) compilation - Glossary | Angular"
[AioGuideGlossaryK]: guide/glossary#lazy-loading "K - Glossary | Angular"
[AioGuideGlossaryL]: guide/glossary#lazy-loading "L - Glossary | Angular"
[AioGuideGlossaryLazyLoading]: guide/glossary#lazy-loading "lazy loading - Glossary | Angular"
[AioGuideGlossaryLibrary]: guide/glossary#library "library - Glossary | Angular"
[AioGuideGlossaryM]: guide/glossary#module "M - Glossary | Angular"
[AioGuideGlossaryModule]: guide/glossary#module "module - Glossary | Angular"
[AioGuideGlossaryN]: guide/glossary#ngcc "N - Glossary | Angular"
[AioGuideGlossaryNgmodule]: guide/glossary#ngmodule "NgModule - Glossary | Angular"
[AioGuideGlossaryNpmPackage]: guide/glossary#npm-package "npm package - Glossary | Angular"
[AioGuideGlossaryO]: guide/glossary#observable "O - Glossary | Angular"
[AioGuideGlossaryObservable]: guide/glossary#observable "observable - Glossary | Angular"
[AioGuideGlossaryObserver]: guide/glossary#observer "observer - Glossary | Angular"
[AioGuideGlossaryOutput]: guide/glossary#output "output - Glossary | Angular"
[AioGuideGlossaryP]: guide/glossary#pipe "P - Glossary | Angular"
[AioGuideGlossaryPipe]: guide/glossary#pipe "pipe - Glossary | Angular"
[AioGuideGlossaryProject]: guide/glossary#project "project - Glossary | Angular"
[AioGuideGlossaryProvider]: guide/glossary#provider "provider - Glossary | Angular"
[AioGuideGlossaryQ]: guide/glossary#reactive-forms "Q - Glossary | Angular"
[AioGuideGlossaryR]: guide/glossary#reactive-forms "R - Glossary | Angular"
[AioGuideGlossaryReactiveForms]: guide/glossary#reactive-forms "reactive forms - Glossary | Angular"
[AioGuideGlossaryRouteGuard]: guide/glossary#route-guard "route guard - Glossary | Angular"
[AioGuideGlossaryRouter]: guide/glossary#router "router - Glossary | Angular"
[AioGuideGlossaryRoutingComponent]: guide/glossary#routing-component "routing component - Glossary | Angular"
[AioGuideGlossaryRule]: guide/glossary#rule "rule - Glossary | Angular"
[AioGuideGlossaryS]: guide/glossary#schematic "S - Glossary | Angular"
[AioGuideGlossarySchematic]: guide/glossary#schematic "schematic - Glossary | Angular"
[AioGuideGlossarySchematicsCli]: guide/glossary#schematics-cli "Schematics CLI - Glossary | Angular"
[AioGuideGlossaryScopedPackage]: guide/glossary#scoped-package "scoped package - Glossary | Angular"
[AioGuideGlossaryServerSideRendering]: guide/glossary#server-side-rendering "server-side rendering - Glossary | Angular"
[AioGuideGlossaryService]: guide/glossary#service "service - Glossary | Angular"
[AioGuideGlossaryStructuralDirective]: guide/glossary#structural-directive "structural directive - Glossary | Angular"
[AioGuideGlossarySubscriber]: guide/glossary#subscriber "subscriber - Glossary | Angular"
[AioGuideGlossaryT]: guide/glossary#target "T - Glossary | Angular"
[AioGuideGlossaryTarget]: guide/glossary#target "target - Glossary | Angular"
[AioGuideGlossaryTemplate]: guide/glossary#template "template - Glossary | Angular"
[AioGuideGlossaryTemplateDrivenForms]: guide/glossary#template-driven-forms "template-driven forms - Glossary | Angular"
[AioGuideGlossaryTemplateExpression]: guide/glossary#template-expression "template expression - Glossary | Angular"
[AioGuideGlossaryToken]: guide/glossary#token "token - Glossary | Angular"
[AioGuideGlossaryTranspile]: guide/glossary#transpile "transpile - Glossary | Angular"
[AioGuideGlossaryTree]: guide/glossary#tree "tree - Glossary | Angular"
[AioGuideGlossaryTypescript]: guide/glossary#typescript "TypeScript - Glossary | Angular"
[AioGuideGlossaryU]: guide/glossary#unidirectional-data-flow "U - Glossary | Angular"
[AioGuideGlossaryUniversal]: guide/glossary#universal "Universal - Glossary | Angular"
[AioGuideGlossaryV]: guide/glossary#view "V - Glossary | Angular"
[AioGuideGlossaryView]: guide/glossary#view "view - Glossary | Angular"
[AioGuideGlossaryViewHierarchy]: guide/glossary#view-hierarchy "view hierarchy - Glossary | Angular"
[AioGuideGlossaryW]: guide/glossary#web-component "W - Glossary | Angular"
[AioGuideGlossaryWorkspace]: guide/glossary#workspace "workspace - Glossary | Angular"
[AioGuideGlossaryWorkspaceConfig]: guide/glossary#workspace-configuration "workspace configuration - Glossary | Angular"
[AioGuideGlossaryX]: guide/glossary#zone "X - Glossary | Angular"
[AioGuideGlossaryY]: guide/glossary#zone "Y - Glossary | Angular"
[AioGuideGlossaryZ]: guide/glossary#zone "Z - Glossary | Angular"

[AioGuideHierarchicalDependencyInjection]: guide/hierarchical-dependency-injection "Hierarchical injectors | Angular"

[AioGuideInterpolation]: guide/interpolation "Text interpolation | Angular"
<!-- [AioGuideInterpolationTemplateExpressions]: guide/interpolation#template-expressions "Template expressions - Text interpolation | Angular" -->

[AioGuideNgmodules]: guide/ngmodules "NgModules | Angular"

[AioGuideNpmPackages]: guide/npm-packages "Workspace npm dependencies | Angular"

[AioGuideObservables]: guide/observables "Using observables to pass values | Angular"

[AioGuidePipes]: guide/pipes "Transforming Data Using Pipes | Angular"

[AioGuidePropertyBinding]: guide/property-binding "Property binding | Angular"

[AioGuideRouter]: guide/router "Common Routing Tasks | Angular"
[AioGuideRouterPreventingUnauthorizedAccess]: guide/router#preventing-unauthorized-access "Preventing unauthorized access - Common Routing Tasks | Angular"

[AioGuideRouterTutorialTohResolvePreFetchingComponentData]: guide/router-tutorial-toh#resolve-pre-fetching-component-data "Resolve: pre-fetching component data - Router tutorial: tour of heroes | Angular"

[AioGuideSchematics]: guide/schematics "Generating code using schematics | Angular"

[AioGuideServiceWorkerIntro]: guide/service-worker-intro "Angular service worker introduction | Angular"

[AioGuideSetupLocal]: guide/setup-local "Setting up the local environment and workspace | Angular"

[AioGuideStructuralDirectives]: guide/structural-directives "Writing structural directives | Angular"

[AioGuideStyleguide0201]: guide/styleguide#02-01 "Style 02-01 - Angular coding style guide | Angular"

[AioGuideTemplateReferenceVariables]: guide/template-reference-variables "Template variables | Angular"
[AioGuideTemplateReferenceVariablesTemplateInputVariable]: guide/template-reference-variables#template-input-variable "Template input variable - Template variables | Angular"

[AioGuideTemplateSyntax]: guide/template-syntax "Template syntax | Angular"

[AioGuideTypescriptConfiguration]: guide/typescript-configuration "TypeScript configuration | Angular"

[AioGuideUniversal]: guide/universal "Server-side rendering (SSR) with Angular Universal | Angular"

[AioGuideWorkspaceConfig]: guide/workspace-config "Angular workspace configuration | Angular"
[AioGuideWorkspaceConfigProjectToolConfigurationOptions]: guide/workspace-config#project-tool-configuration-options "Project tool configuration options - Angular workspace configuration | Angular"

<!-- external links -->

[AngularBlogAPlanForVersion80AndIvyB3318dfc19f7]: https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7 "A plan for version 8.0 and Ivy | Angular Blog"

[GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersBrowser]: https://github.com/angular/angular-cli/tree/main/packages/angular_devkit/build_angular/src/builders/browser "packages/angular_devkit/build_angular/src/builders/browser | angular/angular-cli | GitHub"
[GithubAngularAngularCliTreePrimaryPackagesAngularDevkitBuildAngularSrcBuildersKarma]: https://github.com/angular/angular-cli/tree/main/packages/angular_devkit/build_angular/src/builders/karma "packages/angular_devkit/build_angular/src/builders/karma | angular/angular-cli | GitHub"

[GithubPalantirTslint]: https://palantir.github.io/tslint "TSLint | Palantir | GitHub"

[GithubTC39ProposalDecorators]: https://github.com/tc39/proposal-decorators "tc39/proposal-decorators | GitHub"

[GitScmMain]: https://git-scm.com "Git"

[GoogleDevelopersWebFundamentalsArchitectureAppShell]: https://developers.google.com/web/fundamentals/architecture/app-shell "The App Shell Model | Web Fundamentals | Google Developers"

[JsWebpackMain]: https://webpack.js.org "webpack | JS.ORG"

[MdnDocsWebApiCustomelementregistry]: https://developer.mozilla.org/docs/Web/API/CustomElementRegistry "CustomElementRegistry | MDN"

[NpmjsDocsAboutNpm]: https://docs.npmjs.com/about-npm "About npm | npm"

[RxjsMain]: https://rxjs.dev "RxJS"

[TypescriptlangMain]: https://www.typescriptlang.org "TypeScript"

[WebDevFasterAngularChangeDetection]: https://web.dev/faster-angular-change-detection "Optimize Angular's change detection | web.dev"

[WikipediaWikiDomainSpecificLanguage]: https://en.wikipedia.org/wiki/Domain-specific_language "Domain-specific language | Wikipedia"
[WikipediaWikiEcmascript]: https://en.wikipedia.org/wiki/ECMAScript "ECMAScript | Wikipedia"

[YoutubeWatchV3iqtmusceU]: https://www.youtube.com/watch?v=3IqtmUscE_U "Brian Ford - Zones - NG-Conf 2014 | YouTube"

<!-- end links -->

@reviewed 2022-02-28
