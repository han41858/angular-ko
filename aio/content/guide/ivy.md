# Angular Ivy

<!--
Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7).
With the version 9 release of Angular, the new compiler and runtime instructions are used by default instead of the older compiler and runtime, known as View Engine.

<div class="alert is-helpful">

Learn more about the [Compiler](https://www.youtube.com/watch?v=anphffaCZrQ) and [Runtime](https://www.youtube.com/watch?v=S0o-4yc2n-8) in these videos from our team.


</div>
-->
Ivy는 Angular의 [다음 세대 컴파일러이자 렌더링 파이프라인](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7)의 코드 네임 입니다.
이 렌더링 엔진은 Angular 9 버전부터 이전에 사용하던 View Engine을 대신해서 사용되고 있습니다.


<div class="alert is-helpful">

Angular 팀이 [컴파일러](https://www.youtube.com/watch?v=anphffaCZrQ)와 [실행환경](https://www.youtube.com/watch?v=S0o-4yc2n-8)에 대해 설명한 영상도 확인해 보세요.

</div>


{@a aot-and-ivy}
<!--
## AOT and Ivy
-->
## AOT와 Ivy

<!--
AOT compilation with Ivy is faster and should be used by default.
In the `angular.json` workspace configuration file, set the default build options for your project to always use AOT compilation.
When using application internationalization (i18n) with Ivy, [translation merging](guide/i18n#merge) also requires the use of AOT compilation.
-->
Ivy로 AOT 컴파일하는 것은 이전 View Engine을 사용하던 것보다 훨씬 빠릅니다.
워크스페이스 환경설정 파일 `angular.json`에서 AOT 컴파일에 적용할 컴파일러를 지정할 수 있습니다.
이 때 애플리케이션에서 국제화(Internationalization, i18n)을 사용한다면 [번역파일 합치기](guide/i18n#merge) 옵션을 추가로 지정해야 할 수도 있습니다.

<code-example language="json" header="angular.json">

{
  "projects": {
    "my-existing-project": {
      "architect": {
        "build": {
          "options": {
            ...
            "aot": true,
          }
        }
      }
    }
  }
}
</code-example>

<!--
## Ivy and libraries
-->
## Ivy와 라이브러리

<!--
Ivy applications can be built with libraries that were created with the View Engine compiler.
This compatibility is provided by a tool known as the Angular compatibility compiler (`ngcc`).
CLI commands run `ngcc` as needed when performing an Angular build.

For more information on how to publish libraries see [Publishing your Library](guide/creating-libraries#publishing-your-library).
-->
이전까지 View Engine 컴파일러로 만들던 라이브러리는 이제 Ivy 라이브러리로 만들 수 있습니다.
Ivy 라이브러리는 View Engine으로 실행되는 애플리케이션과 호환됩니다.
Angular 호환성 컴파일러(`ngcc`) 덕분입니다.
추가 빌드가 필요하다면 Angular CLI로 `ngcc` 명령을 실행하면 됩니다.

라이브러리를 어떻게 배포하는지 알아보려면 [라이브러리 배포하기](guide/creating-libraries#publishing-your-library) 문서를 참고하세요.


{@a maintaining-library-compatibility}
<!--
### Maintaining library compatibility
-->
### 라이브러리 호환성 유지하기

<!--
If you are a library author, you should keep using the View Engine compiler as of version 9.
By having all libraries continue to use View Engine, you will maintain compatibility with default v9 applications that use Ivy, as well as with applications that have opted to continue using View Engine.

See the [Creating Libraries](guide/creating-libraries) guide for more on how to compile or bundle your Angular library.
When you use the tools integrated into the Angular CLI or `ng-packagr`, your library will always be built the right way automatically.
-->
라이브러리 개발자라면 Angular 9 버전까지 지원되던 View Engine 컴파일러를 사용해야 합니다.
라이브러리가 View Engine를 사용한다면 애플리케이션이 Ivy를 사용하더라도 호환성이 유지됩니다.

Angular 라이브러리르 만들고 배포하는 방법에 대해 알아보려면 [라이브러리 만들기](guide/creating-libraries) 문서를 참고하세요.
라이브러리를 Angular CLI나 `ng-packagr`로 빌드한다면 항상 적절한 방식으로 라이브러리가 빌드될 것입니다.


{@a ivy-and-universal-app-shell}
<!--
## Ivy and Universal/App shell
-->
## Ivy와 Universal/앱 기본 코드

<!--
In version 9, the server builder which is used for [App shell](guide/app-shell) and [Angular Universal](guide/universal) has the `bundleDependencies` option enabled by default.
If you opt-out of bundling dependencies you will need to run the standalone Angular compatibility compiler (`ngcc`). This is needed because otherwise Node will be unable to resolve the Ivy version of the packages.

You can run `ngcc` after each installation of node_modules by adding a `postinstall` [npm script](https://docs.npmjs.com/misc/scripts):

<code-example language="json" header="package.json">
{
  "scripts": {
    "postinstall": "ngcc"
  }
}
</code-example>

<div class="alert is-important">

 * The `postinstall` script will run on every installation of `node_modules`, including those performed by `ng update` and `ng add`.
 * Don't use `--create-ivy-entry-points` as this will cause Node not to resolve the Ivy version of the packages correctly.
 
</div>
-->
Angular 9 버전부터는 [앱 기본 코드](guide/app-shell)와 [Angular Universal](guide/universal)에 사용되는 서버 빌더가 `bundleDependencies`에 기본으로 포함됩니다.
그리고 Node 환경에서 Ivy 버전이나 패키지를 확인할 수 없는 상황에서는 Angular 호환성 컴파일러 `ngcc`를 직접 실행할 수도 있습니다.

npm 패키지를 설치한 이후에 `ngcc`를 자동으로 실행하려면 `postinstall` [npm 스크립트](https://docs.npmjs.com/misc/scripts)를 추가하면 됩니다:

<code-example language="json" header="package.json">
{
  "scripts": {
    "postinstall": "ngcc"
  }
}
</code-example>


<div class="alert is-important">

* `postinstall` 스크립트는 `node_modules`에 패키지가 설치된 이후에 매번 실행되며, `ng update`나 `ng add`가 실행된 이후에도 실행됩니다.

* `--create-ivy-entry-points` 옵션은 사용하지 마세요. 이 옵션을 사용하면 Node 환경에서 Ivy 버전과 패키지를 제대로 인식할 수 없습니다.
 
</div>


{@a opting-out-of-angular-ivy}
{@a opting-out-of-ivy-in-version-9}
<!--
## Opting out of Ivy in version 9
-->
## Angular 9 버전에서 Ivy 제거하기

<!--
In version 9, Ivy is the default.
For compatibility with current workflows during the update process, you can choose to opt out of Ivy and continue using the previous compiler, View Engine.

<div class="alert is-helpful">

Before disabling Ivy, check out the debugging recommendations in the [Ivy Compatibility Guide](guide/ivy-compatibility#debugging).

</div>

To opt out of Ivy, change the `angularCompilerOptions` in your project's TypeScript configuration, most commonly located at `tsconfig.app.json` at the root of the workspace.

The value of the `enableIvy` flag is set to `true` by default, as of version 9.

The following example shows how to set the `enableIvy` option to `false` in order to opt out of Ivy.

<code-example language="json" header="tsconfig.app.json">
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
</code-example>

<div class="alert is-important">

If you disable Ivy, you might also want to reconsider whether to make AOT compilation the default for your application development, as described [above](#aot-and-ivy).

To revert the compiler default, set the build option `aot: false` in the `angular.json` configuration file.

</div>

If you disable Ivy and the project uses internationalization, you can also remove the `@angular/localize` runtime component from the project's polyfills file located be default at `src/polyfills.ts`.

To remove, delete the `import '@angular/localize/init';` line from the polyfills file.

<code-example language="typescript" header="polyfills.ts">
/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
</code-example>
-->
Angular 9 버전부터는 Ivy가 기본으로 사용됩니다.
하지만 호환성에 문제가 있는 경우라면 Ivy를 제거하고 이전에 사용하던 View Engine 컴파일러를 사용할 수도 있습니다.


<div class="alert is-helpful">

Ivy를 제거하기 전에 [Ivy 호환성 가이드](guide/ivy-compatibility#debugging) 문서에서 설명하는 디버깅 방법이 적합한지 확인해 보세요.

</div>


Ivy를 제거하려면 프로젝트에 있는 TypeScript 환경설정 파일에서 `angularCompilerOptions`를 제거해야 합니다.
`tsconfig.app.json` 파일은 보통 워크스페이스 최상위 폴더에 위치합니다.

Angular 9 버전부터는 `enableIvy` 플래그의 기본값이 `true`입니다.

아래 예제는 `enableIvy` 옵션을 `false`로 지정해서 Ivy를 사용하지 않는 TypeScript 환경설정 파일 예시입니다.

<code-example language="json" header="tsconfig.app.json">
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
</code-example>


<div class="alert is-important">

Ivy를 비활성화하면 애플리케이션을 AOT 빌드할 때 어떤 컴파일러를 사용할 것인지 다시 고민해야 합니다.
이 내용은 [위에서도](#aot-and-ivy) 언급했습니다.

Ivy 대신 View Engine을 컴파일러로 사용하려면 Angular 환경설정 파일 `angular.json`에 `aot: false`를 지정하면 됩니다.

</div>

Ivy를 제거한 프로젝트에서 국제화(internationalization) 기능을 사용한다면 프로젝트 폴리필에서 `@angular/localize`를 제거할 수 있습니다.
기본 폴리필 파일은 `src/polyfills.ts` 이며, 이 파일에서 `import '@angular/localize/init';` 코드를 제거하면 됩니다.

<code-example language="typescript" header="polyfills.ts">
/***************************************************************************************************
 * Angular 템플릿에서 i18n 태그를 사용하기 위해 `$localize`를 전역 범위에 로드합니다.
 */
import '@angular/localize/init';
</code-example>


{@a using-ssr-without-angular-ivy}
<!--
### Using SSR without Ivy
-->
### Ivy 없이 SSR 사용하기

<!--
If you opt out of Ivy and your application uses  [Angular Universal](guide/universal) to render Angular applications on the server, you must also change the way the server performs bootstrapping.

The following example shows how you modify the `server.ts` file to provide the `AppServerModuleNgFactory` as the bootstrap module.

* Import `AppServerModuleNgFactory` from the `app.server.module.ngfactory` virtual file.
* Set `bootstrap: AppServerModuleNgFactory` in the `ngExpressEngine` call.

<code-example language="typescript" header="server.ts">
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';

import { AppServerModuleNgFactory } from './src/app/app.server.module.ngfactory';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ivy-test/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';
</code-example>
-->
Ivy를 제거한 애플리케이션을 [Angular Universal](guide/universal)로 서버에서 렌더링하려면 서버에서 부트스트랩하는 코드를 변경해야 합니다.

아래 코드는 모듈을 부트스트랩하는 `AppServerModuleNgFactory`를 활용해서 서버사이드 렌더링을 구현하는 예제 코드입니다.
이 파일은 `server.ts` 파일에 작성합니다.

* 가상 파일 `app.server.module.ngfactory`에서 `AppServerModuleNgFactory`를 로드합니다.
* `ngExpressEngine`을 실행할 때 `bootstrap: AppServerModuleNgFactory`를 지정합니다.

<code-example language="typescript" header="server.ts">
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';

import { AppServerModuleNgFactory } from './src/app/app.server.module.ngfactory';

// Express를 참조하면 서버리스 함수를 사용할 수 있습니다.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ivy-test/browser');

  // Universal express 엔진(https://github.com/angular/universal/tree/master/modules/express-engine)을 활용합니다.
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Express Rest API 엔드포인트 예제
  // app.get('/api/**', (req, res) => { });
  // 정적 파일은 /browser 에 위치합니다.
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // 모든 라우팅 규칙을 Universal 엔진으로 처리합니다.
  server.get('*', (req, res) => {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Node 서버를 시작합니다.
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack은 'require'를 '__webpack_require__'로 변경합니다.
// '__non_webpack_require__'는 Node `require`에 해당하는 프록시입니다.
// 아래 코드는 빌드 결과물이 필요하지 않은 경우에만 서버를 실행하는 코드입니다.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';
</code-example>
