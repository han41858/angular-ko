<!--
# Design patterns for AI SDKs and signal APIs
-->

<a id="design-patterns-for-ai-sdks-and-signal-apis"></a>

# AI SDK와 시그널 API의 디자인 패턴

<!--
Interacting with AI and Large Language Model (LLM) APIs introduces unique challenges, such as managing asynchronous operations, handling streaming data, and designing a responsive user experience for potentially slow or unreliable network requests. Angular [signals](guide/signals) and the [`resource`](guide/signals/resource) API provide powerful tools to solve these problems elegantly.
-->

AI와 대규모 언어 모델(LLM) API를 사용하면 비동기 작업 관리, 스트리밍 데이터 처리, 느리거나 불안정할 수 있는 네트워크 요청에 반응하는 사용자 경험 설계와 같은 고유한 과제를 마주하게 됩니다.
Angular [시그널](guide/signals)과 [`resource`](guide/signals/resource) API는 이러한 문제를 간결하게 해결할 수 있는 강력한 도구입니다.

<!--
## Triggering requests with signals
-->

<a id="triggering-requests-with-signals"></a>

## 시그널로 요청 실행하기

<!--
A common pattern when working with user-provided prompts is to separate the user's live input from the submitted value that triggers the API call.

1. Store the user's raw input in one signal as they type
2. When the user submits (e.g., by clicking a button), update a second signal with contents of the first signal.
3. Use the second signal in the **`params`** field of your `resource`.

This setup ensures the resource's **`loader`** function only runs when the user explicitly submits their prompt, not on every keystroke. You can use additional signal parameters, like a `sessionId` or `userId` (which can be useful for creating persistent LLM sessions), in the `loader` field. This way, the request always uses these parameters' current values without re-triggering the asynchronous function defined in the `loader` field.

Many AI SDKs provide helper methods for making API calls. For example, the Genkit client library exposes a `runFlow` method for calling Genkit flows, which you can call from a resource's `loader`. For other APIs, you can use the [`httpResource`](guide/signals/resource#reactive-data-fetching-with-httpresource).

The following example shows a `resource` that fetches parts of an AI-generated story. The `loader` is triggered only when the `storyInput` signal changes.

```ts
// A resource that fetches three parts of an AI generated story
storyResource = resource({
  // The default value to use before the first request or on error
  defaultValue: DEFAULT_STORY,
  // The loader is re-triggered when this signal changes
  params: () => this.storyInput(),
  // The async function to fetch data
  loader: ({params}): Promise<StoryData> => {
    // The params value is the current value of the storyInput signal
    const url = this.endpoint();
    return runFlow({
      url,
      input: {
        userInput: params,
        sessionId: this.storyService.sessionId(), // Read from another signal
      },
    });
  },
});
```
-->

사용자가 입력하는 프롬프트를 다룰 때는 실시간 입력값과 API 호출을 실행하는 제출값을 분리하는 패턴을 자주 사용합니다.

1. 사용자가 입력하는 원래 값을 하나의 시그널에 저장합니다.
2. 사용자가 버튼을 클릭하는 등의 방법으로 제출하면 첫 번째 시그널의 값을 두 번째 시그널에 반영합니다.
3. 두 번째 시그널을 `resource`의 **`params`** 필드에 사용합니다.

이렇게 구성하면 사용자가 키를 누를 때마다 실행하는 대신, 명시적으로 프롬프트를 제출할 때만 리소스의 **`loader`** 함수를 실행할 수 있습니다.
`loader` 필드에서는 `sessionId`나 `userId`와 같은 추가 시그널 매개변수를 사용할 수 있습니다(지속적인 LLM 세션을 만드는 데 유용합니다).
그러면 `loader` 필드에 정의한 비동기 함수를 다시 실행하지 않으면서 요청에 항상 이 매개변수의 현재 값을 사용할 수 있습니다.

여러 AI SDK는 API 호출을 위한 헬퍼 메서드를 제공합니다.
예를 들어 Genkit 클라이언트 라이브러리는 Genkit 플로를 호출하는 `runFlow` 메서드를 제공하며, 이 메서드는 리소스의 `loader`에서 호출할 수 있습니다.
다른 API에는 [`httpResource`](guide/signals/resource#reactive-data-fetching-with-httpresource)를 사용할 수 있습니다.

다음 예제는 AI가 생성한 이야기의 일부를 가져오는 `resource`입니다.
`loader`는 `storyInput` 시그널이 변경될 때만 실행됩니다.

```ts
// AI가 생성한 이야기의 세 부분을 가져오는 리소스입니다.
storyResource = resource({
  // 첫 요청 전이나 오류가 발생했을 때 사용할 기본값입니다.
  defaultValue: DEFAULT_STORY,
  // 이 시그널이 변경되면 로더를 다시 실행합니다.
  params: () => this.storyInput(),
  // 데이터를 가져오는 비동기 함수입니다.
  loader: ({params}): Promise<StoryData> => {
    // params 값은 storyInput 시그널의 현재 값입니다.
    const url = this.endpoint();
    return runFlow({
      url,
      input: {
        userInput: params,
        sessionId: this.storyService.sessionId(), // 다른 시그널에서 값을 읽습니다.
      },
    });
  },
});
```

<!--
## Preparing LLM data for templates
-->

<a id="preparing-llm-data-for-templates"></a>

## 템플릿에 사용할 LLM 데이터 준비하기

<!--
You can configure LLM APIs to return structured data. Strongly typing your `resource` to match the expected output from the LLM provides better type safety and editor autocompletion.

To manage state derived from a resource, use a `computed` signal or `linkedSignal`. Because `linkedSignal` [provides access to prior values](guide/signals/linked-signal), it can serve a variety of AI-related use cases, including

- building a chat history
- preserving or customizing data that templates display while LLMs generate content

In the example below, `storyParts` is a `linkedSignal` that appends the latest story parts returned from `storyResource` to the existing array of story parts.

```ts
storyParts = linkedSignal<string[], string[]>({
  // The source signal that triggers the computation
  source: () => this.storyResource.value().storyParts,
  // The computation function
  computation: (newStoryParts, previous) => {
    // Get the previous value of this linkedSignal, or an empty array
    const existingStoryParts = previous?.value || [];
    // Return a new array with the old and new parts
    return [...existingStoryParts, ...newStoryParts];
  },
});
```
-->

LLM API가 구조화된 데이터를 반환하도록 설정할 수 있습니다.
LLM의 예상 출력에 맞게 `resource`의 타입을 명확하게 지정하면 타입 안전성과 에디터의 자동 완성 기능을 개선할 수 있습니다.

리소스로부터 파생된 상태를 관리하려면 `computed` 시그널이나 `linkedSignal`을 사용하세요.
`linkedSignal`은 [이전 값에 접근할 수 있기 때문에](guide/signals/linked-signal) 다음과 같은 다양한 AI 활용 사례에 사용할 수 있습니다:

- 채팅 기록 구성하기
- LLM이 콘텐츠를 생성하는 동안 템플릿에 표시할 데이터를 유지하거나 변경하기

다음 예제의 `storyParts`는 `storyResource`가 반환한 최신 이야기 부분을 기존 이야기 배열에 추가하는 `linkedSignal`입니다.

```ts
storyParts = linkedSignal<string[], string[]>({
  // 연산을 실행하는 원본 시그널입니다.
  source: () => this.storyResource.value().storyParts,
  // 연산 함수입니다.
  computation: (newStoryParts, previous) => {
    // 이 linkedSignal의 이전 값이나 빈 배열을 가져옵니다.
    const existingStoryParts = previous?.value || [];
    // 기존 부분과 새 부분을 합친 새 배열을 반환합니다.
    return [...existingStoryParts, ...newStoryParts];
  },
});
```

<!--
## Performance and user experience
-->

<a id="performance-and-user-experience"></a>

## 성능과 사용자 경험

<!--
LLM APIs may be slower and more error-prone than conventional, more deterministic APIs. You can use several Angular features to build a performant and user-friendly interface.

- **Scoped Loading:** place the `resource` in the component that directly uses the data. This helps limit change detection cycles (especially in zoneless applications) and prevents blocking other parts of your application. If data needs to be shared across multiple components, provide the `resource` from a service.
- **SSR and Hydration:** use Server-Side Rendering (SSR) with incremental hydration to render the initial page content quickly. You can show a placeholder for the AI-generated content and defer fetching the data until the component hydrates on the client.
- **Loading State:** use the `resource` `LOADING` [status](guide/signals/resource#resource-status) to show an indicator, like a spinner, while the request is in flight. This status covers both initial loads and reloads.
- **Error Handling and Retries:** use the `resource` [**`reload()`**](guide/signals/resource#reloading) method as a simple way for users to retry failed requests, may be more prevalent when relying on AI generated content.

The following example demonstrates how to create a responsive UI to dynamically display an AI generated image with loading and retry functionality.

```angular-html
<!- Display a loading spinner while the LLM generates the image ->
@if (imgResource.isLoading()) {
  <div class="img-placeholder">
    <mat-spinner [diameter]="50" />
  </div>
  <!- Dynamically populates the src attribute with the generated image URL ->
} @else if (imgResource.hasValue()) {
  <img [src]="imgResource.value()" />
  <!- Provides a retry option if the request fails  ->
} @else {
  <div class="img-placeholder" (click)="imgResource.reload()">
    <mat-icon fontIcon="refresh" />
    <p>Failed to load image. Click to retry.</p>
  </div>
}
```
-->

LLM API는 결과가 비교적 예측 가능한 일반적인 API보다 느리고 오류가 발생하기 쉽습니다.
Angular의 여러 기능을 활용하면 성능이 좋고 사용하기 편한 인터페이스를 만들 수 있습니다.

- **로딩 범위 제한:** 데이터를 직접 사용하는 컴포넌트에 `resource`를 배치하세요.
  이렇게 하면 특히 존리스 애플리케이션에서 변경 감지 사이클의 범위를 제한하고, 애플리케이션의 다른 부분이 대기하는 것을 방지할 수 있습니다.
  여러 컴포넌트에서 데이터를 공유해야 한다면 서비스에서 `resource`를 제공하세요.
- **SSR과 하이드레이션:** 점진적 하이드레이션과 서버 사이드 렌더링(SSR)을 함께 사용하면 초기 페이지 콘텐츠를 빠르게 렌더링할 수 있습니다.
  AI가 생성할 콘텐츠 대신 플레이스홀더를 표시하고, 클라이언트에서 컴포넌트가 하이드레이션될 때까지 데이터 요청을 미룰 수 있습니다.
- **로딩 상태:** 요청이 진행 중인 동안 `resource`의 `LOADING` [상태](guide/signals/resource#resource-status)를 사용해 스피너와 같은 표시기를 보여주세요.
  이 상태는 최초 로딩과 다시 로딩하는 경우를 모두 포함합니다.
- **오류 처리와 재시도:** `resource`의 [**`reload()`**](guide/signals/resource#reloading) 메서드를 사용하면 사용자가 실패한 요청을 간단하게 재시도하도록 할 수 있습니다.
  AI가 생성하는 콘텐츠를 사용하는 경우에는 요청 실패가 더 자주 발생할 수 있습니다.

다음 예제는 로딩과 재시도 기능을 제공하면서 AI가 생성한 이미지를 동적으로 표시하는 반응성 있는 UI를 만드는 방법입니다.

```angular-html
<!-- LLM이 이미지를 생성하는 동안 로딩 스피너를 표시합니다. -->
@if (imgResource.isLoading()) {
  <div class="img-placeholder">
    <mat-spinner [diameter]="50" />
  </div>
  <!-- 생성한 이미지 URL을 src 어트리뷰트에 동적으로 지정합니다. -->
} @else if (imgResource.hasValue()) {
  <img [src]="imgResource.value()" />
  <!-- 요청이 실패하면 재시도할 수 있도록 합니다. -->
} @else {
  <div class="img-placeholder" (click)="imgResource.reload()">
    <mat-icon fontIcon="refresh" />
    <p>Failed to load image. Click to retry.</p>
  </div>
}
```

<!--
## AI patterns in action: streaming chat responses
-->

<a id="ai-patterns-in-action-streaming-chat-responses"></a>

## AI 패턴 활용: 채팅 응답 스트리밍

<!--
Interfaces often display partial results from LLM-based APIs incrementally as response data arrives. Angular's resource API provides the ability to stream responses to support this type of pattern. The `stream` property of `resource` accepts an asynchronous function you can use to apply updates to a signal value over time. The signal being updated represents the data being streamed.

```ts
characters = resource({
  stream: async () => {
    const data = signal<ResourceStreamItem<string>>({value: ''});
    // Calls a Genkit streaming flow using the streamFlow method
    // exposed by the Genkit client SDK
    const response = streamFlow({
      url: '/streamCharacters',
      input: 10,
    });

    (async () => {
      for await (const chunk of response.stream) {
        data.update((prev) => {
          if ('value' in prev) {
            return {value: `${prev.value} ${chunk}`};
          } else {
            return {error: chunk as unknown as Error};
          }
        });
      }
    })();

    return data;
  },
});
```

The `characters` member is updated asynchronously and can be displayed in the template.

```angular-html
@if (characters.isLoading()) {
  <p>Loading...</p>
} @else if (characters.hasValue()) {
  <p>{{ characters.value() }}</p>
} @else {
  <p>{{ characters.error() }}</p>
}
```

On the server side, in `server.ts` for example, the defined endpoint sends the data to be streamed to the client. The following code uses Gemini with the Genkit framework but this technique is applicable to other APIs that support streaming responses from LLMs:

```ts
import {startFlowServer} from '@genkit-ai/express';
import {genkit} from 'genkit/beta';
import {googleAI, gemini20Flash} from '@genkit-ai/googleai';

const ai = genkit({plugins: [googleAI()]});

export const streamCharacters = ai.defineFlow(
  {
    name: 'streamCharacters',
    inputSchema: z.number(),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (count, {sendChunk}) => {
    const {response, stream} = ai.generateStream({
      model: gemini20Flash,
      config: {
        temperature: 1,
      },
      prompt: `Generate ${count} different RPG game characters.`,
    });

    (async () => {
      for await (const chunk of stream) {
        sendChunk(chunk.content[0].text!);
      }
    })();

    return (await response).text;
  },
);

startFlowServer({
  flows: [streamCharacters],
});
```
-->

LLM 기반 API를 사용하는 인터페이스는 응답 데이터가 도착하는 대로 결과의 일부를 점진적으로 표시하는 경우가 많습니다.
Angular의 리소스 API는 이러한 패턴을 지원하도록 응답을 스트리밍할 수 있습니다.
`resource`의 `stream` 프로퍼티는 시간에 따라 시그널 값을 갱신하는 비동기 함수를 받습니다.
갱신하는 시그널은 스트리밍 중인 데이터를 나타냅니다.

```ts
characters = resource({
  stream: async () => {
    const data = signal<ResourceStreamItem<string>>({value: ''});
    // Genkit 클라이언트 SDK가 제공하는 streamFlow 메서드로
    // Genkit 스트리밍 플로를 호출합니다.
    const response = streamFlow({
      url: '/streamCharacters',
      input: 10,
    });

    (async () => {
      for await (const chunk of response.stream) {
        data.update((prev) => {
          if ('value' in prev) {
            return {value: `${prev.value} ${chunk}`};
          } else {
            return {error: chunk as unknown as Error};
          }
        });
      }
    })();

    return data;
  },
});
```

`characters` 멤버는 비동기로 갱신되며 템플릿에 표시할 수 있습니다.

```angular-html
@if (characters.isLoading()) {
  <p>Loading...</p>
} @else if (characters.hasValue()) {
  <p>{{ characters.value() }}</p>
} @else {
  <p>{{ characters.error() }}</p>
}
```

서버 측에서는 `server.ts` 등에 정의한 엔드포인트가 클라이언트로 스트리밍할 데이터를 전송합니다.
다음 코드는 Genkit 프레임워크와 Gemini를 사용하지만, 이 기법은 LLM 응답 스트리밍을 지원하는 다른 API에도 적용할 수 있습니다:

```ts
import {startFlowServer} from '@genkit-ai/express';
import {genkit} from 'genkit/beta';
import {googleAI, gemini20Flash} from '@genkit-ai/googleai';

const ai = genkit({plugins: [googleAI()]});

export const streamCharacters = ai.defineFlow(
  {
    name: 'streamCharacters',
    inputSchema: z.number(),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (count, {sendChunk}) => {
    const {response, stream} = ai.generateStream({
      model: gemini20Flash,
      config: {
        temperature: 1,
      },
      prompt: `Generate ${count} different RPG game characters.`,
    });

    (async () => {
      for await (const chunk of stream) {
        sendChunk(chunk.content[0].text!);
      }
    })();

    return (await response).text;
  },
);

startFlowServer({
  flows: [streamCharacters],
});
```
