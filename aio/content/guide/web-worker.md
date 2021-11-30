<!--
# Background processing using web workers
-->
# 웹 워커로 백그라운드 작업하기

<!--
[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) lets you run CPU-intensive computations in a background thread,
freeing the main thread to update the user interface.
If you find your application performs a lot of computations, such as generating CAD drawings or doing heavy geometrical calculations, using web workers can help increase your application's performance.

<div class="alert is-helpful">

The CLI does not support running Angular itself in a web worker.

</div>
-->
[웹 워커](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)를 활용하면 CPU 연산이 많이 필요한 연산을 백그라운드 스레드에서 실행할 수 있습니다.
백그라운드 스레드에서 실행되는 코드는 사용자가 작업하는 메인 스레드에 영향을 주지 않습니다.
애플리케이션에서 CAD를 그리거나 복잡한 지도 계산과 같이 연산하는 작업이 많다면 웹 워커를 사용해서 애플리케이션 전체 성능을 향상시켜 보세요.


<div class="alert is-helpful">

웹 워커에서 Angular를 실행하는 기능은 지원하지 않습니다.

</div>


<!--
## Adding a web worker
-->
## 웹 워커 추가하기

<!--
To add a web worker to an existing project, use the Angular CLI `ng generate` command.

```bash
ng generate web-worker <location>
```

You can add a web worker anywhere in your application.
For example, to add a web worker to the root component, `src/app/app.component.ts`, run the following command.

```bash
ng generate web-worker app
```

The command performs the following actions.

- Configures your project to use web workers, if it isn't already.
- Adds the following scaffold code to `src/app/app.worker.ts` to  receive messages.

  <code-example language="typescript" header="src/app/app.worker.ts">
  addEventListener('message', ({ data }) => {
    const response = `worker response to ${data}`;
    postMessage(response);
  });
 </code-example>

- Adds the following scaffold code to `src/app/app.component.ts` to use the worker.

  <code-example language="typescript" header="src/app/app.component.ts">
  if (typeof Worker !== 'undefined') {
    // Create a new
    const worker = new Worker(new URL('./app.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      console.log(`page got message: ${data}`);
    };
    worker.postMessage('hello');
  } else {
    // Web workers are not supported in this environment.
    // You should add a fallback so that your program still executes correctly.
  }
  </code-example>

After you generate this initial scaffold, you must refactor your code to use the web worker by sending messages to and from the worker.

<div class="alert is-important">

Some environments or platforms, such as `@angular/platform-server` used in [Server-side Rendering](guide/universal), don't support web workers. To ensure that your application will work in these environments, you must provide a fallback mechanism to perform the computations that the worker would otherwise perform.

</div>
-->
프로젝트에 웹 워커를 추가하려면 Angular CLI로 `ng generate` 명령을 실행하면 됩니다.

```bash
ng generate web-worker <위치>
```

웹 워커를 생성하는 위치는 고정되어 있지 않습니다.
최상위 컴포넌트 `src/app/app.component.ts` 파일과 같은 위치에 웹 워커를 생성하려면 이렇게 실행하면 됩니다.

```bash
ng generate web-worker app
```

이 명령을 실행하면 이런 작업이 실행됩니다.

- 프로젝트에 웹 워커 환경설정을 추가합니다.
- `src/app/app.worker.ts` 파일에 메시지를 받는 기본 코드를 추가합니다.

  <code-example language="typescript" header="src/app/app.worker.ts">
  addEventListener('message', ({ data }) => {
    const response = `worker response to ${data}`;
    postMessage(response);
  });
 </code-example>

- `src/app/app.component.ts` 파일에 메시지를 보내는 기본 코드를 추가합니다.

  <code-example language="typescript" header="src/app/app.component.ts">
  if (typeof Worker !== 'undefined') {
    // 웹 워커를 생성합니다.
    const worker = new Worker(new URL('./app.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      console.log(`page got message: ${data}`);
    };
    worker.postMessage('hello');
  } else {
    // 웹 워커를 지원하지 않는 환경입니다.
    // 이 환경에서도 애플리케이션이 제대로 동작할 수 있는 보완 로직을 추가해야 합니다.
  }
  </code-example>

이제 기본 코드를 기반으로 애플리케이션이 웹 워커와 메시지 통신하는 로직을 추가하면 됩니다.


<div class="alert is-important">

애플리케이션이 실행되는 환경이나 플랫폼에 따라 웹 워커를 지원하지 않을 수 있습니다.
[서버 사이드 렌더링](guide/universal) 할 때 사용하는 `@angular/platform-server`도 웹 워커를 지원하지 않습니다.
그래서 웹 워커가 동작하지 않는 환경에서도 필요한 작업을 실행할 수 있는 보완 로직을 항상 준비해야 합니다.

</div>
