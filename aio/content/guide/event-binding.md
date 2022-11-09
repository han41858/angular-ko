<!--
# Event binding
-->
# 이벤트 바인딩(Event binding)

<!--
Event binding lets you listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
이벤트 바인딩 문법을 활용하면 키입력이나 마우스 이동, 클릭, 터치 이벤트에 반응할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
* [Basics of components](guide/architecture-components)
* [Basics of templates](guide/glossary#template)
* [Binding syntax](guide/binding-syntax)
* [Template statements](guide/template-statements)
-->
* [컴포넌트 개요](guide/architecture-components)
* [템플릿 기본 지식](guide/glossary#template)
* [바인딩 문법](guide/binding-syntax)
* [템플릿 실행문](guide/template-statements)


<!--
## Binding to events
-->
## 이벤트 바인딩하기

<!--
To bind to an event you use the Angular event binding syntax.
This syntax consists of a target event name within parentheses to the left of an equal sign, and a quoted template statement to the right.

Create the following example; the target event name is `click` and the template statement is `onSave()`.

<code-example language="html" header="Event binding syntax">
&lt;button (click)="onSave()"&gt;Save&lt;/button&gt;
</code-example>

The event binding listens for the button's click events and calls the component's `onSave()` method whenever a click occurs.

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>
-->
이벤트 바인딩 문법을 활용하면 키입력이나 마우스 이동, 클릭, 터치 이벤트에 반응할 수 있습니다.
Angular 이벤트 바인딩 문법은 소괄호\(`(`, `)`\) 안에 **대상이 되는 이벤트**의 이름을 지정하고 등호\(`=`\)를 붙인 후 템플릿 실행문을 작성하면 됩니다.

<code-example language="html" header="이벤트 바인딩 문법">
&lt;button (click)="onSave()"&gt;Save&lt;/button&gt;
</code-example>

그러면 버튼은 클릭 이벤트가 발생하는지 감지하다가 이벤트가 발생했을 때 컴포넌트에 정의된 `onSave()` 메소드를 실행합니다.

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>


<!--
### Determining an event target
-->
### 이벤트 대상 확인하기

<!--
To determine an event target, Angular checks if the name of the target event matches an event property of a known directive.

Create the following example: (Angular checks to see if `myClick` is an event on the custom `ClickDirective`)

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

If the target event name, `myClick` fails to match an output property of `ClickDirective`, Angular will instead bind to the `myClick` event on the underlying DOM element.
-->
Angular는 이벤트 대상을 확인하기 위해 대상 이벤트 이름이 디렉티브의 이벤트 프로퍼티 이름과 같은지 검사합니다.
그래서 아래 예제처럼 구현하면 `myClick` 이벤트가 `ClickDirective`에서 발생한 커스텀 이벤트라는 것을 판단할 수 있습니다.

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

엘리먼트 이벤트나 `ClickDirective` 프로퍼티에서 `myClick`를 찾지 못하면 "unknown directive" 에러가 발생합니다.


<!--
## Binding to passive events
-->
## 패시브 이벤트 바인딩하기

<!--
This is an advanced technique that is not necessary for most applications. You may find this useful if you want to optimize frequently occurring events that are causing performance problems.

Angular also supports passive event listeners. For example, use the following steps to make a scroll event passive.

1. Create a file `zone-flags.ts` under `src` directory.
2. Add the following line into this file.
3. In the `src/polyfills.ts` file, before importing zone.js, import the newly created `zone-flags`.

```
import './zone-flags';
import 'zone.js';  // Included with Angular CLI.
```

After those steps, if you add event listeners for the `scroll` event, the listeners will be `passive`.
-->
이 방식은 모든 애플리케이션에 필요한 기법은 아니며, 숙련자를 위한 사용방식입니다.
이벤트가 빈번하게 발생하는 것 때문에 성능 문제가 있다면 이 방법을 고려해볼만 합니다.

Angular는 패시브 이벤트 리스너를 지원합니다.
스크롤 패시브 이벤트라면 이렇게 활용하면 됩니다.

1. `src` 디렉토리에 `zone-flags.ts` 파일을 만듭니다.
2. 이 파일에 이런 코드를 작성합니다.
3. `src/polyfills.ts` 파일에서 zone.js를 로드하기 전에 `zone-flags`를 먼저 로드합니다.

```
import './zone-flags';
import 'zone.js';  // Angular CLI가 추가한 것
```

여기까지 작업하고 나면 `scroll` 이벤트 리스너를 추가했을 때 이 리스너는 `passive`로 동작합니다.


<!--
## What's next
-->
## 다음 단계

<!--
* For more information on how event binding works, see [How event binding works](guide/event-binding-concepts).
* [Property binding](guide/property-binding)
* [Text interpolation](guide/interpolation)
* [Two-way binding](guide/two-way-binding)
-->
* 이벤트 바인딩이 동작하는 것에 대새 자세하게 알아보려면 [이벤트 바인딩이 동작하는 과정](guide/event-binding-concepts) 문서를 참고하세요.
* [프로퍼티 바인딩](guide/property-binding)
* [문자열 바인딩](guide/interpolation)
* [양방향 바인딩](guide/two-way-binding)

@reviewed 2022-05-10
