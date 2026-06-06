<!--
# Creating an injectable service
-->

# 의존성으로 주입 가능한(injectable) 서비스 생성하기

<!--
Dependency injection (DI) in Angular is one of the framework's most powerful features. Consider dependency injection to be the ability for Angular to _provide_ resources you need for your application at runtime. A dependency could be a service or some other resources.

NOTE: Learn more about [dependency injection in the essentials guide](/essentials/dependency-injection).

In this activity, you'll learn how to create an `injectable` service.

<hr>

One way to use a service is to act as a way to interact with data and APIs. To make a service reusable you should keep the logic in the service and share it throughout the application when it is needed.

To make a service eligible to be injected by the DI system use the `@Injectable` decorator. For example:

```ts {highlight:[1,2,3]}
@Injectable({
  providedIn: 'root',
})
class UserService {
  // methods to retrieve and return data
}
```

The `@Injectable` decorator notifies the DI system that the `UserService` is available to be requested in a class. `providedIn` sets the scope in which this resource is available. For now, it is good enough to understand that `providedIn: 'root'` means that the `UserService` is available to the entire application.

Alright, you try:

<docs-workflow>

<docs-step title="Add the `@Injectable` decorator">
Update the code in `car.service.ts` by adding the `@Injectable` decorator.
</docs-step>

<docs-step title="Configure the decorator">
The values in the object passed to the decorator are considered to be the configuration for the decorator.
<br>
Update the `@Injectable` decorator in `car.service.ts` to include the configuration for `providedIn: 'root'`.

TIP: Use the above example to find the correct syntax.

</docs-step>

</docs-workflow>

Well, done 👍 that service is now `injectable` and can participate in the fun. Now that the service is `injectable`, let's try injecting it into a component 👉
-->
의존성 주입(Dependency injection, DI)은 Angular가 제공하는 기능 중 가장 중요한 기능이라고 해도 지나치지 않습니다.
의존성 주입이란 실행 시점에 필요한 리소스를 Angular가 제공하는 기능이라고 생각하면 됩니다.
이 때 의존성 객체는 서비스 등 어떠한 리소스라도 가능합니다.

참고: 자세한 내용은 [의존성 주입 핵심 가이드](/essentials/dependency-injection) 문서를 참고하세요.

이번 튜토리얼에서는 _의존성으로 주입할 수 있는(injectable)_ 서비스를 만들어 봅시다.

<hr>

서비스는 API를 통해 데이터를 받아와서 다른 곳으로 전달할 때 많이 사용합니다.
애플리케이션 곳곳에서 사용하는 로직을 서비스에 구현해 두고 필요한 곳마다 이 서비스를 주입해서 사용하는 방식이 일반적입니다.

서비스를 의존성 주입 시스템에 주입할 수 있도록 지정하려면 서비스 클래스에 `@Injectable` 데코레이터를 붙이면 됩니다:

<docs-code language="ts" highlight="[1, 2, 3]">
@Injectable({
    providedIn: 'root'
})
class UserService {
    // 데이터를 받아와서 반환하는 메서드를 정의합니다.
}
</docs-code>

`@Injectable` 데코레이터를 지정하면 `UserService` 클래스가 의존성 주입 시스템에 등록되어 어딘가 사용된다는 것을 의미합니다.
`providedIn`은 이 리소스가 어떤 범위에 등록될 것인지 지정합니다.
지금은 `providedIn: 'root'`라고 지정했기 때문에 `UserService`를 애플리케이션 전체 범위에서 활용할 수 있습니다.

좋습니다. 이렇게 해봅시다:

<docs-workflow>

<docs-step title="`@Injectable` 데코레이터를 추가하세요">

`car.service.ts` 파일에 `@Injectable` 데코레이터를 추가해 보세요.

</docs-step>

<docs-step title="데코레이터 설정값을 지정하세요">

데코레이터를 지정하면서 데코레이터 동작에 대한 설정을 객체 타입으로 전달할 수 있습니다.

<br>

`car.service.ts` 파일의 `@Injectable` 데코레이터를 수정해서 `providedIn: 'root'`로 지정해 보세요.

팁: 위쪽에서 다룬 예제 코드를 참고하세요.

</docs-step>

</docs-workflow>

잘 하셨습니다 👍
이제 의존성 객체로 주입할 수 있는 서비스로 더 재미있는 작업을 할 수 있게 되었습니다.
이 서비스를 컴포넌트에 주입해 봅시다 👉
