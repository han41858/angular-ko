<!--
# Creating an injectable service
-->
# 의존성 주입 서비스 만들기

<!--
Service is a broad category encompassing any value, function, or feature that an application needs. A service is typically a class with a narrow, well-defined purpose. A component is one type of class that can use DI.

Angular distinguishes components from services to increase modularity and reusability. By separating a component's view-related features from other kinds of processing, you can make your component classes lean and efficient.

Ideally, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding, to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a model).

A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an injectable service class, you make those tasks available to any component. You can also make your application more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances.

Angular does not enforce these principles. Angular helps you follow these principles by making it easy to factor your application logic into services and make those services available to components through DI.
-->
Angular에서 이야기하는 서비스(Service)는 애플리케이션에 필요한 어떤 값, 함수, 기능을 모두 포괄하는 용어입니다.
하지만 보통은 어떤 목적을 달성하기 위해 정의한 클래스 하나를 가리킵니다.
의존성 주입은 컴포넌트 클래스에서 자주 사용합니다.

Angular는 컴포넌트와 서비스를 분리해서 모듈성과 재사용성을 높입니다.
여러 컴포넌트가 공통으로 처리하는 로직은 서비스에 두고, 컴포넌트의 화면과 관련된 로직은 컴포넌투에 두면 컴포넌트 클래스를 간결하고 효율적으로 유지할 수 있습니다.

컴포넌트는 사용자가 무언가 작업할 수 있게 돕는 것이 근본적인 존재 목적입니다.
그래서 컴포넌트는 템플릿으로 렌더링되는 화면과 모델로 표현되는 애플리케이션 로직을 연결하기 위해 프로퍼티나 메서드를 사용해서 데이터 바인딩해야 합니다.

서버에서 데이터를 받아오는 동작이나 사용자가 입력한 내용을 검증하는 것, 콘솔에 로그를 출력하는 것은 컴포넌트가 아니라 서비스에 맡겨둘 수 있습니다.
서비스 클래스는 이런 기능을 모아서 정의하고 의존성으로 주입할 수 있도록 구성하면, 이후에 다른 컴포넌트에서도 이 기능을 재사용할 수 있습니다.
그리고 애플리케이션이 실행되는 상황에 따라 적절한 서비스 인스턴스를 교체해서 의존성으로 주입하면 다양한 환경에 맞게 애플리케이션을 실행할 수 있습니다.

Angular가 이런 방식을 강요하는 것은 아닙니다.
하지만 이 방식이 현재는 가장 나은 방법이라고 생각하기 때문에, 애플리케이션 로직을 서비스에 정의한 후에 컴포넌트에는 이 서비스를 의존성으로 주입하는 패턴을 마련해 두었습니다.


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
브라우저 콘솔에 로그를 남기는 서비스 클래스를 생각해 봅시다.

<code-example header="src/app/logger.service.ts (클래스)" path="architecture/src/app/logger.service.ts" region="class"></code-example>

서비스는 다른 서비스를 의존성으로 가질 수 있습니다.
예를 들자면, `HeroService`는 `Logger` 서비스를 의존성으로 가지면서, 히어로 목록을 불러오기 위해 `BackendService`도 의존성으로 갖습니다.
`BackendService`는 서버와 통신하며 히어로 목록을 비동기로 불러오기 위해 `HttpClient`를 의존성으로 가집니다.

<code-example header="src/app/hero.service.ts (클래스)" path="architecture/src/app/hero.service.ts" region="class"></code-example>


<!--
## Creating an injectable service
-->
## 의존성으로 주입할 수 있는 서비스 만들기

<!--
Angular CLI provides a command to create a new service. In the following example, you add a new service to your application, which was created earlier with the `ng new` command. 

To generate a new `HeroService` class in the `src/app/heroes` folder, follow these steps: 

1. Run this [Angular CLI](cli) command:

<code-example language="sh">
ng generate service heroes/hero
</code-example>

This command creates the following default `HeroService`.

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI-generated)">
</code-example>

The `@Injectable()` decorator specifies that Angular can use this class in the DI system.
The metadata, `providedIn: 'root'`, means that the `HeroService` is visible throughout the application.

2. Add a `getHeroes()` method that returns the heroes from `mock.heroes.ts` to get the hero mock data:

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>

For clarity and maintainability, it is recommended that you define components and services in separate files.
-->
Angular CLI를 활용해서 서비스를 생성할 수 있습니다.
이전에 사용했던 `ng new` 명령을 실행하면 됩니다.

`src/app/heroes` 폴더에 `HeroService` 클래스를 생성하려면 이렇게 하면 됩니다:

1. [Angular CLI](cli) 명령을 실행합니다:

<code-example language="sh">
ng generate service heroes/hero
</code-example>

그러면 다음과 같은 기본 코드로 `HeroService`가 생성됩니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI가 생성한 코드)">
</code-example>

`@Injectable()` 데코레이터는 이 클래스가 의존성 주입 시스템에 활용된다는 것을 Angular에게 알려주는 용도입니다.
메타데이터 중에 `providedIn: 'root'` 라는 것은 `HeroService`가 애플리케이션 전역 범위에 등록된다는 것을 의미합니다.

2. `mock.heroes.ts` 파일에서 목 데이터를 읽어서 반환하는 `getHeroes()` 메서드를 추가해 봅시다:

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>

코드를 깔끔하게 유지해서 유지보수성을 높이려면, 컴포넌트와 서비스 코드는 별도로 작성하는 것이 좋습니다.


<!--
## Injecting services
-->
## 서비스를 의존성으로 주입하기

<!--
To inject a service as a dependency into a component, you can use component's `constructor()` and supply a constructor argument with the dependency type. The following example specifies the `HeroService` in the `HeroListComponent` constructor. The type of the `heroService` is `HeroService`. Angular recognizes the `HeroService` as a dependency, since that class was previously annotated with the `@Injectable` decorator.

<code-example header="src/app/heroes/hero-list.component (constructor signature)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>
-->
서비스를 컴포넌트에 의존성으로 주입하려면 컴포넌트의 `constructor()` 인자로 의존성 객체의 타입을 지정하면 됩니다.
아래 예제는 `HeroListComponent` 생성자로 `HeroService`를 의존성으로 주입하는 예제 코드입니다.
이 때 `HeroService`는 `heroService`라는 프로퍼티로 주입됩니다.
`HeroService`는 `@Injectable` 데코레이터로 등록되었기 때문에 Angular가 타입을 보고 적절한 의존성 객체를 찾아서 컴포넌트에 주입할 수 있습니다.

<code-example header="src/app/heroes/hero-list.component (생성자 선언부)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>


<!--
## Injecting services in other services
-->
## 서비스에 다른 서비스 주입하기

<!--
When a service depends on another service, follow the same pattern as injecting into a component.
In the following example `HeroService` depends on a `Logger` service to report its activities.

First, import the `Logger` service. Next, inject the `Logger` service in the `HeroService` `constructor()` by specifying `private logger: Logger`.

Here, the `constructor()` specifies a type of `Logger` and stores the instance of `Logger` in a private field called `logger`.

The following code tabs feature the `Logger` service and two versions of `HeroService`. The first version of `HeroService` does not depend on the `Logger` service. The revised second version does depend on `Logger` service.

<code-tabs>

  <code-pane header="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

  <code-pane header="src/app/logger.service"
  path="dependency-injection/src/app/logger.service.ts">
  </code-pane>

</code-tabs>

In this example, the `getHeroes()` method uses the `Logger` service by logging a message when fetching heroes.
-->
서비스를 컴포넌트에 의존성으로 주입하듯이, 서비스에 다른 서비스를 의존성으로 주입할 수 있습니다.
`HeroService`가 `Logger` 서비스를 의존성으로 갖는다고 해봅시다.

먼저, `Logger` 서비스를 불러옵니다.
그리고 `HeroService`의 `constructor()`에 `private logger: Logger`라고 작성해서 `Logger` 서비스를 의존성으로 주입합니다.

이 때, `Logger` 서비스를 private 필드 `logger`에 할당했습니다.

아래 코드를 보면서 `Logger` 서비스를 두가지 버전으로 `HeroService`에 활용한 것을 확인해 보세요.
첫번째 버전은 `HeroService`가 `Logger` 서비스를 활용하지 않는 코드이고, 수정된 두 번째 버전은 `Logger` 서비스를 활용하도록 구성한 것입니다.

<code-tabs>

  <code-pane header="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

  <code-pane header="src/app/logger.service"
  path="dependency-injection/src/app/logger.service.ts">
  </code-pane>

</code-tabs>

이 예제 코드를 보면, `getHeroes()` 메서드는 히어로 목록을 불러와서 로그로 남기기 위해 `Logger` 서비스를 활용합니다.


<!--
## What's next
-->
## 다음 단계

<!--
* [How to configure dependencies in DI](guide/dependency-injection-providers)
* [How to use `InjectionTokens` to provide and inject values other than services/classes](guide/dependency-injection-providers#configuring-dependency-providers)
* [Dependency Injection in Action](guide/dependency-injection-in-action)
-->
* [의존성 객체를 어떻게 등록할 수 있을까](guide/dependency-injection-providers)
* [서비스나 클래스가 아닌 특정 값을 의존성으로 주입하기 위해 `InjectionTokens`를 활용하는 방법](guide/dependency-injection-providers#configuring-dependency-providers)
* [실전 의존성 주입](guide/dependency-injection-in-action)


@reviewed 2022-08-02