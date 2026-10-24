<!--
# Debug the signal graph
-->

<a id="debug-the-signal-graph"></a>

# 시그널 그래프 디버깅하기

<!--
The **Components** tab can display a live signal graph for the selected component or directive.
The graph shows how the signals, computeds, effects, and other reactive nodes in that component depend on each other, which makes it easier to understand and debug reactive data flows.

<img src="assets/images/guide/devtools/signal-graph.png" alt="A screenshot of the 'Components' tab in Angular DevTools with the signal graph open for the selected component. The graph shows a signal node connected by edges to three computed nodes which the component's template reads, and the properties of the component are listed in a sidebar to the right.">
-->

**Components** 탭에서는 선택한 컴포넌트나 디렉티브의 시그널 그래프를 실시간으로 확인할 수 있습니다.
그래프는 해당 컴포넌트의 시그널, computed 시그널, 이펙트 함수, 기타 반응형 노드가 서로 어떻게 의존하는지 보여줍니다.
이를 통해 반응형 데이터 흐름을 쉽게 이해하고 디버깅할 수 있습니다.

<img src="assets/images/guide/devtools/signal-graph.png" alt="선택한 컴포넌트의 시그널 그래프가 열린 Angular DevTools의 'Components' 탭 화면입니다. 그래프에는 시그널 노드 하나가 컴포넌트 템플릿에서 읽는 computed 노드 3개와 선으로 연결되어 있으며, 오른쪽 사이드바에는 컴포넌트 프로퍼티 목록이 표시됩니다.">

<!--
## Open the signal graph
-->

<a id="open-the-signal-graph"></a>

## 시그널 그래프 열기

<!--
In the **Components** tab, select a component or directive.
In the property pane header, click **Show Signal Graph**.
The signal graph opens next to the component tree.

You can also jump directly to a specific signal: in the properties view, click the signal graph button next to the property, or, when the property has more than one action, open its actions menu and choose **Show in signal graph**.

The **Show Signal Graph** button appears automatically when the inspected application supports the signal graph API — there is no setting to enable.
-->

**Components** 탭에서 컴포넌트나 디렉티브를 선택하세요.
프로퍼티 패널 헤더에서 **Show Signal Graph**를 클릭하세요.
컴포넌트 트리 옆에 시그널 그래프가 열립니다.

특정 시그널로 바로 이동할 수도 있습니다.
프로퍼티 보기에서 프로퍼티 옆의 시그널 그래프 버튼을 클릭하세요.
프로퍼티에 사용할 수 있는 동작이 여러 개라면 동작 메뉴를 열고 **Show in signal graph**를 선택하세요.

검사하는 애플리케이션이 시그널 그래프 API를 지원하면 **Show Signal Graph** 버튼이 자동으로 표시되므로 별도로 설정할 필요가 없습니다.

<!--
## Read the graph
-->

<a id="read-the-graph"></a>

## 그래프 읽기

<!--
Nodes in the graph represent the reactive nodes that participate in the selected component:

- **Signal**: a writable signal created with `signal()`.
- **Computed**: a derived value created with `computed()`.
- **Effect**: a side effect created with `effect()` or `afterRenderEffect()`.
- **Linked signal**: a writable signal created with `linkedSignal()`.
- **Template**: the component's template, which reads signals when it renders.
- **Resource**: signals that belong to a `resource()` or `rxResource()` are grouped into a collapsible cluster. Click **Expand** on the cluster node to see the individual nodes inside.

Lines between nodes show reactive dependencies: each node is connected to the producers it reads from (upstream) and the dependants that read it (downstream).

TIP: Nodes are labeled with the `debugName` of their reactive node. Giving your signals, computeds, and especially effects — which are usually not assigned to a class member — a `debugName` makes the graph much easier to read:

```ts
effect(
  () => {
    // ...
  },
  {debugName: 'name in graph'},
);
```
-->

그래프의 노드는 선택한 컴포넌트와 관련된 반응형 노드를 나타냅니다:

- **Signal**: `signal()`로 생성한 값을 쓸 수 있는 시그널입니다.
- **Computed**: `computed()`로 생성한 계산된 값입니다.
- **Effect**: `effect()` 또는 `afterRenderEffect()`로 생성한 이펙트 함수입니다.
- **Linked signal**: `linkedSignal()`로 생성한 값을 쓸 수 있는 시그널입니다.
- **Template**: 렌더링할 때 시그널을 읽는 컴포넌트 템플릿입니다.
- **Resource**: `resource()` 또는 `rxResource()`에 속하는 시그널을 접거나 펼칠 수 있는 그룹으로 묶어 표시합니다. 그룹 노드에서 **Expand**를 클릭하면 그룹 안의 개별 노드를 확인할 수 있습니다.

노드 사이의 선은 반응형 의존성을 나타냅니다.
각 노드는 자신이 값을 읽는 생산자 노드(업스트림)와 자신의 값을 읽는 의존 노드(다운스트림)에 연결됩니다.

팁: 각 노드의 레이블에는 해당 반응형 노드의 `debugName`이 표시됩니다.
시그널, computed 시그널, 특히 보통 클래스 멤버에 할당하지 않는 이펙트 함수에 `debugName`을 지정하면 그래프를 훨씬 쉽게 읽을 수 있습니다:

```ts
effect(
  () => {
    // ...
  },
  {debugName: 'name in graph'},
);
```

<!--
## Search the graph
-->

<a id="search-the-graph"></a>

## 그래프 검색하기

<!--
Click the search icon in the graph toolbar to find a node by name.
Angular DevTools highlights every match and lets you step through them.
-->

그래프 툴바에서 검색 아이콘을 클릭하면 이름으로 노드를 찾을 수 있습니다.
Angular DevTools는 일치하는 모든 노드를 강조하며, 검색 결과를 하나씩 살펴볼 수 있습니다.

<!--
## Inspect a node
-->

<a id="inspect-a-node"></a>

## 노드 검사하기

<!--
Click a node to open its details panel, which shows the node's current value as an expandable tree and offers the following actions:

- **View source**: navigate to the node's definition in the Sources tab (Chrome) or Debugger tab (Firefox). The action is disabled when the source location is not available.
- **Set breakpoint**: pause execution when the signal updates. Breakpoints are only available in Chromium-based browsers.
- **Watch signal**: log the signal's updates and invalidations to the browser console. Click the action again to stop watching.
- **Highlight upstream / downstream**: trace the paths of the node's dependencies or its dependants.

If the component uses no signals, Angular DevTools shows a "No signals in this component" message instead of the graph.
-->

노드를 클릭하면 상세 정보 패널이 열립니다.
이 패널에서는 노드의 현재 값을 펼칠 수 있는 트리로 표시하며, 다음 동작을 제공합니다:

- **View source**: Chrome의 Sources 탭이나 Firefox의 Debugger 탭에서 노드 정의로 이동합니다. 소스 위치를 확인할 수 없으면 이 동작은 비활성화됩니다.
- **Set breakpoint**: 시그널이 갱신될 때 실행을 일시 중지합니다. 중단점은 Chromium 기반 브라우저에서만 사용할 수 있습니다.
- **Watch signal**: 시그널의 갱신과 무효화를 브라우저 콘솔에 기록합니다. 다시 클릭하면 감시를 중지합니다.
- **Highlight upstream / downstream**: 노드가 의존하는 노드나 해당 노드에 의존하는 노드로 이어지는 경로를 추적합니다.

컴포넌트가 시그널을 사용하지 않으면 Angular DevTools는 그래프 대신 "No signals in this component" 메시지를 표시합니다.

<!--
## Version support
-->

<a id="version-support"></a>

## 지원 버전

<!--
The signal graph requires an application built with Angular 19 or later running in development mode.
-->

시그널 그래프를 사용하려면 Angular 19 이상으로 빌드한 애플리케이션을 개발 모드로 실행해야 합니다.
