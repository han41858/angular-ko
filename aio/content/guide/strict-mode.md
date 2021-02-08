<!--
# Strict mode
-->
# Strict 모드

<!--
When you create a new workspace or an application you have an option to create them in a strict mode using the `--strict` flag.

Enabling this flag initializes your new workspace or application with a few new settings that improve maintainability, help you catch bugs ahead of time.
Additionally, applications that use these stricter settings are easier to statically analyze, which can help the `ng update` command refactor code more safely and precisely when you are updating to future versions of Angular.

Specifically, the `strict` flag does the following:

* Enables [`strict` mode in TypeScript](https://www.staging-typescript.org/tsconfig#strict), as well as other strictness flags recommended by the TypeScript team. Specifically, `forceConsistentCasingInFileNames`, `noImplicitReturns`,  `noFallthroughCasesInSwitch`.
* Turns on strict Angular compiler flags [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) and [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors).
* [Bundle size budgets](guide/build#configuring-size-budgets) have been reduced by ~75%.

You can apply these settings at the workspace and project level.

To create a new workspace and application using the strict mode, run the following command:

<code-example language="sh" class="code-shell">

ng new [project-name] --strict

</code-example>

To create a new application in the strict mode within an existing non-strict workspace, run the following command:

<code-example language="sh" class="code-shell">

ng generate application [project-name] --strict

</code-example>
-->
워크스페이스나 애플리케이션을 새로 생성할 때 `--strict` 플래그를 사용하면 strict 모드를 활성화할 수 있습니다.

이 플래그를 사용하면 워크스페이스나 애플리케이션에 좀 더 엄격한 코드 규칙이 적용되기 때문에 코드의 유지보수성이 좋아지고 이후에 발생할 버그를 빠르게 찾을 수 있습니다.
그리고 애플리케이션을 정적으로 분석하기도 편해지며, `ng update` 명령을 실행할 때 좀 더 안전하고 간결한 코드로 리팩토링됩니다.

`strict` 플래그는 이런 동작을 합니다:

* [TypeScript의 `strict` 모드](https://www.staging-typescript.org/tsconfig#strict)를 활성화합니다. `forceConsistentCasingInFileNames`, `noImplicitReturns`, `noFallThroughCasesInSwitch` 옵션이 추가됩니다.

* Angular 컴파일러 플래그 [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters), [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors) 옵션을 추가합니다.

* [빌드 결과물 크기 경고](guide/build#configuring-size-budgets)가 75%로 조정됩니다.

이런 설정은 워크스페이스 계층이나 프로젝트 계층에 적용할 수 있습니다.

이런 명령을 실행하면 됩니다:


<code-example language="sh" class="code-shell">

ng new [프로젝트-이름] --strict

</code-example>


그리고 기존에 존재하는 워크스페이스에 strict 모드로 애플리케이션을 생성하려면 이런 명령을 실행하면 됩니다:


<code-example language="sh" class="code-shell">

ng generate application [project-name] --strict

</code-example>

