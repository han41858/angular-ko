<!--
# Binding dynamic text, properties and attributes
-->

# 문자열, 프로퍼티, 어트리뷰트를 동적으로 바인딩하기

<!--
In Angular, a **binding** creates a dynamic connection between a component's template and its data. This connection ensures that changes to the component's data automatically update the rendered template.
-->

**바인딩(binding)** 은 컴포넌트의 템플릿과 데이터를 연결하는 것을 의미합니다.
템플릿과 데이터를 바인딩하고 나면, 컴포넌트 데이터가 변경되더라도 템플릿에 언제나 최신 정보가 갱신됩니다.

<!--
## Render dynamic text with text interpolation
-->

## 문자열 바인딩

<!--
You can bind dynamic text in templates with double curly braces, which tells Angular that it is responsible for the expression inside and ensuring it is updated correctly. This is called **text interpolation**.

```angular-ts
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class App {
  theme = 'dark';
}
```

In this example, when the snippet is rendered to the page, Angular will replace `{{ theme }}` with `dark`.

```angular-html
<!- Rendered Output ->
<p>Your color preference is dark.</p>
```

Bindings that change over time should read values from [signals](/guide/signals). Angular tracks the signals read in the template, and updates the rendered page when those signal values change.

```angular-ts
@Component({
  template: `
    <!- Does not necessarily update when `welcomeMessage` changes. ->
    <p>{{ welcomeMessage }}</p>

    <p>Your color preference is {{ theme() }}.</p> <!- Always updates when the value of the `theme` signal changes. ->
`
...
})
export class App {
welcomeMessage = "Welcome, enjoy this app that we built for you";
theme = signal('dark');
}
```

For more details, see the [Signals guide](/guide/signals).

Continuing the theme example, if a user clicks on a button that updates the `theme` signal to `'light'` after the page loads, the page updates accordingly to:

```angular-html
<!- Rendered Output ->
<p>Your color preference is light.</p>
```

You can use text interpolation anywhere you would normally write text in HTML.

All expression values are converted to a string. Objects and arrays are converted using the value’s `toString` method.
-->

문자열을 바인딩하려면 이중 중괄호(`{{`, `}}`)를 사용하고 괄호 안에 표현식을 작성하면 됩니다.

```angular-ts
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class App {
  theme = 'dark';
}
```

이렇게 구현하면 Angular는 `{{ theme }}`를 `dark` 로 변환해서 화면에 렌더링합니다.

```angular-html
<!-- 렌더링 결과 -->
<p>Your color preference is dark.</p>
```

시간이 경과하며 값이 변경된다면 [시그널](/guide/signals)을 활용하면 됩니다.
시그널이 템플릿에 사용되면 Angular가 이 시그널을 추적하면서 값이 변경될 때마다 화면도 자동으로 갱신합니다.

```angular-ts
@Component({
  template: `
    <!-- `welcomeMessage` 가 변경되더라도 갱신되지 않습니다. -->
    <p>{{ welcomeMessage }}</p>

    <p>Your color preference is {{ theme() }}.</p> <!-- `name` 시그널 값이 변경되면 언제나 갱신됩니다. -->
  `
  ...
})
export class App {
  welcomeMessage = "Welcome, enjoy this app that we built for you";
  theme = signal('dark');
}
```

자세한 내용은 [시그널 문서](/guide/signals)를 참고하세요.

예시를 좀 더 보면, 화면이 표시된 후에 사용자가 버튼을 클릭하면 `theme` 시그널이 `'light'` 값으로 변경됩니다:

```angular-html
<!-- 렌더링 결과 -->
<p>Your color preference is light.</p>
```

HTML에 문자열을 표시하고 싶은 곳이라면 어느 곳에든 문자열 바인딩을 활용할 수 있습니다.

문자열 바인딩 표현식은 모두 문자열 타입으로 변환됩니다.
표현식의 결과가 객체나 배열이라면 `toString()` 메서드 실행 결과가 사용됩니다.

<!--
## Binding dynamic properties and attributes
-->

## 동적 프로퍼티, 어트리뷰트 바인딩

<!--
Angular supports binding dynamic values into object properties and HTML attributes with square brackets.

You can bind to properties on an HTML element's DOM instance, a [component](/guide/components) instance, or a [directive](/guide/directives) instance.
-->

대괄호(`[`, `]`)를 사용하면 객체 프로퍼티와 HTML 어트리뷰트를 바인딩 할 수 있습니다.

이 때 프로퍼티는 HTML 엘리먼트의 DOM 인스턴스이거나, [컴포넌트](guide/components) 인스턴스이거나, [디렉티브](guide/directives) 인스턴스 일 수 있습니다.

<!--
### Native element properties
-->

### 기본 엘리먼트 프로퍼티

<!--
Every HTML element has a corresponding DOM representation. For example, each `<button>` HTML element corresponds to an instance of `HTMLButtonElement` in the DOM. In Angular, you use property bindings to set values directly to the DOM representation of the element.

```angular-html
<!- Bind the `disabled` property on the button element's DOM object ->
<button [disabled]="isFormValid()">Save</button>
```

In this example, every time `isFormValid` changes, Angular automatically sets the `disabled` property of the `HTMLButtonElement` instance.
-->

HTML 엘리먼트는 DOM 표현과 연결됩니다.
예를 들어 `<button>` HTML 엘리먼트는 DOM에서 `HTMLButtonElement` 인스턴스와 대응됩니다.
Angular 측면에서 보면, 프로퍼티와 바인딩된 값은 엘리먼트의 DOM 인스턴스와 직접 연결됩니다.

```angular-html
<!-- `disabled` 프로퍼티는 버튼 엘리먼트의 DOM 객체와 바인딩 됩니다. -->
<button [disabled]="isFormValid()">Save</button>
```

이렇게 구현하면 `isFormValid` 값이 변경될 때마다 Angular가 자동으로 `HTMLButtonElement` 인스턴스에 있는 `disabled` 프로퍼티 값을 변경합니다.

<!--
### Component and directive properties
-->

### 컴포넌트와 디렉티브 프로퍼티

<!--
When an element is an Angular component, you can use property bindings to set component input properties using the same square bracket syntax.

```angular-html
<!- Bind the `value` property on the `MyListbox` component instance. ->
<my-listbox [value]="mySelection()" />
```

In this example, every time `mySelection` changes, Angular automatically sets the `value` property of the `MyListbox` instance.

You can bind to directive properties as well.

```angular-html
<!- Bind to the `ngSrc` property of the `NgOptimizedImage` directive  ->
<img [ngSrc]="profilePhotoUrl()" alt="The current user's profile photo" />
```
-->

바인딩하려는 프로퍼티가 Angular 컴포넌트라면, 대괄호를 사용하는 프로퍼티 바인딩은 컴포넌트의 입력 프로퍼티와 바인딩됩니다.

```angular-html
<!-- `MyListbox` 컴포넌트 인스턴스에 있는 `value` 프로퍼티와 바인딩 됩니다. -->
<my-listbox [value]="mySelection()" />
```

이렇게 구현하면 `mySelection` 값이 변경될 때마다 Angular가 자동으로 `MyListbox` 인스턴스의 `value` 프로퍼티 값을 변경합니다.

디렉티브도 같은 방식으로 바인딩 됩니다.

```angular-html
<!-- `NgOptimizedImage` 디렉티브의 `ngSrc` 프로퍼티와 바인딩 됩니다.  -->
<img [ngSrc]="profilePhotoUrl()" alt="The current user's profile photo" />
```

<!--
### Attributes
-->

### 어트리뷰트

<!--
When you need to set HTML attributes that do not have corresponding DOM properties, such as SVG attributes, you can bind attributes to elements in your template with the `attr.` prefix.

<!- prettier-ignore ->
```angular-html
<!- Bind the `role` attribute on the `<ul>` element to the component's `listRole` property. ->
<ul [attr.role]="listRole()">
```

In this example, every time `listRole` changes, Angular automatically sets the `role` attribute of the `<ul>` element by calling `setAttribute`.

If the value of an attribute binding is `null`, Angular removes the attribute by calling `removeAttribute`.
-->

SVG 어트리뷰트와 같이 연관된 DOM 프로퍼티가 존재하지 않는 경우에는 템플릿 엘리먼트에 `attr.` 접두사를 붙여서 어트리뷰트와 바인딩 할 수 있습니다.

```angular-html
<!-- Bind the `role` attribute on the `<ul>` element to the component's `listRole` property. -->
<ul [attr.role]="listRole()"></ul>
```

이렇게 구현하면 `listRole` 값이 변경될 때마다 Angular가 자동으로 `<ul>` 엘리먼트의 `setAttribute`를 실행해서 `role` 어트리뷰트 값을 변경합니다.

이 때 어트리뷰트에 바인딩되는 값이 `null`이면, Angular가 `removeAttribute`를 실행해서 어트리뷰트를 제거합니다.

<!--
### Text interpolation in properties and attributes
-->

### 프로퍼티와 어트리뷰트를 바인딩 할 때 문자열 바인딩

<!--
You can also use text interpolation syntax in properties and attributes by using the double curly brace syntax instead of square braces around the property or attribute name. When using this syntax, Angular treats the assignment as a property binding.

```angular-html
<!- Binds a value to the `alt` property of the image element's DOM object. ->
<img src="profile-photo.jpg" alt="Profile photo of {{ firstName() }}" />
```
-->

프로퍼티나 어트리뷰트 이름에 대괄호를 사용하는 대신 이중 중괄호를 사용하면 프로퍼티나 어트리뷰트에 문자열 바인딩을 연결할 수 있습니다.

```angular-html
<!-- 이미지 엘리먼트의 DOM 객체와 `alt` 프로퍼티를 바인딩합니다. -->
<img src="profile-photo.jpg" alt="Profile photo of {{ firstName() }}" />
```

<!--
## CSS class and style property bindings
-->

## CSS 클래스 바인딩, 스타일 프로퍼티 바인딩

<!--
Angular supports additional features for binding CSS classes and CSS style properties to elements.
-->

Angular는 CSS 클래스 바인딩과 CSS 스타일 프로퍼티 바인딩도 지원합니다.

<!--
### CSS classes
-->

### CSS 클래스

<!--
You can create a CSS class binding to conditionally add or remove a CSS class on an element based on whether the bound value is [truthy or falsy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

<!- prettier-ignore ->
```angular-html
<!- When `isExpanded` is truthy, add the `expanded` CSS class. ->
<ul [class.expanded]="isExpanded()">
```

You can also bind directly to the `class` property. Angular accepts three types of value:

| Description of `class` value                                                                                                                                      | TypeScript type       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| A string containing one or more CSS classes separated by spaces                                                                                                   | `string`              |
| An array of CSS class strings                                                                                                                                     | `string[]`            |
| An object where each property name is a CSS class name and each corresponding value determines whether that class is applied to the element, based on truthiness. | `Record<string, any>` |

```angular-ts
@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses()"> ... </section>
    <button [class]="buttonClasses()"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = signal(['expandable', 'elevated']);
  buttonClasses = signal({
    highlighted: true,
    embiggened: false,
  });
}
```

The above example renders the following DOM:

<!- prettier-ignore ->
```angular-html
<ul class="full-width outlined"> ... </ul>
<section class="expandable elevated"> ... </section>
<button class="highlighted"> ... </button>
```

Angular ignores any string values that are not valid CSS class names.

When using static CSS classes, directly binding `class`, and binding specific classes, Angular intelligently combines all of the classes in the rendered result.

```angular-ts
@Component({
  template: `<ul class="list" [class]="listType()" [class.expanded]="isExpanded()"> ...`,
  ...
})
export class Listbox {
  listType = signal('box');
  isExpanded = signal(true);
}
```

In the example above, Angular renders the `ul` element with all three CSS classes.

<!- prettier-ignore ->
```angular-html
<ul class="list box expanded">
```

Angular does not guarantee any specific order of CSS classes on rendered elements.

When binding `class` to an array or an object, Angular compares the previous value to the current value with the triple-equals operator (`===`). You must create a new object or array instance when you modify these values in order for Angular to apply any updates.

If an element has multiple bindings for the same CSS class, Angular resolves collisions by following its style precedence order.

NOTE: Class bindings do not support space-separated class names in a single key. They also don't support mutations on objects as the reference of the binding remains the same. If you need one or the other, use the [ngClass](/api/common/NgClass) directive.
-->

바인딩되는 값이 [참인지, 거짓인지](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)에 따라 CSS 클래스를 조건부로 적용할 수 있습니다.

```angular-html
<!-- When `isExpanded` is truthy, add the `expanded` CSS class. -->
<ul [class.expanded]="isExpanded()"></ul>
```

`class` 프로퍼티를 직접 바인딩하는 방법도 있습니다.
이 경우 세 가지 타입을 사용할 수 있습니다:

| `class` 값 설명                                                                     | TypeScript 타입       |
| ----------------------------------------------------------------------------------- | --------------------- |
| 띄어쓰기로 구분하는 1개 이상의 CSS 클래스 문자열                                    | `string`              |
| CSS 클래스 문자열의 배열                                                            | `string[]`            |
| 프로퍼티 이름을 CSS 클래스 이름으로 하고, 개별 값이 참으로 평가되는지 표현하는 객체 | `Record<string, any>` |

```angular-ts
@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses()"> ... </section>
    <button [class]="buttonClasses()"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = signal(['expandable', 'elevated']);
  buttonClasses = signal({
    highlighted: true,
    embiggened: false,
  });
}
```

위 코드처럼 구현하면 DOM은 다음과 같이 렌더링됩니다:

```angular-html
<ul class="full-width outlined">
  ...
</ul>
<section class="expandable elevated">...</section>
<button class="highlighted">...</button>
```

유효하지 않은 CSS 클래스 이름은 무시합니다.

정적 CSS 클래스를 사용하거나 `class`를 직접 바인딩하거나, 특정 클래스를 바인딩하는 경우가 겹치면 Angular는 지능적으로 결과를 조합합니다.

```angular-ts
@Component({
  template: `<ul class="list" [class]="listType()" [class.expanded]="isExpanded()"> ...`,
  ...
})
export class Listbox {
  listType = signal('box');
  isExpanded = signal(true);
}
```

위 코드처럼 구현하면 Angular는 `ul` 엘리먼트에 3개의 CSS 클래스를 모두 적용합니다.

```angular-html
<ul class="list box expanded"></ul>
```

엘리먼트에 CSS 클래스가 적용되는 순서는 보장하지 않습니다.

`class`를 바인딩하면서 배열이나 객체를 사용한 경우에는, Angular가 이전 값과 현재 값을 동등 연산자(`===`)로 비교합니다.
그래서 객체나 배열 내부의 값이 변경되었다면 새 객체와 새 배열을 사용해야 변경사항이 제대로 반영됩니다.

엘리먼트에 같은 CSS가 여러번 바인딩되면, 우선순위에 따라 충돌을 해결합니다.

참고: 클래스 바인딩은 키 하나에 공백으로 구분되는 여러개 클래스 이름을 지정할 수 없습니다.
그리고 바인딩 객체의 참조가 동일하게 유지되기 때문에 객체 변경도 지원하지 않습니다.
둘 중 하나가 필요한 경우에는 [ngClass](/api/common/NgClass) 디렉티브를 사용하세요.

<!--
### CSS style properties
-->

### CSS 스타일 프로퍼티

<!--
You can also bind to CSS style properties directly on an element.

<!- prettier-ignore ->
```angular-html
<!- Set the CSS `display` property based on the `isExpanded` property. ->
<section [style.display]="isExpanded() ? 'block' : 'none'">
```

You can further specify units for CSS properties that accept units.

<!- prettier-ignore ->
```angular-html
<!- Set the CSS `height` property to a pixel value based on the `sectionHeightInPixels` property. ->
<section [style.height.px]="sectionHeightInPixels()">
```

You can also set multiple style values in one binding. Angular accepts the following types of value:

| Description of `style` value                                                                                              | TypeScript type       |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| A string containing zero or more CSS declarations, such as `"display: flex; margin: 8px"`.                                | `string`              |
| An object where each property name is a CSS property name and each corresponding value is the value of that CSS property. | `Record<string, any>` |

```angular-ts
@Component({
  template: `
    <ul [style]="listStyles()"> ... </ul>
    <section [style]="sectionStyles()"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = signal('display: flex; padding: 8px');
  sectionStyles = signal({
    border: '1px solid black',
    'font-weight': 'bold',
  });
}
```

The above example renders the following DOM.

<!- prettier-ignore ->
```angular-html
<ul style="display: flex; padding: 8px"> ... </ul>
<section style="border: 1px solid black; font-weight: bold"> ... </section>
```

When binding `style` to an object, Angular compares the previous value to the current value with the triple-equals operator (`===`). You must create a new object instance when you modify these values in order for Angular to apply any updates.

If an element has multiple bindings for the same style property, Angular resolves collisions by following its style precedence order.
-->

엘리먼트에 CSS 스타일 프로퍼티를 직접 바인딩 할 수도 있습니다.

```angular-html
<!-- `isExpanded` 프로퍼티 값에 따라 CSS `display` 프로퍼티 값을 설정합니다. -->
<section [style.display]="isExpanded() ? 'block' : 'none'"></section>
```

이 때 단위를 함께 지정할 수 있습니다.

```angular-html
<!-- `sectionHeightInPixels` 프로퍼티 값에 따라 CSS `height` 프로퍼티를 픽셀 단위로 설정합니다. -->
<section [style.height.px]="sectionHeightInPixels()"></section>
```

바인딩 구문 하나에 여러 스타일을 바인딩할 수도 있습니다.
이 경우 세 가지 타입을 사용할 수 있습니다:

| `style` 값 설명                                                                   | TypeScript 타입       |
| --------------------------------------------------------------------------------- | --------------------- |
| `"display: flex; margin: 8px"`와 같은 CSS 선언 문자열                             | `string`              |
| 프로퍼티 이름을 CSS 프로퍼티 이름으로 하고, 개별 값이 해당 CSS 프로퍼티 값인 객체 | `Record<string, any>` |

```angular-ts
@Component({
  template: `
    <ul [style]="listStyles()"> ... </ul>
    <section [style]="sectionStyles()"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = signal('display: flex; padding: 8px');
  sectionStyles = signal({
    border: '1px solid black',
    'font-weight': 'bold',
  });
}
```

위 코드처럼 구현하면 DOM은 다음과 같이 렌더링됩니다:

```angular-html
<ul style="display: flex; padding: 8px">
  ...
</ul>
<section style="border: 1px solid black; font-weight: bold">...</section>
```

`style`에 객체를 바인딩하면 Angular는 이전값과 현재값을 동등 연산자(`===`)로 비교합니다.
그래서 객체 내부의 값이 변경되었다면 새 객체를 사용해야 변경사항이 제대로 반영됩니다.

엘리먼트에 같은 스타일 프로퍼티가 여러번 바인딩되면, 우선순위에 따라 충돌을 해결합니다.

<!--
## ARIA attributes
-->

## ARIA 어트리뷰트

<!--
Angular supports binding string values to ARIA attributes.

```angular-html
<button type="button" [aria-label]="actionLabel()">
  {{ actionLabel() }}
</button>
```

Angular writes the string value to the element’s `aria-label` attribute and removes it when the bound value is `null`.

Some ARIA features expose DOM properties or directive inputs that accept structured values (such as element references). Use standard property bindings for those cases. See the [accessibility guide](/best-practices/a11y#aria-attributes-and-properties) for examples and additional guidance.
-->

ARIA 어트리뷰트에 문자열을 바인딩 할 수 있습니다.

```angular-html
<button type="button" [aria-label]="actionLabel()">
  {{ actionLabel() }}
</button>
```

Angular는 바인딩 된 값에 따라 해당 문자열을 엘리먼트의 `aria-label` 어트리뷰트에 지정하고, 바인딩 된 값이 `null`이면 어트리뷰트를 제거합니다.

일부 ARIA 기능은 엘리먼트 참조와 같이 어떤 형식을 요구하는 경우가 있습니다.
이런 경우는 일반적인 프로퍼티 바인딩을 사용하세요.
자세한 내용은 [접근성 가이드](best-practices/a11y#aria-attributes-and-properties)에서 예제와 함께 확인할 수 있습니다.
