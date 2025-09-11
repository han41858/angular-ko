<!--
# Angular elements overview
-->
# Angular 엘리먼트 개요

<!--
_Angular elements_ are Angular components packaged as _custom elements_ \(also called Web Components\), a web standard for defining new HTML elements in a framework-agnostic way.

[Custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) are a Web Platform feature available on all browsers supported by Angular.
A custom element extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code.
The browser maintains a `CustomElementRegistry` of defined custom elements, which maps an instantiable JavaScript class to an HTML tag.

The `@angular/elements` package exports a `createCustomElement()` API that provides a bridge from Angular's component interface and change detection functionality to the built-in DOM API.

Transforming a component to a custom element makes all the required Angular infrastructure available to the browser.
Creating a custom element is simple and straightforward, and automatically connects your component-defined view with change detection and data binding, mapping Angular functionality to the corresponding built-in HTML equivalents.
-->
_Angular 엘리먼트_ 는 Angular 컴포넌트를 _커스텀 엘리먼트_ 로 묶은 것을 의미하며, 프레임워크에 구애받지 않는 HTML 엘리먼트를 정의하는 표준인 웹 컴포넌트(Web Component) 라고도 합니다.

[커스텀 엘리먼트](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements)는 Angular를 지원하는 모든 브라우저에 사용할 수 있는 웹 플랫폼 기능입니다.
이 커스텀 엘리먼트는 JavaScript 코드를 사용해서 내용물을 생성하고 조작하는 형태로 HTML을 확장한 것입니다.
커스텀 엘리먼트는 JavaScript 클래스로 구현되어 HTML 태그로 변환되는데, 브라우저가 관리하는 `CustomElementRegistry`에 등록됩니다.

`@angular/elements` 패키지로 제공되는 `createCustomElement()` API를 활용하면 Angular 컴포넌트 인터페이스와 변화 감지 기능을 브라우저 내장 DOM API와 연동할 수 있습니다.

컴포넌트를 커스텀 엘리먼트로 변환하면 Angular 기반에서만 동작하던 코드를 모든 브라우저에서 실행하는 것과 같습니다.
커스텀 엘리먼트를 정의하는 것은 간단하고 직관적이며, Angular가 제공하던 변화 감지, 데이터 바인딩 등 다양한 기능을 자유롭게 활용할 수 있습니다.


<!--
## Using custom elements
-->
## 커스텀 엘리먼트 활용하기

<!--
Custom elements bootstrap themselves - they start when they are added to the DOM, and are destroyed when removed from the DOM.
Once a custom element is added to the DOM for any page, it looks and behaves like any other HTML element, and does not require any special knowledge of Angular terms or usage conventions.

To add the `@angular/elements` package to your workspace, run the following command:

<docs-code language="shell">

npm install @angular/elements --save

</docs-code>
-->
커스텀 엘리먼트는 그 자체로 부트스트랩 됩니다.
커스텀 엘리먼트는 DOM에 추가되면서 시작되고, DOM에서 제거되면서 종료됩니다.
그래서 커스텀 엘리먼트가 어떤 화면에 추가되면, Angular에서 사용하는 용어와 사용방법을 알지 못하더라도 HTML 엘리먼트처럼 보이고 동작합니다.

워크스페이스에 `@angular/elements` 패키지를 추가하려면 다음 명령을 실행하면 됩니다:

<docs-code language="shell">

npm install @angular/elements --save

</docs-code>


<!--
### How it works
-->
### 어떻게 동작할까요

<!--
The `createCustomElement()` function converts a component into a class that can be registered with the browser as a custom element.
After you register your configured class with the browser's custom-element registry, use the new element just like a built-in HTML element in content that you add directly into the DOM:

<docs-code language="html">

<my-popup message="Use Angular!"></my-popup>

</docs-code>

When your custom element is placed on a page, the browser creates an instance of the registered class and adds it to the DOM.
The content is provided by the component's template, which uses Angular template syntax, and is rendered using the component and DOM data.
Input properties in the component correspond to input attributes for the element.
-->
`createCustomElement()` 함수를 사용하면 컴포넌트를 커스텀 엘리먼트 클래스로 변환해서 브라우저에 등록할 수 있습니다.
컴포넌트를 브라우저 커스텀 엘리먼트 저장소에 등록하고 나면, 기본 HTML 엘리먼트를 사용하는 방법처럼 DOM에 사용할 수 있습니다:

<docs-code language="html">

<my-popup message="Use Angular!"></my-popup>

</docs-code>

이제 커스텀 엘리먼트를 화면에 추가하면 브라우저가 커스텀 엘리먼트 클래스의 인스턴스를 생성하고 DOM에 추가합니다.
커스텀 엘리먼트의 내용물은 Angular 템플릿 문법을 사용하는 컴포넌트 템플릿으로 정의하며, 컴포넌트 데이터와 DOM 데이터를 사용해서 렌더링됩니다.
컴포넌트의 입력 프로퍼티는 엘리먼트의 입력 어트리뷰트로 동작합니다.


<!--
## Transforming components to custom elements
-->
## 컴포넌트를 커스텀 엘리먼트로 변환하기

<!--
Angular provides the `createCustomElement()` function for converting an Angular component, together with its dependencies, to a custom element.

The conversion process implements the `NgElementConstructor` interface, and creates a
constructor class that is configured to produce a self-bootstrapping instance of your component.

Use the browser's native [`customElements.define()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define) function to register the configured constructor and its associated custom-element tag with the browser's [`CustomElementRegistry`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry).
When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

IMPORTANT: Avoid using the component's selector as the custom element tag name.
This can lead to unexpected behavior, due to Angular creating two component instances for a single DOM element:
One regular Angular component and a second one using the custom element.
-->
Angular 컴포넌트를 커스텀 엘리먼트로 변환하려면 Angular가 제공하는 `createCustomElement()` 함수를 사용하면 됩니다.

그러면 컴포넌트는 `NgElementConstructor` 인터페이스를 기반으로 커스텀 엘리먼트의 생성자 클래스를 생성합니다.

브라우저가 제공하는 [`customElements.define()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define) 함수를 사용하면 이렇게 생성된 생성자 함수를 브라우저 [`CustomElementRegistry`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry)에 등록합니다.
그 이후에 브라우저가 커스텀 엘리먼트 태그를 확인하면 커스텀 엘리먼트 저장소에 등록된 생성자 함수를 사용해서 커스텀 엘리먼트의 인스턴스를 생성합니다.

중요: 컴포넌트 셀렉터를 커스텀 엘리먼트 태그 이름으로 사용하지 마세요.
Angular는 DOM 엘리먼트 하나에 Angular 컴포넌트 인스턴스와 커스텀 엘리먼트 인스턴스를 동시에 생성하기 때문에, 문제가 발생할 수 있습니다.


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
  For example, for a component with `inputProp = input({alias: 'myInputProp'})`, the corresponding custom element defines an attribute `my-input-prop`.

* Component outputs are dispatched as HTML [Custom Events](https://developer.mozilla.org/docs/Web/API/CustomEvent), with the name of the custom event matching the output name.
    For example, for a component with valueChanged = output()`, the corresponding custom element dispatches events with the name "valueChanged", and the emitted data is stored on the event's `detail` property.
    If you provide an alias, that value is used; for example, clicks = output<string>({alias: 'myClick'});` results in dispatch events with the name "myClick".

For more information, see Web Component documentation for [Creating custom events](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events).
-->
커스텀 엘리먼트는 Angular 컴포넌트와 동일한 동작을 하기 때문에 컴포넌트에 정의된 로직과 표준 DOM API를 연결합니다.
그래서 컴포넌트 프로퍼티는 HTML 어트리뷰트로, 컴포넌트 클래스 로직은 브라우저 이벤트 시스템과 연결됩니다.

* 커스텀 엘리먼트 생성 API가 컴포넌트 입력 프로퍼티를 발견하면 커스텀 엘리먼트 어트리뷰트를 선언합니다.
  이 때 프로퍼티 이름은 커스텀 엘리먼트에 적합하도록 대소문자를 구분하지 않고 대시(`-`)와 소문자로 구성됩니다.
  예를 들어 컴포넌트에 `inputProp = input({alias: 'myInputProp'})`와 같은 코드가 있다면 이 프로퍼티는 커스텀 엘리먼트의 `my-input-prop` 어트리뷰트로 변환됩니다.

* 컴포넌트의 출력 프로퍼티는 출력 프로퍼티 이름과 동일한 HTML [커스텀 이벤트](https://developer.mozilla.org/docs/Web/API/CustomEvent)로 변환됩니다.
  예를 들어 컴포넌트에 `valueChanged = output()`와 같은 코드가 있다면, 커스텀 엘리먼트에서 "valueChanged" 라는 이름으로 이벤트를 발생하며, 커스텀 엘리먼트에서 보내는 데이터는 이벤트 객체의 `detail` 프로퍼티로 전달됩니다.
  출력 프로퍼티에 별칭이 있는 경우, 예를 들어 `clicks = output<string>({alias: 'myClick'});`와 같은 코드가 있다면, 커스텀 엘리먼트가 생성하는 이벤트 이름은 "myClick"이 됩니다.

더 자세한 내용은 웹 컴포넌트 문서의 [커스텀 이벤트 생성하기](https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events) 문서를 참고하세요.


<!--
## Example: A Popup Service
-->
## 예제: 팝업 서비스

<!--
Previously, when you wanted to add a component to an application at runtime, you had to define a _dynamic component_, and then you would have to load it, attach it to an element in the DOM, and wire up all of the dependencies, change detection, and event handling.

Using an Angular custom element makes the process simpler and more transparent, by providing all the infrastructure and framework automatically —all you have to do is define the kind of event handling you want.
\(You do still have to exclude the component from compilation, if you are not going to use it in your application.\)

The following Popup Service example application defines a component that you can either load dynamically or convert to a custom element.

| Files                | Details                                                                                                                                                                                                                      |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `popup.component.ts` | Defines a simple pop-up element that displays an input message, with some animation and styling.                                                                                                                             |
| `popup.service.ts`   | Creates an injectable service that provides two different ways to invoke the `PopupComponent`; as a dynamic component, or as a custom element. Notice how much more setup is required for the dynamic-loading method.        |  |
| `app.component.ts`   | Defines the application's root component, which uses the `PopupService` to add the pop-up to the DOM at run time. When the application runs, the root component's constructor converts `PopupComponent` to a custom element. |

For comparison, the demo shows both methods.
One button adds the popup using the dynamic-loading method, and the other uses the custom element.
The result is the same, but the preparation is different.

<docs-code-multifile>
    <docs-code header="popup.component.ts" path="adev/src/content/examples/elements/src/app/popup.component.ts"/>
    <docs-code header="popup.service.ts" path="adev/src/content/examples/elements/src/app/popup.service.ts"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/elements/src/app/app.component.ts"/>
</docs-code-multifile>
-->
이전에는 애플리케이션 실행 시점에 컴포넌트를 추가하려면 _동적 컴포넌트_ 를 정의한 후 불러와서 DOM, 의존성 객체, 변화 감지, 이벤트 처리 함수를 연결해야 했습니다.

하지만 Angular가 제공하는 커스텀 엘리먼트 변환 기능을 활용하면 똑같은 과정을 아주 간단하게 자동으로 적용할 수 있습니다.
(애플리케이션에서 사용하지 않는 컴포넌트는 컴파일에서 제외해야 하긴 합니다.)

아래 Popup 서비스 예제 애플리케이션은 컴포넌트를 동적으로 불러와서 커스텀 엘리먼트로 변환하는 예제 코드입니다.

| 파일                   | 설명                                                                                                 |
|:---------------------|:---------------------------------------------------------------------------------------------------|
| `popup.component.ts` | 메시지를 화면에 표시하는 팝업 엘리먼트를 구현합니다. 애니메이션과 스타일도 지정되어 있습니다.                                               |
| `popup.service.ts`   | `PopupComponent`를 동적 컴포넌트로 사용하거나 커스텀 엘리먼트로 사용하는 코드를 정의합니다. 동적 로딩하는 경우 코드를 얼마나 많이 사용해야 하는지 확인해 보세요. |  |
| `app.component.ts`   | 애플리케이션 최상위 컴포넌트를 정의합니다. 이 컴포넌트가 시작되면 `PopupService` 코드에 따라 `PopupComponent`를 커스텀 엘리먼트로 전환합니다.      |

코드를 비교해보기 위해 예제 코드는 두가지 방식을 모두 구현했습니다.
버튼 하나는 컴포넌트를 동적으로 로드하는 방식으로 팝업을 표시하며, 다른 버튼은 커스텀 엘리먼트를 활용하는 방식으로 동작합니다.
결과물은 같지만 준비과정은 다릅니다.

<docs-code-multifile>
    <docs-code header="popup.component.ts" path="adev/src/content/examples/elements/src/app/popup.component.ts"/>
    <docs-code header="popup.service.ts" path="adev/src/content/examples/elements/src/app/popup.service.ts"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/elements/src/app/app.component.ts"/>
</docs-code-multifile>


<!--
## Typings for custom elements
-->
## 커스텀 엘리먼트에 타입 지정하기

<!--
Generic DOM APIs, such as `document.createElement()` or `document.querySelector()`, return an element type that is appropriate for the specified arguments.
For example, calling `document.createElement('a')` returns an `HTMLAnchorElement`, which TypeScript knows has an `href` property.
Similarly, `document.createElement('div')` returns an `HTMLDivElement`, which TypeScript knows has no `href` property.

When called with unknown elements, such as a custom element name \(`popup-element` in our example\), the methods return a generic type, such as `HTMLElement`, because TypeScript can't infer the correct type of the returned element.

Custom elements created with Angular extend `NgElement` \(which in turn extends `HTMLElement`\).
Additionally, these custom elements will have a property for each input of the corresponding component.
For example, our `popup-element` has a `message` property of type `string`.

There are a few options if you want to get correct types for your custom elements.
Assume you create a `my-dialog` custom element based on the following component:

<docs-code language="typescript">

@Component(…)
class MyDialog {
  content =  input(string);
}

</docs-code>

The most straightforward way to get accurate typings is to cast the return value of the relevant DOM methods to the correct type.
For that, use the `NgElement` and `WithProperties` types \(both exported from `@angular/elements`\):

<docs-code language="typescript">

const aDialog = document.createElement('my-dialog') as NgElement & WithProperties<{content: string}>;
aDialog.content = 'Hello, world!';
aDialog.content = 123;  // <-- ERROR: TypeScript knows this should be a string.
aDialog.body = 'News';  // <-- ERROR: TypeScript knows there is no `body` property on `aDialog`.

</docs-code>

This is a good way to quickly get TypeScript features, such as type checking and autocomplete support, for your custom element.
But it can get cumbersome if you need it in several places, because you have to cast the return type on every occurrence.

An alternative way, that only requires defining each custom element's type once, is augmenting the `HTMLElementTagNameMap`, which TypeScript uses to infer the type of a returned element based on its tag name \(for DOM methods such as `document.createElement()`, `document.querySelector()`, etc.\):

<docs-code language="typescript">

declare global {
  interface HTMLElementTagNameMap {
    'my-dialog': NgElement & WithProperties<{content: string}>;
    'my-other-element': NgElement & WithProperties<{foo: 'bar'}>;
    …
  }
}

</docs-code>

Now, TypeScript can infer the correct type the same way it does for built-in elements:

<docs-code language="typescript">

document.createElement('div')               //-> HTMLDivElement (built-in element)
document.querySelector('foo')               //-> Element        (unknown element)
document.createElement('my-dialog')         //-> NgElement & WithProperties<{content: string}> (custom element)
document.querySelector('my-other-element')  //-> NgElement & WithProperties<{foo: 'bar'}>      (custom element)

</docs-code>
-->
`document.createElement()`나 `document.querySelector()`와 같은 제네릭 DOM API는 인자에 맞는 엘리먼트 타입을 반환합니다.
그래서 `document.createElement('a')`라고 작성하면 `HTMLAnchorElement`를 반환하며, TypeScript 코드에서 `href` 프로퍼티가 존재한다는 것을 인식할 수 있습니다.
다른 예시로, `document.createElement('div')`라고 작성하면 `HTMLDivElement`를 반확하기 때문에 TypeScript 코드에서 `href` 프로퍼티가 존재하지 않는다는 것을 인식할 수 있습니다.

그런데 예제 코드처럼 `popup-element`와 같은 커스텀 엘리먼트를 인자로 전달했다면, `document.createElement()` 헤서드는 `HTMLElement` 제네릭 타입을 반환합니다.
TypeScript 코드에서는 커스텀 엘리먼트의 타입을 추론할 수 없기 때문입니다.

Angular로 생성한 커스텀 엘리먼트는 `HTMLElement` 타입을 확장한 `NgElement`를 기반으로 하며, 컴포넌트의 입력 프로퍼티에 해당하는 프로퍼티를 갖습니다.
위 예제 코드를 보면, `popup-element`에는 `string` 타입의 `message` 프로퍼티가 존재합니다.

커스텀 엘리먼트에 올바른 타입을 적용하는 방법이 몇가지 있습니다.
다음 코드처럼 `my-dialog` 커스텀 엘리먼트를 생성한다고 합시다:

<docs-code language="typescript">

@Component(…)
class MyDialog {
  content =  input(string);
}

</docs-code>

가장 간단한 방법은 DOM 메서드가 반환하는 객체를 명시적으로 타입 변환하는 것입니다.
`@angular/elements` 패키지로 제공되는 `NgElement` 타입과 `WithProperties` 타입을 활용하면 도비니다.:

<docs-code language="typescript">

const aDialog = document.createElement('my-dialog') as NgElement & WithProperties<{content: string}>;
aDialog.content = 'Hello, world!';
aDialog.content = 123;  // <-- 에러: 문자열 값을 지정해야 합니다.
aDialog.body = 'News';  // <-- 에러: `aDialog`에는 `body` 프로퍼티가 존재하지 않습니다.

</docs-code>

커스텀 엘리먼트에 타입 검사나 코드 자동완성 등 TypeScript 기능을 활용하려면 이런 방법도 좋습니다.
하지만 커스텀 엘리먼트를 사용하는 모든 코드에 타입을 적용해야 한다면 번거로울 수 있습니다.

그렇다면 이 방식 대신 `HTMLElementTagNameMap`에 커스텀 엘리먼트와 타입을 등록해두는 방법이 있습니다.
이렇게 타입을 등록해두면 `document.createElemnt()`나 `document.querySelector()`와 같은 DMO 메서드가 태그 이름을 기반으로 TypeScript 타입을 추론합니다:

<docs-code language="typescript">

declare global {
  interface HTMLElementTagNameMap {
    'my-dialog': NgElement & WithProperties<{content: string}>;
    'my-other-element': NgElement & WithProperties<{foo: 'bar'}>;
    …
  }
}

</docs-code>

이제 TypeScript는 기본 엘리먼트와 동일하게 타입을 정확하게 추론합니다:

<docs-code language="typescript">

document.createElement('div')               //--> HTMLDivElement (기본 엘리먼트)
document.querySelector('foo')               //--> Element        (알 수 없는 엘리먼트)
document.createElement('my-dialog')         //--> NgElement & WithProperties<{content: string}> (커스텀 엘리먼트)
document.querySelector('my-other-element')  //--> NgElement & WithProperties<{foo: 'bar'}>      (커스텀 엘리먼트)

</docs-code>


<!--
## Limitations
-->
## 제한사항

<!--
Care should be taken when destroying and then re-attaching custom elements created with `@angular/elements` due to issues with the [disconnect()](https://github.com/angular/angular/issues/38778) callback. Cases where you may run into this issue are:

- Rendering a component in an `ng-if` or `ng-repeat` in `AngularJs`
- Manually detaching and re-attaching an element to the DOM
-->
`@angular/elements` 로 생성한 커스텀 엘리먼트를 제거했다가 다시 연결할 때는 [disconnect()](https://github.com/angular/angular/issues/38778) 콜백 이슈에 주의해야 합니다.
이 문제는 다음 경우에 발생할 수 있습니다:

- `AngularJs`에서 `ng-if`나 `ng-repeat`을 사용해서 컴포넌트를 렌더링 할 때
- DOM에서 엘리먼트를 수동으로 제거하고 다시 연결할 때
