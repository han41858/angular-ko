<!--
# Built-in control flow
-->
# 기본 제어문

<!--
Angular templates support *control flow blocks* that let you conditionally show, hide, and repeat
elements.

<div class="alert is-important">

Angular built-in control flow is in [developer preview](/guide/releases#developer-preview). It is
ready to try, but may change before becoming stable.

</div>
-->
Angular 템플릿은 조건에 따라 어떤 엘리먼트를 표시하거나, 감추거나, 반복하는 *제어문*을 제공합니다.

<div class="alert is-important">

이 구문들은 아직 [개발자 프리뷰](/guide/releases#developer-preview) 단계입니다.
사용할 수는 있지만 이후에 사용방법이 변경될 수 있습니다.

</div>


<!--
## `@if` block conditionals
-->
## `@if` 블록 - 조건에 따라 렌더링

<!--
The `@if` block conditionally displays its content when its condition expression is truthy:

```html
@if (a > b) {
  {{a}} is greater than {{b}}
}
```

The `@if` block might have one or more associated branches. Immediately after an `@if` block,
you can optionally specify any number of `@else if` blocks and one `@else` block:

```html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```
-->
`@if` 블록은 조건에 따라 컨텐츠를 화면에 표시합니다:

```html
@if (a > b) {
  {{a}} is greater than {{b}}
}
```

`@if` 블록은 여러 갈래로 확장될 수 있습니다.
`@if` 블록 뒤에 `@else if` 블록을 자유롭게 붙일 수 있으며, 마지막에는 `@else` 블록도 추가할 수 있습니다:

```html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```


<!--
### Referencing the conditional expression's result
-->
### 조건 표현식의 결과를 참조하기

<!--
You can create a reference to the result of an `@if` block's conditional expression and use that
reference inside the block's content.

```html
@if (users$ | async; as users) {
  {{ users.length }}
}
```
-->
`@if` 블록의 조건 부분은 블록 컨텐츠 안에서 이렇게 참조할 수 있습니다.

```html
@if (users$ | async; as users) {
  {{ users.length }}
}
```


<!--
## `@for` block - repeaters
-->
## `@for` 블록 - 반복문

<!--
The `@for` block renders its content for each item in a collection.

```html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

The collection can be any
JavaScript [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols),
but standard JavaScript `Array` values offer performance advantages.
-->
`@for` 블록을 사용하면 콜렉션 안의 항목을 반복해서 렌더링할 수 있습니다.

```html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

이 때 콜렉션은 JavaScript의 [이터러블](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)이라면 모두 사용할 수 있지만, 성능면에서는 JavaScript의 기본 `Array`를 사용하는 것이 가장 좋습니다.


<!--
### `track` for calculating difference of two collections
-->
### 콜렉션이 달라진 것을 판단하려면 `track`을 사용하세요.

<!--
The `@for` block requires a `track` expression. Angular uses the value of this expression
as a unique identity for each item. This identity allows the framework to perform the minimal
set of DOM operations necessary after items are added, removed, or reordered.

For simple cases, you can use `track $index` as a reasonable default.
-->
`@for` 블록을 사용하려면 Angular가 개별 항목을 구분할 수 있도록 `track` 표현식을 함께 지정해야 합니다.
이 표현식은 배열에 항목이 추가되거나, 제거되거나, 순서가 변경되더라도 DOM 연산을 최소화하기 위해 지정하는 것입니다.

간단하게는 `track $index`라고 지정해도 됩니다.


<!--
### `$index` and other contextual variables
-->
### `$index` 등 컨텍스트 안에서 사용할 수 있는 변수

<!--
Inside `@for` contents, several implicit variables are always available:

| Variable | Meaning                                       |
|----------|-----------------------------------------------|
| `$count` | Number of items in a collection iterated over |
| `$index` | Index of the current row                      |
| `$first` | Whether the current row is the first row      |
| `$last`  | Whether the current row is the last row       |
| `$even`  | Whether the current row index is even         |
| `$odd`   | Whether the current row index is odd          |

These variables are always available with these names, but can be aliased via a `let` segment:

```html
@for (item of items; track item.id; let idx = $index, e = $even) {
  Item #{{ idx }}: {{ item.name }}
}
```

Aliasing is useful when nesting `@for` blocks so that you can reference these variable values in
deeper blocks.
-->
`@for` 안에서 사용할 수 있도록 미리 선언된 변수가 몇가지 있습니다:

| 변수 | 용도                                       |
|----------|-----------------------------------------------|
| `$count` | 콜렉션에 있는 항목의 전체 개수 |
| `$index` | 인덱스 값 |
| `$first` | 첫번째 항목인지 |
| `$last`  | 마지막 항목인지 |
| `$even`  | 짝수번째 항목인지 |
| `$odd`   | 홀수번째 항목인지 |

이 변수들은 원래 이름 그대로 사용할 수도 있지만, `let` 을 활용하면 다른 이름으로 참조할 수 있습니다:

```html
@for (item of items; track item.id; let idx = $index, e = $even) {
  Item #{{ idx }}: {{ item.name }}
}
```

이 방식은 `@for` 블록이 중첩된 경우에 특히 유용합니다.


<!--
### `empty` block
-->
### `empty` 블록

<!--
You can optionally include an `@empty` section immediately after the `@for` block content. The
content of the `@empty` block displays when there are no items:

```html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li> There are no items.</li>
}
```
-->
콜렉션에 항목이 아무것도 없을 때 화면에 표시할 내용이 있다면 `@for` 블록 뒤에 `@empty` 블록을 사용할 수 있습니다:

```html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li> There are no items.</li>
}
```


<!--
## `@switch` block - selection
-->
## `@switch` 블록 - 여러개 중 선택

<!--
The syntax for `switch` is similar to `if`, inspired by the JavaScript `switch` statement:

```html
@switch (condition) {
  @case (caseA) {
    Case A.
  }
  @case (caseB) {
    Case B.
  }
  @default {
    Default case.
  }
}
```

The value of the conditional expression is compared to the case expression using the `===` operator.

**`@switch` does not have fallthrough**, so you do not need an equivalent to a `break` or `return`
statement.

The `@default` block is optional and can be omitted. If no `@case` matches the expression and there
is no `@default` block, nothing is shown.
-->
`@switch` 블록은 JavaScript의 `switch` 구문에서 영감을 받았으며, `@if` 블록과 사용방법이 비슷합니다:

```html
@switch (condition) {
  @case (caseA) {
    // A인 경우
  }
  @case (caseB) {
    // B인 경우
  }
  @default {
    // 어느 것도 해당되지 않는 경우
  }
}
```

이 때 `@case`에 지정되는 개별 조건은 `===` 연산자로 비교합니다.

**`@switch`에는 아래 항목으로 넘어가는 기능이 없습니다.**
`break`나 `return`과 같은 구문은 필요하지 않습니다.

아무 `@case`와도 매칭되지 않을 때 화면에 표시할 내용이 있다면 `@default` 블록을 사용할 수 있습니다.


<!--
## Comparing built-in control flow to `NgIf`, `NgSwitch` and `NgFor`
-->
## 기본 제어문과 `NgIf`, `NgSwitch`, `NgFor` 비교하기

<!--
The `@if` block replaces `*ngIf` for expressing conditional parts of the UI.

The `@switch` block replaces `ngSwitch` with major benefits:

* The `@switch` block does not require a container element for the condition expression or each
  conditional template.
* The `@switch` block supports template type-checking, including type narrowing within each branch.

The `@for` block replaces `*ngFor` for iteration, and has several differences compared to its
structural directive `NgFor` predecessor:

* The `@for` block requires a tracking expression to uniquely identify items in the collection.
  While `NgFor` requires a `trackBy` _method_, however, the `@for` block simplifies tracking by
  accepting a `track` _expression_.
* You can specify content to show when the collection is empty with the `@empty` block.
* The `@for` block uses an optimized algorithm for determining a minimal number of DOM operations 
  necessary after a collection is modified. While `NgFor` allowed developers to provide a custom
  `IterableDiffer` implementation, the `@for` block does not support custom differs.

The `track` setting replaces `NgFor`'s concept of a `trackBy` function. Because `@for` is built-in,
we can provide a better experience than passing a `trackBy` function, and directly use an expression
representing the key instead. Migrating from `trackBy` to `track` is possible by invoking
the `trackBy` function:

```html
@for (item of items; track itemId($index, item)) {
  {{ item.name }}
}
```

With `NgFor`, loops over immutable data without `trackBy` are the most common cause of performance
bugs across Angular applications.
-->
`@if` 블록은 조건에 따라 화면을 표시한다는 점에서 `*ngIf`를 대신합니다.

`@switch` 블록은 `ngSwitch`를 대신하지만 더 나은 점이 있습니다:

* `@switch` 블록은 `ngSwitch`의 조건을 지정하던 컨테이너 엘리먼트가 필요없습니다.
* `@switch` 블록은 템플릿 타입 검사 기능을 지원합니다. 개별 조건 안에서는 타입 세분화도 지원합니다.

`@for` 블록은 특정 엘리먼트를 반복한다는 점에서 `*ngFor`를 대신합니다.
하지만 구조 디렉티브 `NgFor`와 다른 점이 몇가지 있습니다:

* `@for` 블록은 개별 항목을 구분하기 위해 `track` 표현식이 필요합니다.
  `NgFor` 디렉티브는 `trackBy` _메서드(method)_ 를 사용했지만, `@for` 블록은 단순하게 `track` _표현식(expression)_ 을 사용합니다.
* `@empty` 블록을 활용하면 콜렉션에 항목이 하나도 없는 경우를 활용할 수 있습니다.
* `@for` 블록을 사용하면 콜렉션이 변경되었을 때 DOM 연산을 최소화하기 위해 최적화된 알고리즘을 활용합니다.
  `NgFor` 디렉티브는 이 기능을 개발자가 직접 지정하는 `IterableDiffer`를 제공했지만, `@for` 블록은 지원하지 않습니다.

`track`은 `NgFor`에서 사용하던 `trackBy` 함수와 역할이 비슷합니다.
그렇지만 `NgFor` 디렉티브에서는 함수를 정의하고 `trackBy`에 전달해야 했다면, `@for`에서는 단순하게 표현식만 지정하면 됩니다.
`trackBy` 함수를 실행하는 방식으로 `track`에 마이그레이션 할 수도 있습니다:

```html
@for (item of items; track itemId($index, item)) {
  {{ item.name }}
}
```

이뮤터블 데이터를 `trackBy` 없이 `NgFor`로 순회하면 성능 이슈가 종종 발생하곤 했습니다.
