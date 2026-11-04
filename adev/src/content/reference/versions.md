<!--
# Version compatibility
-->

<a id="version-compatibility"></a>

# 버전 호환성

<!--
The following tables describe the versions of Node.js, TypeScript, and RxJS that each version of
Angular requires.
-->

다음 표는 Angular 각 버전에 필요한 Node.js, TypeScript, RxJS 버전을 보여 줍니다.

<!--
## Actively supported versions
-->

<a id="actively-supported-versions"></a>

## 현재 지원 중인 버전

<!--
This table covers [Angular versions under active support](reference/releases#actively-supported-versions).

| Angular                        | Node.js                             | TypeScript     | RxJS               |
| ------------------------------ | ----------------------------------- | -------------- | ------------------ |
| 22.0.x                         | ^22.22.3 \|\| ^24.15.0 \|\| ^26.0.0 | >=6.0.0 <6.1.0 | ^6.5.3 \|\| ^7.4.0 |
| 21.0.x \|\| 21.1.x \|\| 21.2.x | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.9.0 <6.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 20.2.x \|\| 20.3.x             | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.8.0 <6.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 20.0.x \|\| 20.1.x             | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.8.0 <5.9.0 | ^6.5.3 \|\| ^7.4.0 |
-->

이 표는 [현재 지원 중인 Angular 버전](reference/releases#actively-supported-versions)을 다룹니다.

| Angular                        | Node.js                             | TypeScript     | RxJS               |
| ------------------------------ | ----------------------------------- | -------------- | ------------------ |
| 22.0.x                         | ^22.22.3 \|\| ^24.15.0 \|\| ^26.0.0 | >=6.0.0 <6.1.0 | ^6.5.3 \|\| ^7.4.0 |
| 21.0.x \|\| 21.1.x \|\| 21.2.x | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.9.0 <6.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 20.2.x \|\| 20.3.x             | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.8.0 <6.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 20.0.x \|\| 20.1.x             | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 | >=5.8.0 <5.9.0 | ^6.5.3 \|\| ^7.4.0 |

<!--
## Unsupported Angular versions
-->

<a id="unsupported-angular-versions"></a>

## 지원이 종료된 Angular 버전

<!--
This table covers Angular versions that are no longer under long-term support (LTS). This
information was correct when each version went out of LTS and is provided without any further
guarantees. It is listed here for historical reference.

| Angular            | Node.js                              | TypeScript     | RxJS               |
| ------------------ | ------------------------------------ | -------------- | ------------------ |
| 19.2.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.9.0 | ^6.5.3 \|\| ^7.4.0 |
| 19.1.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.8.0 | ^6.5.3 \|\| ^7.4.0 |
| 19.0.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.7.0 | ^6.5.3 \|\| ^7.4.0 |
| 18.1.x \|\| 18.2.x | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.4.0 <5.6.0 | ^6.5.3 \|\| ^7.4.0 |
| 18.0.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.4.0 <5.5.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.3.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.5.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.1.x \|\| 17.2.x | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.4.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.0.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.3.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.1.x \|\| 16.2.x | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.2.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.0.x             | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.1.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.1.x \|\| 15.2.x | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | >=4.8.2 <5.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.0.x             | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | ~4.8.2         | ^6.5.3 \|\| ^7.4.0 |
| 14.2.x \|\| 14.3.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.9.0 | ^6.5.3 \|\| ^7.4.0 |
| 14.0.x \|\| 14.1.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.8.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.3.x \|\| 13.4.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.7.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.1.x \|\| 13.2.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.6.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.0.x             | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | ~4.4.3         | ^6.5.3 \|\| ^7.4.0 |
| 12.2.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3 \|\| ^7.0.0 |
| 12.1.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3             |
| 12.0.x             | ^12.14.0 \|\| ^14.15.0               | ~4.2.3         | ^6.5.3             |
| 11.2.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.1.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.0.x             | ^10.13.0 \|\| ^12.11.0               | ~4.0.0         | ^6.5.3             |
| 10.2.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.1.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.0.x             | ^10.13.0 \|\| ^12.11.0               | ~3.9.0         | ^6.5.3             |
| 9.1.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.9.0 | ^6.5.3             |
| 9.0.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.8.0 | ^6.5.3             |
-->

이 표는 장기 지원(LTS)이 종료된 Angular 버전을 다룹니다. 이 정보는 각 버전의 LTS가 종료된 시점에는 정확했지만, 그 이후의 정확성은 보장하지 않습니다. 과거 이력을 참고할 수 있도록 제공합니다.

| Angular            | Node.js                              | TypeScript     | RxJS               |
| ------------------ | ------------------------------------ | -------------- | ------------------ |
| 19.2.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.9.0 | ^6.5.3 \|\| ^7.4.0 |
| 19.1.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.8.0 | ^6.5.3 \|\| ^7.4.0 |
| 19.0.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.5.0 <5.7.0 | ^6.5.3 \|\| ^7.4.0 |
| 18.1.x \|\| 18.2.x | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.4.0 <5.6.0 | ^6.5.3 \|\| ^7.4.0 |
| 18.0.x             | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0  | >=5.4.0 <5.5.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.3.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.5.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.1.x \|\| 17.2.x | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.4.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.0.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.3.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.1.x \|\| 16.2.x | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.2.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.0.x             | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.1.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.1.x \|\| 15.2.x | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | >=4.8.2 <5.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.0.x             | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | ~4.8.2         | ^6.5.3 \|\| ^7.4.0 |
| 14.2.x \|\| 14.3.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.9.0 | ^6.5.3 \|\| ^7.4.0 |
| 14.0.x \|\| 14.1.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.8.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.3.x \|\| 13.4.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.7.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.1.x \|\| 13.2.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.6.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.0.x             | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | ~4.4.3         | ^6.5.3 \|\| ^7.4.0 |
| 12.2.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3 \|\| ^7.0.0 |
| 12.1.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3             |
| 12.0.x             | ^12.14.0 \|\| ^14.15.0               | ~4.2.3         | ^6.5.3             |
| 11.2.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.1.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.0.x             | ^10.13.0 \|\| ^12.11.0               | ~4.0.0         | ^6.5.3             |
| 10.2.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.1.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.0.x             | ^10.13.0 \|\| ^12.11.0               | ~3.9.0         | ^6.5.3             |
| 9.1.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.9.0 | ^6.5.3             |
| 9.0.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.8.0 | ^6.5.3             |

<!--
### Before v9
-->

<a id="before-v9"></a>

### v9 이전

<!--
Until Angular v9, Angular and Angular CLI versions were not synced.

| Angular                     | Angular CLI                 | Node.js             | TypeScript     | RxJS   |
| --------------------------- | --------------------------- | ------------------- | -------------- | ------ |
| 8.2.x                       | 8.2.x \|\| 8.3.x            | ^10.9.0             | >=3.4.2 <3.6.0 | ^6.4.0 |
| 8.0.x \|\| 8.1.x            | 8.0.x \|\| 8.1.x            | ^10.9.0             | ~3.4.2         | ^6.4.0 |
| 7.2.x                       | 7.2.x \|\| 7.3.x            | ^8.9.0 \|\| ^10.9.0 | >=3.1.3 <3.3.0 | ^6.0.0 |
| 7.0.x \|\| 7.1.x            | 7.0.x \|\| 7.1.x            | ^8.9.0 \|\| ^10.9.0 | ~3.1.3         | ^6.0.0 |
| 6.1.x                       | 6.1.x \|\| 6.2.x            | ^8.9.0              | >=2.7.2 <3.0.0 | ^6.0.0 |
| 6.0.x                       | 6.0.x                       | ^8.9.0              | ~2.7.2         | ^6.0.0 |
| 5.2.x                       | 1.6.x \|\| 1.7.x            | ^6.9.0 \|\| ^8.9.0  | >=2.4.2 <2.7.0 | ^5.5.0 |
| 5.0.x \|\| 5.1.x            | 1.5.x                       | ^6.9.0 \|\| ^8.9.0  | ~2.4.2         | ^5.5.0 |
| 4.2.x \|\| 4.3.x \|\| 4.4.x | 1.4.x                       | ^6.9.0 \|\| ^8.9.0  | >=2.1.6 <2.5.0 | ^5.0.1 |
| 4.2.x \|\| 4.3.x \|\| 4.4.x | 1.3.x                       | ^6.9.0              | >=2.1.6 <2.5.0 | ^5.0.1 |
| 4.0.x \|\| 4.1.x            | 1.0.x \|\| 1.1.x \|\| 1.2.x | ^6.9.0              | >=2.1.6 <2.4.0 | ^5.0.1 |
| 2.x                         | -                           | ^6.9.0              | >=1.8.0 <2.2.0 | ^5.0.1 |
-->

Angular v9 이전에는 Angular와 Angular CLI의 버전이 서로 일치하지 않았습니다.

| Angular                     | Angular CLI                 | Node.js             | TypeScript     | RxJS   |
| --------------------------- | --------------------------- | ------------------- | -------------- | ------ |
| 8.2.x                       | 8.2.x \|\| 8.3.x            | ^10.9.0             | >=3.4.2 <3.6.0 | ^6.4.0 |
| 8.0.x \|\| 8.1.x            | 8.0.x \|\| 8.1.x            | ^10.9.0             | ~3.4.2         | ^6.4.0 |
| 7.2.x                       | 7.2.x \|\| 7.3.x            | ^8.9.0 \|\| ^10.9.0 | >=3.1.3 <3.3.0 | ^6.0.0 |
| 7.0.x \|\| 7.1.x            | 7.0.x \|\| 7.1.x            | ^8.9.0 \|\| ^10.9.0 | ~3.1.3         | ^6.0.0 |
| 6.1.x                       | 6.1.x \|\| 6.2.x            | ^8.9.0              | >=2.7.2 <3.0.0 | ^6.0.0 |
| 6.0.x                       | 6.0.x                       | ^8.9.0              | ~2.7.2         | ^6.0.0 |
| 5.2.x                       | 1.6.x \|\| 1.7.x            | ^6.9.0 \|\| ^8.9.0  | >=2.4.2 <2.7.0 | ^5.5.0 |
| 5.0.x \|\| 5.1.x            | 1.5.x                       | ^6.9.0 \|\| ^8.9.0  | ~2.4.2         | ^5.5.0 |
| 4.2.x \|\| 4.3.x \|\| 4.4.x | 1.4.x                       | ^6.9.0 \|\| ^8.9.0  | >=2.1.6 <2.5.0 | ^5.0.1 |
| 4.2.x \|\| 4.3.x \|\| 4.4.x | 1.3.x                       | ^6.9.0              | >=2.1.6 <2.5.0 | ^5.0.1 |
| 4.0.x \|\| 4.1.x            | 1.0.x \|\| 1.1.x \|\| 1.2.x | ^6.9.0              | >=2.1.6 <2.4.0 | ^5.0.1 |
| 2.x                         | -                           | ^6.9.0              | >=1.8.0 <2.2.0 | ^5.0.1 |

<!--
## Browser support
-->

<a id="browser-support"></a>

## 브라우저 지원

<!--
Angular uses the ["widely available" Baseline](https://web.dev/baseline) to define browser
support. For each major version, Angular supports browsers included in the Baseline of a
chosen date near the release date for that major.

The "widely available" Baseline includes browsers released less than 30 months (2.5 years)
of the chosen date within Baseline's core browser set (Chrome, Edge, Firefox, Safari) and
targets supporting approximately 95% of web users.

| Angular | Baseline Date | Browser Set                 |
| ------- | ------------- | --------------------------- |
| v22     | 2026-05-07    | [Browser Set][browsers-v22] |
| v21     | 2025-10-20    | [Browser Set][browsers-v21] |
| v20     | 2025-04-30    | [Browser Set][browsers-v20] |

[browsers-v22]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2026-05-07&includeDownstream=false
[browsers-v21]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2025-10-20&includeDownstream=false
[browsers-v20]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2025-04-30&includeDownstream=false

Angular versions prior to v20 support the following specific browser versions:

| Browser | Supported versions                          |
| :------ | :------------------------------------------ |
| Chrome  | 2 most recent versions                      |
| Firefox | latest and extended support release \(ESR\) |
| Edge    | 2 most recent major versions                |
| Safari  | 2 most recent major versions                |
| iOS     | 2 most recent major versions                |
| Android | 2 most recent major versions                |
-->

Angular는 ["널리 사용 가능(widely available)" Baseline](https://web.dev/baseline)을 기준으로 브라우저 지원 범위를 정합니다. 각 메이저 버전에서는 해당 메이저 버전의 릴리즈 날짜와 가까운 기준일을 선택하고, 그 날짜의 Baseline에 포함되는 브라우저를 지원합니다.

"널리 사용 가능" Baseline에는 Baseline의 핵심 브라우저 모음(Chrome, Edge, Firefox, Safari) 가운데 선택한 기준일로부터 30개월(2.5년) 이내에 출시된 브라우저가 포함되며, 웹 사용자 약 95%를 지원하는 것을 목표로 합니다.

| Angular | Baseline 기준일 | 브라우저 모음                 |
| ------- | --------------- | ----------------------------- |
| v22     | 2026-05-07      | [브라우저 모음][browsers-v22] |
| v21     | 2025-10-20      | [브라우저 모음][browsers-v21] |
| v20     | 2025-04-30      | [브라우저 모음][browsers-v20] |

[browsers-v22]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2026-05-07&includeDownstream=false
[browsers-v21]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2025-10-20&includeDownstream=false
[browsers-v20]: https://web-platform-dx.github.io/supported-browsers/?widelyAvailableOnDate=2025-04-30&includeDownstream=false

v20 이전의 Angular 버전은 다음 브라우저 버전을 지원합니다.

| 브라우저 | 지원 버전                          |
| :------- | :--------------------------------- |
| Chrome   | 최신 버전 2개                      |
| Firefox  | 최신 버전 및 확장 지원 릴리즈(ESR) |
| Edge     | 최신 메이저 버전 2개               |
| Safari   | 최신 메이저 버전 2개               |
| iOS      | 최신 메이저 버전 2개               |
| Android  | 최신 메이저 버전 2개               |

<!--
## Polyfills
-->

<a id="polyfills"></a>

## 폴리필

<!--
Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.
You compensate by loading polyfill scripts \("polyfills"\) for the browsers that you must support.
See instructions on how to include polyfills into your project below.

IMPORTANT: The suggested polyfills are the ones that run full Angular applications.
You might need additional polyfills to support features not covered by this list.

HELPFUL: Polyfills cannot magically transform an old, slow browser into a modern, fast one.
-->

Angular는 웹 플랫폼의 최신 표준을 바탕으로 만들어졌습니다.
다양한 브라우저가 최신 브라우저의 모든 기능을 지원하지는 않으므로 이처럼 폭넓은 브라우저를 대상으로 하는 일은 쉽지 않습니다.
지원해야 하는 브라우저에 맞는 폴리필 스크립트("폴리필")를 불러와 부족한 기능을 보완할 수 있습니다.
프로젝트에 폴리필을 포함하는 방법은 아래를 참고하세요.

IMPORTANT: 여기서 제안하는 폴리필은 Angular 애플리케이션 전체를 실행하는 데 필요한 것입니다.
이 목록에서 다루지 않는 기능을 지원하려면 추가 폴리필이 필요할 수 있습니다.

HELPFUL: 폴리필이 오래되고 느린 브라우저를 최신의 빠른 브라우저로 바꿔 주지는 않습니다.

<!--
## Enabling polyfills with CLI projects
-->

<a id="enabling-polyfills-with-cli-projects"></a>

## CLI 프로젝트에서 폴리필 활성화하기

<!--
The [Angular CLI](tools/cli) provides support for polyfills.
If you are not using the CLI to create your projects, see [Polyfill instructions for non-CLI users](#polyfills-for-non-cli-users).

The `polyfills` options of the [browser and test builder](tools/cli/cli-builder) can be a full path for a file \(Example: `src/polyfills.ts`\) or,
relative to the current workspace or module specifier \(Example: `zone.js`\).

If you create a TypeScript file, make sure to include it in the `files` property of your `tsconfig` file.

```json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ]
  ...
}
```
-->

[Angular CLI](tools/cli)는 폴리필을 지원합니다.
CLI를 사용하지 않고 프로젝트를 생성한다면 [CLI를 사용하지 않는 경우의 폴리필 안내](#polyfills-for-non-cli-users)를 참고하세요.

[브라우저 및 테스트 빌더](tools/cli/cli-builder)의 `polyfills` 옵션에는 파일의 전체 경로(예: `src/polyfills.ts`), 현재 워크스페이스를 기준으로 한 상대 경로, 또는 모듈 지정자(예: `zone.js`)를 사용할 수 있습니다.

TypeScript 파일을 생성한다면 `tsconfig` 파일의 `files` 프로퍼티에 반드시 포함하세요.

```json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ]
  ...
}
```

<!--
## Polyfills for non-CLI users
-->

<a id="polyfills-for-non-cli-users"></a>

## CLI를 사용하지 않는 경우의 폴리필

<!--
If you are not using the CLI, add your polyfill scripts directly to the host web page \(`index.html`\).

For example:

<docs-code header="src/index.html" language="html">
-->

<!-- pre-zone polyfills -->

<!--
<script src="node_modules/core-js/client/shim.min.js"></script>
<script>
  /**
   * you can configure some zone flags which can disable zone interception for some
   * asynchronous activities to improve startup performance - use these options only
   * if you know what you are doing as it could result in hard to trace down bugs.
   */
  // __Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
  // __Zone_disable_on_property = true; // disable patch onProperty such as onclick
  // __zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
  /*
   * in Edge developer tools, the addEventListener will also be wrapped by zone.js
   * with the following flag, it will bypass `zone.js` patch for Edge.
   */
  // __Zone_enable_cross_context_check = true;
</script>
-->

<!-- zone.js required by Angular -->

<!--
<script src="node_modules/zone.js/bundles/zone.umd.js"></script>
-->

<!-- application polyfills -->

<!--
</docs-code>
-->

CLI를 사용하지 않는다면 호스트 웹 페이지(`index.html`)에 폴리필 스크립트를 직접 추가하세요.

예를 들면 다음과 같습니다.

<docs-code header="src/index.html" language="html">
<!-- zone 이전에 불러오는 폴리필 -->
<script src="node_modules/core-js/client/shim.min.js"></script>
<script>
  /**
   * 일부 비동기 작업에 대한 zone의 가로채기를 비활성화하는 플래그를 설정하여
   * 시작 성능을 개선할 수 있습니다. 원인을 찾기 어려운 버그가 생길 수 있으므로
   * 동작을 충분히 이해한 경우에만 이 옵션을 사용하세요.
   */
  // __Zone_disable_requestAnimationFrame = true; // requestAnimationFrame 패치 비활성화
  // __Zone_disable_on_property = true; // onclick과 같은 onProperty 패치 비활성화
  // __zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // 지정한 이벤트 이름의 패치 비활성화
  /*
   * Edge 개발자 도구에서는 addEventListener도 zone.js로 래핑됩니다.
   * 다음 플래그를 사용하면 Edge용 `zone.js` 패치를 건너뜁니다.
   */
  // __Zone_enable_cross_context_check = true;
</script>
<!-- Angular에 필요한 zone.js -->
<script src="node_modules/zone.js/bundles/zone.umd.js"></script>
<!-- 애플리케이션 폴리필 -->
</docs-code>
