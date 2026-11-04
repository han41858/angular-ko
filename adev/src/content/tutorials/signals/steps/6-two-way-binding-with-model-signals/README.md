<!--
# Two-way binding with model signals
-->

# 모델 시그널을 사용하는 양방향 바인딩

<!--
Now that you've learned [passing data to components with input signals](/tutorials/signals/5-component-communication-with-signals), let's explore Angular's `model()` API for two-way binding. Model signals are perfect for UI components like checkboxes, sliders, or custom form controls where the component needs to both receive a value AND update it.
-->

[입력 시그널로 컴포넌트에 데이터를 전달하는 방법](/tutorials/signals/5-component-communication-with-signals)을 배웠으니, 이제 양방향 바인딩을 위한 Angular의 `model()` API를 살펴봅시다. 모델 시그널은 체크박스, 슬라이더, 커스텀 폼 컨트롤처럼 값을 받으면서 갱신도 해야 하는 UI 컴포넌트에 적합합니다.

<!--
In this activity, you'll create a custom checkbox component that manages its own state while keeping the parent synchronized.
-->

이번 실습에서는 자체 상태를 관리하면서 부모와 동기화하는 커스텀 체크박스 컴포넌트를 만듭니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Set up the custom checkbox with model signal">
-->

<docs-step title="모델 시그널로 커스텀 체크박스 구성하기">

<a id="set-up-the-custom-checkbox-with-model-signal"></a>

<!--
Create a model signal in the `custom-checkbox` component that can both receive and update the parent's value.
-->

`custom-checkbox` 컴포넌트에 부모의 값을 받으면서 갱신할 수도 있는 모델 시그널을 만듭니다.

```ts
// Add imports for model signals
import {Component, model, input, ChangeDetectionStrategy} from '@angular/core';

// Model signal for two-way binding
checked = model.required<boolean>();

// Optional input for label
label = input<string>('');
```

<!--
Unlike `input()` signals which are read-only, `model()` signals can be both read and written to.
-->

읽기 전용인 `input()` 시그널과 달리, `model()` 시그널은 값을 읽고 쓸 수 있습니다.
</docs-step>

<!--
<docs-step title="Create the checkbox template">
-->

<docs-step title="체크박스 템플릿 만들기">

<a id="create-the-checkbox-template"></a>

<!--
Build the checkbox template that responds to clicks and updates its own model.
-->

클릭에 반응해서 자체 모델을 갱신하는 체크박스 템플릿을 만듭니다.

```html
<label class="custom-checkbox">
  <input type="checkbox" [checked]="checked()" (change)="toggle()" />
  <span class="checkmark"></span>
  {{ label() }}
</label>
```

<!--
The component reads from its model signal and has a method to update it.
-->

컴포넌트는 모델 시그널 값을 읽고, 메서드로 그 값을 갱신합니다.
</docs-step>

<!--
<docs-step title="Add the toggle method">
-->

<docs-step title="전환 메서드 추가하기">

<a id="add-the-toggle-method"></a>

<!--
Implement the toggle method that updates the model signal when the checkbox is clicked.
-->

체크박스를 클릭하면 모델 시그널을 갱신하는 전환 메서드를 구현합니다.

```ts
toggle() {
  // This updates BOTH the component's state AND the parent's model!
  this.checked.set(!this.checked());
}
```

<!--
When the child component calls `this.checked.set()`, it automatically propagates the change back to the parent. This is the key difference from `input()` signals.
-->

자식 컴포넌트가 `this.checked.set()`을 호출하면 변경 사항이 자동으로 부모에게 전달됩니다. 이것이 `input()` 시그널과의 핵심 차이입니다.
</docs-step>

<!--
<docs-step title="Set up two-way binding in the parent">
-->

<docs-step title="부모에 양방향 바인딩 구성하기">

<a id="set-up-two-way-binding-in-the-parent"></a>

<!--
First, uncomment the model signal properties and methods in `app.ts`:
-->

먼저 `app.ts`에서 모델 시그널 프로퍼티와 메서드의 주석을 해제합니다:

```ts
// Parent signal models
agreedToTerms = model(false);
enableNotifications = model(true);

// Methods to test two-way binding
toggleTermsFromParent() {
  this.agreedToTerms.set(!this.agreedToTerms());
}

resetAll() {
  this.agreedToTerms.set(false);
  this.enableNotifications.set(false);
}
```

<!--
Then update the template:
-->

그런 다음 템플릿을 수정합니다:

<!--
Part 1. **Uncomment the checkboxes and add two-way binding:**
-->

1단계. **체크박스의 주석을 해제하고 양방향 바인딩을 추가합니다:**

<!--
- Replace `___ADD_TWO_WAY_BINDING___` with `[(checked)]="agreedToTerms"` for the first checkbox
- Replace `___ADD_TWO_WAY_BINDING___` with `[(checked)]="enableNotifications"` for the second
-->

- 첫 번째 체크박스의 `___ADD_TWO_WAY_BINDING___`를 `[(checked)]="agreedToTerms"`로 교체합니다.
- 두 번째 체크박스의 `___ADD_TWO_WAY_BINDING___`를 `[(checked)]="enableNotifications"`로 교체합니다.

<!--
Part 2. **Replace the `???` placeholders with @if blocks:**
-->

2단계. **`???` 플레이스홀더를 @if 블록으로 교체합니다:**

```angular-html
@if (agreedToTerms()) {
  Yes
} @else {
  No
}

@if (enableNotifications()) {
  Yes
} @else {
  No
}
```

<!--
Part 3. **Add click handlers to the buttons:**
-->

3단계. **버튼에 클릭 핸들러를 추가합니다:**

```html
<button (click)="toggleTermsFromParent()">Toggle Terms from Parent</button>
<button (click)="resetAll()">Reset All</button>
```

<!--
The `[(checked)]` syntax creates two-way binding - data flows down to the component AND changes flow back up to the parent by emitting an event that references the signal itself and does _not_ call the signal getter directly.
-->

`[(checked)]` 문법은 양방향 바인딩을 만듭니다. 데이터가 자식 컴포넌트로 전달되고, 자식이 발생시킨 변경 이벤트는 부모 값을 갱신합니다. 이때 바인딩에는 시그널 자체를 전달하며, 시그널 getter를 직접 호출하지 _않습니다_.
</docs-step>

<!--
<docs-step title="Test the two-way binding">
-->

<docs-step title="양방향 바인딩 테스트하기">

<a id="test-the-two-way-binding"></a>

<!--
Interact with your app to see two-way binding in action:
-->

앱을 조작해서 양방향 바인딩을 확인해 보세요:

<!--
1. **Click checkboxes** - Component updates its own state and notifies parent
2. **Click "Toggle Terms from Parent"** - Parent updates propagate down to component
3. **Click "Reset All"** - Parent resets both models and components update automatically
-->

1. **체크박스를 클릭합니다** - 컴포넌트가 자체 상태를 갱신하고 부모에게 알립니다.
2. **"Toggle Terms from Parent"를 클릭합니다** - 부모의 갱신이 자식 컴포넌트에 전달됩니다.
3. **"Reset All"을 클릭합니다** - 부모가 두 모델을 초기화하고 컴포넌트가 자동으로 갱신됩니다.

<!--
Both the parent and child can update the shared state, and both stay in sync automatically!
-->

부모와 자식 모두 공유 상태를 갱신할 수 있으며, 양쪽은 자동으로 동기화됩니다!
</docs-step>

</docs-workflow>

<!--
Perfect! You've learned how model signals enable two-way binding:
-->

모델 시그널이 양방향 바인딩을 제공하는 방법을 배웠습니다:

<!--
- **Model signals** - Use `model()` and `model.required()` for values that can be both read and written
- **Two-way binding** - Use `[(property)]` syntax to bind parent signals to child models
- **Perfect for UI components** - Checkboxes, form controls, and widgets that need to manage their own state
- **Automatic synchronization** - Parent and child stay in sync without manual event handling
-->

- **모델 시그널** - 읽기와 쓰기가 모두 필요한 값에는 `model()`과 `model.required()`를 사용합니다.
- **양방향 바인딩** - `[(property)]` 문법으로 부모 시그널을 자식 모델에 바인딩합니다.
- **UI 컴포넌트에 적합** - 자체 상태를 관리해야 하는 체크박스, 폼 컨트롤, 위젯에 유용합니다.
- **자동 동기화** - 이벤트를 직접 처리하지 않아도 부모와 자식이 동기화됩니다.

<!--
**When to use `model()` vs `input()`:**
-->

**`model()`과 `input()`의 선택 기준:**

<!--
- Use `input()` for data that only flows down (display data, configuration)
- Use `model()` for UI components that need to update their own value (form controls, toggles)
-->

- 표시할 데이터나 설정처럼 아래 방향으로만 전달되는 데이터에는 `input()`을 사용합니다.
- 폼 컨트롤이나 토글처럼 자체 값을 갱신해야 하는 UI 컴포넌트에는 `model()`을 사용합니다.

<!--
In the next lesson, you'll learn about [using signals with services](/tutorials/signals/7-using-signals-with-services)!
-->

다음 단계에서는 [서비스에서 시그널을 사용하는 방법](/tutorials/signals/7-using-signals-with-services)을 배웁니다!
