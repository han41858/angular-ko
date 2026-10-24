<!--
# Making HTTP requests
-->

<a id="making-http-requests"></a>

# HTTP 요청 보내기

<!--
`HttpClient` has methods corresponding to the different HTTP verbs used to make requests, both to load data and to apply mutations on the server. Each method returns an [RxJS `Observable`](https://rxjs.dev/guide/observable) which, when subscribed, sends the request and then emits the results when the server responds.

NOTE: `Observable`s created by `HttpClient` may be subscribed any number of times and will make a new backend request for each subscription.

Through an options object passed to the request method, various properties of the request and the returned response type can be adjusted.
-->

`HttpClient`는 데이터를 불러오거나 서버 상태를 변경하는 데 사용하는 각 HTTP 메서드에 대응하는 메서드를 제공합니다.
각 메서드는 [RxJS `Observable`](https://rxjs.dev/guide/observable)을 반환합니다.
이 옵저버블을 구독하면 요청을 보내고, 서버가 응답하면 결과를 전달합니다.

참고: `HttpClient`가 생성한 `Observable`은 여러 번 구독할 수 있으며, 구독할 때마다 백엔드로 새 요청을 보냅니다.

요청 메서드에 전달하는 옵션 객체로 요청의 여러 프로퍼티와 반환할 응답 타입을 조정할 수 있습니다.

<!--
## Fetching JSON data
-->

<a id="fetching-json-data"></a>

## JSON 데이터 가져오기

<!--
Fetching data from a backend often requires making a GET request using the [`HttpClient.get()`](api/common/http/HttpClient#get) method. This method takes two arguments: the string endpoint URL from which to fetch, and an _optional options_ object to configure the request.

For example, to fetch configuration data from a hypothetical API using the `HttpClient.get()` method:

```ts
http.get<Config>('/api/config').subscribe((config) => {
  // process the configuration.
});
```

Note the generic type argument which specifies that the data returned by the server will be of type `Config`. This argument is optional, and if you omit it, the returned data will have type `Object`.

TIP: When dealing with data of uncertain structure and potential `undefined` or `null` values, consider using the `unknown` type instead of `Object` as the response type.

CRITICAL: The generic type of request methods is a type **assertion** about the data returned by the server. `HttpClient` does not verify that the actual return data matches this type.
-->

백엔드에서 데이터를 가져올 때는 [`HttpClient.get()`](api/common/http/HttpClient#get) 메서드로 GET 요청을 보내는 경우가 많습니다.
이 메서드는 데이터를 가져올 엔드포인트 URL 문자열과 요청을 설정하는 _선택적 옵션_ 객체를 인자로 받습니다.

예를 들어 `HttpClient.get()`으로 가상의 API에서 설정 데이터를 가져오려면 다음과 같이 작성합니다:

```ts
http.get<Config>('/api/config').subscribe((config) => {
  // 설정을 처리합니다.
});
```

서버가 반환할 데이터의 타입을 `Config`로 지정하는 제네릭 타입 인자를 확인해 보세요.
이 인자는 선택 사항이며, 생략하면 반환 데이터의 타입은 `Object`가 됩니다.

팁: 데이터 구조가 확실하지 않고 값이 `undefined` 또는 `null`일 가능성이 있다면, 응답 타입으로 `Object` 대신 `unknown`을 사용하는 것도 고려해 보세요.

중요: 요청 메서드의 제네릭 타입은 서버가 반환하는 데이터에 대한 타입 **단언**입니다.
`HttpClient`는 실제 반환 데이터가 지정한 타입과 일치하는지 검증하지 않습니다.

<!--
## Fetching other types of data
-->

<a id="fetching-other-types-of-data"></a>

## 다른 형식의 데이터 가져오기

<!--
By default, `HttpClient` assumes that servers will return JSON data. When interacting with a non-JSON API, you can tell `HttpClient` what response type to expect when making the request. This is done with the `responseType` option.

| **`responseType` value** | **Returned response type**                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `'json'` (default)       | JSON data of the given generic type                                                                                                       |
| `'text'`                 | string data                                                                                                                               |
| `'arraybuffer'`          | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the raw response bytes |
| `'blob'`                 | [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) instance                                                                        |

For example, you can ask `HttpClient` to download the raw bytes of a `.jpeg` image into an `ArrayBuffer`:

```ts
http.get('/images/dog.jpg', {responseType: 'arraybuffer'}).subscribe((buffer) => {
  console.log('The image is ' + buffer.byteLength + ' bytes large');
});
```

<docs-callout important title="Literal value for `responseType`">
Because the value of `responseType` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `responseType: 'text' as const`.
</docs-callout>
-->

`HttpClient`는 기본적으로 서버가 JSON 데이터를 반환한다고 가정합니다.
JSON이 아닌 API와 통신할 때는 요청을 보내면서 `responseType` 옵션으로 예상 응답 형식을 지정할 수 있습니다.

| **`responseType` 값** | **반환하는 응답 타입**                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `'json'`(기본값)      | 지정한 제네릭 타입의 JSON 데이터                                                                                                  |
| `'text'`              | 문자열 데이터                                                                                                                     |
| `'arraybuffer'`       | 응답의 원시 바이트가 담긴 [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) |
| `'blob'`              | [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) 인스턴스                                                                |

예를 들어 `HttpClient`로 `.jpeg` 이미지의 원시 바이트를 `ArrayBuffer`에 내려받을 수 있습니다:

```ts
http.get('/images/dog.jpg', {responseType: 'arraybuffer'}).subscribe((buffer) => {
  console.log('The image is ' + buffer.byteLength + ' bytes large');
});
```

<docs-callout important title="`responseType`에는 리터럴 값을 사용하세요">
`responseType` 값은 `HttpClient`의 반환 타입에 영향을 미치므로, `string` 타입이 아니라 리터럴 타입이어야 합니다.

요청 메서드에 객체 리터럴로 옵션을 전달하면 자동으로 처리됩니다.
하지만 요청 옵션을 별도 변수나 헬퍼 메서드로 분리한다면 `responseType: 'text' as const`처럼 리터럴 타입을 명시해야 할 수 있습니다.
</docs-callout>

<!--
## Mutating server state
-->

<a id="mutating-server-state"></a>

## 서버 상태 변경하기

<!--
Server APIs that perform mutations often require making POST requests with a request body specifying the new state or the change to be made.

The [`HttpClient.post()`](api/common/http/HttpClient#post) method behaves similarly to `get()`, and accepts an additional `body` argument before its options:

```ts
http.post<Config>('/api/config', newConfig).subscribe((config) => {
  console.log('Updated config:', config);
});
```

Many different types of values can be provided as the request's `body`, and `HttpClient` will serialize them accordingly:

| **`body` type**                                                                                                               | **Serialized as**                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| string                                                                                                                        | Plain text                                           |
| number, boolean, array, or plain object                                                                                       | JSON                                                 |
| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)                       | raw data from the buffer                             |
| [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)                                                                     | raw data with the `Blob`'s content type              |
| [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData)                                                             | `multipart/form-data` encoded data                   |
| [`HttpParams`](api/common/http/HttpParams) or [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) | `application/x-www-form-urlencoded` formatted string |

IMPORTANT: Remember to `.subscribe()` to mutation request `Observable`s in order to actually fire the request.
-->

서버 상태를 변경하는 API는 새로운 상태나 적용할 변경 사항을 요청 본문에 담아 POST 요청으로 보내야 하는 경우가 많습니다.

[`HttpClient.post()`](api/common/http/HttpClient#post) 메서드는 `get()`과 비슷하게 동작하며, 옵션 앞에 추가로 `body` 인자를 받습니다:

```ts
http.post<Config>('/api/config', newConfig).subscribe((config) => {
  console.log('Updated config:', config);
});
```

요청의 `body`에는 여러 타입의 값을 전달할 수 있으며, `HttpClient`가 타입에 맞춰 직렬화합니다:

| **`body` 타입**                                                                                                                 | **직렬화 형식**                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 문자열                                                                                                                          | 일반 텍스트                                       |
| 숫자, 불리언, 배열, 일반 객체                                                                                                   | JSON                                              |
| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)                         | 버퍼의 원시 데이터                                |
| [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)                                                                       | `Blob`의 콘텐츠 타입을 사용하는 원시 데이터       |
| [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData)                                                               | `multipart/form-data`로 인코딩한 데이터           |
| [`HttpParams`](api/common/http/HttpParams) 또는 [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) | `application/x-www-form-urlencoded` 형식의 문자열 |

중요: 변경 요청을 실제로 보내려면 요청 `Observable`에서 `.subscribe()`를 실행해야 한다는 점을 기억하세요.

<!--
## Setting URL parameters
-->

<a id="setting-url-parameters"></a>

## URL 파라미터 설정하기

<!--
Specify request parameters that should be included in the request URL using the `params` option.

Passing an object literal is the simplest way of configuring URL parameters:

```ts
http
  .get('/api/config', {
    params: {filter: 'all'},
  })
  .subscribe((config) => {
    // ...
  });
```

Alternatively, pass an instance of `HttpParams` if you need more control over the construction or serialization of the parameters.

IMPORTANT: Instances of `HttpParams` are _immutable_ and cannot be directly changed. Instead, mutation methods such as `append()` return a new instance of `HttpParams` with the mutation applied.

```ts
const baseParams = new HttpParams().set('filter', 'all');

http
  .get('/api/config', {
    params: baseParams.set('details', 'enabled'),
  })
  .subscribe((config) => {
    // ...
  });
```

You can instantiate `HttpParams` with a custom `HttpParameterCodec` that determines how `HttpClient` will encode the parameters into the URL.
-->

요청 URL에 포함할 파라미터는 `params` 옵션으로 지정합니다.

객체 리터럴을 전달하는 것이 가장 간단한 방법입니다:

```ts
http
  .get('/api/config', {
    params: {filter: 'all'},
  })
  .subscribe((config) => {
    // ...
  });
```

파라미터를 구성하거나 직렬화하는 방식을 더 세밀하게 제어해야 한다면 `HttpParams` 인스턴스를 전달할 수도 있습니다.

중요: `HttpParams` 인스턴스는 _불변_ 이므로 직접 변경할 수 없습니다.
대신 `append()` 같은 변경 메서드가 변경 사항을 적용한 새 `HttpParams` 인스턴스를 반환합니다.

```ts
const baseParams = new HttpParams().set('filter', 'all');

http
  .get('/api/config', {
    params: baseParams.set('details', 'enabled'),
  })
  .subscribe((config) => {
    // ...
  });
```

커스텀 `HttpParameterCodec`을 지정해서 `HttpParams` 인스턴스를 생성하면 `HttpClient`가 URL 파라미터를 인코딩하는 방식을 정할 수 있습니다.

<!--
### Custom parameter encoding
-->

<a id="custom-parameter-encoding"></a>

### 파라미터 인코딩 커스터마이징하기

<!--
By default, `HttpParams` uses the built-in [`HttpUrlEncodingCodec`](api/common/http/HttpUrlEncodingCodec) to encode and decode parameter keys and values.

You can provide your own implementation of [`HttpParameterCodec`](api/common/http/HttpParameterCodec) to customize how encoding and decoding are applied.

```ts
import {HttpClient, HttpParams, HttpParameterCodec} from '@angular/common/http';
import {inject} from '@angular/core';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

export class ApiService {
  private http = inject(HttpClient);

  search() {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
    })
      .set('email', 'dev+alerts@example.com')
      .set('q', 'a & b? c/d = e');

    return this.http.get('/api/items', {params});
  }
}
```
-->

`HttpParams`는 기본적으로 내장 [`HttpUrlEncodingCodec`](api/common/http/HttpUrlEncodingCodec)으로 파라미터의 키와 값을 인코딩하고 디코딩합니다.

[`HttpParameterCodec`](api/common/http/HttpParameterCodec)을 직접 구현해서 인코딩과 디코딩 방식을 커스터마이징할 수 있습니다.

```ts
import {HttpClient, HttpParams, HttpParameterCodec} from '@angular/common/http';
import {inject} from '@angular/core';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

export class ApiService {
  private http = inject(HttpClient);

  search() {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
    })
      .set('email', 'dev+alerts@example.com')
      .set('q', 'a & b? c/d = e');

    return this.http.get('/api/items', {params});
  }
}
```

<!--
## Setting request headers
-->

<a id="setting-request-headers"></a>

## 요청 헤더 설정하기

<!--
Specify request headers that should be included in the request using the `headers` option.

Passing an object literal is the simplest way of configuring request headers:

```ts
http
  .get('/api/config', {
    headers: {
      'X-Debug-Level': 'verbose',
    },
  })
  .subscribe((config) => {
    // ...
  });
```

Alternatively, pass an instance of `HttpHeaders` if you need more control over the construction of headers.

IMPORTANT: Instances of `HttpHeaders` are _immutable_ and cannot be directly changed. Instead, mutation methods such as `append()` return a new instance of `HttpHeaders` with the mutation applied.

```ts
const baseHeaders = new HttpHeaders().set('X-Debug-Level', 'minimal');

http
  .get<Config>('/api/config', {
    headers: baseHeaders.set('X-Debug-Level', 'verbose'),
  })
  .subscribe((config) => {
    // ...
  });
```
-->

요청에 포함할 헤더는 `headers` 옵션으로 지정합니다.

객체 리터럴을 전달하는 것이 가장 간단한 방법입니다:

```ts
http
  .get('/api/config', {
    headers: {
      'X-Debug-Level': 'verbose',
    },
  })
  .subscribe((config) => {
    // ...
  });
```

헤더를 구성하는 방식을 더 세밀하게 제어해야 한다면 `HttpHeaders` 인스턴스를 전달할 수도 있습니다.

중요: `HttpHeaders` 인스턴스는 _불변_ 이므로 직접 변경할 수 없습니다.
대신 `append()` 같은 변경 메서드가 변경 사항을 적용한 새 `HttpHeaders` 인스턴스를 반환합니다.

```ts
const baseHeaders = new HttpHeaders().set('X-Debug-Level', 'minimal');

http
  .get<Config>('/api/config', {
    headers: baseHeaders.set('X-Debug-Level', 'verbose'),
  })
  .subscribe((config) => {
    // ...
  });
```

<!--
## Interacting with the server response events
-->

<a id="interacting-with-the-server-response-events"></a>

## 서버 응답 이벤트 다루기

<!--
For convenience, `HttpClient` by default returns an `Observable` of the data returned by the server (the response body). Occasionally it's desirable to examine the actual response, for example to retrieve specific response headers.

To access the entire response, set the `observe` option to `'response'`:

```ts
http.get<Config>('/api/config', {observe: 'response'}).subscribe((res) => {
  console.log('Response status:', res.status);
  console.log('Body:', res.body);
});
```

<docs-callout important title="Literal value for `observe`">
Because the value of `observe` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `observe: 'response' as const`.
</docs-callout>
-->

`HttpClient`는 편의를 위해 기본적으로 서버가 반환한 데이터, 즉 응답 본문의 `Observable`을 반환합니다.
하지만 특정 응답 헤더를 가져오는 경우처럼 실제 응답 객체를 확인해야 할 때도 있습니다.

전체 응답에 접근하려면 `observe` 옵션을 `'response'`로 설정합니다:

```ts
http.get<Config>('/api/config', {observe: 'response'}).subscribe((res) => {
  console.log('Response status:', res.status);
  console.log('Body:', res.body);
});
```

<docs-callout important title="`observe`에는 리터럴 값을 사용하세요">
`observe` 값은 `HttpClient`의 반환 타입에 영향을 미치므로, `string` 타입이 아니라 리터럴 타입이어야 합니다.

요청 메서드에 객체 리터럴로 옵션을 전달하면 자동으로 처리됩니다.
하지만 요청 옵션을 별도 변수나 헬퍼 메서드로 분리한다면 `observe: 'response' as const`처럼 리터럴 타입을 명시해야 할 수 있습니다.
</docs-callout>

<!--
## Receiving raw progress events
-->

<a id="receiving-raw-progress-events"></a>

## 진행 상황 이벤트 직접 받기

<!--
In addition to the response body or response object, `HttpClient` can also return a stream of raw _events_ corresponding to specific moments in the request lifecycle. These events include when the request is sent, when the response header is returned, and when the body is complete. These events can also include _progress events_ that report upload and download status for large request or response bodies.

Progress events are disabled by default (as they have a performance cost) but can be enabled with the `reportUploadProgress` and `reportDownloadProgress` options.

NOTE: The default fetch backend of `HttpClient` does not support _upload_ progress events and throws an error if you set `reportUploadProgress`. If your app needs upload progress events, configure `HttpClient` with `withXhr()` in `provideHttpClient(...)`.

To observe the event stream, set the `observe` option to `'events'`:

```ts
http
  .get('/api/download', {
    reportDownloadProgress: true,
    observe: 'events',
  })
  .subscribe((event) => {
    switch (event.type) {
      case HttpEventType.DownloadProgress:
        console.log('Downloaded ' + event.loaded + ' out of ' + event.total + ' bytes');
        break;
      case HttpEventType.Response:
        console.log('Finished downloading!');
        break;
    }
  });
```

<docs-callout important title="Literal value for `observe`">
Because the value of `observe` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `observe: 'events' as const`.
</docs-callout>

Each `HttpEvent` reported in the event stream has a `type` which distinguishes what the event represents:

| **`type` value**                 | **Event meaning**                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `HttpEventType.Sent`             | The request has been dispatched to the server                                      |
| `HttpEventType.UploadProgress`   | An `HttpUploadProgressEvent` reporting progress on uploading the request body      |
| `HttpEventType.ResponseHeader`   | The head of the response has been received, including status and headers           |
| `HttpEventType.DownloadProgress` | An `HttpDownloadProgressEvent` reporting progress on downloading the response body |
| `HttpEventType.Response`         | The entire response has been received, including the response body                 |
| `HttpEventType.User`             | A custom event from an HTTP interceptor.                                           |
-->

`HttpClient`는 응답 본문이나 응답 객체뿐 아니라 요청 라이프사이클의 특정 시점에 해당하는 원시 _이벤트_ 스트림도 반환할 수 있습니다.
요청을 보낸 시점, 응답 헤더를 받은 시점, 본문을 모두 받은 시점 등이 여기에 포함됩니다.
큰 요청 본문이나 응답 본문의 업로드 및 다운로드 상태를 알려주는 _진행 상황 이벤트_ 도 포함할 수 있습니다.

진행 상황 이벤트는 성능 비용이 있어 기본적으로 비활성화되어 있지만, `reportUploadProgress`와 `reportDownloadProgress` 옵션으로 활성화할 수 있습니다.

참고: `HttpClient`의 기본 fetch 백엔드는 _업로드_ 진행 상황 이벤트를 지원하지 않으며, `reportUploadProgress`를 설정하면 오류가 발생합니다.
업로드 진행 상황 이벤트가 필요하다면 `provideHttpClient(...)`에 `withXhr()`를 지정해서 `HttpClient`를 설정하세요.

이벤트 스트림을 관찰하려면 `observe` 옵션을 `'events'`로 설정합니다:

```ts
http
  .get('/api/download', {
    reportDownloadProgress: true,
    observe: 'events',
  })
  .subscribe((event) => {
    switch (event.type) {
      case HttpEventType.DownloadProgress:
        console.log('Downloaded ' + event.loaded + ' out of ' + event.total + ' bytes');
        break;
      case HttpEventType.Response:
        console.log('Finished downloading!');
        break;
    }
  });
```

<docs-callout important title="`observe`에는 리터럴 값을 사용하세요">
`observe` 값은 `HttpClient`의 반환 타입에 영향을 미치므로, `string` 타입이 아니라 리터럴 타입이어야 합니다.

요청 메서드에 객체 리터럴로 옵션을 전달하면 자동으로 처리됩니다.
하지만 요청 옵션을 별도 변수나 헬퍼 메서드로 분리한다면 `observe: 'events' as const`처럼 리터럴 타입을 명시해야 할 수 있습니다.
</docs-callout>

이벤트 스트림에서 전달하는 각 `HttpEvent`에는 이벤트의 의미를 구분하는 `type`이 있습니다:

| **`type` 값**                    | **이벤트 의미**                                                   |
| -------------------------------- | ----------------------------------------------------------------- |
| `HttpEventType.Sent`             | 서버로 요청을 보냈음                                              |
| `HttpEventType.UploadProgress`   | 요청 본문 업로드 진행 상황을 알리는 `HttpUploadProgressEvent`     |
| `HttpEventType.ResponseHeader`   | 상태와 헤더를 포함한 응답의 헤더 부분을 받았음                    |
| `HttpEventType.DownloadProgress` | 응답 본문 다운로드 진행 상황을 알리는 `HttpDownloadProgressEvent` |
| `HttpEventType.Response`         | 본문을 포함한 전체 응답을 받았음                                  |
| `HttpEventType.User`             | HTTP 인터셉터의 커스텀 이벤트                                     |

<!--
## Handling request failure
-->

<a id="handling-request-failure"></a>

## 요청 실패 처리하기

<!--
There are three ways an HTTP request can fail:

- A network or connection error can prevent the request from reaching the backend server.
- A request didn't respond in time when the timeout option was set.
- The backend can receive the request but fail to process it, and return an error response.

`HttpClient` captures all of the above kinds of errors in an `HttpErrorResponse` which it returns through the `Observable`'s error channel. Network and timeout errors have a `status` code of `0`. For timeouts, the `error` is a `DOMException` named `TimeoutError`; for network errors, it is the error thrown by `fetch` (or a [`ProgressEvent`](https://developer.mozilla.org/docs/Web/API/ProgressEvent) when using `withXhr()`). Backend errors have the failing `status` code returned by the backend, and the error response as the `error`. Inspect the response to identify the error's cause and the appropriate action to handle the error.

The [RxJS library](https://rxjs.dev/) offers several operators which can be useful for error handling.

You can use the `catchError` operator to transform an error response into a value for the UI. This value can tell the UI to display an error page or value, and capture the error's cause if necessary.

Sometimes transient errors such as network interruptions can cause a request to fail unexpectedly, and simply retrying the request will allow it to succeed. RxJS provides several _retry_ operators which automatically re-subscribe to a failed `Observable` under certain conditions. For example, the `retry()` operator will automatically attempt to re-subscribe a specified number of times.
-->

HTTP 요청은 다음 세 가지 방식으로 실패할 수 있습니다:

- 네트워크 또는 연결 오류로 요청이 백엔드 서버에 도달하지 못합니다.
- 타임아웃 옵션을 설정했는데 제한 시간 안에 응답하지 않습니다.
- 백엔드가 요청을 받았지만 처리에 실패해서 오류 응답을 반환합니다.

`HttpClient`는 이런 모든 오류를 `HttpErrorResponse`에 담아 `Observable`의 오류 채널로 전달합니다.
네트워크 및 타임아웃 오류의 `status` 코드는 `0`입니다. 타임아웃이면 `error`는 이름이 `TimeoutError`인 `DOMException`입니다. 네트워크 오류이면 `fetch`가 발생시킨 오류이며, `withXhr()`를 사용하는 경우에는 [`ProgressEvent`](https://developer.mozilla.org/docs/Web/API/ProgressEvent)입니다.
백엔드 오류는 백엔드가 반환한 실패 상태 코드를 `status`로, 오류 응답을 `error`로 제공합니다.
응답을 확인해서 오류 원인과 적절한 처리 방법을 판단하세요.

[RxJS 라이브러리](https://rxjs.dev/)에는 오류 처리에 유용한 연산자가 여러 개 있습니다.

`catchError` 연산자를 사용하면 오류 응답을 UI에서 사용할 값으로 변환할 수 있습니다.
이 값으로 UI에 오류 페이지나 값을 표시하도록 알리고, 필요하면 오류 원인도 기록할 수 있습니다.

때로는 네트워크 중단 같은 일시적 오류로 요청이 예상치 못하게 실패하며, 요청을 다시 보내기만 해도 성공할 수 있습니다.
RxJS는 특정 조건에서 실패한 `Observable`을 자동으로 다시 구독하는 여러 _재시도_ 연산자를 제공합니다.
예를 들어 `retry()` 연산자는 지정한 횟수만큼 자동으로 재구독을 시도합니다.

<!--
### Timeouts
-->

<a id="timeouts"></a>

### 타임아웃

<!--
To set a timeout for a request, you can set the `timeout` option to a number of milliseconds along with other request options. If the backend request does not complete within the specified time, the request will be aborted and an error will be emitted.

NOTE: The timeout will only apply to the backend HTTP request itself. It is not a timeout for the entire request handling chain. Therefore, this option is not affected by any delay introduced by interceptors.

```ts
http
  .get('/api/config', {
    timeout: 3000,
  })
  .subscribe({
    next: (config) => {
      console.log('Config fetched successfully:', config);
    },
    error: (err) => {
      // If the request times out, an error will have been emitted.
    },
  });
```
-->

요청에 타임아웃을 설정하려면 다른 요청 옵션과 함께 `timeout` 옵션에 밀리초 단위의 숫자를 지정합니다.
백엔드 요청이 지정한 시간 안에 완료되지 않으면 요청을 취소하고 오류를 전달합니다.

참고: 타임아웃은 백엔드 HTTP 요청 자체에만 적용되며, 전체 요청 처리 체인에 적용되는 것은 아닙니다.
따라서 인터셉터에서 발생한 지연은 이 옵션에 영향을 미치지 않습니다.

```ts
http
  .get('/api/config', {
    timeout: 3000,
  })
  .subscribe({
    next: (config) => {
      console.log('Config fetched successfully:', config);
    },
    error: (err) => {
      // 요청 시간이 초과되면 에러가 전달됩니다.
    },
  });
```

<!--
## Advanced fetch options
-->

<a id="advanced-fetch-options"></a>

## 고급 fetch 옵션

<!--
Angular's `HttpClient` supports advanced fetch API options that can improve performance and user experience. These options are available when using the fetch backend, which is the default.
-->

Angular의 `HttpClient`는 성능과 사용자 경험을 개선할 수 있는 고급 fetch API 옵션을 지원합니다.
이 옵션은 기본 백엔드인 fetch 백엔드를 사용할 때 적용할 수 있습니다.

<!--
### Fetch options
-->

<a id="fetch-options"></a>

### fetch 옵션

<!--
The following options provide fine-grained control over request behavior when using the fetch backend.
-->

다음 옵션을 사용하면 fetch 백엔드의 요청 동작을 세밀하게 제어할 수 있습니다.

<!--
#### Keep-alive connections
-->

<a id="keep-alive-connections"></a>

#### 연결 유지

<!--
The `keepalive` option allows a request to outlive the page that initiated it. This is particularly useful for analytics or logging requests that need to complete even if the user navigates away from the page.

```ts
http
  .post('/api/analytics', analyticsData, {
    keepalive: true,
  })
  .subscribe();
```
-->

`keepalive` 옵션을 사용하면 요청을 시작한 페이지가 종료된 뒤에도 요청을 유지할 수 있습니다.
사용자가 페이지를 떠나더라도 완료해야 하는 분석 정보나 로그 전송 요청에 특히 유용합니다.

```ts
http
  .post('/api/analytics', analyticsData, {
    keepalive: true,
  })
  .subscribe();
```

<!--
#### HTTP caching control
-->

<a id="http-caching-control"></a>

#### HTTP 캐싱 제어

<!--
The `cache` option controls how the request interacts with the browser's HTTP cache, which can significantly improve performance for repeated requests.

```ts
//  Use cached response regardless of freshness
http
  .get('/api/config', {
    cache: 'force-cache',
  })
  .subscribe((config) => {
    // ...
  });

// Always fetch from network, bypass cache
http
  .get('/api/live-data', {
    cache: 'no-cache',
  })
  .subscribe((data) => {
    // ...
  });

// Use cached response only, fail if not in cache
http
  .get('/api/static-data', {
    cache: 'only-if-cached',
  })
  .subscribe((data) => {
    // ...
  });
```
-->

`cache` 옵션은 요청이 브라우저의 HTTP 캐시를 사용하는 방식을 제어하며, 반복 요청의 성능을 크게 개선할 수 있습니다.

```ts
// 최신 여부와 관계없이 캐시된 응답을 사용합니다.
http
  .get('/api/config', {
    cache: 'force-cache',
  })
  .subscribe((config) => {
    // ...
  });

// 캐시를 건너뛰고 항상 네트워크에서 가져옵니다.
http
  .get('/api/live-data', {
    cache: 'no-cache',
  })
  .subscribe((data) => {
    // ...
  });

// 캐시된 응답만 사용하며, 캐시에 없으면 실패합니다.
http
  .get('/api/static-data', {
    cache: 'only-if-cached',
  })
  .subscribe((data) => {
    // ...
  });
```

<!--
#### Request priority for Core Web Vitals
-->

<a id="request-priority-for-core-web-vitals"></a>

#### Core Web Vitals를 위한 요청 우선순위

<!--
The `priority` option allows you to indicate the relative importance of a request, helping browsers optimize resource loading for better Core Web Vitals scores.

```ts
// High priority for critical resources
http
  .get('/api/user-profile', {
    priority: 'high',
  })
  .subscribe((profile) => {
    // ...
  });

// Low priority for non-critical resources
http
  .get('/api/recommendations', {
    priority: 'low',
  })
  .subscribe((recommendations) => {
    // ...
  });

// Auto priority (default) lets the browser decide
http
  .get('/api/settings', {
    priority: 'auto',
  })
  .subscribe((settings) => {
    // ...
  });
```

Available `priority` values:

- `'high'`: High priority, loaded early (e.g., critical user data, above-the-fold content)
- `'low'`: Low priority, loaded when resources are available (e.g., analytics, prefetch data)
- `'auto'`: Browser determines priority based on request context (default)

TIP: Use `priority: 'high'` for requests that affect Largest Contentful Paint (LCP) and `priority: 'low'` for requests that don't impact initial user experience.
-->

`priority` 옵션은 요청의 상대적 중요도를 나타냅니다.
브라우저가 리소스 로드를 최적화해서 Core Web Vitals 점수를 개선하는 데 도움이 됩니다.

```ts
// 중요한 리소스에는 높은 우선순위를 지정합니다.
http
  .get('/api/user-profile', {
    priority: 'high',
  })
  .subscribe((profile) => {
    // ...
  });

// 덜 중요한 리소스에는 낮은 우선순위를 지정합니다.
http
  .get('/api/recommendations', {
    priority: 'low',
  })
  .subscribe((recommendations) => {
    // ...
  });

// 자동 우선순위(기본값)에서는 브라우저가 결정합니다.
http
  .get('/api/settings', {
    priority: 'auto',
  })
  .subscribe((settings) => {
    // ...
  });
```

사용할 수 있는 `priority` 값은 다음과 같습니다:

- `'high'`: 우선순위가 높으며 먼저 로드합니다.
  예를 들어 중요한 사용자 데이터나 스크롤하지 않아도 보이는 콘텐츠에 사용합니다.
- `'low'`: 우선순위가 낮으며 리소스에 여유가 있을 때 로드합니다.
  예를 들어 분석 정보나 미리 가져올 데이터에 사용합니다.
- `'auto'`: 요청 상황에 따라 브라우저가 우선순위를 정합니다.
  기본값입니다.

팁: Largest Contentful Paint(LCP)에 영향을 미치는 요청에는 `priority: 'high'`를, 초기 사용자 경험에 영향을 주지 않는 요청에는 `priority: 'low'`를 사용하세요.

<!--
#### Request mode
-->

<a id="request-mode"></a>

#### 요청 모드

<!--
The `mode` option controls how the request handles cross-origin requests and determines the response type.

```ts
// Same-origin requests only
http
  .get('/api/local-data', {
    mode: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// CORS-enabled cross-origin requests
http
  .get('https://api.external.com/data', {
    mode: 'cors',
  })
  .subscribe((data) => {
    // ...
  });

// No-CORS mode for simple cross-origin requests
http
  .get('https://external-api.com/public-data', {
    mode: 'no-cors',
  })
  .subscribe((data) => {
    // ...
  });
```

Available `mode` values:

- `'same-origin'`: Only allow same-origin requests, fail for cross-origin requests
- `'cors'`: Allow cross-origin requests with CORS (default)
- `'no-cors'`: Allow simple cross-origin requests without CORS, response is opaque

TIP: In the browser, use `mode: 'same-origin'` for sensitive requests that should never go cross-origin.

IMPORTANT: During SSR on Node.js, `HttpClient` uses Node.js's [Undici-based Fetch implementation](https://nodejs.org/api/globals.html#fetch). [Undici does not enforce browser CORS checks](https://undici.nodejs.org/#cors), so `mode: 'same-origin'` does not restrict server-side requests. Validate user-influenced URLs against an allowlist.
-->

`mode` 옵션은 교차 출처 요청을 처리하는 방식을 제어하고 응답 타입을 결정합니다.

```ts
// 동일 출처 요청만 허용합니다.
http
  .get('/api/local-data', {
    mode: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// CORS를 사용하는 교차 출처 요청입니다.
http
  .get('https://api.external.com/data', {
    mode: 'cors',
  })
  .subscribe((data) => {
    // ...
  });

// 단순 교차 출처 요청에 No-CORS 모드를 사용합니다.
http
  .get('https://external-api.com/public-data', {
    mode: 'no-cors',
  })
  .subscribe((data) => {
    // ...
  });
```

사용할 수 있는 `mode` 값은 다음과 같습니다:

- `'same-origin'`: 동일 출처 요청만 허용하고, 교차 출처 요청은 실패 처리합니다.
- `'cors'`: CORS를 사용하는 교차 출처 요청을 허용합니다.
  기본값입니다.
- `'no-cors'`: CORS 없이 단순 교차 출처 요청을 허용하며, 응답은 불투명한(opaque) 응답이 됩니다.

팁: 브라우저에서 다른 출처로 보내면 안 되는 민감한 요청에는 `mode: 'same-origin'`을 사용하세요.

중요: Node.js의 SSR에서 `HttpClient`는 Node.js의 [Undici 기반 Fetch 구현](https://nodejs.org/api/globals.html#fetch)을 사용합니다. [Undici는 브라우저의 CORS 검사를 강제하지 않으므로](https://undici.nodejs.org/#cors) `mode: 'same-origin'`이 서버 측 요청을 제한하지 않습니다. 사용자 입력의 영향을 받는 URL은 허용 목록과 대조하여 검사하세요.

<!--
#### Redirect handling
-->

<a id="redirect-handling"></a>

#### 리다이렉트 처리

<!--
The `redirect` option specifies how to handle redirect responses from the server.

```ts
// Follow redirects automatically (default behavior)
http
  .get('/api/resource', {
    redirect: 'follow',
  })
  .subscribe((data) => {
    // ...
  });

// Prevent automatic redirects
http
  .get('/api/resource', {
    redirect: 'manual',
  })
  .subscribe((response) => {
    // Handle redirect manually
  });

// Treat redirects as errors
http
  .get('/api/resource', {
    redirect: 'error',
  })
  .subscribe({
    next: (data) => {
      // Success response
    },
    error: (err) => {
      // Redirect responses will trigger this error handler
    },
  });
```

Available `redirect` values:

- `'follow'`: Automatically follow redirects (default)
- `'error'`: Treat redirects as errors
- `'manual'`: Don't follow redirects automatically, return redirect response

TIP: Use `redirect: 'manual'` when you need to handle redirects with custom logic.
-->

`redirect` 옵션은 서버의 리다이렉트 응답을 처리하는 방식을 지정합니다.

```ts
// 리다이렉트를 자동으로 따릅니다(기본 동작).
http
  .get('/api/resource', {
    redirect: 'follow',
  })
  .subscribe((data) => {
    // ...
  });

// 자동 리다이렉트를 방지합니다.
http
  .get('/api/resource', {
    redirect: 'manual',
  })
  .subscribe((response) => {
    // 리다이렉트를 직접 처리합니다.
  });

// 리다이렉트를 에러로 처리합니다.
http
  .get('/api/resource', {
    redirect: 'error',
  })
  .subscribe({
    next: (data) => {
      // 성공 응답입니다.
    },
    error: (err) => {
      // 리다이렉트 응답은 이 에러 핸들러를 실행합니다.
    },
  });
```

사용할 수 있는 `redirect` 값은 다음과 같습니다:

- `'follow'`: 리다이렉트를 자동으로 따릅니다.
  기본값입니다.
- `'error'`: 리다이렉트를 오류로 처리합니다.
- `'manual'`: 리다이렉트를 자동으로 따르지 않고 리다이렉트 응답을 반환합니다.

팁: 리다이렉트를 직접 작성한 로직으로 처리해야 한다면 `redirect: 'manual'`을 사용하세요.

<!--
#### Credentials handling
-->

<a id="credentials-handling"></a>

#### 인증 정보 처리

<!--
The `credentials` option controls whether cookies, authorization headers, and other credentials are sent with cross-origin requests. This is particularly important for authentication scenarios.

```ts
// Include credentials for cross-origin requests
http
  .get('https://api.example.com/protected-data', {
    credentials: 'include',
  })
  .subscribe((data) => {
    // ...
  });

// Never send credentials (default for cross-origin)
http
  .get('https://api.example.com/public-data', {
    credentials: 'omit',
  })
  .subscribe((data) => {
    // ...
  });

// Send credentials only for same-origin requests
http
  .get('/api/user-data', {
    credentials: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// withCredentials overrides credentials setting
http
  .get('https://api.example.com/data', {
    credentials: 'omit', // This will be ignored
    withCredentials: true, // This forces credentials: 'include'
  })
  .subscribe((data) => {
    // Request will include credentials despite credentials: 'omit'
  });

// Legacy approach (still supported)
http
  .get('https://api.example.com/data', {
    withCredentials: true,
  })
  .subscribe((data) => {
    // Equivalent to credentials: 'include'
  });
```

IMPORTANT: The `withCredentials` option takes precedence over the `credentials` option. If both are specified, `withCredentials: true` will always result in `credentials: 'include'`, regardless of the explicit `credentials` value.

Available `credentials` values:

- `'omit'`: Never send credentials
- `'same-origin'`: Send credentials only for same-origin requests (default)
- `'include'`: Always send credentials, even for cross-origin requests

TIP: Use `credentials: 'include'` when you need to send authentication cookies or headers to a different domain that supports CORS. Avoid mixing `credentials` and `withCredentials` options to prevent confusion.
-->

`credentials` 옵션은 교차 출처 요청에 쿠키, 인증 헤더 등의 인증 정보를 포함할지 제어합니다.
인증을 사용하는 경우에 특히 중요합니다.

```ts
// 교차 출처 요청에 인증 정보를 포함합니다.
http
  .get('https://api.example.com/protected-data', {
    credentials: 'include',
  })
  .subscribe((data) => {
    // ...
  });

// 인증 정보를 보내지 않습니다(교차 출처 요청의 기본 동작).
http
  .get('https://api.example.com/public-data', {
    credentials: 'omit',
  })
  .subscribe((data) => {
    // ...
  });

// 동일 출처 요청에만 인증 정보를 보냅니다.
http
  .get('/api/user-data', {
    credentials: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// withCredentials가 credentials 설정보다 우선합니다.
http
  .get('https://api.example.com/data', {
    credentials: 'omit', // 이 값은 무시됩니다.
    withCredentials: true, // credentials: 'include'로 동작하도록 강제합니다.
  })
  .subscribe((data) => {
    // credentials: 'omit'을 지정했지만 요청에 인증 정보가 포함됩니다.
  });

// 이전 방식도 계속 지원합니다.
http
  .get('https://api.example.com/data', {
    withCredentials: true,
  })
  .subscribe((data) => {
    // credentials: 'include'와 같습니다.
  });
```

중요: `withCredentials` 옵션은 `credentials` 옵션보다 우선합니다.
둘 다 지정하면 명시한 `credentials` 값과 관계없이 `withCredentials: true`가 항상 `credentials: 'include'`로 동작합니다.

사용할 수 있는 `credentials` 값은 다음과 같습니다:

- `'omit'`: 인증 정보를 보내지 않습니다.
- `'same-origin'`: 동일 출처 요청에만 인증 정보를 보냅니다.
  기본값입니다.
- `'include'`: 교차 출처 요청을 포함해서 항상 인증 정보를 보냅니다.

팁: CORS를 지원하는 다른 도메인에 인증 쿠키나 헤더를 보내야 한다면 `credentials: 'include'`를 사용하세요.
혼동을 피하려면 `credentials`와 `withCredentials` 옵션을 함께 사용하지 않는 것이 좋습니다.

<!--
IMPORTANT: During SSR on Node.js, `credentials: 'include'` does not automatically forward cookies from the incoming browser request. The `credentials` option does not remove `Cookie` or `Authorization` headers that you add explicitly. [Undici permits some headers that browsers forbid](https://undici.nodejs.org/#forbidden-and-safelisted-header-names), so only forward credential headers to trusted origins.
-->

중요: Node.js의 SSR에서 `credentials: 'include'`는 들어온 브라우저 요청의 쿠키를 자동으로 전달하지 않습니다. `credentials` 옵션은 직접 추가한 `Cookie`나 `Authorization` 헤더도 제거하지 않습니다. [Undici는 브라우저가 금지하는 일부 헤더를 허용하므로](https://undici.nodejs.org/#forbidden-and-safelisted-header-names), 인증 정보가 담긴 헤더는 신뢰할 수 있는 출처에만 전달하세요.

<!--
#### Referrer
-->

<a id="referrer"></a>

#### 리퍼러

<!--
The `referrer` option allows you to control what referrer information is sent with the request. This is important for privacy and security considerations.

```ts
// Send a specific referrer URL
http
  .get('/api/data', {
    referrer: 'https://example.com/page',
  })
  .subscribe((data) => {
    // ...
  });

// Use the current page as referrer (default behavior)
http
  .get('/api/analytics', {
    referrer: 'about:client',
  })
  .subscribe((data) => {
    // ...
  });
```

The `referrer` option accepts:

- A valid URL string: Sets the specific referrer URL to send
- An empty string `''`: Sends no referrer information
- `'about:client'`: Uses the default referrer (current page URL)

TIP: Use `referrer: ''` for sensitive requests where you don't want to leak the referring page URL.
-->

`referrer` 옵션은 요청에 어떤 리퍼러 정보를 보낼지 제어합니다.
개인정보 보호와 보안 측면에서 중요한 설정입니다.

```ts
// 지정한 리퍼러 URL을 보냅니다.
http
  .get('/api/data', {
    referrer: 'https://example.com/page',
  })
  .subscribe((data) => {
    // ...
  });

// 현재 페이지를 리퍼러로 사용합니다(기본 동작).
http
  .get('/api/analytics', {
    referrer: 'about:client',
  })
  .subscribe((data) => {
    // ...
  });
```

`referrer` 옵션에는 다음 값을 지정할 수 있습니다:

- 유효한 URL 문자열: 전송할 리퍼러 URL을 직접 지정합니다.
- 빈 문자열 `''`: 리퍼러 정보를 보내지 않습니다.
- `'about:client'`: 기본 리퍼러인 현재 페이지 URL을 사용합니다.

팁: 요청을 보낸 페이지의 URL을 노출하고 싶지 않은 민감한 요청에는 `referrer: ''`를 사용하세요.

<!--
#### Referrer policy
-->

<a id="referrer-policy"></a>

#### 리퍼러 정책

<!--
The `referrerPolicy` option controls how much referrer information—the URL of the page making the request—is sent along with an HTTP request. This setting affects both privacy and analytics, allowing you to balance data visibility with security considerations.

```ts
// Send no referrer information regardless of the current page
http
  .get('/api/data', {
    referrerPolicy: 'no-referrer',
  })
  .subscribe();

// Send origin only (e.g. https://example.com)
http
  .get('/api/analytics', {
    referrerPolicy: 'origin',
  })
  .subscribe();
```

The `referrerPolicy` option accepts:

- `'no-referrer'` Never send the `Referer` header.
- `'no-referrer-when-downgrade'` Sends the referrer for same-origin and secure (HTTPS→HTTPS) requests, but omits it when navigating from a secure to a less secure origin (HTTPS→HTTP).
- `'origin'` Sends only the origin (scheme, host, port) of the referrer, omitting path and query information.
- `'origin-when-cross-origin'` Sends the full URL for same-origin requests, but only the origin for cross-origin requests.
- `'same-origin'` Sends the full URL for same-origin requests and no referrer for cross-origin requests.
- `'strict-origin'` Sends only the origin, and only if the protocol security level is not downgraded (e.g., HTTPS→HTTPS). Omits the referrer on downgrade.
- `'strict-origin-when-cross-origin'` Default browser behavior. Sends the full URL for same-origin requests, the origin for cross-origin requests when not downgraded, and omits the referrer on downgrade.
- `'unsafe-url'` Always sends the full URL (including path and query). This can expose sensitive data and should be used with caution.

TIP: Prefer conservative values such as `'no-referrer'`, `'origin'`, or `'strict-origin-when-cross-origin'` for privacy-sensitive requests.
-->

`referrerPolicy` 옵션은 HTTP 요청과 함께 요청을 보낸 페이지의 URL, 즉 리퍼러 정보를 어느 범위까지 전달할지 제어합니다.
이 설정은 개인정보 보호와 분석에 모두 영향을 미치므로, 데이터 확인 범위와 보안을 고려해서 조정할 수 있습니다.

```ts
// 현재 페이지와 관계없이 리퍼러 정보를 보내지 않습니다.
http
  .get('/api/data', {
    referrerPolicy: 'no-referrer',
  })
  .subscribe();

// 출처만 보냅니다(예: https://example.com).
http
  .get('/api/analytics', {
    referrerPolicy: 'origin',
  })
  .subscribe();
```

`referrerPolicy` 옵션에는 다음 값을 지정할 수 있습니다:

- `'no-referrer'`: `Referer` 헤더를 보내지 않습니다.
- `'no-referrer-when-downgrade'`: 동일 출처 요청과 보안 수준이 유지되는 요청(HTTPS→HTTPS)에는 리퍼러를 보내지만, 보안 수준이 낮아지는 출처로 이동할 때(HTTPS→HTTP)는 보내지 않습니다.
- `'origin'`: 리퍼러의 출처인 스킴, 호스트, 포트만 보내고 경로와 쿼리 정보는 제외합니다.
- `'origin-when-cross-origin'`: 동일 출처 요청에는 전체 URL을 보내고, 교차 출처 요청에는 출처만 보냅니다.
- `'same-origin'`: 동일 출처 요청에는 전체 URL을 보내고, 교차 출처 요청에는 리퍼러를 보내지 않습니다.
- `'strict-origin'`: 프로토콜의 보안 수준이 낮아지지 않을 때만(예: HTTPS→HTTPS) 출처를 보냅니다.
  보안 수준이 낮아지면 리퍼러를 보내지 않습니다.
- `'strict-origin-when-cross-origin'`: 브라우저의 기본 동작입니다.
  동일 출처 요청에는 전체 URL을 보내고, 보안 수준이 낮아지지 않는 교차 출처 요청에는 출처를 보내며, 보안 수준이 낮아지면 리퍼러를 보내지 않습니다.
- `'unsafe-url'`: 경로와 쿼리를 포함한 전체 URL을 항상 보냅니다.
  민감한 데이터가 노출될 수 있으므로 주의해서 사용해야 합니다.

팁: 개인정보 보호가 중요한 요청에는 `'no-referrer'`, `'origin'`, `'strict-origin-when-cross-origin'`처럼 보수적인 값을 사용하는 것이 좋습니다.

<!--
#### Integrity
-->

<a id="integrity"></a>

#### 무결성

<!--
The `integrity` option allows you to verify that the response hasn't been tampered with by providing a cryptographic hash of the expected content. This is particularly useful for loading scripts or other resources from CDNs.

```ts
// Verify response integrity with SHA-256 hash
http
  .get('/api/script.js', {
    integrity: 'sha256-ABC123...',
    responseType: 'text',
  })
  .subscribe((script) => {
    // Script content is verified against the hash
  });
```

IMPORTANT: The `integrity` option requires an exact match between the response content and the provided hash. If the content doesn't match, the request will fail with a network error.

CRITICAL: During SSR, the Fetch implementation reads the entire response body to verify `integrity` before returning a response, as required by the [Fetch Standard](https://fetch.spec.whatwg.org/#concept-main-fetch). Angular enforces [`maxResponseBodySize`](/guide/ssr#configuring-the-response-body-size-limit) only after Fetch returns a response, so this limit does not constrain the data buffered during integrity verification.

TIP: Use subresource integrity when loading critical resources from external sources to ensure they haven't been modified. Generate hashes using tools like `openssl`.
-->

`integrity` 옵션에 예상 콘텐츠의 암호학적 해시를 지정하면 응답이 변조되지 않았는지 검증할 수 있습니다.
CDN에서 스크립트나 다른 리소스를 불러올 때 특히 유용합니다.

```ts
// SHA-256 해시로 응답 무결성을 검증합니다.
http
  .get('/api/script.js', {
    integrity: 'sha256-ABC123...',
    responseType: 'text',
  })
  .subscribe((script) => {
    // 스크립트 콘텐츠가 해시와 일치하는지 검증합니다.
  });
```

중요: `integrity` 옵션을 사용하면 응답 콘텐츠와 지정한 해시가 정확히 일치해야 합니다.
일치하지 않으면 요청이 네트워크 오류로 실패합니다.

매우 중요: SSR에서 Fetch 구현은 [Fetch 표준](https://fetch.spec.whatwg.org/#concept-main-fetch)에 따라 응답을 반환하기 전에 전체 응답 본문을 읽어 `integrity`를 검증합니다. Angular의 [`maxResponseBodySize`](/guide/ssr#configuring-the-response-body-size-limit)는 Fetch가 응답을 반환한 뒤에만 적용되므로, 무결성 검증 중에 버퍼링하는 데이터 양을 제한하지 못합니다.

팁: 외부에서 중요한 리소스를 불러올 때는 하위 리소스 무결성 검사(subresource integrity)로 변조 여부를 확인하세요.
해시는 `openssl` 같은 도구로 생성할 수 있습니다.

<!--
## HTTP `Observable`s
-->

<a id="http-observables"></a>

## HTTP `Observable`

<!--
Each request method on `HttpClient` constructs and returns an `Observable` of the requested response type. Understanding how these `Observable`s work is important when using `HttpClient`.

`HttpClient` produces what RxJS calls "cold" `Observable`s, meaning that no actual request happens until the `Observable` is subscribed. Only then is the request actually dispatched to the server. Subscribing to the same `Observable` multiple times will trigger multiple backend requests. Each subscription is independent.

TIP: You can think of `HttpClient` `Observable`s as _blueprints_ for actual server requests.

Once subscribed, unsubscribing will abort the in-progress request. This is very useful if the `Observable` is subscribed via the `async` pipe, as it will automatically cancel the request if the user navigates away from the current page. Additionally, if you use the `Observable` with an RxJS combinator like `switchMap`, this cancellation will clean up any stale requests.

Once the response returns, `Observable`s from `HttpClient` usually complete (although interceptors can influence this).

Because of the automatic completion, there is usually no risk of memory leaks if `HttpClient` subscriptions are not cleaned up. However, as with any async operation, we strongly recommend that you clean up subscriptions when the component using them is destroyed, as the subscription callback may otherwise run and encounter errors when it attempts to interact with the destroyed component.

TIP: Using the `async` pipe or the `toSignal` operation to subscribe to `Observable`s ensures that subscriptions are disposed properly.
-->

`HttpClient`의 각 요청 메서드는 요청한 응답 타입의 `Observable`을 생성해서 반환합니다.
`HttpClient`를 사용할 때는 이 `Observable`의 동작을 이해하는 것이 중요합니다.

`HttpClient`가 생성하는 것은 RxJS에서 "콜드(cold)" `Observable`이라고 부르는 옵저버블입니다.
즉, `Observable`을 구독하기 전에는 실제 요청이 발생하지 않으며, 구독해야 서버로 요청을 보냅니다.
같은 `Observable`을 여러 번 구독하면 백엔드 요청도 여러 번 발생합니다.
각 구독은 독립적입니다.

팁: `HttpClient`의 `Observable`은 실제 서버 요청을 위한 _설계도_ 라고 생각할 수 있습니다.

구독한 뒤 구독을 해제하면 진행 중인 요청을 취소합니다.
`async` 파이프로 `Observable`을 구독하면 사용자가 현재 페이지를 떠날 때 요청을 자동으로 취소하므로 매우 유용합니다.
또한 `switchMap` 같은 RxJS 조합 연산자와 함께 사용하면 이런 취소 동작으로 더 이상 필요하지 않은 요청을 정리할 수 있습니다.

응답을 받으면 `HttpClient`의 `Observable`은 일반적으로 완료됩니다.
다만 인터셉터가 이 동작에 영향을 줄 수 있습니다.

자동으로 완료되므로 `HttpClient` 구독을 정리하지 않아도 보통 메모리 누수가 발생하지 않습니다.
하지만 다른 비동기 작업과 마찬가지로, 구독을 사용하는 컴포넌트가 종료되면 구독도 정리하는 것을 강하게 권장합니다.
그렇지 않으면 구독 콜백이 실행되면서 이미 종료된 컴포넌트와 상호작용하려다가 오류가 발생할 수 있습니다.

팁: `async` 파이프나 `toSignal`로 `Observable`을 구독하면 구독을 적절하게 정리할 수 있습니다.

<!--
## Best practices
-->

<a id="best-practices"></a>

## 권장하는 사용 방식

<!--
While `HttpClient` can be injected and used directly from components, generally we recommend you create reusable, injectable services which isolate and encapsulate data access logic. For example, this `UserService` encapsulates the logic to request data for a user by their id:

```ts
@Service()
export class UserService {
  private http = inject(HttpClient);

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }
}
```

Within a component, you can combine `@if` with the `async` pipe to render the UI for the data only after it's finished loading:

```angular-ts
import {AsyncPipe} from '@angular/common';

@Component({
  imports: [AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <p>Name: {{ user.name }}</p>
      <p>Biography: {{ user.biography }}</p>
    }
  `,
})
export class UserProfile {
  userId = input.required<string>();
  user$!: Observable<User>;

  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.user$ = this.userService.getUser(this.userId());
    });
  }
}
```
-->

`HttpClient`를 컴포넌트에 직접 주입해서 사용할 수도 있지만, 일반적으로 데이터 접근 로직을 분리하고 캡슐화하는 재사용 가능한 주입용 서비스를 만드는 것을 권장합니다.
예를 들어 다음 `UserService`는 사용자 ID로 데이터를 요청하는 로직을 캡슐화합니다:

```ts
@Service()
export class UserService {
  private http = inject(HttpClient);

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }
}
```

컴포넌트에서는 `@if`와 `async` 파이프를 함께 사용해서 데이터 로드가 완료된 후에만 해당 데이터를 사용하는 UI를 렌더링할 수 있습니다:

```angular-ts
import {AsyncPipe} from '@angular/common';

@Component({
  imports: [AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <p>Name: {{ user.name }}</p>
      <p>Biography: {{ user.biography }}</p>
    }
  `,
})
export class UserProfile {
  userId = input.required<string>();
  user$!: Observable<User>;

  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.user$ = this.userService.getUser(this.userId());
    });
  }
}
```
