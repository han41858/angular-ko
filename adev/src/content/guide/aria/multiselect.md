<!--
<docs-decorative-header title="Multiselect">
</docs-decorative-header>
-->

<docs-decorative-header title="다중 선택">
</docs-decorative-header>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
The multiselect pattern combines a read-only combobox trigger with a multi-select listbox popup to create highly accessible multiple-selection dropdowns with keyboard navigation and screen reader support.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

다중 선택 패턴은 읽기 전용 콤보박스 트리거와 다중 선택 리스트박스 팝업을 결합합니다.
이를 통해 키보드 탐색과 스크린 리더를 지원하고 접근성이 높은 다중 선택 드롭다운을 만듭니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
The multiselect pattern works best when users need to choose multiple related items from a familiar set of options.

Consider using this pattern when:

- **Users need multiple selections** - Tags, categories, filters, or labels where multiple choices apply
- **The option list is fixed** (fewer than 20 items) - Users can scan options without search
- **Filtering content** - Multiple criteria can be active simultaneously
- **Assigning attributes** - Labels, permissions, or features where multiple values make sense
- **Related choices** - Options that logically work together (such as selecting multiple team members)

Avoid this pattern when:

- **Only single selection is needed** - Use the [Select pattern](guide/aria/select) for simpler single-choice dropdowns
- **The list has more than 20 items with search needed** - Use the [Autocomplete pattern](guide/aria/autocomplete) with multiselect capability
- **Most or all options will be selected** - A checklist pattern provides better visibility
- **Choices are independent binary options** - Individual checkboxes communicate the choices more clearly
-->

다중 선택 패턴은 사용자가 익숙한 옵션 중에서 서로 관련된 여러 항목을 골라야 할 때 적합합니다.

다음과 같은 경우에 이 패턴 사용을 고려하세요.

- **여러 항목을 선택해야 하는 경우**: 여러 선택지를 적용할 수 있는 태그, 범주, 필터, 레이블에 사용합니다.
- **옵션 목록이 고정된 경우**(20개 미만): 사용자가 검색하지 않고 옵션을 훑어볼 수 있습니다.
- **콘텐츠 필터링**: 여러 조건을 동시에 활성화할 수 있습니다.
- **속성 지정**: 여러 값을 지정하는 것이 적합한 레이블, 권한, 기능에 사용합니다.
- **관련된 선택지**: 여러 팀원 선택처럼 옵션이 논리적으로 함께 동작하는 경우에 사용합니다.

다음과 같은 경우에는 이 패턴을 피하세요.

- **단일 선택만 필요한 경우**: 더 간단한 단일 선택 드롭다운인 [선택 패턴](guide/aria/select)을 사용하세요.
- **목록이 20개를 초과하고 검색이 필요한 경우**: 다중 선택 기능을 갖춘 [자동 완성 패턴](guide/aria/autocomplete)을 사용하세요.
- **대부분 또는 모든 옵션을 선택하는 경우**: 체크리스트 패턴이 옵션을 더 잘 보여줍니다.
- **선택지가 서로 독립적인 이진 옵션인 경우**: 개별 체크박스가 선택지를 더 명확하게 전달합니다.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
The multiselect pattern combines [Combobox](guide/aria/combobox) and [Listbox](guide/aria/listbox) directives to provide a fully accessible dropdown with:

- **Keyboard Navigation** - Navigate options with arrow keys, toggle with Space, close with Escape
- **Screen Reader Support** - Built-in ARIA attributes including aria-multiselectable
- **Selection Count Display** - Shows compact "Item + 2 more" pattern for multiple selections
- **Signal-Based Reactivity** - Reactive state management using Angular signals
- **Smart Positioning** - CDK Overlay handles viewport edges and scrolling
- **Persistent Selection** - Selected options remain visible with checkmarks after selection
-->

다중 선택 패턴은 [콤보박스](guide/aria/combobox)와 [리스트박스](guide/aria/listbox) 디렉티브를 결합해서 다음과 같이 접근성을 갖춘 드롭다운을 제공합니다.

- **키보드 탐색**: 방향키로 옵션을 탐색하고 Space로 선택 상태를 전환하며 Escape로 닫습니다.
- **스크린 리더 지원**: aria-multiselectable을 비롯한 ARIA 어트리뷰트를 기본 제공합니다.
- **선택 개수 표시**: 여러 항목을 선택하면 "항목 + 2개 더"와 같은 간결한 형태로 표시합니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.
- **스마트 위치 지정**: CDK Overlay가 뷰포트 경계와 스크롤을 처리합니다.
- **선택 상태 유지**: 선택한 뒤에도 체크 표시로 선택된 옵션을 보여줍니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Basic multiselect
-->

<a id="basic-multiselect"></a>

### 기본 다중 선택

<!--
Users need to select multiple items from a list of options. A readonly combobox paired with a multi-enabled listbox provides familiar multiselect functionality with full accessibility support.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

The `multi` attribute on `ngListbox` enables multiple selection. Press Space to toggle options, and the popup remains open for additional selections. The display shows the first selected item plus a count of remaining selections.
-->

사용자가 옵션 목록에서 여러 항목을 선택해야 할 때가 있습니다.
읽기 전용 콤보박스와 다중 선택이 활성화된 리스트박스를 함께 사용하면 익숙한 다중 선택 기능과 함께 접근성을 지원할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/basic/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`ngListbox`의 `multi` 어트리뷰트로 다중 선택을 활성화합니다.
Space를 눌러 옵션의 선택 상태를 전환하며, 추가로 선택할 수 있도록 팝업이 열린 상태로 유지됩니다.
첫 번째 선택 항목과 나머지 선택 항목의 수를 함께 표시합니다.

<!--
### Multiselect with custom display
-->

<a id="multiselect-with-custom-display"></a>

### 커스텀 표시를 적용한 다중 선택

<!--
Options often need visual indicators like icons or colors to help users identify choices. Custom templates within options allow rich formatting while the display value shows a compact summary.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

Each option displays an icon alongside its label. The display value updates to show the first selection's icon and text, followed by a count of additional selections. Selected options show a checkmark for clear visual feedback.
-->

사용자가 선택지를 알아볼 수 있도록 옵션에 아이콘이나 색상 같은 시각적 표시가 필요할 때가 많습니다.
옵션 안에 커스텀 템플릿을 사용하면 풍부한 서식을 적용하면서 표시값은 간결하게 요약할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/icons/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

각 옵션은 레이블 옆에 아이콘을 표시합니다.
표시값은 첫 번째 선택 항목의 아이콘과 텍스트, 추가 선택 항목의 수로 갱신됩니다.
선택된 옵션에는 체크 표시를 해서 결과를 시각적으로 명확하게 보여줍니다.

<!--
### Controlled selection
-->

<a id="controlled-selection"></a>

### 선택 제어

<!--
Forms sometimes need to limit the number of selections or validate user choices. Programmatic control over selection enables these constraints while maintaining accessibility.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

This example limits selections to two items. When the limit is reached, unselected options are disabled to prevent further selections, and the combobox display updates to reflect the choices.
-->

폼에서는 선택할 수 있는 개수를 제한하거나 사용자의 선택을 검사해야 할 때가 있습니다.
코드로 선택을 제어하면 접근성을 유지하면서 이러한 제약을 적용할 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/multiselect/src/limited/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

이 예제는 선택을 두 항목으로 제한합니다.
한도에 도달하면 선택되지 않은 옵션을 비활성화해서 추가 선택을 막고, 콤보박스의 표시값에 선택 결과를 반영합니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
The multiselect pattern can be tested using a combination of `ComboboxHarness` and `ListboxHarness` from `@angular/aria/combobox/testing` and `@angular/aria/listbox/testing`.
Here is an example of how to use the harnesses to test a multiselect component:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyMultiselectComponent} from './my-multiselect'; // Your component

describe('MyMultiselectComponent', () => {
  let fixture: ComponentFixture<MyMultiselectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMultiselectComponent],
    });

    fixture = TestBed.createComponent(MyMultiselectComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting multiple options', async () => {
    const select = await loader.getHarness(ComboboxHarness);

    // Open the dropdown
    await select.open();

    // Get the listbox harness from the popup
    const listbox = await select.getPopupWidget(ListboxHarness);
    expect(await listbox.isMulti()).toBe(true);

    const options = await listbox.getOptions();

    // Select first and second options
    await options[0].click();
    await options[1].click();

    // Verify both options are selected
    expect(await options[0].isSelected()).toBe(true);
    expect(await options[1].isSelected()).toBe(true);

    // Close the dropdown
    await select.close();

    // Verify value is updated (e.g., comma separated list or count)
    expect(await (await select.host()).text()).toContain('Option 1, Option 2');
  });
});
```
-->

다중 선택 패턴은 `@angular/aria/combobox/testing`의 `ComboboxHarness`와 `@angular/aria/listbox/testing`의 `ListboxHarness`를 함께 사용해서 테스트할 수 있습니다.
하네스로 다중 선택 컴포넌트를 테스트하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyMultiselectComponent} from './my-multiselect'; // 테스트할 컴포넌트

describe('MyMultiselectComponent', () => {
  let fixture: ComponentFixture<MyMultiselectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMultiselectComponent],
    });

    fixture = TestBed.createComponent(MyMultiselectComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting multiple options', async () => {
    const select = await loader.getHarness(ComboboxHarness);

    // 드롭다운을 엽니다.
    await select.open();

    // 팝업에서 리스트박스 하네스를 가져옵니다.
    const listbox = await select.getPopupWidget(ListboxHarness);
    expect(await listbox.isMulti()).toBe(true);

    const options = await listbox.getOptions();

    // 첫 번째와 두 번째 옵션을 선택합니다.
    await options[0].click();
    await options[1].click();

    // 두 옵션이 모두 선택되었는지 확인합니다.
    expect(await options[0].isSelected()).toBe(true);
    expect(await options[1].isSelected()).toBe(true);

    // 드롭다운을 닫습니다.
    await select.close();

    // 값이 변경되었는지 확인합니다(예: 쉼표로 구분한 목록이나 개수).
    expect(await (await select.host()).text()).toContain('Option 1, Option 2');
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
The multiselect pattern uses the following directives from Angular's Aria library. See the full API documentation in the linked guides.
-->

다중 선택 패턴은 Angular Aria 라이브러리의 다음 디렉티브를 사용합니다.
전체 API 문서는 연결된 가이드를 참고하세요.

<!--
### Combobox directives
-->

<a id="combobox-directives"></a>

### Combobox 디렉티브

<!--
The multiselect pattern uses `ngCombobox` directly on the trigger element (such as a `div` or `button`) to create a select-like multiselect dropdown.
-->

다중 선택 패턴은 `div`나 `button` 같은 트리거 엘리먼트에 `ngCombobox`를 직접 적용해서 select와 비슷한 다중 선택 드롭다운을 만듭니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property   | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `disabled` | `boolean` | `false` | Disables the entire multiselect |

See the [Combobox API documentation](guide/aria/combobox#apis) for complete details on all available inputs and signals.
-->

| 프로퍼티   | 타입      | 기본값  | 설명                                    |
| ---------- | --------- | ------- | --------------------------------------- |
| `disabled` | `boolean` | `false` | 다중 선택 컨트롤 전체를 비활성화합니다. |

사용 가능한 모든 입력 프로퍼티와 시그널의 자세한 내용은 [콤보박스 API 문서](guide/aria/combobox#apis)를 참고하세요.

<!--
#### Popup directives
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
#### ComboboxWidget directive
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
### Listbox directives
-->

<a id="listbox-directives"></a>

### Listbox 디렉티브

<!--
The multiselect pattern uses `ngListbox` with the `multi` attribute for multiple selection and `ngOption` for each selectable item.
-->

다중 선택 패턴은 `multi` 어트리뷰트가 적용된 `ngListbox`로 다중 선택을 제공하고, 선택 가능한 각 항목에는 `ngOption`을 사용합니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property        | Type                               | Default    | Description                                                                                                                     |
| --------------- | ---------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `multi`         | `boolean`                          | `false`    | Set to `true` to enable multiple selection                                                                                      |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'follow'` | Set to `'explicit'` so options are toggled explicitly via click/Space instead of following active focus                         |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'` | The focus strategy used by the listbox. Set to `'activedescendant'` so browser focus remains on the combobox trigger.           |
| `tabIndex`      | `number`                           | `0`        | The tabindex of the listbox. Set to `-1` to prevent keyboard focus from entering the popup container in active-descendant mode. |
-->

| 프로퍼티        | 타입                               | 기본값     | 설명                                                                                                                         |
| --------------- | ---------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `multi`         | `boolean`                          | `false`    | 다중 선택을 활성화하려면 `true`로 설정합니다.                                                                                |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'follow'` | 활성 포커스에 따라 선택하는 대신 클릭/Space로 옵션의 선택 상태를 명시적으로 전환하도록 `'explicit'`으로 설정합니다.          |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'` | 리스트박스에서 사용하는 포커스 전략입니다. 브라우저 포커스를 콤보박스 트리거에 유지하려면 `'activedescendant'`로 설정합니다. |
| `tabIndex`      | `number`                           | `0`        | 리스트박스의 tabindex입니다. 활성 자손 모드에서 키보드 포커스가 팝업 컨테이너에 들어가지 않도록 `-1`로 설정합니다.           |

<!--
#### Model
-->

<a id="model"></a>

#### 모델

<!--
| Property | Type                 | Description                               |
| -------- | -------------------- | ----------------------------------------- |
| `value`  | `ModelSignal<any[]>` | Two-way bindable array of selected values |

When `multi` is true, users can select multiple options using Space to toggle selection. The popup remains open after selection, allowing additional choices.

See the [Listbox API documentation](guide/aria/listbox#apis) for complete details on listbox configuration, selection modes, and option properties.
-->

| 프로퍼티 | 타입                 | 설명                                           |
| -------- | -------------------- | ---------------------------------------------- |
| `value`  | `ModelSignal<any[]>` | 양방향 바인딩이 가능한 선택된 값의 배열입니다. |

`multi`가 true이면 Space로 선택 상태를 전환해서 여러 옵션을 선택할 수 있습니다.
추가로 선택할 수 있도록 선택 후에도 팝업이 열린 상태로 유지됩니다.

리스트박스 설정, 선택 모드, 옵션 프로퍼티의 자세한 내용은 [리스트박스 API 문서](guide/aria/listbox#apis)를 참고하세요.

<!--
### Positioning
-->

<a id="positioning"></a>

### 위치 지정

<!--
The multiselect pattern integrates with [CDK Overlay](https://material.angular.io/cdk/overlay/overview) for smart positioning. Use `cdkConnectedOverlay` to handle viewport edges and scrolling automatically.
-->

다중 선택 패턴은 [CDK Overlay](https://material.angular.io/cdk/overlay/overview)와 통합해서 위치를 적절하게 지정합니다.
뷰포트 경계와 스크롤을 자동으로 처리하려면 `cdkConnectedOverlay`를 사용하세요.
