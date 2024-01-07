<!--
# Using a pipe in a template
-->
# 템플릿에 파이프 사용하기

<!--
To apply a pipe, use the pipe operator (`|`) within a template expression as shown in the following code example.

<code-example header="birthday.component.html (template)" path="pipes/src/app/birthday.component.html"></code-example>

The component's `birthday` value flows through the pipe operator (`|`) to the [`DatePipe`](api/common/DatePipe) whose pipe name is `date`.
The pipe renders the date in the default format as **Apr 15, 1988**.

Look at the component class.

<code-example header="birthday.component.ts (class)" path="pipes/src/app/birthday.component.ts"></code-example>

Because this is a [standalone component](guide/standalone-components), it imports the `DatePipe` from `@angular/common`, the source of all built-in pipes.
-->
파이프를 사용하려면 아래 예제 코드처럼 템플릿 표현식에 파이프 연산자(`|`)를 사용한 후에 파이프 *이름* 을 지정하면 됩니다.

<code-example header="birthday.component.html (템플릿)" path="pipes/src/app/birthday.component.html"></code-example>

그러면 컴포넌트의 `birthday` 값이 파이프 연산자(`|`)를 통해 파이프 이름이 `date`인 [`DatePipe`](api/common/DatePipe)로 전달됩니다.
이 파이프는 날짜 데이터를 시스템 기본 형식인 **Apr 15, 1988** 라고 변환합니다.

컴포넌트 클래스는 이렇습니다.

<code-example header="birthday.component.ts (클래스)" path="pipes/src/app/birthday.component.ts"></code-example>

이 컴포넌트는 [단독 컴포넌트](guide/standalone-components)이기 때문에 `@angular/common`에서 `DatePipe`를 직접 불러왔습니다.


@reviewed 2023-08-14
