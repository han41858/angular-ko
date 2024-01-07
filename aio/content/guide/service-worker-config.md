<!--
# Service worker configuration
-->
# 서비스 워커 설정

<!--
This topic describes the properties of the service worker configuration file.
-->
이 문서는 서비스 워커 설정 파일에 대해 설명합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following:

*   [Service worker overview](https://developer.chrome.com/docs/workbox/service-worker-overview/)
*   [Service Worker in Production](guide/service-worker-devops)

## Modifying the configuration

The `ngsw-config.json` JSON configuration file specifies which files and data URLs the Angular service worker should cache and how it should update the cached files and data.
The [Angular CLI](cli) processes this configuration file during `ng build`.

<!-- Does the following ngsw-config tool still work? Does not seem to. Not even clear what it does.

Manually, process it with the `ngsw-config` tool \(where `<project-name>` is the name of the project being built\):

<code-example format="shell" language="shell">

./node_modules/.bin/ngsw-config ./dist/&lt;project-name&gt; ./ngsw-config.json [/base/href]

</code-example>

The configuration file uses the JSON format.
-->
All file paths must begin with `/`, which corresponds to the deployment directory &mdash;usually `dist/<project-name>` in CLI projects.

<a id="glob-patterns"></a>

Unless otherwise commented, patterns use a **limited*** glob format that internally will be converted into regex:

| Glob formats | Details |
|:---          |:---     |
| `**`         | Matches 0 or more path segments                                                                        |
| `*`          | Matches 0 or more characters excluding `/`                                                             |
| `?`          | Matches exactly one character excluding `/`                                                            |
| `!` prefix   | Marks the pattern as being negative, meaning that only files that don't match the pattern are included |

<div class="alert is-helpful">

  **\*** Pay attention that some characters with a special meaning in a regular expression are not escaped and also the pattern is not wrapped in `^`/`$` in the internal glob to regex conversion.

  *   `$` is a special character in regex that matches the end of the string and will not be automatically escaped when converting the glob pattern to a regular expression.
      If you want to literally match the `$` character, you have to escape it yourself (with `\\$`).

      <div class="alert is-important">

        For example, the glob pattern `/foo/bar/$value` results in an unmatchable expression, because it is impossible to have a string that has any characters after it has ended.

      </div>

  *   The pattern will not be automatically wrapped in `^` and `$` when converting it to a regular expression.
      Therefore, the patterns will partially match the request URLs.
      If you want your patterns to match the beginning and/or end of URLs, you can add `^`/`$` yourself.

      <div class="alert is-important">

        For example, the glob pattern `/foo/bar/*.js` will match both `.js` and `.json` files.
        If you want to only match `.js` files, use `/foo/bar/*.js$`.

      </div>

</div>

Example patterns:

| Patterns     | Details |
|:---          |:---     |
| `/**/*.html` | Specifies all HTML files              |
| `/*.html`    | Specifies only HTML files in the root |
| `!/**/*.map` | Exclude all sourcemaps                |
-->
이 문서의 내용을 제대로 이해하려면 다음 내용을 미리 확인하는 것이 좋습니다.

*   [서비스 워커 개요](https://developer.chrome.com/docs/workbox/service-worker-overview/)
*   [서비스 워커 활용하기](guide/service-worker-devops)

`ngsw-config.json` 설정 파일은 Angular 서비스 워커가 캐싱할 파일과 데이터 URL을 지정하는 파일이며, 이 리소스들을 어떻게 업데이트할 것인지도 지정합니다.
[Angular CLI](cli)로 `ng build` 명령을 실행하면 이 설정 파일이 자동으로 구성됩니다.
아니면 `ngsw-config` 툴을 활용해서 이 파일을 직접 구성할 수도 있습니다:

<code-example format="shell" language="shell">

./node_modules/.bin/ngsw-config ./dist/&lt;project-name&gt; ./ngsw-config.json [/base/href]

</code-example>

이 설정 파일은 JSON 형식입니다.
이 파일에서 다른 파일의 위치를 가리킬 때는 반드시 `/`로 시작해야 하는데, 이 위치는 애플리케이션의 빌드 결과물이 위치하는 폴더를 의미하기 때문에 일반적으로 `dist/<프로젝트-이름>` 폴더를 의미합니다.

<a id="glob-patterns"></a>

설정 파일에는 다음과 같은 다중 파일 형식\(glob\)을 **일부** 사용할 수도 있습니다:

| Glob 형식 | 설명                                            |
|:--------|:----------------------------------------------|
| `**`    | 0개 이상 경로 세그먼트와 매칭됩니다.                         |
| `*`     | `/`를 제외한 문자가 0개 이상인 것과 매칭됩니다.                 |
| `?`     | `/`를 제외한 문자 하나와 매칭됩니다.                        |
| `!` 접두사 | 패턴을 반대로 적용할 수 있습니다. 결국 패턴에 매칭되지 않는 파일이 선택됩니다. |

<div class="alert is-helpful">

**\*** 정규표현식에서 특수한 용도로 사용되는 문자 중 일부는 예외처리\(escaped\)되지 않으며, 정규표현식의 `^`/`$`가 자동으로 붙지 않습니다.

  *   `$`는 정규표현식에서 문자열 끝을 의미하는 기호이며, glob 패턴에서 정규표현식으로 변환될 때도 마찬가지입니다.
      문자 `$`를 사용하려면 `\\$`라고 사용해야 합니다.

      <div class="alert is-important">

      glob 패턴 `/foo/bar/$value`는 문자열이 종료된 후에 문자열이 더 붙었기 때문에 아무 것과도 매칭되지 않습니다.

      </div>

  *  glob 패턴은 정규표현식으로 변환될 때 `^`, `$`를 자동으로 붙지 않습니다.
     그래서 이 패턴은 요청 URL 일부와도 매칭될 수 있습니다.
     URL 문자열 처음과 끝을 매칭하려면 `^`/`$`를 사용해야 합니다.

      <div class="alert is-important">

     glob 패턴을 `/foo/bar/*.js`라고 사용하면 `.js` 와 `.json` 파일 모두와 매칭됩니다.
     `.js` 파일만 매칭하려면 `/foo/bar/*.js$`라고 사용해야 합니다.

      </div>

</div>

몇가지 예제를 더 확인해 보세요:

| 패턴           | 설명                         |
|:-------------|:---------------------------|
| `/**/*.html` | 모든 HTML 파일과 매칭됩니다.         |
| `/*.html`    | 최상위 폴더에 있는 HTML 파일과 매칭됩니다. |
| `!/**/*.map` | 소스맵 파일을 제외합니다.             |


<!--
## Service worker configuration properties
-->
## 서비스 워커 설정 프로퍼티

<!--
The following sections describe each property of the configuration file.
-->
설정 파일에 활용할 수 있는 프로퍼티에 대해 각각 알아봅시다.


### `appData`

<!--
This section enables you to pass any data you want that describes this particular version of the application.
The `SwUpdate` service includes that data in the update notifications.
Many applications use this section to provide additional information for the display of UI popups, notifying users of the available update.
-->
애플리케이션에 필요한 데이터가 있다면 이 섹션을 사용해서 전달할 수 있습니다.
`SwUpdate` 서비스에도 업데이트 알림과 관련된 데이터가 필요할 수 있습니다.
그래서 보통 이 섹션은 업데이트 알림을 표시하는 팝업에 필요한 데이터를 지정하는 용도로 사용합니다.


<a id="index-file"></a>

### `index`

<!--
Specifies the file that serves as the index page to satisfy navigation requests.
Usually this is `/index.html`.
-->
네비게이션 요청이 시작되는 인덱스 페이지를 지정합니다.
보통 `/index.html`을 지정합니다.


### `assetGroups`

<!--
*Assets* are resources that are part of the application version that update along with the application.
They can include resources loaded from the page's origin as well as third-party resources loaded from CDNs and other external URLs.
As not all such external URLs might be known at build time, URL patterns can be matched.

<div class="alert is-important">

  For the service worker to handle resources that are loaded from different origins, make sure that [CORS][MozillaDeveloperDocsWebHttpCors] is correctly configured on each origin's server.

</div>

This field contains an array of asset groups, each of which defines a set of asset resources and the policy by which they are cached.

<code-example format="json" language="json">

{
  "assetGroups": [
    {
      &hellip;
    },
    {
      &hellip;
    }
  ]
}

</code-example>

<div class="alert is-helpful">

When the ServiceWorker handles a request, it checks asset groups in the order in which they appear in `ngsw-config.json`.
The first asset group that matches the requested resource handles the request.

It is recommended that you put the more specific asset groups higher in the list.
For example, an asset group that matches `/foo.js` should appear before one that matches `*.js`.

</div>

Each asset group specifies both a group of resources and a policy that governs them.
This policy determines when the resources are fetched and what happens when changes are detected.

Asset groups follow the Typescript interface shown here:

<code-example format="typescript" language="typescript">

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

</code-example>

Each `AssetGroup` is defined by the following asset group properties.
-->
*애셋(Assets)* 은 앱 버전을 구성하는 리소스 파일을 의미하며, 앱이 업데이트될 때 함께 업데이트됩니다.
이 때 애셋은 페이지에 포함된 리소스이거나 CDN 등에서 다운받은 서드파티 리소스일 수 있습니다.
하지만 빌드 시점에 외부 리소스의 모든 URL을 정확히 지정할 수는 없기 때문에 패턴으로 URL을 매칭하는 방법을 사용하기도 합니다.

<div class="alert is-important">

서비스 워커가 오리진이 다른 곳에 있는 리소스를 제대로 불러오려면 각 오리진 서버에서 [CORS][MozillaDeveloperDocsWebHttpCors]를 제대로 설정해야 합니다.

</div>

이 섹션에는 애셋 그룹을 배열 형태로 정의합니다.
이 때 애셋을 구성하는 파일을 모두 지정할 수 있으며, 애셋 그룹에 적용되는 캐싱 정책도 지정할 수 있습니다.

<code-example format="json" language="json">

{
  "assetGroups": [
    {
      &hellip;
    },
    {
      &hellip;
    }
  ]
}

</code-example>

<div class="alert is-helpful">

서비스 워커가 요청을 보내면 이 요청이 `ngsw-config.json` 안에 정의되어 있는지 확인합니다.
서비스 워커 환경설정 파일에 이 요청이 등록되어 있으면, 제일 처음 매칭되는 리소스를 응답으로 활용합니다.

그래서 리소스 목록을 지정할 때는 더 구체적인 주소를 앞쪽에 두는 것이 좋습니다.
예를 들어 `/foo.js` 라는 파일이 등록되어 있다면 이 항목은 `*.js` 보다 먼저 등록되어야 합니다.

</div>

각각의 애셋 그룹에는 그룹을 구성하는 리소스 파일들과 이 애셋 그룹에 적용될 정책을 함께 지정합니다.
리소스를 언제 다운받을 것인지, 새로운 버전을 발견하면 어떻게 할 것인지에 대한 정책도 이 때 적용합니다.

애셋 그룹은 TypeScript 인터페이스로 다음과 같이 정의되어 있습니다:

<code-example format="typescript" language="typescript">

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

</code-example>

`AssetGroup`에 사용할 수 있는 프로퍼티는 다음 섹션에서 알아봅시다.

#### `name`

<!--
A `name` is mandatory.
It identifies this particular group of assets between versions of the configuration.
-->
`name` 항목은 필수항목입니다.
이 항목은 애셋 그룹들 중에서 특정 애셋 그룹을 구별하기 위해 지정합니다.


#### `installMode`

<!--
The `installMode` determines how these resources are initially cached.
The `installMode` can be either of two values:

| Values     | Details |
|:---        |:---     |
| `prefetch` | Tells the Angular service worker to fetch every single listed resource while it's caching the current version of the application. This is bandwidth-intensive but ensures resources are available whenever they're requested, even if the browser is currently offline.                                                                                                                       |
| `lazy`     | Does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested are not cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation. |

Defaults to `prefetch`.
-->
`installMode` 항목을 지정하면 리소스 파일들의 초기 캐싱 동작을 지정할 수 있으며, 다음 값 중 하나를 사용할 수 있습니다:

| 값          | 설명                                                                                                                                                                                                                                                             |
|:-----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `prefetch` | 현재 앱 버전에 존재하는 모든 리소스 파일을 서비스 워커가 다운로드받아 캐싱합니다. 이 방식은 네트워크 대역폭을 많이 사용하지만 브라우저가 오프라인 상태일 때도 모든 리소스를 사용할 수 있습니다.                                                                                                                                                  |
| `lazy`     | 아무 리소스도 클라이언트에 캐싱하지 않습니다. 대신, Angular 서비스 워커는 요청을 보내고 응답으로 받은 리소스만 캐싱합니다. 그래서 이 방식을 필요한 것만 받아오는(on-demand) 캐싱 모드라고도 합니다. 요청하지 않은 리소스는 절대로 캐싱되지 않습니다. 이 방식은 이미지 파일을 해상도에 따라 여러벌 제공하는 경우에 유용합니다. 왜냐하면 여러벌로 만들어둔 이미지 파일 중에서 해당 스크린과 화면 비율에 맞는 이미지 파일만 캐싱되기 때문입니다. |

기본값은 `prefetch`입니다.


#### `updateMode`

<!--
For resources already in the cache, the `updateMode` determines the caching behavior when a new version of the application is discovered.
Any resources in the group that have changed since the previous version are updated in accordance with `updateMode`.

| Values     | Details |
|:---        |:---     |
| `prefetch` | Tells the service worker to download and cache the changed resources immediately.                                                                                                                                                        |
| `lazy`     | Tells the service worker to not cache those resources. Instead, it treats them as unrequested and waits until they're requested again before updating them. An `updateMode` of `lazy` is only valid if the `installMode` is also `lazy`. |

Defaults to the value `installMode` is set to.
-->
`updateMode`를 지정하면 리소스 파일을 이미 캐싱한 상태에서 새로운 앱 버전을 발견했을 때 어떤 동작을 할 지 결정할 수 있습니다.
이전 버전에서 캐싱된 리소스들은 `updateMode`에서 지정한 방식으로 업데이트됩니다.

| 값          | 설명                                                                                                                                                              |
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `prefetch` | 변경된 리소스를 즉시 다운로드받고 캐싱합니다.                                                                                                                                       |
| `lazy`     | 서비스 워커는 해당 리소스를 캐싱하지 않습니다. 대신, 다음에 다시 한 번 해당 리소스가 요청되었을 때 이 리소스가 캐싱되지 않은 것으로 간주하고 새로운 요청을 보냅니다. `updateMode`에 `lazy` 방식을 사용하려면 `installMode`도 `lazy`를 지정해야 합니다. |

기본값은 `installMode`에서 지정한 값이 적용됩니다.


#### `resources`

<!--
This section describes the resources to cache, broken up into the following groups:

| Resource groups | Details |
|:---             |:---     |
| `files`         | Lists patterns that match files in the distribution directory. These can be single files or glob-like patterns that match a number of files.                                                                                                                                                                                                                                                                   |
| `urls`          | Includes both URLs and URL patterns that are matched at runtime. These resources are not fetched directly and do not have content hashes, but they are cached according to their HTTP headers. This is most useful for CDNs such as the Google Fonts service. <br />  *\(Negative glob patterns are not supported and `?` will be matched literally; that is, it will not match any character other than `?`.\)* |
-->
이 섹션에는 캐싱할 리소스 목록을 다음과 같은 방식으로 지정합니다.

| 리소스 그룹  | 설명                                                                                                                                                                                                                                                                  |
|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `files` | 빌드결과물이 생성된 폴더를 기준으로 패턴으로 파일을 매칭할 수 있습니다. 대상은 파일 하나가 될 수도 있고, glob 패턴으로 한 번에 여러 파일을 지정할 수도 있습니다.                                                                                                                                                                     |
| `urls`  | 실행시점에 매칭될 URL이나 URL패턴을 지정합니다. 이 리소스들은 즉시 다운로드되지 않을 수 있고 해시값이 존재하지 않을 수 있지만, HTTP 헤더를 사용하는 방식으로 캐싱됩니다. 이 방식은 Google Fonts 서비스와 같이 CDN을 활용하는 부분에 적용하면 좋습니다.<br /> *\(이 방식에서는 glob 패턴을 반전하는 방식(`!`)이 동작하지 않으며, `?` 문자도 와일드카드로 동작하지 않습니다. `?` 문자는 `?` 문자 하나에만 매칭됩니다.\)* |


#### `cacheQueryOptions`

<!--
These options are used to modify the matching behavior of requests.
They are passed to the browsers `Cache#match` function.
See [MDN](https://developer.mozilla.org/docs/Web/API/Cache/match) for details.
Currently, only the following options are supported:

| Options        | Details |
|:---            |:---     |
| `ignoreSearch` | Ignore query parameters. Defaults to `false`. |
-->
이 옵션은 브라우저 `Cache#match` 함수로 전달되어 매칭되는 요청을 어떻게 처리할지 지정합니다.
자세한 내용은 [MDN](https://developer.mozilla.org/docs/Web/API/Cache/match) 문서를 참고하세요.
아직까지는 이 옵션만 지원합니다:

| 옵션             | 설명                             |
|:---------------|:-------------------------------|
| `ignoreSearch` | 쿼리 인자를 무시합니다. 기본값은 `false`입니다. |


### `dataGroups`

<!--
Unlike asset resources, data requests are not versioned along with the application.
They're cached according to manually-configured policies that are more useful for situations such as API requests and other data dependencies.

This field contains an array of data groups, each of which defines a set of data resources and the policy by which they are cached.

<code-example format="json" language="json">

{
  "dataGroups": [
    {
      &hellip;
    },
    {
      &hellip;
    }
  ]
}

</code-example>

<div class="alert is-helpful">

When the ServiceWorker handles a request, it checks data groups in the order in which they appear in `ngsw-config.json`.
The first data group that matches the requested resource handles the request.

It is recommended that you put the more specific data groups higher in the list.
For example, a data group that matches `/api/foo.json` should appear before one that matches `/api/*.json`.

</div>

Data groups follow this Typescript interface:

<code-example format="typescript" language="typescript">

export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    strategy?: 'freshness' &verbar; 'performance';
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}

</code-example>

Each `DataGroup` is defined by the following data group properties.
-->
애셋 리소스와는 다르게 API로 보내는 데이터 요청은 앱 버전으로 관리되지 않습니다.
그래서 이런 요청은 자주 사용하는 API나 데이터 의존성 관계에 맞게 수동으로 캐싱하는 정책을 구성해야 합니다.

이 필드는 배열로 구성합니다.
배열 항목은 객체이며, 데이터 리소스와 이 리소스에 적용될 캐싱 정책으로 구성됩니다.

<code-example format="json" language="json">

{
  "dataGroups": [
    {
      &hellip;
    },
    {
      &hellip;
    }
  ]
}

</code-example>

<div class="alert is-helpful">

애셋 리소스와는 다르게 API로 보내는 데이터 요청은 앱 버전으로 관리되지 않습니다.
그래서 이런 요청은 자주 사용하는 API나 데이터 의존성 관계에 맞게 수동으로 캐싱하는 정책을 구성해야 합니다.

이 필드는 배열로 구성합니다.
배열 항목은 객체이며, 데이터 리소스와 이 리소스에 적용될 캐싱 정책으로 구성됩니다.

</div>

데이터 그룹은 TypeScript 인터페이스로 이렇게 정의되어 있습니다:

<code-example format="typescript" language="typescript">

export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    strategy?: 'freshness' &verbar; 'performance';
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}

</code-example>

`DataGroup`에 사용할 수 있는 프로퍼티는 다음 섹션에서 알아봅시다.


#### `name`

<!--
Similar to `assetGroups`, every data group has a `name` which uniquely identifies it.
-->
데이터 그룹을 구분하는 용도로 사용합니다. `assetGroups`에 있는 `name`과 비슷합니다.


#### `urls`

A list of URL patterns.
URLs that match these patterns are cached according to this data group's policy.
Only non-mutating requests \(GET and HEAD\) are cached.

*   Negative glob patterns are not supported
*   `?` is matched literally; that is, it matches *only* the character `?`

#### `version`

<!--
Occasionally APIs change formats in a way that is not backward-compatible.
A new version of the application might not be compatible with the old API format and thus might not be compatible with existing cached resources from that API.

`version` provides a mechanism to indicate that the resources being cached have been updated in a backwards-incompatible way, and that the old cache entries &mdash;those from previous versions&mdash; should be discarded.

`version` is an integer field and defaults to `1`.
-->
API는 하위 호환성을 유지하지 못하면서 변경되기도 합니다.
그래서 새로운 버전의 앱에서 사용하는 API 형식이 이전에 사용했던 API 형식과 다르다면 캐싱된 API 리소스도 사용하지 못하게 됩니다.

이 때 하위호환성이 유지되는지, 이전에 캐싱했던 리소스를 사용할 수 있는지 판단하기 위해 `version` 필드를 지정합니다.
버전을 확인하고 이전 버전과 호환되지 않으면 캐싱된 리소스를 폐기합니다.

`version` 필드에는 정수값을 지정하며 기본값은 `1`입니다.


#### `cacheConfig`

<!--
The following properties define the policy by which matching requests are cached.
-->
이 섹션에는 리소스를 캐싱하면서 적용할 정책을 지정합니다.


##### `maxSize`

<!--
**Required**

The maximum number of entries, or responses, in the cache.
Open-ended caches can grow in unbounded ways and eventually exceed storage quotas, calling for eviction.
-->
**필수**

리소스나 HTTP 요청을 얼마나 많이 캐싱할 것인지 지정합니다.
캐싱 한도를 설정하지 않으면 언젠가는 스토리지 용량을 넘어갈 수밖에 없기 때문에 꼭 지정해야 합니다.


##### `maxAge`

<!--
**Required**

The `maxAge` parameter indicates how long responses are allowed to remain in the cache before being considered invalid and evicted.
`maxAge` is a duration string, using the following unit suffixes:

| Suffixes | Details |
|:---      |:---     |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `3d12h` caches content for up to three and a half days.
-->
**필수**

`maxAge` 필드를 사용하면 캐싱하는 리소스가 언제 만료되는지 지정할 수 있습니다.
`maxAge` 필드의 값은 다음 접미사를 사용해서 문자열로 지정합니다.

| 접미사 | 설명  |
|:----|:----|
| `d` | 일자  |
| `h` | 시간  |
| `m` | 분   |
| `s` | 초   |
| `u` | 밀리초 |

그래서 `3d12h`라고 지정하면 캐싱된 리소스가 3.5일 이후에 만료됩니다.


##### `timeout`

<!--
This duration string specifies the network timeout.
The network timeout is how long the Angular service worker waits for the network to respond before using a cached response, if configured to do so.
`timeout` is a duration string, using the following unit suffixes:

| Suffixes | Details |
|:---      |:---     |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `5s30u` translates to five seconds and 30 milliseconds of network timeout.
-->
네트워크 타임아웃 기준시간을 설정합니다.
Angular 서비스 워커는 이 필드로 지정된 만큼 네트워크 응답을 기다리며, 이 시간이 지나면 캐싱된 응답을 꺼내서 사용합니다.
`timeout` 필드는 다음 접미사를 사용해서 문자열로 지정합니다.

| 접미사 | 설명  |
|:----|:----|
| `d` | 일자  |
| `h` | 시간  |
| `m` | 분   |
| `s` | 초   |
| `u` | 밀리초 |

그래서 `5s30u`라고 지정하면 네트워크 요청을 보내고 5.3초가 지나면 타임아웃된 것으로 처리합니다.


##### `strategy`

<!--
The Angular service worker can use either of two caching strategies for data resources.

| Caching strategies | Details |
|:---                |:---     |
| `performance`      | The default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used, and no network request is made. This allows for some staleness, depending on the `maxAge`, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images. |
| `freshness`        | Optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to `timeout`, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.                                                                              |

<div class="alert is-helpful">

You can also emulate a third strategy, [staleWhileRevalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate), which returns cached data if it is available, but also fetches fresh data from the network in the background for next time.
To use this strategy set `strategy` to `freshness` and `timeout` to `0u` in `cacheConfig`.

This essentially does the following:

1.  Try to fetch from the network first.
2.  If the network request does not complete immediately, that is after a timeout of 0&nbsp;ms, ignore the cache age and fall back to the cached value.
3.  Once the network request completes, update the cache for future requests.
4.  If the resource does not exist in the cache, wait for the network request anyway.

</div>
-->
Angular 서비스 워커는 캐싱하는 데이터 리소스를 대상으로 두 가지 정책 중 하나를 사용할 수 있습니다.

| 캐싱 정책         | 설명                                                                                                                                                                               |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `performance` | 기본 정책입니다. 이 정책은 가장 빠르게 응답하도록 최적화된 정책입니다. 캐싱된 리소스가 있으면 그 리소스를 그대로 사용하며, `maxAge`와 같은 필드의 영향으로 만료되더라도 성능을 위해 만료된 데이터를 그대로 사용하기도 합니다. 이 정책은 사용자의 아바타 이미지와 같이 자주 변경되지 않는 리소스에 적합합니다. |
| `freshness`   | 네트워크를 통해 자주 요청되며, 최신 데이터가 중요할 때 사용합니다. 이 정책을 사용하면 `timeout` 필드의 영향으로 네트워크가 타임아웃 되어야만 캐싱된 데이터를 사용합니다. 이 정책은 자산의 잔액과 같이 자주 변경되는 리소스에 적합합니다.                                        |

<div class="alert is-helpful">

[staleWhileRevalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)를 활용하면 또 다른 정책을 활용할 수 있습니다.
이 정책은 가능하면 캐싱된 데이터를 반환하며 백그라운드에서 새로운 데이터를 받아옵니다.
이 정책을 사용하려면 `cacheConfig`에 `strategy`는 `freshness`로, `timeout`은 `0u`로 설정해야 합니다.

옵션을 이렇게 설정하면 앱이 이렇게 동작합니다:

1.  네트워크로 새로운 리소스를 요청합니다.
1.  요청이 즉시\(0ms\) 완료되지 않으면 캐싱된 데이터를 찾습니다.
1.  네트워크 요청이 완료되면 캐싱된 데이터를 갱신합니다.
1.  캐싱된 리소스가 없으면 응답이 오기까지 기다립니다.

</div>


##### `cacheOpaqueResponses`

<!--
Whether the Angular service worker should cache opaque responses or not.

If not specified, the default value depends on the data group's configured strategy:

| Strategies                             | Details |
|:---                                    |:---     |
| Groups with the `freshness` strategy   | The default value is `true` and the service worker caches opaque responses. These groups will request the data every time and only fall back to the cached response when offline or on a slow network. Therefore, it doesn't matter if the service worker caches an error response.                                    |
| Groups with the `performance` strategy | The default value is `false` and the service worker doesn't cache opaque responses. These groups would continue to return a cached response until `maxAge` expires, even if the error was due to a temporary network or server issue. Therefore, it would be problematic for the service worker to cache an error response. |

<div class="callout is-important">

<header>Comment on opaque responses</header>

In case you are not familiar, an [opaque response][WhatwgFetchSpecConceptFilteredResponseOpaque] is a special type of response returned when requesting a resource that is on a different origin which doesn't return CORS headers.
One of the characteristics of an opaque response is that the service worker is not allowed to read its status, meaning it can't check if the request was successful or not.
See [Introduction to fetch()][GoogleDeveloperWebUpdates201503IntroductionToFetchResponseTypes] for more details.

If you are not able to implement CORS &mdash;for example, if you don't control the origin&mdash; prefer using the `freshness` strategy for resources that result in opaque responses.

</div>
-->
도메인 출처가 다른 응답\(opaque response\)를 서비스 워커가 캐싱하는 정책을 지정합니다.

정책을 지정하지 않으면 데이터 그룹의 정책을 따릅니다:

| 정책                        | 설명                                                                                                                                                             |
|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `freshness` 정책을 사용하는 그룹   | 기본값은 `true`이며, 도메인 출처가 다른 응답도 캐싱합니다. 이 정책이 지정된 그룹은 데이터가 필요할 때마다 요청을 보내며, 인터넷 연결이 끊어지거나 네트워크가 느릴 때만 캐싱된 응답을 반환합니다. 서비스 워커가 오류 응답을 캐싱하는지는 신경쓰지 않습니다.             |
| `performance` 정책을 사용하는 그룹 | 기본값은 `false` 이며, 도메인 출처가 다른 응답을 캐싱하지 않습니다. 이 정책이 지정된 그룹은 인터넷 연결이 끊어지거나 서버가 동작하지 않더라도  `maxAge`가 만료되지 않는한 캐싱된 응답을 반환합니다. 오류 응답이 캐싱되었다면 서비스 워커 동작이 비정상적일 수 있습니다. |

<div class="callout is-important">

<header>도메인 출처가 다른 응답 참고</header>

[도메인 출처가 다른 응답][WhatwgFetchSpecConceptFilteredResponseOpaque]은 CORS 헤더가 없는 상태로 다른 도메인에서 리소스를 받은 응답을 의미합니다.
이런 응답은 서비스 워커가 상태값을 읽을 수 없기 때문에 응답이 실패했는지도 알 수 없습니다.
자세한 내용은 [fetch() 소개][GoogleDeveloperWebUpdates201503IntroductionToFetchResponseTypes] 문서를 참고하세요.

오리진을 직접 조작할 수 없는 상황 등과 같이 CORS를 제대로 처리할 수 없다면 `freshness` 정책을 사용하는 것을 권장합니다.

</div>

#### `cacheQueryOptions`

<!--
See [assetGroups](#assetgroups) for details.
-->
[assetGroups](#assetgroups) 섹션을 참고하세요.


### `navigationUrls`

<!--
This optional section enables you to specify a custom list of URLs that will be redirected to the index file.
-->
이 섹션은 옵션 항목입니다. 이 섹션을 사용하면 인덱스 파일로 리다이렉트되는 URL을 추가로 지정할 수 있습니다.


<!--
#### Handling navigation requests
-->
#### 네비게이션 요청 처리하기

<!--
The ServiceWorker redirects navigation requests that don't match any `asset` or `data` group to the specified [index file](#index-file).
A request is considered to be a navigation request if:

*   Its [method](https://developer.mozilla.org/docs/Web/API/Request/method) is `GET`
*   Its [mode](https://developer.mozilla.org/docs/Web/API/Request/mode) is `navigation`
*   It accepts a `text/html` response as determined by the value of the `Accept` header
*   Its URL matches the following criteria:
    *   The URL must not contain a file extension \(that is, a `.`\) in the last path segment
    *   The URL must not contain `__`

<div class="alert is-helpful">

To configure whether navigation requests are sent through to the network or not, see the [navigationRequestStrategy](#navigation-request-strategy) section.

</div>
-->
서비스 워커는 `asset`이나 `data` 그룹에 해당되지 않는 URL을 모두 [인덱스 파일로](#index-file) 리다이렉트합니다.
이 때 이 요청이 다음과 같은 조건이라면 네비게이션 요청으로 간주합니다:

*   [메서드](https://developer.mozilla.org/docs/Web/API/Request/method)가 `GET`인 경우
*   [요청 모드](https://developer.mozilla.org/docs/Web/API/Request/mode)가 `navigation`인 경우
*   `text/html` 응답을 받도록 헤더의 `Accept` 필드가 지정된 경우
*   URL이 이런 조건을 만족하는 경우:
    *   마지막 URL 세그먼트가 파일 확장자\(`.`\)를 포함하지 않는 경우
    *   URL에 `__`가 존재하지 않는 경우`

<div class="alert is-helpful">

화면 전환 요청이 네트워크를 통해 밖으로 전달될지 결정하는 방법에 대해 알아보려면 [navigationRequestStrategy](#navigation-request-strategy) 섹션을 참고하세요.

</div>


<!--
#### Matching navigation request URLs
-->
#### 네비게이션 요청 URL 처리하기

<!--
While these default criteria are fine in most cases, it is sometimes desirable to configure different rules.
For example, you might want to ignore specific routes, such as those that are not part of the Angular app, and pass them through to the server.

This field contains an array of URLs and [glob-like](#glob-patterns) URL patterns that are matched at runtime.
It can contain both negative patterns \(that is, patterns starting with `!`\) and non-negative patterns and URLs.

Only requests whose URLs match *any* of the non-negative URLs/patterns and *none* of the negative ones are considered navigation requests.
The URL query is ignored when matching.

If the field is omitted, it defaults to:

<code-example format="typescript" language="typescript">

[
  '/&ast;&ast;',           // Include all URLs.
  '!/&ast;&ast;/&ast;.&ast;',      // Exclude URLs to files.
  '!/&ast;&ast;/&ast;__&ast;',     // Exclude URLs containing &grave;__&grave; in the last segment.
  '!/&ast;&ast;/&ast;__&ast;/&ast;&ast;',  // Exclude URLs containing &grave;__&grave; in any other segment.
]

</code-example>
-->
위에서 설명한 조건만으로도 대부분의 경우를 처리할 수 있지만, 추가로 다른 룰이 필요할 때가 있습니다.
특정 URL을 Angular 앱으로 전달하지 않고 서버로 바로 보내는 경우도 이런 경우에 해당됩니다.

이런 조건은 개별 URL로 구성된 배열일 수도 있고 [glob과 비슷하게 구성된](#glob-patterns) URL 패턴일수도 있습니다.
`!` 문자로 시작하는 반전(negative) 패턴이 될수도 있습니다.

반전 패턴이 아닌 URL이나 패턴에 해당되는 요청이나, 반전 패턴에 아무것도 해당되지 않는 요청은 모두 네비게이션 요청으로 간주될 수 있습니다.
이미 지정된 URL 패턴과 매칭되는 URL은 모두 무시됩니다.

기본적으로 다음과 같은 요청은 네비게이션 요청으로 간주됩니다:

<code-example format="typescript" language="typescript">

[
  '/&ast;&ast;',           // 모든 URL
  '!/&ast;&ast;/&ast;.&ast;',      // 파일 요청은 모두 제외
  '!/&ast;&ast;/&ast;__&ast;',     // 마지막 URL 세그먼트에 &grave;__&grave; 를 포함하는 경우는 제외
  '!/&ast;&ast;/&ast;__&ast;/&ast;&ast;',  // 어디에라도 URL 세그먼트에 &grave;__&grave;를 포함하는 경우는 제외
]

</code-example>


<a id="navigation-request-strategy"></a>

### `navigationRequestStrategy`

<!--
This optional property enables you to configure how the service worker handles navigation requests:

<code-example format="json" language="json">

{
  "navigationRequestStrategy": "freshness"
}

</code-example>

| Possible values | Details |
|:---             |:---     |
| `'performance'` | The default setting. Serves the specified [index file](#index-file), which is typically cached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `'freshness'`   | Passes the requests through to the network and falls back to the `performance` behavior when offline. This value is useful when the server redirects the navigation requests elsewhere using a `3xx` HTTP redirect status code. Reasons for using this value include: <ul> <li> Redirecting to an authentication website when authentication is not handled by the application </li> <li> Redirecting specific URLs to avoid breaking existing links/bookmarks after a website redesign </li> <li> Redirecting to a different website, such as a server-status page, while a page is temporarily down </li> </ul> |

<div class="alert is-important">

The `freshness` strategy usually results in more requests sent to the server, which can increase response latency.
It is recommended that you use the default performance strategy whenever possible.

</div>
-->
이 옵션을 활용하면 화면 전환 요청을 어떻게 처리할지 지정할 수 있습니다:

<code-example format="json" language="json">

{
  "navigationRequestStrategy": "freshness"
}

</code-example>

| 값               | 설명                                                                                                                                                                                                                                                                                                                                       |
|:----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'performance'` | 기본값입니다. 미리 지정된 [인덱스 파일](#index-file)을 사용하며, 이 파일은 보통 캐싱되어 있습니다.                                                                                                                                                                                                                                                                          |
| `'freshness'`   | 네트워크가 연결되어 있으면 화면 전환 요청을 보냅니다. 네트워크에 연결되어 있지 않으면 `performance` 모드로 동작합니다. 이 값은 서버를 활용해서 리다이렉트 할 때\(`3xx` 상태 코드\) 사용하면 좋습니다. 이런 경우를 생각해 보세요: <ul> <li> 애플리케이션이 인증을 직접 처리하지 않아서 인증용 웹사이트로 리다이렉트 할 때 </li> <li> 웹사이트를 개편한 후에 존재하지 않는 링크/즐겨찾기로 들어오는 요청을 리다이렉트 할 때 </li> <li> 앱을 일시적으로 사용할 수 없을 때 서버에서 제공하는 화면이나 다른 웹사이트로 리다이렉트 할 때 </li> </ul> |

<div class="alert is-important">

`freshness` 정책을 사용하면 서버로 더 많은 요청을 보내기 때문에 서버와 통신하는 시간이 길어질 수 있습니다.
꼭 필요한 경우가 아니라면 `performance` 정책을 권장합니다.

</div>


<!-- links -->

<!-- external links -->

[GoogleDeveloperWebUpdates201503IntroductionToFetchResponseTypes]: https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types

[WhatwgFetchSpecConceptFilteredResponseOpaque]: https://fetch.spec.whatwg.org#concept-filtered-response-opaque

[MozillaDeveloperDocsWebHttpCors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

<!-- end links -->

@reviewed 2023-09-06
