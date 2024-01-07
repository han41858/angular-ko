<!--
# Angular elements overview
-->
# Angular Elements

<!--
_Angular elements_ are Angular components packaged as _custom elements_ \(also called Web Components\), a web standard for defining new HTML elements in a framework-agnostic way.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>

[Custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) are a Web Platform feature currently supported by Chrome, Edge \(Chromium-based\), Firefox, Opera, and Safari, and available in other browsers through polyfills \(see [Browser Support](#browser-support)\).
A custom element extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code.
The browser maintains a `CustomElementRegistry` of defined custom elements, which maps an instantiable JavaScript class to an HTML tag.

The `@angular/elements` package exports a `createCustomElement()` API function that provides a bridge from Angular's component interface and change detection functionality to the built-in DOM API.

Transforming a component to a custom element makes all of the required Angular infrastructure available to the browser.
Creating a custom element is simple and straightforward, and automatically connects your component-defined view with change detection and data binding, mapping Angular functionality to the corresponding built-in HTML equivalents.

<div class="alert is-helpful">

We are working on custom elements that can be used by web apps built on other frameworks.
A minimal, self-contained version of the Angular framework is injected as a service to support the component's change-detection and data-binding functionality.
For more about the direction of development, check out this [video presentation](https://www.youtube.com/watch?v=Z1gLFPLVJjY&t=4s).

</div>
-->
_Angular Element_ 는 웹 표준인 Web Component를 Angular 방식으로 지원하는 프로젝트입니다.
그래서 이 문서에서 언급하는 커스텀 엘리먼트는 특정 프레임워크에 종속되지 않는 웹 표준을 가리키며, HTML 문서에 사용할 수 있도록 새롭게 정의한 HTML 엘리먼트를 의미합니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 확인하거나 다운받을 수 있습니다.

</div>


[커스텀 엘리먼트](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements)는 현재 Chrome이나 Opera, Safari에서 정식 지원하고 있으며, [다른 브라우저](#브라우저-지원)는 폴리필이 필요합니다.
커스텀 엘리먼트는 JavaScript로 동작하는 태그를 정의하는 방식으로 기존 HTML 문법을 확장합니다.
그리고 브라우저는 이 커스텀 엘리먼트를 지원하기 위해 `CustomElementRegistry` API로 JavaScript 클래스를 HTML 태그와 연결합니다.

`@angular/elements` 패키지에서 제공하는 `createCustomElement()` API는 Angular의 컴포넌트 인터페이스와 변화 감지 기능을 브라우저의 DOM API와 연결합니다.

이렇게 Angular 컴포넌트를 커스텀 엘리먼트로 변환하면, Angular 애플리케이션을 브라우저에서 동작시킬 때 필요한 Angular 요구사항을 모두 만족시킬 수 있습니다.
Angular에서 제공하는 커스텀 엘리먼트 변환 방식은 아주 단순하며 직관적이고, 컴포넌트에 정의된 뷰에서 동작하는 변화 감지 메커니즘, 데이터 바인딩, Angular에서 네이티브 HTML에 접근하는 기능을 모두 자동으로 연결합니다.


<div class="alert is-helpful">

Angular 팀은 Angular 방식으로 만든 커스텀 엘리먼트를 다른 프레임워크로 만든 웹 앱에서도 사용할 수 있도록 준비하고 있습니다.
그래서 Angular로 만든 커스텀 엘리먼트에는 컴포넌트의 변화 감지, 데이터 바인딩 등 엘리먼트가 동작하는 데에 필요한 기능만 최소한으로 들어갑니다.
개발 방향에 대해 더 알아보려면 [이 영상](https://www.youtube.com/watch?v=Z1gLFPLVJjY&t=4s)을 참고하세요.

</div>


<!--
## Using custom elements
-->
## 커스텀 엘리먼트 사용하기

<!--
Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM.
Once a custom element is added to the DOM for any page, it looks and behaves like any other HTML element, and does not require any special knowledge of Angular terms or usage conventions.

|                                                | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Easy dynamic content in an Angular application | Transforming a component to a custom element provides a straightforward path to creating dynamic HTML content in your Angular application. HTML content that you add directly to the DOM in an Angular application is normally displayed without Angular processing, unless you define a _dynamic component_, adding your own code to connect the HTML tag to your application data, and participate in change detection. With a custom element, all of that wiring is taken care of automatically.                                                                                                                                        |
| Content-rich applications                      | If you have a content-rich application, such as the Angular app that presents this documentation, custom elements let you give your content providers sophisticated Angular functionality without requiring knowledge of Angular. For example, an Angular guide like this one is added directly to the DOM by the Angular navigation tools, but can include special elements like `<code-snippet>` that perform complex operations. All you need to tell your content provider is the syntax of your custom element. They don't need to know anything about Angular, or anything about your component's data structures or implementation. |
-->
Angular에서 커스텀 엘리먼트는 이 엘리먼트가 생성될 때 자동으로 변환됩니다.
이 엘리먼트는 DOM에 추가될 때 자동으로 생성되며, DOM에서 제거될 때 자동으로 종료됩니다.
그리고 커스텀 엘리먼트가 DOM에 추가되면, 이 엘리먼트는 원래 사용하던 HTML 엘리먼트와 비슷하게 보이고 동작하며, Angular에 따른 구현방식이나 철학과는 무관하게 동작합니다.
하지만 표준 HTML 문서와 비교하면 다음과 같은 점이 다릅니다.

|                           | 설명                                                                                                                                                                                                                                                                                           |
|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| HTML 문서를 동적으로 조작할 수 있습니다. | 컴포넌트를 커스텀 엘리먼트로 변환하면 HTML 문서를 동적으로 조작할 수 있습니다. DOM에 추가된 Angular 앱은 Angular 고유의 방식으로 동작하지는 않지만, Angular의 변화 감지 메커니즘과 애플리케이션 안에서 변하는 데이터를 반영해서 _동적인 HTML 문서_ 로 만들 수 있습니다. 결과적으로 커스텀 엘리먼트는 모든 것을 자동으로 연결할 수 있습니다.                                                                               |
| 글이 많은 애플리케이션              | 이 가이드 문서같이 글이 많은 애플리케이션을 만들 때도, 커스텀 엘리먼트를 사용하면 Angular로 동작하는 영역과 Angular가 필요 없는 영역을 분리할 수 있습니다. 예를 들어 Angular 네비게이션을 사용해서 DOM에 추가되고 동작하는 지금 이 페이지 안에 `<code-snippet>`이라는 커스텀 엘리먼트가 있다고 합시다. 이 커스텀 엘리먼트는 Angular 애플리케이션 안에 있지만 이 엘리먼트에 필요한 것은 Angular에 대한 무언가가 아니라 커스텀 엘리먼트 자체에서 요구하는 것 뿐입니다. |


<!--
### How it works
-->
### 어떻게 동작하는 걸까?

<!--
Use the `createCustomElement()` function to convert a component into a class that can be registered with the browser as a custom element.
After you register your configured class with the browser's custom-element registry, use the new element just like a built-in HTML element in content that you add directly into the DOM:

<code-example format="html" language="html">

&lt;my-popup message="Use Angular!"&gt;&lt;/my-popup&gt;

</code-example>

When your custom element is placed on a page, the browser creates an instance of the registered class and adds it to the DOM.
The content is provided by the component's template, which uses Angular template syntax, and is rendered using the component and DOM data.
Input properties in the component correspond to input attributes for the element.

<div class="lightbox">

<img alt="Custom element in browser" class="left" src="generated/images/guide/elements/customElement1.png">

</div>
-->
컴포넌트를 브라우저에 등록할 수 있는 커스텀 엘리먼트 클래스로 변환하려면 `createCustomElement()` 함수를 사용합니다.
이렇게 커스텀 엘리먼트 클래스를 브라우저의 커스텀 엘리먼트 저장소에 등록하고 나면, 원래 사용하던 일반 HTML 엘리먼트처럼 다음과 같이 사용할 수 있습니다:

<code-example format="html" language="html">

&lt;my-popup message="Use Angular!"&gt;&lt;/my-popup&gt;

</code-example>

커스텀 엘리먼트가 페이지에 추가되면 브라우저는 이 커스텀 엘리먼트의 클래스가 등록되었는지 확인하고 인스턴스를 생성해서 DOM에 추가합니다.
이 엘리먼트의 뷰는 Angular 템플릿 문법으로 작성한 컴포넌트 템플릿을 바탕으로 구성되며, 컴포넌트 클래스나 DOM의 데이터를 활용해서 렌더링됩니다.
그리고 컴포넌트의 입력 프로퍼티는 엘리먼트의 입력 어트리뷰트와 연결됩니다.

<div class="lightbox">

<img alt="Custom element in browser" class="left" src="generated/images/guide/elements/customElement1.png">

</div>


<!--
## Transforming components to custom elements
-->
## 컴포넌트를 커스텀 엘리먼트로 변환하기

<!--
Angular provides the `createCustomElement()` function for converting an Angular component, together with its dependencies, to a custom element.
The function collects the component's observable properties, along with the Angular functionality the browser needs to create and destroy instances, and to detect and respond to changes.

The conversion process implements the `NgElementConstructor` interface, and creates a
constructor class that is configured to produce a self-bootstrapping instance of your component.

Use the built-in [`customElements.define()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define) function to register the configured constructor and its associated custom-element tag with the browser's [`CustomElementRegistry`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry).
When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

<div class="lightbox">

<img alt="Transform a component to a custom element" class="left" src="generated/images/guide/elements/createElement.png">

</div>

<div class="alert is-important">

Avoid using the [`@Component`](api/core/Component) [selector](api/core/Directive#selector) as the custom-element tag name.
This can lead to unexpected behavior, due to Angular creating two component instances for a single DOM element:
One regular Angular component and a second one using the custom element.

</div>
-->
Angular에서는 `createCustomElement()` 함수를 사용해서 Angular 컴포넌트를 커스텀 엘리먼트로 변환할 수 있습니다.
이 때 컴포넌트가 갖고 있는 의존성과 컴포넌트에서 사용하는 옵저버블, 인스턴스를 생성하거나 종료될 때 필요한 작업을 수행하는 Angular의 동작, 변화 감지 동작도 함께 연결 됩니다.

커스텀 엘리먼트 변환 과정은 `NgElementConstructor` 인터페이스나 컴포넌트의 생성자 함수에서 정의할 수 있으며, 이 변환 과정은 커스텀 엘리먼트의 인스턴스가 생성될 때 실행됩니다.

그리고 JavaScript 함수인 [`customElements.define()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define)를 사용해야 하며, 관련된 커스텀 엘리먼트 태그도 브라우저의 [`CustomElementRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)에 등록해야 합니다.
브라우저는 여기에 등록된 방법으로 커스텀 엘리먼트의 인스턴스를 생성합니다.

<div class="lightbox">

<img alt="Transform a component to a custom element" class="left" src="generated/images/guide/elements/createElement.png">

</div>

<div class="alert is-important">

[`@Component`](api/core/Component) [selector](api/core/Directive#selector)를 커스텀 엘리먼트 태그 이름으로 사용하지 마세요.
이렇게 사용하면 Angular가 DOM 엘리먼트에 Angular 컴포넌트와 커스텀 엘리먼트를 중복으로 생성하기 때문에, 비정상적으로 동작합니다.

</div>


<!--
### Mapping
-->
### 맵핑

<!--
A custom element _hosts_ an Angular component, providing a bridge between the data and logic defined in the component and standard DOM APIs.
Component properties and logic maps directly into HTML attributes and the browser's event system.

* The creation API parses the component looking for input properties, and defines corresponding attributes for the custom element.
  It transforms the property names to make them compatible with custom elements, which do not recognize case distinctions.
  The resulting attribute names use dash-separated lowercase.
  For example, for a component with `@Input('myInputProp') inputProp`, the corresponding custom element defines an attribute `my-input-prop`.

*   Component outputs are dispatched as HTML [Custom Events](https://developer.mozilla.org/docs/Web/API/CustomEvent), with the name of the custom event matching the output name.
    For example, for a component with `@Output() valueChanged = new EventEmitter()`, the corresponding custom element dispatches events with the name `valueChanged`, and the emitted data is stored on the event's `detail` property.
    If you provide an alias, that value will be used instead; for example, `@Output('myClick') clicks = new EventEmitter<string>();` results in dispatch events with the name `myClick`.

For more information, see Web Component documentation for [Creating custom events](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events).
-->
커스텀 엘리먼트는 Angular 컴포넌트를 _표현하기 때문에_, 애플리케이션의 데이터를 컴포넌트의 로직이나 표준 DOM API로 활용하는 역할을 그대로 합니다.
이 역할을 위해 컴포넌트의 프로퍼티와 로직은 HTML 어트리뷰트나 브라우저 이벤트 시스템과 연결됩니다.

* 컴포넌트의 입력 프로퍼티는 커스텀 엘리먼트의 어트리뷰트로 변환되는데, 프로퍼티의 이름은 커스텀 엘리먼트와 호환이 되도록 대소문자 구별대신 대시(`-`)로 구별되는 소문자 이름으로 변경됩니다.
  예를 들어 컴포넌트에 `@Input('myInputProp') inputProp`와 같은 입력 프로퍼티가 있으면 이 프로퍼티는 `my-input-prop`라는 어트리뷰트 이름으로 변경됩니다.

* 컴포넌트의 출력 프로퍼티는 같은 이름의 HTML [커스텀 이벤트](https://developer.mozilla.org/docs/Web/API/CustomEvent)로 변환됩니다.
  예를 들어 컴포넌트에 `@Output() valueChanged = new EventEmitter()`와 같은 출력 프로퍼티가 있으면, 이 커스텀 엘리먼트는 `valueChanged`라는 이름의 이벤트를 발생시키며, 이벤트 상세정보는 이벤트 객체의 `detail` 프로퍼티에 담겨 전달됩니다.
  그리고 출력 프로퍼티에 별칭을 사용하면 이 때 지정한 별칭이 대신 사용되기 때문에 `@Output('myClick') clicks = new EventEmitter<string>();`와 같은 선언이 있을 때 생성되는 이벤트 이름은 `myClick`이 됩니다.

좀 더 자세한 내용을 확인하려면 웹 컴포넌트 표준 문서의 [커스텀 이벤트 생성하기](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events) 부분을 참고하세요.


<a id="browser-support"></a>

<!--
## Browser support for custom elements
-->
## 브라우저 지원

<!--
The recently-developed [custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) Web Platform feature is currently supported natively in a number of browsers.

| Browser                 | Custom Element Support |
| :---------------------- | :--------------------- |
| Chrome                  | Supported natively.    |
| Edge \(Chromium-based\) | Supported natively.    |
| Firefox                 | Supported natively.    |
| Opera                   | Supported natively.    |
| Safari                  | Supported natively.    |

To add the `@angular/elements` package to your workspace, run the following command:

<code-example format="shell" language="shell">

npm install @angular/elements --save

</code-example>
-->
[커스텀 엘리먼트](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements)는 웹 표준 중에서도 아주 최근에 발표되었기 때문에 이 기능을 네이티브로 지원하는 브라우저는 아직 많지 않습니다.

| 브라우저                 | 커스텀 엘리먼트 지원 |
|:---------------------|:------------|
| Chrome               | 네이티브 지원     |
| Edge \(Chromium 기반\) | 네이티브 지원     |
| Firefox              | 네이티브 지원     |
| Opera                | 네이티브 지원     |
| Safari               | 네이티브 지원     |

워크스페이스에 `@angular/elements` 패키지를 추가하려면 다음 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

npm install @angular/elements --save

</code-example>


<!--
## Example: A Popup Service
-->
## 예제 : 팝업 서비스

<!--
Previously, when you wanted to add a component to an application at runtime, you had to define a _dynamic component_, and then you would have to load it, attach it to an element in the DOM, and wire up all of the dependencies, change detection, and event handling, as described in [Dynamic Component Loader](guide/dynamic-component-loader).

Using an Angular custom element makes the process much simpler and more transparent, by providing all of the infrastructure and framework automatically &mdash;all you have to do is define the kind of event handling you want.

<div class="alert is-helpful">
  You do still have to exclude the component from compilation, if you are not going to use it in your application.
</div>

The following Popup Service example application defines a component that you can either load dynamically or convert to a custom element.

| Files                | Details                                                                                                                                                                                                                      |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `popup.component.ts` | Defines a simple pop-up element that displays an input message, with some animation and styling.                                                                                                                             |
| `popup.service.ts`   | Creates an injectable service that provides two different ways to invoke the `PopupComponent`; as a dynamic component, or as a custom element Notice how much more setup is required for the dynamic-loading method.         |
| `app.component.ts`   | Defines the application's root component, which uses the `PopupService` to add the pop-up to the DOM at run time. When the application runs, the root component's constructor converts `PopupComponent` to a custom element. |

For comparison, the demo shows both methods.
One button adds the popup using the dynamic-loading method, and the other uses the custom element.
The result is the same; only the preparation is different.

<code-tabs>
    <code-pane header="popup.component.ts" path="elements/src/app/popup.component.ts"></code-pane>
    <code-pane header="popup.service.ts" path="elements/src/app/popup.service.ts"></code-pane>
    <code-pane header="app.module.ts" path="elements/src/app/app.module.ts"></code-pane>
    <code-pane header="app.component.ts" path="elements/src/app/app.component.ts"></code-pane>
</code-tabs>
-->
이전에 살펴본 것처럼 _동적 컴포넌트_ 를 구현하면 앱이 실행되는 중에도 컴포넌트를 등록할 수 있습니다.
그런데 동적 컴포넌트 목록은 앱 모듈의 `entryComponents`에 등록되기 때문에, 앱 입장에서는 애플리케이션이 시작되기 전까지 어떤 컴포넌트가 존재하는지 알 수 없습니다.
동적 컴포넌트는 컴포넌트 데이터를 불러와서 DOM에 엘리먼트로 추가될 때 구성되며, 이 때 의존성이 연결되고 변화 감지나 이벤트 핸들링이 연결됩니다.
자세한 내용은 [동적 컴포넌트 로더](guide/dynamic-component-loader) 문서를 확인하세요.

Angular에서 제공하는 커스텀 엘리먼트 기능을 활용하면 필요한 기능을 모두 자동으로 준비하기 때문에 커스텀 엘리먼트 변환을 훨씬 쉽고 간단하게 활용할 수 있습니다.
개발자가 구현해야 하는 것은 이벤트 핸들링과 관련된 것 뿐입니다.

<div class="alert is-helpful">
  사용하지 않는 컴포넌트는 컴파일 대상에서 제외할 수 있습니다.
</div>

아래 살펴보는 팝업 서비스 예제는 동적 컴포넌트와 커스텀 엘리먼트를 함께 다룹니다.

| 파일                   | 설명                                                                                                                                |
|:---------------------|:----------------------------------------------------------------------------------------------------------------------------------|
| `popup.component.ts` | 간단한 팝업 엘리먼트를 정의합니다. 이 팝업에는 간단한 애니메이션과 스타일도 지정되어 있습니다.                                                                             |
| `popup.service.ts`   | `PopupComponent`를 다른 방식으로 실행하는 함수 2개를 정의하며, 의존성으로 주입할 수 있도록 서비스로 구현합니다. 동적 컴포넌트 형태로 실행하는 함수에 더 많은 로직이 필요한 것도 확인해 보세요.             |
| `app.component.ts`   | 앱의 최상위 컴포넌트를 정의합니다. 이 컴포넌트는 `PopupService`를 활용해서 DOM에 팝업 엘리먼트를 추가합니다. 그리고 최상위 컴포넌트의 생성자가 실행될 때 `PopupComponent`가 커스텀 엘리먼트로 변환됩니다. |

이 예제는 두 가지 방식을 모두 구현하고 있으니 비교를 해보는 것도 좋습니다.
예제에서 클릭하는 버튼에 따라 팝업 엘리먼트는 동적 컴포넌트를 로딩하는 방식으로 실행되거나 커스텀 엘리먼트를 활용하는 방식으로 실행됩니다.
두 방식은 구현하는 방식만 다를 뿐 결과물은 같습니다.

<code-tabs>
    <code-pane header="popup.component.ts" path="elements/src/app/popup.component.ts"></code-pane>
    <code-pane header="popup.service.ts" path="elements/src/app/popup.service.ts"></code-pane>
    <code-pane header="app.component.ts" path="elements/src/app/app.component.ts"></code-pane>
</code-tabs>


<!--
## Typings for custom elements
-->
## 커스텀 엘리먼트의 타입 지정하기

<!--
Generic DOM APIs, such as `document.createElement()` or `document.querySelector()`, return an element type that is appropriate for the specified arguments.
For example, calling `document.createElement('a')` returns an `HTMLAnchorElement`, which TypeScript knows has an `href` property.
Similarly, `document.createElement('div')` returns an `HTMLDivElement`, which TypeScript knows has no `href` property.

When called with unknown elements, such as a custom element name \(`popup-element` in our example\), the methods return a generic type, such as `HTMLElement`, because TypeScript can't infer the correct type of the returned element.

Custom elements created with Angular extend `NgElement` \(which in turn extends `HTMLElement`\).
Additionally, these custom elements will have a property for each input of the corresponding component.
For example, our `popup-element` has a `message` property of type `string`.

There are a few options if you want to get correct types for your custom elements.
Assuming you create a `my-dialog` custom element based on the following component:

<code-example format="typescript" language="typescript">

&commat;Component(&hellip;)
class MyDialog {
&commat;Input() content: string;
}

</code-example>

The most straightforward way to get accurate typings is to cast the return value of the relevant DOM methods to the correct type.
For that, use the `NgElement` and `WithProperties` types \(both exported from `@angular/elements`\):

<code-example format="typescript" language="typescript">

const aDialog = document.createElement('my-dialog') as NgElement &amp; WithProperties&lt;{content: string}&gt;;
aDialog.content = 'Hello, world!';
aDialog.content = 123; // &lt;-- ERROR: TypeScript knows this should be a string.
aDialog.body = 'News'; // &lt;-- ERROR: TypeScript knows there is no `body` property on `aDialog`.

</code-example>

This is a good way to quickly get TypeScript features, such as type checking and autocomplete support, for your custom element.
But it can get cumbersome if you need it in several places, because you have to cast the return type on every occurrence.

An alternative way, that only requires defining each custom element's type once, is augmenting the `HTMLElementTagNameMap`, which TypeScript uses to infer the type of a returned element based on its tag name \(for DOM methods such as `document.createElement()`, `document.querySelector()`, etc.\):

<code-example format="typescript" language="typescript">

declare global {
interface HTMLElementTagNameMap {
'my-dialog': NgElement &amp; WithProperties&lt;{content: string}&gt;;
'my-other-element': NgElement &amp; WithProperties&lt;{foo: 'bar'}&gt;;
&hellip;
}
}

</code-example>

Now, TypeScript can infer the correct type the same way it does for built-in elements:

<code-example format="typescript" language="typescript">

document.createElement('div') //--&gt; HTMLDivElement (built-in element)
document.querySelector('foo') //--&gt; Element (unknown element)
document.createElement('my-dialog') //--&gt; NgElement &amp; WithProperties&lt;{content: string}&gt; (custom element)
document.querySelector('my-other-element') //--&gt; NgElement &amp; WithProperties&lt;{foo: 'bar'}&gt; (custom element)

</code-example>
-->
`document.createElement()`나 `document.querySelector()`와 같은 표준 DOM API는 전달하는 인자에 따라 반환하는 엘리먼트 타입이 다릅니다.
예를 들면 `document.createElement('a')`를 사용하면 `HTMLAnchorElement`가 반환되며, TypeScript에 이 타입을 사용해야 `href` 프로퍼티가 있다는 것을 알 수 있습니다.
비슷하게 `document.createElement('div')`를 사용하면 `HTMLDivElement`가 반환되며, TypeScript에 이 타입을 사용하면 `href` 프로퍼티가 없다는 것을 의미합니다.

그래서 예제에 사용했던 것처럼 `popup-element`와 같은 커스텀 엘리먼트를 사용하면 일반적인 `HTMLElement` 타입을 받을 수 밖에 없기 때문에 TypeScript에 이 커스텀 엘리먼트를 제대로 사용할 수 없습니다.

Angular로 커스텀 엘리먼트를 생성하면 `HTMLElement`를 확장한 `NgElement`를 반환하는데, 이 커스텀 엘리먼트는 해당 컴포넌트에서 정의한 입력 프로퍼티를 모두 갖고 있습니다.
그래서 예제에서 작성한 `popup-element`의 `message` 프로퍼티는 `string` 타입을 사용할 수 있습니다.

커스텀 엘리먼트에 정확한 타입을 지정할 수 있는 방법이 몇가지 있습니다. 다음과 같이 정의된 `my-dialog` 커스텀 엘리먼트가 있다고 합시다:

<code-example format="typescript" language="typescript">

&commat;Component(&hellip;)
class MyDialog {
  &commat;Input() content: string;
}

</code-example>

가장 간단하게 타입을 지정하는 방법은 DOM 메소드를 사용하면서 타입을 명시적으로 지정하는 것입니다.
이 때 `@angular/elements`에서 제공하는  `NgElement`와 `WithProperties` 타입을 사용할 수 있습니다.

<code-example format="typescript" language="typescript">

const aDialog = document.createElement('my-dialog') as NgElement &amp; WithProperties&lt;{content: string}&gt;;
aDialog.content = 'Hello, world!';
aDialog.content = 123;  // &lt;-- ERROR: TypeScript는 이 프로퍼티를 문자열로 인식합니다.
aDialog.body = 'News';  // &lt;-- ERROR: TypeScript는 이 타입에 `body` 프로퍼티가 없는 것으로 인식합니다.

</code-example>

커스텀 엘리먼트를 TypeScript로 처리하거나 타입 체크, 코드 자동완성 기능을 사용하는 것만이라면 이것으로도 충분합니다.
하지만 이 방식을 반복해서 사용한다면 약간 귀찮을 수도 있습니다.

타입을 한번만 지정해놓고 여러곳에서 사용하려면 TypeScript에서 제공하는 `HTMLElementTagNameMap`를 사용하는 것이 좋습니다.
이 인터페이스를 사용하면 `document.createElement()`나 `document.querySelector()`와 같은 DOM 메소드를 사용할 때 태그 이름을 확인하고 정확한 엘리먼트 타입을 가져올 수 있습니다:

<code-example format="typescript" language="typescript">

declare global {
  interface HTMLElementTagNameMap {
    'my-dialog': NgElement &amp; WithProperties&lt;{content: string}&gt;;
    'my-other-element': NgElement &amp; WithProperties&lt;{foo: 'bar'}&gt;;
    &hellip;
  }
}

</code-example>

이렇게 지정하면 표준 DOM API를 사용하더라도 TypeScript에서 정확한 타입을 가져올 수 있습니다.

<code-example format="typescript" language="typescript">

document.createElement('div')               //--&gt; HTMLDivElement (기본 엘리먼트)
document.querySelector('foo')               //--&gt; Element        (알 수 없는 엘리먼트)
document.createElement('my-dialog')         //--&gt; NgElement &amp; WithProperties&lt;{content: string}&gt; (커스텀 엘리먼트)
document.querySelector('my-other-element')  //--&gt; NgElement &amp; WithProperties&lt;{foo: 'bar'}&gt;      (커스텀 엘리먼트)

</code-example>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-08-30
