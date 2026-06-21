<!--
<docs-decorative-header title="Installation" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!-- markdownlint-disable-line ->
</docs-decorative-header>
-->

<docs-decorative-header title="설치방법" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!-- markdownlint-disable-line -->
</docs-decorative-header>

<!--
Get started with Angular quickly with online starters or locally with your terminal.
-->

온라인 환경에서 Angular를 빠르게 시작하거나, 터미널로 로컬 환경을 구성해 보세요.

<!--
## Play Online
-->

## 온라인으로 작업하기

<!--
If you just want to play around with Angular in your browser without setting up a project, you can use our online sandbox:

<docs-card title="Playground" href="/playground" link="Open on Playground" iconImgSrc="adev/src/assets/icons/playground.svg" titleInline>
The fastest way to play with an Angular app. No setup required.
</docs-card>
</docs-card-container>
-->

프로젝트 세팅 없이 브라우저에서 바로 Angular를 사용해 보려면, 온라인 샌드박스에 접속하면 됩니다:

<docs-card-container>
<docs-card title="놀이터" href="/playground" link="놀이터로 이동하기" iconImgSrc="adev/src/assets/icons/playground.svg" titleInline>
  Angular 앱을 체험하는 방법 중 가장 빠른 방법입니다. 환경설정은 필요 없습니다.
  </docs-card>
</docs-card-container>

<!--
## Set up a new project locally
-->

## 로컬 환경에 프로젝트 환경 설정하기

<!--
If you're starting a new project, you'll most likely want to create a local project so that you can use tooling such as Git.
-->

프로젝트를 새로 만든다면 Git과 같은 도구를 함께 사용하기 위해 로컬 환경에 프로젝트 환경을 설정하는 것을 대부분 선호합니다.

<!--
### Prerequisites
-->

### 환경설정 조건

<!--
- **Node.js** - [v20.19.0 or newer](/reference/versions)
- **Text editor** - We recommend [Visual Studio Code](https://code.visualstudio.com/)
- **Terminal** - Required for running [Angular CLI](/tools/cli) commands
- **Development Tool** - To improve your development workflow, we recommend the [Angular Language Service](/tools/language-service)
-->

- **Node.js** - [v20.19.0 이거나 이후 버전](/reference/versions)
- **텍스트 에디터** - [Visual Studio Code](https://code.visualstudio.com/)를 추천합니다.
- **터미널** - [Angular CLI](/tools/cli) 명령을 실행하기 위해 필요합니다.
- **개발 툴** - 개발 워크플로를 향상시키기 위해 [Angular Language Service](/tools/language-service) 사용을 권장합니다.

<!--
### Instructions
-->

### 설정방법

<!--
The following guide will walk you through setting up a local Angular project.
-->

로컬 환경에 Angular 프로젝트를 설정하려면 이런 과정을 거치면 됩니다.

<!--
#### Install Angular CLI
-->

#### Angular CLI 설치하기

<!--
Open a terminal (if you're using [Visual Studio Code](https://code.visualstudio.com/), you can open an [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)) and run the following command:

<docs-code-multifile>
  <docs-code
    header="npm"
    language="shell"
    >
    npm install -g @angular/cli
    </docs-code>
  <docs-code
    header="pnpm"
    language="shell"
    >
    pnpm install -g @angular/cli
    </docs-code>
  <docs-code
    header="yarn"
    language="shell"
    >
    yarn global add @angular/cli
    </docs-code>
  <docs-code
    header="bun"
    language="shell"
    >
    bun install -g @angular/cli
    </docs-code>

</docs-code-multifile>

If you are having issues running this command in Windows or Unix, check out the [CLI docs](/tools/cli/setup-local#install-the-angular-cli) for more info.
-->

터미널을 열고 다음 명령을 실행합니다.
[Visual Studio Code](https://code.visualstudio.com/)를 사용한다면 [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)를 열어서 작업하면 됩니다.

<docs-code-multifile>
  <docs-code
    header="npm"
    language="shell"
    >
    npm install -g @angular/cli
    </docs-code>
  <docs-code
    header="pnpm"
    language="shell"
    >
    pnpm install -g @angular/cli
    </docs-code>
  <docs-code
    header="yarn"
    language="shell"
    >
    yarn global add @angular/cli
    </docs-code>
  <docs-code
    header="bun"
    language="shell"
    >
    bun install -g @angular/cli
    </docs-code>

</docs-code-multifile>

Windows나 Unix에서 명령을 실행하다가 에러가 발생하면 [CLI docs](/tools/cli/setup-local#install-the-angular-cli)를 참고하세요.

<!--
#### Create a new project
-->

#### 프로젝트 생성하기

In your terminal, run the CLI command [`ng new`](cli/new) with the desired project name. In the following examples, we'll be using the example project name of `my-first-angular-app`.

```shell
ng new <project-name>
```

You will be presented with some configuration options for your project. Use the arrow and enter keys to navigate and select which options you desire.

If you don't have any preferences, just hit the enter key to take the default options and continue with the setup.

After you select the configuration options and the CLI runs through the setup, you should see the following message:

```text
✔ Packages installed successfully.
    Successfully initialized git.
```

At this point, you're now ready to run your project locally!
-->
터미널에서 Angular CLI [`ng new`](cli/new) 명령을 실행하면서 프로젝트 이름을 지정하세요.
이 문서에서는 `my-first-angular-app`라는 프로젝트 이름을 사용하겠습니다.

```shell

ng new <프로젝트-이름>

```

프로젝트를 생성하면서 몇가지 옵션을 선택하게 됩니다.
화살표 키와 엔터 키를 사용해서 원하는 옵션을 고르면 됩니다.

특별히 선호하는 옵션이 없다면 모든 질문에 엔터 키를 누르고 기본 설정으로 시작해도 됩니다.

모든 옵션을 다 골랐으면 Angular CLI가 환경설정을 시작하고 이런 메시지를 출력합니다:

```shell
✔ Packages installed successfully.
    Successfully initialized git.
```

이제 로컬 환경에 프로젝트를 실행할 준비가 끝났습니다!

<!--
#### Running your new project locally
-->

#### 로컬 프로젝트 실행하기

<!--
In your terminal, switch to your new Angular project.

```shell
cd my-first-angular-app
```

All of your dependencies should be installed at this point (which you can verify by checking for the existence of a `node_modules` folder in your project), so you can start your project by running the command:

```shell
npm start
```

If everything is successful, you should see a similar confirmation message in your terminal:

```text
Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

And now you can visit the path in `Local` (e.g., `http://localhost:4200`) to see your application. Happy coding! 🎉
-->

터미널에서 Angular 프로젝트 위치로 이동합니다.

```shell
cd my-first-angular-app
```

이 시점에는 앱 실행에 필요한 의존성 패키지들이 모두 설치되었기 때문에(프로젝트 폴더에 `node_modules` 폴더가 있는지 확인해 보세요), 아래 명령을 실행하면 프로젝트를 실행할 수 있습니다:

```shell
npm start
```

프로젝트가 문제없이 실행되면 터미널에서 아래와 비슷한 메시지를 확인할 수 있습니다:

```text
Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

위 메시지에서 `Local`에 해당하는 `http://localhost:4200` 에 접속하면 애플리케이션이 실행되는 것을 확인할 수 있습니다.
코딩 즐겁게 해봅시다! 🎉

<!--
### Using AI for Development
-->

### AI 활용하기

<!--
To get started with building in your preferred AI powered IDE, [check out Angular prompt rules and best practices](/ai/develop-with-ai).
-->

AI 기능이 지원되는 IDE를 활용하려면 [Angular 프롬프트 규칙, 모범사례](/ai/develop-with-ai) 문서를 참고하세요.

<!--
## Next steps
-->

## 다음 단계

<!--
Now that you've created your Angular project, you can learn more about Angular in our [Essentials guide](/essentials) or choose a topic in our in-depth guides!
-->

Angular 프로젝트를 생성했다면 이제 [핵심 가이드](/essentials)로 이동하거나 원하는 주제를 골라서 학습해 보세요!
