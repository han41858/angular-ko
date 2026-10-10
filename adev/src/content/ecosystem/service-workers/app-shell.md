<!--
# App shell pattern
-->

<a id="app-shell-pattern"></a>

# 앱 기본구조 패턴

<!--
The [App shell pattern](https://developer.chrome.com/blog/app-shell) is a way to render a portion of your application using a route at build time.
It can improve the user experience by quickly launching a static rendered page (a skeleton common to all pages) while the browser downloads the full client version and switches to it automatically after the code loads.

This gives users a meaningful first paint of your application that appears quickly because the browser can render the HTML and CSS without the need to initialize any JavaScript.

<docs-workflow>
<docs-step title="Prepare the application">
Do this with the following Angular CLI command:

```shell
ng new my-app
```

For an existing application, you have to manually add the `Router` and defining a `<router-outlet>` within your application.
</docs-step>
<docs-step title="Create the application shell">
Use the Angular CLI to automatically create the application shell.

```shell
ng generate app-shell
```

For more information about this command, see [App shell command](cli/generate/app-shell).

The command updates the application code and adds extra files to the project structure.

```text
src
├── app
│ ├── app.config.server.ts # server application configuration
│ └── app-shell # app-shell component
│   ├── app-shell.component.html
│   ├── app-shell.component.scss
│   ├── app-shell.component.spec.ts
│   └── app-shell.component.ts
└── main.server.ts # main server application bootstrapping
```

<docs-step title="Verify the application is built with the shell content">

```shell
ng build --configuration=development
```

Or to use the production configuration.

```shell
ng build
```

To verify the build output, open <code class="no-auto-link">dist/my-app/browser/index.html</code>.
Look for default text `app-shell works!` to show that the application shell route was rendered as part of the output.
</docs-step>
</docs-workflow>
-->

[앱 셸 패턴](https://developer.chrome.com/blog/app-shell)은 빌드 시점에 라우팅 규칙을 사용해서 애플리케이션의 일부를 렌더링하는 방법입니다.
브라우저가 전체 클라이언트 버전을 내려받는 동안 정적으로 렌더링한 페이지(모든 페이지에서 공통으로 사용하는 뼈대)를 빠르게 표시하고, 코드 로딩이 끝나면 자동으로 전환해서 사용자 경험을 개선할 수 있습니다.

JavaScript를 초기화하지 않고도 브라우저가 HTML과 CSS를 렌더링할 수 있으므로, 사용자에게 의미 있는 애플리케이션 화면을 빠르게 처음 표시할 수 있습니다.

<docs-workflow>
<docs-step title="애플리케이션 준비하기">
다음 Angular CLI 명령으로 준비하세요:

```shell
ng new my-app
```

기존 애플리케이션에서는 `Router`를 직접 추가하고 애플리케이션 안에 `<router-outlet>`을 정의해야 합니다.
</docs-step>
<docs-step title="애플리케이션 셸 생성하기">
Angular CLI를 사용해서 애플리케이션 셸을 자동으로 생성하세요.

```shell
ng generate app-shell
```

이 명령에 대한 자세한 내용은 [앱 셸 명령](cli/generate/app-shell)을 참고하세요.

이 명령은 애플리케이션 코드를 갱신하고 프로젝트 구조에 파일을 추가합니다.

```text
src
├── app
│ ├── app.config.server.ts # server application configuration
│ └── app-shell # app-shell component
│   ├── app-shell.component.html
│   ├── app-shell.component.scss
│   ├── app-shell.component.spec.ts
│   └── app-shell.component.ts
└── main.server.ts # main server application bootstrapping
```

<docs-step title="셸 내용을 포함해서 애플리케이션이 빌드되었는지 확인하기">

```shell
ng build --configuration=development
```

프로덕션 설정을 사용하려면 다음과 같이 실행하세요.

```shell
ng build
```

빌드 결과를 확인하려면 <code class="no-auto-link">dist/my-app/browser/index.html</code>을 여세요.
애플리케이션 셸 라우팅 규칙이 결과물의 일부로 렌더링되었는지 확인하려면 기본 문구인 `app-shell works!`를 찾아보세요.
</docs-step>
</docs-workflow>
