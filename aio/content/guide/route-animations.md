<!--
# Route transition animations
-->
# 라우팅 애니메이션

<!--
Routing enables users to navigate between different routes in an application.
-->
라우팅을 활용하면 애플리케이션에 적용되는 라우팅 규칙을 변경되면서 화면을 전환할 수 있습니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following concepts:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)
*   [Reusable animations](guide/reusable-animations)
-->
이 문서를 보기 전에 다음 내용은 미리 이해하고 있는 것이 좋습니다.

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션, 트리거](guide/transition-and-triggers)
*   [애니메이션 재사용하기](guide/reusable-animations)


<!--
## Enable routing transition animation
-->
## 라우팅 전환 애니메이션 활성화하기

<!--
When a user navigates from one route to another, the Angular router maps the URL path to a relevant component and displays its view.
Animating this route transition can greatly enhance the user experience.

The Angular router comes with high-level animation functions that let you animate the transitions between views when a route changes.
To produce an animation sequence when switching between routes, you need to define nested animation sequences.
Start with the top-level component that hosts the view, and nest animations in the components that host the embedded views.

To enable routing transition animation, do the following:

1.  Create a routing configuration that defines the possible routes. For NgModule based applications, this will include creating a `RouterModule` and adding it to the main `AppModule`.
1.  Add a router outlet to tell the Angular router where to place the activated components in the DOM.
1.  Define the animation.

Illustrate a router transition animation by navigating between two routes, *Home* and *About* associated with the `HomeComponent` and `AboutComponent` views respectively.
Both of these component views are children of the top-most view, hosted by `AppComponent`.
Implement a router transition animation that slides in the new view to the right and slides out the old view when navigating between the two routes.

<div class="lightbox">

<img alt="Animations in action" width="440" src="generated/images/guide/animations/route-animation.gif">

</div>
-->
이 문서를 보기 전에 다음 내용은 미리 이해하고 있는 것이 좋습니다.

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션, 트리거](guide/transition-and-triggers)
*   [애니메이션 재사용하기](guide/reusable-animations)

Angular 애플리케이션에서는 라우터가 조건에 맞는 라우팅 규칙(route)을 선택하면서 화면을 전환합니다.
그리고 Angular 라우터는 라우팅 규칙에 지정된 대로 URL 경로와 컴포넌트를 화면에 표시하는데, 이 때 화면이 전환되는 애니메이션을 적용하면 사용성을 크게 높일 수 있습니다.

Angular 라우터가 제공하는 애니메이션 기능은 라우팅 규칙이 변경될 때 다양하게 활용할 수 있습니다.
이 때 사용하는 애니메이션은 시퀀스로 지정하는데, 화면에서 호스트가 되는 최상위 컴포넌트부터 뷰 안에 포함된 컴포넌트에도 애니메이션을 지정할 수 있습니다.

화면 전환 애니메이션을 적용하려면 다음과 같이 작업합니다:

1. 라우팅 규칙을 정의합니다. NgModule 방식으로 개발한 애플리케이션이라면 이 라우팅 규칙이 `RouterModule`에 등록되며 `AppModule`로 로드할 것입니다. 
1. 라우팅 규칙과 연결된 컴포넌트가 DOM에 표시되도록 라우팅 영역\(router outlet\)을 추가합니다
1. 애니메이션을 정의합니다.

*Home* 화면에서 *About* 화면으로 이동하는 동안 `HomeComponent`와 `AboutComponent`에 애니메이션이 어떻게 적용되는지 살펴봅시다.
두 컴포넌트는 `AppComponent`의 자식 컴포넌트입니다.
라우팅이 진행되는 동안 기존에 표시되던 화면은 오른쪽으로 이동하면서 사라지고, 새로운 화면은 왼쪽에서 들어오면서 표시되도록 예제 코드를 작성해 봅시다.

<div class="lightbox">

<img alt="Animations in action" width="440" src="generated/images/guide/animations/route-animation.gif">

</div>


<!--
## Route configuration
-->
## 라우팅 규칙 설정

<!--
To begin, configure a set of routes. This route configuration tells the router how to navigate.

- Create an array called `routes` in `app.routes.ts` to define a set of routes. 
- Add the routes to the `provideRouter` function in the providers array in `app.config.ts`.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

<div class="alert is-helpful">

**NOTE**: <br />
For `NgModule` based applications:

Use the `RouterModule.forRoot` method to define a set of routes.
Also, add `RouterModule` to the `imports` array of the main module, `AppModule`.

Use the `RouterModule.forRoot` method in the root module, `AppModule`, to register top-level application routes and providers.
For feature modules, call the `RouterModule.forChild` method instead.

</div>

The following configuration defines the possible routes for the application.

<code-example header="src/app/app.routes.ts" path="animations/src/app/app.routes.ts" region="route-animation-data"></code-example>

The `home` and `about` paths are associated with the `HomeComponent` and `AboutComponent` views.
The route configuration tells the Angular router to instantiate the `HomeComponent` and `AboutComponent` views when the navigation matches the corresponding path.

The `data` property of each route defines the key animation-specific configuration associated with a route.
The `data` property value is passed into `AppComponent` when the route changes.

<div class="alert is-helpful">

**NOTE**: <br />
The `data` property names that you use can be arbitrary.
For example, the name *animation* used in the preceding example is an arbitrary choice.

</div>
-->
먼저, 라우팅 규칙을 정의합니다.
라우터는 라우팅 규칙 설정에 따라 화면을 전환합니다.

- `app.routes.ts` 파일을 만들고 `routes`라는 배열을 정의합니다.
- 이렇게 정의한 라우팅 규칙을 `app.config.ts` 배열에 `provideRouter` 함수로 등록합니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

<div class="alert is-helpful">

**참고**: <br />
`NgModule` 기반으로 개발한 애플리케이션은:

라우팅 규칙을 정의할 때 `RouterModule.forRoot` 메서드를 사용하세요.
그런 후에 `RouterModule`을 메인 모듈 `AppModule`의 `imports` 배열에 추가하면 됩니다.

`RouterModule.forRoot()` 메소드 실행 결과를 `AppModule`에 등록하면 앱 전역에 라우팅 규칙과 라우팅 관련 서비스 프로바이더가 등록됩니다.
그래서 자식 모듈에서는 자연스럽게 서비스 프로바이더를 사용할 수 있으며, 라우팅 규칙을 지정하려면 `RouterModule.forChild()` 메소드를 사용하면 됩니다.

</div>

이번 예제에서는 이렇게 정의합니다.

<code-example header="src/app/app.routes.ts" path="animations/src/app/app.routes.ts" region="route-animation-data"></code-example>

코드에서 보면 `home`과 `about` 경로는 각각 `HomeComponent`, `AboutComponent`와 연결되어 있습니다.
그래서 URL이 변경되면 라우터가 `HomeComponent`, `AboutComponent` 인스턴스를 생성해서 화면에 표시합니다.

그리고 라우팅 규칙에 `data` 프로퍼티를 사용하면 `AppComponent`에서 이 프로퍼티 값을 받을 수 있습니다. 

<div class="alert is-helpful">

**참고**: <br />
`data` 객체에 사용한 프로퍼티 이름은 임의로 지정한 것입니다.
이 예제에서는 *animation*이라고 지정했으며, 다른 이름으로 사용해도 됩니다.

</div>


<!--
## Router outlet
-->
## 라우팅 영역(router outlet)

<!--
After configuring the routes, add a `<router-outlet>` inside the root `AppComponent` template.
The `<router-outlet>` directive tells the Angular router where to render the views when matched with a route.

The `ChildrenOutletContexts` holds information about outlets and activated routes.
The `data` property of each `Route` can be used to animate routing transitions.

<code-example header="src/app/app.component.html" path="animations/src/app/app.component.html" region="route-animations-outlet"></code-example>

`AppComponent` defines a method that can detect when a view changes.
The method assigns an animation state value to the animation trigger \(`@routeAnimation`\) based on the route configuration `data` property value.
Here's an example of an `AppComponent` method that detects when a route change happens.

<code-example header="src/app/app.component.ts" path="animations/src/app/app.component.ts" region="get-route-animations-data"></code-example>

The `getRouteAnimationData()` method takes the value of the outlet. It returns a string that represents the state of the animation based on the custom data of the current active route.
Use this data to control which transition to run for each route.
-->
라우팅 규칙을 선언하고 나면 라우팅 규칙에 연결된 컴포넌트가 화면에 표시될 위치를 지정해야 합니다.
이번 예제에서는 `AppComponent` 템플릿에 `<router-outlet>`를 추가하는 방식으로 지정합니다.

`<router-outlet>` 디렉티브는 현재 활성화된 라우팅 규칙에 대한 커스텀 데이터를 `activatedRouteData` 프로퍼티에 담고 있습니다.
라우팅 애니메이션에 이 데이터를 활용할 수 있습니다.

<code-example header="src/app/app.component.html" path="animations/src/app/app.component.html" region="route-animations-outlet"></code-example>

`AppComponent`에는 화면이 전환되는 것을 감지할 수 있는 메소드를 정의합니다.
이 메소드는 활성화된 라우팅 규칙에 있는 `data` 프로퍼티 값을 참고해서 애니메이션 트리거\(`@routeAnimations`\)에 적절한 상태를 연결합니다.
아래와 같은 방식으로 구현합니다.

<code-example header="src/app/app.component.ts" path="animations/src/app/app.component.ts" region="get-route-animations-data"></code-example>

이 코드에서 `prepareRoute()` 메소드는 라우팅 영역 디렉티브\(`#outlet="outlet"`\)를 인자로 받아서 현재 활성화된 라우팅 규칙과 이 규칙에 있는 데이터 값을 기반으로 적절한 상태를 문자열로 반환합니다.
그래서 트랜지션은 이 데이터로 조절할 수 있습니다.


<!--
## Animation definition
-->
## 애니메이션 정의하기

<!--
Animations can be defined directly inside your components.
For this example you are defining the animations in a separate file, which allows re-use of animations.

The following code snippet defines a reusable animation named `slideInAnimation`.

<code-example header="src/app/animations.ts" path="animations/src/app/animations.ts" region="route-animations"></code-example>

The animation definition performs the following tasks:

*   Defines two transitions \(a single `trigger` can define multiple states and transitions\)
*   Adjusts the styles of the host and child views to control their relative positions during the transition
*   Uses `query()` to determine which child view is entering and which is leaving the host view

A route change activates the animation trigger, and a transition matching the state change is applied.

<div class="alert is-helpful">

**NOTE**: <br />
The transition states must match the `data` property value defined in the route configuration.

</div>

Make the animation definition available in your application by adding the reusable animation \(`slideInAnimation`\) to the `animations` metadata of the `AppComponent`.

<code-example header="src/app/app.component.ts" path="animations/src/app/app.component.ts" region="define"></code-example>

So, let's break down the animation definition and see more closely what it does&hellip;
-->
애니메이션은 컴포넌트에 직접 정의할 수 있습니다.
하지만 이번에는 이 애니메이션을 재사용할 수 있도록 별도 파일에 정의해 봅시다.

다음과 같은 애니메이션 파일을 작성합니다.

<code-example header="src/app/animations.ts" path="animations/src/app/animations.ts" region="route-animations"></code-example>

이 애니메이션은 다음과 같이 동작합니다:

*   `routeAnimations` 트리거에 연결된 트랜지션은 두 개 입니다. 이 트랜지션은 동시에 시작됩니다.
*   트랜지션이 진행되는 동안에는 호스트 엘리먼트와 자식 엘리먼트가 상대 위치로 조정됩니다.
*   호스트 화면에 들어오는 자식 화면과 화면에서 나가는 자식 화면을 탐색하기 위해 `query()` 함수를 사용했습니다.

이제 라우팅 규칙이 변경되면 애니메이션 트리거가 발생하고 상태에 맞는 트랜지션이 시작됩니다.

<div class="alert is-helpful">

**참고**: <br />
트랜지션 상태는 라우팅 규칙에 정의한 `data` 프로퍼티와 맞아야 합니다.

</div>

이렇게 정의한 애니메이션은 `AppComponent` 메타데이터의 `animations` 배열에 추가하면 애플리케이션에 등록할 수 있습니다.

<code-example header="src/app/app.component.ts" path="animations/src/app/app.component.ts" region="define"></code-example>

이제 애니메이션 정의 부분을 좀 더 자세하게 봅시다&hellip;


<!--
### Style the host and child components
-->
### 호스트/자식 컴포넌트 스타일 지정하기

<!--
During a transition, a new view is inserted directly after the old one and both elements appear on screen at the same time.
To prevent this behavior, update the host view to use relative positioning.
Then, update the removed and inserted child views to use absolute positioning.
Adding these styles to the views animates the containers in place and prevents one view from affecting the position of the other on the page.

<code-example header="src/app/animations.ts (excerpt)" path="animations/src/app/animations.ts" region="style-view"></code-example>
-->
트랜지션이 진행되는 동안에는 새로운 화면이 이전에 있던 화면을 대체하는 애니메이션이 함께 진행되기 때문에 두 화면이 동시에 표시되는 순간이 있습니다.
이 문제를 해결하려면 호스트 화면이 상대적인 위치를 사용하도록 수정하고, 새로 들어오는 자식 화면은 절대(absolute) 위치를 사용하면 됩니다.
이렇게 수정하면 애니메이션이 적용된 화면이 제위치에서 움직이며 다른 화면에 영향을 주는 것도 방지할 수 있습니다.

<code-example header="src/app/animations.ts (일부)" path="animations/src/app/animations.ts" region="style-view"></code-example>


<!--
### Query the view containers
-->
### 뷰 컨테이너 쿼리하기

<!--
Use the `query()` method to find and animate elements within the current host component.
The `query(":enter")` statement returns the view that is being inserted, and `query(":leave")` returns the view that is being removed.

Assume that you are routing from the *Home =&gt; About*.

<code-example header="src/app/animations.ts (excerpt)" path="animations/src/app/animations.ts" region="query"></code-example>

The animation code does the following after styling the views:

1.  `query(':enter', style({ left: '-100%' }))` matches the view that is added and hides the newly added view by positioning it to the far left.
1.  Calls `animateChild()` on the view that is leaving, to run its child animations.
1.  Uses [`group()`](api/animations/group) function to make the inner animations run in parallel.
1.  Within the [`group()`](api/animations/group) function:
    1.  Queries the view that is removed and animates it to slide far to the right.
    1.  Slides in the new view by animating the view with an easing function and duration.

        This animation results in the `about` view sliding in from the left.

1.  Calls the `animateChild()` method on the new view to run its child animations after the main animation completes.

You now have a basic routable animation that animates routing from one view to another.
-->
`query()` 메소드를 사용하면 현재 호스트 컴포넌트 안에 있는 엘리먼트를 탐색할 수 있습니다.
그래서 `query(":enter")`라는 실행문으로 화면에 추가되는 엘리먼트를 찾을 수 있으며 `query(":leave")` 실행문으로 화면에서 제거되는 엘리먼트를 찾을 수 있습니다.

*Home =&gt; About*으로 이동하는 경우를 생각해 봅시다.

<code-example header="src/app/animations.ts (일부)" path="animations/src/app/animations.ts" region="query"></code-example>

이 때 애니메이션 코드는 다음과 같은 순서로 동작합니다:

1.  `query(':enter', style({ left: '-100%' }))`는 화면에 추가되는 엘리먼트에 매칭되며 처음에는 보이지 않도록 화면 왼쪽에 배치됩니다.
1.  화면에서 사라지는 엘리먼트는 `animateChild()`를 실행해서 자식 애니메이션을 시작합니다.
1.  자식 애니메이션은 동시에 시작하기 위해 [`group()`](api/animations/group) 함수를 사용했습니다.
1.  [`group()`](api/animations/group) 함수 안에서는:
    1.  화면에서 사라지는 엘리먼트를 찾아서 화면 오른쪽으로 이동합니다.
    1.  새로운 화면을 일반 가속도 함수로 움직입니다.

        결국 `about` 화면은 화면 왼쪽부터 오른쪾으로 움직입니다.

1.  새로운 화면이 나타나는 애니메이션이 끝난 후에 `animateChild()` 메소드가 실행되면서 자식 애니메이션이 시작됩니다.

지금까지 화면을 전환할 때 애니메이션을 적용하는 방법에 대해 알아봤습니다.

<!--
## More on Angular animations
-->
## 더 알아보기

<!--
You might also be interested in the following:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)
*   [Complex animation sequences](guide/complex-animation-sequences)
*   [Reusable animations](guide/reusable-animations)
-->
이런 내용에 대해서도 알아보세요:

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션, 트리거](guide/transition-and-triggers)
*   [복잡한 애니메이션 시퀀스](guide/complex-animation-sequences)
*   [애니메이션 재사용하기](guide/reusable-animations)


@reviewed 2022-10-11
