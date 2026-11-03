<!--
# Create Home component

This tutorial lesson demonstrates how to create a new [component](guide/components) for your Angular app.

<docs-video src="https://www.youtube.com/embed/R0nRX8jD2D0?si=OMVaw71EIa44yIOJ"/>
-->

# Home 컴포넌트 만들기

이번 실습에서는 Angular 앱에 새 [컴포넌트](guide/components)를 만드는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/R0nRX8jD2D0?si=OMVaw71EIa44yIOJ"/>

<!--
## What you'll learn

Your app has a new component: `Home`.
-->

<a id="what-youll-learn"></a>

## 학습 목표

앱에 `Home` 컴포넌트를 추가합니다.

<!--
## Conceptual preview of Angular components

Angular apps are built around components, which are Angular's building blocks.
Components contain the code, HTML layout, and CSS style information that provide the function and appearance of an element in the app.
In Angular, components can contain other components. An app's functions and appearance can be divided and partitioned into components.

In Angular, components have metadata that define its properties.
When you create your `Home`, you use these properties:

- `selector`: to describe how Angular refers to the component in templates.
- `imports`: to describe the component's dependencies.
- `template`: to describe the component's HTML markup and layout.
- `styleUrls`: to list the URLs of the CSS files that the component uses in an array.

<docs-pill-row>
  <docs-pill href="api/core/Component" title="Learn more about Components"/>
</docs-pill-row>

<docs-workflow>
-->

<a id="conceptual-preview-of-angular-components"></a>

## Angular 컴포넌트 개념 살펴보기

Angular 앱은 기본 구성 요소인 컴포넌트를 중심으로 만들어집니다.
컴포넌트에는 앱의 각 요소가 동작하고 표시되는 방식을 정의하는 코드, HTML 레이아웃, CSS 스타일이 포함됩니다.
Angular 컴포넌트는 다른 컴포넌트를 포함할 수 있습니다. 앱의 기능과 화면을 컴포넌트 단위로 나누어 구성할 수 있습니다.

Angular 컴포넌트의 프로퍼티는 메타데이터로 정의합니다.
`Home`을 만들 때는 다음 프로퍼티를 사용합니다:

- `selector`: Angular가 템플릿에서 컴포넌트를 참조하는 방법을 정의합니다.
- `imports`: 컴포넌트의 의존성을 정의합니다.
- `template`: 컴포넌트의 HTML 마크업과 레이아웃을 정의합니다.
- `styleUrls`: 컴포넌트에서 사용하는 CSS 파일의 URL을 배열로 나열합니다.

<docs-pill-row>
  <docs-pill href="api/core/Component" title="컴포넌트 자세히 알아보기"/>
</docs-pill-row>

<docs-workflow>

<!--
<docs-step title="Create the `Home`">
In this step, you create a new component for your app.

In the **Terminal** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.
1. Run this command to create a new `Home`

   ```shell
   ng generate component home
   ```

1. Run this command to build and serve your app.

   NOTE: This step is only for your local environment!

   ```shell
   ng serve
   ```

1. Open a browser and navigate to `http://localhost:4200` to find the application.

1. Confirm that the app builds without error.

   HELPFUL: It should render the same as it did in the previous lesson because even though you added a new component, you haven't included it in any of the app's templates, yet.

1. Leave `ng serve` running as you complete the next steps.
   </docs-step>
-->

<docs-step title="`Home` 만들기">

<a id="create-the-home"></a>

이 단계에서는 앱에 새 컴포넌트를 만듭니다.

IDE의 **터미널** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.
1. 다음 명령어로 `Home`을 만드세요.

   ```shell
   ng generate component home
   ```

1. 다음 명령어로 앱을 빌드하고 실행하세요.

   NOTE: 이 단계는 로컬 환경에서만 필요합니다!

   ```shell
   ng serve
   ```

1. 브라우저에서 `http://localhost:4200`을 열어 애플리케이션을 확인하세요.

1. 앱이 오류 없이 빌드되는지 확인하세요.

   HELPFUL: 새 컴포넌트를 추가했지만 아직 앱의 템플릿에서 사용하지 않았으므로 이전 실습과 동일한 화면이 표시됩니다.

1. 다음 단계를 진행하는 동안 `ng serve`를 계속 실행해 두세요.
   </docs-step>

<!--
<docs-step title="Add the new component to your app's layout">
In this step, you add the new component, `Home` to your app's root component, `App`, so that it displays in your app's layout.

In the **Edit** pane of your IDE:

1.  Open `app.ts` in the editor.
1.  In `app.ts`, import `Home` by adding this line to the file level imports.

      <docs-code header="Import Home in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[2]"/>

1.  In `app.ts`, in `@Component`, update the `imports` array property and add `Home`.

      <docs-code header="Replace in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[6]"/>

1.  In `app.ts`, in `@Component`, update the `template` property to include the following HTML code.

      <docs-code language="angular-ts" header="Replace in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[7,16]"/>

1.  Save your changes to `app.ts`.
1.  If `ng serve` is running, the app should update.
    If `ng serve` is not running, start it again.
    _Hello world_ in your app should change to _home works!_ from the `Home`.
1.  Check the running app in the browser and confirm that the app has been updated.

  <img alt="browser frame of page displaying the text 'home works!'" src="assets/images/tutorials/first-app/homes-app-lesson-02-step-2.png">

</docs-step>
-->

<docs-step title="앱 레이아웃에 새 컴포넌트 추가하기">

<a id="add-the-new-component-to-your-apps-layout"></a>

이 단계에서는 앱의 최상위 컴포넌트인 `App`에 새 `Home` 컴포넌트를 추가해 앱 레이아웃에 표시합니다.

IDE의 **편집** 창에서 다음 작업을 수행하세요:

1. 에디터에서 `app.ts`를 여세요.
1. `app.ts`의 파일 수준 import 구문에 다음 줄을 추가해 `Home`을 불러오세요.

  <docs-code header="src/app/app.ts에서 Home 불러오기" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[2]"/>

1. `app.ts`의 `@Component`에서 `imports` 배열 프로퍼티에 `Home`을 추가하세요.

  <docs-code header="src/app/app.ts에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[6]"/>

1. `app.ts`의 `@Component`에서 `template` 프로퍼티에 다음 HTML 코드를 추가하세요.

  <docs-code language="angular-ts" header="src/app/app.ts에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/app.ts" visibleLines="[7,16]"/>

1. `app.ts`의 변경 사항을 저장하세요.
1. `ng serve`가 실행 중이라면 앱이 갱신됩니다.
   `ng serve`가 실행 중이 아니라면 다시 실행하세요.
   앱의 _Hello world_ 가 `Home`의 _home works!_ 로 바뀌어야 합니다.
1. 브라우저에서 실행 중인 앱이 갱신되었는지 확인하세요.

  <img alt="'home works!' 문구가 표시된 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-02-step-2.png">

</docs-step>

<!--
<docs-step title="Add features to `Home`">

In this step you add features to `Home`.

In the previous step, you added the default `Home` to your app's template so its default HTML appeared in the app.
In this step, you add a search filter and button that is used in a later lesson.
For now, that's all that `Home` has.
Note that this step just adds the search elements to the layout without any functionality, yet.

If you started from a fresh Angular project instead of downloading the starter
(ng new): add these globals to `src/styles.css` so the search button and input border are visible:

```css
:root {
  --primary-color: #605dc8;
  --secondary-color: #8b89e6;
  --accent-color: #e8e7fa;
  --shadow-color: #e8e8e8;
}

button.primary {
  padding: 10px;
  border: solid 1px var(--primary-color);
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
}
```

In the **Edit** pane of your IDE:

1.  In the `first-app` directory, open `home.ts` in the editor.
1.  In `home.ts`, in `@Component`, update the `template` property with this code.

      <docs-code language="angular-ts" header="Replace in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/home.ts" visibleLines="[5,12]"/>

1.  Next, open `home.css` in the editor and update the content with these styles.

    NOTE: In the browser, these can go in `src/app/home/home.ts` in the `styles` array.

       <docs-code header="Replace in src/app/home/home.css" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/home.css"/>

1.  Confirm that the app builds without error. You should find the filter query box and button in your app and they should be styled. Correct any errors before you continue to the next step.

   <img alt="browser frame of homes-app displaying logo, filter text input box and search button" src="assets/images/tutorials/first-app/homes-app-lesson-02-step-3.png">
</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you created a new component for your app and gave it a filter edit control and button.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="cli/generate/component" title="`ng generate component`"/>
  <docs-pill href="api/core/Component" title="`Component` reference"/>
  <docs-pill href="guide/components" title="Angular components overview"/>
</docs-pill-row>
-->

<docs-step title="`Home`에 기능 추가하기">

<a id="add-features-to-home"></a>

이 단계에서는 `Home`에 기능을 추가합니다.

앞 단계에서는 앱 템플릿에 기본 `Home`을 추가해 기본 HTML이 앱에 표시되도록 했습니다.
이번 단계에서는 이후 실습에서 사용할 검색 필터와 버튼을 추가합니다.
지금은 이것이 `Home`에 필요한 전부입니다.
이 단계에서는 검색 요소를 레이아웃에 추가할 뿐, 아직 검색 기능은 구현하지 않습니다.

시작용 프로젝트를 다운로드하지 않고 새 Angular 프로젝트로 시작했다면
(`ng new`) 검색 버튼과 입력창 테두리가 보이도록 `src/styles.css`에 다음 전역 스타일을 추가하세요:

```css
:root {
  --primary-color: #605dc8;
  --secondary-color: #8b89e6;
  --accent-color: #e8e7fa;
  --shadow-color: #e8e8e8;
}

button.primary {
  padding: 10px;
  border: solid 1px var(--primary-color);
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
}
```

IDE의 **편집** 창에서 다음 작업을 수행하세요:

1. `first-app` 디렉터리에서 에디터로 `home.ts`를 여세요.
1. `home.ts`의 `@Component`에서 `template` 프로퍼티를 다음 코드로 수정하세요.

  <docs-code language="angular-ts" header="src/app/home/home.ts에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/home.ts" visibleLines="[5,12]"/>

1. 다음으로 에디터에서 `home.css`를 열고 다음 스타일로 내용을 수정하세요.

   NOTE: 브라우저에서는 `src/app/home/home.ts`의 `styles` 배열에 작성해도 됩니다.

      <docs-code header="src/app/home/home.css에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/03-HousingLocation/src/app/home/home.css"/>

1. 앱이 오류 없이 빌드되는지 확인하세요. 앱에 필터 검색 입력창과 버튼이 스타일과 함께 표시되어야 합니다. 오류가 있다면 수정한 후 다음 단계로 진행하세요.

   <img alt="로고, 필터 검색 입력창, 검색 버튼이 표시된 Homes 앱의 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-02-step-3.png">

</docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 앱에 새 컴포넌트를 만들고 필터 입력창과 버튼을 추가했습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="cli/generate/component" title="`ng generate component`"/>
  <docs-pill href="api/core/Component" title="`Component` 참조"/>
  <docs-pill href="guide/components" title="Angular 컴포넌트 개요"/>
</docs-pill-row>
