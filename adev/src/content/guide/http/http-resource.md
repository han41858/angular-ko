<!--
# Reactive data fetching with `httpResource`
-->

<a id="reactive-data-fetching-with-httpresource"></a>

# 반응형으로 데이터 불러오기: `httpResource`

<!--
`httpResource` is a reactive wrapper around `HttpClient` that gives you the request status and response as signals. You can thus use these signals with `computed`, `effect`, `linkedSignal`, or any other reactive API. Because it's built on top of `HttpClient`, `httpResource` supports all the same features, such as interceptors.

For more about Angular's `resource` pattern, see [Async reactivity with `resource`](/guide/signals/resource).
-->

`httpResource`는 요청 상태와 응답을 시그널로 제공하는 `HttpClient`의 반응형 래퍼(wrapper)입니다.
따라서 이 시그널을 `computed`, `effect`, `linkedSignal` 등의 반응형 API와 함께 사용할 수 있습니다.
`HttpClient`를 기반으로 하므로 인터셉터를 비롯한 동일한 기능을 모두 지원합니다.

Angular의 `resource` 패턴을 자세히 알아보려면 [`resource`를 활용한 비동기 반응성](/guide/signals/resource)을 참고하세요.

<!--
## `Using httpResource`
-->

<a id="using-httpresource"></a>

## `httpResource` 사용하기

<!--
TIP: `httpResource` uses the globally available `HttpClient`. Use `provideHttpClient(...)` only when you need to configure HTTP features, such as interceptors or XSRF options. See [Setting up HttpClient](/guide/http/setup) for details.

You can define an HTTP resource by returning a url:

```ts
userId = input.required<string>();

user = httpResource(() => `/api/user/${userId()}`); // A reactive function as argument
```

`httpResource` is reactive, meaning that whenever one of the signals it depends on changes (like `userId`), the resource will emit a new http request.
If a request is already pending, the resource cancels the outstanding request before issuing a new one.

HELPFUL: `httpResource` differs from the `HttpClient` as it initiates the request _eagerly_. In contrast, the `HttpClient` only initiates requests upon subscription to the returned `Observable`.

For more advanced requests, you can define a request object similar to the request taken by `HttpClient`.
Each property of the request object that should be reactive should be composed by a signal.

```ts
user = httpResource(() => ({
  url: `/api/user/${userId()}`,
  method: 'GET',
  headers: {
    'X-Special': 'true',
  },
  params: {
    'fast': 'yes',
  },
  reportProgress: true,
  transferCache: true,
  keepalive: true,
  mode: 'cors',
  redirect: 'error',
  priority: 'high',
  cache: 'force-cache',
  credentials: 'include',
  referrer: 'no-referrer',
  integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GhEXAMPLEKEY=',
  referrerPolicy: 'no-referrer',
}));
```

TIP: Avoid using `httpResource` for _mutations_ like `POST` or `PUT`. Instead, prefer directly using the underlying `HttpClient` APIs.

The signals of the `httpResource` can be used in the template to control which elements should be displayed.

```angular-html
@if (user.hasValue()) {
  <user-details [user]="user.value()" />
} @else if (user.error()) {
  <div>Could not load user information</div>
} @else if (user.isLoading()) {
  <div>Loading user info...</div>
}
```

HELPFUL: Reading the `value` signal on a `resource` that is in error state throws at runtime. It is recommended to guard `value` reads with `hasValue()`.
-->

팁: `httpResource`는 전역으로 제공되는 `HttpClient`를 사용합니다.
인터셉터나 XSRF 옵션 같은 HTTP 기능을 설정할 때만 `provideHttpClient(...)`를 사용하세요.
자세한 내용은 [HttpClient 설정하기](/guide/http/setup)를 참고하세요.

URL을 반환하는 함수로 HTTP 리소스를 정의할 수 있습니다:

```ts
userId = input.required<string>();

user = httpResource(() => `/api/user/${userId()}`); // 반응형 함수를 인자로 전달합니다.
```

`httpResource`는 반응형으로 동작하므로 `userId`처럼 의존하는 시그널이 변경될 때마다 새 HTTP 요청을 보냅니다.
이미 대기 중인 요청이 있으면 기존 요청을 취소한 뒤 새 요청을 보냅니다.

참고: `httpResource`는 요청을 _즉시_ 시작한다는 점에서 `HttpClient`와 다릅니다.
`HttpClient`는 반환한 `Observable`을 구독해야 요청을 시작합니다.

더 복잡한 요청이 필요하면 `HttpClient`에 전달하는 요청과 비슷한 요청 객체를 정의할 수 있습니다.
요청 객체에서 반응형으로 동작해야 하는 각 프로퍼티는 시그널을 사용해서 구성해야 합니다.

```ts
user = httpResource(() => ({
  url: `/api/user/${userId()}`,
  method: 'GET',
  headers: {
    'X-Special': 'true',
  },
  params: {
    'fast': 'yes',
  },
  reportProgress: true,
  transferCache: true,
  keepalive: true,
  mode: 'cors',
  redirect: 'error',
  priority: 'high',
  cache: 'force-cache',
  credentials: 'include',
  referrer: 'no-referrer',
  integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GhEXAMPLEKEY=',
  referrerPolicy: 'no-referrer',
}));
```

팁: `POST`, `PUT` 같은 _변경_ 작업에는 `httpResource`를 사용하지 않는 것이 좋습니다.
대신 기반 API인 `HttpClient`를 직접 사용하세요.

템플릿에서 `httpResource`의 시그널을 사용하면 어떤 엘리먼트를 표시할지 제어할 수 있습니다.

```angular-html
@if (user.hasValue()) {
  <user-details [user]="user.value()" />
} @else if (user.error()) {
  <div>Could not load user information</div>
} @else if (user.isLoading()) {
  <div>Loading user info...</div>
}
```

참고: 에러 상태인 `resource`의 `value` 시그널을 읽으면 런타임 에러가 발생합니다.
`hasValue()`로 확인한 뒤 `value`를 읽는 것이 좋습니다.

<!--
### Response types
-->

<a id="response-types"></a>

### 응답 타입

<!--
By default, `httpResource` returns and parses the response as JSON. However, you can specify an alternate return type with additional functions on `httpResource`:

```ts
httpResource.text(() => ({ … })); // returns a string in value()

httpResource.blob(() => ({ … })); // returns a Blob object in value()

httpResource.arrayBuffer(() => ({ … })); // returns an ArrayBuffer in value()
```
-->

`httpResource`는 기본적으로 응답을 JSON으로 파싱해서 반환합니다.
다만 `httpResource`의 추가 함수를 사용하면 다른 반환 형식을 지정할 수 있습니다:

```ts
httpResource.text(() => ({ … })); // value()가 문자열을 반환합니다.

httpResource.blob(() => ({ … })); // value()가 Blob 객체를 반환합니다.

httpResource.arrayBuffer(() => ({ … })); // value()가 ArrayBuffer를 반환합니다.
```

<!--
### Tracking download progress

Set `reportProgress: true` in the request object to track the download progress of the response. The latest `HttpProgressEvent` is available through the `progress` signal of the resource:

```ts
file = httpResource.blob(() => ({
  url: `/api/files/${fileId()}`,
  reportProgress: true,
}));

downloaded = computed(() => this.file.progress()?.loaded ?? 0);
```

NOTE: Unlike `HttpClient`, where `reportProgress` is deprecated in favor of `reportUploadProgress` and `reportDownloadProgress`, `httpResource` keeps the single `reportProgress` option. It only enables download progress events.
-->

<a id="tracking-download-progress"></a>

### 다운로드 진행 상황 추적하기

요청 객체에 `reportProgress: true`를 설정하면 응답의 다운로드 진행 상황을 추적할 수 있습니다. 최신 `HttpProgressEvent`는 리소스의 `progress` 시그널로 확인합니다:

```ts
file = httpResource.blob(() => ({
  url: `/api/files/${fileId()}`,
  reportProgress: true,
}));

downloaded = computed(() => this.file.progress()?.loaded ?? 0);
```

참고: `HttpClient`는 `reportProgress` 대신 `reportUploadProgress`와 `reportDownloadProgress`를 사용하도록 변경되었지만, `httpResource`는 `reportProgress` 옵션을 그대로 사용합니다. 이 옵션은 다운로드 진행 상황 이벤트만 활성화합니다.

<!--
## Response parsing and validation
-->

<a id="response-parsing-and-validation"></a>

## 응답 파싱과 유효성 검사

<!--
When fetching data, you may want to validate responses against a predefined schema, often using popular open-source libraries like [Zod](https://zod.dev) or [Valibot](https://valibot.dev). You can integrate validation libraries like this with `httpResource` by specifying a `parse` option. The return type of the `parse` function determines the type of the resource's `value`.

The following example uses Zod to parse and validate the response from the [StarWars API](https://swapi.info/). The resource is then typed the same as the output type of Zod’s parsing.

```ts
const starWarsPersonSchema = z.object({
  name: z.string(),
  height: z.number({coerce: true}),
  edited: z.string().datetime(),
  films: z.array(z.string()),
});

export class CharacterViewer {
  id = signal(1);

  swPersonResource = httpResource(() => `https://swapi.info/api/people/${this.id()}`, {
    parse: starWarsPersonSchema.parse,
  });
}
```
-->

데이터를 가져올 때 미리 정의한 스키마에 맞는 응답인지 검사하고 싶을 수 있습니다.
이런 경우 [Zod](https://zod.dev)나 [Valibot](https://valibot.dev) 같은 널리 쓰이는 오픈소스 라이브러리를 사용하기도 합니다.
`parse` 옵션을 지정하면 이런 검증 라이브러리를 `httpResource`와 연동할 수 있습니다.
`parse` 함수의 반환 타입이 리소스의 `value` 타입을 결정합니다.

다음 예제는 Zod로 [StarWars API](https://swapi.info/)의 응답을 파싱하고 검증합니다.
리소스에는 Zod의 파싱 결과와 같은 타입이 적용됩니다.

```ts
const starWarsPersonSchema = z.object({
  name: z.string(),
  height: z.number({coerce: true}),
  edited: z.string().datetime(),
  films: z.array(z.string()),
});

export class CharacterViewer {
  id = signal(1);

  swPersonResource = httpResource(() => `https://swapi.info/api/people/${this.id()}`, {
    parse: starWarsPersonSchema.parse,
  });
}
```

<!--
## Testing an httpResource
-->

<a id="testing-an-httpresource"></a>

## httpResource 테스트하기

<!--
Because `httpResource` is a wrapper around `HttpClient`, you can test `httpResource` with the exact same APIs as `HttpClient`. See [HttpClient Testing](/guide/http/testing) for details.

The following example shows a unit test for code using `httpResource`.

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClientTesting()],
});

const id = signal(0);
const mockBackend = TestBed.inject(HttpTestingController);
const response = httpResource(() => `/data/${id()}`, {injector: TestBed.inject(Injector)});
TestBed.tick(); // Triggers the effect
const firstRequest = mockBackend.expectOne('/data/0');
firstRequest.flush(0);

// Ensures the values are propagated to the httpResource
await TestBed.inject(ApplicationRef).whenStable();

expect(response.value()).toEqual(0);
```
-->

`httpResource`는 `HttpClient`의 래퍼이므로 `HttpClient`와 정확히 같은 API로 테스트할 수 있습니다.
자세한 내용은 [HttpClient 테스트하기](/guide/http/testing)를 참고하세요.

다음 예제는 `httpResource`를 사용하는 코드의 단위 테스트입니다.

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClientTesting()],
});

const id = signal(0);
const mockBackend = TestBed.inject(HttpTestingController);
const response = httpResource(() => `/data/${id()}`, {injector: TestBed.inject(Injector)});
TestBed.tick(); // 이펙트를 실행합니다.
const firstRequest = mockBackend.expectOne('/data/0');
firstRequest.flush(0);

// 값이 httpResource로 전달되었는지 확인합니다.
await TestBed.inject(ApplicationRef).whenStable();

expect(response.value()).toEqual(0);
```
