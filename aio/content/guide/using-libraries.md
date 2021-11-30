<!--
# Usage of Angular libraries published to npm
-->
# npm에 배포된 Angular 라이브러리 활용하기

<!--
When you build your Angular application, take advantage of sophisticated first-party libraries, as well as rich ecosystem of third-party libraries.
[Angular Material][AngularMaterialMain] is an example of a sophisticated first-party library.
For links to the most popular libraries, see [Angular Resources][AioResources].
-->
Angular 애플리케이션을 만들 때는 방대한 Angular 생태계에 존재하는 서드 파티 라이브러리를 활용하는 것도 좋지만 Angular 팀이 직접 제공하는 퍼스트 파티 라이브러리를 활용하는 것도 좋습니다.
[Angular Material][AngularMaterialMain]이 대표적인 퍼스트 파티 라이브러리입니다.
활용할 수 있는 리소스 목록을 확인하려면 [Angular Resources][AioResources] 문서를 참고하세요.


<!--
## Install libraries
-->
## 라이브러리 설치하기

<!--
Libraries are published as [npm packages][AioGuideNpmPackages], usually together with schematics that integrate them with the Angular CLI.
To integrate reusable library code into an application, you need to install the package and import the provided functionality in the location you use it.
For most published Angular libraries, use the `ng add <lib_name>` Angular CLI command.

The `ng add` Angular CLI command uses a package manager to install the library package and invokes schematics that are included in the package to other scaffolding within the project code.
Examples of package managers include [npm][NpmjsMain] or [yarn][YarnpkgMain].
Additional scaffolding within the project code includes import statements, fonts, and themes.

A published library typically provides a `README` file or other documentation on how to add that library to your application.
For an example, see the [Angular Material][AngularMaterialMain] documentation.
-->
라이브러리는 [npm 패키지][AioGuideNpmPackages]로 배포되며, Angular CLI를 확장하는 스키매틱을 포함하는 경우도 있습니다.
애플리케이션에 라이브러리 기능을 추가하려면 먼저 이 라이브러리 패키지를 설치하고 앱에 로드해야 합니다.
이 때 Angular 라이브러리 대부분은 Angular CLI를 사용해서 `ng add <라이브러리_이름>` 명령을 실행하면 됩니다.

`ng add` 명령을 실행하면 Angular CLI가 패키지 매니저로 라이브러리 패키지를 설치하고, 스키매틱을 실행해서 프로젝트 구조를 확장합니다.
이 때 패키지 매니저는 [npm][NpmjsMain]이나 [yarn][YarnpkgMain]을 사용할 수 있습니다.
프로젝트 구조가 확장되는 방식에는 `import` 구문을 조정하거나 폰트, 테마를 추가하는 방식이 있습니다.

일반적으로 라이브러리는 활용할 수 있는 방법을 README 파일과 같은 형태의 문서로 제공합니다.
[Angular Material][AngularMaterialMain]를 확인해 보세요.


<!--
### Library typings
-->
### 라이브러리의 타입 정의

<!--
Typicaly, library packages include typings in `.d.ts` files; see examples in `node_modules/@angular/material`.
If the package of your library does not include typings and your IDE complains, you might need to install the `@types/<lib_name>` package with the library.

For example, suppose you have a library named `d3`:
-->
일반적으로 라이브러리 패키지에는 타입을 정의하는 `.d.ts` 파일이 존재합니다.
`node_modules/@angular/material` 패키지에도 이 파일이 존재합니다.
만약 설치한 라이브러리 패키지에 타입 정의 파일이 없어서 IDE에서 타입 관련 기능이 제대로 동작하지 않는다면 `@types/<라이브러리_이름>` 패키지가 별도로 존재하는지 찾아보는 것이 좋습니다.

`d3` 라이브러리는 이 방식으로 타입 정의 파일을 추가할 수 있습니다:

<code-example format="shell" language="shell">

npm install d3 --save
npm install @types/d3 --save-dev

</code-example>

<!--
Types defined in a `@types/` package for a library installed into the workspace are automatically added to the TypeScript configuration for the project that uses that library.
TypeScript looks for types in the `node_modules/@types` directory by default, so you do not have to add each type package individually.

If a library does not have typings available at `@types/`, you may use it by manually adding typings for it.
To do this:

1.  Create a `typings.d.ts` file in your `src/` directory.
    This file is automatically included as global type definition.

1.  Add the following code in `src/typings.d.ts`:

    <code-example format="typescript" language="typescript">

    declare module 'host' {
      export interface Host {
        protocol?: string;
        hostname?: string;
        pathname?: string;
      }
      export function parse(url: string, queryString?: string): Host;
    }

    </code-example>

1.  In the component or file that uses the library, add the following code:

    <code-example format="typescript" language="typescript">

    import * as host from 'host';
    const parsedUrl = host.parse('https://angular.io');
    console.log(parsedUrl.hostname);

    </code-example>

Define more typings as needed.
-->
`@types/` 패키지로 제공되는 타입 정의 파일들을 워크스페이스에 설치하면 프로젝트 TypeScript 설정에 따라 자동으로 추가됩니다.
타입 정의 패키지가 설치되는 기본 위치는 `node_modules/@types` 입니다.
이 위치에 설치된 패키지는 일일이 추가할 필요가 없습니다.

라이브러리가 타입 정의 파일을 제공하지 않고 `@types/` 패키지도 존재하지 않는다면 직접 타입 정의 파일을 추가하는 방법도 있습니다.
이렇게 하면 됩니다:

1.  `src/` 디렉토리에 `typings.d.ts` 파일을 생성합니다.
    이 파일은 전역 타입 정의 파일로 자동 로드됩니다.

1.  `src/typings.d.ts` 파일을 다음과 같이 작성합니다:

    <code-example format="typescript" language="typescript">

    declare module 'host' {
      export interface Host {
        protocol?: string;
        hostname?: string;
        pathname?: string;
      }
      export function parse(url: string, queryString?: string): Host;
    }

    </code-example>

1.  라이브러리를 사용하는 파일에 이런 코드를 추가합니다:

    <code-example format="typescript" language="typescript">

    import * as host from 'host';
    const parsedUrl = host.parse('https://angular.io');
    console.log(parsedUrl.hostname);

    </code-example>

타입은 원하는 대로 얼마든지 정의할 수 있습니다.


<!--
## Updating libraries
-->
## 라이브러리 업데이트하기

<!--
A library is able to be updated by the publisher, and also has individual dependencies which need to be kept current.
To check for updates to your installed libraries, use the [`ng update`][AioCliUpdate] Angular CLI command.

Use `ng update <lib_name>` Angular CLI command to update individual library versions.
The Angular CLI checks the latest published release of the library, and if the latest version is newer than your installed version, downloads it and updates your `package.json` to match the latest version.

When you update Angular to a new version, you need to make sure that any libraries you are using are current.
If libraries have interdependencies, you might have to update them in a particular order.
See the [Angular Update Guide][AngularUpdateMain] for help.
-->
라이브러리는 제작자가 업데이트할 수도 있지만 라이브러리와 연결된 다른 라이브러리가 업데이트될 수도 있습니다.
프로젝트에 설치된 라이브러리를 업데이트해야 하는지 확인하려면 [`ng update` 명령][AioCliUpdate]을 사용하면 됩니다.

그리고 라이브러리를 하나씩 업데이트 하려면 `ng update <라이브러리_이름>` 명령을 실행하면 됩니다.
이 명령을 실행하면 Angular CLI가 라이브러리 최신 버전을 확인하고 로컬에 설치하며 해당 버전으로 `package.json` 파일을 갱신합니다.

Angular 자체를 업데이트하려면 다른 라이브러리들이 최신버전인지 먼저 확인해야 합니다.
그리고 라이브러리 중에 서로 연관된 것이 있다면 적절한 순서로 업데이트 해야할 수도 있습니다.
자세한 내용은 [Angular 업데이트 가이드][AngularUpdateMain] 사이트를 참고하세요.


<!--
## Adding a library to the runtime global scope
-->
## 전역 범위에 라이브러리 추가하기

<!--
If a legacy JavaScript library is not imported into an application, you may add it to the runtime global scope and load it as if it was added in a script tag.
Configure the Angular CLI to do this at build time using the `scripts` and `styles` options of the build target in the [`angular.json`][AioGuideWorkspaceConfig] workspace build configuration file.

For example, to use the [Bootstrap 4][GetbootstrapDocs40GettingStartedIntroduction] library
-->
오래된 JavaScript 라이브러리들은 애플리케이션 코드에서 로드하지 않고 `<script>` 태그로 로드해서 전역 범위에 적용하는 경우가 있습니다.
이런 라이브러리들은 [Angular CLI 환경 설정 파일][AioGuideWorkspaceConfig] `angular.json`에서 로드합니다.

[Bootstrap 4][GetbootstrapDocs40GettingStartedIntroduction]의 경우를 봅시다.


<!--
1.  Install the library and the associated dependencies using the npm package manager:

    <code-example format="shell" language="shell">

    npm install jquery --save
    npm install popper.js --save
    npm install bootstrap --save

    </code-example>
-->
1.  npm 패키지 매니저로 라이브러리와 의존 패키지들을 설치합니다:

    <code-example format="shell" language="shell">

    npm install jquery --save
    npm install popper.js --save
    npm install bootstrap --save

    </code-example>

<!--
1.  In the `angular.json` configuration file, add the associated script files to the `scripts` array:

    <code-example format="json" language="json">

    "scripts": [
      "node_modules/jquery/dist/jquery.slim.js",
      "node_modules/popper.js/dist/umd/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.js"
    ],

    </code-example>
-->
1.  환경설정파일 `angular.json` 파일 `scripts` 배열에 로드할 스크립트 파일들을 지정합니다:

    <code-example format="json" language="json">

    "scripts": [
      "node_modules/jquery/dist/jquery.slim.js",
      "node_modules/popper.js/dist/umd/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.js"
    ],

    </code-example>

<!--
1.  Add the `bootstrap.css` CSS file to the `styles` array:

    <code-example format="css" language="css">

    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "src/styles.css"
    ],

    </code-example>
-->
1.  `styles` 배열에 `bootstrap.css` CSS 파일을 추가합니다:

    <code-example format="css" language="css">

    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "src/styles.css"
    ],

    </code-example>

<!--
1.  Run or restart the `ng serve` Angular CLI command to see Bootstrap 4 work in your application.
-->
1.  Angular CLI `ng serve` 명령으로 애플리케이션을 실행하면 Bootstrap 4가 적용된 것을 확인할 수 있습니다.


{@a using-runtime-global-libraries-inside-your-app}
<!--
### Using runtime-global libraries inside your app
-->
### 앱에서 전역 컨텍스트에 있는 라이브러리 사용하기

<!--
After you import a library using the "scripts" array, do **not** import it using an import statement in your TypeScript code.
The following code snippet is an example import statement.

<code-example format="typscript" language="typescript">

import * as $ from 'jquery';

</code-example>

If you inport it using import statements, you have two different copies of the library: one imported as a global library, and one imported as a module.
This is especially bad for libraries with plugins, like JQuery, because each copy includes different plugins.

Instead, run the `npm install @types/jquery` Angular CLI command to download typings for your library and then follow the library installation steps.
This gives you access to the global variables exposed by that library.
-->
"scripts" 배열로 로드하는 라이브러리는 TypeScript 코드에 `import` 구문으로 불러오면 **안됩니다**.
이런 코드가 있다고 합시다.

<code-example format="typscript" language="typescript">

import * as $ from 'jquery';

</code-example>

이런 코드를 작성하면 라이브러리를 전역 범위에 한 번, 모듈 범위에 한 번, 이렇게 두 벌 로드하는 것이 됩니다.
jQuery를 이렇게 사용하면 관련 플러그인도 모두 두 벌 로드하게 되어 좋지 않습니다.

TypeScript 코드에서 jQuery를 사용해야 한다면 `npm install @types/jquery` 명령을 실행해서 타입 정의만 받아서 사용하는 것이 좋습니다.
이렇게 사용하면 전역 범위에 로드된 라이브러리를 그대로 사용할 수 있습니다.


<!--
### Defining typings for runtime-global libraries
-->
### 전역 범위에 적용된 라이브러리의 타입 정의하기

<!--
If the global library you need to use does not have global typings, you can declare them manually as `any` in `src/typings.d.ts`.

For example:
-->
전역 컨텍스트에 사용하지만 타입 정의 파일이 없는 라이브러리라면 `src/typings.d.ts` 파일에서 강제로 `any` 타입을 지정할 수 있습니다.

<code-example format="typescript" language="typescript">

declare var libraryName: any;

</code-example>

<!--
Some scripts extend other libraries; for instance with JQuery plugins:
-->
플러그인 형태로 확장할 수 있는 라이브러리들이 있습니다. JQuery의 경우에는 이렇게 사용하면 됩니다:

<code-example format="typescript" language="typescript">

$('.test').myPlugin();

</code-example>

<!--
In this case, the installed `@types/jquery` does not include `myPlugin`, so you need to add an interface in `src/typings.d.ts`.
For example:
-->
이런 경우에 `@types/jquery`에는 `myPlugin`이라는 것이 존재하기 때문에 `src/typings.d.ts` 파일을 다음과 같이 수정해야 합니다:

<code-example format="typescript" language="typescript">

interface JQuery {
  myPlugin(options?: any): any;
}

</code-example>

<!--
If you do not add the interface for the script-defined extension, your IDE shows an error:
-->
라이브러리의 타입을 제대로 지정하지 않으면 IDE에서 다음과 같은 에러가 발생할 수 있습니다:

<code-example format="none" language="none">

[TS][Error] Property 'myPlugin' does not exist on type 'JQuery'

</code-example>

<!-- links -->

[AioCliUpdate]: cli/update "ng update | CLI |Angular"

[AioGuideNpmPackages]: guide/npm-packages "Workspace npm dependencies | Angular"
[AioGuideWorkspaceConfig]: guide/workspace-config "Angular workspace configuration | Angular"

[AioResources]: resources "Explore Angular Resources | Angular"

<!-- external links -->

[AngularMaterialMain]: https://material.angular.io "Angular Material | Angular"

[AngularUpdateMain]: https://update.angular.io "Angular Update Guide | Angular"

[GetbootstrapDocs40GettingStartedIntroduction]: https://getbootstrap.com/docs/4.0/getting-started/introduction "Introduction | Bootstrap"

[NpmjsMain]: https://www.npmjs.com "npm"

[YarnpkgMain]: https://yarnpkg.com " Yarn"

<!-- end links -->

@reviewed 2021-11-01
