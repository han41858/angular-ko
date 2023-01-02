<!--
# Understanding dependency injection
-->
# 의존성 주입 이해하기

<!--
Dependency injection, or DI, is one of the fundamental concepts in Angular. DI is wired into the Angular framework and allows classes with Angular decorators, such as Components, Directives, Pipes, and Injectables, to configure dependencies that they need. 

Two main roles exist in the DI system: dependency consumer and dependency provider. 

Angular facilitates the interaction between dependency consumers and dependency providers using an abstraction called [Injector](guide/glossary#injector). When a dependency is requested, the injector checks its registry to see if there is an instance already available there. If not, a new instance is created and stored in the registry. Angular creates an application-wide injector (also known as "root" injector) during the application bootstrap process, as well as any other injectors as needed. In most cases you don't need to manually create injectors, but you should know that there is a layer that connects providers and consumers.

This topic covers basic scenarios of how a class can act as a dependency. Angular also allows you to use functions, objects, primitive types such as string or Boolean, or any other types as dependencies. For more information, see [Dependency providers](guide/dependency-injection-providers).
-->
의존성 주입\(Dependency injection, DI\)은 Angular의 주요 개념 중 하나입니다.
Angular 프레임워크가 제공하는 컴포넌트, 디렉티브, 파이프, 의존성 주입 데코레이터를 사용하면 이 의존성 객체를 원하는 곳과 연결할 수 있습니다. 

의존성 주입 체계에는 의존성을 사용하는 쪽과 의존성을 제공하는 쪽 이렇게 두가지 역할이 존재합니다. 

Angular는 의존성을 제공하는 쪽과 사용하는 쪽을 연결해서 상호작용할 수 있게 하는데, 이 때 [인젝터\(Injector\)](guide/glossary#injector)라는 것을 사용합니다.
의존성 객체가 요청되면, 인젝터가 인스턴스 저장소를 탐색하면서 이 객체의 인스턴스가 존재하는지 확인합니다.
이 때 인스턴스가 없으면 새로운 인스턴스를 생성하고 이 인스턴스를 인스턴스 저장소에 보관합니다.
Angular는 애플리케이션을 부트스트랩할 때 "최상위\(root\)" 인젝터라고 하는 앱 전역 범위의 인젝터를 생성하고, 필요할 때마다 하위 계층에 인젝터를 생성합니다.
일반적으로는 인젝터를 직접 생성해야 하는 경우는 없지만, 의존성을 제공하는 쪽과 사용하는 쪽을 연결하는 계층이 있다는 것은 꼭 알아두세요.

이 문서는 클래스를 의존성 객체로 처리하는 기본 시나리오를 다룹니다.
함수나 객체, 문자열/불리언과 같은 기본 타입도 의존성 객체로 처리할 수 있습니다.
자세한 내용은 [의존성 프로바이더](guide/dependency-injection-providers) 문서를 참고하세요.


<!--
## Providing dependency
-->
## 의존성 등록하기

<!--
Imagine there is a class called HeroService that needs to act as a dependency in a component.

The first step is to add the @Injectable decorator to show that the class can be injected.

<code-example language="typescript">
@Injectable()
class HeroService {}
</code-example>

The next step is to make it available in the DI by providing it.  A dependency can be provided in multiple places:

* At the Component level, using the `providers` field of the `@Component` decorator. In this case the `HeroService` becomes available to all instances of this component and other components and directives used in the template. For example:

<code-example language="typescript">
@Component({
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
</code-example>

When you register a provider at the component level, you get a new instance of the service with each new instance of that component.

* At the NgModule level, using the `providers` field of the `@NgModule` decorator. In this scenario, the `HeroService` is available to all components, directives, and pipes declared in this NgModule. For example:

<code-example language="typescript">
@NgModule({
  declarations: [HeroListComponent]
  providers: [HeroService]
})
class HeroListModule {}
</code-example>

When you register a provider with a specific NgModule, the same instance of a service is available to all components in that NgModule.

* At the application root level, which allows injecting it into other classes in the application. This can be done by adding the `providedIn: 'root'` field to the `@Injectable` decorator:

<code-example language="typescript">
@Injectable({
  providedIn: 'root'
})
class HeroService {}
</code-example>

When you provide the service at the root level, Angular creates a single, shared instance of the `HeroService` and injects it into any class that asks for it. Registering the provider in the `@Injectable` metadata also allows Angular to optimize an app by removing the service from the compiled application if it isn't used, a process known as tree-shaking.
-->
어떤 컴포넌트에서 `HeroService`라는 클래스를 호출한다고 합시다.

첫번째로 해야 할 것은 클래스를 의존성으로 주입할 수 있도록 클래스에 `@Injectable` 데코레이터를 추가하는 것입니다.

<code-example language="typescript">
@Injectable()
class HeroService {}
</code-example>

그 다음에는 의존성으로 주입할 수 있도록 등록해야 합니다.
이 때 의존성은 여러 곳에 등록할 수 있습니다:

* `@Component` 데코레이터의 `providers` 필드를 사용하면 컴포넌트 계층에 등록합니다. 이렇게 등록하면 이 컴포넌트 템플릿에 존재하는 모든 컴포넌트와 디렉티브에서 `HeroService` 인스턴스에 접근할 수 있습니다.

<code-example language="typescript">
@Component({
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
</code-example>

의존성 객체를 컴포넌트 계층에 등록하면 컴포넌트 인스턴스마다 의존성 객체의 인스턴스를 생성합니다.

* `@NgModule` 데코레이터의 `providers` 필드를 사용하면 NgModule 계층에 등록합니다. 이렇게 등록하면 이 NgModule 안에 있는 모든 컴포넌트나 디렉티브, 파이프에서 `HeroService` 인스턴스에 접근할 수 있습니다. 예를 들면:

<code-example language="typescript">
@NgModule({
  declarations: [HeroListComponent]
  providers: [HeroService]
})
class HeroListModule {}
</code-example>

의존성 객체를 NgModule 계층에 등록하면 NgModule 안에 있는 컴포넌트는 모두 같은 `HeroService` 인스턴스를 사용합니다.

* 애플리케이션 최상의 계층에 등록할 수 있습니다. `@Injectable` 데코레이터에 `providedIn: 'root'`라고 지정하면 됩니다.

<code-example language="typescript">
@Injectable({
  providedIn: 'root'
})
class HeroService {}
</code-example>

의존성 객체를 최상위 계층에 등록하면 Angular는 이 의존성 객체의 인스턴스를 한 번만 생성하고, `HeroService` 객체를 요청하는 곳마다 모두 같은 인스턴스를 주입합니다.
의존성 객체를 이렇게 등록하면 이 객체가 실제로 사용되지 않았을 때 최적화하는 작업을 수행하는데, 이 작업을 트리 셰이킹\(tree-shaking\)이라고 합니다.


<!--
## Injecting a dependency
-->
## 의존성 객체 주입하기

<!--
The most common way to inject a dependency is to declare it in a class constructor. When Angular creates a new instance of a component, directive, or pipe class, it determines which services or other dependencies that class needs by looking at the constructor parameter types. For example, if the `HeroListComponent` needs the `HeroService`, the constructor can look like this:

<code-example language="typescript">
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
</code-example>

When Angular discovers that a component depends on a service, it first checks if the injector has any existing instances of that service. If a requested service instance doesn't yet exist, the injector creates one using the registered provider, and adds it to the injector before returning the service to Angular.

When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

<div class="lightbox">
  <img src="generated/images/guide/architecture/injector-injects.png" alt="Service" class="left">
</div>
-->
의존성 객체를 주입하는 방법 중 가장 많이 사용하는 방법은 클래스 생성자에서 의존성 객체를 요청하는 것입니다.
Angular는 컴포넌트나 디렉티브, 파이프 클래스의 인스턴스를 생성할 때 생성자에 등록된 객체의 타입을 보고 어떤 의존성 객체가 필요한지 결정합니다.
`HeroListComponent`가 `HeroService`를 요청하는 경우라면 `HeroListComponent`의 생성자는 이렇게 지정합니다:

<code-example language="typescript">
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
</code-example>

그러면 컴포넌트에 서비스가 필요하다는 것을 알게 되고, 인젝터에 서비스의 인스턴스가 존재하는지 찾습니다.
이때 서비스 인스턴스가 존재하지 않으면, 인젝터가 등록된 프로바이더로 인스턴스를 생성하고, 인젝터에 추가합니다.

필요한 서비스 인스턴스가 모두 준비되면 Angular가 컴포넌트 생성자를 실행하면서 서비스 인스턴스를 인자로 주입합니다.

<div class="lightbox">
  <img src="generated/images/guide/architecture/injector-injects.png" alt="Service" class="left">
</div>


<!--
## What's next
-->
## 다음 단계

<!--
* [Creating and injecting services](guide/creating-injectable-service)
* [Dependency Injection in Action](guide/dependency-injection-in-action)
-->
* [의존성으로 주입할 수 있는 서비스 생성하기](guide/creating-injectable-service)
* [실전 의존성 주입](guide/dependency-injection-in-action)


@reviewed 2022-08-02
