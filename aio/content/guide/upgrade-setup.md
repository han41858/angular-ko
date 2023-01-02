<!--
# Setup for upgrading from AngularJS
-->
# AngularJS에서 업그레이드하기

<!--
<!-todo: Question: Can we remove this file and instead direct readers to https://github.com/angular/quickstart/blob/master/README.md ->

<div class="alert is-critical">

**AUDIENCE**: <br />
Use this guide **only** in the context of  [Upgrading from AngularJS](guide/upgrade "Upgrading from AngularJS to Angular") or [Upgrading for Performance](guide/upgrade-performance "Upgrading for Performance").
Those Upgrade guides refer to this Setup guide for information about using the [deprecated QuickStart GitHub repository](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository"), which was created prior to the current Angular [CLI](cli "CLI Overview").

**For all other scenarios**, see the current instructions in [Setting up the Local Environment and Workspace](guide/setup-local "Setting up for Local Development").

</div>

<!-
The <live-example name=quickstart>QuickStart live-coding</live-example> example is an Angular *playground*.
There are also some differences from a local app, to simplify that live-coding experience.
In particular, the QuickStart live-coding example shows just the AppComponent file; it creates the equivalent of app.module.ts and main.ts internally for the playground only.
->

This guide describes how to develop locally on your own machine.
Setting up a new project on your machine is quick and easy with the [QuickStart seed on GitHub](https://github.com/angular/quickstart "Install the github QuickStart repo").
-->

<div class="alert is-critical">

**주의**: <br />
이 가이드에서 설명하는 내용은 [AngularJS 앱을 Angular 앱으로 업그레이드하기](guide/upgrade "Upgrading from AngularJS to Angular") 문서와 [업그레이드 방식과 성능의 관계](guide/upgrade-performance "Upgrading for Performance") 문서의 상황에서만 유효합니다.
이 업그레이드 가이드 문서는 [이제 사용하지 않는 QuickStart GitHub 저장소](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository")를 기준으로 설명하는데, 이 문서는 [Angular CLI](cli "CLI Overview")가 지금처럼 중요하게 사용되기 이전에 작성되었습니다.

**일반적인 경우라면** [로컬 개발환경, 워크스페이스 구성하기](guide/setup-local "Setting up for Local Development") 문서를 참고하는 것이 더 좋습니다.

</div>

이 문서는 [GitHub 저장소에 있는 QuickStart 프로젝트](https://github.com/angular/quickstart "Install the github QuickStart repo")를 기준으로 로컬 머신에 새 프로젝트 환경을 구성하는 내용에 대해 다룹니다.

<!--
## Prerequisites
-->
## 사전 준비

<!--
Make sure you have [Node.js&reg; and npm installed](guide/setup-local#prerequisites "Angular prerequisites").
-->
[Node.js&reg; 와 npm](guide/setup-local#prerequisites "Angular prerequisites")가 꼭 설치되어 있어야 합니다.


<a id="clone"></a>

<!--
## Clone
-->
## 저장소 복제

<!--
Perform the *clone-to-launch* steps with these terminal commands.

<code-example format="shell" language="shell">

git clone https://github.com/angular/quickstart.git quickstart
cd quickstart
npm install

</code-example>
-->
터미널에서 다음 명령을 실행하면 *저장소를 복제하고 실행* 할 수 있습니다.

<code-example format="shell" language="shell">

git clone https://github.com/angular/quickstart.git quickstart
cd quickstart
npm install

</code-example>


<a id="download"></a>

<!--
## Download
-->
## 다운로드

<!--
[Download the QuickStart seed](https://github.com/angular/quickstart/archive/master.zip "Download the QuickStart seed repository") and unzip it into your project folder.
Then perform the remaining steps with these terminal commands.

<code-example format="shell" language="shell">

cd quickstart
npm install

</code-example>
-->
[QuickStart seed를 다운받고](https://github.com/angular/quickstart/archive/master.zip "Download the QuickStart seed repository") 프로젝트 폴더에 압축을 풉니다.
그리고 터미널에서 다음 명령을 실행합니다.

<code-example format="shell" language="shell">

cd quickstart
npm install

</code-example>


<a id="non-essential"></a>

<!--
## Delete *non-essential* files (optional)
-->
## *불필요한* 파일 삭제하기 (생략 가능)

<!--
You can quickly delete the *non-essential* files that concern testing and QuickStart repository maintenance \(***including all git-related artifacts*** such as the `.git` folder and `.gitignore`\).

<div class="alert is-important">

Do this only in the beginning to avoid accidentally deleting your own tests and git setup.

</div>

Open a terminal window in the project folder and enter the following commands for your environment:
-->
저장소를 복제했다면 테스트와 관련되거나 QuickStart 저장소에 관련된 *불필요한* 파일들을 지우는 것이 좋습니다.
\(`.git` 폴더나 `.gitignore`와 같이 ***git과 관련된 파일들도*** 지우는 것이 좋습니다!\)

<div class="alert is-important">

이 과정은 테스트 스펙을 직접 작성하거나 git 저장소를 직접 설정할 때만 수행하세요.

</div>

프로젝트 폴더에서 터미널을 열고 다음 명령을 실행하세요:


### macOS / Mac OS X (bash)

<code-example format="shell" language="shell">

xargs rm -rf &lt; non-essential-files.osx.txt
rm src/app/*.spec*.ts
rm non-essential-files.osx.txt

</code-example>

### Windows

<code-example format="shell" language="shell">

for /f %i in (non-essential-files.txt) do del %i /F /S /Q
rd .git /s /q
rd e2e /s /q

</code-example>

<!--
## Update dependency versions
-->
## 의존성 버전 업데이트

<!--
Since the quickstart repository is deprecated, it is no longer updated and you need some additional steps to use the latest Angular.

1.  Remove the obsolete `@angular/http` package \(both from `package.json > dependencies` and `src/systemjs.config.js > SystemJS.config() > map`\).
1.  Install the latest versions of the Angular framework packages by running:

    <code-example format="shell" language="shell">

    npm install --save &commat;angular/common&commat;latest &commat;angular/compiler&commat;latest &commat;angular/core&commat;latest &commat;angular/forms&commat;latest &commat;angular/platform-browser&commat;latest &commat;angular/platform-browser-dynamic&commat;latest &commat;angular/router&commat;latest

    </code-example>

1.  Install the latest versions of other packages used by Angular \(RxJS, TypeScript, Zone.js\) by running:

    <code-example format="shell" language="shell">

    npm install --save rxjs&commat;latest zone.js&commat;latest
    npm install --save-dev typescript&commat;latest

    </code-example>

1.  Install the `systemjs-plugin-babel` package.
    This will later be used to load the Angular framework files, which are in ES2015 format, using SystemJS.

    <code-example format="shell" language="shell">

    npm install --save systemjs-plugin-babel&commat;latest

    </code-example>

1.  In order to be able to load the latest Angular framework packages \(in ES2015 format\) correctly, replace the relevant entries in `src/systemjs.config.js`:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="angular-paths"></code-example>

1.  In order to be able to load the latest RxJS package correctly, replace the relevant entries in `src/systemjs.config.js`:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="rxjs-paths"></code-example>

1.  In order to be able to load the `tslib` package \(which is required for files transpiled by TypeScript\), add the following entry to `src/systemjs.config.js`:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="tslib-paths"></code-example>

1.  In order for SystemJS to be able to load the ES2015 Angular files correctly, add the following entries to `src/systemjs.config.js`:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="plugin-babel"></code-example>

1.  Finally, in order to prevent TypeScript typecheck errors for dependencies, add the following entry to `src/tsconfig.json`:

    <code-example format="json" language="json">

    {
      "compilerOptions": {
        "skipLibCheck": true,
        // &hellip;
      }
    }

    </code-example>

With that, you can now run `npm start` and have the application built and served.
Once built, the application will be automatically opened in a new browser tab and it will be automatically reloaded when you make changes to the source code.
-->
quickstart 코드 저장소는 더이상 운영되지 않기 때문에 최신 Angular 버전에 맞게 수정을 약간 해야 합니다.

1.  `@angular/http` 패키지를 제거합니다. \(`package.json > dependencies`, `src/systemjs.config.js > SystemJS.config() > map`\).
1.  다음 명령을 실행해서 최신 Angular 프레임워크 패키지를 설치합니다:

    <code-example format="shell" language="shell">

    npm install --save &commat;angular/common&commat;latest &commat;angular/compiler&commat;latest &commat;angular/core&commat;latest &commat;angular/forms&commat;latest &commat;angular/platform-browser&commat;latest &commat;angular/platform-browser-dynamic&commat;latest &commat;angular/router&commat;latest

    </code-example>

1.  다음 명령을 실행해서 서드 파티 패키지\(RxJS, TypeScript, Zone.js\)를 설치합니다:

    <code-example format="shell" language="shell">

    npm install --save rxjs&commat;latest zone.js&commat;latest
    npm install --save-dev typescript&commat;latest

    </code-example>

1.  `systemjs-plugin-babel` 패키지를 설치합니다.
    이 패키지는 ES2015형식으로 작성된 Angular 프레임워크 파일을 SystemJS로 로드할 때 사용합니다.

    <code-example format="shell" language="shell">

    npm install --save systemjs-plugin-babel&commat;latest

    </code-example>

1.  ES2015 형식으로 패키징된 최신 Angular 프레임워크를 로드하기 위해 `src/systemjs.config.js` 파일을 수정합니다:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="angular-paths"></code-example>

1.  RxJS 패키지를 로드하기 위해 `src/systemjs.config.js` 파일을 수정합니다:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="rxjs-paths"></code-example>

1.  `tslib` 패키지를 로드하기 위해 `src/systemjs.config.js` 파일에 이 내용을 추가합니다. 이 패키지는 TypeScript 파일을 변환할 때 필요합니다:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="tslib-paths"></code-example>

1.  SystemJS가 ES2015 Angular 파일을 로드하기 위해 `src/systemjs.config.js` 파일에 이 내용을 추가합니다:

    <code-examples format="javascript" language="javascript" path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="plugin-babel"></code-example>

1.  마지막으로 TypeScript 타입체크 에러를 방지하기 위해 `src/tsconfig.json` 파일에 이 내용을 추가합니다:

    <code-example format="json" language="json">

    {
      "compilerOptions": {
        "skipLibCheck": true,
        // &hellip;
      }
    }

    </code-example>

이제 `npm start`를 실행하면 애플리케이션이 빌드되고 실행됩니다.
그리고 한 번 빌드하고 나면 브라우저 탭이 자동으로 열리면서 코드가 변경되면 자동으로 갱신됩니다.


<a id="seed"></a>

<!--
## What's in the QuickStart seed?
-->
## QuickStart seed에는 어떤 내용이 있을까요?

<!--
The **QuickStart seed** provides a basic QuickStart playground application and other files necessary for local development.
Consequently, there are many files in the project folder on your machine, most of which you can [learn about later](guide/file-structure).

<div class="alert is-helpful">

**Reminder:** The "QuickStart seed" example was created prior to the Angular CLI, so there are some differences between what is described here and an Angular CLI application.

</div>

<a id="app-files"></a>

Focus on the following three TypeScript \(`.ts`\) files in the `/src` folder.

<div class="filetree">
  <div class="file">
    src
  </div>
  <div class="children">
    <div class="file">
      app
    </div>
    <div class="children">
      <div class="file">
        app.component.ts
      </div>
      <div class="file">
        app.module.ts
      </div>
    </div>
    <div class="file">
      main.ts
    </div>
  </div>
</div>

<code-tabs>
    <code-pane header="src/app/app.component.ts" path="setup/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.module.ts" path="setup/src/app/app.module.ts"></code-pane>
    <code-pane header="src/main.ts" path="setup/src/main.ts"></code-pane>
</code-tabs>

All guides and cookbooks have *at least these core files*.
Each file has a distinct purpose and evolves independently as the application grows.

Files outside `src/` concern building, deploying, and testing your application.
They include configuration files and external dependencies.

Files inside `src/` "belong" to your application.
Add new Typescript, HTML and CSS files inside the `src/` directory, most of them inside `src/app`, unless told to do otherwise.

The following are all in `src/`

| File                 | Purpose |
|:---                  |:---     |
| app/app.component.ts | Defines the same `AppComponent` as the one in the QuickStart playground. It is the **root** component of what will become a tree of nested components as the application evolves.                                                                                                                                                                                                                                                                                                                      |
| app/app.module.ts    | Defines `AppModule`, the  [root module](guide/bootstrapping "AppModule: the root module") that tells Angular how to assemble the application. When initially created, it declares only the `AppComponent`. Over time, you add more components to declare.                                                                                                                                                                                                                                              |
| main.ts              | Compiles the application with the [JIT compiler](guide/glossary#jit) and [bootstraps](guide/bootstrapping) the application's main module \(`AppModule`\) to run in the browser. The JIT compiler is a reasonable choice during the development of most projects and it's the only viable choice for a sample running in a *live-coding* environment such as Stackblitz. Alternative [compilation](guide/aot-compiler), [build](guide/build), and [deployment](guide/deployment) options are available. |
-->
**QuickStart seed**는 QuickStart 플레이그라운드와 거의 비슷한 애플리케이션이며, 로컬 개발환경에 맞게 몇 개 파일이 더 추가된 것입니다.
[가이드 문서의 내용](guide/file-structure)을 계속 따라가다 보면 이 프로젝트에 많은 파일들이 추가될 것입니다.

<div class="alert is-helpful">

**명심하세요:** "QuickStart seed" 프로젝트는 Angular CLI가 등장하기 전에 만들어진 프로젝트입니다.
다른 문서에서 설명하는 내용과는 조금 다른 면이 있을 수 있습니다.

</div>

<a id="app-files"></a>

**`/src`** 폴더에 있는 TypeScript \(`.ts`\) 파일 3개에 집중해 봅시다.

<div class="filetree">
  <div class="file">
    src
  </div>
  <div class="children">
    <div class="file">
      app
    </div>
    <div class="children">
      <div class="file">
        app.component.ts
      </div>
      <div class="file">
        app.module.ts
      </div>
    </div>
    <div class="file">
      main.ts
    </div>
  </div>
</div>

<code-tabs>
    <code-pane header="src/app/app.component.ts" path="setup/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.module.ts" path="setup/src/app/app.module.ts"></code-pane>
    <code-pane header="src/main.ts" path="setup/src/main.ts"></code-pane>
</code-tabs>

모든 가이드 문서에는 *이 3개의 파일이* 반드시 존재합니다.
각 파일에는 독자적인 역할이 있으며, 애플리케이션이 확장되면서 점점 복잡해질 것입니다.

`src/` 폴더 밖에 있는 파일들은 애플리케이션 빌드하거나 배포, 테스트할 때 필요한 파일입니다.
이 파일들은 환경을 설정하거나 외부 의존성을 관리하는 용도로 사용합니다.

`src/` 폴더 안에 있는 파일들은 애플리케이션을 구성하는 파일입니다.
그래서 애플리케이션을 확장하기 위해 새롭게 TypeScript, HTML, CSS을 만들면 `src/` 폴더에 만들게 되며, 특별한 이유가 없다면 `src/app` 폴더에 생성하게 될 것입니다.

위에서 언급한 필수 파일 3개도 `src/` 폴더에 존재합니다.

| 파일                   | 용도                                                                                                                                                                                                                                                                                                                          |
|:---------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| app/app.component.ts | QuickStart 플레이그라운드 애플리케이션의 `AppComponent`를 정의합니다. 이 컴포넌트는 애플리케이션 **최상위** 컴포넌트이며 이 컴포넌트를 기준으로 컴포넌트 트리를 구성합니다.                                                                                                                                                                                                                |
| app/app.module.ts    | [최상위 모듈](guide/bootstrapping "AppModule: the root module") `AppModule`을 정의합니다. Angular는 이 모듈에 정의된 대로 애플리케이션을 구성합니다. 처음 프로젝트를 생성하고 나면 프로젝트에는 `AppComponent`만 존재합니다. 그리고 이후에 프로젝트가 커질수록 수많은 컴포넌트가 추가될 것입니다.                                                                                                                   |
| main.ts              | 애플리케이션을 [JIT 컴파일러](guide/glossary#jit)로 빌드하고 브라우저에서 애플리케이션 메인 모듈 \(`AppModule`\)을 [부트스트랩](guide/bootstrapping)할 때 사용하는 파일입니다. 프로젝트가 개발단계라면 JIT 컴파일러도 충분히 좋은 선택이며 Stackblitz와 같은 *라이브 코딩* 환경에서는 JIT 컴파일러만 사용할 수 있습니다. [AOT 컴파일러로 대체하는 방법](guide/aot-compiler), [빌드](guide/build), [배포](guide/deployment)하는 방법에 대해서도 확인해 보세요. |


<!--
## Appendix: Test using `fakeAsync()/waitForAsync()`
-->
## 부록: `fakeAsync()/waitForAsync()` 활용하기

<!--
If you use the `fakeAsync()` or `waitForAsync()` helper functions to run unit tests \(for details, read the [Testing guide](guide/testing-components-scenarios#fake-async)\), you need to import `zone.js/testing` in your test setup file.

<div class="alert is-important">

If you create project with `Angular/CLI`, it is already imported in `src/test.ts`.

</div>

And in the earlier versions of `Angular`, the following files were imported or added in your html file:

<code-example format="html" language="html">

import 'zone.js/plugins/long-stack-trace-zone';
import 'zone.js/plugins/proxy';
import 'zone.js/plugins/sync-test';
import 'zone.js/plugins/jasmine-patch';
import 'zone.js/plugins/async-test';
import 'zone.js/plugins/fake-async-test';

</code-example>

You can still load those files separately, but the order is important, you must import `proxy` before `sync-test`, `async-test`, `fake-async-test` and `jasmine-patch`.
And you also need to import `sync-test` before `jasmine-patch`, so it is recommended to just import `zone-testing` instead of loading those separated files.
-->
유닛 테스트를 실행할 때 `fakeAsync()/waitForAsync()` 헬퍼 함수를 사용한다면, 테스트 환경 설정을 위해 `zone.js/dist/zone-testing` 패키지들을 로드해야 합니다.
자세한 내용은 [테스트](guide/testing-components-scenarios#fake-async) 문서를 참고하세요.

<div class="alert is-important">

Angular CLI로 프로젝트를 생성했다면 이 내용은 이미 `src/test.ts` 파일에 구성되어 있습니다.

</div>

이전에는 HTML 파일에서 이 파일들을 직접 로드하기도 했습니다:

<code-example format="html" language="html">

import 'zone.js/plugins/long-stack-trace-zone';
import 'zone.js/plugins/proxy';
import 'zone.js/plugins/sync-test';
import 'zone.js/plugins/jasmine-patch';
import 'zone.js/plugins/async-test';
import 'zone.js/plugins/fake-async-test';

</code-example>

이 파일들 중에서 필요한 파일만 로드할 수도 있지만, 로드하는 순서가 중요합니다.
`proxy` 패키지는 `sync-test`, `async-test`, `fake-async-test`, `jasmine-patch`가 로드되기 전에 먼저 로드되어야 합니다.
그리고 `sync-test` 패키지는 `jasmine-patch`가 로드되기 전에 먼저 로드되어야 합니다.
그래서 개별 파일을 로드하지 말고 `zone-testing` 패키지를 한 번에 로드하는 것을 권장합니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
