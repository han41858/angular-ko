<!--
# Component styles
-->
# 컴포넌트 스타일

<!--
Angular applications are styled with standard CSS.
That means you can apply everything you know about CSS stylesheets, selectors, rules, and media queries directly to Angular applications.

Additionally, Angular can bundle *component styles* with components, enabling a more modular design than regular stylesheets.

This page describes how to load and apply these component styles.

Run the <live-example></live-example> in Stackblitz and download the code from there.
-->
Angular 애플리케이션의 스타일은 표준 CSS를 사용해서 지정합니다.
따라서 기존에 사용하고 있는 CSS 스타일시트, 셀렉터, 룰, 미디어 쿼리도 Angular 애플리케이션에 그대로 사용할 수 있습니다.

Angular는 여기에 추가로 개별 컴포넌트에 *컴포넌트 스타일*을 적용할 수 있으며, CSS 스타일 외에 다른 스타일 도구도 활용할 수 있습니다.

이 문서는 컴포넌트 스타일을 어떻게 불러오거나 지정할 수 있는지 안내합니다.

이 문서에서 다루는 예제는 <live-example></live-example>에서 확인하거나 다운받을 수 있습니다.


<!--
## Using component styles
-->
## 컴포넌트 스타일 사용하기

<!--
For every Angular component you write, you can define not only an HTML template, but also the CSS styles that go with that template, specifying any selectors, rules, and media queries that you need.

One way to do this is to set the `styles` property in the component metadata.
The `styles` property takes an array of strings that contain CSS code.
Usually you give it one string, as in the following example:

<code-example header="src/app/hero-app.component.ts" path="component-styles/src/app/hero-app.component.ts"></code-example>
-->
개발자가 만드는 모든 Angular 컴포넌트는 HTML 템플릿 외에 CSS 스타일도 지정할 수 있습니다.
이 스타일 설정에는 기존에 사용하던 셀렉터, 룰, 미디어 쿼리도 그대로 사용할 수 있습니다.

가장 간단한 방법은 컴포넌트 메타데이터에 `styles` 프로퍼티를 사용하는 것입니다.
`styles` 프로퍼티에는 CSS 코드를 문자열 배열 형태로 지정하며, 다음과 같이 문자열 하나로도 간단하게 지정할 수 있습니다:

<code-example header="src/app/hero-app.component.ts" path="component-styles/src/app/hero-app.component.ts"></code-example>


## Component styling best practices

<!--
<div class="alert is-helpful">

See [View Encapsulation](guide/view-encapsulation) for information on how Angular scopes styles to specific components.

</div>

You should consider the styles of a component to be private implementation details for that component.
When consuming a common component, you should not override the component's styles any more than you should access the private members of a TypeScript class.
While Angular's default style encapsulation prevents component styles from affecting other components, global styles affect all components on the page.
This includes `::ng-deep`, which promotes a component style to a global style.

You should consider the styles of a component to be private implementation details for that component.
When consuming a common component, you should not override the component's styles any more than you should access the private members of a TypeScript class.
While Angular's default style encapsulation prevents component styles from affecting other components, global styles affect all components on the page.
This includes `::ng-deep`, which promotes a component style to a global style.

### Authoring a component to support customization

As component author, you can explicitly design a component to accept customization in one of four different ways.

#### 1. Use CSS Custom Properties (recommended)

You can define a supported customization API for your component by defining its styles with CSS Custom Properties, alternatively known as CSS Variables.
Anyone using your component can consume this API by defining values for these properties, customizing the final appearance of the component on the rendered page.

While this requires defining a custom property for each customization point, it creates a clear API contract that works in all style encapsulation modes.

#### 2. Declare global CSS with `@mixin`

While Angular's emulated style encapsulation prevents styles from escaping a component, it does not prevent global CSS from affecting the entire page.
While component consumers should avoid directly overwriting the CSS internals of a component, you can offer a supported customization API via a CSS preprocessor like Sass.

For example, a component may offer one or more supported mixins to customize various aspects of the component's appearance.
While this approach uses global styles in its implementation, it allows the component author to keep the mixins up to date with changes to the component's private DOM structure and CSS classes.

#### 3. Customize with CSS `::part`

If your component uses [Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM), you can apply the `part` attribute to specify elements in your component's template.
This allows consumers of the component to author arbitrary styles targeting those specific elements with [the `::part` pseudo-element](https://developer.mozilla.org/docs/Web/CSS/::part).

While this lets you limit the elements within your template that consumers can customize, it does not limit which CSS properties are customizable.

#### 4. Provide a TypeScript API

You can define a TypeScript API for customizing styles, using template bindings to update CSS classes and styles.
This is not recommended because the additional JavaScript cost of this style API incurs far more performance cost than CSS.
-->
<div class="alert is-helpful">

컴포넌트에 적용되는 Angular 스타일 범위에 대해 알아보려면 [뷰 캡슐화(View Encapsulation)](guide/view-encapsulation) 문서를 참고하세요.

</div>

컴포넌트의 스타일은 해당 컴포넌트에만 적용되는 것으로 이해하는 것이 좋습니다.
그래서 공통으로 사용하는 컴포넌트라면 이 컴포넌트를 상속받을 때도 TypeScript 클래스의 `private` 멤버인 것처럼 간주하고 오버라이드하지 않도록 주의해야 합니다.
Angular는 기본적으로 어떤 컴포넌트 스타일이 다른 컴포넌트에 영향을 주지 않는 방식으로 동작합니다.
전역 스타일이나 `::ng-deep`는 예외입니다.


### 컴포넌트에 커스터마이징 기능 제공하기

컴포넌트 제작자라면 여러가지 방식으로 컴포넌트를 커스터마이징할 수 있도록 이런 기능을 제공하는 것이 좋습니다.

#### 1. CSS 커스텀 프로퍼티 제공하기 (권장)

CSS 스타일과 연결되는 프로퍼티를 컴포넌트에 선언해서 API로 열어주는 것이 좋습니다.
그러면 컴포넌트를 사용하는 개발자가 원하는 대로 CSS 값을 지정할 수 있습니다.

커스터마이징 할 수 있는 기능마다 이렇게 커스텀 프로퍼티를 제공하면 뷰 캡슐화를 안전하게 유지할 수 있습니다.


#### 2. 전역 CSS에 `@mixin` 선언하기

Angular의 뷰 캡슐화 정책에 따르면 컴포넌트의 스타일이 전역 스타일에 영향을 주지는 않지만, 전역 범위에 지정하는 CSS는 컴포넌트에 적용될 수 있습니다.
그래서 컴포넌트를 사용하는 개발자가 Sass를 사용한다면 컴포넌트 안에서 CSS 값을 직접 수정하지 않는 방식으로 커스터마이징 API를 지원할 수 있습니다.

예를 들어 컴포넌트의 모습이 믹스인에 영향을 받는다고 해 봅시다.
그러면 전역 스타일에서 이 믹스인을 조정하는 방식으로 컴포넌트 내부 DOM 구조나 CSS 클래스에 영향을 줄 숫 있습니다.


#### 3. CSS `::part` 활용하기

[Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)을 활용하는 컴포넌트라면, 컴포넌트 템플릿에 `part` 어트리뷰트를 활용하는 방법을 고려해볼만 합니다.
그러면 [`::part` 유사 엘리먼트](https://developer.mozilla.org/docs/Web/CSS/::part)를 활용해서 컴포넌트의 스타일을 지정할 수 있습니다.

이 방식을 사용하면 컴포넌트 템플릿에 영향을 주지 않으면서 CSS 프로퍼티 값을 커스터마이징 할 수 있습니다.


#### 4. TypeScript API 제공하기

템플릿에서 CSS 클래스나 스타일을 바인딩하는 방식으로 TypeScript API를 제공할 수 있습니다.
이 방식은 JavaScript 연산이 필요하기 때문에 CSS를 직접 사용하는 것과 비교해서 성능이 좋지 않아 권장하지 않습니다.



<!--
## Special selectors
-->
## Angular 전용 셀렉터

<!--
Component styles have a few special *selectors* from the world of shadow DOM style scoping \(described in the [CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1) page on the [W3C](https://www.w3.org) site\).
The following sections describe these selectors.
-->
컴포넌트에 스타일 문법에는 섀도우 DOM에 적용할 수 있는 특별한 *셀렉터* 를 몇가지 사용할 수 있습니다.
이 셀렉터들은 [W3C](https://www.w3.org) 사이트의 [CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1)에서 정의하는 표준 셀렉터입니다.

### :host

<!--
Every component is associated within an element that matches the component's selector.
This element, into which the template is rendered, is called the *host element*.
The `:host` pseudo-class selector may be used to create styles that target the host element itself, as opposed to targeting elements inside the host.

<code-example header="src/app/host-selector-example.component.ts" path="component-styles/src/app/host-selector-example.component.ts"></code-example>

Creating the following style will target the component's host element.
Any rule applied to this selector will affect the host element and all its descendants \(in this case, italicizing all contained text\).

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="host"></code-example>

The `:host` selector only targets the host element of a component.
Any styles within the `:host` block of a child component will *not* affect parent components.

Use the *function form* to apply host styles conditionally by including another selector inside parentheses after `:host`.

In this example the host's content also becomes bold when the `active` CSS class is applied to the host element.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="hostfunction"></code-example>

The `:host` selector can also be combined with other selectors.
Add selectors behind the `:host` to select child elements, for example using `:host h2` to target all `<h2>` elements inside a component's view.

<div class="alert is-helpful">

You should not add selectors \(other than `:host-context`\) in front of the `:host` selector to style a component based on the outer context of the component's view.
Such selectors are not scoped to a component's view and will select the outer context, but it's not built-in behavior.
Use `:host-context` selector for that purpose instead.

</div>
-->
컴포넌트는 컴포넌트 셀렉터와 같은 이름의 엘리먼트 안에 구성됩니다.
이 엘리먼트는 이후에 템플릿에 렌더링되는데, 이 엘리먼트가 렌더링되는 위치를 *호스트 엘리먼트\(host element)\*라고 합니다.
`:host` 가상 클래스 셀렉터는 이 호스트 엘리먼트를 가리킵니다.
대상 엘리먼트(targeting elements))는 호스트 엘리먼트 안에 들어가는 엘리먼트로, 호스트 엘리먼트와는 반대 개념입니다.

<code-example header="src/app/host-selector-example.component.ts" path="component-styles/src/app/host-selector-example.component.ts"></code-example>

컴포넌트의 호스트 엘리먼트에 스타일을 지정해 봅시다.
`:host` 셀렉터를 붙여 지정하는 규칙은 호스트 엘리먼트와 그 자식 엘리먼트에 영향을 미칩니다.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="host"></code-example>

`:host` 셀렉터는 컴포넌트의 호스트 엘리먼트만 대상으로 지정할 수 있습니다.
그래서 `:host` 블록 안에 선언한 스타일은 모두 부모 컴포넌트에 영향을 미치지 *않습니다*.

조건에 따라 스타일을 적용해야 한다면 `:host` 뒤에 괄호를 붙이고 *함수 형태*를 작성하면 됩니다.

아래 예제처럼 구현하면 호스트 엘리먼트에 `active` CSS 클래스가 지정되었을 때 텍스트를 굵게 표시합니다.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="hostfunction"></code-example>

`:host` 셀렉터는 다른 셀렉터와 조합해서 사용할 수 있습니다.
그래서 `:host h2`와 같이 작성하면 모든 컴포넌트 뷰에 있는 엘리먼트 중에서 모든 `<h2>`를 대상으로 지정할 수 있습니다.

<div class="alert is-helpful">

`:host` 셀렉터 앞에는 다른 셀렉터\(`:host-context` 제외\)를 사용할 수 없습니다.
`:host` 셀렉터는 컴포넌트의 뷰를 대상으로 하기 때문에 외부 컨텍스트를 지정할 수 없습니다.
외부 컨텍스트와 연동하려면 `:host-context` 셀렉터를 사용해야 합니다.

</div>


### :host-context

<!--
Sometimes it's useful to apply styles to elements within a component's template based on some condition in an element that is an ancestor of the host element.
For example, a CSS theme class could be applied to the document `<body>` element, and you want to change how your component looks based on that.

Use the `:host-context()` pseudo-class selector, which works just like the function form of `:host()`.
The `:host-context()` selector looks for a CSS class in any ancestor of the component host element, up to the document root.
The `:host-context()` selector is only useful when combined with another selector.

The following example italicizes all text inside a component, but only
if some *ancestor* element of the host element has the CSS class `active`.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="hostcontext"></code-example>

<div class="alert is-helpful">

**NOTE**: <br />
Only the host element and its descendants will be affected, not the ancestor with the assigned `active` class.

</div>
-->
때로는 호스트 엘리먼트의 부모 엘리먼트의 조건에 따라 컴포넌트 템플릿의 스타일을 적용해야 하는 경우가 있습니다.
HTML 문서의 `<body>` 엘리먼트에 CSS 테마 관련 클래스가 지정된다면 이 조건에 따라 컴포넌트의 모습을 변형하는 경우가 그렇습니다.

이 때 `:host-context` 가상 클래스 셀렉터를 사용하면 `:host()` 를 사용할 때와 비슷하게 컴포넌트 밖에 있는 엘리먼트를 가리킬 수 있습니다.
`:host-context()` 셀렉터는 컴포넌트가 위치하는 호스트 엘리먼트의 부모 엘리먼트부터 HTML 문서의 루트 노드까지 적용됩니다.
이 셀렉터는 다른 셀렉터와 마찬가지로 조합해서 사용할 수도 있습니다.

아래 예제 코드는 호스트 엘리먼트의 _부모_ 엘리먼트 중에 `active` CSS 클래스가 지정되었을 때 텍스트에 이탤릭 스타일을 지정하는 예제 코드입니다.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="hostcontext"></code-example>

<div class="alert is-helpful">

**참고**: <br />
호스트 엘리먼트와 그 자식 엘리먼트만 영향을 받는다는 것이 중요합니다.
`active` 클래스가 지정된 호스트 엘리먼트의 부모 엘리먼트는 영향을 받지 않습니다.

</div>


<a id="deprecated-deep--and-ng-deep"></a>

<!--
### (deprecated) `/deep/`, `>>>`, and `::ng-deep`
-->
### (지원 중단) `/deep/`, `>>>`, `::ng-deep`

<!--
Component styles normally apply only to the HTML in the component's own template.

Applying the `::ng-deep` pseudo-class to any CSS rule completely disables view-encapsulation for that rule.
Any style with `::ng-deep` applied becomes a global style.
In order to scope the specified style to the current component and all its descendants, be sure to include the `:host` selector before `::ng-deep`.
If the `::ng-deep` combinator is used without the `:host` pseudo-class selector, the style can bleed into other components.

The following example targets all `<h3>` elements, from the host element down through this component to all of its child elements in the DOM.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="deep"></code-example>

The `/deep/` combinator also has the aliases `>>>`, and `::ng-deep`.

<div class="alert is-important">

Use `/deep/`, `>>>`, and `::ng-deep` only with *emulated* view encapsulation.
Emulated is the default and most commonly used view encapsulation.
For more information, see the [View Encapsulation](guide/view-encapsulation) section.

</div>

<div class="alert is-important">

The shadow-piercing descendant combinator is deprecated and [support is being removed from major browsers](https://www.chromestatus.com/feature/6750456638341120) and tools.
As such we plan to drop support in Angular \(for all 3 of `/deep/`, `>>>`, and `::ng-deep`\).
Until then `::ng-deep` should be preferred for a broader compatibility with the tools.

</div>
-->
컴포넌트 스타일은 보통 해당 컴포넌트의 템플릿에만 적용합니다.

가상 클래스 `::ng-deep`가 적용된 CSS는 컴포넌트의 뷰 캡슐화 정책을 완전히 무시합니다.
그래서 `::ng-deep`이 적용된 규칙은 전역 스타일 규칙이 되기 때문에 해당 컴포넌트는 물론이고 이 컴포넌트의 자식 컴포넌트에 모두 적용됩니다.
그리고 `:host` 셀렉터 앞에 `::ng-deep` 클래스를 사용하거나 `:host` 셀렉터를 사용하지 않으면 해당 CSS 규칙은 다른 컴포넌트에도 모두 적용되니 주의해야 합니다.

아래 예제는 컴포넌트 뷰 안에 있는 모든 자식 컴포넌트의 `<h3>` 엘리먼트에 이탤릭 속성을 지정하는 예제 코드입니다.

<code-example header="src/app/hero-details.component.css" path="component-styles/src/app/hero-details.component.css" region="deep"></code-example>

`/deep/` 셀렉터는 `>>>`나 `::ng-deep` 문법으로도 사용할 수 있습니다.

<div class="alert is-important">

`/deep/`, `>>>`, `::ng-deep` 셀렉터는 *`Emulated`* 뷰 캡슐화 정책을 사용할 때만 사용하세요.
이 정책은 뷰 캡슐화 정책의 기본값입니다.
좀 더 자세한 설명은 [뷰 캡슐화 정책](guide/view-encapsulation) 문서를 참고하세요.

</div>

<div class="alert is-important">

`/deep/` 셀렉터는 Angular에서 공식적으로 지원이 중단되었으며 [대부분의 브라우저에서도 지원이 중단](https://www.chromestatus.com/feature/6750456638341120)되었습니다.
따라서 `::ng-deep`의 호환성 문제에 대한 해결방안이 마련되는 대로 앞으로 배포될 Angular에는 `/deep/`과 `>>>`, `::ng-deep`이 모두 제거될 예정입니다.

</div>


<a id="loading-styles"></a>

<!--
## Loading component styles
-->
## 컴포넌트 스타일 지정하기

<!--
There are several ways to add styles to a component:

*   By setting `styles` or `styleUrls` metadata
*   Inline in the template HTML
*   With CSS imports

The scoping rules outlined earlier apply to each of these loading patterns.
-->
컴포넌트에 스타일을 지정하려면 다음과 같은 방법을 활용할 수 있습니다.

*   컴포넌트 메타데이터에 `style`이나 `styleUrls` 사용하기
*   템플릿 HTML에 인라인으로 지정하기
*   외부 CSS 파일 불러오기

이 규칙에 대해 자세하게 알아봅시다.


<!--
### Styles in component metadata
-->
### 컴포넌트 메타데이터로 스타일 지정하기

<!--
Add a `styles` array property to the `@Component` decorator.

Each string in the array defines some CSS for this component.

<code-example header="src/app/hero-app.component.ts (CSS inline)" path="component-styles/src/app/hero-app.component.ts"></code-example>

<div class="alert is-critical">

Reminder:
These styles apply *only to this component*.
They are *not inherited* by any components nested within the template nor by any content projected into the component.

</div>

The Angular CLI command [`ng generate component`](cli/generate) defines an empty `styles` array when you create the component with the `--inline-style` flag.

<code-example format="shell" language="shell">

ng generate component hero-app --inline-style

</code-example>
-->
`@Component` 데코레이터에는 `styles` 프로퍼티를 지정할 수 있습니다.

이 프로퍼티는 문자열 배열을 사용하는데, 컴포넌트에 지정될 CSS 스타일을 문자열로 각각 지정합니다.

<code-example header="src/app/hero-app.component.ts (CSS inline)" path="component-styles/src/app/hero-app.component.ts"></code-example>

<div class="alert is-critical">

주의:
이 방법으로 지정하는 스타일은 *이 컴포넌트에만* 적용됩니다.
템플릿 안에 있는 자식 컴포넌트나, 이 컴포넌트에 프로젝트되는 다른 컨텐츠에도 적용되지 않습니다.

</div>

Angular CLI로 [`ng generate component`](cli/generate) 명령을 실행할 때 `--inline-style` 플래그를 지정하면 `styles` 배열이 비어있는 상태에서 컴포넌트 코드 개발을 시작할 수 있습니다.

<code-example format="shell" language="shell">

ng generate component hero-app --inline-style

</code-example>


<!--
### Style files in component metadata
-->
### 컴포넌트 메타데이터에 외부 스타일 파일 불러오기

<!--
Load styles from external CSS files by adding a `styleUrls` property to a component's `@Component` decorator:

<code-tabs>
    <code-pane header="src/app/hero-app.component.ts (CSS in file)" path="component-styles/src/app/hero-app.component.1.ts"></code-pane>
    <code-pane header="src/app/hero-app.component.css" path="component-styles/src/app/hero-app.component.css"></code-pane>
</code-tabs>

<div class="alert is-critical">

Reminder: the styles in the style file apply *only to this component*.
They are *not inherited* by any components nested within the template nor by any content projected into the component.

</div>

<div class="alert is-helpful">

You can specify more than one styles file or even a combination of `styles` and `styleUrls`.

</div>

When you use the Angular CLI command [`ng generate component`](cli/generate) without the `--inline-style` flag, it creates an empty styles file for you and references that file in the component's generated `styleUrls`.

<code-example format="shell" language="shell">

ng generate component hero-app

</code-example>
-->
컴포넌트의 `@Component` 데코레이터에 `styleUrls` 프로퍼티를 사용하면 컴포넌트 외부에 있는 CSS 파일을 불러와서 컴포넌트에 적용할 수 있습니다.

<code-tabs>
    <code-pane header="src/app/hero-app.component.ts (CSS in file)" path="component-styles/src/app/hero-app.component.1.ts"></code-pane>
    <code-pane header="src/app/hero-app.component.css" path="component-styles/src/app/hero-app.component.css"></code-pane>
</code-tabs>

<div class="alert is-critical">

주의 : 이 방법으로 지정하는 스타일은 *이 컴포넌트에만* 적용됩니다.
템플릿 안에 있는 자식 컴포넌트나, 이 컴포넌트에 프로젝트되는 다른 컨텐츠에는 적용되지 않습니다.

</div>

<div class="alert is-helpful">

`styles`이나 `styleUrls` 프로퍼티에는 한 번에 여러 스타일을 지정하거나 여러 파일을 지정할 수 있습니다.

</div>

Angular CLI로 [`ng generate component`](cli/generate) 명령을 실행할 때 `--inline-style` 플래그를 지정하지 않으면 컴포넌트 이름으로 스타일 파일을 만들고 컴포넌트 메타데이터의 `styleUrls`에서 이 파일을 참조합니다.

<code-example format="shell" language="shell">

ng generate component hero-app

</code-example>



<!--
### Template inline styles
-->
### 템플릿 인라인 스타일

<!--
Embed CSS styles directly into the HTML template by putting them inside `<style>` tags.

<code-example header="src/app/hero-controls.component.ts" path="component-styles/src/app/hero-controls.component.ts" region="inlinestyles"></code-example>
-->
CSS 스타일은 `<style>` 태그를 사용해서 HTML 템플릿 안에 지정할 수도 있습니다.

<code-example header="src/app/hero-controls.component.ts" path="component-styles/src/app/hero-controls.component.ts" region="inlinestyles"></code-example>


<!--
### Template link tags
-->
### 템플릿 link 태그

<!--
You can also write `<link>` tags into the component's HTML template.

<code-example header="src/app/hero-team.component.ts" path="component-styles/src/app/hero-team.component.ts" region="stylelink"></code-example>

<div class="alert is-critical">

When building with the CLI, be sure to include the linked style file among the assets to be copied to the server as described in the [Assets configuration guide](guide/workspace-config#assets-configuration).

Once included, the CLI includes the stylesheet, whether the link tag's href URL is relative to the application root or the component file.

</div>
-->
컴포넌트 HTML 템플릿에는 `<link>` 태그를 사용할 수도 있습니다.

<code-example header="src/app/hero-team.component.ts" path="component-styles/src/app/hero-team.component.ts" region="stylelink"></code-example>

<div class="alert is-critical">

Angular CLI가 애플리케이션을 빌드할 때 링크로 연결된 스타일 파일이 `assets` 폴더에 있고 빌드 결과에 제대로 포함되는지 꼭 확인하세요.
`assets` 폴더를 활용하는 방법은 [애셋 환경설정 가이드](guide/workspace-config#assets-configuration)문서에서 설명합니다.

스타일 파일이 `assets` 폴더에 있다면 CLI가 이 스타일 파일을 빌드 결과물에 포함시키며, 컴포넌트에서는 애플리케이션 최상위 경로나 컴포넌트 파일의 상대경로로 이 스타일 파일을 참조할 수 있습니다.

</div>


### CSS @imports

<!--
Import CSS files into the CSS files using the standard CSS `@import` rule.
For details, see [`@import`](https://developer.mozilla.org/en/docs/Web/CSS/@import) on the [MDN](https://developer.mozilla.org) site.

In this case, the URL is relative to the CSS file into which you're importing.

<code-example header="src/app/hero-details.component.css (excerpt)" path="component-styles/src/app/hero-details.component.css" region="import"></code-example>
-->
외부 CSS 파일을 불러올 때는 CSS 표준인 `@import`를 사용하는 방법도 있습니다.
이 문법에 대해 자세하게 알아보려면 [MDN](https://developer.mozilla.org) 사이트의 [`@import`](https://developer.mozilla.org/en/docs/Web/CSS/@import) 문서를 참고하세요.

이 경우에는 CSS 파일을 로드하는 컴포넌트에서 시작하는 상대 경로로 외부 CSS 파일의 URL을 지정합니다.

<code-example header="src/app/hero-details.component.css (일부)" path="component-styles/src/app/hero-details.component.css" region="import"></code-example>


<!--
### External and global style files
-->
### 전역 스타일 파일

<!--
When building with the CLI, you must configure the `angular.json` to include *all external assets*, including external style files.

Register **global** style files in the `styles` section which, by default, is pre-configured with the global `styles.css` file.

See the [Styles configuration guide](guide/workspace-config#styles-and-scripts-configuration) to learn more.
-->
Angular CLI로 애플리케이션의 빌드 설정 파일인 `angular.json` 파일은 빌드에 포함될 *모든 외부 자원* 을 지정하는데, 이 때 외부 스타일 파일을 지정할 수도 있습니다.

이 때 `styles` 항목을 활용하면 **전역**으로 지정될 스타일 파일을 지정할 수 있으며, CLI로 생성한 프로젝트라면 `styles.css` 파일이 초기값으로 지정됩니다.

더 자세한 내용은 [스타일 환경설정 가이드](guide/workspace-config#styles-and-scripts-configuration) 문서를 참고하세요.


<!--
### Non-CSS style files
-->
### CSS 이외의 스타일 파일

<!--
If you're building with the CLI, you can write style files in [sass](https://sass-lang.com), or [less](https://lesscss.org), and specify those files in the `@Component.styleUrls` metadata with the appropriate extensions \(`.scss`, `.less`\) as in the following example:

<code-example format="typescript" language="typescript">

&commat;Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
&hellip;

</code-example>

The CLI build process runs the pertinent CSS preprocessor.

When generating a component file with `ng generate component`, the CLI emits an empty CSS styles file \(`.css`\) by default.
Configure the CLI to default to your preferred CSS preprocessor as explained in the [Workspace configuration guide](guide/workspace-config#generation-schematics).
-->
Angular CLI를 사용한다면 [sass](http://sass-lang.com/)나 [less](http://lesscss.org/)를 사용할 수도 있으며, 이렇게 만든 스타일 파일은 `@Component.styleUrls` 메타데이터에 다음과 같이 지정할 수 있습니다:

<code-example format="typescript" language="typescript">

&commat;Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
&hellip;

</code-example>

그러면 Angular CLI에 정의된 CSS 프리프로세서를 통해 최종 결과물에는 CSS 스타일로 변환됩니다.

`ng generate component` 명령으로 컴포넌트를 생성하면 비어있는 CSS 파일(`.css`)이 기본으로 생성됩니다.
Angular CLI가 기본으로 사용할 CSS 전처리기를 지정하는 방법에 대해 알아보려면 [워크스페이스 환경설정 가이드](guide/workspace-config#generation-schematics) 문서를 참고하세요.

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
