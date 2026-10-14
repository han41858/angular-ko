<!--
# Angular versioning and releases
-->

<a id="angular-versioning-and-releases"></a>

# Angular 버전 관리와 릴리즈

<!--
We recognize that you need stability from the Angular framework.
Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly.
Stability is essential for the ecosystem around Angular to thrive.

We also share with you the need for Angular to keep evolving.
We strive to ensure that the foundation on top of which you are building is continuously improving and enabling you to stay up-to-date with the rest of the web ecosystem and your user needs.

This document contains the practices that we follow to provide you with a leading-edge application development platform, balanced with stability.
We strive to ensure that future changes are always introduced in a predictable way.
We want everyone who depends on Angular to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

Sometimes _breaking changes_, such as the removal of APIs or features, are necessary to innovate and stay current with evolving best practices, changing dependencies, or shifts in the web platform. These breaking changes go through a deprecation process explained in our [deprecation policy](#deprecation-policy).

To make these transitions as straightforward as possible, the Angular team makes these commitments:

- We work hard to minimize the number of breaking changes and to provide migration tools when possible
- We follow the deprecation policy described here, so you have time to update your applications to the latest APIs and best practices

HELPFUL: The practices described in this document apply to Angular 2.0 and later.
If you are currently using AngularJS, see [Upgrading from AngularJS](https://angular.io/guide/upgrade 'Upgrading from AngularJS').
_AngularJS_ is the name for all v1.x versions of Angular.
-->

Angular 프레임워크에 안정성이 필요하다는 점을 잘 알고 있습니다.
안정성이 있어야 재사용 가능한 컴포넌트와 라이브러리, 튜토리얼, 도구, 익혀 둔 개발 방식이 예상치 못하게 쓸모없어지는 일을 막을 수 있습니다.
안정성은 Angular 생태계가 성장하는 데 필수적입니다.

한편 Angular가 계속 발전해야 한다는 필요성에도 공감합니다.
여러분이 개발의 기반으로 삼는 플랫폼을 지속적으로 개선하여, 웹 생태계의 변화와 사용자의 요구에 발맞출 수 있도록 노력합니다.

이 문서는 안정성과 균형을 이루면서 최첨단 애플리케이션 개발 플랫폼을 제공하기 위해 Angular 팀이 따르는 원칙을 설명합니다.
앞으로의 변경 사항도 항상 예측 가능한 방식으로 도입하고자 합니다.
Angular를 사용하는 모든 사람이 새로운 기능이 언제, 어떻게 추가되는지 알고, 오래된 기능이 제거될 때 충분히 준비할 수 있기를 바랍니다.

혁신을 이어 가고 모범 사례의 발전, 의존성 변경, 웹 플랫폼 변화에 대응하려면 때로는 API나 기능 제거와 같은 _호환성을 깨뜨리는 변경_ 이 필요합니다. 이러한 변경은 [지원 중단 정책](#deprecation-policy)에 설명된 절차를 거칩니다.

이러한 전환을 최대한 쉽게 할 수 있도록 Angular 팀은 다음을 약속합니다.

- 호환성을 깨뜨리는 변경을 최소화하고 가능한 경우 마이그레이션 도구를 제공하기 위해 노력합니다.
- 이 문서의 지원 중단 정책을 준수하여 애플리케이션을 최신 API와 모범 사례에 맞게 업데이트할 시간을 제공합니다.

HELPFUL: 이 문서의 원칙은 Angular 2.0 이후 버전에 적용됩니다.
현재 AngularJS를 사용한다면 [AngularJS에서 업그레이드하기](https://angular.io/guide/upgrade 'AngularJS에서 업그레이드하기')를 참고하세요.
_AngularJS_ 는 Angular의 모든 v1.x 버전을 가리키는 이름입니다.

<!--
## Angular versioning
-->

<a id="angular-versioning"></a>

## Angular 버전 관리

<!--
Angular version numbers indicate the level of changes that are introduced by the release.
This use of [semantic versioning](https://semver.org/ 'Semantic Versioning Specification') helps you understand the potential impact of updating to a new version.

Angular version numbers have three parts: `major.minor.patch`.
For example, version 7.2.11 indicates major version 7, minor version 2, and patch level 11.

The version number is incremented based on the level of change included in the release.

| Level of change | Details                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Major release   | Contains significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you might need to run update scripts, refactor code, run additional tests, and learn new APIs.                                                                                                                                                                                      |
| Minor release   | Contains new smaller features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your applications and libraries to begin using new APIs, features, and capabilities that were added in the release. We update peer dependencies in minor versions by expanding the supported versions, but we do not require projects to update these dependencies. |
| Patch release   | Low risk, bug fix release. No developer assistance is expected during update.                                                                                                                                                                                                                                                                                                                                                     |

HELPFUL: As of Angular version 7, the major versions of Angular core and the CLI are aligned.
This means that in order to use the CLI as you develop an Angular app, the version of `@angular/core` and the CLI need to be the same.
-->

Angular 버전 번호는 해당 릴리즈에 포함된 변경의 수준을 나타냅니다.
이러한 [유의적 버전 관리](https://semver.org/ '유의적 버전 관리 명세')를 통해 새 버전으로 업데이트할 때 어떤 영향이 있을지 파악할 수 있습니다.

Angular 버전 번호는 `major.minor.patch`의 세 부분으로 구성됩니다.
예를 들어 7.2.11은 메이저 버전 7, 마이너 버전 2, 패치 수준 11을 뜻합니다.

릴리즈에 포함된 변경 수준에 따라 버전 번호를 올립니다.

| 변경 수준     | 설명                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 메이저 릴리즈 | 중요한 새 기능을 포함하며, 업데이트 과정에서 개발자의 작업이 일부 필요할 수 있지만 최소한으로 유지합니다. 새 메이저 릴리즈로 업데이트할 때는 업데이트 스크립트 실행, 코드 리팩터링, 추가 테스트 실행, 새로운 API 학습 등이 필요할 수 있습니다.                                                                                                                                                         |
| 마이너 릴리즈 | 규모가 작은 새 기능을 포함합니다. 마이너 릴리즈는 완전한 하위 호환성을 제공하므로 업데이트할 때 개발자의 별도 작업이 필요하지 않습니다. 다만 릴리즈에 추가된 API와 기능을 사용하기 위해 애플리케이션과 라이브러리를 선택적으로 수정할 수 있습니다. 마이너 버전에서는 지원하는 버전 범위를 확장하는 방식으로 피어 의존성을 업데이트하며, 프로젝트에서 이러한 의존성을 업데이트하도록 요구하지 않습니다. |
| 패치 릴리즈   | 위험이 낮은 버그 수정 릴리즈입니다. 업데이트할 때 개발자의 별도 작업이 필요하지 않습니다.                                                                                                                                                                                                                                                                                                              |

HELPFUL: Angular 버전 7부터 Angular 코어와 CLI의 메이저 버전이 일치합니다.
따라서 Angular 앱을 개발하면서 CLI를 사용하려면 `@angular/core`와 CLI의 버전이 같아야 합니다.

<!--
### Preview releases
-->

<a id="preview-releases"></a>

### 미리보기 릴리즈

<!--
We let you preview what's coming by providing "Next" and Release Candidates \(`rc`\) pre-releases for each major and minor release:

| Pre-release type  | Details                                                                                                                                                                      |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next              | The release that is under active development and testing. The next release is indicated by a release tag appended with the `-next` identifier, such as `8.1.0-next.0`.       |
| Release candidate | A release that is feature complete and in final testing. A release candidate is indicated by a release tag appended with the `-rc` identifier, such as version `8.1.0-rc.0`. |

The latest `next` or `rc` pre-release version of the documentation is available at [next.angular.dev](https://next.angular.dev).
-->

각 메이저 및 마이너 릴리즈에 대해 "Next"와 릴리즈 후보(`rc`) 사전 릴리즈를 제공하므로 앞으로 추가될 기능을 미리 사용해 볼 수 있습니다.

| 사전 릴리즈 유형 | 설명                                                                                                                  |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Next             | 활발하게 개발하고 테스트하는 릴리즈입니다. `8.1.0-next.0`처럼 릴리즈 태그 뒤에 `-next` 식별자를 붙여 표시합니다.      |
| 릴리즈 후보      | 기능 구현이 완료되어 최종 테스트 중인 릴리즈입니다. `8.1.0-rc.0`처럼 릴리즈 태그 뒤에 `-rc` 식별자를 붙여 표시합니다. |

최신 `next` 또는 `rc` 사전 릴리즈의 문서는 [next.angular.dev](https://next.angular.dev)에서 확인할 수 있습니다.

<!--
## Release frequency
-->

<a id="release-frequency"></a>

## 릴리즈 주기

<!--
We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Angular.

HELPFUL: Dates are offered as general guidance and are subject to change.

In general, expect the following release cycle:

- A major release every 12 months
- 4-6 minor releases for each major release
- A patch release and pre-release \(`next` or `rc`\) build almost every week

This cadence of releases gives eager developers access to new features as soon as they are fully developed and pass through our code review and integration testing processes, while maintaining the stability and reliability of the platform for production users that prefer to receive features after they have been validated by Google and other developers that use the pre-release builds.

HELPFUL: Until Angular v22, Angular had a 6-month major release cycle, with 1-3 minor releases for each major release
-->

Angular가 계속 발전하는 가운데 여러분이 업데이트를 계획하고 일정을 조정할 수 있도록 규칙적인 릴리즈 일정을 목표로 합니다.

HELPFUL: 날짜는 일반적인 참고용이며 변경될 수 있습니다.

일반적인 릴리즈 주기는 다음과 같습니다.

- 12개월마다 메이저 릴리즈
- 메이저 릴리즈마다 4-6회의 마이너 릴리즈
- 거의 매주 패치 릴리즈와 사전 릴리즈(`next` 또는 `rc`) 빌드

이러한 릴리즈 주기를 통해 새로운 기능을 빨리 사용하려는 개발자는 기능 개발이 완료되고 코드 리뷰와 통합 테스트를 통과하는 즉시 이를 사용할 수 있습니다. 동시에 Google과 사전 릴리즈 빌드를 사용하는 다른 개발자들이 검증한 기능을 받아 보려는 프로덕션 사용자에게는 플랫폼의 안정성과 신뢰성을 유지합니다.

HELPFUL: Angular v22 이전에는 메이저 릴리즈 주기가 6개월이었으며, 각 메이저 릴리즈마다 1-3회의 마이너 릴리즈가 있었습니다.

<!--
## Support policy and schedule
-->

<a id="support-policy-and-schedule"></a>

## 지원 정책과 일정

<!--
HELPFUL: Approximate dates are offered as general guidance and are subject to change.
-->

HELPFUL: 대략적인 날짜는 일반적인 참고용이며 변경될 수 있습니다.

<!--
### Release schedule
-->

<a id="release-schedule"></a>

### 릴리즈 일정

<!--
| Version | Date               |
| :------ | :----------------- |
| v22.1   | Week of 2026-07-27 |
| v22.2   | Week of 2026-09-21 |
| v22.3   | ~ November 2026    |
| v22.4   | ~ January 2027     |
| v22.5   | ~ March 2027       |
| v23.0   | ~ June 2027        |
-->

| 버전  | 날짜                   |
| :---- | :--------------------- |
| v22.1 | 2026-07-27이 포함된 주 |
| v22.2 | 2026-09-21이 포함된 주 |
| v22.3 | 2026년 11월경          |
| v22.4 | 2027년 1월경           |
| v22.5 | 2027년 3월경           |
| v23.0 | 2027년 6월경           |

<!--
### Support window
-->

<a id="support-window"></a>

### 지원 기간

<!--
All major releases are typically supported for 24 months.

| Support stage     | Support Timing | Details                                                             |
| :---------------- | :------------- | :------------------------------------------------------------------ |
| Active            | 12 months      | Regularly-scheduled updates and patches are released                |
| Long-term \(LTS\) | 12 months      | Only [critical fixes and security patches](#lts-fixes) are released |
-->

모든 메이저 릴리즈는 일반적으로 24개월 동안 지원합니다.

| 지원 단계      | 지원 기간 | 설명                                                  |
| :------------- | :-------- | :---------------------------------------------------- |
| 활성 지원      | 12개월    | 정기적인 업데이트와 패치를 릴리즈합니다.              |
| 장기 지원(LTS) | 12개월    | [중요한 수정과 보안 패치](#lts-fixes)만 릴리즈합니다. |

<!--
### Actively supported versions
-->

<a id="actively-supported-versions"></a>

### 현재 지원 중인 버전

<!--
The following table provides the status for Angular versions under support.

| Version | Status | Released   | Active ends | LTS ends   |
| :------ | :----- | :--------- | :---------- | :--------- |
| ^22.0.0 | Active | 2026-06-03 | 2027-06     | 2028-06    |
| ^21.0.0 | LTS    | 2025-11-19 | 2026-06-03  | 2027-06    |
| ^20.0.0 | LTS    | 2025-05-28 | 2025-11-19  | 2026-11-28 |

IMPORTANT: Angular versions v2 to v19 are no longer supported.
-->

다음 표는 지원 중인 Angular 버전의 상태를 보여 줍니다.

| 버전    | 상태      | 릴리즈 날짜 | 활성 지원 종료 | LTS 종료   |
| :------ | :-------- | :---------- | :------------- | :--------- |
| ^22.0.0 | 활성 지원 | 2026-06-03  | 2027-06        | 2028-06    |
| ^21.0.0 | LTS       | 2025-11-19  | 2026-06-03     | 2027-06    |
| ^20.0.0 | LTS       | 2025-05-28  | 2025-11-19     | 2026-11-28 |

IMPORTANT: Angular v2부터 v19까지는 더 이상 지원하지 않습니다.

<!--
### LTS fixes
-->

<a id="lts-fixes"></a>

### LTS 수정 사항

<!--
As a general rule, a fix is considered for an LTS version if it resolves one of:

- A newly identified security vulnerability,
- A regression, since the start of LTS, caused by a 3rd party change, such as a new browser version.
-->

일반적으로 다음 중 하나를 해결하는 경우 LTS 버전의 수정 사항으로 검토합니다.

- 새롭게 발견된 보안 취약점
- LTS 시작 이후 새 브라우저 버전과 같은 서드 파티의 변경으로 발생한 회귀 문제

<!--
## Deprecation policy
-->

<a id="deprecation-policy"></a>

## 지원 중단 정책

<!--
When the Angular team intends to remove an API or feature, it will be marked as _deprecated_. This occurs when an API is obsolete, superseded by another API, or otherwise discontinued. Deprecated API remain available through their deprecated phase, which lasts a minimum one major version (approximately one year).

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

| Deprecation stages | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Announcement       | We announce deprecated APIs and features in the [change log](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular change log'). Deprecated APIs appear in the [documentation](api?status=8) with ~~strikethrough~~. When we announce a deprecation, we also announce a recommended update path. Additionally, all deprecated APIs are annotated with `@deprecated` in the corresponding documentation, which enables text editors and IDEs to provide hints if your project depends on them. |
| Deprecation period | When an API or a feature is deprecated, it is still present in at least the next major release (period of at least 12 months). After that, deprecated APIs and features are candidates for removal. A deprecation can be announced in any release, but the removal of a deprecated API or feature happens only in major release. Until a deprecated API or feature is removed, it is maintained according to the LTS support policy, meaning that only critical and security issues are fixed.             |
| npm dependencies   | We only make npm dependency updates that require changes to your applications in a major release. In minor releases, we update peer dependencies by expanding the supported versions, but we do not require projects to update these dependencies until a future major version. This means that during minor Angular releases, npm dependency updates within Angular applications and libraries are optional.                                                                                              |
-->

Angular 팀이 API나 기능을 제거하려고 할 때는 _지원 중단 예정(deprecated)_ 으로 표시합니다. API가 오래되었거나 다른 API로 대체되었거나 더 이상 제공하지 않기로 한 경우에 해당합니다. 지원 중단 예정인 API는 최소 한 번의 메이저 버전(약 1년)에 걸친 지원 중단 유예 기간 동안 계속 사용할 수 있습니다.

업데이트할 충분한 시간과 명확한 방법을 제공하기 위해 다음 지원 중단 정책을 따릅니다.

| 지원 중단 단계      | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 공지                | 지원 중단 예정인 API와 기능을 [변경 이력](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular 변경 이력')에 공지합니다. 지원 중단 예정인 API는 [문서](api?status=8)에 ~~취소선~~으로 표시합니다. 지원 중단을 공지할 때 권장하는 업데이트 방법도 함께 안내합니다. 또한 해당 문서의 모든 지원 중단 예정 API에 `@deprecated`를 표시하므로, 프로젝트가 이러한 API에 의존하면 텍스트 편집기와 IDE에서 안내를 제공할 수 있습니다. |
| 지원 중단 유예 기간 | API나 기능이 지원 중단 예정으로 표시되더라도 적어도 다음 메이저 릴리즈까지는 유지됩니다(최소 12개월). 그 이후에는 지원 중단 예정인 API와 기능이 제거 대상이 됩니다. 지원 중단 공지는 어떤 릴리즈에서든 할 수 있지만, 실제 제거는 메이저 릴리즈에서만 이루어집니다. 제거되기 전까지는 LTS 지원 정책에 따라 유지 관리하며, 중요한 문제와 보안 문제만 수정합니다.                                                                             |
| npm 의존성          | 애플리케이션의 변경이 필요한 npm 의존성 업데이트는 메이저 릴리즈에서만 수행합니다. 마이너 릴리즈에서는 지원하는 버전 범위를 확장하여 피어 의존성을 업데이트하지만, 다음 메이저 버전 전까지 프로젝트에서 이러한 의존성을 업데이트하도록 요구하지 않습니다. 따라서 Angular 마이너 릴리즈 동안에는 Angular 애플리케이션과 라이브러리의 npm 의존성 업데이트가 선택 사항입니다.                                                                 |

<!--
## Compatibility policy
-->

<a id="compatibility-policy"></a>

## 호환성 정책

<!--
Angular is a collection of many packages, subprojects, and tools.
To prevent accidental use of private APIs and so that you can clearly understand what is covered by the practices described here — we document what is and is not considered our public API surface.
For details, see [Supported Public API Surface of Angular](https://github.com/angular/angular/blob/main/contributing-docs/public-api-surface.md 'Supported Public API Surface of Angular').

To guarantee backward compatibility of Angular we run a series of checks before we merge any change:

- Unit tests and integration tests
- Comparing the type definitions of the public API surface before and after the change
- Running the tests of all the applications at Google that depend on Angular

Any changes to the public API surface are made in accordance with the versioning, support, and depreciation policies previously described. In exceptional cases, such as critical security patches, fixes may introduce backwards incompatible changes. Such exceptional cases are accompanied by explicit notice on the framework's official communication channels.
-->

Angular는 여러 패키지, 하위 프로젝트, 도구의 모음입니다.
비공개 API를 실수로 사용하는 일을 방지하고 이 문서의 원칙이 적용되는 범위를 명확히 알 수 있도록, 공개 API에 포함되는 것과 포함되지 않는 것을 문서화합니다.
자세한 내용은 [Angular에서 지원하는 공개 API 범위](https://github.com/angular/angular/blob/main/contributing-docs/public-api-surface.md 'Angular에서 지원하는 공개 API 범위')를 참고하세요.

Angular의 하위 호환성을 보장하기 위해 모든 변경 사항을 병합하기 전에 다음을 검사합니다.

- 단위 테스트와 통합 테스트
- 변경 전후의 공개 API 타입 정의 비교
- Angular에 의존하는 Google의 모든 애플리케이션 테스트 실행

공개 API의 모든 변경은 앞에서 설명한 버전 관리, 지원, 지원 중단 정책에 따라 이루어집니다. 중요한 보안 패치와 같은 예외적인 경우에는 수정 사항이 하위 호환성을 깨뜨릴 수 있습니다. 이러한 예외적인 경우에는 프레임워크의 공식 소통 채널을 통해 명시적으로 공지합니다.

<!--
## Breaking change policy and update paths
-->

<a id="breaking-change-policy-and-update-paths"></a>

## 호환성을 깨뜨리는 변경 정책과 업데이트 방법

<!--
Breaking change requires you to do work because the state after it is not backward compatible with the state before it. You can find the rare exceptions from this rule in the [Compatibility policy](#compatibility-policy). Examples of breaking changes are the removal of public APIs or other changes of the type definition of Angular, changing the timing of calls, or updating to a new version of a dependency of Angular, which includes breaking changes itself.

To support you in case of breaking changes in Angular:

- We follow our [deprecation policy](#deprecation-policy) before we remove a public API
- Support update automation via the `ng update` command. It provides code transformations which we often have tested ahead of time over hundreds of thousands of projects at Google
- Step by step instructions how to update from one major version to another at the ["Angular Update Guide"](update-guide)

You can `ng update` to any version of Angular, provided that the following criteria are met:

- The version you want to update _to_ is supported.
- The version you want to update _from_ is within one major version of the version you want to
  upgrade to.

For example, you can update from version 11 to version 12, provided that version 12 is still supported.
If you want to update across multiple major versions, perform each update one major version at a time.
For example, to update from version 10 to version 12:

1. Update from version 10 to version 11.
1. Update from version 11 to version 12.
-->

호환성을 깨뜨리는 변경은 변경 후 상태가 변경 전 상태와 하위 호환되지 않으므로 여러분의 작업이 필요합니다. 이 원칙의 드문 예외는 [호환성 정책](#compatibility-policy)에서 확인할 수 있습니다. 공개 API 제거, Angular의 타입 정의 변경, 호출 시점 변경, 자체적으로 호환성을 깨뜨리는 변경이 포함된 Angular 의존성의 새 버전으로 업데이트하는 경우 등이 이에 해당합니다.

Angular에서 호환성을 깨뜨리는 변경이 발생할 때 여러분을 지원하기 위해 다음을 제공합니다.

- 공개 API를 제거하기 전에 [지원 중단 정책](#deprecation-policy)을 따릅니다.
- `ng update` 명령어로 업데이트 자동화를 지원합니다. 이 명령어는 코드 변환을 제공하며, 이러한 변환은 Google의 수십만 개 프로젝트에서 사전에 테스트한 경우가 많습니다.
- ["Angular 업데이트 가이드"](update-guide)에서 메이저 버전 간 업데이트 방법을 단계별로 안내합니다.

다음 조건을 충족하면 `ng update`로 원하는 Angular 버전으로 업데이트할 수 있습니다.

- 업데이트 _대상_ 버전이 지원 중이어야 합니다.
- 업데이트 _이전_ 버전과 업데이트 대상 버전의 메이저 버전 차이가 하나 이내여야 합니다.

예를 들어 버전 12가 아직 지원 중이라면 버전 11에서 버전 12로 업데이트할 수 있습니다.
여러 메이저 버전을 건너뛰어 업데이트하려면 메이저 버전을 하나씩 순서대로 업데이트하세요.
예를 들어 버전 10에서 버전 12로 업데이트하려면 다음과 같이 진행합니다.

1. 버전 10에서 버전 11로 업데이트합니다.
1. 버전 11에서 버전 12로 업데이트합니다.

<!--
## Developer Preview
-->

<a id="developer-preview"></a>

## 개발자 미리보기

<!--
Occasionally we introduce new APIs under the label of "Developer Preview". These are APIs that are fully functional and polished, but that we are not ready to stabilize under our normal deprecation policy.

This may be because we want to gather feedback from real applications before stabilization, or because the associated documentation or migration tooling is not fully complete. Feedback can be provided via a [GitHub issue](https://github.com/angular/angular/issues), where developers can share their experiences, report bugs, or suggest improvements to help refine the feature.

The policies and practices that are described in this document do not apply to APIs marked as Developer Preview. Such APIs can change at any time, even in new patch versions of the framework. Teams should decide for themselves whether the benefits of using Developer Preview APIs are worth the risk of breaking changes outside of our normal use of semantic versioning.
-->

때로는 "개발자 미리보기(Developer Preview)"라는 이름으로 새 API를 도입합니다. 이러한 API는 모든 기능이 구현되어 있고 완성도가 높지만, 아직 일반적인 지원 중단 정책 아래에서 안정화할 준비가 되지 않은 상태입니다.

안정화 전에 실제 애플리케이션의 피드백을 수집하려는 경우나 관련 문서 또는 마이그레이션 도구가 아직 완성되지 않은 경우가 이에 해당할 수 있습니다. 개발자는 [GitHub 이슈](https://github.com/angular/angular/issues)를 통해 사용 경험을 공유하고, 버그를 보고하고, 개선 사항을 제안하여 기능을 다듬는 데 도움을 줄 수 있습니다.

이 문서에 설명된 정책과 원칙은 개발자 미리보기로 표시한 API에는 적용되지 않습니다. 이러한 API는 프레임워크의 새 패치 버전에서도 언제든지 변경될 수 있습니다. 개발자 미리보기 API를 사용하는 이점이 일반적인 유의적 버전 관리 원칙을 벗어나는 호환성 변경의 위험을 감수할 만한지는 각 팀이 스스로 판단해야 합니다.

<!--
## Experimental
-->

<a id="experimental"></a>

## 실험적 기능

<!--
These APIs might not become stable at all or have significant changes before becoming stable.

The policies and practices that are described in this document do not apply to APIs marked as experimental. Such APIs can change at any time, even in new patch versions of the framework. Teams should decide for themselves whether the benefits of using experimental APIs are worth the risk of breaking changes outside of our normal use of semantic versioning.
-->

이러한 API는 안정화되지 않을 수도 있으며, 안정화되기 전에 크게 변경될 수 있습니다.

이 문서에 설명된 정책과 원칙은 실험적으로 표시한 API에는 적용되지 않습니다. 이러한 API는 프레임워크의 새 패치 버전에서도 언제든지 변경될 수 있습니다. 실험적 API를 사용하는 이점이 일반적인 유의적 버전 관리 원칙을 벗어나는 호환성 변경의 위험을 감수할 만한지는 각 팀이 스스로 판단해야 합니다.
