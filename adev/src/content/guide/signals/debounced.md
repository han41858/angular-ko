<!--
# Debouncing signals with `debounced`
-->

# 시그널 빈도 조절하기: `debounced`

<!--
IMPORTANT: `debounced` is [experimental](reference/releases#experimental). It's ready for you to try, but it might change before it is stable.

Use `debounced` to delay reacting to a signal's value until it stops changing. It returns a `Resource` whose value reflects the debounced value of the source signal.

```angular-ts
import {debounced, resource, signal} from '@angular/core';

@Component({
  template: `
    <input (input)="query.set($event.target.value)" />

    @if (results.isLoading()) {
      <p>Searching…</p>
    }
    @for (item of results.value(); track item.id) {
      <li>{{ item.name }}</li>
    }
  `,
})
export class Search {
  query = signal('');

  debouncedQuery = debounced(this.query, 300);

  results = resource({
    params: () => this.debouncedQuery.value(),
    loader: ({params}) => fetchResults(params),
  });
}
```

`debounced` takes the source signal and a wait duration in milliseconds. The returned resource's `value()` always contains the last settled value, and `status()` tells you whether a new value is still pending.
-->

중요: `debounced`는 아직 [실험실](reference/releases#experimental) 단계입니다.
지금도 사용해 볼 수는 있지만, 이후에 안정 버전에서 사용방법이 변경될 수 있습니다.

시그널 값이 계속 변경되다가 멈췄을 때 반응하려면 `debounced`를 사용하면 됩니다.
이 함수를 실행하면 소스 시그널 값이 안정될 때 실행되는`Resource` 시그널을 반환합니다.

```angular-ts
import {debounced, resource, signal} from '@angular/core';

@Component({
  template: `
    <input (input)="query.set($event.target.value)" />

    @if (results.isLoading()) {
      <p>Searching…</p>
    }
    @for (item of results.value(); track item.id) {
      <li>{{ item.name }}</li>
    }
  `,
})
export class Search {
  query = signal('');

  debouncedQuery = debounced(this.query, 300);

  results = resource({
    params: () => this.debouncedQuery.value(),
    loader: ({params}) => fetchResults(params),
  });
}
```

`debounced`는 소스 시그널과 밀리초 단위 시간을 인자로 받습니다.
이 함수를 실행하고 반환한 리소스 시그널의 `value()`는 언제나 마지막으로 안정된 값을 나타내며, `status()`를 사용하면 새 값이 안정되었는지 확인할 수 있습니다.

<!--
## Status during debounce
-->

## 지연되는 동안의 상태

<!--
While the debounce timer is counting down, `status()` is `'loading'` and `value()` returns the previously resolved value. When the timer expires, the resource settles to `'resolved'`. If the source signal throws, the resource enters `'error'` immediately no timer runs.

See [Resource status](/guide/signals/resource#resource-status) for the full list of statuses and their `value()` behavior.
-->

시그널을 지연시키는 동안 `status()`가 반환하는 값은 `'loading'`이며, `value()`는 이전 값을 반환합니다.
그리고 타이머가 종료되면 리소스 시그널 상태가 `'resolved'`로 변경됩니다.
소스 시그널에서 에러가 발생하면 리소스 시그널은 타이머 만료에 관계없이 `'error'` 상태가 됩니다.

가능한 상태의 전체 목록과 `value()` 동작에 대해 더 알아보려면 [Resource status](/guide/signals/resource#resource-status) 문서를 참고하세요.

<!--
## Custom wait function
-->

## 커스텀 지연 함수

<!--
Instead of a millisecond duration, you can pass a function that returns a `Promise<void>`. The resource resolves when the promise resolves. If the source signal changes before the promise settles, Angular discards the previous promise and starts a new one.

```ts
debouncedQuery = debounced(query, (value, lastSnapshot) => {
  // Retry immediately after an error rather than making the user wait again.
  if (lastSnapshot.status === 'error') return;
  // Short queries get a longer delay—the user is likely still typing.
  const ms = value.length < 3 ? 500 : 200;
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
});
```

See the `DebounceTimer` type in the API reference for details.
-->

밀리초 단위로 타이머를 설정하는 대신, `Promise<void>`를 반환하는 함수를 사용할 수도 있습니다.
그러면 이 Promise가 종료될 때 리소스 시그널도 처리됩니다.
이 경우는 Promise가 안정화되기 전에 소스 시그널 값이 변경되면, Angular는 이전 Promise 동작을 폐기하고 새로운 Promise를 실행합니다.

```ts
debouncedQuery = debounced(query, (value, lastSnapshot) => {
  // 에러가 발생하면 사용자가 더 기다리지 않도록 즉시 재시도합니다.
  if (lastSnapshot.status === 'error') return;
  // 짧은 쿼리는 사용자가 계속 입력하고 있을 수 있기 때문에 지연 시간을 길게 갖습니다.
  const ms = value.length < 3 ? 500 : 200;
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
});
```

자세한 내용은 API 문서의 `DebounceTimer` 타입을 참고하세요.

<!--
## Equality
-->

## 동일값 확인

<!--
By default, `debounced` uses `Object.is` to compare values.

Provide a custom equality function with the `equal` option when the default identity check is too strict:

```ts
debouncedFilter = debounced(filter, 200, {
  equal: (a, b) => a.category === b.category && a.minPrice === b.minPrice,
});
```
-->

기본적으로 `debounced`는 `Object.is`를 사용해서 값을 비교합니다.

커스텀 동일성 판단 함수를 사용하려면 다음과 같이 `equal` 옵션을 지정하면 됩니다:

```ts
debouncedFilter = debounced(filter, 200, {
  equal: (a, b) => a.category === b.category && a.minPrice === b.minPrice,
});
```

<!--
## Injection context
-->

### 의존성 주입 컨텍스트

<!--
`debounced` must be called inside an [injection context](guide/di/dependency-injection-context). Angular automatically destroys the debounced resource and cancels any pending timer when the injector is destroyed.

To use `debounced` outside of an injection context, pass an explicit `Injector` via the options:

```ts
@Service()
export class SearchService {
  private injector = inject(Injector);

  createDebouncedQuery(query: Signal<string>): Resource<string> {
    return debounced(query, 300, {injector: this.injector});
  }
}
```
-->

`debounced`는 반드시 [의존성 주입 컨텍스트](guide/di/dependency-injection-context) 안에서 실행되어야 합니다.
Angular는 인젝터가 종료되면 지연된 시그널을 자동으로 종료하며, 타이머도 만료시킵니다.

인젝션 주입 컨텍스트 밖에서 `debounced`를 실행하려면, 옵션으로 `Injector`를 명시적으로 전달해야 합니다:

```ts
@Service()
export class SearchService {
  private injector = inject(Injector);

  createDebouncedQuery(query: Signal<string>): Resource<string> {
    return debounced(query, 300, {injector: this.injector});
  }
}
```
