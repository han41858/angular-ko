<!--
<!- TODO: need an Angular + AI logo ->

<docs-decorative-header title="Build with AI" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!- markdownlint-disable-line ->
Build AI-powered apps. Develop faster with AI.
</docs-decorative-header>

HELPFUL: Looking to get started with building in your favorite AI powered IDE? <br>Check out our [prompt rules and best practices](/ai/develop-with-ai).

Generative AI (GenAI) with large language models (LLMs) enables the creation of sophisticated and engaging application experiences, including personalized content, intelligent recommendations, media generation and comprehension, information summarization, and dynamic functionality.

Developing features like these would have previously required deep domain expertise and significant engineering effort. However, new products and SDKs are lowering the barrier to entry. Angular is well-suited for integrating AI into your web application as a result of:

- Angular's robust templating APIs enable the creation of dynamic, cleanly composed UIs made from generated content
- Strong, signal-based architecture designed to dynamically manage data and state
- Angular integrates seamlessly with AI SDKs and APIs

This guide demonstrates how you can use [Genkit](/ai#build-ai-powered-applications-with-genkit-and-angular), [Firebase AI Logic](/ai#build-ai-powered-applications-with-firebase-ai-logic-and-angular), and the [Gemini API](/ai#build-ai-powered-applications-with-gemini-api-and-angular) to infuse your Angular apps with AI today. This guide will jumpstart your AI-powered web app development journey by explaining how to begin integrating AI into Angular apps. This guide also shares resources, such as starter kits, example code, and recipes for common workflows, you can use to get up to speed quickly.

To get started, you should have a basic understanding of Angular. New to Angular? Try our [essentials guide](/essentials) or our [getting started tutorials](/tutorials).

NOTE: While this page features integrations and examples with Google AI products, tools like Genkit are model agnostic and allow you to choose your own model. In many cases, the examples and code samples are applicable to other third-party solutions.
-->

<!-- TODO: Angular + AI 로고가 필요합니다. -->

<docs-decorative-header title="AI로 개발하기" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!-- markdownlint-disable-line -->
AI 기능을 갖춘 앱을 만드세요.
AI와 함께 더 빠르게 개발하세요.
</docs-decorative-header>

도움말: 즐겨 사용하는 AI IDE에서 개발을 시작하려고 하시나요? <br>[프롬프트 규칙과 모범 사례](/ai/develop-with-ai)를 확인해 보세요.

대규모 언어 모델(LLM)을 활용하는 생성형 AI(GenAI)로 개인화된 콘텐츠, 지능형 추천, 미디어 생성과 이해, 정보 요약, 동적 기능 등 정교하고 흥미로운 애플리케이션 경험을 만들 수 있습니다.

이전에는 이러한 기능을 개발하려면 해당 분야의 깊은 전문 지식과 상당한 개발 노력이 필요했습니다.
하지만 새로운 제품과 SDK가 진입 장벽을 낮추고 있습니다.
Angular는 다음과 같은 이유로 웹 애플리케이션에 AI를 통합하는 데 적합합니다:

- Angular의 강력한 템플릿 API로 생성된 콘텐츠를 활용하는 동적이고 깔끔하게 구성된 UI를 만들 수 있습니다.
- 시그널 기반의 탄탄한 아키텍처가 데이터와 상태를 동적으로 관리하도록 설계되었습니다.
- Angular는 AI SDK 및 API와 매끄럽게 통합됩니다.

이 가이드는 [Genkit](/ai#build-ai-powered-applications-with-genkit-and-angular), [Firebase AI Logic](/ai#build-ai-powered-applications-with-firebase-ai-logic-and-angular), [Gemini API](/ai#build-ai-powered-applications-with-gemini-api-and-angular)를 사용해 Angular 앱에 AI를 도입하는 방법을 설명합니다.
Angular 앱에 AI를 통합하기 시작하는 방법을 안내하므로 AI 기반 웹 앱 개발에 빠르게 입문할 수 있습니다.
또한 스타터 키트, 예제 코드, 일반적인 작업 흐름의 구현 방법 등 빠르게 익히는 데 도움이 되는 리소스를 소개합니다.

시작하기 전에 Angular의 기본 내용을 이해하고 있어야 합니다.
Angular가 처음이라면 [핵심 가이드](/essentials)나 [시작하기 튜토리얼](/tutorials)을 살펴보세요.

참고: 이 페이지에서는 Google AI 제품을 사용한 통합과 예제를 소개하지만, Genkit과 같은 도구는 특정 모델에 종속되지 않으므로 원하는 모델을 선택할 수 있습니다.
대부분의 예제와 코드 샘플은 다른 회사의 솔루션에도 적용할 수 있습니다.

<!--
## Getting Started
-->

<a id="getting-started"></a>

## 시작하기

<!--
Building AI-powered applications is a new and rapidly developing field. It can be challenging to decide where to start and which technologies to choose. The following section provides three options to choose from:

1. _Genkit_ gives you the choice of [supported model and interface with a unified API](https://genkit.dev) for building full-stack applications. Ideal for applications requiring sophisticated back-end AI logic, such as personalized recommendations.

1. _Firebase AI Logic_ provides a secure client-side API for Google's models to build client-side only applications or mobile apps. Best for interactive AI features directly in the browser, such as real-time text analysis or basic chatbots.

1. _Gemini API_ enables you to build an application that uses the methods and functionality exposed through the API surface directly, best for full-stack applications. Suitable for applications needing direct control over AI models, like custom image generation or deep data processing.
-->

AI 기반 애플리케이션 개발은 새롭게 등장해 빠르게 발전하는 분야입니다.
어디에서 시작하고 어떤 기술을 선택할지 결정하기 어려울 수 있습니다.
다음 섹션에서는 선택할 수 있는 세 가지 방식을 소개합니다:

1. _Genkit_ 은 풀스택 애플리케이션을 개발할 수 있도록 [지원되는 모델을 선택하고 통합 API로 상호작용하는 방식](https://genkit.dev)을 제공합니다.
   개인화된 추천과 같이 정교한 백엔드 AI 로직이 필요한 애플리케이션에 적합합니다.

1. _Firebase AI Logic_ 은 클라이언트만으로 동작하는 애플리케이션이나 모바일 앱을 만들 수 있도록 Google 모델을 위한 안전한 클라이언트 측 API를 제공합니다.
   실시간 텍스트 분석이나 기본 챗봇 등 브라우저에서 직접 실행하는 대화형 AI 기능에 적합합니다.

1. _Gemini API_ 를 사용하면 API가 제공하는 메서드와 기능을 직접 활용하는 애플리케이션을 만들 수 있으며, 풀스택 애플리케이션에 적합합니다.
   커스텀 이미지 생성이나 심층 데이터 처리처럼 AI 모델을 직접 제어해야 하는 애플리케이션에 알맞습니다.

<!--
### Build AI-powered applications with Genkit and Angular
-->

<a id="build-ai-powered-applications-with-genkit-and-angular"></a>

### Genkit과 Angular로 AI 기반 애플리케이션 만들기

<!--
[Genkit](https://genkit.dev) is an open-source toolkit designed to help you build AI-powered features in web and mobile apps. It offers a unified interface for integrating AI models from Google, OpenAI, Anthropic, Ollama, and more, so you can explore and choose the best models for your needs. As a server-side solution, your web apps need a supported server environment, such as a node-based server in order to integrate with Genkit. Building a full-stack app using Angular SSR gives you the starting server-side code, for example.

Here are examples of how to build with Genkit and Angular:

- [Agentic Apps with Genkit and Angular starter-kit](https://github.com/angular/examples/tree/main/genkit-angular-starter-kit) — New to building with AI? Start here with a basic app that features an agentic workflow. Perfect place to start for your first AI building experience.

- [Use Genkit in an Angular app](https://genkit.dev/docs/frameworks/angular/) — Build a basic application that uses Genkit Flows, Angular and Gemini 2.5 Flash. This step-by-step walkthrough guides you through creating a full-stack Angular application with AI features.

- [Dynamic Story Generator app](https://github.com/angular/examples/tree/main/genkit-angular-story-generator) — Learn to build an agentic Angular app powered by Genkit, Gemini and Imagen 3 to dynamically generate a story based on user interaction featuring beautiful image panels to accompany the events that take place. Start here if you'd like to experiment with a more advanced use-case.

  This example also has an in-depth video walkthrough of the functionality:
  - [Watch "Building Agentic Apps with Angular and Genkit live!"](https://youtube.com/live/mx7yZoIa2n4?feature=share)
  - [Watch "Building Agentic Apps with Angular and Genkit live! PT 2"](https://youtube.com/live/YR6LN5_o3B0?feature=share)

- [Building Agentic apps with Firebase and Google Cloud (Barista Example)](https://developers.google.com/solutions/learn/agentic-barista) - Learn how to build an agentic coffee ordering app with Firebase and Google Cloud. This example uses both Firebase AI Logic and Genkit.

- [Creating Dynamic, Server-Driven UIs](https://github.com/angular/examples/tree/main/dynamic-sdui-app) - Learn to build Agentic Angular apps with UI views that are generated at runtime based on user input.

  This example also has an in-depth video walkthrough of the functionality:
  - [Watch "Exploring the future of web apps"](https://www.youtube.com/live/4qargCqOu70?feature=share)
-->

[Genkit](https://genkit.dev)은 웹 앱과 모바일 앱에 AI 기능을 구현하도록 돕는 오픈 소스 도구 모음입니다.
Google, OpenAI, Anthropic, Ollama 등의 AI 모델을 통합하는 일관된 인터페이스를 제공하므로 요구 사항에 가장 적합한 모델을 살펴보고 선택할 수 있습니다.
Genkit은 서버 측 솔루션이므로 통합하려면 Node 기반 서버와 같이 지원되는 서버 환경이 웹 앱에 필요합니다.
예를 들어 Angular SSR로 풀스택 앱을 만들면 시작에 필요한 서버 측 코드가 제공됩니다.

다음은 Genkit과 Angular를 사용하는 개발 예제입니다:

- [Genkit과 Angular 에이전트 앱 스타터 키트](https://github.com/angular/examples/tree/main/genkit-angular-starter-kit) — AI를 활용한 개발이 처음이라면 에이전트 작업 흐름이 포함된 기본 앱으로 시작해 보세요.
  처음 AI 기능을 개발하기에 적합한 출발점입니다.

- [Angular 앱에서 Genkit 사용하기](https://genkit.dev/docs/frameworks/angular/) — Genkit 플로, Angular, Gemini 2.5 Flash를 사용하는 기본 애플리케이션을 만듭니다.
  이 단계별 안내를 따라 AI 기능을 갖춘 풀스택 Angular 애플리케이션을 만들 수 있습니다.

- [동적 이야기 생성기 앱](https://github.com/angular/examples/tree/main/genkit-angular-story-generator) — Genkit, Gemini, Imagen 3를 활용해 사용자와의 상호작용에 따라 이야기를 동적으로 생성하고, 이야기 속 사건을 아름다운 이미지 패널로 표현하는 Angular 에이전트 앱을 만드는 방법을 배워보세요.
  더 고급 활용 사례를 실험하고 싶다면 이 예제로 시작하세요.

  이 예제의 기능을 자세히 설명하는 동영상도 있습니다:
  - ["Angular와 Genkit으로 에이전트 앱 만들기 라이브!" 시청하기](https://youtube.com/live/mx7yZoIa2n4?feature=share)
  - ["Angular와 Genkit으로 에이전트 앱 만들기 라이브! 2부" 시청하기](https://youtube.com/live/YR6LN5_o3B0?feature=share)

- [Firebase와 Google Cloud로 에이전트 앱 만들기(바리스타 예제)](https://developers.google.com/solutions/learn/agentic-barista) - Firebase와 Google Cloud로 커피 주문 에이전트 앱을 만드는 방법을 배워보세요.
  이 예제는 Firebase AI Logic과 Genkit을 모두 사용합니다.

- [서버에서 제어하는 동적 UI 만들기](https://github.com/angular/examples/tree/main/dynamic-sdui-app) - 사용자 입력에 따라 실행 중에 UI 뷰를 생성하는 Angular 에이전트 앱을 만드는 방법을 배워보세요.

  이 예제의 기능을 자세히 설명하는 동영상도 있습니다:
  - ["웹 앱의 미래 살펴보기" 시청하기](https://www.youtube.com/live/4qargCqOu70?feature=share)

<!--
### Build AI-powered applications with Firebase AI Logic and Angular
-->

<a id="build-ai-powered-applications-with-firebase-ai-logic-and-angular"></a>

### Firebase AI Logic과 Angular로 AI 기반 애플리케이션 만들기

<!--
[Firebase AI Logic](https://firebase.google.com/products/vertex-ai-in-firebase) provides a secure way to interact with Vertex AI Gemini API or Imagen API directly from your web and mobile apps. This is compelling for Angular developers since apps can be either full-stack or client-side only. If you are developing a client-side only application, Firebase AI Logic is a good fit for incorporating AI into your web apps.

Here is an example of how to build with Firebase AI Logic and Angular:

- [Firebase AI Logic x Angular Starter Kit](https://github.com/angular/examples/tree/main/firebase-ai-logic-angular-example) - Use this starter-kit to build an e-commerce application with a chat agent that can perform tasks. Start here if you do not have experience building with Firebase AI Logic and Angular.

  This example includes an [in-depth video walkthrough explaining the functionality and demonstrates how to add new features](https://youtube.com/live/4vfDz2al_BI).
-->

[Firebase AI Logic](https://firebase.google.com/products/vertex-ai-in-firebase)은 웹 앱과 모바일 앱에서 Vertex AI Gemini API나 Imagen API를 직접 안전하게 사용하는 방법을 제공합니다.
앱을 풀스택으로 만들 수도 있고 클라이언트만으로 구성할 수도 있으므로 Angular 개발자에게 매력적인 선택지입니다.
클라이언트만으로 동작하는 애플리케이션을 개발한다면 Firebase AI Logic은 웹 앱에 AI를 도입하기에 적합합니다.

다음은 Firebase AI Logic과 Angular를 사용하는 개발 예제입니다:

- [Firebase AI Logic x Angular 스타터 키트](https://github.com/angular/examples/tree/main/firebase-ai-logic-angular-example) - 이 스타터 키트로 작업을 수행하는 채팅 에이전트가 포함된 전자상거래 애플리케이션을 만들 수 있습니다.
  Firebase AI Logic과 Angular를 함께 사용한 경험이 없다면 여기서 시작하세요.

  이 예제에는 [기능을 자세히 설명하고 새 기능을 추가하는 방법을 보여주는 동영상](https://youtube.com/live/4vfDz2al_BI)이 포함되어 있습니다.

<!--
### Build AI-powered applications with Gemini API and Angular
-->

<a id="build-ai-powered-applications-with-gemini-api-and-angular"></a>

### Gemini API와 Angular로 AI 기반 애플리케이션 만들기

<!--
The [Gemini API](https://ai.google.dev/gemini-api/docs) provides access to state-of-the-art models from Google that support audio, images, video, and text input. These models that are optimized for specific use cases, [learn more on the Gemini API documentation site](https://ai.google.dev/gemini-api/docs/models).

- [AI Text Editor Angular app template](https://github.com/FirebaseExtended/firebase-framework-tools/tree/main/starters/angular/ai-text-editor) - Use this template to start with a fully functioning text editor with AI-powered features like refining text, expanding text and formalizing text. This is a good starting point to gain experience with calling the Gemini API via HTTP.

- [AI Chatbot app template](https://github.com/FirebaseExtended/firebase-framework-tools/tree/main/starters/angular/ai-chatbot) - This template starts with a chatbot user interface that communicates with the Gemini API via HTTP.
-->

[Gemini API](https://ai.google.dev/gemini-api/docs)는 오디오, 이미지, 동영상, 텍스트 입력을 지원하는 Google의 최신 모델에 대한 접근을 제공합니다.
이 모델은 특정 활용 사례에 맞춰 최적화되어 있습니다.
자세한 내용은 [Gemini API 문서 사이트에서 확인하세요](https://ai.google.dev/gemini-api/docs/models).

- [AI 텍스트 에디터 Angular 앱 템플릿](https://github.com/FirebaseExtended/firebase-framework-tools/tree/main/starters/angular/ai-text-editor) - 텍스트 다듬기, 내용 확장, 격식 있는 표현으로 바꾸기 등 AI 기능을 갖춘 완성된 텍스트 에디터로 시작할 수 있는 템플릿입니다.
  HTTP로 Gemini API를 호출하는 경험을 쌓기에 좋은 출발점입니다.

- [AI 챗봇 앱 템플릿](https://github.com/FirebaseExtended/firebase-framework-tools/tree/main/starters/angular/ai-chatbot) - HTTP로 Gemini API와 통신하는 챗봇 사용자 인터페이스로 시작하는 템플릿입니다.

<!--
## Best Practices
-->

<a id="best-practices"></a>

## 모범 사례

<!--
### Connecting to model providers and keeping your API Credentials Secure
-->

<a id="connecting-to-model-providers-and-keeping-your-api-credentials-secure"></a>

### 모델 제공업체에 연결하고 API 인증 정보 안전하게 보관하기

<!--
When connecting to model providers, it is important to keep your API secrets safe. _Never put your API key in a file that ships to the client, such as `environments.ts`_.

Your application's architecture determines which AI APIs and tools to choose. Specifically, choose based on whether or not your application is client-side or server-side. Tools such as Firebase AI Logic provide a secure connection to the model APIs for client-side code. If you want to use a different API than Firebase AI Logic or prefer to use a different model provider, consider creating a proxy-server or even [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) to serve as a proxy and not expose your API keys.

For an example of connecting using a client-side app, see the code: [Firebase AI Logic Angular example repository](https://github.com/angular/examples/tree/main/firebase-ai-logic-angular-example).

For server-side connections to model APIs that require API keys, prefer using a secrets manager or environment variable, not `environments.ts`. You should follow standard best practices for securing API keys and credentials. Firebase now provides a new secrets manager with the latest updates from Firebase App Hosting. To learn more, [check out the official documentation](https://firebase.google.com/docs/app-hosting/configure).

For a server-side connection example in a full-stack application, see the code: [Angular AI Example (Genkit and Angular Story Generator) repository](https://github.com/angular/examples/tree/main/genkit-angular-story-generator).
-->

모델 제공업체에 연결할 때는 API 비밀 정보를 안전하게 보관해야 합니다.
_`environments.ts`와 같이 클라이언트에 전달되는 파일에 API 키를 넣으면 안 됩니다_.

어떤 AI API와 도구를 선택할지는 애플리케이션 아키텍처에 따라 달라집니다.
특히 클라이언트 측 애플리케이션인지 서버 측 애플리케이션인지에 따라 선택하세요.
Firebase AI Logic과 같은 도구는 클라이언트 측 코드에서 모델 API에 안전하게 연결할 수 있게 합니다.
Firebase AI Logic 이외의 API나 다른 모델 제공업체를 사용하고 싶다면 프록시 서버를 만들거나 [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)를 프록시로 사용해 API 키를 노출하지 않는 방법을 고려하세요.

클라이언트 측 앱에서 연결하는 예제 코드는 [Firebase AI Logic Angular 예제 저장소](https://github.com/angular/examples/tree/main/firebase-ai-logic-angular-example)를 확인하세요.

API 키가 필요한 모델 API에 서버에서 연결할 때는 `environments.ts` 대신 비밀 정보 관리자나 환경 변수를 사용하는 것이 좋습니다.
API 키와 인증 정보를 안전하게 관리하는 표준 모범 사례를 따르세요.
Firebase는 최신 Firebase App Hosting 업데이트를 통해 새로운 비밀 정보 관리자를 제공합니다.
자세한 내용은 [공식 문서를 확인하세요](https://firebase.google.com/docs/app-hosting/configure).

풀스택 애플리케이션의 서버 측 연결 예제 코드는 [Angular AI 예제(Genkit과 Angular 이야기 생성기) 저장소](https://github.com/angular/examples/tree/main/genkit-angular-story-generator)를 확인하세요.

<!--
### Use Tool Calling to enhance apps
-->

<a id="use-tool-calling-to-enhance-apps"></a>

### 도구 호출로 앱 기능 확장하기

<!--
If you want to build agentic workflows, where agents are able to act and use tools to solve problems based on prompts use "tool calling". Tool calling, also known as function calling, is a way to provide LLMs the ability to make requests back to the application that called it. As a developer, you define which tools are available and you are in control of how or when the tools are called.

Tool calling further enhances your web apps by expanding your AI integration further than a question and answer style chat bot. In fact, you can empower your model to request function calls using the function calling API of your model provider. The available tools can be used to perform more complex actions within the context of your application.

In the [e-commerce example](https://github.com/angular/examples/blob/main/firebase-ai-logic-angular-example/src/app/ai.service.ts#L88) of the [Angular examples repository](https://github.com/angular/examples), the LLM requests to make calls to functions for inventory in order to gain the necessary context to perform more complex tasks such as calculating how much a group of items in the store will cost. The scope of the available API is up to you as a developer just as is whether or not to call a function requested by the LLM. You remain in control of the flow of execution. You can expose specific functions of a service for example but not all functions of that service.
-->

에이전트가 프롬프트에 따라 행동하고 도구를 사용해 문제를 해결하는 작업 흐름을 만들려면 "도구 호출"을 사용하세요.
함수 호출이라고도 하는 도구 호출은 LLM이 자신을 호출한 애플리케이션에 다시 요청을 보낼 수 있도록 하는 방식입니다.
개발자는 사용할 수 있는 도구를 정의하고 도구를 언제, 어떻게 호출할지 제어합니다.

도구 호출을 사용하면 질문과 답변을 주고받는 챗봇을 넘어 웹 앱에 AI를 더 폭넓게 통합할 수 있습니다.
모델 제공업체의 함수 호출 API를 통해 모델이 함수 실행을 요청하도록 할 수 있습니다.
제공된 도구는 애플리케이션의 맥락 안에서 더 복잡한 작업을 수행하는 데 사용할 수 있습니다.

[Angular 예제 저장소](https://github.com/angular/examples)의 [전자상거래 예제](https://github.com/angular/examples/blob/main/firebase-ai-logic-angular-example/src/app/ai.service.ts#L88)에서는 LLM이 재고 관련 함수 호출을 요청해 필요한 맥락 정보를 얻고, 매장의 여러 상품 가격 합계를 계산하는 등의 복잡한 작업을 수행합니다.
제공하는 API의 범위와 LLM이 요청한 함수를 실제로 호출할지는 모두 개발자가 결정합니다.
실행 흐름의 제어권은 개발자에게 있습니다.
예를 들어 서비스의 모든 함수가 아니라 특정 함수만 노출할 수 있습니다.

<!--
### Handling non-deterministic responses
-->

<a id="handling-non-deterministic-responses"></a>

### 비결정적인 응답 처리하기

<!--
Because models can return non-deterministic results, your applications should be designed with that in mind. Here are a few strategies that you can use in your application implementation:

- Adjust prompts and model parameters (such as [temperature](https://ai.google.dev/gemini-api/docs/prompting-strategies)) for more or less deterministic responses. You can [find out more in the prompting strategies section](https://ai.google.dev/gemini-api/docs/prompting-strategies) of [ai.google.dev](https://ai.google.dev/).
- Use the "human in the loop" strategy where a human verifies outputs before proceeding in a workflow. Build your application workflows to allow operators (humans or other models) to verify outputs and confirm key decisions.
- Employ tool (or function) calling and schema constraints to guide and restrict model responses to predefined formats, increasing response predictability.

Even considering these strategies and techniques, sensible fallbacks should be incorporated in your application design. Follow existing standards of application resiliency. For example, it is not acceptable for an application to crash if a resource or API is not available. In that scenario, an error message is displayed to the user and, if applicable, options for next steps are also displayed. Building AI-powered applications requires the same consideration. Confirm that the response is aligned with the expected output and provide a "safe landing" in case it is not aligned by way of [graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation). This also applies to API outages for LLM providers.

Consider this example: The LLM provider is not responding. A potential strategy to handle the outage is:

- Save the response from the user to use in a retry scenario (now or at a later time)
- Alert the user to the outage with an appropriate message that doesn't reveal sensitive information
- Resume the conversation at a later time once the services are available again.
-->

모델은 같은 입력에도 다른 결과를 반환할 수 있으므로 이를 고려해 애플리케이션을 설계해야 합니다.
애플리케이션을 구현할 때 다음과 같은 전략을 사용할 수 있습니다:

- 프롬프트와 [temperature](https://ai.google.dev/gemini-api/docs/prompting-strategies) 같은 모델 매개변수를 조절해 응답의 일관성이나 다양성을 조절합니다.
  자세한 내용은 [ai.google.dev](https://ai.google.dev/)의 [프롬프트 작성 전략 섹션](https://ai.google.dev/gemini-api/docs/prompting-strategies)에서 확인할 수 있습니다.
- 작업 흐름의 다음 단계로 진행하기 전에 사람이 출력을 검증하는 "human in the loop" 전략을 사용합니다.
  작업자(사람이나 다른 모델)가 출력을 검증하고 중요한 결정을 확인할 수 있도록 애플리케이션의 작업 흐름을 구성하세요.
- 도구(또는 함수) 호출과 스키마 제약 조건으로 모델 응답을 미리 정의한 형식으로 유도하고 제한해 예측 가능성을 높입니다.

이러한 전략과 기법을 고려하더라도 애플리케이션 설계에는 합리적인 대체 동작이 포함되어야 합니다.
애플리케이션 복원력에 관한 기존 표준을 따르세요.
예를 들어 리소스나 API를 사용할 수 없다고 애플리케이션이 비정상적으로 종료되어서는 안 됩니다.
이 경우 사용자에게 오류 메시지를 표시하고, 해당한다면 다음에 수행할 수 있는 작업도 안내합니다.
AI 기반 애플리케이션을 만들 때도 같은 고려가 필요합니다.
응답이 예상한 출력에 부합하는지 확인하고, 부합하지 않으면 [단계적 기능 축소](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation)를 통해 안정적으로 대응하세요.
이는 LLM 제공업체의 API 장애에도 적용됩니다.

LLM 제공업체가 응답하지 않는 상황을 예로 들어 봅시다.
다음과 같은 전략으로 장애를 처리할 수 있습니다:

- 지금 또는 나중에 재시도할 수 있도록 사용자의 응답을 저장합니다.
- 민감한 정보를 노출하지 않는 적절한 메시지로 장애를 알립니다.
- 서비스를 다시 사용할 수 있게 되면 대화를 이어갑니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
To learn about LLM prompts and AI IDE setup, see the following guides:

<docs-pill-row>
  <docs-pill href="ai/develop-with-ai" title="LLM prompts and IDE setup"/>
  <docs-pill href="ai/agent-skills" title="Agent Skills"/>
</docs-pill-row>
-->

LLM 프롬프트와 AI IDE 설정은 다음 가이드를 참고하세요:

<docs-pill-row>
  <docs-pill href="ai/develop-with-ai" title="LLM 프롬프트와 IDE 설정"/>
  <docs-pill href="ai/agent-skills" title="에이전트 스킬"/>
</docs-pill-row>
