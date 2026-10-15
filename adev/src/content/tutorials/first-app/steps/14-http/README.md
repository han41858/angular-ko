<!--
# Add HTTP communication to your app

This tutorial demonstrates how to integrate HTTP and an API into your app.

Up until this point your app has read data from a static array in an Angular service. The next step is to use a JSON server that your app will communicate with over HTTP. The HTTP request will simulate the experience of working with data from a server.

<docs-video src="https://www.youtube.com/embed/5K10oYJ5Y-E?si=TiuNKx_teR9baO7k"/>

IMPORTANT: We recommend using your local environment for this step of the tutorial.
-->

# 앱에 HTTP 통신 추가하기

이번 실습에서는 앱에 HTTP 통신과 API를 연결하는 방법을 알아봅니다.

지금까지 앱은 Angular 서비스의 정적 배열에서 데이터를 읽었습니다. 다음으로 HTTP를 통해 앱과 통신하는 JSON 서버를 사용합니다. HTTP 요청으로 실제 서버에서 데이터를 가져오는 과정을 실습합니다.

<docs-video src="https://www.youtube.com/embed/5K10oYJ5Y-E?si=TiuNKx_teR9baO7k"/>

IMPORTANT: 이 실습은 로컬 환경에서 진행하는 것을 권장합니다.

<!--
## What you'll learn

Your app will use data from a JSON server

<docs-workflow>
-->

<a id="what-youll-learn"></a>

## 학습 목표

앱에서 JSON 서버의 데이터를 사용합니다.

<docs-workflow>

<!--
<docs-step title="Configure the JSON server">
JSON Server is an open source tool used to create mock REST APIs. You'll use it to serve the housing location data that is currently stored in the housing service.

1. Install `json-server` from npm by using the following command.

   ```bash
   npm install -g json-server
   ```

1. In the root directory of your project, create a file called `db.json`. This is where you will store the data for the `json-server`.

1. Open `db.json` and copy the following code into the file

   ```json
   {
     "locations": [
       {
         "id": 0,
         "name": "Acme Fresh Start Housing",
         "city": "Chicago",
         "state": "IL",
         "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
         "availableUnits": 4,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 1,
         "name": "A113 Transitional Housing",
         "city": "Santa Monica",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/brandon-griggs-wR11KBaB86U-unsplash.jpg",
         "availableUnits": 0,
         "wifi": false,
         "laundry": true
       },
       {
         "id": 2,
         "name": "Warm Beds Housing Support",
         "city": "Juneau",
         "state": "AK",
         "photo": "https://angular.dev/assets/images/tutorials/common/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
         "availableUnits": 1,
         "wifi": false,
         "laundry": false
       },
       {
         "id": 3,
         "name": "Homesteady Housing",
         "city": "Chicago",
         "state": "IL",
         "photo": "https://angular.dev/assets/images/tutorials/common/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
         "availableUnits": 1,
         "wifi": true,
         "laundry": false
       },
       {
         "id": 4,
         "name": "Happy Homes Group",
         "city": "Gary",
         "state": "IN",
         "photo": "https://angular.dev/assets/images/tutorials/common/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
         "availableUnits": 1,
         "wifi": true,
         "laundry": false
       },
       {
         "id": 5,
         "name": "Hopeful Apartment Group",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
         "availableUnits": 2,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 6,
         "name": "Seriously Safe Towns",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
         "availableUnits": 5,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 7,
         "name": "Hopeful Housing Solutions",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-GGupkreKwxA-unsplash.jpg",
         "availableUnits": 2,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 8,
         "name": "Seriously Safe Towns",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/saru-robert-9rP3mxf8qWI-unsplash.jpg",
         "availableUnits": 10,
         "wifi": false,
         "laundry": false
       },
       {
         "id": 9,
         "name": "Capital Safe Towns",
         "city": "Portland",
         "state": "OR",
         "photo": "https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg",
         "availableUnits": 6,
         "wifi": true,
         "laundry": true
       }
     ]
   }
   ```

1. Save this file.

1. Time to test your configuration. From the command line, at the root of your project run the following commands.

   ```bash
   json-server --watch db.json
   ```

1. In your web browser, navigate to the `http://localhost:3000/locations` and confirm that the response includes the data stored in `db.json`.

If you have any trouble with your configuration, you can find more details in the [official documentation](https://www.npmjs.com/package/json-server).
</docs-step>
-->

<docs-step title="JSON 서버 설정하기">

<a id="configure-the-json-server"></a>

JSON Server는 모의 REST API를 만드는 오픈 소스 도구입니다. 현재 주택 서비스에 저장된 데이터를 이 도구로 제공합니다.

1. 다음 명령어로 npm의 `json-server`를 설치하세요.

   ```bash
   npm install -g json-server
   ```

1. 프로젝트 루트 디렉터리에 `db.json` 파일을 만드세요. 이 파일에 `json-server`가 제공할 데이터를 저장합니다.

1. `db.json`을 열고 다음 코드를 복사하세요.

   ```json
   {
     "locations": [
       {
         "id": 0,
         "name": "Acme Fresh Start Housing",
         "city": "Chicago",
         "state": "IL",
         "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
         "availableUnits": 4,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 1,
         "name": "A113 Transitional Housing",
         "city": "Santa Monica",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/brandon-griggs-wR11KBaB86U-unsplash.jpg",
         "availableUnits": 0,
         "wifi": false,
         "laundry": true
       },
       {
         "id": 2,
         "name": "Warm Beds Housing Support",
         "city": "Juneau",
         "state": "AK",
         "photo": "https://angular.dev/assets/images/tutorials/common/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
         "availableUnits": 1,
         "wifi": false,
         "laundry": false
       },
       {
         "id": 3,
         "name": "Homesteady Housing",
         "city": "Chicago",
         "state": "IL",
         "photo": "https://angular.dev/assets/images/tutorials/common/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
         "availableUnits": 1,
         "wifi": true,
         "laundry": false
       },
       {
         "id": 4,
         "name": "Happy Homes Group",
         "city": "Gary",
         "state": "IN",
         "photo": "https://angular.dev/assets/images/tutorials/common/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
         "availableUnits": 1,
         "wifi": true,
         "laundry": false
       },
       {
         "id": 5,
         "name": "Hopeful Apartment Group",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
         "availableUnits": 2,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 6,
         "name": "Seriously Safe Towns",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
         "availableUnits": 5,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 7,
         "name": "Hopeful Housing Solutions",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-GGupkreKwxA-unsplash.jpg",
         "availableUnits": 2,
         "wifi": true,
         "laundry": true
       },
       {
         "id": 8,
         "name": "Seriously Safe Towns",
         "city": "Oakland",
         "state": "CA",
         "photo": "https://angular.dev/assets/images/tutorials/common/saru-robert-9rP3mxf8qWI-unsplash.jpg",
         "availableUnits": 10,
         "wifi": false,
         "laundry": false
       },
       {
         "id": 9,
         "name": "Capital Safe Towns",
         "city": "Portland",
         "state": "OR",
         "photo": "https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg",
         "availableUnits": 6,
         "wifi": true,
         "laundry": true
       }
     ]
   }
   ```

1. 파일을 저장하세요.

1. 설정을 테스트해 보겠습니다. 프로젝트 루트 디렉터리의 명령줄에서 다음 명령어를 실행하세요.

   ```bash
   json-server --watch db.json
   ```

1. 웹 브라우저에서 `http://localhost:3000/locations`를 열고 응답에 `db.json`의 데이터가 포함되어 있는지 확인하세요.

설정에 문제가 있다면 [공식 문서](https://www.npmjs.com/package/json-server)에서 자세한 내용을 확인할 수 있습니다.
</docs-step>

<!--
<docs-step title="Update service to use web server instead of local array">
The data source has been configured, the next step is to update your web app to connect to it use the data.

1.  In `src/app/housing.service.ts`, make the following changes:

1.  Update the code to remove `housingLocationList` property and the array containing the data, as well as the `baseUrl` property.

1.  Add a string property called `url` and set its value to `'http://localhost:3000/locations'`

    <docs-code header="Add url property to housing.service.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[6]"/>

    This code will result in errors in the rest of the file because it depends on the `housingLocationList` property. We're going to update the service methods next.

1.  Update the `getAllHousingLocations` function to make a call to the web server you configured.

     <docs-code header="Update the getAllHousingLocations method in housing.service.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[8,11]"/>

    The code now uses asynchronous code to make a **GET** request over HTTP.

    HELPFUL: For this example, the code uses `fetch`. For more advanced use cases consider using `HttpClient` provided by Angular.

1.  Update the `getHousingLocationById` function to make a call to the web server you configured.

    HELPFUL: Notice the `fetch` URL now appends the `id` as a path segment (`${this.url}/${id}`) to request the location with a matching `id` property value.

     <docs-code header="Update the getHousingLocationById method in housing.service.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[13,17]"/>

1.  Once all the updates are complete, your updated service should match the following code.

     <docs-code header="Final version of housing.service.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[1,23]" />

</docs-step>
-->

<docs-step title="로컬 배열 대신 웹 서버를 사용하도록 서비스 수정하기">

<a id="update-service-to-use-web-server-instead-of-local-array"></a>

데이터 소스가 준비되었으므로 웹 앱을 연결해 해당 데이터를 사용하도록 수정합니다.

1. `src/app/housing.service.ts`를 다음과 같이 수정하세요:

1. `housingLocationList` 프로퍼티와 데이터 배열, `baseUrl` 프로퍼티를 삭제하세요.

1. `url` 문자열 프로퍼티를 추가하고 `'http://localhost:3000/locations'`를 할당하세요.

   <docs-code header="housing.service.ts에 url 프로퍼티 추가하기" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[6]"/>

   나머지 코드는 `housingLocationList` 프로퍼티에 의존하므로 이 시점에는 에러가 발생합니다. 다음으로 서비스 메서드를 수정하겠습니다.

1. `getAllHousingLocations` 함수가 설정한 웹 서버를 호출하도록 수정하세요.

    <docs-code header="housing.service.ts의 getAllHousingLocations 메서드 수정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[8,11]"/>

   이제 비동기 코드로 HTTP **GET** 요청을 보냅니다.

   HELPFUL: 이 예제는 `fetch`를 사용합니다. 더 복잡한 기능이 필요하다면 Angular에서 제공하는 `HttpClient`를 고려하세요.

1. `getHousingLocationById` 함수가 설정한 웹 서버를 호출하도록 수정하세요.

   HELPFUL: `fetch`의 URL 뒤에 `id`를 경로 구간으로 추가한 `${this.url}/${id}` 형식을 확인하세요. 이렇게 하면 `id` 프로퍼티가 일치하는 주택 정보를 요청할 수 있습니다.

    <docs-code header="housing.service.ts의 getHousingLocationById 메서드 수정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[13,17]"/>

1. 모든 수정을 마친 서비스는 다음 코드와 같아야 합니다.

 <docs-code header="housing.service.ts의 최종 코드" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts" visibleLines="[1,23]" />

</docs-step>

<!--
<docs-step title="Update the components to use asynchronous calls to the housing service">
The server is now reading data from the HTTP request but the components that rely on the service now have errors because they were programmed to use the synchronous version of the service.

1.  In `src/app/home/home.ts`, update the `constructor` to use the new asynchronous version of the `getAllHousingLocations` method. Because we didn't use signals for our state, you have to notify Angular that a change happened that requires a synchronization. Call `this.changeDetectorRef.markForCheck()` to do this.

      <docs-code header="Update constructor in home.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/home/home.ts" visibleLines="[30,38]"/>

1.  In `src/app/details/details.ts`, update the `constructor` to use the new asynchronous version of the `getHousingLocationById` method. As before, you must also call `this.changeDetectorRef.markForCheck()` to notify Angular of the changes.

      <docs-code header="Update constructor in details.ts" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/details/details.ts" visibleLines="[60,66]"/>

1.  Save your code.

1.  Open the application in the browser and confirm that it runs without any errors.
    </docs-step>

</docs-workflow>

NOTE: This lesson relies on the `fetch` browser API. For the support of interceptors, please refer to the [HTTP client documentation](/guide/http)

SUMMARY: In this lesson, you updated your app to use a local web server (`json-server`), and use asynchronous service methods to retrieve data.

Congratulations! You've successfully completed this tutorial and are ready to continue your journey with building even more complex Angular Apps.

If you would like to learn more, please consider completing some of Angular's other developer [tutorials](tutorials) and [guides](overview).
-->

<docs-step title="서비스의 비동기 호출을 사용하도록 컴포넌트 수정하기">

<a id="update-the-components-to-use-asynchronous-calls-to-the-housing-service"></a>

이제 서비스는 HTTP 요청으로 데이터를 읽지만, 이를 사용하는 컴포넌트는 동기 방식의 서비스를 기준으로 작성되어 에러가 발생합니다.

1. `src/app/home/home.ts`의 `constructor`에서 비동기로 바뀐 `getAllHousingLocations` 메서드를 사용하도록 수정하세요. 상태에 시그널을 사용하지 않았으므로 화면과 동기화할 변경이 발생했음을 Angular에 알려야 합니다. 이를 위해 `this.changeDetectorRef.markForCheck()`를 호출하세요.

  <docs-code header="home.ts의 constructor 수정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/home/home.ts" visibleLines="[30,38]"/>

1. `src/app/details/details.ts`의 `constructor`에서 비동기로 바뀐 `getHousingLocationById` 메서드를 사용하도록 수정하세요. 앞에서와 마찬가지로 `this.changeDetectorRef.markForCheck()`를 호출해 변경 사항을 Angular에 알려야 합니다.

  <docs-code header="details.ts의 constructor 수정하기" path="adev/src/content/tutorials/first-app/steps/14-http/src-final/app/details/details.ts" visibleLines="[60,66]"/>

1. 코드를 저장하세요.

1. 브라우저에서 애플리케이션을 열고 에러 없이 실행되는지 확인하세요.
   </docs-step>

</docs-workflow>

NOTE: 이 실습에서는 브라우저의 `fetch` API를 사용합니다. 인터셉터가 필요하다면 [HTTP 클라이언트 문서](/guide/http)를 참고하세요.

SUMMARY: 이번 실습에서는 앱이 로컬 웹 서버(`json-server`)를 사용하고 비동기 서비스 메서드로 데이터를 가져오도록 수정했습니다.

축하합니다! 튜토리얼을 모두 마쳤으며 더 복잡한 Angular 앱을 개발할 준비가 되었습니다.

더 알아보고 싶다면 Angular의 다른 개발자 [튜토리얼](tutorials)과 [가이드](overview)를 살펴보세요.
