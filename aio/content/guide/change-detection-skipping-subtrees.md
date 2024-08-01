<!--
# Skipping component subtrees
-->
# 컴포넌트 서브 트리 건너뛰기

<!--
JavaScript, by default, uses mutable data structures that you can reference from multiple different components. Angular runs change detection over your entire component tree to make sure that the most up-to-date state of your data structures is reflected in the DOM.

Change detection is sufficiently fast for most applications. However, when an application has an especially large component tree, running change detection across the whole application can cause performance issues. You can address this by configuring change detection to only run on a subset of the component tree.

If you are confident that a part of the application is not affected by a state change, you can use [OnPush](/api/core/ChangeDetectionStrategy) to skip change detection in an entire component subtree.
-->
기본적으로 JavaScript에서 다루는 데이터의 구조는 변경을 허용(mutable)하기 때문에 서로 다른 컴포넌트가 독립적으로 데이터 구조 어느 계층이라도 자유롭게 접근할 수 있습니다.
그리고 Angular는 마지막으로 변경된 데이터를 화면에 반영하기 위해 전체 컴포넌트 트리를 대상으로 변화 감지 로직을 실행합니다.

일반적으로 번화 감지 동작은 충분히 빠릅니다.
하지만 애플리케이션을 구성하는 컴포넌트 트리가 거대한 경우에는 변화감지가 애플리케이션 전 영역을 대상으로 실행되면서 성능 문제가 발생할 수 있습니다.
이 문제는 컴포넌트 트리를 나눠서 각 부분마다 적절한 변화 감지 동작을 실행하는 방식으로 해결할 수 있습니다.

애플리케이션의 특정 부분이 변화 감지의 영향을 받지 않아도 된다는 것이 명확하다면, 해당 서브트리의 변화 감지를 모두 생략하는 [OnPush](/api/core/ChangeDetectionStrategy) 정책을 지정하세요.


<!--
## Using `OnPush`
-->
## `OnPush` 사용하기

<!--
OnPush change detection instructs Angular to run change detection for a component subtree **only** when:
* The root component of the subtree receives new inputs as the result of a template binding. Angular compares the current and past value of the input with `==`
* Angular handles an event _(for example using event binding, output binding, or `@HostListener` )_ in the subtree's root component or any of its children whether they are using OnPush change detection or not.

You can set the change detection strategy of a component to `OnPush` in the `@Component` decorator:

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {}
```
-->
OnPush 변화 감지 정책을 사용하면 Angular는 컴포넌트 서브 트리가 **아래 상황일 때만** 변화 감지 로직을 실행합니다:
* 서브 트리의 최상위 컴포넌트가 템플릿으로 바인딩된 입력 프로퍼티로 새로운 입력값을 받았을 때. Angular는 기존 값과 새로운 값을 `==`로 비교합니다.
* 이벤트 바인딩이나 출력 바인딩, `@HostListener` 등으로 서브 트리의 최상위 컴포넌트나 그 자식 컴포넌트에서 이벤트를 받았을 때, 이 경우는 OnPush 지정 여부와 무관하게 변화 감지 동작이 실행됩니다.

컴포넌트의 변화 감지 정책은 `@Component` 데코레이터에서 지정할 수 있습니다:

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {}
```


<!--
## Common change detection scenarios
-->
## 변화 감지 동작 방식

<!--
This section examines several common change detection scenarios to illustrate Angular's behavior.
-->
이번 섹션에서는 변화 감지 로직이 어떻게 실행되는지 살펴봅시다.

<!--
## An event is handled by a component with default change detection
-->
## 변화 감지 정책이 기본값인 컴포넌트가 이벤트를 받았을 때

<!--
If Angular handles an event within a component without `OnPush` strategy, the framework executes change detection on the entire component tree. Angular will skip descendant component subtrees with roots using `OnPush`, which have not received new inputs.

As an example, if we set the change detection strategy of `MainComponent` to `OnPush` and the user interacts with a component outside the subtree with root `MainComponent`, Angular will check all the green components from the diagram below (`AppComponent`, `HeaderComponent`, `SearchComponent`, `ButtonComponent`) unless `MainComponent` receives new inputs:

<div class="lightbox">
  <img alt="Change detection propagation from non-OnPush component" src="generated/images/guide/change-detection/event-trigger.svg">
</div>
-->
`OnPush` 정책이 지정되지 않은 컴포넌트가 이벤트를 받으면 Angular는 전체 컴포넌트 트리를 대상으로 변화 감지 동작을 실행합니다.
이 때 컴포넌트 서브 트리 중 `OnPush`가 지정된 컴포넌트는 입력값을 새로 받지 않는 한 생략합니다.

그림으로 설명하면, `MainComponent`의 변화 감지 정책을 `OnPush`로 지정했고 `MainComponent` 상위 계층에서 사용자가 무언가 동작을 했다면, Angular는 아래 그림에서 녹색 컴포넌트들을 검사합니다.:

<div class="lightbox">
  <img alt="Change detection propagation from non-OnPush component" src="generated/images/guide/change-detection/event-trigger.svg">
</div>


<!--
## An event is handled by a component with OnPush
-->
## OnPush 정책이 적용된 컴포넌트에서 이벤트를 받았을 때

<!--
If Angular handles an event within a component with OnPush strategy, the framework will execute change detection within the entire component tree. Angular will ignore component subtrees with roots using OnPush, which have not received new inputs and are outside the component which handled the event.

As an example, if Angular handles an event within `MainComponent`, the framework will run change detection in the entire component tree. Angular will ignore the subtree with root `LoginComponent` because it has `OnPush` and the event happened outside of its scope.

<div class="lightbox">
  <img alt="Change detection propagation from OnPush component" src="generated/images/guide/change-detection/on-push-trigger.svg">
</div>
-->
OnPush 정책이 적용된 컴포넌트 안에서 이벤트가 발생했다면 Angular는 전체 컴포넌트 트리를 대상으로 변화 감지 동작을 실행합니다.
하지만 하위 컴포넌트 중 OnPush 정책이 적용된 컴포넌트는 입력값을 새로 받지 않는 한 여전히 대상에서 제외됩니다.

그림으로 설명하면, `MainComponent`가 이벤트를 받았으면 Angular는 전체 컴포넌트를 대상으로 변화 감지 동작을 실행하지만, `LoginComponent`는 `OnPush` 정책이 적용되었기 때문에 이 컴포넌트부터 그 안쪽은 검사하지 않습니다.

<div class="lightbox">
  <img alt="Change detection propagation from OnPush component" src="generated/images/guide/change-detection/on-push-trigger.svg">
</div>


<!--
## An event is handled by a descendant of a component with OnPush
-->
## OnPush 정책이 적용된 컴포넌트의 하위 컴포넌트에서 이벤트를 받았을 때

<!--
If Angular handles an event in a component with OnPush, the framework will execute change detection in the entire component tree, including the component’s ancestors.

As an example, in the diagram below, Angular handles an event in `LoginComponent` which uses OnPush. Angular will invoke change detection in the entire component subtree including `MainComponent` (`LoginComponent`’s parent), even though `MainComponent` has `OnPush` as well. Angular checks `MainComponent` as well because `LoginComponent` is part of its view.

<div class="lightbox">
  <img alt="Change detection propagation from nested OnPush component" src="generated/images/guide/change-detection/leaf-trigger.svg">
</div>
-->
OnPush 정책이 적용된 컴포넌트가 이벤트를 받으면 Angular는 전체 컴포넌트 트리를 대상으로 변화 감지 동작을 실행합니다.
이 때 이벤트를 받은 컴포넌트의 위쪽 계층도 모두 포함합니다.

그림으로 설명하면, OnPush 정책이 적용된 `LoginComponent`가 이벤트를 받으면 Angular는 `LoginComponent`의 부모 컴포넌트인 `MainComponent`가 `OnPush` 정책이더라도 이 컴포넌트를 포함하여 위쪽 컴포넌트 전체를 대상으로 변화 감지 동작을 실행합니다.
`LoginComponent`는 `MainComponent`의 일부이기 때문입니다.

<div class="lightbox">
  <img alt="Change detection propagation from nested OnPush component" src="generated/images/guide/change-detection/leaf-trigger.svg">
</div>


<!--
## New inputs to component with OnPush
-->
## OnPush 정책이 적용된 컴포넌트에 입력값이 새로 들어왔을 때

<!--
Angular will run change detection within a child component with `OnPush` when setting an input property as result of a template binding.

For example, in the diagram below, `AppComponent` passes a new input to `MainComponent`, which has `OnPush`. Angular will run change detection in `MainComponent` but will not run change detection in `LoginComponent`, which also has `OnPush`, unless it receives new inputs as well.

<div class="lightbox">
  <img alt="Change detection propagation with OnPush component that receives new inputs" src="generated/images/guide/change-detection/on-push-input.svg">
</div>
-->
컴포넌트에 `OnPush` 정책이 적용되었다고 해도 템플릿에 바인딩된 입력 프로퍼티로 새로운 입력값을 받으면 변화 감지 동작을 실행합니다.

그림으로 설명하면, `MainComponent`에 `OnPush` 정책을 적용했고 `AppComponent`가 `MainComponent`에 입력값을 전달했다고 합시다.
그러면 Angular는 `MainComponent`와 다른 컴포넌트 트리를 대상으로 변화 감지 동작을 실행하지만, `LoginComponent`에는 `OnPush` 정책이 별도로 지정되었기 때문에 이 컴포넌트는 생략합니다.

<div class="lightbox">
  <img alt="Change detection propagation with OnPush component that receives new inputs" src="generated/images/guide/change-detection/on-push-input.svg">
</div>


<!--
## Edge cases
-->
## 주의사항

<!--
* **Modifying input properties in TypeScript code**. When you use an API like `@ViewChild` or `@ContentChild` to get a reference to a component in TypeScript and manually modify an `@Input` property, Angular will not automatically run change detection for OnPush components. If you need Angular to run change detection, you can inject `ChangeDetectorRef` in your component and call `changeDetectorRef.markForCheck()` to tell Angular to schedule a change detection.
* **Modifying object references**. In case an input receives a mutable object as value and you modify the object but preserve the reference, Angular will not invoke change detection. That’s the expected behavior because the previous and the current value of the input point to the same reference.
-->
* **TypeScript 코드로 입력 프로퍼티 값을 변경한 경우**. TypeScript 코드로 `@ViewChild`나 `@ContentChild` 같은 API를 활용해서 컴포넌트를 참조한 후에, `@Input` 프로퍼티 값을 직접 변경하면 Angular는 OnPush 정책이 적용된 컴포넌트라도 변화 감지 동작을 실행하지 않습니다. 이렇게 사용해야 하는 경우라면 컴포넌트에 `ChangeDetectorRef`를 의존성을 주입하고 `changeDetectorRef.markForCheck()`를 실행해서 이 컴포넌트가 변화 감지의 대상이라는 것을 명확하게 지정야 합니다.
* **객체 안쪽 값을 변경한 경우**. 입력 프로퍼티를 객체로 받고, 객체 참조는 유지한 채로 객체 안쪽 값을 변경하면 Angular는 변화 감지 동작을 실행하지 않습니다. 이 경우는 이전과 같은 객체를 참조하기 때문에 입력값이 변경되지 않은 것으로 처리합니다.

@reviewed 2022-05-04
