<!--
# Angular service worker introduction
-->
# 서비스 워커

<!--
Service workers augment the traditional web deployment model and empower applications to deliver a user experience with the reliability and performance on par with code that is written to run on your operating system and hardware.
Adding a service worker to an Angular application is one of the steps for turning an application into a [Progressive Web App](https://web.dev/progressive-web-apps/) \(also known as a PWA\).

At its simplest, a service worker is a script that runs in the web browser and manages caching for an application.

Service workers function as a network proxy.
They intercept all outgoing HTTP requests made by the application and can choose how to respond to them.
For example, they can query a local cache and deliver a cached response if one is available.
Proxying isn't limited to requests made through programmatic APIs, such as `fetch`; it also includes resources referenced in HTML and even the initial request to `index.html`.
Service worker-based caching is thus completely programmable and doesn't rely on server-specified caching headers.

Unlike the other scripts that make up an application, such as the Angular application bundle, the service worker is preserved after the user closes the tab.
The next time that browser loads the application, the service worker loads first, and can intercept every request for resources to load the application.
If the service worker is designed to do so, it can *completely satisfy the loading of the application, without the need for the network*.

Even across a fast reliable network, round-trip delays can introduce significant latency when loading the application.
Using a service worker to reduce dependency on the network can significantly improve the user experience.
-->
서비스 워커\(Service workers\)는 웹 애플리케이션을 네이티브 앱처럼 로컬에 설치해서 안정성과 실행 성능을 향상시키는 역할을 하며, 전통적인 웹 개발 모델을 확장하는 개념으로 사용됩니다.
그래서 Angular 애플리케이션에 서비스 워커를 추가하는 것은 애플리케이션을 [Progressive Web App(PWA)](https://developers.google.com/web/progressive-web-apps/)으로 전환하는 과정 중 한 단계라고 볼 수 있습니다.

간단하게 이야기하면, 서비스 워커는 애플리케이션의 캐시를 관리하기 위해 웹 브라우저에서 실행되는 스크립트입니다.

서비스 워커는 네트워크 프록시 역할도 합니다.
서비스 워커는 애플케이션에서 보내는 HTTP 요청을 모두 인터셉트해서 이 요청에 대한 응답을 직접 보낼 수 있습니다.
그래서 이미 응답으로 받은 요청이 있다면 이 응답을 로컬에 캐싱해뒀다가 재사용할 수도 있습니다.
프록시 기능은 애플리케이션 코드로 실행하는 `fetch`와 같은 API뿐 아니라, HTML 파일이 참조하는 리소스에도 적용할 수 있으며, 심지어 애플리케이션을 실행하면서 처음 요청하는 `index.html` 파일 요청에도 적용할 수 있습니다.
서비스 워커를 활용하면 서버의 캐싱 로직과 관계없이 모든 캐시를 클라이언트 안에서 코드로 조작할 수 있습니다.

Angular 애플리케이션 번들과 같이 애플리케이션에서 실행되는 보통 스크립트와 다르게, 서비스 워커는 사용자가 탭을 닫아도 그대로 유지됩니다.
그래서 이후에 브라우저에서 애플리케이션이 다시 실행되면 서비스 워커가 먼저 로드되기 때문에 애플리케이션이 로드하는 모든 요청을 인터셉트할 수 있습니다.
서비스 워커는 처음부터 이렇게 동작하도록 설계되었습니다.
그래서 *네트워크가 연결되지 않은 상태에서도 웹 애플리케이션을 온전히 실행할 수 있습니다.*

아무리 빠른 네트워크라도 실제로 요청을 보내고 받을 때까지 애플리케이션은 로딩상태로 기다려야 합니다.
이 때 서비스 워커를 사용하면 애플리케이션이 실행되는 시간을 크게 단축시킬 수 있기 때문에 사용자의 UX도 대폭 개선할 수 있습니다.


<!--
## Service workers in Angular
-->
## Angular가 제공하는 서비스 워커

<!--
Angular applications, as single-page applications, are in a prime position to benefit from the advantages of service workers.
Starting with version 5.0.0, Angular ships with a service worker implementation.
Angular developers can take advantage of this service worker and benefit from the increased reliability and performance it provides, without needing to code against low-level APIs.

Angular's service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

To achieve this, the Angular service worker follows these guidelines:

*   Caching an application is like installing a native application.
    The application is cached as one unit, and all files update together.

*   A running application continues to run with the same version of all files.
    It does not suddenly start receiving cached files from a newer version, which are likely incompatible.

*   When users refresh the application, they see the latest fully cached version.
    New tabs load the latest cached code.

*   Updates happen in the background, relatively quickly after changes are published.
    The previous version of the application is served until an update is installed and ready.

*   The service worker conserves bandwidth when possible.
    Resources are only downloaded if they've changed.

To support these behaviors, the Angular service worker loads a *manifest* file from the server.
The file, called `ngsw.json` \(not to be confused with the [web app manifest](https://developer.mozilla.org/docs/Web/Manifest)\), describes the resources to cache and includes hashes of every file's contents.
When an update to the application is deployed, the contents of the manifest change, informing the service worker that a new version of the application should be downloaded and cached.
This manifest is generated from a CLI-generated configuration file called `ngsw-config.json`.

Installing the Angular service worker is as straightforward as [running an Angular CLI command](guide/service-worker-getting-started#cli-command).
In addition to registering the Angular service worker with the browser, this also makes a few services available for injection which interact with the service worker and can be used to control it.
For example, an application can ask to be notified when a new update becomes available, or an application can ask the service worker to check the server for available updates.
-->
Angular 애플리케이션은 단일 페이지 애플리케이션\(Single-page application, SPA\)이기 때문에 서비스 워커의 효율을 극대화할 수 있습니다.
Angular는 5.0.0 버전부터 서비스 워커를 도입했습니다.
Angular 개발자라면 언제든 이 서비스 워커를 도입할 수 있으며, 별다른 코드 변경 없이도 애플리케이션의 안정성과 실행 성능을 개선할 수 있습니다.

Angular가 제공하는 서비스 워커는 느리거나 불안정한 네트워크로 접속한 사용자에게도 최적화된 UX를 제공하는 것을 최우선 목표로 설계되었습니다.
그리고 이 때 캐싱된 데이터가 갱신되지 않아서 생길 수 있는 리스크도 최소화하려고 노력하고 있습니다.

Angular가 제공하는 서비스 워커가 지향하는 방향은 이렇습니다:

*   애플리케이션을 캐싱하는 것은 네이티브 애플리케이션을 설치하는 것과 비슷합니다.
    애플리케이션은 개별 파일 단위로 캐싱할 수 있으며 애플리케이션 전체를 한번에 캐싱할 수도 있습니다.

*   애플리케이션을 실행하면 모든 파일은 같은 버전으로 동작합니다.
    캐싱한 파일 대신 새로운 버전의 파일을 갑자기 가져와서 애플리케이션이 제대로 동작하지 않는 상황은 발생하지 않아야 합니다.

*   사용자가 애플리케이션을 새로고침하면 마지막에 캐싱된 애플리케이션 코드를 사용해서 화면을 다시 표시합니다.
    새로운 탭을 여는 경우도 마찬가지입니다.

*   애플리케이션 코드 업데이트는 백그라운드에서 실행되며, 이 업데이트는 최신 코드가 배포된 것을 확인하는 즉시 실행됩니다.
    이 때 애플리케이션의 최신 버전이 설치되고 완전히 준비되기 전까지는 이전 버전이 그대로 실행됩니다.

*   서비스 워커는 네트워크 대역폭을 최소한으로 사용합니다.
    애플리케이션이 사용하는 리소스는 변경되었을 때만 다시 다운로드됩니다.

이런 동작을 지원하기 위해 Angular 서비스 워커는 서버에서 *매니페스트\(manifest\)* 파일을 받아옵니다.
Angular에서는 이 역할을 `ngsw.json` 파일이 담당하는데, 이 매니페스트 파일은 [웹 앱 매니페스트](https://developer.mozilla.org/docs/Web/Manifest)와는 다릅니다.
`ngsw.json` 파일에는 캐싱해야할 리소스의 목록과 모든 파일의 내용과 관련된 해시값이 저장되어 있습니다.
그래서 애플리케이션의 새로운 버전이 배포되면 이 매니페스트 파일의 내용도 바뀌기 때문에, 자연스럽게 서비스 워커는 애플리케이션의 새로운 버전이 배포되었으니 새로 다운로드 받고 캐싱해야 한다는 것을 알 수 있습니다.
Angular CLI를 사용해서 생성한 프로젝트에 존재하는 기본 매니페스트 파일의 이름은 `ngsw-config.json`입니다.

Angular 애플리케이션에 Angular 서비스 워커를 적용하는 것은 [Angular CLI 명령을 실행](guide/service-worker-getting-started#cli-command)하는 것만큼이나 아주 간단합니다.
그리고 Angular 서비스 워커를 브라우저에 등록하면 애플리케이션에 몇가지 서비스가 자동으로 등록되기 때문에, 이 서비스를 활용하면 개발자가 서비스 워커를 직접 조작할 수 있습니다.
이 방식을 활용하면 애플리케이션의 새로운 버전이 배포되었을 때 알림을 받도록 할 수도 있고, 원하는 시점에 서비스 워커를 사용해서 새로운 업데이트가 있는지 직접 확인할 수도 있습니다.


<!--
## Prerequisites
-->
## 동작 환경

<!--
To make use of all the features of Angular service workers, use the latest versions of Angular and the Angular CLI.

For service workers to be registered, the application must be accessed over HTTPS, not HTTP.
Browsers ignore service workers on pages that are served over an insecure connection.
The reason is that service workers are quite powerful, so extra care is needed to ensure the service worker script has not been tampered with.

There is one exception to this rule: to make local development more straightforward, browsers do *not* require a secure connection when accessing an application on `localhost`.
-->
Angular 서비스 워커가 제공하는 기능을 모두 사용하려면 Angular 패키지와 Angular CLI를 모두 최신버전으로 유지해야 합니다.

그리고 서비스 워커를 등록하려면 HTTP가 아니라 HTTPS로 앱을 제공해야 합니다.
안전하지 않은 프로토콜을 사용하면 브라우저가 서비스 워커 자체를 무시합니다.
이렇게 동작하는 이유는 간단합니다.
서비스 워커는 아주 강력한 도구이기 때문에 서비스 워커 스크립트 자체의 안전성이 특히 중요합니다.

다만 예외가 한가지 있습니다: 로컬 개발을 돕기 위해 `localhost`에서 동작하는 앱에 대해서는 브라우저가 보안 프로토콜을 강제하지 않습니다.


<!--
### Browser support
-->
### 브라우저 지원

<!--
To benefit from the Angular service worker, your application must run in a web browser that supports service workers in general.
Currently, service workers are supported in the latest versions of Chrome, Firefox, Edge, Safari, Opera, UC Browser \(Android version\) and Samsung Internet.
Browsers like IE and Opera Mini do not support service workers.

If the user is accessing your application with a browser that does not support service workers, the service worker is not registered and related behavior such as offline cache management and push notifications does not happen.
More specifically:

*   The browser does not download the service worker script and the `ngsw.json` manifest file
*   Active attempts to interact with the service worker, such as calling `SwUpdate.checkForUpdate()`, return rejected promises
*   The observable events of related services, such as `SwUpdate.versionUpdates`, are not triggered

It is highly recommended that you ensure that your application works even without service worker support in the browser.
Although an unsupported browser ignores service worker caching, it still reports errors if the application attempts to interact with the service worker.
For example, calling `SwUpdate.checkForUpdate()` returns rejected promises.
To avoid such an error, check whether the Angular service worker is enabled using `SwUpdate.isEnabled`.

To learn more about other browsers that are service worker ready, see the [Can I Use](https://caniuse.com/#feat=serviceworkers) page and [MDN docs](https://developer.mozilla.org/docs/Web/API/Service_Worker_API).
-->
Angular 서비스 워커를 제대로 활용하려면 서비스 워커를 지원하는 웹 브라우저를 사용해야 합니다.
현재 서비스 워커는 최신 버전의 Chrome, Firefox, Edge, Safari, Opera, UC Browser(안드로이드 버전), Samsung Internet에서 모두 지원합니다.
그리고 IE와 Opera Mini는 서비스 워커를 지원하지 않습니다.

서비스 워커를 지원하지 않는 브라우저로 앱을 실행하면 서비스워커가 등록되지 않기 때문에 캐시 관리나 푸시 알림과 같은 기능도 동작하지 않습니다.
좀 더 자세하게 살펴보면:

*   브라우저는 서비스 워커 스크립트와 `ngsw.json` 매니페스트 파일을 내려받지 않습니다.
*   이미 동작하고 있는 서비스 워커가 실행하는 `SwUpdate.checkForUpdate()`와 같은 동작은 모두 `rejected` 상태의 Promise로 반환됩니다.
*   이미 동작하고 있는 서비스 워커에서 발생하는 `SwUpdate.versionUpdates`와 같은 옵저버블은 트리거되지 않습니다.

그래서 애플리케이션은 서비스 워커를 지원하지 않는 브라우저에서도 온전히 동작할 수 있게 구현하는 것이 중요합니다.
브라우저가 서비스 워커를 지원하지 않아서 캐싱 기능이 제대로 동작하지 않는다고 해도 앱은 계속해서 서비스 워커를 사용하려고 하기 때문에 에러 메시지가 계속 표시될 것입니다.
그래서 `SwUpdate.checkForUpdate()`가 실행될 때마다 계속 `rejected` 상태로 Promise가 반환될 것입니다.
이런 에러를 방지하려면 `SwUpdate.isEnabled()`를 사용해서 Angular 서비스 워커가 동작할 수 있는 환경인지 먼저 검사하는 것이 좋습니다.

서비스 워커를 지원하는 브라우저에 대해 더 알아보려면 [Can I Use](https://caniuse.com/#feat=serviceworker) 문서와 [MDN docs](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) 문서를 참고하세요.


<!--
## Related resources
-->
## 관련 자료

<!--
The rest of the articles in this section specifically address the Angular implementation of service workers.

*   [Service Worker Communication](guide/service-worker-communications)
*   [Service Worker Notifications](guide/service-worker-notifications)
*   [Service Worker in Production](guide/service-worker-devops)
*   [Service Worker Configuration](guide/service-worker-config)
*   [App Shell](guide/app-shell)

For more information about service workers in general, see [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers).

For more information about browser support, see the [browser support](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support) section of [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers), Jake Archibald's [Is Serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready), and [Can I Use](https://caniuse.com/serviceworkers).

For additional recommendations and examples, see:

*   [Precaching with Angular Service Worker](https://web.dev/precaching-with-the-angular-service-worker)
*   [Creating a PWA with Angular CLI](https://web.dev/creating-pwa-with-angular-cli)
-->
Angular가 제공하는 서비스 워커를 활용하는 방법을 더 알아보려면 다음 자료를 참고하세요.

*   [서비스 워커 통신](guide/service-worker-communications)
*   [서비스 워커 알림 \(Notification\)](guide/service-worker-notifications)
*   [운영환경에 서비스 워커 활용하기](guide/service-worker-devops)
*   [서비스 워커 설정](guide/service-worker-config)
*   [애플리케이션 기본 틀](guide/app-shell)

그리고 서비스 워커의 일반적인 내용에 대해 알아보려면 [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers) 문서를 참고하세요.

브라우저 지원사항에 대해 알아보려면 [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers) 문서의 [browser support](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support) 섹션이나 Jake Archibald가 작성한 [Is Serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready), [Can I Use](https://caniuse.com/serviceworkers) 문서를 참고하세요.

추가로 이런 내용도 확인해 보세요:

*   [Precaching with Angular Service Worker](https://web.dev/precaching-with-the-angular-service-worker)
*   [Creating a PWA with Angular CLI](https://web.dev/creating-pwa-with-angular-cli)


<!--
## Next step
-->
## 더 알아보기

<!--
To begin using Angular service workers, see [Getting Started with service workers](guide/service-worker-getting-started).
-->
Angular에서 서비스 워커를 시작하는 방법은 [서비스 워커 시작하기](guide/service-worker-getting-started) 문서를 참고하세요.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-06
