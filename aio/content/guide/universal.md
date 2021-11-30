<!--
# Server-side rendering (SSR) with Angular Universal
-->
# 서버 사이드 렌더링 (Server-side Rendering, SSR): Angular Universal

<!--
This guide describes **Angular Universal**, a technology that renders Angular applications on the server.

A normal Angular application executes in the _browser_, rendering pages in the DOM in response to user actions.
Angular Universal executes on the _server_, generating _static_ application pages that later get bootstrapped on
the client. This means that the application generally renders more quickly, giving users a chance to view the application
layout before it becomes fully interactive.

For a more detailed look at different techniques and concepts surrounding SSR, check out this
[article](https://developers.google.com/web/updates/2019/02/rendering-on-the-web).

Easily prepare an application for server-side rendering using the [Angular CLI](guide/glossary#cli).
The CLI schematic `@nguniversal/express-engine` performs the required steps, as described.
-->
이 문서는 **Angular Universal**에 대해 소개합니다.
Angular Universal은 Angular 애플리케이션을 서버에서 실행하는 테크닉입니다.

일반적으로 Angular 애플리케이션은 _브라우저_ 에서 실행됩니다.
DOM에 페이지가 렌더링되고 사용자의 동작에 반응하는 것도 모두 브라우저에서 이루어집니다.
하지만 이와 다르게 Angular Universal은 _서버_ 에 미리 _정적_ 으로 생성해둔 애플리케이션을 클라이언트가 실행하고, 그 이후에 클라이언트에서 앱을 다시 부트스트랩하는 테크닉입니다.
이 방식을 사용하면 애플리케이션을 좀 더 빠르게 실행할 수 있기 때문에 사용자가 보는 애플리케이션 화면도 빠르게 띄울 수 있습니다.

이와 비슷한 방식이나 SSR 컨셉에 대해서 더 알아보려면 [이 문서](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)를 참고하세요.

서버 사이드 렌더링은 [Angular CLI](guide/glossary#cli)를 활용해도 간단하게 적용할 수 있습니다.
Angular CLI 스키매틱 중 `@nguniversal/express-engine`를 활용하는 방법인데, 아래에서 자세하게 설명합니다.

<div class="alert is-helpful">

  <!--  
  Angular Universal requires an [active LTS or maintenance LTS](https://nodejs.org/about/releases) version of Node.js.
  See the `engines` property in the [package.json](https://unpkg.com/browse/@angular/platform-server/package.json) file to learn about the currently supported versions.
  -->
  Angular Universal을 사용하려면 [활성 LTS나 유지보수 중인 LTS](https://nodejs.org/about/releases) 버전으로 관리되는 Node.js가 필요합니다.
  지원하는 버전을 확인하려면 [package.json](https://unpkg.com/browse/@angular/platform-server/package.json) 파일의 `engines` 프로퍼티를 확인해 보세요.


</div>

<div class="alert is-helpful">

  <!--
  **Note:** <live-example downloadOnly>Download the finished sample code</live-example>,
  which runs in a [Node.js® Express](https://expressjs.com/) server.
  -->
  **참고:**  <live-example downloadOnly>완성된 샘플 코드를 다운</live-example>받고 [Node.js® Express](https://expressjs.com/) 서버에서 직접 실행해볼 수 있습니다.


</div>


{@a the-example}
<!--
## Universal tutorial
-->
## Universal 튜토리얼

<!--
The [Tour of Heroes tutorial](tutorial) is the foundation for this walkthrough.

In this example, the Angular CLI compiles and bundles the Universal version of the application with the
[Ahead-of-Time (AOT) compiler](guide/aot-compiler).
A Node.js Express web server compiles HTML pages with Universal based on client requests.

To create the server-side application module, `app.server.module.ts`, run the following CLI command.

<code-example language="bash">

ng add @nguniversal/express-engine

</code-example>

The command creates the following folder structure.

<code-example language="none">
src/
  index.html                 <i>app web page</i>
  main.ts                    <i>bootstrapper for client app</i>
  main.server.ts             <i>* bootstrapper for server app</i>
  style.css                  <i>styles for the app</i>
  app/ ...                   <i>application code</i>
    app.server.module.ts     <i>* server-side application module</i>
server.ts                    <i>* express web server</i>
tsconfig.json                <i>TypeScript base configuration</i>
tsconfig.app.json            <i>TypeScript browser application configuration</i>
tsconfig.server.json         <i>TypeScript server application configuration</i>
tsconfig.spec.json           <i>TypeScript tests configuration</i>
</code-example>

The files marked with `*` are new and not in the original tutorial sample.
-->
이 문서에서는 [히어로들의 여행](tutorial) 앱에 Universal을 적용해 봅시다.

이 앱은 Angular CLI로 컴파일 할 때 [AOT 컴파일러](guide/aot-compiler)를 사용합니다.
그리고 이렇게 빌드한 결과물은 Node.js Express 서버로 서비스해 봅시다.

서버 사이드 앱 모듈을 생성하려면 다음 명령을 실행해서 `app.server.module.ts`를 생성합니다.

<code-example language="bash">

ng add @nguniversal/express-engine

</code-example>

그러면 다음과 같은 폴더 구조가 생성됩니다.

<code-example language="none">
src/
  index.html                 <i>애플리케이션 웹 페이지</i>
  main.ts                    <i>클라이언트 앱을 부트스트랩하는 파일</i>
  main.server.ts             <i>* 서버 앱을 부트스트랩하는 파일</i>
  style.css                  <i>앱 전역 스타일 파일</i>
  app/ ...                   <i>애플리케이션 코드</i>
    app.server.module.ts     <i>* 서버 사이드 애플리케이션 모듈</i>
server.ts                    <i>* Express 웹 서버</i>
tsconfig.json                <i>TypeScript 기본 환경설정 파일</i>
tsconfig.app.json            <i>TypeScript 브라우저용 환경설정 파일</i>
tsconfig.server.json         <i>TypeScript 서버용 환경설정 파일</i>
tsconfig.spec.json           <i>TypeScript 스펙용 환경설정 파일</i>
</code-example>

이 중 `*` 표시가 된 파일이 새로 추가된 파일입니다.


<!--
### Universal in action
-->
### Universal 앱 실행하기

<!--
To start rendering your application with Universal on your local system, use the following command.
-->
로컬 개발 환경에서 Angular 앱을 Universal로 렌더링하려면 다음 명령을 실행하면 됩니다.

<code-example language="bash">
npm run dev:ssr
</code-example>

<!--
Open a browser and navigate to http://localhost:4200/.
You should see the familiar Tour of Heroes dashboard page.

Navigation using `routerLinks` works correctly because they use the built-in anchor (`<a>`) tags.
You can go from the Dashboard to the Heroes page and back.
Click a hero on the Dashboard page to display its Details page.

If you throttle your network speed so that the client-side scripts take longer to download (instructions following),
you'll notice:
* You can't add or delete a hero.
* The search box on the Dashboard page is ignored.
* The *Back* and *Save* buttons on the Details page don't work.

User events other than `routerLink` clicks aren't supported.
You must wait for the full client application to bootstrap and run, or buffer the events using libraries like
[preboot](https://github.com/angular/preboot), which lets you replay these events once the client-side scripts load.

The transition from the server-rendered application to the client application happens quickly on a development machine, but you should
always test your applications in real-world scenarios.

You can simulate a slower network to see the transition more clearly as follows:

1. Open the Chrome Dev Tools and go to the Network tab.
1. Find the [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling)
dropdown on the far right of the menu bar.
1. Try one of the "3G" speeds.

The server-rendered application still launches quickly but the full client application might take seconds to load.
-->
명령을 실행하고 나면 브라우저를 열어서 http://localhost:4200/에 접속해 보세요.
이전에 봤던 히어로들의 여행 대시보드 화면이 표시될 것입니다.

이 앱은 네이티브 앵커 태그(`<a>`)를 사용하기 때문에 `routerLinks`도 이전과 마찬가지로 동작합니다.
그래서 대시보드 화면에서 히어로 목록 화면으로 이동할 수 있고 이전 화면으로 돌아갈 수도 있습니다.
그리고 대시보드 화면에서 히어로를 클릭하면 히어로 상세정보 화면으로 이동할 수 있습니다.

이 상태에서 네트워크 속도를 제한하면 애플리케이션 코드를 다운로드하는 속도가 느려지기 때문에 다음과 같은 현상이 발생합니다:
* 히어로를 추가하거나 삭제할 수 없습니다.
* 대시보드 화면에 있는 검색창이 동작하지 않습니다.
* 히어로 상세정보 화면에 있는 *Back*, *Save* 버튼이 동작하지 않습니다.

네트워크 속도를 제한하면 `routerLink`를 클릭하는 것 이외의 기능이 동작하지 않습니다.
이 때는 클라이언트 앱이 모두 부트스트랩되어 실행될 때까지 기다리거나 [preboot](https://github.com/angular/preboot)와 같은 라이브러리를 활용해서 이벤트를 캐싱해놨다가 클라이언트 스크립트가 로드된 후에 다시 한 번 처리해야 합니다.

서버에서 렌더링된 앱을 클라이언트용으로 전환하는 것은 간단하지만 실제로 운영되고 있는 앱이라면 이 앱을 확실하게 테스트해야 합니다.

네트워크 속도를 제한하는 기능은 다음과 같이 적용합니다:

1. Chrome 개발자 도구를 열어서 Network 탭으로 이동합니다.
1. 메뉴바 오른쪽에 있는 [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling) 드롭다운을 클릭합니다.
1. "3G" 속도를 선택합니다.

이렇게 적용하면 서버 사이드용으로 렌더링된 앱의 초기 실행은 빠를 수 있지만 클라이언트 앱이 전부 로딩되려면 몇 초 기다려야 합니다.


{@a why-do-it}
<!--
## Why use server-side rendering?
-->
## 서버 사이드 렌더링은 왜 필요한가요?

<!--
There are three main reasons to create a Universal version of your application.

1. Facilitate web crawlers through [search engine optimization (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)
1. Improve performance on mobile and low-powered devices
1. Show the first page quickly with a [first-contentful paint (FCP)](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)
-->
1. [검색 엔진 최적화(SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)를 통해 웹 크롤러에 대응하기 위해
1. 모바일 장비와 저사양 장비에서 동작하는 성능을 끌어올리기 위해
1. [사용자에게 유효한 첫 페이지](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)를 빠르게 표시하기 위해


{@a seo}
{@a web-crawlers}
<!--
### Facilitate web crawlers (SEO)
-->
### 웹 크롤러 대응하기 (SEO)

<!--
Google, Bing, Facebook, Twitter, and other social media sites rely on web crawlers to index your application content and
make that content searchable on the web.
These web crawlers might be unable to navigate and index your highly interactive Angular application as a human user could do.

Angular Universal can generate a static version of your application that is easily searchable, linkable, and navigable without JavaScript.
Universal also makes a site preview available because each URL returns a fully rendered page.

Enabling web crawlers is often referred to as
[search engine optimization (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf).
-->
Google, Bing, Facebook, Twitter와 같은 소셜 미디어 사이트는 웹 애플리케이션 컨텐츠를 수집하고 검색에 활용하기 위해 웹 크롤러를 사용합니다.
그런데 이런 웹 크롤러는 진짜 사람이 하는 것처럼 애플리케이션 페이지를 효율적으로 이동하면서 원하는 내용을 수집하지는 못합니다.

Angular Universal은 이런 경우에 사용합니다.
Angular Universal을 적용하면 애플리케이션을 정적으로 빌드해둘 수 있기 때문에 컨텐츠를 검색하기 쉽고, 링크를 연결할 수 있으며, JavaScript를 사용하지 않아도 페이지를 전환할 수 있습니다.
그리고 Universal을 적용하면 완전히 렌더링된 페이지를 서버에 준비하기 때문에 웹사이트의 미리보기 화면을 제공할 수도 있습니다.

웹 크롤러에 대응하는 과정은 [검색 엔진 최적화(search engine optimization, SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)라고도 합니다.


{@a no-javascript}
<!--
### Improve performance on mobile and low-powered devices
-->
### 모바일 장비와 저사양 장비에서 동작하는 성능 끌어올리기

<!--
Some devices don't support JavaScript or execute JavaScript so poorly that the user experience is unacceptable.
For these cases, you might require a server-rendered, no-JavaScript version of the application.
This version, however limited, might be the only practical alternative for
people who otherwise couldn't use the application at all.
-->
JavaScript를 지원하지 않는 디바이스가 존재하기도 하고 JavaScript를 실행하는 것이 오히려 사용자의 UX를 해치는 디바이스도 존재합니다.
이런 경우에는 클라이언트에서 JavaScript를 실행하지 말고 서버에서 미리 렌더링된 앱을 보내서 간단하게 실행하는 것이 더 좋습니다.
앱을 이렇게 제공하면 원래 사용자에게 제공하려던 기능을 모두 제공할 수는 없겠지만, 앱을 전혀 사용할 수 없는 상황은 피할 수 있습니다.

{@a startup-performance}
<!--
### Show the first page quickly
-->
### 첫 페이지를 빠르게 표시하기

<!--
Displaying the first page quickly can be critical for user engagement.
Pages that load faster perform better, [even with changes as small as 100ms](https://web.dev/shopping-for-speed-on-ebay/).
Your application might have to launch faster to engage these users before they decide to do something else.

With Angular Universal, you can generate landing pages for the application that look like the complete application.
The pages are pure HTML, and can display even if JavaScript is disabled.
The pages don't handle browser events, but they _do_ support navigation through the site using [`routerLink`](guide/router-reference#router-link).

In practice, you'll serve a static version of the landing page to hold the user's attention.
At the same time, you'll load the full Angular application behind it.
The user perceives near-instant performance from the landing page
and gets the full interactive experience after the full application loads.
-->
사용자를 사로잡으려면 첫 번째 화면을 빨리 표시하는 것이 아주 중요합니다.
화면이 빠르게 뜰수록 사용자가 앱을 더 많이 사용할 수 있기 때문에 [100ms만 줄여도 비즈니스에 도움이 될 수 있습니다](https://web.dev/shopping-for-speed-on-ebay/).
UX 측면에서도 사용자가 어떤 동작을 하기 전에 앱이 빠르게 뜨는 것이 무엇보다 중요합니다.

Angular Universal을 사용하면 설치형 앱과 거의 비슷하게 동작하는 랜딩 페이지를 생성할 수 있습니다.
페이지는 HTML만으로 구성되기 때문에 JavaScript가 비활성화되어도 화면을 제대로 표시할 수 있습니다.
다만, JavaScript가 실행되지 않으면 브라우저 이벤트를 처리할 수 없기 때문에 네비게이션은 [`routerLink`](guide/router-reference#router-link)를 사용하는 방식으로 구현되어야 합니다.

운영환경에서도 첫 페이지를 빠르게 표시하기 위해 페이지를 정적으로 렌더링해서 제공하는 경우가 많습니다.
그 이후에 온전한 버전의 Angular 앱을 로드하는 방법을 사용하기도 합니다.
그러면 애플리케이션 첫 페이지를 빠르게 표시하면서도 앱에 구현한 기능을 온전히 사용자에게 제공할 수 있습니다.


{@a how-does-it-work}
<!--
## Universal web servers
-->
## Universal 웹 서버

<!--
A Universal web server responds to application page requests with static HTML rendered by the [Universal template engine](#universal-engine).
The server receives and responds to HTTP requests from clients (usually browsers), and serves static assets such as scripts, CSS, and images.
It might respond to data requests, either directly or as a proxy to a separate data server.

The sample web server for this guide is based on the popular [Express](https://expressjs.com/) framework.
-->
Universal 웹 서버는 애플리케이션 페이지 요청을 받았을 때 [Universal 템플릿 엔진](#universal-engine)으로 렌더링한 정적 HTML을 제공하는 역할을 담당합니다.
이 서버는 일반적으로 브라우저에서 HTTP 요청을 받고 HTTP 응답을 내려주는데, 스크립트 파일이나 CSS, 이미지 파일과 같은 정적 애셋들도 함께 제공합니다.
이 외에도 API로 통하는 데이터 요청은 Universal 웹 서버가 직접 처리하거나 프록시 역할을 하면서 다른 데이터 서버를 중개할 수도 있을 것입니다.

이 문서에서는 널리 사용되는 [Express](https://expressjs.com/) 프레임워크를 사용해서 샘플 웹 서버를 구현해 봅니다.

<div class="alert is-helpful">

  <!--  
  **Note:** _Any_ web server technology can serve a Universal application as long as it can call Universal's `renderModule()` function.
  The principles and decision points discussed here apply to any web server technology.
  -->
  **참고:** Angular Universal이 제공하는 `renderModule()` 함수를 실행할수만 있다면 _아무_ 웹 서버를 사용해도 Universal 앱을 제공할 수 있습니다.
  이 섹션에서는 웹 서버를 결정하는 기준에 대해서 조금 더 자세하게 알아봅시다.

</div>

<!--
Universal applications use the Angular `platform-server` package (as opposed to `platform-browser`), which provides
server implementations of the DOM, `XMLHttpRequest`, and other low-level features that don't rely on a browser.

The server ([Node.js Express](https://expressjs.com/) in this guide's example)
passes client requests for application pages to the NgUniversal `ngExpressEngine`. Under the hood, this
calls Universal's `renderModule()` function, while providing caching and other helpful utilities.

The `renderModule()` function takes as inputs a *template* HTML page (usually `index.html`),
an Angular *module* containing components, and a *route* that determines which components to display.
The route comes from the client's request to the server.

Each request results in the appropriate view for the requested route.
The `renderModule()` function renders the view within the `<app>` tag of the template,
creating a finished HTML page for the client.

Finally, the server returns the rendered page to the client.
-->
Universal 애플리케이션은 (`platform-browser` 대신) Angular가 제공하는 `platform-server` 패키지를 사용합니다.
이 패키지는 서버에서 DOM에 접근할 수 있는 기능이나 `XMLHttpRequest` 와 같이 브라우저의 기능이 필요한 로직에 사용됩니다.

이 문서에서 다루는 것처럼 [Node.js Express](https://expressjs.com/)를 사용하는 서버라면 클라이언트에서 보내는 애플리케이션 페이지 요청을 NgUniversal이 제공하는 `ngExpressEngine` 으로 전달합니다.
그러면 Universal의 `renderModuleFactory()` 함수가 실행되면서 페이지를 구성합니다.

`renderModuleFactory()` 함수는 HTML *템플릿* 페이지(일반적으로 `index.html`)를 바탕으로 Angular 컴포넌트로 구성된 *모듈*을 생성하며, *라우팅 규칙*에 맞게 컴포넌트를 화면에 표시합니다.
이 때 라우팅 규칙은 클라이언트가 서버로 보낸 것이 사용됩니다.

클라이언트가 보낸 요청의 결과는 해당 라우팅 규칙과 연결된 애플리케이션 페이지가 됩니다.
그래서 `renderModuleFactory()` 함수는 템플릿의 `<app>` 태그에 뷰를 렌더링하며, 결과적으로 온전하게 HTML로 구성된 페이지가 생성됩니다.

이제 렌더링된 페이지를 클라이언트가 받으면 브라우저에 이 페이지가 표시됩니다.


<!--
### Working around the browser APIs
-->
### 브라우저 API 활용하기

<!--
Because a Universal application doesn't execute in the browser, some of the browser APIs and capabilities might be missing on the server.

For example, server-side applications can't reference browser-only global objects such as `window`, `document`, `navigator`, or `location`.

Angular provides some injectable abstractions over these objects, such as [`Location`](api/common/Location)
or [`DOCUMENT`](api/common/DOCUMENT); it might substitute adequately for these APIs.
If Angular doesn't provide it, it's possible to write new abstractions that delegate to the browser APIs while in the browser
and to an alternative implementation while on the server (also known as shimming).

Similarly, without mouse or keyboard events, a server-side application can't rely on a user clicking a button to show a component.
The application must determine what to render based solely on the incoming client request.
This is a good argument for making the application [routable](guide/router).
-->
Universal `platform-server` 앱은 브라우저에서 실행되지 않기 때문에 브라우저 API를 직접 활용할 수 없습니다.

그래서 서버 사이드 페이지는 브라우저에만 존재하는 `window`나 `document`, `navigator`, `location`과 같은 전역 객체를 참조할 수 없습니다.

Angular는 이런 객체를 참조해야 하는 상황을 대비해서 [`Localtion`](api/common/Location)이나 [`DOCUMENT`](api/common/DOCUMENT) 과 같은 추상 클래스를 제공하기 때문에, 필요한 곳에 의존성으로 주입받아 사용하면 됩니다.
그리고 Angular가 제공하는 추상 클래스로 해결할 수 없다면 개발자가 직접 이 추상 클래스를 정의해야 합니다.

이와 비슷하게, 마우스 이벤트나 키보드 이벤트도 서버 사이드 앱에는 존재하지 않습니다.
서버에서 페이지를 렌더링하는데 컴포넌트를 표시하는 버튼을 누를 사용자가 없기 때문입니다.
그렇다면 서버 사이드 앱은 클라이언트의 요청만으로 온전히 렌더링할 수 있는 로직으로 작성해야 합니다.
이 방식은 앱을 [라우팅할 수 있도록](guide/router) 구현한다는 측면에서도 활용할 수 있습니다.

결국 서버에서 렌더링된 페이지에서는 사용자가 링크를 클릭한다는 방식을 활용할 수 없기 때문에, 이와 유사한 UX를 제공할 수 있도록 구현방식을 수정해야 할 수도 있습니다.

{@a universal-engine}
<!--
### Universal template engine
-->
### Universal 템플릿 엔진

<!--
The important bit in the `server.ts` file is the `ngExpressEngine()` function.
-->
`server.ts` 파일에서는 `ngExpressEngine()` 함수가 중요합니다.

<code-example path="universal/server.ts" header="server.ts" region="ngExpressEngine">
</code-example>

<!--
The `ngExpressEngine()` function is a wrapper around Universal's `renderModule()` function which turns a client's
requests into server-rendered HTML pages. It accepts an object with the following properties:

* `bootstrap`: The root `NgModule` or `NgModule` factory to use for bootstraping the application when rendering on the server. For the example
application, it is `AppServerModule`. It's the bridge between the Universal server-side renderer and the Angular application.
* `extraProviders`: This property is optional and lets you specify dependency providers that apply only when rendering the application on the server. Do this when your application needs information that can only be determined by the currently running server instance.

The `ngExpressEngine()` function returns a `Promise` callback that resolves to the rendered page.
It's up to the engine to decide what to do with that page.
This engine's `Promise` callback returns the rendered page to the web server,
which then forwards it to the client in the HTTP response.
-->
`ngExpressEngine()` 함수는 Universal이 제공하는 `renderModule()` 함수를 랩핑한 함수이며, `renderModuleFactory()` 함수는 클라이언트의 요청을 서버가 렌더링한 HTML 페이지로 변경해서 요청하는 함수입니다.

* `bootstrap`: 서버에서 렌더링할 때 사용할 최상위 `NgModule`이나 `NgModule` 팩토리를 지정합니다. 그래서 `AppServerModule`와 같은 모듈을 지정할 수 있습니다. 이 때 지정되는 모듈은 Universal 서버사이드 렌더러와 Angular 애플리케이션을 연결하는 다리 역할을 합니다.

* `extraProviders`: 서버에서 렌더링할 때 필요한 의존성 프로바이더를 등록할 수 있으며, 생략할 수 있습니다. 서버 인스턴스가 어떤 환경에서 실행되는지 확인하는 용도로 활용할 수 있습니다.

`ngExpressEngine()` 함수는 렌더링된 페이지를 `Promise` 콜백 형태로 반환합니다.
그리고 이 페이지를 어떻게 활용할 것인지는 서버에서 사용하는 엔진에 따라 달라집니다.
단순하게 구현하면, `Promise` 콜백 형태로 전달된 페이지를 웹 서버로 반환하고 웹 서버가 HTTP 응답으로 클라이언트에 전달하면 됩니다.

<div class="alert is-helpful">

  <!--
  **Note:**  These wrappers help hide the complexity of the `renderModule()` function. There are more wrappers
  for different backend technologies at the [Universal repository](https://github.com/angular/universal).

  -->
  **참고:** `renderModule()` 함수를 직접 사용하는 것보다는 `ngExpressEngine()` 랩핑 헬퍼를 사용하는 것이 편합니다.
  이와 비슷한 방식으로 제공되는 랩퍼 함수들을 알아보려면 [Universal 레파지토리](https://github.com/angular/universal)를 참고하세요.

</div>

<!--
### Filtering request URLs
-->
### 요청으로 보내는 URL 필터링하기

<!--
NOTE: The basic behavior described below is handled automatically when using the NgUniversal Express schematic. This
is helpful when trying to understand the underlying behavior or replicate it without using the schematic.

The web server must distinguish _app page requests_ from other kinds of requests.

It's not as simple as intercepting a request to the root address `/`.
The browser could ask for one of the application routes such as `/dashboard`, `/heroes`, or `/detail:12`.
In fact, if the application were only rendered by the server, _every_ application link clicked would arrive at the server
as a navigation URL intended for the router.

Fortunately, application routes have something in common: their URLs lack file extensions.
(Data requests also lack extensions but they can be recognized because they always begin with `/api`.)
All static asset requests have a file extension (such as `main.js` or `/node_modules/zone.js/bundles/zone.umd.js`).

Because you use routing, you can recognize the three types of requests and handle them differently.

1. **Data request**: request URL that begins `/api`.
1. **App navigation**: request URL with no file extension.
1. **Static asset**: all other requests.

A Node.js Express server is a pipeline of middleware that filters and processes requests one after the other.
You configure the Node.js Express server pipeline with calls to `server.get()` like this one for data requests.

<code-example path="universal/server.ts" header="server.ts (data URL)" region="data-request"></code-example>
-->
참고: NgUniversal Express 스키매틱을 사용하면 아래에서 설명하는 내용은 자동으로 처리됩니다. 스키매틱을 사용하는 방법에 대해 익숙하지 않더라도 내용을 이해하는 데에는 어려움이 없을 것입니다.

웹 서버는 _앱 페이지를 요청하는 것_ 과 데이터를 요청하는 것을 구별할 수 있어야 합니다.

하지만 최상위 주소 `/` 이외에는 이 요청이 어떤 용도로 사용되는 것인지 구분하기 어렵습니다.
브라우저가 사용하는 라우팅 경로가 `/dashboard`나 `heroes`, `/detail:12`와 같은 형식으로 존재할 수 있기 때문입니다.
그런데 앱이 서버에서 모두 렌더링되어 서비스된다고 하면, 사용자가 클릭할 수 있는 _모든_ 앱 링크는 페이지를 전환하는 URL에 해당하며 Angular 라우터가 모두 처리해야 한다고 간주할 수 있습니다.

다행히 애플리케이션 라우팅이 공통으로 활용할 수 있는 규칙이 있습니다: 파일 확장자가 없는 URL을 모두 라우팅 경로로 간주하는 방법입니다.
(데이터 요청도 확장자가 없지만, 이 경우에는 URL이 `/api`로 시작하기 때문에 쉽게 구분할 수 있습니다.)
앱에 필요한 정적 애셋(static asset)들은 모두 확장자가 존재합니다. (ex. `main.js`, `/node_modules/zone.js/bundles/zone.umd.js`)

Angular 앱은 라우터를 사용하기 때문에 다음과 같은 3가지 요청을 쉽게 구분하고 적절한 방법으로 처리할 수 있습니다.

1. **데이터 요청** - URL이 `/api`로 시작하는 경우
2. **앱 네비게이션** - 파일 확장자가 없는 경우
3. **정적 애셋** - 두 경우를 제외한 모든 경우

Node.js Express 서버는 미들웨어 파이프라인을 연결하는 방식으로 동작하기 때문에 클라이언트가 보낸 요청을 처리할 때 URL을 활용할 수 있습니다.
그래서 데이터 요청 URL을 처리하는 Node Express 서버의 파이프라인을 정의한다면 Express가 제공하는 `app.get()` 함수를 사용해서 다음과 같이 정의할 수 있습니다.

<code-example path="universal/server.ts" header="server.ts (데이터 URL)" region="data-request"></code-example>

<div class="alert is-helpful">

  <!--
  **Note:** This sample server doesn't handle data requests.

  The tutorial's "in-memory web API" module, a demo and development tool, intercepts all HTTP calls and
  simulates the behavior of a remote data server.
  In practice, you would remove that module and register your web API middleware on the server here.
  -->
  **참고:** 튜토리얼 설정으로는 데이터 요청을 처리하지 않습니다.

  지금 살펴보고 있는 튜토리얼은 "인-메모리 웹 API" 모듈을 사용하기 때문에, 서버로 보내야 하는 모든 HTTP 요청을 가로채서 메모리 안에서 처리합니다.
  리모트 데이터 서버로 실제 요청을 보내려면 이 모듈을 제거하고 서버에 웹 API 미들웨어를 설정해야 합니다.

</div>

<!--
The following code filters for request URLs with no extensions and treats them as navigation requests.

<code-example path="universal/server.ts" header="server.ts (navigation)" region="navigation-request"></code-example>
-->
다음 코드는 URL에 확장자가 없을 때 이 요청을 네비게이션 요청으로 처리하는 코드입니다.

<code-example path="universal/server.ts" header="server.ts (네비게이션)" region="navigation-request"></code-example>


<!--
### Serving static files safely
-->
### 정적 파일 안전하게 제공하기

<!--
A single `server.use()` treats all other URLs as requests for static assets
such as JavaScript, image, and style files.

To ensure that clients can only download the files that they are permitted to see, put all client-facing asset files in
the `/dist` folder and only honor requests for files from the `/dist` folder.

The following Node.js Express code routes all remaining requests to `/dist`, and returns a `404 - NOT FOUND` error if the
file isn't found.

<code-example path="universal/server.ts" header="server.ts (static files)" region="static"></code-example>
-->
JavaScript 파일이나 이미지 파일, 스타일 파일과 같은 정적 애셋은 `server.use()` 하나로 간단하게 처리할 수 있습니다.

그리고 클라이언트가 이 파일들을 다운로드 받을 수 있는 권한을 지정하기 위해, 애셋 파일은 모두 `/dist` 폴더에 두는 것이 좋습니다.

아래 코드는 정적 애셋을 요청받았을 때 실행되는 Node.js Express 코드입니다.
요청받은 파일은 `/dist` 폴더에서 찾아 보내는데, 이 파일이 존재하지 않으면 `404 - NOT FOUND`를 반환합니다.

<code-example path="universal/server.ts" header="server.ts (정적 파일)" region="static"></code-example>


<!--
### Using absolute URLs for HTTP (data) requests on the server
-->
### 서버에서 절대 URL 사용하기

<!--
The tutorial's `HeroService` and `HeroSearchService` delegate to the Angular `HttpClient` module to fetch application data.
These services send requests to _relative_ URLs such as `api/heroes`.
In a server-side rendered app, HTTP URLs must be _absolute_ (for example, `https://my-server.com/api/heroes`).
This means that the URLs must be somehow converted to absolute when running on the server and be left relative when running in the browser.

If you are using one of the `@nguniversal/*-engine` packages (such as `@nguniversal/express-engine`), this is taken care for you automatically.
You don't need to do anything to make relative URLs work on the server.

If, for some reason, you are not using an `@nguniversal/*-engine` package, you might need to handle it yourself.

The recommended solution is to pass the full request URL to the `options` argument of [renderModule()](api/platform-server/renderModule) or [renderModuleFactory()](api/platform-server/renderModuleFactory) (depending on what you use to render `AppServerModule` on the server).
This option is the least intrusive as it does not require any changes to the application.
Here, "request URL" refers to the URL of the request as a response to which the application is being rendered on the server.
For example, if the client requested `https://my-server.com/dashboard` and you are rendering the application on the server to respond to that request, `options.url` should be set to `https://my-server.com/dashboard`.

Now, on every HTTP request made as part of rendering the application on the server, Angular can correctly resolve the request URL to an absolute URL, using the provided `options.url`.
-->
튜토리얼에서 다룬 `HeroService`와 `HeroSearchService`는 Angular `HttpClient` 모듈을 사용해서 애플리케이션 데이터를 가져옵니다.
이 때 서비스는 `api/heroes`와 같은 _상대_ URL로 요청을 보냅니다.
서버사이드에서 렌더링되는 앱은 반드시 `https://my-server.com/api/heroes`와 같은 _절대_ HTTP URL을 사용해야 합니다.
이 말은, 서버에서 사용되는 URL은 절대주소로 변환되어야 하지만, 브라우저에서 실행될 때를 위해 상대주소로도 남아있어야 한다는 것을 의미합니다.

이 과정은 `@nguniversal/express-engine`와 같이 `@nguniversal/*-engine` 형태로 제공되는 패키지를 활용하면 자동으로 처리할 수 있습니다.
직접 설정해야 하는 내용은 아무것도 없습니다.

하지만 이유가 있어서 `@nguniversal/*-engine` 패키지를 사용할 수 없다면 이 과정을 직접 처리해야 합니다.

이 때 권장하는 방법은 항상 전체 URL을 [renderModule()](api/platform-server/renderModule), [renderModuleFactory()](api/platform-server/renderModuleFactory)의 `options` 인자로 전달하는 것입니다.
대상은 `AppServerModule`에 어떤 것을 지정했는지에 따라 다릅니다.
이 옵션값은 앱이 수정되더라도 변경될 일이 거의 없기 때문에 관리하기도 편합니다.
`https://my-server.com/dashboard`라는 주소에 대응하는 앱을 서버에서 렌더링하는 상황이라면 `options.url`도 `https://my-server.com/dashboard`와 함께 지정하는 방식입니다.

이렇게 설정하면 서버에서 앱을 렌더링할 때 필요한 HTTP 요청이 모두 `options.url`를 사용해서 절대 URL로 변경됩니다.

<!--
### Useful scripts
-->
### 활용하면 좋은 스크립트

- `npm run dev:ssr`

  <!--
  This command is similar to [`ng serve`](cli/serve), which offers live reload during development, but uses server-side rendering. The application runs in watch mode and refreshes the browser after every change.
  This command is slower than the actual `ng serve` command.
  -->
  이 커맨드는 자동으로 갱신되는 개발 서버를 띄우는 [`ng serve`](cli/serve) 명령과 비슷하지만, 서버 사이드 렌더링 기능이 추가되었습니다.
  그래서 `ng serve` 명령보다는 다소 느립니다.

- `ng build && ng run app-name:server`

  <!--
  This command builds both the server script and the application in production mode.
  Use this command when you want to build the project for deployment.
  -->
  이 명령을 실행하면 서버 스크립트를 빌드하고 애플리케이션을 운영 모드로 실행합니다.
  배포용으로 빌드할 때 활용하면 좋습니다.

- `npm run serve:ssr`

  <!--
  This command starts the server script for serving the application locally with server-side rendering.
  It uses the build artifacts created by `ng run build:ssr`, so make sure you have run that command as well.

  Note that `serve:ssr` is not intended to be used to serve your application in production, but only for testing the server-side rendered application locally.
  -->
  이 명령을 실행하면 서버 스크립트를 실행하고 서버 사이드 렌더링이 지원되는 형태로 개발 서버를 실행합니다.
  그리고 이 명령은 `ng run build:ssr`이 만든 아티팩트를 활용하기 때문에 `ng run build:ssr` 명령이 제대로 실행되는 것을 확인한 후에 사용하세요.

  `server:ssr`는 애플리케이션을 운영환경에서 제공하기 위한 것이 아닙니다.
  로컬에서 서버 사이드 렌더링을 테스트할 때만 사용하세요.

- `npm run prerender`

  <!--
  This script can be used to prerender an application's pages.
  Read more about prerendering [here](guide/prerendering).
  -->
  애플리케이션 화면을 사전 렌더링할 때 사용합니다.
  자세한 내용은 [사전 렌더링](guide/prerendering) 문서를 참고하세요.
