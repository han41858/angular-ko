<!--
# Using forms for user input
-->
# 폼으로 입력 받기

<!--
This guide builds on the [Managing Data](start/start-data "Try it: Managing Data") step of the Getting Started tutorial, [Get started with a basic Angular app](start "Get started with a basic Angular app").

This section walks you through adding a form-based checkout feature to collect user information as part of checkout.
-->
이 가이드 문서는 [Angular 애플리케이션 시작하기](start) 튜토리얼의 [데이터 다루기](start/start-data "Try it: Managing Data") 다음 단계를 다룹니다.

폼으로 주문 기능을 만들어서 사용자가 입력하는 내용을 처리해 봅시다.


<!--
## Define the checkout form model
-->
## 주문 폼 모델 정의하기

<!--
This step shows you how to set up the checkout form model in the component class.
The form model determines the status of the form.

1. Open `cart.component.ts`.

1. Import the `FormBuilder` service from the `@angular/forms` package.
  This service provides convenient methods for generating controls.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="imports">
  </code-example>

1. Inject the `FormBuilder` service in the `CartComponent` `constructor()`.
  This service is part of the `ReactiveFormsModule` module, which you've already imported.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="inject-form-builder">
  </code-example>

1. To gather the user's name and address, use the `FormBuilder` `group()` method to set the `checkoutForm` property to a form model containing `name` and `address` fields.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="checkout-form-group"></code-example>

1. Define an `onSubmit()` method to process the form.
  This method allows users to submit their name and address.
  In addition, this method uses the `clearCart()` method of the `CartService` to reset the form and clear the cart.

  The entire cart component class is as follows:

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts">
  </code-example>
-->
이번 섹션에서는 컴포넌트 클래스에 주문 폼 모델을 구성하는 방법을 안내합니다.
폼 모델은 폼의 상태를 결정합니다.

1. `cart.component.ts` 파일을 엽니다.

1. `@angular/forms` 패키지로 제공되는 `FormBuilder` 서비스를 불러옵니다.
  이 서비스를 활용하면 폼 컨트롤을 간단하게 생성할 수 있습니다.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="imports">
  </code-example>

1. `FormBuilder` 서비스를 `CartComponent` `constructor()`에 의존성으로 주입합니다.
  이 서비스는 `ReactiveFormsModule`이 제공하는 서비스이며, 이 모듈은 미리 애플리케이션에 로드되어 있습니다.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="inject-form-builder">
  </code-example>

1. 사용자의 이름과 주소를 입력받으려면 `FormBuilder` `group()` 메서드로 `name`과 `address` 필드가 있는 폼 모델을 생성한 후에 `checkoutForm` 프로퍼티에 할당하면 됩니다.

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="checkout-form-group"></code-example>

1. 폼을 처리하는 `onSubmit()` 메서드를 정의합니다.
  이 메서드는 사용자가 입력한 이름과 주소를 제출하는 동작을 합니다.
  그리고 이 메서드는 `CartService` `clearCart()` 메서드를 사용해서 폼을 초기화하고 장바구니를 비웁니다.

  장바구니 컴포넌트 클래스의 전체 코드는 이렇습니다:

  <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts">
  </code-example>


<!--
## Create the checkout form
-->
## 주문 폼 구성하기

<!--
Use the following steps to add a checkout form at the bottom of the Cart view.

1. At the bottom of `cart.component.html`, add an HTML `<form>` element and a **Purchase** button.

1. Use a `formGroup` property binding to bind `checkoutForm` to the HTML `<form>`.

  <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.3.html" region="checkout-form">
  </code-example>

1. On the `form` tag, use an `ngSubmit` event binding to listen for the form submission and call the `onSubmit()` method with the `checkoutForm` value.

  <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html (cart component template detail)" region="checkout-form-1">
  </code-example>

1. Add `<input>` fields for `name` and `address`, each with a `formControlName` attribute that binds to the `checkoutForm` form controls for `name` and `address` to their `<input>` fields.
  The complete component is as follows:

  <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html" region="checkout-form-2">
  </code-example>

After putting a few items in the cart, users can review their items, enter their name and address, and submit their purchase.

<div class="lightbox">
  <img src='generated/images/guide/start/cart-with-items-and-form.png' alt="Cart view with checkout form">
</div>

To confirm submission, open the console to see an object containing the name and address you submitted.
-->
다음 순서대로 장바구니 화면에 주문 폼을 구성해 봅시다.

1. `cart.component.html` 아래 쪽에 HTML `<form>` 엘리먼트를 추가하고 **Purchase** 버튼을 추가합니다.

1. HTML `<form>` 엘리먼트의 `formGroup` 프로퍼티에 `checkoutForm` 을 바인딩합니다.

  <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.3.html" region="checkout-form">
  </code-example>

1. `form` 태그에 `ngSubmit` 이벤트를 `onSubmit()` 메서드와 바인딩합니다. 이렇게 바인딩하면 폼에서 제출 이벤트가 발생했을 때 `onSubmit()` 메서드가 실행됩니다.

  <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html (장바구니 컴포넌트 중 템플릿 부분)" region="checkout-form-1">
  </code-example>

1. `name` 필드와 `address` 필드에 연결되는 `<input>` 필드를 추가합니다. 개별 `<input>` 엘리먼트에는 `formControlName` 어트리뷰트를 사용해서 `checkoutForm` 폼 컨트롤에 있는 `name`과 `address`를 지정합니다.
  그러면 컴포넌트 템플릿이 이렇게 구성됩니다:

  <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html" region="checkout-form-2">
  </code-example>

사용자가 장바구니에 상품을 몇 개 넣고 나면 장바구니 목록이 표시되는 것을 확인할 수 있습니다.
이 화면에서 사용자의 이름과 주소를 입력하고 **Purchase** 버튼을 누르면 이 폼의 내용이 제출됩니다.

<div class="lightbox">
  <img src='generated/images/guide/start/cart-with-items-and-form.png' alt="Cart view with checkout form">
</div>

폼이 제출된 것을 확인하려면 콘솔을 열어서 입력한 이름과 주소가 제대로 출력되는지 확인하면 됩니다.


<!--
## What's next
-->
## 다음 단계

<!--
You have a complete online store application with a product catalog, a shopping cart, and a checkout function.

[Continue to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server.
-->
이제 온라인샵 애플리케이션에는 상품 목록을 표시하는 화면, 장바구니 기능, 주문 기능이 완성되었습니다.

* 애플리케이션을 Firebase나 로컬 환경에 배포하는 방법을 알아보려면 [배포](start/start-deployment "Try it: Deployment") 문서를 확인해 보세요.

@reviewed 2021-09-15
