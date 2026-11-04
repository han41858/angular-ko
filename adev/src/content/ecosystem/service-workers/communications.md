<!--
# Communicating with the Service Worker
-->

<a id="communicating-with-the-service-worker"></a>

# 서비스 워커와 통신하기

<!--
Enabling service worker support does more than just register the service worker; it also provides services you can use to interact with the service worker and control the caching of your application.
-->

서비스 워커 지원을 활성화하면 서비스 워커를 등록하는 것뿐 아니라, 서비스 워커와 상호작용하고 애플리케이션 캐시를 제어할 때 사용할 서비스도 제공됩니다.

<!--
## `SwUpdate` service
-->

<a id="swupdate-service"></a>

## `SwUpdate` 서비스

<!--
The `SwUpdate` service gives you access to events that indicate when the service worker discovers and installs an available update for your application.

The `SwUpdate` service supports three separate operations:

- Receiving notifications when an updated version is _detected_ on the server, _installed and ready_ to be used locally or when an _installation fails_.
- Asking the service worker to check the server for new updates.
- Asking the service worker to activate the latest version of the application for the current tab.
-->

`SwUpdate` 서비스를 사용하면 서비스 워커가 애플리케이션에 적용할 수 있는 업데이트를 발견하고 설치할 때 발생하는 이벤트에 접근할 수 있습니다.

`SwUpdate` 서비스는 다음 세 가지 기능을 지원합니다:

- 서버에서 업데이트된 버전이 _감지_ 되거나, 로컬에 _설치되어 사용할 준비가 되었거나_, _설치에 실패_ 했을 때 알림 받기
- 서비스 워커에 서버의 새 업데이트 확인 요청하기
- 서비스 워커에 현재 탭에서 사용할 최신 애플리케이션 버전 활성화 요청하기

<!--
### Version updates
-->

<a id="version-updates"></a>

### 버전 업데이트

<!--
The `versionUpdates` is an `Observable` property of `SwUpdate` and emits four event types:

| Event types                      | Details                                                                                                                                                                     |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VersionDetectedEvent`           | Emitted when the service worker has detected a new version of the app on the server and is about to start downloading it.                                                   |
| `NoNewVersionDetectedEvent`      | Emitted when the service worker has checked the version of the app on the server and did not find a new version.                                                            |
| `VersionReadyEvent`              | Emitted when a new version of the app is available to be activated by clients. It may be used to notify the user of an available update or prompt them to refresh the page. |
| `VersionInstallationFailedEvent` | Emitted when the installation of a new version failed. It may be used for logging/monitoring purposes.                                                                      |

<docs-code header="log-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/log-update.service.ts" region="sw-update"/>
-->

`versionUpdates`는 `SwUpdate`의 `Observable` 프로퍼티이며, 네 가지 이벤트를 방출합니다:

| 이벤트 타입                      | 설명                                                                                                                                       |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `VersionDetectedEvent`           | 서비스 워커가 서버에서 앱의 새 버전을 감지하고 다운로드를 시작하려고 할 때 발생합니다.                                                     |
| `NoNewVersionDetectedEvent`      | 서비스 워커가 서버에서 앱 버전을 확인했지만 새 버전을 찾지 못했을 때 발생합니다.                                                           |
| `VersionReadyEvent`              | 클라이언트가 앱의 새 버전을 활성화할 수 있을 때 발생합니다. 사용자에게 업데이트를 알리거나 페이지 새로고침을 요청할 때 사용할 수 있습니다. |
| `VersionInstallationFailedEvent` | 새 버전 설치에 실패했을 때 발생합니다. 로깅이나 모니터링 용도로 사용할 수 있습니다.                                                        |

<docs-code header="log-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/log-update.service.ts" region="sw-update"/>

<!--
### Checking for updates
-->

<a id="checking-for-updates"></a>

### 업데이트 확인하기

<!--
It's possible to ask the service worker to check if any updates have been deployed to the server.
The service worker checks for updates during initialization and on each navigation request —that is, when the user navigates from a different address to your application.
However, you might choose to manually check for updates if you have a site that changes frequently or want updates to happen on a schedule.

Do this with the `checkForUpdate()` method:

<docs-code header="check-for-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/check-for-update.service.ts"/>

This method returns a `Promise<boolean>` which indicates if an update is available for activation.
The check might fail, which will cause a rejection of the `Promise`.

<docs-callout important title="Stabilization and service worker registration">
In order to avoid negatively affecting the initial rendering of the page, by default the Angular service worker service waits for up to 30 seconds for the application to stabilize before registering the ServiceWorker script.

Constantly polling for updates, for example, with [setInterval()](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) or RxJS' [interval()](https://rxjs.dev/api/index/function/interval), prevents the application from stabilizing and the ServiceWorker script is not registered with the browser until the 30 seconds upper limit is reached.

This is true for any kind of polling done by your application.
Check the [isStable](api/core/ApplicationRef#isStable) documentation for more information.

Avoid that delay by waiting for the application to stabilize first, before starting to poll for updates, as shown in the preceding example.
Alternatively, you might want to define a different [registration strategy](api/service-worker/SwRegistrationOptions#registrationStrategy) for the ServiceWorker.
</docs-callout>
-->

서비스 워커에 서버에 배포된 업데이트가 있는지 확인하도록 요청할 수 있습니다.
서비스 워커는 초기화할 때와 탐색 요청이 발생할 때마다, 즉 사용자가 다른 주소에서 애플리케이션으로 이동할 때 업데이트를 확인합니다.
하지만 사이트가 자주 변경되거나 일정에 따라 업데이트하려면 직접 업데이트를 확인하도록 할 수도 있습니다.

이때는 `checkForUpdate()` 메서드를 사용하면 됩니다:

<docs-code header="check-for-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/check-for-update.service.ts"/>

이 메서드는 활성화할 수 있는 업데이트가 있는지를 나타내는 `Promise<boolean>`을 반환합니다.
확인 과정이 실패하면 `Promise`가 거부됩니다.

<docs-callout important title="애플리케이션 안정화와 서비스 워커 등록">
페이지의 초기 렌더링에 나쁜 영향을 주지 않도록, Angular 서비스 워커 서비스는 기본적으로 애플리케이션이 안정화되기를 최대 30초 동안 기다린 후 ServiceWorker 스크립트를 등록합니다.

[setInterval()](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)이나 RxJS의 [interval()](https://rxjs.dev/api/index/function/interval) 등으로 업데이트를 계속 폴링하면 애플리케이션이 안정화되지 않습니다.
이 경우 최대 대기 시간인 30초가 지날 때까지 ServiceWorker 스크립트가 브라우저에 등록되지 않습니다.

이 동작은 애플리케이션에서 수행하는 모든 종류의 폴링에 적용됩니다.
자세한 내용은 [isStable](api/core/ApplicationRef#isStable) 문서를 참고하세요.

이 지연을 방지하려면 앞의 예제처럼 애플리케이션이 먼저 안정화되기를 기다린 뒤 업데이트 폴링을 시작하세요.
또는 ServiceWorker에 다른 [등록 전략](api/service-worker/SwRegistrationOptions#registrationStrategy)을 정의할 수도 있습니다.
</docs-callout>

<!--
### Updating to the latest version
-->

<a id="updating-to-the-latest-version"></a>

### 최신 버전으로 업데이트하기

<!--
You can update an existing tab to the latest version by reloading the page as soon as a new version is ready.
To avoid disrupting the user's progress, it is generally a good idea to prompt the user and let them confirm that it is OK to reload the page and update to the latest version:

<docs-code header="prompt-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/prompt-update.service.ts" region="sw-version-ready"/>

<docs-callout important title="Safety of updating without reloading">
Calling `activateUpdate()` updates a tab to the latest version without reloading the page, but this could break the application.

Updating without reloading can create a version mismatch between the application shell and other page resources, such as lazy-loaded chunks, whose filenames may change between versions.

You should only use `activateUpdate()`, if you are certain it is safe for your specific use case.
</docs-callout>
-->

새 버전이 준비되면 페이지를 새로고침해서 기존 탭을 최신 버전으로 업데이트할 수 있습니다.
사용자의 작업을 방해하지 않으려면, 일반적으로 사용자에게 페이지를 새로고침하고 최신 버전으로 업데이트해도 되는지 확인받는 것이 좋습니다:

<docs-code header="prompt-update.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/prompt-update.service.ts" region="sw-version-ready"/>

<docs-callout important title="새로고침 없이 업데이트할 때의 안전성">
`activateUpdate()`를 호출하면 페이지를 새로고침하지 않고 탭을 최신 버전으로 업데이트하지만, 이로 인해 애플리케이션이 제대로 동작하지 않을 수 있습니다.

새로고침 없이 업데이트하면 앱 기본 구조와 다른 페이지 리소스 사이에 버전 불일치가 발생할 수 있습니다.
예를 들어 지연 로딩되는 청크의 파일 이름은 버전마다 달라질 수 있습니다.

구체적인 사용 상황에서 안전하다고 확신할 때만 `activateUpdate()`를 사용하세요.
</docs-callout>

<!--
### Handling an unrecoverable state
-->

<a id="handling-an-unrecoverable-state"></a>

### 복구할 수 없는 상태 처리하기

<!--
In some cases, the version of the application used by the service worker to serve a client might be in a broken state that cannot be recovered from without a full page reload.

For example, imagine the following scenario:

1. A user opens the application for the first time and the service worker caches the latest version of the application.
   Assume the application's cached assets include `index.html`, `main.<main-hash-1>.js` and `lazy-chunk.<lazy-hash-1>.js`.

1. The user closes the application and does not open it for a while.
1. After some time, a new version of the application is deployed to the server.
   This newer version includes the files `index.html`, `main.<main-hash-2>.js` and `lazy-chunk.<lazy-hash-2>.js`.

IMPORTANT: The hashes are different now, because the content of the files changed. The old version is no longer available on the server.

1. In the meantime, the user's browser decides to evict `lazy-chunk.<lazy-hash-1>.js` from its cache.
   Browsers might decide to evict specific (or all) resources from a cache in order to reclaim disk space.

1. The user opens the application again.
   The service worker serves the latest version known to it at this point, namely the old version (`index.html` and `main.<main-hash-1>.js`).

1. At some later point, the application requests the lazy bundle, `lazy-chunk.<lazy-hash-1>.js`.
1. The service worker is unable to find the asset in the cache (remember that the browser evicted it).
   Nor is it able to retrieve it from the server (because the server now only has `lazy-chunk.<lazy-hash-2>.js` from the newer version).

In the preceding scenario, the service worker is not able to serve an asset that would normally be cached.
That particular application version is broken and there is no way to fix the state of the client without reloading the page.
In such cases, the service worker notifies the client by sending an `UnrecoverableStateEvent` event.
Subscribe to `SwUpdate#unrecoverable` to be notified and handle these errors.

<docs-code header="handle-unrecoverable-state.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/handle-unrecoverable-state.service.ts" region="sw-unrecoverable-state"/>
-->

서비스 워커가 클라이언트에 제공하는 애플리케이션 버전이 손상되어, 전체 페이지를 새로고침하지 않으면 복구할 수 없는 상태가 될 수 있습니다.

예를 들어 다음과 같은 상황을 생각해 봅시다:

1. 사용자가 애플리케이션을 처음 열면 서비스 워커가 애플리케이션의 최신 버전을 캐시에 저장합니다.
   캐시에 저장된 애플리케이션 리소스가 `index.html`, `main.<main-hash-1>.js`, `lazy-chunk.<lazy-hash-1>.js`라고 가정하겠습니다.

1. 사용자가 애플리케이션을 닫고 한동안 열지 않습니다.
1. 시간이 지난 뒤 서버에 애플리케이션의 새 버전이 배포됩니다.
   새 버전에는 `index.html`, `main.<main-hash-2>.js`, `lazy-chunk.<lazy-hash-2>.js` 파일이 포함되어 있습니다.

중요: 파일 내용이 변경되었으므로 해시도 달라졌습니다.
서버에서는 더 이상 이전 버전을 제공하지 않습니다.

1. 그동안 사용자의 브라우저가 캐시에서 `lazy-chunk.<lazy-hash-1>.js`를 제거합니다.
   브라우저는 디스크 공간을 확보하기 위해 캐시에서 특정 리소스 또는 모든 리소스를 제거할 수 있습니다.

1. 사용자가 애플리케이션을 다시 엽니다.
   서비스 워커는 이 시점에서 자신이 알고 있는 최신 버전, 즉 이전 버전인 `index.html`과 `main.<main-hash-1>.js`를 제공합니다.

1. 이후 애플리케이션이 지연 로딩 번들인 `lazy-chunk.<lazy-hash-1>.js`를 요청합니다.
1. 서비스 워커는 캐시에서 해당 리소스를 찾지 못합니다.
   앞서 브라우저가 제거했기 때문입니다.
   서버에서도 가져올 수 없습니다.
   서버에는 새 버전의 `lazy-chunk.<lazy-hash-2>.js`만 있기 때문입니다.

이 상황에서는 서비스 워커가 정상적으로 캐시에 있어야 할 리소스를 제공할 수 없습니다.
해당 애플리케이션 버전이 손상된 상태이며, 페이지를 새로고침하지 않고는 클라이언트 상태를 복구할 방법이 없습니다.
이 경우 서비스 워커는 `UnrecoverableStateEvent` 이벤트를 보내 클라이언트에 알립니다.
이 알림을 받아 오류를 처리하려면 `SwUpdate#unrecoverable`을 구독하세요.

<docs-code header="handle-unrecoverable-state.service.ts" path="adev/src/content/examples/service-worker-getting-started/src/app/handle-unrecoverable-state.service.ts" region="sw-unrecoverable-state"/>

<!--
## More on Angular service workers
-->

<a id="more-on-angular-service-workers"></a>

## Angular 서비스 워커 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/push-notifications" title="Push notifications"/>
  <docs-pill href="ecosystem/service-workers/devops" title="Service Worker devops"/>
</docs-pill-row>
-->

다음 내용도 함께 살펴보세요:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/push-notifications" title="푸시 알림"/>
  <docs-pill href="ecosystem/service-workers/devops" title="서비스 워커 운영"/>
</docs-pill-row>
