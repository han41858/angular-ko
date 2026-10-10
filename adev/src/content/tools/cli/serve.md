<!--
# Serving Angular apps for development
-->

<a id="serving-angular-apps-for-development"></a>

# 개발 중인 Angular 앱 실행하기

<!--
You can serve your Angular CLI application with the `ng serve` command.
This will compile your application, skip unnecessary optimizations, start a devserver, and automatically rebuild and live reload any subsequent changes.
You can stop the server by pressing `Ctrl+C`.

`ng serve` only executes the builder for the `serve` target in the default project as specified in `angular.json`. While any builder can be used here, the most common (and default) builder is `@angular/build:dev-server`.

You can determine which builder is being used for a particular project by looking up the `serve` target for that project.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        // `ng serve` invokes the Architect target named `serve`.
        "serve": {
          "builder": "@angular/build:dev-server"
          // ...
        },
        "build": {
          /* ... */
        },
        "test": {
          /* ... */
        }
      }
    }
  }
}
```
-->

Angular CLI 애플리케이션은 `ng serve` 명령어로 실행할 수 있습니다.
이 명령어는 애플리케이션을 컴파일하고 불필요한 최적화 과정을 건너뛴 뒤 개발 서버를 시작하며, 이후 변경 사항이 생기면 자동으로 다시 빌드하고 실시간으로 새로고침합니다.
서버를 중지하려면 `Ctrl+C`를 누르면 됩니다.

`ng serve`는 `angular.json`에 지정된 기본 프로젝트에서 `serve` 대상으로 설정한 빌더만 실행합니다.
어떤 빌더든 사용할 수 있지만, 가장 일반적으로 사용하는 기본 빌더는 `@angular/build:dev-server`입니다.

특정 프로젝트에서 어떤 빌더를 사용하는지 알아보려면 해당 프로젝트의 `serve` 대상을 확인하면 됩니다.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        // `ng serve`는 `serve`라는 Architect 대상을 실행합니다.
        "serve": {
          "builder": "@angular/build:dev-server"
          // ...
        },
        "build": {
          /* ... */
        },
        "test": {
          /* ... */
        }
      }
    }
  }
}
```

<!--
## Proxying to a backend server
-->

<a id="proxying-to-a-backend-server"></a>

## 백엔드 서버로 프록시하기

<!--
Use [proxying support](https://vite.dev/config/server-options#server-proxy) to divert certain URLs to a backend server, by passing a file to the `--proxy-config` build option.
For example, to divert all calls for `http://localhost:4200/api` to a server running on `http://localhost:3000/api`, take the following steps.

1. Create a file `proxy.conf.json` in your project's `src/` folder.
1. Add the following content to the new proxy file:

```json
{
  "/api/**": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

1. In the CLI configuration file, `angular.json`, add the `proxyConfig` option to the `serve` target:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          }
        }
      }
    }
  }
}
```

1. To run the development server with this proxy configuration, call `ng serve`.

NOTE: To apply changes made to your proxy configuration file, you must restart the `ng serve` process.
-->

`--proxy-config` 빌드 옵션에 파일을 전달하면 [프록시 기능](https://vite.dev/config/server-options#server-proxy)을 사용해서 특정 URL의 요청을 백엔드 서버로 보낼 수 있습니다.
예를 들어 `http://localhost:4200/api`로 보내는 모든 요청을 `http://localhost:3000/api`에서 실행 중인 서버로 보내려면 다음과 같이 하면 됩니다.

1. 프로젝트의 `src/` 폴더에 `proxy.conf.json` 파일을 생성합니다.
1. 생성한 프록시 파일에 다음 내용을 추가합니다:

```json
{
  "/api/**": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

1. CLI 설정 파일인 `angular.json`에서 `serve` 대상에 `proxyConfig` 옵션을 추가합니다:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          }
        }
      }
    }
  }
}
```

1. 이 프록시 설정으로 개발 서버를 실행하려면 `ng serve`를 실행합니다.

참고: 프록시 설정 파일의 변경 사항을 적용하려면 `ng serve` 프로세스를 다시 시작해야 합니다.

<!--
### Path matching behavior depends on the builder
-->

<a id="path-matching-behavior-depends-on-the-builder"></a>

### 빌더에 따른 경로 매칭 방식

<!--
**`@angular/build:dev-server`** (based on [Vite](https://vite.dev/config/server-options#server-proxy))

- `/api` matches only `/api`.
- `/api/*` matches `/api/users` but not `/api/users/123`.
- `/api/**` matches `/api/users` and `/api/users/123`.

**`@angular-devkit/build-angular:dev-server`** (based on [Webpack DevServer](https://webpack.js.org/configuration/dev-server/#devserverproxy))

- `/api` matches `/api` and any sub-paths (equivalent to `/api/**`).
-->

**`@angular/build:dev-server`** ([Vite](https://vite.dev/config/server-options#server-proxy) 기반)

- `/api`는 `/api`에만 매칭됩니다.
- `/api/*`는 `/api/users`에 매칭되지만 `/api/users/123`에는 매칭되지 않습니다.
- `/api/**`는 `/api/users`와 `/api/users/123`에 매칭됩니다.

**`@angular-devkit/build-angular:dev-server`** ([Webpack DevServer](https://webpack.js.org/configuration/dev-server/#devserverproxy) 기반)

- `/api`는 `/api`와 모든 하위 경로에 매칭됩니다(`/api/**`와 동일합니다).
