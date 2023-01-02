<a id="top"></a>

{@searchKeywords test testing karma jasmine coverage}

<!--
# Testing
-->
# 테스트

<!--
Testing your Angular application helps you check that your application is working as you expect.
-->
애플리케이션이 원하는 대로 동작하는지 테스트해보세요.


<!--
## Prerequisites
-->
## 사전 지식

<!--
Before writing tests for your Angular application, you should have a basic understanding of the following concepts:

*   [Angular fundamentals](guide/architecture)
*   [JavaScript](https://javascript.info/)
*   HTML
*   CSS
*   [Angular CLI](cli)

The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the [Angular CLI](cli).
This sample application is much like the one in the [*Tour of Heroes* tutorial](tutorial).

<div class="alert is-helpful">

If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>
-->
테스트를 작성하기 전에 이런 내용에 대해 미리 이해하고 있는 것이 좋습니다:

*   [Angular 기본 개념](guide/architecture)
*   [JavaScript](https://javascript.info/)
*   HTML
*   CSS
*   [Angular CLI](cli)

이 문서는 [Angular CLI](cli)로 생성한 Angular 애플리케이션에 유닛 테스트와 통합 테스트를 적용하는 방법과 팁에 대해 안내합니다.
예제 애플리케이션은 [*히어로들의 여행* 튜토리얼](tutorial)과 비슷합니다.

<div class="alert is-helpful">

이 문서에서 다루는 테스트 기능은 <live-example name="testing" noDownload>브라우저에서 실행해보거나</live-example>, <live-example name="testing" downloadOnly>다운받아 로컬에서 실행</live-example>할 수 있습니다.

</div>


<a id="setup"></a>
<a id="set-up-testing"></a>

<!--
## Set up testing
-->
## 테스트 환경설정

<!--
The Angular CLI downloads and installs everything you need to test an Angular application with [Jasmine testing framework](https://jasmine.github.io).

The project you create with the CLI is immediately ready to test.
Just run the [`ng test`](cli/test) CLI command:

<code-example format="shell" language="shell">

ng test

</code-example>

The `ng test` command builds the application in *watch mode*,
and launches the [Karma test runner](https://karma-runner.github.io).

The console output looks the below:

<code-example format="shell" language="shell">

02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS

</code-example>

The last line of the log shows that Karma ran three tests that all passed.

The test output is displayed in the browser using [Karma Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter).

<div class="lightbox">

<img alt="Jasmine HTML Reporter in the browser" src="generated/images/guide/testing/initial-jasmine-html-reporter.png">

</div>

Click on a test row to re-run just that test or click on a description to re-run the tests in the selected test group \("test suite"\).

Meanwhile, the `ng test` command is watching for changes.

To see this in action, make a small change to `app.component.ts` and save.
The tests run again, the browser refreshes, and the new test results appear.
-->
Angular 애플리케이션은 [Jasmine 테스트 프레임워크](https://jasmine.github.io)로 테스트하는데, 애플리케이션을 테스트할 때 필요한 환경은 Angular CLI가 프로젝트를 생성하면서 모두 준비하기 때문에 바로 테스트할 수 있는 상태입니다.

프로젝트 최상위 폴더에서 [`ng test`](cli/test) 명령을 실행해 보세요:

<code-example format="shell" language="shell">

ng test

</code-example>

`ng test` 명령을 실행하면 애플리케이션을 *워치 모드\(watch mode\)* 로 빌드하고 [Karma 테스트 러너](https://karma-runner.github.io)를 실행합니다.

콘솔은 다음과 같이 출력될 것입니다:

<code-example format="shell" language="shell">

02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS

</code-example>

마지막 줄을 보면 Karma가 실행되고 3개의 테스트 스펙이 모두 통과된 것을 확인할 수 있습니다.

브라우저에 표시되는 테스트 결과는 [Karma Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter)가 출력한 것입니다.

<div class="lightbox">

<img alt="Jasmine HTML Reporter in the browser" src="generated/images/guide/testing/initial-jasmine-html-reporter.png">

</div>

브라우저에서는 특정 테스트 스펙을 클릭해서 해당 스펙만 다시 실행해볼 수 있고, 테스트 그룹\(test suite\)을 클릭해서 그룹 단위로 다시 실행할 수도 있습니다.

그리고 `ng test` 명령을 실행했기 때문에 코드가 변경되는 것도 감지합니다.

`app.component.ts` 파일의 내용을 수정하고 저장해 보세요.
그러면 테스트가 다시 실행되면서 브라우저도 갱신되고, 새로운 결과 화면이 표시될 것입니다.


<!--
## Configuration
-->
#### 테스트 설정

<!--
The Angular CLI takes care of Jasmine and Karma configuration for you. It constructs the full configuration in memory, based on options specified in the `angular.json` file.

If you require to fine-tune Karma, follow the below steps:

1. Create a `karma.conf.js` in the root folder of the project.

    <code-example format="javascript" language="javascript" header="karma.conf.js">

    module.exports = function (config) {
      config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter'),
          require('karma-coverage'),
          require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
          jasmine: {
            // you can add configuration options for Jasmine here
            // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
            // for example, you can disable the random execution with `random: false`
            // or set a specific seed with `seed: 4321`
          },
          clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
          suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
          dir: require('path').join(__dirname, './coverage/<project-name>'),
          subdir: '.',
          reporters: [
            { type: 'html' },
            { type: 'text-summary' }
          ]
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
      });
    };

    </code-example>

1. In the `angular.json`, use the [`karmaConfig`](cli/test) option to configure the Karma builder to use the created configuration file.

  <code-example format="jsonc" language="jsonc">

  "test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
      "karmaConfig": "karma.conf.js",
      "polyfills": ["zone.js", "zone.js/testing"],
      "tsConfig": "src/tsconfig.spec.json",
      "styles": ["src/styles.css"]
    }
  }

  </code-example>


<div class="alert is-helpful">

Read more about Karma configuration in the [Karma configuration guide](http://karma-runner.github.io/6.4/config/configuration-file.html).

</div>
-->
Angular CLI는 Jasmine, Karma 설정을 자동으로 구성합니다.
기본적으로 모든 설정은 메모리에 구축하며, `angular.json` 파일에서 추가 설정을 하기도 합니다.

Karma를 원하는 대로 설정하려면 이런 순서로 진행해 보세요:

1. 프로젝트 최상위 폴더에 `karma.conf.js` 파일을 생성합니다.

    <code-example format="javascript" language="javascript" header="karma.conf.js">

    module.exports = function (config) {
      config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter'),
          require('karma-coverage'),
          require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
          jasmine: {
            // Jasmine 설정은 여기에 추가합니다.
            // 옵션 목록은 https://jasmine.github.io/api/edge/Configuration.html 를 참고하세요.
            // 예를 들어 랜덤 순서를 비활성화하려면 `random: false`를 지정하면 되고,
            // 특정 시드를 선택하려면 `seed: 4321`를 지정하면 됩니다.
          },
          clearContext: false // Jasmine Spec Runner 메시지를 브라우저에 표시합니다.
        },
        jasmineHtmlReporter: {
          suppressAll: true // 중복된 트레이스는 제거합니다.
        },
        coverageReporter: {
          dir: require('path').join(__dirname, './coverage/<project-name>'),
          subdir: '.',
          reporters: [
            { type: 'html' },
            { type: 'text-summary' }
          ]
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
      });
    };

    </code-example>

1. `angular.json` 파일에 [`karmaConfig`](cli/test) 옵션을 추가하면 Karma 빌더의 설정을 추가할 수 있습니다.

  <code-example format="jsonc" language="jsonc">

  "test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
      "karmaConfig": "karma.conf.js",
      "polyfills": ["zone.js", "zone.js/testing"],
      "tsConfig": "src/tsconfig.spec.json",
      "styles": ["src/styles.css"]
    }
  }

  </code-example>


<div class="alert is-helpful">

Karma 설정방법을 더 알아보려면 [Karma 설정 가이드](http://karma-runner.github.io/6.4/config/configuration-file.html) 문서를 참고하세요.

</div>


<!--
### Other test frameworks
-->
#### 다른 테스트 프레임워크

<!--
You can also unit test an Angular application with other testing libraries and test runners.
Each library and runner has its own distinctive installation procedures, configuration, and syntax.

<!--
### Test file name and location
-->
#### 테스트 파일의 이름과 위치

<!--
Inside the `src/app` folder the Angular CLI generated a test file for the `AppComponent` named `app.component.spec.ts`.

<div class="alert is-important">

The test file extension **must be `.spec.ts`** so that tooling can identify it as a file with tests \(also known as a *spec* file\).

</div>

The `app.component.ts` and `app.component.spec.ts` files are siblings in the same folder.
The root file names \(`app.component`\) are the same for both files.

Adopt these two conventions in your own projects for *every kind* of test file.
-->
`src/app` 폴더 안을 보면 Angular CLI가 생성한 코드 중에 `AppComponent`를 테스트하는 `app.component.spec.ts` 파일이 존재합니다.

<div class="alert is-important">

IDE와 같은 툴에서 스펙 파일을 구분하려면 테스트 파일의 확장자를 **반드시 `.spec.ts`**로 지정해야 합니다.

</div>

두 파일을 보면 `app.component.ts` 파일과 `app.component.spec.ts` 파일은 같은 폴더에 이웃한 파일이며, 두 파일의 컴포넌트 이름 부분\(`app.component`\)이 같다는 것을 확인할 수 있습니다.

이 룰은 프로젝트 안에 있는 *모든* 테스트 파일에 적용하는 것이 좋습니다.

<a id="q-spec-file-location"></a>

<!--
#### Place your spec file next to the file it tests
-->
#### 테스트하려는 파일 근처에 두는 방식

<!--
It's a good idea to put unit test spec files in the same folder
as the application source code files that they test:

*   Such tests are painless to find
*   You see at a glance if a part of your application lacks tests
*   Nearby tests can reveal how a part works in context
*   When you move the source \(inevitable\), you remember to move the test
*   When you rename the source file \(inevitable\), you remember to rename the test file
-->
유닛 테스트 스펙 파일은 테스트하려는 파일과 같은 폴더에 두는 것이 좋습니다.
이런 점에서 좋습니다:

*   파일을 찾기 쉽습니다.
*   애플리케이션에 테스트가 적용되지 않은 부분을 빠르게 찾을 수 있습니다.
*   근처에 있는 테스트 파일이 어떤 컨텍스트에서 동작하는지 확인할 수 있습니다.
*   소스 파일을 옮기면서 테스트 파일도 빠뜨리지 않고 옮길 수 있습니다.
*   소스 파일의 이름을 변경할 때 테스트 파일도 빠뜨리지 않고 바꿀 수 있습니다.


<a id="q-specs-in-test-folder"></a>

<!--
#### Place your spec files in a test folder
-->
#### 테스트 폴더에 따로 두는 방식

<!--
Application integration specs can test the interactions of multiple parts
spread across folders and modules.
They don't really belong to any part in particular, so they don't have a
natural home next to any one file.

It's often better to create an appropriate folder for them in the `tests` directory.

Of course specs that test the test helpers belong in the `test` folder,
next to their corresponding helper files.
-->
애플리케이션 통합 스펙 파일은 여러 폴더와 여러 모듈에 걸쳐 통합 테스트를 진행합니다.
그래서 이 스펙 파일은 어느 영역에 딱 포함된다고 할 수 없으며 관련 파일도 특정할 수 없습니다.

그래서 이런 테스트는 `tests`라는 폴더를 만들도 이 안에 두는 것이 좋습니다.

통합 테스트와 관련된 테스트 헬퍼도 이 폴더에 함께 두는 것이 좋습니다.


<a id="ci"></a>

<!--
## Testing in continuous integration
-->
## 지속적인 통합환경에서 테스트하기

<!--
One of the best ways to keep your project bug-free is through a test suite, but you might forget to run tests all the time.

Continuous integration \(CI\) servers let you set up your project repository so that your tests run on every commit and pull request.

To test your Angular CLI application in Continuous integration \(CI\) run the following command:

<code-example format="shell" language="shell">

ng test --no-watch --no-progress

</code-example>
-->
프로젝트에서 발생하는 버그를 방지하려면 주기적으로 테스트를 실행하는 것이 좋지만, 매번 테스트를 실행해야 하는 것은 번거로운 일입니다.

이 때 프로젝트 레파지토리에 CI\(Continuous integration\) 서버를 연결하면 이 레파지토리에 커밋이나 풀 리퀘스트가 있을 때마다 자동으로 테스트를 실행하게 할 수 있습니다.

CI 환셩에서 Angular CLI 애플리케이션을 테스트하려면 이런 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

ng test --no-watch --no-progress

</code-example>



<!--
## More information on testing
-->
## 참고

<!--
After you've set up your application for testing, you might find the following testing guides useful.

|                                                                    | Details |
|:---                                                                |:---     |
| [Code coverage](guide/testing-code-coverage)                       | How much of your app your tests are covering and how to specify required amounts. |
| [Testing services](guide/testing-services)                         | How to test the services your application uses.                                   |
| [Basics of testing components](guide/testing-components-basics)    | Basics of testing Angular components.                                             |
| [Component testing scenarios](guide/testing-components-scenarios)  | Various kinds of component testing scenarios and use cases.                       |
| [Testing attribute directives](guide/testing-attribute-directives) | How to test your attribute directives.                                            |
| [Testing pipes](guide/testing-pipes)                               | How to test pipes.                                                                |
| [Debugging tests](guide/test-debugging)                            | Common testing bugs.                                                              |
| [Testing utility APIs](guide/testing-utility-apis)                 | Angular testing features.                                                         |
-->
애플리케이션에 테스트를 적용하고 나면 이런 내용에 대해 알아보는 것도 좋습니다.

|                                                        | 설명                                                          |
|:-------------------------------------------------------|:------------------------------------------------------------|
| [코드 커버리지](guide/testing-code-coverage)                 | 테스트 코드가 애플리케이션을 얼마나 검사하고 있는지, 특정 기준으로 이 수치를 보장해야 할 때 사용합니다. |
| [서비스 테스트하기](guide/testing-services)                    | 서비스를 테스트하는 방법에 대해 알아보세요.                                    |
| [컴포넌트 테스트하기 기본](guide/testing-components-basics)       | Angular 컴포넌트를 테스트할 때 필요한 기본 개념에 대해 알아보세요.                   |
| [컴포넌트 테스트 시나리오](guide/testing-components-scenarios)    | 컴포넌트의 형태에 따라 테스트하는 방법에 대해 알아보세요.                            |
| [어트리뷰트 디렉티브 테스트하기](guide/testing-attribute-directives) | 어트리뷰트 디렉티브를 테스트하는 방법에 대해 알아보세요.                             |
| [파이프 테스트하기](guide/testing-pipes)                       | 파이프를 테스트하는 방법에 대해 알아보세요.                                    |
| [테스트 디버깅하기](guide/test-debugging)                      | 테스트 스펙을 작성할 때 발생하는 버그의 원인을 확인해 보세요.                         |
| [테스트 유틸리티 API](guide/testing-utility-apis)             | Angular가 제공하는 테스트 기능에 대해 알아보세요.                             |


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-11-02
