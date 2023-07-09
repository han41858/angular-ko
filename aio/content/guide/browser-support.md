<!--
# Browser support
-->
# 브라우저 지원

<!--
Angular supports most recent browsers.
This includes the following specific versions:

| Browser | Supported versions |
|:---     |:---                |
| Chrome  | 2 most recent versions                      |
| Firefox | latest and extended support release \(ESR\) |
| Edge    | 2 most recent major versions                |
| Safari  | 2 most recent major versions                |
| iOS     | 2 most recent major versions                |
| Android | 2 most recent major versions                |

<div class="alert is-helpful">

Angular's continuous integration process runs unit tests of the framework on all of these browsers for every pull request, using [Sauce Labs](https://saucelabs.com).

</div>
-->
Angular는 대부분의 브라우저를 지원합니다.
좀 더 자세하게 설명하면 다음 버전을 지원합니다:

| 브라우저    | 지원 버전                                     |
|:--------|:------------------------------------------|
| Chrome  | 최신 버전                                     |
| Firefox | 최신 버전과 ESR\(extended support release\) 버전 |
| Edge    | 최근 2개 메이저 버전                              |
| Safari  | 최근 2개 메이저 버전                              |
| iOS     | 최근 2개 메이저 버전                              |
| Android | 최근 2개 메이저 버전                              |

<div class="alert is-helpful">

Angular는 [Sauce Labs](https://saucelabs.com/)와 함께 유닛 테스트를 실행할 수 있는 브라우저 확인을 위해 지속적으로 노력하고 있습니다.

</div>


<!--
## Polyfills
-->
## 폴리필 (Polyfills)

<!--
Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.
You compensate by loading polyfill scripts \("polyfills"\) for the browsers that you must support.
See instructions on how to include polyfills into your project below.

<div class="alert is-important">

The suggested polyfills are the ones that run full Angular applications.
You might need additional polyfills to support features not covered by this list.

</div>

<div class="alert is-helpful">

**NOTE**: <br />
Polyfills cannot magically transform an old, slow browser into a modern, fast one.

</div>
-->
Angular는 최신 웹 플랫폼 표준을 준수하며 만들어졌습니다.
하지만 최신 브라우저들이 대부분 지원하는 기능을 제대로 지원하지 않는 일부 브라우저에서는 Angular 애플리케이션의 기능 중 일부가 제대로 동작하지 않을 수 있습니다.
이 문제는 폴리필 스크립트를 로드하는 방법으로 해결할 수 있습니다.
개발자들이 자주 사용하는 폴리필은 아래 문단을 참고하세요.

<div class="alert is-important">

이 문서에서 소개하는 폴리필은 Angular 애플리케이션을 제대로 동작시키기 위해 필요한 것들입니다.
그래서 필요한 기능이 더 있다면 또 다른 폴리필을 추가해야 할 수도 있습니다.

</div>

<div class="alert is-helpful">

**참고**: <br />
다만, 오래되고 느린 브라우저에 폴리필을 사용했다고 해서 최신 스펙으로 동작하고 속도도 빠른 브라우저로 짠 변신하는 것은 아닙니다.

</div>


<!--
## Enabling polyfills with CLI projects
-->
## Angular CLI로 만든 프로젝트에 폴리필 활성화하기

<!--
The [Angular CLI](cli) provides support for polyfills.
If you are not using the CLI to create your projects, see [Polyfill instructions for non-CLI users](#non-cli).

The `polyfills` options of the [browser](cli/build) and [test](cli/test) builder can be a full path for a file \(Example: `src/polyfills.ts`\) or,
relative to the current workspace or module specifier \(Example: `zone.js`\).

If you create a TypeScript file, make sure to include it in the `files` property of your `tsconfig` file.

<code-example language="jsonc" syntax="jsonc">

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ]
  ...
}

</code-example>
-->
[Angular CLI](cli)는 폴리필을 지원합니다.
프로젝트를 생성할 때 Angular CLI를 사용하지 않았다면 [Angular CLI를 사용하지 않은 환경에서 폴리필 설정하기](#non-cli) 섹션을 참고하세요.

[browser](cli/build) 빌더와 [test](cli/test) 빌더에 `polyfills` 옵션을 사용할 때는 `src/polyfills.ts`와 같이 현재 워크스페이스을 기준으로 하는 상대주소와 `zone.js`와 같이 모듈을 의미하도록 지정하면 됩니다.

TypeScript 파일을 새로 만들었다면 `tsconfig` 파일의 `files` 프로퍼티를 다음과 같이 지정하면 됩니다.

<code-example language="jsonc" syntax="jsonc">

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ]
  ...
}

</code-example>


<a id="non-cli"></a>

<!--
## Polyfills for non-CLI users
-->
## Angular CLI를 사용하지 않은 환경에서 폴리필 설정하기

<!--
If you are not using the CLI, add your polyfill scripts directly to the host web page \(`index.html`\).

For example:

<code-example header="src/index.html" language="html">

&lt;!-- pre-zone polyfills --&gt;
&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
&lt;script>
  /**
   &ast; you can configure some zone flags which can disable zone interception for some
   &ast; asynchronous activities to improve startup performance - use these options only
   &ast; if you know what you are doing as it could result in hard to trace down bugs.
   */
  // &lowbar;&lowbar;Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
  // &lowbar;&lowbar;Zone_disable_on_property = true; // disable patch onProperty such as onclick
  // &lowbar;&lowbar;zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
  /*
   &ast; in Edge developer tools, the addEventListener will also be wrapped by zone.js
   &ast; with the following flag, it will bypass `zone.js` patch for Edge.
   */
  // &lowbar;&lowbar;Zone_enable_cross_context_check = true;
&lt;/script&gt;
&lt;!-- zone.js required by Angular --&gt;
&lt;script src="node_modules/zone.js/bundles/zone.umd.js"&gt;&lt;/script&gt;
&lt;!-- application polyfills --&gt;

</code-example>
-->
Angular CLI를 사용하지 않는다면 호스트 웹 페이지 파일 `index.html`에 폴리필 스크립트를 직접 추가하면 됩니다.

이렇게 설정합니다:

<code-example header="src/index.html" language="html">

&lt;!-- pre-zone polyfills --&gt;
&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
&lt;script>
  /**
   &ast; 애플리케이션 초기 실행 시간을 줄이려면 zone에 관련된 플래그들을 비활성화할 수 있습니다.
   &ast; 이 옵션을 사용하면 디버깅이 어려워지기 때문에 관련 내용을 확실하게 이해하고 있을 때만 적용하세요.
   */
  // &lowbar;&lowbar;Zone_disable_requestAnimationFrame = true; // requestAnimationFrame 패치를 비활성화합니다.
  // &lowbar;&lowbar;Zone_disable_on_property = true; // onclick과 같은 onProperty 패치를 비활성화합니다.
  // &lowbar;&lowbar;zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // 이벤트 이름으로 동작하는 패치를 비활성화합니다.
  /*
   &ast; Edge 개발자 도구에서는 addEventListener가 zone.js을 사용합니다.
   &ast; 아래 옵션을 설정하면 Edge에서 `zone.js` 패치를 생략할 수 있습니다.
   */
  // &lowbar;&lowbar;Zone_enable_cross_context_check = true;
&lt;/script&gt;
&lt;!-- Angular에는 zone.js이 필요합니다. --&gt;
&lt;script src="node_modules/zone.js/bundles/zone.umd.js"&gt;&lt;/script&gt;
&lt;!-- 애플리케이션 폴리필 --&gt;

</code-example>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-11-04
