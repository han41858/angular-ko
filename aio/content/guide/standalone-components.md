<!--
# Getting started with standalone components
-->
# 단독 컴포넌트 시작하기

<!--
**Standalone components** provide a simplified way to build Angular applications. Standalone components, directives, and pipes aim to streamline the authoring experience by reducing the need for `NgModule`s. Existing applications can optionally and incrementally adopt the new standalone style without any breaking changes.
-->
**단독(standalone) 컴포넌트**는 Angular 애플리케이션을 간단하게 구성하기 위해 도입되었습니다.
단독 컴포넌트, 단독 디렉티브, 단독 파이프는 모두 `NgModule`을 생략하기 위한 것입니다.
NgModule 방식으로 개발된 애플리케이션이라면 단독 컴포넌트 스타일을 점진적으로 적용할 수 있습니다.


<!--
## Creating standalone components
-->
## 단독 컴포넌트 생성하기

<div class="video-container">

<iframe src="https://www.youtube.com/embed/x5PZwb4XurU" title="Getting started with standalone components" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

<!--
### The `standalone` flag and component `imports`
-->
### `standalone` 플래그와 `imports`

<!--
Components, directives, and pipes can now be marked as `standalone: true`. Angular classes marked as standalone do not need to be declared in an `NgModule` (the Angular compiler will report an error if you try).

Standalone components specify their dependencies directly instead of getting them through `NgModule`s. For example, if `PhotoGalleryComponent` is a standalone component, it can directly import another standalone component `ImageGridComponent`:


```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  imports: [ImageGridComponent],
  template: `
    ... <image-grid [images]="imageList"></image-grid>
  `,
})
export class PhotoGalleryComponent {
  // component logic
}
```

`imports` can also be used to reference standalone directives and pipes. In this way, standalone components can be written without the need to create an `NgModule` to manage template dependencies.
-->
컴포넌트, 디렉티브, 파이프에는 이제 `standalone: true`를 지정할 수 있습니다.
단독 스타일로 지정한 Angular 클래스는 `NgModule` 안에 선언하지 않아도 됩니다.

단독 컴포넌트는 `NgModule`에서가 아니라 컴포넌트 자체에서 의존성 객체를 불러옵니다.
단독 컴포넌트 `PhotoGalleryComponent`를 예로 들어보면, 이 컴포넌트는 `ImgageGridComponent`라는 단독 컴포넌트를 직접 불러옵니다:


```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  imports: [ImageGridComponent],
  template: `
    ... <image-grid [images]="imageList"></image-grid>
  `,
})
export class PhotoGalleryComponent {
  // 컴포넌트 로직
}
```

`imports`는 단독 디렉티브나 단독 파이프를 참조할 때도 사용합니다.
결국 단독 컴포넌트는 `NgModule`을 생성하지 않아도 컴포넌트 템플릿에 사용하는 의존성 객체들을 직접 로드할 수 있습니다.

<!--
### Using existing NgModules in a standalone component
-->
### 단독 컴포넌트에서 NgModule 활용하기

<!--
When writing a standalone component, you may want to use other components, directives, or pipes in the component's template. Some of those dependencies might not be marked as standalone, but instead declared and exported by an existing `NgModule`. In this case, you can import the `NgModule` directly into the standalone component:

```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  // an existing module is imported directly into a standalone component
  imports: [MatButtonModule],
  template: `
    ...
    <button mat-button>Next Page</button>
  `,
})
export class PhotoGalleryComponent {
  // logic
}
```

You can use standalone components with existing `NgModule`-based libraries or dependencies in your template. Standalone components can take full advantage of the existing ecosystem of Angular libraries.
-->
단독 컴포넌트를 구성하다보면 컴포넌트 템플릿에 사용하기 위해 컴포넌트, 디렉티브, 파이프를 불러와야 하는 경우가 있습니다.
그런데 이런 구성요소들이 단독으로 구성되지 않고 어떤 `NgModule` 안에 정의되어 있을 수 있습니다.
그렇다면 단독 컴포넌트에서 `NgModule`을 직접 로드하면 됩니다:

```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  // 단독 컴포넌트에 모듈을 직접 로드합니다.
  imports: [MatButtonModule],
  template: `
    ...
    <button mat-button>Next Page</button>
  `,
})
export class PhotoGalleryComponent {
  // logic
}
```

단독 컴포넌트에서는 `NgModule` 방식으로 개발된 라이브러리도 활용할 수 있습니다.
그래서 기존 Angular 라이브러리 생태계의 장점을 그대로 활용할 수 있습니다.

<!--
## Using standalone components in NgModule-based applications
-->
## NgModule 기반 애플리케이션에서 단독 컴포넌트 사용하기

<!--
Standalone components can also be imported into existing NgModules-based contexts. This allows existing applications (which are using NgModules today) to incrementally adopt the new, standalone style of component.

You can import a standalone component (or directive, or pipe) just like you would an `NgModule` - using `NgModule.imports`:

```ts
@NgModule({
  declarations: [AlbumComponent],
  exports: [AlbumComponent], 
  imports: [PhotoGalleryComponent],
})
export class AlbumModule {}
```
-->
단독 컴포넌트는 NgModule 기반의 애플리케이션에서도 활용할 수 있습니다.
그래서 기존에 NgModule 기반으로 구성된 애플리케이션에 있는 구성요소를 점진적으로 단독 스타일로 변경할 수 있습니다.

단독 컴포넌트/디렉티브/파이프는 `NgModule.imports`에 `NgModule`을 로드하듯이 구성하면 됩니다.

```ts
@NgModule({
  declarations: [AlbumComponent],
  exports: [AlbumComponent], 
  imports: [PhotoGalleryComponent],
})
export class AlbumModule {}
```

<!--
## Bootstrapping an application using a standalone component
-->
## 단독 컴포넌트로 부트스트랩하기

<!--
An Angular application can be bootstrapped without any `NgModule` by using a standalone component as the application's root component. This is done using the `bootstrapApplication` API:

```ts
// in the main.ts file
import {bootstrapApplication} from '@angular/platform-browser';
import {PhotoAppComponent} from './app/photo.app.component';

bootstrapApplication(PhotoAppComponent);
```
-->
애플리케이션 최상위 컴포넌트로 단독 컴포넌트를 사용하면 `NgModule` 없이도 애플리케이션을 부트스트랩 할 수 있습니다.
`bootstrapApplication` API를 사용하면 됩니다:

```ts
// main.ts 파일 안에서
import {bootstrapApplication} from '@angular/platform-browser';
import {PhotoAppComponent} from './app/photo.app.component';

bootstrapApplication(PhotoAppComponent);
```

<!--
### Configuring dependency injection
-->
### 의존성 객체 구성하기

<!--
When bootstrapping an application, often you want to configure Angular’s dependency injection and provide configuration values or services for use throughout the application. You can pass these as providers to `bootstrapApplication`:

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    // ...
  ]
});
```

The standalone bootstrap operation is based on explicitly configuring a list of `Provider`s for dependency injection. In Angular, `provide`-prefixed functions can be used to configure different systems without needing to import NgModules. For example, `provideRouter` is used in place of `RouterModule.forRoot` to configure the router:

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    provideRouter([/* app routes */]),
    // ...
  ]
});
```

Many third party libraries have also been updated to support this `provide`-function configuration pattern. If a library only offers an NgModule API for its DI configuration, you can use the `importProvidersFrom` utility to still use it with `bootstrapApplication` and other standalone contexts:

```ts
import {LibraryModule} from 'ngmodule-based-library';

bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    importProvidersFrom(
      LibraryModule.forRoot()
    ),
  ]
});
```
-->
애플리케이션을 부트스트랩할 때 Angular 프레임워크에 의존성 주입 시스템을 구성할 수 있습니다.
`bootstrapApplication` 함수를 실행할 때 다음과 같이 프로바이더를 등록하면 됩니다:

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    // ...
  ]
});
```

단독 컴포넌트의 부트스트랩 과정은 명시적으로 등록한 프로바이더를 기반으로 합니다.
Angular가 제공하는 함수 중 `provide-`로 시작하는 함수는 NgModule을 활용하지 않는 방식에서 동작환경을 구성하는 함수입니다.
예를 들어 `RouterModule.forRoot()`에서 등록하던 라우팅 설정은 `provideRouter`가 처리합니다:

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    provideRouter([/* 라우팅 규칙 */]),
    // ...
  ]
});
```

서드 파티 라이브러리 중에서도 `provide-` 패턴을 지원하는 것이 있습니다.
하지만 라이브러리가 NgModule 방식으로만 API를 지원한다면 `importProvidersFrom` 유틸리티를 활용하는 방법도 있습니다:

```ts
import {LibraryModule} from 'ngmodule-based-library';

bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    importProvidersFrom(
      LibraryModule.forRoot()
    ),
  ]
});
```

<a id="routing-and-lazy-loading"></a>
<!--
## Routing and lazy-loading
-->
## 라우팅, 지연 로딩

<!--
The router APIs were updated and simplified to take advantage of the standalone components: an `NgModule` is no longer required in many common, lazy-loading scenarios.
-->
라우터 API는 단독 컴포넌트가 도입되면서 더 단순해졌습니다.
이제는 지연 로딩 하는 경우에 `NgModule`을 사용하지 않습니다.

<!--
### Lazy loading a standalone component
-->
### 단독 컴포넌트를 지연로딩하기

<!--
Any route can lazily load its routed, standalone component by using `loadComponent`:

```ts
export const ROUTES: Route[] = [
  {path: 'admin', loadComponent: () => import('./admin/panel.component').then(mod => mod.AdminPanelComponent)},
  // ...
];
```

This works as long as the loaded component is standalone.
-->
라우팅 규칙은 지연로딩할 수 있습니다.
단독 컴포넌트를 지연로딩한다면 `loadComponent`를 사용합니다:

```ts
export const ROUTES: Route[] = [
  {path: 'admin', loadComponent: () => import('./admin/panel.component').then(mod => mod.AdminPanelComponent)},
  // ...
];
```

이 방식은 로딩하는 컴포넌트가 단독 컴포넌트일 때만 동작합니다.

<!--
### Lazy loading many routes at once
-->
### 라우팅 규칙 여러 개를 한 번에 지연로딩하기

<!--
The `loadChildren` operation now supports loading a new set of child `Route`s without needing to write a lazy loaded `NgModule` that imports `RouterModule.forChild` to declare the routes. This works when every route loaded this way is using a standalone component.

```ts
// In the main application:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
  // ...
];

// In admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
];
```
-->
`loadChildren`은 `RouterModule.forChild()`로 자식 라우팅 규칙을 `NgModule` 단위로 로드했던 동작을 `NgModule` 없이 처리합니다.
라우팅 규칙이 단독 컴포넌트를 로드하는 경우에도 동작합니다.

```ts
// 메인 애플리케이션:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
  // ...
];

// admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
];
```

<!--
### Lazy loading and default exports
-->
### 지연 로딩, 기본 컴포넌트

<!--
When using `loadChildren` and `loadComponent`, the router understands and automatically unwraps dynamic `import()` calls with `default` exports. You can take advantage of this to skip the `.then()` for such lazy loading operations.

```ts
// In the main application:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes')},
  // ...
];

// In admin/routes.ts:
export default [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
] satisfies Route[];
```
-->
`loadChildren`이나 `loadComponent`를 사용할 때 `import()`를 사용하면 `default`에 해당하는 객체를 기본으로 사용합니다.
이 경우라면 지연로딩할 때 작성하는 `.then()` 구문을 생략할 수 있습니다.

```ts
// 메인 애플리케이션:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes')},
  // ...
];

// admin/routes.ts:
export default [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
] satisfies Route[];
```

<!--
### Providing services to a subset of routes
-->
### 라우팅 규칙 안쪽에 프로바이더 등록하기

<!--
The lazy loading API for `NgModule`s (`loadChildren`) creates a new "module" injector when it loads the lazily loaded children of a route. This feature was often useful to provide services only to a subset of routes in the application. For example, if all routes under `/admin` were scoped using a `loadChildren` boundary, then admin-only services could be provided only to those routes. Doing this required using the `loadChildren` API, even if lazy loading of the routes in question was unnecessary.

The Router now supports explicitly specifying additional `providers` on a `Route`, which allows this same scoping without the need for either lazy loading or `NgModule`s. For example, scoped services within an `/admin` route structure would look like:

```ts
export const ROUTES: Route[] = [
  {
    path: 'admin',
    providers: [
      AdminService,
      {provide: ADMIN_API_KEY, useValue: '12345'},
    ],
    children: [
      {path: 'users', component: AdminUsersComponent},
      {path: 'teams', component: AdminTeamsComponent},
    ],
  },
  // ... other application routes that don't
  //     have access to ADMIN_API_KEY or AdminService.
];
```

It's also possible to combine `providers` with `loadChildren` of additional routing configuration, to achieve the same effect of lazy loading an `NgModule` with additional routes and route-level providers. This example configures the same providers/child routes as above, but behind a lazy loaded boundary:

```ts
// Main application:
export const ROUTES: Route[] = {
  // Lazy-load the admin routes.
  {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
  // ... rest of the routes
}

// In admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [{
  path: '',
  pathMatch: 'prefix',
  providers: [
    AdminService,
    {provide: ADMIN_API_KEY, useValue: 12345},
  ],
  children: [
    {path: 'users', component: AdminUsersCmp},
    {path: 'teams', component: AdminTeamsCmp},
  ],
}];
```

Note the use of an empty-path route to host `providers` that are shared among all the child routes.

`importProvidersFrom` can be used to import existing NgModule-based DI configuration into route `providers` as well.
-->
`NgModule` 방식으로 지연 로딩하는 `loadChildren` API를 사용하면 모듈 인젝터가 새로 생성되면서 이 인젝터가 지연로딩되는 항목들을 구성합니다.
애플리케이션의 일부 영역에 필요한 서비스라면 이렇게 구성되는 방식이 유용합니다.
`/admin` 안쪽에 해당하는 라우팅 규칙을 `loadChildren` 으로 로드한다면, 관리자용 서비스가 그 안에 구성되는 식입니다.
이를 응용하면 실제로는 지연로딩이 필요하지 않더라도 애플리케이션의 영역을 나누기 위해 `loadChildren` 함수를 활용할 수 있었습니다.

이제는 라우팅 규칙에서 `providers`를 지정할 수 있습니다.
그래서 일부러 지연로딩하는 테크닉을 쓰거나 `NgModule`을 지연로딩하지 않더라도 프로바이더를 관리할 수 있습니다.
앞서 언급했던 `/admin` 안쪽에 서비스 인스턴스를 관리하는 경우라면 이렇게 구성하면 됩니다:

```ts
export const ROUTES: Route[] = [
  {
    path: 'admin',
    providers: [
      AdminService,
      {provide: ADMIN_API_KEY, useValue: '12345'},
    ],
    children: [
      {path: 'users', component: AdminUsersComponent},
      {path: 'teams', component: AdminTeamsComponent},
    ],
  },
  // ... admin 라우팅 규칙 밖에서는 ADMIN_API_KEY나 AdminService에 접근할 수 없습니다.
];
```

`NgModule`을 지연로딩하거나 지연로딩하는 라우팅 규칙 안쪽으로 프로바이더를 등록하는 효과를 내기 위해 `providers`와 `loadChildren`을 함께 사용할 수도 있습니다.
아래 예제는 위에서 다룬 것과 동일하게 라우팅 규칙을 구성하지만, 지연 로딩도 활용한 코드입니다:

```ts
// 메인 애플리케이션:
export const ROUTES: Route[] = {
  // 지연로딩되는 admin 라우팅 규칙
  {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
  // ... 추가 라우팅 규칙들
}

// admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [{
  path: '',
  pathMatch: 'prefix',
  providers: [
    AdminService,
    {provide: ADMIN_API_KEY, useValue: 12345},
  ],
  children: [
    {path: 'users', component: AdminUsersCmp},
    {path: 'teams', component: AdminTeamsCmp},
  ],
}];
```

자식 라우팅 규칙에서 공통으로 사용할 의존성 객체를 `providers`에 등록하기 위해 빈 경로를 갖는 라우팅 규칙을 하나 추가한 것도 확인해 보세요.

라우팅 규칙의 `providers`에 NgModule 기반으로 구성된 의존성 객체를 등록하려면 `importProvidersFrom` 함수를 사용하면 됩니다.


<!--
## Advanced topics
-->
## 응용 주제

<!--
This section goes into more details that are relevant only to more advanced usage patterns. You can safely skip this section when learning about standalone components, directives, and pipes for the first time. 
-->
이 섹션은 좀 더 심화된 패턴을 다룹니다.
단독 컴포넌트/디렉티브/파이프를 처음 학슴하는 경우라면 아래 내용은 건너뛰어도 됩니다. 

<!--
### Standalone components for library authors
-->
### 라이브러리용 단독 컴포넌트

<!--
Standalone components, directives, and pipes can be exported from `NgModule`s that import them:

```ts
@NgModule({
  imports: [ImageCarouselComponent, ImageSlideComponent],
  exports: [ImageCarouselComponent, ImageSlideComponent],
})
export class CarouselModule {}
```

This pattern is useful for Angular libraries that publish a set of cooperating directives. In the above example, both the `ImageCarouselComponent` and `ImageSlideComponent` need to be present in a template to build up one logical "carousel widget". 

As an alternative to publishing a `NgModule`, library authors might want to export an array of cooperating directives:

```ts
export const CAROUSEL_DIRECTIVES = [ImageCarouselComponent, ImageSlideComponent] as const;
```

Such an array could be imported by applications using `NgModule`s and added to the `@NgModule.imports`. Please note the presence of the TypeScript’s `as const` construct: it gives Angular compiler additional information required for proper compilation and is a recommended practice (as it makes the exported array immutable from the TypeScript point of view).
-->
단독 컴포넌트/디렉티브/파이프를 `NgModule`로 묶으려면 이렇게 구성하면 됩니다:

```ts
@NgModule({
  imports: [ImageCarouselComponent, ImageSlideComponent],
  exports: [ImageCarouselComponent, ImageSlideComponent],
})
export class CarouselModule {}
```

연관된 디렉티브를 하나로 묶어서 배포하려면 이렇게 구성하는 방식도 유용합니다.
위 예제 코드에서 `ImageCarouselComponent`와 `ImageSlideComponent`는 캐러셀 위젯을 구성하기 위해 모두 필요한 컴포넌트 들입니다.

`NgModule`로 묶는 방식을 사용하지 않으려면 배열로 선언해도 됩니다:

```ts
export const CAROUSEL_DIRECTIVES = [ImageCarouselComponent, ImageSlideComponent] as const;
```

이렇게 선언하면 `NgModule`이나 `@NgModule.imports`에 이 배열을 로드할 수 있습니다.
TypeScript 문법 `as const`를 사용한 것을 주의깊게 보세요.
`as const`를 사용하면 Angular 컴파일러가 해당 배열이 이뮤터블이라는 것을 의미하며, 배열 안에 있는 항목에 대해 더 많은 정보를 얻을 수 있기 때문에 권장합니다.

<!--
### Dependency injection and injectors hierarchy
-->
### 의존성 주입, 인젝터 계층

<!--
Angular applications can configure dependency injection by specifying a set of available providers. In a typical application, there are two different injector types:

*   **module injector** with providers configured in `@NgModule.providers` or `@Injectable({providedIn: "..."})`. Those application-wide providers are visible to all components in as well as to other services configured in a module injector.
*   **node injectors** configured in `@Directive.providers` / `@Component.providers` or `@Component.viewProviders`. Those providers are visible to a given component and all its children only.
-->
Angular 애플리케이션의 의존성 객체들은 계층으로 구성할 수 있습니다.
보통은 인젝터를 두 종류로 구분합니다:

*   **모듈 인젝터(module injectors)** - `@NgModule.providers`, `@Injectable({providedIn: "..."})`로 구성되는 인젝터입니다. 여기에 등록된 프로바이더는 애플리케이션 전역에서 접근할 수 있습니다.
*   **노드 인젝터(node injectors)** - `@Directive.providers`, `@Component.providers`, `@Component.viewProviders`로 구성되는 인젝터입니다. 여기에 등록된 프로바이더는 해당 컴포넌트나 자식 계층에서만 접근할 수 있습니다.


<a id="environment-injectors"></a>
<!--
#### Environment injectors
-->
#### 환경 인젝터(Environment injectors)

<!--
Making `NgModule`s optional will require new ways of configuring "module" injectors with application-wide providers (for example, [HttpClient](/api/common/http/HttpClient)). In the standalone application (one created with `bootstrapApplication`), “module” providers can be configured during the bootstrap process, in the `providers` option: 

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    {provide: PhotosService, useClass: PhotosService},
    // ...
  ]
});
```

The new bootstrap API gives us back the means of configuring “module injectors” without using `NgModule`s. In this sense, the “module” part of the name is no longer relevant, and we’ve decided to introduce a new term: “environment injectors”. 

Environment injectors can be configured using one of the following:

*   `@NgModule.providers` (in applications bootstrapping through an `NgModule`);
*   `@Injectable({provideIn: "..."})`(in both the NgModule-based and the “standalone” applications);
*   `providers` option in the `bootstrapApplication` call (in fully “standalone” applications);
*   `providers` field in a `Route` configuration.

Angular v14 introduces a new TypeScript type `EnvironmentInjector` to represent this new naming. The accompanying `createEnvironmentInjector` API makes it possible to create environment injectors programmatically: 

```ts
import {createEnvironmentInjector} from '@angular/core';

const parentInjector = … // existing environment injector
const childInjector = createEnvironmentInjector([{provide: PhotosService, useClass: CustomPhotosService}], parentInjector);
```

Environment injectors have one additional capability: they can execute initialization logic when an environment injector gets created (similar to the `NgModule` constructors that get executed when a module injector is created):

```ts
import {createEnvironmentInjector, ENVIRONMENT_INITIALIZER} from '@angular/core';

createEnvironmentInjector([
{provide: PhotosService, useClass: CustomPhotosService},
{provide: ENVIRONMENT_INITIALIZER, useValue: () => {
        console.log("This function runs when this EnvironmentInjector gets created");
}}
]);
```
-->
`NgModule`을 생성한다는 것은 모듈 안쪽에서 [HttpClient](/api/common/http/HttpClient)와 같은 객체를 사용하기 위해 인젝터를 생성하는 것을 의미합니다.
반면에 `bootstrapApplication` 함수를 사용해서 단독 스타일로 구성되는 애플리케이션에서는 모듈 프로바이더가 부트스트랩 단계에서 `providers` 옵션에 따라 구성됩니다:

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    {provide: PhotosService, useClass: PhotosService},
    // ...
  ]
});
```

새로운 부트스트랩 API를 사용하면 `NgModule`을 실제로 구성하지 않아도 "모듈 인젝터" 를 구성할 수 있습니다.
그렇다면 더이상 "모듈" 이라는 단어는 적절하지 않습니다.
그래서 새롭게 "환경 인젝터" 라는 단어를 사용하기로 결정했습니다.

환경 인젝터는 아래와 같은 경우에 구성됩니다:

*   `NgModule`로 부트스트랩하는 애플리케이션이라면 `@NgModule.providers`에서
*   NgModule 기반이거나 단독 스타일 애플리케이션이라면 `@Injectable({provideIn: "..."})`에서
*   완전히 "단독" 스타일로 구성된 애플리케이션에서 `bootstrapApplication`을 실행할 때 `providers`옵션이 지정되면
*   라우팅 규칙에서 `providers` 필드를 사용한 경우

`EnvironmentInjector`라는 용어는 Angular v14 버전에서 처음 추가되었습니다.
환경 인젝터를 수동으로 생성하려면 `createEnvironmentInjector`를 실행하면 됩니다: 

```ts
import {createEnvironmentInjector} from '@angular/core';

const parentInjector = … // 기존에 존재하는 환경 인젝터
const childInjector = createEnvironmentInjector([{provide: PhotosService, useClass: CustomPhotosService}], parentInjector);
```

환경 인젝터가 갖는 특징이 하나 더 있습니다.
`NgModule`이 생성되면서 모듈 인젝터가 함께 생성되는 것처럼, 환경 인젝터는 생성되면서 초기화 로직을 실행할 수 있습니다:

```ts
import {createEnvironmentInjector, ENVIRONMENT_INITIALIZER} from '@angular/core';

createEnvironmentInjector([
{provide: PhotosService, useClass: CustomPhotosService},
{provide: ENVIRONMENT_INITIALIZER, useValue: () => {
        console.log("This function runs when this EnvironmentInjector gets created");
}}
]);
```

<!--
#### Standalone injectors
-->
#### 단독 인젝터

<!--
In reality, the dependency injectors hierarchy is slightly more elaborate in applications using standalone components. Let’s consider the following example:

```ts
// an existing "datepicker" component with an NgModule
@Component({
        selector: 'datepicker',
        template: '...',
})
class DatePickerComponent {
  constructor(private calendar: CalendarService) {}
}

@NgModule({
        declarations: [DatePickerComponent],
        exports: [DatePickerComponent],
        providers: [CalendarService],
})
class DatePickerModule {
}

@Component({
        selector: 'date-modal',
        template: '<datepicker></datepicker>',
        standalone: true,
        imports: [DatePickerModule]
})
class DateModalComponent {
}
```

In the above example, the component `DateModalComponent` is standalone - it can be consumed directly and has no NgModule which needs to be imported in order to use it. However, `DateModalComponent` has a dependency, the `DatePickerComponent,` which is imported via its NgModule (the `DatePickerModule`). This NgModule may declare providers (in this case: `CalendarService`) which are required for the `DatePickerComponent` to function correctly.

When Angular creates a standalone component, it needs to know that the current injector has all the necessary services for the standalone component's dependencies, including those based on NgModules. To guarantee that, in some cases Angular will create a new "standalone injector" as a child of the current environment injector. Today, this happens for all bootstrapped standalone components: it will be a child of the root environment injector. The same rule applies to the dynamically created (for example, by the router or the `ViewContainerRef` API) standalone components. 

A separate standalone injector is created to ensure that providers imported by a standalone component are “isolated” from the rest of the application. This lets us think of standalone components as truly self-contained pieces that can’t “leak” their implementation details to the rest of the application.
-->
실제로는 단독 컴포넌트에 사용되는 인젝터 계층이 이전 방식보다 약간 더 진보된 방식입니다.
예제를 보면서 알아봅시다:

```ts
// 어떤 NgModule에 "datepicker" 컴포넌트가 존재합니다.
@Component({
        selector: 'datepicker',
        template: '...',
})
class DatePickerComponent {
  constructor(private calendar: CalendarService) {}
}

@NgModule({
        declarations: [DatePickerComponent],
        exports: [DatePickerComponent],
        providers: [CalendarService],
})
class DatePickerModule {
}

@Component({
        selector: 'date-modal',
        template: '<datepicker></datepicker>',
        standalone: true,
        imports: [DatePickerModule]
})
class DateModalComponent {
}
```

이 예제에서 `DateModalComponent`는 단독 컴포넌트입니다.
단독 컴포넌트는 NgModule 없이도 의존성 객체를 직접 로드할 수 있습니다.
하지만 `DateModalComponent`는 `DatePickerComponent`를 사용하기 위해 `DatePickerModule`을 로드했습니다.
그리고 이 NgModule 안에는 `DatePickerComponent`에 정의한 함수가 제대로 동작하기 위해 필요한 `CalendarService`가 추가로 선언되어 있습니다.

Angular가 단독 컴포넌트를 생성하려면 단독 컴포넌트에 필요한 의존성 객체들이 현재 인젝터에 모두 등록되어 있는지 확인해야 합니다.
그래서 이 때 Angular는 현재 환경 인젝터의 자식으로 "단독 인젝터(standalone injector)"를 생성합니다.
결국 단독 컴포넌트로 부트스트랩하는 애플리케이션에는 모두 이 과정이 진행됩니다.
이 때 생성되는 단독 인젝터는 최상위 환경 인젝터의 자식입니다.
라우터나 `ViewContainerRef` API가 사용되었을 때 동적으로 생성되는 인젝터에도 이 규칙은 그대로 적용됩니다.

인젝터가 별도로 생성되는 이유는 단독 컴포넌트에 사용되는 프로바이더 객체들을 애플리케이션의 다른 부분과 "격리(isolated)"하기 위한 것입니다.
이로써 단독 컴포넌트는 애플리케이션 다른 부분에 영향을 주지 않으면서 진정으로 "독립된" 컴포넌트로 구성됩니다.


<!--
#### Resolve circular dependencies with a forward class reference
-->
### 순환 종속성 해결하기

<!--
The order of class declaration matters in TypeScript. You can't refer directly to a class until it's been defined.

This isn't usually a problem but sometimes circular references are unavoidable. For example, when class 'A' refers to class 'B' and 'B' refers to 'A'. One of them has to be defined first.

The Angular `forwardRef()` function creates an indirect reference that Angular can resolve later. 

For example, this situation happens when a standalone parent component imports a standalone child component and vice-versa. You can resolve this circular dependency issue by using the `forwardRef` function.

```ts
@Component({
  standalone: true, 
  imports: [ChildComponent],
  selector: 'app-parent',
  template: `<app-child [hideParent]="hideParent"></app-child>`,
})
export class ParentComponent {
  @Input() hideParent: boolean;
}


@Component({
  standalone: true,
  imports: [CommonModule, forwardRef(() => ParentComponent)],
  selector: 'app-child',
  template: `<app-parent *ngIf="!hideParent"></app-parent>`,
})
export class ChildComponent {
  @Input() hideParent: boolean;
}
```

<div class="alert is-important">

This kind of imports may result in an infinite recursion during component instantiation. Make sure that this recursion has an exit condition that stops it at some point.

</div>
-->
TypeScript에서는 클래스를 선언하는 순서가 중요합니다.
클래스는 온전히 정의한 후에야 참조할 수 있습니다.

이 방식은 일반적으로 문제가 없지만 순환 종속성을 갖는 경우에는 문제가 됩니다.
A 클래스가 B 클래스를 참조하는데 B 클래스가 다시 A 클래스를 참조하는 경우가 그렇습니다.
둘 중에 하나는 먼저 정의해야 합니다.

이 때 Angular가 제공하는 `forwardRef()` 함수를 활용하면 참조를 직접 연결하지 않고 나중에 결정하도록 구성할 수 있습니다.

이런 경우는 부모 컴포넌트와 자식 컴포넌트가 서로 참조하는 단독 컴포넌트인 경우에도 발생할 수 있습니다.
이 때 발생하는 순환 종속성은 `forwardRef` 함수를 사용해서 이렇게 해결하면 됩니다:

```ts
@Component({
  standalone: true, 
  imports: [ChildComponent],
  selector: 'app-parent',
  template: `<app-child [hideParent]="hideParent"></app-child>`,
})
export class ParentComponent {
  @Input() hideParent: boolean;
}


@Component({
  standalone: true,
  imports: [CommonModule, forwardRef(() => ParentComponent)],
  selector: 'app-child',
  template: `<app-parent *ngIf="!hideParent"></app-parent>`,
})
export class ChildComponent {
  @Input() hideParent: boolean;
}
```

<div class="alert is-important">

컴포넌트를 이렇게 구성하면 컴포넌트의 인스턴스를 생성할 때 무한 루프에 빠질 수 있습니다.
순환 종속성을 빠져나올 수 있는 조건을 반드시 추가하세요.

</div>
