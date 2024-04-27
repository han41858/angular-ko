<!--
# Getting started with the Angular CLI's new build system
-->
# Angular CLI에 새롭게 도입된 빌드 시스템

<!--
In v17 and higher, the new build system provides an improved way to build Angular applications. This new build system includes:

- A modern output format using ESM, with dynamic import expressions to support lazy module loading.
- Faster build-time performance for both initial builds and incremental rebuilds.
- Newer JavaScript ecosystem tools such as [esbuild](https://esbuild.github.io/) and [Vite](https://vitejs.dev/).
- Integrated SSR and prerendering capabilites

This new build system is stable and fully supported for use with Angular applications.
You can migrate to the new build system with applications that use the `browser` builder.
If using a custom builder, please refer to the documentation for that builder on possible migration options.

<div class="alert is-important">

The existing Webpack-based build system is still considered stable and fully supported.
Applications can continue to use the `browser` builder and will not be automatically migrated when updating.

</div>
-->
Angular는 v17 버전부터 이전보다 개선된 빌드 시스템을 사용합니다.
새 빌드 시스템은 이런 점이 더 좋습니다:

- 최신 ESM 형식을 사용합니다. 모듈을 동적으로 로딩할 수 있기 때문에 지연 로딩도 할 수 있습니다.
- 최초 빌드나 증분 빌드 모두 빌드 시간이 짧아졌습니다.
- [esbuild](https://esbuild.github.io/)나 [Vite](https://vitejs.dev/)와 같은 최신 JavaScript 툴을 도입했습니다.
- SSR, 사전 렌더링 기능을 통합했습니다.

새롭게 도입한 빌드 시스템은 Angular 애플리케이션과 완벽하게 호환되며 안정적입니다.
그래서 기존에 `browser` 빌더를 사용하던 애플리케이션은 새 빌드 시스템으로 간단하게 마이그레이션할 수 있습니다.
커스텀 빌더를 사용하는 애플리케이션이라면 해당 빌더 문서를 참고해서 마이그레이션해 보세요.

<div class="alert is-important">

기존에 사용하던 Webpack 기반의 빌드 시스템도 여전히 안정적이고 지원을 계속합니다.
`browser` 빌더는 계속 사용할 수 있으며, Angular 버전을 업데이트한다고 해도 자동으로 마이그레이션되지 않습니다.

</div>



<!--
## For new applications
-->
## 새 애플리케이션이라면

<!--
New applications will use this new build system by default via the `application` builder.
-->
애플리케이션을 새로 생성하면 `application` 빌더라는 새 빌드 시스템이 사용됩니다.


<!--
## For existing applications
-->
## 이전 버전으로 만든 애플리케이션이라면

<!--
For existing projects, you can opt-in to use the new builder on a per-application basis with two different options.
Both options are considered stable and fully supported by the Angular team.
The choice of which option to use is a factor of how many changes you will need to make to migrate and what new features you would like to use in the project.

Builder | Configuration Changes | Code Changes | Integrated SSR |
| :----- | :-------- | :------ | :------- |
| `application` | Multiple option changes required. If using SSR, additional targets will need to be updated. | Yes, if using SSR | Yes
| `browser-esbuild` | builder name only | No* | No

The `application` builder is generally preferred as it improves server-side rendered (SSR) builds, and makes it easier for client-side rendered projects to adopt SSR in the future.
However it requires a little more migration effort, particularly for existing SSR applications.
If the `application` builder is difficult for your project to adopt, `browser-esbuild` can be an easier solution which gives most of the build performance benefits with fewer breaking changes.
-->
기존에 만들어 둔 프로젝트라면 애플리케이션에 2가지 옵션 중 하나를 선택하는 방법으로 새 빌더를 적용할 수 있습니다.
어떤 옵션을 사용하더라도 두 방식 모두 Angular 팀이 관리하며 안정성을 보장합니다.
마이그레이션 과정을 진행하면서 얼마나 많은 코드를 수정할 지, 새로운 버전에 도입된 기능을 프로젝트에 얼마나 도입할지를 기준으로 두 옵션 중 하나를 선택하면 됩니다.

| 빌더 | 환경설정 변경 | 코드 변경 | 통합 SSR |
| :----- | :-------- | :------ | :------- |
| `application` | 옵션을 여러개 변경해야 합니다. SSR을 사용한다면 변경사항이 추가될 수 있습니다. | SSR을 사용한다면 필요 | 가능
| `browser-esbuild` | 빌더 이름만 변경 | 없음* | 불가

`application` 빌더는 일반적으로 서버-사이드 렌더링(Server-side rendered, SSR) 기능을 활용하고 있거나 앞으로 SSR을 도입할 예정이 있을 때 선택하면 좋습니다.
하지만 이 빌더를 사용하려면 더 많은 코드를 수정해야 할 수 있습니다.
프로젝트에 `application` 빌더를 도입하기 어려운 경우라면 `browser-esbuild`를 사용하는 것도 고려할 만 합니다.
`browser-esbuild` 빌더를 사용하면 빌드 설정을 크게 변경하지 않아도 새로운 빌드 시스템을 도입할 수 있습니다.


<!--
### Using the `browser-esbuild` builder
-->
### `browser-esbuild` 빌더 사용하기

<!--
A builder named `browser-esbuild` is available within the `@angular-devkit/build-angular` package that is present in an Angular CLI generated application. The builder is a drop-in replacement for the existing `browser` builder that provides the preexisting browser application build system.

The compatiblity option was implemented to minimize the amount of changes necessary to initially migrate your applications.
This is provided via an alternate builder (`browser-esbuild`).
You can update the `build` target for any application target to migrate to the new build system.

The following is what you would typically find in `angular.json` for an application:

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
</code-example>

Changing the `builder` field is the only change you will need to make.

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
...
</code-example>
-->
`browser-esbuild` 빌더는 Angular CLI로 애플리케이션을 생성했다면 기본으로 설치되는 `@angular-devkit/build-angular` 패키지로 제공됩니다.
이 빌더는 v17 이전 버전까지 사용하던 `browser` 빌더를 완전히 대체합니다.

이 빌더는 애플리케이션 마이그레이션 과정에 필요한 변경사항을 최소화하기 위해 호환성 옵션을 제공합니다.
`browser-esbuild`라는 이름에도 이 빌더는 기존 빌더를 대체하는 의미를 담고 있습니다.
애플리케이션에 새 빌드 시스템을 적용하려면 `build` 대상을 변경하면 됩니다.

애플리케이션 빌드 설정 파일 `angular.json`이 원래 이렇게 작성되어 있다고 합시다:

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
</code-example>

이 설정 파일에서 `builder` 필드를 아래와 같이 변경하면 됩니다.

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
...
</code-example>


<!--
### Using the `application` builder
-->
### `application` 빌더 사용하기

<!--
A builder named `application` is also available within the `@angular-devkit/build-angular` package that is present in an Angular CLI generated application.
This builder is the default for all new applications created via `ng new`.

The following is what you would typically find in `angular.json` for an application:

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
</code-example>

Changing the `builder` field is the first change you will need to make.

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
...
</code-example>

Once the builder name has been changed, options within the `build` target will need to be updated.
The following table lists all the `browser` builder options that will need to be adjusted or removed.

| `browser` Option | Action | Notes |
| :-------------- | :----- | :----- |
| `main` | rename option to `browser` | |
| `polyfills` | convert value to an array | may already have been migrated | 
| `buildOptimizer` | remove option |
| `resourcesOutputPath` | remove option | always `media` |
| `vendorChunk` | remove option |
| `commonChunk` | remove option |
| `deployUrl`   | remove option | 
| `ngswConfigPath` | move value to `serviceWorker` and remove option | `serviceWorker` is now either `false` or a configuration path


If the application is not using SSR currently, this should be the final step to allow `ng build` to function.
After executing `ng build` for the first time, there may be new warnings or errors based on behavioral differences or application usage of Webpack-specific features.
Many of the warnings will provide suggestions on how to remedy that problem.
If it appears that a warning is incorrect or the solution is not apparent, please open an issue on [GitHub](https://github.com/angular/angular-cli/issues).
Also, the later sections of this guide provide additional information on several specific cases as well as current known issues.

For applications new to SSR, the [Angular SSR Guide](/guide/ssr) provides additional information regarding the setup process for adding SSR to an application.

For applications that are already using SSR, additional manual adjustments will be needed to update the application server to support the new integrated SSR capabilities.
The `application` builder now provides the integrated functionality for all of the following preexisting builders:

* `app-shell`
* `prerender`
* `server`
* `ssr-dev-server`

The `ng update` process will automatically remove usages of the `@nguniversal` scope packages where some of these builders were previously located.
The new `@angular/ssr` package will also be automatically added and used with configuration and code being adjusted during the update.
The `@angular/ssr` package supports the `browser` builder as well as the `application` builder.
To convert from the separate SSR builders to the integrated capabilities of the `application` builder, there are several required manual steps.
However, as each application is different, there may be more application specific changes needed beyond these to complete the process.

1. Combine the options for the above mentioned SSR builders into the `application` builder options within the `angular.json` file.
The previously used builders and their target configurations can then be fully removed from the file.
2. Combine server TypeScript configuration from `tsconfig.server.json` into `tsconfig.app.json`.
The `types` and `files` options are typically the only setting that needs to be combined but others may be needed based on application specific customizations.
You should also add the TypeScript option `"esModuleInterop": true` to ensure `express` imports are [ESM compliant](#esm-default-imports-vs-namespace-imports).
The `tsconfig.server.json` can then be removed as it will no longer be used during builds.
3. Remove and/or update any `npm` scripts referencing the now removed builder targets.
The `ng build` and `ng serve` commands provide equivalent functionality when using the `application` builder.
4. Update application server code to remove Webpack specific elements.
5. Update application server code to use new bootstrapping and output directory structure.
An example of the changes for a v16 project that has been converted can be found [here](https://github.com/alan-agius4/angular-cli-use-application-builder/commit/1defdb93a7f508662bc427439e51505668bf84cd#diff-1ba718c1eb8aa39cd20c2562d92523068c734d75f54655e97d652b992d9b4259).
6. Remove any CommonJS assumptions in the application server code such as `require`, `__filename`, `__dirname`, or other constructs from the [CommonJS module scope](https://nodejs.org/api/modules.html#the-module-scope).
All application code should be ESM compatible.
This does not apply to third-party dependencies.

In the future, a schematic will make this migration process easier for existing applications.
-->
`application` 빌더도 Angular CLI로 애플리케이션을 생성했다면 기본으로 설치되는 `@angular-devkit/build-angular` 패키지로 제공됩니다.
Angular v17 버전부터 `ng new`로 애플리케이션을 생성하면 이 빌더가 기본 빌더입니다.

이전 버전에서 만든 Angular 애플리케이션의 설정 파일 `angular.json`에는 이런 내용이 있습니다:

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
</code-example>

`application` 빌더를 사용하려면 이 설정 파일에서 `builder` 필드를 바꾸는 것부터 시작합니다.

<code-example language="json" hideCopy="true">
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
...
</code-example>

빌더 이름을 변경하고 나면 `build` 대상에 지정한 옵션도 변경해야 합니다.
아래 표를 보면서 `browser` 빌더일 때 사용하던 옵션을 어떻게 변경해야 하는지 확인해 보세요.

| `browser` 옵션 | 필요한 작업 | 설명 |
| :-------------- | :----- | :----- |
| `main` | `browser`로 변경 | |
| `polyfills` | 배열로 변경 | 이미 마이그레이션되었을 수 있습니다. | 
| `buildOptimizer` | 제거 |
| `resourcesOutputPath` | 제거 | 언제나 `media` 를 사용합니다. |
| `vendorChunk` | 제거 |
| `commonChunk` | 제거 |
| `deployUrl`   | 제거 | 
| `ngswConfigPath` | `serviceWorker`로 변경, 제거 | `serviceWorker`에는 `false` 값이나 경로를 지정합니다. |

애플리케이션이 SSR을 사용하지 않는다면 여기까지 작업하고 `ng build`를 실행해 볼 수 있습니다.
설정을 변경하고 `ng build`를 처음 식행하면 Webpack 기반 빌더와 다른 부분 때문에 경고나 에러가 발생할 수 있습니다.
이 경고 대부분은 경고와 함께 제공되는 해결방법을 사용하면 없앨 수 있습니다.
경고가 잘못 검출되거나 해결방법이 명확하지 않은 경우라면 [GitHub](https://github.com/angular/angular-cli/issues)에 이슈를 남겨주세요.
이후 섹션에서는 이 중 몇가지 경우에 대해 자세하게 알아봅시다.

애플리케이션에 SSR을 처음 적용하는 경우라면 [Angular SSR 가이드](/guide/ssr) 문서에서 더 자세한 내용을 확인할 수 있습니다.

이미 SSR이 적용된 애플리케이션이라면 새롭게 통합된 SSR 기능을 적용하기 위해 몇가지 설정을 추가로 해야 합니다.
`application` 빌더는 기존 빌더에서 제공하던 아래 기능들을 모두 지원합니다:

* `app-shell`
* `prerender`
* `server`
* `ssr-dev-server`

`ng update` 명령을 실행하면 Angular CLI는 기존에 사용하던 `@nguniversal` 관련 패키지를 자동으로 제거합니다.
그리고 새롭게 추가된 `@angular/ssr` 패키지가 자동으로 추가되며, 환경설정과 관련 코드도 자동으로 수정됩니다.
`@angular/ssr` 패키지는 `browser` 빌더와 `application` 빌더를 모두 지원합니다.
SSR 빌더를 별도로 사용하고 있다가 `application` 빌더로 변경하려면 몇단계 작업을 수동으로 해야 합니다.
여기에 애플리케이션이 제공하는 기능에 따라 추가 작업이 더 필요할 수도 있습니다.

1. 위에서 언급한 SSR 빌더 설정을 `angular.json` 파일에 적용합니다.
이전 빌더와 관련된 설정은 모두 제거해야 합니다.
2. 서버 TypeScript 설정파일 `tsconfig.server.json`을 `tsconfig.app.json`와 통합합니다.
보통은 `types` 옵션과 `files` 옵션만 정리하면 되지만, 활용하는 기능에 따라 다른 옵션을 조정해야 할 수 있습니다.
그리고 `express`를 [ESM 규격](#esm-default-imports-vs-namespace-imports)으로 로드하기 위해 TypeScript 옵션 `"esModuleInterop": true`를 추가해야 합니다.
이 단계가 끝나면 `tsconfig.server.json` 파일은 사용하지 않기 때문에 제거해도 됩니다.
3. 제거된 빌드 대상을 참조하는 `npm` 스크립트를 제거하거나 수정합니다.
`application` 빌더를 사용하면 `ng build` 명령과 `ng serve` 명령은 동일하게 동작합니다.
4. 서버쪽 코드에서 Webpack 관련 코드를 제거합니다.
5. 서버쪽 코드에서 부트스트랩 코드와 빌드 결과물이 생성될 폴더를 수정합니다.
v16 버전으로 생성한 프로젝트라면 [이 파일](https://github.com/alan-agius4/angular-cli-use-application-builder/commit/1defdb93a7f508662bc427439e51505668bf84cd#diff-1ba718c1eb8aa39cd20c2562d92523068c734d75f54655e97d652b992d9b4259)을 참고하세요.
6. 서버쪽 코드에서 `require`, `__filename`, `__dirname`과 같이 CommonJS 관련 코드를 제거합니다.
[CommonJS 모듈 스코프](https://nodejs.org/api/modules.html#the-module-scope)를 참고하세요.
결국 애플리케이션의 자체 코드는 모두 ESM과 호환되어야 합니다.
서드 파티 의존성 패키지들은 그렇지 않아도 됩니다.

앞으로는 스키매틱을 활용해서 마이그레이션 과정을 더 편하게 개선할 예정입니다.


<!--
## Executing a build
-->
## 빌드하기

<!--
Once you have updated the application configuration, builds can be performed using the `ng build` as was previously done.
Depending on the choice of builder migration, some of the command line options may be different.
If the build command is contained in any `npm` or other scripts, ensure they are reviewed and updated.
For applications that have migrated to the `application` builder and that use SSR and/or prererending, you also may be able to remove extra `ng run` commands from scripts now that `ng build` has integrated SSR support.

<code-example language="shell">

ng build

</code-example>
-->
애플리케이션 환경설정을 변경했으면 이전처럼 `ng build` 명령을 실행해서 애플리케이션을 빌드할 수 있습니다.
이 때 마이그레이션한 빌더에 따라 빌드 명령에 사용하는 옵션은 다를 수 있습니다.
빌드 명령에 `npm` 명령이나 다른 스크립트가 사용된다면 제대로 실행되는지 반드시 확인하고 수정하세요.
SSR이나 사전 렌더링을 활용하기 위해 `application` 빌더로 마이그레이션 한 애플리케이션이라면, 이 빌더는 `ng build` 명령을 실행할 때 SSR을 통합 기능으로 지원하기 때문에 `ng run` 명령을 제거해도 됩니다.

<code-example language="shell">

ng build

</code-example>


<!--
## Starting the development server
-->
## 개발서버 실행하기

<!--
The development server will automatically detect the new build system and use it to build the application.
To start the development server no changes are necessary to the `dev-server` builder configuration or command line.

<code-example language="shell">

ng serve

</code-example>

You can continue to use the [command line options](/cli/serve) you have used in the past with the development server.

<div class="alert is-important">

JavaScript-based Hot Module Replacement (HMR) is currently not supported.
However, global stylesheet (`styles` build option) HMR is available and enabled by default.
Angular focused HMR capabilities are currently planned and will be introduced in a future version.

</div>
-->
개발 서버는 새롭게 도입된 빌드 시스템을 자동으로 검출해서 애플리케이션을 빌드합니다.
개발 서버를 실행하려면 `dev-server` 빌더 변경없이 아래 명령을 실행하면 됩니다.

<code-example language="shell">

ng serve

</code-example>

이전에 개발 서버를 실행할 때 활용했던 [커맨드라인 옵션](/cli/serve)도 그대로 사용할 수 있습니다.

<div class="alert is-important">

JavaScript 기반의 핫 모듈 대체(Hot Module Replacement, HMR)는 현재 지원하지 않습니다.
하지만 전역 스타일시트(`styles`) HMR은 사용할 수 있습니다.
Angular 팀은 HMR 적용범위 확대 계획을 준비하고 있으며 이후 버전에 도입될 예정입니다.

</div>


<!--
## Unimplemented options and behavior
-->
## 구현되지 않은 옵션, 기능

<!--
Several build options are not yet implemented but will be added in the future as the build system moves towards a stable status. If your application uses these options, you can still try out the build system without removing them. Warnings will be issued for any unimplemented options but they will otherwise be ignored. However, if your application relies on any of these options to function, you may want to wait to try.

- [WASM imports](https://github.com/angular/angular-cli/issues/25102) -- WASM can still be loaded manually via [standard web APIs](https://developer.mozilla.org/en-US/docs/WebAssembly/Loading_and_running).

Building libraries with the new build system via `ng-packagr` is also not yet possible but library build support will be available in a future release.
-->
빌드 옵션 중 일부는 아직 구현되지 않았지만, 빌드 시스템이 안정됨에 따라 이후 버전에 추가될 예정입니다.
아직 제공되지 않는 옵션을 사용한다면 해당 옵션을 제거하지 않아도 새 빌드 시스템으로 전환할 수 있으며, 이 경우에는 경고가 표시될 수 있습니다.
지원하지 않는 기능이 애플리케이션 동작에 필요하다면 해당 기능이 준비될 때까지 빌더 전환은 기다려 주세요.

- [WASM 불러오기](https://github.com/angular/angular-cli/issues/25102) -- WASM는 아직 [표준 웹 API](https://developer.mozilla.org/en-US/docs/WebAssembly/Loading_and_running)를 사용해서 수동으로 로드해야 합니다.

`ng-packagr`로 라이브러리를 빌드하는 기능도 아직 준비중입니다.


<a id="esm-default-imports-vs-namespace-imports"></a>
<!--
## ESM default imports vs. namespace imports
-->
## ESM 기본 불러오기 vs. 네임스페이스로 불러오기

<!--
TypeScript by default allows default exports to be imported as namespace imports and then used in call expressions. This is unfortunately a divergence from the ECMAScript specification. The underlying bundler (`esbuild`) within the new build system expects ESM code that conforms to the specification. The build system will now generate a warning if your application uses an incorrect type of import of a package. However, to allow TypeScript to accept the correct usage, a TypeScript option must be enabled within the application's `tsconfig` file. When enabled, the [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) option provides better alignment with the ECMAScript specification and is also recommended by the TypeScript team. Once enabled, you can update package imports where applicable to an ECMAScript conformant form.

Using the [`moment`](https://npmjs.com/package/moment) package as an example, the following application code will cause runtime errors:

```ts
import * as moment from 'moment';

console.log(moment().format());
```

The build will generate a warning to notify you that there is a potential problem. The warning will be similar to:

<code-example format="shell" language="shell" hideCopy="true">
▲ [WARNING] Calling "moment" will crash at run-time because it's an import namespace object, not a function [call-import-namespace]

    src/main.ts:2:12:
      2 │ console.log(moment().format());
        ╵             ~~~~~~

Consider changing "moment" to a default import instead:

    src/main.ts:1:7:
      1 │ import * as moment from 'moment';
        │        ~~~~~~~~~~~
        ╵        moment

</code-example>

However, you can avoid the runtime errors and the warning by enabling the `esModuleInterop` TypeScript option for the application and changing the import to the following:

```ts
import moment from 'moment';

console.log(moment().format());
```
-->
TypeScript는 `default`로 모듈 외부로 공개한 심볼을 네임스페이스로 불러올 수 있습니다.
하지만 불행히도 이 방식은 ECMAScript 스펙과 충돌합니다.
새로 도입된 `esbuild` 기반 빌드 시스템은 ESM 코드로 작성해야 합니다.
빌더를 새로운 방식으로 전환하고 나면 패키지를 잘못된 방식으로 불러왔을 때 경고 메시지가 표시될 수 있습니다.
이 때 TypeScript 관점에서 새로운 방식을 적용하려면 `tsconfig` 파일에 TypeScript 옵션 중 [`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop) 옵션을 활성화해야 합니다.
이 옵션을 활성화하고 나면 ECMAScript 스펙에 적합하게 코드를 작성할 수 있기 때문에 TypeScript 팀도 권장하는 옵션입니다.
이 옵션을 활성화하고 나면 ECMAScript 방식으로 패키지를 불러올 수 있습니다.

[`moment`](https://npmjs.com/package/moment) 패키지를 사용하는 경우를 예로 들면, 아래 코드는 실행시점에 에러가 발생합니다:

```ts
import * as moment from 'moment';

console.log(moment().format());
```

이런 경고가 표시될 것입니다:

<code-example format="shell" language="shell" hideCopy="true">
▲ [WARNING] Calling "moment" will crash at run-time because it's an import namespace object, not a function [call-import-namespace]

    src/main.ts:2:12:
      2 │ console.log(moment().format());
        ╵             ~~~~~~

Consider changing "moment" to a default import instead:

    src/main.ts:1:7:
      1 │ import * as moment from 'moment';
        │        ~~~~~~~~~~~
        ╵        moment

</code-example>

이제 `esModuleInterop` 옵션을 활성화하고 나면 애플리케이션 코드를 다음과 같이 변경하면 됩니다:

```ts
import moment from 'moment';

console.log(moment().format());
```


<!--
## Vite as a development server
-->
## Vite를 개발 서버로 활용하기

<!--
The usage of Vite in the Angular CLI is currently only within a _development server capacity only_. Even without using the underlying Vite build system, Vite provides a full-featured development server with client side support that has been bundled into a low dependency npm package. This makes it an ideal candidate to provide comprehensive development server functionality. The current development server process uses the new build system to generate a development build of the application in memory and passes the results to Vite to serve the application. The usage of Vite, much like the Webpack-based development server, is encapsulated within the Angular CLI `dev-server` builder and currently cannot be directly configured.
-->
아직은 Angular CLI가 제공하는 기능 중 _개발 서버 부분만_ Vite를 활용합니다.
Vite는 npm 패키지 종속성이 낮기 때문에 Vite의 빌드 시스템을 온전히 이해하지 못해도 개발 서버를 간편하게 사용할 수 있습니다.
이 점은 Angular 팀이 통합 개발 서버를 고려할 때 적합하다고 생각한 점이었습니다.
새롭게 도입된 개발 서버는 애플리케이션을 빌드해서 메모리에 로드하며 이 결과를 Vite를 통해 제공합니다.
이 때 Vite가 활용되는 방식은 Webpack 기반의 개발 서버를 사용했을 때와 마찬가지로 Angular CLI `dev-server` 빌더 안에 캡슐화되어 있기 때문에 내부 설정을 직접 변경할 수는 없습니다.


<!--
## Known Issues
-->
## 알려진 이슈

<!--
There are currently several known issues that you may encounter when trying the new build system. This list will be updated to stay current. If any of these issues are currently blocking you from trying out the new build system, please check back in the future as it may have been solved.
-->
새 빌드 시스템으로 전환할 때 만날 수 있는 이슈가 몇가지 있습니다.
이 목록은 계속 업데이트될 예정이기 때문에, 아래 이슈 때문에 새 빌드 시스템으로 전환할 수 없다면 문제가 해결되는 이후 버전을 기다려 주세요.


<!--
### Type-checking of Web Worker code and processing of nested Web Workers
-->
### 웹 워커의 타입 검사, 중첩된 웹 워커 처리

<!--
Web Workers can be used within application code using the same syntax (`new Worker(new URL('<workerfile>', import.meta.url))`) that is supported with the `browser` builder.
However, the code within the Worker will not currently be type-checked by the TypeScript compiler. TypeScript code is supported just not type-checked.
Additionally, any nested workers will not be processed by the build system. A nested worker is a Worker instantiation within another Worker file.
-->
웹 워커는 `new Worker(new URL('<workerfile>', import.meta.url))`와 같은 문법으로 애플리케이션 코드에 사용할 수 있지만, 이 방식은 `browser` 빌더를 염두에 두고 제공되던 것입니다.
하지만 Worker 내부 코드는 TypeScript 컴파일러가 타입을 검사하지 않습니다.
그리고 워커가 또다른 워커를 생성하는 중첩된 워커도 아직 처리하지 않습니다.


<!--
### Order-dependent side-effectful imports in lazy modules
-->
### 순서가 정해진 모듈이나 지연 로딩되는 모듈

<!--
Import statements that are dependent on a specific ordering and are also used in multiple lazy modules can cause top-level statements to be executed out of order.
This is not common as it depends on the usage of side-effectful modules and does not apply to the `polyfills` option.
This is caused by a [defect](https://github.com/evanw/esbuild/issues/399) in the underlying bundler but will be addressed in a future update.

<div class="alert is-important">

Avoiding the use of modules with non-local side effects (outside of polyfills) is recommended whenever possible regardless of the build system being used and avoids this particular issue. Modules with non-local side effects can have a negative effect on both application size and runtime performance as well.

</div>
-->
모듈을 정해진 순서로 불러와야 하거나 지연 로딩하는 경우에는 예상치 못한 순서로 코드가 실행될 수 있습니다.
이렇게 동작하는 것은 [esbuild의 오류](https://github.com/evanw/esbuild/issues/399) 때문에 발생하는 것이며, 이후 업데이트에서 해결될 예정입니다.


<!--
## Bug reports
-->
## 버그 제보

<!--
Report issues and feature requests on [GitHub](https://github.com/angular/angular-cli/issues).

Please provide a minimal reproduction where possible to aid the team in addressing issues.
-->
이슈가 있거나 요청하고 싶은 기능이 있다면 [GitHub](https://github.com/angular/angular-cli/issues)를 활용해 주세요.

이슈를 재현할 수 있는 코드를 첨부해 주시면 더 좋습니다.