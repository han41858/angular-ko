<a id="using-observables-to-pass-values"></a>

<!--
# Using observables for streams of values
-->
# 연속해서 전달되는 데이터를 옵저버블로 처리하기

<!--
Observables are a technique for event handling, asynchronous programming, and handling multiple values emitted over time.

The observer pattern is a software design pattern in which an object, called the *subject*, maintains a list of its dependents, called *observers*, and notifies them automatically of state changes.
This pattern is similar \(but not identical\) to the [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) design pattern.

Angular apps tend to use the [RxJS library for Observables](https://rxjs.dev/). This overview covers just the basics of observables as implemented by that library.
-->
옵저버블은 이벤트 처리, 비동기 프로그래밍, 여러 값을 연달아 처리할 때 사용합니다.

옵저버 패턴은 *옵저버\(observer\)* 라는 의존성 객체들의 목록을 관리하고, 이 옵저버가 *구독\(subject\)* 하고 있다가 상태가 변화하는 것을 감지하는 소프트웨어 디자인 패턴입니다.
[구독/발행](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) 디자인 패턴과 비슷하지만 동일하지는 않습니다.

Angular 앱은 [RxJS 라이브러리](https://rxjs.dev/)를 활용합니다.
이 라이브러리를 어떻게 활용하는지 간단하게 알아봅시다.


<!--
## Basic usage and terms
-->
## 용어 정의, 사용 방법

<!--
Observables are declarative.  You define a function for publishing values &mdash; the *source* &mdash; but that function is not executed until a consumer subscribes to the observable by calling the observable's `subscribe` method.

This *subscriber* then receives notifications from the observable until it completes, emits an error, or the consumer unsubscribes.

An observable can deliver multiple values of any type &mdash; literals, messages, or events &mdash; depending on the context. A stream of keystrokes, an HTTP response, and the ticks of an interval timer are among the typical observable sources. The observable API applies consistently across all of these diverse sources.

An observable can emit one, many, or no values while subscribed. It can emit synchronously (emit the first value immediately) or asynchronously (emit values over time).

Because setup and teardown logic are both handled by the observable, your application code only needs to worry about subscribing to consume values and unsubscribing when done.

[RxJS *Operators*](guide/rx-library#operators) enable transformations of observable values. An *Operator* takes an observable source, manipulates the values from that source in some useful way, and returns a new observable of the transformed values. When you subscribe to that new observable, you get the results of the intermediate transformations.

This ability to progressively transform observable values - and even combine multiple observable sources into a consolidated observable - is one of the most powerful and appealing of RxJS features.

Accordingly, observables are used extensively within Angular applications and within Angular itself. 

<div class="alert is-helpful">

To be fair, RxJS has a steep learning curve and sometimes bewildering behavior. Use them judiciously.

</div>
-->
옵저버블은 명확하게 선언하는 방식으로 사용합니다.
값을 발행하는 함수는 *소스\(source\)* 라고 하는데, 이 함수는 누군가 이 옵저버블을 구독하는 쪽에서 옵저버블의 `subscribe()` 메서드를 실행해야 실행됩니다.

옵저버블이 전달하는 값을 받는 객체를 *구독자\(subscriber\)* 라고 하며, 구독자는 옵저버블이 종료되거나 에러가 발생할 때, 구독을 종료할 때까지 옵저버블이 보내는 값을 계속 받습니다.

옵저버블은 기본 자료형, 메시지, 이벤트 등 다양한 종류의 값을 여러번 보낼 수 있습니다.
그래서 연속된 키 입력, HTTP 응답, 타이머가 주기적으로 실행되는 것은 옵저버블을 활용하기 좋은 예입니다.
옵저버블 API를 활용하면 소스가 다양하더라도 로직을 일관되게 작성할 수 있습니다.

옵저버블은 값을 하나 이상, 필요하다면 아무 값도 발행하지 않을 수 있습니다.
그리고 첫번째 값은 동기 방식으로 즉시 보낸다고 한다면, 이후 값들은 비동기로 보낸다고 할 수 있습니다.

옵저버블을 생성하고 처리하는 로직은 옵저버블이 제공하는 방식을 활용하면 되기 때문에, 애플리케이션 코드에서는 이 옵저버블을 구독하고 그 이후에 받는 값을 어떻게 활용할 지, 원하는 값을 받고 난 후에는 어떻게 구독을 종료할지 고민하면 됩니다.

옵저버블로 전달되는 값은 [RxJS *연산자*](guide/rx-library#operators)로 처리합니다.
이 *연산자* 는 옵저버블 소스를 받아서 이 옵저버블이 전달하는 값을 원하는 대로 변환한 후에 새로운 옵저버블로 전달합니다.
옵저버블을 새로 구독하는 구독자는 변환된 값을 그대로 받을 수 있습니다.

옵저버블로 전달되는 값을 단계적으로 변환하거나, 여러 옵저버블 소스를 하나로 조합하는 기능은 RxJS가 제공하는 강력한 기능 중에서도 특히 흥미롭습니다.

그래서 Angular와 Angular 애플리케이션은 모두 옵저버블을 다양하게 활용합니다. 

<div class="alert is-helpful">

솔직히 얘기하자면, RxJS를 학습하는 러닝 커브는 조금 가파르며, 동작하는 방식을 예상하기 어려울 수 있습니다.
신중하게 도입을 검토하세요.

</div>


<!--
## Observable
-->
## 옵저버블(Observable)

<!--
An observable is an object that can emit one or more values over time.

Here's a simple observable that will emit `1`, then `2`, then `3`, and then completes.

<code-example header="An observable emitting 3 integers" path="observables/src/subscribing.ts" region="observable"></code-example>

<div class="alert is-helpful">

The RxJS method, `of(...values)`, creates an `Observable` instance that synchronously delivers each of the values provided as arguments. 

</div>
-->
옵저버블은 하나 이상의 값을 여러 시간에 걸쳐 발행하는 객체입니다.

`1`, `2`, `3` 값을 전달하고 종료되는 옵저버블이라면 이렇습니다.

<code-example header="An observable emitting 3 integers" path="observables/src/subscribing.ts" region="observable"></code-example>

<div class="alert is-helpful">

RxJS가 제공하는 `of(...값)` 메서드는 `Observable` 인스턴스를 생성하고 인자로 전달한 값을 동기 방식으로 전달합니다.

</div>


<!--
### Naming conventions for observables
-->
### 옵저버블 명명 규칙

<!--
Notice the "&dollar;" on the end of the observable name. The "&dollar;" signifies that the variable is an observable "&dollar;tream" of values.

This is a widely adopted naming convention for observables. 

Not everyone likes it. Because Angular applications are written in TypeScript and code editors are good at revealing an object's type, you can usually tell  when a variable is an observable. Many feel the "&dollar;" suffix is unnecessary and potentially misleading.

On the other hand, the trailing "&dollar;" can help you quickly identify observables when scanning the code. Also, if you want a property to hold the most recent value emitted from an observable, it can be convenient to use the source observable's root name without the "&dollar;".

The Angular framework and tooling do not enforce this convention. Feel free to use it or not.
-->
옵저버블의 이름에는 뒤에 "&dollar;"를 붙입니다.
이 때 "&dollar;"는 옵저버블 스트림("&dollar;"tream)을 의미합니다.

보통은 옵저버블 이름을 이렇게 붙입니다. 

하지만 반드시 그래야 하는 것은 아닙니다.
Angular 애플리케이션은 TypeScript로 구현하며, 요즘 코드 에디터들은 객체의 타입을 명확하게 구분할 수 있기 때문에 어떤 변수가 옵저버블 타입인지는 바로 확인할 수 있습니다.
그래서 "&dollar;" 접미사는 필요하지 않으며 오히려 헷갈린다는 의견도 있습니다.

하지만 어떤 변수 이름에 "&dollar;"가 붙었다면, 코드를 훑어보는 중이라도 이 변수가 옵저버블이라는 것을 빠르게 확인할 수 있습니다.
그리고 옵저버블로 전달받은 값 중 가장 최근에 받은 값을 변수에 저장해두려면, 옵저버블로 선언한 변수 이름 뒤에 "&dollar;"만 생략하면 일관성도 유지할 수 있습니다.

Angular는 이 규칙을 강제하지는 않습니다.
마음에 드는 대로 사용하세요 :)


<!--
## Subscribing
-->
## 구독(subscribing)

<!--
An observable begins publishing values only when someone subscribes to it. That "1-2-3" observable won't emit any numbers until you subscribe by calling the observable's `subscribe()` method.

If you want to begin publishing but don't care about the values or when it completes, you can call subscribe with no arguments at all

<code-example header="Start publishing" path="observables/src/subscribing.ts" region="no-params"></code-example>

You're more likely interested in doing something with the values. Pass in a method - called a "next" handler - that does something every time the observable emits a value.

<code-example header="Subscribe to emitted values" path="observables/src/subscribing.ts" region="next-param"></code-example>

Passing a `next()` function into `subscribe` is a convenient syntax for this most typical case. If you also need to know when the observable emits an error or completes, you'll have to pass in an `Observer` instead.
-->
옵저버블은 누군가 옵저버블을 구독할 때 값을 발행하기 시작합니다.
그래서 "1-2-3"라는 값을 발행하도록 설정된 옵저버블도 누군가 옵저버블의 `subscribe()` 메서드를 실행해서 구독하지 않는 한 값을 내보내지 않습니다.

값을 확인하거나 옵저버블이 종료되는 것을 신경쓸 필요 없이 단순하게 옵저버블을 시작하고 싶은 경우라면 아무 인자 없이 `subscribe()` 메서드를 실행하면 됩니다.

<code-example header="Start publishing" path="observables/src/subscribing.ts" region="no-params"></code-example>

보통은 옵저버블이 전달하는 값으로 무언가 하고 싶은 경우가 대부분입니다.
그렇다면 `next` 핸들러를 사용해서 옵저버블이 보내는 값을 처리할 수 있습니다.

<code-example header="Subscribe to emitted values" path="observables/src/subscribing.ts" region="next-param"></code-example>

`subscribe()`를 실행하면서 `next()` 함수를 함께 전달하는 방법은 옵저버블을 활용하는 방법 중 가장 간단한 방법입니다.
이보다 복잡하게 옵저버블에서 발생하는 에러나 옵저버블이 종료되는 것을 처리하려면 `Observer` 객체를 사용해야 합니다.


<!--
## Defining observers
-->
## 옵저버 정의하기

<!--
An observable has three types of notifications: "next", "error", and "complete".

An `Observer` is an object whose properties contain handlers for these notifications.

| Notification type | Details |
|:---               |:---     |
| `next`            | A handler for each delivered value. Called zero or more times after execution starts.                                                           |
| `error`           | A handler for an error notification. An error halts execution of the observable instance and unsubscribes.                                                       |
| `complete`        | A handler for the execution-complete notification. Do not expect `next` or `error` to be called again. Automatically unsubscribes. |

Here is an example of passing an observer object to `subscribe`:

<code-example header="Subscribe with full observer object" path="observables/src/subscribing.ts" region="object-param"></code-example>

<div class="alert is-helpful">

Alternatively, you can create the `Observer` object with functions named `next()`, `error()` and `complete()`. 

<code-example path="observables/src/subscribing.ts" region="object-with-fns"></code-example>

This works because JavaScript turns the function names into the property names.

</div>

All of the handler properties are optional.
If you omit a handler for one of these properties, the observer ignores notifications of that type.
-->
옵저버블은 세 종류 알림을 처리합니다: "next", "error", "complete"

`Observer`는 이 세 종류 알림을 처리하는 핸들러로 이루어진 객체입니다.

| 알림 종류      | 설명                                                                                      |
|:-----------|:----------------------------------------------------------------------------------------|
| `next`     | 옵저버블로 전달되는 값을 처리합니다. 옵저버블 구독이 시작된 후 한번도 실행되지 않을 수 있고, 여러번 실행될 수도 있습니다.                  |
| `error`    | 옵저버블에서 에러가 발생한 것을 처리합니다. 옵저버블에서 에러가 발생하면 옵저버블 인스턴스가 종료되며 구독도 종료됩니다.                     |
| `complete` | 옵저버블이 종료된 것을 처리합니다. 이 핸들러가 실행되고 나면 `next`나 `error`는 더이상 실행되지 않습니다. 옵저버블 구독은 자동으로 종료됩니다. |

`subscribe()`에 옵저버를 전달하려면 이렇게 실행하면 됩니다:

<code-example header="Subscribe with full observer object" path="observables/src/subscribing.ts" region="object-param"></code-example>

<div class="alert is-helpful">

`Observer` 객체를 명시적으로 생성하는 대신 `next()`, `error()`, `complete()`로 이루어진 객체를 사용해도 됩니다. 

<code-example path="observables/src/subscribing.ts" region="object-with-fns"></code-example>

JavaScript는 함수 이름을 프로퍼티 이름으로 변혼하기 때문에 문제없이 동작합니다.

</div>

모든 핸들러 프로퍼티는 생략할 수 있습니다.
핸들러 프로퍼티를 생략하면, 옵저버는 해당 알림을 처리하지 않습니다.


<!--
## Error handling
-->
## 에러 처리

<!--
Because observables can produce values asynchronously, try/catch will not effectively catch errors.
Instead, you handle errors by specifying an `error` function on the observer.

Producing an error also causes the observable to clean up subscriptions and stop producing values.

<code-example  path="observables/src/subscribing.ts" region="next-or-error"></code-example>

Error handling \(and specifically recovering from an error\) is [covered in more detail in a later section](guide/rx-library#error-handling).
-->
옵저버블은 값을 비동기로 발행하기 때문에 try/catch로 에러를 처리할 수 없습니다.
대신, 옵저버블에서 발생하는 에러는 옵저버의 `error` 핸들러로 처리합니다.

옵저버블에서 에러가 발생하면 해당 옵저버블을 구독하는 구독자들은 모두 구독이 중단되며 값도 더이상 전달되지 않습니다.

<code-example  path="observables/src/subscribing.ts" region="next-or-error"></code-example>

에러 자체를 처리하거나 보완하는 로직을 작성하려면 [rx-library 문서의 에러 처리하기](guide/rx-library#error-handling) 섹션을 참고하세요.


<!--
## Creating observables
-->
## 옵저버블 생성하기

<!--
The RxJS library contains a number of functions for creating observables. Some of the most useful are [covered later](guide/rx-library#observable-creation-functions).

You can also use the `Observable` constructor to create an observable stream of any type.
The constructor takes as its argument the *subscriber function* to run when the observable's `subscribe()` method executes.

A subscriber function receives an `Observer` object, and can publish values to the observer's `next()`, `error`, and `complete` handlers.

For example, to create an observable equivalent to the `of(1, 2, 3)` above, you could write something like this:

<code-example header="Create observable with constructor" path="observables/src/creating.ts" region="subscriber"></code-example>
-->
RxJS 라이브러리는 옵저버블을 생성하는 함수를 다양하게 제공합니다.
이 중에서 자주 사용하는 것은 [다른 문서](guide/rx-library#observable-creation-functions)에서 더 다루겠습니다.

옵저버블 스트림은 `Observable` 생성자를 사용해서 생성할 수 있습닏.ㅏ
옵저버블의 `subscribe()` 메서드에 전달하는 *구독자 함수(subscriber function)* 는 생성자의 인자로 전달할 수도 있습니다.

구독자 함수는 `Observer` 객체를 인자로 받으며, 이 객체는 각각 `next()`, `error()`, `complete()` 핸들러로 옵저버블 스트림을 전달합니다.

위에서 살펴본 `of(1, 2, 3)`과 동일한 옵저버블은 이렇게도 만들 수 있습니다:

<code-example header="Create observable with constructor" path="observables/src/creating.ts" region="subscriber"></code-example>


<!--
## Geolocation example
-->
## 위치정보 예제

<!--
The following example demonstrates the concepts above by showing how to create and consume an observable that reports geolocation updates.
-->
아래 예제 코드는 지리 정보 데이터를 발행하는 옵저버블을 생성하고 활용하는 예제 코드입니다.

<code-example header="Observe geolocation updates" class="no-auto-link" path="observables/src/geolocation.ts"></code-example>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-08-25
