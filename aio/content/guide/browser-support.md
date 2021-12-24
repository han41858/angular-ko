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
<!--
## Configuring Angular CLI for compatibility with IE11
-->
## IE11 호환성 설정하기

<!--
While Angular supports all browsers listed above, in order to improve the build times and output,  Angular CLI applications don't support IE11 by default.

Angular CLI uses [`browserlist`](https://github.com/browserslist/browserslist) to configure browser support for applications.

You can enable the IE11 support by following the instructions in the `.browserslistrc` file at the root of your project.
-->
Angular는 위에서 언급한 브라우저를 모두 지원하지만, 빌드 시간을 줄이고 빌드 결과물을 최적화 하기 위해 IE11 지원은 기본 상태에서 꺼져 있습니다.

Angular CLI는 [`browserlist`](https://github.com/browserslist/browserslist)를 사용해서 애플리케이션이 지원할 브라우저를 설정합니다.

IE11를 지원하려면 프로젝트 최상위 폴더에 있는 `.browserlistrc` 파일을 수정하면 됩니다.


{@a polyfills}
<!--
## Polyfills
-->
## 폴리필 (Polyfills)

<!--
Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.
You compensate by loading polyfill scripts ("polyfills") for the browsers that you must support.
See instructions on how to include polyfills into your project below.
-->
Angular는 최신 웹 플랫폼 표준을 준수하며 만들어졌습니다.
하지만 최신 브라우저들이 대부분 지원하는 기능을 제대로 지원하지 않는 일부 브라우저에서는 Angular 애플리케이션의 기능 중 일부가 제대로 동작하지 않을 수 있습니다.
이 문제는 폴리필 스크립트를 로드하는 방법으로 해결할 수 있습니다.
개발자들이 자주 사용하는 폴리필은 아래 문단을 참고하세요.

<div class="alert is-important">

<!--
The suggested polyfills are the ones that run full Angular applications.
You might need additional polyfills to support features not covered by this list.
Note that polyfills cannot magically transform an old, slow browser into a modern, fast one.
-->
이 문서에서 소개하는 폴리필은 Angular 애플리케이션을 제대로 동작시키기 위해 필요한 것들입니다.
그래서 필요한 기능이 더 있다면 또 다른 폴리필을 추가해야 할 수도 있습니다.
다만, 오래되고 느린 브라우저에 폴리필을 사용했다고 해서 최신 스펙으로 동작하고 속도도 빠른 브라우저로 짠 변신하는 것은 아닙니다.

</div>


<!--
## Enabling polyfills with CLI projects
-->
## Angular CLI로 만든 프로젝트에 폴리필 활성화하기

<!--
The [Angular CLI](cli) provides support for polyfills.
If you are not using the CLI to create your projects, see [Polyfill instructions for non-CLI users](#non-cli).

When you create a project with the `ng new` command, a `src/polyfills.ts` configuration file is created as part of your project folder.
This file incorporates the mandatory and many of the optional polyfills as JavaScript `import` statements.

* The npm packages for the mandatory polyfills (such as `zone.js`) are installed automatically for you when you create your project with `ng new`, and their corresponding `import` statements are already enabled in the `src/polyfills.ts` configuration file.

* If you need an _optional_ polyfill, you must install its npm package, then uncomment or create the corresponding import statement in the `src/polyfills.ts` configuration file.
-->
[Angular CLI](cli)는 폴리필을 지원합니다.
프로젝트를 생성할 때 Angular CLI를 사용하지 않았다면 [Angular CLI를 사용하지 않은 환경에서 폴리필 설정하기](#non-cli) 섹션을 참고하세요.

Angular CLI `ng new` 명령으로 프로젝트를 설정했다면 폴리필 설정이 이미 `src/polyfills.ts` 파일에 구성되어 있습니다.
이 파일에는 필수 폴리필과 옵션 폴리필이 JavaScript `import`로 로드하도록 구성되어 있습니다.

* `ng new` 명령으로 프로젝트를 생성하면 `zone.js`와 같은 필수 폴리필이 `src/polyfills.ts` 환경설정 파일에서 `import` 구문으로 로드됩니다.

* _옵션_ 폴리필이 필요하면 해당 npm 패키지를 설치한 후에 `src/polyfills.ts` 파일에서 `import` 구문을 찾아서 주석을 해제하거나 추가하면 됩니다.


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
     * in Edge developer tools, the addEventListener will also be wrapped by zone.js
     * with the following flag, it will bypass `zone.js` patch for Edge
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
  &lt;script>
    /**
     * 애플리케이션 초기 실행 시간을 줄이려면 zone에 관련된 플래그들을 비활성화할 수 있습니다.
     * 이 옵션을 사용하면 디버깅이 어려워지기 때문에 관련 내용을 확실하게 이해하고 있을 때만 적용하세요.
     */
    // __Zone_disable_requestAnimationFrame = true; // requestAnimationFrame 패치를 비활성화합니다.
    // __Zone_disable_on_property = true; // onclick과 같은 onProperty 패치를 비활성화합니다.
    // __zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // 이벤트 이름으로 동작하는 패치를 비활성화합니다.

    /*
     * Edge 개발자 도구에서는 addEventListener가 zone.js을 사용합니다.
     * 아래 옵션을 설정하면 IE/Edge에서 `zone.js` 패치를 생략할 수 있습니다.
     */
    // __Zone_enable_cross_context_check = true;
&lt;/script>
&lt;!-- Angular에는 zone.js이 필요합니다. --&gt;
&lt;script src="node_modules/zone.js/bundles/zone.js">&lt;/script>
&lt;!-- 애플리케이션 폴리필 --&gt;
</code-example>