<!--
<docs-decorative-header title="Angular Signals" imgSrc="adev/src/assets/images/signals.svg"> <!- markdownlint-disable-line ->
Angular Signals is a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates.
</docs-decorative-header>

TIP: Check out Angular's [Essentials](essentials/signals) before diving into this comprehensive guide.
-->

<docs-decorative-header
    title="Angular 시그널" imgSrc="adev/src/assets/images/signals.svg">
Angular 시그널은 애플리케이션의 특정 상태가 어떻게 변경되는지, 어디로 전파되는지 프레임워크가 추적하는 시스템이며, Angular는 이 상태 변화에 맞춰 렌더링을 최적화합니다.
</docs-decorative-header>

팁: 전문적인 내용을 확인하기 전에 [핵심 가이드](essentials/signals)를 읽어보는 것도 좋습니다.

<!--
## What are signals?
-->

## 시그널이 무엇인가요?

<!--
A **signal** is a wrapper around a value that notifies interested consumers when that value changes. Signals can contain any value, from primitives to complex data structures.

You read a signal's value by calling its getter function, which allows Angular to track where the signal is used.

Signals may be either _writable_ or _read-only_.
-->

**시그널(signal)** 은 값을 감싸는 래퍼(wrapper)인데, 시그널은 그 값이 변경될 때 관심있는 사용자에게 알림을 보냅니다.
시그널은 기본 자료형부터 복잡한 데이터 구조까지 다양한 값을 담을 수 있습니다.

시그널의 값을 읽으려면 시그널 생성 함수를 실행하면 되고, Angular도 이 방식을 사용해서 시그널의 값이 변경되는 것을 추적합니다.

시그널은 _값을 쓸 수 있거나(writable)_ _읽기 전용(read-only)_ 입니다.

<!--
### Writable signals
-->

### 값을 쓸 수 있는 시그널(Writable signals)

<!--
Writable signals provide an API for updating their values directly. You create writable signals by calling the `signal` function with the signal's initial value:

```ts
const count = signal(0);

// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());
```

To change the value of a writable signal, either `.set()` it directly:

```ts
count.set(3);
```

or use the `.update()` operation to compute a new value from the previous one:

```ts
// Increment the count by 1.
count.update((value) => value + 1);
```

Writable signals have the type `WritableSignal`.
-->

값을 쓸 수 있는 시그널의 값을 변경하려면 시그널의 내부 메서드를 직접 실행하면 됩니다.
이런 시그널은 `signal` 함수로 생성할 수 있으며, 시그널을 생성하면서 초기값을 지정할 수도 있습니다:

```ts
const count = signal(0);

// 시그널은 그 자체로 게터 함수입니다. 값을 읽으려면 실행하세요.
console.log('The count is: ' + count());
```

시그널의 값을 변경하려면 `.set()` 메서드를 실행하면 됩니다:

```ts
count.set(3);
```

아니면 `.update()` 메서드를 사용해서 이전 값을 참조하는 방식으로 변경할 수 있습니다:

```ts
// 값을 1 증가시킵니다.
count.update((value) => value + 1);
```

값을 쓸 수 있는 시그널은 `WritableSignal` 타입입니다.

<!--
#### Converting writable signals to readonly
-->

#### 값을 쓸 수 있는 시그널을 읽기 전용으로 전환하기

<!--
`WritableSignal` provide a `asReadonly()` method that returns a readonly version of the signal. This is useful when you want to expose a signal's value to consumers without allowing them to modify it directly:

```ts
@Service()
export class CounterState {
  // Private writable state
  private readonly _count = signal(0);

  readonly count = this._count.asReadonly(); // public readonly

  increment() {
    this._count.update((v) => v + 1);
  }
}

@Component({
  /* ... */
})
export class AwesomeCounter {
  state = inject(CounterState);

  count = this.state.count; // can read but not modify

  increment() {
    this.state.increment();
  }
}
```

The readonly signal reflects any changes made to the original writable signal, but cannot be modified using `set()` or `update()` methods.

IMPORTANT: The readonly signals do **not** have any built-in mechanism that would prevent deep-mutation of their value.
-->

`WritableSignal`이 제공하는 `asReadonly()` 메서드를 실행하면 이 시그널의 읽기 전용 시그널을 참조할 수 있습니다.
시그널 값을 변경하며 사용하지만, 수정은 막으려고 하는 경우에 사용하면 됩니다:

```ts
@Service()
export class CounterState {
  // Private writable state
  private readonly _count = signal(0);

  readonly count = this._count.asReadonly(); // public readonly

  increment() {
    this._count.update((v) => v + 1);
  }
}

@Component({
  /* ... */
})
export class AwesomeCounter {
  state = inject(CounterState);

  count = this.state.count; // 값을 읽을 수 있지만 변경할 수는 없습니다.

  increment() {
    this.state.increment();
  }
}
```

읽기 전용 시그널은 원래 시그널의 값을 그대로 반영하지만, `set()`이나 `update()` 메서드를 사용할 수는 없습니다.

중요: 읽기 전용 시그널은 객체 내부의 값 변경을 방지하지는 않습니다.

<!--
### Computed signals
-->

### 연산 시그널(Computed signals)

<!--
**Computed signals** are read-only signals that derive their value from other signals. You define computed signals using the `computed` function and specifying a derivation:

```typescript
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

The `doubleCount` signal depends on the `count` signal. Whenever `count` updates, Angular knows that `doubleCount` needs to update as well.
-->

**연산 시그널(Computed signal)** 은 어떤 시그널의 영향을 받아값이 변경되는 시그널을 의미합니다.
연산 시그널은 `computed` 함수로 생성할 수 있습니다:

```typescript
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

위 코드에서 `doubleCount` 시그널은 `count` 시그널에 영향을 받습니다.
`count` 시그널의 값이 변경되면 `doubleCount`의 값도 변경되며, Angular는 이 변화를 감지합니다.

<!--
#### Computed signals are both lazily evaluated and memoized
-->

#### 연산 시그널은 지연 연산되며 연산된 결과는 캐싱됩니다

<!--
`doubleCount`'s derivation function does not run to calculate its value until the first time you read `doubleCount`. The calculated value is then cached, and if you read `doubleCount` again, it will return the cached value without recalculating.

If you then change `count`, Angular knows that `doubleCount`'s cached value is no longer valid, and the next time you read `doubleCount` its new value will be calculated.

As a result, you can safely perform computationally expensive derivations in computed signals, such as filtering arrays.
-->

`doubleCount`는 처음 실행하기 전까지 실제 연산을 수행하지 않습니다.
그리고 계산된 값은 캐싱되며, 다음 `doubleCount`를 실행하면 다시 연산하지 않고 캐싱된 값을 바로 반환합니다.

이후에 `count` 시그널이 변경되면 Angular는 이를 감지하고 `doubleCount`에 캐싱된 값이 더이상 유효하지 않다는 것을 판단하기 때문에, 이후에 `doubleCount`를 실행하면 실제 연산이 실행됩니다.

따라서 배열 필터링과 같이 계산이 많은 경우라면 연산 시그널을 사용하는 것이 성능면에서 유리합니다.

<!--
#### Computed signals are not writable signals
-->

#### 연산 시그널은 값을 지정할 수 없습니다

<!--
You cannot directly assign values to a computed signal. That is,

```ts
doubleCount.set(3);
```

produces a compilation error, because `doubleCount` is not a `WritableSignal`.
-->

연산 시그널에는 직접 값을 설정할 수 없습니다.

```ts
doubleCount.set(3);
```

이렇게 코드를 작성하면 컴파일 에러가 발생합니다.
`doubleCount`는 `WritableSignal` 타입이 아니기 때문입니다.

<!--
#### Computed signal dependencies are dynamic
-->

#### 연산 시그널의 종속성은 동적으로 변경됩니다

<!--
Only the signals actually read during the derivation are tracked. For example, in this `computed` the `count` signal is only read if the `showCount` signal is true:

```ts
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

When you read `conditionalCount`, if `showCount` is `false` the "Nothing to see here!" message is returned _without_ reading the `count` signal. This means that if you later update `count` it will _not_ result in a recomputation of `conditionalCount`.

If you set `showCount` to `true` and then read `conditionalCount` again, the derivation will re-execute and take the branch where `showCount` is `true`, returning the message which shows the value of `count`. Changing `count` will then invalidate `conditionalCount`'s cached value.

Note that dependencies can be removed during a derivation as well as added. If you later set `showCount` back to `false`, then `count` will no longer be considered a dependency of `conditionalCount`.
-->

Angular는 구독자가 있는 시그널만 시그널만 추적합니다.
`showCount` 시그널이 `true` 값일 때만 값을 참조하는 `count` 연산 시그널이 있다고 합니다:

```ts
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

이제 `showCount` 시그널의 값이 `false`일 때 `conditionalCount` 시그널의 값을 읽으면 `count` 시그널은 _실행되지도 않고_ "Nothing to see here" 메시지가 반환됩니다.
이 말은, 나중에 `count` 시그널이 변경되더라도 `conditionalCount`는 연산을 다시 하지 않는 다는 것을 의미합니다.

그리고 `showCount` 시그널의 값이 `true` 일 때 `conditionCount` 시그널의 값을 읽으면, 시그널의 증분 함수가 실행되면서 `showCount`가 `true`인 분기를 타게 되고, `count` 시그널의 값을 문자열에 담아 반환합니다.
그리고 `count` 시그널이 변경되면 `conditionalCount` 시그널에 캐싱된 값도 유효하지 않은 것으로 판단합니다.

시그널의 종속성은 동적으로 변경됩니다.
이후에 `showCount` 시그널의 값이 `false`가 되면, `conditionalCount` 시그널은 더이상 `count` 값이 변경되는 것을 감지하지 않습니다.

<!--
## Reading signals in `OnPush` components
-->

## 컴포넌트 `OnPush` 함수에서 시그널 읽기

<!--
When you read a signal within an `OnPush` component's template, Angular tracks the signal as a dependency of that component. When the value of that signal changes, Angular automatically [marks](api/core/ChangeDetectorRef#markforcheck) the component to ensure it gets updated the next time change detection runs. Refer to the [Skipping component subtrees](best-practices/skipping-subtrees) guide for more information about `OnPush` components.
-->

컴포넌트 템플릿에서 시그널을 참조하면 Angular는 이 시그널의 의존성을 추적합니다.
그래서 종속 관계인 시그널의 값이 변경되며 Angular가 컴포넌트를 [마크(marks)](api/core/ChangeDetectorRef#markforcheck) 했다가 다음 변경 감지 싸이클이 실행될 때 화면을 갱신합니다.
자세한 내용은 [컴포넌트 서브트리 건너뛰기](best-practices/skipping-subtrees) 문서를 참고하세요.

<!--
## Reactive contexts
-->

## 반응 컨텍스트

<!--
A **reactive context** is a runtime state where Angular monitors signal reads to establish a dependency. The code reading the signal is the _consumer_, and the signal being read is the _producer_.

Angular automatically enters a reactive context when:

- Executing an `effect`, `afterRenderEffect` callback.
- Evaluating a `computed` signal.
- Evaluating a `linkedSignal`.
- Evaluating a `resource`'s params or loader function.
- Rendering a component template (including bindings in the [host property](guide/components/host-elements#binding-to-the-host-element)).

During these operations, Angular creates a _live_ connection. If a tracked signal changes, Angular will _eventually_ re-run the consumer.
-->

**반응 컨텍스트(reactive context)** 는 Angular가 시그널을 모니터링하고 의존성을 관리하는 실행 상태를 의미합니다.
값을 보내는 시그널을 _프로듀서(producer)_ 라고 하며, 시그널에서 값을 읽는 코드를 _컨슈머(consumer)_ 라고 합니다.

Angular가 반응 컨텍스트로 관리하는 경우는 이렇습니다:

- `effect`, `afterRenderEffect` 콜백을 실행할 때
- `computed` 시그널 값을 계산할 때
- `linkedSignal` 시그널 값을 계산할 때
- `resource` 인자나 로더 함수 값을 계산할 때
- 컴포넌트 템플릿을 렌더링 할 때 ([호스트 프로퍼티](guide/components/host-elements#binding-to-the-host-element)도 포함합니다)

이 작업중에 Angular는 별도 연결을 생성하는데, 추적하는 시그널이 변경되면 컨슈머를 다시 실행합니다.

<!--
### Asserts the reactive context
-->

### 반응 컨텍스트에서 assert 사용하기

<!--
Angular provides the `assertNotInReactiveContext` helper function to assert that code is not executing within a reactive context. Pass a reference to the calling function so the error message points to the correct API entry point if the assertion fails. This produces a clearer, more actionable error message than a generic reactive context error.

```ts
import {assertNotInReactiveContext} from '@angular/core';

function subscribeToEvents() {
  assertNotInReactiveContext(subscribeToEvents);
  // Safe to proceed - subscription logic here
}
```
-->

Angular 코드가 반응 컨텍스트에서 실행되지 않으면 assert를 보내는 헬퍼 함수 `assertNotInReactriveContext` 를 제공합니다.
이 함수에 실행 코드의 참조를 전달하고 assert가 동작하면, 오류 메시지를 확인해서 올바른 API 진입점을 확인할 수 있습니다.
일반적인 내용만 있는 에러 메시지가 아니라, 어떻게 해결할 수 있는지 명확하게 안내하는 에러 메시지를 제공합니다.

```ts
import {assertNotInReactiveContext} from '@angular/core';

function subscribeToEvents() {
  assertNotInReactiveContext(subscribeToEvents);
  // 진행해도 안전합니다. 구독 코드는 여기에 작성합니다.
}
```

<!--
### Reading without tracking dependencies
-->

### 추적 종속성과 관계없이 값 읽기

<!--
Rarely, you may want to execute code which may read signals within a reactive function such as `computed` or `effect` _without_ creating a dependency.

For example, suppose that when `currentUser` changes, the value of a `counter` should be logged. You could create an `effect` which reads both signals:

```ts
effect(() => {
  console.log(`User set to ${currentUser()} and the counter is ${counter()}`);
});
```

This example will log a message when _either_ `currentUser` or `counter` changes. However, if the effect should only run when `currentUser` changes, then the read of `counter` is only incidental and changes to `counter` shouldn't log a new message.

You can prevent a signal read from being tracked by calling its getter with `untracked`:

```ts
effect(() => {
  console.log(`User set to ${currentUser()} and the counter is ${untracked(counter)}`);
});
```

`untracked` is also useful when an effect needs to invoke some external code which shouldn't be treated as a dependency:

```ts
effect(() => {
  const user = currentUser();
  untracked(() => {
    // If the `loggingService` reads signals, they won't be counted as
    // dependencies of this effect.
    this.loggingService.log(`User set to ${user}`);
  });
});
```
-->

드문 경우지만, `computed`나 `effect`와 같은 반응형 함수 안에서 종속성을 _추가하지 않고_ 코드를 실행할 수 있습니다.

예를 들면, `currentUser` 시그널의 값이 변경될 때 `counter` 시그널의 값을 로그로 출력한다고 합시다.
그렇다면 이런 효과 함수를 작성할 수 있습니다:

```ts
effect(() => {
  console.log(`User set to ${currentUser()} and the counter is ${counter()}`);
});
```

이렇게 구현하면 `currentUser` 시그널이나 `counter` 시그널 _둘 중에 하나가 변경될 때마다_ 로그가 출력됩니다.
하지만 효과 함수가 `currentUser` 시그널이 변경될 때만 반응해야 하고, `counter` 시그널이 변경되는 것은 감지하지 않아야 하는 경우는 어떻게 해야 할까요?

이런 경우라면 `untracked` 함수 안에 게터 함수를 전달하면 됩니다:

```ts
effect(() => {
  console.log(`User set to ${currentUser()} and the counter is ${untracked(counter)}`);
});
```

`untracked` 함수는 종속성 관계가 아닌 외부 코드를 실행해야 할 때도 유용합니다:

```ts
effect(() => {
  const user = currentUser();
  untracked(() => {
    // `logginvService`는 `user` 시그널을 읽지만, 종속성 관계는 아닙니다.
    this.loggingService.log(`User set to ${user}`);
  });
});
```

<!--
### Reactive context and async operations
-->

### 비동기 연산의 반응 컨텍스트

<!--
The reactive context is only active for synchronous code. Any signal reads that occur after an asynchronous boundary will not be tracked as dependencies.

```ts {avoid}
effect(async () => {
  const data = await fetchUserData();
  // Reactive context is lost here - theme() won't be tracked
  console.log(`User: ${data.name}, Theme: ${theme()}`);
});
```

To ensure all signal reads are tracked, read signals before the `await`. This includes passing them as arguments to the awaited function, since arguments are evaluated synchronously:

```ts {prefer}
effect(async () => {
  const currentTheme = theme(); // Read before await
  const data = await fetchUserData();
  console.log(`User: ${data.name}, Theme: ${currentTheme}`);
});
```

```ts {prefer}
effect(async () => {
  // Also works: signal is read before await (as function argument)
  await renderContent(docContent());
});
```
-->

반응 컨텍스트는 동기 방식으로 실행되는 코드에서만 활성화됩니다.
그래서 비동기 코드 이후에 읽는 시그널은 값을 제대로 추적할 수 없습니다.

```ts {avoid}
effect(async () => {
  const data = await fetchUserData();
  // 반응 컨텍스트를 여기에서 놓칩니다. - theme()는 추적하지 않습니다.
  console.log(`User: ${data.name}, Theme: ${theme()}`);
});
```

시그널을 놓치지 않으려면, `await` 앞에서 시그널을 읽으면 됩니다.
await 함수에 전달되는 인자들은 동기 방식으로 평가되기 때문입니다:

```ts {prefer}
effect(async () => {
  const currentTheme = theme(); // await 전에 참조합니다.
  const data = await fetchUserData();
  console.log(`User: ${data.name}, Theme: ${currentTheme}`);
});
```

```ts {prefer}
effect(async () => {
  // 이 방식도 동작합니다: 시그널은 함수 인자로 전달되어 await 전에 값을 참조했습니다.
  await renderContent(docContent());
});
```

<!--
## Advanced derivations
-->

## 고급 파생

<!--
While `computed` handles simple readonly derivations, you might find yourself needing a writable state that is dependent on other signals.
For more information see the [Dependent state with linkedSignal](/guide/signals/linked-signal) guide.

All signal APIs are synchronous— `signal`, `computed`, `input`, etc. However, applications often need to deal with data that is available asynchronously. A `Resource` gives you a way to incorporate async data into your application's signal-based code and still allow you to access its data synchronously. For more information see the [Async reactivity with resources](/guide/signals/resource) guide.
-->

`computed`는 간단하게 읽기 전용 시그널을 참조하지만, 시그널 상태에 따라 값을 써야 하는 경우가 있습니다.
자세한 내용은 [linkedSignal을 활용한 의존 상태 관리](/guide/signals/linked-signal) 문서를 참고하세요.

`signal`, `computed`, `input` 등 모든 시그널 API는 동기 방식으로 동작합니다.
하지만 애플리케이션은 종종 비동기 작업을 수행합니다.
이 때 `resource` 함수를 사용하면 비동기 데이터를 애플리케이션의 시그널 기반 코드에 통합하면서도 데이터에 동기 방식으로 접근할 수 있습니다.
자세한 내용은 [resource를 활용한 비동기 반응성](/guide/signals/resource)

<!--
## Executing side effects on non-reactive APIs
-->

## 반응형 API가 아닌 코드를 실행하는 경우

<!--
Synchronous or asynchronous derivations are recommended when we want to react to state changes. However, this doesn't cover all the possible use cases, and you'll sometimes find yourself in a situation where you need to react to signal changes on non-reactive apis. Use `effect` or `afterRenderEffect` for those specific usecases. For more information see [Side effects for non-reactive APIs](/guide/signals/effect) guide.
-->

앱 상태 변화에 반응할 때는 동기 방식이든 비동기 방식으로 시그널을 추적하면 됩니다.
하지만 예외 경우가 있을 수 있으며, 반응형 API가 아닌 코드가 실행될 때 시그널이 반응해야 하는 경우도 있습니다.
이런 경우는 `effect`나 `afterRenderEffect`를 사용하면 됩니다.
자세한 내용은 [비반응형 API에 반응하기](/guide/signals/effect) 문서를 참고하세요.

<!--
## Reading signals in `OnPush` components
-->

## `OnPush` 컴포넌트에서 시그널 읽기

<!--
When you read a signal within an `OnPush` component's template, Angular tracks the signal as a dependency of that component. When the value of that signal changes, Angular automatically [marks](api/core/ChangeDetectorRef#markforcheck) the component to ensure it gets updated the next time change detection runs. Refer to the [Skipping component subtrees](best-practices/skipping-subtrees) guide for more information about `OnPush` components.
-->

`OnPush` 컴포넌트 템플리셍서 시그널 값을 읽으면 Angular는 이 컴포넌트과 관련된 시그널도 함께 추적합니다.
그리고 시그널의 값이 변경되면, Angular는 다음 변화감지 사이클에서 컴포넌트를 갱신할 수 있게 컴포넌트를 [마킹](api/core/ChangeDetectorRef#markforcheck)합니다.
`OnPush` 컴포넌트에 대해 자세하게 알아보려면 [컴포넌트 서브트리 건너뛰기](best-practices/skipping-subtrees) 문서를 참고하세요.

<!--
## Advanced topics
-->

## 고급 주제

<!--
### Signal equality functions
-->

### 시그널 동일값 평가 함수

<!--
When creating a signal, you can optionally provide an equality function, which will be used to check whether the new value is actually different than the previous one.

```ts
import isEqual from 'lodash/isEqual';

const data = signal(['test'], {equal: isEqual});

// Even though this is a different array instance, the deep equality
// function will consider the values to be equal, and the signal won't
// trigger any updates.
data.set(['test']);
```

Equality functions can be provided to both writable and computed signals.

HELPFUL: By default, signals use referential equality ([`Object.is()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison).
-->

시그널을 생성할 때 이 시그널에 동일값인지 판단하는 함수를 전달할 수 있습니다.
이 함수는 시그널에 새 값이 설정될 때 이전 값과 같은 값인지 검사하는 함수입니다.

```ts
import isEqual from 'lodash/isEqual';

const data = signal(['test'], {equal: isEqual});

// 배열의 참조가 다르기 때문에 깊은 참조 비교에서 새 값은 이전 값과 동일하다고 판단합니다.
// 시그널 갱신 트리거는 동작하지 않습니다.
data.set(['test']);
```

동일값 평가 함수는 값을 쓸 수 있는(writable) 시그널과 값을 계산하는(computed) 시그널에 모두 사용할 수 있습니다.

참고: 시그널이 사용하는 기본 평가 함수는 [`Object.is()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 비교를 사용합니다.

<!--
### Type checking signals
-->

### 시그널 타입 검사

<!--
You can use `isSignal` to check if a value is a `Signal`:

```ts
const count = signal(0);
const doubled = computed(() => count() * 2);

isSignal(count); // true
isSignal(doubled); // true
isSignal(42); // false
```

To specifically check if a signal is writable, use `isWritableSignal`:

```ts
const count = signal(0);
const doubled = computed(() => count() * 2);

isWritableSignal(count); // true
isWritableSignal(doubled); // false
```
-->

`isSignal` 함수를 사용하면 어떤 객체가 시그널 객체인지 확인할 수 있습니다:

```ts
const count = signal(0);
const doubled = computed(() => count() * 2);

isSignal(count); // true
isSignal(doubled); // true
isSignal(42); // false
```

좀 더 구체적으로 값을 쓸 수 있는 시그널인지 확인하려면 `isWritableSignal`을 사용하면 됩니다.

```ts
const count = signal(0);
const doubled = computed(() => count() * 2);

isWritableSignal(count); // true
isWritableSignal(doubled); // false
```

<!--
## Using signals with RxJS
-->

## RxJS와 시그널 함께 사용하기

<!--
See [RxJS interop with Angular signals](ecosystem/rxjs-interop) for details on interoperability between signals and RxJS.
-->

시그널과 RxJS를 함께 사용하는 방법을 알아보려면 [RxJS와 Angular 시그널 함께 사용하기](ecosystem/rxjs-interop) 문서를 참고하세요.
