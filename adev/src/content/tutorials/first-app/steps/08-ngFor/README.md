<!--
# Use @for to list objects in component

This tutorial lesson demonstrates how to use `@for` block in Angular templates in order to display dynamically repeated data in a template.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=MIl5NcRxvcLjYt5f&amp;start=477"/>

NOTE: This video reflects an older syntax, but the main concepts remain valid.
-->

# @for로 컴포넌트에 객체 목록 표시하기

이번 실습에서는 Angular 템플릿의 `@for` 블록으로 데이터를 동적으로 반복해서 표시하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=MIl5NcRxvcLjYt5f&amp;start=477"/>

NOTE: 이 동영상은 이전 문법을 사용하지만 핵심 개념은 동일합니다.

<!--
## What you'll learn

- You will have added a data set to the app
- Your app will display a list of elements from the new data set using `@for`
-->

<a id="what-youll-learn"></a>

## 학습 목표

- 앱에 데이터 모음을 추가합니다.
- `@for`로 새 데이터 모음의 항목들을 목록으로 표시합니다.

<!--
## Conceptual preview of `@for`

In Angular, `@for` is a specific type of [control flow block](/guide/templates/control-flow) used to dynamically repeat data in a template. In plain JavaScript you would use a for loop - `@for` provides similar functionality for Angular templates.

You can utilize `@for` to iterate over arrays and even asynchronous values. In this lesson, you'll add a new array of data to iterate over.

For a more in depth explanation, please refer to the [control flow](guide/templates/control-flow#repeat-content-with-the-for-block) guide.

<docs-workflow>
-->

<a id="conceptual-preview-of-for"></a>

## `@for` 개념 살펴보기

Angular의 `@for`는 템플릿에서 데이터를 동적으로 반복해서 표시하는 [흐름 제어 블록](/guide/templates/control-flow)입니다. 일반 JavaScript의 for 반복문과 비슷한 기능을 Angular 템플릿에 제공합니다.

`@for`로 배열을 순회할 수 있으며, 비동기로 가져온 배열도 순회할 수 있습니다. 이번 실습에서는 순회할 새 데이터 배열을 추가합니다.

자세한 내용은 [흐름 제어](guide/templates/control-flow#repeat-content-with-the-for-block) 가이드를 참고하세요.

<docs-workflow>

<!--
<docs-step title="Add housing data to the `Home`">

In the `Home` there is only a single housing location. In this step, you will add an array of `HousingLocation` entries.

1. In `src/app/home/home.ts`, remove the `housingLocation` property from the `Home` class.
1. Update the `Home` class to have a property called `housingLocationList`. Update your code to match the following code:
   <docs-code language="angular-ts"  header="Add housingLocationList property in home.ts" path="adev/src/content/tutorials/first-app/steps/09-services/src/app/home/home.ts" visibleLines="[26,127]"/>

   IMPORTANT: Do not remove the `@Component` decorator, you will update that code in an upcoming step.

</docs-step>
-->

<docs-step title="`Home`에 주택 데이터 추가하기">

<a id="add-housing-data-to-the-home"></a>

현재 `Home`에는 주택 정보가 하나만 있습니다. 이 단계에서는 `HousingLocationInfo` 항목의 배열을 추가합니다.

1. `src/app/home/home.ts`의 `Home` 클래스에서 `housingLocation` 프로퍼티를 삭제하세요.
1. `Home` 클래스에 `housingLocationList` 프로퍼티를 추가하세요. 다음 코드와 같이 수정하세요:
   <docs-code language="angular-ts"  header="home.ts에 housingLocationList 프로퍼티 추가하기" path="adev/src/content/tutorials/first-app/steps/09-services/src/app/home/home.ts" visibleLines="[26,127]"/>

   IMPORTANT: `@Component` 데코레이터는 삭제하지 마세요. 다음 단계에서 이 코드를 수정합니다.

</docs-step>

<!--
<docs-step title="Update the `Home` template to use `@for`">
Now the app has a dataset that you can use to display the entries in the browser using the `@for` block.

1. Update the `<app-housing-location>` tag in the template code to this:
   <docs-code language="angular-ts"  header="Add @for to Home template in home.ts" path="adev/src/content/tutorials/first-app/steps/09-services/src/app/home/home.ts" visibleLines="[15,19]"/>

   Note, in the code `[housingLocation] = "housingLocation"` the `housingLocation` value now refers to the variable used in the `@for` block. Before this change, it referred to the property on the `Home` class.

1. Save all changes.

1. Refresh the browser and confirm that the app now renders a grid of housing locations.

<section class="lightbox">
<img alt="browser frame of homes-app displaying logo, filter text input box, search button and a grid of housing location cards" src="assets/images/tutorials/first-app/homes-app-lesson-08-step-2.png">
</section>

</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you used the `@for` block to repeat data dynamically in Angular templates. You also added a new array of data to be used in the Angular app. The application now dynamically renders a list of housing locations in the browser.

The app is taking shape, great job.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/templates/control-flow" title="Control flow blocks"/>
  <docs-pill href="guide/templates/control-flow#repeat-content-with-the-for-block" title="@for guide"/>
  <docs-pill href="/api/core/@for" title="@for"/>
</docs-pill-row>
-->

<docs-step title="`Home` 템플릿에서 `@for` 사용하기">

<a id="update-the-home-template-to-use-for"></a>

이제 앱에 데이터 모음이 있으므로 `@for` 블록으로 각 항목을 브라우저에 표시할 수 있습니다.

1. 템플릿의 `<app-housing-location>` 태그를 다음 코드로 수정하세요:
   <docs-code language="angular-ts"  header="home.ts의 Home 템플릿에 @for 추가하기" path="adev/src/content/tutorials/first-app/steps/09-services/src/app/home/home.ts" visibleLines="[15,19]"/>

   `[housingLocation]="housingLocation"`에서 오른쪽 `housingLocation`은 이제 `@for` 블록의 반복 변수를 가리킵니다. 변경 전에는 `Home` 클래스의 프로퍼티를 가리켰습니다.

1. 모든 변경 사항을 저장하세요.

1. 브라우저를 새로고침해 주택 목록이 격자 형태로 표시되는지 확인하세요.

<section class="lightbox">
<img alt="로고, 필터 검색 입력창, 검색 버튼과 주택 정보 카드 목록이 표시된 Homes 앱의 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-08-step-2.png">
</section>

</docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 `@for` 블록으로 Angular 템플릿에서 데이터를 동적으로 반복해서 표시했습니다. 또한 앱에 새 데이터 배열을 추가했습니다. 이제 애플리케이션은 브라우저에 주택 목록을 동적으로 표시합니다.

앱의 형태가 갖추어지고 있습니다. 잘하셨습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/templates/control-flow" title="흐름 제어 블록"/>
  <docs-pill href="guide/templates/control-flow#repeat-content-with-the-for-block" title="@for 가이드"/>
  <docs-pill href="/api/core/@for" title="@for"/>
</docs-pill-row>
