<!--
# Control flow
-->
# 흐름 제어

<!--
Angular templates support control flow blocks that let you conditionally show, hide, and repeat elements.
-->
Angular 템플릿은 조건에 따라 엘리먼트를 표시하거나, 감추거나, 반복하는 흐름 제어 블록 기능을 제공합니다.


<!--
## Conditionally display content with `@if`, `@else-if` and `@else`
-->
## 조건에 따라 표시하기: `@if`, `@else-if`, `@else`

<!--
The `@if` block conditionally displays its content when its condition expression is truthy:

```angular-html
@if (a > b) {
  <p>{{a}} is greater than {{b}}</p>
}
```

If you want to display alternative content, you can do so by providing any number of `@else if` blocks and a singular `@else` block.

```angular-html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```
-->
`@if` 블록은 표현식 결과가 참으로 평가될 때 내용물을 표시합니다:

```angular-html
@if (a > b) {
  <p>{{a}} is greater than {{b}}</p>
}
```

판단할 조건이 여러개라면 `@else if` 블록이나 `@else` 블록을 자유롭게 활용하면 됩니다.

```angular-html
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
### 표현식 계산 결과를 변수로 저장하기

<!--
The `@if` conditional supports saving the result of the conditional expression into a variable for reuse inside of the block.

```angular-html
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```

This can be useful for referencing longer expressions that would be easier to read and maintain within the template.
-->
`@if` 블록에서 조건문 판단에 사용한 데이터는 블록 안쪽에서 재사용할 수 있도록 변수로 할당해 둘 수 있습니다.

```angular-html
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```

조건문에 사용하는 표현식이 길다면 이 방식이 유용합니다.


<!--
## Repeat content with the `@for` block
-->
## 내용 반복하기: `@for`

<!--
The `@for` block loops through a collection and repeatedly renders the content of a block. The collection can be any JavaScript [iterable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols), but Angular has additional performance optimizations for `Array` values.

A typical `@for` loop looks like:

```angular-html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

Angular's `@for` block does not support flow-modifying statements like JavaScript's `continue` or `break`.
-->
`@for` 블록은 콜렉션을 순회하면서 블록 안에 있는 내용물을 반복해서 렌더링합니다.
이 때 콜렉션은 JavaScript [이터러블(iterable)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)이라면 어떤 것이라도 가능하며, Angular는 특히 `Array`를 다루는 성능에 최적화되어 있습니다.

`@for` 루프 블럭은 이렇게 사용합니다:

```angular-html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

Angular `@for` 블록은 JavaScript의 `continue`나 `break` 같이 흐름을 제어하는 구문은 지원하지 않습니다.


<!--
### Why is `track` in `@for` blocks important?
-->
### `@for` 블록을 사용할 때 왜 `track`을 지정해야 하나요?

<!--
The `track` expression allows Angular to maintain a relationship between your data and the DOM nodes on the page. This allows Angular to optimize performance by executing the minimum necessary DOM operations when the data changes.

Using track effectively can significantly improve your application's rendering performance when looping over data collections.

Select a property that uniquely identifies each item in the `track` expression. If your data model includes a uniquely identifying property, commonly `id` or `uuid`, use this value. If your data does not include a field like this, strongly consider adding one.

For static collections that never change, you can use `$index` to tell Angular to track each item by its index in the collection.

If no other option is available, you can specify `identity`. This tells Angular to track the item by its reference identity using the triple-equals operator (`===`). Avoid this option whenever possible as it can lead to significantly slower rendering updates, as Angular has no way to map which data item corresponds to which DOM nodes.
-->
`track` 표현식은 Angular가 데이터와 DOM 노드의 관계를 파악하는 용도로 사용합니다.
Angular가 이 관계를 파악할 수 있으면 데이터가 변경되었을 때 DOM 연산을 최소화하면서 성능을 최적화할 수 있습니다.

그래서 데이터 콜렉션을 반복할 때 애플리케이션의 렌더링 성능을 최적화하려면 `track` 구문을 효율적으로 작성해야 합니다.

`track` 표현식에는 개별 항목을 고유하게 구분할 수 있는 필드를 지정하세요.
보통은 `id`나 `uuid`와 같은 값을 사용할 것입니다.
고유하게 식별할 수 있는 필드가 없다면, 추가로 마련하는 것을 강력하게 권장합니다.

값이 변경되지 않는 정적 콜렉션이라면 인덱스 값을 표현하는 `$index`를 사용하는 것도 좋습니다.

값이 변경되는 것을 필드로 식별할 수 없다면 `identity`를 활용할 수도 있습니다.
이 방식은 삼중 등호 연산자(`===`)를 기준으로 참조값이 같은지 판단합니다.
이 방식은 가능한 한 사용하지 않는 것이 좋습니다.
Angular가 데이터와 DOM 노드를 제대로 매칭할 수 없으면 렌더링 성능이 크게 저하될 수 있습니다.


<!--
### Contextual variables in `@for` blocks
-->
### `@for` 블록 내부에서 사용할 수 있는 변수

<!--
Inside `@for` blocks, several implicit variables are always available:

| Variable | Meaning                                       |
| -------- | --------------------------------------------- |
| `$count` | Number of items in a collection iterated over |
| `$index` | Index of the current row                      |
| `$first` | Whether the current row is the first row      |
| `$last`  | Whether the current row is the last row       |
| `$even`  | Whether the current row index is even         |
| `$odd`   | Whether the current row index is odd          |

These variables are always available with these names, but can be aliased via a `let` segment:

```angular-html
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

The aliasing is useful when nesting `@for` blocks, letting you read variables from the outer `@for` block from an inner `@for` block.
-->
`@for` 블록에서 사용할 수 있는 내부 변수가 몇가지 있습니다:

| 변수       | 의미                      |
|----------|-------------------------|
| `$count` | 콜렉션의 전체 개수              |
| `$index` | 현재 반복되는 인덱스 값           |
| `$first` | 현재 반복되는 항목이 첫번째 항목인지 여부 |
| `$last`  | 현재 반복되는 항목이 마지막 항목인지 여부 |
| `$even`  | 현재 반복되는 항목이 짝수번째인지      |
| `$odd`   | 현재 반복되는 항목이 홀수번째인지      |

이 변수들은 그대로 사용할 수 있지만, `let` 을 사용해서 다른 이름으로 사용할 수도 있습니다:

```angular-html
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

이렇게 내부 변수를 다른 이름으로 지정하는 방식은 `@for` 블록이 중첩되어 있을 때 특히 유용합니다.


<!--
### Providing a fallback for `@for` blocks with the `@empty` block
-->
### 콜렉션이 비어있을 때 - `@empty` 블록 사용하기

<!--
You can optionally include an `@empty` section immediately after the `@for` block content. The content of the `@empty` block displays when there are no items:

```angular-html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li aria-hidden="true"> There are no items. </li>
}
```
-->
`@for` 블록 뒤에는 `@empty` 블록을 사용할 수 있습니다.
그러면 `@for` 블록에서 순회하는 콜렉션에 항목이 하나도 없을 때 `@empty` 블록이 화면에 표시됩니다:

```angular-html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li aria-hidden="true"> There are no items. </li>
}
```


<!--
## Conditionally display content with the `@switch` block
-->
## 여러 조건 중 하나 표시하기: `@switch` 블록

<!--
While the `@if` block is great for most scenarios, the `@switch` block provides an alternate syntax to conditionally render data. Its syntax closely resembles JavaScript's `switch` statement.

```angular-html
@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-reviewer-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

The value of the conditional expression is compared to the case expression using the triple-equals (`===`) operator.

**`@switch` does not have a fallthrough**, so you do not need an equivalent to a `break` or `return` statement in the block.

You can optionally include a `@default` block. The content of the `@default` block displays if none of the preceding case expressions match the switch value.

If no `@case` matches the expression and there is no `@default` block, nothing is shown.
-->
`@if` 블록은 대부분의 경우에 사용할 수 있지만, 조건이 여러개라면 `@switch` 블록을 사용하는 것도 고려할 만 합니다.
`@switch` 블록은 JavaScript `switch` 구문과 아주 비슷합니다.

```angular-html
@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-reviewer-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

이 때 조건문은 삼중 등호 연산자(`===`)로 비교합니다.

**`@switch` 블록은 다음 블록으로 연결되지 않습니다. `break`나 `return` 같이 흐름을 제어하는 구문은 존재하지 않습니다.**

`@default` 블록을 사용할 수 있습니다.
이 블록은 매칭되는 `@case` 블록이 없을 때 표시됩니다.

`@default` 블록이 없으면서 `@case` 블록 중 어느것도 매칭되지 않으면, 아무것도 렌더링되지 않습니다.