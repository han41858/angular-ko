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
-->

## 서비스는 어떻게 사용할 수 있나요

<!--
When you use `@Injectable({ providedIn: 'root' })` in your service, Angular:

- **Creates a single instance** (a singleton) for the entire application
- **Makes it available throughout your application** without additional configuration
- **Enables tree-shaking** so Angular only includes the service in your JavaScript bundle if you actually use it

This is the recommended approach for most services.
-->

서비스 데코레이터에 `@Injectable({ providedIn: 'root' })` 라고 사용하면 Angular는:

- 애플리케이션 전역 범위에 **인스턴스를 하나만 생성합니다.**
- **애플리케이션 전역 범위에 사용할 수 있도록 등록합니다.**
- 서비스가 실제로 사용되었을 때만 JavaScript 빌드 결과물에 포함되도록 **트리 셰이킹(tree-shaking)이 가능하도록 구성합니다.**

이 방식이 서비스를 사용하는 모범 사례입니다.

## Using the `@Service` decorator

For the common case of a singleton service available throughout your application, Angular provides the `@Service` decorator as a more ergonomic alternative to `@Injectable({providedIn: 'root'})`.

The earlier `BasicDataStore` example can be rewritten with `@Service`:

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

This behaves the same as the `@Injectable({providedIn: 'root'})` version above: Angular creates a single instance, makes it available everywhere, and tree-shakes it from the bundle if it is never injected.

### Replacing the implementation with a factory

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

### Opting out of automatic provisioning

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

### When to use `@Service` vs `@Injectable`

Reach for `@Service` when you are creating a new singleton class that uses `inject()` for its dependencies. Keep using `@Injectable` when you need any of the following:

- **Constructor-based dependency injection.** `@Service` only supports the [`inject()`](api/core/inject) function.
- **Advanced provider configuration** such as `useClass`, `useValue`, `useExisting`, or `useFactory`. `@Service` exposes a single `factory` option instead.
- **Non-root scopes** such as `providedIn: 'platform'`.


<!--
## Injecting a service
-->

## 서비스를 의존성으로 주입하기

<!--
Once you've created a service with `providedIn: 'root'`, you can inject it anywhere in your application using the `inject()` function from `@angular/core`.
-->

서비스에 `providedIn: 'root'`를 지정해서 선언하고 나면, 이 서비스는 `inject()` 함수를 사용해서 애플리케이션 전역에 주입할 수 있습니다.

<!--
### Injecting into a component
-->

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

## 다음 단계

<!--
While `providedIn: 'root'` covers most use cases, Angular also provides additional ways you can configure services for more specialized scenarios:

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
