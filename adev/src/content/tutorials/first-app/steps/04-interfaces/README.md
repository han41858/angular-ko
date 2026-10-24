<!--
# Creating an interface

This tutorial lesson demonstrates how to create an interface and include it in a component of your app.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=YkFSeUeV8Ixtz8pm"/>
-->

# 인터페이스 만들기

이번 실습에서는 인터페이스를 만들고 앱의 컴포넌트에서 사용하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=YkFSeUeV8Ixtz8pm"/>

<!--
## What you'll learn

- Your app has a new interface that it can use as a data type.
- Your app has an instance of the new interface with sample data.
-->

<a id="what-youll-learn"></a>

## 학습 목표

- 앱에서 데이터 타입으로 사용할 인터페이스를 만듭니다.
- 새 인터페이스 타입에 맞는 예제 데이터를 앱에 추가합니다.

<!--
## Conceptual preview of interfaces

[Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) are custom data types for your app.

Angular uses TypeScript to take advantage of working in a strongly typed programming environment.
Strong type checking reduces the likelihood of one element in your app sending incorrectly formatted data to another.
Such type-mismatch errors are caught by the TypeScript compiler and many such errors can also be caught in your IDE.

In this lesson, you'll create an interface to define properties that represent data about a single housing location.

<docs-workflow>
-->

<a id="conceptual-preview-of-interfaces"></a>

## 인터페이스 개념 살펴보기

[인터페이스](https://www.typescriptlang.org/docs/handbook/interfaces.html)는 앱에서 사용하는 사용자 정의 데이터 타입입니다.

Angular는 TypeScript를 사용해 엄격한 타입 검사가 가능한 프로그래밍 환경의 장점을 활용합니다.
엄격한 타입 검사는 앱의 한 요소가 다른 요소에 잘못된 형식의 데이터를 전달할 가능성을 줄여줍니다.
이러한 타입 불일치 오류는 TypeScript 컴파일러에서 발견하며, 상당수는 IDE에서도 확인할 수 있습니다.

이번 실습에서는 주택 한 곳의 데이터를 나타내는 프로퍼티를 인터페이스로 정의합니다.

<docs-workflow>

<!--
<docs-step title="Create a new Angular interface">
This step creates a new interface in your app.

In the **Terminal** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.
1. In the `first-app` directory, run this command to create the new interface.

   ```shell

   ng generate interface housinglocation

   ```

1. Run `ng serve` to build the app and serve it to `http://localhost:4200`.
1. In a browser, open `http://localhost:4200` to see your app.
1. Confirm that the app builds without error.
   Correct any errors before you continue to the next step.
   </docs-step>
-->

<docs-step title="새 Angular 인터페이스 만들기">

<a id="create-a-new-angular-interface"></a>

이 단계에서는 앱에 새 인터페이스를 만듭니다.

IDE의 **터미널** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.
1. `first-app` 디렉터리에서 다음 명령어로 새 인터페이스를 만드세요.

   ```shell

   ng generate interface housinglocation

   ```

1. `ng serve`를 실행해 앱을 빌드하고 `http://localhost:4200`에서 실행하세요.
1. 브라우저에서 `http://localhost:4200`을 열어 앱을 확인하세요.
1. 앱이 오류 없이 빌드되는지 확인하세요.
   오류가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

<!--
<docs-step title="Add properties to the new interface">
This step adds the properties to the interface that your app needs to represent a housing location.

1.  In the **Terminal** pane of your IDE, start the `ng serve` command, if it isn't already running, to build the app and serve it to `http://localhost:4200`.
1.  In the **Edit** pane of your IDE, open the `src/app/housinglocation.ts` file.
1.  In `housinglocation.ts`, replace the default content with the following code to make your new interface to match this example.

      <docs-code header="Update src/app/housinglocation.ts to match this code" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/housinglocation.ts" visibleLines="[1,10]" />

1.  Save your changes and confirm the app does not display any errors. Correct any errors before you continue to the next step.

At this point, you've defined an interface that represents data about a housing location including an `id`, `name`, and location information.
</docs-step>
-->

<docs-step title="새 인터페이스에 프로퍼티 추가하기">

<a id="add-properties-to-the-new-interface"></a>

이 단계에서는 주택 정보를 표현하는 데 필요한 프로퍼티를 인터페이스에 추가합니다.

1. IDE의 **터미널** 창에서 `ng serve`가 실행 중이 아니라면 실행해 앱을 빌드하고 `http://localhost:4200`에서 실행하세요.
1. IDE의 **편집** 창에서 `src/app/housinglocation.ts` 파일을 여세요.
1. `housinglocation.ts`의 기본 내용을 다음 코드로 바꿔 새 인터페이스를 예제와 같이 작성하세요.

  <docs-code header="src/app/housinglocation.ts를 다음 코드로 수정하기" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/housinglocation.ts" visibleLines="[1,10]" />

1. 변경 사항을 저장하고 앱에 오류가 없는지 확인하세요. 오류가 있다면 수정한 후 다음 단계로 진행하세요.

이제 `id`, `name`, 위치 정보 등 주택 데이터를 표현하는 인터페이스가 정의되었습니다.
</docs-step>

<!--
<docs-step title="Create a test house for your app">
You have an interface, but you aren't using it yet.

In this step, you create an instance of the interface and assign some sample data to it.
You won't see this sample data appear in your app yet.
There are a few more lessons to complete before that happens.

1.  In the **Terminal** pane of your IDE, run the `ng serve` command, if it isn't already running, to build the app and serve your app to `http://localhost:4200`.
1.  In the **Edit** pane of your IDE, open `src/app/home/home.ts`.
1.  In `src/app/home/home.ts`, add this import statement after the existing `import` statements so that `Home` can use the new interface.

      <docs-code language="angular-ts" header="Import Home in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[3]"/>

1.  In `src/app/home/home.ts`, replace the empty `export class Home {}` definition with this code to create a single instance of the new interface in the component.

      <docs-code language="angular-ts" header="Add sample data to src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[21,34]"/>

1.  Confirm that your `home.ts` file matches this example.

      <docs-code language="angular-ts" header="src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[1,34]" />

    By adding the `housingLocation` property of type `HousingLocation` to the `Home` class, we're able to confirm that the data matches the description of the interface. If the data didn't satisfy the description of the interface, the IDE has enough information to give us helpful errors.

1.  Save your changes and confirm the app does not have any errors. Open the browser and confirm that your application still displays the message "housing-location works!"

      <img alt="browser frame of homes-app displaying logo, filter text input box and search button and the message 'housing-location works!'" src="assets/images/tutorials/first-app/homes-app-lesson-03-step-2.png">

1.  Correct any errors before you continue to the next step.
    </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you created an interface that created a new data type for your app.
This new data type makes it possible for you to specify where `HousingLocation` data is required.
This new data type also makes it possible for your IDE and the TypeScript compiler can ensure that `HousingLocation` data is used where it's required.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="cli/generate/interface" title="ng generate interface"/>
  <docs-pill href="cli/generate" title="ng generate"/>
</docs-pill-row>
-->

<docs-step title="앱에서 사용할 테스트 주택 만들기">

<a id="create-a-test-house-for-your-app"></a>

인터페이스를 만들었지만 아직 사용하지는 않았습니다.

이 단계에서는 인터페이스 타입의 객체를 만들고 예제 데이터를 할당합니다.
아직은 이 예제 데이터가 앱에 표시되지 않습니다.
데이터를 표시하려면 몇 가지 실습을 더 진행해야 합니다.

1. IDE의 **터미널** 창에서 `ng serve`가 실행 중이 아니라면 실행해 앱을 빌드하고 `http://localhost:4200`에서 실행하세요.
1. IDE의 **편집** 창에서 `src/app/home/home.ts`를 여세요.
1. `Home`에서 새 인터페이스를 사용할 수 있도록 `src/app/home/home.ts`의 기존 `import` 구문 다음에 다음 구문을 추가하세요.

  <docs-code language="angular-ts" header="src/app/home/home.ts에서 인터페이스 불러오기" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[3]"/>

1. `src/app/home/home.ts`의 빈 `export class Home {}` 정의를 다음 코드로 바꿔 컴포넌트에 새 인터페이스 타입의 객체를 만드세요.

  <docs-code language="angular-ts" header="src/app/home/home.ts에 예제 데이터 추가하기" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[21,34]"/>

1. `home.ts` 파일이 다음 예제와 일치하는지 확인하세요.

     <docs-code language="angular-ts" header="src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/05-inputs/src/app/home/home.ts" visibleLines="[1,34]" />

   `Home` 클래스에 `HousingLocationInfo` 타입의 `housingLocation` 프로퍼티를 추가하면 데이터가 인터페이스 정의에 맞는지 확인할 수 있습니다. 데이터가 인터페이스 정의와 다르면 IDE가 타입 정보를 바탕으로 유용한 오류 메시지를 표시합니다.

1. 변경 사항을 저장하고 앱에 오류가 없는지 확인하세요. 브라우저를 열어 "housing-location works!" 메시지가 여전히 표시되는지 확인하세요.

  <img alt="로고, 필터 검색 입력창, 검색 버튼과 'housing-location works!' 메시지가 표시된 Homes 앱의 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-03-step-2.png">

1. 오류가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 인터페이스를 만들어 앱의 새 데이터 타입을 정의했습니다.
이 데이터 타입을 사용하면 `HousingLocationInfo` 데이터가 필요한 곳을 지정할 수 있습니다.
또한 IDE와 TypeScript 컴파일러가 필요한 곳에 `HousingLocationInfo` 타입의 데이터가 사용되는지 확인할 수 있습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="cli/generate/interface" title="ng generate interface"/>
  <docs-pill href="cli/generate" title="ng generate"/>
</docs-pill-row>
