<!--
# Angular without ZoneJS (Zoneless)
-->

<a id="angular-without-zonejs-zoneless"></a>

# ZoneJS 없이 Angular 사용하기(Zoneless)

<!--
## Why use Zoneless?
-->

<a id="why-use-zoneless"></a>

## Zoneless를 사용하는 이유

<!--
The main advantages to removing ZoneJS as a dependency are:

- **Improved performance**: ZoneJS uses DOM events and async tasks as indicators of when application state _might_ have updated and subsequently triggers application synchronization to run change detection on the application's views. ZoneJS does not have any insight into whether application state actually changed and so this synchronization is triggered more frequently than necessary.
- **Improved Core Web Vitals**: ZoneJS brings a fair amount of overhead, both in payload size and in startup time cost.
- **Improved debugging experience**: ZoneJS makes debugging code more difficult. Stack traces are harder to understand with ZoneJS. It's also difficult to understand when code breaks as a result of being outside the Angular Zone.
- **Better ecosystem compatibility**: ZoneJS works by patching browser APIs but does not automatically have patches for every new browser API. Some APIs cannot be patched effectively, such as `async`/`await`, and have to be downleveled to work with ZoneJS. Sometimes libraries in the ecosystem are also incompatible with the way ZoneJS patches the native APIs. Removing ZoneJS as a dependency ensures better long-term compatibility by removing a source of complexity, monkey patching, and ongoing maintenance.
-->

ZoneJS 의존성을 제거하면 다음과 같은 주요 이점이 있습니다.

- **성능 개선**: ZoneJS는 DOM 이벤트와 비동기 작업을 애플리케이션 상태가 변경되었을 _가능성_ 을 나타내는 신호로 사용합니다.
  이후 애플리케이션 동기화를 실행해 애플리케이션 뷰의 변경 감지를 수행합니다.
  ZoneJS는 애플리케이션 상태가 실제로 변경되었는지 알 수 없으므로, 이 동기화가 필요한 것보다 더 자주 실행됩니다.
- **Core Web Vitals 개선**: ZoneJS는 전송 크기와 시작 시간 양쪽 모두에 상당한 오버헤드를 추가합니다.
- **디버깅 경험 개선**: ZoneJS는 코드 디버깅을 더 어렵게 만듭니다.
  ZoneJS를 사용하면 스택 트레이스를 이해하기가 더 어렵습니다.
  또한 코드가 Angular Zone 밖에서 실행되어 문제가 생겼는지 알아내기도 어렵습니다.
- **생태계 호환성 개선**: ZoneJS는 브라우저 API를 패치해 동작하지만, 새로 추가되는 모든 브라우저 API에 대한 패치가 자동으로 제공되지는 않습니다.
  `async`/`await`처럼 효과적으로 패치할 수 없는 API는 ZoneJS에서 동작하도록 하위 버전 문법으로 변환해야 합니다.
  생태계의 라이브러리가 ZoneJS의 네이티브 API 패치 방식과 호환되지 않는 경우도 있습니다.
  ZoneJS 의존성을 제거하면 복잡성, 몽키 패치, 지속적인 유지보수의 원인을 없애 장기적인 호환성을 높일 수 있습니다.

<!--
## Enabling Zoneless in an application
-->

<a id="enabling-zoneless-in-an-application"></a>

## 애플리케이션에서 Zoneless 활성화하기

<!--
Zoneless is the default in Angular v21+ so you do not need to do anything to enable it. You should verify that `provideZoneChangeDetection` is not used anywhere to override the default configuration.

If you are using Angular v20, enable zoneless change detection by adding `provideZonelessChangeDetection()` at bootstrap:

```ts {header: 'standalone bootstrap'}
bootstrapApplication(MyApp, {providers: [provideZonelessChangeDetection()]});
```

```ts {header: 'NgModule bootstrap'}
platformBrowser().bootstrapModule(AppModule);

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class AppModule {}
```
-->

Angular v21 이상에서는 Zoneless가 기본값이므로 활성화하기 위해 별도로 할 일은 없습니다.
기본 설정을 재정의하는 `provideZoneChangeDetection`을 사용하는 곳이 없는지 확인하세요.

Angular v20을 사용한다면 부트스트랩할 때 `provideZonelessChangeDetection()`을 추가해 Zoneless 변경 감지를 활성화하세요.

```ts {header: 'standalone bootstrap'}
bootstrapApplication(MyApp, {providers: [provideZonelessChangeDetection()]});
```

```ts {header: 'NgModule bootstrap'}
platformBrowser().bootstrapModule(AppModule);

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class AppModule {}
```

<!--
## Removing ZoneJS
-->

<a id="removing-zonejs"></a>

## ZoneJS 제거하기

<!--
Zoneless applications should remove ZoneJS entirely from the build to reduce bundle size. ZoneJS is typically
loaded via the `polyfills` option in `angular.json`, both in the `build` and `test` targets. Remove `zone.js`
and `zone.js/testing` from both to remove it from the build. Projects which use an explicit `polyfills.ts` file
should remove `import 'zone.js';` and `import 'zone.js/testing';` from the file.

After removing ZoneJS from the build, there is no longer a need for a `zone.js` dependency either and the
package can be removed entirely:

```shell
npm uninstall zone.js
```
-->

Zoneless 애플리케이션에서는 번들 크기를 줄이기 위해 빌드에서 ZoneJS를 완전히 제거해야 합니다.
ZoneJS는 일반적으로 `angular.json`의 `build`와 `test` 타깃에 있는 `polyfills` 옵션으로 불러옵니다.
빌드에서 제외하려면 두 타깃 모두에서 `zone.js`와 `zone.js/testing`을 제거하세요.
별도의 `polyfills.ts` 파일을 사용하는 프로젝트에서는 해당 파일의 `import 'zone.js';`와 `import 'zone.js/testing';`을 제거해야 합니다.

빌드에서 ZoneJS를 제거한 후에는 `zone.js` 의존성도 더 이상 필요하지 않으므로 패키지를 완전히 제거할 수 있습니다.

```shell
npm uninstall zone.js
```

<!--
## Requirements for Zoneless compatibility
-->

<a id="requirements-for-zoneless-compatibility"></a>

## Zoneless 호환성을 위한 요구사항

<!--
Angular relies on notifications from core APIs in order to determine when to run change detection and on which views.
These notifications include:

- `ChangeDetectorRef.markForCheck` (called automatically by `AsyncPipe`)
- `ComponentRef.setInput`
- Updating a signal that's read in a template
- Bound host or template listeners callbacks
- Attaching a view that was marked dirty by one of the above
-->

Angular는 핵심 API에서 보내는 알림을 통해 언제 어떤 뷰에서 변경 감지를 실행할지 결정합니다.
이러한 알림에는 다음이 포함됩니다.

- `ChangeDetectorRef.markForCheck`(`AsyncPipe`가 자동으로 호출)
- `ComponentRef.setInput`
- 템플릿에서 읽는 시그널의 갱신
- 바인딩된 호스트 리스너나 템플릿 리스너의 콜백
- 위 방법 중 하나로 변경된 상태로 표시된 뷰의 연결

<!--
### `OnPush`-compatible components
-->

<a id="onpush-compatible-components"></a>

### `OnPush`와 호환되는 컴포넌트

<!--
One way to ensure that a component is using the correct notification mechanisms from above is to
use [ChangeDetectionStrategy.OnPush](/best-practices/skipping-subtrees#using-onpush).

The `OnPush` change detection strategy is not required, but it is a recommended step towards zoneless compatibility for application components. It is not always possible for library components to use `ChangeDetectionStrategy.OnPush`.
When a library component is a host for user-components which might use `ChangeDetectionStrategy.Eager`/`Default`, it cannot use `OnPush` because that would prevent the child component from being refreshed if it is not `OnPush` compatible and relies on ZoneJS to trigger change detection. Components can use the `Default` strategy as long as they notify Angular when change detection needs to run (calling `markForCheck`, using signals, `AsyncPipe`, etc.).
Being a host for a user component means using an API such as `ViewContainerRef.createComponent` and not just hosting a portion of a template from a user component (i.e. content projection or using a template ref input).
-->

컴포넌트가 위의 알림 방식들을 올바르게 사용하는지 확인하는 방법 중 하나는 [ChangeDetectionStrategy.OnPush](/best-practices/skipping-subtrees#using-onpush)를 사용하는 것입니다.

`OnPush` 변경 감지 전략이 필수는 아니지만, 애플리케이션 컴포넌트의 Zoneless 호환성을 확보하는 과정에서 권장되는 단계입니다.
라이브러리 컴포넌트에서는 항상 `ChangeDetectionStrategy.OnPush`를 사용할 수 있는 것은 아닙니다.
라이브러리 컴포넌트가 `ChangeDetectionStrategy.Eager`/`Default`를 사용할 수 있는 사용자 컴포넌트의 호스트라면 `OnPush`를 사용할 수 없습니다.
자식 컴포넌트가 `OnPush`와 호환되지 않고 ZoneJS에 의존해 변경 감지를 실행하는 경우, `OnPush`가 자식 컴포넌트의 갱신을 막기 때문입니다.
컴포넌트는 변경 감지를 실행해야 할 때 Angular에 알리기만 하면(`markForCheck` 호출, 시그널 사용, `AsyncPipe` 사용 등) `Default` 전략을 사용할 수 있습니다.
사용자 컴포넌트의 호스트라는 것은 `ViewContainerRef.createComponent`와 같은 API를 사용한다는 뜻입니다.
사용자 컴포넌트의 템플릿 일부만 호스팅하는 경우(콘텐츠 프로젝션이나 템플릿 참조 입력값 사용)는 여기에 해당하지 않습니다.

<!--
### Remove `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable`, `NgZone.isStable`, or `NgZone.onStable`
-->

<a id="remove-ngzoneonmicrotaskempty-ngzoneonunstable-ngzoneisstable-or-ngzoneonstable"></a>

### `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable`, `NgZone.isStable`, `NgZone.onStable` 제거하기

<!--
Applications and libraries need to remove uses of `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable` and `NgZone.onStable`.
These observables will never emit when an Application enables zoneless change detection.
Similarly, `NgZone.isStable` will always be `true` and should not be used as a condition for code execution.

The `NgZone.onMicrotaskEmpty` and `NgZone.onStable` observables are most often used to wait for Angular to
complete change detection before performing a task. Instead, these can be replaced by `afterNextRender`
if they need to wait for a single change detection or `afterEveryRender` if there is some condition that might span
several change detection rounds. In other cases, these observables were used because they happened to be
familiar and have similar timing to what was needed. More straightforward or direct DOM APIs can be used instead,
such as `MutationObserver` when code needs to wait for certain DOM state (rather than waiting for it indirectly
through Angular's render hooks).

<docs-callout title="NgZone.run and NgZone.runOutsideAngular are compatible with Zoneless">
`NgZone.run` and `NgZone.runOutsideAngular` do not need to be removed in order for code to be compatible with
Zoneless applications. In fact, removing these calls can lead to performance regressions for libraries that
are used in applications that still rely on ZoneJS.
</docs-callout>
-->

애플리케이션과 라이브러리에서는 `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable`, `NgZone.onStable` 사용을 제거해야 합니다.
애플리케이션에서 Zoneless 변경 감지를 활성화하면 이 옵저버블은 값을 방출하지 않습니다.
마찬가지로 `NgZone.isStable`은 항상 `true`이므로 코드 실행 조건으로 사용해서는 안 됩니다.

`NgZone.onMicrotaskEmpty`와 `NgZone.onStable` 옵저버블은 작업을 수행하기 전에 Angular의 변경 감지가 완료될 때까지 기다리는 용도로 가장 많이 사용됩니다.
변경 감지 한 번이 끝나기를 기다려야 한다면 `afterNextRender`로, 여러 변경 감지 주기에 걸칠 수 있는 조건을 기다려야 한다면 `afterEveryRender`로 대체할 수 있습니다.
단지 익숙하고 필요한 시점과 실행 시점이 비슷하다는 이유로 이 옵저버블들을 사용한 경우도 있습니다.
이때는 더 간단하거나 직접적인 DOM API로 대체할 수 있습니다.
예를 들어 코드가 특정 DOM 상태를 기다려야 한다면 Angular의 렌더링 훅을 통해 간접적으로 기다리는 대신 `MutationObserver`를 사용할 수 있습니다.

<docs-callout title="NgZone.run과 NgZone.runOutsideAngular는 Zoneless와 호환됩니다">
Zoneless 애플리케이션과 호환되도록 만들기 위해 `NgZone.run`과 `NgZone.runOutsideAngular`를 제거할 필요는 없습니다.
오히려 이 호출들을 제거하면 여전히 ZoneJS에 의존하는 애플리케이션에서 사용되는 라이브러리의 성능이 저하될 수 있습니다.
</docs-callout>

<!--
### `PendingTasks` for Server Side Rendering (SSR)
-->

<a id="pendingtasks-for-server-side-rendering-ssr"></a>

### 서버 측 렌더링(SSR)을 위한 `PendingTasks`

<!--
If you are using SSR with Angular, you may know that it relies on ZoneJS to help determine when the application
is "stable" and can be serialized. If there are asynchronous tasks that should prevent serialization, an application
not using ZoneJS must make Angular aware of these with the [PendingTasks](/api/core/PendingTasks) service. Serialization
will wait for the first moment that all pending tasks have been removed.

The two most straightforward uses of pending tasks are the `run` method:

```typescript
const taskService = inject(PendingTasks);
taskService.run(async () => {
  const someResult = await doSomeWorkThatNeedsToBeRendered();
  this.someState.set(someResult);
});
```

For more complicated use-cases, you can manually add and remove a pending task:

```typescript
const taskService = inject(PendingTasks);
const taskCleanup = taskService.add();
try {
  await doSomeWorkThatNeedsToBeRendered();
} catch {
  // handle error
} finally {
  taskCleanup();
}
```

In addition, the [pendingUntilEvent](/api/core/rxjs-interop/pendingUntilEvent#) helper in `rxjs-interop` ensures
the application remains unstable until the observable emits, completes, errors, or is unsubscribed.

```typescript
readonly myObservableState = someObservable.pipe(pendingUntilEvent());
```

The framework uses this service internally as well to prevent serialization until asynchronous tasks are complete. These include, but are not limited to,
an ongoing Router navigation and an incomplete `HttpClient` request.
-->

Angular에서 SSR을 사용한다면, 애플리케이션이 "안정된 상태"가 되어 직렬화할 수 있는지 판단하는 데 ZoneJS를 활용한다는 점을 알고 계실 수 있습니다.
직렬화를 지연시켜야 하는 비동기 작업이 있다면, ZoneJS를 사용하지 않는 애플리케이션에서는 [PendingTasks](/api/core/PendingTasks) 서비스로 이 작업을 Angular에 알려야 합니다.
직렬화는 대기 중인 모든 작업이 제거되는 첫 시점까지 기다립니다.

대기 중인 작업을 다루는 가장 간단한 두 방법 중 하나는 `run` 메서드입니다.

```typescript
const taskService = inject(PendingTasks);
taskService.run(async () => {
  const someResult = await doSomeWorkThatNeedsToBeRendered();
  this.someState.set(someResult);
});
```

더 복잡한 경우에는 대기 중인 작업을 수동으로 추가하고 제거할 수 있습니다.

```typescript
const taskService = inject(PendingTasks);
const taskCleanup = taskService.add();
try {
  await doSomeWorkThatNeedsToBeRendered();
} catch {
  // 에러를 처리합니다.
} finally {
  taskCleanup();
}
```

또한 `rxjs-interop`의 [pendingUntilEvent](/api/core/rxjs-interop/pendingUntilEvent#) 헬퍼를 사용하면 옵저버블이 값을 방출하거나, 완료되거나, 에러가 발생하거나, 구독이 해제될 때까지 애플리케이션이 불안정한 상태를 유지하도록 할 수 있습니다.

```typescript
readonly myObservableState = someObservable.pipe(pendingUntilEvent());
```

프레임워크도 비동기 작업이 끝날 때까지 직렬화를 방지하기 위해 내부적으로 이 서비스를 사용합니다.
이러한 작업에는 진행 중인 라우터 탐색이나 완료되지 않은 `HttpClient` 요청 등이 포함됩니다.

<!--
### Reactive forms in zoneless applications
-->

<a id="reactive-forms-in-zoneless-applications"></a>

### Zoneless 애플리케이션의 리액티브 폼

<!--
Reactive forms model updates (`setValue`, `patchValue`, `FormArray.push`, and similar APIs) update form state and emit forms observables, but they do not automatically schedule component change detection.

If a template depends on reactive forms state, connect forms observables to a change-detection notification (for example `ChangeDetectorRef.markForCheck()`), or reflect the data through signals consumed by the template.
-->

리액티브 폼 모델을 갱신하는 `setValue`, `patchValue`, `FormArray.push` 등의 API는 폼 상태를 갱신하고 폼 옵저버블에서 값을 방출하지만, 컴포넌트의 변경 감지를 자동으로 예약하지는 않습니다.

템플릿이 리액티브 폼 상태에 의존한다면 폼 옵저버블을 변경 감지 알림(예: `ChangeDetectorRef.markForCheck()`)에 연결하거나, 템플릿에서 사용하는 시그널을 통해 데이터를 반영하세요.

<!--
## Testing and Debugging
-->

<a id="testing-and-debugging"></a>

## 테스트와 디버깅

<!--
### Using Zoneless in `TestBed`
-->

<a id="using-zoneless-in-testbed"></a>

### `TestBed`에서 Zoneless 사용하기

<!--
`TestBed` uses Zone-based change detection by default when `zone.js` is loaded via the `polyfills`.

If `zone.js` is not present, `TestBed` runs zoneless by default. To force zoneless mode when `zone.js` is loaded, add `provideZonelessChangeDetection()`:

```typescript
TestBed.configureTestingModule({
  // Optional: include the provider to force the testing environment
  // uses the same zoneless behavior as a zoneless application.
  providers: [provideZonelessChangeDetection()],
});

const fixture = TestBed.createComponent(MyComponent);
await fixture.whenStable();
```

To ensure tests have the most similar behavior to production code,
avoid using `fixture.detectChanges()` when possible. This forces
change detection to run when Angular might otherwise have not
scheduled change detection. Tests should ensure these notifications
are happening and allow Angular to handle when to synchronize
state rather than manually forcing it to happen in the test.

For existing test suites, using `fixture.detectChanges()` is a common pattern
and it is likely not worth the effort of converting these to
`await fixture.whenStable()`. `TestBed` will still enforce that the
fixture's component is `OnPush` compatible and throws `ExpressionChangedAfterItHasBeenCheckedError`
if it finds that template values were updated without a
change notification (i.e. `fixture.componentInstance.someValue = 'newValue';`).
If the component is used in production, this issue should be addressed by updating
the component to use signals for state or call `ChangeDetectorRef.markForCheck()`.
If the component is only used as a test wrapper and never used in an application,
it is acceptable to use `fixture.changeDetectorRef.markForCheck()`.
-->

`polyfills`로 `zone.js`를 불러온 경우, `TestBed`는 기본적으로 Zone 기반 변경 감지를 사용합니다.

`zone.js`가 없으면 `TestBed`는 기본적으로 Zoneless로 실행됩니다.
`zone.js`를 불러온 상태에서 Zoneless 모드를 강제하려면 `provideZonelessChangeDetection()`을 추가하세요.

```typescript
TestBed.configureTestingModule({
  // 선택 사항: 프로바이더를 추가해 테스트 환경이
  // Zoneless 애플리케이션과 같은 방식으로 동작하도록 합니다.
  providers: [provideZonelessChangeDetection()],
});

const fixture = TestBed.createComponent(MyComponent);
await fixture.whenStable();
```

테스트가 프로덕션 코드와 최대한 비슷하게 동작하도록 하려면 가능한 한 `fixture.detectChanges()`를 사용하지 마세요.
이 메서드는 Angular가 변경 감지를 예약하지 않았을 상황에서도 변경 감지를 강제로 실행합니다.
테스트에서는 수동으로 상태 동기화를 강제하는 대신, 알림이 발생하는지 확인하고 동기화 시점은 Angular가 결정하도록 해야 합니다.

기존 테스트 모음에서는 `fixture.detectChanges()` 사용이 흔한 패턴이며, 이를 `await fixture.whenStable()`로 바꾸는 데 드는 노력만큼의 이점은 크지 않을 수 있습니다.
`TestBed`는 여전히 fixture의 컴포넌트가 `OnPush`와 호환되는지 확인하며, 변경 알림 없이 템플릿 값이 갱신된 경우(예: `fixture.componentInstance.someValue = 'newValue';`) `ExpressionChangedAfterItHasBeenCheckedError`를 발생시킵니다.
프로덕션에서 사용하는 컴포넌트라면 상태에 시그널을 사용하거나 `ChangeDetectorRef.markForCheck()`를 호출하도록 컴포넌트를 수정해 이 문제를 해결해야 합니다.
컴포넌트가 테스트용 래퍼로만 사용되고 애플리케이션에서는 사용되지 않는다면 `fixture.changeDetectorRef.markForCheck()`를 사용해도 괜찮습니다.

<!--
### Debug-mode check to ensure updates are detected
-->

<a id="debug-mode-check-to-ensure-updates-are-detected"></a>

### 갱신이 감지되는지 디버그 모드에서 확인하기

<!--
Angular also provides an additional tool to help verify that an application is making
updates to state in a zoneless-compatible way. `provideCheckNoChangesConfig({exhaustive: true, interval: <milliseconds>})`
can be used to periodically check to ensure that no bindings have been updated
without a notification. Angular throws `ExpressionChangedAfterItHasBeenCheckedError`
if there is an updated binding that would not have refreshed by the zoneless change
detection.
-->

Angular는 애플리케이션이 Zoneless와 호환되는 방식으로 상태를 갱신하는지 확인하는 추가 도구도 제공합니다.
`provideCheckNoChangesConfig({exhaustive: true, interval: <milliseconds>})`를 사용하면 알림 없이 갱신된 바인딩이 없는지 주기적으로 확인할 수 있습니다.
Zoneless 변경 감지로는 갱신되지 않을 바인딩의 변경이 발견되면 Angular는 `ExpressionChangedAfterItHasBeenCheckedError`를 발생시킵니다.
