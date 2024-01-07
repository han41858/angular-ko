<!--
# Observables compared to other techniques
-->
# 옵저버블과 다른 방식 비교

<!--
You can often use observables instead of promises to deliver values asynchronously.
Similarly, observables can take the place of event handlers.
Finally, because observables deliver multiple values, you can use them where you might otherwise build and operate on arrays.

Observables behave somewhat differently from the alternative techniques in each of these situations, but offer some significant advantages.
Here are detailed comparisons of the differences.
-->
비동기 로직을 처리하려면 Promise대신 옵저버블을 사용할 수 있으며, 이벤트 핸들러도 옵저버블로 처리할 수 있습니다.
그리고 옵저버블은 객체 하나로 데이터를 여러번 보낼 수 있기 때문에, 데이터를 배열로 묶어서 한번에 보내는 방식보다 더 효율적입니다.

옵저버블은 Promise나 이벤트 API, 배열을 사용하는 방식과 조금 다르게 동작하지만, 옵저버블의 독특한 장점이 있습니다.
이 문서에서는 이 차이점에 대해 알아봅니다.


<!--
## Observables compared to promises
-->
## 옵저버블 vs. Promise

<!--
Observables are often compared to promises.
Here are some key differences:

*   Observable execution is deferred; computation does not start until subscription.
    Promises execute immediately on creation.
    This makes observables useful for defining recipes that can be run whenever you need the result.

*   Observables provide many values.
    Promises provide one.
    This makes observables useful for getting multiple values over time.

*   Observable values can be transformed with operators as well as in the subscription.  The rich variety of RxJS operators observables enables complex transformations that can be passed around to other parts of the system, without causing the work to be executed prematurely.
    
    Promises have `.then()` clauses which can transform values but only after the work is done.

*   Observables and Promises handle errors differently with roughly comparable efficacy.

The following sections explore these points in greater detail.
-->
옵저버블은 Promise와 자주 비교됩니다.
간단하게 살펴보면 이런 점이 다릅니다:

*   옵저버블은 명시적으로 구독하기 전까지는 실행되지 않지만, Promise는 객체를 생성할 때 바로 실행됩니다.
    데이터를 받는 쪽에서 원하는 시점을 결정하는 경우라면 옵저버블이 더 효율적입니다.

*   옵저버블은 데이터를 여러개 보낼 수 있지만, Promise는 하나만 보낼 수 있습니다.
    데이터를 여러번 나눠서 보내는 경우라면 옵저버블이 더 효율적입니다.

*   옵저버블은 체이닝과 구독을 구별하지만, Promise는 `.then()` 하나로 사용합니다.
    다른 곳에서 가져온 데이터를 복잡하게 가공해야 한다면 옵저버블이 더 효율적입니다.

*   옵저버블과 Promise는 오류를 처리하는 방식이 다르지만 효율성은 비슷합니다.

이어지는 섹션에서 자세하게 확인해 봅시다.


<!--
### Creation and subscription
-->
### 생성, 구독

<!--
*   Observables are not executed until a consumer subscribes.
    
    The `subscribe()` initiates the observable's behavior which may execute synchronously or asynchronously and could produce one, many or no values over time.

    For "unicast" observables, if you call `subscribe` again, you get a new observable execution with its own production of values.
    Calling `subscribe` on a "multicast" observable (e.g., `Subject` or an observable with the `shareReplay` operator) simply adds another *subscriber* to the already running observable.

    The `subscribe` call is the end-of-the-line. You cannot continue to manipulate values after `subscribe(...)`.

    <code-example header="src/observables.ts (observable)" path="comparing-observables/src/observables.ts" region="observable"></code-example>

*   Promises execute immediately when they are created. There is no deferred execution and, therefore, no equivalent to `subscribe()`.

    A promise is always asynchronous and can produce at most one value.
    
    There is no way to restart a promise and it retains its result value for the life of the promise.

    You can chain additional `then` clauses to a promise.

    <code-example header="src/promises.ts (promise)" path="comparing-observables/src/promises.ts" region="promise"></code-example>
-->
*   옵저버블은 구독자가 구독하기 전까지 실행되지 않습니다.

    그리고 `subscribe()`가 실행되면 스트림이 전달될 때마다 지정된 옵저버블 처리 로직을 동기/비동기로 실행하면서 하나 이상의 값을 내보냅니다.

    "유니캐스트(unicast)" 옵저버블은 `subscribe`를 다시 실행하면 옵저버블이 새롭게 실행되면서 새로운 값을 내보냅니다.
    그리고 `Subject`나 `shareReplay` 연산자가 사용된 "멀티캐스트(multicast)" 옵저버블은 `subscribe`를 다시 실행하면 기존에 실행되던 옵저버블에 구독자만 추가하는 효과를 냅니다.

    `subscribe`는 마지막에 위치합니다. `subscribe(...)` 이후에는 무언가 덧붙일 수 없습니다.

    <code-example header="src/observables.ts (옵저버블)" path="comparing-observables/src/observables.ts" region="observable"></code-example>

*   Promise는 생성되자마자 딱 한 번만 실행됩니다. `subscribe()`처럼 실행이 지연되는 경우는 없습니다.

    Promise는 언제나 비동기로 처리되며 값을 하나만 내보낼 수 있습니다.

    이미 완료된 Promise를 재시작하는 방법은 없으며, 최종 값만 유지됩니다.

    Promise는 `then`으로 체이닝할 수 있습니다.

    <code-example header="src/promises.ts (Promise)" path="comparing-observables/src/promises.ts" region="promise"></code-example>


<a id="chaining"></a>

<!--
### Transformations
-->
### 변환 작업

<!--
*   Developers can transform values both in the *subscription* and in piped *operators*. There are large number of RxJS operators to suit many complex scenarios, including numerous ways to combine and split observables.

    <code-example header="src/observables.ts (operators and multiple values)" path="comparing-observables/src/observables.ts" region="operators"></code-example>

*   Promises do not have an equivalent to `subscribe()`. You can transform the emitted value of a promise through one or more `.then` clauses. Promises have a small set of combiners (e.g., `all`, `any`, `race`).

    <code-example header="src/promises.ts (chained .then)" path="comparing-observables/src/promises.ts" region="chain"></code-example>
-->
*   옵저버블로 전달되는 값은 값을 *구독자 함수*와 중간에 체이닝한 *연산자*에서 변환할 수 있습니다. RxJS는 다양한 경우에 활용할 수 있는 연산자는 방대하게 지원합니다. 옵저버블을 조합하거나 나누는 연산자도 있습니다.

    <code-example header="src/observables.ts (값을 변환하는 연산자)" path="comparing-observables/src/observables.ts" region="operators"></code-example>

*   Promise는 `subscribe()`와 다릅니다. Promise로 전달되는 값을 변환하려면 `.then`을 사용하면 됩니다. Promise에도 `all`, `any`, `race`와 같이 값을 조합할 수 있는 연산자가 있습니다.

    <code-example header="src/promises.ts (.then 으로 체이닝하기)" path="comparing-observables/src/promises.ts" region="chain"></code-example>



<!--
### Cancellation
-->
### 취소

<!--
*   Observable subscriptions are cancellable.
    Unsubscribing removes the listener from receiving further values, and notifies the subscriber function to cancel work.

    <code-example header="src/observables.ts (unsubscribe)" path="comparing-observables/src/observables.ts" region="unsubscribe"></code-example>

*   Promises are not cancellable.
-->
*   옵저버블 구독은 취소할 수 있습니다.
    옵저버블 구독을 해지하면 옵저버블에서 전달하는 값이나 알림을 더이상 받지 않습니다.

    <code-example header="src/observables.ts (구독 취소)" path="comparing-observables/src/observables.ts" region="unsubscribe"></code-example>

*   Promise는 실행되는 도중에 취소할 수 없습니다.


<!--
### Error handling
-->
### 에러 처리

<!--
*   Observable execution errors can be handled with the `catchError()` operator or in the `subscribe`.

    `catchError` can put the observable back on the normal path where it continues to produce values or it can rethrow the error. An uncaught error unsubscribes all subscribers.

    <code-example header="src/observables.ts (error)" path="comparing-observables/src/observables.ts" region="error"></code-example>

*   Promise errors can be handled with a `.catch()` or in the second argument of a `.then()`.

    <code-example header="src/promises.ts (error)" path="comparing-observables/src/promises.ts" region="error"></code-example>
-->
*   옵저버블에서 발생하는 에러는 `catchError()` 연산자나 `subscribe` 함수에서 처리할 수 있습니다.

    `catchError` 연산자 안에서는 에러가 발생한 옵저버블을 정상 옵저버블로 변환하여 반환하거나 그대로 에러 스트림으로 반환할 수 있습니다. 처리되지 않은 에러는 모든 구독자에게 전달되며 구독을 종료됩니다.

    <code-example header="src/observables.ts (error)" path="comparing-observables/src/observables.ts" region="error"></code-example>

*   Promise는 `.catch()` 함수로 에러를 처리하거나, `.then()`의 두 번째 인자로 처리합니다.

    <code-example header="src/promises.ts (error)" path="comparing-observables/src/promises.ts" region="error"></code-example>


<!--
### Cheat sheet
-->
### 치트 시트

<!--
The following code snippets illustrate how the same kind of operation is defined using observables and promises.

| Operation   | Observable                                                                                                                                                           | Promise |
|:---         |:---                                                                                                                                                                  |:---     |
| Creation    | <code-example format="typescript" hideCopy language="typescript"> new Observable((observer) =&gt; { &NewLine;&nbsp; observer.next(123); &NewLine;}); </code-example> | <code-example format="typescript" hideCopy language="typescript"> new Promise((resolve, reject) =&gt; { &NewLine;&nbsp; resolve(123); &NewLine;}); </code-example> |
| Transform   | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(map((value) =&gt; value &ast; 2));</pre>                                                  | <code-example format="typescript" hideCopy language="typescript"> promise.then((value) =&gt; value &ast; 2);</code-example>                                        |
| Subscribe   | <code-example format="typescript" hideCopy language="typescript"> sub = obs.subscribe((value) =&gt; { &NewLine;&nbsp; console.log(value) &NewLine;});</code-example> | <code-example format="typescript" hideCopy language="typescript"> promise.then((value) =&gt; { &NewLine;&nbsp; console.log(value); &NewLine;}); </code-example>    |
| Unsubscribe | <code-example format="typescript" hideCopy language="typescript"> sub.unsubscribe();</code-example>                                                                  | Implied by promise resolution.                                                                                                                                     |
-->
각 상황에서 옵저버블과 Promise가 어떻게 다른지 확인해 봅시다.

| 동작    | 옵저버블                                                                                                                                                                 | Promise |
|:------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---     |
| 생성    | <code-example format="typescript" hideCopy language="typescript"> new Observable((observer) =&gt; { &NewLine;&nbsp; observer.next(123); &NewLine;}); </code-example> | <code-example format="typescript" hideCopy language="typescript"> new Promise((resolve, reject) =&gt; { &NewLine;&nbsp; resolve(123); &NewLine;}); </code-example> |
| 변환    | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(map((value) =&gt; value &ast; 2));</pre>                                                  | <code-example format="typescript" hideCopy language="typescript"> promise.then((value) =&gt; value &ast; 2);</code-example>                                        |
| 구독    | <code-example format="typescript" hideCopy language="typescript"> sub = obs.subscribe((value) =&gt; { &NewLine;&nbsp; console.log(value) &NewLine;});</code-example> | <code-example format="typescript" hideCopy language="typescript"> promise.then((value) =&gt; { &NewLine;&nbsp; console.log(value); &NewLine;}); </code-example>    |
| 구독 해지 | <code-example format="typescript" hideCopy language="typescript"> sub.unsubscribe();</code-example>                                                                  | Implied by promise resolution.                                                                                                                                     |


<!--
## Observables compared to events API
-->
## 옵저버블 vs. 이벤트 API

<!--
Observables are very similar to event handlers that use the events API.
Both techniques define notification handlers, and use them to process multiple values delivered over time.
Subscribing to an observable is equivalent to adding an event listener.
One significant difference is that you can configure an observable to transform an event before passing the event to the handler.

Using observables to handle events and asynchronous operations can have the advantage of greater consistency in contexts such as HTTP requests.

Here are some code samples that illustrate how the same kind of operation is defined using observables and the events API.

|                             | Observable                                                                                                                                                                                                                                                                                                                                                      | Events API |
|:---                         |:---                                                                                                                                                                                                                                                                                                                                                             |:---        |
| Creation &amp; cancellation | <code-example format="typescript" hideCopy language="typescript"> // Setup &NewLine;const clicks&dollar; = fromEvent(buttonEl, 'click'); &NewLine;// Begin listening &NewLine;const subscription = clicks&dollar; &NewLine;&nbsp; .subscribe(e =&gt; console.log('Clicked', e)) &NewLine;// Stop listening &NewLine;subscription.unsubscribe(); </code-example> | <code-example format="typescript" hideCopy language="typescript">function handler(e) { &NewLine;&nbsp; console.log('Clicked', e); &NewLine;} &NewLine;// Setup &amp; begin listening &NewLine;button.addEventListener('click', handler); &NewLine;// Stop listening &NewLine;button.removeEventListener('click', handler); </code-example> |
| Subscription                | <code-example format="typescript" hideCopy language="typescript">observable.subscribe(() =&gt; { &NewLine;&nbsp; // notification handlers here &NewLine;});</code-example>                                                                                                                                                                                      | <code-example format="typescript" hideCopy language="typescript">element.addEventListener(eventName, (event) =&gt; { &NewLine;&nbsp; // notification handler here &NewLine;}); </code-example>                                                                                                                                             |
| Configuration               | Listen for keystrokes, but provide a stream representing the value in the input. <code-example format="typescript" hideCopy language="typescript"> fromEvent(inputEl, 'keydown').pipe( &NewLine;&nbsp; map(e =&gt; e.target.value) &NewLine;); </code-example>                                                                                                  | Does not support configuration. <code-example format="typescript" hideCopy language="typescript"> element.addEventListener(eventName, (event) =&gt; { &NewLine;&nbsp; // Cannot change the passed Event into another &NewLine;&nbsp; // value before it gets to the handler &NewLine;}); </code-example>                                   |
-->
옵저버블은 이벤트 API를 활용하는 이벤트 핸들러와 아주 비슷합니다.
두 방식은 모두 핸들러를 지정해서 이벤트를 처리하며, 데이터가 여러번 계속 전달된다는 점도 같습니다.
사실 옵저버블을 구독하는 것은 엘리먼트에 이벤트 리스너를 연결하는 것과 비슷합니다.
다른 점을 꼽아보자면, 옵저버블은 이벤트 핸들러가 이벤트를 받기 전에 옵저버블 연산자를 사용해서 다른 형태로 변환할 수 있습니다.

그리고 옵저버블로 이벤트를 처리하거나 비동기 로직을 처리하는 방식은 컨텍스트를 계속 유지해야 하는 경우에 좀 더 유리합니다.
HTTP 요청이 이런 경우에 해당됩니다.

각 상황에서 옵저버블과 이벤트 API가 어떻게 다른지 확인해 봅시다.

|                     | 옵저버블                                                                                                                                                                                                                                                                                                                                                                        | 이벤트 API                                                                                                                                                                                                                                                                                                                                              |
|:--------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 생성 &amp; 취소         | <code-example format="typescript" hideCopy language="typescript"> // 옵저버블을 정의합니다. &NewLine;const clicks&dollar; = fromEvent(buttonEl, 'click'); &NewLine;// 구독을 시작합니다. &NewLine;const subscription = clicks&dollar; &NewLine;&nbsp; .subscribe(e =&gt; console.log('Clicked', e)) &NewLine;// 구독을 종료합니다. &NewLine;subscription.unsubscribe(); </code-example> | <code-example format="typescript" hideCopy language="typescript">function handler(e) { &NewLine;&nbsp; console.log('Clicked', e); &NewLine;} &NewLine;// 이벤트 리스너를 설정하고 감지하기 시작합니다. &NewLine;button.addEventListener('click', handler); &NewLine;// 이벤트 추적을 중단합니다. &NewLine;button.removeEventListener('click', handler); </code-example> |
| 구독                  | <code-example format="typescript" hideCopy language="typescript">observable.subscribe(() =&gt; { &NewLine;&nbsp; // notification handlers here &NewLine;});</code-example>                                                                                                                                                                                                  | <code-example format="typescript" hideCopy language="typescript">element.addEventListener(eventName, (event) =&gt; { &NewLine;&nbsp; // notification handler here &NewLine;}); </code-example>                                                                                                                                                       |
| 데이터 변환 | 키입력에 반응하지만 입력 필드의 데이터를 반환합니다. <code-example format="typescript" hideCopy language="typescript"> fromEvent(inputEl, 'keydown').pipe( &NewLine;&nbsp; map(e =&gt; e.target.value) &NewLine;); </code-example>                                                                                                                                                                 | 데이터 변환을 지원하지 않습니다. <code-example format="typescript" hideCopy language="typescript"> element.addEventListener(eventName, (event) =&gt; { &NewLine;&nbsp; // 이벤트 핸들러가 이벤트 객체를 받기 전에 &NewLine;&nbsp; // 다른 형태로 변환할 수 없습니다. &NewLine;}); </code-example>                                                                                                |


<!--
## Observables compared to arrays
-->
## 옵저버블 vs. 배열

<!--
An observable produces values over time.
An array is created as a static set of values.
In a sense, observables are asynchronous where arrays are synchronous.
In the following examples, <code>&rarr;</code> implies asynchronous value delivery.

| Values        | Observable                                                                                                                                                                                                                                           | Array                                                                                                                                                                                                                |
|:---           |:---                                                                                                                                                                                                                                                  |:---                                                                                                                                                                                                                 |
| Given         | <code-example format="typescript" hideCopy language="typescript"> obs: &rarr;1&rarr;2&rarr;3&rarr;5&rarr;7 </code-example> <code-example format="typescript" hideCopy language="typescript"> obsB: &rarr;'a'&rarr;'b'&rarr;'c' </code-example>       | <code-example format="typescript" hideCopy language="typescript"> arr: [1, 2, 3, 5, 7] </code-example> <code-example format="typescript" hideCopy language="typescript"> arrB: ['a', 'b', 'c'] </code-example>      |
| `concat()`    | <code-example format="typescript" hideCopy language="typescript"> concat(obs, obsB) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;1&rarr;2&rarr;3&rarr;5&rarr;7&rarr;'a'&rarr;'b'&rarr;'c' </code-example> | <code-example format="typescript" hideCopy language="typescript"> arr.concat(arrB) </code-example> <code-example format="typescript" hideCopy language="typescript"> [1,2,3,5,7,'a','b','c'] </code-example>        |
| `filter()`    | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(filter((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;5&rarr;7 </code-example>                                | <code-example format="typescript" hideCopy language="typescript"> arr.filter((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> [5, 7] </code-example>             |
| `find()`      | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(find((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;5 </code-example>                                         | <code-example format="typescript" hideCopy language="typescript"> arr.find((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> 5 </code-example>                    |
| `findIndex()` | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(findIndex((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;3 </code-example>                                    | <code-example format="typescript" hideCopy language="typescript"> arr.findIndex((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> 3 </code-example>               |
| `forEach()`   | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(tap((v) =&gt; { &NewLine; &nbsp; console.log(v); &NewLine; })) &NewLine; 1 &NewLine; 2 &NewLine; 3 &NewLine; 5 &NewLine; 7 </code-example>                                | <code-example format="typescript" hideCopy language="typescript"> arr.forEach((v) =&gt; { &NewLine; &nbsp; console.log(v); &NewLine; }) &NewLine; 1 &NewLine; 2 &NewLine; 3 &NewLine; 5 &NewLine; 7 </code-example> |
| `map()`       | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(map((v) =&gt; -v)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;-1&rarr;-2&rarr;-3&rarr;-5&rarr;-7 </code-example>             | <code-example format="typescript" hideCopy language="typescript"> arr.map((v) =&gt; -v) </code-example> <code-example format="typescript" hideCopy language="typescript"> [-1, -2, -3, -5, -7] </code-example>      |
| `reduce()`    | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(reduce((s,v)=&gt; s+v, 0)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;18 </code-example>                                     | <code-example format="typescript" hideCopy language="typescript"> arr.reduce((s,v) =&gt; s+v, 0) </code-example> <code-example format="typescript" hideCopy language="typescript"> 18 </code-example>               |
-->
옵저버블은 데이터를 여러번 전달하지만, 배열은 데이터를 한 번에 묶어서 전달합니다.
그래서 옵저버블은 비동기이며 배열은 동기라고 볼 수도 있습니다.
예제를 확인해 보세요.

|               | 옵저버블                                                                                                                                                                                                                                                 | 배열                                                                                                                                                                                                                  |
|:--------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 데이터           | <code-example format="typescript" hideCopy language="typescript"> obs: &rarr;1&rarr;2&rarr;3&rarr;5&rarr;7 </code-example> <code-example format="typescript" hideCopy language="typescript"> obsB: &rarr;'a'&rarr;'b'&rarr;'c' </code-example>       | <code-example format="typescript" hideCopy language="typescript"> arr: [1, 2, 3, 5, 7] </code-example> <code-example format="typescript" hideCopy language="typescript"> arrB: ['a', 'b', 'c'] </code-example>      |
| `concat()`    | <code-example format="typescript" hideCopy language="typescript"> concat(obs, obsB) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;1&rarr;2&rarr;3&rarr;5&rarr;7&rarr;'a'&rarr;'b'&rarr;'c' </code-example> | <code-example format="typescript" hideCopy language="typescript"> arr.concat(arrB) </code-example> <code-example format="typescript" hideCopy language="typescript"> [1,2,3,5,7,'a','b','c'] </code-example>        |
| `filter()`    | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(filter((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;5&rarr;7 </code-example>                                | <code-example format="typescript" hideCopy language="typescript"> arr.filter((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> [5, 7] </code-example>             |
| `find()`      | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(find((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;5 </code-example>                                         | <code-example format="typescript" hideCopy language="typescript"> arr.find((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> 5 </code-example>                    |
| `findIndex()` | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(findIndex((v) =&gt; v&gt;3)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;3 </code-example>                                    | <code-example format="typescript" hideCopy language="typescript"> arr.findIndex((v) =&gt; v&gt;3) </code-example> <code-example format="typescript" hideCopy language="typescript"> 3 </code-example>               |
| `forEach()`   | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(tap((v) =&gt; { &NewLine; &nbsp; console.log(v); &NewLine; })) &NewLine; 1 &NewLine; 2 &NewLine; 3 &NewLine; 5 &NewLine; 7 </code-example>                                | <code-example format="typescript" hideCopy language="typescript"> arr.forEach((v) =&gt; { &NewLine; &nbsp; console.log(v); &NewLine; }) &NewLine; 1 &NewLine; 2 &NewLine; 3 &NewLine; 5 &NewLine; 7 </code-example> |
| `map()`       | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(map((v) =&gt; -v)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;-1&rarr;-2&rarr;-3&rarr;-5&rarr;-7 </code-example>             | <code-example format="typescript" hideCopy language="typescript"> arr.map((v) =&gt; -v) </code-example> <code-example format="typescript" hideCopy language="typescript"> [-1, -2, -3, -5, -7] </code-example>      |
| `reduce()`    | <code-example format="typescript" hideCopy language="typescript"> obs.pipe(reduce((s,v)=&gt; s+v, 0)) </code-example> <code-example format="typescript" hideCopy language="typescript"> &rarr;18 </code-example>                                     | <code-example format="typescript" hideCopy language="typescript"> arr.reduce((s,v) =&gt; s+v, 0) </code-example> <code-example format="typescript" hideCopy language="typescript"> 18 </code-example>               |

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-08-25
