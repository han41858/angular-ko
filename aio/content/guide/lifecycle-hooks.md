<!--
# Component Lifecycle
-->
# 컴포넌트 라이프싸이클

<!--
A component instance has a lifecycle that starts when Angular instantiates the component class and renders the component view along with its child views.
The lifecycle continues with change detection, as Angular checks to see when data-bound properties change, and updates both the view and the component instance as needed.
The lifecycle ends when Angular destroys the component instance and removes its rendered template from the DOM.
Directives have a similar lifecycle, as Angular creates, updates, and destroys instances in the course of execution.

Your application can use [lifecycle hook methods](guide/glossary#lifecycle-hook "Definition of lifecycle hook") to tap into key events in the lifecycle of a component or directive to initialize new instances, initiate change detection when needed, respond to updates during change detection, and clean up before deletion of instances.
-->
컴포넌트 인스턴스는 Angular가 컴포넌트 클래스의 인스턴스를 생성한 시점부터 미리 정의된 라이프싸이클을 따라 동작하며 라이프싸이클 단계에 따라 화면에 렌더링되고 자식 컴포넌트를 화면에 추가합니다.
그리고 컴포넌트가 동작하는 동안 프로퍼티로 바인딩된 데이터가 변경되었는지 감지하며, 값이 변경되면 화면과 컴포넌트 인스턴스에 있는 데이터를 갱신하기도 합니다.
라이프싸이클은 Angular가 컴포넌트 인스턴스를 종료하고 DOM에서 템플릿을 제거할 때까지 이어집니다.
그리고 디렉티브도 컴포넌트와 비슷하게 Angular가 인스턴스를 생성하고 갱신하며 종료하는 라이프싸이클을 따릅니다.

애플리케이션에서 [라이프싸이클 후킹 메서드(lifecycle hook method)](guide/glossary#lifecycle-hook "Definition of lifecycle hook")를 사용하면 컴포넌트나 디렉티브가 동작하는 라이프싸이클에 개입할 수 있습니다.
그래서 인스턴스가 생성되는 시점, 데이터 변화가 감지되는 시점, 데이터 변화가 감지된 이후 시점, 인스턴스가 종료되는 시점에 원하는 동작을 할 수 있습니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before working with lifecycle hooks, you should have a basic understanding of the following:

*   [TypeScript programming](https://www.typescriptlang.org)
*   Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to fundamental app-design concepts")
-->
라이프싸이클에 대해 알아보기 전에 다음 내용을 먼저 이해하는 것이 좋습니다:

*   [TypeScript 문법](https://www.typescriptlang.org)
*   Angular 앱의 구조, [Angular 개요](guide/architecture "Introduction to fundamental app-design concepts") 문서를 참고하세요.


<a id="hooks-overview"></a>
<a id="responding-to-lifecycle-events"></a>

<!--
## Responding to lifecycle events
-->
## 라이프싸이클 이벤트에 반응하기

<!--
Respond to events in the lifecycle of a component or directive by implementing one or more of the *lifecycle hook* interfaces in the Angular `core` library.
The hooks give you the opportunity to act on a component or directive instance at the appropriate moment, as Angular creates, updates, or destroys that instance.

Each interface defines the prototype for a single hook method, whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit()`.
If you implement this method in your component or directive class, Angular calls it shortly after checking the input properties for that component or directive for the first time.

<code-example header="peek-a-boo.directive.ts (excerpt)" path="lifecycle-hooks/src/app/peek-a-boo.directive.ts" region="ngOnInit"></code-example>

You don't have to implement all \(or any\) of the lifecycle hooks, just the ones you need.
-->
Angular `core` 라이브러리의 *라이프싸이클 훅* 인터페이스에 정의된 메서드를 컴포넌트나 디렉티브 클래스에 구현하면 해당 라이프싸이클에 반응할 수 있습니다.
그래서 Angular가 컴포넌트나 디렉티브 인스턴스를 초기화하고, 갱신하며, 종료하는 시점에 원하는 동작을 실행할 수 있습니다.

각 인터페이스에는 라이프싸이클 후킹 메서드가 하나씩 정의되어 있으며, 이 메서드의 이름은 인터페이스 이름에 `ng` 접두사를 붙인 형태입니다.
`OnInit` 인터페이스에는 `ngOnInit()` 메서드가 정의되어 있는 식입니다.
`ngOnInit()` 메서드를 컴포넌트나 디렉티브 클래스에 정의하면 Angular가 입력 프로퍼티를 검사한 직후에 실행되기 때문에 인스턴스 초기화 로직을 작성할 수 있습니다.

<code-example header="peek-a-boo.directive.ts (일부)" path="lifecycle-hooks/src/app/peek-a-boo.directive.ts" region="ngOnInit"></code-example>

라이프싸이클 후킹 함수를 전부 구현할 필요는 없습니다.
필요한 것만 구현해서 사용하면 됩니다.


<a id="hooks-purpose-timing"></a>
<a id="lifecycle-event-sequence"></a>
<!--
### Lifecycle event sequence
-->
### 라이프싸이클 이벤트 순서

<!--
After your application instantiates a component or directive by calling its constructor, Angular calls the hook methods you have implemented at the appropriate point in the lifecycle of that instance.

Angular executes hook methods in the following sequence.
Use them to perform the following kinds of operations.

| Hook method               | Purpose                                                                                                                                                                                                                                                                                                                                                | Timing |
|:---                       |:---                                                                                                                                                                                                                                                                                                                                                    |:---    |
| `ngOnChanges()`           | Respond when Angular sets or resets data-bound input properties. The method receives a `SimpleChanges` object of current and previous property values. <br /> <div class="alert is-helpful"> **NOTE**: <br /> This happens frequently, so any operation you perform here impacts performance significantly. </div> See details in [Using change detection hooks](#onchanges) in this document. | Called before `ngOnInit()` \(if the component has bound inputs\) and whenever one or more data-bound input properties change. <br /> <div class="alert is-helpful"> **NOTE**: <br /> If your component has no inputs or you use it without providing any inputs, the framework will not call `ngOnChanges()`. </div> |
| `ngOnInit()`              | Initialize the directive or component after Angular first displays the data-bound properties and sets the directive or component's input properties. See details in [Initializing a component or directive](#oninit) in this document.                                                                                                                 | Called once, after the first `ngOnChanges()`. `ngOnInit()` is still called even when `ngOnChanges()` is not \(which is the case when there are no template-bound inputs\).                                                                                              |
| `ngDoCheck()`             | Detect and act upon changes that Angular can't or won't detect on its own. See details and example in [Defining custom change detection](#docheck) in this document.                                                                                                                                                                                   | Called immediately after `ngOnChanges()` on every change detection run, and immediately after `ngOnInit()` on the first run.                                                                                                                                            |
| `ngAfterContentInit()`    | Respond after Angular projects external content into the component's view, or into the view that a directive is in. <br /> See details and example in [Responding to changes in content](#aftercontent) in this document.                                                                                                                              | Called *once* after the first `ngDoCheck()`.                                                                                                                                                                                                                            |
| `ngAfterContentChecked()` | Respond after Angular checks the content projected into the directive or component. <br /> See details and example in [Responding to projected content changes](#aftercontent) in this document.                                                                                                                                                       | Called after `ngAfterContentInit()` and every subsequent `ngDoCheck()`.                                                                                                                                                                                                 |
| `ngAfterViewInit()`       | Respond after Angular initializes the component's views and child views, or the view that contains the directive. <br /> See details and example in [Responding to view changes](#afterview) in this document.                                                                                                                                         | Called *once* after the first `ngAfterContentChecked()`.                                                                                                                                                                                                                |
| `ngAfterViewChecked()`    | Respond after Angular checks the component's views and child views, or the view that contains the directive.                                                                                                                                                                                                                                           | Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`.                                                                                                                                                                                    |
| `ngOnDestroy()`           | Cleanup just before Angular destroys the directive or component. Unsubscribe Observables and detach event handlers to avoid memory leaks. See details in [Cleaning up on instance destruction](#ondestroy) in this document.                                                                                                                           | Called immediately before Angular destroys the directive or component.                                                                                                                                                                                                  |
-->
애플리케이션이 컴포넌트나 디렉티브 클래스의 생성자를 실행하면서 인스턴스를 초기화하고 나면 정해진 시점에 라이프싸이클 메서드가 실행됩니다.

Angular는 라이프싸이클 후킹 메서드를 정해진 순서대로 실행합니다.
그래서 원하는 용도에 맞게 적절하게 사용하는 것이 중요합니다.

| 후킹 메서드                    | 용도                                                                                                                                                                                                                                                                                    | 실행 시점                                                                                                                                                                                                               |
|:--------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ngOnChanges()`           | 바인딩된 입력 프로퍼티 값이 처음 설정되거나 변경될 때 실행됩니다. 이 메서드는 프로퍼티의 이전 값과 현재 값을 표현하는 `SimpleChanges` 객체를 인자로 받습니다. <br /> <div class="alert is-helpful"> **참고**: <br /> 이 메서드는 매우 자주 실행됩니다. 그래서 이 메서드에 복잡한 로직을 작성하면 애플리케이션 성능이 크게 저하될 수 있습니다. </div> 자세한 내용은 [변화 감지 후킹 함수 활용하기](#onchanges) 섹션을 참고하세요. | \(컴포넌트에 입력 프로퍼티가 바인딩된 후\) `ngOnInit()`이 실행되기 전에 한 번 실행되며 입력 프로퍼티로 바인딩된 값이 변경될 때마다 실행됩니다. <br /> <div class="alert is-helpful"> **참고**: <br /> 컴포넌트에 입력 프로퍼티가 없거나, 선언하고 사용하지 않는다면 `ngOnChanges()`가 실행되지 않습니다. </div> |
| `ngOnInit()`              | 디렉티브나 컴포넌트에 바인딩된 입력 프로퍼티 값이 처음 할당된 후에 실행됩니다. 자세한 내용은 [컴포넌트, 디렉티브 초기화하기](#oninit) 섹션을 참고하세요.                                                                                                                                                                                           | `ngOnChanges()`가 처음 실행된 후에 한 번 실행됩니다. `ngOnInit()` 템플릿에 입력 프로퍼티가 연결되지 않아 `ngOnChanges()`가 실행되지 않아도 실행됩니다.                                                                                                           |
| `ngDoCheck()`             | Angular가 검출하지 못한 변화에 반응하거나, Angular가 변화를 감지하지 못하게 할 때 사용합니다. 자세한 내용은 [커스텀 변화감지 로직 정의하기](#docheck) 섹션을 참고하세요.                                                                                                                                                                          | `ngOnInit()`이 실행된 직후에 한 번 실행되며, 변화 감지 싸이클이 실행되면서 `ngOnChanges()`가 실행된 이후에 매번 실행됩니다.                                                                                                                                 |
| `ngAfterContentInit()`    | Angular가 외부 컨텐츠를 컴포넌트나 디렉티브 뷰에 프로젝션한 이후에 실행됩니다. 자세한 내용은 [외부 컨텐츠 변경사항 감지하기](#aftercontent) 섹션을 참고하세요.                                                                                                                                                                                  | `ngDoCheck()`가 처음 실행된 후 *한 번* 실행됩니다.                                                                                                                                                                                |
| `ngAfterContentChecked()` | Angular가 디렉티브나 컴포넌트에 프로젝션된 컨텐츠를 검사하고 난 후에 실행됩니다. 자세한 내용은 [외부 컨텐츠 변경사항 감지하기](#aftercontent) 섹션을 참고하세요.                                                                                                                                                                                 | `ngAfterContentInit()`이 실행된 후, `ngDoCheck()`가 실행된 이후마다 실행됩니다.                                                                                                                                                       |
| `ngAfterViewInit()`       | Angular가 컴포넌트나 디렉티브 화면과 자식 컴포넌트 화면을 초기화한 후에 실행됩니다. 자세한 내용은 [화면 변경사항 감지하기](#afterview) 섹션을 참고하세요.                                                                                                                                                                                      | `ngAfterContentChecked()`가 처음 실행된 후에 *한 번* 실행됩니다.                                                                                                                                                                   |
| `ngAfterViewChecked()`    | Angular가 컴포넌트나 디렉티브 화면과 자식 화면을 검사한 후에 실행됩니다.                                                                                                                                                                                                                                          | `ngAfterViewInit()`가 실행된 후, `ngAfterContentChecked()`가 실행된 이후마다 실행됩니다.                                                                                                                                              |
| `ngOnDestroy()`           | Angular가 디렉티브나 컴포넌트 인스턴스를 종료하기 전에 실행됩니다. 이 메서드는 옵저버블을 구독 해지하거나 이벤트 핸들러를 제거하는 등 메모리 누수를 방지하는 로직을 작성하는 용도로 사용합니다. 자세한 내용은 [인스턴스 종료하기](#ondestroy) 섹션을 참고하세요.                                                                                                                            | Angular가 디렉티브나 컴포넌트 인스턴스를 종료하기 직전에 실행됩니다.                                                                                                                                                                           |


<a id="the-sample"></a>

<!--
### Lifecycle example set
-->
### 라이프싸이클 활용 예제

<!--
The <live-example></live-example> demonstrates the use of lifecycle hooks through a series of exercises presented as components under the control of the root `AppComponent`.
In each case a *parent* component serves as a test rig for a *child* component that illustrates one or more of the lifecycle hook methods.

The following table lists the exercises with brief descriptions.
The sample code is also used to illustrate specific tasks in the following sections.

| Component                     | Details |
|:---                           |:---     |
| [Peek-a-boo](#peek-a-boo)     | Demonstrates every lifecycle hook. Each hook method writes to the on-screen log.                                                                                                                                          |
| [Spy](#spy)                   | Shows how to use lifecycle hooks with a custom directive. The `SpyDirective` implements the `ngOnInit()` and `ngOnDestroy()` hooks, and uses them to watch and report when an element goes in or out of the current view. |
| [OnChanges](#onchanges)       | Demonstrates how Angular calls the `ngOnChanges()` hook every time one of the component input properties changes, and shows how to interpret the `changes` object passed to the hook method.                              |
| [DoCheck](#docheck)           | Implements the `ngDoCheck()` method with custom change detection. Watch the hook post changes to a log to see how often Angular calls this hook.                                                                          |
| [AfterView](#afterview)       | Shows what Angular means by a [view](guide/glossary#view "Definition of view."). Demonstrates the `ngAfterViewInit()` and `ngAfterViewChecked()` hooks.                                                                   |
| [AfterContent](#aftercontent) | Shows how to project external content into a component and how to distinguish projected content from a component's view children. Demonstrates the `ngAfterContentInit()` and `ngAfterContentChecked()` hooks.            |
| [Counter](#counter)           | Demonstrates a combination of a component and a directive, each with its own hooks.                                                                                                                                       |
-->
<live-example></live-example>에서 최상위 컴포넌트 `AppComponent` 안에 있는 컴포넌트들을 보면 라이프싸이클 후킹 함수를 어떻게 활용하는지 확인할 수 있습니다.
이 예제 프로젝트에서 `AppComponent`는 모든 자식 컴포넌트의 테스트 베드로 동작하며 자식 컴포넌트는 개별 라이프싸이클 후킹 메서드를 다룹니다.

예제 프로젝트에서 어떤 내용을 다루는지 간단하게 살펴봅시다.
개별 항목에 대해서는 이 문서를 진행하면서 계속 알아봅니다.

| 컴포넌트                          | 설명                                                                                                                                                          |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Peek-a-boo](#peek-a-boo)     | 전체 라이프싸이클 후킹 메서드가 어떻게 동작하는지 보여줍니다. 개별 후킹 메서드가 실행되는 것을 화면에서 확인할 수 있습니다.                                                                                      |
| [Spy](#spy)                   | 커스텀 디렉티브로 라이프싸이클 후킹 메서드를 활용하는 방법에 대해 다룹니다. `SpyDirective`에는 `ngOnInit()`과 `ngOnDestroy()` 후킹 메서드가 정의되어 있으며, 이 디렉티브를 사용해서 엘리먼트가 화면에 추가되고 제거되는 것을 확인할 수 있습니다. |
| [OnChanges](#onchanges)       | 컴포넌트의 입력 프로퍼티 값이 변경될 때 `ngOnChanges()`가 어떻게 실행되는지에 대해 다룹니다. 후킹 메서드에 전달되는 `changes` 객체를 어떻게 활용할 수 있는지도 확인해 보세요.                                              |
| [DoCheck](#docheck)           | `ngDoCheck()` 메서드로 커스텀 변화감지 로직을 구현하는 방법에 대해 다룹니다. `ngDoCheck()` 메서드가 얼마나 자주 실행되는지 화면에 표시되는 로그를 확인해 보세요.                                                     |
| [AfterView](#afterview)       | Angular에서 의미하는 [화면(view)](guide/glossary#view "Definition of view.")이 무엇인지에 대해 다룹니다. `ngAfterViewInit()` 메서드와 `ngAfterViewChecked()` 메서드에 대해 다룹니다.          |
| [AfterContent](#aftercontent) | 외부 컨텐츠를 컴포넌트에 프로젝션하는 것에 대해 다룹니다. 컴포넌트 자식 뷰와 프로젝션된 컨텐츠를 구분하는 방법도 설명하며, `ngAfterContentInit()` 메서드와 `ngAfterContentChecked()` 메서드에 대해 다룹니다.                   |
| [Counter](#counter)           | 컴포넌트와 디렉티브를 함께 사용할 때 라이프싸이클 후킹 함수를 각각 어떻게 적용하는지 알아봅니다.                                                                                                      |


<a id="oninit"></a>

<!--
## Initializing a component or directive
-->
## 컴포넌트, 디렉티브 초기화하기

<!--
Use the `ngOnInit()` method to perform the following initialization tasks.

| Initialization tasks                                         | Details |
|:---                                                          |:---     |
| Perform complex initializations outside of the constructor   | Components should be cheap and safe to construct. You should not, for example, fetch data in a component constructor. You shouldn't worry that a new component will try to contact a remote server when created under test or before you decide to display it. <br /> An `ngOnInit()` is a good place for a component to fetch its initial data. For an example, see the [Tour of Heroes tutorial](tutorial/tour-of-heroes/toh-pt4#oninit).                                                                                                                    |
| Set up the component after Angular sets the input properties | Constructors should do no more than set the initial local variables to simple values. <br /> Keep in mind that a directive's data-bound input properties are not set until *after construction*. If you need to initialize the directive based on those properties, set them when `ngOnInit()` runs. <div class="alert is-helpful"> The `ngOnChanges()` method is your first opportunity to access those properties. Angular calls `ngOnChanges()` before `ngOnInit()`, but also many times after that. It only calls `ngOnInit()` once. </div> |
-->
`ngOnInit()` 메서드를 활용하면 다음과 같은 초기화 작업을 실행할 수 있습니다.

| 초기화 작업                   | 설명                                                                                                                                                                                                                                                                                                                                                                                                  |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 생성자에 넣지 않은 복잡한 초기화 작업    | 일반적으로 컴포넌트는 가볍고 간단하게 생성할 수 있어야 합니다. 그래서 초기화 로직이 복잡하다면 이 로직은 생성자에 작성하지 않는 것이 좋습니다. 외부에서 데이터를 받아와야 하는 로직도 마찬가지입니다.  이런 로직이 생성자에 있으면 테스트 환경에서 컴포넌트를 생성하거나 화면에 컴포넌트가 표시되기 전에도 외부로 HTTP 요청이 발생할 수 있습니다. <br /> 데이터를 외부에서 받아오고 컴포넌트를 초기화하는 로직은 `ngOnInit()`에 작성하는 것이 좋습니다. [히어로들의 여행 튜토리얼](tutorial/tour-of-heroes/toh-pt4#oninit)에서도 이 내용을 확인할 수 있습니다.                                                                  |
| 입력 프로퍼티 값을 할당한 후의 초기화 작업 | 생성자에서는 지역 변수를 할당하는 것 이외의 로직은 작성하지 않는 것이 좋습니다. <br /> 디렉티브에 바인딩되는 입력 프로퍼티 값은 *생성자가 실행된 후에* 할당된다는 것을 명심하세요. 이 프로퍼티 값에 따라 디렉티브를 초기화해야 한다면 생성자가 아니라 `ngOnInit()`에서 해야 합니다. <div class="alert is-helpful"> 입력 프로퍼티에 데이터가 전달되는 것을 가장 먼저 확인할 수 있는 메서드는 `ngOnChanges())` 메서드입니다. 하지만 `ngOnChanges()`는 `ngOnInit()` 이전뿐 아니라 그 이후에도 여러번 실행됩니다. `ngOnInit()`은 한번만 실행되기 때문에 초기화 로직은 이 메서드에 작성하는 것이 좋습니다. </div> |


<a id="ondestroy"></a>

<!--
## Cleaning up on instance destruction
-->
## 인스턴스 종료하기

<!--
Angular provides several ways to clean up when an instance is destroyed.
-->
컴포넌트 인스턴스가 종료될 때 이 컴포넌트를 정리할 수 있는 방법은 몇가지가 있습니다.


### `ngOnDestroy`

<!--
You can put cleanup logic in `ngOnDestroy()`, the logic that must run before Angular destroys the directive.

This is the place to free resources that won't be garbage-collected automatically.
You risk memory leaks if you neglect to do so.

*   Unsubscribe from Observables and DOM events
*   Stop interval timers
*   Unregister all callbacks that the directive registered with global or application services

The `ngOnDestroy()` method is also the time to notify another part of the application that the component is going away.
-->
Angular가 디렉티브나 컴포넌트를 종료하기 전에 실행해야 하는 로직이 있다면 이 로직은 `ngOnDestroy()`에 작성합니다.

그래서 자동으로 메모리 정리되지 않는 항목이 있다면 이 메서드에서 정리하면 됩니다.
이런 용도로 활용할 수 있습니다.

*   옵저버블이나 DOM 이벤트 구독 해지
*   인터벌 타이머 중단
*   디렉티브가 전역이나 애플리케이션 서비스에 등록한 콜백 정리

`ngOnDestroy()` 메서드는 컴포넌트나 디렉티브가 종료된다는 것을 애플리케이션 다른 영역으로 전달하는 용도로도 사용할 수 있습니다.

### DestroyRef

<!--
In addition to `ngOnDestroy()`, you can inject Angular's `DestroyRef` and register callback functions to be called when the enclosing context is destroyed. This can be useful for building reusable utilities that require cleanup.

Register a callback with the `DestroyRef`:

```ts
@Component(...)
class Counter {
  count = 0;
  constructor() {
    // Start a timer to increment the counter every second.
    const id = setInterval(() => this.count++, 1000);

    // Stop the timer when the component is destroyed.
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(id));
  }
}
```

Like `ngOnDestroy`, `DestroyRef` works in any Angular service, directive, component, or pipe.
-->
`ngOnDestroy()` 외에도, `DestroyRef`를 의존성 객체로 받아 콜백 함수를 등록하면 컴포넌트 종료 시점에 실행할 수 있습니다.
이 방식은 정리 로직이 필요한 유틸 함수에 사용하면 좋습니다.

이렇게 등록하면 됩니다:

```ts
@Component(...)
class Counter {
  count = 0;
  constructor() {
    // 1초마다 카운터를 세는 타이머를 시작합니다.
    const id = setInterval(() => this.count++, 1000);

    // 컴포넌트가 종료될 때 타이머를 종료합니다.
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(id));
  }
}
```

`ngOnDestroy`와 마찬가지로, `DestroyRef`는 Angular 서비스, 디렉티브, 컴포넌트, 파이프에 사용할 수 있습니다.


### `takeUntilDestroyed`

<!--
<div class="alert is-important">

`takeUntilDestroyed` is available for [developer preview](/guide/releases#developer-preview). It's ready for you to try, but it might change before it is stable.

</div>

When using RxJS Observables in components or directives, you may want to complete any observables when the component or directive is destroyed. Angular's `@angular/core/rxjs-interop` package provides an operator, `takeUntilDestroyed`, to simplify this common task:

```ts
data$ = http.get('...').pipe(takeUntilDestroyed());
```

By default, `takeUntilDestroyed` must be called in an [injection context](/guide/dependency-injection-context) so that it can access `DestroyRef`. If an injection context isn't available, you can explicitly provide a `DestroyRef`.
-->
<div class="alert is-important">

`takeUntilDestroyed`은 [개발자 프리뷰](/guide/releases#developer-preview)에서만 사용할 수 있습니다.
그리고 이후에 사용방법이 변경될 수 있습니다.

</div>

컴포넌트나 디렉티브 안에서 RxJS 옵저버블을 사용한다면, 이 컴포넌트/디렉티브가 종료될 때 옵저버블을 종료해야 할 수 있습니다.
이 때 `@angular/core/rxjs-interop` 패키지에 있는 `takeUntilDestroyed` 연산자를 사용하면 됩니다:

```ts
data$ = http.get('...').pipe(takeUntilDestroyed());
```

기본적으로 `takeUntilDestroyed`는 [의존성 컨텍스트](/guide/dependency-injection-context) 안에서 실행되기 때문에 `DestroyRef`에도 접근할 수 있습니다.
의존성 컨텍스트를 사용할 수 없으면 `DestroyRef`를 명시적으로 사용해야 합니다.


<!--
## Reading and writing the DOM
-->
## DOM 읽고 쓰기

<!--
Sometimes it's necessary to use browser-only APIs to manually read or write the DOM. This can be challenging to do with the [lifecycle events](#lifecycle-event-sequence) above, as they will also run during [server-side rendering and pre-rendering](guide/glossary#server-side-rendering). For this purpose, Angular provides `afterRender` and `afterNextRender`. These functions can be used unconditionally, but will only have an effect on the browser. Both functions accept a callback that will run after the next [change detection](/guide/glossary#change-detection) cycle (including any nested cycles) has completed.

<div class="alert is-important">

`afterRender` and `afterNextRender` are available for [developer preview](/guide/releases#developer-preview). They are ready for you to try, but they might change before they are stable.

</div>

| Function | Purpose | Timing |
| ------ | ------- | ------ |
| `afterNextRender` | Perform one-time initialization, or observe a single, specific change to the DOM. <br /> <div class="alert is-helpful">As a rule of thumb, you should use `afterRender` instead if you need to manually read or write any layout data such as size or location.</div> See details in [One-time initialization](#one-time-initialization) in this document. | _Once_ after the next change detection cycle. |
| `afterRender` | Synchronize state with the DOM.  See details in [Handling synchronization](#handling-synchronization) in this document. | After _every_ change detection cycle that follows. |
-->
때로는 DOM을 읽거나 쓰기 위해 브라우저에만 있는 API를 활용해야 하는 경우가 있습니다.
그런데 이런 작업은 [서버 사이드 렌더링이나 사전 렌더링](guide/glossary#server-side-rendering)의 영향을 받기 때문에 이전에 설명한 [라이프싸이클 이벤트](#lifecycle-event-sequence)로는 구현하기 어려울 수 있습니다.
이런 경우를 위해 Angular는 `afterRender`와 `afterNextRender`를 제공합니다.
이 함수들은 조건없이 사용할 수 있지만, 브라우저에만 영향을 줍니다.
이 함수들은 콜백 함수를 인자로 받으며, 콜백 함수는 [변화 감지](/guide/glossary#change-detection) 싸이클이 완료된 후에 실행됩니다.

<div class="alert is-important">

`afterRender`와 `afterNextRender`는 [개발자 프리뷰](/guide/releases#developer-preview)에서만 사용할 수 있습니다.
그리고 이후에 사용방법이 변경될 수 있습니다.

</div>

| 함수                | 용도                                                                                                                                                                                              | 타이밍              |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| `afterNextRender` | 처음 초기화할 때, 옵저버블을 한 번만 실행할 때, DOM을 처음 구성할 때. <br /> <div class="alert is-helpful">일반적으로 `afterRender`는 DOM의 크기나 위치를 읽거나 조정할 때 사용합니다.</div> 자세한 내용은 [최초 초기화](#one-time-initialization) 섹션을 참고하세요. | 변화가 감지된 후에 _한 번_ |
| `afterRender`     | DOM 상태와 동기화할 때. 자세한 내용은 [동기화 처리](#handling-synchronization) 섹션을 참고하세요                                                                                                                           | 변화가 감지된 후에 _매 번_ |


<a id="one-time-initialization"></a>
<!--
### One-time initialization
-->
### 최초 초기화

<!--
Generally, you will want to use `afterNextRender` to perform any one-time initialization, such as for a third-party library, or for browser-only APIs.
-->
일반적으로 `afterNextRender`는 서드 파티 라이브러리는 사용하거나 브라우저 전용 API를 사용해서 최초 초기화를 수행할 때 사용합니다.

```ts
@Component({
  selector: 'my-chart-cmp',
  template: `<div #chart>{{ ... }}</div>`,
})
export class MyChartCmp {
  @ViewChild('chart') chartRef: ElementRef;
  chart: MyChart|null;

  constructor() {
    afterNextRender(() => {
      this.chart = new MyChart(this.chartRef.nativeElement);
    }, {phase: AfterRenderPhase.Write});
  }
}
```

<!--
Instead of attempting to recreate their behaviors with `afterRender`, you should prefer to use built-in browser APIs like `ResizeObserver` and `IntersectionObserver` wherever possible. You can use `afterNextRender` to safely initialize such APIs on the browser only.
-->
`afterRender`를 너무 많이 사용하는 것보다는 `ResizeObserver`나 `IntersectionObserver`와 같은 브라우저 내장 API를 활용하는 것이 좋은 경우도 있습니다.
`afterNextRender`를 사용하면 브라우저 API만 적용되도록 코드를 작성할 수 있습니다.

```ts
@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  resizeObserver: ResizeObserver|null = null;
  @ViewChild('content') contentRef: ElementRef;

  constructor() {
    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(() => {
        console.log('Content was resized');
      });

      this.resizeObserver.observe(this.contentRef.nativeElement);
    }, {phase: AfterRenderPhase.Write});
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }
}
```

<div class="alert is-important">

<!--
As a rule of thumb, `afterNextRender` should be used to observe _discrete_ changes to the DOM, such as element creation or deletion. For manually reading or writing data that tends to change frequently, such as size or location, you should generally prefer to use `afterRender` instead.
-->
일반적으로 `afterNextRender`는 엘리먼트가 추가되거나 제거되는 경우처럼 DOM의 _명확한_ 변경사항을 추적할 때 사용해야 합니다.
엘리먼트의 크기나 위치가 변하는 것을 주기적으로 검사하는 것을 의도했다면 `afterRender`를 사용하는 것이 더 좋습니다.

</div>


<a id="handling-synchronization"></a>
<!--
### Handling synchronization
-->
### 동기화 처리

<!--
As an escape hatch for when the browser does not provide a better API to do so, you can use `afterRender` to perform any additional read or writes to the DOM every time Angular finishes mutating it.
-->
브라우저가 별다른 API를 제공하지 않는다면, Angular가 DOM 변경을 완료할 때마다 `afterRender`를 사용해서 DOM을 참조하거나 조작할 수 있습니다.

```ts
@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  @ViewChild('content') contentRef: ElementRef;

  constructor() {
    afterRender(() => {
      const elem = this.contentRef.nativeElement;
      console.log(`content position: (${elem.offsetLeft}, ${elem.offsetTop})`);
    }, {phase: AfterRenderPhase.Read});
  }
}
```


<!--
## General examples
-->
## 활용 예제

<!--
The following examples demonstrate the call sequence and relative frequency of the various lifecycle events, and how the hooks can be used separately or together for components and directives.
-->
라이프싸이클 이벤트가 얼마나 자주 발생하는지, 어떻게 활용할 수 있는지 예제를 보며 확인해 봅시다.


<a id="peek-a-boo"></a>
<!--
### Sequence and frequency of all lifecycle events
-->
### 라이프싸이클 이벤트 발생 순서, 빈도

<!--
To show how Angular calls the hooks in the expected order, the `PeekABooComponent` demonstrates all of the hooks in one component.

In practice you would rarely, if ever, implement all of the interfaces the way this demo does.

The following snapshot reflects the state of the log after the user clicked the **Create&hellip;** button and then the **Destroy&hellip;** button.

<div class="lightbox">

<img alt="Peek-a-boo" src="generated/images/guide/lifecycle-hooks/peek-a-boo.png">

</div>

The sequence of log messages follows the prescribed hook calling order:

| Hook order | Log message           |
|:---        |:---                   |
| 1          | `OnChanges`           |
| 2          | `OnInit`              |
| 3          | `DoCheck`             |
| 4          | `AfterContentInit`    |
| 5          | `AfterContentChecked` |
| 6          | `AfterViewInit`       |
| 7          | `AfterViewChecked`    |
| 8          | `DoCheck`             |
| 9          | `AfterContentChecked` |
| 10         | `AfterViewChecked`    |
| 11         | `OnDestroy`           |


<div class="alert is-helpful">

Notice that the log confirms that input properties \(the `name` property in this case\) have no assigned values at construction.
The input properties are available to the `onInit()` method for further initialization.

</div>

Had the user clicked the *Update Hero* button, the log would show another `OnChanges` and two more triplets of `DoCheck`, `AfterContentChecked`, and `AfterViewChecked`.
Notice that these three hooks fire *often*, so it is important to keep their logic as lean as possible.
-->
Angular가 라이프싸이클 후킹 메서드를 어떤 순서로 실행하는지 확인하려면 `PeekABooComponent`를 확인하면 됩니다.

물론 실제 앱에서 이 컴포넌트처럼 모든 라이프싸이클 메서드를 정의할 일은 거의 없으며, 데모를 위해 구현한 것입니다.

이 컴포넌트에서 *Create&hellip;* 버튼을 누른 후에 *Destroy&hellip;* 버튼을 누르면 다음과 같은 로그가 화면에 표시됩니다.

<div class="lightbox">

<img alt="Peek-a-boo" src="generated/images/guide/lifecycle-hooks/peek-a-boo.png">

</div>

라이프싸이클 후킹 메서드가 실행된 순서는 이렇습니다:

| 실행 순서  | 로그 메시지                |
|:-------|:----------------------|
| 1      | `OnChanges`           |
| 2      | `OnInit`              |
| 3      | `DoCheck`             |
| 4      | `AfterContentInit`    |
| 5      | `AfterContentChecked` |
| 6      | `AfterViewInit`       |
| 7      | `AfterViewChecked`    |
| 8      | `DoCheck`             |
| 9      | `AfterContentChecked` |
| 10     | `AfterViewChecked`    |
| 11     | `OnDestroy`           |

<div class="alert is-helpful">

입력 프로퍼티(예제에서는 `name` 프로퍼티)의 값은 생성자가 실행되는 시점에 할당되지 않았다는 것에 주의하세요.
그래서 입력 프로퍼티를 활용해서 컴포넌트를 초기화하는 로직은 `onInit()` 메서드 안에 작성해야 합니다.

</div>

그리고 *Update Hero* 버튼을 누르면 `OnChanges` 로그와 함께 `DoCheck`, `AfterContentChecked`, `AfterViewChecked` 로그도 함께 출력됩니다.
이 인터페이스로 구현하는 라이프싸이클 후킹 메서드는 *자주* 실행됩니다.
이 메서드에는 간단한 로직만 작성하는 것이 좋습니다.


<a id="spy"></a>

<!--
### Use directives to watch the DOM
-->
### DOM을 추적하는 디렉티브

<!--
The `Spy` example demonstrates how to use the hook method for directives as well as components.
The `SpyDirective` implements two hooks, `ngOnInit()` and `ngOnDestroy()`, to discover when a watched element is in the current view.

This template applies the `SpyDirective` to a `<div>` in the `ngFor` *hero* repeater managed by the parent `SpyComponent`.

The example does not perform any initialization or clean-up.
It just tracks the appearance and disappearance of an element in the view by recording when the directive itself is instantiated and destroyed.

A spy directive like this can provide insight into a DOM object that you cannot change directly.
You can't access the implementation of a built-in `<div>`, or modify a third party component.
You do have the option to watch these elements with a directive.

The directive defines `ngOnInit()` and `ngOnDestroy()` hooks
that log messages to the parent using an injected `LoggerService`.

<code-example header="src/app/spy.directive.ts" path="lifecycle-hooks/src/app/spy.directive.ts" region="spy-directive"></code-example>

Apply the spy to any built-in or component element, and see that it is initialized and destroyed at the same time as that element.
Here it is attached to the repeated hero `<p>`:

<code-example header="src/app/spy.component.html" path="lifecycle-hooks/src/app/spy.component.html" region="template"></code-example>

Each spy's creation and destruction marks the appearance and disappearance of the attached hero `<p>` with an entry in the *Hook Log*.
Adding a hero results in a new hero `<p>`.
The spy's `ngOnInit()` logs that event.

The *Reset* button clears the `heroes` list.
Angular removes all hero `<p>` elements from the DOM and destroys their spy directives at the same time.
The spy's `ngOnDestroy()` method reports its last moments.
-->
`Spy` 예제를 보면 디렉티브에 라이프싸이클 메서드를 정의해서 컴포넌트처럼 사용하는 방법을 확인할 수 있습니다.
`SpyDirective`에는 엘리먼트가 화면에 표시되는 시점을 확인하기 위해 `ngOnInit()`, `ngOnDestroy()` 메서드를 구현했습니다.

그리고 부모 컴포넌트 `SpyComponent` 템플릿의 `ngFor` 안에서 반복하는 `<div>`에 `SpyDirective`를 적용했습니다.

이번 예제에는 디렉티브를 초기화하거나 정리하는 로직이 없습니다.
이 디렉티브는 단순하게 엘리먼트가 화면에 나타나고 사라지는 것을 추적하는 용도로만 활용합니다.

스파이 디렉티브는 이렇게 개발자가 직접 조작할 수 없는 DOM 객체를 추적하는 용도로 활용할 수 있습니다.
그래서 네이티브 `<div>` 엘리먼트의 구현 코드나 서드 파티 컴포넌트를 직접 수정하지 않아도 됩니다.

이 디렉티브는 `ngOnInit()`, `ngOnDestroy()` 후킹 메서드가 실행될 때마다 `LoggerService`를 사용해서 로그 메시지를 출력합니다.

<code-example header="src/app/spy.directive.ts" path="lifecycle-hooks/src/app/spy.directive.ts" region="spy-directive"></code-example>

이 스파이 디렉티브는 네이티브 엘리먼트나 컴포넌트 엘리먼트에도 자유롭게 적용할 수 있으며, 동시에 여러 엘리먼트에 적용할 수도 있습니다.
이렇게 사용하면 됩니다:

<code-example header="src/app/spy.component.html" path="lifecycle-hooks/src/app/spy.component.html" region="template"></code-example>

개별 스파이는 히어로 `<div>`가 화면에 표시되거나 화면에서 제거될 때마다 생성되고 종료되며, 이 내용은 로그로 기록됩니다.
히어로 `<p>`를 하나 추가해 보세요.
`ngOnInit()`가 실행된 것을 로그로 확인할 수 있습니다.

*Reset* 버튼을 눌러서 `heroes` 목록을 초기화 해보세요.
그러면 Angular가 히어로와 관련된 `<p>` 엘리먼트를 모두 DOM에서 제거하면서 스파이 디렉티브도 종료됩니다.
이 때 `ngOnDestroy()` 메서드에 정의한 로그가 화면에 표시됩니다.


<a id="counter"></a>

<!--
### Use component and directive hooks together
-->
### 컴포넌트와 디렉티브에서 동시에 후킹하기

<!--
In this example, a `CounterComponent` uses the `ngOnChanges()` method to log a change every time the parent component increments its input `counter` property.

This example applies the `SpyDirective` from the previous example to the `CounterComponent` log, to watch the creation and destruction of log entries.
-->
이 예제에서 `CounterComponent`는 `ngOnChanges()` 메서드를 사용해서 부모 컴포넌트에서 전달되는 `counter` 프로퍼티 값이 변경될 때마다 로그를 출력합니다.

코드를 보면 `SpyDirective`가 `CounterComponent`에도 적용된 것을 확인할 수 있으며, 이 경우에도 `SpyDirective`가 출력하는 로그로 `CounterComponent`가 생성되고 종료되는 시점을 확인할 수 있습니다.


<a id="onchanges"></a>
<a id="using-change-detection-hooks"></a>

<!--
## Using change detection hooks
-->
## 변화 감지 후킹 함수 활용하기

<!--
Angular calls the `ngOnChanges()` method of a component or directive whenever it detects changes to the  ***input properties***.
The *onChanges* example demonstrates this by monitoring the `OnChanges()` hook.

<code-example header="on-changes.component.ts (excerpt)" path="lifecycle-hooks/src/app/on-changes.component.ts" region="ng-on-changes"></code-example>

The `ngOnChanges()` method takes an object that maps each changed property name to a [SimpleChange](api/core/SimpleChange) object holding the current and previous property values.
This hook iterates over the changed properties and logs them.

The example component, `OnChangesComponent`, has two input properties: `hero` and `power`.

<code-example header="src/app/on-changes.component.ts" path="lifecycle-hooks/src/app/on-changes.component.ts" region="inputs"></code-example>

The host `OnChangesParentComponent` binds to them as follows.

<code-example header="src/app/on-changes-parent.component.html" path="lifecycle-hooks/src/app/on-changes-parent.component.html" region="on-changes"></code-example>

Here's the sample in action as the user makes changes.

<div class="lightbox">

<img alt="OnChanges" src="generated/images/guide/lifecycle-hooks/on-changes-anim.gif">

</div>

The log entries appear as the string value of the *power* property changes.
Notice, however, that the `ngOnChanges()` method does not catch changes to `hero.name`.
This is because Angular calls the hook only when the value of the input property changes.
In this case, `hero` is the input property, and the value of the `hero` property is the *reference to the hero object*.
The object reference did not change when the value of its own `name` property changed.
-->
컴포넌트나 디렉티브에 바인딩된 ***입력 프로퍼티*** 값이 변경된 것을 감지하면 Angular가 `ngOnChanges()` 메서드를 실행합니다.
`ngOnChanges()` 함수에서 값이 어떻게 변경되었는지 확인하려면 다음과 같이 작성하면 됩니다.

<code-example header="on-changes.component.ts (일부)" path="lifecycle-hooks/src/app/on-changes.component.ts" region="ng-on-changes"></code-example>

`ngOnChanges()` 메서드는 [SimpleChange](api/core/SimpleChange) 객체를 인자로 받는데, 이 객체에는 개별 입력 프로퍼티가 객체의 프로퍼티 이름으로 선언되어 이전값과 현재값을 전달합니다.
그래서 객체 프로퍼티를 순회하면 어떤 값이 변경되었는지 확인할 수 있습니다.

예제로 다루는 `OnChangesComponent`에는 입력 프로퍼티가 2개 있습니다: `hero`, `power`.

<code-example header="src/app/on-changes.component.ts" path="lifecycle-hooks/src/app/on-changes.component.ts" region="inputs"></code-example>

그리고 이 입력 프로퍼티들은 `OnChangesParentComponent`에서 이렇게 바인딩됩니다.

<code-example header="src/app/on-changes-parent.component.html" path="lifecycle-hooks/src/app/on-changes-parent.component.html" region="on-changes"></code-example>

사용자가 입력 프로퍼티 값을 변경할 때 어떻게 동작하는지 확인해 보세요.

<div class="lightbox">

<img alt="OnChanges" src="generated/images/guide/lifecycle-hooks/on-changes-anim.gif">

</div>

*power* 프로퍼티의 값이 변경될 때마다 로그가 출력됩니다.
하지만 `hero.name` 프로퍼티가 변경된 것은 감지하지 못하며 `ngOnChanges()` 메서드도 실행되지 않는 것에 주의하세요.
왜냐하면 Angular는 기본 상태에서 입력 프로퍼티 객체 자체가 변경된 것만 감지하기 때문입니다.
이 경우에 입력 프로퍼티는 `hero`이며 `hero` 값은 *히어로 객체 참조*입니다.
그래서 `hero` 안에 있는 `name` 프로퍼티 값이 변경되는 것은 감지하지 못합니다.


<a id="afterview"></a>

<!--
### Responding to view changes
-->
### 화면 변경사항 감지하기

<!--
As Angular traverses the [view hierarchy](guide/glossary#view-hierarchy "Definition of view hierarchy definition") during change detection, it needs to be sure that a change in a child does not attempt to cause a change in its own parent.
Such a change would not be rendered properly, because of how [unidirectional data flow](guide/glossary#unidirectional-data-flow "Definition") works.

If you need to make a change that inverts the expected data flow, you must trigger a new change detection cycle to allow that change to be rendered.
The examples illustrate how to make such changes safely.

The *AfterView* sample explores the `AfterViewInit()` and `AfterViewChecked()` hooks that Angular calls *after* it creates a component's child views.

Here's a child view that displays a hero's name in an `<input>`:

<code-example header="ChildViewComponent" path="lifecycle-hooks/src/app/child-view.component.ts" region="child-view"></code-example>

The `AfterViewComponent` displays this child view *within its template*:

<code-example header="AfterViewComponent (template)" path="lifecycle-hooks/src/app/after-view.component.ts" region="template"></code-example>

The following hooks take action based on changing values *within the child view*, which can only be reached by querying for the child view using the property decorated with [@ViewChild](api/core/ViewChild).

<code-example header="AfterViewComponent (class excerpts)" path="lifecycle-hooks/src/app/after-view.component.ts" region="hooks"></code-example>
-->
변화 감지 싸이클이 실행되는 동안 Angular가 [뷰 계층](guide/glossary#view-hierarchy "Definition of view hierarchy definition")를 순회하면서 자식 뷰에서 발생한 변화가 부모 뷰에 영향을 미치지 않아야 합니다.
자식 뷰에서 부모 뷰에 영향을 주면 [단방향 데이터 흐름](guide/glossary#unidirectional-data-flow "Definition")을 어기게 되기 때문에 예상한대로 렌더링되지 않을 수 있습니다.

그래서 자식 뷰에서 부모 뷰로 전달되는 변화를 만들어 내려면 이 변화를 반영하는 변화 감지 싸이클을 새로 발생시켜야 합니다.
이 과정을 어떻게 처리하는지 알아봅시다.

*AfterView* 예제는 컴포넌트 자식 뷰를 생성한 *후에* Angular가 실행하는 `AfterViewInit()`, `AfterViewChecked()` 후킹 메서드에 대해 다룹니다.

자식 뷰는 히어로의 이름을 `<input>` 엘리먼트에 표시합니다:

<code-example header="ChildViewComponent" path="lifecycle-hooks/src/app/child-view.component.ts" region="child-view"></code-example>

그리고 `AfterViewComponent`는 *템플릿 안에* 이 자식 뷰를 표시합니다:

<code-example header="AfterViewComponent (템플릿)" path="lifecycle-hooks/src/app/after-view.component.ts" region="template"></code-example>

아래 코드는 *자식 뷰 안에서* 발생한 변화를 감지했을 때 처리하는 로직을 구현한 것입니다.
자식 뷰에 있는 프로퍼티에 접근하기 위해 [@ViewChild](api/core/ViewChild) 데코레이터를 사용했습니다.

<code-example header="AfterViewComponent (클래스 일부)" path="lifecycle-hooks/src/app/after-view.component.ts" region="hooks"></code-example>


<a id="wait-a-tick"></a>

<!--
#### Wait before updating the view
-->
#### 화면이 갱신될 때까지 기다리기

<!--
In this example, the `doSomething()` method updates the screen when the hero name exceeds 10 characters, but waits a tick before updating `comment`.

<code-example header="AfterViewComponent (doSomething)" path="lifecycle-hooks/src/app/after-view.component.ts" region="do-something"></code-example>

Both the `AfterViewInit()` and `AfterViewChecked()` hooks fire after the component's view is composed.
If you modify the code so that the hook updates the component's data-bound `comment` property immediately, you can see that Angular throws an error.

The `LoggerService.tick_then()` statement postpones the log update for one turn of the browser's JavaScript cycle, which triggers a new change-detection cycle.
-->
이 예제에서 `doSomething()` 메서드는 히어로의 이름이 10글자를 넘어갔을 때 화면에 관련 메시지를 표시하는데, `comment` 프로퍼티를 갱신하기 전에 한 싸이클(tick) 기다립니다.

<code-example header="AfterViewComponent (doSomething)" path="lifecycle-hooks/src/app/after-view.component.ts" region="do-something"></code-example>

후킹 메서드 `ngAfterViewInit()`과 `ngAfterViewChecked()`는 모두 컴포넌트 뷰가 갱신된 후에 실행됩니다.
이 때 컴포넌트에 바인딩되는 `comment` 프로퍼티 값을 즉시 변경하면 Angular가 에러를 발생시킵니다.

그래서 `LoggerService.tick_then()`를 사용해서 브라우저의 JavaScript 싸이클을 한 번 지연시킨 후 새로운 변화 감지 싸이클을 시작하는 방식으로 구현하는 것이 좋습니다.


<!--
#### Write lean hook methods to avoid performance problems
-->
#### 성능 저하에 주의하세요.

<!--
When you run the *AfterView* sample, notice how frequently Angular calls `AfterViewChecked()` - often when there are no changes of interest.
Be careful about how much logic or computation you put into one of these methods.

<div class="lightbox">

<img alt="AfterView" src="generated/images/guide/lifecycle-hooks/after-view-anim.gif">

</div>
-->
*AfterView* 예제를 실행해보면 별다른 변화가 없어도 `AfterViewChecked()` 메서드가 자주 실행되는 것을 확인할 수 있습니다.
이렇게 자주 실행되는 라이프싸이클 후킹 메서드에는 복잡한 로직을 작성하지 않아야 합니다.
그래야 앱 성능 저하를 피할 수 있습니다.


<div class="lightbox">

<img alt="AfterView" src="generated/images/guide/lifecycle-hooks/after-view-anim.gif">

</div>


<a id="aftercontent"></a>
<a id="aftercontent-hooks"></a>

<a id="content-projection"></a>
<a id="responding-to-projected-content-changes"></a>

<!--
### Responding to projected content changes
-->
### 외부 컨텐츠 변경사항 감지하기

<!--
*Content projection* is a way to import HTML content from outside the component and insert that content  into the component's template in a designated spot.
Identify content projection in a template by looking for the following constructs.

*   HTML between component element tags
*   The presence of `<ng-content>` tags in the component's template

<div class="alert is-helpful">

AngularJS developers know this technique as *transclusion*.

</div>

The *AfterContent* sample explores the `AfterContentInit()` and `AfterContentChecked()` hooks that Angular calls *after* Angular projects external content into the component.

Consider this variation on the [previous *AfterView*](#afterview) example.
This time, instead of including the child view within the template, it imports the content from the `AfterContentComponent` hook's parent.
The following is the parent's template.

<code-example header="AfterContentParentComponent (template excerpt)" path="lifecycle-hooks/src/app/after-content-parent.component.ts" region="parent-template"></code-example>

Notice that the `<app-child>` tag is tucked between the `<after-content>` tags.
Never put content between a component's element tags *unless you intend to project that content into the component*.

Now look at the component's template.

<code-example header="AfterContentComponent (template)" path="lifecycle-hooks/src/app/after-content.component.ts" region="template"></code-example>

The `<ng-content>` tag is a *placeholder* for the external content.
It tells Angular where to insert that content.
In this case, the projected content is the `<app-child>` from the parent.

<div class="lightbox">

<img alt="Projected Content" src="generated/images/guide/lifecycle-hooks/projected-child-view.png">

</div>
-->
*컨텐츠 프로젝션\(content projection\)* 은 컴포넌트 밖에서 가져온 HTML 컨텐츠를 컴포넌트 템플릿 안에 표시하는 것을 의미합니다.
템플릿에 사용된 컨텐츠 프로젝션은 이런 경우입니다.

*   컴포넌트 엘리먼트 태그 안에 들어있는 HTML
*   컴포넌트 템플릿에서 `<ng-content>`가 사용된 부분

<div class="alert is-helpful">

AngularJS에서는 이 테크닉을 *트랜스클루전\(transclusion\)* 이라고 했습니다.

</div>

*AfterContent* 예제에서 다루는 `AfterContentInit`과 `AfterContentChecked` 후킹 함수는 Angular가 외부 컨텐츠를 컴포넌트 안에 프로젝션한 *후에* 실행됩니다.

[이전에 살펴본 *AfterView*](#afterview) 예제와 비교해 보세요.
이번에는 템플릿에 자식 뷰를 포함하는 것이 아니라 부모 컴포넌트 `AfterContentComponent`에서 받아오는 방식으로 구현했습니다.
그래서 부모 템플릿은 이렇게 구성됩니다.

<code-example header="AfterContentParentComponent (템플릿 일부)" path="lifecycle-hooks/src/app/after-content-parent.component.ts" region="parent-template"></code-example>

`<app-child>` 태그가 `<after-content>` 태그 안에 들어가 있는 것을 유심히 보세요.
*컴포넌트 안에 프로젝션하는 경우가 아니라면* 컴포넌트 엘리먼트 태그 안에는 아무것도 넣어서는 안됩니다.

이제 컴포넌트 템플릿을 봅시다.

<code-example header="AfterContentComponent (템플릿)" path="lifecycle-hooks/src/app/after-content.component.ts" region="template"></code-example>

`<ng-content>` 태그는 외부 컨텐츠가 들어갈 위치를 지정합니다.
그래서 이 경우에는 부모 컴포넌트에 사용한 `<app-child>`가 컴포넌트 안으로 프로젝션 됩니다.

<div class="lightbox">

<img alt="Projected Content" src="generated/images/guide/lifecycle-hooks/projected-child-view.png">

</div>


<a id="using-aftercontent-hooks"></a>

<!--
#### Using AfterContent hooks
-->
#### AfterContent 후킹 함수 활용하기

<!--
*AfterContent* hooks are similar to the *AfterView* hooks.
The key difference is in the child component.

*   The *AfterView* hooks concern `ViewChildren`, the child components whose element tags appear *within* the component's template
*   The *AfterContent* hooks concern `ContentChildren`, the child components that Angular projected into the component

The following *AfterContent* hooks take action based on changing values in a *content child*, which can only be reached by querying for them using the property decorated with [@ContentChild](api/core/ContentChild).

<code-example header="AfterContentComponent (class excerpts)" path="lifecycle-hooks/src/app/after-content.component.ts" region="hooks"></code-example>

<a id="no-unidirectional-flow-worries"></a>

<div class="callout is-helpful">

<header>No need to wait for content updates</header>

This component's `doSomething()` method updates the component's data-bound `comment` property immediately.
There's no need to [delay the update to ensure proper rendering](#wait-a-tick "Delaying updates").

Angular calls both *AfterContent* hooks before calling either of the *AfterView* hooks.
Angular completes composition of the projected content *before* finishing the composition of this component's view.
There is a small window between the `AfterContent...` and `AfterView...` hooks that lets you modify the host view.

</div>
-->
*AfterContent*는 *AfterView*와 비슷하게 동작합니다.
자식 컴포넌트에서 일어난다는 점만 다릅니다.

*   *AfterView*는 `ViewChildren`과 관련이 있습니다. 컴포넌트 템플릿 *안에* 사용된 자식 컴포넌트 태그에 반응합니다.
*   *AfterContent*는 `ContentChildren`과 관련이 있습니다. 컴포넌트에 프로젝션된 자식 컴포넌트에 반응합니다.

아래 예제 코드에서 *AfterContent* 후킹 함수는 *자식 컨텐츠*가 변경된 것을 감지할 때 동작합니다.
컴포넌트 클래스에서 자식 컨텐츠를 참조하려면 [@ContentChild](api/core/ContentChild) 데코레이터를 사용하면 됩니다.

<code-example header="AfterContentComponent (클래스 일부)" path="lifecycle-hooks/src/app/after-content.component.ts" region="hooks"></code-example>

<a id="no-unidirectional-flow-worries"></a>

<div class="callout is-helpful">

<header>컨텐츠가 갱신된 것은 기다릴 필요가 없습니다.</header>

컴포넌트에 정의된 `doSomething()` 메서드는 컴포넌트에 바인딩된 `comment` 프로퍼티 값을 즉시 갱신합니다.
그런데 이때는 [렌더링이 제대로 되도록 한 싸이클 기다리는 동작](#wait-a-tick "Delaying updates")을 할 필요가 없습니다.

Angular는 *AfterView*를 실행하기 전에 *AfterContent* 후킹 함수를 먼저 실행합니다.
그리고 컨텐츠 프로젝션이 마무리 되는 시점은 Angular가 컴포넌트 뷰 화면을 마무리하기 *전* 입니다.
따라서 `AfterContent...`와 `AfterView...` 후킹함수가 실행되는 타이밍 사이에 약간의 틈이 있습니다.
이 시점에 호스트 뷰에서 무언가 변경해도 정상적으로 렌더링 됩니다.

</div>


<a id="docheck"></a>
<a id="defining-custom-change-detection"></a>

<!--
## Defining custom change detection
-->
## 커스텀 변화감지 로직 정의하기

<!--
To monitor changes that occur where `ngOnChanges()` won't catch them, implement your own change check, as shown in the *DoCheck* example.
This example shows how to use the `ngDoCheck()` hook to detect and act upon changes that Angular doesn't catch on its own.

The *DoCheck* sample extends the *OnChanges* sample with the following `ngDoCheck()` hook:

<code-example header="DoCheckComponent (ngDoCheck)" path="lifecycle-hooks/src/app/do-check.component.ts" region="ng-do-check"></code-example>

This code inspects certain *values of interest*, capturing and comparing their current state against previous values.
It writes a special message to the log when there are no substantive changes to the `hero` or the `power` so you can see how often `DoCheck()` is called.
The results are illuminating.

<div class="lightbox">

<img alt="DoCheck" src="generated/images/guide/lifecycle-hooks/do-check-anim.gif">

</div>

While the `ngDoCheck()` hook can detect when the hero's `name` has changed, it is an expensive hook.
This hook is called with enormous frequency &mdash;after *every* change detection cycle no matter where the change occurred.
It's called over twenty times in this example before the user can do anything.

Most of these initial checks are triggered by Angular's first rendering of *unrelated data elsewhere on the page*.
Just moving the cursor into another `<input>` triggers a call.
Relatively few calls reveal actual changes to pertinent data.
If you use this hook, your implementation must be extremely lightweight or the user experience suffers.
-->
입력 프로퍼티 값이 변경되었지만 `ngOnChanges()`에서 감지하지 못했다면, *DoCheck* 예제에서 다룬 것처럼 직접 변화를 감지하는 로직을 작성해도 됩니다.
아래 예제를 확인해 보세요.

*DoCheck* 예제는 *OnChanges* 앱을 확장하며 `ngDoCheck()` 메서드를 추가한 것입니다:

<code-example header="DoCheckComponent (ngDoCheck())" path="lifecycle-hooks/src/app/do-check.component.ts" region="ng-do-check"></code-example>

이 코드는 *확인하고 싶은 값* 을 직접 가져와서 이전 값과 현재 값을 비교하고, `hero` 프로퍼티와 `power` 프로퍼티 값이 변경되지 않으면 변경된 내용이 없다는 메시지를 출력합니다.
이 과정은 `DoCheck()`가 실행될 때마다 반복됩니다.
실행되는 모습을 확인해 보세요.

<div class="lightbox">

<img alt="DoCheck" src="generated/images/guide/lifecycle-hooks/do-check-anim.gif">

</div>

이렇게 구현하면 `ngDoCheck()` 메서드에서 히어로의 `name` 프로퍼티가 변경된 것을 감지할 수 있지만, 이 방식은 아주 무거운 부하를 동반합니다.
`ngDoCheck()` 메서드는 꼭 필요하지 않은 변화 감지 싸이클에도 *매번* 반응하며 실행되기 때문입니다.
실제로 사용자가 아무런 동작을 하지 않아도 이 메서드는 20번 이상 실행되는 것도 확인할 수 있습니다.

이 중 대부분은 Angular가 화면을 렌더링하는 동안 *이 컴포넌트와는 상관없는 영역에서 일어난 변화* 때문에 실행된 것입니다.
심지어 마우스 커서를 `<input>` 엘리먼트로 옮기기만 해도 후킹 함수가 실행됩니다.
실제로 변화를 감지하기 위해 필요한 함수 실행은 몇 번 되지 않습니다.
그래서 이 후킹 메서드를 사용하면서 사용자에게 불편을 주지 않으려면 메서드 안에 들어가는 로직을 아주 간단하게 작성해야 합니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
