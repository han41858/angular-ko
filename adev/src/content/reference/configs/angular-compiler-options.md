<!--
# Angular compiler options
-->

<a id="angular-compiler-options"></a>

# Angular 컴파일러 옵션

<!--
When you use [ahead-of-time compilation (AOT)](tools/cli/aot-compiler), you can control how your application is compiled by specifying Angular compiler options in the [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

The Angular options object, `angularCompilerOptions`, is a sibling to the `compilerOptions` object that supplies standard options to the TypeScript compiler.

<docs-code header="tsconfig.json" path="adev/src/content/examples/angular-compiler-options/tsconfig.json" region="angular-compiler-options"/>
-->

[사전 컴파일(AOT)](tools/cli/aot-compiler)을 사용할 때 [TypeScript 설정 파일](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)에 Angular 컴파일러 옵션을 지정하여 애플리케이션이 컴파일되는 방식을 제어할 수 있습니다.

Angular 옵션 객체인 `angularCompilerOptions`는 TypeScript 컴파일러에 표준 옵션을 제공하는 `compilerOptions` 객체와 같은 계층에 있습니다.

<docs-code header="tsconfig.json" path="adev/src/content/examples/angular-compiler-options/tsconfig.json" region="angular-compiler-options"/>

<!--
## Configuration inheritance with `extends`
-->

<a id="configuration-inheritance-with-extends"></a>

## `extends`로 설정 상속하기

<!--
Like the TypeScript compiler, the Angular AOT compiler also supports `extends` in the `angularCompilerOptions` section of the TypeScript configuration file.
The `extends` property is at the top level, parallel to `compilerOptions` and `angularCompilerOptions`.

A TypeScript configuration can inherit settings from another file using the `extends` property.
The configuration options from the base file are loaded first, then overridden by those in the inheriting configuration file.

For example:

<docs-code header="tsconfig.app.json" path="adev/src/content/examples/angular-compiler-options/tsconfig.app.json" region="angular-compiler-options-app"/>

For more information, see the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
-->

TypeScript 컴파일러와 마찬가지로 Angular AOT 컴파일러도 TypeScript 설정 파일의 `angularCompilerOptions` 섹션에서 `extends`를 통한 상속을 지원합니다.
`extends` 프로퍼티는 `compilerOptions`, `angularCompilerOptions`와 나란히 최상위 수준에 위치합니다.

TypeScript 설정은 `extends` 프로퍼티를 사용해 다른 파일의 설정을 상속할 수 있습니다.
기본 파일의 설정 옵션을 먼저 불러온 다음, 이를 상속하는 설정 파일의 옵션으로 덮어씁니다.

예를 들면 다음과 같습니다.

<docs-code header="tsconfig.app.json" path="adev/src/content/examples/angular-compiler-options/tsconfig.app.json" region="angular-compiler-options-app"/>

자세한 내용은 [TypeScript 핸드북](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)을 참고하세요.

<!--
## Template options
-->

<a id="template-options"></a>

## 템플릿 옵션

<!--
The following options are available for configuring the Angular AOT compiler.
-->

Angular AOT 컴파일러를 설정할 때 다음 옵션을 사용할 수 있습니다.

<!--
### `annotationsAs`
-->

<a id="annotationsas"></a>

### `annotationsAs` 옵션

<!--
Modifies how Angular-specific annotations are emitted to improve tree-shaking.
Non-Angular annotations are not affected.
One of `static fields` or `decorators`. The default value is `static fields`.

- By default, the compiler replaces decorators with a static field in the class, which allows advanced tree-shakers like [Closure compiler](https://github.com/google/closure-compiler) to remove unused classes
- The `decorators` value leaves the decorators in place, which makes compilation faster.
  TypeScript emits calls to the `__decorate` helper.
  Use `--emitDecoratorMetadata` for runtime reflection.

  HELPFUL: That the resulting code cannot tree-shake properly.
-->

트리 셰이킹을 개선하기 위해 Angular 전용 어노테이션을 출력하는 방식을 변경합니다.
Angular와 관련 없는 어노테이션에는 영향을 주지 않습니다.
`static fields` 또는 `decorators`를 지정할 수 있습니다. 기본값은 `static fields`입니다.

- 기본적으로 컴파일러는 데코레이터를 클래스의 정적 필드로 대체합니다. 이를 통해 [Closure 컴파일러](https://github.com/google/closure-compiler)와 같은 고급 트리 셰이킹 도구가 사용하지 않는 클래스를 제거할 수 있습니다.
- `decorators`를 지정하면 데코레이터를 그대로 두므로 컴파일이 더 빨라집니다.
  TypeScript는 `__decorate` 헬퍼를 호출하는 코드를 출력합니다.
  런타임 리플렉션에는 `--emitDecoratorMetadata`를 사용하세요.

  HELPFUL: 이 경우 생성된 코드에 트리 셰이킹이 제대로 적용되지 않습니다.

<!--
### `annotateForClosureCompiler`
-->

<a id="annotateforclosurecompiler"></a>

### `annotateForClosureCompiler` 옵션

<!-- vale Angular.Angular_Spelling = NO -->

<!--
When `true`, use [Tsickle](https://github.com/angular/tsickle) to annotate the emitted JavaScript with [JSDoc](https://jsdoc.app) comments needed by the [Closure Compiler](https://github.com/google/closure-compiler).
Default is `false`.
-->

<!-- vale Angular.Angular_Spelling = YES -->

<!-- vale Angular.Angular_Spelling = NO -->

`true`이면 [Tsickle](https://github.com/angular/tsickle)을 사용해 출력되는 JavaScript에 [Closure 컴파일러](https://github.com/google/closure-compiler)가 필요로 하는 [JSDoc](https://jsdoc.app) 주석을 추가합니다.
기본값은 `false`입니다.

<!-- vale Angular.Angular_Spelling = YES -->

<!--
### `compilationMode`
-->

<a id="compilationmode"></a>

### `compilationMode` 옵션

<!--
Specifies the compilation mode to use.
The following modes are available:

| Modes       | Details                                                                                             |
| :---------- | :-------------------------------------------------------------------------------------------------- |
| `'full'`    | Generates fully AOT-compiled code according to the version of Angular that is currently being used. |
| `'partial'` | Generates code in a stable, but intermediate form suitable for a published library.                 |

The default value is `'full'`.

For most applications, `'full'` is the correct compilation mode.

Use `'partial'` for independently published libraries, such as npm packages.
`'partial'` compilations output a stable, intermediate format which better supports usage by applications built at different Angular versions from the library.
Libraries built at "HEAD" alongside their applications and using the same version of Angular such as in a mono-repository can use `'full'` since there is no risk of version skew.
-->

사용할 컴파일 모드를 지정합니다.
다음 모드를 사용할 수 있습니다.

| 모드        | 설명                                                                     |
| :---------- | :----------------------------------------------------------------------- |
| `'full'`    | 현재 사용하는 Angular 버전에 맞춰 완전히 AOT 컴파일된 코드를 생성합니다. |
| `'partial'` | 배포할 라이브러리에 적합한 안정적인 중간 형식의 코드를 생성합니다.       |

기본값은 `'full'`입니다.

대부분의 애플리케이션에는 `'full'` 컴파일 모드가 적합합니다.

npm 패키지처럼 독립적으로 배포하는 라이브러리에는 `'partial'`을 사용하세요.
`'partial'` 컴파일은 안정적인 중간 형식을 출력하므로 라이브러리와 다른 Angular 버전으로 빌드된 애플리케이션에서 라이브러리를 사용하기에 더 적합합니다.
모노레포처럼 애플리케이션과 함께 "HEAD"에서 빌드되고 같은 Angular 버전을 사용하는 라이브러리는 버전 불일치 위험이 없으므로 `'full'`을 사용할 수 있습니다.

<!--
### `disableTypeScriptVersionCheck`
-->

<a id="disabletypescriptversioncheck"></a>

### `disableTypeScriptVersionCheck` 옵션

<!--
When `true`, the compiler does not look at the TypeScript version and does not report an error when an unsupported version of TypeScript is used.
Not recommended, as unsupported versions of TypeScript might have undefined behavior.
Default is `false`.
-->

`true`이면 컴파일러가 TypeScript 버전을 확인하지 않으며 지원하지 않는 TypeScript 버전을 사용해도 오류를 보고하지 않습니다.
지원하지 않는 TypeScript 버전은 동작이 정의되지 않을 수 있으므로 권장하지 않습니다.
기본값은 `false`입니다.

<!--
### `enableI18nLegacyMessageIdFormat`
-->

<a id="enablei18nlegacymessageidformat"></a>

### `enableI18nLegacyMessageIdFormat` 옵션

<!--
Instructs the Angular template compiler to create legacy ids for messages that are tagged in templates by the `i18n` attribute.
See [Mark text for translations][GuideI18nCommonPrepareMarkTextInComponentTemplate] for more information about marking messages for localization.

Set this option to `false` unless your project relies upon translations that were created earlier using legacy IDs.
Default is `true`.

The pre-Ivy message extraction tooling created a variety of legacy formats for extracted message IDs.
These message formats have some issues, such as whitespace handling and reliance upon information inside the original HTML of a template.

The new message format is more resilient to whitespace changes, is the same across all translation file formats, and can be created directly from calls to `$localize`.
This allows `$localize` messages in application code to use the same ID as identical `i18n` messages in component templates.

IMPORTANT: This option is only supported by the `@angular-devkit/build-angular:browser` builder.
When using the `@angular/build:application` builder (esbuild), this option has no effect and the new decimal message ID format is always used regardless of this setting.
-->

템플릿에서 `i18n` 속성으로 표시한 메시지에 대해 Angular 템플릿 컴파일러가 기존 형식의 ID를 생성하도록 합니다.
지역화를 위해 메시지를 표시하는 방법은 [번역할 텍스트 표시하기][GuideI18nCommonPrepareMarkTextInComponentTemplate]를 참고하세요.

프로젝트가 이전에 기존 형식의 ID로 생성한 번역에 의존하는 경우가 아니라면 이 옵션을 `false`로 설정하세요.
기본값은 `true`입니다.

Ivy 이전의 메시지 추출 도구는 추출한 메시지 ID에 여러 가지 기존 형식을 사용했습니다.
이러한 메시지 형식에는 공백 처리 문제와 템플릿 원본 HTML의 정보에 의존하는 문제 등이 있습니다.

새 메시지 형식은 공백 변경에 더 견고하며, 모든 번역 파일 형식에서 동일하고, `$localize` 호출로 직접 생성할 수 있습니다.
따라서 애플리케이션 코드의 `$localize` 메시지에 컴포넌트 템플릿의 동일한 `i18n` 메시지와 같은 ID를 사용할 수 있습니다.

IMPORTANT: 이 옵션은 `@angular-devkit/build-angular:browser` 빌더에서만 지원합니다.
`@angular/build:application` 빌더(esbuild)를 사용할 때는 이 옵션이 적용되지 않으며, 이 설정과 관계없이 항상 새로운 십진수 메시지 ID 형식을 사용합니다.

<!--
### `enableResourceInlining`
-->

<a id="enableresourceinlining"></a>

### `enableResourceInlining` 옵션

<!--
When `true`, replaces the `templateUrl` and `styleUrls` properties in all `@Component` decorators with inline content in the `template` and `styles` properties.

When enabled, the `.js` output of `ngc` does not include any lazy-loaded template or style URLs.

For library projects created with the Angular CLI, the development configuration default is `true`.
-->

`true`이면 모든 `@Component` 데코레이터의 `templateUrl`과 `styleUrls` 프로퍼티를 인라인 콘텐츠가 들어 있는 `template`과 `styles` 프로퍼티로 대체합니다.

이 옵션을 활성화하면 `ngc`가 출력하는 `.js` 파일에 지연 로딩할 템플릿이나 스타일 URL이 포함되지 않습니다.

Angular CLI로 생성한 라이브러리 프로젝트에서는 개발 설정의 기본값이 `true`입니다.

<!--
### `flatModuleId`
-->

<a id="flatmoduleid"></a>

### `flatModuleId` 옵션

<!--
The module ID to use for importing a flat module \(when `flatModuleOutFile` is `true`\).
References created by the template compiler use this module name when importing symbols from the flat module.
Ignored if `flatModuleOutFile` is `false`.
-->

플랫 모듈을 가져올 때 사용할 모듈 ID입니다(`flatModuleOutFile`에 파일 이름을 지정한 경우).
템플릿 컴파일러가 생성하는 참조는 플랫 모듈에서 심벌을 가져올 때 이 모듈 이름을 사용합니다.
`flatModuleOutFile`을 지정하지 않으면 무시됩니다.

<!--
### `flatModuleOutFile`
-->

<a id="flatmoduleoutfile"></a>

### `flatModuleOutFile` 옵션

<!--
When `true`, generates a flat module index of the given filename and the corresponding flat module metadata.
Use to create flat modules that are packaged similarly to `@angular/core` and `@angular/common`.
When this option is used, the `package.json` for the library should refer to the created flat module index instead of the library index file.

Produces only one `.metadata.json` file, which contains all the metadata necessary for symbols exported from the library index.
In the created `.ngfactory.js` files, the flat module index is used to import symbols. Symbols that include both the public API from the library index and shrouded internal symbols.

By default, the `.ts` file supplied in the `files` field is assumed to be the library index.
If more than one `.ts` file is specified, `libraryIndex` is used to select the file to use.
If more than one `.ts` file is supplied without a `libraryIndex`, an error is produced.

A flat module index `.d.ts` and `.js` is created with the given `flatModuleOutFile` name in the same location as the library index `.d.ts` file.

For example, if a library uses the `public_api.ts` file as the library index of the module, the `tsconfig.json` `files` field would be `["public_api.ts"]`.
The `flatModuleOutFile` option could then be set, for example, to `"index.js"`, which produces `index.d.ts` and `index.metadata.json` files.
The `module` field of the library's `package.json` would be `"index.js"` and the `typings` field would be `"index.d.ts"`.
-->

출력 파일 이름을 지정하면 해당 이름으로 플랫 모듈 인덱스와 메타데이터를 생성합니다.
`@angular/core`, `@angular/common`과 비슷한 방식으로 패키징되는 플랫 모듈을 만들 때 사용합니다.
이 옵션을 사용할 때 라이브러리의 `package.json`은 라이브러리 인덱스 파일 대신 생성된 플랫 모듈 인덱스를 참조해야 합니다.

라이브러리 인덱스에서 내보낸 심벌에 필요한 모든 메타데이터를 담은 `.metadata.json` 파일을 하나만 생성합니다.
생성된 `.ngfactory.js` 파일에서는 플랫 모듈 인덱스를 사용해 심벌을 가져옵니다. 여기에는 라이브러리 인덱스의 공개 API와 숨겨진 내부 심벌이 모두 포함됩니다.

기본적으로 `files` 필드에 지정한 `.ts` 파일을 라이브러리 인덱스로 간주합니다.
`.ts` 파일을 여러 개 지정하면 `libraryIndex`를 사용해 사용할 파일을 선택합니다.
`libraryIndex` 없이 `.ts` 파일을 여러 개 지정하면 오류가 발생합니다.

지정한 `flatModuleOutFile` 이름으로 플랫 모듈 인덱스 `.d.ts`와 `.js`를 생성하며, 위치는 라이브러리 인덱스 `.d.ts` 파일과 같습니다.

예를 들어 라이브러리가 `public_api.ts` 파일을 모듈의 라이브러리 인덱스로 사용한다면 `tsconfig.json`의 `files` 필드는 `["public_api.ts"]`가 됩니다.
이때 `flatModuleOutFile` 옵션을 `"index.js"` 등으로 설정하면 `index.d.ts`와 `index.metadata.json` 파일이 생성됩니다.
라이브러리 `package.json`의 `module` 필드는 `"index.js"`, `typings` 필드는 `"index.d.ts"`가 됩니다.

<!--
### `generateCodeForLibraries`
-->

<a id="generatecodeforlibraries"></a>

### `generateCodeForLibraries` 옵션

<!--
When `true`, creates factory files \(`.ngfactory.js` and `.ngstyle.js`\) for `.d.ts` files with a corresponding `.metadata.json` file. The default value is `true`.

When `false`, factory files are created only for `.ts` files.
Do this when using factory summaries.
-->

`true`이면 대응하는 `.metadata.json` 파일이 있는 `.d.ts` 파일에 대해 팩토리 파일(`.ngfactory.js`와 `.ngstyle.js`)을 생성합니다. 기본값은 `true`입니다.

`false`이면 `.ts` 파일에 대해서만 팩토리 파일을 생성합니다.
팩토리 요약 정보를 사용할 때는 `false`로 설정하세요.

<!--
### `preserveWhitespaces`
-->

<a id="preservewhitespaces"></a>

### `preserveWhitespaces` 옵션

<!--
When `false`, the default, removes blank text nodes from compiled templates, which results in smaller emitted template factory modules.
Set to `true` to preserve blank text nodes.

HELPFUL: When using hydration, it is recommended that you use `preserveWhitespaces: false`, which is the default value. If you choose to enable preserving whitespaces by adding `preserveWhitespaces: true` to your tsconfig, it is possible you may encounter issues with hydration. This is not yet a fully supported configuration. Ensure this is also consistently set between the server and client tsconfig files. See the [hydration guide](guide/hydration#preserve-whitespaces-configuration) for more details.
-->

기본값인 `false`이면 컴파일된 템플릿에서 빈 텍스트 노드를 제거하여 출력되는 템플릿 팩토리 모듈의 크기를 줄입니다.
빈 텍스트 노드를 유지하려면 `true`로 설정하세요.

HELPFUL: 하이드레이션을 사용할 때는 기본값인 `preserveWhitespaces: false`를 사용하는 것이 좋습니다. tsconfig에 `preserveWhitespaces: true`를 추가해 공백을 유지하면 하이드레이션에서 문제가 발생할 수 있습니다. 이 설정은 아직 완전히 지원되지 않습니다. 서버와 클라이언트의 tsconfig 파일에서도 이 설정이 일치하도록 해야 합니다. 자세한 내용은 [하이드레이션 가이드](guide/hydration#preserve-whitespaces-configuration)를 참고하세요.

<!--
### `skipMetadataEmit`
-->

<a id="skipmetadataemit"></a>

### `skipMetadataEmit` 옵션

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

`true`이면 `.metadata.json` 파일을 생성하지 않습니다.
기본값은 `false`입니다.

`.metadata.json` 파일에는 `.ts` 파일의 정보 중 TypeScript 컴파일러가 생성하는 `.d.ts` 파일에 포함되지 않지만 템플릿 컴파일러에는 필요한 정보가 담깁니다.
예를 들어 컴포넌트 템플릿과 같은 어노테이션 내용이 이에 해당하며, TypeScript는 이 정보를 `.js` 파일에는 출력하지만 `.d.ts` 파일에는 출력하지 않습니다.

팩토리 요약 정보에는 `.metadata.json` 파일의 정보 사본이 포함되므로 팩토리 요약 정보를 사용할 때는 이 옵션을 `true`로 설정할 수 있습니다.

TypeScript의 `--outFile` 옵션을 사용할 때는 메타데이터 파일이 이 TypeScript 출력 형식에 적합하지 않으므로 `true`로 설정하세요.
Angular 커뮤니티에서는 Angular와 함께 `--outFile`을 사용하는 것을 권장하지 않습니다.
대신 [webpack](https://webpack.js.org)과 같은 번들러를 사용하세요.

<!--
### `skipTemplateCodegen`
-->

<a id="skiptemplatecodegen"></a>

### `skipTemplateCodegen` 옵션

<!--
When `true`, does not emit `.ngfactory.js` and `.ngstyle.js` files.
This turns off most of the template compiler and disables the reporting of template diagnostics.

Can be used to instruct the template compiler to produce `.metadata.json` files for distribution with an `npm` package. This avoids the production of `.ngfactory.js` and `.ngstyle.js` files that cannot be distributed to `npm`.

For library projects created with the Angular CLI, the development configuration default is `true`.
-->

`true`이면 `.ngfactory.js`와 `.ngstyle.js` 파일을 출력하지 않습니다.
이 옵션은 템플릿 컴파일러의 대부분을 끄고 템플릿 진단 보고를 비활성화합니다.

템플릿 컴파일러가 `npm` 패키지와 함께 배포할 `.metadata.json` 파일을 생성하도록 할 때 사용할 수 있습니다. 이렇게 하면 `npm`에 배포할 수 없는 `.ngfactory.js`와 `.ngstyle.js` 파일의 생성을 피할 수 있습니다.

Angular CLI로 생성한 라이브러리 프로젝트에서는 개발 설정의 기본값이 `true`입니다.

<!--
### `strictMetadataEmit`
-->

<a id="strictmetadataemit"></a>

### `strictMetadataEmit` 옵션

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

`true`이고 `"skipMetadataEmit"`이 `false`이면 오류를 `.metadata.json` 파일에 보고합니다.
기본값은 `false`입니다.
`"skipMetadataEmit"`이 `false`이고 `"skipTemplateCodegen"`이 `true`일 때만 사용하세요.

이 옵션은 `npm` 패키지에 번들링하기 위해 출력한 `.metadata.json` 파일을 검증하기 위한 것입니다.
검증이 엄격하므로 템플릿 컴파일러에서 사용하면 오류가 발생하지 않는 메타데이터에 대해서도 오류가 발생할 수 있습니다.
내보내는 심벌의 문서화 주석에 `@dynamic`을 포함하면 해당 심벌에 대해 이 옵션이 발생시키는 오류를 억제할 수 있습니다.

`.metadata.json` 파일에 오류가 포함되어 있어도 유효합니다.
템플릿 컴파일러는 이 메타데이터를 사용해 어노테이션 내용을 결정할 때 이러한 오류를 보고합니다.
메타데이터 수집기는 어떤 심벌이 어노테이션에 사용되도록 설계되었는지 예측할 수 없으므로, 내보내는 심벌의 메타데이터에 미리 오류 노드를 포함합니다.
이후 템플릿 컴파일러는 이 심벌이 사용될 경우 오류 노드를 활용해 오류를 보고할 수 있습니다.

라이브러리를 사용하는 쪽에서 심벌을 어노테이션에 사용하려고 하더라도 템플릿 컴파일러는 일반적으로 오류를 미리 보고하지 않습니다. 실제로 심벌을 사용한 뒤에 오류를 보고합니다.
이 옵션을 사용하면 라이브러리 빌드 단계에서 이러한 오류를 감지할 수 있으며, Angular 라이브러리 자체를 제작할 때도 사용합니다.

Angular CLI로 생성한 라이브러리 프로젝트에서는 개발 설정의 기본값이 `true`입니다.

<!--
### `strictInjectionParameters`
-->

<a id="strictinjectionparameters"></a>

### `strictInjectionParameters` 옵션

<!--
When `true`, reports an error for a supplied parameter whose injection type cannot be determined.
When `false`, constructor parameters of classes marked with `@Injectable` whose type cannot be resolved produce a warning.
The recommended value is `true`, but the default value is `false`.

When you use the Angular CLI command `ng new --strict`, it is set to `true` in the created project's configuration.
-->

`true`이면 전달된 인자의 주입 타입을 확인할 수 없을 때 오류를 보고합니다.
`false`이면 `@Injectable`로 표시한 클래스의 생성자 인자 중 타입을 확인할 수 없는 인자에 대해 경고를 생성합니다.
권장값은 `true`이지만 기본값은 `false`입니다.

Angular CLI 명령어 `ng new --strict`를 사용하면 생성한 프로젝트의 설정에서 이 값이 `true`로 설정됩니다.

<!--
### `strictTemplates`
-->

<a id="stricttemplates"></a>

### `strictTemplates` 옵션

<!--
When `true`, enables [strict template type checking](tools/cli/template-typecheck#strict-mode).

The strictness flags that this option enables allow you to turn on and off specific types of strict template type checking.
See [troubleshooting template errors](tools/cli/template-typecheck#troubleshooting-template-errors).
Default is `true`.
-->

`true`이면 [엄격한 템플릿 타입 검사](tools/cli/template-typecheck#strict-mode)를 활성화합니다.

이 옵션이 활성화하는 엄격성 플래그로 특정 종류의 엄격한 템플릿 타입 검사를 켜거나 끌 수 있습니다.
[템플릿 오류 해결하기](tools/cli/template-typecheck#troubleshooting-template-errors)를 참고하세요.
기본값은 `true`입니다.

<!--
### `strictStandalone`
-->

<a id="strictstandalone"></a>

### `strictStandalone` 옵션

<!--
When `true`, reports an error if a component, directive, or pipe is not standalone.
-->

`true`이면 컴포넌트, 디렉티브, 파이프가 독립형이 아닐 때 오류를 보고합니다.

<!--
### `trace`
-->

<a id="trace"></a>

### `trace` 옵션

<!--
When `true`, prints extra information while compiling templates.
Default is `false`.
-->

`true`이면 템플릿을 컴파일하는 동안 추가 정보를 출력합니다.
기본값은 `false`입니다.

<!--
### `typeCheckHostBindings`
-->

<a id="typecheckhostbindings"></a>

### `typeCheckHostBindings` 옵션

<!--
When `true`, enables type checking of expressions in the `host` object literal and `@HostBinding`/`@HostListener` decorators of components and directives.
Default is `true`.
-->

`true`이면 컴포넌트와 디렉티브의 `host` 객체 리터럴 및 `@HostBinding`/`@HostListener` 데코레이터 안에 있는 표현식의 타입 검사를 활성화합니다.
기본값은 `true`입니다.

<!--
## Command line options
-->

<a id="command-line-options"></a>

## 명령줄 옵션

<!--
Most of the time, you interact with the Angular Compiler indirectly using [Angular CLI](reference/configs/angular-compiler-options). When debugging certain issues, you might find it useful to invoke the Angular Compiler directly.
You can use the `ngc` command provided by the `@angular/compiler-cli` npm package to call the compiler from the command line.

The `ngc` command is a wrapper around TypeScript's `tsc` compiler command. The Angular Compiler is primarily configured through `tsconfig.json` while Angular CLI is primarily configured through `angular.json`.

Besides the configuration file, you can also use [`tsc` command line options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to configure `ngc`.

[GuideI18nCommonPrepareMarkTextInComponentTemplate]: guide/i18n/prepare#mark-text-in-component-template 'Mark text in component template - Prepare component for translation | Angular'
-->

대부분의 경우 [Angular CLI](tools/cli)를 통해 Angular 컴파일러를 간접적으로 사용합니다. 특정 문제를 디버깅할 때는 Angular 컴파일러를 직접 실행하는 것이 도움이 될 수 있습니다.
`@angular/compiler-cli` npm 패키지가 제공하는 `ngc` 명령어로 명령줄에서 컴파일러를 호출할 수 있습니다.

`ngc` 명령어는 TypeScript의 `tsc` 컴파일러 명령어를 감싸는 래퍼입니다. Angular 컴파일러는 주로 `tsconfig.json`으로 설정하며, Angular CLI는 주로 `angular.json`으로 설정합니다.

설정 파일 외에도 [`tsc` 명령줄 옵션](https://www.typescriptlang.org/docs/handbook/compiler-options.html)으로 `ngc`를 설정할 수 있습니다.

[GuideI18nCommonPrepareMarkTextInComponentTemplate]: guide/i18n/prepare#mark-text-in-component-template '컴포넌트 템플릿에서 텍스트 표시하기 - 번역할 컴포넌트 준비하기 | Angular'
