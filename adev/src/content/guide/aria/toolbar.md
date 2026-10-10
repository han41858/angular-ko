<!--
<docs-decorative-header title="Toolbar">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/" title="Toolbar ARIA pattern"/>
  <docs-pill href="/api/aria/toolbar/Toolbar" title="Toolbar API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="툴바">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/" title="툴바 ARIA 패턴"/>
  <docs-pill href="/api/aria/toolbar/Toolbar" title="툴바 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A container for grouping related controls and actions with keyboard navigation, commonly used for text formatting, toolbars, and command panels.

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
-->

관련 컨트롤과 작업을 그룹으로 묶고 키보드 탐색을 제공하는 컨테이너입니다.
텍스트 서식 지정, 툴바, 명령 패널에 주로 사용합니다.

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

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Toolbar works best for grouping related controls that users access frequently. Consider using toolbar when:

- **Multiple related actions** - You have several controls that perform related functions (like text formatting buttons)
- **Keyboard efficiency matters** - Users benefit from quick keyboard navigation through arrow keys
- **Grouped controls** - You need to organize controls into logical sections with separators
- **Frequent access** - Controls are used repeatedly within a workflow

Avoid toolbar when:

- A simple button group is sufficient - For just 2-3 unrelated actions, individual buttons work better
- Controls aren't related - Toolbar implies a logical grouping; unrelated controls confuse users
- Complex nested navigation - Deep hierarchies are better served by menus or navigation components
-->

툴바는 사용자가 자주 사용하는 관련 컨트롤을 그룹으로 묶을 때 적합합니다.
다음과 같은 경우에 툴바 사용을 고려하세요.

- **여러 관련 작업**: 텍스트 서식 버튼처럼 서로 관련된 기능을 수행하는 컨트롤이 여러 개 있을 때
- **효율적인 키보드 조작**: 방향키를 이용한 빠른 키보드 탐색이 사용자에게 도움이 될 때
- **컨트롤 그룹화**: 구분선으로 컨트롤을 논리적인 섹션으로 구성해야 할 때
- **반복 사용**: 작업 흐름에서 컨트롤을 반복해서 사용할 때

다음과 같은 경우에는 툴바를 피하세요.

- 간단한 버튼 그룹으로 충분한 경우: 관련 없는 작업이 2~3개뿐이라면 개별 버튼이 더 적합합니다.
- 컨트롤이 서로 관련 없는 경우: 툴바는 논리적인 그룹을 의미하므로 관련 없는 컨트롤은 사용자에게 혼란을 줍니다.
- 복잡하게 중첩된 탐색: 계층이 깊다면 메뉴나 탐색 컴포넌트가 더 적합합니다.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
Angular's toolbar provides a fully accessible toolbar implementation with:

- **Keyboard Navigation** - Navigate widgets with arrow keys, activate with Enter or Space
- **Screen Reader Support** - Built-in ARIA attributes for assistive technologies
- **Widget Groups** - Organize related widgets like radio button groups or toggle button groups
- **Flexible Orientation** - Horizontal or vertical layouts with automatic keyboard navigation
- **Signal-Based Reactivity** - Reactive state management using Angular signals
- **Bidirectional Text Support** - Automatically handles right-to-left (RTL) languages
- **Configurable Focus** - Choose between wrapping navigation or hard stops at edges
-->

Angular의 툴바는 다음과 같이 접근성을 갖춘 툴바 구현을 제공합니다.

- **키보드 탐색**: 방향키로 위젯을 탐색하고 Enter나 Space로 활성화합니다.
- **스크린 리더 지원**: 보조 기술을 위한 ARIA 어트리뷰트를 기본 제공합니다.
- **위젯 그룹**: 라디오 버튼 그룹이나 토글 버튼 그룹처럼 관련 위젯을 구성합니다.
- **유연한 방향 설정**: 수평/수직 배치에 맞춰 키보드 탐색을 자동으로 처리합니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.
- **양방향 텍스트 지원**: 오른쪽에서 왼쪽으로 쓰는 언어(RTL)를 자동으로 처리합니다.
- **포커스 설정**: 탐색을 순환하거나 경계에서 멈추도록 선택합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Basic horizontal toolbar
-->

<a id="basic-horizontal-toolbar"></a>

### 기본 수평 툴바

<!--
Horizontal toolbars organize controls from left to right, matching the common pattern in text editors and design tools. Arrow keys navigate between widgets, maintaining focus within the toolbar until users press Tab to move to the next page element.

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
-->

수평 툴바는 텍스트 에디터와 디자인 도구에서 흔히 사용하는 방식으로 컨트롤을 왼쪽에서 오른쪽으로 배치합니다.
방향키로 위젯 사이를 이동하며, 사용자가 Tab을 눌러 페이지의 다음 엘리먼트로 이동할 때까지 포커스를 툴바 안에 유지합니다.

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

<!--
### Vertical toolbar
-->

<a id="vertical-toolbar"></a>

### 수직 툴바

<!--
Vertical toolbars stack controls top to bottom, useful for side panels or vertical command palettes. Up and down arrow keys navigate between widgets.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

수직 툴바는 컨트롤을 위에서 아래로 쌓아 배치하므로 사이드 패널이나 수직 명령 팔레트에 유용합니다.
위/아래 방향키로 위젯 사이를 이동합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/vertical/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
### Widget groups
-->

<a id="widget-groups"></a>

### 위젯 그룹

<!--
Widget groups contain related controls that work together, like text alignment options or list formatting choices. Groups maintain their own internal state while participating in toolbar navigation.

In the examples above, the alignment buttons are wrapped in `ngToolbarWidgetGroup` with `role="radiogroup"` to create a mutually exclusive selection group.

The `multi` input controls whether multiple widgets within a group can be selected simultaneously:

```html {highlight: [15]}
<!- Single selection (radio group) ->
<div ngToolbarWidgetGroup role="radiogroup" aria-label="Alignment">
  <button ngToolbarWidget value="left">Left</button>
  <button ngToolbarWidget value="center">Center</button>
  <button ngToolbarWidget value="right">Right</button>
</div>

<!- Multiple selection (toggle group) ->
<div ngToolbarWidgetGroup [multi]="true" aria-label="Formatting">
  <button ngToolbarWidget value="bold">Bold</button>
  <button ngToolbarWidget value="italic">Italic</button>
  <button ngToolbarWidget value="underline">Underline</button>
</div>
```
-->

위젯 그룹은 텍스트 정렬 옵션이나 목록 서식 선택처럼 함께 동작하는 관련 컨트롤을 담습니다.
그룹은 자체 내부 상태를 유지하면서 툴바 탐색에 참여합니다.

위 예제에서는 정렬 버튼을 `role="radiogroup"`이 지정된 `ngToolbarWidgetGroup`으로 감싸서 한 번에 하나만 선택할 수 있는 그룹을 만듭니다.

`multi` 입력 프로퍼티는 그룹 안에서 여러 위젯을 동시에 선택할 수 있는지 제어합니다.

```html {highlight: [15]}
<!-- 단일 선택(라디오 그룹) -->
<div ngToolbarWidgetGroup role="radiogroup" aria-label="Alignment">
  <button ngToolbarWidget value="left">Left</button>
  <button ngToolbarWidget value="center">Center</button>
  <button ngToolbarWidget value="right">Right</button>
</div>

<!-- 다중 선택(토글 그룹) -->
<div ngToolbarWidgetGroup [multi]="true" aria-label="Formatting">
  <button ngToolbarWidget value="bold">Bold</button>
  <button ngToolbarWidget value="italic">Italic</button>
  <button ngToolbarWidget value="underline">Underline</button>
</div>
```

<!--
### Disabled widgets
-->

<a id="disabled-widgets"></a>

### 비활성화된 위젯

<!--
Toolbars support two disabled modes:

1. **Soft-disabled** widgets remain focusable but visually indicate they're unavailable
2. **Hard-disabled** widgets are completely removed from keyboard navigation.

By default, `softDisabled` is `true`, which allows disabled widgets to still receive focus. If you want to enable hard-disabled mode, set `[softDisabled]="false"` on the toolbar.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

툴바는 두 가지 비활성화 모드를 지원합니다.

1. **소프트 비활성화**된 위젯은 포커스를 받을 수 있으며 사용할 수 없다는 사실을 시각적으로 표시합니다.
2. **하드 비활성화**된 위젯은 키보드 탐색에서 완전히 제외됩니다.

`softDisabled`의 기본값은 `true`이므로 비활성화된 위젯도 포커스를 받을 수 있습니다.
하드 비활성화 모드를 사용하려면 툴바에 `[softDisabled]="false"`를 설정하세요.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
### Right-to-left (RTL) support
-->

<a id="right-to-left-rtl-support"></a>

### 오른쪽에서 왼쪽으로 쓰는 언어(RTL) 지원

<!--
Toolbars automatically support right-to-left languages. Wrap the toolbar in a container with `dir="rtl"` to reverse the layout and keyboard navigation direction. Arrow key navigation adjusts automatically: left arrow moves to the next widget, right arrow to the previous.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

툴바는 오른쪽에서 왼쪽으로 쓰는 언어를 자동으로 지원합니다.
툴바를 `dir="rtl"`이 지정된 컨테이너로 감싸면 배치 방향과 키보드 탐색 방향이 반대로 바뀝니다.
방향키 탐색도 자동으로 조정되어 왼쪽 방향키는 다음 위젯으로, 오른쪽 방향키는 이전 위젯으로 이동합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/toolbar/src/rtl/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing toolbar components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ToolbarHarness} from '@angular/aria/toolbar/testing';
import {MyToolbarComponent} from './my-toolbar'; // Your component

describe('MyToolbarComponent', () => {
  let fixture: ComponentFixture<MyToolbarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyToolbarComponent],
    });

    fixture = TestBed.createComponent(MyToolbarComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should have widgets and allow selection', async () => {
    // Load the toolbar harness
    const toolbar = await loader.getHarness(ToolbarHarness);

    // Get all widgets
    const widgets = await toolbar.getWidgets();
    expect(widgets.length).toBe(3);

    // Click the first widget
    await widgets[0].click();

    // Verify selection state
    expect(await widgets[0].isSelected()).toBe(true);
  });
});
```
-->

Angular Aria는 툴바 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ToolbarHarness} from '@angular/aria/toolbar/testing';
import {MyToolbarComponent} from './my-toolbar'; // 테스트할 컴포넌트

describe('MyToolbarComponent', () => {
  let fixture: ComponentFixture<MyToolbarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyToolbarComponent],
    });

    fixture = TestBed.createComponent(MyToolbarComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should have widgets and allow selection', async () => {
    // 툴바 하네스를 불러옵니다.
    const toolbar = await loader.getHarness(ToolbarHarness);

    // 모든 위젯을 가져옵니다.
    const widgets = await toolbar.getWidgets();
    expect(widgets.length).toBe(3);

    // 첫 번째 위젯을 클릭합니다.
    await widgets[0].click();

    // 선택 상태를 확인합니다.
    expect(await widgets[0].isSelected()).toBe(true);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### Toolbar Directive
-->

<a id="toolbar-directive"></a>

### Toolbar 디렉티브

<!--
The `ngToolbar` directive provides the container for toolbar functionality.
-->

`ngToolbar` 디렉티브는 툴바 기능을 위한 컨테이너를 제공합니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property       | Type                           | Default        | Description                                            |
| -------------- | ------------------------------ | -------------- | ------------------------------------------------------ |
| `orientation`  | `'vertical'` \| `'horizontal'` | `'horizontal'` | Whether toolbar is vertically or horizontally oriented |
| `disabled`     | `boolean`                      | `false`        | Disables the entire toolbar                            |
| `softDisabled` | `boolean`                      | `true`         | Whether disabled items can receive focus               |
| `wrap`         | `boolean`                      | `true`         | Whether focus should wrap at the edges                 |
| `value`        | `V[]`                          | `[]`           | Selected widget values (supports two-way binding)      |
-->

| 프로퍼티       | 타입                           | 기본값         | 설명                                                       |
| -------------- | ------------------------------ | -------------- | ---------------------------------------------------------- |
| `orientation`  | `'vertical'` \| `'horizontal'` | `'horizontal'` | 툴바를 수직이나 수평 중 어느 방향으로 배치할지 지정합니다. |
| `disabled`     | `boolean`                      | `false`        | 전체 툴바를 비활성화합니다.                                |
| `softDisabled` | `boolean`                      | `true`         | 비활성화된 항목이 포커스를 받을 수 있는지 지정합니다.      |
| `wrap`         | `boolean`                      | `true`         | 끝에 도달하면 포커스를 순환할지 지정합니다.                |
| `value`        | `V[]`                          | `[]`           | 선택된 위젯의 값입니다(양방향 바인딩을 지원합니다).        |

<!--
### ToolbarWidget Directive
-->

<a id="toolbarwidget-directive"></a>

### ToolbarWidget 디렉티브

<!--
The `ngToolbarWidget` directive marks an element as a navigable widget within the toolbar.
-->

`ngToolbarWidget` 디렉티브는 엘리먼트를 툴바 안에서 탐색 가능한 위젯으로 지정합니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property   | Type      | Default | Description                                     |
| ---------- | --------- | ------- | ----------------------------------------------- |
| `id`       | `string`  | auto    | Unique identifier for the widget                |
| `disabled` | `boolean` | `false` | Disables the widget                             |
| `value`    | `V`       | -       | The value associated with the widget (required) |
-->

| 프로퍼티   | 타입      | 기본값    | 설명                          |
| ---------- | --------- | --------- | ----------------------------- |
| `id`       | `string`  | 자동 생성 | 위젯의 고유 식별자입니다.     |
| `disabled` | `boolean` | `false`   | 위젯을 비활성화합니다.        |
| `value`    | `V`       | -         | 위젯에 연결된 값입니다(필수). |

<!--
#### Signals
-->

<a id="signals"></a>

#### 시그널

<!--
| Property   | Type              | Description                                 |
| ---------- | ----------------- | ------------------------------------------- |
| `active`   | `Signal<boolean>` | Whether the widget is currently focused     |
| `selected` | `Signal<boolean>` | Whether the widget is selected (in a group) |
-->

| 프로퍼티   | 타입              | 설명                                        |
| ---------- | ----------------- | ------------------------------------------- |
| `active`   | `Signal<boolean>` | 현재 위젯에 포커스가 있는지 나타냅니다.     |
| `selected` | `Signal<boolean>` | 그룹에서 위젯이 선택되어 있는지 나타냅니다. |

<!--
### ToolbarWidgetGroup Directive
-->

<a id="toolbarwidgetgroup-directive"></a>

### ToolbarWidgetGroup 디렉티브

<!--
The `ngToolbarWidgetGroup` directive groups related widgets together.
-->

`ngToolbarWidgetGroup` 디렉티브는 관련 위젯을 그룹으로 묶습니다.

<!--
#### Inputs
-->

<a id="inputs-2"></a>

#### 입력 프로퍼티

<!--
| Property   | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `disabled` | `boolean` | `false` | Disables all widgets in the group        |
| `multi`    | `boolean` | `false` | Whether multiple widgets can be selected |
-->

| 프로퍼티   | 타입      | 기본값  | 설명                                     |
| ---------- | --------- | ------- | ---------------------------------------- |
| `disabled` | `boolean` | `false` | 그룹의 모든 위젯을 비활성화합니다.       |
| `multi`    | `boolean` | `false` | 여러 위젯을 선택할 수 있는지 지정합니다. |

<!--
### Related components
-->

<a id="related-components"></a>

### 관련 컴포넌트

<!--
Toolbar can contain various widget types including buttons, trees, and comboboxes. See individual component documentation for specific widget implementations.

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/" title="Toolbar ARIA pattern"/>
  <docs-pill href="/api/aria/toolbar/Toolbar" title="Toolbar API Reference"/>
</docs-pill-row>
-->

툴바에는 버튼, 트리, 콤보박스 등 다양한 위젯 타입을 포함할 수 있습니다.
구체적인 위젯 구현은 각 컴포넌트의 문서를 참고하세요.

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/" title="툴바 ARIA 패턴"/>
  <docs-pill href="/api/aria/toolbar/Toolbar" title="툴바 API 레퍼런스"/>
</docs-pill-row>
