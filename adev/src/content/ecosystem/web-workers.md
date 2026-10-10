<!--
# Background processing using web workers
-->

<a id="background-processing-using-web-workers"></a>

# 웹 워커로 백그라운드 작업하기

<!--
[Web workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) let you run CPU-intensive computations in a background thread, freeing the main thread to update the user interface.
Application's performing a lot of computations, like generating Computer-Aided Design \(CAD\) drawings or doing heavy geometric calculations, can use web workers to increase performance.

HELPFUL: The Angular CLI does not support running itself in a web worker.
-->

[웹 워커](https://developer.mozilla.org/docs/Web/API/Web_Workers_API)를 사용하면 CPU를 많이 사용하는 계산을 백그라운드 스레드에서 실행해서, 메인 스레드가 사용자 인터페이스를 갱신할 수 있도록 합니다.
컴퓨터 지원 설계(CAD) 도면 생성이나 복잡한 기하 계산처럼 많은 계산이 필요한 애플리케이션은 웹 워커를 활용해서 성능을 높일 수 있습니다.

도움말: Angular CLI 자체를 웹 워커에서 실행하는 것은 지원하지 않습니다.

<!--
## Adding a web worker
-->

<a id="adding-a-web-worker"></a>

## 웹 워커 추가하기

<!--
To add a web worker to an existing project, use the Angular CLI `ng generate` command.

```shell
ng generate web-worker <location>
```

You can add a web worker anywhere in your application.
For example, to add a web worker to the root component, `src/app/app.component.ts`, run the following command.

```shell
ng generate web-worker app
```

The command performs the following actions.

1. Configures your project to use web workers, if it isn't already.
1. Adds the following scaffold code to `src/app/app.worker.ts` to receive messages.

   ```ts {header:"src/app/app.worker.ts"}
   addEventListener('message', ({data}) => {
     const response = `worker response to ${data}`;
     postMessage(response);
   });
   ```

1. Adds the following scaffold code to `src/app/app.component.ts` to use the worker.

   ```ts {header:"src/app/app.component.ts"}
   if (typeof Worker !== 'undefined') {
     // Create a new
     const worker = new Worker(new URL('./app.worker', import.meta.url));
     worker.onmessage = ({data}) => {
       console.log(`page got message: ${data}`);
     };
     worker.postMessage('hello');
   } else {
     // Web workers are not supported in this environment.
     // You should add a fallback so that your program still executes correctly.
   }
   ```

After you create this initial scaffold, you must refactor your code to use the web worker by sending messages to and from the worker.

IMPORTANT: Some environments or platforms, such as `@angular/platform-server` used in [Server-side Rendering](guide/ssr), don't support web workers.

To ensure that your application works in these environments, you must provide a fallback mechanism to perform the computations that the worker would otherwise perform.
-->

기존 프로젝트에 웹 워커를 추가하려면 Angular CLI의 `ng generate` 명령을 사용하세요.

```shell
ng generate web-worker <location>
```

애플리케이션의 어디에나 웹 워커를 추가할 수 있습니다.
예를 들어 루트 컴포넌트인 `src/app/app.component.ts`에 웹 워커를 추가하려면 다음 명령을 실행하세요.

```shell
ng generate web-worker app
```

이 명령은 다음 작업을 수행합니다.

1. 웹 워커를 사용하도록 프로젝트가 설정되어 있지 않다면 해당 설정을 추가합니다.
1. 메시지를 수신할 수 있도록 `src/app/app.worker.ts`에 다음 기본 코드를 추가합니다.

   ```ts {header:"src/app/app.worker.ts"}
   addEventListener('message', ({data}) => {
     const response = `worker response to ${data}`;
     postMessage(response);
   });
   ```

1. 워커를 사용할 수 있도록 `src/app/app.component.ts`에 다음 기본 코드를 추가합니다.

   ```ts {header:"src/app/app.component.ts"}
   if (typeof Worker !== 'undefined') {
     // 새 워커를 생성합니다.
     const worker = new Worker(new URL('./app.worker', import.meta.url));
     worker.onmessage = ({data}) => {
       console.log(`page got message: ${data}`);
     };
     worker.postMessage('hello');
   } else {
     // 이 환경에서는 웹 워커를 지원하지 않습니다.
     // 프로그램이 정상적으로 실행되도록 대체 수단을 추가해야 합니다.
   }
   ```

이 기본 코드를 생성한 뒤에는 워커와 메시지를 주고받아 웹 워커를 사용하도록 코드를 리팩토링해야 합니다.

중요: [서버 사이드 렌더링](guide/ssr)에 사용하는 `@angular/platform-server` 등 일부 환경이나 플랫폼은 웹 워커를 지원하지 않습니다.

이런 환경에서도 애플리케이션이 동작하도록 하려면, 워커가 수행할 계산을 대신 실행하는 대체 수단을 제공해야 합니다.
