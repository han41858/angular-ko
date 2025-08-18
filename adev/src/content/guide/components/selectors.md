<!--
# Component selectors
-->
# 컴포넌트 셀렉터

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Every component defines
a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_selectors) that determines how
the component is used:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'profile-photo',
  ...
})
export class ProfilePhoto { }
</docs-code>

You use a component by creating a matching HTML element in the templates of _other_ components:

<docs-code language="angular-ts" highlight="[3]">
@Component({
  template: `
    <profile-photo />
    <button>Upload a new profile photo</button>`,
  ...,
})
export class UserProfile { }
</docs-code>

**Angular matches selectors statically at compile-time**. Changing the DOM at run-time, either via
Angular bindings or with DOM APIs, does not affect the components rendered.

**An element can match exactly one component selector.** If multiple component selectors match a
single element, Angular reports an error.

**Component selectors are case-sensitive.**
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트는 컴포넌트가 위치하는 곳을 지정하기 위해 [CSS 셀렉터](https://developer.mozilla.org/docs/Web/CSS/CSS_selectors)를 지정합니다:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'profile-photo',
  ...
})
export class ProfilePhoto { }
</docs-code>

그러면 _다른_ 컴포넌트의 템플릿에서 매칭되는 HTML 엘리먼트를 만나면 해당 위치에 컴포넌트가 생성됩니다:

<docs-code language="angular-ts" highlight="[3]">
@Component({
  template: `
    <profile-photo />
    <button>Upload a new profile photo</button>`,
  ...,
})
export class UserProfile { }
</docs-code>

**Angular는 컴파일 타임에 셀렉터를 정적으로 매칭합니다.**
그래서 실행 시점에 Angular 바인딩 문법이나 DOM API로 DOM이 변경되는 것은 컴포넌트 렌더링에 영향을 미치지 않습니다.

**엘리먼트는 하나의 컴포넌트 셀렉터에만 매칭됩니다.**
한 엘리먼트에 컴포넌트 셀렉터가 여러개 매칭되면 에러가 발생합니다.

**컴포넌트 셀렉터는 대소문자를 구분합니다.**


<!--
## Types of selectors
-->
## 셀렉터의 종류

<!--
Angular supports a limited subset
of [basic CSS selector types](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) in
component selectors:

| **Selector type**  | **Description**                                                                                                 | **Examples**                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Type selector      | Matches elements based on their HTML tag name, or node name.                                                    | `profile-photo`               |
| Attribute selector | Matches elements based on the presence of an HTML attribute and, optionally, an exact value for that attribute. | `[dropzone]` `[type="reset"]` |
| Class selector     | Matches elements based on the presence of a CSS class.                                                          | `.menu-item`                  |

For attribute values, Angular supports matching an exact attribute value with the equals (`=`)
operator. Angular does not support other attribute value operators.

Angular component selectors do not support combinators, including
the [descendant combinator](https://developer.mozilla.org/docs/Web/CSS/Descendant_combinator)
or [child combinator](https://developer.mozilla.org/docs/Web/CSS/Child_combinator).

Angular component selectors do not support
specifying [namespaces](https://developer.mozilla.org/docs/Web/SVG/Namespaces_Crash_Course).
-->
Angular는 [기본 CSS 셀렉터 타입](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors)의 하위 집합으로만 컴포넌트 셀렉터를 지원합니다:

| **셀렉터 종류** | **설명**                              | **예**                         |
|------------|-------------------------------------|-------------------------------|
| 타입 셀렉터  0  | HTML 태그 이름이나 노드 이름과 매칭됩니다.          | `profile-photo`               |
| 어트리뷰트 셀렉터  | 엘리먼트에 지정된 어트리뷰트나 특정 어트리뷰트 값과 매칭됩니다. | `[dropzone]` `[type="reset"]` |
| 클래스 셀렉터    | CSS 클래스와 매칭됩니다.                     | `.menu-item`                  |

어트리뷰트 값이 지정되면 Angular는 등호(`=`) 연산자를 사용해서 어트리뷰트 값을 비교합니다.
다른 연산자는 지원하지 않습니다.

Angular 컴포넌트 셀렉터는 [자손 결합자(descendant combinator)](https://developer.mozilla.org/docs/Web/CSS/Descendant_combinator)나 [자식 결합자(child combinator)](https://developer.mozilla.org/docs/Web/CSS/Child_combinator) 등 결합 선택자를 지원하지 않습니다.

Angular 컴포넌트 셀렉터는 [네임스페이스](https://developer.mozilla.org/docs/Web/SVG/Namespaces_Crash_Course)를 지원하지 않습니다.


<!--
### The `:not` pseudo-class
-->
### `:not` 가상 클래스

<!--
Angular supports [the `:not` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:not).
You can append this pseudo-class to any other selector to narrow which elements a component's
selector matches. For example, you could define a `[dropzone]` attribute selector and prevent
matching `textarea` elements:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: '[dropzone]:not(textarea)',
  ...
})
export class DropZone { }
</docs-code>

Angular does not support any other pseudo-classes or pseudo-elements in component selectors.
-->
Angular는 [`:not` 가상 클래스](https://developer.mozilla.org/docs/Web/CSS/:not)를 지원합니다.

이 가상 클래스를 사용하면 컴포넌트 셀렉터가 매칭되는 엘리먼트 범위를 좁힐 수 있습니다.
`[dropzone]` 어트리뷰트 셀렉터를 사용하지만 `textarea` 엘리먼트에는 매칭하지 않는다고 합시다:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: '[dropzone]:not(textarea)',
  ...
})
export class DropZone { }
</docs-code>

`:not` 외 가상 클래스는 지원하지 않습니다.


<!--
### Combining selectors
-->
### 셀렉터 조합하기

<!--
You can combine multiple selectors by concatenating them. For example, you can match `<button>`
elements that specify `type="reset"`:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'button[type="reset"]',
  ...
})
export class ResetButton { }
</docs-code>

You can also define multiple selectors with a comma-separated list:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'drop-zone, [dropzone]',
  ...
})
export class DropZone { }
</docs-code>

Angular creates a component for each element that matches _any_ of the selectors in the list.
-->
셀렉터는 여러개를 조합해서 지정할 수도 있습니다.
`type="reset"` 어트리뷰트가 지정된 `<button>` 엘리먼트를 매칭하려면 이렇게 지정하면 됩니다:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'button[type="reset"]',
  ...
})
export class ResetButton { }
</docs-code>

쉼표(`,`)로 구분하면 셀렉터를 여러개 지정할 수도 있습니다:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'drop-zone, [dropzone]',
  ...
})
export class DropZone { }
</docs-code>

셀렉터를 여러개 지정하면 셀렉터 중 _어느 하나에_ 매칭되는 엘리먼트마다 컴포넌트를 생성합니다.


<!--
## Choosing a selector
-->
## 셀렉터 정하기

<!--
The vast majority of components should use a custom element name as their selector. All custom
element names should include a hyphen as described
by [the HTML specification](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).
By default, Angular reports an error if it encounters a custom tag name that does not match any
available components, preventing bugs due to mistyped component names.

See [Advanced component configuration](guide/components/advanced-configuration) for details on
using [native custom elements](https://developer.mozilla.org/docs/Web/Web_Components) in
Angular templates.
-->
컴포넌트는 대부분 커스텀 엘리먼트 이름으로 셀렉터를 지정합니다.
따라서 [HTML 스펙](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)에서 정하는 커스텀 엘리먼트 규칙에 따라 하이픈(`-`)을 최소한 하나 포함해야 합니다.
Angular는 어떠한 컴포넌트와도 매칭되지 않 커스텀 태그를 확인하면 버그와 오타를 방지하기 위해 에러를 발생시킵니다.

Angular 템플릿에서 [네이티브 커스텀 엘리먼트](https://developer.mozilla.org/docs/Web/Web_Components) 활용방법을 자세하게 알아보려면 [심화 컴포넌트 설정](guide/components/advanced-configuration) 문서를 참고하세요.


<!--
### Selector prefixes
-->
### 셀렉터 접두사

<!--
The Angular team recommends using a short, consistent prefix for all the custom components
defined inside your project. For example, if you were to build YouTube with Angular, you might
prefix your components with `yt-`, with components like `yt-menu`, `yt-player`, etc. Namespacing
your selectors like this makes it immediately clear where a particular component comes from. By
default, the Angular CLI uses `app-`.

Angular uses the `ng` selector prefix for its own framework APIs. Never use `ng` as a selector
prefix for your own custom components.
-->
Angular 팀은 프로젝트에 정의된 모든 커스텀 컴포넌트에 짧고 일관된 접두사 사용을 권장합니다.
예를 들어 Angular로 YouTube를 만든다면 `yt-` 접두사를 사용해서 컴포넌트를 `yt-menu`, `yt-player` 와 같이 만드는 식입니다.
셀렉터의 접두사를 네임스페이스처럼 사용하면 컴포넌트가 어떤 라이브러리에서 왔는지 쉽게 구분할 수 있습니다.
Angular CLI로 생성한 프로젝트의 기본 접두사는 `app-` 입니다.

Angular 프레임워크 자체 API의 셀렉터 접두사는 `ng` 입니다.
그래서 커스텀 컴포넌트에 `ng` 접두사를 사용하면 안됩니다.


<!--
### When to use an attribute selector
-->
### 어트리뷰트 셀렉터는 언제 사용해야 할까요?

<!--
You should consider an attribute selector when you want to create a component on a standard native
element. For example, if you want to create a custom button component, you can take advantage of the
standard `<button>` element by using an attribute selector:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'button[yt-upload]',
   ...
})
export class YouTubeUploadButton { }
</docs-code>

This approach allows consumers of the component to directly use all the element's standard APIs
without extra work. This is especially valuable for ARIA attributes such as `aria-label`.

Angular does not report errors when it encounters custom attributes that don't match an available
component. When using components with attribute selectors, consumers may forget to import the
component or its NgModule, resulting in the component not rendering.
See [Importing and using components](guide/components/importing) for more information.

Components that define attribute selectors should use lowercase, dash-case attributes. You can
follow the same prefixing recommendation described above.
-->
표준 네이티브 엘리먼트에 컴포넌트를 적용하려면 어트리뷰트 셀렉터 사용을 고려해야 합니다.
표준 `<button>` 엘리먼트에 추가 기능을 구현하려는 경우는 다음과 같이 어트리뷰트 셀렉터를 사용하면 됩니다:

<docs-code language="angular-ts" highlight="[2]">
@Component({
  selector: 'button[yt-upload]',
   ...
})
export class YouTubeUploadButton { }
</docs-code>

이렇게 구현하면 추가 작업 없이 기존에 존재하는 엘리먼트에 커스텀 컴포넌트를 적용할 수 있습니다.
이 방식은 `aria-label`과 같이 ARIA 어트리뷰트를 지정하는 경우에 특히 유용합니다.

그런데 커스텀 어트리뷰트 셀렉터는 매칭되는 컴포넌트가 없더라도 Angular가 에러를 발생시키지 않습니다.
그래서 어트리뷰트 셀렉터를 사용할 때는 컴포넌트나 컴포넌트가 등록된 NgModule을 로드하는 것을 깜빡해서 컴포넌트가 렌더링되지 않을 수 있습니다.
자세한 내용은 [컴포넌트 사용하기](guide/components/importing) 문서를 참고하세요.

컴포넌트 셀렉터를 어트리뷰트 셀렉터로 사용한다면, 소문자(lowercase)나 대시-케이스(dash-case)로 지정해야 합니다.
접두사를 사용하는 방식은 위에서 설명한 방식을 따르면 됩니다.
