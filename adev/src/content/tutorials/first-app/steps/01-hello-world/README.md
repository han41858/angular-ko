<!--
# Hello world

This first lesson serves as the starting point from which each lesson in this tutorial adds new features to build a complete Angular app. In this lesson, we'll update the application to display the famous text, "Hello World".

<docs-video src="https://www.youtube.com/embed/UnOwDuliqZA?si=uML-cDRbrxmYdD_9"/>
-->

# Hello world

첫 실습을 시작으로 각 실습에서 기능을 추가하며 완전한 Angular 앱을 만들어 봅니다. 이번 실습에서는 애플리케이션에 익숙한 문구인 "Hello World"를 표시하도록 수정합니다.

<docs-video src="https://www.youtube.com/embed/UnOwDuliqZA?si=uML-cDRbrxmYdD_9"/>

<!--
## What you'll learn

If your application runs successfully in the browser and displays the executed content without errors, it confirms that your development environment and IDE are correctly set up to begin building an Angular app.

NOTE: If you are working with the embedded editor, skip to [step four](#create-hello-world).
When working in the browser playground, you do not need to `ng serve` to run the app. Other commands like `ng generate` can be done in the console window to your right.

<docs-workflow>
-->

<a id="what-youll-learn"></a>

## 학습 목표

애플리케이션이 브라우저에서 정상적으로 실행되고 오류 없이 내용이 표시된다면 Angular 앱 개발을 시작할 수 있도록 개발 환경과 IDE가 올바르게 설정된 것입니다.

NOTE: 내장 에디터를 사용한다면 [네 번째 단계](#create-hello-world)로 이동하세요.
브라우저 플레이그라운드에서는 앱을 실행하기 위해 `ng serve`를 실행할 필요가 없습니다. `ng generate`와 같은 다른 명령어는 오른쪽 콘솔 창에서 실행할 수 있습니다.

<docs-workflow>

<!--
<docs-step title="Download the default app">
Start by clicking the "Download" icon in the top right pane of the code editor. This will download a `.zip` file containing the source code for this tutorial. Open this in your local Terminal and IDE then move on to testing the default app.

At any step in the tutorial, you can click this icon to download the step's source code and start from there.
</docs-step>
-->

<docs-step title="기본 앱 다운로드하기">

<a id="download-the-default-app"></a>

코드 에디터 오른쪽 위의 "다운로드" 아이콘을 클릭하세요. 이 튜토리얼의 소스 코드가 담긴 `.zip` 파일이 다운로드됩니다. 로컬 터미널과 IDE에서 이 프로젝트를 연 다음 기본 앱 테스트를 진행하세요.

튜토리얼의 어느 단계에서든 이 아이콘을 클릭하면 해당 단계의 소스 코드를 다운로드해 그 지점부터 시작할 수 있습니다.
</docs-step>

<!--
<docs-step title="Test the default app">
In this step, after you download the default starting app, you build the default Angular app.
This confirms that your development environment has what you need to continue the tutorial.

In the **Terminal** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.
1. Run this command to install the dependencies needed to run the app.

   ```shell
   npm install
   ```

1. Run this command to build and serve the default app.

   ```shell
   ng serve
   ```

   The app should build without errors.

1. In a web browser on your development computer, open `http://localhost:4200`.
1. Confirm that the default web site appears in the browser.
1. You can leave `ng serve` running as you complete the next steps.
   </docs-step>
-->

<docs-step title="기본 앱 테스트하기">

<a id="test-the-default-app"></a>

이 단계에서는 실습의 출발점인 기본 앱을 다운로드한 후 기본 Angular 앱을 빌드합니다.
이를 통해 튜토리얼을 계속 진행하는 데 필요한 개발 환경이 준비되어 있는지 확인합니다.

IDE의 **터미널** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.
1. 다음 명령어로 앱 실행에 필요한 의존성을 설치하세요.

   ```shell
   npm install
   ```

1. 다음 명령어로 기본 앱을 빌드하고 실행하세요.

   ```shell
   ng serve
   ```

   앱이 오류 없이 빌드되어야 합니다.

1. 개발용 컴퓨터의 웹 브라우저에서 `http://localhost:4200`을 여세요.
1. 브라우저에 기본 웹사이트가 표시되는지 확인하세요.
1. 다음 단계를 진행하는 동안 `ng serve`를 실행 상태로 두어도 됩니다.
   </docs-step>

<!--
<docs-step title="Review the files in the project">
In this step, you get to know the files that make up a default Angular app.

In the **Explorer** pane of your IDE:

1. In your project directory, navigate to the `first-app` directory.
1. Open the `src` directory to see these files.
   1. In the file explorer, find the Angular app files (`/src`).
      1. `index.html` is the app's top level HTML template.
      1. `styles.css` is the app's top level style sheet.
      1. `main.ts` is where the app starts running.
      1. `favicon.ico` is the app's icon, just as you would find in any web site.
   1. In the file explorer, find the Angular app's component files (`/app`).
      1. `app.ts` is the source file that describes the `app-root` component.
         This is the top-level Angular component in the app. A component is the basic building block of an Angular application.
         The component description includes the component's code, HTML template, and styles, which can be described in this file, or in separate files.

         In this app, the styles are in a separate file while the component's code and HTML template are in this file.

      1. `app.css` is the style sheet for this component.
      1. New components are added to this directory.

   1. In the file explorer, find the image directory (`/public`) that contains images used by the app.
   1. In the file explorer, find the files and directories that an Angular app needs to build and run, but they are not files that you normally interact with.
      1. `.angular` has files required to build the Angular app.
      1. `.e2e` has files used to test the app.
      1. `.node_modules` has the node.js packages that the app uses.
      1. `angular.json` describes the Angular app to the app building tools.
      1. `package.json` is used by `npm` (the node package manager) to run the finished app.
      1. `tsconfig.*` are the files that describe the app's configuration to the TypeScript compiler.

After you have reviewed the files that make up an Angular app project, continue to the next step.
</docs-step>
-->

<docs-step title="프로젝트 파일 살펴보기">

<a id="review-the-files-in-the-project"></a>

이 단계에서는 기본 Angular 앱을 구성하는 파일을 살펴봅니다.

IDE의 **탐색기** 창에서 다음 작업을 수행하세요:

1. 프로젝트 디렉터리에서 `first-app` 디렉터리로 이동하세요.
1. `src` 디렉터리를 열어 다음 파일을 확인하세요.
   1. 파일 탐색기에서 Angular 앱 파일이 있는 `/src`를 찾으세요.
      1. `index.html`은 앱의 최상위 HTML 템플릿입니다.
      1. `styles.css`는 앱의 최상위 스타일 시트입니다.
      1. `main.ts`는 앱 실행이 시작되는 파일입니다.
      1. `favicon.ico`는 일반적인 웹사이트에서 사용하는 것과 같은 앱 아이콘입니다.
   1. 파일 탐색기에서 Angular 앱의 컴포넌트 파일이 있는 `/app`을 찾으세요.
      1. `app.ts`는 `app-root` 컴포넌트를 정의하는 소스 파일입니다.
         이 컴포넌트는 앱의 최상위 Angular 컴포넌트입니다. 컴포넌트는 Angular 애플리케이션의 기본 구성 요소입니다.
         컴포넌트 정의에는 코드, HTML 템플릿, 스타일이 포함되며, 이를 한 파일에 작성하거나 별도의 파일로 나눌 수 있습니다.

         이 앱에서는 스타일을 별도 파일에 작성하고 컴포넌트 코드와 HTML 템플릿은 이 파일에 작성합니다.

      1. `app.css`는 이 컴포넌트의 스타일 시트입니다.
      1. 새 컴포넌트는 이 디렉터리에 추가됩니다.

   1. 파일 탐색기에서 앱에 사용하는 이미지가 있는 `/public` 디렉터리를 찾으세요.
   1. 파일 탐색기에서 Angular 앱을 빌드하고 실행하는 데 필요하지만 평소에는 직접 다루지 않는 파일과 디렉터리를 확인하세요.
      1. `.angular`에는 Angular 앱 빌드에 필요한 파일이 있습니다.
      1. `.e2e`에는 앱 테스트에 사용하는 파일이 있습니다.
      1. `node_modules`에는 앱에서 사용하는 Node.js 패키지가 있습니다.
      1. `angular.json`은 앱 빌드 도구에 Angular 앱의 구성을 전달합니다.
      1. `package.json`은 `npm`(Node 패키지 매니저)이 완성된 앱을 실행할 때 사용합니다.
      1. `tsconfig.*`는 TypeScript 컴파일러에 앱의 설정을 전달하는 파일입니다.

Angular 앱 프로젝트를 구성하는 파일을 확인했다면 다음 단계로 진행하세요.
</docs-step>

<!--
<docs-step title="Create `Hello World`">
In this step, you update the Angular project files to change the displayed content.

In your IDE:

1. Open `first-app/src/index.html`.
   NOTE: This step and the next are only for your local environment!

1. In `index.html`, replace the `<title>` element with this code to update the title of the app.

   <docs-code header="Replace in src/index.html" path="adev/src/content/tutorials/first-app/steps/02-Home/src/index.html" visibleLines="[5]"/>

   Then, save the changes you just made to `index.html`.

1. Next, open `first-app/src/app/app.ts`.
1. In `app.ts`, in the `@Component` definition, replace the `template` line with this code to change the text in the app component.

   <docs-code language="angular-ts" header="Replace in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/02-Home/src/app/app.ts" visibleLines="[6]"/>

1. In `app.ts`, in the `App` class definition, replace the `title` line with this code to change the component title.

   <docs-code header="Replace in src/app/app.ts" path="adev/src/content/tutorials/first-app/steps/02-Home/src/app/app.ts" visibleLines="[10]"/>

   Then, save the changes you made to `app.ts`.

1. If you stopped the `ng serve` command from step 1, in the **Terminal** window of your IDE, run `ng serve` again.
1. Open your browser and navigate to `localhost:4200` and confirm that the app builds without error and displays _Homes_ in the title and _Hello world_ in the body of your app:
   <img alt="browser frame of page displaying the text 'Hello World'" src="assets/images/tutorials/first-app/homes-app-lesson-01-browser.png">
   </docs-step>

</docs-workflow>

SUMMARY: In this lesson, you updated a default Angular app to display _Hello world_.
In the process, you learned about the `ng serve` command to serve your app locally for testing.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="guide/components" title="Angular Components"/>
  <docs-pill href="tools/cli" title="Creating applications with the Angular CLI"/>
</docs-pill-row>
-->

<docs-step title="`Hello World` 만들기">

<a id="create-hello-world"></a>

이 단계에서는 Angular 프로젝트 파일을 수정해 화면에 표시되는 내용을 바꿉니다.

IDE에서 다음 작업을 수행하세요:

1. `first-app/src/index.html`을 여세요.
   NOTE: 이 단계와 다음 단계는 로컬 환경에서만 필요합니다!

1. `index.html`의 `<title>` 엘리먼트를 다음 코드로 바꿔 앱 제목을 수정하세요.

   <docs-code header="src/index.html에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/02-Home/src/index.html" visibleLines="[5]"/>

   그런 다음 `index.html`의 변경 사항을 저장하세요.

1. 다음으로 `first-app/src/app/app.ts`를 여세요.
1. `app.ts`의 `@Component` 정의에서 `template` 줄을 다음 코드로 바꿔 앱 컴포넌트의 텍스트를 수정하세요.

   <docs-code language="angular-ts" header="src/app/app.ts에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/02-Home/src/app/app.ts" visibleLines="[6]"/>

1. `app.ts`의 `App` 클래스 정의에서 `title` 줄을 다음 코드로 바꿔 컴포넌트 제목을 수정하세요.

   <docs-code header="src/app/app.ts에서 교체할 코드" path="adev/src/content/tutorials/first-app/steps/02-Home/src/app/app.ts" visibleLines="[10]"/>

   그런 다음 `app.ts`의 변경 사항을 저장하세요.

1. 앞에서 실행한 `ng serve` 명령어를 중지했다면 IDE의 **터미널** 창에서 `ng serve`를 다시 실행하세요.
1. 브라우저에서 `localhost:4200`을 열고 앱이 오류 없이 빌드되며 제목에는 _Homes_ 가, 본문에는 _Hello world_ 가 표시되는지 확인하세요:
   <img alt="'Hello World' 문구가 표시된 브라우저 화면" src="assets/images/tutorials/first-app/homes-app-lesson-01-browser.png">
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 기본 Angular 앱에 _Hello world_ 를 표시하도록 수정했습니다.
이 과정에서 앱을 로컬에서 실행하고 테스트하는 `ng serve` 명령어를 알아봤습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="guide/components" title="Angular 컴포넌트"/>
  <docs-pill href="tools/cli" title="Angular CLI로 애플리케이션 만들기"/>
</docs-pill-row>
