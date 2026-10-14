<!--
# Reusable animations
-->

<a id="reusable-animations"></a>

# 재사용 가능한 애니메이션

<!--
IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave [animation guide](guide/animations). Also see [Migrating away from Angular's Animations package](guide/animations/migration) to learn how you can start migrating to pure CSS animations in your apps.

This topic provides examples of how to create reusable animations.
-->

중요: `@angular/animations` 패키지는 이제 지원 중단 예정(deprecated)입니다.
Angular 팀은 새로 작성하는 모든 코드에서 `animate.enter`와 `animate.leave`를 사용하는 네이티브 CSS 애니메이션을 권장합니다.
새로운 진입 및 퇴장 [애니메이션 가이드](guide/animations)에서 자세히 알아보세요.
[Angular 애니메이션 패키지에서 마이그레이션하기](guide/animations/migration)를 참고하면 애플리케이션을 순수 CSS 애니메이션으로 전환하는 방법도 확인할 수 있습니다.

이 문서에서는 재사용 가능한 애니메이션을 만드는 예제를 살펴봅니다.

<!--
## Create reusable animations
-->

<a id="create-reusable-animations"></a>

## 재사용 가능한 애니메이션 만들기

<!--
To create a reusable animation, use the [`animation()`](api/animations/animation) function to define an animation in a separate `.ts` file and declare this animation definition as a `const` export variable.
You can then import and reuse this animation in your application components using the [`useAnimation()`](api/animations/useAnimation) function.

<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="animation-const"/>

In the preceding code snippet, `transitionAnimation` is made reusable by declaring it as an export variable.

HELPFUL: The `height`, `opacity`, `backgroundColor`, and `time` inputs are replaced during runtime.

You can also export a part of an animation.
For example, the following snippet exports the animation `trigger`.

<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="trigger-const"/>

From this point, you can import reusable animation variables into your component class.
For example, the following code snippet imports the `transitionAnimation` variable and uses it via the `useAnimation()` function.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.3.ts" region="reusable"/>
-->

재사용 가능한 애니메이션을 만들려면 별도의 `.ts` 파일에서 [`animation()`](api/animations/animation) 함수로 애니메이션을 정의하고, 이 정의를 `const` 변수로 선언해서 내보내면 됩니다.
그러면 애플리케이션 컴포넌트에서 이 애니메이션을 가져와 [`useAnimation()`](api/animations/useAnimation) 함수로 재사용할 수 있습니다.

<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="animation-const"/>

위 코드에서는 `transitionAnimation`을 내보내는 변수로 선언해서 재사용할 수 있도록 만들었습니다.

도움말: `height`, `opacity`, `backgroundColor`, `time` 입력 값은 런타임에 대체됩니다.

애니메이션의 일부만 내보낼 수도 있습니다.
예를 들어 다음 코드에서는 애니메이션 `trigger`를 내보냅니다.

<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="trigger-const"/>

이제 컴포넌트 클래스에서 재사용 가능한 애니메이션 변수를 가져올 수 있습니다.
예를 들어 다음 코드에서는 `transitionAnimation` 변수를 가져와 `useAnimation()` 함수로 사용합니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.3.ts" region="reusable"/>

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Introduction to Angular animations"/>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="Transition and triggers"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="Complex animation sequences"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
  <docs-pill href="guide/animations/migration" title="Migrating to Native CSS Animations"/>
</docs-pill-row>
-->

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Angular 애니메이션 소개"/>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="전환과 트리거"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="복잡한 애니메이션 시퀀스"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
  <docs-pill href="guide/animations/migration" title="네이티브 CSS 애니메이션으로 마이그레이션하기"/>
</docs-pill-row>
