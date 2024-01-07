<!--
# Angular Language Service
-->
# Angular 언어지원 서비스

<!--
The Angular Language Service provides code editors with a way to get completions, errors, hints, and navigation inside Angular templates.
It works with external templates in separate HTML files, and also with in-line templates.
-->
Angular 언어지원 서비스를 활용하면 코드 에디터에서 코드 자동완성이나 문법 에러, 코드 힌트 등에 대한 정보를 제공받을 수 있으며, Angular 템플릿 안에서 특정 코드와 관련된 곳으로 자유롭게 이동할 수 있습니다.
심볼을 찾아 이동하는 기능은 별도 HTML 파일에서는 물론이고 인라인 템플릿에서도 가능합니다.


<!--
## Configuring compiler options for the Angular Language Service
-->
## Angular 언어지원 서비스 용 컴파일러 옵션

<!--
To enable the latest Language Service features, set the `strictTemplates` option in `tsconfig.json` by setting `strictTemplates` to `true,` as shown in the following example:

<code-example language="json">

"angularCompilerOptions": {
  "strictTemplates": true
}

</code-example>

For more information, see the [Angular compiler options](guide/angular-compiler-options) guide.
-->
최신 언어지원 서비스를 활성화하려면 `tsconfig.json` 파일의 `strictTemplates` 옵션을 `true`로 설정하면 됩니다:

<code-example language="json">

"angularCompilerOptions": {
  "strictTemplates": true
}

</code-example>

자세한 내용은 [Angular 컴파일러 옵션](guide/angular-compiler-options) 문서를 참고하세요.


<!--
## Features
-->
## 기능

<!--
Your editor autodetects that you are opening an Angular file.
It then uses the Angular Language Service to read your `tsconfig.json` file, find all the templates you have in your application, and then provide language services for any templates that you open.

Language services include:

*   Completions lists
*   AOT Diagnostic messages
*   Quick info
*   Go to definition
-->
최신 코드 에디터는 Angular 파일이 열리는 것을 감지하다가 파일이 열리면 Angular 언어지원 서비스를 사용해서 `tsconfig.json` 파일을 불러옵니다.
그리고 애플리케이션에 있는 모든 템플릿 파일을 찾아서 분석하고 추가 기능을 제공합니다.

언어지원 서비스는 이런 기능을 제공합니다:

*   코드 자동완성 목록
*   AOT 분석 메시지
*   빠른 정보
*   정의부로 이동


<!--
### Autocompletion
-->
### 코드 자동완성

<!--
Autocompletion can speed up your development time by providing you with contextual possibilities and hints as you type.
This example shows autocomplete in an interpolation.
As you type it out, you can press tab to complete.

<div class="lightbox">

<img alt="autocompletion" src="generated/images/guide/language-service/language-completion.gif">

</div>

There are also completions within elements.
Any elements you have as a component selector will show up in the completion list.
-->
코드 자동완성 기능을 활용하면 해당 컨텍스트에 사용할 수 있는 힌트를 제공받을 수 있기 때문에 개발 속도를 크게 향상시킬수 있습니다.
이 기능은 문자열 바인딩에서도 제공됩니다.
코드 자동완성 기능이 제공하는 항목 중에서 원하는 것을 선택하고 탭키를 누르기만 하면 됩니다.

<div class="lightbox">

<img alt="autocompletion" src="generated/images/guide/language-service/language-completion.gif">

</div>

자동완성 기능은 엘리먼트 안에서도 제공됩니다.
컴포넌트 셀렉터로 사용된 엘리먼트 태그는 템플릿에 사용할 수 있는 엘리먼트 목록으로 제공됩니다.


<!--
### Error checking
-->
### 문법 오류 검사

<!--
The Angular Language Service can forewarn you of mistakes in your code.
In this example, Angular doesn't know what `orders` is or where it comes from.

<div class="lightbox">

<img alt="error checking" src="generated/images/guide/language-service/language-error.gif">

</div>
-->
Angular 언어지원 서비스를 사용하면 코드를 작성할 때 발생하는 오류를 방지할 수 있습니다.
그래서 템플릿에 `orders`라는 항목을 추가했는데 이 항목이 Angular 구성요소 중 어느것에도 해당되지 않는다면 다음과 같이 표시됩니다.

<div class="lightbox">

<img alt="error checking" src="generated/images/guide/language-service/language-error.gif">

</div>


<!--
### Quick info and navigation
-->
### 빠른 정보와 네비게이션

<!--
The quick-info feature lets you hover to see where components, directives, and modules come from.
You can then click "Go to definition" or press F12 to go directly to the definition.

<div class="lightbox">

<img alt="navigation" src="generated/images/guide/language-service/language-navigation.gif">

</div>
-->
빠른 정보(quick-info) 기능을 활용하면 템플릿에서 컴포넌트, 디렉티브, 모듈 심볼에 커서나 마우스를 옮겼을 때 해당 객체의 정보를 확인할 수 있습니다.
이 때 "Go to definition"이나 F12 키를 누르면 해당 코드가 정의된 코드로 바로 이동할 수 있습니다.

<div class="lightbox">

<img alt="navigation" src="generated/images/guide/language-service/language-navigation.gif">

</div>


<!--
## Angular Language Service in your editor
-->
## 에디터에서 Angular 언어지원 서비스 활용하기

<!--
Angular Language Service is currently available as an extension for [Visual Studio Code](https://code.visualstudio.com), [WebStorm](https://www.jetbrains.com/webstorm), [Sublime Text](https://www.sublimetext.com) and [Eclipse IDE](https://www.eclipse.org/eclipseide).
-->
Angular 언어지원 서비스는 현재 [Visual Studio Code](https://code.visualstudio.com/)와 [WebStorm](https://www.jetbrains.com/webstorm), [Sublime Text](https://www.sublimetext.com/), [Eclipse IDE](https://www.eclipse.org/eclipseide/)를 대상으로 제공됩니다.

### Visual Studio Code

<!--
In [Visual Studio Code](https://code.visualstudio.com), install the extension from the [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
Open the marketplace from the editor using the Extensions icon on the left menu pane, or use VS Quick Open \(⌘+P on Mac, CTRL+P on Windows\) and type "? ext".
In the marketplace, search for Angular Language Service extension, and click the **Install** button.

The Visual Studio Code integration with the Angular language service is maintained and distributed by the Angular team.
-->
[Visual Studio Code](https://code.visualstudio.com)에서는 [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)에서 확장기능을 설치하면 됩니다.
왼쪽 메뉴 패널에서 Extensions 아이콘을 클릭하거나 VS Quick Open(맥에서는 ⌘+P, 윈도우에서는 CTRL+P)을 눌러서 마켓을 열고 "? ext"를 입력하면 됩니다.
그리고 마켓에서 Angular Language Service 확장 기능을 찾아서 **Install** 버튼을 누르면 설치됩니다.

Visual Studio Code에 적용되는 Angular 언어 지원 서비스는 Angular 팀이 직접 관리합니다.


### Visual Studio

<!--
In [Visual Studio](https://visualstudio.microsoft.com), install the extension from the [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.AngularLanguageService).
Open the marketplace from the editor selecting Extensions on the top menu pane, and then selecting Manage Extensions.
In the marketplace, search for Angular Language Service extension, and click the **Install** button.

The Visual Studio integration with the Angular language service is maintained and distributed by Microsoft with help from the Angular team.
Check out the project [here](https://github.com/microsoft/vs-ng-language-service).
-->
[Visual Studio](https://visualstudio.microsoft.com)에서는 [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.AngularLanguageService)에서 확장 프로그램을 설치하면 됩니다.
위쪽 메뉴 패널에서 Extensions를 눌러서 마켓에 진입하고 Manage Extensions를 선택해 보세요.
이 마켓에서 Angular Language Service 확장 프로그램을 선택하고 **Install** 버튼을 클릭하면 됩니다.

Visual Studion용 Angular 언어지원 서비스는 Angular 팀과 긴밀하게 협력하는 Microsoft 팀이 직접 관리합니다.
프로젝트에 대해 자세하게 알아보려면 [여기](https://github.com/microsoft/vs-ng-language-service)를 참고하세요.


### WebStorm

<!--
In [WebStorm](https://www.jetbrains.com/webstorm), enable the plugin [Angular and AngularJS](https://plugins.jetbrains.com/plugin/6971-angular-and-angularjs).

Since WebStorm 2019.1, the `@angular/language-service` is not required anymore and should be removed from your `package.json`.
-->
[WebStorm](https://www.jetbrains.com/webstorm)은 [Angular and AngularJS](https://plugins.jetbrains.com/plugin/6971-angular-and-angularjs) 플러그인을 지원합니다.

WebStorm 2019.1 버전부터는 `@angular/language-service`를 사용하지 않기 때문에 `package.json`에서 이 패키지를 제거해도 됩니다.


### Sublime Text

<!--
In [Sublime Text](https://www.sublimetext.com), the Language Service supports only in-line templates when installed as a plug-in.
You need a custom Sublime plug-in \(or modifications to the current plug-in\) for completions in HTML files.

To use the Language Service for in-line templates, you must first add an extension to allow TypeScript, then install the Angular Language Service plug-in.
Starting with TypeScript 2.3, TypeScript has a plug-in model that the language service can use.

1.  Install the latest version of TypeScript in a local `node_modules` directory:

    <code-example format="shell" language="shell">

    npm install --save-dev typescript

    </code-example>

1.  Install the Angular Language Service package in the same location:

    <code-example format="shell" language="shell">

    npm install --save-dev &commat;angular/language-service

    </code-example>

1.  Once the package is installed,  add the following to the `"compilerOptions"` section of your project's `tsconfig.json`.

    <code-example header="tsconfig.json" language="json">

    "plugins": [
        {"name": "&commat;angular/language-service"}
    ]

    </code-example>

1. In your editor's user preferences \(`Cmd+,` or `Ctrl+,`\), add the following:

    <code-example header="Sublime Text user preferences" language="json">

    "typescript-tsdk": "&lt;path to your folder&gt;/node_modules/typescript/lib"

    </code-example>

This lets the Angular Language Service provide diagnostics and completions in `.ts` files.
-->
[Sublime Text](https://www.sublimetext.com)에서는 플러그인을 설치해도 인라인 템플릿에서만 언어지원 서비스가 제공됩니다.
별도 HTML 파일에서도 언어지원 서비스를 활용하려면 커스텀 Sublime 플러그인을 구현해야 합니다.

인라인 템플릿에서 언어지원 서비스를 사용하려면 먼저 TypeScript를 활성화하는 확장 기능부터 설치하고 Angular 언어지원 서비스를 추가로 설치해야 합니다.
Angular 언어지원 서비스는 TypeScript 플러그인을 활용하는데, TypeScript 플러그인 2.3 버전부터 지원합니다.

1.  로컬 `node_modules` 폴더에 최신 버전 TypeScript 패키지를 설치합니다:

    <code-example format="shell" language="shell">

    npm install --save-dev typescript

    </code-example>

1.  같은 폴더에 Angular 언어지원 서비스 패키지를 설치합니다:

    <code-example format="shell" language="shell">

    npm install --save-dev &commat;angular/language-service

    </code-example>

1.  패키지를 설치하고 나면 프로젝트 `tsconfig.json` 파일에 있는 `"compilerOptions"` 섹션에 다음 내용을 추가합니다.

    <code-example header="tsconfig.json" language="json">

    "plugins": [
        {"name": "&commat;angular/language-service"}
    ]

    </code-example>

1. 에디터에서 사용자 환경설정(`Cmd+,` or `Ctrl+,`)을 열고 다음 내용을 추가합니다:

    <code-example header="Sublime Text user preferences" language="json">

    "typescript-tsdk": "&lt;path to your folder&gt;/node_modules/typescript/lib"

    </code-example>

이제 Angular 언어지원 서비스가 동작하면서 `.ts` 파일을 대상으로 코드 진단 기능과 자동완성 기능이 동작합니다.


### Eclipse IDE

<!--
Either directly install the "Eclipse IDE for Web and JavaScript developers" package which comes with the Angular Language Server included, or from other Eclipse IDE packages, use Help &gt; Eclipse Marketplace to find and install [Eclipse Wild Web Developer](https://marketplace.eclipse.org/content/wild-web-developer-html-css-javascript-typescript-nodejs-angular-json-yaml-kubernetes-xml).
-->
"Eclipse IDE for Web and JavaScript developers" 패키지를 설치하면 Angular 언어지원 서버가 이미 포함되어 있습니다.
아니면 Eclipse 마켓에서 [Eclipse Wild Web Developer](https://marketplace.eclipse.org/content/wild-web-developer-html-css-javascript-typescript-nodejs-angular-json-yaml-kubernetes-xml)를 찾아 설치하세요.

### Neovim

<!--
1. [Setup coc.nvim](https://github.com/neoclide/coc.nvim)

2. [Configure the Angular Language Service](https://github.com/iamcco/coc-angular/issues/70#issuecomment-1616340751)
-->
1. [coc.nvim](https://github.com/neoclide/coc.nvim) 파일을 수정합니다.

2. [Angular Language Service](https://github.com/iamcco/coc-angular/issues/70#issuecomment-1616340751)를다음과 같이 설정합니다.

```
{
  "languageserver": {
    "angular": {
      "command": "ngserver",
      "args": [
        "--stdio",
        "--tsProbeLocations",
        "/usr/local/lib/node_modules/typescript/lib",
        "--ngProbeLocations",
        "/usr/local/lib/node_modules/@angular/language-server/bin"
      ],
      "filetypes": ["ts", "typescript", "html"],
      "trace.server.verbosity": "verbose"
    }
  }
}
```


<!--
## How the Language Service works
-->
## 언어지원 서비스가 동작하는 방식

<!--
When you use an editor with a language service, the editor starts a separate language-service process and communicates with it through an [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call), using the [Language Server Protocol](https://microsoft.github.io/language-server-protocol).
When you type into the editor, the editor sends information to the language-service process to track the state of your project.

When you trigger a completion list within a template, the editor first parses the template into an HTML [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
The Angular compiler interprets that tree to determine the context: which module the template is part of, the current scope, the component selector, and where your cursor is in the template AST.
It can then determine the symbols that could potentially be at that position.

It's a little more involved if you are in an interpolation.
If you have an interpolation of `{{data.---}}` inside a `div` and need the completion list after `data.---`, the compiler can't use the HTML AST to find the answer.
The HTML AST can only tell the compiler that there is some text with the characters "`{{data.---}}`".
That's when the template parser produces an expression AST, which resides within the template AST.
The Angular Language Services then looks at `data.---` within its context, asks the TypeScript Language Service what the members of `data` are, and returns the list of possibilities.
-->
에디터에 언어지원 서비스를 적용하면 별도 프로세스로 언어지원 서비스가 활성화되면서 [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)과 [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call) 통신을 시작합니다.
이제 에디터에서 코드를 타이핑하면 에디터가 해당 정보를 언어지원 프로세스로 보내면서 프로젝트의 상태를 추적합니다.

템플릿에서 코드 자동완성 목록을 요청하면 에디터가 해당 템플릿을 파싱해서 HTML [추상 문법 트리(abstract syntax tree, AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)로 변환합니다.
그러면 Angular 컴파일러가 이 트리를 분석해서 템플릿이 어떤 모듈에서 사용되었는지, 현재 스코프는 어떤 위치인지, 컴포넌트 셀렉터가 무엇이며 템플릿 AST 중에서 커서의 위치가 어디인지 분석합니다.
그리고나서 해당 위치에 어떤 심볼을 사용할 수 있는지 판단합니다.

문자열 바인딩(interpolation)의 경우에는 조금 더 복잡합니다.
`<div>` 엘리먼트 안에서 `{{data.---}}`와 같이 문자열 바인딩 문법을 사용하면서 `data.---` 부분에 자동완성 기능을 요청했다고 합시다.
하지만 Angular 컴파일러는 HTML AST만 분석해서는 원하는 답을 찾을 수 없습니다.
이 경우에는 "`{{data.---}}`" 부분에 어떤 텍스트가 들어간다는 것만 알 수 있습니다.
그래서 이 때 템플릿 파서가 표현식 AST를 구성하면서 템플릿 AST의 정보를 조금 더 확장합니다.
두 AST가 결합된 컨텍스트에서 Angular 언어지원 서비스가 `data.---`에 적합한 목록을  TypeScript 언어지원 서비스에 요청하면 `data`의 멤버에 해당하는 프로퍼티나 메소드 목록을 제공합니다.


<!--
## More information
-->
## 참고

<!--
*   For more in-depth information on the implementation, see the [Angular Language Service API](https://github.com/angular/angular/blob/main/packages/language-service/src/types.ts)
*   For more on the design considerations and intentions, see [design documentation here](https://github.com/angular/vscode-ng-language-service/wiki/Design)
*   See also [Chuck Jazdzewski's presentation](https://www.youtube.com/watch?v=ez3R0Gi4z5A&t=368s) on the Angular Language Service from [ng-conf](https://www.ng-conf.org) 2017
-->
*   [언어지원 서비스 API](https://github.com/angular/angular/blob/main/packages/language-service/src/types.ts)를 직접 구현하는 방법에 대해 알아 보세요.
*   언어지원 서비스가 어떤 철학으로 설계되었는지 확인하려면 [설계 문서](https://github.com/angular/vscode-ng-language-service/wiki/Design)를 참고하세요.
*   [ng-conf](https://www.ng-conf.org/) 2017에서 [Chuck Jazdzewski가 발표한 영상](https://www.youtube.com/watch?v=ez3R0Gi4z5A&t=368s)을 찾아보는 것도 도움이 될 것입니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28