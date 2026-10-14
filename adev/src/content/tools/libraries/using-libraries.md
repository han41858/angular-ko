<!--
# Usage of Angular libraries published to npm
-->

<a id="usage-of-angular-libraries-published-to-npm"></a>

# npm에 배포된 Angular 라이브러리 사용하기

<!--
When you build your Angular application, take advantage of sophisticated first-party libraries, as well as a rich ecosystem of third-party libraries.
[Angular Material][AngularMaterialMain] is an example of a sophisticated first-party library.
-->

Angular 애플리케이션을 만들 때는 Angular에서 직접 제공하는 정교한 라이브러리와 풍부한 서드 파티 라이브러리 생태계를 활용하세요.
[Angular Material][AngularMaterialMain]은 Angular에서 직접 제공하는 정교한 라이브러리의 예입니다.

<!--
## Install libraries
-->

<a id="install-libraries"></a>

## 라이브러리 설치하기

<!--
Libraries are published as [npm packages][GuideNpmPackages], usually together with schematics that integrate them with the Angular CLI.
To integrate reusable library code into an application, you need to install the package and import the provided functionality in the location you use it.
For most published Angular libraries, use the `ng add <lib_name>` Angular CLI command.

The `ng add` Angular CLI command uses a package manager to install the library package and invokes schematics that are included in the package to other scaffolding within the project code.
Examples of package managers include [npm][NpmjsMain] or [yarn][YarnpkgMain].
Additional scaffolding within the project code includes import statements, fonts, and themes.

A published library typically provides a `README` file or other documentation on how to add that library to your application.
For an example, see the [Angular Material][AngularMaterialMain] documentation.
-->

라이브러리는 [npm 패키지][GuideNpmPackages]로 배포되며, 보통 Angular CLI와 통합하는 스키매틱도 함께 제공됩니다.
재사용할 수 있는 라이브러리 코드를 애플리케이션에 통합하려면 패키지를 설치하고 기능을 사용하는 위치에서 해당 기능을 불러와야 합니다.
대부분의 배포된 Angular 라이브러리는 Angular CLI의 `ng add <lib_name>` 명령으로 추가할 수 있습니다.

Angular CLI의 `ng add` 명령은 패키지 관리자로 라이브러리 패키지를 설치하고, 패키지에 포함된 스키매틱을 실행해서 프로젝트 코드에 필요한 구성을 추가합니다.
패키지 관리자로는 [npm][NpmjsMain]이나 [yarn][YarnpkgMain] 등이 있습니다.
프로젝트 코드에 추가되는 구성에는 import 구문, 폰트, 테마 등이 포함됩니다.

배포된 라이브러리에는 일반적으로 애플리케이션에 라이브러리를 추가하는 방법을 설명하는 `README` 파일이나 문서가 있습니다.
예를 들어 [Angular Material][AngularMaterialMain] 문서를 참고하세요.

<!--
### Library typings
-->

<a id="library-typings"></a>

### 라이브러리 타입 선언

<!--
Typically, library packages include typings in `.d.ts` files; see examples in `node_modules/@angular/material`.
If the package of your library does not include typings and your IDE complains, you might need to install the `@types/<lib_name>` package with the library.

For example, suppose you have a library named `d3`:

```shell

npm install d3 --save
npm install @types/d3 --save-dev

```

Types defined in a `@types/` package for a library installed into the workspace are automatically added to the TypeScript configuration for the project that uses that library.
TypeScript looks for types in the `node_modules/@types` directory by default, so you do not have to add each type package individually.

If a library does not have typings available at `@types/`, you may use it by manually adding typings for it.
To do this:

1. Create a `typings.d.ts` file in your `src/` directory.
   This file is automatically included as global type definition.

1. Add the following code in `src/typings.d.ts`:

   ```ts
   declare module 'host' {
     export interface Host {
       protocol?: string;
       hostname?: string;
       pathname?: string;
     }
     export function parse(url: string, queryString?: string): Host;
   }
   ```

1. In the component or file that uses the library, add the following code:

   ```ts
   import * as host from 'host';
   const parsedUrl = host.parse('https://angular.dev');
   console.log(parsedUrl.hostname);
   ```

Define more typings as needed.
-->

라이브러리 패키지는 일반적으로 `.d.ts` 파일에 타입 선언을 포함합니다.
`node_modules/@angular/material`에서 예제를 확인할 수 있습니다.
라이브러리 패키지에 타입 선언이 없어서 IDE가 오류를 표시한다면 라이브러리와 함께 `@types/<lib_name>` 패키지를 설치해야 할 수 있습니다.

예를 들어 `d3`라는 라이브러리가 있다고 해 봅시다:

```shell

npm install d3 --save
npm install @types/d3 --save-dev

```

워크스페이스에 설치한 라이브러리의 `@types/` 패키지에 정의된 타입은 해당 라이브러리를 사용하는 프로젝트의 TypeScript 설정에 자동으로 추가됩니다.
TypeScript는 기본적으로 `node_modules/@types` 디렉터리에서 타입을 찾으므로 각 타입 패키지를 개별적으로 추가할 필요가 없습니다.

라이브러리의 타입 선언이 `@types/`에 없다면 직접 타입 선언을 추가해서 사용할 수 있습니다.
다음과 같이 진행하세요:

1. `src/` 디렉터리에 `typings.d.ts` 파일을 만드세요.
   이 파일은 전역 타입 정의로 자동 포함됩니다.

1. `src/typings.d.ts`에 다음 코드를 추가하세요:

   ```ts
   declare module 'host' {
     export interface Host {
       protocol?: string;
       hostname?: string;
       pathname?: string;
     }
     export function parse(url: string, queryString?: string): Host;
   }
   ```

1. 라이브러리를 사용하는 컴포넌트나 파일에 다음 코드를 추가하세요:

   ```ts
   import * as host from 'host';
   const parsedUrl = host.parse('https://angular.dev');
   console.log(parsedUrl.hostname);
   ```

필요에 따라 타입 선언을 더 정의하세요.

<!--
## Updating libraries
-->

<a id="updating-libraries"></a>

## 라이브러리 업데이트하기

<!--
A library is able to be updated by the publisher, and also has individual dependencies which need to be kept current.
To check for updates to your installed libraries, use the [`ng update`][CliUpdate] Angular CLI command.

Use `ng update <lib_name>` Angular CLI command to update individual library versions.
The Angular CLI checks the latest published release of the library, and if the latest version is newer than your installed version, downloads it and updates your `package.json` to match the latest version.

When you update Angular to a new version, you need to make sure that any libraries you are using are current.
If libraries have interdependencies, you might have to update them in a particular order.
See the [Angular Update Guide][AngularUpdateMain] for help.
-->

라이브러리는 배포자가 업데이트할 수 있으며, 라이브러리가 사용하는 개별 의존성도 최신 상태로 유지해야 합니다.
설치한 라이브러리의 업데이트를 확인하려면 Angular CLI의 [`ng update`][CliUpdate] 명령을 사용하세요.

개별 라이브러리의 버전을 업데이트하려면 Angular CLI의 `ng update <lib_name>` 명령을 사용하세요.
Angular CLI는 라이브러리의 최신 배포 버전을 확인하고 설치된 버전보다 새 버전이면 다운로드한 뒤 `package.json`도 최신 버전에 맞게 변경합니다.

Angular를 새 버전으로 업데이트할 때는 사용 중인 라이브러리도 최신 상태인지 확인해야 합니다.
라이브러리 사이에 의존 관계가 있다면 특정 순서로 업데이트해야 할 수 있습니다.
도움이 필요하면 [Angular 업데이트 가이드][AngularUpdateMain]를 참고하세요.

<!--
## Adding a library to the runtime global scope
-->

<a id="adding-a-library-to-the-runtime-global-scope"></a>

## 런타임 전역 스코프에 라이브러리 추가하기

<!--
If a legacy JavaScript library is not imported into an application, you may add it to the runtime global scope and load it as if it was added in a script tag.
Configure the Angular CLI to do this at build time using the `scripts` and `styles` options of the build target in the [`angular.json`][GuideWorkspaceConfig] workspace build configuration file.

For example, to use the [Bootstrap 4][GetbootstrapDocs40GettingStartedIntroduction] library

1. Install the library and the associated dependencies using the npm package manager:

   ```shell
     npm install jquery --save
     npm install popper.js --save
     npm install bootstrap --save
   ```

1. In the `angular.json` configuration file, add the associated script files to the `scripts` array:

   ```json
     "scripts": [
         "node_modules/jquery/dist/jquery.slim.js",
         "node_modules/popper.js/dist/umd/popper.js",
         "node_modules/bootstrap/dist/js/bootstrap.js"
       ],
   ```

1. Add the `bootstrap.css` CSS file to the `styles` array:

   ```json
     "styles": [
         "node_modules/bootstrap/dist/css/bootstrap.css",
         "src/styles.css"
     ],
   ```

1. Run or restart the `ng serve` Angular CLI command to see Bootstrap 4 work in your application.
-->

레거시 JavaScript 라이브러리를 애플리케이션으로 직접 불러오지 않는 경우에는 런타임 전역 스코프에 추가해서 script 태그로 추가한 것처럼 로드할 수 있습니다.
워크스페이스 빌드 설정 파일인 [`angular.json`][GuideWorkspaceConfig]에서 빌드 타겟의 `scripts`와 `styles` 옵션을 사용하면 Angular CLI가 빌드할 때 이렇게 처리하도록 설정할 수 있습니다.

예를 들어 [Bootstrap 4][GetbootstrapDocs40GettingStartedIntroduction] 라이브러리를 사용하려면 다음과 같이 진행하세요.

1. npm 패키지 관리자로 라이브러리와 관련 의존성을 설치하세요:

   ```shell
     npm install jquery --save
     npm install popper.js --save
     npm install bootstrap --save
   ```

1. `angular.json` 설정 파일의 `scripts` 배열에 관련 스크립트 파일을 추가하세요:

   ```json
     "scripts": [
         "node_modules/jquery/dist/jquery.slim.js",
         "node_modules/popper.js/dist/umd/popper.js",
         "node_modules/bootstrap/dist/js/bootstrap.js"
       ],
   ```

1. `styles` 배열에 `bootstrap.css` CSS 파일을 추가하세요:

   ```json
     "styles": [
         "node_modules/bootstrap/dist/css/bootstrap.css",
         "src/styles.css"
     ],
   ```

1. Angular CLI의 `ng serve` 명령을 실행하거나 다시 시작해서 애플리케이션에서 Bootstrap 4가 동작하는지 확인하세요.

<!--
### Using runtime-global libraries inside your app
-->

<a id="using-runtime-global-libraries-inside-your-app"></a>

### 앱 안에서 런타임 전역 라이브러리 사용하기

<!--
After you import a library using the "scripts" array, do **not** import it using an import statement in your TypeScript code.
The following code snippet is an example import statement.

```ts
import * as $ from 'jquery';
```

If you import it using import statements, you have two different copies of the library: one imported as a global library, and one imported as a module.
This is especially bad for libraries with plugins, like jQuery, because each copy includes different plugins.

Instead, run `npm install @types/jquery` to download typings for your library, add `"jquery"` to the `types` array in `tsconfig.app.json`, and then follow the library installation steps.
This gives you access to the global variables exposed by that library.
-->

"scripts" 배열로 라이브러리를 불러왔다면 TypeScript 코드의 import 구문으로 다시 불러오면 **안 됩니다**.
다음 코드는 import 구문의 예입니다.

```ts
import * as $ from 'jquery';
```

import 구문으로도 불러오면 전역 라이브러리로 불러온 사본과 모듈로 불러온 사본이 따로 존재하게 됩니다.
jQuery처럼 플러그인을 사용하는 라이브러리는 사본마다 서로 다른 플러그인이 포함되므로 특히 문제가 됩니다.

대신 `npm install @types/jquery`로 라이브러리의 타입 선언을 다운로드하고, `tsconfig.app.json`의 `types` 배열에 `"jquery"`를 추가한 뒤 라이브러리 설치 단계를 따르세요.
그러면 라이브러리가 노출하는 전역 변수에 접근할 수 있습니다.

<!--
### Defining typings for runtime-global libraries
-->

<a id="defining-typings-for-runtime-global-libraries"></a>

### 런타임 전역 라이브러리의 타입 선언 정의하기

<!--
If the global library you need to use does not have global typings, you can declare them manually as `any` in `src/typings.d.ts`.

For example:

```ts
declare var libraryName: any;
```

Some scripts extend other libraries; for instance with jQuery plugins:

```ts
$('.test').myPlugin();
```

In this case, the installed `@types/jquery` does not include `myPlugin`, so you need to add an interface in `src/typings.d.ts`.
For example:

```ts
interface JQuery {
  myPlugin(options?: any): any;
}
```

If you do not add the interface for the script-defined extension, your IDE shows an error:

```text

[TS][Error] Property 'myPlugin' does not exist on type 'JQuery'

```

[CliUpdate]: cli/update 'ng update | CLI |Angular'
[GuideNpmPackages]: reference/configs/npm-packages 'Workspace npm dependencies | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular workspace configuration | Angular'
[Resources]: resources 'Explore Angular Resources | Angular'
[AngularMaterialMain]: https://material.angular.dev 'Angular Material | Angular'
[AngularUpdateMain]: /update-guide 'Angular Update Guide | Angular'
[GetbootstrapDocs40GettingStartedIntroduction]: https://getbootstrap.com/docs/4.0/getting-started/introduction 'Introduction | Bootstrap'
[NpmjsMain]: https://www.npmjs.com 'npm'
[YarnpkgMain]: https://yarnpkg.com ' Yarn'
-->

사용하려는 전역 라이브러리에 전역 타입 선언이 없다면 `src/typings.d.ts`에서 직접 `any`로 선언할 수 있습니다.

예를 들면 다음과 같습니다:

```ts
declare var libraryName: any;
```

일부 스크립트는 다른 라이브러리를 확장합니다.
예를 들어 jQuery 플러그인은 다음과 같습니다:

```ts
$('.test').myPlugin();
```

이 경우 설치한 `@types/jquery`에는 `myPlugin`이 포함되지 않으므로 `src/typings.d.ts`에 인터페이스를 추가해야 합니다.
예를 들면 다음과 같습니다:

```ts
interface JQuery {
  myPlugin(options?: any): any;
}
```

스크립트에서 정의한 확장 기능의 인터페이스를 추가하지 않으면 IDE에 오류가 표시됩니다:

```text

[TS][Error] Property 'myPlugin' does not exist on type 'JQuery'

```

[CliUpdate]: cli/update 'ng update | CLI |Angular'
[GuideNpmPackages]: reference/configs/npm-packages '워크스페이스 npm 의존성 | Angular'
[GuideWorkspaceConfig]: reference/configs/workspace-config 'Angular 워크스페이스 설정 | Angular'
[Resources]: resources 'Angular 자료 살펴보기 | Angular'
[AngularMaterialMain]: https://material.angular.dev 'Angular Material | Angular'
[AngularUpdateMain]: /update-guide 'Angular 업데이트 가이드 | Angular'
[GetbootstrapDocs40GettingStartedIntroduction]: https://getbootstrap.com/docs/4.0/getting-started/introduction '소개 | Bootstrap'
[NpmjsMain]: https://www.npmjs.com 'npm'
[YarnpkgMain]: https://yarnpkg.com ' Yarn'
