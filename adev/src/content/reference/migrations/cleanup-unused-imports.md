<!--
# Clean up unused imports
-->

<a id="clean-up-unused-imports"></a>

# 사용하지 않는 임포트 정리하기

<!--
As of version 19, Angular reports when a component's `imports` array contains symbols that aren't used in its template.
-->

Angular는 버전 19부터 컴포넌트의 `imports` 배열에 템플릿에서 사용하지 않는 심벌이 있으면 알려줍니다.

<!--
Running this schematic will clean up all unused imports within the project.
-->

이 스키매틱을 실행하면 프로젝트에서 사용하지 않는 임포트를 모두 정리합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:cleanup-unused-imports
```

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```angular-ts
import {Component} from '@angular/core';
import {UnusedDirective} from './unused';

@Component({
  template: 'Hello',
  imports: [UnusedDirective],
})
export class MyComp {}
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```angular-ts
import {Component} from '@angular/core';

@Component({
  template: 'Hello',
  imports: [],
})
export class MyComp {}
```
