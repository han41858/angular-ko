<!--
# Add the search feature to your app

This tutorial lesson demonstrates how to add a search functionality to your Angular app.

The app will enable users to search through the data provided by your app and display only the results that match the entered term.

<docs-video src="https://www.youtube.com/embed/5K10oYJ5Y-E?si=TiuNKx_teR9baO7k&amp;start=457"/>

IMPORTANT: We recommend using your local environment for this step of the tutorial.
-->

# 앱에 검색 기능 추가하기

이번 실습에서는 Angular 앱에 검색 기능을 추가하는 방법을 알아봅니다.

사용자는 앱에서 제공하는 데이터를 검색할 수 있으며, 앱에는 입력한 검색어에 맞는 결과만 표시됩니다.

<docs-video src="https://www.youtube.com/embed/5K10oYJ5Y-E?si=TiuNKx_teR9baO7k&amp;start=457"/>

IMPORTANT: 이 실습은 로컬 환경에서 진행하는 것을 권장합니다.

<!--
## What you'll learn

- Your app will use data from a form to search for matching housing locations
- Your app will display only the matching housing locations

<docs-workflow>
-->

<a id="what-youll-learn"></a>

## 학습 목표

- 폼의 입력값으로 조건에 맞는 주택을 검색합니다.
- 검색 조건에 맞는 주택만 표시합니다.

<docs-workflow>

<!--
<docs-step title="Update the home component properties">
In this step, you'll update the `Home` class to store data in a new array property that you will use for filtering.

1. In `src/app/home/home.ts`, add new property to the class called `filteredLocationList`.

   <docs-code header="Add the filteredLocationList property in home.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[28]"/>

   The `filteredLocationList` hold the values that match the search criteria entered by the user.

1. The `filteredLocationList` should contain the total set of housing locations values by default when the page loads. Update the `constructor` for the `Home` to set the value.

   <docs-code header="Set the value of filteredLocationList" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[29,32]"/>

</docs-step>
-->

<docs-step title="Home 컴포넌트의 프로퍼티 수정하기">

<a id="update-the-home-component-properties"></a>

이 단계에서는 필터링에 사용할 새 배열 프로퍼티를 `Home` 클래스에 추가합니다.

1. `src/app/home/home.ts`의 클래스에 `filteredLocationList` 프로퍼티를 추가하세요.

   <docs-code header="home.ts에 filteredLocationList 프로퍼티 추가하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[28]"/>

   `filteredLocationList`에는 사용자가 입력한 검색 조건에 맞는 값이 저장됩니다.

1. 페이지를 처음 불러왔을 때는 `filteredLocationList`에 전체 주택 목록이 있어야 합니다. `Home`의 `constructor`에서 이 값을 설정하세요.

   <docs-code header="filteredLocationList 값 설정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[29,32]"/>

</docs-step>

<!--
<docs-step title="Update the home component template">
The `Home` already contains an input field that you will use to capture input from the user. That string text will be used to filter the results.

1. Update the `Home` template to include a template variable in the `input` element called `#filter`.

   <docs-code language="angular-ts" header="Add a template variable to the input HTML element in home.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[12]"/>
   This example uses a [template reference variable](guide/templates) to get access to the `input` element as its value.

1. Next, update the component template to attach an event handler to the "Search" button.

   <docs-code language="angular-ts" header="Bind the button click event to a method in home.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[13]"/>

   By binding to the `click` event on the `button` element, you are able to call the `filterResults` function. The argument to the function is the `value` property of the `filter` template variable. Specifically, the `.value` property from the `input` HTML element.

1. The last template update is to the `@for` directive. Update the `@for` to iterate over values from the `filteredLocationList` array.

   <docs-code language="angular-ts" header="Update the @for template directive in home.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[17,19]"/>

</docs-step>
-->

<docs-step title="Home 컴포넌트의 템플릿 수정하기">

<a id="update-the-home-component-template"></a>

`Home`에는 사용자 입력을 받을 필드가 이미 있습니다. 여기에 입력한 문자열로 결과를 필터링합니다.

1. `Home` 템플릿의 `input` 엘리먼트에 `#filter` 템플릿 변수를 추가하세요.

   <docs-code language="angular-ts" header="home.ts의 input HTML 엘리먼트에 템플릿 변수 추가하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[12]"/>
   이 예제는 [템플릿 참조 변수](guide/templates)를 사용해 `input` 엘리먼트에 접근합니다.

1. 다음으로 컴포넌트 템플릿의 "Search" 버튼에 이벤트 핸들러를 연결하세요.

   <docs-code language="angular-ts" header="home.ts에서 버튼 클릭 이벤트를 메서드에 바인딩하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[13]"/>

   `button` 엘리먼트의 `click` 이벤트를 바인딩하면 `filterResults` 함수를 호출할 수 있습니다. 함수에는 `filter` 템플릿 변수의 `value` 프로퍼티, 즉 `input` HTML 엘리먼트의 `.value`를 인자로 전달합니다.

1. 마지막으로 `@for` 블록이 `filteredLocationList` 배열의 값을 순회하도록 수정하세요.

   <docs-code language="angular-ts" header="home.ts의 @for 템플릿 블록 수정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[17,19]"/>

</docs-step>

<!--
<docs-step title="Implement the event handler function">
The template has been updated to bind the `filterResults` function to the `click` event. Next, your task is to implement the `filterResults` function in the `Home` class.

1.  Update the `Home` class to include the implementation of the `filterResults` function.

    <docs-code header="Add the filterResults function implementation" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[35,44]"/>

    This function uses the `Array` `filter` function to compare the value of the `text` parameter against the `housingLocation.city` property. You can update this function to match against any property or multiple properties for a fun exercise.

1.  Save your code.

1.  Refresh the browser and confirm that you can search the housing location data by city when you click the "Search" button after entering text.

       <img alt="filtered search results based on user input" src="assets/images/tutorials/first-app/homes-app-lesson-13-step-3.png">

    </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you updated your app to use template variables to interact with template values, and add search functionality using event binding and array functions.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/templates" title="Template Variables"/>
  <docs-pill href="guide/templates/event-listeners" title="Event Handling"/>
</docs-pill-row>
-->

<docs-step title="이벤트 핸들러 함수 구현하기">

<a id="implement-the-event-handler-function"></a>

템플릿의 `click` 이벤트에 `filterResults` 함수를 바인딩했습니다. 이제 `Home` 클래스에 `filterResults` 함수를 구현합니다.

1. `Home` 클래스에 `filterResults` 함수 구현을 추가하세요.

   <docs-code header="filterResults 함수 구현 추가하기" path="adev/src/content/tutorials/first-app/steps/14-http/src/app/home/home.ts" visibleLines="[35,44]"/>

   이 함수는 `Array`의 `filter` 메서드로 `text` 파라미터와 `housingLocation.city` 프로퍼티를 비교합니다. 추가 연습으로 다른 프로퍼티나 여러 프로퍼티를 비교하도록 수정해 보세요.

1. 코드를 저장하세요.

1. 브라우저를 새로고침하고 텍스트를 입력한 뒤 "Search" 버튼을 클릭했을 때 도시 이름으로 주택 정보를 검색할 수 있는지 확인하세요.

      <img alt="사용자 입력으로 필터링한 검색 결과" src="assets/images/tutorials/first-app/homes-app-lesson-13-step-3.png">

   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 템플릿 변수로 템플릿의 값에 접근하고, 이벤트 바인딩과 배열 메서드로 검색 기능을 추가했습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/templates" title="템플릿 변수"/>
  <docs-pill href="guide/templates/event-listeners" title="이벤트 처리"/>
</docs-pill-row>
