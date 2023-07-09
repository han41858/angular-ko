<!--
# Create a new project
-->
# 프로젝트 생성하기

<!--
Use the `ng new` command to start creating your **Tour of Heroes** application.

This tutorial:

1.  Sets up your environment.
2.  Creates a new workspace and initial application project.
3.  Serves the application.
4.  Makes changes to the new application.

<div class="alert is-helpful">

To view the application's code, see the <live-example></live-example>.

</div>
-->
`ng new` 명령을 실행하면 **히어로들의 여행** 애플리케이션을 생성할 수 있습니다.

이 튜토리얼에서는 이런 내용을 다룹니다:

1.  개발환경 설정하기
2.  워크스페이스, 애플리케이션 프로젝트 생성하기
3.  애플리케이션 실행하기
4.  애플리케이션 개발 시작하기

<div class="alert is-helpful">

이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인할 수 있습니다.

</div>


<!--
## Set up your environment
-->
## 개발환경 설정하기

<!--
To set up your development environment, follow the instructions in [Local Environment Setup](guide/setup-local "Setting up for Local Development").
-->
애플리케이션의 개발 환경을 구성하려면 [로컬 환경 설정](guide/setup-local "Setting up for Local Development") 문서를 참고하는 것이 좋습니다.


<!--
## Create a new workspace and an initial application
-->
## 워크스페이스와 애플리케이션 기본 틀 생성하기

<!--
You develop applications in the context of an Angular [workspace](guide/glossary#workspace).
A *workspace* contains the files for one or more [projects](guide/glossary#project).
A *project* is the set of files that make up an application or a library.

To create a new workspace and an initial project:

1.  Ensure that you aren't already in an Angular workspace directory.
    For example, if you're in the Getting Started workspace from an earlier exercise, navigate to its parent.

2.  Run `ng new` followed by the application name as shown here:

    <code-example format="shell" language="shell">

    ng new angular-tour-of-heroes

    </code-example>

3.  `ng new` prompts you for information about features to include in the initial project.
    Accept the defaults by pressing the Enter or Return key.

`ng new` installs the necessary `npm` packages and other dependencies that Angular requires.
This can take a few minutes.

`ng new` also creates the following workspace and starter project files:

*   A new workspace, with a root directory named `angular-tour-of-heroes`
*   An initial skeleton application project in the `src/app` subdirectory
*   Related configuration files

The initial application project contains a simple application that's ready to run.
-->
Angular 애플리케이션은 Angular [워크스페이스](guide/glossary#workspace) 안에서 개발합니다.
*워크스페이스*는 하나 이상의 [프로젝트](guide/glossary#project)로 구성되는 단위입니다.
그리고 *프로젝트*는 애플리케이션이나 라이브러리를 구성하는 파일들의 집합을 의미합니다.

워크스페이스를 새로 만들고 애플리케이션을 구성하려면 다음 순서대로 진행합니다:

1.  아직 Angular 워크스페이스 폴더 안에 있지 않은 것을 전제로 합니다.
    이전에 시작하기 문서를 진행하면서 이미 만든 워크스페이스가 있다면, 이 폴더 밖에서 작업하세요.

2.  `ng new` 명령을 실행해서 `angular-tour-of-heroes` 라는 이름으로 워크스페이스를 생성합니다:

    <code-example format="shell" language="shell">

    ng new angular-tour-of-heroes

    </code-example>

3.  `커맨드 창에서 `ng new` 명령을 실행하면 프로젝트에 어떤 설정값을 추가로 지정할지 물어봅니다.
    엔터키를 눌러서 기본값으로 진행합시다.

이 과정을 진행하면 Angular CLI가 Angular `npm` 패키지와 서드파티 패키지를 설치하기 때문에 시간이 약간 걸릴 수 있습니다.

그리고 이 명령은 몇가지 프로젝트 파일을 준비하기도 합니다:

*   `angular-tour-of-heroes`라는 폴더 이름으로 새로운 워크스페이스를 생성합니다.
*   서브 폴더 `src/app`를 생성하고 이 폴더에 애플리케이션 초기 코드를 생성합니다.
*   환경설정파일을 생성합니다.

이제 실행할 수 있을 정도로 간단한 애플리케이션 프로젝트이 만들어 졌습니다.


<!--
## Serve the application
-->
## 애플리케이션 실행하기

<!--
Go to the workspace directory and launch the application.

<code-example format="shell" language="shell">

cd angular-tour-of-heroes
ng serve --open

</code-example>

<div class="alert is-helpful">

The `ng serve` command:

* Builds the application
* Starts the development server
* Watches the source files
* Rebuilds the application as you make changes

The `--open` flag opens a browser to `http://localhost:4200`.

</div>

You should see the application running in your browser.
-->
워크스페이스 폴더로 이동해서 애플리케이션을 실행합니다.

<code-example format="shell" language="shell">

cd angular-tour-of-heroes
ng serve --open

</code-example>

<div class="alert is-helpful">

`ng serve` 명령을 실행하면:

* 애플리케이션을 빌드합니다.
* 개발 서버를 시작합니다.
* 소스 파일이 변경되는 것을 감지합니다.
* 변경사항이 있을 때마다 애플리케이션을 다시 빌드합니다.

`ng serve` 명령을 실행할 때 `--open` 옵션을 함께 사용하면 서버의 주소인 `http://localhost:4200` 를 기본 브라우저로 열 수 있습니다.

</div>

브라우저가 실행되면 앱이 실행되는 것을 확인할 수 있습니다.


<!--
## Angular components
-->
## Angular 컴포넌트

<!--
The page you see is the *application shell*.
The shell is controlled by an Angular **component** named `AppComponent`.

*Components* are the fundamental building blocks of Angular applications.
They display data on the screen, listen for user input, and take action based on that input.
-->
처음 보이는 페이지는 *애플리케이션 셸* 입니다.
애플리케이션 셸은 `AppComponent`란 이름의 컴포넌트이며, Angular가 직접 관리하는 컴포넌트입니다.

*컴포넌트* 는 Angular 애플리케이션의 기본 구성 요소입니다.
컴포넌트는 화면에 데이터를 표시하고, 유저의 입력을 기다리며, 유저의 입력에 반응하면서 어떤 동작을 수행합니다.


<!--
## Make changes to the application
-->
## 애플리케이션 수정하기

<!--
Open the project in your favorite editor or IDE. Navigate to the `src/app` directory to edit the starter application.
In the IDE, locate these files, which make up the `AppComponent` that you just created:

| Files                | Details |
|:---                  |:---     |
| `app.component.ts`   | The component class code, written in TypeScript. |
| `app.component.html` | The component template, written in HTML.         |
| `app.component.css`  | The component's private CSS styles.              |


<div class="alert is-important">

When you ran `ng new`, Angular created test specifications for your new application.
Unfortunately, making these changes breaks your newly created specifications.

That won't be a problem because Angular testing is outside the scope of this tutorial and won't be used.

To learn more about testing with Angular, see [Testing](guide/testing).

</div>
-->
자주 사용하는 에디터나 IDE로 프로젝트를 열고 `src/app` 폴더로 이동합니다.
이 폴더를 보면 `AppComponent`를 구성하는 파일들을 확인할 수 있습니다:

| 파일                   | 설명                              |
|:---------------------|:--------------------------------|
| `app.component.ts`   | TypeScript로 작성된 컴포넌트 클래스 코드입니다. |
| `app.component.html` | HTML로 작성된 컴포넌트 템플릿입니다.          |
| `app.component.css`  | 이 컴포넌트에만 적용되는 CSS 스타일 파일입니다.    |


<div class="alert is-important">

When you ran `ng new`, Angular created test specifications for your new application.
Unfortunately, making these changes breaks your newly created specifications.

That won't be a problem because Angular testing is outside the scope of this tutorial and won't be used.

To learn more about testing with Angular, see [Testing](guide/testing).

</div>


<!--
### Change the application title
-->
### 애플리케이션 제목 수정하기

<!--
Open the `app.component.ts` and change the `title` property value to 'Tour of Heroes'.

<code-example header="app.component.ts (class title property)" path="toh-pt0/src/app/app.component.ts" region="set-title"></code-example>

Open `app.component.html` and delete the default template that `ng new` created.
Replace it with the following line of HTML.

<code-example header="app.component.html (template)" path="toh-pt0/src/app/app.component.html"></code-example>

The double curly braces are Angular's *interpolation binding* syntax.
This interpolation binding presents the component's `title` property value inside the HTML header tag.

The browser refreshes and displays the new application title.
-->
`app.component.ts` 파일을 열어서 `title` 프로퍼티의 값을 'Tour of Heroes'로 바꿔봅시다.

<code-example header="app.component.ts (title 프로퍼티)" path="toh-pt0/src/app/app.component.ts" region="set-title"></code-example>

`app.component.html` 파일을 열어서 Angular CLI가 자동으로 생성한 기본 템플릿을 삭제하고 아래의 HTML코드로 교체합니다.

<code-example header="app.component.html (템플릿)" path="toh-pt0/src/app/app.component.html"></code-example>

이중 중괄호\(`{{}}`\)는 Angular가 제공하는 *문자열 바인딩\(interpolation binding\)* 문법입니다.
문자열 바인딩을 사용하면 컴포넌트의 `title` 프로퍼티 값을 HTML 헤더 태그에 표시할 수 있습니다.

변경된 내용을 저장하면 브라우저가 자동으로 갱신되며 수정한 애플리케이션 타이틀이 표시됩니다.


<a id="app-wide-styles"></a>

<!--
### Add application styles
-->
### 애플리케이션 전역 스타일 지정하기

<!--
Most apps strive for a consistent look across the application.
`ng new` created an empty `styles.css` for this purpose.
Put your application-wide styles there.

Open `src/styles.css` and add the code below to the file.

<code-example header="src/styles.css (excerpt)" path="toh-pt0/src/styles.1.css"></code-example>
-->
애플리케이션에 존재하는 모든 페이지의 스타일은 일관되게 구성해야 합니다.
Angular CLI로 프로젝트를 생성하면 빈 내용으로 `styles.css` 파일이 생성되는데, 이 파일에 스타일을 정의하면 애플리케이션 전역에 지정되는 스타일을 지정할 수 있습니다.

`src/styles.css` 파일을 열고 아래에 다음 코드를 추가합니다.

<code-example header="src/styles.css (일부)" path="toh-pt0/src/styles.1.css"></code-example>


<!--
## Final code review
-->
## 최종 코드 리뷰

<!--
Here are the code files discussed on this page.

<code-tabs>
    <code-pane header="src/app/app.component.ts" path="toh-pt0/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt0/src/app/app.component.html"></code-pane>
    <code-pane header="src/styles.css (excerpt)" path="toh-pt0/src/styles.1.css"></code-pane>
</code-tabs>
-->
이 튜토리얼에서 언급한 소스코드를 확인해 보세요.

<code-tabs>
    <code-pane header="src/app/app.component.ts" path="toh-pt0/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt0/src/app/app.component.html"></code-pane>
    <code-pane header="src/styles.css (일부)" path="toh-pt0/src/styles.1.css"></code-pane>
</code-tabs>


<!--
## Summary
-->
## 정리

<!--
*   You created the initial application structure using `ng new`.
*   You learned that Angular components display data
*   You used the double curly braces of interpolation to display the application title
-->
*   `ng new` 명령을 실행하면 애플리케이션의 기본 틀을 생성할 수 있습니다.
*   Angular 컴포넌트를 사용하면 컴포넌트에 있는 데이터를 화면에 표시할 수 있습니다.
*   이중 중괄호를 사용하면 컴포넌트 프로퍼티 값을 템플릿에 바인딩 할 수 있습니다.


@reviewed 2022-02-28
