<!--
# Migration from `@Injectable` to `@Service`
-->

<a id="migration-from-injectable-to-service"></a>

# `@Injectable`에서 `@Service`로 마이그레이션

<!--
This schematic converts eligible `@Injectable` classes to the [`@Service`](/api/core/Service) decorator, an ergonomic shorthand for `@Injectable({providedIn: 'root'})`.
It is available as of v22.1, and only migrates classes that are considered safe to migrate.
-->

이 스키매틱은 변환 가능한 `@Injectable` 클래스를 `@Injectable({providedIn: 'root'})`의 편리한 축약형인 [`@Service`](/api/core/Service) 데코레이터로 변환합니다. v22.1부터 사용할 수 있으며 안전하게 마이그레이션할 수 있다고 판단한 클래스만 변환합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```bash
ng generate @angular/core:service
```

<!--
A class declared with `providedIn: 'root'` becomes a `@Service` with no options.
-->

`providedIn: 'root'`로 선언한 클래스는 옵션 없는 `@Service`로 변환됩니다.

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```ts
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MyService {}
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```ts
import {Service} from '@angular/core';

@Service()
export class MyService {}
```

<!--
A class declared without options is not provided automatically, so the migration keeps that behavior with `autoProvided: false`.
You remain responsible for adding it to a `providers` array, as before.
-->

옵션 없이 선언한 클래스는 자동으로 제공되지 않으므로 마이그레이션은 `autoProvided: false`로 기존 동작을 유지합니다. 이전과 마찬가지로 직접 `providers` 배열에 추가해야 합니다.

<!--
#### Before {#no-options-before}
-->

#### 이전 {#no-options-before}

```ts
import {Injectable} from '@angular/core';

@Injectable()
export class MyService {}
```

<!--
#### After {#no-options-after}
-->

#### 이후 {#no-options-after}

```ts
import {Service} from '@angular/core';

@Service({autoProvided: false})
export class MyService {}
```

<!--
For more details, see [Opting out of automatic provisioning](guide/di/creating-and-using-services#opting-out-of-automatic-provisioning).
-->

자세한 내용은 [자동 제공 비활성화하기](guide/di/creating-and-using-services#opting-out-of-automatic-provisioning)를 참고하세요.

<!--
## Configuration options
-->

<a id="configuration-options"></a>

## 설정 옵션

<!--
### `--path`
-->

<a id="-path"></a>

### `--path`

<!--
By default, the migration updates your whole Angular CLI workspace, including test files.
You can limit the migration to a specific sub-directory using this option.
-->

기본적으로 마이그레이션은 테스트 파일을 포함한 Angular CLI 워크스페이스 전체를 갱신합니다. 이 옵션으로 특정 하위 디렉터리만 마이그레이션할 수 있습니다.

```bash
ng generate @angular/core:service --path src/app/sub-component
```

<!--
## Limitations
-->

<a id="limitations"></a>

## 제한 사항

<!--
To avoid introducing breakages into your app, the schematic skips a class when:
-->

애플리케이션의 동작을 깨뜨리지 않도록 다음에 해당하는 클래스는 건너뜁니다.

<!--
- The class, or the closest ancestor in your own source that defines a constructor, injects dependencies through its constructor.
- The `@Injectable` decorator receives any option other than `providedIn`.
- The `providedIn` option is set to anything other than `'root'`.
-->

- 클래스 또는 생성자를 정의한 사용자 소스의 가장 가까운 상위 클래스가 생성자로 의존성을 주입하는 경우.
- `@Injectable` 데코레이터에 `providedIn` 이외의 옵션이 있는 경우.
- `providedIn` 옵션이 `'root'` 이외의 값인 경우.

<!--
When every `@Injectable` in a file migrates, the migration removes the `Injectable` import.
A file with both migrated and skipped classes keeps both imports.
-->

파일의 모든 `@Injectable`이 마이그레이션되면 `Injectable` 임포트를 제거합니다. 마이그레이션한 클래스와 건너뛴 클래스가 함께 있는 파일에서는 두 임포트를 모두 유지합니다.

<!--
If the migration reports that it did not find any files to migrate, it did not change any file.
Either it found no `@Injectable` class it could convert, or the code is already migrated.
Constructor injection is the most common reason for a skip, and you can run the [migration to the `inject` function](reference/migrations/inject-function) first, then run this one again.
-->

마이그레이션할 파일을 찾지 못했다고 보고하면 어떤 파일도 변경하지 않은 것입니다. 변환할 수 있는 `@Injectable` 클래스가 없거나 이미 마이그레이션된 코드입니다. 가장 흔한 제외 원인은 생성자 주입입니다. 먼저 [`inject` 함수로 마이그레이션](reference/migrations/inject-function)한 뒤 이 마이그레이션을 다시 실행할 수 있습니다.
