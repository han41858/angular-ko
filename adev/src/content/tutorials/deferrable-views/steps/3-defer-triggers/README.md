<!--
# Defer triggers
-->

# 지연 로딩 트리거

<!--
While the default options for `@defer` offer great options for lazy loading parts of your components it may still be desirable to further customize the deferred loading experience.
-->

`@defer`의 기본 옵션만으로도 컴포넌트 일부를 편리하게 지연 로딩할 수 있지만, 지연 로딩 동작을 더 세밀하게 조정해야 할 수 있습니다.

<!--
By default, deferred content loads when the browser is idle. You can, however, customize when this loading occurs by specifying a **trigger**. This lets you pick the loading behavior best suited to your component.
-->

기본적으로 지연 로딩할 내용은 브라우저가 유휴 상태일 때 로딩됩니다. 하지만 **트리거**를 지정하면 로딩 시점을 조정할 수 있습니다. 컴포넌트에 가장 적합한 로딩 동작을 선택할 수 있습니다.

<!--
Deferrable views offer two types of loading trigger:
-->

지연 로딩 뷰는 두 가지 로딩 트리거를 제공합니다:

<!--
| Trigger | Description                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on`    | A trigger condition using a trigger from the list of built-in triggers.<br/>For example: `@defer (on viewport)`                                                                                                |
| `when`  | A condition as an expression which is evaluated for truthiness. When the expression is truthy, the placeholder is swapped with the lazily loaded content.<br/>For example: `@defer (when customizedCondition)` |
-->

| 트리거 | 설명                                                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on`   | 내장 트리거 목록에서 선택한 트리거를 조건으로 사용합니다.<br/>예: `@defer (on viewport)`                                                                             |
| `when` | 표현식이 참으로 평가되는지 확인하는 조건입니다. 표현식이 참으로 평가되면 플레이스홀더를 지연 로딩된 내용으로 교체합니다.<br/>예: `@defer (when customizedCondition)` |

<!--
If the `when` condition evaluates to `false`, the `defer` block is not reverted back to the placeholder. The swap is a one-time operation.
-->

나중에 `when` 조건이 `false`로 평가되어도 `defer` 블록은 플레이스홀더로 되돌아가지 않습니다. 내용 교체는 한 번만 실행됩니다.

<!--
You can define multiple event triggers at once, these triggers will be evaluated as OR conditions.

- Ex: `@defer (on viewport; on timer(2s))`
- Ex: `@defer (on viewport; when customizedCondition)`
-->

이벤트 트리거를 여러 개 정의할 수도 있습니다. 여러 트리거는 OR 조건으로 평가됩니다.

- 예: `@defer (on viewport; on timer(2s))`
- 예: `@defer (on viewport; when customizedCondition)`

<!--
In this activity, you'll learn how to use triggers to specify the condition to load the deferrable views.
-->

이번 실습에서는 트리거를 사용해서 지연 로딩 뷰를 로딩할 조건을 지정하는 방법을 배웁니다.

<hr>

<docs-workflow>

<!--
<docs-step title="Add `on hover` trigger">
-->

<docs-step title="on hover 트리거 추가하기">

<a id="add-on-hover-trigger"></a>

<!--
In your `app.ts`,  add an `on hover` trigger to the `@defer` block.
-->

`app.ts`에서 `@defer` 블록에 `on hover` 트리거를 추가합니다.

```angular-html {highlight:[1]}
@defer (on hover) {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
} @loading (minimum 1s; after 500ms) {
  <p>Loading comments...</p>
} @error {
  <p>Failed to load comments</p>
}
```

<!--
Now, the page will not render the comments section until you hover its placeholder.
-->

이제 플레이스홀더 위로 마우스 포인터를 이동해야 댓글 영역이 렌더링됩니다.
</docs-step>

<!--
<docs-step title="Add a 'Show all comments' button">
-->

<docs-step title="Show all comments 버튼 추가하기">

<a id="add-a-show-all-comments-button"></a>

<!--
Next, update the template to include a button with the label "Show all comments". Include a template variable called `#showComments` with the button.
-->

이제 템플릿에 "Show all comments"라고 표시되는 버튼을 추가합니다. 버튼에 `#showComments` 템플릿 변수도 지정하세요.

```angular-html {highlight:[1]}
<button type="button" #showComments>Show all comments</button>

@defer (on hover) {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
} @loading (minimum 1s; after 500ms) {
  <p>Loading comments...</p>
} @error {
  <p>Failed to load comments</p>
}
```

<!--
NOTE: for more information on [template variables check the documentation](/guide/templates/variables#declaring-a-template-reference-variable).
-->

NOTE: 자세한 내용은 [템플릿 변수 문서](/guide/templates/variables#declaring-a-template-reference-variable)를 확인하세요.

</docs-step>

<!--
<docs-step title="Add `on interaction` trigger">
-->

<docs-step title="on interaction 트리거 추가하기">

<a id="add-on-interaction-trigger"></a>

<!--
Update the `@defer` block in the template to use the `on interaction` trigger. Provide the `showComments` template variable as the parameter to `interaction`.
-->

템플릿의 `@defer` 블록에 `on interaction` 트리거를 추가합니다. `interaction`의 인자로 `showComments` 템플릿 변수를 전달하세요.

```angular-html {highlight:[3]}
<button type="button" #showComments>Show all comments</button>

@defer (on hover; on interaction(showComments)) {
  <article-comments />
} @placeholder (minimum 1s) {
  <p>Placeholder for comments</p>
} @loading (minimum 1s; after 500ms) {
  <p>Loading comments...</p>
} @error {
  <p>Failed to load comments</p>
}
```

<!--
With these changes, the page will wait for one of the following conditions before rendering the comments section:

- User hovers the comments section’s placeholder
- User clicks on the “Show all comments" button

You can reload the page to try out different triggers to render the comments section.
-->

이렇게 수정하면 다음 조건 중 하나가 충족되었을 때 댓글 영역을 렌더링합니다:

- 사용자가 댓글 영역의 플레이스홀더 위로 마우스 포인터를 이동했을 때
- 사용자가 "Show all comments" 버튼을 클릭했을 때

페이지를 새로고침하면서 각 트리거로 댓글 영역이 렌더링되는지 확인해 보세요.
</docs-step>
</docs-workflow>

<!--
If you would like to learn more, check out the documentation for [Deferrable View](/guide/templates/defer).
Keep learning to unlock more of Angular's great features.
-->

더 알아보려면 [지연 로딩 뷰 문서](/guide/templates/defer)를 확인하세요.
계속 학습하면서 Angular의 다양한 기능을 활용해 보세요.
