<!--
# Creating and using services
-->

# 서비스 생성하기, 활용하기

<!--
Services are reusable pieces of code that you can share across your Angular application. You commonly use them to handle data fetching, business logic, or other functionality that multiple components need to access.
-->

서비스는 애플리케이션 전역에서 코드를 공유하고 재사용할 수 있는 코드 묶음입니다.
서비스에는 일반적으로 데이터를 서버에서 받아오거나, 비즈니스 로직을 제공하는 등 다양한 컴포넌트에 필요한 기능을 구현합니다.

<!--
## Creating a service
-->

<a id="creating-a-service"></a>

## 서비스 생성하기

<!--
You can create a service using the [Angular CLI](tools/cli) with the following command:

```bash
ng generate service CUSTOM_NAME
```

This command creates a dedicated `CUSTOM_NAME.ts` file in your `src` directory.

You can also manually create a service by adding the `@Service()` decorator to a TypeScript class. This tells Angular that you can use the class as an injectable dependency.

The following example defines a service that allows users to add and retrieve data:

```ts {header: "src/app/basic-data-store.ts"}
import {Service} from '@angular/core';

@Service()
export class BasicDataStore {
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data];
  }
}
```
-->

서비스는 [Angular CLI](tools/cli) 명령을 실행하면 생성할 수 있습니다:

```bash
ng generate service CUSTOM_NAME
```

이 명령을 실행하면 `src` 디렉토리에 `CUSTOM_NAME.ts` 라는 파일이 생성됩니다.

서비스는 일반 TypeScript 클래스에 `@Service()` 데코레이터를 붙여서 직접 선언할 수도 있습니다.
이 데코레이터는 데코레이터가 붙은 클래스는 Angular가 의존성 객체로 취급할 수 있다는 것을 알리는 역할을 합니다.

사용자가 데이터를 추가하고 조회하는 예제 서비스라면 이렇게 구현합니다:

```ts {header: "src/app/basic-data-store.ts"}
import {Service} from '@angular/core';

@Service()
export class BasicDataStore {
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data];
  }
}
```

<!--
## How services become available

Services are provisioned at the root level by default. When a service is provided globally, Angular guarantees three main benefits:

- **Singleton Instance:** Creates a single, shared instance for the entire application.
- **Global Availability:** Automatically accessible anywhere without manual provider registration.
- **Tree-shakability:** Ensures the service is excluded from the final production bundle if your code never explicitly uses it.

### Using the `@Service` vs `@Injectable` decorator

The `@Service` decorator serves as a modern, ergonomic shorthand for the traditional `@Injectable({ providedIn: 'root' })` syntax.

Use this quick reference to decide which decorator fits your scenario:

| Feature / Requirement                         | `@Service` | `@Injectable`                           |
| --------------------------------------------- | ---------- | --------------------------------------- |
| **`inject()` function support**               | Yes        | Yes                                     |
| **Constructor-based DI**                      | ❌ No      | Yes                                     |
| **Implicit root singleton provider**          | Yes        | ❌ No (requires `{providedIn: 'root'}`) |
| **Advanced provider keys (`useClass`, etc.)** | ❌ No      | Yes                                     |
| **Custom initialization factories**           | Yes        | Yes                                     |
| **Non-root scopes (`platform`, etc.)**        | ❌ No      | Yes                                     |
-->

## 서비스는 어떻게 사용할 수 있나요 {#how-services-become-available}

서비스는 기본적으로 최상위 계층에 제공됩니다. 서비스를 전역으로 제공하면 Angular가 다음 세 가지 이점을 보장합니다.

- **싱글턴 인스턴스:** 애플리케이션 전체에서 공유하는 인스턴스를 하나만 생성합니다.
- **전역 사용:** 프로바이더를 수동으로 등록하지 않아도 어디서든 사용할 수 있습니다.
- **트리 셰이킹:** 코드에서 서비스를 명시적으로 사용하지 않으면 최종 프로덕션 빌드 결과물에서 제외합니다.

<a id="using-the-service-decorator"></a>

### `@Service`와 `@Injectable` 데코레이터 선택하기 {#using-the-service-vs-injectable-decorator}

`@Service` 데코레이터는 기존의 `@Injectable({ providedIn: 'root' })` 문법을 더 간편하게 작성하는 현대적인 단축 문법입니다.

다음 표를 참고해서 상황에 맞는 데코레이터를 선택하세요.

| 기능 / 요구사항                       | `@Service`       | `@Injectable`                                  |
| ------------------------------------- | ---------------- | ---------------------------------------------- |
| **`inject()` 함수 지원**              | 지원             | 지원                                           |
| **생성자 기반 DI**                    | ❌ 지원하지 않음 | 지원                                           |
| **암묵적인 최상위 싱글턴 프로바이더** | 지원             | ❌ 지원하지 않음 (`{providedIn: 'root'}` 필요) |
| **고급 프로바이더 키(`useClass` 등)** | ❌ 지원하지 않음 | 지원                                           |
| **커스텀 초기화 팩토리**              | 지원             | 지원                                           |
| **최상위 이외의 범위(`platform` 등)** | ❌ 지원하지 않음 | 지원                                           |

<!--
### Replacing the implementation with a factory
-->

<a id="replacing-the-implementation-with-a-factory"></a>

## 구현부를 팩토리로 사용하기

<!--
If you need to control how the singleton is created, for example, to swap in a different implementation depending on the environment, pass a `factory` function.

The factory runs in an [injection context](guide/di/dependency-injection-context), so you can use [`inject()`](api/core/inject) inside it to read other dependencies.

The following `Analytics` service is a no-op locally so events don't pollute the console during development. In production, the factory reads an `ANALYTICS_ENABLED` token and returns a `GoogleAnalytics` subclass that forwards events to the real tracker:

```ts {header: "src/app/analytics.ts"}
import {inject, InjectionToken, Service} from '@angular/core';
import {ANALYTICS_ENABLED} from './token';

@Service({
  factory: () => (inject(ANALYTICS_ENABLED) ? new GoogleAnalytics() : new Analytics()),
})
export class Analytics {
  track(event: string, payload?: Record<string, unknown>) {
    // No-op by default.
  }
}

class GoogleAnalytics extends Analytics {
  override track(event: string, payload?: Record<string, unknown>) {
    // Dispatches an analytics event to Google Analytics
  }
}
```

NOTE: The `factory` option replaces the `useClass`, `useValue`, `useExisting`, and `useFactory` options of `@Injectable`. If you need any of those, keep using `@Injectable`.
-->

환경변수에 따라 구현을 다르게 하는 등 싱글턴 인스턴스의 생성방식을 제어해야 하는 경우에는 `factory` 함수를 사용합니다.

`factory` 함수는 [의존성 주입 컨텍스트](guide/di/dependency-injection-context) 안에서 실행되기 때문에, [`inject()`](api/core/inject)를 사용해서 다른 의존성 객체를 받을 수도 있습니다.

아래 `Analytics` 서비스 코드는 로컬 환경에서는 아무 동작도 하지 않습니다.
그리고 운영환경에서는 팩토리 함수가 `ANALYTICS_ENABLED` 토큰 값을 읽어서 `GoogleAnalytics` 클래스를 활용해서 실제 동작을 수행합니다:

```ts {header: "src/app/analytics.ts"}
import {inject, InjectionToken, Service} from '@angular/core';
import {ANALYTICS_ENABLED} from './token';

@Service({
  factory: () => (inject(ANALYTICS_ENABLED) ? new GoogleAnalytics() : new Analytics()),
})
export class Analytics {
  track(event: string, payload?: Record<string, unknown>) {
    // 아무 동작도 하지 않습니다.
  }
}

class GoogleAnalytics extends Analytics {
  override track(event: string, payload?: Record<string, unknown>) {
    // Google Analytics에 이벤트를 보냅니다.
  }
}
```

참고: `factory` 함수는 `@Injectable`에 사용했던 `useClass`, `useValue`, `useExisting`, `useFactory`를 대체하는 옵션입니다. 이전 방식을 사용하려면 `@Injectable` 데코레이터를 사용하세요.

<!--
### Opting out of automatic provisioning
-->

<a id="opting-out-of-automatic-provisioning"></a>

### 자동 프로비저닝 비활성화하기

<!--
By default, `@Service` provides the class at the root injector. If you want to provide it manually, for example, to scope it to a specific route or component, set `autoProvided: false`:

```ts {header: "src/app/analytics-logger.ts"}
import {Service} from '@angular/core';

@Service({autoProvided: false})
export class AnalyticsLogger {
  trackEvent(name: string) {
    console.log('event:', name);
  }
}
```

You are then responsible for adding the service to a `providers` array, just like with a plain `@Injectable()`:
-->

`@Service` 데코레이터를 지정한 클래스는 최상위 인젝터에 등록됩니다.
그런데 이 클래스를 특정 라우팅 규칙이나 특정 컴포넌트 안에서만 사용하도록 수동으로 등록하고 싶다면 `autoProvided: false`를 사용하면 됩니다:

```ts {header: "src/app/analytics-logger.ts"}
import {Service} from '@angular/core';

@Service({autoProvided: false})
export class AnalyticsLogger {
  trackEvent(name: string) {
    console.log('event:', name);
  }
}
```

이렇게 구현하면 `@Injectable()`에 했던 것처럼 `providers` 배열에 서비스를 직접 등록해야 합니다.

<!--
### When to use `@Service` vs `@Injectable`
-->

<a id="when-to-use-service-vs-injectable"></a>

### `@Service` vs. `@Injectable`

<!--
Reach for `@Service` when you are creating a new singleton class that uses `inject()` for its dependencies. Keep using `@Injectable` when you need any of the following:

- **Constructor-based dependency injection.** `@Service` only supports the [`inject()`](api/core/inject) function.
- **Advanced provider configuration** such as `useClass`, `useValue`, `useExisting`, or `useFactory`. `@Service` exposes a single `factory` option instead.
- **Non-root scopes** such as `providedIn: 'platform'`.
-->

일반적으로 싱글턴으로 사용하는 클래스에는 `@Service`를 사용하세요.
`inject()`를 사용해서 추가 의존성 객체를 주입할 수도 있습니다.
그리고 다음 경우라면 `@Injectable` 사용을 유지하는 것을 권장합니다:

- **생성자로 의존성을 주입하는 경우** - `@Service` 데코레이터는 [`inject()`](api/core/inject) 함수만 지원합니다.
- **프로바이더를 복잡하게 구성하는 경우** - `useClass`, `useValue`, `useExisting`, `useFactory` 를 사용하는 경우에는 `@Injectable`을 사용하세요. `@Service` 데코레이터와 `factory` 함수로 대체할 수 있습니다.
- **최상위 스코프가 아닌 경우** - `providedIn: 'platform'`에 등록하는 경우

<!--
## Injecting a service
-->

<a id="injecting-a-service"></a>

## 서비스를 의존성으로 주입하기

<!--
Once you've created a service with `providedIn: 'root'`, you can inject it anywhere in your application using the `inject()` function from `@angular/core`.
-->

서비스에 `providedIn: 'root'`를 지정해서 선언하고 나면, 이 서비스는 `inject()` 함수를 사용해서 애플리케이션 전역에 주입할 수 있습니다.

<!--
### Injecting into a component
-->

<a id="injecting-into-a-component"></a>

### 컴포넌트에 주입하기

```angular-ts
import {Component, inject} from '@angular/core';
import {BasicDataStore} from './basic-data-store';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <p>{{ dataStore.getData() }}</p>
      <button (click)="dataStore.addData('More data')">Add more data</button>
    </div>
  `,
})
export class Example {
  dataStore = inject(BasicDataStore);
}
```

<!--
### Injecting into another service
-->

<a id="injecting-into-another-service"></a>

### 다른 서비스에 주입하기

```ts
import {inject, Service} from '@angular/core';
import {AdvancedDataStore} from './advanced-data-store';

@Service()
export class BasicDataStore {
  private advancedDataStore = inject(AdvancedDataStore);
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data, ...this.advancedDataStore.getData()];
  }
}
```

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
While `providedIn: 'root'` covers most use cases, Angular offers additional ways to provide services for specialized scenarios:

- **Component-specific instances** - When components need their own isolated service instances
- **Manual configuration** - For services that require runtime configuration
- **Factory providers** - For dynamic service creation based on runtime conditions
- **Value providers** - For providing configuration objects or constants

You can learn more about these advanced patterns in the next guide: [defining dependency providers](/guide/di/defining-dependency-providers).
-->

`providedIn: 'root'`는 대부분의 경우에 유효하지만, 다음과 같은 경우에는 설정을 다르게 하기도 합니다:

- **컴포넌트별 인스턴스** - 컴포넌트마다 서비스의 개별 인스턴스를 사용하는 경우
- **수동으로 설정하는 경우** - 실행환경 구성이 필요한 경우
- **팩토리 프로바이더** - 실행환경에 따라 서비스를 동적으로 생성하는 경우
- **값 프로바이더** - 환경설정 객체나 상수를 제공하는 경우

이런 경우 어떻게 활용하는지 알아보려면 다음 문서인 [의존성 주입 프로바이더 정의하기](/guide/di/defining-dependency-providers) 문서를 참고하세요.
