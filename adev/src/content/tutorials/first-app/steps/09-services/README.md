<!--
# Angular services

This tutorial lesson demonstrates how to create an Angular service and use dependency injection to include it in your app.

<docs-video src="https://www.youtube.com/embed/-jRxG84AzCI?si=rieGfJawp9xJ00Sz"/>
-->

# Angular 서비스

이번 실습에서는 Angular 서비스를 만들고 의존성 주입으로 앱에서 사용하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/-jRxG84AzCI?si=rieGfJawp9xJ00Sz"/>

<!--
## What you'll learn

Your app has a service to serve the data to your app.
At the end of this lesson, the service reads data from local, static data.
In a later lesson, you'll update the service to get data from a web service.
-->

<a id="what-youll-learn"></a>

## 학습 목표

앱에 데이터를 제공하는 서비스를 만듭니다.
이번 실습을 마치면 서비스가 로컬의 정적 데이터를 읽어 제공합니다.
이후 실습에서는 웹 서비스에서 데이터를 가져오도록 수정합니다.

<!--
## Conceptual preview of services

This tutorial introduces Angular services and dependency injection.
-->

<a id="conceptual-preview-of-services"></a>

## 서비스 개념 살펴보기

이번 실습에서는 Angular 서비스와 의존성 주입을 소개합니다.

<!--
### Angular services

_Angular services_ provide a way for you to separate Angular app data and functions that can be used by multiple components in your app.
To be used by multiple components, a service must be made _injectable_.
Services that are injectable and used by a component become dependencies of that component.
The component depends on those services and can't function without them.
-->

<a id="angular-services"></a>

### Angular 서비스

_Angular 서비스_ 를 사용하면 앱의 여러 컴포넌트에서 사용하는 데이터와 기능을 분리할 수 있습니다.
여러 컴포넌트에서 서비스를 사용하려면 _주입 가능한 상태_ 로 만들어야 합니다.
주입 가능하며 컴포넌트에서 사용하는 서비스는 해당 컴포넌트의 의존성이 됩니다.
컴포넌트는 이 서비스에 의존하므로 서비스 없이 동작할 수 없습니다.

<!--
### Dependency injection

_Dependency injection_ is the mechanism that manages the dependencies of an app's components and the services that other components can use.

<docs-workflow>
-->

<a id="dependency-injection"></a>

### 의존성 주입

_의존성 주입_ 은 앱의 컴포넌트가 필요로 하는 의존성과 다른 컴포넌트에서 사용할 서비스를 관리하는 방식입니다.

<docs-workflow>

<!--
<docs-step title="Create a new service for your app">
This step creates an injectable service for your app.

In the **Terminal** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.
1. In the `first-app` directory, run this command to create the new service.

   ```shell
   ng generate service housing --skip-tests
   ```

1. Run `ng serve` to build the app and serve it to `http://localhost:4200`.
1. Confirm that the app builds without error.
   Correct any errors before you continue to the next step.
   </docs-step>
-->

<docs-step title="앱에 새 서비스 만들기">

<a id="create-a-new-service-for-your-app"></a>

이 단계에서는 앱에 주입 가능한 서비스를 만듭니다.

IDE의 **터미널** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.
1. `first-app` 디렉터리에서 다음 명령어로 새 서비스를 만드세요.

   ```shell
   ng generate service housing --skip-tests
   ```

1. `ng serve`를 실행해 앱을 빌드하고 `http://localhost:4200`에서 실행하세요.
1. 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

<!--
<docs-step title="Add static data to the new service">
This step adds some sample data to your new service.
In a later lesson, you'll replace the static data with a web interface to get data as you might in a real app.
For now, your app's new service uses the data that has, so far, been created locally in `Home`.

In the **Edit** pane of your IDE:

1. In `src/app/home/home.ts`, from `Home`, copy the `baseUrl` variable and the `housingLocationList` variable with its array value.
1. In `src/app/housing.service.ts`:
   1. Inside the `HousingService` class, paste the variables that you copied from `Home` in the previous step.
   1. Inside the `HousingService` class, paste these functions after the data you just copied.
      These functions allow dependencies to access the service's data.

      <docs-code header="Service functions in src/app/housing.service.ts" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing.service.ts" visibleLines="[110,116]"/>

      You will need these functions in a future lesson. For now, it is enough to understand that these functions return either a specific `HousingLocation` by id or the entire list.

   1. Add a file level import for the `HousingLocation`.

      <docs-code header="Import HousingLocation type in  src/app/housing.service.ts" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing.service.ts" visibleLines="[2]"/>

1. Confirm that the app builds without error.
   Correct any errors before you continue to the next step.
   </docs-step>
-->

<docs-step title="새 서비스에 정적 데이터 추가하기">

<a id="add-static-data-to-the-new-service"></a>

이 단계에서는 새 서비스에 예제 데이터를 추가합니다.
이후 실습에서는 실제 앱처럼 웹 인터페이스에서 데이터를 가져오도록 정적 데이터를 교체합니다.
지금은 `Home`에 작성해 둔 로컬 데이터를 새 서비스에서 사용합니다.

IDE의 **편집** 창에서 다음 작업을 수행하세요:

1. `src/app/home/home.ts`의 `Home`에서 `baseUrl` 변수와 `housingLocationList` 변수의 배열 값을 복사하세요.
1. `src/app/housing.service.ts`에서 다음 작업을 수행하세요:
   1. `HousingService` 클래스 안에 앞 단계에서 `Home`으로부터 복사한 변수를 붙여 넣으세요.
   1. `HousingService` 클래스 안에서 복사한 데이터 다음에 아래 함수를 붙여 넣으세요.
      이 함수들은 서비스를 사용하는 쪽에서 서비스의 데이터에 접근할 수 있게 합니다.

      <docs-code header="src/app/housing.service.ts의 서비스 함수" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing.service.ts" visibleLines="[110,116]"/>

      이 함수들은 이후 실습에서 사용합니다. 지금은 id로 특정 `HousingLocationInfo`를 반환하거나 전체 목록을 반환한다는 점만 이해하면 됩니다.

   1. 파일 수준에 `HousingLocationInfo`를 불러오는 import 구문을 추가하세요.

      <docs-code header="src/app/housing.service.ts에서 HousingLocationInfo 타입 불러오기" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/housing.service.ts" visibleLines="[2]"/>

1. 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

<!--
<docs-step title="Inject the new service into `Home`">
This step injects the new service into your app's `Home` so that it can read the app's data from a service.
In a later lesson, you'll replace the static data with a live data source to get data as you might in a real app.

In the **Edit** pane of your IDE, in `src/app/home/home.ts`:

1.  At the top of `src/app/home/home.ts`, add the `inject` to the items imported from `@angular/core`. This will import the `inject` function into the `Home` class.

      <docs-code language="angular-ts" header="Update to src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[1]"/>

1.  Add a new file level import for the `HousingService`:

      <docs-code language="angular-ts" header="Add import to src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[4]"/>

1.  From `Home`, delete the `baseUrl` variable, delete the `housingLocationList` array entries and assign `housingLocationList` the value of empty array (`[]`). In a few steps you will update the code to pull the data from the `HousingService`.

1.  In `Home`, add the following code to inject the new service and initialize the data for the app. The `constructor` is the first function that runs when this component is created. The code in the `constructor` will assign the `housingLocationList` the value returned from the call to `getAllHousingLocations`.

      <docs-code language="angular-ts" header="Initialize data from service in src/app/home/home.ts" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[23,30]"/>

1.  Save the changes to `src/app/home/home.ts` and confirm your app builds without error.
    Correct any errors before you continue to the next step.
    </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you added an Angular service to your app and injected it into the `Home` class.
This compartmentalizes how your app gets its data.
For now, the new service gets its data from a static array of data.
In a later lesson, you'll refactor the service to get its data from an API endpoint.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/di/creating-and-using-services" title="Creating an injectable service"/>
  <docs-pill href="guide/di" title="Dependency injection in Angular"/>
  <docs-pill href="cli/generate/service" title="ng generate service"/>
  <docs-pill href="cli/generate" title="ng generate"/>
</docs-pill-row>
-->

<docs-step title="`Home`에 새 서비스 주입하기">

<a id="inject-the-new-service-into-home"></a>

이 단계에서는 `Home`에 새 서비스를 주입해 서비스에서 앱의 데이터를 읽을 수 있도록 합니다.
이후 실습에서는 실제 앱처럼 데이터를 가져오도록 정적 데이터를 실제 데이터 소스로 교체합니다.

IDE의 **편집** 창에서 `src/app/home/home.ts`를 수정하세요:

1. `src/app/home/home.ts` 위쪽에서 `@angular/core`로부터 불러오는 항목에 `inject`를 추가하세요. 이렇게 하면 `Home`에서 `inject` 함수를 사용할 수 있습니다.

  <docs-code language="angular-ts" header="src/app/home/home.ts 수정하기" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[1]"/>

1. 파일 수준에 `HousingService`를 불러오는 import 구문을 추가하세요:

  <docs-code language="angular-ts" header="src/app/home/home.ts에 import 추가하기" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[4]"/>

1. `Home`의 `baseUrl` 변수를 삭제하고 `housingLocationList` 배열의 항목을 지운 다음 빈 배열(`[]`)을 할당하세요. 잠시 후 `HousingService`에서 데이터를 가져오도록 코드를 수정합니다.

1. `Home`에 다음 코드를 추가해 새 서비스를 주입하고 앱의 데이터를 초기화하세요. `constructor`는 컴포넌트 인스턴스를 생성할 때 실행됩니다. 이 안에서 `getAllHousingLocations`가 반환한 값을 `housingLocationList`에 할당합니다.

  <docs-code language="angular-ts" header="src/app/home/home.ts에서 서비스 데이터로 초기화하기" path="adev/src/content/tutorials/first-app/steps/10-routing/src/app/home/home.ts" visibleLines="[23,30]"/>

1. `src/app/home/home.ts`의 변경 사항을 저장하고 앱이 에러 없이 빌드되는지 확인하세요.
   에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 앱에 Angular 서비스를 추가하고 `Home` 클래스에 주입했습니다.
이를 통해 앱에서 데이터를 가져오는 부분을 분리했습니다.
지금은 새 서비스가 정적 데이터 배열에서 데이터를 가져옵니다.
이후 실습에서는 API 엔드포인트에서 데이터를 가져오도록 서비스를 리팩토링합니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/di/creating-and-using-services" title="주입 가능한 서비스 만들기"/>
  <docs-pill href="guide/di" title="Angular 의존성 주입"/>
  <docs-pill href="cli/generate/service" title="ng generate service"/>
  <docs-pill href="cli/generate" title="ng generate"/>
</docs-pill-row>
