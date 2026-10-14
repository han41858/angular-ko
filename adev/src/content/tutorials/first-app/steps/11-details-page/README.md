<!--
# Integrate details page into application

This tutorial lesson demonstrates how to connect the details page to your app.

<docs-video src="https://www.youtube.com/embed/-jRxG84AzCI?si=CbqIpmRpwp5ZZDnu&amp;start=345"/>

IMPORTANT: We recommend using your local environment to learn routing.
-->

# 앱에 상세 페이지 연결하기

이번 실습에서는 앱에 상세 페이지를 연결하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/-jRxG84AzCI?si=CbqIpmRpwp5ZZDnu&amp;start=345"/>

IMPORTANT: 라우팅 실습은 로컬 환경에서 진행하는 것을 권장합니다.

<!--
## What you'll learn

At the end of this lesson your application will have support for routing to the details page.
-->

<a id="what-youll-learn"></a>

## 학습 목표

이번 실습을 마치면 애플리케이션에서 상세 페이지로 이동할 수 있습니다.

<!--
## Conceptual preview of routing with route parameters

Each housing location has specific details that should be displayed when a user navigates to the details page for that item. To accomplish this goal, you will need to use route parameters.

Route parameters enable you to include dynamic information as a part of your route URL. To identify which housing location a user has clicked on you will use the `id` property of the `HousingLocation` type.

<docs-workflow>
-->

<a id="conceptual-preview-of-routing-with-route-parameters"></a>

## 라우팅 파라미터 개념 살펴보기

각 주택에는 사용자가 상세 페이지로 이동했을 때 표시할 고유한 정보가 있습니다. 이 정보를 표시하려면 라우팅 파라미터를 사용해야 합니다.

라우팅 파라미터를 사용하면 URL 경로에 동적 정보를 포함할 수 있습니다. 사용자가 선택한 주택을 식별하기 위해 `HousingLocationInfo` 타입의 `id` 프로퍼티를 사용합니다.

<docs-workflow>

<!--
<docs-step title="Using `routerLink` for dynamic navigation">
In lesson 10, you added a second route to `src/app/routes.ts` which includes a special segment that identifies the route parameter, `id`:

```
'details/:id'
```

In this case, `:id` is dynamic and will change based on how the route is requested by the code.

1.  In `src/app/housing-location/housing-location.ts`, add an anchor tag to the `section` element and include the `routerLink` directive:

    <docs-code language="angular-ts" header="Add anchor with a routerLink directive to housing-location.ts" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/housing-location/housing-location.ts" visibleLines="[18]"/>

    The `routerLink` directive enables Angular's router to create dynamic links in the application. The value assigned to the `routerLink` is an array with two entries: the static portion of the path and the dynamic data.

    For the `routerLink` to work in the template, add a file level import of `RouterLink` from '@angular/router', then update the component `imports` array to include `RouterLink`.

1.  At this point you can confirm that the routing is working in your app. In the browser, refresh the home page and click the "Learn More" button for a housing location.

      <img alt="details page displaying the text 'details works!'" src="assets/images/tutorials/first-app/homes-app-lesson-11-step-1.png">

</docs-step>
-->

<docs-step title="`routerLink`로 동적 경로 이동하기">

<a id="using-routerlink-for-dynamic-navigation"></a>

실습 10에서 `src/app/routes.ts`에 두 번째 라우팅 규칙을 추가했습니다. 이 규칙에는 라우팅 파라미터 `id`를 나타내는 특별한 경로 구간이 있습니다:

```
'details/:id'
```

여기서 `:id`는 동적 값이며 코드에서 어떤 경로를 요청하는지에 따라 달라집니다.

1. `src/app/housing-location/housing-location.ts`의 `section` 엘리먼트에 링크 태그를 추가하고 `routerLink` 디렉티브를 지정하세요:

   <docs-code language="angular-ts" header="housing-location.ts에 routerLink 디렉티브가 있는 링크 추가하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/housing-location/housing-location.ts" visibleLines="[18]"/>

   `routerLink` 디렉티브를 사용하면 Angular 라우터가 애플리케이션에 동적 링크를 만들 수 있습니다. `routerLink`에 전달하는 배열은 경로의 고정된 부분과 동적 데이터, 두 항목으로 구성됩니다.

   템플릿에서 `routerLink`를 사용하려면 파일 수준에서 `@angular/router`의 `RouterLink`를 불러오고 컴포넌트의 `imports` 배열에도 추가하세요.

1. 이제 앱의 라우팅이 동작하는지 확인할 수 있습니다. 브라우저에서 홈 페이지를 새로고침하고 주택의 "Learn More" 버튼을 클릭하세요.

  <img alt="'details works!' 문구가 표시된 상세 페이지" src="assets/images/tutorials/first-app/homes-app-lesson-11-step-1.png">

</docs-step>

<!--
<docs-step title="Get route parameters">
In this step, you will get the route parameter in the `Details`. Currently, the app displays `details works!`. Next you'll update the code to display the `id` value passed using the route parameters.

1.  In `src/app/details/details.ts` update the template to import the functions, classes and services that you'll need to use in the `Details`:

      <docs-code header="Update file level imports" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[1,4]"/>

1.  Update the `template` property of the `@Component` decorator to display the value `housingLocationId`:

         ```angular-ts
         template: `<p>details works! {{ housingLocationId }}</p>`,
         ```

1.  Update the body of the `Details` class with the following code:

         ```ts
         export class Details {
            route: ActivatedRoute = inject(ActivatedRoute);
            housingLocationId = -1;
            constructor() {
            this.housingLocationId = Number(this.route.snapshot.params['id']);
            }
         }
         ```

    This code gives the `Details` access to the `ActivatedRoute` router feature that enables you to have access to the data about the current route. In the `constructor`, the code converts the `id` parameter acquired from the route from a string to a number.

1.  Save all changes.

1.  In the browser, click on one of the housing location's "Learn More" links and confirm that the numeric value displayed on the page matches the `id` property for that location in the data.
    </docs-step>
-->

<docs-step title="라우팅 파라미터 가져오기">

<a id="get-route-parameters"></a>

이 단계에서는 `Details`에서 라우팅 파라미터를 읽습니다. 현재 앱에는 `details works!`가 표시됩니다. 다음으로 라우팅 파라미터로 전달받은 `id` 값을 표시하도록 코드를 수정합니다.

1.  `src/app/details/details.ts`에서 `Details`에 필요한 함수, 클래스, 서비스를 불러오도록 import 구문을 수정하세요:

  <docs-code header="파일 수준 import 수정하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[1,4]"/>

1.  `@Component` 데코레이터의 `template` 프로퍼티를 수정해 `housingLocationId` 값을 표시하세요:

         ```angular-ts
         template: `<p>details works! {{ housingLocationId }}</p>`,
         ```

1.  `Details` 클래스의 본문을 다음 코드로 수정하세요:

         ```ts
         export class Details {
            route: ActivatedRoute = inject(ActivatedRoute);
            housingLocationId = -1;
            constructor() {
            this.housingLocationId = Number(this.route.snapshot.params['id']);
            }
         }
         ```

    이 코드는 `Details`에서 현재 라우팅 정보를 제공하는 `ActivatedRoute`를 사용하게 합니다. `constructor`에서는 라우팅 파라미터로 가져온 `id`를 문자열에서 숫자로 변환합니다.

1.  모든 변경 사항을 저장하세요.

1.  브라우저에서 주택의 "Learn More" 링크를 클릭하고 페이지의 숫자가 해당 주택 데이터의 `id` 프로퍼티와 일치하는지 확인하세요.
    </docs-step>

<!--
<docs-step title="Customize the `Details`">
Now that routing is working properly in the application this is a great time to update the template of the `Details` to display the specific data represented by the housing location for the route parameter.

To access the data you will add a call to the `HousingService`.

1. Update the template code to match the following code:

   <docs-code language="angular-ts" header="Update the Details template in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[8,29]"/>

   Notice that the `housingLocation` properties are being accessed with the optional chaining operator `?`. This ensures that if the `housingLocation` value is null or undefined the application doesn't crash.

1. Update the body of the `Details` class to match the following code:

   <docs-code language="angular-ts" header="Update the Details class in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[32,41]"/>

   Now the component has the code to display the correct information based on the selected housing location. The `constructor` now includes a call to the `HousingService` to pass the route parameter as an argument to the `getHousingLocationById` service function.

1. Copy the following styles into the `src/app/details/details.css` file:

   <docs-code header="Add styles for the Details" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.css" visibleLines="[1,72]"/>

   and save your changes

1. In `Details` use the just created `details.css` file as the source for the styles:
   <docs-code language="angular-ts" header="Update details.ts to use the created css file" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[30]"/>

1. In the browser refresh the page and confirm that when you click on the "Learn More" link for a given housing location the details page displays the correct information based on the data for that selected item.

<img alt="Details page listing home info" src="assets/images/tutorials/first-app/homes-app-lesson-11-step-3.png">

</docs-step>
-->

<docs-step title="`Details` 수정하기">

<a id="customize-the-details"></a>

이제 라우팅이 정상적으로 동작하므로 `Details` 템플릿을 수정해 라우팅 파라미터에 해당하는 주택의 구체적인 정보를 표시합니다.

데이터를 가져오기 위해 `HousingService`를 호출합니다.

1. 템플릿을 다음 코드와 같이 수정하세요:

   <docs-code language="angular-ts" header="src/app/details/details.ts의 Details 템플릿 수정하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[8,29]"/>

   `housingLocation`의 프로퍼티에 옵셔널 체이닝 연산자 `?.`로 접근한다는 점을 확인하세요. 이렇게 하면 `housingLocation`이 `null`이나 `undefined`여도 애플리케이션에 에러가 발생하지 않습니다.

1. `Details` 클래스의 본문을 다음 코드와 같이 수정하세요:

   <docs-code language="angular-ts" header="src/app/details/details.ts의 Details 클래스 수정하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[32,41]"/>

   이제 선택한 주택에 맞는 정보를 표시하는 코드가 준비되었습니다. `constructor`에서 `HousingService`의 `getHousingLocationById` 함수를 호출하며 라우팅 파라미터를 인자로 전달합니다.

1. 다음 스타일을 `src/app/details/details.css` 파일에 복사하세요:

   <docs-code header="Details 스타일 추가하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.css" visibleLines="[1,72]"/>

   그리고 변경 사항을 저장하세요.

1. `Details`에서 방금 만든 `details.css` 파일을 스타일 파일로 지정하세요:
   <docs-code language="angular-ts" header="details.ts에서 생성한 CSS 파일 사용하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/details/details.ts" visibleLines="[30]"/>

1. 브라우저를 새로고침하고 주택의 "Learn More" 링크를 클릭했을 때 해당 항목의 데이터에 맞는 상세 정보가 표시되는지 확인하세요.

<img alt="주택 정보가 표시된 상세 페이지" src="assets/images/tutorials/first-app/homes-app-lesson-11-step-3.png">

</docs-step>

<!--
<docs-step title="Check navigation in the `Home`">
In a previous lesson you updated the `App` template to include a `routerLink`. Adding that code updated your app to enable navigation back to the `Home` whenever the logo is clicked.

1.  Confirm that your code matches the following:

      <docs-code language="angular-ts" header="Confirm the routerLink in app.ts" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/app.ts" visibleLines="[8,19]"/>

    Your code should already be up-to-date but confirm to be sure.

    </docs-step>

</docs-workflow>

SUMMARY: In this lesson you added routing to show details pages.

You now know how to:

- use route parameters to pass data to a route
- use the `routerLink` directive to use dynamic data to create a route
- use route parameter to retrieve data from the `HousingService` to display specific housing location information.

Really great work so far.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/routing/read-route-state#get-information-about-the-current-route-with-activatedroute" title="Route Parameters"/>
  <docs-pill href="guide/routing" title="Routing in Angular Overview"/>
  <docs-pill href="guide/routing/common-router-tasks" title="Common Routing Tasks"/>
  <docs-pill href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Optional_chaining" title="Optional Chaining Operator"/>
</docs-pill-row>
-->

<docs-step title="`Home`으로 돌아가는 기능 확인하기">

<a id="check-navigation-in-the-home"></a>

앞선 실습에서 `App` 템플릿에 `routerLink`를 추가했습니다. 이 코드로 로고를 클릭할 때마다 `Home`으로 돌아갈 수 있습니다.

1. 코드가 다음과 같은지 확인하세요:

     <docs-code language="angular-ts" header="app.ts의 routerLink 확인하기" path="adev/src/content/tutorials/first-app/steps/12-forms/src/app/app.ts" visibleLines="[8,19]"/>

   이미 작성한 코드이지만 올바른지 다시 확인하세요.

   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 상세 페이지를 표시하는 라우팅을 추가했습니다.

이제 다음 작업을 할 수 있습니다:

- 라우팅 파라미터로 이동할 화면에 데이터 전달하기
- `routerLink` 디렉티브로 동적 데이터를 사용한 경로 만들기
- 라우팅 파라미터로 `HousingService`에서 데이터를 가져와 특정 주택 정보 표시하기

여기까지 잘 따라오셨습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/routing/read-route-state#get-information-about-the-current-route-with-activatedroute" title="라우팅 파라미터"/>
  <docs-pill href="guide/routing" title="Angular 라우팅 개요"/>
  <docs-pill href="guide/routing/common-router-tasks" title="일반적인 라우팅 작업"/>
  <docs-pill href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Optional_chaining" title="옵셔널 체이닝 연산자"/>
</docs-pill-row>
