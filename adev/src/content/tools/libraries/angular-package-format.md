<!--
# Angular package format
-->

<a id="angular-package-format"></a>

# Angular 패키지 형식

<!--
This document describes the Angular Package Format \(APF\).
APF is an Angular specific specification for the structure and format of npm packages that is used by all first-party Angular packages \(`@angular/core`, `@angular/material`, etc.\) and most third-party Angular libraries.

APF enables a package to work seamlessly under most common scenarios that use Angular.
Packages that use APF are compatible with the tooling offered by the Angular team as well as wider JavaScript ecosystem.
It is recommended that third-party library developers follow the same npm package format.

HELPFUL: APF is versioned along with the rest of Angular, and every major version improves the package format.
You can find the versions of the specification prior to v13 in this [google doc](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview).
-->

이 문서는 Angular 패키지 형식\(Angular Package Format, APF\)을 설명합니다.
APF는 npm 패키지의 구조와 형식을 정의하는 Angular 전용 명세로, Angular에서 직접 제공하는 모든 패키지\(`@angular/core`, `@angular/material` 등\)와 대부분의 서드 파티 Angular 라이브러리에서 사용합니다.

APF를 사용하면 Angular를 사용하는 일반적인 상황에서 패키지가 원활하게 동작합니다.
APF를 따르는 패키지는 Angular 팀이 제공하는 도구뿐 아니라 JavaScript 생태계의 다양한 도구와 호환됩니다.
서드 파티 라이브러리 개발자도 같은 npm 패키지 형식을 따르는 것이 좋습니다.

도움말: APF는 Angular와 함께 버전이 관리되며, 메이저 버전마다 패키지 형식이 개선됩니다.
v13 이전 버전의 명세는 이 [Google 문서](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview)에서 확인할 수 있습니다.

<!--
## Why specify a package format?
-->

<a id="why-specify-a-package-format"></a>

## 패키지 형식을 지정하는 이유

<!--
In today's JavaScript landscape, developers consume packages in many different ways, using many different toolchains \(webpack, Rollup, Rolldown, esbuild, etc.\).
These tools may understand and require different inputs - some tools may be able to process the latest ES language version, while others may benefit from directly consuming an older ES version.

The Angular distribution format supports all of the commonly used development tools and workflows, and adds emphasis on optimizations that result either in smaller application payload size or faster development iteration cycle \(build time\).

Developers can rely on Angular CLI and [ng-packagr](https://github.com/ng-packagr/ng-packagr) \(a build tool Angular CLI uses\) to produce packages in the Angular package format.
See the [Creating Libraries](tools/libraries/creating-libraries) guide for more details.
-->

오늘날 JavaScript 개발자는 여러 도구 모음\(webpack, Rollup, Rolldown, esbuild 등\)으로 다양한 방식으로 패키지를 사용합니다.
도구마다 이해하거나 요구하는 입력이 다를 수 있습니다.
어떤 도구는 최신 ES 언어 버전을 처리할 수 있지만, 다른 도구는 이전 ES 버전의 코드를 직접 사용하는 편이 유리할 수 있습니다.

Angular 배포 형식은 널리 사용되는 개발 도구와 작업 흐름을 모두 지원하며, 애플리케이션 전송 크기를 줄이거나 개발 반복 주기\(빌드 시간\)를 단축하는 최적화에 중점을 둡니다.

개발자는 Angular CLI와 [ng-packagr](https://github.com/ng-packagr/ng-packagr)\(Angular CLI가 사용하는 빌드 도구\)를 사용해서 Angular 패키지 형식의 패키지를 만들 수 있습니다.
자세한 내용은 [라이브러리 만들기](tools/libraries/creating-libraries) 가이드를 참고하세요.

<!--
## File layout
-->

<a id="file-layout"></a>

## 파일 구조

<!--
The following example shows a simplified version of the `@angular/core` package's file layout, with an explanation for each file in the package.

```markdown
node_modules/@angular/core
├── README.md
├── package.json
├── fesm2022
│ ├── core.mjs
│ ├── core.mjs.map
│ ├── testing.mjs
│ └── testing.mjs.map
└── types
│ ├── core.d.ts
│ ├── testing.d.ts
```

This table describes the file layout under `node_modules/@angular/core` annotated to describe the purpose of files and directories:

| Files                                                                                                                                                     | Purpose                                                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                                                                                                                                               | Package README, used by npmjs web UI.                                                                                                                                                                          |
| `package.json`                                                                                                                                            | Primary `package.json`, describing the package itself as well as all available entrypoints and code formats. This file contains the "exports" mapping used by runtimes and tools to perform module resolution. |
| `fesm2022/` <br /> &nbsp;&nbsp;─ `core.mjs` <br /> &nbsp;&nbsp;─ `core.mjs.map` <br /> &nbsp;&nbsp;─ `testing.mjs` <br /> &nbsp;&nbsp;─ `testing.mjs.map` | Code for all entrypoints in flattened \(FESM\) ES2022 format, along with source maps.                                                                                                                          |
| `types/` <br /> &nbsp;&nbsp;─ `core.d.ts` <br /> &nbsp;&nbsp;─ `testing.d.ts`                                                                             | Bundled TypeScript type definitions for all public entrypoints.                                                                                                                                                |
-->

다음 예제는 `@angular/core` 패키지의 파일 구조를 간략하게 나타낸 것입니다.
이어서 패키지의 각 파일을 설명합니다.

```markdown
node_modules/@angular/core
├── README.md
├── package.json
├── fesm2022
│ ├── core.mjs
│ ├── core.mjs.map
│ ├── testing.mjs
│ └── testing.mjs.map
└── types
│ ├── core.d.ts
│ ├── testing.d.ts
```

다음 표는 `node_modules/@angular/core` 아래의 파일 구조와 각 파일 및 디렉터리의 목적을 설명합니다:

| 파일                                                                                                                                                      | 목적                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `README.md`                                                                                                                                               | npmjs 웹 UI에서 사용하는 패키지 README입니다.                                                                                                                 |
| `package.json`                                                                                                                                            | 패키지 자체와 사용 가능한 모든 진입점 및 코드 형식을 설명하는 기본 `package.json`입니다. 런타임과 도구가 모듈을 찾을 때 사용하는 "exports" 매핑을 포함합니다. |
| `fesm2022/` <br /> &nbsp;&nbsp;─ `core.mjs` <br /> &nbsp;&nbsp;─ `core.mjs.map` <br /> &nbsp;&nbsp;─ `testing.mjs` <br /> &nbsp;&nbsp;─ `testing.mjs.map` | 모든 진입점의 코드를 평탄화한\(FESM\) ES2022 형식으로 저장하며 소스 맵도 포함합니다.                                                                          |
| `types/` <br /> &nbsp;&nbsp;─ `core.d.ts` <br /> &nbsp;&nbsp;─ `testing.d.ts`                                                                             | 모든 공개 진입점의 TypeScript 타입 정의를 번들로 묶은 파일입니다.                                                                                             |

<!--
### `package.json`
-->


### `package.json`

<!--
The primary `package.json` contains important package metadata, including the following:

- It [declares](#esm-declaration) the package to be in EcmaScript Module \(ESM\) format
- It contains an `"exports"` field which defines the available source code formats of all entrypoints
- It contains [keys](#legacy-resolution-keys) which define the available source code formats of the primary `@angular/core` entrypoint, for tools which do not understand `"exports"`.
  These keys are considered deprecated, and could be removed as the support for `"exports"` rolls out across the ecosystem.

- It declares whether the package contains [side effects](#side-effects)
-->

기본 `package.json`에는 다음과 같은 중요한 패키지 메타데이터가 포함됩니다:

- 패키지가 EcmaScript 모듈\(ESM\) 형식임을 [선언합니다](#esm-declaration).
- 모든 진입점에서 사용할 수 있는 소스 코드 형식을 정의하는 `"exports"` 필드가 있습니다.
- `"exports"`를 이해하지 못하는 도구를 위해 기본 `@angular/core` 진입점에서 사용할 수 있는 소스 코드 형식을 정의하는 [키](#legacy-resolution-keys)가 있습니다.
  이 키는 사용 중단을 권고하며, 생태계 전반에서 `"exports"` 지원이 확대되면 제거될 수 있습니다.

- 패키지에 [부수 효과](#side-effects)가 있는지 선언합니다.

<!--
### ESM declaration
-->

<a id="esm-declaration"></a>

### ESM 선언

<!--
The top-level `package.json` contains the key:

```js
{
  "type": "module"
}
```

This informs resolvers that code within the package is using EcmaScript Modules as opposed to CommonJS modules.
-->

최상위 `package.json`에는 다음 키가 포함됩니다:

```js
{
  "type": "module"
}
```

이 키는 패키지의 코드가 CommonJS 모듈이 아니라 EcmaScript 모듈을 사용한다는 것을 모듈 해석기에 알려줍니다.

<!--
### `"exports"`
-->


### `"exports"`

<!--
The `"exports"` field has the following structure:

```js
"exports": {
  "./schematics/*": {
    "default": "./schematics/*.js"
  },
  "./package.json": {
    "default": "./package.json"
  },
  ".": {
    "types": "./types/core.d.ts",
    "default": "./fesm2022/core.mjs"
  },
  "./testing": {
    "types": "./types/testing.d.ts",
    "default": "./fesm2022/testing.mjs"
  }
}
```

Of primary interest are the `"."` and the `"./testing"` keys, which define the available code formats for the `@angular/core` primary entrypoint and the `@angular/core/testing` secondary entrypoint, respectively.
For each entrypoint, the available formats are:

| Formats                   | Details                                                                 |
| :------------------------ | :---------------------------------------------------------------------- |
| Typings \(`.d.ts` files\) | `.d.ts` files are used by TypeScript when depending on a given package. |
| `default`                 | ES2022 code flattened into a single source.                             |

Tooling that is aware of these keys may preferentially select a desirable code format from `"exports"`.

Libraries may want to expose additional static files which are not captured by the exports of the JavaScript-based entry-points such as Sass mixins or pre-compiled CSS.

For more information, see [Managing assets in a library](tools/libraries/creating-libraries#managing-assets-in-a-library).
-->

`"exports"` 필드의 구조는 다음과 같습니다:

```js
"exports": {
  "./schematics/*": {
    "default": "./schematics/*.js"
  },
  "./package.json": {
    "default": "./package.json"
  },
  ".": {
    "types": "./types/core.d.ts",
    "default": "./fesm2022/core.mjs"
  },
  "./testing": {
    "types": "./types/testing.d.ts",
    "default": "./fesm2022/testing.mjs"
  }
}
```

주로 살펴볼 키는 `"."`와 `"./testing"`입니다.
각각 기본 진입점인 `@angular/core`와 보조 진입점인 `@angular/core/testing`에서 사용할 수 있는 코드 형식을 정의합니다.
각 진입점에서 사용할 수 있는 형식은 다음과 같습니다:

| 형식                      | 설명                                                       |
| :------------------------ | :--------------------------------------------------------- |
| 타입 선언\(`.d.ts` 파일\) | TypeScript는 패키지에 의존할 때 `.d.ts` 파일을 사용합니다. |
| `default`                 | 하나의 소스로 평탄화한 ES2022 코드입니다.                  |

이 키를 이해하는 도구는 `"exports"`에서 원하는 코드 형식을 우선적으로 선택할 수 있습니다.

라이브러리에서는 Sass 믹스인이나 미리 컴파일한 CSS처럼 JavaScript 기반 진입점의 export에 포함되지 않는 정적 파일도 추가로 노출해야 할 수 있습니다.

자세한 내용은 [라이브러리의 정적 리소스 관리하기](tools/libraries/creating-libraries#managing-assets-in-a-library)를 참고하세요.

<!--
### Legacy resolution keys
-->

<a id="legacy-resolution-keys"></a>

### 기존 모듈 탐색 키

<!--
In addition to `"exports"`, the top-level `package.json` also defines legacy module resolution keys for resolvers that don't support `"exports"`.
For `@angular/core` these are:

```js
{
  "module": "./fesm2022/core.mjs",
  "typings": "./types/core.d.ts",
}
```

As shown in the preceding code snippet, a module resolver can use these keys to load a specific code format.
-->

최상위 `package.json`에는 `"exports"`뿐 아니라 이를 지원하지 않는 모듈 해석기를 위한 기존 모듈 탐색 키도 정의되어 있습니다.
`@angular/core`에서는 다음 키를 사용합니다:

```js
{
  "module": "./fesm2022/core.mjs",
  "typings": "./types/core.d.ts",
}
```

위 코드처럼 모듈 해석기는 이 키를 사용해서 특정 코드 형식을 로드할 수 있습니다.

<!--
### Side effects
-->

<a id="side-effects"></a>

### 부수 효과

<!--
The last function of `package.json` is to declare whether the package has [side effects](#sideeffects-flag).

```js
{
  "sideEffects": false
}
```

Most Angular packages should not depend on top-level side effects, and thus should include this declaration.
-->

`package.json`의 마지막 역할은 패키지에 [부수 효과](#sideeffects-flag)가 있는지 선언하는 것입니다.

```js
{
  "sideEffects": false
}
```

대부분의 Angular 패키지는 최상위 수준의 부수 효과에 의존하지 않아야 하므로 이 선언을 포함해야 합니다.

<!--
### Entrypoints and code splitting
-->

<a id="entrypoints-and-code-splitting"></a>

### 진입점과 코드 분할

<!--
Packages in the Angular Package Format contain one primary entrypoint and zero or more secondary entrypoints \(for example, `@angular/common/http`\).
Entrypoints serve several functions.

1. They define the module specifiers from which users import code \(for example, `@angular/core` and `@angular/core/testing`\).

   Users typically perceive these entrypoints as distinct groups of symbols, with different purposes or capability.

   Specific entrypoints might only be used for special purposes, such as testing.
   Such APIs can be separated out from the primary entrypoint to reduce the chance of them being used accidentally or incorrectly.

1. They define the granularity at which code can be lazily loaded.

   Many modern build tools are only capable of "code splitting" \(aka lazy loading\) at the ES Module level.
   The Angular Package Format uses primarily a single "flat" ES Module per entry point. This means that most build tooling is not able to split code with a single entry point into multiple output chunks.

The general rule for APF packages is to use entrypoints for the smallest sets of logically connected code possible.
For example, the Angular Material package publishes each logical component or set of components as a separate entrypoint - one for Button, one for Tabs, etc.
This allows each Material component to be lazily loaded separately, if desired.

Not all libraries require such granularity.
Most libraries with a single logical purpose should be published as a single entrypoint.
`@angular/core` for example uses a single entrypoint for the runtime, because the Angular runtime is generally used as a single entity.
-->

Angular 패키지 형식의 패키지에는 하나의 기본 진입점과 0개 이상의 보조 진입점\(예: `@angular/common/http`\)이 있습니다.
진입점에는 여러 역할이 있습니다.

1. 사용자가 코드를 불러오는 모듈 지정자를 정의합니다\(예: `@angular/core`, `@angular/core/testing`\).

   사용자는 보통 이러한 진입점을 목적이나 기능이 서로 다른 심볼 그룹으로 인식합니다.

   일부 진입점은 테스트 같은 특별한 용도로만 사용합니다.
   이런 API를 기본 진입점에서 분리하면 실수로 사용하거나 잘못 사용할 가능성을 줄일 수 있습니다.

1. 코드를 지연 로딩할 수 있는 단위를 정의합니다.

   많은 최신 빌드 도구는 ES 모듈 수준에서만 "코드 분할"\(즉, 지연 로딩\)을 수행할 수 있습니다.
   Angular 패키지 형식은 주로 진입점 하나당 하나의 "평탄화된" ES 모듈을 사용합니다.
   따라서 대부분의 빌드 도구는 단일 진입점의 코드를 여러 출력 청크로 나누지 못합니다.

APF 패키지에서는 논리적으로 연결된 코드를 가능한 한 작은 단위로 나누어 진입점으로 제공하는 것이 일반적인 원칙입니다.
예를 들어 Angular Material은 Button, Tabs 등 각각의 논리적 컴포넌트나 컴포넌트 묶음을 별도 진입점으로 배포합니다.
따라서 필요하면 각 Material 컴포넌트를 개별적으로 지연 로딩할 수 있습니다.

모든 라이브러리에 이렇게 세밀한 구분이 필요한 것은 아닙니다.
하나의 논리적 목적을 가진 대부분의 라이브러리는 단일 진입점으로 배포하는 것이 좋습니다.
예를 들어 Angular 런타임은 보통 하나의 단위로 사용하므로 `@angular/core`는 런타임에 단일 진입점을 사용합니다.

<!--
#### Resolution of secondary entry points
-->

<a id="resolution-of-secondary-entry-points"></a>

#### 보조 진입점 찾기

<!--
Secondary entrypoints can be resolved via the `"exports"` field of the `package.json` for the package.
-->

보조 진입점은 패키지 `package.json`의 `"exports"` 필드로 찾을 수 있습니다.

<!--
To learn how to configure secondary entry points in a library, see [Entry points](tools/libraries/creating-libraries#entry-points).

### README.md
-->

라이브러리에서 보조 진입점을 설정하는 방법은 [진입점](tools/libraries/creating-libraries#entry-points)을 참고하세요.


### README.md

<!--
The README file in the Markdown format that is used to display description of a package on npm and GitHub.

Example README content of @angular/core package:

```html
Angular &equals;&equals;&equals;&equals;&equals;&equals;&equals; The sources for this package are in
the main [Angular](https://github.com/angular/angular) repo.Please file issues and pull requests
against that repo. License: MIT
```
-->

Markdown 형식의 README 파일은 npm과 GitHub에서 패키지 설명을 표시하는 데 사용합니다.

@angular/core 패키지의 README 내용은 다음과 같습니다:

```html
Angular &equals;&equals;&equals;&equals;&equals;&equals;&equals; The sources for this package are in
the main [Angular](https://github.com/angular/angular) repo.Please file issues and pull requests
against that repo. License: MIT
```

<!--
## Library Compilation and Package Optimizations

This section describes the compilation process for libraries and optimizations that apply to the npm package before publishing the artifact to a registry.

### Partial compilation
-->

<a id="library-compilation-and-package-optimizations"></a>

## 라이브러리 컴파일과 패키지 최적화

이 섹션에서는 라이브러리 컴파일 과정과 결과물을 레지스트리에 배포하기 전에 npm 패키지에 적용하는 최적화를 설명합니다.

<a id="partial-compilation"></a>

### 부분 컴파일

<!--
Libraries in the Angular Package Format must be published in "partial compilation" mode.
This is a compilation mode for `ngc` which produces compiled Angular code that is not tied to a specific Angular runtime version, in contrast to the full compilation used for applications, where the Angular compiler and runtime versions must match exactly.

To partially compile Angular code, use the `compilationMode` flag in the `angularCompilerOptions` property of your `tsconfig.json`:

```js
{
  …
  "angularCompilerOptions": {
    "compilationMode": "partial",
  }
}
```

Partially compiled library code is then converted to fully compiled code during the application build process by the Angular CLI.

If your build pipeline does not use the Angular CLI then refer to the [Consuming partial ivy code outside the Angular CLI](tools/libraries/creating-libraries#consuming-partial-ivy-code-outside-the-angular-cli) guide.
-->

Angular 패키지 형식의 라이브러리는 "부분 컴파일" 모드로 배포해야 합니다.
이 모드는 특정 Angular 런타임 버전에 종속되지 않는 Angular 코드를 생성하는 `ngc` 컴파일 모드입니다.
Angular 컴파일러와 런타임 버전이 정확히 일치해야 하는 애플리케이션의 전체 컴파일과는 다릅니다.

Angular 코드를 부분 컴파일하려면 `tsconfig.json`의 `angularCompilerOptions` 프로퍼티에 `compilationMode` 플래그를 사용하세요:

```js
{
  …
  "angularCompilerOptions": {
    "compilationMode": "partial",
  }
}
```

부분 컴파일된 라이브러리 코드는 애플리케이션 빌드 과정에서 Angular CLI가 전체 컴파일된 코드로 변환합니다.

빌드 파이프라인에서 Angular CLI를 사용하지 않는다면 [Angular CLI 외부에서 부분 Ivy 코드 사용하기](tools/libraries/creating-libraries#consuming-partial-ivy-code-outside-the-angular-cli) 가이드를 참고하세요.

<!--
### Flattening of ES modules
-->

<a id="flattening-of-es-modules"></a>

### ES 모듈 평탄화

<!--
The Angular Package Format specifies that code be published in "flattened" ES module format.
This significantly reduces the build time of Angular applications as well as download and parse time of the final application bundle.
Please check out the excellent post ["The cost of small modules"](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules) by Nolan Lawson.

The Angular compiler can generate index ES module files. Tools like Rollup / Rolldown can use these files to generate flattened modules in a _Flattened ES Module_ (FESM) file format.

FESM is a file format created by flattening all ES Modules accessible from an entrypoint into a single ES Module.
It's formed by following all imports from a package and copying that code into a single file while preserving all public ES exports and removing all private imports.
However, in some cases, the FESM may depend on shared chunks that are shared between multiple entry points.

The abbreviated name, FESM, pronounced _phe-som_, can be followed by a number such as FESM2020.
The number refers to the language level of the JavaScript inside the module.
Accordingly a FESM2022 file would be ESM+ES2022 and include import/export statements and ES2022 source code.

To generate a flattened ES Module index file, use the following configuration options in your tsconfig.json file:

```js
{
  "compilerOptions": {
    …
    "module": "esnext",
    "target": "es2022",
    …
  },
  "angularCompilerOptions": {
    …
    "flatModuleOutFile": "my-ui-lib.js",
    "flatModuleId": "my-ui-lib"
  }
}
```

Once the index file \(for example, `my-ui-lib.js`\) is generated by ngc, bundlers and optimizers like Rollup and Rolldown can be used to produce the flattened ESM file.
-->

Angular 패키지 형식은 코드를 "평탄화된" ES 모듈 형식으로 배포하도록 규정합니다.
이 방식은 Angular 애플리케이션의 빌드 시간뿐 아니라 최종 애플리케이션 번들의 다운로드 시간과 파싱 시간도 크게 줄여 줍니다.
Nolan Lawson의 ["작은 모듈의 비용"](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules) 글을 참고하세요.

Angular 컴파일러는 인덱스 ES 모듈 파일을 생성할 수 있습니다.
Rollup / Rolldown 같은 도구는 이 파일을 사용해서 _평탄화된 ES 모듈_ (FESM) 파일 형식의 모듈을 생성합니다.

FESM은 진입점에서 접근할 수 있는 모든 ES 모듈을 하나의 ES 모듈로 평탄화한 파일 형식입니다.
패키지의 모든 import를 따라가면서 코드를 단일 파일에 복사하고, 공개 ES export는 유지하며 비공개 import는 제거해서 만듭니다.
다만 경우에 따라 FESM은 여러 진입점이 공유하는 청크에 의존할 수 있습니다.

FESM은 _페솜_ 으로 읽으며, FESM2020처럼 뒤에 숫자를 붙일 수 있습니다.
숫자는 모듈 안에 있는 JavaScript의 언어 수준을 나타냅니다.
따라서 FESM2022 파일은 ESM+ES2022이며, import/export 구문과 ES2022 소스 코드를 포함합니다.

평탄화된 ES 모듈 인덱스 파일을 생성하려면 tsconfig.json에 다음 설정 옵션을 사용하세요:

```js
{
  "compilerOptions": {
    …
    "module": "esnext",
    "target": "es2022",
    …
  },
  "angularCompilerOptions": {
    …
    "flatModuleOutFile": "my-ui-lib.js",
    "flatModuleId": "my-ui-lib"
  }
}
```

ngc가 인덱스 파일\(예: `my-ui-lib.js`\)을 생성하면 Rollup / Rolldown 같은 번들러와 최적화 도구로 평탄화된 ESM 파일을 만들 수 있습니다.

<!--
### "sideEffects" flag
-->

<a id="sideeffects-flag"></a>

### "sideEffects" 플래그

<!--
By default, EcmaScript Modules are side-effectful: importing from a module ensures that any code at the top level of that module should run.
This is often undesirable, as most side-effectful code in typical modules is not truly side-effectful, but instead only affects specific symbols.
If those symbols are not imported and used, it's often desirable to remove them in an optimization process known as tree-shaking, and the side-effectful code can prevent this.

Build tools such as webpack support a flag which allows packages to declare that they do not depend on side-effectful code at the top level of their modules, giving the tools more freedom to tree-shake code from the package.
The end result of these optimizations should be smaller bundle size and better code distribution in bundle chunks after code-splitting.
This optimization can break your code if it contains non-local side-effects - this is however not common in Angular applications and it's usually a sign of bad design.
The recommendation is for all packages to claim the side-effect free status by setting the `sideEffects` property to `false`, and that developers follow the [Angular Style Guide](/style-guide) which naturally results in code without non-local side-effects.

More info: [webpack docs on side effects](https://github.com/webpack/webpack/tree/main/examples/side-effects)
-->

EcmaScript 모듈에는 기본적으로 부수 효과가 있다고 간주합니다.
모듈에서 무언가를 불러오면 해당 모듈의 최상위 코드가 실행되어야 하기 때문입니다.
하지만 일반적인 모듈에서 부수 효과가 있는 것처럼 보이는 코드 대부분은 실제로는 특정 심볼에만 영향을 주므로, 이런 동작이 바람직하지 않을 때가 많습니다.
해당 심볼을 불러와 사용하지 않는다면 트리 셰이킹이라는 최적화 과정에서 제거하는 것이 좋지만, 부수 효과가 있는 코드가 이를 방해할 수 있습니다.

webpack 같은 빌드 도구는 패키지가 모듈 최상위 수준의 부수 효과에 의존하지 않는다고 선언하는 플래그를 지원합니다.
그러면 도구가 패키지의 코드를 더 자유롭게 트리 셰이킹할 수 있습니다.
이러한 최적화를 통해 번들 크기를 줄이고 코드 분할 후 각 번들 청크에 코드를 더 적절하게 배치할 수 있습니다.
코드에 해당 범위 밖까지 영향을 미치는 부수 효과가 있으면 이 최적화로 코드가 깨질 수 있습니다.
하지만 Angular 애플리케이션에서 이런 경우는 흔하지 않으며 대개 설계가 좋지 않다는 신호입니다.
모든 패키지에서 `sideEffects` 프로퍼티를 `false`로 설정해서 부수 효과가 없다고 선언하고, 개발자는 범위 밖에 부수 효과를 만들지 않는 코드를 자연스럽게 작성할 수 있도록 [Angular 스타일 가이드](/style-guide)를 따르는 것이 좋습니다.

자세한 내용: [webpack 부수 효과 문서](https://github.com/webpack/webpack/tree/main/examples/side-effects)

<!--
### ES2022 language level
-->

<a id="es2022-language-level"></a>

### ES2022 언어 수준

<!--
ES2022 Language level is now the default language level that is consumed by Angular CLI and other tooling.
The Angular CLI down-levels the bundle to a language level that is supported by all targeted browsers at application build time.
-->

ES2022는 현재 Angular CLI와 다른 도구가 사용하는 기본 언어 수준입니다.
Angular CLI는 애플리케이션을 빌드할 때 모든 대상 브라우저가 지원하는 언어 수준으로 번들을 변환합니다.

<!--
### Flattening of Type Definitions (`.d.ts` bundling)
-->

<a id="flattening-of-type-definitions-dts-bundling"></a>

### 타입 정의 평탄화(`.d.ts` 번들링)

<!--
As of APF v8, it is recommended to bundle TypeScript definitions.
Bundling of type definitions can significantly speed up compilations for users, especially if there are many individual `.ts` source files in your library.

Angular uses [`rolldown-plugin-dts`](https://github.com/sxzz/rolldown-plugin-dts) to flatten `.d.ts` files (using `rolldown`, similar to how FESM files are created).

Using rolldown for `.d.ts` bundling is beneficial as it supports code splitting between entry-points.
For example, consider you have multiple entrypoints relying on the same shared type, a shared `.d.ts` file would be created along with the larger flattened `.d.ts` files.
This is desirable and avoids duplication of types.
-->

APF v8부터는 TypeScript 타입 정의를 번들로 묶는 것이 좋습니다.
특히 라이브러리에 개별 `.ts` 소스 파일이 많다면 타입 정의 번들링으로 사용자의 컴파일 속도를 크게 높일 수 있습니다.

Angular는 [`rolldown-plugin-dts`](https://github.com/sxzz/rolldown-plugin-dts)를 사용해서 `.d.ts` 파일을 평탄화합니다(FESM 파일을 만드는 방식과 비슷하게 `rolldown`을 사용합니다).

rolldown은 진입점 사이의 코드 분할을 지원하므로 `.d.ts` 번들링에 유용합니다.
예를 들어 여러 진입점이 같은 공통 타입에 의존한다면, 평탄화된 큰 `.d.ts` 파일들과 함께 공통 `.d.ts` 파일이 생성됩니다.
이렇게 하면 타입 중복을 피할 수 있습니다.

<!--
### Tslib
-->


### Tslib

<!--
As of APF v10, it is recommended to add tslib as a direct dependency of your primary entry-point.
This is because the tslib version is tied to the TypeScript version used to compile your library.
-->

APF v10부터는 기본 진입점의 직접 의존성으로 tslib를 추가하는 것이 좋습니다.
tslib 버전이 라이브러리를 컴파일할 때 사용하는 TypeScript 버전에 연결되기 때문입니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
The npm packages of the Angular framework are a good reference point for APF-compliant library packages.
Browse the file layout and npm package on UNPKG:

<docs-pill-row>
  <docs-pill href="https://app.unpkg.com/@angular/core@latest" title="@angular/core package"/>
  <docs-pill href="https://app.unpkg.com/@angular/material@latest" title="@angular/material package"/>
</docs-pill-row>
-->

Angular 프레임워크의 npm 패키지는 APF 규격에 맞는 라이브러리 패키지를 만드는 좋은 참고 자료입니다.
UNPKG에서 파일 구조와 npm 패키지를 살펴보세요.

<docs-pill-row>
  <docs-pill href="https://app.unpkg.com/@angular/core@latest" title="@angular/core 패키지"/>
  <docs-pill href="https://app.unpkg.com/@angular/material@latest" title="@angular/material 패키지"/>
</docs-pill-row>

<!--
## Definition of terms
-->

<a id="definition-of-terms"></a>

## 용어 정의

<!--
The following terms are used throughout this document intentionally.
In this section are the definitions of all of them to provide additional clarity.
-->

이 문서에서는 다음 용어를 일관된 의미로 사용합니다.
의미를 명확하게 이해할 수 있도록 이 섹션에서 각 용어를 정의합니다.

<!--
### Package
-->

<a id="package"></a>

### 패키지

<!--
The smallest set of files that are published to npm and installed together, for example `@angular/core`.
This package includes a manifest called package.json, compiled source code, typescript definition files, source maps, metadata, etc.
The package is installed with `npm install @angular/core`.
-->

`@angular/core`처럼 npm에 배포되고 함께 설치되는 가장 작은 파일 묶음입니다.
패키지에는 package.json이라는 매니페스트, 컴파일된 소스 코드, TypeScript 정의 파일, 소스 맵, 메타데이터 등이 포함됩니다.
패키지는 `npm install @angular/core`로 설치합니다.

<!--
### Symbol
-->

<a id="symbol"></a>

### 심볼

<!--
A class, function, constant, or variable contained in a module and optionally made visible to the external world via a module export.
-->

모듈에 포함된 클래스, 함수, 상수, 변수이며, 필요한 경우 모듈 export를 통해 외부에 공개합니다.

<!--
### Module
-->

<a id="module"></a>

### 모듈

<!--
Short for ECMAScript Modules.
A file containing statements that import and export symbols.
This is identical to the definition of modules in the ECMAScript spec.
-->

ECMAScript 모듈을 줄여 부르는 말입니다.
심볼을 import하거나 export하는 구문이 포함된 파일입니다.
ECMAScript 명세의 모듈 정의와 같습니다.

<!--
### ESM
-->


### ESM

<!--
Short for ECMAScript Modules \(see above\).
-->

ECMAScript 모듈의 약어입니다\(위 설명 참고\).

<!--
### FESM
-->


### FESM

<!--
Short for Flattened ES Modules and consists of a file format created by flattening all ES Modules accessible from an entry point into a single ES Module.
Note that FESM is typically a single file, but it can depend on a shared chunk that is shared with other FESMs.
-->

Flattened ES Modules의 약어로, 진입점에서 접근할 수 있는 모든 ES 모듈을 하나의 ES 모듈로 평탄화해서 만든 파일 형식입니다.
FESM은 보통 단일 파일이지만 다른 FESM과 공유하는 청크에 의존할 수 있습니다.

<!--
### Module ID
-->

<a id="module-id"></a>

### 모듈 ID

<!--
The identifier of a module used in the import statements \(for example, `@angular/core`\).
The ID often maps directly to a path on the filesystem, but this is not always the case due to various module resolution strategies.
-->

import 구문에서 사용하는 모듈 식별자입니다\(예: `@angular/core`\).
ID는 파일 시스템 경로에 직접 대응하는 경우가 많지만, 모듈 탐색 전략이 다양하므로 항상 그렇지는 않습니다.

<!--
### Module specifier
-->

<a id="module-specifier"></a>

### 모듈 지정자

<!--
A module identifier \(see above\).
-->

모듈 식별자를 뜻합니다\(위 설명 참고\).

<!--
### Module resolution strategy
-->

<a id="module-resolution-strategy"></a>

### 모듈 탐색 전략

<!--
Algorithm used to convert Module IDs to paths on the filesystem.
Node.js has one that is well specified and widely used, TypeScript supports several module resolution strategies, [Closure Compiler](https://developers.google.com/closure/compiler) has yet another strategy.
-->

모듈 ID를 파일 시스템 경로로 변환하는 알고리즘입니다.
Node.js에는 명확하게 정의되어 널리 사용하는 전략이 있고, TypeScript는 여러 모듈 탐색 전략을 지원하며, [Closure Compiler](https://developers.google.com/closure/compiler)는 또 다른 전략을 사용합니다.

<!--
### Module format
-->

<a id="module-format"></a>

### 모듈 형식

<!--
Specification of the module syntax that covers at minimum the syntax for the importing and exporting from a file.
Common module formats are CommonJS \(CJS, typically used for Node.js applications\) or ECMAScript Modules \(ESM\).
The module format indicates only the packaging of the individual modules, but not the JavaScript language features used to make up the module content.
Because of this, the Angular team often uses the language level specifier as a suffix to the module format, \(for example, ESM+ES2022 specifies that the module is in ESM format and contains ES2022 code\).
-->

최소한 파일에서 import와 export를 하는 문법을 포함하는 모듈 문법 명세입니다.
일반적인 모듈 형식에는 CommonJS\(CJS, 주로 Node.js 애플리케이션에서 사용\)와 ECMAScript 모듈\(ESM\)이 있습니다.
모듈 형식은 개별 모듈을 묶는 방식만 나타내며, 모듈 내용에 사용된 JavaScript 언어 기능은 나타내지 않습니다.
따라서 Angular 팀은 모듈 형식 뒤에 언어 수준을 붙여 표현할 때가 많습니다\(예: ESM+ES2022는 ESM 형식의 모듈에 ES2022 코드가 포함되어 있다는 의미입니다\).

<!--
### Bundle
-->

<a id="bundle"></a>

### 번들

<!--
An artifact in the form of a single JS file, produced by a build tool \(for example, [webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org)\) that contains symbols originating in one or more modules.
Bundles are a browser-specific workaround that reduce network strain that would be caused if browsers were to start downloading hundreds if not tens of thousands of files.
Node.js typically doesn't use bundles.
Common bundle formats are UMD and System.register.
-->

[webpack](https://webpack.js.org)이나 [Rollup](https://rollupjs.org) 같은 빌드 도구가 생성하는 단일 JS 파일 형태의 결과물이며, 하나 이상의 모듈에서 가져온 심볼을 포함합니다.
번들은 브라우저가 수백 개에서 많게는 수만 개의 파일을 다운로드할 때 발생하는 네트워크 부담을 줄이기 위한 브라우저용 해결책입니다.
Node.js는 일반적으로 번들을 사용하지 않습니다.
일반적인 번들 형식에는 UMD와 System.register가 있습니다.

<!--
### Language level
-->

<a id="language-level"></a>

### 언어 수준

<!--
The language of the code \(ES2022\).
Independent of the module format.
-->

코드의 언어 버전\(ES2022\)입니다.
모듈 형식과는 독립적입니다.

<!--
### Entry point
-->

<a id="entry-point"></a>

### 진입점

<!--
A module intended to be imported by the user.
It is referenced by a unique module ID and exports the public API referenced by that module ID.
An example is `@angular/core` or `@angular/core/testing`.
Both entry points exist in the `@angular/core` package, but they export different symbols.
A package can have many entry points.
-->

사용자가 불러오도록 의도된 모듈입니다.
고유한 모듈 ID로 참조하며, 해당 모듈 ID가 가리키는 공개 API를 export합니다.
예를 들어 `@angular/core`와 `@angular/core/testing`이 있습니다.
두 진입점 모두 `@angular/core` 패키지 안에 있지만 서로 다른 심볼을 export합니다.
하나의 패키지에 여러 진입점이 있을 수 있습니다.

<!--
### Deep import
-->

<a id="deep-import"></a>

### 깊은 경로 가져오기

<!--
A process of retrieving symbols from modules that are not Entry Points.
These module IDs are usually considered to be private APIs that can change over the lifetime of the project or while the bundle for the given package is being created.
-->

진입점이 아닌 모듈에서 심볼을 가져오는 과정입니다.
이러한 모듈 ID는 보통 비공개 API로 간주하며, 프로젝트 개발 중이나 패키지 번들 생성 과정에서 변경될 수 있습니다.

<!--
### Top-Level import
-->

<a id="top-level-import"></a>

### 최상위 가져오기

<!--
An import coming from an entry point.
The available top-level imports are what define the public API and are exposed in "@angular/name" modules, such as `@angular/core` or `@angular/common`.
-->

진입점에서 가져오는 import입니다.
사용 가능한 최상위 import가 공개 API를 정의하며, `@angular/core`나 `@angular/common` 같은 "@angular/name" 모듈에서 노출됩니다.

<!--
### Tree-shaking
-->

<a id="tree-shaking"></a>

### 트리 셰이킹

<!--
The process of identifying and removing code not used by an application - also known as dead code elimination.
This is a global optimization performed at the application level using tools like [Rollup](https://rollupjs.org), [Rolldown](https://rolldown.rs/), [Closure Compiler](https://developers.google.com/closure/compiler), or [Terser](https://github.com/terser/terser).
-->

애플리케이션에서 사용하지 않는 코드를 찾아 제거하는 과정이며, 죽은 코드 제거라고도 합니다.
[Rollup](https://rollupjs.org), [Rolldown](https://rolldown.rs/), [Closure Compiler](https://developers.google.com/closure/compiler), [Terser](https://github.com/terser/terser) 같은 도구를 사용해서 애플리케이션 수준에서 수행하는 전체 최적화입니다.

<!--
### AOT compiler
-->

<a id="aot-compiler"></a>

### AOT 컴파일러

<!--
The Ahead of Time Compiler for Angular.
-->

Angular의 사전 컴파일러(Ahead of Time Compiler)입니다.

<!--
### Flattened type definitions
-->

<a id="flattened-type-definitions"></a>

### 평탄화된 타입 정의

<!--
The bundled TypeScript definitions generated using tools like [API Extractor](https://api-extractor.com) or [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts).
-->

[API Extractor](https://api-extractor.com)나 [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) 같은 도구로 생성한 TypeScript 타입 정의 번들입니다.
