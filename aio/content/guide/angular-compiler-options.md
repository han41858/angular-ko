{@a angular-compiler-options}
<!--
# Angular compiler options
-->
# Angular 컴파일러 옵션

<!--
When you use [ahead-of-time compilation (AOT)](guide/aot-compiler), you can control how your application is compiled by specifying *template* compiler options in the [TypeScript configuration file](guide/typescript-configuration).

The template options object, `angularCompilerOptions`, is a sibling to the `compilerOptions` object that supplies standard options to the TypeScript compiler.

<code-example header="tsconfig.json" path="angular-compiler-options/tsconfig.json" region="angular-compiler-options"></code-example>
-->
[AOT 컴파일러](guide/aot-compiler)를 사용하는 환경이라면 [TypeScript 환경설정 파일](guide/typescript-configuration) `tsconfig.json` 에 컴파일러 옵션을 지정해서 애플리케이션의 템플릿이 어떻게 컴파일될지 지정할 수 있습니다.

템플릿 컴파일 옵션을 지정하는 객체 `angularCompilerOptions`는 TypeScript 컴파일러의 기본 옵션을 지정하는 `compilerOptions` 객체와 같은 계층에 존재합니다.

<code-example header="tsconfig.json" path="angular-compiler-options/tsconfig.json" region="angular-compiler-options"></code-example>


<a id="tsconfig-extends"></a>

<!--
## Configuration inheritance with extends
-->
## 설정값 상속받기

<!--
Like the TypeScript compiler, the Angular AOT compiler also supports `extends` in the `angularCompilerOptions` section of the TypeScript configuration file.
The `extends` property is at the top level, parallel to `compilerOptions` and `angularCompilerOptions`.

A TypeScript configuration can inherit settings from another file using the `extends` property.
The configuration options from the base file are loaded first, then overridden by those in the inheriting configuration file.

For example:

<code-example header="tsconfig.app.json" path="angular-compiler-options/tsconfig.app.json" region="angular-compiler-options-app"></code-example>

For more information, see the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
-->
TypeScript 컴파일러 설정과 마찬가지로 Angular AOT 컴파일러 설정도 `extends`로 상속받을 수 있습니다.
아래 예제 코드에서 제일 먼저 선언한 `extends` 프로퍼티는 `compilerOptions` 객체나 `angularCompilerOptions` 객체와 같은 계층에 존재합니다.

TypeScript 환경설정 파일을 상속하면 상속 대상이 되는 파일을 먼저 로드하고, 그 다음에 새로운 파일에서 선언한 값이 이전 파일의 값을 오버라이드합니다.

다음과 같이 사용하면 됩니다:

<code-example header="tsconfig.app.json" path="angular-compiler-options/tsconfig.app.json" region="angular-compiler-options-app"></code-example>

더 자세한 내용은 [TypeScript 핸드북](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 문서를 참고하세요.


<!--
## Template options
-->
## 템플릿 옵션

<!--
The following options are available for configuring the AOT template compiler.
-->
AOT 템플릿 컴파일러 옵션에는 이런 항목들을 사용할 수 있습니다.


### `allowEmptyCodegenFiles`

<!--
When `true`, create all possible files even if they are empty.
Default is `false`.
Used by the Bazel build rules to simplify how Bazel rules track file dependencies.
Do not use this option outside of the Bazel rules.
-->
`true`로 설정하면 빈 파일도 빌드합니다.
기본값은 `false`입니다.
이 옵션은 파일간 의존성을 추적하는 Bazel 빌드 규칙을 간단하게 만들 때 사용합니다.
Bazel 규칙이 아닌 곳에서는 사용하지 않는 것을 권장합니다.

### `annotationsAs`

<!--
Modifies how Angular-specific annotations are emitted to improve tree-shaking.
Non-Angular annotations are not affected.
One of `static fields` or `decorators`. The default value is `static fields`.

*   By default, the compiler replaces decorators with a static field in the class, which allows advanced tree-shakers like [Closure compiler](https://github.com/google/closure-compiler) to remove unused classes
*   The `decorators` value leaves the decorators in place, which makes compilation faster.
    TypeScript emits calls to the `__decorate` helper.
    Use `--emitDecoratorMetadata` for runtime reflection.

    <div class="alert is-helpful">

    **NOTE**: <br />
    That the resulting code cannot tree-shake properly.

    </div>
-->
Angular용 어노테이션이 트리 셰이킹의 영향을 어떻게 받을지 지정하는 옵션입니다.
이 옵션값을 변경하더라도 Angular용이 아닌 어노테이션은 영향을 받지 않습니다.
기본값은 `static fields` 이며 `decorators` 값을 사용할 수 있습니다.

* `static fields`: 데코레이터를 클래스 정적 필드로 변환합니다.
  이렇게 설정하면 [Closure 컴파일러](https://github.com/google/closure-compiler)처럼 트리 셰이킹 대상이 됩니다.

* `decorators`: 데코레이터를 그대로 둡니다.
  이렇게 설정하면 TypeScript가 `_decorate` 헬퍼를 사용하기 때문에 컴파일 시간이 짧아집니다.
  그리고 이렇게 빌드한 코드를 제대로 실행하려면 `--emitDecoratorMetadata` 옵션을 함께 설정해야 합니다.

  <div class="alert is-helpful">

  **참고**: <br />
  Angular 데코레이터는 트리 셰이킹의 대상이 되지 않습니다.

  </div>


### `annotateForClosureCompiler`

<!-- vale Angular.Angular_Spelling = NO -->

<!--
When `true`, use [Tsickle](https://github.com/angular/tsickle) to annotate the emitted JavaScript with [JSDoc](https://jsdoc.app) comments needed by the [Closure Compiler](https://github.com/google/closure-compiler).
Default is `false`.
-->
`true`로 설정하면 [Tsickle](https://github.com/angular/tsickle)을 사용해서 [Closure 컴파일러](https://github.com/google/closure-compiler)용 [JSDoc](https://jsdoc.app/) 주석을 생성합니다.
기본값은 `false` 입니다.

<!-- vale Angular.Angular_Spelling = YES -->

### `compilationMode`

Specifies the compilation mode to use.
The following modes are available:

| Modes       | Details |
|:---         |:---     |
| `'full'`    | Generates fully AOT-compiled code according to the version of Angular that is currently being used. |
| `'partial'` | Generates code in a stable, but intermediate form suitable for a published library.                 |

The default value is `'full'`.


### `disableExpressionLowering`

<!--
When `true`, the default, transforms code that is or could be used in an annotation, to allow it to be imported from template factory modules.
See [metadata rewriting](guide/aot-compiler#metadata-rewriting) for more information.

When `false`, disables this rewriting, requiring the rewriting to be done manually.
-->
`true` \(기본값\)로 설정하면 어노테이션에 사용되거나 사용될 수 있는 코드를 템플릿 팩토리 모듈용으로 변환합니다.
자세한 내용은 [메타데이터 재구축](guide/aot-compiler#metadata-rewriting) 문서를 참고하세요.

기본값은 `true`이며 `false`로 설정하면 메타데이터를 재구축하지 않습니다.
`false` 값은 메타데이터 재구축을 수동으로 진행하는 경우에 사용합니다.


### `disableTypeScriptVersionCheck`

<!--
When `true`, the compiler does not look at the TypeScript version and does not report an error when an unsupported version of TypeScript is used.
Not recommended, as unsupported versions of TypeScript might have undefined behavior.
Default is `false`.
-->
`true`로 설정하면 컴파일러가 TypeScript 버전을 검사하지 않습니다.
그리고 지원되지 않는 TypeScript 버전을 사용하더라도 에러를 발생시키지 않습니다.
하지만 지원되지 않는 TypeScript 버전은 정상 동작을 보장할 수 없기 때문에 권장하지 않습니다.
기본값은 `false`입니다.

### `enableI18nLegacyMessageIdFormat`

<!--
Instructs the Angular template compiler to create legacy ids for messages that are tagged in templates by the `i18n` attribute.
See [Mark text for translations][AioGuideI18nCommonPrepareMarkTextInComponentTemplate] for more information about marking messages for localization.

Set this option to `false` unless your project relies upon translations that were created earlier using legacy IDs.
Default is `true`.

The pre-Ivy message extraction tooling created a variety of legacy formats for extracted message IDs.
These message formats have some issues, such as whitespace handling and reliance upon information inside the original HTML of a template.

The new message format is more resilient to whitespace changes, is the same across all translation file formats, and can be created directly from calls to `$localize`.
This allows `$localize` messages in application code to use the same ID as identical `i18n` messages in component templates.
-->
이전 버전까지 사용하던 `i18n` 어트리뷰트가 지정둰 태그에서 ID를 추출할지 결정합니다.
다국어 대상 문장을 지정하는 방법은 [다국어 적용하기][AioGuideI18nCommonPrepareMarkTextInComponentTemplate] 문서를 참고하세요.

이 옵션을 `false`로 지정하면 이전 버전까지 사용하던 ID를 그대로 사용합니다.
기본값은 `true` 입니다.

Ivy 이전에 사용하던 문장 추출 툴은 메시지 ID를 추출할 때 오래된 방식을 사용했습니다.
그래서 이 방식은 공백문자 처리나 템플릿의 원본 HTML 내부 정보를 요구하는 등 수많은 이슈가 존재합니다.

Ivy부터는 더 유연한 방식으로 공백문자를 처리하며, 표준 번역 파일 형식을 따르고, `$localize`를 직접 실행할 수 있는 방식을 도입했습니다.
애플리케이션 코드에서 `$localize`를 실행하면 컴포넌트 템플릿에서 ID로 `i18n` 메시지를 처리하는 것과 같은 효과를 낼 수 있습니다.


### `enableResourceInlining`

<!--
When `true`, replaces the `templateUrl` and `styleUrls` properties in all `@Component` decorators with inline content in the `template` and `styles` properties.

When enabled, the `.js` output of `ngc` does not include any lazy-loaded template or style URLs.

For library projects created with the Angular CLI, the development configuration default is `true`.
-->
`true`로 설정하면 `@Component` 데코레이터에 사용된 `templateUrl`과 `styleUrls` 프로퍼티를 인라인 `template`과 `styles` 프로퍼티로 변환합니다.

그리고 `ngc` 결과물이 만드는 `.js` 파일도 템플릿 파일과 스타일 파일을 지연로딩하지 않습니다.

Angular CLI로 라이브러리 프로젝트를 생성했을 때 개발 환경의 기본값은 `true`입니다.

<a id="enablelegacytemplate"></a>

### `enableLegacyTemplate`

<!--
When `true`, enables the deprecated `<template>` element in place of `<ng-template>`.
Default is `false`.
Might be required by some third-party Angular libraries.
-->
`true`로 설정하면 Angular 4.0 부터 `<ng-template>`으로 대체된 `<template>` 엘리먼트 사용을 허용합니다.
기본값은 `false`이며 `<template>` 엘리먼트는 DOM 엘리먼트와 이름이 겹치는 것을 막기 위해 지원이 중단되었지만, 서드 파티 Angular 라이브러리가 이 엘리먼트를 사용할 때 `true`로 설정하면 됩니다.

### `flatModuleId`

<!--
The module ID to use for importing a flat module \(when `flatModuleOutFile` is `true`\).
References created by the template compiler use this module name when importing symbols from the flat module.
Ignored if `flatModuleOutFile` is `false`.
-->
`flatModuleOutFile`을 `true`로 설정했을 때 사용하는 플랫 모듈의 ID를 지정합니다.
이 ID는 플랫 모듈에서 심볼을 로드할 때 사용합니다.
`flatModuleOutFile`이 `false` 값이면 이 옵션을 무시합니다.

### `flatModuleOutFile`

<!--
When `true`, generates a flat module index of the given filename and the corresponding flat module metadata.
Use to create flat modules that are packaged similarly to `@angular/core` and `@angular/common`.
When this option is used, the `package.json` for the library should refer to the created flat module index instead of the library index file.

Produces only one `.metadata.json` file, which contains all the metadata necessary for symbols exported from the library index.
In the created `.ngfactory.js` files, the flat module index is used to import symbols. Symbols that include both the public API from the library index as well as shrouded internal symbols.

By default the `.ts` file supplied in the `files` field is assumed to be the library index.
If more than one `.ts` file is specified, `libraryIndex` is used to select the file to use.
If more than one `.ts` file is supplied without a `libraryIndex`, an error is produced.

A flat module index `.d.ts` and `.js` is created with the given `flatModuleOutFile` name in the same location as the library index `.d.ts` file.

For example, if a library uses the `public_api.ts` file as the library index of the module, the `tsconfig.json` `files` field would be `["public_api.ts"]`.
The `flatModuleOutFile` option could then be set, for example, to `"index.js"`, which produces `index.d.ts` and `index.metadata.json` files.
The `module` field of the library's `package.json` would be `"index.js"` and the `typings` field would be `"index.d.ts"`.
-->
`true`로 설정하면 모듈 파일 이름에 맞게 플랫 모듈의 인덱스와 플랫 모듈 메타데이터를 생성합니다.
플랫 모듈을 만들면 `@angular/core`나 `@angular/common` 패키지와 비슷한 결과물을 생성할 수 있습니다.
이 옵션을 활성화하면 라이브러리의 `package.json`는 라이브러리의 인덱스 파일이 아니라 새로 생성된 플랫 모듈의 인덱스 파일을 참조해야 합니다.

`.metadata.json` 파일은 하나만 생성되는데, 이 파일에는 라이브러리에서 외부로 공개한 심볼이 모두 포함됩니다.
그리고 컴파일하면서 생성되는 `.ngfactory.js` 파일 안에서는 이 옵션을 활성화하면서 생성된 모듈 인덱스로 퍼블릭 심볼과 내부 심볼을 참조합니다.

기본 상태에서는 `files` 필드에 지정된 `.ts` 파일을 라이브러리 인덱스 파일로 간주합니다.
그리고 이 목록에 `.ts` 파일이 여러개라면 이 중 하나를 인덱스 파일로 참조하기 위해 `libraryIndex` 필드를 지정해야 합니다.
`files` 필드에 `.ts` 파일이 여러개 등록되었지만 `libraryIndex` 필드를 지정하지 않으면 에러가 발생합니다.

플랫 모듈을 생성하면 모듈 인덱스 파일 `.d.ts` 파일과 `.js` 파일도 `flatModuleOutFile`에 지정된 이름으로 생성됩니다.

예를 들어 봅시다.
라이브러리 인덱스 파일로 `public_api.ts` 파일을 사용하는 라이브러리가 있다고 합시다.
이 라이브러리의 `tsconfig.json` `files` 필드는 `["public_api.ts"]`라고 지정되어 있습니다.
이 상태에서 `flatModuleOutFile` 값을 `"index.js"`로 지정하면 `index.d.ts` 파일과 `index.metadata.json` 파일이 생성됩니다.
그리고 라이브러리 `package.json` 파일의 `module` 필드는 `"index.js"`로 지정하고 `typings` 필드는 `"index.d.ts"`로 지정하면 됩니다.

### `fullTemplateTypeCheck`

<!--
When `true`, the recommended value, enables the [binding expression validation](guide/aot-compiler#binding-expression-validation) phase of the template compiler. This phase uses TypeScript to verify binding expressions.
For more information, see [Template type checking](guide/template-typecheck).

Default is `false`, but when you use the Angular CLI command `ng new --strict`, it is set to `true` in the new project's configuration.

<div class="alert is-important">

The `fullTemplateTypeCheck` option has been deprecated in Angular 13 in favor of the `strictTemplates` family of compiler options.

</div>
-->
`true`로 설정하면 템플릿을 컴파일할 때 TypeScript 컴파일러로 [바인딩 표현식의 유효성을 검사](guide/aot-compiler#binding-expression-validation)하는 단계가 활성화됩니다.
이 옵션은 `true`로 설정하는 것을 권장합니다.
더 자세한 내용은 [템플릿 타입 검사](guide/template-typecheck) 문서를 참고하세요.

이 옵션의 기본값은 `false`지만, Angular CLI `ng new --strict` 명령을 실행하면 프로젝트 `true` 값으로 설정됩니다.

<div class="alert is-important">

The `fullTemplateTypeCheck` option has been deprecated in Angular 13 in favor of the `strictTemplates` family of compiler options.

</div>

### `generateCodeForLibraries`

<!--
When `true`, creates factory files \(`.ngfactory.js` and `.ngstyle.js`\) for `.d.ts` files with a corresponding `.metadata.json` file. The default value is `true`.

When `false`, factory files are created only for `.ts` files.
Do this when using factory summaries.
-->
`true`로 설정하면 `.d.ts`파일과 `.metadata.json` 파일과 연관되는 `.ngfactory.js`, `.ngstyle.js`과 같은 팩토리 파일을 생성합니다.
기본값은 `true`입니다.

`false`로 설정하면 팩토리 파일은 `.ts` 파일만 생성됩니다.
이 옵션값은 팩토리 요약 파일을 생성할 때 사용합니다.

### `preserveWhitespaces`

<!--
When `false`, the default, removes blank text nodes from compiled templates, which results in smaller emitted template factory modules.
Set to `true` to preserve blank text nodes.
-->
`false`로 설정하면 템플릿을 컴파일 한 후에 템플릿에 존재하는 빈 텍스트 노드를 제거하면서 템플릿 팩토리 모듈의 크기를 줄입니다.
그리고 `true`로 설정하면 비어 있는 텍스트 노드를 그대로 유지합니다.

기본값은 `false`입니다.

<div class="alert is-helpful">

When using hydration, it is recommended that you use `preserveWhitespaces: false`, which is the default value. If you choose to enable preserving whitespaces by adding `preserveWhitespaces: true` to your tsconfig, it is possible you may encounter issues with hydration. This is not yet a fully supported configuration. Ensure this is also consistently set between the server and client tsconfig files. See the [hydration guide](guide/hydration#preserve-whitespaces) for more details.

</div>

### `skipMetadataEmit`

<!--
When `true`, does not produce `.metadata.json` files.
Default is `false`.

The `.metadata.json` files contain information needed by the template compiler from a `.ts` file that is not included in the `.d.ts` file produced by the TypeScript compiler.
This information includes, for example, the content of annotations, such as a component's template, which TypeScript emits to the `.js` file but not to the `.d.ts` file.

You can set to `true` when using factory summaries, because the factory summaries include a copy of the information that is in the `.metadata.json` file.

Set to `true` if you are using TypeScript's `--outFile` option, because the metadata files are not valid for this style of TypeScript output.
The Angular community does not recommend using `--outFile` with Angular.
Use a bundler, such as [webpack](https://webpack.js.org), instead.
-->
`true`로 설정하면 `.metadata.json` 파일을 생성하지 않습니다.
기본값은 `false`입니다.

`.metadata.json` 파일에는 `.ts` 파일을 빌드하면서 생성된 `.d.ts` 파일에는 포함되지 않는 정보가 담겨 있습니다.
이 정보는 템플릿을 빌드할 때 필요하지만 TypeScript 컴파일러가 따로 생성하지 않습니다.
컴포넌트 템플릿과 같이 어노테이션 안에 있는 코드가 이런 정보에 해당됩니다.
TypeScript는 이 내용을 `.js` 파일에 생성하지만 `.d.ts` 파일에는 추가하지 않습니다.

팩토리 요약 파일을 생성하려면 `true`로 설정하면 됩니다.
팩토리 요약 파일에는 `.metadata.json` 파일에 있는 정보가 이미 담겨 있습니다.

TypeScript `--outFile` 옵션을 사용하는 경우에는 TypeScript가 생성하는 결과파일과 메타데이터 파일이 호환되지 않기 때문에 이 옵션값을 `true`로 설정해야 합니다.
그래서 Angular 프로젝트를 빌드할 때는 TypeScript `--outFile` 옵션 사용을 권장하지 않습니다.
이 기능이 꼭 필요하다면 [webpack](https://webpack.js.org/)과 같은 번들러를 사용하는 방식으로 우회할 수 있습니다.

### `skipTemplateCodegen`

<!--
When `true`, does not emit `.ngfactory.js` and `.ngstyle.js` files.
This turns off most of the template compiler and disables the reporting of template diagnostics.

Can be used to instruct the template compiler to produce `.metadata.json` files for distribution with an `npm` package. This avoids the production of `.ngfactory.js` and `.ngstyle.js` files that cannot be distributed to `npm`.

For library projects created with the Angular CLI, the development configuration default is `true`.
-->
`true`로 설정하면 `.ngfactory.js` 파일과 `.ngstyle.js` 파일을 생성하지 않습니다.
그리고 이 상태에서는 템플릿을 컴파일하면서 확인할 수 있는 분석 기능도 동작하지 않습니다.

이 옵션은 라이브러리를 npm 저장소에 배포하기 위해 `.ngfactory.js` 파일과 `.ngstyle.js` 파일 생성을 생략할 때 사용합니다.

Angular CLI로 라이브러리 프로젝트를 생성했을 때 개발 환경의 기본값은 `true`입니다.

### `strictMetadataEmit`

<!--
When `true`, reports an error to the `.metadata.json` file if `"skipMetadataEmit"` is `false`.
Default is `false`.
Use only when `"skipMetadataEmit"` is `false` and `"skipTemplateCodegen"` is `true`.

This option is intended to verify the `.metadata.json` files emitted for bundling with an `npm` package.
The validation is strict and can emit errors for metadata that would never produce an error when used by the template compiler.
You can choose to suppress the error emitted by this option for an exported symbol by including `@dynamic` in the comment documenting the symbol.

It is valid for `.metadata.json` files to contain errors.
The template compiler reports these errors if the metadata is used to determine the contents of an annotation.
The metadata collector cannot predict the symbols that are designed for use in an annotation. It preemptively includes error nodes in the metadata for the exported symbols.
The template compiler can then use the error nodes to report an error if these symbols are used.

If the client of a library intends to use a symbol in an annotation, the template compiler does not normally report this. It gets reported after the client actually uses the symbol.
This option allows detection of these errors during the build phase of the library and is used, for example, in producing Angular libraries themselves.

For library projects created with the Angular CLI, the development configuration default is `true`.
-->
`"skipMetadataEmit"` 옵션값이 `false`인 상태에서 `true`로 설정하면 컴파일하면서 발생한 에러를 `.metadata.json` 파일에 남깁니다.
기본값은 `false` 입니다.
이 옵션은 `"skipMetadataEmit"` 옵션값이 `false`이고 `"skipTemplateCodegen"` 옵션값이 `true`일 때만 사용하세요.

이 옵션은 라이브러리를 `npm` 패키지로 배포하기 위해 번들링할 때 `.metadata.json` 파일의 유효성을 확인하기 위해 도입되었습니다.
이 유효성 검사를 활성화하면 이전까지 템플릿 컴파일러가 확인하지 못했던 에러가 추가로 발생할 수 있습니다.
추가로 확인된 에러는 코드를 수정해서 해결하거나 `@dynamic` 데코레이터를 심볼에 붙여서 무시할 수 있습니다.

`.metadata.json` 파일에는 에러가 포함되어도 괜찮습니다.
템플릿 컴파일러가 감지하는 에러는 어노테이션에 사용된 메타데이터에 관한 것입니다.
그런데 메타데이터 컬렉터는 어노테이션에 사용될 심볼을 사전에 예측할 수 없기 때문에 실제로 발생하지 않는 문제도 에러라고 감지할 수도 있습니다.
그렇기 때문에 이 단계에서 발생하는 에러를 반드시 해결해야 하는 것은 아닙니다.

라이브러리 사용자가 어노테이션에 어떤 심볼을 사용하면, 이 단계에서 발생한 에러가 문제되지 않는 상황이 될 수도 있습니다.
이 에러들은 나중에 발생할 수도 있는 에러를 빌드 단계에서 미리 확인해보기 위한 것일 뿐입니다.

Angular CLI로 라이브러리 프로젝트를 생성했을 때 개발 환경의 기본값은 `true`입니다.

### `strictInjectionParameters`

<!--
When `true`, reports an error for a supplied parameter whose injection type cannot be determined.
When `false`, constructor parameters of classes marked with `@Injectable` whose type cannot be resolved produce a warning.
The recommended value is `true`, but the default value is `false`.

When you use the Angular CLI command `ng new --strict`, it is set to `true` in the created project's configuration.
-->
`true` 값\(권장\)으로 지정하면(권장) 의존성 객체의 타입을 결정할 수 없을 때 에러를 표시합니다.
`false` 값으로 지정하면(기본값) 생성자에 주입되는 객체 중 `@Injectable`이 지정되었지만 타입을 결정할 수 없을 때 경고 메시지를 표시합니다.

Angular CLI로 프로젝트를 생성할 때 `ng new --strict` 라고 생성했다면 `true`로 지정되어 있습니다.

### `strictTemplates`

<!--
When `true`, enables [strict template type checking](guide/template-typecheck#strict-mode).

The strictness flags that this option enables allow you to turn on and off specific types of strict template type checking.
See [troubleshooting template errors](guide/template-typecheck#troubleshooting-template-errors).

When you use the Angular CLI command `ng new --strict`, it is set to `true` in the new project's configuration.
-->
`true`로 설정하면 [더 엄격한 템플릿 타입 검사](guide/template-typecheck#strict-mode)를 활성화 합니다.

세부 검사 옵션은 추가 옵션을 지정해서 제어할 수 있습니다.
[템플릿 에러 해결하기](guide/template-typecheck#troubleshooting-template-errors) 문서를 참고하세요.

Angular CLI로 프로젝트를 생성할 때 `ng new --strict` 라고 생성했다면 `true`로 지정되어 있습니다.

### `trace`

<!--
When `true`, prints extra information while compiling templates.
Default is `false`.
-->
`true`로 설정하면 템플릿을 컴파일할 때 좀 더 많은 정보를 제공합니다.
기본값은 `false`입니다.

<a id="cli-options"></a>
## Command line options

Most of the time you interact with the Angular Compiler indirectly using Angular CLI. When debugging certain issues, you might find it useful to invoke the Angular Compiler directly.
You can use the `ngc` command provided by the `@angular/compiler-cli` npm package to call the compiler from the command line.

The `ngc` command is just a wrapper around TypeScript's `tsc` compiler command and is primarily configured via the `tsconfig.json` configuration options documented in [the previous sections](#angular-compiler-options).

Besides the configuration file, you can also use [`tsc` command line options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to configure `ngc`.

<!-- links -->

[AioGuideI18nCommonPrepareMarkTextInComponentTemplate]: guide/i18n-common-prepare#mark-text-in-component-template "Mark text in component template - Prepare component for translation | Angular"

<!-- end links -->

@reviewed 2023-04-19
