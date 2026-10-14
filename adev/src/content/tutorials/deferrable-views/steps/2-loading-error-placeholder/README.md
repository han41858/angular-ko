<!--
# @loading, @error and @placeholder blocks
-->

# @loading, @error, @placeholder 블록

<!--
Deferrable views let you define content to be shown in different loading states.
-->

지연 로딩 뷰에서는 로딩 상태에 따라 표시할 내용을 정의할 수 있습니다.

<!--
| Block          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@placeholder` | By default, defer blocks do not render any content before they are triggered. The `@placeholder` is an optional block that declares content to show before the deferred content loads. Angular replaces the placeholder with the deferred content after loading completes. While this block is optional, the Angular team recommends always including a placeholder. [Learn more in the full deferrable views documentation](guide/templates/defer) |
| `@loading`     | This optional block allows you to declare content to be shown during the loading of any deferred dependencies.                                                                                                                                                                                                                                                                                                                                      |
| `@error`       | This block allows you to declare content which is shown if deferred loading fails.                                                                                                                                                                                                                                                                                                                                                                  |
-->

| 블록           | 설명                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@placeholder` | 기본적으로 defer 블록은 트리거되기 전에는 아무것도 렌더링하지 않습니다. `@placeholder`는 지연 로딩할 내용이 로딩되기 전에 표시할 내용을 선언하는 선택 블록입니다. 로딩이 완료되면 Angular는 플레이스홀더를 지연 로딩된 내용으로 교체합니다. 필수는 아니지만 Angular 팀은 항상 플레이스홀더를 포함하는 것을 권장합니다. [지연 로딩 뷰 문서에서 자세히 알아보세요](guide/templates/defer). |
| `@loading`     | 지연 로딩할 의존성을 가져오는 동안 표시할 내용을 선언하는 선택 블록입니다.                                                                                                                                                                                                                                                                                                               |
| `@error`       | 지연 로딩에 실패했을 때 표시할 내용을 선언합니다.                                                                                                                                                                                                                                                                                                                                        |

<!--
The contents of all the above sub-blocks are eagerly loaded. Additionally, some features require a `@placeholder` block.
-->

위 하위 블록의 내용은 모두 즉시 로딩됩니다. 그리고 일부 기능에는 `@placeholder` 블록이 필요합니다.

<!--
In this activity, you'll learn how to use the `@loading`, `@error` and `@placeholder` blocks to manage the states of deferrable views.
-->

이번 실습에서는 `@loading`, `@error`, `@placeholder` 블록으로 지연 로딩 뷰의 상태를 관리하는 방법을 배웁니다.

<hr>

<docs-workflow>

<!--
<docs-step title="Add `@placeholder` block">
-->

<docs-step title="@placeholder 블록 추가하기">

<a id="add-placeholder-block"></a>

<!--
In your `app.ts`, add a `@placeholder` block to the `@defer` block.
-->

`app.ts`에서 `@defer` 블록에 `@placeholder` 블록을 추가합니다.

```angular-html {highlight:[3,4,5]}
@defer {
  <article-comments />
} @placeholder {
  <p>Placeholder for comments</p>
}
```

</docs-step>

<!--
<docs-step title="Configure the `@placeholder` block">
-->

<docs-step title="@placeholder 블록 설정하기">

<a id="configure-the-placeholder-block"></a>

<!--
The `@placeholder` block accepts an optional parameter to specify the `minimum` amount of time that this placeholder should be shown. This `minimum` parameter is specified in time increments of milliseconds (ms) or seconds (s). This parameter exists to prevent fast flickering of placeholder content in the case that the deferred dependencies are fetched quickly.
-->

`@placeholder` 블록에는 플레이스홀더를 표시할 최소 시간을 지정하는 `minimum` 인자를 선택적으로 전달할 수 있습니다. `minimum`은 밀리초(ms) 또는 초(s) 단위로 지정합니다. 지연 로딩할 의존성을 빠르게 가져왔을 때 플레이스홀더가 잠깐 나타났다가 사라지며 깜빡이는 현상을 방지합니다.

```angular-html {highlight:[3,4,5]}
@defer {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
}
```

</docs-step>

<!--
<docs-step title="Add `@loading` block">
-->

<docs-step title="@loading 블록 추가하기">

<a id="add-loading-block"></a>

<!--
Next add a `@loading` block to the component template.
-->

이제 컴포넌트 템플릿에 `@loading` 블록을 추가합니다.

<!--
The `@loading` block accepts two optional parameters:

- `minimum`: the amount of time that this block should be shown
- `after`: the amount of time to wait after loading begins before showing the loading template

Both parameters are specified in time increments of milliseconds (ms) or seconds (s).
-->

`@loading` 블록은 두 가지 선택 인자를 받습니다:

- `minimum`: 이 블록을 표시할 최소 시간
- `after`: 로딩이 시작된 후 로딩 템플릿을 표시하기까지 기다릴 시간

두 인자 모두 밀리초(ms) 또는 초(s) 단위로 지정합니다.

<!--
Update `app.ts` to include a `@loading` block with a minimum parameter of `1s` as well as an after parameter with the value 500ms to the @loading block.
-->

`app.ts`에 `@loading` 블록을 추가하고 `minimum` 인자는 `1s`, `after` 인자는 `500ms`로 지정합니다.

```angular-html {highlight:[5,6,7]}
@defer {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
} @loading (minimum 1s; after 500ms) {
  <p>Loading comments...</p>
}
```

<!--
NOTE: this example uses two parameters, separated by the ; character.
-->

NOTE: 이 예제에서는 두 인자를 세미콜론(`;`)으로 구분합니다.

</docs-step>

<!--
<docs-step title="Add `@error` block">
-->

<docs-step title="@error 블록 추가하기">

<a id="add-error-block"></a>

<!--
Finally, add an `@error` block to the `@defer` block.
-->

마지막으로 `@defer` 블록에 `@error` 블록을 추가합니다.

```angular-html {highlight:[7,8,9]}
@defer {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
} @loading (minimum 1s; after 500ms) {
  <p>Loading comments...</p>
} @error {
  <p>Failed to load comments</p>
}
```

</docs-step>
</docs-workflow>

<!--
Congratulations! At this point, you have a good understanding about deferrable views. Keep up the great work and let's learn about triggers next.
-->

축하합니다! 이제 지연 로딩 뷰를 이해했습니다. 다음 단계에서는 트리거에 대해 배워봅시다.
