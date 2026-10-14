<!--
# Angular AI Tutor
-->

<a id="angular-ai-tutor"></a>

# Angular AI 튜터

<!--
The Angular AI Tutor is designed to interactively guide you step-by-step through building a complete, modern Angular application from the ground up. You'll learn the latest patterns and best practices by building a real, tangible project: a **"Smart Recipe Box"** for creating and managing recipes.

Our goal is to foster critical thinking and help you retain what you learn. Instead of just giving you code, the tutor will explain concepts, show you examples, and then give you project-specific exercises to solve on your own.
-->

Angular AI 튜터는 최신 Angular 애플리케이션을 처음부터 완성할 때까지 대화형으로 한 단계씩 안내하도록 설계되었습니다.
레시피를 만들고 관리하는 **"스마트 레시피 보관함"**이라는 실제 프로젝트를 만들면서 최신 패턴과 모범 사례를 배울 수 있습니다.

이 튜터의 목표는 스스로 생각하는 능력을 기르고 배운 내용을 오래 기억하도록 돕는 것입니다.
튜터는 코드를 바로 제공하는 대신 개념을 설명하고 예제를 보여준 다음, 프로젝트에 맞는 연습 문제를 제시해 직접 해결하도록 합니다.

<!--
## Get Started
-->

<a id="get-started"></a>

## 시작하기

<!--
You can access the AI tutor via the [Angular MCP server](ai/mcp).

1. [Install](ai/mcp#get-started) the Angular MCP server
2. Create a new Angular project `ng new <project-name>`
3. Navigate to your new project (`cd <project-name>`) in an AI-powered editor or tool, like the [Gemini CLI](https://geminicli.com/)
4. Enter a prompt like `launch the Angular AI tutor`
   ![A screenshot demonstrating how to launch the Angular AI Tutor in the Gemini CLI.](assets/images/launch-ai-tutor.png 'Launch the Angular AI Tutor')
-->

[Angular MCP 서버](ai/mcp)를 통해 AI 튜터를 사용할 수 있습니다.

1. Angular MCP 서버를 [설치합니다](ai/mcp#get-started).
2. `ng new <project-name>` 명령으로 새 Angular 프로젝트를 만듭니다.
3. [Gemini CLI](https://geminicli.com/)와 같이 AI를 지원하는 에디터나 도구에서 새 프로젝트로 이동합니다(`cd <project-name>`).
4. `launch the Angular AI tutor`와 같은 프롬프트를 입력합니다.
   ![Gemini CLI에서 Angular AI 튜터를 시작하는 방법을 보여주는 화면.](assets/images/launch-ai-tutor.png 'Angular AI 튜터 시작하기')

<!--
## Using the AI Tutor
-->

<a id="using-the-ai-tutor"></a>

## AI 튜터 사용하기

<!--
Each module begins with a brief concept explanation.
![A screenshot of the Angular AI Tutor presenting a brief concept explanation.](assets/images/ai-tutor-preview-1.png 'Angular AI Tutor explanation')
If applicable, the tutor will present a code example to demonstrate the concept.
![A screenshot of the Angular AI Tutor showing a code example.](assets/images/ai-tutor-preview-2.png 'Angular AI Tutor code example')
The tutor will also provide an open-ended exercise to test your understanding.
![A screenshot of the Angular AI Tutor providing an exercise.](assets/images/ai-tutor-preview-3.png 'Angular AI Tutor exercise')
Finally, the tutor will check your work before moving onto the next module.
![A screenshot of the Angular AI Tutor checking the user's work.](assets/images/ai-tutor-preview-4.png 'Angular AI Tutor check')
-->

각 모듈은 짧은 개념 설명으로 시작합니다.
![Angular AI 튜터가 개념을 간단히 설명하는 화면.](assets/images/ai-tutor-preview-1.png 'Angular AI 튜터의 설명')
필요한 경우 튜터는 개념을 보여주는 코드 예제를 제시합니다.
![Angular AI 튜터가 코드 예제를 보여주는 화면.](assets/images/ai-tutor-preview-2.png 'Angular AI 튜터의 코드 예제')
또한 이해한 내용을 확인할 수 있도록 정해진 답에 얽매이지 않는 연습 문제를 제공합니다.
![Angular AI 튜터가 연습 문제를 제시하는 화면.](assets/images/ai-tutor-preview-3.png 'Angular AI 튜터의 연습 문제')
마지막으로 튜터가 작업 내용을 확인한 뒤 다음 모듈로 넘어갑니다.
![Angular AI 튜터가 사용자의 작업을 확인하는 화면.](assets/images/ai-tutor-preview-4.png 'Angular AI 튜터의 확인')

<!--
## How It Works: The Learning Cycle
-->

<a id="how-it-works-the-learning-cycle"></a>

## 학습 과정

<!--
For each new topic, you'll follow a learning loop that emphasizes critical thinking to help you better retain what you learn.

1. **Learn the Concept:** The tutor will briefly explain a core Angular feature and show you a generic code example to illustrate it.
2. **Apply Your Knowledge:** You'll immediately get a hands-on exercise. The tutor presents these exercises at a high level with objectives and expected outcomes, encouraging you to think through the solution yourself.
3. **Get Feedback & Support:** When you're ready, let the tutor know. It will **automatically read your project files** to verify your solution is correct. If you get stuck, you are in complete control. You can ask for a **"hint"** for more guidance, or get step-by-step instructions by typing **"detailed guide"** or **"step-by-step instructions."**

Once you've succeeded, the tutor will move directly to the next topic. You can also ask the tutor for more information on a topic or ask any related Angular questions at any time.

---
-->

새로운 주제를 배울 때마다 스스로 생각하는 과정을 중심으로 학습을 반복하면서 배운 내용을 더 오래 기억할 수 있습니다.

1. **개념 배우기:** 튜터가 Angular의 핵심 기능을 간단히 설명하고, 일반적인 코드 예제로 개념을 보여줍니다.
2. **배운 내용 적용하기:** 곧바로 직접 풀어볼 연습 문제가 주어집니다.
   튜터는 목표와 기대 결과를 중심으로 문제를 설명하고, 해결 방법은 직접 생각하도록 유도합니다.
3. **피드백과 도움 받기:** 준비가 되면 튜터에게 알려주세요.
   튜터가 **프로젝트 파일을 자동으로 읽어** 풀이가 올바른지 확인합니다.
   막히는 부분이 있으면 필요한 도움을 직접 선택할 수 있습니다.
   **"힌트"**를 요청해 추가 안내를 받거나, **"자세한 가이드"** 또는 **"단계별 지침"**을 입력해 순서대로 안내받을 수 있습니다.

문제를 해결하면 튜터는 바로 다음 주제로 넘어갑니다.
언제든지 특정 주제를 더 자세히 설명해 달라고 하거나 관련된 Angular 질문을 할 수도 있습니다.

---

<!--
## **Features & Commands**
-->

<a id="features-commands"></a>

<a id="features--commands"></a>

## **기능과 명령**

<!--
You are in control of your learning experience. Use these features at any time:
-->

학습 방식은 직접 조절할 수 있습니다.
다음 기능은 언제든지 사용할 수 있습니다.

<!--
### **Leave and Come Back**
-->

<a id="leave-and-come-back"></a>

### **중단했다가 이어서 학습하기**

<!--
Feel free to take a break. Your progress is tied to your project's code. When you return for a new session, the tutor will automatically analyze your files to determine exactly where you left off, allowing you to seamlessly pick up right where you were.

**Pro Tip:** We highly recommend using Git to save your progress. After completing a module, it's a great idea to commit your changes (e.g., `git commit -m "Complete Phase 1, Module 8"`). This acts as a personal checkpoint you can always return to.
-->

편하게 쉬었다가 돌아와도 됩니다.
학습 진도는 프로젝트 코드와 연결되어 있습니다.
새 세션으로 돌아오면 튜터가 파일을 자동으로 분석해 마지막으로 진행한 위치를 파악하므로 중단한 곳에서 자연스럽게 이어갈 수 있습니다.

**활용 팁:** 학습 진도는 Git으로 저장하는 것을 적극 권장합니다.
모듈을 마칠 때마다 변경 사항을 커밋하면 좋습니다(예: `git commit -m "Complete Phase 1, Module 8"`).
이렇게 하면 언제든지 돌아갈 수 있는 개인 체크포인트를 만들 수 있습니다.

<!--
### **Adjust Your Experience Level**
-->

<a id="adjust-your-experience-level"></a>

### **숙련도 조절하기**

<!--
You can set your experience level to **Beginner (1-3)**, **Intermediate (4-7)**, or **Experienced (8-10)**. You can change this setting at any time during your session, and the tutor will immediately adapt its teaching style to match.

**Example Prompts:**

- "Set my experience level to beginner."
- "Change my rating to 8."
-->

숙련도를 **초급(1~3)**, **중급(4~7)**, **숙련자(8~10)**로 설정할 수 있습니다.
세션 중 언제든지 이 설정을 바꿀 수 있으며, 튜터는 즉시 설명 방식을 조절합니다.

**프롬프트 예시:**

- "내 숙련도를 초급으로 설정해 줘."
- "내 숙련도를 8로 바꿔 줘."

<!--
### **See the Full Learning Plan**
-->

<a id="see-the-full-learning-plan"></a>

### **전체 학습 계획 보기**

<!--
Want to see the big picture or check how far you've come? Just ask for the table of contents.

**Example Prompts:**

- "Where are we?"
- "Show the table of contents."
- "Show the plan."

The tutor will display the full learning plan and mark your current location.
-->

전체 구성을 보거나 얼마나 진행했는지 확인하려면 목차를 요청하면 됩니다.

**프롬프트 예시:**

- "지금 어디까지 했지?"
- "목차를 보여 줘."
- "학습 계획을 보여 줘."

튜터는 전체 학습 계획을 보여주면서 현재 위치를 표시합니다.

<!--
### **A Note on Styling**
-->

<a id="a-note-on-styling"></a>

### **스타일에 관한 안내**

<!--
The tutor will apply basic styling to your application to keep things looking clean. You are highly encouraged to apply your own styling to make the app your own.
-->

튜터는 애플리케이션을 깔끔하게 표시하도록 기본 스타일을 적용합니다.
직접 스타일을 적용해 자신만의 앱으로 만들어 보세요.

<!--
### **Skip the Current Module**
-->

<a id="skip-the-current-module"></a>

### **현재 모듈 건너뛰기**

<!--
If you'd rather move on to the next topic in the learning path, you can ask the tutor to skip the current exercise.

**Example Prompts:**

- "Skip this section."
- "Auto-complete this step for me."

The tutor will ask for confirmation and then present you with the complete code solution for the current module and attempt to automatically apply any required updates to ensure you can continue smoothly with the next module.
-->

학습 과정의 다음 주제로 넘어가고 싶다면 튜터에게 현재 연습 문제를 건너뛰도록 요청할 수 있습니다.

**프롬프트 예시:**

- "이 섹션은 건너뛰어 줘."
- "이 단계를 자동으로 완성해 줘."

튜터는 확인을 요청한 다음 현재 모듈의 완성된 코드를 제시하고, 다음 모듈을 원활하게 진행하는 데 필요한 변경 사항을 자동으로 적용하려고 시도합니다.

<!--
### **Jump to Any Topic**
-->

<a id="jump-to-any-topic"></a>

### **원하는 주제로 이동하기**

<!--
If you want to learn about a specific topic out of order (e.g., jump from the basics to forms), you can. The tutor will provide the necessary code to update your project to the correct starting point for the selected module and attempt to automatically apply any required updates.

**Example Prompts:**

- "Take me to the forms lesson."
- "I want to learn about Route Guards now."
- "Jump to the section on Services."

---
-->

순서와 관계없이 특정 주제를 배우고 싶다면, 예를 들어 기초에서 곧바로 폼으로 이동할 수도 있습니다.
튜터는 선택한 모듈의 시작 지점에 맞게 프로젝트를 수정하는 데 필요한 코드를 제공하고, 필요한 변경 사항을 자동으로 적용하려고 시도합니다.

**프롬프트 예시:**

- "폼 수업으로 이동해 줘."
- "지금 라우팅 규칙 가드를 배우고 싶어."
- "서비스 섹션으로 이동해 줘."

---

<!--
## **Troubleshooting**
-->

<a id="troubleshooting"></a>

## **문제 해결**

<!--
### Setup Issues

**"launch the Angular AI tutor" doesn't do anything?**

Make sure you have a project open first. The tutor needs an actual Angular project to work with:

```bash
ng new my-app
cd my-app
code .
```

Then ensure your MCP server is running. In VS Code, open the `.vscode/mcp.json` file and click the **"Start"** button at the top of the file.

When you type "launch the Angular AI tutor", you should see a checkmark saying
"Reviewed .vscode/mcp.json and ran start task" and a prompt asking to
"Allow task run?" — go ahead and click Allow.

**Still not working?**

Try typing `#angular-cli` first to load the Angular context, then paste the tutorial URL: `https://angular.dev/ai/ai-tutor`

**How to verify the server is running**

Open the Command Palette (`Ctrl+Shift+P`), type "MCP: List Running Servers", and look for "angular-cli" in the list.

---

### General Issues

If the tutor doesn't respond correctly or you suspect an issue with your application, here are a few things to try:

1. **Type "proceed":** This can often nudge the tutor to continue to the next step in the event it gets stuck.
2. **Correct the Tutor:** If the tutor is mistaken about your progress (e.g., it says you're on Module 3 but you've completed Module 8), just tell it. For example: _"I'm actually on Module 8."_ The tutor will re-evaluate your code and adjust.
3. **Verify Your UI:** If you want to confirm what your application's user interface should look like, just ask the tutor. For example: _"What should I see in my UI?"_
4. **Reload the Browser Window:** A refresh can solve many issues related to your application.
5. **Hard Restart the Browser:** Errors are sometimes only surfaced in the browser's developer console. A hard restart can help clear underlying issues related to the application.
6. **Start a New Chat:** You can always start a new chat to remove the existing history and begin fresh. The tutor will read your files to find the latest step you were on.
-->

<a id="setup-issues"></a>

### 설정 문제

**"launch the Angular AI tutor"를 입력해도 반응이 없나요?**

먼저 프로젝트를 열었는지 확인하세요. 튜터가 작업하려면 실제 Angular 프로젝트가 필요합니다.

```bash
ng new my-app
cd my-app
code .
```

그다음 MCP 서버가 실행 중인지 확인하세요. VS Code에서 `.vscode/mcp.json` 파일을 열고 파일 상단의 **"Start"** 버튼을 클릭하세요.

"launch the Angular AI tutor"를 입력하면 "Reviewed .vscode/mcp.json and ran start task"라는 체크 표시와 "Allow task run?"이라는 확인 메시지가 표시됩니다. Allow를 클릭하세요.

**여전히 작동하지 않나요?**

먼저 `#angular-cli`를 입력하여 Angular 컨텍스트를 불러온 다음 튜토리얼 URL `https://angular.dev/ai/ai-tutor`을 붙여 넣어 보세요.

**서버가 실행 중인지 확인하는 방법**

명령 팔레트(`Ctrl+Shift+P`)를 열고 "MCP: List Running Servers"를 입력한 뒤 목록에서 "angular-cli"를 찾으세요.

---

<a id="general-issues"></a>

### 일반적인 문제

튜터가 올바르게 응답하지 않거나 애플리케이션에 문제가 있는 것 같다면 다음 방법을 시도해 보세요:

1. **"proceed" 입력하기:** 튜터가 진행을 멈췄을 때 이 명령을 입력하면 다음 단계로 이어지는 경우가 많습니다.
2. **튜터에게 정정하기:** 튜터가 학습 진도를 잘못 파악했다면 알려주세요(예: 모듈 8을 마쳤는데 모듈 3을 진행 중이라고 하는 경우).
   예를 들어 _"실제로는 모듈 8까지 했어."_
   라고 하면 튜터가 코드를 다시 확인하고 진도를 조절합니다.
3. **UI 확인하기:** 애플리케이션의 사용자 인터페이스가 어떤 모습이어야 하는지 확인하고 싶다면 튜터에게 물어보세요.
   예를 들어 _"UI에 무엇이 보여야 해?"_ 라고 질문하면 됩니다.
4. **브라우저 창 새로고침하기:** 새로고침으로 애플리케이션과 관련된 여러 문제를 해결할 수 있습니다.
5. **브라우저 완전히 재시작하기:** 오류가 브라우저 개발자 콘솔에만 나타나는 경우도 있습니다.
   브라우저를 완전히 재시작하면 애플리케이션과 관련된 근본적인 문제를 해소하는 데 도움이 될 수 있습니다.
6. **새 채팅 시작하기:** 언제든지 새 채팅을 시작해 기존 대화 기록을 비우고 새롭게 진행할 수 있습니다.
   튜터는 파일을 읽어 마지막으로 진행한 단계를 찾습니다.

<!--
## **Your Learning Journey: The Phased Path**
-->

<a id="your-learning-journey-the-phased-path"></a>

## **단계별 학습 과정**

<!--
You will build your application over a five-phase journey. You can follow this path from start to finish to create a complete, fully-functional Angular application. Each module builds logically upon the last, taking you from the basics to advanced, real-world features.

**A Note on Automated Setup:** Some modules require a setup step, like creating interfaces or mock data. In these cases, the tutor will present you with the code and file instructions. You will be responsible for creating and modifying these files as instructed before the exercise begins.
-->

다섯 단계에 걸쳐 애플리케이션을 만듭니다.
이 과정을 처음부터 끝까지 따라가면 필요한 기능을 모두 갖춘 Angular 애플리케이션을 완성할 수 있습니다.
각 모듈은 이전 모듈에서 배운 내용을 바탕으로 구성되며, 기초부터 실제 애플리케이션에 사용하는 고급 기능까지 순차적으로 다룹니다.

**자동 설정에 관한 안내:** 일부 모듈에는 인터페이스나 목업 데이터를 만드는 것과 같은 준비 단계가 필요합니다.
이 경우 튜터가 코드와 파일 작업 방법을 제시합니다.
연습 문제를 시작하기 전에 안내에 따라 직접 파일을 만들고 수정해야 합니다.

<!--
### **Phase 1: Angular Fundamentals**
-->

<a id="phase-1-angular-fundamentals"></a>

### **1단계: Angular 기초**

<!--
- **Module 1:** Getting Started
- **Module 2:** Dynamic Text with Interpolation
- **Module 3:** Event Listeners (`(click)`)
-->

- **모듈 1:** 시작하기
- **모듈 2:** 문자열 치환으로 동적 텍스트 표시하기
- **모듈 3:** 이벤트 리스너(`(click)`)

<!--
### **Phase 2: State and Signals**
-->

<a id="phase-2-state-and-signals"></a>

### **2단계: 상태와 시그널**

<!--
- **Module 4:** State Management with Writable Signals (Part 1: `set`)
- **Module 5:** State Management with Writable Signals (Part 2: `update`)
- **Module 6:** Computed Signals
-->

- **모듈 4:** 값을 쓸 수 있는 시그널로 상태 관리하기(1부: `set`)
- **모듈 5:** 값을 쓸 수 있는 시그널로 상태 관리하기(2부: `update`)
- **모듈 6:** 연산 시그널

<!--
### **Phase 3: Component Architecture**
-->

<a id="phase-3-component-architecture"></a>

### **3단계: 컴포넌트 아키텍처**

<!--
- **Module 7:** Template Binding (Properties & Attributes)
- **Module 8:** Creating & Nesting Components
- **Module 9:** Component Inputs with Signals
- **Module 10:** Styling Components
- **Module 11:** List Rendering with `@for`
- **Module 12:** Conditional Rendering with `@if`
-->

- **모듈 7:** 템플릿 바인딩(프로퍼티와 어트리뷰트)
- **모듈 8:** 컴포넌트 생성과 중첩
- **모듈 9:** 시그널로 컴포넌트 입력 받기
- **모듈 10:** 컴포넌트 스타일 지정하기
- **모듈 11:** `@for`로 목록 렌더링하기
- **모듈 12:** `@if`로 조건부 렌더링하기

<!--
### **Phase 4: Advanced Features & Architecture**
-->

<a id="phase-4-advanced-features-architecture"></a>

<a id="phase-4-advanced-features--architecture"></a>

### **4단계: 고급 기능과 아키텍처**

<!--
- **Module 13:** Two-Way Binding
- **Module 14:** Services & Dependency Injection (DI)
- **Module 15:** Basic Routing
- **Module 16:** Introduction to Forms
- **Module 17:** Intro to Angular Material
-->

- **모듈 13:** 양방향 바인딩
- **모듈 14:** 서비스와 의존성 주입(DI)
- **모듈 15:** 라우팅 기초
- **모듈 16:** 폼 소개
- **모듈 17:** Angular Material 소개

<!--
### **Phase 5: Signal Forms**
-->

<a id="phase-5-signal-forms"></a>

### **5단계: 시그널 폼**

<!--
- **Module 18**: **Introduction to Signal Forms**
- **Module 19**: **Submitting & Resetting**
- **Module 20**: **Validation in Signal Forms**
- **Module 21**: **Field State & Error Messages**

---
-->

- **모듈 18**: **시그널 폼 소개**
- **모듈 19**: **제출과 초기화**
- **모듈 20**: **시그널 폼의 유효성 검사**
- **모듈 21**: **필드 상태와 오류 메시지**

---

<!--
## **A Note on AI & Feedback**
-->

<a id="a-note-on-ai-feedback"></a>

<a id="a-note-on-ai--feedback"></a>

## **AI와 피드백에 관한 안내**

<!--
This tutor is powered by a Large Language Model (LLM). While we've worked hard to make it an expert, AIs can make mistakes. If you encounter an explanation or code example that seems incorrect, please let us know. You can correct the tutor, and it will use your feedback to adjust its response.

For any technical bugs or feature requests, please [submit an issue](https://github.com/angular/angular-cli/issues).
-->

이 튜터는 대규모 언어 모델(LLM)로 동작합니다.
전문적인 안내를 제공하도록 많은 노력을 기울였지만 AI는 실수할 수 있습니다.
설명이나 코드 예제에 잘못된 내용이 있는 것 같다면 알려주세요.
튜터에게 오류를 알려주면 피드백을 반영해 응답을 조절합니다.

기술적인 버그나 기능 요청은 [이슈로 등록해 주세요](https://github.com/angular/angular-cli/issues).
