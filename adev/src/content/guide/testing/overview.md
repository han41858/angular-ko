<!--
# Unit testing
-->

<a id="unit-testing"></a>

# 단위 테스트

<!--
Testing your Angular application helps you check that it is working as you expect. Unit tests are crucial for catching bugs early, ensuring code quality, and facilitating safe refactoring.

NOTE: This guide covers the default testing setup for new Angular CLI projects, which uses Vitest. If you are migrating an existing project from Karma, see the [Migrating from Karma to Vitest guide](guide/testing/migrating-to-vitest). Karma is still supported; for more information, see the [Karma testing guide](guide/testing/karma).
-->

Angular 애플리케이션을 테스트하면 예상대로 동작하는지 확인할 수 있습니다.
단위 테스트는 버그를 일찍 발견하고 코드 품질을 유지하며 안전하게 리팩토링하는 데 중요합니다.

참고: 이 문서는 새 Angular CLI 프로젝트의 기본 테스트 환경인 Vitest를 설명합니다.
기존 프로젝트를 Karma에서 이전하려면 [Karma에서 Vitest로 이전하기](guide/testing/migrating-to-vitest)를 참고하세요.
Karma도 계속 지원합니다.
자세한 내용은 [Karma 테스트](guide/testing/karma) 문서를 참고하세요.

<!--
## Set up for testing
-->

<a id="set-up-for-testing"></a>

## 테스트 환경 설정하기

<!--
The Angular CLI downloads and installs everything you need to test an Angular application with the [Vitest testing framework](https://vitest.dev). New projects include `vitest` and `jsdom` by default.

Vitest runs your unit tests in a Node.js environment. To simulate the browser's DOM, Vitest uses a library called `jsdom`. This allows for faster test execution by avoiding the overhead of launching a browser. You can swap `jsdom` for an alternative like `happy-dom` by installing it and uninstalling `jsdom`. Currently, `jsdom` and `happy-dom` are the supported DOM emulation libraries.

The project you create with the CLI is immediately ready to test. Run the [`ng test`](cli/test) command:

```shell
ng test
```

The `ng test` command builds the application in _watch mode_ and launches the [Vitest test runner](https://vitest.dev).

The console output looks like this:

```shell
 ✓ src/app/app.spec.ts (3)
   ✓ AppComponent should create the app
   ✓ AppComponent should have as title 'my-app'
   ✓ AppComponent should render title
 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  18:18:01
   Duration  2.46s (transform 615ms, setup 2ms, collect 2.21s, tests 5ms)
```

The `ng test` command also watches your files for changes. If you modify a file and save it, the tests will run again.
-->

Angular CLI는 [Vitest 테스트 프레임워크](https://vitest.dev)로 Angular 애플리케이션을 테스트하는 데 필요한 모든 항목을 내려받아 설치합니다.
새 프로젝트에는 기본으로 `vitest`와 `jsdom`이 포함됩니다.

Vitest는 Node.js 환경에서 단위 테스트를 실행합니다.
브라우저 DOM은 `jsdom` 라이브러리로 재현합니다.
브라우저를 실행하는 데 드는 부담을 줄여 테스트를 더 빠르게 실행할 수 있습니다.
`happy-dom`과 같은 대안을 설치하고 `jsdom`을 제거하면 라이브러리를 교체할 수 있습니다.
현재 지원하는 DOM 에뮬레이션 라이브러리는 `jsdom`과 `happy-dom`입니다.

CLI로 생성한 프로젝트는 바로 테스트할 수 있습니다.
[`ng test`](cli/test) 명령을 실행하세요.

```shell
ng test
```

`ng test` 명령은 애플리케이션을 _변경 감시 모드_ 로 빌드하고 [Vitest 테스트 러너](https://vitest.dev)를 실행합니다.

콘솔에는 다음과 같이 출력됩니다.

```shell
 ✓ src/app/app.spec.ts (3)
   ✓ AppComponent should create the app
   ✓ AppComponent should have as title 'my-app'
   ✓ AppComponent should render title
 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  18:18:01
   Duration  2.46s (transform 615ms, setup 2ms, collect 2.21s, tests 5ms)
```

`ng test` 명령은 파일 변경도 감시합니다.
파일을 수정하고 저장하면 테스트가 다시 실행됩니다.

<!--
## Configuration
-->

<a id="configuration"></a>

## 환경 설정

<!--
The Angular CLI handles most of the Vitest configuration for you. You can customize the test behavior by modifying the `test` target options in your `angular.json` file.
-->

Angular CLI가 Vitest 설정 대부분을 처리합니다.
`angular.json` 파일의 `test` 타깃 옵션을 수정하면 테스트 동작을 변경할 수 있습니다.

<!--
### Angular.json options
-->

<a id="angularjson-options"></a>

### Angular.json 옵션

<!--
- `include`: Glob patterns for files to include for testing. Defaults to `['**/*.spec.ts', '**/*.test.ts']`.
- `exclude`: Glob patterns for files to exclude from testing.
- `setupFiles`: A list of paths to global setup files (e.g., polyfills or global mocks) that are executed before your tests.
- `providersFile`: The path to a file that exports a default array of Angular providers for the test environment. This is useful for setting up global test providers which are injected into your tests.
- `coverage`: A boolean to enable or disable code coverage reporting. Defaults to `false`.
- `browsers`: An array of browser names to run tests in a real browser (e.g., `["chromium"]`). Requires a browser provider to be installed. See the [Running tests in a browser](#running-tests-in-a-browser) section for more details.
-->

- `include`: 테스트에 포함할 파일의 glob 패턴입니다.
  기본값은 `['**/*.spec.ts', '**/*.test.ts']`입니다.
- `exclude`: 테스트에서 제외할 파일의 glob 패턴입니다.
- `setupFiles`: 테스트 전에 실행할 전역 설정 파일의 경로 목록입니다.
  폴리필이나 전역 목 등을 설정할 수 있습니다.
- `providersFile`: 테스트 환경에서 사용할 Angular 프로바이더 배열을 기본으로 내보내는 파일의 경로입니다.
  테스트에 주입할 전역 테스트 프로바이더를 설정할 때 유용합니다.
- `coverage`: 코드 커버리지 보고서를 활성화하거나 비활성화하는 불리언 값입니다.
  기본값은 `false`입니다.
- `browsers`: 실제 브라우저에서 테스트를 실행할 때 사용할 브라우저 이름 배열입니다.
  예를 들어 `["chromium"]`을 지정합니다.
  브라우저 프로바이더가 설치되어 있어야 합니다.
  자세한 내용은 [브라우저에서 테스트 실행하기](#running-tests-in-a-browser)를 참고하세요.

<!--
### Global test setup and providers
-->

<a id="global-test-setup-and-providers"></a>

### 전역 테스트 설정과 프로바이더

<!--
The `setupFiles` and `providersFile` options are particularly useful for managing global test configuration.

For example, you could create a `src/test-providers.ts` file to provide `provideHttpClientTesting` to all your tests:

```typescript {header: "src/test-providers.ts"}
import {EnvironmentProviders, Provider} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

const testProviders: (Provider | EnvironmentProviders)[] = [provideHttpClientTesting()];

export default testProviders;
```

You would then reference this file in your `angular.json`:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "providersFile": "src/test-providers.ts"
          }
        }
      }
    }
  }
}
```

HELPFUL: When creating new TypeScript files for test setup or providers, like `src/test-providers.ts`, ensure they are included in your project's test TypeScript configuration file (typically `tsconfig.spec.json`). This allows the TypeScript compiler to properly process these files during testing.
-->

`setupFiles`와 `providersFile` 옵션은 전역 테스트 설정을 관리할 때 특히 유용합니다.

예를 들어 모든 테스트에 `provideHttpClientTesting`을 제공하려면 `src/test-providers.ts` 파일을 만들 수 있습니다.

```typescript {header: "src/test-providers.ts"}
import {EnvironmentProviders, Provider} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

const testProviders: (Provider | EnvironmentProviders)[] = [provideHttpClientTesting()];

export default testProviders;
```

그런 다음 `angular.json`에서 이 파일을 참조합니다.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "providersFile": "src/test-providers.ts"
          }
        }
      }
    }
  }
}
```

참고: `src/test-providers.ts`처럼 테스트 설정이나 프로바이더용 TypeScript 파일을 새로 만들 때는 프로젝트의 테스트용 TypeScript 설정 파일(일반적으로 `tsconfig.spec.json`)에 포함해야 합니다.
그래야 테스트할 때 TypeScript 컴파일러가 이 파일을 올바르게 처리할 수 있습니다.

<!--
### Advanced Vitest configuration
-->

<a id="advanced-vitest-configuration"></a>

### Vitest 고급 설정

<!--
For advanced use cases, you can provide a custom Vitest configuration file using the `runnerConfig` option in `angular.json`.

IMPORTANT: While using a custom configuration enables advanced options, the Angular team does not provide support for the contents of the configuration file or for any third-party plugins. The CLI will also override certain properties (`test.projects`, `test.include`) to ensure proper integration.

You can create a Vitest configuration file (e.g., `vitest-base.config.ts`) and reference it in your `angular.json`:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "runnerConfig": "vitest-base.config.ts"
          }
        }
      }
    }
  }
}
```

You can also generate a base configuration file using the CLI:

```shell
ng generate config vitest
```

This creates a `vitest-base.config.ts` file that you can customize.

HELPFUL: Read more about Vitest configuration in the [official Vitest documentation](https://vitest.dev/config/).
-->

고급 설정이 필요하면 `angular.json`의 `runnerConfig` 옵션으로 커스텀 Vitest 설정 파일을 제공할 수 있습니다.

중요: 커스텀 설정으로 고급 옵션을 사용할 수 있지만, Angular 팀은 설정 파일의 내용이나 서드 파티 플러그인을 지원하지 않습니다.
또한 CLI는 올바르게 통합하기 위해 일부 프로퍼티(`test.projects`, `test.include`)를 덮어씁니다.

Vitest 설정 파일(예: `vitest-base.config.ts`)을 만들고 `angular.json`에서 참조하세요.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "runnerConfig": "vitest-base.config.ts"
          }
        }
      }
    }
  }
}
```

CLI로 기본 설정 파일을 생성할 수도 있습니다.

```shell
ng generate config vitest
```

수정해서 사용할 수 있는 `vitest-base.config.ts` 파일이 생성됩니다.

참고: Vitest 설정에 대한 자세한 내용은 [공식 Vitest 문서](https://vitest.dev/config/)를 참고하세요.

<!--
## Code coverage
-->

<a id="code-coverage"></a>

## 코드 커버리지

<!--
You can generate a code coverage report by adding the `--coverage` flag to the `ng test` command. The report is generated in the `coverage/` directory.

For more detailed information, see the [Code coverage guide](guide/testing/code-coverage).
-->

`ng test` 명령에 `--coverage` 플래그를 추가하면 코드 커버리지 보고서를 생성할 수 있습니다.
보고서는 `coverage/` 디렉터리에 생성됩니다.

자세한 내용은 [코드 커버리지](guide/testing/code-coverage) 문서를 참고하세요.

<!--
## Running tests in a browser
-->

<a id="running-tests-in-a-browser"></a>

## 브라우저에서 테스트 실행하기

<!--
While the default Node.js environment is faster for most unit tests, you can also run your tests in a real browser. This is useful for tests that rely on browser-specific APIs (like rendering) or for debugging.

To run tests in a browser, you must first install a browser provider. Read more about Vitest's browser mode in the [official documentation](https://vitest.dev/guide/browser).

Once the provider is installed, you can run your tests in the browser by configuring the `browsers` option in `angular.json` or by using the `--browsers` CLI flag. Tests run in a headed browser by default. If the `CI` environment variable is set, headless mode is used instead. To explicitly control headless mode, you can suffix the browser name with `Headless` (e.g., `chromiumHeadless`).

```bash
# Example for Playwright (headed)
ng test --browsers=chromium

# Example for Playwright (headless)
ng test --browsers=chromiumHeadless

# Example for WebdriverIO (headed)
ng test --browsers=chrome

# Example for WebdriverIO (headless)
ng test --browsers=chromeHeadless
```

Choose one of the following browser providers based on your needs:
-->

대부분의 단위 테스트는 기본 Node.js 환경에서 더 빠르게 실행되지만, 실제 브라우저에서 실행할 수도 있습니다.
렌더링처럼 브라우저 전용 API에 의존하는 테스트나 디버깅에 유용합니다.

브라우저에서 테스트를 실행하려면 먼저 브라우저 프로바이더를 설치해야 합니다.
Vitest의 브라우저 모드는 [공식 문서](https://vitest.dev/guide/browser)를 참고하세요.

프로바이더를 설치한 후 `angular.json`에 `browsers` 옵션을 설정하거나 CLI의 `--browsers` 플래그를 사용하면 브라우저에서 테스트를 실행할 수 있습니다.
기본으로 브라우저 창이 표시됩니다.
`CI` 환경 변수가 설정되어 있으면 헤드리스 모드를 사용합니다.
헤드리스 모드를 명시하려면 브라우저 이름 뒤에 `Headless`를 붙이세요.
예를 들어 `chromiumHeadless`로 지정합니다.

```bash
# Example for Playwright (headed)
ng test --browsers=chromium

# Example for Playwright (headless)
ng test --browsers=chromiumHeadless

# Example for WebdriverIO (headed)
ng test --browsers=chrome

# Example for WebdriverIO (headless)
ng test --browsers=chromeHeadless
```

필요에 맞게 다음 브라우저 프로바이더 중 하나를 선택하세요.

<!--
### Playwright
-->


### Playwright

<!--
[Playwright](https://playwright.dev/) is a browser automation library that supports Chromium, Firefox, and WebKit.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-playwright playwright
  </docs-code>
</docs-code-multifile>
-->

[Playwright](https://playwright.dev/)는 Chromium, Firefox, WebKit을 지원하는 브라우저 자동화 라이브러리입니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-playwright playwright
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-playwright playwright
  </docs-code>
</docs-code-multifile>

<!--
### WebdriverIO
-->


### WebdriverIO

<!--
[WebdriverIO](https://webdriver.io/) is a browser and mobile automation test framework that supports Chrome, Firefox, Safari, and Edge.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-webdriverio webdriverio
  </docs-code>
</docs-code-multifile>
-->

[WebdriverIO](https://webdriver.io/)는 Chrome, Firefox, Safari, Edge를 지원하는 브라우저 및 모바일 자동화 테스트 프레임워크입니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-webdriverio webdriverio
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-webdriverio webdriverio
  </docs-code>
</docs-code-multifile>

<!--
### Preview
-->


### Preview

<!--
The `@vitest/browser-preview` provider is designed for WebContainer environments like StackBlitz and is not intended for use in CI/CD.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-preview
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-preview
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-preview
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-preview
  </docs-code>
</docs-code-multifile>

HELPFUL: For more advanced browser-specific configuration, see the [Advanced Vitest configuration](#advanced-vitest-configuration) section.
-->

`@vitest/browser-preview` 프로바이더는 StackBlitz와 같은 WebContainer 환경용이며, CI/CD에서 사용하도록 만들어지지 않았습니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-preview
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-preview
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-preview
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-preview
  </docs-code>
</docs-code-multifile>

참고: 브라우저별 고급 설정은 [Vitest 고급 설정](#advanced-vitest-configuration)을 참고하세요.

<!--
## Other test frameworks
-->

<a id="other-test-frameworks"></a>

## 다른 테스트 프레임워크

<!--
You can also unit test an Angular application with other testing libraries and test runners. Each library and runner has its own installation procedures, configuration, and syntax.
-->

다른 테스트 라이브러리와 테스트 러너로도 Angular 애플리케이션의 단위 테스트를 실행할 수 있습니다.
각 라이브러리와 러너마다 설치 방법, 설정, 문법이 다릅니다.

<!--
## Testing in continuous integration
-->

<a id="testing-in-continuous-integration"></a>

## 지속적 통합 환경에서 테스트하기

<!--
A robust test suite is a key part of a continuous integration (CI) pipeline. CI servers let you automate your tests to run on every commit and pull request.

To test your Angular application in a CI server, run the standard test command:

```shell
ng test
```

Most CI servers set a `CI=true` environment variable, which `ng test` detects. This automatically configures your tests to run in a non-interactive, single-run mode.

If your CI server does not set this variable, or if you need to force single-run mode manually, you can use the `--no-watch` and `--no-progress` flags:

```shell
ng test --no-watch --no-progress
```
-->

견고한 테스트 모음은 지속적 통합(CI) 파이프라인의 핵심 요소입니다.
CI 서버를 사용하면 커밋과 풀 리퀘스트마다 테스트를 자동으로 실행할 수 있습니다.

CI 서버에서 Angular 애플리케이션을 테스트하려면 일반적인 테스트 명령을 실행하세요.

```shell
ng test
```

대부분의 CI 서버는 `CI=true` 환경 변수를 설정하며, `ng test`는 이를 감지합니다.
그러면 사용자 입력 없이 테스트를 한 번만 실행하도록 자동으로 설정됩니다.

CI 서버가 이 변수를 설정하지 않거나 한 번만 실행하도록 직접 지정해야 한다면 `--no-watch`와 `--no-progress` 플래그를 사용하세요.

```shell
ng test --no-watch --no-progress
```

<!--
## More information on testing
-->

<a id="more-information-on-testing"></a>

## 테스트 더 알아보기

<!--
After you've set up your application for testing, you might find the following testing guides useful.

|                                                                    | Details                                                                           |
| :----------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [Code coverage](guide/testing/code-coverage)                       | How much of your app your tests are covering and how to specify required amounts. |
| [Testing services](guide/testing/services)                         | How to test the services your application uses.                                   |
| [Basics of testing components](guide/testing/components-basics)    | Basics of testing Angular components.                                             |
| [Component testing scenarios](guide/testing/components-scenarios)  | Various kinds of component testing scenarios and use cases.                       |
| [Testing attribute directives](guide/testing/attribute-directives) | How to test your attribute directives.                                            |
| [Testing pipes](guide/testing/pipes)                               | How to test pipes.                                                                |
| [Debugging tests](guide/testing/debugging)                         | Common testing bugs.                                                              |
| [Testing utility APIs](guide/testing/utility-apis)                 | Angular testing features.                                                         |
-->

애플리케이션의 테스트 환경을 설정했다면 다음 문서도 확인해 보세요.

| 문서                                                                 | 설명                                                                                  |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| [코드 커버리지](guide/testing/code-coverage)                         | 테스트가 애플리케이션을 얼마나 검증하는지 확인하고 필요한 비율을 지정하는 방법입니다. |
| [서비스 테스트하기](guide/testing/services)                          | 애플리케이션에서 사용하는 서비스를 테스트하는 방법입니다.                             |
| [컴포넌트 테스트 기초](guide/testing/components-basics)              | Angular 컴포넌트 테스트의 기초를 알아봅니다.                                          |
| [컴포넌트 테스트 시나리오](guide/testing/components-scenarios)       | 여러 종류의 컴포넌트 테스트 시나리오와 사용 사례입니다.                               |
| [어트리뷰트 디렉티브 테스트하기](guide/testing/attribute-directives) | 어트리뷰트 디렉티브를 테스트하는 방법입니다.                                          |
| [파이프 테스트하기](guide/testing/pipes)                             | 파이프를 테스트하는 방법입니다.                                                       |
| [테스트 디버깅하기](guide/testing/debugging)                         | 테스트에서 자주 발생하는 버그를 알아봅니다.                                           |
| [테스트 유틸리티 API](guide/testing/utility-apis)                    | Angular의 테스트 기능입니다.                                                          |
