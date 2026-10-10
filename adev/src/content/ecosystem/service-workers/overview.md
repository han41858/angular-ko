<!--
# Angular service worker overview
-->

<a id="angular-service-worker-overview"></a>

# Angular 서비스 워커 개요

<!--
IMPORTANT: The Angular Service Worker is a basic caching utility for simple offline support with a limited featureset. We will not be accepting any new features other than security fixes. For more advanced caching and offline capabilities, we recommend exploring native browser APIs directly.

Service workers augment the traditional web deployment model and empower applications to deliver a user experience with the reliability and performance on par with code that is written to run on your operating system and hardware.
Adding a service worker to an Angular application is one of the steps for turning an application into a [Progressive Web App](https://web.dev/progressive-web-apps/) (also known as a PWA).

At its simplest, a service worker is a script that runs in the web browser and manages caching for an application.

Service workers function as a network proxy.
They intercept all outgoing HTTP requests made by the application and can choose how to respond to them.
For example, they can query a local cache and deliver a cached response if one is available.
Proxying isn't limited to requests made through programmatic APIs, such as `fetch`; it also includes resources referenced in HTML and even the initial request to `index.html`.
Service worker-based caching is thus completely programmable and doesn't rely on server-specified caching headers.

Unlike the other scripts that make up an application, such as the Angular application bundle, the service worker is preserved after the user closes the tab.
The next time that browser loads the application, the service worker loads first, and can intercept every request for resources to load the application.
If the service worker is designed to do so, it can _completely satisfy the loading of the application, without the need for the network_.

Even across a fast reliable network, round-trip delays can introduce significant latency when loading the application.
Using a service worker to reduce dependency on the network can significantly improve the user experience.
-->

중요: Angular 서비스 워커는 간단한 오프라인 지원을 위한 기본 캐싱 유틸리티이며, 제한된 기능을 제공합니다.
보안 수정 외에 새로운 기능은 추가하지 않습니다.
더 고급 캐싱 및 오프라인 기능이 필요하다면 브라우저의 기본 API를 직접 살펴보는 것을 권장합니다.

서비스 워커는 기존 웹 배포 모델을 보완하며, 애플리케이션이 운영체제와 하드웨어에서 직접 실행되도록 작성된 코드에 견줄 만한 안정성과 성능으로 사용자 경험을 제공할 수 있게 합니다.
Angular 애플리케이션에 서비스 워커를 추가하는 것은 애플리케이션을 [프로그레시브 웹 앱](https://web.dev/progressive-web-apps/)(PWA)으로 만드는 과정의 한 단계입니다.

간단히 말하면 서비스 워커는 웹 브라우저에서 실행되며 애플리케이션 캐싱을 관리하는 스크립트입니다.

서비스 워커는 네트워크 프록시로 동작합니다.
애플리케이션에서 외부로 보내는 모든 HTTP 요청을 가로채고, 어떻게 응답할지 선택할 수 있습니다.
예를 들어 로컬 캐시를 조회해서 캐시된 응답이 있으면 이를 제공할 수 있습니다.
프록시 처리는 `fetch` 같은 프로그래밍 API로 보낸 요청에만 한정되지 않습니다.
HTML에서 참조한 리소스는 물론 `index.html`에 대한 최초 요청까지 포함합니다.
따라서 서비스 워커 기반 캐싱은 서버가 지정한 캐싱 헤더에 의존하지 않고 코드로 완전히 제어할 수 있습니다.

Angular 애플리케이션 번들처럼 애플리케이션을 구성하는 다른 스크립트와 달리 서비스 워커는 사용자가 탭을 닫아도 유지됩니다.
다음에 브라우저에서 애플리케이션을 로딩할 때는 서비스 워커가 먼저 로딩되어, 애플리케이션을 로딩하기 위한 모든 리소스 요청을 가로챌 수 있습니다.
그렇게 설계한 서비스 워커라면 _네트워크 없이 애플리케이션을 완전히 로딩_ 할 수 있습니다.

빠르고 안정적인 네트워크에서도 요청과 응답이 오가는 지연으로 인해 애플리케이션 로딩이 상당히 느려질 수 있습니다.
서비스 워커로 네트워크 의존도를 줄이면 사용자 경험을 크게 개선할 수 있습니다.

<!--
## Service workers in Angular
-->

<a id="service-workers-in-angular"></a>

## Angular의 서비스 워커

<!--
Angular applications, as single-page applications, are in a prime position to benefit from the advantages of service workers. Angular ships with a service worker implementation. Angular developers can take advantage of this service worker and benefit from the increased reliability and performance it provides, without needing to code against low-level APIs.

Angular's service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

To achieve this, the Angular service worker follows these guidelines:

- Caching an application is like installing a native application.
  The application is cached as one unit, and all files update together.

- A running application continues to run with the same version of all files.
  It does not suddenly start receiving cached files from a newer version, which are likely incompatible.

- When users refresh the application, they see the latest fully cached version.
  New tabs load the latest cached code.

- Updates happen in the background, relatively quickly after changes are published.
  The previous version of the application is served until an update is installed and ready.

- The service worker conserves bandwidth when possible.
  Resources are only downloaded if they've changed.

To support these behaviors, the Angular service worker loads a _manifest_ file from the server.
The file, called `ngsw.json` (not to be confused with the [web app manifest](https://developer.mozilla.org/docs/Web/Manifest)), describes the resources to cache and includes hashes of every file's contents.
When an update to the application is deployed, the contents of the manifest change, informing the service worker that a new version of the application should be downloaded and cached.
This manifest is generated from a CLI-generated configuration file called `ngsw-config.json`.

Installing the Angular service worker is as straightforward as [running an Angular CLI command](ecosystem/service-workers/getting-started#adding-a-service-worker-to-your-project).
In addition to registering the Angular service worker with the browser, this also makes a few services available for injection which interact with the service worker and can be used to control it.
For example, an application can ask to be notified when a new update becomes available, or an application can ask the service worker to check the server for available updates.
-->

Angular 애플리케이션은 단일 페이지 애플리케이션이므로 서비스 워커의 이점을 활용하기에 적합합니다.
Angular는 서비스 워커 구현을 함께 제공합니다.
Angular 개발자는 저수준 API를 직접 다루는 코드를 작성하지 않고도 이 서비스 워커를 활용해서 안정성과 성능을 높일 수 있습니다.

Angular 서비스 워커는 오래된 콘텐츠를 제공할 위험을 최소화하면서, 느리거나 불안정한 네트워크에서도 최종 사용자의 애플리케이션 이용 경험을 최적화하도록 설계되었습니다.

이를 위해 Angular 서비스 워커는 다음 원칙을 따릅니다:

- 애플리케이션을 캐시에 저장하는 것은 네이티브 애플리케이션을 설치하는 것과 같습니다.
  애플리케이션을 하나의 단위로 캐시에 저장하고 모든 파일을 함께 업데이트합니다.

- 실행 중인 애플리케이션은 모든 파일을 동일한 버전으로 계속 사용합니다.
  호환되지 않을 수 있는 새 버전의 캐시 파일을 갑자기 제공하지 않습니다.

- 사용자가 애플리케이션을 새로고침하면 캐시에 완전히 저장된 최신 버전이 표시됩니다.
  새 탭은 캐시에 저장된 최신 코드를 로딩합니다.

- 변경 사항을 배포하면 비교적 빠르게 백그라운드에서 업데이트합니다.
  업데이트 설치와 준비가 끝날 때까지는 이전 버전의 애플리케이션을 제공합니다.

- 가능한 한 대역폭을 절약합니다.
  리소스가 변경된 경우에만 다운로드합니다.

이 동작을 지원하기 위해 Angular 서비스 워커는 서버에서 _매니페스트_ 파일을 로딩합니다.
`ngsw.json`이라는 이 파일은 캐시에 저장할 리소스를 설명하고 각 파일 내용의 해시를 포함합니다.
[웹 앱 매니페스트](https://developer.mozilla.org/docs/Web/Manifest)와 혼동하지 않도록 하세요.
애플리케이션 업데이트를 배포하면 매니페스트 내용이 바뀌므로 서비스 워커는 새 애플리케이션 버전을 다운로드해서 캐시에 저장해야 한다는 것을 알 수 있습니다.
이 매니페스트는 CLI가 생성한 `ngsw-config.json` 설정 파일을 바탕으로 생성됩니다.

Angular 서비스 워커 설치는 [Angular CLI 명령을 실행](ecosystem/service-workers/getting-started#adding-a-service-worker-to-your-project)하는 것만큼 간단합니다.
이 명령은 Angular 서비스 워커를 브라우저에 등록하고, 서비스 워커와 상호작용하거나 제어할 수 있는 서비스를 의존성으로 주입할 수 있도록 제공합니다.
예를 들어 새 업데이트를 사용할 수 있을 때 알림을 받도록 하거나, 서비스 워커에 서버에서 사용 가능한 업데이트를 확인하도록 요청할 수 있습니다.

<!--
## Before you start
-->

<a id="before-you-start"></a>

## 시작하기 전에

<!--
To make use of all the features of Angular service workers, use the latest versions of Angular and the [Angular CLI](tools/cli).

For service workers to be registered, the application must be accessed over HTTPS, not HTTP.
Browsers ignore service workers on pages that are served over an insecure connection.
The reason is that service workers are quite powerful, so extra care is needed to ensure the service worker script has not been tampered with.

There is one exception to this rule: to make local development more straightforward, browsers do _not_ require a secure connection when accessing an application on `localhost`.
-->

Angular 서비스 워커의 모든 기능을 활용하려면 최신 버전의 Angular와 [Angular CLI](tools/cli)를 사용하세요.

서비스 워커를 등록하려면 HTTP가 아닌 HTTPS로 애플리케이션에 접근해야 합니다.
브라우저는 안전하지 않은 연결로 제공되는 페이지의 서비스 워커를 무시합니다.
서비스 워커는 매우 강력하므로 스크립트가 변조되지 않았는지 더욱 주의해야 하기 때문입니다.

이 규칙에는 한 가지 예외가 있습니다.
로컬 개발을 간편하게 할 수 있도록 브라우저는 `localhost`의 애플리케이션에 접근할 때 안전한 연결을 요구하지 _않습니다_.

<!--
### Browser support
-->

<a id="browser-support"></a>

### 브라우저 지원

<!--
To benefit from the Angular service worker, your application must run in a web browser that supports service workers in general.
Currently, service workers are supported in the latest versions of Chrome, Firefox, Edge, Safari, Opera, UC Browser (Android version) and Samsung Internet.
Browsers like IE and Opera Mini do not support service workers.

If the user is accessing your application with a browser that does not support service workers, the service worker is not registered and related behavior such as offline cache management and push notifications does not happen.
More specifically:

- The browser does not download the service worker script and the `ngsw.json` manifest file
- Active attempts to interact with the service worker, such as calling `SwUpdate.checkForUpdate()`, return rejected promises
- The observable events of related services, such as `SwUpdate.available`, are not triggered

It is highly recommended that you ensure that your application works even without service worker support in the browser.
Although an unsupported browser ignores service worker caching, it still reports errors if the application attempts to interact with the service worker.
For example, calling `SwUpdate.checkForUpdate()` returns rejected promises.
To avoid such an error, check whether the Angular service worker is enabled using `SwUpdate.isEnabled`.

To learn more about other browsers that are service worker ready, see the [Can I Use](https://caniuse.com/#feat=serviceworkers) page and [MDN docs](https://developer.mozilla.org/docs/Web/API/Service_Worker_API).
-->

Angular 서비스 워커를 활용하려면 서비스 워커를 지원하는 웹 브라우저에서 애플리케이션을 실행해야 합니다.
현재 Chrome, Firefox, Edge, Safari, Opera, UC Browser(Android 버전), Samsung Internet의 최신 버전이 서비스 워커를 지원합니다.
IE, Opera Mini 등의 브라우저는 서비스 워커를 지원하지 않습니다.

사용자가 서비스 워커를 지원하지 않는 브라우저로 애플리케이션에 접근하면 서비스 워커가 등록되지 않으며, 오프라인 캐시 관리와 푸시 알림 같은 관련 기능도 동작하지 않습니다.
구체적으로는 다음과 같습니다:

- 브라우저가 서비스 워커 스크립트와 `ngsw.json` 매니페스트 파일을 다운로드하지 않습니다.
- `SwUpdate.checkForUpdate()` 호출처럼 서비스 워커와 직접 상호작용하려는 시도는 거부된 Promise를 반환합니다.
- `SwUpdate.available` 같은 관련 서비스의 Observable 이벤트가 발생하지 않습니다.

브라우저가 서비스 워커를 지원하지 않아도 애플리케이션이 동작하도록 하는 것을 적극 권장합니다.
지원하지 않는 브라우저는 서비스 워커 캐싱을 무시하지만, 애플리케이션이 서비스 워커와 상호작용하려고 하면 에러를 보고합니다.
예를 들어 `SwUpdate.checkForUpdate()`를 호출하면 거부된 Promise를 반환합니다.
이런 에러를 방지하려면 `SwUpdate.isEnabled`로 Angular 서비스 워커가 활성화되어 있는지 확인하세요.

서비스 워커를 지원하는 다른 브라우저에 대한 자세한 내용은 [Can I Use](https://caniuse.com/#feat=serviceworkers) 페이지와 [MDN 문서](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)를 참고하세요.

<!--
## Related resources
-->

<a id="related-resources"></a>

## 관련 자료

<!--
The rest of the articles in this section specifically address the Angular implementation of service workers.

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/config" title="Configuration file"/>
  <docs-pill href="ecosystem/service-workers/communications" title="Communicating with the Service Worker"/>
  <docs-pill href="ecosystem/service-workers/push-notifications" title="Push notifications"/>
  <docs-pill href="ecosystem/service-workers/devops" title="Service Worker devops"/>
  <docs-pill href="ecosystem/service-workers/app-shell" title="App shell pattern"/>
</docs-pill-row>

For more information about service workers in general, see [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers).

For more information about browser support, see the [browser support](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support) section of [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers), Jake Archibald's [Is Serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready), and [Can I Use](https://caniuse.com/serviceworkers).

For additional recommendations and examples, see:

<docs-pill-row>
  <docs-pill href="https://web.dev/precaching-with-the-angular-service-worker" title="Precaching with Angular Service Worker"/>
  <docs-pill href="https://web.dev/creating-pwa-with-angular-cli" title="Creating a PWA with Angular CLI"/>
</docs-pill-row>
-->

이 섹션의 나머지 문서에서는 Angular의 서비스 워커 구현을 구체적으로 다룹니다.

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/config" title="설정 파일"/>
  <docs-pill href="ecosystem/service-workers/communications" title="서비스 워커와 통신하기"/>
  <docs-pill href="ecosystem/service-workers/push-notifications" title="푸시 알림"/>
  <docs-pill href="ecosystem/service-workers/devops" title="서비스 워커 운영"/>
  <docs-pill href="ecosystem/service-workers/app-shell" title="앱 셸 패턴"/>
</docs-pill-row>

서비스 워커에 대한 일반적인 내용은 [서비스 워커 소개](https://developers.google.com/web/fundamentals/primers/service-workers)를 참고하세요.

브라우저 지원에 대한 자세한 내용은 [서비스 워커 소개](https://developers.google.com/web/fundamentals/primers/service-workers)의 [브라우저 지원](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support) 섹션, Jake Archibald의 [Is Serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready), [Can I Use](https://caniuse.com/serviceworkers)를 참고하세요.

추가 권장 사항과 예제는 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="https://web.dev/precaching-with-the-angular-service-worker" title="Angular 서비스 워커로 미리 캐싱하기"/>
  <docs-pill href="https://web.dev/creating-pwa-with-angular-cli" title="Angular CLI로 PWA 만들기"/>
</docs-pill-row>

<!--
## Next step
-->

<a id="next-step"></a>

## 다음 단계

<!--
To begin using Angular service workers, see [Getting Started with service workers](ecosystem/service-workers/getting-started).
-->

Angular 서비스 워커를 사용하기 시작하려면 [서비스 워커 시작하기](ecosystem/service-workers/getting-started)를 참고하세요.
