<!--
# Slow computations
-->

<a id="slow-computations"></a>

# 느린 연산

<!--
On every change detection cycle, Angular synchronously:

- Evaluates all template expressions in all components, unless specified otherwise, based on that each component's detection strategy
- Executes the `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`, and `ngOnChanges` lifecycle hooks.
  A single slow computation within a template or a lifecycle hook can slow down the entire change detection process because Angular runs the computations sequentially.
-->

Angular는 변경 감지 사이클마다 다음 작업을 동기적으로 수행합니다:

- 별도로 지정하지 않았다면 각 컴포넌트의 변경 감지 전략에 따라 모든 컴포넌트의 템플릿 표현식을 평가합니다.
- `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`, `ngOnChanges` 생명주기 후킹 메서드를 실행합니다.
  Angular는 연산을 순차적으로 실행하므로 템플릿이나 생명주기 후킹 메서드의 느린 연산 하나가 전체 변경 감지 과정을 느리게 할 수 있습니다.

<!--
## Identifying slow computations
-->

<a id="identifying-slow-computations"></a>

## 느린 연산 찾기

<!--
You can identify heavy computations with Angular DevTools’ profiler. In the performance timeline, click a bar to preview a particular change detection cycle. This displays a bar chart, which shows how long the framework spent in change detection for each component. When you click a component, you can preview how long Angular spent evaluating its template and lifecycle hooks.

<img alt="Angular DevTools profiler preview showing slow computation" src="assets/images/best-practices/runtime-performance/slow-computations.png">

For example, in the preceding screenshot, the second recorded change detection cycle is selected. Angular spent over 573 ms on this cycle, with the most time spent in the `EmployeeListComponent`. In the details panel, you can see that Angular spent over 297 ms evaluating the template of the `EmployeeListComponent`.
-->

Angular DevTools의 프로파일러로 비용이 큰 연산을 찾을 수 있습니다.
성능 타임라인에서 막대를 클릭하면 특정 변경 감지 사이클을 살펴볼 수 있습니다.
그러면 프레임워크가 각 컴포넌트의 변경 감지에 사용한 시간을 막대 차트로 표시합니다.
컴포넌트를 클릭하면 Angular가 해당 템플릿과 생명주기 후킹 메서드를 평가하는 데 사용한 시간을 확인할 수 있습니다.

<img alt="느린 연산을 보여주는 Angular DevTools 프로파일러 화면" src="assets/images/best-practices/runtime-performance/slow-computations.png">

예를 들어 위 화면에서는 기록된 두 번째 변경 감지 사이클을 선택했습니다.
Angular는 이 사이클에 573ms 이상을 사용했고, 대부분의 시간을 `EmployeeListComponent`에서 사용했습니다.
상세 패널을 보면 Angular가 `EmployeeListComponent`의 템플릿을 평가하는 데 297ms 이상을 사용한 것을 확인할 수 있습니다.

<!--
## Optimizing slow computations
-->

<a id="optimizing-slow-computations"></a>

## 느린 연산 최적화하기

<!--
Here are several techniques to remove slow computations:

- **Optimizing the underlying algorithm**. This is the recommended approach. If you can speed up the algorithm that is causing the problem, you can speed up the entire change detection mechanism.
- **Caching using pure pipes**. You can move the heavy computation to a pure [pipe](guide/templates/pipes). Angular reevaluates a pure pipe only if it detects that its inputs have changed, compared to the previous time Angular called it.
- **Using memoization**. [Memoization](https://en.wikipedia.org/wiki/Memoization) is a similar technique to pure pipes, with the difference that pure pipes preserve only the last result from the computation where memoization could store multiple results.
- **Avoid repaints/reflows in lifecycle hooks**. Certain [operations](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) cause the browser to either synchronously recalculate the layout of the page or re-render it. Since reflows and repaints are generally slow, you want to avoid performing them in every change detection cycle.

Pure pipes and memoization have different trade-offs. Pure pipes are an Angular built-in concept compared to memoization, which is a general software engineering practice for caching function results. The memory overhead of memoization could be significant if you invoke the heavy computation frequently with different arguments.
-->

느린 연산을 제거하는 몇 가지 기법은 다음과 같습니다:

- **기반 알고리즘 최적화하기**.
  가장 권장하는 접근 방법입니다.
  문제를 일으키는 알고리즘의 속도를 높이면 전체 변경 감지 메커니즘의 속도도 높일 수 있습니다.
- **순수 파이프로 캐싱하기**.
  비용이 큰 연산을 순수 [파이프](guide/templates/pipes)로 옮길 수 있습니다.
  Angular는 이전 호출과 비교해 입력값이 변경된 경우에만 순수 파이프를 다시 평가합니다.
- **메모이제이션 사용하기**.
  [메모이제이션](https://en.wikipedia.org/wiki/Memoization)은 순수 파이프와 비슷한 기법이지만, 순수 파이프는 마지막 연산 결과만 보관하고 메모이제이션은 여러 결과를 저장할 수 있다는 차이가 있습니다.
- **생명주기 후킹 메서드에서 리페인트/리플로 피하기**.
  특정 [작업](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)은 브라우저가 페이지 레이아웃을 동기적으로 다시 계산하거나 다시 렌더링하도록 합니다.
  리플로와 리페인트는 대체로 느리므로 변경 감지 사이클마다 실행하는 것은 피하는 것이 좋습니다.

순수 파이프와 메모이제이션에는 서로 다른 장단점이 있습니다.
순수 파이프는 Angular에 내장된 개념이고, 메모이제이션은 함수 결과를 캐싱하는 일반적인 소프트웨어 개발 기법입니다.
다양한 인자로 비용이 큰 연산을 자주 실행하면 메모이제이션의 메모리 사용량이 상당히 커질 수 있습니다.
