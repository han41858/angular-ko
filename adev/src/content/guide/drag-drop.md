<!--
# Drag and drop
-->

<a id="drag-and-drop"></a>

# 드래그 앤 드롭

<!--
## Overview
-->

<a id="overview"></a>

## 개요

<!--
This page describes the drag and drop directives which lets you quickly create drag and drop interfaces with the following:

- Free dragging
- Create a list of reorderable draggable elements
- Transfer draggable elements between lists
- Dragging animations
- Lock draggable elements along an axis or element
- Add custom drag handles
- Add previews on drag
- Add custom drag placeholder

For the full API reference, please see the [Angular CDK's drag and drop API reference page](api#angular_cdk_drag-drop).
-->

이 페이지에서는 다음 기능을 갖춘 드래그 앤 드롭 인터페이스를 빠르게 만들 수 있는 드래그 앤 드롭 디렉티브를 설명합니다.

- 자유로운 드래그
- 순서를 바꿀 수 있는 드래그 가능한 엘리먼트 목록 생성
- 목록 간 드래그 가능한 엘리먼트 이동
- 드래그 애니메이션
- 드래그 가능한 엘리먼트의 이동을 특정 축이나 엘리먼트 안으로 제한
- 커스텀 드래그 핸들 추가
- 드래그 미리보기 추가
- 커스텀 드래그 플레이스홀더 추가

전체 API 참조는 [Angular CDK의 드래그 앤 드롭 API 참조 페이지](api#angular_cdk_drag-drop)를 참고하세요.

<!--
## Before you start
-->

<a id="before-you-start"></a>

## 시작하기 전에

<!--
### CDK Installation
-->

<a id="cdk-installation"></a>

### CDK 설치하기

<!--
The [Component Dev Kit (CDK)](https://material.angular.dev/cdk/categories) is a set of behavior primitives for building components. To use the drag and drop directives, first install `@angular/cdk` from npm. You can do this from your terminal using Angular CLI:

```shell
ng add @angular/cdk
```
-->

[컴포넌트 개발 도구 모음(Component Dev Kit, CDK)](https://material.angular.dev/cdk/categories)은 컴포넌트를 만들기 위한 기본 동작들의 집합입니다.
드래그 앤 드롭 디렉티브를 사용하려면 먼저 npm에서 `@angular/cdk`를 설치하세요.
터미널에서 Angular CLI로 설치할 수 있습니다.

```shell
ng add @angular/cdk
```

<!--
### Importing drag and drop
-->

<a id="importing-drag-and-drop"></a>

### 드래그 앤 드롭 불러오기

<!--
To use drag and drop, import what you need from the directives in your component.

```ts
import {Component} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-drop-example',
  templateUrl: 'drag-drop-example.html',
  imports: [CdkDrag],
})
export class DragDropExample {}
```
-->

드래그 앤 드롭을 사용하려면 컴포넌트에서 필요한 디렉티브를 불러오세요.

```ts
import {Component} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-drop-example',
  templateUrl: 'drag-drop-example.html',
  imports: [CdkDrag],
})
export class DragDropExample {}
```

<!--
## Create draggable elements
-->

<a id="create-draggable-elements"></a>

## 드래그 가능한 엘리먼트 만들기

<!--
You can make any element draggable by adding the `cdkDrag` directive. By default, all draggable elements support free dragging.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/overview/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/overview/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/overview/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/overview/app/app.css"/>
</docs-code-multifile>
-->

엘리먼트에 `cdkDrag` 디렉티브를 추가하면 어떤 엘리먼트든 드래그할 수 있습니다.
기본적으로 모든 드래그 가능한 엘리먼트는 자유로운 드래그를 지원합니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/overview/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/overview/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/overview/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/overview/app/app.css"/>
</docs-code-multifile>

<!--
## Create a list of reorderable draggable elements
-->

<a id="create-a-list-of-reorderable-draggable-elements"></a>

## 순서를 바꿀 수 있는 드래그 가능한 엘리먼트 목록 만들기

<!--
Add the `cdkDropList` directive to a parent element to group draggable elements into a reorderable collection. This defines where draggable elements can be dropped. The draggable elements in the drop list group rearrange automatically as an element moves.

The drag and drop directives don't update your data model. To update the data model, listen to the `cdkDropListDropped` event (once the user finishes dragging) and update the data model manually.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/sorting/app/app.css"/>
</docs-code-multifile>

You can use the `CDK_DROP_LIST` injection token that can be used to reference instances of `cdkDropList`. For more information see the [dependency injection guide](/guide/di) and the [drop list injection token API](api/cdk/drag-drop/CDK_DROP_LIST).
-->

부모 엘리먼트에 `cdkDropList` 디렉티브를 추가하면 드래그 가능한 엘리먼트를 순서를 바꿀 수 있는 모음으로 묶을 수 있습니다.
이 디렉티브는 드래그한 엘리먼트를 놓을 수 있는 영역을 정의합니다.
드롭 목록으로 묶인 드래그 가능한 엘리먼트는 엘리먼트가 이동할 때 자동으로 재배치됩니다.

드래그 앤 드롭 디렉티브는 데이터 모델을 갱신하지 않습니다.
데이터 모델을 갱신하려면 사용자가 드래그를 마쳤을 때 발생하는 `cdkDropListDropped` 이벤트를 수신하고 데이터 모델을 직접 갱신하세요.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/sorting/app/app.css"/>
</docs-code-multifile>

`cdkDropList` 인스턴스를 참조하려면 `CDK_DROP_LIST` 주입 토큰을 사용할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di)와 [드롭 목록 주입 토큰 API](api/cdk/drag-drop/CDK_DROP_LIST)를 참고하세요.

<!--
## Transfer draggable elements between lists
-->

<a id="transfer-draggable-elements-between-lists"></a>

## 목록 간 드래그 가능한 엘리먼트 이동하기

<!--
The `cdkDropList` directive supports transferring draggable elements between connected drop lists. There are two ways to connect one or more `cdkDropList` instances together:

- Set the `cdkDropListConnectedTo` property to another drop list.
- Wrap the elements in an element with the `cdkDropListGroup` attribute.

The `cdkDropListConnectedTo` directive works both with a direct reference to another `cdkDropList` or by referencing the id of another drop container.

```html
<!- This is valid ->
<div cdkDropList #listOne="cdkDropList" [cdkDropListConnectedTo]="[listTwo]"></div>
<div cdkDropList #listTwo="cdkDropList" [cdkDropListConnectedTo]="[listOne]"></div>

<!- This is valid as well ->
<div cdkDropList id="list-one" [cdkDropListConnectedTo]="['list-two']"></div>
<div cdkDropList id="list-two" [cdkDropListConnectedTo]="['list-one']"></div>
```

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.css"/>
</docs-code-multifile>

Use the `cdkDropListGroup` directive if you have an unknown number of connected drop lists to set up the connection automatically. Any new `cdkDropList` that is added under a group automatically connects to all other lists.

```angular-html
<div cdkDropListGroup>
  <!- All lists in here will be connected. ->
  @for (list of lists; track list) {
    <div cdkDropList></div>
  }
</div>
```

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.css"/>
</docs-code-multifile>

You can use the `CDK_DROP_LIST_GROUP` injection token that can be used to reference instances of `cdkDropListGroup`. For more information see the [dependency injection guide](/guide/di) and the [drop list group injection token API](api/cdk/drag-drop/CDK_DROP_LIST_GROUP).
-->

`cdkDropList` 디렉티브는 연결된 드롭 목록 사이에서 드래그 가능한 엘리먼트를 이동하는 기능을 지원합니다.
`cdkDropList` 인스턴스를 서로 연결하는 방법은 두 가지입니다.

- `cdkDropListConnectedTo` 프로퍼티에 다른 드롭 목록을 지정합니다.
- `cdkDropListGroup` 어트리뷰트가 있는 엘리먼트로 해당 엘리먼트들을 감쌉니다.

`cdkDropListConnectedTo` 디렉티브는 다른 `cdkDropList`를 직접 참조하거나 다른 드롭 컨테이너의 id를 참조하는 방식 모두 지원합니다.

```html
<!-- 올바른 사용법입니다. -->
<div cdkDropList #listOne="cdkDropList" [cdkDropListConnectedTo]="[listTwo]"></div>
<div cdkDropList #listTwo="cdkDropList" [cdkDropListConnectedTo]="[listOne]"></div>

<!-- 이 방법도 올바른 사용법입니다. -->
<div cdkDropList id="list-one" [cdkDropListConnectedTo]="['list-two']"></div>
<div cdkDropList id="list-two" [cdkDropListConnectedTo]="['list-one']"></div>
```

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/connected-sorting/app/app.css"/>
</docs-code-multifile>

연결할 드롭 목록의 개수를 미리 알 수 없다면 `cdkDropListGroup` 디렉티브로 연결을 자동 설정하세요.
그룹 아래에 새로 추가되는 모든 `cdkDropList`는 다른 모든 목록과 자동으로 연결됩니다.

```angular-html
<div cdkDropListGroup>
  <!-- 이 안의 모든 목록이 서로 연결됩니다. -->
  @for (list of lists; track list) {
    <div cdkDropList></div>
  }
</div>
```

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/connected-sorting-group/app/app.css"/>
</docs-code-multifile>

`cdkDropListGroup` 인스턴스를 참조하려면 `CDK_DROP_LIST_GROUP` 주입 토큰을 사용할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di)와 [드롭 목록 그룹 주입 토큰 API](api/cdk/drag-drop/CDK_DROP_LIST_GROUP)를 참고하세요.

<!--
### Selective dragging
-->

<a id="selective-dragging"></a>

### 선택적으로 드래그 허용하기

<!--
By default, a user can move `cdkDrag` elements from one container into another connected container. For more fine-grained control over which elements can be dropped into a container, use `cdkDropListEnterPredicate`. Angular calls the predicate whenever a draggable element enters a new container. Depending on whether the predicate returns true or false, the item may or may not be allowed into the new container.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.css"/>
</docs-code-multifile>
-->

기본적으로 사용자는 `cdkDrag` 엘리먼트를 한 컨테이너에서 연결된 다른 컨테이너로 옮길 수 있습니다.
어떤 엘리먼트를 컨테이너에 놓을 수 있는지 더 세밀하게 제어하려면 `cdkDropListEnterPredicate`를 사용하세요.
드래그 가능한 엘리먼트가 새 컨테이너에 들어올 때마다 Angular가 조건 함수를 호출합니다.
이 함수가 true 또는 false 중 무엇을 반환하는지에 따라 항목을 새 컨테이너에 넣을 수 있는지가 결정됩니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/enter-predicate/app/app.css"/>
</docs-code-multifile>

<!--
## Attach data
-->

<a id="attach-data"></a>

## 데이터 연결하기

<!--
You can associate some arbitrary data with both `cdkDrag` and `cdkDropList` by setting `cdkDragData` or `cdkDropListData`, respectively. You can bind to the events fired from both directives that will include this data, allowing you to easily identify the origin of the drag or drop interaction.

```angular-html
@for (list of lists; track list) {
  <div cdkDropList [cdkDropListData]="list" (cdkDropListDropped)="drop($event)">
    @for (item of list; track item) {
      <div cdkDrag [cdkDragData]="item"></div>
    }
  </div>
}
```
-->

`cdkDragData`와 `cdkDropListData`를 각각 설정하면 `cdkDrag`와 `cdkDropList`에 임의의 데이터를 연결할 수 있습니다.
두 디렉티브에서 발생하는 이벤트에는 이 데이터가 포함되므로, 이벤트에 바인딩하면 드래그나 드롭 상호작용이 어디에서 시작되었는지 쉽게 파악할 수 있습니다.

```angular-html
@for (list of lists; track list) {
  <div cdkDropList [cdkDropListData]="list" (cdkDropListDropped)="drop($event)">
    @for (item of list; track item) {
      <div cdkDrag [cdkDragData]="item"></div>
    }
  </div>
}
```

<!--
## Dragging customizations
-->

<a id="dragging-customizations"></a>

## 드래그 커스터마이징

<!--
### Customize drag handle
-->

<a id="customize-drag-handle"></a>

### 드래그 핸들 커스터마이징

<!--
By default, the user can drag the entire `cdkDrag` element to move it around. To restrict the user to only be able to do so using a handle element, add the `cdkDragHandle` directive to an element inside of `cdkDrag`. You can have as many `cdkDragHandle` elements as you want.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.css"/>
</docs-code-multifile>

You can use the `CDK_DRAG_HANDLE` injection token that can be used to reference instances of `cdkDragHandle`. For more information see the [dependency injection guide](/guide/di) and the [drag handle injection token API](api/cdk/drag-drop/CDK_DRAG_HANDLE).
-->

기본적으로 사용자는 `cdkDrag` 엘리먼트의 어느 부분을 잡아도 드래그해 이동할 수 있습니다.
핸들 엘리먼트로만 드래그하도록 제한하려면 `cdkDrag` 안의 엘리먼트에 `cdkDragHandle` 디렉티브를 추가하세요.
`cdkDragHandle` 엘리먼트는 원하는 만큼 추가할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-handle/app/app.css"/>
</docs-code-multifile>

`cdkDragHandle` 인스턴스를 참조하려면 `CDK_DRAG_HANDLE` 주입 토큰을 사용할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di)와 [드래그 핸들 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_HANDLE)를 참고하세요.

<!--
### Customize drag preview
-->

<a id="customize-drag-preview"></a>

### 드래그 미리보기 커스터마이징

<!--
A preview element becomes visible when a `cdkDrag` element is being dragged. By default, the preview is a clone of the original element positioned next to the user's cursor.

To customize the preview, provide a custom template via `*cdkDragPreview`. The custom preview won't match the size of the original dragged element since assumptions aren't made about the element's content. To match the size of the element for the drag preview, pass true to the `matchSize` input.

The cloned element removes its id attribute in order to avoid having multiple elements with the same id on the page. This will cause any CSS that targets that id not to be applied.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.css"/>
</docs-code-multifile>

You can use the `CDK_DRAG_PREVIEW` injection token that can be used to reference instances of `cdkDragPreview`. For more information see the [dependency injection guide](/guide/di) and the [drag preview injection token API](api/cdk/drag-drop/CDK_DRAG_PREVIEW).
-->

`cdkDrag` 엘리먼트를 드래그하면 미리보기 엘리먼트가 나타납니다.
기본 미리보기는 원본 엘리먼트의 복제본이며 사용자 커서 옆에 배치됩니다.

미리보기를 커스터마이징하려면 `*cdkDragPreview`로 커스텀 템플릿을 제공하세요.
엘리먼트의 내용에 대해 가정하지 않으므로 커스텀 미리보기는 드래그하는 원본 엘리먼트와 크기가 일치하지 않습니다.
드래그 미리보기의 크기를 원본 엘리먼트에 맞추려면 `matchSize` 입력값에 true를 전달하세요.

같은 id를 가진 엘리먼트가 페이지에 여러 개 존재하지 않도록 복제된 엘리먼트에서는 id 어트리뷰트가 제거됩니다.
따라서 해당 id를 대상으로 하는 CSS는 적용되지 않습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-preview/app/app.css"/>
</docs-code-multifile>

`cdkDragPreview` 인스턴스를 참조하려면 `CDK_DRAG_PREVIEW` 주입 토큰을 사용할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di)와 [드래그 미리보기 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_PREVIEW)를 참고하세요.

<!--
### Customize drag insertion point
-->

<a id="customize-drag-insertion-point"></a>

### 드래그 미리보기 삽입 위치 커스터마이징

<!--
By default, Angular inserts the `cdkDrag` preview into the `<body>` of the page in order to avoid issues with positioning and overflow. This may not be desirable in some cases because the preview won't have its inherited styles applied.

You can change where Angular inserts the preview using the `cdkDragPreviewContainer` input on `cdkDrag`. The possible values are:

| Value                         | Description                                                                            | Advantages                                                                                                                  | Disadvantages                                                                                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `global`                      | Default value. Angular inserts the preview into the <body> or the closest shadow root. | Preview won't be affected by `z-index` or `overflow: hidden`. It also won't affect `:nth-child` selectors and flex layouts. | Doesn't retain inherited styles.                                                                                                                                          |
| `parent`                      | Angular inserts the preview inside the parent of the element that is being dragged.    | Preview inherits the same styles as the dragged element.                                                                    | Preview may be clipped by `overflow: hidden` or be placed under other elements due to `z-index`. Furthermore, it can affect `:nth-child` selectors and some flex layouts. |
| `ElementRef` or `HTMLElement` | Angular inserts the preview into the specified element.                                | Preview inherits styles from the specified container element.                                                               | Preview may be clipped by `overflow: hidden` or be placed under other elements due to `z-index`. Furthermore, it can affect `:nth-child` selectors and some flex layouts. |

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `previewContainer` within the config if the value is `global` or `parent`. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

Angular는 기본적으로 위치 지정과 오버플로 문제를 피하기 위해 페이지의 `<body>`에 `cdkDrag` 미리보기를 삽입합니다.
하지만 이 경우 미리보기에 상속된 스타일이 적용되지 않으므로 적절하지 않을 수 있습니다.

`cdkDrag`의 `cdkDragPreviewContainer` 입력값으로 Angular가 미리보기를 삽입할 위치를 변경할 수 있습니다.
사용 가능한 값은 다음과 같습니다.

| 값                              | 설명                                                                               | 장점                                                                                                                            | 단점                                                                                                                                                                         |
| :------------------------------ | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global`                        | 기본값입니다. Angular가 <body> 또는 가장 가까운 섀도 루트에 미리보기를 삽입합니다. | 미리보기가 `z-index`나 `overflow: hidden`의 영향을 받지 않습니다. `:nth-child` 선택자와 flex 레이아웃에도 영향을 주지 않습니다. | 상속된 스타일을 유지하지 않습니다.                                                                                                                                           |
| `parent`                        | Angular가 드래그하는 엘리먼트의 부모 안에 미리보기를 삽입합니다.                   | 미리보기가 드래그하는 엘리먼트와 같은 스타일을 상속합니다.                                                                      | `overflow: hidden`에 의해 미리보기가 잘리거나 `z-index` 때문에 다른 엘리먼트 아래에 놓일 수 있습니다. 또한 `:nth-child` 선택자와 일부 flex 레이아웃에 영향을 줄 수 있습니다. |
| `ElementRef` 또는 `HTMLElement` | Angular가 지정한 엘리먼트에 미리보기를 삽입합니다.                                 | 미리보기가 지정한 컨테이너 엘리먼트의 스타일을 상속합니다.                                                                      | `overflow: hidden`에 의해 미리보기가 잘리거나 `z-index` 때문에 다른 엘리먼트 아래에 놓일 수 있습니다. 또한 `:nth-child` 선택자와 일부 flex 레이아웃에 영향을 줄 수 있습니다. |

또는 값이 `global`이나 `parent`인 경우, `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `previewContainer`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Customize drag placeholder
-->

<a id="customize-drag-placeholder"></a>

### 드래그 플레이스홀더 커스터마이징

<!--
While a `cdkDrag` element is being dragged, the directive creates a placeholder element that shows where the element will be placed when dropped. By default, the placeholder is a clone of the element that is being dragged. You can replace the placeholder with a custom one using the `*cdkDragPlaceholder` directive:

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.css"/>
</docs-code-multifile>

You can use the `CDK_DRAG_PLACEHOLDER` injection token that can be used to reference instances of `cdkDragPlaceholder`. For more information see the [dependency injection guide](/guide/di) and the [drag placeholder injection token API](api/cdk/drag-drop/CDK_DRAG_PLACEHOLDER).
-->

`cdkDrag` 엘리먼트를 드래그하는 동안 디렉티브는 엘리먼트를 놓을 위치를 보여주는 플레이스홀더 엘리먼트를 생성합니다.
기본 플레이스홀더는 드래그하는 엘리먼트의 복제본입니다.
`*cdkDragPlaceholder` 디렉티브로 커스텀 플레이스홀더를 사용할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/custom-placeholder/app/app.css"/>
</docs-code-multifile>

`cdkDragPlaceholder` 인스턴스를 참조하려면 `CDK_DRAG_PLACEHOLDER` 주입 토큰을 사용할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di)와 [드래그 플레이스홀더 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_PLACEHOLDER)를 참고하세요.

<!--
### Customize drag root element
-->

<a id="customize-drag-root-element"></a>

### 드래그 루트 엘리먼트 커스터마이징

<!--
Set the `cdkDragRootElement` attribute if there's an element that you want to make draggable but you don't have direct access to it.

The attribute accepts a selector and looks up the DOM until it finds an element that matches the selector. If an element is found, it becomes draggable. This is useful for cases such as making a dialog draggable.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/root-element/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/root-element/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/root-element/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/root-element/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `rootElementSelector` within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

드래그할 수 있게 만들려는 엘리먼트에 직접 접근할 수 없다면 `cdkDragRootElement` 어트리뷰트를 설정하세요.

이 어트리뷰트는 선택자를 받아 일치하는 엘리먼트를 찾을 때까지 DOM의 상위 방향으로 탐색합니다.
일치하는 엘리먼트를 찾으면 해당 엘리먼트를 드래그할 수 있게 됩니다.
대화상자를 드래그할 수 있게 만드는 등의 경우에 유용합니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/root-element/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/root-element/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/root-element/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/root-element/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `rootElementSelector`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Set DOM position of a draggable element
-->

<a id="set-dom-position-of-a-draggable-element"></a>

### 드래그 가능한 엘리먼트의 DOM 위치 설정하기

<!--
By default, `cdkDrag` elements not in a `cdkDropList` move from their normal DOM position only when a user manually moves the element. Use the `cdkDragFreeDragPosition` input to explicitly set the element’s position. A common use case for this is restoring a draggable element's position after a user has navigated away and then returned.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.css"/>
</docs-code-multifile>
-->

기본적으로 `cdkDropList` 안에 있지 않은 `cdkDrag` 엘리먼트는 사용자가 직접 옮길 때만 일반적인 DOM 위치에서 이동합니다.
엘리먼트의 위치를 명시적으로 설정하려면 `cdkDragFreeDragPosition` 입력값을 사용하세요.
사용자가 다른 페이지로 이동했다가 돌아왔을 때 드래그 가능한 엘리먼트의 위치를 복원하는 것이 대표적인 사용 사례입니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/free-drag-position/app/app.css"/>
</docs-code-multifile>

<!--
### Restrict movement within an element
-->

<a id="restrict-movement-within-an-element"></a>

### 이동 범위를 엘리먼트 안으로 제한하기

<!--
To stop the user from being able to drag a `cdkDrag` element outside of another element, pass a CSS selector to the `cdkDragBoundary` attribute. This attribute accepts a selector and looks up the DOM until it finds an element that matches it. If a match is found, the element becomes the boundary that the draggable element can't be dragged outside of `cdkDragBoundary` can also be used when `cdkDrag` is placed inside a `cdkDropList`.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/boundary/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/boundary/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/boundary/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/boundary/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update boundaryElement within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

사용자가 `cdkDrag` 엘리먼트를 다른 엘리먼트 밖으로 드래그하지 못하게 하려면 `cdkDragBoundary` 어트리뷰트에 CSS 선택자를 전달하세요.
이 어트리뷰트는 선택자를 받아 일치하는 엘리먼트를 찾을 때까지 DOM의 상위 방향으로 탐색합니다.
일치하는 엘리먼트를 찾으면 해당 엘리먼트가 드래그 가능한 엘리먼트가 벗어날 수 없는 경계가 됩니다.
`cdkDrag`가 `cdkDropList` 안에 있는 경우에도 `cdkDragBoundary`를 사용할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/boundary/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/boundary/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/boundary/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/boundary/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `boundaryElement`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Restrict movement along an axis
-->

<a id="restrict-movement-along-an-axis"></a>

### 이동을 특정 축으로 제한하기

<!--
By default, `cdkDrag` allows free movement in all directions. To restrict dragging to a specific axis, set `cdkDragLockAxis` to either "x" or "y"on `cdkDrag`. To restrict dragging for multiple draggable elements within `cdkDropList`, set `cdkDropListLockAxis` on `cdkDropList` instead.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `lockAxis` within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

기본적으로 `cdkDrag`는 모든 방향으로 자유롭게 이동할 수 있습니다.
드래그를 특정 축으로 제한하려면 `cdkDrag`의 `cdkDragLockAxis`를 "x" 또는 "y"로 설정하세요.
`cdkDropList` 안의 여러 드래그 가능한 엘리먼트에 같은 제한을 적용하려면 `cdkDropList`에 `cdkDropListLockAxis`를 설정하세요.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/axis-lock/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `lockAxis`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Delay dragging
-->

<a id="delay-dragging"></a>

### 드래그 시작 지연하기

<!--
By default when the user puts their pointer down on a `cdkDrag`, the dragging sequence starts. This behavior might not be desirable in cases like fullscreen draggable elements on touch devices where the user might accidentally trigger a drag event as they scroll on the page.

You can delay the dragging sequence using the `cdkDragStartDelay` input. The input waits for the user to hold down their pointer for the specified number of milliseconds before dragging the element.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update dragStartDelay within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

기본적으로 사용자가 `cdkDrag` 위에서 포인터를 누르면 드래그 과정이 시작됩니다.
터치 기기에서 전체 화면을 차지하는 드래그 가능한 엘리먼트처럼, 사용자가 페이지를 스크롤하다가 실수로 드래그 이벤트를 발생시킬 수 있는 경우에는 이 동작이 적절하지 않을 수 있습니다.

`cdkDragStartDelay` 입력값으로 드래그 시작을 지연할 수 있습니다.
이 입력값은 사용자가 지정된 밀리초만큼 포인터를 누른 상태를 유지한 후에 엘리먼트 드래그를 시작하도록 합니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/delay-drag/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `dragStartDelay`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Disable dragging
-->

<a id="disable-dragging"></a>

### 드래그 비활성화하기

<!--
If you want to disable dragging for a particular drag item, set the `cdkDragDisabled` input on a `cdkDrag` item to true or false. You can disable an entire list using the `cdkDropListDisabled` input on a `cdkDropList`. It is also possible to disable a specific handle via `cdkDragHandleDisabled` on `cdkDragHandle`.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `draggingDisabled` within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

특정 항목의 드래그 활성화 여부를 바꾸려면 `cdkDrag` 항목의 `cdkDragDisabled` 입력값을 true 또는 false로 설정하세요.
`cdkDropList`의 `cdkDropListDisabled` 입력값으로 목록 전체를 비활성화할 수 있습니다.
`cdkDragHandle`의 `cdkDragHandleDisabled`로 특정 핸들만 비활성화할 수도 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/disable-drag/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `draggingDisabled`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
## Sorting customizations
-->

<a id="sorting-customizations"></a>

## 정렬 커스터마이징

<!--
### List orientation
-->

<a id="list-orientation"></a>

### 목록 방향

<!--
By default, the `cdkDropList` directive assumes lists are vertical. This can be changed by setting the `cdkDropListOrientation` property to horizontal.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `listOrientation` within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

기본적으로 `cdkDropList` 디렉티브는 목록이 세로 방향이라고 가정합니다.
`cdkDropListOrientation` 프로퍼티를 horizontal로 설정하면 이를 변경할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/horizontal-sorting/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `listOrientation`을 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### List wrapping
-->

<a id="list-wrapping"></a>

### 목록 줄바꿈

<!--
By default, the `cdkDropList` sorts the draggable elements by moving them around using a CSS transform. This allows for the sorting to be animated which provides a better user experience. However this also comes with the drawback that the drop list works only in one direction: vertically or horizontally.

If you have a sortable list that needs to wrap onto new lines, you can set `cdkDropListOrientation` attribute to `mixed`. This causes the list to use a different strategy of sorting the elements which involves moving them in the DOM. However the list can no longer animate the sorting action .

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.css"/>
</docs-code-multifile>
-->

기본적으로 `cdkDropList`는 CSS transform으로 드래그 가능한 엘리먼트를 이동해 정렬합니다.
이 방식은 정렬에 애니메이션을 적용할 수 있어 사용자 경험을 개선합니다.
다만 드롭 목록이 세로 또는 가로 중 한 방향으로만 동작한다는 단점이 있습니다.

정렬 가능한 목록이 여러 줄로 이어져야 한다면 `cdkDropListOrientation` 어트리뷰트를 `mixed`로 설정할 수 있습니다.
그러면 목록은 DOM에서 엘리먼트를 실제로 이동하는 다른 정렬 전략을 사용합니다.
하지만 이 경우 정렬 동작에 애니메이션을 적용할 수 없습니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/mixed-sorting/app/app.css"/>
</docs-code-multifile>

<!--
### Selective sorting
-->

<a id="selective-sorting"></a>

### 선택적으로 정렬 허용하기

<!--
By default, `cdkDrag` elements are sorted into any position inside of a `cdkDropList`. To change this behavior, set the `cdkDropListSortPredicate` attribute which takes in a function. The predicate function is called whenever a draggable element is about to be moved into a new index within the drop list. If the predicate returns true, the item will be moved into the new index, otherwise it will keep its current position.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.css"/>
</docs-code-multifile>
-->

기본적으로 `cdkDrag` 엘리먼트는 `cdkDropList` 안의 어느 위치로든 정렬할 수 있습니다.
이 동작을 변경하려면 함수를 받는 `cdkDropListSortPredicate` 어트리뷰트를 설정하세요.
드래그 가능한 엘리먼트를 드롭 목록의 새 인덱스로 이동하려고 할 때마다 조건 함수를 호출합니다.
함수가 true를 반환하면 항목을 새 인덱스로 이동하고, 그렇지 않으면 현재 위치를 유지합니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/sort-predicate/app/app.css"/>
</docs-code-multifile>

<!--
### Disable sorting
-->

<a id="disable-sorting"></a>

### 정렬 비활성화하기

<!--
There are cases where draggable elements can be dragged out of one `cdkDropList` into another, however the user shouldn't be able to sort them within the source list. For these cases, add the `cdkDropListSortingDisabled` attribute to prevent the draggable elements in a `cdkDropList` from sorting. This preserves the dragged element's initial position in the source list if it does not get dragged to a new valid position.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.css"/>
</docs-code-multifile>

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update sortingDisabled within the config. For more information see the [dependency injection guide](/guide/di), [drag config injection token API](api/cdk/drag-drop/CDK_DRAG_CONFIG), and the [drag drop config API](api/cdk/drag-drop/DragDropConfig).
-->

드래그 가능한 엘리먼트를 한 `cdkDropList`에서 다른 목록으로 옮길 수는 있지만, 원본 목록 안에서는 사용자가 순서를 바꾸지 못하게 해야 하는 경우가 있습니다.
이때는 `cdkDropListSortingDisabled` 어트리뷰트를 추가해 `cdkDropList` 안의 드래그 가능한 엘리먼트가 정렬되지 않게 하세요.
이렇게 하면 엘리먼트를 새로운 유효한 위치로 드래그하지 않았을 때 원본 목록의 처음 위치가 유지됩니다.

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/disable-sorting/app/app.css"/>
</docs-code-multifile>

또는 `CDK_DRAG_CONFIG` 주입 토큰을 수정해 설정의 `sortingDisabled`를 갱신할 수 있습니다.
자세한 내용은 [의존성 주입 가이드](/guide/di), [드래그 설정 주입 토큰 API](api/cdk/drag-drop/CDK_DRAG_CONFIG), [드래그 앤 드롭 설정 API](api/cdk/drag-drop/DragDropConfig)를 참고하세요.

<!--
### Copying items between lists
-->

<a id="copying-items-between-lists"></a>

### 목록 간 항목 복사하기

<!--
By default, when an item is dragged from one list to another, it is moved out of its original list. However, you can configure the directives to copy the item, leaving the original item in the source list.

To enable copying, you can set the `cdkDropListHasAnchor` input. This tells the `cdkDropList` to create an "anchor" element that stays in the original container and doesn't move with the item. If the user moves the item back into the original container, the anchor is removed automatically. The anchor element can be styled by targeting the `.cdk-drag-anchor` CSS class.

Combining `cdkDropListHasAnchor` with `cdkDropListSortingDisabled` makes it possible to construct a list from which a user can copy items without being able to reorder the source list (e.g. a product list and a shopping cart).

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/copy-list/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.css"/>
</docs-code-multifile>
-->

기본적으로 항목을 한 목록에서 다른 목록으로 드래그하면 원래 목록에서 제거되어 이동합니다.
하지만 디렉티브를 설정해 원본 목록의 항목을 유지하면서 복사할 수도 있습니다.

복사를 활성화하려면 `cdkDropListHasAnchor` 입력값을 설정하세요.
그러면 `cdkDropList`는 항목과 함께 이동하지 않고 원래 컨테이너에 남아 있는 "앵커" 엘리먼트를 생성합니다.
사용자가 항목을 원래 컨테이너로 다시 옮기면 앵커는 자동으로 제거됩니다.
`.cdk-drag-anchor` CSS 클래스로 앵커 엘리먼트의 스타일을 지정할 수 있습니다.

`cdkDropListHasAnchor`와 `cdkDropListSortingDisabled`를 함께 사용하면 원본 목록의 순서를 바꾸지 않으면서 항목을 복사할 수 있는 목록을 만들 수 있습니다(예: 상품 목록과 장바구니).

<docs-code-multifile preview path="adev/src/content/examples/drag-drop/src/copy-list/app/app.ts">
  <docs-code header="app.html" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.html"/>
  <docs-code header="app.ts" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.ts"/>
  <docs-code header="app.css" path="adev/src/content/examples/drag-drop/src/copy-list/app/app.css"/>
</docs-code-multifile>

<!--
## Customize animations
-->

<a id="customize-animations"></a>

## 애니메이션 커스터마이징

<!--
Drag and drop supports animations for both:

- Sorting a draggable element inside a list
- Moving the draggable element from the position that the user dropped it to the final position inside the list

To set up your animations, define a CSS transition that targets the transform property. The following classes can be used for animations:

| CSS class name      | Result of adding transition                                                                                                                                                                                |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .cdk-drag           | Animate draggable elements as they are being sorted.                                                                                                                                                       |
| .cdk-drag-animating | Animate the draggable element from its dropped position to the final position within the `cdkDropList`.<br><br>This CSS class is applied to a `cdkDrag` element only when the dragging action has stopped. |
-->

드래그 앤 드롭은 다음 두 동작에 애니메이션을 지원합니다.

- 목록 안에서 드래그 가능한 엘리먼트 정렬
- 사용자가 놓은 위치에서 목록 안의 최종 위치까지 드래그 가능한 엘리먼트 이동

애니메이션을 설정하려면 transform 프로퍼티를 대상으로 하는 CSS 트랜지션을 정의하세요.
애니메이션에 사용할 수 있는 클래스는 다음과 같습니다.

| CSS 클래스 이름     | 트랜지션을 추가했을 때의 효과                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .cdk-drag           | 드래그 가능한 엘리먼트가 정렬되는 동안 애니메이션을 적용합니다.                                                                                                                           |
| .cdk-drag-animating | 드래그 가능한 엘리먼트가 놓인 위치에서 `cdkDropList` 안의 최종 위치로 이동하는 애니메이션을 적용합니다.<br><br>이 CSS 클래스는 드래그 동작이 끝났을 때만 `cdkDrag` 엘리먼트에 적용됩니다. |

<!--
## Styling
-->

<a id="styling"></a>

## 스타일 지정하기

<!--
Both `cdkDrag` and `cdkDropList` directives only apply essential styles needed for functionality. Applications can customize their styles by targeting these specified CSS classes.

| CSS class name           | Description                                                                                                                                                                                                                                                                                             |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .cdk-drop-list           | Selector for the `cdkDropList` container elements.                                                                                                                                                                                                                                                      |
| .cdk-drag                | Selector for `cdkDrag` elements.                                                                                                                                                                                                                                                                        |
| .cdk-drag-disabled       | Selector for disabled `cdkDrag` elements.                                                                                                                                                                                                                                                               |
| .cdk-drag-handle         | Selector for the host element of the `cdkDragHandle`.                                                                                                                                                                                                                                                   |
| .cdk-drag-preview        | Selector for the drag preview element. This is the element that appears next to the cursor as a user drags an element in a sortable list.<br><br>The element looks exactly like the element that is being dragged unless customized with a custom template through `*cdkDragPreview`.                   |
| .cdk-drag-placeholder    | Selector for the drag placeholder element. This is the element that is shown in the spot where the draggable element will be dragged to once the dragging action ends.<br><br>This element looks exactly like the element that is being sorted unless customized with the cdkDragPlaceholder directive. |
| .cdk-drop-list-dragging  | Selector for `cdkDropList` container element that has a draggable element currently being dragged.                                                                                                                                                                                                      |
| .cdk-drop-list-disabled  | Selector for `cdkDropList` container elements that are disabled.                                                                                                                                                                                                                                        |
| .cdk-drop-list-receiving | Selector for `cdkDropList` container element that has a draggable element it can receive from a connected drop list that is currently being dragged.                                                                                                                                                    |
| .cdk-drag-anchor         | Selector for the anchor element that is created when `cdkDropListHasAnchor` is enabled. This element indicates the position from which the dragged item started.                                                                                                                                        |
-->

`cdkDrag`와 `cdkDropList` 디렉티브는 기능 동작에 꼭 필요한 스타일만 적용합니다.
애플리케이션에서는 다음 CSS 클래스를 대상으로 스타일을 커스터마이징할 수 있습니다.

| CSS 클래스 이름          | 설명                                                                                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .cdk-drop-list           | `cdkDropList` 컨테이너 엘리먼트의 선택자입니다.                                                                                                                                                                                       |
| .cdk-drag                | `cdkDrag` 엘리먼트의 선택자입니다.                                                                                                                                                                                                    |
| .cdk-drag-disabled       | 비활성화된 `cdkDrag` 엘리먼트의 선택자입니다.                                                                                                                                                                                         |
| .cdk-drag-handle         | `cdkDragHandle`의 호스트 엘리먼트 선택자입니다.                                                                                                                                                                                       |
| .cdk-drag-preview        | 드래그 미리보기 엘리먼트의 선택자입니다. 사용자가 정렬 가능한 목록에서 엘리먼트를 드래그할 때 커서 옆에 나타나는 엘리먼트입니다.<br><br>`*cdkDragPreview`의 커스텀 템플릿으로 변경하지 않는 한 드래그하는 엘리먼트와 똑같이 보입니다. |
| .cdk-drag-placeholder    | 드래그 플레이스홀더 엘리먼트의 선택자입니다. 드래그 동작이 끝난 후 드래그 가능한 엘리먼트가 놓일 자리에 표시되는 엘리먼트입니다.<br><br>cdkDragPlaceholder 디렉티브로 변경하지 않는 한 정렬하는 엘리먼트와 똑같이 보입니다.           |
| .cdk-drop-list-dragging  | 현재 드래그 중인 엘리먼트가 있는 `cdkDropList` 컨테이너 엘리먼트의 선택자입니다.                                                                                                                                                      |
| .cdk-drop-list-disabled  | 비활성화된 `cdkDropList` 컨테이너 엘리먼트의 선택자입니다.                                                                                                                                                                            |
| .cdk-drop-list-receiving | 연결된 드롭 목록에서 현재 드래그 중인 엘리먼트를 받을 수 있는 `cdkDropList` 컨테이너 엘리먼트의 선택자입니다.                                                                                                                         |
| .cdk-drag-anchor         | `cdkDropListHasAnchor`를 활성화했을 때 생성되는 앵커 엘리먼트의 선택자입니다. 이 엘리먼트는 드래그한 항목의 시작 위치를 나타냅니다.                                                                                                   |

<!--
## Dragging in a scrollable container
-->

<a id="dragging-in-a-scrollable-container"></a>

## 스크롤 가능한 컨테이너에서 드래그하기

<!--
If your draggable items are inside a scrollable container (e.g., a `div` with `overflow: auto`), automatic scrolling will not work unless the scrollable container has the `cdkScrollable` directive. Without it, the CDK cannot detect or control the scroll behavior of the container during drag operations.
-->

드래그 가능한 항목이 스크롤 가능한 컨테이너(예: `overflow: auto`가 지정된 `div`) 안에 있다면, 해당 컨테이너에 `cdkScrollable` 디렉티브가 있어야 자동 스크롤이 동작합니다.
이 디렉티브가 없으면 CDK는 드래그하는 동안 컨테이너의 스크롤 동작을 감지하거나 제어할 수 없습니다.

<!--
## Integrations with other components
-->

<a id="integrations-with-other-components"></a>

## 다른 컴포넌트와 통합하기

<!--
The CDK's drag-and-drop functionality can be integrated with different components. Common use cases include sortable `MatTable` components and sortable `MatTabGroup` components.
-->

CDK의 드래그 앤 드롭 기능은 다양한 컴포넌트와 통합할 수 있습니다.
대표적인 사용 사례로는 정렬 가능한 `MatTable` 컴포넌트와 정렬 가능한 `MatTabGroup` 컴포넌트가 있습니다.
