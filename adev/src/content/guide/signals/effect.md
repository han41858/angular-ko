<!--
## Effects
-->

## `effect()`

<!--
Signals are useful because they notify interested consumers when they change. An **effect** is an operation that runs whenever one or more signal values change. You can create an effect with the `effect` function:

```ts
import {effect} from '@angular/core';

effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Effects always run **at least once.** When an effect runs, it tracks any signal value reads. Whenever any of these signal values change, the effect runs again. Similar to computed signals, effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution.

Effects always execute **asynchronously**, during the change detection process.
-->

시그널은 시그널 값이 변경되었다는 것을 컨슈머(consumer)가 알 수 있다는 점에서 유용합니다.
시그널 값 하나 또는 여러개가 변경될 때마다 로직을 실행하려면 `effect()` 함수를 실행하면 됩니다:

```ts
import {effect} from '@angular/core';

effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

`effect()` 함수는 **반드시 한 번은 실행됩니다.**
그리고 한 번 실행되고 나면 참조하는 시그널들의 값이 변경되는 것을 추적하다가, 시그널 값이 변경되면 `effect()` 함수를 다시 실행합니다.
`computed()` 시그널과 비슷하게, `effect()` 시그널은 참조하는 시그널이 동적으로 변경될 수 있으며, 가장 최근에 실행된 시그널을 추적합니다.

이펙트 시그널은 변화 감지 동작에서 언제나 **비동기** 로 실행됩니다.

<!--
### Use cases for effects
-->

### 활용사례

<!--
Effects should be the last API you reach for. Always prefer `computed()` for derived values and `linkedSignal()` for values that can be both derived and manually set. If you find yourself copying data from one signal to another with an effect, it's a sign you should move your source-of-truth higher up and use `computed()` or `linkedSignal()` instead. Effects are best for syncing signal state to imperative, non-signal APIs.

TIP: There are no situations where effect is good, only situations where it is appropriate.

- Logging signal values, either for analytics or as a debugging tool.
- Keeping data in sync with different kind of storages: `window.localStorage`, session storage, cookies etc.
- Adding custom DOM behavior that can't be expressed with template syntax.
- Performing custom rendering to a `<canvas>` element, charting library, or other third party UI library.

<docs-callout critical title="When not to use effects">
Avoid using effects for propagation of state changes. This can result in `ExpressionChangedAfterItHasBeenChecked` errors, infinite circular updates, or unnecessary change detection cycles.

Instead, use `computed` signals to model state that depends on other state.
</docs-callout>
-->

이펙트 시그널은 마지막에 사용해야 하는 API입니다.
보통은 `computed()`를 사용할 수 있으며, 시그널이 여러 개로 파생되거나 수동으로 조작하려면 `linkedSignal()`을 사용하는 것이 좋습니다.
만약 이펙트 시그널로 어떤 시그널 값을 다른 시그널로 옮기고 있다면, 원본 데이터(source of truth)를 더 상단으로 올리고 `computed()`나 `linkedSignal()`을 사용하는 것이 좋습니다.
`effect()` 함수는 시그널이 아닌 API와 시그널을 동기화할 때 가장 효과적입니다.

참고: `effect()`가 더 나은 상황은 없습니다. 사용하기 적절한 경우만 있습니다.

- 분석하거나 디버깅 툴에서 시그널 값을 로그에 출력하는 경우
- `window.localStorage`나 세션 스토리지, 쿠키 등 다른 스토리지의 데이터를 동기화 할 때
- 템플릿 문법으로 표현할 수 없는 커스텀 DOM 동작을 추가할 때
- `<canvas>` 엘리먼트나 차트 라이브러리, 서드 파티 UI 라이브러리를 사용해서 렌더링을 커스터마이징 할 때

<docs-callout critical title="`effect()`를 사용하지 말아야 하는 경우">

상태값을 단순하게 전파하는 용도로 `effect()`를 사용하지 마세요.
이런 용도로 사용하면 `ExpressionChangedAfterItHasBeenChecked` 에러가 발생하거나, 무한 루프에 빠지거나, 불필요한 변화 감지 싸이클이 실행될 수 있습니다.

다른 상태에 의존하는 시그널 모델을 다룰 때는 `computed()`를 사용하세요.

</docs-callout>

<!--
### Injection context
-->

### 의존성 주입 컨텍스트

<!--
By default, you can only create an `effect()` within an [injection context](guide/di/dependency-injection-context) (where you have access to the `inject` function). The easiest way to satisfy this requirement is to call `effect` within a component, directive, or service `constructor`:

```ts
@Component({
  /*...*/
})
export class EffectiveCounter {
  readonly count = signal(0);

  constructor() {
    // Register a new effect.
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }
}
```

To create an effect outside the constructor, you can pass an `Injector` to `effect` via its options:

```ts
@Component({
  /*...*/
})
export class EffectiveCounter {
  readonly count = signal(0);
  private injector = inject(Injector);

  initializeLogging(): void {
    effect(
      () => {
        console.log(`The count is: ${this.count()}`);
      },
      {injector: this.injector},
    );
  }
}
```
-->

`effect()` 함수는 기본적으로 `inject` 함수를 사용할 수 있는 [의존성 주입 컨텍스트](guide/di/dependency-injection-context) 안에서만 실행할 수 있습니다.
이 조건을 만족하는 방법 중 가장 쉬운 방법은, 컴포넌트, 디렉티브, 서비스 클래스의 `constructor` 안에서 `effect()`를 실행하는 것입니다:

```ts
@Component({
  /*...*/
})
export class EffectiveCounter {
  readonly count = signal(0);

  constructor() {
    // effect() 함수를 사용합니다.
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }
}
```

클래서 생성자 밖에서 `effect()` 함수를 사용하려면 `effect()` 함수에 `Injector`를 다음과 같이 전달하면 됩니다:

```ts
@Component({
  /*...*/
})
export class EffectiveCounter {
  readonly count = signal(0);
  private injector = inject(Injector);

  initializeLogging(): void {
    effect(
      () => {
        console.log(`The count is: ${this.count()}`);
      },
      {injector: this.injector},
    );
  }
}
```

<!--
### Execution of effects
-->

### `effect()` 실행과정

<!--
Angular implicitly defines two implicit behaviors for its effects depending on the context they were created in.

A "View Effect" is an `effect` created in the context of a component instantiation. This includes effects created by services that are tied to component injectors.<br>
A "Root Effect" is created in the context of a root provided service instantiation.

The execution of both kinds of `effect` are tied to the change detection process.

- "View effects" are executed _before_ their corresponding component is checked by the change detection process.
- "Root effects" are executed prior to all components being checked by the change detection process.

In both cases, if at least one of the effect dependencies changed during the effect execution, the effect will re-run before moving ahead on the change detection process.
-->

이펙트 시그널은 생성된 컨텍스트에 따라 암묵적으로 두 가지 동작 중 하나가 적용됩니다.

"뷰 이펙트(View Effect)" 시그널은 컴포넌트 초기화 단계에서 생성된 이펙트 시그널을 의미합니다.
컴포넌트 인젝터와 연결된 서비스가 생성한 시그널도 포함합니다.<br>
"최상위 이펙트(Root Effect)" 시그널은 최상위 계층에 등록된 서비스 초기화 단계에서 실행된 이펙트 시그널을 의미합니다.

`effect()` 함수는 컴포넌트의 변화 감지 과정과 연동됩니다.

- "뷰 이펙트"는 컴포넌트 변화를 검사하기 _전에_ 실행됩니다.
- "최상위 이펙트"는 변화 감지 싸이클에서 모든 컴포넌트를 검사하기 전에 실행됩니다.

두 경우 모두 변화 감지를 감지하는 중간에 다른 변동사항이 감지되면, 진행중인 변화 감지 싸이클이 종료되고 `effect()` 함수를 다시 실행합니다.

<!--
### Destroying effects
-->

### 종료과정

<!--
When a component or directive is destroyed, Angular automatically cleans up any associated effects.

An `effect` can be created in two different contexts that will affect when it's destroyed:

- A "View effect" is destroyed when the component is destroyed.
- A "Root effect" is destroyed when the application is destroyed.

Effects return an `EffectRef`. You can use the ref's `destroy` method to manually dispose of an effect. You can combine this with the `manualCleanup` option when creating an effect to disable automatic cleanup. Be careful to actually destroy such effects when they're no longer required.
-->

컴포넌트나 디렉티브가 종료되면, Angular는 이와 관련된 이펙트 시그널도 모두 종료합니다.

이펙트 시그널은 두 가지 컨텍스트에서 생성될 수 있기 때문에 종료되는 시점이 다릅니다:

- "뷰 이펙트" 시그널은 컴포넌트가 종료되면 종료됩니다.
- "최상위 이펙트" 시그널은 애플리케이션이 종료되면 졷료됩니다.

`effect()` 함수는 `EffectRef`를 반환합니다.
이펙트 시그널의 자동 종료를 생략하고 수동으로 종료하려면 시그널을 생성할 때 `manualCleanup` 옵션을 지정한 후에 `destroy()` 메서드를 실행하면 됩니다.
이런 경우는 시그널이 필요하지 않을 때 반드시 종료해야 하는 것을 잊지 마세요.

<!--
### Effect cleanup functions
-->

### 이펙트 시그널 종료 함수

<!--
When a component or directive is destroyed, Angular automatically cleans up any associated effects.
Effects might start long-running operations, which you should cancel if the effect is destroyed or runs again before the first operation finished. When you create an effect, your function can optionally accept an `onCleanup` function as its first parameter. This `onCleanup` function lets you register a callback that is invoked before the next run of the effect begins, or when the effect is destroyed.

```ts
effect((onCleanup) => {
  const user = currentUser();

  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);

  onCleanup(() => {
    clearTimeout(timer);
  });
});
```
-->

컴포넌트나 디렉티브가 종료되면 Angular는 연관된 모든 이펙트 시그널을 자동으로 정리합니다.
이펙트 시그널은 오랜 시간동안 실행될 수 있는데, 이 시그널이 다시 실행되려면 이전 동작이 완료되거나 종료되어야 합니다.
그렇다면, 이펙트 시그널을 생성할 때 옵션으로 `onCleanUp` 함수를 지정할 수 있습니다.
`onCleanup` 함수는 시그널이 종료될 떄 실행되는 콜백 함수로 등록됩니다.

```ts
effect((onCleanup) => {
  const user = currentUser();

  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);

  onCleanup(() => {
    clearTimeout(timer);
  });
});
```

<!--
## Side effects on DOM elements
-->

## DOM 엘리먼트 부수효과

<!--
The `effect` function is a general-purpose tool for running code in reaction to signal changes. However, it runs _before_ the Angular updates the DOM. In some situations, you may need to manually inspect or modify the DOM, or integrate a 3rd-party library that requires direct DOM access.

For these situations, you can use `afterRenderEffect`. It functions like `effect`, but runs after Angular has finished rendering and committed its changes to the DOM.

```ts
@Component({
  /*...*/
})
export class MyFancyChart {
  chartData = input.required<ChartData>();
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  chart: ChartInstance;

  constructor() {
    // Run a single time to create the chart instance
    afterNextRender({
      write: () => {
        this.chart = initializeChart(this.canvas().nativeElement(), this.chartData());
      },
    });

    // Re-run after DOM has been updated whenever `chartData` changes
    afterRenderEffect(() => {
      this.chart.updateData(this.chartData());
    });
  }
}
```

In this example `afterRenderEffect` is used to update a chart created by a 3rd party library.

TIP: You often don't need `afterRenderEffect` to check for DOM changes. APIs like `ResizeObserver`, `MutationObserver` and `IntersectionObserver` are preferred to `effect` or `afterRenderEffect` when possible.
-->

`effect()` 함수는 시그널이 변경되는 것을 반응하는 용도의 범용 도구입니다.
하지만 이 함수는 Angular가 DOM을 갱신하기 _전에_ 실행됩니다.
그래서 DOM을 수동으로 검사하거나 조작해야 하는 경우, 서드 파티 라이브러리를 사용하는 경우라면 DOM에 직접 접근해야 합니다.

이런 경우에는 `afterRenderEffect()`를 사용하면 됩니다.
이 함수는 `effect()` 함수와 비슷하지만, Angular가 렌더링을 끝내고 변동사항을 DOM에 반영한 후에 실행됩니다.

```ts
@Component({
  /*...*/
})
export class MyFancyChart {
  chartData = input.required<ChartData>();
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  chart: ChartInstance;

  constructor() {
    // 차트 인스턴스를 생성할 때 한 번 실행합니다.
    afterNextRender({
      write: () => {
        this.chart = initializeChart(this.canvas().nativeElement(), this.chartData());
      },
    });

    // `chartData`가 변경될 때마다 다시 실행합니다.
    afterRenderEffect(() => {
      this.chart.updateData(this.chartData());
    });
  }
}
```

위 예제에서 `afterRenderEffect()`는 서드 파티 라이브러리가 차트를 갱신하는 것을 전제로 실행했습니다.

참고: DOM 변화를 감지하는 경우라도 `afterRenderEffect()`를 꼭 사용해야 할 필요는 없습니다.
`effect()`나 `afterRenderEffect()`를 사용하는 대신 `ResizeObserver`, `MutationObserver`, `IntersectionObserver`와 같은 API 활용을 검토해 보세요.

<!--
### Render phases
-->

### 렌더링 단계

<!--
Accessing the DOM and mutating it can impact the performance of your application, for example by triggering too many unnecessary [reflows](https://developer.mozilla.org/en-US/docs/Glossary/Reflow).

To optimize those operations, `afterRenderEffect` offers four phases to group the callbacks and execute them in an optimized order.

The phases are:

| Phase            | Description                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `earlyRead`      | Use this phase to read from the DOM before a subsequent write callback, for example to perform custom layout that the browser doesn't natively support. Prefer the read phase if reading can wait. |
| `write`          | Use this phase to write to the DOM. **Never** read from the DOM in this phase.                                                                                                                     |
| `mixedReadWrite` | Use this phase to read from and write to the DOM simultaneously. Never use this phase if it is possible to divide the work among the other phases instead.                                         |
| `read`           | Use this phase to read from the DOM. **Never** write to the DOM in this phase.                                                                                                                     |

Using these phases helps prevent layout thrashing and ensures that your DOM operations are performed in a safe and efficient manner.

You can specify the phase by passing an object with a `phase` property to `afterRender` or `afterNextRender`:

```ts
afterRenderEffect({
  earlyRead: (cleanupFn) => {
    /* ... */
  },
  write: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
  mixedReadWrite: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
  read: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
});
```

CRITICAL: If you don't specify the phase, `afterRenderEffect` runs callbacks during the `mixedReadWrite` phase. This may worsen application performance by causing additional DOM reflows.
-->

DOM에 접근하고 변경하는 것은 애플리케이션 성능에 영향을 미칠 수 있습니다.
불필요한 [리플로우(reflows)](https://developer.mozilla.org/en-US/docs/Glossary/Reflow)가 발생하는 경우가 그렇습니다.

이 과정을 최적화하려면, `afterRenderEffect()`가 제공하는 단계마다 콜백 로직을 그룹화하고 최적화된 순서로 실행할 수 있습니다.

이런 단계로 진행됩니다:

| 단계             | 설명                                                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `earlyRead`      | 쓰기 콜백 전에 DOM을 읽을 때 사용합니다. 브라우저가 기본적으로 지원하지 않는 레이아웃 수정을 실행할 때 유용합니다. 가능하다면 `read` 단계를 활용하는 것이 더 좋습니다. |
| `write`          | DOM에 쓰기 작업을 할 때 사용합니다. 이 단계에서 **절대** DOM을 읽지 마세요.                                                                                            |
| `mixedReadWrite` | DOM을 동시에 읽고 쓸 때 사용합니다. 되도록이면 이 단계를 사용하지 말고 다른 단계로 로직을 나누는 것이 좋습니다.                                                        |
| `read`           | DOM을 읽을 때 사용합니다. 이 단계에서 **절대** DOM을 쓰지 마세요.                                                                                                      |

네 단계를 잘 활용하면 불필요한 레이아웃 스레싱(thrashing)을 막고, DOM 작업을 안전하고 효율적으로 수행할 수 있습니다.

`afterRender()`나 `afterNextRender()` 함수에 옵션 인자를 전달하면서 다음과 같이 단계를 지정하면 됩니다:

```ts
afterRenderEffect({
  earlyRead: (cleanupFn) => {
    /* ... */
  },
  write: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
  mixedReadWrite: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
  read: (previousPhaseValue, cleanupFn) => {
    /* ... */
  },
});
```

중요: 단계를 지정하지 않으면 `afterRenderEffect()`는 `mixedReadWrite` 단계에서 콜백을 실행합니다.
DOM 리플로우가 발생하는 경우라면 애플리케이션 성능에 영향을 미칩니다.

<!--
#### Phase executions
-->

#### 단계 실행

<!--
The `earlyRead` phase callback receives no parameters. Each subsequent phase receives the return value of the previous phase's callback as a Signal. You can use this to coordinate work across phases.

Effects run in the following phase order:

1. `earlyRead`
2. `write`
3. `mixedReadWrite`
4. `read`

If one of the phases modifies a signal value tracked by `afterRenderEffect`, the affected phases execute again.
-->

`earlyRead` 단계의 콜백은 인자를 받지 않습니다.
그리고 이후 단계들은 이전 단계에서 반환하는 값을 인자로 받습니다.
단계 사이에 데이터를 전달해야 하는 경우에 활용하면 됩니다.

이펙트 시그널은 다음 단계로 실행됩니다:

1. `earlyRead`
2. `write`
3. `mixedReadWrite`
4. `read`

이 단계가 진행되는 동안 시그널의 값이 변경되면 `afterRenderEffect()` 함수에서 해당 단계가 다시 실행됩니다.

<!--
#### Cleanup
-->

#### 정리

<!--
Each phase provides a cleanup callback function as argument. The cleanup callbacks are executed when the `afterRenderEffect` is destroyed or before re-running phase effects.
-->

각 단계마다 정리 콜백 함수를 인자로 전달할 수 있습니다.
이렇게 등록하는 정리 함수는 `afterRenderEffect()`가 종료되거나 페이즈 함수가 다시 실행되기 전에 실행됩니다.

<!--
### Server-side rendering caveats
-->

### 서버 사이드 렌더링에서 주의사항

<!--
`afterRenderEffect`, similarly to `afterNextRender`/`afterEveryRender`, only runs on the client.

NOTE: Components are not guaranteed to be [hydrated](/guide/hydration) before the callback runs. You must use caution when directly reading or writing the DOM and layout.
-->

`afterRenderEffect()`는 `afterNextRender()`, `afterEveryRender()`와 비슷하게 클라이언트에서만 실행됩니다.

참고: 컴포넌트는 콜백 함수가 실행되기 전에 [하이드레이션 된 상태(hydrated)](/guide/hydration)를 보장하지 않습니다.
DOM이나 레이아웃을 직접 읽고 변경하는 경우에 주의해야 합니다.
