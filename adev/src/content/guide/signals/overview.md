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
count.update(value => value + 1);
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
count.update(value => value + 1);
```

값을 쓸 수 있는 시그널은 `WritableSignal` 타입입니다.


<!--
### Computed signals
-->
### 연산 시그널(Computed signals)

<!--
**Computed signal** are read-only signals that derive their value from other signals. You define computed signals using the `computed` function and specifying a derivation:

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
이 말은, 나중ㅇ ㅔ`count` 시그널이 변경되더라도 `conditionalCount`는 연산을 다시 하지 않는 다는 것을 의미합니다.

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
## Effects
-->
## 효과 함수

<!--
Signals are useful because they notify interested consumers when they change. An **effect** is an operation that runs whenever one or more signal values change. You can create an effect with the `effect` function:

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Effects always run **at least once.** When an effect runs, it tracks any signal value reads. Whenever any of these signal values change, the effect runs again. Similar to computed signals, effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution.

Effects always execute **asynchronously**, during the change detection process.
-->
시그널은 해당 시그널을 구독하는 쪽으로 알림을 줄 수 있기 때문에 유용합니다.
그리고 이 시그널은 값이 변경될 때마다 효과 함수가 실행됩니다.
효과 함수의 동작을 지정하려면 `effect` 함수를 사용하면 됩니다.

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

효과 함수는 **최소한 한 번은** 실행됩니다.
그리고 효과 함수가 실행되면서 시그널을 추적하기 시작합니다.
효과 함수는 연산 시그널과 비슷하게, 의존성 관계도 동적으로 변경되며 가장 최근에 실행했을 때 값을 캐싱하며 시그널의 값이 변경되는지 감지합니다.

효과 함수는 언제나 변화 갑지 싸이클에서 **비동기로** 실행됩니다.


<!--
### Use cases for effects
-->
### 효과 함수 활용하기

<!--
Effects are rarely needed in most application code, but may be useful in specific circumstances. Here are some examples of situations where an `effect` might be a good solution:

- Logging data being displayed and when it changes, either for analytics or as a debugging tool.
- Keeping data in sync with `window.localStorage`.
- Adding custom DOM behavior that can't be expressed with template syntax.
- Performing custom rendering to a `<canvas>`, charting library, or other third party UI library.

<docs-callout critical title="When not to use effects">
Avoid using effects for propagation of state changes. This can result in `ExpressionChangedAfterItHasBeenChecked` errors, infinite circular updates, or unnecessary change detection cycles.

Instead, use `computed` signals to model state that depends on other state.
</docs-callout>
-->
효과 함수는 사용하는 경우가 거의 없지만, 이런 경우에는 유용합니다:

- 화면에 표시하는 데이터가 변경될 때마다 로그로 출력할 때
- `window.localStorage`과 데이터를 동기화해야 할 때
- 템플릿 문법으로 불가능한 커스텀 DOM 동작을 추가할 때
- `<canvas>` 로 렌더링을 커스터마이징 할 때, 차트 라이브러리를 사용하거나 서드 파티 UI 라이브러리를 사용할 때

<docs-callout critical
    title="효과 함수를 사용하지 말아야 하는 경우">

상태값이 변경되는 것을 전파할 때 효과 함수를 사용하지 마세요.
이렇게 사용하면 순환 종속성으로 변화 감지 싸이클이 무한으로 실행되며 `ExpressionChangedAfterItHasBeenChecked` 에러가 발생합니다.

상태값을 전파해야 하는 경우에는 `computed` 시그널을 사용하세요.

</docs-callout>

<!--
### Injection context
-->
### 의존성 주입 컨텍스트

<!--
By default, you can only create an `effect()` within an [injection context](guide/di/dependency-injection-context) (where you have access to the `inject` function). The easiest way to satisfy this requirement is to call `effect` within a component, directive, or service `constructor`:

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  constructor() {
    // Register a new effect.
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }
}
```

Alternatively, you can assign the effect to a field (which also gives it a descriptive name).

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);

  private loggingEffect = effect(() => {
    console.log(`The count is: ${this.count()}`);
  });
}
```

To create an effect outside the constructor, you can pass an `Injector` to `effect` via its options:

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  private injector = inject(Injector);

  initializeLogging(): void {
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    }, {injector: this.injector});
  }
}
```
-->
기본적으로 `effect()` 함수는 `inject` 함수에 접근할 수 있는 [의존성 주입 컨텍스트](guide/di/dependency-injection-context) 안에서 실행할 수 있습니다.
컴포넌트, 디렉티브, 서비스에서 이 조건을 만족하려면 `constructor` 함수 안에서 `effect`를 실행하는 것이 가장 간단합니다:

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  constructor() {
    // 효과 함수를 등록합니다.
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }
}
```

아니면 클래스 프로퍼티로 등록해도 됩니다.

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);

  private loggingEffect = effect(() => {
    console.log(`The count is: ${this.count()}`);
  });
}
```

생성자 함수 밖에서 효과 함수를 등록하려면 `Injector`를 인자로 전달해야 합니다:

```ts
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  private injector = inject(Injector);

  initializeLogging(): void {
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    }, {injector: this.injector});
  }
}
```


<!--
### Destroying effects
-->
### 효과 함수가 종료되는 과정

<!--
When you create an effect, it is automatically destroyed when its enclosing context is destroyed. This means that effects created within components are destroyed when the component is destroyed. The same goes for effects within directives, services, etc.

Effects return an `EffectRef` that you can use to destroy them manually, by calling the `.destroy()` method. You can combine this with the `manualCleanup` option to create an effect that lasts until it is manually destroyed. Be careful to actually clean up such effects when they're no longer required.
-->
효과 함수는 효과 함수가 생성된 컨텍스트가 종료될 때 함께 자동으로 종료됩니다.
이 말은, 효과 함수가 컴포넌트 컨텍스트에서 생성되었으면 컴포넌트가 종료될 때 함께 종료된다는 것을 의미합니다.
디렉티브나 서비스에서 생성하는 효과 함수도 마찬가지입니다.

효과 함수를 생성하면 `EffectRef`를 반환하기 때문에 `.destroy()` 메서드를 실행하면 수동으로 종료할 수 있습니다.
그리고 `manualCleanup` 옵션을 사용하면 수동으로 종료하기 전까지 종료되지 않는 효과 함수를 만들 수도 있습니다.
사용하지 않는 효과 함수는 반드시 정리해야 하는 것을 잊지 마세요.


<!--
## Advanced topics
-->
## 고급 주제

<!--
### Signal equality functions
-->
### 시그널 동일성 평가 함수

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

HELPFUL: By default, signals use referential equality ([`Object.is()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison).
-->
시그널을 생성할 때 동일성 평가 함수(equality function)를 옵션으로 지정할 수 있습니다.
이 함수는 새 값이 이전 값과 다른지 판단하는 역할을 합니다.

```ts
import _ from 'lodash';

const data = signal(['test'], {equal: _.isEqual});

// 인스턴스가 다르더라도 deep equal 함수가 동일성을 판단하기 때문에
// 시그널은 값을 갱신하지 않습니다.
data.set(['test']);
```

동일성 평가 함수는 값을 쓸 수 있는(writable) 시그널과 연산(computed) 시그널에 모두 사용할 수 있습니다.

도움말: 동일성 평가 함수의 기본값은 참조 비교([`Object.is()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/is))입니다.


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
### Effect cleanup functions
-->
### 효과 함수 종료하기

<!--
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
효과 함수의 실행이 길어지는 경우 다른 동작이 시작되기 전에 효과 함수를 정리해야 하는 경우가 있습니다.
이런 경우는 효과 함수를 생성할 때 첫번째 인자로 `onCleanup` 함수를 전달하면 됩니다.
이 방식으로 다음 실행이 시작되기 전이나 효과 함수가 종료될 때 실행할 콜백 함수를 등록할 수 있습니다.

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
## Using signals with RxJS
-->
## RxJS와 시그널 함께 사용하기

<!--
See [RxJS interop with Angular signals](ecosystem/rxjs-interop) for details on interoperability between signals and RxJS.
-->
시그널과 RxJS를 함께 사용하는 방법을 알아보려면 [RxJS와 Angular 시그널 함께 사용하기](ecosystem/rxjs-interop) 문서를 참고하세요.
