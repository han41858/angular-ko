<!--
<docs-decorative-header title="Menu">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" title="Menu ARIA pattern"/>
  <docs-pill href="/api/aria/menu/Menu" title="Menu API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="메뉴">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" title="메뉴 ARIA 패턴"/>
  <docs-pill href="/api/aria/menu/Menu" title="메뉴 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A menu offers a list of actions or options to users, typically appearing in response to a button click or right-click. Menus support keyboard navigation with arrow keys, submenus, checkboxes, radio buttons, and disabled items.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

메뉴는 사용자에게 작업이나 옵션 목록을 제공하며, 일반적으로 버튼을 클릭하거나 마우스 오른쪽 버튼을 클릭하면 나타납니다.
메뉴는 방향키를 이용한 키보드 탐색, 하위 메뉴, 체크박스, 라디오 버튼, 비활성화된 항목을 지원합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Menus work well for presenting lists of actions or commands that users can choose from.

**Use menus when:**

- Building application command menus (File, Edit, View)
- Creating context menus (right-click actions)
- Showing dropdown action lists
- Implementing toolbar dropdowns
- Organizing settings or options

**Avoid menus when:**

- Building site navigation (use navigation landmarks instead)
- Creating form selects (use the [Select](guide/aria/select) component)
- Switching between content panels (use [Tabs](guide/aria/tabs))
- Showing collapsible content (use [Accordion](guide/aria/accordion))
-->

메뉴는 사용자가 고를 수 있는 작업이나 명령 목록을 제공할 때 적합합니다.

**메뉴를 사용하기 좋은 경우:**

- 애플리케이션 명령 메뉴(File, Edit, View)를 만들 때
- 컨텍스트 메뉴(마우스 오른쪽 버튼 클릭으로 실행하는 작업)를 만들 때
- 드롭다운 작업 목록을 표시할 때
- 툴바 드롭다운을 구현할 때
- 설정이나 옵션을 정리할 때

**메뉴를 피해야 하는 경우:**

- 사이트 탐색 기능을 만들 때(탐색 랜드마크를 사용하세요)
- 폼의 선택 컨트롤을 만들 때([선택](guide/aria/select) 컴포넌트를 사용하세요)
- 콘텐츠 패널 사이를 전환할 때([탭](guide/aria/tabs)을 사용하세요)
- 접을 수 있는 콘텐츠를 표시할 때([아코디언](guide/aria/accordion)을 사용하세요)

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Keyboard navigation** - Arrow keys, Home/End, and character search for efficient navigation
- **Submenus** - Nested menu support with automatic positioning
- **Menu types** - Standalone menus, triggered menus, and menubars
- **Checkboxes and radios** - Toggle and selection menu items
- **Disabled items** - Soft or hard disabled states with focus management
- **Auto-close behavior** - Configurable close on selection
- **RTL support** - Right-to-left language navigation
-->

- **키보드 탐색**: 방향키, Home/End, 문자 검색으로 효율적으로 탐색합니다.
- **하위 메뉴**: 자동 위치 지정을 지원하는 중첩 메뉴를 제공합니다.
- **메뉴 유형**: 독립형 메뉴, 트리거로 여는 메뉴, 메뉴바를 지원합니다.
- **체크박스와 라디오 버튼**: 상태를 전환하거나 선택하는 메뉴 항목을 제공합니다.
- **비활성화된 항목**: 포커스가 가능한 비활성화 상태와 포커스를 받지 않는 비활성화 상태를 지원합니다.
- **자동 닫기 동작**: 선택 시 닫기 동작을 설정할 수 있습니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어의 탐색을 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Menu with trigger
-->

<a id="menu-with-trigger"></a>

### 트리거가 있는 메뉴

<!--
Create a dropdown menu by pairing a trigger button with a menu. The trigger opens and closes the menu.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

The menu automatically closes when a user selects an item or presses Escape.
-->

트리거 버튼과 메뉴를 연결해서 드롭다운 메뉴를 만듭니다.
트리거는 메뉴를 열고 닫습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

사용자가 항목을 선택하거나 Escape를 누르면 메뉴가 자동으로 닫힙니다.

<!--
### Context menu
-->

<a id="context-menu"></a>

### 컨텍스트 메뉴

<!--
Context menus appear at the cursor position when users right-click an element.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-context/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-context/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-context/app/app.html"/>
</docs-code-multifile>

Position the menu using the `contextmenu` event coordinates.
-->

사용자가 엘리먼트를 마우스 오른쪽 버튼으로 클릭하면 커서 위치에 컨텍스트 메뉴가 나타납니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-context/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-context/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-context/app/app.html"/>
</docs-code-multifile>

`contextmenu` 이벤트의 좌표로 메뉴 위치를 지정하세요.

<!--
### Standalone menu
-->

<a id="standalone-menu"></a>

### 독립형 메뉴

<!--
A standalone menu doesn't require a trigger and remains visible in the interface.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Standalone menus work well for always-visible action lists or navigation.
-->

독립형 메뉴는 트리거 없이 인터페이스에 계속 표시됩니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-standalone/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

독립형 메뉴는 항상 표시되는 작업 목록이나 탐색 기능에 적합합니다.

<!--
### Disabled menu items
-->

<a id="disabled-menu-items"></a>

### 비활성화된 메뉴 항목

<!--
Disable specific menu items using the `disabled` input. Control focus behavior with `softDisabled`.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When `[softDisabled]="true"`, disabled items can receive focus but cannot be activated. When `[softDisabled]="false"`, disabled items are skipped during keyboard navigation.
-->

`disabled` 입력 프로퍼티로 특정 메뉴 항목을 비활성화하세요.
포커스 동작은 `softDisabled`로 제어합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menu/src/menu-trigger-disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`[softDisabled]="true"`이면 비활성화된 항목도 포커스를 받을 수 있지만 활성화할 수는 없습니다.
`[softDisabled]="false"`이면 키보드 탐색에서 비활성화된 항목을 건너뜁니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing menu components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MenuHarness, MenuItemHarness} from '@angular/aria/menu/testing';
import {MyMenuComponent} from './my-menu'; // Your component

describe('MyMenuComponent', () => {
  let fixture: ComponentFixture<MyMenuComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMenuComponent],
    });

    fixture = TestBed.createComponent(MyMenuComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should open menu and click item', async () => {
    // Load the menu harness by its trigger text
    const menu = await loader.getHarness(MenuHarness.with({triggerText: 'Open Menu'}));

    // Verify initial state
    expect(await menu.isOpen()).toBe(false);

    // Open the menu
    await menu.open();
    expect(await menu.isOpen()).toBe(true);

    // Get items
    const items = await menu.getItems();
    expect(items.length).toBe(3);
    expect(await items[0].getText()).toBe('Item 1');

    // Click first item
    await items[0].click();

    // Menu should close after selection (depending on your implementation)
    expect(await menu.isOpen()).toBe(false);
  });

  it('should interact with submenus', async () => {
    const menu = await loader.getHarness(MenuHarness.with({triggerText: 'Open Menu'}));
    await menu.open();

    // Get the item that triggers a submenu
    const subItem = await loader.getHarness(MenuItemHarness.with({text: 'Submenu'}));
    expect(await subItem.hasSubmenu()).toBe(true);

    // Open submenu
    await subItem.click();
    const submenu = await subItem.getSubmenu();
    expect(submenu).toBeTruthy();
    expect(await submenu!.isOpen()).toBe(true);

    // Interact with submenu items
    const subItems = await submenu!.getItems();
    expect(subItems.length).toBe(1);
  });
});
```
-->

Angular Aria는 메뉴 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MenuHarness, MenuItemHarness} from '@angular/aria/menu/testing';
import {MyMenuComponent} from './my-menu'; // 테스트할 컴포넌트

describe('MyMenuComponent', () => {
  let fixture: ComponentFixture<MyMenuComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMenuComponent],
    });

    fixture = TestBed.createComponent(MyMenuComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should open menu and click item', async () => {
    // 트리거 텍스트로 메뉴 하네스를 불러옵니다.
    const menu = await loader.getHarness(MenuHarness.with({triggerText: 'Open Menu'}));

    // 초기 상태를 확인합니다.
    expect(await menu.isOpen()).toBe(false);

    // 메뉴를 엽니다.
    await menu.open();
    expect(await menu.isOpen()).toBe(true);

    // 항목을 가져옵니다.
    const items = await menu.getItems();
    expect(items.length).toBe(3);
    expect(await items[0].getText()).toBe('Item 1');

    // 첫 번째 항목을 클릭합니다.
    await items[0].click();

    // 선택 후 메뉴가 닫혀야 합니다(구현에 따라 다를 수 있습니다).
    expect(await menu.isOpen()).toBe(false);
  });

  it('should interact with submenus', async () => {
    const menu = await loader.getHarness(MenuHarness.with({triggerText: 'Open Menu'}));
    await menu.open();

    // 하위 메뉴를 여는 항목을 가져옵니다.
    const subItem = await loader.getHarness(MenuItemHarness.with({text: 'Submenu'}));
    expect(await subItem.hasSubmenu()).toBe(true);

    // 하위 메뉴를 엽니다.
    await subItem.click();
    const submenu = await subItem.getSubmenu();
    expect(submenu).toBeTruthy();
    expect(await submenu!.isOpen()).toBe(true);

    // 하위 메뉴 항목을 조작합니다.
    const subItems = await submenu!.getItems();
    expect(subItems.length).toBe(1);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### Menu
-->

<a id="menu"></a>

### Menu

<!--
The container directive for menu items.
-->

메뉴 항목의 컨테이너 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property       | Type      | Default | Description                                                   |
| -------------- | --------- | ------- | ------------------------------------------------------------- |
| `disabled`     | `boolean` | `false` | Disables all items in the menu                                |
| `wrap`         | `boolean` | `true`  | Whether keyboard navigation wraps at edges                    |
| `softDisabled` | `boolean` | `true`  | When `true`, disabled items are focusable but not interactive |
-->

| 프로퍼티       | 타입      | 기본값  | 설명                                                                       |
| -------------- | --------- | ------- | -------------------------------------------------------------------------- |
| `disabled`     | `boolean` | `false` | 메뉴의 모든 항목을 비활성화합니다.                                         |
| `wrap`         | `boolean` | `true`  | 키보드 탐색에서 끝에 도달하면 순환할지 지정합니다.                         |
| `softDisabled` | `boolean` | `true`  | `true`이면 비활성화된 항목도 포커스를 받을 수 있지만 조작할 수는 없습니다. |

<!--
#### Methods
-->

<a id="methods"></a>

#### 메서드

<!--
| Method  | Parameters | Description     |
| ------- | ---------- | --------------- |
| `close` | none       | Closes the menu |
-->

| 메서드  | 인자 | 설명             |
| ------- | ---- | ---------------- |
| `close` | 없음 | 메뉴를 닫습니다. |

<!--
### MenuBar
-->

<a id="menubar"></a>

### MenuBar

<!--
A horizontal container for multiple menus.
-->

여러 메뉴를 담는 수평 컨테이너입니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property       | Type      | Default | Description                                                   |
| -------------- | --------- | ------- | ------------------------------------------------------------- |
| `disabled`     | `boolean` | `false` | Disables the entire menubar                                   |
| `wrap`         | `boolean` | `true`  | Whether keyboard navigation wraps at edges                    |
| `softDisabled` | `boolean` | `true`  | When `true`, disabled items are focusable but not interactive |
-->

| 프로퍼티       | 타입      | 기본값  | 설명                                                                       |
| -------------- | --------- | ------- | -------------------------------------------------------------------------- |
| `disabled`     | `boolean` | `false` | 전체 메뉴바를 비활성화합니다.                                              |
| `wrap`         | `boolean` | `true`  | 키보드 탐색에서 끝에 도달하면 순환할지 지정합니다.                         |
| `softDisabled` | `boolean` | `true`  | `true`이면 비활성화된 항목도 포커스를 받을 수 있지만 조작할 수는 없습니다. |

<!--
### MenuItem
-->

<a id="menuitem"></a>

### MenuItem

<!--
An individual item within a menu.
-->

메뉴 안의 개별 항목입니다.

<!--
#### Inputs
-->

<a id="inputs-2"></a>

#### 입력 프로퍼티

<!--
| Property     | Type                                                  | Default      | Description                                          |
| ------------ | ----------------------------------------------------- | ------------ | ---------------------------------------------------- |
| `value`      | `any`                                                 | —            | **Required.** Value for this item                    |
| `role`       | `'menuitem' \| 'menuitemcheckbox' \| 'menuitemradio'` | `'menuitem'` | The ARIA role for the menu item                      |
| `disabled`   | `boolean`                                             | `false`      | Disables this menu item                              |
| `submenu`    | `Menu`                                                | —            | Reference to a submenu                               |
| `searchTerm` | `string`                                              | `''`         | Search term for typeahead (supports two-way binding) |
-->

| 프로퍼티     | 타입                                                  | 기본값       | 설명                                                              |
| ------------ | ----------------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| `value`      | `any`                                                 | —            | **필수.** 이 항목의 값입니다.                                     |
| `role`       | `'menuitem' \| 'menuitemcheckbox' \| 'menuitemradio'` | `'menuitem'` | 메뉴 항목의 ARIA 역할입니다.                                      |
| `disabled`   | `boolean`                                             | `false`      | 이 메뉴 항목을 비활성화합니다.                                    |
| `submenu`    | `Menu`                                                | —            | 하위 메뉴의 참조입니다.                                           |
| `searchTerm` | `string`                                              | `''`         | 문자 입력 검색에 사용할 검색어입니다(양방향 바인딩을 지원합니다). |

<!--
#### Signals
-->

<a id="signals"></a>

#### 시그널

<!--
| Property   | Type              | Description                                |
| ---------- | ----------------- | ------------------------------------------ |
| `active`   | `Signal<boolean>` | Whether the item currently has focus       |
| `expanded` | `Signal<boolean>` | Whether the submenu is expanded            |
| `hasPopup` | `Signal<boolean>` | Whether the item has an associated submenu |

NOTE: MenuItem does not expose public methods. Use the `submenu` input to associate submenus with menu items.
-->

| 프로퍼티   | 타입              | 설명                                         |
| ---------- | ----------------- | -------------------------------------------- |
| `active`   | `Signal<boolean>` | 현재 항목에 포커스가 있는지 나타냅니다.      |
| `expanded` | `Signal<boolean>` | 하위 메뉴가 펼쳐져 있는지 나타냅니다.        |
| `hasPopup` | `Signal<boolean>` | 항목에 연결된 하위 메뉴가 있는지 나타냅니다. |

NOTE: MenuItem은 공개 메서드를 제공하지 않습니다.
메뉴 항목에 하위 메뉴를 연결하려면 `submenu` 입력 프로퍼티를 사용하세요.

<!--
### MenuTrigger
-->

<a id="menutrigger"></a>

### MenuTrigger

<!--
A button or element that opens a menu.
-->

메뉴를 여는 버튼이나 엘리먼트입니다.

<!--
#### Inputs
-->

<a id="inputs-3"></a>

#### 입력 프로퍼티

<!--
| Property       | Type      | Default | Description                                |
| -------------- | --------- | ------- | ------------------------------------------ |
| `menu`         | `Menu`    | —       | **Required.** The menu to trigger          |
| `disabled`     | `boolean` | `false` | Disables the trigger                       |
| `softDisabled` | `boolean` | `true`  | When `true`, disabled trigger is focusable |
-->

| 프로퍼티       | 타입      | 기본값  | 설명                                                      |
| -------------- | --------- | ------- | --------------------------------------------------------- |
| `menu`         | `Menu`    | —       | **필수.** 열고 닫을 메뉴입니다.                           |
| `disabled`     | `boolean` | `false` | 트리거를 비활성화합니다.                                  |
| `softDisabled` | `boolean` | `true`  | `true`이면 비활성화된 트리거도 포커스를 받을 수 있습니다. |

<!--
#### Signals
-->

<a id="signals-1"></a>

#### 시그널

<!--
| Property   | Type              | Description                                |
| ---------- | ----------------- | ------------------------------------------ |
| `expanded` | `Signal<boolean>` | Whether the menu is currently open         |
| `hasPopup` | `Signal<boolean>` | Whether the trigger has an associated menu |
-->

| 프로퍼티   | 타입              | 설명                                      |
| ---------- | ----------------- | ----------------------------------------- |
| `expanded` | `Signal<boolean>` | 현재 메뉴가 열려 있는지 나타냅니다.       |
| `hasPopup` | `Signal<boolean>` | 트리거에 연결된 메뉴가 있는지 나타냅니다. |

<!--
#### Methods
-->

<a id="methods-1"></a>

#### 메서드

<!--
| Method   | Parameters | Description                  |
| -------- | ---------- | ---------------------------- |
| `open`   | none       | Opens the menu               |
| `close`  | none       | Closes the menu              |
| `toggle` | none       | Toggles the menu open/closed |
-->

| 메서드   | 인자 | 설명                                |
| -------- | ---- | ----------------------------------- |
| `open`   | 없음 | 메뉴를 엽니다.                      |
| `close`  | 없음 | 메뉴를 닫습니다.                    |
| `toggle` | 없음 | 메뉴의 열림/닫힘 상태를 전환합니다. |
