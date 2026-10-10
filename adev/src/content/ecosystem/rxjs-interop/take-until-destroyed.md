<!--
# Unsubscribing with `takeUntilDestroyed`
-->

<a id="unsubscribing-with-takeuntildestroyed"></a>

# `takeUntilDestroyed`로 구독 해제하기

<!--
TIP: This guide assumes you're familiar with [component and directive lifecycle](guide/components/lifecycle).

The `takeUntilDestroyed` operator, from `@angular/core/rxjs-interop`, provides a concise and reliable way to automatically unsubscribe from an Observable when a component or directive is destroyed. This prevents common memory leaks with RxJS subscriptions. It works similarly to the RxJS [`takeUntil`](https://rxjs.dev/api/operators/takeUntil) operator but without the need for a separate Subject.

```typescript
import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationDispatcher, CustomPopupShower} from './some-shared-project-code';

@Component(/* ... */)
export class UserProfile {
  private dispatcher = inject(NotificationDispatcher);
  private popup = inject(CustomPopupShower);

  constructor() {
    // This subscription the 'notifications' Observable is automatically
    // unsubscribed when the 'UserProfile' component is destroyed.
    const messages: Observable<string> = this.dispatcher.notifications;
    messages.pipe(takeUntilDestroyed()).subscribe((message) => {
      this.popup.show(message);
    });
  }
}
```

The `takeUntilDestroyed` operator accepts a single optional [`DestroyRef`](/api/core/DestroyRef) argument. The operator uses `DestroyRef` to know when the component or directive has been destroyed. You can omit this argument when calling `takeUntilDestroyed` in an [injection context](/guide/di/dependency-injection-context), typically the constructor of a component or directive. Always provide a `DestroyRef` if your code may call `takeUntilDestroyed` outside of an injection context.

```typescript
@Component(/* ... */)
export class UserProfile {
  private dispatcher = inject(NotificationDispatcher);
  private popup = inject(CustomPopupShower);
  private destroyRef = inject(DestroyRef);

  startListeningToNotifications() {
    // Always pass a `DestroyRef` if you call `takeUntilDestroyed` outside
    // of an injection context.
    const messages: Observable<string> = this.dispatcher.notifications;
    messages.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message) => {
      this.popup.show(message);
    });
  }
}
```
-->

팁: 이 문서는 [컴포넌트와 디렉티브의 라이프사이클](guide/components/lifecycle)을 알고 있다고 가정합니다.

`@angular/core/rxjs-interop`의 `takeUntilDestroyed` 연산자를 사용하면 컴포넌트나 디렉티브가 종료될 때 Observable 구독을 간결하고 안정적으로 자동 해제할 수 있습니다.
이를 통해 RxJS 구독에서 자주 발생하는 메모리 누수를 방지할 수 있습니다.
RxJS의 [`takeUntil`](https://rxjs.dev/api/operators/takeUntil) 연산자와 비슷하게 동작하지만 별도의 Subject가 필요하지 않습니다.

```typescript
import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationDispatcher, CustomPopupShower} from './some-shared-project-code';

@Component(/* ... */)
export class UserProfile {
  private dispatcher = inject(NotificationDispatcher);
  private popup = inject(CustomPopupShower);

  constructor() {
    // 'notifications' Observable의 이 구독은 'UserProfile' 컴포넌트가
    // 종료될 때 자동으로 해제됩니다.
    const messages: Observable<string> = this.dispatcher.notifications;
    messages.pipe(takeUntilDestroyed()).subscribe((message) => {
      this.popup.show(message);
    });
  }
}
```

`takeUntilDestroyed` 연산자는 선택적으로 [`DestroyRef`](/api/core/DestroyRef) 인자를 하나 받습니다.
이 연산자는 `DestroyRef`를 사용해서 컴포넌트나 디렉티브가 종료된 시점을 알아냅니다.
일반적으로 컴포넌트나 디렉티브의 생성자와 같은 [의존성 주입 컨텍스트](/guide/di/dependency-injection-context)에서 `takeUntilDestroyed`를 호출한다면 이 인자를 생략할 수 있습니다.
의존성 주입 컨텍스트 밖에서 `takeUntilDestroyed`를 호출할 수 있는 코드라면 항상 `DestroyRef`를 전달하세요.

```typescript
@Component(/* ... */)
export class UserProfile {
  private dispatcher = inject(NotificationDispatcher);
  private popup = inject(CustomPopupShower);
  private destroyRef = inject(DestroyRef);

  startListeningToNotifications() {
    // 의존성 주입 컨텍스트 밖에서 `takeUntilDestroyed`를 호출한다면
    // 항상 `DestroyRef`를 전달하세요.
    const messages: Observable<string> = this.dispatcher.notifications;
    messages.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message) => {
      this.popup.show(message);
    });
  }
}
```
