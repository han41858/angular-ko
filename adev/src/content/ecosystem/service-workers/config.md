<!--
# Service Worker configuration file
-->

<a id="service-worker-configuration-file"></a>

# 서비스 워커 설정 파일

<!--
This topic describes the properties of the service worker configuration file.
-->

이 문서에서는 서비스 워커 설정 파일의 프로퍼티를 설명합니다.

<!--
## Modifying the configuration
-->

<a id="modifying-the-configuration"></a>

## 설정 변경하기

<!--
The `ngsw-config.json` JSON configuration file specifies which files and data URLs the Angular service worker should cache and how it should update the cached files and data.
The [Angular CLI](tools/cli) processes this configuration file during `ng build`.

All file paths must begin with `/`, which corresponds to the deployment directory — usually `dist/<project-name>` in CLI projects.

Unless otherwise commented, patterns use a **limited\*** glob format that internally will be converted into regex:

| Glob formats | Details                                                                                                |
| :----------- | :----------------------------------------------------------------------------------------------------- |
| `**`         | Matches 0 or more path segments                                                                        |
| `*`          | Matches 0 or more characters excluding `/`                                                             |
| `?`          | Matches exactly one character excluding `/`                                                            |
| `!` prefix   | Marks the pattern as being negative, meaning that only files that don't match the pattern are included |

<docs-callout important title="Special characters need to be escaped">
Pay attention that some characters with a special meaning in a regular expression are not escaped and also the pattern is not wrapped in `^`/`$` in the internal glob to regex conversion.

`$` is a special character in regex that matches the end of the string and will not be automatically escaped when converting the glob pattern to a regular expression.

If you want to literally match the `$` character, you have to escape it yourself (with `\\$`). For example, the glob pattern `/foo/bar/$value` results in an unmatchable expression, because it is impossible to have a string that has any characters after it has ended.

The pattern will not be automatically wrapped in `^` and `$` when converting it to a regular expression. Therefore, the patterns will partially match the request URLs.

If you want your patterns to match the beginning and/or end of URLs, you can add `^`/`$` yourself. For example, the glob pattern `/foo/bar/*.js` will match both `.js` and `.json` files. If you want to only match `.js` files, use `/foo/bar/*.js$`.
</docs-callout>

Example patterns:

| Patterns     | Details                               |
| :----------- | :------------------------------------ |
| `/**/*.html` | Specifies all HTML files              |
| `/*.html`    | Specifies only HTML files in the root |
| `!/**/*.map` | Exclude all sourcemaps                |
-->

`ngsw-config.json` JSON 설정 파일은 Angular 서비스 워커가 캐시에 저장할 파일과 데이터 URL, 캐시된 파일과 데이터를 갱신하는 방법을 지정합니다.
[Angular CLI](tools/cli)는 `ng build`를 실행할 때 이 설정 파일을 처리합니다.

모든 파일 경로는 `/`로 시작해야 합니다.
이는 배포 디렉터리를 가리키며, CLI 프로젝트에서는 일반적으로 `dist/<project-name>`입니다.

별도 설명이 없다면 패턴은 내부적으로 정규 표현식으로 변환되는 **제한된\*** glob 형식을 사용합니다:

| glob 형식  | 설명                                                               |
| :--------- | :----------------------------------------------------------------- |
| `**`       | 경로 세그먼트 0개 이상과 일치합니다.                               |
| `*`        | `/`를 제외한 문자 0개 이상과 일치합니다.                           |
| `?`        | `/`를 제외한 문자 정확히 1개와 일치합니다.                         |
| `!` 접두사 | 제외 패턴을 나타냅니다. 이 패턴과 일치하지 않는 파일만 포함합니다. |

<docs-callout important title="특수 문자는 이스케이프해야 합니다">
내부에서 glob 패턴을 정규 표현식으로 변환할 때 정규 표현식에서 특별한 의미를 갖는 일부 문자는 이스케이프되지 않으며, 패턴을 `^`/`$`로 감싸지도 않는다는 점에 주의하세요.

`$`는 정규 표현식에서 문자열의 끝과 일치하는 특수 문자이며, glob 패턴을 정규 표현식으로 변환할 때 자동으로 이스케이프되지 않습니다.

문자 `$` 자체와 일치시키려면 직접 `\\$`로 이스케이프해야 합니다.
예를 들어 glob 패턴 `/foo/bar/$value`는 일치할 수 없는 표현식으로 변환됩니다.
문자열이 끝난 뒤에 문자가 더 있을 수 없기 때문입니다.

정규 표현식으로 변환할 때 패턴이 자동으로 `^`와 `$`로 감싸지지 않으므로, 요청 URL의 일부와 일치하는 경우에도 패턴에 해당합니다.

패턴이 URL의 시작이나 끝과 일치하도록 하려면 직접 `^`/`$`를 추가할 수 있습니다.
예를 들어 glob 패턴 `/foo/bar/*.js`는 `.js` 파일과 `.json` 파일 모두에 해당합니다.
`.js` 파일에만 해당하도록 하려면 `/foo/bar/*.js$`를 사용하세요.
</docs-callout>

패턴 예제는 다음과 같습니다:

| 패턴         | 설명                                |
| :----------- | :---------------------------------- |
| `/**/*.html` | 모든 HTML 파일을 지정합니다.        |
| `/*.html`    | 루트에 있는 HTML 파일만 지정합니다. |
| `!/**/*.map` | 모든 소스맵을 제외합니다.           |

<!--
## Service worker configuration properties
-->

<a id="service-worker-configuration-properties"></a>

## 서비스 워커 설정 프로퍼티

<!--
The following sections describe each property of the configuration file.
-->

다음 섹션에서는 설정 파일의 각 프로퍼티를 설명합니다.

<!--
### `appData`
-->


### `appData`

<!--
This section enables you to pass any data you want that describes this particular version of the application.
The `SwUpdate` service includes that data in the update notifications.
Many applications use this section to provide additional information for the display of UI popups, notifying users of the available update.
-->

이 섹션에서는 해당 애플리케이션 버전을 설명하는 임의의 데이터를 전달할 수 있습니다.
`SwUpdate` 서비스는 업데이트 알림에 이 데이터를 포함합니다.
많은 애플리케이션이 이 섹션을 활용해서, 사용 가능한 업데이트를 사용자에게 알리는 UI 팝업에 표시할 추가 정보를 제공합니다.

<!--
### `index`
-->


### `index`

<!--
Specifies the file that serves as the index page to satisfy navigation requests.
Usually this is `/index.html`.
-->

탐색 요청에 응답할 인덱스 페이지 파일을 지정합니다.
일반적으로 `/index.html`을 사용합니다.

<!--
### `assetGroups`
-->


### `assetGroups`

<!--
_Assets_ are resources that are part of the application version that update along with the application.
They can include resources loaded from the page's origin as well as third-party resources loaded from CDNs and other external URLs.
As not all such external URLs might be known at build time, URL patterns can be matched.

HELPFUL: For the service worker to handle resources that are loaded from different origins, make sure that [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) is correctly configured on each origin's server.

This field contains an array of asset groups, each of which defines a set of asset resources and the policy by which they are cached.

```ts
{
  "assetGroups": [
    {
      …
    },
    {
      …
    }
  ]
}
```

HELPFUL: When the ServiceWorker handles a request, it checks asset groups in the order in which they appear in `ngsw-config.json`.
The first asset group that matches the requested resource handles the request.

It is recommended that you put the more specific asset groups higher in the list.
For example, an asset group that matches `/foo.js` should appear before one that matches `*.js`.

Each asset group specifies both a group of resources and a policy that governs them.
This policy determines when the resources are fetched and what happens when changes are detected.

Asset groups follow the TypeScript interface shown here:

```ts
interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    urls?: string[];
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}
```

Each `AssetGroup` is defined by the following asset group properties.
-->

_애셋_ 은 애플리케이션 버전의 일부이며 애플리케이션과 함께 업데이트되는 리소스입니다.
페이지와 같은 출처에서 로딩하는 리소스뿐 아니라 CDN이나 다른 외부 URL에서 로딩하는 서드 파티 리소스도 포함할 수 있습니다.
이런 외부 URL을 빌드 시점에 모두 알 수는 없으므로 URL 패턴을 사용할 수 있습니다.

도움말: 서비스 워커가 다른 출처에서 로딩하는 리소스를 처리하려면 각 출처의 서버에 [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS)가 올바르게 설정되어 있어야 합니다.

이 필드는 애셋 그룹 배열을 포함합니다.
각 그룹은 애셋 리소스 집합과 캐싱 정책을 정의합니다.

```ts
{
  "assetGroups": [
    {
      …
    },
    {
      …
    }
  ]
}
```

도움말: ServiceWorker는 요청을 처리할 때 `ngsw-config.json`에 나타난 순서대로 애셋 그룹을 확인합니다.
요청한 리소스와 처음 일치하는 애셋 그룹이 요청을 처리합니다.

더 구체적인 애셋 그룹을 목록 앞쪽에 배치하는 것을 권장합니다.
예를 들어 `/foo.js`와 일치하는 애셋 그룹을 `*.js`와 일치하는 그룹보다 앞에 배치해야 합니다.

각 애셋 그룹은 리소스 집합과 이를 관리하는 정책을 지정합니다.
이 정책은 리소스를 가져오는 시점과 변경 사항이 감지되었을 때의 동작을 결정합니다.

애셋 그룹은 다음 TypeScript 인터페이스를 따릅니다:

```ts
interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    urls?: string[];
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}
```

각 `AssetGroup`은 다음 프로퍼티로 정의합니다.

<!--
#### `name`
-->


#### `name`

<!--
A `name` is mandatory.
It identifies this particular group of assets between versions of the configuration.
-->

`name`은 필수입니다.
서로 다른 설정 버전 사이에서 특정 애셋 그룹을 식별하는 데 사용합니다.

<!--
#### `installMode`
-->


#### `installMode`

<!--
The `installMode` determines how these resources are initially cached.
The `installMode` can be either of two values:

| Values     | Details                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefetch` | Tells the Angular service worker to fetch every single listed resource while it's caching the current version of the application. This is bandwidth-intensive but ensures resources are available whenever they're requested, even if the browser is currently offline.                                                                                                                       |
| `lazy`     | Does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested are not cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation. |

Defaults to `prefetch`.
-->

`installMode`는 리소스를 처음 캐시에 저장하는 방법을 결정합니다.
`installMode`는 다음 두 값 중 하나를 사용할 수 있습니다:

| 값         | 설명                                                                                                                                                                                                                                                                                                        |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefetch` | 현재 애플리케이션 버전을 캐시에 저장할 때 목록에 있는 모든 리소스를 가져오도록 Angular 서비스 워커에 지시합니다. 대역폭을 많이 사용하지만, 브라우저가 오프라인이어도 요청한 리소스를 항상 사용할 수 있도록 보장합니다.                                                                                      |
| `lazy`     | 리소스를 미리 캐시에 저장하지 않습니다. Angular 서비스 워커는 요청받은 리소스만 캐시에 저장합니다. 필요한 시점에 캐싱하는 방식이므로, 요청하지 않은 리소스는 캐시에 저장하지 않습니다. 해상도가 다른 이미지 등에 유용하며, 서비스 워커가 해당 화면과 방향에 맞는 리소스만 캐시에 저장하도록 할 수 있습니다. |

기본값은 `prefetch`입니다.

<!--
#### `updateMode`
-->


#### `updateMode`

<!--
For resources already in the cache, the `updateMode` determines the caching behavior when a new version of the application is discovered.
Any resources in the group that have changed since the previous version are updated in accordance with `updateMode`.

| Values     | Details                                                                                                                                                                                                                                  |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefetch` | Tells the service worker to download and cache the changed resources immediately.                                                                                                                                                        |
| `lazy`     | Tells the service worker to not cache those resources. Instead, it treats them as unrequested and waits until they're requested again before updating them. An `updateMode` of `lazy` is only valid if the `installMode` is also `lazy`. |

Defaults to the value `installMode` is set to.
-->

`updateMode`는 이미 캐시에 있는 리소스에 대해 새 애플리케이션 버전을 발견했을 때의 캐싱 동작을 결정합니다.
그룹 안에서 이전 버전 이후 변경된 리소스는 모두 `updateMode`에 따라 갱신됩니다.

| 값         | 설명                                                                                                                                                                                                                |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prefetch` | 변경된 리소스를 즉시 다운로드해서 캐시에 저장하도록 서비스 워커에 지시합니다.                                                                                                                                       |
| `lazy`     | 변경된 리소스를 바로 캐시에 저장하지 않도록 지시합니다. 대신 아직 요청하지 않은 리소스로 취급하며, 다시 요청받을 때까지 기다렸다가 갱신합니다. `updateMode`의 `lazy` 값은 `installMode`도 `lazy`일 때만 유효합니다. |

기본값은 `installMode`에 설정된 값입니다.

<!--
#### `resources`
-->


#### `resources`

<!--
This section describes the resources to cache, broken up into the following groups:

| Resource groups | Details                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `files`         | Lists patterns that match files in the distribution directory. These can be single files or glob-like patterns that match a number of files.                                                                                                                                                                                                                                                                  |
| `urls`          | Includes both URLs and URL patterns that are matched at runtime. These resources are not fetched directly and do not have content hashes, but they are cached according to their HTTP headers. This is most useful for CDNs such as the Google Fonts service. <br /> _(Negative glob patterns are not supported and `?` will be matched literally; that is, it will not match any character other than `?`.)_ |
-->

캐시에 저장할 리소스를 다음 그룹으로 나누어 설명합니다:

| 리소스 그룹 | 설명                                                                                                                                                                                                                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `files`     | 배포 디렉터리 안의 파일과 일치하는 패턴 목록입니다. 단일 파일이거나 여러 파일과 일치하는 glob 형태의 패턴일 수 있습니다.                                                                                                                                                                                      |
| `urls`      | 런타임에 비교하는 URL과 URL 패턴을 포함합니다. 이 리소스는 직접 가져오지 않고 콘텐츠 해시도 없으며, HTTP 헤더에 따라 캐시에 저장됩니다. Google Fonts 서비스 같은 CDN에 특히 유용합니다. <br /> _(제외 glob 패턴은 지원하지 않으며, `?`는 문자 그대로 해석합니다. 즉, `?` 이외의 문자와는 일치하지 않습니다.)_ |

<!--
#### `cacheQueryOptions`
-->


#### `cacheQueryOptions`

<!--
These options are used to modify the matching behavior of requests.
They are passed to the browsers `Cache#match` function.
See [MDN](https://developer.mozilla.org/docs/Web/API/Cache/match) for details.
Currently, only the following options are supported:

| Options        | Details                                       |
| :------------- | :-------------------------------------------- |
| `ignoreSearch` | Ignore query parameters. Defaults to `false`. |
-->

요청의 일치 여부를 판단하는 방식을 변경하는 옵션입니다.
브라우저의 `Cache#match` 함수에 전달합니다.
자세한 내용은 [MDN](https://developer.mozilla.org/docs/Web/API/Cache/match)을 참고하세요.
현재는 다음 옵션만 지원합니다:

| 옵션           | 설명                                                |
| :------------- | :-------------------------------------------------- |
| `ignoreSearch` | 쿼리 파라미터를 무시합니다. 기본값은 `false`입니다. |

<!--
### `dataGroups`
-->


### `dataGroups`

<!--
Unlike asset resources, data requests are not versioned along with the application.
They're cached according to manually-configured policies that are more useful for situations such as API requests and other data dependencies.

This field contains an array of data groups, each of which defines a set of data resources and the policy by which they are cached.

```json
{
  "dataGroups": [
    {
      …
    },
    {
      …
    }
  ]
}
```

HELPFUL: When the ServiceWorker handles a request, it checks data groups in the order in which they appear in `ngsw-config.json`.
The first data group that matches the requested resource handles the request.

It is recommended that you put the more specific data groups higher in the list.
For example, a data group that matches `/api/foo.json` should appear before one that matches `/api/*.json`.

Data groups follow this TypeScript interface:

```ts
export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    refreshAhead?: string;
    strategy?: 'freshness' | 'performance';
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}
```

Each `DataGroup` is defined by the following data group properties.
-->

애셋 리소스와 달리 데이터 요청은 애플리케이션과 함께 버전을 관리하지 않습니다.
API 요청이나 다른 데이터 의존성에 적합하도록 직접 설정한 정책에 따라 캐시에 저장합니다.

이 필드는 데이터 그룹 배열을 포함합니다.
각 그룹은 데이터 리소스 집합과 캐싱 정책을 정의합니다.

```json
{
  "dataGroups": [
    {
      …
    },
    {
      …
    }
  ]
}
```

도움말: ServiceWorker는 요청을 처리할 때 `ngsw-config.json`에 나타난 순서대로 데이터 그룹을 확인합니다.
요청한 리소스와 처음 일치하는 데이터 그룹이 요청을 처리합니다.

더 구체적인 데이터 그룹을 목록 앞쪽에 배치하는 것을 권장합니다.
예를 들어 `/api/foo.json`과 일치하는 데이터 그룹을 `/api/*.json`과 일치하는 그룹보다 앞에 배치해야 합니다.

데이터 그룹은 다음 TypeScript 인터페이스를 따릅니다:

```ts
export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    refreshAhead?: string;
    strategy?: 'freshness' | 'performance';
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}
```

각 `DataGroup`은 다음 프로퍼티로 정의합니다.

<!--
#### `name` {#datagroups-name}
-->

<a id="name-1"></a>

#### `name` {#datagroups-name}

<!--
Similar to `assetGroups`, every data group has a `name` which uniquely identifies it.
-->

`assetGroups`와 마찬가지로 모든 데이터 그룹에는 고유 식별자인 `name`이 있습니다.

<!--
#### `urls`
-->


#### `urls`

<!--
A list of URL patterns.
URLs that match these patterns are cached according to this data group's policy.
Only non-mutating requests (GET and HEAD) are cached.

- Negative glob patterns are not supported
- `?` is matched literally; that is, it matches _only_ the character `?`
-->

URL 패턴 목록입니다.
이 패턴과 일치하는 URL은 해당 데이터 그룹의 정책에 따라 캐시에 저장합니다.
데이터를 변경하지 않는 요청(GET과 HEAD)만 캐시에 저장합니다.

- 제외 glob 패턴은 지원하지 않습니다.
- `?`는 문자 그대로 해석합니다.
  즉, _문자 `?`에만_ 해당합니다.

<!--
#### `version`
-->


#### `version`

<!--
Occasionally APIs change formats in a way that is not backward-compatible.
A new version of the application might not be compatible with the old API format and thus might not be compatible with existing cached resources from that API.

`version` provides a mechanism to indicate that the resources being cached have been updated in a backwards-incompatible way, and that the old cache entries —those from previous versions— should be discarded.

`version` is an integer field and defaults to `1`.
-->

API 형식이 이전 버전과 호환되지 않는 방식으로 변경되는 경우가 있습니다.
애플리케이션의 새 버전이 이전 API 형식과 호환되지 않으면, 해당 API에서 가져와 기존에 캐시에 저장한 리소스와도 호환되지 않을 수 있습니다.

`version`은 캐시에 저장할 리소스가 이전 버전과 호환되지 않는 방식으로 갱신되었으며, 이전 버전의 캐시 항목을 삭제해야 한다는 것을 표시하는 수단입니다.

`version`은 정수 필드이며 기본값은 `1`입니다.

<!--
#### `cacheConfig`
-->


#### `cacheConfig`

<!--
The following properties define the policy by which matching requests are cached.
-->

다음 프로퍼티는 일치하는 요청을 캐시에 저장하는 정책을 정의합니다.

<!--
##### `maxSize`
-->


##### `maxSize`

<!--
The maximum number of entries, or responses, in the cache.

CRITICAL: Open-ended caches can grow in unbounded ways and eventually exceed storage quotas, resulting in eviction.
-->

캐시에 저장할 수 있는 항목, 즉 응답의 최대 개수입니다.

주의: 크기 제한이 없는 캐시는 끝없이 커져서 결국 저장 용량 제한을 초과하고, 캐시에서 항목이 제거되는 결과로 이어질 수 있습니다.

<!--
##### `maxAge`
-->


##### `maxAge`

<!--
The `maxAge` parameter indicates how long responses are allowed to remain in the cache before being considered invalid and evicted. `maxAge` is a duration string, using the following unit suffixes:

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `3d12h` caches content for up to three and a half days.
-->

`maxAge`는 응답을 유효하지 않은 것으로 간주하고 제거하기 전까지 캐시에 유지할 수 있는 시간을 나타냅니다.
`maxAge`는 다음 단위 접미사를 사용하는 기간 문자열입니다:

| 접미사 | 설명   |
| :----- | :----- |
| `d`    | 일     |
| `h`    | 시간   |
| `m`    | 분     |
| `s`    | 초     |
| `u`    | 밀리초 |

예를 들어 `3d12h`는 콘텐츠를 최대 3일 12시간 동안 캐시에 저장합니다.

<!--
##### `timeout`
-->


##### `timeout`

<!--
This duration string specifies the network timeout.
The network timeout is how long the Angular service worker waits for the network to respond before using a cached response, if configured to do so.
`timeout` is a duration string, using the following unit suffixes:

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `5s30u` translates to five seconds and 30 milliseconds of network timeout.
-->

네트워크 제한 시간을 지정하는 기간 문자열입니다.
네트워크 제한 시간은 캐시된 응답을 사용하도록 설정되어 있을 때, Angular 서비스 워커가 캐시를 사용하기 전에 네트워크 응답을 기다리는 시간입니다.
`timeout`은 다음 단위 접미사를 사용하는 기간 문자열입니다:

| 접미사 | 설명   |
| :----- | :----- |
| `d`    | 일     |
| `h`    | 시간   |
| `m`    | 분     |
| `s`    | 초     |
| `u`    | 밀리초 |

예를 들어 `5s30u`는 네트워크 제한 시간을 5초 30밀리초로 지정합니다.

<!--
##### `refreshAhead`
-->


##### `refreshAhead`

<!--
This duration string specifies the time ahead of the expiration of a cached resource when the Angular service worker should proactively attempt to refresh the resource from the network.
The `refreshAhead` duration is an optional configuration that determines how much time before the expiration of a cached response the service worker should initiate a request to refresh the resource from the network.

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `1h30m` translates to one hour and 30 minutes ahead of the expiration time.
-->

캐시에 저장된 리소스가 만료되기 얼마 전에 Angular 서비스 워커가 네트워크에서 해당 리소스를 미리 갱신하려고 시도할지 지정하는 기간 문자열입니다.
`refreshAhead`는 선택적인 설정이며, 캐시된 응답이 만료되기 얼마 전에 서비스 워커가 네트워크 갱신 요청을 시작할지 결정합니다.

| 접미사 | 설명   |
| :----- | :----- |
| `d`    | 일     |
| `h`    | 시간   |
| `m`    | 분     |
| `s`    | 초     |
| `u`    | 밀리초 |

예를 들어 `1h30m`는 만료 시점보다 1시간 30분 전을 의미합니다.

<!--
##### `strategy`
-->


##### `strategy`

<!--
The Angular service worker can use either of two caching strategies for data resources.

| Caching strategies | Details                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `performance`      | The default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used, and no network request is made. This allows for some staleness, depending on the `maxAge`, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images. |
| `freshness`        | Optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to `timeout`, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.                                                                              |

HELPFUL: You can also emulate a third strategy, [staleWhileRevalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate), which returns cached data if it is available, but also fetches fresh data from the network in the background for next time.
To use this strategy set `strategy` to `freshness` and `timeout` to `0u` in `cacheConfig`.

This essentially does the following:

1. Try to fetch from the network first.
2. If the network request does not complete immediately, that is after a timeout of 0&nbsp;ms, ignore the cache age and fall back to the cached value.
3. Once the network request completes, update the cache for future requests.
4. If the resource does not exist in the cache, wait for the network request anyway.
-->

Angular 서비스 워커는 데이터 리소스에 다음 두 캐싱 전략 중 하나를 사용할 수 있습니다.

| 캐싱 전략     | 설명                                                                                                                                                                                                                                                                      |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `performance` | 기본값이며, 최대한 빠르게 응답하도록 최적화합니다. 캐시에 리소스가 있으면 캐시 버전을 사용하고 네트워크 요청을 보내지 않습니다. 성능을 높이는 대신 `maxAge`에 따라 어느 정도 오래된 데이터를 허용합니다. 사용자 아바타 이미지처럼 자주 변경되지 않는 리소스에 적합합니다. |
| `freshness`   | 데이터의 최신성을 우선해서 요청한 데이터를 네트워크에서 먼저 가져옵니다. `timeout`에 지정한 네트워크 제한 시간을 초과하는 경우에만 캐시를 사용합니다. 계좌 잔액처럼 자주 변경되는 리소스에 유용합니다.                                                                    |

도움말: 세 번째 전략인 [staleWhileRevalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)와 같은 동작도 구현할 수 있습니다.
이 전략은 캐시된 데이터가 있으면 반환하면서, 다음 요청을 위해 백그라운드에서 네트워크의 최신 데이터를 가져옵니다.
이 전략을 사용하려면 `cacheConfig`에서 `strategy`를 `freshness`로, `timeout`을 `0u`로 설정하세요.

동작은 다음과 같습니다:

1. 먼저 네트워크에서 가져오려고 시도합니다.
2. 네트워크 요청이 즉시 완료되지 않으면, 즉 0&nbsp;ms의 제한 시간이 지나면 캐시의 나이와 관계없이 캐시된 값을 사용합니다.
3. 네트워크 요청이 완료되면 이후 요청에 사용할 캐시를 갱신합니다.
4. 캐시에 리소스가 없다면 네트워크 요청을 기다립니다.

<!--
##### `cacheOpaqueResponses`
-->


##### `cacheOpaqueResponses`

<!--
Whether the Angular service worker should cache opaque responses or not.

If not specified, the default value depends on the data group's configured strategy:

| Strategies                             | Details                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Groups with the `freshness` strategy   | The default value is `true` and the service worker caches opaque responses. These groups will request the data every time and only fall back to the cached response when offline or on a slow network. Therefore, it doesn't matter if the service worker caches an error response.                                         |
| Groups with the `performance` strategy | The default value is `false` and the service worker doesn't cache opaque responses. These groups would continue to return a cached response until `maxAge` expires, even if the error was due to a temporary network or server issue. Therefore, it would be problematic for the service worker to cache an error response. |

<docs-callout title="Comment on opaque responses">

In case you are not familiar, an [opaque response](https://fetch.spec.whatwg.org#concept-filtered-response-opaque) is a special type of response returned when requesting a resource that is on a different origin which doesn't return CORS headers.
One of the characteristics of an opaque response is that the service worker is not allowed to read its status, meaning it can't check if the request was successful or not.
See [Introduction to `fetch()`](https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types) for more details.

If you are not able to implement CORS — for example, if you don't control the origin — prefer using the `freshness` strategy for resources that result in opaque responses.

</docs-callout>
-->

Angular 서비스 워커가 불투명 응답(opaque response)을 캐시에 저장할지 지정합니다.

지정하지 않으면 데이터 그룹에 설정된 전략에 따라 기본값이 달라집니다:

| 전략                               | 설명                                                                                                                                                                                                                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `freshness` 전략을 사용하는 그룹   | 기본값은 `true`이며 서비스 워커가 불투명 응답을 캐시에 저장합니다. 이 그룹은 매번 데이터를 요청하고, 오프라인이거나 네트워크가 느릴 때만 캐시된 응답을 사용합니다. 따라서 서비스 워커가 오류 응답을 캐시에 저장해도 문제가 되지 않습니다.                            |
| `performance` 전략을 사용하는 그룹 | 기본값은 `false`이며 서비스 워커가 불투명 응답을 캐시에 저장하지 않습니다. 이 그룹은 일시적인 네트워크나 서버 문제로 발생한 오류라도 `maxAge`가 만료될 때까지 캐시된 응답을 계속 반환합니다. 따라서 서비스 워커가 오류 응답을 캐시에 저장하면 문제가 될 수 있습니다. |

<docs-callout title="불투명 응답에 대한 설명">

[불투명 응답](https://fetch.spec.whatwg.org#concept-filtered-response-opaque)은 CORS 헤더를 반환하지 않는 다른 출처의 리소스를 요청했을 때 반환되는 특별한 응답 타입입니다.
불투명 응답의 특징 중 하나는 서비스 워커가 응답 상태를 읽을 수 없다는 것입니다.
따라서 요청의 성공 여부를 확인할 수 없습니다.
자세한 내용은 [`fetch()` 소개](https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types)를 참고하세요.

출처를 직접 관리하지 않는 등의 이유로 CORS를 구현할 수 없다면, 불투명 응답을 반환하는 리소스에는 `freshness` 전략을 사용하는 것이 좋습니다.

</docs-callout>

<!--
#### `cacheQueryOptions` {#datagroups-cachequeryoptions}
-->

<a id="cachequeryoptions-1"></a>

#### `cacheQueryOptions` {#datagroups-cachequeryoptions}

<!--
See [assetGroups](#assetgroups) for details.
-->

자세한 내용은 [assetGroups](#assetgroups)를 참고하세요.

<!--
### `navigationUrls`
-->


### `navigationUrls`

<!--
This optional section enables you to specify a custom list of URLs that will be redirected to the index file.
-->

이 선택적 섹션에서는 인덱스 파일로 리다이렉트할 커스텀 URL 목록을 지정할 수 있습니다.

<!--
#### Handling navigation requests
-->

<a id="handling-navigation-requests"></a>

#### 탐색 요청 처리하기

<!--
The ServiceWorker redirects navigation requests that don't match any `asset` or `data` group to the specified [index file](#index).
A request is considered to be a navigation request if:

- Its [method](https://developer.mozilla.org/docs/Web/API/Request/method) is `GET`
- Its [mode](https://developer.mozilla.org/docs/Web/API/Request/mode) is `navigate`
- It accepts a `text/html` response as determined by the value of the `Accept` header
- Its URL matches the following criteria:
  - The URL must not contain a file extension (that is, a `.`) in the last path segment
  - The URL must not contain `__`

HELPFUL: To configure whether navigation requests are sent through to the network or not, see the [navigationRequestStrategy](#navigationrequeststrategy) section and [applicationMaxAge](#applicationmaxage) sections.
-->

ServiceWorker는 어떤 `asset` 또는 `data` 그룹에도 해당하지 않는 탐색 요청을 지정한 [인덱스 파일](#index)로 리다이렉트합니다.
다음 조건을 충족하면 탐색 요청으로 간주합니다:

- [메서드](https://developer.mozilla.org/docs/Web/API/Request/method)가 `GET`입니다.
- [모드](https://developer.mozilla.org/docs/Web/API/Request/mode)가 `navigate`입니다.
- `Accept` 헤더 값에 따라 `text/html` 응답을 허용합니다.
- URL이 다음 기준을 충족합니다:
  - URL의 마지막 경로 세그먼트에 파일 확장자(즉, `.`)가 없어야 합니다.
  - URL에 `__`가 없어야 합니다.

도움말: 탐색 요청을 네트워크로 전달할지 설정하려면 [navigationRequestStrategy](#navigationrequeststrategy)와 [applicationMaxAge](#applicationmaxage) 섹션을 참고하세요.

<!--
#### Matching navigation request URLs
-->

<a id="matching-navigation-request-urls"></a>

#### 탐색 요청 URL 비교하기

<!--
While these default criteria are fine in most cases, it is sometimes desirable to configure different rules.
For example, you might want to ignore specific routes, such as those that are not part of the Angular app, and pass them through to the server.

This field contains an array of URLs and [glob-like](#modifying-the-configuration) URL patterns that are matched at runtime.
It can contain both negative patterns (that is, patterns starting with `!`) and non-negative patterns and URLs.

Only requests whose URLs match _any_ of the non-negative URLs/patterns and _none_ of the negative ones are considered navigation requests.
The URL query is ignored when matching.

If the field is omitted, it defaults to:

```ts
[
  '/**', // Include all URLs.
  '!/**/*.*', // Exclude URLs to files (containing a file extension in the last segment).
  '!/**/*__*', // Exclude URLs containing `__` in the last segment.
  '!/**/*__*/**', // Exclude URLs containing `__` in any other segment.
];
```
-->

기본 기준은 대부분의 상황에 적합하지만, 다른 규칙을 설정하는 것이 바람직한 경우도 있습니다.
예를 들어 Angular 앱에 속하지 않는 특정 라우팅 규칙을 무시하고 해당 요청을 서버로 전달하려는 경우입니다.

이 필드는 런타임에 비교하는 URL과 [glob 형태](#modifying-the-configuration)의 URL 패턴 배열입니다.
제외 패턴(`!`로 시작하는 패턴)과 일반 패턴 및 URL을 모두 포함할 수 있습니다.

URL이 일반 URL/패턴 중 _하나 이상_ 과 일치하면서, 제외 패턴과는 _어느 것도_ 일치하지 않는 요청만 탐색 요청으로 간주합니다.
비교할 때 URL 쿼리는 무시합니다.

이 필드를 생략하면 다음 기본값을 사용합니다:

```ts
[
  '/**', // 모든 URL을 포함합니다.
  '!/**/*.*', // 파일 URL을 제외합니다(마지막 세그먼트에 파일 확장자가 있는 경우).
  '!/**/*__*', // 마지막 세그먼트에 `__`가 포함된 URL을 제외합니다.
  '!/**/*__*/**', // 다른 세그먼트에 `__`가 포함된 URL을 제외합니다.
];
```

<!--
### `navigationRequestStrategy`
-->


### `navigationRequestStrategy`

<!--
This optional property enables you to configure how the service worker handles navigation requests:

```json
{
  "navigationRequestStrategy": "freshness"
}
```

| Possible values | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'performance'` | The default setting. Serves the specified [index file](#index), which is typically cached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `'freshness'`   | Passes the requests through to the network and falls back to the `performance` behavior when offline. This value is useful when the server redirects the navigation requests elsewhere using a `3xx` HTTP redirect status code. Reasons for using this value include: <ul> <li> Redirecting to an authentication website when authentication is not handled by the application </li> <li> Redirecting specific URLs to avoid breaking existing links/bookmarks after a website redesign </li> <li> Redirecting to a different website, such as a server-status page, while a page is temporarily down </li> </ul> |

IMPORTANT: The `freshness` strategy usually results in more requests sent to the server, which can increase response latency. It is recommended that you use the default performance strategy whenever possible.
-->

이 선택적 프로퍼티로 서비스 워커가 탐색 요청을 처리하는 방식을 설정할 수 있습니다:

```json
{
  "navigationRequestStrategy": "freshness"
}
```

| 사용할 수 있는 값 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'performance'`   | 기본 설정입니다. 지정된 [인덱스 파일](#index)을 제공하며, 이 파일은 일반적으로 캐시에 저장되어 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `'freshness'`     | 요청을 네트워크로 전달하고 오프라인일 때는 `performance` 방식으로 처리합니다. 서버가 `3xx` HTTP 리다이렉트 상태 코드로 탐색 요청을 다른 곳으로 보내는 경우에 유용합니다. 예를 들어 다음과 같은 상황에서 사용합니다: <ul> <li> 애플리케이션에서 인증을 처리하지 않아 인증 웹사이트로 리다이렉트하는 경우 </li> <li> 웹사이트를 개편한 뒤 기존 링크와 북마크가 깨지지 않도록 특정 URL을 리다이렉트하는 경우 </li> <li> 페이지가 일시적으로 중단되어 서버 상태 페이지 등 다른 웹사이트로 리다이렉트하는 경우 </li> </ul> |

중요: `freshness` 전략은 일반적으로 서버에 더 많은 요청을 보내므로 응답 지연이 늘어날 수 있습니다.
가능하면 기본값인 performance 전략을 사용하는 것을 권장합니다.

<!--
### `applicationMaxAge`
-->


### `applicationMaxAge`

<!--
This optional property enables you to configure how long the service worker will cache any requests. Within the `maxAge`, files will be served from cache. Beyond it, all requests will only be served from the network, including asset and data requests.
-->

이 선택적 프로퍼티로 서비스 워커가 요청을 캐시에 유지할 기간을 설정할 수 있습니다.
`maxAge` 이내에는 캐시에서 파일을 제공합니다.
이 기간이 지나면 애셋 요청과 데이터 요청을 포함한 모든 요청을 네트워크로만 처리합니다.
