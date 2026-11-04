<!--
# Convert CommonModule usage to standalone imports
-->

<a id="convert-commonmodule-usage-to-standalone-imports"></a>

# CommonModule 사용을 독립형 임포트로 변환하기

<!--
This migration helps projects remove imports of the `CommonModule` inside components by adding the minimal set of directive and pipe imports each template requires (for example, `NgIf`, `NgFor`, `AsyncPipe`, etc.).
-->

이 마이그레이션은 각 템플릿에 필요한 최소한의 디렉티브와 파이프(예: `NgIf`, `NgFor`, `AsyncPipe` 등)를 임포트하여 컴포넌트의 `CommonModule` 임포트를 제거하도록 돕습니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:common-to-standalone
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
## Example
-->

<a id="example"></a>

## 예제

<!--
Before:
-->

이전:

```angular-ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-example',
  imports: [CommonModule],
  template: `
    <div *ngIf="show">
      {{ data | async | json }}
    </div>
  `,
})
export class Example {
  show = true;
  data = Promise.resolve({message: 'Hello'});
}
```

<!--
After running the migration (component imports added, CommonModule removed):
-->

마이그레이션 실행 이후(컴포넌트에 필요한 임포트를 추가하고 CommonModule을 제거함):

```angular-ts
import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-example',
  imports: [AsyncPipe, JsonPipe, NgIf],
  template: `
    <div *ngIf="show">
      {{ data | async | json }}
    </div>
  `,
})
export class Example {
  show = true;
  data = Promise.resolve({message: 'Hello'});
}
```
