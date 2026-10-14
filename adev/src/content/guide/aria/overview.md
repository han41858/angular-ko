<!--
<docs-decorative-header title="Angular Aria" imgSrc="adev/src/assets/images/aria.svg"> <!- markdownlint-disable-line ->
</docs-decorative-header>
-->

<docs-decorative-header title="Angular Aria" imgSrc="adev/src/assets/images/aria.svg"> <!-- markdownlint-disable-line -->
</docs-decorative-header>

<!--
## What is Angular Aria?
-->

<a id="what-is-angular-aria"></a>

## Angular Aria란?

<!--
Building accessible components seems straightforward, but implementing them according to the [W3C Accessibility Guidelines](https://www.w3.org/TR/wcag/) requires significant effort and accessibility expertise.

Angular Aria is a collection of headless, accessible directives that implement common [WAI-ARIA patterns](https://www.w3.org/WAI/ARIA/apg/patterns/). The directives handle keyboard interactions, ARIA attributes, focus management, and screen reader support. All you have to do is provide the HTML structure, CSS styling, and business logic!
-->

접근성을 지원하는 컴포넌트를 만드는 일은 간단해 보이지만, [W3C 접근성 가이드라인](https://www.w3.org/TR/wcag/)에 맞춰 구현하려면 상당한 노력과 접근성 전문 지식이 필요합니다.

Angular Aria는 일반적인 [WAI-ARIA 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/)을 구현한 디렉티브 모음입니다.
이 디렉티브들은 UI 형태를 정하지 않는 헤드리스 방식으로 접근성을 지원하며, 키보드 조작, ARIA 어트리뷰트, 포커스 관리, 스크린 리더 지원을 처리합니다.
개발자는 HTML 구조, CSS 스타일, 비즈니스 로직만 작성하면 됩니다!

<!--
## Installation
-->

<a id="installation"></a>

## 설치

<!--
<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install @angular/aria
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add @angular/aria
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add @angular/aria
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add @angular/aria
  </docs-code>
</docs-code-multifile>
-->

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install @angular/aria
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add @angular/aria
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add @angular/aria
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add @angular/aria
  </docs-code>
</docs-code-multifile>

<!--
## Showcase
-->

<a id="showcase"></a>

## 활용 예시

<!--
For example, let's take a toolbar menu. While it may appear to be a "simple" row of buttons tied with specific logic, keyboard navigation and screen readers add a lot of unexpected complexity to those unfamiliar with accessibility.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

In this one scenario, developers need to consider:

- **Keyboard navigation**. Users need to open the menu with Enter or Space, navigate options with arrow keys, select with Enter, and close with Escape.
- **Screen readers** need to announce the menu's state, the number of options, and which option has focus.
- **Focus management** needs to move logically between the trigger and menu items.
- **Right-to-left languages** require the ability to navigate in reverse.
-->

툴바 메뉴를 예로 들어보겠습니다.
특정 로직과 연결된 버튼을 한 줄로 나열한 "단순한" UI처럼 보일 수 있습니다.
하지만 접근성에 익숙하지 않다면 키보드 탐색과 스크린 리더 지원 때문에 예상하지 못한 복잡한 문제를 만나게 됩니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

이 예제만 해도 개발자는 다음 사항을 고려해야 합니다.

- **키보드 탐색**: 사용자가 Enter나 Space로 메뉴를 열고, 방향키로 옵션을 탐색하고, Enter로 선택하고, Escape로 닫을 수 있어야 합니다.
- **스크린 리더**: 메뉴의 상태, 옵션의 수, 현재 포커스가 있는 옵션을 안내해야 합니다.
- **포커스 관리**: 트리거와 메뉴 항목 사이에서 포커스가 논리적인 순서로 이동해야 합니다.
- **오른쪽에서 왼쪽으로 쓰는 언어**: 반대 방향으로 탐색할 수 있어야 합니다.

<!--
## What's included?
-->

<a id="whats-included"></a>

## 어떤 기능이 포함되어 있나요?

<!--
Angular Aria includes directives with comprehensive documentation, working examples and API references for common interactive patterns:
-->

Angular Aria는 일반적인 상호작용 패턴에 대한 디렉티브와 함께 상세한 문서, 동작하는 예제, API 레퍼런스를 제공합니다.

<!--
### Search and selection
-->

<a id="search-and-selection"></a>

### 검색과 선택

<!--
| Component                               | Description                                                    |
| --------------------------------------- | -------------------------------------------------------------- |
| [Autocomplete](guide/aria/autocomplete) | Text input with filtered suggestions that appear as users type |
| [Listbox](guide/aria/listbox)           | Single or multi-select option lists with keyboard navigation   |
| [Select](guide/aria/select)             | Single-selection dropdown pattern with keyboard navigation     |
| [Multiselect](guide/aria/multiselect)   | Multiple-selection dropdown pattern with compact display       |
| [Combobox](guide/aria/combobox)         | Primitive directive that coordinates a text input with a popup |
-->

| 컴포넌트                             | 설명                                                          |
| ------------------------------------ | ------------------------------------------------------------- |
| [자동 완성](guide/aria/autocomplete) | 사용자가 입력하면 필터링된 추천 항목을 표시하는 텍스트 입력란 |
| [리스트박스](guide/aria/listbox)     | 키보드 탐색을 지원하는 단일 또는 다중 선택 옵션 목록          |
| [선택](guide/aria/select)            | 키보드 탐색을 지원하는 단일 선택 드롭다운 패턴                |
| [다중 선택](guide/aria/multiselect)  | 선택 결과를 간결하게 표시하는 다중 선택 드롭다운 패턴         |
| [콤보박스](guide/aria/combobox)      | 텍스트 입력란과 팝업을 연결하는 기본 디렉티브                 |

<!--
### Navigation and call to actions
-->

<a id="navigation-and-call-to-actions"></a>

### 탐색과 작업 실행

<!--
| Component                     | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| [Menu](guide/aria/menu)       | Dropdown menus with nested submenus and keyboard shortcuts |
| [Menubar](guide/aria/menubar) | Horizontal navigation bar for persistent application menus |
| [Toolbar](guide/aria/toolbar) | Grouped sets of controls with logical keyboard navigation  |
-->

| 컴포넌트                     | 설명                                                      |
| ---------------------------- | --------------------------------------------------------- |
| [메뉴](guide/aria/menu)      | 중첩된 하위 메뉴와 키보드 단축키를 지원하는 드롭다운 메뉴 |
| [메뉴바](guide/aria/menubar) | 애플리케이션 메뉴를 항상 표시하는 수평 탐색 막대          |
| [툴바](guide/aria/toolbar)   | 논리적인 키보드 탐색을 지원하는 컨트롤 그룹               |

<!--
### Content organization
-->

<a id="content-organization"></a>

### 콘텐츠 구성

<!--
| Component                         | Description                                                            |
| --------------------------------- | ---------------------------------------------------------------------- |
| [Accordion](guide/aria/accordion) | Collapsible content panels that can expand individually or exclusively |
| [Tabs](guide/aria/tabs)           | Tabbed interfaces with automatic or manual activation modes            |
| [Tree](guide/aria/tree)           | Hierarchical lists with expand/collapse functionality                  |
| [Grid](guide/aria/grid)           | Two-dimensional data display with cell-by-cell keyboard navigation     |
-->

| 컴포넌트                         | 설명                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------- |
| [아코디언](guide/aria/accordion) | 여러 개를 개별적으로 펼치거나 한 번에 하나만 펼칠 수 있는 접이식 콘텐츠 패널 |
| [탭](guide/aria/tabs)            | 자동 또는 수동 활성화 모드를 지원하는 탭 인터페이스                          |
| [트리](guide/aria/tree)          | 펼치기와 접기 기능을 지원하는 계층형 목록                                    |
| [그리드](guide/aria/grid)        | 셀 단위 키보드 탐색을 지원하는 2차원 데이터 표시                             |

<!--
## When to use Angular Aria
-->

<a id="when-to-use-angular-aria"></a>

## Angular Aria를 사용하기 좋은 경우

<!--
Angular Aria works well when you need accessible interactive components that are WCAG compliant with custom styling. Examples include:

- **Building a design system** - Your team maintains a component library with specific visual standards that need accessible implementations
- **Enterprise component libraries** - You're creating reusable components for multiple applications within an organization
- **Custom brand requirements** - The interface needs to match precise design specifications that pre-styled component libraries cannot easily accommodate
-->

Angular Aria는 커스텀 스타일을 적용하면서 WCAG를 준수하는 접근성 있는 상호작용 컴포넌트가 필요할 때 적합합니다.
예를 들면 다음과 같습니다.

- **디자인 시스템 구축**: 팀에서 특정 시각적 기준을 따르는 컴포넌트 라이브러리를 관리하며 접근성 구현이 필요한 경우
- **기업용 컴포넌트 라이브러리**: 조직 내 여러 애플리케이션에서 재사용할 컴포넌트를 만드는 경우
- **브랜드 고유 요구사항**: 스타일이 미리 지정된 컴포넌트 라이브러리로는 쉽게 구현하기 어려운 구체적인 디자인 명세를 따라야 하는 경우

<!--
## When not to use Angular Aria
-->

<a id="when-not-to-use-angular-aria"></a>

## Angular Aria가 적합하지 않은 경우

<!--
Angular Aria might not fit every scenario:

- **Pre-styled components** - If you need components that look complete without custom styling, use Angular Material instead
- **Simple forms** - Native HTML form controls like `<button>` and `<input type="radio">` provide built-in accessibility for straightforward use cases
- **Rapid prototyping** - When validating concepts quickly, pre-styled component libraries reduce initial development time
-->

Angular Aria가 모든 상황에 적합한 것은 아닙니다.

- **스타일이 미리 지정된 컴포넌트**: 커스텀 스타일을 작성하지 않아도 완성된 모습의 컴포넌트가 필요하다면 Angular Material을 사용하세요.
- **간단한 폼**: `<button>`이나 `<input type="radio">` 같은 네이티브 HTML 폼 컨트롤은 간단한 사용 사례에 필요한 접근성을 기본으로 제공합니다.
- **빠른 프로토타입 제작**: 아이디어를 빠르게 검증하려면 스타일이 미리 지정된 컴포넌트 라이브러리를 사용해서 초기 개발 시간을 줄일 수 있습니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Check out a component from the side nav or [list above](#whats-included), or start with [Toolbar](guide/aria/toolbar) to see a complete example of how Angular Aria directives work!
-->

사이드 내비게이션이나 [위 목록](#whats-included)에서 컴포넌트를 살펴보세요.
[툴바](guide/aria/toolbar)부터 시작하면 Angular Aria 디렉티브가 어떻게 동작하는지 완전한 예제로 확인할 수 있습니다!
