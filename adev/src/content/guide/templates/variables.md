<!--
# Variables in templates
-->
# 템플릿 변수

<!--
Angular has two types of variable declarations in templates: local template variables and template reference variables.
-->
Angular 템플릿에서는 템플릿 지역 변수와 템플릿 참조 변수를 선언해서 활용할 수 있습니다.

<!--
## Local template variables with `@let`
-->
## 템플릿 지역 변수(Local template variables): `@let`

<!--
Angular's `@let` syntax allows you to define a local variable and re-use it across a template, similar to the [JavaScript `let` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).
-->
Angular가 제공하는 `@let` 문법을 사용하면 템플릿에서 지역 변수를 선언해서 재사용할 수 있습니다.
이 방식은 [JavaScript `let` 문법](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)과 비슷합니다.


<!--
### Using `@let`
-->
### `@let` 활용하기

<!--
Use `@let` to declare a variable whose value is based on the result of a template expression. Angular automatically keeps the variable's value up-to-date with the given expression, similar to [bindings](./templates/bindings).

```angular-html
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
@let longExpression = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ' +
                      'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                      'Ut enim ad minim veniam...';
```

Each `@let` block can declare exactly one variable. You cannot declare multiple variables in the same block with a comma.
-->
템플릿 지역 변수를 선언하려면 `@let`을 사용하면 되고, 템플릿 지역 변수의 값은 표현식의 실행 결과로 할당됩니다.
이 값은 [바인딩](./templates/bindings)과 비슷하게 Angular가 값이 변경되는 것을 추적합니다.

```angular-html
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
@let longExpression = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ' +
                      'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                      'Ut enim ad minim veniam...';
```

`@let` 블록은 각각 변수 하나를 선언합니다.
쉼표(`,`)를 사용하는 것처럼 블록 하나에서 변수 여러개를 한 번에 선언할 수는 없습니다.


<!--
### Referencing the value of `@let`
-->
### `@let`으로 값 참조하기

<!--
Once you've declared a variable with `@let`, you can reuse it in the same template:

```angular-html
@let user = user$ | async;

@if (user) {
  <h1>Hello, {{user.name}}</h1>
  <user-avatar [photo]="user.photo"/>

  <ul>
    @for (snack of user.favoriteSnacks; track snack.id) {
      <li>{{snack.name}}</li>
    }
  </ul>

  <button (click)="update(user)">Update profile</button>
}
```
-->
`@let`으로 변수를 선언하고 나면, 해당 템플릿 안에서는 지역 변수를 자유롭게 사용할 수 있습니다:

```angular-html
@let user = user$ | async;

@if (user) {
  <h1>Hello, {{user.name}}</h1>
  <user-avatar [photo]="user.photo"/>

  <ul>
    @for (snack of user.favoriteSnacks; track snack.id) {
      <li>{{snack.name}}</li>
    }
  </ul>

  <button (click)="update(user)">Update profile</button>
}
```


<!--
### Assignability
-->
### 재할당 불가

<!--
A key difference between `@let` and JavaScript's `let` is that `@let` cannot be reassigned after declaration. However, Angular automatically keeps the variable's value up-to-date with the given expression.

```angular-html
@let value = 1;

<!- Invalid - This does not work! ->
<button (click)="value = value + 1">Increment the value</button>
```
-->
Angular 템플릿이 제공하는 `@let`은 JavaScript `let`과 다르게 한 번 선언한 뒤에 값을 재할당할 수 없습니다.
Angular에서는 값을 재할당하지 않아도 표현식의 결과에 따라 가장 최근에 계산된 값이 자동으로 갱신됩니다.

```angular-html
@let value = 1;

<!-- 잘못된 문법 - 동작하지 않습니다! -->
<button (click)="value = value + 1">Increment the value</button>
```


<!--
### Variable scope
-->
### 접근 범위

<!--
`@let` declarations are scoped to the current view and its descendants. Angular creates a new view at component boundaries and wherever a template might contain dynamic content, such as control flow blocks, `@defer` blocks, or structural directives.

Since `@let` declarations are not hoisted, they **cannot** be accessed by parent views or siblings:

```angular-html
@let topLevel = value;

<div>
  @let insideDiv = value;
</div>

{{topLevel}} <!- Valid ->
{{insideDiv}} <!- Valid ->

@if (condition) {
  {{topLevel + insideDiv}} <!- Valid ->

  @let nested = value;

  @if (condition) {
    {{topLevel + insideDiv + nested}} <!- Valid ->
  }
}

{{nested}} <!- Error, not hoisted from @if ->
```
-->
`@let` 으로 선언한 변수는 해당 뷰과 해당 뷰의 자식 뷰에서 접근할 수 있습니다.
그리고 `@defer` 블록이나 구조 디렉티브와 같은 흐름 제어 블록으로 컨텐츠가 동적으로 갱신되는 경우도 변수의 접근 범위에 포함됩니다.

하지만 `@let`으로 선언한 변수는 호이스팅(hoisting)되지 않기 때문에 부모 뷰나 이웃 뷰에서는 참조할 수 없습니다:

```angular-html
@let topLevel = value;

<div>
  @let insideDiv = value;
</div>

{{topLevel}} <!-- 유효함 -->
{{insideDiv}} <!-- 유효함 -->

@if (condition) {
  {{topLevel + insideDiv}} <!-- 유효함 -->

  @let nested = value;

  @if (condition) {
    {{topLevel + insideDiv + nested}} <!-- 유효함 -->
  }
}

{{nested}} <!-- 오류, @if 밖으로 호이스팅되지 않습니다. -->
```


<!--
### Full syntax
-->
### 전체 문법

<!--
The `@let` syntax is formally defined as:

- The `@let` keyword.
- Followed by one or more whitespaces, not including new lines.
- Followed by a valid JavaScript name and zero or more whitespaces.
- Followed by the = symbol and zero or more whitespaces.
- Followed by an Angular expression which can be multi-line.
- Terminated by the `;` symbol.
-->
`@let` 문법을 자세하게 살펴보면 이렇습니다:

- `@let` 키워드
- 뒤에 줄바꿈을 제외하고 하나 이상 공백 문자가 옵니다.
- 뒤에 JavaScript 문법으로 유효한 이름이 오고 공백 문자가 올 수 있습니다.
- 뒤에 `=` 심볼이 오고, 공백 문자가 올 수 있습니다.
- 뒤에 Angular 표현식이 오며, 이 표현식은 여러 줄일 수 있습니다.
- `;` 심볼로 종료됩니다.


<!--
## Template reference variables
-->
## 템플릿 참조 변수(Template reference variables)

<!--
Template reference variables give you a way to declare a variable that references a value from an element in your template.

A template reference variable can refer to the following:

- a DOM element within a template (including [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements))
- an Angular component or directive
- a [TemplateRef](/api/core/TemplateRef) from an [ng-template](/api/core/ng-template)

You can use template reference variables to read information from one part of the template in another part of the same template.
-->
템플릿 참조 변수를 활용하면 템플릿에 있는 엘리먼트를 참조할 수 있습니다.

템플릿 참조 변수는 이런 것들을 가리킬 수 있습니다:

- 템플릿에 존재하는 DOM 엘리먼트 ([커스텀 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)를 포함)
- Angular 컴포넌트나 디렉티브
- [ng-template](/api/core/ng-template)을 의미하는 [TemplateRef](/api/core/TemplateRef) 객체

그래서 템플릿 참조 변수를 활용하면 템플릿 안에 존재하는 어떤 부분을 다른 쪽에서 참조할 수 있습니다.


<!--
### Declaring a template reference variable
-->
### 템플릿 참조 변수 선언하기

<!--
You can declare a variable on an element in a template by adding an attribute that starts with the hash character (`#`) followed by the variable name.

```angular-html
<!- Create a template reference variable named "taskInput", referring to the HTMLInputElement. ->
<input #taskInput placeholder="Enter task name">
```
-->
템플릿에 있는 엘리먼트에 변수를 선언하려면 변수 이름 앞에 해시 문자(`#`)를 붙이면 됩니다.

```angular-html
<!-- `taskInput` 이라는 템플릿 참조 변수를 선언합니다. 이 변수는 HTMLInputElement를 가리킵니다. -->
<input #taskInput placeholder="Enter task name">
```


<!--
### Assigning values to template reference variables
-->
### 템플릿 참조 변수에 값 할당하기

<!--
Angular assigns a value to template variables based on the element on which the variable is declared.

If you declare the variable on a Angular component, the variable refers to the component instance.

```angular-html
<!- The `startDate` variable is assigned the instance of `MyDatepicker`. ->
<my-datepicker #startDate />
```

If you declare the variable on an `<ng-template>` element, the variable refers to a TemplateRef instance which represents the template. For more information, see [How Angular uses the asterisk, \*, syntax](/guide/directives/structural-directives#structural-directive-shorthand) in [Structural directives](/guide/directives/structural-directives).

```angular-html
<!- The `myFragment` variable is assigned the `TemplateRef` instance corresponding to this template fragment. ->
<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

If you declare the variable on any other displayed element, the variable refers to the `HTMLElement` instance.

```angular-html
<!- The "taskInput" variable refers to the HTMLInputElement instance. ->
<input #taskInput placeholder="Enter task name">
```
-->
Angular는 변수가 선언된 엘리먼트를 기준으로 템플릿 변수의 값을 할당합니다.

Angular 컴포넌트에 변수를 선언하면 이 변수는 컴포넌트 인스턴스를 가리킵니다.

```angular-html
<!-- 변수 `startDate`는 `MyDatepicker` 인스턴스를 가리킵니다. -->
<my-datepicker #startDate />
```

그리고 `<ng-template>` 엘리먼트에 템플릿 참조 변수를 선언하면, 이 변수는 템플릿을 의미하는 TemplateRef 인스턴스를 가리킵니다.
자세한 내용은 [구조 디렉티브](/guide/directives/structural-directives) 문서의 [Angular가 별표(asterisk, \*)를 활용하는 방법](/guide/directives/structural-directives#structural-directive-shorthand) 섹션을 참고하세요.

```angular-html
<!-- 변수 `myFragment`는 템플릿 조각을 의미하는 `TemplateRef` 인스턴스를 가리킵니다. -->
<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

마지막으로 일반 엘리먼트에 템플릿 참조 변수를 선언하면, 이 변수는 `HTMLElement` 인스턴스를 가리킵니다.

```angular-html
<!-- 변수 `taskInput`는 HTMLInputElement 인스턴스를 가리킵니다. -->
<input #taskInput placeholder="Enter task name">
```


<!--
#### Assigning a reference to an Angular directive
-->
#### Angular 디렉티브 참조하기

<!--
Angular directives may have an `exportAs` property that defines a name by which the directive can be referenced in a template:

```angular-ts
@Directive({
  selector: '[dropZone]',
  exportAs: 'dropZone',
})
export class DropZone { /* ... */ }
```

When you declare a template variable on an element, you can assign that variable a directive instance by specifying this `exportAs` name:

```angular-html
<!- The `firstZone` variable refers to the `DropZone` directive instance. ->
<section dropZone #firstZone="dropZone"> ... </section>
```

You cannot refer to a directive that does not specify an `exportAs` name.
-->
Angular 디렉티브는 템플릿에서 참조할 수 있는 이름을 `exportAs` 프로퍼티로 지정할 수 있습니다:

```angular-ts
@Directive({
  selector: '[dropZone]',
  exportAs: 'dropZone',
})
export class DropZone { /* ... */ }
```

그러면 엘리먼트에 템플릿 참조 변수를 선언하면서 `exportAs`를 사용하면 디렉티브 인스턴스를 할당할 수 있습니다:

```angular-html
<!-- 변수 `firstZone`은 `DropZone` 디렉티브 인스턴스를 가리킵니다. -->
<section dropZone #firstZone="dropZone"> ... </section>
```

`exportAs`를 지정하지 않은 디렉티브는 참조할 수 없습니다.


<!--
### Using template reference variables with queries
-->
### 템플릿 참조 변수로 탐색하기

<!--
In addition to using template variables to read values from another part of the same template, you can also use this style of variable declaration to "mark" an element for [component and directive queries](/guide/components/queries).

When you want to query for a specific element in a template, you can declare a template variable on that element and then query for the element based on the variable name.

```angular-html
 <input #description value="Original description">
```

```angular-ts
@Component({
  /* ... */,
  template: `<input #description value="Original description">`,
})
export class AppComponent {
  // Query for the input element based on the template variable name.
  @ViewChild('description') input: ElementRef | undefined;
}
```

See [Referencing children with queries](/guide/components/queries) for more information on queries.
-->
템플릿 변수는 해당 템플릿 안에서 어떤 값을 참조하는 용도 외에도, [컴포넌트나 디렉티브를 탐색](/guide/components/queries) 하기 위해 "마킹" 하는 용도로도 사용됩니다.

템플릿에 있는 엘리먼트를 탐색하려면 해당 엘리먼트에 템플릿 변수를 선언하고, 컴포넌트 클래스 코드에서 템플릿 변수 이름으로 탐색하면 됩니다.

```angular-html
 <input #description value="Original description">
```

```angular-ts
@Component({
  /* ... */,
  template: `<input #description value="Original description">`,
})
export class AppComponent {
  // 템플릿 변수 이름으로 input 엘리먼트를 탐색합니다.
  @ViewChild('description') input: ElementRef | undefined;
}
```

탐색에 대해 자세하게 알아보려면 [쿼리 함수로 자식 컴포넌트 참조하기](/guide/components/queries) 문서를 참고하세요.
