<!--
# Managing async data with signals using the Resources API
-->

# Resource API로 시그널의 비동기 데이터 관리하기

<!--
Now that you've learned [how to derive state with linked signals](/tutorials/signals/3-deriving-state-with-linked-signals), let's explore how to handle asynchronous data with the Resource API. The Resource API provides a powerful way to manage async operations using signals, with built-in loading states, error handling, and request management.
-->

[linked 시그널로 상태를 파생하는 방법](/tutorials/signals/3-deriving-state-with-linked-signals)을 배웠으니, 이제 Resource API로 비동기 데이터를 처리하는 방법을 살펴봅시다. Resource API는 시그널로 비동기 작업을 관리하는 강력한 방법입니다. 로딩 상태, 오류 처리, 요청 관리를 기본으로 제공합니다.

<!--
In this activity, you'll learn how to use the `resource()` function to load data asynchronously and how to handle different states of async operations by building a user profile loader that demonstrates the Resource API in action.
-->

이번 실습에서는 사용자 프로필 로더를 만들면서 `resource()` 함수로 데이터를 비동기로 로딩하고 비동기 작업의 여러 상태를 처리하는 방법을 배웁니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Import resource function and API">
-->

<docs-step title="resource 함수와 API 불러오기">

<a id="import-resource-function-and-api"></a>

<!--
Add `resource` to your existing imports and import the fake API function.
-->

기존 import 구문에 `resource`를 추가하고 모의 API 함수를 불러옵니다.

```ts
// Add resource to existing imports
import {Component, signal, computed, resource, ChangeDetectionStrategy} from '@angular/core';
// Import mock API function
import {getUserData} from './user-api';
```

</docs-step>

<!--
<docs-step title="Create a resource for user data">
-->

<docs-step title="사용자 데이터용 리소스 생성하기">

<a id="create-a-resource-for-user-data"></a>

<!--
Add a property in the component class that creates a resource to load user data based on a user ID signal.
-->

사용자 ID 시그널을 기반으로 사용자 데이터를 로딩하는 리소스를 컴포넌트 클래스의 프로퍼티로 추가합니다.

```ts
userId = signal(1);

userResource = resource({
  params: () => ({id: this.userId()}),
  loader: (params) => getUserData(params.params.id),
});
```

</docs-step>

<!--
<docs-step title="Add methods to interact with the resource">
-->

<docs-step title="리소스를 조작하는 메서드 추가하기">

<a id="add-methods-to-interact-with-the-resource"></a>

<!--
Add methods to change the user ID and reload the resource.
-->

사용자 ID를 변경하고 리소스를 다시 로딩하는 메서드를 추가합니다.

```ts
loadUser(id: number) {
  this.userId.set(id);
}

reloadUser() {
  this.userResource.reload();
}
```

<!--
Changing the params signal automatically triggers a reload, or you can manually reload with `reload()`.
-->

params 시그널이 변경되면 자동으로 다시 로딩됩니다. `reload()`로 직접 다시 로딩할 수도 있습니다.
</docs-step>

<!--
<docs-step title="Create computed signals for resource states">
-->

<docs-step title="리소스 상태용 computed 시그널 생성하기">

<a id="create-computed-signals-for-resource-states"></a>

<!--
Add computed signals to access different states of the resource.
-->

리소스의 여러 상태에 접근하는 computed 시그널을 추가합니다.

```ts
isLoading = this.userResource.isLoading;
hasError = computed(() => this.userResource.status() === 'error');
```

<!--
Resources provide a `status()` signal that can be 'loading', 'reloading', 'resolved', or 'error', a `value()` signal for the loaded data, and a `hasValue()` method that safely checks if data is available. The `isLoading()` signal is true for both 'loading' and 'reloading'.
-->

리소스는 'loading', 'reloading', 'resolved', 'error' 상태를 나타내는 `status()` 시그널과 로드한 데이터가 담긴 `value()` 시그널, 데이터가 있는지 안전하게 확인하는 `hasValue()` 메서드를 제공합니다.
`isLoading()` 시그널은 'loading'과 'reloading' 상태에서 모두 true입니다.
</docs-step>

<!--
<docs-step title="Wire up the buttons and display resource states">
-->

<docs-step title="버튼 연결하고 리소스 상태 표시하기">

<a id="wire-up-the-buttons-and-display-resource-states"></a>

<!--
The template structure is already provided. Now connect everything:
-->

템플릿 구조는 이미 제공되어 있습니다. 이제 각 기능을 연결합니다:

<!--
Part 1. **Add click handlers to the buttons:**
-->

1단계. **버튼에 클릭 핸들러를 추가합니다:**

```html
<button (click)="loadUser(1)">Load User 1</button>
<button (click)="loadUser(2)">Load User 2</button>
<button (click)="loadUser(999)">Load Invalid User</button>
<button (click)="reloadUser()">Reload</button>
```

<!--
Part 2. **Replace the placeholder with resource state handling:**
-->

2단계. **플레이스홀더를 리소스 상태 처리 코드로 교체합니다:**

```angular-html
@if (isLoading()) {
  <p>Loading user...</p>
} @else if (hasError()) {
  <p class="error">Error: {{ userResource.error()?.message }}</p>
} @else if (userResource.hasValue()) {
  <div class="user-info">
    <h3>{{ userResource.value().name }}</h3>
    <p>{{ userResource.value().email }}</p>
  </div>
}
```

<!--
The resource provides different methods to check its state:
-->

리소스 상태를 다음과 같이 확인할 수 있습니다:

<!--
- `isLoading()` - true when fetching data
- `hasError()` - true when an error occurred
- `userResource.hasValue()` - true when data is available
- `userResource.value()` - access the loaded data
- `userResource.error()` - access error information
-->

- `isLoading()` - 데이터를 가져오는 동안 true입니다.
- `hasError()` - 오류가 발생하면 true입니다.
- `userResource.hasValue()` - 데이터가 있으면 true입니다.
- `userResource.value()` - 로딩한 데이터에 접근합니다.
- `userResource.error()` - 오류 정보에 접근합니다.

</docs-step>

</docs-workflow>

<!--
Excellent! You've now learned how to use the Resource API with signals. Key concepts to remember:
-->

시그널과 Resource API를 사용하는 방법을 배웠습니다! 기억할 핵심 개념은 다음과 같습니다:

<!--
- **Resources are reactive**: They automatically reload when params change
- **Built-in state management**: Resources provide `status()`, `value()`, and `error()` signals
- **Automatic cleanup**: Resources handle request cancellation and cleanup automatically
- **Manual control**: You can manually reload or abort requests when needed
-->

- **반응형 리소스**: params가 변경되면 자동으로 다시 로딩합니다.
- **내장 상태 관리**: `status()`, `value()`, `error()` 시그널을 제공합니다.
- **자동 정리**: 요청 취소와 정리 작업을 자동으로 처리합니다.
- **직접 제어**: 필요하면 요청을 직접 다시 로딩하거나 중단할 수 있습니다.

<!--
In the next lesson, you'll learn [how to pass data to components with input signals](/tutorials/signals/5-component-communication-with-signals)!
-->

다음 단계에서는 [입력 시그널로 컴포넌트에 데이터를 전달하는 방법](/tutorials/signals/5-component-communication-with-signals)을 배웁니다!
