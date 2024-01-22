<!--
# Resolving zone pollution
-->
# Zone 오염 해결하기

<!--
**Zone.js** is a signaling mechanism that Angular uses to detect when an application state might have changed. It captures asynchronous operations like `setTimeout`, network requests, and event listeners. Angular schedules change detection based on signals from Zone.js.

In some cases scheduled [tasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks) or [microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#microtasks) don’t make any changes in the data model, which makes running change detection unnecessary. Common examples are:
* `requestAnimationFrame`, `setTimeout` or `setInterval`
* Task or microtask scheduling by third-party libraries

This section covers how to identify such conditions, and how to run code outside the Angular zone to avoid unnecessary change detection calls.
-->
**Zone.js** 은 애플리케이션 상태가 변경된 것을 감지하기 위해 사용하는 신호 메커니즘입니다.
이 라이브러리는 `setTimeout`, 네트워크 요청, 이벤트 리스너와 같은 비동기 작업을 감지하는 용도로 사용됩니다.
Angular는 Zone.js에서 나온 시그널을 기반으로 변화 감지 스케쥴을 준비합니다.

[태스크(task)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks)나 [마이크로태스크(microtasks)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#microtasks)에서 데이터 모델을 변경하지 않으면 변화 감지가 작동할 필요가 없습니다.
예를 들자면 이런 것들이 그렇습니다:
* `requestAnimationFrame`, `setTimeout`, `setInterval`
* 서드 파티 라이브러리가 실행하는 태스크나 마이크로태스크

이번 섹션에서는 이런 경우를 어떻게 판단하는지, 변화 감지를 생략하기 위해 Angular 영역 밖에서 코드를 실행하려면 어떻게 해야 하는지 알아봅시다.


<!--
## Identifying unnecessary change detection calls
-->
## 불필요한 변화 감지 골라내기

<!--
You can detect unnecessary change detection calls using Angular DevTools. Often they appear as consecutive bars in the profiler’s timeline with source `setTimeout`, `setInterval`, `requestAnimationFrame`, or an event handler. When you have limited calls within your application of these APIs, the change detection invocation is usually caused by a third-party library.

<div class="lightbox">
  <img alt="Angular DevTools profiler preview showing Zone pollution" src="generated/images/guide/change-detection/zone-pollution.png">
</div>

In the image above, there is a series of change detection calls triggered by event handlers associated with an element. That’s a common challenge when using third-party, non-native Angular components, which do not alter the default behavior of `NgZone`.
-->
불필요한 변화 감지가 실행되는 것은 Angular DevTools로 확인할 수 있습니다.
프로파일러의 타임라인을 보면 `setTimeout`, `setInterval`, `requestAnimationFrame`이나 이벤트 핸들러가 실행되는 것이 연속된 막대로 표시되는 것을 볼 수 있습니다.
이런 막대가 예상치 못한 정도로 많이 표시된다면 서드 파티 라이브러리가 변화 감지를 유발하는 경우일 수 있습니다.

<div class="lightbox">
  <img alt="Angular DevTools profiler preview showing Zone pollution" src="generated/images/guide/change-detection/zone-pollution.png">
</div>

위 그림을 보면, 엘리먼트에 연결된 이벤트 핸들러 때문에 변화 감지 실행이 계속되는 것을 확인할 수 있습니다.
서드 파티 라이브러리를 사용하거나, Angular를 기반으로 `NgZone`을 적절하게 회피하지 않았다면 일반적으로 만나는 어려움입니다.


<!--
## Run tasks outside `NgZone`
-->
## `NgZone` 외부에서 태스크 실행하기

<!--
In such cases, you can instruct Angular to avoid calling change detection for tasks scheduled by a given piece of code using [NgZone](/guide/zone).

```ts
import { Component, NgZone, OnInit } from '@angular/core';
@Component(...)
class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => setInterval(pollForUpdates), 500);
  }
}
```

The preceding snippet instructs Angular to call `setInterval` outside the Angular Zone and skip running change detection after `pollForUpdates` runs.

Third-party libraries commonly trigger unnecessary change detection cycles because they weren't authored with Zone.js in mind. Avoid these extra cycles by calling library APIs outside the Angular zone:

```ts
import { Component, NgZone, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      Plotly.newPlot('chart', data);
    });
  }
}
```

Running `Plotly.newPlot('chart', data);` within `runOutsideAngular` instructs the framework that it shouldn’t run change detection after the execution of tasks scheduled by the initialization logic.

For example, if `Plotly.newPlot('chart', data)` adds event listeners to a DOM element, Angular does not run change detection after the execution of their handlers.
-->
[NgZone](/guide/zone)을 활용하면 Angular의 변화 감지를 유발하지 않으면서 태스크를 실행할 수 있습니다.

```ts
import { Component, NgZone, OnInit } from '@angular/core';
@Component(...)
class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => setInterval(pollForUpdates), 500);
  }
}
```

위 예제 코드는 `setInterval()`을 Angular Zone 외부에서 실행하고 `pollForUpdates`를 실행할 때까지 변화 감지를 모두 회피하는 예제 코드입니다.

서드 파티 라이브러리는 일반적으로 Zone.js를 고려하지 않았기 때문에 불필요한 변화 감지 싸이클을 유발하는 경우가 많습니다.
그렇다면 라이브러리 API를 Angular 밖에서 실행하면 성능 문제를 피할 수 있습니다:

```ts
import { Component, NgZone, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component(...)
class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      Plotly.newPlot('chart', data);
    });
  }
}
```

`Plotly.newPlot('chart', data)`를 `runOutsideAngular` 안에서 실행했기 때문에 Angular는 컴포넌트 초기화 로직을 실행한 후에도 변화 감지 싸이클을 시작하지 않습니다.

만약 `Plotly.newPlot('chart', data)`가 DOM 엘리먼트에 이벤트 리스너를 연결한다면, 이 이벤트 핸들러가 유발하는 변화 감지도 실행되지 않습니다.


@reviewed 2022-05-04
