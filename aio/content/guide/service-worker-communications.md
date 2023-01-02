<!--
# Service worker communication
-->
# 서비스 워커 통신

<!--
Importing `ServiceWorkerModule` into your `AppModule` doesn't just register the service worker, it also provides a few services you can use to interact with the service worker and control the caching of your application.
-->
`AppModule`에 `ServiceWorkerModule`을 로드하는 것만으로는 서비스 워커를 제대로 등록했다고 할 수 없습니다. 서비스 워커를 제대로 사용하려면 애플리케이션의 데이터를 캐싱할 수 있도록 서비스 워커가 제공하는 서비스를 활용해서 어떤 동작을 실행하도록 해야 합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following:

*   [Getting Started with Service Workers](guide/service-worker-getting-started)
-->
이 문서의 내용을 제대로 이해하려면 다음 내용을 먼저 보는 것이 좋습니다:

*   [서비스 워커 시작하기](guide/service-worker-getting-started)


<!--
## `SwUpdate` service
-->
## `SwUpdate` 서비스

<!--
The `SwUpdate` service gives you access to events that indicate when the service worker discovers and installs an available update for your application.

The `SwUpdate` service supports three separate operations:

*   Get notified when an updated version is *detected* on the server, *installed and ready* to be used locally or when an *installation fails*
*   Ask the service worker to check the server for new updates
*   Ask the service worker to activate the latest version of the application for the current tab
-->
`SwUpdate` 서비스를 사용하면 서비스 워커가 애플리케이션의 새로운 버전을 발견했거나 애플리케이션이 최신버전으로 업데이트된 시점을 알려주는 이벤트를 활용할 수 있습니다.

`SwUpdate` 서비스는 이런 동작을 수행합니다:

*   서버에 새 버전을 *확인했을 때*, 로컬에 *설치하고 준비되었을 때*, *설치 실패했을 때* 알림을 보냅니다.
*   서버에 새 버전이 있는지 확인할 수 있습니다.
*   현재 탭에서 실행중인 애플리케이션을 최신 버전으로 갱신할 수 있습니다.


<!--
### Version updates
-->
### 버전 업데이트

<!--
The `versionUpdates` is an `Observable` property of `SwUpdate` and emits four event types:

| Event types                      | Details |
|:---                              |:---     |
| `VersionDetectedEvent`           | Emitted when the service worker has detected a new version of the app on the server and is about to start downloading it.                                                   |
| `NoNewVersionDetectedEvent`      | Emitted when the service worker has checked the version of the app on the server and did not find a new version.                                                            |
| `VersionReadyEvent`              | Emitted when a new version of the app is available to be activated by clients. It may be used to notify the user of an available update or prompt them to refresh the page. |
| `VersionInstallationFailedEvent` | Emitted when the installation of a new version failed. It may be used for logging/monitoring purposes.                                                                      |


<code-example header="log-update.service.ts" path="service-worker-getting-started/src/app/log-update.service.ts" region="sw-update"></code-example>
-->
`SwUpdate`가 `Observable` 타입으로 제공하는 `versionUpdates`는 이런 이벤트를 감지할 수 있습니다:

| 이벤트 타입                           | 설명                                                                          |
|:---------------------------------|:----------------------------------------------------------------------------|
| `VersionDetectedEvent`           | 서비스 워커가 서버에 새로운 앱 버전이 있다는 것을 확인했고 내려받기 시작할 때 보내는 이벤트입니다.                    |
| `NoNewVersionDetectedEvent`      | 서비스 워커가 서버를 확인했고 새로운 버전이 존재하지 않을 때 보내는 이벤트입니다.                              |
| `VersionReadyEvent`              | 클라이언트에서 앱을 새로운 버전으로 재시작할 수 있을 때 보내는 이벤트입니다. 사용자에게 화면을 갱신하도록 요청하는 용도로 사용합니다. |
| `VersionInstallationFailedEvent` | 새 버전 앱 설치를 실패했을 때 보내는 이벤트입니다. 모니터링, 로그 용도로 사용합니다.                           |


<code-example header="log-update.service.ts" path="service-worker-getting-started/src/app/log-update.service.ts" region="sw-update"></code-example>


<!--
### Checking for updates
-->
### 업데이트 확인하기

<!--
It's possible to ask the service worker to check if any updates have been deployed to the server.
The service worker checks for updates during initialization and on each navigation request &mdash;that is, when the user navigates from a different address to your application.
However, you might choose to manually check for updates if you have a site that changes frequently or want updates to happen on a schedule.

Do this with the `checkForUpdate()` method:

<code-example header="check-for-update.service.ts" path="service-worker-getting-started/src/app/check-for-update.service.ts"></code-example>

This method returns a `Promise<boolean>` which indicates if an update is available for activation.
The check might fail, which will cause a rejection of the `Promise`.

<div class="alert is-important">

In order to avoid negatively affecting the initial rendering of the page, `ServiceWorkerModule` waits for up to 30 seconds by default for the application to stabilize, before registering the ServiceWorker script.
Constantly polling for updates, for example, with [setInterval()](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) or RxJS' [interval()](https://rxjs.dev/api/index/function/interval), prevents the application from stabilizing and the ServiceWorker script is not registered with the browser until the 30 seconds upper limit is reached.

<div class="alert is-helpful">

**NOTE**: <br />
This is true for any kind of polling done by your application.
Check the [isStable](api/core/ApplicationRef#isStable) documentation for more information.

</div>

Avoid that delay by waiting for the application to stabilize first, before starting to poll for updates, as shown in the preceding example.
Alternatively, you might want to define a different [registration strategy](api/service-worker/SwRegistrationOptions#registrationStrategy) for the ServiceWorker.

</div>
-->
서버에 새로운 애플리케이션이 배포되었는지 서비스 워커로 확인할 수 있습니다.
서비스 워커는 초기화 될 때와 사용자가 앱 안에서 다른 주소로 이동할 때 앱이 업데이트 되었는지 확인합니다.
그리고 개발자가 원하는 주기로 업데이트 되었는지 확인하거나 일정을 정해두고 확인할 수도 있습니다.

이 동작은 `checkForUpdate()` 메서드에서 제어합니다:

<code-example header="check-for-update.service.ts" path="service-worker-getting-started/src/app/check-for-update.service.ts"></code-example>

업데이트 체크가 성공적으로 끝나면 이 메소드는 `Promise<boolean>` 타입을 반환하며, 이 반환값을 확인하면 최신 버전을 활성화할 수 있는지 확인할 수 있습니다.

<div class="alert is-important">

애플리케이션 첫 화면이 느리게 뜨는 것을 방지하기 위해 `ServiceWorkerModule`은 앱이 안정화되기까지 30초를 기다린 후에 서비스 워커 스크립트를 시작합니다.
앱이 업데이트 되었는지 확인하기 위해 [setInterval()](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)이나 RxJS [interval()](https://rxjs.dev/api/index/function/interval)을 사용하면 앱이 안정화되지 않습니다.
그래서 서비스 워커 스크립트도 30초가 지나기 전까지는 브라우저에 등록되지 않습니다.

<div class="alert is-helpful">

**참고**: <br />
애플리케이션에서 사용하는 폴링 로직은 모두 이런 방식으로 동작합니다.
더 자세한 내용은 [isStable](api/core/ApplicationRef#isStable) 문서를 참고하세요.

</div>

따라서 애플리케이션을 먼저 안정화 상태로 만든 후에 업데이트 되었는지 확인하는 폴링을 시작하는 것이 좋습니다.
아니면 서비스 워커 [registration strategy](api/service-worker/SwRegistrationOptions#registrationStrategy)를 정의하는 방법도 활용할 수 있습니다.

</div>


<!--
### Updating to the latest version
-->
### 최신버전으로 업데이트하기

<!--
You can update an existing tab to the latest version by reloading the page as soon as a new version is ready.
To avoid disrupting the user's progress, it is generally a good idea to prompt the user and let them confirm that it is OK to reload the page and update to the latest version:

<code-example header="prompt-update.service.ts" path="service-worker-getting-started/src/app/prompt-update.service.ts" region="sw-version-ready"></code-example>

<div class="alert is-important">

Calling {@link SwUpdate#activateUpdate SwUpdate#activateUpdate()} updates a tab to the latest version without reloading the page, but this could break the application.

Updating without reloading can create a version mismatch between the [application shell](guide/glossary#app-shell) and other page resources, such as [lazy-loaded chunks](guide/glossary#lazy-loading), whose filenames may change between versions.

You should only use `activateUpdate()`, if you are certain it is safe for your specific use case.

</div>
-->
새 버전이 준비되었다면 화면을 새로고침해서 현재 탭에 실행된 애플리케이션을 최신 버전으로 업데이트할 수 있습니다.
이 때 사용자를 방해하지 않으려면 사용자에게 안내 메시지를 표시하고, 사용자가 동의했을 때 화면을 새로고침하는 것이 좋습니다.

<code-example header="prompt-update.service.ts" path="service-worker-getting-started/src/app/prompt-update.service.ts" region="sw-version-ready"></code-example>

<div class="alert is-important">

{@link SwUpdate#activateUpdate SwUpdate#activateUpdate()}를 실행하면 화면을 새로고침하지 않아도 애플리케이션을 최신버전으로 갱신할 수 있지만, 이 과정에서 애플리케이션 동작이 멈출 수 있습니다.

그리고 업데이트를 제대로 하지 않으면 [애플리케이션 기본 틀](guide/glossary#app-shell) 버전이 일치하지 않거나, 리소스가 맞지 않는 경우, [지연로딩](guide/glossary#lazy-loading)을 하거나 버전이 변경되면서 파일 이름이 변경된 경우 오류가 발생할 수 있습니다.

`activateUpdate()`는 애플리케이션이 확실하게 안정된 상태에서 실행해야 합니다.

</div>


<!--
### Handling an unrecoverable state
-->
### 복구할 수 없는 상태 처리하기

<!--
In some cases, the version of the application used by the service worker to serve a client might be in a broken state that cannot be recovered from without a full page reload.

For example, imagine the following scenario:

*   A user opens the application for the first time and the service worker caches the latest version of the application.
    Assume the application's cached assets include `index.html`, `main.<main-hash-1>.js` and `lazy-chunk.<lazy-hash-1>.js`.

*   The user closes the application and does not open it for a while.
*   After some time, a new version of the application is deployed to the server.
    This newer version includes the files `index.html`, `main.<main-hash-2>.js` and `lazy-chunk.<lazy-hash-2>.js`.

    <div class="alert is-helpful">

    **NOTE**: <br />
    The hashes are different now, because the content of the files changed.

    </div>

    The old version is no longer available on the server.

*   In the meantime, the user's browser decides to evict `lazy-chunk.<lazy-hash-1>.js` from its cache.
    Browsers might decide to evict specific \(or all\) resources from a cache in order to reclaim disk space.

*   The user opens the application again.
    The service worker serves the latest version known to it at this point, namely the old version \(`index.html` and `main.<main-hash-1>.js`\).

*   At some later point, the application requests the lazy bundle, `lazy-chunk.<lazy-hash-1>.js`.
*   The service worker is unable to find the asset in the cache \(remember that the browser evicted it\).
    Nor is it able to retrieve it from the server \(because the server now only has `lazy-chunk.<lazy-hash-2>.js` from the newer version\).

In the preceding scenario, the service worker is not able to serve an asset that would normally be cached.
That particular application version is broken and there is no way to fix the state of the client without reloading the page.
In such cases, the service worker notifies the client by sending an `UnrecoverableStateEvent` event.
Subscribe to `SwUpdate#unrecoverable` to be notified and handle these errors.

<code-example header="handle-unrecoverable-state.service.ts" path="service-worker-getting-started/src/app/handle-unrecoverable-state.service.ts" region="sw-unrecoverable-state"></code-example>
-->
때로는 서비스 워커가 참조하는 앱 버전의 상태가 잘못되어 화면 전체를 갱신하지 않고는 회복되지 않는 상태가 되는 경우가 있습니다.

이런 경우를 생각해 봅시다:

*   사용자가 앱을 처음 실행한 후에 서비스 워커가 앱의 최신 버전을 캐싱했습니다.
    앱 캐시 대상에 `index.html` 파일과 `main.<main-hash-1>.js`, `lazy-chunk.<lazy-hash-1>.js` 파일이 있다고 합시다.

*   잠시 후에 사용자가 앱을 종료하고 다시 열지 않았습니다.
*   시간이 조금 지난 후에 서버에 새로운 버전으로 앱이 배포되었습니다.
    새로운 버전에는 `index.html`, `main.<main-hash-2>.js`, `lazy-chunk.<lazy-hash-2>.js` 파일이 존재합니다.

    <div class="alert is-helpful">

    **참고**: <br />
    파일의 내용이 달라지지 않았더라도 해시 값이 달라졌다는 것이 중요합니다.

    </div>

    이제 서버에는 이전에 배포된 앱이 존재하지 않습니다.

*   잠시 후에 사용자의 브라우저 캐시에서 `lazy-chunk.<lazy-hash-1>.js` 파일을 제거하기로 결정합니다.
    디스크 공간을 확보하기 위해 브라우저가 일부 리소스를 더 제거하기로 결정할 수도 있습니다.

*   사용자가 앱을 다시 실행합니다.
    이 때 실행되는 서비스 워커는 이전에 받았던 버전입니다.
    `index.html`과 `main.<main-hash-1>.js` 파일을 사용합니다.

*   조금 지난 후에 지연 로딩을 위해 `lazy-chunk.<lazy-hash-1>.js` 파일을 요청합니다.
*   서비스 워커는 캐시에서 이 파일을 찾을 수 없습니다.
    이전 단계에서 브라우저는 이 파일을 캐시에서 제거했으며, 리모트 서버에도 이 파일이 존재하지 않기 때문에 파일을 받아올 수 없습니다.
    서버에서 제공하는 지연 로딩 파일은 `lazy-chunk.<lazy-hash-2>.js` 파일입니다.

이런 경우에는 서비스 워커가 이전에 캐싱했던 파일에 접근할 수 없습니다.
그래서 이 시점에 앱은 정상 동작하지 않는 상태가 되며 클라이언트쪽에서 화면을 갱신하지 않는 이상 이 문제를 해결할 수 없습니다.
이 때 서비스 워커는 `UnrecoverableStateEvent` 이벤트를 발생시킵니다.
이 에러를 처리하려면 `SwUpdate.unrecoverable` 옵저버블을 구독하면 됩니다.

<code-example header="handle-unrecoverable-state.service.ts" path="service-worker-getting-started/src/app/handle-unrecoverable-state.service.ts" region="sw-unrecoverable-state"></code-example>


<!--
## More on Angular service workers
-->
## 서비스 워커 더 알아보기

<!--
You might also be interested in the following:

*   [Service Worker Notifications](guide/service-worker-notifications)
-->
이런 내용도 확인해 보세요:

*   [서비스 워커 알림](guide/service-worker-notifications)


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
