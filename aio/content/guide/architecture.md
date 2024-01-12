<!--
# Introduction to Angular concepts
-->
# Angular 개요

<!--
Angular is a platform and framework for building single-page client applications using HTML and TypeScript.
Angular is written in TypeScript.
It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.

The architecture of an Angular application relies on certain fundamental concepts.
The basic building blocks of the Angular framework are Angular components.

Components define *views*, which are sets of screen elements that Angular can choose among and modify according to your program logic and data

Components use *services*, which provide background functionality not directly related to views such as fetching data.
Such services can be *injected* into components as *dependencies*, making your code modular, reusable, and efficient.

Components and services are classes marked with *decorators*.
These decorators provide metadata that tells Angular how to use them.

*   The metadata for a component class associates it with a *template* that defines a view.
    A template combines ordinary HTML with Angular *directives* and *binding markup* that allow Angular to modify the HTML before rendering it for display.

*   The metadata for a service class provides the information Angular needs to make it available to components through *dependency injection \(DI\)*

An application's components typically define many views, arranged hierarchically.
Angular provides the `Router` service to help you define navigation paths among views.
The router provides sophisticated in-browser navigational capabilities.
-->
Angular는 HTML과 TypeScript로 클라이언트 애플리케이션을 개발할 때 사용하는 플랫폼이자 프레임워크입니다.
Angular 자체도 TypeScript로 개발되었습니다.
프레임워크가 제공하는 기능은 TypeScript 라이브러리처럼 참조해서 애플리케이션에 활용할 수 있습니다.

Angular 애플리케이션의 아키텍처도 이 환경을 기반으로 구현합니다.
Angular 애플리케이션의 구성 요소 중 가장 중요한 것은 *컴포넌트* 입니다.

컴포넌트는 *뷰*를 정의하는데, 화면에 어떤 엘리먼트가 어떤 데이터를 표시할지 지정합니다.

컴포넌트는 *서비스*를 활용합니다.
뷰와 직접 관련있지 않은 기능은 컴포넌트에 있을 필요가 없으며, 이런 로직은 서비스에 정의하고 컴포넌트에 *의존성*으로 *주입* 해서 사용하면 코드를 모듈 단위로 관리할 수 있기 때문에 재사용하기 편하고 훨씬 효율적입니다.

컴포넌트, 서비스는 단순하게 *데코레이터*가 붙은 클래스일 뿐입니다.
하지만 이 데코레이터를 지정했기 때문에 이 클래스가 어떤 역할을 하는지 Angular가 알 수 있습니다.

*   컴포넌트 클래스에 메타데이터를 지정하면 *템플릿*을 뷰로 지정할 수 있습니다. 
    템플릿은 일반적인 HTML 문법을 바탕으로 Angular가 제공하는 *디렉티브*와 *바인딩 마크업*을 사용합니다. 이 템플릿은 Angular에서 처리한 후에 화면에 렌더링됩니다.

*   서비스 클래스에 메타데이터를 지정하면 Angular 컴포넌트에 *의존성으로 주입\(DI\)* 할 수 있습니다.

컴포넌트들은 계층에 따라 수많은 화면을 정의합니다.
그리고 네비게이션 경로와 화면을 연결하기 위해 Angular는 `Router` 라는 서비스를 제공합니다.
라우터를 활용하면 브라우저에서 사용자가 원하는 상황에 적절하게 화면을 전환할 수 있습니다.

<div class="alert is-helpful">

<!--
See the [Angular Glossary](guide/glossary) for basic definitions of important Angular terms and usage.
-->
Angular 용어에 대해 더 알아보려면 [찾아보기](guide/glossary) 문서를 참고하세요.

</div>

<div class="alert is-helpful">

<!--
For the sample application that this page describes, see the <live-example></live-example>.
-->
이 문서에서 설명한 앱을 직접 실행해 보려면 <live-example></live-example>를 참고하세요.

</div>


{@a components}
<!--
## Components
-->
## 컴포넌트

<!--
Every Angular application has at least one component, the *root component* that connects a component hierarchy with the page document object model \(DOM\).
Each component defines a class that contains application data and logic, and is associated with an HTML *template* that defines a view to be displayed in a target environment.

The `@Component()` decorator identifies the class immediately below it as a component, and provides the template and related component-specific metadata.

<div class="alert is-helpful">

Decorators are functions that modify JavaScript classes.
Angular defines a number of decorators that attach specific kinds of metadata to classes, so that the system knows what those classes mean and how they should work.

<a href="https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0">Learn more about decorators on the web.</a>

</div>
-->
Angular 애플리케이션에는 페이지 DOM의 최상위에 위치하는 컴포넌트가 존재하는데, 이 컴포넌트를 *최상위 컴포넌트* 라고 합니다.
그리고 모든 컴포넌트는 컴포넌트 클래스와 *템플릿*으로 구성하는데, 컴포넌트 클래스는 애플리케이션 데이터와 로직을 처리하고 템플릿은 화면에 표시할 HTML을 정의합니다.

Angular 컴포넌트는 컴포넌트 클래스에 `@Component()` 데코레이터를 사용해서 컴포넌트에 대한 메타데이터를 지정하면서 템플릿도 함께 지정합니다.

<div class="alert is-helpful">

데코레이터는 JavaScript 클래스를 변형하는 함수입니다.
Angular에서 제공하는 데코레이터를 어떻게 사용하는지에 따라 클래스의 동작이 달라집니다.

<a href="https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0">데코레이터 더 알아보기</a>

</div>


<!--
### Templates, directives, and data binding
-->
### 템플릿, 디렉티브, 데이터 바인딩

<!--
A template combines HTML with Angular markup that can modify HTML elements before they are displayed.
Template *directives* provide program logic, and *binding markup* connects your application data and the DOM.
There are two types of data binding:

| Data bindings    | Details |
|:---              |:---     |
| Event binding    | Lets your application respond to user input in the target environment by updating your application data. |
| Property binding | Lets you interpolate values that are computed from your application data into the HTML.                  |

Before a view is displayed, Angular evaluates the directives and resolves the binding syntax in the template to modify the HTML elements and the DOM, according to your program data and logic.
Angular supports *two-way data binding*, meaning that changes in the DOM, such as user choices, are also reflected in your program data.

Your templates can use *pipes* to improve the user experience by transforming values for display.
For example, use pipes to display dates and currency values that are appropriate for a user's locale.
Angular provides predefined pipes for common transformations, and you can also define your own pipes.

<div class="alert is-helpful">

For a more detailed discussion of these concepts, see [Introduction to components](guide/architecture-components).

</div>
-->
템플릿은 HTML 문법과 Angular 마크업 문법을 조합해서 구성합니다. Angular 마크업 문법은 HTML 엘리먼트를 확장하는 역할을 합니다.
템플릿에 *디렉티브*를 사용하면 원하는 동작을 하도록 확장할 수 있고, *바인딩 마크업* 문법을 사용하면 애플리케이션 데이터를 DOM과 연결할 수 있습니다.
데이터 바인딩에는 두 종류가 있습니다:

| 데이터 바인딩  | 설명                                  |
|:---------|:------------------------------------|
| 이벤트 바인딩  | 사용자의 동작에 따라 애플리케이션 데이터를 갱신할 수 있습니다. |
| 프로퍼티 바인딩 | 애플리케이션 데이터를 HTML 문서에 표시할 수 있습니다.    |

Angular는 뷰가 화면에 표시되기 전에 템플릿에 사용된 디렉티브와 바인딩 문법을 모두 체크해서 HTML 엘리먼트와 DOM을 변형합니다.
이 때 애플리케이션 데이터나 로직이 템플릿에 반영됩니다.
Angular는 *양방향 데이터 바인딩*도 지원합니다.
이 바인딩 방식을 사용하면 애플리케이션 데이터를 템플릿에 반영할 뿐만 아니라 사용자의 행동에 의해 DOM이 변경되었을 때 애플리케이션 데이터를 다시 갱신할 수도 있습니다.

화면에 표시되는 데이터를 사용자가 알아보기 쉽게 하려면 *파이프*를 사용할 수도 있습니다.
예를 들면 날짜나 화폐를 사용자의 언어 환경에 맞게 표시하는 용도로 사용할 수 있습니다.
일반적인 기능은 Angular 프레임워크에서도 제공합니다.
그리고 이 중에 원하는 기능이 없다면 커스텀 파이프를 만들어서 활용할 수도 있습니다.

<div class="alert is-helpful">

컴포넌트에 대해 좀 더 자세하게 알아보려면 [컴포넌트 소개](guide/architecture-components) 문서를 확인해 보세요.

</div>


<a id="dependency-injection"></a>
<a id="services-and-dependency-injection"></a>

<!--
## Services and dependency injection
-->
## 서비스, 의존성 주입

<!--
For data or logic that isn't associated with a specific view, and that you want to share across components, you create a *service* class.
A service class definition is immediately preceded by the `@Injectable()` decorator.
The decorator provides the metadata that allows other providers to be **injected** as dependencies into your class.

*Dependency injection* \(DI\) lets you keep your component classes lean and efficient.
They don't fetch data from the server, validate user input, or log directly to the console; they delegate such tasks to services.

<div class="alert is-helpful">

For a more detailed discussion, see [Introduction to services and DI](guide/architecture-services).

</div>
-->
어떤 데이터나 함수가 하나의 뷰에만 적용되는 것이 아니라면 *서비스* 클래스를 만들어서 활용할 수 있습니다.
서비스 클래스는 `@Inejctable` 데코레이터를 사용해서 정의하며, 이 데코레이터를 사용하면 컴포넌트나 다른 서비스에 의존성으로 *주입*하기 위해 다른 구성요소보다 먼저 처리됩니다.

*의존성 주입\(Dependency injection, DI\)* 을 사용하면 컴포넌트 클래스를 유연하면서도 효율적으로 구성할 수 있습니다.
서버에서 데이터를 받아오거나, 사용자의 입력을 검증한다든지, 콘솔에 로그를 출력하는 로직은 특정 뷰와 직접적인 관련이 없기 때문에 서비스에서 처리하는 것이 좋습니다.

<div class="alert is-helpful">

서비스와 의존성 주입에 대해 좀 더 자세하게 알아보려면 [서비스와 DI 소개](guide/architecture-services) 문서를 확인해 보세요.

</div>


<!--
### Routing
-->
### 라우팅

<!--
The Angular `Router` package provides a service that lets you define a navigation path among the different application states and view hierarchies in your application.
It is modeled on the familiar browser navigation conventions:

*   Enter a URL in the address bar and the browser navigates to a corresponding page
*   Click links on the page and the browser navigates to a new page
*   Click the browser's back and forward buttons and the browser navigates backward and forward through the history of pages you've seen

The router maps URL-like paths to components instead of pages.
When a user performs an action, such as clicking a link, that would load a new component in the browser, the router intercepts the browser's behavior, and shows or hides that component (and its child components).

If the router determines that the current application state requires a component that hasn't been loaded, the router can *lazy-load* that component and its related dependencies.

The router interprets a link URL according to your application's view navigation rules and data state.
You can navigate to new views when the user clicks a button or selects from a drop box, or in response to some other stimulus from any source.
The router logs activity in the browser's history, so the back and forward buttons work as well.

To define navigation rules, you associate *navigation paths* with your components.
A path uses a URL-like syntax that integrates your program data, in much the same way that template syntax integrates your views with your program data.
You can then apply program logic to choose which views to show or to hide, in response to user input and your own access rules.

<div class="alert is-helpful">

For a more detailed discussion, see [Routing and navigation](guide/router).

</div>
-->
Angular에서 제공하는 `Router` 패키지를 사용하면 네비게이션 주소를 전환하면서 애플리케이션의 상태를 변경할 수 있습니다.
페이지를 전환하는 것도 애플리케이션의 상태를 변경하는 것이며, Angular의 페이지 전환 방식은 브라우저의 페이지 전환 방식을 바탕으로 구현되었습니다:

* 주소표시줄에 URL을 입력하면 브라우저가 해당 페이지로 전환합니다.
* 페이지에 있는 링크를 클릭하면 브라우저가 해당 페이지로 전환합니다.
* 브라우저의 뒤로 가기/앞으로 가기 버튼을 클릭하면 브라우저 히스토리에 따라 뒤로/앞으로 페이지를 전환합니다.

Angular의 라우터는 페이지 대신 컴포넌트를 URL과 맵핑합니다.
사용자가 링크를 클릭하면 브라우저는 새로운 페이지로 전환하려고 하겠지만, 라우터는 이 동작을 중지시키고 페이지 이동 없이 컴포넌트만 전환합니다.

그리고 아직 로드되지 않은 모듈에 있는 페이지로 전환하려고 하면, 라우터가 *지연 로딩* 을 사용해서 컴포넌트와 관련 의존성 객체를 준비하고 난 후에 뷰를 전환합니다.

라우터는 미리 정의된 네비게이션 룰과 데이터 상태에 따라 해당되는 뷰로 전환합니다.
뷰 전환은 사용자가 버튼을 클릭했을 때 일어날 수도 있고, 드롭 박스를 선택했을 때, 다른 로직에서 발생한 결과에 의해서도 일어날 수 있습니다.
이 때마다 라우터는 브라우저의 히스토리에 로그를 저장하며, 이 로그를 활용해서 뒤로 가기/앞으로 가기 버튼에도 반응할 수 있습니다.

네비게이션 룰은 *네비게이션 경로*를 컴포넌트와 연결해서 정의합니다.
이 때 네비게이션 경로는 URL과 비슷한 형식으로 정의하며, 뷰에 있는 데이터를 활용할 수도 있습니다. 사용자의 입력이나 애플리케이션의 규칙에 따라 어떤 뷰로 전환할지 선택할 수 있고, 뷰를 추가로 표시하거나 숨길 수도 있습니다.

<div class="alert is-helpful">

더 자세한 내용을 확인하려면 [라우팅과 네비게이션](guide/router) 문서를 확인하세요.

</div>


<!--
## What's next
-->
## 다음 단계

<!--
You've discovered the main building blocks of an Angular application.
Learn a bit more about them in the following architecture pages.

*   [Introduction to Components](guide/architecture-components)
    *   [Templates and views](guide/architecture-components#templates-and-views)
    *   [Component metadata](guide/architecture-components#component-metadata)
    *   [Data binding](guide/architecture-components#data-binding)
    *   [Directives](guide/architecture-components#directives)
    *   [Pipes](guide/architecture-components#pipes)
*   [Introduction to services and dependency injection](guide/architecture-services)

When you're familiar with these fundamental building blocks, you can explore them in greater detail in the documentation.

You may also be interested in [tools and techniques](guide/architecture-next-steps) to help you build and deploy Angular applications.
-->
지금까지 Angular 애플리케이션을 구성하는 기본 요소에 대해 알아봤습니다.
이런 내용들도 확인해 보세요.

*   [컴포넌트](guide/architecture-components)
    *   [템플릿, 뷰](guide/architecture-components#templates-and-views)
    *   [컴포넌트 메타데이터](guide/architecture-components#component-metadata)
    *   [데이터 바인딩](guide/architecture-components#data-binding)
    *   [디렉티브](guide/architecture-components#directives)
    *   [파이프](guide/architecture-components#pipes)
*   [서비스와 의존성 주입](guide/architecture-services)

Angular 애플리케이션의 기본 요소에 이미 익숙하다면 각각을 좀 더 깊이 있게 다루는 문서를 확인해 보는 것도 좋습니다.

애플리케이션 개발이나 배포에 사용하는 툴이나 테크닉을 먼저 알아보려면 [툴, 테크닉](guide/architecture-next-steps) 문서를 확인해 보세요.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-25
