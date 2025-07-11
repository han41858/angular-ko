<!--
# Inject-based dependency injection
-->
# 의존성 주입하기

<!--
Creating an injectable service is the first part of the dependency injection (DI) system in Angular. How do you inject a service into a component? Angular has a convenient function called `inject()` that can be used in the proper context.

NOTE: Injection contexts are beyond the scope of this tutorial, but you can learn more in the [dependency injection (DI) essentials guide](/essentials/dependency-injection) and [DI context guide](guide/di/dependency-injection-context).

In this activity, you'll learn how to inject a service and use it in a component.

<hr>

It is often helpful to initialize class properties with values provided by the DI system. Here's an example:

<docs-code language="ts" highlight="[3]">
@Component({...})
class PetCareDashboard {
    petRosterService = inject(PetRosterService);
}
</docs-code>

<docs-workflow>

<docs-step title="Inject the `CarService`">

In `app.ts`, using the `inject()` function inject the `CarService` and assign it to a property called `carService`

NOTE: Notice the difference between the property `carService` and the class `CarService`.

</docs-step>

<docs-step title="Use the `carService` instance">

Calling `inject(CarService)` gave you an instance of the `CarService` that you can use in your application, stored in the `carService` property.

Initialize the `display` property with the following implementation:

```ts
display = this.carService.getCars().join(' ⭐️ ');
```

</docs-step>

<docs-step title="Update the `App` template">

Update the component template in `app.ts` with the following code:

```ts
template: `<p>Car Listing: {{ display }}</p>`,
```

</docs-step>

</docs-workflow>

You've just injected your first service into a component - fantastic effort.
-->
Angular의 의존성 주입(Dependency Injection, DI) 시스템을 활용하려면 의존성으로 주입가능한 서비스를 만드는 것이 첫 시작입니다.
그런데 서비스는 컴포넌트로 어떻게 주입할까요?
Angular는 이 경우에 사용할 수 있는 `inject()` 함수를 제공합니다.

참고: 의존성 주입 객체의 컨텍스트는 이 문서에서 다루지 않습니다. 자세한 내용은 [의존성 주입 핵심 가이드](/essentials/dependency-injection) 문서와 [의존성 주입 컨텍스트 가이드](guide/di/dependency-injection-context)  문서를 참고하세요.

이번 튜토리얼에서는 서비스 클래스를 의존성 객체로 어떻게 주입하는지, 컴포넌트에서 어떻게 사용하면 되는지 알아봅시다.

<hr>

의존성으로 주입하는 클래스 프로퍼티는 프로퍼티를 선언하면서 주입하는 것이 편리합니다.
예제를 봅시다:

<docs-code language="ts" highlight="[3]">
@Component({...})
class PetCareDashboard {
    petRosterService = inject(PetRosterService);
}
</docs-code>

<docs-workflow>

<docs-step title="`CarService`를 의존성으로 주입합니다">

`app.ts` 파일에서 `inject()` 함수를 사용해서 `carService` 프로퍼티에 `CarService`를 의존성으로 주입합니다.

참고: 프로퍼티 `carService`와 클래스 `CarService`는 다릅니다.

</docs-step>

<docs-step title="`carService` 인스턴스를 사용해 보세요">

`inject(CarService)`를 실행해서 `CarService`의 인스턴스를 가져온 뒤에는 이 인스턴스를 `carService` 프로퍼티에 할당해서 활용할 수 있습니다.

아래 예제처럼 `display` 프로퍼티를 선언해 봅시다:

```ts
display = this.carService.getCars().join(' ⭐️ ');
```

</docs-step>

<docs-step title="`App` 컴포넌트의 템플릿을 수정하세요">

`app.ts` 파일의 컴포넌트 템플릿을 수정해 봅시다:

```ts
template: `<p>Car Listing: {{ display }}</p>`,
```

</docs-step>

</docs-workflow>

이제 서비스를 컴포넌트로 의존성 주입할 수 있게 되었습니다.
아주 훌륭합니다!
