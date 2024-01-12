<!--
# The RxJS library
-->
# RxJS 라이브러리

<!--
Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change \([Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming)\).
RxJS \(Reactive Extensions for JavaScript\) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code.
See the [RxJS Docs](https://rxjs.dev/guide/overview).

RxJS provides an implementation of the `Observable` type, which is needed until the type becomes part of the language and until browsers support it.
The library also provides utility functions for creating and working with observables.
These utility functions can be used for:

*   Converting existing code for async operations into observables
*   Iterating through the values in a stream
*   Mapping values to different types
*   Filtering streams
*   Composing multiple streams
-->
반응형 프로그래밍은 비동기 프로그래밍 패러다임 중 하나로, 데이터 스트림과 데이터의 변화를 감지하는 것에 집중하는  패러다임입니다 \([Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming)\).
그리고 RxJS(Reactive Extensions for JavaScript)는 옵저버블을 활용해서 이 패러다임을 구현할 수 있도록 돕는 JavaScript 라이브러리입니다 \([RxJS Docs](http://reactivex.io/rxjs/)\).
[RxJS 문서](https://rxjs.dev/guide/overview)도 참고해 보세요.

아직까지 JavaScript와 브라우저는 옵저버블을 정식으로 지원하지 않습니다.
그래서 RxJS는 `Observable` 타입의 구현체를 라이브러리로 제공하며, 옵저버블을 생성하거나 활용하는 함수들도 함께 제공합니다.
이 함수들은 다음과 같은 용도로 사용합니다:

*   비동기 코드를 옵저버블로 변환할 때
*   이터러블 객체를 순회하면서 스트림으로 변환할 때
*   데이터를 다른 타입으로 변환할 때
*   스트림 일부만 필터링할 때
*   여러 스트림을 하나로 합쳐서 처리할 때


<a id="observable-creation-functions"></a>
<!--
## Observable creation functions
-->
## 옵저버블 생성 함수

<!--
RxJS offers a number of functions that can be used to create new observables.

These functions can simplify the process of creating observables from things such as events, timers, and promises.
For example:

<code-example header="Create an observable from a promise" path="rx-library/src/simple-creation.1.ts" region="promise"></code-example>

<code-example header="Create an observable from a counter" path="rx-library/src/simple-creation.2.ts" region="interval"></code-example>

<code-example header="Create an observable from an event" path="rx-library/src/simple-creation.3.ts" region="event"></code-example>

<code-example header="Create an observable that creates an AJAX request" path="rx-library/src/simple-creation.ts" region="ajax"></code-example>
-->
RxJS는 옵저버블을 생성하는 함수를 다양하게 제공합니다.
이 함수들은 이벤트, 타이머, 프로미스 등으로 옵저버블을 만드는 과정을 단순화한 것입니다.
이런 것들이 있습니다:

<code-example header="Promise를 옵저버블로 변환하기" path="rx-library/src/simple-creation.1.ts" region="promise"></code-example>

<code-example header="카운터를 옵저버블로 변환하기" path="rx-library/src/simple-creation.2.ts" region="interval"></code-example>

<code-example header="이벤트를 옵저버블로 변환하기" path="rx-library/src/simple-creation.3.ts" region="event"></code-example>

<code-example header="AJAX 요청을 옵저버블로 변환하기" path="rx-library/src/simple-creation.ts" region="ajax"></code-example>


### Subject 

<!--
An RxJS [`Subject`](https://rxjs.dev/guide/subject) is a popular way to create and control an observable of your own design.

A `Subject` is a special kind of `Observable`. It is special in two important respects:
1. You can push values into that `Observable` by calling its `next(value)` method.
2. It is a ["multicast"](https://rxjs.dev/guide/glossary-and-semantics#multicast) observable, which means all subscribers of a `Subject` instance receive the same values from that instance.

These aspects of `Subject` make it easy to create a [loosely coupled](https://en.wikipedia.org/wiki/Loose_coupling) message service. One part of the application can send messages through the service; other parts of the application can listen to those messages; none of the parts know about each other.

<a id="message-service"></a>

Here is a `MessageService` example:
<code-example header="MessageService" path="rx-library/src/app/message.service.ts"></code-example>

Key features:
* The `Subject` is *private*. Consumers of the service access the `Subject` through a controlled public API.
* The `messages$` property exposes the `Subject`'s *observable* aspect-only; a consumer cannot push values into the `Subject` through this observable.
* Dedicated methods (`addError` and `addWarning`) tightly manage how service consumers add values to the hidden `Subject`.
* `Subject` values are always of the `Message` type; consumers of the `messages$` observable can rely on the shape of those values.

[See below](#loosely-coupled-apps) how you can use such a service to build a loosely coupled application.
-->
옵저버블을 생성하고 자유롭게 조작할 때는 RxJS [`Subject`](https://rxjs.dev/guide/subject)를 자주 사용합니다.

`Subject`는 `Observable`의 종류 중 하나이며, 이런 점에 특화되었습니다:
1. `next(값)` 메서드를 사용해서 옵저버블로 값을 발행할 수 있습니다.
2. `Subject`는 ["멀티캐스트(multicast)"](https://rxjs.dev/guide/glossary-and-semantics#multicast) 옵저버블이기 때문에, `Subject` 인스턴스를 구독하는 모든 구독자들은 같은 값을 받습니다.

이런 특징 덕분에 `Subject`를 활용하면 [느슨하게 연결된](https://en.wikipedia.org/wiki/Loose_coupling) 메시지 서비스를 간단하게 만들 수 있습니다.
애플리케이션 한쪽에서 서비스로 메시지를 보내면 다른 부분에서 이 메시지를 받아 처리할 수 있으며, 다른 부분은 영향을 받지 않습니다.

<a id="message-service"></a>

`MessageService` 예제 코드는 이렇습니다:
<code-example header="MessageService" path="rx-library/src/app/message.service.ts"></code-example>

이 코드에서:
* `Subject`는 *private* 프로퍼티 입니다. 이 서비스를 사용하는 쪽에서는 외부로 공개된 API를 통해야 `Subject`를 활용할 수 있습니다.
* `messages$` 프로퍼티는 `Subject` 객체의 *옵저버블* 부분만 노출합니다. 그래서 `messages$` 프로퍼티를 구독하는 쪽에서는 `Subject`의 발행 기능을 사용할 수 없습니다.
* `addError()`, `addWarning()` 함수들은 서비스 안쪽에 숨겨진 `Subject` 객체를 활용하는 메서드입니다.
* `Subject`가 `messages$` 옵저버블로 보내는 값은 언제나 `Message` 타입입니다.

서비스를 이렇게 구성해서 애플리케이션 코드를 결합도 낮게 결합하는 방법은 [아래](#loosely-coupled-apps)를 참고하세요.


<a id="operators"></a>

<!--
## Operators
-->
## 연산자 (Operators)

<!--
[Operators](https://rxjs.dev/guide/operators) enable transformations of observable values. An operator is a function that takes an observable source and configuration options, manipulates the values from that source in some useful way, and returns a new observable of the transformed values. 

You can chain operators in a sequence to produce a custom observable tailored to your needs. When you subscribe to that new observable, you get the results of the intermediate transformations.

RxJS offers numerous built in operators for common use cases such as `map()`, `filter()`, `concat()`, and `mergeMap()`.

Here is a example that uses the `map` operator to square a sequence of integers:

<code-example header="Map operator" path="rx-library/src/operators.ts"></code-example>

Notice that you pass the `map` operator to the observable's `pipe` method. This is called "piping" the source observable through the operator.

You can chain multiple operators together by adding them as parameters to the `pipe` call. The following example first `filters` for the odd integers and then squares their values in the `map`. The resulting observable emits the squares of the odd integers from the source.

<code-example header="Observable.pipe function" path="rx-library/src/operators.2.ts"></code-example>

<div class="alert is-helpful">

You can create your own custom operator with the `pipe` method to encapsulate a re-usable chain of operators. The following example creates a `squareOddValues` operator and then pipes the source integers through it.

<code-example header="Standalone pipe function" path="rx-library/src/operators.1.ts"></code-example>

</div>

Think of a sequence of operators as a recipe for the final observable &mdash; as a set of instructions for producing the values you're interested in.

Remember that, by itself, the recipe doesn't do anything;
you need to call `subscribe()` to produce a result through the recipe.
-->
[연산자(Operators)](https://rxjs.dev/guide/operators)를 활용하면 옵저버블로 전달되는 값을 변환할 수 있습니다.
연산자는 옵저버블 소스를 인자로 받아서 옵저버블로 전달되는 값을 어떤 형태로 변환한 후에 새로운 옵저버블로 반환하는 함수입니다.

옵저버블을 원하는 대로 활용하기 위해 연산자 여러개를 체이닝해서 순서대로 실행할 수도 있습니다.
옵저버블을 새로 구독하게 되면 마지막으로 변환된 결과를 받습니다.

RxJS는 `map()`, `filter()`, `concat()`, `mergeMap()`과 같이 수많은 연산자들을 기본으로 제공합니다.

그 중에서 `map()` 연산자는 이렇게 사용합니다:

<code-example header="Map operator" path="rx-library/src/operators.ts"></code-example>

`map`과 같은 연산자는 옵저버블의 `pipe()` 메서드로 전달합니다.
이렇게 옵저버블에 연산자를 지정하는 것을 "파이핑(piping)"이라고도 합니다.

`pipe`를 실행하면서 연산자를 여러개 체이닝할 수 있습니다.
아래 예제는 옵저버블로 전달되는 값들을 `filters` 연산자로 홀수만 거르고, 그 후에 `map` 연산자로 제곱하는 예제 코드입니다.
그래서 옵저버블을 구독하는 쪽에서는 홀수 정수들이 제곱된 결과를 받습니다.

<code-example header="Observable.pipe function" path="rx-library/src/operators.2.ts"></code-example>

<div class="alert is-helpful">

`pipe` 메서드를 활용하면 연산자 체이닝을 캡슐화 하거나 재사용하기 위한 커스텀 연산자를 정의할 수 있습니다.
아래 코드는 위에서 살펴본 기능을 `squareOddValues` 연산자로 구현해 본 것입니다.

<code-example header="Standalone pipe function" path="rx-library/src/operators.1.ts"></code-example>

</div>

결국 연산자들을 순서대로 연결하는 것은 옵저버블을 구성하는 레시피를 작성하는 것이라고 생각할 수 있습니다.

하지만 기억하세요.
레시피만으로는 아무것도 할 수 없습니다.
레시피에서 결과를 만들어 내려면 `subscribe()` 함수를 실행해야 합니다.


<a id="loosely-coupled-apps"></a>

<!--
### Loosely coupled transformations
-->
### 느슨하게 결합하기

<!--
RxJS operators facilitate development of [loosely coupled](https://en.wikipedia.org/wiki/Loose_coupling) applications.
One part of the application can add values to an observable without knowing how the observable will be consumed or by whom.

Another part of the application can pipe operators onto that observable to transform its values into a shape it finds useful.

The `MessageService` example [described earlier](#message-service) demonstrates these points. The `AppComponent` presents the user with buttons to add messages, either of the error or warning type. The button click handlers send those messages to the service. 

<code-example header="AppComponent (excerpt)" path="rx-library/src/app/app.component.ts" region="add-messages"></code-example>

Neither the `AppComponent` nor the service know what will happen to those messages.

Elsewhere, the `MessageComponent` filters and maps the messages into separate `string` observables, one for errors and another for warnings.

<code-example header="MessageComponent (excerpt)" path="rx-library/src/app/message.component.ts" region="observables"></code-example>

The component goes on to display these observables to the user.

This ability to manipulate streams of asynchronous data in a loosely coupled way is perhaps the best use case for RxJS in your application.

<div class="alert is-helpful">

To see this messaging example in action, try <live-example name="rx-library"></live-example>.

</div>
-->
RxJS 연산자들을 활용하면 [느슨하게 결합되는](https://en.wikipedia.org/wiki/Loose_coupling) 애플리케이션을 개발할 수 있습니다.
이런 구성 방식을 따르면, 애플리케이션 한 쪽에서 옵저버블로 어떤 값을 보낼 때 보내는 쪽에서는 이 값을 누가 어떻게 처리할지 알 필요가 없습니다.

다른 쪽에서는 이 값을 받아서 파이프와 연산자로 원하는 형태로 변환해서 활용하기만 하면 됩니다.

[이전에 다뤘던](#message-service) `MessageService`가 이런 방식으로 구성되었습니다.
`AppComponent`에는 에러나 경고 메시지를 보내는 버튼들이 있습니다.
사용자가 버튼을 클릭하면 서비스로 메시지를 보냅니다.

<code-example header="AppComponent (일부)" path="rx-library/src/app/app.component.ts" region="add-messages"></code-example>

이 경우에는 `AppComponent`와 `MessageService` 모두 메시지를 보냈을 때 어떤 일이 일어날지 알지 못합니다.

대신, `MessageComponent`가 옵저버블로 전달되는 값을 필터링하고 맵핑해서 문자열 옵저버블로 에러 메시지나 경고 메시지를 처리합니다.

<code-example header="MessageComponent (일부)" path="rx-library/src/app/message.component.ts" region="observables"></code-example>

결국 화면에 메시지를 표시하는 것은 `MessageComponent`입니다.

이런 과정이 진행되는 동안 데이터는 비동기로 전달되며, 이렇게 전달되는 값이 변환되는 것도 모두 느슨한 연결관계를 갖습니다.

<div class="alert is-helpful">

실제로 동작하는 것을 확인하려면 <live-example name="rx-library"></live-example>를 참고하세요.

</div>


<!--
### Common operators
-->
### 기본 연산자

<!--
RxJS provides many operators, but only a handful are used frequently.

| Area           | Operators                                                                 |
|:---            |:---                                                                       |
| Creation       |  `from`, `fromEvent`, `of`                                                |
| Combination    | `combineLatest`, `concat`, `merge`, `startWith` , `withLatestFrom`, `zip` |
| Filtering      | `debounceTime`, `distinctUntilChanged`, `filter`, `take`, `takeUntil`     |
| Transformation | `bufferTime`, `concatMap`, `map`, `mergeMap`, `scan`, `switchMap`         |
| Utility        | `startWith`, `tap`                                                        |
| Multicasting   | `shareReplay`                                                             |

For a complete list of operators and usage samples, visit the [RxJS API Documentation](https://rxjs.dev/api).
-->
RxJS는 방대한 연산자를 제공하지만, 자주 사용하는 것들은 이런 것들이 있습니다.

| 용도    | 연산자                                                                       |
|:------|:--------------------------------------------------------------------------|
| 생성    | `from`, `fromEvent`, `of`                                                 |
| 조합    | `combineLatest`, `concat`, `merge`, `startWith` , `withLatestFrom`, `zip` |
| 필터링   | `debounceTime`, `distinctUntilChanged`, `filter`, `take`, `takeUntil`     |
| 변환    | `bufferTime`, `concatMap`, `map`, `mergeMap`, `scan`, `switchMap`         |
| 유틸리티  | `startWith`, `tap`                                                        |
| 멀티캐스팅 | `shareReplay`                                                             |

연산자 전체 목록과 예제를 확인하려면 [RxJS API 문서](https://rxjs.dev/api)를 참고하세요.


<a id="error-handling"></a>
<!--
## Error handling
-->
## 에러 처리

<!--
In addition to the `error()` handler that you provide on subscription, RxJS provides the `catchError` operator that lets you handle known errors in the observable recipe.

For instance, suppose you have an observable that makes an API request and maps the response from the server.

If the server returns an error or the value doesn't exist, an error is produced.
If you catch this error with the `catchError` operator and return an observable of a default value, your stream continues to process values rather than erroring out.

Here's an example:

<code-example header="catchError operator" path="rx-library/src/error-handling.ts"></code-example>
-->
옵저버블을 생성할 때 지정하는 `error` 핸들러와 비슷하게, RxJS에서 제공하는 `catchError` 연산자를 사용해서 에러를 처리할 수도 있습니다.

서버로 API 요청을 보내고 서버에서 온 응답을 원하는 형태로 변환하는 옵저버블이 있다고 합시다.

그리고 서버에서 에러를 반환하거나 서버가 반환한 값이 없을 때 에러가 발생한다고 합시다.
이런 경우에 에러 대신 사용할 기본값을 지정하면 옵저버블이 에러로 중단되는 상황을 방지하면서 처리 로직을 계속 실행할 수 있습니다.

이렇게 사용하면 됩니다:

<code-example header="catchError operator" path="rx-library/src/error-handling.ts"></code-example>


<!--
### Multiple Subscribers
-->
### 구독자가 여럿인 경우

<!--
Most observables are "***unicast***", which means that each new subscriber gets its own execution of that observable. Whatever is driving the source observable starts over again for the added subscriber.

The  RxJS `interval()` function in the following example produces a *unicast* observable that emits an integer every half second. 
<code-example header="unicast" path="rx-library/src/app/uni-multi-cast.component.ts" region="unicast-observable"></code-example>

Each new subscriber receives a fresh round of integers starting from zero.

>**Unicast Subscriber(s)**:<br>
>Unicast Subscriber #1 received 9<br>
>Unicast Subscriber #2 received 5<br>
>Unicast Subscriber #3 received 0

Most observables are *unicast* like `interval`. 
For example, the observable returned from Angular's [`HttpClient.get()`](guide/understanding-communicating-with-http) is *unicast*. It makes a fresh call to the server every time you subscribe to it. 

That *may* be what you intend.
But sometimes you want the same source of values to be shared with everyone who subscribes. For example, once you have asked `HttpClient.get()` to return some configuration, you probably don't want to make another request to the server the next time you subscribe; you want the same configuration that you got last time. 

You want that `HttpClient.get` observable to behave like a "***multicast***" observable.

A `Subject`, such as the one in the `MessageService`, is a *multicast* observable by design. Its subscribers always get the same, latest message.

We need to do something special to turn the *unicast* observables from `interval` and `HttpClient` into *multicast* observables. A typical solution is to add the [`shareReplay()`](https://rxjs.dev/api/index/function/shareReplay) operator to the pipe; add it to the end if you have a list of operators.

Here is `interval` again, this time with `shareReplay`:

<code-example header="multicast with shareReplay" path="rx-library/src/app/uni-multi-cast.component.ts" region="shareReplay-observable"></code-example>

<div class="alert is-helpful">

  The `bufferSize=1` option means that new subscribers receive the latest value (the buffered value) emitted previously by the observable.

  The `refCount=false` option means that if *everyone unsubscribes* and then someone new subscribes, that new subscriber gets the last emitted value.

  If `refCount` is `true` (the default), when everyone unsubscribes and then someone new subscribes, that new subscriber initiates a fresh execution of the source observable. The `interval` example will restart from zero.
  
</div>

Each new subscriber receives the same integer last emitted by the observable.

>**Multicast ShareReplay Subscriber(s)**:<br>
>ShareReplay Subscriber #1 received 9<br>
>ShareReplay Subscriber #2 received 9<br>
>ShareReplay Subscriber #3 received 9

<div class="alert is-helpful">

To see the unicast / multicast comparison in action, try <live-example name="rx-library"></live-example>.

</div>
-->
옵저버블은 대부분 "***유니캐스트(unicast)***"이기 때문에 옵저버블을 구독하는 구독자들은 독립적으로 실행되며, 옵저버블이 처음부터 보내는 값을 그대로 다시 받습니다.

아래 예제에서도 RxJS `interval()` 함수는 0.5초마다 값을 보내는 *유니캐스트* 옵저버블을 생성합니다.

<code-example header="unicast" path="rx-library/src/app/uni-multi-cast.component.ts" region="unicast-observable"></code-example>

그래서 구독자들은 구독을 시작할 때부터 0부터 시작하는 값을 받습니다.

>**Unicast Subscriber(s)**:<br>
>Unicast Subscriber #1 received 9<br>
>Unicast Subscriber #2 received 5<br>
>Unicast Subscriber #3 received 0

옵저버블은 대부분 `interval`과 비슷하게 *유니캐스트* 입니다.
Angular가 제공하는 [`HttpClient.get()`](guide/understanding-communicating-with-http)도 *유니캐스트* 옵저버블을 반환합니다.
이 함수는 매번 구독할 때마다 새로운 요청을 서버로 보냅니다.

보통은 이런 방식으로 활용하는 경우가 대부분입니다.
하지만 구독자들끼리 같은 값을 받아야 하는 경우가 있습니다.
`HttpClient.get()`으로 어떤 설정값을 받아온 후에 다른 구독자들은 이전에 받았던 값을 그대로 활용하는 경우가 이런 경우입니다.

`HttpCLient.get()`으로 만든 옵저버블을 "***멀티캐스트(multicast)***" 옵저버블로 활용하고 싶은 경우라고 할 수 있습니다.

`MessageService`에서 활용했던 `Subject` 객체는 *멀티캐스트* 옵저버블입니다.
이 객체는 언제나 구독자들에게 가장 마지막 값을 보냅니다.

`interval`이나 `HttpClient`가 제공하는 *유니캐스트* 옵저버블은 *멀티캐스트* 옵저버블로 변환할 수 있습니다.
연산자를 파이프로 연결할 때 그 마지막으로 [`shareReplay()`](https://rxjs.dev/api/index/function/shareReplay)를 추가하면 됩니다.

이렇게 사용하면 됩니다:

<code-example header="multicast with shareReplay" path="rx-library/src/app/uni-multi-cast.component.ts" region="shareReplay-observable"></code-example>

<div class="alert is-helpful">

  `bufferSize=1` 옵션은 새로운 구독자가 옵저버블의 이전값을 1개만 받도록 지정하는 옵션입니다.

  `refCount=false` 옵션은 *모든 구독자가 구독을 종료하고* 새롭게 누군가 구독했을 때 이전에 있던 값을 받도록 지정하는 옵션입니다.

  `refCount`를 `true` (기본값)으로 지정하면 모든 구독자가 구독을 종료하고 새롭게 누군가 구독했을 때 완전히 새로운 옵저버블 스트림이 시작됩니다. `interval` 예제에서는 0부터 값이 발행됩니다.
  
</div>

이렇게 구성하면 모든 구독자들은 옵저버블에서 모두 같은 값을 받습니다.

>**Multicast ShareReplay Subscriber(s)**:<br>
>ShareReplay Subscriber #1 received 9<br>
>ShareReplay Subscriber #2 received 9<br>
>ShareReplay Subscriber #3 received 9

<div class="alert is-helpful">

유니캐스트 / 멀티캐스트가 어떻게 다른지 직접 확인하려면 <live-example name="rx-library"></live-example>를 참고하세요.

</div>


<!--
### Retry failed observable
-->
### 실패한 옵저버블 재시도하기

<!--
Where the `catchError` operator provides a simple path of recovery, the `retry` operator lets you retry a failed request.

Use the `retry` operator before the `catchError` operator.
It resubscribes to the original source observable, which can then re-run the full sequence of actions that resulted in the error.
If this includes an HTTP request, it will retry that HTTP request.

The following converts the previous example to retry the request before catching the error:

<code-example header="retry operator" path="rx-library/src/retry-on-error.ts"></code-example>

<div class="alert is-helpful">

Do not retry **authentication** requests, since these should only be initiated by user action.
We don't want to lock out user accounts with repeated login requests that the user has not initiated.

</div>
-->
`catchError` 연산자는 에러가 발생한 옵저버블을 복구할 때 간단하게 사용할 수 있으며, 이번에 알아볼 `retry` 연산자는 실패한 요청을 다시 시도합니다.

`retry` 연산자는 `catchError` 를 실행하기 전에 먼저 지정합니다.
그러면 `retry` 연산자는 원래 옵저버블이 실패했을 때 옵저버블 생성을 다시 시도합니다.

아래 예제는 에러를 처리하기 전에 재시도하도록 수정한 예제 코드입니다:

<code-example header="retry 연산자" path="rx-library/src/retry-on-error.ts"></code-example>

<div class="alert is-helpful">

**사용자 인증이 필요한** 요청은 재시도하지 마세요.
이 동작은 사용자에 의해서만 수행되어야 합니다.
사용자가 요청하지 않은 상태에서 계속 로그인을 시도하면 비정상적인 공격으로 보일 수 잇습니다.

</div>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-08-25
