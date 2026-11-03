<!--
# Add routes to the application

This tutorial lesson demonstrates how to add routes to your app.

<docs-video src="https://www.youtube.com/embed/r5DEBMuStPw?si=H6Bx6nLJoMLaMxkx" />

IMPORTANT: We recommend using your local environment to learn routing.
-->

# 애플리케이션에 라우팅 규칙 추가하기

이번 실습에서는 앱에 라우팅 규칙을 추가하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/r5DEBMuStPw?si=H6Bx6nLJoMLaMxkx" />

IMPORTANT: 라우팅 실습은 로컬 환경에서 진행하는 것을 권장합니다.

<!--
## What you'll learn

At the end of this lesson your application will have support for routing.
-->

<a id="what-youll-learn"></a>

## 학습 목표

이번 실습을 마치면 애플리케이션에서 라우팅을 사용할 수 있습니다.

<!--
## Conceptual preview of routing

This tutorial introduces routing in Angular. Routing is the ability to navigate from one component in the application to another. In [Single Page Applications (SPA)](guide/routing), only parts of the page are updated to represent the requested view for the user.

The [Angular Router](guide/routing) enables users to declare routes and specify which component should be displayed on the screen if that route is requested by the application.

In this lesson, you will enable routing in your application to navigate to the details page.

<docs-workflow>
-->

<a id="conceptual-preview-of-routing"></a>

## 라우팅 개념 살펴보기

이번 실습에서는 Angular 라우팅을 소개합니다. 라우팅은 애플리케이션의 한 컴포넌트에서 다른 컴포넌트로 이동하는 기능입니다. [싱글 페이지 애플리케이션(SPA)](guide/routing)에서는 사용자가 요청한 화면을 표시하기 위해 페이지의 일부만 갱신합니다.

[Angular 라우터](guide/routing)를 사용하면 라우팅 규칙을 선언하고 해당 경로를 요청했을 때 표시할 컴포넌트를 지정할 수 있습니다.

이번 실습에서는 애플리케이션에서 상세 페이지로 이동할 수 있도록 라우팅을 활성화합니다.

<docs-workflow>

<!--
<docs-step title="Create a default details component ">
1. From the terminal, enter the following command to create the `Details`:

    ```shell
    ng generate component details
    ```

    This component will represent the details page that provides more information on a given housing location.

</docs-step>
-->

<docs-step title="기본 상세 페이지 컴포넌트 만들기">

<a id="create-a-default-details-component-"></a>

1. 터미널에서 다음 명령어로 `Details`를 만드세요:

   ```shell
   ng generate component details
   ```

   이 컴포넌트는 특정 주택의 자세한 정보를 제공하는 상세 페이지를 표시합니다.

</docs-step>

<!--
<docs-step title="Add routing to the application">
1.  In the `src/app` directory, create a file called `routes.ts`. This file is where we will define the routes in the application.

2.  In `main.ts`, make the following updates to enable routing in the application:
    1.  Import the routes file and the `provideRouter` function:

          <docs-code header="Import routing details in src/main.ts" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/main.ts" visibleLines="[3,4]"/>

    1.  Update the call to `bootstrapApplication` to include the routing configuration:

          <docs-code header="Add router configuration in src/main.ts" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/main.ts" visibleLines="[6,8]"/>

3.  In `src/app/app.ts`, update the component to use routing:
    1.  Add file level imports for the router directives `RouterOutlet` and `RouterLink`:

          <docs-code language="angular-ts" header="Import router directives in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[3]"/>

    1.  Add `RouterOutlet` and `RouterLink` to the `@Component` metadata imports

          <docs-code language="angular-ts" header="Add router directives to component imports in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[6]"/>

    1.  In the `template` property, replace the `<app-home />` tag with the `<router-outlet>` directive and add a link back to the home page. Your code should match this code:

          <docs-code language="angular-ts" header="Add router-outlet in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[7,18]"/>

</docs-step>
-->

<docs-step title="애플리케이션에 라우팅 추가하기">

<a id="add-routing-to-the-application"></a>

1. `src/app` 디렉터리에 `routes.ts` 파일을 만드세요. 이 파일에 애플리케이션의 라우팅 규칙을 정의합니다.

2. 애플리케이션에서 라우팅을 활성화하도록 `main.ts`를 다음과 같이 수정하세요:
   1. 라우팅 규칙 파일과 `provideRouter` 함수를 불러오세요:

     <docs-code header="src/main.ts에서 라우팅 관련 항목 불러오기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/main.ts" visibleLines="[3,4]"/>
   1. 라우팅 설정을 포함하도록 `bootstrapApplication` 호출을 수정하세요:

     <docs-code header="src/main.ts에 라우터 설정 추가하기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/main.ts" visibleLines="[6,8]"/>

3. `src/app/app.ts`에서 컴포넌트가 라우팅을 사용하도록 수정하세요:
   1. 파일 수준에 라우터 디렉티브인 `RouterOutlet`과 `RouterLink`를 불러오는 구문을 추가하세요:

     <docs-code language="angular-ts" header="src/app/app.ts에서 라우터 디렉티브 불러오기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[3]"/>
   1. `@Component` 메타데이터의 imports에 `RouterOutlet`과 `RouterLink`를 추가하세요.

     <docs-code language="angular-ts" header="src/app/app.ts의 컴포넌트 imports에 라우터 디렉티브 추가하기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[6]"/>
   1. `template` 프로퍼티의 `<app-home />` 태그를 `<router-outlet>` 디렉티브로 바꾸고 홈 페이지로 돌아오는 링크를 추가하세요. 다음 코드와 같아야 합니다:

     <docs-code language="angular-ts" header="src/app/app.ts에 router-outlet 추가하기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/app.ts" visibleLines="[7,18]"/>

</docs-step>

<!--
<docs-step title="Add route to new component">
In the previous step you removed the reference to the `<app-home>` component in the template. In this step, you will add a new route to that component.

1. In `routes.ts`, perform the following updates to create a route.
   1. Add a file level imports for the `Home`, `Details` and the `Routes` type that you'll use in the route definitions.

      <docs-code header="Import components and Routes" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/routes.ts" visibleLines="[1,3]"/>

   1. Define a variable called `routeConfig` of type `Routes` and define two routes for the app:
      <docs-code header="Add routes to the app" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/routes.ts" visibleLines="[5,18]"/>

      The entries in the `routeConfig` array represent the routes in the application. The first entry navigates to the `Home` whenever the url matches `''`. The second entry uses some special formatting that will be revisited in a future lesson.

1. Save all changes and confirm that the application works in the browser. The application should still display the list of housing locations.
   </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you enabled routing in your app as well as defined new routes. Now your app can support navigation between views. In the next lesson, you will learn to navigate to the "details" page for a given housing location.

You are making great progress with your app, well done.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/routing" title="Routing in Angular Overview"/>
  <docs-pill href="guide/routing/common-router-tasks" title="Common Routing Tasks"/>
</docs-pill-row>
-->

<docs-step title="컴포넌트의 라우팅 규칙 추가하기">

<a id="add-route-to-new-component"></a>

앞 단계에서 템플릿의 `<app-home>` 컴포넌트를 제거했습니다. 이 단계에서는 해당 컴포넌트로 이동하는 라우팅 규칙을 추가합니다.

1. `routes.ts`에서 다음과 같이 라우팅 규칙을 만드세요.
   1. 파일 수준에 `Home`, `Details`와 라우팅 규칙 정의에 사용할 `Routes` 타입을 불러오는 구문을 추가하세요.

      <docs-code header="컴포넌트와 Routes 불러오기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/routes.ts" visibleLines="[1,3]"/>

   1. `Routes` 타입의 `routeConfig` 변수를 만들고 앱의 라우팅 규칙 두 개를 정의하세요:
      <docs-code header="앱에 라우팅 규칙 추가하기" path="adev/src/content/tutorials/first-app/steps/11-details-page/src/app/routes.ts" visibleLines="[5,18]"/>

      `routeConfig` 배열의 각 항목은 애플리케이션의 라우팅 규칙입니다. 첫 번째 항목은 URL이 `''`와 일치할 때 `Home`으로 이동합니다. 두 번째 항목의 특별한 형식은 이후 실습에서 다룹니다.

1. 모든 변경 사항을 저장하고 브라우저에서 애플리케이션이 동작하는지 확인하세요. 이전과 동일하게 주택 목록이 표시되어야 합니다.
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 앱의 라우팅을 활성화하고 새 라우팅 규칙을 정의했습니다. 이제 화면 사이를 이동할 수 있습니다. 다음 실습에서는 특정 주택의 상세 페이지로 이동하는 방법을 알아봅니다.

앱 개발이 순조롭게 진행되고 있습니다. 잘하셨습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/routing" title="Angular 라우팅 개요"/>
  <docs-pill href="guide/routing/common-router-tasks" title="일반적인 라우팅 작업"/>
</docs-pill-row>
