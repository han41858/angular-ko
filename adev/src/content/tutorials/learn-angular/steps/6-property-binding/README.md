<!--
# Property Binding in Angular
-->
# 프로퍼티 바인딩

<!--
Property binding in Angular enables you to set values for properties of HTML elements, Angular components and more.

Use property binding to dynamically set values for properties and attributes. You can do things such as toggle button features, set image paths programmatically, and share values between components.

NOTE: Learn more about [setting dynamic properties and attributes in the essentials guide](/essentials/templates#setting-dynamic-properties-and-attributes).

In this activity, you'll learn how to use property binding in templates.

<hr />

To bind to an element's attribute, wrap the attribute name in square brackets. Here's an example:

```angular-html
<img alt="photo" [src]="imageURL" />
```

In this example, the value of the `src` attribute will be bound to the class property `imageURL`. Whatever value `imageURL` has will be set as the `src` attribute of the `img` tag.

<docs-workflow>

<docs-step title="Add a property called `isEditable`" header="app.ts" language="ts">
Update the code in `app.ts` by adding a property to the `App` class called `isEditable` with the initial value set to `true`.

```ts {highlight:[2]}
export class App {
  isEditable = true;
}
```

</docs-step>

<docs-step title="Bind to `contentEditable`" header="app.ts" language="ts">
Next, bind the `contentEditable` attribute of the `div` to the `isEditable` property by using the <code aria-label="square brackets">[]</code> syntax.

```angular-ts {highlight:[3]}
@Component({
  ...
  template: `<div [contentEditable]="isEditable"></div>`,
})
```

</docs-step>

</docs-workflow>

The div is now editable. Nice work 👍

Property binding is one of Angular's many powerful features. If you'd like to learn more checkout [the Angular documentation](guide/templates/binding#css-class-and-style-property-bindings).
-->
프로퍼티 바인딩(property binding)을 활용하면 HTML 엘리먼트나 Angular 컴포넌트의 프로퍼티 값을 원하는 값으로 설정할 수 있습니다.

동적으로 변경되는 값을 프로퍼티나 어트리뷰트에 바인딩할 때는 프로퍼티 바인딩을 사용하면 됩니다.
이런 기능은 버튼을 토글하거나 로직으로 이미지를 변경할 때, 컴포넌트 사이에 값을 전달해야 할 때 사용합니다.

참고: [동적 프로퍼티, 어트리뷰트 값 설정하기 핵심 가이드](/essentials/templates#setting-dynamic-properties-and-attributes) 문서를 참고하세요.

이제 프로퍼티 바인딩을 어떻게 사용할 수 있는지 알아봅시다.

<hr />

엘리먼트의 어트리뷰트를 바인딩하려면 어트리뷰트 이름을 대괄호(`[`, `]`)로 감싸면 됩니다:

```angular-html
<img alt="photo" [src]="imageURL">
```

이 예제에서는 엘리먼트의 `src` 어트리뷰트 값이 클래스 프로퍼티 `imageURL`과 바인딩 되어 있습니다.
그래서 `imageURL` 값이 변경되면 `img` 태그의 `src` 어트리뷰트도 같은 값으로 변경됩니다.

<docs-workflow>

<docs-step title="`isEditable` 프로퍼티를 추가해 보세요" header="app.ts" language="ts">

`app.ts` 파일에 있는 `App` 컴포넌트 클래스에 `isEditable` 프로퍼티를 추가하고 초기값으로 `true`를 설정해 보세요.

```ts {highlight:[2]}
export class App {
  isEditable = true;
}
```
</docs-step>

<docs-step title="`contentEditable`에 바인딩 해보세요" header="app.ts" language="ts">

그 다음은 `div` 엘리먼트의 `contentEditable` 어트리뷰트와 `isEditable` 프로퍼티를 <code aria-label="square brackets">[]</code> 문법으로 바인딩 하면 됩니다.

```angular-ts {highlight:[3]}
@Component({
  ...
  template: `<div [contentEditable]="isEditable"></div>`,
})
```
</docs-step>

</docs-workflow>

이제 div는 수정할 수 있는 div가 되었습니다. 훌륭하군요 👍

프로퍼티 바인딩은 Angular 앱을 개발할 때 매우 자주 사용되는 기능입니다.
자세한 내용은 [이 문서](guide/templates/binding#css-class-and-style-property-bindings)를 참고하세요.
