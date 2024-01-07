<!--
# Building and serving Angular apps
-->
# 프로젝트 빌드/실행 설정

<!--
This page discusses build-specific configuration options for Angular projects.
-->
이 문서는 Angular 프로젝트 옵션 중 빌드/실행 설정과 관련된 내용에 대해 다룹니다.


<a id="app-environments"></a>
<a id="configuring-application-environments"></a>

<!--
## Configuring application environments
-->
## 애플리케이션 개발환경 구성하기

<!--
You can define different named build configurations for your project, such as `development` and `staging`, with different defaults.

Each named configuration can have defaults for any of the options that apply to the various [builder targets](guide/glossary#target), such as `build`, `serve`, and `test`.
The [Angular CLI](cli) `build`, `serve`, and `test` commands can then replace files with appropriate versions for your intended target environment.
-->
프로젝트에는 기본환경 설정 외에도 `development`나 `staging`과 같이 특정 동작환경을 위한 프로젝트 환경설정을 구성할 수 있습니다.

그리고 이 환경설정들은 [Angular CLI](cli)로 `build`, `serve`, `test` 명령을 실행할 때 각각 적용할 수 있는데, Angular CLI 명령을 실행하면서 특정 환경을 지정하면 기본 환경설정 파일 대신 해당 환경설정 파일을 기반으로 CLI 명령이 실행됩니다.


<!--
### Configure environment-specific defaults
-->
### 환경설정 기본값 지정하기

<!--
Using the Angular CLI, start by running the [generate environments command](cli/generate#environments-command) shown here to create the `src/environments/` directory and configure the project to use these files.
-->
Angular CLI를 사용한다면, [환경변수를 생성하는 명령](cli/generate#environments-command)을 실행해서 `src/environments/` 디렉토리를 생성하고 이 안에 생성되는 파일을 프로젝트에 활용하도록 구성하면 됩니다.

<code-example format="shell" language="shell">

ng generate environments

</code-example>

<!--
The project's `src/environments/` directory contains the base configuration file, `environment.ts`, which provides configuration for `production`, the default environment.
You can override default values for additional environments, such as `development` and `staging`, in target-specific configuration files.

For example:
-->
프로젝트에 있는 `src/environments/` 디렉토리에는 기본 환경설정 파일인 `environment.ts` 파일이 존재하는데, 이 파일에는 `production` 옵션이 기본으로 선언되어 있습니다.
이후에 추가로 `development`나 `staging` 환경을 선언하게 되면 이 설정값을 오버라이드 하는 방식으로 동작합니다.

이런 방식으로 구성합니다:

<div class="filetree">
    <div class="file">
        myProject/src/environments
    </div>
    <div class="children">
        <div class="file">
          environment.ts
        </div>
        <div class="file">
          environment.development.ts
        </div>
        <div class="file">
          environment.staging.ts
        </div>
    </div>
</div>

<!--
The base file `environment.ts`, contains the default environment settings.
For example:
-->
기본 `environment.ts` 파일에는 기본 환경설정 값이 존재합니다.
예를 들면:

<code-example format="typescript" language="typescript">

export const environment = {
  production: true
};

</code-example>

<!--
The `build` command uses this as the build target when no environment is specified.
You can add further variables, either as additional properties on the environment object, or as separate objects.
For example, the following adds a default for a variable to the default environment:
-->
빌드 환경을 따로 지정하지 않은 상태로 `build` 명령을 실행하면 `environment.ts` 파일이 기본으로 사용됩니다.
물론 이 파일은 좀 더 많은 설정값을 갖도록 확장할 수도 있고, 필요하다면 다른 객체를 더 선언해서 사용하는 것도 가능합니다.
그래서 기본 환경 설정 객체에 다음과 같이 새로운 프로퍼티를 추가할 수도 있습니다:

<code-example format="typescript" language="typescript">

export const environment = {
  production: true,
  apiUrl: 'http://my-prod-url'
};

</code-example>

<!--
You can add target-specific configuration files, such as `environment.development.ts`.
The following content sets default values for the development build target:
-->
그리고 `environment.development.ts` 파일에는 해당 환경에 맞는 설정값을 지정할 수 있습니다.
위에서 살펴본 `environment` 객체를 개발환경에 맞게 오버라이드해서 다음과 같이 같이 구성할 수 있습니다:

<code-example format="typescript" language="typescript">

export const environment = {
  production: false,
  apiUrl: 'http://my-api-url'
};

</code-example>


<!--
### Using environment-specific variables in your app
-->
### 애플리케이션 코드에서 환경변수 사용하기

<!--
The following application structure configures build targets for `development` and `staging` environments:
-->
`development` 환경과 `staging` 환경을 포함해서 총 3가지 빌드 환경을 구성한다면 다음과 같이 구성할 수 있습니다:

<div class="filetree">
    <div class="file">
        src
    </div>
    <div class="children">
        <div class="file">
          app
        </div>
        <div class="children">
            <div class="file">
              app.component.html
            </div>
            <div class="file">
              app.component.ts
            </div>
        </div>
        <div class="file">
          environments
        </div>
        <div class="children">
            <div class="file">
              environment.ts
            </div>
            <div class="file">
              environment.development.ts
            </div>
            <div class="file">
              environment.staging.ts
            </div>
        </div>
    </div>
</div>

<!--
To use the environment configurations you have defined, your components must import the original environments file:
-->
컴포넌트 코드에서 환경변수를 참조하려면 기본 환경설정 파일인 `environment.ts` 파일을 로드해야 합니다:

<code-example format="typescript" language="typescript">

import { environment } from './../environments/environment';

</code-example>

<!--
This ensures that the build and serve commands can find the configurations for specific build targets.

The following code in the component file \(`app.component.ts`\) uses an environment variable defined in the configuration files.

<code-example format="typescript" language="typescript">

  import { Component } from '&commat;angular/core';
  import { environment } from './../environments/environment';

  &commat;Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    constructor() {
      console.log(environment.production); // Logs false for development environment
    }

    title = 'app works!';
  }

</code-example>
-->
그러면 `ng build` 명령이나 `ng serve` 명령이 실행될 때 기본 환경설정 파일을 로드하기 때문에, 애플리케이션 코드에서 이 환경설정 파일의 내용을 참조할 수 있습니다.

아래 코드는 컴포넌트 파일\(`app.component.ts`\)에서 환경변수를 참조하고 이 환경변수 객체에 있느 프로퍼티를 콘솔에 출력하는 코드입니다.

<code-example format="typescript" language="typescript">

  import { Component } from '&commat;angular/core';
  import { environment } from './../environments/environment';

  &commat;Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    constructor() {
      console.log(environment.production); // 개발환경에 설정된 값인 false 를 출력합니다.
    }

    title = 'app works!';
  }

</code-example>


<a id="file-replacement"></a>
<a id="configure-target-specific-file-replacements"></a>

<!--
## Configure target-specific file replacements
-->
## 빌드 환경에 맞게 환경설정 파일 교체하기

<!--
The main CLI configuration file, `angular.json`, contains a `fileReplacements` section in the configuration for each build target, which lets you replace any file in the TypeScript program with a target-specific version of that file.
This is useful for including target-specific code or variables in a build that targets a specific environment, such as production or staging.

By default no files are replaced.
You can add file replacements for specific build targets.
For example:
-->
Angular CLI 환경설정 파일인 `angular.json` 파일에는 각 빌드 환경마다 `fileReplacements` 섹션이 존재하는데, 이 값을 설정하면 해당 빌드 환경에 해당하는 파일로 환경설정 파일을 교체할 수 있습니다.
그래서 `production` 환경이나 `staging` 환경에 해당하는 환경설정을 기본 환경설정 파일과 별개로 구성한 뒤에, Angular CLI 명령을 실행할 때 적절한 환경설정 파일로 교체해서 실행할 수 있습니다.

빌드 환경에 맞게 환경설정 파일을 교체하려면 다음과 같이 작성합니다:

<code-example format="json" language="json">

  "configurations": {
    "development": {
      "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.development.ts"
          }
        ],
        &hellip;

</code-example>

<!--
This means that when you build your development configuration with `ng build --configuration development`, the `src/environments/environment.ts` file is replaced with the target-specific version of the file, `src/environments/environment.development.ts`.

You can add additional configurations as required.
To add a staging environment, create a copy of `src/environments/environment.ts` called `src/environments/environment.staging.ts`, then add a `staging` configuration to `angular.json`:
-->
이렇게 설정하면 프로젝트를 운영용 환경으로 빌드할 때\(`ng build --configuration development`\) `src/environments/environment.ts` 파일을 `src/environments/environment.development.ts` 파일로 교체한 후에 Angular CLI 명령이 실행됩니다.

이 설정은 원하는 대로 추가할 수 있습니다.
`staging` 환경을 추가로 구성해야 한다면 `src/environments/environment.ts` 파일을 복사해서 `src/environments/environment.staging.ts` 파일을 만들고, `staging` 환경에 대한 설정을 `angular.json` 파일에 다음과 같이 추가하면 됩니다:

<code-example format="json" language="json">

  "configurations": {
    "development": { &hellip; },
    "production": { &hellip; },
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ]
    }
  }

</code-example>

<!--
You can add more configuration options to this target environment as well.
Any option that your build supports can be overridden in a build target configuration.

To build using the staging configuration, run the following command:
-->
빌드 환경은 얼마든지 추가할 수 있기 때문에, 빌드 환경에 어울리는 설정값을 자유롭게 지정할 수 있습니다.

이제 `staging` 환경으로 애플리케이션을 빌드하려면 다음 명령을 실행하면 됩니다:


<code-example format="shell" language="shell">

ng build --configuration=staging

</code-example>

<!--
You can also configure the `serve` command to use the targeted build configuration if you add it to the "serve:configurations" section of `angular.json`:
-->
그리고 새로 추가한 환경으로 `ng serve` 명령을 실행하려면 `angular.json` 파일의 "serve:configurations" 섹션 내용을 다음과 같이 수정하면 됩니다:

<code-example format="json" language="json">

  "serve": {
    "builder": "&commat;angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "your-project-name:build"
    },
    "configurations": {
      "development": {
        "browserTarget": "your-project-name:build:development"
      },
      "production": {
        "browserTarget": "your-project-name:build:production"
      },
      "staging": {
        "browserTarget": "your-project-name:build:staging"
      }
    }
  },

</code-example>


<a id="size-budgets"></a>
<a id="configure-size-budgets"></a>
<a id="configuring-size-budgets"></a>

<!--
## Configuring size budgets
-->
## 빌드 결과물 용량 제한하기

<!--
As applications grow in functionality, they also grow in size.
The CLI lets you set size thresholds in your configuration to ensure that parts of your application stay within size boundaries that you define.

Define your size boundaries in the CLI configuration file, `angular.json`, in a `budgets` section for each [configured environment](#app-environments).
-->
애플리케이션에 기능이 많아지면 용량도 자연스럽게 커집니다.
이 때 이 애플리케이션이 빌드된 결과물의 크기를 일정 수준으로 정해놓고, 기준 용량을 넘어가면 경고를 표시하거나 에러를 표시하게 할 수 있습니다.

이 기준값은 Angular CLI 설정파일인 `angular.json` 파일의 각 [환경 설정](#app-environments) 안에 `budgets` 섹션으로 지정합니다.

<code-example format="json" language="json">

{
  &hellip;
  "configurations": {
    "production": {
      &hellip;
      "budgets": []
    }
  }
}

</code-example>

<!--
You can specify size budgets for the entire app, and for particular parts.
Each budget entry configures a budget of a given type.
Specify size values in the following formats:

| Size value      | Details                                                                     |
| :-------------- | :-------------------------------------------------------------------------- |
| `123` or `123b` | Size in bytes.                                                              |
| `123kb`         | Size in kilobytes.                                                          |
| `123mb`         | Size in megabytes.                                                          |
| `12%`           | Percentage of size relative to baseline. \(Not valid for baseline values.\) |

When you configure a budget, the build system warns or reports an error when a given part of the application reaches or exceeds a boundary size that you set.

Each budget entry is a JSON object with the following properties:

| Property       | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | The type of budget. One of: <table> <thead> <tr> <th> Value </th> <th> Details </th> </tr> </thead> <tbody> <tr> <td> <code>bundle</code> </td> <td> The size of a specific bundle. </td> </tr> <tr> <td> <code>initial</code> </td> <td> The size of JavaScript needed for bootstrapping the application. Defaults to warning at 500kb and erroring at 1mb. </td> </tr> <tr> <td> <code>allScript</code> </td> <td> The size of all scripts. </td> </tr> <tr> <td> <code>all</code> </td> <td> The size of the entire application. </td> </tr> <tr> <td> <code>anyComponentStyle</code> </td> <td> This size of any one component stylesheet. Defaults to warning at 2kb and erroring at 4kb. </td> </tr> <tr> <td> <code>anyScript</code> </td> <td> The size of any one script. </td> </tr> <tr> <td> <code>any</code> </td> <td> The size of any file. </td> </tr> </tbody> </table> |
| name           | The name of the bundle \(for `type=bundle`\).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| baseline       | The baseline size for comparison.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| maximumWarning | The maximum threshold for warning relative to the baseline.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| maximumError   | The maximum threshold for error relative to the baseline.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| minimumWarning | The minimum threshold for warning relative to the baseline.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| minimumError   | The minimum threshold for error relative to the baseline.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| warning        | The threshold for warning relative to the baseline \(min &amp max\).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| error          | The threshold for error relative to the baseline \(min &amp max\).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
-->
기준 용량은 앱 전체에 지정할 수도 있고 일부에만 지정할 수도 있는데, 이 기준은 `type` 프로퍼티로 설정합니다.
그리고 기준 용량은 다음과 같은 형식으로 지정합니다:

| 용량 설정           | 설명                                      |
|:----------------|:----------------------------------------|
| `123` 또는 `123b` | 바이트(byte) 단위                            |
| `123kb`         | 킬로바이트(KB) 단위                            |
| `123mb`         | 메가바이트(MB) 단위                            |
| `12%`           | 기준값의 비율에 해당하는 크기. \(기준값에는 지정할 수 없습니다.\) |

기준 용량을 설정하고 나면 애플리케이션을 빌드한 결과물의 용량에 따라 경고나 에러를 표시합니다.

`budgets` 배열에는 JSON 객체를 지정하는데, 이 객체에 사용할 수 있는 프로퍼티는 다음과 같습니다:

| 프로퍼티           | 값                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|:---------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type           | 용량을 제한하는 방식을 사용하며, 다음 항목 중 하나를 사용합니다. <table> <thead> <tr> <th> 값 </th> <th> 설명 </th> </tr> </thead> <tbody> <tr> <td> <code>bundle</code> </td> <td> 특정 번들 파일을 기준으로 합니다. </td> </tr> <tr> <td> <code>initial</code> </td> <td> 애플리케이션이 처음 실행될 때 필요한 용량을 기준으로 합니다. 기본 설정에서 500kb를 넘으면 경고 메시지가 출력되며 1mb를 넘으면 에러 메시지가 출력됩니다. </td> </tr> <tr> <td> <code>allScript</code> </td> <td> 스크립트 파일 전체를 기준으로 합니다. </td> </tr> <tr> <td> <code>all</code> </td> <td> 애플리케이션 전체 용량을 기준으로 합니다. </td> </tr> <tr> <td> <code>anyComponentStyle</code> </td> <td> 컴포넌트 스타일시트 파일 하나를 기준으로 합니다. 기본 설정에서 2kb를 넘으면 경고 메시지가 출력되며 4kb를 넘으면 에러 메시지가 출력됩니다. </td> </tr> <tr> <td> <code>anyScript</code> </td> <td> 개별 스크립트 파일을 기준으로 합니다. </td> </tr> <tr> <td> <code>any</code> </td> <td> 개별 파일을 기준으로 합니다. </td> </tr> </tbody> </table> |
| name           | 번들 파일의 이름을 지정합니다. \(`type=bundle`일 때 사용합니다.\)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| baseline       | 기준값으로 사용할 용량을 지정합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| maximumWarning | 기준값보다 이 용량 이상으로 크면 경고 메시지를 출력합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| maximumError   | 기준값보다 이 용량 이상으로 크면 에러 메시지를 표시합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| minimumWarning | 기준값보다 이 용량 이상으로 작으면 경고 메시지를 표시합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| minimumError   | 기준값보다 이 용량 이상으로 작으면 에러 메시지를 표시합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warning        | 기준값보다 이 용량 이상으로 작거나 크면 경고 메시지를 표시합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| error          | 기준값보다 이 용량 이상으로 작거나 크면 에러 메시지를 표시합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |


<a id="commonjs "></a>

<!--
## Configuring CommonJS dependencies
-->
## CommonJS 패키지 관리

<!--
<div class="alert is-important">

It is recommended that you avoid depending on CommonJS modules in your Angular applications.
Depending on CommonJS modules can prevent bundlers and minifiers from optimizing your application, which results in larger bundle sizes.
Instead, it is recommended that you use [ECMAScript modules](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) in your entire application.
For more information, see [How CommonJS is making your bundles larger](https://web.dev/commonjs-larger-bundles).

</div>

The Angular CLI outputs warnings if it detects that your browser application depends on CommonJS modules.
To disable these warnings, add the CommonJS module name to `allowedCommonJsDependencies` option in the `build` options located in `angular.json` file.

<code-example language="json">

"build": {
  "builder": "&commat;angular-devkit/build-angular:browser",
  "options": {
     "allowedCommonJsDependencies": [
        "lodash"
     ]
     &hellip;
   }
   &hellip;
},

</code-example>
-->
<div class="alert is-important">

Angular 애플리케이션에는 CommonJS 모듈을 사용하는 패키지를 사용하지 않는 것을 권장합니다.
CommonJS 모듈 방식은 애플리케이션 최적화 단계에서 코드 압축 기능을 활용할 수 없기 때문에 빌드 결과물의 크기가 상대적으로 더 큽니다.
그래서 [ECMAScript 모듈](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) 방식으로 구현된 패키지를 사용하는 것을 권장합니다.
자세한 내용은 [How CommonJS is making your bundles larger](https://web.dev/commonjs-larger-bundles) 문서를 참고하세요.

</div>

Angular CLI는 CommonJS 모듈 방식으로 구현된 패키지를 발견하면 경고 메시지를 표시합니다.
이 경고 메시지를 없애려면 `angular.json` 파일의 `build` 옵션 `allowedCommonJsDependencies` 배열에 CommonJS 모듈 이름을 추가하면 됩니다.

<code-example language="json">

"build": {
  "builder": "&commat;angular-devkit/build-angular:browser",
  "options": {
     "allowedCommonJsDependencies": [
        "lodash"
     ]
     &hellip;
   }
   &hellip;
},

</code-example>


<a id="browser-compat"></a>
<a id="configuring-browser-compatibility"></a>

<!--
## Configuring browser compatibility
-->
## 브라우저 호환성 설정하기

<!--
The Angular CLI uses [Browserslist](https://github.com/browserslist/browserslist) to ensure compatibility with different browser versions. [Autoprefixer](https://github.com/postcss/autoprefixer) is used for CSS vendor prefixing and [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) for JavaScript syntax transformations.

Internally, the Angular CLI uses the below `browserslist` configuration which matches the [browsers that are supported](guide/browser-support) by Angular.

  <code-example format="none" language="text">
  last 2 Chrome versions
  last 1 Firefox version
  last 2 Edge major versions
  last 2 Safari major versions
  last 2 iOS major versions
  Firefox ESR
  </code-example>

To override the internal configuration, run [`ng generate config browserslist`](cli/generate#config-command), which generates a `.browserslistrc` configuration file in the project directory.

See the [browserslist repository](https://github.com/browserslist/browserslist) for more examples of how to target specific browsers and versions.

<div class="alert is-helpful">

Use [browsersl.ist](https://browsersl.ist) to display compatible browsers for a `browserslist` query.

</div>
-->
Angular CLI는 브라우저 종류와 버전에 대한 호환성을 보장하기 위해 [Autoprefixer](https://github.com/postcss/autoprefixer)를 사용합니다.
그리고 CSS 벤더 접두사를 붙일 때는 [Autoprefixer](https://github.com/postcss/autoprefixer)를 사용하며, JavaScript 문법을 변환할 때는 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)를 사용합니다. 

내부적으로는 Angular CLI가 `browserlist`를 사용해서 [지원하는 브라우저](guide/browser-support)를 결정합니다.

  <code-example format="none" language="text">
  last 2 Chrome version
  last 1 Firefox version
  last 2 Edge major versions
  last 2 Safari major versions
  last 2 iOS major versions
  Firefox ESR
  </code-example>


내부 설정을 오버라이드 하려면 [`ng generate config browserslist`](cli/generate#config-command) 명령을 실행해서 프로젝트 폴더에 `.browserslistrc` 파일을 생성하면 됩니다.

브라우저나 버전을 명시하는 방법을 더 알아보려면 [browserslist 코드저장소](https://github.com/browserslist/browserslist)를 참고하세요.

<div class="alert is-helpful">

`browserslist` 쿼리 결과를 확인하려면 [browsersl.ist](https://browsersl.ist)를 참고하세요.

</div>


<a id="proxy"></a>

<!--
## Proxying to a backend server
-->
## 백엔드 서버 프록시 설정하기

<!--
Use the [proxying support](https://webpack.js.org/configuration/dev-server/#devserverproxy) in the `webpack` development server to divert certain URLs to a backend server, by passing a file to the `--proxy-config` build option.
For example, to divert all calls for `http://localhost:4200/api` to a server running on `http://localhost:3000/api`, take the following steps.

1.  Create a file `proxy.conf.json` in your project's `src/` folder.
1.  Add the following content to the new proxy file:

    <code-example format="json" language="json">

    {
      "/api": {
        "target": "http://localhost:3000",
        "secure": false
      }
    }

    </code-example>

1.  In the CLI configuration file, `angular.json`, add the `proxyConfig` option to the `serve` target:

    <code-example format="json" language="json">

      &hellip;
      "architect": {
        "serve": {
          "builder": "&commat;angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "your-application-name:build",
            "proxyConfig": "src/proxy.conf.json"
          },
    &hellip;

    </code-example>

1.  To run the development server with this proxy configuration, call `ng serve`.

Edit the proxy configuration file to add configuration options; following are some examples.
For a description of all options, see [webpack DevServer documentation](https://webpack.js.org/configuration/dev-server/#devserverproxy).

<div class="alert is-helpful">

**NOTE**: <br />
If you edit the proxy configuration file, you must relaunch the `ng serve` process to make your changes effective.

</div>

<div class="alert is-important">

As of Node version 17, Node will not always resolve `http://localhost:<port>` to `http://127.0.0.1:<port>`
depending on each machine's configuration.

If you get an `ECONNREFUSED` error using a proxy targeting a `localhost` URL,
you can fix this issue by updating the target from `http://localhost:<port>` to `http://127.0.0.1:<port>`.

See [the http proxy middleware documentation](https://github.com/chimurai/http-proxy-middleware#nodejs-17-econnrefused-issue-with-ipv6-and-localhost-705)
for more information.

</div>
-->
Angular CLI가 제공하는 개발 서버는 `webpack` 개발 서버를 사용하기 때문에 특정 백엔드 주소로 향하는 HTTP 요청에 대해 [프록시를 설정](https://webpack.js.org/configuration/dev-server/#devserverproxy) 할 수 있습니다.
이 프록시 설정은 빌드할 때 `--proxy-config` 옵션을 사용하거나 `angular.json` 파일에 지정해 두는 방식으로 사용합니다.
예를 들어 `http://localhost:4200/api`로 요청하는 모든 HTTP 요청을 `http://localhost:3000/api`로 보내려면 다음과 같이 설정합니다.

1.  `src/` 폴더에 `proxy.conf.json` 파일을 만듭니다.
1.  `proxy.conf.json` 파일의 내용을 다음과 같이 작성합니다:

    <code-example format="json" language="json">

    {
      "/api": {
        "target": "http://localhost:3000",
        "secure": false
      }
    }

    </code-example>

1.  Angular CLI 환경설정 파일인 `angular.json` 파일의 빌드 대상 중 `serve`에 `proxyConfig` 옵션을 추가하고 다음과 같이 작성합니다:

    <code-example format="json" language="json">

    &hellip;
    "architect": {
      "serve": {
        "builder": "&commat;angular-devkit/build-angular:dev-server",
        "options": {
          "browserTarget": "your-application-name:build",
          "proxyConfig": "src/proxy.conf.json"
        },
    &hellip;

    </code-example>

1.  `ng serve` 명령을 실행해서 이 프록시 설정으로 개발 서버를 실행합니다.

프록시 설정 파일에는 더 구체적인 규칙을 지정할 수도 있으며, 이 문서에서는 자주 사용하는 옵션에 대해서만 설명합니다.
프록시 설정에 활용할 수 있는 옵션은 [webpack DevServer 문서](https://webpack.js.org/configuration/dev-server/#devserverproxy)를 참고하세요.

<div class="alert is-helpful">

**참고**: <br />
프록시 설정 파일의 내용을 변경하면 이 내용을 반영하기 위해 `ng serve` 명령을 다시 실행해야 합니다.

</div>

<div class="alert is-important">

As of Node version 17, Node will not always resolve `http://localhost:<port>` to `http://127.0.0.1:<port>`
depending on each machine's configuration.

If you get an `ECONNREFUSED` error using a proxy targeting a `localhost` URL,
you can fix this issue by updating the target from `http://localhost:<port>` to `http://127.0.0.1:<port>`.

See [the http proxy middleware documentation](https://github.com/chimurai/http-proxy-middleware#nodejs-17-econnrefused-issue-with-ipv6-and-localhost-705)
for more information.

</div>


<!--
### Rewrite the URL path
-->
### 요청하는 URL 주소 변경하기

<!--
The `pathRewrite` proxy configuration option lets you rewrite the URL path at run time.
For example, specify the following `pathRewrite` value to the proxy configuration to remove "api" from the end of a path.

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

</code-example>

If you need to access a backend that is not on `localhost`, set the `changeOrigin` option as well.
For example:

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://npmjs.org",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }
}

</code-example>

To help determine whether your proxy is working as intended, set the `logLevel` option.
For example:

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug"
  }
}

</code-example>

Proxy log levels are `info` \(the default\), `debug`, `warn`, `error`, and `silent`.
-->
프록시 설정 옵션 중 `pathRewrite` 옵션을 사용하면 애플리케이션이 실행되면서 요청하는 URL 주소를 다른 주소로 변경할 수 있습니다.
예를 들어 다음과 같이 설정하면 요청하는 주소 마지막에 붙는 "api" 문자열을 제거합니다.

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

</code-example>

그리고 백엔드 서버의 주소가 `localhost`가 아니라면 `changeOrigin` 옵션을 사용해서 다음과 같이 설정할 수 있습니다:

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://npmjs.org",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }
}

</code-example>

프록시 설정이 제대로 동작하는지 확인하려면 `logLevel` 옵션을 사용하면 됩니다:

<code-example format="json" language="json">

{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug"
  }
}

</code-example>

프록시 설정의 기본 로그 레벨은 `info`이며, `debug`, `warn`, `error`, `silent` 레벨을 사용할 수 있습니다.

<!--
### Proxy multiple entries
-->
### 특정 주소에 대해 프록시 설정하기

<!--
You can proxy multiple entries to the same target by defining the configuration in JavaScript.

Set the proxy configuration file to `proxy.conf.mjs` \(instead of `proxy.conf.json`\), and specify configuration files as in the following example.
-->
JavaScript 파일을 사용하면 원하는 주소에 해당하는 요청에만 프록시 설정을 적용할 수 있습니다.

이 방법을 사용하려면 `proxy.conf.json` 파일 대신 `proxy.conf.mjs` 파일에 프록시를 설정합니다.
이 내용은 다음과 같이 작성합니다.

<code-example format="javascript" language="javascript">

export default [
  {
    context: [
        '/my',
        '/many',
        '/endpoints',
        '/i',
        '/need',
        '/to',
        '/proxy'
    ],
    target: 'http://localhost:3000',
    secure: false
  }
];

</code-example>

<!--
In the CLI configuration file, `angular.json`, point to the JavaScript proxy configuration file:
-->
이 파일로 프록시를 설정하려면 Angular CLI 설정 파일 `angular.json` 파일에 이 파일을 지정하면 됩니다:

<code-example format="json" language="json">

&hellip;
"architect": {
  "serve": {
    "builder": "&commat;angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "your-application-name:build",
      "proxyConfig": "src/proxy.conf.mjs"
    },
&hellip;

</code-example>


<!--
### Bypass the proxy
-->
### 프록시 설정 무시하기

<!--
If you need to optionally bypass the proxy, or dynamically change the request before it's sent, add the bypass option, as shown in this JavaScript example.
-->
프록시 설정을 무시해야 하는 경우나 HTTP 요청을 동적으로 변경해야 하는 경우에는 JavaScript 프록시 설정 파일에 `bypass` 옵션을 사용할 수 있습니다.

<code-example format="javascript" language="javascript">

export default {
  '/api/proxy': {
    "target": 'http://localhost:3000',
    "secure": false,
    "bypass": function (req, res, proxyOptions) {
        if (req.headers.accept.includes('html')) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
        }
        req.headers['X-Custom-Header'] = 'yes';
    }
  }
};

</code-example>


<!--
### Using corporate proxy
-->
### 사내 프록시 활용하기

<!--
If you work behind a corporate proxy, the backend cannot directly proxy calls to any URL outside your local network.
In this case, you can configure the backend proxy to redirect calls through your corporate proxy using an agent:
-->
개발환경에 사내용 프록시를 사용한다면 로컬 네트워크에서 회사 외부 URL로 직접 프록시 요청을 보낼 수 없습니다.
이 경우에는 사내 프록시를 통과해서 리다이렉트 요청을 보내야 합니다.

다음 명령을 실행해서 프록시 에이전트 패키지를 설치합니다:

<code-example format="shell" language="shell">

npm install --save-dev https-proxy-agent

</code-example>

<!--
When you define an environment variable `http_proxy` or `HTTP_PROXY`, an agent is automatically added to pass calls through your corporate proxy when running `npm start`.

Use the following content in the JavaScript configuration file.
-->
이제 환경변수 객체에 `http_proxy`나 `HTTP_PROXY` 프로퍼티를 선언하면 위에서 설치한 에이전트가 HTTP 요청을 사내 프록시를 통과하도록 재요청합니다.

JavaScript 프록시 설정 파일은 다음과 같이 작성합니다.

<code-example format="javascript" language="javascript">

import HttpsProxyAgent from 'https-proxy-agent';

const proxyConfig = [{
  context: '/api',
  target: 'http://your-remote-server.com:3000',
  secure: false
}];

export default (proxyConfig) => {
  const proxyServer = process.env.http_proxy &verbar;&verbar; process.env.HTTP_PROXY;
  if (proxyServer) {
    const agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);

    for (const entry of proxyConfig) {
      entry.agent = agent;
    }
  }

  return proxyConfig;
};

</code-example>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-01-17
