<!--
# Singleton services
-->
# 싱글턴 서비스 (Singleton services)

<!--
A singleton service is a service for which only one instance exists in an application.

For a sample application using the app-wide singleton service that this page describes, see the <live-example name="ngmodules"></live-example> showcasing all the documented features of NgModules.
-->
싱글턴 서비스는 앱 전체에서 단 하나의 인스턴스만 존재하는 서비스를 말합니다.

이 문서에서는 싱글턴으로 동작하는 서비스를 만들어봅시다.
이 문서에서 다루는 모든 예제 코드는 <live-example name="ngmodules"></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

<!--
## Providing a singleton service
-->
## 싱글턴 서비스 생성하기

<!--
There are two ways to make a service a singleton in Angular:

*   Set the `providedIn` property of the `@Injectable()` to `"root"`
*   Include the service in the `AppModule` or in a module that is only imported by the `AppModule`
-->
Angular에서 서비스를 싱글턴으로 사용하는 방법은 두 가지가 있습니다:

*   `@Injectable()` `providedIn` 프로퍼티에 `root`를 지정해서 서비스 프로바이더를 애플리케이션 루트에 등록하는 방법
*   서비스를 `AppModule`에 등록하거나, `AppModule`만 로드하는 모듈에 등록하는 방법


<a id="providedIn"></a>

<!--
### Using `providedIn`
-->
### `providedIn` 사용하기

<!--
Beginning with Angular 6.0, the preferred way to create a singleton service is to set `providedIn` to `root` on the service's `@Injectable()` decorator.
This tells Angular to provide the service in the application root.

<code-example path="providers/src/app/user.service.0.ts"  header="src/app/user.service.ts"></code-example>

For more detailed information on services, see the [Services](tutorial/tour-of-heroes/toh-pt4) chapter of the [Tour of Heroes tutorial](tutorial/tour-of-heroes).
-->
Angular 6.0 버전부터 Angular CLI로 서비스를 생성하면 `@Injectable()`데코레이터의 `providedIn` 메타데이터 값이 `root`로 설정됩니다.
그래서 이 서비스는 앱 전역에서 사용할 수 있습니다.

<code-example path="providers/src/app/user.service.0.ts"  header="src/app/user.service.ts"></code-example>

더 자세한 내용은 [히어로들의 여행](tutorial/tour-of-heroes) 튜토리얼의 [서비스](tutorial/tour-of-heroes/toh-pt4) 챕터를 참고하세요.


<!--
### NgModule `providers` array
-->
### NgModule의 `providers` 배열

<!--
In applications built with Angular versions prior to 6.0, services are registered NgModule `providers` arrays as follows:

<code-example format="typescript" language="typescript">

&commat;NgModule({
  &hellip;
  providers: [UserService],
  &hellip;
})

</code-example>

If this NgModule were the root `AppModule`, the `UserService` would be a singleton and available throughout the application.
Though you may see it coded this way, using the `providedIn` property of the `@Injectable()` decorator on the service itself is preferable as of Angular 6.0 as it makes your services tree-shakable.
-->
Angular 6.0 버전 이전에는 Angular CLI로 서비스를 생성했을 때 이 서비스가 NgModule의 `providers` 배열에 추가됐습니다:

<code-example format="typescript" language="typescript">

&commat;NgModule({
  &hellip;
  providers: [UserService],
  &hellip;
})

</code-example>

이 경우에도 서비스가 추가되는 모듈은 `AppModule`이기 때문에 `UserService`는 앱 전역에서 인스턴스 하나만 존재합니다.
동작은 동일하지만, Angular 6.0부터는 트리 셰이킹이 가능한 서비스를 명확하게 지정하기 위해 서비스 클래스의 `@Injectable()` 데코레이터에 `providedIn` 메타데이터를 지정하는 방법을 더 권장합니다.


<a id="forRoot"></a>
<a id="the-forroot-pattern"></a>

<!--
## The `forRoot()` pattern
-->
## `forRoot()` 패턴

<!--
Generally, you'll only need `providedIn` for providing services and `forRoot()`/`forChild()` for routing.
However, understanding how `forRoot()` works to make sure a service is a singleton will inform your development at a deeper level.

If a module defines both providers and declarations \(components, directives, pipes\), then loading the module in multiple feature modules would duplicate the registration of the service.
This could result in multiple service instances and the service would no longer behave as a singleton.

There are multiple ways to prevent this:

*   Use the [`providedIn` syntax](guide/singleton-services#providedIn) instead of registering the service in the module.
*   Separate your services into their own module.
*   Define `forRoot()` and `forChild()` methods in the module.

<div class="alert is-helpful">

**NOTE**: <br />
There are two example applications where you can see this scenario; the more advanced <live-example noDownload name="ngmodules">NgModules live example</live-example>, which contains `forRoot()` and `forChild()` in the routing modules and the `GreetingModule`, and the simpler <live-example name="lazy-loading-ngmodules" noDownload>Lazy Loading live example</live-example>.
For an introductory explanation see the [Lazy Loading Feature Modules](guide/lazy-loading-ngmodules) guide.

</div>

Use `forRoot()` to separate providers from a module so you can import that module into the root module with `providers` and child modules without `providers`.

1.  Create a static method `forRoot()` on the module.
1.  Place the providers into the `forRoot()` method.

<code-example header="src/app/greeting/greeting.module.ts" path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root"></code-example>
-->
일반적으로 서비스 프로바이더를 등록할 때는 `providedIn`만 알면 되고 라우팅할 때는 `forRoot()`와 `forChild()`만 알면 됩니다.
그런데 `forRoot()`가 어떻게 동작해서 싱글턴이 되는지 제대로 알면 서비스가 동작하는 과정을 좀 더 자세하게 이해할 수 있습니다.

서비스 프로바이더와 Angular 구성요소\(컴포넌트, 디렉티브, 파이프\)를 등록하는 모듈이 많다면 이 모듈들의 관계에 따라 서비스 프로바이더가 중복 등록되는 경우가 생길 수 있습니다.
그러면 각 모듈마다 서비스의 인스턴스를 생성하기 때문에 더이상 이 서비스는 싱글턴이 아니게 됩니다.

서비스를 싱글턴으로 유지하는 방법이 몇가지 있습니다:

*   모듈에 서비스를 직접 등록하는 대신 [`providedIn` 문법](guide/singleton-services#providedIn)을 사용합니다.
*   모듈마다 서비스를 분리합니다.
*   모듈에 `forRoot()`와 `forChild()` 메소드를 정의합니다.

<div class="alert is-helpful">

**참고**: <br />
미리 준비해둔 예제가 있습니다. <live-example noDownload name="ngmodules">NgModules 예제</live-example>에서는 `GreetingModule`을 라우팅 모듈에 등록할 때 `forRoot()`와 `forChild()`를 사용합니다.
그리고 <live-example name="lazy-loading-ngmodules" noDownload>지연 로딩 예제</live-example>에서는 좀 더 단순한 방법을 사용합니다.
자세한 내용은 [기능모듈 지연 로딩](guide/lazy-loading-ngmodules) 문서를 참고하세요.

</div>

서비스 프로바이더를 모듈과 분리하기 위해 `forRoot()` 패턴을 사용하면 이제 최상위 모듈의 `providers`에는 모듈의 서비스를 등록하고 자식 모듈의 `providers`에는 모듈의 서비스를 등록하지 않습니다.

1.  모듈에 `static`으로 `forRoot` 메소드를 정의합니다.
1.  모듈의 서비스 프로바이더는 `forRoot()` 메소드에 둡니다.

<code-example header="src/app/greeting/greeting.module.ts" path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root"></code-example>


<a id="forRoot-router"></a>
<a id="forroot-and-the-router"></a>

<!--
### `forRoot()` and the `Router`
-->
### `forRoot()`와 `Router`

<!--
`RouterModule` provides the `Router` service, as well as router directives, such as `RouterOutlet` and `routerLink`.
The root application module imports `RouterModule` so that the application has a `Router` and the root application components can access the router directives.
Any feature modules must also import `RouterModule` so that their components can place router directives into their templates.

If the `RouterModule` didn't have `forRoot()` then each feature module would instantiate a new `Router` instance, which would break the application as there can only be one `Router`.
By using the `forRoot()` method, the root application module imports `RouterModule.forRoot(...)` and gets a `Router`, and all feature modules import `RouterModule.forChild(...)` which does not instantiate another `Router`.

<div class="alert is-helpful">

**NOTE**: <br />
If you have a module which has both providers and declarations, you *can* use this technique to separate them out and you may see this pattern in legacy applications.
However, since Angular 6.0, the best practice for providing services is with the `@Injectable()` `providedIn` property.

</div>
-->
`RouterModule`을 `Router` 서비스도 제공하고 `RouterOutlet`이나 `routerLink`같은 라우터 관련 디렉티브도 프로바이더로 등록합니다.
그래서 애플리케이션 최상위 모듈에서 `RouterModule`을 로드하면 앱에 있는 모듈 전체에서 `Router` 서비스를 사용할 수 있습니다.
그런데 모듈에 있는 컴포넌트가 템플릿에서 라우터 관련 디렉티브를 사용한다면 `RouterModule`을 다시 로드해야 하는 경우가 있습니다.

이 때 `RouterModule`이 `forRoot()` 패턴을 제공하지 않는다면 기능모듈에서 `RouterModule`을 로드할 때마다 `Router` 인스턴스가 새로 생성되기 때문에 애플리케이션 전역에서 동작해야 하는 `Router`는 제대로 동작하지 않습니다.
그래서 `RouterModule`은 `forRoot()` 메소드를 사용했을 때만 `Router` 서비스 프로바이더를 등록해서 인스턴스를 생성하며 다른 기능모듈에서 `forChild()`를 사용할 때는 `Router` 서비스의 인스턴스를 다시 생성하지 않습니다.

<div class="alert is-helpful">

**참고**: <br />
`providers`와 `declarations` 배열을 동시에 사용하는 모듈은 `forRoot()` 패턴을 적용하는 것이 좋습니다.
하지만, Angular 6.0부터는 서비스 클래스의 데코레이터 `@Injectable()`에 `providedIn` 프로퍼티 값을 `root`로 지정하는 방식을 더 권장합니다.

</div>

### How `forRoot()` works

<!--
`forRoot()` takes a service configuration object and returns a [ModuleWithProviders](api/core/ModuleWithProviders), which is a simple object with the following properties:

| Properties  | Details |
|:---         |:---     |
| `ngModule`  | In this example, the `GreetingModule` class |
| `providers` | The configured providers                    |

In the <live-example name="ngmodules">live example</live-example> the root `AppModule` imports the `GreetingModule` and adds the `providers` to the `AppModule` providers.
Specifically, Angular accumulates all imported providers before appending the items listed in `@NgModule.providers`.
This sequence ensures that whatever you add explicitly to the `AppModule` providers takes precedence over the providers of imported modules.

The sample application imports `GreetingModule` and uses its `forRoot()` method one time, in `AppModule`.
Registering it once like this prevents multiple instances.

You can also add a `forRoot()` method in the `GreetingModule` that configures the greeting `UserService`.

In the following example, the optional, injected `UserServiceConfig` extends the greeting `UserService`.
If a `UserServiceConfig` exists, the `UserService` sets the user name from that config.

<code-example header="src/app/greeting/user.service.ts (constructor)" path="ngmodules/src/app/greeting/user.service.ts" region="ctor"></code-example>

Here's `forRoot()` that takes a `UserServiceConfig` object:

<code-example header="src/app/greeting/greeting.module.ts (forRoot)" path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root"></code-example>

Lastly, call it within the `imports` list of the `AppModule`.
In the following snippet, other parts of the file are left out.
For the complete file, see the <live-example name="ngmodules"></live-example>, or continue to the next section of this document.

<code-example header="src/app/app.module.ts (imports)" path="ngmodules/src/app/app.module.ts" region="import-for-root"></code-example>

The application displays "Miss Marple" as the user instead of the default "Sherlock Holmes".

Remember to import `GreetingModule` as a Javascript import at the top of the file and don't add it to more than one `@NgModule` `imports` list.
-->
`forRoot()` 함수는 서비스 설정 객체를 인자로 받아서 [ModuleWithProviders](api/core/ModuleWithProviders)를 반환하는데, 이 모듈에는 다음과 같은 프로퍼티가 있습니다:

| 프로퍼티        | 설명                                   |
|:------------|:-------------------------------------|
| `ngModule`  | 이 예제에서는 `GreetingModule` 클래스를 의미합니다. |
| `providers` | 인자로 받은 객체로 설정된 프로바이더를 의미합니다.         |

이 문서와 관련된 예제를 <live-example name="ngmodules">예제 앱</live-example>에서 열어보면, `AppModule`이 `GreetingModule`을 로드하고, `GreetingModule`에서 제공하는 서비스 프로바이더도 `Appmodule`에 로드합니다.
좀 더 정확하게 설명하면, `AppModule`의 `providers` 목록은 아무것도 없지만, 모듈의 `imports`로 불러오는 다른 모듈에 서비스 프로바이더가 존재하면 이 서비스 프로바이더를 현재 모듈의 `@NgModule.providers`보다 먼저 등록합니다.
그래서 현재 모듈이 다른 모듈의 서비스를 의존성으로 주입받을 때, 이 의존성은 현재 모듈의 프로바이더보다 먼저 등록되었기 때문에 문제없이 사용할 수 있습니다.

`GreetingModule`은 `forRoot()` 메소드를 사용해서 `AppModule`에 딱 한 번만 로드되며, 이렇게 로드하면 인스턴스가 중복 생성되는 것을 방지할 수 있습니다.

`GreetingModule`의 `forRoot()` 메소드는 `UserService` 서비스를 설정하는 용도로도 사용할 수 있습니다.

아래 예제에서 `@Optional`로 주입되는 `UserServiceConfig` 객체는 `UserService`의 환경을 설정하는 용도로 사용됩니다.
그래서 `UserServiceConfig` 객체가 존재하면 이 객체로 전달받은 사용자의 이름으로 `UserService`를 설정할 수 있습니다.

<code-example header="src/app/greeting/user.service.ts (생성자)" path="ngmodules/src/app/greeting/user.service.ts" region="ctor"></code-example>

그리고 `UserServiceConfig` 객체를 활용하는 `forRoot()` 함수는 다음과 같이 정의합니다.

<code-example header="src/app/greeting/greeting.module.ts (forRoot())" path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root"></code-example>

마지막으로 아래 코드 처럼 `AppModule`의 `imports` 배열에서 이 메소드를 실행합니다.
이 코드는 일부만 표시되었으며 완전한 파일 내용을 보려면 <live-example name="ngmodules"></live-example>를 참고하거나 다음 섹션을 참고하세요.

<code-example header="src/app/app.module.ts (imports 배열)" path="ngmodules/src/app/app.module.ts" region="import-for-root"></code-example>

이제 이 애플리케이션은 기본값인 "Sherlock Holmes" 대신 "Miss Marple"을 화면에 표시합니다.

`GreetingModule`은 파일의 가장 위쪽에 JavaScript `import` 키워드로 로드하며, `@NgModule`의 `imports`에 딱 한 번만 등록한다는 것을 잊지 마세요.


<!--
## Prevent reimport of the `GreetingModule`
-->
## `GreetingModule` 중복로드 방지하기

<!--
Only the root `AppModule` should import the `GreetingModule`.
If a lazy-loaded module imports it too, the application can generate [multiple instances](guide/ngmodule-faq#q-why-bad) of a service.

To guard against a lazy loaded module re-importing `GreetingModule`, add the following `GreetingModule` constructor.

<code-example header="src/app/greeting/greeting.module.ts" path="ngmodules/src/app/greeting/greeting.module.ts" region="ctor"></code-example>

The constructor tells Angular to inject the `GreetingModule` into itself.
The injection would be circular if Angular looked for `GreetingModule` in the *current* injector, but the `@SkipSelf()` decorator means "look for `GreetingModule` in an ancestor injector, above me in the injector hierarchy."

By default, the injector throws an error when it can't find a requested provider.
The `@Optional()` decorator means not finding the service is OK.
The injector returns `null`, the `parentModule` parameter is null, and the constructor concludes uneventfully.

It's a different story if you improperly import `GreetingModule` into a lazy loaded module such as `CustomersModule`.

Angular creates a lazy loaded module with its own injector, a child of the root injector.
`@SkipSelf()` causes Angular to look for a `GreetingModule` in the parent injector, which this time is the root injector.
Of course it finds the instance imported by the root `AppModule`.
Now `parentModule` exists and the constructor throws the error.

Here are the two files in their entirety for reference:

<code-tabs>
   <code-pane header="app.module.ts" path="ngmodules/src/app/app.module.ts"></code-pane>
   <code-pane header="greeting.module.ts" region="whole-greeting-module" path="ngmodules/src/app/greeting/greeting.module.ts"></code-pane>
</code-tabs>
-->
`GreetingModule`은 최상위 `AppModule`에서만 로드해야 합니다.
만약 지연로딩하는 모듈에서도 `GreetingModule`을 로드하게 되면 [싱글턴 서비스의 인스턴스가 여러개 생성](guide/ngmodule-faq#q-why-bad)됩니다.

그래서 지연로딩하는 모듈이 `GreetingModule`을 중복로드하는 것을 방지하려면 `GreetingModule` 생성자를 다음과 같이 작성하면 됩니다.

<code-example header="src/app/greeting/greeting.module.ts" path="ngmodules/src/app/greeting/greeting.module.ts" region="ctor"></code-example>

이 생성자는 `GreetingModule` 자신을 의존성으로 주입하라고 요청합니다.
이 의존성 주입이 *현재* 인젝터 계층에서 이루어지면 순환 참조를 발생시킬 수 있습니다.
그래서 `@SkipSelf()` 데코레이터를 사용해서 현재 인젝터 계층보다 상위 계층에서 의존성 객체를 찾도록 지정합니다.

기본적으로 인젝터가 의존성 객체를 찾지 못하면 에러가 발생합니다.
하지만 이 경우는 의존성으로 주입하지 않는 것이 정상 시나리오이기 때문에 `@Optional` 데코레이터를 붙여서 의존성 주입에 실패해도 에러가 아니라는 것을 지정했습니다.
그래서 인젝터가 주입하는 객체는 `null`이 되고, `parentModule` 프로퍼티에 할당되는 값도 `null`이 되며, 에러는 발생하지 않고 생성자는 종료됩니다.

하지만 `CustomersModule`과 같이 지연로딩되는 모듈에서 `GreetingModule`을 로드하는 경우에는 상황이 조금 다릅니다.

지연로딩되는 모듈에는 인젝터가 따로 생성되는데, 이 인젝터는 최상위 인젝터의 자식 인젝터입니다.
그리고 `@SkipSelf()` 데코레이터가 사용되었기 때문에 부모 인젝터 계층에서 `GreetingModule`을 찾기 시작하는데, 이 경우에는 최상위 인젝터에서 의존성 객체를 찾습니다.
이번에는 당연하게도 `AppModule`에 있는 `GreetingModule` 인스턴스를 찾게 됩니다.
그래서 `parentModule` 프로퍼티에 객체가 할당되기 때문에 생성자는 에러를 발생시킵니다.

설명한 내용을 코드로 확인해 보세요.

<code-tabs>
   <code-pane header="app.module.ts" path="ngmodules/src/app/app.module.ts"></code-pane>
   <code-pane header="greeting.module.ts" region="whole-greeting-module" path="ngmodules/src/app/greeting/greeting.module.ts"></code-pane>
</code-tabs>


<!--
## More on NgModules
-->
## NgModule 더 알아보기

<!--
You may also be interested in:

*   [Sharing Modules](guide/sharing-ngmodules), which elaborates on the concepts covered on this page
*   [Lazy Loading Modules](guide/lazy-loading-ngmodules)
*   [NgModule FAQ](guide/ngmodule-faq)
-->
이런 내용도 확인해 보세요:

*   [모듈 공유하기](guide/sharing-ngmodules)
*   [기능모듈 지연로딩](guide/lazy-loading-ngmodules)
*   [NgModule FAQ](guide/ngmodule-faq)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
