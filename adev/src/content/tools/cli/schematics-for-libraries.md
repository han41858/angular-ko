<!--
# Schematics for libraries
-->

<a id="schematics-for-libraries"></a>

# 라이브러리용 스키매틱

<!--
When you create an Angular library, you can provide and package it with schematics that integrate it with the Angular CLI.
With your schematics, your users can use `ng add` to install an initial version of your library,
`ng generate` to create artifacts defined in your library, and `ng update` to adjust their project for a new version of your library that introduces breaking changes.

All three types of schematics can be part of a collection that you package with your library.
-->

Angular 라이브러리를 만들 때 Angular CLI와 통합하는 스키매틱을 함께 패키지로 제공할 수 있습니다.
스키매틱을 제공하면 사용자는 `ng add`로 라이브러리의 초기 버전을 설치하고, `ng generate`로 라이브러리에 정의된 구성 요소를 생성하고, `ng update`로 호환성이 깨지는 변경을 포함한 새 라이브러리 버전에 맞춰 프로젝트를 수정할 수 있습니다.

이 세 가지 스키매틱 유형을 모두 컬렉션에 포함해서 라이브러리와 함께 배포할 수 있습니다.

<!--
## Creating a schematics collection
-->

<a id="creating-a-schematics-collection"></a>

## 스키매틱 컬렉션 생성하기

<!--
To start a collection, you need to create the schematic files.
The following steps show you how to add initial support without modifying any project files.

1. In your library's root folder, create a `schematics` folder.
1. In the `schematics/` folder, create an `ng-add` folder for your first schematic.
1. At the root level of the `schematics` folder, create a `collection.json` file.
1. Edit the `collection.json` file to define the initial schema for your collection.

   <docs-code header="projects/my-lib/schematics/collection.json (Schematics Collection)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/collection.1.json"/>
   - The `$schema` path is relative to the Angular Devkit collection schema.
   - The `schematics` object describes the named schematics that are part of this collection.
   - The first entry is for a schematic named `ng-add`.
     It contains the description, and points to the factory function that is called when your schematic is executed.

1. In your library project's `package.json` file, add a "schematics" entry with the path to your schema file.
   The Angular CLI uses this entry to find named schematics in your collection when it runs commands.

<docs-code header="projects/my-lib/package.json (Schematics Collection Reference)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json" region="collection"/>

The initial schema that you have created tells the CLI where to find the schematic that supports the `ng add` command.
Now you are ready to create that schematic.
-->

컬렉션을 시작하려면 스키매틱 파일을 생성해야 합니다.
다음 단계에서는 프로젝트 파일을 수정하는 동작 없이 초기 지원 구조를 추가합니다.

1. 라이브러리의 최상위 폴더에 `schematics` 폴더를 만듭니다.
1. `schematics/` 폴더에 첫 번째 스키매틱을 위한 `ng-add` 폴더를 만듭니다.
1. `schematics` 폴더의 최상위에 `collection.json` 파일을 만듭니다.
1. `collection.json` 파일을 편집해서 컬렉션의 초기 스키마를 정의합니다.

   <docs-code header="projects/my-lib/schematics/collection.json (스키매틱 컬렉션)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/collection.1.json"/>
   - `$schema` 경로는 Angular Devkit 컬렉션 스키마를 가리키는 상대 경로입니다.
   - `schematics` 객체는 이 컬렉션에 포함된 이름 있는 스키매틱을 설명합니다.
   - 첫 번째 항목은 `ng-add`라는 스키매틱입니다.
     설명을 포함하며 스키매틱 실행 시 호출할 팩토리 함수를 가리킵니다.

1. 라이브러리 프로젝트의 `package.json` 파일에 스키마 파일 경로를 담은 "schematics" 항목을 추가합니다.
   Angular CLI는 명령어를 실행할 때 이 항목을 사용해서 컬렉션에서 해당 이름의 스키매틱을 찾습니다.

<docs-code header="projects/my-lib/package.json (스키매틱 컬렉션 참조)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json" region="collection"/>

생성한 초기 스키마는 `ng add` 명령어를 지원하는 스키매틱의 위치를 CLI에 알려줍니다.
이제 해당 스키매틱을 만들 준비가 되었습니다.

<!--
## Providing installation support
-->

<a id="providing-installation-support"></a>

## 설치 기능 지원하기

<!--
A schematic for the `ng add` command can enhance the initial installation process for your users.
The following steps define this type of schematic.

1. Go to the `<lib-root>/schematics/ng-add` folder.
1. Create the main file, `index.ts`.
1. Open `index.ts` and add the source code for your schematic factory function.

<docs-code header="projects/my-lib/schematics/ng-add/index.ts (ng-add Rule Factory)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/ng-add/index.ts"/>

The Angular CLI will install the latest version of the library automatically, and this example is taking it a step further by adding the `MyLibModule` to the root of the application. The `addRootImport` function accepts a callback that needs to return a code block. You can write any code inside of the string tagged with the `code` function and any external symbol have to be wrapped with the `external` function to ensure that the appropriate import statements are generated.
-->

`ng add` 명령어용 스키매틱을 제공하면 사용자의 초기 설치 과정을 개선할 수 있습니다.
다음 단계에 따라 이 스키매틱을 정의합니다.

1. `<lib-root>/schematics/ng-add` 폴더로 이동합니다.
1. 주요 파일인 `index.ts`를 만듭니다.
1. `index.ts`를 열고 스키매틱 팩토리 함수의 소스 코드를 추가합니다.

<docs-code header="projects/my-lib/schematics/ng-add/index.ts (ng-add 규칙 팩토리)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/ng-add/index.ts"/>

Angular CLI는 라이브러리의 최신 버전을 자동으로 설치합니다.
이 예제에서는 여기서 더 나아가 애플리케이션의 최상위에 `MyLibModule`을 추가합니다.
`addRootImport` 함수는 코드 블록을 반환하는 콜백을 받습니다.
`code` 함수로 태그한 문자열 안에는 어떤 코드든 작성할 수 있으며, 외부 심볼은 적절한 import 구문이 생성되도록 반드시 `external` 함수로 감싸야 합니다.

<!--
### Define dependency type
-->

<a id="define-dependency-type"></a>

### 의존성 유형 정의하기

<!--
Use the `save` option of `ng-add` to configure if the library should be added to the `dependencies`, the `devDependencies`, or not saved at all in the project's `package.json` configuration file.

<docs-code header="projects/my-lib/package.json (ng-add Reference)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json" region="ng-add"/>

Possible values are:

| Values              | Details                                 |
| :------------------ | :-------------------------------------- |
| `false`             | Don't add the package to `package.json` |
| `true`              | Add the package to the dependencies     |
| `"dependencies"`    | Add the package to the dependencies     |
| `"devDependencies"` | Add the package to the devDependencies  |
-->

`ng-add`의 `save` 옵션으로 프로젝트의 `package.json` 설정 파일에서 라이브러리를 `dependencies`나 `devDependencies`에 추가할지, 아예 저장하지 않을지 지정할 수 있습니다.

<docs-code header="projects/my-lib/package.json (ng-add 참조)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json" region="ng-add"/>

사용할 수 있는 값은 다음과 같습니다:

| 값                  | 설명                                         |
| :------------------ | :------------------------------------------- |
| `false`             | 패키지를 `package.json`에 추가하지 않습니다. |
| `true`              | 패키지를 dependencies에 추가합니다.          |
| `"dependencies"`    | 패키지를 dependencies에 추가합니다.          |
| `"devDependencies"` | 패키지를 devDependencies에 추가합니다.       |

<!--
## Building your schematics
-->

<a id="building-your-schematics"></a>

## 스키매틱 빌드하기

<!--
To bundle your schematics together with your library, you must configure the library to build the schematics separately, then add them to the bundle.
You must build your schematics _after_ you build your library, so they are placed in the correct directory.

- Your library needs a custom TypeScript configuration file with instructions on how to compile your schematics into your distributed library
- To add the schematics to the library bundle, add scripts to the library's `package.json` file

Assume you have a library project `my-lib` in your Angular workspace.
To tell the library how to build the schematics, add a `tsconfig.schematics.json` file next to the generated `tsconfig.lib.json` file that configures the library build.

1. Edit the `tsconfig.schematics.json` file to add the following content.

   <docs-code header="projects/my-lib/tsconfig.schematics.json (TypeScript Config)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/tsconfig.schematics.json"/>

   | Options   | Details                                                                                                          |
   | :-------- | :--------------------------------------------------------------------------------------------------------------- |
   | `rootDir` | Specifies that your `schematics` folder contains the input files to be compiled.                                 |
   | `outDir`  | Maps to the library's output folder. By default, this is the `dist/my-lib` folder at the root of your workspace. |

1. To make sure your schematics source files get compiled into the library bundle, add the following scripts to the `package.json` file in your library project's root folder \(`projects/my-lib`\).

   <docs-code header="projects/my-lib/package.json (Build Scripts)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json"/>
   - The `build` script compiles your schematic using the custom `tsconfig.schematics.json` file
   - The `postbuild` script copies the schematic files after the `build` script completes
   - Both the `build` and the `postbuild` scripts require the `copyfiles` and `typescript` dependencies.
     To install the dependencies, navigate to the path defined in `devDependencies` and run `npm install` before you run the scripts.
-->

라이브러리와 함께 스키매틱을 묶으려면 스키매틱을 별도로 빌드한 뒤 번들에 추가하도록 라이브러리를 설정해야 합니다.
올바른 디렉터리에 배치되도록 라이브러리를 빌드한 _후에_ 스키매틱을 빌드해야 합니다.

- 라이브러리에는 스키매틱을 컴파일해서 배포 라이브러리에 포함하는 방법을 지정한 커스텀 TypeScript 설정 파일이 필요합니다.
- 스키매틱을 라이브러리 번들에 추가하려면 라이브러리의 `package.json` 파일에 스크립트를 추가합니다.

Angular 워크스페이스에 `my-lib`라는 라이브러리 프로젝트가 있다고 가정해 봅시다.
스키매틱 빌드 방법을 지정하려면 라이브러리 빌드를 설정하는 기존 `tsconfig.lib.json` 파일 옆에 `tsconfig.schematics.json` 파일을 추가하세요.

1. `tsconfig.schematics.json` 파일에 다음 내용을 추가합니다.

   <docs-code header="projects/my-lib/tsconfig.schematics.json (TypeScript 설정)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/tsconfig.schematics.json"/>

   | 옵션      | 설명                                                                                          |
   | :-------- | :-------------------------------------------------------------------------------------------- |
   | `rootDir` | 컴파일할 입력 파일이 `schematics` 폴더에 있음을 지정합니다.                                   |
   | `outDir`  | 라이브러리의 출력 폴더에 대응합니다. 기본값은 워크스페이스 최상위의 `dist/my-lib` 폴더입니다. |

1. 스키매틱 소스 파일이 컴파일되어 라이브러리 번들에 포함되도록 라이브러리 프로젝트의 최상위 폴더(`projects/my-lib`)에 있는 `package.json` 파일에 다음 스크립트를 추가합니다.

   <docs-code header="projects/my-lib/package.json (빌드 스크립트)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/package.json"/>
   - `build` 스크립트는 커스텀 `tsconfig.schematics.json` 파일로 스키매틱을 컴파일합니다.
   - `postbuild` 스크립트는 `build` 스크립트가 완료된 후 스키매틱 파일을 복사합니다.
   - `build`와 `postbuild` 스크립트에는 `copyfiles`와 `typescript` 의존성이 필요합니다.
     의존성을 설치하려면 `devDependencies`가 정의된 경로로 이동해서 스크립트를 실행하기 전에 `npm install`을 실행하세요.

<!--
## Providing generation support
-->

<a id="providing-generation-support"></a>

## 생성 기능 지원하기

<!--
You can add a named schematic to your collection that lets your users use the `ng generate` command to create an artifact that is defined in your library.

We'll assume that your library defines a service, `my-service`, that requires some setup.
You want your users to be able to generate it using the following CLI command.

```shell

ng generate my-lib:my-service

```

To begin, create a new subfolder, `my-service`, in the `schematics` folder.
-->

컬렉션에 이름이 있는 스키매틱을 추가하면 사용자가 `ng generate` 명령어로 라이브러리에 정의된 구성 요소를 생성할 수 있습니다.

라이브러리에 설정 작업이 필요한 `my-service`라는 서비스가 정의되어 있다고 가정해 봅시다.
사용자가 다음 CLI 명령어로 이 서비스를 생성할 수 있도록 만들려고 합니다.

```shell

ng generate my-lib:my-service

```

먼저 `schematics` 폴더에 `my-service` 하위 폴더를 만드세요.

<!--
### Configure the new schematic
-->

<a id="configure-the-new-schematic"></a>

### 새 스키매틱 설정하기

<!--
When you add a schematic to the collection, you have to point to it in the collection's schema, and provide configuration files to define options that a user can pass to the command.

1. Edit the `schematics/collection.json` file to point to the new schematic subfolder, and include a pointer to a schema file that specifies inputs for the new schematic.

   <docs-code header="projects/my-lib/schematics/collection.json (Schematics Collection)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/collection.json"/>

1. Go to the `<lib-root>/schematics/my-service` folder.
1. Create a `schema.json` file and define the available options for the schematic.

   <docs-code header="projects/my-lib/schematics/my-service/schema.json (Schematic JSON Schema)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/schema.json"/>
   - _id_: A unique ID for the schema in the collection.
   - _title_: A human-readable description of the schema.
   - _type_: A descriptor for the type provided by the properties.
   - _properties_: An object that defines the available options for the schematic.

   Each option associates key with a type, description, and optional alias.
   The type defines the shape of the value you expect, and the description is displayed when the user requests usage help for your schematic.

   See the workspace schema for additional customizations for schematic options.

1. Create a `schema.ts` file and define an interface that stores the values of the options defined in the `schema.json` file.

   <docs-code header="projects/my-lib/schematics/my-service/schema.ts (Schematic Interface)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/schema.ts"/>

   | Options | Details                                                                                                                                     |
   | :------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
   | name    | The name you want to provide for the created service.                                                                                       |
   | path    | Overrides the path provided to the schematic. The default path value is based on the current working directory.                             |
   | project | Provides a specific project to run the schematic on. In the schematic, you can provide a default if the option is not provided by the user. |
-->

컬렉션에 스키매틱을 추가할 때는 컬렉션 스키마에서 해당 스키매틱을 가리키도록 하고, 사용자가 명령어에 전달할 수 있는 옵션을 정의하는 설정 파일을 제공해야 합니다.

1. `schematics/collection.json` 파일을 수정해서 새 스키매틱 하위 폴더를 가리키도록 하고, 새 스키매틱의 입력을 지정하는 스키마 파일 참조도 추가합니다.

   <docs-code header="projects/my-lib/schematics/collection.json (스키매틱 컬렉션)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/collection.json"/>

1. `<lib-root>/schematics/my-service` 폴더로 이동합니다.
1. `schema.json` 파일을 만들고 스키매틱에서 사용할 수 있는 옵션을 정의합니다.

   <docs-code header="projects/my-lib/schematics/my-service/schema.json (스키매틱 JSON 스키마)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/schema.json"/>
   - _id_: 컬렉션 안에서 스키마를 식별하는 고유 ID입니다.
   - _title_: 사람이 읽을 수 있는 스키마 설명입니다.
   - _type_: 프로퍼티가 제공하는 타입을 설명합니다.
   - _properties_: 스키매틱에서 사용할 수 있는 옵션을 정의하는 객체입니다.

   각 옵션은 키에 타입, 설명, 선택적인 별칭을 연결합니다.
   타입은 기대하는 값의 형태를 정의하고, 설명은 사용자가 스키매틱 사용법에 대한 도움말을 요청할 때 표시됩니다.

   스키매틱 옵션을 추가로 구성하는 방법은 워크스페이스 스키마를 참고하세요.

1. `schema.ts` 파일을 만들고 `schema.json`에 정의된 옵션 값을 저장하는 인터페이스를 정의합니다.

   <docs-code header="projects/my-lib/schematics/my-service/schema.ts (스키매틱 인터페이스)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/schema.ts"/>

   | 옵션    | 설명                                                                                                                    |
   | :------ | :---------------------------------------------------------------------------------------------------------------------- |
   | name    | 생성할 서비스에 지정할 이름입니다.                                                                                      |
   | path    | 스키매틱에 제공되는 경로를 덮어씁니다. 기본 경로 값은 현재 작업 디렉터리를 기준으로 합니다.                             |
   | project | 스키매틱을 실행할 특정 프로젝트를 지정합니다. 사용자가 옵션을 지정하지 않으면 스키매틱에서 기본값을 제공할 수 있습니다. |

<!--
### Add template files
-->

<a id="add-template-files"></a>

### 템플릿 파일 추가하기

<!--
To add artifacts to a project, your schematic needs its own template files.
Schematic templates support special syntax to execute code and variable substitution.

1. Create a `files/` folder inside the `schematics/my-service/` folder.
1. Create a file named `__name@dasherize__.service.ts.template` that defines a template to use for generating files.
   This template will generate a service that already has Angular's `HttpClient` injected into an `http` property.

   ```ts {header:projects/my-lib/schematics/my-service/files/__name@dasherize__.service.ts.template (Schematic Template)}

   import { Service } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Service()
   export class <%= classify(name) %>Service {
      private http = inject(HttpClient);
   }

   ```

   - The `classify` and `dasherize` methods are utility functions that your schematic uses to transform your source template and filename.
   - The `name` is provided as a property from your factory function.
     It is the same `name` you defined in the schema.
-->

프로젝트에 구성 요소를 추가하려면 스키매틱에 자체 템플릿 파일이 필요합니다.
스키매틱 템플릿은 코드 실행과 변수 치환을 위한 특별한 문법을 지원합니다.

1. `schematics/my-service/` 폴더 안에 `files/` 폴더를 만듭니다.
1. `__name@dasherize__.service.ts.template` 파일을 만들고 파일 생성에 사용할 템플릿을 정의합니다.
   이 템플릿은 Angular의 `HttpClient`가 `http` 프로퍼티에 이미 주입된 서비스를 생성합니다.

   ```ts {header:projects/my-lib/schematics/my-service/files/__name@dasherize__.service.ts.template (Schematic Template)}

   import { Service } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Service()
   export class <%= classify(name) %>Service {
      private http = inject(HttpClient);
   }

   ```

   - `classify`와 `dasherize` 메서드는 스키매틱에서 소스 템플릿과 파일명을 변환할 때 사용하는 유틸리티 함수입니다.
   - `name`은 팩토리 함수에서 프로퍼티로 제공합니다.
     스키마에서 정의한 `name`과 같은 값입니다.

<!--
### Add the factory function
-->

<a id="add-the-factory-function"></a>

### 팩토리 함수 추가하기

<!--
Now that you have the infrastructure in place, you can define the main function that performs the modifications you need in the user's project.

The Schematics framework provides a file templating system, which supports both path and content templates.
The system operates on placeholders defined inside files or paths that loaded in the input `Tree`.
It fills these in using values passed into the `Rule`.

For details of these data structures and syntax, see the [Schematics README](https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/schematics/README.md).

1. Create the main file `index.ts` and add the source code for your schematic factory function.
1. First, import the schematics definitions you will need.
   The Schematics framework offers many utility functions to create and use rules when running a schematic.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Imports)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schematics-imports"/>

1. Import the defined schema interface that provides the type information for your schematic's options.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Schema Import)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schema-imports"/>

1. To build up the generation schematic, start with an empty rule factory.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Initial Rule)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.1.ts" region="factory"/>

This rule factory returns the tree without modification.
The options are the option values passed through from the `ng generate` command.
-->

기반 구조를 마련했으므로 이제 사용자 프로젝트에 필요한 변경을 수행하는 주요 함수를 정의할 수 있습니다.

스키매틱 프레임워크는 경로와 콘텐츠 템플릿을 모두 지원하는 파일 템플릿 시스템을 제공합니다.
이 시스템은 입력 `Tree`에 로드된 파일이나 경로 내부의 플레이스홀더를 처리합니다.
`Rule`에 전달한 값으로 플레이스홀더를 채웁니다.

이 자료 구조와 문법에 대한 자세한 내용은 [Schematics README](https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/schematics/README.md)를 참고하세요.

1. 주요 파일인 `index.ts`를 만들고 스키매틱 팩토리 함수의 소스 코드를 추가합니다.
1. 먼저 필요한 스키매틱 정의를 가져옵니다.
   스키매틱 프레임워크는 스키매틱 실행 과정에서 규칙을 만들고 사용하는 여러 유틸리티 함수를 제공합니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (가져오기)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schematics-imports"/>

1. 스키매틱 옵션의 타입 정보를 제공하는 스키마 인터페이스를 가져옵니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (스키마 가져오기)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schema-imports"/>

1. 빈 규칙 팩토리에서 시작해서 생성 스키매틱을 구현합니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (초기 규칙)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.1.ts" region="factory"/>

이 규칙 팩토리는 트리를 수정하지 않고 그대로 반환합니다.
옵션에는 `ng generate` 명령어로 전달된 옵션 값이 들어 있습니다.

<!--
## Define a generation rule
-->

<a id="define-a-generation-rule"></a>

## 생성 규칙 정의하기

<!--
You now have the framework in place for creating the code that actually modifies the user's application to set it up for the service defined in your library.

The Angular workspace where the user installed your library contains multiple projects \(applications and libraries\).
The user can specify the project on the command line, or let it default.
In either case, your code needs to identify the specific project to which this schematic is being applied, so that you can retrieve information from the project configuration.

Do this using the `Tree` object that is passed in to the factory function.
The `Tree` methods give you access to the complete file tree in your workspace, letting you read and write files during the execution of the schematic.
-->

이제 사용자 애플리케이션을 실제로 수정해서 라이브러리에 정의된 서비스를 설정하는 코드를 작성할 기반이 마련되었습니다.

사용자가 라이브러리를 설치한 Angular 워크스페이스에는 애플리케이션과 라이브러리로 이루어진 여러 프로젝트가 있습니다.
사용자는 명령줄에서 프로젝트를 지정하거나 기본값을 사용할 수 있습니다.
어느 경우든 프로젝트 설정에서 정보를 가져올 수 있도록 스키매틱이 적용되는 특정 프로젝트를 코드에서 식별해야 합니다.

팩토리 함수에 전달되는 `Tree` 객체로 이 작업을 수행합니다.
`Tree`의 메서드로 워크스페이스의 전체 파일 트리에 접근할 수 있으므로 스키매틱 실행 중에 파일을 읽고 쓸 수 있습니다.

<!--
### Get the project configuration
-->

<a id="get-the-project-configuration"></a>

### 프로젝트 설정 가져오기

<!--
1. To determine the destination project, use the `workspaces.readWorkspace` method to read the contents of the workspace configuration file, `angular.json`.
   To use `workspaces.readWorkspace` you need to create a `workspaces.WorkspaceHost` from the `Tree`.
   Add the following code to your factory function.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Schema Import)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="workspace"/>

   Be sure to check that the context exists and throw the appropriate error.

1. Now that you have the project name, use it to retrieve the project-specific configuration information.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Project)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="project-info"/>

   The `workspace.projects` object contains all the project-specific configuration information.

1. The `options.path` determines where the schematic template files are moved to once the schematic is applied.

   The `path` option in the schematic's schema is substituted by default with the current working directory.
   If the `path` is not defined, use the `sourceRoot` from the project configuration along with the `projectType`.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Project Info)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="path"/>
-->

1. 대상 프로젝트를 확인하려면 `workspaces.readWorkspace` 메서드로 워크스페이스 설정 파일 `angular.json`의 내용을 읽습니다.
   `workspaces.readWorkspace`를 사용하려면 `Tree`를 바탕으로 `workspaces.WorkspaceHost`를 생성해야 합니다.
   팩토리 함수에 다음 코드를 추가하세요.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (스키마 가져오기)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="workspace"/>

   컨텍스트가 존재하는지 반드시 확인하고 적절한 오류를 발생시키세요.

1. 프로젝트 이름을 확인했으므로 이를 사용해서 프로젝트별 설정 정보를 가져옵니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (프로젝트)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="project-info"/>

   `workspace.projects` 객체에는 모든 프로젝트별 설정 정보가 들어 있습니다.

1. `options.path`는 스키매틱 적용 후 템플릿 파일을 이동할 위치를 결정합니다.

   스키매틱 스키마의 `path` 옵션은 기본적으로 현재 작업 디렉터리로 대체됩니다.
   `path`가 정의되지 않았다면 프로젝트 설정의 `sourceRoot`와 `projectType`을 사용하세요.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (프로젝트 정보)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="path"/>

<!--
### Define the rule
-->

<a id="define-the-rule"></a>

### 규칙 정의하기

<!--
A `Rule` can use external template files, transform them, and return another `Rule` object with the transformed template.
Use the templating to generate any custom files required for your schematic.

1. Add the following code to your factory function.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Template transform)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="template"/>

   | Methods            | Details                                                                                                                                                                                                                                          |
   | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `apply()`          | Applies multiple rules to a source and returns the transformed source. It takes 2 arguments, a source and an array of rules.                                                                                                                     |
   | `url()`            | Reads source files from your filesystem, relative to the schematic.                                                                                                                                                                              |
   | `applyTemplates()` | Receives an argument of methods and properties you want make available to the schematic template and the schematic filenames. It returns a `Rule`. This is where you define the `classify()` and `dasherize()` methods, and the `name` property. |
   | `classify()`       | Takes a value and returns the value in title case. For example, if the provided name is `my service`, it is returned as `MyService`.                                                                                                             |
   | `dasherize()`      | Takes a value and returns the value in dashed and lowercase. For example, if the provided name is MyService, it is returned as `my-service`.                                                                                                     |
   | `move()`           | Moves the provided source files to their destination when the schematic is applied.                                                                                                                                                              |

1. Finally, the rule factory must return a rule.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (Chain Rule)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="chain"/>

   The `chain()` method lets you combine multiple rules into a single rule, so that you can perform multiple operations in a single schematic.
   Here you are only merging the template rules with any code executed by the schematic.

See a complete example of the following schematic rule function.

<docs-code header="projects/my-lib/schematics/my-service/index.ts" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts"/>

For more information about rules and utility methods, see [Provided Rules](https://github.com/angular/angular-cli/tree/main/packages/angular_devkit/schematics#provided-rules).
-->

`Rule`은 외부 템플릿 파일을 가져와 변환한 뒤 변환된 템플릿을 사용하는 다른 `Rule` 객체를 반환할 수 있습니다.
템플릿을 활용해서 스키매틱에 필요한 커스텀 파일을 생성하세요.

1. 팩토리 함수에 다음 코드를 추가합니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (템플릿 변환)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="template"/>

   | 메서드             | 설명                                                                                                                                                                 |
   | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `apply()`          | 소스에 여러 규칙을 적용하고 변환된 소스를 반환합니다. 소스와 규칙 배열의 두 인자를 받습니다.                                                                         |
   | `url()`            | 스키매틱 기준 상대 경로로 파일 시스템에서 소스 파일을 읽습니다.                                                                                                      |
   | `applyTemplates()` | 스키매틱 템플릿과 파일명에서 사용할 메서드와 프로퍼티를 인자로 받고 `Rule`을 반환합니다. 여기에서 `classify()`, `dasherize()` 메서드와 `name` 프로퍼티를 지정합니다. |
   | `classify()`       | 값을 받아 각 단어의 첫 글자를 대문자로 연결한 형태로 반환합니다. 예를 들어 `my service`를 전달하면 `MyService`를 반환합니다.                                         |
   | `dasherize()`      | 값을 받아 소문자와 하이픈으로 구성된 형태로 반환합니다. 예를 들어 MyService를 전달하면 `my-service`를 반환합니다.                                                    |
   | `move()`           | 스키매틱을 적용할 때 제공된 소스 파일을 대상 위치로 이동합니다.                                                                                                      |

1. 마지막으로 규칙 팩토리는 규칙을 반환해야 합니다.

   <docs-code header="projects/my-lib/schematics/my-service/index.ts (규칙 연결)" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="chain"/>

   `chain()` 메서드로 여러 규칙을 하나로 묶으면 스키매틱 하나에서 여러 작업을 수행할 수 있습니다.
   여기서는 템플릿 규칙을 스키매틱에서 실행하는 코드와 병합하기만 합니다.

다음 스키매틱 규칙 함수의 전체 예제를 확인하세요.

<docs-code header="projects/my-lib/schematics/my-service/index.ts" path="adev/src/content/examples/schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts"/>

규칙과 유틸리티 메서드에 대한 자세한 내용은 [제공되는 규칙](https://github.com/angular/angular-cli/tree/main/packages/angular_devkit/schematics#provided-rules)을 참고하세요.

<!--
## Running your library schematic
-->

<a id="running-your-library-schematic"></a>

## 라이브러리 스키매틱 실행하기

<!--
After you build your library and schematics, you can install the schematics collection to run against your project.
The following steps show you how to generate a service using the schematic you created earlier.
-->

라이브러리와 스키매틱을 빌드한 뒤 스키매틱 컬렉션을 설치해서 프로젝트에 실행할 수 있습니다.
다음 단계에서는 앞에서 만든 스키매틱으로 서비스를 생성합니다.

<!--
### Build your library and schematics
-->

<a id="build-your-library-and-schematics"></a>

### 라이브러리와 스키매틱 빌드하기

<!--
From the root of your workspace, run the `ng build` command for your library.

```shell

ng build my-lib

```

Then, you change into your library directory to build the schematic

```shell

cd projects/my-lib
npm run build

```
-->

워크스페이스의 최상위에서 라이브러리를 대상으로 `ng build` 명령어를 실행합니다.

```shell

ng build my-lib

```

그런 다음 라이브러리 디렉터리로 이동해서 스키매틱을 빌드합니다.

```shell

cd projects/my-lib
npm run build

```

<!--
### Link the library
-->

<a id="link-the-library"></a>

### 라이브러리 연결하기

<!--
Your library and schematics are packaged and placed in the `dist/my-lib` folder at the root of your workspace.
For running the schematic, you need to link the library into your `node_modules` folder.
From the root of your workspace, run the `npm link` command with the path to your distributable library.

```shell

npm link dist/my-lib

```
-->

라이브러리와 스키매틱은 패키지로 묶여 워크스페이스 최상위의 `dist/my-lib` 폴더에 배치됩니다.
스키매틱을 실행하려면 라이브러리를 `node_modules` 폴더에 연결해야 합니다.
워크스페이스 최상위에서 배포 가능한 라이브러리의 경로를 지정해서 `npm link` 명령어를 실행하세요.

```shell

npm link dist/my-lib

```

<!--
### Run the schematic
-->

<a id="run-the-schematic"></a>

### 스키매틱 실행하기

<!--
Now that your library is installed, run the schematic using the `ng generate` command.

```shell

ng generate my-lib:my-service --name my-data

```

In the console, you see that the schematic was run and the `my-data.service.ts` file was created in your application folder.

```shell {hideCopy}

CREATE src/app/my-data.service.ts (208 bytes)

```
-->

라이브러리 설치를 마쳤으므로 `ng generate` 명령어로 스키매틱을 실행합니다.

```shell

ng generate my-lib:my-service --name my-data

```

콘솔에서 스키매틱이 실행되고 애플리케이션 폴더에 `my-data.service.ts` 파일이 생성된 것을 확인할 수 있습니다.

```shell {hideCopy}

CREATE src/app/my-data.service.ts (208 bytes)

```
