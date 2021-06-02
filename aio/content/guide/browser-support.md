<!--
# Browser support
-->
# 브라우저 지원

<!--
Angular supports most recent browsers. This includes the following specific versions:
-->
Angular는 대부분의 브라우저를 지원합니다. 좀 더 자세하게 설명하면 다음 버전을 지원합니다:

<table>
  <tr>
    <!--
    <th>Browser</th>
    <th>Supported versions</th>
    -->
    <th>브라우저</th>
    <th>지원 버전</th>
  </tr>
  <tr>
    <td>Chrome</td>
    <!--
    <td>latest</td>
    -->
    <td>최신 버전</td>
  </tr>
  <tr>
    <td>Firefox</td>
    <!--
    <td>latest and extended support release (ESR)</td>
    -->
    <td>최신버전과 ESR(extended support release) 버전</td>
  </tr>
  <tr>
    <td>Edge</td>
    <!--
    <td>2 most recent major versions</td>
    -->
    <td>최근 2개 메이저 버전</td>
  </tr>
  <tr>
    <td>IE</td>
    <td>
      11<br>
      <!--
      <em>*deprecated, see the <a href="guide/deprecations#internet-explorer-11">deprecations guide</a></em>
      -->
      <em>*지원이 중단되었습니다. <a href="guide/deprecations#internet-explorer-11">지원 중단 가이드</a> 문서를 참고하세요.</em>
    </td>
  </tr>
  <tr>
    <td>Safari</td>
    <!--
    <td>2 most recent major versions</td>
    -->
    <td>최근 2개 메이저 버전</td>
  </tr>
  <tr>
    <td>iOS</td>
    <!--
    <td>2 most recent major versions</td>
    -->
    <td>최근 2개 메이저 버전</td>
  </tr>
  <tr>
    <td>Android</td>
    <td>Q (10.0), Pie (9.0), Oreo (8.0), Nougat (7.0)</td>
  </tr>
</table>


<div class="alert is-helpful">

<!--
Angular's continuous integration process runs unit tests of the framework on all of these browsers for every pull request,
using [Sauce Labs](https://saucelabs.com/) and
[BrowserStack](https://www.browserstack.com/).
-->
Angular는 [Sauce Labs](https://saucelabs.com/)와 [BrowserStack](https://www.browserstack.com/)과 함께 브라우저 지원을 위해 지속적으로 노력하고 있습니다.

</div>


{@a ie11}
## Configuring Angular CLI for compatibility with IE11

While Angular supports all browsers listed above, in order to improve the build times and output,  Angular CLI applications don't support IE11 by default.

Angular CLI uses [`browserlist`](https://github.com/browserslist/browserslist) to configure browser support for applications.

You can enable the IE11 support by following the instructions in the `.browserslistrc` file at the root of your project.


{@a polyfills}
<!--
## Polyfills
-->
## 폴리필 (Polyfills)

<!--
Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.
You compensate by loading polyfill scripts ("polyfills") for the browsers that you must support.
The [table below](#polyfill-libs) identifies most of the polyfills you might need.

<div class="alert is-important">

The suggested polyfills are the ones that run full Angular applications.
You may need additional polyfills to support features not covered by this list.
Note that polyfills cannot magically transform an old, slow browser into a modern, fast one.

</div>

In Angular CLI version 8 and higher, applications are built using *differential loading*, a strategy where the CLI builds two separate bundles as part of your deployed application.

* The first bundle contains modern ES2015 syntax, takes advantage of built-in support in modern browsers, ships less polyfills, and results in a smaller bundle size.

* The second bundle contains code in the old ES5 syntax, along with all necessary polyfills. This results in a larger bundle size, but supports older browsers.

This strategy allows you to continue to build your web application to support multiple browsers, but only load the necessary code that the browser needs.
For more information about how this works, see [Differential Loading](guide/deployment#differential-loading) in the [Deployment guide](guide/deployment).
-->

Angular는 최신 웹 플랫폼 표준을 준수하며 만들어졌습니다.
하지만 최신 브라우저들이 대부분 지원하는 기능을 제대로 지원하지 않는 일부 브라우저에서는 Angular 애플리케이션의 기능 중 일부가 제대로 동작하지 않을 수 있습니다.
이 문제는 폴리필 스크립트를 로드하는 방법으로 해결할 수 있습니다.
개발자들이 자주 사용하는 폴리필은 [아래 표](#polyfill-libs)를 참고하세요.


<div class="alert is-important">

이 문서에서 소개하는 폴리필은 Angular 애플리케이션을 제대로 동작시키기 위해 필요한 것들입니다.
그래서 필요한 기능이 더 있다면 또 다른 폴리필을 추가해야 할 수도 있습니다.
다만, 오래되고 느린 브라우저에 폴리필을 사용했다고 해서 최신 스펙으로 동작하고 속도도 빠른 브라우저로 짠 변신하는 것은 아닙니다.

</div>


Angular CLI 8 이후 버전은 애플리케이션을 빌드할 때 *증분 로딩(differential loading)*을 활용하기 때문에 빌드 결과물도 두 벌로 생성됩니다.

* 첫 번째 빌드 결과물은 최신 ES2015 문법으로 생성됩니다. 이 파일을 활용하면 폴리필을 거의 사용하지 않고도 최신 브라우저가 지원하는 기능을 활용할 수 있습니다. 빌드 결과물 크기도 작습니다.

* 두 번째 빌드 결과물은 ES5 문법으로 생성됩니다. 이 파일을 활용하려면 폴리필이 필요하며, 빌드 결과물 크기도 좀 더 크지만 오래된 브라우저를 지원할 수 있습니다.

이 방식을 활용하면 웹 애플리케이션이 지원하는 브라우저를 다양하게 확보할 수 있습니다.
브라우저는 애플리케이션에 필요한 파일만 다운로드받아 실행합니다.
증분 로딩이 어떻게 동작하는지 알아보려면 [배포](guide/deployment) 문서의 [증분 로딩](guide/deployment#differential-loading) 섹션을 참고하세요.

<!--
## Enabling polyfills with CLI projects
-->
## Angular CLI로 만든 프로젝트에 폴리필 활성화하기

<!--
The [Angular CLI](cli) provides support for polyfills.
If you are not using the CLI to create your projects, see [Polyfill instructions for non-CLI users](#non-cli).

When you create a project with the `ng new` command, a `src/polyfills.ts` configuration file is created as part of your project folder.
This file incorporates the mandatory and many of the optional polyfills as JavaScript `import` statements.

* The npm packages for the [_mandatory_ polyfills](#polyfill-libs) (such as `zone.js`) are installed automatically for you when you create your project with `ng new`, and their corresponding `import` statements are already enabled in the `src/polyfills.ts` configuration file.

* If you need an _optional_ polyfill, you must install its npm package, then uncomment or create the corresponding import statement in the `src/polyfills.ts` configuration file.

For example, if you need the optional [web animations polyfill](https://caniuse.com/web-animation), you could install it with `npm`, using the following command (or the `yarn` equivalent):

<code-example language="sh">
  # install the optional web animations polyfill
  npm install --save web-animations-js
</code-example>

You can then add the import statement in the `src/polyfills.ts` file.
For many polyfills, you can un-comment the corresponding `import` statement in the file, as in the following example.

<code-example header="src/polyfills.ts">
  /**
  * Required to support Web Animations `@angular/platform-browser/animations`.
  * Needed for: All but Chrome, Firefox and Opera. https://caniuse.com/web-animation
  **/
  import 'web-animations-js';  // Run `npm install --save web-animations-js`.
</code-example>

If the polyfill you want is not already in `polyfills.ts` file, add the `import` statement by hand.
-->
[Angular CLI](cli)는 폴리필을 지원합니다.
프로젝트를 생성할 때 Angular CLI를 사용하지 않았다면 [Angular CLI를 사용하지 않은 환경에서 폴리필 설정하기](#non-cli) 섹션을 참고하세요.

Angular CLI `ng new` 명령으로 프로젝트를 설정했다면 폴리필 설정이 이미 `src/polyfills.ts` 파일에 구성되어 있습니다.
이 파일에는 필수 폴리필과 옵션 폴리필이 추가되어 있습니다.

* `ng new` 명령으로 프로젝트를 생성하면 `zone.js`와 같은 [_필수_ 폴리필](#polyfill-libs)이 `src/polyfills.ts` 환경설정 파일에서 `import` 구문으로 로드됩니다.

* _옵션_ 폴리필이 필요하면 해당 npm 패키지를 설치한 후에 `src/polyfills.ts` 파일에서 `import` 구문을 찾아서 주석을 해제하거나 추가하면 됩니다.

예를 들어 [웹 애니메이션 폴리필](https://caniuse.com/web-animation)이 필요하다면 `npm`으로 해당 패키지를 설치하면 됩니다(`yarn`도 사용할 수 있습니다):


<code-example language="sh">
  # 웹 애니메이션 폴리필을 설치합니다.
  npm install --save web-animations-js
</code-example>


그리고 `src/polyfills.ts` 파일에 `import` 구문을 추가합니다.
해당 `import` 구문이 이미 파일에 있다면 주석을 해제하면 됩니다.


<code-example header="src/polyfills.ts">
  /**
  * `@angular/platform-browser/animations` 패키지로 웹 애니메이션을 사용할 때 필요합니다.
  * Chrome, Firefox, Opera를 제외한 브라우저에 필요합니다. https://caniuse.com/web-animation
  **/
  import 'web-animations-js';  // `npm install --save web-animations-js` 명령을 실행한 후에 동작합니다.
</code-example>


원하는 `import` 구문이 `polyfills.ts` 파일에 없다면, 직접 `import` 구문을 추가하면 됩니다.


{@a polyfill-libs}

<!--
### Mandatory polyfills
-->
### 필수 폴리필

<!--
These are the polyfills required to run an Angular application on each supported browser:
-->
다음 브라우저에서 Angular 애플리케이션을 실행하려면 반드시 폴리필을 적용해야 합니다:

<table>
  <tr style="vertical-align: top">
    <!--
    <th>Browsers (Desktop & Mobile)</th>
    <th>Polyfills Required</th>
    -->
    <th>브라우저 (데스크탑 & 모바일)</th>
    <th>필요한 폴리필</th>
  </tr>
  <tr style="vertical-align: top">
    <td>
      Chrome, Firefox, Edge, <br>
      Safari, Android, IE 11
    </td>
    <td>
      <a href="guide/browser-support#core-es6">ES2015</a>
    </td>
  </tr>
</table>


<!--
### Optional browser features to polyfill
-->
### 폴리필을 적용해야 하는 Angular 기능

<!--
Some features of Angular may require additional polyfills.
-->
Angular 기능 중 일부는 폴리필을 추가로 적용해야 하는 것이 있습니다.

<table>
  <tr style="vertical-align: top">
    <!--
    <th>Feature</th>
    <th>Polyfill</th>
    <th style="width: 50%">Browsers (Desktop & Mobile)</th>
    -->
    <th>기능</th>
    <th>폴리픽</th>
    <th style="width: 50%">브라우저 (데스크탑 & 모바일)</th>
  </tr>
  <tr style="vertical-align: top">
    <td>
      <!--
      <a href="api/animations/AnimationBuilder">AnimationBuilder</a>
      (Standard animation support does not require polyfills.)
      -->
      <a href="api/animations/AnimationBuilder">AnimationBuilder</a>
      (표준 애니메이션만 사용하면 폴리필이 필요하지 않습니다.)
    </td>
    <td>
      <!--
      <a href="guide/browser-support#web-animations">Web Animations</a>
      -->
      <a href="guide/browser-support#web-animations">웹 애니메이션</a>
    </td>
    <td>
      <!--
      <p>If AnimationBuilder is used, enables scrubbing
      support for IE/Edge and Safari.
      (Chrome and Firefox support this natively).</p>
      -->
      <p>AnimationBuilder를 사용하면 IE, Edge, Safari에 폴리필이 필요합니다.(Chrome, Firefox는 기본 지원합니다.)</p>
    </td>
  </tr>

  <tr style="vertical-align: top">
    <td>
      <!--
      <a href="api/common/NgClass">NgClass</a> on SVG elements
      -->
      SVG 엘리먼트에 적용하는 <a href="api/common/NgClass">NgClass</a>
    </td>
    <td>
      <a href="guide/browser-support#classlist">classList</a>
    </td>
    <td>
      IE 11
    </td>
  </tr>

  <tr style="vertical-align: top">
    <td>
      <!--
      <a href="guide/router">Router</a> when using <a href="guide/router#location-strategy">hash-based routing</a>
      -->
      <a href="guide/router#location-strategy">해시 기반으로</a> <a href="guide/router">Router</a>를 사용할 때
    </td>
    <td>
      <a href="guide/browser-support#core-es7-array">ES7/array</a>
    </td>
    <td>
      IE 11
    </td>
  </tr>
</table>



<!--
### Suggested polyfills
-->
### 추천 폴리필

<!--
The following polyfills are used to test the framework itself. They are a good starting point for an application.
-->
아래 나열한 폴리필들은 프레임워크를 테스트할 때 사용하는 패키지들입니다.
애플리케이션 개발을 시작할때부터 추가해서 활용하는 것도 좋습니다.


<table>
  <tr>
    <th>
      <!--
      Polyfill
      -->
      폴리필
    </th>
    <th>
      <!--
      License
      -->
      라이센스
    </th>
    <th>
      <!--
      Size*
      -->
      크기*
    </th>
  </tr>
  <tr>
    <td>
      <a id='core-es7-array' href="https://github.com/zloirock/core-js/tree/v2/fn/array">ES7/array</a>
    </td>
    <td>
      MIT
    </td>
    <td>
      0.1KB
    </td>
  </tr>
  <tr>
    <td>
      <a id='core-es6' href="https://github.com/zloirock/core-js">ES2015</a>
    </td>
    <td>
      MIT
    </td>
    <td>
      27.4KB
    </td>
  </tr>

  <tr>
    <td>
      <a id='classlist' href="https://github.com/eligrey/classList.js">classList</a>
    </td>
    <td>
      Public domain
    </td>
    <td>
      1KB
    </td>
  </tr>
  <tr>
    <td>
       <a id='web-animations' href="https://github.com/web-animations/web-animations-js">Web Animations</a>
    </td>
    <td>
      Apache
    </td>
    <td>
      14.8KB
    </td>
  </tr>
</table>

<!--
\* Figures are for minified and gzipped code,
computed with the [closure compiler](https://closure-compiler.appspot.com/home).
-->
\* [closure compiler](https://closure-compiler.appspot.com/home)로 압축되고 난독화된 크기입니다.

{@a non-cli}

<!--
## Polyfills for non-CLI users
-->
## Angular CLI를 사용하지 않은 환경에서 폴리필 설정하기

<!--
If you are not using the CLI, add your polyfill scripts directly to the host web page (`index.html`).

For example:

<code-example header="src/index.html" language="html">
  &lt;!-- pre-zone polyfills ->
  &lt;script src="node_modules/core-js/client/shim.min.js">&lt;/script>
  &lt;script src="node_modules/web-animations-js/web-animations.min.js">&lt;/script>
  &lt;script>
    /**
     * you can configure some zone flags which can disable zone interception for some
     * asynchronous activities to improve startup performance - use these options only
     * if you know what you are doing as it could result in hard to trace down bugs..
     */
    // __Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
    // __Zone_disable_on_property = true; // disable patch onProperty such as onclick
    // __zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
    /*
     * in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
     * with the following flag, it will bypass `zone.js` patch for IE/Edge
     */
    // __Zone_enable_cross_context_check = true;
  &lt;/script>
  &lt;!-- zone.js required by Angular ->
  &lt;script src="node_modules/zone.js/bundles/zone.umd.js">&lt;/script>
  &lt;!-- application polyfills ->
</code-example>
-->
Angular CLI를 사용하지 않는다면 호스트 웹 페이지 파일 `index.html`에 폴리필 스크립트를 직접 추가하면 됩니다.

이렇게 설정합니다:

<code-example header="src/index.html" language="html">
  &lt;!-- 폴리필에 필요한 스크립트 --&gt;
  &lt;script src="node_modules/core-js/client/shim.min.js">&lt;/script>
  &lt;script src="node_modules/web-animations-js/web-animations.min.js">&lt;/script>
  &lt;script>
    /**
     * 애플리케이션 초기 실행 시간을 줄이려면 zone에 관련된 플래그들을 비활성화할 수 있습니다.
     * 이 옵션을 사용하면 디버깅이 어려워지기 때문에 관련 내용을 확실하게 이해하고 있을 때만 적용하세요.
     */
    // __Zone_disable_requestAnimationFrame = true; // requestAnimationFrame 패치를 비활성화합니다.
    // __Zone_disable_on_property = true; // onclick과 같은 onProperty 패치를 비활성화합니다.
    // __zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // 이벤트 이름으로 동작하는 패치를 비활성화합니다.

    /*
     * IE/Edge 개발자 도구에서는 addEventListener가 zone.js을 사용합니다.
     * 아래 옵션을 설정하면 IE/Edge에서 `zone.js` 패치를 생략할 수 있습니다.
     */
    // __Zone_enable_cross_context_check = true;
  &lt;/script>
  &lt;!-- Angular에는 zone.js이 필요합니다. --&gt;
  &lt;script src="node_modules/zone.js/bundles/zone.js">&lt;/script>

  &lt;!-- 애플리케이션 폴리필 --&gt;
</code-example>