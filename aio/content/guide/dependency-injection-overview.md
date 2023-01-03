<!--
# Dependency injection in Angular
-->
# Angular의 의존성 주입

<!--
When you develop a smaller part of your system, like a module or a class, you may need to use features from other classes. For example, you may need an HTTP service to make backend calls. Dependency Injection, or DI, is a design pattern and mechanism for creating and delivering some parts of an application to other parts of an application that require them. Angular supports this design pattern and you can use it in your applications to increase flexibility and modularity. 

In Angular, dependencies are typically services, but they also can be values, such as strings or functions. An injector for an application (created automatically during bootstrap) instantiates dependencies when needed, using a configured provider of the service or value. 

<div class="alert is-helpful">

See the <live-example name="dependency-injection"></live-example> for a working example containing the code snippets in this guide.

</div>
-->
모듈이나 클래스와 같이 전체 시스템의 일부를 작업할 때 다른 클래스에 있는 기능을 사용하고 싶을 때가 있습니다.
예를 들면 백엔드에 요청을 보내기 위해 HTTP 서비스가 필요한 경우가 그렇습니다.
의존성 주입\(Dependency Injection, DI\)는 애플리케이션에 필요한 기능을 어딘가에서 생성하고 받아오는 디자인 패턴입니다.
Angular는 기본적으로 의존성 주입을 제공하며, 이 방식을 활용하면 애플리케이션을 모듈 단위로 관리하면서 유연하게 확장할 수 있습니다.

Angular에서 의존성으로 주입되는 객체는 보통 서비스지만, 문자열과 같은 특정 값이나, 함수가 될 수도 있습니다.
의존성 주입을 관리하는 인젝터는 애플리케이션 부트스트랩 단계에서 자동으로 생성되며, 의존성 객체를 요청받으면 이 객체의 인스턴스를 생성합니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example name="dependency-injection"></live-example>에서 직접 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
You should be familiar with the Angular apps in general, and have the fundamental knowledge of Components, Directives, and NgModules. It's highly recommended that you complete the following tutorial:

[Tour of Heroes application and tutorial](tutorial)
-->
Angular 애플리케이션의 기본 컨셉인 컴포넌트, 디렉티브, NgModule에 대해 익숙해야 합니다.
이 튜토리얼을 참고하는 것을 적극 권장합니다:

[히어로들의 여행 애플리케이션, 튜토리얼](tutorial)


<!--
## Learn about Angular dependency injection
-->
## Angular 의존성 주입 알아보기

<!--
<div class="card-container">
  <a href="guide/dependency-injection" class="docs-card" title="Understanding dependency injection">
    <section>Understanding dependency injection</section>
    <p>Learn basic principles of dependency injection in Angular.</p>
    <p class="card-footer">Understanding dependency injection</p>
  </a>
  <a href="guide/creating-injectable-service" class="docs-card" title="Creating and injecting service">
    <section>Creating and injecting service</section>
    <p>Describes how to create a service and inject it in other services and components.</p>
    <p class="card-footer">Creating an injectable service</p>
  </a>
  <a href="guide/dependency-injection-providers" class="docs-card" title="Configuring dependency providers">
    <section>Configuring dependency providers</section>
    <p>Describes how to configure dependencies using the providers field on the @Component and @NgModule decorators. Also describes how to use InjectionToken to provide and inject values in DI, which can be helpful when you want to use a value other than classes as dependencies.</p>
    <p class="card-footer">Configuring dependency providers</p>
  </a>
  <a href="guide/hierarchical-dependency-injection" class="docs-card" title="Hierarchical injectors">
    <section>Hierarchical injectors</section>
    <p>Hierarchical DI enables you to share dependencies between different parts of the application only when and if you need to. This is an advanced topic.</p>
    <p class="card-footer">Hierarchical injectors</p>
  </a>
</div>
-->
<div class="card-container">
  <a href="guide/dependency-injection" class="docs-card" title="Understanding dependency injection">
    <section>의존성 주입 이해하기</section>
    <p>Angular 의존성 주입 시스템의 기본 철학</p>
    <p class="card-footer">의존성 주입 이해하기</p>
  </a>
  <a href="guide/creating-injectable-service" class="docs-card" title="Creating and injecting service">
    <section>의존성 주입 서비스 만들기</section>
    <p>서비스를 어떻게 만들고, 다른 서비스나 컴포넌트에 주입할 수 있는지 알아봅시다.</p>
    <p class="card-footer">의존성 주입 서비스 만들기</p>
  </a>
  <a href="guide/dependency-injection-providers" class="docs-card" title="Configuring dependency providers">
    <section>의존성 프로바이더 등록하기</section>
    <p>@Component, @NgModule 데코레이터에 의존성 객체의 프로바이더를 어떻게 등록하는지 알아봅시다. 클래스가 아니라 특정 값이라면 InjectionToken을 사용하는 방법도 알아봅니다.</p>
    <p class="card-footer">의존성 프로바이더 등록하기</p>
  </a>
  <a href="guide/hierarchical-dependency-injection" class="docs-card" title="Hierarchical injectors">
    <section>인젝터 계층</section>
    <p>의존성 주입 계층을 활용하면 애플리케이션 안에서 의존성 객체를 공유할 수 있습니다. 이 주제는 전문가를 위한 주제입니다.</p>
    <p class="card-footer">인젝터 계층</p>
  </a>
</div>


@reviewed 2022-08-02
