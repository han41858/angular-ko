<!--
# Migration to the `inject` function
-->

<a id="migration-to-the-inject-function"></a>

# `inject` 함수로 마이그레이션하기

<!--
Angular's [`inject`](/api/core/inject) function offers more accurate types and better compatibility with standard decorators, compared to constructor-based injection.
-->

Angular의 [`inject`](/api/core/inject) 함수는 생성자 기반 주입보다 더 정확한 타입과 표준 데코레이터와의 더 나은 호환성을 제공합니다.

<!--
This schematic converts constructor-based injection in your classes to use the [`inject`](/api/core/inject) function instead.
-->

이 스키매틱은 클래스의 생성자 기반 주입을 [`inject`](/api/core/inject) 함수를 사용하도록 변환합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:inject
```

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```typescript
import {Component, Inject, Optional} from '@angular/core';
import {MyService} from './service';
import {DI_TOKEN} from './token';

@Component({template: ''})
export class MyComp {
  constructor(
    private service: MyService,
    @Inject(DI_TOKEN) @Optional() readonly token: string,
  ) {}
}
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```typescript
import {Component, inject} from '@angular/core';
import {MyService} from './service';
import {DI_TOKEN} from './token';

@Component({template: ''})
export class MyComp {
  private service = inject(MyService);
  readonly token = inject(DI_TOKEN, {optional: true});
}
```

<!--
## Migration options
-->

<a id="migration-options"></a>

## 마이그레이션 옵션

<!--
The migration includes several options to customize its output.
-->

이 마이그레이션은 결과를 조정할 수 있는 여러 옵션을 제공합니다.

<!--
### `path`
-->

<a id="path"></a>

### `path` 옵션

<!--
Determines which sub-path in your project should be migrated. Pass in `.` or leave it blank to
migrate the entire directory.
-->

프로젝트에서 마이그레이션할 하위 경로를 지정합니다. 디렉터리 전체를 마이그레이션하려면 `.`을 전달하거나 비워 두세요.

<!--
### `migrateAbstractClasses`
-->

<a id="migrateabstractclasses"></a>

### `migrateAbstractClasses` 옵션

<!--
Angular doesn't validate that parameters of abstract classes are injectable. This means that the
migration can't reliably migrate them to [`inject`](/api/core/inject) without risking breakages which is why they're
disabled by default. Enable this option if you want abstract classes to be migrated, but note
that you may have to **fix some breakages manually**.
-->

Angular는 추상 클래스의 매개변수를 주입할 수 있는지 검증하지 않습니다. 따라서 마이그레이션이 오류 발생 위험 없이 추상 클래스를 [`inject`](/api/core/inject)로 안정적으로 변환할 수 없으므로 기본적으로 비활성화되어 있습니다. 추상 클래스도 마이그레이션하려면 이 옵션을 활성화하세요. 다만 **일부 오류는 직접 수정해야 할 수 있습니다**.

<!--
### `backwardsCompatibleConstructors`
-->

<a id="backwardscompatibleconstructors"></a>

### `backwardsCompatibleConstructors` 옵션

<!--
By default the migration tries to clean up the code as much as it can, which includes deleting
parameters from the constructor, or even the entire constructor if it doesn't include any code.
In some cases this can lead to compilation errors when classes with Angular decorators inherit from
other classes with Angular decorators. If you enable this option, the migration will generate an
additional constructor signature to keep it backwards compatible, at the expense of more code.
-->

기본적으로 마이그레이션은 생성자의 매개변수를 삭제하거나 코드가 없는 생성자 자체를 삭제하는 등 코드를 최대한 정리합니다.
경우에 따라 Angular 데코레이터가 있는 클래스가 다른 Angular 데코레이터가 있는 클래스를 상속하면 컴파일 오류가 발생할 수 있습니다. 이 옵션을 활성화하면 코드가 늘어나는 대신 추가 생성자 시그니처를 생성하여 하위 호환성을 유지합니다.

<!--
#### Before
-->

<a id="backwards-compatible-constructors-before"></a>

#### 이전 {#ko-backwards-compatible-constructors-before}

```typescript
import {Component} from '@angular/core';
import {MyService} from './service';

@Component({template: ''})
export class MyComp {
  constructor(private service: MyService) {}
}
```

<!--
#### After
-->

<a id="backwards-compatible-constructors-after"></a>

#### 이후 {#ko-backwards-compatible-constructors-after}

```typescript
import {Component, inject} from '@angular/core';
import {MyService} from './service';

@Component({template: ''})
export class MyComp {
  private service = inject(MyService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
}
```

<!--
### `nonNullableOptional`
-->

<a id="nonnullableoptional"></a>

### `nonNullableOptional` 옵션

<!--
If injection fails for a parameter with the `@Optional` decorator, Angular returns `null` which
means that the real type of any `@Optional` parameter will be `| null`. However, because decorators
cannot influence their types, there is a lot of existing code whose type is incorrect. The type is
fixed in `inject()` which can cause new compilation errors to show up. If you enable this option,
the migration will produce a non-null assertion after the `inject()` call to match the old type,
at the expense of potentially hiding type errors.
-->

`@Optional` 데코레이터가 있는 매개변수의 주입에 실패하면 Angular는 `null`을 반환합니다. 따라서 `@Optional` 매개변수의 실제 타입에는 `| null`이 포함됩니다. 하지만 데코레이터는 타입에 영향을 줄 수 없으므로 기존 코드에는 잘못된 타입이 많이 있습니다. `inject()`는 이 타입을 바로잡으므로 새로운 컴파일 오류가 발생할 수 있습니다. 이 옵션을 활성화하면 마이그레이션이 `inject()` 호출 뒤에 null 아님 단언을 추가하여 이전 타입과 일치시킵니다. 다만 이로 인해 타입 오류가 가려질 수 있습니다.

<!--
NOTE: non-null assertions won't be added to parameters that are already typed to be nullable,
because the code that depends on them likely already accounts for their nullability.
-->

NOTE: 이미 null을 허용하는 타입의 매개변수에는 null 아님 단언을 추가하지 않습니다. 해당 매개변수를 사용하는 코드에서 이미 null 가능성을 고려했을 가능성이 높기 때문입니다.

<!--
#### Before
-->

<a id="non-nullable-optional-before"></a>

#### 이전 {#ko-non-nullable-optional-before}

```typescript
import {Component, Inject, Optional} from '@angular/core';
import {TOKEN_ONE, TOKEN_TWO} from './token';

@Component({template: ''})
export class MyComp {
  constructor(
    @Inject(TOKEN_ONE) @Optional() private tokenOne: number,
    @Inject(TOKEN_TWO) @Optional() private tokenTwo: string | null,
  ) {}
}
```

<!--
#### After
-->

<a id="non-nullable-optional-after"></a>

#### 이후 {#ko-non-nullable-optional-after}

```typescript
import {Component, inject} from '@angular/core';
import {TOKEN_ONE, TOKEN_TWO} from './token';

@Component({template: ''})
export class MyComp {
  // Note the `!` at the end.
  private tokenOne = inject(TOKEN_ONE, {optional: true})!;

  // Does not have `!` at the end, because the type was already nullable.
  private tokenTwo = inject(TOKEN_TWO, {optional: true});
}
```
