<!--
<docs-decorative-header title="Menubar">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" title="Menubar ARIA pattern"/>
  <docs-pill href="/api/aria/menu/MenuBar" title="Menubar API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="메뉴바">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" title="메뉴바 ARIA 패턴"/>
  <docs-pill href="/api/aria/menu/MenuBar" title="메뉴바 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
The menubar is a horizontal navigation bar that provides persistent access to application menus. Menubars organize commands into logical categories like File, Edit, and View, helping users discover and execute application features through keyboard or mouse interaction.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

메뉴바는 애플리케이션 메뉴에 항상 접근할 수 있도록 제공하는 수평 탐색 막대입니다.
메뉴바는 명령을 File, Edit, View와 같은 논리적인 범주로 나눕니다.
사용자는 키보드나 마우스로 애플리케이션 기능을 찾고 실행할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Menubars work well for organizing application commands into persistent, discoverable navigation.

**Use menubars when:**

- Building application command bars (such as File, Edit, View, Insert, Format)
- Creating persistent navigation that stays visible across the interface
- Organizing commands into logical top-level categories
- Need horizontal menu navigation with keyboard support
- Building desktop-style application interfaces

**Avoid menubars when:**

- Building dropdown menus for individual actions (use [Menu with trigger](guide/aria/menu) instead)
- Creating context menus (use [Menu](guide/aria/menu) guide pattern)
- Simple standalone action lists (use [Menu](guide/aria/menu) instead)
- Mobile interfaces where horizontal space is limited
- Navigation belongs in a sidebar or header navigation pattern
-->

메뉴바는 애플리케이션 명령을 항상 표시되고 쉽게 찾을 수 있는 탐색 구조로 구성할 때 적합합니다.

**메뉴바를 사용하기 좋은 경우:**

- 애플리케이션 명령 막대(File, Edit, View, Insert, Format 등)를 만들 때
- 인터페이스에서 항상 표시되는 탐색 기능을 만들 때
- 명령을 논리적인 최상위 범주로 구성할 때
- 키보드를 지원하는 수평 메뉴 탐색이 필요할 때
- 데스크탑 스타일의 애플리케이션 인터페이스를 만들 때

**메뉴바를 피해야 하는 경우:**

- 개별 작업의 드롭다운 메뉴를 만들 때([트리거가 있는 메뉴](guide/aria/menu)를 사용하세요)
- 컨텍스트 메뉴를 만들 때([메뉴](guide/aria/menu) 가이드의 패턴을 사용하세요)
- 간단한 독립형 작업 목록을 만들 때([메뉴](guide/aria/menu)를 사용하세요)
- 가로 공간이 제한된 모바일 인터페이스
- 사이드바나 헤더 탐색 패턴에 배치하는 것이 적합한 탐색 기능

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Horizontal navigation** - Left/Right arrow keys move between top-level categories
- **Persistent visibility** - Always visible, not modal or dismissable
- **Hover-to-open** - Submenus open on hover after first keyboard or click interaction
- **Nested submenus** - Support multiple levels of menu depth
- **Keyboard navigation** - Arrow keys, Enter/Space, Escape, and typeahead search
- **Disabled states** - Disable entire menubar or individual items
- **RTL support** - Automatic right-to-left language navigation
-->

- **수평 탐색**: 왼쪽/오른쪽 방향키로 최상위 범주 사이를 이동합니다.
- **항상 표시**: 모달이 아니며 닫을 수 없고 항상 표시됩니다.
- **마우스를 올려 열기**: 처음 키보드로 조작하거나 클릭한 뒤에는 마우스를 올리면 하위 메뉴가 열립니다.
- **중첩 하위 메뉴**: 여러 단계 깊이의 메뉴를 지원합니다.
- **키보드 탐색**: 방향키, Enter/Space, Escape, 문자 입력 검색을 지원합니다.
- **비활성화 상태**: 전체 메뉴바나 개별 항목을 비활성화합니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어의 탐색을 자동으로 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Basic menubar
-->

<a id="basic-menubar"></a>

### 기본 메뉴바

<!--
A menubar provides persistent access to application commands organized into top-level categories. Users navigate between categories with Left/Right arrows and open menus with Enter or Down arrow.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Press Right arrow to move between File, Edit, and View. Press Enter or Down arrow to open a menu and navigate submenu items with Up/Down arrows.
-->

메뉴바는 최상위 범주로 구성된 애플리케이션 명령에 항상 접근할 수 있도록 합니다.
사용자는 왼쪽/오른쪽 방향키로 범주 사이를 이동하고 Enter나 아래 방향키로 메뉴를 엽니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

오른쪽 방향키를 눌러 File, Edit, View 사이를 이동하세요.
Enter나 아래 방향키로 메뉴를 열고, 위/아래 방향키로 하위 메뉴 항목을 탐색하세요.

<!--
### Disabled menubar items
-->

<a id="disabled-menubar-items"></a>

### 비활성화된 메뉴바 항목

<!--
Disable specific menu items or the entire menubar to prevent interaction. Control whether disabled items can receive keyboard focus with the `softDisabled` input.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When `[softDisabled]="true"` on the menubar, disabled items can receive focus but cannot be activated. When `[softDisabled]="false"`, disabled items are skipped during keyboard navigation.
-->

특정 메뉴 항목이나 전체 메뉴바를 비활성화해서 조작을 막을 수 있습니다.
비활성화된 항목이 키보드 포커스를 받을 수 있는지는 `softDisabled` 입력 프로퍼티로 제어합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

메뉴바의 `[softDisabled]="true"`이면 비활성화된 항목도 포커스를 받을 수 있지만 활성화할 수는 없습니다.
`[softDisabled]="false"`이면 키보드 탐색에서 비활성화된 항목을 건너뜁니다.

<!--
### RTL support
-->

<a id="rtl-support"></a>

### RTL 지원

<!--
Menubars automatically adapt to right-to-left (RTL) languages. Arrow key navigation reverses direction, and submenus position on the left side.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

The `dir="rtl"` attribute enables RTL mode. Left arrow moves right, Right arrow moves left, maintaining natural navigation for RTL language users.
-->

메뉴바는 오른쪽에서 왼쪽으로 쓰는 언어(RTL)에 자동으로 대응합니다.
방향키 탐색 방향이 반대로 바뀌고 하위 메뉴는 왼쪽에 배치됩니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/menubar/src/rtl/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`dir="rtl"` 어트리뷰트로 RTL 모드를 활성화합니다.
왼쪽 방향키는 오른쪽으로, 오른쪽 방향키는 왼쪽으로 이동해서 RTL 언어 사용자에게 자연스러운 탐색을 제공합니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing menubar components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MenuHarness} from '@angular/aria/menu/testing';
import {MyMenubarComponent} from './my-menubar'; // Your component

describe('MyMenubarComponent', () => {
  let fixture: ComponentFixture<MyMenubarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMenubarComponent],
    });

    fixture = TestBed.createComponent(MyMenubarComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should interact with menubar items', async () => {
    // Load the menubar harness (which is a MenuHarness with selector '[ngMenuBar]')
    const menubar = await loader.getHarness(MenuHarness.with({selector: '[ngMenuBar]'}));

    // Menubars are persistent and always "open"
    expect(await menubar.isOpen()).toBe(true);
    expect(await menubar.isMenuBar()).toBe(true);

    // Get top-level items
    const items = await menubar.getItems();
    expect(items.length).toBe(2);
    expect(await items[0].getText()).toBe('File');
    expect(await items[1].getText()).toBe('Edit');

    // Click an item to open its dropdown menu
    await items[0].click();

    const fileMenu = await items[0].getSubmenu();
    expect(fileMenu).toBeTruthy();
    expect(await fileMenu!.isOpen()).toBe(true);
  });
});
```
-->

Angular Aria는 메뉴바 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MenuHarness} from '@angular/aria/menu/testing';
import {MyMenubarComponent} from './my-menubar'; // 테스트할 컴포넌트

describe('MyMenubarComponent', () => {
  let fixture: ComponentFixture<MyMenubarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMenubarComponent],
    });

    fixture = TestBed.createComponent(MyMenubarComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should interact with menubar items', async () => {
    // 메뉴바 하네스를 불러옵니다(선택자가 '[ngMenuBar]'인 MenuHarness입니다).
    const menubar = await loader.getHarness(MenuHarness.with({selector: '[ngMenuBar]'}));

    // 메뉴바는 항상 표시되며 언제나 "열린" 상태입니다.
    expect(await menubar.isOpen()).toBe(true);
    expect(await menubar.isMenuBar()).toBe(true);

    // 최상위 항목을 가져옵니다.
    const items = await menubar.getItems();
    expect(items.length).toBe(2);
    expect(await items[0].getText()).toBe('File');
    expect(await items[1].getText()).toBe('Edit');

    // 항목을 클릭해서 드롭다운 메뉴를 엽니다.
    await items[0].click();

    const fileMenu = await items[0].getSubmenu();
    expect(fileMenu).toBeTruthy();
    expect(await fileMenu!.isOpen()).toBe(true);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
The menubar pattern uses directives from Angular's Aria library. See the [Menu guide](guide/aria/menu) for complete API documentation.
-->

메뉴바 패턴은 Angular Aria 라이브러리의 디렉티브를 사용합니다.
전체 API 문서는 [메뉴 가이드](guide/aria/menu)를 참고하세요.

<!--
### MenuBar
-->

<a id="menubar"></a>

### MenuBar

<!--
The horizontal container for top-level menu items.
-->

최상위 메뉴 항목을 담는 수평 컨테이너입니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property         | Type      | Default | Description                                                   |
| ---------------- | --------- | ------- | ------------------------------------------------------------- |
| `disabled`       | `boolean` | `false` | Disables the entire menubar                                   |
| `wrap`           | `boolean` | `true`  | Whether keyboard navigation wraps from last to first item     |
| `softDisabled`   | `boolean` | `true`  | When `true`, disabled items are focusable but not interactive |
| `value`          | `V[]`     | `[]`    | Selected menu item values (supports two-way binding)          |
| `typeaheadDelay` | `number`  | `500`   | Milliseconds before the typeahead buffer is reset             |

See the [Menu API documentation](guide/aria/menu#apis) for complete details on all available inputs and signals.
-->

| 프로퍼티         | 타입      | 기본값  | 설명                                                                       |
| ---------------- | --------- | ------- | -------------------------------------------------------------------------- |
| `disabled`       | `boolean` | `false` | 전체 메뉴바를 비활성화합니다.                                              |
| `wrap`           | `boolean` | `true`  | 키보드 탐색에서 마지막 항목에서 첫 번째 항목으로 순환할지 지정합니다.      |
| `softDisabled`   | `boolean` | `true`  | `true`이면 비활성화된 항목도 포커스를 받을 수 있지만 조작할 수는 없습니다. |
| `value`          | `V[]`     | `[]`    | 선택된 메뉴 항목의 값입니다(양방향 바인딩을 지원합니다).                   |
| `typeaheadDelay` | `number`  | `500`   | 문자 입력 검색 버퍼가 초기화되기까지의 시간입니다(밀리초).                 |

사용 가능한 모든 입력 프로퍼티와 시그널의 자세한 내용은 [메뉴 API 문서](guide/aria/menu#apis)를 참고하세요.

<!--
### MenuItem
-->

<a id="menuitem"></a>

### MenuItem

<!--
Individual items within the menubar. Same API as Menu - see [MenuItem](guide/aria/menu#menuitem).

**Menubar-specific behavior:**

- Left/Right arrows navigate between menubar items (vs Up/Down in vertical menus)
- First keyboard interaction or click enables hover-to-open for submenus
- Enter or Down arrow opens the submenu and focuses the first item
- `aria-haspopup="menu"` indicates items with submenus
-->

메뉴바 안의 개별 항목입니다.
Menu와 동일한 API를 사용합니다.
[MenuItem](guide/aria/menu#menuitem)을 참고하세요.

**메뉴바에만 적용되는 동작:**

- 왼쪽/오른쪽 방향키로 메뉴바 항목 사이를 이동합니다(수직 메뉴에서는 위/아래 방향키를 사용합니다).
- 처음 키보드로 조작하거나 클릭하면 마우스를 올려 하위 메뉴를 여는 기능이 활성화됩니다.
- Enter나 아래 방향키를 누르면 하위 메뉴를 열고 첫 번째 항목에 포커스를 둡니다.
- `aria-haspopup="menu"`는 하위 메뉴가 있는 항목을 나타냅니다.

<!--
### MenuTrigger
-->

<a id="menutrigger"></a>

### MenuTrigger

<!--
Not typically used in menubars - MenuItem handles trigger behavior directly when it has an associated submenu. See [MenuTrigger](guide/aria/menu#menutrigger) for standalone menu trigger patterns.
-->

메뉴바에서는 일반적으로 사용하지 않습니다.
MenuItem에 하위 메뉴가 연결되어 있으면 MenuItem이 트리거 동작을 직접 처리합니다.
독립형 메뉴 트리거 패턴은 [MenuTrigger](guide/aria/menu#menutrigger)를 참고하세요.
