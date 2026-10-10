<!--
# Configuring application environments
-->

<a id="configuring-application-environments"></a>

# 애플리케이션 환경 설정하기

<!--
You can define different named build configurations for your project, such as `development` and `staging`, with different defaults.

Each named configuration can have defaults for any of the options that apply to the various builder targets, such as `build`, `serve`, and `test`.
The [Angular CLI](tools/cli) `build`, `serve`, and `test` commands can then replace files with appropriate versions for your intended target environment.
-->

프로젝트에 `development`, `staging`과 같이 이름이 있는 빌드 설정을 여러 개 정의하고 서로 다른 기본값을 지정할 수 있습니다.

이름이 있는 각 설정에는 `build`, `serve`, `test` 등 다양한 빌더 대상에 적용되는 옵션의 기본값을 지정할 수 있습니다.
그러면 [Angular CLI](tools/cli)의 `build`, `serve`, `test` 명령어가 대상 환경에 맞는 파일로 교체할 수 있습니다.

<!--
## Angular CLI configurations
-->

<a id="angular-cli-configurations"></a>

## Angular CLI 설정

<!--
Angular CLI builders support a `configurations` object, which allows overwriting specific options for a builder based on the configuration provided on the command line.

```json

{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            // By default, disable source map generation.
            "sourceMap": false
          },
          "configurations": {
            // For the `debug` configuration, enable source maps.
            "debug": {
              "sourceMap": true
            }
          }
        },
        …
      }
    }
  }
}

```

You can choose which configuration to use with the `--configuration` option.

```shell

ng build --configuration debug

```

Configurations can be applied to any Angular CLI builder. Multiple configurations can be specified with a comma separator. The configurations are applied in order, with conflicting options using the value from the last configuration.

```shell

ng build --configuration debug,production,customer-facing

```
-->

Angular CLI 빌더는 `configurations` 객체를 지원합니다.
이 객체를 사용하면 명령줄에서 지정한 설정에 따라 빌더의 특정 옵션을 덮어쓸 수 있습니다.

```json

{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            // 기본적으로 소스 맵을 생성하지 않습니다.
            "sourceMap": false
          },
          "configurations": {
            // `debug` 설정에서는 소스 맵을 생성합니다.
            "debug": {
              "sourceMap": true
            }
          }
        },
        …
      }
    }
  }
}

```

사용할 설정은 `--configuration` 옵션으로 선택합니다.

```shell

ng build --configuration debug

```

설정은 모든 Angular CLI 빌더에 적용할 수 있습니다.
쉼표로 구분해서 여러 설정을 지정할 수도 있습니다.
설정은 지정한 순서대로 적용되며, 옵션이 충돌하면 마지막 설정의 값을 사용합니다.

```shell

ng build --configuration debug,production,customer-facing

```

<!--
## Configure environment-specific defaults
-->

<a id="configure-environment-specific-defaults"></a>

## 환경별 기본값 설정하기

<!--
`@angular/build:application` supports file replacements, an option for substituting source files before executing a build.
Using this in combination with `--configuration` provides a mechanism for configuring environment-specific data in your application.

Start by [generating environments](cli/generate/environments) to create the `src/environments/` directory and configure the project to use file replacements.

```shell

ng generate environments

```

The project's `src/environments/` directory contains the base configuration file, `environment.ts`, which provides the default configuration for production.
You can override default values for additional environments, such as `development` and `staging`, in target-specific configuration files.

For example:

```text

my-app/src/environments
├── environment.development.ts
├── environment.staging.ts
└── environment.ts

```

The base file `environment.ts`, contains the default environment settings.
For example:

```ts
export const environment = {
  production: true,
};
```

The `build` command uses this as the build target when no environment is specified.
You can add further variables, either as additional properties on the environment object, or as separate objects.
For example, the following adds a default for a variable to the default environment:

```ts
export const environment = {
  production: true,
  apiUrl: 'http://my-prod-url',
};
```

CRITICAL: Files in `src/environments/` are bundled into your client-side application and visible to anyone who loads the page. Never store secrets such as API keys here. Use a server-side proxy or a secrets manager instead.

You can add target-specific configuration files, such as `environment.development.ts`.
The following content sets default values for the development build target:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://my-dev-url',
};
```
-->

`@angular/build:application`은 빌드 실행 전에 소스 파일을 다른 파일로 바꾸는 파일 교체 옵션을 지원합니다.
이 옵션을 `--configuration`과 함께 사용하면 애플리케이션의 환경별 데이터를 설정할 수 있습니다.

먼저 [환경 파일 생성](cli/generate/environments) 명령어를 실행해서 `src/environments/` 디렉터리를 만들고 프로젝트가 파일 교체 기능을 사용하도록 설정하세요.

```shell

ng generate environments

```

프로젝트의 `src/environments/` 디렉터리에는 프로덕션 기본 설정을 제공하는 기본 설정 파일 `environment.ts`가 있습니다.
`development`, `staging` 등의 추가 환경에서는 대상별 설정 파일로 기본값을 덮어쓸 수 있습니다.

예를 들면 다음과 같습니다:

```text

my-app/src/environments
├── environment.development.ts
├── environment.staging.ts
└── environment.ts

```

기본 파일인 `environment.ts`에는 기본 환경 설정이 들어 있습니다.
예를 들면 다음과 같습니다:

```ts
export const environment = {
  production: true,
};
```

환경을 지정하지 않으면 `build` 명령어는 이 설정을 빌드 대상으로 사용합니다.
환경 객체에 프로퍼티를 추가하거나 별도 객체를 만들어 변수를 더 추가할 수 있습니다.
예를 들어 기본 환경에 변수의 기본값을 추가하면 다음과 같습니다:

```ts
export const environment = {
  production: true,
  apiUrl: 'http://my-prod-url',
};
```

중요: `src/environments/`의 파일은 클라이언트 애플리케이션에 번들로 포함되며 페이지에 접속하는 누구나 볼 수 있습니다.
API 키와 같은 비밀 정보를 여기에 저장하면 안 됩니다.
대신 서버 측 프록시나 비밀 정보 관리 도구를 사용하세요.

`environment.development.ts`와 같은 대상별 설정 파일을 추가할 수 있습니다.
다음 내용은 개발 빌드 대상의 기본값을 설정합니다:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://my-dev-url',
};
```

<!--
## Using environment-specific variables in your app
-->

<a id="using-environment-specific-variables-in-your-app"></a>

## 앱에서 환경별 변수 사용하기

<!--
To use the environment configurations you have defined, your components must import the original environments file:

```ts
import {environment} from './environments/environment';
```

This ensures that the build and serve commands can find the configurations for specific build targets.

The following code in the component file (`app.ts`) uses an environment variable defined in the configuration files.

```ts
import {environment} from './../environments/environment';

// Fetches from `http://my-prod-url` in production, `http://my-dev-url` in development.
fetch(environment.apiUrl);
```

The main CLI configuration file, `angular.json`, contains a `fileReplacements` section in the configuration for each build target, which lets you replace any file in the TypeScript program with a target-specific version of that file.
This is useful for including target-specific code or variables in a build that targets a specific environment, such as production or staging.

By default no files are replaced, however `ng generate environments` sets up this configuration automatically.
You can change or add file replacements for specific build targets by editing the `angular.json` configuration directly.

```json

  "configurations": {
    "development": {
      "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.development.ts"
          }
        ],
        …

```

This means that when you build your development configuration with `ng build --configuration development`, the `src/environments/environment.ts` file is replaced with the target-specific version of the file, `src/environments/environment.development.ts`.

To add a staging environment, create a copy of `src/environments/environment.ts` called `src/environments/environment.staging.ts`, then add a `staging` configuration to `angular.json`:

```json

  "configurations": {
    "development": { … },
    "production": { … },
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ]
    }
  }

```

You can add more configuration options to this target environment as well.
Any option that your build supports can be overridden in a build target configuration.

To build using the staging configuration, run the following command:

```shell

ng build --configuration staging

```

By default, the `build` target includes `production` and `development` configurations and `ng serve` uses the development build of the application.
You can also configure `ng serve` to use the targeted build configuration if you set the `buildTarget` option:

```json

  "serve": {
    "builder": "@angular/build:dev-server",
    "options": { … },
    "configurations": {
      "development": {
        // Use the `development` configuration of the `build` target.
        "buildTarget": "my-app:build:development"
      },
      "production": {
        // Use the `production` configuration of the `build` target.
        "buildTarget": "my-app:build:production"
      }
    },
    "defaultConfiguration": "development"
  },

```

The `defaultConfiguration` option specifies which configuration is used by default.
When `defaultConfiguration` is not set, `options` are used directly without modification.
-->

정의한 환경 설정을 사용하려면 컴포넌트에서 원래 환경 파일을 가져와야 합니다:

```ts
import {environment} from './environments/environment';
```

그러면 빌드 및 실행 명령어가 특정 빌드 대상에 맞는 설정을 찾을 수 있습니다.

다음 컴포넌트 파일(`app.ts`)의 코드는 설정 파일에 정의된 환경 변수를 사용합니다.

```ts
import {environment} from './../environments/environment';

// 프로덕션에서는 `http://my-prod-url`, 개발 환경에서는 `http://my-dev-url`에서 데이터를 가져옵니다.
fetch(environment.apiUrl);
```

CLI의 기본 설정 파일 `angular.json`에서 각 빌드 대상의 설정에는 `fileReplacements` 항목을 지정할 수 있습니다.
이를 통해 TypeScript 프로그램의 파일을 해당 대상에 맞는 파일로 교체할 수 있습니다.
프로덕션이나 스테이징처럼 특정 환경을 대상으로 빌드할 때 해당 환경에 맞는 코드나 변수를 포함하는 데 유용합니다.

기본적으로는 파일을 교체하지 않지만 `ng generate environments`를 실행하면 이 설정이 자동으로 추가됩니다.
`angular.json` 설정을 직접 편집해서 특정 빌드 대상의 파일 교체 설정을 수정하거나 추가할 수 있습니다.

```json

  "configurations": {
    "development": {
      "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.development.ts"
          }
        ],
        …

```

이 설정에서는 `ng build --configuration development`로 개발 설정을 빌드하면 `src/environments/environment.ts` 파일이 대상별 파일인 `src/environments/environment.development.ts`로 교체됩니다.

스테이징 환경을 추가하려면 `src/environments/environment.ts`를 `src/environments/environment.staging.ts`라는 이름으로 복사한 뒤 `angular.json`에 `staging` 설정을 추가하세요:

```json

  "configurations": {
    "development": { … },
    "production": { … },
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ]
    }
  }

```

이 대상 환경에 다른 설정 옵션도 추가할 수 있습니다.
빌더가 지원하는 옵션은 모두 빌드 대상 설정에서 덮어쓸 수 있습니다.

스테이징 설정으로 빌드하려면 다음 명령어를 실행하세요:

```shell

ng build --configuration staging

```

기본적으로 `build` 대상에는 `production`과 `development` 설정이 포함되며 `ng serve`는 애플리케이션의 개발 빌드를 사용합니다.
`buildTarget` 옵션을 지정하면 `ng serve`가 특정 빌드 설정을 사용하도록 구성할 수도 있습니다:

```json

  "serve": {
    "builder": "@angular/build:dev-server",
    "options": { … },
    "configurations": {
      "development": {
        // `build` 대상의 `development` 설정을 사용합니다.
        "buildTarget": "my-app:build:development"
      },
      "production": {
        // `build` 대상의 `production` 설정을 사용합니다.
        "buildTarget": "my-app:build:production"
      }
    },
    "defaultConfiguration": "development"
  },

```

`defaultConfiguration` 옵션은 기본으로 사용할 설정을 지정합니다.
`defaultConfiguration`을 지정하지 않으면 `options`를 수정 없이 그대로 사용합니다.
