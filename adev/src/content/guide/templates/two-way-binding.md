<!--
# Two-way binding
-->
# 양방향 바인딩

<!--
**Two way binding** is a shorthand to simultaneously bind a value into an element, while also giving that element the ability to propagate changes back through this binding.
-->
**양방향 바인딩(two way binding)** 은 엘리먼트와 어떤 값을 바인딩하면서, 동시에 바인딩한 값이 변경되는 것을 감지하는 방식입니다.


<!--
## Syntax
-->
## 문법

<!--
The syntax for two-way binding is a combination of square brackets and parentheses, `[()]`. It combines the syntax from property binding, `[]`, and the syntax from event binding, `()`. The Angular community informally refers to this syntax as "banana-in-a-box".
-->
양방향 바인딩 문법은 대괄호를 사용하는 프로퍼티 바인딩과 소괄호를 사용하는 이벤트 바인딩이 조합된 `[()]` 입니다.
Angular 커뮤니티에서는 비공식적으로 "상자 안에 든 바나나" 라고 하기도 합니다.


<!--
## Two-way binding with form controls
-->
## 폼 컨트롤 양방향 바인딩

<!--
Developers commonly use two-way binding to keep component data in sync with a form control as a user interacts with the control. For example, when a user fills out a text input, it should update the state in the component.

The following example dynamically updates the `firstName` attribute on the page:

```angular-ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `
})
export class AppComponent {
  firstName = 'Ada';
}
```

To use two-way binding with native form controls, you need to:

1. Import the `FormsModule` from `@angular/forms`
1. Use the `ngModel` directive with the two-way binding syntax (e.g., `[(ngModel)]`)
1. Assign it the state that you want it to update (e.g., `firstName`)

Once that is set up, Angular will ensure that any updates in the text input will reflect correctly inside of the component state!

Learn more about [`NgModel`](guide/directives#displaying-and-updating-properties-with-ngmodel) in the official docs.
-->
양방향 바인딩은 컴포넌트 데이터와 폼 컨트롤을 같은 값으로 동기화하는 용도로 자주 사용됩니다.
사용자가 문자열을 입력하면 컴포넌트의 상태가 갱신되는 과정도 이 경우에 해당됩니다.

아래 코드는 `firstName` 값을 동적으로 갱신하는 예제 코드입니다:

```angular-ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `
})
export class AppComponent {
  firstName = 'Ada';
}
```

기본 폼 컨트롤에 양방향 바인딩을 사용하려면 이렇게 하면 됩니다:

1. `@angular/forms` 패키지에서 `FormsModule`을 로드합니다.
1. `ngModel` 디렉티브와 양방향 바인딩 문법을 활용해서 `[(ngModel)]`과 같이 구현합니다.
1. 갱신할 컴포넌트 프로퍼티를 지정합니다. 위 예제 코드에서는 `firstName`과 연결했습니다.

이렇게 한 번 연결하고 나면 `<input>` 엘리먼트 값이 변경되면 Angular가 변경된 값으로 컴포넌트 상태를 갱신합니다!

[`NgModel`](guide/directives#displaying-and-updating-properties-with-ngmodel) 도 자세하게 알아보세요.


<!--
## Two-way binding between components
-->
## 컴포넌트간 양방향 바인딩

<!--
Leveraging two-way binding between a parent and child component requires more configuration compared to form elements.

Here is an example where the `AppComponent` is responsible for setting the initial count state, but the logic for updating and rendering the UI for the counter primarily resides inside its child `CounterComponent`.

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

```angular-ts
// './counter/counter.component.ts';
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count() }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  count = model<number>(0);

  updateCount(amount: number): void {
    this.count.update(currentCount => currentCount + amount);
  }
}
```
-->
폼 엘리먼트가 아니라 부모-자식 컴포넌트에 양방향 바인딩을 연결하려면 설정해야 하는 것이 조금 더 있습니다.

아래 코드는 `AppComponent`에서 초기값을 설정하지만 화면을 렌더링하거나 갱신하는 로직은 자식 컴포넌트인 `CounterComponent` 안에 있는 예제 코드입니다.

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

```angular-ts
// './counter/counter.component.ts';
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count() }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  count = model<number>(0);

  updateCount(amount: number): void {
    this.count.update(currentCount => currentCount + amount);
  }
}
```


<!--
### Enabling two-way binding between components
-->
### 양방향 바인딩 연결하기

<!--
If we break down the example above to its core, each two-way binding for components requires the following:

The child component must contain a `model` property.

Here is a simplified example:

```angular-ts
// './counter/counter.component.ts';
import { Component, model } from '@angular/core';

@Component({ // Omitted for brevity })
export class CounterComponent {
  count = model<number>(0);

  updateCount(amount: number): void {
    this.count.update(currentCount => currentCount + amount);
  }
}
```

The parent component must:

1. Wrap the `model` property name in the two-way binding syntax.
1. Assign a property or a signal to the `model` property.

Here is a simplified example:

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```
-->
위 예제에서 보듯이, 컴포넌트끼리 양방향 바인딩하려면 이런 조건이 필요합니다:

자식 컴포넌트에는 `model` 프로퍼티가 존재해야 합니다.

간단하게 보면 이렇습니다:

```angular-ts
// './counter/counter.component.ts';
import { Component, model } from '@angular/core';

@Component({ // 간략화 한 코드 })
export class CounterComponent {
  count = model<number>(0);

  updateCount(amount: number): void {
    this.count.update(currentCount => currentCount + amount);
  }
}
```

그리고 부모 컴포넌트에는:

1. 템플릿에서 `model` 프로퍼티에 양방향 바인딩 문법으로 바인딩합니다.
1. 컴포넌트 코드에서 `model` 프로퍼티의 초기값을 설정합니다.

간단하게 보면 이렇습니다:

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <main>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```
