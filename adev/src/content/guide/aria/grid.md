<!--
<docs-decorative-header title="Grid">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/" title="Grid ARIA pattern"/>
  <docs-pill href="/api?query=grid#angular_aria_grid" title="Grid API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="그리드">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/" title="그리드 ARIA 패턴"/>
  <docs-pill href="/api?query=grid#angular_aria_grid" title="그리드 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A grid enables users to navigate two-dimensional data or interactive elements using directional arrow keys, Home, End, and Page Up/Down. Grids work for data tables, calendars, spreadsheets, and layout patterns that group related interactive elements.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.css"/>
</docs-code-multifile>
-->

그리드는 방향키, Home, End, Page Up/Down으로 2차원 데이터나 상호작용 엘리먼트를 탐색할 수 있게 합니다.
데이터 표, 달력, 스프레드시트, 관련 상호작용 엘리먼트를 그룹으로 묶는 레이아웃 패턴에 사용할 수 있습니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/overview/basic/app/app.css"/>
</docs-code-multifile>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Grids work well for data or interactive elements organized in rows and columns where users need keyboard navigation in multiple directions.

**Use grids when:**

- Building interactive data tables with editable or selectable cells
- Creating calendars or date pickers
- Implementing spreadsheet-like interfaces
- Grouping interactive elements (buttons, checkboxes) to reduce tab stops on a page
- Building interfaces requiring two-dimensional keyboard navigation

**Avoid grids when:**

- Displaying simple read-only tables (use semantic HTML `<table>` instead)
- Showing single-column lists (use [Listbox](guide/aria/listbox) instead)
- Displaying hierarchical data (use [Tree](guide/aria/tree) instead)
- Building forms without tabular layout (use standard form controls)
-->

그리드는 데이터나 상호작용 엘리먼트를 행과 열로 구성하고, 사용자가 여러 방향으로 키보드 탐색을 해야 하는 경우에 적합합니다.

**그리드를 사용하기 좋은 경우:**

- 편집하거나 선택할 수 있는 셀이 있는 상호작용 데이터 표를 만들 때
- 달력이나 날짜 선택기를 만들 때
- 스프레드시트와 비슷한 인터페이스를 구현할 때
- 상호작용 엘리먼트(버튼, 체크박스)를 묶어서 페이지의 Tab 키 이동 지점을 줄일 때
- 2차원 키보드 탐색이 필요한 인터페이스를 만들 때

**그리드를 피해야 하는 경우:**

- 간단한 읽기 전용 표를 표시할 때(의미에 맞는 HTML `<table>`을 사용하세요)
- 열이 하나인 목록을 표시할 때([리스트박스](guide/aria/listbox)를 사용하세요)
- 계층형 데이터를 표시할 때([트리](guide/aria/tree)를 사용하세요)
- 표 형태가 아닌 폼을 만들 때(표준 폼 컨트롤을 사용하세요)

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Two-dimensional navigation** - Arrow keys move between cells in all directions
- **Focus modes** - Choose between roving tabindex or activedescendant focus strategies
- **Selection support** - Optional cell selection with single or multi-select modes
- **Wrapping behavior** - Configure how navigation wraps at grid edges (continuous, loop, or nowrap)
- **Range selection** - Select multiple cells with modifier keys or dragging
- **Disabled states** - Disable the entire grid or individual cells
- **RTL support** - Automatic right-to-left language navigation
-->

- **2차원 탐색**: 방향키로 모든 방향의 셀 사이를 이동합니다.
- **포커스 모드**: roving tabindex 또는 activedescendant 포커스 전략을 선택합니다.
- **선택 지원**: 단일/다중 선택 모드로 셀 선택 기능을 활성화할 수 있습니다.
- **순환 동작**: 그리드 경계에서의 탐색 동작을 설정합니다(continuous, loop, nowrap).
- **범위 선택**: 보조 키나 드래그로 여러 셀을 선택합니다.
- **비활성화 상태**: 전체 그리드나 개별 셀을 비활성화합니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어의 탐색을 자동으로 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Data table grid
-->

<a id="data-table-grid"></a>

### 데이터 표 그리드

<!--
Use a grid for interactive tables where users need to navigate between cells using arrow keys. This example shows a basic data table with keyboard navigation.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/table/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/table/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Apply the `ngGrid` directive to the table element, `ngGridRow` to each row, and `ngGridCell` to each cell.
-->

사용자가 방향키로 셀 사이를 이동해야 하는 상호작용 표에 그리드를 사용하세요.
이 예제는 키보드 탐색을 지원하는 기본 데이터 표입니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/table/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/table/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/table/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/table/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

표 엘리먼트에는 `ngGrid` 디렉티브를, 각 행에는 `ngGridRow`를, 각 셀에는 `ngGridCell`을 적용하세요.

<!--
### Calendar grid
-->

<a id="calendar-grid"></a>

### 달력 그리드

<!--
Calendars are a common use case for grids. This example shows a month view where users navigate dates using arrow keys.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Users can activate a date by pressing Enter or Space when focused on a cell.
-->

달력은 그리드의 대표적인 사용 사례입니다.
이 예제는 사용자가 방향키로 날짜를 탐색하는 월간 달력입니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/calendar/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

사용자는 셀에 포커스가 있을 때 Enter나 Space를 눌러 날짜를 활성화할 수 있습니다.

<!--
### Layout grid
-->

<a id="layout-grid"></a>

### 레이아웃 그리드

<!--
Use a layout grid to group interactive elements and reduce tab stops. This example shows a grid of pill buttons.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Instead of tabbing through each button, users navigate with arrow keys and only one button receives tab focus.
-->

상호작용 엘리먼트를 묶고 Tab 키 이동 지점을 줄이려면 레이아웃 그리드를 사용하세요.
이 예제는 알약 모양 버튼으로 구성된 그리드입니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/grid/src/pill-list/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

각 버튼을 Tab 키로 이동하는 대신 방향키로 탐색하며, 버튼 중 하나만 Tab 키로 포커스를 받습니다.

<!--
### Selection and focus modes
-->

<a id="selection-and-focus-modes"></a>

### 선택 모드와 포커스 모드

<!--
Enable selection with `[enableSelection]="true"` and configure how focus and selection interact.

```angular-html
<table
  ngGrid
  [enableSelection]="true"
  [selectionMode]="'explicit'"
  [multi]="true"
  [focusMode]="'roving'"
>
  <tr ngGridRow>
    <td ngGridCell>Cell 1</td>
    <td ngGridCell>Cell 2</td>
  </tr>
</table>
```

**Selection modes:**

- `follow`: Focused cell is automatically selected
- `explicit`: Users select cells with Space or click

**Focus modes:**

- `roving`: Focus moves to cells using `tabindex` (better for simple grids)
- `activedescendant`: Focus stays on grid container, `aria-activedescendant` indicates active cell (better for virtual scrolling)
-->

`[enableSelection]="true"`로 선택을 활성화하고 포커스와 선택이 어떻게 연동되는지 설정하세요.

```angular-html
<table
  ngGrid
  [enableSelection]="true"
  [selectionMode]="'explicit'"
  [multi]="true"
  [focusMode]="'roving'"
>
  <tr ngGridRow>
    <td ngGridCell>Cell 1</td>
    <td ngGridCell>Cell 2</td>
  </tr>
</table>
```

**선택 모드:**

- `follow`: 포커스가 있는 셀을 자동으로 선택합니다.
- `explicit`: 사용자가 Space를 누르거나 클릭해서 셀을 선택합니다.

**포커스 모드:**

- `roving`: `tabindex`를 사용해서 셀로 포커스를 이동합니다(간단한 그리드에 더 적합합니다).
- `activedescendant`: 포커스는 그리드 컨테이너에 두고 `aria-activedescendant`로 활성 셀을 나타냅니다(가상 스크롤에 더 적합합니다).

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing grid components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {GridHarness} from '@angular/aria/grid/testing';
import {MyGridComponent} from './my-grid'; // Your component

describe('MyGridComponent', () => {
  let fixture: ComponentFixture<MyGridComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyGridComponent],
    });

    fixture = TestBed.createComponent(MyGridComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should read cell values and focus cells', async () => {
    const grid = await loader.getHarness(GridHarness);

    // Get all cells text in a 2D array organized by rows
    const cellTexts = await grid.getCellTextByIndex();
    expect(cellTexts).toEqual([
      ['Cell 1.1', 'Cell 1.2'],
      ['Cell 2.1', 'Cell 2.2'],
    ]);

    // Get a specific cell by text
    const cells = await grid.getCells({text: 'Cell 1.1'});
    expect(cells.length).toBe(1);
    const cell = cells[0];

    // Verify cell state
    expect(await cell.isSelected()).toBe(true);
    expect(await cell.isActive()).toBe(true);

    // Focus the cell
    await cell.focus();
    expect(await cell.isFocused()).toBe(true);
  });
});
```
-->

Angular Aria는 그리드 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {GridHarness} from '@angular/aria/grid/testing';
import {MyGridComponent} from './my-grid'; // 테스트할 컴포넌트

describe('MyGridComponent', () => {
  let fixture: ComponentFixture<MyGridComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyGridComponent],
    });

    fixture = TestBed.createComponent(MyGridComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should read cell values and focus cells', async () => {
    const grid = await loader.getHarness(GridHarness);

    // 모든 셀의 텍스트를 행별로 구성한 2차원 배열로 가져옵니다.
    const cellTexts = await grid.getCellTextByIndex();
    expect(cellTexts).toEqual([
      ['Cell 1.1', 'Cell 1.2'],
      ['Cell 2.1', 'Cell 2.2'],
    ]);

    // 텍스트로 특정 셀을 가져옵니다.
    const cells = await grid.getCells({text: 'Cell 1.1'});
    expect(cells.length).toBe(1);
    const cell = cells[0];

    // 셀 상태를 확인합니다.
    expect(await cell.isSelected()).toBe(true);
    expect(await cell.isActive()).toBe(true);

    // 셀에 포커스를 둡니다.
    await cell.focus();
    expect(await cell.isFocused()).toBe(true);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### Grid
-->

<a id="grid"></a>

### Grid

<!--
The container directive that provides keyboard navigation and focus management for rows and cells.
-->

행과 셀에 키보드 탐색과 포커스 관리를 제공하는 컨테이너 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property               | Type                                 | Default    | Description                                                   |
| ---------------------- | ------------------------------------ | ---------- | ------------------------------------------------------------- |
| `enableSelection`      | `boolean`                            | `false`    | Whether selection is enabled for the grid                     |
| `disabled`             | `boolean`                            | `false`    | Disables the entire grid                                      |
| `softDisabled`         | `boolean`                            | `true`     | When `true`, disabled cells are focusable but not interactive |
| `focusMode`            | `'roving' \| 'activedescendant'`     | `'roving'` | Focus strategy used by the grid                               |
| `rowWrap`              | `'continuous' \| 'loop' \| 'nowrap'` | `'loop'`   | Navigation wrapping behavior along rows                       |
| `colWrap`              | `'continuous' \| 'loop' \| 'nowrap'` | `'loop'`   | Navigation wrapping behavior along columns                    |
| `multi`                | `boolean`                            | `false`    | Whether multiple cells can be selected                        |
| `selectionMode`        | `'follow' \| 'explicit'`             | `'follow'` | Whether selection follows focus or requires explicit action   |
| `enableRangeSelection` | `boolean`                            | `false`    | Enable range selections with modifier keys or dragging        |
-->

| 프로퍼티               | 타입                                 | 기본값     | 설명                                                                     |
| ---------------------- | ------------------------------------ | ---------- | ------------------------------------------------------------------------ |
| `enableSelection`      | `boolean`                            | `false`    | 그리드의 선택 기능을 활성화할지 지정합니다.                              |
| `disabled`             | `boolean`                            | `false`    | 전체 그리드를 비활성화합니다.                                            |
| `softDisabled`         | `boolean`                            | `true`     | `true`이면 비활성화된 셀도 포커스를 받을 수 있지만 조작할 수는 없습니다. |
| `focusMode`            | `'roving' \| 'activedescendant'`     | `'roving'` | 그리드에서 사용하는 포커스 전략입니다.                                   |
| `rowWrap`              | `'continuous' \| 'loop' \| 'nowrap'` | `'loop'`   | 행을 따라 탐색할 때의 순환 동작입니다.                                   |
| `colWrap`              | `'continuous' \| 'loop' \| 'nowrap'` | `'loop'`   | 열을 따라 탐색할 때의 순환 동작입니다.                                   |
| `multi`                | `boolean`                            | `false`    | 여러 셀을 선택할 수 있는지 지정합니다.                                   |
| `selectionMode`        | `'follow' \| 'explicit'`             | `'follow'` | 포커스에 따라 선택할지, 명시적인 동작이 필요한지 지정합니다.             |
| `enableRangeSelection` | `boolean`                            | `false`    | 보조 키나 드래그를 이용한 범위 선택을 활성화합니다.                      |

<!--
### GridRow
-->

<a id="gridrow"></a>

### GridRow

<!--
Represents a row within a grid and serves as a container for grid cells.
-->

그리드 안의 행을 나타내며 그리드 셀의 컨테이너 역할을 합니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property   | Type     | Default | Description                           |
| ---------- | -------- | ------- | ------------------------------------- |
| `rowIndex` | `number` | auto    | The index of this row within the grid |
-->

| 프로퍼티   | 타입     | 기본값    | 설명                             |
| ---------- | -------- | --------- | -------------------------------- |
| `rowIndex` | `number` | 자동 지정 | 그리드에서 이 행의 인덱스입니다. |

<!--
### GridCell
-->

<a id="gridcell"></a>

### GridCell

<!--
Represents an individual cell within a grid row.
-->

그리드 행 안의 개별 셀을 나타냅니다.

<!--
#### Inputs
-->

<a id="inputs-2"></a>

#### 입력 프로퍼티

<!--
| Property      | Type                         | Default        | Description                                             |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------- |
| `id`          | `string`                     | auto           | Unique identifier for the cell                          |
| `role`        | `string`                     | `'gridcell'`   | Cell role: `gridcell`, `columnheader`, or `rowheader`   |
| `disabled`    | `boolean`                    | `false`        | Disables this cell                                      |
| `selected`    | `boolean`                    | `false`        | Whether the cell is selected (supports two-way binding) |
| `selectable`  | `boolean`                    | `true`         | Whether the cell can be selected                        |
| `rowSpan`     | `number`                     | —              | Number of rows the cell spans                           |
| `colSpan`     | `number`                     | —              | Number of columns the cell spans                        |
| `rowIndex`    | `number`                     | —              | Row index of the cell                                   |
| `colIndex`    | `number`                     | —              | Column index of the cell                                |
| `orientation` | `'vertical' \| 'horizontal'` | `'horizontal'` | Orientation for widgets within the cell                 |
| `wrap`        | `boolean`                    | `true`         | Whether widget navigation wraps within the cell         |
-->

| 프로퍼티      | 타입                         | 기본값         | 설명                                                                   |
| ------------- | ---------------------------- | -------------- | ---------------------------------------------------------------------- |
| `id`          | `string`                     | 자동 생성      | 셀의 고유 식별자입니다.                                                |
| `role`        | `string`                     | `'gridcell'`   | 셀의 역할입니다. `gridcell`, `columnheader`, `rowheader`를 사용합니다. |
| `disabled`    | `boolean`                    | `false`        | 이 셀을 비활성화합니다.                                                |
| `selected`    | `boolean`                    | `false`        | 셀이 선택되어 있는지 나타냅니다(양방향 바인딩을 지원합니다).           |
| `selectable`  | `boolean`                    | `true`         | 셀을 선택할 수 있는지 지정합니다.                                      |
| `rowSpan`     | `number`                     | —              | 셀이 차지하는 행의 수입니다.                                           |
| `colSpan`     | `number`                     | —              | 셀이 차지하는 열의 수입니다.                                           |
| `rowIndex`    | `number`                     | —              | 셀의 행 인덱스입니다.                                                  |
| `colIndex`    | `number`                     | —              | 셀의 열 인덱스입니다.                                                  |
| `orientation` | `'vertical' \| 'horizontal'` | `'horizontal'` | 셀 안의 위젯 방향입니다.                                               |
| `wrap`        | `boolean`                    | `true`         | 셀 안에서 위젯 탐색을 순환할지 지정합니다.                             |

<!--
#### Signals
-->

<a id="signals"></a>

#### 시그널

<!--
| Property | Type              | Description                          |
| -------- | ----------------- | ------------------------------------ |
| `active` | `Signal<boolean>` | Whether the cell currently has focus |
-->

| 프로퍼티 | 타입              | 설명                                  |
| -------- | ----------------- | ------------------------------------- |
| `active` | `Signal<boolean>` | 현재 셀에 포커스가 있는지 나타냅니다. |

<!--
### GridCellWidget
-->

<a id="gridcellwidget"></a>

### GridCellWidget

<!--
Applied to an interactive element inside a grid cell to allow for pausing grid navigation.
-->

그리드 탐색을 일시 중지할 수 있도록 그리드 셀 안의 상호작용 엘리먼트에 적용합니다.

<!--
#### Inputs
-->

<a id="inputs-3"></a>

#### 입력 프로퍼티

<!--
| Property      | Type                                  | Default    | Description                                               |
| ------------- | ------------------------------------- | ---------- | --------------------------------------------------------- |
| `id`          | `string`                              | auto       | Unique identifier for the widget                          |
| `widgetType`  | `'simple' \| 'complex' \| 'editable'` | `'simple'` | The widget type, controlling how activation behaves       |
| `disabled`    | `boolean`                             | `false`    | Disables this cell widget                                 |
| `focusTarget` | `ElementResolver<HTMLElement>`        | —          | Optional element reference to receive focus on activation |
| `tabindex`    | `number`                              | —          | Tabindex override for the widget                          |
-->

| 프로퍼티      | 타입                                  | 기본값     | 설명                                                        |
| ------------- | ------------------------------------- | ---------- | ----------------------------------------------------------- |
| `id`          | `string`                              | 자동 생성  | 위젯의 고유 식별자입니다.                                   |
| `widgetType`  | `'simple' \| 'complex' \| 'editable'` | `'simple'` | 활성화 동작을 제어하는 위젯 타입입니다.                     |
| `disabled`    | `boolean`                             | `false`    | 이 셀 위젯을 비활성화합니다.                                |
| `focusTarget` | `ElementResolver<HTMLElement>`        | —          | 활성화할 때 포커스를 받을 엘리먼트의 참조입니다(선택 사항). |
| `tabindex`    | `number`                              | —          | 위젯의 tabindex를 재정의합니다.                             |

<!--
#### Outputs
-->

<a id="outputs"></a>

#### 출력 프로퍼티

<!--
| Property      | Type                                                     | Description                                    |
| ------------- | -------------------------------------------------------- | ---------------------------------------------- |
| `activated`   | `EventEmitter<KeyboardEvent \| FocusEvent \| undefined>` | Emits when the cell widget becomes activated   |
| `deactivated` | `EventEmitter<KeyboardEvent \| FocusEvent \| undefined>` | Emits when the cell widget becomes deactivated |
-->

| 프로퍼티      | 타입                                                     | 설명                                           |
| ------------- | -------------------------------------------------------- | ---------------------------------------------- |
| `activated`   | `EventEmitter<KeyboardEvent \| FocusEvent \| undefined>` | 셀 위젯이 활성화될 때 이벤트를 발생시킵니다.   |
| `deactivated` | `EventEmitter<KeyboardEvent \| FocusEvent \| undefined>` | 셀 위젯이 비활성화될 때 이벤트를 발생시킵니다. |

<!--
#### Methods
-->

<a id="methods"></a>

#### 메서드

<!--
| Method       | Parameters | Description                       |
| ------------ | ---------- | --------------------------------- |
| `activate`   | none       | Forcefully activates the widget   |
| `deactivate` | none       | Forcefully deactivates the widget |
-->

| 메서드       | 인자 | 설명                          |
| ------------ | ---- | ----------------------------- |
| `activate`   | 없음 | 위젯을 강제로 활성화합니다.   |
| `deactivate` | 없음 | 위젯을 강제로 비활성화합니다. |
