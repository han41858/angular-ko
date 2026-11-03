<!--
# Create the application’s HousingLocation component

This tutorial lesson demonstrates how to add the `HousingLocation` component to your Angular app.

<docs-video src="https://www.youtube.com/embed/R0nRX8jD2D0?si=U4ONEbPvtptdUHTt&amp;start=440"/>
-->

# HousingLocation 컴포넌트 만들기

이번 실습에서는 Angular 앱에 `HousingLocation` 컴포넌트를 추가하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/R0nRX8jD2D0?si=U4ONEbPvtptdUHTt&amp;start=440"/>

<!--
## What you'll learn

- Your app has a new component: `HousingLocation` and it displays a message confirming that the component was added to your application.

<docs-workflow>
-->

<a id="what-youll-learn"></a>

## 학습 목표

- 앱에 `HousingLocation` 컴포넌트를 추가하고, 컴포넌트가 추가되었음을 확인하는 메시지를 표시합니다.

<docs-workflow>

<!--
<docs-step title="Create the `HousingLocation`">
In this step, you create a new component for your app.

In the **Terminal** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.

1. Run this command to create a new `HousingLocation`

   ```shell
   ng generate component housingLocation
   ```

1. Run this command to build and serve your app.

   ```shell
   ng serve
   ```

   NOTE: This step is only for your local environment!

1. Open a browser and navigate to `http://localhost:4200` to find the application.
1. Confirm that the app builds without error.

   HELPFUL: It should render the same as it did in the previous lesson because even though you added a new component, you haven't included it in any of the app's templates, yet.

1. Leave `ng serve` running as you complete the next steps.
   </docs-step>
-->

<docs-step title="`HousingLocation` 만들기">

<a id="create-the-housinglocation"></a>

이 단계에서는 앱에 새 컴포넌트를 만듭니다.

IDE의 **터미널** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.

1. 다음 명령어로 `HousingLocation`을 만드세요.

   ```shell
   ng generate component housingLocation
   ```

1. 다음 명령어로 앱을 빌드하고 실행하세요.

   ```shell
   ng serve
   ```

   NOTE: 이 단계는 로컬 환경에서만 필요합니다!

1. 브라우저에서 `http://localhost:4200`을 열어 애플리케이션을 확인하세요.
1. 앱이 오류 없이 빌드되는지 확인하세요.

   HELPFUL: 새 컴포넌트를 추가했지만 아직 앱의 템플릿에서 사용하지 않았으므로 이전 실습과 동일한 화면이 표시됩니다.

1. 다음 단계를 진행하는 동안 `ng serve`를 계속 실행해 두세요.
   </docs-step>

<!--
<docs-step title="Add the new component to your app's layout">
In this step, you add the new component, `HousingLocation` to your app's `Home`, so that it displays in your app's layout.

In the **Edit** pane of your IDE:

1.  Open `home.ts` in the editor.
1.  In `home.ts`, import `HousingLocation` by adding this line to the file level imports.

      <docs-code header="Import HousingLocation in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[2]"/>

1.  Next update the `imports` property of the `@Component` metadata by adding `HousingLocation` to the array.

      <docs-code  header="Add HousingLocation to imports array in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[6]"/>

1.  Now the component is ready for use in the template for the `Home`. Update the `template` property of the `@Component` metadata to include a reference to the `<app-housing-location>` tag.

      <docs-code language="angular-ts" header="Add housing location to the component template in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[7,17]"/>

</docs-step>
-->

<docs-step title="앱 레이아웃에 새 컴포넌트 추가하기">

<a id="add-the-new-component-to-your-apps-layout"></a>

이 단계에서는 `Home`에 새 `HousingLocation` 컴포넌트를 추가해 앱 레이아웃에 표시합니다.

IDE의 **편집** 창에서 다음 작업을 수행하세요:

1. 에디터에서 `home.ts`를 여세요.
1. `home.ts`의 파일 수준 import 구문에 다음 줄을 추가해 `HousingLocation`을 불러오세요.

  <docs-code header="src/app/home/home.ts에서 HousingLocation 불러오기" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[2]"/>

1. 다음으로 `@Component` 메타데이터의 `imports` 배열에 `HousingLocation`을 추가하세요.

  <docs-code  header="src/app/home/home.ts의 imports 배열에 HousingLocation 추가하기" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[6]"/>

1. 이제 `Home` 템플릿에서 컴포넌트를 사용할 수 있습니다. `@Component` 메타데이터의 `template` 프로퍼티에 `<app-housing-location>` 태그를 추가하세요.

  <docs-code language="angular-ts" header="src/app/home/home.ts의 컴포넌트 템플릿에 주택 정보 추가하기" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/home/home.ts" visibleLines="[7,17]"/>

</docs-step>

<!--
<docs-step title="Add the styles for the component">
In this step, you will copy over the pre-written styles for the `HousingLocation` to your app so that the app renders properly.

1. Open `src/app/housing-location/housing-location.css`, and paste the styles below into the file:

   NOTE: In the browser, these can go in `src/app/housing-location/housing-location.ts` in the `styles` array.

   <docs-code header="Add CSS styles to housing location to the component in src/app/housing-location/housing-location.css" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/housing-location/housing-location.css"/>

1. Save your code, return to the browser and confirm that the app builds without error. You should find the message "housing-location works!" rendered to the screen.Correct any errors before you continue to the next step.

   <img alt="browser frame of homes-app displaying logo, filter text input box and search button and the message 'housing-location works!" src="assets/images/tutorials/first-app/homes-app-lesson-03-step-2.png">

</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you created a new component for your app and added it to the app's layout.
-->

<docs-step title="컴포넌트 스타일 추가하기">

<a id="add-the-styles-for-the-component"></a>

이 단계에서는 앱이 올바르게 표시되도록 미리 작성된 `HousingLocation` 스타일을 복사합니다.

1. `src/app/housing-location/housing-location.css`를 열고 다음 스타일을 붙여 넣으세요:

   NOTE: 브라우저에서는 `src/app/housing-location/housing-location.ts`의 `styles` 배열에 작성해도 됩니다.

   <docs-code header="src/app/housing-location/housing-location.css에 컴포넌트 스타일 추가하기" path="adev/src/content/tutorials/first-app/steps/04-interfaces/src/app/housing-location/housing-location.css"/>

1. 코드를 저장하고 브라우저로 돌아가 앱이 오류 없이 빌드되는지 확인하세요. 화면에 "housing-location works!" 메시지가 표시되어야 합니다. 오류가 있다면 수정한 후 다음 단계로 진행하세요.

   <img alt="로고, 필터 검색 입력창, 검색 버튼과 'housing-location works!' 메시지가 표시된 Homes 앱의 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-03-step-2.png">

</docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 새 컴포넌트를 만들고 앱 레이아웃에 추가했습니다.
