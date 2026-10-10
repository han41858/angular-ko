<!--
# Define routes
-->

<a id="define-routes"></a>

# 라우팅 규칙 정의하기

<!--
Routes serve as the fundamental building blocks for navigation within an Angular app.
-->

라우팅 규칙은 Angular 애플리케이션 내비게이션의 기본 구성 요소입니다.

<!--
## What are routes?
-->

<a id="what-are-routes"></a>

## 라우팅 규칙이란?

<!--
In Angular, a **route** is an object that defines which component should render for a specific URL path or pattern, as well as additional configuration options about what happens when a user navigates to that URL.

Here is a basic example of a route:

```ts
import {AdminPage} from './app-admin';

const adminPage = {
  path: 'admin',
  component: AdminPage,
};
```

For this route, when a user visits the `/admin` path, the app will display the `AdminPage` component.
-->

Angular에서 **라우팅 규칙**은 특정 URL 경로나 패턴에 어떤 컴포넌트를 렌더링할지 정의하는 객체입니다.
사용자가 해당 URL로 이동했을 때 동작을 정하는 추가 설정도 포함합니다.

다음은 기본적인 라우팅 규칙 예제입니다.

```ts
import {AdminPage} from './app-admin';

const adminPage = {
  path: 'admin',
  component: AdminPage,
};
```

이 라우팅 규칙에서는 사용자가 `/admin` 경로에 방문하면 애플리케이션이 `AdminPage` 컴포넌트를 표시합니다.

<!--
### Managing routes in your application
-->

<a id="managing-routes-in-your-application"></a>

### 애플리케이션의 라우팅 규칙 관리하기

<!--
Most projects define routes in a separate file that contains `routes` in the filename.

A collection of routes looks like this:

```ts
import {Routes} from '@angular/router';
import {HomePage} from './home-page';
import {AdminPage} from './about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
];
```

Tip: If you generated a project with Angular CLI, your routes are defined in `src/app/app.routes.ts`.
-->

대부분의 프로젝트에서는 파일 이름에 `routes`가 포함된 별도 파일에 라우팅 규칙을 정의합니다.

라우팅 규칙 모음은 다음과 같은 형태입니다.

```ts
import {Routes} from '@angular/router';
import {HomePage} from './home-page';
import {AdminPage} from './about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
];
```

팁: Angular CLI로 생성한 프로젝트의 라우팅 규칙은 `src/app/app.routes.ts`에 정의되어 있습니다.

<!--
### Adding the router to your application
-->

<a id="adding-the-router-to-your-application"></a>

### 애플리케이션에 라우터 추가하기

<!--
When bootstrapping an Angular application without the Angular CLI, you can pass a configuration object that includes a `providers` array.

Inside of the `providers` array, you can add the Angular router to your application by adding a `provideRouter` function call with your routes.

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // ...
  ],
};
```
-->

Angular CLI를 사용하지 않고 Angular 애플리케이션을 부트스트랩할 때는 `providers` 배열이 있는 설정 객체를 전달할 수 있습니다.

이 `providers` 배열에 라우팅 규칙을 인자로 전달한 `provideRouter` 함수 호출을 추가하면 애플리케이션에 Angular 라우터가 추가됩니다.

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // ...
  ],
};
```

<!--
## Route URL Paths
-->

<a id="route-url-paths"></a>

## 라우팅 규칙 URL 경로

<!--
### Static URL Paths
-->

<a id="static-url-paths"></a>

### 정적 URL 경로

<!--
Static URL Paths refer to routes with predefined paths that don't change based on dynamic parameters. These are routes that match a `path` string exactly and have a fixed outcome.

Examples of this include:

- "/admin"
- "/blog"
- "/settings/account"
-->

정적 URL 경로는 동적 파라미터에 따라 바뀌지 않고 미리 정의된 경로를 사용하는 라우팅 규칙입니다.
`path` 문자열과 정확히 매칭되며 결과가 정해져 있습니다.

예를 들면 다음과 같습니다.

- "/admin"
- "/blog"
- "/settings/account"

<!--
### Define URL Paths with Route Parameters
-->

<a id="define-url-paths-with-route-parameters"></a>

### 라우팅 규칙 파라미터로 URL 경로 정의하기

<!--
Parameterized URLs allow you to define dynamic paths that allow multiple URLs to the same component while dynamically displaying data based on parameters in the URL.

You can define this type of pattern by adding parameters to your route’s `path` string and prefixing each parameter with the colon (`:`) character.

IMPORTANT: Parameters are distinct from information in the URL's [query string](https://en.wikipedia.org/wiki/Query_string).
Learn more about [query parameters in Angular in this guide](/guide/routing/read-route-state#query-parameters).

The following example displays a user profile component based on the user id passed in through the URL.

```ts
import {Routes} from '@angular/router';
import {UserProfile} from './user-profile/user-profile';

const routes: Routes = [{path: 'user/:id', component: UserProfile}];
```

In this example, URLs such as `/user/leeroy` and `/user/jenkins` render the `UserProfile` component. This component can then read the `id` parameter and use it to perform additional work, such as fetching data. See [reading route state guide](/guide/routing/read-route-state) for details on reading route parameters.

Valid route parameter names must start with a letter (a-z, A-Z) and can only contain:

- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscore (\_)
- Hyphen (-)

You can also define paths with multiple parameters:

```ts
import {Routes} from '@angular/router';
import {UserProfile} from './user-profile';
import {SocialMediaFeed} from './social-media-feed';

const routes: Routes = [
  {path: 'user/:id/:social-media', component: SocialMediaFeed},
  {path: 'user/:id/', component: UserProfile},
];
```

With this new path, users can visit `/user/leeroy/youtube` and `/user/leeroy/bluesky` and see respective social media feeds based on the parameter for the user leeroy.

See [Reading route state](/guide/routing/read-route-state) for details on reading route parameters.
-->

파라미터가 있는 URL을 사용하면 여러 URL에서 같은 컴포넌트를 사용하면서 URL 파라미터에 따라 데이터를 동적으로 표시하는 경로를 정의할 수 있습니다.

라우팅 규칙의 `path` 문자열에 파라미터를 추가하고 각 파라미터 앞에 콜론(`:`)을 붙이면 이런 패턴을 정의할 수 있습니다.

중요: 이 파라미터는 URL의 [쿼리 문자열](https://en.wikipedia.org/wiki/Query_string)에 있는 정보와 다릅니다.
자세한 내용은 [Angular 쿼리 파라미터](/guide/routing/read-route-state#query-parameters)를 참고하세요.

다음 예제는 URL로 전달한 사용자 ID를 기준으로 사용자 프로필 컴포넌트를 표시합니다.

```ts
import {Routes} from '@angular/router';
import {UserProfile} from './user-profile/user-profile';

const routes: Routes = [{path: 'user/:id', component: UserProfile}];
```

이 예제에서 `/user/leeroy`, `/user/jenkins` 같은 URL은 `UserProfile` 컴포넌트를 렌더링합니다.
이 컴포넌트는 `id` 파라미터를 읽고 데이터를 가져오는 등의 추가 작업에 사용할 수 있습니다.
라우팅 규칙 파라미터를 읽는 자세한 방법은 [라우팅 규칙 상태 읽기](/guide/routing/read-route-state) 문서를 참고하세요.

유효한 라우팅 규칙 파라미터 이름은 영문자(a-z, A-Z)로 시작해야 하며, 다음 문자만 사용할 수 있습니다.

- 영문자(a-z, A-Z)
- 숫자(0-9)
- 밑줄(\_)
- 하이픈(-)

파라미터가 여러 개 있는 경로도 정의할 수 있습니다.

```ts
import {Routes} from '@angular/router';
import {UserProfile} from './user-profile';
import {SocialMediaFeed} from './social-media-feed';

const routes: Routes = [
  {path: 'user/:id/:social-media', component: SocialMediaFeed},
  {path: 'user/:id/', component: UserProfile},
];
```

이 경로를 사용하면 `/user/leeroy/youtube`, `/user/leeroy/bluesky`에 방문해서 leeroy 사용자의 각 소셜 미디어 피드를 파라미터에 따라 표시할 수 있습니다.

라우팅 규칙 파라미터를 읽는 자세한 방법은 [라우팅 규칙 상태 읽기](/guide/routing/read-route-state)를 참고하세요.

<!--
### Wildcards
-->

<a id="wildcards"></a>

### 와일드카드

<!--
When you need to catch all routes for a specific path, the solution is a wildcard route which is defined with the double asterisk (`**`).

A common example is defining a Page Not Found component.

```ts
import {Home} from './home/home';
import {UserProfile} from './user-profile';
import {NotFound} from './not-found';

const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'user/:id', component: UserProfile},
  {path: '**', component: NotFound},
];
```

In this routes array, the app displays the `NotFound` component when the user visits any path outside of `home` and `user/:id`.

Tip: Wildcard routes are typically placed at the end of a routes array.
-->

특정 경로의 모든 라우팅 규칙을 처리해야 한다면 별표 두 개(`**`)로 정의하는 와일드카드 라우팅 규칙을 사용하세요.

페이지를 찾을 수 없을 때 표시할 컴포넌트를 정의하는 경우에 자주 사용합니다.

```ts
import {Home} from './home/home';
import {UserProfile} from './user-profile';
import {NotFound} from './not-found';

const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'user/:id', component: UserProfile},
  {path: '**', component: NotFound},
];
```

이 라우팅 규칙 배열에서는 사용자가 `home`, `user/:id` 외의 경로에 방문하면 `NotFound` 컴포넌트를 표시합니다.

팁: 와일드카드 라우팅 규칙은 일반적으로 라우팅 규칙 배열의 마지막에 배치합니다.

<!--
## How Angular matches URLs
-->

<a id="how-angular-matches-urls"></a>

## Angular의 URL 매칭 방식

<!--
When you define routes, the order is important because Angular uses a first-match wins strategy. This means that once Angular matches a URL with a route `path`, it stops checking any further routes. As a result, always put more specific routes before less specific routes.

The following example shows routes defined from most-specific to least specific:

```ts
const routes: Routes = [
  {path: '', component: Home}, // Empty path
  {path: 'users/new', component: NewUser}, // Static, most specific
  {path: 'users/:id', component: UserDetail}, // Dynamic
  {path: 'users', component: Users}, // Static, less specific
  {path: '**', component: NotFound}, // Wildcard - always last
];
```

If a user visits `/users/new`, Angular router would go through the following steps:

1. Checks `''` - doesn't match
1. Checks `users/new` - matches! Stops here
1. Never reaches `users/:id` even though it could match
1. Never reaches `users`
1. Never reaches `**`
-->

Angular는 처음 매칭되는 라우팅 규칙을 선택하기 때문에 라우팅 규칙을 정의하는 순서가 중요합니다.
URL과 라우팅 규칙의 `path`가 매칭되면 그 뒤의 라우팅 규칙은 더 이상 확인하지 않습니다.
따라서 항상 구체적인 라우팅 규칙을 덜 구체적인 라우팅 규칙보다 먼저 배치하세요.

다음 예제는 가장 구체적인 라우팅 규칙부터 덜 구체적인 라우팅 규칙 순서로 정의합니다.

```ts
const routes: Routes = [
  {path: '', component: Home}, // 빈 경로
  {path: 'users/new', component: NewUser}, // 정적 경로이며 가장 구체적입니다.
  {path: 'users/:id', component: UserDetail}, // 동적 경로
  {path: 'users', component: Users}, // 정적 경로이며 덜 구체적입니다.
  {path: '**', component: NotFound}, // 와일드카드는 항상 마지막에 배치합니다.
];
```

사용자가 `/users/new`에 방문하면 Angular 라우터는 다음과 같이 처리합니다.

1. `''`를 확인합니다.
   일치하지 않습니다.
1. `users/new`를 확인합니다.
   일치하므로 여기서 멈춥니다.
1. `users/:id`도 일치할 수 있지만 확인하지 않습니다.
1. `users`는 확인하지 않습니다.
1. `**`는 확인하지 않습니다.

<!--
## Redirects
-->

<a id="redirects"></a>

## 리다이렉트

<!--
You can define a route that redirects to another route instead of rendering a component:

```ts
import {Blog} from './home/blog';

const routes: Routes = [
  {
    path: 'articles',
    redirectTo: '/blog',
  },
  {
    path: 'blog',
    component: Blog,
  },
];
```

If you modify or remove a route, some users may still click on out-of-date links or bookmarks to that route. You can add a redirect to direct those users to an appropriate alternative route instead of a "not found" page.
-->

컴포넌트를 렌더링하는 대신 다른 라우팅 규칙으로 리다이렉트하는 라우팅 규칙을 정의할 수 있습니다.

```ts
import {Blog} from './home/blog';

const routes: Routes = [
  {
    path: 'articles',
    redirectTo: '/blog',
  },
  {
    path: 'blog',
    component: Blog,
  },
];
```

라우팅 규칙을 수정하거나 제거해도 사용자는 해당 라우팅 규칙의 이전 링크나 북마크를 클릭할 수 있습니다.
리다이렉트를 추가하면 "페이지를 찾을 수 없음" 화면 대신 적절한 대체 라우팅 규칙으로 안내할 수 있습니다.

<!--
## Page titles
-->

<a id="page-titles"></a>

## 페이지 제목

<!--
You can associate a **title** with each route. Angular automatically updates the [page title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) when a route activates. Always define appropriate page titles for your application, as these titles are necessary to create an accessible experience.

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {About} from './about';
import {Products} from './products';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: About,
    title: 'About Us',
  },
];
```

The page `title` property can be set dynamically to a resolver function using [`ResolveFn`](/api/router/ResolveFn).

```ts
const titleResolver: ResolveFn<string> = (route) => route.queryParams['id'];
const routes: Routes = [
  ...{
    path: 'products',
    component: Products,
    title: titleResolver,
  },
];
```

Route titles can also be set via a service extending the [`TitleStrategy`](/api/router/TitleStrategy) abstract class. By default, Angular uses the [`DefaultTitleStrategy`](/api/router/DefaultTitleStrategy).
-->

각 라우팅 규칙에 **제목**을 지정할 수 있습니다.
Angular는 라우팅 규칙이 활성화되면 [페이지 제목](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)을 자동으로 갱신합니다.
페이지 제목은 접근성에 필요하기 때문에 애플리케이션에 항상 적절한 제목을 정의하세요.

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {About} from './about';
import {Products} from './products';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: About,
    title: 'About Us',
  },
];
```

페이지의 `title` 프로퍼티에는 [`ResolveFn`](/api/router/ResolveFn)을 사용하는 리졸버 함수를 지정해서 제목을 동적으로 설정할 수도 있습니다.

```ts
const titleResolver: ResolveFn<string> = (route) => route.queryParams['id'];
const routes: Routes = [
  ...{
    path: 'products',
    component: Products,
    title: titleResolver,
  },
];
```

[`TitleStrategy`](/api/router/TitleStrategy) 추상 클래스를 상속하는 서비스로 라우팅 규칙 제목을 설정할 수도 있습니다.
Angular는 기본적으로 [`DefaultTitleStrategy`](/api/router/DefaultTitleStrategy)를 사용합니다.

<!--
### Using TitleStrategy for page titles
-->

<a id="using-titlestrategy-for-page-titles"></a>

### TitleStrategy로 페이지 제목 설정하기

<!--
For advanced scenarios where you need centralized control over how the document title is composed, implement a `TitleStrategy`.

`TitleStrategy` is a token you can provide to override the default title strategy used by Angular. You can supply a custom `TitleStrategy` to implement conventions such as adding an application suffix, formatting titles from breadcrumbs, or generating titles dynamically from route data.

```ts
import {inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleStrategy, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    // PageTitle is equal to the "Title" of a route if it's set
    // If its not set it will use the "title" given in index.html
    const pageTitle = this.buildTitle(snapshot) || this.title.getTitle();
    this.title.setTitle(`MyAwesomeApp - ${pageTitle}`);
  }
}
```

To use the custom strategy, provide it with the `TitleStrategy` token at the application level:

```ts
import {provideRouter, TitleStrategy} from '@angular/router';
import {AppTitleStrategy} from './app-title.strategy';

export const appConfig = {
  providers: [provideRouter(routes), {provide: TitleStrategy, useClass: AppTitleStrategy}],
};
```
-->

문서 제목을 구성하는 방식을 한곳에서 제어해야 하는 복잡한 경우에는 `TitleStrategy`를 구현하세요.

`TitleStrategy`는 Angular의 기본 제목 전략을 교체할 때 제공하는 토큰입니다.
커스텀 `TitleStrategy`를 제공하면 제목 끝에 애플리케이션 이름을 붙이거나, 탐색 경로로 제목을 구성하거나, 라우팅 규칙 데이터를 사용해서 제목을 동적으로 생성하는 등의 규칙을 구현할 수 있습니다.

```ts
import {inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleStrategy, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    // 라우팅 규칙에 "Title"이 설정되어 있으면 PageTitle은 그 값과 같습니다.
    // 설정되어 있지 않으면 index.html의 "title"을 사용합니다.
    const pageTitle = this.buildTitle(snapshot) || this.title.getTitle();
    this.title.setTitle(`MyAwesomeApp - ${pageTitle}`);
  }
}
```

커스텀 전략을 사용하려면 애플리케이션 수준에서 `TitleStrategy` 토큰으로 제공하세요.

```ts
import {provideRouter, TitleStrategy} from '@angular/router';
import {AppTitleStrategy} from './app-title.strategy';

export const appConfig = {
  providers: [provideRouter(routes), {provide: TitleStrategy, useClass: AppTitleStrategy}],
};
```

<!--
## Route-level providers for dependency injection
-->

<a id="route-level-providers-for-dependency-injection"></a>

## 의존성 주입을 위한 라우팅 규칙 수준 프로바이더

<!--
Each route has a `providers` property that lets you provide dependencies to that route's content via [dependency injection](/guide/di).

Common scenarios where this can be helpful include applications that have different services based on whether the user is an admin or not.

```ts
export const ROUTES: Route[] = [
  {
    path: 'admin',
    providers: [AdminService, {provide: ADMIN_API_KEY, useValue: '12345'}],
    children: [
      {path: 'users', component: AdminUsers},
      {path: 'teams', component: AdminTeams},
    ],
  },
  // ... other application routes that don't
  //     have access to ADMIN_API_KEY or AdminService.
];
```

In this code sample, the `admin` path contains a protected data property of `ADMIN_API_KEY` that is only available to children within its section. As a result, no other paths will be able to access the data provided via `ADMIN_API_KEY`.

See the [Dependency injection guide](/guide/di) for more information about providers and injection in Angular.
-->

각 라우팅 규칙의 `providers` 프로퍼티를 사용하면 [의존성 주입](/guide/di)으로 해당 라우팅 규칙의 내용에 의존성을 제공할 수 있습니다.

사용자의 관리자 여부에 따라 서로 다른 서비스를 사용하는 애플리케이션에서 유용합니다.

```ts
export const ROUTES: Route[] = [
  {
    path: 'admin',
    providers: [AdminService, {provide: ADMIN_API_KEY, useValue: '12345'}],
    children: [
      {path: 'users', component: AdminUsers},
      {path: 'teams', component: AdminTeams},
    ],
  },
  // ... 다른 애플리케이션 라우팅 규칙에서는
  //     ADMIN_API_KEY나 AdminService에 접근할 수 없습니다.
];
```

이 코드에서 `admin` 경로에는 해당 영역의 자식에서만 사용할 수 있는 `ADMIN_API_KEY` 데이터 프로퍼티가 있습니다.
따라서 다른 경로에서는 `ADMIN_API_KEY`로 제공하는 데이터에 접근할 수 없습니다.

Angular의 프로바이더와 의존성 주입에 관한 자세한 내용은 [의존성 주입 가이드](/guide/di)를 참고하세요.

<!--
## Associating data with routes
-->

<a id="associating-data-with-routes"></a>

## 라우팅 규칙에 데이터 연결하기

<!--
Route data enables you to attach additional information to routes. You are able to configure how components behave based on this data.

There are two ways to work with route data: static data that remains constant, and dynamic data that can change based on runtime conditions.
-->

라우팅 규칙 데이터를 사용하면 라우팅 규칙에 추가 정보를 연결할 수 있습니다.
이 데이터에 따라 컴포넌트 동작을 설정할 수 있습니다.

라우팅 규칙 데이터에는 값이 바뀌지 않는 정적 데이터와 실행 중 조건에 따라 바뀔 수 있는 동적 데이터가 있습니다.

<!--
### Static data
-->

<a id="static-data"></a>

### 정적 데이터

<!--
You can associate arbitrary static data with a route via the `data` property in order to centralize things like route-specific metadata (e.g., analytics tracking, permissions, etc.):

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {About} from './about';
import {Products} from './products';

const routes: Routes = [
  {
    path: 'about',
    component: About,
    data: {analyticsId: '456'},
  },
  {
    path: '',
    component: Home,
    data: {analyticsId: '123'},
  },
];
```

In this code sample, the home and about page are configured with specific `analyticsId` which would then be used in their respective components for page tracking analytics.

You can read this static data by injecting the `ActivatedRoute`. See [Reading route state](/guide/routing/read-route-state) for details.
-->

`data` 프로퍼티로 라우팅 규칙에 원하는 정적 데이터를 연결할 수 있습니다.
라우팅 규칙별 메타데이터(예: 분석 추적, 권한 등)를 한곳에서 관리할 때 유용합니다.

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {About} from './about';
import {Products} from './products';

const routes: Routes = [
  {
    path: 'about',
    component: About,
    data: {analyticsId: '456'},
  },
  {
    path: '',
    component: Home,
    data: {analyticsId: '123'},
  },
];
```

이 코드에서는 home과 about 페이지에 각각 `analyticsId`를 설정합니다.
각 컴포넌트는 이 값을 페이지 추적 분석에 사용할 수 있습니다.

`ActivatedRoute`를 주입하면 정적 데이터를 읽을 수 있습니다.
자세한 내용은 [라우팅 규칙 상태 읽기](/guide/routing/read-route-state)를 참고하세요.

<!--
### Dynamic data with data resolvers
-->

<a id="dynamic-data-with-data-resolvers"></a>

### 데이터 리졸버로 동적 데이터 제공하기

<!--
When you need to provide dynamic data to a route, check out the [guide on route data resolvers](/guide/routing/data-resolvers).
-->

라우팅 규칙에 동적 데이터를 제공해야 한다면 [라우팅 규칙 데이터 리졸버 가이드](/guide/routing/data-resolvers)를 참고하세요.

<!--
## Nested Routes
-->

<a id="nested-routes"></a>

## 중첩 라우팅 규칙

<!--
Nested routes, also known as child routes, are a common technique for managing more complex navigation routes where a component has a sub-view that changes based on the URL.

<img alt="Diagram to illustrate nested routes" src="assets/images/guide/router/nested-routing-diagram.svg">

You can add child routes to any route definition with the `children` property:

```ts
const routes: Routes = [
  {
    path: 'product/:id',
    component: Product,
    children: [
      {
        path: 'info',
        component: ProductInfo,
      },
      {
        path: 'reviews',
        component: ProductReviews,
      },
    ],
  },
];
```

The above example defines a route for a product page that allows a user to change whether the product info or reviews are displayed based on the url.

The `children` property accepts an array of `Route` objects.

To display child routes, the parent component (`Product` in the example above) includes its own `<router-outlet>`.

```angular-html
<!- Product ->
<article>
  <h1>Product {{ id }}</h1>
  <router-outlet />
</article>
```

After adding child routes to the configuration and adding a `<router-outlet>` to the component, navigation between URLs that match the child routes updates only the nested outlet.
-->

중첩 라우팅 규칙은 자식 라우팅 규칙이라고도 하며, 복잡한 내비게이션 경로를 관리할 때 자주 사용하는 방식입니다.
컴포넌트 안의 하위 뷰를 URL에 따라 변경할 수 있습니다.

<img alt="중첩 라우팅 규칙을 설명하는 다이어그램" src="assets/images/guide/router/nested-routing-diagram.svg">

라우팅 규칙 정의의 `children` 프로퍼티에 자식 라우팅 규칙을 추가할 수 있습니다.

```ts
const routes: Routes = [
  {
    path: 'product/:id',
    component: Product,
    children: [
      {
        path: 'info',
        component: ProductInfo,
      },
      {
        path: 'reviews',
        component: ProductReviews,
      },
    ],
  },
];
```

위 예제는 URL에 따라 상품 정보와 리뷰 중 어느 것을 표시할지 변경할 수 있는 상품 페이지 라우팅 규칙을 정의합니다.

`children` 프로퍼티는 `Route` 객체 배열을 받습니다.

자식 라우팅 규칙을 표시하려면 부모 컴포넌트(위 예제의 `Product`)에 별도의 `<router-outlet>`을 포함해야 합니다.

```angular-html
<!-- Product -->
<article>
  <h1>Product {{ id }}</h1>
  <router-outlet />
</article>
```

설정에 자식 라우팅 규칙을 추가하고 컴포넌트에 `<router-outlet>`을 추가하면, 자식 라우팅 규칙과 매칭되는 URL 사이를 이동할 때 중첩된 아웃렛만 갱신됩니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="/guide/routing/loading-strategies" title="Route Loading Strategies"/>
  <docs-pill href="/guide/routing/show-routes-with-outlets" title="Display the contents of your routes with Outlets"/>
</docs-pill-row>
-->

<docs-pill-row>
  <docs-pill href="/guide/routing/loading-strategies" title="라우팅 규칙 로딩 전략"/>
  <docs-pill href="/guide/routing/show-routes-with-outlets" title="아웃렛으로 라우팅 규칙 내용 표시하기"/>
</docs-pill-row>
