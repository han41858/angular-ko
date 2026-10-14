<!--
# Deriving state with computed signals
-->

# computed 시그널로 상태 파생하기

<!--
Now that you've learned [how to create and update signals](/tutorials/signals/1-creating-your-first-signal), let's learn about computed signals. Computed signals are derived values that automatically update when their dependencies change. They're perfect for creating reactive calculations based on other signals.
-->

[시그널을 생성하고 갱신하는 방법](/tutorials/signals/1-creating-your-first-signal)을 배웠으니, 이제 computed 시그널을 알아봅시다. computed 시그널은 의존성이 변경되면 자동으로 갱신되는 파생 값입니다. 다른 시그널을 기반으로 반응형 계산을 할 때 유용합니다.

<!--
In this activity, you'll learn how to use the `computed()` function to create derived state that updates automatically when the underlying signals change.
-->

이번 실습에서는 `computed()` 함수로 원본 시그널이 변경되면 자동으로 갱신되는 파생 상태를 만드는 방법을 배웁니다.

<!--
Let's enhance our user status system by adding computed values that derive information from our user status signal. The starter code now includes three status options: `'online'`, `'away'`, and `'offline'`.
-->

사용자 상태 시그널에서 정보를 파생하는 computed 값을 추가해서 사용자 상태 시스템을 개선해 봅시다. 시작 코드에는 `'online'`, `'away'`, `'offline'` 세 가지 상태가 있습니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Import computed function">
-->

<docs-step title="computed 함수 불러오기">

<a id="import-computed-function"></a>

<!--
Add `computed` to your existing imports.
-->

기존 import 구문에 `computed`를 추가합니다.

```ts
// Add computed to existing imports
import {Component, signal, computed, ChangeDetectionStrategy} from '@angular/core';
```

</docs-step>

<!--
<docs-step title="Create a computed signal for notifications">
-->

<docs-step title="알림용 computed 시그널 생성하기">

<a id="create-a-computed-signal-for-notifications"></a>

<!--
Add a computed signal that determines if notifications should be enabled based on user status.
-->

사용자 상태를 기준으로 알림을 활성화할지 결정하는 computed 시그널을 추가합니다.

```ts
notificationsEnabled = computed(() => this.userStatus() === 'online');
```

<!--
This computed signal will automatically recalculate whenever the `userStatus` signal changes. Notice how we call `this.userStatus()` inside the computed function to read the signal's value.
-->

이 computed 시그널은 `userStatus` 시그널이 변경될 때마다 값을 다시 계산합니다. computed 함수 안에서 `this.userStatus()`를 호출해서 시그널 값을 읽는다는 점에 주목하세요.
</docs-step>

<!--
<docs-step title="Create a computed signal for a descriptive message">
-->

<docs-step title="상태 설명 메시지용 computed 시그널 생성하기">

<a id="create-a-computed-signal-for-a-descriptive-message"></a>

<!--
Add a computed signal that creates a descriptive message based on the user status.
-->

사용자 상태를 설명하는 메시지를 생성하는 computed 시그널을 추가합니다.

```ts
statusMessage = computed(() => {
  const status = this.userStatus();
  switch (status) {
    case 'online':
      return 'Available for meetings and messages';
    case 'away':
      return 'Temporarily away, will respond soon';
    case 'offline':
      return 'Not available, check back later';
    default:
      return 'Status unknown';
  }
});
```

<!--
This shows how computed signals can handle more complex logic with switch statements and string transformations.
-->

computed 시그널 안에서 switch 구문과 문자열 변환으로 더 복잡한 로직을 처리할 수도 있습니다.
</docs-step>

<!--
<docs-step title="Create a computed signal that calculates working hours availability">
-->

<docs-step title="근무 시간 여부를 계산하는 computed 시그널 생성하기">

<a id="create-a-computed-signal-that-calculates-working-hours-availability"></a>

<!--
Add a computed signal that calculates if the user is within their working hours.
-->

사용자가 근무 시간 중인지 계산하는 computed 시그널을 추가합니다.

```ts
isWithinWorkingHours = computed(() => {
  const now = new Date();
  const hour = now.getHours();
  const isWeekday = now.getDay() > 0 && now.getDay() < 6;
  return this.userStatus() !== 'offline' && isWeekday && hour >= 9 && hour < 17;
});
```

<!--
This demonstrates how computed signals can perform calculations and combine multiple data sources. The value updates automatically when the `userStatus` changes.
-->

computed 시그널로 계산을 수행하고 여러 데이터 소스를 조합할 수 있습니다. `userStatus`가 변경되면 값이 자동으로 갱신됩니다.
</docs-step>

<!--
<docs-step title="Display the computed values in the template">
-->

<docs-step title="템플릿에 computed 값 표시하기">

<a id="display-the-computed-values-in-the-template"></a>

<!--
The template already has placeholders showing "Loading...". Replace them with your computed signals:
-->

템플릿에는 이미 "Loading..."이라고 표시되는 영역이 있습니다. 이를 computed 시그널로 교체합니다:

<!--
1. For notifications, replace `Loading...` with an `@if` block:
-->

1. 알림 영역의 `Loading...`을 `@if` 블록으로 교체합니다:

   ```angular-html
   @if (notificationsEnabled()) {
     Enabled
   } @else {
     Disabled
   }
   ```

<!--
1. For the message, replace `Loading...` with:
-->

1. 메시지 영역의 `Loading...`을 다음과 같이 교체합니다:

   ```angular-html
   {{ statusMessage() }}
   ```

<!--
1. For working hours, replace `Loading...` with an `@if` block:
-->

1. 근무 시간 영역의 `Loading...`을 `@if` 블록으로 교체합니다:

   ```angular-html
   @if (isWithinWorkingHours()) {
     Yes
   } @else {
     No
   }
   ```

<!--
Notice how computed signals are called just like regular signals - with parentheses!
-->

computed 시그널도 일반 시그널과 마찬가지로 괄호를 붙여서 호출합니다!
</docs-step>

</docs-workflow>

<!--
Excellent! You've now learned how to create computed signals.
-->

computed 시그널을 만드는 방법을 배웠습니다!

<!--
Here are some key points to remember:
-->

다음 핵심 내용을 기억하세요:

<!--
- **Computed signals are reactive**: They automatically update when their dependencies change
- **They're read-only**: You can't directly set computed values, they're derived from other signals
- **They can contain complex logic**: Use them for calculations, transformations, and derived state
- **They provide a way to make performant computations based on dynamic state**: Angular only recalculates them when their dependencies actually change
-->

- **반응형 동작**: 의존성이 변경되면 자동으로 갱신됩니다.
- **읽기 전용**: computed 값은 다른 시그널에서 파생되므로 직접 설정할 수 없습니다.
- **복잡한 로직 처리**: 계산, 변환, 파생 상태에 사용할 수 있습니다.
- **동적인 상태를 효율적으로 계산**: Angular는 의존성이 실제로 변경되었을 때만 값을 다시 계산합니다.

<!--
In the next lesson, you'll learn about [a different way to derive state with linkedSignals](/tutorials/signals/3-deriving-state-with-linked-signals)!
-->

다음 단계에서는 [linkedSignal로 상태를 파생하는 또 다른 방법](/tutorials/signals/3-deriving-state-with-linked-signals)을 배웁니다!
