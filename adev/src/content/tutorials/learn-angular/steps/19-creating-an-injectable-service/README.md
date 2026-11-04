<!--
# Creating an injectable service
-->

<a id="creating-an-injectable-service"></a>

# 의존성으로 주입 가능한(injectable) 서비스 생성하기

<!--
Dependency injection (DI) in Angular is one of the framework's most powerful features. Consider dependency injection to be the ability for Angular to _provide_ resources you need for your application at runtime. A dependency could be a service or some other resources.

NOTE: Learn more about [dependency injection in the essentials guide](/essentials/dependency-injection).

In this activity, you'll learn how to create an `injectable` service.

<hr>

One way to use a service is to act as a way to interact with data and APIs. To make a service reusable you should keep the logic in the service and share it throughout the application when it is needed.

To make a class eligible to be injected by the DI system, use the `@Service` decorator. For example:

```ts {highlight:[1]}
@Service()
class UserService {
  // methods to retrieve and return data
}
```

The `@Service` decorator marks the class as a service and notifies the DI system that `UserService` can be accessed anywhere in your application. By default, Angular provides the service across your entire application, so you don't need to write any extra configuration.

NOTE: By default, `@Service` provides the class at the root injector. If you want to provide it manually, for example, to scope it to a specific route or component, set `autoProvided: false`. Learn more in the [guide on creating and using services](guide/di/creating-and-using-services#using-the-service-vs-injectable-decorator).

Alright, you try:

<docs-workflow>

<docs-step title="Add the `@Service` decorator">
Update the code in `car.service.ts` by adding the `@Service()` decorator to the `CarService` class.

TIP: Use the above example to find the correct syntax.

</docs-step>

</docs-workflow>

Well, done 👍 that service is now `injectable` and can participate in the fun. Now that the service is `injectable`, let's try injecting it into a component 👉
-->

의존성 주입(Dependency injection, DI)은 Angular가 제공하는 기능 중 가장 중요한 기능이라고 해도 지나치지 않습니다.
의존성 주입이란 실행 시점에 필요한 리소스를 Angular가 제공하는 기능이라고 생각하면 됩니다.
이때 의존성 객체는 서비스 등 어떠한 리소스라도 가능합니다.

참고: 자세한 내용은 [의존성 주입 핵심 가이드](/essentials/dependency-injection) 문서를 참고하세요.

이번 튜토리얼에서는 _의존성으로 주입할 수 있는(injectable)_ 서비스를 만들어 봅시다.

<hr>

서비스는 API를 통해 데이터를 받아와서 다른 곳으로 전달할 때 많이 사용합니다.
애플리케이션 곳곳에서 사용하는 로직을 서비스에 구현해 두고 필요한 곳마다 이 서비스를 주입해서 사용하는 방식이 일반적입니다.

서비스를 의존성 주입 시스템에 주입할 수 있도록 지정하려면 서비스 클래스에 `@Service` 데코레이터를 붙이면 됩니다:

```ts {highlight:[1]}
@Service()
class UserService {
  // 데이터를 받아와서 반환하는 메서드를 정의합니다.
}
```

`@Service` 데코레이터는 클래스를 서비스로 표시하고 애플리케이션 어디서든 `UserService`에 접근할 수 있음을 의존성 주입 시스템에 알립니다.
기본적으로 Angular가 애플리케이션 전체에 서비스를 제공하므로 추가 설정을 작성할 필요가 없습니다.

NOTE: 기본적으로 `@Service`는 루트 인젝터에서 클래스를 제공합니다. 특정 라우팅 규칙이나 컴포넌트 범위로 제한하는 등 직접 제공하려면 `autoProvided: false`를 설정하세요. 자세한 내용은 [서비스 생성과 사용 가이드](guide/di/creating-and-using-services#using-the-service-vs-injectable-decorator)를 참고하세요.

좋습니다. 이렇게 해봅시다:

<docs-workflow>

<a id="add-the-service-decorator"></a>

<docs-step title="`@Service` 데코레이터를 추가하세요">

`car.service.ts` 파일의 `CarService` 클래스에 `@Service()` 데코레이터를 추가해 보세요.

팁: 위쪽에서 다룬 예제 코드를 참고하세요.

</docs-step>

</docs-workflow>

잘 하셨습니다 👍
이제 의존성 객체로 주입할 수 있는 서비스로 더 재미있는 작업을 할 수 있게 되었습니다.
이 서비스를 컴포넌트에 주입해 봅시다 👉
