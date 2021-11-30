<!--
# Managing data
-->
# 데이터 다루기

<!--
This guide builds on the second step of the [Getting started with a basic Angular application](start) tutorial, [Adding navigation](start/start-routing "Adding navigation").
At this stage of development, the store application has a product catalog with two views: a product list and product details.
Users can click on a product name from the list to see details in a new view, with a distinct URL, or route.

This step of the tutorial guides you through creating a shopping cart in the following phases:

* Update the product details view to include a **Buy** button, which adds the current product to a list of products that a cart service manages.
* Add a cart component, which displays the items in the cart.
* Add a shipping component, which retrieves shipping prices for the items in the cart by using Angular's `HttpClient` to retrieve shipping data from a `.json` file.
-->
이 가이드 문서는 [Angular 애플리케이션 시작하기](start) 튜토리얼의 [네비게이션](start/start-routing "Adding navigation") 다음 단계를 다룹니다.
현재 온라인 쇼핑몰 애플리케이션에는 상품과 관련된 화면이 상품 목록과 상품 상세정보 화면, 이렇게 두 화면이 존재합니다.
그리고 사용자가 상품 목록에서 상품의 이름을 클릭하면 URL이 변경되면서 상세정보 화면으로 이동합니다.

이번에는 이런 단계로 진행하면서 장바구니 기능을 구현해 봅시다:

* 상품 상세정보 화면에 **Buy** 버튼을 추가합니다. 이 버튼은 해당 상품을 장바구니 서비스가 관리하는 배열에 추가하는 버튼입니다.
* 장바구니 컴포넌트를 추가합니다. 이 컴포넌트는 장바구니에 담긴 상품 목록을 표시합니다.
* 주문 컴포넌트를 추가합니다. 이 컴포넌트는 Angular가 제공하는 `HttpClient`로 `.json` 파일에서 데이터를 불러와서 장바구니에 담긴 상품의 배송 가격을 표시합니다.


{@a create-cart-service}

<!--
## Create the shopping cart service
-->
## 장바구니 서비스 생성하기

<!--
In Angular, a service is an instance of a class that you can make available to any part of your application using Angular's [dependency injection system](guide/glossary#dependency-injection-di "Dependency injection definition").

Currently, users can view product information, and the application can simulate sharing and  notifications about product changes.

The next step is to build a way for users to add products to a cart.
This section walks you through adding a **Buy** button and setting up a cart service to store information about products in the cart.
-->
Angular에서 이야기하는 서비스는 [의존성 주입 시스템](guide/glossary#dependency-injection-di "Dependency injection definition")으로 애플리케이션 어디에라도 주입되는 클래스 인스턴스를 의미합니다.

지금까지는 사용자가 상품의 상세정보를 확인할 수 있으며 상품을 공유하거나 가격이 변경되었을 때 알림을 보내는 기능은 임시로 구현했습니다.

이번에는 사용자가 장바구니에 상품을 추가하는 기능을 만들어 봅시다.
이 섹션에서는 **Buy** 버튼을 추가하고 장바구니에 담긴 상품을 관리할 수 있도록 장바구니 서비스를 구현해 봅시다.


{@a generate-cart-service}

<!--
### Define a cart service
-->
### 장바구니 서비스 정의하기

<!--
1. To generate a cart service, right click on the `app` folder, choose **Angular Generator**, and choose **Service**.
    Name the new service `cart`.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.1.ts"></code-example>

1. Import the `Product` interface from `./products.js`.
1. In the `CartService` class, define an `items` property to store the array of the current products in the cart.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="props"></code-example>

1. Define methods to add items to the cart, return cart items, and clear the cart items.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="methods"></code-example>

    * The `addToCart()` method appends a product to an array of `items`.

    * The `getItems()` method collects the items users add to the cart and returns each item with its associated quantity.

    * The `clearCart()` method returns an empty array of items, which empties the cart.
-->
1. 장바구니 서비스를 생성하려면 `app` 폴더에 마우스 오른쪽 버튼을 클릭하고 **Angular Generator**를 선택한 다음에 **Service**를 선택하면 됩니다.
    이 서비스의 이름은 `cart`라고 지정합니다.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.1.ts"></code-example>

1. `CartService` 클래스 안에 `items` 프로퍼티를 정의합니다. 이 프로퍼티는 장바구니에 담긴 상품을 저장하는 배열입니다.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="props"></code-example>

1. 장바구니에 상품을 추가하는 메서드와 장바구니에 담긴 상품 목록을 반환하는 메서드, 장바구니를 비우는 메서드를 정의합니다.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="methods"></code-example>

    * `addToCart()` 메서드는 `itmes` 배열에 상품을 추가합니다.

    * `getItems()` 메서드는 장바구니에 담긴 상품을 갯수와 함께 반환합니다.

    * `clearCart()` 메서드는 장바구니를 비우로 빈 배열을 반환합니다.


{@a product-details-use-cart-service}
<!--
### Use the cart service
-->
### 장바구니 서비스 활용하기

<!--
This section walks you through using the `CartService` to add a product to the cart.

1. In `product-details.component.ts`, import the cart service.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.ts" region="cart-service">
    </code-example>

1. Inject the cart service by adding it to the `constructor()`.

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="inject-cart-service">
        </code-example>

1. Define the `addToCart()` method, which adds the current product to the cart.

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="add-to-cart"></code-example>

    The `addToCart()` method does the following:
    * Takes the current `product` as an argument.
    * Uses the `CartService` `addToCart()` method to add the product to the cart.
    * Displays a message that you've added a product to the cart.

1. In `product-details.component.html`, add a button with the label **Buy**, and bind the `click()` event to the `addToCart()` method.
    This code updates the product details template with a **Buy** button that adds the current product to the cart.

    <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html">
    </code-example>

1. Verify that the new **Buy** button appears as expected by refreshing the application and clicking on a product's name to display its details.

    <div class="lightbox">
      <img src='generated/images/guide/start/product-details-buy.png' alt="Display details for selected product with a Buy button">
    </div>

 1. Click the **Buy** button to add the product to the stored list of items in the cart and display a confirmation message.

    <div class="lightbox">
      <img src='generated/images/guide/start/buy-alert.png' alt="Display details for selected product with a Buy button">
    </div>
-->
이번 섹션에서는 `CartService`를 활용해서 장바구니에 상품을 추가해 봅시다.

1. `product-details.component.ts` 파일에서 장바구니 서비스를 불러옵니다.

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.ts" region="cart-service">
    </code-example>

1. 장바구니 서비스를 `constructor()`에 추가해서 의존성으로 주입합니다.

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="inject-cart-service">
        </code-example>

1. 컴포넌트에 `addToCart()` 메서드를 추가합니다. 이 메서드는 현재 사용자가 보는 상품을 장바구니에 추가하는 메서드입니다.

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="add-to-cart"></code-example>

    `addToCart()` 메서드는 이런 동작을 합니다:
    * 현재 `product`를 인자로 받습니다.
    * `CartService` `addToCart()` 메서드를 사용해서 인자로 받은 상품을 장바구니에 추가합니다.
    * 장바구니에 상품이 추가되었다는 메시지를 화면에 표시합니다.

1. `product-details.component.html` 파일을 열어서 **Buy** 버튼을 추가하고 이 버튼의 `click` 이벤트를 `addToCart()` 메서드와 바인딩합니다.
    아래 코드는 상품의 상세정보 화면 템플릿에 **Buy** 버튼을 추가한 코드입니다.

    <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html">
    </code-example>

1. 브라우저를 새로고침해서 **Buy** 버튼이 표시되는 것을 확인하고 상품 이름을 클릭해서 상품 상세정보가 제대로 표시되는지 확인해 보세요.

    <div class="lightbox">
      <img src='generated/images/guide/start/product-details-buy.png' alt="Display details for selected product with a Buy button">
    </div>

 1. 이제 **Buy** 버튼을 클릭해서 화면에 표시된 상품을 장바구니에 추가해 보세요. 이 때 안내 메시지가 표시되는 것도 확인해 보세요.

    <div class="lightbox">
      <img src='generated/images/guide/start/buy-alert.png' alt="Display details for selected product with a Buy button">
    </div>


<!--
## Create the cart view
-->
## 장바구니 화면 구성하기

<!--
For customers to see their cart, you can create the cart view in two steps:

1. Create a cart component and configure routing to the new component.
1. Display the cart items.
-->
고객이 장바구니를 확인하려면 장바구니 화면을 구현해야 합니다. 두 단계로 구현해 봅시다:

1. 장바구니 컴포넌트를 만들고 이 컴포넌트와 연결되는 라우팅 규칙을 정의합니다.
1. 컴포넌트에서 장바구니에 있는 아이템을 화면에 표시합니다.


<!--
### Set up the cart component
-->
### 장바구니 컴포넌트 구성하기

<!--
 To create the cart view, follow the same steps you did to create the `ProductDetailsComponent` and configure routing for the new component.

1. Generate a cart component named `cart` by right-clicking the `app` folder, choosing **Angular Generator**, and **Component**.

    <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.1.ts"></code-example>

    StackBlitz also generates an `ngOnInit()` by default in components.  You can ignore the `CartComponent` `ngOnInit()` for this tutorial.

1. Ensure that the newly created `CartComponent` is added to the module's `declarations` in `app.module.ts`.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="declare-cart">
    </code-example>

1. Still in `app.module.ts`, add a route for the component `CartComponent`, with a `path` of `cart`.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="cart-route">
    </code-example>

1. Update the **Checkout** button so that it routes to the `/cart` URL.
    In `top-bar.component.html`, add a `routerLink` directive pointing to `/cart`.

    <code-example header="src/app/top-bar/top-bar.component.html" path="getting-started/src/app/top-bar/top-bar.component.html" region="cart-route">
    </code-example>

1. Verify the new `CartComponent` works as expected by clicking the **Checkout** button.
    You can see the "cart works!" default text, and the URL has the pattern `https://getting-started.stackblitz.io/cart`, where `getting-started.stackblitz.io` may be different for your StackBlitz project.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-works.png' alt="Display cart view before customizing">
    </div>
-->
장바구니 화면을 구성하려면 `ProductDetailsComponent`를 만들었던 것과 비슷한 단계를 거치고 이 컴포넌트와 연결되는 라우팅 규칙을 구성하면 됩니다.

1. `app` 폴더에 마우스 오른쪽 버튼을 클릭하고 **Angular Generator**, **Component**를 클릭해서 컴포넌트를 생성합니다. 이 때 이름은 `cart`로 지정합니다.

    <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.1.ts"></code-example>

    이렇게 컴포넌트를 생성하면 StackBlitz가 자동으로 `ngOnInit()` 메서드를 구성합니다. 이번 예제에서는 이 메서드를 무시합니다.

1. `app.module.ts` 파일을 열고 `CartComponent`와 연결되는 라우팅 규칙을 추가합니다. 이 때 `path`는 `cart`로 지정합니다.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="cart-route">
    </code-example>

1. **Checkout** 버튼이 `/cart` URL로 연결되도록 수정합니다.
    `top-bar.component.html` 파일에서 `routerLink` 디렉티브를 연결해서 `/cart`로 이동하면 됩니다.

    <code-example header="src/app/top-bar/top-bar.component.html" path="getting-started/src/app/top-bar/top-bar.component.html" region="cart-route">
    </code-example>

1. **Checkout** 버튼을 클릭하고 `CartComponent`가 제대로 동작하는지 확인해 보세요.
    URL이 `https://getting-started.stackblitz.io/cart`와 같은 모양이 되면서 "cart works!" 문구가 표시되변 됩니다. 이 때 `getting-started.stackblitz.io` 부분은 StackBlitz 프로젝트에 따라 다를 수 있습니다.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-works.png' alt="Display cart view before customizing">
    </div>


<!--
### Display the cart items
-->
### 장바구니 목록 표시하기

<!--
This section shows you how to use the cart service to display the products in the cart.


1. In `cart.component.ts`, import the `CartService` from the `cart.service.ts` file.

    <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.2.ts" region="imports">
    </code-example>

1. Inject the `CartService` so that the `CartComponent` can use it by adding it to the `constructor()`.

    <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="inject-cart">
    </code-example>

1. Define the `items` property to store the products in the cart.

    <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="items">
    </code-example>

    This code sets the items using the `CartService` `getItems()` method.
    You defined this method [when you created `cart.service.ts`](#generate-cart-service).

1. Update the cart template with a header, and use a `<div>` with an `*ngFor` to display each of the cart items with its name and price.
    The resulting `CartComponent` template is as follows.

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html" region="prices">
    </code-example>

1. Verify that your cart works as expected:

    * Click **My Store**
    * Click on a product name to display its details.
    * Click **Buy** to add the product to the cart.
    * Click **Checkout** to see the cart.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-page-full.png' alt="Cart view with products added">
    </div>

For more information about services, see [Introduction to Services and Dependency Injection](guide/architecture-services "Concepts > Intro to Services and DI").
-->
이번 섹션에서는 장바구니 서비스를 활용해서 장바구니에 담긴 상품 목록을 표시해 봅시다.

1. `cart.component.ts` 파일에서 `cart.service.ts` 파일에 정의된 `CartService` 심볼을 불러옵니다.

    <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.2.ts" region="imports">
    </code-example>

1. `CartComponent`의 `constructor()`에 `CartService`를 의존성으로 주입합니다.

    <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="inject-cart">
    </code-example>

1. 장바구니 목록을 저장할 `items` 프로퍼티를 정의합니다.

    <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="items">
    </code-example>

    이 코드를 보면 `CartService` `getItems()` 메서드를 활용해서 상품 목록을 가져오는 것을 확인할 수 있습니다.
    이 메서드는 [`cart.service.ts`](#generate-cart-service)를 생성할 때 정의했습니다.

1. 장바구니 컴포넌트의 템플릿을 수정합니다. `<div>` 엘리먼트에 `*ngFor` 디렉티브를 적용해서 장바구니에 담긴 상품마다 이름과 가격을 표시합니다.
    여기까지 작업하면 `CartComponent`의 템플릿이 이렇게 구성됩니다.

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html" region="prices">
    </code-example>

1. 장바구니 컴포넌트가 제대로 동작하는지 확인해 보세요:

    * **My Store** 를 클릭합니다.
    * 상품의 이름을 클릭해서 상세정보가 표시되는지 확인합니다.
    * **Buy** 버튼을 클릭해서 장바구니에 상품을 추가해 봅시다.
    * **Checkout** 커튼을 클릭해서 장바구니에 상품이 제대로 들어갔는지 확인합니다.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-page-full.png' alt="Cart view with products added">
    </div>

서비스에 대해 더 자세하게 알아보려면 [서비스와 의존성 주입](guide/architecture-services "Concepts > Intro to Services and DI") 가이드 문서를 참고하세요.


<!--
## Retrieve shipping prices
-->
## 배송가격 받아오기

<!--
Servers often return data in the form of a stream.
Streams are useful because they make it easy to transform the returned data and make modifications to the way you request that data.
Angular `HttpClient` is a built-in way to fetch data from external APIs and provide them to your application as a stream.

This section shows you how to use `HttpClient` to retrieve shipping prices from an external file.

The application that StackBlitz generates for this guide comes with predefined shipping data in `assets/shipping.json`.
Use this data to add shipping prices for items in the cart.

<code-example header="src/assets/shipping.json" path="getting-started/src/assets/shipping.json">
</code-example>
-->
서버는 스트림 형태로 데이터를 반환하기도 합니다.
이런 스트림 형태의 데이터는 원하는 대로 변형하기 쉽기 때문에 활용하기도 좋습니다.
Angular가 기본으로 제공하는 `HttpClient`는 외부 API에 접근해서 스트림 형태로 데이터를 받아오는 서비스입니다.

이번 섹션에서는 `HttpClient`를 사용해서 외부 파일에 있는 배송 가격을 받아와 봅시다.

StackBlitz에서 생성한 애플리케이션에는 `assets/shipping.json` 파일에 배송가격 데이터가 준비되어 있습니다.
이 데이터를 불러와서 장바구니에 있는 상품 목록과 연결해 봅시다.

<code-example header="src/assets/shipping.json" path="getting-started/src/assets/shipping.json">
</code-example>

<!--
### Configure `AppModule` to use `HttpClient`
-->
### `AppModule`에 `HttpClient` 등록하기

<!--
To use Angular's `HttpClient`, you must configure your application to use `HttpClientModule`.

Angular's `HttpClientModule` registers the providers your application needs to use the `HttpClient` service throughout your application.

1. In `app.module.ts`, import `HttpClientModule` from the `@angular/common/http` package at the top of the file with the other imports.
    As there are a number of other imports, this code snippet omits them for brevity.
    Be sure to leave the existing imports in place.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="http-client-module-import">
    </code-example>

1. To register Angular's `HttpClient` providers globally, add `HttpClientModule` to the `AppModule` `@NgModule()` `imports` array.

    <code-example path="getting-started/src/app/app.module.ts" header="src/app/app.module.ts" region="http-client-module">
    </code-example>
-->
Angular 애플리케이션에서 `HttpClient`를 사용하려면 애플리케이션에 `HttpClientModule`을 등록해야 합니다.

Angular `HttpClientModule`을 등록하면 애플리케이션 전역에서 `HttpClient` 서비스를 자유롭게 활용할 수 있습니다.

1. `app.module.ts` 파일에서 `@angular/common/http` 패키지로 제공되는 `HttpClientModule`를 로드합니다.
    이 심볼 외에도 `import` 구문은 더 있지만 아래 코드에서는 생략했습니다.
    다른 `import` 구문을 지우지 마세요.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="http-client-module-import">
    </code-example>

1. Angular `HttpClient` 프로바이더를 전역 범위에 등록하려면 `HttpClientModule`을 `AppModule` `@NgModule()` `imports` 배열에 추가하면 됩니다.

    <code-example path="getting-started/src/app/app.module.ts" header="src/app/app.module.ts" region="http-client-module">
    </code-example>


<!--
### Configure `CartService` to use `HttpClient`
-->
### `CartService`에서 `HttpClient` 사용하기

<!--
The next step is to inject the `HttpClient` service into your service so your application can fetch data and interact with external APIs and resources.

1. In `cart.service.ts`, import `HttpClient` from the `@angular/common/http` package.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="import-http">
    </code-example>

1. Inject `HttpClient` into the `CartService` `constructor()`.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="inject-http">
    </code-example>
-->
그 다음에는 서비스가 데이터를 받아올 수 있도록 `HttpClient`를 의존성으로 주입하면 됩니다.

1. `cart.service.ts` 파일에서 `@angular/common/http` 패키지로 제공되는 `HttpClient` 심볼을 로드합니다..

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="import-http">
    </code-example>

1. `HttpClient`를 `CartService` `constructor()`에 의존성으로 주입합니다.

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="inject-http">
    </code-example>


<!--
### Configure `CartService` to get shipping prices
-->
### `CartService`에서 배송가격 받아오기

<!--
To get shipping data, from `shipping.json`, You can use the `HttpClient` `get()` method.

1. In `cart.service.ts`, below the `clearCart()` method, define a new `getShippingPrices()` method that uses the `HttpClient` `get()` method.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="get-shipping"></code-example>

For more information about Angular's `HttpClient`, see the [Client-Server Interaction](guide/http "Server interaction through HTTP") guide.
-->
`shipping.json` 파일에 있는 배송가격 데이터를 불러오려면 `HttpClient` `get()` 메서드를 사용하면 됩니다.

1. `cart.service.ts` 파일의 `clearCart()` 메서드 아래 `getShippingPrices()` 메서드를 추가하고 이 메서드에 `HttpClient` `get()` 메서드를 이렇게 구현합니다.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="get-shipping"></code-example>

Angular `HttpClient`에 대해 더 자세하게 알아보려면 [클라이언트-서버 통신](guide/http "Server interaction through HTTP") 문서를 참고하세요.


<!--
## Create a shipping component
-->
## 배송 컴포넌트 생성하기

<!--
Now that you've configured your application to retrieve shipping data, you can create a place to render that data.

1. Generate a new component named `shipping` by right-clicking the `app` folder, choosing **Angular Generator**, and selecting **Component**.

    <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.1.ts"></code-example>

1. In `app.module.ts`, add a route for shipping.
    Specify a `path` of `shipping` and a component of `ShippingComponent`.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="shipping-route"></code-example>

    There's no link to the new shipping component yet, but you can see its template in the preview pane by entering the URL its route specifies.
    The URL has the pattern: `https://getting-started.stackblitz.io/shipping` where the `getting-started.stackblitz.io` part may be different for your StackBlitz project.
-->
애플리케이션에 배송 가격 데이터를 불러올 수 있다면, 이 데이터를 표시할 화면도 필요합니다.

1. `app` 폴더에 마우스 오른쪽 버튼을 클릭하고 **Angular Generator** , **Component** 를 클릭해서 컴포넌트를 생성합니다. 이때 컴포넌트 이름은 `shipping`이라고 지정합니다.

    <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.1.ts"></code-example>

1. `app.module.ts` 파일에 배송 컴포넌트로 연결되는 라우팅 규칙을 추가합니다.
    `path`에는 `shipping`을 지정하고 컴포넌트는 `ShippingComponent`를 연결하면 됩니다.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="shipping-route"></code-example>

    아직은 배송 컴포넌트로 연결되는 링크는 없기 때문에 컴포넌트가 동작하는 것을 확인하려면 미리보기 화면에 직접 URL을 입력하면 됩니다.
    `https://getting-started.stackblitz.io/shipping` 라고 입력해 보세요.
    `getting-started.stackblitz.io` 부분은 StackBlitz 프로젝트에 따라 다를 수 있습니다.


<!--
### Configuring the `ShippingComponent` to use `CartService`
-->
### `ShippingComponent`에서 `CartService` 활용하기

<!--
This section guides you through modifying the `ShippingComponent` to retrieve shipping data via HTTP from the `shipping.json` file.

1. In `shipping.component.ts`, import `CartService`.

    <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.ts" region="imports"></code-example>

1. Inject the cart service in the `ShippingComponent` `constructor()`.

    <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="inject-cart-service"></code-example>

1. Define a `shippingCosts` property that sets the `shippingCosts` property using the `getShippingPrices()` method from the `CartService`.

    <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="props"></code-example>

1. Update the `ShippingComponent` template to display the shipping types and prices using the `async` pipe.

    <code-example header="src/app/shipping/shipping.component.html" path="getting-started/src/app/shipping/shipping.component.html"></code-example>

    The `async` pipe returns the latest value from a stream of data and continues to do so for the life of a given component.
    When Angular destroys that component, the `async` pipe automatically stops.
    For detailed information about the `async` pipe, see the [AsyncPipe API documentation](/api/common/AsyncPipe).

1. Add a link from the `CartComponent` view to the `ShippingComponent` view.

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html"></code-example>

1. Click the **Checkout** button to see the updated cart.
    Remember that changing the application causes the preview to refresh, which empties the cart.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
    </div>

    Click on the link to navigate to the shipping prices.

    <div class="lightbox">
      <img src='generated/images/guide/start/shipping-prices.png' alt="Display shipping prices">
    </div>
-->
이번 섹션에서는 `ShppingComponent`에서 HTTP 통신을 활용해서 `shipping.json` 파일에 있는 데이터를 불러와 봅시다.

1. `shipping.component.ts` 파일에서 `CartService`를 불러옵니다.

    <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.ts" region="imports"></code-example>

1. 장바구니 서비스를 `ShippingComponent` `constructor()`에 의존성으로 주입합니다.

    <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="inject-cart-service"></code-example>

1. `CartService` `getShippingPrices()` 메서드로 `shippingCosts` 프로퍼티 값을 할당합니다.

    <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="props"></code-example>

1. `ShippingComponent` 템플릿을 수정해서 배송 타입과 가격을 표시합니다. 이 때 `async` 파이프를 사용해 봅시다.

    <code-example header="src/app/shipping/shipping.component.html" path="getting-started/src/app/shipping/shipping.component.html"></code-example>

    `async` 파이프는 스트림으로 전달된 데이터의 마지막 값을 반환하며, 이 동작은 컴포넌트가 존재하는 동안 계속 실행됩니다.
    그리고 Angular가 컴포넌트를 종료하면 `async` 파이프도 함께 자동으로 종료됩니다.
    `async` 파이프에 대해 더 자세하게 알아보려면 [AsyncPipe API 문서](/api/common/AsyncPipe)를 참고하세요.

1. `CartComponent` 화면에서 `ShippingComponent` 화면으로 이동하는 링크를 추가합니다.

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html"></code-example>

1. **Checkout** 버튼을 클릭해서 장바구니 목록을 변경해 보세요.
    애플리케이션 코드가 변경되면 미리보기 화면도 갱신되면서 장바구니가 비워진다는 것을 잊지 마세요.

    <div class="lightbox">
      <img src='generated/images/guide/start/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
    </div>

    링크를 클릭해서 배송 컴포넌트로 이동해 보세요.

    <div class="lightbox">
      <img src='generated/images/guide/start/shipping-prices.png' alt="Display shipping prices">
    </div>


<!--
## What's next
-->
## 다음 단계

<!--
You now have a store application with a product catalog, a shopping cart, and you can  look up shipping prices.

To continue exploring Angular:

* Continue to [Forms for User Input](start/start-forms "Forms for User Input") to finish the application by adding the shopping cart view and a checkout form.
* Skip ahead to [Deployment](start/start-deployment "Deployment") to move to local development, or deploy your application to Firebase or your own server.
-->
이제 온라인샵 애플리케이션에는 상품 목록 화면, 장바구니 화면, 배송가격을 확인할 수 있는 화면이 완성되었습니다.

이런 내용을 더 확인해 보세요:

* 주문 화면과 주문 폼을 구성하는 방법을 알아보려면 [폼으로 입력 받기](start/start-forms "Forms for User Input") 문서를 확인해 보세요.

* 애플리케이션을 Firebase나 로컬 환경에 배포하는 방법을 알아보려면 [배포](start/start-deployment "Try it: Deployment") 문서를 확인해 보세요.
