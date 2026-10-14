<!--
# Service worker devops
-->

<a id="service-worker-devops"></a>

# 서비스 워커 운영

<!--
This page is a reference for deploying and supporting production applications that use the Angular service worker.
It explains how the Angular service worker fits into the larger production environment, the service worker's behavior under various conditions, and available resources and fail-safes.
-->

이 문서는 Angular 서비스 워커를 사용하는 프로덕션 애플리케이션을 배포하고 지원하기 위한 참고 자료입니다.
Angular 서비스 워커가 전체 프로덕션 환경에서 어떤 역할을 하는지, 다양한 조건에서 어떻게 동작하는지, 사용할 수 있는 자료와 안전장치는 무엇인지 설명합니다.

<!--
## Service worker and caching of application resources
-->

<a id="service-worker-and-caching-of-application-resources"></a>

## 서비스 워커와 애플리케이션 리소스 캐싱

<!--
Imagine the Angular service worker as a forward cache or a Content Delivery Network (CDN) edge that is installed in the end user's web browser.
The service worker responds to requests made by the Angular application for resources or data from a local cache, without needing to wait for the network.
Like any cache, it has rules for how content is expired and updated.
-->

Angular 서비스 워커를 최종 사용자의 웹 브라우저에 설치된 전방 캐시 또는 콘텐츠 전송 네트워크(CDN)의 엣지라고 생각해 보세요.
서비스 워커는 네트워크를 기다릴 필요 없이 로컬 캐시에서 Angular 애플리케이션의 리소스 요청이나 데이터 요청에 응답합니다.
다른 캐시와 마찬가지로 콘텐츠를 만료시키고 갱신하는 규칙이 있습니다.

<!--
### Application versions
-->

<a id="application-versions"></a>

### 애플리케이션 버전

<!--
In the context of an Angular service worker, a "version" is a collection of resources that represent a specific build of the Angular application.
Whenever a new build of the application is deployed, the service worker treats that build as a new version of the application.
This is true even if only a single file is updated.
At any given time, the service worker might have multiple versions of the application in its cache and it might be serving them simultaneously.
For more information, see the [Application tabs](#application-tabs) section.

To preserve application integrity, the Angular service worker groups all files into a version together.
The files grouped into a version usually include HTML, JS, and CSS files.
Grouping of these files is essential for integrity because HTML, JS, and CSS files frequently refer to each other and depend on specific content.
For example, an `index.html` file might have a `<script>` tag that references `bundle.js` and it might attempt to call a function `startApp()` from within that script.
Any time this version of `index.html` is served, the corresponding `bundle.js` must be served with it.
For example, assume that the `startApp()` function is renamed to `runApp()` in both files.
In this scenario, it is not valid to serve the old `index.html`, which calls `startApp()`, along with the new bundle, which defines `runApp()`.

This file integrity is especially important when lazy loading.
A JS bundle might reference many lazy chunks, and the filenames of the lazy chunks are unique to the particular build of the application.
If a running application at version `X` attempts to load a lazy chunk, but the server has already updated to version `X + 1`, the lazy loading operation fails.

The version identifier of the application is determined by the contents of all resources, and it changes if any of them change.
In practice, the version is determined by the contents of the `ngsw.json` file, which includes hashes for all known content.
If any of the cached files change, the file's hash changes in `ngsw.json`. This change causes the Angular service worker to treat the active set of files as a new version.

HELPFUL: The build process creates the manifest file, `ngsw.json`, using information from `ngsw-config.json`.

With the versioning behavior of the Angular service worker, an application server can ensure that the Angular application always has a consistent set of files.
-->

Angular 서비스 워커에서 "버전"은 Angular 애플리케이션의 특정 빌드를 구성하는 리소스 집합입니다.
애플리케이션의 새 빌드를 배포할 때마다 서비스 워커는 해당 빌드를 새로운 애플리케이션 버전으로 취급합니다.
파일 하나만 갱신한 경우에도 마찬가지입니다.
서비스 워커는 어느 시점에든 캐시에 애플리케이션의 여러 버전을 보관하고 동시에 제공할 수 있습니다.
자세한 내용은 [애플리케이션 탭](#application-tabs) 섹션을 참고하세요.

애플리케이션의 무결성을 유지하기 위해 Angular 서비스 워커는 모든 파일을 하나의 버전으로 묶습니다.
일반적으로 HTML, JS, CSS 파일이 하나의 버전에 포함됩니다.
HTML, JS, CSS 파일은 서로를 참조하거나 특정 내용에 의존하는 경우가 많으므로 이렇게 묶는 것이 무결성을 유지하는 데 필수적입니다.
예를 들어 `index.html`에 `bundle.js`를 참조하는 `<script>` 태그가 있고, 해당 스크립트 안의 `startApp()` 함수를 호출할 수 있습니다.
이 버전의 `index.html`을 제공할 때는 언제나 그에 맞는 `bundle.js`를 함께 제공해야 합니다.
두 파일 모두에서 `startApp()` 함수 이름을 `runApp()`으로 바꾸었다고 가정해 봅시다.
이 경우 `startApp()`을 호출하는 이전 `index.html`과 `runApp()`을 정의한 새 번들을 함께 제공하면 정상적으로 동작하지 않습니다.

이런 파일 무결성은 지연 로딩에서 특히 중요합니다.
JS 번들은 여러 지연 로딩 청크를 참조할 수 있으며, 청크 파일 이름은 애플리케이션의 특정 빌드마다 고유합니다.
`X` 버전으로 실행 중인 애플리케이션이 지연 로딩 청크를 가져오려고 할 때 서버가 이미 `X + 1` 버전으로 업데이트되었다면 지연 로딩에 실패합니다.

애플리케이션의 버전 식별자는 모든 리소스의 내용으로 결정되며, 하나라도 내용이 바뀌면 식별자가 달라집니다.
실제로는 알려진 모든 콘텐츠의 해시가 포함된 `ngsw.json` 파일의 내용으로 버전을 결정합니다.
캐시된 파일 중 하나라도 변경되면 `ngsw.json`에 있는 해당 파일의 해시가 달라집니다.
Angular 서비스 워커는 이 변경으로 인해 현재 파일 집합을 새 버전으로 취급합니다.

도움말: 빌드 과정은 `ngsw-config.json`의 정보를 사용해서 매니페스트 파일 `ngsw.json`을 생성합니다.

Angular 서비스 워커의 버전 관리 동작 덕분에 애플리케이션 서버는 Angular 애플리케이션에 항상 일관된 파일 집합을 제공할 수 있습니다.

<!--
#### Update checks
-->

<a id="update-checks"></a>

#### 업데이트 확인

<!--
Every time the user opens or refreshes the application, the Angular service worker checks for updates to the application by looking for updates to the `ngsw.json` manifest.
If an update is found, it is downloaded and cached automatically, and is served the next time the application is loaded.
-->

사용자가 애플리케이션을 열거나 새로고침할 때마다 Angular 서비스 워커는 `ngsw.json` 매니페스트의 변경 여부를 확인해서 애플리케이션 업데이트를 확인합니다.
업데이트가 있으면 자동으로 다운로드해서 캐시에 저장하고, 다음에 애플리케이션을 로딩할 때 제공합니다.

<!--
### Resource integrity
-->

<a id="resource-integrity"></a>

### 리소스 무결성

<!--
One of the potential side effects of long caching is inadvertently caching a resource that's not valid.
In a normal HTTP cache, a hard refresh or the cache expiring limits the negative effects of caching a file that's not valid.
A service worker ignores such constraints and effectively long-caches the entire application.
It's important that the service worker gets the correct content, so it keeps hashes of the resources to maintain their integrity.
-->

장기간 캐싱할 때 발생할 수 있는 문제 중 하나는 유효하지 않은 리소스를 의도치 않게 캐시에 저장하는 것입니다.
일반적인 HTTP 캐시는 강력 새로고침이나 캐시 만료를 통해 잘못된 파일 캐싱의 영향을 제한합니다.
서비스 워커는 이런 제약에 따르지 않고 사실상 애플리케이션 전체를 장기간 캐싱합니다.
올바른 콘텐츠를 가져오는 것이 중요하므로 서비스 워커는 리소스의 해시를 보관해서 무결성을 유지합니다.

<!--
#### Hashed content
-->

<a id="hashed-content"></a>

#### 해시가 있는 콘텐츠

<!--
To ensure resource integrity, the Angular service worker validates the hashes of all resources for which it has a hash.
For an application created with the [Angular CLI](tools/cli), this is everything in the `dist` directory covered by the user's `src/ngsw-config.json` configuration.

If a particular file fails validation, the Angular service worker attempts to re-fetch the content using a "cache-busting" URL parameter to prevent browser or intermediate caching.
If that content also fails validation, the service worker considers the entire version of the application to not be valid and stops serving the application.
If necessary, the service worker enters a safe mode where requests fall back on the network. The service worker doesn't use its cache if there's a high risk of serving content that is broken, outdated, or not valid.

Hash mismatches can occur for a variety of reasons:

- Caching layers between the origin server and the end user could serve stale content
- A non-atomic deployment could result in the Angular service worker having visibility of partially updated content
- Errors during the build process could result in updated resources without `ngsw.json` being updated.
  The reverse could also happen resulting in an updated `ngsw.json` without updated resources.
-->

리소스 무결성을 보장하기 위해 Angular 서비스 워커는 해시를 보유한 모든 리소스의 해시를 검증합니다.
[Angular CLI](tools/cli)로 생성한 애플리케이션에서는 사용자의 `src/ngsw-config.json` 설정에 포함된 `dist` 디렉터리의 모든 리소스가 해당합니다.

특정 파일의 검증에 실패하면 Angular 서비스 워커는 브라우저나 중간 캐시가 사용되지 않도록 "캐시 무효화(cache-busting)" URL 파라미터를 사용해서 콘텐츠를 다시 가져옵니다.
다시 가져온 콘텐츠도 검증에 실패하면 서비스 워커는 애플리케이션의 해당 버전 전체가 유효하지 않다고 판단하고 제공을 중단합니다.
필요하면 안전 모드로 전환해서 요청을 네트워크로 처리합니다.
손상되거나 오래되었거나 유효하지 않은 콘텐츠를 제공할 위험이 높으면 서비스 워커는 캐시를 사용하지 않습니다.

해시 불일치는 여러 이유로 발생할 수 있습니다:

- 원본 서버와 최종 사용자 사이의 캐싱 계층이 오래된 콘텐츠를 제공하는 경우
- 배포가 원자적으로 이루어지지 않아 Angular 서비스 워커가 일부만 갱신된 콘텐츠를 읽는 경우
- 빌드 과정에서 에러가 발생해서 리소스는 갱신되었지만 `ngsw.json`은 갱신되지 않은 경우
  반대로 `ngsw.json`만 갱신되고 리소스는 갱신되지 않을 수도 있습니다.

<!--
#### Unhashed content
-->

<a id="unhashed-content"></a>

#### 해시가 없는 콘텐츠

<!--
The only resources that have hashes in the `ngsw.json` manifest are resources that were present in the `dist` directory at the time the manifest was built.
Other resources, especially those loaded from CDNs, have content that is unknown at build time or are updated more frequently than the application is deployed.

If the Angular service worker does not have a hash to verify a resource is valid, it still caches its contents. At the same time, it honors the HTTP caching headers by using a policy of _stale while revalidate_.
The Angular service worker continues to serve a resource even after its HTTP caching headers indicate
that it is no longer valid. At the same time, it attempts to refresh the expired resource in the background.
This way, broken unhashed resources do not remain in the cache beyond their configured lifetimes.
-->

`ngsw.json` 매니페스트에 해시가 포함되는 리소스는 매니페스트를 생성할 때 `dist` 디렉터리에 있던 리소스뿐입니다.
그 밖의 리소스, 특히 CDN에서 로딩하는 리소스는 빌드 시점에 내용을 알 수 없거나 애플리케이션 배포 주기보다 자주 갱신됩니다.

Angular 서비스 워커는 리소스의 유효성을 검증할 해시가 없어도 내용을 캐시에 저장합니다.
동시에 _stale while revalidate_ 정책을 사용해서 HTTP 캐싱 헤더를 따릅니다.
HTTP 캐싱 헤더상 더 이상 유효하지 않더라도 Angular 서비스 워커는 리소스를 계속 제공하면서, 백그라운드에서 만료된 리소스를 갱신하려고 시도합니다.
이 방식으로 해시가 없는 손상된 리소스가 설정한 수명을 넘어서 캐시에 남는 것을 방지합니다.

<!--
### Application tabs
-->

<a id="application-tabs"></a>

### 애플리케이션 탭

<!--
It can be problematic for an application if the version of resources it's receiving changes suddenly or without warning.
See the [Application versions](#application-versions) section for a description of such issues.

The Angular service worker provides a guarantee: a running application continues to run the same version of the application.
If another instance of the application is opened in a new web browser tab, then the most current version of the application is served.
As a result, that new tab can be running a different version of the application than the original tab.

IMPORTANT: This guarantee is **stronger** than that provided by the normal web deployment model. Without a service worker, there is no guarantee that lazily loaded code is from the same version as the application's initial code.

The Angular service worker might change the version of a running application under error conditions such as:

- The current version becomes non-valid due to a failed hash.
- An unrelated error causes the service worker to enter safe mode and deactivates it temporarily.

The Angular service worker cleans up application versions when no tab is using them.

Other reasons the Angular service worker might change the version of a running application are normal events:

- The page is reloaded/refreshed.
- The page requests an update be immediately activated using the `SwUpdate` service.
-->

애플리케이션에 전달되는 리소스의 버전이 갑자기 또는 예고 없이 바뀌면 문제가 생길 수 있습니다.
이런 문제에 대한 설명은 [애플리케이션 버전](#application-versions) 섹션을 참고하세요.

Angular 서비스 워커는 실행 중인 애플리케이션이 계속 같은 버전으로 실행되도록 보장합니다.
새 브라우저 탭에서 다른 애플리케이션 인스턴스를 열면 가장 최신 버전을 제공합니다.
따라서 새 탭은 기존 탭과 다른 버전으로 실행될 수 있습니다.

중요: 이는 일반적인 웹 배포 모델보다 **강한** 보장입니다.
서비스 워커가 없으면 지연 로딩되는 코드가 애플리케이션의 초기 코드와 같은 버전이라는 보장이 없습니다.

다음과 같은 오류 상황에서는 Angular 서비스 워커가 실행 중인 애플리케이션 버전을 변경할 수 있습니다:

- 해시 검증에 실패해서 현재 버전이 유효하지 않게 된 경우
- 다른 에러로 인해 서비스 워커가 안전 모드에 들어가 일시적으로 비활성화된 경우

Angular 서비스 워커는 어떤 탭에서도 사용하지 않는 애플리케이션 버전을 정리합니다.

정상적인 동작 중에도 다음 경우에는 실행 중인 애플리케이션 버전이 변경될 수 있습니다:

- 페이지를 다시 로딩하거나 새로고침한 경우
- 페이지에서 `SwUpdate` 서비스로 업데이트를 즉시 활성화하도록 요청한 경우

<!--
### Service worker updates
-->

<a id="service-worker-updates"></a>

### 서비스 워커 업데이트

<!--
The Angular service worker is a small script that runs in web browsers.
From time to time, the service worker is updated with bug fixes and feature improvements.

The Angular service worker is downloaded when the application is first opened and when the application is accessed after a period of inactivity.
If the service worker changes, it's updated in the background.

Most updates to the Angular service worker are transparent to the application. The old caches are still valid and content is still served normally.
Occasionally, a bug fix or feature in the Angular service worker might require the invalidation of old caches.
In this case, the service worker transparently refreshes the application from the network.
-->

Angular 서비스 워커는 웹 브라우저에서 실행되는 작은 스크립트입니다.
버그 수정과 기능 개선을 위해 주기적으로 업데이트됩니다.

Angular 서비스 워커는 애플리케이션을 처음 열 때와 한동안 사용하지 않다가 다시 접근할 때 다운로드됩니다.
서비스 워커가 변경되었다면 백그라운드에서 업데이트됩니다.

대부분의 Angular 서비스 워커 업데이트는 애플리케이션에 영향을 주지 않습니다.
기존 캐시는 여전히 유효하며 콘텐츠도 정상적으로 제공됩니다.
일부 버그 수정이나 기능 변경은 기존 캐시의 무효화를 요구할 수 있습니다.
이때 서비스 워커는 별도의 개입 없이 네트워크에서 애플리케이션을 새로 가져옵니다.

<!--
#### Updating the service worker when only its response headers change

Browsers only install a new service worker when the service worker script is byte-different from the installed one.
Because `ngsw-worker.js` is usually identical across builds, changing only the response headers that the server sends with it, such as a `Content-Security-Policy`, does not update the installed service worker.
The service worker keeps running with the headers it was installed with.

To make browsers install the service worker again, register it with a versioned script URL, and change the version whenever those headers change:

```ts
provideServiceWorker('ngsw-worker.js?v=2', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000',
});
```

Registering a different script URL makes the browser fetch and install the service worker again, even if its content is unchanged.
The Angular service worker resolves its caches and `ngsw.json` relative to its registration scope, not its script URL, so the query parameter doesn't affect cached content.
-->

<a id="updating-the-service-worker-when-only-its-response-headers-change"></a>

#### 응답 헤더만 변경했을 때 서비스 워커 업데이트하기

브라우저는 서비스 워커 스크립트의 바이트가 설치된 스크립트와 다를 때만 새 서비스 워커를 설치합니다.
`ngsw-worker.js`는 일반적으로 빌드가 달라져도 같으므로, 서버가 함께 보내는 `Content-Security-Policy` 등의 응답 헤더만 바꾸면 설치된 서비스 워커는 업데이트되지 않습니다.
서비스 워커는 설치 당시의 헤더를 계속 사용합니다.

브라우저가 서비스 워커를 다시 설치하게 하려면 버전이 포함된 스크립트 URL로 등록하고, 헤더를 변경할 때마다 버전도 변경하세요.

```ts
provideServiceWorker('ngsw-worker.js?v=2', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000',
});
```

다른 스크립트 URL을 등록하면 내용이 같더라도 브라우저가 서비스 워커를 다시 가져와 설치합니다.
Angular 서비스 워커는 스크립트 URL이 아닌 등록 범위를 기준으로 캐시와 `ngsw.json`을 찾으므로, 쿼리 파라미터는 캐시된 콘텐츠에 영향을 주지 않습니다.

<!--
### Bypassing the service worker
-->

<a id="bypassing-the-service-worker"></a>

### 서비스 워커 우회하기

<!--
In some cases, you might want to bypass the service worker entirely and let the browser handle the request.
An example is when you rely on a feature that is currently not supported in service workers, such as [reporting progress on uploaded files](https://github.com/w3c/ServiceWorker/issues/1141).

To bypass the service worker, set `ngsw-bypass` as a request header, or as a query parameter.
The value of the header or query parameter is ignored and can be empty or omitted.
-->

서비스 워커를 완전히 우회하고 브라우저가 요청을 처리하도록 해야 할 때가 있습니다.
예를 들어 [업로드 파일의 진행 상황 표시](https://github.com/w3c/ServiceWorker/issues/1141)처럼 현재 서비스 워커에서 지원하지 않는 기능을 사용하는 경우입니다.

서비스 워커를 우회하려면 요청 헤더나 쿼리 파라미터에 `ngsw-bypass`를 설정하세요.
헤더나 쿼리 파라미터의 값은 무시하므로 비워두거나 생략해도 됩니다.

<!--
### Service worker requests when the server can't be reached
-->

<a id="service-worker-requests-when-the-server-cant-be-reached"></a>

### 서버에 연결할 수 없을 때의 서비스 워커 요청

<!--
The service worker processes all requests unless the [service worker is explicitly bypassed](#bypassing-the-service-worker).
The service worker either returns a cached response or sends the request to the server, depending on the state and configuration of the cache.
The service worker only caches responses to non-mutating requests, such as `GET` and `HEAD`.

If the service worker receives an error from the server or it doesn't receive a response, it returns an error status that indicates the result of the call.
For example, if the service worker doesn't receive a response, it creates a [504 Gateway Timeout](https://developer.mozilla.org/docs/Web/HTTP/Status/504) status to return. The `504` status in this example could be returned because the server is offline or the client is disconnected.
-->

[명시적으로 서비스 워커를 우회](#bypassing-the-service-worker)하지 않는 한 모든 요청은 서비스 워커가 처리합니다.
캐시의 상태와 설정에 따라 캐시된 응답을 반환하거나 서버로 요청을 보냅니다.
서비스 워커는 `GET`, `HEAD`처럼 데이터를 변경하지 않는 요청의 응답만 캐시에 저장합니다.

서비스 워커가 서버에서 에러를 받거나 응답을 받지 못하면 호출 결과를 나타내는 에러 상태를 반환합니다.
예를 들어 응답을 받지 못하면 [504 Gateway Timeout](https://developer.mozilla.org/docs/Web/HTTP/Status/504) 상태를 생성해서 반환합니다.
이 예제의 `504`는 서버가 오프라인이거나 클라이언트의 연결이 끊겨서 반환될 수 있습니다.

<!--
## Debugging the Angular service worker
-->

<a id="debugging-the-angular-service-worker"></a>

## Angular 서비스 워커 디버깅

<!--
Occasionally, it might be necessary to examine the Angular service worker in a running state to investigate issues or whether it's operating as designed.
Browsers provide built-in tools for debugging service workers and the Angular service worker itself includes useful debugging features.
-->

문제의 원인을 조사하거나 설계한 대로 동작하는지 확인하기 위해 실행 중인 Angular 서비스 워커를 살펴봐야 할 수 있습니다.
브라우저는 서비스 워커 디버깅 도구를 기본으로 제공하며, Angular 서비스 워커 자체에도 유용한 디버깅 기능이 있습니다.

<!--
### Locating and analyzing debugging information
-->

<a id="locating-and-analyzing-debugging-information"></a>

### 디버깅 정보 찾고 분석하기

<!--
The Angular service worker exposes debugging information under the `ngsw/` virtual directory.
Currently, the single exposed URL is `ngsw/state`.
Here is an example of this debug page's contents:

```shell {hideCopy}

NGSW Debug Info:

Driver version: 13.3.7
Driver state: NORMAL ((nominal))
Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c
Last update check: never

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

Debug log:

```
-->

Angular 서비스 워커는 `ngsw/` 가상 디렉터리 아래에 디버깅 정보를 제공합니다.
현재 제공하는 URL은 `ngsw/state` 하나입니다.
다음은 이 디버그 페이지의 내용 예제입니다:

```shell {hideCopy}

NGSW Debug Info:

Driver version: 13.3.7
Driver state: NORMAL ((nominal))
Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c
Last update check: never

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

Debug log:

```

<!--
#### Driver state
-->

<a id="driver-state"></a>

#### 드라이버 상태

<!--
The first line indicates the driver state:

```shell {hideCopy}

Driver state: NORMAL ((nominal))

```

`NORMAL` indicates that the service worker is operating normally and is not in a degraded state.

There are two possible degraded states:

| Degraded states         | Details                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EXISTING_CLIENTS_ONLY` | The service worker does not have a clean copy of the latest known version of the application. Older cached versions are safe to use, so existing tabs continue to run from cache, but new loads of the application will be served from the network. The service worker will try to recover from this state when a new version of the application is detected and installed. This happens when a new `ngsw.json` is available. |
| `SAFE_MODE`             | The service worker cannot guarantee the safety of using cached data. Either an unexpected error occurred or all cached versions are invalid. All traffic will be served from the network, running as little service worker code as possible.                                                                                                                                                                                  |

In both cases, the parenthetical annotation provides the
error that caused the service worker to enter the degraded state.

Both states are temporary; they are saved only for the lifetime of the [ServiceWorker instance](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope).
The browser sometimes terminates an idle service worker to conserve memory and processor power, and creates a new service worker instance in response to network events.
The new instance starts in the `NORMAL` mode, regardless of the state of the previous instance.
-->

첫 줄은 드라이버 상태를 나타냅니다:

```shell {hideCopy}

Driver state: NORMAL ((nominal))

```

`NORMAL`은 서비스 워커가 제한된 상태가 아니라 정상적으로 동작하고 있음을 의미합니다.

다음 두 가지 제한된 상태가 있습니다:

| 제한된 상태             | 설명                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EXISTING_CLIENTS_ONLY` | 서비스 워커가 알고 있는 최신 애플리케이션 버전의 정상적인 복사본이 없습니다. 이전에 캐시에 저장한 버전은 안전하므로 기존 탭은 계속 캐시에서 실행하지만, 새로 로딩하는 애플리케이션은 네트워크에서 제공합니다. 서비스 워커는 새 애플리케이션 버전을 감지하고 설치하면 이 상태에서 복구하려고 시도합니다. 이는 새로운 `ngsw.json`을 사용할 수 있을 때 일어납니다. |
| `SAFE_MODE`             | 서비스 워커가 캐시 데이터의 안전성을 보장할 수 없습니다. 예기치 않은 에러가 발생했거나 캐시된 모든 버전이 유효하지 않습니다. 서비스 워커 코드를 최대한 적게 실행하고 모든 트래픽을 네트워크로 처리합니다.                                                                                                                                                       |

두 경우 모두 괄호 안의 설명에 서비스 워커가 제한된 상태로 전환한 원인이 되는 에러가 표시됩니다.

두 상태는 일시적이며 [ServiceWorker 인스턴스](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope)의 생존 기간에만 유지됩니다.
브라우저는 메모리와 프로세서 자원을 절약하기 위해 유휴 서비스 워커를 종료했다가, 네트워크 이벤트가 발생하면 새 인스턴스를 생성하기도 합니다.
새 인스턴스는 이전 인스턴스의 상태와 관계없이 `NORMAL` 모드로 시작합니다.

<!--
#### Latest manifest hash
-->

<a id="latest-manifest-hash"></a>

#### 최신 매니페스트 해시

<!--
```shell {hideCopy}

Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c

```

This is the SHA1 hash of the most up-to-date version of the application that the service worker knows about.
-->

```shell {hideCopy}

Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c

```

서비스 워커가 알고 있는 가장 최신 애플리케이션 버전의 SHA1 해시입니다.

<!--
#### Last update check
-->

<a id="last-update-check"></a>

#### 마지막 업데이트 확인

<!--
```shell {hideCopy}

Last update check: never

```

This indicates the last time the service worker checked for a new version, or update, of the application.
`never` indicates that the service worker has never checked for an update.

In this example debug file, the update check is currently scheduled, as explained the next section.
-->

```shell {hideCopy}

Last update check: never

```

서비스 워커가 애플리케이션의 새 버전이나 업데이트를 마지막으로 확인한 시점을 나타냅니다.
`never`는 한 번도 업데이트를 확인하지 않았다는 뜻입니다.

이 디버그 파일 예제에서는 다음 섹션에서 설명하는 것처럼 업데이트 확인이 예약되어 있습니다.

<!--
#### Version
-->

<a id="version"></a>

#### 버전

<!--
```shell {hideCopy}

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

```

In this example, the service worker has one version of the application cached and being used to serve two different tabs.

HELPFUL: This version hash is the "latest manifest hash" listed above. Both clients are on the latest version. Each client is listed by its ID from the `Clients` API in the browser.
-->

```shell {hideCopy}

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

```

이 예제에서는 서비스 워커가 애플리케이션 버전 하나를 캐시에 저장하고 서로 다른 두 탭에 제공하고 있습니다.

도움말: 이 버전 해시는 앞에서 본 "최신 매니페스트 해시"와 같습니다.
두 클라이언트 모두 최신 버전을 사용하고 있습니다.
각 클라이언트는 브라우저의 `Clients` API가 제공하는 ID로 표시됩니다.

<!--
#### Idle task queue
-->

<a id="idle-task-queue"></a>

#### 유휴 작업 큐

<!--
```shell {hideCopy}

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

```

The Idle Task Queue is the queue of all pending tasks that happen in the background in the service worker.
If there are any tasks in the queue, they are listed with a description.
In this example, the service worker has one such task scheduled, a post-initialization operation involving an update check and cleanup of stale caches.

The last update tick/run counters give the time since specific events happened related to the idle queue.
The "Last update run" counter shows the last time idle tasks were actually executed.
"Last update tick" shows the time since the last event after which the queue might be processed.
-->

```shell {hideCopy}

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

```

유휴 작업 큐는 서비스 워커가 백그라운드에서 수행할 대기 작업의 큐입니다.
큐에 작업이 있으면 설명과 함께 표시됩니다.
이 예제에서는 업데이트 확인과 오래된 캐시 정리를 포함하는 초기화 후 작업 하나가 예약되어 있습니다.

마지막 업데이트 tick/run 카운터는 유휴 큐와 관련된 특정 이벤트 이후 경과한 시간을 나타냅니다.
"Last update run"은 유휴 작업이 마지막으로 실제 실행된 시점을 나타냅니다.
"Last update tick"은 큐 처리를 수행할 수 있게 하는 마지막 이벤트 이후 경과한 시간을 나타냅니다.

<!--
#### Debug log
-->

<a id="debug-log"></a>

#### 디버그 로그

<!--
```shell {hideCopy}

Debug log:

```

Errors that occur within the service worker are logged here.
-->

```shell {hideCopy}

Debug log:

```

서비스 워커 내부에서 발생한 에러가 여기에 기록됩니다.

<!--
### Developer tools
-->

<a id="developer-tools"></a>

### 개발자 도구

<!--
Browsers such as Chrome provide developer tools for interacting with service workers.
Such tools can be powerful when used properly, but there are a few things to keep in mind.

- When using developer tools, the service worker is kept running in the background and never restarts.
  This can cause behavior with Dev Tools open to differ from behavior a user might experience.

- If you look in the Cache Storage viewer, the cache is frequently out of date.
  Right-click the Cache Storage title and refresh the caches.

- Stopping and starting the service worker in the Service Worker pane checks for updates
-->

Chrome 같은 브라우저는 서비스 워커와 상호작용하는 개발자 도구를 제공합니다.
적절히 사용하면 강력한 도구이지만 몇 가지 주의할 점이 있습니다.

- 개발자 도구를 사용하는 동안 서비스 워커는 백그라운드에서 계속 실행되며 재시작하지 않습니다.
  따라서 개발자 도구를 열었을 때의 동작이 실제 사용자의 경험과 달라질 수 있습니다.

- Cache Storage 뷰어의 캐시는 최신 상태가 아닐 때가 많습니다.
  Cache Storage 제목을 마우스 오른쪽 버튼으로 클릭해서 캐시를 새로고침하세요.

- Service Worker 창에서 서비스 워커를 중지했다가 시작하면 업데이트를 확인합니다.

<!--
## Service worker safety
-->

<a id="service-worker-safety"></a>

## 서비스 워커 안전장치

<!--
Bugs or broken configurations could cause the Angular service worker to act in unexpected ways.
If this happens, the Angular service worker contains several failsafe mechanisms in case an administrator needs to deactivate the service worker quickly.
-->

버그나 잘못된 설정으로 인해 Angular 서비스 워커가 예상하지 못한 방식으로 동작할 수 있습니다.
이때 관리자가 서비스 워커를 신속히 비활성화할 수 있도록 Angular 서비스 워커는 여러 안전장치를 제공합니다.

<!--
### Fail-safe
-->

<a id="fail-safe"></a>

### 비상 비활성화

<!--
To deactivate the service worker, rename the `ngsw.json` file or delete it.
When the service worker's request for `ngsw.json` returns a `404`, then the service worker removes all its caches and de-registers itself, essentially self-destructing.
-->

서비스 워커를 비활성화하려면 `ngsw.json` 파일 이름을 바꾸거나 파일을 삭제하세요.
서비스 워커의 `ngsw.json` 요청에 `404`가 반환되면 서비스 워커는 모든 캐시를 제거하고 등록을 해제합니다.
사실상 스스로 제거되는 것입니다.

<!--
### Safety worker
-->

<a id="safety-worker"></a>

### 안전 워커

<!--
<!- vale Angular.Google_Acronyms = NO ->

A small script, `safety-worker.js`, is also included in the `@angular/service-worker` npm package.
When loaded, it un-registers itself from the browser and removes the service worker caches.
This script can be used as a last resort to get rid of unwanted service workers already installed on client pages.

<!- vale Angular.Google_Acronyms = YES ->

CRITICAL: You cannot register this worker directly, as old clients with cached state might not see a new `index.html` which installs the different worker script.

Instead, you must serve the contents of `safety-worker.js` at the URL of the Service Worker script you are trying to unregister. You must continue to do so until you are certain all users have successfully unregistered the old worker.
For most sites, this means that you should serve the safety worker at the old Service Worker URL forever.
This script can be used to deactivate `@angular/service-worker` and remove the corresponding caches. It also removes any other Service Workers which might have been served in the past on your site.
-->

<!-- vale Angular.Google_Acronyms = NO -->

`@angular/service-worker` npm 패키지에는 `safety-worker.js`라는 작은 스크립트도 포함되어 있습니다.
이 스크립트는 로딩되면 브라우저에서 자신의 등록을 해제하고 서비스 워커 캐시를 제거합니다.
클라이언트 페이지에 이미 설치된 원치 않는 서비스 워커를 제거하는 마지막 수단으로 사용할 수 있습니다.

<!-- vale Angular.Google_Acronyms = YES -->

주의: 이 워커를 직접 등록하면 안 됩니다.
상태가 캐시에 저장된 이전 클라이언트는 다른 워커 스크립트를 설치하는 새로운 `index.html`을 받지 못할 수 있기 때문입니다.

대신 등록을 해제하려는 Service Worker 스크립트의 URL에서 `safety-worker.js`의 내용을 제공해야 합니다.
모든 사용자가 기존 워커의 등록을 성공적으로 해제했다고 확신할 때까지 계속 제공해야 합니다.
대부분의 사이트에서는 기존 Service Worker URL에서 안전 워커를 영구적으로 제공해야 한다는 뜻입니다.
이 스크립트로 `@angular/service-worker`를 비활성화하고 관련 캐시를 제거할 수 있습니다.
사이트에서 과거에 제공했을 수 있는 다른 Service Worker도 제거합니다.

<!--
### Changing your application's location
-->

<a id="changing-your-applications-location"></a>

### 애플리케이션 위치 변경하기

<!--
IMPORTANT: Service workers don't work behind redirect.
You might have already encountered the error `The script resource is behind a redirect, which is disallowed`.

This can be a problem if you have to change your application's location.
If you set up a redirect from the old location, such as `example.com`, to the new location, `www.example.com` in this example, the worker stops working.
Also, the redirect won't even trigger for users who are loading the site entirely from Service Worker.
The old worker, which was registered at `example.com`, tries to update and sends a request to the old location `example.com`. This request is redirected to the new location `www.example.com` and creates the error: `The script resource is behind a redirect, which is disallowed`.

To remedy this, you might need to deactivate the old worker using one of the preceding techniques: [Fail-safe](#fail-safe) or [Safety Worker](#safety-worker).
-->

중요: 서비스 워커는 리다이렉트 뒤에서 동작하지 않습니다.
`The script resource is behind a redirect, which is disallowed`라는 에러를 이미 본 적이 있을 수도 있습니다.

애플리케이션의 위치를 변경해야 할 때 문제가 될 수 있습니다.
이전 위치인 `example.com`에서 새 위치인 `www.example.com`으로 리다이렉트를 설정하면 워커가 동작하지 않습니다.
사이트 전체를 Service Worker에서 로딩하는 사용자에게는 리다이렉트조차 실행되지 않습니다.
`example.com`에 등록된 기존 워커는 업데이트를 시도하면서 이전 위치인 `example.com`으로 요청을 보냅니다.
이 요청이 새 위치인 `www.example.com`으로 리다이렉트되면 `The script resource is behind a redirect, which is disallowed` 에러가 발생합니다.

해결하려면 앞에서 설명한 [비상 비활성화](#fail-safe) 또는 [안전 워커](#safety-worker)를 사용해서 기존 워커를 비활성화해야 할 수 있습니다.

<!--
## More on Angular service workers
-->

<a id="more-on-angular-service-workers"></a>

## Angular 서비스 워커 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/config" title="Configuration file"/>
  <docs-pill href="ecosystem/service-workers/communications" title="Communicating with the Service Worker"/>
</docs-pill-row>
-->

다음 내용도 함께 살펴보세요:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/config" title="설정 파일"/>
  <docs-pill href="ecosystem/service-workers/communications" title="서비스 워커와 통신하기"/>
</docs-pill-row>
