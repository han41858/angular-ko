<!--
# Getting started with Angular
-->
# Angular 시작하기

<!--
Welcome to Angular!

This tutorial introduces you to the essentials of Angular by walking you through building an e-commerce site with a catalog, shopping cart, and check-out form.

To help you get started right away, this tutorial uses a ready-made application that you can examine and modify interactively on [StackBlitz](https://stackblitz.com/)&mdash;without having to [set up a local work environment](guide/setup-local "Setup guide").
StackBlitz is a browser-based development environment where you can create, save, and share projects using a variety of technologies.
-->
Angular의 세계에 오신 것을 환영합니다!

이 튜토리얼은 Angular의 기본 개념을 다룹니다.
온라인 쇼핑 앱에 필요한 상품 목록, 장바구니, 주문 폼을 단계별로 만들어 봅시다.

Angular를 빠르게 사용해보기 위해 이 튜토리얼은 [로컬 환경설정](guide/setup-local "Setup guide")을 생략하고 [StackBlitz](https://stackblitz.com/)에서 직접 진행합니다.
StackBlitz는 브라우저 기반의 개발 환경이기 때문에 웹 브라우저에서 바로 애플리케이션을 생성하고 저장할 수 있으며, 자유롭게 공유할 수 있습니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
To get the most out of this tutorial you should already have a basic understanding of the following.

* [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "Learning HTML: Guides and tutorials")
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript")
* [TypeScript](https://www.typescriptlang.org/ "The TypeScript language")
-->
이 튜토리얼에서 설명하는 내용을 제대로 이해하려면 이런 내용들에 대해 미리 알고 있는 것이 좋습니다.

* [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "Learning HTML: Guides and tutorials")
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript")
* [TypeScript](https://www.typescriptlang.org/ "The TypeScript language")


{@a components}
<!--
## Take a tour of the example application
-->
## 예제 애플리케이션 살펴보기

<!--
You build Angular applications with components.
Components define areas of responsibility in the UI that let you reuse sets of UI functionality.

A component consists of three things:

* **A component class** that handles data and functionality.
* **An HTML template** that determines the UI.
* **Component-specific styles** that define the look and feel.

This guide demonstrates building an application with the following components.

* `<app-root>`&mdash;the first component to load and the container for the other components.
* `<app-top-bar>`&mdash;the store name and checkout button.
* `<app-product-list>`&mdash;the product list.
* `<app-product-alerts>`&mdash;a component that contains the application's alerts.

<div class="lightbox">
  <img src="generated/images/guide/start/app-components.png" alt="Online store with three components">
</div>

For more information about components, see [Introduction to Components](guide/architecture-components "Introduction to Components and Templates").
-->
Angular 애플리케이션은 컴포넌트(component) 단위로 구성합니다.
컴포넌트는 화면에서 특정 영역을 담당하며 동작을 처리하는 단위입니다.

컴포넌트는 3가지로 구성됩니다:

* **컴포넌트 클래스** 는 데이터를 관리하고 동작을 처리합니다.
* **HTML 템플릿** 은 화면을 구성합니다.
* **컴포넌트용 스타일** 은 화면이 어떤 모습으로 표시될 지 지정합니다.

이 가이드 문서에서 다루는 애플리케이션을 구성하는 컴포넌트는 이런 것들이 있습니다.

* `<app-root>`&mdash;다른 컴포넌트를 띄울 수 있도록 제일 먼저 로딩되는 컴포넌트입니다.
* `<app-top-bar>`&mdash;온라인 샵의 이름과 주문 버튼을 표시합니다.
* `<app-product-list>`&mdash;상품 목록을 표시합니다.
* `<app-product-alerts>`&mdash;알림을 표시하는 컴포넌트입니다.

<div class="lightbox">
  <img src="generated/images/guide/start/app-components.png" alt="Online store with three components">
</div>

컴포넌트에 대해 자세하게 알아보려면 [컴포넌트 소개](guide/architecture-components "Introduction to Components and Templates") 문서를 참고하세요.


{@a new-project}
<!--
## Create the sample project
-->
## 예제 프로젝트 생성하기

<!--
To create the sample project, generate the <live-example name="getting-started-v0" noDownload>ready-made sample project in StackBlitz</live-example>.
To save your work:

1. Log into StackBlitz.
1. Fork the project you generated.
1. Save periodically.

In StackBlitz, the preview pane on the right shows the starting state of the example application.
The preview features two areas:

* a top bar with the store name, *My Store*, and a checkout button
* a header for a product list, *Products*

<div class="lightbox">
  <img src="generated/images/guide/start/new-app-all.gif" alt="Starter online store application">
</div>

The project section on the left shows the source files that make up the application, including the infrastructure and configuration files.

When you generate the StackBlitz example applications that accompany the tutorials, StackBlitz creates the starter files and mock data for you.
The files you use throughout the tutorial are in the `src` folder.

For more information on how to use StackBlitz, see the [StackBlitz documentation](https://developer.stackblitz.com/docs/platform/).
-->
예제 프로젝트를 생성하려면 <live-example name="getting-started-v0" noDownload>StackBlitz에 이미 만들어져 있는 프로젝트</live-example>에 접속하세요.
그리고 이렇게 진행하면 됩니다:

1. StackBlitz에 로그인합니다.
1. 프로젝트를 포크합니다.
1. 주기적으로 저장합니다.

StackBlitz에서 오른쪽 패널을 보면 예제 애플리케이션이 어떻게 실행되는지 확인할 수 있습니다.
이 애플리케이션은 두 영역으로 구분할 수 있습니다.

* 최상단에 온라인 샵 이름이 *My Store* 라고 표시되며 주문 버튼이 표시됩니다.
* 상품 목록의 헤더에 해당하는 *Products* 가 표시됩니다.

<div class="lightbox">
  <img src="generated/images/guide/start/new-app-all.gif" alt="Starter online store application">
</div>

그리고 왼쪽 프로젝트 섹션을 보면 이 애플리케이션을 구성하는 소스 파일들을 확인할 수 있습니다.
개발환경 설정파일과 애플리케이션 환경설정 파일도 확인할 수 있습니다.

StackBlitz 예제 애플리케이션을 생성하고 나면 StackBlitz 프로젝트에 기본 파일들과 목 데이터가 있는 것도 확인할 수 있습니다.
이 튜토리얼을 진행하면서 작업할 파일들은 `src` 폴더 안에 있습니다.

StackBlitz에 대해 자세하게 알아보려면 [StackBlitz 문서](https://developer.stackblitz.com/docs/platform/)를 참고하세요.


{@a product-list}
<!--
## Create the product list
-->
## 상품 목록 생성하기

<!--
In this section, you'll update the application to display a list of products.
You'll use predefined product data from the `products.ts` file and methods from the `product-list.component.ts` file.
This section guides you through editing the HTML, also known as the template.

1. In the `product-list` folder, open the template file `product-list.component.html`.

1. Add an `*ngFor` structural directive on a `<div>`, as follows.

  <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.2.html" region="ngfor">
  </code-example>

  With `*ngFor`, the `<div>` repeats for each product in the list.

  Structural directives shape or reshape the DOM's structure, by adding, removing, and manipulating elements.
  For more information about structural directives, see [Structural directives](guide/structural-directives).

1. Inside the `<div>`, add an `<h3>` and `{{ product.name }}`.
  The `{{ product.name }}` statement is an example of Angular's interpolation syntax.
  Interpolation `{{ }}` lets you render the property value as text.

  <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html" region="interpolation">
</code-example>

  The preview pane updates to display the name of each product in the list.

  <div class="lightbox">
    <img src="generated/images/guide/start/template-syntax-product-names.png" alt="Product names added to list">
  </div>

1. To make each product name a link to product details, add the `<a>` element around `{{ product.name }}`.

1. Set the title to be the product's name by using the property binding `[ ]` syntax, as follows:

    <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    In the preview pane, hover over a product name to see the bound name property value, which is the product name plus the word "details".
    Property binding `[ ]` lets you use the property value in a template expression.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-anchor.png" alt="Product name anchor text is product name property">
    </div>

1. Add the product descriptions. On a `<p>` element, use an `*ngIf` directive so that Angular only creates the `<p>` element if the current product has a description.

    <code-example path="getting-started/src/app/product-list/product-list.component.3.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    The application now displays the name and description of each product in the list.
    Notice that the final product does not have a description paragraph.
    Angular doesn't create the `<p>` element because the product's description property is empty.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-description.png" alt="Product descriptions added to list">
    </div>

1. Add a button so users can share a product.
  Bind the button's `click` event to the `share()` method in `product-list.component.ts`. Event binding uses a set of parentheses, `( )`, around the event, as in the `(click)` event on the  `<button>` element.

    <code-example path="getting-started/src/app/product-list/product-list.component.4.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    Each product now has a **Share** button.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-share-button.png" alt="Share button added for each product">
    </div>

    Clicking the **Share** button triggers an alert that states, "The product has been shared!".

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-share-alert.png" alt="Alert box indicating product has been shared">
    </div>

In editing the template, you have explored some of the most popular features of Angular templates.
For more information, see [Introduction to components and templates](guide/architecture-components#template-syntax "Template Syntax").
-->
이번 섹션에서는 애플리케이션에 상품 목록을 표시해 봅시다.
상품 데이터는 `products.ts` 파일에 있으며, `product-list.component.ts` 파일에 있는 메서드를 함께 사용할 것입니다.
먼저 템플릿에 해당하는 HTML 파일을 수정합니다.

1. `product-list` 폴더에 있는 템플릿 파일 `product-list.component.html` 을 엽니다.

1. `<div>` 엘리먼트에 구조 디렉티브 `*ngFor`를 다음과 같이 추가합니다.

  <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.2.html" region="ngfor">
  </code-example>

  `*ngFor`를 사용하면 목록에 있는 개별 상품마다 `<div>` 엘리먼트를 반복할 수 있습니다.

  구조 디렉티브는 엘리먼트를 추가하거나 제거하고, 변형하는 방식으로 DOM 구조를 조작합니다.
  구조 디렉티브에 대해 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives) 문서를 참고하세요.

1. `<div>` 엘리먼트 안에 `<h3>` 엘리먼트를 추가하고 이 엘리먼트의 내용을 `{{ product.name }}`라고 작성합니다.
  `{{ product.name }}`이라는 표현은 Angular가 제공하는 문자열 바인딩(interpolation) 문법입니다.
  문자열 바인딩 문법(`{{ }}`)을 사용하면 프로퍼티 값을 문자열로 렌더링할 수 있습니다.

  <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html" region="interpolation">
</code-example>

  이제 미리보기 패널을 보면 목록에 있는 상품마다 상품의 이름이 표시되는 것을 확인할 수 있습니다.

  <div class="lightbox">
    <img src="generated/images/guide/start/template-syntax-product-names.png" alt="Product names added to list">
  </div>

1. 상품의 이름을 클릭했을 때 상세보기 화면으로 전환하려면 `{{ product.name }}`을 `<a>` 엘리먼트로 감싸면 됩니다.

1. `<a>` 엘리먼트의 제목을 지정하기 위해 프로퍼티 바인딩 문법 `[]`를 추가합니다:

    <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    미리보기 패널에서 상품 이름 위에 마우스를 올려보면 상품의 이름에 "details"라는 문자열이 붙어서 표시되는 것을 확인할 수 있습니다.
    프로퍼티 바인딩 문법(`[ ]`)을 활용하면 프로퍼티 값을 템플릿 표현식으로 활용할 수 있습니다.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-anchor.png" alt="Product name anchor text is product name property">
    </div>

1. 상품 설명을 추가합니다. `<p>` 엘리먼트에 `*ngIf` 디렉티브를 추가하면 상품 설명이 존재할 때 이 상품의 설명을 DOM에 추가할 수 있습니다.

    <code-example path="getting-started/src/app/product-list/product-list.component.3.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    이제 미리보기 패널을 보면 목록에 있는 상품마다 상품 이름이 표시되며, 상품 설명이 존재하면 이 설명도 화면에 표시되는 것을 확인할 수 있습니다.
    마지막 상품은 상품 설명이 없기 때문에 설명이 표시되지 않는 것도 확인해 보세요.
    상품의 설명에 해당하는 프로퍼티가 존재하지 않으면 Angular는 해당 `<p>` 엘리먼트를 생성하지 않습니다.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-description.png" alt="Product descriptions added to list">
    </div>

1. 사용자가 상품을 공유할 수 있도록 버튼을 추가합니다.
  버튼의 `click` 이벤트를 바인딩해서 `product-list.component.ts` 파일에 정의된 `share()` 메서드와 연결합니다. `<button>` 엘리먼트에서 발생하는 `(click)` 이벤트를 감지하려면 이벤트 이름을 소괄호(`( )`)로 감싸면 됩니다.

    <code-example path="getting-started/src/app/product-list/product-list.component.4.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    이제 개별 상품마다 **Share** 버튼이 추가된 것을 확인할 수 있습니다.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-share-button.png" alt="Share button added for each product">
    </div>

    **Share** 버튼을 클릭해 보세요. "The product has been shared!" 라는 알림이 표시되는 것을 확인할 수 있습니다.

    <div class="lightbox">
      <img src="generated/images/guide/start/template-syntax-product-share-alert.png" alt="Alert box indicating product has been shared">
    </div>

템플릿을 수정하면서 Angular 템플릿에서 가장 기본적으로 사용되는 기능을 몇가지 알아봤습니다.
더 자세한 내용을 확인하려면 [컴포넌트와 템플릿 소개](guide/architecture-components#template-syntax "Template Syntax") 문서를 참고하세요.


{@a passing-data-in}
<!--
## Pass data to a child component
-->
## 자식 컴포넌트로 데이터 전달하기

<!--
Currently, the product list displays the name and description of each product.
The `ProductListComponent` also defines a `products` property that contains imported data for each product from the `products` array in `products.ts`.

The next step is to create a new alert feature that uses product data from the `ProductListComponent`.
The alert checks the product's price, and, if the price is greater than $700, displays a **Notify Me** button that lets users sign up for notifications when the product goes on sale.

This section walks you through creating a child component, `ProductAlertsComponent` that can receive data from its parent component, `ProductListComponent`.

1. Right click on the `app` folder and use the `Angular Generator` to generate a new component named `product-alerts`.

  <div class="lightbox">
    <img src="generated/images/guide/start/generate-component.png" alt="StackBlitz command to generate component">
  </div>

    The generator creates starter files for the three parts of the component:
    * `product-alerts.component.ts`
    * `product-alerts.component.html`
    * `product-alerts.component.css`

1. Open `product-alerts.component.ts`.
  The `@Component()` decorator indicates that the following class is a component.
  `@Component()` also provides metadata about the component, including its selector, templates, and styles.

  <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="as-generated"></code-example>

  Key features in the `@Component()` are as follows:

    * The `selector`, `app-product-alerts`, identifies the component.
      By convention, Angular component selectors begin with the prefix `app-`, followed by the component name.
    * The template and style filenames reference the component's HTML and CSS.
    * The `@Component()` definition also exports the class, `ProductAlertsComponent`, which handles functionality for the component.

1. To set up `ProductAlertsComponent` to receive product data, first import `Input` from `@angular/core`.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="imports" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. In the `ProductAlertsComponent` class definition, define a property named `product` with an `@Input()` decorator.
  The `@Input()` decorator indicates that the property value passes in from the component's parent, `ProductListComponent`.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="input-decorator" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. Open `product-alerts.component.html` and replace the placeholder paragraph with a **Notify Me** button that appears if the product price is over $700.

  <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.1.html"></code-example>

1. To make `ProductAlertsComponent` available to other components in the application, add it to `AppModule`'s declarations in `app.module.ts`.

  <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="declare-product-alerts"></code-example>

1. Finally, to display `ProductAlertsComponent` as a child of `ProductListComponent`, add the selector, `<app-product-alerts>` to `product-list.component.html`.
  Pass the current product as input to the component using property binding.

  <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.5.html" region="app-product-alerts"></code-example>

The new product alert component takes a product as input from the product list.
With that input, it shows or hides the **Notify Me** button, based on the price of the product.
The Phone XL price is over $700, so the **Notify Me** button appears on that product.

<div class="lightbox">
  <img src="generated/images/guide/start/product-alert-button.png" alt="Product alert button added to products over $700">
</div>
-->
여기까지 구현하면 상품 목록 화면에는 개별 상품의 이름과 설명이 표시됩니다.
이 때 표시되는 상품의 목록은 `ProductListComponent`의 `products` 프로퍼티에 할당되어 있으며, 이 데이터는 `products.ts` 파일에 정의된 `products` 배열에서 불러온 것입니다.

다음 단계는 `ProductListComponent`에 있는 상품 데이터를 활용해서 알림 기능을 구현해 봅시다.
이 알림 기능은 상품의 가격을 검사해서 가격이 $700 이상이면 **Notify Me** 버튼을 표시해서 해당 상품이 세일을 진행하면 사용자에게 알리는 용도입니다.

이번 섹션에서는 부모 컴포넌트 `ProductListComponent`에서 데이터를 받는 자식 컴포넌트 `ProductAlertsComponent`를 만들어 봅시다.

1. `app` 폴더에 마우스 오른쪽 버튼을 클릭하고 `Angular Generator` 항목을 선택한 후에 `product-alerts`라는 이름으로 컴포넌트를 생성합니다.

  <div class="lightbox">
    <img src="generated/images/guide/start/generate-component.png" alt="StackBlitz command to generate component">
  </div>

    그러면 컴포넌트를 구성하는 다음 3개 파일이 생성됩니다:
    * `product-alerts.component.ts`
    * `product-alerts.component.html`
    * `product-alerts.component.css`

1. `product-alerts.component.ts` 파일을 엽니다.
  `@Component()` 데코레이터는 이 데코레이터가 붙은 클래스가 컴포넌트라는 것을 지정하는 용도로 사용합니다.
  `@Component()` 데코레이터에는 컴포넌트 셀렉터, 템플릿, 스타일에 해당하는 메타데이터를 지정할 수 있습니다.

  <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="as-generated"></code-example>

  `@Component()` 데코레이터에서 이런 것들이 중요합니다:

    * `app-product-alerts`라는 `selector`는 이 컴포넌트가 어떤 태그 이름으로 사용될지 결정합니다.
      보통 Angular 컴포넌트는 `app-`이라는 접두사로 시작하고 그 뒤에 컴포넌트 이름을 붙입니다.
    * 컴포넌트에 사용될 HTML 파일과 CSS 파일을 지정합니다.
    * `@Component()` 데코레이터 뒤에는 컴포넌트의 동작을 정의할 클래스를 `ProductAlertsComponent`와 같이 선언합니다.

1. `ProductAlertsComponent`가 상품 데이터를 받으려면 `@angular/core` 패키지가 제공하는 `Input` 심볼을 로드해야 합니다.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="imports" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. `ProductAlertsComponent` 클래스 선언에 `product`라는 프로퍼티를 선언하고 이 프로퍼티 앞에 `@Input()` 데코레이터를 지정합니다.
  프로퍼티에 `@Input()` 데코레이터를 지정하면 해당 프로퍼티의 값을 부모 컴포넌트에서 받아온다는 것을 의미합니다. 이 경우에는 `ProductListComponent`가 부모 컴포넌트입니다.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="input-decorator" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. `product-alerts.component.html` 파일을 열고 상품의 가격이 $700를 넘으면 **Notify Me** 버튼을 표시하도록 수정합니다.

  <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.1.html"></code-example>

1. `ProductListComponent`의 자식 컴포넌트로 `ProductAlertsComponent`를 표시하기 위해 `product-list.component.html` 파일에 `<app-product-alerts>` 셀렉터를 추가합니다.

<code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="declare-product-alerts"></code-example>

1. 그리고 `ProductAlertsComponent`를 표시할 수 있도록 `product-list.component.html` 파일에서 `ProductListComponent`의 자식으로 `<app-product-alerts>` 셀렉터를 추가합니다.
   그러면 프로퍼티 바인딩을 통해 해당 상품이 자식 컴포넌트의 입력 프로퍼티로 전달됩니다.

<code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.5.html" region="app-product-alerts"></code-example>


알림 컴포넌트는 상품 목록 컴포넌트에 있는 상품 데이터를 입력 프로퍼티로 받습니다.
이 알림 컴포넌트는 상품 가격에 따라 **Notify Me** 버튼을 표시하는데, Phone XL의 가격이 $700를 넘기 때문에 이 상품에 **Notify Me** 버튼이 표시되는 것을 확인할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/start/product-alert-button.png" alt="Product alert button added to products over $700">
</div>


{@a output}
<!--
## Pass data to a parent component
-->
## 부모 컴포넌트로 데이터 전달하기

<!--
To make the **Notify Me** button work, the child component needs to notify and pass the data to the parent component.
The `ProductAlertsComponent` needs to emit an event when the user clicks **Notify Me** and the `ProductListComponent` needs to respond to the event.

  <div class="alert is-helpful">

  In new components, the Angular Generator includes an empty `constructor()`, the `OnInit` interface, and the `ngOnInit()` method.
  Since these steps don't use them, the following code examples omit them for brevity.

  </div>

1. In `product-alerts.component.ts`, import `Output` and `EventEmitter` from `@angular/core`.

  <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.ts" region="imports"></code-example>

1. In the component class, define a property named `notify` with an `@Output()` decorator and an instance of `EventEmitter()`.
  Configuring `ProductAlertsComponent` with an `@Output()` allows the `ProductAlertsComponent` to emit an event when the value of the `notify` property changes.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.ts" header="src/app/product-alerts/product-alerts.component.ts" region="input-output"></code-example>

1. In `product-alerts.component.html`, update the **Notify Me** button with an event binding to call the `notify.emit()` method.

    <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.html"></code-example>

1. Define the behavior that happens when the user clicks the button.
  The parent, `ProductListComponent`&mdash;not the `ProductAlertsComponent`&mdash;acts when the child raises the event.
  In  `product-list.component.ts`, define an `onNotify()` method, similar to the `share()` method.

  <code-example header="src/app/product-list/product-list.component.ts" path="getting-started/src/app/product-list/product-list.component.ts" region="on-notify"></code-example>

1. Update the `ProductListComponent` to receive data from the `ProductAlertsComponent`.

  In `product-list.component.html`, bind `<app-product-alerts>`  to the `onNotify()` method of the product list component.
  `<app-product-alerts>` is what displays the **Notify Me** button.

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.6.html" region="on-notify"></code-example>

1. Click the **Notify Me** button to trigger an alert which reads, "You will be notified when the product goes on sale".

  <div class="lightbox">
    <img src="generated/images/guide/start/product-alert-notification.png" alt="Product alert notification confirmation dialog">
  </div>

For more information on communication between components, see [Component Interaction](guide/component-interaction "Component interaction").
-->
**Notikfy Me** 버튼이 제대로 동작하려면 자식 컴포넌트에서 부모 컴포넌트로 알림을 보내기 위해 데이터를 전달할 수 있어야 합니다.
그러면 `ProductAlertsComponent`는 사용자가 **Notify Me** 버튼을 클릭했을 때 부모 컴포넌트로 이벤트를 보내야 합니다.

  <div class="alert is-helpful">

  Angular Generator로 컴포넌트를 새로 만들면 `constructor()` 메서드가 빈 내용으로 생성되며, `OnInit` 인터페이스를 확장하는 `ngOnInit()` 메서드도 함께 생성됩니다.
  지금 단계에서는 이 메서드들을 사용하지 않기 때문에 예제에서 생략했습니다.

  </div>

1. `product-alerts.component.ts` 파일에 `@angular/core` 패키지가 제공하는 `Output` 심볼과 `EventEmitter` 심볼을 로드합니다.

  <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.ts" region="imports"></code-example>

1. 컴포넌트 클래스에 `notify` 프로퍼티를 추가하고 이 프로퍼티에 `@Output()` 데코레이터를 지정하고 `EventEmitter()` 인스턴스를 할당합니다.
  `ProductAlertsComponent` 프로퍼티에 `@Output()` 데코레이터를 지정하면 `ProductAlertsComponent`가 `notify` 프로퍼티를 통해 이벤트를 보낼 수 있습니다.

  <code-example path="getting-started/src/app/product-alerts/product-alerts.component.ts" header="src/app/product-alerts/product-alerts.component.ts" region="input-output"></code-example>

  <div class="alert is-helpful">

  Angular Generator로 컴포넌트를 새로 만들면 `constructor()` 메서드가 빈 내용으로 생성되며, `OnInit` 인터페이스를 확장하는 `ngOnInit()` 메서드도 함께 생성됩니다.
  지금 단계에서는 이 메서드들을 사용하지 않기 때문에 예제에서 생략했습니다.

  </div>

1. `product-alerts.component.html` 파일에 있는 **Notify Me** 버튼에 이벤트 바인딩을 연결해서 `(click)` 이벤트가 발생하면 `notify.emit()` 메서드를 실행하게 합니다.

    <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.html"></code-example>

1. 사용자가 버튼을 클릭했을 때 필요한 동작을 구현해 봅시다.
  자식 컴포넌트에서 발생한 이벤트는 자식 컴포넌트 `ProductAlertsComponent`가 아니라 부모 컴포넌트 `ProductListComponent`에서 처리해야 합니다.
  `product-list.component.ts` 파일을 열고 `onNotify()` 메서드를 추가합니다.
  이 메서드의 내용은 `share()` 메서드와 비슷합니다.

  <code-example header="src/app/product-list/product-list.component.ts" path="getting-started/src/app/product-list/product-list.component.ts" region="on-notify"></code-example>

1. `ProductAlertsComponent`가 보낸 데이터를 `ProductListComponent`가 받을 수 있도록 수정해 봅시다.

  `product-list.component.html` 파일을 열고 `<app-product-alerts>`와 `onNotify()` 메서드를 바인딩합니다.
  `<app-product-alerts>`는 **Notify Me** 가 표시되는 버튼입니다.

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.6.html" region="on-notify"></code-example>

1. **Notify Me** 버튼을 클릭하면 알림 기능이 동작하면서 "You will be notified when the product goes on sale" 라는 메시지가 표시되는 것을 확인할 수 있습니다.

  <div class="lightbox">
    <img src="generated/images/guide/start/product-alert-notification.png" alt="Product alert notification confirmation dialog">
  </div>

컴포넌트 사이에 통신하는 방법에 대해 자세하게 알아보려면 [컴포넌트 통신](guide/component-interaction "Component interaction") 문서를 참고하세요.


{@a whats-next}
<!--
## What's next
-->
## 다음 단계

<!--
In this section, you've created an application that iterates through data and features components that communicate with each other.

To continue exploring Angular and developing this application:

* Continue to [In-app navigation](start/start-routing "Getting started: In-app navigation") to create a product details page.
* Skip ahead to [Deployment](start/start-deployment "Getting started: Deployment") to move to local development, or deploy your application to Firebase or your own server.
-->
이 섹션에서는 애플리케이션을 새로 생성하고 목록에 있는 항목마다 템플릿을 반복하며 부모/자식 컴포넌트가 데이터를 주고 받는 방법에 대해 알아봤습니다.

애플리케이션을 조금 더 수정해 보면서 Angular가 제공하는 기능에 대해 더 알아봅시다:

* 상품 상세정보 화면으로 전환하려면 [앱 네비게이션](start/start-routing "Getting started: In-app navigation") 문서를 확인해 보세요.
* 로컬 개발환경을 구성하고 애플리케이션을 Firebase나 자체 서버로 배포하려면 [배포](start/start-deployment "Getting started: Deployment") 문서를 확인해 보세요.

@reviewed 2021-09-15
