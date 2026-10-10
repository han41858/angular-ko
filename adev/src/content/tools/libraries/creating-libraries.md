<!--
# Creating libraries
-->

<a id="creating-libraries"></a>

# 라이브러리 만들기

<!--
This page provides a conceptual overview of how to create and publish new libraries to extend Angular functionality.

If you find that you need to solve the same problem in more than one application \(or want to share your solution with other developers\), you have a candidate for a library.
A simple example might be a button that sends users to your company website, that would be included in all applications that your company builds.
-->

이 페이지에서는 Angular 기능을 확장하는 새 라이브러리를 만들고 배포하는 방법을 개념적으로 살펴봅니다.

여러 애플리케이션에서 같은 문제를 해결해야 하거나 해결 방법을 다른 개발자와 공유하고 싶다면 라이브러리로 만들 수 있습니다.
간단한 예로 회사에서 만드는 모든 애플리케이션에 포함할 회사 웹사이트 이동 버튼을 생각해 볼 수 있습니다.

<!--
## Getting started
-->

<a id="getting-started"></a>

## 시작하기

<!--
Use the Angular CLI to generate a new library skeleton in a new workspace with the following commands.

```shell

ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib

```

<docs-callout title="Naming your library">

You should be very careful when choosing the name of your library if you want to publish it later in a public package registry such as npm.
See [Publishing your library](tools/libraries/creating-libraries#publishing-your-library).

Avoid using a name that is prefixed with `ng-`, such as `ng-library`.
The `ng-` prefix is a reserved keyword used by the Angular framework and its libraries.
The `ngx-` prefix is preferred as a convention used to denote that the library is suitable for use with Angular.
It is also an excellent indication to consumers of the registry to differentiate between libraries of different JavaScript frameworks.

</docs-callout>

The `ng generate` command creates the `projects/my-lib` folder in your workspace, which contains a component.

HELPFUL: For more details on how a library project is structured, refer to the [Library project files](reference/configs/file-structure#library-project-files) section of the [Project File Structure guide](reference/configs/file-structure).

Use the monorepo model to use the same workspace for multiple projects.
See [Setting up for a multi-project workspace](reference/configs/file-structure#multiple-projects).

When you generate a new library, the workspace configuration file, `angular.json`, is updated with a project of type `library`.

```json

"projects": {
  …
  "my-lib": {
    "root": "projects/my-lib",
    "sourceRoot": "projects/my-lib/src",
    "projectType": "library",
    "prefix": "lib",
    "architect": {
      "build": {
        "builder": "@angular/build:ng-packagr",
        …

```

Build, test, and lint the project with CLI commands:

```shell

ng build my-lib --configuration development
ng test my-lib
ng lint my-lib

```

Notice that the configured builder for the project is different from the default builder for application projects.
This builder, among other things, ensures that the library is always built with the [AOT compiler](tools/cli/aot-compiler).

To make library code reusable you must define a public API for it.
This "user layer" defines what is available to consumers of your library.
A user of your library should be able to access public functionality \(such as service providers and general utility functions\) through a single import path.

The public API for your library is maintained in the `public-api.ts` file in your library folder.
Anything exported from this file is made public when your library is imported into an application.

Your library should supply documentation \(typically a README file\) for installation and maintenance.
-->

다음 명령으로 Angular CLI를 사용해서 새 워크스페이스에 라이브러리의 기본 구조를 생성하세요.

```shell

ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib

```

<docs-callout title="라이브러리 이름 정하기">

나중에 npm 같은 공개 패키지 레지스트리에 배포하려면 라이브러리 이름을 신중하게 정해야 합니다.
[라이브러리 배포하기](tools/libraries/creating-libraries#publishing-your-library)를 참고하세요.

`ng-library`처럼 `ng-`로 시작하는 이름은 피하세요.
`ng-` 접두사는 Angular 프레임워크와 라이브러리에서 사용하는 예약어입니다.
Angular에서 사용하는 라이브러리임을 나타내는 관례에 따라 `ngx-` 접두사를 사용하는 것이 좋습니다.
레지스트리 사용자도 이를 통해 다른 JavaScript 프레임워크용 라이브러리와 쉽게 구별할 수 있습니다.

</docs-callout>

`ng generate` 명령은 워크스페이스에 컴포넌트 하나가 들어 있는 `projects/my-lib` 폴더를 생성합니다.

도움말: 라이브러리 프로젝트 구조에 대한 자세한 내용은 [프로젝트 파일 구조 가이드](reference/configs/file-structure)의 [라이브러리 프로젝트 파일](reference/configs/file-structure#library-project-files) 섹션을 참고하세요.

같은 워크스페이스에서 여러 프로젝트를 사용하려면 모노레포 모델을 사용하세요.
[여러 프로젝트를 위한 워크스페이스 설정하기](reference/configs/file-structure#multiple-projects)를 참고하세요.

새 라이브러리를 생성하면 워크스페이스 설정 파일인 `angular.json`에 `library` 유형의 프로젝트가 추가됩니다.

```json

"projects": {
  …
  "my-lib": {
    "root": "projects/my-lib",
    "sourceRoot": "projects/my-lib/src",
    "projectType": "library",
    "prefix": "lib",
    "architect": {
      "build": {
        "builder": "@angular/build:ng-packagr",
        …

```

CLI 명령으로 프로젝트를 빌드하고 테스트와 린트를 실행하세요:

```shell

ng build my-lib --configuration development
ng test my-lib
ng lint my-lib

```

이 프로젝트에 설정된 빌더는 애플리케이션 프로젝트의 기본 빌더와 다릅니다.
이 빌더는 라이브러리가 항상 [AOT 컴파일러](tools/cli/aot-compiler)로 빌드되도록 보장하는 등의 역할을 합니다.

라이브러리 코드를 재사용하려면 공개 API를 정의해야 합니다.
이 "사용자 계층"은 라이브러리 사용자가 접근할 수 있는 기능을 정의합니다.
라이브러리 사용자는 서비스 프로바이더나 공통 유틸리티 함수 같은 공개 기능에 하나의 import 경로로 접근할 수 있어야 합니다.

라이브러리의 공개 API는 라이브러리 폴더의 `public-api.ts` 파일에서 관리합니다.
이 파일에서 export한 항목은 라이브러리를 애플리케이션으로 불러올 때 공개됩니다.

라이브러리에는 설치와 유지보수를 위한 문서\(일반적으로 README 파일\)를 제공해야 합니다.

<!--
## Refactoring parts of an application into a library
-->

<a id="refactoring-parts-of-an-application-into-a-library"></a>

## 애플리케이션 일부를 라이브러리로 리팩터링하기

<!--
To make your solution reusable, you need to adjust it so that it does not depend on application-specific code.
Here are some things to consider in migrating application functionality to a library.

- Declarations such as components and pipes should be designed as stateless, meaning they don't rely on or alter external variables.
  If you do rely on state, you need to evaluate every case and decide whether it is application state or state that the library would manage.

- Any observables that the components subscribe to internally should be cleaned up and disposed of during the lifecycle of those components
- Components should expose their interactions through inputs for providing context, and outputs for communicating events to other components

- Check all internal dependencies.
  - For custom classes or interfaces used in components or service, check whether they depend on additional classes or interfaces that also need to be migrated
  - Similarly, if your library code depends on a service, that service needs to be migrated
  - If your library code or its templates depend on other libraries \(such as Angular Material, for instance\), you must configure your library with those dependencies

- Consider how you provide services to client applications.
  - Services should declare their own providers, rather than declaring providers in the NgModule or a component.
    Declaring a provider makes that service _tree-shakable_.
    This practice lets the compiler leave the service out of the bundle if it never gets injected into the application that imports the library.
    For more about this, see [Tree-shakable providers](guide/di/lightweight-injection-tokens).

  - If you register global service providers expose a `provideXYZ()` provider function.
  - If your library provides optional services that might not be used by all client applications, support proper tree-shaking for that case by using the [lightweight token design pattern](guide/di/lightweight-injection-tokens)
-->

해결책을 재사용하려면 특정 애플리케이션에만 해당하는 코드에 의존하지 않도록 조정해야 합니다.
애플리케이션 기능을 라이브러리로 옮길 때는 다음을 고려하세요.

- 컴포넌트와 파이프 같은 선언은 외부 변수에 의존하거나 외부 변수를 변경하지 않도록 상태 없이 설계해야 합니다.
  상태에 의존한다면 각 경우를 검토해서 애플리케이션 상태인지 라이브러리가 관리해야 하는 상태인지 판단해야 합니다.

- 컴포넌트 내부에서 구독하는 옵저버블은 컴포넌트의 라이프사이클에 맞춰 정리하고 해제해야 합니다.
- 컴포넌트는 문맥을 전달받는 입력 프로퍼티와 다른 컴포넌트에 이벤트를 알리는 출력 프로퍼티로 상호작용을 공개해야 합니다.

- 모든 내부 의존성을 확인하세요.
  - 컴포넌트나 서비스에서 사용하는 커스텀 클래스와 인터페이스가 함께 옮겨야 할 다른 클래스나 인터페이스에 의존하는지 확인하세요.
  - 라이브러리 코드가 서비스에 의존한다면 해당 서비스도 옮겨야 합니다.
  - 라이브러리 코드나 템플릿이 다른 라이브러리\(예: Angular Material\)에 의존한다면 그 의존성을 라이브러리에 설정해야 합니다.

- 라이브러리를 사용하는 애플리케이션에 서비스를 제공하는 방법을 고려하세요.
  - NgModule이나 컴포넌트에 프로바이더를 선언하는 대신 서비스에서 자체 프로바이더를 선언해야 합니다.
    프로바이더를 이렇게 선언하면 서비스가 _트리 셰이킹 대상_ 이 됩니다.
    라이브러리를 불러온 애플리케이션에 해당 서비스가 주입되지 않는다면 컴파일러가 번들에서 서비스를 제외할 수 있습니다.
    자세한 내용은 [트리 셰이킹 가능한 프로바이더](guide/di/lightweight-injection-tokens)를 참고하세요.

  - 전역 서비스 프로바이더를 등록한다면 `provideXYZ()` 프로바이더 함수를 공개하세요.
  - 모든 애플리케이션에서 사용하지는 않는 선택적 서비스를 라이브러리가 제공한다면 [경량 토큰 설계 패턴](guide/di/lightweight-injection-tokens)으로 적절한 트리 셰이킹을 지원하세요.

<!--
## Integrating with the CLI using code-generation schematics
-->

<a id="integrating-with-the-cli-using-code-generation-schematics"></a>

## 코드 생성 스키매틱으로 CLI와 통합하기

<!--
A library typically includes _reusable code_ that defines components, services, and other Angular artifacts \(pipes, directives\) that you import into a project.
A library is packaged into an npm package for publishing and sharing.
This package can also include schematics that provide instructions for generating or transforming code directly in your project, in the same way that the CLI creates a generic new component with `ng generate component`.
A schematic that is packaged with a library can, for example, provide the Angular CLI with the information it needs to generate a component that configures and uses a particular feature, or set of features, defined in that library.
One example of this is [Angular Material's navigation schematic](https://material.angular.dev/guide/schematics#navigation-schematic) which configures the CDK's [BreakpointObserver](https://material.angular.dev/cdk/layout/overview#breakpointobserver) and uses it with Material's [MatSideNav](https://material.angular.dev/components/sidenav/overview) and [MatToolbar](https://material.angular.dev/components/toolbar/overview) components.

Create and include the following kinds of schematics:

- Include an installation schematic so that `ng add` can add your library to a project
- Include generation schematics in your library so that `ng generate` can scaffold your defined artifacts \(components, services, tests\) in a project
- Include an update schematic so that `ng update` can update your library's dependencies and provide migrations for breaking changes in new releases

What you include in your library depends on your task.
For example, you could define a schematic to create a dropdown that is pre-populated with canned data to show how to add it to an application.
If you want a dropdown that would contain different passed-in values each time, your library could define a schematic to create it with a given configuration.
Developers could then use `ng generate` to configure an instance for their own application.

Suppose you want to read a configuration file and then generate a form based on that configuration.
If that form needs additional customization by the developer who is using your library, it might work best as a schematic.
However, if the form will always be the same and not need much customization by developers, then you could create a dynamic component that takes the configuration and generates the form.
In general, the more complex the customization, the more useful the schematic approach.

For more information, see [Schematics Overview](tools/cli/schematics) and [Schematics for Libraries](tools/cli/schematics-for-libraries).
-->

라이브러리에는 보통 프로젝트로 불러와 사용하는 컴포넌트, 서비스, 파이프, 디렉티브 등의 Angular 구성 요소를 정의한 _재사용 가능한 코드_ 가 포함됩니다.
라이브러리는 배포와 공유를 위해 npm 패키지로 묶습니다.
이 패키지에는 CLI의 `ng generate component`가 기본 컴포넌트를 만드는 것처럼 프로젝트에서 코드를 직접 생성하거나 변환하는 방법을 정의한 스키매틱을 포함할 수도 있습니다.
예를 들어 라이브러리와 함께 제공하는 스키매틱은 라이브러리의 특정 기능이나 기능 묶음을 설정해서 사용하는 컴포넌트를 생성하는 데 필요한 정보를 Angular CLI에 제공할 수 있습니다.
[Angular Material의 내비게이션 스키매틱](https://material.angular.dev/guide/schematics#navigation-schematic)이 한 예입니다.
이 스키매틱은 CDK의 [BreakpointObserver](https://material.angular.dev/cdk/layout/overview#breakpointobserver)를 설정하고 Material의 [MatSideNav](https://material.angular.dev/components/sidenav/overview), [MatToolbar](https://material.angular.dev/components/toolbar/overview) 컴포넌트와 함께 사용합니다.

다음 종류의 스키매틱을 만들어 포함하세요:

- `ng add`로 프로젝트에 라이브러리를 추가할 수 있도록 설치 스키매틱을 포함하세요.
- `ng generate`로 정의한 구성 요소\(컴포넌트, 서비스, 테스트\)의 기본 코드를 프로젝트에 생성할 수 있도록 생성 스키매틱을 포함하세요.
- `ng update`로 라이브러리 의존성을 업데이트하고 새 릴리스의 호환성 변경에 맞춰 마이그레이션할 수 있도록 업데이트 스키매틱을 포함하세요.

라이브러리에 무엇을 포함할지는 작업에 따라 다릅니다.
예를 들어 준비된 데이터를 미리 넣은 드롭다운을 생성하는 스키매틱을 정의해서 애플리케이션에 추가하는 방법을 보여줄 수 있습니다.
매번 전달받은 서로 다른 값을 담는 드롭다운이 필요하다면 주어진 설정으로 드롭다운을 생성하는 스키매틱을 정의할 수 있습니다.
개발자는 `ng generate`로 자신의 애플리케이션에 맞는 인스턴스를 구성할 수 있습니다.

설정 파일을 읽은 다음 해당 설정을 기반으로 폼을 생성한다고 해 봅시다.
라이브러리 사용자가 폼을 추가로 수정해야 한다면 스키매틱이 가장 적합할 수 있습니다.
반면 폼이 항상 같고 개발자가 크게 수정할 필요가 없다면 설정을 받아 폼을 생성하는 동적 컴포넌트를 만들 수 있습니다.
일반적으로 커스터마이징이 복잡할수록 스키매틱 방식이 더 유용합니다.

자세한 내용은 [스키매틱 개요](tools/cli/schematics)와 [라이브러리용 스키매틱](tools/cli/schematics-for-libraries)을 참고하세요.

<!--
## Publishing your library
-->

<a id="publishing-your-library"></a>

## 라이브러리 배포하기

<!--
Use the Angular CLI and the npm package manager to build and publish your library as an npm package.

Angular CLI uses a tool called [ng-packagr](https://github.com/ng-packagr/ng-packagr/blob/master/README.md) to create packages from your compiled code that can be published to npm.
See [Building libraries with Ivy](tools/libraries/creating-libraries#publishing-libraries) for information on the distribution formats supported by `ng-packagr` and guidance on how
to choose the right format for your library.

You should always build libraries for distribution using the `production` configuration.
This ensures that generated output uses the appropriate optimizations and the correct package format for npm.

```shell

ng build my-lib
cd dist/my-lib
npm publish

```
-->

Angular CLI와 npm 패키지 관리자를 사용해서 라이브러리를 빌드하고 npm 패키지로 배포하세요.

Angular CLI는 [ng-packagr](https://github.com/ng-packagr/ng-packagr/blob/master/README.md)라는 도구로 컴파일된 코드를 npm에 배포할 수 있는 패키지로 만듭니다.
`ng-packagr`가 지원하는 배포 형식과 라이브러리에 맞는 형식을 선택하는 방법은 [Ivy로 라이브러리 빌드하기](tools/libraries/creating-libraries#publishing-libraries)를 참고하세요.

배포할 라이브러리는 항상 `production` 설정으로 빌드해야 합니다.
그러면 생성된 결과물에 적절한 최적화와 올바른 npm 패키지 형식이 적용됩니다.

```shell

ng build my-lib
cd dist/my-lib
npm publish

```

<!--
## Managing assets in a library
-->

<a id="managing-assets-in-a-library"></a>

## 라이브러리의 정적 자원 관리하기

<!--
In your Angular library, the distributable can include additional assets like theming files, Sass mixins, or documentation \(like a changelog\).
For more information [copy assets into your library as part of the build](https://github.com/ng-packagr/ng-packagr/blob/master/docs/copy-assets.md) and [embed assets in component styles](https://github.com/ng-packagr/ng-packagr/blob/master/docs/embed-assets-css.md).

IMPORTANT: When including additional assets like Sass mixins or pre-compiled CSS.
You need to add these manually to the conditional ["exports"](tools/libraries/angular-package-format#exports) in the `package.json` of the primary entrypoint.

`ng-packagr` will merge handwritten `"exports"` with the auto-generated ones, allowing for library authors to configure additional export subpaths, or custom conditions.

```json

"exports": {
  ".": {
    "sass": "./_index.scss",
  },
  "./theming": {
    "sass": "./_theming.scss"
  },
  "./prebuilt-themes/indigo-pink.css": {
    "style": "./prebuilt-themes/indigo-pink.css"
  }
}

```

The above is an extract from the [@angular/material](https://unpkg.com/browse/@angular/material/package.json) distributable.
-->

Angular 라이브러리의 배포 결과물에는 테마 파일, Sass 믹스인, 변경 이력 같은 문서 등의 추가 자원을 포함할 수 있습니다.
자세한 내용은 [빌드 중 라이브러리에 자원 복사하기](https://github.com/ng-packagr/ng-packagr/blob/master/docs/copy-assets.md)와 [컴포넌트 스타일에 자원 포함하기](https://github.com/ng-packagr/ng-packagr/blob/master/docs/embed-assets-css.md)를 참고하세요.

중요: Sass 믹스인이나 미리 컴파일한 CSS 같은 추가 자원을 포함할 때는 기본 진입점의 `package.json`에서 조건부 ["exports"](tools/libraries/angular-package-format#exports)에 직접 추가해야 합니다.

`ng-packagr`는 직접 작성한 `"exports"`를 자동 생성한 항목과 병합합니다.
따라서 라이브러리 작성자는 추가 export 하위 경로나 커스텀 조건을 설정할 수 있습니다.

```json

"exports": {
  ".": {
    "sass": "./_index.scss",
  },
  "./theming": {
    "sass": "./_theming.scss"
  },
  "./prebuilt-themes/indigo-pink.css": {
    "style": "./prebuilt-themes/indigo-pink.css"
  }
}

```

위 예제는 [@angular/material](https://unpkg.com/browse/@angular/material/package.json) 배포 결과물에서 발췌한 것입니다.

<!--
## Peer dependencies
-->

<a id="peer-dependencies"></a>

## 피어 의존성

<!--
Angular libraries should list any `@angular/*` dependencies the library depends on as peer dependencies.
This ensures that when modules ask for Angular, they all get the exact same module.
If a library lists `@angular/core` in `dependencies` instead of `peerDependencies`, it might get a different Angular module instead, which would cause your application to break.
-->

Angular 라이브러리는 의존하는 모든 `@angular/*` 패키지를 피어 의존성으로 나열해야 합니다.
그러면 각 모듈이 Angular를 요청할 때 정확히 같은 모듈을 받습니다.
라이브러리가 `@angular/core`를 `peerDependencies` 대신 `dependencies`에 나열하면 다른 Angular 모듈을 가져올 수 있으며, 이로 인해 애플리케이션이 정상 동작하지 않을 수 있습니다.

<!--
## Using your own library in applications
-->

<a id="using-your-own-library-in-applications"></a>

## 애플리케이션에서 직접 만든 라이브러리 사용하기

<!--
You don't have to publish your library to the npm package manager to use it in the same workspace, but you do have to build it first.

To use your own library in an application:

- Build the library.
  You cannot use a library before it is built.

```shell
  ng build my-lib
```

- In your applications, import from the library by name:

```ts
import {myExport} from 'my-lib';
```
-->

같은 워크스페이스에서 라이브러리를 사용하려면 npm에 배포할 필요는 없지만 먼저 빌드해야 합니다.

애플리케이션에서 직접 만든 라이브러리를 사용하려면 다음과 같이 진행하세요:

- 라이브러리를 빌드하세요.
  빌드하기 전에는 라이브러리를 사용할 수 없습니다.

```shell
  ng build my-lib
```

- 애플리케이션에서 라이브러리 이름으로 불러오세요:

```ts
import {myExport} from 'my-lib';
```

<!--
### Building and rebuilding your library
-->

<a id="building-and-rebuilding-your-library"></a>

### 라이브러리 빌드와 다시 빌드하기

<!--
The build step is important if you haven't published your library as an npm package and then installed the package back into your application from npm.
For instance, if you clone your git repository and run `npm install`, your editor shows the `my-lib` imports as missing if you haven't yet built your library.

HELPFUL: When you import something from a library in an Angular application, Angular looks for a mapping between the library name and a location on disk.
When you install a library package, the mapping is in the `node_modules` folder.
When you build your own library, it has to find the mapping in your `tsconfig` paths.

Generating a library with the Angular CLI automatically adds its path to the `tsconfig` file.
The Angular CLI uses the `tsconfig` paths to tell the build system where to find the library.

For more information, see [Path mapping overview](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping).

You can rebuild your library whenever you make changes to it, but this extra step takes time.
_Incremental builds_ functionality improves the library-development experience.
Every time a file is changed a partial build is performed that emits the amended files.

Incremental builds can be run as a background process in your development environment.
To take advantage of this feature add the `--watch` flag to the build command:

```shell

ng build my-lib --watch

```

IMPORTANT: The CLI `build` command uses a different builder and invokes a different build tool for libraries than it does for applications.

- The build system for applications, `@angular/build`, is based on `esbuild`, and is included in all new Angular CLI projects
- The build system for libraries is based on `ng-packagr`.
  It is only added to your dependencies when you add a library using `ng generate library my-lib`.

The two build systems support different things, and even where they support the same things, they do those things differently.
This means that the TypeScript source can result in different JavaScript code in a built library than it would in a built application.

For this reason, an application that depends on a library should only use TypeScript path mappings that point to the _built library_.
TypeScript path mappings should _not_ point to the library source `.ts` files.
-->

라이브러리를 npm 패키지로 배포한 뒤 npm에서 애플리케이션으로 다시 설치한 경우가 아니라면 빌드 단계가 중요합니다.
예를 들어 Git 저장소를 복제하고 `npm install`을 실행했더라도 라이브러리를 아직 빌드하지 않았다면 편집기는 `my-lib` import를 찾을 수 없다고 표시합니다.

도움말: Angular 애플리케이션에서 라이브러리의 항목을 불러올 때 Angular는 라이브러리 이름과 디스크 위치 사이의 매핑을 찾습니다.
라이브러리 패키지를 설치한 경우에는 `node_modules` 폴더에서 매핑을 찾습니다.
직접 만든 라이브러리를 빌드한 경우에는 `tsconfig`의 paths에서 매핑을 찾아야 합니다.

Angular CLI로 라이브러리를 생성하면 경로가 `tsconfig` 파일에 자동으로 추가됩니다.
Angular CLI는 `tsconfig`의 paths로 빌드 시스템에 라이브러리 위치를 알려줍니다.

자세한 내용은 [경로 매핑 개요](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)를 참고하세요.

라이브러리를 변경할 때마다 다시 빌드할 수 있지만 이 추가 단계에는 시간이 걸립니다.
_증분 빌드_ 기능을 사용하면 라이브러리 개발이 더 편리해집니다.
파일이 변경될 때마다 부분 빌드를 수행해서 수정된 파일을 출력합니다.

개발 환경에서 증분 빌드를 백그라운드 프로세스로 실행할 수 있습니다.
이 기능을 사용하려면 빌드 명령에 `--watch` 플래그를 추가하세요:

```shell

ng build my-lib --watch

```

중요: CLI의 `build` 명령은 라이브러리와 애플리케이션에 서로 다른 빌더와 빌드 도구를 사용합니다.

- 애플리케이션 빌드 시스템인 `@angular/build`는 `esbuild`를 기반으로 하며, 모든 새 Angular CLI 프로젝트에 포함됩니다.
- 라이브러리 빌드 시스템은 `ng-packagr`를 기반으로 합니다.
  `ng generate library my-lib`로 라이브러리를 추가할 때만 의존성에 추가됩니다.

두 빌드 시스템이 지원하는 기능은 서로 다르며, 같은 기능을 지원하더라도 처리 방식이 다릅니다.
따라서 같은 TypeScript 소스라도 라이브러리로 빌드했을 때와 애플리케이션으로 빌드했을 때 생성되는 JavaScript 코드가 다를 수 있습니다.

이 때문에 라이브러리에 의존하는 애플리케이션은 _빌드된 라이브러리_ 를 가리키는 TypeScript 경로 매핑만 사용해야 합니다.
TypeScript 경로 매핑이 라이브러리의 원본 `.ts` 파일을 가리켜서는 _안 됩니다_.

<!--
### Linking libraries for local development
-->

<a id="linking-libraries-for-local-development"></a>

### 로컬 개발을 위해 라이브러리 연결하기

<!--
This section explains how to use your package manager's local linking feature
(such as [`npm link`](https://docs.npmjs.com/cli/v11/commands/npm-link) or [`pnpm link`](https://pnpm.io/cli/link)) to test a standalone Angular library with an external application during
local development, without relying on the monorepo workspace structure or publishing to the npm registry.

NOTE: If your library and application are in the same Angular workspace (a monorepo setup), the standard monorepo workflow automatically handles the linking and is generally more efficient. This local linking approach is best when:

- You are developing a standalone library and need to test changes with an external, consuming application.
- You are testing library changes in a consuming application outside the monorepo workspace.
-->

이 섹션에서는 패키지 관리자의 로컬 연결 기능([`npm link`](https://docs.npmjs.com/cli/v11/commands/npm-link)나 [`pnpm link`](https://pnpm.io/cli/link) 등)을 사용해서 독립적인 Angular 라이브러리를 외부 애플리케이션과 함께 로컬에서 테스트하는 방법을 설명합니다.
모노레포 워크스페이스 구조에 의존하거나 npm 레지스트리에 배포할 필요가 없습니다.

참고: 라이브러리와 애플리케이션이 같은 Angular 워크스페이스에 있다면(모노레포 구성) 일반적인 모노레포 작업 흐름에서 연결을 자동으로 처리하며 대체로 더 효율적입니다.
로컬 연결 방식은 다음 경우에 가장 적합합니다:

- 독립적인 라이브러리를 개발하면서 이를 사용하는 외부 애플리케이션으로 변경 사항을 테스트해야 하는 경우
- 모노레포 워크스페이스 밖의 애플리케이션에서 라이브러리 변경 사항을 테스트하는 경우

<!--
#### Configuring the consuming application
-->

<a id="configuring-the-consuming-application"></a>

#### 라이브러리를 사용하는 애플리케이션 설정하기

<!--
To use linked libraries, you need to configure your application's `angular.json` file with the following settings:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "preserveSymlinks": true
          },
          "configurations": {
            "development": {
              "sourceMap": {
                "scripts": true,
                "styles": true,
                "vendor": true
              }
            }
          }
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "prebundle": {
              "exclude": ["my-lib"]
            }
          }
        }
      }
    }
  }
}
```

**Configuration options explained:**

- `preserveSymlinks: true`: Instructs the build system to follow the symlinks created by your package manager's linking command instead of resolving to the symlink's original location. This is essential to avoid multiple copies of the dependent node packages.
- `sourceMap.vendor`: Enabling vendor source maps (especially `vendor: true`) for easier debugging of linked library code.
- `prebundle.exclude`: By default, the Angular CLI can pre-bundle all node dependencies. Excluding your library ensures that the linked source code is properly watched and rebuilt when changes occur.
-->

연결한 라이브러리를 사용하려면 애플리케이션의 `angular.json`에 다음 설정을 추가해야 합니다:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "preserveSymlinks": true
          },
          "configurations": {
            "development": {
              "sourceMap": {
                "scripts": true,
                "styles": true,
                "vendor": true
              }
            }
          }
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "prebundle": {
              "exclude": ["my-lib"]
            }
          }
        }
      }
    }
  }
}
```

**설정 옵션 설명:**

- `preserveSymlinks: true`: 빌드 시스템이 심볼릭 링크의 원래 위치를 해석하는 대신 패키지 관리자의 연결 명령으로 생성한 심볼릭 링크를 따라가도록 합니다.
  의존하는 Node 패키지의 사본이 여러 개 생기지 않도록 하는 데 필수적입니다.
- `sourceMap.vendor`: vendor 소스 맵을 활성화하면(특히 `vendor: true`) 연결한 라이브러리 코드를 더 쉽게 디버깅할 수 있습니다.
- `prebundle.exclude`: Angular CLI는 기본적으로 모든 Node 의존성을 미리 번들링할 수 있습니다.
  라이브러리를 제외하면 연결된 소스 코드의 변경을 올바르게 감지하고 다시 빌드할 수 있습니다.

<!--
## Publishing libraries
-->

<a id="publishing-libraries"></a>

## 라이브러리의 배포 형식

<!--
There are two distribution formats to use when publishing a library:

| Distribution formats        | Details                                                                                                                                                                                                                                                                                                                                  |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Partial-Ivy \(recommended\) | Contains portable code that can be consumed by Ivy applications built with any version of Angular from v12 onwards.                                                                                                                                                                                                                      |
| Full-Ivy                    | Contains private Angular Ivy instructions, which are not guaranteed to work across different versions of Angular. This format requires that the library and application are built with the _exact_ same version of Angular. This format is useful for environments where all library and application code is built directly from source. |

For publishing to npm use the partial-Ivy format as it is stable between patch versions of Angular.

Avoid compiling libraries with full-Ivy code if you are publishing to npm because the generated Ivy instructions are not part of Angular's public API, and so might change between patch versions.
-->

라이브러리를 배포할 때 사용할 수 있는 형식은 두 가지입니다:

| 배포 형식            | 설명                                                                                                                                                                                                                                                         |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Partial-Ivy \(권장\) | v12 이상의 어떤 Angular 버전으로 빌드한 Ivy 애플리케이션에서도 사용할 수 있는 이식 가능한 코드를 포함합니다.                                                                                                                                                 |
| Full-Ivy             | Angular의 비공개 Ivy 명령어를 포함하므로 서로 다른 Angular 버전 사이의 동작을 보장하지 않습니다. 라이브러리와 애플리케이션을 _정확히_ 같은 Angular 버전으로 빌드해야 합니다. 모든 라이브러리와 애플리케이션 코드를 소스에서 직접 빌드하는 환경에 유용합니다. |

npm에 배포할 때는 Angular 패치 버전 사이에서도 안정적으로 유지되는 partial-Ivy 형식을 사용하세요.

생성된 Ivy 명령어는 Angular의 공개 API가 아니어서 패치 버전 사이에서도 변경될 수 있으므로, npm에 배포할 라이브러리는 full-Ivy 코드로 컴파일하지 마세요.

<!--
## Ensuring library version compatibility
-->

<a id="ensuring-library-version-compatibility"></a>

## 라이브러리 버전 호환성 보장하기

<!--
The Angular version used to build an application should always be the same or greater than the Angular versions used to build any of its dependent libraries.
For example, if you had a library using Angular version 13, the application that depends on that library should use Angular version 13 or later.
Angular does not support using an earlier version for the application.

If you intend to publish your library to npm, compile with partial-Ivy code by setting `"compilationMode": "partial"` in `tsconfig.prod.json`.
This partial format is stable between different versions of Angular, so is safe to publish to npm.
Code with this format is processed during the application build using the same version of the Angular compiler, ensuring that the application and all of its libraries use a single version of Angular.

Avoid compiling libraries with full-Ivy code if you are publishing to npm because the generated Ivy instructions are not part of Angular's public API, and so might change between patch versions.

If you've never published a package in npm before, you must create a user account.
Read more in [Publishing npm Packages](https://docs.npmjs.com/getting-started/publishing-npm-packages).
-->

애플리케이션을 빌드하는 Angular 버전은 의존하는 모든 라이브러리를 빌드한 Angular 버전과 같거나 더 높아야 합니다.
예를 들어 Angular 버전 13을 사용하는 라이브러리가 있다면 이를 사용하는 애플리케이션은 Angular 버전 13 이상이어야 합니다.
애플리케이션에서 더 낮은 버전을 사용하는 것은 지원하지 않습니다.

npm에 라이브러리를 배포하려면 `tsconfig.prod.json`에 `"compilationMode": "partial"`을 설정해서 partial-Ivy 코드로 컴파일하세요.
이 부분 컴파일 형식은 서로 다른 Angular 버전 사이에서도 안정적으로 유지되므로 npm에 안전하게 배포할 수 있습니다.
이 형식의 코드는 애플리케이션 빌드 중에 같은 Angular 컴파일러 버전으로 처리되므로, 애플리케이션과 모든 라이브러리가 하나의 Angular 버전을 사용하게 됩니다.

생성된 Ivy 명령어는 Angular의 공개 API가 아니어서 패치 버전 사이에서도 변경될 수 있으므로, npm에 배포할 라이브러리는 full-Ivy 코드로 컴파일하지 마세요.

npm에 패키지를 배포한 적이 없다면 사용자 계정을 만들어야 합니다.
자세한 내용은 [npm 패키지 배포하기](https://docs.npmjs.com/getting-started/publishing-npm-packages)를 참고하세요.

<!--
## Consuming partial-Ivy code outside the Angular CLI
-->

<a id="consuming-partial-ivy-code-outside-the-angular-cli"></a>

## Angular CLI 외부에서 partial-Ivy 코드 사용하기

<!--
An application installs many Angular libraries from npm into its `node_modules` directory.
However, the code in these libraries cannot be bundled directly along with the built application as it is not fully compiled.
To finish compilation, use the Angular linker.

For applications that don't use the Angular CLI, the linker is available as a [Babel](https://babeljs.io) plugin.
The plugin is to be imported from `@angular/compiler-cli/linker/babel`.

The Angular linker Babel plugin supports build caching, meaning that libraries only need to be processed by the linker a single time, regardless of other npm operations.

Example of integrating the plugin into a custom [webpack](https://webpack.js.org) build by registering the linker as a [Babel](https://babeljs.io) plugin using [babel-loader](https://webpack.js.org/loaders/babel-loader/#options).

<docs-code header="webpack.config.mjs" path="adev/src/content/examples/angular-linker-plugin/webpack.config.mjs" region="webpack-config"/>

HELPFUL: The Angular CLI integrates the linker plugin automatically, so if consumers of your library are using the CLI, they can install Ivy-native libraries from npm without any additional configuration.
-->

애플리케이션은 npm의 여러 Angular 라이브러리를 `node_modules` 디렉터리에 설치합니다.
하지만 이 라이브러리의 코드는 전체 컴파일된 상태가 아니므로 빌드된 애플리케이션과 바로 함께 번들링할 수 없습니다.
컴파일을 마무리하려면 Angular 링커를 사용하세요.

Angular CLI를 사용하지 않는 애플리케이션을 위해 링커를 [Babel](https://babeljs.io) 플러그인으로 제공합니다.
플러그인은 `@angular/compiler-cli/linker/babel`에서 불러오면 됩니다.

Angular 링커 Babel 플러그인은 빌드 캐시를 지원합니다.
따라서 다른 npm 작업과 관계없이 라이브러리는 링커에서 한 번만 처리하면 됩니다.

다음은 [babel-loader](https://webpack.js.org/loaders/babel-loader/#options)를 사용해서 링커를 [Babel](https://babeljs.io) 플러그인으로 등록하고, 커스텀 [webpack](https://webpack.js.org) 빌드에 통합하는 예제입니다.

<docs-code header="webpack.config.mjs" path="adev/src/content/examples/angular-linker-plugin/webpack.config.mjs" region="webpack-config"/>

도움말: Angular CLI에는 링커 플러그인이 자동 통합됩니다.
따라서 라이브러리 사용자가 CLI를 사용한다면 추가 설정 없이 npm에서 Ivy 네이티브 라이브러리를 설치할 수 있습니다.
