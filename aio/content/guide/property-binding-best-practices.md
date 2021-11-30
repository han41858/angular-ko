<!--
# Property binding best practices
-->
# 프로퍼티 바인딩 모범 사례

<!--
By following a few guidelines, you can use property binding in a way that helps you minimize bugs and keep your code readable.

<div class="alert is-helpful">

See the <live-example name="property-binding"></live-example> for a working example containing the code snippets in this guide.

</div>
-->
이 문서는 프로퍼티 바인딩을 사용할 때 지키면 좋은 내용에 대해 설명합니다.
버그를 줄이고 가독성을 높이는 데에 도움이 될 것입니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example name="property-binding"></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Avoid side effects
-->
## 부수 효과 피하기

<!--
Evaluation of a template expression should have no visible side effects.
Use the syntax for template expressions to help avoid side effects.
In general, the correct syntax prevents you from assigning a value to anything in a property binding expression.
The syntax also prevents you from using increment and decrement operators.
-->
템플릿 표현식은 부수 효과(side effects)를 발생시키지 않는 것이 좋습니다.
그리고 템플릿 표현식 문법도 부수 효과를 발생시키지 않는 방향으로 제공됩니다.
그래서 프로퍼티 바인딩 표현식에서는 값을 할당하는 문법은 사용할 수 없습니다.
같은 이유로 템플릿 표현식에는 증감 연산자도 사용할 수 없습니다.


<!--
### An example of producing side effects
-->
### 부수 효과를 유발하는 경우

<!--
If you had an expression that changed the value of something else that you were binding to, that change of value would be a side effect.
Angular might or might not display the changed value.
If Angular does detect the change, it throws an error.

As a best practice, use only properties and methods that return values.
-->
템플릿 표현식에서 바인딩한 대상 이외의 값을 변경하는 경우에는 부수 효과가 발생할 수 있습니다.
Angular가 이런 경우를 감지하면 에러를 발생시킵니다.

프로퍼티를 단순하게 지정하거나 값을 반환하는 메서드를 사용하는 것이 가장 좋습니다.


<!--
## Return the proper type
-->
## 정확한 타입 반환하기

<!--
A template expression should evaluate to the type of value that the target property expects.
For example, return a string if the target property expects a string, a number if it expects a number, or an object if it expects an object.
-->
템플릿 표현식이 평가된 결과는 바인딩 대상 프로퍼티의 타입과 같아야 합니다.
바인딩 대상 프로퍼티가 문자열이라면 템플릿 표현식도 문자열을 반환해야 하며, 숫자, 객체인 경우도 마찬가지입니다.


<!--
### Passing in a string
-->
### 문자열 전달하기

<!--
In the following example, the `childItem` property of the `ItemDetailComponent` expects a string.

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

Confirm this expectation by looking in the `ItemDetailComponent` where the `@Input()` type is `string`:

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (setting the @Input() type)"></code-example>

The `parentItem` in `AppComponent` is a string, which means that the expression, `parentItem` within `[childItem]="parentItem"`, evaluates to a string.

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

If `parentItem` were some other type, you would need to specify `childItem`  `@Input()` as that type as well.
-->
아래 예제에서 `ItemDetailComponent`에 있는 `childItem` 프로퍼티는 문자열을 받아야 합니다.

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

이 타입은 `ItemDetailComponent`에 `@Input()` 데코레이터가 붙은 `childItem` 프로퍼티 타입이 `string`인 것으로도 확인할 수 있습니다:

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (@Input() 프로퍼티에 지정된 타입)"></code-example>

`AppComponent`에 정의된 `parentItem` 프로퍼티 타입은 문자열입니다.
그래서 `[childItem]="parentItem"`에 사용된 `parentItem`도 문자열로 평가됩니다.

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

만약 `parentItem`을 다른 타입으로 변경하면 `@Input()` 데코레이터가 지정된 `childItem` 타입도 변경되어야 합니다.


<!--
### Passing in an object
-->
### 객체 전달하기

<!--
In this example, `ItemListComponent` is a child component of `AppComponent` and the `items` property expects an array of objects.

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

In the `ItemListComponent` the `@Input()`, `items`, has a type of `Item[]`.

<code-example path="property-binding/src/app/item-list/item-list.component.ts" region="item-input" header="src/app/item-list.component.ts"></code-example>

Notice that `Item` is an object that it has two properties; an `id` and a `name`.

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

In `app.component.ts`, `currentItems` is an array of objects in the same shape as the `Item` object in `items.ts`, with an `id` and a `name`.

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

By supplying an object in the same shape, you satisfy the expectations of `items` when Angular evaluates the expression `currentItems`.
-->
예제로 다루는 `ItemListComponent`는 `AppComponent`의 자식 컴포넌트이며 `items` 프로퍼티는 객체 배열을 받아야 합니다.

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

`ItemListComponent`에서 `@Input()` 데코레이터가 지정된 `items` 타입도 `Item[]` 타입입니다.

<code-example path="property-binding/src/app/item-list/item-list.component.ts" region="item-input" header="src/app/item-list.component.ts"></code-example>

`Item` 객체에는 프로퍼티가 `id`, `name` 이렇게 2개 있습니다.

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

`app.component.ts`에서 `currentItems`는 객체 배열이며 `items.ts`에 정의된 `Item` 모양과 똑같이 `id` 프로퍼티와 `name` 프로퍼티가 있습니다.

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

그래서 객체의 형식이 같기 때문에 `currentItems` 표현식이 평가된 결과를 `items`에 바인딩할 수 있습니다.
