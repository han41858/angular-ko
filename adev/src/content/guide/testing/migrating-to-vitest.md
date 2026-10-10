<!--
# Migrating from Karma to Vitest
-->

<a id="migrating-from-karma-to-vitest"></a>

# Karma에서 Vitest로 이전하기

<!--
The Angular CLI uses [Vitest](https://vitest.dev/) as the default unit test runner for new projects. This guide provides instructions for migrating an existing project from Karma and Jasmine to Vitest.

IMPORTANT: Migrating an existing project to Vitest is considered experimental. This process also requires the use of the `application` build system, which is the default for all newly created projects.
-->

Angular CLI는 새 프로젝트의 기본 단위 테스트 러너로 [Vitest](https://vitest.dev/)를 사용합니다.
이 문서에서는 기존 프로젝트를 Karma와 Jasmine에서 Vitest로 이전하는 방법을 알아봅니다.

중요: 기존 프로젝트를 Vitest로 이전하는 기능은 실험적입니다.
이 과정에는 새 프로젝트에서 기본으로 사용하는 `application` 빌드 시스템도 필요합니다.

<!--
## Manual migration steps
-->

<a id="manual-migration-steps"></a>

## 수동 이전 단계

<!--
Before using the automated refactoring schematic, you must manually update your project to use the Vitest test runner.
-->

자동 리팩토링 스키매틱을 사용하기 전에 프로젝트가 Vitest 테스트 러너를 사용하도록 직접 수정해야 합니다.

<!--
### 1. Install dependencies
-->

<a id="1-install-dependencies"></a>

### 1. 의존성 설치하기

<!--
Install `vitest` and a DOM emulation library. While browser testing is still possible (see [step 5](#5-configure-browser-mode-optional)), Vitest uses a DOM emulation library by default to simulate a browser environment within Node.js for faster test execution. The CLI automatically detects and uses `happy-dom` if it's installed; otherwise, it falls back to `jsdom`. You must have one of these packages installed.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev vitest jsdom
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev vitest jsdom
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D vitest jsdom
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev vitest jsdom
  </docs-code>
</docs-code-multifile>
-->

`vitest`와 DOM 에뮬레이션 라이브러리를 설치합니다.
브라우저 테스트도 가능하지만([5단계](#5-configure-browser-mode-optional) 참고), Vitest는 기본으로 DOM 에뮬레이션 라이브러리를 사용해서 Node.js 안에 브라우저 환경을 재현하고 테스트를 빠르게 실행합니다.
CLI는 `happy-dom`이 설치되어 있으면 자동으로 감지해서 사용하고, 그렇지 않으면 `jsdom`을 사용합니다.
이 두 패키지 중 하나는 반드시 설치되어 있어야 합니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev vitest jsdom
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev vitest jsdom
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D vitest jsdom
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev vitest jsdom
  </docs-code>
</docs-code-multifile>

<!--
### 2. Update `angular.json`
-->

<a id="2-update-angularjson"></a>

### 2. `angular.json` 수정하기

<!--
In your `angular.json` file, find the `test` target for your project and change the `builder` to `@angular/build:unit-test`.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
```

The `unit-test` builder defaults to `"tsConfig": "tsconfig.spec.json"` and `"buildTarget": "::development"`. You can explicitly set these options if your project requires different values. For example, if the `development` build configuration is missing or you need different options for testing, you can create and use a `testing` or similarly named build configuration for `buildTarget`.

The `@angular/build:karma` builder previously allowed build options (like `polyfills`, `assets`, or `styles`) to be configured directly within the `test` target. The new `@angular/build:unit-test` builder does not support this. If your test-specific build options differ from your existing `development` build configuration, you must move them to a dedicated build target configuration. If your test build options already match your `development` build configuration, no action is needed.
-->

`angular.json` 파일에서 프로젝트의 `test` 타깃을 찾아 `builder`를 `@angular/build:unit-test`로 변경합니다.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
```

`unit-test` 빌더의 기본값은 `"tsConfig": "tsconfig.spec.json"`, `"buildTarget": "::development"`입니다.
프로젝트에서 다른 값이 필요하면 명시적으로 설정할 수 있습니다.
예를 들어 `development` 빌드 설정이 없거나 테스트에 다른 옵션이 필요하면 `testing`과 같은 이름의 빌드 설정을 만들고 `buildTarget`에 지정하세요.

기존 `@angular/build:karma` 빌더는 `polyfills`, `assets`, `styles` 같은 빌드 옵션을 `test` 타깃에 직접 설정할 수 있었습니다.
새로운 `@angular/build:unit-test` 빌더는 이를 지원하지 않습니다.
테스트용 빌드 옵션이 기존 `development` 빌드 설정과 다르면 전용 빌드 타깃 설정으로 옮겨야 합니다.
이미 `development` 빌드 설정과 같다면 별도로 수정할 필요가 없습니다.

<!--
### 3. Handle custom `karma.conf.js` configurations
-->

<a id="3-handle-custom-karmaconfjs-configurations"></a>

### 3. `karma.conf.js`의 커스텀 설정 처리하기

<!--
Custom configurations in `karma.conf.js` are not automatically migrated. Before deleting your `karma.conf.js` file, review it for any custom settings that need to be migrated.

Many Karma options have equivalents in Vitest that can be set in a custom Vitest configuration file (e.g., `vitest.config.ts`) and linked to your `angular.json` via the `runnerConfig` option.

Common migration paths include:

- **Reporters**: Karma reporters must be replaced with Vitest-compatible reporters. These can often be configured directly in your `angular.json` under the `test.options.reporters` property. For more advanced configurations, use a custom `vitest.config.ts` file.
- **Plugins**: Karma plugins may have Vitest equivalents that you will need to find and install. Note that code coverage is a first-class feature in the Angular CLI and can be enabled with `ng test --coverage`.
- **Custom Browser Launchers**: These are replaced by the `browsers` option in `angular.json` and the installation of a browser provider like `@vitest/browser-playwright`.

For other settings, consult the official [Vitest documentation](https://vitest.dev/config/).
-->

`karma.conf.js`의 커스텀 설정은 자동으로 이전되지 않습니다.
`karma.conf.js` 파일을 삭제하기 전에 이전해야 할 커스텀 설정이 있는지 확인하세요.

많은 Karma 옵션에는 대응하는 Vitest 옵션이 있습니다.
커스텀 Vitest 설정 파일(예: `vitest.config.ts`)에 지정하고 `angular.json`의 `runnerConfig` 옵션으로 연결할 수 있습니다.

주요 설정은 다음과 같이 이전합니다.

- **리포터**: Karma 리포터를 Vitest와 호환되는 리포터로 교체해야 합니다.
  대체로 `angular.json`의 `test.options.reporters` 프로퍼티에서 직접 설정할 수 있습니다.
  더 복잡한 설정에는 커스텀 `vitest.config.ts` 파일을 사용하세요.
- **플러그인**: Karma 플러그인에 대응하는 Vitest 플러그인을 찾아 설치해야 할 수 있습니다.
  코드 커버리지는 Angular CLI에서 기본 기능으로 지원하며 `ng test --coverage`로 활성화할 수 있습니다.
- **커스텀 브라우저 런처**: `angular.json`의 `browsers` 옵션과 `@vitest/browser-playwright` 같은 브라우저 프로바이더 설치로 대체합니다.

다른 설정은 [Vitest 공식 문서](https://vitest.dev/config/)를 참고하세요.

<!--
### 4. Remove Karma and `test.ts` files
-->

<a id="4-remove-karma-and-testts-files"></a>

### 4. Karma와 `test.ts` 파일 제거하기

<!--
You can now delete `karma.conf.js` and `src/test.ts` from your project and uninstall the Karma-related packages. The following commands are based on the packages installed in a new Angular CLI project; your project may have other Karma-related packages to remove.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="bun" language="shell">
    bun remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
</docs-code-multifile>
-->

이제 프로젝트에서 `karma.conf.js`, `src/test.ts`를 삭제하고 Karma 관련 패키지를 제거할 수 있습니다.
다음 명령은 새 Angular CLI 프로젝트에 설치되는 패키지를 기준으로 합니다.
프로젝트에 따라 제거해야 할 다른 Karma 관련 패키지가 있을 수도 있습니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
  <docs-code header="bun" language="shell">
    bun remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core
  </docs-code>
</docs-code-multifile>

<!--
### 5. Configure browser mode (optional)
-->

<a id="5-configure-browser-mode-optional"></a>

### 5. 브라우저 모드 설정하기(선택 사항)

<!--
If you need to run tests in a real browser, you must install a browser provider and configure your `angular.json`.

**Install a browser provider:**

Choose one of the following browser providers based on your needs:

- **Playwright**: `@vitest/browser-playwright` for Chromium, Firefox, and WebKit.
- **WebdriverIO**: `@vitest/browser-webdriverio` for Chrome, Firefox, Safari, and Edge.
- **Preview**: `@vitest/browser-preview` for WebContainer environments (like StackBlitz).

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-playwright
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-playwright
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-playwright
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-playwright
  </docs-code>
</docs-code-multifile>

**Update `angular.json` for browser mode:**

Add the `browsers` option to your `test` target's options. The browser name depends on the provider you installed (e.g., `chromium` for Playwright, `chrome` for WebdriverIO).

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "browsers": ["chromium"]
          }
        }
      }
    }
  }
}
```

Headless mode is enabled automatically if the `CI` environment variable is set or if a browser name includes "Headless" (e.g., `ChromeHeadless`). Otherwise, tests will run in a headed browser.
-->

실제 브라우저에서 테스트를 실행해야 한다면 브라우저 프로바이더를 설치하고 `angular.json`을 설정해야 합니다.

**브라우저 프로바이더를 설치합니다.**

필요에 맞게 다음 프로바이더 중 하나를 선택하세요.

- **Playwright**: Chromium, Firefox, WebKit에는 `@vitest/browser-playwright`를 사용합니다.
- **WebdriverIO**: Chrome, Firefox, Safari, Edge에는 `@vitest/browser-webdriverio`를 사용합니다.
- **Preview**: StackBlitz와 같은 WebContainer 환경에는 `@vitest/browser-preview`를 사용합니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/browser-playwright
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/browser-playwright
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/browser-playwright
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/browser-playwright
  </docs-code>
</docs-code-multifile>

**브라우저 모드에 맞게 `angular.json`을 수정합니다.**

`test` 타깃의 옵션에 `browsers`를 추가합니다.
브라우저 이름은 설치한 프로바이더에 따라 다릅니다.
예를 들어 Playwright는 `chromium`, WebdriverIO는 `chrome`을 사용합니다.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "browsers": ["chromium"]
          }
        }
      }
    }
  }
}
```

`CI` 환경 변수가 설정되어 있거나 브라우저 이름에 "Headless"가 포함되어 있으면(예: `ChromeHeadless`) 헤드리스 모드가 자동으로 활성화됩니다.
그렇지 않으면 브라우저 창을 표시해서 테스트를 실행합니다.

<!--
## Automated test refactoring with schematics
-->

<a id="automated-test-refactoring-with-schematics"></a>

## 스키매틱으로 테스트 자동 리팩토링하기

<!--
IMPORTANT: The `refactor-jasmine-vitest` schematic is experimental and may not cover all possible test patterns. Always review the changes made by the schematic.

The Angular CLI provides the `refactor-jasmine-vitest` schematic to automatically refactor your Jasmine tests to use Vitest.
-->

중요: `refactor-jasmine-vitest` 스키매틱은 실험적 기능이며 모든 테스트 패턴을 처리하지 못할 수 있습니다.
스키매틱이 수정한 내용은 반드시 검토하세요.

Angular CLI는 Jasmine 테스트를 Vitest용으로 자동 리팩토링하는 `refactor-jasmine-vitest` 스키매틱을 제공합니다.

<!--
### Overview
-->

<a id="overview"></a>

### 개요

<!--
The schematic automates the following transformations in your test files (`.spec.ts`):

- Converts `fit` and `fdescribe` to `it.only` and `describe.only`.
- Converts `xit` and `xdescribe` to `it.skip` and `describe.skip`.
- Converts `spyOn` calls to the equivalent `vi.spyOn`.
- Replaces `jasmine.objectContaining` with `expect.objectContaining`.
- Replaces `jasmine.any` with `expect.any`.
- Replaces `jasmine.createSpy` with `vi.fn`.
- Updates `beforeAll`, `beforeEach`, `afterAll`, and `afterEach` to their Vitest equivalents.
- Converts `fail()` to Vitest's `vi.fail()`.
- Adjusts expectations to match Vitest APIs
- Adds TODO comments for code that cannot be automatically converted

The schematic **does not** perform the following actions:

- It does not install `vitest` or other related dependencies.
- It does not change your `angular.json` to use the Vitest builder or migrate any build options (like `polyfills` or `styles`) from the `test` target.
- It does not remove `karma.conf.js` or `test.ts` files.
- It does not handle complex or nested spy scenarios, which may require manual refactoring.
-->

스키매틱은 테스트 파일(`.spec.ts`)을 다음과 같이 자동으로 변환합니다.

- `fit`, `fdescribe`를 `it.only`, `describe.only`로 변환합니다.
- `xit`, `xdescribe`를 `it.skip`, `describe.skip`으로 변환합니다.
- `spyOn` 호출을 대응하는 `vi.spyOn`으로 변환합니다.
- `jasmine.objectContaining`을 `expect.objectContaining`으로 교체합니다.
- `jasmine.any`를 `expect.any`로 교체합니다.
- `jasmine.createSpy`를 `vi.fn`으로 교체합니다.
- `beforeAll`, `beforeEach`, `afterAll`, `afterEach`를 Vitest에 맞게 수정합니다.
- `fail()`을 Vitest의 `vi.fail()`로 변환합니다.
- 검증문을 Vitest API에 맞게 조정합니다.
- 자동으로 변환할 수 없는 코드에는 TODO 주석을 추가합니다.

스키매틱은 다음 작업은 **수행하지 않습니다**.

- `vitest`나 관련 의존성을 설치하지 않습니다.
- `angular.json`이 Vitest 빌더를 사용하도록 변경하거나, `test` 타깃의 빌드 옵션(예: `polyfills`, `styles`)을 이전하지 않습니다.
- `karma.conf.js`나 `test.ts` 파일을 제거하지 않습니다.
- 복잡하거나 중첩된 스파이 사용 사례를 처리하지 않습니다.
  이런 경우에는 직접 리팩토링해야 할 수 있습니다.

<!--
### Running the schematic
-->

<a id="running-the-schematic"></a>

### 스키매틱 실행하기

<!--
Once your project is configured for Vitest, you can run the schematic to refactor your test files.

To refactor **all** test files in your default project, run:

```bash
ng g @schematics/angular:refactor-jasmine-vitest
```
-->

프로젝트의 Vitest 설정이 끝나면 스키매틱을 실행해서 테스트 파일을 리팩토링할 수 있습니다.

기본 프로젝트의 **모든** 테스트 파일을 리팩토링하려면 다음 명령을 실행하세요.

```bash
ng g @schematics/angular:refactor-jasmine-vitest
```

<!--
### Options
-->

<a id="options"></a>

### 옵션

<!--
You can use the following options to customize the schematic's behavior:

| Option                   | Description                                                                                         |
| :----------------------- | :-------------------------------------------------------------------------------------------------- |
| `--project <name>`       | Specify the project to refactor in a multi-project workspace. <br> Example: `--project=my-lib`      |
| `--include <path>`       | Refactor only a specific file or directory. <br> Example: `--include=src/app/app.component.spec.ts` |
| `--file-suffix <suffix>` | Specify a different file suffix for test files. <br> Example: `--file-suffix=.test.ts`              |
| `--add-imports`          | Add explicit `vitest` imports if you have disabled globals in your Vitest configuration.            |
| `--verbose`              | See detailed logging of all transformations applied.                                                |
| `--browser-mode`         | If you intend to run the tests in browser mode.                                                     |
-->

다음 옵션으로 스키매틱 동작을 조정할 수 있습니다.

| 옵션                     | 설명                                                                                                |
| :----------------------- | :-------------------------------------------------------------------------------------------------- |
| `--project <name>`       | 여러 프로젝트가 있는 워크스페이스에서 리팩토링할 프로젝트를 지정합니다. <br> 예: `--project=my-lib` |
| `--include <path>`       | 특정 파일이나 디렉터리만 리팩토링합니다. <br> 예: `--include=src/app/app.component.spec.ts`         |
| `--file-suffix <suffix>` | 테스트 파일의 접미사를 다르게 지정합니다. <br> 예: `--file-suffix=.test.ts`                         |
| `--add-imports`          | Vitest 설정에서 전역 함수를 비활성화했다면 명시적인 `vitest` import를 추가합니다.                   |
| `--verbose`              | 적용한 모든 변환의 상세 로그를 표시합니다.                                                          |
| `--browser-mode`         | 브라우저 모드에서 테스트를 실행할 예정이면 지정합니다.                                              |

<!--
### After migrating
-->

<a id="after-migrating"></a>

### 이전 후 확인하기

<!--
After the schematic completes, it's a good practice to:

1.  **Run your tests**: Execute `ng test` to ensure that all tests still pass after the refactoring.
2.  **Review the changes**: Look over the changes made by the schematic, paying close attention to any complex tests, especially those with intricate spies or mocks, as they may require further manual adjustments.

The `ng test` command builds the application in _watch mode_ and launches the configured runner. Watch mode is enabled by default when using an interactive terminal and not running on CI.
-->

스키매틱 실행이 끝나면 다음 내용을 확인하는 것이 좋습니다.

1. **테스트 실행**: `ng test`를 실행해서 리팩토링한 후에도 모든 테스트가 통과하는지 확인하세요.
2. **변경사항 검토**: 스키매틱이 수정한 내용을 살펴보세요.
   특히 복잡한 스파이나 목이 있는 테스트는 추가로 직접 수정해야 할 수 있으므로 주의해서 확인하세요.

`ng test` 명령은 애플리케이션을 _변경 감시 모드_ 로 빌드하고 설정한 러너를 실행합니다.
CI 환경이 아닌 대화형 터미널에서는 변경 감시 모드가 기본으로 활성화됩니다.

<!--
## Configuration
-->

<a id="configuration"></a>

## 환경 설정

<!--
The Angular CLI takes care of the Vitest configuration for you, constructing the full configuration in memory based on options in `angular.json`.
-->

Angular CLI는 `angular.json`의 옵션을 바탕으로 전체 Vitest 설정을 메모리에 구성합니다.

<!--
### Custom Vitest configuration
-->

<a id="custom-vitest-configuration"></a>

### 커스텀 Vitest 설정

<!--
IMPORTANT: While using a custom configuration enables advanced options, the Angular team does not provide direct support for the specific contents of the configuration file or for any third-party plugins used within it. The CLI will also override certain properties (`test.projects`, `test.include`) to ensure proper operation.

You can provide a custom Vitest configuration file to override the default settings. For a full list of available options, see the official [Vitest documentation](https://vitest.dev/config/).

**1. Direct path:**
Provide a direct path to a Vitest configuration file in your `angular.json`:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {"runnerConfig": "vitest.config.ts"}
        }
      }
    }
  }
}
```

**2. Automatic search for base configuration:**
If you set `runnerConfig` to `true`, the builder will automatically search for a shared `vitest-base.config.*` file in your project and workspace roots.
-->

중요: 커스텀 설정으로 고급 옵션을 사용할 수 있지만, Angular 팀은 설정 파일의 구체적인 내용이나 사용하는 서드 파티 플러그인을 직접 지원하지 않습니다.
또한 CLI는 올바르게 동작하도록 일부 프로퍼티(`test.projects`, `test.include`)를 덮어씁니다.

커스텀 Vitest 설정 파일로 기본 설정을 덮어쓸 수 있습니다.
전체 옵션은 [Vitest 공식 문서](https://vitest.dev/config/)를 참고하세요.

**1. 경로 직접 지정하기:**
`angular.json`에 Vitest 설정 파일의 경로를 직접 지정합니다.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {"runnerConfig": "vitest.config.ts"}
        }
      }
    }
  }
}
```

**2. 기본 설정 자동 검색하기:**
`runnerConfig`를 `true`로 설정하면 빌더가 프로젝트와 워크스페이스의 최상위 디렉터리에서 공유 `vitest-base.config.*` 파일을 자동으로 찾습니다.

<!--
## `zone.js` Vitest patch
-->

<a id="zonejs-vitest-patch"></a>

## `zone.js` Vitest 패치

<!--
In order to use functions like `fakeAsync`, `flush` or `waitForAsync`, or to enable your existing tests to work with them, you can add `zone.js/plugins/vitest-patch` to your test target polyfills in `angular.json`.

Regardless, we strongly recommend you start planning to convert your existing test suites to native `async` and Vitest fake timers, since this is the established approach.

See [an example here](/guide/testing/components-scenarios#async-test-with-a-vitest-fake-timers) for fake timers usage with Vitest.
-->

`fakeAsync`, `flush`, `waitForAsync` 같은 함수를 사용하거나 기존 테스트에서 계속 사용하려면 `angular.json`의 테스트 타깃 폴리필에 `zone.js/plugins/vitest-patch`를 추가할 수 있습니다.

이와 관계없이 기존 테스트 모음을 네이티브 `async`와 Vitest 가상 타이머를 사용하도록 전환할 계획을 세우는 것을 적극 권장합니다.
이것이 일반적으로 사용하는 방식입니다.

Vitest의 가상 타이머 사용 방법은 [이 예제](/guide/testing/components-scenarios#async-test-with-a-vitest-fake-timers)를 참고하세요.

<!--
## Bug reports
-->

<a id="bug-reports"></a>

## 버그 제보

<!--
Report issues and feature requests on [GitHub](https://github.com/angular/angular-cli/issues).

Please provide a minimal reproduction where possible to aid the team in addressing issues.
-->

문제나 기능 요청은 [GitHub](https://github.com/angular/angular-cli/issues)에 등록하세요.

팀에서 문제를 해결하기 쉽도록 가능하면 최소한의 재현 예제를 함께 제공해 주세요.
