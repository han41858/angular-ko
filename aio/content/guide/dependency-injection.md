<!--
# Dependency injection in Angular
-->
# Angular의 의존성 주입

<!--
Dependencies are services or objects that a class needs to perform its function.
Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.

Angular's DI framework provides dependencies to a class upon instantiation.
You can use Angular DI to increase flexibility and modularity in your applications.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
의존성 객체(dependencies)는 클래스가 동작하기 위해 필요한 서비스나 객체를 의미합니다.
그리고 의존성 주입(Dependency injection, DI)은 클래스가 의존성 객체를 외부에 요청하고 외부에서 이 객체의 인스턴스를 생성해서 주입하는 디자인 패턴을 의미합니다.

Angular의 의존성 주입 프레임워크는 클래스 단위로 의존성 객체를 생성합니다.
Angular 의존성 주입 시스템을 활용하면 애플리케이션을 유연하게 구성할 수 있으며 확장성을 높일 수 있습니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Creating an injectable service
-->
## 의존성으로 주입할 수 있는 서비스 생성하기

<!--
To generate a new `HeroService` class in the `src/app/heroes` folder use the following [Angular CLI](cli) command.

<code-example language="sh">
ng generate service heroes/hero
</code-example>

This command creates the following default `HeroService`.

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI-generated)">
</code-example>

The `@Injectable()` decorator specifies that Angular can use this class in the DI system.
The metadata, `providedIn: 'root'`, means that the `HeroService` is visible throughout the application.

Next, to get the hero mock data, add a `getHeroes()` method that returns the heroes from `mock.heroes.ts`.

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>

For clarity and maintainability, it is recommended that you define components and services in separate files.

If you do combine a component and service in the same file, it is important to define the service first, and then the component.
If you define the component before the service, Angular returns a run-time null reference error.
-->
`src/app/heroes` 폴더에 `HeroService`를 생성하려면 [Angular CLI](cli) 명령을 이렇게 실행하면 됩니다:

<code-example language="sh">
ng generate service heroes/hero
</code-example>

그러면 아래와 같은 기본 `HeroService` 클래스가 생성됩니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI가 생성한 서비스)">
</code-example>

`@Injectable()` 데코레이터는 Angular가 이 클래스를 DI 시스템에 활용하겠다는 것을 의미하는 데코레이터입니다.
이 데코레이터의 메타데이터에는 `providedIn: 'root'`를 지정했기 때문에 `HeroService`가 애플리케이션 전역에서 활용할 수 있습니다.

이제 히어로의 목 데이터를 가져오기 위해 `getHeroes()` 메서드를 추가하고 `mock.heroes.ts` 파일의 내용을 반환해 봅시다:

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>

코드를 간결하게 작성해서 유지보수성을 높이기 위해 컴포넌트와 서비스는 별도 파일로 분리해서 작성하는 것을 권장합니다.

의도적으로 컴포넌트와 서비스를 한 파일에 작성하는 상황이라면, 서비스를 먼저 정의하고 컴포넌트를 정의해야 합니다.
컴포넌트를 서비스보다 먼저 정의하면 실행 시점에 null 참조 에러가 발생합니다.


{@a injector-config}
{@a bootstrap}

<!--
## Injecting services
-->
## 서비스 주입하기

<!--
Injecting services results in making them visible to a component.

To inject a dependency in a component's `constructor()`, supply a constructor argument with the dependency type.
The following example specifies the `HeroService` in the `HeroListComponent` constructor.
The type of `heroService` is `HeroService`.

<code-example header="src/app/heroes/hero-list.component (constructor signature)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>


For more information, see [Providing dependencies in modules](guide/providers) and [Hierarchical injectors](guide/hierarchical-dependency-injection).
-->
서비스를 컴포넌트에 의존성으로 주입하면 컴포넌트에서 이 서비스를 활용할 수 있습니다.

서비스를 컴포넌트에 주입하려면 컴포넌트의 `constructor()`에 의존성 객체의 타입을 지정하면 됩니다.
아래 코드는 `HeroListComponent`의 생성자로 `HeroService`를 주입하는 예제 코드입니다.
`heroService`의 타입은 `HeroService` 입니다.

<code-example header="src/app/heroes/hero-list.component (생성자)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>

관련 내용을 확인하려면 [모듈 안에서 의존성 객체 제공하기](guide/providers) 문서와 [인젝터 계층](guide/hierarchical-dependency-injection) 문서를 참고하세요.


{@a service-needs-service}

<!--
## Using services in other services
-->
## 서비스에서 다른 서비스 활용하기

<!--
When a service depends on another service, follow the same pattern as injecting into a component.
In the following example `HeroService` depends on a `Logger` service to report its activities.

First, import the `Logger` service.
Next, inject the `Logger` service in the `HeroService` `constructor()` by specifying `private logger: Logger` within the parentheses.

When you create a class whose `constructor()` has parameters, specify the type and metadata about those parameters so that Angular can inject the correct service.

Here, the `constructor()` specifies a type of `Logger` and stores the instance of `Logger` in a private field called `logger`.


The following code tabs feature the `Logger` service and two versions of `HeroService`.
The first version of `HeroService` does not depend on the `Logger` service.
The revised second version does depend on `Logger` service.

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
어떤 서비스가 다른 서비스를 활용하는 경우에도 컴포넌트에 사용했던 패턴을 그대로 사용하면 됩니다.
`HeroService`가 `Logger` 서비스를 활용해야 한다고 합시다.

그러면 먼저 `HeroService`에 `Logger` 서비스를 로드합니다.
그리고 `HeroService`의 `constructor()`에 `private logger: Logger`라고 작성해서 `Logger` 서비스를 의존성으로 주입하면 됩니다.

`constructor()`에 의존성을 주입할 때는 원하는 의존성 객체의 타입을 정확하게 지정해야 Angular가 해당 객체를 주입할 수 있습니다.

이렇게 작성하면 `Logger` 서비스의 인스턴스가 프라이빗 필드 `logger`로 할당됩니다.

아래 코드 탭을 보면 `HeroService`를 두가지 방법으로 구현한 코드를 확인할 수 있습니다.
첫 번째 `HeroService`는 `Logger` 서비스를 활용하지 않는 코드입니다.
그리고 두 번째 `HeroService`는 `Logger` 서비스를 의존성으로 주입받는 코드입니다.

<code-tabs>

  <code-pane header="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

  <code-pane header="src/app/logger.service"
  path="dependency-injection/src/app/logger.service.ts">
  </code-pane>

</code-tabs>

이 예제에서는 히어로 목록을 가져온다는 것을 로그로 남기기 위해 `getHeroes()` 메서드가 `Logger` 서비스를 활용했습니다.


<!--
## What's next
-->
## 다음 단계

<!--
* [Dependency providers](guide/dependency-injection-providers)
* [DI tokens and providers](guide/dependency-injection-providers)
* [Dependency Injection in Action](guide/dependency-injection-in-action)
-->
* [의존성 프로바이더](guide/dependency-injection-providers)
* [실전 의존성 주입](guide/dependency-injection-in-action)