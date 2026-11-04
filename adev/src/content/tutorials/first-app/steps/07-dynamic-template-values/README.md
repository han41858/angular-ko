<!--
# Add an interpolation to a component’s template

This tutorial lesson demonstrates how to add interpolation to Angular templates in order to display dynamic data in a template.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=IFAly3Ss8dwqFx8N&amp;start=338"/>
-->

# 컴포넌트 템플릿에 문자열 바인딩 추가하기

이번 실습에서는 Angular 템플릿에 문자열 바인딩을 추가해 동적 데이터를 표시하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=IFAly3Ss8dwqFx8N&amp;start=338"/>

<!--
## What you'll learn

- Your app will display interpolated values in the `HousingLocation` template.
- Your app will render a housing location data to the browser.
-->

<a id="what-youll-learn"></a>

## 학습 목표

- `HousingLocation` 템플릿에 문자열 바인딩한 값을 표시합니다.
- 브라우저에 주택 정보를 표시합니다.

<!--
## Conceptual preview of interpolation

In this step you will display values read from `input` properties in a template using interpolation.

Using the `{{ expression }}` in Angular templates, you can render values from properties, `inputs`, and valid JavaScript expressions.

For a more in depth explanation, please refer to the [Displaying values with interpolation](guide/templates/binding#render-dynamic-text-with-text-interpolation) guide.

<docs-workflow>
-->

<a id="conceptual-preview-of-interpolation"></a>

## 문자열 바인딩 개념 살펴보기

이 단계에서는 문자열 바인딩으로 `input` 프로퍼티의 값을 템플릿에 표시합니다.

Angular 템플릿에서 `{{ expression }}`을 사용하면 프로퍼티, 입력값, 유효한 JavaScript 표현식의 값을 표시할 수 있습니다.

자세한 내용은 [문자열 바인딩으로 값 표시하기](guide/templates/binding#render-dynamic-text-with-text-interpolation) 가이드를 참고하세요.

<docs-workflow>

<!--
<docs-step title="Update `HousingLocation` template to include interpolated values">
This step adds new HTML structure and interpolated values in the `HousingLocation` template.

In the code editor:

1.  Navigate to `src/app/housing-location/housing-location.ts`
1.  In the template property of the `@Component` decorator, replace the existing HTML markup with the following code:

    <docs-code language="angular-ts"  header="Update HousingLocation template in housing-location.ts" path="adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/housing-location/housing-location.ts" visibleLines="[6,17]"/>

In this updated template code you have used property binding to bind the `housingLocation.photo` to the `src` attribute. The `alt` attribute uses interpolation to give more context to the alt text of the image.

You use interpolation to include the values for `name`, `city` and `state` of the `housingLocation` property.

</docs-step>
-->

<docs-step title="`HousingLocation` 템플릿에 문자열 바인딩 추가하기">

<a id="update-housinglocation-template-to-include-interpolated-values"></a>

이 단계에서는 `HousingLocation` 템플릿에 새 HTML 구조와 문자열 바인딩을 추가합니다.

코드 에디터에서 다음 작업을 수행하세요:

1. `src/app/housing-location/housing-location.ts`를 여세요.
1. `@Component` 데코레이터의 template 프로퍼티에서 기존 HTML 마크업을 다음 코드로 바꾸세요:

<docs-code language="angular-ts"  header="housing-location.ts의 HousingLocation 템플릿 수정하기" path="adev/src/content/tutorials/first-app/steps/08-ngFor/src/app/housing-location/housing-location.ts" visibleLines="[6,17]"/>

수정된 템플릿은 프로퍼티 바인딩으로 주택 정보의 `photo` 값을 `src` 프로퍼티에 연결합니다. `alt` 어트리뷰트에는 문자열 바인딩을 사용해 이미지에 대한 설명을 추가합니다.

또한 문자열 바인딩으로 주택 정보의 `name`, `city`, `state` 값을 표시합니다.

</docs-step>

<!--
<docs-step title="Confirm the changes render in the browser">
1.  Save all changes.
1.  Open the browser and confirm that the app renders the photo, city and state sample data.
    <img alt="browser frame of homes-app displaying logo, filter text input box, search button and the same housing location UI card" src="assets/images/tutorials/first-app/homes-app-lesson-07-step-2.png">
</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you added a new HTML structure and used Angular template syntax to render values in the `HousingLocation` template.

Now, you have two important skills:

- passing data to components
- Interpolating values into a template

With these skills, your app can now share data and display dynamic values in the browser. Great work so far.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/templates" title="Template syntax"/>
  <docs-pill href="guide/templates/binding#render-dynamic-text-with-text-interpolation" title="Displaying values with interpolation"/>
</docs-pill-row>
-->

<docs-step title="브라우저에서 변경 사항 확인하기">

<a id="confirm-the-changes-render-in-the-browser"></a>

1. 모든 변경 사항을 저장하세요.
1. 브라우저를 열어 앱에 예제 데이터의 사진, 도시, 주 정보가 표시되는지 확인하세요.
   <img alt="로고, 필터 검색 입력창, 검색 버튼과 주택 정보 카드가 표시된 Homes 앱의 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-07-step-2.png">
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 새 HTML 구조를 추가하고 Angular 템플릿 문법으로 `HousingLocation` 템플릿에 값을 표시했습니다.

이제 다음 두 가지 기능을 구현할 수 있습니다:

- 컴포넌트에 데이터 전달하기
- 문자열 바인딩으로 템플릿에 값 표시하기

이 기능을 활용하면 앱에서 데이터를 공유하고 브라우저에 동적 값을 표시할 수 있습니다. 여기까지 잘 따라오셨습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/templates" title="템플릿 문법"/>
  <docs-pill href="guide/templates/binding#render-dynamic-text-with-text-interpolation" title="문자열 바인딩으로 값 표시하기"/>
</docs-pill-row>
