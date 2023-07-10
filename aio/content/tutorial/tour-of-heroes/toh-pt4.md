<!--
# Add services
-->
# 서비스 추가하기

<!--
The Tour of Heroes `HeroesComponent` is getting and displaying fake data.

Refactoring the `HeroesComponent` focuses on supporting the view and
making it easier to unit-test with a mock service.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
`HeroesComponent`가 표시하는 데이터는 아직 가짜 데이터입니다.

이번 튜토리얼에서는 `HeroesComponent`가 화면을 표시하는 로직에만 집중하도록 가볍게 리팩토링해 봅시다.
이렇게 수정하면 목 서비스를 사용할 수 있기 때문에 컴포넌트에 유닛 테스트를 적용하기도 쉬워집니다.

<div class="alert is-helpful">

이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Why services
-->
## 왜 서비스를 사용할까요?

<!--
Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data.
They should focus on presenting data and delegate data access to a service.

This tutorial creates a `HeroService` that all application classes can use to get heroes.
Instead of creating that service with the [`new` keyword](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/new), use the [*dependency injection*](guide/dependency-injection) that Angular supports to inject it into the `HeroesComponent` constructor.

Services are a great way to share information among classes that *don't know each other*.
Create a `MessageService` next and inject it in these two places.

*   Inject in `HeroService`, which uses the service to send a message
*   Inject in `MessagesComponent`, which displays that message, and also displays the ID when the user clicks a hero
-->
컴포넌트는 데이터를 직접 가져오거나 직접 저장하도록 요청하지 않는 것이 좋습니다. 그리고 사용하는 데이터가 실제 데이터인지 가짜 데이터인지 알 필요도 없습니다.
컴포넌트는 데이터를 표시하는 것에만 집중하는 것이 좋으며, 데이터를 처리하는 로직은 서비스에게 맡겨두는 것이 좋습니다.

이 튜토리얼에서는 히어로의 데이터를 처리하는 `HeroService`를 만들어 봅니다.
그런데 이 서비스는 [`new` 키워드](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/new)로 인스턴스를 직접 생성하지 않습니다.
이 서비스는 Angular가 제공하는 [*의존성 주입*](guide/dependency-injection) 메커니즘에 따라 `HeroesComponent`의 생성자로 주입될 것입니다.

여러 클래스에 사용되는 정보를 공유하려면 서비스를 사용하는 방법이 가장 좋습니다.
`MessageService`를 만들고 다음 두 곳에 이 서비스를 주입해서 활용해 봅시다:

*   `HeroService`가 메시지를 보낼 때 사용합니다.
*   이 메시지는 `MessagesComponent`가 받아서 화면에 표시합니다.


<!--
## Create the `HeroService`
-->
## `HeroService` 생성하기

<!--
Run `ng generate` to create a service called `hero`.

<code-example format="shell" language="shell">

ng generate service hero

</code-example>

The command generates a skeleton `HeroService` class in `src/app/hero.service.ts` as follows:

<code-example header="src/app/hero.service.ts (new service)" path="toh-pt4/src/app/hero.service.1.ts" region="new"></code-example>
-->
`ng generate` 명령을 실행해서 `hero` 서비스를 생성합니다.

<code-example format="shell" language="shell">

ng generate service hero

</code-example>

이 명령을 실행하면 `src/app/hero.service.ts` 파일에 `HeroService` 클래스가 다음과 같이 생성됩니다:

<code-example header="src/app/hero.service.ts (새로 만든 서비스)" path="toh-pt4/src/app/hero.service.1.ts" region="new"></code-example>


<!--
### `@Injectable()` services
-->
### `@Injectable()` 서비스

<!--
Notice that the new service imports the Angular `Injectable` symbol and annotates the class with the `@Injectable()` decorator. This marks the class as one that participates in the *dependency injection system*.
The `HeroService` class is going to provide an injectable service, and it can also have its own injected dependencies.
It doesn't have any dependencies yet.

The `@Injectable()` decorator accepts a metadata object for the service, the same way the `@Component()` decorator did for your component classes.
-->
Angular CLI로 만든 서비스 클래스에는 `Injectable` 심볼이 로드되어 `@Injectable()` 데코레이터로 사용되었습니다.
이 구문은 이 클래스가 *의존성 주입 시스템* 에 포함되는 클래스라고 선언하는 구문입니다.
그래서 `HeroService` 클래스는 의존성으로 주입될 수 있으며 이 클래스도 의존성을 주입받을 수 있습니다.
아직까지는 이 클래스에 주입되는 의존성 객체가 없습니다.

`@Injectable()` 데코레이터는 서비스를 정의하는 메타데이터 객체를 인자로 받습니다.
`@Component()` 데코레이터에 메타데이터를 사용했던 것과 같은 방식입니다.


<!--
### Get hero data
-->
### 히어로 데이터 가져오기

<!--
The `HeroService` could get hero data from anywhere such as a web service, local storage, or a mock data source.

Removing data access from components means you can change your mind about the implementation anytime, without touching any components.
They don't know how the service works.

The implementation in *this* tutorial continues to deliver *mock heroes*.

Import the `Hero` and `HEROES`.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="import-heroes"></code-example>

Add a `getHeroes` method to return the *mock heroes*.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.1.ts" region="getHeroes"></code-example>
-->
`HeroService`는 &mdash;웹 서비스나 로컬 스토리지, 목 데이터 소스 등&mdash; 어디에서든 히어로 데이터를 가져올 수 있습니다.

컴포넌트에서 데이터에 접근하는 로직을 제거하면 컴포넌트는 데이터를 표시하는 목적에만 집중할 수 있으며, 데이터를 가져오는 곳이 변경되더라도 컴포넌트가 이 내용을 신경쓰지 않아도 됩니다.

이 문서에서는 이전과 마찬가지로 *목 데이터* 를 가져오도록 구현해 봅시다.

`HeroService`에 `Hero` 심볼과 `HEROES` 배열을 로드합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="import-heroes"></code-example>

그리고 *목 히어로 데이터* 를 반환하는 `getHeroes` 메소드를 추가합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.1.ts" region="getHeroes"></code-example>


<a id="provide"></a>

<!--
## Provide the `HeroService`
-->
## `HeroService` 등록하기

<!--
You must make the `HeroService` available to the dependency injection system before Angular can *inject* it into the `HeroesComponent` by registering a *provider*.
A provider is something that can create or deliver a service. In this case, it instantiates the `HeroService` class to provide the service.

To make sure that the `HeroService` can provide this service, register it with the *injector*. The *injector* is the object that chooses and injects the provider where the application requires it.

By default, `ng generate service` registers a provider with the *root injector* for your service by including provider metadata, that's `providedIn: 'root'` in the `@Injectable()` decorator.

<code-example format="typescript" language="typescript">

@Injectable({
  providedIn: 'root',
})

</code-example>

When you provide the service at the root level, Angular creates a single, shared instance of `HeroService` and injects into any class that asks for it.
Registering the provider in the `@Injectable` metadata also allows Angular to optimize an application by removing the service if it isn't used.

<div class="alert is-helpful">

To learn more about providers, see the [Providers section](guide/providers).
To learn more about injectors, see the [Dependency Injection guide](guide/dependency-injection).

</div>

The `HeroService` is now ready to plug into the `HeroesComponent`.

<div class="alert is-important">

This is an interim code sample that allows you to provide and use the `HeroService`.
At this point, the code differs from the `HeroService` in the [final code review](#final-code-review).

</div>
-->
`HeroService`를 `HeroesComponent`에 *의존성으로 주입* 하려면 이 서비스의 *프로바이더\(provider\)* 가 Angular 의존성 주입 시스템에 등록되어야 합니다.
프로바이더는 서비스를 생성하고 전달하는 방식을 정의한 것입니다.
이 예제에서는 서비스 클래스가 `HeroService`의 프로바이더입니다.

서비스 프로바이더는 *인젝터\(injector\)* 에 등록됩니다.
인젝터는 의존성 주입 요청이 있었던 객체를 적절하게 고르고 생성하는 역할을 합니다.

`ng generate service` 명령을 실행하면 이 서비스의 `@Injectable()` 데코레이터에 `providedIn: 'root'`를 지정해서 서비스 프로바이더를 *최상위 인젝터* 에 등록합니다.

<code-example format="typescript" language="typescript">

@Injectable({
providedIn: 'root',
})

</code-example>

서비스가 최상위 인젝터에 등록되면 Angular는 `HeroService`의 인스턴스를 하나만 생성하며, 이 클래스가 주입되는 모든 곳에서 같은 인스턴스를 공유합니다.
그리고 `@Injectable()` 데코레이터는 이 데코레이터가 등록된 클래스가 실제로 사용되지 않으면 이 클래스를 최종 빌드 결과물에서 제거하는 대상으로 등록하는 역할도 합니다.

<div class="alert is-helpful">

프로바이더에 대해 자세하게 알아보려면 [프로바이더](guide/providers) 문서를 참고하세요.
인젝터에 대해 자세하게 알아보려면 [Angular의 의존성 주입](guide/dependency-injection) 문서를 참고하세요.

</div>

`HeroService`는 이제 `HeroesComponent`에 주입할 준비가 되었습니다.

<div class="alert is-important">

지금까지 작성한 코드는 `HeroService`를 프로바이더로 등록하기 위한 임시 코드입니다.
[최종코드 리뷰](#final-code-review)와는 조금 다릅니다.

</div>


<!--
## Update `HeroesComponent`
-->
## `HeroesComponent` 수정하기

<!--
Open the `HeroesComponent` class file.

Delete the `HEROES` import, because you won't need that anymore.
Import the `HeroService` instead.

<code-example header="src/app/heroes/heroes.component.ts (import HeroService)" path="toh-pt4/src/app/heroes/heroes.component.ts" region="hero-service-import"></code-example>

Replace the definition of the `heroes` property with a declaration.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts" region="heroes"></code-example>
-->
`HeroesComponent` 클래스 파일을 엽니다.

이 파일에서 `HEROES`를 로드했던 부분을 제거하고 `HeroService`를 로드합니다.

<code-example header="src/app/heroes/heroes.component.ts (HeroService 로드하기)" path="toh-pt4/src/app/heroes/heroes.component.ts" region="hero-service-import"></code-example>

그리고 `heroes` 프로퍼티 값을 할당하는 부분을 다음과 같이 수정합니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts" region="heroes"></code-example>


<a id="inject"></a>

<!--
### Inject the `HeroService`
-->
### `HeroService` 주입하기

<!--
Add a private `heroService` parameter of type `HeroService` to the constructor.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="ctor"></code-example>

The parameter simultaneously defines a private `heroService` property and identifies it as a `HeroService` injection site.

When Angular creates a `HeroesComponent`, the [Dependency Injection](guide/dependency-injection) system sets the `heroService` parameter to the singleton instance of `HeroService`.
-->
생성자에 `HeroService` 타입의 `heroService` 인자를 선언하고 이 인자를 `private`으로 지정합니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="ctor"></code-example>

이렇게 작성하면 `heroService` 인자를 클래스 프로퍼티로 선언하면서 `HeroService` 타입의 의존성 객체가 주입되기를 요청한다는 것을 의미합니다.

그러면 Angular가 `HeroesComponent`를 생성할 때 [의존성 주입](guide/dependency-injection) 시스템이 `HeroService`의 인스턴스를 찾아서 `heroService` 라는 인자로 전달할 것입니다.


<!--
### Add `getHeroes()`
-->
### `getHeroes()` 추가하기

<!--
Create a method to retrieve the heroes from the service.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="getHeroes"></code-example>
-->
서비스에서 히어로 목록을 받아오는 메소드를 정의합니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="getHeroes"></code-example>


<a id="oninit"></a>

<!--
### Call it in `ngOnInit()`
-->
### `ngOnInit()`에서 서비스 호출하기

<!--
While you could call `getHeroes()` in the constructor, that's not the best practice.

Reserve the constructor for minimal initialization such as wiring constructor parameters to properties.
The constructor shouldn't *do anything*.
It certainly shouldn't call a function that makes HTTP requests to a remote server as a *real* data service would.

Instead, call `getHeroes()` inside the [*ngOnInit lifecycle hook*](guide/lifecycle-hooks) and let Angular call `ngOnInit()` at an appropriate time *after* constructing a `HeroesComponent` instance.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts" region="ng-on-init"></code-example>
-->
서비스에 구현한 `getHeroes()` 함수는 컴포넌트 클래스에서도 호출할 수 있지만, 이 방법은 최선이 아닙니다.

컴포넌트의 생성자는 생성자로 받은 인자를 클래스 프로퍼티로 연결하는 정도로 간단하게 유지하는 것이 좋습니다.
생성자에는 이 외의 로직이 *들어가지 않는 것이 좋습니다*.
리모트 서버로 HTTP 요청을 보내는 로직도 물론 들어가지 않는 것이 좋습니다.

`getHeroes()` 함수는 [*ngOnInit 라이프싸이클 후킹 함수*](guide/lifecycle-hooks)에서 실행하는 것이 좋습니다.
`ngOnInit()` 함수는 Angular가 `HeroesComponent`의 인스턴스를 생성한 *직후에* 실행되는 함수입니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts" region="ng-on-init"></code-example>


<!--
### See it run
-->
### 동작 확인하기

<!--
After the browser refreshes, the application should run as before, showing a list of heroes and a hero detail view when you click a hero name.
-->
브라우저가 갱신되고 나면 앱이 이전과 동일하게 동작할 것입니다.
화면에 히어로의 목록이 표시되고, 사용자가 히어로 중 하나의 이름을 클릭하면 해당 히어로의 상세정보도 화면에 표시됩니다.


<!--
## Observable data
-->
## 옵저버블 데이터

<!--
The `HeroService.getHeroes()` method has a *synchronous signature*, which implies that the `HeroService` can fetch heroes synchronously.
The `HeroesComponent` consumes the `getHeroes()` result as if heroes could be fetched synchronously.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="get-heroes"></code-example>

This approach won't work in a real application that uses asynchronous calls.
It works now because your service synchronously returns *mock heroes*.

If `getHeroes()` can't return immediately with hero data, it shouldn't be
synchronous, because that would block the browser as it waits to return data.

`HeroService.getHeroes()` must have an *asynchronous signature* of some kind.

In this tutorial, `HeroService.getHeroes()` returns an `Observable` so that it can
use the Angular `HttpClient.get` method to fetch the heroes
and have [`HttpClient.get()`](guide/http) return an `Observable`.
-->
위에서 작성한 `HeroService.getHeroes()` 메소드는 *동기 방식으로 동작하기 때문에*, 이 함수의 실행 결과는 바로 반환됩니다.
그래서 `HeroesComponent`의 `heroes` 프로퍼티에 값이 할당될 때도 동기 방식으로 할당됩니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="get-heroes"></code-example>

하지만 실제로 운영되는 앱에서 이런 방식을 사용하는 경우는 별로 없습니다.
지금 작성한 코드는 *목 데이터* 를 가져오기 때문에 유효한 것입니다.

그래서 `HeroService.getHeroes()`는 서버의 응답을 기다려야 하며, 히어로 데이터를 즉시 반환할 수 없습니다.
함수의 실행은 서버의 응답이 올 때까지 기다리지 않고 바로 종료됩니다.

이런 경우에는 `HeroService.getHeroes()` 함수가 *비동기로 동작해야* 합니다.

비동기 동작은 콜백 함수를 사용해서 처리할 수 있습니다. `Promise`를 반환하도록 처리할 수도 있습니다. 그리고 `Observable`을 반환할 수도 있습니다.

이 튜토리얼에서는 `HeroService.getHeroes()` 함수가 `Observable`을 반환하도록 구현해 봅시다.
Angular가 제공하는 [`HttpClient.get` 메소드는 `Observable`을 반환하기 때문에](guide/http) 이렇게 구현하는 것이 가장 자연스럽습니다.


<a id="observable-heroservice"></a>
<!--
### Observable `HeroService`
-->
### 옵저버블 `HeroService`

<!--
`Observable` is one of the key classes in the [RxJS library](https://rxjs.dev).

In [the tutorial on HTTP](tutorial/tour-of-heroes/toh-pt6), you can see how Angular's `HttpClient` methods return RxJS `Observable` objects.
This tutorial simulates getting data from the server with the RxJS `of()` function.

Open the `HeroService` file and import the `Observable` and `of` symbols from RxJS.

<code-example header="src/app/hero.service.ts (Observable imports)" path="toh-pt4/src/app/hero.service.ts" region="import-observable"></code-example>

Replace the `getHeroes()` method with the following:

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="getHeroes-1"></code-example>

`of(HEROES)` returns an `Observable<Hero[]>` that emits  *a single value*, the array of mock heroes.

<div class="alert is-helpful">

The [HTTP tutorial](tutorial/tour-of-heroes/toh-pt6) shows you how to call `HttpClient.get<Hero[]>()`, which also returns an `Observable<Hero[]>` that emits  *a single value*, an array of heroes from the body of the HTTP response.

</div>
-->
`Observable`은 [RxJS 라이브러리](https://rxjs.dev/)가 제공하는 클래스 중 가장 중요한 클래스입니다.

[이후에 HTTP에 대해서 알아볼 때](tutorial/tour-of-heroes/toh-pt6) Angular의 `HttpClient` 클래스가 제공하는 메소드는 모두 RxJS가 제공하는 `Observable` 타입을 반환한다는 것을 다시 한 번 살펴볼 것입니다.
이 튜토리얼에서는 리모트 서버를 사용하지 않고 RxJS의 `of()` 함수로 데이터를 즉시 반환해 봅시다.

<code-example header="src/app/hero.service.ts (Observable 심볼 로드하기)" path="toh-pt4/src/app/hero.service.ts" region="import-observable"></code-example>

`getHeroes()` 메소드를 다음과 같이 수정합니다:

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="getHeroes-1"></code-example>

`of(HEROES)`는 히어로 목 데이터를 `Observable<Hero[]>` 타입으로 *한번에* 반환합니다.

<div class="alert is-helpful">

이후에 살펴볼 [HTTP 튜토리얼](tutorial/tour-of-heroes/toh-pt6)에서도 `HttpClient.get<Hero[]>`는 이번 예제와 동일하게 `Observable<Hero[]>` 타입을 반환하기 때문에, HTTP 응답으로 받은 히어로의 데이터 배열은 _한번에_ 반환됩니다.

</div>


<!--
### Subscribe in `HeroesComponent`
-->
### `HeroesComponent` 에서 옵저버블 구독하기

<!--
The `HeroService.getHeroes` method used to return a `Hero[]`.
Now it returns an `Observable<Hero[]>`.

You need to adjust your application to work with that change to `HeroesComponent`.

Find the `getHeroes` method and replace it with the following code. the new code is shown side-by-side with the current version for comparison.

<code-tabs>
    <code-pane header="heroes.component.ts (Observable)" path="toh-pt4/src/app/heroes/heroes.component.ts" region="getHeroes"></code-pane>
    <code-pane header="heroes.component.ts (Original)" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="getHeroes"></code-pane>
</code-tabs>

`Observable.subscribe()` is the critical difference.

The previous version assigns an array of heroes to the component's `heroes` property.
The assignment occurs *synchronously*, as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.

That *won't work* when the `HeroService` is actually making requests of a remote server.

The new version waits for the `Observable` to emit the array of heroes, which could happen now or several minutes from now.
The `subscribe()` method passes the emitted array to the callback,
which sets the component's `heroes` property.

This asynchronous approach *works* when the `HeroService` requests heroes from the server.
-->
이전까지 `HeroService.getHeroes` 메소드는 `Hero[]` 타입을 반환했지만 이제는 `Observable<Hero[]>` 타입을 반환합니다.

그래서 `HeroesComponent`의 내용을 조금 수정해야 합니다.

`getHeroes` 메소드를 실행했던 부분을 찾아서 다음과 같이 변경합니다.
이전에 작성했던 코드와 비교해 보세요.

<code-tabs>
    <code-pane header="heroes.component.ts (옵저버블을 사용하는 코드)" path="toh-pt4/src/app/heroes/heroes.component.ts" region="getHeroes"></code-pane>
    <code-pane header="heroes.component.ts (기존 코드)" path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="getHeroes"></code-pane>
</code-tabs>

`Observable.subscribe()`를 사용한 부분이 가장 중요합니다.

이전 버전에서는 히어로의 데이터를 배열로 가져와서 컴포넌트의 `heroes` 프로퍼티에 직접 할당했습니다.
이 동작은 *동기 방식으로* 동작하기 때문에 서비스가 데이터를 즉시 반환하거나 서버의 응답이 동기 방식으로 전달될 때에만 제대로 동작합니다.

하지만 `HeroService`는 리모트 서버에 요청을 보내는 방식으로 동작하는 경우에는 이 로직이 제대로 *동작하지 않습니다*.

수정한 버전의 코드는 서비스의 함수가 `Observable` 타입을 반환하는데, 반환 시점은 함수를 실행한 직후일 수도 있고 몇 분이 지난 후일 수도 있습니다.
서버의 응답이 언제 도착하는지와 관계없이, 이 응답이 도착했을 때 `subscribe`가 서버에서 받은 응답을 콜백 함수로 전달하고, 컴포넌트는 이렇게 받은 히어로 데이터를 `heroes` 프로퍼티에 할당합니다.

`HeroService`가 실제로 서버에 요청을 보낸다면 이렇게 비동기 방식으로 구현해야 *제대로 동작합니다*.


<!--
## Show messages
-->
## 메시지 표시하기

<!--
This section guides you through the following:

*   Adding a `MessagesComponent` that displays application messages at the bottom of the screen
*   Creating an injectable, application-wide `MessageService` for sending messages to be displayed
*   Injecting `MessageService` into the `HeroService`
*   Displaying a message when `HeroService` fetches heroes successfully
-->
이번 섹션에서는 다음 내용에 대해 다룹니다.

*   애플리케이션에서 발생하는 메시지를 화면 아래쪽에 표시하기 위해 `MessagesComponent`를 추가해 봅니다.
*   앱 전역 범위에 의존성으로 주입할 수 있는 `MessageService`를 만들고, 이 서비스로 메시지를 보내봅니다.
*   `MessageService`를 `HeroService`에 주입해 봅니다.
*   `HeroService`가 서버에서 가져온 히어로 데이터를 화면에 표시해 봅니다.


<!--
### Create `MessagesComponent`
-->
### `MessagesComponent` 생성하기

<!--
Use `ng generate` to create the `MessagesComponent`.

<code-example format="shell" language="shell">

ng generate component messages

</code-example>

`ng generate` creates the component files in the `src/app/messages` directory and declares the `MessagesComponent` in `AppModule`.

Edit the `AppComponent` template to display the `MessagesComponent`.

<code-example header="src/app/app.component.html" path="toh-pt4/src/app/app.component.html"></code-example>

You should see the default paragraph from `MessagesComponent` at the bottom of the page.
-->
Angular CLI로 다음 명령을 실행해서 `MessagesComponent`를 생성합니다.

<code-example format="shell" language="shell">

ng generate component messages

</code-example>

`ng generate` 명령을 실행하면 `src/app/messages` 폴더에 컴포넌트 파일들을 생성하고 `AppModule`에 `MessagesComponent`를 자동으로 등록할 것입니다.

이렇게 만든 `MessagesComponent`를 화면에 표시하기 위해 `AppComponent` 템플릿을 다음과 같이 수정합니다.

<code-example header="src/app/app.component.html" path="toh-pt4/src/app/app.component.html"></code-example>

브라우저가 갱신되면 화면 아래쪽에 `MessagesComponent`가 표시되는 것을 확인할 수 있습니다.


<!--
### Create the `MessageService`
-->
### `MessageService` 생성하기

<!--
Use `ng generate` to create the `MessageService` in `src/app`.

<code-example format="shell" language="shell">

ng generate service message

</code-example>

Open `MessageService` and replace its contents with the following.

<code-example header="src/app/message.service.ts" path="toh-pt4/src/app/message.service.ts"></code-example>

The service exposes its cache of `messages` and two methods:

* One to `add()` a message to the cache.
* Another to `clear()` the cache.
-->
`src/app` 폴더에서 `ng generate` 명령을 실행해서 `MessageService`를 생성합니다.

<code-example format="shell" language="shell">

ng generate service message

</code-example>

그리고 이렇게 만든 `MessageService` 파일을 열어서 다음 내용으로 수정합니다.

<code-example header="src/app/message.service.ts" path="toh-pt4/src/app/message.service.ts"></code-example>

이 서비스는 `messages` 프로퍼티에 메시지를 캐싱하는데, `add()` 메소드는 프로퍼티에 메시지를 추가하고 `clear()` 메소드는 캐시를 비우는 역할을 합니다.

<a id="inject-message-service"></a>

<!--
### Inject it into the `HeroService`
-->
### `HeroService`에 의존성으로 주입하기

<!--
In `HeroService`, import the `MessageService`.

<code-example header="src/app/hero.service.ts (import MessageService)" path="toh-pt4/src/app/hero.service.ts" region="import-message-service"></code-example>

Edit the constructor with a parameter that declares a private `messageService` property.
Angular injects the singleton `MessageService` into that property when it creates the `HeroService`.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="ctor"></code-example>

<div class="alert is-helpful">

This is an example of a typical *service-in-service* scenario in which
you inject the `MessageService` into the `HeroService` which is injected into the `HeroesComponent`.

</div>
-->
`HeroService` 파일을 다시 열고 `MessageService`를 로드합니다.

<code-example header="src/app/hero.service.ts (MessageService 로드하기)" path="toh-pt4/src/app/hero.service.ts" region="import-message-service"></code-example>

그리고 `HeroService`의 생성자를 수정해서 `messageService` 프로퍼티를 `private`으로 선언하도록 합니다.
그러면 `HeroService`가 생성될 때 Angular가 `MessageService`의 싱글턴 인스턴스를 의존성으로 주입할 것입니다.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="ctor"></code-example>

<div class="alert is-helpful">

"*서비스 안에 서비스*"가 존재하는 경우는 이렇게 구현합니다.
`MessageService`는 `HeroService`에 의존성으로 주입되고, `HeroService`는 다시 `HeroesComponent`에 의존성으로 주입됩니다.

</div>


<!--
### Send a message from `HeroService`
-->
### `HeroService`에서 메시지 보내기

<!--
Edit the `getHeroes()` method to send a message when the heroes are fetched.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="getHeroes"></code-example>
-->
`getHeroes()` 메소드에서 히어로 데이터를 받아온 뒤에 메시지를 보내도록 다음과 같이 수정합니다.

<code-example header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts" region="getHeroes"></code-example>


<!--
### Display the message from `HeroService`
-->
### `HeroService`에서 받은 메시지 표시하기

<!--
The `MessagesComponent` should display all messages, including the message sent by the `HeroService` when it fetches heroes.

Open `MessagesComponent` and import the `MessageService`.

<code-example header="src/app/messages/messages.component.ts (import MessageService)" path="toh-pt4/src/app/messages/messages.component.ts" region="import-message-service"></code-example>

Edit the constructor with a parameter that declares a **public** `messageService` property.
Angular injects the singleton `MessageService` into that property when it creates the `MessagesComponent`.

<code-example header="src/app/messages/messages.component.ts" path="toh-pt4/src/app/messages/messages.component.ts" region="ctor"></code-example>

The `messageService` property **must be public** because you're going to bind to it in the template.

<div class="alert is-important">

Angular only binds to *public* component properties.

</div>
-->
`MessagesComponent`는 `HeroService`가 서버에서 히어로 데이터를 가져왔을 때 보냈던 메시지와 같이, `MessagesService`가 받은 모든 메시지를 표시하려고 합니다.

`MessagesComponent`를 열어서 `MessageService`를 로드합니다.

<code-example header="src/app/messages/messages.component.ts (MessageService 로드하기)" path="toh-pt4/src/app/messages/messages.component.ts" region="import-message-service"></code-example>

`MessagesComponent`의 생성자를 수정해서 `messageService` 프로퍼티를 **public**으로 할당하도록 다음과 같이 수정합니다.
이렇게 작성하면 Angular가 `MessagesComponent`의 인스턴스를 생성할 때 `MessageService`의 싱글턴 인스턴스를 이 프로퍼티로 전달할 것입니다.

<code-example header="src/app/messages/messages.component.ts" path="toh-pt4/src/app/messages/messages.component.ts" region="ctor"></code-example>

이 때 `messageService` 프로퍼티는 템플릿에 바인딩되기 때문에 반드시 **public으로 선언해야** 합니다.

<div class="alert is-important">

Angular에서는 *public* 으로 선언된 컴포넌트 프로퍼티만 바인딩할 수 있습니다.

</div>


<!--
### Bind to the `MessageService`
-->
### `MessageService` 바인딩하기

<!--
Replace the `MessagesComponent` template created by `ng generate` with the following.

<code-example header="src/app/messages/messages.component.html" path="toh-pt4/src/app/messages/messages.component.html"></code-example>

This template binds directly to the component's `messageService`.

|                                              | Details |
|:---                                          |:---     |
| `*ngIf`                                      | Only displays the messages area if there are messages to show. |
| `*ngFor`                                     | Presents the list of messages in repeated `<div>` elements.    |
| Angular [event binding](guide/event-binding) | Binds the button's click event to `MessageService.clear()`.    |

The messages look better after you add the private CSS styles to `messages.component.css` as listed in one of the ["final code review"](#final-code-review) tabs below.
-->
`ng generate` 명령을 실행해서 생성한 `MessagesComponent`의 템플릿을 다음과 같이 수정합니다.

<code-example header="src/app/messages/messages.component.html" path="toh-pt4/src/app/messages/messages.component.html"></code-example>

이 템플릿은 컴포넌트에 의존성으로 주입된 `messageService`를 직접 바인딩합니다.

|                                        | 설명                                                      |
|:---------------------------------------|:--------------------------------------------------------|
| `*ngIf`                                | 메시지가 존재할 때만 컴포넌트의 내용을 표시하기 위해 `*ngIf`를 사용했습니다.          |
| `*ngFor`                               | 리스트에 존재하는 메시지마다 `<div>` 엘리먼트를 반복하기 위해 `*ngFor`를 사용했습니다. |
| Angular [이벤트 바인딩](guide/event-binding) | 버튼을 클릭했을 때 `MessageService.clear()` 함수를 실행합니다.          |

이 메시지는 컴포넌트 CSS 파일 `messages.component.css`에서 스타일을 지정하면 좀 더 보기 좋게 표시할 수 있습니다.
[최종 코드 리뷰](#final-code-review) 탭에서 스타일이 지정된 모습을 확인해 보세요.


<!--
## Add MessageService to HeroesComponent
-->
## HeroesComponent로 메시지 보내기

<!--
The following example shows how to display a history of each time the user clicks on a hero.
This helps when you get to the next section on [Routing](tutorial/tour-of-heroes/toh-pt5).

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts"></code-example>

Refresh the browser to see the list of heroes, and scroll to the bottom to see the messages from the HeroService.
Each time you click a hero, a new message appears to record the selection.
Use the **Clear messages** button to clear the message history.
-->
사용자가 히어로를 클릭할 때마다 어떤 히어로를 선택했는지 기록을 남기려면 다음과 같은 코드를 추가하면 됩니다.
이 내용은 다음 섹션인 [라우팅](tutorial/tour-of-heroes/toh-pt5)에서 활용해 봅시다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts"></code-example>

브라우저를 새로고침하면 히어로 목록이 화면에 표시됩니다.
그리고 이 화면에서 스크롤을 화면 끝까지 내리면 HeroService가 보낸 메시지를 확인할 수 있습니다.
이 메시지 목록은 사용자가 히어로를 클릭할 때마다 추가되며, "Clear messages" 버튼을 누르면 기록을 지울 수 있습니다.


<a id="final-code-review"></a>

<!--
## Final code review
-->
## 최종코드 리뷰

<!--
Here are the code files discussed on this page.

<code-tabs>
    <code-pane header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts"></code-pane>
    <code-pane header="src/app/message.service.ts" path="toh-pt4/src/app/message.service.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/messages/messages.component.ts" path="toh-pt4/src/app/messages/messages.component.ts"></code-pane>
    <code-pane header="src/app/messages/messages.component.html" path="toh-pt4/src/app/messages/messages.component.html"></code-pane>
    <code-pane header="src/app/messages/messages.component.css" path="toh-pt4/src/app/messages/messages.component.css"></code-pane>
    <code-pane header="src/app/app.module.ts" path="toh-pt4/src/app/app.module.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt4/src/app/app.component.html"></code-pane>
</code-tabs>
-->
이 문서에서 다룬 코드의 내용은 다음과 같습니다.

<code-tabs>
    <code-pane header="src/app/hero.service.ts" path="toh-pt4/src/app/hero.service.ts"></code-pane>
    <code-pane header="src/app/message.service.ts" path="toh-pt4/src/app/message.service.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt4/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/messages/messages.component.ts" path="toh-pt4/src/app/messages/messages.component.ts"></code-pane>
    <code-pane header="src/app/messages/messages.component.html" path="toh-pt4/src/app/messages/messages.component.html"></code-pane>
    <code-pane header="src/app/messages/messages.component.css" path="toh-pt4/src/app/messages/messages.component.css"></code-pane>
    <code-pane header="src/app/app.module.ts" path="toh-pt4/src/app/app.module.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt4/src/app/app.component.html"></code-pane>
</code-tabs>

<!--
## Summary
-->
## 정리

<!--
*   You refactored data access to the `HeroService` class.
*   You registered the `HeroService` as the *provider* of its service at the root level so that it can be injected anywhere in the application.
*   You used [Angular Dependency Injection](guide/dependency-injection) to inject it into a component.
*   You gave the `HeroService` `get data` method an asynchronous signature.
*   You discovered `Observable` and the RxJS `Observable` library.
*   You used RxJS `of()` to return `Observable<Hero[]>`, an observable of mock heroes.
*   The component's `ngOnInit` lifecycle hook calls the `HeroService` method, not the constructor.
*   You created a `MessageService` for loosely coupled communication between classes.
*   The `HeroService` injected into a component is created with another injected service, `MessageService`.
-->
*   컴포넌트가 데이터를 직접 가져오는 방식을 `HeroService` 클래스가 제공하는 방식으로 변경했습니다.
*   *프로바이더* 를 사용해서 `HeroService`를 최상위 인젝터에 등록했습니다.
*   `HeroService`를 컴포넌트에 의존성으로 주입하기 위해 [Angular의 의존성 주입](guide/dependency-injection) 시스템을 사용했습니다.
*   `HeroService`에서 비동기 방식으로 데이터를 가져오는 메소드를 구현했습니다.
*   RxJS가 제공하는 `Observable`에 대해 간단하게 알아봤습니다.
*   히어로 목 데이터 `Observable<Hero[]>`를 반환할 때 RxJS가 제공하는 `of()` 함수를 사용했습니다.
*   컴포넌트가 `HeroService`를 활용하는 로직은 컴포넌트 생성자가 아니라 `ngOnInit` 라이프싸이클 후킹 함수에 구현했습니다.
*   클래스끼리 데이터를 주고받지만 결합도를 낮추기 위해 `MessageService`를 만들었습니다.
*   `HeroService`는 컴포넌트에 의존성으로 주입되지만 또 다른 서비스인 `MessageService`를 의존성으로 주입받기도 합니다.


@reviewed 2022-02-28
