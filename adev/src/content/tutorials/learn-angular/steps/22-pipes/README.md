<!--
# Pipes
-->
# 파이프(Pipe)

<!--
Pipes are functions that are used to transform data in templates. In general, pipes are "pure" functions that don't cause side effects. Angular has a number of helpful built-in pipes you can import and use in your components. You can also create a custom pipe.

Note: Learn more about [pipes in the in-depth guide](/guide/templates/pipes).

In this activity, you will import a pipe and use it in the template.

<hr>

To use a pipe in a template include it in an interpolated expression. Check out this example:

<docs-code language="angular-ts" highlight="[1,5,6]">
import {UpperCasePipe} from '@angular/common';

@Component({
...
template: `{{ loudMessage | uppercase }}`,
imports: [UpperCasePipe],
})
class App {
loudMessage = 'we think you are doing great!'
}
</docs-code>

Now, it's your turn to give this a try:

<docs-workflow>

<docs-step title="Import the `LowerCase` pipe">
First, update `app.ts` by adding the file level import for `LowerCasePipe` from `@angular/common`.

```ts
import { LowerCasePipe } from '@angular/common';
```

</docs-step>

<docs-step title="Add the pipe to the template imports">
Next, update `@Component()` decorator `imports` to include a reference to `LowerCasePipe`

<docs-code language="ts" highlight="[3]">
@Component({
    ...
    imports: [LowerCasePipe]
})
</docs-code>

</docs-step>

<docs-step title="Add the pipe to the template">
Finally, in `app.ts` update the template to include the `lowercase` pipe:

```ts
template: `{{username | lowercase }}`
```

</docs-step>

</docs-workflow>

Pipes can also accept parameters which can be used to configure their output. Find out more in the next activity.

P.S. you are doing great ⭐️
-->
파이프는 템플릿에서 데이터를 다른 형식으로 변환하는 함수입니다.
일반적으로 파이프는 사이드 이펙트를 일으키지 않는 "순수 함수(pure function)"인 것이 좋습니다.
Angular는 다양한 경우에 사용할 수 있는 기본 파이프도 다양하게 제공하지만, 커스텀 파이프를 만들어서 사용할 수도 있습니다.

참고: 자세한 내용은 [파이프 심화 가이드](/guide/templates/pipes) 문서를 참고하세요.

이번 튜토리얼에서는 파이프를 불러와서 템플릿에 적용하는 방법을 알아봅시다.

<hr>

파이프는 템플릿의 문자열 바인딩 표현식에 이어서 사용합니다.
예제 코드를 확인해 보세요:

<docs-code language="angular-ts" highlight="[1,5,6]">
import {UpperCasePipe} from '@angular/common';

@Component({
...
template: `{{ loudMessage | uppercase }}`,
imports: [UpperCasePipe],
})
class App {
loudMessage = 'we think you are doing great!'
}
</docs-code>

이제 직접 해봅시다:

<docs-workflow>

<docs-step title="`LowerCase` 파이프 불러오기">

먼저, `app.ts` 파일을 열고 `@angular/common` 패키지로 제공되는 `LowerCasePipe`를 로드하세요.

```ts
import { LowerCasePipe } from '@angular/common';
```

</docs-step>

<docs-step title="imports 배열에 파이프를 추가합니다">

다음으로, `@Componen()` 데코레이터의 `imports` 배열에 `LowerCasePipe`를 추가합니다.

<docs-code language="ts" highlight="[3]">
@Component({
    ...
    imports: [LowerCasePipe]
})
</docs-code>

</docs-step>

<docs-step title="템플릿에 파이프를 적용하세요">

마지막으로, `app.ts` 파일의 템플릿에 `lowercase` 파이프를 적용합니다:

```ts
template: `{{username | lowercase }}`
```

</docs-step>

</docs-workflow>

파이프는 결과값을 구체적으로 지정하기 위해 인자를 받을 수도 있습니다.
이 내용은 다음 튜토리얼에서 알아봅시다.

P.S. 아주 잘 하고 있습니다 ⭐️
