<!--
# Using a pipe in a template
-->
# 템플릿에 파이프 사용하기

<!--
To apply a pipe, use the pipe operator (`|`) within a template expression as shown in the following code example, along with the *name* of the pipe, which is `date` for the built-in [`DatePipe`](api/common/DatePipe).

The tabs in the example show the following:

*   `app.component.html` uses `date` in a separate template to display a birthday.
*   `hero-birthday1.component.ts` uses the same pipe as part of an in-line template in a component that also sets the birthday value.

<code-tabs>
    <code-pane header="src/app/app.component.html" region="hero-birthday-template" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero-birthday1.component.ts" path="pipes/src/app/hero-birthday1.component.ts"></code-pane>
</code-tabs>

The component's `birthday` value flows through the pipe operator, `|` to the [`date`](api/common/DatePipe) function.
-->
파이프를 사용하려면 아래 예제 코드처럼 템플릿 표현식에 파이프 연산자(`|`)를 사용한 후에 파이프 *이름* 을 지정하면 됩니다.
기본으로 제공되는 [`DatePipe`](api/common/DatePipe)를 사용하려면 `date`를 붙이는 식입니다.

예제 코드를 확인해 보세요:

*   `app.component.html`에서는 생일을 표시하기 위해 `date` 파이프 이름을 사용했습니다.
*   `hero-birthday1.component.ts`에서는 같은 파이프를 사용하는데 인라인 템플릿을 사용했습니다.

<code-tabs>
    <code-pane header="src/app/app.component.html" region="hero-birthday-template" path="pipes/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero-birthday1.component.ts" path="pipes/src/app/hero-birthday1.component.ts"></code-pane>
</code-tabs>

그러면 컴포넌트의 `birthday` 값이 파이프 연산자 `|`를 통해 [`date`](api/common/DatePipe) 함수로 전달됩니다.


@reviewed 2022-04-07
