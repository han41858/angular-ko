<!--
# Define a Route
-->
# 라우팅 규칙 정의하기

<!--
Now that you've set up the app to use Angular Router, you need to define the routes.

Note: Learn more about [defining a basic route in the in-depth guide](/guide/routing/common-router-tasks#defining-a-basic-route).

In this activity, you'll learn how to add and configure routes with your app.

<hr>

<docs-workflow>

<docs-step title="Define a route in `app.routes.ts`">

In your app, there are two pages to display: (1) Home Page and (2) User Page.

To define a route, add a route object to the `routes` array in `app.routes.ts` that contains:

- The `path` of the route (which automatically starts at the root path (i.e., `/`))
- The `component` that you want the route to display

```ts
import {Routes} from '@angular/router';

import {Home} from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
];
```

The code above is an example of how `Home` can be added as a route. Now go ahead and implement this along with the `User` in the playground.

Use `'user'` for the path of `User`.

</docs-step>

<docs-step title="Add title to route definition">

In addition to defining the routes correctly, Angular Router also enables you to set the page title whenever users are navigating by adding the `title` property to each route.

In `app.routes.ts`, add the `title` property to the default route (`path: ''`) and the `user` route. Here's an example:

<docs-code language="ts" highlight="[8]">
import {Routes} from '@angular/router';

import {Home} from './home/home';

export const routes: Routes = [
{
path: '',
title: 'App Home Page',
component: Home,
},
];
</docs-code>

</docs-step>

</docs-workflow>

In the activity, you've learned how to define and configure routes in your Angular app. Nice work. 🙌

The journey to fully enabling routing in your app is almost complete, keep going.
-->
이제 Angular Router를 사용할 준비가 되었기 때문에, 라우팅 규칙(route)을 정의해야 합니다.

참고: 자세한 내용은 [기본 라우팅 규칙 정의하기 심화 가이드](/guide/routing/common-router-tasks#defining-a-basic-route) 문서를 참고하세요.

이번 예제에서는 라우팅 규칙을 어떻게 정의하는지 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="Define a route in `app.routes.ts`">

예제 앱에는 표시할 화면이 (1) 홈 화면과 (2) 사용자 화면 이렇게 2개 있습니다.

라우팅 규칙을 정의하려면 `app.routes.ts` 파일의 `routes` 배열에 라우팅 규칙 객체를 추가하면 됩니다.
이 객체에 필요한 프로퍼티는 이렇습니다:

- `path` - 최상위 경로(ex. `/`)로 시작하는 경로
- `component` - 라우팅 규칙이 매칭되었을 때 표시할 컴포넌트

```ts
import {Routes} from '@angular/router';

import {Home} from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
];
```

위 코드는 `Home` 컴포넌트를 추가하는 라우팅 규칙을 정의한 예제 코드입니다.
이제 `User` 컴포넌트를 라우팅 규칙으로 추가해 봅시다.

`'user'` 경로로 연결하면 됩니다.

</docs-step>

<docs-step title="라우팅 규칙에 제목을 추가합니다">

Angular Router를 사용하면 라우팅 규칙을 정확한 규격으로 정의할 수 있으며, `title` 프로퍼티를 사용해서 라우팅 규칙마다 화면 제목을 지정할 수 있습니다.

`app.routes.ts` 파일에서 기본 라우팅 규칙(`path: ''`)에 `title` 프로퍼티를 추가해보고, `user`로 연결되는 라우팅 규칙도 추가해 봅시다.
이렇게 작성하면 됩니다:

<docs-code language="ts" highlight="[8]">
import {Routes} from '@angular/router';

import {Home} from './home/home';

export const routes: Routes = [
{
path: '',
title: 'App Home Page',
component: Home,
},
];
</docs-code>

</docs-step>

</docs-workflow>

이번 예제에서는 Angular 앱에 라우팅 규칙을 선언하고 추가하는 방법을 알아봤습니다.
잘 하셨습니다. 🙌

라우팅 준비작업이 거의 다 되었습니다.
계속 진행해 봅시다.
