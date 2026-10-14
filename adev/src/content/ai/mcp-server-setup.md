<!--
# Angular CLI MCP Server

The Angular CLI includes a Model Context Protocol (MCP) server that enables AI assistants (like Cursor, Antigravity, JetBrains AI, etc.) to interact directly with the Angular CLI. It provides tools for code generation, workspace analysis, and running builds/tests.

<docs-callout title="Integration with Angular AI Agent Skills">
  If your host environment supports custom Agent Skills (such as Antigravity), you can combine the Angular CLI MCP server with the official [Angular AI Skills](https://angular.dev/ai/agent-skills). While the skills provide the agent with deep instruction-level guidance and coding standards, the MCP server provides the action tools (like compiling, running tests, and analyzing workspaces) to execute those guidelines, resulting in a complete and powerful development agent.
</docs-callout>

## Get Started

To use the MCP server, you configure your host environment (IDE or CLI) to run `npx @angular/cli mcp`.

<docs-tab-group>
  <docs-tab label="Antigravity IDE">
    Create a file named `.antigravity/mcp.json` in your project's root:

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

  </docs-tab>

  <docs-tab label="Cursor">
    Create `.cursor/mcp.json` in the project root (or globally at `~/.cursor/mcp.json`):

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

  </docs-tab>

  <docs-tab label="VS Code">
    Create `.vscode/mcp.json`:

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

  </docs-tab>
</docs-tab-group>

## Available Tools (Default)

When the MCP server is enabled, AI agents have access to the following tools:

| Name                        | Description                                                                                               |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `ai_tutor`                  | Launches an interactive AI-powered Angular tutor.                                                         |
| `devserver_start`           | Asynchronously starts a dev server (`ng serve`). Returns immediately.                                     |
| `devserver_stop`            | Stops the dev server.                                                                                     |
| `devserver_wait_for_build`  | Returns the logs of the most recent build in a running dev server.                                        |
| `get_best_practices`        | Retrieves the Angular Best Practices Guide (crucial for standalone components, typed forms, etc.).        |
| `list_projects`             | Lists all applications and libraries in the workspace by reading `angular.json`.                          |
| `onpush_zoneless_migration` | Analyzes code and provides a plan to migrate it to `OnPush` change detection (prerequisite for zoneless). |
| `run_target`                | Executes a configured target (e.g., build, test, lint, e2e, deploy).                                      |
| `search_documentation`      | Searches the official documentation at `https://angular.dev`.                                             |

## Common Workflows

These workflows demonstrate how AI assistants coordinate different MCP tools to automatically achieve complex developer stories.

### 1. Performance Tuning: Zoneless & OnPush Migration

The AI agent optimizes change detection performance and migrates components to a zoneless-ready state.

1. **Discover Workspace**: The AI agent calls `list_projects` to locate components, projects, and style/test configurations in the workspace.
2. **Schematic Modernization (Prerequisite)**: The AI agent runs any prerequisite signal migrations using standard `ng generate` commands (e.g., Signal Inputs, Signal Queries).
3. **Plan Migration**: The AI agent calls `onpush_zoneless_migration` with the absolute path of the directory or component file.
4. **Apply Changes**: The AI agent automatically applies the single actionable change returned by the tool to the codebase.
5. **Verify Changes**: The AI agent runs unit tests by calling `run_target` with the target parameter set to `"test"`.
6. **Repeat**: The AI agent calls `onpush_zoneless_migration` again to retrieve the next step, repeating until the tool indicates the migration is complete.

### 2. Feature Development & TDD Loop

The AI agent automates research, implementation, and verification when developing new features.

1. **API & Syntax Research**: The AI agent uses `search_documentation` to look up Angular APIs or syntax rules (e.g., `@defer` block options).
2. **Load Coding Standards**: The AI agent calls `get_best_practices` with the workspace path to load Angular version-aligned coding rules.
3. **Start Local Dev Server**: The AI agent starts a background server by calling `devserver_start`.
4. **Monitor Build**: The AI agent uses `devserver_wait_for_build` to watch build logs and ensure compilation succeeds as it edits the code.
5. **Write and Execute Tests**: The AI agent identifies the project's test framework (e.g., Jasmine, Jest, Vitest) via `list_projects`, writes the corresponding test file, and runs the tests using `run_target` with `"test"`.
6. **Stop Dev Server**: When finished, the AI agent stops the active dev server by calling `devserver_stop`.

### 3. Developer Onboarding and Learning

The AI agent guides the developer through Angular concepts in an interactive sandbox.

1. **Discover Projects**: The AI agent calls `list_projects` to scan the workspace and identify the codebase structure.
2. **Launch Tutor**: The AI agent runs `ai_tutor` to load the curriculum instructions, persona, and tutoring guidelines.
3. **Follow the Curriculum**: The AI agent guides the user through the curriculum, explaining concepts and instructing them on what components to build or modify.
4. **Implement & Verify**: The AI agent helps implement the sandbox code and verifies changes using `run_target` with `"test"` or `"build"`.

## Command Options

You can pass arguments to the MCP server in the `args` array of your configuration:

- `--read-only`: Only registers tools that do not modify the project.
- `--local-only`: Only registers tools that do not require an internet connection.

Example for read-only mode:

```json
"args": ["-y", "@angular/cli", "mcp", "--read-only"]
```
-->

<a id="angular-cli-mcp-server"></a>

# Angular CLI MCP 서버

Angular CLI에는 Cursor, Antigravity, JetBrains AI 등의 AI 어시스턴트가 Angular CLI와 직접 상호작용할 수 있게 하는 모델 컨텍스트 프로토콜(MCP) 서버가 포함되어 있습니다. 코드 생성, 워크스페이스 분석, 빌드 및 테스트 실행 도구를 제공합니다.

<docs-callout title="Angular AI 에이전트 스킬과 통합하기">
  Antigravity처럼 호스트 환경이 커스텀 에이전트 스킬을 지원한다면 Angular CLI MCP 서버와 공식 [Angular AI 스킬](https://angular.dev/ai/agent-skills)을 함께 사용할 수 있습니다. 스킬은 에이전트에 구체적인 작업 지침과 코딩 표준을 제공하고, MCP 서버는 컴파일, 테스트 실행, 워크스페이스 분석 등 지침을 실행할 도구를 제공합니다. 두 기능을 결합하면 완성도 높고 강력한 개발 에이전트를 구성할 수 있습니다.
</docs-callout>

<a id="get-started"></a>

## 시작하기

MCP 서버를 사용하려면 호스트 환경(IDE 또는 CLI)이 `npx @angular/cli mcp`를 실행하도록 설정하세요.

<docs-tab-group>
  <docs-tab label="Antigravity IDE">
    프로젝트 루트에 `.antigravity/mcp.json` 파일을 만드세요.

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

  </docs-tab>

  <docs-tab label="Cursor">
    프로젝트 루트에 `.cursor/mcp.json`을 만들거나 전역 설정으로 `~/.cursor/mcp.json`을 만드세요.

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

  </docs-tab>

  <docs-tab label="VS Code">
    `.vscode/mcp.json`을 만드세요.

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

  </docs-tab>
</docs-tab-group>

<a id="available-tools-default"></a>

## 사용 가능한 기본 도구

MCP 서버를 활성화하면 AI 에이전트가 다음 도구에 접근할 수 있습니다.

| 이름                        | 설명                                                                                             |
| :-------------------------- | :----------------------------------------------------------------------------------------------- |
| `ai_tutor`                  | 대화형 AI 기반 Angular 튜터를 시작합니다.                                                        |
| `devserver_start`           | 개발 서버(`ng serve`)를 비동기로 시작하고 즉시 반환합니다.                                       |
| `devserver_stop`            | 개발 서버를 중지합니다.                                                                          |
| `devserver_wait_for_build`  | 실행 중인 개발 서버의 가장 최근 빌드 로그를 반환합니다.                                          |
| `get_best_practices`        | 독립형 컴포넌트, 타입이 있는 폼 등에 중요한 Angular 모범 사례 가이드를 가져옵니다.               |
| `list_projects`             | `angular.json`을 읽어 워크스페이스의 모든 애플리케이션과 라이브러리를 나열합니다.                |
| `onpush_zoneless_migration` | 코드를 분석하고 존리스 전환의 전제 조건인 `OnPush` 변경 감지로 마이그레이션할 계획을 제공합니다. |
| `run_target`                | 설정된 대상(예: build, test, lint, e2e, deploy)을 실행합니다.                                    |
| `search_documentation`      | `https://angular.dev`의 공식 문서를 검색합니다.                                                  |

<a id="common-workflows"></a>

## 일반적인 작업 흐름

다음 작업 흐름은 AI 어시스턴트가 여러 MCP 도구를 조합하여 복잡한 개발 작업을 자동으로 수행하는 방법을 보여 줍니다.

<a id="1-performance-tuning-zoneless-onpush-migration"></a>

<a id="1-performance-tuning-zoneless--onpush-migration"></a>

### 1. 성능 최적화: 존리스와 OnPush 마이그레이션

AI 에이전트가 변경 감지 성능을 최적화하고 컴포넌트를 존리스 환경에 준비된 상태로 전환합니다.

1. **워크스페이스 파악:** `list_projects`를 호출하여 워크스페이스의 컴포넌트, 프로젝트, 스타일 및 테스트 설정을 찾습니다.
2. **스키매틱으로 최신화(선행 조건):** 표준 `ng generate` 명령어로 필요한 시그널 마이그레이션(예: 시그널 입력, 시그널 쿼리)을 먼저 실행합니다.
3. **마이그레이션 계획:** 디렉터리 또는 컴포넌트 파일의 절대 경로로 `onpush_zoneless_migration`을 호출합니다.
4. **변경 적용:** 도구가 반환한 실행 가능한 변경 한 가지를 코드베이스에 자동으로 적용합니다.
5. **변경 검증:** 대상 매개변수를 `"test"`로 설정하여 `run_target`을 호출하고 단위 테스트를 실행합니다.
6. **반복:** `onpush_zoneless_migration`을 다시 호출해 다음 단계를 가져오고, 도구가 마이그레이션 완료를 알릴 때까지 반복합니다.

<a id="2-feature-development-tdd-loop"></a>

<a id="2-feature-development--tdd-loop"></a>

### 2. 기능 개발과 TDD 반복

AI 에이전트가 새 기능 개발에 필요한 조사, 구현, 검증을 자동화합니다.

1. **API와 문법 조사:** `search_documentation`으로 Angular API나 문법 규칙(예: `@defer` 블록 옵션)을 찾아봅니다.
2. **코딩 표준 불러오기:** 워크스페이스 경로로 `get_best_practices`를 호출하여 Angular 버전에 맞는 코딩 규칙을 가져옵니다.
3. **로컬 개발 서버 시작:** `devserver_start`를 호출하여 백그라운드 서버를 시작합니다.
4. **빌드 확인:** 코드를 편집하는 동안 `devserver_wait_for_build`로 빌드 로그를 확인하고 컴파일이 성공하는지 검증합니다.
5. **테스트 작성과 실행:** `list_projects`로 프로젝트의 테스트 프레임워크(예: Jasmine, Jest, Vitest)를 파악하고 알맞은 테스트 파일을 작성한 뒤 `"test"`로 `run_target`을 호출하여 테스트를 실행합니다.
6. **개발 서버 중지:** 작업을 마치면 `devserver_stop`을 호출하여 실행 중인 개발 서버를 중지합니다.

<a id="3-developer-onboarding-and-learning"></a>

### 3. 개발자 온보딩과 학습

AI 에이전트가 대화형 샌드박스에서 개발자에게 Angular 개념을 안내합니다.

1. **프로젝트 파악:** `list_projects`를 호출하여 워크스페이스를 살펴보고 코드베이스 구조를 파악합니다.
2. **튜터 시작:** `ai_tutor`를 실행하여 교육과정 지침, 페르소나, 학습 안내 지침을 불러옵니다.
3. **교육과정 진행:** 개념을 설명하고 만들거나 수정할 컴포넌트를 안내하면서 사용자가 교육과정을 진행하도록 돕습니다.
4. **구현과 검증:** 샌드박스 코드 구현을 돕고 `"test"`나 `"build"`로 `run_target`을 호출하여 변경 사항을 검증합니다.

<a id="command-options"></a>

## 명령어 옵션

설정의 `args` 배열에서 MCP 서버에 인자를 전달할 수 있습니다.

- `--read-only`: 프로젝트를 수정하지 않는 도구만 등록합니다.
- `--local-only`: 인터넷 연결이 필요하지 않은 도구만 등록합니다.

읽기 전용 모드 예제:

```json
"args": ["-y", "@angular/cli", "mcp", "--read-only"]
```
