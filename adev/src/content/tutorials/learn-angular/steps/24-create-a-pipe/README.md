<!--
# Create a custom pipe
-->
# 커스텀 파이프 만들기

<!--
You can create custom pipes in Angular to fit your data transformation needs.

Note: Learn more about [creating custom pipes in the in-depth guide](/guide/templates/pipes#creating-custom-pipes).

In this activity, you will create a custom pipe and use it in your template.

<hr>

A pipe is a TypeScript class with a `@Pipe` decorator. Here's an example:

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    return `⭐️ ${value} ⭐️`;
  }
}
```

The `StarPipe` accepts a string value and returns that string with stars around it. Take note that:

- the name in the `@Pipe` decorator configuration is what will be used in the template
- the `transform` function is where you put your logic

Alright, it's your turn to give this a try — you'll create the `ReversePipe`:

<docs-workflow>

<docs-step title="Create the `ReversePipe`">

In `reverse.pipe.ts` add the `@Pipe` decorator to the `ReversePipe` class and provide the following configuration:

```ts
@Pipe({
    name: 'reverse'
})
```

</docs-step>

<docs-step title="Implement the `transform` function">

Now the `ReversePipe` class is a pipe. Update the `transform` function to add the reversing logic:

<docs-code language="ts" highlight="[3,4,5,6,7,8,9]">
export class ReversePipe implements PipeTransform {
    transform(value: string): string {
        let reverse = '';

        for (let i = value.length - 1; i >= 0; i--) {
            reverse += value[i];
        }

        return reverse;
    }

}
</docs-code>

</docs-step>

<docs-step title="Use the `ReversePipe` in the template"></docs-step>
With the pipe logic implemented, the final step is to use it in the template. In `app.ts` include the pipe in the template and add it to the component imports:

<docs-code language="angular-ts" highlight="[3,4]">
@Component({
    ...
    template: `Reverse Machine: {{ word | reverse }}`
    imports: [ReversePipe]
})
</docs-code>

</docs-workflow>

And with that you've done it. Congratulations on completing this activity. You now know how to use pipes and even how to implement your own custom pipes.
-->
데이터를 원하는 형식으로 직접 변환하려면 커스텀 파이프를 만들면 됩니다.

참고: 자세한 내용은 [커스텀 파이프 만들기 심화 가이드](/guide/templates/pipes#creating-custom-pipes) 문서를 참고하세요.

이번 튜토리얼에서는 커스텀 파이프를 만들어서 템플릿에 적용해 봅시다.

<hr>

파이프는 `@Pipe` 데코레이터가 붙은 TypeScript 클래스입니다.
예제 코드를 확인해 보세요:

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    return `⭐️ ${value} ⭐️`;
  }
}
```

`StarPipe`는 문자열을 받아서 앞뒤로 별 이모지를 붙이는 파이프입니다.
이런 내용을 확인해 보세요:

- `@Pipe` 데코레이터에 지정한 `name`은 템플릿에 파이프를 사용할 때 활용되는 이름을 지정합니다.
- 파이프의 동작 로직은 `transform` 함수에 지정합니다.

좋습니다.
`ReversePipe`를 직접 만들어 봅시다:

<docs-workflow>

<docs-step title="`ReversePipe`를 생성합니다">

`reverse.pipe.ts` 파일에 있는 `ReversePipe` 클래스에 `@Pipe` 데코레이터를 다음과 같이 지정해 보세요:

```ts
@Pipe({
    name: 'reverse'
})
```

</docs-step>

<docs-step title="`transform` 함수를 구현해 보세요">

이제 `ReversePipe` 클래스는 파이프가 되었습니다.
`transform` 함수를 수정해서 원하는 로직을 구현해 보세요:

<docs-code language="ts" highlight="[3,4,5,6,7,8,9]">
export class ReversePipe implements PipeTransform {
    transform(value: string): string {
        let reverse = '';

        for (let i = value.length - 1; i >= 0; i--) {
            reverse += value[i];
        }

        return reverse;
    }

}
</docs-code>

</docs-step>

<docs-step title="템플릿에 `ReversePipe`를 사용해 보세요"></docs-step>

이제 파이프 로직이 완성되었기 때문에 템플릿에 적용하기만 하면 됩니다.
`app.ts` 파일에 파이프를 등록하고 템플릿에도 적용해 보세요:

<docs-code language="angular-ts" highlight="[3,4]">
@Component({
    ...
    template: `Reverse Machine: {{ word | reverse }}`
    imports: [ReversePipe]
})
</docs-code>

</docs-workflow>

이제 다 완료되었습니다.
이번 예제도 훌륭하게 마무리하셨습니다.
이제 파이프를 사용하는 방법뿐 아니라, 커스텀 파이프를 구현하는 방법도 학습했습니다.
