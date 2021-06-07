<!--
# What is Angular?
-->
# Angular란?

<!--
This topic can help you understand Angular: what Angular is, what advantages it provides, and what you might expect as you start to build your applications.

Angular is a development platform, built on [TypeScript](https://www.typescriptlang.org/). As a platform, Angular includes:

* A component-based framework for building scalable web applications
* A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more
* A suite of developer tools to help you develop, build, test, and update your code

With Angular, you're taking advantage of a platform that can scale from single-developer projects to enterprise-level applications. Angular is designed to make updating as easy as possible, so you can take advantage of the latest developments with a minimum of effort. Best of all, the Angular ecosystem consists of a diverse group of over 1.7 million developers, library authors, and content creators.

<div class="alert is-helpful">

See the <live-example name="what-is-angular"></live-example> for a working example containing the code snippets in this guide.

</div>
-->
이 문서는 Angluar를 이해하기 위한 기본 내용을 다룹니다:
Angular는 무엇인지, 사용하면 어떤 점이 좋은지, 애플리케이션 개발을 어떻게 시작할 수 있는지 확인해 보세요.

Angular는 [TypeScript](https://www.typescriptlang.org/)를 기반으로 개발된 개발 플랫폼입니다.
플랫폼이면서 동시에:

* 확장가능한 컴포넌트 구조로 웹 애플리케이션을 만드는 프레임워크입니다.
* 라우팅, 폼 관리, 클라이언트-서버 통신 등 웹 개발에 필요한 라이브러리를 조화롭게 통합한 모음집입니다.
* 애플리케이션 개발, 빌드, 테스트, 수정에 필요한 개발자 도구를 제공합니다.

Angular는 혼자 개발하는 프로젝트는 물론이고 기업용 애플리케이션에도 활용할 수 있습니다.
그리고 최신 기술을 쉽게 도입할 수 있도록 설계되었기 때문에 적은 노력으로 큰 생산성 향상을 낼 수도 있습니다.
무엇보다도, Angular 생태계에 함께하는 개발자, 라이브러리 개발자, 컨텐츠 작성자는 총 170만명 이상에 달합니다.


<div class="alert is-helpful">

이 문서에서 다루는 앱은 <live-example name="what-is-angular"></live-example>에서 직접 실행하거나 다운받아 실행할 수 있습니다.

</div>


{@a essentials}
<!--
## Angular applications: The essentials
-->
## Angular 애플리케이션: 기초

<!--
This section explains the core ideas behind Angular. Understanding these ideas can help you design and build your applications more effectively.
-->
이 섹션에서는 Angular의 기본 개념에 대해 알아봅시다.
애플리케이션을 효율적으로 설계하고 구현하려면 이 개념들을 제대로 알고 있는 것이 좋습니다.


{@a components}
<!--
### Components
-->
### 컴포넌트(Component)

<!--
Components are the building blocks that compose an application. A component includes a TypeScript class with a `@Component()` decorator, an HTML template, and styles. The `@Component()` decorator specifies the following Angular-specific information:

* A CSS selector that defines how the component is used in a template. HTML elements in your template that match this selector become instances of the component.
* An HTML template that instructs Angular how to render the component.
* An optional set of CSS styles that define the appearance of the template's HTML elements.

The following is a minimal Angular component.

<code-example
  path="what-is-angular/src/app/hello-world/hello-world.component.ts"></code-example>

To use this component, you write the following in a template:

<code-example path="what-is-angular/src/app/app.component.html" region="hello-world-selector"></code-example>

When Angular renders this component, the resulting DOM looks like this:

<code-example path="what-is-angular/src/app/hello-world-example.html" language="html"></code-example>

Angular's component model offers strong encapsulation and an intuitive application structure. Components also make your application easier to unit test and can improve the overall readability of your code.

For more information on what you can do with components, see the [Components](guide/component-overview) section.
-->
컴포넌트는 애플리케이션을 구성하는 기본 단위입니다.
컴포넌트는 `@Component()` 데코레이터가 붙는 TypeScript 클래스, HTML 템플릿, 스타일로 구성됩니다.
`@Component()` 데코레이터는 다음과 같이 Angular에 필요한 정보를 지정하는 역할을 합니다:

* 컴포넌트가 템플릿에 사용될 CSS 셀렉터를 지정합니다. 템플릿에서 이 셀렉터에 해당되는 HTML 엘리먼트마다 컴포넌트 인스턴스가 생성됩니다.
* Angular가 컴포넌트 내용으로 렌더링할 HTML 템플릿을 지정합니다.
* 템플릿 HTML 엘리먼트의 모습을 지정해야 한다면 이 때 필요한 CSS 스타일을 지정합니다.

기본 내용만 담아 Angular 컴포넌트를 만들어보면 이렇게 구성할 수 있습니다.

<code-example
  path="what-is-angular/src/app/hello-world/hello-world.component.ts"></code-example>

이 컴포넌트를 사용하려면 템플릿에 이런 코드를 추가하면 됩니다:

<code-example path="what-is-angular/src/app/app.component.html" region="hello-world-selector"></code-example>

Angular가 컴포넌트를 렌더링하고 나면 DOM이 이렇게 됩니다:

<code-example path="what-is-angular/src/app/hello-world-example.html" language="html"></code-example>

Angular 컴포넌트는 강력하게 캡슐화되어 있지만 애플리케이션 구조에 맞게 직관적으로 구성됩니다.
컴포넌트를 사용하면 애플리케이션에 유닛 테스트를 적용하기 쉽고, 코드의 가독성도 높일 수 있습니다.

컴포넌트가 어떤 역할을 하는지 더 자세하게 알아보려면 [컴포넌트](guide/component-overview) 문서를 참고하세요.


{@a templates}
<!--
### Templates
-->
### 템플릿(Templates)

<!--
Every component has an HTML template that declares how that component renders. You define this template either inline or by file path.

Angular extends HTML with additional syntax that lets you insert dynamic values from your component. Angular automatically updates the rendered DOM when your component’s state changes. One application of this feature is inserting dynamic text, as shown in the following example.

<code-example path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.html" region="say-hello"></code-example>

The value for message comes from the component class:

<code-example path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.ts"></code-example>

When the application loads the component and its template, the user sees the following:

<code-example language="html">
&lt;p&gt;Hello, World!&lt;/p&gt;
</code-example>

Notice the use of double curly braces--they instruct Angular to interpolate the contents within them.

Angular also supports property bindings, to help you set values for properties and attributes of HTML elements and pass values to your application's presentation logic.

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="bindings"></code-example>

Notice the use of the square brackets--that syntax indicates that you're binding the property or attribute to a value in the component class.

You can also declare event listeners to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches. You declare an event listener by specifying the event name in parentheses:

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="event-binding"></code-example>

The preceding example calls a method, which is defined in the component class:

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts" region="method"></code-example>

The following is an example of interpolation and bindings within an Angular template:

<code-tabs linenums="true">
  <code-pane
    header="hello-world-bindings.component.ts"
    path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts">
  </code-pane>
  <code-pane
    header="hello-world-bindings.component.html"
    path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html"
    linenums="false">
  </code-pane>
</code-tabs>

You can add additional functionality to your templates through the use of [directives](guide/built-in-directives). The most popular directives in Angular are `*ngIf` and `*ngFor`. You can use directives to perform a variety of tasks, such as dynamically modifying the DOM structure. And you can also create your own custom directives to create great user experiences.

The following code is an example of the `*ngIf` directive.

<code-tabs linenums="true">
  <code-pane
    header="hello-world-ngif.component.ts"
    path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.ts">
  </code-pane>
  <code-pane
    header="hello-world-ngif.component.html"
    path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.html"
    linenums="false">
  </code-pane>
</code-tabs>

Angular's declarative templates allow you to cleanly separate your application's logic from its presentation. Templates are based on standard HTML, so they're easy to build, maintain, and update.

For more information on what you can do with templates, see the [Templates](guide/template-syntax) section.
-->
컴포넌트는 이 컴포넌트가 어떻게 렌더링될지 정의하기 위해 HTML 템플릿이 존재합니다.
템플릿은 인라인으로 정의하거나 별도 파일로 작성해서 불러올 수 있습니다.

템플릿은 HTML 문법을 기본으로 작성하며 컴포넌트에 있는 값을 동적으로 반영하도록 구성합니다.
그래서 컴포넌트의 상태가 변경되면 Angular가 자동으로 렌더링된 DOM을 갱신합니다.
아래 예제 코드는 문자열을 동적으로 렌더링하는 컴포넌트의 템플릿 코드입니다:

<code-example path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.html" region="say-hello"></code-example>

이 문자열은 컴포넌트 클래스에서 전달됩니다:

<code-example path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.ts"></code-example>

애플리케이션이 컴포넌트와 템플릿을 로드하고 나면 사용자가 이런 화면을 볼 수 있습니다:

<code-example language="html">
&lt;p&gt;Hello, World!&lt;/p&gt;
</code-example>

템플릿에 이중 중괄호(`{{`, `}}`)가 사용된 것을 확인해 보세요.
이 문법은 템플릿에 문자열을 바인딩(interpolation)하는 문법입니다.

문자열 바인딩 외에도, Angular는 HTML 엘리먼트의 프로퍼티나 어트리뷰트에 값을 할당하는 프로퍼티 바인딩(property binding) 문법도 제공합니다:

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="bindings"></code-example>

대괄호(`[`, `]`)가 사용된 것을 확인해 보세요.
이 문법은 컴포넌트 클래스에 있는 값을 프로퍼티나 어트리뷰트로 바인딩하는 문법입니다.

키입력, 마우스 이동, 클릭, 터치 등과 같은 사용자의 동작을 감지하고 이 동작에 반응하기 위해 이벤트 리스터를 추가할 수도 있습니다.
감지하려는 이벤트 이름을 소괄호(`(`, `)`)로 감싸면 됩니다:

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="event-binding"></code-example>

그리고 아래 코드는 이벤트가 발생했을 때 실행될 메서드를 컴포넌트 클래스에 구현한 코드입니다:

<code-example path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts" region="method"></code-example>

Angular 템플릿에 문자열 바인딩과 프로퍼티 바인딩, 이벤트 바인딩이 어떻게 사용되는지 예제를 보면서 확인해 보세요:

<code-tabs linenums="true">
  <code-pane
    header="hello-world-bindings.component.ts"
    path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts">
  </code-pane>
  <code-pane
    header="hello-world-bindings.component.html"
    path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html"
    linenums="false">
  </code-pane>
</code-tabs>

템플릿에 추가 기능을 구현하려면 [디렉티브(directives)](guide/built-in-directives)를 사용하면 됩니다.
Angular 디렉티브 중에서 가장 많이 사용되는 디렉티브는 `*ngIf`와 `*ngFor`가 있습니다.
디렉티브를 활용하면 DOM 구조를 동적으로 변경할 수 있기 때문에 다양한 용도로 활용할 수 있습니다.
사용자 경험을 더 좋게 만드는 용도로도 커스텀 디렉티브를 활용할 수 있습니다.

아래 코드는 `*ngIf` 디렉티브를 사용하는 예제 코드입니다:

<code-tabs linenums="true">
  <code-pane
    header="hello-world-ngif.component.ts"
    path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.ts">
  </code-pane>
  <code-pane
    header="hello-world-ngif.component.html"
    path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.html"
    linenums="false">
  </code-pane>
</code-tabs>

Angular는 선언적인 템플릿 문법을 사용하기 때문에 화면에 표시되는 단위로 애플리케이션 로직을 깔끔하게 분리할 수 있습니다.
그리고 템플릿에는 표준 HTML 문법을 활용하기 때문에 구성하기 쉽고, 관리하기도 쉬우며, 나중에 수정하기도 쉽습니다.

템플릿에 대해 더 자세하게 알아보려면 [템플릿](guide/template-syntax) 문서를 참고하세요.


{@a di}
<!--
### Dependency injection
-->
### 의존성 주입(Dependency injection, DI)

<!--
Dependency injection allows you to declare the dependencies of your TypeScript classes without taking care of their instantiation. Instead, Angular handles the instantiation for you. This design pattern allows you to write more testable and flexible code. Even though understanding dependency injection is not critical to start using Angular, we strongly recommend it as a best practice and many aspects of Angular take advantage of it to some degree.

To illustrate how dependency injection works, consider the following example. The first file, `logger.service.ts`, defines a `Logger` class. This class contains a `writeCount` function that logs a number to the console.

<code-example path="what-is-angular/src/app/logger.service.ts"></code-example>

Next, the `hello-world-di.component.ts` file defines an Angular component. This component contains a button that uses the `writeCount` function of the Logger class. To access that function, the `Logger` service is injected into the `HelloWorldDI` class by adding `private logger: Logger` to the constructor.

<code-example path="what-is-angular/src/app/hello-world-di/hello-world-di.component.ts"></code-example>

For more information about dependency injection and Angular, see the [Dependency injection in Angular](guide/dependency-injection) section.
-->
Angular는 TypeScript 클래스를 활용하는 의존성 주입 시스템을 제공하기 때문에, 컴포넌트에 필요한 객체의 인스턴스를 어떻게 생성하는지 직접 신경쓸 필요가 없습니다.
인스턴스 생성은 Angular가 알아서 처리합니다.
이런 패턴 덕분에 애플리케이션 코드를 좀 더 유연하게 작성할 수 있으며, 테스트하기도 쉽습니다.
Angular 애플리케이션을 개발할 때 의존성 주입 시스템을 반드시 알아야 하는 것은 아닙니다.
하지만 모범사례를 보면서 의존성 주입 시스템을 활용했을 때 얻는 장점이 무엇인지 알아보는 것을 적극 권장합니다.

의존성 주입 시스템이 동작하는 방식을 간단한 예제로 확인해 봅시다.
첫 번째 파일 `logger.service.ts` 에는 `Logger` 클래스가 정의되어 있습니다.
이 클래스에는 인자로 받은 숫자를 콘솔에 출력하는 `writeCount` 함수가 정의되어 있습니다.

<code-example path="what-is-angular/src/app/logger.service.ts"></code-example>

그리고 `hello-world-di.component.ts` 파일에는 Angular 컴포넌트가 정의되어 있습니다.
이 컴포넌트에는 버튼이 하나 있는데, 이 버튼을 클릭하면 Logger 클래스에 있는 `writeCount` 함수를 실행하려고 합니다.
그러면 `HelloWorldDI` 클래스 생성자에 `private logger: Logger`라는 코드를 추가해서 `Logger` 서비스가 의존성 객체로 주입되도록 요청할 수 있습니다.

<code-example path="what-is-angular/src/app/hello-world-di/hello-world-di.component.ts"></code-example>

의존성 주입에 대해 더 자세하게 알아보려면 [Angular의 의존성 주입](guide/dependency-injection) 문서를 참고하세요.


{@a cli}

## Angular CLI

<!--
The Angular CLI is the fastest, easiest, and recommended way to develop Angular applications. The Angular CLI makes a number of tasks easy. Here are some examples:

<table>
<tr>
<td><a href="cli/build">ng build</a></td>
<td>Compiles an Angular app into an output directory.</td>
</tr>
<tr>
<td><a href="cli/serve">ng serve</a></td>
<td>Builds and serves your application, rebuilding on file changes.</td>
</tr>
<tr>
<td><a href="cli/generate">ng generate</a></td>
<td>Generates or modifies files based on a schematic.</td>
</tr>
<tr>
<td><a href="cli/test">ng test</a></td>
<td>Runs unit tests on a given project.</td>
</tr>
<tr>
<td><a href="cli/e2e">ng e2e</a></td>
<td>Builds and serves an Angular application, then runs end-to-end tests.</td>
</tr>
</table>

You'll find the Angular CLI a valuable tool for building out your applications.

For more information about the Angular CLI, see the [CLI Reference](/cli) section.
-->
Angular 애플리케이션을 가장 빠르고, 쉽게, 모범사례로 개발하려면 Angular CLI를 활용하면 됩니다.
Angular CLI를 활용하면 수많은 작업들을 간단하게 처리할 수 있습니다:

<table>
<tr>
<td><a href="cli/build">ng build</a></td>
<td>Angular 앱을 컴파일합니다.</td>
</tr>
<tr>
<td><a href="cli/serve">ng serve</a></td>
<td>애플리케이션을 빌드하고 개발서버로 서비스합니다. 파일이 변경되면 바로 반영합니다.</td>
</tr>
<tr>
<td style="min-width: 9rem;"><a href="cli/generate">ng generate</a></td>
<td>스키매틱에 정해진 대로 Angular 구성요소를 생성하거나 수정합니다.</td>
</tr>
<tr>
<td><a href="cli/test">ng test</a></td>
<td>유닛 테스트를 실행합니다.</td>
</tr>
<tr>
<td><a href="cli/e2e">ng e2e</a></td>
<td>애플리케이션을 빌드하고 개발서버로 띄운 후에 엔드-투-엔드 테스트를 실행합니다.</td>
</tr>
</table>

이밖에도 Angular CLI를 활용할 수 있는 방법은 많습니다.

Angular CLI에 대해 자세하게 알아보려면 [CLI 참고](/cli) 문서를 참고하세요.


{@a 1p-libraries}
<!--
## First-party libraries
-->
## 기본 라이브러리

<!--
The section, [Angular applications: The essentials](#essentials), provides a brief overview of a couple of the key architectural elements you'll use when building Angular applications. But the many benefits of Angular really become apparent when your application grows and you want to add additional functions such as site navigation or user input. That's when you can leverage the Angular platform to incorporate one of the many first-party libraries that Angular provides.

Some of the libraries available to you include:
<table>
<tr>
<td><a href="guide/router">Angular Router</a></td>
<td>Advanced client-side navigation and routing based on Angular components. Supports lazy-loading, nested routes, custom path matching, and more.</td>
</tr>
<tr>
<td><a href="guide/forms-overview">Angular Forms</td>
<td>Uniform system for form participation and validation.</td>
<tr>
<td><a href="guide/http">Angular HttpClient</a></td>
<td>Robust HTTP client that can power more advanced client-server communication.</td>
</tr>
<tr>
<td><a href="guide/animations">Angular Animations</a></td>
<td>Rich system for driving animations based on application state.</td>
</tr>
<tr>
<td><a href="guide/service-worker-intro">Angular PWA</a>
<td>Tools for building Progressive Web Applications (PWAs) including a service worker and Web app manifest.</td>
</tr>
<tr>
<td><a href="guide/schematics">Angular Schematics</td>
<td>Automated scaffolding, refactoring, and update tools that simplify development at large scale.</td>
</tr>
</table>

These libraries expand your application's functionality while also allowing you to focus more on the features that make your application unique. And you can add these libraries knowing that they're designed to integrate seamlessly into and update simultaneously with the Angular framework.

These libraries are only required if and when they can help you add functionality to your applications or solve a particular problem.
-->
이 문서는 Angular 애플리케이션을 구성하는 중요한 구성요소들에 대해 간단하게 알아봤습니다.
Angular의 진정한 가치는 애플리케이션이 점점 커지면서 필요한 화면으로 전환하고 사용자의 동작에 반응하는 다양한 로직을 추가할수록 그 뛰어난 효율성을 제대로 확인할 수 있습니다.
이 때 사용할 수 있도록 Angular가 제공하는 퍼스트-파티 라이브러리들은 이런 것들이 있습니다:

<table>
<tr>
<td><a href="guide/router">Angular Router</a></td>
<td>Angular 컴포넌트를 기반으로 클라이언트에서 화면을 전환합니다. 지연로딩과 중첩 라우팅, 커스텀 주소 매칭 등 다양한 기능을 제공합니다.</td>
</tr>
<tr>
<td><a href="guide/forms-overview">Angular Forms</td>
<td>일관된 방식으로 폼(form)을 구성하고 유효성을 검사할 수 있습니다.</td>
<tr>
<td><a href="guide/http">Angular HttpClient</a></td>
<td>클라이언트-서버 통신에 사용하는 강력한 HTTP 클라이언트입니다.</td>
</tr>
<tr>
<td><a href="guide/animations">Angular Animations</a></td>
<td>애플리케이션 상태에 따라 자동으로 연동되는 애니메이션을 구현해 보세요.</td>
</tr>
<tr>
<td><a href="guide/service-worker-intro">Angular PWA</a>
<td>프로그레시브 웹 애플리케이션(Progressive Web Applications, PWA)을 구성할 때 사용하는 툴입니다. 서비스 워커, 웹 앱 매니페스트를 지원합니다.</td>
</tr>
<tr>
<td><a href="guide/schematics">Angular Schematics</td>
<td>대규모 프로젝트 개발을 단순화하기 위해 구성요소의 기본틀 생성을 자동화하거나 리팩토링 할 수 있는 툴입니다.</td>
</tr>
</table>

이 라이브러리들은 애플리케이션에 기능이 필요할 때마다 도입해서 확장할 수 있기 때문에, 개발자는 애플리케이션 자체 기능에만 신경쓸 수 있습니다.
그리고 이 라이브러리들은 Angular 프레임워크와 자연스럽게 연동되며 버전업도 동시에 이루어지도록 설계되었습니다.

이 라이브러리들은 사용할 필요가 있을 때만 애플리케이션에 로드해서 사용하면 됩니다.


<!--
## Next steps
-->
## 다음 단계

<!--
This topic is intended to give you a brief overview of what Angular is, the advantages it provides, and what you can expect as you start to build your applications.

To see Angular in action, see our [Getting Started](https://angular.io/start) tutorial. This tutorial uses [stackblitz.com](https://stackblitz.com/), so you can explore a working example of Angular without any installation requirements.

To explore Angular's capabilities further, we recommend reading through the sections, Understanding Angular and Developer Guides.
-->
이 문서는 Angular가 무엇인지, Angular를 사용하면 어떤 점이 좋은지, 애플리케이션을 생성하려면 어떻게 해야 하는지와 같은 간단한 내용을 살펴보기 위한 것입니다.

Angular를 실제로 사용해 보려면 [시작하기](/start) 튜토리얼을 확인해 보세요.
이 튜토리얼은 [stackblitz.com](https://stackblitz.com/)를 활용하기 때문에 로컬 환경을 구성하지 않아도 Angular 애플리케이션을 실행해 볼 수 있습니다.

Angular를 활용할 수 방법에 대해 더 알아보려면 다른 문서들을 자유롭게 확인해 보는 것도 좋습니다.


@reviewed 2021-03-08
