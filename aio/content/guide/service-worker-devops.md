<!--
# Service worker in production
-->
# 운영환경에 서비스 워커 활용하기

<!--
This page is a reference for deploying and supporting production applications that use the Angular service worker.
It explains how the Angular service worker fits into the larger production environment, the service worker's behavior under various conditions, and available resources and fail-safes.
-->
이 문서는 Angular 서비스 워커를 운영환경에서 활용할 때 알아둬야 할 내용에 대해 소개합니다.
복잡한 운영환경에 서비스 워커를 어떻게 적용할 수 있는지, 서로 다른 환경에서 서비스 워커의 동작이 어떻게 달라져야 하는지, 어떤 리소스를 사용할 수 있으며, 서비스 워커 실행에 실패했을 때 어떻게 되는지 소개합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following:

*   [Service Worker Communication](guide/service-worker-communications)
-->
이 문서의 내용을 제대로 이해하려면 다음 내용을 미리 확인하는 것이 좋습니다.

*   [서비스 워커 통신](guide/service-worker-communications)


<!--
## Service worker and caching of application resources
-->
## 서비스 워커와 앱 리소스 캐싱

<!--
Imagine the Angular service worker as a forward cache or a Content Delivery Network (CDN) edge that is installed in the end user's web browser.
The service worker responds to requests made by the Angular application for resources or data from a local cache, without needing to wait for the network.
Like any cache, it has rules for how content is expired and updated.
-->
개념으로 보면, Angular 서비스 워커는 사용자의 웹 브라우저에 설치된 캐싱 서버나 CDN 엣지\(edge\)라고 이해할 수도 있습니다.
서비스 워커의 역할은 Angular 앱이 요청한 리소스를 로컬 캐시에 저장해두었다가, 다음에 똑같은 리소스가 요청되면 네트워크 사용 없이 직접 리소스를 반환하는 것이기 때문입니다.
그리고 일반적인 캐싱 서버와 마찬가지로, 서비스 워커에도 리소스의 만료 시점을 지정하는 룰이 존재합니다.


<a id="versions"></a>

<!--
### Application versions
-->
### 앱 버전

<!--
In the context of an Angular service worker, a "version" is a collection of resources that represent a specific build of the Angular application.
Whenever a new build of the application is deployed, the service worker treats that build as a new version of the application.
This is true even if only a single file is updated.
At any given time, the service worker might have multiple versions of the application in its cache and it might be serving them simultaneously.
For more information, see the [Application tabs](guide/service-worker-devops#tabs) section.

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

<div class="alert is-helpful">

The build process creates the manifest file, `ngsw.json`, using information from `ngsw-config.json`.

</div>

With the versioning behavior of the Angular service worker, an application server can ensure that the Angular application always has a consistent set of files.
-->
서비스 워커의 맥락에서 사용하는 "버전\(version\)"이라는 용어는 특정 시점에 빌드된 Angular 앱에 존재하는 리소스 집합을 의미합니다.
그래서 애플리케이션이 새롭게 빌드되어 배포되면 서비스 워커는 이것을 애플리케이션의 새로운 버전으로 간주합니다. 파일이 하나만 바뀌었더라도 마찬가지입니다.
서비스 워커는 캐시에 애플리케이션의 여러 버전을 동시에 보관하고 있을 수도 있습니다.
더 자세한 내용은 아래 [탭 단위로 실행되는 애플리케이션](guide/service-worker-devops#tabs) 섹션을 참고하세요.

애플리케이션을 안정적으로 실행하기 위해 Angular 서비스 워커는 특정 버전에 있는 모든 파일을 그룹으로 묶습니다.
이렇게 그룹으로 묶이는 파일은 보통 HTML, JS, CSS 파일들인데, 이 파일들은 특정 목적에 따라 서로 연관되기 때문에 같은 그룹으로 묶이는 것이 중요합니다.
예를 들어 `index.html` 파일이 `<script>` 태그로 `bundle.js` 파일을 참조하고, 이 스크립트 파일에 정의된 `startApp()` 함수를 실행한다고 합시다.
그러면 `index.html` 파일이 사용되는 시점에 `bundle.js` 파일이 반드시 존재해야 합니다.
그리고 `bundle.js` 파일에 정의된 `startApp()` 함수의 이름이 `runApp()`으로 변경되면, 이 내용이 `index.html` 파일에도 함께 반영되어야 합니다.
`bundle.js` 파일에는 `runApp()`으로 변경되었지만 `index.html` 파일에서 `startApp()`을 실행한다면 제대로 동작하지 않을 것입니다.

지연로딩되는 모듈이 있다면 이 과정이 조금 더 중요합니다.
애플리케이션은 JS 파일을 지연로딩해야 하는데 지연로딩되는 파일의 이름은 해당 파일이 빌드될 때마다 달라집니다.
그래서 현재 실행되고 있는 앱 버전이 `X`이고 이 앱에서 파일을 지연로딩하려고 하지만 서버가 제공하는 앱 버전이 `X + 1`이라면 클라이언트가 요청한 파일을 찾을 수 없기 때문에 지연로딩이 실패합니다.

애플리케이션의 버전을 나타내는 id는 해당 버전에 존재하는 모든 리소스를 바탕으로 결정되며 리소스 중 하나라도 변경되면 id도 변경됩니다.
좀 더 자세하게 이야기하면, 애플리케이션의 버전은 `ngsw.json` 파일에 존재하는 각 리소스의 해시값을 사용해서 결정됩니다.
그래서 캐싱된 파일이 변경되면 `ngsw.json` 파일에서 해당 파일의 해시값이 변경되기 때문에 서비스 워커가 다른 버전으로 인식합니다.

<div class="alert is-helpful">

`ngsw.json` 파일은 `ngsw-config.json` 설정에 의해 빌드 시점에 생성되는 매니페스트\(manifest\) 파일입니다.

</div>

결국 애플리케이션 버전이 서비스 워커로 관리되기 때문에 애플리케이션 서버는 애플리케이션 버전에 해당하는 리소스 파일 전체를 온전하게 제공해야 합니다.


<!--
#### Update checks
-->
#### 업데이트 확인

<!--
Every time the user opens or refreshes the application, the Angular service worker checks for updates to the application by looking for updates to the `ngsw.json` manifest.
If an update is found, it is downloaded and cached automatically, and is served the next time the application is loaded.
-->
서비스 워커는 사용자가 Angular 애플리케이션을 새로 실행하거나 브라우저를 새로고침할 때마다 `ngsw.json` 매니페스트에 있는 내용을 기준으로 애플리케이션이 최신버전인지 확인합니다.
이 때 서버에 존재하는 애플리케이션보다 버전이 낮으면 자동으로 최신 버전을 다운로드하고 캐싱하고, 다음 애플리케이션이 실행될 때 최신 버전을 적용합니다.


<!--
### Resource integrity
-->
### 리소스 정합성 유지

<!--
One of the potential side effects of long caching is inadvertently caching a resource that's not valid.
In a normal HTTP cache, a hard refresh or the cache expiring limits the negative effects of caching a file that's not valid.
A service worker ignores such constraints and effectively long-caches the entire application.
It's important that the service worker gets the correct content, so it keeps hashes of the resources to maintain their integrity.
-->
캐싱을 오랫동안 유지하면 유효하지 않은 리소스를 참조하는 상황이 발생할 수 있습니다.
그래서 HTTP 캐시는 일반적으로 잘못된 파일을 참조하는 것을 방지하기 위해 만료 기한을 두고 캐시를 강제로 비우기도 합니다.
물론 변경되지 않는 리소스라면 오랫동안 캐싱해도 상관없습니다.
서비스 워커가 올바른 리소스를 제공하기 위해서는 해시를 활용하는 것도 좋습니다.


<!--
#### Hashed content
-->
#### 해시 값이 존재하는 리소스

<!--
To ensure resource integrity, the Angular service worker validates the hashes of all resources for which it has a hash.
For an application created with the [Angular CLI](cli), this is everything in the `dist` directory covered by the user's `src/ngsw-config.json` configuration.

If a particular file fails validation, the Angular service worker attempts to re-fetch the content using a "cache-busting" URL parameter to prevent browser or intermediate caching.
If that content also fails validation, the service worker considers the entire version of the application to not be valid and stops serving the application.
If necessary, the service worker enters a safe mode where requests fall back on the network. The service worker doesn't use its cache if there's a high risk of serving content that is broken, outdated, or not valid.

Hash mismatches can occur for a variety of reasons:

*   Caching layers between the origin server and the end user could serve stale content
*   A non-atomic deployment could result in the Angular service worker having visibility of partially updated content
*   Errors during the build process could result in updated resources without `ngsw.json` being updated.
    The reverse could also happen resulting in an updated `ngsw.json` without updated resources.
-->
리소스가 올바르게 존재하는 것을 보장하기 위해 서비스 워커는 모든 리소스의 해시값을 검사합니다.
[Angular CLI](cli)를 사용해서 만든 앱이라면 `dist` 폴더에 존재하는 모든 파일에는 `src/ngsw-config.json` 설정에 따라 해시값이 할당되며, 이 해시값들이 모두 검사대상입니다.

해시값을 검사하던 중에 유효하지 않은 파일을 발견하면 서비스 워커가 캐시를 무시하고 해당 파일을 다운받으려고 시도합니다.
그리고 새로 받은 파일도 유효성검사를 통과하지 못하면 애플리케이션 전체가 유효하지 않은 것으로 판단하고 애플리케이션을 중단합니다.
하지만 이 상태에서 안전모드로 앱을 실행할 수 있는데, 안전모드에서는 HTTP 요청이 실패할 수 있으며, 캐시가 제대로 동작하지 않고, 이미 캐싱하고 있는 내용의 유효성도 보장할 수 없습니다.

해시값은 다음과 같은 이유로 틀어질 수 있습니다:

*   앱을 제공하는 서버와 클라이언트 리소스를 동기화하는 캐싱 레이어의 경우
*   애플리케이션이 한번에 배포되지 않고 부분적으로 배포된 경우
*   빌드과정에서 에러가 발생하면 `ngsw.json` 파일이 업데이트되지 않을 수 있습니다.
    아니면 `ngsw.json`만 업데이트되고 실제 리소스가 업데이트되지 않을 수 있습니다.


<!--
#### Unhashed content
-->
#### 해시값이 존재하지 않는 리소스

<!--
The only resources that have hashes in the `ngsw.json` manifest are resources that were present in the `dist` directory at the time the manifest was built.
Other resources, especially those loaded from CDNs, have content that is unknown at build time or are updated more frequently than the application is deployed.

If the Angular service worker does not have a hash to verify a resource is valid, it still caches its contents. At the same time, it honors the HTTP caching headers by using a policy of *stale while revalidate*.
The Angular service worker continues to serve a resource even after its HTTP caching headers indicate
that it is no longer valid. At the same time, it attempts to refresh the expired resource in the background.
This way, broken unhashed resources do not remain in the cache beyond their configured lifetimes.
-->
빌드하면서 `dist` 폴더에 생성되는 리소스들의 해시값은 모두 `ngsw.json` 파일에 저장됩니다.
하지만 CDN에서 로드하거나 빌드 시점에 함께 빌드되지 않는 리소스들은 해시값이 존재하지 않거나 애플리케이션이 배포된 후에도 변경될 수 있습니다.

서비스 워커는 해시값이 없는 리소스를 발견해도 이 파일을 그대로 제공하지만, 이 파일이 잠재적으로 유효하지 않은 것으로 판단하기 위해 HTTP 헤더를 설정합니다.
그래서 이 파일은 캐싱기한이 만료된 것으로 판단하고 백그라운드에서 이 파일을 새로 받아오려고 합니다.
해시값이 존재하지 않는 리소스는 새롭게 받아오기 전까지만 유지되며, 리소스를 새로 받아온 후에는 HTTP 캐싱 정책을 활용합니다.


<a id="tabs"></a>

<!--
### Application tabs
-->
### 탭 단위로 실행되는 애플리케이션

<!--
It can be problematic for an application if the version of resources it's receiving changes suddenly or without warning.
See the [Application versions](guide/service-worker-devops#versions) section for a description of such issues.

The Angular service worker provides a guarantee: a running application continues to run the same version of the application.
If another instance of the application is opened in a new web browser tab, then the most current version of the application is served.
As a result, that new tab can be running a different version of the application than the original tab.

<div class="alert is-important">

**IMPORTANT**: <br />
This guarantee is **stronger** than that provided by the normal web deployment model.
Without a service worker, there is no guarantee that lazily loaded code is from the same version as the application's initial code.

</div>

The Angular service worker might change the version of a running application under error conditions such as:

*   The current version becomes non-valid due to a failed hash
*   An unrelated error causes the service worker to enter safe mode and deactivates it temporarily

The Angular service worker cleans up application versions when no tab is using them.

Other reasons the Angular service worker might change the version of a running application are normal events:

*   The page is reloaded/refreshed
*   The page requests an update be immediately activated using the `SwUpdate` service
-->
애플리케이션을 사용하고 있는 도중에 아무런 알림없이 갑자기 앱 버전이 변경된다면 앱을 실행하고 있던 사용자가 굉장히 불편할 것입니다.
[애플리케이션 버전](guide/service-worker-devops#versions)에 대해서는 위에서 언급한 내용을 참고하세요.

Angular 서비스 워커는 완충장치를 제공합니다. 그래서 일단 실행하고 있던 앱은 사용자가 종료하기 전까지 계속 실행할 수 있습니다.
하지만 웹브라우저의 새로운 탭에 애플리케이션 인스턴스가 생성되면 이 탭에서는 최신버전으로 실행됩니다.
그래서 두 탭에 동작하는 앱은 서로 다른 버전이 될 수 있습니다.

<div class="alert is-important">

**중요**: <br />
이 방식은 일반적인 웹 배포 모델보다 더 **안전** 합니다.
서비스 워커가 이런 완충장치를 제공하기 때문에 먼저 실행되고 있던 앱에서 파일을 지연로딩하더라도 해당 버전에 맞는 리소스를 올바르게 로드할 수 있습니다.

</div>

하지만 다음과 같은 에러가 발생하며 실행하던 앱을 서비스 워커가 강제로 종료하기도 합니다:

*   해시값 검사에 실패해서 애플리케이션의 현재 버전이 유효하지 않은 경우
*   에러가 발생해서 안전모드로도 실행하지 못한 경우. 이 경우에는 서비스 워커가 잠시 비활성화됩니다.

이런 경우에는 서비스 워커가 적절한 애플리케이션 버전을 찾고, 이 버전이 아닌 애플리케이션 코드를 캐시에서 모두 제거합니다.

그리고 에러가 발생하지 않더라도 다음과 같은 경우에는 서비스 워커가 애플리케이션 버전을 최신 버전으로 변경합니다:

*   페이지를 새로고침한 경우
*   `SwUpdate` 서비스를 사용해서 애플리케이션의 최신 버전을 직접 활성화하는 경우


<!--
### Service worker updates
-->
### 서비스 워커 업데이트하기

<!--
The Angular service worker is a small script that runs in web browsers.
From time to time, the service worker is updated with bug fixes and feature improvements.

The Angular service worker is downloaded when the application is first opened and when the application is accessed after a period of inactivity.
If the service worker changes, it's updated in the background.

Most updates to the Angular service worker are transparent to the application. The old caches are still valid and content is still served normally.
Occasionally, a bug fix or feature in the Angular service worker might require the invalidation of old caches.
In this case, the service worker transparently refreshes the application from the network.
-->
Angular 서비스 워커는 사실 웹 브라우저에서 실행되는 간단한 스크립트입니다.
그래서 서비스 워커도 버그를 수정하거나 새로운 기능을 추가하기 위해 업데이트할 필요가 있습니다.

서비스 워커는 애플리케이션이 처음 실행될 때 다운로드되며 비활성화되어도 브라우저에 계속 남아있습니다.
그래서 서비스 워커는 보통 백그라운드에서 업데이트됩니다.

서비스 워커가 업데이트되더라도 이 과정은 애플리케이션에 영향을 주지 않습니다.
그래서 업데이트하기 이전에 캐싱한 리소스는 서비스 워커를 업데이트한 이후에도 여전히 유효합니다.
하지만 서비스 워커의 버그를 수정하거나 기능이 추가된 경우라면 이전에 있던 캐시를 폐기하고 새로 받아와야 하는 경우도 있습니다.
이 경우에는 앱 전체가 새로 실행될 수 있습니다.


<a id="bypassing-the-service-worker"></a>

<!--
### Bypassing the service worker
-->
### 서비스 워커 생략하기

<!--
In some cases, you might want to bypass the service worker entirely and let the browser handle the request.
An example is when you rely on a feature that is currently not supported in service workers, such as [reporting progress on uploaded files](https://github.com/w3c/ServiceWorker/issues/1141).

To bypass the service worker, set `ngsw-bypass` as a request header, or as a query parameter.
The value of the header or query parameter is ignored and can be empty or omitted.
-->
때로는 서비스 워커를 생략하고 앱에서 발생하는 HTTP 요청을 모두 브라우저에게 위임해야 할 때도 있습니다.
[파일 업로드 진행상황 확인하기](https://github.com/w3c/ServiceWorker/issues/1141)와 같이 서비스 워커가 아직 지원하지 않는 기능을 사용하는 경우가 그렇습니다.

서비스 워커를 생략하려면 HTTP 요청을 보낼 때 헤더나 쿼리 인자에 `ngsw-bypass` 필드를 추가하면 됩니다.
그러면 서비스 워커는 이 HTTP 요청을 무시하고 그대로 통과시킵니다.


<!--
### Service worker requests when the server can't be reached
-->
### 응답을 받을 수 없을 때

<!--
The service worker processes all requests unless the [service worker is explicitly bypassed](#bypassing-the-service-worker).
The service worker either returns a cached response or sends the request to the server, depending on the state and configuration of the cache. 
The service worker only caches responses to non-mutating requests, such as `GET` and `HEAD`.

If the service worker receives an error from the server or it doesn't receive a response, it returns an error status that indicates the result of the call.
For example, if the service worker doesn't receive a response, it creates a [504 Gateway Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) status to return. The `504` status in this example could be returned because the server is offline or the client is disconnected.
-->
서비스 워커는 [명시적으로 우회하지 않는 한](#bypassing-the-service-worker) 모든 요청을 그대로 처리합니다.
이 때 캐싱된 응답이 있으면 캐시를 활용하고, 그렇지 않은 경우에는 서버로 실제 요청을 보냅니다.
서비스 워커가 캐싱하는 응답은 `GET`이나 `HEAD`와 같이 변경되지 않는 요청만 해당됩니다.

서비스 워커가 서버에서 에러 응답을 받거나 응답을 받지 못하면 요청이 실패했다는 응답을 반환합니다.
그래서 서비스 워커가 응답을 받지 못하면 [504 Gateway Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) 응답을 반환합니다.
`504` 상태는 서버가 응답하지 않거나 클라이언트 연결이 끊어진 경우를 의미합니다.


<!--
## Debugging the Angular service worker
-->
## 서비스 워커 디버깅하기

<!--
Occasionally, it might be necessary to examine the Angular service worker in a running state to investigate issues or whether it's operating as designed.
Browsers provide built-in tools for debugging service workers and the Angular service worker itself includes useful debugging features.
-->
필요하다면, 동작하고 있는 서비스 워커의 내부 상태값을 확인해서 예상한대로 동작하고 있는지 확인할 수 있습니다.
그리고 브라우저는 보통 서비스 워커 디버깅 툴을 제공하기 때문에 Angular가 제공하는 서비스 워커도 이 디버깅 툴을 활용해서 디버깅할 수 있습니다.


<!--
### Locating and analyzing debugging information
-->
### 디버깅 정보 확인하기

<!--
The Angular service worker exposes debugging information under the `ngsw/` virtual directory.
Currently, the single exposed URL is `ngsw/state`.
Here is an example of this debug page's contents:

<code-example format="output" hideCopy language="shell">

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
 &ast; init post-load (update, cleanup)

Debug log:

</code-example>
-->
서비스 워커의 디버깅 정보는 `ngsw/` 라는 가상 폴더 아래 존재합니다.
그래서 `ngsw/state`와 같은 URL로 이 주소에 접근하면 다음과 같은 디버깅 정보를 확인할 수 있습니다:

<code-example format="output" hideCopy language="shell">

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
 &ast; init post-load (update, cleanup)

Debug log:

</code-example>

<!--
#### Driver state
-->
#### 드라이버 상태

<!--
The first line indicates the driver state:

<code-example format="output" hideCopy language="shell">

Driver state: NORMAL ((nominal))

</code-example>

`NORMAL` indicates that the service worker is operating normally and is not in a degraded state.

There are two possible degraded states:

| Degraded states         | Details |
|:---                     |:---     |
| `EXISTING_CLIENTS_ONLY` | The service worker does not have a clean copy of the latest known version of the application. Older cached versions are safe to use, so existing tabs continue to run from cache, but new loads of the application will be served from the network. The service worker will try to recover from this state when a new version of the application is detected and installed. This happens when a new `ngsw.json` is available. |
| `SAFE_MODE`             | The service worker cannot guarantee the safety of using cached data. Either an unexpected error occurred or all cached versions are invalid. All traffic will be served from the network, running as little service worker code as possible.                                                                                                                                                                                 |

In both cases, the parenthetical annotation provides the
error that caused the service worker to enter the degraded state.

Both states are temporary; they are saved only for the lifetime of the [ServiceWorker instance](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope).
The browser sometimes terminates an idle service worker to conserve memory and processor power, and creates a new service worker instance in response to network events.
The new instance starts in the `NORMAL` mode, regardless of the state of the previous instance.
-->
첫번째 줄은 드라이버의 상태를 표시합니다:

<code-example format="output" hideCopy language="shell">

Driver state: NORMAL ((nominal))

</code-example>

드라이버 상태가 `NORMAL`이기 때문에 서비스 워커가 정상적으로 동작하고 있다는 것을 확인할 수 있습니다.

이 상태값은 `NORMAL` 상태가 아니라 비정상\(degraded\) 상태가 될 수도 있습니다. 비정상 상태는 2종류가 있습니다:

| 비정상 상태                  | 설명                                                                                                                                                                        |
|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `EXISTING_CLIENTS_ONLY` | 클라이언트에 저장된 서비스 워커가 최신버전이 아니라는 것을 의미합니다. 이미 캐싱된 버전의 앱은 사용하는 데에 문제가 없고, 이미 탭에서 실행되고 있는 앱도 계속 사용할 수 있지만, 새로운 탭에서 실행되는 앱은 네트워크로 직접 받아오는 최신 버전으로 실행될 것입니다.                     |
| `SAFE_MODE`             | 서비스 워커가 캐싱된 데이터의 안전성을 보장할 수 없는 상태를 의미합니다. 다르게 표현하면, 캐싱된 앱을 실행하다가 에러가 발생했거나 캐싱된 앱 버전 자체가 유효하지 않은 상태를 의미합니다. 앱에서 주고받는 모든 트래픽은 캐싱된 앱이 아니라 네트워크를 통해 전송되며, 서비스 워커의 실행은 최소화됩니다. |

두 경우 모두 괄호 안에 표시되는 에러 내용을 확인하면 서비스 워커가 제대로 동작하지 않는 원인을 확인할 수 있습니다.

그리고 두 상태는 모두 일시적입니다. 이 상태는 [서비스 워커의 인스턴스](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope)가 유지될 때까지만 유효합니다.
브라우저는 메모리를 확보하고 연산 성능을 최대화하기 위해서 동작하지 않는 서비스 워커를 종료시키고 새로운 서비스 워커의 인스턴스를 생성하기도 합니다.
이 때 새로 생성되는 서비스 워커의 상태는 이전 상태와 관계 없이 `NORMAL` 모드입니다.


<!--
#### Latest manifest hash
-->
#### 매니페스트 해시값 (Latest manifest hash)

<!--
<code-example format="output" hideCopy language="shell">

Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c

</code-example>

This is the SHA1 hash of the most up-to-date version of the application that the service worker knows about.
-->
<code-example format="output" hideCopy language="shell">

Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c

</code-example>

서비스 워커가 애플리케이션의 유효성을 검사하는 SHA1 해시값을 표시합니다.


<!--
#### Last update check
-->
#### 업데이트 체크 상태

<!--
<code-example format="output" hideCopy language="shell">

Last update check: never

</code-example>

This indicates the last time the service worker checked for a new version, or update, of the application.
`never` indicates that the service worker has never checked for an update.

In this example debug file, the update check is currently scheduled, as explained the next section.
-->
<code-example format="output" hideCopy language="shell">

Last update check: never

</code-example>

서비스 워커가 새 버전을 체크했거나, 업데이트한 상황을 표시합니다.
`never`는 서비스 워커가 업데이트가 있는지 아직 체크하지 않은 상황을 의미합니다.

위에서 보는 디버깅 화면에 따르면, 업데이트 체크는 스케쥴에 등록된 상태입니다. 이 내용은 아래 섹션에서 설명합니다.


<!--
#### Version
-->
#### 버전

<!--
<code-example format="output" hideCopy language="shell">

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

</code-example>

In this example, the service worker has one version of the application cached and being used to serve two different tabs.

<div class="alert is-helpful">

**NOTE**: <br />
This version hash is the "latest manifest hash" listed above.
Both clients are on the latest version.
Each client is listed by its ID from the `Clients` API in the browser.

</div>
-->
<code-example format="output" hideCopy language="shell">

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

</code-example>

이 예제에서 두 탭에 실행되고 있는 애플리케이션은 서비스 워커에 캐싱된 버전이 실행된 것입니다.

<div class="alert is-helpful">

**참고**: <br />
그래서 두 앱의 버전은 같으며, "latest manifest hash" 값도 같습니다.
실행되고 있는 클라인트 ID는 브라우저에서 `Clients` API로 확인할 수 있습니다.

</div>


<!--
#### Idle task queue
-->
#### 대기 태스크 큐 (Idle task queue)

<!--
<code-example format="output" hideCopy language="shell">

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:
 &ast; init post-load (update, cleanup)

</code-example>

The Idle Task Queue is the queue of all pending tasks that happen in the background in the service worker.
If there are any tasks in the queue, they are listed with a description.
In this example, the service worker has one such task scheduled, a post-initialization operation involving an update check and cleanup of stale caches.

The last update tick/run counters give the time since specific events happened related to the idle queue.
The "Last update run" counter shows the last time idle tasks were actually executed.
"Last update tick" shows the time since the last event after which the queue might be processed.
-->
<code-example format="output" hideCopy language="shell">

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:
 &ast; init post-load (update, cleanup)

</code-example>

대기 태스크 큐 목록에는 백그라운드로 실행되는 서비스 워커가 처리해야하는 태스크 목록이 표시됩니다.
이 목록은 큐에 태스크가 있을 때만 표시되며, 태스크 이름과 함께 간단한 설명도 표시됩니다.
이 예제에서는 서비스 워커에 스케쥴이 예약된 태스크가 하나 존재합니다.
이 태스크는 서비스 워커가 시작된 이후에 업데이트할 버전이 있는지 확인하고 캐시를 초기화하는 태스크입니다.

"Last update tick"과 "Last update run"은 이 대기 태스크 큐에서 일어난 이벤트를 표현합니다.
그래서 "Last update run"은 대기 태스크 큐가 마지막으로 실행된 시점을 표현하며, "Last update tick"은 대기 태스크 큐에서 마지막으로 실행된 이벤트의 실행시점을 표현합니다.


<!--
#### Debug log
-->
#### 디버그 로그

<!--
<code-example format="output" hideCopy language="shell">

Debug log:

</code-example>

Errors that occur within the service worker are logged here.
-->
<code-example format="output" hideCopy language="shell">

Debug log:

</code-example>

서비스 워커가 실행되면서 출력하는 로그는 이 섹션에 표시됩니다.


<!--
### Developer tools
-->
### 개발자 도구

<!--
Browsers such as Chrome provide developer tools for interacting with service workers.
Such tools can be powerful when used properly, but there are a few things to keep in mind.

*   When using developer tools, the service worker is kept running in the background and never restarts.
    This can cause behavior with Dev Tools open to differ from behavior a user might experience.

*   If you look in the Cache Storage viewer, the cache is frequently out of date.
    Right-click the Cache Storage title and refresh the caches.

*   Stopping and starting the service worker in the Service Worker pane checks for updates
-->
Chrome과 같은 브라우저에서 제공하는 개발자 도구를 활용하면 서비스 워커의 동작을 확인할 수 있습니다.
이런 개발자 도구는 많은 내용을 알고 사용할수록 개발에 큰 도움이 되지만, 지금은 필요한 내용만 간단하게 짚고 넘어가 봅시다.

*   개발자 도구를 사용해서 서비스 워커를 확인하려면 서비스 워커가 백그라운드에서 실행중이어야 하며, 재시작되지 않아야 합니다.
    서비스 워커가 재시작되면 개발자 도구에 표시되는 내용과 실제 동작이 다를 수 있습니다.

*   Cache Storage 탭에서 오래 전에 캐싱된 항목을 발견하면, 이 항목에 마우스 오른쪽 버튼을 클릭해서 직접 갱신할 수 있습니다.

*   Service Worker 탭에서 서비스 워커를 중단하거나 확인해서 새 버전이 있는지 확인할 수 있습니다.


<!--
## Service worker safety
-->
## 서비스 워커 안전장치

<!--
Bugs or broken configurations could cause the Angular service worker to act in unexpected ways.
If this happens, the Angular service worker contains several failsafe mechanisms in case an administrator needs to deactivate the service worker quickly.
-->
설정값을 잘못 지정하거나 버그가 발생하면 서비스 워커도 예상하지 않은 방식으로 동작할 수 있습니다.
하지만 이런 경우를 최소화하기 위해 설정값이 잘못되었을 때 동작하는 안전장치가 몇가지 있습니다.
이 안전장치를 활용하면 오동작하는 서비스 워커를 빠르게 비활성화할 수 있습니다.


<a id="fail-safe"></a>

<!--
### Fail-safe
-->
### 실행에 실패했을 때

<!--
To deactivate the service worker, rename the `ngsw.json` file or delete it.
When the service worker's request for `ngsw.json` returns a `404`, then the service worker removes all its caches and de-registers itself, essentially self-destructing.
-->
서비스 워커를 비활성화하려면 `ngsw.json` 파일을 제거하거나 다른 이름으로 변경하면 됩니다.
그리고 서비스 워커가 요청한 `ngsw.json` 요청의 응답으로 `404`를 받으면 서비스 워커가 모든 캐시를 제거하고 브라우저에 등록된 서비스 워커를 해지합니다.


### Safety worker

<!--
<!- vale Angular.Google_Acronyms = NO ->

A small script, `safety-worker.js`, is also included in the `@angular/service-worker` NPM package.
When loaded, it un-registers itself from the browser and removes the service worker caches.
This script can be used as a last resort to get rid of unwanted service workers already installed on client pages.

<!- vale Angular.Google_Acronyms = YES ->

<div class="alert is-important">

**IMPORTANT**: <br />
You cannot register this worker directly, as old clients with cached state might not see a new `index.html` which installs the different worker script.

</div>

Instead, you must serve the contents of `safety-worker.js` at the URL of the Service Worker script you are trying to unregister. You must continue to do so until you are certain all users have successfully unregistered the old worker.
For most sites, this means that you should serve the safety worker at the old Service Worker URL forever.
This script can be used to deactivate `@angular/service-worker` and remove the corresponding caches. It also removes any other Service Workers which might have been served in the past on your site.
-->
`@angular/service-worker` NPM 패키지에는 `safety-worker.js` 라는 작은 스크립트 파일이 하나 존재하는데, 이 파일은 브라우저에서 서비스 워커와 서비스 워커 캐시를 제거하는 용도로 사용됩니다.
이 스크립트 파일을 실행하면 클라이언트 페이지에 이미 설치된 서비스 워커를 안전하게 제거할 수 있습니다.

<div class="alert is-important">

**중요**: <br />
서비스 워커는 개발자가 브라우저에 직접 등록할 수 없습니다.
왜냐하면 `index.html` 파일에서 다른 서비스 워커를 등록하면 다른 서비스 워커가 이전에 캐싱했던 내용을 확인할 수 없기 때문입니다.

</div>

`safety-worker.js` 파일은 브라우저에서 제거하려는 서비스 워커 스크립트의 URL 대신 사용하도록 지정해야 하며, 이전에 동작하던 서비스 워커가 완전히 제거될 때까지 유지되어야 합니다.
다르게 표현하면, 서비스 워커를 완벽하게 제거하려면 이전에 가리키던 서비스 워커 파일의 URL 대신 `safety-worker.js` 파일을 계속 가리켜야 합니다.
이 스크립트를 사용하면 `@angular/service-worker`가 등록한 서비스 워커와 다른 방식으로 사이트에 등록된 서비스 워커도 모두 비활성화할 수 있습니다.


<!--
### Changing your application's location
-->
### 애플리케이션 위치 변경하기

<!--
<div class="alert is-important">

**IMPORTANT**: <br />
Service workers don't work behind redirect.
You might have already encountered the error `The script resource is behind a redirect, which is disallowed`.

</div>

This can be a problem if you have to change your application's location.
If you set up a redirect from the old location, such as `example.com`, to the new location, `www.example.com` in this example, the worker stops working.
Also, the redirect won't even trigger for users who are loading the site entirely from Service Worker.
The old worker, which was registered at `example.com`, tries to update and sends a request to the old location `example.com`. This request is redirected to the new location `www.example.com` and creates the error: `The script resource is behind a redirect, which is disallowed`.

To remedy this, you might need to deactivate the old worker using one of the preceding techniques: [Fail-safe](#fail-safe) or [Safety Worker](#safety-worker).
-->
<div class="alert is-important">

**중요**: <br />
서비스 워커는 리다이렉트와는 궁합이 맞지 않습니다.
`The script resource is behind a redirect, which is disallowed` 에러가 발생한다면 보통 리다이렉트와 함께 사용했기 때문입니다.

</div>

하지만 애플리케이션이 실행되는 주소를 변경해야 하는 경우에는 문제가 될 수 있습니다.
이전에 `example.com`이었던 접속 주소를 `www.example.com`으로 옮기기 위해 리다이렉트한다면 이 경우에는 서비스 워커가 동작하지 않습니다.
그리고 리다이렉트를 사용하면 누가 서비스 워커를 실행했는지에 대한 이벤트도 발생시키지 않습니다.
이전에 `example.com`에서 사용했던 서비스 워커는 계속 예전 주소로 업데이트를 시도하지만 찾을 수 없을 것이고, `www.example.com`에 있는 서비스 워커는 `The script resource is behind a redirect, which is disallowed` 에러를 마주하게 될 것입니다.

이런 상황을 방지하려면 위에서 살펴본 [실행에 실패했을 때](#fail-safe)나 [Safety Worker](#safety-worker)와 같은 테크닉으로 이전에 있던 워커를 완전히 종료하는 것이 좋습니다.


<!--
## More on Angular service workers
-->
## 더 알아보기

<!--
You might also be interested in the following:

*   [Service Worker Configuration](guide/service-worker-config)
-->
이런 내용도 확인해 보세요:

*   [서비스 워커 설정](guide/service-worker-config)


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-06
