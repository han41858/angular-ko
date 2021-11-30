<!--
# Testing Utility APIs
-->
# 테스트 유틸리티 API

<!--
This page describes the most useful Angular testing features.

The Angular testing utilities include the `TestBed`, the `ComponentFixture`, and a handful of functions that control the test environment.
The [_TestBed_](#testbed-api-summary) and [_ComponentFixture_](#component-fixture-api-summary) classes are covered separately.

Here's a summary of the stand-alone functions, in order of likely utility:
-->
이 문서는 Angular가 제공하는 테스트 기능 중에서 유용하게 사용할 수 있는 기능을 안내합니다.

테스트 환경을 구성하려면 `TestBed`나 `ComponentFixture`와 같은 테스트 유틸리티를 사용하는 것이 편합니다.
[_TestBed_](#testbed-api-summary) 클래스와 [_ComponentFixture_](#component-fixture-api-summary) 클래스는 별도 문서에서 따로 다룹니다.

자주 사용하는 테스트 유틸리티는 이런 것들이 있습니다:


<table>
  <tr>
    <th>
      <!--
      Function
      -->
      함수
    </th>
    <th>
      <!--
      Description
      -->
      설명
    </th>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>waitForAsync</code>
    </td>

    <td>

      <!--
      Runs the body of a test (`it`) or setup (`beforeEach`) function within a special _async test zone_.
      See [waitForAsync](guide/testing-components-scenarios#waitForAsync).
      -->
      테스트 스펙(`it`)이나 환경설정 블럭(`beforeEach`) 함수을 _비동기 테스트 존_ 에서 실행합니다.
      [`waitForAsync()`](guide/testing-components-scenarios#waitForAsync) 섹션을 참고하세요.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>fakeAsync</code>
    </td>

    <td>

      <!--
      Runs the body of a test (`it`) within a special _fakeAsync test zone_, enabling
      a linear control flow coding style. See [fakeAsync](guide/testing-components-scenarios#fake-async).
      -->
      테스트 스펙(`it`)을 코딩 스타일을 선형(linear)으로 구성해서 _fakeAsync 테스트 존_ 에서 실행합니다.
      [`fakeAsync()`](guide/testing-components-scenarios#fake-async) 섹션을 참고하세요.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>tick</code>
    </td>

    <td>

      <!--
      Simulates the passage of time and the completion of pending asynchronous activities
      by flushing both _timer_ and _micro-task_ queues within the _fakeAsync test zone_.

      <div class="alert is-helpful">

      The curious, dedicated reader might enjoy this lengthy blog post,
      ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/).

      </div>

      Accepts an optional argument that moves the virtual clock forward
      by the specified number of milliseconds,
      clearing asynchronous activities scheduled within that timeframe.
      See [tick](guide/testing-components-scenarios#tick).
      -->
      시간이 지난 것을 시뮬레이션해서 아직 처리되지 않은 비동기 작업을 종료합니다.
      _타이머_ , _마이크로 태스크_ , _fakeAsync 테스트 존_ 큐가 모두 대상이 됩니다.


      <div class="alert is-helpful">

      자세한 내용을 알아보려면 ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) 블로그 글을 확인해보는 것도 좋습니다.

      </div>

      이 함수를 실행하면서 밀리초 단위로 인자를 전달하면 원하는 시간만큼 진행할 수 있습니다.
      [`tick()`](guide/testing-components-scenarios#tick) 섹션을 참고하세요.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
       <code>inject</code>
    </td>

    <td>

      <!--
      Injects one or more services from the current `TestBed` injector into a test function.
      It cannot inject a service provided by the component itself.
      See discussion of the [debugElement.injector](guide/testing-components-scenarios#get-injected-services).
      -->
      현재 `TestBed` 인젝터에 등록된 서비스의 인스턴스를 참조합니다.
      자세한 내용은 [debugElement.injector](guide/testing-components-scenarios#get-injected-services) 문서를 참고하세요.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>discardPeriodicTasks</code>
    </td>

    <td>

      <!--
      When a `fakeAsync()` test ends with pending timer event _tasks_ (queued `setTimeOut` and `setInterval` callbacks),
      the test fails with a clear error message.

      In general, a test should end with no queued tasks.
      When pending timer tasks are expected, call `discardPeriodicTasks` to flush the _task_ queue
      and avoid the error.
      -->
      `fakeAsync()` 테스트가 끝난 이후에 남아있는 타이머 이벤트 _태스크_ (ex. `setTimeout`, `setInterval` 콜백)를 종료합니다.

      일반적으로 테스트 코드를 종료할 때는 큐에 남아있는 태스크가 없어야 합니다.
      그래서 테스트 코드가 종료된 시점에 남아있는 타이머가 있다면 `discardPeriodicTasks`를 실행해서 에러 없이 태스크 큐를 비울 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>flushMicrotasks</code>
    </td>

    <td>

      <!--
      When a `fakeAsync()` test ends with pending _micro-tasks_ such as unresolved promises,
      the test fails with a clear error message.

      In general, a test should wait for micro-tasks to finish.
      When pending microtasks are expected, call `flushMicrotasks` to flush the  _micro-task_ queue
      and avoid the error.
      -->
      `fakeAsync()` 테스트가 끝난 이후에 남아있는 _마이크로 태스크_ (ex. `Promise`)를 종료합니다.

      일반적으로 테스트 코드는 마이크로 태스크가 모두 종료되기 전까지 종료되지 않습니다.
      그래서 테스트 코드가 종료된 시점에 남아있는 마이크로 태스크가 있다면 `flushMicrotasks`를 실행해서 에러 없이 _마이크로 태스크_ 큐를 비울 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>ComponentFixtureAutoDetect</code>
    </td>

    <td>

      <!--
      A provider token for a service that turns on [automatic change detection](guide/testing-components-scenarios#automatic-change-detection).
      -->
      [변화 감지 로직을 자동으로 실행](guide/testing-components-scenarios#automatic-change-detection)하는 프로바이더 토큰입니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>getTestBed</code>
    </td>

    <td>

      <!--
      Gets the current instance of the `TestBed`.
      Usually unnecessary because the static class methods of the `TestBed` class are typically sufficient.
      The `TestBed` instance exposes a few rarely used members that are not available as
      static methods.
      -->
      현재 구성된 `TestBed` 인스턴스를 참조합니다.
      일반적으로 `TestBed` 클래스의 정적 클래스 메서드를 실행하는 것만으로도 테스트 코드의 환경설정을 끝낼 수 있기 때문에 이 메서드를 사용하는 일은 별로 없습니다.
      정적 메서드로 설정할 수 없는 클래스 멤버를 직접 참조하는 경우에만 사용합니다. 

    </td>
  </tr>
</table>

<hr>

{@a testbed-class-summary}

<!--
## _TestBed_ class summary
-->
## _TestBed_ 클래스 요약

<!--
The `TestBed` class is one of the principal Angular testing utilities.
Its API is quite large and can be overwhelming until you've explored it,
a little at a time. Read the early part of this guide first
to get the basics before trying to absorb the full API.

The module definition passed to `configureTestingModule`
is a subset of the `@NgModule` metadata properties.

<code-example language="javascript">
  type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array&lt;SchemaMetadata | any[]&gt;;
  };
</code-example>

{@a metadata-override-object}

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata
appropriate to the method, that is, the parameter of an `@NgModule`,
`@Component`, `@Directive`, or `@Pipe`.

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>
-->
`TestBed` 클래스는 Angular 테스트 유틸리티 중에서도 가장 중요한 클래스입니다.
이 클래스는 사용하기 편리한 API를 다양하게 제공합니다.
개별 API를 사용하기 전에 테스트 문서들에서 다루는 내용을 먼저 보면 API를 어떻게 사용하는 것이 좋을지 쉽게 이해할 수 있을 것입니다.

`configureTestingModule`에 전달하는 모듈 정의 객체는 `@NgModule` 메타데이터와 비슷합니다.

<code-example language="javascript">
  type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array&lt;SchemaMetadata | any[]&gt;;
  };
</code-example>

{@a metadata-override-object}

그리고 오버라이드 메서드가 인자로 받는 `MetadataOverride<T>` 객체에서 타입 `T`는 `@NgModule`, `@Component`, `@Directive`, `@Pipe`에 사용되는 메타데이터의 타입을 의미합니다.

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>


{@a testbed-methods}
{@a testbed-api-summary}

<!--
The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`.

Internally, all static methods cover methods of the current runtime `TestBed` instance,
which is also returned by the `getTestBed()` function.

Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

Here are the most important static methods, in order of likely utility.
-->
`TestBed`는 _전역_ `TestBed` 인스턴스를 활용하는 정적 클래스 메서드를 제공합니다.

내부적으로 이런 정적 메서드들은 현재 사용되고 있는 `TestBed` 인스턴스를 대상으로 동작하는 것이며, 이 인스턴스는 `getTestBed()` 함수로 참조할 수 있습니다.

`beforeEach()` _안에서_ `TestBed` 메서드를 실행하면 개별 테스트 스펙을 실행할 때 다른 테스트 스펙의 영향을 받지 않는 상태로 테스트 환경을 구성할 수 있습니다.

`TestBed` 메서드 중에서는 이런 메서드들을 자주 사용합니다.


<table>
  <tr>
    <th>
      <!--
      Methods
      -->
      메서드
    </th>
    <th>
      <!--
      Description
      -->
      설명
    </th>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>configureTestingModule</code>
    </td>

    <td>

      <!--
      The testing shims (`karma-test-shim`, `browser-test-shim`)
      establish the [initial test environment](guide/testing) and a default testing module.
      The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs.

      Call `configureTestingModule` to refine the testing module configuration for a particular set of tests
      by adding and removing imports, declarations (of components, directives, and pipes), and providers.
      -->
      테스트 환경 구성 파일(`karma-test-shim`, `browser-test-shim`)을 기반으로 [기본 테스트 실행환경](guide/testing)과 기본 테스트 모듈을 생성합니다.
      테스트 코드를 실행하려면 반드시 테스트 모듈을 구성해야 합니다.

      특정 구성으로 테스트 모듈을 설정할 때는 `configureTestingModule` 메서드를 사용합니다.
      이 메서드를 활용하면 원하는 컴포넌트, 디렉티브, 파이프, 서비스를 추가로 구성할 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>compileComponents</code>
    </td>

    <td>

      <!--
      Compile the testing module asynchronously after you've finished configuring it.
      You **must** call this method if _any_ of the testing module components have a `templateUrl`
      or `styleUrls` because fetching component template and style files is necessarily asynchronous.
      See [compileComponents](guide/testing-components-scenarios#compile-components).

      After calling `compileComponents`, the `TestBed` configuration is frozen for the duration of the current spec.
      -->
      비동기로 테스트 모듈을 컴파일하면서 테스트 모듈 설정을 확정합니다.
      테스트 모듈에 있는 컴포넌트 중에 `templateUrl`이나 `styleUrls`를 사용해서 외부 파일을 로드해야 하는 컴포넌트가 있다면 **반드시** 이 메서드를 실행해야 합니다.
      자세한 내용은 [`compileComponents()`](guide/testing-components-scenarios#compile-components) 문서를 참고하세요.

      `compileComponents`을 실행하고 나면 `TestBed` 설정이 확정되어 변경할 수 없습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>createComponent<T></code>
    </td>

    <td>

      <!--
      Create an instance of a component of type `T` based on the current `TestBed` configuration.
      After calling `compileComponent`, the `TestBed` configuration is frozen for the duration of the current spec.
      -->
      현재 구성된 `TestBed` 환경에서 `T` 타입 컴포넌트 인스턴스를 생성합니다.
      `compileComponents`을 실행하고 나면 `TestBed` 설정이 확정되어 변경할 수 없습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>overrideModule</code>
    </td>
    <td>

      <!--
      Replace metadata for the given `NgModule`. Recall that modules can import other modules.
      The `overrideModule` method can reach deeply into the current testing module to
      modify one of these inner modules.
      -->
      대상 `NgModule`에 지정된 메타데이터 설정을 변경합니다.
      모듈은 다른 모듈이 로드할 수 있습니다.
      `overrideModule` 메서드를 활용하면 현재 테스트 모듈에 로드된 모듈 일부를 변경할 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>overrideComponent</code>
    </td>

    <td>

      <!--
      Replace metadata for the given component class, which could be nested deeply
      within an inner module.
      -->
      테스트 모듈 메타데이터에 지정된 컴포넌트 설정을 오버라이드합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>overrideDirective</code>
    </td>

    <td>

      <!--
      Replace metadata for the given directive class, which could be nested deeply
      within an inner module.
      -->
      테스트 모듈 메타데이터에 지정된 디렉티브 설정을 오버라이드합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>overridePipe</code>
    </td>
    <td>

      <!--
      Replace metadata for the given pipe class, which could be nested deeply
      within an inner module.
      -->
      테스트 모듈 메타데이터에 지정된 파이프 설정을 오버라이드 합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      {@a testbed-inject}
      <code>inject</code>
    </td>

    <td>

      <!--
      Retrieve a service from the current `TestBed` injector.

      The `inject` function is often adequate for this purpose.
      But `inject` throws an error if it can't provide the service.

      What if the service is optional?

      The `TestBed.inject()` method takes an optional second parameter,
      the object to return if Angular can't find the provider
      (`null` in this example):

      <code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="testbed-get-w-null" header="app/demo/demo.testbed.spec.ts"></code-example>

      After calling `TestBed.inject`, the `TestBed` configuration is frozen for the duration of the current spec.
      -->
      현재 구성된 `TestBed` 인젝터에서 서비스 인스턴스를 참조합니다.

      `inject` 함수는 보통 이런 용도로 사용합니다.
      그리고 등록되지 않은 서비스를 참조하면 에러가 발생합니다.

      서비스 객체가 옵션 항목인 경우는 어떻게 될까요?

      `TestBed.inject()` 메서드는 두 번째 인자를 받을 수 있는데, 이 인자에는 Angular가 프로바이더를 찾지 못했을 때 반환할 객체를 지정합니다.

      <code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="testbed-get-w-null" header="app/demo/demo.testbed.spec.ts"></code-example>

      `TestBed.inject`를 실행하고 나면 `TestBed` 환경설정이 확정되어 변경할 수 없습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      {@a testbed-initTestEnvironment}
      <code>initTestEnvironment</code>
    </td>
    <td>

      <!--
      Initialize the testing environment for the entire test run.

      The testing shims (`karma-test-shim`, `browser-test-shim`) call it for you
      so there is rarely a reason for you to call it yourself.

      Call this method _exactly once_. To change
      this default in the middle of a test run, call `resetTestEnvironment` first.

      Specify the Angular compiler factory, a `PlatformRef`, and a default Angular testing module.
      Alternatives for non-browser platforms are available in the general form
      `@angular/platform-<platform_name>/testing/<platform_name>`.
      -->
      테스트 실행환경 전체를 초기화합니다.

      이 메서드는 테스트 환경설정 파일(`karma-test-shim`, `browser-test-shim`)이 자동으로 실행하기 때문에 이 메서드를 직접 실행할 일은 거의 없습니다.

      이 메서드를 실행해야 하는 경우는 _딱 하나_ 있습니다.
      테스트 코드를 실행하다가 테스트 환경설정을 변경하고 나면 `resetTestEnvironment` 메서드를 제일 먼저 실행해야 합니다.

      이 때 `PlatformRef`과 같은 Angular 컴파일러 팩토리를 명시해야 하며, 브라우저가 아닌 환경에서는 `@angular/platform-<플랫폼_이름>/testing/<플랫폼_이름>` 형태를 사용할 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>resetTestEnvironment</code>
    </td>
    <td>

      <!--
      Reset the initial test environment, including the default testing module.
      -->
      테스트 환경 전체를 초기화합니다. 기본 테스트 모듈도 초기화됩니다.

    </td>
  </tr>
</table>

<!--
A few of the `TestBed` instance methods are not covered by static `TestBed` _class_ methods.
These are rarely needed.
-->
이 섹션에서 다루지 않은 `TestBed` 메서드는 거의 사용되지 않습니다.


{@a component-fixture-api-summary}

## The _ComponentFixture_

<!--
The `TestBed.createComponent<T>`
creates an instance of the component `T`
and returns a strongly typed `ComponentFixture` for that component.

The `ComponentFixture` properties and methods provide access to the component,
its DOM representation, and aspects of its Angular environment.
-->
`TestBed.createComponent<T>` 메서드를 실행하면 컴포넌트 `T`의 인스턴스를 생성하면서 해당 컴포넌트의 타입에 맞게 동작하는 `ComponentFixture` 객체를 반환합니다.

`ComponentFixture`에 존재하는 프로퍼티와 메서드를 활용하면 컴포넌트 인스턴스나 DOM 트리, Angular 환경에 접근할 수 있습니다.


{@a component-fixture-properties}

<!--
### _ComponentFixture_ properties
-->
### _ComponentFixture_ 프로퍼티

<!--
Here are the most important properties for testers, in order of likely utility.
-->
테스트 코드를 작성할 때 자주 사용하는 프로퍼티는 이런 것들이 있습니다.

<table>
  <tr>
    <th>
      <!--
      Properties
      -->
      프로퍼티
    </th>
    <th>
      <!--
      Description
      -->
      설명
    </th>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>componentInstance</code>
    </td>

    <td>

      <!--
      The instance of the component class created by `TestBed.createComponent`.
      -->
      `TestBed.createComponent`로 생성한 컴포넌트 클래스의 인스턴스를 참조합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>debugElement</code>
    </td>

    <td>

      <!--
      The `DebugElement` associated with the root element of the component.

      The `debugElement` provides insight into the component and its DOM element during test and debugging.
      It's a critical property for testers. The most interesting members are covered [below](#debug-element-details).
      -->
      `DebugElement`는 컴포넌트가 위치한 최상위 엘리먼트와 관련이 있습니다.

      `debugElement`를 활용하면 테스트 코드를 작성하면서 컴포넌트 내부나 DOM 엘리먼트에 접근할 수 있습니다.
      그래서 이 프로퍼티는 테스트 코드를 작성할 때 아주 중요합니다.
      이 객체에 대해서는 [아래](#debug-element-details)에서 자세하게 알아봅시다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>nativeElement</code>
    </td>

    <td>

      <!--
      The native DOM element at the root of the component.
      -->
      컴포넌트의 최상위 DOM 엘리먼트를 참조합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>changeDetectorRef</code>
    </td>

    <td>

      <!--
      The `ChangeDetectorRef` for the component.

      The `ChangeDetectorRef` is most valuable when testing a
      component that has the `ChangeDetectionStrategy.OnPush` method
      or the component's change detection is under your programmatic control.
      -->
      컴포넌트 안에 있는 `ChangeDetectorRef`를 참조합니다.

      `ChangeDetectorRef`는 컴포넌트의 변화 감지 정책을 수동으로 관리하는 테스트 환경이나 `ChangeDetectionStrategy.OnPush` 메서드를 수동으로 실행할 때 중요합니다.

    </td>
  </tr>
</table>


{@a component-fixture-methods}

<!--
### _ComponentFixture_ methods
-->
### _ComponentFixture_ 메서드

<!--
The _fixture_ methods cause Angular to perform certain tasks on the component tree.
Call these method to trigger Angular behavior in response to simulated user action.

Here are the most useful methods for testers.
-->
_fixture_ 가 제공하는 메서드를 실행하면 Angular가 컴포넌트 트리에 영향을 미칩니다.
이 메서드들은 사용자의 동작을 시뮬레이션하는 용도로 사용합니다.

테스트 코드를 작성할 때 자주 사용하는 메서드는 이런 것들이 있습니다.

<table>
  <tr>
    <th>
      <!--
      Methods
      -->
      메서드
    </th>
    <th>
      <!--
      Description
      -->
      설명
    </th>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>detectChanges</code>
    </td>

    <td>

      <!--
      Trigger a change detection cycle for the component.

      Call it to initialize the component (it calls `ngOnInit`) and after your
      test code, change the component's data bound property values.
      Angular can't see that you've changed `personComponent.name` and won't update the `name`
      binding until you call `detectChanges`.

      Runs `checkNoChanges` afterwards to confirm that there are no circular updates unless
      called as `detectChanges(false)`;
      -->
      컴포넌트의 변화 감지 싸이클을 시작합니다.

      이 메서드는 컴포넌트를 초기화 할 때(`ngOnInit()`이 실행되는 시점) 한 번 실행하며, 테스트 코드가 실행되다가 컴포넌트에 바인딩된 데이터가 변경될때마다 실행하면 됩니다.
      필요한 시점에 이 메서드를 실행하지 않으면 `personComponent.name`이라는 프로퍼티의 `name` 프로퍼티가 변경된 것을 감지하지 않으며 바인딩된 데이터도 갱신하지 않습니다.

      더이상 변경되는 내용이 없는 것을 확인하려면 `checkNoChanges` 옵션값을 `false`로 사용해서 `detectChanges(false)`라고 실행할 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>autoDetectChanges</code>
    </td>

    <td>

      <!--
      Set this to `true` when you want the fixture to detect changes automatically.

      When autodetect is `true`, the test fixture calls `detectChanges` immediately
      after creating the component. Then it listens for pertinent zone events
      and calls `detectChanges` accordingly.
      When your test code modifies component property values directly,
      you probably still have to call `fixture.detectChanges` to trigger data binding updates.

      The default is `false`. Testers who prefer fine control over test behavior
      tend to keep it `false`.
      -->
      컴포넌트 픽스쳐의 변화 감지 싸이클을 자동으로 실행할 때 사용합니다.

      이 메서드에 `true` 인자를 전달하면 컴포넌트 인스턴스가 생성된 직후에 `detectChanges` 메서드가 자동으로 실행됩니다.
      그리고 컴포넌트에 바인딩된 프로퍼티 값이 변경될 때도 자동으로 `detectChanges`를 실행합니다.
      다만, 테스트 코드에서 컴포넌트 프로퍼티 값을 직접 수정했다면 바인딩된 데이터를 갱신하기 위해 `fixture.detectChanges`를 직접 실행해야 합니다.

      이 메서드 인자의 기본값은 `false` 입니다.
      테스트 환경을 수동으로 제어하려면 `false`로 두는 것도 좋습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>checkNoChanges</code>
    </td>

    <td>

      <!--
      Do a change detection run to make sure there are no pending changes.
      Throws an exceptions if there are.
      -->
      더이상 변경될 것이 없다는 것을 확인하는 변화 감지 싸이클을 시작합니다.
      이 변화 감지 싸이클 실행 중에 새롭게 반영되는 내용이 있으면 에러가 발생합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>isStable</code>
    </td>

    <td>

      <!--
      If the fixture is currently _stable_, returns `true`.
      If there are async tasks that have not completed, returns `false`.
      -->
      픽스쳐가 안정 상태이면 `true`를 반환합니다.
      아직 완료되지 않은 비동기 태스크가 있다면 `false`를 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>whenStable</code>
    </td>

    <td>

      <!--
      Returns a promise that resolves when the fixture is stable.

      To resume testing after completion of asynchronous activity or
      asynchronous change detection, hook that promise.
      See [whenStable](guide/testing-components-scenarios#when-stable).
      -->
      픽스쳐가 안정상태가 될 때 완료되는 프라미스를 반환합니다.

      이 메서드는 비동기 작업이나 비동기 변화 감지를 기다렸다가 다음 코드를 실행할 때 사용합니다.
      자세한 내용은 [`whenStable`](guide/testing-components-scenarios#when-stable) 섹션을 참고하세요.
    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>destroy</code>
    </td>

    <td>

      <!--
      Trigger component destruction.
      -->
      컴포넌트를 종료합니다.

    </td>
  </tr>
</table>


{@a debug-element-details}

#### _DebugElement_

<!--
The `DebugElement` provides crucial insights into the component's DOM representation.

From the test root component's `DebugElement` returned by `fixture.debugElement`,
you can walk (and query) the fixture's entire element and component subtrees.

Here are the most useful `DebugElement` members for testers, in approximate order of utility:
-->
`DebugElement`를 활용하면 컴포넌트의 DOM에 직접 접근할 수 있습니다.

`fixture.debugElement`라고 사용하면 테스트 환경에 있는 최상위 컴포넌트의 `DebugElement`를 참조할 수 있으며, 이 객체 안에 존재하는 엘리먼트나 하위 컴포넌트를 자유롭게 탐색할 수 있습니다.

`DebugElement`의 멤버 중에 테스트 코드에 자주 사용하는 것은 이런 것들이 있습니다.

<table>
  <tr>
    <th>
      <!--
      Member
      -->
      멤버
    </th>
    <th>
      <!--
      Description
      -->
      설명
    </th>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>nativeElement</code>
    </td>

    <td>

      <!--
      The corresponding DOM element in the browser (null for WebWorkers).
      -->
      브라우저에 존재하는 DOM 엘리먼트를 참조합니다.
      (WebWorker 실행 환경에서는 `null`입니다.)

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>query</code>
    </td>

    <td>

      <!--
      Calling `query(predicate: Predicate<DebugElement>)` returns the first `DebugElement`
      that matches the [predicate](#query-predicate) at any depth in the subtree.
      -->
      `query(predicate: Predicate<DebugElement>)`라고 사용하면 DOM 트리에서 [쿼리 식](#query-predicate)과 매칭되는 첫 번째 `DebugElement`를 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>queryAll</code>
    </td>

    <td>

      <!--
      Calling `queryAll(predicate: Predicate<DebugElement>)` returns all `DebugElements`
      that matches the [predicate](#query-predicate) at any depth in subtree.
      -->
      `queryAll(predicate: Predicate<DebugElement>)`라고 사용하면 DOM 트리 안에서 [쿼리 식](#query-predicate)과 매칭되는 모든 `DebugElement`를 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>injector</code>
    </td>

    <td>

      <!--
      The host dependency injector.
      For example, the root element's component instance injector.
      -->
      호스트 인젝터를 참조합니다.
      테스트 코드에서 사용하면 최상위 엘리먼트 역할을 하는 컴포넌트 인스턴스의 인젝터를 참조합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>componentInstance</code>
    </td>

    <td>

      <!--
      The element's own component instance, if it has one.
      -->
      컴포넌트 인스턴스가 존재하면 인스턴스를 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>context</code>
    </td>

    <td>

      <!--
      An object that provides parent context for this element.
      Often an ancestor component instance that governs this element.

      When an element is repeated within `*ngFor`, the context is an `NgForOf` whose `$implicit`
      property is the value of the row instance value.
      For example, the `hero` in `*ngFor="let hero of heroes"`.
      -->
      현재 엘리먼트의 부모 컨텍스트를 반환합니다.
      엘리먼트의 부모 컴포넌트를 찾아야 할 때 사용합니다.

      엘리먼트가 `*ngFor`로 반복되고 있다면 `context`는 `NgForOf` 컨텍스트를 반환하며, 이 컨텍스트에서 `$implicit` 프로퍼티를 참조하면 해당 반복문이 순회하는 객체를 확인할 수 있습니다.
      `*ngFor="let hero of heroes"`라고 사용하고 있다면 `hero` 객체를 확인할 수 있습니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>children</code>
    </td>

    <td>

      <!--
      The immediate `DebugElement` children. Walk the tree by descending through `children`.

      <div class="alert is-helpful">

      `DebugElement` also has `childNodes`, a list of `DebugNode` objects.
      `DebugElement` derives from `DebugNode` objects and there are often
      more nodes than elements. Testers can usually ignore plain nodes.

      </div>
      -->
      `DebugElement`의 자식 객체를 참조합니다.
      `children` 프로퍼티를 활용하면 DOM 트리의 자식 객체를 참조할 수 있습니다.

      <div class="alert is-helpful">

      `DebugElement`에도 `DebugNode` 타입을 리스트로 관리하는 `childNodes` 프로퍼티가 존재합니다.
      ``DebugElement` 객체도 `DebugNode` 객체를 기반으로 구성되는 것이며, 상황에 따라 엘리먼트 개수보다 더 많은 노드가 존재할 수도 잇습니다.
      엘리먼트가 아닌 노드는 무시해도 됩니다.

      </div>
    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>parent</code>
    </td>
    <td>

      <!--
      The `DebugElement` parent. Null if this is the root element.
      -->
      부모 `DebugElement`를 참조합니다. 최상위 엘리먼트에서 참조하면 `null`을 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>name</code>
    </td>

    <td>

      <!--
      The element tag name, if it is an element.
      -->
      일반 엘리먼트라면 엘리먼트 태그 이름을 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>triggerEventHandler</code>
    </td>
    <td>

      <!--
      Triggers the event by its name if there is a corresponding listener
      in the element's `listeners` collection.
      The second parameter is the _event object_ expected by the handler.
      See [triggerEventHandler](guide/testing-components-scenarios#trigger-event-handler).

      If the event lacks a listener or there's some other problem,
      consider calling `nativeElement.dispatchEvent(eventObject)`.
      -->
      엘리먼트의 `listeners` 콜렉션에 존재하는 이벤트를 발생시킵니다.
      이 메서드의 두 번째 인자에는 핸들러가 처리할 _이벤트 객체_ 를 전달할 수 있습니다.
      자세한 내용은 [`triggerEventHandler`](guide/testing-components-scenarios#trigger-event-handler) 섹션을 참고하세요.

      해당 이름으로 등록된 이벤트 리스너가 없거나 이 메서드 실행에 문제가 있다면 `nativeElement.dispatchEvent(eventObject)`를 대신 사용하세요.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>listeners</code>
    </td>

    <td>

      <!--
      The callbacks attached to the component's `@Output` properties and/or the element's event properties.
      -->
      컴포넌트의 `@Output` 프로퍼티와 엘리먼트 이벤트 프로퍼티에 등록된 콜백 함수들을 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>providerTokens</code>
    </td>

    <td>

      <!--
      This component's injector lookup tokens.
      Includes the component itself plus the tokens that the component lists in its `providers` metadata.
      -->
      해당 컴포넌트 인젝터에 사용된 의존성 주입 토큰을 참조합니다.
      컴포넌트 토큰과 이 컴포넌트의 `providers` 메타데이터에 등록된 토큰이 모두 포함됩니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>source</code>
    </td>

    <td>

      <!--
      Where to find this element in the source component template.
      -->
      소스 컴포넌트 템플릿에서 엘리먼트가 위치하는 곳을 반환합니다.

    </td>
  </tr>

  <tr>
    <td style="vertical-align: top">
      <code>references</code>
    </td>

    <td>

      <!--
      Dictionary of objects associated with template local variables (e.g. `#foo`),
      keyed by the local variable name.
      -->
      템플릿에 선언된 템플릿 지역 변수(ex. `#foo`)를 모아서 객체 형태로 반환합니다.
      지역 변수가 이 객체의 키로 구성됩니다.

    </td>
  </tr>
</table>

{@a query-predicate}

<!--
The `DebugElement.query(predicate)` and `DebugElement.queryAll(predicate)` methods take a
predicate that filters the source element's subtree for matching `DebugElement`.

The predicate is any method that takes a `DebugElement` and returns a _truthy_ value.
The following example finds all `DebugElements` with a reference to a template local variable named "content":

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="custom-predicate" header="app/demo/demo.testbed.spec.ts"></code-example>

The Angular `By` class has three static methods for common predicates:

- `By.all` - return all elements.
- `By.css(selector)` - return elements with matching CSS selectors.
- `By.directive(directive)` - return elements that Angular matched to an instance of the directive class.

<code-example path="testing/src/app/hero/hero-list.component.spec.ts" region="by" header="app/hero/hero-list.component.spec.ts"></code-example>
-->
`DebugElement.query(predicate)` 메서드와 `DebugElement.queryAll(predicate)` 메서드는 소스 엘리먼트에서 원하는 `DebugElement`를 찾기 위해 매처(predicate)를 인자로 전달합니다.

이 때 매처는 `DebugElement`를 인자로 받아서 _참으로 평가되는_ 값을 반환하는 함수면 어떤것이든 사용할 수 있습니다.
그래서 아래 코드처럼 템플릿 지역 변수 `content`를 참조하고 있는 `DebugElements`를 모두 찾는 것도 가능합니다:

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="custom-predicate" header="app/demo/demo.testbed.spec.ts"></code-example>

Angular가 제공하는 `By` 클래스는 정적 메서드를 3종류로 제공합니다:

- `By.all` - 모든 엘리먼트를 반환합니다.
- `By.css(selector)` - CSS 셀렉터와 매칭되는 엘리먼트를 모두 반환합니다.
- `By.directive(directive)` - 특정 디렉티브가 적용된 엘리먼트를 모두 반환합니다.

<code-example path="testing/src/app/hero/hero-list.component.spec.ts" region="by" header="app/hero/hero-list.component.spec.ts"></code-example>


<hr>

