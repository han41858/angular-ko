<!--
# Understanding communication with backend services using HTTP
-->

<a id="understanding-communication-with-backend-services-using-http"></a>

# HTTP로 백엔드 서비스와 통신하기

<!--
Most front-end applications need to communicate with a server over the HTTP protocol to download or upload data and access other back-end services. Angular provides a client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.
-->

대부분의 프론트엔드 애플리케이션은 데이터를 내려받거나 업로드하고 다른 백엔드 서비스를 사용하기 위해 HTTP 프로토콜로 서버와 통신해야 합니다.
Angular는 Angular 애플리케이션에서 사용할 수 있는 클라이언트 HTTP API로 `@angular/common/http`의 `HttpClient` 서비스 클래스를 제공합니다.

<!--
## HTTP client service features
-->

<a id="http-client-service-features"></a>

## HTTP 클라이언트 서비스의 기능

<!--
The HTTP client service offers the following major features:

- The ability to request [typed response values](guide/http/making-requests#fetching-json-data)
- Streamlined [error handling](guide/http/making-requests#handling-request-failure)
- Request and response [interception](guide/http/interceptors)
- Robust [testing utilities](guide/http/testing)
-->

HTTP 클라이언트 서비스는 다음 주요 기능을 제공합니다:

- [타입이 지정된 응답 값](guide/http/making-requests#fetching-json-data) 요청
- 간편한 [오류 처리](guide/http/making-requests#handling-request-failure)
- 요청과 응답 [가로채기](guide/http/interceptors)
- 강력한 [테스트 유틸리티](guide/http/testing)

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/http/setup" title="Setting up HttpClient"/>
  <docs-pill href="guide/http/making-requests" title="Making HTTP requests"/>
</docs-pill-row>
-->

<docs-pill-row>
  <docs-pill href="guide/http/setup" title="HttpClient 설정하기"/>
  <docs-pill href="guide/http/making-requests" title="HTTP 요청 보내기"/>
</docs-pill-row>
