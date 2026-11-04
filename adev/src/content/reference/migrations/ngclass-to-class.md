<!--
# Migration from NgClass to class bindings
-->

<a id="migration-from-ngclass-to-class-bindings"></a>

# NgClass에서 클래스 바인딩으로 마이그레이션하기

<!--
This schematic migrates NgClass directive usages to class bindings in your application.
It will only migrate usages that are considered safe to migrate.
-->

이 스키매틱은 애플리케이션의 NgClass 디렉티브 사용을 클래스 바인딩으로 마이그레이션합니다.
안전하게 마이그레이션할 수 있다고 판단되는 경우만 변환합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```bash
ng generate @angular/core:ngclass-to-class
```

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```html
<div [ngClass]="{admin: isAdmin, dense: density === 'high'}"></div>
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```html
<div [class]="{admin: isAdmin, dense: density === 'high'}"></div>
```

<!--
## Configuration options
-->

<a id="configuration-options"></a>

## 설정 옵션

<!--
The migration supports a few options for fine tuning the migration to your specific needs.
-->

이 마이그레이션은 요구 사항에 맞게 동작을 조정할 수 있는 몇 가지 옵션을 지원합니다.

<!--
### `--migrate-space-separated-key`
-->

<a id="--migrate-space-separated-key"></a>

### `--migrate-space-separated-key` 옵션

<!--
By default, the migration avoids migrating usages of `NgClass` in which object literal keys contain space-separated class names.
When the --migrate-space-separated-key flag is enabled, a binding is created for each individual key.
-->

기본적으로 마이그레이션은 객체 리터럴의 키에 공백으로 구분한 클래스 이름이 포함된 `NgClass` 사용을 변환하지 않습니다.
`--migrate-space-separated-key` 플래그를 활성화하면 각 클래스에 대한 개별 바인딩을 생성합니다.

```html
<div [ngClass]="{'class1 class2': condition}"></div>
```

<!--
to
-->

다음과 같이 변환됩니다.

```html
<div [class.class1]="condition" [class.class2]="condition"></div>
```
