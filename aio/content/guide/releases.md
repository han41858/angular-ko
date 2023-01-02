<!--
# Angular versioning and releases
-->
# Angular의 버전 정책과 릴리즈 정책

<!--
We recognize that you need stability from the Angular framework.
Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly.
Stability is essential for the ecosystem around Angular to thrive.

We also share with you the need for Angular to keep evolving.
We strive to ensure that the foundation on top of which you are building is continuously improving and enabling you to stay up-to-date with the rest of the web ecosystem and your user needs.

This document contains the practices that we follow to provide you with a leading-edge application development platform, balanced with stability.
We strive to ensure that future changes are always introduced in a predictable way.
We want everyone who depends on Angular to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

<div class="alert is-helpful">

The practices described in this document apply to Angular 2.0 and later.
If you are currently using AngularJS, see [Upgrading from AngularJS](guide/upgrade "Upgrading from Angular JS").
*AngularJS* is the name for all v1.x versions of Angular.

</div>
-->
여러 프레임워크 중에서 Angular를 선택하는 이유 중 하나는 안정성(stability)일 것입니다.
프레임워크가 안정적이어야 재사용할 수 있는 컴포넌트나 라이브러리를 만들고, 튜토리얼을 확인하거나 툴을 활용할 때, 예제 코드를 확인할 때도 예상치 못한 오류가 발생하지 않는 것을 보장할 수 있습니다.
그래서 안정성은 Angular 생태계가 계속 발전하기 위해 꼭 필요한 기준입니다.

그리고 Angular는 끊임없이 진화하고 있습니다.
Angular 코어 팀은 개발자들이 만드는 애플리케이션의 토대가 되는 프레임워크를 지속적으로 개선하고 있으며, 웹 생태계와 개발자의 요구에 부응하기 위해 최신 기술을 계속 반영하고 있습니다.

이 문서에서는 최신 기술을 제공하는 앱 개발 플랫폼으로써의 역할과 안정성을 보장해야 하는 프레임워크로써 역할 사이의 균형을 Angular 코어 팀이 어떻게 조정하고 있는지 소개합니다.
Angular 코어 팀은 앞으로 Angular 프레임워크에 일어날 변화가 항상 예측 가능한 것이기를 보장하고 싶습니다.
Angular를 활용하는 개발자들이라면 어떤 기능이 언제 도입될지, 어떤 기능은 지원이 중단될지 미리 알고 준비할 수 있기를 원합니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 코드는 Angular 2.0 이후 버전에 대한 것입니다.
지금 사용하는 Angular의 버전이 AngularJS라면 [AngularJS에서 업그레이드하기](guide/upgrade "Upgrading from Angular JS") 문서를 참고하세요.
*AngularJS* 는 Angular v1.x 버전을 의미합니다.

</div>


<a id="versioning"></a>

<!--
## Angular versioning
-->
## Angular의 버전 정책

<!--
Angular version numbers indicate the level of changes that are introduced by the release.
This use of [semantic versioning](https://semver.org/ "Semantic Versioning Specification") helps you understand the potential impact of updating to a new version.

Angular version numbers have three parts: `major.minor.patch`.
For example, version 7.2.11 indicates major version 7, minor version 2, and patch level 11.

The version number is incremented based on the level of change included in the release.

| Level of change | Details |
|:---             |:---     |
| Major release   | Contains significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you might need to run update scripts, refactor code, run additional tests, and learn new APIs.                                                                                                                                                                                      |
| Minor release   | Contains new smaller features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your applications and libraries to begin using new APIs, features, and capabilities that were added in the release. We update peer dependencies in minor versions by expanding the supported versions, but we do not require projects to update these dependencies. |
| Patch release   | Low risk, bug fix release. No developer assistance is expected during update.                                                                                                                                                                                                                                                                                                                                                     |

<div class="alert is-helpful">

**NOTE**: <br />
As of Angular version 7, the major versions of Angular core and the CLI are aligned.
This means that in order to use the CLI as you develop an Angular app, the version of `@angular/core` and the CLI need to be the same.

</div>
-->
Angular는 [시맨틱 버저닝(semantic versioning)](https://semver.org/ "Semantic Versioning Specification") 정책을 사용하기 때문에 Angular가 릴리즈된 버전을 보면 해당 릴리즈에 변경된 양이 어느 정도되는지 짐작할 수 있습니다.

Angular의 버전은 `메이저.마이너.패치` 3단계로 구분할 수 있습니다.
예를 들어 7.2.11 라는 릴리즈 버전이 있다면, 이 릴리즈의 메이저 버전은 7이고 마이너 버전은 2이며, 패치 레벨은 11입니다.

그리고 Angular의 버전은 Angular 코드가 얼마나 많이 변경되었는지에 따라 연관된 숫자가 증가하는 방식으로 매겨집니다.

| 변경 정도   | 설명                                                                                                                                                                                                                           |
|:--------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 메이저 릴리즈 | 완전히 새로운 기능이 도입됩니다. 새로운 메이저 버전을 도입하려면 개발자의 노력이 조금 필요할 수 있습니다. 업데이트 스크립트를 실행해야 할 수도 있고 코드를 리팩토링해야 할 수도 있으며, 테스트를 추가로 실행해봐야 할 수도 있습니다. 어쩌면 새로운 API가 추가되었을 수도 있습니다.                                                              |
| 마이너 릴리즈 | 비교적 작은 변화가 있습니다. 마이너 버전이 올라가는 경우에는 하위호환성을 보장되기 때문에 메이저 릴리즈만큼 개발자가 신경써야 할 것은 없지만, 새로운 API나 기능을 활용해서 애플리케이션 로직을 개선하는 것이 나은 경우도 있습니다. 마이너 버전이 올라갈 때 관련된 의존성 패키지 버전도 함께 올라갈 수 있지만, 이 의존성 패키지는 버전을 올리지 않더라도 애플리케이션 실행에는 문제가 없습니다. |
| 패치 릴리즈  | 큰 변동 없이 버그가 수정되었습니다. 이 경우에는 새로운 버전으로 업데이트하더라도 신경쓸 것은 거의 없습니다.                                                                                                                                                                |

<div class="alert is-helpful">

**참고**: <br />
Angular 코어 패키지의 메이저 버전과 Angular CLI 메이저 버전은 Angular 7부터 맞춰졌습니다.
이 버전부터는 Angular CLI로 Angular 애플리케이션을 개발하려면 사용하는 Angular CLI의 버전과 `@angular/core` 패키지의 버전이 같아야 합니다.

</div>


<a id="updating"></a>

<!--
### Supported update paths
-->
### 업데이트를 진행하는 방법

<!--
You can `ng update` to any version of Angular, provided that the following criteria are met:

*   The version you want to update *to* is supported.
*   The version you want to update *from* is within one major version of the version you want to
    upgrade to.

For example, you can update from version 11 to version 12, provided that version 12 is still supported.
If you want to update across multiple major versions, perform each update one major version at a time.
For example, to update from version 10 to version 12:

1.  Update from version 10 to version 11.
1.  Update from version 11 to version 12.

See [Keeping Up-to-Date](guide/updating "Updating your projects") for more information about updating your Angular projects to the most recent version.
-->
`ng update` 명령을 사용하려면 이런 조건을 만족해야 합니다:

*   *올려야 하는* 버전이 아직 지원중인 경우
*   *현재* 버전이 메이저 버전 기준으로 1 차이나는 경우

그래서 11 버전에서 12 버전으로 올리는 것은 가능합니다.
12 버전이 아직 지원되고 있기 때문입니다.
그리고 메이저 버전을 여개 올려야 한다면, 한 번에 하나씩만 메이너 버전을 올리는 것을 권장합니다.
그래서 10 버전에서 12 버전으로 올리려면:

1.  10 버전을 11 버전으로 업데이트합니다.
1.  그리고 11 버전을 12 버전으로 업데이트합니다.

Angular 프로젝트를 최신버전으로 유지하는 것에 대해 자세하게 알아보려면 [최신 버전 적용하기](guide/updating "Updating your projects") 문서를 참고하세요.


<a id="previews"></a>

<!--
### Preview releases
-->
### 시험판 릴리즈

<!--
We let you preview what's coming by providing "Next" and Release Candidates \(`rc`\) pre-releases for each major and minor release:

| Pre-release type  | Details |
|:---               |:---     |
| Next              | The release that is under active development and testing. The next release is indicated by a release tag appended with the `-next` identifier, such as  `8.1.0-next.0`.      |
| Release candidate | A release that is feature complete and in final testing. A release candidate is indicated by a release tag appended with the `-rc` identifier, such as version `8.1.0-rc.0`. |

The latest `next` or `rc` pre-release version of the documentation is available at [next.angular.io](https://next.angular.io).
-->
"Next" 버전이나 앞으로 배포될 배포 후보판\(Release Candidates, rc\)을 활용하면 메이저 버전과 마이너 버전에 반영될 기능을 미리 확인해볼 수 있습니다:

| 릴리즈 타입                      | 설명                                                                              |
|:----------------------------|:--------------------------------------------------------------------------------|
| Next                        | Angular 개발용이나 테스트용으로 배포되는 릴리즈입니다. 이 버전은 `8.1.0-next.0`과 같이 `-next`라는 접미사가 붙습니다. |
| 배포 후보판\(Release candidate\) | 개발이 끝나고 테스트중인 릴리즈입니다. 이 버전은 `8.1.0-rc.0`과 같이 `-rc`라는 접미사가 붙습니다.                 |

그리고 최신 `next` 버전이나 `rc` 버전에 대한 문서는 [next.angular.io](https://next.angular.io)에서 확인할 수 있습니다.


<a id="frequency"></a>

<!--
## Release frequency
-->
## 릴리즈 주기

<!--
We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Angular.

<div class="alert is-helpful">

Dates are offered as general guidance and are subject to change.

</div>

In general, expect the following release cycle:

*   A major release every 6 months
*   1-3 minor releases for each major release
*   A patch release and pre-release \(`next` or `rc`\) build almost every week

This cadence of releases gives eager developers access to new features as soon as they are fully developed and pass through our code review and integration testing processes, while maintaining the stability and reliability of the platform for production users that prefer to receive features after they have been validated by Google and other developers that use the pre-release builds.
-->
Angular는 일정한 주기로 릴리즈됩니다.
많은 개발자들이 버전 업데이트를 미리 대비해서 Angular의 발전에 함께 할 수 있기를 바랍니다.

<div class="alert is-helpful">

아래 언급하는 일정은 대략적인 것이며 상황에 따라 변경될 수 있습니다.

</div>

일반적으로 릴리즈 주기는 이렇습니다:

*   메이저 버전은 6개월마다 한 번씩 발표됩니다.
*   새로운 메이저 버전이 나올 때까지 1-3번 마이너 릴리즈가 있을 수 있습니다.
*   패치 버전과 시험판 릴리즈\(`next`, `rc`\)는 거의 매주 발표됩니다.

부지런한 개발자라면 새로운 기능이 나올때마다 패키지를 업그레이드해서 새로운 기능이 어떻게 추가되었는지 확인해볼 수 있으며, Angular 코어 팀이 작성한 코드를 리뷰하거나 함께 테스트할 수 있을 것입니다.
그리고 안전성과 유지보수를 중요시하는 개발자라면 Google Angular 코어 팀과 다른 개발자들에게 충분한 검증을 받을 때까지 안정 버전을 유지하는 정책을 사용할 수도 있습니다.


<a id="lts"></a>
<a id="support"></a>

<!--
## Support policy and schedule
-->
## 지원 정책과 일정

<!--
<div class="alert is-helpful">

Dates are offered as general guidance and are subject to change.

</div>
-->
<div class="alert is-helpful">

아래 언급하는 일정은 대략적인 것이며 상황에 따라 변경될 수 있습니다.

</div>


<!--
### Release schedule
-->
### 릴리즈 일정

<!--
| Version | Date               |
| :---    | :---               |
| v14.1   | Week of 2022-07-18 |
| v14.2   | Week of 2022-08-22 |
| v15.0   | Week of 2022-11-18 |
-->
| 버전    | 일정           |
|:------|:-------------|
| v14.1 | 2022-07-18 주 |
| v14.2 | 2022-08-22 주 |
| v15.0 | 2022-11-18 주 |


<!--
### Support window
-->
### 지원 기간

<!--
All major releases are typically supported for 18 months.

| Support stage     | Support Timing | Details |
|:---               |:---            |:---     |
| Active            | 6 months       | Regularly-scheduled updates and patches are released                |
| Long-term \(LTS\) | 12 months      | Only [critical fixes and security patches](#lts-fixes) are released |
-->
메이저 릴리즈 지원은 보통 18개월동안 제공됩니다.

| 지원 단계             | 지원 기간 | 설명                                      |
|:------------------|:------|:----------------------------------------|
| Active            | 6 개월  | 업데이트 버전과 패치가 정기적으로 제공됩니다.               |
| Long-term \(LTS\) | 12 개월 | [심각한 버그 수정이나 보안 패치](#lts-fixes)만 제공됩니다. |


<!--
### Actively supported versions
-->
### 활성화 상태의 버전

<!--
The following table provides the status for Angular versions under support.

| Version | Status | Released   | Active ends | LTS ends   |
|:---     |:---    |:---        |:---         |:---        |
| ^14.0.0 | Active | 2022-06-02 | 2022-12-02  | 2023-12-02 |
| ^13.0.0 | LTS    | 2021-11-04 | 2022-06-02  | 2023-05-04 |

Angular versions v2 to v12 are no longer under support.
-->
현재 지원되고 있는 Angular 버전은 이렇습니다.

| 버전      | 상태     | 릴리즈 일자     | Active 지원 종료 | LTS 지원 종료  |
|:--------|:-------|:-----------|:-------------|:-----------|
| ^14.0.0 | Active | 2022-06-02 | 2022-12-02   | 2023-12-02 |
| ^13.0.0 | LTS    | 2021-11-04 | 2022-06-02   | 2023-05-04 |

Angular v2 버전부터 v12 버전은 지원이 중단되었습니다.


<a id="lts-fixes"></a>

<!--
### LTS fixes
-->
### LTS 패치

<!--
As a general rule, a fix is considered for an LTS version if it resolves one of:

*   A newly identified security vulnerability,
*   A regression, since the start of LTS, caused by a 3rd party change, such as a new browser version.
-->
일반적으로 LTS 패치는 이런 경우에 제공됩니다:

*   보안 취약점이 발견되었을 때
*   LTS 지원이 시작된 이후 서드 파티 변경사항\(ex. 새 브라우저 버전 배포\)을 반영해야 할 때

<a id="deprecation"></a>
<a id="deprecation-practices"></a>

<!--
## Deprecation practices
-->
## 지원이 중단되는 기능

<!--
Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary to innovate and stay current with new best practices, changing dependencies, or changes in the \(web\) platform itself.

To make these transitions as straightforward as possible, we make these commitments to you:

*   We work hard to minimize the number of breaking changes and to provide migration tools when possible
*   We follow the deprecation policy described here, so you have time to update your applications to the latest APIs and best practices

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

| Deprecation stages | Details |
|:---                |:---     |
| Announcement       | We announce deprecated APIs and features in the [change log](https://github.com/angular/angular/blob/main/CHANGELOG.md "Angular change log"). Deprecated APIs appear in the [documentation](api?status=deprecated) with ~~strikethrough~~. When we announce a deprecation, we also announce a recommended update path. For convenience, [Deprecations](guide/deprecations) contains a summary of deprecated APIs and features.                            |
| Deprecation period | When an API or a feature is deprecated, it is still present in the next two major releases. After that, deprecated APIs and features are candidates for removal. A deprecation can be announced in any release, but the removal of a deprecated API or feature happens only in major release. Until a deprecated API or feature is removed, it is maintained according to the LTS support policy, meaning that only critical and security issues are fixed. |
| npm dependencies   | We only make npm dependency updates that require changes to your applications in a major release. In minor releases, we update peer dependencies by expanding the supported versions, but we do not require projects to update these dependencies until a future major version. This means that during minor Angular releases, npm dependency updates within Angular applications and libraries are optional.                                               |
-->
API 사용방법이나 기능이 크게 변하는\(breaking changes\) 릴리즈를 사용하려면 코드를 수정하거나, 의존성 패키지를 변경해야 할 수도 있고, 플랫폼 자체를 바꿔야 할 수도 있습니다.

이런 변화는 의외로 쉽게 발생할 수 있지만 이 경우에 몇 가지는 약속합니다:

*   Angular 팀은 큰 변화를 최소화하기 위해 노력하고 있습니다. 되도록이면 마이그레이션 툴을 제공하겠습니다.
*   지원이 중단되는 기능에 대해서는 사전에 미리 안내하겠습니다. 최신 API를 사용해서 효율적인 코드로 변경할 수 있는 시간을 충분히 제공하겠습니다.

이 두가지를 약속하려면 업데이트에 필요한 시간이 충분히 제공되어야 하고 이후 버전이 어떻게 변경되는지 명확하게 안내해야 합니다.
그래서 우리는 다음과 같은 정책을 마련했습니다:

| 지원 중단 단계 | 설명                                                                                                                                                                                                                                                                                           |
|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 공지       | 사용이 중단되는 기능은 [체인지 로그](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")에 안내하겠습니다. 사용이 중단되는 기능은 [문서](api?status=deprecated)에 ~~취소선~~ 으로 표시하겠습니다. 그리고 이 기능들에 대해서는 업데이트할 수 있는 방법도 안내하겠습니다. 사용이 중단되는 기능은 [Deprecations](guide/deprecations) 문서에 요약된 내용으로도 제공됩니다. |
| 지원 중단 기간 | 사용이 중단되는 API는 최소한 2개 메이저 릴리즈동안 유지하겠습니다. 사용이 중단되는 API나 기능이 지정되는 것은 어떤 릴리즈라도 상관없지만, 이 기능이 실제로 제거되는 것은 메이저 릴리즈에만 적용하겠습니다. 그리고 이렇게 중단된 API와 기능이라도 LTS 정책을 따르기 때문에, 심각한 결함이나 보안 이슈가 있으면 수정될 수 있습니다.                                                                                               |
| npm 의존성  | npm 패키지 버전이 변경되는 것은 메이저 릴리즈가 변경되면서 꼭 필요할 때만 반영하겠습니다. 마이너 버전이 릴리즈되면서 npm 패키지 버전이 변경되더라도 이것은 지원하는 버전을 더 다양하게 하기 위한 것입니다. 다음 메이저 버전이 있기 전까지는 npm 패키지 버전을 변경하지 않아도 됩니다.                                                                                                                          |


<a id="public-api"></a>

<!--
## Public API surface
-->
## 퍼블릭 API 진입점

<!--
Angular is a collection of many packages, subprojects, and tools.
To prevent accidental use of private APIs and so that you can clearly understand what is covered by the practices described here &mdash; we document what is and is not considered our public API surface.
For details, see [Supported Public API Surface of Angular](https://github.com/angular/angular/blob/main/docs/PUBLIC_API.md "Supported Public API Surface of Angular").

Any changes to the public API surface are done using the versioning, support, and depreciation policies previously described.
-->
Angular는 수많은 패키지와 서브 프로젝트, 툴의 집합체입니다.
갑작스럽게 아무도 모르는 API가 사용되는 것을 방지하기 위해 퍼블릭 API로 제공되는 목록을 문서화하고 있습니다.
자세한 내용은 [Supported Public API Surface of Angular](https://github.com/angular/angular/blob/main/docs/PUBLIC_API.md "Supported Public API Surface of Angular") 문서를 참고하세요.

퍼블릭 API 진입점이 변경되는 과정은 이 문서에서 설명한 버전 정책, 지원 정책, 지원 중단 정책을 그대로 따릅니다.


<a id="developer-preview"></a>

<!--
## Developer Preview
-->
## 개발자 프리뷰 \(Developer Preview\)

<!--
Occasionally we introduce new APIs under the label of "Developer Preview". These are APIs that are fully functional and polished, but that we are not ready to stabilize under our normal deprecation policy.

This may be because we want to gather feedback from real applications before stabilization, or because the associated documentation or migration tooling is not fully complete.

The policies and practices that are described in this document do not apply to APIs marked as Developer Preview. Such APIs can change at any time, even in new patch versions of the framework. Teams should decide for themselves whether the benefits of using Developer Preview APIs are worth the risk of breaking changes outside of our normal use of semantic versioning.
-->
때로는 새로 추가되는 API에 "Developer Preview" 라는 설명이 붙을 때가 있습니다.
이 API들은 기능 개발이 완료되었지만 일반적인 지원 중단 정책으로는 관리되지 않는 기능입니다.

이 기능들은 실제로 애플리케이션을 개발해 본 뒤에만 알 수 있는 피드백을 반영하기 위해 잠시 대기중이거나, 문서화가 덜 되었거나 마이그레이션 툴이 작업중인 경우일 수 있습니다.

개발자 프리뷰가 붙은 기능들은 이 문섯에서 설명한 지원 중단 정책의 영향을 받지 않습니다.
그래서 패치 버전이 변경될 때에도 API 사용방법이 변경될 수 있습니다.
Angular 팀은 이런 위험부담에도 불구하고 도입할 필요가 있을 때만 개발자 프리뷰를 제공하겠습니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-11-14
