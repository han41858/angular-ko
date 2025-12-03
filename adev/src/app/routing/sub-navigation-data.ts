/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {isDevMode} from '@angular/core';
import {NavigationItem} from '@angular/docs';

// These 2 imports are expected to be red because they are generated a build time
import FIRST_APP_TUTORIAL_NAV_DATA from '../../../src/assets/tutorials/first-app/routes.json';
import LEARN_ANGULAR_TUTORIAL_NAV_DATA from '../../../src/assets/tutorials/learn-angular/routes.json';
import DEFERRABLE_VIEWS_TUTORIAL_NAV_DATA from '../../../src/assets/tutorials/deferrable-views/routes.json';
import SIGNALS_TUTORIAL_NAV_DATA from '../../../src/assets/tutorials/signals/routes.json';
import SIGNAL_FORMS_TUTORIAL_NAV_DATA from '../../../src/assets/tutorials/signal-forms/routes.json';
import ERRORS_NAV_DATA from '../../../src/assets/content/reference/errors/routes.json';
import EXT_DIAGNOSTICS_NAV_DATA from '../../../src/assets/content/reference/extended-diagnostics/routes.json';

import {getApiNavigationItems} from '../features/references/helpers/manifest.helper';
import {DEFAULT_PAGES} from '../core/constants/pages';

interface SubNavigationData {
  docs: NavigationItem[];
  reference: NavigationItem[];
  tutorials: NavigationItem[];
  footer: NavigationItem[];
}

const DOCS_SUB_NAVIGATION_DATA: NavigationItem[] = [
  {
    // label: 'Introduction',
    label: '소개',
    children: [
      {
        // label: 'What is Angular?',
        label: 'Angular란?',
        path: 'overview',
        contentPath: 'introduction/what-is-angular',
      },
      {
        // label: 'Installation',
        label: '설치방법',
        path: 'installation',
        contentPath: 'introduction/installation',
      },
      {
        // label: 'Essentials',
        label: '핵심 가이드',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'essentials',
            contentPath: 'introduction/essentials/overview',
          },
          {
            // label: 'Composition with components',
            label: '컴포넌트 조합하기',
            path: 'essentials/components',
            contentPath: 'introduction/essentials/components',
          },
          {
            // label: 'Reactivity with signals',
            label: '시그널 반응성',
            path: 'essentials/signals',
            contentPath: 'introduction/essentials/signals',
          },
          {
            // label: 'Dynamic interfaces with templates',
            label: '템플릿 동적 인터페이스',
            path: 'essentials/templates',
            contentPath: 'introduction/essentials/templates',
          },
          {
            // label: 'Forms with signals',
            label: '시그널 폼',
            path: 'essentials/signal-forms',
            contentPath: 'introduction/essentials/signal-forms',
            status: 'new',
          },
          {
            // label: 'Modular design with dependency injection',
            label: '의존성 주입을 활용한 모듈 디자인',
            path: 'essentials/dependency-injection',
            contentPath: 'introduction/essentials/dependency-injection',
          },
          {
            // label: 'Next Steps',
            label: '다음 단계',
            path: 'essentials/next-steps',
            contentPath: 'introduction/essentials/next-steps',
          },
        ],
      },
      {
        // label: 'Start coding! 🚀',
        label: '코딩을 해봅시다! 🚀',
        path: 'tutorials/learn-angular',
      },
    ],
  },
  {
    // label: 'In-depth Guides',
    label: '심화 가이드',
    children: [
      {
        // label: 'Signals',
        label: '시그널',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/signals',
            contentPath: 'guide/signals/overview',
          },
          {
            // label: 'Dependent state with linkedSignal',
            label: 'linkedSignal을 활용한 의존 상태 관리',
            path: 'guide/signals/linked-signal',
            contentPath: 'guide/signals/linked-signal',
          },
          {
            // label: 'Async reactivity with resources',
            label: 'Resource를 활용한 비동기 반응성',
            path: 'guide/signals/resource',
            contentPath: 'guide/signals/resource',
          },
        ],
      },
      {
        // label: 'Components',
        label: '컴포넌트',
        children: [
          {
            // label: 'Anatomy of components',
            label: '컴포넌트란?',
            path: 'guide/components',
            contentPath: 'guide/components/anatomy-of-components',
          },
          {
            // label: 'Selectors',
            label: '셀렉터',
            path: 'guide/components/selectors',
            contentPath: 'guide/components/selectors',
          },
          {
            // label: 'Styling',
            label: '스타일',
            path: 'guide/components/styling',
            contentPath: 'guide/components/styling',
          },
          {
            // label: 'Accepting data with input properties',
            label: '입력 프로퍼티로 데이터 받기',
            path: 'guide/components/inputs',
            contentPath: 'guide/components/inputs',
          },
          {
            // label: 'Custom events with outputs',
            label: '커스텀 이벤트 보내기',
            path: 'guide/components/outputs',
            contentPath: 'guide/components/outputs',
          },
          {
            // label: 'Content projection with ng-content',
            label: '컨텐츠 프로젝션: ng-content',
            path: 'guide/components/content-projection',
            contentPath: 'guide/components/content-projection',
          },
          {
            // label: 'Host elements',
            label: '호스트 엘리먼트',
            path: 'guide/components/host-elements',
            contentPath: 'guide/components/host-elements',
          },
          {
            // label: 'Lifecycle',
            label: '라이프 싸이클',
            path: 'guide/components/lifecycle',
            contentPath: 'guide/components/lifecycle',
          },
          {
            // label: 'Referencing component children with queries',
            label: '자식 컴포넌트 참조하기',
            path: 'guide/components/queries',
            contentPath: 'guide/components/queries',
          },
          {
            // label: 'Using DOM APIs',
            label: 'DOM API 활용하기',
            path: 'guide/components/dom-apis',
            contentPath: 'guide/components/dom-apis',
          },
          {
            // label: 'Inheritance',
            label: '상속',
            path: 'guide/components/inheritance',
            contentPath: 'guide/components/inheritance',
          },
          {
            // label: 'Programmatically rendering components',
            label: '조건에 따라 컴포넌트 렌더링하기',
            path: 'guide/components/programmatic-rendering',
            contentPath: 'guide/components/programmatic-rendering',
          },
          {
            // label: 'Advanced configuration',
            label: '고급 설정',
            path: 'guide/components/advanced-configuration',
            contentPath: 'guide/components/advanced-configuration',
          },
          {
            // label: 'Custom Elements',
            label: '커스텀 엘리먼트',
            path: 'guide/elements',
            contentPath: 'guide/elements',
          },
        ],
      },
      {
        // label: 'Templates',
        label: '템플릿',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/templates',
            contentPath: 'guide/templates/overview',
          },
          {
            // label: 'Binding dynamic text, properties and attributes',
            label: '텍스트, 프로퍼티, 어트리뷰트를 동적으로 바인딩하기',
            path: 'guide/templates/binding',
            contentPath: 'guide/templates/binding',
          },
          {
            // label: 'Adding event listeners',
            label: '이벤트 리스너 추가하기',
            path: 'guide/templates/event-listeners',
            contentPath: 'guide/templates/event-listeners',
          },
          {
            // label: 'Two-way binding',
            label: '양방향 바인딩',
            path: 'guide/templates/two-way-binding',
            contentPath: 'guide/templates/two-way-binding',
          },
          {
            // label: 'Control flow',
            label: '흐름 제어',
            path: 'guide/templates/control-flow',
            contentPath: 'guide/templates/control-flow',
          },
          {
            // label: 'Pipes',
            label: '파이프',
            path: 'guide/templates/pipes',
            contentPath: 'guide/templates/pipes',
          },
          {
            // label: 'Slotting child content with ng-content',
            label: '부모 컴포넌트에서 받아 렌더링하기: ng-content',
            path: 'guide/templates/ng-content',
            contentPath: 'guide/templates/ng-content',
          },
          {
            // label: 'Create template fragments with ng-template',
            label: '템플릿 양식 만들기: ng-template',
            path: 'guide/templates/ng-template',
            contentPath: 'guide/templates/ng-template',
          },
          {
            // label: 'Grouping elements with ng-container',
            label: '엘리먼트 묶기: ng-container',
            path: 'guide/templates/ng-container',
            contentPath: 'guide/templates/ng-container',
          },
          {
            // label: 'Variables in templates',
            label: '템플릿 변수',
            path: 'guide/templates/variables',
            contentPath: 'guide/templates/variables',
          },
          {
            // label: 'Deferred loading with @defer',
            label: '뷰 지연 로딩: @defer',
            path: 'guide/templates/defer',
            contentPath: 'guide/templates/defer',
          },
          {
            // label: 'Expression syntax',
            label: '표현식 문법',
            path: 'guide/templates/expression-syntax',
            contentPath: 'guide/templates/expression-syntax',
          },
          {
            // label: 'Whitespace in templates',
            label: '공백문자',
            path: 'guide/templates/whitespace',
            contentPath: 'guide/templates/whitespace',
          },
        ],
      },
      {
        // label: 'Directives',
        label: '디렉티브',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/directives',
            contentPath: 'guide/directives/overview',
          },
          {
            // label: 'Attribute directives',
            label: '어트리뷰트 디렉티브',
            path: 'guide/directives/attribute-directives',
            contentPath: 'guide/directives/attribute-directives',
          },
          {
            // label: 'Structural directives',
            label: '구조 디렉티브',
            path: 'guide/directives/structural-directives',
            contentPath: 'guide/directives/structural-directives',
          },
          {
            // label: 'Directive composition API',
            label: '디렉티브 조합 API',
            path: 'guide/directives/directive-composition-api',
            contentPath: 'guide/directives/directive-composition-api',
          },
          {
            // label: 'Optimizing images with NgOptimizedImage',
            label: '이미지 최적화하기: NgOptimizedImage',
            path: 'guide/image-optimization',
            contentPath: 'guide/image-optimization',
          },
        ],
      },
      {
        // label: 'Dependency Injection',
        label: '의존성 주입',
        status: 'updated',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/di',
            contentPath: 'guide/di/overview',
            status: 'updated',
          },
          {
            // label: 'Creating and using services',
            label: '서비스 생성하기, 활용하기',
            path: 'guide/di/creating-and-using-services',
            contentPath: 'guide/di/creating-and-using-services',
            status: 'updated',
          },
          {
            // label: 'Defining dependency providers',
            label: '프로바이더 정의하기',
            path: 'guide/di/defining-dependency-providers',
            contentPath: 'guide/di/defining-dependency-providers',
            status: 'updated',
          },
          {
            // label: 'Injection context',
            label: '의존성 주입 컨텍스트',
            path: 'guide/di/dependency-injection-context',
            contentPath: 'guide/di/dependency-injection-context',
          },
          {
            // label: 'Hierarchical injectors',
            label: '인젝터의 게층 구조',
            path: 'guide/di/hierarchical-dependency-injection',
            contentPath: 'guide/di/hierarchical-dependency-injection',
          },
          {
            // label: 'Optimizing injection tokens',
            label: '인젝션 토큰 최적화',
            path: 'guide/di/lightweight-injection-tokens',
            contentPath: 'guide/di/lightweight-injection-tokens',
          },
          {
            // label: 'DI in action',
            label: '실전 의존성 주입',
            path: 'guide/di/di-in-action',
            contentPath: 'guide/di/di-in-action',
          },
        ],
      },
      {
        // label: 'Routing',
        label: '라우팅',
        status: 'updated',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/routing',
            contentPath: 'guide/routing/overview',
          },
          {
            // label: 'Define routes',
            label: '라우팅 규칙 정의하기',
            path: 'guide/routing/define-routes',
            contentPath: 'guide/routing/define-routes',
          },
          {
            // label: 'Show routes with Outlets',
            label: '라우팅 대상 표시하기',
            path: 'guide/routing/show-routes-with-outlets',
            contentPath: 'guide/routing/show-routes-with-outlets',
          },
          {
            // label: 'Navigate to routes',
            label: '라우팅 규칙 전환하기',
            path: 'guide/routing/navigate-to-routes',
            contentPath: 'guide/routing/navigate-to-routes',
          },
          {
            // label: 'Read route state',
            label: '라우팅 규칙 상태 읽기',
            path: 'guide/routing/read-route-state',
            contentPath: 'guide/routing/read-route-state',
          },
          {
            label: 'Redirecting routes',
            path: 'guide/routing/redirecting-routes',
            contentPath: 'guide/routing/redirecting-routes',
          },
          {
            label: 'Control route access with guards',
            path: 'guide/routing/route-guards',
            contentPath: 'guide/routing/route-guards',
          },
          {
            label: 'Route data resolvers',
            path: 'guide/routing/data-resolvers',
            contentPath: 'guide/routing/data-resolvers',
          },
          {
            label: 'Lifecycle and events',
            path: 'guide/routing/lifecycle-and-events',
            contentPath: 'guide/routing/lifecycle-and-events',
          },
          {
            label: 'Testing routing and navigation',
            path: 'guide/routing/testing',
            contentPath: 'guide/routing/testing',
            status: 'new',
          },
          {
            // label: 'Other routing tasks',
            label: '라우팅 활용 사례',
            path: 'guide/routing/common-router-tasks',
            contentPath: 'guide/routing/common-router-tasks',
          },
          {
            // label: 'Creating custom route matches',
            label: '커스텀 라우팅 규칙 정의하기',
            path: 'guide/routing/routing-with-urlmatcher',
            contentPath: 'guide/routing/routing-with-urlmatcher',
          },
          {
            // label: 'Rendering strategies',
            label: '렌더링 정책',
            path: 'guide/routing/rendering-strategies',
            contentPath: 'guide/routing/rendering-strategies',
            status: 'new',
          },
          {
            // label: 'Customizing route behavior',
            label: '라우팅 동작 커스터마이징하기',
            path: 'guide/routing/customizing-route-behavior',
            contentPath: 'guide/routing/customizing-route-behavior',
            status: 'new',
          },
          {
            // label: 'Router reference',
            label: 'Router 참고',
            path: 'guide/routing/router-reference',
            contentPath: 'guide/routing/router-reference',
          },
          {
            label: 'Route transition animations',
            path: 'guide/routing/route-transition-animations',
            contentPath: 'guide/routing/route-transition-animations',
          },
        ],
      },
      {
        // label: 'Forms',
        label: '폼',
        status: 'updated',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/forms',
            contentPath: 'guide/forms/overview',
          },
          {
            label: 'Signal forms',
            status: 'new',
            children: [
              {
                label: 'Overview',
                path: 'guide/forms/signals/overview',
                contentPath: 'guide/forms/signals/overview',
              },
              {
                label: 'Form models',
                path: 'guide/forms/signals/models',
                contentPath: 'guide/forms/signals/models',
              },
              {
                label: 'Field state management',
                path: 'guide/forms/signals/field-state-management',
                contentPath: 'guide/forms/signals/field-state-management',
              },
              {
                label: 'Validation',
                path: 'guide/forms/signals/validation',
                contentPath: 'guide/forms/signals/validation',
              },
              {
                label: 'Custom controls',
                path: 'guide/forms/signals/custom-controls',
                contentPath: 'guide/forms/signals/custom-controls',
              },
              {
                label: 'Comparison with other form systems',
                path: 'guide/forms/signals/comparison',
                contentPath: 'guide/forms/signals/comparison',
              },
            ],
          },
          {
            label: 'Reactive forms',
            path: 'guide/forms/reactive-forms',
            contentPath: 'guide/forms/reactive-forms',
          },
          {
            // label: 'Strictly typed reactive forms',
            label: '타입을 강제하는 반응형 폼',
            path: 'guide/forms/typed-forms',
            contentPath: 'guide/forms/typed-forms',
          },
          {
            // label: 'Template-driven forms',
            label: '템플릿 기반 폼',
            path: 'guide/forms/template-driven-forms',
            contentPath: 'guide/forms/template-driven-forms',
          },
          {
            // label: 'Validate form input',
            label: '입력값 검증하기',
            path: 'guide/forms/form-validation',
            contentPath: 'guide/forms/form-validation',
          },
          {
            // label: 'Building dynamic forms',
            label: '동적 폼 구성하기',
            path: 'guide/forms/dynamic-forms',
            contentPath: 'guide/forms/dynamic-forms',
          },
        ],
      },
      {
        // label: 'HTTP Client',
        label: 'HTTP 클라이언트',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/http',
            contentPath: 'guide/http/overview',
          },
          {
            // label: 'Setting up HttpClient',
            label: 'HttpClient 설정하기',
            path: 'guide/http/setup',
            contentPath: 'guide/http/setup',
          },
          {
            // label: 'Making requests',
            label: '요청 보내기',
            path: 'guide/http/making-requests',
            contentPath: 'guide/http/making-requests',
          },
          {
            label: 'Reactive data fetching with httpResource',
            path: 'guide/http/http-resource',
            contentPath: 'guide/http/http-resource',
          },
          {
            // label: 'Intercepting requests and responses',
            label: '요청/응답 가로채기',
            path: 'guide/http/interceptors',
            contentPath: 'guide/http/interceptors',
          },
          {
            // label: 'Testing',
            label: '테스트',
            path: 'guide/http/testing',
            contentPath: 'guide/http/testing',
          },
        ],
      },
      {
        // label: 'Server-side & hybrid-rendering',
        label: '서버 사이드 & 하이브리드 렌더링',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/performance',
            contentPath: 'guide/performance/overview',
          },
          {
            // label: 'Server-side and hybrid-rendering',
            label: '서버 사이드, 하이브리드 렌더링',
            path: 'guide/ssr',
            contentPath: 'guide/ssr',
          },
          {
            // label: 'Hydration',
            label: '하이드레이션',
            path: 'guide/hydration',
            contentPath: 'guide/hydration',
          },
          {
            // label: 'Incremental Hydration',
            label: '점진적 하이드레이션',
            path: 'guide/incremental-hydration',
            contentPath: 'guide/incremental-hydration',
          },
        ],
      },
      {
        // label: 'Testing',
        label: '테스트',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/testing',
            contentPath: 'guide/testing/overview',
          },
          {
            // label: 'Basics of testing components',
            label: '컴포넌트 테스트하기 기초',
            path: 'guide/testing/components-basics',
            contentPath: 'guide/testing/components-basics',
          },
          {
            // label: 'Component testing scenarios',
            label: '컴포넌트 테스트 시나리오',
            path: 'guide/testing/components-scenarios',
            contentPath: 'guide/testing/components-scenarios',
          },
          {
            label: 'Testing services',
            path: 'guide/testing/services',
            contentPath: 'guide/testing/services',
          },
          {
            // label: 'Testing attribute directives',
            label: '어트리뷰트 디렉티브 테스트하기',
            path: 'guide/testing/attribute-directives',
            contentPath: 'guide/testing/attribute-directives',
          },
          {
            // label: 'Testing pipes',
            label: '파이프 테스트하기',
            path: 'guide/testing/pipes',
            contentPath: 'guide/testing/pipes',
          },
          {
            label: 'Testing routing and navigation',
            path: 'guide/routing/testing',
            contentPath: 'guide/routing/testing',
            status: 'new',
          },
          {
            // label: 'Debugging tests',
            label: '테스트 디버깅',
            path: 'guide/testing/debugging',
            contentPath: 'guide/testing/debugging',
          },
          {
            label: 'Code coverage',
            path: 'guide/testing/code-coverage',
            contentPath: 'guide/testing/code-coverage',
          },
          {
            // label: 'Testing utility APIs',
            label: '테스트 유틸리티 API',
            path: 'guide/testing/utility-apis',
            contentPath: 'guide/testing/utility-apis',
          },
          {
            label: 'Zone.js Testing Utilities',
            path: 'guide/testing/zone-js-testing-utilities',
            contentPath: 'guide/testing/zone-js-testing-utilities',
          },
          {
            // label: 'Component harnesses overview',
            label: '컴포넌트 테스트 보조도구',
            path: 'guide/testing/component-harnesses-overview',
            contentPath: 'guide/testing/component-harnesses-overview',
          },
          {
            // label: 'Using component harnesses in tests',
            label: '테스트에 컴포넌트 테스트 보조도구 사용하기',
            path: 'guide/testing/using-component-harnesses',
            contentPath: 'guide/testing/using-component-harnesses',
          },
          {
            // label: 'Creating harnesses for your components',
            label: '커스텀 컴포넌트의 테스트 보조도구 만들기',
            path: 'guide/testing/creating-component-harnesses',
            contentPath: 'guide/testing/creating-component-harnesses',
          },
          {
            // label: 'Adding harness support for additional testing environments',
            label: '테스트 환경에 컴포넌트 보조도구 활용하기',
            path: 'guide/testing/component-harnesses-testing-environments',
            contentPath: 'guide/testing/component-harnesses-testing-environments',
          },
          {
            label: 'Migrating from Karma to Vitest',
            path: 'guide/testing/migrating-to-vitest',
            contentPath: 'guide/testing/migrating-to-vitest',
          },
          {
            label: 'Testing with Karma and Jasmine',
            path: 'guide/testing/karma',
            contentPath: 'guide/testing/karma',
          },
        ],
      },
      {
        label: 'Angular Aria',
        status: 'new',
        children: [
          {
            label: 'Overview',
            path: 'guide/aria/overview',
            contentPath: 'guide/aria/overview',
          },
          {
            label: 'Accordion',
            path: 'guide/aria/accordion',
            contentPath: 'guide/aria/accordion',
          },
          {
            label: 'Autocomplete',
            path: 'guide/aria/autocomplete',
            contentPath: 'guide/aria/autocomplete',
          },
          {
            label: 'Combobox',
            path: 'guide/aria/combobox',
            contentPath: 'guide/aria/combobox',
          },
          {
            label: 'Grid',
            path: 'guide/aria/grid',
            contentPath: 'guide/aria/grid',
          },
          {
            label: 'Listbox',
            path: 'guide/aria/listbox',
            contentPath: 'guide/aria/listbox',
          },
          {
            label: 'Menu',
            path: 'guide/aria/menu',
            contentPath: 'guide/aria/menu',
          },
          {
            label: 'Menubar',
            path: 'guide/aria/menubar',
            contentPath: 'guide/aria/menubar',
          },
          {
            label: 'Multiselect',
            path: 'guide/aria/multiselect',
            contentPath: 'guide/aria/multiselect',
          },
          {
            label: 'Select',
            path: 'guide/aria/select',
            contentPath: 'guide/aria/select',
          },
          {
            label: 'Tabs',
            path: 'guide/aria/tabs',
            contentPath: 'guide/aria/tabs',
          },
          {
            label: 'Toolbar',
            path: 'guide/aria/toolbar',
            contentPath: 'guide/aria/toolbar',
          },
          {
            label: 'Tree',
            path: 'guide/aria/tree',
            contentPath: 'guide/aria/tree',
          },
        ],
      },
      {
        // label: 'Internationalization',
        label: 'i18n',
        children: [
          {
            // label: '개요',
            label: 'Overview',
            path: 'guide/i18n',
            contentPath: 'guide/i18n/overview',
          },
          {
            // label: 'Add the localize package',
            label: '패키지 추가하기',
            path: 'guide/i18n/add-package',
            contentPath: 'guide/i18n/add-package',
          },
          {
            // label: 'Refer to locales by ID',
            label: 'ID로 참조하기',
            path: 'guide/i18n/locale-id',
            contentPath: 'guide/i18n/locale-id',
          },
          {
            // label: 'Format data based on locale',
            label: '언어에 따라 데이터 형식 변경하기',
            path: 'guide/i18n/format-data-locale',
            contentPath: 'guide/i18n/format-data-locale',
          },
          {
            // label: 'Prepare component for translation',
            label: '컴포넌트 번역 준비',
            path: 'guide/i18n/prepare',
            contentPath: 'guide/i18n/prepare',
          },
          {
            // label: 'Work with translation files',
            label: '번역 파일 작업하기',
            path: 'guide/i18n/translation-files',
            contentPath: 'guide/i18n/translation-files',
          },
          {
            // label: 'Merge translations into the app',
            label: '번역 파일 적용하기',
            path: 'guide/i18n/merge',
            contentPath: 'guide/i18n/merge',
          },
          {
            // label: 'Deploy multiple locales',
            label: '다국어 배포하기',
            path: 'guide/i18n/deploy',
            contentPath: 'guide/i18n/deploy',
          },
          {
            // label: 'Import global variants of the locale data',
            label: '언어에 맞는 전역 변수 참조하기',
            path: 'guide/i18n/import-global-variants',
            contentPath: 'guide/i18n/import-global-variants',
          },
          {
            // label: 'Manage marked text with custom IDs',
            label: '커스텀 ID가 부여된 텍스트 관리하기',
            path: 'guide/i18n/manage-marked-text',
            contentPath: 'guide/i18n/manage-marked-text',
          },
          {
            // label: 'Example Angular application',
            label: '예제',
            path: 'guide/i18n/example',
            contentPath: 'guide/i18n/example',
          },
        ],
      },
      {
        // label: 'Animations',
        label: '애니메이션',
        status: 'updated',
        children: [
          {
            label: 'Enter and Leave animations',
            path: 'guide/animations',
            contentPath: 'guide/animations/enter-and-leave',
            status: 'new',
          },
          {
            label: 'Complex Animations with CSS',
            path: 'guide/animations/css',
            contentPath: 'guide/animations/css',
          },
          {
            // label: 'Route transition animations',
            label: '화면 전환 애니메이션',
            path: 'guide/routing/route-transition-animations',
            contentPath: 'guide/routing/route-transition-animations',
          },
        ],
      },
      {
        // label: 'Drag and drop',
        label: '드래그 & 드랍',
        path: 'guide/drag-drop',
        contentPath: 'guide/drag-drop',
      },
    ],
  },
  {
    // label: 'Build with AI',
    label: 'AI와 함께 개발하기',
    status: 'new',
    children: [
      {
        // label: 'Get Started',
        label: '시작하기',
        path: 'ai',
        contentPath: 'ai/overview',
      },
      {
        label: 'LLM prompts and AI IDE setup',
        path: 'ai/develop-with-ai',
        contentPath: 'ai/develop-with-ai',
      },
      {
        label: 'Design Patterns',
        path: 'ai/design-patterns',
        contentPath: 'ai/design-patterns',
      },
      {
        label: 'Angular CLI MCP Server setup',
        path: 'ai/mcp',
        contentPath: 'ai/mcp-server-setup',
      },
      {
        label: 'Angular AI Tutor',
        path: 'ai/ai-tutor',
        contentPath: 'ai/ai-tutor',
      },
    ],
  },
  {
    // label: 'Developer Tools',
    label: '개발자 도구',
    children: [
      {
        label: 'Angular CLI',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'tools/cli',
            contentPath: 'tools/cli/overview',
          },
          {
            // label: 'Local set-up',
            label: '로컬 환경설정',
            path: 'tools/cli/setup-local',
            contentPath: 'tools/cli/setup-local',
          },
          {
            // label: 'Building Angular apps',
            label: 'Angular 앱 빌드하기',
            path: 'tools/cli/build',
            contentPath: 'tools/cli/build',
          },
          {
            // label: 'Serving Angular apps for development',
            label: 'Angular 앱 실행해보기',
            path: 'tools/cli/serve',
            contentPath: 'tools/cli/serve',
          },
          {
            // label: 'Deployment',
            label: '배포',
            path: 'tools/cli/deployment',
            contentPath: 'tools/cli/deployment',
          },
          {
            // label: 'End-to-End Testing',
            label: '엔드-투-엔드 테스트',
            path: 'tools/cli/end-to-end',
            contentPath: 'tools/cli/end-to-end',
          },
          {
            // label: 'Migrating to new build system',
            label: '새 빌드 시스템으로 마이그레이션하기',
            path: 'tools/cli/build-system-migration',
            contentPath: 'tools/cli/build-system-migration',
          },
          {
            // label: 'Build environments',
            label: '빌드 환경',
            path: 'tools/cli/environments',
            contentPath: 'tools/cli/environments',
          },
          {
            // label: 'Angular CLI builders',
            label: 'Angular CLI 빌더',
            path: 'tools/cli/cli-builder',
            contentPath: 'tools/cli/cli-builder',
          },
          {
            // label: 'Generating code using schematics',
            label: '스키매틱으로 코드 생성하기',
            path: 'tools/cli/schematics',
            contentPath: 'tools/cli/schematics',
          },
          {
            // label: 'Authoring schematics',
            label: '스키매틱 정의하기',
            path: 'tools/cli/schematics-authoring',
            contentPath: 'tools/cli/schematics-authoring',
          },
          {
            // label: 'Schematics for libraries',
            label: '라이브러리용 스키매틱',
            path: 'tools/cli/schematics-for-libraries',
            contentPath: 'tools/cli/schematics-for-libraries',
          },
          {
            // label: 'Template type checking',
            label: '템플릿 타입 검사',
            path: 'tools/cli/template-typecheck',
            contentPath: 'tools/cli/template-typecheck',
          },
          {
            // label: 'Ahead-of-time (AOT) compilation',
            label: '사전 컴파일(AOT)',
            path: 'tools/cli/aot-compiler',
            contentPath: 'tools/cli/aot-compiler',
          },
          {
            // label: 'AOT metadata errors',
            label: 'AOT 메타데이터 에러',
            path: 'tools/cli/aot-metadata-errors',
            contentPath: 'tools/cli/aot-metadata-errors',
          },
        ],
      },
      {
        // label: 'Libraries',
        label: '라이브러리',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'tools/libraries',
            contentPath: 'tools/libraries/overview',
          },
          {
            // label: 'Creating Libraries',
            label: '라이브러리 만들기',
            path: 'tools/libraries/creating-libraries',
            contentPath: 'tools/libraries/creating-libraries',
          },
          {
            // label: 'Using Libraries',
            label: '라이브러리 사용하기',
            path: 'tools/libraries/using-libraries',
            contentPath: 'tools/libraries/using-libraries',
          },
          {
            // label: 'Angular Package Format',
            label: 'Angular 패키지 형식',
            path: 'tools/libraries/angular-package-format',
            contentPath: 'tools/libraries/angular-package-format',
          },
        ],
      },
      {
        label: 'DevTools',
        children: [
          {
            label: 'Overview',
            path: 'tools/devtools',
            contentPath: 'tools/devtools/overview',
          },
          {
            label: 'Components',
            path: 'tools/devtools/component',
            contentPath: 'tools/devtools/component',
          },
          {
            label: 'Profiler',
            path: 'tools/devtools/profiler',
            contentPath: 'tools/devtools/profiler',
          },
          {
            label: 'Injectors',
            path: 'tools/devtools/injectors',
            contentPath: 'tools/devtools/injectors',
          },
          // TODO: create those guides
          // The signal debugging docs should also be added to the signal section
          // {
          //   label: 'Signals',
          //   path: 'tools/devtools/signals',
          //   contentPath: 'tools/devtools/signals',
          // },
          // {
          //   label: 'Router',
          //   path: 'tools/devtools/router',
          //   contentPath: 'tools/devtools/router',
          // }
        ],
      },
      {
        // label: 'Language Service',
        label: '언어 지원 서비스',
        path: 'tools/language-service',
        contentPath: 'tools/language-service',
      },
    ],
  },
  {
    // label: 'Best Practices',
    label: '모범 사례',
    children: [
      {
        // label: 'Style Guide',
        label: '스타일 가이드',
        path: 'style-guide',
        contentPath: 'best-practices/style-guide',
        status: 'updated',
      },
      {
        // label: 'Security',
        label: '보안',
        path: 'best-practices/security',
        contentPath: 'guide/security', // Have not refactored due to build issues
      },
      {
        // label: 'Accessibility',
        label: '접근성',
        path: 'best-practices/a11y',
        contentPath: 'best-practices/a11y',
      },
      {
        label: 'Unhandled errors in Angular',
        path: 'best-practices/error-handling',
        contentPath: 'best-practices/error-handling',
      },
      {
        // label: 'Performance',
        label: '성능 관리',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'best-practices/runtime-performance',
            contentPath: 'best-practices/runtime-performance/overview',
          },
          {
            // label: 'Zone pollution',
            label: 'Zone 오염',
            path: 'best-practices/zone-pollution',
            contentPath: 'best-practices/runtime-performance/zone-pollution',
          },
          {
            // label: 'Slow computations',
            label: '느린 연산',
            path: 'best-practices/slow-computations',
            contentPath: 'best-practices/runtime-performance/slow-computations',
          },
          {
            // label: 'Skipping component subtrees',
            label: '자식 컴포넌트 건너뛰기',
            path: 'best-practices/skipping-subtrees',
            contentPath: 'best-practices/runtime-performance/skipping-subtrees',
          },
          {
            // label: 'Profiling with the Chrome DevTools',
            label: 'Chrome DevTools 프로파일링',
            path: 'best-practices/profiling-with-chrome-devtools',
            contentPath: 'best-practices/runtime-performance/profiling-with-chrome-devtools',
          },
          {label: 'Zoneless', path: 'guide/zoneless', contentPath: 'guide/zoneless'},
        ],
      },
      {
        // label: 'Keeping up-to-date',
        label: '최신 버전 유지하기',
        path: 'update',
        contentPath: 'best-practices/update',
      },
    ],
  },
  {
    label: 'Developer Events',
    children: [
      {
        label: 'Angular v21 Release',
        path: 'events/v21',
        contentPath: 'events/v21',
        status: 'new',
      },
    ],
  },
  {
    // label: 'Extended Ecosystem',
    label: 'Angular 생태계',
    children: [
      {
        label: 'NgModules',
        path: 'guide/ngmodules/overview',
        contentPath: 'guide/ngmodules/overview',
      },
      {
        // label: 'Legacy Animations',
        label: 'Animations(이전 버전)',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'guide/legacy-animations',
            contentPath: 'guide/animations/overview',
          },
          {
            // label: 'Transition and Triggers',
            label: '트랜지션, 트리거',
            path: 'guide/legacy-animations/transition-and-triggers',
            contentPath: 'guide/animations/transition-and-triggers',
          },
          {
            // label: 'Complex Sequences',
            label: '복잡한 시퀀스 구현하기',
            path: 'guide/legacy-animations/complex-sequences',
            contentPath: 'guide/animations/complex-sequences',
          },
          {
            // label: 'Reusable Animations',
            label: '애니메이션 재사용하기',
            path: 'guide/legacy-animations/reusable-animations',
            contentPath: 'guide/animations/reusable-animations',
          },
          {
            // label: 'Migrating to Native CSS Animations',
            label: '네이티브 CSS 애니메이션으로 마이그레이션하기',
            path: 'guide/animations/migration',
            contentPath: 'guide/animations/migration',
          },
        ],
      },
      {
        // label: 'Using RxJS with Angular',
        label: 'RxJS 활용',
        children: [
          {
            // label: 'Signals interop',
            label: '시그널 상호작용',
            path: 'ecosystem/rxjs-interop',
            contentPath: 'ecosystem/rxjs-interop/signals-interop',
          },
          {
            // label: 'Component output interop',
            label: '컴포넌트 출력 상호작용',
            path: 'ecosystem/rxjs-interop/output-interop',
            contentPath: 'ecosystem/rxjs-interop/output-interop',
          },
          {
            label: 'Unsubscribing with takeUntilDestroyed',
            path: 'ecosystem/rxjs-interop/take-until-destroyed',
            contentPath: 'ecosystem/rxjs-interop/take-until-destroyed',
          },
        ],
      },
      {
        // label: 'Service Workers & PWAs',
        label: '서비스 워커 & PWA',
        children: [
          {
            // label: 'Overview',
            label: '개요',
            path: 'ecosystem/service-workers',
            contentPath: 'ecosystem/service-workers/overview',
          },
          {
            // label: 'Getting started',
            label: '시작하기',
            path: 'ecosystem/service-workers/getting-started',
            contentPath: 'ecosystem/service-workers/getting-started',
          },
          {
            label: 'Custom service worker scripts',
            path: 'ecosystem/service-workers/custom-service-worker-scripts',
            contentPath: 'ecosystem/service-workers/custom-service-worker-scripts',
          },
          {
            // label: 'Configuration file',
            label: '환경설정',
            path: 'ecosystem/service-workers/config',
            contentPath: 'ecosystem/service-workers/config',
          },
          {
            // label: 'Communicating with the service worker',
            label: '서비스 워커와 통신하기',
            path: 'ecosystem/service-workers/communications',
            contentPath: 'ecosystem/service-workers/communications',
          },
          {
            // label: 'Push notifications',
            label: '푸시 알림',
            path: 'ecosystem/service-workers/push-notifications',
            contentPath: 'ecosystem/service-workers/push-notifications',
          },
          {
            // label: 'Service worker devops',
            label: '서비스 워커 데브옵스',
            path: 'ecosystem/service-workers/devops',
            contentPath: 'ecosystem/service-workers/devops',
          },
          {
            // label: 'App shell pattern',
            label: '앱 기본구조 패턴',
            path: 'ecosystem/service-workers/app-shell',
            contentPath: 'ecosystem/service-workers/app-shell',
          },
        ],
      },
      {
        // label: 'Web workers',
        label: '웹 워커',
        path: 'ecosystem/web-workers',
        contentPath: 'ecosystem/web-workers',
      },
      {
        // label: 'Custom build pipeline',
        label: '커스텀 빌드 파이프라인',
        path: 'ecosystem/custom-build-pipeline',
        contentPath: 'ecosystem/custom-build-pipeline',
      },
      {
        label: 'Tailwind',
        path: 'guide/tailwind',
        contentPath: 'guide/tailwind',
        status: 'new',
      },
      {
        label: 'Angular Fire',
        path: 'https://github.com/angular/angularfire#readme',
      },
      {
        label: 'Google Maps',
        path: 'https://github.com/angular/components/tree/main/src/google-maps#readme',
      },
      {
        label: 'Google Pay',
        path: 'https://github.com/google-pay/google-pay-button#angular',
      },
      {
        label: 'YouTube player',
        path: 'https://github.com/angular/components/blob/main/src/youtube-player/README.md',
      },
      {
        label: 'Angular CDK',
        path: 'https://material.angular.dev/cdk/categories',
      },
      {
        label: 'Angular Material',
        path: 'https://material.angular.dev/',
      },
    ],
  },
  ...(isDevMode()
    ? [
        {
          label: 'Adev Dev Guide',
          children: [
            {
              label: 'Kitchen Sink',
              path: 'kitchen-sink',
              contentPath: 'kitchen-sink',
            },
          ],
        },
      ]
    : []),
];

export const TUTORIALS_SUB_NAVIGATION_DATA: NavigationItem[] = [
  FIRST_APP_TUTORIAL_NAV_DATA,
  LEARN_ANGULAR_TUTORIAL_NAV_DATA,
  DEFERRABLE_VIEWS_TUTORIAL_NAV_DATA,
  SIGNALS_TUTORIAL_NAV_DATA,
  SIGNAL_FORMS_TUTORIAL_NAV_DATA,
  {
    path: DEFAULT_PAGES.TUTORIALS,
    contentPath: 'tutorials/home',
    label: 'Tutorials',
  },
];

const REFERENCE_SUB_NAVIGATION_DATA: NavigationItem[] = [
  {
    // label: 'Roadmap',
    label: '로드맵',
    path: 'roadmap',
    contentPath: 'reference/roadmap',
  },
  {
    // label: 'Get involved',
    label: '참여하기',
    path: 'https://github.com/angular/angular/blob/main/CONTRIBUTING.md',
  },
  {
    // label: 'API Reference',
    label: 'API 참조',
    children: [
      {
        // label: 'Overview',
        label: '개요',
        path: 'api',
      },
      ...getApiNavigationItems(),
    ],
  },
  {
    // label: 'CLI Reference',
    label: 'CLI 참조',
    children: [
      {
        // label: 'Overview',
        label: '개요',
        path: 'cli',
        contentPath: 'reference/cli',
      },
      {
        label: 'ng add',
        path: 'cli/add',
      },
      {
        label: 'ng analytics',
        children: [
          {
            label: 'Overview',
            path: 'cli/analytics',
          },
          {
            label: 'disable',
            path: 'cli/analytics/disable',
          },
          {
            label: 'enable',
            path: 'cli/analytics/enable',
          },
          {
            label: 'info',
            path: 'cli/analytics/info',
          },
          {
            label: 'prompt',
            path: 'cli/analytics/prompt',
          },
        ],
      },
      {
        label: 'ng build',
        path: 'cli/build',
      },
      {
        label: 'ng cache',
        children: [
          {
            label: 'Overview',
            path: 'cli/cache',
          },
          {
            label: 'clean',
            path: 'cli/cache/clean',
          },
          {
            label: 'disable',
            path: 'cli/cache/disable',
          },
          {
            label: 'enable',
            path: 'cli/cache/enable',
          },
          {
            label: 'info',
            path: 'cli/cache/info',
          },
        ],
      },
      {
        label: 'ng completion',
        children: [
          {
            label: 'Overview',
            path: 'cli/completion',
          },
          {
            label: 'script',
            path: 'cli/completion/script',
          },
        ],
      },
      {
        label: 'ng config',
        path: 'cli/config',
      },
      {
        label: 'ng deploy',
        path: 'cli/deploy',
      },
      {
        label: 'ng e2e',
        path: 'cli/e2e',
      },
      {
        label: 'ng extract-i18n',
        path: 'cli/extract-i18n',
      },
      {
        label: 'ng generate',
        children: [
          {
            label: 'Overview',
            path: 'cli/generate',
          },
          {
            label: 'ai-config',
            path: 'cli/generate/ai-config',
          },
          {
            label: 'app-shell',
            path: 'cli/generate/app-shell',
          },
          {
            label: 'application',
            path: 'cli/generate/application',
          },
          {
            label: 'class',
            path: 'cli/generate/class',
          },
          {
            label: 'component',
            path: 'cli/generate/component',
          },
          {
            label: 'config',
            path: 'cli/generate/config',
          },
          {
            label: 'directive',
            path: 'cli/generate/directive',
          },
          {
            label: 'enum',
            path: 'cli/generate/enum',
          },
          {
            label: 'environments',
            path: 'cli/generate/environments',
          },
          {
            label: 'guard',
            path: 'cli/generate/guard',
          },
          {
            label: 'interceptor',
            path: 'cli/generate/interceptor',
          },
          {
            label: 'interface',
            path: 'cli/generate/interface',
          },
          {
            label: 'library',
            path: 'cli/generate/library',
          },
          {
            label: 'module',
            path: 'cli/generate/module',
          },
          {
            label: 'pipe',
            path: 'cli/generate/pipe',
          },
          {
            label: 'resolver',
            path: 'cli/generate/resolver',
          },
          {
            label: 'service-worker',
            path: 'cli/generate/service-worker',
          },
          {
            label: 'service',
            path: 'cli/generate/service',
          },
          {
            label: 'web-worker',
            path: 'cli/generate/web-worker',
          },
        ],
      },
      {
        label: 'ng lint',
        path: 'cli/lint',
      },
      {
        label: 'ng new',
        path: 'cli/new',
      },
      {
        label: 'ng run',
        path: 'cli/run',
      },
      {
        label: 'ng serve',
        path: 'cli/serve',
      },
      {
        label: 'ng test',
        path: 'cli/test',
      },
      {
        label: 'ng update',
        path: 'cli/update',
      },
      {
        label: 'ng version',
        path: 'cli/version',
      },
    ],
  },
  {
    // label: 'Error Encyclopedia',
    label: '오류 사전',
    children: [
      {
        // label: 'Overview',
        label: '개요',
        path: 'errors',
        contentPath: 'reference/errors/overview',
      },
      ...ERRORS_NAV_DATA,
    ],
  },
  {
    // label: 'Extended Diagnostics',
    label: '심화 진단',
    children: [
      {
        // label: 'Overview',
        label: '개요',
        path: 'extended-diagnostics',
        contentPath: 'reference/extended-diagnostics/overview',
      },
      ...EXT_DIAGNOSTICS_NAV_DATA,
    ],
  },
  {
    // label: 'Versioning and releases',
    label: '버전 정책, 릴리즈 정책',
    path: 'reference/releases',
    contentPath: 'reference/releases',
  },
  {
    // label: 'Version compatibility',
    label: '버전 하위호환성',
    path: 'reference/versions',
    contentPath: 'reference/versions',
  },
  {
    // label: 'Update guide',
    label: '업데이트 가이드',
    path: 'update-guide',
  },
  {
    // label: 'Configurations',
    label: '환경설정',
    children: [
      {
        // label: 'File structure',
        label: '파일 구조',
        path: 'reference/configs/file-structure',
        contentPath: 'reference/configs/file-structure',
      },
      {
        // label: 'Workspace configuration',
        label: '워크스페이스 설정',
        path: 'reference/configs/workspace-config',
        contentPath: 'reference/configs/workspace-config',
      },
      {
        // label: 'Angular compiler options',
        label: 'Angular 컴파일러 옵션',
        path: 'reference/configs/angular-compiler-options',
        contentPath: 'reference/configs/angular-compiler-options',
      },
      {
        // label: 'npm dependencies',
        label: 'npm 의존성 패키지',
        path: 'reference/configs/npm-packages',
        contentPath: 'reference/configs/npm-packages',
      },
    ],
  },
  {
    // label: 'Migrations',
    label: '마이그레이션',
    children: [
      {
        // label: 'Overview',
        label: '개요',
        path: 'reference/migrations',
        contentPath: 'reference/migrations/overview',
      },
      {
        // label: 'Standalone',
        label: '독립 컴포넌트로 전환하기',
        path: 'reference/migrations/standalone',
        contentPath: 'reference/migrations/standalone',
      },
      {
        // label: 'Control Flow Syntax',
        label: '흐름 제어 문법',
        path: 'reference/migrations/control-flow',
        contentPath: 'reference/migrations/control-flow',
      },
      {
        // label: 'inject() Function',
        label: 'inject() 함수',
        path: 'reference/migrations/inject-function',
        contentPath: 'reference/migrations/inject-function',
      },
      {
        // label: 'Lazy-loaded routes',
        label: '라우팅 규칙 지연 로딩',
        path: 'reference/migrations/route-lazy-loading',
        contentPath: 'reference/migrations/route-lazy-loading',
      },
      {
        // label: 'Signal inputs',
        label: '시그널 입력',
        path: 'reference/migrations/signal-inputs',
        contentPath: 'reference/migrations/signal-inputs',
      },
      {
        // label: 'Outputs',
        label: '출력',
        path: 'reference/migrations/outputs',
        contentPath: 'reference/migrations/outputs',
      },
      {
        // label: 'Signal queries',
        label: '시그널 쿼리',
        path: 'reference/migrations/signal-queries',
        contentPath: 'reference/migrations/signal-queries',
      },
      {
        // label: 'Clean up unused imports',
        label: '사용하지 않는 import 제거하기',
        path: 'reference/migrations/cleanup-unused-imports',
        contentPath: 'reference/migrations/cleanup-unused-imports',
      },
      {
        // label: 'Self-closing tags',
        label: '스스로 닫는 태그',
        path: 'reference/migrations/self-closing-tags',
        contentPath: 'reference/migrations/self-closing-tags',
      },
      {
        label: 'NgClass to Class',
        path: 'reference/migrations/ngclass-to-class',
        contentPath: 'reference/migrations/ngclass-to-class',
        status: 'new',
      },
      {
        label: 'NgStyle to Style',
        path: 'reference/migrations/ngstyle-to-style',
        contentPath: 'reference/migrations/ngstyle-to-style',
        status: 'new',
      },
      {
        label: 'Router Testing Module Migration',
        path: 'reference/migrations/router-testing-module-migration',
        contentPath: 'reference/migrations/router-testing-module-migration',
        status: 'new',
      },
      {
        label: 'CommonModule to Standalone',
        path: 'reference/migrations/common-to-standalone',
        contentPath: 'reference/migrations/common-to-standalone',
        status: 'new',
      },
    ],
  },
];

const FOOTER_NAVIGATION_DATA: NavigationItem[] = [
  {
    // label: 'Press Kit',
    label: '프레스 킷',
    path: 'press-kit',
    contentPath: 'reference/press-kit',
  },
  {
    // label: 'License',
    label: '라이센스',
    path: 'license',
    contentPath: 'reference/license',
  },
];

// Docs navigation data structure, it's used to display structure in
// navigation-list component And build the routing table for content pages.
export const SUB_NAVIGATION_DATA: SubNavigationData = {
  docs: DOCS_SUB_NAVIGATION_DATA,
  reference: REFERENCE_SUB_NAVIGATION_DATA,
  tutorials: TUTORIALS_SUB_NAVIGATION_DATA,
  footer: FOOTER_NAVIGATION_DATA,
};
