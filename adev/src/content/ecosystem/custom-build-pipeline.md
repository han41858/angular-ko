<!--
# Custom build pipeline
-->

<a id="custom-build-pipeline"></a>

# 커스텀 빌드 파이프라인

<!--
When building an Angular app we strongly recommend you to use the Angular CLI to leverage its structure-dependent update functionality and build system abstraction. This way your projects benefit from the latest security, performance, and API improvements and transparent build improvements.

This page explores the **rare use cases** when you need a custom build pipeline that does not use the Angular CLI. All listed tools below are open source build plugins that are maintained by members of the Angular community. To learn more about their support model and maintenance status look at their documentation and GitHub repository URLs.
-->

Angular 앱을 빌드할 때는 Angular CLI를 사용하는 것을 적극 권장합니다.
Angular CLI는 프로젝트 구조를 바탕으로 업데이트하는 기능과 빌드 시스템 추상화를 제공합니다.
이 방식을 사용하면 최신 보안 개선, 성능 향상, API 개선 사항을 프로젝트에 적용할 수 있으며, 빌드 개선 사항도 별도의 작업 없이 활용할 수 있습니다.

이 문서는 Angular CLI를 사용하지 않는 커스텀 빌드 파이프라인이 필요한 **드문 사용 사례**를 살펴봅니다.
아래에 나열한 도구는 모두 Angular 커뮤니티 구성원이 관리하는 오픈 소스 빌드 플러그인입니다.
지원 방식과 유지보수 현황은 각 도구의 문서와 GitHub 저장소를 확인하세요.

<!--
## When should you use a custom build pipeline?
-->

<a id="when-should-you-use-a-custom-build-pipeline"></a>

## 커스텀 빌드 파이프라인은 언제 사용하나요?

<!--
There are some niche use cases when you may want to maintain a custom build pipeline. For example:

- You have an existing app using a different toolchain and you’d like to add Angular to it
- You’re strongly coupled to [module federation](https://module-federation.io/) and unable to adopt bundler-agnostic [native federation](https://www.npmjs.com/package/@angular-architects/native-federation)
- You’d like to create a short-lived experiment using your favorite build tool
-->

특정한 상황에서는 커스텀 빌드 파이프라인을 직접 관리하는 것이 필요할 수 있습니다.
예를 들면 다음과 같습니다:

- 다른 도구 체인을 사용하는 기존 앱에 Angular를 추가하려는 경우
- [모듈 페더레이션](https://module-federation.io/)에 크게 의존하고 있어 번들러에 종속되지 않는 [네이티브 페더레이션](https://www.npmjs.com/package/@angular-architects/native-federation)을 도입할 수 없는 경우
- 선호하는 빌드 도구로 단기간 실험하려는 경우

<!--
## What are the options?
-->

<a id="what-are-the-options"></a>

## 어떤 도구를 사용할 수 있나요?

<!--
Currently, there are two well supported community tools that enable you to create a custom build pipeline with a [Vite plugin](https://www.npmjs.com/package/@analogjs/vite-plugin-angular) and [Rspack plugin](https://www.npmjs.com/package/@nx/angular-rspack). Both of them use underlying abstractions that power the Angular CLI. They allow you to create a flexible build pipeline and require manual maintenance and no automated update experience.
-->

현재 커스텀 빌드 파이프라인을 만들 때 활용할 수 있는, 지원이 잘 이루어지는 커뮤니티 도구로 [Vite 플러그인](https://www.npmjs.com/package/@analogjs/vite-plugin-angular)과 [Rspack 플러그인](https://www.npmjs.com/package/@nx/angular-rspack)이 있습니다.
두 도구 모두 Angular CLI의 기반이 되는 추상화를 사용합니다.
유연한 빌드 파이프라인을 만들 수 있지만 직접 유지보수해야 하며, 자동 업데이트 기능은 제공하지 않습니다.

<!--
### Rspack
-->


### Rspack

<!--
Rspack is a Rust-based bundler that aims to provide compatibility with the webpack plugin ecosystem.

If your project is tightly coupled to the webpack ecosystem, heavily relying on a custom webpack configuration you can leverage Rspack to improve your build times.

You can find more about Angular Rspack on the project’s [documentation website](https://nx.dev/recipes/angular/rspack/introduction).
-->

Rspack은 webpack 플러그인 생태계와의 호환성을 목표로 하는 Rust 기반 번들러입니다.

프로젝트가 webpack 생태계와 긴밀하게 연결되어 있고 커스텀 webpack 설정에 크게 의존한다면, Rspack을 활용해서 빌드 시간을 줄일 수 있습니다.

Angular Rspack에 대한 자세한 내용은 프로젝트의 [문서 웹사이트](https://nx.dev/recipes/angular/rspack/introduction)를 확인하세요.

<!--
### Vite
-->


### Vite

<!--
Vite is a frontend build tool that aims to provide a faster and leaner development experience for modern web projects. Vite is also extensible through its plugin system that allows ecosystems to build integrations with Vite, such as Vitest for unit and browser testing, Storybook for authoring components in isolation, and more. The Angular CLI also uses Vite as its development server.

The [AnalogJS Vite plugin for Angular](https://www.npmjs.com/package/@analogjs/vite-plugin-angular) enables the adoption of Angular with a project or framework that uses or is built on top of Vite. This can consist of developing and building an Angular project with Vite directly, or adding Angular to an existing project or pipeline. One example is integrating Angular UI components into a documentation website using [Astro and Starlight](https://analogjs.org/docs/packages/astro-angular/overview).

You can learn more about AnalogJS and how to use the plugin through its [documentation page](https://analogjs.org/docs/packages/vite-plugin-angular/overview).
-->

Vite는 최신 웹 프로젝트에 더 빠르고 간결한 개발 환경을 제공하는 프론트엔드 빌드 도구입니다.
Vite는 플러그인 시스템을 통해 확장할 수 있으며, 이를 바탕으로 다양한 생태계에서 Vite와 연동할 수 있습니다.
단위 테스트와 브라우저 테스트를 위한 Vitest, 컴포넌트를 독립적으로 작성하는 Storybook 등이 그 예입니다.
Angular CLI도 개발 서버로 Vite를 사용합니다.

[Angular용 AnalogJS Vite 플러그인](https://www.npmjs.com/package/@analogjs/vite-plugin-angular)을 사용하면 Vite를 사용하거나 Vite를 기반으로 만든 프로젝트 또는 프레임워크에 Angular를 도입할 수 있습니다.
Vite로 Angular 프로젝트를 직접 개발하고 빌드하거나, 기존 프로젝트나 파이프라인에 Angular를 추가할 수 있습니다.
예를 들어 [Astro와 Starlight](https://analogjs.org/docs/packages/astro-angular/overview)를 사용하는 문서 웹사이트에 Angular UI 컴포넌트를 통합할 수 있습니다.

AnalogJS와 플러그인 사용법에 대한 자세한 내용은 [문서 페이지](https://analogjs.org/docs/packages/vite-plugin-angular/overview)를 참고하세요.
