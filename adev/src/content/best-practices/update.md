<!--
# Keeping your Angular projects up-to-date
-->

<a id="keeping-your-angular-projects-up-to-date"></a>

# Angular 프로젝트를 최신 상태로 유지하기

<!--
Just like Web and the entire web ecosystem, Angular is continuously improving.
Angular balances continuous improvement with a strong focus on stability and making updates straightforward.
Keeping your Angular application up-to-date enables you to take advantage of leading-edge new features, as well as optimizations and bug fixes.

This document contains information and resources to help you keep your Angular applications and libraries up-to-date.

For information about our versioning policy and practices — including support and deprecation practices, as well as the release schedule — see [Angular versioning and releases](reference/releases 'Angular versioning and releases').

HELPFUL: If you are currently using AngularJS, see [Upgrading from AngularJS](https://angular.io/guide/upgrade 'Upgrading from AngularJS').
_AngularJS_ is the name for all v1.x versions of Angular.
-->

웹과 웹 생태계 전체가 그렇듯 Angular도 지속적으로 개선되고 있습니다.
Angular는 안정성과 간편한 업데이트를 중시하면서 지속적인 개선과 균형을 맞춥니다.
Angular 애플리케이션을 최신 상태로 유지하면 최신 기능과 최적화, 버그 수정을 활용할 수 있습니다.

이 문서는 Angular 애플리케이션과 라이브러리를 최신 상태로 유지하는 데 도움이 되는 정보와 리소스를 제공합니다.

지원 및 사용 중단 권고 정책, 릴리즈 일정 등 버전 정책과 운영 방식은 [Angular 버전 관리와 릴리즈](reference/releases 'Angular 버전 관리와 릴리즈')를 참고하세요.

도움말: 현재 AngularJS를 사용하고 있다면 [AngularJS에서 업그레이드하기](https://angular.io/guide/upgrade 'AngularJS에서 업그레이드하기')를 참고하세요.
_AngularJS_ 는 Angular의 모든 v1.x 버전을 가리키는 이름입니다.

<!--
## Getting notified of new releases
-->

<a id="getting-notified-of-new-releases"></a>

## 새 릴리즈 알림 받기

<!--
To be notified when new releases are available, follow [@angular](https://x.com/angular '@angular on X') on X (formerly Twitter) or subscribe to the [Angular blog](https://blog.angular.dev 'Angular blog').
-->

새 릴리즈가 나왔을 때 알림을 받으려면 X(이전 Twitter)에서 [@angular](https://x.com/angular 'X의 @angular')를 팔로우하거나 [Angular 블로그](https://blog.angular.dev 'Angular 블로그')를 구독하세요.

<!--
## Learning about new features
-->

<a id="learning-about-new-features"></a>

## 새로운 기능 알아보기

<!--
What's new? What's changed? We share the most important things you need to know on the Angular blog in [release announcements](https://blog.angular.dev/ 'Angular blog - release announcements').

To review a complete list of changes, organized by version, see the [Angular change log](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular change log').
-->

어떤 기능이 새로 생겼고 무엇이 바뀌었을까요?
꼭 알아야 할 주요 내용은 Angular 블로그의 [릴리즈 안내](https://blog.angular.dev/ 'Angular 블로그 - 릴리즈 안내')에서 공유합니다.

버전별 전체 변경 사항은 [Angular 변경 이력](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular 변경 이력')을 참고하세요.

<!--
## Checking your version of Angular
-->

<a id="checking-your-version-of-angular"></a>

## 사용 중인 Angular 버전 확인하기

<!--
To check your application's version of Angular use the `ng version` command from within your project directory.
-->

애플리케이션의 Angular 버전을 확인하려면 프로젝트 디렉터리에서 `ng version` 명령을 실행하세요.

<!--
## Finding the current version of Angular
-->

<a id="finding-the-current-version-of-angular"></a>

## Angular 최신 버전 확인하기

<!--
The most recent stable released version of Angular appears [on npm](https://www.npmjs.com/package/@angular/core 'Angular on npm') under "Version." For example, `16.2.4`.

You can also find the most current version of Angular by using the CLI command [`ng update`](cli/update).
By default, [`ng update`](cli/update) (without additional arguments) lists the updates that are available to you.
-->

Angular의 최신 안정 버전은 [npm](https://www.npmjs.com/package/@angular/core 'npm의 Angular')의 "Version" 항목에 표시됩니다.
예를 들어 `16.2.4`와 같은 형식입니다.

CLI의 [`ng update`](cli/update) 명령으로도 Angular 최신 버전을 확인할 수 있습니다.
추가 인자 없이 [`ng update`](cli/update)를 실행하면 기본적으로 적용할 수 있는 업데이트 목록이 표시됩니다.

<!--
## Updating your environment and apps
-->

<a id="updating-your-environment-and-apps"></a>

## 개발 환경과 앱 업데이트하기

<!--
To make updating uncomplicated, we provide complete instructions in the interactive [Angular Update Guide](update-guide).

The Angular Update Guide provides customized update instructions, based on the current and target versions that you specify.
It includes basic and advanced update paths, to match the complexity of your applications.
It also includes troubleshooting information and any recommended manual changes to help you get the most out of the new release.

For simple updates, the CLI command [`ng update`](cli/update) is all you need.
Without additional arguments, [`ng update`](cli/update) lists the updates that are available to you and provides recommended steps to update your application to the most current version.

[Angular Versioning and Releases](reference/releases#angular-versioning 'Angular Release Practices, Versioning') describes the level of change that you can expect based on a release's version number.
It also describes supported update paths.
-->

업데이트를 쉽게 진행할 수 있도록 대화형 [Angular 업데이트 가이드](update-guide)에서 전체 절차를 안내합니다.

Angular 업데이트 가이드는 지정한 현재 버전과 목표 버전에 따라 맞춤형 업데이트 지침을 제공합니다.
애플리케이션의 복잡도에 맞게 기본 및 고급 업데이트 경로를 포함합니다.
새 릴리즈를 최대한 활용할 수 있도록 문제 해결 정보와 권장하는 수동 변경 사항도 안내합니다.

간단한 업데이트는 CLI의 [`ng update`](cli/update) 명령만 있으면 됩니다.
추가 인자 없이 [`ng update`](cli/update)를 실행하면 적용할 수 있는 업데이트 목록과 애플리케이션을 최신 버전으로 업데이트하는 권장 절차를 제공합니다.

[Angular 버전 관리와 릴리즈](reference/releases#angular-versioning 'Angular 릴리즈 방식과 버전 관리')에서는 릴리즈 버전 번호에 따라 어느 정도의 변경을 예상할 수 있는지 설명합니다.
지원하는 업데이트 경로도 설명합니다.

<!--
## Resource summary
-->

<a id="resource-summary"></a>

## 참고 리소스

<!--
- Release announcements:
  [Angular blog - release announcements](https://blog.angular.dev/ 'Angular blog announcements about recent releases')

- Release details:
  [Angular change log](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular change log')

- Update instructions:
  [Angular Update Guide](update-guide)

- Update command reference:
  [Angular CLI `ng update` command reference](cli/update)

- Versioning, release, support, and deprecation practices:
  [Angular versioning and releases](reference/releases 'Angular versioning and releases')
-->

- 릴리즈 안내:
  [Angular 블로그 - 릴리즈 안내](https://blog.angular.dev/ '최근 릴리즈에 관한 Angular 블로그 안내')

- 릴리즈 세부 정보:
  [Angular 변경 이력](https://github.com/angular/angular/blob/main/CHANGELOG.md 'Angular 변경 이력')

- 업데이트 지침:
  [Angular 업데이트 가이드](update-guide)

- 업데이트 명령 레퍼런스:
  [Angular CLI `ng update` 명령 레퍼런스](cli/update)

- 버전 관리, 릴리즈, 지원, 사용 중단 권고 정책:
  [Angular 버전 관리와 릴리즈](reference/releases 'Angular 버전 관리와 릴리즈')
