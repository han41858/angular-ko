<!--
# Getting started with service workers
-->
# 서비스 워커 추가하기

<!--
This document explains how to enable Angular service worker support in projects that you created with the [Angular CLI](cli).
It then uses an example to show you a service worker in action, demonstrating loading and basic caching.
-->
이 문서는 [Angular CLI](cli)로 생성한 프로젝트에 Angular 서비스 워커를 어떻게 도입할 수 있는지 설명합니다.
간단한 예제를 다루면서 서비스 워커를 실제로 동작시켜보고, 로딩과 기본 캐싱 정책에 대해서도 알아봅시다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the information in [Introduction to Angular service workers](guide/service-worker-intro).
-->
이 문서의 내용을 제대로 이해하려면 [Angular 서비스 워커](guide/service-worker-intro)에서 설명하는 기본 내용을 미리 보는 것이 좋습니다.


<a id="cli-command"></a>

<!--
## Adding a service worker to your project
-->
## 프로젝트에 서비스 워커 추가하기

<!--
To set up the Angular service worker in your project, run the following CLI command.

<code-example format="shell" language="shell">

ng add @angular/pwa

</code-example>

The CLI configures your application to use service workers with the following actions:

1.  Adds the `@angular/service-worker` package to your project.
1.  Enables service worker build support in the CLI.
1.  Imports and registers the service worker with the application's root providers.
1.  Updates the `index.html` file:
    *   Includes a link to add the `manifest.webmanifest` file
    *   Adds a meta tag for `theme-color`
1.  Installs icon files to support the installed Progressive Web App \(PWA\).
1.  Creates the service worker configuration file called [`ngsw-config.json`](guide/service-worker-config), 
which specifies the caching behaviors and other settings.

Now, build the project:

<code-example format="shell" language="shell">

ng build

</code-example>

The CLI project is now set up to use the Angular service worker.
-->
프로젝트에 Angular 서비스 워커를 적용하려면 Angular CLI로 이런 명령을 실행하면 됩니다.

<code-example format="shell" language="shell">

ng add @angular/pwa

</code-example>

그러면 Angular CLI가 애플리케이션 서비스 워커를 적용하면서 이런 동작을 실행합니다:

1.  프로젝트에 `@angular/service-worker` 패키지를 추가합니다.
1.  Angular CLI로 빌드할 때 서비스 워커를 활성화하도록 설정합니다.
1.  서비스 워커를 로드하고 애플리케이션 최상위 프로바이더에 등록합니다.
1.  `index.html` 파일을 이렇게 수정합니다:
    *   `manifest.webmanifest` 파일에 대한 링크를 추가합니다.
    *   `theme-color` 메타 태그를 추가합니다.
1.  프로그레시브 웹 앱\(Progressive Web App, PWA\)으로 설치되었을 때 필요한 아이콘 파일을 설치합니다.
1.  서비스 워커 환경설정 파일 [`ngsw-config.json`](guide/service-worker-config)을 생성합니다.
이 파일은 캐싱 정책을 비롯한 서비스 워커의 동작을 정의하는 파일입니다.

그리고 프로젝트를 빌드해봅시다:

<code-example format="shell" language="shell">

ng build

</code-example>

이제 Angular CLI로 만든 프로젝트에 Angular 서비스 워커를 사용할 준비는 끝났습니다.


<!--
## Service worker in action: a tour
-->
## 서비스 워커 사용하기

<!--
This section demonstrates a service worker in action,
using an example application.

<div class="alert is-helpful">

To play along,
<live-example downloadOnly>download the example code</live-example>.

Unzip the download, change to that directory, and enter the following commands in a terminal window,

<code-example format="shell" language="shell">

npm install           # install node packages
ng add @angular/pwa   # setup to use service worker
ng build              # build the app for production; code is in the /dist folder

</code-example>

The Angular development server (`ng serve`) doesn't support service worker applications.
The [`http-server package`](https://www.npmjs.com/package/http-server) from npm does.
You can run it without installing it like this:

<code-example format="shell" language="shell">

npx http-server -p 8080 -c-1 dist/

</code-example>

</div>
-->
이번 섹션에서는 예제 애플리케이션에 서비스 워커를 사용해봅시다.

<div class="alert is-helpful">

직접 실행해보려면 <live-example downloadOnly>download the example code</live-example>를 참고하세요.

예제 프로젝트를 다운받은 후에 압축을 해제하고 이런 명령을 실행하면 됩니다.

<code-example format="shell" language="shell">

npm install           # node 패키지들을 설치합니다.
ng add @angular/pwa   # 서비스 워커를 활성화합니다.
ng build              # 애플리케이션을 빌드합니다. 빌드 결과물은 /dist 폴더에 생성됩니다.

</code-example>

The Angular development server (`ng serve`) doesn't support service worker applications.
The [`http-server package`](https://www.npmjs.com/package/http-server) from npm does.
You can run it without installing it like this:

<code-example format="shell" language="shell">

npx http-server -p 8080 -c-1 dist/

</code-example>

</div>


<!--
### Initial load
-->
### 초기 로드

<!--
With the server running on port `8080`, point your browser at `http://localhost:8080`.
Your application should load normally.

<div class="alert is-helpful">

**TIP**: <br />
When testing Angular service workers, it's a good idea to use an incognito or private window in your browser to ensure the service worker doesn't end up reading from a previous leftover state, which can cause unexpected behavior.

</div>

<div class="alert is-helpful">

**NOTE**: <br />
If you are not using HTTPS, the service worker will only be registered when accessing the application on `localhost`.

</div>
-->
서버를 실행하고 나면 브라우저로 http://localhost:8080/ 에 접근해서 Angular 애플리케이션을 실행할 수 있습니다.

<div class="alert is-helpful">

**팁**: <br />
Angular 서비스 워커를 테스트할 때는 이전에 실행했던 서비스 워커의 영향을 제거하기 위해 브라우저를 시크릿 모드로 실행하는 것이 좋습니다.

</div>

<div class="alert is-helpful">

**참고**: <br />
HTTPS를 사용하지 않으면 `localhost`에서 앱을 실행할 때만 서비스 워커를 등록하고 서비스 워커에 접근할 수 있습니다.

</div>


<!--
### Simulating a network issue
-->
### 네트워크 오류 시뮬레이션하기

<!--
To simulate a network issue, disable network interaction for your application.

In Chrome:

1.  Select **Tools** &gt; **Developer Tools** \(from the Chrome menu located in the top right corner\).
1.  Go to the **Network tab**.
1.  Select **Offline** in the **Throttling** dropdown menu.

<div class="lightbox">

<img alt="The offline option in the Network tab is selected" src="generated/images/guide/service-worker/offline-option.png">

</div>

Now the application has no access to network interaction.

For applications that do not use the Angular service worker, refreshing now would display Chrome's Internet disconnected page that says "There is no Internet connection".

With the addition of an Angular service worker, the application behavior changes.
On a refresh, the page loads normally.

Look at the Network tab to verify that the service worker is active.

<div class="lightbox">

<img alt="Requests are marked as from ServiceWorker" src="generated/images/guide/service-worker/sw-active.png">

</div>

<div class="alert is-helpful">

**NOTE**: <br />
Under the "Size" column, the requests state is `(ServiceWorker)`.
This means that the resources are not being loaded from the network.
Instead, they are being loaded from the service worker's cache.

</div>
-->
네트워크 오류를 시뮬레이션하려면 애플리케이션이 동작하는 네트워크 환경을 조작하면 됩니다.

Chrome이라면 이렇게 합니다:

1.  오른쪽 위 메뉴에서 **도구 더보기** &gt; **개발자 도구**를 선택합니다.
1.  **Network** 탭으로 이동합니다.
1.  **Throttling** 드롭박스에서 **Offline**을 체크합니다.

<div class="lightbox">

<img alt="The offline option in the Network tab is selected" src="generated/images/guide/service-worker/offline-option.png">

</div>

이제는 애플리케이션이 네트워크를 사용할 수 없습니다.

서비스 워커를 사용하지 않는 Angular 애플리케이션이라면, 이 상태에서 화면을 새로고침 했을 때 인터넷이 연결되지 않았다는 메시지가 표시될 것입니다.

<div class="lightbox">

<img alt="Requests are marked as from ServiceWorker" src="generated/images/guide/service-worker/sw-active.png">

</div>

<div class="alert is-helpful">

**참고**: <br />
네트워크 탭에서 Size 행을 확인해보면 `(ServiceWorker)`라는 부분을 확인할 수 있습니다.
이 말은 애플리케이션 실행에 필요한 리소스를 네트워크를 사용하지 않고 로드했다는 의미입니다.
이 리소스들은 서비스 워커의 캐시에서 로드한 것입니다.

</div>


<!--
### What's being cached?
-->
### 캐시 안에는 어떤 것들이 있을까?

<!--
Notice that all of the files the browser needs to render this application are cached.
The `ngsw-config.json` boilerplate configuration is set up to cache the specific resources used by the CLI:

*   `index.html`
*   `favicon.ico`
*   Build artifacts \(JS and CSS bundles\)
*   Anything under `assets`
*   Images and fonts directly under the configured `outputPath` \(by default `./dist/<project-name>/`\) or `resourcesOutputPath`.
    See [`ng build`](cli/build) for more information about these options.

<div class="alert is-important">

Pay attention to two key points:

1.  The generated `ngsw-config.json` includes a limited list of cacheable fonts and images extensions.
    In some cases, you might want to modify the glob pattern to suit your needs.

1.  If `resourcesOutputPath` or `assets` paths are modified after the generation of configuration file, you need to change the paths manually in `ngsw-config.json`.

</div>
-->
브라우저가 애플리케이션을 렌더링하기 위해 필요한 리소스들은 모두 캐싱됩니다.
그래서 Angular CLI가 생성한 `ngsw-config.json` 파일에는 다음과 같은 항목들이 캐싱되도록 설정되어 있습니다:

*   `index.html`
*   `favicon.ico`
*   빌드 결과물 \(JS, CSS 번들 파일\)
*   `assets` 폴더에 있는 모든 파일
*   `outputPath` \(기본값은 `./dist/<project-name>/`\)와 `resourcesOutputPath`로 지정된 폴더에 있는 이미지 파일과 폰트 파일.
    자세한 내용은 [`ng build`](cli/build) 문서를 참고하세요.

<div class="alert is-important">

다음 두가지를 주의해야 합니다:

1.  `ngsw-config.json` 파일에서 캐싱하도록 설정한 폰트와 이미지 파일의 확장자는 모든 파일을 대상으로 하는 것이 아닙니다.
    이 설정을 수정해야 하는 경우도 있습니다.

1.  `resourcesOutputPath`나 `assets` 경로를 변경하고 나면 이 내용을 `ngsw-config.json` 파일에도 반영해야 합니다.

</div>


<!--
### Making changes to your application
-->
### 애플리케이션 코드 수정하기

<!--
Now that you've seen how service workers cache your application, the next step is understanding how updates work.
Make a change to the application, and watch the service worker install the update:

1.  If you're testing in an incognito window, open a second blank tab.
    This keeps the incognito and the cache state alive during your test.

1.  Close the application tab, but not the window.
    This should also close the Developer Tools.

1.  Shut down `http-server` (Ctrl-c).
1.  Open `src/app/app.component.html` for editing.
1.  Change the text `Welcome to {{title}}!` to `Bienvenue à {{title}}!`.
1.  Build and run the server again:

    <code-example format="shell" language="shell">

    ng build
    http-server -p 8080 -c-1 dist/&lt;project-name&gt;

    </code-example>
-->
지금까지 서비스 워커가 애플리케이션을 어떻게 캐싱하는지 알아봤습니다.
이제 애플리케이션 코드를 수정하면 어떻게하면 되는지 알아봅시다.
애플리케이션을 수정하고 서비스 워커가 이 변경사항을 반영할 수 있도록 작업해 봅시다:

1.  브라우저를 시크릿 모드로 실행한 상태에서 탭을 새로 엽니다.
    그러면 이전에 사용하던 캐시 상태가 그대로 유지될 것입니다.

1.  윈도우창 말고 애플리케이션이 실행되고 있는 탭을 닫습니다.
    이 때 닫은 탭과 연결된 개발자 도구도 함께 닫힙니다.

1.  Ctrl-c를 눌러서 `http-server` 서버를 중지합니다.
1.  `src/app/app.component.html` 파일을 엽니다.
1.  `Welcome to {{title}}!`를 `Bienvenue à {{title}}!`로 변경합니다.
1.  애플리케이션을 다시 빌드하고 서버를 실행합니다:

    <code-example format="shell" language="shell">

    ng build
    npx http-server -p 8080 -c-1 dist/

    </code-example>

<!--
### Updating your application in the browser
-->
### 브라우저에 있는 애플리케이션 갱신하기

<!--
Now look at how the browser and service worker handle the updated application.

1.  Open [http://localhost:8080](http://localhost:8080) again in the same window.
    What happens?

    <div class="lightbox">

    <img alt="It still says Welcome to Service Workers!" src="generated/images/guide/service-worker/welcome-msg-en.png">

    </div>

    What went wrong?
    _Nothing, actually!_
    
    The Angular service worker is doing its job and serving the version of the application that it has **installed**, even though there is an update available.
    In the interest of speed, the service worker doesn't wait to check for updates before it serves the application that it has cached.

    <br>

    Look at the `http-server` logs to see the service worker requesting `/ngsw.json`.

    <code-example format="shell" language="shell">

    [2023-09-07T00:37:24.372Z]  "GET /ngsw.json?ngsw-cache-bust=0.9365263935102124" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"

    </code-example>

    This is how the service worker checks for updates.

1.  Refresh the page.

    <div class="lightbox">

    <img alt="The text has changed to say Bienvenue à app!" src="generated/images/guide/service-worker/welcome-msg-fr.png">

    </div>

    The service worker installed the updated version of your application *in the background*, and the next time the page is loaded or reloaded, the service worker switches to the latest version.
-->
이제 브라우저와 서비스 워커가 어떻게 동작하는지 확인해 봅시다.

1.  이전에 열었던 윈도우에서 [http://localhost:8080](http://localhost:8080)로 접속합니다.
    어떤 화면이 보이나요?

    <div class="lightbox">

    <img alt="It still says Welcome to Service Workers!" src="generated/images/guide/service-worker/welcome-msg-en.png">

    </div>

    무언가 잘못된 걸까요? _아닙니다._
    Angular 서비스 워커는 이미 **설치된** 애플리케이션을 실행하는 원래 역할을 다하고 있을 뿐입니다.
    애플리케이션을 빠르게 실행하기 위해서, 이미 애플리케이션을 실행하고 있는 상태라면 서비스 워커는 새로운 업데이트가 있는지 확인하지 않습니다.

    <br>

    `http-server`가 출력한 로그를 확인해보면 서비스 워커가 `ngsw.json` 파일을 요청한 것을 확인할 수 있습니다.

    <code-example format="shell" language="shell">

    [2023-09-07T00:37:24.372Z]  "GET /ngsw.json?ngsw-cache-bust=0.9365263935102124" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"

    </code-example>

    서비스 워커는 이 파일의 내용을 보고 업데이트를 해야 할지 판단합니다.

1.  페이지를 새로고침 해봅시다.

    <div class="lightbox">

    <img alt="The text has changed to say Bienvenue à app!" src="generated/images/guide/service-worker/welcome-msg-fr.png">

    </div>

    서비스 워커는 애플리케이션을 *백그라운드에서* 설치하고 업데이트합니다.
    그래서 페이지가 다시 로드되면 애플리케이션이 최신 버전으로 실행됩니다.


<!--
## More on Angular service workers
-->
## 더 알아보기

<!--
You might also be interested in the following:

*   [Communicating with service workers](guide/service-worker-communications)
*   [App Shell](guide/app-shell)
-->
이제 이런 내용을 확인해 보세요:

*   [서비스 워커로 통신하기](guide/service-worker-communications)
*   [앱 기본 틀](guide/app-shell)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-06
