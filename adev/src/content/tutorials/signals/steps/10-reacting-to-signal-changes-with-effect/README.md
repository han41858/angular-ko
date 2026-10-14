<!--
# Reacting to signal changes with effect
-->

# effect로 시그널 변경에 반응하기

<!--
Now that you've learned [querying child elements with signal queries](/tutorials/signals/9-query-child-elements-with-signal-queries), let's explore how to react to signal changes with effects. Effects are functions that run automatically when their dependencies change, making them perfect for side effects like logging, DOM manipulation, or API calls.
-->

[시그널 쿼리로 자식 엘리먼트를 조회하는 방법](/tutorials/signals/9-query-child-elements-with-signal-queries)을 배웠으니, 이제 이펙트로 시그널 변경에 반응하는 방법을 살펴봅시다. 이펙트는 의존성이 변경되면 자동으로 실행되는 함수입니다. 로깅, DOM 조작, API 호출과 같은 부수 효과에 적합합니다.

<!--
**Important: Effects should be the last API you reach for.** Always prefer `computed()` for derived values and `linkedSignal()` for values that can be both derived and manually set. If you find yourself copying data from one signal to another with an effect, it's a sign you should move your source-of-truth higher up and use `computed()` or `linkedSignal()` instead. Effects are best for syncing signal state to imperative, non-signal APIs.
-->

**중요: 이펙트는 다른 방법으로 해결할 수 없을 때 마지막으로 선택하세요.** 파생 값에는 항상 `computed()`를 우선 사용하고, 파생되면서 직접 설정할 수도 있는 값에는 `linkedSignal()`을 우선 사용하세요. 이펙트로 시그널 사이에 데이터를 복사하고 있다면, 상태의 원천을 더 상위로 옮기고 `computed()`나 `linkedSignal()`을 사용하는 것이 좋습니다. 이펙트는 시그널 상태를 시그널 기반이 아닌 명령형 API와 동기화하는 데 적합합니다.

<!--
In this activity, you'll learn how to use the `effect()` function appropriately for legitimate side effects that respond to signal changes.
-->

이번 실습에서는 시그널 변경에 반응하는 부수 효과에 `effect()` 함수를 적절하게 사용하는 방법을 배웁니다.

<hr />

<!--
You have a theme manager app with signals already set up. Now you'll add effects to automatically react to signal changes.
-->

시그널이 이미 구성된 테마 관리 앱이 있습니다. 여기에 이펙트를 추가해서 시그널 변경에 자동으로 반응하도록 합니다.

<docs-workflow>

<!--
<docs-step title="Import effect function">
-->

<docs-step title="effect 함수 불러오기">

<a id="import-effect-function"></a>

<!--
Add `effect` to your existing imports.
-->

기존 import 구문에 `effect`를 추가합니다.

```ts
// Add effect to existing imports
import {Component, signal, computed, effect, ChangeDetectionStrategy} from '@angular/core';
```

<!--
The `effect` function creates a reactive side effect that runs automatically when any signals it reads change.
-->

`effect` 함수는 실행 중에 읽은 시그널이 변경되면 자동으로 실행되는 반응형 부수 효과를 만듭니다.
</docs-step>

<!--
<docs-step title="Create an effect for local storage">
-->

<docs-step title="로컬 스토리지용 이펙트 생성하기">

<a id="create-an-effect-for-local-storage"></a>

<!--
Add an effect that automatically saves the theme to local storage when it changes.
-->

테마가 변경되면 로컬 스토리지에 자동으로 저장하는 이펙트를 추가합니다.

```ts
constructor() {
  // Save theme to localStorage whenever it changes
  effect(() => {
    localStorage.setItem('theme', this.theme());
    console.log('Theme saved to localStorage:', this.theme());
  });
}
```

<!--
This effect runs whenever the theme signal changes, automatically persisting the user's preference.
-->

이 이펙트는 테마 시그널이 변경될 때마다 실행되어 사용자가 선택한 설정을 자동으로 저장합니다.
</docs-step>

<!--
<docs-step title="Create an effect for logging user activity">
-->

<docs-step title="사용자 활동을 기록하는 이펙트 생성하기">

<a id="create-an-effect-for-logging-user-activity"></a>

<!--
Add an effect that logs when the user logs in or out.
-->

사용자가 로그인하거나 로그아웃할 때 로그를 남기는 이펙트를 추가합니다.

```ts
constructor() {
  // ... previous effect

  // Log user activity changes
  effect(() => {
    const status = this.isLoggedIn() ? 'logged in' : 'logged out';
    const user = this.username();
    console.log(`User ${user} is ${status}`);
  });
}
```

<!--
This effect demonstrates how effects can read multiple signals and react to changes in any of them.
-->

이 예제는 이펙트가 여러 시그널을 읽고, 그중 어느 시그널이 변경되더라도 반응할 수 있다는 것을 보여줍니다.
</docs-step>

<!--
<docs-step title="Create an effect with cleanup">
-->

<docs-step title="정리 작업이 있는 이펙트 생성하기">

<a id="create-an-effect-with-cleanup"></a>

<!--
Add an effect that sets up a timer and cleans up when the component is destroyed.
-->

타이머를 설정하고 컴포넌트가 소멸할 때 정리하는 이펙트를 추가합니다.

```ts
constructor() {
  // ... previous effects

  // Timer effect with cleanup
  effect((onCleanup) => {
    const interval = setInterval(() => {
      console.log('Timer tick - Current theme:', this.theme());
    }, 5000);

    // Clean up the interval when the effect is destroyed
    onCleanup(() => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    });
  });
}
```

<!--
This effect reads no signals while it runs, because `this.theme()` is only called later inside the `setInterval` callback. It runs once and never re-runs, so the cleanup only happens when the component is destroyed, for example when the preview reloads.
-->

이 이펙트가 실행되는 동안에는 시그널을 읽지 않습니다. `this.theme()`은 나중에 `setInterval` 콜백 안에서만 호출되기 때문입니다. 이펙트는 한 번 실행된 후 다시 실행되지 않으므로, 미리보기를 새로고침하는 경우처럼 컴포넌트가 소멸할 때만 정리 작업이 실행됩니다.
</docs-step>

<!--
<docs-step title="Test the effects">
-->

<docs-step title="이펙트 테스트하기">

<a id="test-the-effects"></a>

<!--
Open the browser console and interact with the app:
-->

브라우저 콘솔을 열고 앱을 조작해 보세요:

<!--
- **Toggle Theme** - See localStorage saves
- **Login/Logout** - See user activity logging
- **Watch Timer** - See periodic theme logging every 5 seconds
-->

- **Toggle Theme** - localStorage에 저장되는 것을 확인합니다.
- **Login/Logout** - 사용자 활동 로그를 확인합니다.
- **Watch Timer** - 5초마다 테마 로그가 출력되는 것을 확인합니다.

<!--
Effects run once when the component is created, so some of these logs appear before you click anything. After that, they run again whenever the signals they read change.
-->

이펙트는 컴포넌트가 생성될 때 한 번 실행되므로, 아무것도 클릭하기 전에 일부 로그가 나타납니다. 이후에는 이펙트가 읽은 시그널이 변경될 때마다 다시 실행됩니다.
</docs-step>

</docs-workflow>

<!--
Excellent! You've now learned how to use effects with signals. Key concepts to remember:
-->

시그널과 이펙트를 함께 사용하는 방법을 배웠습니다! 기억할 핵심 개념은 다음과 같습니다:

<!--
- **Effects are reactive**: They automatically run when any signal they read changes
- **Side effects only**: Perfect for logging, DOM manipulation, API calls, and syncing to imperative APIs
- **Cleanup**: Use the `onCleanup` callback to clean up resources like timers or subscriptions
- **Automatic tracking**: Effects automatically track which signals they read and re-run when those signals change
-->

- **반응형 동작**: 이펙트가 읽은 시그널이 변경되면 자동으로 실행됩니다.
- **부수 효과 처리**: 로깅, DOM 조작, API 호출, 명령형 API와의 동기화에 적합합니다.
- **정리 작업**: `onCleanup` 콜백으로 타이머나 구독과 같은 자원을 정리합니다.
- **자동 추적**: 읽은 시그널을 자동으로 추적하고 해당 시그널이 변경되면 다시 실행됩니다.

<!--
**Remember: Use effects sparingly!** The examples in this lesson (localStorage sync, logging, timers) are appropriate uses. Avoid effects for:
-->

**이펙트는 꼭 필요할 때만 사용하세요!** 이번 단계의 localStorage 동기화, 로깅, 타이머는 적절한 사용 예입니다. 다음 작업에는 이펙트를 사용하지 않는 것이 좋습니다:

<!--
- Deriving values from other signals - use `computed()` instead
- Creating writable derived state - use `linkedSignal()` instead
- Copying data between signals - restructure to use a shared source of truth
-->

- 다른 시그널에서 값을 파생하기 - `computed()`를 사용하세요.
- 값을 쓸 수 있는 파생 상태 만들기 - `linkedSignal()`을 사용하세요.
- 시그널 사이에서 데이터 복사하기 - 상태의 원천을 공유하도록 구조를 변경하세요.

<!--
Effects are powerful but should be your last resort when `computed()` and `linkedSignal()` can't solve your use case.
-->

이펙트는 강력하지만, `computed()`와 `linkedSignal()`로 해결할 수 없을 때 마지막 수단으로 사용해야 합니다.
