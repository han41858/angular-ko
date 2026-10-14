<!--
# Testing services
-->

<a id="testing-services"></a>

# 서비스 테스트하기

<!--
Services typically contain your application's business logic that components rely on. Testing services verifies that the logic works correctly in isolation, independent of any component or template.

This guide uses [Vitest](https://vitest.dev/), which Angular CLI projects include by default. For more on testing setup, see the [testing overview guide](guide/testing#set-up-for-testing).
-->

서비스에는 보통 컴포넌트가 사용하는 애플리케이션의 비즈니스 로직이 담겨 있습니다.
서비스를 테스트하면 컴포넌트나 템플릿에 의존하지 않고 로직 자체가 제대로 동작하는지 확인할 수 있습니다.

이 문서에서는 Angular CLI 프로젝트에 기본으로 포함된 [Vitest](https://vitest.dev/)를 사용합니다.
테스트 환경 설정은 [테스트 개요](guide/testing#set-up-for-testing)를 참고하세요.

<!--
## Testing a service
-->

<a id="testing-a-service"></a>

## 서비스 테스트하기

<!--
Consider a `Calculator` service that performs basic arithmetic:

```ts { header: 'calculator.ts' }
import {Service} from '@angular/core';

@Service()
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}
```

To test this service, configure a `TestBed`, which is Angular's testing utility for creating an isolated testing environment for each test. It sets up dependency injection and lets you retrieve service instances — simulating how Angular wires things together in a real application.

```ts { header: 'calculator.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import {Calculator} from './calculator';

describe('Calculator', () => {
  let service: Calculator;

  beforeEach(() => {
    // Injects the Calculator service which is available to Angular
    // because the service uses `@Service`
    service = TestBed.inject(Calculator);
  });

  it('adds two numbers', () => {
    expect(service.add(1, 2)).toBe(3);
  });

  it('subtracts two numbers', () => {
    expect(service.subtract(5, 3)).toBe(2);
  });
});
```

In the example above, the `beforeEach` block injects a fresh instance of the service before every test. This ensures each test runs in isolation with no leaked state from previous tests.
-->

기본 산술 연산을 수행하는 `Calculator` 서비스를 살펴봅시다.

```ts { header: 'calculator.ts' }
import {Service} from '@angular/core';

@Service()
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}
```

이 서비스를 테스트하려면 각 테스트에 독립적인 테스트 환경을 만드는 Angular 테스트 유틸리티 `TestBed`를 설정합니다.
`TestBed`는 의존성 주입을 구성하고 서비스 인스턴스를 가져올 수 있게 해서, 실제 애플리케이션에서 Angular가 구성 요소를 연결하는 방식을 재현합니다.

```ts { header: 'calculator.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import {Calculator} from './calculator';

describe('Calculator', () => {
  let service: Calculator;

  beforeEach(() => {
    // Calculator 서비스를 주입합니다.
    // 서비스가 `@Service`를 사용하므로 Angular에서 사용할 수 있습니다
    service = TestBed.inject(Calculator);
  });

  it('adds two numbers', () => {
    expect(service.add(1, 2)).toBe(3);
  });

  it('subtracts two numbers', () => {
    expect(service.subtract(5, 3)).toBe(2);
  });
});
```

위 예제의 `beforeEach` 블록은 각 테스트 전에 새로운 서비스 인스턴스를 주입합니다.
그래서 이전 테스트의 상태가 남지 않고 각 테스트가 독립적으로 실행됩니다.

<!--
## Testing services with dependencies
-->

<a id="testing-services-with-dependencies"></a>

## 의존성이 있는 서비스 테스트하기

<!--
Most services depend on other services to run properly. By default, `TestBed` provides the real implementations of these dependencies, which means your tests exercise the actual code paths your application uses. Sometimes, however, a dependency may be complex, slow, or unpredictable. In those cases, you can substitute it with a controlled replacement.

Consider an `OrderTotal` service that relies on a `TaxCalculator` to compute the final price of an order:

```ts { header: 'tax-calculator.ts' }
import {Service} from '@angular/core';

@Service()
export class TaxCalculator {
  calculate(subtotal: number): number {
    return subtotal * 0.05;
  }
}
```

```ts { header: 'order-total.ts' }
import {inject, Service} from '@angular/core';
import {TaxCalculator} from './tax-calculator';

@Service()
export class OrderTotal {
  private taxCalculator = inject(TaxCalculator);

  total(subtotal: number): number {
    return subtotal + this.taxCalculator.calculate(subtotal);
  }
}
```

In this example, `OrderTotal` uses `inject()` to request `TaxCalculator` from Angular's dependency injection system. By default, `TestBed` provides the real `TaxCalculator` which is perfect for simple calculations like this. However, if `TaxCalculator` involved complex logic, network requests, or unpredictable results, you might want to substitute it with a controlled replacement.
-->

대부분의 서비스는 정상 동작하기 위해 다른 서비스에 의존합니다.
`TestBed`는 기본으로 의존성의 실제 구현을 제공하므로, 테스트에서도 애플리케이션이 사용하는 실제 코드 경로를 실행합니다.
하지만 의존성이 복잡하거나 느리거나 결과를 예측하기 어려운 경우도 있습니다.
이럴 때는 직접 제어할 수 있는 구현으로 교체할 수 있습니다.

`TaxCalculator`로 주문의 최종 금액을 계산하는 `OrderTotal` 서비스를 살펴봅시다.

```ts { header: 'tax-calculator.ts' }
import {Service} from '@angular/core';

@Service()
export class TaxCalculator {
  calculate(subtotal: number): number {
    return subtotal * 0.05;
  }
}
```

```ts { header: 'order-total.ts' }
import {inject, Service} from '@angular/core';
import {TaxCalculator} from './tax-calculator';

@Service()
export class OrderTotal {
  private taxCalculator = inject(TaxCalculator);

  total(subtotal: number): number {
    return subtotal + this.taxCalculator.calculate(subtotal);
  }
}
```

이 예제에서 `OrderTotal`은 `inject()`로 Angular 의존성 주입 시스템에 `TaxCalculator`를 요청합니다.
`TestBed`는 기본으로 실제 `TaxCalculator`를 제공하며, 이처럼 간단한 계산에는 적합합니다.
하지만 `TaxCalculator`에 복잡한 로직이나 네트워크 요청이 있거나 결과를 예측하기 어렵다면, 직접 제어할 수 있는 구현으로 교체하는 것이 좋을 수 있습니다.

<!--
### Replacing a dependency with a stub
-->

<a id="replacing-a-dependency-with-a-stub"></a>

### 의존성을 스텁으로 교체하기

<!--
A stub is a way to replace a dependency or method with one that returns predictable values, which can make test results easier to verify.

To test `OrderTotal` without relying on the real `TaxCalculator`, you can provide a stub in the `TestBed` configuration.

```ts { header: 'order-total.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it, vi, type Mocked} from 'vitest';
import {OrderTotal} from './order-total';
import {TaxCalculator} from './tax-calculator';

// Vitest's `Mocked` utility type ensures the stub is type-safe,
// while `vi.fn()` creates a mock function for each method
const taxCalculatorStub: Mocked<TaxCalculator> = {
  calculate: vi.fn(),
};

describe('OrderTotal', () => {
  let service: OrderTotal;

  beforeEach(() => {
    // `mockReturnValue` sets a controlled return value for the stub
    taxCalculatorStub.calculate.mockReturnValue(5);

    TestBed.configureTestingModule({
      // The `providers` array accepts a provider object where `provide`
      // specifies the dependency to replace and `useValue` defines the stub
      providers: [{provide: TaxCalculator, useValue: taxCalculatorStub}],
    });
    service = TestBed.inject(OrderTotal);
  });

  it('adds tax to the subtotal', () => {
    expect(service.total(100)).toBe(105);
  });
});
```

With this stub, whenever `OrderTotal` requests `TaxCalculator`, the `TestBed` knows to use the `taxCalculatorStub` instead. Because the stub always returns 5, the test verifies that `OrderTotal` correctly adds the tax value to the subtotal regardless of whether the tax rate changes in `TaxCalculator`.
-->

스텁(stub)은 의존성이나 메서드를 예측할 수 있는 값을 반환하는 구현으로 교체하는 방법입니다.
이를 활용하면 테스트 결과를 검증하기 쉽습니다.

실제 `TaxCalculator`에 의존하지 않고 `OrderTotal`을 테스트하려면 `TestBed` 설정에 스텁을 제공하세요.

```ts { header: 'order-total.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it, vi, type Mocked} from 'vitest';
import {OrderTotal} from './order-total';
import {TaxCalculator} from './tax-calculator';

// Vitest의 `Mocked` 유틸리티 타입으로 스텁의 타입 안전성을 보장하고,
// `vi.fn()`으로 각 메서드의 목 함수를 생성합니다
const taxCalculatorStub: Mocked<TaxCalculator> = {
  calculate: vi.fn(),
};

describe('OrderTotal', () => {
  let service: OrderTotal;

  beforeEach(() => {
    // `mockReturnValue`로 스텁의 반환값을 지정합니다
    taxCalculatorStub.calculate.mockReturnValue(5);

    TestBed.configureTestingModule({
      // `providers` 배열에는 프로바이더 객체를 넣습니다. `provide`에는
      // 교체할 의존성을 지정하고 `useValue`에는 스텁을 정의합니다
      providers: [{provide: TaxCalculator, useValue: taxCalculatorStub}],
    });
    service = TestBed.inject(OrderTotal);
  });

  it('adds tax to the subtotal', () => {
    expect(service.total(100)).toBe(105);
  });
});
```

이렇게 설정하면 `OrderTotal`이 `TaxCalculator`를 요청할 때마다 `TestBed`는 `taxCalculatorStub`을 대신 사용합니다.
스텁은 항상 5를 반환하므로, `TaxCalculator`의 세율이 바뀌더라도 `OrderTotal`이 소계에 세금을 올바르게 더하는지 확인할 수 있습니다.

<!--
### Verifying interactions with spies
-->

<a id="verifying-interactions-with-spies"></a>

### 스파이로 상호작용 검증하기

<!--
A stub controls what a dependency returns, but sometimes you also need to verify that a service called its dependency with the correct arguments. This can be accomplished with spies, which track how a function is called. With Vitest, this functionality is built into `vi.fn()` and lets you assert on interactions between services.

```ts { header: 'order-total.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it, vi, type Mocked} from 'vitest';
import {OrderTotal} from './order-total';
import {TaxCalculator} from './tax-calculator';

const taxCalculatorStub: Mocked<TaxCalculator> = {
  calculate: vi.fn(),
};

describe('OrderTotal', () => {
  let service: OrderTotal;

  beforeEach(() => {
    taxCalculatorStub.calculate.mockReturnValue(5);

    TestBed.configureTestingModule({
      providers: [{provide: TaxCalculator, useValue: taxCalculatorStub}],
    });
    service = TestBed.inject(OrderTotal);
  });

  afterEach(() => {
    taxCalculatorStub.calculate.mockClear();
  });

  it('adds tax to the subtotal', () => {
    expect(service.total(100)).toBe(105);
  });

  // Verify the interaction with a spy
  it('calls the tax calculator', () => {
    service.total(100);
    expect(taxCalculatorStub.calculate).toHaveBeenCalledExactlyOnceWith(100);
  });
});
```

The new test verifies that `OrderTotal` called `TaxCalculator.calculate` when computing the total. This is useful when verifying that the interaction between services happened correctly.
-->

스텁으로 의존성의 반환값을 제어할 수 있지만, 서비스가 의존성을 올바른 인자로 호출했는지도 확인해야 할 수 있습니다.
이때 함수의 호출 방식을 추적하는 스파이(spy)를 사용합니다.
Vitest에서는 `vi.fn()`이 이 기능을 제공하므로 서비스 사이의 상호작용을 검증할 수 있습니다.

```ts { header: 'order-total.spec.ts' }
import {TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it, vi, type Mocked} from 'vitest';
import {OrderTotal} from './order-total';
import {TaxCalculator} from './tax-calculator';

const taxCalculatorStub: Mocked<TaxCalculator> = {
  calculate: vi.fn(),
};

describe('OrderTotal', () => {
  let service: OrderTotal;

  beforeEach(() => {
    taxCalculatorStub.calculate.mockReturnValue(5);

    TestBed.configureTestingModule({
      providers: [{provide: TaxCalculator, useValue: taxCalculatorStub}],
    });
    service = TestBed.inject(OrderTotal);
  });

  afterEach(() => {
    taxCalculatorStub.calculate.mockClear();
  });

  it('adds tax to the subtotal', () => {
    expect(service.total(100)).toBe(105);
  });

  // 스파이로 상호작용을 검증합니다
  it('calls the tax calculator', () => {
    service.total(100);
    expect(taxCalculatorStub.calculate).toHaveBeenCalledExactlyOnceWith(100);
  });
});
```

새 테스트는 `OrderTotal`이 합계를 계산할 때 `TaxCalculator.calculate`를 호출했는지 확인합니다.
서비스가 서로 올바르게 상호작용했는지 검증할 때 유용합니다.

<!--
## Testing HTTP services
-->

<a id="testing-http-services"></a>

## HTTP 서비스 테스트하기

<!--
Many services use Angular's `HttpClient` to fetch data from a server. Angular provides dedicated testing utilities for `HttpClient` that let you control HTTP responses without making real network requests.

For details on testing services that use `HttpClient`, see the [HTTP testing guide](guide/http/testing).
-->

많은 서비스가 Angular `HttpClient`로 서버에서 데이터를 가져옵니다.
Angular는 실제 네트워크 요청을 보내지 않고도 HTTP 응답을 제어할 수 있는 `HttpClient` 전용 테스트 유틸리티를 제공합니다.

`HttpClient`를 사용하는 서비스의 테스트 방법은 [HTTP 테스트](guide/http/testing) 문서를 참고하세요.
