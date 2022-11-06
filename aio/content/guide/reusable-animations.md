<!--
# Reusable animations
-->
# 애니메이션 재사용하기

<!--
This topic provides some examples of how to create reusable animations.
-->
이 문서는 애니메이션을 재사용하는 예제에 대해 다룹니다.

<!--
## Prerequisites
-->
## 사전지식

<!--
Before continuing with this topic, you should be familiar with the following:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)
-->
다음 내용은 미리 이해하고 이 문서를 보는 것이 좋습니다:

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션 & 트리거](guide/transition-and-triggers)


<!--
## Creating reusable animations
-->
## 애니메이션 정의하기

<!--
To create a reusable animation, use the [`animation()`](api/animations/animation) function to define an animation in a separate `.ts` file and declare this animation definition as a `const` export variable.
You can then import and reuse this animation in any of your application components using the [`useAnimation()`](api/animations/useAnimation) function.

<code-example header="src/app/animations.ts" path="animations/src/app/animations.1.ts" region="animation-const"></code-example>

In the preceding code snippet, `transitionAnimation` is made reusable by declaring it as an export variable.

<div class="alert is-helpful">

**NOTE**: <br />
The `height`, `opacity`, `backgroundColor`, and `time` inputs are replaced during runtime.

</div>

You can also export a part of an animation.
For example, the following snippet exports the animation `trigger`.

<code-example header="src/app/animations.1.ts" path="animations/src/app/animations.1.ts" region="trigger-const"></code-example>

From this point, you can import reusable animation variables in your component class.
For example, the following code snippet imports the `transitionAnimation` variable and uses it via the `useAnimation()` function.

<code-example header="src/app/open-close.component.ts" path="animations/src/app/open-close.component.3.ts" region="reusable"></code-example>
-->
애니메이션을 재사용하려면 [`animation()`](api/animations/animation) 함수를 사용해서 애니메이션만 `.ts` 파일에 따로 정의하고 이 애니메이션을 상수\(`const`\)로 선언한 후에 파일 외부로 공개해야 합니다.
그러면 컴포넌트 메타데이터에서 [`useAnimation()`](api/animations/useAnimation) API로 이 애니메이션을 불러와서 적용할 수 있습니다.

<code-example header="src/app/animations.ts" path="animations/src/app/animations.1.ts" region="animation-const"></code-example>

위 예제 코드에서 `transitionAnimation`이 재사용할 수 있도록 선언된 애니메이션입니다.

<div class="alert is-helpful">

**참고**: <br />
`height`, `opacity`, `backgroundColor`, `time`은 실행 시점에 다시 지정할 수 있습니다.

</div>

애니메이션은 일부만 외부로 공개할 수도 있습니다.
`trigger` 애니메이션만 외부로 공개해 봅시다.

<code-example header="src/app/animations.1.ts" path="animations/src/app/animations.1.ts" region="trigger-const"></code-example>

이제부터는 컴포넌트 클래스에 애니메이션을 로드해서 재사용할 수 있습니다.
아래 예제 코드는 `useAnimation()` 메소드 안에 `transitionAnimation` 을 사용한 예제 코드입니다.

<code-example header="src/app/open-close.component.ts" path="animations/src/app/open-close.component.3.ts" region="reusable"></code-example>


<!--
## More on Angular animations
-->
## 더 알아보기

<!--
You might also be interested in the following:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)
*   [Complex animation Sequences](guide/complex-animation-sequences)
*   [Route transition animations](guide/route-animations)
-->
이런 내용에 대해서도 알아보세요:

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션 & 트리거](guide/transition-and-triggers)
*   [복잡한 애니메이션 시퀀스](guide/complex-animation-sequences)
*   [라우팅 애니메이션](guide/route-animations)


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
