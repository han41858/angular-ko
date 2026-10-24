<!--
# RxJS interop with Angular signals
-->

<a id="rxjs-interop-with-angular-signals"></a>

# Angular 시그널과 RxJS 연동

<!--
The `@angular/core/rxjs-interop` package offers APIs that help you integrate RxJS and Angular signals.
-->

`@angular/core/rxjs-interop` 패키지는 RxJS와 Angular 시그널을 연동하는 API를 제공합니다.

<!--
## Create a signal from an RxJS Observable with `toSignal`
-->

<a id="create-a-signal-from-an-rxjs-observable-with-tosignal"></a>

<a id="tosignal로-rxjs-observable에서-시그널-생성하기"></a>

## `toSignal`로 RxJS 옵저버블에서 시그널 생성하기

<!--
Use the `toSignal` function to create a signal which tracks the value of an Observable. It behaves similarly to the `async` pipe in templates, but is more flexible and can be used anywhere in an application.

```angular-ts
import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {interval} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  template: `{{ counter() }}`,
})
export class Ticker {
  counterObservable = interval(1000);

  // Get a `Signal` representing the `counterObservable`'s value.
  counter = toSignal(this.counterObservable, {initialValue: 0});
}
```

Like the `async` pipe, `toSignal` subscribes to the Observable immediately, which may trigger side effects. The subscription created by `toSignal` automatically unsubscribes from the given Observable when the component or service which calls `toSignal` is destroyed.

IMPORTANT: `toSignal` creates a subscription. You should avoid calling it repeatedly for the same Observable, and instead reuse the signal it returns.
-->

`toSignal` 함수를 사용하면 옵저버블의 값을 추적하는 시그널을 생성할 수 있습니다.
템플릿의 `async` 파이프와 비슷하게 동작하지만, 더 유연하고 애플리케이션 어디에서나 사용할 수 있습니다.

```angular-ts
import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {interval} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  template: `{{ counter() }}`,
})
export class Ticker {
  counterObservable = interval(1000);

  // `counterObservable`의 값을 나타내는 `Signal`을 가져옵니다.
  counter = toSignal(this.counterObservable, {initialValue: 0});
}
```

`async` 파이프와 마찬가지로 `toSignal`은 옵저버블을 즉시 구독하므로 사이드 이펙트가 발생할 수 있습니다.
`toSignal`이 생성한 구독은 `toSignal`을 호출한 컴포넌트나 서비스가 종료될 때 해당 옵저버블에서 자동으로 해제됩니다.

중요: `toSignal`은 구독을 생성합니다.
같은 옵저버블에 대해 반복해서 호출하지 말고, 반환된 시그널을 재사용하세요.

<!--
### Injection context
-->

<a id="injection-context"></a>

### 의존성 주입 컨텍스트

<!--
`toSignal` by default needs to run in an [injection context](guide/di/dependency-injection-context), such as during construction of a component or service. If an injection context is not available, you can manually specify the `Injector` to use instead.
-->

`toSignal`은 기본적으로 컴포넌트나 서비스가 생성되는 시점과 같은 [의존성 주입 컨텍스트](guide/di/dependency-injection-context)에서 실행해야 합니다.
의존성 주입 컨텍스트를 사용할 수 없다면 사용할 `Injector`를 직접 지정할 수 있습니다.

<!--
### Initial values
-->

<a id="initial-values"></a>

### 초기값

<!--
Observables may not produce a value synchronously on subscription, but signals always require a current value. There are several ways to deal with this "initial" value of `toSignal` signals.
-->

옵저버블은 구독할 때 동기적으로 값을 생성하지 않을 수 있지만, 시그널은 항상 현재 값이 필요합니다.
`toSignal` 시그널의 "초기값"은 몇 가지 방법으로 처리할 수 있습니다.

<!--
#### The `initialValue` option
-->

<a id="the-initialvalue-option"></a>

#### `initialValue` 옵션

<!--
As in the example above, you can specify an `initialValue` option with the value the signal should return before the Observable emits for the first time.
-->

위 예제처럼 `initialValue` 옵션에 옵저버블이 첫 번째 값을 방출하기 전까지 시그널이 반환할 값을 지정할 수 있습니다.

<!--
#### `undefined` initial values
-->

<a id="undefined-initial-values"></a>

#### `undefined` 초기값

<!--
If you don't provide an `initialValue`, the resulting signal will return `undefined` until the Observable emits. This is similar to the `async` pipe's behavior of returning `null`.
-->

`initialValue`를 지정하지 않으면 생성된 시그널은 옵저버블이 값을 방출할 때까지 `undefined`를 반환합니다.
이는 `null`을 반환하는 `async` 파이프의 동작과 비슷합니다.

<!--
#### The `requireSync` option
-->

<a id="the-requiresync-option"></a>

#### `requireSync` 옵션

<!--
Some Observables are guaranteed to emit synchronously, such as `BehaviorSubject`. In those cases, you can specify the `requireSync: true` option.

When `requireSync` is `true`, `toSignal` enforces that the Observable emits synchronously on subscription. This guarantees that the signal always has a value, and no `undefined` type or initial value is required.
-->

`BehaviorSubject`처럼 동기적으로 값을 방출하는 것이 보장되는 옵저버블도 있습니다.
이 경우에는 `requireSync: true` 옵션을 지정할 수 있습니다.

`requireSync`가 `true`이면 `toSignal`은 옵저버블이 구독 시점에 동기적으로 값을 방출하도록 강제합니다.
따라서 시그널에 항상 값이 있다는 것이 보장되며, `undefined` 타입이나 초기값이 필요하지 않습니다.

<!--
### `manualCleanup`
-->


### `manualCleanup`

<!--
By default, `toSignal` automatically unsubscribes from the Observable when the component or service that creates it is destroyed.

To override this behavior, you can pass the `manualCleanup` option. You can use this setting for Observables that complete themselves naturally.
-->

기본적으로 `toSignal`은 자신을 생성한 컴포넌트나 서비스가 종료될 때 옵저버블 구독을 자동으로 해제합니다.

이 동작을 변경하려면 `manualCleanup` 옵션을 전달하면 됩니다.
스스로 완료되는 옵저버블에 이 설정을 사용할 수 있습니다.

<!--
#### Custom equality comparison
-->

<a id="custom-equality-comparison"></a>

#### 커스텀 동등성 비교

<!--
Some observables may emit values that are **equals** even though they differ by reference or minor detail. The `equal` option lets you define a **custom equal function** to determine when two consecutive values should be considered the same.

When two emitted values are considered equal, the resulting signal **does not update**. This prevents redundant computations, DOM updates, or effects from re-running unnecessarily.

```ts
import {Component} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {interval, map} from 'rxjs';

@Component(/* ... */)
export class EqualExample {
  temperature$ = interval(1000).pipe(
    map(() => ({temperature: Math.floor(Math.random() * 3) + 20})), // 20, 21, or 22 randomly
  );

  // Only update if the temperature changes
  temperature = toSignal(this.temperature$, {
    initialValue: {temperature: 20},
    equal: (prev, curr) => prev.temperature === curr.temperature,
  });
}
```
-->

일부 옵저버블은 참조나 세부 내용이 달라도 **동등한** 값을 방출할 수 있습니다.
`equal` 옵션을 사용하면 연속된 두 값을 동일한 것으로 간주할 기준을 **커스텀 동등성 비교 함수**로 정의할 수 있습니다.

방출된 두 값이 동등한 것으로 판단되면 생성된 시그널은 **갱신되지 않습니다**.
따라서 중복 계산, DOM 갱신, 이펙트 함수의 불필요한 재실행을 방지할 수 있습니다.

```ts
import {Component} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {interval, map} from 'rxjs';

@Component(/* ... */)
export class EqualExample {
  temperature$ = interval(1000).pipe(
    map(() => ({temperature: Math.floor(Math.random() * 3) + 20})), // 20, 21, 22 중 무작위 값
  );

  // 온도가 변경될 때만 갱신합니다.
  temperature = toSignal(this.temperature$, {
    initialValue: {temperature: 20},
    equal: (prev, curr) => prev.temperature === curr.temperature,
  });
}
```

<!--
### Error and Completion
-->

<a id="error-and-completion"></a>

<a id="에러와-완료"></a>

### 오류와 완료

<!--
If an Observable used in `toSignal` produces an error, that error is thrown when the signal is read.

If an Observable used in `toSignal` completes, the signal continues to return the most recently emitted value before completion.
-->

`toSignal`에 사용한 옵저버블에서 오류가 발생하면 시그널을 읽을 때 해당 오류가 발생합니다.

`toSignal`에 사용한 옵저버블이 완료되면 시그널은 완료 직전에 마지막으로 방출한 값을 계속 반환합니다.

<!--
## Create an RxJS Observable from a signal with `toObservable`
-->

<a id="create-an-rxjs-observable-from-a-signal-with-toobservable"></a>

<a id="toobservable로-시그널에서-rxjs-observable-생성하기"></a>

## `toObservable`로 시그널에서 RxJS 옵저버블 생성하기

<!--
Use the `toObservable` utility to create an `Observable` which tracks the value of a signal. The signal's value is monitored with an `effect` which emits the value to the Observable when it changes.

```ts
import {Component, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class SearchResults {
  query: Signal<string> = inject(QueryService).query;
  query$ = toObservable(this.query);

  results$ = this.query$.pipe(switchMap((query) => this.http.get('/search?q=' + query)));
}
```

As the `query` signal changes, the `query$` Observable emits the latest query and triggers a new HTTP request.
-->

`toObservable` 유틸리티를 사용하면 시그널의 값을 추적하는 `Observable`을 생성할 수 있습니다.
시그널의 값은 `effect`로 감시하며, 값이 변경되면 옵저버블로 방출합니다.

```ts
import {Component, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class SearchResults {
  query: Signal<string> = inject(QueryService).query;
  query$ = toObservable(this.query);

  results$ = this.query$.pipe(switchMap((query) => this.http.get('/search?q=' + query)));
}
```

`query` 시그널이 변경되면 `query$` 옵저버블은 최신 쿼리를 방출하고 새로운 HTTP 요청을 실행합니다.

<!--
### Injection context {#injection-context-to-observable}
-->

<a id="injection-context-1"></a>
<a id="injection-context-to-observable"></a>

<a id="의존성-주입-컨텍스트-의존성-주입-컨텍스트-2"></a>

### 의존성 주입 컨텍스트 {#ko-injection-context-to-observable}

<!--
`toObservable` by default needs to run in an [injection context](guide/di/dependency-injection-context), such as during construction of a component or service. If an injection context is not available, you can manually specify the `Injector` to use instead.
-->

`toObservable`은 기본적으로 컴포넌트나 서비스가 생성되는 시점과 같은 [의존성 주입 컨텍스트](guide/di/dependency-injection-context)에서 실행해야 합니다.
의존성 주입 컨텍스트를 사용할 수 없다면 사용할 `Injector`를 직접 지정할 수 있습니다.

<!--
### Timing of `toObservable`
-->

<a id="timing-of-toobservable"></a>

### `toObservable`의 실행 시점

<!--
`toObservable` uses an effect to track the value of the signal in a `ReplaySubject`. On subscription, the first value (if available) may be emitted synchronously, and all subsequent values will be asynchronous.

Unlike Observables, signals never provide a synchronous notification of changes. Even if you update a signal's value multiple times, `toObservable` will only emit the value after the signal stabilizes.

```ts
const obs$ = toObservable(mySignal);
obs$.subscribe((value) => console.log(value));

mySignal.set(1);
mySignal.set(2);
mySignal.set(3);
```

Here, only the last value (3) will be logged.
-->

`toObservable`은 이펙트 함수를 사용해서 시그널의 값을 `ReplaySubject`에 반영합니다.
구독할 때 첫 번째 값이 있다면 동기적으로 방출될 수 있지만, 그 이후의 값은 모두 비동기적으로 방출됩니다.

옵저버블과 달리 시그널은 값의 변경을 동기적으로 알리지 않습니다.
시그널의 값을 여러 번 갱신하더라도 `toObservable`은 시그널이 안정화된 후에만 값을 방출합니다.

```ts
const obs$ = toObservable(mySignal);
obs$.subscribe((value) => console.log(value));

mySignal.set(1);
mySignal.set(2);
mySignal.set(3);
```

이 예제에서는 마지막 값인 3만 로그에 출력됩니다.

<!--
## Using `rxResource` for async data
-->

<a id="using-rxresource-for-async-data"></a>

## 비동기 데이터에 `rxResource` 사용하기

<!--
Angular's [`resource` function](/guide/signals/resource) gives you a way to incorporate async data into your application's signal-based code. Building on top of this pattern, `rxResource` lets you define a resource where the source of your data is defined in terms of an RxJS `Observable`. Instead of accepting a `loader` function, `rxResource` accepts a `stream` function that returns an RxJS `Observable`.

```typescript
import {Component, inject} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class UserProfile {
  // This component relies on a service that exposes data through an RxJS Observable.
  private userData = inject(MyUserDataClient);

  protected userId = input<string>();

  private userResource = rxResource({
    params: () => ({userId: this.userId()}),

    // The `stream` property expects a factory function that returns
    // a data stream as an RxJS Observable.
    stream: ({params}) => this.userData.load(params.userId),
  });
}
```

The `stream` property accepts a factory function for an RxJS `Observable`. This factory function is passed the resource's `params` value and returns an `Observable`. The resource calls this factory function every time the `params` computation produces a new value. See [Resource loaders](/guide/signals/resource#resource-loaders) for more details on the parameters passed to the factory function.

In all other ways, `rxResource` behaves like and provides the same APIs as `resource` for specifying parameters, reading values, checking loading state, and examining errors.
-->

Angular의 [`resource` 함수](/guide/signals/resource)를 사용하면 애플리케이션의 시그널 기반 코드에 비동기 데이터를 통합할 수 있습니다.
이 패턴을 바탕으로 하는 `rxResource`는 데이터 소스를 RxJS `Observable`로 정의하는 리소스를 만들 수 있습니다.
`rxResource`는 `loader` 함수 대신 RxJS `Observable`을 반환하는 `stream` 함수를 사용합니다.

```typescript
import {Component, inject} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class UserProfile {
  // 이 컴포넌트는 RxJS Observable을 통해 데이터를 제공하는 서비스를 사용합니다.
  private userData = inject(MyUserDataClient);

  protected userId = input<string>();

  private userResource = rxResource({
    params: () => ({userId: this.userId()}),

    // `stream` 프로퍼티는 데이터 스트림을 RxJS Observable로
    // 반환하는 팩토리 함수를 받습니다.
    stream: ({params}) => this.userData.load(params.userId),
  });
}
```

`stream` 프로퍼티는 RxJS `Observable`을 생성하는 팩토리 함수를 받습니다.
이 팩토리 함수는 리소스의 `params` 값을 전달받고 `Observable`을 반환합니다.
리소스는 `params` 계산에서 새 값이 나올 때마다 이 팩토리 함수를 호출합니다.
팩토리 함수에 전달되는 인자에 대한 자세한 내용은 [리소스 로더](/guide/signals/resource#resource-loaders)를 참고하세요.

그 밖의 동작과 API는 `resource`와 같습니다.
`rxResource`는 인자 지정, 값 읽기, 로딩 상태 확인, 오류 확인을 같은 방식으로 지원합니다.

<!--
The `Observable` returned from `stream` must always emit a value or an error before it completes; see [`NG0991`](/errors/NG0991) for what happens otherwise and how to avoid it.
-->

`stream`이 반환하는 `Observable`은 완료되기 전에 반드시 값이나 오류를 전달해야 합니다. 그렇지 않으면 발생하는 문제와 해결 방법은 [`NG0991`](/errors/NG0991)을 참고하세요.
