<!--
# Using signals with directives
-->

# 디렉티브에서 시그널 사용하기

<!--
Now that you've learned [using signals with services](/tutorials/signals/7-using-signals-with-services), let's explore how directives use signals. **The great news: signals work exactly the same in directives as they do in components!** The main difference is that since directives don't have templates, you'll primarily use signals in host bindings to reactively update the host element.
-->

[서비스에서 시그널을 사용하는 방법](/tutorials/signals/7-using-signals-with-services)을 배웠으니, 이제 디렉티브에서 시그널을 사용하는 방법을 살펴봅시다. **시그널은 디렉티브에서도 컴포넌트와 똑같이 동작합니다!** 주요 차이점은 디렉티브에는 템플릿이 없다는 것입니다. 따라서 주로 호스트 바인딩에서 시그널을 사용해서 호스트 엘리먼트를 반응형으로 갱신합니다.

<!--
In this activity, you'll build a highlight directive that demonstrates how signals create reactive behavior in directives.
-->

이번 실습에서는 강조 표시 디렉티브를 만들면서 시그널로 디렉티브의 반응형 동작을 구현하는 방법을 배웁니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Set up signals just like in a component">
-->

<docs-step title="컴포넌트와 같은 방식으로 시그널 구성하기">

<a id="set-up-signals-just-like-in-a-component"></a>

<!--
Import the signal functions and create your reactive state. This works exactly the same as in components:
-->

시그널 함수를 불러오고 반응형 상태를 만듭니다. 컴포넌트에서와 똑같이 동작합니다:

```ts
import {Directive, input, signal, computed} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  // Signal inputs - same as components!
  color = input<string>('yellow');
  intensity = input<number>(0.3);

  // Internal state - same as components!
  private isHovered = signal(false);

  // Computed signals - same as components!
  backgroundStyle = computed(() => {
    const baseColor = this.color();
    const alpha = this.isHovered() ? this.intensity() : this.intensity() * 0.5;

    const colorMap: Record<string, string> = {
      'yellow': `rgba(255, 255, 0, ${alpha})`,
      'blue': `rgba(0, 100, 255, ${alpha})`,
      'green': `rgba(0, 200, 0, ${alpha})`,
      'red': `rgba(255, 0, 0, ${alpha})`,
    };

    return colorMap[baseColor] || colorMap['yellow'];
  });
}
```

<!--
Notice how this is identical to component patterns - the only difference is we're in a `@Directive` instead of `@Component`.
-->

컴포넌트 패턴과 동일합니다. `@Component` 대신 `@Directive`를 사용한다는 점만 다릅니다.
</docs-step>

<!--
<docs-step title="Use signals in host bindings">
-->

<docs-step title="호스트 바인딩에서 시그널 사용하기">

<a id="use-signals-in-host-bindings"></a>

<!--
Since directives don't have templates, you'll use signals in **host bindings** to reactively update the host element. Add the `host` configuration and event handlers:
-->

디렉티브에는 템플릿이 없으므로 **호스트 바인딩**에서 시그널을 사용해서 호스트 엘리먼트를 반응형으로 갱신합니다. `host` 설정과 이벤트 핸들러를 추가합니다:

```ts
@Directive({
  selector: '[highlight]',
  host: {
    '[style.backgroundColor]': 'backgroundStyle()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  // ... signals from previous step ...

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }
}
```

<!--
The host bindings automatically re-evaluate when the signals change - just like template bindings in components! When `isHovered` changes, the `backgroundStyle` computed signal recalculates, and the host binding updates the element's style.
-->

시그널이 변경되면 컴포넌트의 템플릿 바인딩처럼 호스트 바인딩도 자동으로 다시 평가됩니다. `isHovered`가 변경되면 `backgroundStyle` computed 시그널이 다시 계산되고, 호스트 바인딩이 엘리먼트 스타일을 갱신합니다.
</docs-step>

<!--
<docs-step title="Use the directive in your template">
-->

<docs-step title="템플릿에서 디렉티브 사용하기">

<a id="use-the-directive-in-your-template"></a>

<!--
Update the app template to demonstrate the reactive directive:
-->

앱 템플릿을 수정해서 반응형 디렉티브의 동작을 확인합니다:

```angular-html
template: `
<div>
  <h1>Directive with Signals</h1>

  <div highlight color="yellow" [intensity]="0.2">Hover me - Yellow highlight</div>

  <div highlight color="blue" [intensity]="0.4">Hover me - Blue highlight</div>

  <div highlight color="green" [intensity]="0.6">Hover me - Green highlight</div>
</div>
`,
```

<!--
The directive automatically applies reactive highlighting based on the signal inputs!
-->

디렉티브는 입력 시그널을 기반으로 강조 표시를 자동으로 갱신합니다!
</docs-step>

</docs-workflow>

<!--
Perfect! You've now seen how signals work with directives. Some key takeaways from this lesson are:
-->

디렉티브에서 시그널이 동작하는 방식을 배웠습니다. 핵심 내용은 다음과 같습니다:

<!--
- **Signals are universal** - All signal APIs (`input()`, `signal()`, `computed()`, `effect()`) work the same in both directives and components
- **Host bindings are the primary use case** - Since directives don't have templates, you use signals in host bindings to reactively modify the host element
- **Same reactive patterns** - Signal updates trigger automatic re-evaluation of computed signals and host bindings, just like in component templates
-->

- **동일한 시그널 API** - `input()`, `signal()`, `computed()`, `effect()` 등 모든 시그널 API는 디렉티브와 컴포넌트에서 똑같이 동작합니다.
- **주로 호스트 바인딩에 사용** - 디렉티브에는 템플릿이 없으므로 호스트 바인딩의 시그널로 호스트 엘리먼트를 반응형으로 수정합니다.
- **동일한 반응형 패턴** - 시그널이 갱신되면 컴포넌트 템플릿에서처럼 computed 시그널과 호스트 바인딩이 자동으로 다시 평가됩니다.

<!--
In the next lesson, you'll [learn how to query child elements with signal queries](/tutorials/signals/9-query-child-elements-with-signal-queries)!
-->

다음 단계에서는 [시그널 쿼리로 자식 엘리먼트를 조회하는 방법](/tutorials/signals/9-query-child-elements-with-signal-queries)을 배웁니다!
