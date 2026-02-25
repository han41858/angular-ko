<!--
# Injection context
-->

# 의존성 주입 컨텍스트

<!--
The dependency injection (DI) system relies internally on a runtime context where the current injector is available.

This means that injectors can only work when code is executed in such a context.

The injection context is available in these situations:

- During construction (via the `constructor`) of a class being instantiated by the DI system, such as an `@Injectable` or `@Component`.
- In the initializer for fields of such classes.
- In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
- In the `factory` function specified for an `InjectionToken`.
- Within a stack frame that runs in an injection context.

Knowing when you are in an injection context will allow you to use the [`inject`](api/core/inject) function to inject instances.

NOTE: For basic examples of using `inject()` in class constructors and field initializers, see the [overview guide](/guide/di#where-can-inject-be-used).
-->

의존성 주입 시스템은 현재 인젝터(injector)가 접근 가능한 범위의 실행 컨텍스트를 구성합니다.

이 말은, 이 컨텍스트 안에서만 인젝터를 사용할 수 있다는 것을 의미합니다.

의존성 주입 컨텍스트는 이런 상황에 사용할 수 있습니다:

- `@Injectable`이나 `@Component` 데코레이터가 지정된 클래스가 생성되는 `constructor()` 생성자 안에서
- 클래스 필드를 선언할 때
- `Provider`나 `@Injectable`을 `useFactory`로 등록하는 경우 팩토리 함수 안에서
- `InjectionToken`에 연결하는 `factory` 함수 안에서
- 의존성 주입 컨텍스트가 실행되는 스택 프레임 안에서

현재 작업하는 컨텍스트가 의존성 주입이 가능한 컨텍스트라면, [`inject`](api/core/inject) 함수를 사용해서 의존성 객체의 인스턴스를 요청할 수 있습니다.

참고: 클래스 생성자나 필드를 초기화할 때 `inject()`를 사용하는 기본 방법을 알아보려면 [개요](/guide/di#where-can-inject-be-used) 문서를 참고하세요.

<!--
## Stack frame in context
-->

## 컨텍스트 안의 스택 프레임

<!--
Some APIs are designed to be run in an injection context. This is the case, for example, with router guards. This allows the use of [`inject`](api/core/inject) within the guard function to access a service.

Here is an example for `CanActivateFn`

```ts {highlight: [3]}
const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
  };
```
-->

일부 API는 인젝션 컨텍스트 안에서 실행되도록 설계된 것들이 있습니다.
예를 들면 라우터 가드가 그렇습니다.
가드 함수 안에서는 [`inject`](api/core/inject) 함수를 사용해서 원하는 서비스에 접근할 수 있습니다.

`CanActivateFn` 예시를 들어보면 이렇습니다.

```ts {highlight: [3]}
const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
  };
```

<!--
## Run within an injection context
-->

## 인젝션 컨텍스트 안에서 실행하기

<!--
When you want to run a given function in an injection context without already being in one, you can do so with `runInInjectionContext`.
This requires access to a given injector, like the `EnvironmentInjector`, for example:

```ts {highlight: [9], header"hero.service.ts"}
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      inject(SomeService); // Do what you need with the injected service
    });
  }
}
```

Note that `inject` will return an instance only if the injector can resolve the required token.
-->

의존성 주입 컨텍스트가 아닌 함수 안에서 의존성과 관련된 함수를 실행하려면 `runInInjectionContext`를 사용하면 됩니다.
이 방식을 사용하려면 `EnvironmentInjector`와 같은 특수 인젝터를 사용해야 합니다:

```ts {highlight: [9], header"hero.service.ts"}
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      inject(SomeService); // 주입받은 서비스로 원하는 로직을 작성합니다.
    });
  }
}
```

참고로 `inject` 함수는 요청한 토큰을 찾을 수 있을 때만 해당 토큰의 인스턴스를 반환합니다.

<!--
## Asserts the context
-->

## 컨텍스트 보장하기

<!--
Angular provides the `assertInInjectionContext` helper function to assert that the current context is an injection context and throws a clear error if not. Pass a reference to the calling function so the error message points to the correct API entry point. This produces a clearer, more actionable message than the default generic injection error.

```ts
import { ElementRef, assertInInjectionContext, inject } from '@angular/core';

export function injectNativeElement<T extends Element>(): T {
    assertInInjectionContext(injectNativeElement);
    return inject(ElementRef).nativeElement;
}
```

You can then call this helper **from an injection context** (constructor, field initializer, provider factory, or code executed via `runInInjectionContext`):

```ts
import { Component, inject } from '@angular/core';
import { injectNativeElement } from './dom-helpers';

@Component({ /* … */ })
export class PreviewCard {
  readonly hostEl = injectNativeElement<HTMLElement>(); // Field initializer runs in an injection context.

  onAction() {
    const anotherRef = injectNativeElement<HTMLElement>(); // Fails: runs outside an injection context.
  }
}
```
-->

Angular는 `assertInInjectionContext` 라는 헬퍼 함수를 제공하는데, 이 함수는 현재 컨텍스트가 의존성 주입 컨텍스트라면 아무 문제가 없지만, 의존성 주입 컨텍스트가 아니라면 에러를 발생시킵니다.
그리고 이 함수를 실행하면서 올바른 API 진입점을 인자로 전달할 수 있습니다.
이 방식을 사용하면 일반적인 인젝션 오류가 아니라 좀 더 명확하고 개선할 수 있는 메시지가 표시됩니다.

```ts
import { ElementRef, assertInInjectionContext, inject } from '@angular/core';

export function injectNativeElement<T extends Element>(): T {
    assertInInjectionContext(injectNativeElement);
    return inject(ElementRef).nativeElement;
}
```

클래스의 생성자, 필드 초기화, 프로바이더 팩토리 등 **의존성 주입 컨텍스트 안에서** 이 헬퍼 함수를 호출하면 이렇습니다:

```ts
import { Component, inject } from '@angular/core';
import { injectNativeElement } from './dom-helpers';

@Component({ /* … */ })
export class PreviewCard {
  readonly hostEl = injectNativeElement<HTMLElement>(); // 필드를 초기화할 때 의존성 주입 컨텍스트를 실행합니다.

  onAction() {
    const anotherRef = injectNativeElement<HTMLElement>(); // 에러: 인젝션 컨텍스트가 아닙니다.
  }
}
```

<!--
## Using DI outside of a context
-->

## 의존성 주입 컨텍스트 밖에서 의존성 주입 사용하기

<!--
Calling [`inject`](api/core/inject) or calling `assertInInjectionContext` outside of an injection context will throw [error NG0203](/errors/NG0203).
-->

의존성 주입 컨텍스트가 아닌 곳에서 [`inject`](api/core/inject) 함수를 실행하거나 `assertInInjectionContext`를 실행하면 [NG0203 에러](/errors/NG0203)가 발생합니다.
