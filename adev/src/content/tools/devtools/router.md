<!--
# Inspect the Router Tree
-->

<a id="inspect-the-router-tree"></a>

# 라우터 트리 검사하기

<!--
The **Router Tree** tab lets you visualize the routing tree of your application. You can explore how routes are nested and view details about specific routes.

<img src="assets/images/guide/devtools/router-tree.png" alt="A screenshot of the 'Router Tree' tab in Angular DevTools showing a tree of configured routes. The active routes are highlighted in green, while inactive ones are white.">
-->

**Router Tree** 탭에서는 애플리케이션의 라우팅 트리를 시각적으로 확인할 수 있습니다.
라우팅 규칙이 어떻게 중첩되어 있는지 살펴보고 특정 라우팅 규칙의 세부 정보를 확인할 수 있습니다.

<img src="assets/images/guide/devtools/router-tree.png" alt="설정된 라우팅 규칙의 트리가 표시된 Angular DevTools의 'Router Tree' 탭 화면입니다. 활성 라우팅 규칙은 초록색으로 강조되고 비활성 라우팅 규칙은 흰색으로 표시됩니다.">

<!--
### View route details
-->

<a id="view-route-details"></a>

### 라우팅 규칙 세부 정보 확인하기

<!--
When you select a specific route in the tree, Angular DevTools displays its properties in the sidebar on the right. This information includes:

- **Path**: The URL path for the route. If the route uses a custom URL matcher, DevTools displays the **Matcher** instead.
- **Component**: The component rendered for this route. If the route is a redirect, DevTools displays the **Redirect to** target instead.
- **Path Match**: The path matching strategy (`prefix` or `full`), if configured.
- **Data**: Static data associated with the route, displayed as a JSON tree.
- **Resolvers**: Route resolvers, displayed as key-value pairs.
- **Guards**: Any guards configured on the route, grouped by type — `canActivate`, `canActivateChild`, `canDeactivate`, and `canMatch`.
- **Providers**: Route-level providers, if configured.
- **Title**: The route title, if configured.
- **RunGuardsAndResolvers**: The re-run strategy for guards and resolvers, if configured.
- **Active**: Whether this route is currently active.
- **Auxiliary**: Indicates if the route is an auxiliary route (e.g., in a named outlet).
- **Lazy**: Indicates if the route is lazily loaded.

NOTE: Properties like Path Match, Data, Resolvers, Guards, Providers, Title, and RunGuardsAndResolvers only appear in the sidebar when they are configured on the selected route.
-->

트리에서 특정 라우팅 규칙을 선택하면 Angular DevTools가 오른쪽 사이드바에 프로퍼티를 표시합니다.
다음과 같은 정보가 포함됩니다:

- **Path**: 라우팅 규칙의 URL 경로입니다.
  커스텀 URL 매처를 사용하는 라우팅 규칙이면 **Matcher**가 대신 표시됩니다.
- **Component**: 이 라우팅 규칙으로 렌더링하는 컴포넌트입니다.
  리다이렉트 라우팅 규칙이면 **Redirect to** 대상이 대신 표시됩니다.
- **Path Match**: 설정된 경우 경로 일치 전략(`prefix` 또는 `full`)을 표시합니다.
- **Data**: 라우팅 규칙과 연결된 정적 데이터를 JSON 트리로 표시합니다.
- **Resolvers**: 라우팅 규칙의 리졸버를 키-값 쌍으로 표시합니다.
- **Guards**: 라우팅 규칙에 설정된 가드를 `canActivate`, `canActivateChild`, `canDeactivate`, `canMatch` 유형별로 묶어 표시합니다.
- **Providers**: 설정된 경우 라우팅 규칙 수준의 프로바이더를 표시합니다.
- **Title**: 설정된 경우 라우팅 규칙의 제목을 표시합니다.
- **RunGuardsAndResolvers**: 설정된 경우 가드와 리졸버의 재실행 전략을 표시합니다.
- **Active**: 현재 이 라우팅 규칙이 활성화되어 있는지 표시합니다.
- **Auxiliary**: 보조 라우팅 규칙인지 표시합니다(예: 이름이 지정된 아웃렛의 라우팅 규칙).
- **Lazy**: 지연 로딩하는 라우팅 규칙인지 표시합니다.

NOTE: Path Match, Data, Resolvers, Guards, Providers, Title, RunGuardsAndResolvers 등의 프로퍼티는 선택한 라우팅 규칙에 설정되어 있을 때만 사이드바에 나타납니다.

<!--
### Navigate to a specific route
-->

<a id="navigate-to-a-specific-route"></a>

### 특정 라우팅 규칙으로 이동하기

<!--
You can easily trigger navigation directly from the DevTools. While inspecting a route's details in the right sidebar, click on the **Navigate** icon next to the path string. This triggers the Angular router to navigate to that URL in your application.

<img src="assets/images/guide/devtools/router-tree-navigate.png" alt="A screenshot showing the 'Navigate to' tooltip on the route path in the 'Routes Details' sidebar.">
-->

DevTools에서 바로 내비게이션을 실행할 수 있습니다.
오른쪽 사이드바에서 라우팅 규칙의 상세 정보를 확인할 때 경로 문자열 옆의 **Navigate** 아이콘을 클릭하세요.
Angular 라우터가 애플리케이션에서 해당 URL로 이동합니다.

<img src="assets/images/guide/devtools/router-tree-navigate.png" alt="'Routes Details' 사이드바의 라우팅 규칙 경로에 'Navigate to' 툴팁이 표시된 화면입니다.">
