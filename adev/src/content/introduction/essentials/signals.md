<docs-decorative-header title="시그널" imgSrc="adev/src/assets/images/signals.svg"> <!-- markdownlint-disable-line -->
동적인 데이터를 만들고 관리해 봅시다.
</docs-decorative-header>

<!--
In Angular, you use *signals* to create and manage state. A signal is a lightweight wrapper around a value.

Use the `signal` function to create a signal for holding local state:

```typescript
import {signal} from '@angular/core';

// Create a signal with the `signal` function.
const firstName = signal('Morgan');

// Read a signal value by calling it— signals are functions.
console.log(firstName());

// Change the value of this signal by calling its `set` method with a new value.
firstName.set('Jaime');

// You can also use the `update` method to change the value
// based on the previous value.
firstName.update(name => name.toUpperCase()); 
```

Angular tracks where signals are read and when they're updated. The framework uses this information to do additional work, such as updating the DOM with new state. This ability to respond to changing signal values over time is known as *reactivity*.
-->
Angular는 *시그널(signal)* 을 사용해서 상태를 만들고 관리합니다.
시그널은 어떤 값을 간단하게 감싸는 객체라고 생각하면 됩니다.

`signal` 함수를 사용하면 시그널을 생성하고 상태를 저장할 수 있습니다:

```typescript
import {signal} from '@angular/core';

// `signal` 함수로 시그널을 생성합니다.
const firstName = signal('Morgan');

// `signal`은 그 자체로 함수입니다. 함수를 실행해서 값을 읽을 수 있습니다.
console.log(firstName());

// `set` 메서드를 사용하면 시그널의 값을 변경할 수 있습니다.
firstName.set('Jaime');

// `update` 메서드를 사용하면 기존 값을 참조해서 시그널의 값을 변경할 수 있습니다.
firstName.update(name => name.toUpperCase()); 
```

Angular는 시그널이 어디에 사용되고 언제 갱신되는지 계속 추적합니다.
그래서 상태가 변경되면 DOM을 갱신하는 등 필요한 작업을 수행합니다.
이렇게 시그널을 생성해서 애플리케이션이 시그널에 반응하는 방식을 *반응성(reactivity)* 이라고 합니다.


<!--
## Computed expressions
-->
## 연산 표현식

<!--
A `computed` is a signal that produces its value based on other signals.

```typescript
import {signal, computed} from '@angular/core';

const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());

console.log(firstNameCapitalized()); // MORGAN
``` 

A `computed` signal is read-only; it does not have a `set` or an `update` method. Instead, the value of the `computed` signal automatically changes when any of the signals it reads change:

```typescript
import {signal, computed} from '@angular/core';

const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());
console.log(firstNameCapitalized()); // MORGAN

firstName.set('Jaime');
console.log(firstNameCapitalized()); // JAIME
```
-->
`computed` 함수는 기존에 있던 시그널을 참조해서 새로운 시그널을 생성하는 함수입니다.

```typescript
import {signal, computed} from '@angular/core';

const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());

console.log(firstNameCapitalized()); // MORGAN
``` 

`computed` 시그널은 읽을 수만 있습니다.
그래서 `computed` 시그널에는 `set` 메서드와 `update` 메서드가 존재하지 않습니다.
그럼에도 `computed` 시그널을 생성할 때 참조했던 시그널이 변경되면, `computed`로 생성한 시그널도 값이 갱신됩니다:

```typescript
import {signal, computed} from '@angular/core';

const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());
console.log(firstNameCapitalized()); // MORGAN

firstName.set('Jaime');
console.log(firstNameCapitalized()); // JAIME
```


<!--
## Using signals in components
-->
## 컴포넌트에서 시그널 활용하기

<!--
Use `signal` and `computed` inside your components to create and manage state:

```typescript
@Component({/* ... */})
export class UserProfile {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());

  activateTrial() {
    this.isTrial.set(true);
  }
}
```

TIP: Want to know more about Angular Signals? See the [In-depth Signals guide](guide/signals) for the full details.
-->
컴포넌트 상태를 관리하려면 `signal` 함수와 `computed` 함수를 사용하면 됩니다:

```typescript
@Component({/* ... */})
export class UserProfile {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());

  activateTrial() {
    this.isTrial.set(true);
  }
}
```

팁: 시그널을 자세하게 알아보고 싶은가요? 그렇다면 [시그널 심화 가이드](guide/signals) 문서를 참고하세요.


<!--
## Next Step
-->
## 다음 단계

<!--
Now that you have learned how to declare and manage dynamic data, it's time to learn how to use that data inside of templates.

<docs-pill-row>
  <docs-pill title="Dynamic interfaces with templates" href="essentials/templates" />
  <docs-pill title="In-depth signals guide" href="guide/signals" />
</docs-pill-row>
-->
이 문서에서는 동적 데이터를 선언하고 관리하는 방법을 알아봤습니다.
이제 이 데이터를 템플릿에 어떻게 사용하는지 알아봅시다.

<docs-pill-row>
  <docs-pill title="템플릿과 동적 인터페이스" href="essentials/templates" />
  <docs-pill title="시그널 심화 가이드" href="guide/signals" />
</docs-pill-row>
