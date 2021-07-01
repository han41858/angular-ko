<!--
# Content projection
-->
# 컨텐츠 프로젝션(Content projection)

<!--
This topic describes how to use content projection to create flexible, reusable components.

<div class="alert is-helpful">

To view or download the example code used in this topic, see the <live-example></live-example>.

</div>

Content projection is a pattern in which you insert, or *project*, the content you want to use inside another component. For example, you could have a `Card` component that accepts content provided by another component.

The following sections describe common implementations of content projection in Angular, including:

* [Single-slot content projection](#single-slot). With this type of content projection, a component accepts content from a single source.
* [Multi-slot content projection](#multi-slot). In this scenario, a component accepts content from multiple sources.
* [Conditional content projection](#conditional). Components that use conditional content projection render content only when specific conditions are met.
-->
이 문서는 컨텐츠 프로젝션을 활용해서 컴포넌트를 유연하게 만들고 재사용할 수 있게 만드는 방법을 설명합니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 애플리케이션은 <live-example></live-example>에서 직접 실행하거나 다운받아 실행할 수 있습니다.

</div>

컨텐츠 프로젝션은 어떤 내용을 다른 컴포넌트 안으로 넣는(*project*) 개발 패턴입니다.
이 패턴을 활용하면 어떤 컴포넌트가 전달하는 컨텐츠를 `Card` 컴포넌트가 받아서 표시할 수 있습니다.

Angular가 제공하는 다양한 컨텐츠 프로젝션 구현 방법을 알아봅시다:

* [단일 슬롯 컨텐츠 프로젝션](#single-slot) &mdash; 컴포넌트 외부에서 컨텐츠를 하나만 받습니다.

* [다중 슬롯 컨텐츠 프로젝션](#multi-slot) &mdash; 컴포넌트 외부에서 컨텐츠를 여러 개 받습니다.

* [조건별 컨텐츠 프로젝션](#conditional) &mdash; 특정 조건에 맞는 컨텐츠만 프로젝션해서 렌더링합니다.


{@a single-slot }
<!--
## Single-slot content projection
-->
## 단일 슬롯 컨텐츠 프로젝션

<!--
The most basic form of content projection is *single-slot content projection*. Single-slot content projection refers to creating a component into which you can project one component.

To create a component that uses single-slot content projection:

1. [Create](guide/component-overview) a component.

1. In the template for your component, add an `ng-content` element where you want the projected content to appear.

For example, the following component uses an `ng-content` element to display a message.

<code-example path="content-projection/src/app/zippy-basic/zippy-basic.component.ts" header="content-projection/src/app/zippy-basic/zippy-basic.component.ts"></code-example>

With the `ng-content` element in place, users of this component can now project their own message into the component. For example:

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="single-slot"></code-example>

<div class="alert is-helpful">

The `ng-content` element is a placeholder that does not create a real DOM element. Custom attributes applied to `ng-content` are ignored.

</div>
-->
가장 간단한 방법은 *단일 슬롯 컨텐츠 프로젝션* 입니다.
단일 슬롯 컨텐츠 프로젝션은 컴포넌트 외부에서 컨텐츠를 하나만 받아 렌더링하는 방식입니다.

이렇게 구현합니다:

1. 컴포넌트를 [생성](guide/component-overview)합니다.

1. 컴포넌트 템플릿에 `ng-content` 엘리먼트를 추가합니다. 외부에서 받아온 컨텐츠는 이 엘리먼트 안에 렌더링됩니다.

`ng-content` 엘리먼트 안에 컴포넌트 밖에서 받아온 메시지를 표시한다면 이렇게 구현하면 됩니다.

<code-example path="content-projection/src/app/zippy-basic/zippy-basic.component.ts" header="content-projection/src/app/zippy-basic/zippy-basic.component.ts"></code-example>

`ng-content` 엘리먼트를 추가하고 나면 이 컴포넌트를 사용하면서 컴포넌트 안으로 전달할 메시지를 지정하면 됩니다.
이렇게 구현합니다:

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="single-slot"></code-example>

<div class="alert is-helpful">

`ng-content` 엘리먼트는 컨텐츠가 표시될 위치만 지정하는 엘리먼트이며, DOM 트리에 실제로 생성되는 DOM 엘리먼트는 아닙니다.
`ng-content`에 사용된 커스텀 어트리뷰트는 무시됩니다.

</div>


{@a multi-slot}
<!--
## Multi-slot content projection
-->
## 다중 슬롯 컨텐츠 프로젝션

<!--
A component can have multiple slots. Each slot can specify a CSS selector that determines which content goes into that slot. This pattern is referred to as *multi-slot content projection*. With this pattern, you must specify where you want the projected content to appear. You accomplish this task by using the `select` attribute of `ng-content`.

To create a component that uses multi-slot content projection:

1. [Create](guide/component-overview) a component.

1. In the template for your component, add an `ng-content` element where you want the projected content to appear.

1. Add a `select` attribute to the `ng-content` elements. Angular supports [selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) for any combination of tag name, attribute, CSS class, and the `:not` pseudo-class.

 For example, the following component uses two  `ng-content` elements.

 <code-example path="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts" header="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts"></code-example>

Content that uses the `question` attribute is projected into the `ng-content` element with the `select=[question]` attribute.

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

<div class="callout is-helpful">

<header>ng-content without a select attribute</header>

If your component includes an `ng-content` element without a `select` attribute, that instance receives all projected components that do not match any of the other `ng-content` elements.

In the preceding example, only the second `ng-content` element defines a `select` attribute. As a result, the first `ng-content` element receives any other content projected into the component.

</div>
-->
컴포넌트에는 슬롯을 여러 개 둘 수도 있습니다.
개별 슬롯에 CSS 셀렉터를 지정하면 이 셀렉터를 사용해서 컨텐츠가 들어갈 슬롯을 결정할 수 있습니다.
이런 방식을 *다중 슬롯 컨텐츠 프로젝션* 이라고 합니다.
이 방식을 사용하려면 `ng-content`에 `select` 어트리뷰트를 지정해서 컨텐츠가 들어갈 위치를 정확하게 지정해야 합니다.

이렇게 구현합니다:

1. 컴포넌트를 [생성](guide/component-overview)합니다.

1. 컴포넌트 템플릿에 `ng-content` 엘리먼트를 추가합니다. 외부에서 받아온 컨텐츠는 이 엘리먼트 안에 렌더링됩니다.

1. `ng-content` 엘리먼트에 `select` 어트리뷰트를 추가합니다. Angular는 태그 이름, 어트리뷰트, CSS 클래스, `:not`과 같은 가상 클래스, 그리고 이들의 조합을 모두 [셀렉터](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)로 지원합니다.

 아래 컴포넌트에는 `ng-content` 엘리먼트가 2개 존재합니다.

 <code-example path="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts" header="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts"></code-example>

그러면 `question` 어트리뷰트가 지정된 컨텐츠가 렌더링되는 `ng-content` 엘리먼트는 `select=[question]` 어트리뷰트가 지정된 엘리먼트가 됩니다.

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

<div class="callout is-helpful">

<header>ng-content에 select가 지정되지 않으면</header>

컴포넌트에 `select`가 지정되지 않은 `ng-content` 엘리먼트가 존재하면, 이 엘리먼트에는 렌더링 될 `ng-content` 엘리먼트가 지정되지 않은 모든 컨텐츠가 프로젝션됩니다.

이 예제에서는 두 번째 `ng-content` 엘리먼트에만 `select` 어트리뷰트가 선언되었기 때문에, 첫 번째 `ng-content` 엘리먼트에는 렌더링될 위치가 지정되지 않은 컨텐츠가 모두 프로젝션됩니다.

</div>


{@a conditional }

<!--
## Conditional content projection
-->
## 조건별 컨텐츠 프로젝션

<!--
If your component needs to _conditionally_ render content, or render content multiple times, you should configure that component to accept an `ng-template` element that contains the content you want to conditionally render.

Using an `ng-content` element in these cases is not recommended, because when the consumer of a component supplies the content, that content is _always_ initialized, even if the component does not define an `ng-content` element or if that `ng-content` element is inside of an `ngIf` statement.

With an `ng-template` element, you can have your component explicitly render content based on any condition you want, as many times as you want. Angular will not initialize the content of an `ng-template` element until that element is explicitly rendered.

The following steps demonstrate a typical implementation of conditional content projection using `ng-template`.

1. [Create](guide/component-overview) a component.

1. In the component that accepts an `ng-template` element, use an `ng-container` element to render that template, such as:

   <code-example path="content-projection/src/app/example-zippy.template.html" header="content-projection/src/app/example-zippy.template.html" region="ng-container">
   </code-example>

   This example uses the `ngTemplateOutlet` directive to render a given `ng-template` element, which you will define in a later step. You can apply an `ngTemplateOutlet` directive to any type of element. This example assigns the directive to an `ng-container` element because the component does not need to render a real DOM element.

1. Wrap the `ng-container` element in another element, such as a `div` element, and apply your conditional logic.

      <code-example path="content-projection/src/app/example-zippy.template.html"  header="content-projection/src/app/example-zippy.template.html" region="ngif">
      </code-example>

1. In the template where you want to project content, wrap the projected content in an `ng-template` element, such as:

      <code-example path="content-projection/src/app/app.component.html" region="ng-template">
      </code-example>

   The `ng-template` element defines a block of content that a component can render based on its own logic. A component can get a reference to this template content, or [`TemplateRef`](/api/core/TemplateRef), by using either the [`@ContentChild`](/api/core/ContentChild) or [`@ContentChildren`](/api/core/ContentChildren) decorators. The preceding example creates a custom directive, `appExampleZippyContent`, as an API to mark the `ng-template` for the component's content. With the `TemplateRef`, the component can render the referenced content by using either the [`ngTemplateOutlet`](/api/common/NgTemplateOutlet) directive, or with [`ViewContainerRef.createEmbeddedView`](/api/core/ViewContainerRef#createembeddedview).

1. Create a directive with a selector that matches the custom attribute for your template. In this directive, inject a TemplateRef instance.

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="zippycontentdirective">
   </code-example>

   In the previous step, you added an `ng-template` element with a custom attribute, `appExampleZippyDirective`. This code provides the logic that Angular will use when it encounters that custom attribute. In this case, that logic instructs Angular to instantiate a template reference.

1. In the component you want to project content into, use `@ContentChild` to get the template of the projected content.

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="contentchild">
   </code-example>

   Prior to this step, your application has a component that instantiates a template when certain conditions are met. You've also created a directive that provides a reference to that template. In this last step, the `@ContentChild` decorator instructs Angular to instantiate the template in the designated component.

   <div class="alert is-helpful">

   In the case of multi-slot content projection, you can use `@ContentChildren` to get a QueryList of projected elements.

   </div>
-->
컴포넌트가 _조건에 따라_ 컨텐츠를 렌더링해야 하거나 한 컨텐츠를 여러번 렌더링해야 한다면 컴포넌트에 `ng-template` 엘리먼트를 사용해서 렌더링 조건을 지정할 수 있습니다.

컨텐츠 프로젝션을 이런 용도로 사용하는 경우에는 `ng-content`를 권장하지 않습니다.
왜냐하면 컨텐츠를 받아서 표시하는 컴포넌트 입장에서는 이 컨텐츠가 _반드시_ 초기화가 끝난 상태여야 하는데, 이런 제약은 `ng-content`에 `*ngIf`가 적용되었거나 `*ngIf` 구문 안쪽으로 `ng-content` 엘리먼트가 있는 경우에도 해당되기 때문입니다.

`ng-template` 엘리먼트를 사용하면 자유로운 조건으로 렌더링될 컨텐츠를 지정할 수 있으며, 한 컨텐츠를 여러 번 렌더링 할 수도 있습니다.
`ng-template` 안에 있는 컨텐츠는 실제로 렌더링되는 시점에 Angular가 초기화합니다.

이렇게 구현합니다:

1. 컴포넌트를 [생성](guide/component-overview)합니다.

1. 컴포넌트 템플릿에 `ng-container` 엘리먼트를 추가합니다. 이 엘리먼트에는 `ng-template` 엘리먼트의 내용이 표시됩니다:

   <code-example path="content-projection/src/app/example-zippy.template.html" header="content-projection/src/app/example-zippy.template.html" region="ng-container">
   </code-example>

   이 예제에서는 조건에 맞는 `ng-template` 엘리먼트를 선택하기 위해 `ngTemplateOutlet` 디렉티브를 사용했습니다.
   `ngTemplateOutlet` 디렉티브는 모든 엘리먼트에 사용할 수 있습니다.
   이 예제에서는 실제 DOM 엘리먼트에 렌더링되지 않는 `ng-container` 엘리먼트에 사용했습니다.

1. `ng-container` 엘리먼트를 `div`와 같은 엘리먼트로 감싸고, 이 엘리먼트에 조건을 지정합니다.

      <code-example path="content-projection/src/app/example-zippy.template.html"  header="content-projection/src/app/example-zippy.template.html" region="ngif">
      </code-example>

1. 이제 프로젝션될 컨텐츠는 `ng-template` 안에 이렇게 구성하면 됩니다:

      <code-example path="content-projection/src/app/app.component.html" region="ng-template">
      </code-example>

   `ng-template` 엘리먼트 안에는 컴포넌트가 받아서 렌더링할 컨텐츠를 추가했습니다.
   컴포넌트는 [`TemplateRef`](/api/core/TemplateRef)나 [`@ContentChild`](/api/core/ContentChild), [`@ContentChildren`](/api/core/ContentChildren) 데코레이터를 사용해서 이 템플릿 컨텐츠를 참조할 수 있습니다.
   이 예제에서는 템플릿을 참조하기 위해 `appExampleZippyContent`라는 커스텀 디렉티브를 사용했습니다.
   이렇게 `ng-template`을 컴포넌트 클래스에서 `TemplateRef` 타입으로 참조하면 [`ngTemplateOutlet`](/api/common/NgTemplateOutlet) 디렉티브나 [`ViewContainerRef.createEmbeddedView`](/api/core/ViewContainerRef#createembeddedview)를 사용해서 컨텐츠를 렌더링할 수 있습니다.

1. 템플릿에 사용할 커스텀 디렉티브를 생성합니다. 이 디렉티브에는 `TemplateRef` 인스턴스를 의존성으로 주입합니다.

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="zippycontentdirective">
   </code-example>

   이전 단계에서 `ng-template` 엘리먼트에 커스텀 디렉티브 `appExampleZippyDirective`를 지정했습니다.
   이 디렉티브 코드는 Angular가 커스텀 어트리뷰트로 템플릿을 참조하기 위해 정의한 것입니다.

1. 컨텐츠가 렌더링될 컴포넌트에서 `@ContentChild`를 사용해서 프로젝션될 컨텐츠 템플릿을 참조합니다.

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="contentchild">
   </code-example>

   여기까지 진행하고 나면 컴포넌트는 특정 조건을 만족하는 템플릿만 인스턴스를 생성합니다.
   그리고 대상이 되는 템플릿은 커스텀 디렉티브를 지정해 두고 `@ComponentChild` 데코레이터를 사용해서 컴포넌트 클래스에 할당했습니다.

   <div class="alert is-helpful">

   다중 슬롯 컨텐츠 프로젝션을 활용하는 경우에 `@ContentChildren`는 프로젝션된 엘리먼트를 모은 QueryList를 반환합니다.

   </div>


{@a ngprojectas }
<!--
## Projecting content in more complex environments
-->
## 더 복잡한 조건에서 컨텐츠 프로젝션하기

<!--
As described in [Multi-slot Content Projection](#multi-slot), you typically use either an attribute, element, CSS Class, or some combination of all three to identify where to project your content. For example, in the following HTML template, a paragraph tag uses a custom attribute, `question`, to project content into the `app-zippy-multislot` component.

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

In some cases, you might want to project content as a different element. For example, the content you want to project might be a child of another
element. You can accomplish this by using the `ngProjectAs` attribute.

For instance, consider the following HTML snippet:

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html" region="ngprojectas">
</code-example>

This example uses an `ng-container` attribute to simulate projecting a component into a more complex structure.

<div class="callout is-helpful">

<header>Reminder!</header>

The `ng-container` element is a logical construct that you can use to group other DOM elements; however, the `ng-container` itself is not rendered in the DOM tree.

</div>

In this example, the content we want to project resides inside another element. To project this content as intended, the template uses the `ngProjectAs` attribute. With `ngProjectAs`, the entire `ng-container` element is projected into a component using the `question` selector.
-->
[다중 슬롯 컨텐츠 프로젝션](#multi-slot)에서 언급했던 것처럼 컨텐츠가 프로젝션 될 곳을 지정할 때는 어트리뷰트나 엘리먼트, CSS 클래스, 그리고 이것들을 조합한 방법을 사용할 수 있습니다.
아래 예제에서 커스텀 어트리뷰트 `question`가 지정된 `<p>` 태그가 `app-zippy-multislot` 컴포넌트 안으로 프로젝션된다고 합시다.

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

그런데 이 컨텐츠를 엘리먼트 안에 자식 엘리먼트로 렌더링해야 하는 경우가 있습니다.
이런 경우에는 `ngProjectAs` 어트리뷰트를 사용하면 됩니다.

HTML이 이렇게 구성되었다고 합시다:

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html" region="ngprojectas">
</code-example>

이 예제에서는 DOM에 실제로 렌더링되지 않는 `ng-container` 어트리뷰트를 사용했습니다.

<div class="callout is-helpful">

<header>기억하세요!</header>

`ng-container` 엘리먼트는 DOM 엘리먼트를 그룹으로 묶을 때 사용하는 논리 엘리먼트입니다.
DOM 트리에는 실제로 렌더링되지 않습니다.

</div>

이렇게 구성하면 `ng-container` 안에 있는 컨텐츠가 컴포넌트 안에 있는 엘리먼트 안으로 프로젝션 됩니다.
`ngProjectAs` 어트리뷰트는 이 동작을 하기 위해 지정되었습니다.
`ngProjectAs` 어트리뷰트를 지정하면 `ng-container` 엘리먼트의 전체 내용이 `question` 셀렉터를 지정한 위치로 프로젝션 됩니다.
