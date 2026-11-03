<!--
# Authoring schematics
-->

<a id="authoring-schematics"></a>

# 스키매틱 작성하기

<!--
You can create your own schematics to operate on Angular projects.
Library developers typically package schematics with their libraries to integrate them with the Angular CLI.
You can also create stand-alone schematics to manipulate the files and constructs in Angular applications as a way of customizing them for your development environment and making them conform to your standards and constraints.
Schematics can be chained, running other schematics to perform complex operations.

Manipulating the code in an application has the potential to be both very powerful and correspondingly dangerous.
For example, creating a file that already exists would be an error, and if it was applied immediately, it would discard all the other changes applied so far.
The Angular Schematics tooling guards against side effects and errors by creating a virtual file system.
A schematic describes a pipeline of transformations that can be applied to the virtual file system.
When a schematic runs, the transformations are recorded in memory, and only applied in the real file system once they're confirmed to be valid.
-->

Angular 프로젝트에 작업을 수행하는 스키매틱을 직접 만들 수 있습니다.
라이브러리 개발자는 보통 Angular CLI와 통합하기 위해 라이브러리에 스키매틱을 함께 제공합니다.
독립적인 스키매틱으로 Angular 애플리케이션의 파일과 구성 요소를 조작해서 개발 환경에 맞게 구성하거나 조직의 표준과 제약을 따르게 할 수도 있습니다.
스키매틱은 다른 스키매틱을 연이어 실행해서 복잡한 작업을 수행할 수 있습니다.

애플리케이션의 코드를 조작하는 기능은 매우 강력하지만 그만큼 위험할 수 있습니다.
예를 들어 이미 존재하는 파일을 생성하면 오류이며, 이를 즉시 적용한다면 지금까지 적용한 다른 변경 사항이 모두 사라질 수 있습니다.
Angular 스키매틱 도구는 가상 파일 시스템을 생성해서 부수 효과와 오류를 방지합니다.
스키매틱은 이 가상 파일 시스템에 적용할 수 있는 변환 과정의 파이프라인을 정의합니다.
스키매틱이 실행되면 변환 내용을 메모리에 기록하고, 유효하다고 확인된 후에만 실제 파일 시스템에 적용합니다.

<!--
## Schematics concepts
-->

<a id="schematics-concepts"></a>

## 스키매틱의 개념

<!--
The public API for schematics defines classes that represent the basic concepts.

- The virtual file system is represented by a `Tree`.
  The `Tree` data structure contains a _base_ \(a set of files that already exists\) and a _staging area_ \(a list of changes to be applied to the base\).
  When making modifications, you don't actually change the base, but add those modifications to the staging area.

- A `Rule` object defines a function that takes a `Tree`, applies transformations, and returns a new `Tree`.
  The main file for a schematic, `index.ts`, defines a set of rules that implement the schematic's logic.

- A transformation is represented by an `Action`.
  There are four action types: `Create`, `Rename`, `Overwrite`, and `Delete`.

- Each schematic runs in a context, represented by a `SchematicContext` object.

The context object passed into a rule provides access to utility functions and metadata that the schematic might need to work with, including a logging API to help with debugging.
The context also defines a _merge strategy_ that determines how changes are merged from the staged tree into the base tree.
A change can be accepted or ignored, or throw an exception.
-->

스키매틱의 공개 API는 기본 개념을 표현하는 클래스를 정의합니다.

- 가상 파일 시스템은 `Tree`로 표현합니다.
  `Tree` 자료 구조는 _기본 영역_ (이미 존재하는 파일 집합)과 _스테이징 영역_ (기본 영역에 적용할 변경 목록)으로 구성됩니다.
  수정할 때는 기본 영역을 직접 바꾸지 않고 스테이징 영역에 변경 사항을 추가합니다.

- `Rule` 객체는 `Tree`를 받아 변환을 적용하고 새로운 `Tree`를 반환하는 함수를 정의합니다.
  스키매틱의 주요 파일인 `index.ts`에서는 스키매틱 로직을 구현하는 규칙 집합을 정의합니다.

- 변환은 `Action`으로 표현합니다.
  액션에는 `Create`, `Rename`, `Overwrite`, `Delete`의 네 가지 유형이 있습니다.

- 각 스키매틱은 `SchematicContext` 객체로 표현되는 컨텍스트 안에서 실행됩니다.

규칙에 전달되는 컨텍스트 객체는 스키매틱에서 필요한 유틸리티 함수와 메타데이터에 접근할 수 있게 하며, 디버깅에 도움이 되는 로깅 API도 제공합니다.
컨텍스트는 스테이징 트리의 변경 사항을 기본 트리에 병합하는 방식을 결정하는 _병합 전략_ 도 정의합니다.
변경 사항은 수락하거나 무시할 수 있으며 예외를 발생시킬 수도 있습니다.

<!--
### Defining rules and actions
-->

<a id="defining-rules-and-actions"></a>

### 규칙과 액션 정의하기

<!--
When you create a new blank schematic with the [Schematics CLI](#schematics-cli), the generated entry function is a _rule factory_.
A `RuleFactory` object defines a higher-order function that creates a `Rule`.

```ts {header: "index.ts"}
import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

// You don't have to export the function as default.
// You can also have more than one rule factory per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```

Your rules can make changes to your projects by calling external tools and implementing logic.
You need a rule, for example, to define how a template in the schematic is to be merged into the hosting project.

Rules can make use of utilities provided with the `@schematics/angular` package.
Look for helper functions for working with modules, dependencies, TypeScript, AST, JSON, Angular CLI workspaces and projects, and more.

```ts {header: "index.ts"}
import {
  JsonAstObject,
  JsonObject,
  JsonValue,
  Path,
  normalize,
  parseJsonAst,
  strings,
} from '@angular-devkit/core';
```
-->

[Schematics CLI](#schematics-cli)로 새로운 빈 스키매틱을 만들면 진입 함수로 _규칙 팩토리_ 가 생성됩니다.
`RuleFactory` 객체는 `Rule`을 생성하는 고차 함수를 정의합니다.

```ts {header: "index.ts"}
import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

// 함수를 기본 내보내기(default export)로 내보낼 필요는 없습니다.
// 하나의 파일에 여러 규칙 팩토리를 작성할 수도 있습니다.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```

규칙에서는 외부 도구를 호출하거나 로직을 구현해서 프로젝트를 변경할 수 있습니다.
예를 들어 스키매틱의 템플릿을 대상 프로젝트에 병합하는 방식을 정의하려면 규칙이 필요합니다.

규칙에서는 `@schematics/angular` 패키지가 제공하는 유틸리티를 사용할 수 있습니다.
모듈, 의존성, TypeScript, AST, JSON, Angular CLI 워크스페이스와 프로젝트 등을 다루는 도우미 함수를 살펴보세요.

```ts {header: "index.ts"}
import {
  JsonAstObject,
  JsonObject,
  JsonValue,
  Path,
  normalize,
  parseJsonAst,
  strings,
} from '@angular-devkit/core';
```

<!--
### Defining input options with a schema and interfaces
-->

<a id="defining-input-options-with-a-schema-and-interfaces"></a>

### 스키마와 인터페이스로 입력 옵션 정의하기

<!--
Rules can collect option values from the caller and inject them into templates.
The options available to your rules, with their allowed values and defaults, are defined in the schematic's JSON schema file, `<schematic>/schema.json`.
Define variable or enumerated data types for the schema using TypeScript interfaces.

The schema defines the types and default values of variables used in the schematic.
For example, the hypothetical "Hello World" schematic might have the following schema.

```json {header: "schema.json"}
{
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "default": "world"
    },
    "useColor": {
      "type": "boolean"
    }
  }
}
```

See examples of schema files for the Angular CLI command schematics in [`@schematics/angular`](https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/application/schema.json).
-->

규칙은 호출자로부터 옵션 값을 받아 템플릿에 주입할 수 있습니다.
규칙에서 사용할 수 있는 옵션, 허용되는 값, 기본값은 스키매틱의 JSON 스키마 파일인 `<schematic>/schema.json`에 정의합니다.
스키마의 변수나 열거형 데이터 타입은 TypeScript 인터페이스로 정의합니다.

스키마는 스키매틱에서 사용하는 변수의 타입과 기본값을 정의합니다.
예를 들어 가상의 "Hello World" 스키매틱은 다음과 같은 스키마를 사용할 수 있습니다.

```json {header: "schema.json"}
{
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "default": "world"
    },
    "useColor": {
      "type": "boolean"
    }
  }
}
```

Angular CLI 명령어 스키매틱의 스키마 파일 예제는 [`@schematics/angular`](https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/application/schema.json)을 참고하세요.

<!--
### Schematic prompts
-->

<a id="schematic-prompts"></a>

### 스키매틱 프롬프트

<!--
Schematic _prompts_ introduce user interaction into schematic execution.
Configure schematic options to display a customizable question to the user.
The prompts are displayed before the execution of the schematic, which then uses the response as the value for the option.
This lets users direct the operation of the schematic without requiring in-depth knowledge of the full spectrum of available options.

The "Hello World" schematic might, for example, ask the user for their name, and display that name in place of the default name "world".
To define such a prompt, add an `x-prompt` property to the schema for the `name` variable.

Similarly, you can add a prompt to let the user decide whether the schematic uses color when executing its hello action.
The schema with both prompts would be as follows.

```json {header: "schema.json"}
{
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "default": "world",
      "x-prompt": "What is your name?"
    },
    "useColor": {
      "type": "boolean",
      "x-prompt": "Would you like the response in color?"
    }
  }
}
```
-->

스키매틱 _프롬프트_ 는 스키매틱 실행 과정에 사용자 상호작용을 추가합니다.
사용자에게 원하는 질문을 표시하도록 스키매틱 옵션을 설정할 수 있습니다.
프롬프트는 스키매틱 실행 전에 표시되며, 사용자의 응답을 옵션 값으로 사용합니다.
따라서 사용자는 사용 가능한 모든 옵션을 자세히 알지 못해도 스키매틱의 동작을 지정할 수 있습니다.

예를 들어 "Hello World" 스키매틱은 사용자에게 이름을 물어본 뒤 기본 이름인 "world" 대신 입력한 이름을 표시할 수 있습니다.
이러한 프롬프트를 정의하려면 `name` 변수의 스키마에 `x-prompt` 프로퍼티를 추가하세요.

마찬가지로 인사하는 동작을 실행할 때 색상을 사용할지 사용자가 결정하도록 프롬프트를 추가할 수 있습니다.
두 프롬프트를 모두 포함한 스키마는 다음과 같습니다.

```json {header: "schema.json"}
{
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "default": "world",
      "x-prompt": "What is your name?"
    },
    "useColor": {
      "type": "boolean",
      "x-prompt": "Would you like the response in color?"
    }
  }
}
```

<!--
#### Prompt short-form syntax
-->

<a id="prompt-short-form-syntax"></a>

#### 프롬프트 단축 문법

<!--
These examples use a shorthand form of the prompt syntax, supplying only the text of the question.
In most cases, this is all that is required.
Notice however, that the two prompts expect different types of input.
When using the shorthand form, the most appropriate type is automatically selected based on the property's schema.
In the example, the `name` prompt uses the `input` type because it is a string property.
The `useColor` prompt uses a `confirmation` type because it is a Boolean property.
In this case, "yes" corresponds to `true` and "no" corresponds to `false`.

There are three supported input types.

| Input type   | Details                                            |
| :----------- | :------------------------------------------------- |
| confirmation | A yes or no question; ideal for Boolean options.   |
| input        | Textual input; ideal for string or number options. |
| list         | A predefined set of allowed values.                |

In the short form, the type is inferred from the property's type and constraints.

| Property schema   | Prompt type                                  |
| :---------------- | :------------------------------------------- |
| "type": "boolean" | confirmation \("yes"=`true`, "no"=`false`\)  |
| "type": "string"  | input                                        |
| "type": "number"  | input \(only valid numbers accepted\)        |
| "type": "integer" | input \(only valid numbers accepted\)        |
| "enum": […]       | list \(enum members become list selections\) |

In the following example, the property takes an enumerated value, so the schematic automatically chooses the list type, and creates a menu from the possible values.

```json {header: "schema.json"}
{
  "style": {
    "description": "The file extension or preprocessor to use for style files.",
    "type": "string",
    "default": "css",
    "enum": ["css", "scss", "sass", "less", "styl"],
    "x-prompt": "Which stylesheet format would you like to use?"
  }
}
```

The prompt runtime automatically validates the provided response against the constraints provided in the JSON schema.
If the value is not acceptable, the user is prompted for a new value.
This ensures that any values passed to the schematic meet the expectations of the schematic's implementation, so that you do not need to add additional checks within the schematic's code.
-->

위 예제는 질문의 문구만 제공하는 프롬프트 단축 문법을 사용합니다.
대부분의 경우에는 이것만으로 충분합니다.
다만 두 프롬프트가 서로 다른 타입의 입력을 받는다는 점에 유의하세요.
단축 형식을 사용하면 프로퍼티 스키마를 바탕으로 가장 적절한 타입을 자동으로 선택합니다.
이 예제에서 `name` 프롬프트는 문자열 프로퍼티이므로 `input` 타입을 사용합니다.
`useColor` 프롬프트는 불리언 프로퍼티이므로 `confirmation` 타입을 사용합니다.
이 경우 "yes"는 `true`, "no"는 `false`에 해당합니다.

지원하는 입력 타입은 세 가지입니다.

| 입력 타입    | 설명                                                      |
| :----------- | :-------------------------------------------------------- |
| confirmation | 예 또는 아니요를 묻는 질문으로, 불리언 옵션에 적합합니다. |
| input        | 텍스트 입력으로, 문자열이나 숫자 옵션에 적합합니다.       |
| list         | 미리 정의된 허용값 목록입니다.                            |

단축 형식에서는 프로퍼티의 타입과 제약 조건으로 프롬프트 타입을 추론합니다.

| 프로퍼티 스키마   | 프롬프트 타입                             |
| :---------------- | :---------------------------------------- |
| "type": "boolean" | confirmation ("yes"=`true`, "no"=`false`) |
| "type": "string"  | input                                     |
| "type": "number"  | input (유효한 숫자만 허용)                |
| "type": "integer" | input (유효한 숫자만 허용)                |
| "enum": […]       | list (열거형 멤버를 선택 항목으로 사용)   |

다음 예제에서는 프로퍼티가 열거형 값을 받으므로 스키매틱이 자동으로 목록 타입을 선택하고 허용된 값으로 메뉴를 만듭니다.

```json {header: "schema.json"}
{
  "style": {
    "description": "The file extension or preprocessor to use for style files.",
    "type": "string",
    "default": "css",
    "enum": ["css", "scss", "sass", "less", "styl"],
    "x-prompt": "Which stylesheet format would you like to use?"
  }
}
```

프롬프트 실행 환경은 입력된 응답을 JSON 스키마에 정의된 제약 조건에 따라 자동으로 검증합니다.
허용되지 않는 값이면 사용자에게 새 값을 입력하도록 요청합니다.
따라서 스키매틱에 전달되는 값은 항상 구현에서 기대하는 조건을 충족하며, 스키매틱 코드에 별도 검사를 추가할 필요가 없습니다.

<!--
#### Prompt long-form syntax
-->

<a id="prompt-long-form-syntax"></a>

#### 프롬프트 전체 문법

<!--
The `x-prompt` field syntax supports a long form for cases where you require additional customization and control over the prompt.
In this form, the `x-prompt` field value is a JSON object with subfields that customize the behavior of the prompt.

| Field   | Data value                                                                  |
| :------ | :-------------------------------------------------------------------------- |
| type    | `confirmation`, `input`, or `list` \(selected automatically in short form\) |
| message | string \(required\)                                                         |
| items   | string and/or label/value object pair \(only valid with type `list`\)       |

The following example of the long form is from the JSON schema for the schematic that the CLI uses to [generate applications](https://github.com/angular/angular-cli/blob/ba8a6ea59983bb52a6f1e66d105c5a77517f062e/packages/schematics/angular/application/schema.json#L56).
It defines the prompt that lets users choose which style preprocessor they want to use for the application being created.
By using the long form, the schematic can provide more explicit formatting of the menu choices.

```json {header: "schema.json"}
{
  "style": {
    "description": "The file extension or preprocessor to use for style files.",
    "type": "string",
    "default": "css",
    "enum": ["css", "scss", "sass", "less"],
    "x-prompt": {
      "message": "Which stylesheet format would you like to use?",
      "type": "list",
      "items": [
        {"value": "css", "label": "CSS"},
        {"value": "scss", "label": "SCSS [ https://sass-lang.com/documentation/syntax#scss ]"},
        {
          "value": "sass",
          "label": "Sass [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]"
        },
        {"value": "less", "label": "Less [ https://lesscss.org/ ]"}
      ]
    }
  }
}
```
-->

`x-prompt` 필드는 프롬프트를 더 세밀하게 구성하고 제어해야 할 때 사용할 수 있는 전체 형식도 지원합니다.
이 형식에서 `x-prompt` 필드의 값은 프롬프트 동작을 지정하는 하위 필드를 가진 JSON 객체입니다.

| 필드    | 데이터 값                                                                                              |
| :------ | :----------------------------------------------------------------------------------------------------- |
| type    | `confirmation`, `input`, `list` 중 하나입니다. 단축 형식에서는 자동으로 선택됩니다.                    |
| message | 문자열이며 필수입니다.                                                                                 |
| items   | 문자열 또는 label/value 객체 쌍입니다. 두 형태를 함께 사용할 수도 있으며 `list` 타입에서만 유효합니다. |

다음 전체 형식 예제는 CLI가 [애플리케이션을 생성](https://github.com/angular/angular-cli/blob/ba8a6ea59983bb52a6f1e66d105c5a77517f062e/packages/schematics/angular/application/schema.json#L56)할 때 사용하는 스키매틱의 JSON 스키마에서 가져왔습니다.
생성할 애플리케이션에서 어떤 스타일 전처리기를 사용할지 선택하는 프롬프트입니다.
전체 형식을 사용하면 메뉴 선택 항목의 표시 형식을 더 구체적으로 지정할 수 있습니다.

```json {header: "schema.json"}
{
  "style": {
    "description": "The file extension or preprocessor to use for style files.",
    "type": "string",
    "default": "css",
    "enum": ["css", "scss", "sass", "less"],
    "x-prompt": {
      "message": "Which stylesheet format would you like to use?",
      "type": "list",
      "items": [
        {"value": "css", "label": "CSS"},
        {"value": "scss", "label": "SCSS [ https://sass-lang.com/documentation/syntax#scss ]"},
        {
          "value": "sass",
          "label": "Sass [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]"
        },
        {"value": "less", "label": "Less [ https://lesscss.org/ ]"}
      ]
    }
  }
}
```

<!--
#### x-prompt schema
-->

<a id="x-prompt-schema"></a>

#### x-prompt 스키마

<!--
The JSON schema that defines a schematic's options supports extensions to allow the declarative definition of prompts and their respective behavior.
No additional logic or changes are required to the code of a schematic to support the prompts.
The following JSON schema is a complete description of the long-form syntax for the `x-prompt` field.

```json {header: "x-prompt schema"}
{
  "oneOf": [
    {
      "type": "string"
    },
    {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object",
                "properties": {
                  "label": {
                    "type": "string"
                  },
                  "value": {}
                },
                "required": ["value"]
              }
            ]
          }
        }
      },
      "required": ["message"]
    }
  ]
}
```
-->

스키매틱 옵션을 정의하는 JSON 스키마는 프롬프트와 각 동작을 선언적으로 정의할 수 있는 확장 기능을 지원합니다.
프롬프트를 지원하기 위해 스키매틱 코드에 로직을 추가하거나 코드를 변경할 필요는 없습니다.
다음 JSON 스키마는 `x-prompt` 필드의 전체 형식 문법을 완전하게 설명합니다.

```json {header: "x-prompt 스키마"}
{
  "oneOf": [
    {
      "type": "string"
    },
    {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object",
                "properties": {
                  "label": {
                    "type": "string"
                  },
                  "value": {}
                },
                "required": ["value"]
              }
            ]
          }
        }
      },
      "required": ["message"]
    }
  ]
}
```

<!--
## Schematics CLI
-->


## Schematics CLI

<!--
Schematics come with their own command-line tool.
Install the Schematics command line tool globally:

```shell

npm install -g @angular-devkit/schematics-cli

```

This installs the `schematics` executable, which you can use to create a new schematics collection in its own project folder, add a new schematic to an existing collection, or extend an existing schematic.

In the following sections, you will create a new schematics collection using the CLI to introduce the files and file structure, and some of the basic concepts.

The most common use of schematics, however, is to integrate an Angular library with the Angular CLI.
Do this by creating the schematic files directly within the library project in an Angular workspace, without using the Schematics CLI.
See [Schematics for Libraries](tools/cli/schematics-for-libraries).
-->

스키매틱에는 전용 명령줄 도구가 있습니다.
다음 명령어로 Schematics 명령줄 도구를 전역 설치하세요:

```shell

npm install -g @angular-devkit/schematics-cli

```

이 명령어는 `schematics` 실행 파일을 설치합니다.
이를 사용하면 독립된 프로젝트 폴더에 새 스키매틱 컬렉션을 만들거나, 기존 컬렉션에 스키매틱을 추가하거나, 기존 스키매틱을 확장할 수 있습니다.

다음 섹션에서는 CLI로 새 스키매틱 컬렉션을 만들면서 파일과 파일 구조, 기본 개념을 알아봅니다.

하지만 스키매틱의 가장 일반적인 용도는 Angular 라이브러리를 Angular CLI와 통합하는 것입니다.
이 경우에는 Schematics CLI를 사용하지 않고 Angular 워크스페이스의 라이브러리 프로젝트 안에 스키매틱 파일을 직접 생성합니다.
[라이브러리용 스키매틱](tools/cli/schematics-for-libraries)을 참고하세요.

<!--
### Creating a schematics collection
-->

<a id="creating-a-schematics-collection"></a>

### 스키매틱 컬렉션 생성하기

<!--
The following command creates a new schematic named `hello-world` in a new project folder of the same name.

```shell

schematics blank --name=hello-world

```

The `blank` schematic is provided by the Schematics CLI.
The command creates a new project folder \(the root folder for the collection\) and an initial named schematic in the collection.

Go to the collection folder, install your npm dependencies, and open your new collection in your favorite editor to see the generated files.
For example, if you are using VS Code:

```shell

cd hello-world
npm install
npm run build
code .

```

The initial schematic gets the same name as the project folder, and is generated in `src/hello-world`.
Add related schematics to this collection, and modify the generated skeleton code to define your schematic's functionality.
Each schematic name must be unique within the collection.
-->

다음 명령어는 `hello-world`라는 새 프로젝트 폴더에 같은 이름의 스키매틱을 생성합니다.

```shell

schematics blank --name=hello-world

```

`blank` 스키매틱은 Schematics CLI가 제공합니다.
이 명령어는 컬렉션의 최상위 폴더가 되는 새 프로젝트 폴더와 컬렉션의 첫 번째 이름 있는 스키매틱을 생성합니다.

컬렉션 폴더로 이동해서 npm 의존성을 설치하고, 원하는 편집기로 새 컬렉션을 열어 생성된 파일을 확인하세요.
예를 들어 VS Code를 사용한다면 다음과 같이 합니다:

```shell

cd hello-world
npm install
npm run build
code .

```

처음 생성되는 스키매틱은 프로젝트 폴더와 같은 이름을 가지며 `src/hello-world`에 생성됩니다.
관련 스키매틱을 이 컬렉션에 추가하고 생성된 기본 코드를 수정해서 스키매틱의 기능을 정의하세요.
각 스키매틱 이름은 컬렉션 안에서 고유해야 합니다.

<!--
### Running a schematic
-->

<a id="running-a-schematic"></a>

### 스키매틱 실행하기

<!--
Use the `schematics` command to run a named schematic.
Provide the path to the project folder, the schematic name, and any mandatory options, in the following format.

```shell

schematics <path-to-schematics-project>:<schematics-name> --<required-option>=<value>

```

The path can be absolute or relative to the current working directory where the command is executed.
For example, to run the schematic you just generated \(which has no required options\), use the following command.

```shell

schematics .:hello-world

```
-->

이름이 있는 스키매틱은 `schematics` 명령어로 실행합니다.
다음 형식으로 프로젝트 폴더 경로, 스키매틱 이름, 필수 옵션을 지정하세요.

```shell

schematics <path-to-schematics-project>:<schematics-name> --<required-option>=<value>

```

경로는 절대 경로나 명령어를 실행하는 현재 작업 디렉터리 기준 상대 경로를 사용할 수 있습니다.
예를 들어 방금 생성한 스키매틱에는 필수 옵션이 없으므로 다음 명령어로 실행합니다.

```shell

schematics .:hello-world

```

<!--
### Adding a schematic to a collection
-->

<a id="adding-a-schematic-to-a-collection"></a>

### 컬렉션에 스키매틱 추가하기

<!--
To add a schematic to an existing collection, use the same command you use to start a new schematics project, but run the command inside the project folder.

```shell

cd hello-world
schematics blank --name=goodbye-world

```

The command generates the new named schematic inside your collection, with a main `index.ts` file and its associated test spec.
It also adds the name, description, and factory function for the new schematic to the collection's schema in the `collection.json` file.
-->

기존 컬렉션에 스키매틱을 추가하려면 새 스키매틱 프로젝트를 시작할 때와 같은 명령어를 프로젝트 폴더 안에서 실행하세요.

```shell

cd hello-world
schematics blank --name=goodbye-world

```

이 명령어는 컬렉션 안에 새 이름의 스키매틱을 생성하며, 주요 파일인 `index.ts`와 관련 테스트 명세를 함께 만듭니다.
또한 `collection.json` 파일의 컬렉션 스키마에 새 스키매틱의 이름, 설명, 팩토리 함수를 추가합니다.

<!--
## Collection contents
-->

<a id="collection-contents"></a>

## 컬렉션 구성

<!--
The top level of the root project folder for a collection contains configuration files, a `node_modules` folder, and a `src/` folder.
The `src/` folder contains subfolders for named schematics in the collection, and a schema, `collection.json`, which describes the collected schematics.
Each schematic is created with a name, description, and factory function.

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    }
  }
}
```

- The `$schema` property specifies the schema that the CLI uses for validation.
- The `schematics` property lists named schematics that belong to this collection.
  Each schematic has a plain-text description, and points to the generated entry function in the main file.

- The `factory` property points to the generated entry function.
  In this example, you invoke the `hello-world` schematic by calling the `helloWorld()` factory function.

- The optional `schema` property points to a JSON schema file that defines the command-line options available to the schematic.
- The optional `aliases` array specifies one or more strings that can be used to invoke the schematic.
  For example, the schematic for the Angular CLI "generate" command has an alias "g", that lets you use the command `ng g`.
-->

컬렉션의 최상위 프로젝트 폴더에는 설정 파일, `node_modules` 폴더, `src/` 폴더가 있습니다.
`src/` 폴더에는 컬렉션에 속한 스키매틱 이름별 하위 폴더와 스키매틱들을 설명하는 `collection.json` 스키마가 있습니다.
각 스키매틱은 이름, 설명, 팩토리 함수와 함께 생성됩니다.

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    }
  }
}
```

- `$schema` 프로퍼티는 CLI가 유효성 검사에 사용할 스키마를 지정합니다.
- `schematics` 프로퍼티는 이 컬렉션에 속한 이름 있는 스키매틱을 나열합니다.
  각 스키매틱은 일반 텍스트 설명을 가지며 주요 파일에 생성된 진입 함수를 가리킵니다.

- `factory` 프로퍼티는 생성된 진입 함수를 가리킵니다.
  이 예제에서는 `helloWorld()` 팩토리 함수를 호출해서 `hello-world` 스키매틱을 실행합니다.

- 선택적인 `schema` 프로퍼티는 스키매틱에서 사용할 수 있는 명령줄 옵션을 정의한 JSON 스키마 파일을 가리킵니다.
- 선택적인 `aliases` 배열은 스키매틱을 실행하는 데 사용할 수 있는 문자열을 하나 이상 지정합니다.
  예를 들어 Angular CLI의 "generate" 명령어용 스키매틱에는 "g"라는 별칭이 있으므로 `ng g` 명령어를 사용할 수 있습니다.

<!--
### Named schematics
-->

<a id="named-schematics"></a>

### 이름이 있는 스키매틱

<!--
When you use the Schematics CLI to create a blank schematics project, the new blank schematic is the first member of the collection, and has the same name as the collection.
When you add a new named schematic to this collection, it is automatically added to the `collection.json` schema.

In addition to the name and description, each schematic has a `factory` property that identifies the schematic's entry point.
In the example, you invoke the schematic's defined functionality by calling the `helloWorld()` function in the main file, `hello-world/index.ts`.

<img alt="overview" src="assets/images/guide/schematics/collection-files.gif">

Each named schematic in the collection has the following main parts.

| Parts         | Details                                                           |
| :------------ | :---------------------------------------------------------------- |
| `index.ts`    | Code that defines the transformation logic for a named schematic. |
| `schema.json` | Schematic variable definition.                                    |
| `schema.d.ts` | Schematic variables.                                              |
| `files/`      | Optional component/template files to replicate.                   |

It is possible for a schematic to provide all of its logic in the `index.ts` file, without additional templates.
You can create dynamic schematics for Angular, however, by providing components and templates in the `files` folder, like those in standalone Angular projects.
The logic in the index file configures these templates by defining rules that inject data and modify variables.
-->

Schematics CLI로 빈 스키매틱 프로젝트를 만들면 새 빈 스키매틱이 컬렉션의 첫 번째 구성 요소가 되며 컬렉션과 같은 이름을 가집니다.
이 컬렉션에 새로운 이름의 스키매틱을 추가하면 `collection.json` 스키마에 자동으로 등록됩니다.

각 스키매틱에는 이름과 설명 외에도 진입점을 지정하는 `factory` 프로퍼티가 있습니다.
이 예제에서는 주요 파일인 `hello-world/index.ts`의 `helloWorld()` 함수를 호출해서 스키매틱에 정의된 기능을 실행합니다.

<img alt="컬렉션 파일 구조 개요" src="assets/images/guide/schematics/collection-files.gif">

컬렉션의 각 스키매틱은 다음 주요 부분으로 구성됩니다.

| 구성 요소     | 설명                                             |
| :------------ | :----------------------------------------------- |
| `index.ts`    | 해당 스키매틱의 변환 로직을 정의하는 코드입니다. |
| `schema.json` | 스키매틱 변수 정의입니다.                        |
| `schema.d.ts` | 스키매틱 변수입니다.                             |
| `files/`      | 복제할 컴포넌트/템플릿 파일이며 선택 사항입니다. |

추가 템플릿 없이 `index.ts` 파일에 모든 로직을 작성하는 스키매틱도 만들 수 있습니다.
하지만 독립된 Angular 프로젝트처럼 `files` 폴더에 컴포넌트와 템플릿을 제공하면 동적인 Angular 스키매틱을 만들 수 있습니다.
인덱스 파일의 로직은 데이터를 주입하고 변수를 수정하는 규칙을 정의해서 이러한 템플릿을 구성합니다.
