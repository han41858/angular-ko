<!--
# View encapsulation
-->
# 뷰 캡슐화

<!--
In Angular, a component's styles can be encapsulated within the component's host element so that they don't affect the rest of the application.

The `Component` decorator provides the [`encapsulation`](api/core/Component#encapsulation) option which can be used to control how the encapsulation is applied on a *per component* basis.

Choose from the following modes:

<!- vale off ->

| Modes                         | Details |
|:---                           |:---     |
| `ViewEncapsulation.ShadowDom` | Angular uses the browser's built-in [Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM) to enclose the component's view inside a ShadowRoot, used as the component's host element, and apply the provided styles in an isolated manner. <div class="alert is-important"> `ViewEncapsulation.ShadowDom` only works on browsers that have built-in support for the shadow DOM \(see [Can I use - Shadow DOM v1](https://caniuse.com/shadowdomv1)\). Not all browsers support it, which is why the `ViewEncapsulation.Emulated` is the recommended and default mode. </div> |
| `ViewEncapsulation.Emulated`  | Angular modifies the component's CSS selectors so that they are only applied to the component's view and do not affect other elements in the application, *emulating* Shadow DOM behavior. For more details, see [Inspecting generated CSS](guide/view-encapsulation#inspect-generated-css).                                                                                                                                                                                                                                                                                                           |
| `ViewEncapsulation.None`      | Angular does not apply any sort of view encapsulation meaning that any styles specified for the component are actually globally applied and can affect any HTML element present within the application. This mode is essentially the same as including the styles into the HTML itself.                                                                                                                                                                                                                                                                                                                   |
-->
Angular에서는 컴포넌트에 적용된 CSS 스타일이 컴포넌트 뷰를 대상으로 캡슐화되기 때문에 애플리케이션에 있는 다른 컴포넌트에 영향을 주지 않습니다.

이 캡슐화 정책은 *컴포넌트마다* 다르게 지정할 수 있으며, 정책은 `Component` 데코레이터의 [`encapsulation`](api/core/Component#encapsulation) 옵션을 지정하면 변경할 수 있습니다.

뷰 캡슐화 모드는 이런 것들이 있습니다:

| 모드                            | 설명                                                                                                                                                                                                                                                                                                                                                  |
|:------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ViewEncapsulation.ShadowDom` | 브라우저 기본 [섀도우 DOM](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM)을 활용해서 뷰를 캡슐화 합니다. <div class="alert is-important"> `ShadowDom` 모드는 브라우저가 섀도우 DOM을 지원할 때만 정상 동작합니다. 지원하는 브라우저 목록을 확인하려면 [Can I use 사이트의 Shadow DOM v1](https://caniuse.com/shadowdomv1) 문서를 참고하세요. 섀도우 DOM은 아직 모든 환경에 사용할 수 없기 때문에 `Emulated` 모드가 기본값입니다. </div> |
| `ViewEncapsulation.Emulated`  | 컴포넌트 CSS 셀렉터를 조정해서 섀도우 DOM처럼 캡슐화합니다. 자세한 내용은 [자동생성된 CSS 확인하기](guide/view-encapsulation#inspect-generated-css) 섹션을 참고하세요.                                                                                                                                                                                                                            |
| `ViewEncapsulation.None`      | 뷰 캡슐화를 하지 않습니다. 컴포넌트에 지정한 스타일은 컴포넌트 뿐 아니라 전역 범위에 적용됩니다. 컴포넌트는 캡슐화되지 않으며, HTML 문서에 직접 컴포넌트 스타일을 지정한 것과 같은 효과를 냅니다.                                                                                                                                                                                                                                   |


<a id="inspect-generated-css"></a>

<!--
## Inspecting generated CSS
-->
## 자동생성된 CSS 확인하기

<!- vale on ->

<!--
When using the emulated view encapsulation, Angular pre-processes all the component's styles so that they are only applied to the component's view.

In the DOM of a running Angular application, elements belonging to components using emulated view encapsulation have some extra attributes attached to them:

<code-example language="html">

&lt;hero-details _nghost-pmm-5&gt;
  &lt;h2 _ngcontent-pmm-5&gt;Mister Fantastic&lt;/h2&gt;
  &lt;hero-team &lowbar;ngcontent-pmm-5 &lowbar;nghost-pmm-6&gt;
    &lt;h3 _ngcontent-pmm-6&gt;Team&lt;/h3&gt;
  &lt;/hero-team&gt;
&lt;/hero-details&gt;

</code-example>

Two kinds of these attributes exist:

| Attributes   | Details |
|:---          |:---     |
| `_nghost`    | Are added to elements that enclose a component's view and that would be ShadowRoots in a native Shadow DOM encapsulation. This is typically the case for components' host elements.          |
| `_ngcontent` | Are added to child element within a component's view, those are used to match the elements with their respective emulated ShadowRoots \(host elements with a matching `_nghost` attribute\). |

The exact values of these attributes are a private implementation detail of Angular.
They are automatically created and you should never refer to them in application code.

They are targeted by the created component styles, which are injected in the `<head>` section of the DOM:

<code-example format="css" language="css">

[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}
h3[_ngcontent-pmm-6] {
  background-color: white;
  border: 1px solid #777;
}

</code-example>

These styles are post-processed so that each CSS selector is augmented with the appropriate `_nghost` or `_ngcontent` attribute.
These modified selectors make sure the styles to be applied to components' views in an isolated and targeted fashion.
-->
뷰 캡슐화 정책을 `Emulated` 모드로 지정하면 Angular는 모든 컴포넌트 스타일을 전처리해서 표준 섀도우 CSS 규칙과 비슷하게 변환합니다.

그래서 Angular 애플리케이션을 실행한 후에 DOM을 확인해보면 각 DOM 엘리먼트에 어트리뷰트가 조금씩 더 붙어있는 것을 볼 수 있습니다:

<code-example language="html">

&lt;hero-details _nghost-pmm-5&gt;
  &lt;h2 _ngcontent-pmm-5&gt;Mister Fantastic&lt;/h2&gt;
  &lt;hero-team &lowbar;ngcontent-pmm-5 &lowbar;nghost-pmm-6&gt;
    &lt;h3 _ngcontent-pmm-6&gt;Team&lt;/h3&gt;
  &lt;/hero-team&gt;
&lt;/hero-details&gt;

</code-example>

이렇게 생성되는 어트리뷰트는 두 종류로 구분할 수 있습니다:

| 어트리뷰트        | 설명                                                                |
|:-------------|:------------------------------------------------------------------|
| `_nghost`    | 섀도우 DOM의 호스트가 되는 엘리먼트에 붙습니다. 일반적으로 Angular 컴포넌트의 호스트 엘리먼트에 해당됩니다. |
| `_ngcontent` | 컴포넌트 뷰 안에 있는 자식 엘리먼트에 추가되며, 섀도우 DOM의 동작을 흉내내기 위해 붙습니다.            |

어트리뷰트가 정확히 어떤 이름인지는 중요하지 않습니다.
이 어트리뷰트는 Angular가 자동으로 생성하는 것이지 애플리케이션 안에서 참조하는 값이 아닙니다.

만약 이미 생성된 컴포넌트 스타일을 대상으로 스타일을 지정해야 한다면 `<head>` 태그에 이런 코드를 작성할 수도 있습니다:

<code-example format="css" language="css">

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


<!--
## Mixing encapsulation modes
-->
## 캡슐화 모드 섞어서 사용하기

<!--
As mentioned earlier, you specify the encapsulation mode in the Component's decorator on a *per component* basis. This means that within your application you can have different components using different encapsulation strategies.

Although possible, this is not recommended.
If it is really needed, you should be aware of how the styles of components using different encapsulation modes interact with each other:

| Modes                         | Details |
|:---                           |:---     |
| `ViewEncapsulation.Emulated`  | The styles of components are added to the `<head>` of the document, making them available throughout the application, but their selectors only affect elements within their respective components' templates. |
| `ViewEncapsulation.None`      | The styles of components are added to the `<head>` of the document, making them available throughout the application, so are completely global and affect any matching elements within the document.          |
| `ViewEncapsulation.ShadowDom` | The styles of components are only added to the shadow DOM host, ensuring that they only affect elements within their respective components' views.                                                            |

<div class="alert is-helpful">

Styles of `ViewEncapsulation.Emulated` and `ViewEncapsulation.None` components are also added to the shadow DOM host of each `ViewEncapsulation.ShadowDom` component.

This means that styles for components with `ViewEncapsulation.None` affect matching elements within the shadow DOM.

This approach may seem counter-intuitive at first. But without it a component with `ViewEncapsulation.None` would be rendered differently within a component using `ViewEncapsulation.ShadowDom`, since its styles would not be available.

</div>
-->
위에서 언급했듯이, 뷰 캡슐화 모드는 컴포넌트 데코레이터에 지정하기 때문에 *컴포넌트마다* 설정할 수 있습니다.
그래서 한 애플리케이션 안에서도 컴포넌트마다 서로 다른 캡슐화 정책을 사용할 수 있습니다.

하지만 컴포넌트마다 캡슐화 정책을 다르게 사용하는 것은 권장하지 않습니다.
컴포넌트 스타일이 서로 영향을 받아 반드시 캡슐화 정책을 지정해야 할 때만 따로 지정하세요.

| 모드                            | 설명                                                                         |
|:------------------------------|:---------------------------------------------------------------------------|
| `ViewEncapsulation.Emulated`  | 컴포넌트 스타일은 `<head>`에 추가되며, 애플리케이션 전역에 적용되지만, 셀렉터를 활용해서 해당 컴포넌트 템플릿에만 적용됩니다. |
| `ViewEncapsulation.None`      | 컴포넌트 스타일은 `<head>`에 추가되며, 애플리케이션 전역에 적용되고, 모든 컴포넌트에 적용됩니다.                 |
| `ViewEncapsulation.ShadowDom` | 컴포넌트 스타일은 Shadow DOM 호스트에 추가되며, 해당 컴포넌트에만 적용됩니다.                           |

<div class="alert is-helpful">

`ViewEncapsulation.Emulated`, `ViewEncapsulation.None`가 적용된 컴포넌트의 스타일은 `ViewEncapsulation.ShadowDom`이 적용된 Shadow DOM 호스트에도 모두 추가됩니다.

이 말은 `ViewEncapsulation.None`이 지정된 컴포넌트 스타일은 Shadow DOM에도 적용된다는 것을 의미합니다.

이 정책이 혼란스러울 수 있지만, 이렇게 적용되지 않으면 `ViewEncapsulation.None` 스타일은 `ViewEncapsulation.ShadowDom`이 적용된 컴포넌트에 적용되지 않습니다.

</div>


<!--
### Examples
-->
### 예제

<!--
This section shows examples of how the styling of components with different `ViewEncapsulation` interact.

See the <live-example noDownload></live-example> to try out these components yourself.
-->
이 섹션에서는 `ViewEncapsulation`에 따라 컴포넌트 스타일이 어떻게 적용되는지 알아봅시다.

<live-example noDownload></live-example>에서 확인할 수도 있습니다.


<!--
#### No encapsulation
-->
#### 캡슐화 적용하지 않기

<!--
The first example shows a component that has `ViewEncapsulation.None`.
This component colors its template elements red.

<code-example header="src/app/no-encapsulation.component.ts" path="view-encapsulation/src/app/no-encapsulation.component.ts"></code-example>

Angular adds the styles for this component as global styles to the `<head>` of the document.

As already mentioned, Angular also adds the styles to all shadow DOM hosts, making the styles available throughout the whole application.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/no-encapsulation.png">

</div>
-->
첫번째 예제는 `ViewEncapsulation.None`입니다.
이 컴포넌트에서는 템플릿 엘리먼트를 빨간색으로 지정합니다.

<code-example header="src/app/no-encapsulation.component.ts" path="view-encapsulation/src/app/no-encapsulation.component.ts"></code-example>

Angular는 이 컴포넌트의 스타일을 글로벌 `<head>`에 추가합니다.

그래서 이전에 언급한 것처럼 모든 Shadow DOM 호스트에도 이 스타일이 적용됩니다.
결국 이 스타일은 애플리케이션 전역에 적용된다고 볼 수 있습니다.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/no-encapsulation.png">

</div>


<!--
#### Emulated encapsulation
-->
#### 캡슐화 흉내내기

<!--
The second example shows a component that has `ViewEncapsulation.Emulated`.
This component colors its template elements green.

<code-example header="src/app/emulated-encapsulation.component.ts" path="view-encapsulation/src/app/emulated-encapsulation.component.ts"></code-example>

Comparable to `ViewEncapsulation.None`, Angular adds the styles for this component to the `<head>` of the document, but with "scoped" styles.

Only the elements directly within this component's template are going to match its styles.
Since the "scoped" styles from the `EmulatedEncapsulationComponent` are specific, they override the global styles from the `NoEncapsulationComponent`.

In this example, the `EmulatedEncapsulationComponent` contains a `NoEncapsulationComponent`, but `NoEncapsulationComponent` is still styled as expected since the `EmulatedEncapsulationComponent` 's "scoped" styles do not match elements in its template.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/emulated-encapsulation.png">

</div>
-->
두번째 예제는 `ViewEncapsulation.Emulated`입니다.
이 컴포넌트에서는 템플릿 엘리먼트의 색상을 녹색으로 지정합니다.

<code-example header="src/app/emulated-encapsulation.component.ts" path="view-encapsulation/src/app/emulated-encapsulation.component.ts"></code-example>

`ViewEncapsulation.None`과 비슷하게 Angular는 이 스타일을 `<head>`에 추가하기 때문에 스타일은 전역에 적용됩니다.

그렇지만 Angular가 셀렉터를 조작하기 때문에 이 스타일은 해당 컴포넌트 템플릿에만 적용됩니다.
그래서 `NoEncapsulationComponent`에 적용된 스타일보다 `EmulatedEncapsulationComponent` 스타일이 더 구체적으로 지정되었기 때문에 `EmulatedEncapsulationComponent` 스타일이 적용됩니다.

`EmulatedEncapsulationComponent`에 해당되지 않는 템플릿은 `NoEncapsulationComponent`의 스타일이 적용됩니다.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/emulated-encapsulation.png">

</div>


<!--
#### Shadow DOM encapsulation
-->
#### Shaadow DOM 캡슐화

<!--
The third example shows a component that has `ViewEncapsulation.ShadowDom`.
This component colors its template elements blue.

<code-example header="src/app/shadow-dom-encapsulation.component.ts" path="view-encapsulation/src/app/shadow-dom-encapsulation.component.ts"></code-example>

Angular adds styles for this component only to the shadow DOM host, so they are not visible outside the shadow DOM.

<div class="alert is-helpful">

**NOTE**: <br />
Angular also adds the global styles from the `NoEncapsulationComponent` and `EmulatedEncapsulationComponent` to the shadow DOM host. Those styles are still available to the elements in the template of this component.

</div>

In this example, the `ShadowDomEncapsulationComponent` contains both a `NoEncapsulationComponent` and `EmulatedEncapsulationComponent`.

The styles added by the `ShadowDomEncapsulationComponent` component are available throughout the shadow DOM of this component, and so to both the `NoEncapsulationComponent` and `EmulatedEncapsulationComponent`.

The `EmulatedEncapsulationComponent` has specific "scoped" styles, so the styling of this component's template is unaffected.

Since styles from `ShadowDomEncapsulationComponent` are added to the shadow host after the global styles, the `h2` style overrides the style from the `NoEncapsulationComponent`.
The result is that the `<h2>` element in the `NoEncapsulationComponent` is colored blue rather than red, which may not be what the component's author intended.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/shadow-dom-encapsulation.png">

</div>
-->
세번째 예제는 `ViewEncapsulation.ShadowDom`입니다.
이 컴포넌트에서는 템플릿 엘리먼트의 색상을 파란색으로 지정합니다.

<code-example header="src/app/shadow-dom-encapsulation.component.ts" path="view-encapsulation/src/app/shadow-dom-encapsulation.component.ts"></code-example>

Angular는 이 컴포넌트의 스타일을 Shadow DOM 호스트에만 추가하기 때문에 Shadow DOM 외부에는 적용되지 않습니다.

<div class="alert is-helpful">

**참고**: <br />
Angular는 `NoEncapsulationComponent` 스타일과 `EmulatedEncapsulationComponent` 스타일도 Shadow DOM 호스트에 추가합니다.
그래서 이 스타일도 컴포넌트 내부에 적용됩니다.

</div>

이 예제에서 `ShadowDomEncapsulationComponent` 안에는 `NoEncapsulationComponent`와 `EmulatedEncapsulationComponent`가 존재합니다.

그래서 이 컴포넌트 안에서는 `ShadowDomEncapsulationComponent`, `NoEncapsulationComponent`, `EmulatedEncapsulationComponent` 스타일이 모두 적용됩니다.

이 중 `EmulatedEncapsulationComponent`에는 자체 스타일이 적용되기 때문에 영향을 받지 않습니다.

하지만 `ShadowDomEncapsulationComponent`의 스타일은 전역 스타일이 적용된 후에 Shadow DOM 호스트에 추가되기 때문에, `NoEncapsulationComponent`의 `h2` 엘리먼트 스타일은 오버라이드됩니다.
그래서 `NoEncapsulationComponent`의 `<h2>` 엘리먼트 색상은 빨간색이 아니라 파란색이 적용됩니다.

<div class="lightbox">

<img alt="component with no encapsulation" src="generated/images/guide/view-encapsulation/shadow-dom-encapsulation.png">

</div>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
