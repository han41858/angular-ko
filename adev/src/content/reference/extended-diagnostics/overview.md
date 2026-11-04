<!--
# Extended Diagnostics
-->

<a id="extended-diagnostics"></a>

# 확장 진단

<!--
There are many coding patterns that are technically valid to the compiler or runtime, but which may have complex nuances or caveats.
These patterns may not have the intended effect expected by a developer, which often leads to bugs.
The Angular compiler includes "extended diagnostics" which identify many of these patterns, in order to warn developers about the potential issues and enforce common best practices within a codebase.
-->

컴파일러나 런타임 관점에서는 유효하지만 복잡한 세부 사항이나 주의점이 있는 코딩 패턴이 많습니다.
이러한 패턴은 개발자가 의도한 효과를 내지 않아 버그로 이어지는 경우가 많습니다.
Angular 컴파일러는 여러 패턴을 식별하는 "확장 진단"을 제공하여 개발자에게 잠재적인 문제를 알리고 코드베이스에 일반적인 모범 사례를 적용하도록 돕습니다.

<!--
## Diagnostics
-->

<a id="diagnostics"></a>

## 진단 목록

<!--
Currently, Angular supports the following extended diagnostics:
-->

현재 Angular는 다음 확장 진단을 지원합니다.

<!--
| Code     | Name                                                                  |
| :------- | :-------------------------------------------------------------------- |
| `NG8101` | [`invalidBananaInBox`](extended-diagnostics/NG8101)                   |
| `NG8102` | [`nullishCoalescingNotNullable`](extended-diagnostics/NG8102)         |
| `NG8103` | [`missingControlFlowDirective`](extended-diagnostics/NG8103)          |
| `NG8104` | [`textAttributeNotBinding`](extended-diagnostics/NG8104)              |
| `NG8105` | [`missingNgForOfLet`](extended-diagnostics/NG8105)                    |
| `NG8106` | [`suffixNotSupported`](extended-diagnostics/NG8106)                   |
| `NG8107` | [`optionalChainNotNullable`](extended-diagnostics/NG8107)             |
| `NG8108` | [`skipHydrationNotStatic`](extended-diagnostics/NG8108)               |
| `NG8109` | [`interpolatedSignalNotInvoked`](extended-diagnostics/NG8109)         |
| `NG8111` | [`uninvokedFunctionInEventBinding`](extended-diagnostics/NG8111)      |
| `NG8112` | [`unusedLetDeclaration`](extended-diagnostics/NG8112)                 |
| `NG8113` | [`unusedStandaloneImports`](extended-diagnostics/NG8113)              |
| `NG8114` | [`unparenthesizedNullishCoalescing`](extended-diagnostics/NG8114)     |
| `NG8115` | [`uninvokedTrackFunction`](extended-diagnostics/NG8115)               |
| `NG8116` | [`missingStructuralDirective`](extended-diagnostics/NG8116)           |
| `NG8117` | [`uninvokedFunctionInTextInterpolation`](extended-diagnostics/NG8117) |
| `NG8021` | [`deferTriggerMisconfiguration`](extended-diagnostics/NG8021)         |
-->

| 코드     | 이름                                                                  |
| :------- | :-------------------------------------------------------------------- |
| `NG8101` | [`invalidBananaInBox`](extended-diagnostics/NG8101)                   |
| `NG8102` | [`nullishCoalescingNotNullable`](extended-diagnostics/NG8102)         |
| `NG8103` | [`missingControlFlowDirective`](extended-diagnostics/NG8103)          |
| `NG8104` | [`textAttributeNotBinding`](extended-diagnostics/NG8104)              |
| `NG8105` | [`missingNgForOfLet`](extended-diagnostics/NG8105)                    |
| `NG8106` | [`suffixNotSupported`](extended-diagnostics/NG8106)                   |
| `NG8107` | [`optionalChainNotNullable`](extended-diagnostics/NG8107)             |
| `NG8108` | [`skipHydrationNotStatic`](extended-diagnostics/NG8108)               |
| `NG8109` | [`interpolatedSignalNotInvoked`](extended-diagnostics/NG8109)         |
| `NG8111` | [`uninvokedFunctionInEventBinding`](extended-diagnostics/NG8111)      |
| `NG8112` | [`unusedLetDeclaration`](extended-diagnostics/NG8112)                 |
| `NG8113` | [`unusedStandaloneImports`](extended-diagnostics/NG8113)              |
| `NG8114` | [`unparenthesizedNullishCoalescing`](extended-diagnostics/NG8114)     |
| `NG8115` | [`uninvokedTrackFunction`](extended-diagnostics/NG8115)               |
| `NG8116` | [`missingStructuralDirective`](extended-diagnostics/NG8116)           |
| `NG8117` | [`uninvokedFunctionInTextInterpolation`](extended-diagnostics/NG8117) |
| `NG8021` | [`deferTriggerMisconfiguration`](extended-diagnostics/NG8021)         |

<!--
## Configuration
-->

<a id="configuration"></a>

## 설정

<!--
Extended diagnostics are warnings by default and do not block compilation.
Each diagnostic can be configured as either:
-->

확장 진단은 기본적으로 경고이며 컴파일을 막지 않습니다.
각 진단을 다음 중 하나로 설정할 수 있습니다.

<!--
| Error category | Effect                                                                                                                                                                   |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `warning`      | Default - The compiler emits the diagnostic as a warning but does not block compilation. The compiler will still exist with status code 0, even if warnings are emitted. |
| `error`        | The compiler emits the diagnostic as an error and fails the compilation. The compiler will exit with a non-zero status code if one or more errors are emitted.           |
| `suppress`     | The compiler does _not_ emit the diagnostic at all.                                                                                                                      |
-->

| 오류 범주  | 효과                                                                                                                           |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `warning`  | 기본값입니다. 컴파일러가 진단을 경고로 표시하지만 컴파일을 막지 않습니다. 경고가 있어도 컴파일러는 상태 코드 0으로 종료됩니다. |
| `error`    | 컴파일러가 진단을 오류로 표시하고 컴파일에 실패합니다. 하나 이상의 오류가 발생하면 컴파일러는 0이 아닌 상태 코드로 종료됩니다. |
| `suppress` | 컴파일러가 해당 진단을 전혀 표시하지 _않습니다_.                                                                               |

<!--
Check severity can be configured as an [Angular compiler option](reference/configs/angular-compiler-options):
-->

검사의 심각도는 [Angular 컴파일러 옵션](reference/configs/angular-compiler-options)으로 설정할 수 있습니다.

```json
{
  "angularCompilerOptions": {
    "extendedDiagnostics": {
      "checks": {
        "invalidBananaInBox": "suppress"
      },
      "defaultCategory": "error"
    }
  }
}
```

<!--
The `checks` field maps the name of individual diagnostics to their associated category.
See [Diagnostics](#diagnostics) for a complete list of extended diagnostics and the name to use for configuring them.
-->

`checks` 필드는 각 진단의 이름을 해당 범주에 연결합니다.
확장 진단의 전체 목록과 설정에 사용할 이름은 [진단 목록](#diagnostics)을 참고하세요.

<!--
The `defaultCategory` field is used for any diagnostics that are not explicitly listed under `checks`.
If not set, such diagnostics will be treated as `warning`.
-->

`defaultCategory` 필드는 `checks`에 명시하지 않은 진단에 적용됩니다.
설정하지 않으면 이러한 진단은 `warning`으로 처리됩니다.

<!--
Extended diagnostics will emit when [`strictTemplates`](tools/cli/template-typecheck#strict-mode) is enabled.
This is required to allow the compiler to better understand Angular template types and provide accurate and meaningful diagnostics.
-->

[`strictTemplates`](tools/cli/template-typecheck#strict-mode)를 활성화하면 확장 진단이 발생합니다.
컴파일러가 Angular 템플릿 타입을 더 잘 이해하고 정확하고 의미 있는 진단을 제공하려면 이 설정이 필요합니다.

<!--
## Semantic Versioning
-->

<a id="semantic-versioning"></a>

## 시맨틱 버전 관리

<!--
The Angular team intends to add or enable new extended diagnostics in **minor** versions of Angular (see [semver](https://docs.npmjs.com/about-semantic-versioning)).
This means that upgrading Angular may show new warnings in your existing codebase.
This enables the team to deliver features more quickly and to make extended diagnostics more accessible to developers.
-->

Angular 팀은 Angular의 **마이너** 버전에서 새로운 확장 진단을 추가하거나 활성화할 예정입니다([시맨틱 버전 관리](https://docs.npmjs.com/about-semantic-versioning) 참고).
따라서 Angular를 업그레이드하면 기존 코드베이스에서 새로운 경고가 나타날 수 있습니다.
이를 통해 팀은 기능을 더 빠르게 제공하고 개발자가 확장 진단을 더 쉽게 활용하도록 할 수 있습니다.

<!--
However, setting `"defaultCategory": "error"` will promote such warnings to hard errors.
This can cause a minor version upgrade to introduce compilation errors, which may be seen as a semver non-compliant breaking change.
Any new diagnostics can be suppressed or demoted to warnings via the above [configuration](#configuration), so the impact of a new diagnostic should be minimal to
projects that treat extended diagnostics as errors by default.
Defaulting to error is a very powerful tool; just be aware of this semver caveat when deciding if `error` is the right default for your project.
-->

하지만 `"defaultCategory": "error"`를 설정하면 이러한 경고가 컴파일을 실패시키는 오류로 바뀝니다.
따라서 마이너 버전 업그레이드로 컴파일 오류가 발생할 수 있으며, 이는 시맨틱 버전 관리 규칙에 어긋나는 호환성이 깨지는 변경으로 보일 수 있습니다.
새 진단은 위의 [설정](#configuration)으로 숨기거나 경고로 낮출 수 있으므로 확장 진단을 기본적으로 오류로 처리하는 프로젝트에도 영향이 크지 않아야 합니다.
기본값을 오류로 설정하는 것은 매우 강력한 도구입니다. 프로젝트의 기본값으로 `error`가 적합한지 결정할 때 이러한 시맨틱 버전 관리상의 주의점을 고려하세요.

<!--
## New Diagnostics
-->

<a id="new-diagnostics"></a>

## 새로운 진단

<!--
The Angular team is always open to suggestions about new diagnostics that could be added.
Extended diagnostics should generally:
-->

Angular 팀은 추가할 수 있는 새로운 진단에 대한 제안을 언제나 환영합니다.
확장 진단은 일반적으로 다음 조건을 만족해야 합니다.

<!--
- Detect a common, non-obvious developer mistake with Angular templates
- Clearly articulate why this pattern can lead to bugs or unintended behavior
- Suggest one or more clear solutions
- Have a low, preferably zero, false-positive rate
- Apply to the vast majority of Angular applications (not specific to an unofficial library)
- Improve program correctness or performance (not style, that responsibility falls to a linter)
-->

- Angular 템플릿에서 흔하지만 알아차리기 어려운 개발자의 실수를 감지합니다.
- 해당 패턴이 버그나 의도하지 않은 동작으로 이어지는 이유를 명확하게 설명합니다.
- 하나 이상의 명확한 해결책을 제안합니다.
- 오탐률이 낮아야 하며, 가능하면 없어야 합니다.
- 비공식 라이브러리에 한정되지 않고 대부분의 Angular 애플리케이션에 적용됩니다.
- 프로그램의 정확성이나 성능을 개선합니다. 코드 스타일은 린터의 역할입니다.

<!--
If you have an idea for an extended diagnostic which fits these criteria, consider filing a [feature request](https://github.com/angular/angular/issues/new?template=2-feature-request.yaml).
-->

이러한 기준에 맞는 확장 진단에 대한 아이디어가 있다면 [기능 요청](https://github.com/angular/angular/issues/new?template=2-feature-request.yaml)을 등록해 보세요.
