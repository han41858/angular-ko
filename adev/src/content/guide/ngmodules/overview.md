<!--
# NgModules
-->

<a id="ngmodules"></a>

# NgModule

<!--
IMPORTANT: The Angular team recommends using [standalone components](guide/components) instead of `NgModule` for all new code. Use this guide to understand existing code built with `@NgModule`.

An NgModule is a class marked by the `@NgModule` decorator. This decorator accepts _metadata_ that tells Angular how to compile component templates and configure dependency injection.

```typescript
import {NgModule} from '@angular/core';

@NgModule({
  // Metadata goes here
})
export class CustomMenuModule {}
```

An NgModule has two main responsibilities:

- Declaring components, directives, and pipes that belong to the NgModule
- Add providers to the injector for components, directives, and pipes that import the NgModule
-->

중요: Angular 팀은 새로 작성하는 모든 코드에서 `NgModule` 대신 [독립형 컴포넌트](guide/components)를 사용하는 것을 권장합니다.
이 가이드는 `@NgModule`을 사용하는 기존 코드를 이해할 때 참고하세요.

NgModule은 `@NgModule` 데코레이터를 붙인 클래스입니다.
이 데코레이터는 Angular가 컴포넌트 템플릿을 컴파일하고 의존성 주입을 설정하는 방법을 지정하는 _메타데이터_ 를 인자로 받습니다.

```typescript
import {NgModule} from '@angular/core';

@NgModule({
  // 이곳에 메타데이터를 작성합니다.
})
export class CustomMenuModule {}
```

NgModule은 크게 두 가지 역할을 합니다:

- NgModule에 속하는 컴포넌트, 디렉티브, 파이프를 선언합니다.
- 이 NgModule을 로드하는 컴포넌트, 디렉티브, 파이프의 인젝터에 프로바이더를 추가합니다.

<!--
## Declarations
-->


## declarations

<!--
The `declarations` property of the `@NgModule` metadata declares the components, directives, and pipes that belong to the NgModule.

```typescript
@NgModule({
  /* ... */
  // CustomMenu and CustomMenuItem are components.
  declarations: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

In the example above, the components `CustomMenu` and `CustomMenuItem` belong to `CustomMenuModule`.

The `declarations` property additionally accepts _arrays_ of components, directives, and pipes. These arrays, in turn, may also contain other arrays.

```typescript
const MENU_COMPONENTS = [CustomMenu, CustomMenuItem];
const WIDGETS = [MENU_COMPONENTS, CustomSlider];

@NgModule({
  /* ... */
  // This NgModule declares all of CustomMenu, CustomMenuItem,
  // CustomSlider, and CustomCheckbox.
  declarations: [WIDGETS, CustomCheckbox],
})
export class CustomMenuModule {}
```

If Angular discovers any components, directives, or pipes declared in more than one NgModule, it reports an error.

Any components, directives, or pipes must be explicitly marked as `standalone: false` in order to be declared in an NgModule.

```typescript
@Component({
  // Mark this component as `standalone: false` so that it can be declared in an NgModule.
  standalone: false,
  /* ... */
})
export class CustomMenu {
  /* ... */
}
```
-->

`@NgModule` 메타데이터의 `declarations` 프로퍼티에는 NgModule에 속하는 컴포넌트, 디렉티브, 파이프를 선언합니다.

```typescript
@NgModule({
  /* ... */
  // CustomMenu와 CustomMenuItem은 컴포넌트입니다.
  declarations: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

위 예제에서 `CustomMenu`와 `CustomMenuItem` 컴포넌트는 `CustomMenuModule`에 속합니다.

`declarations` 프로퍼티에는 컴포넌트, 디렉티브, 파이프의 _배열_ 을 지정할 수도 있습니다.
이 배열 안에 다른 배열을 포함해도 됩니다.

```typescript
const MENU_COMPONENTS = [CustomMenu, CustomMenuItem];
const WIDGETS = [MENU_COMPONENTS, CustomSlider];

@NgModule({
  /* ... */
  // 이 NgModule에는 CustomMenu, CustomMenuItem,
  // CustomSlider, CustomCheckbox를 모두 선언합니다.
  declarations: [WIDGETS, CustomCheckbox],
})
export class CustomMenuModule {}
```

컴포넌트, 디렉티브, 파이프가 여러 NgModule에 중복으로 선언되어 있으면 Angular는 에러를 발생시킵니다.

NgModule에 선언할 컴포넌트, 디렉티브, 파이프에는 반드시 `standalone: false`를 명시해야 합니다.

```typescript
@Component({
  // NgModule에 선언할 수 있도록 컴포넌트에 `standalone: false`를 지정합니다.
  standalone: false,
  /* ... */
})
export class CustomMenu {
  /* ... */
}
```

<!--
### imports
-->


### imports

<!--
Components declared in an NgModule may depend on other components, directives, and pipes. Add these dependencies to the `imports` property of the `@NgModule` metadata.

```typescript
@NgModule({
  /* ... */
  // CustomMenu and CustomMenuItem depend on the PopupTrigger and SelectorIndicator components.
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

The `imports` array accepts other NgModules, as well as standalone components, directives, and pipes.
-->

NgModule에 선언한 컴포넌트는 다른 컴포넌트, 디렉티브, 파이프에 의존할 수 있습니다.
이런 의존성은 `@NgModule` 메타데이터의 `imports` 프로퍼티에 추가합니다.

```typescript
@NgModule({
  /* ... */
  // CustomMenu와 CustomMenuItem은 PopupTrigger와 SelectorIndicator 컴포넌트에 의존합니다.
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

`imports` 배열에는 다른 NgModule뿐 아니라 독립형 컴포넌트, 디렉티브, 파이프도 지정할 수 있습니다.

<!--
### exports
-->


### exports

<!--
An NgModule can _export_ its declared components, directives, and pipes such that they're available to other components and NgModules.

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // Make CustomMenu and CustomMenuItem available to
  // components and NgModules that import CustomMenuModule.
  exports: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

The `exports` property is not limited to declarations, however. An NgModule can also export any other components, directives, pipes, and NgModules that it imports.

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // Also make PopupTrigger available to any component or NgModule that imports CustomMenuModule.
  exports: [CustomMenu, CustomMenuItem, PopupTrigger],
})
export class CustomMenuModule {}
```
-->

NgModule에 선언한 컴포넌트, 디렉티브, 파이프를 _외부로 공개(export)_ 하면 다른 컴포넌트와 NgModule에서 사용할 수 있습니다.

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // CustomMenuModule을 로드하는 컴포넌트와 NgModule에서
  // CustomMenu와 CustomMenuItem을 사용할 수 있도록 합니다.
  exports: [CustomMenu, CustomMenuItem],
})
export class CustomMenuModule {}
```

`exports` 프로퍼티에는 직접 선언한 항목만 지정할 수 있는 것은 아닙니다.
NgModule에서 로드한 다른 컴포넌트, 디렉티브, 파이프, NgModule도 외부로 공개할 수 있습니다.

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // CustomMenuModule을 로드하는 컴포넌트와 NgModule에서 PopupTrigger도 사용할 수 있도록 합니다.
  exports: [CustomMenu, CustomMenuItem, PopupTrigger],
})
export class CustomMenuModule {}
```

<!--
## `NgModule` providers
-->

<a id="ngmodule-providers"></a>

## `NgModule` 프로바이더

<!--
TIP: See the [Dependency Injection guide](guide/di) for information on dependency injection and providers.

An `NgModule` can specify `providers` for injected dependencies. These providers are available to:

- Any standalone component, directive, or pipe that imports the NgModule, and
- The `declarations` and `providers` of any _other_ NgModule that imports the NgModule.

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // Provide the OverlayManager service
  providers: [OverlayManager],
  /* ... */
})
export class CustomMenuModule {}

@NgModule({
  imports: [CustomMenuModule],
  declarations: [UserProfile],
  providers: [UserDataClient],
})
export class UserProfileModule {}
```

In the example above:

- The `CustomMenuModule` provides `OverlayManager`.
- The `CustomMenu` and `CustomMenuItem` components can inject `OverlayManager` because they're declared in `CustomMenuModule`.
- `UserProfile` can inject `OverlayManager` because its NgModule imports `CustomMenuModule`.
- `UserDataClient` can inject `OverlayManager` because its NgModule imports `CustomMenuModule`.
-->

팁: 의존성 주입과 프로바이더에 대해 알아보려면 [의존성 주입 가이드](guide/di)를 참고하세요.

`NgModule`에는 의존성 주입에 사용할 `providers`를 지정할 수 있습니다.
이 프로바이더는 다음 위치에서 사용할 수 있습니다:

- 해당 NgModule을 로드하는 모든 독립형 컴포넌트, 디렉티브, 파이프
- 해당 NgModule을 로드하는 _다른_ NgModule의 `declarations`와 `providers`

```typescript
@NgModule({
  imports: [PopupTrigger, SelectionIndicator],
  declarations: [CustomMenu, CustomMenuItem],

  // OverlayManager 서비스를 제공합니다.
  providers: [OverlayManager],
  /* ... */
})
export class CustomMenuModule {}

@NgModule({
  imports: [CustomMenuModule],
  declarations: [UserProfile],
  providers: [UserDataClient],
})
export class UserProfileModule {}
```

위 예제는 다음과 같이 동작합니다:

- `CustomMenuModule`은 `OverlayManager`를 제공합니다.
- `CustomMenu`와 `CustomMenuItem` 컴포넌트는 `CustomMenuModule`에 선언되어 있으므로 `OverlayManager`를 주입할 수 있습니다.
- `UserProfile`이 속한 NgModule에서 `CustomMenuModule`을 로드하므로 `UserProfile`에 `OverlayManager`를 주입할 수 있습니다.
- `UserDataClient`가 속한 NgModule에서 `CustomMenuModule`을 로드하므로 `UserDataClient`에 `OverlayManager`를 주입할 수 있습니다.

<!--
### The `forRoot` and `forChild` pattern
-->

<a id="the-forroot-and-forchild-pattern"></a>

### `forRoot`와 `forChild` 패턴

<!--
Some NgModules define a static `forRoot` method that accepts some configuration and returns an array of providers. The name "`forRoot`" is a convention that indicates that these providers are intended to be added exclusively to the _root_ of your application during bootstrap.

Any providers included in this way are eagerly loaded, increasing the JavaScript bundle size of your initial page load.

```typescript
bootstrapApplication(MyApplicationRoot, {
  providers: [CustomMenuModule.forRoot(/* some config */)],
});
```

Similarly, some NgModules may define a static `forChild` that indicates the providers are intended to be added to components within your application hierarchy.

```typescript
@Component({
  /* ... */
  providers: [CustomMenuModule.forChild(/* some config */)],
})
export class UserProfile {
  /* ... */
}
```
-->

일부 NgModule은 설정을 인자로 받고 프로바이더 배열을 반환하는 정적 `forRoot` 메서드를 정의합니다.
`forRoot`라는 이름은 애플리케이션을 부트스트랩할 때 이 프로바이더를 애플리케이션의 _최상위_ 에만 추가한다는 의미로 사용하는 관례입니다.

이 방식으로 포함한 프로바이더는 모두 즉시 로드되므로, 페이지를 처음 로드할 때 필요한 JavaScript 번들 크기가 커집니다.

```typescript
bootstrapApplication(MyApplicationRoot, {
  providers: [CustomMenuModule.forRoot(/* some config */)],
});
```

비슷하게 일부 NgModule은 애플리케이션 계층 안의 컴포넌트에 프로바이더를 추가한다는 의미로 정적 `forChild` 메서드를 정의합니다.

```typescript
@Component({
  /* ... */
  providers: [CustomMenuModule.forChild(/* some config */)],
})
export class UserProfile {
  /* ... */
}
```

<!--
## Bootstrapping an application
-->

<a id="bootstrapping-an-application"></a>

## 애플리케이션 부트스트랩하기

<!--
IMPORTANT: The Angular team recommends using [bootstrapApplication](api/platform-browser/bootstrapApplication) instead of `bootstrapModule` for all new code. Use this guide to understand existing applications bootstrapped with `@NgModule`.

The `@NgModule` decorator accepts an optional `bootstrap` array that may contain one or more components.

You can use the [`bootstrapModule`](/api/core/PlatformRef#bootstrapModule) method from either [`platformBrowser`](api/platform-browser/platformBrowser) or [`platformServer`](api/platform-server/platformServer) to start an Angular application. When run, this function locates any elements on the page with a CSS selector that matches the listed component(s) and renders those components on the page.

```typescript
import {platformBrowser} from '@angular/platform-browser';

@NgModule({
  bootstrap: [MyApplication],
})
export class MyApplicationModule {}

platformBrowser().bootstrapModule(MyApplicationModule);
```

Components listed in `bootstrap` are automatically included in the NgModule's declarations.

When you bootstrap an application from an NgModule, the collected `providers` of this module and all of the `providers` of its `imports` are eagerly loaded and available to inject for the entire application.
-->

중요: Angular 팀은 새로 작성하는 모든 코드에서 `bootstrapModule` 대신 [bootstrapApplication](api/platform-browser/bootstrapApplication)을 사용하는 것을 권장합니다.
이 가이드는 `@NgModule`로 부트스트랩하는 기존 애플리케이션을 이해할 때 참고하세요.

`@NgModule` 데코레이터에는 하나 이상의 컴포넌트를 담는 `bootstrap` 배열을 선택적으로 지정할 수 있습니다.

[`platformBrowser`](api/platform-browser/platformBrowser)나 [`platformServer`](api/platform-server/platformServer)의 [`bootstrapModule`](/api/core/PlatformRef#bootstrapModule) 메서드로 Angular 애플리케이션을 시작할 수 있습니다.
이 함수를 실행하면 등록한 컴포넌트의 CSS 셀렉터와 일치하는 엘리먼트를 페이지에서 찾아 해당 위치에 컴포넌트를 렌더링합니다.

```typescript
import {platformBrowser} from '@angular/platform-browser';

@NgModule({
  bootstrap: [MyApplication],
})
export class MyApplicationModule {}

platformBrowser().bootstrapModule(MyApplicationModule);
```

`bootstrap`에 등록한 컴포넌트는 NgModule의 선언에 자동으로 포함됩니다.

NgModule로 애플리케이션을 부트스트랩하면 해당 모듈의 `providers`와 `imports`로 로드한 모든 프로바이더를 즉시 로드하며, 애플리케이션 전체에서 이 프로바이더를 주입할 수 있습니다.
