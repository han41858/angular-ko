<!--
# Adding navigation
-->
# 네비게이션 추가하기

<!--
This guide builds on the first step of the Getting Started tutorial, [Get started with a basic Angular app](start "Get started with a basic Angular app").

At this stage of development, the online store application has a basic product catalog.

In the following sections, you'll add the following features to the application:

* Type a URL in the address bar to navigate to a corresponding product page.
* Click links on the page to navigate within your single-page application.
* Click the browser's back and forward buttons to navigate the browser history intuitively.
-->
이 문서는 [사용해보기 튜토리얼의 첫번째 단계](start "Get started with a basic Angular app")에서 만든 앱을 기준으로 합니다.

지금까지 작업한 앱에는 상품 목록 화면과 상품 상세정보 화면이 존재합니다.

이 애플리케이션에 이런 기능을 추가해 봅시다:

* 브라우저 주소 표시줄에 URL을 입력하면 해당 제품 화면으로 이동합니다.
* 싱글 페이지 애플리케이션에서 링크를 클릭하면 화면을 전환합니다.
* 브라우저의 "뒤로 가기", "앞으로 가기" 버튼을 누르면 브라우저 히스토리를 기반으로 이동합니다.


{@a define-routes}

<!--
## Associate a URL path with a component
-->
### URL 경로와 컴포넌트 연결하기

<!--
The application already uses the Angular `Router` to navigate to the `ProductListComponent`.
This section shows you how to define a route to show individual product details.

1. Generate a new component for product details.
    In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`.
    Name the component `product-details`.

1. In `app.module.ts`, add a route for product details, with a `path` of `products/:productId` and `ProductDetailsComponent` for the `component`.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="product-details-route">
    </code-example>

1. Open `product-list.component.html`.

1. Modify the product name anchor to include a `routerLink` with the `product.id` as a parameter.

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.html" region="router-link">
    </code-example>

    The `RouterLink` directive helps you customize the anchor element.
    In this case, the route, or URL, contains one fixed segment, `/products`.
    The final segment is variable, inserting the `id` property of the current product.
    For example, the URL for a product with an `id` of 1 would be similar to `https://getting-started-myfork.stackblitz.io/products/1`.

 1. Verify that the router works as intended by clicking the product name.
    The application should display the `ProductDetailsComponent`, which currently says "product-details works!"

    Notice that the URL in the preview window changes.
    The final segment is `products/#`  where `#` is the number of the route you clicked.

    <div class="lightbox">
      <img src="generated/images/guide/start/product-details-works.png" alt="Product details view with updated URL">
    </div>
-->
이 애플리케이션에는 이미 Angular `Router`를 사용해서 `ProductListComponent`로 화면을 전환하는 기능이 추가되어 있습니다.
이번 섹션에서는 상품의 상세정보 화면으로 이동하는 라우팅 규칙을 추가해 봅시다.

1. 상품의 상세정보를 표시하는 컴포넌트를 생성합니다.
    파일 목록에서 `app` 폴더에 마우스 오른쪽 버튼을 클릭하고 `Angular Generator`를 선택한 후에 `Component`를 선택하면 됩니다.
    이 때 컴포넌트의 이름은 `product-details`라고 지정합니다.

1. `app.module.ts` 파일을 열고 상품 상세정보에 해당하는 라우팅 규칙을 추가합니다. `path`는 `products/:productId`를 지정하고 `component`는 `ProductDetailsComponent`를 지정하면 됩니다.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="product-details-route">
    </code-example>

1. `product-list.component.html` 파일을 엽니다.

1. 상품 이름을 표시하는 `<a>` 링크에 `routerLink`를 추가하고 인자로 `product.id`를 지정합니다.

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.html" region="router-link">
    </code-example>

    `RouterLink` 디렉티브를 활용하면 `<a>` 엘리먼트를 커스터마이징할 수 있습니다.
    이 경우에 라우팅 경로는 `/products`라는 URL 세그먼트로 시작됩니다.
    그리고 마지막 세그먼트는 해당 상품의 `id` 프로퍼티 값이 할당됩니다.
    그래서 상품의 `id` 값이 1인 경우라면 최종 URL은 `https://getting-started-myfork.stackblitz.io/products/1`과 같은 형태가 됩니다.

 1. 상품의 이름을 클릭했을 때 라우터가 제대로 동작하는지 확인해 봅시다.
    그러면 `ProductDetailsComponent`로 전환되면서 "product-details works!" 라는 문구가 화면에 표시됩니다.

    미리보기 화면의 URL도 변경된 것을 확인해 보세요.
    `products/#`라는 주소의 마지막 세그먼트 `#`는 이전에 클릭한 상품의 id 값이 됩니다.

    <div class="lightbox">
      <img src="generated/images/guide/start/product-details-works.png" alt="Product details view with updated URL">
    </div>


<!--
## View product details
-->
## 상품 상세정보 표시하기

<!--
The `ProductDetailsComponent` handles the display of each product.
The Angular Router displays components based on the browser's URL and [your defined routes](#define-routes).

In this section, you'll use the Angular Router to combine the `products` data and route information to display the specific details for each product.

1. In `product-details.component.ts`, import `ActivatedRoute` from `@angular/router`, and the `products` array from `../products`.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="imports">
    </code-example>

1. Define the `product` property.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="product-prop">
    </code-example>

1. Inject `ActivatedRoute` into the `constructor()` by adding `private route: ActivatedRoute` as an argument within the constructor's parentheses.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="props-methods">
    </code-example>

    `ActivatedRoute` is specific to each component that the Angular Router loads.
    `ActivatedRoute` contains information about the route and the route's parameters.

    By injecting `ActivatedRoute`, you are configuring the component to use a service.
    The [Managing Data](start/start-data "Try it: Managing Data") step covers services in more detail.

1. In the `ngOnInit()` method, extract the `productId` from the route parameters and find the corresponding product in the `products` array.

    <code-example path="getting-started/src/app/product-details/product-details.component.1.ts" header="src/app/product-details/product-details.component.ts" region="get-product">
    </code-example>

    The route parameters correspond to the path variables you define in the route.
    To access the route parameters, we use `route.snapshot`, which is the `ActivatedRouteSnapshot` that contains information about the active route at that particular moment in time.
    The URL that matches the route provides the `productId` .
    Angular uses the `productId` to display the details for each unique product.

1. Update the `ProductDetailsComponent` template to display product details with an `*ngIf`.
    If a product exists, the `<div>` renders with a name, price, and description.

    <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html" region="details">
    </code-example>

    The line, `<h4>{{ product.price | currency }}</h4>`, uses the `currency` pipe to transform `product.price` from a number to a currency string.
    A pipe is a way you can transform data in your HTML template.
    For more information about Angular pipes, see [Pipes](guide/pipes "Pipes").

When users click on a name in the product list, the router navigates them to the distinct URL for the product, shows the `ProductDetailsComponent`, and displays the product details.

<div class="lightbox">
  <img src="generated/images/guide/start/product-details-routed.png" alt="Product details page with updated URL and full details displayed">
</div>

For more information about the Angular Router, see [Routing & Navigation](guide/router "Routing & Navigation guide").
-->
`ProductDetailsComponent`는 개별 상품의 정보를 표시합니다.
그리고 Angular Router는 [사전에 정의된 라우팅 규칙](#define-routes) 중에서 현재 브라우저의 URL에 매칭되는 컴포넌트를 화면에 표시합니다.

이번 섹션에서는 `products` 데이터와 라우팅 규칙을 결합해서 특정 상품의 상세정보를 화면에 표시해 봅시다.

1. `product-details.component.ts` 파일에 `@angular/router` 패키지로 제공되는 `ActivatedRoute`와 `..products` 파일로 준비된 `products` 배열을 불러옵니다.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="imports">
    </code-example>

1. `product` 프로퍼티를 정의합니다.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="product-prop">
    </code-example>

1. 생성자 소괄호 안에 `private route: ActivatedRoute`를 추가해서 `ActivatedRoute`를 `constructor()` 안에 의존성으로 주입합니다.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="props-methods">
    </code-example>

    `ActivatedRoute`는 Angular Router가 로드한 개별 컴포넌트에 대한 정보를 담고 있습니다.
    이 객체를 참조하면 해당 컴포넌트가 표시될 때 사용된 라우팅 규칙이나 라우팅 인자를 확인할 수 있습니다.

    `ActivatedRoute`를 의존성으로 주입하면 이제 컴포넌트에서 이 서비스를 사용할 준비는 끝났습니다.
    서비스를 사용해서 [데이터를 다루는 방법](start/start-data "Try it: Managing Data")에 대해 자세하게 알아보려면 해당 문서를 참고하세요.

1. `ngOnInit()` 메서드 안에서 라우팅 인자로 전달된 `productId`를 참조하고, 이 값에 해당되는 상품을 `products` 배열 안에서 찾습니다.

    <code-example path="getting-started/src/app/product-details/product-details.component.1.ts" header="src/app/product-details/product-details.component.ts" region="get-product">
    </code-example>

    The route parameters correspond to the path variables you define in the route.
    To access the route parameters, we use `route.snapshot`, which is the `ActivatedRouteSnapshot` that contains information about the active route at that particular moment in time.
    The URL that matches the route provides the `productId` .
    Angular uses the `productId` to display the details for each unique product.

1. 상품의 상세정보를 표시할 수 있도록 `ProductDetailsComponent` 템플릿을 수정하는데, 이 때 `*ngIf`를 사용합니다.
    이렇게 작성하면 해당 상품이 존재할 때만 `<div>` 엘리먼트가 렌더링되면서 상품의 이름, 가격, 설명이 화면에 표시됩니다.

    <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html" region="details">
    </code-example>

    `<h4>{{ product.price | currency }}</h4>` 코드를 보면 `product.price`는 숫자 타입이지만 금액 형식으로 표시하기 위해 `currency` 파이프를 사용했습니다.
    파이프는 HTML 템플릿에 표시되는 데이터의 형식을 조작할 때 사용합니다.
    Angular 파이프에 대해 자세하게 알아보려면 [파이프](guide/pipes "Pipes") 문서를 참고하세요.

이제 사용자가 상품 목록에서 상품의 이름을 클릭하면 라우터가 해당 상품에 해당하는 URL로 이동하면서 `ProductDetailsComponent`가 화면에 표시되고, 상품의 상세정보가 화면에 표시됩니다.

<div class="lightbox">
  <img src="generated/images/guide/start/product-details-routed.png" alt="Product details page with updated URL and full details displayed">
</div>

Angular Router에 대해 더 자세하게 알아보려면 [라우팅 & 네비게이션](guide/router "Routing & Navigation guide") 문서를 참고하세요.


<!--
## What's next
-->
## 다음 단계

<!--
You have configured your application so you can view product details, each with a distinct URL.

To continue exploring Angular:

* Continue to [Managing Data](start/start-data "Try it: Managing Data") to add a shopping cart feature, manage cart data, and retrieve external data for shipping prices.
* Skip ahead to [Deployment](start/start-deployment "Try it: Deployment") to deploy your application to Firebase or move to local development.
-->
이 문서에서는 개별 상품마다 URL을 할당하고 상품의 상세정보를 표시하는 방법을 알아봤습니다.

이런 내용을 더 확인해 보세요:

* 장바구니 기능을 추가하거나 배송 가격을 외부 데이터로 받아오는 방법을 알아보려면 [데이터 다루기](start/start-data "Try it: Managing Data") 문서를 확인해 보세요.
* 애플리케이션을 Firebase나 로컬 환경에 배포하는 방법을 알아보려면 [배포](start/start-deployment "Try it: Deployment") 문서를 확인해 보세요.
