<!--
# Deriving state with linked signals
-->

# linked 시그널로 상태 파생하기

<!--
Now that you've learned [how to derive state with computed signals](/tutorials/signals/2-deriving-state-with-computed-signals), you created a computed signal for `notificationsEnabled` that automatically followed your user status. But what if users want to manually disable notifications even when they're online? That's where linked signals come in.
-->

앞서 [computed 시그널로 상태를 파생하는 방법](/tutorials/signals/2-deriving-state-with-computed-signals)을 배우면서 사용자 상태를 자동으로 따르는 `notificationsEnabled` computed 시그널을 만들었습니다. 그런데 사용자가 온라인 상태에서도 알림을 직접 비활성화하고 싶다면 어떻게 할까요? 이때 linked 시그널을 사용합니다.

<!--
Linked signals are writable signals that maintain a reactive connection to their source signals. They're perfect for creating state that normally follows a computation but can be overridden when needed.
-->

linked 시그널은 원본 시그널과 반응형 연결을 유지하면서 값을 쓸 수 있는 시그널입니다. 보통은 계산 결과를 따르지만 필요하면 직접 값을 덮어쓸 수 있는 상태를 만들 때 유용합니다.

<!--
In this activity, you'll learn how `linkedSignal()` differs from `computed()` by enhancing the previous user status system's computed `notificationsEnabled` to a writable linked signal.
-->

이번 실습에서는 기존 사용자 상태 시스템의 `notificationsEnabled` computed 시그널을 값을 쓸 수 있는 linked 시그널로 바꾸면서, `linkedSignal()`과 `computed()`의 차이를 배웁니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Import linkedSignal function">
-->

<docs-step title="linkedSignal 함수 불러오기">

<a id="import-linkedsignal-function"></a>

<!--
Add `linkedSignal` to your existing imports.
-->

기존 import 구문에 `linkedSignal`을 추가합니다.

```ts
// Add linkedSignal to existing imports
import {Component, signal, computed, linkedSignal, ChangeDetectionStrategy} from '@angular/core';
```

</docs-step>

<!--
<docs-step title="Convert computed to linkedSignal with the same expression">
-->

<docs-step title="같은 표현식으로 computed를 linkedSignal로 바꾸기">

<a id="convert-computed-to-linkedsignal-with-the-same-expression"></a>

<!--
Replace the computed `notificationsEnabled` with a linkedSignal using the exact same expression:
-->

`notificationsEnabled`의 표현식은 그대로 유지하고 computed를 linkedSignal로 바꿉니다:

```ts
// Previously (from lesson 2):
// notificationsEnabled = computed(() => this.userStatus() === 'online');

// Now with linkedSignal - same expression, but writable:
notificationsEnabled = linkedSignal(() => this.userStatus() === 'online');
```

<!--
The expression is identical, but linkedSignal creates a writable signal. It will still automatically update when `userStatus` changes, but you can also set it manually.
-->

표현식은 같지만 linkedSignal은 값을 쓸 수 있는 시그널을 생성합니다. `userStatus`가 변경되면 여전히 자동으로 갱신되면서, 값을 직접 설정할 수도 있습니다.
</docs-step>

<!--
<docs-step title="Add a method to manually toggle notifications">
-->

<docs-step title="알림을 직접 전환하는 메서드 추가하기">

<a id="add-a-method-to-manually-toggle-notifications"></a>

<!--
Add a method to demonstrate that linked signals can be written to directly:
-->

linked 시그널에 값을 직접 쓸 수 있다는 것을 확인할 메서드를 추가합니다:

```ts
toggleNotifications() {
  // This works with linkedSignal but would error with computed!
  this.notificationsEnabled.set(!this.notificationsEnabled());
}
```

<!--
This is the key difference: computed signals are read-only, but linked signals can be updated manually while still maintaining their reactive connection.
-->

핵심 차이는 computed 시그널은 읽기 전용이지만, linked 시그널은 반응형 연결을 유지하면서도 직접 갱신할 수 있다는 점입니다.
</docs-step>

<!--
<docs-step title="Update the template to add manual notification control">
-->

<docs-step title="템플릿에 직접 알림을 제어하는 기능 추가하기">

<a id="update-the-template-to-add-manual-notification-control"></a>

<!--
Update your template to add a toggle button for notifications:
-->

템플릿에 알림을 전환하는 버튼을 추가합니다:

```angular-html
<div class="status-info">
  <div class="notifications">
    <strong>Notifications:</strong>
    @if (notificationsEnabled()) {
      Enabled
    } @else {
      Disabled
    }
    <button (click)="toggleNotifications()" class="override-btn">
      @if (notificationsEnabled()) {
        Disable
      } @else {
        Enable
      }
    </button>
  </div>
  <!-- existing message and working-hours divs remain -->
</div>
```

</docs-step>

<!--
<docs-step title="Observe the reactive behavior">
-->

<docs-step title="반응형 동작 확인하기">

<a id="observe-the-reactive-behavior"></a>

<!--
Now test the behavior:
-->

이제 동작을 확인해 보세요:

<!--
1. Change the user status - notice how `notificationsEnabled` updates automatically
2. Manually toggle notifications - it overrides the computed value
3. Change status again - the linked signal re-syncs with its computation
-->

1. 사용자 상태를 변경합니다. `notificationsEnabled`가 자동으로 갱신되는지 확인하세요.
2. 알림을 직접 전환합니다. 계산된 값이 덮어써집니다.
3. 상태를 다시 변경합니다. linked 시그널이 계산 결과와 다시 동기화됩니다.

<!--
This demonstrates that linked signals maintain their reactive connection even after being manually set!
-->

linked 시그널은 값을 직접 설정한 후에도 반응형 연결을 유지합니다!
</docs-step>

</docs-workflow>

<!--
Excellent! You've learned the key differences between computed and linked signals:
-->

computed 시그널과 linked 시그널의 핵심 차이를 배웠습니다:

<!--
- **Computed signals**: Read-only, always derived from other signals
- **Linked signals**: Writable, can be both derived AND manually updated
- **Use computed when**: The value should always be calculated
- **Use linkedSignal when**: You need a default computation that can be overridden
-->

- **computed 시그널**: 읽기 전용이며, 항상 다른 시그널에서 파생됩니다.
- **linked 시그널**: 값을 쓸 수 있으며, 파생되면서 직접 갱신할 수도 있습니다.
- **computed를 사용할 때**: 값이 항상 계산 결과여야 하는 경우입니다.
- **linkedSignal을 사용할 때**: 기본 계산 결과를 필요에 따라 덮어써야 하는 경우입니다.

<!--
In the next lesson, you'll learn [how to manage async data with signals](/tutorials/signals/4-managing-async-data-with-signals)!
-->

다음 단계에서는 [시그널로 비동기 데이터를 관리하는 방법](/tutorials/signals/4-managing-async-data-with-signals)을 배웁니다!
