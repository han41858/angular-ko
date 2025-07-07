<!--
# Routing Overview
-->
# 라우팅(Routing) 개요

<!--
For most apps, there comes a point where the app requires more than a single page. When that time inevitably comes, routing becomes a big part of the performance story for users.

Note: Learn more about [routing in the in-depth guide](/guide/routing).

In this activity, you'll learn how to set up and configure your app to use Angular Router.

<hr>

<docs-workflow>

<docs-step title="Create an app.routes.ts file">

Inside `app.routes.ts`, make the following changes:

1. Import `Routes` from the `@angular/router` package.
2. Export a constant called `routes` of type `Routes`, assign it `[]` as the value.

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [];
```

</docs-step>

<docs-step title="Add routing to provider">

In `app.config.ts`, configure the app to Angular Router with the following steps:

1. Import the `provideRouter` function from `@angular/router`.
1. Import `routes` from the `./app.routes.ts`.
1. Call the `provideRouter` function with `routes` passed in as an argument in the `providers` array.

<docs-code language="ts" highlight="[2,3,6]">
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
providers: [provideRouter(routes)],
};
</docs-code>

</docs-step>

<docs-step title="Import `RouterOutlet` in the component">

Finally, to make sure your app is ready to use the Angular Router, you need to tell the app where you expect the router to display the desired content. Accomplish that by using the `RouterOutlet` directive from `@angular/router`.

Update the template for `App` by adding `<router-outlet />`

<docs-code language="angular-ts" highlight="[11]">
import {RouterOutlet} from '@angular/router';

@Component({
...
template: `     <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet />
  `,
imports: [RouterOutlet],
})
export class App {}
</docs-code>

</docs-step>

</docs-workflow>

Your app is now set up to use Angular Router. Nice work! 🙌

Keep the momentum going to learn the next step of defining the routes for our app.
-->
웹앱은 대부분 여러 화면을 전환하며 동작합니다.
그래서 라우팅은 사용자가 느끼는 앱 성능 중에서도 큰 영향을 미치는 요소입니다.

참고: 자세한 내용은 [라우팅 심화 가이드](/guide/routing) 문서를 참고하세요.

이번 예제에서는 Angular Router를 사용할 수 있도록 앱을 구성하는 방법을 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="app.routes.ts 파일을 생성합니다">

`app.routes.ts` 파일에서 이런 내용을 수정해 봅시다:

1. `@angular/router` 패키지로 제공되는 `Routes`를 불러옵니다.
2. `Routes` 타입으로 선언한 `routes`를 파일 외부로 내보냅니다. 이 변수는 값을 `[]`로 지정하는 배열 타입입니다.

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [];
```

</docs-step>

<docs-step title="프로바이더에 라우팅 규칙을 추가합니다">

`app.config.ts` 파일을 열고 다음 단계로 Angular Router를 설정합니다:

1. `@angular/router` 패키지로 제공되는 `provideRouter` 함수를 불러옵니다.
1. `./app.routes.ts` 파일에 선언한 `routes` 를 불러옵니다..
1. `providers` 배열에서 `provideRouter` 함수를 실행하면서 `routes` 를 인자로 전달합니다.

<docs-code language="ts" highlight="[2,3,6]">
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
providers: [provideRouter(routes)],
};
</docs-code>

</docs-step>

<docs-step title="컴포넌트에서 `RouterOutlet` 를 로드합니다">

마지막으로 Angular Router를 사용하려면 원하는 화면을 앱의 어느 위치에 표시할 지 지정해야 합니다.
이 위치는 `@angular/router`로 제공되는 `RouterOutlet` 디렉티브로 지정합니다.

`App` 컴포넌트의 템플릿을 수정해서 `<router-outlet />` 를 추가해 봅시다.

<docs-code language="angular-ts" highlight="[11]">
import {RouterOutlet} from '@angular/router';

@Component({
...
template: `     <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet />
  `,
imports: [RouterOutlet],
})
export class App {}
</docs-code>

</docs-step>

</docs-workflow>

이제 Angular Router를 사용할 준비가 모두 끝났습니다. 잘 하셨습니다! 🙌

라우팅 규칙을 선언하는 방법은 다음 단계에서 알아봅시다.
