<!--
# RouterTestingModule migration
-->

<a id="routertestingmodule-migration"></a>

# RouterTestingModule 마이그레이션

<!--
This schematic migrates usages of `RouterTestingModule` inside tests to `RouterModule`.
-->

이 스키매틱은 테스트에서 사용하는 `RouterTestingModule`을 `RouterModule`로 마이그레이션합니다.

<!--
When a test imports `SpyLocation` from `@angular/common/testing` and uses the `urlChanges` property, the schematic will also add `provideLocationMocks()` to preserve the original behavior.
-->

테스트에서 `@angular/common/testing`의 `SpyLocation`을 임포트하고 `urlChanges` 프로퍼티를 사용하면, 스키매틱은 기존 동작을 유지하기 위해 `provideLocationMocks()`도 추가합니다.

<!--
Run the schematic with:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:router-testing-module-migration
```

<!--
## Options
-->

<a id="options"></a>

## 옵션

<!--
| Option | Details                                                                                                                       |
| :----- | :---------------------------------------------------------------------------------------------------------------------------- |
| `path` | The path (relative to project root) to migrate. Defaults to `./`. Use this to incrementally migrate a subset of your project. |
-->

| 옵션   | 설명                                                                                                                                     |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `path` | 마이그레이션할 경로입니다(프로젝트 루트 기준 상대 경로). 기본값은 `./`입니다. 프로젝트의 일부를 점진적으로 마이그레이션할 때 사용하세요. |

<!--
## Examples
-->

<a id="examples"></a>

## 예제

<!--
### Preserve router options
-->

<a id="preserve-router-options"></a>

### 라우터 옵션 유지하기

<!--
Before:
-->

이전:

```ts
import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';

describe('test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes, {initialNavigation: 'enabledBlocking'})],
    });
  });
});
```

<!--
After:
-->

이후:

```ts
import {RouterModule} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';

describe('test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'})],
    });
  });
});
```

<!--
### Add provideLocationMocks when `SpyLocation` is imported and `urlChanges` is used
-->

<a id="add-providelocationmocks-when-spylocation-is-imported-and-urlchanges-is-used"></a>

### `SpyLocation`을 임포트하고 `urlChanges`를 사용할 때 provideLocationMocks 추가하기

<!--
Before:
-->

이전:

```ts
import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';

describe('test', () => {
  let spy: SpyLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    spy = TestBed.inject(SpyLocation);
  });

  it('Awesome test', () => {
    expect(spy.urlChanges).toBeDefined();
  });
});
```

<!--
After:
-->

이후:

```ts
import {RouterModule} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {SpyLocation, provideLocationMocks} from '@angular/common/testing';

describe('test', () => {
  let spy: SpyLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [provideLocationMocks()],
    });
    spy = TestBed.inject(SpyLocation);
  });

  it('Awesome test', () => {
    expect(spy.urlChanges).toBeDefined();
  });
});
```
