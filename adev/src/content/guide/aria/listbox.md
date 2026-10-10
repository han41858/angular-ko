<!--
<docs-decorative-header title="Listbox">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" title="Listbox pattern"/>
  <docs-pill href="/api?query=listbox#angular_aria_listbox" title="Listbox API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="리스트박스">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" title="리스트박스 패턴"/>
  <docs-pill href="/api?query=listbox#angular_aria_listbox" title="리스트박스 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A directive that displays a list of options for users to select from, supporting keyboard navigation, single or multiple selection, and screen reader support.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

사용자가 선택할 수 있는 옵션 목록을 표시하는 디렉티브입니다.
키보드 탐색, 단일/다중 선택, 스크린 리더를 지원합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Listbox is a foundational directive used by the [Select](guide/aria/select), [Multiselect](guide/aria/multiselect), and [Autocomplete](guide/aria/autocomplete) patterns. For most dropdown needs, use those documented patterns instead.

Consider using listbox directly when:

- **Building custom selection components** - Creating specialized interfaces with specific behavior
- **Visible selection lists** - Displaying selectable items directly on the page (not in dropdowns)
- **Custom integration patterns** - Integrating with unique popup or layout requirements

Avoid listbox when:

- **Navigation menus are needed** - Use the [Menu](guide/aria/menu) directive for actions and commands
-->

리스트박스는 [선택](guide/aria/select), [다중 선택](guide/aria/multiselect), [자동 완성](guide/aria/autocomplete) 패턴에서 사용하는 기본 디렉티브입니다.
대부분의 드롭다운 요구사항에는 이 패턴의 가이드를 참고해서 구현하세요.

다음과 같은 경우에는 리스트박스를 직접 사용하는 것을 고려하세요.

- **커스텀 선택 컴포넌트 개발**: 특정 동작이 필요한 전용 인터페이스를 만들 때
- **항상 표시되는 선택 목록**: 선택할 항목을 드롭다운이 아닌 페이지에 직접 표시할 때
- **커스텀 통합 패턴**: 고유한 팝업이나 레이아웃 요구사항에 맞춰 통합할 때

다음과 같은 경우에는 리스트박스를 피하세요.

- **탐색 메뉴가 필요한 경우**: 작업과 명령에는 [메뉴](guide/aria/menu) 디렉티브를 사용하세요.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
Angular's listbox provides a fully accessible list implementation with:

- **Keyboard Navigation** - Navigate options with arrow keys, select with Enter or Space
- **Screen Reader Support** - Built-in ARIA attributes including role="listbox"
- **Single or Multiple Selection** - `multi` attribute controls selection mode
- **Horizontal or Vertical** - `orientation` attribute for layout direction
- **Type-ahead Search** - Type characters to jump to matching options
- **Signal-Based Reactivity** - Reactive state management using Angular signals
-->

Angular의 리스트박스는 다음과 같이 접근성을 갖춘 목록 구현을 제공합니다.

- **키보드 탐색**: 방향키로 옵션을 탐색하고 Enter나 Space로 선택합니다.
- **스크린 리더 지원**: role="listbox"를 비롯한 ARIA 어트리뷰트를 기본 제공합니다.
- **단일/다중 선택**: `multi` 어트리뷰트로 선택 모드를 제어합니다.
- **수평/수직 배치**: `orientation` 어트리뷰트로 배치 방향을 지정합니다.
- **문자 입력 검색**: 문자를 입력하면 일치하는 옵션으로 이동합니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Basic listbox
-->

<a id="basic-listbox"></a>

### 기본 리스트박스

<!--
Applications sometimes need selectable lists visible directly on the page rather than hidden in a dropdown. A standalone listbox provides keyboard navigation and selection for these visible list interfaces.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/app/app.html" />
</docs-code-multifile>

The `value` model signal provides two-way binding to the selected items. With `selectionMode="explicit"`, users press Space or Enter to select options. For dropdown patterns that combine listbox with combobox and overlay positioning, see the [Select](guide/aria/select) pattern.
-->

애플리케이션에서는 선택 목록을 드롭다운 안에 숨기지 않고 페이지에 직접 표시해야 할 때가 있습니다.
리스트박스를 독립적으로 사용하면 이러한 목록 인터페이스에 키보드 탐색과 선택 기능을 제공할 수 있습니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/basic/app/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/basic/app/app.html" />
</docs-code-multifile>

`value` 모델 시그널은 선택된 항목에 대한 양방향 바인딩을 제공합니다.
`selectionMode="explicit"`이면 사용자가 Space나 Enter를 눌러 옵션을 선택합니다.
리스트박스, 콤보박스, 오버레이 위치 지정을 결합한 드롭다운 패턴은 [선택](guide/aria/select) 패턴을 참고하세요.

<!--
### Horizontal listbox
-->

<a id="horizontal-listbox"></a>

### 수평 리스트박스

<!--
Lists sometimes work better horizontally, such as toolbar-like interfaces or tab-style selections. The `orientation` attribute changes both the layout and keyboard navigation direction.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

With `orientation="horizontal"`, left and right arrow keys navigate between options instead of up and down. The listbox automatically handles right-to-left (RTL) languages by reversing navigation direction.
-->

툴바와 비슷한 인터페이스나 탭 형태의 선택 UI처럼 목록을 수평으로 배치하는 것이 더 적합한 경우도 있습니다.
`orientation` 어트리뷰트는 배치 방향과 키보드 탐색 방향을 함께 변경합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/listbox/src/horizontal/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`orientation="horizontal"`이면 위/아래 방향키 대신 왼쪽/오른쪽 방향키로 옵션 사이를 이동합니다.
리스트박스는 탐색 방향을 반대로 전환해서 오른쪽에서 왼쪽으로 쓰는 언어(RTL)를 자동으로 처리합니다.

<!--
### Selection modes
-->

<a id="selection-modes"></a>

### 선택 모드

<!--
Listbox supports two selection modes that control when items become selected.

The `'follow'` mode automatically selects the focused item, providing faster interaction when selection changes frequently. The `'explicit'` mode requires Space or Enter to confirm selection, preventing accidental changes while navigating. Dropdown patterns typically use `'follow'` mode for single selection.
-->

리스트박스는 항목이 선택되는 시점을 제어하는 두 가지 선택 모드를 지원합니다.

`'follow'` 모드는 포커스가 있는 항목을 자동으로 선택해서 선택이 자주 바뀌는 경우 더 빠르게 조작할 수 있습니다.
`'explicit'` 모드는 Space나 Enter로 선택을 확정해야 하므로 탐색 도중 실수로 선택이 바뀌는 일을 방지합니다.
드롭다운 패턴의 단일 선택에는 대체로 `'follow'` 모드를 사용합니다.

<!--
#### Explicit
-->

<a id="explicit"></a>

#### 명시적 선택

<!--
<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.html" />
</docs-code-multifile>
-->

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/modes/app/explicit/app.html" />
</docs-code-multifile>

<!--
#### Follow
-->

<a id="follow"></a>

#### 포커스에 따른 선택

<!--
<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.html" />
</docs-code-multifile>

| Mode         | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `'follow'`   | Automatically selects the focused item, providing faster interaction when selection changes frequently |
| `'explicit'` | Requires Space or Enter to confirm selection, preventing accidental changes while navigating           |

TIP: Dropdown patterns typically use `'follow'` mode for single selection.
-->

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.ts" />
  <docs-code header="app.html" path="adev/src/content/examples/aria/listbox/src/modes/app/follow/app.html" />
</docs-code-multifile>

| 모드         | 설명                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------- |
| `'follow'`   | 포커스가 있는 항목을 자동으로 선택해서 선택이 자주 바뀌는 경우 더 빠르게 조작할 수 있습니다. |
| `'explicit'` | Space나 Enter로 선택을 확정해야 하므로 탐색 도중 실수로 선택이 바뀌는 일을 방지합니다.       |

TIP: 드롭다운 패턴의 단일 선택에는 대체로 `'follow'` 모드를 사용합니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing listbox components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyListboxComponent} from './my-listbox'; // Your component

describe('MyListboxComponent', () => {
  let fixture: ComponentFixture<MyListboxComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyListboxComponent],
    });

    fixture = TestBed.createComponent(MyListboxComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting options', async () => {
    const listbox = await loader.getHarness(ListboxHarness);

    // Verify listbox properties
    expect(await listbox.isMulti()).toBe(true);

    // Get all options
    const options = await listbox.getOptions();
    expect(options.length).toBe(2);

    // Click an option
    await options[0].click();

    // Verify option is selected
    expect(await options[0].isSelected()).toBe(true);

    // Filter options by text
    const bananaOption = await listbox.getOptions({text: 'Banana'});
    expect(bananaOption.length).toBe(1);
  });
});
```
-->

Angular Aria는 리스트박스 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyListboxComponent} from './my-listbox'; // 테스트할 컴포넌트

describe('MyListboxComponent', () => {
  let fixture: ComponentFixture<MyListboxComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyListboxComponent],
    });

    fixture = TestBed.createComponent(MyListboxComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting options', async () => {
    const listbox = await loader.getHarness(ListboxHarness);

    // 리스트박스 프로퍼티를 확인합니다.
    expect(await listbox.isMulti()).toBe(true);

    // 모든 옵션을 가져옵니다.
    const options = await listbox.getOptions();
    expect(options.length).toBe(2);

    // 옵션을 클릭합니다.
    await options[0].click();

    // 옵션이 선택되었는지 확인합니다.
    expect(await options[0].isSelected()).toBe(true);

    // 텍스트로 옵션을 필터링합니다.
    const bananaOption = await listbox.getOptions({text: 'Banana'});
    expect(bananaOption.length).toBe(1);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### Listbox Directive
-->

<a id="listbox-directive"></a>

### Listbox 디렉티브

<!--
The `ngListbox` directive creates an accessible list of selectable options.
-->

`ngListbox` 디렉티브는 접근성을 지원하는 선택 가능한 옵션 목록을 만듭니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property         | Type                               | Default      | Description                                  |
| ---------------- | ---------------------------------- | ------------ | -------------------------------------------- |
| `id`             | `string`                           | auto         | Unique identifier for the listbox            |
| `multi`          | `boolean`                          | `false`      | Enables multiple selection                   |
| `orientation`    | `'vertical'` \| `'horizontal'`     | `'vertical'` | Layout direction of the list                 |
| `wrap`           | `boolean`                          | `true`       | Whether focus wraps at list edges            |
| `selectionMode`  | `'follow'` \| `'explicit'`         | `'follow'`   | How selection is triggered                   |
| `focusMode`      | `'roving'` \| `'activedescendant'` | `'roving'`   | Focus management strategy                    |
| `softDisabled`   | `boolean`                          | `true`       | Whether disabled items are focusable         |
| `disabled`       | `boolean`                          | `false`      | Disables the entire listbox                  |
| `readonly`       | `boolean`                          | `false`      | Makes listbox readonly                       |
| `typeaheadDelay` | `number`                           | `500`        | Milliseconds before type-ahead search resets |
-->

| 프로퍼티         | 타입                               | 기본값       | 설명                                                  |
| ---------------- | ---------------------------------- | ------------ | ----------------------------------------------------- |
| `id`             | `string`                           | 자동 생성    | 리스트박스의 고유 식별자입니다.                       |
| `multi`          | `boolean`                          | `false`      | 다중 선택을 활성화합니다.                             |
| `orientation`    | `'vertical'` \| `'horizontal'`     | `'vertical'` | 목록의 배치 방향입니다.                               |
| `wrap`           | `boolean`                          | `true`       | 목록의 끝에서 포커스를 순환할지 지정합니다.           |
| `selectionMode`  | `'follow'` \| `'explicit'`         | `'follow'`   | 선택이 실행되는 방식입니다.                           |
| `focusMode`      | `'roving'` \| `'activedescendant'` | `'roving'`   | 포커스 관리 전략입니다.                               |
| `softDisabled`   | `boolean`                          | `true`       | 비활성화된 항목이 포커스를 받을 수 있는지 지정합니다. |
| `disabled`       | `boolean`                          | `false`      | 전체 리스트박스를 비활성화합니다.                     |
| `readonly`       | `boolean`                          | `false`      | 리스트박스를 읽기 전용으로 설정합니다.                |
| `typeaheadDelay` | `number`                           | `500`        | 문자 입력 검색이 초기화되기까지의 시간입니다(밀리초). |

<!--
#### Model
-->

<a id="model"></a>

#### 모델

<!--
| Property | Type  | Description                               |
| -------- | ----- | ----------------------------------------- |
| `value`  | `V[]` | Two-way bindable array of selected values |
-->

| 프로퍼티 | 타입  | 설명                                           |
| -------- | ----- | ---------------------------------------------- |
| `value`  | `V[]` | 양방향 바인딩이 가능한 선택된 값의 배열입니다. |

<!--
#### Signals
-->

<a id="signals"></a>

#### 시그널

<!--
| Property | Type          | Description                           |
| -------- | ------------- | ------------------------------------- |
| `value`  | `Signal<V[]>` | Currently selected values as a signal |
-->

| 프로퍼티 | 타입          | 설명                                    |
| -------- | ------------- | --------------------------------------- |
| `value`  | `Signal<V[]>` | 현재 선택된 값을 나타내는 시그널입니다. |

<!--
#### Methods
-->

<a id="methods"></a>

#### 메서드

<!--
| Method                     | Parameters                        | Description                                |
| -------------------------- | --------------------------------- | ------------------------------------------ |
| `scrollActiveItemIntoView` | `options?: ScrollIntoViewOptions` | Scrolls the active item into view          |
| `gotoFirst`                | none                              | Navigates to the first item in the listbox |
-->

| 메서드                     | 인자                              | 설명                                      |
| -------------------------- | --------------------------------- | ----------------------------------------- |
| `scrollActiveItemIntoView` | `options?: ScrollIntoViewOptions` | 활성 항목이 보이도록 스크롤합니다.        |
| `gotoFirst`                | 없음                              | 리스트박스의 첫 번째 항목으로 이동합니다. |

<!--
### Option Directive
-->

<a id="option-directive"></a>

### Option 디렉티브

<!--
The `ngOption` directive marks an item within a listbox.
-->

`ngOption` 디렉티브는 리스트박스 안의 항목을 나타냅니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property   | Type      | Default | Description                                      |
| ---------- | --------- | ------- | ------------------------------------------------ |
| `id`       | `string`  | auto    | Unique identifier for the option                 |
| `value`    | `V`       | -       | The value associated with this option (required) |
| `label`    | `string`  | -       | Optional label for screen readers                |
| `disabled` | `boolean` | `false` | Whether this option is disabled                  |
-->

| 프로퍼티   | 타입      | 기본값    | 설명                                   |
| ---------- | --------- | --------- | -------------------------------------- |
| `id`       | `string`  | 자동 생성 | 옵션의 고유 식별자입니다.              |
| `value`    | `V`       | -         | 이 옵션에 연결된 값입니다(필수).       |
| `label`    | `string`  | -         | 스크린 리더용 레이블입니다(선택 사항). |
| `disabled` | `boolean` | `false`   | 이 옵션이 비활성화되었는지 지정합니다. |

<!--
#### Signals
-->

<a id="signals-1"></a>

#### 시그널

<!--
| Property   | Type              | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `selected` | `Signal<boolean>` | Whether this option is selected |
| `active`   | `Signal<boolean>` | Whether this option has focus   |
-->

| 프로퍼티   | 타입              | 설명                                  |
| ---------- | ----------------- | ------------------------------------- |
| `selected` | `Signal<boolean>` | 이 옵션이 선택되어 있는지 나타냅니다. |
| `active`   | `Signal<boolean>` | 이 옵션에 포커스가 있는지 나타냅니다. |

<!--
### Related patterns
-->

<a id="related-patterns"></a>

### 관련 패턴

<!--
Listbox is used by these documented dropdown patterns:

- **[Select](guide/aria/select)** - Single-selection dropdown pattern using readonly combobox + listbox
- **[Multiselect](guide/aria/multiselect)** - Multiple-selection dropdown pattern using readonly combobox + listbox with `multi`
- **[Autocomplete](guide/aria/autocomplete)** - Filterable dropdown pattern using combobox + listbox

For complete dropdown patterns with trigger, popup, and overlay positioning, see those pattern guides instead of using listbox alone.

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" title="Listbox ARIA pattern"/>
  <docs-pill href="/api/aria/listbox/Listbox" title="Listbox API Reference"/>
</docs-pill-row>
-->

리스트박스는 다음 드롭다운 패턴에서 사용됩니다.

- **[선택](guide/aria/select)**: 읽기 전용 콤보박스와 리스트박스를 사용하는 단일 선택 드롭다운 패턴
- **[다중 선택](guide/aria/multiselect)**: 읽기 전용 콤보박스와 `multi`가 적용된 리스트박스를 사용하는 다중 선택 드롭다운 패턴
- **[자동 완성](guide/aria/autocomplete)**: 콤보박스와 리스트박스를 사용하는 필터링 가능한 드롭다운 패턴

트리거, 팝업, 오버레이 위치 지정을 갖춘 완전한 드롭다운 패턴이 필요하다면 리스트박스를 단독으로 사용하기보다 해당 패턴의 가이드를 참고하세요.

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" title="리스트박스 ARIA 패턴"/>
  <docs-pill href="/api/aria/listbox/Listbox" title="리스트박스 API 레퍼런스"/>
</docs-pill-row>
