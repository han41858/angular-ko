<!--
# Deployment
-->

<a id="deployment"></a>

# 배포하기

<!--
When you are ready to deploy your Angular application to a remote server, you have various options.
-->

Angular 애플리케이션을 원격 서버에 배포할 준비가 되었다면 다양한 방법 중에서 선택할 수 있습니다.

<!--
## Automatic deployment with the CLI
-->

<a id="automatic-deployment-with-the-cli"></a>

## CLI로 자동 배포하기

<!--
The Angular CLI command `ng deploy` executes the `deploy` [CLI builder](tools/cli/cli-builder) associated with your project.
A number of third-party builders implement deployment capabilities to different platforms.
You can add any of them to your project with `ng add`.

When you add a package with deployment capability, it will automatically update your workspace configuration (`angular.json` file) with a `deploy` section for the selected project.
You can then use the `ng deploy` command to deploy that project.

For example, the following command automatically deploys a project to [Firebase](https://firebase.google.com/).

```shell

ng add @angular/fire
ng deploy

```

The command is interactive.
In this case, you must have or create a Firebase account and authenticate using it.
The command prompts you to select a Firebase project for deployment before building your application and uploading the production assets to Firebase.

The table below lists tools which implement deployment functionality to different platforms.
The `deploy` command for each package may require different command line options.
You can read more by following the links associated with the package names below:

| Deployment to                                                     | Setup Command                                                                               |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Firebase hosting](https://firebase.google.com/docs/hosting)      | [`ng add @angular/fire`](https://npmjs.org/package/@angular/fire)                           |
| [Vercel](https://vercel.com/solutions/angular)                    | [`vercel init angular`](https://github.com/vercel/vercel/tree/main/examples/angular)        |
| [Netlify](https://www.netlify.com)                                | [`ng add @netlify-builder/deploy`](https://npmjs.org/package/@netlify-builder/deploy)       |
| [GitHub Pages](https://pages.github.com)                          | [`ng add angular-cli-ghpages`](https://npmjs.org/package/angular-cli-ghpages)               |
| [Amazon Cloud S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3) | [`ng add @jefiozie/ngx-aws-deploy`](https://www.npmjs.com/package/@jefiozie/ngx-aws-deploy) |

If you're deploying to a self-managed server or there's no builder for your favorite cloud platform, you can either [create a builder](tools/cli/cli-builder) that allows you to use the `ng deploy` command, or read through this guide to learn how to manually deploy your application.
-->

Angular CLI의 `ng deploy` 명령어는 프로젝트에 연결된 `deploy` [CLI 빌더](tools/cli/cli-builder)를 실행합니다.
여러 서드 파티 빌더가 다양한 플랫폼으로 배포하는 기능을 제공합니다.
이러한 빌더는 `ng add`로 프로젝트에 추가할 수 있습니다.

배포 기능을 제공하는 패키지를 추가하면 워크스페이스 설정(`angular.json` 파일)에서 선택한 프로젝트에 `deploy` 항목이 자동으로 추가됩니다.
그러면 `ng deploy` 명령어로 해당 프로젝트를 배포할 수 있습니다.

예를 들어 다음 명령어는 프로젝트를 [Firebase](https://firebase.google.com/)에 자동으로 배포합니다.

```shell

ng add @angular/fire
ng deploy

```

이 명령어는 대화형으로 실행됩니다.
이 경우 Firebase 계정을 가지고 있거나 새로 만든 뒤 해당 계정으로 인증해야 합니다.
명령어는 배포할 Firebase 프로젝트를 선택하도록 안내한 뒤 애플리케이션을 빌드하고 프로덕션 리소스를 Firebase에 업로드합니다.

다음 표는 다양한 플랫폼으로 배포하는 기능을 제공하는 도구입니다.
각 패키지의 `deploy` 명령어는 서로 다른 명령줄 옵션을 요구할 수 있습니다.
아래 패키지 이름의 링크에서 자세한 내용을 확인하세요:

| 배포 대상                                                         | 설정 명령어                                                                                 |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Firebase 호스팅](https://firebase.google.com/docs/hosting)       | [`ng add @angular/fire`](https://npmjs.org/package/@angular/fire)                           |
| [Vercel](https://vercel.com/solutions/angular)                    | [`vercel init angular`](https://github.com/vercel/vercel/tree/main/examples/angular)        |
| [Netlify](https://www.netlify.com)                                | [`ng add @netlify-builder/deploy`](https://npmjs.org/package/@netlify-builder/deploy)       |
| [GitHub Pages](https://pages.github.com)                          | [`ng add angular-cli-ghpages`](https://npmjs.org/package/angular-cli-ghpages)               |
| [Amazon Cloud S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3) | [`ng add @jefiozie/ngx-aws-deploy`](https://www.npmjs.com/package/@jefiozie/ngx-aws-deploy) |

직접 관리하는 서버에 배포하거나 원하는 클라우드 플랫폼용 빌더가 없다면 `ng deploy` 명령어를 사용할 수 있도록 [빌더를 만들거나](tools/cli/cli-builder), 이 가이드를 계속 읽고 애플리케이션을 수동으로 배포하는 방법을 알아보세요.

<!--
## Manual deployment to a remote server
-->

<a id="manual-deployment-to-a-remote-server"></a>

## 원격 서버에 수동으로 배포하기

<!--
To manually deploy your application, create a production build and copy the output directory to a web server or content delivery network (CDN).
By default, `ng build` uses the `production` configuration.
If you have customized your build configurations, you may want to confirm [production optimizations](tools/cli/deployment#production-optimizations) are being applied before deploying.

`ng build` outputs the built artifacts to `dist/my-app/` by default, however this path can be configured with the `outputPath` option in the `@angular/build:application` builder.
Copy this directory to the server and configure it to serve the directory.

While this is a minimal deployment solution, there are a few requirements for the server to serve your Angular application correctly.
-->

애플리케이션을 수동으로 배포하려면 프로덕션 빌드를 생성하고 출력 디렉터리를 웹 서버나 콘텐츠 전송 네트워크(CDN)에 복사합니다.
`ng build`는 기본적으로 `production` 설정을 사용합니다.
빌드 설정을 직접 변경했다면 배포하기 전에 [프로덕션 최적화](tools/cli/deployment#production-optimizations)가 적용되는지 확인하는 것이 좋습니다.

`ng build`는 기본적으로 빌드 결과물을 `dist/my-app/`에 출력하지만, `@angular/build:application` 빌더의 `outputPath` 옵션으로 이 경로를 변경할 수 있습니다.
이 디렉터리를 서버에 복사하고 해당 디렉터리의 파일을 제공하도록 서버를 설정하세요.

최소한의 배포 방법은 이렇지만, 서버가 Angular 애플리케이션을 올바르게 제공하려면 몇 가지 요건을 충족해야 합니다.

<!--
## Server configuration
-->

<a id="server-configuration"></a>

## 서버 설정

<!--
This section covers changes you may need to configure on the server to run your Angular application.
-->

이 섹션에서는 Angular 애플리케이션을 실행하기 위해 서버에서 변경해야 할 수 있는 설정을 알아봅니다.

<!--
### Routed apps must fall back to `index.html`
-->

<a id="routed-apps-must-fall-back-to-indexhtml"></a>

### 라우팅을 사용하는 앱은 `index.html`로 대체 응답해야 합니다

<!--
Client-side rendered Angular applications are perfect candidates for serving with a static HTML server because all the content is static and generated at build time.

If the application uses the Angular router, you must configure the server to return the application's host page (`index.html`) when asked for a file that it does not have.

A routed application should support "deep links".
A _deep link_ is a URL that specifies a path to a component inside the application.
For example, `http://my-app.test/users/42` is a _deep link_ to the user detail page that displays the user with `id` 42.

There is no issue when the user initially loads the index page and then navigates to that URL from within a running client.
The Angular router performs the navigation _client-side_ and does not request a new HTML page.

But clicking a deep link in an email, entering it in the browser address bar, or even refreshing the browser while already on the deep linked page will all be handled by the browser itself, _outside_ the running application.
The browser makes a direct request to the server for `/users/42`, bypassing Angular's router.

A static server routinely returns `index.html` when it receives a request for `http://my-app.test/`.
But most servers by default will reject `http://my-app.test/users/42` and returns a `404 - Not Found` error _unless_ it is configured to return `index.html` instead.
Configure the fallback route or 404 page to `index.html` for your server, so Angular is served for deep links and can display the correct route.
Some servers call this fallback behavior "Single-Page Application" (SPA) mode.

Once the browser loads the application, Angular router will read the URL to determine which page it is on and display `/users/42` correctly.

For "real" 404 pages such as `http://my-app.test/does-not-exist`, the server does not require any additional configuration.
[404 pages implemented in the Angular router](guide/routing/common-router-tasks#displaying-a-404-page) will be displayed correctly.
-->

클라이언트에서 렌더링하는 Angular 애플리케이션은 모든 콘텐츠가 정적이고 빌드 시점에 생성되기 때문에 정적 HTML 서버로 제공하기에 적합합니다.

애플리케이션에서 Angular 라우터를 사용한다면 서버에 없는 파일을 요청받았을 때 애플리케이션의 호스트 페이지(`index.html`)를 반환하도록 서버를 설정해야 합니다.

라우팅을 사용하는 애플리케이션은 "딥 링크"를 지원해야 합니다.
_딥 링크(deep link)_ 는 애플리케이션 내부 컴포넌트의 경로를 지정하는 URL입니다.
예를 들어 `http://my-app.test/users/42`는 `id`가 42인 사용자를 표시하는 사용자 상세 페이지의 _딥 링크_ 입니다.

사용자가 처음에 인덱스 페이지를 불러온 뒤 실행 중인 클라이언트 안에서 해당 URL로 이동할 때는 문제가 없습니다.
Angular 라우터는 _클라이언트 측에서_ 화면을 전환하며 새로운 HTML 페이지를 요청하지 않습니다.

하지만 이메일의 딥 링크를 클릭하거나 브라우저 주소창에 입력하거나 딥 링크로 연결된 페이지에서 브라우저를 새로고침하면, 실행 중인 애플리케이션 _밖에서_ 브라우저 자체가 이를 처리합니다.
브라우저는 Angular 라우터를 거치지 않고 서버에 `/users/42`를 직접 요청합니다.

정적 서버는 보통 `http://my-app.test/` 요청을 받으면 `index.html`을 반환합니다.
하지만 대부분의 서버는 기본적으로 `http://my-app.test/users/42` 요청을 거부하고 `404 - Not Found` 오류를 반환합니다.
이를 대신해서 `index.html`을 반환하도록 설정해야 합니다.
서버의 대체 라우팅 규칙이나 404 페이지를 `index.html`로 설정하면 딥 링크 요청에도 Angular가 제공되어 올바른 라우팅 규칙의 화면을 표시할 수 있습니다.
일부 서버는 이러한 대체 응답 방식을 "단일 페이지 애플리케이션"(SPA) 모드라고 부릅니다.

브라우저가 애플리케이션을 불러오면 Angular 라우터가 URL을 읽어서 현재 페이지를 판단하고 `/users/42`를 올바르게 표시합니다.

`http://my-app.test/does-not-exist`와 같은 "실제" 404 페이지를 위해 서버에 추가 설정을 할 필요는 없습니다.
[Angular 라우터로 구현한 404 페이지](guide/routing/common-router-tasks#displaying-a-404-page)가 올바르게 표시됩니다.

<!--
### Requesting data from a different server (CORS)
-->

<a id="requesting-data-from-a-different-server-cors"></a>

### 다른 서버에서 데이터 요청하기(CORS)

<!--
Web developers may encounter a [_cross-origin resource sharing_](https://developer.mozilla.org/docs/Web/HTTP/CORS 'Cross-origin resource sharing') error when making a network request to a server other than the application's own host server.
Browsers forbid such requests unless the server explicitly permits them.

There isn't anything Angular or the client application can do about these errors.
The _server_ must be configured to accept the application's requests.
Read about how to enable CORS for specific servers at [enable-cors.org](https://enable-cors.org/server.html 'Enabling CORS server').
-->

웹 개발자는 애플리케이션을 호스팅하는 서버가 아닌 다른 서버로 네트워크 요청을 보낼 때 [_교차 출처 리소스 공유_](https://developer.mozilla.org/docs/Web/HTTP/CORS '크로스 출처 리소스 공유') 오류를 만날 수 있습니다.
브라우저는 서버가 명시적으로 허용하지 않는 한 이러한 요청을 차단합니다.

Angular나 클라이언트 애플리케이션에서 이러한 오류를 해결할 수는 없습니다.
애플리케이션의 요청을 받아들이도록 _서버를_ 설정해야 합니다.
서버별 CORS 활성화 방법은 [enable-cors.org](https://enable-cors.org/server.html '서버에서 CORS 활성화하기')를 참고하세요.

<!--
## Production optimizations
-->

<a id="production-optimizations"></a>

## 운영 환경 최적화

<!--
`ng build` uses the `production` configuration unless configured otherwise. This configuration enables the following build optimization features.

| Features                                                          | Details                                                                                       |
| :---------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| [Ahead-of-Time (AOT) Compilation](tools/cli/aot-compiler)         | Pre-compiles Angular component templates.                                                     |
| [Production mode](tools/cli/deployment#development-only-features) | Optimizes the application for the best runtime performance                                    |
| Bundling                                                          | Concatenates your many application and library files into a minimum number of deployed files. |
| Minification                                                      | Removes excess whitespace, comments, and optional tokens.                                     |
| Mangling                                                          | Renames functions, classes, and variables to use shorter, arbitrary identifiers.              |
| Dead code elimination                                             | Removes unreferenced modules and unused code.                                                 |

See [`ng build`](cli/build) for more about CLI build options and their effects.
-->

별도로 설정하지 않으면 `ng build`는 `production` 설정을 사용합니다.
이 설정은 다음 빌드 최적화 기능을 활성화합니다.

| 기능                                                            | 설명                                                                   |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [사전(AOT) 컴파일](tools/cli/aot-compiler)                      | Angular 컴포넌트 템플릿을 미리 컴파일합니다.                           |
| [프로덕션 모드](tools/cli/deployment#development-only-features) | 실행 성능을 극대화하도록 애플리케이션을 최적화합니다.                  |
| 번들링                                                          | 애플리케이션과 라이브러리의 여러 파일을 최소한의 배포 파일로 합칩니다. |
| 축소                                                            | 불필요한 공백, 주석, 생략 가능한 토큰을 제거합니다.                    |
| 이름 축약                                                       | 함수, 클래스, 변수의 이름을 짧은 임의 식별자로 바꿉니다.               |
| 사용하지 않는 코드 제거                                         | 참조되지 않는 모듈과 사용하지 않는 코드를 제거합니다.                  |

CLI 빌드 옵션과 그 효과는 [`ng build`](cli/build)를 참고하세요.

<!--
### Development-only features
-->

<a id="development-only-features"></a>

### 개발 전용 기능

<!--
When you run an application locally using `ng serve`, Angular uses the development configuration
at runtime which enables:

- Extra safety checks such as [`expression-changed-after-checked`](errors/NG0100) detection.
- More detailed error messages.
- Additional debugging utilities such as the global `ng` variable with [debugging functions](api#core-global) and [Angular DevTools](tools/devtools) support.

These features are helpful during development, but they require extra code in the app, which is
undesirable in production. To ensure these features do not negatively impact bundle size for end users, Angular CLI
removes development-only code from the bundle when building for production.

Building your application with `ng build` by default uses the `production` configuration which removes these features from the output for optimal bundle size.
-->

`ng serve`로 애플리케이션을 로컬에서 실행하면 Angular는 실행 시점에 개발 설정을 사용하며 다음 기능을 활성화합니다:

- [`expression-changed-after-checked`](errors/NG0100) 감지 등의 추가 안전 검사.
- 더 자세한 오류 메시지.
- [디버깅 함수](api#core-global)를 제공하는 전역 `ng` 변수와 [Angular DevTools](tools/devtools) 지원 등의 추가 디버깅 도구.

이러한 기능은 개발할 때 유용하지만 앱에 추가 코드가 필요하기 때문에 프로덕션에는 적합하지 않습니다.
최종 사용자에게 전달하는 번들 크기에 영향을 주지 않도록 Angular CLI는 프로덕션 빌드에서 개발 전용 코드를 제거합니다.

`ng build`로 애플리케이션을 빌드하면 기본적으로 `production` 설정을 사용하며, 번들 크기를 최적화하기 위해 출력 결과에서 이러한 기능을 제거합니다.

<!--
## `--deploy-url`
-->

<a id="--deploy-url"></a>

## `--deploy-url`

<!--
`--deploy-url` is a command line option used to specify the base path for resolving relative URLs for assets such as images, scripts, and style sheets at _compile_ time.

```shell

ng build --deploy-url /my/assets

```

The effect and purpose of `--deploy-url` overlaps with [`<base href>`](guide/routing/router-reference#base-href). Both can be used for initial scripts, stylesheets, lazy scripts, and css resources.

Unlike `<base href>` which can be defined in a single place at runtime, the `--deploy-url` needs to be hard-coded into an application at build time.
Prefer `<base href>` where possible.
-->

`--deploy-url`은 이미지, 스크립트, 스타일시트와 같은 리소스의 상대 URL을 해석할 기준 경로를 _컴파일_ 시점에 지정하는 명령줄 옵션입니다.

```shell

ng build --deploy-url /my/assets

```

`--deploy-url`의 효과와 용도는 [`<base href>`](guide/routing/router-reference#base-href)와 겹칩니다.
둘 다 초기 스크립트, 스타일시트, 지연 로딩 스크립트, CSS 리소스에 사용할 수 있습니다.

`<base href>`는 실행 시점에 한 곳에서 정의할 수 있지만 `--deploy-url`은 빌드 시점에 애플리케이션에 하드코딩해야 합니다.
가능하면 `<base href>`를 사용하세요.
