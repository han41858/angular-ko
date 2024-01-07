{@a introduction-to-services-and-dependency-injection}
<!--
# Introduction to services and dependency injection
-->
# 서비스와 의존성 주입

<!--
*Service* is a broad category encompassing any value, function, or feature that an application needs.
A service is typically a class with a narrow, well-defined purpose.
It should do something specific and do it well.

Angular distinguishes components from services to increase modularity and reusability.

Ideally, a component's job is to enable only the user experience.
A component should present properties and methods for data binding to mediate between the view and the application logic. The view is what the template renders and the application logic is what includes the notion of a *model*.

A component should use services for tasks that don't involve the view or application logic. Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an *injectable service class*, you make those tasks available to any component.
You can also make your application more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances.

Angular doesn't *enforce* these principles.
Instead, Angular helps you *follow* these principles by making it easy to factor your application logic into services. In Angular, *dependency injection* makes those services available to components.
-->
*서비스* 는 앱에서 공통으로 사용하는 상수나 함수, 기능을 모아놓은 단위입니다.
좁은 의미로 보면 클래스 하나만을 서비스라고 하는 경우도 있지만, 보통 넓은 의미로 사용합니다.
좀 더 자세하게 알아봅시다.

Angular는 컴포넌트와 서비스를 확실하게 구분해서 모듈화와 재사용 효율성을 높이는 것을 권장합니다.

이상적인 경우를 따지면 컴포넌트에는 해당 뷰에서 일어나는 사용자의 행동에 관련된 로직만 두는 것이 좋습니다.
컴포넌트에는 화면에 사용되는 프로퍼티나 데이터 바인딩에 사용하는 메소드만 정의하는 것이 좋으며, 컴포넌트는 템플릿이 렌더링된 뷰와 *모델* 을 정의하는 애플리케이션 로직을 중개하는 역할만 하는 것이 좋습니다.

서버에서 데이터를 가져오는 로직이나 사용자의 입력을 검증하는 로직, 콘솔에 로그를 출력하는 로직은 컴포넌트에 구현하지 않고 서비스에게 맡기는 것이 좋습니다.
왜냐하면 이런 기능을 *의존성으로 주입할 수 있는 서비스 클래스*에 정의하면, 여러 컴포넌트가 이 기능을 공통으로 사용할 수 있기 때문입니다.
그리고 환경에 따라 서비스 프로바이더를 다르게 지정하면 애플리케이션을 다양한 환경에서 동작하도록 좀 더 유연하게 만들 수 있습니다.

물론 Angular가 이런 방식을 *강제* 하는 것은 아닙니다.
하지만 Angular가 제공하는 방식을 따른다면 서비스를 *의존성으로 주입* 하는 메커니즘을 활용할 수 있기 때문에, 비슷한 기능이 필요한 컴포넌트에 서비스 로직을 공통으로 활용할 수 있습니다.


<!--
## Service examples
-->
## 서비스 예제

<!--
Here's an example of a service class that logs to the browser console.

<code-example header="src/app/logger.service.ts (class)" path="architecture/src/app/logger.service.ts" region="class"></code-example>

Services can depend on other services.
For example, here's a `HeroService` that depends on the `Logger` service, and also uses `BackendService` to get heroes.
That service in turn might depend on the `HttpClient` service to fetch heroes asynchronously from a server.

<code-example header="src/app/hero.service.ts (class)" path="architecture/src/app/hero.service.ts" region="class"></code-example>
-->
브라우저 콘솔에 로그를 출력하는 서비스 클래스를 예로 들어봅시다:

<code-example header="src/app/logger.service.ts (클래스)" path="architecture/src/app/logger.service.ts" region="class"></code-example>

서비스는 다른 서비스와 독립적일 수 있습니다.
예를 들어 `HeroService`는 `Logger` 서비스를 사용하면서, 서버에서 히어로 목록을 받아오기 위해 `BackendService`라는 서비스를 함께 사용할 수 있습니다.
그리고 `BackendService`는 서버와 통신하기 위해 `HttpClient` 서비스를 다른 의존성으로 사용할 수도 있습니다.

<code-example header="src/app/hero.service.ts (클래스)" path="architecture/src/app/hero.service.ts" region="class"></code-example>


<!--
## Dependency injection (DI)
-->
## 의존성 주입 (Dependency injection, DI)

<div class="lightbox">

<img alt="Service" class="left" src="generated/images/guide/architecture/dependency-injection.png">

</div>

<!--
Dependency injection (DI) is the part of the Angular framework that provides components with access to services and other resources.
Angular provides the ability for you to *inject* a service into a component to give that component access to the service.

Add the `@Injectable()` decorator to a service class so that Angular can inject it into a component as a *dependency*; the optional argument tells Angular where to register this class by default.

   <code-example path="architecture/src/app/hero.service.ts" region="provide">
   </code-example>

* Something *injectable* must be registered with an *injector* before it can be created and used. 

* Register an injectable with a *provider*, an object that tells an injector how to obtain or create a dependency. For a service class, the provider is typically the class itself.

* You don't have to create injectors. Under the hood Angular creates an application-wide *root injector* for you during the bootstrap process. It creates additional child injectors as needed.


<div class="alert is-helpful">

An injectable dependency doesn't have to be a class &mdash; it could be a function, for example, or a value.

</div>

When Angular creates a new instance of a component class, it determines which services or other dependencies that component needs by looking at the constructor parameter types.
For example, the constructor of `HeroListComponent` needs `HeroService`.

<code-example header="src/app/hero-list.component.ts (constructor)" path="architecture/src/app/hero-list.component.ts" region="ctor"></code-example>

When Angular discovers that a component depends on a service, it first checks if the injector has any existing instances of that service.
If a requested service instance doesn't yet exist, the injector makes one using the registered provider and adds it to the injector before returning the service to Angular.

When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

The process of `HeroService` injection looks something like this.
-->
의존성 주입(Dependency injection, DI)은 컴포넌트가 서비스와 같은 리소스에 접근할 수 있도록 Angular 프레임워크가 연결하는 기능입니다.
서비스를 컴포넌트에 *의존성으로 주입*하면 컴포넌트에서 서비스 클래스에 접근할 수 있습니다.

그래서 Angular에 정의하는 서비스 클래스는 `@Injectable()` 데코레이터를 사용해서 메타데이터를 지정하며, 이 메타데이터는 Angular가 서비스를 컴포넌트에 *의존성으로 주입*할 때 활용됩니다.
이 때 `@Injectable()` 데코레이터는 서비스뿐 아니라 컴포넌트나 파이프, NgModule에도 사용할 수 있습니다.

*   이 때 *인젝터*가 중요합니다. 
    Angular는 애플리케이션을 부트스트랩할 때 애플리케이션 전역 범위에 동작하는 인젝터를 생성하며, 이후에 필요한 경우가 있으면 추가 인젝터를 생성합니다.
    개발자가 인젝터를 직접 만드는 경우는 없습니다.

*   인젝터는 의존성 객체의 인스턴스를 생성하고, 이 인스턴스를 나중에 재사용할 수 있도록 *컨테이너*에 관리합니다.
*   *프로바이더*는 의존성으로 주입되는 객체를 어떻게 만드는지 정의한 것입니다.

애플리케이션에 필요한 의존성 객체가 있다면, 이 의존성 객체의 프로바이더를 인젝터에 등록해야 합니다.
그러면 인젝터가 이 프로바이더를 사용해서 의존성 객체의 인스턴스를 생성합니다.
서비스의 경우에는 보통 서비스 클래스가 그 자체로 서비스 프로바이더의 역할을 합니다.

<div class="alert is-helpful">

의존성 객체가 서비스만 가능한 것은 아닙니다. &mdash; 함수나 기본 자료형도 의존성 객체가 될 수 있습니다.

</div>

Angular가 컴포넌트 클래스의 인스턴스를 새로 만들 때, 컴포넌트 생성자에 지정된 타입을 보고 이 컴포넌트에 서비스와 같은 의존성이 있는지 확인합니다.
예를 들면 아래 코드에서 `HeroListComponent`는 `HeroService`가 의존성으로 주입되어야 합니다.

<code-example header="src/app/hero-list.component.ts (생성자)" path="architecture/src/app/hero-list.component.ts" region="ctor"></code-example>

컴포넌트에 서비스가 주입되어야 한다는 것을 Angular가 확인하면, 이 서비스의 인스턴스가 인젝터에 이미 있는지 먼저 확인합니다.
이 때 인스턴스가 아직 생성되지 않았으면 프로바이더에 등록된 방법으로 객체의 인스턴스를 생성하고, 인젝터에 이 인스턴스를 추가한 후에 Angular로 전달합니다.

그리고 컴포넌트에 필요한 서비스가 모두 준비되고 나면 Angular가 컴포넌트 생성자를 실행하면서 이 서비스들을 인자로 전달합니다.

그래서 `HeroService`가 의존성으로 주입되는 과정은 다음 그림처럼 표현할 수 있습니다.

<div class="lightbox">

<img alt="Service" class="left" src="generated/images/guide/architecture/injector-injects.png">

</div>


{@a providing-services}
<!--
### Providing services
-->
### 서비스 프로바이더 등록하기

<!--
You must register at least one *provider* of any service you are going to use.
The provider can be part of the service's own metadata, making that service available everywhere, or you can register providers with specific components.
You register providers in the metadata of the service \(in the `@Injectable()` decorator\) or `@Component()` metadata

*   By default, the Angular CLI command [`ng generate service`](cli/generate) registers a provider with the root injector for your service by including provider metadata in the `@Injectable()` decorator.
    The tutorial uses this method to register the provider of `HeroService` class definition.

   <code-example header="hero.service.ts (provide in root)" path="architecture/src/app/hero.service.ts" region="provide">
   </code-example>

   When you provide the service at the root level, Angular creates a single, shared instance of `HeroService`
   and injects it into any class that asks for it.
   Registering the provider in the `@Injectable()` metadata also allows Angular to optimize an app
   by removing the service from the compiled application if it isn't used, a process known as *tree-shaking*.

*   When you register a provider at the component level, you get a new instance of the service with each new instance of that component.
    At the component level, register a service provider in the `providers` property of the `@Component()` metadata.

   <code-example header="src/app/hero-list.component.ts (component providers)" path="architecture/src/app/hero-list.component.ts" region="providers"></code-example>

For more detailed information, see the [Dependency Injection](guide/dependency-injection) section.
-->
서비스를 사용하려면 *프로바이더(provider)* 를 어디엔가 등록해야 하는데, 서비스 프로바이더를 등록하는 방법은 두 가지입니다.
하나는 서비스 메타데이터\(`@Injectable()` 데코레이터\)에 자신의 프로바이더를 직접 등록하는 방법이며, 다른 하나는 `@NgModule()`이나 `@Component()` 메타데이터에 프로바이더를 등록하고 하위 계층에서 이 프로바이더를 이용하는 방법입니다.

*   Angular CLI로 [`ng generate service`](cli/generate) 명령을 실행하면 서비스 클래스를 생성하면서 `@Injectable()` 데코레이터를 사용해서 이 서비스를 최상위 인젝터에 등록합니다.
    튜토리얼에서 사용하는 `HeroService` 클래스는 다음과 같이 선언되어 있습니다.

   <code-example format="typescript" language="typescript">

   &commat;Injectable({
    providedIn: 'root',
   })

   </code-example>

   서비스 프로바이더를 최상위 인젝터에 등록하면, `HeroService`의 인스턴스는 애플리케이션 전역에 딱 하나만 생성되며, 이 의존성을 주입하는 컴포넌트가 모두 같은 인스턴스를 공유합니다.
   그리고 `@Injectable()` 메타데이터를 사용해서 프로바이더를 등록하면, 애플리케이션 배포 단계에서 *트리 셰이킹(tree-shaking)* 을 실행하면서 코드를 최적화하고 이 서비스가 실제로 사용되지 않으면 최종 결과물에서 제외시킬 수도 있습니다.

*   서비스 프로바이더를 [특정 NgModule](guide/architecture-modules)에 등록하면, 이 NgModule 범위에 있는 컴포넌트만 같은 서비스 인스턴스를 공유합니다.
    이렇게 등록하려면 `@NgModule()` 데코레이터의 `providers` 프로퍼티를 다음과 같이 지정합니다.

    <code-example format="typescript" language="typescript">

    &commat;NgModule({
      providers: [
      BackendService,
      Logger
     ],
     &hellip;
    })

    </code-example>

*   컴포넌트 계층에 프로바이더를 지정하면 해당 컴포넌트의 인스턴스가 생성될 때마다 의존성 객체에 대해 새로운 인스턴스를 생성합니다.
    컴포넌트 계층에 서비스 프로바이더를 등록하려면 `@Component()` 메타데이터의 `providers` 프로퍼티를 다음과 같이 지정합니다:

   <code-example header="src/app/hero-list.component.ts (컴포넌트 프로바이더)" path="architecture/src/app/hero-list.component.ts" region="providers"></code-example>

좀 더 자세한 내용을 확인하려면 [의존성 주입](guide/dependency-injection) 문서를 확인하세요.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-25
