<!--
# Unhandled errors in Angular
-->

<a id="unhandled-errors-in-angular"></a>

# Angular에서 처리되지 않은 오류

<!--
As your Angular application runs, some of your code may throw an error. If left unhandled, these errors can lead to unexpected behavior and a nonresponsive UI. This guide covers how Angular deals with errors that are not explicitly caught by your application code. For guidance on writing your own error handling logic within your application, consult best practices for error handling in JavaScript and Angular.

A fundamental principle in Angular's error handling strategy is that errors should be surfaced to developers at the callsite whenever possible. This approach ensures that the code which initiated an operation has the context necessary to understand the error, handle it appropriately, and decide what the appropriate application state should be. By making errors visible at their origin, developers can implement error handling that is specific to the failed operation and has access to relevant information for recovery or providing informative feedback to the end-user. This also helps to avoid the "Overly general error" smell, where errors are reported without sufficient context to understand their cause.

For example, consider a component that fetches user data from an API. The code responsible for making the API call should include error handling (e.g., using a `try...catch` block or the `catchError` operator in RxJS) to manage potential network issues or errors returned by the API. This allows the component to display a user-friendly error message or retry the request, rather than letting the error propagate unhandled.
-->

Angular 애플리케이션을 실행하는 동안 코드에서 오류가 발생할 수 있습니다.
이 오류를 처리하지 않으면 예상치 못한 동작이 발생하거나 UI가 응답하지 않을 수 있습니다.
이 가이드는 애플리케이션 코드에서 명시적으로 잡지 않은 오류를 Angular가 어떻게 처리하는지 설명합니다.
애플리케이션 안에 직접 오류 처리 로직을 작성하는 방법은 JavaScript와 Angular의 오류 처리 모범 사례를 참고하세요.

Angular 오류 처리 전략의 기본 원칙은 가능한 한 오류가 발생한 호출 지점에서 개발자에게 오류를 드러내는 것입니다.
그러면 작업을 시작한 코드가 오류를 이해하고 적절히 처리하며, 애플리케이션을 어떤 상태로 둘지 결정하는 데 필요한 맥락 정보를 활용할 수 있습니다.
오류를 발생 지점에서 드러내면 개발자는 실패한 작업에 맞는 오류 처리를 구현하고, 복구하거나 최종 사용자에게 유용한 피드백을 제공하는 데 필요한 정보에 접근할 수 있습니다.
이는 원인을 이해하기에 충분한 맥락 없이 오류를 보고하는 "지나치게 일반적인 오류"라는 문제도 피하는 데 도움이 됩니다.

예를 들어 API에서 사용자 데이터를 가져오는 컴포넌트를 생각해 봅시다.
API를 호출하는 코드에는 잠재적인 네트워크 문제나 API가 반환하는 오류에 대응할 오류 처리 로직이 포함되어야 합니다(예: `try...catch` 블록이나 RxJS의 `catchError` 연산자).
그러면 오류를 처리하지 않은 채 전파시키는 대신 사용자에게 이해하기 쉬운 오류 메시지를 표시하거나 요청을 재시도할 수 있습니다.

<!--
## Unhandled errors are reported to the `ErrorHandler`
-->

<a id="unhandled-errors-are-reported-to-the-errorhandler"></a>

## 처리되지 않은 오류는 `ErrorHandler`에 전달됩니다

<!--
Angular reports unhandled errors to the application's root `ErrorHandler`. When providing a custom `ErrorHandler`, provide it in your `ApplicationConfig` as part of calling `bootstrapApplication`.

When building an Angular application, often you write code that is called automatically _by_ the framework. For example, Angular is responsible for calling a component's constructor and lifecycle methods when that component appears in a template. When the framework runs your code, there's nowhere you could reasonably add a `try` block to gracefully handle errors. In situations like this, Angular catches errors and sends them to the `ErrorHandler`.

Angular does _not_ catch errors inside of APIs that are called directly by your code. For example, if you have a service with a method that throws an error and you call that method in your component, Angular will not automatically catch that error. You are responsible for handling it using mechanisms like `try...catch`.

Angular catches _asynchronous_ errors from user promises or observables only when:

- There is an explicit contract for Angular to wait for and use the result of the asynchronous operation, and
- When errors are not presented in the return value or state.

For example, `AsyncPipe` and `PendingTasks.run` forward errors to the `ErrorHandler`, whereas `resource` presents the error in the `status` and `error` properties.

Errors that Angular reports to the `ErrorHandler` are _unexpected_ errors. These errors may be unrecoverable or an indication that the state of the application is corrupted. Applications should provide error handling using `try` blocks or appropriate error handling operators (like `catchError` in RxJS) where the error occurs whenever possible rather than relying on the `ErrorHandler`, which is most frequently and appropriately used only as a mechanism to report potentially fatal errors to the error tracking and logging infrastructure.

```ts
export class GlobalErrorHandler implements ErrorHandler {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly router = inject(Router);

  handleError(error: any) {
    const url = this.router.url;
    const errorMessage = error?.message ?? 'unknown';

    this.analyticsService.trackEvent({
      eventName: 'exception',
      description: `Screen: ${url} | ${errorMessage}`,
    });

    console.error(GlobalErrorHandler.name, {error});
  }
}
```
-->

Angular는 처리되지 않은 오류를 애플리케이션 루트의 `ErrorHandler`에 전달합니다.
커스텀 `ErrorHandler`를 제공하려면 `bootstrapApplication`을 호출할 때 `ApplicationConfig`에 등록하세요.

Angular 애플리케이션을 만들 때는 _프레임워크가_ 자동으로 호출하는 코드를 작성하는 경우가 많습니다.
예를 들어 컴포넌트가 템플릿에 나타나면 Angular가 컴포넌트의 생성자와 생명주기 메서드를 호출합니다.
프레임워크가 개발자의 코드를 실행하는 경우에는 오류를 적절히 처리할 `try` 블록을 추가할 마땅한 위치가 없습니다.
이런 상황에서 Angular는 오류를 잡아 `ErrorHandler`에 전달합니다.

Angular는 작성한 코드가 직접 호출하는 API 내부의 오류를 잡지 _않습니다_.
예를 들어 서비스에 오류를 던지는 메서드가 있고 컴포넌트에서 그 메서드를 호출하더라도 Angular가 해당 오류를 자동으로 잡지는 않습니다.
`try...catch` 등의 방법으로 직접 처리해야 합니다.

Angular는 사용자가 작성한 프로미스나 옵저버블의 _비동기_ 오류를 다음 조건에서만 잡습니다:

- Angular가 비동기 작업을 기다렸다가 결과를 사용한다는 명시적인 규약이 있고,
- 오류가 반환값이나 상태로 표현되지 않는 경우입니다.

예를 들어 `AsyncPipe`와 `PendingTasks.run`은 오류를 `ErrorHandler`에 전달하지만, `resource`는 `status`와 `error` 프로퍼티로 오류를 나타냅니다.

Angular가 `ErrorHandler`에 전달하는 오류는 _예상치 못한_ 오류입니다.
복구할 수 없는 오류이거나 애플리케이션의 상태가 손상되었다는 신호일 수 있습니다.
`ErrorHandler`에 의존하기보다는 가능한 한 오류가 발생하는 곳에서 `try` 블록이나 적절한 오류 처리 연산자(RxJS의 `catchError` 등)로 오류를 처리해야 합니다.
`ErrorHandler`는 치명적일 수 있는 오류를 오류 추적 및 로깅 시스템에 보고하는 용도로만 사용하는 것이 일반적이며 적절합니다.

```ts
export class GlobalErrorHandler implements ErrorHandler {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly router = inject(Router);

  handleError(error: any) {
    const url = this.router.url;
    const errorMessage = error?.message ?? 'unknown';

    this.analyticsService.trackEvent({
      eventName: 'exception',
      description: `Screen: ${url} | ${errorMessage}`,
    });

    console.error(GlobalErrorHandler.name, {error});
  }
}
```

<!--
### `TestBed` rethrows errors by default
-->

<a id="testbed-rethrows-errors-by-default"></a>

### `TestBed`는 기본적으로 오류를 다시 던집니다

<!--
In many cases, `ErrorHandler` may only log errors and otherwise allow the application to continue running. In tests, however, you almost always want to surface these errors. Angular's `TestBed` rethrows unexpected errors to ensure that errors caught by the framework cannot be unintentionally missed or ignored. In rare circumstances, a test may specifically attempt to ensure errors do not cause the application to be unresponsive or crash. In these situations, you can [configure `TestBed` to _not_ rethrow application errors](api/core/testing/TestModuleMetadata#rethrowApplicationErrors) with `TestBed.configureTestingModule({rethrowApplicationErrors: false})`.
-->

많은 경우 `ErrorHandler`는 오류를 기록하기만 하고 애플리케이션은 계속 실행하도록 할 수 있습니다.
하지만 테스트에서는 거의 항상 이러한 오류를 드러내야 합니다.
Angular의 `TestBed`는 프레임워크가 잡은 오류를 실수로 놓치거나 무시하지 않도록 예상치 못한 오류를 다시 던집니다.
드물게는 오류가 발생해도 애플리케이션이 응답하지 않거나 비정상 종료되는 일이 없는지 확인하는 테스트가 필요할 수 있습니다.
이 경우 `TestBed.configureTestingModule({rethrowApplicationErrors: false})`로 [`TestBed`가 애플리케이션 오류를 다시 던지지 _않도록_ 설정할 수 있습니다](api/core/testing/TestModuleMetadata#rethrowApplicationErrors).

<!--
## Global error listeners
-->

<a id="global-error-listeners"></a>

## 전역 오류 리스너

<!--
Errors that are caught neither by the application code nor by the framework's application instance may reach the global scope. Errors reaching the global scope can have unintended consequences if not accounted for. In non-browser environments, they may cause the process to crash. In the browser, these errors may go unreported and site visitors may see the errors in the browser console. Angular provides global listeners for both environments to account for these issues.
-->

애플리케이션 코드와 프레임워크의 애플리케이션 인스턴스가 모두 잡지 못한 오류는 전역 스코프에 도달할 수 있습니다.
전역 스코프에 도달한 오류를 고려하지 않으면 의도하지 않은 결과가 발생할 수 있습니다.
브라우저가 아닌 환경에서는 프로세스가 비정상 종료될 수 있습니다.
브라우저에서는 오류가 보고되지 않은 채 남고 사이트 방문자가 브라우저 콘솔에서 오류를 볼 수도 있습니다.
Angular는 이러한 문제에 대응하도록 두 환경 모두에 전역 리스너를 제공합니다.

<!--
### Client-side rendering
-->

<a id="client-side-rendering"></a>

### 클라이언트 사이드 렌더링

<!--
Adding [`provideBrowserGlobalErrorListeners()`](/api/core/provideBrowserGlobalErrorListeners) to the [ApplicationConfig](guide/di/defining-dependency-providers#application-bootstrap) adds the `'error'` and `'unhandledrejection'` listeners to the browser window and forwards those errors to `ErrorHandler`. The Angular CLI generates new applications with this provider by default. The Angular team recommends handling these global errors for most applications, either with the framework's built-in listeners or with your own custom listeners. If you provide custom listeners, you can remove `provideBrowserGlobalErrorListeners`.
-->

[ApplicationConfig](guide/di/defining-dependency-providers#application-bootstrap)에 [`provideBrowserGlobalErrorListeners()`](/api/core/provideBrowserGlobalErrorListeners)를 추가하면 브라우저 창에 `'error'`와 `'unhandledrejection'` 리스너를 등록하고 오류를 `ErrorHandler`에 전달합니다.
Angular CLI는 새 애플리케이션을 생성할 때 이 프로바이더를 기본적으로 포함합니다.
Angular 팀은 대부분의 애플리케이션에서 프레임워크의 내장 리스너나 커스텀 리스너로 이러한 전역 오류를 처리할 것을 권장합니다.
커스텀 리스너를 제공한다면 `provideBrowserGlobalErrorListeners`를 제거할 수 있습니다.

<!--
### Server-side and hybrid rendering
-->

<a id="server-side-and-hybrid-rendering"></a>

### 서버 사이드 렌더링과 하이브리드 렌더링

<!--
When using [Angular with SSR](guide/ssr), Angular automatically adds the `'unhandledRejection'` and `'uncaughtException'` listeners to the server process. These handlers prevent the server from crashing and instead log captured errors to the console.

IMPORTANT: If the application is using Zone.js, only the `'unhandledRejection'` handler is added. When Zone.js is present, errors inside the Application's Zone are already forwarded to the application `ErrorHandler` and do not reach the server process.
-->

[Angular에서 SSR](guide/ssr)을 사용하면 Angular는 서버 프로세스에 `'unhandledRejection'`과 `'uncaughtException'` 리스너를 자동으로 등록합니다.
이 핸들러는 서버가 비정상 종료되는 것을 막고 잡은 오류를 콘솔에 기록합니다.

중요: 애플리케이션이 Zone.js를 사용한다면 `'unhandledRejection'` 핸들러만 추가합니다.
Zone.js가 있으면 애플리케이션의 존 내부에서 발생한 오류는 이미 애플리케이션의 `ErrorHandler`로 전달되므로 서버 프로세스까지 도달하지 않습니다.
