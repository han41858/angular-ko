<!--
# Testing services
-->
# 서비스 테스트하기

<!--
To check that your services are working as you intend, you can write tests specifically for them.

<div class="alert is-helpful">

  For a hands-on experience, <live-example name="testing" stackblitz="specs" noDownload>run tests and explore the test code</live-example> in your browser as you read this guide.

  If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>


Services are often the smoothest files to unit test.
Here are some synchronous and asynchronous unit tests of the `ValueService`
written without assistance from Angular testing utilities.

<code-example path="testing/src/app/demo/demo.spec.ts" region="ValueService" header="app/demo/demo.spec.ts"></code-example>
-->
서비스가 의도한 대로 동작하는지 확인하려면 이 서비스를 테스트하는 테스트 코드를 작성하면 됩니다.

<div class="alert is-helpful">

  이 문서에서 다루는 예제 앱은 <live-example name="testing" stackblitz="specs" noDownload>테스트 코드 확인하고 실행하기</live-example>에서 확인할 수 있습니다.

  이 문서에서 설명하는 테스트 기능은 <live-example name="testing" noDownload>브라우저에서 실행하기</live-example>나 <live-example name="testing" downloadOnly>내려받아 로컬에서 실행하기</live-example>에서 확인할 수 있습니다.

</div>

Angular 구성요소 중에 유닛 테스트를 적용하기 가장 쉬운 것은 서비스입니다.
이 문서에서는 `ValueService`를 대상으로 동기/비동기 방식으로 유닛 테스트를 작성하는 방법에 대해 알아봅시다.

<code-example path="testing/src/app/demo/demo.spec.ts" region="ValueService" header="app/demo/demo.spec.ts"></code-example>


{@a services-with-dependencies}

<!--
## Services with dependencies
-->
## 의존성 객체가 있는 서비스

<!--
Services often depend on other services that Angular injects into the constructor.
In many cases, you can create and _inject_ these dependencies by hand while
calling the service's constructor.

The `MasterService` is a simple example:

<code-example path="testing/src/app/demo/demo.ts" region="MasterService" header="app/demo/demo.ts"></code-example>

`MasterService` delegates its only method, `getValue`, to the injected `ValueService`.

Here are several ways to test it.

<code-example path="testing/src/app/demo/demo.spec.ts" region="MasterService" header="app/demo/demo.spec.ts"></code-example>

The first test creates a `ValueService` with `new` and passes it to the `MasterService` constructor.

However, injecting the real service rarely works well as most dependent services are difficult to create and control.

Instead, mock the dependency, use a dummy value, or create a
[spy](https://jasmine.github.io/tutorials/your_first_suite#section-Spies)
on the pertinent service method.

<div class="alert is-helpful">

Prefer spies as they are usually the best way to mock services.

</div>

These standard testing techniques are great for unit testing services in isolation.

However, you almost always inject services into application classes using Angular
dependency injection and you should have tests that reflect that usage pattern.
Angular testing utilities make it straightforward to investigate how injected services behave.
-->
서비스는 다른 서비스를 의존성으로 주입받는 경우가 종종 있습니다.
이런 의존성 객체들은 대부분 간단하게 생성해서 서비스 생성자를 실행할 때 직접 인자로 전달하면 됩니다.

예제를 봅시다:

<code-example path="testing/src/app/demo/demo.ts" region="MasterService" header="app/demo/demo.ts"></code-example>

`MasterService`에는 `getValue` 메서드가 있으며 이 서비스에는 `ValueService`가 의존성으로 주입됩니다.

`MasterService`는 이렇게 테스트할 수 있습니다.

<code-example path="testing/src/app/demo/demo.spec.ts" region="MasterService" header="app/demo/demo.spec.ts"></code-example>

첫 번째 테스트 코드에서 `ValueService` 인스턴스는 `new` 키워드로 생성해서 `MasterService` 생성자로 전달했습니다.

하지만 실제 서비스 클래스를 인스턴스로 만들어서 의존성으로 주입하는 방식은 제대로 동작하지 않을 가능성이 크고 이 의존성 객체를 다루기도 쉽지 않습니다.

그래서 실제 서비스 대신 목 객체나 더미 값, [스파이](https://jasmine.github.io/2.0/introduction.html#section-Spies)를 활용하는 것이 더 좋습니다.

<div class="alert is-helpful">

목 서비스는 스파이를 활용해서 만드는 방법이 가장 쉽습니다.

</div>

이런 방식을 활용하면 테스트하려는 서비스를 독립된 컨텍스트에 두고 테스트할 수 있습니다.

하지만 결국 Angular 의존성 주입 시스템을 활용해서 실제 사용하는 시나리오에서 애플리케이션이 제대로 동작하는지 확인하는 테스트가 필요합니다.
Angular가 제공하는 테스트 유틸리티를 활용하면 이 작업을 더 쉽게 처리할 수 있습니다.


<!--
## Testing services with the _TestBed_
-->
## _TestBed_ 로 서비스 테스트하기

<!--
Your application relies on Angular [dependency injection (DI)](guide/dependency-injection)
to create services.
When a service has a dependent service, DI finds or creates that dependent service.
And if that dependent service has its own dependencies, DI finds-or-creates them as well.

As service _consumer_, you don't worry about any of this.
You don't worry about the order of constructor arguments or how they're created.

As a service _tester_, you must at least think about the first level of service dependencies
but you _can_ let Angular DI do the service creation and deal with constructor argument order
when you use the `TestBed` testing utility to provide and create services.
-->
서비스가 생성될 때는 Angular가 제공하는 [의존성 주입(Dependency Injection, DI](guide/dependency-injection) 시스템을 사용해서 서비스 인스턴스를 생성합니다.
서비스가 의존성 객체로 요청되면 Angular 의존성 주입 시스템이 해당 서비스와 관련 의존성 객체를 모두 생성해서 반환하는 식입니다.

그래서 서비스를 주입받는 쪽에서는 이 과정을 걱정할 필요가 없습니다.
생성자의 인자 순서를 신경쓸 필요 없으며 인스턴스를 어떻게 생성하는지도 알 필요가 없습니다.

서비스를 테스트하는 코드에서도 테스트하려는 서비스만 신경쓰면 됩니다.
`TestBed` 를 활용하면 테스트 코드 컨텍스트에서 사용할 의존성 주입 시스템의 동작을 변경할 수 있습니다.


{@a testbed}

## Angular _TestBed_

<!--
The `TestBed` is the most important of the Angular testing utilities.
The `TestBed` creates a dynamically-constructed Angular _test_ module that emulates
an Angular [@NgModule](guide/ngmodules).

The `TestBed.configureTestingModule()` method takes a metadata object that can have most of the properties of an [@NgModule](guide/ngmodules).

To test a service, you set the `providers` metadata property with an
array of the services that you'll test or mock.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-before-each" header="app/demo/demo.testbed.spec.ts (provide ValueService in beforeEach)"></code-example>

Then inject it inside a test by calling `TestBed.inject()` with the service class as the argument.

<div class="alert is-helpful">

**Note:** `TestBed.get()` was deprecated as of Angular version 9.
To help minimize breaking changes, Angular introduces a new function called `TestBed.inject()`, which you should use instead.
For information on the removal of `TestBed.get()`,
see its entry in the [Deprecations index](guide/deprecations#index).

</div>

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-it"></code-example>

Or inside the `beforeEach()` if you prefer to inject the service as part of your setup.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-before-each"> </code-example>

When testing a service with a dependency, provide the mock in the `providers` array.

In the following example, the mock is a spy object.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-before-each"></code-example>

The test consumes that spy in the same way it did earlier.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-it">
</code-example>
-->
`TestBed`는 Angular가 제공하는 테스트 유틸리티 중에서 가장 중요한 클래스입니다.
`TestBed`는 [@NgModule](guide/ngmodules) 역할을 하는 Angular 테스트 모듈을 동적으로 구성합니다.

`TestBed.configureTestingModule()` 메서드는 보통 [@NgModule](guide/ngmodules)에 사용하는 메타데이터 객체를 인자로 받습니다.

서비스를 테스트하려면 이 메타데이터의 `providers` 배열에 테스트하려는 서비스와 관련 서비스를 등록하면 됩니다.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-before-each" header="app/demo/demo.testbed.spec.ts (beforeEach()에서 ValueService 동작 환경 구성하기)"></code-example>

이렇게 구성하고 나면 서비스 인스턴스를 의존성으로 주입할 때 `TestBed.inject()` 메서드를 실행해서 인스턴스를 가져올 수 있습니다.

<div class="alert is-helpful">

**참고:** `TestBed.get()`은 Angular 9 버전부터 지원이 중단되었으며, 이 메서드 대신 `TestBed.inject()`를 사용해야 합니다.

자세한 내용은 [지원 중단 기능](guide/deprecations#index) 문서를 참고하세요.

</div>

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-it"></code-example>

아니면 `beforeEach()` 안에서 의존성 객체의 인스턴스를 미리 받아두는 방법을 사용할 수도 있습니다.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-before-each"> </code-example>

의존성 객체가 있는 서비스를 테스트하려면 해당 의존성 객체의 목도 `providers` 배열에 추가해야 합니다.

아래 코드는 스파이 객체를 의존성 객체로 사용하는 예제 코드입니다.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-before-each"></code-example>

스파이 객체는 이렇게 사용합니다.

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-it">
</code-example>


{@a no-before-each}

<!--
## Testing without _beforeEach()_
-->
## _beforeEach()_ 밖에서 테스트하세요.

<!--
Most test suites in this guide call `beforeEach()` to set the preconditions for each `it()` test
and rely on the `TestBed` to create classes and inject services.

There's another school of testing that never calls `beforeEach()` and prefers to create classes explicitly rather than use the `TestBed`.

Here's how you might rewrite one of the `MasterService` tests in that style.

Begin by putting re-usable, preparatory code in a _setup_ function instead of `beforeEach()`.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup"
  header="app/demo/demo.spec.ts (setup)"></code-example>

The `setup()` function returns an object literal
with the variables, such as `masterService`, that a test might reference.
You don't define _semi-global_ variables (for example, `let masterService: MasterService`)
in the body of the `describe()`.

Then each test invokes `setup()` in its first line, before continuing
with steps that manipulate the test subject and assert expectations.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-test"></code-example>

Notice how the test uses
[_destructuring assignment_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
to extract the setup variables that it needs.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup-call">
</code-example>

Many developers feel this approach is cleaner and more explicit than the
traditional `beforeEach()` style.

Although this testing guide follows the traditional style and
the default [CLI schematics](https://github.com/angular/angular-cli)
generate test files with `beforeEach()` and `TestBed`,
feel free to adopt _this alternative approach_ in your own projects.
-->
이 문서에서는 `TestBed`를 구성하거나 `it()` 구문 안쪽에 사용할 객체를 미리 준비하는 코드를 `beforeEach()` 안에 작성했습니다.

`beforeEach()` 안에는 `TestBed`를 구성하는 코드 외에는 최대한 작성하지 않는 것이 좋습니다.
기능을 테스트하는 코드도 마찬가지입니다.

`MasterService`를 테스트하는 코드도 이런 방식으로 작성되었습니다.

테스트 환경을 설정하거나 개별 테스트 스펙에 필요한 로직은 `beforeEach()` 대신 `setup()` 함수를 별도로 만들어서 사용할 수도 있습니다.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup"
  header="app/demo/demo.spec.ts (setup())"></code-example>

`setup()` 함수는 테스트 스펙에서 활용할 `masterService`와 같은 인스턴스를 객체 리터럴로 반환합니다.
그래서 이 함수를 활용하면 `let masterService: MasterService`와 같이 거의 전역으로 사용되는 변수들을 선언하지 않아도 됩니다.

개별 테스트 스펙에서는 `setup()`를 먼저 실행한 후에 서비스를 테스트하는 코드를 작성하면 됩니다.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-test"></code-example>

객체에서 원하는 항목만 참조하는 문법은 [분해 할당자(destructuring assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 문서를 참고하세요.

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup-call">
</code-example>

최근 조사를 보면 `beforeEach()` 스타일보다 `setup()`과 같은 함수를 활용하는 방식이 더 명확하다는 의견이 많았습니다.

이 문서에서는 `beforeEach()`를 활용하는 방식을 기본으로 설명하고 있으며, [Angular CLI 스키매틱](https://github.com/angular/angular-cli)으로 생성된 테스트 파일도 `beforeEach()` 스타일로 구성됩니다.
하지만 기존 방식을 꼭 지켜야 하는 것은 아니니 새로운 방식을 도입하는 것도 검토해 보세요.


<!--
## Testing HTTP services
-->
## HTTP 서비스 테스트하기

<!--
Data services that make HTTP calls to remote servers typically inject and delegate
to the Angular [`HttpClient`](guide/http) service for XHR calls.

You can test a data service with an injected `HttpClient` spy as you would
test any service with a dependency.
<code-example
  path="testing/src/app/model/hero.service.spec.ts"
  region="test-with-spies"
  header="app/model/hero.service.spec.ts (tests with spies)">
</code-example>

<div class="alert is-important">

The `HeroService` methods return `Observables`. You must
_subscribe_ to an observable to (a) cause it to execute and (b)
assert that the method succeeds or fails.

The `subscribe()` method takes a success (`next`) and fail (`error`) callback.
Make sure you provide _both_ callbacks so that you capture errors.
Neglecting to do so produces an asynchronous uncaught observable error that
the test runner will likely attribute to a completely different test.

</div>
-->
리모트 서버로 HTTP 요청을 보내는 데이터 서비스는 Angular [`HttpClient`](guide/http) 객체를 의존성으로 주입받고 이 객체로 XHR 요청을 보냅니다.

이런 서비스는 이렇게 테스트할 수 있습니다.
<code-example
  path="testing/src/app/model/hero.service.spec.ts"
  region="test-with-spies"
  header="app/model/hero.service.spec.ts (스파이로 테스트하기)">
</code-example>

<div class="alert is-important">

`HeroService` 메서드들은 `Observable`을 반환합니다.
그래서 반드시 이 옵저버블을 _구독해야_ (a) 실제 요청이 발생하며 (b) 메서드가 종료된 시점에 성공했는지 실패했는지 판단할 수 있습니다.

`subscribe()` 메서드는 옵저버블이 성공했을 때 실행될 콜백(`next`)과 실패했을 때 실행될 콜백(`error`)을 인자로 받습니다.
옵저버블로 에러가 전달되는 것을 감지하려면 _두_ 콜백 함수를 모두 정의해야 합니다.

두 콜백 함수 중 하나를 정의하지 않으면 다른 테스트에서 발생하는 에러가 영향을 미쳐 예상하지 못한 동작을 할 수 있으니 주의하세요.

</div>


## _HttpClientTestingModule_

<!--
Extended interactions between a data service and the `HttpClient` can be complex
and difficult to mock with spies.

The `HttpClientTestingModule` can make these testing scenarios more manageable.

While the _code sample_ accompanying this guide demonstrates `HttpClientTestingModule`,
this page defers to the [Http guide](guide/http#testing-http-requests),
which covers testing with the `HttpClientTestingModule` in detail.
-->
목 스파이로 데이터 서비스나 `HttpClient`를 직접 조작하는 것은 복잡하고 어렵습니다.

이런 경우에는 `HttpClientTestingModule`을 사용하는 것이 좋습니다.

이 문서에서 `HttpClientTestingModule`를 다루는 방식은 [Http 가이드](guide/http#testing-http-requests) 문서에서와는 조금 다릅니다.
자세한 내용은 해당 문서를 참고하세요.