<!--
# Testing with Karma and Jasmine
-->

<a id="testing-with-karma-and-jasmine"></a>

# Karma와 Jasmine으로 테스트하기

<!--
While [Vitest](https://vitest.dev) is the default test runner for new Angular projects, [Karma](https://karma-runner.github.io) is still a supported and widely used test runner. This guide provides instructions for testing your Angular application using the Karma test runner with the [Jasmine](https://jasmine.github.io) testing framework.
-->

새 Angular 프로젝트의 기본 테스트 러너는 [Vitest](https://vitest.dev)이지만, [Karma](https://karma-runner.github.io)도 계속 지원하며 널리 사용됩니다.
이 문서에서는 Karma 테스트 러너와 [Jasmine](https://jasmine.github.io) 테스트 프레임워크로 Angular 애플리케이션을 테스트하는 방법을 알아봅니다.

<!--
## Setting Up Karma and Jasmine
-->

<a id="setting-up-karma-and-jasmine"></a>

## Karma와 Jasmine 설정하기

<!--
You can set up Karma and Jasmine for a new project or add it to an existing one.
-->

새 프로젝트에 Karma와 Jasmine을 설정하거나 기존 프로젝트에 추가할 수 있습니다.

<!--
### For New Projects
-->

<a id="for-new-projects"></a>

### 새 프로젝트에 설정하기

<!--
To create a new project with Karma and Jasmine pre-configured, run the `ng new` command with the `--test-runner=karma` option:

```shell
ng new my-karma-app --test-runner=karma
```
-->

Karma와 Jasmine이 설정된 새 프로젝트를 생성하려면 `ng new` 명령에 `--test-runner=karma` 옵션을 사용하세요.

```shell
ng new my-karma-app --test-runner=karma
```

<!--
### For Existing Projects
-->

<a id="for-existing-projects"></a>

### 기존 프로젝트에 추가하기

<!--
To add Karma and Jasmine to an existing project, follow these steps:

1.  **Install the necessary packages:**

    <docs-code-multifile>
      <docs-code header="npm" language="shell">
        npm install --save-dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
      </docs-code>
      <docs-code header="yarn" language="shell">
        yarn add --dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
      </docs-code>
      <docs-code header="pnpm" language="shell">
        pnpm add -D karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
      </docs-code>
      <docs-code header="bun" language="shell">
        bun add --dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
      </docs-code>
    </docs-code-multifile>

2.  **Configure the test runner in `angular.json`:**

    In your `angular.json` file, find the `test` target and set the `runner` option to `karma`:

    ```json
    {
      // ...
      "projects": {
        "your-project-name": {
          // ...
          "architect": {
            "test": {
              "builder": "@angular/build:unit-test",
              "options": {
                "runner": "karma"
                // ... other options
              }
            }
          }
        }
      }
    }
    ```

3.  **Update `tsconfig.spec.json` for Jasmine types:**

    To ensure TypeScript recognizes global testing functions like `describe` and `it`, add `"jasmine"` to the `types` array in your `tsconfig.spec.json`:

    ```json
    {
      // ...
      "compilerOptions": {
        // ...
        "types": ["jasmine"]
      }
      // ...
    }
    ```
-->

기존 프로젝트에 Karma와 Jasmine을 추가하려면 다음 순서로 진행하세요.

1. **필요한 패키지를 설치합니다.**

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
  </docs-code>
</docs-code-multifile>

2. **`angular.json`에 테스트 러너를 설정합니다.**

   `angular.json` 파일에서 `test` 대상을 찾아 `runner` 옵션을 `karma`로 지정합니다.

   ```json
   {
     // ...
     "projects": {
       "your-project-name": {
         // ...
         "architect": {
           "test": {
             "builder": "@angular/build:unit-test",
             "options": {
               "runner": "karma"
               // ... 다른 옵션
             }
           }
         }
       }
     }
   }
   ```

3. **Jasmine 타입을 사용하도록 `tsconfig.spec.json`을 수정합니다.**

   TypeScript가 `describe`, `it`과 같은 전역 테스트 함수를 인식할 수 있도록 `tsconfig.spec.json`의 `types` 배열에 `"jasmine"`을 추가합니다.

   ```json
   {
     // ...
     "compilerOptions": {
       // ...
       "types": ["jasmine"]
     }
     // ...
   }
   ```

<!--
## Running Tests
-->

<a id="running-tests"></a>

## 테스트 실행하기

<!--
Once your project is configured, run the tests using the [`ng test`](cli/test) command:

```shell
ng test
```

The `ng test` command builds the application in _watch mode_ and launches the [Karma test runner](https://karma-runner.github.io).

The console output looks like below:

```shell

02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS

```

The test output is displayed in the browser using [Karma Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter).

<img alt="Jasmine HTML Reporter in the browser" src="assets/images/guide/testing/initial-jasmine-html-reporter.png">

Click on a test row to re-run just that test or click on a description to re-run the tests in the selected test group ("test suite").

Meanwhile, the `ng test` command is watching for changes. To see this in action, make a small change to a source file and save. The tests run again, the browser refreshes, and the new test results appear.
-->

프로젝트 설정이 끝나면 [`ng test`](cli/test) 명령으로 테스트를 실행합니다.

```shell
ng test
```

`ng test` 명령은 애플리케이션을 _파일 감시 모드_ 로 빌드하고 [Karma 테스트 러너](https://karma-runner.github.io)를 실행합니다.

콘솔에는 다음과 같이 출력됩니다.

```shell

02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS

```

테스트 결과는 [Karma Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter)를 통해 브라우저에 표시됩니다.

<img alt="브라우저에 표시된 Jasmine HTML Reporter" src="assets/images/guide/testing/initial-jasmine-html-reporter.png">

테스트 행을 클릭하면 해당 테스트만 다시 실행합니다.
설명을 클릭하면 선택한 테스트 그룹("테스트 스위트")에 속한 테스트를 다시 실행합니다.

한편 `ng test` 명령은 파일 변경을 감시하고 있습니다.
소스 파일을 조금 수정하고 저장해 보세요.
테스트가 다시 실행되고 브라우저가 새로고침되면서 새 테스트 결과가 표시됩니다.

<!--
## Configuration
-->

<a id="configuration"></a>

## 환경 설정

<!--
The Angular CLI takes care of Jasmine and Karma configuration for you. It constructs the full configuration in memory, based on options specified in the `angular.json` file.
-->

Angular CLI가 Jasmine과 Karma의 환경 설정을 처리합니다.
`angular.json` 파일에 지정한 옵션을 기반으로 전체 설정을 메모리에 구성합니다.

<!--
### Customizing Karma Configuration
-->

<a id="customizing-karma-configuration"></a>

### Karma 설정 변경하기

<!--
If you want to customize Karma, you can create a `karma.conf.js` by running the following command:

```shell
ng generate config karma
```

HELPFUL: Read more about Karma configuration in the [Karma configuration guide](https://karma-runner.github.io/6.4/config/configuration-file.html).
-->

Karma 설정을 직접 변경하려면 다음 명령으로 `karma.conf.js`를 생성하세요.

```shell
ng generate config karma
```

참고: 자세한 내용은 [Karma 설정 가이드](https://karma-runner.github.io/6.4/config/configuration-file.html)를 참고하세요.

<!--
### Setting the Test Runner in `angular.json`
-->

<a id="setting-the-test-runner-in-angularjson"></a>

### `angular.json`에서 테스트 러너 지정하기

<!--
To explicitly set Karma as the test runner for your project, locate the `test` target in your `angular.json` file and set the `runner` option to `karma`:

```json
{
  // ...
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "runner": "karma"
            // ... other options
          }
        }
      }
    }
  }
}
```
-->

프로젝트의 테스트 러너를 Karma로 명시하려면 `angular.json` 파일의 `test` 대상에서 `runner` 옵션을 `karma`로 지정하세요.

```json
{
  // ...
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "runner": "karma"
            // ... 다른 옵션
          }
        }
      }
    }
  }
}
```

<!--
## Code coverage enforcement
-->

<a id="code-coverage-enforcement"></a>

## 코드 커버리지 기준 적용하기

<!--
To enforce a minimum code coverage level, you can use the `check` property in the `coverageReporter` section of your `karma.conf.js` file.

For example, to require a minimum of 80% coverage:

```javascript
coverageReporter: {
  dir: require('path').join(__dirname, './coverage/<project-name>'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
```

This will cause the test run to fail if the specified coverage thresholds are not met.
-->

최소 코드 커버리지 기준을 적용하려면 `karma.conf.js` 파일의 `coverageReporter` 영역에서 `check` 프로퍼티를 사용하세요.

예를 들어 커버리지를 최소 80%로 유지하려면 다음과 같이 설정합니다.

```javascript
coverageReporter: {
  dir: require('path').join(__dirname, './coverage/<project-name>'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
```

지정한 커버리지 기준에 미치지 못하면 테스트 실행이 실패합니다.

<!--
## Testing in continuous integration
-->

<a id="testing-in-continuous-integration"></a>

## 지속적 통합 환경에서 테스트하기

<!--
To run your Karma tests in a CI environment, use the following command:

```shell
ng test --no-watch --no-progress --browsers=ChromeHeadless
```

NOTE: The `--no-watch` and `--no-progress` flags are crucial for Karma in CI environments to ensure tests run once and exit cleanly. The `--browsers=ChromeHeadless` flag is also essential for running tests in a browser environment without a graphical interface.
-->

CI 환경에서 Karma 테스트를 실행하려면 다음 명령을 사용하세요.

```shell
ng test --no-watch --no-progress --browsers=ChromeHeadless
```

참고: CI 환경에서 Karma가 테스트를 한 번 실행하고 정상적으로 종료되도록 하려면 `--no-watch`와 `--no-progress` 플래그가 중요합니다.
그래픽 인터페이스가 없는 브라우저 환경에서 테스트를 실행하려면 `--browsers=ChromeHeadless` 플래그도 필요합니다.

<!--
## Debugging tests
-->

<a id="debugging-tests"></a>

## 테스트 디버깅하기

<!--
If your tests aren't working as you expect, you can inspect and debug them in the browser.

To debug an application with the Karma test runner:

1.  Reveal the Karma browser window. See [Set up for testing](guide/testing#set-up-for-testing) if you need help with this step.
2.  Click the **DEBUG** button to open a new browser tab and re-run the tests.
3.  Open the browser's **Developer Tools**. On Windows, press `Ctrl-Shift-I`. On macOS, press `Command-Option-I`.
4.  Pick the **Sources** section.
5.  Press `Control/Command-P`, and then start typing the name of your test file to open it.
6.  Set a breakpoint in the test.
7.  Refresh the browser, and notice how it stops at the breakpoint.

<img alt="Karma debugging" src="assets/images/guide/testing/karma-1st-spec-debug.png">
-->

테스트가 예상대로 동작하지 않으면 브라우저에서 확인하고 디버깅할 수 있습니다.

Karma 테스트 러너로 애플리케이션을 디버깅하려면 다음 순서로 진행하세요.

1. Karma 브라우저 창을 엽니다.
   도움이 필요하면 [테스트 환경 설정하기](guide/testing#set-up-for-testing)를 참고하세요.
2. **DEBUG** 버튼을 클릭하면 새 브라우저 탭이 열리고 테스트가 다시 실행됩니다.
3. 브라우저 **개발자 도구**를 엽니다.
   Windows에서는 `Ctrl-Shift-I`, macOS에서는 `Command-Option-I`를 누르세요.
4. **Sources** 영역을 선택합니다.
5. `Control/Command-P`를 누르고 테스트 파일 이름을 입력해서 파일을 엽니다.
6. 테스트에 중단점을 설정합니다.
7. 브라우저를 새로고침하면 중단점에서 실행이 멈추는 것을 확인할 수 있습니다.

<img alt="Karma 디버깅 화면" src="assets/images/guide/testing/karma-1st-spec-debug.png">
