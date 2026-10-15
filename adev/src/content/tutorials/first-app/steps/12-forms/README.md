<!--
# Adding a form to your Angular app

This tutorial lesson demonstrates how to add a form that collects user data to an Angular app.
This lesson starts with a functional Angular app and shows how to add a form to it.

The data that the form collects is sent only to the app's service, which writes it to the browser's console.
Using a REST API to send and receive the form's data is not covered in this lesson.

<docs-video src="https://www.youtube.com/embed/kWbk-dOJaNQ?si=FYMXGdUiT-qh321h"/>

IMPORTANT: We recommend using your local environment for this step of the tutorial.
-->

# Angular 앱에 폼 추가하기

이번 실습에서는 사용자 데이터를 수집하는 폼을 Angular 앱에 추가하는 방법을 알아봅니다.
이미 동작하는 Angular 앱에 폼을 추가하는 과정으로 진행합니다.

폼에서 수집한 데이터는 앱의 서비스로만 전달하며 서비스는 이 데이터를 브라우저 콘솔에 출력합니다.
REST API로 폼 데이터를 주고받는 방법은 이번 실습에서 다루지 않습니다.

<docs-video src="https://www.youtube.com/embed/kWbk-dOJaNQ?si=FYMXGdUiT-qh321h"/>

IMPORTANT: 이 실습은 로컬 환경에서 진행하는 것을 권장합니다.

<!--
## What you'll learn

- Your app has a form into which users can enter data that is sent to your app's service.
- The service writes the data from the form to the browser's console log.

<docs-workflow>
-->

<a id="what-youll-learn"></a>

## 학습 목표

- 사용자가 입력한 데이터를 앱의 서비스로 전달하는 폼을 추가합니다.
- 서비스에서 폼 데이터를 브라우저 콘솔에 출력합니다.

<docs-workflow>

<!--
<docs-step title="Add a method to send form data">
This step adds a method to your app's service that receives the form data to send to the data's destination.
In this example, the method writes the data from the form to the browser's console log.

In the **Edit** pane of your IDE:

1.  In `src/app/housing.service.ts`, inside the `HousingService` class, paste this method at the bottom of the class definition.

       <docs-code header="Submit method in src/app/housing.service.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/housing.service.ts" visibleLines="[118,122]"/>

1.  Confirm that the app builds without error.
    Correct any errors before you continue to the next step.
    </docs-step>
-->

<docs-step title="폼 데이터를 전달하는 메서드 추가하기">

<a id="add-a-method-to-send-form-data"></a>

이 단계에서는 폼 데이터를 받아 전달할 메서드를 앱의 서비스에 추가합니다.
이 예제에서는 폼 데이터를 브라우저 콘솔에 출력합니다.

IDE의 **편집** 창에서 다음 작업을 수행하세요:

1. `src/app/housing.service.ts`의 `HousingService` 클래스 정의 맨 아래에 다음 메서드를 붙여 넣으세요.

   <docs-code header="src/app/housing.service.ts의 제출 메서드" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/housing.service.ts" visibleLines="[118,122]"/>

1. 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

<!--
<docs-step title="Add the form functions to the details page">
This step adds the code to the details page that handles the form's interactions.

In the **Edit** pane of your IDE, in `src/app/details/details.ts`:

1.  After the `import` statements at the top of the file, add the following code to import the Angular form classes.

      <docs-code header="Forms imports in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[5]"/>

1.  In the `Details` decorator metadata, update the `imports` property with the following code:

      <docs-code header="imports directive in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[9]"/>

1.  In the `Details` class, before the `constructor()` method, add the following code to create the form object.

      <docs-code header="template directive in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[52,56]"/>

    In Angular, `FormGroup` and `FormControl` are types that enable you to build forms. The `FormControl` type can provide a default value and shape the form data. In this example `firstName` is a `string` and the default value is empty string.

1.  In the `Details` class, after the `constructor()` method, add the following code to handle the **Apply now** click.

      <docs-code header="template directive in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[62,68]"/>

    This button does not exist yet - you will add it in the next step. In the above code, the `FormControl`s may return `null`. This code uses the nullish coalescing operator to default to empty string if the value is `null`.

1.  Confirm that the app builds without error.
    Correct any errors before you continue to the next step.
    </docs-step>
-->

<docs-step title="상세 페이지에 폼 기능 추가하기">

<a id="add-the-form-functions-to-the-details-page"></a>

이 단계에서는 폼과의 상호작용을 처리하는 코드를 상세 페이지에 추가합니다.

IDE의 **편집** 창에서 `src/app/details/details.ts`를 수정하세요:

1. 파일 위쪽의 `import` 구문 뒤에 Angular 폼 클래스를 불러오는 다음 코드를 추가하세요.

  <docs-code header="src/app/details/details.ts에서 폼 관련 항목 불러오기" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[5]"/>

1. `Details` 데코레이터 메타데이터의 `imports` 프로퍼티를 다음 코드로 수정하세요:

  <docs-code header="src/app/details/details.ts의 imports 프로퍼티" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[9]"/>

1. `Details` 클래스의 `constructor()` 앞에 다음 코드를 추가해 폼 객체를 만드세요.

     <docs-code header="src/app/details/details.ts의 폼 객체" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[52,56]"/>

   Angular의 `FormGroup`과 `FormControl`은 폼을 구성하는 타입입니다. `FormControl`에는 기본값을 지정하고 폼 데이터의 타입을 정의할 수 있습니다. 이 예제에서 `firstName`은 문자열 값을 사용하며 기본값은 빈 문자열입니다.

1. `Details` 클래스의 `constructor()` 뒤에 **Apply now** 버튼 클릭을 처리하는 다음 코드를 추가하세요.

     <docs-code header="src/app/details/details.ts의 제출 처리 메서드" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[62,68]"/>

   이 버튼은 아직 없으며 다음 단계에서 추가합니다. 위 코드의 `FormControl`은 `null`을 반환할 수 있습니다. 널 병합 연산자로 값이 `null`일 때 빈 문자열을 사용하도록 합니다.

1. 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

<!--
<docs-step title="Add the form's markup to the details page">
This step adds the markup to the details page that displays the form.

In the **Edit** pane of your IDE, in `src/app/details/details.ts`:

1. In the `Details` decorator metadata, update the `template` HTML to match the following code to add the form's markup.

   <docs-code language="angular-ts" header="template directive in src/app/details/details.ts" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[10,45]"/>

   The template now includes an event handler `(submit)="submitApplication()"`. Angular uses parentheses syntax around the event name to define events in the template code. The code on the right hand side of the equals sign is the code that should be executed when this event is triggered. You can bind to browser events and custom events.

1. Confirm that the app builds without error.
   Correct any errors before you continue to the next step.

   <img alt="details page with a form for applying to live at this location" src="assets/images/tutorials/first-app/homes-app-lesson-12-step-3.png">

</docs-step>
-->

<docs-step title="상세 페이지에 폼 마크업 추가하기">

<a id="add-the-forms-markup-to-the-details-page"></a>

이 단계에서는 폼을 표시하는 마크업을 상세 페이지에 추가합니다.

IDE의 **편집** 창에서 `src/app/details/details.ts`를 수정하세요:

1. `Details` 데코레이터 메타데이터의 `template` HTML을 다음 코드로 수정해 폼 마크업을 추가하세요.

   <docs-code language="angular-ts" header="src/app/details/details.ts의 template 프로퍼티" path="adev/src/content/tutorials/first-app/steps/13-search/src/app/details/details.ts" visibleLines="[10,45]"/>

   이제 템플릿에 `(submit)="submitApplication()"` 이벤트 핸들러가 포함됩니다. Angular 템플릿에서는 이벤트 이름을 괄호로 감싸 이벤트를 바인딩합니다. 등호 오른쪽 코드는 해당 이벤트가 발생했을 때 실행됩니다. 브라우저 이벤트와 커스텀 이벤트 모두 바인딩할 수 있습니다.

1. 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.

   <img alt="입주 신청 폼이 표시된 상세 페이지" src="assets/images/tutorials/first-app/homes-app-lesson-12-step-3.png">

</docs-step>

<!--
<docs-step title="Test your app's new form">
This step tests the new form to see that when the form data is submitted to the app, the form data appears in the console log.

1. In the **Terminal** pane of your IDE, run `ng serve`, if it isn't already running.
1. In your browser, open your app at `http://localhost:4200`.
1. Right click on the app in the browser and from the context menu, choose **Inspect**.
1. In the developer tools window, choose the **Console** tab.
   Make sure that the developer tools window is visible for the next steps
1. In your app:
   1. Select a housing location and click **Learn more**, to see details about the house.
   1. In the house's details page, scroll to the bottom to find the new form.
   1. Enter data into the form's fields - any data is fine.
   1. Choose **Apply now** to submit the data.
1. In the developer tools window, review the log output to find your form data.
   </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you updated your app to add a form using Angular's forms feature, and connect the data captured in the form to a component using an event handler.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/forms" title="Angular Forms"/>
  <docs-pill href="guide/templates/event-listeners" title="Event Handling"/>
</docs-pill-row>
-->

<docs-step title="새 폼 테스트하기">

<a id="test-your-apps-new-form"></a>

이 단계에서는 새 폼에서 데이터를 제출했을 때 브라우저 콘솔에 해당 데이터가 표시되는지 테스트합니다.

1. IDE의 **터미널** 창에서 `ng serve`가 실행 중이 아니라면 실행하세요.
1. 브라우저에서 `http://localhost:4200`을 열어 앱에 접속하세요.
1. 브라우저의 앱 화면에서 마우스 오른쪽 버튼을 클릭하고 메뉴에서 **검사**를 선택하세요.
1. 개발자 도구 창에서 **콘솔(Console)** 탭을 선택하세요.
   다음 단계를 진행하는 동안 개발자 도구 창이 보이도록 두세요.
1. 앱에서 다음 작업을 수행하세요:
   1. 주택을 선택하고 **Learn more**를 클릭해 상세 정보를 여세요.
   1. 상세 페이지 아래쪽으로 스크롤해 새 폼을 찾으세요.
   1. 폼의 입력 필드에 원하는 데이터를 입력하세요.
   1. **Apply now**를 클릭해 데이터를 제출하세요.
1. 개발자 도구 창의 로그에 폼 데이터가 출력되는지 확인하세요.
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 Angular의 폼 기능으로 앱에 폼을 추가하고 이벤트 핸들러를 통해 입력한 데이터를 컴포넌트에 연결했습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/forms" title="Angular 폼"/>
  <docs-pill href="guide/templates/event-listeners" title="이벤트 처리"/>
</docs-pill-row>
