<a id="configuring-dependency-providers"></a>
<!--
# Configuring dependency providers
-->
# 의존성 프로바이더 설정하기

<!--
The Creating and injecting services topic describes how to use classes as dependencies. Besides classes, you can also use other values such as Boolean, string, date, and objects as dependencies. Angular DI provides the necessary APIs to make the dependency configuration flexible, so you can make those values available in DI.
-->
서비스를 생성하고 의존성으로 주입하는 것은 클래스를 의존성 객체로 어떻게 다루는지 설명하는 것과 같습니다.
클래스 뿐 아니라 불리언 값이나 문자열, 날짜, 일반 객체도 모두 의존성 객체로 다룰 수 있습니다.
Angular가 제공하는 의존성 주입 시스템은 다양하게 활용할 수 있는 API를 제공할 수 있기 때문에, 원하는 대로 의존성 주입 패턴을 활용할 수 있습니다.


<!--
## Specifying a provider token
-->
## 의존성 토큰 정의하기

<!--
If you specify the service class as the provider token, the default behavior is for the injector to instantiate that class using the `new` operator.

In the following example, the `Logger` class provides a `Logger` instance.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger"></code-example>

You can, however, configure a DI to use a different class or any other different value to associate with the `Logger` class. So when the `Logger` is injected, this new value is used instead.

In fact, the class provider syntax is a shorthand expression that expands into a provider configuration, defined by the `Provider` interface.

Angular expands the `providers` value in this case into a full provider object as follows:

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" ></code-example>

The expanded provider configuration is an object literal with two properties:
- The `provide` property holds the token that serves as the key for both locating a dependency value and configuring the injector.
- The second property is a provider definition object, which tells the injector how to create the dependency value. The provider-definition key can be one of the following:
    - useClass - this option tells Angular DI to instantiate a provided class when a dependency is injected
    - useExisting - allows you to alias a token and reference any existing one.
    - useFactory - allows you to define a function that constructs a dependency.
    - useValue - provides a static value that should be used as a dependency.

The section below describes how to use the mentioned provider definition keys.
-->
서비스 클래스를 프로바이더 토큰으로 정의하면, 인젝터는 이 클래스의 인스턴스를 생성하기 위해 `new` 연산자를 사용합니다.

아래 예제는 `Logger` 클래스의 프로바이더로 `Logger` 인스턴스를 지정하는 코드입니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger"></code-example>

하지만 `Logger` 클래스가 아닌 다른 클래스를 사용하거나, 특정 값을 의존성으로 주입하도록 의존성 주입 시스템을 구성할 수도 있습니다.
이런 경우에 `Logger` 클래스를 의존성으로 주입하도록 요청하면, `Logger` 클래스가 아니라 미리 지정된 방식으로 생성된 인스턴스가 의존성으로 주입됩니다.

사실 클래스를 프로바이더로 등록하는 문법은 `Provider` 인터페이스를 정석대로 사용하지 않고 축약해서 사용한 방식입니다.

이 문법을 모두 풀어서 작성하면 이렇습니다:

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" ></code-example>

풀어서 쓴 프로바이더 설정 객체에는 프로퍼티가 2개 존재합니다:
- `provide` 프로퍼티는 의존성 객체를 구분하는 키로 사용합니다.
- 두번째 프로퍼티는 의존성 객체를 어떻게 생성할지 인젝터에게 알리는 방법을 정의합니다. 다음 중 하나를 사용할 수 있습니다:
    - useClass - 클래스를 인스턴스로 생성합니다.
    - useExisting - 토큰을 의존성 객체로 사용하며, 이미 존재하면 기존 객체를 사용합니다.
    - useFactory - 함수 실행 결과를 의존성 객체로 전달합니다.
    - useValue - 정적인 값을 의존성 객체로 사용합니다.

각각 어떻게 사용하는지 알아봅시다.


<a id="token"></a>
<a id="injection-token"></a>

<!--
### Class providers: useClass
-->
### 클래스 프로바이더: `useClass`

<!--
The `useClass` provider key lets you create and return a new instance of the specified class.
You can use this type of provider to substitute an alternative implementation for a common or default class. The alternative implementation can, for example, implement a different strategy, extend the default class, or emulate the behavior of the real class in a test case.
In the following example, the `BetterLogger` class would be instantiated when the `Logger` dependency is requested in a component or any other class.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" ></code-example>

<a id="class-provider-dependencies"></a>

If the alternative class providers have their own dependencies, specify both providers in the providers metadata property of the parent module or component.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5"></code-example>

In this example, `EvenBetterLogger` displays the user name in the log message. This logger gets the user from an injected `UserService` instance.

<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger"></code-example>

Angular DI knows how to construct the `UserService` dependency, since it has been configured above and is available in the injector.
-->
`useClass` 프로바이더 키를 사용하면 클래스의 인스턴스를 생성하고 이 인스턴스를 의존성 객체로 반환합니다.
이 방식은 클래스를 의존성 객체로 사용하는 경우라면 대부분 사용하는 방식입니다.
클래스를 상속받아 확장하거나, 테스트 케이스에서 실제 클래스를 사용하지 않는 경우에는 기존 클래스를 대신하는 방법도 사용할 수 있습니다.
아래 예제는 `Logger`를 의존성 객체로 요청했을 때 `BetterLogger` 클래스의 인스턴스를 생성해서 의존성 객체로 주입하는 프로바이더 예제입니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" ></code-example>

<a id="class-provider-dependencies"></a>

이 때 대신 사용하는 클래스에도 의존성 관계가 있다면 그 의존성 객체도 프로바이더 목록에 등록해야 합니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5"></code-example>

이 예제에서 `EvenBetterLogger`는 로스 메시지에 사용자 이름을 출력하는 서비스입니다.
그래서 이 서비스는 `UserService` 인스턴스를 의존성 객체로 요청합니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger"></code-example>

그러면 `UserService` 클래스가 `EvenBetterLogger` 보다 프로바이더 목록에 먼저 등록되었기 때문에 Angular의 의존성 주입 시스템이 이 의존성 관계를 모두 처리할 수 있습니다.


<!--
### Alias providers: useExisting
-->
### 별칭으로 등록하기: `useExisting`

<!--
The `useExisting` provider key lets you map one token to another. In effect, the first token is an alias for the service associated with the second token, creating two ways to access the same service object.

In the following example, the injector injects the singleton instance of `NewLogger` when the component asks for either the new or the old logger. In this way, `OldLogger` is an alias for `NewLogger`.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b"></code-example>

Ensure you do not alias `OldLogger` to `NewLogger` with `useClass`, as this creates two different `NewLogger` instances.
-->
`useExisting` 프로바이더 키는 어떤 토큰을 다른 것으로 연결할 때 사용합니다.
실제로는 첫번째 토큰은 두번째 토큰의 별칭으로 연결되는 것이며, 따라서 서비스 객체를 생성하는 방법이 두 가지가 된다고도 할 수 있습니다.

아래 예제는 `OldLogger`를 의존성 객체로 요청했을 때 `newLogger`의 인스턴스를 싱글턴(singleton)으로 주입하는 예제 코드입니다.
결국 `OldLogger`는 `NewLogger`의 별칭이 됩니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b"></code-example>

`OldLoger`에 `useClass`를 사용해서 `NewLogger`로 연결하면 다르게 동작합니다.
이 경우에는 `NewLogger` 인스턴스를 별도로 생성하게 됩니다.


<!--
### Factory providers: useFactory
-->
### 팩토리 프로바이더: `useFactory`

<!--
The `useFactory` provider key lets you create a dependency object by calling a factory function. With this approach you can create a dynamic value based on information available in the DI and elsewhere in the app.

In the following example, only authorized users should see secret heroes in the `HeroService`.
Authorization can change during the course of a single application session, as when a different user logs in .

To keep security-sensitive information in `UserService` and out of `HeroService`, give the `HeroService` constructor a boolean flag to control display of secret heroes.

<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" header="src/app/heroes/hero.service.ts (excerpt)"></code-example>

To implement the `isAuthorized` flag, use a factory provider to create a new logger instance for `HeroService`.

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

The factory function has access to `UserService`.
You inject both `Logger` and `UserService` into the factory provider so the injector can pass them along to the factory function.

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

* The `useFactory` field specifies that the provider is a factory function whose implementation is `heroServiceFactory`.

* The `deps` property is an array of provider tokens.
The `Logger` and `UserService` classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching `heroServiceFactory` factory function parameters.

Capturing the factory provider in the exported variable, `heroServiceProvider`, makes the factory provider reusable.
-->
`useFactory` 프로바이더 키를 사용하면 팩토리 함수를 실행하고 얻은 결과를 의존성 객체로 사용합니다.
그래서 이 경우에는 의존성 주입 시스템 안에서 동적으로 변경되는 값이나 앱 외부에서 받아온 값을 활용하는 용도로 사용합니다.

허용된 사용자만 `HeroService`에서 비밀 히어로를 확인해야 한다고 합시다.
그리고 애플리케이션에는 여러 사용자가 로그인할 수 있기 때문에 인증 정보는 계속 변경될 수 있습니다.

이 때 `UserService`와 `HeroService` 안에서 보안을 유지하려면 `HeroService` 생성자에서 비밀 히어로에 접근할 수 있는지 불리언 플래그를 활용할 수 있습니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" header="src/app/heroes/hero.service.ts (일부)"></code-example>

원하는 대로 구현하려면 `isAuthorized` 플래그와 팩토리 프로바이더를 사용해서 `HeroService` 클래스의 인스턴스를 생성하면 됩니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" header="src/app/heroes/hero.service.provider.ts (일부)"></code-example>

이 코드에서 팩토리 함수는 `UserService`를 활용합니다.
그렇다면 팩토리 프로바이더에 `Logger`와 `UserService`를 의존성으로 주입해야 인젝터가 이 객체들을 제대로 전달할 수 있습니다.

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

* `useFactory` 필드를 사용하면 `heroServiceFactory` 팩토리 함수를 사용해서 프로바이더로 등록한다는 것을 의미합니다.

* `deps` 프로퍼티에는 프로바이더 토큰을 배열로 지정합니다.
`Logger`, `UserService` 클래스는 각각 클래스 프로바이더로 등록되어 있습니다.
이렇게 지정해야 인젝터가 각 토큰을 결정하고 `heroServiceFactory` 팩토리 함수의 인자로 의존성 객체를 주입할 수 있습니다.

팩토리 함수 `heroServiceProvider` 안에서 최종값을 캐싱하면 이 값은 재사용할 수 있습니다.


<!--
### Value providers: useValue
-->
### 값으로 등록하기: `useValue`

<!--
The `useValue` key lets you associate a fixed value with a DI token. Use this technique to provide runtime configuration constants such as website base addresses and feature flags. You can also use a value provider in a unit test to provide mock data in place of a production data service. The next section provides more information about the `useValue` key.
-->
`useValue` 키는 고정된 값을 의존성 토큰으로 사용합니다.
이 방식은 보통 웹사이트의 주소나 기능을 활성화하는 플래그 값처럼, 런타임과 관련된 상수를 지정하는 용도로 사용합니다.
그리고 유닛 테스트에서 실제 데이터 대신 목 데이터를 활용하는 용도로도 사용할 수 있습니다.
이 내용은 다음 섹션에서 자세하게 알아봅시다.


<!--
## Using an `InjectionToken` object
-->
## `InjectionToken` 객체 사용하기

<!--
Define and use an `InjectionToken` object for choosing a provider token for non-class dependencies. The following example defines a token, `APP_CONFIG` of the type `InjectionToken`.

<code-example path="dependency-injection/src/app/injection.config.ts" region="token" header="src/app/app.config.ts"></code-example>

The optional type parameter, `<AppConfig>`, and the token description, `app.config`, specify the token's purpose.

Next, register the dependency provider in the component using the `InjectionToken` object of `APP_CONFIG`.

<code-example path="dependency-injection/src/app/providers.component.ts" header="src/app/providers.component.ts" region="providers-9"></code-example>

Now, inject the configuration object into the constructor with `@Inject()` parameter decorator.

<code-example path="dependency-injection/src/app/app.component.2.ts" region="ctor" header="src/app/app.component.ts"></code-example>
-->
`InjectionToken` 객체를 정의해서 사용하는 것은 보통 클래스가 아닌 의존성 객체를 활용하는 방식입니다.
아래 예제는 `APP_CONFIG`라는 토큰을 `InjectionToken` 타입으로 선언하는 예제 코드입니다.

<code-example path="dependency-injection/src/app/injection.config.ts" region="token" header="src/app/app.config.ts"></code-example>

이 때 `<AppConfig>`라고 작성한 타입 인자(생략 가능)와 토큰으로 사용하는 `app.config`를 지정하면서 토큰의 목적을 정의합니다.

그리고 이 객체를 `APP_CONFIG`라는 이름의 `InjectionToken`으로 프로바이더를 등록하면 됩니다.

<code-example path="dependency-injection/src/app/providers.component.ts" header="src/app/providers.component.ts" region="providers-9"></code-example>

그러면 생성자에서 `@Inject()` 인자 데코레이터를 사용해서 의존성 객체를 받아올 수 있습니다.

<code-example path="dependency-injection/src/app/app.component.2.ts" region="ctor" header="src/app/app.component.ts"></code-example>


<!--
### Interfaces and DI
-->
### 인터페이스와 의존성 주입 시스템

<!--
Though the TypeScript `AppConfig` interface supports typing within the class, the `AppConfig` interface plays no role in DI.
In TypeScript, an interface is a design-time artifact, and does not have a runtime representation, or token, that the DI framework can use.

When the transpiler changes TypeScript to JavaScript, the interface disappears because JavaScript doesn't have interfaces.

Because there is no interface for Angular to find at runtime, the interface cannot be a token, nor can you inject it.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface"></code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface"></code-example>
-->
TypeScript `AppConfig` 인터페이스는 클래스에 사용되어 객체의 타입을 의미하지만, 이 인터페이스는 의존성 주입에서는 아무런 역할도 하지 않습니다.
TypeScript에서 인터페이스는 설계 단계에 활용되는 개념이며, 실행 시점에 활용되는 어떤 표현이나 토큰은 아닙니다.

그래서 트랜스파일러가 TypeScript 코드를 JavaScript로 변환하면, JavaScript에는 인터페이스가 없기 때문에 인터페이스는 코드에서 모두 사라집니다.

따라서 실행시점에는 Angular도 인터페이스를 확인할 수 없기 때문에, 인터페이스는 토큰으로 사용할 수 없으며 의존성 객체로 주입할 수 없습니다.

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface"></code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface"></code-example>


<!--
## What's next
-->
## 다음 단계

<!--
* [Dependency Injection in Action](guide/dependency-injection-in-action)
-->
* [실전 의존성 주입](guide/dependency-injection-in-action)

@reviewed 2023-09-06