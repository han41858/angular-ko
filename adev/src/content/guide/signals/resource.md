<!--
# Async reactivity with resources
-->
# `Resource` 를 활용한 비동기 반응성

<!--
IMPORTANT: `resource` is [experimental](reference/releases#experimental). It's ready for you to try, but it might change before it is stable.

Most signal APIs are synchronous— `signal`, `computed`, `input`, etc. However, applications often need to deal with data that is available asynchronously. A `Resource` gives you a way to incorporate async data into your application's signal-based code.

You can use a `Resource` to perform any kind of async operation, but the most common use-case for `Resource` is fetching data from a server. The following example creates a resource to fetch some user data.

The easiest way to create a `Resource` is the `resource` function.

```typescript
import {resource, Signal} from '@angular/core';

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
const firstName = computed(() => userResource.value().firstName);
```

The `resource` function accepts a `ResourceOptions` object with two main properties: `params` and `loader`.

The `params` property defines a reactive computation that produces a parameter value. Whenever signals read in this computation change, the resource produces a new parameter value, similar to `computed`.

The `loader` property defines a `ResourceLoader`— an async function that retrieves some state. The resource calls the loader every time the `params` computation produces a new value, passing that value to the loader. See [Resource loaders](#resource-loaders) below for more details.

`Resource` has a `value` signal that contains the results of the loader.
-->
주의: `resource` 는 아직 [실험 단계](reference/releases#experimental) 입니다.
지금 사용해 볼 수는 있지만 이후에 안정 버전이 나오면서 변경될 수 있습니다.

`signal`, `computed`, `input` 등의 시그널 API는 대부분 동기 방식으로 동작합니다.
그런데 애플리케이션은 데이터를 비동기로 다뤄야 하는 경우가 종종 있습니다.
이 때 `Resource`를 활용하면 애플리케이션이 시그널 기반으로 동작하면서 비동기 데이터를 처리할 수 있습니다.

`Resource`를 활용하면 모든 종류의 비동기 작업을 다룰 수 있지만, 가장 많이 사용하는 경우는 역시 서버에서 데이터를 받아오는 것입니다.
아래 코드는 사용자 데이터를 받아오는 예제 코드입니다.

`Resource`는 `resource` 함수로 생성하는 것이 가장 간단합니다.

```typescript
import {resource, Signal} from '@angular/core';

const userId: Signal<string> = getUserId();

const userResource = resource({
  // 반응셩 연산 함수를 정의합니다.
  // params 값은 시그널을 읽을 때마다 다시 계산됩니다.
  params: () => ({id: userId()}),

  // 데이터를 받아오는 비동기 로더 함수를 정의합니다.
  // Resource는  `params` 값이 변경될 때마다 이 함수를 실행합니다.
  loader: ({params}) => fetchUser(params),
});

// 리소스의 로더 함수의 실행 결과로 연산 시그널을 생성합니다.
const firstName = computed(() => userResource.value().firstName);
```

`resource` 함수는 `ResourceOptions` 객체를 인자로 받는데, 이 객체에는 `params`와 `loader` 프로퍼티가 있습니다.

`params` 프로퍼티에는 인자값을 생성할 반응형 연산 함수를 지정합니다.
이 계산 함수에서 읽는 시그널이 변경될 때마다 Resource는 새로운 값을 생성합니다.
연산 시그널과 비슷합니다.

`loader` 프로퍼티에는 어떤 값을 받아오는 비동기 함수인 `ResourceLoader`를 지정합니다.
리소스는 `params` 연산 함수가 새 값을 계산할 때마다 로더 함수를 실행하면서 그 값을 인자로 전달합니다.
자세한 내용은 [Resource 로더](#resource-loaders) 문서를 참고하세요.

`Resource` 객체에는 로더의 결과를 담는 `value` 시그널도 있습니다.

<!--
## Resource loaders
-->
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

| 프로퍼니          | 설명                                                                                                                                    |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `params`      | 리소스의 `params` 연산 함수                                                                                                                   |
| `previous`    | `status` 프로퍼티와 이전 `ResourceStatus` 값이 담겨 전달되는 객체입니다.                                                                                  |
| `abortSignal` | [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)에 대해 자세하게 알아보려면 [요청 취소하기](#aborting-requests) 섹션을 참고하세요. |

`params` 연산 함수가 `undefined`를 반환하면, 로더 함수가 실행되지 않으며 리소스의 상태는 `'idle'`로 유지됩니다.


<!--
### Aborting requests
-->
### 요청 취소하기

<!--
A resource aborts an outstanding loading operation if the `params` computation changes while the resource is loading.

You can use the `abortSignal` in `ResourceLoaderParams` to respond to aborted requests. For example, the native `fetch` function accepts an `AbortSignal`:

```typescript
const userId: Signal<string> = getUserId();

const userResource = resource({
  params: () => ({id: userId()}),
  loader: ({request, abortSignal}): Promise<User> => {
    // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
    // indicates that the request has been aborted.
    return fetch(`users/${request.id}`, {signal: abortSignal});
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
  loader: ({request, abortSignal}): Promise<User> => {
    // fetch는 `AbortSignal`을 통해 중단 요청이 들어올 때 미처리된 모든 `HTTP 요청을 취소합니다.
    return fetch(`users/${request.id}`, {signal: abortSignal});
  },
});
```

`AbortSignal`을 사용해서 요청을 취소하는 방법을 자세하게 알아보려면 [MDN의 `AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 문서를 참고하세요.


<!--
### Reloading
-->
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
| `'error'`     | `undefined`       | The loader has encountered an error.                                         |
| `'loading'`   | `undefined`       | The loader is running as a result of the `request` value changing.           |
| `'reloading'` | Previous value    | The loader is running as a result calling of the resource's `reload` method. |
| `'resolved'`  | Resolved value    | The loader has completed.                                                    |
| `'local'`     | Locally set value | The resource's value has been set locally via `.set()` or `.update()`        |

You can use this status information to conditionally display user interface elements, such loading indicators and error messages.
-->
리소스 객체는 비동기 로더를 실행하면서 여러 상태로 변화합니다.

| 프로퍼티        | 설명                                                    |
|-------------|-------------------------------------------------------|
| `value`     | 리소스 객체의 최종 값, 값을 받지 못했으면 `undefined`                  |
| `hasValue`  | 리소스가 값을 갖고 있는지 여부                                     |
| `error`     | 리소스 로더를 실행하다가 발생한 가장 최근 에러, 에러가 발생하지 않았다면 `undefined` |
| `isLoading` | 리소스 로더가 실행중인지 여부                                      |
| `status`    | 리소스의 세부 `ResourceStatus`, 아래에서 설명                     |

`status` 시그널에는 시그널의 상태를 문자열로 더 자세하게 표현하는 `ResourceStatus` 값이 존재합니다.

| 상태            | `value()`   | 설명                                        |
|---------------|:------------|-------------------------------------------|
| `'idle'`      | `undefined` | 리소스에 유효한 요청이 없으며, 로더가 실행되지 않았음            |
| `'error'`     | `undefined` | 로더 실행 중 에러가 발생했음                          |
| `'loading'`   | `undefined` | `request` 값이 변경되어 로더가 실행중                 |
| `'reloading'` | 이전 값        | 리소스의 `reload` 메서드가 실행되어 로더가 실행중           |
| `'resolved'`  | 계산된 값       | 로더 실행 종료                                  |
| `'local'`     | 직접 설정된 값    | 리소스의 `.set()`, `.update()` 메서드로 값이 설정되 상태 |

이 상태값들은 사용자에게 표시하는 용도로 활용하거나, 로딩 인디케이터, 에러 메시지를 활용하는 용도로 활용할 수 있습니다.
