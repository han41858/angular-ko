<!--
# Angular Signals
-->
# Angular 시그널

<!--
**Angular Signals** is a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize
rendering updates.
-->
**Angular 시그널(Signals)**은 프레임워크가 화면 갱신을 최적화하기 위해 어떤 상태가 애플리케이션 어디에서 어떻게 사용되는지 추적하는 시스템입니다.


<!--
## What are signals?
-->
## 시그널이란?

<!--
A **signal** is a wrapper around a value that can notify interested consumers when that value changes. Signals can contain any value, from simple primitives to complex data structures.

A signal's value is always read through a getter function, which allows Angular to track where the signal is used.

Signals may be either _writable_ or _read-only_.
-->
**시그널**은 어떤 값이 변경되는 것을 추적하고 싶은 구독자를 위해 값을 감싸는 랩퍼(wrapper)입니다.
그래서 시그널은 어떤 값을 갖고 있는데, 이 값은 단순한 기본 타입이거나 복잡한 데이터 구조일 수 있습니다.

시그널은 게터(getter) 함수를 사용해서 값을 참조하기 때문에, Angular는 이 시그널이 어디에 사용되는지 추적할 수 있습니다.

시그널은 _발송(writable)_ 시그널 이거나 _읽기 전용_ 시그널 입니다.


<!--
### Writable signals
-->
### 발송 시그널(writable signals)

<!--
Writable signals provide an API for updating their values directly. You create writable signals by calling the `signal` function with the signal's initial value:

```ts
const count = signal(0);

// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());
```

To change the value of a writable signal, you can either `.set()` it directly:

```ts
count.set(3);
```

or use the `.update()` operation to compute a new value from the previous one:

```ts
// Increment the count by 1.
count.update(value => value + 1);
```

Writable signals have the type `WritableSignal`.
-->
발송 시그널은 값을 변경할 수 있는 API를 제공합니다.
`signal()` 함수를 사용해서 발송 시그널을 생성할 때 초기 값을 지정할 수 있습니다:

```ts
const count = signal(0);

// 시그널의 값을 읽으려면 게터 함수를 사용하면 됩니다.
console.log('The count is: ' + count());
```

발송 시그널의 값을 변경하려면 `.set()` 함수를 직접 실행하면 됩니다:

```ts
count.set(3);
```

아니면 `.update()`를 사용해서 이전 값을 참조하여 변경하는 방식으로도 사용할 수 있습니다:

```ts
// 값을 1 더합니다.
count.update(value => value + 1);
```

발송 시그널은 `WritableSignal` 타입입니다.


<!--
### Computed signals
-->
### 연산 시그널(Computed signals)

<!--
A **computed signal** derives its value from other signals. Define one using `computed` and specifying a derivation function:

```typescript
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

The `doubleCount` signal depends on `count`. Whenever `count` updates, Angular knows that anything which depends on either `count` or `doubleCount` needs to update as well.
-->
**연산 시그널**은 어떤 시그널의 값을 변환해서 다른 시그널로 전달하는 시그널입니다.
연산 시그널은 `computed` 함수로 선언합니다:

```typescript
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

위 예제에서 `doubleCount` 시그널은 `count` 시그널의 영향을 받습니다.
그래서 `count` 시그널의 값이 달라지면 Angular는 `count` 시그널과 `doubleCount` 시그널이 사용되는 곳에 갱신이 필요하다고 알려줍니다.


<!--
#### Computed signals are both lazily evaluated and memoized
-->
#### 연산 시그널은 지연 평가되며 캐싱됩니다.

<!--
`doubleCount`'s derivation function does not run to calculate its value until the first time `doubleCount` is read. Once calculated, this value is cached, and future reads of `doubleCount` will return the cached value without recalculating.

When `count` changes, it tells `doubleCount` that its cached value is no longer valid, and the value is only recalculated on the next read of `doubleCount`.

As a result, it's safe to perform computationally expensive derivations in computed signals, such as filtering arrays.
-->
`doubleCount` 시그널은 값을 처음 읽기 전까지는 계산을 실행하지 않습니다.
그리고 한 번 계산된 후에는 시그널의 값이 캐싱되기 때문에, 이후에 `doubleCount` 시그널의 값을 읽을 때는 계산을 다시 하지 않고 캐싱된 값을 반환합니다.

그리고 `count` 시그널의 값이 변경되면 이제 `doubleCount` 시그널에 캐싱된 값이 유효하지 않기 때문에, 다음 `doubleCount` 시그널의 값을 읽을 때 다시 계산합니다.

그래서 연산 시그널은 배열을 필터링하는 것과 같이 연산이 오래 걸리는 작업에 특히 유리합니다.


<!--
#### Computed signals are not writable signals
-->
#### 연산 시그널은 발송 시그널이 아닙니다.

<!--
You cannot directly assign values to a computed signal. That is,

```ts
doubleCount.set(3);
```

produces a compilation error, because `doubleCount` is not a `WritableSignal`.
-->
연산 시그널에는 값을 직접 지정할 수 없습니다.

```ts
doubleCount.set(3);
```

그래서 위와 같이 사용하면 `doubleCount`는 `WritableSignal`이 아니기 때문에 컴파일 에러가 발생합니다.


<!--
#### Computed signal dependencies are dynamic
-->
#### 연산 시그널의 의존성은 동적으로 변합니다.

<!--
Only the signals actually read during the derivation are tracked. For example, in this computed the `count` signal is only read conditionally:

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

When reading `conditionalCount`, if `showCount` is `false` the "Nothing to see here!" message is returned _without_ reading the `count` signal. This means that updates to `count` will not result in a recomputation.

If `showCount` is later set to `true` and `conditionalCount` is read again, the derivation will re-execute and take the branch where `showCount` is `true`, returning the message which shows the value of `count`. Changes to `count` will then invalidate `conditionalCount`'s cached value.

Note that dependencies can be removed as well as added. If `showCount` is later set to `false` again, then `count` will no longer be considered a dependency of `conditionalCount`.
-->
시그널은 이 시그널을 읽는 주체가 있을 때만 값을 계산합니다.
그래서 아래 예제에서 `count` 연산 시그널은 조건에 해당되는 로직만 실행됩니다:

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

`conditionCount` 시그널의 값을 읽으려고 하면 `showCount` 시그널의 값이 `false`이기 때문에 `count` 시그널은 참조하지 않고 "Nothing to see here!" 메시지를 반환합니다.
이 경우에는 `count` 시그널의 값이 계산되지 않습니다.

하지만 이후에 `showCount` 시그널의 값이 `true`로 변경되고 `conditionalCount` 시그널의 값을 다시 읽으면, 이 때는 함수가 다시 실행되면서 `showCount` 시그널의 값이 `true`인 조건절을 타면서 `count` 시그널의 값을 문자열에 담아 반환합니다.
그리고 `count` 시그널의 값이 변경되면 `conditionalCOunt`에 캐싱된 값도 더이상 유효하지 않다고 판단합니다.

이렇듯 시그널의 종속성은 줄어들거나 추가될 수 있습니다.
이후에 `showCount` 시그널의 값이 `false`로 설정되면 `counditionalCount` 시그널이 평가될 때 `count` 시그널이 더이상 영향을 주지 않습니다.


<!--
## Reading signals in `OnPush` components
-->
## `OnPush` 컴포넌트에서 시그널 읽기

<!--
When an `OnPush` component uses a signal's value in its template, Angular will track the signal as a dependency of that component. When that signal is updated, Angular automatically [marks](/api/core/ChangeDetectorRef#markforcheck) the component to ensure it gets updated the next time change detection runs. Refer to the [Skipping component subtrees](/guide/change-detection-skipping-subtrees) guide for more information about `OnPush` components.
-->
`OnPush` 컴포넌트의 템플릿에서 시그널의 값을 참조하면, Angular는 이 컴포넌트가 시그널에 의존성이 있다는 것을 추적합니다.
그래서 시그널의 값이 갱신되면 Angular는 자동으로 컴포넌트에 [표시](/api/core/ChangeDetectorRef#markforcheck)를 해서 다음에 변화 감지 로직이 실행될 때 컴포넌트를 갱신합니다.
`OnPush` 컴포넌트를 자세하게 알아보려면 [컴포넌트 서브 트리 건너뛰기](/guide/change-detection-skipping-subtrees) 문서를 참고하세요.


<!--
## Effects
-->
## 변경 감지 함수(`effect()`)

<!--
Signals are useful because they can notify interested consumers when they change. An **effect** is an operation that runs whenever one or more signal values change. You can create an effect with the `effect` function:

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Effects always run **at least once.** When an effect runs, it tracks any signal value reads. Whenever any of these signal values change, the effect runs again. Similar to computed signals, effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution.

Effects always execute **asynchronously**, during the change detection process.

Note: the `effect()` API is still in [developer preview](/guide/releases#developer-preview) as we work to integrate signal-based reactivity into the core framework.
-->
시그널은 이 시그널의 값이 변경되었다는 것을 알릴 수 있기 때문에 특히 유용합니다.
**effect** 함수는 시그널의 값이 변경된 것을 감지할 때마다 실행되는 변경 감지 함수입니다.
이렇게 사용하면 됩니다:

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

변경 감지 함수는 **최소한 한 번은 실행됩니다.**
그리고 한 번 실행되고 나면 시그널의 값이 변경되는 것을 추적하다가 시그널의 값이 변경되면 변경 감지 함수가 다시 실행됩니다.
변경 감지 함수는 연산 시그널과 비슷하게 의존성이 동적으로 변경되며, 가장 최근에 실행하면서 참조했던 시그널만 추적합니다.

변경 감지 함수는 Angular의 변화 감지 싸이클이 실행될 때 함께 실행되지만 **비동기로** 실행됩니다.

참고: `effect()` API는 시그널 기반으로 동작하는 반응 로직이 프레임워크에 정식으로 도입되기 전까지는 아직 [개발자 프리뷰](/guide/releases#developer-preview) 단계입니다.


<!--
### Use cases for effects
-->
### 변경 감지 함수가 유용한 경우

<!--
Effects are rarely needed in most application code, but may be useful in specific circumstances. Here are some examples of situations where an `effect` might be a good solution:

* Logging data being displayed and when it changes, either for analytics or as a debugging tool
* Keeping data in sync with `window.localStorage`
* Adding custom DOM behavior that can't be expressed with template syntax
* Performing custom rendering to a `<canvas>`, charting library, or other third party UI library
-->
변경 감지 함수는 사용할 일이 거의 없지만 이런 상황에서는 유용할 수 있습니다:

* 데이터가 변경되는 것을 로그나 디버깅 툴로 출력할 때
* 데이터를 `window.localStorage` 와 동기화 할 때
* 템플릿 구문으로 표현할 수 없는 커스텀 DOM 동작을 추가할 때
* `<canvas>`나 차트 라이브러리 등 서드 파티 UI 라이브러리에서 커스텀 렌더링을 수행할 때


<!--
#### When not to use effects
-->
#### 변경 감지 함수를 사용하면 좋지 않은 경우

<!--
Avoid using effects for propagation of state changes. This can result in `ExpressionChangedAfterItHasBeenChecked` errors, infinite circular updates, or unnecessary change detection cycles.

Because of these risks, setting signals is disallowed by default in effects, but can be enabled if absolutely necessary.
-->
상태가 변경된 것을 다른 곳으로 전달할 때는 사용하지 마세요.
이렇게 사용하면 순환 참조가 계속 발생하거나 불필요한 변화 감지 싸이클이 실행되기도 하면서 `ExpressionChangedAfterItHasBeenChecked` 에러가 발생합니다.

이런 위험 때문에 변경 감지 함수에서 시그널의 값을 변경하는 것은 기본적으로 허용되지 않습니다.
꼭 필요하다면 활성화할 수 있습니다.


<!--
### Injection context
-->
### 의존성 주입 컨텍스트

<!--
By default, registering a new effect with the `effect()` function requires an [injection context](/guide/dependency-injection-context) (access to the `inject` function). The easiest way to provide this is to call `effect` within a component, directive, or service `constructor`:

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  constructor() {
    // Register a new effect.
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    });
  }
}
```

Alternatively, the effect can be assigned to a field (which also gives it a descriptive name).

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  
  private loggingEffect = effect(() => {
    console.log(`The count is: ${this.count()})`);
  });
}
```

To create an effect outside of the constructor, you can pass an `Injector` to `effect` via its options:

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  constructor(private injector: Injector) {}

  initializeLogging(): void {
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    }, {injector: this.injector});
  }
}
```
-->
기본적으로 `effect()` 함수로 새로운 변경 감지 함수를 추가하려면 [의존성 주입 컨텍스트](/guide/dependency-injection-context)가 필요합니다.
가장 쉬운 방법은 컴포넌트, 디렉티브, 서비스의 생성자 안에서 `effect`를 실행하는 것입니다:

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  constructor() {
    // 새로운 변경 감지 함수를 등록합니다.
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    });
  }
}
```

아니면 클래스 필드로 할당하는 방법도 있습니다.

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  
  private loggingEffect = effect(() => {
    console.log(`The count is: ${this.count()})`);
  });
}
```

생성자 밖에서 변경 감지 함수를 등록하려면 아래 예제 코드처럼 `Injector`를 의존성 객체로 주입받아 활용하면 됩니다:

```ts
@Component({...})
export class EffectiveCounterCmp {
  readonly count = signal(0);
  constructor(private injector: Injector) {}

  initializeLogging(): void {
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    }, {injector: this.injector});
  }
}
```


<!--
### Destroying effects
-->
### 변경 감지 함수 종료하기

<!--
When you create an effect, it is automatically destroyed when its enclosing context is destroyed. This means that effects created within components are destroyed when the component is destroyed. The same goes for effects within directives, services, etc.

Effects return an `EffectRef` that can be used to destroy them manually, via the `.destroy()` operation. This can also be combined with the `manualCleanup` option to create an effect that lasts until it is manually destroyed. Be careful to actually clean up such effects when they're no longer required.
-->
변경 감지 함수를 한 번 생성하고 나면, 이 함수가 등록된 컨텍스트가 종료될때 변경 감지 함수도 자동으로 종료됩니다.
이 말은, 컴포넌트에 변경 감지 함수가 등록되면 이 컴포넌트가 종료될 때 함께 종료된다는 것을 의미합니다.
디렉티브나 서비스의 경우도 그렇습니다.

변경 감지 함수가 반환하는 `EffectRef` 객체의 `.destroy()` 함수를 실행하면 변경 감지 함수를 수동으로 종료할 수 있습니다.
아니면 `manualCleanup` 옵션을 사용해서 수동으로 종료하기 전까지 자동 종료되지 않도록 생성할 수도 있습니다.
변경 감지 함수가 필요하지 않은 경우에는 잊지 말고 꼭 인스턴스를 종료하세요.


<!--
## Advanced topics
-->
## 심화

<!--
### Signal equality functions
-->
### 시그널 값 평가 함수

<!--
When creating a signal, you can optionally provide an equality function, which will be used to check whether the new value is actually different than the previous one.

```ts
import _ from 'lodash';

const data = signal(['test'], {equal: _.isEqual});

// Even though this is a different array instance, the deep equality
// function will consider the values to be equal, and the signal won't
// trigger any updates.
data.set(['test']);
```

Equality functions can be provided to both writable and computed signals.
-->
시그널을 생성할 때 평가 함수를 등록할 수 있습니다.
그러면 새로운 값이 이전 값과 다른지 판단할 때 이 평가 함수를 활용합니다.

```ts
import _ from 'lodash';

const data = signal(['test'], {equal: _.isEqual});

// 배열의 인스턴스는 다르지만 평가 함수는 그 안의 값이 같은지 판단하기 때문에 
// 시그널의 값은 동일하다고 판단합니다.
data.set(['test']);
```

평가 함수는 발송 시그널과 연산 시그널에 모두 사용할 수 있습니다.


<!--
### Reading without tracking dependencies
-->
### 의존성을 추가하지 않고 참조하기

<!--
Rarely, you may want to execute code which may read signals in a reactive function such as `computed` or `effect` _without_ creating a dependency.

For example, suppose that when `currentUser` changes, the value of a `counter` should be logged. Creating an `effect` which reads both signals:

```ts
effect(() => {
  console.log(`User set to `${currentUser()}` and the counter is ${counter()}`);
});
```

This example logs a message when _either_ `currentUser` or `counter` changes. However, if the effect should only run when `currentUser` changes, then the read of `counter` is only incidental and changes to `counter` shouldn't log a new message.

You can prevent a signal read from being tracked by calling its getter with `untracked`:

```ts
effect(() => {
  console.log(`User set to `${currentUser()}` and the counter is ${untracked(counter)}`);
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
드물게는 반응형 함수 안에서 `computed`나 `effect` 함수로 의존성 시그널을 _추가로 생성하지 않고_ 시그널의 값을 읽어야 할 때가 있습니다.

`currentUser` 시그널의 값이 변경될 때 `counter` 시그널의 값을 로그에 출력해야 한다고 합시다.
`effect` 함수를 사용하면 이렇게 구현할 수 있습니다:

```ts
effect(() => {
  console.log(`User set to `${currentUser()}` and the counter is ${counter()}`);
});
```

위 코드처럼 구현하면 `currentUser` 시그널이나 `counter` 시그널의 값이 변경될 때 로그가 출력됩니다.
하지만 변경 감지 함수가 `currentuser` 시그널이 변경되었을 때만 실행되고, `counter` 시그널이 변경되는 것을 감지하지 않은 채 참조만 한다고 합시다.

이런 경우에는 `untracked` 게터 함수를 사용해서 시그널 값 참조를 우회하면 됩니다:

```ts
effect(() => {
  console.log(`User set to `${currentUser()}` and the counter is ${untracked(counter)}`);
});
```

`untracked` 함수는 의존성으로 고려하지 않는 외부 코드를 실행해야 할 때도 유용합니다:

```ts
effect(() => {
  const user = currentUser();
  untracked(() => {
    // `logginService`가 시그널의 값을 읽지만 시그널과 직접 연결된 것은 아닙니다.
    this.loggingService.log(`User set to ${user}`);
  });
});
```


<!--
### Effect cleanup functions
-->
### 변경 감지 함수 종료 함수

<!--
Effects might start long-running operations, which should be cancelled if the effect is destroyed or runs again before the first operation finished. When you create an effect, your function can optionally accept an `onCleanup` function as its first parameter. This `onCleanup` function lets you register a callback that is invoked before the next run of the effect begins, or when the effect is destroyed.

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
변경 감지 함수는 오랫동안 실행될 수 있지만 더이상 필요하지 않거나 다시 실행되는 경우는 이전 실행을 정리해야 합니다.
이런 경우를 위해 변경 감지 함수를 등록할 때 함수의 첫번째 인자로 `onCleanup` 함수를 등록할 수 있습니다.
`onCleanup` 함수를 등록하면 변경 감지 함수가 종료되거나 다음 실행이 시작되기 전에 실행될 콜백 함수를 지정할 수 있습니다.

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

@reviewed 2023-06-21
