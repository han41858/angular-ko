<!--
# Getting started with service workers
-->

<a id="getting-started-with-service-workers"></a>

# 서비스 워커 시작하기

<!--
This document explains how to enable Angular service worker support in projects that you created with the [Angular CLI](tools/cli). It then uses an example to show you a service worker in action, demonstrating loading and basic caching.
-->

이 문서에서는 [Angular CLI](tools/cli)로 생성한 프로젝트에서 Angular 서비스 워커 지원을 활성화하는 방법을 설명합니다.
이후 예제에서 실제 서비스 워커의 동작을 살펴보며 로딩과 기본 캐싱을 알아봅니다.

<!--
## Adding a service worker to your project
-->

<a id="adding-a-service-worker-to-your-project"></a>

## 프로젝트에 서비스 워커 추가하기

<!--
To set up the Angular service worker in your project, run the following CLI command:

```shell

ng add @angular/pwa

```

The CLI configures your application to use service workers with the following actions:

1. Adds the `@angular/service-worker` package to your project.
1. Enables service worker build support in the CLI.
1. Imports and registers the service worker with the application's root providers.
1. Updates the `index.html` file:
   - Includes a link to add the `manifest.webmanifest` file
   - Adds a meta tag for `theme-color`
1. Installs icon files to support the installed Progressive Web App (PWA).
1. Creates the service worker configuration file called [`ngsw-config.json`](ecosystem/service-workers/config),
   which specifies the caching behaviors and other settings.

Now, build the project:

```shell

ng build

```

The CLI project is now set up to use the Angular service worker.
-->

프로젝트에 Angular 서비스 워커를 설정하려면 다음 CLI 명령을 실행하세요:

```shell

ng add @angular/pwa

```

CLI는 다음 작업을 수행해서 서비스 워커를 사용하도록 애플리케이션을 설정합니다:

1. 프로젝트에 `@angular/service-worker` 패키지를 추가합니다.
1. CLI에서 서비스 워커 빌드 지원을 활성화합니다.
1. 애플리케이션의 루트 프로바이더에서 서비스 워커를 불러오고 등록합니다.
1. `index.html` 파일을 갱신합니다:
   - `manifest.webmanifest` 파일을 추가하는 링크를 포함합니다.
   - `theme-color` 메타 태그를 추가합니다.
1. 설치된 프로그레시브 웹 앱(PWA)을 지원할 아이콘 파일을 추가합니다.
1. 캐싱 동작과 기타 설정을 지정하는 서비스 워커 설정 파일인 [`ngsw-config.json`](ecosystem/service-workers/config)을 생성합니다.

이제 프로젝트를 빌드하세요:

```shell

ng build

```

이제 CLI 프로젝트가 Angular 서비스 워커를 사용하도록 설정되었습니다.

<!--
## Service worker in action: a tour
-->

<a id="service-worker-in-action-a-tour"></a>

## 서비스 워커 동작 살펴보기

<!--
This section demonstrates a service worker in action,
using an example application. To enable service worker support during local development, use the production configuration with the following command:

```shell

ng serve --configuration=production

```

Alternatively, you can use the [`http-server package`](https://www.npmjs.com/package/http-server) from
npm, which supports service worker applications. Run it without installation using:

```shell

npx http-server -p 8080 -c-1 dist/<project-name>/browser

```

This will serve your application with service worker support at http://localhost:8080.
-->

이 섹션에서는 예제 애플리케이션을 통해 서비스 워커의 실제 동작을 살펴봅니다.
로컬 개발 중에 서비스 워커 지원을 활성화하려면 다음 명령으로 프로덕션 설정을 사용하세요:

```shell

ng serve --configuration=production

```

또는 서비스 워커 애플리케이션을 지원하는 npm의 [`http-server` 패키지](https://www.npmjs.com/package/http-server)를 사용할 수 있습니다.
설치하지 않고 실행하려면 다음 명령을 사용하세요:

```shell

npx http-server -p 8080 -c-1 dist/<project-name>/browser

```

서비스 워커를 지원하는 애플리케이션이 http://localhost:8080 에서 제공됩니다.

<!--
### Initial load
-->

<a id="initial-load"></a>

### 처음 로딩하기

<!--
With the server running on port `8080`, point your browser at `http://localhost:8080`.
Your application should load normally.

TIP: When testing Angular service workers, it's a good idea to use an incognito or private window in your browser to ensure the service worker doesn't end up reading from a previous leftover state, which can cause unexpected behavior.

HELPFUL: If you are not using HTTPS, the service worker will only be registered when accessing the application on `localhost`.
-->

서버가 `8080` 포트에서 실행 중이라면 브라우저에서 `http://localhost:8080`에 접근하세요.
애플리케이션이 정상적으로 로딩됩니다.

팁: Angular 서비스 워커를 테스트할 때는 브라우저의 시크릿 창이나 비공개 창을 사용하는 것이 좋습니다.
이전에 남아 있는 상태를 서비스 워커가 읽어서 예기치 않은 동작이 발생하는 것을 방지할 수 있습니다.

도움말: HTTPS를 사용하지 않는다면 `localhost`에서 애플리케이션에 접근할 때만 서비스 워커가 등록됩니다.

<!--
### Simulating a network issue
-->

<a id="simulating-a-network-issue"></a>

### 네트워크 문제 재현하기

<!--
To simulate a network issue, disable network interaction for your application.

In Chrome:

1. Select **Tools** > **Developer Tools** (from the Chrome menu located in the top right corner).
1. Go to the **Network tab**.
1. Select **Offline** in the **Throttling** dropdown menu.

<img alt="The offline option in the Network tab is selected" src="assets/images/guide/service-worker/offline-option.png">

Now the application has no access to network interaction.

For applications that do not use the Angular service worker, refreshing now would display Chrome's Internet disconnected page that says "There is no Internet connection".

With the addition of an Angular service worker, the application behavior changes.
On a refresh, the page loads normally.

Look at the Network tab to verify that the service worker is active.

<img alt="Requests are marked as from ServiceWorker" src="assets/images/guide/service-worker/sw-active.png">

HELPFUL: Under the "Size" column, the requests state is `(ServiceWorker)`.
This means that the resources are not being loaded from the network.
Instead, they are being loaded from the service worker's cache.
-->

네트워크 문제를 재현하려면 애플리케이션의 네트워크 통신을 비활성화하세요.

Chrome에서는 다음과 같이 합니다:

1. 오른쪽 위의 Chrome 메뉴에서 **Tools** > **Developer Tools**를 선택합니다.
1. **Network 탭**으로 이동합니다.
1. **Throttling** 드롭다운 메뉴에서 **Offline**을 선택합니다.

<img alt="Network 탭에서 Offline 옵션을 선택한 모습" src="assets/images/guide/service-worker/offline-option.png">

이제 애플리케이션에서 네트워크 통신을 할 수 없습니다.

Angular 서비스 워커를 사용하지 않는 애플리케이션은 이 상태에서 새로고침하면 Chrome의 인터넷 연결 끊김 페이지가 표시되며 "There is no Internet connection"이라고 안내합니다.

Angular 서비스 워커를 추가하면 애플리케이션의 동작이 달라집니다.
새로고침해도 페이지가 정상적으로 로딩됩니다.

Network 탭에서 서비스 워커가 동작하는지 확인해 보세요.

<img alt="ServiceWorker에서 제공된 것으로 표시된 요청" src="assets/images/guide/service-worker/sw-active.png">

도움말: "Size" 열에서 요청의 상태가 `(ServiceWorker)`로 표시됩니다.
이는 리소스를 네트워크에서 로딩하지 않는다는 의미입니다.
서비스 워커의 캐시에서 로딩하는 것입니다.

<!--
### What's being cached?
-->

<a id="whats-being-cached"></a>

### 무엇이 캐시에 저장되나요?

<!--
Notice that all of the files the browser needs to render this application are cached.
The `ngsw-config.json` boilerplate configuration is set up to cache the specific resources used by the CLI:

- `index.html`
- `favicon.ico`
- Build artifacts (JS and CSS bundles)
- Anything under `assets`
- Images and fonts directly under the configured `outputPath` (by default `./dist/<project-name>/`) or `resourcesOutputPath`.
  See the documentation for `ng build` for more information about these options.

IMPORTANT: The generated `ngsw-config.json` includes a limited list of cacheable fonts and images extensions. In some cases, you might want to modify the glob pattern to suit your needs.

IMPORTANT: If `resourcesOutputPath` or `assets` paths are modified after the generation of configuration file, you need to change the paths manually in `ngsw-config.json`.
-->

브라우저가 이 애플리케이션을 렌더링하는 데 필요한 모든 파일이 캐시에 저장됩니다.
기본으로 생성된 `ngsw-config.json`은 CLI가 사용하는 다음 리소스를 캐시에 저장하도록 설정되어 있습니다:

- `index.html`
- `favicon.ico`
- 빌드 결과물(JS와 CSS 번들)
- `assets` 안에 있는 모든 파일
- 설정한 `outputPath`(기본값은 `./dist/<project-name>/`) 또는 `resourcesOutputPath` 바로 아래에 있는 이미지와 폰트
  이 옵션에 대한 자세한 내용은 `ng build` 문서를 참고하세요.

중요: 생성된 `ngsw-config.json`에는 캐시에 저장할 수 있는 폰트와 이미지 확장자가 제한된 목록으로 포함됩니다.
필요에 따라 glob 패턴을 수정해야 할 수 있습니다.

중요: 설정 파일을 생성한 뒤 `resourcesOutputPath`나 `assets` 경로를 변경했다면, `ngsw-config.json`의 경로도 직접 변경해야 합니다.

<!--
### Making changes to your application
-->

<a id="making-changes-to-your-application"></a>

### 애플리케이션 변경하기

<!--
Now that you've seen how service workers cache your application, the next step is understanding how updates work.
Make a change to the application, and watch the service worker install the update:

1. If you're testing in an incognito window, open a second blank tab.
   This keeps the incognito and the cache state alive during your test.

1. Close the application tab, but not the window.
   This should also close the Developer Tools.

1. Shut down `http-server` (Ctrl-c).
1. Open `src/app/app.component.html` for editing.
1. Change the text `Welcome to {{title}}!` to `Bienvenue à {{title}}!`.
1. Build and run the server again:

```shell
    ng build
    npx http-server -p 8080 -c-1 dist/<project-name>/browser
```
-->

서비스 워커가 애플리케이션을 캐시에 저장하는 방법을 살펴보았으니, 다음으로 업데이트가 어떻게 동작하는지 알아봅시다.
애플리케이션을 변경한 뒤 서비스 워커가 업데이트를 설치하는 과정을 확인하세요:

1. 시크릿 창에서 테스트 중이라면 두 번째 빈 탭을 엽니다.
   테스트하는 동안 시크릿 모드와 캐시 상태를 유지하기 위해서입니다.

1. 창은 그대로 두고 애플리케이션 탭을 닫습니다.
   개발자 도구도 함께 닫힙니다.

1. `http-server`를 종료합니다(Ctrl-c).
1. 수정할 `src/app/app.component.html` 파일을 엽니다.
1. `Welcome to {{title}}!` 문구를 `Bienvenue à {{title}}!`로 바꿉니다.
1. 다시 빌드하고 서버를 실행합니다:

```shell
    ng build
    npx http-server -p 8080 -c-1 dist/<project-name>/browser
```

<!--
### Updating your application in the browser
-->

<a id="updating-your-application-in-the-browser"></a>

### 브라우저에서 애플리케이션 업데이트하기

<!--
Now look at how the browser and service worker handle the updated application.

1. Open [http://localhost:8080](http://localhost:8080) again in the same window.
   What happens?

   <img alt="It still says Welcome to Service Workers!" src="assets/images/guide/service-worker/welcome-msg-en.png">

   What went wrong?
   _Nothing, actually!_
   The Angular service worker is doing its job and serving the version of the application that it has **installed**, even though there is an update available.
   In the interest of speed, the service worker doesn't wait to check for updates before it serves the application that it has cached.

   Look at the `http-server` logs to see the service worker requesting `/ngsw.json`.

   ```text
   [2023-09-07T00:37:24.372Z]  "GET /ngsw.json?ngsw-cache-bust=0.9365263935102124" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
   ```

   This is how the service worker checks for updates.

1. Refresh the page.

   <img alt="The text has changed to say Bienvenue à app!" src="assets/images/guide/service-worker/welcome-msg-fr.png">

   The service worker installed the updated version of your application _in the background_, and the next time the page is loaded or reloaded, the service worker switches to the latest version.
-->

이제 브라우저와 서비스 워커가 업데이트된 애플리케이션을 어떻게 처리하는지 살펴봅시다.

1. 같은 창에서 [http://localhost:8080](http://localhost:8080)을 다시 엽니다.
   어떻게 되나요?

   <img alt="여전히 Welcome to Service Workers!로 표시된 모습" src="assets/images/guide/service-worker/welcome-msg-en.png">

   무엇이 잘못된 걸까요?
   _사실 아무 문제도 없습니다!_
   Angular 서비스 워커는 업데이트가 있어도 자신이 **설치한** 애플리케이션 버전을 제공하며, 제 역할을 수행하고 있습니다.
   빠르게 제공하기 위해 서비스 워커는 업데이트 확인을 기다리지 않고 캐시에 저장된 애플리케이션을 제공합니다.

   `http-server` 로그에서 서비스 워커가 `/ngsw.json`을 요청하는지 확인해 보세요.

   ```text
   [2023-09-07T00:37:24.372Z]  "GET /ngsw.json?ngsw-cache-bust=0.9365263935102124" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
   ```

   서비스 워커는 이렇게 업데이트를 확인합니다.

1. 페이지를 새로고침합니다.

   <img alt="문구가 Bienvenue à app!으로 변경된 모습" src="assets/images/guide/service-worker/welcome-msg-fr.png">

   서비스 워커는 애플리케이션의 업데이트된 버전을 _백그라운드에서_ 설치했으며, 다음번에 페이지를 로딩하거나 새로고침할 때 최신 버전으로 전환합니다.

<!--
## Service worker configuration
-->

<a id="service-worker-configuration"></a>

## 서비스 워커 설정

<!--
Angular service workers support comprehensive configuration options through the `SwRegistrationOptions` interface, providing fine-grained control over registration behavior, caching, and script execution.
-->

Angular 서비스 워커는 `SwRegistrationOptions` 인터페이스를 통해 다양한 설정 옵션을 제공하므로 등록 동작, 캐싱, 스크립트 실행을 세밀하게 제어할 수 있습니다.

<!--
### Enabling and disabling service workers
-->

<a id="enabling-and-disabling-service-workers"></a>

### 서비스 워커 활성화와 비활성화

<!--
The `enabled` option controls whether the service worker will be registered and related services will attempt to communicate with it.

```ts
import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(), // Disable in development, enable in production
    }),
  ],
};
```
-->

`enabled` 옵션은 서비스 워커를 등록할지와 관련 서비스가 서비스 워커와 통신을 시도할지를 제어합니다.

```ts
import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(), // 개발 환경에서는 비활성화하고 프로덕션에서는 활성화합니다.
    }),
  ],
};
```

<!--
### Cache control with updateViaCache
-->

<a id="cache-control-with-updateviacache"></a>

### `updateViaCache`로 캐시 제어하기

<!--
The `updateViaCache` option controls how the browser consults the HTTP cache during service worker updates. This provides fine-grained control over when the browser fetches updated service worker scripts and imported modules.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      updateViaCache: 'imports',
    }),
  ],
};
```

The `updateViaCache` option accepts the following values:

- **`'imports'`** - The HTTP cache is consulted for the service worker script's imported scripts, but not for the service worker script itself
- **`'all'`** - The HTTP cache is consulted for both the service worker script and its imported scripts
- **`'none'`** - The HTTP cache is not consulted for the service worker script or its imported scripts
-->

`updateViaCache` 옵션은 서비스 워커를 업데이트할 때 브라우저가 HTTP 캐시를 사용하는 방식을 제어합니다.
브라우저가 업데이트된 서비스 워커 스크립트와 불러온 모듈을 가져오는 시점을 세밀하게 제어할 수 있습니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      updateViaCache: 'imports',
    }),
  ],
};
```

`updateViaCache` 옵션에는 다음 값을 지정할 수 있습니다:

- **`'imports'`** - 서비스 워커 스크립트가 불러오는 스크립트에는 HTTP 캐시를 사용하지만, 서비스 워커 스크립트 자체에는 사용하지 않습니다.
- **`'all'`** - 서비스 워커 스크립트와 불러오는 스크립트 모두 HTTP 캐시를 사용합니다.
- **`'none'`** - 서비스 워커 스크립트와 불러오는 스크립트 모두 HTTP 캐시를 사용하지 않습니다.

<!--
### ES Module support with type option
-->

<a id="es-module-support-with-type-option"></a>

### `type` 옵션으로 ES 모듈 지원하기

<!--
The `type` option enables specifying the script type when registering service workers, providing support for ES module features in your service worker scripts.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      type: 'module', // Enable ES module features
    }),
  ],
};
```

The `type` option accepts the following values:

- **`'classic'`** (default) - Traditional service worker script execution. ES module features such as `import` and `export` are NOT allowed in the script
- **`'module'`** - Registers the script as an ES module. Allows use of `import`/`export` syntax and module features
-->

`type` 옵션은 서비스 워커 등록 시 스크립트 타입을 지정해서, 서비스 워커 스크립트에서 ES 모듈 기능을 사용할 수 있게 합니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      type: 'module', // ES 모듈 기능을 활성화합니다.
    }),
  ],
};
```

`type` 옵션에는 다음 값을 지정할 수 있습니다:

- **`'classic'`**(기본값) - 기존 방식으로 서비스 워커 스크립트를 실행합니다.
  스크립트에서 `import`, `export` 같은 ES 모듈 기능을 사용할 수 없습니다.
- **`'module'`** - 스크립트를 ES 모듈로 등록합니다.
  `import`/`export` 문법과 모듈 기능을 사용할 수 있습니다.

<!--
### Registration scope control
-->

<a id="registration-scope-control"></a>

### 등록 스코프 제어하기

<!--
The `scope` option defines the service worker's registration scope, determining what range of URLs it can control.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      scope: '/app/', // Service worker will only control URLs under /app/
    }),
  ],
};
```

- Controls which URLs the service worker can intercept and manage
- By default, the scope is the directory containing the service worker script
- Used when calling `ServiceWorkerContainer.register()`
-->

`scope` 옵션은 서비스 워커가 제어할 수 있는 URL의 범위인 등록 스코프를 정의합니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      scope: '/app/', // 서비스 워커는 /app/ 아래의 URL만 제어합니다.
    }),
  ],
};
```

- 서비스 워커가 가로채고 관리할 수 있는 URL을 제어합니다.
- 기본 스코프는 서비스 워커 스크립트가 있는 디렉터리입니다.
- `ServiceWorkerContainer.register()`를 호출할 때 사용합니다.

<!--
### Registration strategy configuration
-->

<a id="registration-strategy-configuration"></a>

### 등록 전략 설정하기

<!--
The `registrationStrategy` option defines when the service worker will be registered with the browser, providing control over the timing of registration.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```

Available registration strategies:

- **`'registerWhenStable:timeout'`** (default: `'registerWhenStable:30000'`) - Register as soon as the application stabilizes (no pending micro-/macro-tasks) but no later than the specified timeout in milliseconds
  The timeout is required. Without it, `'registerWhenStable'` registers the service worker immediately.
- **`'registerImmediately'`** - Register the service worker immediately
- **`'registerWithDelay:timeout'`** - Register with a delay of the specified timeout in milliseconds

```ts
// Register immediately
export const immediateConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ],
};

// Register with a 5-second delay
export const delayedConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWithDelay:5000',
    }),
  ],
};
```

You can also provide an Observable factory function for custom registration timing:

```ts
import {timer} from 'rxjs';

export const customConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: () => timer(10_000), // Register after 10 seconds
    }),
  ],
};
```
-->

`registrationStrategy` 옵션은 서비스 워커를 브라우저에 등록하는 시점을 정의합니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```

다음 등록 전략을 사용할 수 있습니다:

- **`'registerWhenStable:timeout'`**(기본값: `'registerWhenStable:30000'`) - 애플리케이션이 안정화되는 즉시(대기 중인 마이크로태스크와 매크로태스크가 없을 때) 등록하되, 밀리초로 지정한 제한 시간을 넘기지 않습니다.
  제한 시간은 필수입니다. 제한 시간이 없으면 `'registerWhenStable'`은 서비스 워커를 즉시 등록합니다.
- **`'registerImmediately'`** - 서비스 워커를 즉시 등록합니다.
- **`'registerWithDelay:timeout'`** - 밀리초로 지정한 시간이 지난 뒤 등록합니다.

```ts
// 즉시 등록합니다.
export const immediateConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ],
};

// 5초 뒤에 등록합니다.
export const delayedConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWithDelay:5000',
    }),
  ],
};
```

옵저버블 팩토리 함수를 제공해서 등록 시점을 직접 정할 수도 있습니다:

```ts
import {timer} from 'rxjs';

export const customConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: () => timer(10_000), // 10초 뒤에 등록합니다.
    }),
  ],
};
```

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
  <docs-pill href="ecosystem/service-workers/push-notifications" title="Push notifications"/>
  <docs-pill href="ecosystem/service-workers/devops" title="Service Worker devops"/>
  <docs-pill href="ecosystem/service-workers/app-shell" title="App shell pattern"/>
</docs-pill-row>
-->

다음 내용도 함께 살펴보세요:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/config" title="설정 파일"/>
  <docs-pill href="ecosystem/service-workers/communications" title="서비스 워커와 통신하기"/>
  <docs-pill href="ecosystem/service-workers/push-notifications" title="푸시 알림"/>
  <docs-pill href="ecosystem/service-workers/devops" title="서비스 워커 운영"/>
  <docs-pill href="ecosystem/service-workers/app-shell" title="앱 기본 구조 패턴"/>
</docs-pill-row>
