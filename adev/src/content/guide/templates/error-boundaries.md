<!--
# Error boundaries with `@boundary`

IMPORTANT: `@boundary` is in [developer preview](reference/releases#developer-preview).

Angular templates support error boundaries to gracefully handle runtime errors that occur during rendering and change detection.

Error boundaries prevent a single component's failure from crashing the entire application and provide a way to display fallback UI to the user.

## Catching errors with `@boundary` and `@error`

The `@boundary` block wraps a section of your template. If any component or directive inside this boundary throws an error during initialization or change detection, the framework catches the error and renders the `@error` block instead.

```angular-html
@boundary {
  <app-risky-component />
} @error {
  <p>Something went wrong!</p>
}
```

## Accessing the error object

You can access the caught error by accessing the implicit `$error` variable:

```angular-html
@boundary {
  <app-risky-component />
} @error {
  <p>Error occurred: {{ $error.message }}</p>
}
```

## Resetting the boundary

You can attempt to re-render the content of the `@boundary` by calling the implicit `$reset` function in the `@error` block. When called, it resets the boundary state and tries to render the original content again.

```angular-html
@boundary {
  <app-flaky-component />
} @error {
  <p>Loading failed.</p>
  <button (click)="$reset()">Try again</button>
}
```

## Conditional error handling with `when`

You can use `when` clauses to conditionally handle specific types of errors, allowing you to provide different fallback UIs. Angular evaluates this condition when it catches an error.

```angular-html
@boundary {
  <app-chart-dashboard />
} @error (let err; reset = $reset; when isRenderError(err)) {
  <p>Network issue. Check your connection.</p>
  <button (click)="reset()">Retry</button>
} @error {
  <p>An unexpected error occurred: {{ $error.message }}</p>
}
```

Order your `@error` blocks from most specific to least specific, as Angular evaluates the `when` clauses in order and uses the first one that evaluates to true. A final `@error` block without a `when` clause acts as a catch-all fallback.

## Global error handler integration

When a boundary catches an error, Angular can still notify the global `ErrorHandler`. You can implement the optional `onViewError` hook in your custom `ErrorHandler` to log these caught errors to your error tracking service.

```ts
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Handle uncaught errors
  }

  onViewError(error: Error, details: ErrorDetails): void {
    // Handle errors caught by a @boundary
    console.warn('Caught by boundary:', details.boundary);
    myErrorTrackingService.log(error);
  }
}
```

IMPORTANT: If an `@error` block itself throws an error, the error propagates to the next outer `@boundary` or Angular treats it as an unhandled application error.

## Content projection

If your component uses [content projection](guide/components/content-projection), wrapping `<ng-content>` in a `@boundary` does not catch errors from projected content. That content belongs to the view that declares it, not the receiving component's view.

For example, a wrapper component with the following template does not catch errors from components projected into it:

```angular-html {avoid}
@boundary {
  <ng-content />
} @error {
  <p>Something went wrong!</p>
}
```

To catch those errors, wrap the wrapper component and its projected content in a `@boundary` in the parent template:

```angular-html {prefer}
@boundary {
  <app-wrapper>
    <app-risky-component />
  </app-wrapper>
} @error {
  <p>Something went wrong!</p>
}
```

## Dynamic views and programmatic error handling

Error handling isn't limited to template syntax. If you are creating components or embedded views dynamically, you can use the `onError` option to handle errors. See the [Handling rendering errors](guide/components/programmatic-rendering#handling-rendering-errors) section in the programmatic rendering guide for more information.
-->

# `@boundary`로 에러 경계 설정하기

중요: `@boundary`는 [개발자 프리뷰](reference/releases#developer-preview) 기능입니다.

Angular 템플릿은 렌더링과 변화 감지 중 발생하는 런타임 에러를 적절하게 처리할 수 있는 에러 경계를 지원합니다.

에러 경계는 한 컴포넌트의 실패로 애플리케이션 전체가 중단되는 것을 방지하고, 사용자에게 대체 UI를 표시할 수 있게 합니다.

## `@boundary`와 `@error`로 에러 처리하기 {#catching-errors-with-boundary-and-error}

`@boundary` 블록은 템플릿의 일부를 감쌉니다.
경계 안에 있는 컴포넌트나 디렉티브에서 초기화 또는 변화 감지 중 에러가 발생하면, 프레임워크가 에러를 처리하고 대신 `@error` 블록을 렌더링합니다.

```angular-html
@boundary {
  <app-risky-component />
} @error {
  <p>문제가 발생했습니다!</p>
}
```

## 에러 객체에 접근하기 {#accessing-the-error-object}

암묵적으로 제공되는 `$error` 변수를 사용하면 발생한 에러에 접근할 수 있습니다.

```angular-html
@boundary {
  <app-risky-component />
} @error {
  <p>에러가 발생했습니다: {{ $error.message }}</p>
}
```

## 경계 초기화하기 {#resetting-the-boundary}

`@error` 블록에서 암묵적으로 제공되는 `$reset` 함수를 호출하면 `@boundary`의 콘텐츠를 다시 렌더링할 수 있습니다.
이 함수를 호출하면 경계 상태를 초기화하고 원래 콘텐츠를 다시 렌더링합니다.

```angular-html
@boundary {
  <app-flaky-component />
} @error {
  <p>로딩에 실패했습니다.</p>
  <button (click)="$reset()">다시 시도</button>
}
```

## `when`으로 조건에 따라 에러 처리하기 {#conditional-error-handling-with-when}

`when` 절을 사용하면 특정 종류의 에러를 조건에 따라 처리해서 서로 다른 대체 UI를 제공할 수 있습니다.
Angular는 에러를 처리할 때 이 조건을 평가합니다.

```angular-html
@boundary {
  <app-chart-dashboard />
} @error (let err; reset = $reset; when isRenderError(err)) {
  <p>네트워크에 문제가 있습니다. 연결을 확인하세요.</p>
  <button (click)="reset()">재시도</button>
} @error {
  <p>예상하지 못한 에러가 발생했습니다: {{ $error.message }}</p>
}
```

`@error` 블록은 가장 구체적인 조건부터 일반적인 조건 순서로 배치하세요.
Angular는 `when` 절을 순서대로 평가하고 처음으로 참이 되는 블록을 사용합니다.
마지막에 `when` 절이 없는 `@error` 블록을 두면 나머지 모든 에러를 처리할 수 있습니다.

## 전역 에러 핸들러와 통합하기 {#global-error-handler-integration}

경계가 에러를 처리하더라도 Angular는 전역 `ErrorHandler`에 에러를 알릴 수 있습니다.
커스텀 `ErrorHandler`에 선택적인 `onViewError` 훅을 구현하면 경계에서 처리한 에러를 에러 추적 서비스에 기록할 수 있습니다.

```ts
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // 처리되지 않은 에러를 처리합니다.
  }

  onViewError(error: Error, details: ErrorDetails): void {
    // @boundary가 처리한 에러를 처리합니다.
    console.warn('Caught by boundary:', details.boundary);
    myErrorTrackingService.log(error);
  }
}
```

중요: `@error` 블록 자체에서 에러가 발생하면 바로 바깥쪽 `@boundary`로 전파되며, 바깥 경계가 없으면 Angular가 처리되지 않은 애플리케이션 에러로 취급합니다.

## 콘텐츠 프로젝션 {#content-projection}

컴포넌트에서 [콘텐츠 프로젝션](guide/components/content-projection)을 사용한다면, `<ng-content>`를 `@boundary`로 감싸도 프로젝션된 콘텐츠의 에러는 처리하지 못합니다.
해당 콘텐츠는 받는 컴포넌트의 뷰가 아니라, 콘텐츠를 선언한 뷰에 속하기 때문입니다.

예를 들어 다음 템플릿을 사용하는 래퍼 컴포넌트는 안으로 프로젝션된 컴포넌트에서 발생하는 에러를 처리하지 못합니다.

```angular-html {avoid}
@boundary {
  <ng-content />
} @error {
  <p>문제가 발생했습니다!</p>
}
```

이러한 에러를 처리하려면 부모 템플릿에서 래퍼 컴포넌트와 프로젝션할 콘텐츠를 함께 `@boundary`로 감싸세요.

```angular-html {prefer}
@boundary {
  <app-wrapper>
    <app-risky-component />
  </app-wrapper>
} @error {
  <p>문제가 발생했습니다!</p>
}
```

## 동적 뷰와 프로그래밍 방식의 에러 처리 {#dynamic-views-and-programmatic-error-handling}

에러 처리는 템플릿 문법에만 한정되지 않습니다.
컴포넌트나 내장 뷰를 동적으로 생성한다면 `onError` 옵션으로 에러를 처리할 수 있습니다.
자세한 내용은 프로그래밍 방식 렌더링 가이드의 [렌더링 에러 처리하기](guide/components/programmatic-rendering#handling-rendering-errors)를 참고하세요.
