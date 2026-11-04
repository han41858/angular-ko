<!--
# Overview of Angular libraries
-->

<a id="overview-of-angular-libraries"></a>

# Angular 라이브러리

<!--
Many applications need to solve the same general problems, such as presenting a unified user interface, presenting data, and allowing data entry.
Developers can create general solutions for particular domains that can be adapted for re-use in different applications.
Such a solution can be built as Angular _libraries_ and these libraries can be published and shared as _npm packages_.

An Angular library is an Angular project that differs from an application in that it cannot run on its own.
A library must be imported and used in an application.

Libraries extend Angular's base features.
For example, to add [reactive forms](guide/forms/reactive-forms) to an application, add the library package using `ng add @angular/forms`, then import the `ReactiveFormsModule` from the `@angular/forms` library in your application code.
Similarly, adding the [service worker](ecosystem/service-workers) library to an Angular application is one of the steps for turning an application into a [Progressive Web App](https://developers.google.com/web/progressive-web-apps) \(PWA\).
[Angular Material](https://material.angular.dev) is an example of a large, general-purpose library that provides sophisticated, reusable, and adaptable UI components.

Any application developer can use these and other libraries that have been published as npm packages by the Angular team or by third parties.
See [Using Published Libraries](tools/libraries/using-libraries).

HELPFUL: Libraries are intended to be used by Angular applications. To add Angular features to non-Angular web applications, use [Angular custom elements](guide/elements).
-->

많은 애플리케이션은 일관된 사용자 인터페이스 제공, 데이터 표시, 데이터 입력 같은 공통 문제를 해결해야 합니다.
개발자는 특정 분야의 범용 해결책을 만들어 여러 애플리케이션에서 재사용할 수 있습니다.
이러한 해결책을 Angular _라이브러리_ 로 만들면 _npm 패키지_ 로 배포하고 공유할 수 있습니다.

Angular 라이브러리는 Angular 프로젝트이지만, 애플리케이션과 달리 독립적으로 실행할 수 없습니다.
라이브러리는 애플리케이션으로 불러와서 사용해야 합니다.

라이브러리는 Angular의 기본 기능을 확장합니다.
예를 들어 애플리케이션에 [반응형 폼](guide/forms/reactive-forms)을 추가하려면 `ng add @angular/forms`로 라이브러리 패키지를 추가한 뒤 애플리케이션 코드에서 `@angular/forms` 라이브러리의 `ReactiveFormsModule`을 불러오면 됩니다.
마찬가지로 Angular 애플리케이션에 [서비스 워커](ecosystem/service-workers) 라이브러리를 추가하는 것은 애플리케이션을 [프로그레시브 웹 앱](https://developers.google.com/web/progressive-web-apps) \(PWA\)으로 만드는 단계 중 하나입니다.
[Angular Material](https://material.angular.dev)은 정교하면서도 재사용하고 조정할 수 있는 UI 컴포넌트를 제공하는 대규모 범용 라이브러리의 예입니다.

애플리케이션 개발자라면 누구나 Angular 팀이나 서드 파티가 npm 패키지로 배포한 라이브러리를 사용할 수 있습니다.
[배포된 라이브러리 사용하기](tools/libraries/using-libraries)를 참고하세요.

도움말: 라이브러리는 Angular 애플리케이션에서 사용하도록 만들어집니다.
Angular로 만들지 않은 웹 애플리케이션에 Angular 기능을 추가하려면 [Angular 커스텀 엘리먼트](guide/elements)를 사용하세요.

<!--
## Creating libraries
-->

<a id="creating-libraries"></a>

## 라이브러리 만들기

<!--
If you have developed features that are suitable for reuse, you can create your own libraries.
These libraries can be used locally in your workspace, or you can publish them as [npm packages](reference/configs/npm-packages) to share with other projects or other Angular developers.
These packages can be published to the npm registry, a private npm Enterprise registry, or a private package management system that supports npm packages.
See [Creating Libraries](tools/libraries/creating-libraries).

Deciding to package features as a library is an architectural decision. It is comparable to deciding whether a feature is a component or a service, or deciding on the scope of a component.

Packaging features as a library forces the artifacts in the library to be decoupled from the application's business logic.
This can help to avoid various bad practices or architecture mistakes that can make it difficult to decouple and reuse code in the future.

Putting code into a separate library is more complex than simply putting everything in one application.
It requires more of an investment in time and thought for managing, maintaining, and updating the library.
This complexity can pay off when the library is being used in multiple applications.
-->

재사용하기에 적합한 기능을 개발했다면 자신만의 라이브러리를 만들 수 있습니다.
이러한 라이브러리는 워크스페이스 안에서 로컬로 사용하거나, [npm 패키지](reference/configs/npm-packages)로 배포해서 다른 프로젝트나 Angular 개발자와 공유할 수 있습니다.
패키지는 npm 레지스트리, 비공개 npm Enterprise 레지스트리, npm 패키지를 지원하는 비공개 패키지 관리 시스템에 배포할 수 있습니다.
[라이브러리 만들기](tools/libraries/creating-libraries)를 참고하세요.

기능을 라이브러리로 묶을지는 아키텍처 차원의 결정입니다.
기능을 컴포넌트로 만들지 서비스로 만들지 정하거나, 컴포넌트의 범위를 정하는 것과 비슷합니다.

기능을 라이브러리로 묶으면 라이브러리 구성 요소를 애플리케이션의 비즈니스 로직과 분리해야 합니다.
이를 통해 나중에 코드를 분리하고 재사용하기 어렵게 만드는 여러 나쁜 관행이나 아키텍처 실수를 피할 수 있습니다.

코드를 별도 라이브러리에 넣는 것은 모든 코드를 하나의 애플리케이션에 넣는 것보다 복잡합니다.
라이브러리를 관리, 유지보수, 업데이트하려면 시간과 고민을 더 투자해야 합니다.
여러 애플리케이션에서 라이브러리를 사용한다면 이러한 복잡성을 감수한 보람이 있습니다.
