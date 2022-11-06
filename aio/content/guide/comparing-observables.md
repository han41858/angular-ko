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

*   Observables are declarative; computation does not start until subscription.
    Promises execute immediately on creation.
    This makes observables useful for defining recipes that can be run whenever you need the result.

*   Observables provide many values.
    Promises provide one.
    This makes observables useful for getting multiple values over time.

*   Observables differentiate between chaining and subscription.
    Promises only have `.then()` clauses.
    This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

*   Observables `subscribe()` is responsible for handling errors.
    Promises push errors to the child promises.
    This makes observables useful for centralized and predictable error handling.
-->
옵저버블은 Promise와 자주 비교됩니다.
간단하게 살펴보면 다음과 같은 점이 다릅니다:

*   옵저버블은 명시적으로 구독하기 전까지는 실행되지 않지만, Promise는 객체를 생성할 때 바로 실행됩니다.
    데이터를 받는 쪽에서 원하는 시점을 결정하는 경우라면 옵저버블이 더 효율적입니다.

*   옵저버블은 데이터를 여러개 보낼 수 있지만, Promise는 하나만 보낼 수 있습니다.
    데이터를 여러번 나눠서 보내는 경우라면 옵저버블이 더 효율적입니다.

*   옵저버블은 체이닝과 구독을 구별하지만, Promise는 `.then()` 하나로 사용합니다.
    다른 곳에서 가져온 데이터를 복잡하게 가공해야 한다면 옵저버블이 더 효율적입니다.

*   옵저버블에서 제공하는 `subscribe()`는 에러도 함께 처리할 수 있습니다.
    Promise는 `.catch()`를 사용하는 위치에 따라 에러를 처리하는 로직이 달라져야 하지만, 옵저버블은 에러 처리 로직을 한 군데에 집중할 수 있습니다.


<!--
### Creation and subscription
-->
### 생성, 구독

<!--
*   Observables are not executed until a consumer subscribes.
    The `subscribe()` executes the defined behavior once, and it can be called again.
    Each subscription has its own computation.
    Resubscription causes recomputation of values.

    <code-example header="src/observables.ts (observable)" path="comparing-observables/src/observables.ts" region="observable"></code-example>

*   Promises execute immediately, and just once.
    The computation of the result is initiated when the promise is created.
    There is no way to restart work.
    All `then` clauses \(subscriptions\) share the same computation.

    <code-example header="src/promises.ts (promise)" path="comparing-observables/src/promises.ts" region="promise"></code-example>
-->
*   옵저버블은 구독자가 구독하기 전까지 실행되지 않습니다.
    그리고 `subscribe()`가 실행되면 스트림이 전달될 때마다 지정된 옵저버블 처리 로직을 실행합니다.
    옵저버블은 구독될 때마다 새로운 실행 컨텍스트를 생성하며, 이 때마다 옵저버블이 처음부터 다시 실행됩니다.

    <code-example header="src/observables.ts (옵저버블)" path="comparing-observables/src/observables.ts" region="observable"></code-example>

*   Promise는 생성되자마자 딱 한 번만 실행됩니다.
    Promise에 지정된 로직도 Promise가 생성될 때 한 번만 실행되며, 이 로직을 다시 실행하는 방법은 없습니다.
    Promise에서 체이닝하는 `then`은 모두 같은 객체를 공유합니다.

    <code-example header="src/promises.ts (Promise)" path="comparing-observables/src/promises.ts" region="promise"></code-example>


<!--
### Chaining
-->
### 체이닝

<!--
*   Observables differentiate between transformation function such as a map and subscription.
    Only subscription activates the subscriber function to start computing the values.

    <code-example header="src/observables.ts (chain)" path="comparing-observables/src/observables.ts" region="chain"></code-example>

*   Promises do not differentiate between the last `.then` clauses \(equivalent to subscription\) and intermediate `.then` clauses \(equivalent to map\).

    <code-example header="src/promises.ts (chain)" path="comparing-observables/src/promises.ts" region="chain"></code-example>
-->
*   옵저버블은 데이터를 조작하는 것과 구독하는 것을 구별합니다.
    옵저버블은 구독자가 있을 때만 옵저버블 로직을 실행합니다.

    <code-example header="src/observables.ts (체이닝)" path="comparing-observables/src/observables.ts" region="chain"></code-example>

*   Promise는 구독을 의미하는 마지막 `.then`과 데이터 조작을 의미하는 중간 `.then`을 구분하지 않습니다.

    <code-example header="src/promises.ts (체이닝)" path="comparing-observables/src/promises.ts" region="chain"></code-example>




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
*   Observable execution errors are delivered to the subscriber's error handler, and the subscriber automatically unsubscribes from the observable.

    <code-example header="src/observables.ts (error)" path="comparing-observables/src/observables.ts" region="error"></code-example>

*   Promises push errors to the child promises.

    <code-example header="src/promises.ts (error)" path="comparing-observables/src/promises.ts" region="error"></code-example>
-->
*   옵저버블은 구독자의 에러 핸들러 함수에서 에러를 처리하며, 에러가 발생하면 구독자가 자동으로 구독을 해지합니다.

    <code-example header="src/observables.ts (error)" path="comparing-observables/src/observables.ts" region="error"></code-example>

*   Promise는 자식 Promise를 생성하고 이 객체에 에러를 보냅니다.

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

@reviewed 2022-02-28
