<!--
# Migration to Control Flow syntax
-->

<a id="migration-to-control-flow-syntax"></a>

# 흐름 제어 문법으로 마이그레이션하기

<!--
[Control flow syntax](guide/templates/control-flow) is available from Angular v17. The new syntax is baked into the template, so you don't need to import `CommonModule` anymore.
-->

[흐름 제어 문법](guide/templates/control-flow)은 Angular v17부터 사용할 수 있습니다. 새 문법은 템플릿에 내장되어 있으므로 더 이상 `CommonModule`을 임포트할 필요가 없습니다.

<!--
This schematic migrates all existing code in your application to use new Control Flow Syntax.
-->

이 스키매틱은 애플리케이션의 기존 코드를 모두 새로운 흐름 제어 문법을 사용하도록 마이그레이션합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:control-flow
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
### `--path`
-->

<a id="--path"></a>

### `--path` 옵션

<!--
By default, the migration will update your whole Angular CLI workspace.
You can limit the migration to a specific sub-directory using this option.
-->

기본적으로 마이그레이션은 Angular CLI 워크스페이스 전체를 업데이트합니다.
이 옵션으로 마이그레이션 범위를 특정 하위 디렉터리로 제한할 수 있습니다.

<!--
### `--format`
-->

<a id="--format"></a>

### `--format` 옵션

<!--
By default, the migration reformats the templates it touches.
Disable this option to keep your existing template formatting.
-->

기본적으로 마이그레이션은 수정한 템플릿의 서식을 다시 지정합니다.
기존 템플릿 서식을 유지하려면 이 옵션을 비활성화하세요.

<!--
## Breaking changes
-->

<a id="breaking-changes"></a>

## 호환성이 깨지는 변경 사항

<!--
### `@for` view reuse
-->

<a id="for-view-reuse"></a>

### `@for` 뷰 재사용

<!--
If a property used in the `track` expression of a `@for` block changes but the object reference remains the same (in-place modification), Angular updates the view's bindings (including component inputs) instead of destroying and recreating the element.
-->

`@for` 블록의 `track` 표현식에서 사용하는 프로퍼티가 바뀌어도 객체 참조가 그대로라면(객체를 직접 수정한 경우), Angular는 엘리먼트를 제거하고 다시 생성하는 대신 컴포넌트 입력을 포함한 뷰의 바인딩을 업데이트합니다.

<!--
This differs from `*ngFor`, which would execute a remount (destroy and recreate) of the element in a similar scenario if the `trackBy` function returned a different value.
-->

이는 같은 상황에서 `trackBy` 함수가 다른 값을 반환하면 엘리먼트를 제거하고 다시 생성하는 `*ngFor`의 동작과 다릅니다.
