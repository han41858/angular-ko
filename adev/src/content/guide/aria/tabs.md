<!--
# Tabs

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" title="Tabs ARIA pattern"/>
  <docs-pill href="/api/aria/tabs/Tabs" title="Tabs API Reference"/>
</docs-pill-row>
-->

# 탭

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" title="탭 ARIA 패턴"/>
  <docs-pill href="/api/aria/tabs/Tabs" title="탭 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
Tabs display layered content sections where only one panel is visible at a time. Users switch between panels by clicking tab buttons or using arrow keys to navigate the tab list.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

탭은 여러 콘텐츠 섹션을 겹쳐 배치하고 한 번에 하나의 패널만 표시합니다.
사용자는 탭 버튼을 클릭하거나 방향키로 탭 목록을 탐색해서 패널을 전환합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Tabs work well for organizing related content into distinct sections where users switch between different views or categories.

**Use tabs when:**

- Organizing related content into distinct sections
- Creating settings panels with multiple categories
- Building documentation with multiple topics
- Implementing dashboards with different views
- Showing content where users need to switch contexts

**Avoid tabs when:**

- Building sequential forms or wizards (use a stepper pattern)
- Navigating between pages (use router navigation)
- Showing single content sections (no need for tabs)
- Having more than 7-8 tabs (consider a different layout)
-->

탭은 관련 콘텐츠를 서로 구분되는 섹션으로 구성하고, 사용자가 여러 뷰나 범주 사이를 전환하는 경우에 적합합니다.

**탭을 사용하기 좋은 경우:**

- 관련 콘텐츠를 구분된 섹션으로 구성할 때
- 여러 범주의 설정 패널을 만들 때
- 여러 주제로 구성된 문서를 만들 때
- 다양한 뷰를 갖춘 대시보드를 구현할 때
- 사용자가 맥락을 전환하며 확인해야 하는 콘텐츠를 표시할 때

**탭을 피해야 하는 경우:**

- 순서대로 작성하는 폼이나 마법사를 만들 때(단계 진행 패턴을 사용하세요)
- 페이지 사이를 이동할 때(라우터 탐색을 사용하세요)
- 콘텐츠 섹션이 하나뿐일 때(탭이 필요하지 않습니다)
- 탭이 7~8개보다 많을 때(다른 레이아웃을 고려하세요)

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Selection modes** - Tabs activate automatically on focus or require manual activation
- **Keyboard navigation** - Arrow keys, Home, and End for efficient tab navigation
- **Orientation** - Horizontal or vertical tab list layouts
- **Lazy content** - Tab panels render only when activated
- **Disabled tabs** - Disable individual tabs with focus management
- **Focus modes** - Roving tabindex or activedescendant focus strategies
- **RTL support** - Right-to-left language navigation
-->

- **선택 모드**: 포커스를 받으면 탭을 자동으로 활성화하거나 수동으로 활성화하도록 합니다.
- **키보드 탐색**: 방향키, Home, End로 탭을 효율적으로 탐색합니다.
- **방향**: 탭 목록을 수평이나 수직으로 배치합니다.
- **지연 콘텐츠**: 탭 패널을 활성화할 때만 렌더링합니다.
- **비활성화된 탭**: 개별 탭을 비활성화하고 포커스를 관리합니다.
- **포커스 모드**: roving tabindex 또는 activedescendant 포커스 전략을 사용합니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어의 탐색을 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Selection follows focus
-->

<a id="selection-follows-focus"></a>

### 포커스에 따라 선택하기

<!--
When selection follows focus, tabs activate immediately as you navigate with arrow keys. This provides instant feedback and works well for lightweight content.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Set `[selectionMode]="'follow'"` on the tab list to enable this behavior.
-->

포커스에 따라 선택하도록 설정하면 방향키로 탐색할 때 탭이 즉시 활성화됩니다.
사용자가 결과를 바로 확인할 수 있으며, 가벼운 콘텐츠에 적합합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/selection-follows-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

이 동작을 활성화하려면 탭 목록에 `[selectionMode]="'follow'"`를 설정하세요.

<!--
### Manual activation
-->

<a id="manual-activation"></a>

### 수동 활성화

<!--
With manual activation, arrow keys move focus between tabs without changing the selected tab. Users press Space or Enter to activate the focused tab.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Use `[selectionMode]="'explicit'"` for heavy content panels to avoid unnecessary rendering.
-->

수동 활성화 모드에서는 방향키로 탭 사이의 포커스만 이동하고 선택된 탭은 바뀌지 않습니다.
사용자는 Space나 Enter를 눌러 포커스가 있는 탭을 활성화합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/explicit-selection/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

렌더링 비용이 큰 콘텐츠 패널에는 `[selectionMode]="'explicit'"`를 사용해서 불필요한 렌더링을 피하세요.

<!--
### Vertical tabs
-->

<a id="vertical-tabs"></a>

### 수직 탭

<!--
Arrange tabs vertically for interfaces like settings panels or navigation sidebars.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Set `[orientation]="'vertical'"` on the tab list. Navigation changes to Up/Down arrow keys.
-->

설정 패널이나 탐색 사이드바와 같은 인터페이스에서는 탭을 수직으로 배치할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/vertical/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

탭 목록에 `[orientation]="'vertical'"`을 설정하세요.
탐색 키는 위/아래 방향키로 바뀝니다.

<!--
### Lazy content rendering
-->

<a id="lazy-content-rendering"></a>

### 콘텐츠 지연 렌더링

<!--
Use the `ngTabContent` directive on an `ng-template` to defer rendering tab panels until they're shown.

```angular-html
<div ngTabs>
  <ul ngTabList [(selectedTab)]="selectedTab">
    <li ngTab value="tab1">Tab 1</li>
    <li ngTab value="tab2">Tab 2</li>
  </ul>

  <div ngTabPanel value="tab1">
    <ng-template ngTabContent>
      <!- This content only renders when Tab 1 is shown ->
      <app-heavy-component />
    </ng-template>
  </div>

  <div ngTabPanel value="tab2">
    <ng-template ngTabContent>
      <!- This content only renders when Tab 2 is shown ->
      <app-another-component />
    </ng-template>
  </div>
</div>
```

By default, content is removed from the DOM when the panel is hidden. Set `[preserveContent]="true"` to keep it, for example when the panel contains a video that shouldn't reset when switching tabs.
-->

`ng-template`에 `ngTabContent` 디렉티브를 적용하면 탭 패널을 표시할 때까지 렌더링을 미룰 수 있습니다.

```angular-html
<div ngTabs>
  <ul ngTabList [(selectedTab)]="selectedTab">
    <li ngTab value="tab1">Tab 1</li>
    <li ngTab value="tab2">Tab 2</li>
  </ul>

  <div ngTabPanel value="tab1">
    <ng-template ngTabContent>
      <!-- 이 콘텐츠는 Tab 1을 표시할 때만 렌더링됩니다. -->
      <app-heavy-component />
    </ng-template>
  </div>

  <div ngTabPanel value="tab2">
    <ng-template ngTabContent>
      <!-- 이 콘텐츠는 Tab 2를 표시할 때만 렌더링됩니다. -->
      <app-another-component />
    </ng-template>
  </div>
</div>
```

기본적으로 패널을 숨기면 콘텐츠가 DOM에서 제거됩니다.
예를 들어 탭을 전환해도 초기화되지 않아야 하는 동영상이 있다면, `[preserveContent]="true"`로 설정해서 콘텐츠를 유지하세요.

<!--
### Disabled tabs
-->

<a id="disabled-tabs"></a>

### 비활성화된 탭

<!--
Disable specific tabs to prevent user interaction. Control whether disabled tabs can receive keyboard focus.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When `[softDisabled]="true"` on the tab list, disabled tabs can receive focus but cannot be activated. When `[softDisabled]="false"`, disabled tabs are skipped during keyboard navigation.
-->

특정 탭을 비활성화해서 사용자 조작을 막을 수 있습니다.
비활성화된 탭이 키보드 포커스를 받을 수 있는지도 제어할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/tabs/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

탭 목록의 `[softDisabled]="true"`이면 비활성화된 탭도 포커스를 받을 수 있지만 활성화할 수는 없습니다.
`[softDisabled]="false"`이면 키보드 탐색에서 비활성화된 탭을 건너뜁니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing tabs components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentHarness, HarnessLoader} from '@angular/cdk/testing';
import {TabsHarness} from '@angular/aria/tabs/testing';
import {MyTabsComponent} from './my-tabs'; // Your component

// A simple harness to help query content inside the tab panel
class TestContentHarness extends ComponentHarness {
  static hostSelector = '.test-content';
  async getText(): Promise<string> {
    return (await this.host()).text();
  }
}

describe('MyTabsComponent', () => {
  let fixture: ComponentFixture<MyTabsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyTabsComponent],
    });

    fixture = TestBed.createComponent(MyTabsComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should switch tabs and scope panel queries', async () => {
    const tabs = await loader.getHarness(TabsHarness);

    // Get all tabs
    const tabItems = await tabs.getTabs();
    expect(tabItems.length).toBe(3);

    // Verify initial selection
    expect(await tabItems[0].isSelected()).toBe(true);
    expect(await tabItems[1].isSelected()).toBe(false);

    // Query content inside the active tab panel
    // TabHarness automatically scopes queries to its associated panel
    const content = await tabItems[0].getHarness(TestContentHarness);
    expect(await content.getText()).toBe('Content 1');

    // Switch to the second tab
    await tabItems[1].select();

    // Verify selection updated
    expect(await tabItems[0].isSelected()).toBe(false);
    expect(await tabItems[1].isSelected()).toBe(true);
  });
});
```
-->

Angular Aria는 탭 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentHarness, HarnessLoader} from '@angular/cdk/testing';
import {TabsHarness} from '@angular/aria/tabs/testing';
import {MyTabsComponent} from './my-tabs'; // 테스트할 컴포넌트

// 탭 패널 안의 콘텐츠를 조회하는 간단한 하네스입니다.
class TestContentHarness extends ComponentHarness {
  static hostSelector = '.test-content';
  async getText(): Promise<string> {
    return (await this.host()).text();
  }
}

describe('MyTabsComponent', () => {
  let fixture: ComponentFixture<MyTabsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyTabsComponent],
    });

    fixture = TestBed.createComponent(MyTabsComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should switch tabs and scope panel queries', async () => {
    const tabs = await loader.getHarness(TabsHarness);

    // 모든 탭을 가져옵니다.
    const tabItems = await tabs.getTabs();
    expect(tabItems.length).toBe(3);

    // 초기 선택 상태를 확인합니다.
    expect(await tabItems[0].isSelected()).toBe(true);
    expect(await tabItems[1].isSelected()).toBe(false);

    // 활성화된 탭 패널 안의 콘텐츠를 조회합니다.
    // TabHarness는 조회 범위를 연결된 패널로 자동 제한합니다.
    const content = await tabItems[0].getHarness(TestContentHarness);
    expect(await content.getText()).toBe('Content 1');

    // 두 번째 탭으로 전환합니다.
    await tabItems[1].select();

    // 선택 상태가 변경되었는지 확인합니다.
    expect(await tabItems[0].isSelected()).toBe(false);
    expect(await tabItems[1].isSelected()).toBe(true);
  });
});
```

<!--
## API reference

For detailed API documentation, inspect the following API references:

- [`Tabs`](/api/aria/tabs/Tabs)
- [`TabList`](/api/aria/tabs/TabList)
- [`Tab`](/api/aria/tabs/Tab)
- [`TabPanel`](/api/aria/tabs/TabPanel)
- [`TabContent`](/api/aria/tabs/TabContent)
-->

<a id="apis"></a>
<a id="api"></a>
<a id="api-reference"></a>

## API 레퍼런스

자세한 API 문서는 다음 API 레퍼런스를 참고하세요.

- [`Tabs`](/api/aria/tabs/Tabs)
- [`TabList`](/api/aria/tabs/TabList)
- [`Tab`](/api/aria/tabs/Tab)
- [`TabPanel`](/api/aria/tabs/TabPanel)
- [`TabContent`](/api/aria/tabs/TabContent)
