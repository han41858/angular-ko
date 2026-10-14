<!--
# Workspace and project file structure
-->

<a id="workspace-and-project-file-structure"></a>

# 워크스페이스와 프로젝트 파일 구조

<!--
You develop applications in the context of an Angular workspace.
A workspace contains the files for one or more projects.
A project is the set of files that comprise an application or a shareable library.

The Angular CLI `ng new` command creates a workspace.

```shell
ng new my-project
```

When you run this command, the CLI installs the necessary Angular npm packages and other dependencies in a new workspace, with a root-level application named _my-project_.

By default, `ng new` creates an initial skeleton application at the root level of the workspace.
The skeleton is for a simple welcome application that is ready to run and easy to modify.
The root-level application has the same name as the workspace, and the source files reside in the `src/` subfolder of the workspace.

This default behavior is suitable for a typical "multi-repo" development style where each application resides in its own workspace.
Beginners and intermediate users are encouraged to use `ng new` to create a separate workspace for each application.

Angular also supports workspaces with [multiple projects](#multiple-projects).
This type of development environment is suitable for advanced users who are developing shareable libraries,
and for enterprises that use a "monorepo" development style, with a single repository and global configuration for all Angular projects.

To set up a monorepo workspace, you should skip creating the root application.
See [Setting up for a multi-project workspace](#multiple-projects) below.
-->

Angular 애플리케이션은 워크스페이스 안에서 개발합니다.
워크스페이스에는 하나 이상의 프로젝트에 필요한 파일이 들어 있습니다.
프로젝트는 애플리케이션이나 공유 가능한 라이브러리를 구성하는 파일 모음입니다.

Angular CLI의 `ng new` 명령어로 워크스페이스를 생성합니다.

```shell
ng new my-project
```

이 명령어를 실행하면 CLI가 필요한 Angular npm 패키지와 기타 의존성을 새 워크스페이스에 설치하고, 루트 수준에 _my-project_ 라는 애플리케이션을 만듭니다.

기본적으로 `ng new`는 워크스페이스 루트 수준에 초기 애플리케이션 골격을 생성합니다.
이 골격은 바로 실행할 수 있고 쉽게 수정할 수 있는 간단한 환영 애플리케이션입니다.
루트 수준 애플리케이션의 이름은 워크스페이스와 같으며, 소스 파일은 워크스페이스의 `src/` 하위 폴더에 있습니다.

이 기본 동작은 각 애플리케이션이 별도의 워크스페이스에 있는 일반적인 "멀티레포" 개발 방식에 적합합니다.
초급 및 중급 사용자에게는 `ng new`로 애플리케이션마다 별도의 워크스페이스를 생성하는 것을 권장합니다.

Angular는 [여러 프로젝트](#multiple-projects)를 포함하는 워크스페이스도 지원합니다.
이러한 개발 환경은 공유 가능한 라이브러리를 개발하는 고급 사용자와, 모든 Angular 프로젝트에 단일 저장소와 전역 설정을 사용하는 "모노레포" 개발 방식을 채택한 기업에 적합합니다.

모노레포 워크스페이스를 설정하려면 루트 애플리케이션 생성을 건너뛰어야 합니다.
아래의 [다중 프로젝트 워크스페이스 설정하기](#multiple-projects)를 참고하세요.

<!--
## Workspace configuration files
-->

<a id="workspace-configuration-files"></a>

## 워크스페이스 설정 파일

<!--
All projects within a workspace share a [configuration](reference/configs/workspace-config).
The top level of the workspace contains workspace-wide configuration files, configuration files for the root-level application, and subfolders for the root-level application source and test files.

| Workspace configuration files | Purpose                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.editorconfig`               | Configuration for code editors. See [EditorConfig](https://editorconfig.org).                                                                                                                                                                                                                                    |
| `.gitignore`                  | Specifies intentionally untracked files that [Git](https://git-scm.com) should ignore.                                                                                                                                                                                                                           |
| `README.md`                   | Documentation for the workspace.                                                                                                                                                                                                                                                                                 |
| `angular.json`                | CLI configuration for all projects in the workspace, including configuration options for how to build, serve, and test each project. For details, see [Angular Workspace Configuration](reference/configs/workspace-config).                                                                                     |
| `package.json`                | Configures [npm package dependencies](reference/configs/npm-packages) that are available to all projects in the workspace. See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file.                                                                 |
| `package-lock.json`           | Provides version information for all packages installed into `node_modules` by the npm client. See [npm documentation](https://docs.npmjs.com/files/package-lock.json) for details.                                                                                                                              |
| `src/`                        | Source files for the root-level application project.                                                                                                                                                                                                                                                             |
| `public/`                     | Contains image and other asset files to be served as static files by the dev server and copied as-is when you build your application.                                                                                                                                                                            |
| `node_modules/`               | Installed [npm packages](reference/configs/npm-packages) for the entire workspace. Workspace-wide `node_modules` dependencies are visible to all projects.                                                                                                                                                       |
| `tsconfig.json`               | The base [TypeScript](https://www.typescriptlang.org) configuration for projects in the workspace. All other configuration files inherit from this base file. For more information, see the [relevant TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases). |
-->

워크스페이스 안의 모든 프로젝트는 [설정](reference/configs/workspace-config)을 공유합니다.
워크스페이스의 최상위 수준에는 워크스페이스 전체의 설정 파일, 루트 수준 애플리케이션의 설정 파일, 루트 수준 애플리케이션의 소스와 테스트 파일을 담는 하위 폴더가 있습니다.

| 워크스페이스 설정 파일 | 용도                                                                                                                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.editorconfig`        | 코드 편집기 설정입니다. [EditorConfig](https://editorconfig.org)를 참고하세요.                                                                                                                                                                                            |
| `.gitignore`           | 의도적으로 추적하지 않도록 [Git](https://git-scm.com)이 무시해야 하는 파일을 지정합니다.                                                                                                                                                                                  |
| `README.md`            | 워크스페이스 문서입니다.                                                                                                                                                                                                                                                  |
| `angular.json`         | 각 프로젝트의 빌드, 실행, 테스트 방식에 관한 설정 옵션을 포함하여 워크스페이스의 모든 프로젝트에 대한 CLI 설정을 담습니다. 자세한 내용은 [Angular 워크스페이스 설정](reference/configs/workspace-config)을 참고하세요.                                                    |
| `package.json`         | 워크스페이스의 모든 프로젝트에서 사용할 수 있는 [npm 패키지 의존성](reference/configs/npm-packages)을 설정합니다. 이 파일의 구체적인 형식과 내용은 [npm 문서](https://docs.npmjs.com/files/package.json)를 참고하세요.                                                    |
| `package-lock.json`    | npm 클라이언트가 `node_modules`에 설치한 모든 패키지의 버전 정보를 제공합니다. 자세한 내용은 [npm 문서](https://docs.npmjs.com/files/package-lock.json)를 참고하세요.                                                                                                     |
| `src/`                 | 루트 수준 애플리케이션 프로젝트의 소스 파일입니다.                                                                                                                                                                                                                        |
| `public/`              | 개발 서버가 정적 파일로 제공하고 애플리케이션을 빌드할 때 그대로 복사하는 이미지 및 기타 에셋 파일을 담습니다.                                                                                                                                                            |
| `node_modules/`        | 워크스페이스 전체에 설치한 [npm 패키지](reference/configs/npm-packages)입니다. 워크스페이스 전체의 `node_modules` 의존성은 모든 프로젝트에서 접근할 수 있습니다.                                                                                                          |
| `tsconfig.json`        | 워크스페이스 프로젝트의 기본 [TypeScript](https://www.typescriptlang.org) 설정입니다. 다른 모든 설정 파일은 이 기본 파일을 상속합니다. 자세한 내용은 [관련 TypeScript 문서](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases)를 참고하세요. |

<!--
## Application project files
-->

<a id="application-project-files"></a>

## 애플리케이션 프로젝트 파일

<!--
By default, the CLI command `ng new my-app` creates a workspace folder named "my-app" and generates a new application skeleton in a `src/` folder at the top level of the workspace.
A newly generated application contains source files for a root component and template.

When the workspace file structure is in place, you can use the `ng generate` command on the command line to add functionality and data to the application.
This initial root-level application is the _default app_ for CLI commands (unless you change the default after creating [additional apps](#multiple-projects)).

For a single-application workspace, the `src` subfolder of the workspace contains the source files (application logic, data, and assets) for the root application.
For a multi-project workspace, additional projects in the `projects` folder contain a `project-name/src/` subfolder with the same structure.
-->

기본적으로 CLI 명령어 `ng new my-app`은 "my-app"이라는 워크스페이스 폴더를 만들고, 워크스페이스 최상위 수준의 `src/` 폴더에 새 애플리케이션 골격을 생성합니다.
새로 생성한 애플리케이션에는 루트 컴포넌트와 템플릿의 소스 파일이 포함됩니다.

워크스페이스 파일 구조가 준비되면 명령줄에서 `ng generate` 명령어를 사용해 애플리케이션에 기능과 데이터를 추가할 수 있습니다.
이 초기 루트 수준 애플리케이션은 CLI 명령어의 _기본 앱_ 입니다([추가 앱](#multiple-projects)을 생성한 뒤 기본값을 변경하지 않은 경우).

애플리케이션이 하나인 워크스페이스에서는 워크스페이스의 `src` 하위 폴더에 루트 애플리케이션의 소스 파일(애플리케이션 로직, 데이터, 에셋)이 들어 있습니다.
다중 프로젝트 워크스페이스에서는 `projects` 폴더의 추가 프로젝트마다 같은 구조의 `project-name/src/` 하위 폴더가 있습니다.

<!--
### Application source files
-->

<a id="application-source-files"></a>

### 애플리케이션 소스 파일

<!--
Files at the top level of `src/` support running your application.
Subfolders contain the application source and application-specific configuration.

| Application support files | Purpose                                                                                                                                                                                                                           |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                    | Contains the component files in which your application logic and data are defined. See details below.                                                                                                                             |
| `index.html`              | The main HTML page that is served when someone visits your site. The CLI automatically adds all JavaScript and CSS files when building your app, so you typically don't need to add any `<script>` or`<link>` tags here manually. |
| `main.ts`                 | The main entry point for your application.                                                                                                                                                                                        |
| `styles.css`              | Global CSS styles applied to the entire application.                                                                                                                                                                              |

Inside the `src` folder, the `app` folder contains your project's logic and data.
Angular components, templates, and styles go here.

| `src/app/` files | Purpose                                                                                                                                                                                                                                                                             |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.config.ts`  | Defines the application configuration that tells Angular how to assemble the application. As you add more providers to the app, they should be declared here.<br><br>_Only generated when using the `--standalone` option._                                                         |
| `app.ts`         | Defines the application's root component, named `App`. The view associated with this root component becomes the root of the view hierarchy as you add components and services to your application.                                                                                  |
| `app.html`       | Defines the HTML template associated with `App`.                                                                                                                                                                                                                                    |
| `app.css`        | Defines the CSS stylesheet for `App`.                                                                                                                                                                                                                                               |
| `app.spec.ts`    | Defines a unit test for `App`.                                                                                                                                                                                                                                                      |
| `app-module.ts`  | Defines the root module, named `AppModule`, that tells Angular how to assemble the application. Initially declares only the `App` component. As you add more components to the app, they must be declared here.<br><br>_Only generated when using the `--standalone false` option._ |
| `app.routes.ts`  | Defines the application's routing configuration.                                                                                                                                                                                                                                    |
-->

`src/` 최상위 수준의 파일은 애플리케이션 실행을 지원합니다.
하위 폴더에는 애플리케이션 소스와 애플리케이션별 설정이 들어 있습니다.

| 애플리케이션 지원 파일 | 용도                                                                                                                                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/`                 | 애플리케이션 로직과 데이터를 정의하는 컴포넌트 파일을 담습니다. 자세한 내용은 아래를 참고하세요.                                                                                                        |
| `index.html`           | 사용자가 사이트에 방문할 때 제공되는 기본 HTML 페이지입니다. CLI가 앱을 빌드할 때 모든 JavaScript와 CSS 파일을 자동으로 추가하므로 일반적으로 `<script>`나 `<link>` 태그를 직접 추가할 필요가 없습니다. |
| `main.ts`              | 애플리케이션의 기본 진입점입니다.                                                                                                                                                                       |
| `styles.css`           | 애플리케이션 전체에 적용되는 전역 CSS 스타일입니다.                                                                                                                                                     |

`src` 폴더 안의 `app` 폴더에는 프로젝트의 로직과 데이터가 들어 있습니다.
Angular 컴포넌트, 템플릿, 스타일을 이곳에 저장합니다.

| `src/app/` 파일 | 용도                                                                                                                                                                                                                                          |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.config.ts` | Angular에 애플리케이션 구성 방법을 알려 주는 애플리케이션 설정을 정의합니다. 앱에 프로바이더를 추가할 때는 이곳에 선언해야 합니다.<br><br>_`--standalone` 옵션을 사용할 때만 생성됩니다._                                                     |
| `app.ts`        | `App`이라는 애플리케이션 루트 컴포넌트를 정의합니다. 애플리케이션에 컴포넌트와 서비스를 추가하면 이 루트 컴포넌트에 연결된 뷰가 뷰 계층 구조의 루트가 됩니다.                                                                                 |
| `app.html`      | `App`에 연결된 HTML 템플릿을 정의합니다.                                                                                                                                                                                                      |
| `app.css`       | `App`의 CSS 스타일시트를 정의합니다.                                                                                                                                                                                                          |
| `app.spec.ts`   | `App`의 단위 테스트를 정의합니다.                                                                                                                                                                                                             |
| `app-module.ts` | Angular에 애플리케이션 구성 방법을 알려 주는 `AppModule`이라는 루트 모듈을 정의합니다. 처음에는 `App` 컴포넌트만 선언합니다. 앱에 컴포넌트를 추가할 때는 이곳에 선언해야 합니다.<br><br>_`--standalone false` 옵션을 사용할 때만 생성됩니다._ |
| `app.routes.ts` | 애플리케이션의 라우팅 설정을 정의합니다.                                                                                                                                                                                                      |

<!--
### Application configuration files
-->

<a id="application-configuration-files"></a>

### 애플리케이션 설정 파일

<!--
Application-specific configuration files for the root application reside at the workspace root level.
For a multi-project workspace, project-specific configuration files are in the project root, under `projects/project-name/`.

Project-specific [TypeScript](https://www.typescriptlang.org) configuration files inherit from the workspace-wide `tsconfig.json`.

| Application-specific configuration files | Purpose                                                                                                                                                                                             |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsconfig.app.json`                      | Application-specific [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), including [Angular compiler options](reference/configs/angular-compiler-options). |
| `tsconfig.spec.json`                     | [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for application tests.                                                                                  |
-->

루트 애플리케이션의 애플리케이션별 설정 파일은 워크스페이스 루트 수준에 있습니다.
다중 프로젝트 워크스페이스에서 프로젝트별 설정 파일은 `projects/project-name/` 아래의 프로젝트 루트에 있습니다.

프로젝트별 [TypeScript](https://www.typescriptlang.org) 설정 파일은 워크스페이스 전체의 `tsconfig.json`을 상속합니다.

| 애플리케이션별 설정 파일 | 용도                                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tsconfig.app.json`      | [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)을 포함한 애플리케이션별 [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다. |
| `tsconfig.spec.json`     | 애플리케이션 테스트용 [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다.                                                                       |

<!--
## Multiple projects
-->

<a id="multiple-projects"></a>

## 다중 프로젝트

<!--
A multi-project workspace is suitable for an organization that uses a single repository and global configuration for multiple Angular projects (the "monorepo" model).
A multi-project workspace also supports library development.
-->

다중 프로젝트 워크스페이스는 여러 Angular 프로젝트에 단일 저장소와 전역 설정을 사용하는 조직("모노레포" 모델)에 적합합니다.
다중 프로젝트 워크스페이스는 라이브러리 개발도 지원합니다.

<!--
### Setting up for a multi-project workspace
-->

<a id="setting-up-for-a-multi-project-workspace"></a>

### 다중 프로젝트 워크스페이스 설정하기

<!--
If you intend to have multiple projects in a workspace, you can skip the initial application generation when you create the workspace, and give the workspace a unique name.
The following command creates a workspace with all of the workspace-wide configuration files, but no root-level application.

```shell
ng new my-workspace --no-create-application
```

You can then generate applications and libraries with names that are unique within the workspace.

```shell
cd my-workspace
ng generate application my-app
ng generate library my-lib
```
-->

워크스페이스에 여러 프로젝트를 둘 계획이라면 워크스페이스를 생성할 때 초기 애플리케이션 생성을 건너뛰고 워크스페이스에 고유한 이름을 지정할 수 있습니다.
다음 명령어는 워크스페이스 전체의 설정 파일을 모두 생성하지만 루트 수준 애플리케이션은 생성하지 않습니다.

```shell
ng new my-workspace --no-create-application
```

그런 다음 워크스페이스 안에서 고유한 이름으로 애플리케이션과 라이브러리를 생성할 수 있습니다.

```shell
cd my-workspace
ng generate application my-app
ng generate library my-lib
```

<!--
### Multiple project file structure
-->

<a id="multiple-project-file-structure"></a>

### 다중 프로젝트 파일 구조

<!--
The first explicitly generated application goes into the `projects` folder along with all other projects in the workspace.
Newly generated libraries are also added under `projects`.
When you create projects this way, the file structure of the workspace is entirely consistent with the structure of the [workspace configuration file](reference/configs/workspace-config), `angular.json`.

```markdown
my-workspace/
├── … (workspace-wide configuration files)
└── projects/ (applications and libraries)
├── my-app/ (an explicitly generated application)
│ └── … (application-specific code and configuration)
└── my-lib/ (a generated library)
└── … (library-specific code and configuration)
```
-->

명시적으로 처음 생성한 애플리케이션은 워크스페이스의 다른 모든 프로젝트와 함께 `projects` 폴더에 들어갑니다.
새로 생성한 라이브러리도 `projects` 아래에 추가됩니다.
이 방식으로 프로젝트를 생성하면 워크스페이스의 파일 구조가 [워크스페이스 설정 파일](reference/configs/workspace-config)인 `angular.json`의 구조와 완전히 일치합니다.

```markdown
my-workspace/
├── … (워크스페이스 전체 설정 파일)
└── projects/ (애플리케이션과 라이브러리)
├── my-app/ (명시적으로 생성한 애플리케이션)
│ └── … (애플리케이션별 코드와 설정)
└── my-lib/ (생성한 라이브러리)
└── … (라이브러리별 코드와 설정)
```

<!--
## Library project files
-->

<a id="library-project-files"></a>

## 라이브러리 프로젝트 파일

<!--
When you generate a library using the CLI (with a command such as `ng generate library my-lib`), the generated files go into the `projects/` folder of the workspace.
For more information about creating your own libraries, see [Creating Libraries](tools/libraries/creating-libraries).

Unlike an application, a library has its own `package.json` configuration file.

Under the `projects/` folder, the `my-lib` folder contains your library code.

| Library source files     | Purpose                                                                                                                                                                                         |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib`                | Contains your library project's logic and data. Like an application project, a library project can contain components, services, modules, directives, and pipes.                                |
| `src/public-api.ts`      | Specifies all files that are exported from your library.                                                                                                                                        |
| `ng-package.json`        | Configuration file used by [ng-packagr](https://github.com/ng-packagr/ng-packagr) for building your library.                                                                                    |
| `package.json`           | Configures [npm package dependencies](reference/configs/npm-packages) that are required for this library.                                                                                       |
| `tsconfig.lib.json`      | Library-specific [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), including [Angular compiler options](reference/configs/angular-compiler-options). |
| `tsconfig.lib.prod.json` | Library-specific [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) that is used when building the library in production mode.                         |
| `tsconfig.spec.json`     | [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for the library's unit tests.                                                                       |
-->

CLI로 라이브러리를 생성하면(`ng generate library my-lib`와 같은 명령어 사용), 생성된 파일은 워크스페이스의 `projects/` 폴더에 들어갑니다.
직접 라이브러리를 만드는 방법은 [라이브러리 만들기](tools/libraries/creating-libraries)를 참고하세요.

라이브러리는 애플리케이션과 달리 별도의 `package.json` 설정 파일을 갖습니다.

`projects/` 아래의 `my-lib` 폴더에는 라이브러리 코드가 들어 있습니다.

| 라이브러리 소스 파일     | 용도                                                                                                                                                                                |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib`                | 라이브러리 프로젝트의 로직과 데이터를 담습니다. 애플리케이션 프로젝트와 마찬가지로 라이브러리 프로젝트에도 컴포넌트, 서비스, 모듈, 디렉티브, 파이프를 포함할 수 있습니다.           |
| `src/public-api.ts`      | 라이브러리에서 내보내는 모든 파일을 지정합니다.                                                                                                                                     |
| `ng-package.json`        | 라이브러리를 빌드할 때 [ng-packagr](https://github.com/ng-packagr/ng-packagr)가 사용하는 설정 파일입니다.                                                                           |
| `package.json`           | 이 라이브러리에 필요한 [npm 패키지 의존성](reference/configs/npm-packages)을 설정합니다.                                                                                            |
| `tsconfig.lib.json`      | [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)을 포함한 라이브러리별 [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다. |
| `tsconfig.lib.prod.json` | 라이브러리를 프로덕션 모드로 빌드할 때 사용하는 라이브러리별 [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다.                              |
| `tsconfig.spec.json`     | 라이브러리 단위 테스트용 [TypeScript 설정](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)입니다.                                                                  |
