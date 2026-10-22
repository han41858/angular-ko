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

[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideDeployment]: tools/cli/deployment 'Deployment | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular workspace configuration | Angular'
-->

다음 예제는 Apache 설정을 보여줍니다.

<docs-code path="adev/src/content/examples/i18n/doc-files/apache2.conf" language="apache"/>

[CliBuild]: cli/build 'ng build | CLI | Angular'
[GuideDeployment]: tools/cli/deployment '배포 | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular 작업 공간 설정 | Angular'
