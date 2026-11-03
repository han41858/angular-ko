<!--
# Creating and updating your first signal
-->

# 첫 시그널 생성하고 갱신하기

<!--
Welcome to the Angular signals tutorial! [Signals](/essentials/signals) are Angular's reactive primitive that provide a way to manage state and automatically update your UI when that state changes.
-->

Angular 시그널 튜토리얼에 오신 것을 환영합니다! [시그널](/essentials/signals)은 Angular의 반응형 기본 요소입니다. 상태를 관리하고 상태가 변경되면 UI를 자동으로 갱신할 수 있습니다.

<!--
In this activity, you'll learn how to:
-->

이번 실습에서는 다음 내용을 배웁니다:

<!--
- Create your first signal using the `signal()` function
- Display its value in a template
- Update the signal value using `set()` and `update()` methods
-->

- `signal()` 함수로 첫 시그널 생성하기
- 템플릿에 시그널 값 표시하기
- `set()`과 `update()` 메서드로 시그널 값 갱신하기

<!--
Let's build an interactive user status system with signals!
-->

시그널로 사용자의 상태를 바꿀 수 있는 시스템을 만들어 봅시다!

<hr />

<docs-workflow>

<!--
<docs-step title="Import the signal function">
-->

<docs-step title="signal 함수 불러오기">

<a id="import-the-signal-function"></a>

<!--
Import the `signal` function from `@angular/core` at the top of your component file.
-->

컴포넌트 파일 상단에서 `@angular/core`의 `signal` 함수를 불러옵니다.

```ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
```

</docs-step>

<!--
<docs-step title="Create a signal in your component">
-->

<docs-step title="컴포넌트에 시그널 생성하기">

<a id="create-a-signal-in-your-component"></a>

<!--
Add a `userStatus` signal to your component class that is initialized with a value of `'offline'`.
-->

컴포넌트 클래스에 초깃값이 `'offline'`인 `userStatus` 시그널을 추가합니다.

```ts
@Component({/* Config omitted */})
export class App {
  userStatus = signal<'online' | 'offline'>('offline');
}
```

</docs-step>

<!--
<docs-step title="Display the signal value in the template">
-->

<docs-step title="템플릿에 시그널 값 표시하기">

<a id="display-the-signal-value-in-the-template"></a>

<!--
Update the status indicator to display the current user status by:
1. Binding the signal to the class attribute with `[class]="userStatus()"`
2. Displaying the status text by replacing `???` with `{{ userStatus() }}`
-->

다음과 같이 상태 표시 영역을 수정해서 현재 사용자 상태를 표시합니다:

1. `[class]="userStatus()"`로 시그널을 class 어트리뷰트에 바인딩합니다.
2. `???`를 `{{ userStatus() }}`로 바꿔서 상태를 문자열로 표시합니다.

```angular-html
<!-- Update from: -->
<div class="status-indicator offline">
  <span class="status-dot"></span>
  Status: ???
</div>

<!-- To: -->
<div class="status-indicator" [class]="userStatus()">
  <span class="status-dot"></span>
  Status: {{ userStatus() }}
</div>
```

<!--
Notice how we call the signal `userStatus()` with parentheses to read its value.
-->

시그널 값을 읽을 때는 괄호를 붙여서 `userStatus()`로 호출한다는 점에 주목하세요.
</docs-step>

<!--
<docs-step title="Add methods to update the signal">
-->

<docs-step title="시그널을 갱신하는 메서드 추가하기">

<a id="add-methods-to-update-the-signal"></a>

<!--
Add methods to your component that change the user status using the `set()` method.
-->

컴포넌트에 `set()` 메서드로 사용자 상태를 변경하는 메서드를 추가합니다.

```ts
goOnline() {
  this.userStatus.set('online');
}

goOffline() {
  this.userStatus.set('offline');
}
```

<!--
The `set()` method replaces the signal's value entirely with a new value.
-->

`set()` 메서드는 시그널 값을 새로운 값으로 완전히 교체합니다.

</docs-step>

<!--
<docs-step title="Wire up the control buttons">
-->

<docs-step title="상태 변경 버튼 연결하기">

<a id="wire-up-the-control-buttons"></a>

<!--
The buttons are already in the template. Now connect them to your methods by adding:
1. Click handlers with `(click)`
2. Disabled states with `[disabled]` when already in that status
-->

버튼은 이미 템플릿에 있습니다. 다음 내용을 추가해서 메서드와 연결합니다:

1. `(click)`으로 클릭 핸들러를 연결합니다.
2. 이미 해당 상태라면 `[disabled]`로 버튼을 비활성화합니다.

```html
<!-- Add bindings to the existing buttons: -->
<button (click)="goOnline()" [disabled]="userStatus() === 'online'">Go Online</button>
<button (click)="goOffline()" [disabled]="userStatus() === 'offline'">Go Offline</button>
```

</docs-step>

<!--
<docs-step title="Add a toggle method using update()">
-->

<docs-step title="update()로 상태를 전환하는 메서드 추가하기">

<a id="add-a-toggle-method-using-update"></a>

<!--
Add a `toggleStatus()` method that switches between online and offline using the `update()` method.
-->

`update()` 메서드로 온라인과 오프라인 상태를 전환하는 `toggleStatus()` 메서드를 추가합니다.

```ts
toggleStatus() {
  this.userStatus.update(current => current === 'online' ? 'offline' : 'online');
}
```

<!--
The `update()` method takes a function that receives the current value and returns the new value. This is useful when you need to modify the existing value based on its current state.
-->

`update()` 메서드는 현재 값을 받아 새로운 값을 반환하는 함수를 인자로 받습니다. 현재 상태를 기반으로 기존 값을 수정해야 할 때 유용합니다.

</docs-step>

<!--
<docs-step title="Add the toggle button handler">
-->

<docs-step title="상태 전환 버튼 핸들러 추가하기">

<a id="add-the-toggle-button-handler"></a>

<!--
The toggle button is already in the template. Connect it to your `toggleStatus()` method:
-->

상태 전환 버튼은 이미 템플릿에 있습니다. `toggleStatus()` 메서드와 연결하세요:

```html
<button (click)="toggleStatus()" class="toggle-btn">Toggle Status</button>
```

</docs-step>

</docs-workflow>

<!--
Congratulations! You've created your first signal and learned how to update it using both `set()` and `update()` methods. The `signal()` function creates a reactive value that Angular tracks, and when you update it, your UI automatically reflects the changes.
-->

축하합니다! 첫 시그널을 만들고 `set()`과 `update()` 메서드로 갱신하는 방법을 배웠습니다. `signal()` 함수는 Angular가 추적하는 반응형 값을 생성합니다. 이 값을 갱신하면 UI에 변경 사항이 자동으로 반영됩니다.

<!--
Next, you'll learn [how to derive state from signals using computed](/tutorials/signals/2-deriving-state-with-computed-signals)!
-->

다음 단계에서는 [computed로 시그널에서 상태를 파생하는 방법](/tutorials/signals/2-deriving-state-with-computed-signals)을 배웁니다!
