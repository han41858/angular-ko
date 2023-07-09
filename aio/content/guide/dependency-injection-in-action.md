<!--
# Dependency injection in action
-->
# 실전 의존성 주입

<!--
This guide explores many of the features of dependency injection \(DI\) in Angular.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
이 문서는 Angular에서 활용할 수 있는 다양한 의존성 주입 테크닉에 대해 소개합니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 코드는 <live-example></live-example>에서 직접 실행하거나 다운받아 실행할 수 있습니다.

</div>

<a id="multiple-service-instances"></a>

<!--
## Multiple service instances (sandboxing)
-->
## 다중 서비스 인스턴스 (샌드박싱, sandboxing)

<!--
Sometimes you want multiple instances of a service at *the same level* of the component hierarchy.

A good example is a service that holds state for its companion component instance.
You need a separate instance of the service for each component.
Each service has its own work-state, isolated from the service-and-state of a different component.
This is called *sandboxing* because each service and component instance has its own sandbox to play in.

<a id="hero-bios-component"></a>

In this example, `HeroBiosComponent` presents three instances of `HeroBioComponent`.

<code-example header="src/app/hero-bios.component.ts" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="simple"></code-example>

Each `HeroBioComponent` can edit a single hero's biography.
`HeroBioComponent` relies on `HeroCacheService` to fetch, cache, and perform other persistence operations on that hero.

<code-example header="src/app/hero-cache.service.ts" path="dependency-injection-in-action/src/app/hero-cache.service.ts" region="service"></code-example>

Three instances of `HeroBioComponent` can't share the same instance of `HeroCacheService`, as they'd be competing with each other to determine which hero to cache.

Instead, each `HeroBioComponent` gets its *own* `HeroCacheService` instance by listing `HeroCacheService` in its metadata `providers` array.

<code-example header="src/app/hero-bio.component.ts" path="dependency-injection-in-action/src/app/hero-bio.component.ts" region="component"></code-example>

The parent `HeroBiosComponent` binds a value to `heroId`.
`ngOnInit` passes that ID to the service, which fetches and caches the hero.
The getter for the `hero` property pulls the cached hero from the service.
The template displays this data-bound property.

Find this example in <live-example name="dependency-injection-in-action">live code</live-example> and confirm that the three `HeroBioComponent` instances have their own cached hero data.

<div class="lightbox">

<img alt="Bios" src="generated/images/guide/dependency-injection-in-action/hero-bios.png">

</div>
-->
어떤 경우에는 *같은 계층의* 컴포넌트마다 서비스 인스턴스를 각각 유지해야 하는 경우가 있습니다.

히어로 정보 관리 컴포넌트로 이 경우를 생각해 봅시다.
이 예제에서는 컴포넌트마다 서비스 인스턴스를 하나씩 두려고 합니다.
그리고 각각의 서비스 인스턴스가 현재 작업 상태를 저장하며, 다른 컴포넌트의 작업 상태에 영향을 받지 않게 하려고 합니다.
이런 구조를 *샌드박싱(sandboxing)*이라고 합니다. 이 구조에서 서비스와 컴포넌트 인스턴스는 서로 연관된 것들끼리만 동작합니다.

<a id="hero-bios-component"></a>

이번 예제에서 `HeroBiosComponent`에는 `HeroBioComponent` 인스턴스가 다음과 같이 3개 존재합니다.

<code-example header="src/app/hero-bios.component.ts" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="simple"></code-example>

각각의 `HeroBioComponent`에서는 히어로 한 명의 정보를 편집할 수 있습니다.
그리고 히어로의 정보를 가져오거나 캐싱하고, 수정할 때는 `HeroCacheService`를 활용합니다.

<code-example header="src/app/hero-cache.service.ts" path="dependency-injection-in-action/src/app/hero-cache.service.ts" region="service"></code-example>

이 때 개별 `HeroBioComponent`가 `HeroCacheService` 인스턴스를 모두 공유한다면 각 컴포넌트에서 작업하는 히어로의 정보를 서로 덮어쓰기 때문에 정상적으로 동작하지 않습니다.

그래서 `HeroBioComponent` 메타데이터의 `providers` 배열에 `HeroCacheService` 프로바이더를 등록하면 각 컴포넌트마다 독립된 `HeroCacheService` 인스턴스를 생성할 수 있습니다.

<code-example header="src/app/hero-bio.component.ts" path="dependency-injection-in-action/src/app/hero-bio.component.ts" region="component"></code-example>

부모 컴포넌트인 `HeroBiosComponent`는 자식 컴포넌트의 `heroId` 프로퍼티에 히어로의 ID를 바인딩합니다.
그리고 자식 컴포넌트의 `ngOnInit()` 메소드에서 이 ID를 서비스로 전달하면 서비스가 해당되는 히어로의 정보를 가져와서 캐싱합니다.
`hero` 프로퍼티에 사용된 게터 함수는 컴포넌트가 아니라 서비스에서 히어로의 정보를 가져오기 위해 선언했습니다.
템플릿은 이 프로퍼티를 데이터 바인딩해서 표시합니다.

이제 `HeroBioComponent`의 인스턴스 3개는 모두 독립된 히어로의 정보를 캐싱할 수 있습니다. 이 예제는 <live-example name="dependency-injection-in-action">라이브 예제 링크</live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

<div class="lightbox">

<img alt="Bios" src="generated/images/guide/dependency-injection-in-action/hero-bios.png">

</div>

<a id="qualify-dependency-lookup"></a>

<!--
## Qualify dependency lookup with parameter decorators
-->
## 인자 데코레이터로 의존성 객체 보정하기

<!--
When a class requires a dependency, that dependency is added to the constructor as a parameter.
When Angular needs to instantiate the class, it calls upon the DI framework to supply the dependency.
By default, the DI framework searches for a provider in the injector hierarchy, starting at the component's local injector, and if necessary bubbling up through the injector tree until it reaches the root injector.

*   The first injector configured with a provider supplies the dependency \(a service instance or value\) to the constructor
*   If no provider is found in the root injector, the DI framework throws an error

There are a number of options for modifying the default search behavior, using *parameter decorators* on the service-valued parameters of a class constructor.
-->
클래스에 의존성 객체를 주입하려면 생성자 인자에 의존성 객체의 타입을 지정하면 됩니다.
그러면 Angular가 이 클래스의 인스턴스를 생성하면서 의존성 주입 프레임워크에 의존성 객체의 인스턴스를 요청합니다.
의존성 주입 프레임워크는 인젝터 계층을 따라가면서 프로바이더를 찾기 시작하는데, 이 과정은 의존성 객체 주입을 요청한 인젝터부터 애플리케이션 최상위 인젝터에 도달할 때까지 버블링됩니다.

*   의존성 객체를 찾는 과정에서 처음 만나는 프로바이더를 사용해서 인스턴스를 생성하고, 의존성 주입을 요청한 클래스의 생성자에 주입합니다.
*   애플리케이션 최상위 인젝터에 도달할 때까지 프로바이더를 찾지 못하면 에러가 발생합니다.

그런데 클래스 생성자에 *인자 데코레이터(parameter decorators)* 를 지정하면 의존성을 찾는 과정을 조정할 수 있습니다. 이 데코레이터들에 대해 알아봅시다.


<a id="optional"></a>

<!--
### Make a dependency `@Optional` and limit search with `@Host`
-->
### 생략해도 되는 `@Optional`, 탐색 범위를 제한하는 `@Host`

<!--
Dependencies can be registered at any level in the component hierarchy.
When a component requests a dependency, Angular starts with that component's injector and walks up the injector tree until it finds the first suitable provider.
Angular throws an error if it can't find the dependency during that walk.

In some cases, you need to limit the search or accommodate a missing dependency.
You can modify Angular's search behavior with the `@Host` and `@Optional` qualifying decorators on a service-valued parameter of the component's constructor.

*   The `@Optional` property decorator tells Angular to return null when it can't find the dependency
*   The `@Host` property decorator stops the upward search at the *host component*.
    The host component is typically the component requesting the dependency.
    However, when this component is projected into a *parent* component, that parent component becomes the host.
    The following example covers this second case.

These decorators can be used individually or together, as shown in the example.
This `HeroBiosAndContactsComponent` is a revision of `HeroBiosComponent` which you looked at [above](guide/dependency-injection-in-action#hero-bios-component).

<code-example header="src/app/hero-bios.component.ts (HeroBiosAndContactsComponent)" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="hero-bios-and-contacts"></code-example>

Focus on the template:

<code-example header="src/app/hero-bios.component.ts" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="template"></code-example>

Now there's a new `<hero-contact>` element between the `<hero-bio>` tags.
Angular *projects*, or *transcludes*, the corresponding `HeroContactComponent` into the `HeroBioComponent` view, placing it in the `<ng-content>` slot of the `HeroBioComponent` template.

<code-example header="src/app/hero-bio.component.ts (template)" path="dependency-injection-in-action/src/app/hero-bio.component.ts" region="template"></code-example>

The result is shown below, with the hero's telephone number from `HeroContactComponent` projected above the hero description.

<div class="lightbox">

<img alt="bio and contact" src="generated/images/guide/dependency-injection-in-action/hero-bio-and-content.png">

</div>

Here's `HeroContactComponent`, which demonstrates the qualifying decorators.

<code-example header="src/app/hero-contact.component.ts" path="dependency-injection-in-action/src/app/hero-contact.component.ts" region="component"></code-example>

Focus on the constructor parameters.

<code-example header="src/app/hero-contact.component.ts" path="dependency-injection-in-action/src/app/hero-contact.component.ts" region="ctor-params"></code-example>

The `@Host()` function decorating the  `heroCache` constructor property ensures that you get a reference to the cache service from the parent `HeroBioComponent`.
Angular throws an error if the parent lacks that service, even if a component higher in the component tree includes it.

A second `@Host()` function decorates the `loggerService` constructor property.
The only `LoggerService` instance in the application is provided at the `AppComponent` level.
The host `HeroBioComponent` doesn't have its own `LoggerService` provider.

Angular throws an error if you haven't also decorated the property with `@Optional()`.
When the property is marked as optional, Angular sets `loggerService` to null and the rest of the component adapts.

Here's `HeroBiosAndContactsComponent` in action.

<div class="lightbox">

<img alt="Bios with contact into" src="generated/images/guide/dependency-injection-in-action/hero-bios-and-contacts.png">

</div>

If you comment out the `@Host()` decorator, Angular walks up the injector ancestor tree until it finds the logger at the `AppComponent` level.
The logger logic kicks in and the hero display updates with the "!!!" marker to indicate that the logger was found.

<div class="lightbox">

<img alt="Without @Host" src="generated/images/guide/dependency-injection-in-action/hero-bio-contact-no-host.png">

</div>

If you restore the `@Host()` decorator and comment out `@Optional`, the application throws an exception when it cannot find the required logger at the host component level.

<code-example format="output" hideCopy language="shell">

EXCEPTION: No provider for LoggerService! (HeroContactComponent -&gt; LoggerService)

</code-example>
-->
의존성 객체는 컴포넌트 계층 중 어떠한 곳에도 자유롭게 등록할 수 있습니다.
그래서 컴포넌트 클래스가 의존성 객체를 요청하면 Angular는 해당 컴포넌트의 인젝터부터 프로바이더를 찾기 시작하며, 원하는 프로바이더를 찾을 때까지 인젝터 트리를 따라 올라갑니다.
그리고 어디에서도 의존성 객체를 찾지 못하면 에러가 발생합니다.

그런데 의존성 객체를 찾는 범위를 제한하거나, 의존성 객체를 찾지 못하는 것을 허용할 수도 있습니다.
생성자에 선언한 인자에 `@Host`와 `@Optional` 보정 데코레이터를 사용하면 됩니다.

*   `@Optional` 프로퍼티 데코레이터를 사용하면 의존성 객체를 찾지 못했을 때 에러를 발생하는 대신 `null`을 주입합니다.
*   `@Host` 프로퍼티 데코레이터를 사용하면 의존성 객체를 찾는 과정이 *호스트 컴포넌트* 까지만 이루어집니다.
    이 때 호스트 컴포넌트는 일반적으로 의존성 객체를 요청한 컴포넌트를 의미합니다.
    그런데 이 컴포넌트가 *부모* 컴포넌트에 프로젝트된 상태라면 부모 컴포넌트가 호스트 컴포넌트입니다.
    이 내용에 대해서는 아래에서 자세하게 알아봅시다.

아래에서 예제와 함께 다시 설명하겠지만, 이 데코레이터들은 따로 사용할 수도 있고 함께 사용할 수도 있습니다.
이제부터 자세하게 살펴볼 `HeroBiosAndContactsComponent`는 [위](guide/dependency-injection-in-action#hero-bios-component)에서 살펴본 `HeroBiosComponent`를 변형한 컴포넌트입니다.

<code-example header="src/app/hero-bios.component.ts (HeroBiosAndContactsComponent)" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="hero-bios-and-contacts"></code-example>

템플릿을 자세히 봅시다:

<code-example header="src/app/hero-bios.component.ts" path="dependency-injection-in-action/src/app/hero-bios.component.ts" region="template"></code-example>

템플릿에는 `<hero-bio>` 태그 안에 `<hero-contact>` 엘리먼트가 선언되어 있습니다.
그러면 `HeroBioComponent`의 뷰에 있는 `<ng-content>` 안에 `HeroContactComponent`가 *프로젝트(project, transclude)* 됩니다.

<code-example header="src/app/hero-bio.component.ts (template)" path="dependency-injection-in-action/src/app/hero-bio.component.ts" region="template"></code-example>

이 코드를 실행하면 `HeroContactComponent`에 정의되어 히어로의 전화번호를 입력하는 엘리먼트가 히어로의 정보 위에 다음과 같이 표시됩니다.

<div class="lightbox">

<img alt="bio and contact" src="generated/images/guide/dependency-injection-in-action/hero-bio-and-content.png">

</div>

이 때 `HeroContactComponent`에는 보정 데코레이터가 다음과 같이 선언되어 있습니다.

<code-example header="src/app/hero-contact.component.ts" path="dependency-injection-in-action/src/app/hero-contact.component.ts" region="component"></code-example>

생성자의 인자 선언을 자세히 봅시다.

<code-example header="src/app/hero-contact.component.ts" path="dependency-injection-in-action/src/app/hero-contact.component.ts" region="ctor-params"></code-example>

생성자의 인자인 `heroCache`에 사용된 `@Host()` 함수는 이 인자를 의존성으로 찾을 때 부모 컴포넌트인 `HeroBioComponent`까지만 찾도록 탐색 범위를 제한하는 데코레이터입니다.
그러면 이 의존성 객체가 부모 컴포넌트 위쪽에 등록되어 있더라도 부모 컴포넌트까지 이 서비스를 찾지 못하면 에러가 발생합니다.

두번째 `@Host()` 함수는 `loggerService` 생성자 인자에 지정되었습니다.
그런데 `LoggerService`는 `AppComponent` 계층에만 등록되어 있다고 합시다.
호스트 컴포넌트인 `HeroBioComponent`에는 `LoggerService`의 프로바이더가 등록되어 있지 않습니다.

만약 `@Optional()` 데코레이터가 사용되지 않았다면 이 코드는 에러가 발생합니다.
하지만 `loggerService`는 생략할 수 있도록 지정되었기 때문에 의존성 객체의 인스턴스를 찾지 못하더라도 에러가 발생하지 않으며 생성자에는 `null`이 주입됩니다.

`HeroBiosAndContactsComponent`는 이제 아래 그림과 같이 동작합니다.

<div class="lightbox">

<img alt="Bios with contact into" src="generated/images/guide/dependency-injection-in-action/hero-bios-and-contacts.png">

</div>

만약 `@Host()` 데코레이터를 제거하면 의존성 객체를 찾는 과정이 `AppComponent` 계층까지 버블링되기 때문에 이 애플리케이션은 에러없이 동작합니다.
로그도 정상적으로 동작할 것이며, `logger` 인스턴스를 찾았다는 것은 화면에 "!!!"가 표시되는 것으로 확인할 수 있습니다.

<div class="lightbox">

<img alt="Without @Host" src="generated/images/guide/dependency-injection-in-action/hero-bio-contact-no-host.png">

</div>

만약 `@Host()` 데코레이터를 다시 추가하고 `@Optional` 데코레이터를 제거하면, 호스트 컴포넌트 계층까지 탐색해도 의존성 객체를 찾을 수 없기 때문에 다음과 같은 에러가 발생합니다.

<code-example format="output" hideCopy language="shell">

EXCEPTION: No provider for LoggerService! (HeroContactComponent -&gt; LoggerService)

</code-example>


<!--
### Supply a custom provider with `@Inject`
-->
### `@Inject`로 커스텀 프로바이더 주입하기

<!--
Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs.
The following example uses an `InjectionToken` to provide the [localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) browser API as a dependency in the `BrowserStorageService`.

<code-example header="src/app/storage.service.ts" path="dependency-injection-in-action/src/app/storage.service.ts"></code-example>

The `factory` function returns the `localStorage` property that is attached to the browser window object.
The `Inject` decorator is a constructor parameter used to specify a custom provider of a dependency.
This custom provider can now be overridden during testing with a mock API of `localStorage` instead of interacting with real browser APIs.
-->
브라우저 내장 API로 제공되는 객체는 커스텀 프로바이더를 사용해서 의존성으로 주입할 수 있습니다.
아래 예제는 브라우저가 제공하는 API 중 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)에`InjectionToken`을 사용해서 `BrowserStorageService`로 만드는 예제 코드입니다.

<code-example header="src/app/storage.service.ts" path="dependency-injection-in-action/src/app/storage.service.ts"></code-example>

`factory` 프로퍼티에 지정된 함수는 브라우저의 `window` 객체에서 `localStorage` 프로퍼티를 반환합니다.
그리고 이렇게 만든 커스텀 프로바이더를 생성자의 인자에 주입하기 위해 `@Inject` 데코레이터를 사용했습니다.
이제 커스텀 프로바이더는 기본 환경에서도 동작하지만, 테스트 환경에서 목 API로 `localStorage`를 대체할 때도 사용할 수 있습니다.


<a id="skip"></a>

<!--
### Modify the provider search with `@Self` and `@SkipSelf`
-->
### `@Self`, `@SkipSelf`로 탐색 범위 조정하기

<!--
Providers can also be scoped by injector through constructor parameter decorators.
The following example overrides the `BROWSER_STORAGE` token in the `Component` class `providers` with the `sessionStorage` browser API.
The same `BrowserStorageService` is injected twice in the constructor, decorated with `@Self` and `@SkipSelf` to define which injector handles the provider dependency.

<code-example header="src/app/storage.component.ts" path="dependency-injection-in-action/src/app/storage.component.ts"></code-example>

Using the `@Self` decorator, the injector only looks at the component's injector for its providers.
The `@SkipSelf` decorator allows you to skip the local injector and look up in the hierarchy to find a provider that satisfies this dependency.
The `sessionStorageService` instance interacts with the `BrowserStorageService` using the `sessionStorage` browser API, while the `localStorageService` skips the local injector and uses the root `BrowserStorageService` that uses the `localStorage` browser API.
-->
프로바이더는 생성자의 인자에 사용된 데코레이터의 영향을 받기도 합니다.
아래 예제에서 `@Component` 데코레이터의 `providers`에 등록된 `BROWSER_STORAGE`는 브라우저에서 API로 제공하는 `sessionStorage`를 오버라이드하는 토큰입니다.
이 때 `BrowserStorageService`는 생성자의 인자로 두 번 지정되었지만, 각각 `@Self`와 `@SkipSelf`가 지정되었기 때문에 의존성 주입이 동작하는 방식은 다릅니다.

<code-example header="src/app/storage.component.ts" path="dependency-injection-in-action/src/app/storage.component.ts"></code-example>

`@Self` 데코레이터가 사용된 의존성 객체는 해당 컴포넌트의 인젝터에 등록된 프로바이더만 참조합니다.
그리고 `@SkipSelf` 데코레이터가 사용된 의존성 객체는 해당 컴포넌트의 인젝터를 건너뛰고 그 위쪽 인젝터부터 의존성 객체를 찾기 시작합니다.
결국 `sessionStorageService`에 할당되는 것은 이 컴포넌트에 등록된 프로바이더에 따라 브라우저 내장 `sessionStorage`가 될 것이며, `localStorageService`는 이 컴포넌트를 건너뛰고 탐색하도록 지정했기 때문에 `BrowserStorageService`에서 제공하는 `localStorage`가 할당될 것입니다.


<a id="component-element"></a>

<!--
## Inject the component's DOM element
-->
## 컴포넌트의 DOM 엘리먼트 주입하기

<!--
Although developers strive to avoid it, many visual effects and third-party tools, such as jQuery, require DOM access.
As a result, you might need to access a component's DOM element.

To illustrate, here's a minimal version of `HighlightDirective` from the [Attribute Directives](guide/attribute-directives) page.

<code-example header="src/app/highlight.directive.ts" path="dependency-injection-in-action/src/app/highlight.directive.ts"></code-example>

The directive sets the background to a highlight color when the user mouses over the DOM element to which the directive is applied.

Angular sets the constructor's `el` parameter to the injected `ElementRef`.
\(An `ElementRef` is a wrapper around a DOM element, whose `nativeElement` property exposes the DOM element for the directive to manipulate.\)

The sample code applies the directive's `appHighlight` attribute to two `<div>` tags, first without a value \(yielding the default color\) and then with an assigned color value.

<code-example header="src/app/app.component.html (highlight)" path="dependency-injection-in-action/src/app/app.component.html" region="highlight"></code-example>

The following image shows the effect of mousing over the `<hero-bios-and-contacts>` tag.

<div class="lightbox">

<img alt="Highlighted bios" src="generated/images/guide/dependency-injection-in-action/highlight.png">

</div>
-->
가능한 한 이 방법은 사용하지 않을 것을 권장하지만, 시각 효과를 위한 서드파티 툴이 jQuery를 사용한다면 DOM에 직접 접근해야 하는 경우가 있습니다.
이런 경우에는 어쩔 수 없이 컴포넌트의 DOM 엘리먼트에 접근할 수 있는 방법을 찾아야 합니다.

이 내용을 알아보기 위해 [어트리뷰트 디렉티브](guide/attribute-directives) 페이지에서 살펴봤던 `HighlightDirective`를 간단하게 확인해 봅시다.

<code-example header="src/app/highlight.directive.ts" path="dependency-injection-in-action/src/app/highlight.directive.ts"></code-example>

이 디렉티브가 적용된 DOM 엘리먼트에 사용자가 마우스를 올리면 배경색이 변경됩니다.

그리고 배경색을 변경하기 위해 디렉티브의 생성자로 `ElementRef`를 주입하고, 이 객체를 `el` 프로퍼티로 할당했습니다.
\(`ElementRef`는 DOM 엘리먼트를 랩핑한 타입이며, 이 객체의 `nativeElement` 프로퍼티를 사용하면 디렉티브에서 DOM 엘리먼트를 직접 조작할 수 있습니다.\)

이 디렉티브는 DOM 엘리먼트에 적용하면서 입력값을 받을 수 있는데, 색상을 지정하지 않으면 기본 색상이 배경색으로 적용되고 색상을 지정하면 지정된 색상이 배경색이 됩니다.

<code-example header="src/app/app.component.html (highlight)" path="dependency-injection-in-action/src/app/app.component.html" region="highlight"></code-example>

이제 `<hero-bios-and-contacts>`에 마우스를 올려보면 아래 그림과 같이 표시됩니다.

<div class="lightbox">

<img alt="Highlighted bios" src="generated/images/guide/dependency-injection-in-action/highlight.png">

</div>


<a id="defining-providers"></a>

<!--
### Defining providers
-->
### 프로바이더 정의하기

<!--
A dependency can't always be created by the default method of instantiating a class.
You learned about some other methods in [Dependency Providers](guide/dependency-injection-providers).
The following `HeroOfTheMonthComponent` example demonstrates many of the alternatives and why you need them.
It's visually simple: a few properties and the logs produced by a logger.

<div class="lightbox">

<img alt="Hero of the month" src="generated/images/guide/dependency-injection-in-action/hero-of-month.png">

</div>

The code behind it customizes how and where the DI framework provides dependencies.
The use cases illustrate different ways to use the *provide* object literal to associate a definition object with a DI token.

<code-example header="hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="hero-of-the-month"></code-example>

The `providers` array shows how you might use the different provider-definition keys:
`useValue`, `useClass`, `useExisting`, or `useFactory`.
-->
의존성 객체의 인스턴스는 클래스를 생성하는 기본 방식 외에 다른 방식으로도 생성할 수 있습니다.
이 내용은 [의존성 주입 프로바이더](guide/dependency-injection-providers)에서 이미 다뤘습니다.
아래 `HeroOfTheMonthComponent` 예제를 보면서 기본 방식 외에 다른 방식이 어떤 경우에 사용되는지 알아봅시다.
동작하는 모습은 간단합니다. 이 예제는 `logger`가 처리하는 프로퍼티와 로그를 아래 그림과 같이 화면에 단순하게 표시하는 예제입니다.

<div class="lightbox">

<img alt="Hero of the month" src="generated/images/guide/dependency-injection-in-action/hero-of-month.png">

</div>

하지만 이 코드는 의존성 주입 프레임워크에 활용되는 의존성 객체를 모두 커스터마이징 하기 위해 조금 복잡해졌습니다.
그럼에도 불구하고 모든 프로바이더는 의존성 객체와 토큰을 *provide* 객체 리터럴로 등록하는데 각각 다른 방식을 사용한 것 뿐입니다.

<code-example header="hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="hero-of-the-month"></code-example>

`providers` 배열을 보면 알수 있듯이, 의존성 토큰에 프로바이더를 연결할 때는 `useValue`, `useClass`, `useExisting`, `useFactory`를 사용할 수 있습니다.

<a id="usevalue"></a>

<!--
#### Value providers: `useValue`
-->
#### 값 프로바이더: `useValue`

<!--
The `useValue` key lets you associate a fixed value with a DI token.
Use this technique to provide *runtime configuration constants* such as website base addresses and feature flags.
You can also use a value provider in a unit test to provide mock data in place of a production data service.

The `HeroOfTheMonthComponent` example has two value providers.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-value"></code-example>

*   The first provides an existing instance of the `Hero` class to use for the `Hero` token, rather than requiring the injector to create a new instance with `new` or use its own cached instance.
    Here, the token is the class itself.

*   The second specifies a literal string resource to use for the `TITLE` token.
    The `TITLE` provider token is *not* a class, but is instead a special kind of provider lookup key called an [injection token](guide/dependency-injection-in-action#injection-token), represented by an `InjectionToken` instance.

You can use an injection token for any kind of provider but it's particularly helpful when the dependency is a simple value like a string, a number, or a function.

The value of a *value provider* must be defined before you specify it here.
The title string literal is immediately available.
The `someHero` variable in this example was set earlier in the file as shown below.
You can't use a variable whose value will be defined later.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="some-hero"></code-example>

Other types of providers can create their values *lazily*; that is, when they're needed for injection.
-->
`useValue`키를 사용하면 고정된 값을 의존성 토큰에 연결할 수 있습니다.
이 방식은 웹사이트의 기본 주소나 플래그 값 등 *실행시점에 결정되는 상수*를 의존성으로 주입할 때 사용합니다.
그리고 이 방식은 데이터 서비스에 유닛 테스트를 적용할 때 목 데이터를 주입하는 용도로도 사용할 수 있습니다.

`HeroOfTheMonthComponent` 예제에서는 이 방식의 프로바이더가 두 번 사용되었습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-value"></code-example>

*   첫번째 사용된 프로바이더는 `Hero` 토큰에 `Hero` 클래스 인스턴스를 `new` 키워드로 생성해서 반환하지 않고, 어딘가에 캐싱된 인스턴스를 사용하는 방식으로 등록되었습니다.
    이 때 클래스 그 자체가 토큰입니다.

*   두번째로 사용된 프로바이더는 `TITLE` 토큰에 문자열 리소스를 연결하는 방식으로 등록되었습니다.
    이 때 `TITLE` 프로바이더 토큰은 *클래스*가 아니지만 `InjectionToken` 인스턴스로 생성된 [인젝션 토큰](guide/dependency-injection-in-action#injection-token)이기 때문에 프로바이더를 찾는 키로 사용할 수 있습니다.

인젝션 토큰에는 어떠한 것이라도 연결할 수 있지만, 보통 문자열이나 숫자, 함수를 연결할 때 사용합니다.

*값 프로바이더*의 값(value)에 해당하는 객체는 프로바이더가 등록되기 전에 반드시 선언되어야 합니다.
그래서 `TITLE`에 해당하는 문자열은 프로바이더를 등록하면서 바로 선언했으며, `someHero` 변수에 해당하는 객체는 프로바이더가 등록되기 전 어딘가에 이미 선언되어 있습니다.
프로바이더 선언보다 늦게 선언되는 변수는 프로바이더에 제대로 등록되지 않습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="some-hero"></code-example>

다른 타입의 프로바이더는 값에 해당하는 객체가 의존성 주입되기 전까지라면 프로바이더가 등록되는 것보다 *늦게* 생성되어도 됩니다.


<a id="useclass"></a>
<!--
#### Class providers: `useClass`
-->
#### 클래스 프로바이더: `useClass`

<!--
The `useClass` provider key lets you create and return a new instance of the specified class.

You can use this type of provider to substitute an *alternative implementation* for a common or default class.
The alternative implementation could, for example, implement a different strategy, extend the default class, or emulate the behavior of the real class in a test case.

The following code shows two examples in `HeroOfTheMonthComponent`.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-class"></code-example>

The first provider is the *de-sugared*, expanded form of the most typical case in which the class to be created \(`HeroService`\) is also the provider's dependency injection token.
The short form is generally preferred; this long form makes the details explicit.

The second provider substitutes `DateLoggerService` for `LoggerService`.
`LoggerService` is already registered at the `AppComponent` level.
When this child component requests `LoggerService`, it receives a `DateLoggerService` instance instead.

<div class="alert is-helpful">

This component and its tree of child components receive `DateLoggerService` instance.
Components outside the tree continue to receive the original `LoggerService` instance.

</div>

`DateLoggerService` inherits from `LoggerService`; it appends the current date/time to each message:

<code-example header="src/app/date-logger.service.ts" path="dependency-injection-in-action/src/app/date-logger.service.ts" region="date-logger-service"></code-example>
-->
`useClass` 프로바이더 키를 사용하면 이 키에 연결된 클래스 인스턴스가 대신 주입됩니다.

이 방식은 어떤 클래스를 *다른 구현체로 대체할 때*도 사용할 수 있습니다.
이 때 다른 구현체라는 것은 다른 정책일 수도 있고, 기본 클래스를 상속받은 클래스일 수도 있으며, 테스트 환경에서 실제 클래스를 대체하기 위한 객체일 수도 있습니다.

`HeroOfTheMonthComponent` 예제에서는 이 방식의 프로바이더가 두 번 사용되었습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-class"></code-example>

첫번째 프로바이더는 *축약형을 사용하지 않은(de-sugared)* 문법이며 클래스를 의존성 객체로 등록할 때 가장 많이 사용하는 방식입니다. 이 경우에 `HeroService`는 의존성 토큰이면서 구현체이기도 합니다.
일반적으로는 축약형이 사용되지만 이 예제에서는 개념을 명확하게 하기 위해 풀어서 사용했습니다.

두번째 프로바이더는 `AppComponent` 계층에 등록된 `LoggerService`를 `DateLoggerService`로 대체하기 위해 사용했습니다.
이제 이 프로바이더가 등록된 컴포넌트 계층부터는 `LoggerService`가 요청되었을 때 `DateLoggerService`의 인스턴스가 대신 주입됩니다.

<div class="alert is-helpful">

이 컴포넌트와 이 컴포넌트 트리 아래에 있는 컴포넌트에는 `DateLoggerService`의 인스턴스가 주입됩니다.
하지만 이 트리 밖에 있는 컴포넌트에는 여전히 `LoggerService`의 인스턴스가 주입됩니다.

</div>

`DateLoggerService`는 `LoggerService`를 상속한 클래스이며, 원래 로그의 기능에 날짜와 시간을 함께 출력하는 클래스입니다:

<code-example header="src/app/date-logger.service.ts" path="dependency-injection-in-action/src/app/date-logger.service.ts" region="date-logger-service"></code-example>


<a id="useexisting"></a>

<!--
#### Alias providers: `useExisting`
-->
#### 별칭 프로바이더: `useExisting`

<!--
The `useExisting` provider key lets you map one token to another.
In effect, the first token is an *alias* for the service associated with the second token, creating two ways to access the same service object.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-existing"></code-example>

You can use this technique to narrow an API through an aliasing interface.
The following example shows an alias introduced for that purpose.

Imagine that `LoggerService` had a large API, much larger than the actual three methods and a property.
You might want to shrink that API surface to just the members you actually need.
In this example, the `MinimalLogger` [class-interface](#class-interface) reduces the API to two members:

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts"></code-example>

The following example puts `MinimalLogger` to use in a simplified version of `HeroOfTheMonthComponent`.

<code-example header="src/app/hero-of-the-month.component.ts (minimal version)" path="dependency-injection-in-action/src/app/hero-of-the-month.component.1.ts"></code-example>

The `HeroOfTheMonthComponent` constructor's `logger` parameter is typed as `MinimalLogger`, so only the `logs` and `logInfo` members are visible in a TypeScript-aware editor.

<div class="lightbox">

<img alt="MinimalLogger restricted API" src="generated/images/guide/dependency-injection-in-action/minimal-logger-intellisense.png">

</div>

Behind the scenes, Angular sets the `logger` parameter to the full service registered under the `LoggingService` token, which happens to be the `DateLoggerService` instance that was [provided above](guide/dependency-injection-in-action#useclass).

<div class="alert is-helpful">

This is illustrated in the following image, which displays the logging date.

<div class="lightbox">

<img alt="DateLoggerService entry" src="generated/images/guide/dependency-injection-in-action/date-logger-entry.png">

</div>

</div>
-->
`useExisting` 프로바이더 키는 어떤 토큰을 다른 토큰과 연결할 때 사용합니다.
그래서 `provide`에 사용된 토큰은 `useExisting`에 사용된 토큰의 *별칭(alias)* 역할을 하기 때문에, 결국 같은 서비스 객체를 또 다른 이름으로 참조할 수 있습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-existing"></code-example>

이 방식은 또 다른 인터페이스를 만들어서 어떤 클래스의 API를 제한하는 용도로 사용할 수 있습니다.
아래 예제에서 확인해 봅시다.

`LoggerService`가 제공하는 API가 너무 방대한데, 실제로 사용하는 API는 이 중에 2개밖에 안된다고 합시다.
그래서 이 서비스를 그대로 사용하지 않고 2개의 API만 제공하는 인터페이스를 대신 사용하려고 합니다.
아래 예제에서 `MinimalLogger` [클래스-인터페이스](#class-interface)에는 실제로 사용하는 API 2개만 정의되어 있습니다:

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts"></code-example>

그러면 `HeroOfTheMonthComponent`는 `MinimalLogger`를 주입받아 간단한 로그 서비스를 사용할 수 있습니다.

<code-example header="src/app/hero-of-the-month.component.ts (minimal version)" path="dependency-injection-in-action/src/app/hero-of-the-month.component.1.ts"></code-example>

`HeroOfTheMonthComponent`의 생성자 인자 `logger`는 `MinimalLogger` 타입으로 지정되었기 때문에 TypeScript를 지원하는 에디터에서는 `logs`와 `logInfo` 멤버만 보이게 됩니다.

<div class="lightbox">

<img alt="MinimalLogger restricted API" src="generated/images/guide/dependency-injection-in-action/minimal-logger-intellisense.png">

</div>

하지만 실제로 Angular가 `logger` 인자에 할당하는 것은 `LoggingService` 토큰에 해당하는 서비스 전체이며, 이 경우에는 [위에서 등록한 프로바이더](guide/dependency-injection-in-action#useclass) 때문에 `DateLoggerService`의 인스턴스가 주입됩니다.

<div class="alert is-helpful">

이 코드를 실행하면 날짜와 시간을 함께 출력하는 로그 서비스가 사용되는 것을 확인할 수 있습니다.

<div class="lightbox">

<img alt="DateLoggerService entry" src="generated/images/guide/dependency-injection-in-action/date-logger-entry.png">

</div>

</div>

<a id="usefactory"></a>

<!--
#### Factory providers: `useFactory`
-->
#### 팩토리 프로바이더: `useFactory`

<!--
The `useFactory` provider key lets you create a dependency object by calling a factory function, as in the following example.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-factory"></code-example>

The injector provides the dependency value by invoking a factory function, that you provide as the value of the `useFactory` key.
Notice that this form of provider has a third key, `deps`, which specifies dependencies for the `useFactory` function.

Use this technique to create a dependency object with a factory function whose inputs are a combination of *injected services* and *local state*.

The dependency object \(returned by the factory function\) is typically a class instance, but can be other things as well.
In this example, the dependency object is a string of the names of the runners-up to the "Hero of the Month" contest.

In the example, the local state is the number `2`, the number of runners-up that the component should show.
The state value is passed as an argument to `runnersUpFactory()`.
The `runnersUpFactory()` returns the *provider factory function*, which can use both the passed-in state value and the injected services `Hero` and `HeroService`.

<code-example header="runners-up.ts (excerpt)" path="dependency-injection-in-action/src/app/runners-up.ts" region="factory-synopsis"></code-example>

The provider factory function \(returned by `runnersUpFactory()`\) returns the actual dependency object, the string of names.

*   The function takes a winning `Hero` and a `HeroService` as arguments.
    Angular supplies these arguments from injected values identified by the two *tokens* in the `deps` array.

*   The function returns the string of names, which Angular then injects into the `runnersUp` parameter of `HeroOfTheMonthComponent`

<div class="alert is-helpful">

The function retrieves candidate heroes from the `HeroService`, takes `2` of them to be the runners-up, and returns their concatenated names.
Look at the <live-example name="dependency-injection-in-action"></live-example> for the full source code.

</div>
-->
`useFactory` 프로바이더 키를 사용하면 팩토리 함수가 실행되면서 반환한 객체를 의존성으로 등록할 수 있습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-factory"></code-example>

인젝터에 `useFactory` 키에 해당하는 의존성 객체 주입 요청이 들어오면 인젝터가 팩토리 함수를 실행하고 반환하는 값을 의존성으로 주입합니다.
`useFactory` 키를 사용하는 프로바이더에는 `deps` 키도 존재합니다. 이 키는 `useFactory` 함수에 필요한 의존성 객체를 정의할 때 사용합니다.

이 방식은 *의존성으로 주입되는 서비스*를 *로컬 상태*에 맞게 재구성해야 할 때 사용합니다.

팩토리 함수가 반환하는 의존성 객체는 일반적으로 클래스 인스턴스인 경우가 많지만, 반드시 그래야 하는 것은 아닙니다.
이 예제에서도 팩토리 함수가 반환하는 의존성 객체는 "Hero of the Month" 컨테스트에서 우승한 히어로의 이름을 의미하는 문자열입니다.

예제에서 로컬 상태는 숫자 `2`인데, 이 숫자는 컴포넌트에 표시해야 하는 우승자의 숫자입니다.
이 값은 `runnersUpFactory()`에 인자로 주입되며, `runnersUpFactory()`가 반환하는 것은 *또 다른 프로바이더 팩토리 함수*인데, 이 팩토리 함수는 `Hero`와 `HeroService`가 서비스로 주입되어야 합니다.

<code-example header="runners-up.ts (excerpt)" path="dependency-injection-in-action/src/app/runners-up.ts" region="factory-synopsis"></code-example>

`runnersUpFactory()`가 반환하는 프로바이더 팩토리 함수는 실제 의존성 객체로 주입되는 객체가 됩니다. 이 예제의 경우는 히어로들의 이름입니다.

*   이 함수는 우승한 `Hero`와 `HeroService`를 인자로 받아야 합니다.
    이 인자에 해당하는 객체는 `deps` 배열에 등록된 *두 토큰*을 사용해서 주입됩니다.

*   이 함수가 반환하는 히어로들의 이름은 최종적으로 `HeroOfTheMonthComponent`의 `runnersUp` 인자로 주입됩니다.

<div class="alert is-helpful">

이 함수의 역할은 `HeroService`에서 우승 후보 히어로의 이름을 `2`개 받아와서 조합된 문자열로 반환하는 것입니다.
<live-example name="dependency-injection-in-action"></live-example>에서 전체 코드를 확인해 보세요.

</div>

<a id="tokens"></a>

<!--
## Provider token alternatives: class interface and 'InjectionToken'
-->
## 프로바이더 토큰 대체하기: 클래스 인터페이스와 `InjectionToken`

<!--
Angular dependency injection is easiest when the provider token is a class that is also the type of the returned dependency object, or service.

However, a token doesn't have to be a class and even when it is a class, it doesn't have to be the same type as the returned object.
That's the subject of the next section.
-->
Angular의 의존성 주입은 프로바이더 토큰이 클래스일 때가 가장 간단한데, 의존성 객체가 객체이거나 클래스인 경우가 이 경우에 해당됩니다.

그런데 토큰이 반드시 클래스일 필요는 없으며, 토큰이 클래스이더라도 의존성으로 반환되는 객체가 꼭 그 클래스일 필요도 없습니다.
이 내용에 대해 알아봅시다.


<a id="class-interface"></a>

<!--
### Class interface
-->
### 클래스 인터페이스

<!--
The previous *Hero of the Month* example used the `MinimalLogger` class as the token for a provider of `LoggerService`.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-existing"></code-example>

`MinimalLogger` is an abstract class.

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts"></code-example>

An abstract class is usually a base class that you can extend.
In this app, however there is no class that inherits from `MinimalLogger`.
The `LoggerService` and the `DateLoggerService` could have inherited from `MinimalLogger`, or they could have implemented it instead, in the manner of an interface.
But they did neither.
`MinimalLogger` is used only as a dependency injection token.

When you use a class this way, it's called a *class interface*.

As mentioned in [Configuring dependency providers](guide/dependency-injection-providers),
an interface is not a valid DI token because it is a TypeScript artifact that doesn't exist at run time.
Use this abstract class interface to get the strong typing of an interface,
and also use it as a provider token in the way you would a normal class.

A class interface should define *only* the members that its consumers are allowed to call.
Such a narrowing interface helps decouple the concrete class from its consumers.

<div class="alert is-helpful">

Using a class as an interface gives you the characteristics of an interface in a real JavaScript object.
To minimize memory cost, however, the class should have *no implementation*.
The `MinimalLogger` transpiles to this unoptimized, pre-minified JavaScript for a constructor function.

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts" region="minimal-logger-transpiled"></code-example>

**NOTE**: <br />
It doesn't have any members.
It never grows no matter how many members you add to the class, as long as those members are typed but not implemented.

Look again at the TypeScript `MinimalLogger` class to confirm that it has no implementation.

</div>
-->
이전에 살펴본 *이번 달의 히어로* 예제에서 `MinimalLogger` 클래스는 `LoggerService`의 토큰 역할을 하며 프로바이더에 등록되었습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="use-existing"></code-example>

그리고 `MinimalLogger`는 다음과 같은 추상 클래스입니다.

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts"></code-example>

추상 클래스는 상속하기 위한 기초가 되는 클래스로 사용하는 것이 일반적입니다.
하지만 이 앱에서 `MinimalLogger`를 상속받는 클래스는 하나도 없습니다.
물론 `LoggerService`나 `DateLoggerService`도 `MinimalLogger`를 상속받을 수 있으며, `MinimalLogger`를 인터페이스로 정의하고 이 인터페이스를 기반으로 구현할 수도 있습니다.
하지만 이 경우는 두가지 방법 중 아무것도 사용되지 않습니다.
`MinimalLogger`는 오로지 의존성 주입 토큰으로만 사용될 뿐입니다.

클래스가 이렇게 사용되는 것을 *클래스 인터페이스*라고 합니다.

[의존성 프로바이더 설정하기](guide/dependency-injection-providers)에서 언급했던 것처럼, 인터페이스는 TypeScript에만 있는 개념이며 애플리케이션이 실행되는 시점에는 존재하지 않기 때문에 의존성 주입 토큰으로 사용할 수 없습니다.
그래서 인터페이스처럼 형태를 강제할 수 있고, 일반 클래스처럼 프로바이더 토큰으로 사용할 수 있는 추상 클래스 인터페이스를 사용하는 것입니다.

그리고 클래스 인터페이스에는 이 클래스가 주입된 곳에서 *사용할 수 있는 멤버만* 정의하는 것이 좋습니다.
이렇게 인터페이스를 제한하면 클래스 사이의 결합도를 낮출 수 있습니다.

<div class="alert is-helpful">

클래스를 인터페이스처럼 사용하면 JavaScript 환경에서도 인터페이스를 사용하는 효과를 얻을 수 있습니다.
하지만 사용되는 메모리를 절약하기 위해 이 클래스에는 *실제 메소드를 정의하는 내용*이 없어야 합니다.
이 클래스가 TypeScript 컴파일러에 의해 트랜스파일되고 아직 압축되기 전 시점의 JavaScript 코드는 다음과 같습니다.

<code-example header="src/app/minimal-logger.service.ts" path="dependency-injection-in-action/src/app/minimal-logger.service.ts" region="minimal-logger-transpiled"></code-example>

**참고**: <br />
코드를 보면 알 수 있듯이 이 클래스의 멤버는 하나도 없습니다.
왜냐하면 이 클래스에 정의된 모든 멤버는 클래스 멤버의 타입을 지정하는 용도로만 사용되었기 때문입니다.

`MinimalLogger` 클래스에는 메소드의 구현체를 의도적으로 정의하지 않았습니다.

</div>


<a id="injection-token"></a>
<!--
### 'InjectionToken' objects
-->
### `InjectionToken` 객체

<!--
Dependency objects can be simple values like dates, numbers, and strings, or shapeless objects like arrays and functions.

Such objects don't have application interfaces and therefore aren't well represented by a class.
They're better represented by a token that is both unique and symbolic, a JavaScript object that has a friendly name but won't conflict with another token that happens to have the same name.

`InjectionToken` has these characteristics.
You encountered them twice in the *Hero of the Month* example, in the *title* value provider and in the *runnersUp* factory provider.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="provide-injection-token"></code-example>

You created the `TITLE` token like this:

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="injection-token"></code-example>

The type parameter, while optional, conveys the dependency's type to developers and tooling.
The token description is another developer aid.
-->
의존성 객체는 Date 객체나 숫자, 문자열 뿐 아니라 배열이나 함수가 될 수도 있습니다.

이런 객체는 인터페이스로 다시 정의할 필요는 없으며 클래스로 정의해야 할 이유는 더더욱 없습니다.
이 객체는 이름이 겹치지 않고, 그 자체로 의미를 표현할 수 있는 JavaScript 객체, 즉, 토큰이기만 하면 되고, 쉽게 이해할 수 있지만 다른 곳에서 사용하는 이름과 겹치지 않기만 하면 됩니다.

`InjectionToken`은 이런 경우에 사용합니다.
이 객체는 *이번 달의 히어로* 예제를 설명하면서 다룬 *title* 값 프로바이더와 *runnersUp* 팩토리 프로바이더에 이미 사용되었습니다.

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="provide-injection-token"></code-example>

`TITLE` 토큰은 다음과 같이 정의합니다:

<code-example header="src/app/hero-of-the-month.component.ts" path="dependency-injection-in-action/src/app/hero-of-the-month.component.ts" region="injection-token"></code-example>

제네릭으로 사용된 타입 정보는 생략할 수 있습니다.
이 타입은 단순하게 개발자와 IDE에 좀 더 많은 정보를 제공하기 위해 지정한 것입니다.
생성자 인자로 사용한 토큰 설명도 마찬가지입니다.


<a id="di-inheritance"></a>

<!--
## Inject into a derived class
-->
## 상속된 클래스로 의존성 주입하기

<!--
Take care when writing a component that inherits from another component.
If the base component has injected dependencies, you must re-provide and re-inject them in the derived class and then pass them down to the base class through the constructor.

In this contrived example, `SortedHeroesComponent` inherits from `HeroesBaseComponent` to display a *sorted* list of heroes.

<div class="lightbox">

<img alt="Sorted Heroes" src="generated/images/guide/dependency-injection-in-action/sorted-heroes.png">

</div>

The `HeroesBaseComponent` can stand on its own.
It demands its own instance of `HeroService` to get heroes and displays them in the order they arrive from the database.

<code-example header="src/app/sorted-heroes.component.ts (HeroesBaseComponent)" path="dependency-injection-in-action/src/app/sorted-heroes.component.ts" region="heroes-base"></code-example>

<div class="alert is-helpful">
-->
어떤 컴포넌트를 상속하는 컴포넌트를 구현한다면 주의할 필요가 있습니다.
왜냐하면 부모 컴포넌트에 의존성 주입이 필요한 경우에 이 의존성 객체는 자식 클래스에도 주입되어야 하고, 이 의존성 객체들이 자식 컴포넌트의 생성자에서 부모 컴포넌트의 생성자로 전달되어야 하기 때문입니다.

이 말이 조금 이상해 보일 수도 있습니다.
이번에는 `HeroesBaseComponent`를 상속받아 히어로의 목록을 *정렬해서 출력하는* `SortedHeroesComponent`를 보면서 자세하게 알아봅시다.

<div class="lightbox">

<img alt="Sorted Heroes" src="generated/images/guide/dependency-injection-in-action/sorted-heroes.png">

</div>

`HeroesBaseComponent`는 단독으로도 사용할 수 있습니다.
이 컴포넌트는 히어로의 목록을 가져오기 위해 `HeroService` 인스턴스가 필요하며, 이렇게 가져온 목록을 DB에서 꺼내온 그대로 화면에 표시합니다.

<code-example header="src/app/sorted-heroes.component.ts (HeroesBaseComponent)" path="dependency-injection-in-action/src/app/sorted-heroes.component.ts" region="heroes-base"></code-example>

<!--
<div class="alert is-helpful">

### Keep constructors simple

Constructors should do little more than initialize variables.
This rule makes the component safe to construct under test without fear that it will do something dramatic like talk to the server.
That's why you call the `HeroService` from within the `ngOnInit` rather than the constructor.

</div>
-->
<div class="alert is-helpful">

### 생성자는 간단하게 유지하세요.

생성자는 최대한 간단하게 작성되어야 하며 변수 초기화만 하는 것이 이상적입니다.
이렇게 작성하면 컴포넌트가 서버와 통신하는 로직이 실행되는 것을 방지할 수 있기 때문에 유닛 테스트를 편하게 적용할 수 있습니다.
그래서 `HeroService`를 활용하는 로직은 생성자가 아니라 `ngOnInit`에 작성하는 것이 좋습니다.

</div>

<!--
Users want to see the heroes in alphabetical order.
Rather than modify the original component, subclass it and create a `SortedHeroesComponent` that sorts the heroes before presenting them.
The `SortedHeroesComponent` lets the base class fetch the heroes.

Unfortunately, Angular cannot inject the `HeroService` directly into the base class.
You must provide the `HeroService` again for *this* component, then pass it down to the base class inside the constructor.

<code-example header="src/app/sorted-heroes.component.ts (SortedHeroesComponent)" path="dependency-injection-in-action/src/app/sorted-heroes.component.ts" region="sorted-heroes"></code-example>

Now take notice of the `afterGetHeroes()` method.
Your first instinct might have been to create an `ngOnInit` method in `SortedHeroesComponent` and do the sorting there.
But Angular calls the *derived* class's `ngOnInit` *before* calling the base class's `ngOnInit` so you'd be sorting the heroes array *before they arrived*.
That produces a nasty error.

Overriding the base class's `afterGetHeroes()` method solves the problem.

These complications argue for *avoiding component inheritance*.
-->
히어로의 목록을 알파벳 순서로 정렬해서 보고 싶다고 합시다.
그런데 이 때 원래 컴포넌트는 수정하지 않고 자식 클래스인 `SortedHeroesComponent`에서 히어로의 목록을 정렬한 후에 화면에 표시하려고 합니다.
`SortedHeroesComponent`는 부모 컴포넌트가 히어로 목록을 가져온다는 것을 알고 있는 상태입니다.

하지만 Angular는 의존성 객체인 `HeroService`를 부모 컴포넌트에 직접 주입할 수 없습니다.
부모 컴포넌트에 주입되는 `HeroService`는 *자식* 컴포넌트를 통해 주입되어야 하는데, 이 예제처럼 자식 컴포넌트의 생성자에서 부모 클래스의 생성자로 전달되어야 합니다.

<code-example header="src/app/sorted-heroes.component.ts (SortedHeroesComponent)" path="dependency-injection-in-action/src/app/sorted-heroes.component.ts" region="sorted-heroes"></code-example>

`afterGetHeroes()` 메소드에 대해 생각해 봅시다.
얼핏 `SortedHeroesComponent`의 `ngOnInit` 메소드에서 히어로를 정렬하는 것이 낫다는 생각이 들 수 있습니다.
하지만 Angular는 *자식* 클래스의 `ngOnInit`를 부모 클래스의 `ngOnInit` 보다 *먼저* 실행하기 때문에, 이렇게 구현하면 *히어로의 목록을 컴포넌트에 가져오기도 전에* 정렬하는 로직이 실행되게 됩니다. 물론 에러가 발생합니다.

그래서 `afterGetHeroes()` 메소드는 부모 클래스에 선언하고 이 함수를 자식 컴포넌트에서 오버라이드하는 방식으로 구현해야 합니다.

*컴포넌트를 상속할 때는* 이런 의존성 관계를 주의해야 합니다.


<a id="forwardref"></a>

<!--
## Resolve circular dependencies with a forward class reference (*forwardRef*)
-->
## *forwardRef*로 순환 참조 해결하기

<!--
The order of class declaration matters in TypeScript.
You can't refer directly to a class until it's been defined.

This isn't usually a problem, especially if you adhere to the recommended *one class per file* rule.
But sometimes circular references are unavoidable.
For example, when class 'A' refers to class 'B' and 'B' refers to 'A'.
One of them has to be defined first.

The Angular `forwardRef()` function creates an *indirect* reference that Angular can resolve later.

The *Parent Finder* sample is full of circular class references that are impossible to break.

You face this dilemma when a class makes *a reference to itself* as does `AlexComponent` in its `providers` array.
The `providers` array is a property of the `@Component()` decorator function which must appear *above* the class definition.

Break the circularity with `forwardRef`.

<code-example header="parent-finder.component.ts (AlexComponent providers)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers"></code-example>
-->
TypeScript에서는 클래스가 정의되는 순서도 신경써야 합니다.
클래스는 선언되기 전에 참조할 수 없습니다.

일반적인 경우에 *한 파일에 한 클래스*를 정의하는 규칙을 잘 지켰다면 이 제약은 큰 문제가 되지 않습니다.
하지만 이 규칙을 지키는 경우에도 순환 참조가 발생할 수 있습니다.
클래스 'A'가 클래스 'B'를 참조하는데 클래스 'B'가 다시 클래스 'A'를 참조한다고 합시다.
이 경우에 클래스 둘 중 하나는 반드시 먼저 정의되어야 하지만, 두 클래스는 순환 참조 관계이기 때문에 어느 한 클래스가 먼저 정의될 수 없습니다.

이 때 Angular가 제공하는 `forwardRef()`를 사용하면 의존성 객체에 대한 참조를 *간접 참조*로 만들면서 클래스를 생성하고, 이 의존성 객체를 나중에 처리할 수 있습니다.

순환 참조가 발생하는 *부모 찾기(Parent Finder)* 예제를 확인해 보세요.

이 예제에서 `AlexComponent`는 컴포넌트의 데코레이터 `providers` 배열에 바로 등록되어 있습니다.
하지만 `providers` 배열은 `@Component()` 데코레이터의 프로퍼티이기 때문에 이 클래스가 먼저 선언되어야 해당 컴포넌트를 참조할 수 있습니다.

이 경우에도 `forwardRef`를 사용하면 순환 참조 문제를 해결할 수 있습니다.

<code-example header="parent-finder.component.ts (AlexComponent providers 배열)" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers"></code-example>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
