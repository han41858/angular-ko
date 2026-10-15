<!--
# Build your first Angular app

This tutorial consists of lessons that introduce the Angular concepts you need to know to start coding in Angular.

You can do as many or as few as you would like and you can do them in any order.

HELPFUL: Prefer video? We also have a full [YouTube course](https://youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF&si=1q9889ulHp8VZ0e7) for this tutorial!

<docs-video src="https://www.youtube.com/embed/xAT0lHYhHMY?si=cKUW_MGn3MesFT7o"/>
-->

# 첫 Angular 앱 만들기

이 튜토리얼은 Angular로 코드를 작성할 때 알아야 할 개념을 소개하는 여러 실습으로 구성됩니다.

원하는 실습을 골라 원하는 순서로 진행해도 됩니다.

HELPFUL: 동영상이 더 편하신가요? 이 튜토리얼의 전체 내용을 다루는 [YouTube 강의](https://youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF&si=1q9889ulHp8VZ0e7)도 있습니다!

<docs-video src="https://www.youtube.com/embed/xAT0lHYhHMY?si=cKUW_MGn3MesFT7o"/>

<!--
## Before you start

For the best experience with this tutorial, review these requirements to make sure you have what you need to be successful.
-->

<a id="before-you-start"></a>

## 시작하기 전에

튜토리얼을 원활하게 진행할 수 있도록 필요한 준비 사항을 확인하세요.

<!--
### Your experience

The lessons in this tutorial assume that you have experience with the following:

1. Created an HTML web page by editing the HTML directly.
1. Programmed web site content in JavaScript.
1. Read Cascading Style Sheet (CSS) content and understand how selectors are used.
1. Used command-line instructions to perform tasks on your computer.
-->

<a id="your-experience"></a>

### 사전 지식

이 튜토리얼은 다음과 같은 경험이 있다고 가정합니다:

1. HTML을 직접 편집해 웹 페이지를 만든 경험
1. JavaScript로 웹사이트 기능을 구현한 경험
1. CSS(Cascading Style Sheet) 코드를 읽고 셀렉터 사용 방법을 이해한 경험
1. 명령줄을 사용해 컴퓨터에서 작업한 경험

<!--
### Your equipment

These lessons can be completed using a local installation of the Angular tools or in our embedded editor. Local Angular development can be completed on Windows, macOS or Linux based systems.

NOTE: Look for alerts like this one, which call out steps that may only be for your local editor.
-->

<a id="your-equipment"></a>

### 개발 환경

Angular 개발 도구를 로컬에 설치하거나 이 사이트에 내장된 에디터로 실습할 수 있습니다. 로컬 Angular 개발은 Windows, macOS, Linux에서 모두 가능합니다.

NOTE: 이 안내처럼 로컬 에디터에서만 필요한 단계를 알려주는 알림을 확인하세요.

<!--
## Conceptual preview of your first Angular app

The lessons in this tutorial create an Angular app that lists houses for rent and shows the details of individual houses.
This app uses features that are common to many Angular apps.

<img alt="Output of homes landing page" src="assets/images/tutorials/first-app/homes-app-landing-page.png">
-->

<a id="conceptual-preview-of-your-first-angular-app"></a>

## 첫 Angular 앱 미리보기

이 튜토리얼에서는 임대 주택 목록과 각 주택의 상세 정보를 표시하는 Angular 앱을 만듭니다.
이 앱은 여러 Angular 앱에서 공통으로 사용하는 기능을 활용합니다.

<img alt="Homes 앱의 첫 화면" src="assets/images/tutorials/first-app/homes-app-landing-page.png">

<!--
## Local development environment

NOTE: This step is only for your local environment!

Perform these steps in a command-line tool on the computer you want to use for this tutorial.

<docs-workflow>
-->

<a id="local-development-environment"></a>

## 로컬 개발 환경

NOTE: 이 단계는 로컬 환경에서만 필요합니다!

튜토리얼을 진행할 컴퓨터의 명령줄 도구에서 다음 단계를 수행하세요.

<docs-workflow>

<!--
<docs-step title="Identify the version of `node.js` that Angular requires">
Angular requires an active LTS or maintenance LTS version of Node. Let's confirm your version of `node.js`. For information about specific version requirements, see the engines property in the [package.json file](https://unpkg.com/browse/@angular/core@15.1.5/package.json).

From a **Terminal** window:

1. Run the following command: `node --version`
1. Confirm that the version number displayed meets the requirements.
   </docs-step>
-->

<docs-step title="Angular에 필요한 `node.js` 버전 확인하기">

<a id="identify-the-version-of-nodejs-that-angular-requires"></a>

Angular에는 활성 LTS 또는 유지보수 LTS 버전의 Node가 필요합니다. 설치된 `node.js` 버전을 확인해 보겠습니다. 구체적인 버전 요구 사항은 [package.json 파일](https://unpkg.com/browse/@angular/core@15.1.5/package.json)의 engines 프로퍼티를 참고하세요.

**터미널** 창에서 다음 작업을 수행하세요:

1. `node --version` 명령어를 실행하세요.
1. 표시된 버전이 요구 사항을 충족하는지 확인하세요.
   </docs-step>

<!--
<docs-step title="Install the correct version of `node.js` for Angular">
If you do not have a version of `node.js` installed, please follow the [directions for installation on nodejs.org](https://nodejs.org/en/download/)
</docs-step>
-->

<docs-step title="Angular에 맞는 `node.js` 버전 설치하기">

<a id="install-the-correct-version-of-nodejs-for-angular"></a>

`node.js`가 설치되어 있지 않다면 [nodejs.org의 설치 안내](https://nodejs.org/en/download/)를 따르세요.
</docs-step>

<!--
<docs-step title="Install the latest version of Angular">
With `node.js` and `npm` installed, the next step is to install the [Angular CLI](tools/cli) which provides tooling for effective Angular development.

From a **Terminal** window run the following command: `npm install -g @angular/cli`.
</docs-step>
-->

<docs-step title="최신 Angular 설치하기">

<a id="install-the-latest-version-of-angular"></a>

`node.js`와 `npm`을 설치했다면 효율적인 Angular 개발을 위한 도구인 [Angular CLI](tools/cli)를 설치합니다.

**터미널** 창에서 `npm install -g @angular/cli` 명령어를 실행하세요.
</docs-step>

<!--
<docs-step title="Install integrated development environment (IDE)">
You are free to use any tool you prefer to build apps with Angular. We recommend the following:

1. [Visual Studio Code](https://code.visualstudio.com/)
2. As an optional, but recommended step you can further improve your developer experience by installing the [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
3. [WebStorm](https://www.jetbrains.com/webstorm/)
   </docs-step>
-->

<docs-step title="통합 개발 환경(IDE) 설치하기">

<a id="install-integrated-development-environment-ide"></a>

Angular 앱을 개발할 때는 원하는 도구를 자유롭게 사용해도 됩니다. 다음 도구를 권장합니다:

1. [Visual Studio Code](https://code.visualstudio.com/)
2. 필수는 아니지만 [Angular 언어 지원 서비스](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)를 설치하면 개발 환경을 더 편리하게 사용할 수 있습니다.
3. [WebStorm](https://www.jetbrains.com/webstorm/)
   </docs-step>

<!--
<docs-step title="Optional: set-up your AI powered IDE">

In case you're following this tutorial in your preferred AI powered IDE, [check out Angular prompt rules and best practices](/ai/develop-with-ai).

</docs-step>

</docs-workflow>

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="/overview" title="What is Angular"/>
  <docs-pill href="/tools/cli/setup-local" title="Setting up the local environment and workspace"/>
  <docs-pill href="/cli" title="Angular CLI Reference"/>
</docs-pill-row>
-->

<docs-step title="선택 사항: AI 지원 IDE 설정하기">

<a id="optional-set-up-your-ai-powered-ide"></a>

AI 지원 IDE에서 이 튜토리얼을 진행한다면 [Angular 프롬프트 규칙과 권장 사항](/ai/develop-with-ai)을 확인하세요.

</docs-step>

</docs-workflow>

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="/overview" title="Angular란?"/>
  <docs-pill href="/tools/cli/setup-local" title="로컬 환경과 워크스페이스 설정하기"/>
  <docs-pill href="/cli" title="Angular CLI 참조"/>
</docs-pill-row>
