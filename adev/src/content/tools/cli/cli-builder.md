<!--
# Angular CLI builders
-->

<a id="angular-cli-builders"></a>

# Angular CLI 빌더

<!--
A number of Angular CLI commands run a complex process on your code, such as building, testing, or serving your application.
The commands use an internal tool called Architect to run _CLI builders_, which invoke another tool (bundler, test runner, server) to accomplish the desired task.
Custom builders can perform an entirely new task, or to change which third-party tool is used by an existing command.

This document explains how CLI builders integrate with the workspace configuration file, and shows how you can create your own builder.

HELPFUL: Find the code from the examples used here in this [GitHub repository](https://github.com/mgechev/cli-builders-demo).
-->

여러 Angular CLI 명령어는 애플리케이션 빌드, 테스트, 실행과 같이 코드에 복잡한 작업을 수행합니다.
이 명령어는 Architect라는 내부 도구를 사용해서 _CLI 빌더_ 를 실행하며, 빌더는 다른 도구(번들러, 테스트 실행기, 서버)를 호출해서 원하는 작업을 수행합니다.
커스텀 빌더로 완전히 새로운 작업을 수행하거나 기존 명령어가 사용하는 서드 파티 도구를 변경할 수 있습니다.

이 문서에서는 CLI 빌더가 워크스페이스 설정 파일과 어떻게 통합되는지 설명하고 직접 빌더를 만드는 방법을 알아봅니다.

도움말: 여기에서 사용하는 예제 코드는 [GitHub 저장소](https://github.com/mgechev/cli-builders-demo)에서 확인할 수 있습니다.

<!--
## CLI builders
-->

<a id="cli-builders"></a>

## CLI 빌더

<!--
The internal Architect tool delegates work to handler functions called _builders_.
A builder handler function receives two arguments:

| Argument  | Type             |
| :-------- | :--------------- |
| `options` | `JSONObject`     |
| `context` | `BuilderContext` |

The separation of concerns here is the same as with [schematics](tools/cli/schematics-authoring), which are used for other CLI commands that touch your code (such as `ng generate`).

- The `options` object is provided by the CLI user's options and configuration, while the `context` object is provided by the CLI Builder API automatically.
- In addition to the contextual information, the `context` object also provides access to a scheduling method, `context.scheduleTarget()`.
  The scheduler executes the builder handler function with a given target configuration.

The builder handler function can be synchronous (return a value), asynchronous (return a `Promise`), or watch and return multiple values (return an `Observable`).
The return values must always be of type `BuilderOutput`.
This object contains a Boolean `success` field and an optional `error` field that can contain an error message.

Angular provides some builders that are used by the CLI for commands such as `ng build` and `ng test`.
Default target configurations for these and other built-in CLI builders can be found and configured in the "architect" section of the [workspace configuration file](reference/configs/workspace-config), `angular.json`.
Also, extend and customize Angular by creating your own builders, which you can run directly using the [`ng run` CLI command](cli/run).
-->

내부 도구인 Architect는 _빌더_ 라고 부르는 핸들러 함수에 작업을 위임합니다.
빌더 핸들러 함수는 두 인자를 받습니다:

| 인자      | 타입             |
| :-------- | :--------------- |
| `options` | `JSONObject`     |
| `context` | `BuilderContext` |

여기서 관심사를 분리하는 방식은 `ng generate`처럼 코드를 변경하는 다른 CLI 명령어에서 사용하는 [스키매틱](tools/cli/schematics-authoring)과 같습니다.

- `options` 객체는 CLI 사용자가 지정한 옵션과 설정으로 구성되며 `context` 객체는 CLI Builder API가 자동으로 제공합니다.
- `context` 객체는 실행 맥락에 대한 정보 외에도 스케줄링 메서드인 `context.scheduleTarget()`을 제공합니다.
  스케줄러는 지정한 대상 설정으로 빌더 핸들러 함수를 실행합니다.

빌더 핸들러 함수는 동기적으로 값을 반환하거나 비동기적으로 `Promise`를 반환할 수 있으며, 변경을 감지하면서 여러 값을 반환하도록 `Observable`을 반환할 수도 있습니다.
반환값은 항상 `BuilderOutput` 타입이어야 합니다.
이 객체에는 불리언 `success` 필드와 오류 메시지를 담을 수 있는 선택적인 `error` 필드가 있습니다.

Angular는 CLI가 `ng build`, `ng test` 등의 명령어에서 사용하는 빌더를 제공합니다.
이 빌더와 다른 기본 CLI 빌더의 기본 대상 설정은 [워크스페이스 설정 파일](reference/configs/workspace-config)인 `angular.json`의 "architect" 항목에서 확인하고 변경할 수 있습니다.
직접 빌더를 만들어 Angular를 확장하고 원하는 방식으로 구성할 수도 있으며, 이 빌더는 [`ng run` CLI 명령어](cli/run)로 바로 실행할 수 있습니다.

<!--
### Builder project structure
-->

<a id="builder-project-structure"></a>

### 빌더 프로젝트 구조

<!--
A builder resides in a "project" folder that is similar in structure to an Angular workspace, with global configuration files at the top level, and more specific configuration in a source folder with the code files that define the behavior.
For example, your `myBuilder` folder could contain the following files.

| Files                    | Purpose                                                                                                   |
| :----------------------- | :-------------------------------------------------------------------------------------------------------- |
| `src/my-builder.ts`      | Main source file for the builder definition.                                                              |
| `src/my-builder.spec.ts` | Source file for tests.                                                                                    |
| `src/schema.json`        | Definition of builder input options.                                                                      |
| `builders.json`          | Builders definition.                                                                                      |
| `package.json`           | Dependencies. See [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json). |
| `tsconfig.json`          | [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).              |

Builders can be published to `npm`, see [Publishing your Library](tools/libraries/creating-libraries).
-->

빌더는 Angular 워크스페이스와 비슷한 구조의 "프로젝트" 폴더에 위치합니다.
최상위에는 전역 설정 파일이 있고, 소스 폴더에는 구체적인 설정과 동작을 정의하는 코드 파일이 있습니다.
예를 들어 `myBuilder` 폴더는 다음 파일을 포함할 수 있습니다.

| 파일                     | 용도                                                                                                               |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `src/my-builder.ts`      | 빌더를 정의하는 주요 소스 파일입니다.                                                                              |
| `src/my-builder.spec.ts` | 테스트 소스 파일입니다.                                                                                            |
| `src/schema.json`        | 빌더 입력 옵션을 정의합니다.                                                                                       |
| `builders.json`          | 빌더를 정의합니다.                                                                                                 |
| `package.json`           | 의존성입니다. [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)을 참고하세요. |
| `tsconfig.json`          | [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다.                          |

빌더는 `npm`에 배포할 수 있습니다.
[라이브러리 배포하기](tools/libraries/creating-libraries)를 참고하세요.

<!--
## Creating a builder
-->

<a id="creating-a-builder"></a>

## 빌더 만들기

<!--
As an example, create a builder that copies a file to a new location.
To create a builder, use the `createBuilder()` CLI Builder function, and return a `Promise<BuilderOutput>` object.

<docs-code header="src/my-builder.ts (builder skeleton)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="builder-skeleton"/>

Now let's add some logic to it.
The following code retrieves the source and destination file paths from user options and copies the file from the source to the destination \(using the [Promise version of the built-in Node.js `copyFile()` function](https://nodejs.org/api/fs.html#fs_fspromises_copyfile_src_dest_mode)\).
If the copy operation fails, it returns an error with a message about the underlying problem.

<docs-code header="src/my-builder.ts (builder)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="builder"/>
-->

예제로 파일을 새 위치에 복사하는 빌더를 만들어 봅시다.
빌더는 CLI Builder의 `createBuilder()` 함수로 생성하고 `Promise<BuilderOutput>` 객체를 반환하도록 작성합니다.

<docs-code header="src/my-builder.ts (빌더 기본 구조)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="builder-skeleton"/>

이제 로직을 추가해 봅시다.
다음 코드는 사용자 옵션에서 원본 및 대상 파일 경로를 가져온 뒤 파일을 원본에서 대상으로 복사합니다([Node.js 내장 `copyFile()` 함수의 Promise 버전](https://nodejs.org/api/fs.html#fs_fspromises_copyfile_src_dest_mode)을 사용합니다).
복사에 실패하면 문제의 원인을 설명하는 메시지와 함께 오류를 반환합니다.

<docs-code header="src/my-builder.ts (빌더)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="builder"/>

<!--
### Handling output
-->

<a id="handling-output"></a>

### 출력 처리하기

<!--
By default, `copyFile()` does not print anything to the process standard output or error.
If an error occurs, it might be difficult to understand exactly what the builder was trying to do when the problem occurred.
Add some additional context by logging additional information using the `Logger` API.
This also lets the builder itself be executed in a separate process, even if the standard output and error are deactivated.

You can retrieve a `Logger` instance from the context.

<docs-code header="src/my-builder.ts (handling output)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="handling-output"/>
-->

`copyFile()`은 기본적으로 프로세스의 표준 출력이나 표준 오류에 아무것도 출력하지 않습니다.
오류가 발생하면 당시 빌더가 정확히 어떤 작업을 하려 했는지 파악하기 어려울 수 있습니다.
`Logger` API로 추가 정보를 기록해서 실행 맥락을 더 제공하세요.
이렇게 하면 표준 출력과 표준 오류를 비활성화한 상태에서도 빌더 자체를 별도 프로세스로 실행할 수 있습니다.

컨텍스트에서 `Logger` 인스턴스를 가져올 수 있습니다.

<docs-code header="src/my-builder.ts (출력 처리)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="handling-output"/>

<!--
### Progress and status reporting
-->

<a id="progress-and-status-reporting"></a>

### 진행률과 상태 보고하기

<!--
The CLI Builder API includes progress and status reporting tools, which can provide hints for certain functions and interfaces.

To report progress, use the `context.reportProgress()` method, which takes a current value, optional total, and status string as arguments.
The total can be any number. For example, if you know how many files you have to process, the total could be the number of files, and current should be the number processed so far.
The status string is unmodified unless you pass in a new string value.

In our example, the copy operation either finishes or is still executing, so there's no need for a progress report, but you can report status so that a parent builder that called our builder would know what's going on.
Use the `context.reportStatus()` method to generate a status string of any length.

HELPFUL: There's no guarantee that a long string will be shown entirely; it could be cut to fit the UI that displays it.

Pass an empty string to remove the status.

<docs-code header="src/my-builder.ts (progress reporting)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="progress-reporting"/>
-->

CLI Builder API는 특정 기능과 인터페이스에 정보를 제공할 수 있는 진행률 및 상태 보고 도구를 포함합니다.

진행률을 보고하려면 현재 값, 선택적인 전체 값, 상태 문자열을 인자로 받는 `context.reportProgress()` 메서드를 사용합니다.
전체 값은 어떤 숫자든 사용할 수 있습니다.
예를 들어 처리해야 할 파일 수를 알고 있다면 전체 값은 파일 수가 되고 현재 값은 지금까지 처리한 파일 수가 됩니다.
상태 문자열은 새 문자열 값을 전달하지 않는 한 변경되지 않습니다.

이 예제의 복사 작업은 완료되었거나 실행 중인 상태만 있으므로 진행률을 보고할 필요는 없습니다.
하지만 이 빌더를 호출한 상위 빌더가 현재 상황을 알 수 있도록 상태를 보고할 수 있습니다.
`context.reportStatus()` 메서드로 길이에 제한 없이 상태 문자열을 지정하세요.

도움말: 긴 문자열이 항상 모두 표시되는 것은 아닙니다.
표시하는 UI에 맞춰 잘릴 수 있습니다.

상태를 제거하려면 빈 문자열을 전달하세요.

<docs-code header="src/my-builder.ts (진행률 보고)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="progress-reporting"/>

<!--
## Builder input
-->

<a id="builder-input"></a>

## 빌더 입력

<!--
You can invoke a builder indirectly through a CLI command such as `ng build`, or directly with the Angular CLI `ng run` command.
In either case, you must provide required inputs, but can let other inputs default to values that are pre-configured for a specific _target_, specified by a [configuration](tools/cli/environments), or set on the command line.
-->

빌더는 `ng build` 같은 CLI 명령어를 통해 간접적으로 호출하거나 Angular CLI의 `ng run` 명령어로 직접 호출할 수 있습니다.
어느 경우든 필수 입력은 제공해야 합니다.
나머지 입력에는 특정 _대상_ 에 미리 지정된 기본값, [설정](tools/cli/environments)에 지정된 값, 명령줄에서 지정한 값을 사용할 수 있습니다.

<!--
### Input validation
-->

<a id="input-validation"></a>

### 입력 유효성 검사

<!--
You define builder inputs in a JSON schema associated with that builder.
Similar to schematics, the Architect tool collects the resolved input values into an `options` object, and validates their types against the schema before passing them to the builder function.

For our example builder, `options` should be a `JsonObject` with two keys:
a `source` and a `destination`, each of which are a string.

You can provide the following schema for type validation of these values.

```json {header: "schema.json"}
{
  "$schema": "https://json-schema.org/schema",
  "type": "object",
  "properties": {
    "source": {
      "type": "string"
    },
    "destination": {
      "type": "string"
    }
  }
}
```

HELPFUL: This is a minimal example, but the use of a schema for validation can be very powerful.
For more information, see the [JSON schemas website](https://json-schema.org).

To link our builder implementation with its schema and name, you need to create a _builder definition_ file, which you can point to in `package.json`.

Create a file named `builders.json` that looks like this:

```json {header: "builders.json"}
{
  "builders": {
    "copy": {
      "implementation": "./dist/my-builder.js",
      "schema": "./src/schema.json",
      "description": "Copies a file."
    }
  }
}
```

In the `package.json` file, add a `builders` key that tells the Architect tool where to find our builder definition file.

```json {header: "package.json"}
{
  "name": "@example/copy-file",
  "version": "1.0.0",
  "description": "Builder for copying files",
  "builders": "builders.json",
  "dependencies": {
    "@angular/build": "^21.2.0"
  }
}
```

The official name of our builder is now `@example/copy-file:copy`.
The first part of this is the package name and the second part is the builder name as specified in the `builders.json` file.

These values are accessed on `options.source` and `options.destination`.

<docs-code header="src/my-builder.ts (report status)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="report-status"/>
-->

빌더 입력은 해당 빌더에 연결된 JSON 스키마에 정의합니다.
스키매틱과 마찬가지로 Architect는 최종 입력값을 `options` 객체에 모으고, 빌더 함수에 전달하기 전에 스키마를 기준으로 타입을 검증합니다.

이 예제 빌더의 `options`는 `source`와 `destination`이라는 두 키를 가진 `JsonObject`여야 하며, 두 값은 모두 문자열입니다.

다음 스키마로 이 값들의 타입을 검증할 수 있습니다.

```json {header: "schema.json"}
{
  "$schema": "https://json-schema.org/schema",
  "type": "object",
  "properties": {
    "source": {
      "type": "string"
    },
    "destination": {
      "type": "string"
    }
  }
}
```

도움말: 간단한 예제이지만 스키마를 활용하면 강력한 유효성 검사를 수행할 수 있습니다.
자세한 내용은 [JSON 스키마 웹사이트](https://json-schema.org)를 참고하세요.

빌더 구현을 스키마 및 이름과 연결하려면 _빌더 정의_ 파일을 생성하고 `package.json`에서 해당 파일을 가리키도록 해야 합니다.

다음과 같이 `builders.json` 파일을 생성하세요:

```json {header: "builders.json"}
{
  "builders": {
    "copy": {
      "implementation": "./dist/my-builder.js",
      "schema": "./src/schema.json",
      "description": "Copies a file."
    }
  }
}
```

`package.json`에 `builders` 키를 추가해서 Architect에 빌더 정의 파일의 위치를 알려주세요.

```json {header: "package.json"}
{
  "name": "@example/copy-file",
  "version": "1.0.0",
  "description": "Builder for copying files",
  "builders": "builders.json",
  "dependencies": {
    "@angular/build": "^21.2.0"
  }
}
```

이제 빌더의 공식 이름은 `@example/copy-file:copy`입니다.
앞부분은 패키지 이름이고 뒷부분은 `builders.json` 파일에 지정된 빌더 이름입니다.

입력값은 `options.source`와 `options.destination`으로 접근합니다.

<docs-code header="src/my-builder.ts (상태 보고)" path="adev/src/content/examples/cli-builder/src/my-builder.ts" region="report-status"/>

<!--
### Target configuration
-->

<a id="target-configuration"></a>

### 대상 설정

<!--
A builder must have a defined target that associates it with a specific input configuration and project.

Targets are defined in the `angular.json` [CLI configuration file](reference/configs/workspace-config).
A target specifies the builder to use, its default options configuration, and named alternative configurations.
Architect in the Angular CLI uses the target definition to resolve input options for a given run.

The `angular.json` file has a section for each project, and the "architect" section of each project configures targets for builders used by CLI commands such as 'build', 'test', and 'serve'.
By default, for example, the `ng build` command runs the builder `@angular/build:application` to perform the build task, and passes in default option values as specified for the `build` target in `angular.json`.

```json {header: "angular.json"}
{
  "myApp": {
    "...": "...",
    "architect": {
      "build": {
        "builder": "@angular/build:application",
        "options": {
          "outputPath": "dist/myApp",
          "index": "src/index.html",
          "...": "..."
        },
        "configurations": {
          "production": {
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }
            ],
            "optimization": true,
            "outputHashing": "all",
            "...": "..."
          }
        }
      },
      "...": "..."
    }
  }
}
```

The command passes the builder the set of default options specified in the "options" section.
If you pass the `--configuration=production` flag, it uses the override values specified in the `production` configuration.
Specify further option overrides individually on the command line.
-->

빌더에는 특정 입력 설정 및 프로젝트와 연결하는 대상이 정의되어 있어야 합니다.

대상은 `angular.json` [CLI 설정 파일](reference/configs/workspace-config)에 정의합니다.
대상에는 사용할 빌더, 기본 옵션 설정, 이름이 있는 대체 설정을 지정합니다.
Angular CLI의 Architect는 대상 정의를 사용해서 실행에 필요한 입력 옵션을 결정합니다.

`angular.json` 파일에는 프로젝트별 항목이 있으며, 각 프로젝트의 "architect" 항목은 'build', 'test', 'serve' 등의 CLI 명령어에서 사용하는 빌더의 대상을 설정합니다.
예를 들어 `ng build` 명령어는 기본적으로 `@angular/build:application` 빌더로 빌드 작업을 수행하고, `angular.json`의 `build` 대상에 지정된 기본 옵션 값을 전달합니다.

```json {header: "angular.json"}
{
  "myApp": {
    "...": "...",
    "architect": {
      "build": {
        "builder": "@angular/build:application",
        "options": {
          "outputPath": "dist/myApp",
          "index": "src/index.html",
          "...": "..."
        },
        "configurations": {
          "production": {
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }
            ],
            "optimization": true,
            "outputHashing": "all",
            "...": "..."
          }
        }
      },
      "...": "..."
    }
  }
}
```

명령어는 "options" 항목에 지정된 기본 옵션을 빌더에 전달합니다.
`--configuration=production` 플래그를 전달하면 `production` 설정에 지정된 값으로 덮어씁니다.
명령줄에서 개별 옵션을 지정하면 추가로 덮어쓸 수 있습니다.

<!--
#### Target strings
-->

<a id="target-strings"></a>

#### 대상 문자열

<!--
The generic `ng run` CLI command takes as its first argument a target string of the following form.

```shell

project:target[:configuration]

```

|               | Details                                                                                                               |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- |
| project       | The name of the Angular CLI project that the target is associated with.                                               |
| target        | A named builder configuration from the `architect` section of the `angular.json` file.                                |
| configuration | (optional) The name of a specific configuration override for the given target, as defined in the `angular.json` file. |

If your builder calls another builder, it might need to read a passed target string.
Parse this string into an object by using the `targetFromTargetString()` utility function from `@angular-devkit/architect`.
-->

범용 CLI 명령어인 `ng run`은 첫 번째 인자로 다음 형식의 대상 문자열을 받습니다.

```shell

project:target[:configuration]

```

| 항목          | 설명                                                                                     |
| :------------ | :--------------------------------------------------------------------------------------- |
| project       | 대상이 연결된 Angular CLI 프로젝트의 이름입니다.                                         |
| target        | `angular.json` 파일의 `architect` 항목에 정의된 이름 있는 빌더 설정입니다.               |
| configuration | 선택 사항입니다. `angular.json` 파일에서 해당 대상에 정의한 특정 대체 설정의 이름입니다. |

빌더에서 다른 빌더를 호출할 때 전달받은 대상 문자열을 읽어야 할 수 있습니다.
`@angular-devkit/architect`의 `targetFromTargetString()` 유틸리티 함수로 이 문자열을 객체로 파싱하세요.

<!--
## Schedule and run
-->

<a id="schedule-and-run"></a>

## 예약하고 실행하기

<!--
Architect runs builders asynchronously.
To invoke a builder, you schedule a task to be run when all configuration resolution is complete.

The builder function is not executed until the scheduler returns a `BuilderRun` control object.
The CLI typically schedules tasks by calling the `context.scheduleTarget()` function, and then resolves input options using the target definition in the `angular.json` file.

Architect resolves input options for a given target by taking the default options object, then overwriting values from the configuration, then further overwriting values from the overrides object passed to `context.scheduleTarget()`.
For the Angular CLI, the overrides object is built from command line arguments.

Architect validates the resulting options values against the schema of the builder.
If inputs are valid, Architect creates the context and executes the builder.

For more information see [Workspace Configuration](reference/configs/workspace-config).

HELPFUL: You can also invoke a builder directly from another builder or test by calling `context.scheduleBuilder()`.
You pass an `options` object directly to the method, and those option values are validated against the schema of the builder without further adjustment.

Only the `context.scheduleTarget()` method resolves the configuration and overrides through the `angular.json` file.
-->

Architect는 빌더를 비동기로 실행합니다.
빌더를 호출하려면 모든 설정의 해석이 끝났을 때 실행할 작업을 예약합니다.

빌더 함수는 스케줄러가 `BuilderRun` 제어 객체를 반환한 이후에 실행됩니다.
CLI는 일반적으로 `context.scheduleTarget()` 함수로 작업을 예약한 뒤 `angular.json` 파일의 대상 정의를 사용해서 입력 옵션을 결정합니다.

Architect는 주어진 대상의 기본 옵션 객체를 가져온 뒤 설정 값으로 덮어쓰고, 다시 `context.scheduleTarget()`에 전달한 재정의 객체의 값으로 덮어써서 입력 옵션을 결정합니다.
Angular CLI에서는 명령줄 인자로 재정의 객체를 구성합니다.

Architect는 최종 옵션 값을 빌더의 스키마에 따라 검증합니다.
입력이 유효하면 컨텍스트를 생성하고 빌더를 실행합니다.

자세한 내용은 [워크스페이스 설정](reference/configs/workspace-config)을 참고하세요.

도움말: 다른 빌더나 테스트에서 `context.scheduleBuilder()`를 호출해서 빌더를 직접 실행할 수도 있습니다.
이 메서드에는 `options` 객체를 직접 전달하며, 추가 조정 없이 해당 옵션 값을 빌더의 스키마에 따라 검증합니다.

`angular.json` 파일을 통해 설정과 재정의 값을 해석하는 것은 `context.scheduleTarget()` 메서드뿐입니다.

<!--
### Default architect configuration
-->

<a id="default-architect-configuration"></a>

### 기본 Architect 설정

<!--
Let's create a simple `angular.json` file that puts target configurations into context.

You can publish the builder to npm (see [Publishing your Library](tools/libraries/creating-libraries#publishing-your-library)), and install it using the following command:

```shell

npm install @example/copy-file

```

If you create a new project with `ng new builder-test`, the generated `angular.json` file looks something like this, with only default builder configurations.

```json {header: "angular.json"}
{
  "projects": {
    "builder-test": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json"
          },
          "configurations": {
            "production": {
              "optimization": true,
              "aot": true
            }
          }
        }
      }
    }
  }
}
```
-->

대상 설정을 구체적으로 살펴볼 수 있도록 간단한 `angular.json` 파일을 만들어 봅시다.

빌더를 npm에 배포한 뒤([라이브러리 배포하기](tools/libraries/creating-libraries#publishing-your-library) 참고) 다음 명령어로 설치할 수 있습니다:

```shell

npm install @example/copy-file

```

`ng new builder-test`로 새 프로젝트를 만들면 기본 빌더 설정만 포함한 다음과 같은 `angular.json` 파일이 생성됩니다.

```json {header: "angular.json"}
{
  "projects": {
    "builder-test": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json"
          },
          "configurations": {
            "production": {
              "optimization": true,
              "aot": true
            }
          }
        }
      }
    }
  }
}
```

<!--
### Adding a target
-->

<a id="adding-a-target"></a>

### 대상 추가하기

<!--
Add a new target that will run our builder to copy a file.
This target tells the builder to copy the `package.json` file.

- We will add a new target section to the `architect` object for our project
- The target named `copy-package` uses our builder, which you published to `@example/copy-file`.
- The options object provides default values for the two inputs that you defined.
  - `source` - The existing file you are copying.
  - `destination` - The path you want to copy to.

```json {header: "angular.json"}
{
  "projects": {
    "builder-test": {
      "architect": {
        "copy-package": {
          "builder": "@example/copy-file:copy",
          "options": {
            "source": "package.json",
            "destination": "package-copy.json"
          }
        }
        // Existing targets...
      }
    }
  }
}
```
-->

빌더를 실행해서 파일을 복사하는 새 대상을 추가하세요.
이 대상은 빌더에 `package.json` 파일을 복사하도록 지시합니다.

- 프로젝트의 `architect` 객체에 새 대상 항목을 추가합니다.
- `copy-package`라는 대상은 `@example/copy-file`로 배포한 빌더를 사용합니다.
- 옵션 객체는 앞에서 정의한 두 입력의 기본값을 제공합니다.
  - `source` - 복사할 기존 파일입니다.
  - `destination` - 파일을 복사할 대상 경로입니다.

```json {header: "angular.json"}
{
  "projects": {
    "builder-test": {
      "architect": {
        "copy-package": {
          "builder": "@example/copy-file:copy",
          "options": {
            "source": "package.json",
            "destination": "package-copy.json"
          }
        }
        // 기존 대상...
      }
    }
  }
}
```

<!--
### Running the builder
-->

<a id="running-the-builder"></a>

### 빌더 실행하기

<!--
To run our builder with the new target's default configuration, use the following CLI command.

```shell

ng run builder-test:copy-package

```

This copies the `package.json` file to `package-copy.json`.

Use command-line arguments to override the configured defaults.
For example, to run with a different `destination` value, use the following CLI command.

```shell

ng run builder-test:copy-package --destination=package-other.json

```

This copies the file to `package-other.json` instead of `package-copy.json`.
Because you did not override the _source_ option, it will still copy from the default `package.json` file.
-->

새 대상의 기본 설정으로 빌더를 실행하려면 다음 CLI 명령어를 사용하세요.

```shell

ng run builder-test:copy-package

```

이 명령어는 `package.json` 파일을 `package-copy.json`으로 복사합니다.

설정된 기본값은 명령줄 인자로 덮어쓸 수 있습니다.
예를 들어 다른 `destination` 값으로 실행하려면 다음 CLI 명령어를 사용하세요.

```shell

ng run builder-test:copy-package --destination=package-other.json

```

이 명령어는 파일을 `package-copy.json` 대신 `package-other.json`으로 복사합니다.
_source_ 옵션은 덮어쓰지 않았으므로 원본 파일은 기본값인 `package.json`을 그대로 사용합니다.

<!--
## Testing a builder
-->

<a id="testing-a-builder"></a>

## 빌더 테스트하기

<!--
Use integration testing for your builder, so that you can use the Architect scheduler to create a context, as in this [example](https://github.com/mgechev/cli-builders-demo).
In the builder source directory, create a new test file `my-builder.spec.ts`. The test creates new instances of `JsonSchemaRegistry` (for schema validation), `TestingArchitectHost` (an in-memory implementation of `ArchitectHost`), and `Architect`.

Here's an example of a test that runs the copy file builder.
The test uses the builder to copy the `package.json` file and validates that the copied file's contents are the same as the source.

<docs-code header="src/my-builder.spec.ts" path="adev/src/content/examples/cli-builder/src/my-builder.spec.ts"/>

HELPFUL: When running this test in your repo, you need the [`ts-node`](https://github.com/TypeStrong/ts-node) package.
You can avoid this by renaming `my-builder.spec.ts` to `my-builder.spec.js`.
-->

빌더에는 통합 테스트를 사용하세요.
그러면 이 [예제](https://github.com/mgechev/cli-builders-demo)처럼 Architect 스케줄러로 컨텍스트를 생성할 수 있습니다.
빌더의 소스 디렉터리에 `my-builder.spec.ts` 테스트 파일을 만드세요.
테스트에서는 스키마 검증용 `JsonSchemaRegistry`, 메모리에서 동작하는 `ArchitectHost` 구현인 `TestingArchitectHost`, 그리고 `Architect`의 새 인스턴스를 생성합니다.

다음은 파일 복사 빌더를 실행하는 테스트 예제입니다.
이 테스트는 빌더로 `package.json` 파일을 복사한 뒤 복사된 파일의 내용이 원본과 같은지 검증합니다.

<docs-code header="src/my-builder.spec.ts" path="adev/src/content/examples/cli-builder/src/my-builder.spec.ts"/>

도움말: 저장소에서 이 테스트를 실행하려면 [`ts-node`](https://github.com/TypeStrong/ts-node) 패키지가 필요합니다.
`my-builder.spec.ts`의 이름을 `my-builder.spec.js`로 변경하면 이 패키지를 사용하지 않아도 됩니다.

<!--
### Watch mode
-->

<a id="watch-mode"></a>

<a id="변경-감지-모드"></a>

### 파일 감시 모드

<!--
Most builders to run once and return. However, this behavior is not entirely compatible with a builder that watches for changes (like a devserver, for example).
Architect can support watch mode, but there are some things to look out for.

- To be used with watch mode, a builder handler function should return an `Observable`.
  Architect subscribes to the `Observable` until it completes and might reuse it if the builder is scheduled again with the same arguments.

- The builder should always emit a `BuilderOutput` object after each execution.
  Once it's been executed, it can enter a watch mode, to be triggered by an external event.
  If an event triggers it to restart, the builder should execute the `context.reportRunning()` function to tell Architect that it is running again.
  This prevents Architect from stopping the builder if another run is scheduled.

When your builder calls `BuilderRun.stop()` to exit watch mode, Architect unsubscribes from the builder's `Observable` and calls the builder's teardown logic to clean up.
This behavior also allows for long-running builds to be stopped and cleaned up.

In general, if your builder is watching an external event, you should separate your run into three phases.

| Phases     | Details                                                                                                                                                                                                                                       |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running    | The task being performed, such as invoking a compiler. This ends when the compiler finishes and your builder emits a `BuilderOutput` object.                                                                                                  |
| Watching   | Between two runs, watch an external event stream. For example, watch the file system for any changes. This ends when the compiler restarts, and `context.reportRunning()` is called.                                                          |
| Completion | Either the task is fully completed, such as a compiler which needs to run a number of times, or the builder run was stopped (using `BuilderRun.stop()`). Architect executes teardown logic and unsubscribes from your builder's `Observable`. |
-->

대부분의 빌더는 한 번 실행한 뒤 반환합니다.
하지만 개발 서버처럼 변경 사항을 감지하는 빌더에는 이러한 동작 방식이 완전히 맞지는 않습니다.
Architect는 파일 감시 모드를 지원하지만 몇 가지 주의할 점이 있습니다.

- 파일 감시 모드에서 사용하려면 빌더 핸들러 함수가 `Observable`을 반환해야 합니다.
  Architect는 `Observable`이 완료될 때까지 구독하며, 같은 인자로 빌더가 다시 예약되면 이를 재사용할 수 있습니다.

- 빌더는 실행할 때마다 항상 `BuilderOutput` 객체를 방출해야 합니다.
  실행 후에는 외부 이벤트로 다시 실행할 수 있도록 파일 감시 모드로 들어갈 수 있습니다.
  이벤트 때문에 다시 시작할 때는 `context.reportRunning()` 함수를 호출해서 Architect에 다시 실행 중임을 알려야 합니다.
  그러면 다른 실행이 예약되어도 Architect가 빌더를 중지하지 않습니다.

파일 감시 모드를 종료하려고 `BuilderRun.stop()`을 호출하면 Architect는 빌더의 `Observable` 구독을 해제하고 빌더의 정리 로직을 호출합니다.
이 동작을 통해 오래 실행되는 빌드도 중지하고 정리할 수 있습니다.

일반적으로 외부 이벤트를 감지하는 빌더의 실행은 세 단계로 나누는 것이 좋습니다.

| 단계 | 설명                                                                                                                                                                                      |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 실행 | 컴파일러 호출 등의 작업을 수행합니다. 컴파일러가 작업을 마치고 빌더가 `BuilderOutput` 객체를 방출하면 끝납니다.                                                                           |
| 감지 | 두 실행 사이에 외부 이벤트 스트림을 감지합니다. 예를 들어 파일 시스템의 변경을 감지합니다. 컴파일러가 다시 시작하고 `context.reportRunning()`이 호출되면 끝납니다.                        |
| 완료 | 여러 번 실행해야 하는 컴파일러 등의 작업이 완전히 끝났거나 `BuilderRun.stop()`으로 빌더 실행이 중지된 상태입니다. Architect는 정리 로직을 실행하고 빌더의 `Observable` 구독을 해제합니다. |

<!--
## Summary
-->

<a id="summary"></a>

## 정리

<!--
The CLI Builder API provides a means of changing the behavior of the Angular CLI by using builders to execute custom logic.

- Builders can be synchronous or asynchronous, execute once or watch for external events, and can schedule other builders or targets.
- Builders have option defaults specified in the `angular.json` configuration file, which can be overwritten by an alternate configuration for the target, and further overwritten by command line flags
- The Angular team recommends that you use integration tests to test Architect builders. Use unit tests to validate the logic that the builder executes.
- If your builder returns an `Observable`, it should clean up the builder in the teardown logic of that `Observable`.
-->

CLI Builder API는 빌더에서 커스텀 로직을 실행해서 Angular CLI의 동작을 변경하는 방법을 제공합니다.

- 빌더는 동기 또는 비동기로 동작할 수 있고, 한 번 실행하거나 외부 이벤트를 감지할 수 있으며, 다른 빌더나 대상을 예약할 수 있습니다.
- 빌더 옵션의 기본값은 `angular.json` 설정 파일에 지정합니다.
  대상의 대체 설정으로 덮어쓸 수 있으며 명령줄 플래그로 다시 덮어쓸 수 있습니다.
- Angular 팀은 Architect 빌더를 테스트할 때 통합 테스트를 권장합니다.
  빌더가 실행하는 로직은 단위 테스트로 검증하세요.
- 빌더가 `Observable`을 반환한다면 해당 `Observable`의 정리 로직에서 빌더를 정리해야 합니다.
