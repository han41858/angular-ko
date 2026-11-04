<!--
# Deploy multiple locales
-->

<a id="deploy-multiple-locales"></a>

# 다국어 배포하기

<!--
If `myapp` is the directory that contains the distributable files of your project, you typically make different versions available for different locales in locale directories.
For example, your French version is located in the `myapp/fr` directory and the Spanish version is located in the `myapp/es` directory.

The HTML `base` tag with the `href` attribute specifies the base URI, or URL, for relative links.
If you set the `"localize"` option in [`angular.json`][GuideWorkspaceConfig] workspace build configuration file to `true` or to an array of locale IDs, the CLI adjusts the base `href` for each version of the application.
To adjust the base `href` for each version of the application, the CLI uses the configured `"subPath"` as the URL segment for the locale.
If you don't set `"subPath"`, it defaults to the locale ID.
Specify the `"subPath"` for each locale in your [`angular.json`][GuideWorkspaceConfig] workspace build configuration file.
The following example displays `"subPath"` set to an empty string.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="i18n-subPath"/>
-->

프로젝트의 배포 파일이 `myapp` 디렉터리에 있다면, 일반적으로 지역별 디렉터리에 각 지역에 맞는 버전을 제공합니다.
예를 들어 프랑스어 버전은 `myapp/fr` 디렉터리에, 스페인어 버전은 `myapp/es` 디렉터리에 둡니다.

HTML `base` 태그의 `href` 어트리뷰트는 상대 링크의 기준 URI 또는 URL을 지정합니다.
[`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일의 `"localize"` 옵션을 `true`나 지역 ID 배열로 설정하면, CLI가 애플리케이션 버전별로 기준 `href`를 조정합니다.
각 애플리케이션 버전의 기준 `href`를 조정하기 위해 CLI는 설정된 `"subPath"`를 해당 지역의 URL 경로 구간으로 사용합니다.
`"subPath"`를 설정하지 않으면 지역 ID가 기본값으로 사용됩니다.
각 지역의 `"subPath"`는 [`angular.json`][GuideWorkspaceConfig] 작업 공간 빌드 설정 파일에서 지정하세요.
다음 예제에서는 `"subPath"`를 빈 문자열로 설정합니다.

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" region="i18n-subPath"/>

<!--
## Configure a server
-->

<a id="configure-a-server"></a>

## 서버 설정하기

<!--
Typical deployment of multiple languages serve each language from a different subdirectory.
Users are redirected to the preferred language defined in the browser using the `Accept-Language` HTTP header.
If the user has not defined a preferred language, or if the preferred language is not available, then the server falls back to the default language.
To change the language, change your current location to another subdirectory.
The change of subdirectory often occurs using a menu implemented in the application.

For more information on how to deploy apps to a remote server, see [Deployment][GuideDeployment].

IMPORTANT: If you are using [Server rendering](guide/ssr) with `outputMode` set to `server`, Angular automatically handles redirection dynamically based on the `Accept-Language` HTTP header. This simplifies deployment by eliminating the need for manual server or configuration adjustments.
-->

여러 언어를 배포할 때는 일반적으로 각 언어를 서로 다른 하위 디렉터리에서 제공합니다.
`Accept-Language` HTTP 헤더를 사용해 브라우저에 설정된 사용자의 선호 언어로 리디렉션합니다.
사용자가 선호 언어를 설정하지 않았거나 해당 언어를 제공하지 않는 경우, 서버는 기본 언어를 사용합니다.
언어를 변경하려면 현재 위치를 다른 하위 디렉터리로 변경하세요.
이러한 하위 디렉터리 변경은 보통 애플리케이션에 구현된 메뉴를 통해 이루어집니다.

원격 서버에 앱을 배포하는 방법에 대한 자세한 내용은 [배포][GuideDeployment]를 참고하세요.

중요: `outputMode`를 `server`로 설정한 [서버 렌더링](guide/ssr)을 사용하는 경우, Angular가 `Accept-Language` HTTP 헤더에 따라 리디렉션을 동적으로 자동 처리합니다.
서버나 설정을 수동으로 조정할 필요가 없어 배포 과정이 간단해집니다.

<!--
### Nginx example
-->

<a id="nginx-example"></a>

### Nginx 예제

<!--
The following example displays an Nginx configuration.

<docs-code path="adev/src/content/examples/i18n/doc-files/nginx.conf" language="nginx"/>
-->

다음 예제는 Nginx 설정을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/nginx.conf" language="nginx"/>

<!--
### Apache example
-->

<a id="apache-example"></a>

### Apache 예제

<!--
The following example displays an Apache configuration.

<docs-code path="adev/src/content/examples/i18n/doc-files/apache2.conf" language="apache"/>
-->

다음 예제는 Apache 설정을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/apache2.conf" language="apache"/>

<!--
## Prerendering
-->

<a id="prerendering"></a>

## 사전 렌더링

<!--
If you set `outputMode` to `static`, the CLI prerenders the routes that your server routes configure with `RenderMode.Prerender` for each locale at build time, and it produces no server.
For more information, see [Generate a fully static application](guide/ssr#generate-a-fully-static-application).
Because no server chooses a language, your hosting setup handles redirects and not-found pages.
-->

`outputMode`를 `static`으로 설정하면 CLI는 서버 라우팅 규칙에서 `RenderMode.Prerender`로 설정한 경로를 빌드 시점에 지역별로 사전 렌더링하며, 서버를 생성하지 않습니다.
자세한 내용은 [완전히 정적인 애플리케이션 생성하기](guide/ssr#generate-a-fully-static-application)를 참고하세요.
언어를 선택하는 서버가 없으므로 호스팅 설정에서 리디렉션과 페이지를 찾을 수 없는 경우를 처리해야 합니다.

<!--
### Output layout
-->

<a id="output-layout"></a>

### 출력 구조

<!--
The CLI writes each locale to its own directory in `browser/`.
Each directory contains the prerendered HTML, the bundles, and a copy of the `public/` files for that locale.
The `lang` attribute and the `<base href>` of the prerendered pages match the locale.

The following layout assumes the source locale is served from the root, as described in the next section.

```text
browser/
├── index.html
├── about/index.html
├── tr/
│   ├── index.html
│   └── about/index.html
└── es/
    ├── index.html
    └── about/index.html
```

The root pages use `lang="en"` and `<base href="/">`. The `tr/` pages use `lang="tr"` and `<base href="/tr/">`, and the `es/` pages use `lang="es"` and `<base href="/es/">`.
-->

CLI는 각 지역의 파일을 `browser/` 내 별도 디렉터리에 출력합니다.
각 디렉터리에는 해당 지역의 사전 렌더링된 HTML, 번들, `public/` 파일의 복사본이 포함됩니다.
사전 렌더링된 페이지의 `lang` 어트리뷰트와 `<base href>`는 해당 지역에 맞게 설정됩니다.

다음 구조는 다음 섹션에서 설명하는 것처럼 원본 지역을 루트에서 제공한다고 가정합니다.

```text
browser/
├── index.html
├── about/index.html
├── tr/
│   ├── index.html
│   └── about/index.html
└── es/
    ├── index.html
    └── about/index.html
```

루트 페이지는 `lang="en"`과 `<base href="/">`를 사용합니다.
`tr/` 페이지는 `lang="tr"`과 `<base href="/tr/">`를, `es/` 페이지는 `lang="es"`와 `<base href="/es/">`를 사용합니다.

<!--
### Serve the source locale from the root
-->

<a id="serve-the-source-locale-from-the-root"></a>

### 루트에서 원본 지역 제공하기

<!--
To serve the source locale from `/` and nest the other locales under it, use the object form of `sourceLocale` and set `"subPath"` to an empty string.

```json
{
  "i18n": {
    "sourceLocale": {
      "code": "en",
      "subPath": ""
    },
    "locales": {
      "tr": "src/locale/messages.tr.xlf",
      "es": "src/locale/messages.es.xlf"
    }
  }
}
```

Without the empty `"subPath"`, the CLI places the source locale in its own directory named after the locale code, such as `/en/`.
-->

원본 지역을 `/`에서 제공하고 다른 지역을 그 아래에 배치하려면 `sourceLocale`을 객체 형식으로 지정하고 `"subPath"`를 빈 문자열로 설정하세요.

```json
{
  "i18n": {
    "sourceLocale": {
      "code": "en",
      "subPath": ""
    },
    "locales": {
      "tr": "src/locale/messages.tr.xlf",
      "es": "src/locale/messages.es.xlf"
    }
  }
}
```

`"subPath"`를 빈 문자열로 설정하지 않으면 CLI는 `/en/`처럼 지역 코드로 이름을 지정한 별도 디렉터리에 원본 지역의 파일을 배치합니다.

<!--
### Redirect users to their language
-->

<a id="redirect-users-to-their-language"></a>

### 사용자의 언어로 리디렉션하기

<!--
Static output does not redirect based on the `Accept-Language` HTTP header.
Configure your host to redirect based on that header.
The [Nginx](#nginx-example) and [Apache](#apache-example) examples assume that every locale, including the default, lives in its own subdirectory.
If you serve the source locale from the root, adapt them to redirect `/` only for the other locales.
-->

정적 출력물은 `Accept-Language` HTTP 헤더에 따라 리디렉션하지 않습니다.
해당 헤더에 따라 리디렉션하도록 호스트를 설정하세요.
[Nginx](#nginx-example)와 [Apache](#apache-example) 예제는 기본 지역을 포함한 모든 지역이 별도 하위 디렉터리에 있다고 가정합니다.
원본 지역을 루트에서 제공한다면 다른 지역에 대해서만 `/`에서 리디렉션하도록 예제를 조정하세요.

<!--
### Not-found pages
-->

<a id="not-found-pages"></a>

### 페이지를 찾을 수 없는 경우

<!--
The CLI does not prerender a page for the `**` wildcard route.
To get a not-found page, declare a concrete route such as `404` and make sure your server routes prerender it.
Each locale then gets its own page, for example `/404/index.html` and `/tr/404/index.html`.
Configure your host to serve the page that matches the locale path of the missing URL, for example with `error_page` in Nginx or `ErrorDocument` in Apache.
-->

CLI는 `**` 와일드카드 라우팅 규칙의 페이지를 사전 렌더링하지 않습니다.
페이지를 찾을 수 없을 때 표시할 페이지를 만들려면 `404`처럼 구체적인 라우팅 규칙을 선언하고 서버 라우팅 규칙에서 해당 페이지를 사전 렌더링하도록 설정하세요.
그러면 `/404/index.html`과 `/tr/404/index.html`처럼 지역별 페이지가 생성됩니다.
존재하지 않는 URL의 지역 경로에 맞는 페이지를 제공하도록 호스트를 설정하세요.
예를 들어 Nginx에서는 `error_page`, Apache에서는 `ErrorDocument`를 사용할 수 있습니다.

<!--
[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideDeployment]: tools/cli/deployment 'Deployment | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular workspace configuration | Angular'
-->

[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideDeployment]: tools/cli/deployment '배포 | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular 작업 공간 설정 | Angular'
