<!--
# Code coverage
-->

<a id="code-coverage"></a>

# 코드 커버리지

<!--
Code coverage reports show you any parts of your code base that might not be properly tested by your unit tests.
-->

코드 커버리지 보고서로 코드 중에서 단위 테스트가 충분히 이루어지지 않은 부분을 확인할 수 있습니다.

<!--
## Prerequisites
-->

<a id="prerequisites"></a>

## 사전 준비

<!--
To generate code coverage reports with Vitest, you must install the `@vitest/coverage-v8` package:

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/coverage-v8
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/coverage-v8
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/coverage-v8
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/coverage-v8
  </docs-code>
</docs-code-multifile>
-->

Vitest로 코드 커버리지 보고서를 생성하려면 `@vitest/coverage-v8` 패키지를 설치해야 합니다.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install --save-dev @vitest/coverage-v8
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add --dev @vitest/coverage-v8
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add -D @vitest/coverage-v8
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add --dev @vitest/coverage-v8
  </docs-code>
</docs-code-multifile>

<!--
## Generating a report
-->

<a id="generating-a-report"></a>

## 보고서 생성하기

<!--
To generate a coverage report, add the `--coverage` flag to the `ng test` command:

```shell
ng test --coverage
```

After the tests run, the command creates a new `coverage/` directory in the project. Open the `index.html` file to see a report with your source code and code coverage values.

If you want to create code-coverage reports every time you test, you can set the `coverage` option to `true` in your `angular.json` file:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true
          }
        }
      }
    }
  }
}
```
-->

커버리지 보고서를 생성하려면 `ng test` 명령에 `--coverage` 플래그를 추가하세요.

```shell
ng test --coverage
```

테스트가 실행되면 프로젝트에 `coverage/` 디렉터리가 새로 생성됩니다.
`index.html` 파일을 열면 소스 코드와 코드 커버리지 수치가 담긴 보고서를 확인할 수 있습니다.

테스트를 실행할 때마다 코드 커버리지 보고서를 생성하려면 `angular.json` 파일에서 `coverage` 옵션을 `true`로 설정하세요.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true
          }
        }
      }
    }
  }
}
```

<!--
## Enforcing code coverage thresholds
-->

<a id="enforcing-code-coverage-thresholds"></a>

## 코드 커버리지 최솟값 적용하기

<!--
The code coverage percentages let you estimate how much of your code is tested. If your team decides on a minimum amount to be unit tested, you can enforce this minimum in your configuration.

For example, suppose you want the code base to have a minimum of 80% code coverage. To enable this, add the `coverageThresholds` option to your `angular.json` file:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true,
            "coverageThresholds": {
              "statements": 80,
              "branches": 80,
              "functions": 80,
              "lines": 80
            }
          }
        }
      }
    }
  }
}
```

Now, if your coverage drops below 80% when you run your tests, the command will fail.
-->

코드 커버리지 비율로 코드가 얼마나 테스트되었는지 가늠할 수 있습니다.
팀에서 단위 테스트로 검증할 최소 비율을 정했다면 설정을 통해 이 기준을 적용할 수 있습니다.

예를 들어 코드 커버리지를 최소 80%로 유지하려면 `angular.json` 파일에 `coverageThresholds` 옵션을 추가하세요.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true,
            "coverageThresholds": {
              "statements": 80,
              "branches": 80,
              "functions": 80,
              "lines": 80
            }
          }
        }
      }
    }
  }
}
```

이제 테스트를 실행했을 때 커버리지가 80%보다 낮으면 명령이 실패합니다.

<!--
## Advanced configuration
-->

<a id="advanced-configuration"></a>

## 고급 설정

<!--
You can configure several other coverage options in your `angular.json` file:

- `coverageInclude`: Glob patterns of files to include in the coverage report.
- `coverageExclude`: Glob patterns of files to exclude in the coverage report.
- `coverageReporters`: An array of reporters to use (e.g., `html`, `lcov`, `json`).
- `coverageWatermarks`: An object specifying `[low, high]` watermarks for the HTML reporter, which can affect the color-coding of the report.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true,
            "coverageReporters": ["html", "lcov"],
            "coverageWatermarks": {
              "statements": [50, 80],
              "branches": [50, 80],
              "functions": [50, 80],
              "lines": [50, 80]
            }
          }
        }
      }
    }
  }
}
```
-->

`angular.json` 파일에서 다음 커버리지 옵션도 설정할 수 있습니다.

- `coverageInclude`: 커버리지 보고서에 포함할 파일의 glob 패턴입니다.
- `coverageExclude`: 커버리지 보고서에서 제외할 파일의 glob 패턴입니다.
- `coverageReporters`: 사용할 리포터의 배열입니다.
  예를 들어 `html`, `lcov`, `json`을 사용할 수 있습니다.
- `coverageWatermarks`: HTML 리포터에 사용할 `[low, high]` 기준값을 지정하는 객체입니다.
  보고서의 색상 구분에 영향을 줄 수 있습니다.

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "coverage": true,
            "coverageReporters": ["html", "lcov"],
            "coverageWatermarks": {
              "statements": [50, 80],
              "branches": [50, 80],
              "functions": [50, 80],
              "lines": [50, 80]
            }
          }
        }
      }
    }
  }
}
```
