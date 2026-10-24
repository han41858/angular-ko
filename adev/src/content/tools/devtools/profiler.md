<!--
# Profile your application
-->

<a id="profile-your-application"></a>

# 애플리케이션 프로파일링하기

<!--
The **Profiler** tab lets you visualize the execution of Angular's change detection.
This is useful for determining when and how change detection impacts your application's performance.

<img src="assets/images/guide/devtools/profiler.png" alt="A screenshot of the 'Profiler' tab which reads 'Click the play button to start a new recording, or upload a json file containing profiler data.' Next to this is a record button to begin recording a new profile as well as a file picker to select an existing profile.">

The Profiler tab lets you start profiling the current application or import an existing profile from a previous run.
To start profiling your application, hover over the circle in the top-left corner within the **Profiler** tab and click **Start recording**.

During profiling, Angular DevTools captures execution events, such as change detection and lifecycle hook execution.
Interact with your application to trigger change detection and generate data Angular DevTools can use.
To finish recording, click the circle again to **Stop recording**.

You can also import an existing recording.
Read more about this feature in the [Import recording](tools/devtools/profiler#import-and-export-recordings) section.
-->

**Profiler** 탭에서는 Angular의 변경 감지 실행 과정을 시각적으로 확인할 수 있습니다.
변경 감지가 언제, 어떻게 애플리케이션 성능에 영향을 미치는지 파악할 때 유용합니다.

<img src="assets/images/guide/devtools/profiler.png" alt="'새 기록을 시작하려면 재생 버튼을 클릭하거나 프로파일러 데이터가 있는 JSON 파일을 업로드하세요'라는 안내가 표시된 'Profiler' 탭 화면입니다. 옆에는 새 프로파일 기록을 시작하는 녹화 버튼과 기존 프로파일을 선택하는 파일 선택기가 있습니다.">

Profiler 탭에서는 현재 애플리케이션의 프로파일링을 시작하거나 이전 실행에서 저장한 프로파일을 가져올 수 있습니다.
애플리케이션 프로파일링을 시작하려면 **Profiler** 탭 왼쪽 위의 원 위에 마우스를 올리고 **Start recording**을 클릭하세요.

프로파일링 중에 Angular DevTools는 변경 감지와 라이프사이클 훅 실행 같은 실행 이벤트를 수집합니다.
애플리케이션을 조작해서 변경 감지를 유발하면 Angular DevTools에서 사용할 데이터가 생성됩니다.
기록을 마치려면 원을 다시 클릭해서 **Stop recording**을 실행하세요.

기존 기록을 가져올 수도 있습니다.
자세한 내용은 [기록 가져오기](tools/devtools/profiler#import-and-export-recordings) 섹션을 참고하세요.

<!--
## Understand your application's execution
-->

<a id="understand-your-applications-execution"></a>

## 애플리케이션 실행 이해하기

<!--
After recording or importing a profile, Angular DevTools displays a visualization of change detection cycles.

<img src="assets/images/guide/devtools/default-profiler-view.png" alt="A screenshot of the 'Profiler' tab after a profile has been recorded or uploaded. It displays a bar chart illustrating various change detection cycles with some text which reads 'Select a bar to preview a particular change detection cycle'.">

Each bar in the sequence represents a change detection cycle in your app.
The taller a bar is, the longer the application spent running change detection in this cycle.
When you select a bar, DevTools displays useful information about it including:

- A bar chart with all the components and directives that it captured during this cycle
- How much time Angular spent running change detection in this cycle.
- An estimated frame rate as experienced by the user (if below 60fps)

<img src="assets/images/guide/devtools/profiler-selected-bar.png" alt="A screenshot of the 'Profiler' tab. A single bar has been selected by the user and a nearby dropdown menu displays 'Bar chart`, showing a second bar chart underneath it. The new chart has two bars which take up the majority of the space, one labeled `TodosComponent` and the other labeled `NgForOf`. The other bars are small enough to be negligible in comparison.">
-->

프로파일을 기록하거나 가져오면 Angular DevTools가 변경 감지 주기를 시각화해서 표시합니다.

<img src="assets/images/guide/devtools/default-profiler-view.png" alt="프로파일을 기록하거나 업로드한 뒤의 'Profiler' 탭 화면입니다. 여러 변경 감지 주기를 나타내는 막대 그래프와 '특정 변경 감지 주기를 미리 보려면 막대를 선택하세요'라는 안내가 표시됩니다.">

연속된 막대는 각각 앱의 변경 감지 주기 하나를 나타냅니다.
막대가 높을수록 해당 주기의 변경 감지를 실행하는 데 더 긴 시간이 걸렸다는 의미입니다.
막대를 선택하면 DevTools가 다음과 같은 유용한 정보를 표시합니다:

- 해당 주기에서 수집한 모든 컴포넌트와 디렉티브의 막대 그래프
- Angular가 해당 주기의 변경 감지를 실행하는 데 걸린 시간
- 사용자가 경험했을 것으로 추정되는 프레임 속도(60fps 미만인 경우)

<img src="assets/images/guide/devtools/profiler-selected-bar.png" alt="'Profiler' 탭 화면입니다. 사용자가 막대 하나를 선택했으며 옆의 드롭다운 메뉴에는 'Bar chart'가 표시되고 아래에 두 번째 막대 그래프가 나타납니다. 새 그래프에서는 `TodosComponent`와 `NgForOf`라는 두 막대가 대부분의 공간을 차지합니다. 다른 막대는 이에 비해 무시할 수 있을 만큼 작습니다.">

<!--
## Understand component execution
-->

<a id="understand-component-execution"></a>

## 컴포넌트 실행 이해하기

<!--
The bar chart displayed after clicking on a change detection cycle displays a detailed view about how much time your application spent running change detection in that particular component or directive.

This example shows the total time spent by the `NgForOf` directive and which method was called on it.

<img src="assets/images/guide/devtools/directive-details.png" alt="A screenshot of the 'Profiler' tab where the `NgForOf` bar is selected. A detailed view of `NgForOf` is visible to the right where it lists 'Total time spent: 1.76 ms'. It includes a with exactly one row, listing `NgForOf` as a directives with an `ngDoCheck` method which took 1.76 ms. It also includes a list labeled 'Parent Hierarchy' containing the parent components of this directive.">
-->

변경 감지 주기를 클릭하면 표시되는 막대 그래프에서는 각 컴포넌트나 디렉티브의 변경 감지를 실행하는 데 걸린 시간을 자세히 확인할 수 있습니다.

이 예제에서는 `NgForOf` 디렉티브에 소요된 전체 시간과 호출된 메서드를 보여줍니다.

<img src="assets/images/guide/devtools/directive-details.png" alt="`NgForOf` 막대가 선택된 'Profiler' 탭 화면입니다. 오른쪽의 `NgForOf` 상세 보기에 'Total time spent: 1.76 ms'가 표시됩니다. 행 하나로 된 표에는 `NgForOf` 디렉티브의 `ngDoCheck` 메서드에 1.76 ms가 걸렸다고 표시됩니다. 이 디렉티브의 부모 컴포넌트 목록인 'Parent Hierarchy'도 있습니다.">

<!--
## Hierarchical views
-->

<a id="hierarchical-views"></a>

## 계층 보기

<!--
<img src="assets/images/guide/devtools/flame-graph-view.png" alt="A screenshot of the 'Profiler' tab. A single bar has been selected by the user and a nearby dropdown menu now displays 'Flame graph', showing a flame graph underneath it. The flame graph starts with a row called 'Entire application' and another row called 'AppComponent'. Beneath those, the rows start to break up into multiple items, starting with `[RouterOutlet]` and `DemoAppComponent` on the third row. A few layers deep, one cell is highlighted red.">

You can also visualize the change detection execution in a flame graph-like view.

Each tile in the graph represents an element on the screen at a specific position in the render tree.
For example, consider a change detection cycle where a `LoggedOutUserComponent` is removed and in its place Angular rendered a `LoggedInUserComponent`. In this scenario both components will be displayed in the same tile.

The x-axis represents the full time it took to render this change detection cycle.
The y-axis represents the element hierarchy. Running change detection for an element requires rendering its directives and child components.
Together, this graph visualizes which components are taking the longest time to render and where that time is going.

Each tile is colored depending on how much time Angular spent there.
Angular DevTools determines the intensity of the color by the time spent relative to the tile where rendering took the most time.

When you click on a certain tile, you'll see details about it in the panel on the right.
Double-clicking the tile zooms it in so you can more easily view its nested children.
-->

<img src="assets/images/guide/devtools/flame-graph-view.png" alt="'Profiler' 탭 화면입니다. 사용자가 막대 하나를 선택했고 옆의 드롭다운 메뉴에 'Flame graph'가 표시되며 아래에 플레임 그래프가 나타납니다. 그래프는 'Entire application' 행과 'AppComponent' 행으로 시작합니다. 그 아래부터 행이 여러 항목으로 나뉘며 세 번째 행은 `[RouterOutlet]`과 `DemoAppComponent`로 시작합니다. 몇 단계 아래의 셀 하나가 빨간색으로 강조되어 있습니다.">

변경 감지 실행 과정을 플레임 그래프와 비슷한 형태로 시각화할 수도 있습니다.

그래프의 각 타일은 렌더링 트리의 특정 위치에 있는 화면 엘리먼트를 나타냅니다.
예를 들어 어떤 변경 감지 주기에서 `LoggedOutUserComponent`가 제거되고 Angular가 그 자리에 `LoggedInUserComponent`를 렌더링했다고 해 봅시다.
이 경우 두 컴포넌트가 같은 타일에 표시됩니다.

x축은 해당 변경 감지 주기에서 렌더링에 걸린 전체 시간을 나타냅니다.
y축은 엘리먼트 계층을 나타냅니다.
엘리먼트의 변경 감지를 실행하려면 해당 엘리먼트의 디렉티브와 자식 컴포넌트를 렌더링해야 합니다.
이 그래프를 통해 렌더링에 가장 오래 걸리는 컴포넌트와 시간이 어디에 사용되는지 확인할 수 있습니다.

각 타일의 색상은 Angular가 해당 위치에서 사용한 시간에 따라 정해집니다.
Angular DevTools는 렌더링에 가장 오래 걸린 타일과 비교해서 색상의 강도를 결정합니다.

타일을 클릭하면 오른쪽 패널에 상세 정보가 표시됩니다.
타일을 더블클릭하면 확대되므로 그 안에 중첩된 자식 항목을 더 쉽게 확인할 수 있습니다.

<!--
## Debug change detection and `OnPush` components
-->

<a id="debug-change-detection-and-onpush-components"></a>

<a id="변화-감지와-onpush-컴포넌트-디버깅하기"></a>

## 변경 감지와 `OnPush` 컴포넌트 디버깅하기

<!--
Normally, the graph visualizes the time it takes to _render_ an application, for any given change detection frame. However some components such as `OnPush` components will only re-render if their input properties change. It can be useful to visualize the flame graph without these components for particular frames.

To visualize only the components in a change detection frame that went through the change detection process, select the **Change detection** checkbox at the top, above the flame graph.

This view highlights all the components that went through change detection and displays those that did not in gray, such as `OnPush` components that did not re-render.

<img src="assets/images/guide/devtools/debugging-onpush.png" alt="A screenshot of the 'Profiler' tab displaying a flame chart visualization of a change detection cycle. A checkbox labeled 'Show only change detection' is now checked. The flame graph looks very similar to before, however the color of components has changed from orange to blue. Several tiles labeled `[RouterOutlet]` are no longer highlighted with any color.">
-->

일반적으로 그래프는 각 변경 감지 프레임에서 애플리케이션을 _렌더링_ 하는 데 걸린 시간을 시각화합니다.
하지만 `OnPush` 컴포넌트와 같은 일부 컴포넌트는 입력 프로퍼티가 변경될 때만 다시 렌더링됩니다.
특정 프레임에서는 이러한 컴포넌트를 제외하고 플레임 그래프를 확인하는 것이 유용할 수 있습니다.

변경 감지 프레임에서 실제로 변경 감지 과정을 거친 컴포넌트만 확인하려면 플레임 그래프 위쪽의 **Change detection** 체크박스를 선택하세요.

이 보기에서는 변경 감지를 거친 모든 컴포넌트를 강조하고, 다시 렌더링되지 않은 `OnPush` 컴포넌트처럼 변경 감지를 거치지 않은 컴포넌트는 회색으로 표시합니다.

<img src="assets/images/guide/devtools/debugging-onpush.png" alt="변경 감지 주기를 플레임 차트로 시각화한 'Profiler' 탭 화면입니다. 'Show only change detection' 체크박스가 선택되어 있습니다. 플레임 그래프의 형태는 이전과 거의 같지만 컴포넌트 색상이 주황색에서 파란색으로 바뀌었습니다. `[RouterOutlet]`이라는 여러 타일은 더 이상 색상으로 강조되지 않습니다.">

<!--
## Import and export recordings
-->

<a id="import-and-export-recordings"></a>

## 기록 가져오기와 내보내기

<!--
Click the **Save Profile** button at the top-right of a recorded profiling session to export it as a JSON file and save it to the disk.
Later, import the file in the initial view of the profiler by clicking the **Choose file** input.

<img src="assets/images/guide/devtools/save-profile.png" alt="A screenshot of the 'Profiler' tab displaying change detection cycles. On the right side a 'Save Profile' button is visible.">
-->

기록한 프로파일링 세션의 오른쪽 위에 있는 **Save Profile** 버튼을 클릭하면 JSON 파일로 내보내 디스크에 저장할 수 있습니다.
나중에 프로파일러의 초기 화면에서 **Choose file** 입력창을 클릭해서 해당 파일을 가져오면 됩니다.

<img src="assets/images/guide/devtools/save-profile.png" alt="변경 감지 주기가 표시된 'Profiler' 탭 화면입니다. 오른쪽에 'Save Profile' 버튼이 있습니다.">
