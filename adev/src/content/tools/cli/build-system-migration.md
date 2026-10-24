<!--
# Angular application build system
-->

<a id="angular-application-build-system"></a>

# Angular 애플리케이션 빌드 시스템

<!--
In v17 and higher, the new build system provides an improved way to build Angular applications. This new build system includes:

- A modern output format using ESM, with dynamic import expressions to support lazy module loading.
- Faster build-time performance for both initial builds and incremental rebuilds.
- Newer JavaScript ecosystem tools such as [esbuild](https://esbuild.github.io/) and [Vite](https://vitejs.dev/).
- Integrated SSR and prerendering capabilities.
- Automatic global and component stylesheet hot replacement.

This new build system is stable and fully supported for use with Angular applications.
You can migrate to the new build system with applications that use the `browser` builder.
If using a custom builder, please refer to the documentation for that builder on possible migration options.

IMPORTANT: The existing webpack-based build system and `browser` builder are deprecated.
Applications can temporarily continue to use the `browser` builder and projects can opt-out of migrating during an update, but the Angular team recommends migrating to the new build system.
-->

v17부터 제공되는 새로운 빌드 시스템을 사용하면 Angular 애플리케이션을 더 효율적으로 빌드할 수 있습니다.
새 빌드 시스템에는 다음 기능이 포함됩니다:

- ESM을 사용하는 최신 빌드 형식과 모듈 지연 로딩을 지원하는 동적 import 표현식
- 최초 빌드와 증분 재빌드의 성능 개선
- [esbuild](https://esbuild.github.io/), [Vite](https://vitejs.dev/) 같은 새로운 JavaScript 생태계 도구
- 통합된 SSR 및 사전 렌더링 기능
- 전역 스타일시트와 컴포넌트 스타일시트의 자동 핫 교체

새 빌드 시스템은 안정적이며 Angular 애플리케이션에서 사용할 수 있도록 완전히 지원됩니다.
`browser` 빌더를 사용하는 애플리케이션은 새 빌드 시스템으로 전환할 수 있습니다.
커스텀 빌더를 사용한다면 해당 빌더의 문서에서 가능한 전환 방법을 확인하세요.

중요: 기존 webpack 기반 빌드 시스템과 `browser` 빌더는 사용 중단이 권고됩니다.
일시적으로 `browser` 빌더를 계속 사용하거나 업데이트 중 전환하지 않도록 선택할 수 있지만 Angular 팀은 새 빌드 시스템으로 전환할 것을 권장합니다.

<!--
## For new applications
-->

<a id="for-new-applications"></a>

## 새 애플리케이션

<!--
New applications will use this new build system by default via the `application` builder.
-->

새 애플리케이션은 기본적으로 `application` 빌더를 통해 새 빌드 시스템을 사용합니다.

<!--
## For existing applications
-->

<a id="for-existing-applications"></a>

## 기존 애플리케이션

<!--
Both automated and manual procedures are available depending on the requirements of the project.
Starting with v18, the update process will ask if you would like to migrate existing applications to use the new build system via the automated migration.
Prior to migrating, please consider reviewing the [Known Issues](#known-issues) section as it may contain relevant information for your project.

HELPFUL: Remember to remove any CommonJS assumptions in the application server code if using SSR such as `require`, `__filename`, `__dirname`, or other constructs from the [CommonJS module scope](https://nodejs.org/api/modules.html#the-module-scope). All application code should be ESM compatible. This does not apply to third-party dependencies.
-->

프로젝트의 요구사항에 따라 자동 전환이나 수동 전환을 사용할 수 있습니다.
v18부터는 업데이트 과정에서 기존 애플리케이션을 새 빌드 시스템으로 자동 전환할지 묻습니다.
전환하기 전에 프로젝트와 관련된 내용이 있는지 [알려진 문제](#known-issues) 섹션을 확인하는 것이 좋습니다.

도움말: SSR을 사용한다면 애플리케이션 서버 코드에서 `require`, `__filename`, `__dirname`을 비롯해 [CommonJS 모듈 스코프](https://nodejs.org/api/modules.html#the-module-scope)를 전제로 사용하는 코드를 제거하세요.
애플리케이션 코드는 모두 ESM과 호환되어야 합니다.
이 요구사항은 서드 파티 의존성에는 적용되지 않습니다.

<!--
### Automated migration (Recommended)
-->

<a id="automated-migration-recommended"></a>

### 자동 전환(권장)

<!--
The automated migration will adjust both the application configuration within `angular.json` as well as code and stylesheets to remove previous webpack-specific feature usage.
While many changes can be automated and most applications will not require any further changes, each application is unique and there may be some manual changes required.
After the migration, please attempt a build of the application as there could be new errors that will require adjustments within the code.
The errors will attempt to provide solutions to the problem when possible and the later sections of this guide describe some of the more common situations that you may encounter.
When updating to Angular v18 via `ng update`, you will be asked to execute the migration.
This migration is entirely optional for v18 and can also be run manually at anytime after an update via the following command:

```shell

ng update @angular/cli --name use-application-builder

```

The migration does the following:

- Converts existing `browser` or `browser-esbuild` target to `application`
- Removes any previous SSR builders (because `application` does that now).
- Updates configuration accordingly.
- Merges `tsconfig.server.json` with `tsconfig.app.json` and adds the TypeScript option `"esModuleInterop": true` to ensure `express` imports are [ESM compliant](#esm-default-imports-vs-namespace-imports).
- Updates application server code to use new bootstrapping and output directory structure.
- Removes any webpack-specific builder stylesheet usage such as the tilde or caret in `@import`/`url()` and updates the configuration to provide equivalent behavior
- Converts to use the new lower dependency `@angular/build` Node.js package if no other `@angular-devkit/build-angular` usage is found.
-->

자동 전환은 `angular.json`의 애플리케이션 설정과 코드, 스타일시트를 조정해서 기존 webpack 전용 기능의 사용을 제거합니다.
많은 변경사항을 자동으로 처리할 수 있고 대부분의 애플리케이션은 추가 수정이 필요하지 않지만, 애플리케이션마다 상황이 다르므로 일부는 직접 수정해야 할 수도 있습니다.
전환한 뒤에는 애플리케이션을 빌드해 보세요.
코드를 조정해야 하는 새로운 오류가 발생할 수도 있습니다.
오류 메시지는 가능한 경우 해결 방법을 제시하며, 이 가이드의 뒷부분에서도 자주 발생하는 상황을 설명합니다.
`ng update`로 Angular v18로 업데이트하면 이 전환을 실행할지 묻습니다.
v18에서 전환은 전적으로 선택사항이며, 업데이트한 뒤 언제든 다음 명령으로 직접 실행할 수도 있습니다:

```shell

ng update @angular/cli --name use-application-builder

```

자동 전환은 다음 작업을 수행합니다:

- 기존 `browser` 또는 `browser-esbuild` 대상을 `application`으로 전환합니다.
- 기존 SSR 빌더를 제거합니다.
  이제 `application`이 이 작업을 처리합니다.
- 변경사항에 맞춰 설정을 갱신합니다.
- `tsconfig.server.json`을 `tsconfig.app.json`과 병합하고, `express` import가 [ESM을 준수](#esm-default-imports-vs-namespace-imports)하도록 TypeScript 옵션 `"esModuleInterop": true`를 추가합니다.
- 새로운 부트스트랩 방식과 빌드 결과물 디렉터리 구조를 사용하도록 애플리케이션 서버 코드를 갱신합니다.
- `@import`/`url()`의 물결표나 캐럿 등 webpack 빌더 전용 스타일시트 구문을 제거하고, 같은 동작을 제공하도록 설정을 갱신합니다.
- `@angular-devkit/build-angular`를 사용하는 다른 곳이 없다면, 의존성이 더 적은 새로운 Node.js 패키지 `@angular/build`를 사용하도록 전환합니다.

<!--
### Manual migration
-->

<a id="manual-migration"></a>

### 수동 전환

<!--
Additionally for existing projects, you can manually opt-in to use the new builder on a per-application basis with two different options.
Both options are considered stable and fully supported by the Angular team.
The choice of which option to use is a factor of how many changes you will need to make to migrate and what new features you would like to use in the project.

- The `browser-esbuild` builder builds only the client-side bundle of an application designed to be compatible with the existing `browser` builder that provides the preexisting build system.
  This builder provides equivalent build options, and in many cases, it serves as a drop-in replacement for existing `browser` applications.
- The `application` builder covers an entire application, such as the client-side bundle, as well as optionally building a server for server-side rendering and performing build-time prerendering of static pages.

The `application` builder is generally preferred as it improves server-side rendered (SSR) builds, and makes it easier for client-side rendered projects to adopt SSR in the future.
However it requires a little more migration effort, particularly for existing SSR applications if performed manually.
If the `application` builder is difficult for your project to adopt, `browser-esbuild` can be an easier solution which gives most of the build performance benefits with fewer breaking changes.
-->

기존 프로젝트에서는 두 가지 방법 중 하나를 선택해 애플리케이션별로 새 빌더를 직접 활성화할 수도 있습니다.
두 방법 모두 안정적이며 Angular 팀에서 완전히 지원합니다.
어떤 방법을 사용할지는 전환에 필요한 변경사항의 양과 프로젝트에서 사용하려는 새 기능에 따라 결정하면 됩니다.

- `browser-esbuild` 빌더는 애플리케이션의 클라이언트 사이드 번들만 빌드하며, 기존 빌드 시스템을 제공하는 `browser` 빌더와 호환되도록 설계되었습니다.
  같은 기능의 빌드 옵션을 제공하므로, 기존 `browser` 애플리케이션의 빌더를 그대로 교체해서 사용할 수 있는 경우가 많습니다.
- `application` 빌더는 클라이언트 사이드 번들을 포함해 애플리케이션 전체를 처리합니다.
  선택적으로 서버 사이드 렌더링을 위한 서버를 빌드하거나, 빌드 시점에 정적 페이지를 사전 렌더링할 수도 있습니다.

일반적으로는 `application` 빌더를 권장합니다.
서버 사이드 렌더링(SSR) 빌드를 개선하고, 클라이언트 사이드 렌더링 프로젝트에서도 나중에 SSR을 도입하기 쉬워지기 때문입니다.
다만 직접 전환하려면 작업이 조금 더 필요하며, 특히 기존 SSR 애플리케이션은 추가 작업이 필요합니다.
프로젝트에 `application` 빌더를 도입하기 어렵다면 `browser-esbuild`가 더 간단한 해결책이 될 수 있습니다.
호환성이 깨지는 변경사항을 줄이면서 빌드 성능 개선의 이점을 대부분 얻을 수 있습니다.

<!--
#### Manual migration to the compatibility builder
-->

<a id="manual-migration-to-the-compatibility-builder"></a>

#### 호환 빌더로 직접 전환하기

<!--
A builder named `browser-esbuild` is available within the `@angular-devkit/build-angular` package that is present in an Angular CLI generated application.
You can try out the new build system for applications that use the `browser` builder.
If using a custom builder, please refer to the documentation for that builder on possible migration options.

The compatibility option was implemented to minimize the amount of changes necessary to initially migrate your applications.
This is provided via an alternate builder (`browser-esbuild`).
You can update the `build` target for any application target to migrate to the new build system.

The following is what you would typically find in `angular.json` for an application:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

Changing the `builder` field is the only change you will need to make.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
...
```
-->

Angular CLI로 생성한 애플리케이션에 포함된 `@angular-devkit/build-angular` 패키지는 `browser-esbuild`라는 빌더를 제공합니다.
`browser` 빌더를 사용하는 애플리케이션에서 새 빌드 시스템을 사용해 볼 수 있습니다.
커스텀 빌더를 사용한다면 해당 빌더의 문서에서 가능한 전환 방법을 확인하세요.

호환 옵션은 애플리케이션을 처음 전환할 때 필요한 변경사항을 최소화하도록 구현되었습니다.
이 옵션은 대체 빌더인 `browser-esbuild`를 통해 제공됩니다.
애플리케이션의 `build` 대상을 갱신해서 새 빌드 시스템으로 전환할 수 있습니다.

애플리케이션의 `angular.json`에는 일반적으로 다음과 같은 설정이 있습니다:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

`builder` 필드만 변경하면 됩니다.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
...
```

<!--
#### Manual migration to the new `application` builder
-->

<a id="manual-migration-to-the-new-application-builder"></a>

#### 새 `application` 빌더로 직접 전환하기

<!--
A builder named `application` is also available within the `@angular-devkit/build-angular` package that is present in an Angular CLI generated application.
This builder is the default for all new applications created via `ng new`.

The following is what you would typically find in `angular.json` for an application:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

Changing the `builder` field is the first change you will need to make.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
...
```

Once the builder name has been changed, options within the `build` target will need to be updated.
The following list discusses all the `browser` builder options that will need to be adjusted.

- `main` should be renamed to `browser`.
- `polyfills` should be an array, rather than a single file.
- `buildOptimizer` should be removed, as this is covered by the `optimization` option.
- `resourcesOutputPath` should be removed, this is now always `media`.
- `vendorChunk` should be removed, as this was a performance optimization which is no longer needed.
- `commonChunk` should be removed, as this was a performance optimization which is no longer needed.
- `ngswConfigPath` should be renamed to `serviceWorker`.

If the application is not using SSR currently, this should be the final step to allow `ng build` to function.
After executing `ng build` for the first time, there may be new warnings or errors based on behavioral differences or application usage of webpack-specific features.
Many of the warnings will provide suggestions on how to remedy that problem.
If it appears that a warning is incorrect or the solution is not apparent, please open an issue on [GitHub](https://github.com/angular/angular-cli/issues).
Also, the later sections of this guide provide additional information on several specific cases as well as current known issues.

For applications new to SSR, the [Angular SSR Guide](guide/ssr) provides additional information regarding the setup process for adding SSR to an application.

For applications that are already using SSR, additional adjustments will be needed to update the application server to support the new integrated SSR capabilities.
The `application` builder now provides the integrated functionality for all of the following preexisting builders:

- `app-shell`
- `prerender`
- `server`
- `ssr-dev-server`

The `ng update` process will automatically remove usages of the `@nguniversal` scope packages where some of these builders were previously located.
The new `@angular/ssr` package will also be automatically added and used with configuration and code being adjusted during the update.
The `@angular/ssr` package supports the `browser` builder as well as the `application` builder.
-->

Angular CLI로 생성한 애플리케이션에 포함된 `@angular-devkit/build-angular` 패키지는 `application`이라는 빌더도 제공합니다.
이 빌더는 `ng new`로 생성하는 모든 새 애플리케이션의 기본 빌더입니다.

애플리케이션의 `angular.json`에는 일반적으로 다음과 같은 설정이 있습니다:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

먼저 `builder` 필드를 변경해야 합니다.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
...
```

빌더 이름을 변경한 다음에는 `build` 대상의 옵션을 갱신해야 합니다.
조정해야 하는 `browser` 빌더 옵션은 다음과 같습니다:

- `main`의 이름을 `browser`로 변경합니다.
- `polyfills`는 파일 하나가 아니라 배열로 지정합니다.
- `buildOptimizer`는 제거합니다.
  이 기능은 `optimization` 옵션이 처리합니다.
- `resourcesOutputPath`는 제거합니다.
  이제 항상 `media`를 사용합니다.
- `vendorChunk`는 제거합니다.
  더 이상 필요하지 않은 성능 최적화 옵션입니다.
- `commonChunk`는 제거합니다.
  더 이상 필요하지 않은 성능 최적화 옵션입니다.
- `ngswConfigPath`의 이름을 `serviceWorker`로 변경합니다.

현재 SSR을 사용하지 않는 애플리케이션이라면 여기까지 수정한 뒤 `ng build`를 실행할 수 있습니다.
처음 `ng build`를 실행하면 동작 방식의 차이나 애플리케이션에서 사용하는 webpack 전용 기능 때문에 새로운 경고나 오류가 발생할 수 있습니다.
많은 경고 메시지에서 문제를 해결하는 방법을 안내합니다.
경고가 잘못된 것으로 보이거나 해결 방법이 명확하지 않다면 [GitHub](https://github.com/angular/angular-cli/issues)에 이슈를 등록해 주세요.
이 가이드의 뒷부분에서도 몇 가지 구체적인 상황과 현재 알려진 문제를 설명합니다.

SSR을 새로 도입하는 애플리케이션이라면 [Angular SSR 가이드](guide/ssr)에서 SSR을 추가하는 설정 과정을 확인할 수 있습니다.

이미 SSR을 사용하는 애플리케이션은 새로운 통합 SSR 기능을 지원하도록 애플리케이션 서버를 추가로 조정해야 합니다.
이제 `application` 빌더는 다음 기존 빌더의 기능을 모두 통합해서 제공합니다:

- `app-shell`
- `prerender`
- `server`
- `ssr-dev-server`

`ng update` 과정은 일부 빌더가 이전에 포함되어 있던 `@nguniversal` 스코프 패키지의 사용을 자동으로 제거합니다.
새로운 `@angular/ssr` 패키지도 자동으로 추가해서 사용하며, 업데이트 과정에서 설정과 코드를 조정합니다.
`@angular/ssr` 패키지는 `browser` 빌더와 `application` 빌더를 모두 지원합니다.

<!--
## Executing a build
-->

<a id="executing-a-build"></a>

## 빌드 실행하기

<!--
Once you have updated the application configuration, builds can be performed using `ng build` as was previously done.
Depending on the choice of builder migration, some of the command line options may be different.
If the build command is contained in any `npm` or other scripts, ensure they are reviewed and updated.
For applications that have migrated to the `application` builder and that use SSR and/or prererending, you also may be able to remove extra `ng run` commands from scripts now that `ng build` has integrated SSR support.

```shell

ng build

```
-->

애플리케이션 설정을 갱신했다면 이전과 마찬가지로 `ng build`로 빌드할 수 있습니다.
전환할 때 선택한 빌더에 따라 일부 명령줄 옵션은 달라질 수 있습니다.
`npm` 스크립트나 다른 스크립트에 빌드 명령이 포함되어 있다면 확인해서 갱신하세요.
`application` 빌더로 전환한 애플리케이션에서 SSR이나 사전 렌더링을 사용한다면, 이제 `ng build`에 SSR 지원이 통합되었으므로 스크립트의 추가 `ng run` 명령을 제거할 수 있을지도 모릅니다.

```shell

ng build

```

<!--
## Starting the development server
-->

<a id="starting-the-development-server"></a>

## 개발 서버 실행하기

<!--
The development server will automatically detect the new build system and use it to build the application.
To start the development server no changes are necessary to the `dev-server` builder configuration or command line.

```shell

ng serve

```

You can continue to use the [command line options](/cli/serve) you have used in the past with the development server.

HELPFUL: With the development server, you may see a small Flash of Unstyled Content (FOUC) on startup as the server initializes.
The development server attempts to defer processing of stylesheets until first use to improve rebuild times.
This will not occur in builds outside the development server.
-->

개발 서버는 새 빌드 시스템을 자동으로 감지하고 이를 사용해서 애플리케이션을 빌드합니다.
개발 서버를 실행하기 위해 `dev-server` 빌더 설정이나 명령줄을 변경할 필요는 없습니다.

```shell

ng serve

```

개발 서버에서는 이전에 사용하던 [명령줄 옵션](/cli/serve)을 계속 사용할 수 있습니다.

도움말: 개발 서버를 실행하면 서버를 초기화하는 동안 잠시 스타일이 적용되지 않은 콘텐츠가 표시되는 현상(Flash of Unstyled Content, FOUC)이 발생할 수 있습니다.
개발 서버는 재빌드 시간을 줄이기 위해 스타일시트 처리를 처음 사용할 때까지 미루려고 합니다.
개발 서버 이외의 빌드에서는 이 현상이 발생하지 않습니다.

<!--
### Hot module replacement
-->

<a id="hot-module-replacement"></a>

### 핫 모듈 교체

<!--
Hot Module Replacement (HMR) is a technique used by development servers to avoid reloading the entire page when only part of an application is changed.
The changes in many cases can be immediately shown in the browser which allows for an improved edit/refresh cycle while developing an application.
While general JavaScript-based hot module replacement (HMR) is currently not supported, several more specific forms of HMR are available:

- **global stylesheet** (`styles` build option)
- **component stylesheet** (inline and file-based)
- **component template** (inline and file-based)

The HMR capabilities are automatically enabled and require no code or configuration changes to use.
Angular provides HMR support for both file-based (`templateUrl`/`styleUrl`/`styleUrls`) and inline (`template`/`styles`) component styles and templates.
The build system will attempt to compile and process the minimal amount of application code when it detects a stylesheet only change.

If preferred, the HMR capabilities can be disabled by setting the `hmr` development server option to `false`.
This can also be changed on the command line via:

```shell

ng serve --no-hmr

```
-->

핫 모듈 교체(Hot Module Replacement, HMR)는 애플리케이션 일부만 변경되었을 때 페이지 전체를 다시 로드하지 않도록 개발 서버에서 사용하는 기법입니다.
변경사항이 브라우저에 즉시 반영되는 경우가 많으므로 애플리케이션을 개발하면서 수정하고 확인하는 과정을 줄일 수 있습니다.
현재 일반적인 JavaScript 기반 핫 모듈 교체(HMR)는 지원하지 않지만, 다음과 같은 특정 형태의 HMR은 사용할 수 있습니다:

- **전역 스타일시트** (`styles` 빌드 옵션)
- **컴포넌트 스타일시트** (인라인 및 파일 기반)
- **컴포넌트 템플릿** (인라인 및 파일 기반)

HMR 기능은 자동으로 활성화되며, 사용하기 위해 코드나 설정을 변경할 필요는 없습니다.
Angular는 파일 기반(`templateUrl`/`styleUrl`/`styleUrls`)과 인라인(`template`/`styles`) 컴포넌트 스타일 및 템플릿에 모두 HMR을 지원합니다.
빌드 시스템은 스타일시트만 변경되었다고 감지하면 애플리케이션 코드를 최소한으로 컴파일하고 처리하려고 합니다.

원한다면 개발 서버의 `hmr` 옵션을 `false`로 설정해서 HMR 기능을 비활성화할 수 있습니다.
명령줄에서도 다음과 같이 변경할 수 있습니다:

```shell

ng serve --no-hmr

```

<!--
### Vite as a development server
-->

<a id="vite-as-a-development-server"></a>

### 개발 서버로 Vite 사용하기

<!--
The usage of Vite in the Angular CLI is currently within a _development server capacity only_. Even without using the underlying Vite build system, Vite provides a full-featured development server with client side support that has been bundled into a low dependency npm package. This makes it an ideal candidate to provide comprehensive development server functionality. The current development server process uses the new build system to generate a development build of the application in memory and passes the results to Vite to serve the application. The usage of Vite, much like the Webpack-based development server, is encapsulated within the Angular CLI `dev-server` builder and currently cannot be directly configured.
-->

Angular CLI는 현재 Vite를 _개발 서버 용도로만_ 사용합니다.
Vite는 자체 빌드 시스템을 사용하지 않더라도 클라이언트 사이드 지원을 갖춘 완전한 개발 서버를 제공하며, 의존성이 적은 npm 패키지로 배포됩니다.
따라서 종합적인 개발 서버 기능을 제공하기에 적합합니다.
현재 개발 서버는 새 빌드 시스템으로 메모리에 애플리케이션의 개발 빌드를 생성하고, 그 결과를 Vite에 전달해서 애플리케이션을 제공합니다.
Vite의 사용은 Webpack 기반 개발 서버와 마찬가지로 Angular CLI의 `dev-server` 빌더 안에 캡슐화되어 있으며, 현재 직접 설정할 수는 없습니다.

<!--
### Prebundling
-->

<a id="prebundling"></a>

### 사전 번들링

<!--
Prebundling provides improved build and rebuild times when using the development server.
Vite provides [prebundling capabilities](https://vite.dev/guide/dep-pre-bundling) that are enabled by default when using the Angular CLI.
The prebundling process analyzes all the third-party project dependencies within a project and processes them the first time the development server is executed.
This process removes the need to rebuild and bundle the project's dependencies each time a rebuild occurs or the development server is executed.

In most cases, no additional customization is required. However, some situations where it may be needed include:

- Customizing loader behavior for imports within the dependency such as the [`loader` option](#file-extension-loader-customization)
- Symlinking a dependency to local code for development such as [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link)
- Working around an error encountered during prebundling of a dependency

The prebundling process can be fully disabled or individual dependencies can be excluded if needed by a project.
The `dev-server` builder's `prebundle` option can be used for these customizations.
To exclude specific dependencies, the `prebundle.exclude` option is available:

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": {
          "exclude": ["some-dep"]
        }
      },
```

By default, `prebundle` is set to `true` but can be set to `false` to fully disable prebundling.
However, excluding specific dependencies is recommended instead since rebuild times will increase with prebundling disabled.

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": false
      },
```
-->

사전 번들링은 개발 서버를 사용할 때 빌드와 재빌드 시간을 줄여줍니다.
Vite는 Angular CLI에서 기본적으로 활성화되는 [사전 번들링 기능](https://vite.dev/guide/dep-pre-bundling)을 제공합니다.
사전 번들링 과정은 프로젝트의 모든 서드 파티 의존성을 분석하고, 개발 서버를 처음 실행할 때 처리합니다.
이 과정을 거치면 재빌드하거나 개발 서버를 실행할 때마다 프로젝트의 의존성을 다시 빌드하고 번들링할 필요가 없습니다.

대부분은 추가 설정이 필요하지 않습니다.
다만 다음과 같은 상황에서는 설정을 조정해야 할 수 있습니다:

- [`loader` 옵션](#file-extension-loader-customization)처럼 의존성 내부의 import에 대한 로더 동작을 변경하는 경우
- [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link)처럼 개발을 위해 의존성을 로컬 코드에 심볼릭 링크로 연결하는 경우
- 의존성의 사전 번들링 과정에서 발생한 오류를 우회하는 경우

프로젝트에서 필요하다면 사전 번들링을 완전히 비활성화하거나 특정 의존성을 제외할 수 있습니다.
이 설정에는 `dev-server` 빌더의 `prebundle` 옵션을 사용합니다.
특정 의존성을 제외하려면 `prebundle.exclude` 옵션을 사용하세요:

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": {
          "exclude": ["some-dep"]
        }
      },
```

`prebundle`의 기본값은 `true`이며, `false`로 설정하면 사전 번들링을 완전히 비활성화합니다.
다만 사전 번들링을 비활성화하면 재빌드 시간이 늘어나므로, 특정 의존성만 제외하는 것을 권장합니다.

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": false
      },
```

<!--
## New features
-->

<a id="new-features"></a>

## 새로운 기능

<!--
One of the main benefits of the application build system is the improved build and rebuild speed.
However, the new application build system also provides additional features not present in the `browser` builder.

IMPORTANT: The new features of the `application` builder described here are incompatible with the `karma` test builder by default because it is using the `browser` builder internally.
Users can opt-in to use the `application` builder by setting the `builderMode` option to `application` for the `karma` builder.
This option is currently in developer preview.
If you notice any issues, please report them [here](https://github.com/angular/angular-cli/issues).
-->

애플리케이션 빌드 시스템의 주요 이점 중 하나는 빌드와 재빌드 속도가 개선된다는 점입니다.
새 애플리케이션 빌드 시스템은 이 외에도 `browser` 빌더에는 없는 기능을 제공합니다.

중요: 여기서 설명하는 `application` 빌더의 새 기능은 기본적으로 `karma` 테스트 빌더와 호환되지 않습니다.
`karma`가 내부적으로 `browser` 빌더를 사용하기 때문입니다.
`karma` 빌더의 `builderMode` 옵션을 `application`으로 설정하면 `application` 빌더를 사용하도록 선택할 수 있습니다.
이 옵션은 현재 개발자 미리보기 단계입니다.
문제를 발견하면 [여기](https://github.com/angular/angular-cli/issues)에 알려주세요.

<!--
### Build-time value replacement with `define`
-->

<a id="build-time-value-replacement-with-define"></a>

### `define`으로 빌드 시점에 값 교체하기

<!--
The `define` option allows identifiers present in the code to be replaced with another value at build time.
This is similar to the behavior of Webpack's `DefinePlugin` which was previously used with some custom Webpack configurations that used third-party builders.
The option can either be used within the `angular.json` configuration file or on the command line.
Configuring `define` within `angular.json` is useful for cases where the values are constant and able to be checked in to source control.

Within the configuration file, the option is in the form of an object.
The keys of the object represent the identifier to replace and the values of the object represent the corresponding replacement value for the identifier.
An example is as follows:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "define": {
          "SOME_NUMBER": "5",
          "ANOTHER": "'this is a string literal, note the extra single quotes'",
          "REFERENCE": "globalThis.someValue.noteTheAbsentSingleQuotes"
      }
    }
  }
```

HELPFUL: All replacement values are defined as strings within the configuration file.
If the replacement is intended to be an actual string literal, it should be enclosed in single quote marks.
This allows the flexibility of using any valid JSON type as well as a different identifier as a replacement.

The command line usage is preferred for values that may change per build execution such as the git commit hash or an environment variable.
The CLI will merge `--define` values from the command line with `define` values from `angular.json`, including both in a build.
Command line usage takes precedence if the same identifier is present for both.
For command line usage, the `--define` option uses the format of `IDENTIFIER=VALUE`.

```shell
ng build --define SOME_NUMBER=5 --define "ANOTHER='these will overwrite existing'"
```

Environment variables can also be selectively included in a build.
For non-Windows shells, the quotes around the hash literal can be escaped directly if preferred.
This example assumes a bash-like shell but similar behavior is available for other shells as well.

```shell
export MY_APP_API_HOST="http://example.com"
export API_RETRY=3
ng build --define API_HOST=\'$MY_APP_API_HOST\' --define API_RETRY=$API_RETRY
```

For either usage, TypeScript needs to be aware of the types for the identifiers to prevent type-checking errors during the build.
This can be accomplished with an additional type definition file within the application source code (`src/types.d.ts`, for example) with similar content:

```ts
declare const SOME_NUMBER: number;
declare const ANOTHER: string;
declare const GIT_HASH: string;
declare const API_HOST: string;
declare const API_RETRY: number;
```

The default project configuration is already setup to use any type definition files present in the project source directories.
If the TypeScript configuration for the project has been altered, it may need to be adjusted to reference this newly added type definition file.

IMPORTANT: This option will not replace identifiers contained within Angular metadata such as a Component or Directive decorator.
-->

`define` 옵션을 사용하면 코드에 있는 식별자를 빌드 시점에 다른 값으로 교체할 수 있습니다.
서드 파티 빌더를 사용하는 일부 커스텀 Webpack 설정에서 사용하던 Webpack의 `DefinePlugin`과 비슷하게 동작합니다.
이 옵션은 `angular.json` 설정 파일이나 명령줄에서 사용할 수 있습니다.
값이 일정하고 소스 관리에 포함할 수 있다면 `angular.json`에 `define`을 설정하는 것이 유용합니다.

설정 파일에서는 객체 형태로 옵션을 지정합니다.
객체의 키는 교체할 식별자이며, 객체의 값은 해당 식별자를 대체할 값입니다.
예를 들어 다음과 같이 지정합니다:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "define": {
          "SOME_NUMBER": "5",
          "ANOTHER": "'this is a string literal, note the extra single quotes'",
          "REFERENCE": "globalThis.someValue.noteTheAbsentSingleQuotes"
      }
    }
  }
```

도움말: 설정 파일에서는 대체할 값을 모두 문자열로 정의합니다.
실제 문자열 리터럴로 교체하려면 작은따옴표로 감싸야 합니다.
이 방식으로 유효한 JSON 타입이나 다른 식별자도 대체 값으로 사용할 수 있습니다.

git 커밋 해시나 환경 변수처럼 빌드를 실행할 때마다 달라질 수 있는 값은 명령줄에서 지정하는 것이 좋습니다.
CLI는 명령줄의 `--define` 값과 `angular.json`의 `define` 값을 병합해서 빌드에 모두 포함합니다.
같은 식별자가 양쪽에 있으면 명령줄의 값이 우선합니다.
명령줄에서는 `--define` 옵션에 `IDENTIFIER=VALUE` 형식으로 값을 지정합니다.

```shell
ng build --define SOME_NUMBER=5 --define "ANOTHER='these will overwrite existing'"
```

환경 변수도 선택적으로 빌드에 포함할 수 있습니다.
Windows가 아닌 셸에서는 원한다면 해시 리터럴 주변의 따옴표를 직접 이스케이프할 수 있습니다.
다음 예제는 bash 계열 셸을 가정하지만, 다른 셸에서도 비슷한 동작을 사용할 수 있습니다.

```shell
export MY_APP_API_HOST="http://example.com"
export API_RETRY=3
ng build --define API_HOST=\'$MY_APP_API_HOST\' --define API_RETRY=$API_RETRY
```

어느 방법을 사용하든 빌드 중 타입 검사 오류가 발생하지 않도록 TypeScript가 식별자의 타입을 알아야 합니다.
애플리케이션 소스 코드에 다음과 비슷한 내용의 타입 정의 파일(예: `src/types.d.ts`)을 추가하면 됩니다:

```ts
declare const SOME_NUMBER: number;
declare const ANOTHER: string;
declare const GIT_HASH: string;
declare const API_HOST: string;
declare const API_RETRY: number;
```

기본 프로젝트 설정은 소스 디렉터리에 있는 타입 정의 파일을 모두 사용하도록 이미 구성되어 있습니다.
프로젝트의 TypeScript 설정을 변경했다면 새로 추가한 타입 정의 파일을 참조하도록 조정해야 할 수도 있습니다.

중요: 이 옵션은 컴포넌트나 디렉티브 데코레이터 같은 Angular 메타데이터 안의 식별자를 교체하지 않습니다.

<!--
### File extension loader customization
-->

<a id="file-extension-loader-customization"></a>

### 파일 확장자별 로더 설정하기

<!--
IMPORTANT: This feature is only available with the `application` builder.

Some projects may need to control how all files with a specific file extension are loaded and bundled into an application.
When using the `application` builder, the `loader` option can be used to handle these cases.
The option allows a project to define the type of loader to use with a specified file extension.
A file with the defined extension can then be used within the application code via an import statement or dynamic import expression.
The available loaders that can be used are:

- `text` - inlines the content as a `string` available as the default export
- `binary` - inlines the content as a `Uint8Array` available as the default export
- `file` - emits the file at the application output path and provides the runtime location of the file as the default export
- `dataurl` - inlines the content as a [data URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
- `base64` - inlines the content as a Base64-encoded string.
- `empty` - considers the content to be empty and will not include it in bundles

The `empty` value, while less common, can be useful for compatibility of third-party libraries that may contain bundler-specific import usage that needs to be removed.
One case for this is side-effect imports (`import 'my.css';`) of CSS files which has no effect in a browser.
Instead, the project can use `empty` and then the CSS files can be added to the `styles` build option or use some other injection method.

The loader option is an object-based option with the keys used to define the file extension and the values used to define the loader type.

An example of the build option usage to inline the content of SVG files into the bundled application would be as follows:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "loader": {
        ".svg": "text"
      }
    }
  }
```

An SVG file can then be imported:

```ts
import contents from './some-file.svg';

console.log(contents); // <svg>...</svg>
```

Additionally, TypeScript needs to be aware of the module type for the import to prevent type-checking errors during the build. This can be accomplished with an additional type definition file within the application source code (`src/types.d.ts`, for example) with the following or similar content:

```ts
declare module '*.svg' {
  const content: string;
  export default content;
}
```

The default project configuration is already setup to use any type definition files (`.d.ts` files) present in the project source directories. If the TypeScript configuration for the project has been altered, the tsconfig may need to be adjusted to reference this newly added type definition file.
-->

중요: 이 기능은 `application` 빌더에서만 사용할 수 있습니다.

일부 프로젝트는 특정 확장자를 가진 모든 파일을 어떻게 로드하고 애플리케이션에 번들링할지 제어해야 할 수 있습니다.
`application` 빌더를 사용한다면 `loader` 옵션으로 처리할 수 있습니다.
이 옵션은 지정한 파일 확장자에 사용할 로더 타입을 정의합니다.
해당 확장자의 파일은 애플리케이션 코드에서 import 문이나 동적 import 표현식으로 사용할 수 있습니다.
사용할 수 있는 로더는 다음과 같습니다:

- `text` - 내용을 인라인으로 포함하고 기본 내보내기(default export)로 `string`을 제공합니다.
- `binary` - 내용을 인라인으로 포함하고 기본 내보내기로 `Uint8Array`를 제공합니다.
- `file` - 애플리케이션 빌드 결과물 경로에 파일을 생성하고, 실행 중 사용할 파일 위치를 기본 내보내기로 제공합니다.
- `dataurl` - 내용을 [데이터 URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)로 인라인으로 포함합니다.
- `base64` - 내용을 Base64로 인코딩된 문자열로 인라인으로 포함합니다.
- `empty` - 내용을 빈 것으로 취급하고 번들에 포함하지 않습니다.

`empty`는 자주 사용하지 않지만, 제거해야 하는 번들러 전용 import가 포함된 서드 파티 라이브러리와 호환성을 유지할 때 유용할 수 있습니다.
예를 들어 CSS 파일의 사이드 이펙트 import(`import 'my.css';`)는 브라우저에서 효과가 없습니다.
이 경우 프로젝트에서 `empty`를 사용하고, CSS 파일을 `styles` 빌드 옵션에 추가하거나 다른 주입 방식을 사용할 수 있습니다.

로더 옵션은 객체 형태이며, 키에 파일 확장자를 지정하고 값에 로더 타입을 지정합니다.

SVG 파일의 내용을 번들링된 애플리케이션에 인라인으로 포함하려면 다음과 같이 빌드 옵션을 사용합니다:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "loader": {
        ".svg": "text"
      }
    }
  }
```

그러면 SVG 파일을 import할 수 있습니다:

```ts
import contents from './some-file.svg';

console.log(contents); // <svg>...</svg>
```

또한 빌드 중 타입 검사 오류가 발생하지 않도록 TypeScript가 import의 모듈 타입을 알아야 합니다.
애플리케이션 소스 코드에 다음과 같거나 비슷한 내용의 타입 정의 파일(예: `src/types.d.ts`)을 추가하면 됩니다:

```ts
declare module '*.svg' {
  const content: string;
  export default content;
}
```

기본 프로젝트 설정은 소스 디렉터리에 있는 타입 정의 파일(`.d.ts` 파일)을 모두 사용하도록 이미 구성되어 있습니다.
프로젝트의 TypeScript 설정을 변경했다면 새로 추가한 타입 정의 파일을 참조하도록 tsconfig를 조정해야 할 수도 있습니다.

<!--
### Import attribute loader customization
-->

<a id="import-attribute-loader-customization"></a>

### import 어트리뷰트로 로더 설정하기

<!--
For cases where only certain files should be loaded in a specific way, per file control over loading behavior is available.
This is accomplished with a `loader` [import attribute](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) that can be used with both import statements and expressions.
The presence of the import attribute takes precedence over all other loading behavior including JS/TS and any `loader` build option values.
For general loading for all files of an otherwise unsupported file type, the [`loader`](#file-extension-loader-customization) build option is recommended.

For the import attribute, the following loader values are supported:

- `text` - inlines the content as a `string` available as the default export
- `binary` - inlines the content as a `Uint8Array` available as the default export
- `file` - emits the file at the application output path and provides the runtime location of the file as the default export
- `dataurl` - inlines the content as a [data URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
- `base64` - inlines the content as a Base64-encoded string.

An additional requirement to use import attributes is that the TypeScript `module` option must be set to `esnext` to allow TypeScript to successfully build the application code.
Once `ES2025` is available within TypeScript, this change will no longer be needed.

At this time, TypeScript does not support type definitions that are based on import attribute values.
The use of `@ts-expect-error`/`@ts-ignore` or the use of individual type definition files (assuming the file is only imported with the same loader attribute) is currently required.
As an example, an SVG file can be imported as text via:

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import contents from './some-file.svg' with {loader: 'text'};
```

The same can be accomplished with an import expression inside an async function.

```ts
async function loadSvg(): Promise<string> {
  // @ts-expect-error TypeScript cannot provide types based on attributes yet
  return import('./some-file.svg', {with: {loader: 'text'}}).then((m) => m.default);
}
```

For the import expression, the `loader` value must be a string literal to be statically analyzed.
A warning will be issued if the value is not a string literal.

The `file` loader is useful when a file will be loaded at runtime through either a `fetch()`, setting to an image elements `src`, or other similar method.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import imagePath from './image.webp' with {loader: 'file'};

console.log(imagePath); // media/image-ULK2SIIB.webp
```

The `base64` loader is useful when a file needs to be embedded directly into the bundle as an encoded string that can later be used to construct a Data URL.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import logo from './logo.png' with {loader: 'base64'};

console.log(logo); // "iVBORw0KGgoAAAANSUhEUgAA..."
```

The `dataurl` loader to inline assets as complete Data URLs.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import icon from './icon.svg' with {loader: 'dataurl'};

console.log(icon); // "data:image/svg+xml;..."
```

For production builds as shown in the code comment above, hashing will be automatically added to the path for long-term caching.

HELPFUL: When using the development server and using a `loader` attribute to import a file from a Node.js package, that package must be excluded from prebundling via the development server `prebundle` option.
-->

일부 파일만 특정 방식으로 로드해야 한다면 파일별로 로딩 동작을 제어할 수 있습니다.
import 문과 import 표현식에서 사용할 수 있는 `loader` [import 어트리뷰트](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with)로 설정합니다.
import 어트리뷰트를 지정하면 JS/TS 처리와 `loader` 빌드 옵션 값을 포함한 다른 모든 로딩 동작보다 우선합니다.
기본적으로 지원하지 않는 파일 타입의 모든 파일에 일반적인 로딩 방식을 지정하려면 [`loader`](#file-extension-loader-customization) 빌드 옵션을 권장합니다.

import 어트리뷰트는 다음 로더 값을 지원합니다:

- `text` - 내용을 인라인으로 포함하고 기본 내보내기(default export)로 `string`을 제공합니다.
- `binary` - 내용을 인라인으로 포함하고 기본 내보내기로 `Uint8Array`를 제공합니다.
- `file` - 애플리케이션 빌드 결과물 경로에 파일을 생성하고, 실행 중 사용할 파일 위치를 기본 내보내기로 제공합니다.
- `dataurl` - 내용을 [데이터 URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)로 인라인으로 포함합니다.
- `base64` - 내용을 Base64로 인코딩된 문자열로 인라인으로 포함합니다.

import 어트리뷰트를 사용하려면 추가로 TypeScript의 `module` 옵션을 `esnext`로 설정해야 TypeScript가 애플리케이션 코드를 정상적으로 빌드할 수 있습니다.
TypeScript에서 `ES2025`를 사용할 수 있게 되면 이 변경은 더 이상 필요하지 않습니다.

현재 TypeScript는 import 어트리뷰트 값을 기반으로 하는 타입 정의를 지원하지 않습니다.
따라서 `@ts-expect-error`/`@ts-ignore`를 사용하거나, 개별 타입 정의 파일을 사용해야 합니다(해당 파일을 항상 같은 로더 어트리뷰트로 import한다고 가정합니다).
예를 들어 SVG 파일을 텍스트로 import하려면 다음과 같이 작성합니다:

```ts
// @ts-expect-error TypeScript는 아직 어트리뷰트를 기반으로 타입을 제공할 수 없습니다.
import contents from './some-file.svg' with {loader: 'text'};
```

비동기 함수 안의 import 표현식으로도 같은 작업을 할 수 있습니다.

```ts
async function loadSvg(): Promise<string> {
  // @ts-expect-error TypeScript는 아직 어트리뷰트를 기반으로 타입을 제공할 수 없습니다.
  return import('./some-file.svg', {with: {loader: 'text'}}).then((m) => m.default);
}
```

import 표현식에서 `loader` 값은 정적으로 분석할 수 있도록 문자열 리터럴이어야 합니다.
문자열 리터럴이 아니면 경고가 표시됩니다.

`file` 로더는 `fetch()`, 이미지 엘리먼트의 `src` 설정 또는 비슷한 방식으로 실행 중 파일을 로드할 때 유용합니다.

```ts
// @ts-expect-error TypeScript는 아직 어트리뷰트를 기반으로 타입을 제공할 수 없습니다.
import imagePath from './image.webp' with {loader: 'file'};

console.log(imagePath); // media/image-ULK2SIIB.webp
```

`base64` 로더는 파일을 인코딩된 문자열로 번들에 직접 포함한 뒤, 나중에 데이터 URL을 구성하는 데 사용할 때 유용합니다.

```ts
// @ts-expect-error TypeScript는 아직 어트리뷰트를 기반으로 타입을 제공할 수 없습니다.
import logo from './logo.png' with {loader: 'base64'};

console.log(logo); // "iVBORw0KGgoAAAANSUhEUgAA..."
```

`dataurl` 로더는 정적 리소스를 완전한 데이터 URL로 인라인으로 포함합니다.

```ts
// @ts-expect-error TypeScript는 아직 어트리뷰트를 기반으로 타입을 제공할 수 없습니다.
import icon from './icon.svg' with {loader: 'dataurl'};

console.log(icon); // "data:image/svg+xml;..."
```

위 코드 주석처럼 프로덕션 빌드에서는 장기 캐싱을 위해 경로에 해시가 자동으로 추가됩니다.

도움말: 개발 서버에서 `loader` 어트리뷰트로 Node.js 패키지의 파일을 import한다면, 개발 서버의 `prebundle` 옵션을 사용해서 해당 패키지를 사전 번들링에서 제외해야 합니다.

<!--
### Import/export conditions
-->

<a id="importexport-conditions"></a>

<a id="import-export-conditions"></a>

### import/export 조건

<!--
Projects may need to map certain import paths to different files based on the type of build.
This can be particularly useful for cases such as `ng serve` needing to use debug/development specific code but `ng build` needing to use code without any development features/information.
Several import/export [conditions](https://nodejs.org/api/packages.html#community-conditions-definitions) are automatically applied to support these project needs:

- For optimized builds, the `production` condition is enabled.
- For non-optimized builds, the `development` condition is enabled.
- For browser output code, the `browser` condition is enabled.

An optimized build is determined by the value of the `optimization` option.
When `optimization` is set to `true` or more specifically if `optimization.scripts` is set to `true`, then the build is considered optimized.
This classification applies to both `ng build` and `ng serve`.
In a new project, `ng build` defaults to optimized and `ng serve` defaults to non-optimized.

A useful method to leverage these conditions within application code is to combine them with [subpath imports](https://nodejs.org/api/packages.html#subpath-imports).
By using the following import statement:

```ts
import {verboseLogging} from '#logger';
```

The file can be switched in the `imports` field in `package.json`:

```json
{
  ...
  "imports": {
    "#logger": {
      "development": "./src/logging/debug.ts",
      "default": "./src/logging/noop.ts"
    }
  }
}
```

For applications that are also using SSR, browser and server code can be switched by using the `browser` condition:

```json
{
  ...
  "imports": {
    "#crashReporter": {
      "browser": "./src/browser-logger.ts",
      "default": "./src/server-logger.ts"
    }
  }
}
```

These conditions also apply to Node.js packages and any defined [`exports`](https://nodejs.org/api/packages.html#conditional-exports) within the packages.

HELPFUL: If currently using the `fileReplacements` build option, this feature may be able to replace its usage.
-->

프로젝트에서 빌드 종류에 따라 특정 import 경로를 서로 다른 파일에 연결해야 할 수 있습니다.
예를 들어 `ng serve`에서는 디버깅이나 개발 전용 코드를 사용하지만, `ng build`에서는 개발용 기능이나 정보가 없는 코드를 사용해야 할 때 유용합니다.
이런 요구사항을 지원하기 위해 다음 import/export [조건](https://nodejs.org/api/packages.html#community-conditions-definitions)이 자동으로 적용됩니다:

- 최적화된 빌드에는 `production` 조건을 활성화합니다.
- 최적화하지 않은 빌드에는 `development` 조건을 활성화합니다.
- 브라우저 빌드 결과물 코드에는 `browser` 조건을 활성화합니다.

빌드의 최적화 여부는 `optimization` 옵션 값으로 판단합니다.
`optimization`을 `true`로 설정하거나, 구체적으로 `optimization.scripts`를 `true`로 설정하면 최적화된 빌드로 간주합니다.
이 구분은 `ng build`와 `ng serve`에 모두 적용됩니다.
새 프로젝트에서 `ng build`는 기본적으로 최적화되며, `ng serve`는 기본적으로 최적화되지 않습니다.

애플리케이션 코드에서 이 조건을 유용하게 활용하는 방법은 [하위 경로 import](https://nodejs.org/api/packages.html#subpath-imports)와 결합하는 것입니다.
다음 import 문을 사용한다면:

```ts
import {verboseLogging} from '#logger';
```

`package.json`의 `imports` 필드에서 파일을 바꿀 수 있습니다:

```json
{
  ...
  "imports": {
    "#logger": {
      "development": "./src/logging/debug.ts",
      "default": "./src/logging/noop.ts"
    }
  }
}
```

SSR도 사용하는 애플리케이션은 `browser` 조건으로 브라우저 코드와 서버 코드를 전환할 수 있습니다:

```json
{
  ...
  "imports": {
    "#crashReporter": {
      "browser": "./src/browser-logger.ts",
      "default": "./src/server-logger.ts"
    }
  }
}
```

이 조건은 Node.js 패키지와 패키지에 정의된 [`exports`](https://nodejs.org/api/packages.html#conditional-exports)에도 적용됩니다.

도움말: 현재 `fileReplacements` 빌드 옵션을 사용한다면 이 기능으로 대체할 수 있을지도 모릅니다.

<!--
## Known Issues
-->

<a id="known-issues"></a>

## 알려진 문제

<!--
There are currently several known issues that you may encounter when trying the new build system. This list will be updated to stay current. If any of these issues are currently blocking you from trying out the new build system, please check back in the future as it may have been solved.
-->

새 빌드 시스템을 사용하면서 마주칠 수 있는 문제가 현재 몇 가지 알려져 있습니다.
이 목록은 최신 상태를 유지하도록 갱신됩니다.
이 문제 때문에 새 빌드 시스템을 사용하기 어렵다면 나중에 다시 확인해 주세요.
문제가 해결되었을 수도 있습니다.

<!--
### Type-checking of Web Worker code and processing of nested Web Workers
-->

<a id="type-checking-of-web-worker-code-and-processing-of-nested-web-workers"></a>

### 웹 워커 코드의 타입 검사와 중첩 웹 워커 처리

<!--
Web Workers can be used within application code using the same syntax (`new Worker(new URL('<workerfile>', import.meta.url))`) that is supported with the `browser` builder.
However, the code within the Worker will not currently be type-checked by the TypeScript compiler. TypeScript code is supported just not type-checked.
Additionally, any nested workers will not be processed by the build system. A nested worker is a Worker instantiation within another Worker file.
-->

애플리케이션 코드에서는 `browser` 빌더가 지원하는 것과 같은 문법(`new Worker(new URL('<workerfile>', import.meta.url))`)으로 웹 워커를 사용할 수 있습니다.
다만 현재 워커 내부의 코드는 TypeScript 컴파일러가 타입을 검사하지 않습니다.
TypeScript 코드를 지원하지만 타입 검사는 수행하지 않는다는 의미입니다.
또한 빌드 시스템은 중첩 워커를 처리하지 않습니다.
중첩 워커는 다른 워커 파일 안에서 생성한 워커 인스턴스를 말합니다.

<!--
### ESM default imports vs. namespace imports
-->

<a id="esm-default-imports-vs-namespace-imports"></a>

### ESM 기본 import와 네임스페이스 import

<!--
TypeScript by default allows default exports to be imported as namespace imports and then used in call expressions.
This is unfortunately a divergence from the ECMAScript specification.
The underlying bundler (`esbuild`) within the new build system expects ESM code that conforms to the specification.
The build system will now generate a warning if your application uses an incorrect type of import of a package.
However, to allow TypeScript to accept the correct usage, a TypeScript option must be enabled within the application's `tsconfig` file.
When enabled, the [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) option provides better alignment with the ECMAScript specification and is also recommended by the TypeScript team.
Once enabled, you can update package imports where applicable to an ECMAScript conformant form.

Using the [`moment`](https://npmjs.com/package/moment) package as an example, the following application code will cause runtime errors:

```ts
import * as moment from 'moment';

console.log(moment().format());
```

The build will generate a warning to notify you that there is a potential problem. The warning will be similar to:

```text
▲ [WARNING] Calling "moment" will crash at run-time because it's an import namespace object, not a function [call-import-namespace]

    src/main.ts:2:12:
      2 │ console.log(moment().format());
        ╵             ~~~~~~

Consider changing "moment" to a default import instead:

    src/main.ts:1:7:
      1 │ import * as moment from 'moment';
        │        ~~~~~~~~~~~
        ╵        moment

```

However, you can avoid the runtime errors and the warning by enabling the `esModuleInterop` TypeScript option for the application and changing the import to the following:

```ts
import moment from 'moment';

console.log(moment().format());
```
-->

TypeScript는 기본적으로 기본 내보내기(default export)를 네임스페이스 import로 가져온 뒤 호출 표현식에서 사용하는 것을 허용합니다.
하지만 이 동작은 ECMAScript 명세와 다릅니다.
새 빌드 시스템의 기반 번들러인 `esbuild`는 명세를 준수하는 ESM 코드를 기대합니다.
이제 빌드 시스템은 애플리케이션에서 패키지를 잘못된 import 방식으로 사용하면 경고를 표시합니다.
다만 TypeScript가 올바른 사용 방식을 허용하도록 애플리케이션의 `tsconfig` 파일에서 TypeScript 옵션을 활성화해야 합니다.
[`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) 옵션을 활성화하면 ECMAScript 명세에 더 부합하게 동작하며, TypeScript 팀도 이 옵션을 권장합니다.
옵션을 활성화한 뒤에는 해당 패키지의 import를 ECMAScript에 맞는 형식으로 변경할 수 있습니다.

[`moment`](https://npmjs.com/package/moment) 패키지를 예로 들면 다음 애플리케이션 코드는 실행 중 오류를 발생시킵니다:

```ts
import * as moment from 'moment';

console.log(moment().format());
```

빌드에서는 잠재적인 문제를 알리기 위해 다음과 비슷한 경고를 표시합니다:

```text
▲ [WARNING] Calling "moment" will crash at run-time because it's an import namespace object, not a function [call-import-namespace]

    src/main.ts:2:12:
      2 │ console.log(moment().format());
        ╵             ~~~~~~

Consider changing "moment" to a default import instead:

    src/main.ts:1:7:
      1 │ import * as moment from 'moment';
        │        ~~~~~~~~~~~
        ╵        moment

```

애플리케이션의 TypeScript 옵션 `esModuleInterop`을 활성화하고 import를 다음과 같이 변경하면 실행 중 오류와 경고를 피할 수 있습니다:

```ts
import moment from 'moment';

console.log(moment().format());
```

<!--
### Order-dependent side-effectful imports in lazy modules
-->

<a id="order-dependent-side-effectful-imports-in-lazy-modules"></a>

### 지연 로딩 모듈에서 순서에 의존하는 사이드 이펙트 import

<!--
Import statements that are dependent on a specific ordering and are also used in multiple lazy modules can cause top-level statements to be executed out of order.
This is not common as it depends on the usage of side-effectful modules and does not apply to the `polyfills` option.
This is caused by a [defect](https://github.com/evanw/esbuild/issues/399) in the underlying bundler but will be addressed in a future update.

IMPORTANT: Avoiding the use of modules with non-local side effects (outside of polyfills) is recommended whenever possible regardless of the build system being used and avoids this particular issue. Modules with non-local side effects can have a negative effect on both application size and runtime performance as well.
-->

특정 실행 순서에 의존하는 import 문을 여러 지연 로딩 모듈에서 사용하면 최상위 구문이 순서에 맞지 않게 실행될 수 있습니다.
사이드 이펙트가 있는 모듈을 사용하는 경우에 발생하므로 흔한 문제는 아니며, `polyfills` 옵션에는 적용되지 않습니다.
기반 번들러의 [결함](https://github.com/evanw/esbuild/issues/399)으로 발생하는 문제이며, 이후 업데이트에서 해결될 예정입니다.

중요: 사용하는 빌드 시스템과 관계없이, 가능하면 모듈 외부에 사이드 이펙트를 일으키는 모듈은 폴리필을 제외하고 사용하지 않는 것이 좋습니다.
그러면 이 문제도 피할 수 있습니다.
모듈 외부에 사이드 이펙트를 일으키는 모듈은 애플리케이션 크기와 실행 성능에도 부정적인 영향을 줄 수 있습니다.

<!--
### Output location changes
-->

<a id="output-location-changes"></a>

### 빌드 결과물 위치 변경

<!--
By default, after a successful build by the application builder the bundle is located in a `dist/<project-name>/browser` directory (instead of `dist/<project-name>` for the browser builder).
This might break some of the toolchains that rely the previous location. In this case, you can [configure the output path](reference/configs/workspace-config#output-path-configuration) to suit your needs.
-->

기본적으로 application 빌더로 빌드가 성공하면 번들은 `dist/<project-name>/browser` 디렉터리에 생성됩니다(browser 빌더의 결과물 위치는 `dist/<project-name>`입니다).
기존 위치에 의존하는 일부 도구 모음은 이 변경 때문에 제대로 동작하지 않을 수 있습니다.
이 경우 필요에 맞게 [빌드 결과물 경로 설정](reference/configs/workspace-config#output-path-configuration)할 수 있습니다.

<!--
## Bug reports
-->

<a id="bug-reports"></a>

## 버그 제보

<!--
Report issues and feature requests on [GitHub](https://github.com/angular/angular-cli/issues).

Please provide a minimal reproduction where possible to aid the team in addressing issues.
-->

문제와 기능 요청은 [GitHub](https://github.com/angular/angular-cli/issues)에 등록해 주세요.

팀이 문제를 해결하는 데 도움이 되도록 가능하면 최소한의 재현 예제를 제공해 주세요.
