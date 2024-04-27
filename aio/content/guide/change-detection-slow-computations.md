<!--
# Slow computations
-->
# 느린 연산

<!--
On every change detection cycle, Angular synchronously:

* Evaluates all template expressions in all components, unless specified otherwise, based on that each component's detection strategy
* Executes the `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`, and `ngOnChanges` lifecycle hooks.
A single slow computation within a template or a lifecycle hook can slow down the entire change detection process because Angular runs the computations sequentially.
-->
변화 감지 싸이클이 매번 실행될 때마다 Angular는 동기 방식으로 이런 동작을 합니다:

* 별도로 제외하지 않는 한, 컴포넌트 변화감지 정책에 따라 컴포넌트에 있는 템플릿 표현식을 모두 평가합니다.
* `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`, `ngOnChanges` 라이프싸이클 후킹 함수를 실행합니다.
그래서 템플릿 안이나 라이프싸이클 수킹 함수에 연산이 오래 걸리는 로직이 있으면 Angular가 순서대로 해결하는 변화 감지 과정이 전체적으로 오래 걸리게 됩니다.


<!--
## Identifying slow computations
-->
## 느린 연산 파악하기

<!--
You can identify heavy computations with Angular DevTools’ profiler. In the performance timeline, click a bar to preview a particular change detection cycle. This displays a bar chart, which shows how long the framework spent in change detection for each component. When you click a component, you can preview how long Angular spent  evaluating its template and lifecycle hooks.

<div class="lightbox">
  <img alt="Angular DevTools profiler preview showing slow computation" src="generated/images/guide/change-detection/slow-computations.png">
</div>

For example, in the preceding screenshot, the second recorded change detection cycle is selected. Angular spent over 573 ms on this cycle, with the most time spent in the `EmployeeListComponent`. In the details panel, you can see that Angular spent over 297 ms evaluating the template of the `EmployeeListComponent`.
-->
Angular가 제공하는 DevTools 프로파일러를 활용하면 어떤 연산을 실행할 때 오래 걸리는지 파악할 수 있습니다.
퍼포먼스 타임라인에서 개별 변화 감지 싸이클 막대를 클릭하면 됩니다.
막대 차트를 클릭하면 각 컴포넌트마다 변화 감지에 시간이 얼마나 걸리는지 확인할 수 있습니다.
그리고 컴포넌트를 클릭하면 템플릿과 라이프싸이클 후킹 함수에서 얼마나 많은 시간이 걸렸는지 확인할 수 있습니다.

<div class="lightbox">
  <img alt="Angular DevTools profiler preview showing slow computation" src="generated/images/guide/change-detection/slow-computations.png">
</div>

위 화면에서는 변화 감지 싸이클 중 두번째를 선택했습니다.
Angular는 이 변화 감지 싸이클 전체를 실행하는 데 573ms가 걸렸고, 이 시간의 대부분은 `EmployeeListComponent`에서 처리했습니다.
세부항목 패널을 보면, `EmployeeListComponent`의 템플릿에서 297ms가 걸린 것을 확인할 수 있습니다.


<!--
## Optimizing slow computations
-->
## 느린 연산 개선하기

<!--
Here are several techniques to remove slow computations:

* **Optimizing the underlying algorithm**. This is the recommended approach. If you can speed up the algorithm that is causing the problem, you can speed up the entire change detection mechanism.
* **Caching using pure pipes**. You can move the heavy computation to a [pure pipe](api/core/Pipe#pure). Angular reevaluates a pure pipe only if it detects that its inputs have changed, compared to the previous time Angular called it.
* **Using memoization**. [Memoization](https://en.wikipedia.org/wiki/Memoization) is a similar technique to pure pipes, with the difference that pure pipes preserve only the last result from the computation where memoization could store multiple results.
* **Avoid repaints/reflows in lifecycle hooks**. Certain [operations](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) cause the browser to either synchronously recalculate the layout of the page or re-render it. Since reflows and repaints are generally slow, you want to avoid performing them in every change detection cycle.

Pure pipes and memoization have different trade-offs. Pure pipes are an Angular built-in concept compared to memoization, which is a general software engineering practice for caching function results. The memory overhead of memoization could be significant if you invoke the heavy computation frequently with different arguments.
-->
느린 연산을 개선하는 방법을 몇가지 알아봅시다:

* **연산에 사용되는 알고리즘을 최적화하세요**. 가장 추천하는 방법입니다. 더 빠른 알고리즘을 사용하면 변화 감지 싸이클이 실행되는 시간을 확실하게 줄일 수 있습니다.
* **순수 파이프를 사용해서 캐싱하세요**. 시간이 오래 걸리는 무거운 연산은 [순수 파이프(pure pipe)](api/core/Pipe#pure)로 옮길 수 있습니다. 순수 파이프는 입력값이 변경되었을 때만 연산을 새롭게 실행합니다.
* **메모이제이션(memoization)을 활용하세요**. [메모이제이션](https://en.wikipedia.org/wiki/Memoization)은 순수 파이프와 비슷하지만, 순수 파이프는 직전 연산 결과 하나만 캐싱한다면 메모이제이션은 여러 연산 결과를 저장해둘 수 있다는 점이 다릅니다.
* **라이프싸이클 후킹 함수 안에서 리페인팅/리플로우 하지 마세요**. 특정 [연산](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)은 동기 방식으로 레이아웃을 다시 계산하거나 브라우저를 다시 렌더링합니다. 리플로우나 리페인트는 일반적으로 느리기 때문에, 변화 감지 싸이클의 성능을 위해서는 되도록 피해야 합니다.

순수 파이프와 메모이제이션의 장단점은 다릅니다.
순수 파이프는 Angular가 제공하는 개념이며, 함수의 결과를 캐싱하는 일반적인 방법입니다.
그리고 메모이제이션을 사용하는 경우에 인자가 변경되면서 복잡한 연산을 계속 하는 경우에는 메모리 사용량에 문제가 생길 수 있습니다.



@reviewed 2023-08-14
