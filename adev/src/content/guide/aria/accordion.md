<!--
<docs-decorative-header title="Accordion">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" title="Accordion ARIA pattern"/>
  <docs-pill href="/api?query=accordion#angular_aria_accordion" title="Accordion API Reference"/>
</docs-pill-row>
-->

<docs-decorative-header title="아코디언">
</docs-decorative-header>

<docs-pill-row>
  <docs-pill href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" title="아코디언 ARIA 패턴"/>
  <docs-pill href="/api?query=accordion#angular_aria_accordion" title="아코디언 API 레퍼런스"/>
</docs-pill-row>

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
An accordion organizes related content into expandable and collapsible sections, reducing page scrolling and helping users focus on relevant information. Each section has a trigger button and a content panel. Clicking a trigger toggles the visibility of its associated panel.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.css"/>
</docs-code-multifile>
-->

아코디언은 관련 콘텐츠를 펼치고 접을 수 있는 섹션으로 구성합니다.
페이지 스크롤을 줄이고 사용자가 필요한 정보에 집중하도록 돕습니다.
각 섹션은 트리거 버튼과 콘텐츠 패널로 구성되며, 트리거를 클릭하면 연결된 패널을 표시하거나 숨깁니다.

<docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts">
  <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts"/>
  <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.html"/>
  <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.css"/>
</docs-code-multifile>

<!--
## Usage
-->

<a id="usage"></a>

## 사용법

<!--
Accordions work well for organizing content into logical groups where users typically need to view one section at a time.

**Use accordions when:**

- Displaying FAQs with multiple questions and answers
- Organizing long forms into manageable sections
- Reducing scrolling on content-heavy pages
- Progressively disclosing related information

**Avoid accordions when:**

- Building navigation menus (use the [Menu](guide/aria/menu) component instead)
- Creating tabbed interfaces (use the [Tabs](guide/aria/tabs) component instead)
- Showing a single collapsible section (use a disclosure pattern instead)
- Users need to see multiple sections simultaneously (consider a different layout)
-->

아코디언은 콘텐츠를 논리적인 그룹으로 나누고, 사용자가 대체로 한 번에 하나의 섹션을 확인하는 경우에 적합합니다.

**아코디언을 사용하기 좋은 경우:**

- 여러 질문과 답변으로 구성된 FAQ를 표시할 때
- 긴 폼을 다루기 쉬운 섹션으로 나눌 때
- 콘텐츠가 많은 페이지에서 스크롤을 줄일 때
- 관련 정보를 단계적으로 공개할 때

**아코디언을 피해야 하는 경우:**

- 탐색 메뉴를 만들 때([메뉴](guide/aria/menu) 컴포넌트를 사용하세요)
- 탭 인터페이스를 만들 때([탭](guide/aria/tabs) 컴포넌트를 사용하세요)
- 접을 수 있는 섹션을 하나만 표시할 때(펼침/접기 패턴을 사용하세요)
- 사용자가 여러 섹션을 동시에 확인해야 할 때(다른 레이아웃을 고려하세요)

<!--
## Features
-->

<a id="features"></a>

## 주요 기능

<!--
- **Expansion modes** - Control whether one or multiple panels can be open at the same time
- **Keyboard navigation** - Navigate between triggers using arrow keys, Home, and End
- **Lazy rendering** - Content is only created when a panel first expands, improving initial load performance
- **Disabled states** - Disable the entire group or individual triggers
- **Focus management** - Control whether disabled items can receive keyboard focus
- **Programmatic control** - Expand, collapse, or toggle panels from your component code
- **RTL support** - Automatic support for right-to-left languages
-->

- **펼침 모드**: 한 번에 하나의 패널만 열거나 여러 패널을 열도록 제어합니다.
- **키보드 탐색**: 방향키, Home, End로 트리거 사이를 이동합니다.
- **지연 렌더링**: 패널을 처음 펼칠 때만 콘텐츠를 생성해서 초기 로딩 성능을 개선합니다.
- **비활성화 상태**: 전체 그룹이나 개별 트리거를 비활성화합니다.
- **포커스 관리**: 비활성화된 항목이 키보드 포커스를 받을 수 있는지 제어합니다.
- **코드로 제어**: 컴포넌트 코드에서 패널을 펼치거나 접고, 펼침 상태를 전환합니다.
- **RTL 지원**: 오른쪽에서 왼쪽으로 쓰는 언어를 자동으로 지원합니다.

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Single expansion mode
-->

<a id="single-expansion-mode"></a>

### 단일 펼침 모드

<!--
Set `[multiExpandable]="false"` to allow only one panel to be open at a time. Opening a new panel automatically closes any previously open panel.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

This mode works well for FAQs or situations where you want users to focus on one answer at a time.
-->

`[multiExpandable]="false"`로 설정하면 한 번에 하나의 패널만 열 수 있습니다.
새 패널을 열면 이전에 열려 있던 패널은 자동으로 닫힙니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/single-expansion/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

이 모드는 FAQ나 사용자가 한 번에 하나의 답변에 집중하도록 할 때 적합합니다.

<!--
### Multiple expansion mode
-->

<a id="multiple-expansion-mode"></a>

### 다중 펼침 모드

<!--
Set `[multiExpandable]="true"` to allow multiple panels to be open simultaneously. Users can expand as many panels as needed without closing others.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

This mode is useful for form sections or when users need to compare content across multiple panels.

NOTE: The `multiExpandable` input defaults to `true`. Set it to `false` explicitly if you want single expansion behavior.
-->

`[multiExpandable]="true"`로 설정하면 여러 패널을 동시에 열 수 있습니다.
사용자는 다른 패널을 닫지 않고 필요한 만큼 패널을 펼칠 수 있습니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/multi-expansion/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

이 모드는 폼의 섹션이나 여러 패널의 콘텐츠를 비교해야 하는 경우에 유용합니다.

NOTE: `multiExpandable` 입력 프로퍼티의 기본값은 `true`입니다.
한 번에 하나의 패널만 펼치려면 명시적으로 `false`로 설정하세요.

<!--
### Disabled accordion items
-->

<a id="disabled-accordion-items"></a>

### 비활성화된 아코디언 항목

<!--
Disable specific triggers using the `disabled` input. Control how disabled items behave during keyboard navigation using the `softDisabled` input on the accordion group.

<docs-tab-group>
  <docs-tab label="Basic">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Retro">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

When `[softDisabled]="true"` (the default), disabled items can receive focus but cannot be activated. When `[softDisabled]="false"`, disabled items are skipped entirely during keyboard navigation.
-->

`disabled` 입력 프로퍼티로 특정 트리거를 비활성화할 수 있습니다.
키보드 탐색 중 비활성화된 항목의 동작은 아코디언 그룹의 `softDisabled` 입력 프로퍼티로 제어합니다.

<docs-tab-group>
  <docs-tab label="기본">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/basic/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="Material">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/material/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
  <docs-tab label="레트로">
    <docs-code-multifile preview hideCode path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.ts">
      <docs-code header="TS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.ts"/>
      <docs-code header="HTML" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.html"/>
      <docs-code header="CSS" path="adev/src/content/examples/aria/accordion/src/disabled-focusable/retro/app/app.css"/>
    </docs-code-multifile>
  </docs-tab>
</docs-tab-group>

`[softDisabled]="true"`(기본값)이면 비활성화된 항목도 포커스를 받을 수 있지만 활성화할 수는 없습니다.
`[softDisabled]="false"`이면 키보드 탐색에서 비활성화된 항목을 완전히 건너뜁니다.

<!--
### Lazy content rendering
-->

<a id="lazy-content-rendering"></a>

### 콘텐츠 지연 렌더링

<!--
Use the `ngAccordionContent` directive on an `ng-template` to defer rendering content until the panel first expands. This improves performance for accordions with heavy content like images, charts, or complex components.

```angular-html
<div ngAccordionGroup>
  <div>
    <button ngAccordionTrigger [panel]="panel1">Trigger Text</button>
    <div ngAccordionPanel #panel1="ngAccordionPanel">
      <ng-template ngAccordionContent>
        <!- This content only renders when the panel first opens ->
        <img src="large-image.jpg" alt="Description" />
        <app-expensive-component />
      </ng-template>
    </div>
  </div>
</div>
```

By default, content remains in the DOM after the panel collapses. Set `[preserveContent]="false"` to remove the content from the DOM when the panel closes.
-->

`ng-template`에 `ngAccordionContent` 디렉티브를 적용하면 패널을 처음 펼칠 때까지 콘텐츠 렌더링을 미룰 수 있습니다.
이미지, 차트, 복잡한 컴포넌트처럼 처리 비용이 큰 콘텐츠를 포함한 아코디언의 성능을 개선할 수 있습니다.

```angular-html
<div ngAccordionGroup>
  <div>
    <button ngAccordionTrigger [panel]="panel1">Trigger Text</button>
    <div ngAccordionPanel #panel1="ngAccordionPanel">
      <ng-template ngAccordionContent>
        <!-- 이 콘텐츠는 패널을 처음 열 때만 렌더링됩니다. -->
        <img src="large-image.jpg" alt="Description" />
        <app-expensive-component />
      </ng-template>
    </div>
  </div>
</div>
```

기본적으로 패널을 접은 뒤에도 콘텐츠는 DOM에 남습니다.
패널을 닫을 때 DOM에서 콘텐츠를 제거하려면 `[preserveContent]="false"`로 설정하세요.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트

<!--
Angular Aria provides component harnesses for testing accordion components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {AccordionGroupHarness} from '@angular/aria/accordion/testing';
import {MyAccordionComponent} from './my-accordion'; // Your component

describe('MyAccordionComponent', () => {
  let fixture: ComponentFixture<MyAccordionComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAccordionComponent],
    });

    fixture = TestBed.createComponent(MyAccordionComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow expanding panels', async () => {
    // Load the accordion group harness
    const group = await loader.getHarness(AccordionGroupHarness);

    // Get all individual accordions (items) in the group
    const accordions = await group.getAccordions();
    expect(accordions.length).toBe(3);

    // Verify initial state (first expanded, others collapsed)
    expect(await accordions[0].isExpanded()).toBe(true);
    expect(await accordions[1].isExpanded()).toBe(false);

    // Expand the second panel
    await accordions[1].expand();

    // Verify updated state
    expect(await accordions[1].isExpanded()).toBe(true);
    // If multiExpandable is false, the first one should now be collapsed
    expect(await accordions[0].isExpanded()).toBe(false);
  });
});
```
-->

Angular Aria는 아코디언 컴포넌트를 테스트할 수 있는 컴포넌트 하네스를 제공합니다.
컴포넌트 테스트에서 하네스를 사용하는 예제는 다음과 같습니다.

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {AccordionGroupHarness} from '@angular/aria/accordion/testing';
import {MyAccordionComponent} from './my-accordion'; // 테스트할 컴포넌트

describe('MyAccordionComponent', () => {
  let fixture: ComponentFixture<MyAccordionComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAccordionComponent],
    });

    fixture = TestBed.createComponent(MyAccordionComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow expanding panels', async () => {
    // 아코디언 그룹 하네스를 불러옵니다.
    const group = await loader.getHarness(AccordionGroupHarness);

    // 그룹에 있는 모든 개별 아코디언(항목)을 가져옵니다.
    const accordions = await group.getAccordions();
    expect(accordions.length).toBe(3);

    // 초기 상태를 확인합니다(첫 번째 패널은 펼쳐지고 나머지는 접힌 상태).
    expect(await accordions[0].isExpanded()).toBe(true);
    expect(await accordions[1].isExpanded()).toBe(false);

    // 두 번째 패널을 펼칩니다.
    await accordions[1].expand();

    // 변경된 상태를 확인합니다.
    expect(await accordions[1].isExpanded()).toBe(true);
    // multiExpandable이 false이면 이제 첫 번째 패널은 접혀 있어야 합니다.
    expect(await accordions[0].isExpanded()).toBe(false);
  });
});
```

<!--
## APIs
-->

<a id="apis"></a>

## API

<!--
### AccordionGroup
-->

<a id="accordiongroup"></a>

### AccordionGroup

<!--
The container directive that manages keyboard navigation and expansion behavior for a group of accordion items.
-->

아코디언 항목 그룹의 키보드 탐색과 펼침 동작을 관리하는 컨테이너 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs"></a>

#### 입력 프로퍼티

<!--
| Property          | Type      | Default | Description                                                               |
| ----------------- | --------- | ------- | ------------------------------------------------------------------------- |
| `disabled`        | `boolean` | `false` | Disables all triggers in the group                                        |
| `multiExpandable` | `boolean` | `true`  | Whether multiple panels can be expanded simultaneously                    |
| `softDisabled`    | `boolean` | `true`  | When `true`, disabled items are focusable. When `false`, they are skipped |
| `wrap`            | `boolean` | `false` | Whether keyboard navigation wraps from last to first item and vice versa  |
-->

| 프로퍼티          | 타입      | 기본값  | 설명                                                                                        |
| ----------------- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| `disabled`        | `boolean` | `false` | 그룹의 모든 트리거를 비활성화합니다.                                                        |
| `multiExpandable` | `boolean` | `true`  | 여러 패널을 동시에 펼칠 수 있는지 지정합니다.                                               |
| `softDisabled`    | `boolean` | `true`  | `true`이면 비활성화된 항목도 포커스를 받을 수 있습니다. `false`이면 해당 항목을 건너뜁니다. |
| `wrap`            | `boolean` | `false` | 키보드 탐색에서 마지막 항목과 첫 번째 항목 사이를 양방향으로 순환할지 지정합니다.           |

<!--
#### Methods
-->

<a id="methods"></a>

#### 메서드

<!--
| Method        | Parameters | Description                                                      |
| ------------- | ---------- | ---------------------------------------------------------------- |
| `expandAll`   | none       | Expands all panels (only works when `multiExpandable` is `true`) |
| `collapseAll` | none       | Collapses all panels                                             |
-->

| 메서드        | 인자 | 설명                                                                |
| ------------- | ---- | ------------------------------------------------------------------- |
| `expandAll`   | 없음 | 모든 패널을 펼칩니다(`multiExpandable`이 `true`일 때만 동작합니다). |
| `collapseAll` | 없음 | 모든 패널을 접습니다.                                               |

<!--
### AccordionTrigger
-->

<a id="accordiontrigger"></a>

### AccordionTrigger

<!--
The directive applied to the button element that toggles panel visibility.
-->

패널을 표시하거나 숨기는 버튼 엘리먼트에 적용하는 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs-1"></a>

#### 입력 프로퍼티

<!--
| Property   | Type             | Default | Description                                                    |
| ---------- | ---------------- | ------- | -------------------------------------------------------------- |
| `panel`    | `AccordionPanel` | —       | **Required.** The reference of the controlled accordion panel. |
| `id`       | `string`         | auto    | Unique identifier for the trigger                              |
| `disabled` | `boolean`        | `false` | Disables this trigger                                          |
| `expanded` | `boolean`        | `false` | Whether the panel is expanded (supports two-way binding)       |
-->

| 프로퍼티   | 타입             | 기본값    | 설명                                                         |
| ---------- | ---------------- | --------- | ------------------------------------------------------------ |
| `panel`    | `AccordionPanel` | —         | **필수.** 제어할 아코디언 패널의 참조입니다.                 |
| `id`       | `string`         | 자동 생성 | 트리거의 고유 식별자입니다.                                  |
| `disabled` | `boolean`        | `false`   | 이 트리거를 비활성화합니다.                                  |
| `expanded` | `boolean`        | `false`   | 패널이 펼쳐져 있는지 나타냅니다(양방향 바인딩을 지원합니다). |

<!--
#### Signals
-->

<a id="signals"></a>

#### 시그널

<!--
| Property | Type              | Description                             |
| -------- | ----------------- | --------------------------------------- |
| `active` | `Signal<boolean>` | Whether the trigger currently has focus |
-->

| 프로퍼티 | 타입              | 설명                                      |
| -------- | ----------------- | ----------------------------------------- |
| `active` | `Signal<boolean>` | 현재 트리거에 포커스가 있는지 나타냅니다. |

<!--
#### Methods
-->

<a id="methods-1"></a>

#### 메서드

<!--
| Method     | Parameters | Description                       |
| ---------- | ---------- | --------------------------------- |
| `expand`   | none       | Expands the associated panel      |
| `collapse` | none       | Collapses the associated panel    |
| `toggle`   | none       | Toggles the panel expansion state |
-->

| 메서드     | 인자 | 설명                           |
| ---------- | ---- | ------------------------------ |
| `expand`   | 없음 | 연결된 패널을 펼칩니다.        |
| `collapse` | 없음 | 연결된 패널을 접습니다.        |
| `toggle`   | 없음 | 패널의 펼침 상태를 전환합니다. |

<!--
### AccordionPanel
-->

<a id="accordionpanel"></a>

### AccordionPanel

<!--
The directive applied to the element containing the collapsible content.
-->

접을 수 있는 콘텐츠를 포함한 엘리먼트에 적용하는 디렉티브입니다.

<!--
#### Inputs
-->

<a id="inputs-2"></a>

#### 입력 프로퍼티

<!--
| Property          | Type      | Default | Description                                          |
| ----------------- | --------- | ------- | ---------------------------------------------------- |
| `id`              | `string`  | auto    | Unique identifier for the panel                      |
| `preserveContent` | `boolean` | `true`  | Whether to keep content in DOM after panel collapses |
-->

| 프로퍼티          | 타입      | 기본값    | 설명                                                   |
| ----------------- | --------- | --------- | ------------------------------------------------------ |
| `id`              | `string`  | 자동 생성 | 패널의 고유 식별자입니다.                              |
| `preserveContent` | `boolean` | `true`    | 패널을 접은 뒤에도 콘텐츠를 DOM에 유지할지 지정합니다. |

<!--
#### Signals
-->

<a id="signals-1"></a>

#### 시그널

<!--
| Property  | Type              | Description                             |
| --------- | ----------------- | --------------------------------------- |
| `visible` | `Signal<boolean>` | Whether the panel is currently expanded |
-->

| 프로퍼티  | 타입              | 설명                                  |
| --------- | ----------------- | ------------------------------------- |
| `visible` | `Signal<boolean>` | 현재 패널이 펼쳐져 있는지 나타냅니다. |

<!--
#### Methods
-->

<a id="methods-2"></a>

#### 메서드

<!--
| Method     | Parameters | Description                 |
| ---------- | ---------- | --------------------------- |
| `expand`   | none       | Expands this panel          |
| `collapse` | none       | Collapses this panel        |
| `toggle`   | none       | Toggles the expansion state |
-->

| 메서드     | 인자 | 설명                    |
| ---------- | ---- | ----------------------- |
| `expand`   | 없음 | 이 패널을 펼칩니다.     |
| `collapse` | 없음 | 이 패널을 접습니다.     |
| `toggle`   | 없음 | 펼침 상태를 전환합니다. |

<!--
### AccordionContent
-->

<a id="accordioncontent"></a>

### AccordionContent

<!--
The structural directive applied to an `ng-template` inside an accordion panel to enable lazy rendering.

This directive has no inputs, outputs, or methods. Apply it to an `ng-template` element:

```angular-html
<div ngAccordionPanel #panel1="ngAccordionPanel">
  <ng-template ngAccordionContent>
    <!- Content here is lazily rendered ->
  </ng-template>
</div>
```
-->

아코디언 패널 안의 `ng-template`에 적용해서 지연 렌더링을 활성화하는 구조 디렉티브입니다.

이 디렉티브에는 입력 프로퍼티, 출력 프로퍼티, 메서드가 없습니다.
`ng-template` 엘리먼트에 다음과 같이 적용합니다.

```angular-html
<div ngAccordionPanel #panel1="ngAccordionPanel">
  <ng-template ngAccordionContent>
    <!-- 이 콘텐츠는 지연 렌더링됩니다. -->
  </ng-template>
</div>
```
