<!--
# DevTools Overview
-->
# DevTools 개요

<!--
Angular DevTools is a Chrome extension that provides debugging and profiling capabilities for Angular applications. Angular DevTools supports Angular v9 and above, with Ivy enabled.

<div class="video-container">
  <iframe
  src="https://www.youtube.com/embed/bavWOHZM6zE"
  frameborder="0"
  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
</div>

You can find Angular DevTools in the [Chrome Web Store](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh).

After installing Angular DevTools, you can find the extension under the Angular tab in Chrome DevTools.

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools.png" alt="devtools">
</div>

When you open the extension, you'll see two additional tabs:

- [Components](#components) - lets you explore the components and directives in your application and preview or edit their state.

- [Profiler](#profiler) - lets you profile your application and understand what the performance bottleneck is during change detection execution.

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools-tabs.png" alt="devtools tabs">
</div>

In the top-right corner of Angular DevTools you'll find which version of Angular is running on the page as well as the latest commit hash for the extension.
-->
Angular DevTools은 Angular 애플리케이션을 디버깅하거나 성능을 분석할 때 사용하는 Chrome 확장 프로그램입니다.
Angular DevTools는 Ivy 템플릿 엔진을 사용하는 Angular 9 버전 이상을 지원합니다.

<div class="video-container">
  <iframe
  src="https://www.youtube.com/embed/bavWOHZM6zE"
  frameborder="0"
  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
</div>

Angular DevTools은 [Chrome 웹 스토어](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh)에서 찾을 수 있습니다..

Angular DevTools를 설치하고 나면 Angular 개발자 도구에 탭이 추가된 것을 확인할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools.png" alt="devtools">
</div>

이 확장 프로그램을 열면 탭이 두 개 존재합니다:

- [Components](#components) - 애플리케이션에 존재하는 컴포넌트나 디렉티브의 상태를 확인하고 조작할 수 있습니다.

- [Profiler](#profiler) - 애플리케이션의 성능을 측정하고 변화 감지 싸이클이 실행되는 동안 병목구간이 어디인지 확인할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools-tabs.png" alt="devtools tabs">
</div>

Angular DevTools 오른쪽 위를 보면 현재 실행중인 Angular의 버전이 무엇인지, 마지막 커밋 해시값이 무엇인지 확인할 수 있습니다.


<!--
## Bug reports
-->
## 버그 제보

<!--
You can report issues and feature requests on [GitHub](https://github.com/rangle/angular-devtools/issues).

To report an issue with the Profiler, export the Profiler recording by clicking the **Save Profile** button, and then attaching that export as a file in the issue.

> Make sure that the Profiler recording does not contain any confidential information.
-->
오류를 발견하거나 기능을 추가하도록 요청하려면 [GitHub](https://github.com/rangle/angular-devtools/issues)를 활용하세요.

그리고 Profile과 관련된 이슈를 제보하려면 **Save Profile** 버튼을 클릭해서 현재 확인하고 있는 프로필을 저장한 후에 파일로 첨부해 주시면 더 좋습니다.

> 프로필을 저장할 때 민감한 정보가 포함되지 않도록 주의하세요.


{@a components}
<!--
## Debug your application
-->
## 애플리케이션 디버깅하기

<!--
The **Components** tab lets you explore the structure of your application. You can visualize and inspect the component and directive instances and preview or modify their state. In the next couple of sections we'll look into how you can use this tab effectively to debug your application.
-->
**Components** 탭을 확인하면 애플리케이션의 전체 구조를 확인할 수 있습니다.
이 탭에서는 컴포넌트/디렉티브 인스턴스의 상태를 직접 확인할 수 있으며, 원하는 값으로 변경할 수도 있습니다.
이 탭을 활용해서 애플리케이션을 디버깅하는 방법을 자세하게 알아봅시다.


<!--
### Explore the application structure
-->
### 애플리케이션 구조 확인하기

<!--
<div class="lightbox">
  <img src="generated/images/guide/devtools/component-explorer.png" alt="component-explorer">
</div>

In the preceding screenshot, you can see the component tree of an application.

The component tree displays a hierarchical relationship of the *components and directives* within your application. When you select a component or a directive instance, Angular DevTools presents additional information about that instance.
-->
<div class="lightbox">
  <img src="generated/images/guide/devtools/component-explorer.png" alt="component-explorer">
</div>

이 스크린샷을 보면 애플리케이션에 존재하는 컴포넌트 트리가 어떤 모양인지 확인할 수 있습니다.

컴포넌트 트리는 애플리케이션 안에 존재하는 *컴포넌트와 디렉티브* 의 관계를 표시한 것입니다.
이 화면에서 컴포넌트/디렉티브 인스턴스를 선택하면 해당 인스턴스의 정보를 자세하게 확인할 수 있습니다.


<!--
### View properties
-->
### 프로퍼티 확인하기

<!--
Click the individual components or directives in the component explorer to select them and preview their properties. Angular DevTools displays their properties and metadata on the right-hand side of the component tree.

You can navigate in the component tree using the mouse or the following keyboard shortcuts:

- Up and down arrows select the previous and next nodes.
- Left and right arrows collapse and expand a node.

To look up a component or directive by name use the search box above the component tree. To navigate to the next search match, press `Enter`. To navigate to the previous search match, press `Shift + Enter`.

<div class="lightbox">
  <img src="generated/images/guide/devtools/search.png" alt="search">
</div>
-->
컴포넌트 트리에서 컴포넌트/디렉티브 인스턴스를 클릭하면 화면 이 인스턴스에 존재하는 프로퍼티와 메타데이터가 컴포넌트 트리 오른쪽에 표시됩니다.

컴포넌트 트리 안에서는 마우스나 키보드를 이용해서 이동할 수 있습니다:

- 위/아래 화살표를 누르면 이전/다음 노드를 선택합니다.
- 왼쪽/오른쪽 화살표를 누르면 노드를 접거나/펼칩니다.

컴포넌트나 디렉티브를 이름으로 찾으려면 컴포넌트 트리 위에 있는 검색창에 이름을 입력하면 됩니다.
원하는 이름을 입력하고 `Enter`를 눌러 보세요.
이전 결과로 이동하려면 `Shift + Enter`를 누르면 됩니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/search.png" alt="search">
</div>


<!--
### Navigate to the host node
-->
### 호스트 노드로 이동하기

<!--
To go to the host element of a particular component or directive, find it in the component explorer and double-click it. Chrome DevTools opens the Elements tab and selects the associated DOM node.
-->
컴포넌트/디렉티브의 호스트 엘리먼트로 이동하려면 컴포넌트를 더블 클릭하면 됩니다.
그러면 Chrome DevTools의 Elements 탭이 열리면서 해당 DOM 노드가 선택됩니다.

<!--
### Navigate to source
-->
### 소스 코드로 이동하기

<!--
For components, Angular DevTools also lets you navigate to the component definition in the source tab. After you select a particular component, click the icon at the top-right of the properties view:

<div class="lightbox">
  <img src="generated/images/guide/devtools/navigate-source.png" alt="navigate source">
</div>
-->
Angular DevTools에서 컴포넌트를 선택하면 소스 탭으로 이동하면서 해당 컴포넌트 코드를 확인할 수 있습니다.
컴포넌트를 선택하고 프로퍼티를 확인하는 화면의 오른쪽 위에 있는 아이콘을 클릭해 보세요:

<div class="lightbox">
  <img src="generated/images/guide/devtools/navigate-source.png" alt="navigate source">
</div>


<!--
### Update property value
-->
### 프로퍼티 값 변경하기

<!--
Like Chrome DevTools, the properties view allows you to edit the value of an input, output, or another property. Right-click on the property value. If edit functionality is available for this value type, you'll see a text input. Type the new value and press `Enter`.

<div class="lightbox">
  <img src="generated/images/guide/devtools/update-property.png" alt="update property">
</div>
-->
Chrome DevTools와 비슷하게, 컴포넌트/디렉티브에 존재하는 프로퍼티는 모두 값을 변경할 수 있습니다.
프로퍼티 값을 마우스 오른쪽 버튼으로 클릭해서 수정기능이 활성화되면 값을 수정한 후에 `Enter` 키를 누르면 됩니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/update-property.png" alt="update property">
</div>


<!--
### Access selected component or directive in console
-->
### 콘솔에서 컴포넌트/디렉티브 참조하기

<!--
As a shortcut in the console, Angular DevTools provides you access to instances of the recently selected components or directives. Type `$ng0` to get a reference to the instance of the currently selected component or directive, and type `$ng1` for the previously selected instance.

<div class="lightbox">
  <img src="generated/images/guide/devtools/access-console.png" alt="access console">
</div>
-->
Angular DevTools를 설치하고 나면 현재 선택된 컴포넌트/디렉티브를 콘솔에서 직접 접근할 수 있습니다.
현재 선택된 컴포넌트/디렉티브 인스턴스는 `$ng0`로 참조할 수 있으며, 이전에 선택한 인스턴스는 `$ng`로 참조할 수 잇습니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/access-console.png" alt="access console">
</div>


<!--
### Select a directive or component
-->
### 디렉티브/컴포넌트 선택하기

<!--
Similar to Chrome DevTools, you can inspect the page to select a particular component or directive. Click the ***Inspect element*** icon at the top left corner within Devtools and hover over a DOM element on the page. Angular DevTools recognizes the associated directives and/or components and lets you select the corresponding element in the Component tree.

<div class="lightbox">
  <img src="generated/images/guide/devtools/inspect-element.png" alt="selecting dom node">
</div>
-->
Chrome DevTools와 비슷하게, UI 화면에서 특정 컴포넌트/디렉티브를 선택할 수 있습니다.
DevTools 왼쪽 위에 있는 ***Inspect element*** 아이콘을 클릭한 후에 화면에 보이는 DOM 엘리먼트를 선택해 보세요.
그러면 Angular DevTools가 해당 컴포넌트/디렉티브를 감지해서 컴포넌트 트리에서 커서 위치를 이동합니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/inspect-element.png" alt="selecting dom node">
</div>


{@a profiler}
<!--
## Profile your application
-->
## 애플리케이션 성능 분석하기

<!--
The **Profiler** tab lets you preview the execution of Angular's change detection.

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler.png" alt="profiler">
</div>

The Profiler lets you start profiling or import an existing profile. To start profiling your application, hover over the circle at the top-left corner within the **Profiler** tab and click **Start recording**.

During profiling, Angular DevTools captures execution events, such as change detection and lifecycle hook execution. To finish recording, click the circle again to **Stop recording**.

You can also import an existing recording. Read more about this feature in the [Import recording](#) section.
-->
**Profile** 탭을 활용하면 Angular 안에서 일어나는 변화 감지 싸이클을 분석할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler.png" alt="profiler">
</div>

Profile 탭에서는 새로운 성능 분석을 시작하거나 이전에 저장해 둔 프로필 파일을 불러올 수 있습니다.
애플리케이션 성능 분석을 시작하려며 **Profiler** 탭 왼쪽 위에 있는 동그라미를 눌러서 **녹화를 시작** 하면 됩니다.

성능 분석이 시작되면 Angular DevTools는 변화 감지나 라이프싸이클 후킹 함수가 실행되는 이벤트를 감지합니다.
**성능 분석을 끝내려면** 이전에 눌렀던 동그라미를 다시 클릭하면 됩니다.

이전에 저장했던 프로필 파일을 불러올 수도 있습니다.
자세한 내용은 [이 섹션](#import-recording)을 참고하세요.


<!--
### Understand your application's execution
-->
### 애플리케이션 실행 분석하기

<!--
In the following screenshot, you can find the default view of the Profiler after you complete recording.

<div class="lightbox">
  <img src="generated/images/guide/devtools/default-profiler-view.png" alt="default profiler view">
</div>

Near the top of the view you can see a sequence of bars, each one of them symbolizing change detection cycles in your app. The taller a bar is, the longer your application has spent in this cycle. When you select a bar, DevTools renders a bar chart with all the components and directives that it captured during this cycle.

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler-selected-bar.png" alt="profiler selected bar">
</div>

Above the change detection timeline, you can find how much time Angular spent in this cycle. Angular DevTools attempts to estimate the frame drop at this point to indicate when the execution of your application might impact the user experience.

Angular DevTools also indicates what triggered the change detection (that is, the change detection's source).
-->
성능 분석을 끝내고 나면 아래 스크린샷처럼 기본 화면이 표시됩니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/default-profiler-view.png" alt="default profiler view">
</div>

이 화면의 위쪽에는 막대가 순서대로 표시되는데, 이 막대는 애플리케이션에서 실행된 개별 변화 감지 싸이클을 의미합니다.
이 막대는 클수록 그 싸이클이 오랫동안 실행되었다는 것을 의미합니다.
그리고 막대 중에서 하나를 선택하면 해당 싸이클에서 컴포넌트와 디렉티브가 어떻게 실행되었는지 자세하게 확인할 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler-selected-bar.png" alt="profiler selected bar">
</div>

이 타임라인을 보면 어떤 컴포넌트가 시간을 얼마나 소비했는지 확인할 수 있습니다.
그리고 Angular DevTools가 사용자의 UX에 영향을 미칠만큼 중대한 프레임 저하가 예상되는 부분을 발견하면 해당 컴포넌트는 다르게 표시합니다.

변화 감지 싸이클이 무엇 때문에 발생했는 지도 확인할 수 있습니다.


<!--
### Understand component execution
-->
### 컴포넌트 실행 분석하기

<!--
When you click on a bar, you'll find a detailed view about how much time your application spent in the particular directive or component:

<div class="lightbox">
  <img src="generated/images/guide/devtools/directive-details.png" alt="directive details">
</div>
Figure shows the total time spent by NgforOf directive and which method was called in it. It also shows the parent hierarchy of the directive selected.
-->
막대 하나를 클릭하면 특정 디렉티브/컴포넌트가 시간을 얼마나 소비했는지 확인할 수 있습니다:

<div class="lightbox">
  <img src="generated/images/guide/devtools/directive-details.png" alt="directive details">
</div>

NgForOf 디렉티브가 얼마나 오랫동안 실행되었는지 확인해 보세요.
부모 계층의 구조도 함께 확인할 수 있습니다.


<!--
### Hierarchical views
-->
### 계층 뷰

<!--
<div class="lightbox">
  <img src="generated/images/guide/devtools/flame-graph-view.png" alt="flame graph view">
</div>

You can also preview the change detection execution in a flame graph-like view. Each tile in the graph represents an element on the screen at a specific position in the render tree.

For example, if during one change detection cycle at a specific position in the component tree we had `ComponentA`, this component was removed and in its place Angular rendered `ComponentB`, you'll see both components at the same tile.

Each tile is colored depending on how much time Angular has spent there. DevTools determines the intensity of the color by the time spent relative to the tile where we've spent the most time in change detection.

When you click on a certain tile, you'll see details about it in the panel on the right. Double-clicking the tile zooms it in so you can preview the nested children.
-->
<div class="lightbox">
  <img src="generated/images/guide/devtools/flame-graph-view.png" alt="flame graph view">
</div>

변화 감지 싸이클이 실행되는 동안 실행되는 내용은 그래프 형태로 확인할 수 있습니다.
이 그래프에서 개별 타일은 렌더링 트리의 특정 계층에 렌더링되는 엘리먼트를 의미합니다.

그래서 컴포넌트 트리에 `ComponentA`가 있었는데 이 컴포넌트가 사라지고 `ComponentB`가 같은 자리에 렌더링된다면 두 컴포넌트가 같은 타일 위치에 표시됩니다.

개별 타일의 색은 Angular가 그 컴포넌트를 처리할 때 걸린 시간에 따라 결정됩니다.
그래서 변화 감지 싸이클이 실행되는 동안 가장 많은 시간을 소비한 컴포넌트를 쉽게 확인할 수 있습니다.

이 그래프에서 타일을 선택하면 더 자세한 정보를 오른쪽 패널에서 확인할 수 있습니다.
그리고 타일을 더블 클릭하면 안쪽에 있는 자식 컴포넌트의 정보를 확인할 수 있습니다.


<!--
### Debug OnPush
-->
### OnPush 디버깅

<!--
To preview the components in which Angular did change detection, select the **Change detection** checkbox at the top, above the flame graph.

This view will color all the tiles in which Angular performed change detection in green, and the rest in gray:

<div class="lightbox">
  <img src="generated/images/guide/devtools/debugging-onpush.png" alt="debugging onpush">
</div>
-->
어떤 컴포넌트에서 변화 감지 싸이클이 시작되었는지 확인하려면 그래프 위에 있는 **Change detection** 체크박스를 활용하면 됩니다.

그러면 변화 감지 싸이클이 실행되는 컴포넌트는 파란색으로 표시되고, 나머지는 회색으로 표시됩니다:

<div class="lightbox">
  <img src="generated/images/guide/devtools/debugging-onpush.png" alt="debugging onpush">
</div>


{@a import-recording}
<!--
### Import recording
-->
### 프로필 파일 불러오기

<!--
Click the **Save Profile** button at the top-left of a recorded profiling session to export it as a JSON file and save it to the disk. Then, you can import the file in the initial view of the profiler by clicking the **Choose file** input:

<div class="lightbox">
  <img src="generated/images/guide/devtools/save-profile.png" alt="save profile">
</div>
-->
프로필 분석 화면의 오른쪽 위에 있는 **Save Profile** 버튼을 클릭하면 해당 프로필을 JSON 파일로 저장할 수 있습니다.
나중에 이 파일을 다시 불러오려면 **Choose file** 버튼을 클릭하면 됩니다:

<div class="lightbox">
  <img src="generated/images/guide/devtools/save-profile.png" alt="save profile">
</div>
