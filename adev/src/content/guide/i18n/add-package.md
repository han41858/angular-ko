<!--
# Add the localize package
-->

<a id="add-the-localize-package"></a>

# localize 패키지 추가하기

<!--
To take advantage of the localization features of Angular, use the [Angular CLI][CliMain] to add the `@angular/localize` package to your project.

To add the `@angular/localize` package, use the following command to update the `package.json` and TypeScript configuration files in your project.

<docs-code language="shell" path="adev/src/content/examples/i18n/doc-files/commands.sh" region="add-localize"/>

It adds `types: ["@angular/localize"]` in the TypeScript configuration files.
It also adds line `/// <reference types="@angular/localize" />` at the top of the `main.ts` file which is the reference to the type definition.

HELPFUL: For more information about `package.json` and `tsconfig.json` files, see [Workspace npm dependencies][GuideNpmPackages] and [TypeScript Configuration][GuideTsConfig]. To learn about Triple-slash Directives visit [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-).

If `@angular/localize` is not installed and you try to build a localized version of your project (for example, while using the `i18n` attributes in templates), the [Angular CLI][CliMain] will generate an error, which would contain the steps that you can take to enable i18n for your project.
-->

Angular의 현지화 기능을 사용하려면 [Angular CLI][CliMain]로 프로젝트에 `@angular/localize` 패키지를 추가하세요.

`@angular/localize` 패키지를 추가하려면 다음 명령으로 프로젝트의 `package.json`과 TypeScript 설정 파일을 갱신하세요.

<docs-code language="shell" path="adev/src/content/examples/i18n/doc-files/commands.sh" region="add-localize"/>

이 명령은 TypeScript 설정 파일에 `types: ["@angular/localize"]`를 추가합니다.
또한 타입 정의를 참조하는 `/// <reference types="@angular/localize" />` 구문을 `main.ts` 파일 맨 위에 추가합니다.

도움말: `package.json`과 `tsconfig.json` 파일에 대한 자세한 내용은 [작업 공간의 npm 의존성][GuideNpmPackages]과 [TypeScript 설정][GuideTsConfig]을 참고하세요.
삼중 슬래시 지시문에 대해 알아보려면 [TypeScript 핸드북](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-)을 참고하세요.

`@angular/localize`를 설치하지 않은 상태에서 현지화된 프로젝트 버전을 빌드하려고 하면(예를 들어 템플릿에서 `i18n` 어트리뷰트를 사용하는 경우), [Angular CLI][CliMain]가 오류를 표시합니다.
이 오류에는 프로젝트에서 i18n을 활성화하는 방법이 안내됩니다.

<!--
## Options
-->

<a id="options"></a>

## 옵션

<!--
| OPTION             | DESCRIPTION                                                                                                                                                                                   | VALUE TYPE | DEFAULT VALUE |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `--project`        | The name of the project.                                                                                                                                                                      | `string`   |
| `--use-at-runtime` | If set, then `$localize` can be used at runtime. Also `@angular/localize` gets included in the `dependencies` section of `package.json`, rather than `devDependencies`, which is the default. | `boolean`  | `false`       |

For more available options, see `ng add` in [Angular CLI][CliMain].
-->

| 옵션               | 설명                                                                                                                                                              | 값 타입   | 기본값  |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :------ |
| `--project`        | 프로젝트 이름입니다.                                                                                                                                              | `string`  |
| `--use-at-runtime` | 설정하면 런타임에 `$localize`를 사용할 수 있습니다. 또한 `@angular/localize`가 기본값인 `devDependencies` 대신 `package.json`의 `dependencies` 섹션에 포함됩니다. | `boolean` | `false` |

사용할 수 있는 다른 옵션은 [Angular CLI][CliMain]의 `ng add`를 참고하세요.

<!--
## What's next
-->

<a id="whats-next"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/i18n/locale-id" title="Refer to locales by ID"/>
</docs-pill-row>

[CliMain]: cli 'CLI Overview and Command Reference | Angular'
[GuideNpmPackages]: reference/configs/npm-packages 'Workspace npm dependencies | Angular'
[GuideTsConfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html 'TypeScript Configuration'
-->

<docs-pill-row>
  <docs-pill href="guide/i18n/locale-id" title="ID로 지역 참조하기"/>
</docs-pill-row>

[CliMain]: cli 'CLI 개요와 명령어 참조 | Angular'
[GuideNpmPackages]: reference/configs/npm-packages '작업 공간의 npm 의존성 | Angular'
[GuideTsConfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html 'TypeScript 설정'
