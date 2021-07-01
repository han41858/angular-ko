<!--
# Deploying an application
-->
# 애플리케이션 배포하기

<!--
Deploying your application is the process of compiling, or building, your code and hosting the JavaScript, CSS, and HTML on a web server.

This section builds on the previous steps in the [Getting Started](start "Try it: A basic application") tutorial and shows you how to deploy your application.
-->
애플리케이션을 배포한다는 것은 애플리케이션을 컴파일/빌드한 후에 웹 서버에 JavaScript, CSS, HTML 파일을 호스팅하는 것을 의미합니다.

이 가이드 문서는 [Angular 애플리케이션 시작하기](start "Try it: A basic application") 튜토리얼에서 만들었던 애플리케이션을 빌드하면서 빌드 과정이 어떻게 진행되는지 설명합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
A best practice is to run your project locally before you deploy it. To run your project locally, you need the following installed on your computer:

* [Node.js](https://nodejs.org/en/).
* The [Angular CLI](https://cli.angular.io/).
    From the terminal, install the Angular CLI globally with:

    ```sh
    npm install -g @angular/cli
    ```

    With the Angular CLI, you can use the command `ng` to create new workspaces, new projects, serve your application during development, or produce builds to share or distribute.
-->
애플리케이션을 배포하기 전에는 로컬에서 프로젝트를 실행해보는 것이 좋습니다.
프로젝트를 로컬에서 실행하려면 이런 것들이 설치되어 있어야 합니다:

* [Node.js](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/)
    
    터미널 전역 범위에 Angular CLI를 설치하려면 이 명령을 입력하면 됩니다:

    ```sh
    npm install -g @angular/cli
    ```

    Angular CLI를 설치하면 `ng` 명령어를 사용해서 워크스페이스를 생성하거나 프로젝트를 생성할 수 있고, 애플리케이션을 개발 모드로 실행할 수 있으며 빌드할 수도 있습니다.


<!--
## Running your application locally
-->
## 로컬에서 실행해보기

<!--
1. Download the source code from your StackBlitz project by clicking the `Download Project` icon in the left menu, across from `Project`, to download your files.

1. Create a new Angular CLI workspace using the [`ng new`](cli/new "CLI ng new command reference") command, where `my-project-name` is what you would like to call your project:

    ```sh
    ng new my-project-name
    ```
    
    This command displays a series of configuration prompts. For this tutorial, accept the default settings for each prompt.

1. In your newly CLI-generated application, replace the `/src` folder with the `/src` folder from your `StackBlitz` download.

1. Use the following CLI command to run your application locally:

    ```sh
    ng serve
    ```

1. To see your application in the  browser, go to http://localhost:4200/.
    If the default port 4200 is not available, you can specify another port with the port flag as in the following example:

     ```sh
    ng serve --port 4201
    ```

    While serving your application, you can edit your code and see the changes update automatically in the browser.
    To stop the `ng serve` command, press `Ctrl`+`c`.
-->
1. StackBlitz 프로젝트의 소스 코드를 내려받으려면 화면 왼쪽 `Project` 메뉴에 있는 `Download Project` 아이콘을 클릭하면 됩니다.

1. [`ng new`](cli/new "CLI ng new command reference") 명령을 실행해서 Angular CLI 워크스페이스를 생성합니다. 이 때 프로젝트 이름은 원하는 것을 지정하면 됩니다:

    ```sh
    ng new my-project-name
    ```
    
    이 명령을 실행하면 환경설정 프롬프트가 몇 번 표시됩니다.
    이번 튜토리얼에서는 기본값으로 진행합시다.

1. 새로 만든 애플리케이션 안에 있는 `/src` 폴더를 `StackBlitz`에서 다운받은 `/src` 폴더로 교체합니다.

1. 이 명령을 실행해서 애플리케이션을 로컬에서 실행합니다:

    ```sh
    ng serve
    ```

1. 애플리케이션이 동작하는 것을 브라우저로 확인하려면 http://localhost:4200/ 로 접근하면 됩니다.
    기본 포트는 4200이지만 이 포트를 사용할 수 없다면 Angular CLI로 `serve` 명령을 실행할 때 플래그를 추가하면 됩니다:

     ```sh
    ng serve --port 4201
    ```

    애플리케이션을 이렇게 실행하고 나면, 코드를 수정했을 때 브라우저가 자동으로 갱신되면서 수정사항이 바로 반영됩니다.
    `ng serve` 명령이 실행되는 것을 중단하려면 `Ctrl`+`c` 를 입력하면 됩니다.


{@a building}
<!--
## Building and hosting your application
-->
## 애플리케이션 빌드하고 호스팅하기

<!--
 1. To build your application for production, use the `build` command. By default, this command uses the `production` build configuration.

    ```sh
    ng build
    ```

    This command creates a `dist` folder in the application root directory with all the files that a hosting service needs for serving your application.

    <div class="alert is-helpful">

    If the above `ng build` command throws an error about missing packages, append the missing dependencies in your local project's `package.json` file to match the one in the downloaded StackBlitz project.

    </div>

1. Copy the contents of the `dist/my-project-name` folder to your web server.
    Because these files are static, you can host them on any web server capable of serving files; such as `Node.js`, Java, .NET, or any backend such as [Firebase](https://firebase.google.com/docs/hosting), [Google Cloud](https://cloud.google.com/solutions/web-hosting), or [App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website).
    For more information, see [Building & Serving](guide/build "Building and Serving Angular Apps") and [Deployment](guide/deployment "Deployment guide").
-->
1. 애플리케이션을 운영용으로 빌드하려면 `build` 명령을 사용하면 됩니다. 이 때 빌드 환경을 특별히 명시하지 않으면 `production` 환경이 기본으로 적용됩니다.

    ```sh
    ng build
    ```

    이 명령을 실행하면 애플리케이션 최상위 폴더에 `dist` 폴더가 생성되면서 애플리케이션 호스팅에 필요한 파일들이 들어갑니다.

    <div class="alert is-helpful">

    `ng build` 명령을 실행할 때 패키지를 찾을 수 없거나 프로젝트 `package.json` 파일에 등록된 패키지를 찾을 수 없으면 에러가 발생할 수 있습니다.

    </div>

1. `dist/my-project-name` 폴더에 있는 파일들을 웹 서버로 복사합니다.
    이 파일들은 정적으로 제공되어야 하기 때문에 웹 서버에서도 파일을 정적으로 호스팅할 수 있어야 합니다.
    `Node.js`, Java, .NET는 물론이고 [Firebase](https://firebase.google.com/docs/hosting), [Google Cloud](https://cloud.google.com/solutions/web-hosting)나 [App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website)와 같은 백엔드 서비스를 모두 활용할 수 있습니다.
    더 자세한 내용을 확인하려면 [빌드하기 & 실행하기](guide/build "Building and Serving Angular Apps") 문서나 [배포하기](guide/deployment "Deployment guide") 문서를 참고하세요.


<!--
## What's next
-->
## 다음 단계

<!--
In this tutorial, you've laid the foundation to explore the Angular world in areas such as mobile development, UX/UI development, and server-side rendering.
You can go deeper by studying more of Angular's features, engaging with the vibrant community, and exploring the robust ecosystem.
-->
이 튜토리얼까지 진행하면서 Angular의 기본 내용을 다뤘습니다.
Angular를 활용하면 모바일 디바이스용으로 개발자하거나, 잘 짜여진 UX/UI를 간단하게 적용할 수 있으며, 서버 사이드 렌더링도 처리할 수 있습니다.
Angular가 제공하는 기능을 더 확인해 보세요.
커뮤니티에 참여하셔도 좋고 생태계가 어떻게 구성되어 있는지 둘러보시는 것도 좋습니다.


<!--
### Learning more Angular
-->
### Angular에 대해 더 알아보기

<!--
For a more in-depth tutorial that leads you through building an application locally and exploring many of Angular's most popular features, see [Tour of Heroes](tutorial).

To explore Angular's foundational concepts, see the guides in the Understanding Angular section such as [Angular Components Overview](guide/component-overview) or [Template syntax](guide/template-syntax).
-->
로컬에 준비된 애플리케이션을 사용해서 Angular에 대해 더 알아보는 것도 좋습니다.
[히어로들의 여행](tutorial) 튜토리얼 문서를 확인해 보세요.

Angular의 기본 개념에 대해 알아보려면 [Angular 컴포넌트 개요](guide/component-overview) 문서나 [템플릿 문법](guide/template-syntax) 문서를 참고하세요.


<!--
### Joining the community
-->
### 커뮤니티 참여하기

<!--
[Tweet that you've completed this tutorial](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter"), tell us what you think, or submit [suggestions for future editions](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

Keep current by following the [Angular blog](https://blog.angular.io/ "Angular blog").
-->
[이 튜토리얼을 끝냈다는 것을 트위터로](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter") 알려주세요.
튜토리얼을 진행하면서 어땠는지 공유하시거나 [제안하실 내용](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form")을 입력해주셔도 좋습니다.

[Angular 블로그](https://blog.angular.io/ "Angular blog")에 올라오는 글들도 주목해 주세요.


<!--
### Exploring the Angular ecosystem
-->
### Angular 생태계 둘러보기

<!--
To support your UX/UI development, see [Angular Material](https://material.angular.io/ "Angular Material web site").

The Angular community also has an extensive [network of third-party tools and libraries](resources "Angular resources list").
-->
UX/UI를 개선하려면 [Angular Material](https://material.angular.io/ "Angular Material web site")를 참고하세요.

Angular에 활용할 수 있는 [서드파티 툴, 라이브러리 네트워크](resources "Angular resources list")도 확인해 보세요.
