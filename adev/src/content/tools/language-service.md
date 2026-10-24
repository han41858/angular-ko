<!--
# Angular Language Service
-->

<a id="angular-language-service"></a>

# Angular 언어 지원 서비스

<!--
The Angular Language Service provides code editors with a way to get completions, errors, hints, and navigation inside Angular templates.
It works with external templates in separate HTML files, and also with in-line templates.
-->

Angular 언어 지원 서비스는 코드 편집기에서 Angular 템플릿의 자동 완성, 오류 표시, 힌트, 코드 탐색 기능을 사용할 수 있도록 합니다.
별도의 HTML 파일에 작성한 외부 템플릿과 인라인 템플릿 모두에서 동작합니다.

<!--
## Configuring compiler options for the Angular Language Service
-->

<a id="configuring-compiler-options-for-the-angular-language-service"></a>

## Angular 언어 지원 서비스용 컴파일러 옵션 설정하기

<!--
To enable the latest Language Service features, set the `strictTemplates` option in `tsconfig.json` by setting `strictTemplates` to `true`, as shown in the following example:

```json

"angularCompilerOptions": {
  "strictTemplates": true
}

```

For more information, see the [Angular compiler options](reference/configs/angular-compiler-options) guide.
-->

최신 언어 지원 서비스 기능을 활성화하려면 다음 예제처럼 `tsconfig.json`의 `strictTemplates` 옵션을 `true`로 설정하세요:

```json

"angularCompilerOptions": {
  "strictTemplates": true
}

```

자세한 내용은 [Angular 컴파일러 옵션](reference/configs/angular-compiler-options) 가이드를 참고하세요.

<!--
## Features
-->

<a id="features"></a>

## 기능

<!--
Your editor autodetects that you are opening an Angular file.
It then uses the Angular Language Service to read your `tsconfig.json` file, find all the templates you have in your application, and then provide language services for any templates that you open.

Language services include:

- Completions lists
- AOT Diagnostic messages
- Quick info
- Go to definition
-->

편집기는 Angular 파일을 열었다는 것을 자동으로 감지합니다.
이후 Angular 언어 지원 서비스를 통해 `tsconfig.json` 파일을 읽고 애플리케이션의 모든 템플릿을 찾은 다음, 열어 놓은 템플릿에 언어 지원 서비스를 제공합니다.

언어 지원 서비스에는 다음 기능이 포함됩니다:

- 자동 완성 목록
- AOT 진단 메시지
- 빠른 정보 표시
- 정의로 이동

<!--
### Autocompletion
-->

<a id="autocompletion"></a>

### 자동 완성

<!--
Autocompletion can speed up your development time by providing you with contextual possibilities and hints as you type.
This example shows autocomplete in an interpolation.
As you type it out, you can press tab to complete.

<img alt="autocompletion" src="assets/images/guide/language-service/language-completion.gif">

There are also completions within elements.
Any elements you have as a component selector will show up in the completion list.
-->

자동 완성은 입력하는 동안 문맥에 맞는 후보와 힌트를 제공해서 개발 시간을 줄여 줍니다.
다음 예제는 문자열 바인딩에서 자동 완성을 사용하는 모습입니다.
입력 중에 Tab 키를 누르면 자동 완성할 수 있습니다.

<img alt="자동 완성" src="assets/images/guide/language-service/language-completion.gif">

엘리먼트 안에서도 자동 완성할 수 있습니다.
컴포넌트 셀렉터로 사용하는 엘리먼트는 자동 완성 목록에 표시됩니다.

<!--
### Error checking
-->

<a id="error-checking"></a>

### 오류 검사

<!--
The Angular Language Service can forewarn you of mistakes in your code.
In this example, Angular doesn't know what `orders` is or where it comes from.

<img alt="error checking" src="assets/images/guide/language-service/language-error.gif">
-->

Angular 언어 지원 서비스는 코드의 실수를 미리 알려줄 수 있습니다.
다음 예제에서 Angular는 `orders`가 무엇인지, 어디에서 왔는지 알 수 없습니다.

<img alt="오류 검사" src="assets/images/guide/language-service/language-error.gif">

<!--
### Quick info and navigation
-->

<a id="quick-info-and-navigation"></a>

### 빠른 정보 표시와 코드 탐색

<!--
The quick-info feature lets you hover to see where components, directives, and modules come from.
You can then click "Go to definition" or press F12 to go directly to the definition.

<img alt="navigation" src="assets/images/guide/language-service/language-navigation.gif">
-->

빠른 정보 표시 기능을 사용하면 마우스를 올려 컴포넌트, 디렉티브, 모듈이 어디에서 왔는지 확인할 수 있습니다.
그런 다음 "Go to definition"을 클릭하거나 F12를 누르면 해당 정의로 바로 이동합니다.

<img alt="코드 탐색" src="assets/images/guide/language-service/language-navigation.gif">

<!--
## Angular Language Service in your editor
-->

<a id="angular-language-service-in-your-editor"></a>

## 편집기에서 Angular 언어 지원 서비스 사용하기

<!--
Angular Language Service is currently available as an extension for [Visual Studio Code](https://code.visualstudio.com), [WebStorm](https://www.jetbrains.com/webstorm), [Sublime Text](https://www.sublimetext.com), [Zed](https://zed.dev), [Neovim](https://neovim.io), and [Eclipse IDE](https://www.eclipse.org/eclipseide).

NOTE: The Angular team maintains and distributes the Visual Studio Code extension, which is supported in Visual Studio Code and VS Code-based editors such as Cursor and Antigravity. Integrations for other editors are maintained by their respective editor vendors or by the community. Report issues specific to those integrations to their maintainers.
-->

Angular 언어 지원 서비스는 현재 [Visual Studio Code](https://code.visualstudio.com), [WebStorm](https://www.jetbrains.com/webstorm), [Sublime Text](https://www.sublimetext.com), [Zed](https://zed.dev), [Neovim](https://neovim.io), [Eclipse IDE](https://www.eclipse.org/eclipseide)의 확장 기능으로 제공됩니다.

NOTE: Angular 팀은 Visual Studio Code 확장 기능을 유지보수하고 배포하며, Visual Studio Code와 Cursor, Antigravity 같은 VS Code 기반 편집기를 지원합니다. 다른 편집기의 통합 기능은 해당 편집기 공급업체나 커뮤니티가 유지보수합니다. 해당 통합 기능에만 발생하는 문제는 각 유지보수 담당자에게 보고하세요.

<!--
### Visual Studio Code
-->


### Visual Studio Code

<!--
In [Visual Studio Code](https://code.visualstudio.com), install the extension from the [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
Open the marketplace from the editor using the Extensions icon on the left menu pane, or use VS Quick Open \(⌘+P on Mac, CTRL+P on Windows\) and type "? ext".
In the marketplace, search for Angular Language Service extension, and click the **Install** button.

The Visual Studio Code integration with the Angular language service is maintained and distributed by the Angular team.
-->

[Visual Studio Code](https://code.visualstudio.com)에서는 [확장 기능 마켓플레이스](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)에서 확장 기능을 설치하세요.
편집기 왼쪽 메뉴 패널의 Extensions 아이콘으로 마켓플레이스를 열거나, VS Quick Open \(Mac에서는 ⌘+P, Windows에서는 CTRL+P\)을 열고 "? ext"를 입력하세요.
마켓플레이스에서 Angular 언어 지원 서비스 확장 기능을 검색한 뒤 **Install** 버튼을 클릭하세요.

Visual Studio Code와 Angular 언어 지원 서비스의 통합 기능은 Angular 팀이 유지보수하고 배포합니다.

<!--
### Visual Studio
-->


### Visual Studio

<!--
In [Visual Studio](https://visualstudio.microsoft.com), install the extension from the [Extensions: Marketplace](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.AngularLanguageService).
Open the marketplace from the editor selecting Extensions on the top menu pane, and then selecting Manage Extensions.
In the marketplace, search for Angular Language Service extension, and click the **Install** button.

The Visual Studio integration with the Angular language service is maintained and distributed by Microsoft with help from the Angular team.
Check out the project [here](https://github.com/microsoft/vs-ng-language-service).
-->

[Visual Studio](https://visualstudio.microsoft.com)에서는 [확장 기능 마켓플레이스](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.AngularLanguageService)에서 확장 기능을 설치하세요.
편집기 상단 메뉴에서 Extensions를 선택한 뒤 Manage Extensions를 선택하면 마켓플레이스가 열립니다.
마켓플레이스에서 Angular 언어 지원 서비스 확장 기능을 검색한 뒤 **Install** 버튼을 클릭하세요.

Visual Studio와 Angular 언어 지원 서비스의 통합 기능은 Angular 팀의 도움을 받아 Microsoft가 유지보수하고 배포합니다.
[여기](https://github.com/microsoft/vs-ng-language-service)에서 프로젝트를 확인할 수 있습니다.

<!--
### WebStorm
-->


### WebStorm

<!--
In [WebStorm](https://www.jetbrains.com/webstorm), enable the plugin [Angular and AngularJS](https://plugins.jetbrains.com/plugin/6971-angular-and-angularjs).

Since WebStorm 2019.1, the `@angular/language-service` is not required anymore and should be removed from your `package.json`.
-->

[WebStorm](https://www.jetbrains.com/webstorm)에서는 [Angular and AngularJS](https://plugins.jetbrains.com/plugin/6971-angular-and-angularjs) 플러그인을 활성화하세요.

WebStorm 2019.1부터는 `@angular/language-service`가 더 이상 필요하지 않으므로 `package.json`에서 제거해야 합니다.

<!--
### Sublime Text
-->


### Sublime Text

<!--
In [Sublime Text](https://www.sublimetext.com), the Language Service supports only in-line templates when installed as a plug-in.
You need a custom Sublime plug-in \(or modifications to the current plug-in\) for completions in HTML files.

To use the Language Service for in-line templates, you must first add an extension to allow TypeScript, then install the Angular Language Service plug-in.
Starting with TypeScript 2.3, TypeScript has a plug-in model that the language service can use.

1. Install the latest version of TypeScript in a local `node_modules` directory:

   ```shell
   npm install --save-dev typescript
   ```

1. Install the Angular Language Service package in the same location:

   ```shell

   npm install --save-dev @angular/language-service

   ```

1. Once the package is installed, add the following to the `"compilerOptions"` section of your project's `tsconfig.json`.

   ```json {header:"tsconfig.json"}
   "plugins": [
     {"name": "@angular/language-service"}
   ]
   ```

1. In your editor's user preferences \(`Cmd+,` or `Ctrl+,`\), add the following:

   ```json {header:"Sublime Text user preferences"}

   "typescript-tsdk": "<path to your folder>/node_modules/typescript/lib"

   ```

This lets the Angular Language Service provide diagnostics and completions in `.ts` files.
-->

[Sublime Text](https://www.sublimetext.com)에 플러그인으로 설치한 언어 지원 서비스는 인라인 템플릿만 지원합니다.
HTML 파일에서 자동 완성을 사용하려면 커스텀 Sublime 플러그인이 필요합니다\(또는 현재 플러그인을 수정해야 합니다\).

인라인 템플릿에서 언어 지원 서비스를 사용하려면 먼저 TypeScript 지원 확장 기능을 추가한 다음 Angular 언어 지원 서비스 플러그인을 설치해야 합니다.
TypeScript 2.3부터는 언어 서비스에서 사용할 수 있는 플러그인 모델을 제공합니다.

1. 로컬 `node_modules` 디렉터리에 최신 TypeScript를 설치하세요:

   ```shell
   npm install --save-dev typescript
   ```

1. 같은 위치에 Angular 언어 지원 서비스 패키지를 설치하세요:

   ```shell

   npm install --save-dev @angular/language-service

   ```

1. 패키지를 설치한 뒤 프로젝트 `tsconfig.json`의 `"compilerOptions"` 섹션에 다음 내용을 추가하세요.

   ```json {header:"tsconfig.json"}
   "plugins": [
     {"name": "@angular/language-service"}
   ]
   ```

1. 편집기의 사용자 환경설정\(`Cmd+,` 또는 `Ctrl+,`\)에 다음 내용을 추가하세요:

   ```json {header:"Sublime Text 사용자 설정"}

   "typescript-tsdk": "<path to your folder>/node_modules/typescript/lib"

   ```

이렇게 하면 Angular 언어 지원 서비스가 `.ts` 파일에서 진단과 자동 완성 기능을 제공합니다.

<!--
### Eclipse IDE
-->


### Eclipse IDE

<!--
Either directly install the "Eclipse IDE for Web and JavaScript developers" package which comes with the Angular Language Server included, or from other Eclipse IDE packages, use Help > Eclipse Marketplace to find and install [Eclipse Wild Web Developer](https://marketplace.eclipse.org/content/wild-web-developer-html-css-javascript-typescript-nodejs-angular-json-yaml-kubernetes-xml).
-->

Angular Language Server가 포함된 "Eclipse IDE for Web and JavaScript developers" 패키지를 바로 설치할 수 있습니다.
다른 Eclipse IDE 패키지를 사용한다면 Help > Eclipse Marketplace에서 [Eclipse Wild Web Developer](https://marketplace.eclipse.org/content/wild-web-developer-html-css-javascript-typescript-nodejs-angular-json-yaml-kubernetes-xml)를 찾아 설치하세요.

<!--
### Neovim
-->


### Neovim

<!--
#### Conquer of Completion with Node.js
-->

<a id="conquer-of-completion-with-nodejs"></a>

#### Node.js 기반 Conquer of Completion

<!--
The Angular Language Service uses the tsserver, which doesn't follow the LSP specifications exactly. Therefore if you are using neovim or vim with JavaScript or TypeScript or Angular you may find that [Conquer of Completion](https://github.com/neoclide/coc.nvim) (COC) has the fullest implementation of the Angular Language Service and the tsserver. This is because COC ports the VSCode implementation of the tsserver which accommodates the tsserver's implementation.

1. [Setup coc.nvim](https://github.com/neoclide/coc.nvim)

2. Configure the Angular Language Service

   Once installed run the `CocConfig` vim command line command to open the config file `coc-settings.json` and add the angular property.

   Make sure to substitute the correct paths to your global `node_modules` such that they go to directories which contain `tsserver` and the `ngserver` respectively.

   ```json {header:"CocConfig example file coc-settings.json"}
   {
     "languageserver": {
       "angular": {
         "command": "ngserver",
         "args": [
           "--stdio",
           "--tsProbeLocations",
           "/usr/local/lib/node_modules/typescript/lib/CHANGE/THIS/TO/YOUR/GLOBAL/NODE_MODULES",
           "--ngProbeLocations",
           "/usr/local/lib/node_modules/@angular/language-server/bin/CHANGE/THIS/TO/YOUR/GLOBAL/NODE_MODULES"
         ],
         "filetypes": ["ts", "typescript", "html"],
         "trace.server.verbosity": "verbose"
       }
     }
   }
   ```

HELPFUL: `/usr/local/lib/node_modules/typescript/lib` and `/usr/local/lib/node_modules/@angular/language-server/bin` above should point to the location of your global node modules, which may be different.
-->

Angular 언어 지원 서비스가 사용하는 tsserver는 LSP 명세를 정확히 따르지 않습니다.
따라서 Neovim이나 Vim에서 JavaScript, TypeScript, Angular를 사용한다면 [Conquer of Completion](https://github.com/neoclide/coc.nvim)(COC)이 Angular 언어 지원 서비스와 tsserver를 가장 충실하게 구현한 도구일 수 있습니다.
COC는 tsserver의 구현 방식에 맞춘 VSCode의 tsserver 구현을 가져왔기 때문입니다.

1. [coc.nvim 설정하기](https://github.com/neoclide/coc.nvim)

2. Angular 언어 지원 서비스 설정하기

   설치한 뒤 Vim 명령줄에서 `CocConfig`를 실행해서 `coc-settings.json` 설정 파일을 열고 angular 프로퍼티를 추가하세요.

   각각 `tsserver`와 `ngserver`가 들어 있는 디렉터리를 가리키도록 전역 `node_modules` 경로를 올바르게 지정하세요.

   ```json {header:"CocConfig 예제 파일 coc-settings.json"}
   {
     "languageserver": {
       "angular": {
         "command": "ngserver",
         "args": [
           "--stdio",
           "--tsProbeLocations",
           "/usr/local/lib/node_modules/typescript/lib/CHANGE/THIS/TO/YOUR/GLOBAL/NODE_MODULES",
           "--ngProbeLocations",
           "/usr/local/lib/node_modules/@angular/language-server/bin/CHANGE/THIS/TO/YOUR/GLOBAL/NODE_MODULES"
         ],
         "filetypes": ["ts", "typescript", "html"],
         "trace.server.verbosity": "verbose"
       }
     }
   }
   ```

도움말: 위의 `/usr/local/lib/node_modules/typescript/lib`와 `/usr/local/lib/node_modules/@angular/language-server/bin`은 전역 Node 모듈의 실제 위치를 가리켜야 하며, 환경에 따라 경로가 다를 수 있습니다.

<!--
#### Built In Neovim LSP
-->

<a id="built-in-neovim-lsp"></a>

#### Neovim 내장 LSP

<!--
Angular Language Service can be used with Neovim by using the [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) plugin.

1. [Install nvim-lspconfig](https://github.com/neovim/nvim-lspconfig?tab=readme-ov-file#install)

2. [Configure angularls for nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#angularls)
-->

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) 플러그인을 사용하면 Neovim에서 Angular 언어 지원 서비스를 사용할 수 있습니다.

1. [nvim-lspconfig 설치하기](https://github.com/neovim/nvim-lspconfig?tab=readme-ov-file#install)

2. [nvim-lspconfig용 angularls 설정하기](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#angularls)

<!--
### Zed
-->


### Zed

<!--
In [Zed](https://zed.dev), install the community-maintained extension from [Extensions: Marketplace](https://zed.dev/extensions/angular).
-->

[Zed](https://zed.dev)에서는 [확장 기능 마켓플레이스](https://zed.dev/extensions/angular)에서 커뮤니티가 유지보수하는 확장 기능을 설치하세요.

<!--
## How the Language Service works
-->

<a id="how-the-language-service-works"></a>

## 언어 지원 서비스의 동작 방식

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

언어 서비스를 지원하는 편집기를 사용하면 편집기가 별도의 언어 서비스 프로세스를 시작하고 [Language Server Protocol](https://microsoft.github.io/language-server-protocol)을 사용하는 [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)로 통신합니다.
편집기에 내용을 입력하면 편집기가 언어 서비스 프로세스에 정보를 보내 프로젝트 상태를 추적합니다.

템플릿에서 자동 완성 목록을 요청하면 편집기는 먼저 템플릿을 HTML [추상 구문 트리(AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)로 파싱합니다.
Angular 컴파일러는 이 트리를 해석해서 템플릿이 속한 모듈, 현재 스코프, 컴포넌트 셀렉터, 템플릿 AST 안에서 커서가 있는 위치 등의 문맥을 파악합니다.
그런 다음 해당 위치에 올 수 있는 심볼을 결정합니다.

문자열 바인딩 안에서는 과정이 조금 더 복잡합니다.
`div` 안에 `{{data.---}}`라는 문자열 바인딩이 있고 `data.---` 뒤의 자동 완성 목록이 필요하다면, 컴파일러는 HTML AST만으로 답을 찾을 수 없습니다.
HTML AST는 "`{{data.---}}`"라는 문자가 있는 텍스트가 존재한다는 것만 알려줄 수 있습니다.
이때 템플릿 파서는 템플릿 AST 안에 표현식 AST를 생성합니다.
Angular 언어 지원 서비스는 해당 문맥 안의 `data.---`를 확인한 다음, TypeScript 언어 지원 서비스에 `data`의 멤버를 요청하고 가능한 후보 목록을 반환합니다.

<!--
## More information
-->

<a id="more-information"></a>

## 더 알아보기

<!--
- For more in-depth information on the implementation, see the [Angular Language Service source](https://github.com/angular/angular/blob/main/packages/language-service/src)
- For more on the design considerations and intentions, see [design documentation here](https://github.com/angular/vscode-ng-language-service/wiki/Design)
-->

- 구현에 대한 자세한 내용은 [Angular 언어 지원 서비스 소스](https://github.com/angular/angular/blob/main/packages/language-service/src)를 참고하세요.
- 설계 시 고려 사항과 의도는 [설계 문서](https://github.com/angular/vscode-ng-language-service/wiki/Design)를 참고하세요.
