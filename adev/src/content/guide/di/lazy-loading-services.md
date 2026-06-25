<!--
# Lazy loading services
-->

# 서비스 지연 로딩

<!--
IMPORTANT: For lazy loading to work, the service you load must be auto-provided. Decorate it with either `@Injectable({providedIn: 'root'})` or [`@Service()`](guide/di/creating-and-using-services#using-the-service-decorator). Without auto-provisioning, Angular has no way to construct the service after it loads.

Angular's `injectAsync` function lets you load a service on demand, only when it's actually needed. This is useful when a service depends on a large library or rarely used feature, and you don't want to pay for it on the initial page load.

When you use `injectAsync`, the service's code is split out by your bundler into a separate JavaScript chunk and downloaded the first time you ask for the instance. Once loaded, Angular resolves the service through the regular DI system, so it can still depend on other injectables and behaves like any other singleton.
-->

중요: 서비스가 지연 로딩되려면 이 서비스의 프로바이더가 앱 최상위 계층에 등록되어야 합니다.
그래서 `@Injectable({providedIn: 'root'})`나 [`@Service()`](guide/di/creating-and-using-services#using-the-service-decorator) 데코레이터를 사용해야 합니다.

`injectAsync` 함수를 사용하면 서비스가 실제로 사용되어 꼭 필요한 시점에 서비스를 로드할 수 있습니다.
이 방식은 용량이 큰 라이브러리를 활용하거나, 거의 사용하지 않는 기능을 사용할 때, 최초 화면 로딩 속도를 향상시키려고 할 때 유용합니다.

`injectAsync`를 사용하면 서비스의 코드가 최초 로딩에 필요한 빌드 결과물과 분리되어 별도 JavaScript 청크로 구성되며, 이 서비스 인스턴스를 실제로 요청한 경우에 다운로드 받아 실행합니다.
그리고 한 번 로드된 후에는 일반적인 의존성 주입 시스템 항목과 마찬가지로, 싱글턴 인스턴스로 필요한 곳에 주입하여 사용할 수 있습니다.

<!--
## Lazily injecting a service
-->

## 지연 의존성 주입

<!--
Imagine a `ReportExporter` that depends on a heavy spreadsheet library. Most users open the report; only a few click **Export**. Load the exporter on demand:

```angular-ts
import {Component, injectAsync} from '@angular/core';

@Component({
  selector: 'app-report',
  template: `<button (click)="export()">Export</button>`,
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter').then((m) => m.ReportExporter));

  async export() {
    const exporter = await this.exporter();
    exporter.export();
  }
}
```

The first call to `this.exporter()` triggers the dynamic import and resolves the service from DI. Subsequent calls reuse the same promise, so the chunk is only fetched once.

If the lazy-loaded service is the [default export](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export), pass the dynamic import directly, Angular unwraps the `default` for you:

```ts {header: report-exporter.ts}
@Service()
export default class ReportExporter {
  /* … */
}
```

```ts {header: report.ts}
private exporter = injectAsync(() => import('./report-exporter'));
```
-->

`ReportExporter`가 무거운 스프레드시트 라이브러리를 활용한다고 합시다.
사용자들은 대부분 보고서를 열어보겠지만 **내보내기** 를 클릭하는 사용자는 소수입니다.
그렇다면 다음과 같이 필요할 때만 서비스를 로드하면 됩니다:

```angular-ts
import {Component, injectAsync} from '@angular/core';

@Component({
  selector: 'app-report',
  template: `<button (click)="export()">Export</button>`,
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter').then((m) => m.ReportExporter));

  async export() {
    const exporter = await this.exporter();
    exporter.export();
  }
}
```

첫번째 실행하는 `this.exporter()` 시점에 동적 로드가 시작되며 서비스 클래스의 인스턴스를 생성해서 의존성 주입 시스템에 연결합니다.
그 다음 실행하는 `this.exporter()`는 지연 로딩이 완료되었기 때문에 같은 객체를 다시 사용합니다.

지연 로딩되는 서비스가 [default export](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export)로 지정되어 있다면, 동적 로딩에 직접 연결했을 때 Angular가 `default`를 자동으로 제거합니다:

```ts {header: report-exporter.ts}
@Service()
export default class ReportExporter {
  /* … */
}
```

```ts {header: report.ts}
private exporter = injectAsync(() => import('./report-exporter'));
```

<!--
## Prefetching the dependency
-->

## 의존성을 사전에 로딩하기

<!--
By default, the lazy chunk is only fetched when you invoke the returned function. You can start the download earlier by passing a `prefetch` trigger in the options. A trigger is any function that returns a `Promise`, when it resolves, Angular kicks off the loader.

Angular ships with `onIdle`, a built-in trigger that waits until the browser becomes idle:

```ts
import {Component, injectAsync, onIdle} from '@angular/core';

@Component({
  /* … */
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter').then((m) => m.ReportExporter), {
    prefetch: onIdle,
  });
}
```

You can also configure `onIdle` with a maximum wait time so the prefetch always happens within a known window, even on busy pages:

```ts
injectAsync(loader, {prefetch: () => onIdle({timeout: 1_000})});
```

NOTE: Prefetching is opportunistic. If the user invokes the feature before the prefetch fires, Angular still loads the dependency immediately and resolves your `await` as soon as it's ready.
-->

기본적으로 지연로딩 되는 청크는 해당 청크의 함수를 실행할 떄만 로딩됩니다.
그런데 옵션에 `prefetch` 트리거를 전달하면 이 파일을 사전에 다운로드 해둘 수 있습니다.
트리거는 `Promise`를 반환하는 함수이기만 하면 되고, 이 함수가 종료되면 Angular가 로더를 시작합니다.

브라우저가 대기상태일 때 파일을 로드하는 기본 트리거 `onIdle`도 있습니다:

```ts
import {Component, injectAsync, onIdle} from '@angular/core';

@Component({
  /* … */
})
export class Report {
  private exporter = injectAsync(() => import('./report-exporter').then((m) => m.ReportExporter), {
    prefetch: onIdle,
  });
}
```

`onIdle`을 사용하면서 최대 대기시간을 지정하면, 브라우저가 대기 상태가 아니더라도 해당 파일을 로드합니다:

```ts
injectAsync(loader, {prefetch: () => onIdle({timeout: 1_000})});
```

참고: 사전 로딩은 상황에 따라 자동으로 동작합니다.
사용자가 사전 로딩되지 않은 함수를 실행하면, Angular는 해당 의존성 객체를 즉시 로드한 후에 `await`로 처리합니다.

<!--
## Provide a custom prefetch trigger
-->

## 커스텀 사전 로딩 트리거 등록하기

<!--
A `PrefetchTrigger` is just a function that returns a promise, the loader runs as soon as the promise resolves. Use this to align prefetching with your own signals, such as a hover or a scheduler tick:

```ts
import {PrefetchTrigger} from '@angular/core';

export function onHover(target: HTMLElement): PrefetchTrigger {
  return () =>
    new Promise<void>((resolve) => {
      target.addEventListener('pointerenter', () => resolve(), {once: true});
    });
}
```
-->

`PrefetchTrigger`는 `Promise`를 반환하는 함수인데, 이 Promise가 종료되면 로더가 즉시 실행됩니다.
마우스 포인터를 올리거나 타이머가 동작하는 것과 같이 개발자가 원하는 시점에 서비스를 사전 로딩하는 경우라면 다음과 같이 구성하면 됩니다:

```ts
import {PrefetchTrigger} from '@angular/core';

export function onHover(target: HTMLElement): PrefetchTrigger {
  return () =>
    new Promise<void>((resolve) => {
      target.addEventListener('pointerenter', () => resolve(), {once: true});
    });
}
```
