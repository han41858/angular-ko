<!--
# Combobox

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" title="Combobox ARIA pattern"/>
  <docs-pill href="/api?query=combobox#angular_aria_combobox" title="Combobox API Reference"/>
</docs-pill-row>
-->

# 콤보박스

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" title="콤보박스 ARIA 패턴"/>
  <docs-pill href="/api?query=combobox#angular_aria_combobox" title="콤보박스 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A directive that coordinates a trigger element (such as a text input, button, or `div`) with a popup, providing the primitive directive for autocomplete, select, and multiselect patterns.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

텍스트 입력란, 버튼, `div` 같은 트리거 엘리먼트와 팝업을 연결하는 디렉티브입니다.
자동 완성, 선택, 다중 선택 패턴의 기반이 됩니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/manual/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Combobox is the primitive directive that coordinates an interactive trigger element (such as a text input, button, or `div`) with a popup. It provides the foundation for autocomplete, select, and multiselect patterns. Consider using combobox directly when:

- **Building custom autocomplete patterns** - Creating specialized filtering or suggestion behavior
- **Creating custom selection components** - Developing dropdowns with unique requirements
- **Coordinating input with popup** - Pairing text input with listbox, tree, or dialog content
- **Implementing custom filtering** - Filtering and orchestrating matching options in user space

Use documented patterns instead when:

- Standard autocomplete with filtering is needed - See the [Autocomplete pattern](guide/aria/autocomplete) for ready-to-use examples
- Single-selection dropdowns are needed - See the [Select pattern](guide/aria/select) for complete dropdown implementation
- Multiple-selection dropdowns are needed - See the [Multiselect pattern](guide/aria/multiselect) for multi-select with compact display

NOTE: The [Autocomplete](guide/aria/autocomplete), [Select](guide/aria/select), and [Multiselect](guide/aria/multiselect) guides show documented patterns that combine this directive with [Listbox](guide/aria/listbox) for specific use cases.
-->

콤보박스는 텍스트 입력란, 버튼, `div` 같은 상호작용 트리거 엘리먼트와 팝업을 연결하는 기본 디렉티브입니다.
자동 완성, 선택, 다중 선택 패턴의 기반을 제공합니다.
다음과 같은 경우에는 콤보박스를 직접 사용하는 것을 고려하세요.

- **커스텀 자동 완성 패턴 개발**: 특수한 필터링이나 추천 동작을 만들 때
- **커스텀 선택 컴포넌트 개발**: 고유한 요구사항이 있는 드롭다운을 개발할 때
- **입력란과 팝업 연결**: 텍스트 입력란을 리스트박스, 트리, 대화상자 콘텐츠와 연결할 때
- **커스텀 필터링 구현**: 애플리케이션 코드에서 일치하는 옵션을 필터링하고 제어할 때

다음과 같은 경우에는 문서에서 소개하는 패턴을 사용하세요.

- 필터링을 지원하는 표준 자동 완성이 필요한 경우: 바로 사용할 수 있는 예제는 [자동 완성 패턴](guide/aria/autocomplete)을 참고하세요.
- 단일 선택 드롭다운이 필요한 경우: 완전한 드롭다운 구현은 [선택 패턴](guide/aria/select)을 참고하세요.
- 다중 선택 드롭다운이 필요한 경우: 선택 결과를 간결하게 표시하는 다중 선택은 [다중 선택 패턴](guide/aria/multiselect)을 참고하세요.

NOTE: [자동 완성](guide/aria/autocomplete), [선택](guide/aria/select), [다중 선택](guide/aria/multiselect) 가이드는 특정 사용 사례에 맞춰 이 디렉티브를 [리스트박스](guide/aria/listbox)와 결합하는 패턴을 소개합니다.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
Angular's combobox provides a fully accessible input-popup coordination system with:

- **Trigger Element with Popup** - Coordinates trigger element with popup content
- **Flexible Coordination** - Integrates seamlessly with standard layouts (listbox, tree, grid, or dialog)
- **Keyboard Navigation** - Arrow keys, Enter, Escape handling
- **Screen Reader Support** - Built-in ARIA attributes including role="combobox" and aria-expanded
- **Popup Management** - Automatic show/hide based on user interaction
- **Signal-Based Reactivity** - Reactive state management using Angular signals
-->

Angular의 콤보박스는 다음과 같이 접근성을 갖춘 입력란과 팝업의 연결 기능을 제공합니다.

- **팝업이 연결된 트리거 엘리먼트**: 트리거 엘리먼트와 팝업 콘텐츠를 연결합니다.
- **유연한 연결**: 리스트박스, 트리, 그리드, 대화상자와 같은 표준 레이아웃과 자연스럽게 통합합니다.
- **키보드 탐색**: 방향키, Enter, Escape를 처리합니다.
- **스크린 리더 지원**: role="combobox", aria-expanded를 비롯한 ARIA 어트리뷰트를 기본 제공합니다.
- **팝업 관리**: 사용자 조작에 따라 자동으로 표시하거나 숨깁니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Autocomplete
-->

<a id="autocomplete"></a>

### 자동 완성

<!--
An accessible input field that filters and suggests options as users type, helping them find and select values from a list.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Filtering is managed in user space by updating a signal that reactively filters the options list. Users navigate with arrow keys and select with Enter or click. This provides complete control and maximum flexibility for custom selection logic. See the [Autocomplete guide](guide/aria/autocomplete) for complete filtering patterns and examples.
-->

사용자가 입력할 때 옵션을 필터링하고 추천해서 목록에서 값을 찾고 선택하도록 돕는 접근성 있는 입력 필드입니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

필터링은 애플리케이션 코드에서 관리합니다.
시그널을 갱신하면 옵션 목록이 반응형으로 필터링됩니다.
사용자는 방향키로 탐색하고 Enter를 누르거나 클릭해서 선택합니다.
커스텀 선택 로직을 완전히 제어하고 유연하게 구성할 수 있습니다.
전체 필터링 패턴과 예제는 [자동 완성 가이드](guide/aria/autocomplete)를 참고하세요.

<!--
### Readonly mode
-->

<a id="readonly-mode"></a>

### 읽기 전용 모드

<!--
A pattern that combines a readonly combobox with listbox to create single-selection dropdowns with keyboard navigation and screen reader support.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Triggering a dropdown without text input can be achieved using a button as the host trigger, or applying the native HTML `readonly` attribute to the input trigger. The popup opens on click or arrow keys.

This configuration provides the foundation for the [Select](guide/aria/select) and [Multiselect](guide/aria/multiselect) patterns. See those guides for complete dropdown implementations with triggers and overlay positioning.
-->

읽기 전용 콤보박스와 리스트박스를 결합해서 키보드 탐색과 스크린 리더를 지원하는 단일 선택 드롭다운을 만드는 패턴입니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

텍스트 입력 없이 드롭다운을 열려면 버튼을 호스트 트리거로 사용하거나, 입력 트리거에 네이티브 HTML `readonly` 어트리뷰트를 적용하면 됩니다.
클릭하거나 방향키를 누르면 팝업이 열립니다.

이 구성은 [선택](guide/aria/select)과 [다중 선택](guide/aria/multiselect) 패턴의 기반이 됩니다.
트리거와 오버레이 위치 지정을 포함한 완전한 드롭다운 구현은 해당 가이드를 참고하세요.

<!--
### Datepicker grid
-->

<a id="datepicker-grid"></a>

### 날짜 선택기 그리드

<!--
Combobox can coordinate with a two-dimensional grid to create accessible datepickers. Users navigate dates inside the calendar grid table using directional arrow keys and confirm selection with click, Enter, or Spacebar.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

콤보박스를 2차원 그리드와 연결해서 접근성을 지원하는 날짜 선택기를 만들 수 있습니다.
사용자는 달력 그리드 표 안에서 방향키로 날짜를 탐색하고 클릭하거나 Enter 또는 Spacebar를 눌러 선택을 확정합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/datepicker/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
### Dialog popup
-->

<a id="dialog-popup"></a>

### 대화상자 팝업

<!--
Dialog popups combine the combobox trigger with standard dialog layouts and focus traps (such as CDK's `cdkTrapFocus`). Use dialog popups when the overlay requires modal behavior or backdrop interaction.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

대화상자 팝업은 콤보박스 트리거를 표준 대화상자 레이아웃 및 포커스 트랩(CDK의 `cdkTrapFocus` 등)과 결합합니다.
오버레이에 모달 동작이나 배경막과의 상호작용이 필요할 때 대화상자 팝업을 사용하세요.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/combobox/src/dialog/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides a `ComboboxHarness` for testing combobox components.
Here is an example of how to use the harness in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {MyComboboxComponent} from './my-combobox'; // Your component

describe('MyComboboxComponent', () => {
  let fixture: ComponentFixture<MyComboboxComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyComboboxComponent],
    });

    fixture = TestBed.createComponent(MyComboboxComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow opening and closing the popup', async () => {
    const combobox = await loader.getHarness(ComboboxHarness);

    // Verify initial state
    expect(await combobox.isOpen()).toBe(false);

    // Open the popup
    await combobox.open();
    expect(await combobox.isOpen()).toBe(true);

    // Close the popup
    await combobox.close();
    expect(await combobox.isOpen()).toBe(false);
  });
});
```
-->

Angular Aria는 콤보박스 컴포넌트를 테스트할 수 있는 `ComboboxHarness`를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {MyComboboxComponent} from './my-combobox'; // 테스트할 컴포넌트

describe('MyComboboxComponent', () => {
  let fixture: ComponentFixture<MyComboboxComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyComboboxComponent],
    });

    fixture = TestBed.createComponent(MyComboboxComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow opening and closing the popup', async () => {
    const combobox = await loader.getHarness(ComboboxHarness);

    // 초기 상태를 확인합니다.
    expect(await combobox.isOpen()).toBe(false);

    // 팝업을 엽니다.
    await combobox.open();
    expect(await combobox.isOpen()).toBe(true);

    // 팝업을 닫습니다.
    await combobox.close();
    expect(await combobox.isOpen()).toBe(false);
  });
});
```

<!--
## API reference

For detailed API documentation, inspect the following API references:

- [`Combobox`](/api/aria/combobox/Combobox)
- [`ComboboxPopup`](/api/aria/combobox/ComboboxPopup)
- [`ComboboxWidget`](/api/aria/combobox/ComboboxWidget)

### Related patterns and directives

Combobox is the primitive directive for these documented patterns:

- [Autocomplete](guide/aria/autocomplete) - Filtering and suggestions pattern (coordinates input typing with options list)
- [Select](guide/aria/select) - Single selection dropdown pattern (applied directly on non-editable button triggers)
- [Multiselect](guide/aria/multiselect) - Multiple selection pattern (applied on non-editable triggers with multi-enabled Listbox)

Combobox typically combines with:

- [Listbox](guide/aria/listbox) - Most common popup content
- [Tree](guide/aria/tree) - Hierarchical popup content (see Tree guide for examples)
-->

<a id="apis"></a>
<a id="api"></a>
<a id="api-reference"></a>

## API 레퍼런스

자세한 API 문서는 다음 API 레퍼런스를 참고하세요.

- [`Combobox`](/api/aria/combobox/Combobox)
- [`ComboboxPopup`](/api/aria/combobox/ComboboxPopup)
- [`ComboboxWidget`](/api/aria/combobox/ComboboxWidget)

### Related patterns and directives

Combobox is the primitive directive for these documented patterns:

- [Autocomplete](guide/aria/autocomplete) - Filtering and suggestions pattern (coordinates input typing with options list)
- [Select](guide/aria/select) - Single selection dropdown pattern (applied directly on non-editable button triggers)
- [Multiselect](guide/aria/multiselect) - Multiple selection pattern (applied on non-editable triggers with multi-enabled Listbox)

Combobox typically combines with:

- [Listbox](guide/aria/listbox) - Most common popup content
- [Tree](guide/aria/tree) - Hierarchical popup content (see Tree guide for examples)
