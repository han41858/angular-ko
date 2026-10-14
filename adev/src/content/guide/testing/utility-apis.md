<!--
# Testing Utility APIs
-->

<a id="testing-utility-apis"></a>

# 테스트 유틸리티 API

<!--
NOTE: While this guide is being updated for Vitest, some descriptions and examples of utility APIs are currently presented within the context of Karma/Jasmine. We are actively working to provide Vitest equivalents and updated guidance where applicable.

This page describes the most useful Angular testing features.

The Angular testing utilities include the `TestBed`, the `ComponentFixture`, and a handful of functions that control the test environment.
The [`TestBed`](#testbed-class-summary) and [`ComponentFixture`](#the-componentfixture) classes are covered separately.

Here's a summary of the stand-alone functions, in order of likely utility:

| Function     | Details                                                                                                                                                                                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`inject`]   | Injects one or more services from the current `TestBed` injector into a test function. It cannot inject a service provided by the component itself. See discussion of the [debugElement.injector](guide/testing/components-scenarios#get-injected-services). |
| `getTestBed` | Gets the current instance of the `TestBed`. Usually unnecessary because the static class methods of the `TestBed` class are typically sufficient. The `TestBed` instance exposes a few rarely used members that are not available as static methods.         |

For handling complex asynchronous scenarios or testing legacy Zone.js-based applications, see the [Zone.js Testing Utilities](guide/testing/zone-js-testing-utilities) guide.
-->

참고: 이 문서는 Vitest에 맞게 수정하고 있습니다.
일부 유틸리티 API 설명과 예제는 아직 Karma/Jasmine 환경을 기준으로 합니다.
해당하는 부분에 Vitest 예제와 최신 안내를 제공하기 위해 작업 중입니다.

이 문서에서는 유용한 Angular 테스트 기능을 알아봅니다.

Angular 테스트 유틸리티에는 `TestBed`, `ComponentFixture`, 테스트 환경을 제어하는 몇 가지 함수가 있습니다.
[`TestBed`](#testbed-class-summary)와 [`ComponentFixture`](#the-componentfixture) 클래스는 각각 별도로 설명합니다.

독립적으로 사용하는 함수를 활용도가 높은 순서로 정리하면 다음과 같습니다.

| 함수         | 설명                                                                                                                                                                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`inject`]   | 현재 `TestBed` 인젝터에서 하나 이상의 서비스를 테스트 함수에 주입합니다. 컴포넌트 자체에서 제공하는 서비스는 주입할 수 없습니다. [debugElement.injector](guide/testing/components-scenarios#get-injected-services) 설명을 참고하세요. |
| `getTestBed` | 현재 `TestBed` 인스턴스를 가져옵니다. 대부분은 `TestBed` 클래스의 정적 메서드만으로 충분하므로 필요하지 않습니다. `TestBed` 인스턴스에는 정적 메서드로 제공하지 않는 몇 가지 멤버가 있지만 드물게 사용합니다.                         |

복잡한 비동기 시나리오를 처리하거나 기존 Zone.js 기반 애플리케이션을 테스트하려면 [Zone.js 테스트 유틸리티](guide/testing/zone-js-testing-utilities) 문서를 참고하세요.

<!--
## `TestBed` class summary
-->

<a id="testbed-class-summary"></a>

## `TestBed` 클래스 요약

<!--
The `TestBed` class is one of the principal Angular testing utilities.
Its API is quite large and can be overwhelming until you've explored it, a little at a time.
Read the early part of this guide first to get the basics before trying to absorb the full API.

The module definition passed to `configureTestingModule` is a subset of the `@NgModule` metadata properties.

```ts
type TestModuleMetadata = {
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: Array<SchemaMetadata | any[]>;
};
```

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata appropriate to the method, that is, the parameter of an `@NgModule`, `@Component`, `@Directive`, or `@Pipe`.

```ts
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`.

Internally, all static methods cover methods of the current runtime `TestBed` instance, which is also returned by the `getTestBed()` function.

Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

Here are the most important static methods, in order of likely utility.

| Methods                  | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configureTestingModule` | The testing shims establish the [initial test environment](guide/testing) and a default testing module. The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs. <br /> Call `configureTestingModule` to refine the testing module configuration for a particular set of tests by adding and removing imports, declarations \(of components, directives, and pipes\), and providers.                                                                                               |
| `compileComponents`      | Compile the testing module asynchronously after you've finished configuring it. You **must** call this method if _any_ of the testing module components have asynchronously loaded resources (like @defer blocks). <br /> After calling `compileComponents`, the `TestBed` configuration is frozen for the duration of the current spec.                                                                                                                                                                                                                 |
| `createComponent<T>`     | Create an instance of a component of type `T` based on the current `TestBed` configuration. After calling `createComponent`, the `TestBed` configuration is frozen for the duration of the current spec.                                                                                                                                                                                                                                                                                                                                                 |
| `overrideComponent`      | Replace metadata for the given component class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `overrideDirective`      | Replace metadata for the given directive class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `overridePipe`           | Replace metadata for the given pipe class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `overrideModule`         | Replace metadata for the given `NgModule`. Recall that modules can import other modules. The `overrideModule` method can reach deeply into the current testing module to modify one of these inner modules.                                                                                                                                                                                                                                                                                                                                              |
| `inject`                 | Retrieve a service from the current `TestBed` injector. The `inject` function is often adequate for this purpose. But `inject` throws an error if it can't provide the service. <br /> What if the service is optional? <br /> The `TestBed.inject()` method takes an optional second parameter, the object to return if Angular can't find the provider \(`null` in this example\): `expect(TestBed.inject(NotProvided, null)).toBeNull();` After calling `TestBed.inject`, the `TestBed` configuration is frozen for the duration of the current spec. |
| `initTestEnvironment`    | Initialize the testing environment for the entire test run. <br /> The testing shims call it for you so there is rarely a reason for you to call it yourself. <br /> Call this method _exactly once_. To change this default in the middle of a test run, call `resetTestEnvironment` first. <br /> Specify a default Angular testing module and a `PlatformRef`. Alternatives for non-browser platforms are available in the general form `@angular/platform-<platform_name>/testing`.                                                                  |
| `resetTestEnvironment`   | Reset the initial test environment, including the default testing module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

A few of the `TestBed` instance methods are not covered by static `TestBed` _class_ methods.
These are rarely needed.
-->

`TestBed`는 Angular의 주요 테스트 유틸리티 중 하나입니다.
API가 다양해서 조금씩 살펴보기 전에는 어렵게 느껴질 수 있습니다.
전체 API를 익히기 전에 이 가이드 앞부분에서 기초부터 알아보세요.

`configureTestingModule`에 전달하는 모듈 정의는 `@NgModule` 메타데이터 프로퍼티의 일부로 구성됩니다.

```ts
type TestModuleMetadata = {
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: Array<SchemaMetadata | any[]>;
};
```

각 재정의 메서드는 `MetadataOverride<T>`를 받습니다.
여기서 `T`는 해당 메서드에 맞는 메타데이터 타입으로, `@NgModule`, `@Component`, `@Directive`, `@Pipe`의 인자 타입입니다.

```ts
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

`TestBed` API는 _전역_ `TestBed` 인스턴스를 수정하거나 참조하는 정적 클래스 메서드로 구성됩니다.

내부적으로 모든 정적 메서드는 현재 실행 중인 `TestBed` 인스턴스의 메서드를 호출합니다.
이 인스턴스는 `getTestBed()` 함수로도 가져올 수 있습니다.

각 테스트가 새로운 상태에서 시작하도록 `beforeEach()` _안에서_ `TestBed` 메서드를 실행하세요.

중요한 정적 메서드를 활용도가 높은 순서로 정리하면 다음과 같습니다.

| 메서드                   | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configureTestingModule` | 테스트 지원 코드가 [초기 테스트 환경](guide/testing)과 기본 테스트 모듈을 구성합니다. 기본 테스트 모듈에는 테스트에 필요한 기본 선언과 일부 Angular 서비스의 대체 구현이 설정됩니다. <br /> 특정 테스트 모음에 맞게 imports, 컴포넌트·디렉티브·파이프의 declarations, providers를 추가하거나 제거하려면 `configureTestingModule`을 실행하세요.                                                                                                                                         |
| `compileComponents`      | 설정을 마친 테스트 모듈을 비동기로 컴파일합니다. 테스트 모듈의 컴포넌트 중 _하나라도_ 비동기로 로드하는 리소스(예: @defer 블록)가 있으면 **반드시** 실행해야 합니다. <br /> `compileComponents`를 실행하면 현재 테스트가 끝날 때까지 `TestBed` 설정이 고정됩니다.                                                                                                                                                                                                                      |
| `createComponent<T>`     | 현재 `TestBed` 설정으로 `T` 타입의 컴포넌트 인스턴스를 생성합니다. `createComponent`를 실행하면 현재 테스트가 끝날 때까지 `TestBed` 설정이 고정됩니다.                                                                                                                                                                                                                                                                                                                                 |
| `overrideComponent`      | 지정한 컴포넌트 클래스의 메타데이터를 교체합니다. 내부 모듈에 깊게 중첩된 컴포넌트도 교체할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                               |
| `overrideDirective`      | 지정한 디렉티브 클래스의 메타데이터를 교체합니다. 내부 모듈에 깊게 중첩된 디렉티브도 교체할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                               |
| `overridePipe`           | 지정한 파이프 클래스의 메타데이터를 교체합니다. 내부 모듈에 깊게 중첩된 파이프도 교체할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                   |
| `overrideModule`         | 지정한 `NgModule`의 메타데이터를 교체합니다. 모듈은 다른 모듈을 로드할 수 있으므로, `overrideModule`로 현재 테스트 모듈 안에 깊게 중첩된 내부 모듈도 수정할 수 있습니다.                                                                                                                                                                                                                                                                                                               |
| `inject`                 | 현재 `TestBed` 인젝터에서 서비스를 가져옵니다. 보통은 `inject` 함수로 충분하지만, 서비스를 제공할 수 없으면 에러가 발생합니다. <br /> 선택적인 서비스라면 어떻게 할까요? <br /> `TestBed.inject()`의 두 번째 인자에 Angular가 프로바이더를 찾지 못했을 때 반환할 객체를 선택적으로 지정할 수 있습니다. 다음 예제에서는 `null`을 반환합니다. `expect(TestBed.inject(NotProvided, null)).toBeNull();` `TestBed.inject`를 실행하면 현재 테스트가 끝날 때까지 `TestBed` 설정이 고정됩니다. |
| `initTestEnvironment`    | 전체 테스트 실행에 사용할 테스트 환경을 초기화합니다. <br /> 테스트 지원 코드가 대신 실행하므로 직접 실행할 일은 거의 없습니다. <br /> 이 메서드는 _정확히 한 번만_ 실행하세요. 테스트 실행 도중 이 기본 설정을 변경하려면 먼저 `resetTestEnvironment`를 실행하세요. <br /> 기본 Angular 테스트 모듈과 `PlatformRef`를 지정합니다. 브라우저가 아닌 플랫폼용 구현은 일반적으로 `@angular/platform-<platform_name>/testing` 형태로 제공됩니다.                                           |
| `resetTestEnvironment`   | 기본 테스트 모듈을 포함해서 초기 테스트 환경을 재설정합니다.                                                                                                                                                                                                                                                                                                                                                                                                                           |

일부 `TestBed` 인스턴스 메서드는 `TestBed` _클래스_ 의 정적 메서드로 제공하지 않습니다.
이런 메서드는 거의 사용할 일이 없습니다.

<!--
## The `ComponentFixture`
-->

<a id="the-componentfixture"></a>

## `ComponentFixture`

<!--
The `TestBed.createComponent<T>` creates an instance of the component `T` and returns a strongly typed `ComponentFixture` for that component.

The `ComponentFixture` properties and methods provide access to the component, its DOM representation, and aspects of its Angular environment.
-->

`TestBed.createComponent<T>`는 `T` 컴포넌트의 인스턴스를 생성하고 해당 컴포넌트에 맞는 타입이 지정된 `ComponentFixture`를 반환합니다.

`ComponentFixture`의 프로퍼티와 메서드로 컴포넌트, 컴포넌트를 나타내는 DOM, 관련 Angular 환경에 접근할 수 있습니다.

<!--
### `ComponentFixture` properties
-->

<a id="componentfixture-properties"></a>

### `ComponentFixture` 프로퍼티

<!--
Here are the most important properties for testers, in order of likely utility.

| Properties          | Details                                                                                                                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentInstance` | The instance of the component class created by `TestBed.createComponent`.                                                                                                                                                                                                                 |
| `debugElement`      | The `DebugElement` associated with the root element of the component. <br /> The `debugElement` provides insight into the component and its DOM element during test and debugging. It's a critical property for testers. The most interesting members are covered [below](#debugelement). |
| `nativeElement`     | The native DOM element at the root of the component.                                                                                                                                                                                                                                      |
| `changeDetectorRef` | The `ChangeDetectorRef` for the component. <br /> The `ChangeDetectorRef` is most valuable when testing a component that has the `ChangeDetectionStrategy.OnPush` method or the component's change detection is under your programmatic control.                                          |
-->

테스트에 중요한 프로퍼티를 활용도가 높은 순서로 정리하면 다음과 같습니다.

| 프로퍼티            | 설명                                                                                                                                                                                                                                                |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentInstance` | `TestBed.createComponent`가 생성한 컴포넌트 클래스의 인스턴스입니다.                                                                                                                                                                                |
| `debugElement`      | 컴포넌트의 최상위 엘리먼트에 대응하는 `DebugElement`입니다. <br /> `debugElement`로 테스트와 디버깅 중에 컴포넌트와 DOM 엘리먼트를 자세히 확인할 수 있습니다. 테스트에서 핵심적인 프로퍼티입니다. 주요 멤버는 [아래](#debugelement)에서 알아봅니다. |
| `nativeElement`     | 컴포넌트의 최상위 네이티브 DOM 엘리먼트입니다.                                                                                                                                                                                                      |
| `changeDetectorRef` | 컴포넌트의 `ChangeDetectorRef`입니다. <br /> `ChangeDetectionStrategy.OnPush`를 사용하거나 코드에서 변화 감지를 직접 제어하는 컴포넌트를 테스트할 때 특히 유용합니다.                                                                               |

<!--
### `ComponentFixture` methods
-->

<a id="componentfixture-methods"></a>

### `ComponentFixture` 메서드

<!--
The _fixture_ methods cause Angular to perform certain tasks on the component tree.
Call these methods to trigger Angular behavior in response to simulated user action.

Here are the most useful methods for testers.

| Methods             | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `detectChanges`     | Trigger a change detection cycle for the component. <br /> Call it to initialize the component \(it calls `ngOnInit`\) and after your test code, change the component's data bound property values. Angular can't see that you've changed `personComponent.name` and won't update the `name` binding until you call `detectChanges`. <br /> Runs `checkNoChanges` afterwards to confirm that there are no circular updates unless called as `detectChanges(false)`;                                                                                                           |
| `autoDetectChanges` | Set this to `true` when you want the fixture to detect changes automatically. <br /> When autodetect is `true`, the test fixture calls `detectChanges` immediately after creating the component. Then it listens for pertinent zone events and calls `detectChanges` accordingly. When your test code modifies component property values directly, you probably still have to call `fixture.detectChanges` to trigger data binding updates. <br /> The default is `true` with zoneless change detection (the `TestBed` default) and `false` with Zone-based change detection. |
| `checkNoChanges`    | Do a change detection run to make sure there are no pending changes. Throws an exceptions if there are.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `isStable`          | If the fixture is currently _stable_, returns `true`. If there are async tasks that have not completed, returns `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `whenStable`        | Returns a promise that resolves when the fixture is stable. <br /> To resume testing after completion of asynchronous activity or asynchronous change detection, hook that promise. See [whenStable](guide/testing/components-scenarios#whenstable).                                                                                                                                                                                                                                                                                                                          |
| `destroy`           | Trigger component destruction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
-->

_픽스처_ 메서드는 Angular가 컴포넌트 트리에 특정 작업을 실행하게 합니다.
사용자 동작을 재현한 뒤 이에 반응하는 Angular 동작을 실행하려면 이 메서드들을 사용하세요.

테스트에 유용한 메서드는 다음과 같습니다.

| 메서드              | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `detectChanges`     | 컴포넌트의 변화 감지 싸이클을 실행합니다. <br /> 컴포넌트를 초기화할 때 실행하면 `ngOnInit`도 실행됩니다. 테스트 코드에서 컴포넌트의 데이터 바인딩된 프로퍼티 값을 변경한 후에도 실행하세요. Angular는 `personComponent.name`을 직접 변경한 것을 알 수 없으므로, `detectChanges`를 실행하기 전에는 `name` 바인딩을 갱신하지 않습니다. <br /> `detectChanges(false)`로 실행하지 않았다면 이후 `checkNoChanges`를 실행해서 순환적인 갱신이 없는지 확인합니다.                             |
| `autoDetectChanges` | 픽스처가 자동으로 변화를 감지하게 하려면 `true`로 설정하세요. <br /> 자동 감지가 `true`이면 테스트 픽스처는 컴포넌트를 생성한 직후 `detectChanges`를 실행합니다. 이후 관련 존 이벤트를 감지해서 `detectChanges`를 실행합니다. 테스트 코드에서 컴포넌트 프로퍼티를 직접 수정했다면 데이터 바인딩을 갱신하기 위해 여전히 `fixture.detectChanges`를 실행해야 할 수 있습니다. <br /> 기본값은 Zoneless 변경 감지(`TestBed`의 기본값)에서는 `true`, Zone 기반 변경 감지에서는 `false`입니다. |
| `checkNoChanges`    | 변화 감지를 실행해서 처리할 변경사항이 남아 있지 않은지 확인합니다. 남아 있다면 예외를 발생시킵니다.                                                                                                                                                                                                                                                                                                                                                                                    |
| `isStable`          | 픽스처가 현재 _안정화_ 되어 있으면 `true`, 완료되지 않은 비동기 작업이 있으면 `false`를 반환합니다.                                                                                                                                                                                                                                                                                                                                                                                     |
| `whenStable`        | 픽스처가 안정화되면 이행되는 Promise를 반환합니다. <br /> 비동기 작업이나 비동기 변화 감지가 끝난 뒤 테스트를 이어가려면 이 Promise를 사용하세요. [whenStable](guide/testing/components-scenarios#whenstable)을 참고하세요.                                                                                                                                                                                                                                                             |
| `destroy`           | 컴포넌트를 종료합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<!--
#### `DebugElement`
-->


#### `DebugElement`

<!--
The `DebugElement` provides crucial insights into the component's DOM representation.

From the test root component's `DebugElement` returned by `fixture.debugElement`, you can walk \(and query\) the fixture's entire element and component subtrees.

Here are the most useful `DebugElement` members for testers, in approximate order of utility:

| Members               | Details                                                                                                                                                                                                                                                                                                                                         |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nativeElement`       | The corresponding DOM element in the browser                                                                                                                                                                                                                                                                                                    |
| `query`               | Calling `query(predicate: Predicate<DebugElement>)` returns the first `DebugElement` that matches the predicate at any depth in the subtree.                                                                                                                                                                                                    |
| `queryAll`            | Calling `queryAll(predicate: Predicate<DebugElement>)` returns all `DebugElements` that matches the predicate at any depth in subtree.                                                                                                                                                                                                          |
| `injector`            | The host dependency injector. For example, the root element's component instance injector.                                                                                                                                                                                                                                                      |
| `componentInstance`   | The element's own component instance, if it has one.                                                                                                                                                                                                                                                                                            |
| `context`             | An object that provides parent context for this element. Often an ancestor component instance that governs this element. <br /> When an element is repeated within `@for` block, the context is an `RepeaterContext` whose `$implicit` property is the value of the row instance value. For example, the `hero` in `@for(hero of heroes; ...)`. |
| `children`            | The immediate `DebugElement` children. Walk the tree by descending through `children`. `DebugElement` also has `childNodes`, a list of `DebugNode` objects. `DebugElement` derives from `DebugNode` objects and there are often more nodes than elements. Testers can usually ignore plain nodes.                                               |
| `parent`              | The `DebugElement` parent. Null if this is the root element.                                                                                                                                                                                                                                                                                    |
| `name`                | The element tag name, if it is an element.                                                                                                                                                                                                                                                                                                      |
| `triggerEventHandler` | Triggers the event by its name if there is a corresponding listener in the element's `listeners` collection. The second parameter is the _event object_ expected by the handler. <br /> If the event lacks a listener or there's some other problem, consider calling `nativeElement.dispatchEvent(eventObject)`.                               |
| `listeners`           | The callbacks attached to the component's `@Output` properties and/or the element's event properties.                                                                                                                                                                                                                                           |
| `providerTokens`      | This component's injector lookup tokens. Includes the component itself plus the tokens that the component lists in its `providers` metadata.                                                                                                                                                                                                    |
| `source`              | Where to find this element in the source component template.                                                                                                                                                                                                                                                                                    |
| `references`          | Dictionary of objects associated with template local variables \(for example, `#foo`\), keyed by the local variable name.                                                                                                                                                                                                                       |

The `DebugElement.query(predicate)` and `DebugElement.queryAll(predicate)` methods take a predicate that filters the source element's subtree for matching `DebugElement`.

The predicate is any method that takes a `DebugElement` and returns a _truthy_ value.
The following example finds all `DebugElements` with a reference to a template local variable named "content":

```ts
// Filter for DebugElements with a #content reference
const contentRefs = el.queryAll((de) => de.references['content']);
```

The Angular `By` class has three static methods for common predicates:

| Static method             | Details                                                                    |
| :------------------------ | :------------------------------------------------------------------------- |
| `By.all`                  | Return all elements                                                        |
| `By.css(selector)`        | Return elements with matching CSS selectors                                |
| `By.directive(directive)` | Return elements that Angular matched to an instance of the directive class |

```ts
// Can find DebugElement either by css selector or by directive
const h2 = fixture.debugElement.query(By.css('h2'));
const directive = fixture.debugElement.query(By.directive(Highlight));
```
-->

`DebugElement`로 컴포넌트를 나타내는 DOM의 주요 정보를 확인할 수 있습니다.

`fixture.debugElement`가 반환하는 테스트 최상위 컴포넌트의 `DebugElement`에서 픽스처의 전체 엘리먼트 및 컴포넌트 하위 트리를 순회하거나 조회할 수 있습니다.

테스트에 유용한 `DebugElement` 멤버를 활용도가 높은 순서로 정리하면 다음과 같습니다.

| 멤버                  | 설명                                                                                                                                                                                                                                                                                                         |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nativeElement`       | 브라우저에서 대응하는 DOM 엘리먼트입니다.                                                                                                                                                                                                                                                                    |
| `query`               | `query(predicate: Predicate<DebugElement>)`를 실행하면 하위 트리의 깊이에 관계없이 조건식과 일치하는 첫 번째 `DebugElement`를 반환합니다.                                                                                                                                                                    |
| `queryAll`            | `queryAll(predicate: Predicate<DebugElement>)`를 실행하면 하위 트리의 깊이에 관계없이 조건식과 일치하는 모든 `DebugElement`를 반환합니다.                                                                                                                                                                    |
| `injector`            | 호스트 의존성 인젝터입니다. 예를 들어 최상위 엘리먼트에 있는 컴포넌트 인스턴스의 인젝터입니다.                                                                                                                                                                                                               |
| `componentInstance`   | 엘리먼트 자체의 컴포넌트 인스턴스가 있다면 해당 인스턴스입니다.                                                                                                                                                                                                                                              |
| `context`             | 엘리먼트의 부모 컨텍스트를 제공하는 객체입니다. 보통 이 엘리먼트를 관리하는 상위 컴포넌트 인스턴스입니다. <br /> `@for` 블록에서 엘리먼트를 반복하면 컨텍스트는 `RepeaterContext`가 됩니다. `$implicit` 프로퍼티는 해당 행의 인스턴스 값을 나타내며, `@for(hero of heroes; ...)`의 `hero`가 이에 해당합니다. |
| `children`            | 바로 아래에 있는 `DebugElement` 자식입니다. `children`을 따라 내려가며 트리를 순회할 수 있습니다. `DebugElement`에는 `DebugNode` 객체 목록인 `childNodes`도 있습니다. `DebugElement`는 `DebugNode`를 상속하며, 대체로 노드 수가 엘리먼트 수보다 많습니다. 테스트에서는 보통 일반 노드를 무시해도 됩니다.     |
| `parent`              | 부모 `DebugElement`입니다. 최상위 엘리먼트이면 null입니다.                                                                                                                                                                                                                                                   |
| `name`                | 엘리먼트라면 해당 엘리먼트의 태그 이름입니다.                                                                                                                                                                                                                                                                |
| `triggerEventHandler` | 엘리먼트의 `listeners` 모음에 대응하는 리스너가 있으면 이름으로 이벤트를 발생시킵니다. 두 번째 인자는 핸들러가 기대하는 _이벤트 객체_ 입니다. <br /> 이벤트에 리스너가 없거나 다른 문제가 있다면 `nativeElement.dispatchEvent(eventObject)` 실행을 고려하세요.                                               |
| `listeners`           | 컴포넌트의 `@Output` 프로퍼티나 엘리먼트의 이벤트 프로퍼티에 연결된 콜백입니다.                                                                                                                                                                                                                              |
| `providerTokens`      | 컴포넌트 인젝터의 조회 토큰입니다. 컴포넌트 자체와 컴포넌트의 `providers` 메타데이터에 나열한 토큰을 포함합니다.                                                                                                                                                                                             |
| `source`              | 컴포넌트 소스 템플릿에서 이 엘리먼트가 있는 위치입니다.                                                                                                                                                                                                                                                      |
| `references`          | 템플릿 지역 변수(예: `#foo`)에 연결된 객체를 지역 변수 이름을 키로 저장한 사전입니다.                                                                                                                                                                                                                        |

`DebugElement.query(predicate)`와 `DebugElement.queryAll(predicate)` 메서드는 시작 엘리먼트의 하위 트리에서 일치하는 `DebugElement`를 필터링하는 조건식을 받습니다.

조건식은 `DebugElement`를 받고 _참으로 평가되는_ 값을 반환하는 메서드이면 됩니다.
다음 예제는 "content"라는 템플릿 지역 변수 참조가 있는 모든 `DebugElement`를 찾습니다.

```ts
// #content 참조가 있는 DebugElement를 필터링합니다
const contentRefs = el.queryAll((de) => de.references['content']);
```

Angular `By` 클래스는 자주 사용하는 조건식을 위한 정적 메서드 세 개를 제공합니다.

| 정적 메서드               | 설명                                                                      |
| :------------------------ | :------------------------------------------------------------------------ |
| `By.all`                  | 모든 엘리먼트를 반환합니다.                                               |
| `By.css(selector)`        | CSS 셀렉터와 일치하는 엘리먼트를 반환합니다.                              |
| `By.directive(directive)` | Angular가 해당 디렉티브 클래스의 인스턴스와 연결한 엘리먼트를 반환합니다. |

```ts
// CSS 셀렉터나 디렉티브로 DebugElement를 찾을 수 있습니다
const h2 = fixture.debugElement.query(By.css('h2'));
const directive = fixture.debugElement.query(By.directive(Highlight));
```
