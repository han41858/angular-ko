<!--
# Debugging and troubleshooting dependency injection
-->

# 의존성 주입 디버깅, 문제 해결

<!--
Dependency injection (DI) issues typically stem from configuration mistakes, scope problems, or incorrect usage patterns. This guide helps you identify and resolve common DI problems that developers encounter.
-->

의존성 주입 문제는 일반적으로 설정을 잘못하거나 스코프 문제, 잘못된 사용 패턴 때문일 수 있습니다.
이 문서는 의존성 주입 문제를 어떻게 확인하고 해결할 수 있는지 안내합니다.

<!--
## Common pitfalls and solutions
-->

## 흔히 발생하는 문제와 해결방법

<!--
### Services not available where expected
-->

### 서비스에 접근할 수 없음

<!--
One of the most common DI issues occurs when you try to inject a service but Angular cannot find it in the current injector or any parent injector. This usually happens when the service is provided in the wrong scope or not provided at all.
-->

가장 흔한 이슈는 서비스 의존성 주입을 요청했지만 Angular가 현재 인젝터나 부모 인젝터에서 해당 의존성을 찾지 못할 때 발생합니다.
서비스가 등록되지 않았거나 다른 범위에 등록된 것이 원인일 수 있습니다.

<!--
#### Provider scope mismatch
-->

#### 프로바이더가 잘못 등록된 경우

<!--
When you provide a service in a component's `providers` array, Angular creates an instance in that component's injector. This instance is only available to that component and its children. Parent components and sibling components cannot access it because they use different injectors.

```angular-ts {header: 'child-view.ts'}
import {Component} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-child',
  template: '<p>Child</p>',
  providers: [DataStore], // Only available in this component and its children
})
export class ChildView {}
```

```angular-ts {header: 'parent-view.ts'}
import {Component, inject} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-parent',
  template: '<app-child />',
})
export class ParentView {
  private dataService = inject(DataStore); // ERROR: Not available to parent
}
```

Angular only searches up the hierarchy, never down. Parent components cannot access services provided in child components.

**Solution:** Provide the service at a higher level (application or parent component).

```ts {prefer}
import {Service} from '@angular/core';

@Service()
export class DataStore {
  // Available everywhere
}
```

TIP: `@Service` makes services available everywhere and enables tree-shaking. If you don't want to scope it to the entire app, specify `autoProvided: false`.
-->

컴포넌트 `providers` 배열에 서비스 프로바이더를 등록하면, Angular는 해당 컴포넌트 인젝터에 서비스 인스턴스를 생성합니다.
이렇게 생성된 서비스 인스턴스는 해당 컴포넌트와 이 컴포넌트의 자식 범위에서 접근할 수 있습니다.
부모 컴포넌트나 이웃 컴포넌트는 별도 인젝터를 구성하기 때문에 이 서비스 인스턴스에 접근할 수 없습니다.

```angular-ts {header: 'child-view.ts'}
import {Component} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-child',
  template: '<p>Child</p>',
  providers: [DataStore], // 이 컴포넌트와 자식 범위에서만 접근할 수 있습니다.
})
export class ChildView {}
```

```angular-ts {header: 'parent-view.ts'}
import {Component, inject} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-parent',
  template: '<app-child />',
})
export class ParentView {
  private dataService = inject(DataStore); // 에러: 부모 범위에서는 접근할 수 없습니다.
}
```

Angular는 윗 방향으로만 인젝터를 따라갑니다.
아래쪽에서 프로바이더를 찾지 않습니다.
그래서 부모 컴포넌트는 자식 컴포넌트에 등록된 서비스 프로바이더를 찾을 수 없습니다.

**해결 방법:** 서비스를 더 윗 단계 프로바이더에 등록하세요.

```ts {prefer}
import {Service} from '@angular/core';

@Service()
export class DataStore {
  // 앱 전체 범위에서 접근할 수 있습니다.
}
```

참고: `@Service` 데코레이터를 사용하면 서비스 클래스를 앱 전체 범위에서 접근할 수 있으며, 트리 셰이킹도 가능합니다.
`@Service` 데코레이터를 사용하지만 앱 전체 범위에 등록하지 않으려면, `autoProvided: false`를 지정하세요.

<!--
#### Services and lazy-loaded routes
-->

#### 지연 로딩되는 라우팅 규칙의 서비스

<!--
When you provide a service in a lazy-loaded route's `providers` array, Angular creates a child injector for that route. This injector and its services only become available after the route loads. Components in the eagerly-loaded parts of your application cannot access these services because they use different injectors that exist before the lazy-loaded injector is created.

```ts {header: 'feature.routes.ts'}
import {Routes} from '@angular/router';
import {FeatureClient} from './feature-client';

export const featureRoutes: Routes = [
  {
    path: 'feature',
    providers: [FeatureClient],
    loadComponent: () => import('./feature-view'),
  },
];
```

```angular-ts {header: 'eager-view.ts'}
import {Component, inject} from '@angular/core';
import {FeatureClient} from './feature-client';

@Component({
  selector: 'app-eager',
  template: '<p>Eager Component</p>',
})
export class EagerView {
  private featureService = inject(FeatureClient); // ERROR: Not available yet
}
```

Lazy-loaded routes create child injectors that are only available after the route loads.

NOTE: By default, route injectors and their services persist even after navigating away from the route. They are not destroyed until the application is closed. For automatic cleanup of unused route injectors, see [customizing route behavior](guide/routing/customizing-route-behavior#experimental-automatic-cleanup-of-unused-route-injectors).

**Solution:** Use `@Service` for services that need to be shared across lazy boundaries.

```ts {prefer, header: 'Provide at root for shared services'}
import {Service} from '@angular/core';

@Service()
export class FeatureClient {
  // Available everywhere, including before lazy load
}
```

If the service should be lazy-loaded but still available to eager components, inject it only where needed and use optional injection to handle availability.
-->

지연 로딩되는 라우팅 규칙의 `providers` 배열에 서비스 프로바이더를 등록하면, Angular는 그 라우팅 규칙에 인젝터를 생성합니다.
이 때 생성되는 인젝터와 서비스 인스턴스는 해당 라우팅 규칙이 로딩된 이후에 사용가능합니다.
그리고 이 인젝터는 애플리케이션이 실행되면서 즉시 로드된 부분과는 다르게 구성되기 때문에, 즉시 로드된 컴포넌트에서 지연 로딩된 인젝터에 접근할 수는 없습니다.

```ts {header: 'feature.routes.ts'}
import {Routes} from '@angular/router';
import {FeatureClient} from './feature-client';

export const featureRoutes: Routes = [
  {
    path: 'feature',
    providers: [FeatureClient],
    loadComponent: () => import('./feature-view'),
  },
];
```

```angular-ts {header: 'eager-view.ts'}
import {Component, inject} from '@angular/core';
import {FeatureClient} from './feature-client';

@Component({
  selector: 'app-eager',
  template: '<p>Eager Component</p>',
})
export class EagerView {
  private featureService = inject(FeatureClient); // 에러: 아직 사용할 수 없습니다.
}
```

지연 로딩되는 라우팅 규칙이 새로 만드는 인젝터는 해당 라우팅 규칙이 로드된 후에 사용할 수 있습니다.

참고: 기본적으로 라우팅 규칙의 인젝터와 이 인젝터에 등록되는 서비스 프로바이더는 해당 라우팅 규칙을 벗어나도 유지됩니다.
애플리케이션이 종료되기 전까지는 인스턴스가 종료되지 않기 때문입니다.
사용하지 않는 라우팅 규칙의 인젝터를 자동으로 정리하려면 [라우팅 규칙 커스터마이징](guide/routing/customizing-route-behavior#experimental-automatic-cleanup-of-unused-route-injectors) 문서를 참고하세요.

**해결방법:** 지연 로딩되는 영역에서 서비스 인스턴스를 사용하려면 `@Service` 데코레이터를 사용하세요.

```ts {prefer, header: '서비스 인스턴스를 공유하기 위해 최상위 계층에 등록하기'}
import {Service} from '@angular/core';

@Service()
export class FeatureClient {
  // 지연 로딩되기 전을 포함헤서 애플리케이션 전체 범위에서 접근할 수 있습니다.
}
```

서비스가 지연 로딩되지만 즉시 로드되는 컴포넌트에서도 사용해야 한다면, 꼭 필요한 곳에만 의존성으로 주입하고 `@Optional` 옵션을 함께 사용하세요.

<!--
### Multiple instances instead of singletons
-->

### 인스턴스 여러개 사용하기

<!--
You expect one shared instance (singleton) but get separate instances in different components.
-->

서비스 인스턴스를 싱글턴으로 유지하지 않고, 컴포넌트마다 별도 인스턴스를 구성할 수 있습니다.

<!--
#### Providing in component instead of root
-->

#### 최상위 대신 컴포넌트에 서비스 프로바이더 등록하기

<!--
When you add a service to a component's `providers` array, Angular creates a new instance of that service for each instance of the component. Each component gets its own separate service instance, which means changes in one component don't affect the service instance in other components. This is often unexpected when you want shared state across your application.

```angular-ts {avoid, header: 'Component-level provider creates multiple instances'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
  providers: [UserClient], // Creates new instance per component!
})
export class UserProfile {
  private userService = inject(UserClient);
}

@Component({
  selector: 'app-settings',
  template: '<p>Settings</p>',
  providers: [UserClient], // Different instance!
})
export class UserSettings {
  private userService = inject(UserClient);
}
```

Each component gets its own `UserClient` instance. Changes in one component don't affect the other.

**Solution:** Use `@Service` for singletons.

```ts {prefer, header: 'Root-level singleton'}
import {Injectable} from '@angular/core';

@Service()
export class UserClient {
  // Single instance shared across all components
}
```
-->

컴포넌트 `providers` 베열에 서비스 프로바이더를 등록하면, Angular는 컴포넌트 인스턴스마다 서비스 인스턴스를 새로 생성합니다.
그러면 개별 컴포넌트마다 각각 서비스 인스턴스가 생성되기 때문에, 어떤 컴포넌트에서 서비스를 활용하는 것이 다른 컴포넌트의 서비스 인스턴스에 영향을 주지 않습니다.
애플리케이션의 어떤 상태를 다른 곳에 전달하려고 한다면 이렇게 구성하면 안됩니다.

```angular-ts {avoid, header: '컴포넌트 계층에 프로바이더를 등록하면 인스턴스가 여러개 생성됩니다'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
  providers: [UserClient], // 컴포넌트마다 새로운 인스턴스를 생성합니다!
})
export class UserProfile {
  private userService = inject(UserClient);
}

@Component({
  selector: 'app-settings',
  template: '<p>Settings</p>',
  providers: [UserClient], // 인스턴스가 다릅니다!
})
export class UserSettings {
  private userService = inject(UserClient);
}
```

이렇게 구성하면 개별 컴포넌트마다 `UserClient`가 각각 생성됩니다.
어떤 컴포넌트의 동작이 다른 컴포넌트에 영향을 주지 않습니다.

**해결방법:** 서비스 인스턴스를 하나만 생성하려면 `@Service` 데코레이터를 사용하세요.

```ts {prefer, header: '최상위 계층에 싱글턴 인스턴스로 생성됩니다'}
import {Injectable} from '@angular/core';

@Service()
export class UserClient {
  // 인스턴스가 하나만 생성되며 모든 컴포넌트가 공유합니다.
}
```

<!--
#### When multiple instances are intentional
-->

#### 인스턴스를 여러개 활용하려는 경우

<!--
Sometimes you want separate instances per component for component-specific state.

```angular-ts {header: 'Intentional: Component-scoped state'}
import {Injectable, signal} from '@angular/core';

@Injectable() // No providedIn - must be provided explicitly
export class FormStateStore {
  private formData = signal({});

  setData(data: any) {
    this.formData.set(data);
  }

  getData() {
    return this.formData();
  }
}

@Component({
  selector: 'app-user-form',
  template: '<form>...</form>',
  providers: [FormStateStore], // Each form gets its own state
})
export class UserForm {
  private formState = inject(FormStateStore);
}
```

This pattern is useful for:

- Form state management (each form has isolated state)
- Component-specific caching
- Temporary data that shouldn't be shared
-->

컴포넌트 각각의 상태를 관리하려고 한다면 서비스 인스턴스를 분리할 필요가 있습니다.

```angular-ts {header: '컴포넌트 범위의 상태 관리'}
import {Injectable, signal} from '@angular/core';

@Injectable() // providedIn 을 지정하지 않았습니다
export class FormStateStore {
  private formData = signal({});

  setData(data: any) {
    this.formData.set(data);
  }

  getData() {
    return this.formData();
  }
}

@Component({
  selector: 'app-user-form',
  template: '<form>...</form>',
  providers: [FormStateStore], // 개별 폼을 관리하는 서비스 인스턴스를 구성합니다.
})
export class UserForm {
  private formState = inject(FormStateStore);
}
```

이 방식은 이런 경우에 유용합니다:

- 개별 폼 상태 관리
- 컴포넌트 상태 캐싱
- 공유할 필요가 없는 임시 데이터

<!--
### Incorrect inject() usage
-->

### `inject()`를 잘못 사용하는 경우

<!--
The `inject()` function only works in specific contexts during class construction and factory execution.
-->

`inject()` 함수는 클래스 생성자와 팩토리 실행 컨텍스트 안에서만 동작합니다.

<!--
#### Using inject() in lifecycle hooks
-->

#### 라이프싸이클 후킹 함수에서 `inject()` 를 사용하면

<!--
When you call the `inject()` function inside lifecycle hooks like `ngOnInit()`, `ngAfterViewInit()`, or `ngOnDestroy()`, Angular throws an error because these methods run outside the injection context. The injection context is only available during the synchronous execution of class construction, which happens before lifecycle hooks are called.

```angular-ts {avoid, header: 'inject() in ngOnInit'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  userName = '';

  ngOnInit() {
    const userService = inject(UserClient); // ERROR: Not an injection context
    this.userName = userService.getUser().name;
  }
}
```

**Solution:** Capture dependencies and derive values in field initializers.

```angular-ts {prefer, header: 'Derive values in field initializers'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient);
  userName = this.userService.getUser().name;
}
```
-->

`ngOnInit()`, `ngAfterViewInit()`, `ngOnDestroy()`와 같은 라이프싸이클 후킹 함수에서 `inject()` 함수를 사용하면, 이 함수들은 의존성 주입 컨텍스트가 아니기 때문에 에러가 발생합니다.
의존성 주입 컨텍스트는 라이프싸이클 후킹 함수 실행 전인 클래스 생성자의 동기 실행 코드에서만 유효합니다.

```angular-ts {avoid, header: 'ngOnInit()에서 inject()를 사용하면'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  userName = '';

  ngOnInit() {
    const userService = inject(UserClient); // 에러: 의존성 주입 컨텍스트가 아닙니다
    this.userName = userService.getUser().name;
  }
}
```

**해결방법:** 클래스 프로퍼티를 선언할 때 의존성을 주입하세요.

```angular-ts {prefer, header: '클래스 프로퍼티를 선언할 때 의존성을 주입하세요'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient);
  userName = this.userService.getUser().name;
}
```

<!--
#### Using the Injector for deferred injection
-->

#### 의존성 주입 컨텍스트 이후에 인젝터 사용하기

<!--
When you need to retrieve services outside an injection context, use the captured `Injector` directly with `injector.get()`:

```angular-ts
import {Component, inject, Injector} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<button (click)="delayedLoad()">Load Later</button>',
})
export class UserProfile {
  private injector = inject(Injector);

  delayedLoad() {
    setTimeout(() => {
      const userService = this.injector.get(UserClient);
      console.log(userService.getUser());
    }, 1000);
  }
}
```
-->

의존성 주입 컨텍스트 밖에서 서비스 인스턴스를 참조하려면, `Injector` 클래스 참조를 통해 `injector.get()`을 실행하면 됩니다:

```angular-ts
import {Component, inject, Injector} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<button (click)="delayedLoad()">Load Later</button>',
})
export class UserProfile {
  private injector = inject(Injector);

  delayedLoad() {
    setTimeout(() => {
      const userService = this.injector.get(UserClient);
      console.log(userService.getUser());
    }, 1000);
  }
}
```

<!--
#### Using runInInjectionContext for callbacks
-->

#### 콜백 함수에 `runInInjectionContext()` 사용하기

<!--
Use `runInInjectionContext()` when you need to enable **other code** to call `inject()`. This is useful when accepting callbacks that might use dependency injection:

```angular-ts
import {Component, inject, Injector, input} from '@angular/core';

@Component({
  selector: 'app-data-loader',
  template: '<button (click)="load()">Load</button>',
})
export class DataLoader {
  private injector = inject(Injector);
  onLoad = input<() => void>();

  load() {
    const callback = this.onLoad();
    if (callback) {
      // Enable the callback to use inject()
      this.injector.runInInjectionContext(callback);
    }
  }
}
```

The `runInInjectionContext()` method creates a temporary injection context, allowing code inside the callback to call `inject()`.

IMPORTANT: Always capture dependencies at the class level when possible. Use `injector.get()` for simple deferred retrieval, and `runInInjectionContext()` only when external code needs to call `inject()`.

TIP: Use `assertInInjectionContext()` to verify your code is running in a valid injection context. This is useful when creating reusable functions that call `inject()`. See [Asserting the context](guide/di/dependency-injection-context#asserts-the-context) for details.
-->

의존성 주입 컨텍스트가 아닌 곳에서 `inject()` 함수를 사용하려면 `runInInjectionContext()`를 사용해도 됩니다.
콜백 함수를 활용하는 경우에 유용합니다:

```angular-ts
import {Component, inject, Injector, input} from '@angular/core';

@Component({
  selector: 'app-data-loader',
  template: '<button (click)="load()">Load</button>',
})
export class DataLoader {
  private injector = inject(Injector);
  onLoad = input<() => void>();

  load() {
    const callback = this.onLoad();
    if (callback) {
      // inject()를 사용할 수 있도록 콜백 함수를 등록합니다.
      this.injector.runInInjectionContext(callback);
    }
  }
}
```

`runInInjectionContext()` 메서드는 임시 의존성 주입 컨텍스트를 생성하기 때문에, 콜백 함수 안에서는 `inject()`를 사용할 수 있습니다.

중요: 가능하다면 클래스 프로퍼티를 선언할 때 의존성 객체도 주입하세요. 그 이후에 실행되는 코드에서는 `injector.get()`를 사용하면 간단하며, 다른 코드 컨텍스트에서 `inject()`를 사용하려면 `runInInjectionContext()`를 사용하면 됩니다.

참고: 코드가 반드시 의존성 주입 컨텍스트에서 실행되어야 한다면 `assertInInjectionContext()`를 사용하세요.
이 함수는 `inject()`를 실행하는 함수를 재사용할 때 유용합니다.
자세한 내용은 [의존성 주입 컨텍스트 강제하기](guide/di/dependency-injection-context#asserts-the-context) 문서를 참고하세요.

<!--
### providers vs viewProviders confusion
-->

### `providers`와 `viewProviders`를 혼동하는 경우

<!--
The difference between `providers` and `viewProviders` affects content projection scenarios.
-->

`providers`와 `viewProviders`는 컨텐츠 프로젝션하는 경우에 동작이 다릅니다.

<!--
#### Understanding the difference
-->

#### 차이점

<!--
**providers:** Available to the component's template AND any content projected into the component (ng-content).

**viewProviders:** Only available to the component's template, NOT to projected content.

```angular-ts {header: 'parent-view.ts'}
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-parent',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  providers: [ThemeStore], // Available to content children
})
export class ParentView {
  protected themeService = inject(ThemeStore);
}

@Component({
  selector: 'app-parent-view',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  viewProviders: [ThemeStore], // NOT available to content children
})
export class ParentViewOnly {
  protected themeService = inject(ThemeStore);
}
```

```angular-ts {header: 'child-view.ts'}
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-child',
  template: '<p>Child theme: {{theme()}}</p>',
})
export class ChildView {
  private themeService = inject(ThemeStore, {optional: true});
  theme = () => this.themeService?.theme() ?? 'none';
}
```

```angular-ts {header: 'app.ts'}
@Component({
  selector: 'app-root',
  template: `
    <app-parent>
      <app-child />
      <!- Can access ThemeStore ->
    </app-parent>

    <app-parent-view>
      <app-child />
      <!- Cannot access ThemeStore ->
    </app-parent-view>
  `,
})
export class App {}
```

**When projected into `app-parent`:** The child component can inject `ThemeStore` because `providers` makes it available to projected content.

**When projected into `app-parent-view`:** The child component cannot inject `ThemeStore` because `viewProviders` restricts it to the parent's template only.
-->

**providers:** 컴포넌트 템플릿과 컴포넌트에 `<ng-content>`로 컴포넌트 안에 프로젝션된 컨텐츠에 유효합니다.

**viewProviders:** 컴포넌트 템플릿에만 유효하며, 프로젝션된 컨텐츠에서는 접근할 수 없습니다.

```angular-ts {header: 'parent-view.ts'}
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-parent',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  providers: [ThemeStore], // 프로젝션 된 컨텐츠에서 사용할 수 있습니다.
})
export class ParentView {
  protected themeService = inject(ThemeStore);
}

@Component({
  selector: 'app-parent-view',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  viewProviders: [ThemeStore], // 프로젝션 된 컨텐츠에서 사용할 수 없습니다.
})
export class ParentViewOnly {
  protected themeService = inject(ThemeStore);
}
```

```angular-ts {header: 'child-view.ts'}
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-child',
  template: '<p>Child theme: {{theme()}}</p>',
})
export class ChildView {
  private themeService = inject(ThemeStore, {optional: true});
  theme = () => this.themeService?.theme() ?? 'none';
}
```

```angular-ts {header: 'app.ts'}
@Component({
  selector: 'app-root',
  template: `
    <app-parent>
      <app-child />
      <!-- ThemeStore 접근 가능 -->
    </app-parent>

    <app-parent-view>
      <app-child />
      <!-- ThemeStore 접근 불가능 -->
    </app-parent-view>
  `,
})
export class App {}
```

**`app-parent`에 프로젝션하는 경우:** `ThemeStore`가 `providers`에 등록되었기 때문에 자식 컴포넌트에서 `ThemeStore` 인스턴스를 참조할 수 있습니다.

**`app-parent-view`에 프로젝션하는 경우:** `ThemeStore`가 `viewProviders`에 등록되었기 때문에 자식 컴포넌트에서는 `ThemeStore` 인스턴스를 참조할 수 없습니다.

<!--
#### Choosing between providers and viewProviders
-->

#### `providers`, `viewProviders` 선택하기

<!--
Use `providers` when:

- The service should be available to projected content
- You want content children to access the service
- You're providing general-purpose services

Use `viewProviders` when:

- The service should only be available to your component's template
- You want to hide implementation details from projected content
- You're providing internal services that shouldn't leak out

**Default recommendation:** Use `providers` unless you have a specific reason to restrict access with `viewProviders`.
-->

`providers`는 이런 경우에 사용하세요:

- 프로젝션 된 컨텐츠에서 서비스 인스턴스를 활용해야 할 때
- 일반적으로 서비스 프로바이더를 등록할 때

`viewProviders` 는 이런 경우에 사용하세요:

- 서비스 인스턴스를 컴포넌트 템플릿에서만 사용하려고 할 때
- 프로젝션 된 컨텐츠의 구체적인 구현 내용을 감추려고 할 때
- 서비스를 내부 용도로만 사용하고 외부로 노출하지 않을 때

**권장사항:** `viewProviders`를 사용해서 사용범위를 제한해야 하는 경우가 아니라면 언제나 `providers`를 사용하세요.

<!--
### InjectionToken issues
-->

### `InjectionToken` 문제

<!--
When using `InjectionToken` for non-class dependencies, developers often encounter problems related to token identity, type safety, and provider configuration. These issues usually stem from how JavaScript handles object identity and how TypeScript infers types.
-->

의존성 객체가 아닌 클래스에 `InjectionToken`을 사용하면, 토큰 식별, 타입 검사, 프로바이더 설정에 문제가 발생할 수 있습니다.
이런 문제는 일반적으로 JavaScript가 객체를 구분하는 방식과 TypeScript가 타입을 추론하는 방식 때문에 발생합니다.

<!--
#### Token identity confusion
-->

#### 토큰 식별 혼동

<!--
When you create a new `InjectionToken` instance, JavaScript creates a unique object in memory. Even if you create another `InjectionToken` with the exact same description string, it's a completely different object. Angular uses the token object's identity (not its description) to match providers with injection points, so tokens with the same description but different object identities cannot access each other's values.

```ts {header: 'config.token.ts'}
import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app config');
```

```ts {header: 'app.config.ts'}
import {APP_CONFIG} from './config.token';

export const appConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
};

bootstrapApplication(App, {
  providers: [{provide: APP_CONFIG, useValue: appConfig}],
});
```

```angular-ts {avoid, header: 'feature-view.ts'}
// Creating new token with same description
import {InjectionToken, inject} from '@angular/core';
import {AppConfig} from './config.token';

const APP_CONFIG = new InjectionToken<AppConfig>('app config');

@Component({
  selector: 'app-feature',
  template: '<p>Feature</p>',
})
export class FeatureView {
  private config = inject(APP_CONFIG); // ERROR: Different token instance!
}
```

Even though both tokens have the description `'app config'`, they are different objects. Angular compares tokens by reference, not by description.

**Solution:** Import the same token instance.

```angular-ts {prefer, header: 'feature-view.ts'}
import {inject} from '@angular/core';
import {APP_CONFIG, AppConfig} from './config.token';

@Component({
  selector: 'app-feature',
  template: '<p>API: {{config.apiUrl}}</p>',
})
export class FeatureView {
  protected config = inject(APP_CONFIG); // Works: Same token instance
}
```

TIP: Always export tokens from a shared file and import them everywhere they're needed. Never create multiple `InjectionToken` instances with the same description.
-->

`InjectionToken` 인스턴스를 생성하면 JavaScript는 메모리에 고유한 객체를 생성합니다.
그리고 나중에 같은 구분자로 `InjectionToken`을 다시 생성하면 이전 객체와는 다른 객체를 다시 생성합니다.
그런데 Angular는 구분자가 아니라 토큰 객체 참조를 기준으로 프로바이더와 주입 지점을 연결하기 때문에, 구분자가 같지만 객체 참조가 다른 토큰은 서로의 값에 접근할 수 없습니다.

```ts {header: 'config.token.ts'}
import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app config');
```

```ts {header: 'app.config.ts'}
import {APP_CONFIG} from './config.token';

export const appConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
};

bootstrapApplication(App, {
  providers: [{provide: APP_CONFIG, useValue: appConfig}],
});
```

```angular-ts {avoid, header: 'feature-view.ts'}
// 같은 구분자로 새로운 토큰을 선언합니다.
import {InjectionToken, inject} from '@angular/core';
import {AppConfig} from './config.token';

const APP_CONFIG = new InjectionToken<AppConfig>('app config');

@Component({
  selector: 'app-feature',
  template: '<p>Feature</p>',
})
export class FeatureView {
  private config = inject(APP_CONFIG); // 에러: 토큰 인스턴스가 다릅니다!
}
```

두 토큰의 구분자는 모두 `'app config'`지만, 서로 다른 객체입니다.
Angular는 구분자가 아니라 객체 참조를 기준으로 토큰을 구분합니다.

**해결방법:** 같은 토큰 인스턴스를 사용하세요.

```angular-ts {prefer, header: 'feature-view.ts'}
import {inject} from '@angular/core';
import {APP_CONFIG, AppConfig} from './config.token';

@Component({
  selector: 'app-feature',
  template: '<p>API: {{config.apiUrl}}</p>',
})
export class FeatureView {
  protected config = inject(APP_CONFIG); // 정상: 같은 토큰 인스턴스를 사용합니다
}
```

참고: 토큰은 파일 한 곳에 선언하고 필요한 곳에 로드해서 사용하세요.
같은 구분자로 `INjectionToken`을 여러개 선언하면 안됩니다.

<!--
#### Trying to inject interfaces
-->

#### 인터페이스로 의존성 주입하기

<!--
When you define a TypeScript interface, it only exists during compilation for type checking. TypeScript erases all interface definitions when it compiles to JavaScript, so at runtime there's no object for Angular to use as an injection token. If you try to inject an interface type, Angular has nothing to match against the provider configuration.

```angular-ts {avoid, header: 'Can't inject interface'}
interface UserConfig {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
})
export class UserProfile {
  // ERROR: Interfaces don't exist at runtime
  constructor(private config: UserConfig) {}
}
```

**Solution:** Use `InjectionToken` for interface types.

```angular-ts {prefer, header: 'Use InjectionToken for interfaces'}
import {InjectionToken, inject} from '@angular/core';

interface UserConfig {
  name: string;
  email: string;
}

export const USER_CONFIG = new InjectionToken<UserConfig>('user configuration');

// Provide the configuration
bootstrapApplication(App, {
  providers: [
    {
      provide: USER_CONFIG,
      useValue: {name: 'Alice', email: 'alice@example.com'},
    },
  ],
});

// Inject using the token
@Component({
  selector: 'app-profile',
  template: '<p>User: {{config.name}}</p>',
})
export class UserProfile {
  protected config = inject(USER_CONFIG);
}
```

The `InjectionToken` exists at runtime and can be used for injection, while the `UserConfig` interface provides type safety during development.
-->

TypeScript로 정의한 인터페이스는 컴파일 시점에 타입 검사를 하는 용도로만 사용할 수 있습니다.
TypeScript 코드가 JavaScript로 변환되면 인터페이스는 모두 제거되기 때문에, 실행시점에는 의존성 토큰으로 참조할 객체를 찾을 수 없습니다.

```angular-ts {avoid, header: '인터페이스는 의존성 객체로 주입할 수 없습니다'}
interface UserConfig {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
})
export class UserProfile {
  // 에러: 인터페이스는 실행시점에 존재하지 않습니다
  constructor(private config: UserConfig) {}
}
```

**해결방법:** Use `InjectionToken` for interface types.

```angular-ts {prefer, header: 'InjectionToken을 사용하세요'}
import {InjectionToken, inject} from '@angular/core';

interface UserConfig {
  name: string;
  email: string;
}

export const USER_CONFIG = new InjectionToken<UserConfig>('user configuration');

// 프로바이더를 구성합니다
bootstrapApplication(App, {
  providers: [
    {
      provide: USER_CONFIG,
      useValue: {name: 'Alice', email: 'alice@example.com'},
    },
  ],
});

// Inject using the token
@Component({
  selector: 'app-profile',
  template: '<p>User: {{config.name}}</p>',
})
export class UserProfile {
  protected config = inject(USER_CONFIG);
}
```

`InjectionToken`은 실행 시점에도 존재하기 때문에 의존성 주입에 사용할 수 있습니다.
`UserConfig` 인터페이스는 개발 시점에 타입 검사를 위해 사용됩니다.

<!--
### Circular dependencies
-->

### 의존성 순환 참조

<!--
Circular dependencies occur when services inject each other, creating a cycle that Angular cannot resolve. For detailed explanations and code examples, see [NG0200: Circular dependency](errors/NG0200).

**Resolution strategies** (in order of preference):

1. **Restructure** - Extract shared logic to a third service, breaking the cycle
2. **Use events** - Replace direct dependencies with event-based communication (such as `Subject`)
3. **Lazy injection** - Use `Injector.get()` to defer one dependency (last resort)

NOTE: Do not use `forwardRef()` for service circular dependencies—it only solves circular imports in standalone component configurations.
-->

서비스 여러개가 서로를 참조하면 순환 참조가 발생하기 때문에 에러가 발생합니다.
자세한 설명과 예제 코드는 [NG0200: Circular dependency](errors/NG0200) 문서를 참고하세요.

**해결 방법** (권장하는 순서대로):

1. **구조를 다시 설계하세요** - 공통 로직을 별도 서비스로 옮겨서 순환 참조를 끊으세요.
2. **이벤트 활용하기** - 의존성을 직접 참조하지 말고 `Subject`와 같은 이벤트 기반 통신을 사용하세요.
3. **의존성 지연 주입** - `Injector.get()`을 사용해서 의존성 주입을 늦추세요 (최후의 수단)

참고: 순환 참조를 해결하기 위해 `forwardRef()`를 사용하지 마세요.
이 옵션은 독립 컴포넌트의 순환 `import` 문제만 해결합니다.

<!--
## Debugging dependency resolution
-->

## 의존성 객체 판별 디버깅하기

<!--
### Understanding the resolution process
-->

### 의존성 객체 판별 과정 이해하기

<!--
Angular resolves dependencies by walking up the injector hierarchy. When a `NullInjectorError` occurs, understanding this search order helps you identify where to add the missing provider.

Angular searches in this order:

1. **Element injector** - The current component or directive
2. **Parent element injectors** - Up the DOM tree through parent components
3. **Environment injector** - The route or application injector
4. **NullInjector** - Throws `NullInjectorError` if not found

When you see a `NullInjectorError`, the service isn't provided at any level the component can access. Check that:

- The service has `@Service()` or
- The service has `@Injectable({providedIn: 'root'})`, or
- The service is in a `providers` array the component can reach

You can modify this search behavior with resolution modifiers like `self`, `skipSelf`, `host`, and `optional`. For complete coverage of resolution rules and modifiers, see the [Hierarchical injectors guide](guide/di/hierarchical-dependency-injection).
-->

Angular는 인젝터 계층을 따라 올라가며 의존성 객체를 판별합니다.
그리고 `NullInjectorError` 에러가 발생하면 아래 순서로 프로바이더 등록이 빠졌는지 찾아보세요.

Angular는 이런 순서로 탐색합니다:

1. **엘리먼트 인젝터** - 현재 계층의 컴포넌트나 디렉티브
2. **부모 엘리먼트 인젝터** - DOM 트리를 따라 올라가며 부모 컴포넌트를 탐색합니다.
3. **환경(Environment) 인젝터** - 라우팅 규칙 인젝터나 애플리케이션 인젝터
4. **NullInjector** - 의존성 객체를 찾지 못하면 `NullInjectorError` 를 발생시킵니다.

`NullInjectorError`가 발생하면 어느 계층에도 서비스 클래스 프로바이더가 등록되지 않았다는 것을 의미합니다.
이 곳을 확인해 보세요:

- 서비스에 `@Service()`가 지정되었는지
- 서비스에 `@Injectable({providedIn: 'root'})`가 지정되었는지
- 컴포넌트가 접근할 수 있는 범위에 `providers` 배열로 서비스가 등록되었는지

이 탐색 과정은 `self`, `skipSelf`, `host`, `optional`과 같은 옵션를 사용하면 변경될 수 있습니다.
의존성 객체 판별 규칙과 옵션에 대해 자세하게 알아보려면 [의존성 계층 인젝터 가이드](guide/di/hierarchical-dependency-injection) 문서를 참고하세요.

<!--
### Using Angular DevTools
-->

### 개발자도구 활용하기

<!--
Angular DevTools includes an injector tree inspector that visualizes the entire injector hierarchy and shows which providers are available at each level. For installation and general usage, see the [Angular DevTools injector documentation](tools/devtools/injectors).

When debugging DI issues, use DevTools to answer these questions:

- **Is the service provided?** Select the component that fails to inject and check if the service appears in the Injector section.
- **At what level?** Walk up the component tree to find where the service is actually provided (component, route, or application level).
- **Multiple instances?** If a singleton service appears in multiple component injectors, it's likely provided in component `providers` arrays instead of using `@Service` or `providedIn: 'root'`.

If a service never appears in any injector, verify it has the `@Service` decorator or is listed in a `providers` array.
-->

Angular가 제공하는 개발자도구를 활용하면 전체 인젝터 계층 트리를 확인하거나 각 계층에 등록된 프로바이더를 확인할 수 있습니다.
설치방법과 사용방법은 [Angular DevTools 인젝터 문서](tools/devtools/injectors)를 참고하세요.

의존성 객체 디버깅을 활용하면 이런 질문에 답을 찾을 수 있습니다:

- **서비스 프로바이더가 등록되어 있는지?** 의존성 주입이 실패한 컴포넌트를 선택하면 Injector 섹션에 서비스가 등록되어 있는지 확인하세요.
- **어느 계층에 등록되어 있는지?** 컴포넌트 트리를 따라 올라가며 서비스가 실제로 컴포넌트, 라우팅 규칙, 애플리케이션 계층 중 어디에 등록되었는지 찾을 수 있습니다.
- **인스턴스가 여러개인지?** 컴포넌트마다 싱글턴 서비스가 여러개 확인된다면, 이 서비스는 컴포넌트의 `providers` 배열에 등록되었을 수 있습니다. 전역 범위에 등록하려면 `@Service` 데코레이터나 `providedIn: 'root'` 옵션을 사용합니다.

서비스 프로바이더가 어떠한 인젝터에도 등록되지 않았다면, 서비스 클래스에 `@Service` 데코레이터를 빠뜨리지 않았는지, `providers` 배열에 추가했는지 확인해 보세요.

<!--
### Logging and tracing injection
-->

### 로그, 콜스택 확인하기

<!--
When DevTools isn't enough, use logging to trace injection behavior.
-->

개발자도구만으로 충분하지 않다면, 로그와 콜스택을 출력해 볼 수 있습니다.

<!--
#### Logging service creation
-->

#### 서비스 생성 로그

<!--
Add console logs to service constructors to see when services are created.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  constructor() {
    console.log('UserClient created');
    console.trace(); // Shows call stack
  }

  getUser() {
    return {name: 'Alice'};
  }
}
```

When the service is created, you'll see the log message and a stack trace showing where the injection occurred.

**What to look for:**

- How many times is the constructor called? (should be once for singletons)
- Where in the code is it being injected? (check the stack trace)
- Is it created at the expected time? (application startup vs lazy)
-->

서비스 생성자에 로그를 추가하면 서비스가 생성되는 것을 확인할 수 있습니다.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  constructor() {
    console.log('UserClient created');
    console.trace(); // 콜 스택 확인
  }

  getUser() {
    return {name: 'Alice'};
  }
}
```

서비스가 생성되면 로그 메시지를 확인할 수 있으며, 콜 스택을 확인하면 어떤 인젝터를 사용했는지도 확인할 수 있습니다.

**이런 점을 확인할 수 있습니다:**

- 생성자가 몇 번 실행되었는지? (싱글턴이라면 한 번이어야 합니다)
- 이 코드가 어디에 주입되었는지? (콜 스택으로 확인합니다)
- 예상한 시점에 생성되었는지? (애플리케이션 초기 실행 vs. 지연 로딩)

<!--
#### Checking service availability
-->

#### 서비스가 사용 가능한지 확인하기

<!--
Use optional injection with logging to determine if a service is available.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});

  constructor() {
    if (this.userService) {
      console.log('UserClient available:', this.userService);
    } else {
      console.warn('UserClient NOT available');
      console.trace(); // Shows where we tried to inject
    }
  }
}
```

This pattern helps you verify if a service is available without crashing the application.
-->

생략 가능한 의존성 주입을 사용하는 경우, 로그를 활용하면 의존성 객체를 사용할 수 있는지 판단할 수 있습니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});

  constructor() {
    if (this.userService) {
      console.log('UserClient available:', this.userService);
    } else {
      console.warn('UserClient NOT available');
      console.trace(); // 의존성 주입을 시도한 위치를 표시합니다.
    }
  }
}
```

이 방식울 활용하면 서비스가 제대로 주입되지 않아서 애플리케이션이 강제 종료되는 것을 방지할 수 있습니다.

<!--
#### Logging resolution modifiers
-->

#### 의존성 객체 옵션 로그로 출력하기

<!--
Test different resolution strategies with logging.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
  providers: [UserClient],
})
export class DebugView {
  // Try to get local instance
  private localService = inject(UserClient, {self: true, optional: true});

  // Try to get parent instance
  private parentService = inject(UserClient, {
    skipSelf: true,
    optional: true,
  });

  constructor() {
    console.log('Local instance:', this.localService);
    console.log('Parent instance:', this.parentService);
    console.log('Same instance?', this.localService === this.parentService);
  }
}
```

This shows you which instances are available at different injector levels.
-->

로그를 다른 방법으로 활용해 봅시다.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
  providers: [UserClient],
})
export class DebugView {
  // 로컬 인스턴스에서 의존성 주입을 시도합니다.
  private localService = inject(UserClient, {self: true, optional: true});

  // 부모 객체에서 의존성 주입을 시도합니다.
  private parentService = inject(UserClient, {
    skipSelf: true,
    optional: true,
  });

  constructor() {
    console.log('Local instance:', this.localService);
    console.log('Parent instance:', this.parentService);
    console.log('Same instance?', this.localService === this.parentService);
  }
}
```

이 방식을 활용하면 어떤 계층의 인젝터를 사용했는지 알 수 있습니다.

<!--
### Debugging workflow
-->

### 디버깅 작업 순서

<!--
When DI fails, follow this systematic approach:

**Step 1: Read the error message**

- Identify the error code (NG0200, NG0203, etc.)
- Read the dependency path
- Note which token failed

**Step 2: Check the basics**

- Does the service have `@Service` or `@Injectable()`?
- If you use `@Injectable`, is `providedIn` set correctly?
- Are imports correct?
- Is the file included in compilation?

**Step 3: Verify injection context**

- Is `inject()` called in a valid context?
- Check for async issues (await, setTimeout, promises)
- Verify timing (not after destroy)

**Step 4: Use debugging tools**

- Open Angular DevTools
- Check injector hierarchy
- Add console logs to constructors
- Use optional injection to test availability

**Step 5: Simplify and isolate**

- Remove dependencies one by one
- Test in a minimal component
- Check each injector level separately
- Create a reproduction case
-->

의존성 주입이 실패하면 이런 순서로 진행해 보세요:

**1단계: 에러 메시지를 확인하세요**

- 에러 코드를 확인하세요(NG0200, NG0203 등)
- 의존성 경로를 확인하세요
- 어떤 토큰이 주입 실패했는지 확인하세요

**2단계: 기본 구성을 확인하세요**

- 서비스에 `@Service` 데코레이터나 `@Injectable()` 데코레이터가 지정되어 있나요?
- `@Injectable`을 사용하는 경우 `providedIn`이 제대로 설정되어 있나요?
- `imports` 배열을 제대로 지정했나요?
- 컴파일되는 파일인가요?

**3단계: 의존성 주입 컨텍스트를 확인하세요**

- `inject()` 가 유효한 컨텍스트에서 실행되었나요?
- 비동기 이슈인지 확인해 보세요. (await, setTimeout, promises)
- 실행 시점을 확인해 보세요. (컴포넌트 종료 후에 실행하면 안됩니다)

**4단계: 디버깅 툴을 사용하세요**

- Angular 개발자도구를 열어 보세요.
- 인젝터 계층을 확인해 보세요.
- 생성자에 로그를 추가해서 콘솔을 확인해 보세요.
- 선택 가능한 의존성 주입을 활용해 보세요.

**5단계: 간단하게, 독립적으로 구성하세요**

- 의존성 객체를 하나씩 제외해 보세요.
- 컴포넌트를 최소한으로 구성해서 테스트하세요.
- 각 인젝터 계층은 분리되어 있는지 확인해 보세요.
- 재확인할 수 있도록 구성하세요.

<!--
## DI error reference
-->

## 의존성 주입 에러 참고

<!--
This section provides detailed information about specific Angular DI error codes you may encounter. Use this as a reference when you see these errors in your console.
-->

이번 섹션에서는 실제로 발생하는 Angular DI 에러 코드가 왜 발생하는지 알아봅시다.

### NullInjectorError: No provider for [Service]

<!--
**Error code:** None (displayed as `NullInjectorError`)

This error occurs when Angular cannot find a provider for a token in the injector hierarchy. The error message includes a dependency path showing where the injection was attempted.

```
NullInjectorError: No provider for UserClient!
  Dependency path: App -> AuthClient -> UserClient
```

The dependency path shows that `App` injected `AuthClient`, which tried to inject `UserClient`, but no provider was found.
-->

**에러 코드:** 없음 (`NullInjectorError` 라고 표시됩니다.)

Angular가 인젝터에서 의존성 주입 토큰의 프로바이더를 찾지 못했을 때 발생합니다.
에러 메시지를 보면 어떤 객체를 찾지 못했는지 확인할 수 있습니다.

```
NullInjectorError: No provider for UserClient!
  Dependency path: App -> AuthClient -> UserClient
```

로그를 보면 `App`에서 `AuthClient`를 의존성 객체로 주입하려고 하는데, `UserClient`를 찾지 못해서 에러가 발생했습니다.

#### Missing the `@Service ` or `@Injectable` decorator

<!--
The most common cause is forgetting the `@Service` or `@Injectable()` decorator on a service class.

```ts {avoid, header: 'Missing decorator'}
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

Angular requires the `@Service()` decorator to generate the metadata needed for dependency injection.

```ts {prefer, header: 'Include @Service'}
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

NOTE: Classes with zero-argument constructors can work without `@Service()`, but this is not recommended. Always include the decorator for consistency and to avoid issues when adding dependencies later.
-->

서비스 클래스에 `@Service` 데코레이터나 `@Injectable()` 데코레이터를 붙이지 않았을 때 발생합니다.

```ts {avoid, header: '데코레이터 없음'}
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

의존성 주입에 필요한 메타데이터를 생성하려면 `@Service()` 데코레이터를 지정해야 합니다.

```ts {prefer, header: '@Service 지정'}
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

참고: 생성자에 인자가 없는 클래스는 `@Service()` 없이도 동작할 수 있지만, 권장하지 않습니다. 의존성은 나중에도 추가될 수 있기 때문에 언제나 데코레이터를 붙이세요.

#### Missing providedIn configuration

<!--
A service may have `@Injectable()` but not specify where it should be provided.

```ts {avoid, header: 'No providedIn specified'}
import {Injectable} from '@angular/core';

@Injectable()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

Use the `@Service` decorator to make the service available throughout your application.

```ts {prefer, header: 'Specify providedIn'}
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

The `@Service` decorator makes the service available application-wide and enables tree-shaking (the service is removed from the bundle if never injected).
-->

서비스에 `@Injectable()`은 지정되어 있으나, 필요한 정보가 누락되었습니다.

```ts {avoid, header: 'providedIn 이 지정되지 않음'}
import {Injectable} from '@angular/core';

@Injectable()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

애플리케이션 전역 범위에서 사용하려면 `@Service` 데코레이터를 지정하세요.

```ts {prefer, header: 'providedIn 지정'}
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

`@Service` 데코레이터를 지정하면 애플리케이션 전역에서 서비스를 의존성으로 주입할 수 있으면서, 트리 셰이킹도 가능합니다.

#### Standalone component missing imports

<!--
In Angular v20+ with standalone components, you must explicitly import or provide dependencies in each component.

```angular-ts {avoid, header: 'Missing service import'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user().name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // ERROR: No provider
  user = this.userService.getUser();
}
```

Ensure the service uses `@Service` or add it to the component's `providers` array.

```angular-ts {prefer, header: 'Service uses providedIn: root'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user().name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // Works: providedIn: 'root'
  user = this.userService.getUser();
}
```
-->

Angular v20 이후 버전에서는 독립 컴포넌트에 필요한 의존성 객체는 각 컴포넌트에서 명확하게 로드해야 합니다.

```angular-ts {avoid, header: '서비스를 불러오지 않음'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user().name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // ERROR: 프로바이더가 존재하지 않습니다.
  user = this.userService.getUser();
}
```

서비스 클래스에 `@Service`를 지정하거나 컴포넌트 `providers` 배열에 의존성 객체를 등록하세요.

```angular-ts {prefer, header: 'Service에 providedIn: root 지정하기'}
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user().name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // Works: providedIn: 'root'
  user = this.userService.getUser();
}
```

<!--
#### Debugging with the dependency path
-->

#### 의존성 주입 순서로 디버깅하기

<!--
The dependency path in the error message shows the chain of injections that led to the failure.

```
NullInjectorError: No provider for LoggerStore!
  Dependency path: App -> DataStore -> ApiClient -> LoggerStore
```

This path tells you:

1. `App` injected `DataStore`
2. `DataStore` injected `ApiClient`
3. `ApiClient` tried to inject `LoggerStore`
4. No provider for `LoggerStore` was found

Start your investigation at the end of the chain (`LoggerStore`) and verify it has proper configuration.
-->

에러 메시지를 확인하면 의존성 주입 체인이 어디에서 실패했는지 확인할 수 있습니다.

```
NullInjectorError: No provider for LoggerStore!
  Dependency path: App -> DataStore -> ApiClient -> LoggerStore
```

이런 내용을 알 수 있습니다:

1. `App`에서 `DataStore`를 의존성으로 주입합니다.
2. `DataStore`에 `ApiClient`를 의존성으로 주입합니다.
3. `ApiClient`가 `LoggerStore`를 의존성으로 주입하려고 시도합니다.
4. `LoggerStore` 프로바이더를 찾지 못했습니다.

그렇다면 의존성 주입 체인 마지막인 `LoggerStore`부터 설정이 제대로 되었는지 확인하면 됩니다.

<!--
#### Checking provider availability with optional injection
-->

#### 생략할 수 있도록 옵션 수정하기

<!--
Use optional injection to check if a provider exists without throwing an error.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Service available: {{serviceAvailable}}</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});
  serviceAvailable = this.userService !== null;
}
```

Optional injection returns `null` if no provider is found, allowing you to handle the absence gracefully.
-->

프로바이더가 등록되어 있지 않아서 에러가 발생하는 것을 방지하려면 생략 가능 옵션을 추가하세요.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Service available: {{serviceAvailable}}</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});
  serviceAvailable = this.userService !== null;
}
```

의존성 객체를 생략할 수 있도록 지정하면 프로바이더를 찾지 못했을 때 `null`을 반환합니다.

### NG0203: inject() must be called from an injection context

<!--
**Error code:** NG0203

This error occurs when you call `inject()` outside of a valid injection context. Angular requires `inject()` to be called synchronously during class construction or factory execution.

```
NG0203: inject() must be called from an injection context such as a
constructor, a factory function, a field initializer, or a function
used with `runInInjectionContext`.
```
-->

**에러 코드:** NG0203

이 에러는 의존성 주입 컨텍스트 밖에서 `inject()`를 실행했을 때 발생합니다.
`inject()` 함수는 클래스 생성자나 팩토리 실행 시점에만 동기 방식으로 사용할 수 있습니다.

```
NG0203: inject() must be called from an injection context such as a
constructor, a factory function, a field initializer, or a function
used with `runInInjectionContext`.
```

<!--
#### Valid injection contexts
-->

#### 의존성 주입 컨텍스트가 유효한 경우

<!--
Angular allows `inject()` in these locations:

1. **Class field initializers**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user().name}}</p>',
   })
   export class UserProfile {
     private userService = inject(UserClient); // Valid
     user = this.userService.getUser();
   }
   ```

2. **Class constructor**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user().name}}</p>',
   })
   export class UserProfile {
     private userService: UserClient;

     constructor() {
       this.userService = inject(UserClient); // Valid
     }

     user = this.userService.getUser();
   }
   ```

3. **Provider factory functions**

   ```ts
   import {inject, InjectionToken} from '@angular/core';
   import {UserClient} from './user-client';

   export const GREETING = new InjectionToken<string>('greeting', {
     factory() {
       const userService = inject(UserClient); // Valid
       const user = userService.getUser();
       return `Hello, ${user.name}`;
     },
   });
   ```

4. **Inside runInInjectionContext()**

   ```angular-ts
   import {Component, inject, Injector} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<button (click)="loadUser()">Load User</button>',
   })
   export class UserProfile {
     private injector = inject(Injector);

     loadUser() {
       this.injector.runInInjectionContext(() => {
         const userService = inject(UserClient); // Valid
         console.log(userService.getUser());
       });
     }
   }
   ```

Other injection contexts that `inject()` also works in include:

- [provideAppInitializer](api/core/provideAppInitializer)
- [provideEnvironmentInitializer](api/core/provideEnvironmentInitializer)
- Functional [route guards](guide/routing/route-guards)
- Functional [data resolvers](guide/routing/data-resolvers)
-->

`inject()` 함수는 이런 곳에서 사용할 수 있습니다:

1. **클래스 필드를 초기화 할 때**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user().name}}</p>',
   })
   export class UserProfile {
     private userService = inject(UserClient); // 유효함
     user = this.userService.getUser();
   }
   ```

2. **클래스 생성자**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user().name}}</p>',
   })
   export class UserProfile {
     private userService: UserClient;

     constructor() {
       this.userService = inject(UserClient); // 유효함
     }

     user = this.userService.getUser();
   }
   ```

3. **프로바이더 팩토리 함수**

   ```ts
   import {inject, InjectionToken} from '@angular/core';
   import {UserClient} from './user-client';

   export const GREETING = new InjectionToken<string>('greeting', {
     factory() {
       const userService = inject(UserClient); // 유효함
       const user = userService.getUser();
       return `Hello, ${user.name}`;
     },
   });
   ```

4. **runInInjectionContext() 안쪽**

   ```angular-ts
   import {Component, inject, Injector} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<button (click)="loadUser()">Load User</button>',
   })
   export class UserProfile {
     private injector = inject(Injector);

     loadUser() {
       this.injector.runInInjectionContext(() => {
         const userService = inject(UserClient); // 유효함
         console.log(userService.getUser());
       });
     }
   }
   ```

이 밖에도 `inject()` 함수를 실행할 수 있는 의존성 컨텍스트는 더 있습니다:

- [provideAppInitializer](api/core/provideAppInitializer)
- [provideEnvironmentInitializer](api/core/provideEnvironmentInitializer)
- 함수로 정의된 [route guards](guide/routing/route-guards)
- 함수로 정의된 [data resolvers](guide/routing/data-resolvers)

<!--
#### When this error occurs
-->

#### 에러가 발생하는 경우

<!--
This error occurs when:

- Calling `inject()` in lifecycle hooks (`ngOnInit`, `ngAfterViewInit`, etc.)
- Calling `inject()` after `await` in async functions
- Calling `inject()` in callbacks (`setTimeout`, `Promise.then()`, etc.)
- Calling `inject()` outside of class construction phase

See the "Incorrect inject() usage" section for detailed examples and solutions.
-->

이런 경우는 에러가 발생합니다:

- 라이프싸이클 후킹 함수에서 `inject()` 를 실행한 경우 (`ngOnInit`, `ngAfterViewInit` 등)
- 비동기 함수에서 `await` 다음에 `inject()` 를 실행한 경우
- 콜백 함수에서 `inject()` 를 실행한 경우 (`setTimeout`, `Promise.then()` 등)
- 클래서 생성자 밖에서 `inject()` 를 실행한 경우

<!--
#### Solutions and workarounds
-->

#### 해결 방법

<!--
**Solution 1:** Capture dependencies in field initializers (most common)

```ts
private userService = inject(UserClient) // Capture at class level
```

**Solution 2:** Use `runInInjectionContext()` for callbacks

```ts
private injector = inject(Injector)

someCallback() {
  this.injector.runInInjectionContext(() => {
    const service = inject(MyClient)
  })
}
```

**Solution 3:** Pass dependencies as parameters instead of injecting them

```ts
// Instead of injecting inside a callback
setTimeout(() => {
  const service = inject(MyClient) // ERROR
}, 1000)

// Capture first, then use
private service = inject(MyClient)

setTimeout(() => {
  this.service.doSomething() // Use captured reference
}, 1000)
```
-->

**해결 방법 1:** 의존성 객체는 클래스 필드를 초기화 할 때 주입하세요.

```ts
private userService = inject(UserClient) // 클래스 계층에서 주입
```

**해결 방법 2:** 콜백 함수라면 `runInInjectionContext()` 를 사용하세요.

```ts
private injector = inject(Injector)

someCallback() {
  this.injector.runInInjectionContext(() => {
    const service = inject(MyClient)
  })
}
```

**해결 방법 3:** 의존성 객체를 직접 주입받지 말고 프로퍼티로 전달하세요.

```ts
// 콜백 안에서 의존성을 주입하는 경우
setTimeout(() => {
  const service = inject(MyClient) // 에러
}, 1000)

// 의존성을 주입을 먼저 하고 사용은 나중에 합니다
private service = inject(MyClient)

setTimeout(() => {
  this.service.doSomething() // 프로퍼티로 저장해 둔 인스턴스를 활용합니다.
}, 1000)
```

### NG0200: Circular dependency detected

<!--
**Error code:** NG0200

This error occurs when two or more services depend on each other, creating a circular dependency that Angular cannot resolve.

```
NG0200: Circular dependency in DI detected for AuthClient
  Dependency path: AuthClient -> UserClient -> AuthClient
```

The dependency path shows the cycle: `AuthClient` depends on `UserClient`, which depends back on `AuthClient`.
-->

**에러 코드:** NG0200

2개 이상의 서비스가 서로를 의존성으로 순환 참조할 때 발생합니다.

```
NG0200: Circular dependency in DI detected for AuthClient
  Dependency path: AuthClient -> UserClient -> AuthClient
```

로그를 보면 `AuthClient`는 `UserClient`를 의존성으로 요청하는데, `UserCLient`는 `AuthClient`를 의존성으로 요청하고 있습니다.

<!--
#### Understanding the error
-->

#### 에러가 발생한 이유

<!--
Angular creates service instances by calling their constructors and injecting dependencies. When services depend on each other circularly, Angular cannot determine which to create first.
-->

Angular는 서비스 클래스의 생성자를 실행하면서 서비스 인스턴스를 생성하고 의존성 객체를 주입합니다.
그런데 서비스들이 서로를 의존성 객체로 참조하면 순환 참조가 발생하면서, 어떤 서비스를 먼저 생성해야 하는지 결정할 수 없습니다.

<!--
#### Common causes
-->

#### 원인

<!--
- Direct circular dependency (Service A → Service B → Service A)
- Indirect circular dependency (Service A → Service B → Service C → Service A)
- Import cycles in module files that also have service dependencies
-->

- 두 객체가 직접 순환 참조할 때 (Service A → Service B → Service A)
- 여러 객체가 순환 참조할 때 (Service A → Service B → Service C → Service A)
- 서로 의존성 관계인 서비스가 포함된 모듈을 로드할 때

<!--
#### Resolution strategies
-->

#### 해결 방법

<!--
See the "Circular dependencies" section for detailed examples and solutions:

1. **Restructure** - Extract shared logic to a third service (recommended)
2. **Use events** - Replace direct dependencies with event-based communication
3. **Lazy injection** - Use `Injector.get()` to defer one dependency (last resort)

Do NOT use `forwardRef()` for service circular dependencies. It only solves circular imports in component configurations.
-->

의존성 순환 참조는 이렇게 해결합니다:

1. **코드를 다시 구성하세요** - 공통 로직을 별도 서비스로 분리하세요. (권장)
2. **이벤트를 활용하세요** - 의존성 객체로 직접 참조하지 말고 이벤트 기반으로 통신하세요.
3. **지연 의존성 주입을 활용하세요** - 의존성 객체 한 쪽에서 `Injector.get()` 를 사용해서 지연로딩 하세요. (최종 수단)

의존성 순환 참조를 해결하기 위해 `forwardRef()`를 **사용하지 마세요**.
이 연산자는 컴포넌트를 구성할 때 발생한 순환 참조만 해결할 수 있습니다.

<!--
### Other DI error codes
-->

### 기타 의존성 주입 에러 코드

<!--
For detailed explanations and solutions for these errors, see the [Angular error reference](errors):

| Error Code              | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| [NG0204](errors/NG0204) | Can't resolve all parameters - missing `@Injectable()` decorator                           |
| [NG0205](errors/NG0205) | Injector already destroyed - accessing services after component destruction                |
| [NG0207](errors/NG0207) | EnvironmentProviders in wrong context - using `provideHttpClient()` in component providers |
-->

아래 에러들에 대해 자세하게 알아보려면 [Angular 에러 참조](errors) 문서를 참고하세요:

| 에러 코드               | 설명                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| [NG0204](errors/NG0204) | 인자를 확인할 수 없습니다 - `@Injectable()` 데코레이터가 누락되었을 수 있습니다.                              |
| [NG0205](errors/NG0205) | 인젝터가 이미 종료되었습니다 - 컴포넌트가 종료된 후에 서비스에 접근했습니다.                                  |
| [NG0207](errors/NG0207) | EnvironmentProviders 컨텍스트가 잘못되었습니다 - 컴포넌트 프로바이더에서 `provideHttpClient()` 를 사용하세요. |

<!--
## Next steps
-->

## 다음 단계

<!--
When you encounter DI errors, remember to:

1. Read the error message and dependency path carefully
2. Verify basic configuration (decorators, `providedIn`, imports)
3. Check injection context and timing
4. Use DevTools and logging to investigate
5. Simplify and isolate the problem

For a deeper understanding of specific topics on dependency injection, check out:

- [Understanding dependency injection](guide/di) - Core DI concepts and patterns
- [Hierarchical dependency injection](guide/di/hierarchical-dependency-injection) - How the injector hierarchy works
- [Testing with dependency injection](guide/testing) - Using TestBed and mocking dependencies
-->

의존성 주입 에러를 만나면 이것을 기억하세요:

1. 어디에서 에러가 발생했는지 에러 메시지를 읽고 확인하세요.
2. 데코레이터, `providedIn`, `imports` 등 설정 구성을 확인하세요.
3. 의존성 주입 컨텍스트와 실행 시점을 확인하세요.
4. 개발자 도구를 활용하거나 로그를 활용하세요.
5. 문제를 간단하고 깔끔한 방법으로 해결하세요.

의존성 주입에 대해 더 자세하게 알아보려면, 이 문서를 참고하세요:

- [의존성 주입 이해하기](guide/di) - 의존성 주입의 핵심 개념과 패턴을 설명합니다.
- [의존성 주입 계층](guide/di/hierarchical-dependency-injection) - 인젝터 계층이 어떻게 구성되는지 설명합니다.
- [의존성 주입 테스트하기](guide/testing) - TestBed와 더미 의존성 객체를 활용하는 방법을 안내합니다.
