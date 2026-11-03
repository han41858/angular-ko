<!--
# Tree

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/" title="Tree ARIA pattern"/>
  <docs-pill href="/api/aria/tree/Tree" title="Tree API Reference"/>
</docs-pill-row>
-->

# 트리

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/" title="트리 ARIA 패턴"/>
  <docs-pill href="/api/aria/tree/Tree" title="트리 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A tree displays hierarchical data where items can expand to reveal children or collapse to hide them. Users navigate with arrow keys, expand and collapse nodes, and optionally select items for navigation or data selection scenarios.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.css"/>
</docs-code-multifile>
-->

트리는 계층형 데이터를 표시합니다.
항목을 펼치면 자식 항목이 나타나고 접으면 숨겨집니다.
사용자는 방향키로 탐색하고 노드를 펼치거나 접을 수 있으며, 탐색이나 데이터 선택 용도에 따라 항목을 선택할 수도 있습니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.css"/>
</docs-code-multifile>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Trees work well for displaying hierarchical data where users need to navigate through nested structures.

**Use trees when:**

- Building file system navigation
- Showing folder and document hierarchies
- Creating nested menu structures
- Displaying organization charts
- Browsing hierarchical data
- Implementing site navigation with nested sections

**Avoid trees when:**

- Displaying flat lists (use [Listbox](guide/aria/listbox) instead)
- Showing data tables (use [Grid](guide/aria/grid) instead)
- Creating simple dropdowns (use [Select](guide/aria/select) instead)
- Building breadcrumb navigation (use breadcrumb patterns)
-->

트리는 사용자가 중첩된 구조를 탐색해야 하는 계층형 데이터를 표시할 때 적합합니다.

**트리를 사용하기 좋은 경우:**

- 파일 시스템 탐색 기능을 만들 때
- 폴더와 문서의 계층 구조를 표시할 때
- 중첩된 메뉴 구조를 만들 때
- 조직도를 표시할 때
- 계층형 데이터를 탐색할 때
- 중첩된 섹션이 있는 사이트 탐색 기능을 구현할 때

**트리를 피해야 하는 경우:**

- 평면적인 목록을 표시할 때([리스트박스](guide/aria/listbox)를 사용하세요)
- 데이터 표를 표시할 때([그리드](guide/aria/grid)를 사용하세요)
- 간단한 드롭다운을 만들 때([선택](guide/aria/select)을 사용하세요)
- 이동 경로 탐색을 만들 때(이동 경로 패턴을 사용하세요)

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Hierarchical navigation** - Nested tree structure with expand and collapse functionality
- **Selection modes** - Single or multi-selection with explicit or follow-focus behavior
- **Selection follows focus** - Optional automatic selection when focus changes
- **Keyboard navigation** - Arrow keys, Home, End, and type-ahead search
- **Expand/collapse** - Right/Left arrows or Enter to toggle parent nodes
- **Disabled items** - Disable specific nodes with focus management
- **Focus modes** - Roving tabindex or activedescendant focus strategies
- **RTL support** - Right-to-left language navigation
-->

- **계층형 탐색**: 펼치기와 접기 기능이 있는 중첩 트리 구조를 제공합니다.
- **선택 모드**: 명시적으로 선택하거나 포커스에 따라 선택하는 단일/다중 선택을 지원합니다.
- **포커스에 따른 선택**: 포커스가 바뀔 때 자동으로 선택하도록 설정할 수 있습니다.
- **키보드 탐색**: 방향키, Home, End, 문자 입력 검색을 지원합니다.
- **펼치기/접기**: 오른쪽/왼쪽 방향키나 Enter로 부모 노드의 펼침 상태를 전환합니다.
- **비활성화된 항목**: 특정 노드를 비활성화하고 포커스를 관리합니다.
- **포커스 모드**: roving tabindex 또는 activedescendant 포커스 전략을 사용합니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어의 탐색을 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Navigation tree
-->

<a id="navigation-tree"></a>

### 탐색 트리

<!--
Use a tree for navigation where clicking items triggers actions rather than selecting them.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Set `[nav]="true"` to enable navigation mode. This uses `aria-current` to indicate the current page instead of selection.
-->

항목을 클릭하면 선택하는 대신 작업을 실행하는 탐색 용도로 트리를 사용할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/nav/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`[nav]="true"`로 설정하면 탐색 모드가 활성화됩니다.
이 모드에서는 선택 상태 대신 `aria-current`로 현재 페이지를 나타냅니다.

<!--
### Single selection
-->

<a id="single-selection"></a>

### 단일 선택

<!--
Enable single selection for scenarios where users choose one item from the tree.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Leave `[multi]="false"` (the default) for single selection. Users press Space to select the focused item.
-->

사용자가 트리에서 항목을 하나만 골라야 한다면 단일 선택을 활성화하세요.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

단일 선택에는 `[multi]="false"`(기본값)를 유지하세요.
사용자는 Space를 눌러 포커스가 있는 항목을 선택합니다.

<!--
### Multi-selection
-->

<a id="multi-selection"></a>

### 다중 선택

<!--
Allow users to select multiple items from the tree.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Set `[multi]="true"` on the tree. Users select items individually with Space or select ranges with Shift+Arrow keys.
-->

사용자가 트리에서 여러 항목을 선택하도록 할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/multi-select/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/multi-select/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

트리에 `[multi]="true"`를 설정하세요.
사용자는 Space로 개별 항목을 선택하거나 Shift+방향키로 범위를 선택합니다.

<!--
### Selection follows focus
-->

<a id="selection-follows-focus"></a>

### 포커스에 따라 선택하기

<!--
When selection follows focus, the focused item is automatically selected. This simplifies interaction for navigation scenarios.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Set `[selectionMode]="'follow'"` on the tree. Selection automatically updates as users navigate with arrow keys.
-->

포커스에 따라 선택하도록 설정하면 포커스가 있는 항목이 자동으로 선택됩니다.
탐색 용도로 사용할 때 조작을 단순화할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/single-select-follow-focus/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

트리에 `[selectionMode]="'follow'"`를 설정하세요.
사용자가 방향키로 탐색할 때 선택 상태가 자동으로 변경됩니다.

<!--
### Disabled tree items
-->

<a id="disabled-tree-items"></a>

### 비활성화된 트리 항목

<!--
Disable specific tree nodes to prevent interaction. Control whether disabled items can receive focus.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When `[softDisabled]="true"` on the tree, disabled items can receive focus but cannot be activated or selected. When `[softDisabled]="false"`, disabled items are skipped during keyboard navigation.
-->

특정 트리 노드를 비활성화해서 조작을 막을 수 있습니다.
비활성화된 항목이 포커스를 받을 수 있는지도 제어할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/tree/src/disabled-focusable/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

트리의 `[softDisabled]="true"`이면 비활성화된 항목도 포커스를 받을 수 있지만 활성화하거나 선택할 수는 없습니다.
`[softDisabled]="false"`이면 키보드 탐색에서 비활성화된 항목을 건너뜁니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing tree components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {TreeHarness} from '@angular/aria/tree/testing';
import {MyTreeComponent} from './my-tree'; // Your component

describe('MyTreeComponent', () => {
  let fixture: ComponentFixture<MyTreeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyTreeComponent],
    });

    fixture = TestBed.createComponent(MyTreeComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should navigate and expand tree items', async () => {
    const tree = await loader.getHarness(TreeHarness);

    // Get top-level structure representation
    expect(await tree.getTreeStructure()).toEqual({
      children: [{text: 'public'}, {text: 'src'}, {text: 'package.json'}],
    });

    // Get all items (currently visible)
    const items = await tree.getItems();
    expect(items.length).toBe(3);

    // Expand the first item ('public')
    expect(await items[0].isExpanded()).toBe(false);
    await items[0].click();
    expect(await items[0].isExpanded()).toBe(true);

    // Verifying tree structure updates after expansion
    expect(await tree.getTreeStructure()).toEqual({
      children: [
        {
          text: 'public',
          children: [{text: 'index.html'}, {text: 'styles.css'}],
        },
        {text: 'src'},
        {text: 'package.json'},
      ],
    });
  });
});
```
-->

Angular Aria는 트리 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {TreeHarness} from '@angular/aria/tree/testing';
import {MyTreeComponent} from './my-tree'; // 테스트할 컴포넌트

describe('MyTreeComponent', () => {
  let fixture: ComponentFixture<MyTreeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyTreeComponent],
    });

    fixture = TestBed.createComponent(MyTreeComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should navigate and expand tree items', async () => {
    const tree = await loader.getHarness(TreeHarness);

    // 최상위 구조를 나타내는 값을 가져옵니다.
    expect(await tree.getTreeStructure()).toEqual({
      children: [{text: 'public'}, {text: 'src'}, {text: 'package.json'}],
    });

    // 현재 표시된 모든 항목을 가져옵니다.
    const items = await tree.getItems();
    expect(items.length).toBe(3);

    // 첫 번째 항목('public')을 펼칩니다.
    expect(await items[0].isExpanded()).toBe(false);
    await items[0].click();
    expect(await items[0].isExpanded()).toBe(true);

    // 펼친 뒤 트리 구조가 변경되었는지 확인합니다.
    expect(await tree.getTreeStructure()).toEqual({
      children: [
        {
          text: 'public',
          children: [{text: 'index.html'}, {text: 'styles.css'}],
        },
        {text: 'src'},
        {text: 'package.json'},
      ],
    });
  });
});
```

<!--
## API reference

For detailed API documentation, inspect the following API references:

- [`Tree`](/api/aria/tree/Tree)
- [`TreeItem`](/api/aria/tree/TreeItem)
- [`TreeItemGroup`](/api/aria/tree/TreeItemGroup)
-->

<a id="apis"></a>
<a id="api"></a>
<a id="api-reference"></a>

## API 레퍼런스

자세한 API 문서는 다음 API 레퍼런스를 참고하세요.

- [`Tree`](/api/aria/tree/Tree)
- [`TreeItem`](/api/aria/tree/TreeItem)
- [`TreeItemGroup`](/api/aria/tree/TreeItemGroup)
