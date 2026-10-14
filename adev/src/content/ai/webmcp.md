<!--
# WebMCP
-->

<a id="webmcp"></a>

# WebMCP

<!--
WebMCP is a [proposed web standard](https://github.com/webmachinelearning/webmcp/) that allows web applications to expose structured tools directly to AI agents running natively in the browser. Tools defined by an application allow AI assistants to interact with it directly, providing additional capabilities to the agent and reducing the need for DOM interactions.

For example, an application to register a new user might provide a WebMCP tool for a browser's AI agent to create the user directly rather than requiring the agent to go through a complex wizard UI via DOM interactions.

Angular provides experimental support for WebMCP, allowing you to easily register tools tied to your application's dependency injection lifecycle and automatically turn your Signal Forms into AI-ready tools.

IMPORTANT: The WebMCP spec is very early in its lifecycle and is undergoing frequent changes. As such, WebMCP support in Angular is currently [**experimental**](reference/releases#experimental). APIs are subject to change even outside of major versions.
-->

WebMCP는 웹 애플리케이션이 브라우저에서 기본적으로 실행되는 AI 에이전트에 구조화된 도구를 직접 제공할 수 있게 하는 [제안된 웹 표준](https://github.com/webmachinelearning/webmcp/)입니다.
애플리케이션이 정의한 도구를 사용하면 AI 어시스턴트가 애플리케이션과 직접 상호작용할 수 있으므로, 에이전트의 기능을 확장하고 DOM 상호작용의 필요성을 줄일 수 있습니다.

예를 들어 신규 사용자 등록 애플리케이션은 브라우저의 AI 에이전트가 DOM 상호작용으로 복잡한 마법사 UI를 거치는 대신, 사용자를 직접 생성하도록 WebMCP 도구를 제공할 수 있습니다.

Angular는 WebMCP를 실험적으로 지원합니다.
애플리케이션의 의존성 주입 생명주기와 연결된 도구를 쉽게 등록하고, 시그널 폼을 AI가 사용할 수 있는 도구로 자동 변환할 수 있습니다.

중요: WebMCP 명세는 매우 초기 단계이며 자주 변경됩니다.
따라서 Angular의 WebMCP 지원은 현재 [**실험 단계**](reference/releases#experimental)입니다.
메이저 버전 업데이트가 아니더라도 API가 변경될 수 있습니다.

<!--
## Provide tools for the application
-->

<a id="provide-tools-for-the-application"></a>

## 애플리케이션에 도구 제공하기

<!--
Use [`provideExperimentalWebMcpTools`](api/core/provideExperimentalWebMcpTools) in your application config to register tools for the entire lifecycle of the application. Tools provided this way are automatically registered when the application initializes and unregistered when the application is destroyed.

The `execute` callback is invoked in the injection context of the associated `Injector`, meaning you can [`inject`](api/core/inject) services directly.

```ts {header:"main.ts"}
import {Service, inject, provideExperimentalWebMcpTools} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppRoot} from './app-root';

@Service()
class Greeter {
  sayHello(): string {
    return 'Hello agent!';
  }
}

bootstrapApplication(AppRoot, {
  providers: [
    provideExperimentalWebMcpTools([
      {
        name: 'greet',
        description: 'Greets the agent.',
        inputSchema: {type: 'object', properties: {}},
        execute: () => {
          const greeter = inject(Greeter);

          return {content: [{type: 'text', text: greeter.sayHello()}]};
        },
      },
    ]),
  ],
});
```
-->

애플리케이션 설정에 [`provideExperimentalWebMcpTools`](api/core/provideExperimentalWebMcpTools)를 사용하면 애플리케이션의 전체 생명주기 동안 사용할 도구를 등록할 수 있습니다.
이 방식으로 제공한 도구는 애플리케이션을 초기화할 때 자동으로 등록되고, 애플리케이션을 종료할 때 등록이 해제됩니다.

`execute` 콜백은 연결된 `Injector`의 주입 컨텍스트에서 실행되므로 서비스를 직접 [`inject`](api/core/inject)할 수 있습니다.

```ts {header:"main.ts"}
import {Service, inject, provideExperimentalWebMcpTools} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppRoot} from './app-root';

@Service()
class Greeter {
  sayHello(): string {
    return 'Hello agent!';
  }
}

bootstrapApplication(AppRoot, {
  providers: [
    provideExperimentalWebMcpTools([
      {
        name: 'greet',
        description: 'Greets the agent.',
        inputSchema: {type: 'object', properties: {}},
        execute: () => {
          const greeter = inject(Greeter);

          return {content: [{type: 'text', text: greeter.sayHello()}]};
        },
      },
    ]),
  ],
});
```

<!--
### Define tool parameters
-->

<a id="define-tool-parameters"></a>

### 도구 매개변수 정의하기

<!--
When a tool requires input from the AI assistant, define the expected arguments inside `inputSchema` using [JSON Schema](https://json-schema.org/) syntax. Angular automatically infers the parameter types passed into your `execute` callback based on the schema definition.

```ts {header:"main.ts"}
import {provideExperimentalWebMcpTools} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppRoot} from './app-root';

bootstrapApplication(AppRoot, {
  providers: [
    provideExperimentalWebMcpTools([
      {
        name: 'searchCatalog',
        description: 'Searches the store catalog for products matching a query.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search keywords.',
            },
            maxResults: {
              type: 'number',
              description: 'Maximum number of results to return.',
            },
          },
          required: ['query'],
          additionalProperties: false,
        },
        execute: ({query, maxResults}) => {
          // Type of `query` is inferred as `string`.
          // Type of `maxResults` is inferred as `number | undefined`.

          // Consider validating this at runtime, since inputs may not be validated to match the schema.
          if (typeof query !== 'string') throw new Error(`Bad query: ${query}`);
          if (typeof maxResults !== 'number' && maxResults !== undefined)
            throw new Error(`Bad maxResults: ${maxResults}`);

          const limit = maxResults ?? 5;
          return {
            content: [{type: 'text', text: `Returning up to ${limit} results for "${query}".`}],
          };
        },
      },
    ]),
  ],
});
```

TIP: Use `required: ['param1', 'param2', ...]` to remove `undefined` from the types of those parameters and use `additionalProperties: false` to restrict the argument object's type to only these parameters.
-->

도구에 AI 어시스턴트의 입력이 필요하다면 [JSON Schema](https://json-schema.org/) 문법으로 `inputSchema`에 예상 인자를 정의하세요.
Angular는 스키마 정의를 바탕으로 `execute` 콜백에 전달할 매개변수의 타입을 자동으로 추론합니다.

```ts {header:"main.ts"}
import {provideExperimentalWebMcpTools} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppRoot} from './app-root';

bootstrapApplication(AppRoot, {
  providers: [
    provideExperimentalWebMcpTools([
      {
        name: 'searchCatalog',
        description: 'Searches the store catalog for products matching a query.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search keywords.',
            },
            maxResults: {
              type: 'number',
              description: 'Maximum number of results to return.',
            },
          },
          required: ['query'],
          additionalProperties: false,
        },
        execute: ({query, maxResults}) => {
          // `query`의 타입은 `string`으로 추론합니다.
          // `maxResults`의 타입은 `number | undefined`로 추론합니다.

          // 입력이 스키마에 맞는지 검증되지 않을 수 있으므로 실행 중 검증하는 것을 고려하세요.
          if (typeof query !== 'string') throw new Error(`Bad query: ${query}`);
          if (typeof maxResults !== 'number' && maxResults !== undefined)
            throw new Error(`Bad maxResults: ${maxResults}`);

          const limit = maxResults ?? 5;
          return {
            content: [{type: 'text', text: `Returning up to ${limit} results for "${query}".`}],
          };
        },
      },
    ]),
  ],
});
```

팁: `required: ['param1', 'param2', ...]`를 사용하면 해당 매개변수의 타입에서 `undefined`를 제외할 수 있습니다.
`additionalProperties: false`를 사용하면 인자 객체의 타입을 이 매개변수로만 제한할 수 있습니다.

<!--
## Provide tools for a route
-->

<a id="provide-tools-for-a-route"></a>

## 라우팅 규칙에 도구 제공하기

<!--
When building complex applications, you may only want certain tools available when the user is viewing specific routes. You can achieve this by providing tools directly in route definitions.

```ts {header:"routes.ts"}
import {provideExperimentalWebMcpTools} from '@angular/core';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
    providers: [
      provideExperimentalWebMcpTools([
        {
          name: 'exportDashboardReports',
          description: 'Exports the current dashboard analytics.',
          inputSchema: {type: 'object', properties: {}},
          execute: () => ({
            content: [{type: 'text', text: 'Dashboard export successfully triggered.'}],
          }),
        },
      ]),
    ],
  },
];
```

NOTE: When registering tools to a particular route, consider configuring the router to use [`withAutoCleanupInjectors`](api/router/withAutoCleanupInjectors) to ensure tools are automatically _unregistered_ when the user navigates away from the route. Without this option, WebMCP tools declared on routes will remain accessible to AI agents even after the user has navigated to a different route.

```ts {header:"app.config.ts"}
import {ApplicationConfig} from '@angular/core';
import {provideRouter, withAutoCleanupInjectors} from '@angular/router';
import {routes} from './routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withAutoCleanupInjectors())],
};
```
-->

복잡한 애플리케이션에서는 사용자가 특정 라우팅 규칙에 해당하는 화면을 보고 있을 때만 일부 도구를 제공하고 싶을 수 있습니다.
라우팅 규칙 정의에서 도구를 직접 제공하면 됩니다.

```ts {header:"routes.ts"}
import {provideExperimentalWebMcpTools} from '@angular/core';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
    providers: [
      provideExperimentalWebMcpTools([
        {
          name: 'exportDashboardReports',
          description: 'Exports the current dashboard analytics.',
          inputSchema: {type: 'object', properties: {}},
          execute: () => ({
            content: [{type: 'text', text: 'Dashboard export successfully triggered.'}],
          }),
        },
      ]),
    ],
  },
];
```

참고: 특정 라우팅 규칙에 도구를 등록할 때는 사용자가 해당 라우팅 규칙을 벗어나면 도구의 _등록이 자동으로 해제_ 되도록 라우터에 [`withAutoCleanupInjectors`](api/router/withAutoCleanupInjectors)를 설정하는 것을 고려하세요.
이 옵션을 사용하지 않으면 사용자가 다른 라우팅 규칙으로 이동한 뒤에도 AI 에이전트가 이전 라우팅 규칙에 선언된 WebMCP 도구에 접근할 수 있습니다.

```ts {header:"app.config.ts"}
import {ApplicationConfig} from '@angular/core';
import {provideRouter, withAutoCleanupInjectors} from '@angular/router';
import {routes} from './routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withAutoCleanupInjectors())],
};
```

<!--
## Provide tools within services
-->

<a id="provide-tools-within-services"></a>

## 서비스 내부에서 도구 제공하기

<!--
For dynamic use cases, the [`declareExperimentalWebMcpTool`](api/core/declareExperimentalWebMcpTool) function registers a tool directly within an injection context and automatically unregisters it when that context is destroyed.

```ts {header:"counter.ts"}
import {Service, declareExperimentalWebMcpTool, signal, inject} from '@angular/core';

@Service()
export class Counter {
  readonly count = signal(0);

  constructor() {
    declareExperimentalWebMcpTool({
      name: 'getCounter',
      description: 'Reads the global counter.',
      inputSchema: {type: 'object', properties: {}},
      execute: () => ({
        content: [{type: 'text', text: `The count is: ${this.count()}.`}],
      }),
    });
  }
}
```

While `declareExperimentalWebMcpTool` works in any injection context, watch out for [name collisions](#name-collisions) and prefer using it in root services.
-->

동적인 활용 사례에서는 [`declareExperimentalWebMcpTool`](api/core/declareExperimentalWebMcpTool) 함수로 주입 컨텍스트 내부에 도구를 직접 등록할 수 있습니다.
컨텍스트가 소멸되면 도구 등록도 자동으로 해제됩니다.

```ts {header:"counter.ts"}
import {Service, declareExperimentalWebMcpTool, signal, inject} from '@angular/core';

@Service()
export class Counter {
  readonly count = signal(0);

  constructor() {
    declareExperimentalWebMcpTool({
      name: 'getCounter',
      description: 'Reads the global counter.',
      inputSchema: {type: 'object', properties: {}},
      execute: () => ({
        content: [{type: 'text', text: `The count is: ${this.count()}.`}],
      }),
    });
  }
}
```

`declareExperimentalWebMcpTool`은 어떤 주입 컨텍스트에서든 동작하지만, [이름 충돌](#name-collisions)에 주의하고 루트 서비스에서 사용하는 것이 좋습니다.

<!--
## Implicit tools in Signal Forms
-->

<a id="implicit-tools-in-signal-forms"></a>

## 시그널 폼의 암시적 도구

<!--
You can create a WebMCP tool implicitly from an existing Angular [Signal Form](essentials/signal-forms) with minimal configuration. Angular converts your form models into rich WebMCP tools, effectively supporting highly dynamic forms without requiring you to manually write JSON schemas or event handlers.
-->

최소한의 설정만으로 기존 Angular [시그널 폼](essentials/signal-forms)에서 WebMCP 도구를 암시적으로 생성할 수 있습니다.
Angular는 폼 모델을 풍부한 기능의 WebMCP 도구로 변환하므로 JSON 스키마나 이벤트 핸들러를 직접 작성하지 않아도 매우 동적인 폼을 효과적으로 지원할 수 있습니다.

<!--
### Enable the WebMCP forms feature
-->

<a id="enable-the-webmcp-forms-feature"></a>

### WebMCP 폼 기능 활성화하기

<!--
First, add [`provideExperimentalWebMcpForms`](api/forms/signals/provideExperimentalWebMcpForms) to your root application providers:

```ts {header:"main.ts"}
import {bootstrapApplication} from '@angular/platform-browser';
import {provideExperimentalWebMcpForms} from '@angular/forms/signals';
import {AppRoot} from './app-root';

bootstrapApplication(AppRoot, {
  providers: [provideExperimentalWebMcpForms()],
});
```
-->

먼저 애플리케이션 루트의 프로바이더에 [`provideExperimentalWebMcpForms`](api/forms/signals/provideExperimentalWebMcpForms)를 추가하세요:

```ts {header:"main.ts"}
import {bootstrapApplication} from '@angular/platform-browser';
import {provideExperimentalWebMcpForms} from '@angular/forms/signals';
import {AppRoot} from './app-root';

bootstrapApplication(AppRoot, {
  providers: [provideExperimentalWebMcpForms()],
});
```

<!--
### Opt in a Signal Form
-->

<a id="opt-in-a-signal-form"></a>

### 시그널 폼에 적용하기

<!--
Second, when defining a Signal Form using [`form`](api/forms/signals/form), pass the `experimentalWebMcpTool` configuration option to opt-in to an implicit WebMCP tool. Angular will inspect your form's data model and automatically generate a JSON schema for connected AI agents.

```ts {header:"user-registration.ts"}
import {Component, signal} from '@angular/core';
import {form, required, minLength} from '@angular/forms/signals';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.html',
})
export class UserRegistration {
  private readonly model = signal({
    firstName: '',
    lastName: '',
    age: 0,
    hobbies: ['Web Development'],
  });

  readonly userForm = form(
    this.model,
    (f) => {
      required(f.firstName, {message: 'First name is mandatory.'});
      required(f.lastName, {message: 'Last name is mandatory.'});
    },
    {
      // Implicitly registers a WebMCP tool named `registerUser` with parameters derived from `model`.
      experimentalWebMcpTool: {
        name: 'registerUser',
        description: 'Registers a new user.',
      },
      submission: {
        action: async (formValue) => {
          console.log('Submitting user:', formValue().value());
          // ...
        },
      },
    },
  );
}
```

In this example, Angular generates a WebMCP tool with a JSON schema which:

1. includes `firstName`, `lastName`, `age`, and `hobbies` as parameters inferred from the initial value of the `model` signal.
2. defines `firstName` and `lastName` as _required_ fields as inferred from the [`required`](api/forms/signals/required) validator.
3. defines `hobbies` as an array of strings, allowing the agent to provide an arbitrary amount of hobbies.

Beyond inferring the input schema, Angular also connects the WebMCP tool to the form's validation logic and submission handler. This means the agent will observe any validation errors triggered by its inputs or any failures which happen during submission, allowing it to self-correct and potentially retry.

NOTE: Async validators are _not_ triggered and should be handled by the submission action.
-->

다음으로 [`form`](api/forms/signals/form)으로 시그널 폼을 정의할 때 `experimentalWebMcpTool` 설정 옵션을 전달해 암시적 WebMCP 도구를 활성화하세요.
Angular는 폼의 데이터 모델을 살펴보고 연결된 AI 에이전트를 위한 JSON 스키마를 자동으로 생성합니다.

```ts {header:"user-registration.ts"}
import {Component, signal} from '@angular/core';
import {form, required, minLength} from '@angular/forms/signals';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.html',
})
export class UserRegistration {
  private readonly model = signal({
    firstName: '',
    lastName: '',
    age: 0,
    hobbies: ['Web Development'],
  });

  readonly userForm = form(
    this.model,
    (f) => {
      required(f.firstName, {message: 'First name is mandatory.'});
      required(f.lastName, {message: 'Last name is mandatory.'});
    },
    {
      // `model`에서 파생한 매개변수로 `registerUser`라는 WebMCP 도구를 암시적으로 등록합니다.
      experimentalWebMcpTool: {
        name: 'registerUser',
        description: 'Registers a new user.',
      },
      submission: {
        action: async (formValue) => {
          console.log('Submitting user:', formValue().value());
          // ...
        },
      },
    },
  );
}
```

이 예제에서 Angular는 다음과 같은 JSON 스키마를 갖는 WebMCP 도구를 생성합니다:

1. `model` 시그널의 초기값에서 추론한 `firstName`, `lastName`, `age`, `hobbies`를 매개변수로 포함합니다.
2. [`required`](api/forms/signals/required) 유효성 검사기를 바탕으로 `firstName`과 `lastName`을 _필수_ 필드로 정의합니다.
3. `hobbies`를 문자열 배열로 정의해 에이전트가 취미를 원하는 개수만큼 제공할 수 있게 합니다.

Angular는 입력 스키마를 추론하는 것 외에도 WebMCP 도구를 폼의 유효성 검사 로직과 제출 핸들러에 연결합니다.
따라서 에이전트는 입력으로 발생한 유효성 검사 오류나 제출 중 발생한 실패를 확인하고, 스스로 수정한 뒤 재시도할 수 있습니다.

참고: 비동기 유효성 검사기는 _실행되지 않으므로_ 제출 작업에서 처리해야 합니다.

<!--
#### Constraints
-->

<a id="constraints"></a>

#### 제약 조건

<!--
Angular infers the WebMCP schema from the initial value of your form model. This requires:

- Concrete initial values (`''`, `0`, `false`): Angular cannot infer data types from `null` or `undefined`.
- Non-empty arrays (`['Hello!']`): Angular cannot infer data types from an empty array and requires at least one initial value.
-->

Angular는 폼 모델의 초기값으로 WebMCP 스키마를 추론합니다.
그러려면 다음 조건을 충족해야 합니다:

- 구체적인 초기값(`''`, `0`, `false`): Angular는 `null`이나 `undefined`로 데이터 타입을 추론할 수 없습니다.
- 비어 있지 않은 배열(`['Hello!']`): Angular는 빈 배열로 데이터 타입을 추론할 수 없으므로 초기값이 하나 이상 필요합니다.

<!--
## Best practices
-->

<a id="best-practices"></a>

## 모범 사례

<!--
Keep the following best practices in mind:
-->

다음 모범 사례를 참고하세요:

<!--
### Name collisions
-->

<a id="name-collisions"></a>

### 이름 충돌

<!--
WebMCP requires each tool to have a unique name and will throw an error if the same tool name is registered multiple times. This means calling `declareExperimentalWebMcpTool` or `provideExperimentalWebMcpTools` in a context where they might be registered multiple times (such as a component constructor) may lead to errors at runtime.

Prefer placing tools on application providers, route providers, or root services where possible. When putting tools on a component, including [implicit tools in Signal Forms](#implicit-tools-in-signal-forms), ensure that component is only ever rendered on the page at most _once_ at any given time.
-->

WebMCP에서는 모든 도구의 이름이 고유해야 하며, 같은 이름을 여러 번 등록하면 오류가 발생합니다.
따라서 컴포넌트 생성자처럼 여러 번 등록될 수 있는 컨텍스트에서 `declareExperimentalWebMcpTool`이나 `provideExperimentalWebMcpTools`를 호출하면 실행 중 오류가 발생할 수 있습니다.

가능하면 애플리케이션 프로바이더, 라우팅 규칙 프로바이더, 루트 서비스에 도구를 배치하세요.
[시그널 폼의 암시적 도구](#implicit-tools-in-signal-forms)를 포함해 컴포넌트에 도구를 배치한다면, 어느 시점이든 해당 컴포넌트가 페이지에 최대 _한 번_ 만 렌더링되도록 해야 합니다.

<!--
### Validate tool inputs
-->

<a id="validate-tool-inputs"></a>

### 도구 입력값 검증하기

<!--
Angular does not provide any implicit validation that the inputs provided by an agent actually match the defined JSON schema. Consider explicitly validating arguments to the `execute` function before using them to ensure reliability.
-->

Angular는 에이전트가 제공한 입력이 정의된 JSON 스키마와 실제로 일치하는지 암시적으로 검증하지 않습니다.
안정성을 확보하려면 `execute` 함수의 인자를 사용하기 전에 명시적으로 검증하는 것을 고려하세요.

<!--
### Testing
-->

<a id="testing"></a>

### 테스트

<!--
Consider using a mock WebMCP implementation like [`@mcp-b/webmcp-polyfill`](https://www.npmjs.com/package/@mcp-b/webmcp-polyfill) to effectively unit test your tools.
-->

도구를 효과적으로 단위 테스트하려면 [`@mcp-b/webmcp-polyfill`](https://www.npmjs.com/package/@mcp-b/webmcp-polyfill)과 같은 WebMCP 목업 구현을 사용하는 것을 고려하세요.
