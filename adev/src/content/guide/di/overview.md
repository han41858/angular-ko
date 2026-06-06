<docs-decorative-header title="의존성 주입" imgSrc="adev/src/assets/images/dependency_injection.svg"> <!-- markdownlint-disable-line -->

<!--
Dependency Injection (DI) is a design pattern you use to organize and share code across your application by supplying dependencies to a class instead of creating them inside it.
-->

의존성 주입(Dependency Injection, DI)은 애플리케이션 전역에서 코드를 관리하고 공유하는 디자인 패턴입니다.
</docs-decorative-header>

<!--
TIP: Check out Angular's [Essentials](essentials/dependency-injection) before diving into this comprehensive guide.

As an application grows, developers often need to reuse and share functionality across different parts of the codebase. [Dependency Injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) helps you achieve this by allowing you to provide dependencies to a class instead of creating them directly inside it. This makes different parts of the application more reusable and easier to manage.

Dependency injection is a popular pattern because it allows developers to address common challenges such as:

- **Improved code maintainability**: Dependency injection promotes a clear separation of concerns, making code easier to refactor and reducing duplication.
- **Scalability**: You can reuse modular functionality across different parts of an application, making it easier to scale.
- **Better testing**: DI allows unit tests to use [test doubles](https://en.wikipedia.org/wiki/Test_double) in place of real implementations when needed.
-->

팁: 이 문서에서 다루는 내용을 읽기 전에 Angular [핵심](essentials/dependency-injection)을 먼저 보는 것이 좋습니다.

애플리케이션이 커지면서 개발자가 코드를 재사용하거나 서로 다른 부분에서 공유해야 하는 경우가 있습니다.
[의존성 주입](https://en.wikipedia.org/wiki/Dependency_injection)이라는 것은 애플리케이션 전역에서 필요한 무언가를 "주입" 하는 방식으로 코드를 관리하고 공유하는 디자인 패턴입니다.

의존성 주입은 이런 점에서 인기있습니다:

- **코드의 유지보수성 향상**: 의존성 주입 패턴을 활용하면 관심사의 분리 원칙에 따라 코드를 분리하기 때문에 코드 중복을 방지하고 리팩토링하기 편합니다.
- **확장성**: 기능을 모듈화하면 여러 곳에서 재사용할 수 있기 때문에 확장하기 편합니다.
- **테스트 편의성**: 의존성 주입 패턴을 활용하면 실제 동작하는 구현 로직 대신 [테스트 더미](https://en.wikipedia.org/wiki/Test_double)를 활용할 수 있기 때문에 유닛 테스트하기 편합니다.


<!--
## How does dependency injection work in Angular?
-->
## Angular에서 의존성 주입이 어떻게 동작하나요?

<!--
A dependency is any object, value, function, or service that a class requires to work but does not create itself. Instead, you provide it from the outside, creating a clear relationship between different parts of the application.

You interact with a dependency injection system in two main ways:

- You can _provide_, or make available, values.
- You can _inject_, or ask for, those values as dependencies.

In this context, "values" can refer to any JavaScript value, including objects, functions, or class instances. Common types of injected dependencies include:

- **Configuration values**: Environment-specific constants, API URLs, feature flags, etc.
- **Factories**: Functions that create objects or values based on runtime conditions
- **Services**: Classes that provide common functionality, business logic, or state

Angular components and directives automatically participate in DI, meaning that you can inject dependencies into them and make them available for injection.
-->
의존성이라는 것은 클래스가 동작하는 데 필요하지만 스스로 생성하지 않는 객체, 값, 함수, 서비스를 이야기합니다.
다르게 표현하면, 의존성은 외부에서 제공되어 애플리케이션 안에서 관계를 갖고 동작합니다.

코드가 의존성 주입 시스템과 상호작용하는 방법은 두 가지 입니다:

- 어떤 값을 만들어서 사용할 수 있습니다.
- 의존성을 요청해서 _주입 받아_ 사용할 수 있습니다.

이 때 "값" 이라는 것은 JavaScript 자료 타입일 수 있으며, 객체이거나 함수, 클래스일 수도 있습니다.
보통은 이런 것들이 의존성이 됩니다:

- **설정값**: 환경변수, API URL, 기능 스위치 플래그 등
- **팩토리**: 실행환경 상태에 따라 객체나 값을 생성하는 함수
- **서비스**: 어떤 로직을 구현하거나 비즈니스 로직, 상태를 관리하는 클래스

Angular 컴포넌트와 디렉티브는 기본적으로 의존성 주입 시스템의 일부이기 때문에, 의존성 객체를 주입받을 수 있고, 의존성으로 주입될 수도 있습니다.


<!--
## What are services?
-->

## 서비스가 무엇인가요?

<!--
An Angular _service_ is a TypeScript class decorated with `@Service`, which allows you to inject an instance of the class as a dependency. Services are the most common way of sharing data and functionality across an application.

Common types of services include:

- **Data clients:** Abstracts the details of making requests to a server for data retrieval and mutation
- **State management:** Defines state shared across multiple components or pages
- **Authentication and authorization:** Manages user authentication, token storage, and access control
- **Logging and error handling:** Establishes a common API for logging or communicating error states to the user
- **Event handling and dispatch:** Handles events or notifications that are not associated with a specific component, or for dispatching events and notifications to components, following the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
- **Utility functions:** Offers reusable utility functions like data formatting, validation, or calculations

The following example declares a service named `AnalyticsLogger`:

```ts
import {Service} from '@angular/core';

@Service()
export class AnalyticsLogger {
  trackEvent(category: string, value: string) {
    console.log('Analytics event logged:', {
      category,
      value,
      timestamp: new Date().toISOString(),
    });
  }
}
```

NOTE: The `@Service` makes this service available throughout your entire application as a singleton. This is the recommended approach for most services.

HELPFUL: The [`@Service`](guide/di/creating-and-using-services#using-the-service-decorator) decorator is an ergonomic shorthand for `@Injectable({providedIn: 'root'})`.
-->
Angular에서 이야기하는 _서비스(service)_ 란 `@Service` 데코레이터가 붙은 TypeScript 클래스이며, 이 클래스를 인스턴스로 생성하면 의존성으로 주입할 수 있습니다.
서비스는 애플리케이션 전역에서 데이터와 기능을 공유하는 용도로 가장 많이 사용됩니다.

일반적으로 서비스는 이런 역할을 합니다:

- **데이터 요청:** 서버에 데이터를 요청하거나 변형하는 과정을 추상화합니다.
- **상태 관리:** 컴포넌트나 화면에서 공유하는 상태값을 선언하고 관리합니다.
- **인증, 권한 부여:** 사용자 인증을 처리하고 토큰을 보관하며 접근 권한을 관리합니다.
- **로그, 에러 처리:** 오류 상태를 로그로 출력하거나 사용자에게 알리기 위한 API를 마련합니다.
- **이벤트 처리, 전달:** 컴포넌트가 처리하지 않는 이벤트를 공통으로 처리하거나, [옵저버 패턴(observer pattern)](https://en.wikipedia.org/wiki/Observer_pattern)에 따라 컴포넌트에 이벤트를 전달합니다.
- **유틸리티 함수:** 데이터 형식 변환, 유효성 검사, 계산과 같은 재사용 유틸리티 함수를 제공합니다.

아래 코드는 `AnalyticsLogger`라는 서비스의 예제 코드입니다:

```ts
import {Service} from '@angular/core';

@Service()
export class AnalyticsLogger {
  trackEvent(category: string, value: string) {
    console.log('Analytics event logged:', {
      category,
      value,
      timestamp: new Date().toISOString(),
    });
  }
}
```

참고: `@Service` 데코레이터를 지정하면 이 서비스를 전역 범위에서 사용할 수 있도록 인스턴스를 싱글턴으로 생성합니다. 대부분의 경우 이 방식을 권장합니다.

참고: [`@Service`](guide/di/creating-and-using-services#using-the-service-decorator) 데코레이터는 `@Injectable({providedIn: 'root'})`의 축약 표현입니다.

<!--
## Injecting dependencies with `inject()`
-->

## `inject()`로 의존성 주입하기

<!--
You can inject dependencies using Angular's `inject()` function.

Here is an example of a navigation bar that injects `AnalyticsLogger` and Angular `Router` service to allow users to navigate to a different page while tracking the event.

```angular-ts
import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsLogger} from './analytics-logger';

@Component({
  selector: 'app-navbar',
  template: `<a href="#" (click)="navigateToDetail($event)">Detail Page</a>`,
})
export class Navbar {
  private router = inject(Router);
  private analytics = inject(AnalyticsLogger);

  navigateToDetail(event: Event) {
    event.preventDefault();
    this.analytics.trackEvent('navigation', '/details');
    this.router.navigate(['/details']);
  }
}
```
-->

의존성 객체는 Angular가 제공하는 `inject()` 함수로 주입할 수 있습니다.

아래 코드는 `AnalyticsLogger`와 Angular `Router`를 의존성 객체로 주입받아서 이벤트에 따라 화면을 전환하는 네비게이션 바 컴포넌트의 예제 코드입니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsLogger} from './analytics-logger';

@Component({
  selector: 'app-navbar',
  template: `<a href="#" (click)="navigateToDetail($event)">Detail Page</a>`,
})
export class Navbar {
  private router = inject(Router);
  private analytics = inject(AnalyticsLogger);

  navigateToDetail(event: Event) {
    event.preventDefault();
    this.analytics.trackEvent('navigation', '/details');
    this.router.navigate(['/details']);
  }
}
```

<!--
### Where can `inject()` be used?
-->

### `inject()`는 어디에 사용할 수 있나요?

<!--
You can inject dependencies during construction of a component, directive, or service. The call to [`inject`](/api/core/inject) can appear in either the `constructor` or in a field initializer. Here are some common examples:

```ts
@Component({
  /*...*/
})
export class MyComponent {
  // ✅ In class field initializer
  private service = inject(MyService);

  // ✅ In constructor body
  private anotherService: MyService;

  constructor() {
    this.anotherService = inject(MyService);
  }
}
```

```ts
@Directive({...})
export class MyDirective {
  // ✅ In class field initializer
  private element = inject(ElementRef);
}
```

```ts
import {Service, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Service()
export class MyService {
  // ✅ In a service
  private http = inject(HttpClient);
}
```

```ts
export const authGuard = () => {
  // ✅ In a route guard
  const auth = inject(AuthService);
  return auth.isAuthenticated();
};
```

Angular uses the term "injection context" to describe any place in your code where you can call [`inject`](/api/core/inject). While component, directive, and service construction is the most common, see [injection contexts](/guide/di/dependency-injection-context) for more details.

For more information, see the [inject API docs](api/core/inject#usage-notes).
-->

의존성 객체는 컴포넌트, 디렉티브, 서비스를 생성할 때 주입할 수 있습니다.
[`inject`](/api/core/inject) 함수를 직접 사용하거나 `constructor()` 함수에서 프로퍼티로 선언하면 됩니다:

```ts
@Component({
  /*...*/
})
export class MyComponent {
  // ✅ 클래스 필드 초기화로 주입
  private service = inject(MyService);

  // ✅ 생성자에서 주입
  private anotherService: MyService;

  constructor() {
    this.anotherService = inject(MyService);
  }
}
```

```ts
@Directive({...})
export class MyDirective {
  // ✅ 클래스 필드 초기화로 주입
  private element = inject(ElementRef);
}
```

```ts
import {Service, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Service()
export class MyService {
  // ✅ 서비스에서 주입
  private http = inject(HttpClient);
}
```

```ts
export const authGuard = () => {
  // ✅ 라우팅 규칙 가드에서 주입
  const auth = inject(AuthService);
  return auth.isAuthenticated();
};
```

`inject`를 사용할 수 있는 코드 범위를 "의존성 주입 컨텍스트(injection context)"라고 합니다.
일반적으로는 컴포넌트, 디렉티브, 서비스의 생성자가 [의존성 주입 컨텍스트](/guide/di/dependency-injection-context) 입니다.

자세한 내용은 [inject API 문서](api/core/inject#usage-notes)를 참고하세요.

<!--
## Next steps
-->

## 다음 단계

<!--
Now that you understand the fundamentals of dependency injection in Angular, you're ready to learn how to create your own services.

The next guide, [Creating and using services](guide/di/creating-and-using-services), will show you:

- How to create a service with the Angular CLI or manually
- How the `providedIn: 'root'` pattern works
- How to inject services into components and other services

This covers the most common use case for services in Angular applications.
-->

이제 Angular의 의존성 주입의 기본을 학습했습니다.
서비스를 직접 만들어 보세요.

다음 가이드 문서에서는 [서비스를 생성](guide/di/creating-and-using-services)하고 이런 내용을 다룹니다:

- Angular CLI나 수동으로 서비스를 생성하는 방
- `providedIn: 'root'` 패턴이 동작하는 방식
- 서비스를 컴포넌트나 다른 서비스로 의존성 주입하는 방법

Angular 애플리케이션에서 서비스를 사용하는 방법 중 가장 기본을 알아봅시다.
