<!--
# Resolving zone pollution
-->

<a id="resolving-zone-pollution"></a>

# 존 오염 해결하기

<!--
**Zone.js** is a signaling mechanism that Angular uses to detect when an application state might have changed. It captures asynchronous operations like `setTimeout`, network requests, and event listeners. Angular schedules change detection based on signals from Zone.js.

In some cases scheduled [tasks](https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks) or [microtasks](https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide#microtasks) don’t make any changes in the data model, which makes running change detection unnecessary. Common examples are:

- `requestAnimationFrame`, `setTimeout` or `setInterval`
- Task or microtask scheduling by third-party libraries

This section covers how to identify such conditions, and how to run code outside the Angular zone to avoid unnecessary change detection calls.
-->

**Zone.js**는 애플리케이션 상태가 변경되었을 가능성을 Angular가 감지하도록 알리는 메커니즘입니다.
`setTimeout`, 네트워크 요청, 이벤트 리스너 등의 비동기 작업을 포착합니다.
Angular는 Zone.js의 알림을 바탕으로 변경 감지를 예약합니다.

예약된 [태스크](https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks)나 [마이크로태스크](https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide#microtasks)가 데이터 모델을 변경하지 않아 변경 감지가 불필요한 경우도 있습니다.
일반적인 예는 다음과 같습니다:

- `requestAnimationFrame`, `setTimeout`, `setInterval`
- 서드 파티 라이브러리가 예약하는 태스크나 마이크로태스크

이 섹션에서는 이러한 상황을 파악하고, Angular 존 바깥에서 코드를 실행해 불필요한 변경 감지 호출을 피하는 방법을 설명합니다.

<!--
## Identifying unnecessary change detection calls
-->

<a id="identifying-unnecessary-change-detection-calls"></a>

## 불필요한 변경 감지 호출 찾기

<!--
You can detect unnecessary change detection calls using Angular DevTools. Often they appear as consecutive bars in the profiler’s timeline with source `setTimeout`, `setInterval`, `requestAnimationFrame`, or an event handler. When you have limited calls within your application of these APIs, the change detection invocation is usually caused by a third-party library.

<img alt="Angular DevTools profiler preview showing Zone pollution" src="assets/images/best-practices/runtime-performance/zone-pollution.png">

In the image above, there is a series of change detection calls triggered by event handlers associated with an element. That’s a common challenge when using third-party, non-native Angular components, which do not alter the default behavior of `NgZone`.
-->

Angular DevTools로 불필요한 변경 감지 호출을 찾을 수 있습니다.
프로파일러 타임라인에는 흔히 `setTimeout`, `setInterval`, `requestAnimationFrame`, 이벤트 핸들러를 원인으로 하는 막대가 연속해서 나타납니다.
애플리케이션에서 이 API를 많이 호출하지 않는다면 변경 감지는 보통 서드 파티 라이브러리가 유발한 것입니다.

<img alt="존 오염을 보여주는 Angular DevTools 프로파일러 화면" src="assets/images/best-practices/runtime-performance/zone-pollution.png">

위 이미지에는 한 요소와 연결된 이벤트 핸들러가 연속해서 실행한 변경 감지 호출이 나타납니다.
이는 `NgZone`의 기본 동작을 바꾸지 않는, Angular 전용이 아닌 서드 파티 컴포넌트를 사용할 때 자주 마주치는 문제입니다.

<!--
## Run tasks outside `NgZone`
-->

<a id="run-tasks-outside-ngzone"></a>

## `NgZone` 바깥에서 태스크 실행하기

<!--
In such cases, you can instruct Angular to avoid calling change detection for tasks scheduled by a given piece of code using [NgZone](/api/core/NgZone).

```ts {header:"Run outside of the Zone" , linenums}
import { Component, NgZone, OnInit, inject } from '@angular/core';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => setInterval(pollForUpdates, 500));
  }
}
```

The preceding snippet instructs Angular to call `setInterval` outside the Angular Zone and skip running change detection after `pollForUpdates` runs.

Third-party libraries commonly trigger unnecessary change detection cycles when their APIs are invoked within the Angular zone. This phenomenon particularly affects libraries that set up event listeners or initiate other tasks (such as timers, XHR requests, etc.). Avoid these extra cycles by calling library APIs outside the Angular zone:

```ts {header:"Move the plot initialization outside of the Zone" , linenums}
import { Component, NgZone, OnInit, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      Plotly.newPlot('chart', data);
    });
  }
}
```

Running `Plotly.newPlot('chart', data);` within `runOutsideAngular` instructs the framework that it shouldn’t run change detection after the execution of tasks scheduled by the initialization logic.

For example, if `Plotly.newPlot('chart', data)` adds event listeners to a DOM element, Angular does not run change detection after the execution of their handlers.

But sometimes, you may need to listen to events dispatched by third-party APIs. In such cases, it's important to remember that those event listeners will also execute outside of the Angular zone if the initialization logic was done there:

```ts {header:"Check whether the handler is called outside of the Zone" , linenums}
import { Component, NgZone, OnInit, output, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  plotlyClick = output<Plotly.PlotMouseEvent>();

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.createPlotly();
    });
  }

  private async createPlotly() {
    const plotly = await Plotly.newPlot('chart', data);

    plotly.on('plotly_click', (event: Plotly.PlotMouseEvent) => {
      // This handler will be called outside of the Angular zone because
      // the initialization logic is also called outside of the zone. To check
      // whether we're in the Angular zone, we can call the following:
      console.log(NgZone.isInAngularZone());
      this.plotlyClick.emit(event);
    });
  }
}
```

If you need to dispatch events to parent components and execute specific view update logic, you should consider re-entering the Angular zone to instruct the framework to run change detection or run change detection manually:

```ts {header:"Re-enter the Angular zone when dispatching event" , linenums}
import { Component, NgZone, OnInit, output, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  plotlyClick = output<Plotly.PlotMouseEvent>();

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.createPlotly();
    });
  }

  private async createPlotly() {
    const plotly = await Plotly.newPlot('chart', data);

    plotly.on('plotly_click', (event: Plotly.PlotMouseEvent) => {
      this.ngZone.run(() => {
        this.plotlyClick.emit(event);
      });
    });
  }
}
```

The scenario of dispatching events outside of the Angular zone may also arise. It's important to remember that triggering change detection (for example, manually) may result in the creation/update of views outside of the Angular zone.
-->

이 경우 [NgZone](/api/core/NgZone)으로 특정 코드가 예약한 태스크에 대해 변경 감지를 호출하지 않도록 Angular에 지시할 수 있습니다.

```ts {header:"존 밖에서 실행하기" , linenums}
import { Component, NgZone, OnInit, inject } from '@angular/core';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => setInterval(pollForUpdates, 500));
  }
}
```

위 코드는 Angular 존 바깥에서 `setInterval`을 호출하고 `pollForUpdates` 실행 후 변경 감지를 건너뛰도록 합니다.

서드 파티 라이브러리의 API를 Angular 존 안에서 호출하면 불필요한 변경 감지 사이클이 발생하는 경우가 많습니다.
특히 이벤트 리스너를 등록하거나 타이머, XHR 요청 등의 다른 작업을 시작하는 라이브러리에서 이런 현상이 나타납니다.
라이브러리 API를 Angular 존 바깥에서 호출해 추가 사이클을 피하세요:

```ts {header:"그래프 초기화를 존 밖으로 옮기기" , linenums}
import { Component, NgZone, OnInit, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      Plotly.newPlot('chart', data);
    });
  }
}
```

`runOutsideAngular` 안에서 `Plotly.newPlot('chart', data);`를 실행하면 초기화 로직이 예약한 태스크를 실행한 뒤 변경 감지를 수행하지 않도록 프레임워크에 지시합니다.

예를 들어 `Plotly.newPlot('chart', data)`가 DOM 요소에 이벤트 리스너를 추가하더라도 Angular는 그 핸들러를 실행한 뒤 변경 감지를 수행하지 않습니다.

하지만 때로는 서드 파티 API가 발생시키는 이벤트를 수신해야 할 수 있습니다.
이 경우 초기화 로직을 Angular 존 바깥에서 실행했다면 해당 이벤트 리스너도 Angular 존 바깥에서 실행된다는 점을 기억해야 합니다:

```ts {header:"핸들러가 존 밖에서 호출되는지 확인하기" , linenums}
import { Component, NgZone, OnInit, output, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  plotlyClick = output<Plotly.PlotMouseEvent>();

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.createPlotly();
    });
  }

  private async createPlotly() {
    const plotly = await Plotly.newPlot('chart', data);

    plotly.on('plotly_click', (event: Plotly.PlotMouseEvent) => {
      // 초기화 로직을 Angular 존 바깥에서 호출했기 때문에
      // 이 핸들러도 존 바깥에서 호출됩니다. 현재 Angular 존 안인지
      // 확인하려면 다음을 호출하면 됩니다:
      console.log(NgZone.isInAngularZone());
      this.plotlyClick.emit(event);
    });
  }
}
```

부모 컴포넌트에 이벤트를 전달하고 특정 뷰 갱신 로직을 실행해야 한다면, Angular 존 안으로 다시 들어가 프레임워크가 변경 감지를 실행하도록 하거나 변경 감지를 직접 실행하는 것을 고려하세요:

```ts {header:"이벤트를 전달할 때 Angular 존에 다시 진입하기" , linenums}
import { Component, NgZone, OnInit, output, inject } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class App implements OnInit {
  private ngZone = inject(NgZone);

  plotlyClick = output<Plotly.PlotMouseEvent>();

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.createPlotly();
    });
  }

  private async createPlotly() {
    const plotly = await Plotly.newPlot('chart', data);

    plotly.on('plotly_click', (event: Plotly.PlotMouseEvent) => {
      this.ngZone.run(() => {
        this.plotlyClick.emit(event);
      });
    });
  }
}
```

Angular 존 바깥에서 이벤트를 발생시키는 상황도 있을 수 있습니다.
이때 변경 감지를 직접 실행하는 등의 방법으로 유발하면 Angular 존 바깥에서 뷰를 생성하거나 갱신할 수 있다는 점을 기억해야 합니다.
