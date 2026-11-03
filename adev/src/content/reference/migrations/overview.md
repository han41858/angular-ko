<!--
# Migrations
-->

<a id="migrations"></a>

# 마이그레이션

<!--
Learn about how you can migrate your existing angular project to the latest features incrementally.
-->

기존 Angular 프로젝트를 점진적으로 마이그레이션하여 최신 기능을 도입하는 방법을 알아보세요.

<docs-card-container>

<!--
  <docs-card title="Standalone" link="Migrate now" href="reference/migrations/standalone">
    Standalone components provide a simplified way to build Angular applications. Standalone components specify their dependencies directly instead of getting them through NgModules.
  </docs-card>
-->

  <docs-card title="독립형" link="지금 마이그레이션하기" href="reference/migrations/standalone">
    독립형 컴포넌트는 Angular 애플리케이션을 더 간단하게 만드는 방법을 제공합니다. NgModule을 통해 의존성을 받는 대신 컴포넌트에서 직접 의존성을 지정합니다.
  </docs-card>

<!--
  <docs-card title="Control Flow Syntax" link="Migrate now" href="reference/migrations/control-flow">
    Built-in Control Flow Syntax allows you to use more ergonomic syntax which is close to JavaScript and has better type checking. It replaces the need to import `CommonModule` to use functionality like `*ngFor`, `*ngIf` and `*ngSwitch`.
  </docs-card>
-->

  <docs-card title="흐름 제어 문법" link="지금 마이그레이션하기" href="reference/migrations/control-flow">
    내장 흐름 제어 문법은 JavaScript와 비슷한 더 편리한 문법과 개선된 타입 검사를 제공합니다. `*ngFor`, `*ngIf`, `*ngSwitch` 같은 기능을 사용하기 위해 `CommonModule`을 임포트할 필요가 없습니다.
  </docs-card>

<!--
  <docs-card title="inject() Function" link="Migrate now" href="reference/migrations/inject-function">
    Angular's [`inject`](/api/core/inject) function offers more accurate types and better compatibility with standard decorators, compared to constructor-based injection.
  </docs-card>
-->

  <docs-card title="inject() 함수" link="지금 마이그레이션하기" href="reference/migrations/inject-function">
    Angular의 [`inject`](/api/core/inject) 함수는 생성자 기반 주입보다 더 정확한 타입과 표준 데코레이터와의 더 나은 호환성을 제공합니다.
  </docs-card>

<!--
  <docs-card title="Lazy-loaded routes" link="Migrate now" href="reference/migrations/route-lazy-loading">
    Convert eagerly loaded component routes to lazy loaded ones. This allows the build process to split production bundles into smaller chunks, to load less JavaScript at initial page load.
  </docs-card>
-->

  <docs-card title="지연 로딩 라우팅 규칙" link="지금 마이그레이션하기" href="reference/migrations/route-lazy-loading">
    즉시 로딩되는 컴포넌트의 라우팅 규칙을 지연 로딩 방식으로 변환합니다. 빌드 과정에서 프로덕션 번들을 더 작은 청크로 나누어 초기 페이지 로딩 시 불러오는 JavaScript의 양을 줄일 수 있습니다.
  </docs-card>

<!--
  <docs-card title="New `input()` API" link="Migrate now" href="reference/migrations/signal-inputs">
    Convert existing `@Input` fields to the new signal input API that is now production ready.
  </docs-card>
-->

  <docs-card title="새로운 `input()` API" link="지금 마이그레이션하기" href="reference/migrations/signal-inputs">
    기존 `@Input` 필드를 이제 프로덕션 환경에서 안정적으로 사용할 수 있는 새로운 시그널 입력 API로 변환합니다.
  </docs-card>

<!--
  <docs-card title="New `output()` function" link="Migrate now" href="reference/migrations/outputs">
    Convert existing `@Output` custom events to the new output function that is now production ready.
  </docs-card>
-->

  <docs-card title="새로운 `output()` 함수" link="지금 마이그레이션하기" href="reference/migrations/outputs">
    기존 `@Output` 사용자 정의 이벤트를 이제 프로덕션 환경에서 안정적으로 사용할 수 있는 새로운 output 함수로 변환합니다.
  </docs-card>

<!--
  <docs-card title="Queries as signal" link="Migrate now" href="reference/migrations/signal-queries">
    Convert existing decorator query fields to the improved signal queries API. The API is now production ready.
  </docs-card>
-->

  <docs-card title="시그널 기반 쿼리" link="지금 마이그레이션하기" href="reference/migrations/signal-queries">
    기존 데코레이터 쿼리 필드를 개선된 시그널 쿼리 API로 변환합니다. 이 API는 이제 프로덕션 환경에서 안정적으로 사용할 수 있습니다.
  </docs-card>

<!--
  <docs-card title="Cleanup unused imports" link="Try it now" href="reference/migrations/cleanup-unused-imports">
    Clean up unused imports in your project.
  </docs-card>
-->

  <docs-card title="사용하지 않는 임포트 정리" link="지금 실행하기" href="reference/migrations/cleanup-unused-imports">
    프로젝트에서 사용하지 않는 임포트를 정리합니다.
  </docs-card>

<!--
  <docs-card title="Self-closing tags" link="Migrate now" href="reference/migrations/self-closing-tags">
    Convert component templates to use self-closing tags where possible.
  </docs-card>
-->

  <docs-card title="자체 닫기 태그" link="지금 마이그레이션하기" href="reference/migrations/self-closing-tags">
    가능한 경우 자체 닫기 태그를 사용하도록 컴포넌트 템플릿을 변환합니다.
  </docs-card>

<!--
  <docs-card title="NgClass to Class Bindings" link="Migrate now" href="reference/migrations/ngclass-to-class">
      Convert component templates to prefer class bindings over the `NgClass` directives when possible.
  </docs-card>
-->

  <docs-card title="NgClass를 클래스 바인딩으로 변환" link="지금 마이그레이션하기" href="reference/migrations/ngclass-to-class">
    가능한 경우 `NgClass` 디렉티브 대신 클래스 바인딩을 사용하도록 컴포넌트 템플릿을 변환합니다.
  </docs-card>

<!--
  <docs-card title="NgStyle to Style Bindings" link="Migrate now" href="reference/migrations/ngstyle-to-style">
      Convert component templates to prefer style bindings over the `NgStyle` directives when possible.
  </docs-card>
-->

  <docs-card title="NgStyle을 스타일 바인딩으로 변환" link="지금 마이그레이션하기" href="reference/migrations/ngstyle-to-style">
    가능한 경우 `NgStyle` 디렉티브 대신 스타일 바인딩을 사용하도록 컴포넌트 템플릿을 변환합니다.
  </docs-card>

<!--
  <docs-card title="RouterTestingModule migration" link="Migrate now" href="reference/migrations/router-testing-module-migration">
    Convert `RouterTestingModule` usages to `RouterModule` in TestBed configurations and add `provideLocationMocks()` when appropriate.
  </docs-card>
-->

  <docs-card title="RouterTestingModule 마이그레이션" link="지금 마이그레이션하기" href="reference/migrations/router-testing-module-migration">
    TestBed 설정에서 `RouterTestingModule` 사용을 `RouterModule`로 변환하고 필요한 경우 `provideLocationMocks()`를 추가합니다.
  </docs-card>

<!--
  <docs-card title="CommonModule to standalone imports" link="Migrate now" href="reference/migrations/common-to-standalone">
    Replace imports of the `CommonModule` with imports of the individual directives and pipes used in the templates when possible.
  </docs-card>
-->

  <docs-card title="CommonModule을 독립형 임포트로 변환" link="지금 마이그레이션하기" href="reference/migrations/common-to-standalone">
    가능한 경우 `CommonModule` 임포트를 템플릿에서 사용하는 개별 디렉티브와 파이프의 임포트로 대체합니다.
  </docs-card>

<!--
  <docs-card title="Injectable to Service" link="Migrate now" href="reference/migrations/injectable-to-service">
    Convert eligible `@Injectable` classes to the `@Service` decorator.
  </docs-card>
-->

  <docs-card title="Injectable을 Service로 변환" link="지금 마이그레이션하기" href="reference/migrations/injectable-to-service">
    변환 가능한 `@Injectable` 클래스를 `@Service` 데코레이터로 변환합니다.
  </docs-card>

</docs-card-container>
