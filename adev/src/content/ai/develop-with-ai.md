<!--
# LLM prompts and AI IDE setup
-->

<a id="llm-prompts-and-ai-ide-setup"></a>

# LLM 프롬프트와 AI IDE 설정

<!--
Generating code with large language models (LLMs) is a rapidly growing area of interest for developers. While LLMs are often capable of generating working code it can be a challenge to generate code for consistently evolving frameworks like Angular.

Advanced instructions and prompting are an emerging standard for supporting modern code generation with domain specific details. This section contains curated content and resources to support more accurate code generation for Angular and LLMs.
-->

대규모 언어 모델(LLM)로 코드를 생성하는 분야에 개발자들의 관심이 빠르게 늘어나고 있습니다.
LLM은 동작하는 코드를 생성하는 경우가 많지만, Angular처럼 지속적으로 발전하는 프레임워크의 코드를 생성하는 것은 어려울 수 있습니다.

분야별 세부 정보를 담은 고급 지침과 프롬프트는 최신 코드 생성을 지원하는 새로운 표준으로 자리 잡고 있습니다.
이 섹션에서는 LLM이 Angular 코드를 더 정확하게 생성하도록 돕는 엄선된 콘텐츠와 리소스를 제공합니다.

<!--
## Custom Prompts and System Instructions
-->

<a id="custom-prompts-and-system-instructions"></a>

## 커스텀 프롬프트와 시스템 지침

<!--
Improve your experience generating code with LLMs by using one of the following custom, domain specific files.

NOTE: These files will be updated on a regular basis staying up to date with Angular's conventions.

Here is a set of instructions to help LLMs generate correct code that follows Angular best practices. This file can be included as system instructions to your AI tooling or included along with your prompt as context.

<docs-code language="md" path="packages/core/resources/best-practices.md" class="compact"/>

<a download href="/assets/context/best-practices.md" target="_blank">Click here to download the best-practices.md file.</a>
-->

다음과 같이 특정 분야에 맞춰 작성한 커스텀 파일을 사용하면 LLM의 코드 생성 경험을 개선할 수 있습니다.

참고: 이 파일은 Angular의 관례에 맞춰 정기적으로 업데이트합니다.

다음은 LLM이 Angular 모범 사례를 따르는 올바른 코드를 생성하도록 돕는 지침입니다.
이 파일을 AI 도구의 시스템 지침으로 사용하거나, 프롬프트와 함께 맥락 정보로 제공할 수 있습니다.

<docs-code language="md" path="packages/core/resources/best-practices.md" class="compact"/>

<a download href="/assets/context/best-practices.md" target="_blank">여기를 클릭하면 best-practices.md 파일을 내려받을 수 있습니다.</a>

<!--
## Rules Files
-->

<a id="rules-files"></a>

## 규칙 파일

<!--
Several tools, such as <a href="https://antigravity.google?utm_source=adev&utm_medium=website&utm_campaign=BUILD_WITH_AI_ANGULAR&utm_term=angular_devrel&utm_content=build_with_ai_angular_antigravity" target="_blank">Antigravity</a> have rules files useful for providing critical context to LLMs.

| Environment/IDE      | Rules File                                                                                                             | Installation Instructions                                                                                                                                       |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Antigravity          | <a download href="/assets/context/GEMINI.md" target="_blank">GEMINI.md</a>                                             | <a href="https://antigravity.google/docs/rules-workflows" target="_blank">Configure `GEMINI.md`</a>                                                             |
| Copilot powered IDEs | <a download="copilot-instructions.md" href="/assets/context/guidelines.md" target="_blank">copilot-instructions.md</a> | <a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions" target="_blank">Configure `.github/copilot-instructions.md`</a> |
| Cursor               | <a download href="/assets/context/angular-20.mdc" target="_blank">cursor.md</a>                                        | <a href="https://docs.cursor.com/context/rules" target="_blank">Configure `cursorrules.md`</a>                                                                  |
| JetBrains IDEs       | <a download href="/assets/context/AGENTS.md" target="_blank">AGENTS.md</a>                                             | <a href="https://junie.jetbrains.com/docs/guidelines-and-memory.html#how-junie-cli-discovers-guidelines" target="_blank">Configure `AGENTS.md`</a>              |
| VS Code              | <a download=".instructions.md" href="/assets/context/guidelines.md" target="_blank">.instructions.md</a>               | <a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions" target="_blank">Configure `.instructions.md`</a>                |
| Windsurf             | <a download href="/assets/context/guidelines.md" target="_blank">guidelines.md</a>                                     | <a href="https://docs.windsurf.com/windsurf/cascade/memories#rules" target="_blank">Configure `guidelines.md`</a>                                               |
-->

<a href="https://antigravity.google?utm_source=adev&utm_medium=website&utm_campaign=BUILD_WITH_AI_ANGULAR&utm_term=angular_devrel&utm_content=build_with_ai_angular_antigravity" target="_blank">Antigravity</a>를 비롯한 여러 도구는 LLM에 중요한 맥락 정보를 제공하는 규칙 파일을 지원합니다.

| 환경/IDE               | 규칙 파일                                                                                                              | 설치 방법                                                                                                                                                      |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Antigravity            | <a download href="/assets/context/GEMINI.md" target="_blank">GEMINI.md</a>                                             | <a href="https://antigravity.google/docs/rules-workflows" target="_blank">`GEMINI.md` 설정하기</a>                                                             |
| Copilot을 사용하는 IDE | <a download="copilot-instructions.md" href="/assets/context/guidelines.md" target="_blank">copilot-instructions.md</a> | <a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions" target="_blank">`.github/copilot-instructions.md` 설정하기</a> |
| Cursor                 | <a download href="/assets/context/angular-20.mdc" target="_blank">cursor.md</a>                                        | <a href="https://docs.cursor.com/context/rules" target="_blank">`cursorrules.md` 설정하기</a>                                                                  |
| JetBrains IDE          | <a download href="/assets/context/AGENTS.md" target="_blank">AGENTS.md</a>                                             | <a href="https://junie.jetbrains.com/docs/guidelines-and-memory.html#how-junie-cli-discovers-guidelines" target="_blank">`AGENTS.md` 설정하기</a>              |
| VS Code                | <a download=".instructions.md" href="/assets/context/guidelines.md" target="_blank">.instructions.md</a>               | <a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions" target="_blank">`.instructions.md` 설정하기</a>                |
| Windsurf               | <a download href="/assets/context/guidelines.md" target="_blank">guidelines.md</a>                                     | <a href="https://docs.windsurf.com/windsurf/cascade/memories#rules" target="_blank">`guidelines.md` 설정하기</a>                                               |

<!--
## Angular CLI MCP Server setup
-->

<a id="angular-cli-mcp-server-setup"></a>

## Angular CLI MCP 서버 설정

<!--
The Angular CLI includes an experimental [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/) that allows AI assistants in your development environment to interact with the Angular CLI.

[**Learn how to set up the Angular CLI MCP Server**](/ai/mcp)
-->

Angular CLI에는 개발 환경의 AI 어시스턴트가 Angular CLI와 상호작용할 수 있는 실험적인 [모델 컨텍스트 프로토콜(MCP) 서버](https://modelcontextprotocol.io/)가 포함되어 있습니다.

[**Angular CLI MCP 서버 설정 방법 알아보기**](/ai/mcp)

<!--
## Providing Context with `llms.txt`
-->

<a id="providing-context-with-llmstxt"></a>

## `llms.txt`로 맥락 정보 제공하기

<!--
`llms.txt` is a proposed standard for websites designed to help LLMs better understand and process their content. The Angular team has developed two versions of this file to help LLMs and tools that use LLMs for code generation to create better modern Angular code.

- <a href="/llms.txt" target="_blank">llms.txt</a> - an index file providing links to key files and resources.
- <a href="/assets/context/llms-full.txt" target="_blank">llms-full.txt</a> - a more robust compiled set of resources describing how Angular works and how to build Angular applications.
-->

`llms.txt`는 LLM이 웹사이트의 콘텐츠를 더 잘 이해하고 처리하도록 돕기 위해 제안된 표준입니다.
Angular 팀은 LLM과 LLM 기반 코드 생성 도구가 더 나은 최신 Angular 코드를 만들도록 이 파일을 두 가지 버전으로 제공합니다.

- <a href="/llms.txt" target="_blank">llms.txt</a> - 주요 파일과 리소스의 링크를 제공하는 색인 파일입니다.
- <a href="/assets/context/llms-full.txt" target="_blank">llms-full.txt</a> - Angular의 동작 방식과 Angular 애플리케이션을 만드는 방법을 설명하는 리소스를 더 폭넓게 모은 파일입니다.

<!--
Be sure to check out the [overview page](/ai) for more information on how to integrate AI into your Angular applications.
-->

Angular 애플리케이션에 AI를 통합하는 방법에 대한 자세한 내용은 [개요 페이지](/ai)를 확인하세요.
