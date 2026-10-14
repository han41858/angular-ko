<!--
# Async reactivity with resources
-->

# `Resource` 를 활용한 비동기 반응성

<!--
All signal APIs are synchronous— `signal`, `computed`, `input`, etc. However, applications often need to deal with data that is available asynchronously. A `Resource` gives you a way to incorporate async data into your application's signal-based code and still allow you to access its data synchronously.

You can use a `Resource` to perform any kind of async operation, but the most common use-case for `Resource` is fetching data from a server. The following example creates a resource to fetch some user data.

The easiest way to create a `Resource` is the `resource` function.

```typescript
import {computed, resource, Signal} from '@angular/core';

const userId: Signal<string> = getUserId();

const userResource = resource({
  // Define a reactive computation.
  // The params value recomputes whenever any read signals change.
  params: () => ({id: userId()}),

  // Define an async loader that retrieves data.
  // The resource calls this function every time the `params` value changes.
  loader: ({params}) => fetchUser(params),
});

// Create a computed signal based on the result of the resource's loader function.
const firstName = computed(() => {
  if (userResource.hasValue()) {
    // `hasValue` serves 2 purposes:
    // - It acts as type guard to strip `undefined` from the type
    // - It protects against reading a throwing `value` when the resource is in error state
    return userResource.value().firstName;
  }

  // fallback in case the resource value is `undefined` or if the resource is in error state
  return undefined;
});
```

The `resource` function accepts a `ResourceOptions` object with two main properties: `params` and `loader`.

The `params` property defines a reactive computation that produces a parameter value. Whenever signals read in this computation change, the resource produces a new parameter value, similar to `computed`.

The `loader` property defines a `ResourceLoader`— an async function that retrieves some state. The resource calls the loader every time the `params` computation produces a new value, passing that value to the loader. See [Resource loaders](#resource-loaders) below for more details.

`Resource` has a `value` signal that contains the results of the loader.
-->

`signal`, `computed`, `input` 등의 시그널 API는 대부분 동기 방식으로 동작합니다.
그런데 애플리케이션은 데이터를 비동기로 다뤄야 하는 경우가 종종 있습니다.
이때 `Resource`를 활용하면 애플리케이션이 시그널 기반으로 동작하면서 비동기 데이터를 처리할 수 있습니다.

`Resource`를 활용하면 모든 종류의 비동기 작업을 다룰 수 있지만, 가장 많이 사용하는 경우는 역시 서버에서 데이터를 받아오는 것입니다.
아래 코드는 사용자 데이터를 받아오는 예제 코드입니다.

`Resource`는 `resource` 함수로 생성하는 것이 가장 간단합니다.

```typescript
import {computed, resource, Signal} from '@angular/core';

const userId: Signal<string> = getUserId();

const userResource = resource({
  // 반응형 연산 함수를 정의합니다.
  // 이 계산에서 읽은 시그널의 값이 변경될 때마다 params 값을 다시 계산합니다.
  params: () => ({id: userId()}),

  // 데이터를 받아오는 비동기 로더 함수를 정의합니다.
  // Resource는  `params` 값이 변경될 때마다 이 함수를 실행합니다.
  loader: ({params}) => fetchUser(params),
});

// 리소스의 로더 함수의 실행 결과로 연산 시그널을 생성합니다.
const firstName = computed(() => {
  if (userResource.hasValue()) {
    // `hasValue`는 두 가지 용도로 사용합니다:
    // - `undefined` 타입을 걸러내는 타입 가드 역할을 합니다.
    // - 자원이 에러 상태일 때 값을 읽는 것을 방지합니다.
    return userResource.value().firstName;
  }

  // 자원이 `undefined`이거나 에러 상태일 때는 아래줄을 실행합니다.
  return undefined;
});
```

`resource` 함수는 `ResourceOptions` 객체를 인자로 받는데, 이 객체에는 `params`와 `loader` 프로퍼티가 있습니다.

`params` 프로퍼티에는 인자값을 생성할 반응형 연산 함수를 지정합니다.
이 계산 함수에서 읽는 시그널이 변경될 때마다 Resource는 새로운 값을 생성합니다.
연산 시그널과 비슷합니다.

`loader` 프로퍼티에는 어떤 값을 받아오는 비동기 함수인 `ResourceLoader`를 지정합니다.
리소스는 `params` 연산 함수가 새 값을 계산할 때마다 로더 함수를 실행하면서 그 값을 인자로 전달합니다.
자세한 내용은 [Resource 로더](#리소스-로더) 문서를 참고하세요.

`Resource` 객체에는 로더의 결과를 담는 `value` 시그널도 있습니다.

<!--
## Resource loaders
-->

<a id="resource-loaders"></a>

## 리소스 로더

<!--
When creating a resource, you specify a `ResourceLoader`. This loader is an async function that accepts a single parameter— a `ResourceLoaderParams` object— and returns a value.

The `ResourceLoaderParams` object contains three properties: `params`, `previous`, and `abortSignal`.

| Property      | Description                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `params`      | The value of the resource's `params` computation.                                                                                                |
| `previous`    | An object with a `status` property, containing the previous `ResourceStatus`.                                                                    |
| `abortSignal` | An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). See [Aborting requests](#aborting-requests) below for details. |

If the `params` computation returns `undefined`, the loader function does not run and the resource status becomes `'idle'`.
-->

리소스를 생성할 때 `ResourceLoader`를 지정합니다.
이 로더는 `ResourceLoaderParams` 객체를 인자로 받는 비동기 함수이며, 값을 하나 반환합니다.

`ResourceLoaderParams` 객체에는 `params`, `previous`, `abortSignal` 프로퍼티가 있습니다.

| 프로퍼티      | 설명                                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`      | 리소스의 `params` 연산 함수가 반환한 값                                                                                                                                 |
| `previous`    | `status` 프로퍼티와 이전 `ResourceStatus` 값이 담겨 전달되는 객체입니다.                                                                                    |
| `abortSignal` | [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)에 대해 자세하게 알아보려면 [요청 취소하기](#요청-취소하기) 섹션을 참고하세요. |

`params` 연산 함수가 `undefined`를 반환하면, 로더 함수가 실행되지 않으며 리소스의 상태는 `'idle'`로 유지됩니다.

<!--
### Streaming resources

Some asynchronous data sources produce multiple values over time instead of returning a single result. Examples include WebSockets, Server-Sent Events (SSE), and Firestore `onSnapshot` listeners.

Use `stream` for these continuously updating data sources. Unlike `loader`, which resolves once for each request, `stream` returns a signal whose value can continue to update as new data becomes available.

Use `loader` for one-time asynchronous operations, such as fetching data from an HTTP endpoint.

In this example, `userUpdates` simulates an external source such as a WebSocket or SSE connection.

```typescript
const userUpdates = signal({value: 'Alice'});

const userResource = resource({
  stream: () => userUpdates,
});

// Simulate a new value arriving from the external data source:
userUpdates.set({value: 'Bob'});
```
-->

<a id="streaming-resources"></a>

### 스트리밍 리소스

일부 비동기 데이터 소스는 결과 하나를 반환하는 대신 시간에 따라 여러 값을 생성합니다. WebSocket, Server-Sent Events(SSE), Firestore의 `onSnapshot` 리스너가 여기에 해당합니다.

계속 갱신되는 데이터 소스에는 `stream`을 사용하세요. 요청마다 한 번 결과를 반환하는 `loader`와 달리, `stream`은 새 데이터가 도착할 때마다 값을 갱신할 수 있는 시그널을 반환합니다.

HTTP 엔드포인트에서 데이터를 가져오는 것처럼 한 번만 실행하는 비동기 작업에는 `loader`를 사용하세요.

다음 예제의 `userUpdates`는 WebSocket이나 SSE 연결 같은 외부 데이터 소스를 흉내 냅니다:

```typescript
const userUpdates = signal({value: 'Alice'});

const userResource = resource({
  stream: () => userUpdates,
});

// 외부 데이터 소스에서 새 값이 도착하는 상황을 흉내 냅니다:
userUpdates.set({value: 'Bob'});
```

<!--
### Aborting requests
-->

<a id="aborting-requests"></a>

### 요청 취소하기

<!--
A resource aborts an outstanding loading operation if the `params` computation changes while the resource is loading.

You can use the `abortSignal` in `ResourceLoaderParams` to respond to aborted requests. For example, the native `fetch` function accepts an `AbortSignal`:

```typescript
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params, abortSignal}): Promise<User> => {
    // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
    // indicates that the request has been aborted.
    return fetch(`users/${params.id}`, {signal: abortSignal}).then((res) => res.json());
  },
});
```

See [`AbortSignal` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) for more details on request cancellation with `AbortSignal`.
-->

리소스가 로드되는 동안 `params` 연산 함수가 변경되면 리소스는 완료되지 않은 로딩을 취소합니다.

그리고 `ResourceLoaderParams`의 `abortSignal`을 지정하면 중단된 요청에 응답할 수 있습니다.
네이티브 `fetch` 함수를 `AbortSignal`로 적용해 봅시다:

```typescript
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params, abortSignal}): Promise<User> => {
    // fetch는 `AbortSignal`을 통해 중단 요청이 들어올 때 미처리된 모든 `HTTP 요청을 취소합니다.
    return fetch(`users/${params.id}`, {signal: abortSignal}).then((res) => res.json());
  },
});
```

`AbortSignal`을 사용해서 요청을 취소하는 방법을 자세하게 알아보려면 [MDN의 `AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 문서를 참고하세요.

<!--
### Reloading
-->

<a id="reloading"></a>

### 재시도

<!--
You can programmatically trigger a resource's `loader` by calling the `reload` method.

```typescript
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
});

// ...

userResource.reload();
```
-->

리소스 객체의 `reload` 메서드를 실행하면 `loader` 함수를 다시 실행할 수 있습니다.

```typescript
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
});

// ...

userResource.reload();
```

<!--
## Resource status
-->

<a id="resource-status"></a>

## 리소스 상태

<!--
The resource object has several signal properties for reading the status of the asynchronous loader.

| Property    | Description                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `value`     | The most recent value of the resource, or `undefined` if no value has been received.                            |
| `hasValue`  | Whether the resource has a value.                                                                               |
| `error`     | The most recent error encountered while running the resource's loader, or `undefined` if no error has occurred. |
| `isLoading` | Whether the resource loader is currently running.                                                               |
| `status`    | The resource's specific `ResourceStatus`, as described below.                                                   |

The `status` signal provides a specific `ResourceStatus` that describes the state of the resource using a string constant.

| Status        | `value()`         | Description                                                                  |
| ------------- | :---------------- | ---------------------------------------------------------------------------- |
| `'idle'`      | `undefined`       | The resource has no valid request and the loader has not run.                |
| `'error'`     | Throws an error   | The loader has encountered an error.                                         |
| `'loading'`   | `undefined`       | The loader is running as a result of the `params` value changing.            |
| `'reloading'` | Previous value    | The loader is running as a result of calling the resource's `reload` method. |
| `'resolved'`  | Resolved value    | The loader has completed.                                                    |
| `'local'`     | Locally set value | The resource's value has been set locally via `.set()` or `.update()`        |

You can use this status information to conditionally display user interface elements, such loading indicators and error messages.
-->

리소스 객체는 비동기 로더를 실행하면서 여러 상태로 변화합니다.

| 프로퍼티    | 설명                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| `value`     | 리소스 객체의 최종 값, 값을 받지 못했으면 `undefined`                                |
| `hasValue`  | 리소스가 값을 갖고 있는지 여부                                                       |
| `error`     | 리소스 로더를 실행하다가 발생한 가장 최근 에러, 에러가 발생하지 않았다면 `undefined` |
| `isLoading` | 리소스 로더가 실행 중인지 여부                                                       |
| `status`    | 리소스의 세부 `ResourceStatus`, 아래에서 설명                                        |

`status` 시그널에는 시그널의 상태를 문자열로 더 자세하게 표현하는 `ResourceStatus` 값이 존재합니다.

| 상태          | `value()`      | 설명                                                     |
| ------------- | :------------- | -------------------------------------------------------- |
| `'idle'`      | `undefined`    | 리소스에 유효한 요청이 없으며, 로더가 실행되지 않았음    |
| `'error'`     | 에러 발생      | 로더 실행 중 에러가 발생했음                             |
| `'loading'`   | `undefined`    | `params` 값이 변경되어 로더가 실행 중                    |
| `'reloading'` | 이전 값        | 리소스의 `reload` 메서드가 실행되어 로더가 실행 중       |
| `'resolved'`  | 계산된 값      | 로더 실행 종료                                           |
| `'local'`     | 직접 설정된 값 | 리소스의 `.set()`, `.update()` 메서드로 값이 설정된 상태 |

이 상태값들은 사용자에게 표시하는 용도로 활용하거나, 로딩 인디케이터, 에러 메시지를 활용하는 용도로 활용할 수 있습니다.

<!--
## Caching `resource` data with SSR

When an application renders on the server, a resource loader runs once to produce the initial HTML. During hydration, the browser normally runs the same loader again.

To reuse the server result, provide an `id` for the resource. Angular stores the resolved value in `TransferState` on the server and uses it on the client to initialize the resource in a `'resolved'` state.

```ts
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
  id: 'user-unique-id',
});
```

The `id` value must be unique within your application and identical on the server and the client so that Angular can match the cached entry to the resource that requested it.

IMPORTANT: Because the cached value is serialized into the page's HTML, avoid setting `id` on resources that load data specific to the user who triggered the server-side render, especially if the rendered HTML can be cached or shared between users.

## Chaining resources

Sometimes one resource depends on the result of another. You can express this dependency using the `chain` function available in the `params` context object.

```typescript
import {resource} from '@angular/core';

const userResource = resource({
  params: () => ({id: getUserId()}),
  loader: ({params}) => fetchUser(params),
});

const companyResource = resource({
  params: ({chain}) => chain(userResource)?.companyId,
  loader: ({params: companyId}) => fetchCompany(companyId),
});
```

Here `companyResource` depends on the user's `companyId`, which is only known once `userResource` has loaded. `chain(userResource)` reads the value of `userResource` and automatically propagates its status to `companyResource`:

- If `userResource` is **idle**, `companyResource` also becomes `idle`.
- If `userResource` is **loading** or **reloading**, `companyResource` enters the `loading` state and its loader does not run. Note that during `reloading`, `chain` does not return the previously resolved value.
- If `userResource` is in an **error** state, `companyResource` also enters the `error` state.
- If `userResource` is **resolved** or **local**, `chain` returns its current value, which `companyResource` then uses as its params.

When `chain` propagates a status from `userResource` (`idle`, `loading`, `reloading`, or `error`), the params function does not continue. When `userResource` is `resolved` or `local`, `chain` returns its value, which can itself be `undefined`. The example handles this with `chain(userResource)?.companyId`, so an `undefined` value results in `undefined` params and `companyResource` becomes `idle`.

NOTE: Pass the chained value directly as the params value rather than wrapping it in an object. A params value like `{companyId: undefined}` is still a defined value, so the loader would run with an `undefined` `companyId` instead of the resource becoming `idle`.

### Chaining vs. reading resource values directly

You might be tempted to read a resource's value directly inside `params`:

```typescript {avoid, header: 'reads value() directly without status propagation'}
const companyResource = resource({
  params: () => {
    const user = userResource.value(); // may be undefined
    return user ? {companyId: user.companyId} : undefined;
  },
  loader: ({params}) => fetchCompany(params.companyId),
});
```

While this works, returning `undefined` from `params` makes the resource go `idle` rather than reflecting the actual state of the upstream resource. Using `chain` is preferred because it correctly mirrors `loading` and `error` states.

Reach for `chain` only when the downstream resource performs its own async work that depends on the upstream value. If you only need to derive a value synchronously from a resource, use `computed` instead.
-->

<a id="caching-resource-data-with-ssr"></a>

## SSR에서 `resource` 데이터 캐싱하기

애플리케이션을 서버에서 렌더링하면 리소스 로더가 초기 HTML을 만들기 위해 한 번 실행됩니다. 하이드레이션 시에는 일반적으로 브라우저가 같은 로더를 다시 실행합니다.

서버의 결과를 재사용하려면 리소스에 `id`를 지정하세요. Angular는 서버에서 확정된 값을 `TransferState`에 저장하고, 클라이언트에서 이 값으로 리소스를 `'resolved'` 상태로 초기화합니다:

```ts
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
  id: 'user-unique-id',
});
```

`id`는 애플리케이션 안에서 고유해야 하고 서버와 클라이언트에서 같아야 합니다. 그래야 Angular가 캐시 항목을 해당 리소스와 연결할 수 있습니다.

중요: 캐시된 값은 페이지 HTML에 직렬화됩니다. 서버 사이드 렌더링을 요청한 사용자에게만 해당하는 데이터를 불러오는 리소스에는 `id`를 설정하지 마세요. 특히 렌더링된 HTML을 캐시하거나 여러 사용자가 공유할 수 있을 때 주의하세요.

<a id="chaining-resources"></a>

## 리소스 연결하기

리소스가 다른 리소스의 결과에 의존하는 경우, `params` 컨텍스트 객체의 `chain` 함수로 의존 관계를 표현할 수 있습니다:

```typescript
import {resource} from '@angular/core';

const userResource = resource({
  params: () => ({id: getUserId()}),
  loader: ({params}) => fetchUser(params),
});

const companyResource = resource({
  params: ({chain}) => chain(userResource)?.companyId,
  loader: ({params: companyId}) => fetchCompany(companyId),
});
```

여기서 `companyResource`는 `userResource` 로드가 끝난 뒤에야 알 수 있는 사용자의 `companyId`에 의존합니다. `chain(userResource)`는 `userResource`의 값을 읽고 상태를 `companyResource`로 자동 전파합니다:

- `userResource`가 **idle**이면 `companyResource`도 `idle`이 됩니다.
- `userResource`가 **loading** 또는 **reloading**이면 `companyResource`는 `loading` 상태가 되고 로더를 실행하지 않습니다. `reloading` 동안에는 `chain`이 이전에 확정된 값을 반환하지 않습니다.
- `userResource`가 **error** 상태이면 `companyResource`도 `error` 상태가 됩니다.
- `userResource`가 **resolved** 또는 **local**이면 `chain`은 현재 값을 반환하고, `companyResource`는 이 값을 매개변수로 사용합니다.

`chain`이 `userResource`의 `idle`, `loading`, `reloading`, `error` 상태를 전파하면 `params` 함수의 실행은 더 이상 진행되지 않습니다. `userResource`가 `resolved`나 `local`이면 `chain`은 값을 반환하며, 값 자체가 `undefined`일 수도 있습니다. 예제에서는 `chain(userResource)?.companyId`로 처리하므로 값이 `undefined`이면 매개변수도 `undefined`가 되고 `companyResource`는 `idle` 상태가 됩니다.

참고: 연결된 값을 객체로 감싸지 말고 매개변수 값으로 직접 전달하세요. `{companyId: undefined}`도 정의된 값이므로 리소스가 `idle`이 되는 대신 `companyId`가 `undefined`인 상태로 로더를 실행합니다.

<a id="chaining-vs-reading-resource-values-directly"></a>

### 연결하기와 리소스 값을 직접 읽기의 차이

`params` 안에서 리소스 값을 직접 읽고 싶을 수도 있습니다:

```typescript {avoid, header: 'reads value() directly without status propagation'}
const companyResource = resource({
  params: () => {
    const user = userResource.value(); // undefined일 수 있습니다.
    return user ? {companyId: user.companyId} : undefined;
  },
  loader: ({params}) => fetchCompany(params.companyId),
});
```

이 방식도 동작하지만 `params`가 `undefined`를 반환하면 선행 리소스의 실제 상태를 반영하는 대신 리소스가 `idle`이 됩니다. `loading`과 `error` 상태를 정확히 반영하는 `chain`을 사용하는 것이 좋습니다.

후행 리소스가 선행 리소스의 값에 의존하는 비동기 작업을 직접 수행할 때만 `chain`을 사용하세요. 리소스에서 값을 동기적으로 파생하기만 하면 되는 경우에는 `computed`를 사용하세요.

<!--
## Reactive data fetching with `httpResource`
-->

<a id="reactive-data-fetching-with-httpresource"></a>

## 반응형으로 데이터 불러오기: `httpResource`

<!--
[`httpResource`](/guide/http/http-resource) is a wrapper around `HttpClient` that gives you the request status and response as signals. It makes HTTP requests through the Angular HTTP stack, including interceptors.
-->

[`httpResource`](/guide/http/http-resource)는 요청 결과를 시그널로 보내는 `HttpClient` 래퍼(wrapper)입니다.
이 래퍼는 인터셉터를 포함하여 Angular HTTP 스택을 그대로 활용합니다.

<!--
## Resource composition with snapshots

A `ResourceSnapshot` is a structured representation of a resource's current state. Every resource has a `snapshot` property that provides a signal of its current state.

```ts
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
});

const userSnapshot = userResource.snapshot;
```

Each snapshot contains a `status` and either a `value` or an `error`.
-->

<a id="resource-composition-with-snapshots"></a>

## resource 상태 확인하기

`ResourceSnapshot`을 확인하면 `resource` 시그널의 현재 상태를 참조할 수 있습니다.
`resource` 시그널은 모두 현재 상태를 확인할 수 있는 `snapshot` 프로퍼티를 제공합니다.

```ts
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({params}) => fetchUser(params),
});

const userSnapshot = userResource.snapshot;
```

개별 스냅샷에는 `status` 프로퍼티가 존재하고, `value`나 `error` 프로퍼티 중 하나도 존재합니다.

<!--
### Composing resources with snapshots
-->

<a id="composing-resources-with-snapshots"></a>

### 스냅샷으로 resource 조합하기

<!--
You can create new resources from snapshots using `resourceFromSnapshots`. This enables composition with signal APIs like `computed` and `linkedSignal` to transform resource behavior.

```ts
import {linkedSignal, resourceFromSnapshots, Resource, ResourceSnapshot} from '@angular/core';

function withPreviousValue<T>(input: Resource<T>): Resource<T> {
  const derived = linkedSignal<ResourceSnapshot<T>, ResourceSnapshot<T>>({
    source: input.snapshot,
    computation: (snap, previous) => {
      if (snap.status === 'loading' && previous && previous.value.status !== 'error') {
        // When the input resource enters loading state, we keep the value
        // from its previous state, if any.
        return {status: 'loading' as const, value: previous.value.value};
      }

      // Otherwise we simply forward the state of the input resource.
      return snap;
    },
  });

  return resourceFromSnapshots(derived);
}

@Component({/*... */})
export class AwesomeProfile {
  userId = input.required<number>();
  user = withPreviousValue(httpResource(() => `/user/${this.userId()}`));
  // When userId changes, user.value() keeps the old user data until the new one loads
}
```
-->

`resourceFromSnapshots`를 사용하면 스냅샷으로 새로운 `resource` 시그널을 만들 수 있습니다.
`computed`나 `linkedSignal`도 사용할 수 있습니다.

```ts
import {linkedSignal, resourceFromSnapshots, Resource, ResourceSnapshot} from '@angular/core';

function withPreviousValue<T>(input: Resource<T>): Resource<T> {
  const derived = linkedSignal<ResourceSnapshot<T>, ResourceSnapshot<T>>({
    source: input.snapshot,
    computation: (snap, previous) => {
      if (snap.status === 'loading' && previous && previous.value.status !== 'error') {
        // 입력 시그널이 로딩 상태에 들어가면, 일단 이전 값을 유지합니다.
        return {status: 'loading' as const, value: previous.value.value};
      }

      // 아니면 입력 리소스 시그널의 상태를 반환합니다.
      return snap;
    },
  });

  return resourceFromSnapshots(derived);
}

@Component({/*... */})
export class AwesomeProfile {
  userId = input.required<number>();
  user = withPreviousValue(httpResource(() => `/user/${this.userId()}`));
  // userId 값이 변경되면 새 값이 로딩될 때까지 user.value()가 이전 값을 유지합니다.
}
```
