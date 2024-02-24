<!--
# Understanding communicating with backend services using HTTP
-->
# HTTP로 백엔드 서비스와 통신하기

<!--
Most front-end applications need to communicate with a server over the HTTP protocol, to download or upload data and access other back-end services. Angular provides a client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.
-->
프론트엔드 애플리케이션은 일반적으로 HTTP 프로토콜을 통해 서버와 통신하면서 데이터를 다운로드/업로드 하거나 다른 백엔드 서비스에 접근해야 합니다.
Angular는 이런 경우를 위해 Angular 애플리케이션용 HTTP API를 제공합니다.
Angular `HttpClient` 서비스 클래스는 `@angular/common/http` 패키지로 제공됩니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before working with the `HttpClientModule`, you should have a basic understanding of the following:

*   TypeScript programming
*   Usage of the HTTP protocol
*   Angular application-design fundamentals, as described in [Angular Concepts](guide/architecture)
*   Observable techniques and operators.
    See the [Observables guide](guide/observables).
-->
`HttpClientModule`을 사용하기 전에 이런 내용을 미리 알아두는 것이 좋습니다:

*   TypeScript 문법
*   HTTP 프로토콜 사용방법
*   [Angular 개요](guide/architecture)에서 설명하는 Angular 애플리케이션 설계 개념
*   옵저버블, 연산자 사용방법,
    자세한 내용은 [옵저버블 가이드](guide/observables) 서를 참고하세요.


<!--
## HTTP client service features
-->
## HTTP 클라이언트 서비스가 제공하는 기능

<!--
The HTTP client service offers the following major features.

*   The ability to request [typed response objects](guide/http-request-data-from-server)
*   Streamlined [error handling](guide/http-handle-request-errors)
*   [Testability](guide/http-test-requests) features
*   Request and response [interception](guide/http-intercept-requests-and-responses)
-->
HTTP 클라이언트 서비스는 이런 기능을 제공합니다.

*   요청을 보내고 받은 [응답에 타입을 지정](guide/http-request-data-from-server) 할 수 있습니다.
*   [에러를 스트림으로 처리](guide/http-handle-request-errors) 할 수 있습니다.
*   [테스트](guide/http-test-requests) 스펙용 API를 제공합니다.
*   서버로 보낸 요청과 응답을 [가로채서 옵저버블을 연결](guide/http-intercept-requests-and-responses) 할 수 있습니다.


<!--
## What's next
-->
## 다음 단계

<!--
* [Setup for server communication](guide/http-setup-server-communication)
-->
* [서버와 통신하기 위한 환경설정](guide/http-setup-server-communication)

@reviewed 2023-08-16
