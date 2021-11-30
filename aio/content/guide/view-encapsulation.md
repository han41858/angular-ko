<!--
# View encapsulation
-->
# 뷰 캡슐화

<!--
In Angular, component CSS styles are encapsulated into the component's view and don't
affect the rest of the application.

To control how this encapsulation happens on a _per
component_ basis, set the _view encapsulation mode_ in the component metadata.
Choose from the following modes:

- `ShadowDom` view encapsulation uses the browser's built-in shadow DOM implementation (see
  [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM))
  to attach a shadow DOM to the component's host element, and then puts the component
  view inside that shadow DOM. The component's styles are included within the shadow DOM.

- `Emulated` view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing
  (and renaming) the CSS code to effectively scope the CSS to the component's view.
  For details, see [Inspecting generated CSS](guide/view-encapsulation#inspect-generated-css).

- `None` means that Angular does no view encapsulation.
  Angular adds the CSS to the global styles.
  The scoping rules, isolations, and protections discussed earlier don't apply.
  This mode is essentially the same as pasting the component's styles into the HTML.

To set the component's encapsulation mode, use the `encapsulation` property in the component metadata:

<code-example path="component-styles/src/app/quest-summary.component.ts" region="encapsulation.shadow" header="src/app/quest-summary.component.ts"></code-example>

`ShadowDom` view encapsulation only works on browsers that have built-in support
for shadow DOM (see [Can I use - Shadow DOM v1](https://caniuse.com/shadowdomv1)).
The support is still limited, which is why `Emulated` view encapsulation is the default mode and recommended in most cases.
-->
Angular에서는 컴포넌트에 적용된 CSS 스타일이 컴포넌트 뷰를 대상으로 캡슐화되기 때문에 애플리케이션에 있는 다른 컴포넌트에 영향을 주지 않습니다.

이 캡슐화 정책은 _컴포넌트마다_ 다르게 지정할 수 있으며, 정책은 컴포넌트 메타데이터에 _뷰 캡슐화 모드_ 를 지정하면 변경할 수 있습니다.

뷰 캡슐화 모드는 이런 것들이 있습니다:

- `ShadowDom` &mdash; 브라우저 기본 섀도우 DOM을 활용해서 뷰를 캡슐화 합니다.
  섀도우 DOM에 대해 자세하게 알아보려면 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) 문서를 참고하세요.
  이 모드를 사용하면 컴포넌트 템플릿이 섀도우 DOM 형태로 컴포넌트 호스트 엘리먼트에 들어갑니다.

- `Emulated` &mdash; (기본값) 컴포넌트에 CSS 코드를 추가해서 섀도우 DOM처럼 캡슐화합니다.
  자세한 내용은 [자동생성된 CSS 확인하기](guide/view-encapsulation#inspect-generated-css) 섹션을 참고하세요.

- `None` &mdash; 뷰 캡슐화를 하지 않습니다.
  컴포넌트에 지정한 스타일은 컴포넌트 뿐 아니라 전역 범위에 적용됩니다.
  컴포넌트는 캡슐화되지 않으며, HTML 문서에 직접 컴포넌트 스타일을 지정한 것과 같은 효과를 냅니다.

컴포넌트 캡슐화 모드를 설정하려면 컴포넌트 메타데이터의 `encapsulation` 프로퍼티를 지정하면 됩니다:

<code-example path="component-styles/src/app/quest-summary.component.ts" region="encapsulation.shadow" header="src/app/quest-summary.component.ts"></code-example>

`ShadowDom` 모드는 브라우저가 섀도우 DOM을 지원할 때만 정상 동작합니다.
지원하는 브라우저 목록을 확인하려면 [Can I use 사이트의 Shadow DOM v1](https://caniuse.com/shadowdomv1) 문서를 참고하세요.
섀도우 DOM은 아직 모든 환경에 사용할 수 없기 때문에 `Emulated` 모드가 기본값입니다.


{@a inspect-generated-css}
{@a inspecting-generated-css}
<!--
## Inspecting generated CSS
-->
## 자동생성된 CSS 확인하기

<!--
When using emulated view encapsulation, Angular preprocesses
all component styles so that they approximate the standard shadow CSS scoping rules.

In the DOM of a running Angular application with emulated view
encapsulation enabled, each DOM element has some extra attributes
attached to it:

<code-example format="">
&lt;hero-details _nghost-pmm-5>
  &lt;h2 _ngcontent-pmm-5>Mister Fantastic&lt;/h2>
  &lt;hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    &lt;h3 _ngcontent-pmm-6>Team&lt;/h3>
  &lt;/hero-team>
&lt;/hero-detail>
</code-example>

There are two kinds of generated attributes:

- An element that would be a shadow DOM host in native encapsulation has a
  generated `_nghost` attribute. This is typically the case for component host elements.
- An element within a component's view has a `_ngcontent` attribute
  that identifies to which host's emulated shadow DOM this element belongs.

The exact values of these attributes aren't important. They are automatically
generated and you should never refer to them in application code. But they are targeted
by the generated component styles, which are in the `<head>` section of the DOM:

<code-example format="">
[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
  background-color: white;
  border: 1px solid #777;
}
</code-example>

These styles are post-processed so that each selector is augmented
with `_nghost` or `_ngcontent` attribute selectors.
These extra selectors enable the scoping rules described in this page.
-->
뷰 캡슐화 정책을 `Emulated` 모드로 지정하면 Angular는 모든 컴포넌트 스타일을 전처리해서 표준 섀도우 CSS 규칙과 비슷하게 변환합니다.

그래서 Angular 애플리케이션을 실행한 후에 DOM을 확인해보면 각 DOM 엘리먼트에 어트리뷰트가 조금씩 더 붙어있는 것을 볼 수 있습니다:

<code-example format="">
  &lt;hero-details _nghost-pmm-5>
    &lt;h2 _ngcontent-pmm-5>Mister Fantastic&lt;/h2>
    &lt;hero-team _ngcontent-pmm-5 _nghost-pmm-6>
      &lt;h3 _ngcontent-pmm-6>Team&lt;/h3>
    &lt;/hero-team>
  &lt;/hero-detail>
</code-example>

이렇게 생성되는 어트리뷰트는 두 종류로 구분할 수 있습니다:

- 섀도우 DOM의 호스트가 되는 엘리먼트는 `_nghost` 어트리뷰트가 붙습니다.
그래서 Angular 컴포넌트의 호스트 엘리먼트도 이 어트리뷰트가 붙습니다.

- 컴포넌트 안에 있는 엘리먼트에는 `_ngcontent` 어트리뷰트가 붙습니다.
이 어트리뷰트는 섀도우 DOM의 동작을 흉내내기 위해 붙습니다.

어트리뷰트가 정확히 어떤 이름인지는 중요하지 않습니다.
이 어트리뷰트는 Angular가 자동으로 생성하는 것이지 애플리케이션 안에서 참조하는 값이 아닙니다.
만약 이미 생성된 컴포넌트 스타일을 대상으로 스타일을 지정해야 한다면 `<head>` 태그에 이런 코드를 작성할 수도 있습니다:

<code-example format="">
[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
background-color: white;
border: 1px solid #777;
}
</code-example>

이 코드에서 참조한 `_nghost`, `_ngcontent` 어트리뷰트 셀렉터는 Angular가 이미 처리하고 난 후에 생성된 것입니다.
Angular 애플리케이션이 다시 빌드되면 변경될 수 있습니다.


## Mixing encapsulation modes

Avoid mixing components that use different view encapsulation. Where it is necessary, you should be aware of how the component styles will interact.

- The styles of components with `ViewEncapsulation.Emulated` are added to the `<head>` of the document, making them available throughout the application, but are "scoped" so they only affect elements within the component's template.

- The styles of components with `ViewEncapsulation.None` are added to the `<head>` of the document, making them available throughout the application, and are not "scoped" so they can affect any element in the application.

- The styles of components with `ViewEncapsulation.ShadowDom` are only added to the shadow DOM host, ensuring that they only affect elements within the component's template.

**All the styles for `ViewEncapsulation.Emulated` and `ViewEncapsulation.None` components are also added to the shadow DOM host of each `ViewEncapsulation.ShadowDom` component.**

The result is that styling for components with `ViewEncapsulation.None` will affect matching elements within the shadow DOM.

This approach may seem counter-intuitive at first, but without it a component with `ViewEncapsulation.None` could not be used within a component with `ViewEncapsulation.ShadowDom`, since its styles would not be available.

### Examples

This section shows examples of how the styling of components with different `ViewEncapsulation` interact.

See the <live-example noDownload></live-example> to try out these components yourself.

#### No encapsulation

The first example shows a component that has `ViewEncapsulation.None`. This component colors its template elements red.

<code-example path="view-encapsulation/src/app/no-encapsulation.component.ts" header="src/app/no-encapsulation.component.ts"></code-example>>

Angular adds the styles for this component as global styles to the `<head>` of the document.

**Angular also adds the styles to all shadow DOM hosts.** Therefore, the styles are available throughout the application.

<img src="generated/images/guide/view-encapsulation/no-encapsulation.png" alt="component with no encapsulation">

#### Emulated encapsulation

The second example shows a component that has `ViewEncapsulation.Emulated`. This component colors its template elements green.

<code-example path="view-encapsulation/src/app/emulated-encapsulation.component.ts" header="src/app/emulated-encapsulation.component.ts"></code-example>>

Similar to `ViewEncapsulation.None`, Angular adds the styles for this component to the `<head>` of the document, and to all the shadow DOM hosts.
But in this case, the styles are "scoped" by the attributes described in ["Inspecting generated CSS"](#inspecting-generated-css).

Therefore, only the elements directly within this component's template will match its styles.
Since the "scoped" styles from the `EmulatedEncapsulationComponent` are very specific, they override the global styles from the `NoEncapsulationComponent`.

In this example, the `EmulatedEncapsulationComponent` contains a `NoEncapsulationComponent`.
The `NoEncapsulationComponent` is styled as expected because the scoped styles do not match elements in its template.

<img src="generated/images/guide/view-encapsulation/emulated-encapsulation.png" alt="component with no encapsulation">

#### Shadow DOM encapsulation

The third example shows a component that has `ViewEncapsulation.ShadowDom`. This component colors its template elements blue.

<code-example path="view-encapsulation/src/app/shadow-dom-encapsulation.component.ts" header="src/app/shadow-dom-encapsulation.component.ts"></code-example>>

Angular adds styles for this component only to the shadow DOM host, so they are not visible outside the shadow DOM.

Note that Angular also adds the global styles from the `NoEncapsulationComponent` and `ViewEncapsulationComponent` to the shadow DOM host, so those styles are still available to the elements in the template of this component.

In this example, the `ShadowDomEncapsulationComponent` contains both a `NoEncapsulationComponent` and `ViewEncapsulationComponent`.

The styles added by the `ShadowDomEncapsulationComponent` component are available throughout the shadow DOM of this component, and so to both the `NoEncapsulationComponent` and `ViewEncapsulationComponent`.

The `EmulatedEncapsulationComponent` has specific "scoped" styles, so the styling of this component's template is unaffected.

But since styles from `ShadowDomEncapsulationComponent` are added to the shadow host after the global styles, the `h2` style overrides the style from the `NoEncapsulationComponent`.
The result is that the `<h2>` element in the `NoEncapsulationComponent` is colored blue rather than red, which may not be what the component author intended.

<img src="generated/images/guide/view-encapsulation/shadow-dom-encapsulation.png" alt="component with no encapsulation">

@reviewed 2021-09-17
