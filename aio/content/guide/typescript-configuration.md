<!--
# TypeScript configuration
-->
# TypeScript 설정

<!--
TypeScript is a primary language for Angular application development.
It is a superset of JavaScript with design-time support for type safety and tooling.

Browsers can't execute TypeScript directly.
Typescript must be "transpiled" into JavaScript using the *tsc* compiler, which requires some configuration.

This page covers some aspects of TypeScript configuration and the TypeScript environment
that are important to Angular developers, including details about the following files:

* [tsconfig.json](guide/typescript-configuration#tsconfig)&mdash;TypeScript compiler configuration.
* [typings](guide/typescript-configuration#typings)&mdash;TypesScript declaration files.
-->
Angular 애플리케이션을 개발할 때 가장 많이 사용하는 언어는 TypeScript입니다.
TypeScript는 JavaScript의 슈퍼셋이며 정적 타입을 도입하면서 더 많은 정보를 개발자에게 제공합니다.

하지만 브라우저에서 TypeScript를 직접 실행할 수는 없습니다.
TypeScript 반드시 *tsc* 컴파일러를 통해 JavaScript로 *트랜스파일(transpiled)*되어야 합니다.
그리고 이 때 몇가지 옵션을 지정해야 합니다.

이 문서에서는 TypeScript 개발환경과 환경 설정 파일 중 Angular 개발환경에 필요한 내용에 대해 안내합니다.
주로 다음 파일에 대해 설명합니다:

* [tsconfig.json](guide/typescript-configuration#tsconfig)&mdash;TypeScript 컴파일러 설정 파일
* [typings](guide/typescript-configuration#typings)&mdash;TypesScript 타입 정의 파일


{@a tsconfig}

<!--
## Configuration files
-->
## 환경설정 파일

<!--
A given Angular workspace contains several TypeScript configuration files.
At the root `tsconfig.json` file specifies the base TypeScript and Angular compiler options that all projects in the workspace inherit.

<div class="alert is-helpful">

See the [Angular compiler options](guide/angular-compiler-options) guide for information about what Angular specific options are available.

</div>

The TypeScript and Angular have a wide range of options which can be used to configure type-checking features and generated output.
For more information, see the [Configuration inheritance with extends](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#configuration-inheritance-with-extends) section of the TypeScript documentation.

<div class="alert is-helpful">

For more information TypeScript configuration files, see the official [TypeScript wiki](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
For details about configuration inheritance, see the [Configuration inheritance with extends](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#configuration-inheritance-with-extends) section.

</div>

The initial `tsconfig.json` for an Angular workspace typically looks like the following example.

<code-example lang="json" header="tsconfig.json" linenums="false">
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "es2020",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
</code-example>
-->
Angular 워크스페이스에는 TypeScript 환경설정 파일이 여러개 존재합니다.
최상위 `tsconfig.json` 파일에는 워크스페이스 안에 있는 모든 프로젝트에 적용되는 기본 TypeScript 옵션과 Angular 컴파일러 옵션을 지정합니다.


<div class="alert is-helpful">

Angular 컴파일러에 사용할 수 있는 옵션을 알아보려면 [Angular 컴파일러 옵션](guide/angular-compiler-options) 문서를 참고하세요.

</div>


TypeScript와 Angular는 타입 검사 기능과 빌드 결과물을 생성할 때 사용할 수 있는 옵션을 다양하게 제공합니다.
자세한 내용을 알아보려면 TypeScript 문서의 [Configuration inheritance with extends](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#configuration-inheritance-with-extends) 섹션을 참고하세요.


<div class="alert is-helpful">

TypeScript 환경설정 파일에 대해 자세하게 알아보려면 공식 [TypeScript wiki](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 문서를 참고하세요.
환경설정 파일을 상속하는 것에 대해 알아보려면 [Configuration inheritance with extends](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#configuration-inheritance-with-extends) 섹션을 참고하세요.

</div>

Angular 워크스페이스를 새로 생성했을 때 구성되는 `tsconfig.json` 파일의 내용은 이렇습니다.

<code-example lang="json" header="tsconfig.json" linenums="false">
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "es2020",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
</code-example>


<!--
### Strict mode
-->
### Strict 모드

<!--
When you create new workspaces and projects, you have the option to use Angular's strict mode, which can help you write better, more maintainable code.
For more information, see [Strict mode](/guide/strict-mode).
-->
워크스페이스나 프로젝트를 새로 생성할 때 Angular가 제공하는 strict 모드를 활성화할 수 있습니다.
strict 모드를 사용하면 유지보수하기 유리한 코드를 작성할 수 있습니다.
자세한 내용은 [Strict 모드](/guide/strict-mode) 문서를 참고하세요.


{@a noImplicitAny}

<!--
### *noImplicitAny* and *suppressImplicitAnyIndexErrors*
-->
### *noImplicitAny*와 *suppressImplicitAnyIndexErrors*

<!--
TypeScript developers disagree about whether the `noImplicitAny` flag should be `true` or `false`.
There is no correct answer and you can change the flag later.
But your choice now can make a difference in larger projects, so it merits discussion.

When the `noImplicitAny` flag is `false` (the default), and if
the compiler cannot infer the variable type based on how it's used,
the compiler silently defaults the type to `any`. That's what is meant by *implicit `any`*.

When the `noImplicitAny` flag is `true` and the TypeScript compiler cannot infer
the type, it still generates the JavaScript files, but it also **reports an error**.
Many seasoned developers prefer this stricter setting because type checking catches more
unintentional errors at compile time.

You can set a variable's type to `any` even when the `noImplicitAny` flag is `true`.

When the `noImplicitAny` flag is `true`, you may get *implicit index errors* as well.
Most developers feel that *this particular error* is more annoying than helpful.
You can suppress them with the following additional flag:

<code-example>

  "suppressImplicitAnyIndexErrors": true

</code-example>

<div class="alert is-helpful">

For more information about how the TypeScript configuration affects compilation, see [Angular Compiler Options](guide/angular-compiler-options) and [Template Type Checking](guide/template-typecheck).


</div>
-->
`noImplicitAny` 플래그 값을 무엇으로 지정해야 하는지에 대한 정답은 없습니다.
개발자에 따라 `true`가 편할수도 있고 `false`가 편할수도 있으며, 나중에 이 값을 변경하더라도 큰 문제는 없습니다.
하지만 규모가 큰 프로젝트를 개발한다면 이 플래그의 역할에 대해 확실히 알아두는 것이 좋습니다.

`noImplicitAny` 플래그 값이 `false` (기본값)로 설정되면 타입이 지정되지 않은 변수에 TypeScript의 타입 추론 기능이 동작하며, 최종적으로 타입을 추론하지 못한 변수를 `any` 타입으로 처리합니다.
그래서 이 플래그는 *implicit `any`*를 의미한다고도 볼 수 있습니다.

`noImplicitAny` 플래그의 값이 `true`이면 TypeScript 컴파일러의 타입 추론이 여전히 동작하고 JavaScript로 코드를 변환하는 데에도 문제가 없지만, 타입을 추론하지 못한 변수가 있을 때 **에러가 발생합니다**.
이렇게 설정하면 컴파일 시점에 발생할 수 있는 에러를 좀 더 강력한 정적 타입 룰로 방지할 수 있기 때문에, 많은 개발자들이 이 옵션을 선호합니다.

이 때 `noImplicitAny` 값을 `true`로 지정하더라도 변수 타입에 `any`를 지정하는 것은 여전히 허용됩니다.

`noImplicitAny` 플래그 값이 `true`이면 *추론 인덱스 에러(implicit index errors)*가 발생할 수도 있습니다.
이 에러는 대부분의 개발자들이 귀찮다고 생각하는 에러이기 때문에, 이 에러는 다음 플래그를 추가로 설정해서 무시할 수 있습니다:

<code-example>

  "suppressImplicitAnyIndexErrors": true

</code-example>


<div class="alert is-helpful">

TypeScript 환경설정 파일이 컴파일에 미치는 영향을 확인하려면 [Angular 컴파일러 옵션](guide/angular-compiler-options) 문서와 [템플릿 타입 검사](guide/template-typecheck) 문서를 참고하세요.

</div>


{@a typings}

<!--
## TypeScript typings
-->
## TypeScript 타입 정의 파일

<!--
Many JavaScript libraries, such as jQuery, the Jasmine testing library, and Angular,
extend the JavaScript environment with features and syntax
that the TypeScript compiler doesn't recognize natively.
When the compiler doesn't recognize something, it reports an error.

Use [TypeScript type definition files](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)&mdash;`d.ts files`&mdash;to tell the compiler about the libraries you load.

TypeScript-aware editors leverage these same definition files to display type information about library features.

Many libraries include definition files in their npm packages where both the TypeScript compiler and editors
can find them. Angular is one such library.
The `node_modules/@angular/core/` folder of any Angular application contains several `d.ts` files that describe parts of Angular.

<div class="alert is-helpful">

You don't need to do anything to get *typings* files for library packages that include `d.ts` files.
Angular packages include them already.

</div>
-->
jQuery나 Jasmine과 같이 JavaScript로 만들어진 라이브러리들은 TypeScript 컴파일러가 타입 정보를 인식할 수 없습니다.
그래서 TypeScript 코드를 컴파일 할 때 적절한 타입 정보를 찾지 못하면 에러가 발생합니다.

라이브러리에 대한 타입 정보는 [TypeScript 타입 정의 파일](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)&mdash;`d.ts` 파일&mdash;로 제공할 수 있습니다.

그리고 TypeScript 지원 기능을 제공하는 에디터라면 이 타입 정의 파일을 활용해서 개발자에게 라이브러리에 대한 정보를 좀 더 많이 제공할 수 있습니다.

최근에는 npm 패키지들도 타입 정의 파일을 포함해서 배포하고 있기 때문에 TypeScript 컴파일러와 에디터들도 이 파일을 활용할 수 있습니다.
Angular도 이런 경우에 해당됩니다.
`node_modules/@angulalr/core/` 폴더만 봐도 Angular에 대한 타입 정의 파일이 여러개 정의되어 있습니다.

<div class="alert is-helpful">

**패키지에서 `d.ts` 파일을 제공한다면 *타입 정의 파일*을 따로 추가할 필요가 없습니다.**

</div>


### lib.d.ts

<!--
TypeScript includes a special declaration file called `lib.d.ts`. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM.

Based on the `--target`, TypeScript adds _additional_ ambient declarations
like `Promise` if the target is `es6`.

By default, the target is `es2015`. If you are targeting `es5`, you still have newer type declarations due to the list of declaration files included:

<code-example path="getting-started/tsconfig.0.json" header="tsconfig.json (lib excerpt)" region="lib"></code-example>
-->
TypeScript에는 조금 특별한 타입 정의 파일인 `lib.d.ts`가 있습니다.
이 파일은 실행 시점의 JavaScript 객체나 DOM 객체에 대한 타입을 제공합니다.

TypeScript 컴파일에 사용하는 `--target` 옵션에 따라 타입 정의 파일이 _추가로_ 생성될 수도 있습니다.
`--target` 옵션이 `es6`라면 `Promise`에 대한 타입 정의가 추가되는 식입니다.

`target` 기본값은 `es2015` 입니다.
`es5` 문법으로 빌드하려면 타입 정의 파일을 추가해야 합니다:

<code-example path="getting-started/tsconfig.0.json" header="tsconfig.json (lib 일부)" region="lib"></code-example>


<!--
### Installable typings files
-->
### 타입정의 파일 설치하기

<!--
Many libraries&mdash;jQuery, Jasmine, and Lodash among them&mdash;do *not* include `d.ts` files in their npm packages.
Fortunately, either their authors or community contributors have created separate `d.ts` files for these libraries and
published them in well-known locations.

You can install these typings with `npm` using the
[`@types/*` scoped package](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

Which ambient declaration files in `@types/*` are automatically included is determined by
the [`types` TypeScript compiler option](https://www.typescriptlang.org/tsconfig#types). The Angular
CLI generates a `tsconfig.app.json` file which is used to build an application, in which the
`types` compiler option is set to `[]` to disable automatic inclusion of declarations
from `@types/*`. Similarly, the `tsconfig.spec.json` file is used for testing and sets
`"types": ["jasmine"]` to allow using Jasmine's ambient declarations in tests.

After installing `@types/*` declarations, you have to update the `tsconfig.app.json` and
`tsconfig.spec.json` files to add the newly installed declarations to the list of `types`. If the
declarations are only meant for testing, then only the `tsconfig.spec.json` file should be updated.

For instance, to install typings for `chai` you run `npm install @types/chai --save-dev` and then
update `tsconfig.spec.json` to add `"chai"` to the list of `types`.
-->
npm 패키지 중에는 `d.ts` 파일을 제공하지 *않는* 패키지들도 많습니다.
jQuery나 Jasmine, Lodash 들이 그렇습니다.
하지만 다행히 라이브러리 개발자나 커뮤니티 기여자들이 이 라이브러리에 대한 `d.ts` 파일을 추가로 제공하는 경우가 있습니다.

이런 타입 정의 파일은 TypeScript 2.0부터 [`@types/*` 로 시작하는 패키지](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)로 제공되며, `npm`으로 설치하면 자동으로 인식됩니다.

이런 패키지를 설치하고 나면 `@types/*` 안에 있는 타입 정의 파일들이 [TypeScript 컴파일러 옵션 중 `types`](https://www.typescriptlang.org/tsconfig#types) 설정에 따라 자동으로 로드됩니다.
Angular CLI는 애플리케이션을 빌드하기 위해 `tsconfig.app.json` 파일을 생성하는데, 이 파일을 보면 `@types/*`에 존재하는 타입 정의 파일을 자동으로 불러오지 않기 위해  `types` 컴파일러 옵션값을 `[]`로 지정한 것을 확인할 수 있습니다.
그리고 `tsconfig.spec.json` 파일을 보면 Jasmin 타입 정의 파일을 불러오기 위해 `"types": ["jasmine"]`를 지정한 것을 확인할 수 있습니다.

`@types/*` 패키지를 설치하고 나면 `tsconfig.app.json` 파일이나 `tsconfig.spec.json` 파일의 `types` 목록을 수정해야 합니다.
테스트 용도로만 사용되는 패키지라면 `tsconfig.spec.json` 파일만 수정하면 됩니다.

예를 들어 `npm install @types/chai --save-dev` 명령을 실행해서 `chai`에 해당하는 타입 정의 파일을 설치했다면 `tsconfig.spec.json` 파일의 `types` 옵션에 `"chai"`를 추가하면 됩니다.


{@a target}


### *target*

<!--
By default, the target is `es2017`, which is supported in modern browsers.
-->
기본값은 `es2017`이며, 최신 브라우저는 모두 이 문법을 지원합니다.