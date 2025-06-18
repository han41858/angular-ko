<docs-decorative-header title="의존성 주입" imgSrc="adev/src/assets/images/dependency_injection.svg"> <!-- markdownlint-disable-line -->
애플리케이션 전반과 테스트에 코드를 재사용 해보세요.
</docs-decorative-header>

<!--
When you need to share logic between components, Angular leverages the design pattern of [dependency injection](guide/di) that allows you to create a “service” which allows you to inject code into components while managing it from a single source of truth.
-->
여러 컴포넌트에 로직이 중복되는 경우에는 Angular가 제공하는 [의존성 주입](guide/di) 디자인 패턴을 사용하는 것이 좋습니다.
의존성 주입을 활용하면 재사용할 수 있는 로직을 서비스로 만들어서 컴포넌트에 주입할 수 있습니다.

<!--
## What are services?
-->
## 서비스가 무엇인가요?

<!--
Services are reusable pieces of code that can be injected.

Similar to defining a component, services are comprised of the following:

- A **TypeScript decorator** that declares the class as an Angular service via `@Injectable` and allows you to define what part of the application can access the service via the `providedIn` property (which is typically `'root'`) to allow a service to be accessed anywhere within the application.
- A **TypeScript class** that defines the desired code that will be accessible when the service is injected

Here is an example of a `Calculator` service.
-->
서비스(service)는 재사용해야 하는 코드를 의존성으로 주입할 수 있는 형태로 만든 것입니다.

컴포넌트를 선언하는 것과 비슷하게, 서비스는 이렇게 정의합니다:

- **TypeScript 데코레이터** - `@injectable` 데코레이터를 사용하면 TypeScript를 Angular 서비스로 등록할 수 있습니다. 이 데코레이터를 사용할 때 `providedIn` 프로퍼티를 `'root'`로 지정하면 애플리케이션 전역에서 이 서비스를 활용할 수 있습니다.
- **TypeScript 클래스** - 의존성으로 주입해서 활용할 코드를 정의합니다.

`Calculator` 서비스 예제를 살펴봅시다.

```angular-ts
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Calculator {
  add(x: number, y: number) {
    return x + y;
  }
}
```


<!--
## How to use a service
-->
## 서비스는 어떻게 사용하나요?

<!--
When you want to use a service in a component, you need to:

1. Import the service
2. Declare a class field where the service is injected. Assign the class field to the result of the call of the built-in function `inject` which creates the service

Here’s what it might look like in the `Receipt` component:
-->
컴포넌트에서 서비스를 사용하려면:

1. 서비스를 불러옵니다.
2. 불러온 서비스를 클래스 필드로 선언합니다. 이 때 `inject` 함수를 실행하면 원하는 서비스를 의존성 객체로 참조할 수 있습니다.

`Receipt` 컴포넌트를 살펴봅시다:

```angular-ts
import { Component, inject } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-receipt',
  template: `<h1>The total is {{ totalCost }}</h1>`,
})

export class Receipt {
  private calculator = inject(Calculator);
  totalCost = this.calculator.add(50, 25);
}
```

<!--
In this example, the `Calculator` is being used by calling the Angular function `inject` and passing in the service to it.
-->
이 예제를 보면, `Calculator` 서비스를 `inject` 함수로 불러와서 클래스 필드에 할당했습니다.


<!--
## Next Step
-->
## 다음 단계

<!--
<docs-pill-row>
  <docs-pill title="Next Steps After Essentials" href="essentials/next-steps" />
  <docs-pill title="In-depth dependency injection guide" href="guide/di" />
</docs-pill-row>
-->
<docs-pill-row>
  <docs-pill title="핵심 가이드 그 이후" href="essentials/next-steps" />
  <docs-pill title="의존성 주입 심화 가이드" href="guide/di" />
</docs-pill-row>
