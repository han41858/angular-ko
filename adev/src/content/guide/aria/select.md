<!--
<docs-decorative-header title="Select">
</docs-decorative-header>
-->

<docs-decorative-header title="선택">
</docs-decorative-header>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
A pattern that combines a combobox with a listbox to create single-selection dropdowns with keyboard navigation and screen reader support.

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
-->

콤보박스와 리스트박스를 결합해서 키보드 탐색과 스크린 리더를 지원하는 단일 선택 드롭다운을 만드는 패턴입니다.

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

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
The select pattern works best when users need to choose a single value from a familiar set of options.

Consider using this pattern when:

- **The option list is fixed** (fewer than 20 items) - Users can scan and choose without filtering
- **Options are familiar** - Users recognize the choices without needing to search
- **Forms need standard fields** - Country, state, category, or status selection
- **Settings and configuration** - Dropdown menus for preferences or options
- **Clear option labels** - Each choice has a distinct, scannable name

Avoid this pattern when:

- **The list has more than 20 items** - Use the [Autocomplete pattern](guide/aria/autocomplete) for better filtering
- **Users need to search options** - [Autocomplete](guide/aria/autocomplete) provides text input and filtering
- **Multiple selection is needed** - Use the [Multiselect pattern](guide/aria/multiselect) instead
- **Very few options exist (2-3)** - Radio buttons provide better visibility of all choices
-->

선택 패턴은 사용자가 익숙한 옵션 중에서 값 하나를 골라야 할 때 적합합니다.

다음과 같은 경우에 이 패턴 사용을 고려하세요.

- **옵션 목록이 고정된 경우**(20개 미만): 사용자가 필터링 없이 훑어보고 고를 수 있습니다.
- **옵션이 익숙한 경우**: 검색하지 않고도 선택지를 알아볼 수 있습니다.
- **폼에 표준 필드가 필요한 경우**: 국가, 주, 범주, 상태를 선택할 때 사용합니다.
- **설정과 구성**: 환경설정이나 옵션을 위한 드롭다운 메뉴에 사용합니다.
- **옵션 레이블이 명확한 경우**: 각 선택지의 이름이 구분되고 쉽게 훑어볼 수 있습니다.

다음과 같은 경우에는 이 패턴을 피하세요.

- **목록의 항목이 20개보다 많은 경우**: 더 나은 필터링을 위해 [자동 완성 패턴](guide/aria/autocomplete)을 사용하세요.
- **사용자가 옵션을 검색해야 하는 경우**: [자동 완성](guide/aria/autocomplete)은 텍스트 입력과 필터링을 제공합니다.
- **다중 선택이 필요한 경우**: [다중 선택 패턴](guide/aria/multiselect)을 사용하세요.
- **옵션이 매우 적은 경우(2~3개)**: 라디오 버튼이 모든 선택지를 더 잘 보여줍니다.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
The select pattern combines [Combobox](guide/aria/combobox) and [Listbox](guide/aria/listbox) directives to provide a fully accessible dropdown with:

- **Keyboard Navigation** - Navigate options with arrow keys, select with Enter, close with Escape
- **Screen Reader Support** - Built-in ARIA attributes for assistive technologies
- **Custom Display** - Show selected values with icons, formatting, or rich content
- **Signal-Based Reactivity** - Reactive state management using Angular signals
- **Smart Positioning** - CDK Overlay handles viewport edges and scrolling
- **Bidirectional Text Support** - Automatically handles right-to-left (RTL) languages
-->

선택 패턴은 [콤보박스](guide/aria/combobox)와 [리스트박스](guide/aria/listbox) 디렉티브를 결합해서 다음과 같이 접근성을 갖춘 드롭다운을 제공합니다.

- **키보드 탐색**: 방향키로 옵션을 탐색하고 Enter로 선택하며 Escape로 닫습니다.
- **스크린 리더 지원**: 보조 기술을 위한 ARIA 어트리뷰트를 기본 제공합니다.
- **커스텀 표시**: 선택된 값을 아이콘, 서식, 풍부한 콘텐츠로 표시합니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.
- **스마트 위치 지정**: CDK Overlay가 뷰포트 경계와 스크롤을 처리합니다.
- **양방향 텍스트 지원**: 오른쪽에서 왼쪽으로 쓰는 언어(RTL)를 자동으로 처리합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Basic select
-->

<a id="basic-select"></a>

### 기본 선택

<!--
Users need a standard dropdown to choose from a list of values. A combobox paired with a listbox provides the familiar select experience with full accessibility support.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Text input is prevented by applying the `ngCombobox` directive directly onto a non-interactive host element (such as a `div` or a `button`) instead of an `<input>`. Users interact with the dropdown using arrow keys and Enter, just like a native select element.
-->

사용자가 값 목록에서 선택할 수 있는 표준 드롭다운이 필요할 때가 있습니다.
콤보박스와 리스트박스를 함께 사용하면 익숙한 선택 UI와 함께 접근성을 지원할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`<input>` 대신 `div`나 `button`과 같은 비대화형 호스트 엘리먼트에 `ngCombobox` 디렉티브를 직접 적용해서 텍스트 입력을 방지합니다.
사용자는 네이티브 select 엘리먼트와 마찬가지로 방향키와 Enter로 드롭다운을 조작합니다.

<!--
### Select with custom display
-->

<a id="select-with-custom-display"></a>

### 커스텀 표시를 적용한 선택

<!--
Options often need visual indicators like icons or badges to help users identify choices quickly. Custom templates within options allow rich formatting while maintaining accessibility.

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

Each option displays an icon alongside the label. The selected value updates to show the chosen option's icon and text, providing clear visual feedback.
-->

사용자가 선택지를 빠르게 알아볼 수 있도록 옵션에 아이콘이나 배지 같은 시각적 표시가 필요할 때가 많습니다.
옵션 안에 커스텀 템플릿을 사용하면 접근성을 유지하면서 풍부한 서식을 적용할 수 있습니다.

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

각 옵션은 레이블 옆에 아이콘을 표시합니다.
선택된 값의 표시도 선택한 옵션의 아이콘과 텍스트로 바뀌어 결과를 시각적으로 명확하게 보여줍니다.

<!--
### Disabled select
-->

<a id="disabled-select"></a>

### 비활성화된 선택

<!--
Selects can be disabled to prevent user interaction when certain form conditions aren't met. The disabled state provides visual feedback and prevents keyboard interaction.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When disabled, the select shows a disabled visual state and blocks all user interaction. Screen readers announce the disabled state to assistive technology users.
-->

폼의 특정 조건이 충족되지 않았을 때 선택 컨트롤을 비활성화해서 사용자 조작을 막을 수 있습니다.
비활성화 상태는 시각적인 피드백을 제공하고 키보드 조작을 막습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/select/src/disabled/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

비활성화하면 선택 컨트롤은 비활성화된 모습을 표시하고 모든 사용자 조작을 차단합니다.
스크린 리더는 보조 기술 사용자에게 비활성화 상태를 안내합니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
The select pattern can be tested using a combination of `ComboboxHarness` and `ListboxHarness` from `@angular/aria/combobox/testing` and `@angular/aria/listbox/testing`.
Here is an example of how to use the harnesses to test a select component:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MySelectComponent} from './my-select'; // Your component

describe('MySelectComponent', () => {
  let fixture: ComponentFixture<MySelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MySelectComponent],
    });

    fixture = TestBed.createComponent(MySelectComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting an option', async () => {
    // Load the combobox harness (which acts as the select trigger)
    const select = await loader.getHarness(ComboboxHarness);

    // Verify it is closed initially
    expect(await select.isOpen()).toBe(false);

    // Open the dropdown
    await select.open();
    expect(await select.isOpen()).toBe(true);

    // Get the listbox harness from the popup
    const listbox = await select.getPopupWidget(ListboxHarness);
    const options = await listbox.getOptions();
    expect(options.length).toBe(3);

    // Click the second option
    await options[1].click();

    // Verify the dropdown closed and the value updated
    expect(await select.isOpen()).toBe(false);
    expect(await (await select.host()).text()).toContain('Option 2');
  });
});
```
-->

선택 패턴은 `@angular/aria/combobox/testing`의 `ComboboxHarness`와 `@angular/aria/listbox/testing`의 `ListboxHarness`를 함께 사용해서 테스트할 수 있습니다.
하네스로 선택 컴포넌트를 테스트하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MySelectComponent} from './my-select'; // 테스트할 컴포넌트

describe('MySelectComponent', () => {
  let fixture: ComponentFixture<MySelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MySelectComponent],
    });

    fixture = TestBed.createComponent(MySelectComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting an option', async () => {
    // 선택 트리거 역할을 하는 콤보박스 하네스를 불러옵니다.
    const select = await loader.getHarness(ComboboxHarness);

    // 처음에는 닫혀 있는지 확인합니다.
    expect(await select.isOpen()).toBe(false);

    // 드롭다운을 엽니다.
    await select.open();
    expect(await select.isOpen()).toBe(true);

    // 팝업에서 리스트박스 하네스를 가져옵니다.
    const listbox = await select.getPopupWidget(ListboxHarness);
    const options = await listbox.getOptions();
    expect(options.length).toBe(3);

    // 두 번째 옵션을 클릭합니다.
    await options[1].click();

    // 드롭다운이 닫히고 값이 변경되었는지 확인합니다.
    expect(await select.isOpen()).toBe(false);
    expect(await (await select.host()).text()).toContain('Option 2');
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
The select pattern uses the following directives from Angular's Aria library. See the full API documentation in the linked guides.
-->

선택 패턴은 Angular Aria 라이브러리의 다음 디렉티브를 사용합니다.
전체 API 문서는 연결된 가이드를 참고하세요.

<!--
### Combobox Directives
-->

<a id="combobox-directives"></a>

### Combobox 디렉티브

<!--
The select pattern applies `ngCombobox` directly onto a non-interactive host element (such as a `div` or a `button`) to prevent text input while preserving keyboard navigation.
-->

선택 패턴은 `div`나 `button`과 같은 비대화형 호스트 엘리먼트에 `ngCombobox`를 직접 적용해서 키보드 탐색을 유지하면서 텍스트 입력을 방지합니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property   | Type                   | Default | Description                |
| ---------- | ---------------------- | ------- | -------------------------- |
| `disabled` | `boolean`              | `false` | Disables the entire select |
| `expanded` | `ModelSignal<boolean>` | `false` | Expanded state of select   |

See the [Combobox API documentation](guide/aria/combobox#apis) for complete details on all available inputs and signals.
-->

| 프로퍼티   | 타입                   | 기본값  | 설명                               |
| ---------- | ---------------------- | ------- | ---------------------------------- |
| `disabled` | `boolean`              | `false` | 선택 컨트롤 전체를 비활성화합니다. |
| `expanded` | `ModelSignal<boolean>` | `false` | 선택 컨트롤의 펼침 상태입니다.     |

사용 가능한 모든 입력 프로퍼티와 시그널의 자세한 내용은 [콤보박스 API 문서](guide/aria/combobox#apis)를 참고하세요.

<!--
#### Popup Directives
-->

<a id="popup-directives"></a>

#### 팝업 디렉티브

<!--
The structural `ngComboboxPopup` directive marks the overlay template and requires a reference to the parent combobox:

| Property   | Type       | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| `combobox` | `Combobox` | Required reference to the parent `Combobox` |
-->

`ngComboboxPopup` 구조 디렉티브는 오버레이 템플릿을 지정하며 부모 콤보박스의 참조가 필요합니다.

| 프로퍼티   | 타입       | 설명                                |
| ---------- | ---------- | ----------------------------------- |
| `combobox` | `Combobox` | 부모 `Combobox`의 참조입니다(필수). |

<!--
#### ComboboxWidget Directive
-->

<a id="comboboxwidget-directive"></a>

#### ComboboxWidget 디렉티브

<!--
The `ngComboboxWidget` directive bridges the listbox with the combobox trigger to support active-descendant focus tracking.

| Property           | Type                  | Description                                                                                                                                  |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeDescendant` | `string \| undefined` | The ID of the currently active option (bound to `listbox.activeDescendant()`) to update the `aria-activedescendant` attribute on the trigger |
-->

`ngComboboxWidget` 디렉티브는 리스트박스와 콤보박스 트리거를 연결해서 활성 자손의 포커스 추적을 지원합니다.

| 프로퍼티           | 타입                  | 설명                                                                                                                         |
| ------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `activeDescendant` | `string \| undefined` | 트리거의 `aria-activedescendant` 어트리뷰트를 갱신할 현재 활성 옵션의 ID입니다(`listbox.activeDescendant()`에 바인딩합니다). |

<!--
### Listbox Directives
-->

<a id="listbox-directives"></a>

### Listbox 디렉티브

<!--
The select pattern uses `ngListbox` for the dropdown list and `ngOption` for each selectable item.
-->

선택 패턴은 드롭다운 목록에 `ngListbox`를 사용하고 선택 가능한 각 항목에 `ngOption`을 사용합니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property        | Type                               | Default      | Description                                                                                                                     |
| --------------- | ---------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'explicit'` | Set to `'explicit'` so options are toggled explicitly via click/Enter instead of following active focus                         |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'`   | The focus strategy used by the listbox. Set to `'activedescendant'` so browser focus remains on the combobox trigger.           |
| `tabIndex`      | `number`                           | `0`          | The tabindex of the listbox. Set to `-1` to prevent keyboard focus from entering the popup container in active-descendant mode. |
-->

| 프로퍼티        | 타입                               | 기본값       | 설명                                                                                                                         |
| --------------- | ---------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'explicit'` | 활성 포커스에 따라 선택하는 대신 클릭/Enter로 옵션의 선택 상태를 명시적으로 전환하도록 `'explicit'`으로 설정합니다.          |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'`   | 리스트박스에서 사용하는 포커스 전략입니다. 브라우저 포커스를 콤보박스 트리거에 유지하려면 `'activedescendant'`로 설정합니다. |
| `tabIndex`      | `number`                           | `0`          | 리스트박스의 tabindex입니다. 활성 자손 모드에서 키보드 포커스가 팝업 컨테이너에 들어가지 않도록 `-1`로 설정합니다.           |

<!--
#### Model
-->

<a id="model"></a>

#### 모델

<!--
| Property | Type                 | Description                                                                  |
| -------- | -------------------- | ---------------------------------------------------------------------------- |
| `value`  | `ModelSignal<any[]>` | Two-way bindable array of selected values (contains single value for select) |
-->

| 프로퍼티 | 타입                 | 설명                                                                                 |
| -------- | -------------------- | ------------------------------------------------------------------------------------ |
| `value`  | `ModelSignal<any[]>` | 양방향 바인딩이 가능한 선택된 값의 배열입니다(단일 선택에서는 값 하나를 포함합니다). |

<!--
### Positioning
-->

<a id="positioning"></a>

### 위치 지정

<!--
The select pattern integrates with [CDK Overlay](https://material.angular.io/cdk/overlay/overview) for smart positioning. Use `cdkConnectedOverlay` to handle viewport edges and scrolling automatically.
-->

선택 패턴은 [CDK Overlay](https://material.angular.io/cdk/overlay/overview)와 통합해서 위치를 적절하게 지정합니다.
뷰포트 경계와 스크롤을 자동으로 처리하려면 `cdkConnectedOverlay`를 사용하세요.
