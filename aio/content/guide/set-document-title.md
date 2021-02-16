{@a top}

<!--
# Set the document title
-->
# 문서 제목 설정하기

<!--
Your app should be able to make the browser title bar say whatever you want it to say.
This cookbook explains how to do it.

See the <live-example name="set-document-title"></live-example>.
-->
애플리케이션이 무엇을 하는지는 브라우저 제목 표시줄에 표시하는 것이 좋습니다.
이 문서는 이 과정을 어떻게 처리하는지 다룹니다.

예제를 확인하려면 <live-example name="set-document-title"></live-example>를 참고하세요.

<!--
## The problem with *&lt;title&gt;*
-->
## *&lt;title&gt;*의 문제

<!--
The obvious approach is to bind a property of the component to the HTML `<title>` like this:

<code-example format=''>
  &lt;title&gt;{{This_Does_Not_Work}}&lt;/title&gt;
</code-example>

Sorry but that won't work.
The root component of the application is an element contained within the `<body>` tag.
The HTML `<title>` is in the document `<head>`, outside the body, making it inaccessible to Angular data binding.

You could grab the browser `document` object and set the title manually.
That's dirty and undermines your chances of running the app outside of a browser someday.

<div class="alert is-helpful">

  Running your app outside a browser means that you can take advantage of server-side
  pre-rendering for near-instant first app render times and for SEO. It means you could run from
  inside a Web Worker to improve your app's responsiveness by using multiple threads. And it
  means that you could run your app inside Electron.js or Windows Universal to deliver it to the desktop.

</div>
-->
가장 쉽게 생각할 수 있는 방법은 HTML `<title>`를 컴포넌트 프로퍼티와 바인딩하는 것입니다:

<code-example format=''>
  &lt;title&gt;{{This_Does_Not_Work}}&lt;/title&gt;
</code-example>

하지만 이 코드는 동작하지 않습니다.
애플리케이션의 최상위 컴포넌트는 `<body>` 태그 안에 구성됩니다.
하지만 HTML `<title>` 태그는 문서의 `<head>`에 있기 때문에 `<body>` 태그의 바깥쪽이며, Angular 데이터 바인딩으로 접근할 수 없는 영역입니다.

그렇다면 브라우저의 `document` 객체를 가져와서 문서의 제목을 직접 지정하는 방식을 고려해볼 수 있습니다.
하지만 이 방식은 깔끔하지 않으며 애플리케이션을 실행하는 환경을 브라우저로 제한하는 것이기도 합니다.

<div class="alert is-helpful">

  브라우저 밖에서 앱을 실행할 수 있으면 애플리케이션의 첫화면을 빠르게 표시하거나 SEO에 대응하기 위해 서버 사이드 렌더링하는 방식을 활용할 수 있습니다.
  이 방식은 웹 브라우저가 아니라 Web Worker 안에서 앱을 실행하는 것입니다.
  그리고 Electron.js 안에서 앱을 실행하거나 데스크탑 환경에서 실행하기 위해 Windows Universal을 사용한 경우도 브라우저 밖에서 실행되는 것이라고 볼 수 있습니다.

</div>


<!--
## Use the `Title` service
-->
## `Title` 서비스 활용하기

<!--
Fortunately, Angular bridges the gap by providing a `Title` service as part of the *Browser platform*.
The [Title](api/platform-browser/Title) service is a simple class that provides an API
for getting and setting the current HTML document title:

* `getTitle() : string`&mdash;Gets the title of the current HTML document.
* `setTitle( newTitle : string )`&mdash;Sets the title of the current HTML document.

You can inject the `Title` service into the root `AppComponent` and expose a bindable `setTitle` method that calls it:


<code-example path="set-document-title/src/app/app.component.ts" region="class" header="src/app/app.component.ts (class)"></code-example>

Bind that method to three anchor tags and voilà!

<div class="lightbox">
  <img src="generated/images/guide/set-document-title/set-title-anim.gif" alt="Set title">
</div>

Here's the complete solution:

<code-tabs>
  <code-pane header="src/main.ts" path="set-document-title/src/main.ts"></code-pane>
  <code-pane header="src/app/app.module.ts" path="set-document-title/src/app/app.module.ts"></code-pane>
  <code-pane header="src/app/app.component.ts" path="set-document-title/src/app/app.component.ts"></code-pane>
</code-tabs>
-->
하지만 다행히도 Angular는 이 기능을 보완하기 위해 *Browser platform*에서 `Title` 서비스를 제공합니다.
[Title](api/platform-browser/Title) 서비스는 HTML 문서의 제목을 가져오거나 설정하는 API를 제공하는 간단한 클래스입니다:

* `getTitle() : string`&mdash;현재 HTML 문서의 제목을 가져옵니다.
* `setTitle( newTitle : string )`&mdash;현재 HTML 문서의 제목을 설정합니다.

`Title` 서비스는 최상위 컴포넌트인 `AppComponent`에 의존성으로 주입한 후에 `setTitle` 메서드를 실행하는 방식으로 사용하면 됩니다:


<code-example path="set-document-title/src/app/app.component.ts" region="class" header="src/app/app.component.ts (클래스)"></code-example>

앵커 태그 3개에 이 메서드를 연결해보면 이렇게 동작합니다:

<div class="lightbox">
  <img src="generated/images/guide/set-document-title/set-title-anim.gif" alt="Set title">
</div>

전체 코드는 이렇습니다:

<code-tabs>
  <code-pane header="src/main.ts" path="set-document-title/src/main.ts"></code-pane>
  <code-pane header="src/app/app.module.ts" path="set-document-title/src/app/app.module.ts"></code-pane>
  <code-pane header="src/app/app.component.ts" path="set-document-title/src/app/app.component.ts"></code-pane>
</code-tabs>


<!--
## Why provide the `Title` service in `bootstrap`
-->
## 왜 앱 모듈에 `Title` 서비스를 등록하나요?

<!--
Generally you want to provide application-wide services in the root application component, `AppComponent`.

This cookbook recommends registering the title service during bootstrapping,
a location you reserve for configuring the runtime Angular environment.

That's exactly what you're doing.
The `Title` service is part of the Angular *browser platform*.
If you bootstrap your application into a different platform,
you'll have to provide a different `Title` service that understands
the concept of a "document title" for that specific platform.
Ideally, the application itself neither knows nor cares about the runtime environment.
-->
보통은 애플리케이션 전역에 사용되는 서비스는 애플리케이션의 최상위 컴포넌트인 `AppComponent`에 등록하는 것이 맞다고 생각할 수 있습니다.

하지만 `Title` 서비스의 프로바이더는 Angular의 실행환경을 구성하는 부트스트랩 단계에 등록하는 것을 권장합니다.

이 서비스는 그런 용도로 제공되는 것입니다.
`Title` 서비스는 Angular *브라우저 플랫폼*이 제공하는 기능입니다.
브라우저가 아닌 플랫폼에서 애플리케이션을 부트스트랩하면 플랫폼에 따라 "문서의 제목" 이라는 것이 다른 방식으로 사용될 수 있으며, `Title` 서비스는 해당 플랫폼에 맞춰 다르게 동작합니다.
애플리케이션은 실행환경을 알 필요가 없으며 관리하지도 않는 것이 이상적입니다.