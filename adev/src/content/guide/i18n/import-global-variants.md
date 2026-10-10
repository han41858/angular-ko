<!--
# Import global variants of the locale data
-->

<a id="import-global-variants-of-the-locale-data"></a>

# 지역 데이터의 전역 버전 불러오기

<!--
The [Angular CLI][CliMain] automatically includes locale data if you run the [`ng build`][CliBuild] command with the `--localize` option.

```shell
ng build --localize
```

HELPFUL: The initial installation of Angular already contains locale data for English in the United States \(`en-US`\).
The [Angular CLI][CliMain] automatically includes the locale data and sets the `LOCALE_ID` value when you use the `--localize` option with [`ng build`][CliBuild] command.

The `@angular/common` package on npm contains the locale data files.
Global variants of the locale data are available in `@angular/common/locales/global`.
-->

[`ng build`][CliBuild] 명령에 `--localize` 옵션을 사용하면 [Angular CLI][CliMain]가 지역 데이터를 자동으로 포함합니다.

```shell
ng build --localize
```

도움말: Angular를 처음 설치하면 미국 영어(`en-US`)의 지역 데이터가 이미 포함되어 있습니다.
[`ng build`][CliBuild] 명령에 `--localize` 옵션을 사용하면 [Angular CLI][CliMain]가 지역 데이터를 자동으로 포함하고 `LOCALE_ID` 값을 설정합니다.

npm의 `@angular/common` 패키지에 지역 데이터 파일이 들어 있습니다.
지역 데이터의 전역 버전은 `@angular/common/locales/global`에서 사용할 수 있습니다.

<!--
## `import` example for French
-->

<a id="import-example-for-french"></a>

## 프랑스어 `import` 예제

<!--
For example, you could import the global variants for French \(`fr`\) in `main.ts` where you bootstrap the application.

<docs-code header="src/main.ts (import locale)" path="adev/src/content/examples/i18n/src/main.ts" region="global-locale"/>

HELPFUL: In an `NgModules` application, you would import it in your `app.module`.

[CliMain]: cli 'CLI Overview and Command Reference | Angular'
[CliBuild]: cli/build 'ng build | CLI | Angular'
-->

예를 들어 애플리케이션을 부트스트랩하는 `main.ts`에서 프랑스어(`fr`) 지역 데이터의 전역 버전을 불러올 수 있습니다.

<docs-code header="src/main.ts (지역 불러오기)" path="adev/src/content/examples/i18n/src/main.ts" region="global-locale"/>

도움말: `NgModules` 애플리케이션에서는 `app.module`에서 불러옵니다.

[CliMain]: cli 'CLI 개요와 명령어 참조 | Angular'
[CliBuild]: cli/build 'ng build | CLI | Angular'
