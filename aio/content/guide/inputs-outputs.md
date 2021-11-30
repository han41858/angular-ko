<!--
# Sharing data between child and parent directives and components
-->
# 부모/자식 디렉티브/컴포넌트끼리 데이터 공유하기

<!--
A common pattern in Angular is sharing data between a parent component and one or more child components.
Implement this pattern with the `@Input()` and `@Output()` decorators.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>

Consider the following hierarchy:

```html
<parent-component>
  <child-component></child-component>
</parent-component>

```

The `<parent-component>` serves as the context for the `<child-component>`.

`@Input()` and `@Output()` give a child component a way to communicate with its parent component.
`@Input()` lets a parent component update data in the child component.
Conversely, `@Output()` lets the child send data to a parent component.
-->
Angular에서는 부모 컴포넌트와 자식 컴포넌트가 데이터를 주고받는 패턴이 자주 사용됩니다.
이 패턴은 `@Input()`, `@Output()` 데코레이터 구현합니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>

이런 구조가 있다고 합시다:

```html
<parent-component>
  <child-component></child-component>
</parent-component>

```

이 구조에서 `<parent-component>`는 `<child-component>`의 컨텍스트를 제공하는 역할을 합니다.

`@Input()`, `@Output()` 데코레이터를 활용하면 자식 컴포넌트가 부모 컴포넌트와 통신할 수 있습니다.
이 때 `@Input()`은 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용합니다.
그리고 `@Output()`은 반대로 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달할 때 사용합니다.


{@a input}

<!--
## Sending data to a child component
-->
## 자식 컴포넌트로 데이터 전달하기

<!--
The `@Input()` decorator in a child component or directive signifies that the property can receive its value from its parent component.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input.svg" alt="Input data flow diagram of data flowing from parent to child">
</div>

To use `@Input()`, you must configure the parent and child.
-->
`@Input()` 데코레이터는 자식 컴포넌트/디렉티브에 있는 특정 프로퍼티가 부모 컴포넌트/디렉티브에서 값을 받는다는 것을 지정하는 데코레이터입니다.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input.svg" alt="Input data flow diagram of data flowing from parent to child">
</div>

`@Input()` 데코레이터는 부모-자식 관계에서만 사용할 수 있습니다.


<!--
### Configuring the child component
-->
### 자식 컴포넌트 설정하기

<!--
To use the `@Input()` decorator in a child component class, first import `Input` and then decorate the property with `@Input()`, as in the following example.

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.ts" region="use-input" header="src/app/item-detail/item-detail.component.ts"></code-example>


In this case, `@Input()` decorates the property <code class="no-auto-link">item</code>, which has a type of `string`, however, `@Input()` properties can have any type, such as `number`, `string`, `boolean`, or `object`.
The value for `item` comes from the parent component.

Next, in the child component template, add the following:

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.html" region="property-in-template" header="src/app/item-detail/item-detail.component.html"></code-example>
-->
자식 컴포넌트에서 `@Input()` 데코레이터를 사용하려면 먼저 `Input` 심볼을 로드해야합니다.
이렇게 구성하면 됩니다.

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.ts" region="use-input" header="src/app/item-detail/item-detail.component.ts"></code-example>

이렇게 구현하면 `@Input()` 데코레이터는 `string` 타입으로 선언된 <code class="no-auto-link">item</code> 프로퍼티가 입력 프로퍼티라는 것을 지정하는데, `@Input()` 프로퍼티에는 `number`, `string`, `boolean`, `object` 등 어떠한 타입이라도 자유롭게 전달될 수 있습니다.
`item` 프로퍼티에 맞는 타입으로 데이터를 전달하는 것은 부모 컴포넌트의 몫입니다.

다음에는 자식 컴포넌트 템플릿에 이런 코드를 추가합니다:

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.html" region="property-in-template" header="src/app/item-detail/item-detail.component.html"></code-example>


<!--
### Configuring the parent component
-->
### 부모 컴포넌트 설정하기

<!--
The next step is to bind the property in the parent component's template.
In this example, the parent component template is `app.component.html`.

1. Use the child's selector, here `<app-item-detail>`, as a directive within the
parent component template.

2. Use [property binding](guide/property-binding) to bind the `item` property in the child to the `currentItem` property of the parent.

<code-example path="inputs-outputs/src/app/app.component.html" region="input-parent" header="src/app/app.component.html"></code-example>

3. In the parent component class, designate a value for `currentItem`:

<code-example path="inputs-outputs/src/app/app.component.ts" region="parent-property" header="src/app/app.component.ts"></code-example>

With `@Input()`, Angular passes the value for `currentItem` to the child so that `item` renders as `Television`.

The following diagram shows this structure:

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-diagram-target-source.svg" alt="Property binding diagram of the target, item, in square brackets set to the source, currentItem, on the right of an equal sign">
</div>

The target in the square brackets, `[]`, is the property you decorate with `@Input()` in the child component.
The binding source, the part to the right of the equal sign, is the data that the parent component passes to the nested component.
-->
다음에는 부모 컴포넌트 템플릿에서 프로퍼티를 바인딩해야 합니다.
이 문서에서 다루는 예제에서 부모 컴포넌트의 템플릿 파일은 `app.component.html` 파일입니다.

1. 부모 컴포넌트 템플릿에 자식 컴포넌트 셀렉터 `<app-item-detail>`를 추가합니다.

2. [프로퍼티 바인딩](guide/property-binding)을 사용해서 부모 컴포넌트의 `currentItem` 프로퍼티를 자식 컴포넌트의 `item` 프로퍼티로 바인딩합니다.

<code-example path="inputs-outputs/src/app/app.component.html" region="input-parent" header="src/app/app.component.html"></code-example>

3. 부모 컴포넌트 클래스에서 `currentItem` 값을 할당합니다:

<code-example path="inputs-outputs/src/app/app.component.ts" region="parent-property" header="src/app/app.component.ts"></code-example>

`@Input()` 데코레이터를 사용하면 부모 컴포넌트의 `currentItem` 프로퍼티 값이 자식 컴포넌트 `item` 프로퍼티로 전달되기 때문에 자식 컴포넌트 템플릿에 정의된 대로 `Television` 이라는 값이 화면에 렌더링됩니다.

아래 그림을 보면서 구조를 확인해 보세요:

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-diagram-target-source.svg" alt="Property binding diagram of the target, item, in square brackets set to the source, currentItem, on the right of an equal sign">
</div>

이 때 프로퍼티 바인딩 대상이 되는 프로퍼티는 부모 컴포넌트 템플릿에서 대괄호(`[]`)로 감싼 프로퍼티이며, 자식 컴포넌트 클래스에서 `@Input()` 데코레이터를 지정한 프로퍼티이기도 합니다.
바인딩 하는 대상은 등호(`=`) 오른쪽에 있는 부모 컴포넌트 클래스 프로퍼티입니다.


<!--
### Watching for `@Input()` changes
-->
### `@Input()` 변화 감지하기

<!--
To watch for changes on an `@Input()` property, use `OnChanges`, one of Angular's [lifecycle hooks](guide/lifecycle-hooks).
See the [`OnChanges`](guide/lifecycle-hooks#onchanges) section of the [Lifecycle Hooks](guide/lifecycle-hooks) guide for more details and examples.
-->
`@Input()` 프로퍼티로 전달되는 값이 변경되는 것을 감지하려면 Angular [라이프싸이클 후킹 함수](guide/lifecycle-hooks) 중 `OnChanges`를 활용하면 됩니다.
자세한 내용은 [라이프싸이클 후킹 함수](guide/lifecycle-hooks) 문서의 [`OnChanges`](guide/lifecycle-hooks#onchanges) 섹션을 참고하세요.


{@a output}

<!--
## Sending data to a parent component
-->
## 부모 컴포넌트로 데이터 전달하기

<!--
The `@Output()` decorator in a child component or directive lets data flow from the child to the parent.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/output.svg" alt="Output diagram of the data flow going from child to parent">
</div>

`@Output()` marks a property in a child component as a doorway through which data can travel from the child to the parent.

The child component uses the `@Output()` property to raise an event to notify the parent of the change.
To raise an event, an `@Output()` must have the type of `EventEmitter`, which is a class in `@angular/core` that you use to emit custom events.

The following example shows how to set up an `@Output()` in a child component that pushes data from an HTML `<input>` to an array in the parent component.

To use `@Output()`, you must configure the parent and child.
-->
자식 컴포넌트/디렉티브에 `@Output()` 데코레이터를 사용하면 부모 컴포넌트/디렉티브로 데이터를 전달할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/output.svg" alt="Output diagram of the data flow going from child to parent">
</div>

`@Output()` 데코레이터는 자식 컴포넌트 프로퍼티 중 부모 컴포넌트로 데이터를 보내는 프로퍼티를 지정하는 역할을 합니다.

그리고 나면 자식 컴포넌트에서 이벤트를 발생시켜서 부모 컴포넌트로 보내면 됩니다.
이벤트를 발생시키기 위해 `@Output()` 데코레이터는 반드시 `EventEmitter` 타입의 프로퍼티에 선언해야 합니다.
이 커스텀 이벤트 클래스는 `@angular/core` 패키지에서 제공하는 클래스입니다.

이번에는 자식 컴포넌트 템플릿에 있는 HTML `<input>` 엘리먼트에서 데이터를 받아 부모 컴포넌트로 전달하는 예제를 알아봅시다.

`@Output()` 데코레이터를 사용하려면 부모 컴포넌트와 자식 컴포넌트를 모두 수정해야 합니다.


<!--
### Configuring the child component
-->
### 자식 컴포넌트 설정하기

<!--
The following example features an `<input>` where a user can enter a value and click a `<button>` that raises an event. The `EventEmitter` then relays the data to the parent component.

1. Import `Output` and `EventEmitter` in the child component class:

  ```js
  import { Output, EventEmitter } from '@angular/core';

  ```

1. In the component class, decorate a property with `@Output()`.
  The following example `newItemEvent` `@Output()` has a type of `EventEmitter`, which means it's an event.

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output" header="src/app/item-output/item-output.component.ts"></code-example>

  The different parts of the preceding declaration are as follows:

    * `@Output()`&mdash;a decorator function marking the property as a way for data to go from the child to the parent
    * `newItemEvent`&mdash;the name of the `@Output()`
    * `EventEmitter<string>`&mdash;the `@Output()`'s type
    * `new EventEmitter<string>()`&mdash;tells Angular to create a new event emitter and that the data it emits is of type string.

  For more information on `EventEmitter`, see the [EventEmitter API documentation](api/core/EventEmitter).

1. Create an `addNewItem()` method in the same component class:

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output-class" header="src/app/item-output/item-output.component.ts"></code-example>

  The `addNewItem()` function uses the `@Output()`, `newItemEvent`, to raise an event with the value the user types into the `<input>`.
-->
이제부터 살펴볼 예제에서 사용자가 `<input>` 엘리먼트에 문자열을 입력하고 버튼을 클릭하면 이벤트를 발생시킵니다.
그리고 `EventEmitter`를 사용해서 부모 컴포넌트로 이 이벤트를 전달할 것입니다.

1. 자식 컴포넌트 클래스 파일에 `Output`, `EventEmitter` 심볼을 로드합니다:

  ```js
  import { Output, EventEmitter } from '@angular/core';

  ```

1. 컴포넌트 클래스에서 프로퍼티에 `@Output()` 데코레이터를 지정합니다.
  아래 예제 코드는 `EventEmitter` 타입으로 선언된 `newItemEvent` 프로퍼티에 `@Output()` 데코레이터를 지정한 코드입니다.

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output" header="src/app/item-output/item-output.component.ts"></code-example>

  이전 예제와는 이런 점이 다릅니다:

    * `@Output()`&mdash;자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하는 프로퍼티를 지정합니다.
    * `newItemEvent`&mdash;`@Output()` 데코레이터가 지정된 프로퍼티입니다.
    * `EventEmitter<string>`&mdash;`@Output()` 데코레이터의 타입입니다.
    * `new EventEmitter<string>()`&mdash;문자열 타입으로 이벤트를 전달하는 이벤트 이미터 인스턴스를 생성합니다.

  `EventEmitter`에 대해 자세하게 알아보려면 [EventEmitter API 문서](api/core/EventEmitter)를 참고하세요.

1. 자식 컴포넌트 클래스에 `addNewItem()` 메서드를 추가합니다:

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output-class" header="src/app/item-output/item-output.component.ts"></code-example>

  `addNewItem()` 함수는 `@Output()` 데코레이터가 지정된 `newItemEvent`를 활용해서 이벤트를 발생시키며, 이 때 `<input>` 엘리먼트에 사용자가 입력한 값을 함께 전달합니다.


<!--
### Configuring the child's template
-->
### 자식 컴포넌트 템플릿 설정하기

<!--
The child's template has two controls.
The first is an HTML `<input>` with a [template reference variable](guide/template-reference-variables) , `#newItem`, where the user types in an item name.
The `value` property of the `#newItem` variable stores what the user types into the `<input>`.

<code-example path="inputs-outputs/src/app/item-output/item-output.component.html" region="child-output" header="src/app/item-output/item-output.component.html"></code-example>

The second element is a `<button>` with a `click` [event binding](guide/event-binding).

The `(click)` event is bound to the `addNewItem()` method in the child component class.
The `addNewItem()` method takes as its argument the value of the `#newItem.value` property.
-->
자식 컴포넌트 템플릿에는 폼 컨트롤이 2개 있습니다.
하나는 사용자가 값을 입력할 수 있는 HTML `<input>` 엘리먼트이며, 이 엘리먼트에는 [템플릿 참조 변수](guide/template-reference-variables) `newItem`이 지정되어 있습니다.
사용자가 `<input>` 엘리먼트에 입력한 값을 참조하려면 `#newItem` 변수의 `value` 프로퍼티를 참조하면 됩니다.

<code-example path="inputs-outputs/src/app/item-output/item-output.component.html" region="child-output" header="src/app/item-output/item-output.component.html"></code-example>

그리고 다른 엘리먼트는 `click` [이벤트가 바인딩 된](guide/event-binding) `<button>` 엘리먼트입니다.

이 엘리먼트의 `(click)` 이벤트는 자식 컴포넌트 클래스의 `addNewItem()` 메서드와 바인딩 되어 있습니다.
`addNewItem()` 메서드는 `#newItem.value` 값을 인자로 받습니다.


<!--
### Configuring the parent component
-->
### 부모 컴포넌트 설정하기

<!--
The `AppComponent` in this example features a list of `items` in an array and a method for adding more items to the array.

<code-example path="inputs-outputs/src/app/app.component.ts" region="add-new-item" header="src/app/app.component.ts"></code-example>

The `addItem()` method takes an argument in the form of a string and then adds that string to the `items` array.
-->
이 문서에서 다루는 예제에서 `AppComponent`에는 항목들을 배열 형태로 저장하는 `items` 배열이 있습니다.

<code-example path="inputs-outputs/src/app/app.component.ts" region="add-new-item" header="src/app/app.component.ts"></code-example>

그리고 부모 컴포넌트의 `addItem()` 메서드는 인자로 받은 문자열을 `items` 배열에 저장합니다.


<!--
### Configuring the parent's template
-->
### 부모 컴포넌트 템플릿 설정하기

<!--
1. In the parent's template, bind the parent's method to the child's event.

1. Put the child selector, here `<app-item-output>`, within the parent component's template, `app.component.html`.

  <code-example path="inputs-outputs/src/app/app.component.html" region="output-parent" header="src/app/app.component.html"></code-example>

  The event binding, `(newItemEvent)='addItem($event)'`, connects the event in the child, `newItemEvent`, to the method in the parent, `addItem()`.

  The `$event` contains the data that the user types into the `<input>` in the child template UI.

  To see the `@Output()` working, add the following to the parent's template:

  ```html
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
  ```

  The `*ngFor` iterates over the items in the `items` array.
  When you enter a value in the child's `<input>` and click the button, the child emits the event and the parent's `addItem()` method pushes the value to the `items` array and new item renders in the list.
-->
1. 부모 컴포넌트 메서드와 자식 컴포넌트의 이벤트는 부모 컴포넌트 템플릿에서 바인딩 합니다.

1. 부모 컴포넌트 템플릿 파일 `app.component.html`에 자식 컴포넌트 셀렉터 `<app-item-output>`를 추가합니다.

  <code-example path="inputs-outputs/src/app/app.component.html" region="output-parent" header="src/app/app.component.html"></code-example>

  이벤트 바인딩 `(newItemEvent)='addItem($event)'`에 사용된 문법을 보면, 자식 컴포넌트에서 `newItemEvent` 이벤트가 발생하면 부모 컴포넌트 메서드 `addItem()`을 실행합니다.

  `$event` 객체는 자식 컴포넌트에서 보낸 데이터가 담겨 있습니다.
  이 예제에서는 자식 컴포넌트 템플릿의 `<input>`에 사용자가 입력한 값이 전달됩니다.

  `@Output()` 데코레이터가 동작하는 것을 확인하기 위해 부모 컴포넌트에 이런 코드를 추가합니다:

  ```html
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
  ```

  `*ngFor`는 `items` 배열을 순회하며 템플릿을 반복해서 렌더링합니다.
  이제 사용자가 자식 컴포넌트 템플릿에서 `<input>`에 값을 입력하고 버튼을 누르면 자식 컴포넌트에서 이벤트가 발생하며, 이벤트가 발생하면 이 이벤트와 바인딩된 부모 컴포넌트 `addItem()` 메서드가 실행되면서 `items` 배열에 새로운 항목이 추가되고 화면에 렌더링됩니다.


<!--
## Using `@Input()` and `@Output()` together
-->
## `@Input()`, `@Output()` 함께 사용하기

<!--
Use `@Input()` and `@Output()` on the same child component as follows:

<code-example path="inputs-outputs/src/app/app.component.html" region="together" header="src/app/app.component.html"></code-example>

The target, `item`, which is an `@Input()` property in the child component class, receives its value from the parent's property, `currentItem`.
When you click delete, the child component raises an event, `deleteRequest`, which is the argument for the parent's `crossOffItem()` method.

The following diagram shows the different parts of the `@Input()` and `@Output()` on the `<app-input-output>` child component.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-output-diagram.svg" alt="Diagram of an input target and an output target each bound to a source.">
</div>

The child selector is `<app-input-output>` with `item` and `deleteRequest` being `@Input()` and `@Output()`
properties in the child component class.
The property `currentItem` and the method `crossOffItem()` are both in the parent component class.

To combine property and event bindings using the banana-in-a-box
syntax, `[()]`, see [Two-way Binding](guide/two-way-binding).
-->
`@Input()` 데코레이터와 `@Output()` 데코레이터는 자식 컴포넌트에서 함께 사용할 수도 있습니다:

<code-example path="inputs-outputs/src/app/app.component.html" region="together" header="src/app/app.component.html"></code-example>

`@Input()` 데코레이터가 지정된 `item` 프로퍼티는 부모 컴포넌트의 `currentItem` 프로퍼티에서 값을 받아옵니다.
그리고 사용자가 삭제 버튼을 클릭하면 자식 컴포넌트에서 `deleteRequest` 이벤트가 발생하는데, 이 이벤트는 부모 컴포넌트가 감지하고 있다가 `crossOffItem()` 메서드를 실행합니다.

아래 그림을 보면서 자식 컴포넌트 `<app-input-output>`에 사용된 `@Input()` 데코레이터와 `@Output()` 데코레이터가 어떻게 연결되는지 확인해 보세요.

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-output-diagram.svg" alt="Diagram of an input target and an output target each bound to a source.">
</div>

이 코드에서 자식 컴포넌트 셀렉터는 `<app-input-output>`이며, 자식 컴포넌트에 있는 `item` 프로퍼티와 `deleteRequest` 프로퍼티는 각각 `@Input()` 데코레이터와 `@Output()` 데코레이터가 지정되었습니다.
그리고 `currentItem` 프로퍼티와 `crossOffItem()` 메서드는 부모 컴포넌트 클래스에 정의되어 있습니다.

프로퍼티 바인딩과 이벤트 바인딩을 결합한 _상자 안에 있는 바나나 (`[()]`)_ 문법에 대해 자세하게 알아보려면 [양방향 바인딩](guide/two-way-binding) 문서를 참고하세요.

@reviewed 2021-09-17
