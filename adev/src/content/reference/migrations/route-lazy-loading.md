<!--
# Migration to lazy-loaded routes
-->

<a id="migration-to-lazy-loaded-routes"></a>

# 지연 로딩 라우팅 규칙으로 마이그레이션하기

<!--
This schematic helps developers to convert eagerly loaded component routes to lazy loaded routes. This allows the build process to split the production bundle into smaller chunks, to avoid a big JS bundle that includes all routes, which negatively affects initial page load of an application.
-->

이 스키매틱은 즉시 로딩되는 컴포넌트의 라우팅 규칙을 지연 로딩 라우팅 규칙으로 변환하도록 돕습니다. 이를 통해 빌드 과정에서 프로덕션 번들을 더 작은 청크로 나눌 수 있습니다. 따라서 모든 라우팅 규칙을 포함한 큰 JavaScript 번들이 애플리케이션의 초기 페이지 로딩에 악영향을 주는 것을 피할 수 있습니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:route-lazy-loading
```

<!--
### `path` config option
-->

<a id="path-config-option"></a>

### `path` 설정 옵션

<!--
By default, migration will go over the entire application. If you want to apply this migration to a subset of the files, you can pass the path argument as shown below:
-->

기본적으로 마이그레이션은 애플리케이션 전체를 살펴봅니다. 일부 파일에만 적용하려면 다음과 같이 path 인수를 전달하세요.

```shell
ng generate @angular/core:route-lazy-loading --path src/app/sub-component
```

<!--
The value of the path parameter is a relative path within the project.
-->

path 매개변수의 값은 프로젝트 내부의 상대 경로입니다.

<!--
### How does it work?
-->

<a id="how-does-it-work"></a>

### 어떻게 동작하나요?

<!--
The schematic will attempt to find all the places where the application routes as defined:
-->

스키매틱은 애플리케이션의 라우팅 규칙을 정의한 다음 위치를 모두 찾으려고 시도합니다.

<!--
- `RouterModule.forRoot` and `RouterModule.forChild`
- `Router.resetConfig`
- `provideRouter`
- variables of type `Routes` or `Route[]` (e.g. `const routes: Routes = [{...}]`)
-->

- `RouterModule.forRoot` 및 `RouterModule.forChild`
- `Router.resetConfig`
- `provideRouter`
- `Routes` 또는 `Route[]` 타입의 변수(예: `const routes: Routes = [{...}]`)

<!--
The migration will check all the components in the routes, check if they are standalone and eagerly loaded, and if so, it will convert them to lazy loaded routes.
-->

마이그레이션은 라우팅 규칙의 모든 컴포넌트를 살펴보고, 독립형이면서 즉시 로딩되는 컴포넌트라면 지연 로딩 라우팅 규칙으로 변환합니다.

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```typescript {header: "app.module.ts"}
import {Home} from './home';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        // Home is standalone and eagerly loaded
        component: Home,
      },
    ]),
  ],
})
export class AppModule {}
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```typescript {header: "app.module.ts"}
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        // ↓ Home is now lazy loaded
        loadComponent: () => import('./home').then((m) => m.Home),
      },
    ]),
  ],
})
export class AppModule {}
```

<!--
This migration will also collect information about all the components declared in NgModules and output the list of routes that use them (including corresponding location of the file). Consider making those components standalone and run this migration again. You can use an existing migration ([see](reference/migrations/standalone)) to convert those components to standalone.
-->

이 마이그레이션은 NgModule에 선언된 모든 컴포넌트의 정보도 수집하여 해당 컴포넌트를 사용하는 라우팅 규칙 목록과 파일 위치를 출력합니다. 이러한 컴포넌트를 독립형으로 바꾼 뒤 이 마이그레이션을 다시 실행해 보세요. 기존 [독립형 마이그레이션](reference/migrations/standalone)을 사용하여 해당 컴포넌트를 변환할 수 있습니다.
