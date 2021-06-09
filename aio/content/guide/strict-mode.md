<!--
# Strict mode
-->
# Strict 모드

<!--
Angular CLI creates all new workspaces and projects with **strict mode** enabled.

Strict mode improves maintainability and helps you catch bugs ahead of time.
Additionally, strict mode applications are easier to statically analyze and can help the `ng update` command refactor code more safely and precisely when you are updating to future versions of Angular.

Specifically, strict mode affects newly generated applications in the following way:

* Enables [`strict` mode in TypeScript](https://www.typescriptlang.org/tsconfig#strict), as well as other strictness flags recommended by the TypeScript team. Specifically, `forceConsistentCasingInFileNames`, `noImplicitReturns`,  `noFallthroughCasesInSwitch`.
* Turns on strict Angular compiler flags [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) and [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors).
* Reduces the [bundle size budgets](guide/build#configuring-size-budgets) for the `initial` and `anyComponentStyle` budget types by 75% compared to the previous defaults.

You can apply these settings at the workspace and project level.

Using the basic `ng new` command to create a new workspace and application automatically uses strict mode, as in the following command:

<code-example language="sh">

ng new [project-name]

</code-example>

To create a new application in the strict mode within an existing non-strict workspace, run the following command:

<code-example language="sh">

ng generate application [project-name] --strict

</code-example>
-->
Angular CLI로 워크스페이스나 프로젝트를 새로 만들면 **strict 모드** 가 자동으로 활성화됩니다.

Strict 모드를 활성화하면 이전보다 더 엄격한 코딩 규칙을 강제하기 때문에, 코드의 관리 용이성이 좋아지고 런타임에 발생할 버그를 개발 시점에 미리 발견할 수 있습니다.
그리고 Strict 모드를 준수하며 구현된 애플리케이션은 정적으로 분석하기 쉽기 때문에, Angular 버전을 업데이트하기 위해 실행하는 `ng update` 명령이 코드를 리팩토링할 때 문제가 발생할 일이 줄어듭니다.

Strict 모드가 활성화되면 애플리케이션에 이런 영향을 줍니다:

* [TypeScript의 `strict` 모드](https://www.typescriptlang.org/tsconfig#strict)를 활성화하고 TypeScript 팀이 권장하는 엄격한 규칙 플래그도 활성화합니다. `forceConsistentCasingInFileNames`, `noImplicitReturns`,  `noFallthroughCasesInSwitch`가 활성화됩니다.

* Angular 컴파일러 플래그 중에서 [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters), [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors)를 활성화합니다.

* [번등 결과물의 기준 용량](guide/build#configuring-size-budgets)을 감소시킵니다. `initial` 타입과 `anyComponentStyle` 타입 모두 75% 정도 감소합니다.

이런 환경설정은 워크스페이스 레벨이나 프로젝트 레벨로 조정할 수 있습니다.

`ng new` 명령으로 워크스페이스를 새로 생성하면 strict 모드가 자동으로 활성화됩니다:

<code-example language="sh">

ng new [프로젝트-이름]

</code-example>

그리고 strict 모드가 적용되지 않은 워크스페이스에서 strict 모드를 적용하는 애플리케이션을 생성하려면 이렇게 실행하면 됩니다:

<code-example language="sh">

ng generate application [프로젝트-이름] --strict

</code-example>
