<!--
# Get data from a server
-->
# 서버에서 데이터 받아오기

<!--
This tutorial adds the following data persistence features with help from Angular's `HttpClient`.

*   The `HeroService` gets hero data with HTTP requests
*   Users can add, edit, and delete heroes and save these changes over HTTP
*   Users can search for heroes by name

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
이번 튜토리얼에서는 Angular가 제공하는 `HttpClient`를 사용해서 데이터를 처리하는 기능에 대해 알아봅니다.

  * `HeroService`가 히어로 데이터를 가져올 때 HTTP 요청을 통해 가져올 것입니다.
*   사용자가 추가, 변경, 삭제한 히어로 데이터는 HTTP 요청을 보내서 서버에 저장할 것입니다.
*   사용자가 히어로의 이름으로 검색할 수 있는 기능을 만들어 봅니다.

<div class="alert is-helpful">

이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Enable HTTP services
-->
## HTTP 서비스 추가하기

<!--
`HttpClient` is Angular's mechanism for communicating with a remote server over HTTP.

Make `HttpClient` available everywhere in the application in two steps.
First, add it to the root `AppModule` by importing it:

<code-example header="src/app/app.module.ts (HttpClientModule import)" path="toh-pt6/src/app/app.module.ts" region="import-http-client"></code-example>

Next, still in the `AppModule`, add `HttpClientModule` to the `imports` array:

<code-example header="src/app/app.module.ts (imports array excerpt)" path="toh-pt6/src/app/app.module.ts" region="import-httpclientmodule"></code-example>
-->
`HttpClient`는 리모트 서버와 HTTP 통신을 하기 위해 Angular가 제공하는 서비스입니다.
애플리케이션 전역 범위에서 `HttpClient`를 사용하려면 다음과 같이 설정합니다:

<code-example header="src/app/app.module.ts (HttpClientModule 로드하기)" path="toh-pt6/src/app/app.module.ts" region="import-http-client"></code-example>

그리고 `AppModule`의 `imports` 배열에 `HttpClientModule`을 추가합니다.

<code-example header="src/app/app.module.ts (imports 배열 일부)" path="toh-pt6/src/app/app.module.ts" region="import-httpclientmodule"></code-example>


<!--
## Simulate a data server
-->
## 데이터 서버 목킹하기

<!--
This tutorial sample mimics communication with a remote data server by using the [In-memory Web API](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api "In-memory Web API") module.

After installing the module, the application makes requests to and receive responses from the `HttpClient`. The application doesn't know that the *In-memory Web API* is intercepting those requests, applying them to an in-memory data store, and returning simulated responses.

By using the In-memory Web API, you won't have to set up a server to learn about `HttpClient`.

<div class="alert is-important">

**IMPORTANT**: <br />
The In-memory Web API module has nothing to do with HTTP in Angular.

If you're reading this tutorial to learn about `HttpClient`, you can [skip over](#import-heroes) this step.
If you're coding along with this tutorial, stay here and add the In-memory Web API now.

</div>

Install the In-memory Web API package from npm with the following command:

<code-example format="shell" language="shell">

npm install angular-in-memory-web-api --save

</code-example>

Generate the class `src/app/in-memory-data.service.ts` with the following command:

<code-example format="shell" language="shell">

ng generate service InMemoryData

</code-example>

Replace the default contents of `in-memory-data.service.ts` with the following:

<code-example header="src/app/in-memory-data.service.ts" path="toh-pt6/src/app/in-memory-data.service.ts" region="init"></code-example>

In the `AppModule`, import the `HttpClientInMemoryWebApiModule` and the `InMemoryDataService` class, which you create next.

<code-example header="src/app/app.module.ts (In-memory Web API imports)" path="toh-pt6/src/app/app.module.ts" region="import-in-mem-stuff"></code-example>

After the `HttpClientModule`, add the `HttpClientInMemoryWebApiModule` to the `AppModule` `imports` array and configure it with the `InMemoryDataService`.

<code-example header="src/app/app.module.ts (imports array excerpt)" path="toh-pt6/src/app/app.module.ts" region="in-mem-web-api-imports"></code-example>

The `forRoot()` configuration method takes an `InMemoryDataService` class that primes the in-memory database.

The `in-memory-data.service.ts` file takes over the function of `mock-heroes.ts`.
Don't delete `mock-heroes.ts` yet. You still need it for a few more steps of this tutorial.

After the server is ready, detach the In-memory Web API so the application's requests can go through to the server.
-->
이번 예제에서는 [인-메모리(in-memory) Web API](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api "In-memory Web API") 모듈로 리모트 데이터 서버와 통신하는 부분을 대신합니다.

이 모듈을 설치하고나면 `HttpClient`로 보내는 요청이나 받는 요청이 *인-메모리 Web API*로 처리되며, 데이터가 저장되고 반환하는 것도 이 모듈을 활용합니다.

인-메모리 Web API를 사용하면 `HttpClient`와 통신할 서버를 준비하지 않아도 됩니다.

<div class="alert is-important">

**중요**: <br />
인-메모리 Web API 모듈은 Angular가 제공하는 기능이 아닙니다.

`HttpClient`에 대해서만 학습하려면 [다음 단계](#import-heroes)로 넘어가세요.
이 튜토리얼의 진행을 그대로 따라가려면 지금 인-메모리 Web API를 설정하는 것이 좋습니다.

</div>

다음 명령을 실행해서 npm 저장소에 있는 인-메모리 Web API 패키지를 설치합니다:

<code-example format="shell" language="shell">

npm install angular-in-memory-web-api --save

</code-example>

다음 명령을 실행해서 `src/app/in-memory-data.service.ts` 클래스를 생성합니다:

<code-example format="shell" language="shell">

ng generate service InMemoryData

</code-example>

그리고 이 파일의 내용을 다음과 같이 수정합니다:

<code-example header="src/app/in-memory-data.service.ts" path="toh-pt6/src/app/in-memory-data.service.ts" region="init"></code-example>

`AppModule`에서 `HttpClientInMemoryWebApiModule`과 `InMemoryDataService` 클래스를 로드합니다.

<code-example header="src/app/app.module.ts (In-memory Web API 로드하기)" path="toh-pt6/src/app/app.module.ts" region="import-in-mem-stuff"></code-example>

`AppModule`의 `imports` 배열 `HttpClientModule` 뒤에 `HttpClientInMemoryWebApiModule`을 추가하고 `InMemoryDataservice`를 사용할 수 있도록 다음과 같이 작성합니다.

<code-example header="src/app/app.module.ts (imports 배열 일부)" path="toh-pt6/src/app/app.module.ts" region="in-mem-web-api-imports"></code-example>

`forRoot()` 메소드는 `InMemoryDataService` 클래스를 인자로 받아서 인-메모리 데이터베이스의 실행환경을 구성하는 메소드입니다.

`in-memory-data.service.ts` 파일에는 `mock-heroes.ts`와 관련된 기능들이 들어있습니다.
그래서 아직은 이 튜토리얼을 진행하면서 필요한 기능이 있기 때문에 `mock-heroes.ts` 파일을 삭제하지 마세요.

나중에 서버가 준비되면 인-메모리 Web API를 제거하기만 하면 클라이언트가 보내는 요청이 서버에서 이전과 같이 처리될 것입니다.


<a id="import-heroes"></a>
<a id="heroes-and-http"></a>

<!--
## Heroes and HTTP
-->
## 히어로 데이터와 HTTP

<!--
In the `HeroService`, import `HttpClient` and `HttpHeaders`:

<code-example header="src/app/hero.service.ts (import HTTP symbols)" path="toh-pt6/src/app/hero.service.ts" region="import-httpclient"></code-example>

Still in the `HeroService`, inject `HttpClient` into the constructor in a private property called `http`.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="ctor" ></code-example>

Notice that you keep injecting the `MessageService` but since your application calls it so frequently, wrap it in a private `log()` method:

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="log" ></code-example>

Define the `heroesUrl` of the form `:base/:collectionName` with the address of the heroes resource on the server.
Here `base` is the resource to which requests are made, and `collectionName` is the heroes data object in the `in-memory-data-service.ts`.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="heroesUrl" ></code-example>
-->
`HeroService`에서 `HttpClient` 심볼과 `HttpHeaders` 심볼을 로드합니다:

<code-example header="src/app/hero.service.ts (HTTP 심볼 로드하기)" path="toh-pt6/src/app/hero.service.ts" region="import-httpclient"></code-example>

그리고 `HeroService`의 생성자에서 `HttpClient`를 `http` 프로퍼티로 주입합니다.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="ctor" ></code-example>

`MessageService`도 의존성으로 주입되지만, 이 서비스는 가끔 사용하기 때문에 private `log()` 메소드로 랩핑합니다.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="log" ></code-example>

`heroesUrl`을 `:base/:collectionName`과 같은 형태로 정의합니다. 이 주소는 서버의 리소스 위치에 따라 달라질 수 있습니다.
이 주소에서 `base`는 어떤 종류의 요청인지 구별하는 변수이며, `collectionName`은 `in-memory-data-service.ts` 파일에 있는 콜렉션을 구별하는 변수입니다.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="heroesUrl" ></code-example>


<!--
### Get heroes with `HttpClient`
-->
### `HttpClient` 로 히어로 목록 가져오기

<!--
The current `HeroService.getHeroes()` uses the RxJS `of()` function to return an array of mock heroes as an `Observable<Hero[]>`.

<code-example header="src/app/hero.service.ts (getHeroes with RxJs 'of()')" path="toh-pt4/src/app/hero.service.ts" region="getHeroes-1"></code-example>

Convert that method to use `HttpClient` as follows:

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHeroes-1"></code-example>

Refresh the browser.
The hero data should successfully load from the mock server.

You've swapped `of()` for `http.get()` and the application keeps working without any other changes
because both functions return an `Observable<Hero[]>`.
-->
지금까지 `HeroService.getHeroes()` 메소드는 히어로 목록 목 데이터를 `Observable<Hero[]>` 타입으로 반환하기 위해 RxJs `of()` 함수를 사용했습니다.

<code-example header="src/app/hero.service.ts (RxJs 'of()'를 사용하는 getHeroes())" path="toh-pt4/src/app/hero.service.ts" region="getHeroes-1"></code-example>

이 메소드가 `HttpClient`로 동작하도록 다음과 같이 수정합니다:

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHeroes-1"></code-example>

브라우저가 갱신되면 이제 히어로 데이터는 목 서버에서 받아옵니다.

`of` 함수를 `http.get`으로 변경했지만 이 서비스 외의 다른 부분은 변경하지 않아도 됩니다.
두 함수는 모두 `Observable<Hero[]>` 타입을 반환합니다.


<!--
### `HttpClient` methods return one value
-->
### `HttpClient` 메소드는 데이터를 하나만 반환합니다.

<!--
All `HttpClient` methods return an RxJS `Observable` of something.

HTTP is a request/response protocol.
You make a request, it returns a single response.

In general, an observable *can* return more than one value over time.
An observable from `HttpClient` always emits a single value and then completes, never to emit again.

This particular call to `HttpClient.get()` returns an `Observable<Hero[]>`, which is *an observable of hero arrays*.
In practice, it only returns a single hero array.
-->
`HttpClient`가 제공하는 메소드는 모두 RxJs `Observable` 타입을 한 번만 반환합니다.

HTTP는 요청과 응답으로 구성되는 프로토콜입니다.
그래서 요청이 한 번 있으면 응답도 한 번입니다.

일반적으로 옵저버블은 여러 번에 걸쳐 여러 데이터를 반환할 수 있습니다.
하지만 `HttpClient`가 반환하는 옵저버블은 데이터를 한번만 반환하고 종료되며, 다시 사용되지 않습니다.

예제에서 사용한 `HttpClient.get()`도 `Observable<Hero[]>` 데이터를 한번만 반환합니다.


<!--
### `HttpClient.get()` returns response data
-->
### _HttpClient.get_ 함수는 응답으로 받은 데이터를 반환합니다.

<!--
`HttpClient.get()` returns the body of the response as an untyped JSON object by default.
Applying the optional type specifier, `<Hero[]>` , adds TypeScript capabilities, which reduce errors during compile time.

The server's data API determines the shape of the JSON data.
The *Tour of Heroes* data API returns the hero data as an array.

<div class="alert is-helpful">

Other APIs may bury the data that you want within an object.
You might have to dig that data out by processing the `Observable` result with the RxJS `map()` operator.

Although not discussed here, there's an example of `map()` in the `getHeroNo404()` method included in the sample source code.

</div>
-->
`HttpClient.get` 함수는 HTTP 응답으로 받은 몸체\(body\)를 반환하는데, 이 객체는 타입이 지정되지 않은 JSON 객체로 처리됩니다.
그래서 이 객체에 타입을 지정하려면 `<Hero[]>`와 같이 제네릭을 지정하면 됩니다.

JSON 데이터의 형식은 서버에 정의된 데이터 API에 따라 달라집니다.
*히어로들의 여행* 에서 사용하는 데이터 API는 모두 히어로 데이터를 배열로 반환합니다.

<div class="alert is-helpful">

데이터는 HTTP 응답으로 받은 객체 안에 깊숙히 들어있을 수도 있습니다.
이런 경우에는 원하는 데이터를 추출하기 위해 RxJS `map` 연산자를 사용해야 합니다.

이 내용은 이 문서에서 다루지 않지만 예제 코드에 구현된 `getHeroNo404()` 메소드를 보면 `map` 연산자를 사용하는 코드를 확인할 수 있습니다.

</div>


<!--
### Error handling
-->
### 에러 처리하기

<!--
Things go wrong, especially when you're getting data from a remote server.
The `HeroService.getHeroes()` method should catch errors and do something appropriate.

To catch errors, you **"pipe" the observable** result from `http.get()` through an RxJS `catchError()` operator.

Import the `catchError` symbol from `rxjs/operators`, along with some other operators to use later.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="import-rxjs-operators"></code-example>

Now extend the observable result with the `pipe()` method and give it a `catchError()` operator.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHeroes-2"></code-example>

The `catchError()` operator intercepts an **`Observable` that failed**.
The operator then passes the error to the error handling function.

The following `handleError()` method reports the error and then returns an innocuous result so that the application keeps working.
-->
리모트 서버에서 데이터를 가져오는 과정은 얼마든지 잘못될 수 있습니다.
그래서 `HeroService.getHeroes()` 메소드에는 에러가 발생했을 때 처리하는 로직이 필요합니다.

에러를 처리하려면 `http.get()`으로 받은 옵저버블에 **"pipe"를 사용해서** `catchError()` 연산자를 연결하면 됩니다.

`rxjs/operators`에서 `catchError` 심볼을 로드합니다.
이 때 앞으로 사용할 연산자 몇 개도 함께 로드했습니다.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="import-rxjs-operators"></code-example>

이제 옵저버블로 받은 데이터를 `pipe()` 메소드로 확장하고 이 파이프에 `catchError()` 연산자를 연결합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHeroes-2"></code-example>

`catchError()` 연산자는 **`Observable`이 실패했을 때** 실행되는 연산자입니다.
이 연산자에는 에러가 발생했을 때 실행할 에러 핸들링 함수를 인자로 전달합니다.

다음 섹션에서 구현할 `handleError()` 메소드는 에러를 콘솔에 출력한 뒤에 빈 배열을 반환합니다.
그래서 서버에 보낸 요청이 실패하는 에러가 발생하더라도 애플리케이션은 계속 동작할 수 있습니다.


#### `handleError`

<!--
The following `handleError()` can be shared by many `HeroService` methods so it's generalized to meet their different needs.

Instead of handling the error directly, it returns an error handler function to `catchError`. This function is configured with both the name of the operation that failed and a safe return value.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="handleError"></code-example>

After reporting the error to the console, the handler constructs a friendly message and returns a safe value so the application can keep working.

Because each service method returns a different kind of `Observable` result, `handleError()` takes a type parameter to return the safe value as the type that the application expects.
-->
`HeroService`의 메소드들은 에러 처리로직이 비슷하기 때문에 `handleError()` 메소드에 이 로직을 정의합니다.

이렇게 구현하면 각 메소드에서 에러를 직접 처리하는 대신 `catchError`에 이 핸들러 함수의 반환값을 처리하기 때문에, 옵저버블이 처리되는 도중 데이터가 잘못되어 발생하는 오류를 방지할 수 있습니다.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="handleError"></code-example>

에러를 콘솔에 출력하고나면 핸들러 함수는 사용자가 이해하기 쉬운 형식의 메시지를 반환하면서 앱이 중단되지 않도록 기본값을 반환합니다.

이 때 서비스의 각 메소드는 서로 다른 타입으로 `Observable` 결과를 반환하기 때문에 `handleError()` 메소드는 각 메소드의 기본값을 인자로 받을수 있도록 정의했습니다.


<!--
### Tap into the Observable
-->
### `Observable` 확인하기

<!--
The `getHeroes()` method taps into the flow of observable values and sends a message, using the `log()` method, to the message area at the bottom of the page.

The RxJS `tap()` operator enables this ability by looking at the observable values, doing something with those values, and passing them along.
The `tap()` callback doesn't access the values themselves.

Here is the final version of `getHeroes()` with the `tap()` that logs the operation.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts"  region="getHeroes" ></code-example>
-->
`getHeroes()` 메소드는 옵저버블 데이터를 살짝 참조해서\(`tap`\) `log()` 함수로 메시지를 화면에 출력합니다.

옵저버블 데이터를 *확인하려면* RxJS가 제공하는 `tap` 연산자를 사용하면 됩니다.
이 연산자는 옵저버블 데이터를 사용해서 *어떤 동작을 수행* 하는데, 옵저버블 데이터는 변경하지 않고 그대로 전달합니다.

`getHeroes()` 메소드에 `tap`을 활용하는 로직을 넣으면  다음과 같이 구현할 수 있습니다.

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts"  region="getHeroes" ></code-example>


<!--
### Get hero by id
-->
### id로 히어로 데이터 가져오기

<!--
Most web APIs support a *get by id* request in the form `:baseURL/:id`.

Here, the *base URL* is the `heroesURL` defined in the [Heroes and HTTP](tutorial/tour-of-heroes/toh-pt6#heroes-and-http) section in `api/heroes` and *id* is the number of the hero that you want to retrieve.
For example, `api/heroes/11`.

Update the `HeroService` `getHero()` method with the following to make that request:

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHero"></code-example>

`getHero()` has three significant differences from  `getHeroes()`:

*   `getHero()` constructs a request URL with the desired hero's id
*   The server should respond with a single hero rather than an array of heroes
*   `getHero()` returns an `Observable<Hero>`, which is an observable of `Hero` *objects* rather than an observable of `Hero` *arrays*.
-->
일반적으로 웹 API는 *id로 데이터를 검색하는 기능을* `:baseURL/:id`와 같은 방식으로 제공합니다.

이번에는 [히어로 데이터와 HTTP](tutorial/tour-of-heroes/toh-pt6#heroes-and-http) 섹션에서 정의한 `heroesURL`에 *기본 URL* 과 히어로 id에 해당하는 숫자를 사용해서 `api/heroes/11`라는 주소로 히어로 데이터를 요청해 봅시다.

`HeroService`의 `getHero()` 메소드를 다음과 같이 수정합니다:

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="getHero"></code-example>

이 메소드는 `getHeroes()`와 다른 점이 3가지 있습니다.

*   인자로 받은 히어로 id로 URL을 구성합니다.
*   서버가 반환하는 응답은 배열 형태의 히어로 목록이 아니라 히어로 한 명의 데이터입니다.
*   그래서 `getHero()`가 반환하는 결과물은 `Observable<Hero>` 타입으로 "*히어로 객체를 표현하는 옵저버블*" 입니다. 배열이 아닙니다.


<!--
## Update heroes
-->
## 히어로 데이터 수정하기

<!-- markdownlint-disable MD001 -->

<!--
Edit a hero's name in the hero detail view.
As you type, the hero name updates the heading at the top of the page, yet
when you click **Go back**, your changes are lost.

If you want changes to persist, you must write them back to the server.

At the end of the hero detail template, add a save button with a `click` event binding that invokes a new component method named `save()`.

<code-example header="src/app/hero-detail/hero-detail.component.html (save)" path="toh-pt6/src/app/hero-detail/hero-detail.component.html" region="save"></code-example>

In the `HeroDetail` component class, add the following `save()` method, which persists hero name changes using the hero service `updateHero()` method and then navigates back to the previous view.

<code-example header="src/app/hero-detail/hero-detail.component.ts (save)" path="toh-pt6/src/app/hero-detail/hero-detail.component.ts" region="save"></code-example>
-->
히어로 상세정보 화면에서는 히어로의 이름을 수정할 수 있습니다.
그런데 사용자가 히어로의 이름을 입력하면 이 내용이 페이지 위쪽에 표시되지만 **뒤로 가기** 버튼을 누르면 변경된 내용이 폐기됩니다.

히어로의 이름을 영구적으로 저장하려면 사용자가 입력한 내용을 서버로 보내서 저장해야 합니다.

히어로 상세정보 화면을 정의하는 템플릿 제일 아래에 저장 버튼을 추가하고 이 버튼에 `click` 이벤트를 바인딩해 봅시다.
이 이벤트는 컴포넌트 클래스의 `save()` 메소드로 연결할 것입니다.

<code-example header="src/app/hero-detail/hero-detail.component.html (저장하기)" path="toh-pt6/src/app/hero-detail/hero-detail.component.html" region="save"></code-example>

그리고 아래 내용으로 `HeroDetail` 컴포넌트에 `save()` 메소드를 구현합니다.
이 메소드는 `HeroService.updateHero()` 메소드를 실행해서 변경된 내용을 저장하고 이전 화면으로 돌아가는 동작을 합니다.

<code-example header="src/app/hero-detail/hero-detail.component.ts (저장하기)" path="toh-pt6/src/app/hero-detail/hero-detail.component.ts" region="save"></code-example>


<!--
#### Add `HeroService.updateHero()`
-->
#### `HeroService.updateHero()` 추가하기

<!--
The structure of the `updateHero()` method is like that of `getHeroes()`, but it uses `http.put()` to persist the changed hero on the server.
Add the following to the `HeroService`.

<code-example header="src/app/hero.service.ts (update)" path="toh-pt6/src/app/hero.service.ts" region="updateHero"></code-example>

The `HttpClient.put()` method takes three parameters:

*   The URL
*   The data to update, which is the modified hero in this case
*   Options

The URL is unchanged.
The heroes web API knows which hero to update by looking at the hero's `id`.

The heroes web API expects a special header in HTTP save requests.
That header is in the `httpOptions` constant defined in the `HeroService`.
Add the following to the `HeroService` class.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="http-options"></code-example>

Refresh the browser, change a hero name and save your change.
The `save()` method in `HeroDetailComponent` navigates to the previous view.
The hero now appears in the list with the changed name.
-->
`updateHero()` 메소드는 `getHeroes()` 메소드와 거의 비슷합니다. 대신 `updateHero()` 메소드는 `http.get()`이 아니라 `http.put()` 함수를 사용합니다.

<code-example header="src/app/hero.service.ts (수정하기)" path="toh-pt6/src/app/hero.service.ts" region="updateHero"></code-example>

`HttpClient.put()` 메소드는 3개의 인자를 받습니다:

*   URL
*   수정할 데이터 \(수정된 히어로 데이터\)
*   옵션

URL은 변경되지 않았습니다. 이 예제에 정의한 웹 API는 히어로의 `id`를 기준으로 수정할 히어로를 찾습니다.

이번 예제에서 사용하는 웹 API에는 헤더가 존재합니다.
이 헤더는 `HeroService` 안에 `httpOptions` 프로퍼티에 저장하고 상수처럼 사용할 것입니다.
`HeroService` 클래스에 다음 코드를 추가합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="http-options"></code-example>

이제 브라우저가 갱신된 후에 히어로의 이름을 변경하고 저장해보세요.
그러면 `HeroDetailComponent`에 정의한 대로 이전 페이지로 돌아가는데, 전환된 화면에는 변경된 내용이 반영되어 표시될 것입니다.


<!--
## Add a new hero
-->
## 새 히어로 추가하기

<!--
To add a hero, this application only needs the hero's name.
You can use an `<input>` element paired with an add button.

Insert the following into the `HeroesComponent` template, after the heading:

<code-example header="src/app/heroes/heroes.component.html (add)" path="toh-pt6/src/app/heroes/heroes.component.html" region="add"></code-example>

In response to a click event, call the component's click handler, `add()`, and then clear the input field so that it's ready for another name.
Add the following to the `HeroesComponent` class:

<code-example header="src/app/heroes/heroes.component.ts (add)" path="toh-pt6/src/app/heroes/heroes.component.ts" region="add"></code-example>

When the given name isn't blank, the handler creates an object based on the hero's name.
The handler passes the object name to the service's `addHero()` method.

When `addHero()` creates a new object, the `subscribe()` callback receives the new hero and pushes it into the `heroes` list for display.

Add the following `addHero()` method to the `HeroService` class.

<code-example header="src/app/hero.service.ts (addHero)" path="toh-pt6/src/app/hero.service.ts" region="addHero"></code-example>

`addHero()` differs from `updateHero()` in two ways:

*   It calls `HttpClient.post()` instead of `put()`
*   It expects the server to create an id for the new hero, which it returns in the `Observable<Hero>` to the caller

Refresh the browser and add some heroes.
-->
이 문서에서 만들고 있는 앱은 히어로를 추가할 때 이름만 있으면 됩니다.
화면에 `<input>` 엘리먼트 하나와 버튼 하나만 추가해 봅시다.

`HeroesComponent` 템플릿의 헤더 아래에 아래 내용을 추가합니다:

<code-example header="src/app/heroes/heroes.component.html (추가하기)" path="toh-pt6/src/app/heroes/heroes.component.html" region="add"></code-example>

클릭 이벤트가 발생하면 컴포넌트의 클릭 핸들러인 `add()` 메소드를 실행하고 입력 필드를 비우면서 다른 이름을 받을 준비를 합니다.
이 로직을 `HeroesComponent` 클래스에 정의합니다:

<code-example header="src/app/heroes/heroes.component.ts (추가하기)" path="toh-pt6/src/app/heroes/heroes.component.ts" region="add"></code-example>

사용자가 입력한 이름이 유효하다면 핸들러 함수는 이름을 사용해서 `Hero`와 호환되는 객체를 생성합니다.
그리고 이 객체를 `addHero()` 메소드로 전달합니다.

그리고 `addHero()`가 문제없이 실행되면 `subscribe()` 콜백함수가 새 히어로 객체를 받고 이 객체를 `heroes` 목록에 추가하기 때문에 화면에도 표시됩니다.

<code-example header="src/app/hero.service.ts (addHero())" path="toh-pt6/src/app/hero.service.ts" region="addHero"></code-example>

`addHero()`는 `updateHero()`와 두 가지가 다릅니다:

*   `HttpClient.put()` 대신 `post()`를 실행합니다.
*   이 함수를 실행하면 새로운 히어로에 대한 id가 생성되어야 하며, `Observable<Hero>` 타입으로 반환됩니다.

브라우저를 새로고침하고 히어로를 추가해 보세요.


<!--
## Delete a hero
-->
## 히어로 삭제하기

<!--
Each hero in the heroes list should have a delete button.

Add the following button element to the `HeroesComponent` template, after the hero name in the repeated `<li>` element.

<code-example header="src/app/heroes/heroes.component.html" path="toh-pt6/src/app/heroes/heroes.component.html" region="delete"></code-example>

The HTML for the list of heroes should look like this:

<code-example header="src/app/heroes/heroes.component.html (list of heroes)" path="toh-pt6/src/app/heroes/heroes.component.html" region="list"></code-example>

To position the delete button at the far right of the hero entry, add some CSS from the [final review code](#heroescomponent) to the `heroes.component.css`.

Add the `delete()` handler to the component class.

<code-example header="src/app/heroes/heroes.component.ts (delete)" path="toh-pt6/src/app/heroes/heroes.component.ts" region="delete"></code-example>

Although the component delegates hero deletion to the `HeroService`, it remains responsible for updating its own list of heroes.
The component's `delete()` method immediately removes the *hero-to-delete* from that list, anticipating that the `HeroService` succeeds on the server.

There's really nothing for the component to do with the `Observable` returned by `heroService.deleteHero()` **but it must subscribe anyway**.

Next, add a `deleteHero()` method to `HeroService` like this.

<code-example header="src/app/hero.service.ts (delete)" path="toh-pt6/src/app/hero.service.ts" region="deleteHero"></code-example>

Notice the following key points:

*   `deleteHero()` calls `HttpClient.delete()`
*   The URL is the heroes resource URL plus the `id` of the hero to delete
*   You don't send data as you did with `put()` and `post()`
*   You still send the `httpOptions`

Refresh the browser and try the new delete capability.

<div class="alert is-important">

If you neglect to `subscribe()`, the service can't send the delete request to the server.
As a rule, an `Observable` *does nothing* until something subscribes.

Confirm this for yourself by temporarily removing the `subscribe()`, clicking **Dashboard**, then clicking **Heroes**.
This shows the full list of heroes again.

</div>
-->
히어로 목록에 있는 각 항목에는 제거 버튼이 있어야 합니다.

그래서 `HeroesComponent` 템플릿의 `<li>` 엘리먼트로 반복되는 히어로 이름 뒤에 다음과 같은 버튼 엘리먼트를 추가합니다.

<code-example header="src/app/heroes/heroes.component.html" path="toh-pt6/src/app/heroes/heroes.component.html" region="delete"></code-example>

그러면 히어로 목록을 표시하는 템플릿이 다음과 같이 구성될 것입니다:

<code-example header="src/app/heroes/heroes.component.html (히어로 목록)" path="toh-pt6/src/app/heroes/heroes.component.html" region="list"></code-example>

제거 버튼을 원하는 곳에 두려면 [최종코드 리뷰](#heroescomponent) 섹션에서 확인할 수 있는 것처럼 `heroes.component.css` 파일에 CSS 스타일을 추가해야 합니다.

그 다음에는 컴포넌트 클래스에 `delete()` 핸들러를 추가합니다.

<code-example header="src/app/heroes/heroes.component.ts (delete())" path="toh-pt6/src/app/heroes/heroes.component.ts" region="delete"></code-example>

히어로를 제거하는 기능은 `HeroService`가 담당하지만, 변경된 내용으로 화면을 갱신하는 것은 컴포넌트가 처리해야 합니다.
그래서 컴포넌트에 정의된 `delete()` 메소드는 서버로 보내는 요청이 성공할 것으로 간주하고 *이 히어로* 를 목록에서 바로 제거합니다.

`heroService.delete()` 메소드를 실행하고 받은 `Observable`로는 아무것도 하지 않습니다.
함수를 실행하기 위해 **단순하게 구독만 할 뿐입니다.**

그리고 `HeroService`에 다음과 같이 `deleteHero()` 메소드를 추가합니다.

<code-example header="src/app/hero.service.ts (deleteHero())" path="toh-pt6/src/app/hero.service.ts" region="deleteHero"></code-example>

이런 점을 주목하세요:

*   `deleteHero()`는 `HttpClient.delete()`를 실행합니다.
*   URL은 리소스 URL 뒤에 제거하려는 히어로의 `id`가 붙은 형태입니다.
*   `put()`이나 `post()`를 실행할 때처럼 데이터를 보내지는 않습니다.
*   `httpOptions`는 그대로 사용합니다.

이제 브라우저를 새로 고침하고 제거 기능이 제대로 동작하는지 확인해 보세요.


<!--
## Search by name
-->
## 이름으로 검색하기

<!--
In this last exercise, you learn to chain `Observable` operators together so you can reduce the number of similar HTTP requests to consume network bandwidth economically.
-->
이전 섹션에서 알아본 것처럼 `Observable` 연산자를 체이닝하면 HTTP 요청을 최적화할 수 있으며, 결과적으로 네트워크 사용량을 절약할 수 있습니다.


<!--
### Add a heroes search feature to the Dashboard
-->
### 대시보드에 검색 기능 추가하기

<!--
As the user types a name into a search box, your application makes repeated HTTP requests for heroes filtered by that name.
Your goal is to issue only as many requests as necessary.
-->
사용자가 검색창에 히어로 이름을 입력하면 입력한 내용이 포함된 히어로의 목록을 받아오도록 HTTP 요청을 보낼 것입니다.
이 때 진짜 필요할 때만 실제로 요청을 보내는 방법에 대해 알아봅시다.


#### `HeroService.searchHeroes()`

<!--
Start by adding a `searchHeroes()` method to the `HeroService`.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="searchHeroes"></code-example>

The method returns immediately with an empty array if there is no search term.
The rest of it closely resembles `getHeroes()`, the only significant difference being the URL, which includes a query string with the search term.
-->
아래 내용으로 `HeroService`에 `searchHeroes()` 메소드를 추가합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt6/src/app/hero.service.ts" region="searchHeroes"></code-example>

이 메소드는 입력된 내용이 없을 때 빈 배열을 즉시 반환합니다.
이 경우가 아니라면 `getHeroes()`와 거의 비슷합니다.
사용자가 입력한 문구가 URL에 쿼리 스트링으로 포함된다는 것만 다릅니다.


<!--
### Add search to the dashboard
-->
### 대시보드에 검색 기능 추가하기

<!--
Open the `DashboardComponent` template and
add the hero search element, `<app-hero-search>`, to the bottom of the markup.

<code-example header="src/app/dashboard/dashboard.component.html" path="toh-pt6/src/app/dashboard/dashboard.component.html"></code-example>

This template looks a lot like the `*ngFor` repeater in the `HeroesComponent` template.

For this to work, the next step is to add a component with a selector that matches `<app-hero-search>`.
-->
`DashboardComponent` 템플릿을 열고 이 템플릿 제일 아래에 `<app-hero-search>`를 추가합니다.

<code-example header="src/app/dashboard/dashboard.component.html" path="toh-pt6/src/app/dashboard/dashboard.component.html"></code-example>

이 템플릿은 `HeroesComponent` 템플릿에서 `*ngFor` 반복자가 사용된 부분과 거의 비슷합니다.

이 부분을 구현하기 위해 다음 단계에서는 컴포넌트에 `<app-hero-search>` 컴포넌트를 추가해 봅시다.


<!--
### Create `HeroSearchComponent`
-->
### `HeroSearchComponent` 생성하기

<!--
Run `ng generate` to create a `HeroSearchComponent`.

<code-example format="shell" language="shell">

ng generate component hero-search

</code-example>

`ng generate` creates the three `HeroSearchComponent` files and adds the component to the `AppModule` declarations.

Replace the `HeroSearchComponent` template with an `<input>` and a list of matching search results, as follows.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html"></code-example>

Add private CSS styles to `hero-search.component.css` as listed in the [final code review](#herosearchcomponent) below.

As the user types in the search box, an input event binding calls the component's `search()` method with the new search box value.
-->
`ng generate` 명령을 실행해서 `HeroSearchComponent`를 생성합니다.

<code-example format="shell" language="shell">

ng generate component hero-search

</code-example>

`ng generate` 명령을 실행하면 `HeroSearchComponent`를 구성하는 파일을 생성하면서 `AppModule`에 이 컴포넌트를 자동으로 등록합니다.

이렇게 생성된 `HeroSearchComponent`의 템플릿을 다음과 같이 수정합니다.
이 템플릿에는 사용자가 내용을 입력할 수 있는 텍스트 박스가 하나 있고, 검색 결과를 표시하는 목록이 있습니다.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html"></code-example>

그리고 [최종코드 리뷰](#herosearchcomponent)에 있는 내용처럼 `hero-search.component.css` 파일에 컴포넌트 CSS 스타일을 추가합니다.

이제 사용자가 검색창에 내용을 입력하면 *입력* 이벤트에 바인딩된 `search()` 메소드가 실행될 것입니다.


<a id="asyncpipe"></a>

### `AsyncPipe`

<!--
The `*ngFor` repeats hero objects.
Notice that the `*ngFor` iterates over a list called `heroes$`, not `heroes`.
The `$` is a convention that indicates `heroes$` is an `Observable`, not an array.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html" region="async"></code-example>

Since `*ngFor` can't do anything with an `Observable`, use the pipe `|` character followed by `async`.
This identifies Angular's `AsyncPipe` and subscribes to an `Observable` automatically so you won't have to do so in the component class.
-->
`*ngFor`는 히어로 객체를 순회하는데, 이 때 `heroes` 배열대신 `heroes$`를 사용합니다.
`$`는 `Observable`을 뜻하는 관용적 표현입니다.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html" region="async"></code-example>

`*ngFor` 자체로는 `Observable`을 대상으로 어떤 작업도 수행하지 않기 때문에 파이프 문자 `|` 를 붙이고 `async` 파이프를 연결해 줍니다.
이 파이프는 `AsyncPipe`에 정의된 파이프이며, `Observable`을 자동으로 구독하는 역할을 합니다. 컴포넌트에서 따로 구독할 필요는 없습니다.


<!--
### Edit the `HeroSearchComponent` class
-->
### `HeroSearchComponent` 클래스 수정하기

<!--
Replace the `HeroSearchComponent` class and metadata as follows.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts"></code-example>

Notice the declaration of `heroes$` as an `Observable`:

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="heroes-stream"></code-example>

Set this in [`ngOnInit()`](#search-pipe).
Before you do, focus on the definition of `searchTerms`.
-->
Angular CLI가 생성한 `HeroSearchComponent` 클래스와 메타데이터의 내용을 다음과 같이 수정합니다.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts"></code-example>

`heroes$` 프로퍼티는 `Observable` 타입으로 선언하는 것을 잊지 마세요.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="heroes-stream"></code-example>

이 옵저버블 구독은 [`ngOnInit()`](#search-pipe)에서 시작됩니다.
지금은 `searchTerms`을 선언하는 방법에 대해 먼저 알아봅시다.


<!--
### The `searchTerms` RxJS subject
-->
### `searchTerms` RxJS subject

<!--
The `searchTerms` property is an RxJS `Subject`.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="searchTerms"></code-example>

A `Subject` is both a source of observable values and an `Observable` itself.
You can subscribe to a `Subject` as you would any `Observable`.

You can also push values into that `Observable` by calling its `next(value)` method as the `search()` method does.

The event binding to the text box's `input` event calls the `search()` method.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html" region="input"></code-example>

Every time the user types in the text box, the binding calls `search()` with the text box value as a *search term*.
The `searchTerms` becomes an `Observable` emitting a steady stream of search terms.
-->
`searchTerms` 프로퍼티는 RxJS가 제공하는 `Subject` 객체로 선언합니다.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="searchTerms"></code-example>

`Subject`는 옵저버블의 원천 소스이며 `Observable` 그 자체이기도 합니다.
그래서 `Subject` 객체는 `Observable` 객체처럼 구독할 수도 있습니다.

그리고 `Observable`로 값을 보내기 위해 `next(value)` 메소드를 실행할 수도 있습니다.
`search()` 메소드에서 이 함수를 사용했습니다.

`<input>` 엘리먼트와 이벤트 바인딩된 `search()` 메소드가 이런 방식으로 동작합니다.

<code-example header="src/app/hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html" region="input"></code-example>

사용자가 텍스트박스에 키보드를 입력할 때마다 입력된 내용이 인자로 전달되면서 `search()` 메소드가 실행됩니다.
이 메소드에서 `searchTerms` 프로퍼티는 `Observable`로 동작하며, 사용자가 입력한 내용을 옵저버블 스트림으로 보냅니다.


<a id="search-pipe"></a>

<!--
### Chaining RxJS operators
-->
### RxJS 연산자 체이닝하기

<!--
Passing a new search term directly to the `searchHeroes()` after every user keystroke creates excessive HTTP requests, which taxes server resources and burns through data plans.

Instead, the `ngOnInit()` method pipes the `searchTerms` observable through a sequence of RxJS operators that reduce the number of calls to the `searchHeroes()`. Ultimately, this returns an observable of timely hero search results where each one is a `Hero[]`.

Here's a closer look at the code.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="search"></code-example>

Each operator works as follows:

*   `debounceTime(300)` waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string.
   Requests aren't likely to happen more frequently than 300&nbsp;ms.

*   `distinctUntilChanged()` ensures that a request is sent only if the filter text changed.

*   `switchMap()` calls the search service for each search term that makes it through `debounce()` and `distinctUntilChanged()`.
    It cancels and discards previous search observables, returning only the latest search service observable.

<div class="alert is-helpful">

With the [`switchMap` operator](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap), every qualifying key event can trigger an `HttpClient.get()` method call.
Even with a 300&nbsp;ms pause between requests, you could have many HTTP requests in flight, and they may not return in the order sent.

`switchMap()` preserves the original request order while returning only the observable from the most recent HTTP method call.
Results from prior calls are canceled and discarded.

<div class="alert is-helpful">

Canceling a previous `searchHeroes()` Observable doesn't actually cancel a pending HTTP request.
Unwanted results are discarded before they reach your application code.

</div>

</div>

Remember that the component *class* doesn't subscribe to the `heroes$` *observable*.
That's the job of the [`AsyncPipe`](#asyncpipe) in the template.
-->
사용자가 입력한 검색어가 `searchHeroes()`로 바로 넘어간다면 사용자의 키입력마다 HTTP 요청이 발생하기 때문에 수많은 HTTP 요청이 발생할 것입니다.
이렇게 되면 서버에 과도한 부하가 걸릴 수 있으며 모바일 장비의 네트워크 요금도 빠르게 올라갈 것입니다.

이 방법보다는 `ngOnInit()` 메소드에서 `searchTerms` 옵저버블로 데이터를 보낼 때 RxJS 연산자로 체이닝해서 `searchHeroes()`로 전달되는 것을 최적화하는 것이 더 좋습니다.

코드를 자세하게 봅시다.

<code-example header="src/app/hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts" region="search"></code-example>

각 연산자는 이렇게 동작합니다:

*   `debounceTime(300)`는 옵저버블로 전달된 문자열을 바로 보내지 않고 다음 이벤트가 올 떄까지 300 밀리초 기다립니다.
    사용자가 보내는 요청은 300&nbsp;ms에 하나로 제한됩니다.

*   `distinctUntilChanged()`는 사용자가 입력한 문자열의 내용이 변경되었을 때만 옵저버블 스트림을 전달합니다.

*   `switchMap()`는 옵저버블 스트림이 `debounce`와 `distinctUntilChanged`를 통과했을 때 서비스에 있는 검색 기능을 호출합니다.
    이 때 이전에 발생했던 옵저버블은 취소되며, `HeroService`가 생성한 옵저버블만 반환합니다.

<div class="alert is-helpful">

[`switchMap` 연산자](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap)를 사용하면 옵저버블 체이닝을 통과한 키이벤트마다 `HttpClient.get()` 메소드가 실행됩니다.
그런데 요청을 300&nbsp;ms 당 한 번으로 제한하더라도 동작중인 HTTP 요청은 여러개가 될 수 있으며, 응답이 돌아오는 순서도 보낸 순서와 다를 수 있습니다.

이 때 `switchMap()` 연산자를 활용하면 이전에 보낸 HTTP 요청을 취소하고 제일 마지막에 보낸 HTTP 요청만 남겨둘 수 있습니다.
이미 보낸 HTTP 요청에 대한 응답은 애플리케이션 코드에 도달하지 못하고 그냥 폐기됩니다.

<div class="alert is-helpful">

이전에 발생한 `searchHeroes()` Observable을 취소했다고 해서 이미 보낸 HTTP 요청을 취소하지는 않습니다.
필요없는 응답은 애플리케이션 코드에서 처리하세요.

</div>

</div>

컴포넌트 *클래스* 에서 `heroes$` *옵저버블* 을 구독하지 않는 것에 주의하세요.
[`AsyncPipe`](#asyncpipe)는 템플릿에서 옵저버블을 구독하기 위해 사용되었습니다.


<!--
#### Try it
-->
#### 동작 확인하기

<!--
Run the application again.
In the *Dashboard*, enter some text in the search box.
Enter characters that match any existing hero names, and look for something like this.

<div class="lightbox">

<img alt="Hero Search field with the letters 'm' and 'a' along with four search results that match the query displayed in a list beneath the search input" src="generated/images/guide/toh/toh-hero-search.gif">

</div>
-->
애플리케이션을 다시 실행해 보세요.
*대시보드* 화면에 있는 검색창에 무언가를 입력했을 때 이 입력값이 포함된 히어로의 이름이 있으면 다음과 같은 모습으로 화면에 표시될 것입니다.

<div class="lightbox">

<img alt="Hero Search field with the letters 'm' and 'a' along with four search results that match the query displayed in a list beneath the search input" src="generated/images/guide/toh/toh-hero-search.gif">

</div>


<!--
## Final code review
-->
## 최종코드 리뷰

<!--
Here are the code files discussed on this page. They're found in the `src/app/` directory.
-->
이 문서에서 다룬 코드들을 확인해 보세요.
이 파일들은 `src/app/` 디렉토리에 있습니다.

<a id="heroservice"></a>
<a id="inmemorydataservice"></a>

<a id="appmodule"></a>

### `HeroService`, `InMemoryDataService`, `AppModule`

<code-tabs>
    <code-pane header="hero.service.ts" path="toh-pt6/src/app/hero.service.ts"></code-pane>
    <code-pane header="in-memory-data.service.ts" path="toh-pt6/src/app/in-memory-data.service.ts"></code-pane>
    <code-pane header="app.module.ts" path="toh-pt6/src/app/app.module.ts"></code-pane>
</code-tabs>

<a id="heroescomponent"></a>

### `HeroesComponent`

<code-tabs>
    <code-pane header="heroes/heroes.component.html" path="toh-pt6/src/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="heroes/heroes.component.ts" path="toh-pt6/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="heroes/heroes.component.css" path="toh-pt6/src/app/heroes/heroes.component.css"></code-pane>
</code-tabs>

<a id="herodetailcomponent"></a>

### `HeroDetailComponent`

<code-tabs>
    <code-pane header="hero-detail/hero-detail.component.html" path="toh-pt6/src/app/hero-detail/hero-detail.component.html"></code-pane>
    <code-pane header="hero-detail/hero-detail.component.ts" path="toh-pt6/src/app/hero-detail/hero-detail.component.ts"></code-pane>
    <code-pane header="hero-detail/hero-detail.component.css" path="toh-pt6/src/app/hero-detail/hero-detail.component.css"></code-pane>
</code-tabs>

<a id="dashboardcomponent"></a>

### `DashboardComponent`

<code-tabs>
    <code-pane header="dashboard/dashboard.component.html" path="toh-pt6/src/app/dashboard/dashboard.component.html"></code-pane>
    <code-pane header="dashboard/dashboard.component.ts" path="toh-pt6/src/app/dashboard/dashboard.component.ts"></code-pane>
    <code-pane header="dashboard/dashboard.component.css" path="toh-pt6/src/app/dashboard/dashboard.component.css"></code-pane>
</code-tabs>

<a id="herosearchcomponent"></a>

### `HeroSearchComponent`

<code-tabs>
    <code-pane header="hero-search/hero-search.component.html" path="toh-pt6/src/app/hero-search/hero-search.component.html"></code-pane>
    <code-pane header="hero-search/hero-search.component.ts" path="toh-pt6/src/app/hero-search/hero-search.component.ts"></code-pane>
    <code-pane header="hero-search/hero-search.component.css" path="toh-pt6/src/app/hero-search/hero-search.component.css"></code-pane>
</code-tabs>


<!--
## Summary
-->
## 정리

<!--
You're at the end of your journey, and you've accomplished a lot.

*   You added the necessary dependencies to use HTTP in the application
*   You refactored `HeroService` to load heroes from a web API
*   You extended `HeroService` to support `post()`, `put()`, and `delete()` methods
*   You updated the components to allow adding, editing, and deleting of heroes
*   You configured an in-memory web API
*   You learned how to use observables

This concludes the "Tour of Heroes" tutorial.
You're ready to learn more about Angular development in the fundamentals section, starting with the [Architecture](guide/architecture "Architecture") guide.
-->
이번 튜토리얼을 진행하면서 다음과 같은 내용에 대해 알아봤습니다.

*   HTTP 요청을 보내는 방법에 대해 알아봤습니다. HTTP 요청은 꼭 필요한 경우에만 보내는 것이 좋습니다.
*   `HeroService`가 웹 API를 사용해서 히어로 데이터를 가져오도록 리팩토링했습니다.
*   `HttpClient`가 제공하는 `post()`, `put()`, `delete()` 메소드를 사용해서 `HeroService`를 확장했습니다.
*   히어로를 추가하고, 수정하고, 제거할 수 있도록 컴포넌트를 수정했습니다.
*   인-메모리 웹 API를 설정하는 방법에 대해 알아봤습니다.
*   옵저버블을 사용하는 방법에 대해 알아봤습니다.

"히어로들의 여행" 튜토리얼에서 다루는 내용은 여기까지입니다.
이어지는 "기초 지식" 문서에서는 Angular를 개발할 때 필요한 내용을 자세하게 설명합니다.
[아키텍처](guide/architecture "Architecture") 내용부터 확인해 보세요.


@reviewed 2022-02-28
