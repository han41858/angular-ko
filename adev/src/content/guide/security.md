<!--
# Security
-->

<a id="security"></a>

# 보안

<!--
This topic describes Angular's built-in protections against common web application vulnerabilities and attacks such as cross-site scripting attacks.
It doesn't cover application-level security, such as authentication and authorization.

For more information about the attacks and mitigations described below, see the [Open Web Application Security Project (OWASP) Guide](https://www.owasp.org/index.php/Category:OWASP_Guide_Project).

<a id="report-issues"></a>

<docs-callout title="Reporting vulnerabilities">

Angular is part of Google [Open Source Software Vulnerability Reward Program](https://bughunters.google.com/about/rules/6521337925468160/google-open-source-software-vulnerability-reward-program-rules). For vulnerabilities in Angular, please submit your report at [https://bughunters.google.com](https://bughunters.google.com/report).

For more information about how Google handles security issues, see [Google's security philosophy](https://www.google.com/about/appsecurity).

</docs-callout>
-->

이 문서는 크로스 사이트 스크립팅 공격과 같은 일반적인 웹 애플리케이션 취약점과 공격에 대응하는 Angular의 내장 보호 기능을 설명합니다.
인증이나 인가처럼 애플리케이션 수준에서 다루는 보안은 설명하지 않습니다.

아래에 설명하는 공격과 대응 방법에 대한 자세한 내용은 [Open Web Application Security Project(OWASP) 가이드](https://www.owasp.org/index.php/Category:OWASP_Guide_Project)를 참고하세요.

<a id="report-issues"></a>

<docs-callout title="취약점 신고하기">

Angular는 Google [오픈소스 소프트웨어 취약점 보상 프로그램](https://bughunters.google.com/about/rules/6521337925468160/google-open-source-software-vulnerability-reward-program-rules)에 참여하고 있습니다.
Angular의 취약점은 [https://bughunters.google.com](https://bughunters.google.com/report)에서 신고해 주세요.

Google의 보안 문제 처리 방식에 대한 자세한 내용은 [Google의 보안 철학](https://www.google.com/about/appsecurity)을 참고하세요.

</docs-callout>

<!--
## Best practices
-->

<a id="best-practices"></a>

## 모범 사례

<!--
These are some best practices to ensure that your Angular application is secure.

1. **Keep current with the latest Angular library releases** - The Angular libraries get regular updates, and these updates might fix security defects discovered in previous versions. Check the Angular [change log](https://github.com/angular/angular/blob/main/CHANGELOG.md) for security-related updates.
2. **Don't alter your copy of Angular** - Private, customized versions of Angular tend to fall behind the current version and might not include important security fixes and enhancements. Instead, share your Angular improvements with the community and make a pull request.
3. **Avoid Angular APIs marked in the documentation as "_Security Risk_"** - For more information, see the [Trusting safe values](#trusting-safe-values) section of this page.
-->

Angular 애플리케이션의 보안을 유지하기 위한 모범 사례는 다음과 같습니다.

1. **Angular 라이브러리를 최신 버전으로 유지하세요.**
   Angular 라이브러리는 정기적으로 갱신되며, 이전 버전에서 발견된 보안 결함이 수정될 수 있습니다.
   Angular [변경 이력](https://github.com/angular/angular/blob/main/CHANGELOG.md)에서 보안 관련 갱신 사항을 확인하세요.
2. **사용 중인 Angular 자체를 수정하지 마세요.**
   Angular를 비공개로 수정한 커스텀 버전은 최신 버전보다 뒤처지기 쉬우며, 중요한 보안 수정과 개선 사항이 포함되지 않을 수 있습니다.
   대신 Angular 개선 사항을 커뮤니티에 공유하고 풀 리퀘스트를 보내세요.
3. **문서에 "_Security Risk_"로 표시된 Angular API는 사용을 피하세요.**
   자세한 내용은 이 페이지의 [안전한 값을 신뢰하도록 지정하기](#trusting-safe-values) 섹션을 참고하세요.

<!--
## Preventing cross-site scripting (XSS)
-->

<a id="preventing-cross-site-scripting-xss"></a>

## 크로스 사이트 스크립팅(XSS) 방지하기

<!--
[Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) enables attackers to inject malicious code into web pages.
Such code can then, for example, steal user and login data, or perform actions that impersonate the user.
This is one of the most common attacks on the web.

To block XSS attacks, you must prevent malicious code from entering the Document Object Model (DOM).
For example, if attackers can trick you into inserting a `<script>` tag in the DOM, they can run arbitrary code on your website.
The attack isn't limited to `<script>` tags —many elements and properties in the DOM allow code execution, for example, `<img alt="" onerror="...">` and `<a href="javascript:...">`.
If attacker-controlled data enters the DOM, expect security vulnerabilities.
-->

[크로스 사이트 스크립팅(XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting)은 공격자가 웹 페이지에 악성 코드를 삽입할 수 있게 하는 공격입니다.
이 코드는 사용자 정보나 로그인 정보를 훔치거나 사용자를 사칭해 작업을 수행하는 데 사용될 수 있습니다.
웹에서 가장 흔한 공격 중 하나입니다.

XSS 공격을 차단하려면 악성 코드가 문서 객체 모델(DOM)에 들어가지 못하도록 해야 합니다.
예를 들어 공격자가 개발자를 속여 DOM에 `<script>` 태그를 삽입하게 만들면 웹사이트에서 임의의 코드를 실행할 수 있습니다.
이 공격은 `<script>` 태그에만 한정되지 않습니다.
`<img alt="" onerror="...">`나 `<a href="javascript:...">`처럼 DOM의 여러 엘리먼트와 프로퍼티에서 코드를 실행할 수 있습니다.
공격자가 제어하는 데이터가 DOM에 들어오면 보안 취약점이 발생할 수 있다고 보아야 합니다.

<!--
### Angular's cross-site scripting security model
-->

<a id="angulars-cross-site-scripting-security-model"></a>

### Angular의 크로스 사이트 스크립팅 보안 모델

<!--
To systematically block XSS bugs, Angular treats all values as untrusted by default.
When a value is inserted into the DOM from a template binding, or interpolation, Angular sanitizes and escapes untrusted values.
If a value was already sanitized outside of Angular and is considered safe, communicate this to Angular by marking the [value as trusted](#trusting-safe-values).

Unlike values to be used for rendering, Angular templates are considered trusted by default, and should be treated as executable code.
Never create templates by concatenating user input and template syntax.
Doing this would enable attackers to [inject arbitrary code](https://en.wikipedia.org/wiki/Code_injection) into your application.
To prevent these vulnerabilities, always use the default [Ahead-Of-Time (AOT) template compiler](#use-the-aot-template-compiler) in production deployments.

An extra layer of protection can be provided through the use of Content security policy and Trusted Types.
These web platform features operate at the DOM level which is the most effective place to prevent XSS issues. Here they can't be bypassed using other, lower-level APIs.
For this reason, it is strongly encouraged to take advantage of these features. To do this, configure the [content security policy](#content-security-policy) for the application and enable [trusted types enforcement](#enforcing-trusted-types).
-->

Angular는 XSS 버그를 체계적으로 차단하기 위해 기본적으로 모든 값을 신뢰할 수 없는 값으로 취급합니다.
템플릿 바인딩이나 문자열 바인딩을 통해 DOM에 값을 삽입할 때 Angular는 신뢰할 수 없는 값을 무력화하고 이스케이프합니다.
Angular 외부에서 이미 무력화되어 안전하다고 판단한 값이라면, [신뢰할 수 있는 값으로 표시](#trusting-safe-values)해 Angular에 알려주세요.

렌더링에 사용하는 값과 달리 Angular 템플릿은 기본적으로 신뢰할 수 있다고 간주되며, 실행 가능한 코드로 취급해야 합니다.
사용자 입력과 템플릿 구문을 이어 붙여 템플릿을 만들지 마세요.
그렇게 하면 공격자가 애플리케이션에 [임의의 코드를 삽입](https://en.wikipedia.org/wiki/Code_injection)할 수 있습니다.
이러한 취약점을 방지하려면 프로덕션 배포에서 항상 기본 [AOT(Ahead-Of-Time) 템플릿 컴파일러](#use-the-aot-template-compiler)를 사용하세요.

콘텐츠 보안 정책과 Trusted Types를 사용하면 보호 계층을 추가할 수 있습니다.
이 웹 플랫폼 기능들은 XSS 문제를 방지하기에 가장 효과적인 DOM 수준에서 동작합니다.
따라서 더 저수준의 다른 API를 사용해 우회할 수 없습니다.
이러한 이유로 이 기능들을 적극적으로 활용하는 것을 권장합니다.
애플리케이션의 [콘텐츠 보안 정책](#content-security-policy)을 설정하고 [Trusted Types 강제 적용](#enforcing-trusted-types)을 활성화하세요.

<!--
### Sanitization and security contexts
-->

<a id="sanitization-and-security-contexts"></a>

### 무력화와 보안 컨텍스트

<!--
_Sanitization_ is the inspection of an untrusted value, turning it into a value that's safe to insert into the DOM.
In many cases, sanitization doesn't change a value at all.
Sanitization depends on a context.
For example, a value that's harmless in CSS is potentially dangerous in a URL.

Angular defines the following security contexts:

| Security contexts | Details                                                                           |
| :---------------- | :-------------------------------------------------------------------------------- |
| HTML              | Used when interpreting a value as HTML, for example, when binding to `innerHtml`. |
| Style             | Used when binding CSS into the `style` property.                                  |
| URL               | Used for URL properties, such as `<a href>`.                                      |
| Resource URL      | A URL that is loaded and executed as code, for example, in `<script src>`.        |

Angular sanitizes untrusted values for HTML and URLs. Sanitizing resource URLs isn't possible because they contain arbitrary code.
In development mode, Angular prints a console warning when it has to change a value during sanitization.
-->

_무력화(sanitization)_ 는 신뢰할 수 없는 값을 검사해 DOM에 안전하게 삽입할 수 있는 값으로 바꾸는 과정입니다.
무력화 과정에서 값이 전혀 바뀌지 않는 경우도 많습니다.
무력화 방식은 컨텍스트에 따라 달라집니다.
예를 들어 CSS에서는 무해한 값이 URL에서는 위험할 수 있습니다.

Angular는 다음 보안 컨텍스트를 정의합니다.

| 보안 컨텍스트 | 설명                                                                             |
| :------------ | :------------------------------------------------------------------------------- |
| HTML          | 값을 HTML로 해석할 때 사용합니다. 예를 들어 `innerHTML`에 바인딩하는 경우입니다. |
| Style         | CSS를 `style` 프로퍼티에 바인딩할 때 사용합니다.                                 |
| URL           | `<a href>`와 같은 URL 프로퍼티에 사용합니다.                                     |
| Resource URL  | `<script src>`처럼 불러온 후 코드로 실행하는 URL입니다.                          |

Angular는 HTML과 URL에서 신뢰할 수 없는 값을 무력화합니다.
리소스 URL은 임의의 코드를 포함하므로 무력화할 수 없습니다.
개발 모드에서는 Angular가 무력화 과정에서 값을 변경해야 할 때 콘솔에 경고를 출력합니다.

<!--
### Sanitization example
-->

<a id="sanitization-example"></a>

### 무력화 예제

<!--
The following template binds the value of `htmlSnippet`. Once by interpolating it into an element's content, and once by binding it to the `innerHTML` property of an element:

<docs-code header="inner-html-binding.component.html" path="adev/src/content/examples/security/src/app/inner-html-binding.component.html"/>

Interpolated content is always escaped —the HTML isn't interpreted and the browser displays angle brackets in the element's text content.

For the HTML to be interpreted, bind it to an HTML property such as `innerHTML`.
Be aware that binding a value that an attacker might control into `innerHTML` normally causes an XSS vulnerability.
For example, one could run JavaScript in a following way:

<docs-code header="inner-html-binding.component.ts (class)" path="adev/src/content/examples/security/src/app/inner-html-binding.component.ts" region="class"/>

Angular recognizes the value as unsafe and automatically sanitizes it, which removes the `script` element but keeps safe content such as the `<b>` element.

<img alt="A screenshot showing interpolated and bound HTML values" src="assets/images/guide/security/binding-inner-html.png#small">
-->

다음 템플릿은 `htmlSnippet`의 값을 두 가지 방식으로 바인딩합니다.
하나는 문자열 바인딩을 사용해 엘리먼트의 내용에 넣고, 다른 하나는 엘리먼트의 `innerHTML` 프로퍼티에 바인딩합니다.

<docs-code header="inner-html-binding.component.html" path="adev/src/content/examples/security/src/app/inner-html-binding.component.html"/>

문자열 바인딩으로 넣은 내용은 항상 이스케이프됩니다.
HTML로 해석되지 않으므로 브라우저는 꺾쇠괄호를 엘리먼트의 텍스트 내용으로 표시합니다.

HTML로 해석하게 하려면 `innerHTML`과 같은 HTML 프로퍼티에 바인딩하세요.
공격자가 제어할 수 있는 값을 `innerHTML`에 바인딩하면 일반적으로 XSS 취약점이 생긴다는 점에 유의하세요.
예를 들어 다음과 같은 방식으로 JavaScript를 실행할 수 있습니다.

<docs-code header="inner-html-binding.component.ts (클래스)" path="adev/src/content/examples/security/src/app/inner-html-binding.component.ts" region="class"/>

Angular는 이 값을 안전하지 않다고 인식해 자동으로 무력화합니다.
`script` 엘리먼트는 제거하지만 `<b>` 엘리먼트와 같은 안전한 내용은 유지합니다.

<img alt="문자열 바인딩과 바인딩으로 표시한 HTML 값의 화면" src="assets/images/guide/security/binding-inner-html.png#small">

<!--
### Direct use of the DOM APIs and explicit sanitization calls
-->

<a id="direct-use-of-the-dom-apis-and-explicit-sanitization-calls"></a>

### DOM API 직접 사용과 명시적 무력화 호출

<!--
Unless you enforce Trusted Types, the built-in browser DOM APIs don't automatically protect you from security vulnerabilities.
For example, `document`, the node available through `ElementRef`, and many third-party APIs contain unsafe methods.
Likewise, if you interact with other libraries that manipulate the DOM, you likely won't have the same automatic sanitization as with Angular interpolations.
Avoid directly interacting with the DOM and instead use Angular templates where possible.

For cases where this is unavoidable, use the built-in Angular sanitization functions.
Sanitize untrusted values with the [DomSanitizer.sanitize](api/platform-browser/DomSanitizer#sanitize) method and the appropriate `SecurityContext`.
That function also accepts values that were marked as trusted using the `bypassSecurityTrust` functions, and does not sanitize them, as [described below](#trusting-safe-values).
-->

Trusted Types를 강제 적용하지 않는 한, 브라우저의 내장 DOM API는 보안 취약점을 자동으로 방어하지 않습니다.
예를 들어 `document`, `ElementRef`를 통해 접근하는 노드, 여러 서드 파티 API에는 안전하지 않은 메서드가 포함되어 있습니다.
마찬가지로 DOM을 조작하는 다른 라이브러리와 상호작용할 때는 Angular 문자열 바인딩과 같은 자동 무력화 기능을 제공받지 못할 가능성이 높습니다.
DOM을 직접 조작하는 것은 피하고, 가능하면 Angular 템플릿을 사용하세요.

직접 조작이 불가피하다면 Angular에 내장된 무력화 함수를 사용하세요.
[DomSanitizer.sanitize](api/platform-browser/DomSanitizer#sanitize) 메서드와 적절한 `SecurityContext`로 신뢰할 수 없는 값을 무력화하세요.
이 함수는 `bypassSecurityTrust` 함수로 신뢰할 수 있다고 표시한 값도 받으며, [아래에서 설명하는 것처럼](#trusting-safe-values) 해당 값은 무력화하지 않습니다.

<!--
### Trusting safe values
-->

<a id="trusting-safe-values"></a>

### 안전한 값을 신뢰하도록 지정하기

<!--
Sometimes applications genuinely need to include executable code, display an `<iframe>` from some URL, or construct potentially dangerous URLs.
To prevent automatic sanitization in these situations, tell Angular that you inspected a value, checked how it was created, and made sure it is secure.
Do _be careful_.
If you trust a value that might be malicious, you are introducing a security vulnerability into your application.
If in doubt, find a professional security reviewer.

To mark a value as trusted, inject `DomSanitizer` and call one of the following methods:

- `bypassSecurityTrustHtml`
- `bypassSecurityTrustScript`
- `bypassSecurityTrustStyle`
- `bypassSecurityTrustUrl`
- `bypassSecurityTrustResourceUrl`

Remember, whether a value is safe depends on context, so choose the right context for your intended use of the value.
Imagine that the following template needs to bind a URL to a `javascript:alert(...)` call:

<docs-code header="bypass-security.component.html (URL)" path="adev/src/content/examples/security/src/app/bypass-security.component.html" region="URL"/>

Normally, Angular automatically sanitizes the URL, disables the dangerous code, and in development mode, logs this action to the console.
To prevent this, mark the URL value as a trusted URL using the `bypassSecurityTrustUrl` call:

<docs-code header="bypass-security.component.ts (trust-url)" path="adev/src/content/examples/security/src/app/bypass-security.component.ts" region="trust-url"/>

<img alt="A screenshot showing an alert box created from a trusted URL" src="assets/images/guide/security/bypass-security-component.png#medium">

If you need to convert user input into a trusted value, use a component method.
The following template lets users enter a YouTube video ID and load the corresponding video in an `<iframe>`.
The `<iframe src>` attribute is a resource URL security context, because an untrusted source can, for example, smuggle in file downloads that unsuspecting users could run.
To prevent this, call a method on the component to construct a trusted video URL, which causes Angular to let binding into `<iframe src>`:

<docs-code header="bypass-security.component.html (iframe)" path="adev/src/content/examples/security/src/app/bypass-security.component.html" region="iframe"/>

<docs-code header="bypass-security.component.ts (trust-video-url)" path="adev/src/content/examples/security/src/app/bypass-security.component.ts" region="trust-video-url"/>
-->

애플리케이션에 실행 가능한 코드를 포함하거나, 특정 URL의 `<iframe>`을 표시하거나, 잠재적으로 위험한 URL을 구성해야 할 때가 있습니다.
이러한 상황에서 자동 무력화를 막으려면 값을 검사하고, 생성 방식을 확인했으며, 안전하다는 것을 확인했다고 Angular에 알려주세요.
이 작업은 _주의해서_ 수행해야 합니다.
악성일 수 있는 값을 신뢰하면 애플리케이션에 보안 취약점을 만들게 됩니다.
확신이 없다면 보안 전문가의 검토를 받으세요.

값을 신뢰할 수 있다고 표시하려면 `DomSanitizer`를 주입하고 다음 메서드 중 하나를 호출하세요.

- `bypassSecurityTrustHtml`
- `bypassSecurityTrustScript`
- `bypassSecurityTrustStyle`
- `bypassSecurityTrustUrl`
- `bypassSecurityTrustResourceUrl`

값의 안전성은 컨텍스트에 따라 달라지므로, 값을 사용할 목적에 맞는 컨텍스트를 선택해야 합니다.
다음 템플릿에서 `javascript:alert(...)` 호출을 URL에 바인딩해야 한다고 가정해 봅시다.

<docs-code header="bypass-security.component.html (URL)" path="adev/src/content/examples/security/src/app/bypass-security.component.html" region="URL"/>

일반적으로 Angular는 URL을 자동으로 무력화해 위험한 코드를 비활성화하고, 개발 모드에서는 이 작업을 콘솔에 기록합니다.
이를 막으려면 `bypassSecurityTrustUrl`을 호출해 해당 URL 값을 신뢰할 수 있는 URL로 표시하세요.

<docs-code header="bypass-security.component.ts (trust-url)" path="adev/src/content/examples/security/src/app/bypass-security.component.ts" region="trust-url"/>

<img alt="신뢰할 수 있는 URL에서 생성한 알림창 화면" src="assets/images/guide/security/bypass-security-component.png#medium">

사용자 입력을 신뢰할 수 있는 값으로 변환해야 한다면 컴포넌트 메서드를 사용하세요.
다음 템플릿에서는 사용자가 YouTube 동영상 ID를 입력하면 해당 동영상을 `<iframe>`에 불러옵니다.
`<iframe src>` 어트리뷰트는 리소스 URL 보안 컨텍스트에 해당합니다.
신뢰할 수 없는 출처가 사용자가 의심 없이 실행할 수 있는 파일을 몰래 다운로드하게 만드는 등의 위험이 있기 때문입니다.
이를 방지하려면 컴포넌트의 메서드를 호출해 신뢰할 수 있는 동영상 URL을 구성하세요.
그러면 Angular가 `<iframe src>` 바인딩을 허용합니다.

<docs-code header="bypass-security.component.html (iframe)" path="adev/src/content/examples/security/src/app/bypass-security.component.html" region="iframe"/>

<docs-code header="bypass-security.component.ts (trust-video-url)" path="adev/src/content/examples/security/src/app/bypass-security.component.ts" region="trust-video-url"/>

<!--
### Content security policy
-->

<a id="content-security-policy"></a>

### 콘텐츠 보안 정책

<!--
Content Security Policy \(CSP\) is a defense-in-depth technique to prevent XSS.
To enable CSP, configure your web server to return an appropriate `Content-Security-Policy` HTTP header.
Read more about content security policy at the [Web Fundamentals guide](https://developers.google.com/web/fundamentals/security/csp) on the Google Developers website.

The minimal policy required for a brand-new Angular application is:

```txt
default-src 'self'; style-src 'self' 'nonce-randomNonceGoesHere'; script-src 'self' 'nonce-randomNonceGoesHere';
```

When serving your Angular application, the server should include a randomly-generated nonce in the HTTP header for each request.
You must provide this nonce to Angular so that the framework can render `<style>` elements.
You can set the nonce for Angular in one of the following ways:

1. Set the `ngCspNonce` attribute on the root application element as `<app ngCspNonce="randomNonceGoesHere"></app>`. Use this approach if you have access to server-side templating that can add the nonce both to the header and the `index.html` when constructing the response.
1. Provide the nonce using the `CSP_NONCE` injection token. Use this approach if you have access to the nonce at runtime and you want to be able to cache the `index.html`.

```ts
import {CSP_NONCE} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: CSP_NONCE,
      useValue: globalThis.myRandomNonceValue,
    },
  ],
});
```

<docs-callout title="Unique nonces">

Always ensure that the nonces you provide are <strong>unique per request</strong> and that they are not predictable or guessable.
If an attacker can predict future nonces, they can circumvent the protections offered by CSP.

Generating a nonce at the origin server is generally discouraged when using a CDN, as responses are frequently cached. If the server generates a nonce and the CDN caches that HTML response, every subsequent visitor receives the same "unique" value, allowing an attacker to discover the static value and bypass CSP protections.

To maintain the "one-time-use" integrity of a nonce, it should ideally be generated at the Edge layer (e.g., CDN) just before the content is delivered to the user.

</docs-callout>

NOTE: If you want to [inline the critical CSS](/tools/cli/build#critical-css-inlining) of your application, you can not use the `CSP_NONCE` token, and should prefer the `security.autoCsp` option in the [workspace configuration](reference/configs/workspace-config#extra-build-and-test-options) or set the `ngCspNonce` attribute on the root application element.

If you cannot generate nonces in your project, you can allow inline styles by adding `'unsafe-inline'` to the `style-src` section of the CSP header.

| Sections                                         | Details                                                                                                                                                                                                                                                                                                                                                  |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default-src 'self';`                            | Allows the page to load all its required resources from the same origin.                                                                                                                                                                                                                                                                                 |
| `style-src 'self' 'nonce-randomNonceGoesHere';`  | Allows the page to load global styles from the same origin \(`'self'`\) and styles inserted by Angular with the `nonce-randomNonceGoesHere`.                                                                                                                                                                                                             |
| `script-src 'self' 'nonce-randomNonceGoesHere';` | Allows the page to load JavaScript from the same origin \(`'self'`\) and scripts inserted by the Angular CLI with the `nonce-randomNonceGoesHere`. Required only when you enable critical CSS inlining or subresource integrity (which injects an import map to validate dynamically imported chunks), both of which add inline scripts to `index.html`. |

Angular itself requires only these settings to function correctly.
As your project grows, you may need to expand your CSP settings to accommodate extra features specific to your application.
-->

콘텐츠 보안 정책(Content Security Policy, CSP)은 XSS를 방지하는 심층 방어 기법입니다.
CSP를 활성화하려면 웹 서버가 적절한 `Content-Security-Policy` HTTP 헤더를 반환하도록 설정하세요.
콘텐츠 보안 정책에 대한 자세한 내용은 Google Developers 웹사이트의 [Web Fundamentals 가이드](https://developers.google.com/web/fundamentals/security/csp)를 참고하세요.

새로 생성한 Angular 애플리케이션에 필요한 최소 정책은 다음과 같습니다.

```txt
default-src 'self'; style-src 'self' 'nonce-randomNonceGoesHere'; script-src 'self' 'nonce-randomNonceGoesHere';
```

Angular 애플리케이션을 제공할 때 서버는 요청마다 무작위로 생성한 nonce를 HTTP 헤더에 포함해야 합니다.
프레임워크가 `<style>` 엘리먼트를 렌더링할 수 있도록 이 nonce를 Angular에 제공해야 합니다.
다음 방법 중 하나로 Angular에 nonce를 설정할 수 있습니다.

1. 최상위 애플리케이션 엘리먼트에 `<app ngCspNonce="randomNonceGoesHere"></app>`와 같이 `ngCspNonce` 어트리뷰트를 지정합니다.
   응답을 구성할 때 헤더와 `index.html` 모두에 nonce를 추가할 수 있는 서버 측 템플릿 기능을 사용할 수 있다면 이 방식을 사용하세요.
1. `CSP_NONCE` 주입 토큰으로 nonce를 제공합니다.
   런타임에 nonce에 접근할 수 있고 `index.html`을 캐시하려는 경우 이 방식을 사용하세요.

```ts
import {CSP_NONCE} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: CSP_NONCE,
      useValue: globalThis.myRandomNonceValue,
    },
  ],
});
```

<docs-callout title="고유한 nonce">

제공하는 nonce가 항상 <strong>요청마다 고유</strong>하고, 예측하거나 추측할 수 없는 값인지 확인하세요.
공격자가 앞으로 사용될 nonce를 예측할 수 있으면 CSP가 제공하는 보호를 우회할 수 있습니다.

CDN을 사용하는 경우 응답이 자주 캐시되므로 일반적으로 원본 서버에서 nonce를 생성하는 것은 권장하지 않습니다.
서버가 nonce를 생성하고 CDN이 해당 HTML 응답을 캐시하면 이후의 모든 방문자가 같은 "고유한" 값을 받게 됩니다.
그러면 공격자가 이 고정된 값을 알아내 CSP 보호를 우회할 수 있습니다.

nonce의 "일회용" 속성을 유지하려면 콘텐츠가 사용자에게 전달되기 직전에 엣지 계층(예: CDN)에서 생성하는 것이 이상적입니다.

</docs-callout>

참고: 애플리케이션의 [핵심 CSS를 인라인으로 포함](/tools/cli/build#critical-css-inlining)하려면 `CSP_NONCE` 토큰을 사용할 수 없습니다.
이 경우 [워크스페이스 설정](reference/configs/workspace-config#extra-build-and-test-options)의 `security.autoCsp` 옵션을 사용하거나 최상위 애플리케이션 엘리먼트에 `ngCspNonce` 어트리뷰트를 설정하세요.

프로젝트에서 nonce를 생성할 수 없다면 CSP 헤더의 `style-src` 항목에 `'unsafe-inline'`을 추가해 인라인 스타일을 허용할 수 있습니다.

| 항목                                             | 설명                                                                                                                                                                                                                                                                                                                                                              |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default-src 'self';`                            | 페이지가 필요한 모든 리소스를 동일 출처에서 불러올 수 있도록 허용합니다.                                                                                                                                                                                                                                                                                          |
| `style-src 'self' 'nonce-randomNonceGoesHere';`  | 페이지가 동일 출처(`'self'`)의 전역 스타일과 Angular가 `nonce-randomNonceGoesHere`를 사용해 삽입한 스타일을 불러올 수 있도록 허용합니다.                                                                                                                                                                                                                          |
| `script-src 'self' 'nonce-randomNonceGoesHere';` | 페이지가 동일 출처(`'self'`)의 JavaScript와 Angular CLI가 `nonce-randomNonceGoesHere`를 사용해 삽입한 스크립트를 불러올 수 있도록 허용합니다. 중요 CSS 인라인 처리 또는 하위 리소스 무결성을 활성화한 경우에만 필요합니다. 하위 리소스 무결성은 동적으로 불러오는 청크를 검증하는 임포트 맵을 삽입하며, 두 기능 모두 `index.html`에 인라인 스크립트를 추가합니다. |

Angular 자체는 이 설정만 있으면 정상적으로 동작합니다.
프로젝트가 커지면 애플리케이션에 특화된 추가 기능을 지원하도록 CSP 설정을 확장해야 할 수 있습니다.

<!--
#### Static hosting without per-response nonces

If your hosting environment or CDN can replace a placeholder token in cached HTML at the edge (for example, using SSI, ESI, or an edge function), you can build `index.html` with a placeholder in `ngCspNonce` (such as `<app ngCspNonce="__CSP_NONCE__"></app>`) and replace it with a unique nonce on each response.

If you deploy your application to a static host that serves `index.html` unchanged without edge transformation, do not hard-code a static nonce. Instead, use one of the following approaches:

##### Hash inline scripts with `autoCsp`

Set the `security.autoCsp` option to `true` in the [workspace configuration](reference/configs/workspace-config#extra-build-and-test-options).
At build time, the Angular CLI computes a hash of every inline script in `index.html`, including the scripts added by critical CSS inlining and subresource integrity.
The CLI replaces the `<script src>` elements with a hashed loader script and adds a `<meta>` tag at the start of `<head>`:

```txt
script-src 'strict-dynamic' 'sha256-...' https: 'unsafe-inline'; object-src 'none'; base-uri 'self';
```

Because hashes depend only on the content of the scripts, `index.html` remains valid for every visitor and can be cached.
Browsers that support hashes and `'strict-dynamic'` ignore the `https:` and `'unsafe-inline'` fallback sources.

The policy generated by `autoCsp` has the following limitations:

- It only covers scripts. You must configure `style-src` separately.
- Browsers ignore some directives, such as `frame-ancestors`, `report-uri`, and `sandbox`, when they appear in a `<meta>` tag. Send these directives in a `Content-Security-Policy` HTTP header.
- When a page has multiple policies, the browser enforces all of them. If you also send a CSP header, omit both `script-src` and `default-src` from the header so they do not block the hashed inline scripts.
- You cannot use `autoCsp` with server-side rendering.

##### Avoid inline scripts

The Angular CLI only adds inline scripts to `index.html` for critical CSS inlining and subresource integrity (which emits an import map to carry integrity metadata for dynamic module imports).
If you set `optimization.styles.inlineCritical` to `false` and leave `subresourceIntegrity` disabled, `index.html` does not contain inline scripts. You can then configure a `Content-Security-Policy` header with `script-src 'self'`.

NOTE: Disabling critical CSS inlining can slow down the initial render of your application, and disabling subresource integrity removes script integrity checks.

##### Configure styles for static hosting

Angular inserts `<style>` elements for component styles at runtime, and critical CSS inlining adds a `<style>` element to `index.html`.
Neither `autoCsp` nor disabling inline scripts covers these styles. Without a per-response nonce, allow them by adding `'unsafe-inline'` to `style-src`.
For example, if your build avoids inline scripts, configure your host to send the following header:

```txt
default-src 'self'; style-src 'self' 'unsafe-inline';
```

If you use `autoCsp`, send `style-src 'self' 'unsafe-inline'` in the HTTP header without `default-src` or `script-src`.

Your application code and third-party libraries might require additional directives in both cases.
-->

<a id="static-hosting-without-per-response-nonces"></a>

#### 응답마다 nonce를 만들 수 없는 정적 호스팅

호스팅 환경이나 CDN이 SSI, ESI, 엣지 함수 등으로 캐시된 HTML의 플레이스홀더를 교체할 수 있다면, `ngCspNonce`에 플레이스홀더를 넣어 `index.html`을 빌드할 수 있습니다. 예를 들어 `<app ngCspNonce="__CSP_NONCE__"></app>`을 사용하고, 응답마다 고유한 nonce로 교체합니다.

엣지에서 변환하지 않고 `index.html`을 그대로 제공하는 정적 호스트에 배포한다면 고정된 nonce를 하드코딩하지 마세요. 대신 다음 방법 중 하나를 사용하세요.

<a id="hash-inline-scripts-with-autocsp"></a>

##### `autoCsp`로 인라인 스크립트 해시 생성하기

[워크스페이스 설정](reference/configs/workspace-config#extra-build-and-test-options)에서 `security.autoCsp` 옵션을 `true`로 설정하세요.
Angular CLI는 빌드 시 `index.html`의 모든 인라인 스크립트에 대해 해시를 계산합니다. 중요 CSS 인라인 처리와 하위 리소스 무결성 기능이 추가한 스크립트도 포함합니다.
CLI는 `<script src>` 엘리먼트를 해시가 있는 로더 스크립트로 교체하고, `<head>` 시작 부분에 다음 정책을 담은 `<meta>` 태그를 추가합니다.

```txt
script-src 'strict-dynamic' 'sha256-...' https: 'unsafe-inline'; object-src 'none'; base-uri 'self';
```

해시는 스크립트 내용에만 의존하므로 `index.html`은 모든 방문자에게 유효하며 캐시할 수 있습니다.
해시와 `'strict-dynamic'`을 지원하는 브라우저는 대체 소스인 `https:`와 `'unsafe-inline'`을 무시합니다.

`autoCsp`가 생성하는 정책에는 다음과 같은 제약이 있습니다.

- 스크립트에만 적용됩니다. `style-src`는 별도로 설정해야 합니다.
- 브라우저는 `<meta>` 태그에 포함된 `frame-ancestors`, `report-uri`, `sandbox` 등의 일부 지시자를 무시합니다. 이러한 지시자는 `Content-Security-Policy` HTTP 헤더로 전달하세요.
- 페이지에 여러 정책이 있으면 브라우저는 모든 정책을 적용합니다. CSP 헤더도 함께 전송한다면 해시가 있는 인라인 스크립트를 차단하지 않도록 헤더에서 `script-src`와 `default-src`를 모두 생략하세요.
- `autoCsp`는 서버 사이드 렌더링과 함께 사용할 수 없습니다.

<a id="avoid-inline-scripts"></a>

##### 인라인 스크립트 사용하지 않기

Angular CLI는 중요 CSS 인라인 처리와 하위 리소스 무결성을 위해서만 `index.html`에 인라인 스크립트를 추가합니다. 하위 리소스 무결성 기능은 동적 모듈 임포트의 무결성 메타데이터를 전달하는 임포트 맵을 생성합니다.
`optimization.styles.inlineCritical`을 `false`로 설정하고 `subresourceIntegrity`를 비활성화한 상태로 유지하면 `index.html`에 인라인 스크립트가 포함되지 않습니다. 이때 `script-src 'self'`를 사용하는 `Content-Security-Policy` 헤더를 설정할 수 있습니다.

참고: 중요 CSS 인라인 처리를 비활성화하면 애플리케이션의 초기 렌더링이 느려질 수 있으며, 하위 리소스 무결성을 비활성화하면 스크립트 무결성 검사가 제거됩니다.

<a id="configure-styles-for-static-hosting"></a>

##### 정적 호스팅에 맞게 스타일 설정하기

Angular는 실행 중에 컴포넌트 스타일용 `<style>` 엘리먼트를 삽입하며, 중요 CSS 인라인 처리는 `index.html`에 `<style>` 엘리먼트를 추가합니다.
`autoCsp`를 사용하거나 인라인 스크립트를 비활성화해도 이 스타일에는 적용되지 않습니다. 응답별 nonce가 없다면 `style-src`에 `'unsafe-inline'`을 추가해 허용하세요.
예를 들어 인라인 스크립트를 사용하지 않는 빌드라면 호스트가 다음 헤더를 보내도록 설정하세요.

```txt
default-src 'self'; style-src 'self' 'unsafe-inline';
```

`autoCsp`를 사용한다면 HTTP 헤더에 `default-src`나 `script-src` 없이 `style-src 'self' 'unsafe-inline'`을 보내세요.

두 경우 모두 애플리케이션 코드와 서드 파티 라이브러리에 따라 추가 지시자가 필요할 수 있습니다.

<!--
### Enforcing Trusted Types
-->

<a id="enforcing-trusted-types"></a>

### Trusted Types 강제 적용하기

<!--
It is recommended that you use [Trusted Types](https://w3c.github.io/trusted-types/dist/spec/) as a way to help secure your applications from cross-site scripting attacks.
Trusted Types is a [web platform](https://en.wikipedia.org/wiki/Web_platform) feature that can help you prevent cross-site scripting attacks by enforcing safer coding practices.
Trusted Types can also help simplify the auditing of application code.

<docs-callout title="Trusted types">

Trusted Types might not yet be available in all browsers your application targets.
In the case your Trusted-Types-enabled application runs in a browser that doesn't support Trusted Types, the features of the application are preserved. Your application is guarded against XSS by way of Angular's DomSanitizer.
See [caniuse.com/trusted-types](https://caniuse.com/trusted-types) for the current browser support.

</docs-callout>

To enforce Trusted Types for your application, you must configure your application's web server to emit HTTP headers with one of the following Angular policies:

| Policies                 | Detail                                                                                                                                                                                                                                                                                     |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angular`                | This policy is used in security-reviewed code that is internal to Angular, and is required for Angular to function when Trusted Types are enforced. Any inline template values or content sanitized by Angular is treated as safe by this policy.                                          |
| `angular#bundler`        | This policy is used by the Angular CLI bundler when creating lazy chunk files.                                                                                                                                                                                                             |
| `angular#unsafe-bypass`  | This policy is used for applications that use any of the methods in Angular's [DomSanitizer](api/platform-browser/DomSanitizer) that bypass security, such as `bypassSecurityTrustHtml`. Any application that uses these methods must enable this policy.                                  |
| `angular#unsafe-jit`     | This policy is used by the [Just-In-Time (JIT) compiler](api/core/Compiler). You must enable this policy if your application interacts directly with the JIT compiler or is running in JIT mode using the [platform browser dynamic](api/platform-browser-dynamic/platformBrowserDynamic). |
| `angular#unsafe-upgrade` | This policy is used by the [@angular/upgrade](api/upgrade/static/UpgradeModule) package. You must enable this policy if your application is an AngularJS hybrid.                                                                                                                           |

You should configure the HTTP headers for Trusted Types in the following locations:

- Production serving infrastructure
- Angular CLI \(`ng serve`\), using the `headers` property in the `angular.json` file, for local development and end-to-end testing
- Karma \(`ng test`\), using the `customHeaders` property in the `karma.config.js` file, for unit testing

The following is an example of a header specifically configured for Trusted Types and Angular:

```html
Content-Security-Policy: trusted-types angular; require-trusted-types-for 'script';
```

An example of a header specifically configured for Trusted Types and Angular applications that use any of Angular's methods in [DomSanitizer](api/platform-browser/DomSanitizer) that bypasses security:

```html
Content-Security-Policy: trusted-types angular angular#unsafe-bypass; require-trusted-types-for
'script';
```

The following is an example of a header specifically configured for Trusted Types and Angular applications using JIT:

```html
Content-Security-Policy: trusted-types angular angular#unsafe-jit; require-trusted-types-for
'script';
```

The following is an example of a header specifically configured for Trusted Types and Angular applications that use lazy loading of modules:

```html
Content-Security-Policy: trusted-types angular angular#bundler; require-trusted-types-for 'script';
```

<docs-callout title="Community contributions">

To learn more about troubleshooting Trusted Type configurations, the following resource might be helpful:

[Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types](https://web.dev/trusted-types/#how-to-use-trusted-types)

</docs-callout>
-->

크로스 사이트 스크립팅 공격으로부터 애플리케이션을 보호하는 방법으로 [Trusted Types](https://w3c.github.io/trusted-types/dist/spec/) 사용을 권장합니다.
Trusted Types는 더 안전한 코딩 방식을 강제해 크로스 사이트 스크립팅 공격을 방지하는 데 도움이 되는 [웹 플랫폼](https://en.wikipedia.org/wiki/Web_platform) 기능입니다.
Trusted Types를 사용하면 애플리케이션 코드의 보안 점검도 간단해질 수 있습니다.

<docs-callout title="Trusted Types">

애플리케이션이 지원하는 모든 브라우저에서 Trusted Types를 사용할 수 있는 것은 아닐 수 있습니다.
Trusted Types를 활성화한 애플리케이션을 이를 지원하지 않는 브라우저에서 실행해도 애플리케이션 기능은 유지됩니다.
이 경우 Angular의 DomSanitizer가 XSS로부터 애플리케이션을 보호합니다.
현재 브라우저 지원 현황은 [caniuse.com/trusted-types](https://caniuse.com/trusted-types)를 참고하세요.

</docs-callout>

애플리케이션에 Trusted Types를 강제 적용하려면 웹 서버가 다음 Angular 정책 중 필요한 정책을 포함한 HTTP 헤더를 보내도록 설정해야 합니다.

| 정책                     | 설명                                                                                                                                                                                                                                                                    |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angular`                | 보안 검토를 마친 Angular 내부 코드에서 사용하는 정책이며, Trusted Types가 강제 적용될 때 Angular가 동작하는 데 필요합니다. 이 정책은 모든 인라인 템플릿 값과 Angular가 무력화한 내용을 안전하다고 취급합니다.                                                           |
| `angular#bundler`        | Angular CLI 번들러가 지연 로딩 청크 파일을 생성할 때 사용하는 정책입니다.                                                                                                                                                                                               |
| `angular#unsafe-bypass`  | Angular의 [DomSanitizer](api/platform-browser/DomSanitizer)에서 `bypassSecurityTrustHtml`처럼 보안 검사를 우회하는 메서드를 사용하는 애플리케이션에 적용하는 정책입니다. 이러한 메서드를 사용하는 모든 애플리케이션은 이 정책을 활성화해야 합니다.                      |
| `angular#unsafe-jit`     | [JIT(Just-In-Time) 컴파일러](api/core/Compiler)가 사용하는 정책입니다. 애플리케이션이 JIT 컴파일러와 직접 상호작용하거나 [platform browser dynamic](api/platform-browser-dynamic/platformBrowserDynamic)을 사용해 JIT 모드로 실행되는 경우 이 정책을 활성화해야 합니다. |
| `angular#unsafe-upgrade` | [@angular/upgrade](api/upgrade/static/UpgradeModule) 패키지가 사용하는 정책입니다. AngularJS 하이브리드 애플리케이션이라면 이 정책을 활성화해야 합니다.                                                                                                                 |

다음 위치에서 Trusted Types용 HTTP 헤더를 설정해야 합니다.

- 프로덕션 서비스 인프라
- 로컬 개발과 엔드 투 엔드 테스트를 위한 Angular CLI(`ng serve`): `angular.json` 파일의 `headers` 프로퍼티 사용
- 단위 테스트를 위한 Karma(`ng test`): `karma.config.js` 파일의 `customHeaders` 프로퍼티 사용

다음은 Trusted Types와 Angular에 맞게 설정한 헤더의 예제입니다.

```html
Content-Security-Policy: trusted-types angular; require-trusted-types-for 'script';
```

다음은 [DomSanitizer](api/platform-browser/DomSanitizer)에서 보안 검사를 우회하는 Angular 메서드를 사용하는 애플리케이션에 Trusted Types를 적용한 헤더의 예제입니다.

```html
Content-Security-Policy: trusted-types angular angular#unsafe-bypass; require-trusted-types-for
'script';
```

다음은 JIT를 사용하는 Angular 애플리케이션에 Trusted Types를 적용한 헤더의 예제입니다.

```html
Content-Security-Policy: trusted-types angular angular#unsafe-jit; require-trusted-types-for
'script';
```

다음은 모듈 지연 로딩을 사용하는 Angular 애플리케이션에 Trusted Types를 적용한 헤더의 예제입니다.

```html
Content-Security-Policy: trusted-types angular angular#bundler; require-trusted-types-for 'script';
```

<docs-callout title="커뮤니티 자료">

Trusted Types 설정 문제 해결에 대한 자세한 내용은 다음 자료가 도움이 될 수 있습니다.

[Trusted Types로 DOM 기반 크로스 사이트 스크립팅 취약점 방지하기](https://web.dev/trusted-types/#how-to-use-trusted-types)

</docs-callout>

<!--
### Use the AOT template compiler
-->

<a id="use-the-aot-template-compiler"></a>

### AOT 템플릿 컴파일러 사용하기

<!--
The AOT template compiler prevents a whole class of vulnerabilities called template injection, and greatly improves application performance.
The AOT template compiler is the default compiler used by Angular CLI applications, and you should use it in all production deployments.

An alternative to the AOT compiler is the JIT compiler which compiles templates to executable template code within the browser at runtime.
Angular trusts template code, so dynamically generating templates and compiling them, in particular templates containing user data, circumvents Angular's built-in protections. This is a security anti-pattern.
For information about dynamically constructing forms in a safe way, see the [Dynamic Forms](guide/forms/dynamic-forms) guide.
-->

AOT 템플릿 컴파일러는 템플릿 인젝션이라는 유형의 취약점을 방지하고 애플리케이션 성능을 크게 개선합니다.
AOT 템플릿 컴파일러는 Angular CLI 애플리케이션에서 사용하는 기본 컴파일러이며, 모든 프로덕션 배포에서 사용해야 합니다.

AOT 컴파일러 대신 사용할 수 있는 JIT 컴파일러는 런타임에 브라우저 안에서 템플릿을 실행 가능한 템플릿 코드로 컴파일합니다.
Angular는 템플릿 코드를 신뢰하므로 템플릿을 동적으로 생성해 컴파일하면 Angular의 내장 보호 기능을 우회하게 됩니다.
특히 사용자 데이터가 들어 있는 템플릿이 그렇습니다.
이는 보안 측면에서 피해야 하는 패턴입니다.
안전하게 폼을 동적으로 구성하는 방법은 [동적 폼](guide/forms/dynamic-forms) 가이드를 참고하세요.

<!--
### Server-side XSS protection
-->

<a id="server-side-xss-protection"></a>

### 서버 측 XSS 방어

<!--
HTML constructed on the server is vulnerable to injection attacks.
Injecting template code into an Angular application is the same as injecting executable code into the application:
It gives the attacker full control over the application.
To prevent this, use a templating language that automatically escapes values to prevent XSS vulnerabilities on the server.
Don't create Angular templates on the server side using a templating language. This carries a high risk of introducing template-injection vulnerabilities.
-->

서버에서 구성한 HTML은 인젝션 공격에 취약합니다.
Angular 애플리케이션에 템플릿 코드를 삽입하는 것은 실행 가능한 코드를 삽입하는 것과 같습니다.
공격자가 애플리케이션을 완전히 제어할 수 있게 됩니다.
이를 방지하려면 값을 자동으로 이스케이프하는 템플릿 언어를 사용해 서버의 XSS 취약점을 막으세요.
서버 측에서 템플릿 언어를 사용해 Angular 템플릿을 생성하지 마세요.
템플릿 인젝션 취약점을 만들 위험이 높습니다.

<!--
## HTTP-level vulnerabilities
-->

<a id="http-level-vulnerabilities"></a>

## HTTP 수준의 취약점

<!--
Angular has built-in support to help prevent two common HTTP vulnerabilities, cross-site request forgery \(CSRF or XSRF\) and cross-site script inclusion \(XSSI\).
Both of these must be mitigated primarily on the server side, but Angular provides helpers to make integration on the client side easier.
-->

Angular에는 흔한 HTTP 취약점인 크로스 사이트 요청 위조(CSRF 또는 XSRF)와 크로스 사이트 스크립트 포함(XSSI)을 방지하는 데 도움이 되는 기능이 내장되어 있습니다.
두 취약점 모두 주로 서버 측에서 대응해야 하지만, Angular는 클라이언트 측 통합을 쉽게 하는 헬퍼를 제공합니다.

<!--
### Cross-site request forgery
-->

<a id="cross-site-request-forgery"></a>

### 크로스 사이트 요청 위조

<!--
In a cross-site request forgery \(CSRF or XSRF\), an attacker tricks the user into visiting a different web page \(such as `evil.com`\) with malignant code. This web page secretly sends a malicious request to the application's web server \(such as `example-bank.com`\).

Assume the user is logged into the application at `example-bank.com`.
The user opens an email and clicks a link to `evil.com`, which opens in a new tab.

The `evil.com` page immediately sends a malicious request to `example-bank.com`.
Perhaps it's a request to transfer money from the user's account to the attacker's account.
The browser automatically sends the `example-bank.com` cookies, including the authentication cookie, with this request.

If the `example-bank.com` server lacks XSRF protection, it can't tell the difference between a legitimate request from the application and the forged request from `evil.com`.

To prevent this, the application must ensure that a user request originates from the real application, not from a different site.
The server and client must cooperate to thwart this attack.

In a common anti-XSRF technique, the application server sends a randomly created authentication token in a cookie.
The client code reads the cookie and adds a custom request header with the token in all following requests.
The server compares the received cookie value to the request header value and rejects the request if the values are missing or don't match.

This technique is effective because all browsers implement the _same origin policy_.
Only code from the website on which cookies are set can read the cookies from that site and set custom headers on requests to that site.
That means only your application can read this cookie token and set the custom header.
The malicious code on `evil.com` can't.
-->

크로스 사이트 요청 위조(CSRF 또는 XSRF)에서는 공격자가 사용자를 속여 악성 코드가 있는 다른 웹 페이지(예: `evil.com`)에 방문하게 만듭니다.
이 웹 페이지는 애플리케이션의 웹 서버(예: `example-bank.com`)로 악성 요청을 몰래 보냅니다.

사용자가 `example-bank.com`의 애플리케이션에 로그인한 상태라고 가정해 봅시다.
사용자가 이메일을 열고 `evil.com` 링크를 클릭하면 새 탭에서 해당 사이트가 열립니다.

`evil.com` 페이지는 즉시 `example-bank.com`으로 악성 요청을 보냅니다.
사용자 계좌에서 공격자 계좌로 돈을 이체하는 요청일 수 있습니다.
브라우저는 인증 쿠키를 포함한 `example-bank.com` 쿠키를 이 요청에 자동으로 첨부합니다.

`example-bank.com` 서버에 XSRF 방어가 없다면 애플리케이션의 정상 요청과 `evil.com`이 위조한 요청을 구분할 수 없습니다.

이를 방지하려면 애플리케이션은 사용자의 요청이 다른 사이트가 아니라 실제 애플리케이션에서 시작되었음을 확인해야 합니다.
이 공격을 막으려면 서버와 클라이언트가 협력해야 합니다.

일반적인 XSRF 방어 기법에서는 애플리케이션 서버가 무작위로 생성한 인증 토큰을 쿠키에 담아 보냅니다.
클라이언트 코드는 쿠키를 읽고 이후의 모든 요청에 이 토큰이 담긴 커스텀 요청 헤더를 추가합니다.
서버는 받은 쿠키 값과 요청 헤더 값을 비교하고, 값이 없거나 서로 다르면 요청을 거부합니다.

이 기법이 효과적인 이유는 모든 브라우저가 _동일 출처 정책_ 을 구현하기 때문입니다.
쿠키가 설정된 웹사이트의 코드만 해당 사이트의 쿠키를 읽고 해당 사이트로 보내는 요청에 커스텀 헤더를 설정할 수 있습니다.
즉, 해당 애플리케이션만 이 쿠키 토큰을 읽고 커스텀 헤더를 설정할 수 있습니다.
`evil.com`의 악성 코드는 할 수 없습니다.

<!--
### `HttpClient` XSRF/CSRF security
-->

<a id="httpclient-xsrfcsrf-security"></a>

<a id="httpclient-xsrf-csrf-security"></a>

### `HttpClient`의 XSRF/CSRF 보안

<!--
`HttpClient` supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token) used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`. Because only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.

By default, an interceptor sends this header on all mutating requests (such as `POST`) to relative and same origin URLs, but not on `GET` or `HEAD` requests.

<docs-callout helpful title="Why not protect GET requests?">
CSRF protection is only needed for requests that can change state on the backend. By their nature, CSRF attacks cross domain boundaries, and the web's [same-origin policy](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy) will prevent an attacking page from retrieving the results of authenticated `GET` requests.
</docs-callout>

To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens. Set the token to a digest of your site's authentication cookie with a salt for added security.

To prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

<docs-callout important title="HttpClient supports only the client half of the XSRF protection scheme">
  Your backend service must be configured to set the cookie for your page, and to verify that the header is present on all eligible requests. Failing to do so renders Angular's default protection ineffective.
</docs-callout>
-->

`HttpClient`는 XSRF 공격을 방지하는 [일반적인 방식](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token)을 지원합니다.
HTTP 요청을 보낼 때 인터셉터는 기본적으로 `XSRF-TOKEN`이라는 쿠키에서 토큰을 읽어 `X-XSRF-TOKEN` HTTP 헤더에 설정합니다.
해당 도메인에서 실행되는 코드만 쿠키를 읽을 수 있으므로, 백엔드는 HTTP 요청이 공격자가 아니라 클라이언트 애플리케이션에서 왔다는 것을 확인할 수 있습니다.

기본적으로 인터셉터는 상대 URL과 동일 출처 URL로 보내는 모든 변경 요청(예: `POST`)에 이 헤더를 첨부하지만, `GET`이나 `HEAD` 요청에는 첨부하지 않습니다.

<docs-callout helpful title="GET 요청을 보호하지 않는 이유">
CSRF 방어는 백엔드 상태를 변경할 수 있는 요청에만 필요합니다.
CSRF 공격은 본질적으로 도메인 경계를 넘으며, 웹의 [동일 출처 정책](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy)은 공격 페이지가 인증된 `GET` 요청의 결과를 읽지 못하도록 막습니다.
</docs-callout>

이 기능을 사용하려면 서버는 페이지를 불러올 때나 첫 번째 GET 요청에서 JavaScript가 읽을 수 있는 `XSRF-TOKEN`이라는 세션 쿠키에 토큰을 설정해야 합니다.
이후 요청에서는 서버가 쿠키와 `X-XSRF-TOKEN` HTTP 헤더가 일치하는지 확인해, 해당 도메인에서 실행되는 코드만 요청을 보낼 수 있었다는 것을 확인할 수 있습니다.
토큰은 사용자마다 고유해야 하며 서버에서 검증할 수 있어야 합니다.
그래야 클라이언트가 자체적으로 토큰을 만들어내지 못합니다.
보안을 강화하려면 사이트의 인증 쿠키에 솔트를 더해 만든 다이제스트를 토큰으로 사용하세요.

여러 Angular 앱이 같은 도메인이나 하위 도메인을 공유하는 환경에서 충돌하지 않도록 애플리케이션마다 고유한 쿠키 이름을 지정하세요.

<docs-callout important title="HttpClient는 XSRF 방어 체계의 클라이언트 측 기능만 지원합니다">
  백엔드 서비스는 페이지의 쿠키를 설정하고 적용 대상인 모든 요청에 헤더가 존재하는지 확인하도록 구성해야 합니다.
  이렇게 하지 않으면 Angular의 기본 보호 기능은 효과가 없습니다.
</docs-callout>

<!--
### Configure custom cookie/header names
-->

<a id="configure-custom-cookieheader-names"></a>

<a id="configure-custom-cookie-header-names"></a>

### 커스텀 쿠키와 헤더 이름 설정하기

<!--
If your backend service uses different names for the XSRF token cookie or header, use `withXsrfConfiguration` to override the defaults.

Add it to the `provideHttpClient` call as follows:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'CUSTOM_XSRF_TOKEN',
        headerName: 'X-Custom-Xsrf-Header',
      }),
    ),
  ],
};
```
-->

백엔드 서비스가 XSRF 토큰 쿠키나 헤더에 다른 이름을 사용한다면 `withXsrfConfiguration`으로 기본값을 재정의하세요.

다음과 같이 `provideHttpClient` 호출에 추가하세요.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'CUSTOM_XSRF_TOKEN',
        headerName: 'X-Custom-Xsrf-Header',
      }),
    ),
  ],
};
```

<!--
### Disabling XSRF protection
-->

<a id="disabling-xsrf-protection"></a>

### XSRF 방어 비활성화하기

<!--
If the built-in XSRF protection mechanism doesn't work for your application, you can disable it using the `withNoXsrfProtection` feature:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withNoXsrfProtection())],
};
```

For information about CSRF at the Open Web Application Security Project \(OWASP\), see [Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) and [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
The Stanford University paper [Robust Defenses for Cross-Site Request Forgery](https://seclab.stanford.edu/websec/csrf/csrf.pdf) is a rich source of detail.

See also Dave Smith's [talk on XSRF at AngularConnect 2016](https://www.youtube.com/watch?v=9inczw6qtpY 'Cross Site Request Funkery Securing Your Angular Apps From Evil Doers').
-->

내장 XSRF 방어 방식이 애플리케이션에 맞지 않는다면 `withNoXsrfProtection` 기능으로 비활성화할 수 있습니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withNoXsrfProtection())],
};
```

Open Web Application Security Project(OWASP)의 CSRF 자료는 [크로스 사이트 요청 위조(CSRF)](https://owasp.org/www-community/attacks/csrf)와 [크로스 사이트 요청 위조(CSRF) 방지 치트 시트](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)를 참고하세요.
스탠퍼드 대학교의 논문 [크로스 사이트 요청 위조에 대한 강력한 방어](https://seclab.stanford.edu/websec/csrf/csrf.pdf)에도 상세한 정보가 담겨 있습니다.

Dave Smith의 [AngularConnect 2016 XSRF 발표](https://www.youtube.com/watch?v=9inczw6qtpY '크로스 사이트 요청 공격: 악의적인 공격자로부터 Angular 앱 보호하기')도 참고하세요.

<!--
### Cross-site script inclusion (XSSI)
-->

<a id="cross-site-script-inclusion-xssi"></a>

### 크로스 사이트 스크립트 포함(XSSI)

<!--
Cross-site script inclusion, also known as JSON vulnerability, can allow an attacker's website to read data from a JSON API.
The attack works on older browsers by overriding built-in JavaScript object constructors, and then including an API URL using a `<script>` tag.

This attack is only successful if the returned JSON is executable as JavaScript.
Servers can prevent an attack by prefixing all JSON responses to make them non-executable, by convention, using the well-known string `")]}',\n"`.

Angular's `HttpClient` library recognizes this convention and automatically strips the string `")]}',\n"` from all responses before further parsing.

For more information, see the XSSI section of this [Google web security blog post](https://security.googleblog.com/2011/05/website-security-for-webmasters.html).
-->

JSON 취약점이라고도 하는 크로스 사이트 스크립트 포함은 공격자의 웹사이트가 JSON API에서 데이터를 읽을 수 있게 합니다.
이 공격은 오래된 브라우저에서 JavaScript 내장 객체 생성자를 재정의한 다음 `<script>` 태그로 API URL을 포함하는 방식으로 동작합니다.

이 공격은 반환된 JSON을 JavaScript로 실행할 수 있을 때만 성공합니다.
서버는 모든 JSON 응답 앞에 접두사를 붙여 실행할 수 없게 만들어 공격을 방지할 수 있습니다.
관례적으로 잘 알려진 문자열인 `")]}',\n"`을 사용합니다.

Angular의 `HttpClient` 라이브러리는 이 관례를 인식하고, 모든 응답에서 `")]}',\n"` 문자열을 자동으로 제거한 다음 파싱을 진행합니다.

자세한 내용은 이 [Google 웹 보안 블로그 글](https://security.googleblog.com/2011/05/website-security-for-webmasters.html)의 XSSI 섹션을 참고하세요.

<!--
## Preventing Server-Side Request Forgery (SSRF)
-->

<a id="preventing-server-side-request-forgery-ssrf"></a>

## 서버 측 요청 위조(SSRF) 방지하기

<!--
Angular includes strict validation for `Host`, `Forwarded`, `X-Forwarded-Host`, `X-Forwarded-Proto`, `X-Forwarded-Prefix`, and `X-Forwarded-Port` headers in the request handling pipeline to prevent header-based [Server-Side Request Forgery (SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF).

The validation rules are:

- `Host`, `X-Forwarded-Host`, and the `host` parameter of the `Forwarded` header are validated against a strict allowlist and cannot contain path separators.
- `X-Forwarded-Port` header must be numeric.
- `X-Forwarded-Proto` header and the `proto` parameter of the `Forwarded` header must be `http` or `https`.
- `X-Forwarded-Prefix` header must start with `/` and contain only alphanumeric characters, hyphens, and underscores, separated by single slashes.
- By default, the `Forwarded` header and all `X-Forwarded-*` headers are treated as untrusted and are removed from the request. To retain them, they must be explicitly allowed by configuring `trustProxyHeaders`.

Invalid headers trigger an error log, and unallowed proxy headers are removed from the request. Requests with unrecognized hostnames will result in a `400 Bad Request`.

NOTE: Most cloud providers and CDN providers perform automatic validation of these headers before a request ever reaches the application origin. This inherent filtering significantly reduces the practical attack surface.
-->

Angular는 헤더 기반 [서버 측 요청 위조(SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF)를 방지하기 위해 요청 처리 과정에서 `Host`, `Forwarded`, `X-Forwarded-Host`, `X-Forwarded-Proto`, `X-Forwarded-Prefix`, `X-Forwarded-Port` 헤더를 엄격하게 검증합니다.

검증 규칙은 다음과 같습니다.

- `Host`, `X-Forwarded-Host` 헤더와 `Forwarded` 헤더의 `host` 파라미터는 엄격한 허용 목록으로 검증하며, 경로 구분자를 포함할 수 없습니다.
- `X-Forwarded-Port` 헤더는 숫자여야 합니다.
- `X-Forwarded-Proto` 헤더와 `Forwarded` 헤더의 `proto` 파라미터는 `http` 또는 `https`여야 합니다.
- `X-Forwarded-Prefix` 헤더는 `/`로 시작해야 하며, 단일 슬래시로 구분된 영문자·숫자·하이픈·밑줄만 포함할 수 있습니다.
- 기본적으로 `Forwarded` 헤더와 모든 `X-Forwarded-*` 헤더는 신뢰할 수 없다고 취급되어 요청에서 제거됩니다.
  유지하려면 `trustProxyHeaders` 설정으로 명시적으로 허용해야 합니다.

유효하지 않은 헤더는 오류 로그를 발생시키며, 허용되지 않은 프록시 헤더는 요청에서 제거됩니다.
인식할 수 없는 호스트 이름이 있는 요청에는 `400 Bad Request`가 반환됩니다.

참고: 대부분의 클라우드 제공업체와 CDN 제공업체는 요청이 애플리케이션 원본 서버에 도착하기 전에 이 헤더들을 자동으로 검증합니다.
이러한 기본 필터링은 실제 공격 가능 영역을 크게 줄입니다.

<!--
### Configuring allowed hosts
-->

<a id="configuring-allowed-hosts"></a>

### 허용할 호스트 설정하기

<!--
To allow specific hostnames, you need to add them to the allowlist. This is critical for ensuring your application works correctly and securely when deployed. The patterns support wildcards for flexible hostname matching.

You can configure the `allowedHosts` option in your `angular.json`:

```json {hideCopy}
{
  // ...
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "security": {
              "allowedHosts": [
                "example.com",
                "*.example.com" // allows all subdomains of example.com
              ]
            }
            // ... other options
          }
        }
      }
    }
  }
}
```

You can also configure `allowedHosts` when initializing the application engine:

```typescript
const appEngine = new AngularAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});

const nodeAppEngine = new AngularNodeAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});
```

For the Node.js variant `AngularNodeAppEngine`, you can also provide `NG_ALLOWED_HOSTS` (comma-separated list) environment variable for authorizing hosts.

```bash {hideDollar}
export NG_ALLOWED_HOSTS="example.com,*.trusted-example.com"
```

IMPORTANT: You can use `*` as a value in `allowedHosts` to allow all hostnames, though this is generally discouraged and presents a security risk. Accepting any host header can expose your application to host header injection and [Server-Side Request Forgery (SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF) attacks. This configuration should only be used when validation for `Host` and `X-Forwarded-Host` headers is performed in another layer, such as a load balancer or reverse proxy. For better security, we recommend using an explicit list of allowed hosts whenever possible. See [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx) for more details.
-->

특정 호스트 이름을 허용하려면 허용 목록에 추가해야 합니다.
이는 배포된 애플리케이션이 올바르고 안전하게 동작하는 데 필수적입니다.
패턴에서 와일드카드를 지원하므로 호스트 이름을 유연하게 일치시킬 수 있습니다.

`angular.json`에서 `allowedHosts` 옵션을 설정할 수 있습니다.

```json {hideCopy}
{
  // ...
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "security": {
              "allowedHosts": [
                "example.com",
                "*.example.com" // example.com의 모든 하위 도메인을 허용합니다.
              ]
            }
            // ... 다른 옵션
          }
        }
      }
    }
  }
}
```

애플리케이션 엔진을 초기화할 때도 `allowedHosts`를 설정할 수 있습니다.

```typescript
const appEngine = new AngularAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});

const nodeAppEngine = new AngularNodeAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});
```

Node.js용 `AngularNodeAppEngine`에서는 `NG_ALLOWED_HOSTS` 환경 변수(쉼표로 구분한 목록)로 호스트를 허용할 수도 있습니다.

```bash {hideDollar}
export NG_ALLOWED_HOSTS="example.com,*.trusted-example.com"
```

중요: `allowedHosts` 값으로 `*`를 사용하면 모든 호스트 이름을 허용할 수 있지만, 일반적으로 권장하지 않으며 보안 위험이 있습니다.
임의의 Host 헤더를 허용하면 애플리케이션이 Host 헤더 인젝션과 [서버 측 요청 위조(SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF) 공격에 노출될 수 있습니다.
이 설정은 로드 밸런서나 리버스 프록시 등 다른 계층에서 `Host`와 `X-Forwarded-Host` 헤더를 검증하는 경우에만 사용해야 합니다.
보안을 강화하려면 가능한 한 허용할 호스트 목록을 명시하는 것을 권장합니다.
자세한 내용은 [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx)를 참고하세요.

<!--
### Configuring trusted proxy headers
-->

<a id="configuring-trusted-proxy-headers"></a>

### 신뢰할 프록시 헤더 설정하기

<!--
By default, Angular ignores the standard `Forwarded` header and all `X-Forwarded-*` headers. If your application is behind a trusted reverse proxy (like a load balancer) that sets these headers, you can configure Angular to trust them.

If the `Forwarded` header is trusted, its `host` and `proto` parameters are extracted and take precedence over the corresponding `x-forwarded-host` and `x-forwarded-proto` headers.

You can configure `trustProxyHeaders` when initializing the application engine:

```typescript
const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['forwarded'], // Trust the standard Forwarded header
});

const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'], // Trust non-standard headers
});

const nodeAppEngine = new AngularNodeAppEngine({
  trustProxyHeaders: true, // Trust standard Forwarded and all X-Forwarded-* headers
});
```

For the Node.js variant `AngularNodeAppEngine`, you can also provide the `NG_TRUST_PROXY_HEADERS` environment variable (with a comma-separated list of headers as a value) to allow the usage of these headers.

```bash {hideDollar}
export NG_TRUST_PROXY_HEADERS="X-FORWARDED-HOST,X-FORWARDED-PREFIX"
```

IMPORTANT: Only enable `trustProxyHeaders` if your application is behind a trusted proxy that strictly validates or overrides these headers. Otherwise, attackers can spoof these headers to cause [Server-Side Request Forgery (SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF) attacks.
-->

Angular는 기본적으로 표준 `Forwarded` 헤더와 모든 `X-Forwarded-*` 헤더를 무시합니다.
애플리케이션 앞에 이 헤더들을 설정하는 신뢰할 수 있는 리버스 프록시(예: 로드 밸런서)가 있다면, Angular가 해당 헤더를 신뢰하도록 설정할 수 있습니다.

`Forwarded` 헤더를 신뢰하면 이 헤더에서 추출한 `host`와 `proto` 파라미터가 각각 `x-forwarded-host`, `x-forwarded-proto` 헤더보다 우선합니다.

애플리케이션 엔진을 초기화할 때 `trustProxyHeaders`를 설정할 수 있습니다.

```typescript
const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['forwarded'], // 표준 Forwarded 헤더를 신뢰합니다.
});

const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'], // 비표준 헤더를 신뢰합니다.
});

const nodeAppEngine = new AngularNodeAppEngine({
  trustProxyHeaders: true, // 표준 Forwarded와 모든 X-Forwarded-* 헤더를 신뢰합니다.
});
```

Node.js용 `AngularNodeAppEngine`에서는 `NG_TRUST_PROXY_HEADERS` 환경 변수에 쉼표로 구분한 헤더 목록을 지정해 해당 헤더의 사용을 허용할 수도 있습니다.

```bash {hideDollar}
export NG_TRUST_PROXY_HEADERS="X-FORWARDED-HOST,X-FORWARDED-PREFIX"
```

중요: 애플리케이션 앞의 신뢰할 수 있는 프록시가 이 헤더들을 엄격하게 검증하거나 덮어쓰는 경우에만 `trustProxyHeaders`를 활성화하세요.
그렇지 않으면 공격자가 헤더를 위조해 [서버 측 요청 위조(SSRF)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/SSRF) 공격을 일으킬 수 있습니다.

<!--
## Auditing Angular applications
-->

<a id="auditing-angular-applications"></a>

## Angular 애플리케이션 보안 점검하기

<!--
Angular applications must follow the same security principles as regular web applications, and must be audited as such.
Angular-specific APIs that should be audited in a security review, such as the [_bypassSecurityTrust_](#trusting-safe-values) methods, are marked in the documentation as security sensitive.
-->

Angular 애플리케이션은 일반적인 웹 애플리케이션과 같은 보안 원칙을 따라야 하며, 같은 기준으로 보안 점검을 받아야 합니다.
[_bypassSecurityTrust_](#trusting-safe-values) 메서드처럼 보안 검토에서 확인해야 하는 Angular 전용 API는 문서에 보안상 민감한 API로 표시되어 있습니다.
