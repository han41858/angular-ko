<!--
# Angular CLI MCP Server setup
-->

<a id="angular-cli-mcp-server-setup"></a>

# Angular CLI MCP 서버 설정

<!--
The Angular CLI includes an experimental [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/) enabling AI assistants in your development environment to interact with the Angular CLI. We've included support for CLI powered code generation, adding packages, and more.
-->

Angular CLI에는 개발 환경의 AI 어시스턴트가 Angular CLI와 상호작용할 수 있는 실험적인 [모델 컨텍스트 프로토콜(MCP) 서버](https://modelcontextprotocol.io/)가 포함되어 있습니다.
CLI를 활용한 코드 생성, 패키지 추가 등의 기능을 지원합니다.

<!--
## Available Tools
-->

<a id="available-tools"></a>

## 사용할 수 있는 도구

<!--
The Angular CLI MCP server provides several tools to assist you in your development workflow. By default, the following tools are enabled:

| Name                        | Description                                                                                                                                                                                        | `local-only` | `read-only` |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: | :---------: |
| `ai_tutor`                  | Launches an interactive AI-powered Angular tutor. Recommended to run from a new Angular project using v20 or later. [Learn more](ai/ai-tutor).                                                     |      ✅      |     ✅      |
| `find_examples`             | Finds authoritative code examples from a curated database of official, best-practice examples, focusing on **modern, new, and recently updated** Angular features.                                 |      ✅      |     ✅      |
| `get_best_practices`        | Retrieves the Angular Best Practices Guide. This guide is essential for ensuring that all code adheres to modern standards, including standalone components, typed forms, and modern control flow. |      ✅      |     ✅      |
| `list_projects`             | Lists the names of all applications and libraries defined within an Angular workspace. It reads the `angular.json` configuration file to identify the projects.                                    |      ✅      |     ✅      |
| `onpush_zoneless_migration` | Analyzes Angular code and provides a step-by-step, iterative plan to migrate it to `OnPush` change detection, a prerequisite for a zoneless application.                                           |      ✅      |     ✅      |
| `search_documentation`      | Searches the official Angular documentation at <https://angular.dev>. This tool should be used to answer any questions about Angular, such as for APIs, tutorials, and best practices.             |      ❌      |     ✅      |
-->

Angular CLI MCP 서버는 개발 작업을 돕는 여러 도구를 제공합니다.
다음 도구는 기본적으로 활성화되어 있습니다:

| 이름                        | 설명                                                                                                                                                         | `local-only` | `read-only` |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: | :---------: |
| `ai_tutor`                  | AI 기반 대화형 Angular 튜터를 시작합니다. v20 이상의 새 Angular 프로젝트에서 실행하는 것을 권장합니다. [자세히 알아보기](ai/ai-tutor).                       |      ✅      |     ✅      |
| `find_examples`             | 엄선된 공식 모범 사례 예제 데이터베이스에서 신뢰할 수 있는 코드 예제를 찾습니다. **최신 기능, 새로운 기능, 최근 업데이트한 기능**을 중심으로 다룹니다.       |      ✅      |     ✅      |
| `get_best_practices`        | Angular 모범 사례 가이드를 가져옵니다. 이 가이드는 독립형 컴포넌트, 타입이 지정된 폼, 최신 제어 흐름 등 모든 코드가 최신 표준을 따르도록 하는 데 중요합니다. |      ✅      |     ✅      |
| `list_projects`             | Angular 작업 공간에 정의된 모든 애플리케이션과 라이브러리의 이름을 나열합니다. `angular.json` 설정 파일을 읽어 프로젝트를 확인합니다.                        |      ✅      |     ✅      |
| `onpush_zoneless_migration` | Angular 코드를 분석하고, 존리스 애플리케이션의 선행 조건인 `OnPush` 변경 감지 방식으로 전환하는 단계별 반복 계획을 제공합니다.                               |      ✅      |     ✅      |
| `search_documentation`      | <https://angular.dev>의 Angular 공식 문서를 검색합니다. API, 튜토리얼, 모범 사례 등 Angular에 관한 질문에 답할 때 이 도구를 사용해야 합니다.                 |      ❌      |     ✅      |

<!--
### Experimental Tools
-->

<a id="experimental-tools"></a>

### 실험적인 도구

<!--
Some tools are provided in experimental / preview status since they are new or not fully tested. Enable them individually with the [`--experimental-tool`](#command-options) option and use them with caution.

| Name                       | Description                                                                                                                                                                                                                                                         | `local-only` | `read-only` |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------: | :---------: |
| `build`                    | Perform a one-off, non-watched build using `ng build`.                                                                                                                                                                                                              |      ✅      |     ❌      |
| `devserver.start`          | Asynchronously starts a development server that watches the workspace for changes, similar to running `ng serve`. Since this is asynchronous it returns immediately. To manage the resulting server, use the `devserver.stop` and `devserver.wait_for_build` tools. |      ✅      |     ✅      |
| `devserver.stop`           | Stops a development server started by `devserver.start`.                                                                                                                                                                                                            |      ✅      |     ✅      |
| `devserver.wait_for_build` | Returns the output logs of the most recent build in a running development server started by `devserver.start`. If a build is currently ongoing, it will first wait for that build to complete and then return the logs.                                             |      ✅      |     ✅      |
| `e2e`                      | Executes the end-to-end tests configured in the project.                                                                                                                                                                                                            |      ✅      |     ✅      |
| `modernize`                | Performs code migrations and provides further instructions on how to modernize Angular code to align with the latest best practices and syntax. [Learn more](https://angular.dev/reference/migrations)                                                              |      ✅      |     ❌      |
| `test`                     | Runs the project's unit tests.                                                                                                                                                                                                                                      |      ✅      |     ✅      |
-->

일부 도구는 새로 추가되었거나 충분히 테스트되지 않아 실험 또는 프리뷰 상태로 제공됩니다.
[`--experimental-tool`](#command-options) 옵션으로 개별적으로 활성화하고 주의해서 사용하세요.

| 이름                       | 설명                                                                                                                                                                                                                   | `local-only` | `read-only` |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: | :---------: |
| `build`                    | `ng build`로 변경 감시 없이 빌드를 한 번 실행합니다.                                                                                                                                                                   |      ✅      |     ❌      |
| `devserver.start`          | `ng serve`를 실행하는 것처럼 작업 공간의 변경을 감시하는 개발 서버를 비동기로 시작합니다. 비동기 작업이므로 즉시 반환합니다. 시작한 서버를 관리하려면 `devserver.stop`과 `devserver.wait_for_build` 도구를 사용하세요. |      ✅      |     ✅      |
| `devserver.stop`           | `devserver.start`로 시작한 개발 서버를 중지합니다.                                                                                                                                                                     |      ✅      |     ✅      |
| `devserver.wait_for_build` | `devserver.start`로 시작해 실행 중인 개발 서버의 가장 최근 빌드 출력 로그를 반환합니다. 현재 빌드가 진행 중이면 완료될 때까지 기다린 뒤 로그를 반환합니다.                                                             |      ✅      |     ✅      |
| `e2e`                      | 프로젝트에 설정된 엔드 투 엔드 테스트를 실행합니다.                                                                                                                                                                    |      ✅      |     ✅      |
| `modernize`                | 코드를 마이그레이션하고, 최신 모범 사례와 문법에 맞게 Angular 코드를 개선하는 추가 지침을 제공합니다. [자세히 알아보기](https://angular.dev/reference/migrations)                                                      |      ✅      |     ❌      |
| `test`                     | 프로젝트의 단위 테스트를 실행합니다.                                                                                                                                                                                   |      ✅      |     ✅      |

<!--
## Get Started
-->

<a id="get-started"></a>

## 시작하기

<!--
To get started, run the following command in your terminal:

```bash
ng mcp
```

When run from an interactive terminal, this command displays instructions on how to configure a host environment to use the MCP server. The following sections provide example configurations for several popular editors and tools.
-->

터미널에서 다음 명령을 실행하면 됩니다:

```bash
ng mcp
```

대화형 터미널에서 이 명령을 실행하면 MCP 서버를 사용할 호스트 환경의 설정 방법을 안내합니다.
다음 섹션에서는 널리 사용하는 에디터와 도구의 설정 예제를 소개합니다.

<!--
### Cursor
-->

<a id="cursor"></a>

### Cursor

<!--
Create a file named `.cursor/mcp.json` in your project's root and add the following configuration. You can also configure it globally in `~/.cursor/mcp.json`.

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
-->

프로젝트 루트에 `.cursor/mcp.json` 파일을 만들고 다음 설정을 추가하세요.
`~/.cursor/mcp.json`에서 전역으로 설정할 수도 있습니다.

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

<!--
### Firebase Studio
-->

<a id="firebase-studio"></a>

### Firebase Studio

<!--
Create a file named `.idx/mcp.json` in your project's root and add the following configuration:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
-->

프로젝트 루트에 `.idx/mcp.json` 파일을 만들고 다음 설정을 추가하세요:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

<!--
### Gemini CLI
-->

<a id="gemini-cli"></a>

### Gemini CLI

<!--
Create a file named `.gemini/settings.json` in your project's root and add the following configuration:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
-->

프로젝트 루트에 `.gemini/settings.json` 파일을 만들고 다음 설정을 추가하세요:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

<!--
### JetBrains IDEs
-->

<a id="jetbrains-ides"></a>

### JetBrains IDE

<!--
In JetBrains IDEs (like IntelliJ IDEA or WebStorm), after installing the JetBrains AI Assistant plugin, go to `Settings | Tools | AI Assistant | Model Context Protocol (MCP)`. Add a new server (`+`) and select `As JSON`. Then paste the following configuration:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

For the most up-to-date instructions on configuring MCP servers, please refer to the JetBrains documentation: [Connect to an MCP server](https://www.jetbrains.com/help/ai-assistant/mcp.html#connect-to-an-mcp-server).
-->

IntelliJ IDEA나 WebStorm과 같은 JetBrains IDE에서는 JetBrains AI Assistant 플러그인을 설치한 뒤 `Settings | Tools | AI Assistant | Model Context Protocol (MCP)`로 이동하세요.
새 서버를 추가(`+`)하고 `As JSON`을 선택한 다음 다음 설정을 붙여넣으세요:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

MCP 서버 설정에 관한 최신 안내는 JetBrains의 [MCP 서버에 연결하기](https://www.jetbrains.com/help/ai-assistant/mcp.html#connect-to-an-mcp-server) 문서를 참고하세요.

<!--
### VS Code
-->

<a id="vs-code"></a>

### VS Code

<!--
In your project's root, create a file named `.vscode/mcp.json` and add the following configuration. Note the use of the `servers` property.

```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
-->

프로젝트 루트에 `.vscode/mcp.json` 파일을 만들고 다음 설정을 추가하세요.
`servers` 프로퍼티를 사용한다는 점에 주의하세요.

```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

<!--
### Other IDEs
-->

<a id="other-ides"></a>

### 다른 IDE

<!--
For other IDEs, check your IDE's documentation for the proper location of the MCP configuration file (often `mcp.json`). The configuration should contain the following snippet.

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
-->

다른 IDE에서는 해당 IDE의 문서에서 MCP 설정 파일(보통 `mcp.json`)의 올바른 위치를 확인하세요.
설정에는 다음 코드가 포함되어야 합니다.

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

<!--
## Command Options
-->

<a id="command-options"></a>

## 명령 옵션

<!--
The `mcp` command can be configured with the following options passed as arguments in your IDE's MCP configuration:

| Option                        | Type      | Description                                                                                                                                                               | Default |
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| `--read-only`                 | `boolean` | Only register tools that do not make changes to the project. Your editor or coding agent may still perform edits.                                                         | `false` |
| `--local-only`                | `boolean` | Only register tools that do not require an internet connection. Your editor or coding agent may still send data over the network.                                         | `false` |
| `--experimental-tool`<br>`-E` | `string`  | Enable an [experimental tool](#experimental-tools). Separate multiple options by spaces, e.g. `-E tool_a tool_b`. Enable all `devserver.x` tools by using `-E devserver`. |         |

For example, to run the server in read-only mode in VS Code, you would update your `mcp.json` like this:

```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp", "--read-only"]
    }
  }
}
```
-->

IDE의 MCP 설정에서 다음 옵션을 인자로 전달해 `mcp` 명령을 설정할 수 있습니다:

| 옵션                          | 타입      | 설명                                                                                                                                                                           | 기본값  |
| :---------------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `--read-only`                 | `boolean` | 프로젝트를 변경하지 않는 도구만 등록합니다. 에디터나 코딩 에이전트는 여전히 파일을 수정할 수 있습니다.                                                                         | `false` |
| `--local-only`                | `boolean` | 인터넷 연결이 필요 없는 도구만 등록합니다. 에디터나 코딩 에이전트는 여전히 네트워크로 데이터를 전송할 수 있습니다.                                                             | `false` |
| `--experimental-tool`<br>`-E` | `string`  | [실험적인 도구](#experimental-tools)를 활성화합니다. 여러 옵션은 `-E tool_a tool_b`처럼 공백으로 구분하세요. `-E devserver`를 사용하면 모든 `devserver.x` 도구를 활성화합니다. |         |

예를 들어 VS Code에서 서버를 읽기 전용 모드로 실행하려면 `mcp.json`을 다음과 같이 수정하면 됩니다:

```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp", "--read-only"]
    }
  }
}
```

<!--
## Feedback and New Ideas
-->

<a id="feedback-and-new-ideas"></a>

## 피드백과 새로운 아이디어

<!--
The Angular team welcomes your feedback on the existing MCP capabilities and any ideas you have for new tools or features. Please share your thoughts by opening an issue on the [angular/angular GitHub repository](https://github.com/angular/angular/issues).
-->

Angular 팀은 기존 MCP 기능에 관한 피드백과 새로운 도구나 기능에 관한 아이디어를 환영합니다.
[angular/angular GitHub 저장소](https://github.com/angular/angular/issues)에 이슈를 등록해 의견을 알려주세요.
