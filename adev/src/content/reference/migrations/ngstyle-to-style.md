<!--
# Migration from NgStyle to style bindings
-->

<a id="migration-from-ngstyle-to-style-bindings"></a>

# NgStyle에서 스타일 바인딩으로 마이그레이션하기

<!--
This schematic migrates NgStyle directive usages to style bindings in your application.
It will only migrate usages that are considered safe to migrate.
-->

이 스키매틱은 애플리케이션의 NgStyle 디렉티브 사용을 스타일 바인딩으로 마이그레이션합니다.
안전하게 마이그레이션할 수 있다고 판단되는 경우만 변환합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```bash
ng generate @angular/core:ngstyle-to-style
```

<!--
An object with a single key becomes a binding to that one style property.
-->

키가 하나인 객체는 해당 스타일 프로퍼티에 대한 바인딩으로 변환됩니다.

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```html
<div [ngStyle]="{'background-color': 'red'}"></div>
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```html
<div [style.background-color]="'red'"></div>
```

<!--
An object with more than one key becomes a single `[style]` binding.
-->

키가 여러 개인 객체는 하나의 `[style]` 바인딩으로 변환됩니다.

<!--
#### Before
-->

<a id="multiple-keys-before"></a>

#### 이전 {#ko-multiple-keys-before}

```html
<div [ngStyle]="{'color': 'blue', 'font-weight': 'bold'}"></div>
```

<!--
#### After
-->

<a id="multiple-keys-after"></a>

#### 이후 {#ko-multiple-keys-after}

```html
<div [style]="{'color': 'blue', 'font-weight': 'bold'}"></div>
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
### `--best-effort-mode`
-->

<a id="--best-effort-mode"></a>

### `--best-effort-mode` 옵션

<!--
By default, the migration avoids migrating object references usages of `NgStyle`
When the `--best-effort-mode` flag is enabled, `ngStyle` instances binded to object references are also migrated.
This can be unsafe to migrate, for example if the binded object is mutated.
-->

기본적으로 마이그레이션은 객체 참조를 사용하는 `NgStyle`을 변환하지 않습니다.
`--best-effort-mode` 플래그를 활성화하면 객체 참조에 바인딩된 `ngStyle`도 마이그레이션합니다.
하지만 바인딩된 객체를 직접 변경하는 경우처럼 안전하지 않은 변환이 될 수도 있습니다.

```html
<div [ngStyle]="styleObject"></div>
```

<!--
to
-->

다음과 같이 변환됩니다.

```html
<div [style]="styleObject"></div>
```
