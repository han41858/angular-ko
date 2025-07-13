<!--
# Formatting data with pipes
-->
# 파이프 출력 형식 지정하기

<!--
You can take your use of pipes even further by configuring them. Pipes can be configured by passing options to them.

Note: Learn more about [formatting data with pipes in the in-depth guide](/guide/templates/pipes).

In this activity, you will work with some pipes and pipe parameters.

<hr>

To pass parameters to a pipe, use the `:` syntax followed by the parameter value. Here's an example:

```ts
template: `{{ date | date:'medium' }}`;
```

The output is `Jun 15, 2015, 9:43:11 PM`.

Time to customize some pipe output:

<docs-workflow>

<docs-step title="Format a number with `DecimalPipe`">

In `app.ts`, update the template to include parameter for the `decimal` pipe.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Number with "decimal" {{ num | number:"3.2-2" }}</li>
`
</docs-code>

NOTE: What's that format? The parameter for the `DecimalPipe` is called `digitsInfo`, this parameter uses the format: `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`

</docs-step>

<docs-step title="Format a date with `DatePipe`">

Now, update the template to use the `date` pipe.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Date with "date" {{ birthday | date: 'medium' }}</li>
`
</docs-code>

For extra fun, try some different parameters for `date`. More information can be found in the [Angular docs](guide/templates/pipes).

</docs-step>

<docs-step title="Format a currency with `CurrencyPipe`">

For your last task, update the template to use the `currency` pipe.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Currency with "currency" {{ cost | currency }}</li>
`
</docs-code>

You can also try different parameters for `currency`. More information can be found in the [Angular docs](guide/templates/pipes).

</docs-step>

</docs-workflow>

Great work with pipes. You've made some great progress so far.

There are even more built-in pipes that you can use in your applications. You can find the list in the [Angular documentation](guide/templates/pipes).

In the case that the built-in pipes don't cover your needs, you can also create a custom pipe. Check out the next lesson to find out more.
-->
파이프는 출력 형식을 인자로 전달해서 다양하게 활용할 수 있습니다.

참고: 자세한 내용은 [파이프로 데이터 형식 지정하기 심화 가이드](/guide/templates/pipes) 문서를 참고하세요.

이번 튜토리얼에서는 파이프 인자 사용 방법을 알아봅시다.

<hr>

파이프에 인자를 전달하려면 파이프 뒤에 `:` 문법을 사용하면 됩니다.
예제 코드를 봅시다:

```ts
template: `{{ date | date:'medium' }}`;
```

그러면 `Jun 15, 2015, 9:43:11 PM` 와 같은 결과값이 표시됩니다.

이제 직접 해봅시다:

<docs-workflow>

<docs-step title="`DecimalPipe`로 숫자 형식 지정하기">

`app.ts` 파일의 템플릿에 `decimal` 파이프를 적용하는데, 이 떄 인자를 함께 전달해 봅시다.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Number with "decimal" {{ num | number:"3.2-2" }}</li>
`
</docs-code>

참고: 이게 무슨 형식일까요? `DecimalPipe`는 `digitsInfo` 인자를 받는데, 이 인자는 `{정수의 최소 자리수}.{소수의 최소 자리수}.{소수의 최대 자리수}` 형식입니다.

</docs-step>

<docs-step title="`DatePipe`으로 날짜 형식 지정하기">

이제, `date` 파이프를 사용해 봅시다.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Date with "date" {{ birthday | date: 'medium' }}</li>
`
</docs-code>

좀 더 재미있게, `date` 파이프에 다른 인자를 지정해 보세요.
자세한 내용은 [Angular 문서](guide/templates/pipes)에서 확인할 수 있습니다.

</docs-step>

<docs-step title="`CurrencyPipe`으로 통화 형식 지정하기">

마지막으로 템플릿에 `currency` 파이프를 사용해 봅시다.

<docs-code language="ts" highlight="[3]">
template: `
    ...
    <li>Currency with "currency" {{ cost | currency }}</li>
`
</docs-code>

`currency` 파이프에 인자를 지정해 보세요.
자세한 내용은 [Angular 문서](guide/templates/pipes)에서 확인할 수 있습니다.

</docs-step>

</docs-workflow>

파이프를 잘 활용하셨습니다.
지금까지 많은 것들을 경험해 보셨네요.

Angular가 제공하는 파이프는 이 튜토리얼에서 다룬 것보다 훨씬 다양합니다.
파이프 목록은 [Angular 문서](guide/templates/pipes)를 참고하세요.

기본 제공 파이프만으로 해결이 되지 않는 경우라면 커스텀 파이프를 만들어서 활용하면 됩니다.
이 내용은 다음 튜토리얼에서 알아봅시다.