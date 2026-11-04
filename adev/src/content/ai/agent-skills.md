<!--
# Agent Skills
-->

<a id="agent-skills"></a>

# 에이전트 스킬

<!--
Agent Skills are specialized, domain-specific instructions and capabilities designed for AI agents like Gemini CLI. These skills provide architectural guidance, generate idiomatic Angular code, and help scaffold new projects using modern best practices.

By using Agent Skills, you can ensure that the AI agent you are working with has the most up-to-date information about Angular's conventions, reactivity models (like Signals), and project structure.
-->

에이전트 스킬은 Gemini CLI와 같은 AI 에이전트를 위해 설계된 특정 분야의 전문 지침과 기능입니다.
이 스킬은 아키텍처 지침을 제공하고, Angular 관례에 맞는 코드를 생성하며, 최신 모범 사례에 따라 새 프로젝트의 기본 구조를 구성하는 데 도움을 줍니다.

에이전트 스킬을 사용하면 함께 작업하는 AI 에이전트가 Angular의 코딩 관례, 시그널과 같은 반응형 모델, 프로젝트 구조에 관한 최신 정보를 활용하도록 할 수 있습니다.

<!--
## Available Skills
-->

<a id="available-skills"></a>

## 사용할 수 있는 스킬

<!--
The Angular team maintains a collection of official skills that are regularly updated to stay in sync with the latest framework improvements.

| Skill                   | Description                                                                                                                                                                                                                                                                                       |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`angular-developer`** | Generates Angular code and provides architectural guidance. Useful for creating components, services, or obtaining best practices on reactivity (signals, linkedSignal, resource), forms, dependency injection, routing, SSR, accessibility (ARIA), animations, styling, testing, or CLI tooling. |
| **`angular-new-app`**   | Creates a new Angular app using the Angular CLI. Provides important guidelines for effectively setting up and structuring a modern Angular application.                                                                                                                                           |
-->

Angular 팀은 프레임워크의 최신 개선 사항을 반영해 정기적으로 업데이트하는 공식 스킬 모음을 관리합니다.

| 스킬                    | 설명                                                                                                                                                                                                                                                       |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`angular-developer`** | Angular 코드를 생성하고 아키텍처 지침을 제공합니다. 컴포넌트나 서비스를 만들거나, 반응형 프로그래밍(signals, linkedSignal, resource), 폼, 의존성 주입, 라우팅, SSR, 접근성(ARIA), 애니메이션, 스타일, 테스트, CLI 도구의 모범 사례를 확인할 때 유용합니다. |
| **`angular-new-app`**   | Angular CLI로 새 Angular 앱을 만듭니다. 최신 Angular 애플리케이션을 효과적으로 설정하고 구조화하는 데 필요한 주요 지침을 제공합니다.                                                                                                                       |

<!--
## Using Agent Skills
-->

<a id="using-agent-skills"></a>

## 에이전트 스킬 사용하기

<!--
Agent Skills are designed to be used with agentic coding tools like [Gemini CLI](https://geminicli.com/docs/cli/skills/), [Antigravity](https://antigravity.google/docs/skills) and more. Activating a skill loads the specific instructions and resources needed for that task.

To use these skills in your own environment you may follow the instructions for your specific tool or use a community tool like [skills.sh](https://skills.sh/).

```bash
npx skills add https://github.com/angular/skills
```
-->

에이전트 스킬은 [Gemini CLI](https://geminicli.com/docs/cli/skills/), [Antigravity](https://antigravity.google/docs/skills) 등의 에이전트 코딩 도구에서 사용하도록 설계되었습니다.
스킬을 활성화하면 해당 작업에 필요한 지침과 리소스를 불러옵니다.

사용 중인 환경에서 이 스킬을 사용하려면 해당 도구의 안내를 따르거나 [skills.sh](https://skills.sh/)와 같은 커뮤니티 도구를 사용하면 됩니다.

```bash
npx skills add https://github.com/angular/skills
```
