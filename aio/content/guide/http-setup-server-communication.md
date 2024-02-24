<!--
# HTTP: Setup for server communication
-->
# HTTP: 서버와 통신하기 위한 환경설정

<!--
Before you can use `HttpClient`, you must add it to the application's [root dependency injector](guide/dependency-injection). 

Most apps do so in the `providers` array of `bootstrapApplication()` in `main.ts`.

<code-example header="main.ts (excerpt)" path="http/src/main.ts" region="sketch"></code-example>

You can then inject the `HttpClient` service as a dependency of an application class, as shown in the following `ConfigService` example.

<code-example header="app/config/config.service.ts (excerpt)" path="http/src/app/config/config.service.ts" region="proto"></code-example>

<div class="alert is-helpful">

You can run the <live-example name="http"></live-example> that accompanies this guide.

The sample app does not require a data server.
It relies on the [Angular *in-memory-web-api*](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api), which replaces the *HttpClient* module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

Look at the `bootstrapApplication()` method in `main.ts` to see how it is configured.

</div>
-->
`HttpClient`를 활용하려면 이 기능을 [최상위 의존성 인젝터](guide/dependency-injection)에 등록해야 합니다.

대부분의 경우는 `main.ts` 파일의 `bootstrapApplication()` 함수를 실행할 때 `providers` 배열에 등록하면 됩니다.

<code-example header="main.ts (일부)" path="http/src/main.ts" region="sketch"></code-example>

이렇게 작성하고 나면 `HttpClient` 서비스가 필요한 곳의 클래스 생성자에 이렇게 의존성 객체로 주입하면 됩니다.

<code-example header="app/config/config.service.ts (일부)" path="http/src/app/config/config.service.ts" region="proto"></code-example>

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example name="http"></live-example>에서 직접 실행하거나 다운받아 실행할 수 있습니다.

예제 앱은 실제 데이터 서버를 활용하지 않습니다.
예제 앱은 *HttpClient* 모듈이 제공하는 `HttpBackend`를 사용해서 [Angular *인-메모리-웹-api*](https://github.com/angular/angular/tree/main/packages/misc/angular-in-memory-web-api)로 구현했습니다.
REST로 동작하는 백엔드는 이렇게 시뮬레이션할 수 있습니다.

구성된 내용을 확인하려면 `main.ts` 파일의 `bootstrapApplication()` 메서드를 참고하세요.

</div>

@reviewed 2023-08-16
