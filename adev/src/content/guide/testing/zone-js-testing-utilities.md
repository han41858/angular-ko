<!--
# Zone.js Testing Utilities
-->

<a id="zonejs-testing-utilities"></a>

# Zone.js 테스트 유틸리티

<!--
This guide describes testing utilities primarily used for managing and controlling async tasks in unit tests. These utilities are essentially the Zone.js-specific mock clock utilities, particularly relevant for controlling the flow of asynchronous operations within tests.

For general Angular testing utilities, including `TestBed` and `ComponentFixture`, see the [Testing Utility APIs](guide/testing/utility-apis) guide.

Here's a summary of Zone.js-specific functions:

| Function               | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `waitForAsync`         | Tracks async tasks and completes the tests only once there are no longer any micro or macrotasks remaining in the test zone.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `fakeAsync`            | Runs the body of a test \(`it`\) within a special _fakeAsync test zone_, enabling a linear control flow coding style.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tick`                 | Simulates the passage of time and the completion of pending asynchronous activities by flushing both _timer_ and _micro-task_ queues within the _fakeAsync test zone_. The curious, dedicated reader might enjoy this lengthy blog post, ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules). Accepts an optional argument that moves the virtual clock forward by the specified number of milliseconds, clearing asynchronous activities scheduled within that timeframe. |
| `discardPeriodicTasks` | Discards any periodic tasks (e.g. `setInterval`) that were created inside the `fakeAsync` Zone.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `flushMicrotasks`      | When a `fakeAsync()` test ends with pending _micro-tasks_ such as unresolved promises, the test fails with a clear error message. <br /> In general, a test should wait for micro-tasks to finish. When pending microtasks are expected, call `flushMicrotasks` to flush the _micro-task_ queue and avoid the error.                                                                                                                                                                                                                       |
-->

이 문서에서는 단위 테스트의 비동기 작업을 관리하고 제어하는 데 주로 사용하는 테스트 유틸리티를 알아봅니다.
이 유틸리티는 Zone.js 전용 가상 시계 유틸리티이며, 특히 테스트 안에서 비동기 작업의 흐름을 제어할 때 유용합니다.

`TestBed`, `ComponentFixture`를 포함한 일반적인 Angular 테스트 유틸리티는 [테스트 유틸리티 API](guide/testing/utility-apis) 문서를 참고하세요.

Zone.js 전용 함수는 다음과 같습니다.

| 함수                   | 설명                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `waitForAsync`         | 비동기 작업을 추적하고, 테스트 존에 마이크로태스크나 매크로태스크가 더 이상 남아 있지 않을 때만 테스트를 완료합니다.                                                                                                                                                                                                                                                                                                            |
| `fakeAsync`            | 특별한 _fakeAsync 테스트 존_ 안에서 테스트\(`it`\) 본문을 실행하므로, 실행 흐름을 순차적인 코드로 작성할 수 있습니다.                                                                                                                                                                                                                                                                                                           |
| `tick`                 | _fakeAsync 테스트 존_ 의 _타이머_ 큐와 _마이크로태스크_ 큐를 모두 처리해서 시간의 경과와 대기 중인 비동기 작업의 완료를 재현합니다. 자세한 원리가 궁금하다면 ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules) 블로그 글을 읽어보세요. 선택적으로 인자를 전달하면 지정한 밀리초만큼 가상 시계를 앞으로 이동하고 그 시간 안에 예약된 비동기 작업을 처리합니다. |
| `discardPeriodicTasks` | `fakeAsync` 존 안에서 생성된 주기적 작업(예: `setInterval`)을 모두 제거합니다.                                                                                                                                                                                                                                                                                                                                                  |
| `flushMicrotasks`      | 처리되지 않은 Promise처럼 대기 중인 _마이크로태스크_ 가 남은 상태로 `fakeAsync()` 테스트가 끝나면 명확한 오류 메시지와 함께 테스트가 실패합니다. <br /> 일반적으로 테스트는 마이크로태스크가 끝날 때까지 기다려야 합니다. 대기 중인 마이크로태스크가 있는 것이 예상된 상황이라면 `flushMicrotasks`를 실행해서 _마이크로태스크_ 큐를 처리하고 오류를 방지하세요.                                                                 |
