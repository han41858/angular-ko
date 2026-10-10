<!--
# Inspect the component tree
-->

<a id="inspect-the-component-tree"></a>

# 컴포넌트 트리 검사하기

<!--
## Debug your application
-->

<a id="debug-your-application"></a>

## 애플리케이션 디버깅하기

<!--
The **Components** tab lets you explore the structure of your application.
You can visualize the component and directive instances in the DOM and inspect or modify their state.
-->

**Components** 탭에서는 애플리케이션 구조를 살펴볼 수 있습니다.
DOM에 있는 컴포넌트와 디렉티브 인스턴스를 시각적으로 확인하고 상태를 검사하거나 수정할 수 있습니다.

<!--
### Explore the application structure
-->

<a id="explore-the-application-structure"></a>

### 애플리케이션 구조 살펴보기

<!--
The component tree displays a hierarchical relationship of the _components and directives_ within your application.

<img src="assets/images/guide/devtools/component-explorer.png" alt="A screenshot of the 'Components' tab showing a tree of Angular components and directives starting the root of the application.">

Click the individual components or directives in the component explorer to select them and preview their properties.
Angular DevTools displays properties and metadata on the right side of the component tree.

To look up a component or directive by name use the search box above the component tree.

<img src="assets/images/guide/devtools/search.png" alt="A screenshot of the 'Components' tab. The filter bar immediately underneath the tab is searching for 'todo' and all components with 'todo' in the name are highlighted in the tree. `app-todos` is currently selected and a sidebar to the right displays information about the component's properties. This includes a section of `@Output` fields and another section for other properties.">
-->

컴포넌트 트리는 애플리케이션의 _컴포넌트와 디렉티브_ 사이의 계층 관계를 표시합니다.

<img src="assets/images/guide/devtools/component-explorer.png" alt="애플리케이션의 루트부터 시작하는 Angular 컴포넌트와 디렉티브 트리를 보여주는 'Components' 탭 화면입니다.">

컴포넌트 탐색기에서 컴포넌트나 디렉티브를 클릭하면 해당 항목을 선택하고 프로퍼티를 미리 볼 수 있습니다.
Angular DevTools는 컴포넌트 트리 오른쪽에 프로퍼티와 메타데이터를 표시합니다.

이름으로 컴포넌트나 디렉티브를 찾으려면 컴포넌트 트리 위에 있는 검색창을 사용하세요.

<img src="assets/images/guide/devtools/search.png" alt="'Components' 탭 화면입니다. 탭 바로 아래의 필터 입력창에서 'todo'를 검색했으며, 이름에 'todo'가 포함된 모든 컴포넌트가 트리에서 강조됩니다. 현재 `app-todos`가 선택되어 있고 오른쪽 사이드바에 컴포넌트 프로퍼티 정보가 표시됩니다. `@Output` 필드 섹션과 기타 프로퍼티 섹션이 있습니다.">

<!--
### Navigate to the host node
-->

<a id="navigate-to-the-host-node"></a>

### 호스트 노드로 이동하기

<!--
To go to the host element of a particular component or directive, double-click it in the component explorer.
Angular DevTools will open the Elements tab in Chrome or the Inspector tab in Firefox, and select the associated DOM node.
-->

특정 컴포넌트나 디렉티브의 호스트 엘리먼트로 이동하려면 컴포넌트 탐색기에서 해당 항목을 더블클릭하세요.
Angular DevTools가 Chrome의 Elements 탭이나 Firefox의 Inspector 탭을 열고 연결된 DOM 노드를 선택합니다.

<!--
### Navigate to source
-->

<a id="navigate-to-source"></a>

### 소스로 이동하기

<!--
For components, Angular DevTools lets you navigate to the component definition in the Sources tab (Chrome) and Debugger tab (Firefox).
After you select a particular component, click the icon at the top-right of the properties view:

<img src="assets/images/guide/devtools/navigate-source.png" alt="A screenshot of the 'Components' tab. The properties view on the right is visible for a component and the mouse rests in the upper right corner of that view on top of a `<>` icon. An adjacent tooltip reads 'Open component source'.">
-->

Angular DevTools를 사용하면 Chrome의 Sources 탭이나 Firefox의 Debugger 탭에서 컴포넌트 정의로 이동할 수 있습니다.
컴포넌트를 선택한 다음 프로퍼티 보기 오른쪽 위의 아이콘을 클릭하세요:

<img src="assets/images/guide/devtools/navigate-source.png" alt="'Components' 탭 화면입니다. 오른쪽에 컴포넌트 프로퍼티 보기가 표시되며 마우스가 이 보기의 오른쪽 위 `<>` 아이콘에 놓여 있습니다. 옆에 'Open component source'라는 툴팁이 표시됩니다.">

<!--
### Update property value
-->

<a id="update-property-value"></a>

### 프로퍼티 값 변경하기

<!--
Like browsers' DevTools, the properties view lets you edit the value of an input, output, or other properties.
Right-click on the property value and if edit functionality is available for this value type, a text input will appear.
Type the new value and press `Enter` to apply this value to the property.

<img src="assets/images/guide/devtools/update-property.png" alt="A screenshot of the 'Components' tab with the properties view open for a component. An `@Input` named `todo` contains a `label` property which is currently selected and has been manually updated to the value 'Buy milk'.">
-->

브라우저 DevTools와 마찬가지로 프로퍼티 보기에서 입력 프로퍼티, 출력 프로퍼티, 기타 프로퍼티 값을 수정할 수 있습니다.
프로퍼티 값을 마우스 오른쪽 버튼으로 클릭하면 해당 값의 자료형이 편집을 지원하는 경우 텍스트 입력창이 나타납니다.
새 값을 입력하고 `Enter`를 누르면 프로퍼티에 해당 값이 적용됩니다.

<img src="assets/images/guide/devtools/update-property.png" alt="컴포넌트의 프로퍼티 보기가 열린 'Components' 탭 화면입니다. `todo`라는 `@Input`에 포함된 `label` 프로퍼티가 선택되어 있으며 값이 'Buy milk'로 직접 변경되었습니다.">

<!--
### Access selected component or directive in console
-->

<a id="access-selected-component-or-directive-in-console"></a>

### 콘솔에서 선택한 컴포넌트나 디렉티브에 접근하기

<!--
As a shortcut in the console, Angular DevTools provides access to instances of recently selected components or directives.
Type `$ng0` to get a reference to the instance of the currently selected component or directive, and type `$ng1` for the previously selected instance, `$ng2` for the instance selected before that, and so on.

<img src="assets/images/guide/devtools/access-console.png" alt="A screenshot of the 'Components' tab with the browser console underneath. In the console, the user has typed three commands, `$ng0`, `$ng1`, and `$ng2` to view the three most recently selected elements. After each statement, the console prints a different component reference.">
-->

Angular DevTools는 콘솔에서 최근 선택한 컴포넌트나 디렉티브 인스턴스에 간편하게 접근할 수 있는 기능을 제공합니다.
`$ng0`을 입력하면 현재 선택한 컴포넌트나 디렉티브 인스턴스의 참조를 가져올 수 있습니다.
`$ng1`은 이전에 선택한 인스턴스, `$ng2`는 그보다 앞서 선택한 인스턴스를 가리키며 같은 방식으로 이어집니다.

<img src="assets/images/guide/devtools/access-console.png" alt="아래쪽에 브라우저 콘솔이 표시된 'Components' 탭 화면입니다. 사용자가 최근 선택한 엘리먼트 3개를 확인하기 위해 콘솔에 `$ng0`, `$ng1`, `$ng2` 명령을 입력했습니다. 각 구문 다음에 서로 다른 컴포넌트 참조가 출력됩니다.">

<!--
### Select a directive or component
-->

<a id="select-a-directive-or-component"></a>

### 디렉티브나 컴포넌트 선택하기

<!--
Similar to browsers' DevTools, you can inspect the page to select a particular component or directive.
Click the **_Inspect element_** icon in the top left corner within Angular DevTools and hover over a DOM element on the page.
The extension recognizes the associated directives and/or components and lets you select the corresponding element in the Component tree.

<img src="assets/images/guide/devtools/inspect-element.png" alt="A screenshot of the 'Components' tab with an Angular todo application visible. In the very top-left corner of Angular DevTools, an icon of a screen with a mouse icon inside it is selected. The mouse rests on a todo element in the Angular application UI. The element is highlighted with a `<TodoComponent>` label displayed in an adjacent tooltip.">
-->

브라우저 DevTools처럼 페이지를 검사해서 특정 컴포넌트나 디렉티브를 선택할 수 있습니다.
Angular DevTools 왼쪽 위의 **_Inspect element_** 아이콘을 클릭하고 페이지의 DOM 엘리먼트 위에 마우스를 올리세요.
확장 프로그램이 연결된 디렉티브나 컴포넌트를 인식하며, 컴포넌트 트리에서 해당 엘리먼트를 선택할 수 있습니다.

<img src="assets/images/guide/devtools/inspect-element.png" alt="Angular 할 일 애플리케이션이 보이는 'Components' 탭 화면입니다. Angular DevTools의 맨 왼쪽 위에서 마우스 모양이 들어간 화면 아이콘이 선택되어 있습니다. 마우스는 Angular 애플리케이션 UI의 할 일 엘리먼트 위에 있습니다. 해당 엘리먼트가 강조되며 옆의 툴팁에 `<TodoComponent>` 레이블이 표시됩니다.">

<!--
### Inspect Deferrable views
-->

<a id="inspect-deferrable-views"></a>

### 지연 로딩 뷰 검사하기

<!--
Alongside the directives, the directive tree also includes [`@defer` blocks](/guide/templates/defer).

<img src="assets/images/guide/devtools/defer-block.png" />

Clicking a defer block shows more details in the properties sidebar: the different optional blocks (for example `@loading`, `@placeholder`, and `@error`), the configured triggers (defer triggers, prefetch triggers, and hydrate triggers), and timing options such as the `minimum` and `after` values.
-->

디렉티브 트리에는 디렉티브와 함께 [`@defer` 블록](/guide/templates/defer)도 표시됩니다.

<img src="assets/images/guide/devtools/defer-block.png" />

defer 블록을 클릭하면 프로퍼티 사이드바에서 자세한 정보를 확인할 수 있습니다.
선택적으로 사용하는 블록(`@loading`, `@placeholder`, `@error` 등), 설정된 트리거(지연 로딩, 프리페치, 하이드레이션 트리거), `minimum`과 `after` 값 같은 시간 옵션이 표시됩니다.

<!--
### Hydration
-->

<a id="hydration"></a>

### 하이드레이션

<!--
When [hydration](/guide/hydration) is enabled on your SSR/SSG application, the directive tree shows the hydration status of each component.

In case of errors, an error message is displayed on the affected component.

<img src="assets/images/guide/devtools/hydration-status.png" />

The hydration status can also be visualized on the application itself by enabling the overlay.

<img src="assets/images/guide/devtools/hydration-overlay-ecom.png" />

Here is an illustration of the hydration overlays on a Angular e-shop example app.
-->

SSR/SSG 애플리케이션에서 [하이드레이션](/guide/hydration)을 활성화하면 디렉티브 트리에 각 컴포넌트의 하이드레이션 상태가 표시됩니다.

오류가 발생하면 해당 컴포넌트에 오류 메시지가 표시됩니다.

<img src="assets/images/guide/devtools/hydration-status.png" />

오버레이를 활성화하면 애플리케이션 화면에서도 하이드레이션 상태를 시각적으로 확인할 수 있습니다.

<img src="assets/images/guide/devtools/hydration-overlay-ecom.png" />

위 이미지는 Angular 전자상거래 예제 앱에 하이드레이션 오버레이를 표시한 모습입니다.
