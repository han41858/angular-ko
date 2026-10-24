<!--
# Testing routing and navigation
-->

<a id="testing-routing-and-navigation"></a>

# 라우팅과 내비게이션 테스트하기

<!--
Testing routing and navigation is essential to ensure your application behaves correctly when users navigate between different routes. This guide covers various strategies for testing routing functionality in Angular applications.
-->

사용자가 여러 라우팅 규칙 사이를 이동할 때 애플리케이션이 올바르게 동작하는지 확인하려면 라우팅과 내비게이션 테스트가 필요합니다.
이 문서는 Angular 애플리케이션의 라우팅 기능을 테스트하는 여러 전략을 설명합니다.

<!--
## Prerequisites
-->

<a id="prerequisites"></a>

## 사전지식

<!--
This guide assumes you are familiar with the following tools and libraries:

- **[Vitest](https://vitest.dev/)** - JavaScript testing framework that provides the testing syntax (`describe`, `it`, `expect`)
- **[Angular Testing Utilities](guide/testing)** - Angular's built-in testing tools ([`TestBed`](api/core/testing/TestBed), [`ComponentFixture`](api/core/testing/ComponentFixture))
- **[`RouterTestingHarness`](api/router/testing/RouterTestingHarness)** - Test harness for testing routed components with built-in navigation and component testing capabilities
-->

이 문서는 다음 도구와 라이브러리에 익숙하다고 가정합니다.

- **[Vitest](https://vitest.dev/)** — 테스트 문법(`describe`, `it`, `expect`)을 제공하는 JavaScript 테스트 프레임워크
- **[Angular 테스트 유틸리티](guide/testing)** — Angular의 내장 테스트 도구([`TestBed`](api/core/testing/TestBed), [`ComponentFixture`](api/core/testing/ComponentFixture))
- **[`RouterTestingHarness`](api/router/testing/RouterTestingHarness)** — 내비게이션과 컴포넌트 테스트 기능이 내장된, 라우팅 컴포넌트 테스트용 하네스

<!--
## Testing scenarios
-->

<a id="testing-scenarios"></a>

## 테스트 시나리오

<!--
### Route parameters
-->

<a id="route-parameters"></a>

### 라우팅 규칙 파라미터

<!--
Components often rely on route parameters from the URL to fetch data, like a user ID for a profile page.

The following example shows how to test a `UserProfile` component that displays a user ID from the route.

```ts { header: 'user-profile.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {UserProfile} from './user-profile';

describe('UserProfile', () => {
  it('should display user ID from route parameters', async () => {
    TestBed.configureTestingModule({
      imports: [UserProfile],
      providers: [provideRouter([{path: 'user/:id', component: UserProfile}])],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/user/123', UserProfile);

    expect(harness.routeNativeElement?.textContent).toContain('User Profile: 123');
  });
});
```

```angular-ts {header: 'user-profile.ts'}
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: '<h1>User Profile: {{userId}}</h1>',
})
export class UserProfile {
  private route = inject(ActivatedRoute);
  userId: string | null = this.route.snapshot.paramMap.get('id');
}
```
-->

컴포넌트는 프로필 페이지의 사용자 ID처럼 URL의 라우팅 규칙 파라미터를 사용해서 데이터를 가져오는 경우가 많습니다.

다음 예제는 라우팅 규칙의 사용자 ID를 표시하는 `UserProfile` 컴포넌트를 테스트합니다.

```ts { header: 'user-profile.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {UserProfile} from './user-profile';

describe('UserProfile', () => {
  it('should display user ID from route parameters', async () => {
    TestBed.configureTestingModule({
      imports: [UserProfile],
      providers: [provideRouter([{path: 'user/:id', component: UserProfile}])],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/user/123', UserProfile);

    expect(harness.routeNativeElement?.textContent).toContain('User Profile: 123');
  });
});
```

```angular-ts {header: 'user-profile.ts'}
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: '<h1>User Profile: {{userId}}</h1>',
})
export class UserProfile {
  private route = inject(ActivatedRoute);
  userId: string | null = this.route.snapshot.paramMap.get('id');
}
```

<!--
### Route guards
-->

<a id="route-guards"></a>

### 라우팅 규칙 가드

<!--
Route guards control access to routes based on conditions like authentication or permissions. When testing guards, focus on mocking dependencies and verifying navigation outcomes.

The following example tests an `authGuard` that allows navigation for authenticated users and redirects unauthenticated users to a login page.

```ts {header: 'auth.guard.spec.ts'}
import {describe, expect, it, vi, type Mocked} from 'vitest';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter, Router} from '@angular/router';
import {authGuard} from './auth.guard';
import {AuthStore} from './auth-store';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({template: '<h1>Protected Page</h1>'})
class Protected {}

@Component({template: '<h1>Login Page</h1>'})
class Login {}

describe('authGuard', () => {
  let authStore: Mocked<AuthStore>;
  let harness: RouterTestingHarness;

  async function setup(isAuthenticated: boolean) {
    authStore = {isAuthenticated: vi.fn().mockReturnValue(isAuthenticated)} as Mocked<AuthStore>;

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthStore, useValue: authStore},
        provideRouter([
          {path: 'protected', component: Protected, canActivate: [authGuard]},
          {path: 'login', component: Login},
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  }

  it('allows navigation when user is authenticated', async () => {
    await setup(true);
    await harness.navigateByUrl('/protected', Protected);
    // The protected component should render when authenticated
    expect(harness.routeNativeElement?.textContent).toContain('Protected Page');
  });

  it('redirects to login when user is not authenticated', async () => {
    await setup(false);
    await harness.navigateByUrl('/protected', Login);
    // The login component should render after redirect
    expect(harness.routeNativeElement?.textContent).toContain('Login Page');
  });
});
```

```ts {header: 'auth.guard.ts'}
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthStore} from './auth-store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  return authStore.isAuthenticated() ? true : router.parseUrl('/login');
};
```
-->

라우팅 규칙 가드는 인증이나 권한 같은 조건에 따라 라우팅 규칙 접근을 제어합니다.
가드를 테스트할 때는 의존성 모킹과 내비게이션 결과 확인에 집중하세요.

다음 예제는 인증된 사용자의 내비게이션은 허용하고 인증되지 않은 사용자는 로그인 페이지로 리다이렉트하는 `authGuard`를 테스트합니다.

```ts {header: 'auth.guard.spec.ts'}
import {describe, expect, it, vi, type Mocked} from 'vitest';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter, Router} from '@angular/router';
import {authGuard} from './auth.guard';
import {AuthStore} from './auth-store';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({template: '<h1>Protected Page</h1>'})
class Protected {}

@Component({template: '<h1>Login Page</h1>'})
class Login {}

describe('authGuard', () => {
  let authStore: Mocked<AuthStore>;
  let harness: RouterTestingHarness;

  async function setup(isAuthenticated: boolean) {
    authStore = {isAuthenticated: vi.fn().mockReturnValue(isAuthenticated)} as Mocked<AuthStore>;

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthStore, useValue: authStore},
        provideRouter([
          {path: 'protected', component: Protected, canActivate: [authGuard]},
          {path: 'login', component: Login},
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  }

  it('allows navigation when user is authenticated', async () => {
    await setup(true);
    await harness.navigateByUrl('/protected', Protected);
    // 인증되었으면 보호된 컴포넌트가 렌더링되어야 합니다.
    expect(harness.routeNativeElement?.textContent).toContain('Protected Page');
  });

  it('redirects to login when user is not authenticated', async () => {
    await setup(false);
    await harness.navigateByUrl('/protected', Login);
    // 리다이렉트 후 로그인 컴포넌트가 렌더링되어야 합니다.
    expect(harness.routeNativeElement?.textContent).toContain('Login Page');
  });
});
```

```ts {header: 'auth.guard.ts'}
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthStore} from './auth-store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  return authStore.isAuthenticated() ? true : router.parseUrl('/login');
};
```

<!--
### Router outlets
-->

<a id="router-outlets"></a>

### 라우터 아웃렛

<!--
Router outlet tests are more of an integration test since you're essentially testing the integration between the [`Router`](api/router/Router), the outlet, and the components being displayed.

Here's an example of how to set up a test that verifies different components are displayed for different routes:

```ts {header: 'app.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter} from '@angular/router';
import {Component} from '@angular/core';
import {App} from './app';

@Component({
  template: '<h1>Home Page</h1>',
})
class MockHome {}

@Component({
  template: '<h1>About Page</h1>',
})
class MockAbout {}

describe('App Router Outlet', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          {path: '', component: MockHome},
          {path: 'about', component: MockAbout},
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should display home component for default route', async () => {
    await harness.navigateByUrl('');

    expect(harness.routeNativeElement?.textContent).toContain('Home Page');
  });

  it('should display about component for about route', async () => {
    await harness.navigateByUrl('/about');

    expect(harness.routeNativeElement?.textContent).toContain('About Page');
  });
});
```

```angular-ts {header: 'app.ts'}
import {Component} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet />
  `,
})
export class App {}
```
-->

라우터 아웃렛 테스트는 [`Router`](api/router/Router), 아웃렛, 표시되는 컴포넌트가 함께 동작하는지 확인하므로 통합 테스트에 가깝습니다.

다음 예제는 라우팅 규칙마다 서로 다른 컴포넌트가 표시되는지 확인하는 테스트를 구성합니다.

```ts {header: 'app.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter} from '@angular/router';
import {Component} from '@angular/core';
import {App} from './app';

@Component({
  template: '<h1>Home Page</h1>',
})
class MockHome {}

@Component({
  template: '<h1>About Page</h1>',
})
class MockAbout {}

describe('App Router Outlet', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          {path: '', component: MockHome},
          {path: 'about', component: MockAbout},
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should display home component for default route', async () => {
    await harness.navigateByUrl('');

    expect(harness.routeNativeElement?.textContent).toContain('Home Page');
  });

  it('should display about component for about route', async () => {
    await harness.navigateByUrl('/about');

    expect(harness.routeNativeElement?.textContent).toContain('About Page');
  });
});
```

```angular-ts {header: 'app.ts'}
import {Component} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet />
  `,
})
export class App {}
```

<!--
### Nested routes
-->

<a id="nested-routes"></a>

### 중첩 라우팅 규칙

<!--
Testing nested routes ensures that both the parent and child components render correctly when navigating to nested URLs. This is important because nested routes involve multiple layers.

You need to verify that:

1. The parent component renders properly.
2. The child component renders within it.
3. Ensure that both components can access their respective route data.

Here's an example of testing a parent-child route structure:

```ts {header: 'nested-routes.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter} from '@angular/router';
import {Parent, Child} from './nested-components';

describe('Nested Routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Parent, Child],
      providers: [
        provideRouter([
          {
            path: 'parent',
            component: Parent,
            children: [{path: 'child', component: Child}],
          },
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should render parent and child components for nested route', async () => {
    await harness.navigateByUrl('/parent/child');

    expect(harness.routeNativeElement?.textContent).toContain('Parent Component');
    expect(harness.routeNativeElement?.textContent).toContain('Child Component');
  });
});
```

```angular-ts {header: 'nested.ts'}
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  imports: [RouterOutlet],
  template: `
    <h1>Parent Component</h1>
    <router-outlet />
  `,
})
export class Parent {}

@Component({
  template: '<h2>Child Component</h2>',
})
export class Child {}
```
-->

중첩 라우팅 규칙 테스트는 중첩 URL로 이동할 때 부모와 자식 컴포넌트가 모두 올바르게 렌더링되는지 확인합니다.
중첩 라우팅 규칙에는 여러 계층이 있으므로 이 확인이 중요합니다.

다음 내용을 확인해야 합니다.

1. 부모 컴포넌트가 정상적으로 렌더링됩니다.
2. 부모 안에 자식 컴포넌트가 렌더링됩니다.
3. 두 컴포넌트가 각자의 라우팅 규칙 데이터에 접근할 수 있습니다.

다음 예제는 부모와 자식 라우팅 규칙 구조를 테스트합니다.

```ts {header: 'nested-routes.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideRouter} from '@angular/router';
import {Parent, Child} from './nested-components';

describe('Nested Routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Parent, Child],
      providers: [
        provideRouter([
          {
            path: 'parent',
            component: Parent,
            children: [{path: 'child', component: Child}],
          },
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should render parent and child components for nested route', async () => {
    await harness.navigateByUrl('/parent/child');

    expect(harness.routeNativeElement?.textContent).toContain('Parent Component');
    expect(harness.routeNativeElement?.textContent).toContain('Child Component');
  });
});
```

```angular-ts {header: 'nested.ts'}
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  imports: [RouterOutlet],
  template: `
    <h1>Parent Component</h1>
    <router-outlet />
  `,
})
export class Parent {}

@Component({
  template: '<h2>Child Component</h2>',
})
export class Child {}
```

<!--
### Query parameters and fragments
-->

<a id="query-parameters-and-fragments"></a>

### 쿼리 파라미터와 프래그먼트

<!--
Query parameters (like `?search=angular&category=web`) and URL fragments (like `#section1`) provide additional data through the URL that doesn't affect which component loads, but does affect how the component behaves. Components that read query parameters through [`ActivatedRoute.queryParams`](api/router/ActivatedRoute#queryParams) need to be tested to ensure they handle different parameter scenarios correctly.

Unlike route parameters that are part of the route definition, query parameters are optional and can change without triggering route navigation. This means you need to test both the initial loading and the reactive updates when query parameters change.

Here's an example of how to test query parameters and fragments:

```ts {header: 'search.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {Router, provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {Search} from './search';

describe('Search', () => {
  let component: Search;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Search],
      providers: [provideRouter([{path: 'search', component: Search}])],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should read search term from query parameters', async () => {
    component = await harness.navigateByUrl('/search?q=angular', Search);

    expect(component.searchTerm()).toBe('angular');
  });
});
```

```angular-ts {header: 'search.ts'}
import {Component, inject, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  template: '<div>Search term: {{searchTerm()}}</div>',
})
export class Search {
  private route = inject(ActivatedRoute);
  private queryParams = toSignal(this.route.queryParams, {initialValue: {}});

  searchTerm = computed(() => this.queryParams()['q'] || null);
}
```
-->

쿼리 파라미터(예: `?search=angular&category=web`)와 URL 프래그먼트(예: `#section1`)는 URL로 추가 데이터를 전달합니다.
어떤 컴포넌트를 로드할지에는 영향을 주지 않지만 컴포넌트 동작에는 영향을 줍니다.
[`ActivatedRoute.queryParams`](api/router/ActivatedRoute#queryParams)로 쿼리 파라미터를 읽는 컴포넌트는 여러 파라미터 상황을 올바르게 처리하는지 테스트해야 합니다.

라우팅 규칙 정의의 일부인 라우팅 규칙 파라미터와 달리, 쿼리 파라미터는 선택 사항이며 라우팅 규칙 내비게이션 없이도 바뀔 수 있습니다.
따라서 초기 로딩과 쿼리 파라미터가 바뀔 때의 반응형 갱신을 모두 테스트해야 합니다.

다음 예제는 쿼리 파라미터와 프래그먼트를 테스트합니다.

```ts {header: 'search.spec.ts'}
import {TestBed} from '@angular/core/testing';
import {Router, provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {Search} from './search';

describe('Search', () => {
  let component: Search;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Search],
      providers: [provideRouter([{path: 'search', component: Search}])],
    });

    harness = await RouterTestingHarness.create();
  });

  it('should read search term from query parameters', async () => {
    component = await harness.navigateByUrl('/search?q=angular', Search);

    expect(component.searchTerm()).toBe('angular');
  });
});
```

```angular-ts {header: 'search.ts'}
import {Component, inject, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  template: '<div>Search term: {{searchTerm()}}</div>',
})
export class Search {
  private route = inject(ActivatedRoute);
  private queryParams = toSignal(this.route.queryParams, {initialValue: {}});

  searchTerm = computed(() => this.queryParams()['q'] || null);
}
```

<!--
## Best practices for router testing
-->

<a id="best-practices-for-router-testing"></a>

## 라우터 테스트 권장사항

<!--
1. **Use RouterTestingHarness** - For testing routed components, use [`RouterTestingHarness`](api/router/testing/RouterTestingHarness) which provides a cleaner API and eliminates the need for test host components. It offers direct component access, built-in navigation, and better type safety. However, it isn't as suitable for some scenarios, such as testing named outlets, where you may need to create custom host components.
2. **Handle external dependencies thoughtfully** - Prefer real implementations when possible for more realistic tests. If real implementations aren't feasible (e.g., external APIs), use fakes that approximate the real behavior. Use mocks or stubs only as a last resort, as they can make tests brittle and less reliable.
3. **Test navigation state** - Verify both the navigation action and the resulting application state, including URL changes and component rendering.
4. **Handle asynchronous operations** - Router navigation is asynchronous. Use `async/await` to properly handle timing in your tests.
5. **Test error scenarios** - Include tests for invalid routes, failed navigation, and guard rejections to ensure your application handles edge cases gracefully.
6. **Do not mock Angular Router** - Instead, provide real route configurations and use the harness to navigate. This makes your tests more robust and less likely to break on internal Angular updates, while also ensuring you catch real issues when the router updates since mocks can hide breaking changes.
-->

1. **RouterTestingHarness를 사용하세요** — 라우팅된 컴포넌트를 테스트할 때는 [`RouterTestingHarness`](api/router/testing/RouterTestingHarness)를 사용하세요.
   API가 간단하며 테스트용 호스트 컴포넌트가 필요하지 않습니다.
   컴포넌트에 직접 접근할 수 있고 내비게이션 기능이 내장되어 있으며 타입 안전성도 높습니다.
   다만 이름이 있는 아웃렛을 테스트하는 경우처럼 적합하지 않은 상황에서는 커스텀 호스트 컴포넌트가 필요할 수 있습니다.
2. **외부 의존성을 신중하게 다루세요** — 현실적인 테스트를 위해 가능하면 실제 구현을 사용하세요.
   외부 API처럼 실제 구현을 사용하기 어렵다면 실제 동작에 가까운 가짜 구현(fake)을 사용하세요.
   목(mock)과 스텁(stub)은 테스트를 쉽게 깨지게 하고 신뢰성을 낮출 수 있으므로 마지막 수단으로 사용하세요.
3. **내비게이션 상태를 테스트하세요** — 내비게이션 동작과 그 결과인 애플리케이션 상태를 모두 확인하세요.
   URL 변경과 컴포넌트 렌더링도 포함합니다.
4. **비동기 작업을 처리하세요** — 라우터 내비게이션은 비동기입니다.
   테스트에서 `async/await`로 실행 시점을 올바르게 처리하세요.
5. **오류 상황을 테스트하세요** — 유효하지 않은 라우팅 규칙, 내비게이션 실패, 가드의 거부를 테스트해서 애플리케이션이 예외 상황을 적절하게 처리하는지 확인하세요.
6. **Angular 라우터를 모킹하지 마세요** — 실제 라우팅 규칙 설정을 제공하고 하네스로 이동하세요.
   이 방식은 테스트를 견고하게 만들고 Angular 내부 변경으로 테스트가 깨질 가능성을 줄입니다.
   목은 호환성을 깨뜨리는 변경을 가릴 수 있으므로, 실제 라우터를 사용하면 라우터 갱신 시 발생하는 실제 문제도 발견할 수 있습니다.
