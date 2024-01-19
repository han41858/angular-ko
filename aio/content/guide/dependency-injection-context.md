<!--
# Injection context
-->
# 의존성 주입 컨텍스트

<!--
The dependency injection (DI) system relies internally on a runtime context where the current injector is available. 
This means that injectors can only work when code is executed in this context. 

The injection context is available in these situations: 

* Construction (via the `constructor`) of a class being instantiated by the DI system, such as an `@Injectable` or `@Component`.
* In the initializer for fields of such classes.
* In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
* In the `factory` function specified for an `InjectionToken`.
* Within a stack frame that is run in an injection context.

Knowing when your are in an injection context, will allow you to use the [`inject`](api/core/inject) function to inject instances.
-->
의존성 주입(Dependency injection, DI) 시스템에서는 현재 인젝터에 구성된 컨텍스트를 기반으로 동작합니다.
이 말은, 인젝터는 해당 컨텍스트 안에 있는 것만 실행할 수 있다는 것을 의미합니다.

이 컨텍스트는 이런 경우에 사용합니다: 

* DI 시스템이 `@Injectable`이나 `@Component`를 만나서 클래스의 인스턴스를 생성할 때 생성자 안에서
* 클래스에서 필드를 초기화할 때
* 프로바이더에 `useFactory`를 사용했거나 `@Injectable`에 팩토리 함수를 사용했을 때
* `InjectionToken`에 `factory` 함수를 지정했을 때
* 의존성 컨텍스트 안에서 코드가 실행될 때

현재 작업중인 코드가 인젝션 컨텍스트 안쪽인지 확인하려면 [`inject`](api/core/inject) 함수를 사용해서 인스턴스를 참조해 보면 됩니다.


<!--
## Class constructors
-->
## 클래스 생성자

<!--
Everytime the DI system instantiates a class, this is done in an injection context. This is being handled by the framework itself. The constructor of the class is executed in that runtime context thus allowing to inject a token using the [`inject`](api/core/inject) function. 

<code-example language="typescript">
class MyComponent  {
  private service1: Service1;
  private service2: Service2 = inject(Service2); // In context

  constructor() {
    this.service1 = inject(HeroService) // In context
  }
}
</code-example>
-->
DI 시스템이 클래스의 인스턴스를 생성하는 것은 언제나 프레임워크가 인젝션 컨텍스트 안쪽에서 처리합니다.
그래서 실행시점의 컨텍스트에서는 [`inject`](api/core/inject) 함수를 사용해서 인젝션 토큰을 참조할 수 있습니다. 

<code-example language="typescript">
class MyComponent  {
  private service1: Service1;
  private service2: Service2 = inject(Service2); // 컨텍스트 안쪽

  constructor() {
    this.service1 = inject(HeroService) // 컨텍스트 안쪽
  }
}
</code-example>


<!--
## Stack frame in context
-->
## 컨텍스트 안쪽의 스택

<!--
Some APIs are designed to be run in an injection context. This is the case, for example, of the router guards. It allows the use of [`inject`](api/core/inject) to access a service within the guard function. 

Here is an example for `CanActivateFn`
<code-example format="typescript" language="typescript">
const canActivateTeam: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
    };
</code-example>
-->
API 중에는 인젝션 컨텍스트 안에서 실행되도록 설계된 것들이 있습니다.
라우터 가드가 그 중 하나입니다.
가드 함수 안에서는 [`inject`](api/core/inject) 함수를 사용해서 서비스의 인스턴스를 참조할 수 있습니다. 

`CanActivateFn` 예제 코드를 살펴보세요.

<code-example format="typescript" language="typescript">
const canActivateTeam: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
    };
</code-example>


<!--
## Run within an injection context
-->
## 인젝션 컨텍스트 안쪽에서 실행되는 코드

<!--
When you want to run a given function in an injection context without being in one, you can do it with `runInInjectionContext`. 
This requires to have access to a given injector like the `EnvironmentInjector` for example.  

<code-example path="dependency-injection/src/app/heroes/hero.service.5.ts" region="run-in-context" header="src/app/heroes/hero.service.ts">
</code-example>

Note that `inject` will return an instance only if the injector can resolve the required token. 
-->
인젝션 컨텍스트 안에서 실행해야 하는 코드가 있다면 `runInInjectionContext()`를 사용하면 됩니다.
이 함수를 사용하려면 인젝터를 지정해야 하는데, `EnvironmentInjector`와 같은 인젝터가 필요하다면 다음과 같이 참조하면 됩니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.5.ts" region="run-in-context" header="src/app/heroes/hero.service.ts">
</code-example>

`inject`는 지정된 인젝터를 찾을 수 있는 경우에만 인스턴스를 반환하는 것에 주의하세요. 


<!--
## Asserts the context
-->
## 인젝션 컨텍스트 감지/경고하기

<!--
Angular provides `assertInInjectionContext` helper function to assert that the current context is an injection context.
-->
어떤 코드가 인젝션 컨텍스트에서 실행되는 것을 사전에 감지해서 막으려면 `assetInInjectionContext` 헬퍼 함수를 사용하면 됩니다.

<!--
## Using DI outside of a context
-->
## 컨텍스트 밖에서 DI 사용하기

<!--
Calling [`inject`](api/core/inject) or calling `assertInInjectionContext` outside of an injection context will throw [error NG0203](/errors/NG0203).
-->
인젝션 컨텍스트 밖에서 [`inject`](api/core/inject) 함수를 실행하거나 `assertInInjectionContext`를 실행하면 [error NG0203](/errors/NG0203)가 발생합니다.



@reviewed 2023-04-11
