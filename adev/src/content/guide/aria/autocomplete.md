<!--
<docs-decorative-header title="Autocomplete">
</docs-decorative-header>
-->

<docs-decorative-header title="자동 완성">
</docs-decorative-header>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

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

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Autocomplete works best when users need to select from a large set of options where typing is faster than scrolling. Consider using autocomplete when:

- **The option list is long** (more than 20 items) - Typing narrows down choices faster than scrolling through a dropdown
- **Users know what they're looking for** - They can type part of the expected value (like a state name, product, or username)
- **Options follow predictable patterns** - Users can guess partial matches (like country codes, email domains, or categories)
- **Speed matters** - Forms benefit from quick selection without extensive navigation

Avoid autocomplete when:

- The list has fewer than 10 options - A regular dropdown or radio group provides better visibility
- Users need to browse options - If discovery is important, show all options upfront
- Options are unfamiliar - Users can't type what they don't know exists in the list
-->

자동 완성은 옵션이 많아 스크롤보다 입력해서 선택하는 것이 빠를 때 적합합니다.
다음과 같은 경우에 자동 완성 사용을 고려하세요.

- **옵션 목록이 긴 경우**(20개 초과): 드롭다운을 스크롤하는 것보다 입력해서 후보를 좁히는 것이 빠릅니다.
- **사용자가 찾는 값을 알고 있는 경우**: 주 이름, 제품, 사용자 이름처럼 예상하는 값의 일부를 입력할 수 있습니다.
- **옵션에 예측 가능한 패턴이 있는 경우**: 국가 코드, 이메일 도메인, 범주처럼 일부 문자열을 추측해서 일치하는 항목을 찾을 수 있습니다.
- **속도가 중요한 경우**: 복잡한 탐색 없이 빠르게 선택할 수 있으면 폼 사용이 편리해집니다.

다음과 같은 경우에는 자동 완성을 피하세요.

- 목록의 옵션이 10개보다 적은 경우: 일반 드롭다운이나 라디오 그룹이 옵션을 더 잘 보여줍니다.
- 사용자가 옵션을 둘러봐야 하는 경우: 어떤 옵션이 있는지 알아보는 것이 중요하다면 처음부터 모든 옵션을 표시하세요.
- 옵션이 생소한 경우: 사용자가 목록에 어떤 항목이 있는지 모르면 입력할 수 없습니다.

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
Angular's autocomplete provides a fully accessible combobox implementation with:

- **Keyboard Navigation** - Navigate options with arrow keys, select with Enter, close with Escape
- **Screen Reader Support** - Built-in ARIA attributes for assistive technologies
- **Dynamic Highlight Behavior** - Built-in support for inline selection suggestions
- **Signal-Based Reactivity** - Reactive state management using Angular signals
- **Popover API Integration** - Leverages the native HTML Popover API for optimal positioning
- **Bidirectional Text Support** - Automatically handles right-to-left (RTL) languages
-->

Angular의 자동 완성은 다음과 같이 접근성을 갖춘 콤보박스 구현을 제공합니다.

- **키보드 탐색**: 방향키로 옵션을 탐색하고 Enter로 선택하며 Escape로 닫습니다.
- **스크린 리더 지원**: 보조 기술을 위한 ARIA 어트리뷰트를 기본 제공합니다.
- **동적 강조 동작**: 인라인 선택 추천을 기본 지원합니다.
- **시그널 기반 반응성**: Angular 시그널로 상태를 반응형으로 관리합니다.
- **Popover API 통합**: 네이티브 HTML Popover API를 활용해서 적절한 위치에 표시합니다.
- **양방향 텍스트 지원**: 오른쪽에서 왼쪽으로 쓰는 언어(RTL)를 자동으로 처리합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Auto-select mode
-->

<a id="auto-select-mode"></a>

### 자동 선택 모드

<!--
Users typing partial text expect immediate confirmation that their input matches an available option. Auto-select mode updates the input value to match the first filtered option as users type, reducing the number of keystrokes needed and providing instant feedback that their search is on the right track.

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
-->

텍스트 일부를 입력하는 사용자는 입력값과 일치하는 옵션이 있는지 바로 확인하기를 기대합니다.
자동 선택 모드는 사용자가 입력할 때 필터링된 첫 번째 옵션에 맞춰 입력값을 변경합니다.
필요한 키 입력 횟수를 줄이고 검색이 올바르게 진행되고 있다는 사실을 바로 보여줍니다.

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

<!--
### Manual selection mode
-->

<a id="manual-selection-mode"></a>

### 수동 선택 모드

<!--
Manual selection mode keeps the typed text unchanged while users navigate the suggestion list, preventing confusion from automatic updates. The input only changes when users explicitly confirm their choice with Enter or a click.

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

수동 선택 모드는 사용자가 추천 목록을 탐색하는 동안 입력한 텍스트를 그대로 유지해서 자동 변경으로 인한 혼란을 방지합니다.
사용자가 Enter를 누르거나 클릭해서 명시적으로 선택을 확정할 때만 입력값이 바뀝니다.

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
### Highlight mode
-->

<a id="highlight-mode"></a>

### 강조 모드

<!--
Highlight mode allows the user to navigate options with arrow keys without changing the input value as they browse until they explicitly select a new option with Enter or click.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>
-->

강조 모드에서는 사용자가 방향키로 옵션을 탐색하는 동안 입력값이 바뀌지 않습니다.
Enter를 누르거나 클릭해서 새 옵션을 명시적으로 선택할 때 입력값이 바뀝니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>

  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.ts">
      <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.ts"/>
      <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.html"/>
      <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/highlight/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

<!--
### Signal Forms Integration
-->

<a id="signal-forms-integration"></a>

### 시그널 폼 통합

<!--
Angular Aria integrates seamlessly with the signal-based [Signal Forms](guide/forms/signals/overview) API. You can encapsulate complex inputs into reusable custom control components implementing `FormValueControl`.

The following example demonstrates a country selector component implementing `FormValueControl<string>`, bound to the parent form using `[formField]` and protected by schema validation rules.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.html"/>
  <docs-code header="country-selector.ts" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.ts"/>
  <docs-code header="country-selector.html" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.html"/>
  <docs-code header="country-selector.css" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.css"/>
  <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.css"/>
</docs-code-multifile>
-->

Angular Aria는 시그널 기반 [시그널 폼](guide/forms/signals/overview) API와 자연스럽게 통합됩니다.
`FormValueControl`을 구현해서 복잡한 입력 UI를 재사용 가능한 커스텀 컨트롤 컴포넌트로 캡슐화할 수 있습니다.

다음 예제는 `FormValueControl<string>`을 구현한 국가 선택기 컴포넌트입니다.
`[formField]`로 부모 폼에 바인딩하고 스키마의 유효성 검사 규칙으로 값을 검사합니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.ts">
  <docs-code header="app.ts" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.ts"/>
  <docs-code header="app.html" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.html"/>
  <docs-code header="country-selector.ts" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.ts"/>
  <docs-code header="country-selector.html" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.html"/>
  <docs-code header="country-selector.css" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/country-selector.css"/>
  <docs-code header="app.css" path="adev/src/content/examples/aria/autocomplete/src/signal-forms/app/app.css"/>
</docs-code-multifile>

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
The autocomplete pattern can be tested using a combination of `ComboboxHarness` and `ListboxHarness` from `@angular/aria/combobox/testing` and `@angular/aria/listbox/testing`.
Here is an example of how to use the harnesses to test an autocomplete component:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyAutocompleteComponent} from './my-autocomplete'; // Your component

describe('MyAutocompleteComponent', () => {
  let fixture: ComponentFixture<MyAutocompleteComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAutocompleteComponent],
    });

    fixture = TestBed.createComponent(MyAutocompleteComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should filter options based on input', async () => {
    const combobox = await loader.getHarness(ComboboxHarness);

    // Type in the input to trigger filtering
    await combobox.setValue('ap');
    expect(await combobox.isOpen()).toBe(true);

    // Get the listbox harness from the popup
    const listbox = await combobox.getPopupWidget(ListboxHarness);
    const options = await listbox.getOptions();

    // Verify options are filtered (e.g., 'Apple', 'Apricot')
    expect(options.length).toBe(2);
    expect(await options[0].getText()).toBe('Apple');

    // Select the first option
    await options[0].click();

    // Verify the input value is updated and popup is closed
    expect(await combobox.isOpen()).toBe(false);
    expect(await combobox.getValue()).toBe('Apple');
  });
});
```
-->

자동 완성 패턴은 `@angular/aria/combobox/testing`의 `ComboboxHarness`와 `@angular/aria/listbox/testing`의 `ListboxHarness`를 함께 사용해서 테스트할 수 있습니다.
하네스로 자동 완성 컴포넌트를 테스트하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyAutocompleteComponent} from './my-autocomplete'; // 테스트할 컴포넌트

describe('MyAutocompleteComponent', () => {
  let fixture: ComponentFixture<MyAutocompleteComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAutocompleteComponent],
    });

    fixture = TestBed.createComponent(MyAutocompleteComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should filter options based on input', async () => {
    const combobox = await loader.getHarness(ComboboxHarness);

    // 입력란에 텍스트를 입력해서 필터링을 실행합니다.
    await combobox.setValue('ap');
    expect(await combobox.isOpen()).toBe(true);

    // 팝업에서 리스트박스 하네스를 가져옵니다.
    const listbox = await combobox.getPopupWidget(ListboxHarness);
    const options = await listbox.getOptions();

    // 옵션이 필터링되었는지 확인합니다(예: 'Apple', 'Apricot').
    expect(options.length).toBe(2);
    expect(await options[0].getText()).toBe('Apple');

    // 첫 번째 옵션을 선택합니다.
    await options[0].click();

    // 입력값이 변경되고 팝업이 닫혔는지 확인합니다.
    expect(await combobox.isOpen()).toBe(false);
    expect(await combobox.getValue()).toBe('Apple');
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### Combobox Directive
-->

<a id="combobox-directive"></a>

### Combobox 디렉티브

<!--
The `ngCombobox` directive is applied directly onto the editable text `<input>` or `<textarea>` to manage keyboard triggers and popover states.
-->

`ngCombobox` 디렉티브는 편집 가능한 텍스트 `<input>`이나 `<textarea>`에 직접 적용해서 키보드 트리거와 팝오버 상태를 관리합니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property           | Type                  | Default     | Description                                                     |
| ------------------ | --------------------- | ----------- | --------------------------------------------------------------- |
| `disabled`         | `boolean`             | `false`     | Disables the combobox                                           |
| `softDisabled`     | `boolean`             | `true`      | Focusable when disabled                                         |
| `inlineSuggestion` | `string \| undefined` | `undefined` | Displays an inline completion suggestion for autocomplete modes |
-->

| 프로퍼티           | 타입                  | 기본값      | 설명                                              |
| ------------------ | --------------------- | ----------- | ------------------------------------------------- |
| `disabled`         | `boolean`             | `false`     | 콤보박스를 비활성화합니다.                        |
| `softDisabled`     | `boolean`             | `true`      | 비활성화되어도 포커스를 받을 수 있도록 합니다.    |
| `inlineSuggestion` | `string \| undefined` | `undefined` | 자동 완성 모드에서 인라인 완성 추천을 표시합니다. |

<!--
#### Models
-->

<a id="models"></a>

#### 모델

<!--
| Property   | Type                   | Default | Description                                                       |
| ---------- | ---------------------- | ------- | ----------------------------------------------------------------- |
| `value`    | `ModelSignal<string>`  | `''`    | Two-way bindable value of the input using `[(value)]`             |
| `expanded` | `ModelSignal<boolean>` | `false` | Two-way bindable expanded state of the popup using `[(expanded)]` |

---
-->

| 프로퍼티   | 타입                   | 기본값  | 설명                                                             |
| ---------- | ---------------------- | ------- | ---------------------------------------------------------------- |
| `value`    | `ModelSignal<string>`  | `''`    | `[(value)]`로 양방향 바인딩할 수 있는 입력값입니다.              |
| `expanded` | `ModelSignal<boolean>` | `false` | `[(expanded)]`로 양방향 바인딩할 수 있는 팝업의 펼침 상태입니다. |

---

<!--
### ComboboxPopup Directive
-->

<a id="comboboxpopup-directive"></a>

### ComboboxPopup 디렉티브

<!--
A structural directive applied to `<ng-template>` to mark the container used as the popup.
-->

팝업으로 사용할 컨테이너를 지정하기 위해 `<ng-template>`에 적용하는 구조 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property   | Type       | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| `combobox` | `Combobox` | Required reference to the parent `Combobox` |

---
-->

| 프로퍼티   | 타입       | 설명                                |
| ---------- | ---------- | ----------------------------------- |
| `combobox` | `Combobox` | 부모 `Combobox`의 참조입니다(필수). |

---

<!--
### ComboboxWidget Directive
-->

<a id="comboboxwidget-directive"></a>

### ComboboxWidget 디렉티브

<!--
Applied to the popup content container to bridge active-descendant focus changes to the input trigger.
-->

활성 자손의 포커스 변경을 입력 트리거에 전달하기 위해 팝업 콘텐츠 컨테이너에 적용합니다.

<!--
#### Inputs
-->

<a id="inputs-2"></a>

#### 입력 프로퍼티

<!--
| Property           | Type                  | Description                                                                       |
| ------------------ | --------------------- | --------------------------------------------------------------------------------- |
| `activeDescendant` | `string \| undefined` | The ID of the currently active descendant (bound to `listbox.activeDescendant()`) |

---
-->

| 프로퍼티           | 타입                  | 설명                                                                    |
| ------------------ | --------------------- | ----------------------------------------------------------------------- |
| `activeDescendant` | `string \| undefined` | 현재 활성 자손의 ID입니다(`listbox.activeDescendant()`에 바인딩합니다). |

---

<!--
### Listbox Directives
-->

<a id="listbox-directives"></a>

### Listbox 디렉티브

<!--
Autocomplete suggestion lists use the standard standalone listbox directives.
-->

자동 완성 추천 목록은 표준 독립형 리스트박스 디렉티브를 사용합니다.

<!--
#### Inputs
-->

<a id="inputs-3"></a>

#### 입력 프로퍼티

<!--
| Property        | Type                               | Default    | Description                                                                                          |
| --------------- | ---------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'follow'` | In manual/explicit mode, updates are committed explicitly on click/Enter rather than following focus |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'` | Set to `'activedescendant'` so browser focus stays on the trigger input                              |
| `tabIndex`      | `number`                           | `0`        | Set to `-1` to prevent keyboard tab focus from entering the popup listbox container                  |
-->

| 프로퍼티        | 타입                               | 기본값     | 설명                                                                                               |
| --------------- | ---------------------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `selectionMode` | `'follow'` \| `'explicit'`         | `'follow'` | 수동/명시적 모드에서는 포커스에 따라 값을 변경하지 않고 클릭/Enter로 변경을 명시적으로 확정합니다. |
| `focusMode`     | `'roving'` \| `'activedescendant'` | `'roving'` | 브라우저 포커스를 트리거 입력란에 유지하려면 `'activedescendant'`로 설정합니다.                    |
| `tabIndex`      | `number`                           | `0`        | Tab 키 포커스가 팝업 리스트박스 컨테이너로 들어가지 않도록 `-1`로 설정합니다.                      |

<!--
#### Models
-->

<a id="models-1"></a>

#### 모델

<!--
| Property | Type                 | Description                                                 |
| -------- | -------------------- | ----------------------------------------------------------- |
| `value`  | `ModelSignal<any[]>` | Two-way bindable array of selected values using `[(value)]` |

---
-->

| 프로퍼티 | 타입                 | 설명                                                          |
| -------- | -------------------- | ------------------------------------------------------------- |
| `value`  | `ModelSignal<any[]>` | `[(value)]`로 양방향 바인딩할 수 있는 선택된 값의 배열입니다. |

---

<!--
### Related components
-->

<a id="related-components"></a>

### 관련 컴포넌트

<!--
Autocomplete uses standard standalone [Listbox](/api/aria/listbox/Listbox) and [Option](/api/aria/listbox/Option) directives. See the [Listbox documentation](/guide/aria/listbox) for advanced options.
-->

자동 완성은 표준 독립형 [Listbox](/api/aria/listbox/Listbox)와 [Option](/api/aria/listbox/Option) 디렉티브를 사용합니다.
고급 옵션은 [리스트박스 문서](/guide/aria/listbox)를 참고하세요.
