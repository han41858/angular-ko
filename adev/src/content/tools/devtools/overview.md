<!--
# DevTools Overview
-->

<a id="devtools-overview"></a>

# DevTools

<!--
Angular DevTools is a browser extension that provides debugging and profiling capabilities for Angular applications.

<docs-video src="https://www.youtube.com/embed/bavWOHZM6zE"/>

Install Angular DevTools from the [Chrome Web Store](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh) or from [Firefox Addons](https://addons.mozilla.org/firefox/addon/angular-devtools/).

You can open Chrome or Firefox DevTools on any web page by pressing <kbd>F12</kbd> or <kbd><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></kbd> (Windows or Linux) and <kbd><kbd>Fn</kbd>+<kbd>F12</kbd></kbd> or <kbd><kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd></kbd> (Mac).
Once browser DevTools is open and Angular DevTools is installed, you can find it under the "Angular" tab.

HELPFUL: Chrome's new tab page does not run installed extensions, so the Angular tab will not appear in DevTools. Visit any other page to see it.

<img src="assets/images/guide/devtools/devtools.png" alt="An overview of Angular DevTools showing a tree of components for an application.">
-->

Angular DevTools는 Angular 애플리케이션의 디버깅과 프로파일링 기능을 제공하는 브라우저 확장 프로그램입니다.

<docs-video src="https://www.youtube.com/embed/bavWOHZM6zE"/>

[Chrome 웹 스토어](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh)나 [Firefox 부가 기능](https://addons.mozilla.org/firefox/addon/angular-devtools/)에서 Angular DevTools를 설치하세요.

웹페이지에서 Windows나 Linux는 <kbd>F12</kbd> 또는 <kbd><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></kbd>를 누르고, Mac은 <kbd><kbd>Fn</kbd>+<kbd>F12</kbd></kbd> 또는 <kbd><kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd></kbd>를 누르면 Chrome이나 Firefox DevTools를 열 수 있습니다.
Angular DevTools가 설치되어 있으면 브라우저 DevTools의 "Angular" 탭에서 사용할 수 있습니다.

도움말: Chrome의 새 탭 페이지에서는 설치된 확장 프로그램이 실행되지 않으므로 DevTools에 Angular 탭이 표시되지 않습니다.
다른 페이지를 방문하면 확인할 수 있습니다.

<img src="assets/images/guide/devtools/devtools.png" alt="애플리케이션의 컴포넌트 트리가 표시된 Angular DevTools 전체 화면입니다.">

<!--
## Open your application
-->

<a id="open-your-application"></a>

## 애플리케이션 열기

<!--
When you open the extension, you'll see four additional tabs:

| Tabs                                      | Details                                                                                                                |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [Components](tools/devtools/component)    | Lets you explore the components and directives in your application and preview or edit their state.                    |
| [Profiler](tools/devtools/profiler)       | Lets you profile your application and understand what the performance bottleneck is during change detection execution. |
| [Injector Tree](tools/devtools/injectors) | Lets you visualize the Environment and Element Injector hierarchy                                                      |
| [Router Tree](tools/devtools/router)      | Lets you visualize the routing tree of your application.                                                               |

Other tabs like `Transfer State` are experimental and can be enabled via the devtools settings and are not documented yet.

HELPFUL: For users of Chromium based browsers, you might be interested in the [Performance panel integration](/best-practices/profiling-with-chrome-devtools).

<img src="assets/images/guide/devtools/devtools-tabs.png" alt="A screenshot of the top of Angular DevTools illustrating two tabs in the upper-left corner, one labeled 'Components' and another labeled 'Profiler'.">

In the top-right corner of Angular DevTools you'll find the information button which open a popover.
The information popover contains among others what version of Angular is running on the page as well as the devtools version.
-->

확장 프로그램을 열면 다음 네 개의 탭이 표시됩니다:

| 탭                                        | 설명                                                                                            |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------- |
| [Components](tools/devtools/component)    | 애플리케이션의 컴포넌트와 디렉티브를 살펴보고 상태를 미리 보거나 수정할 수 있습니다.            |
| [Profiler](tools/devtools/profiler)       | 애플리케이션을 프로파일링하고 변화 감지 실행 중 성능 병목이 발생하는 지점을 파악할 수 있습니다. |
| [Injector Tree](tools/devtools/injectors) | 환경 인젝터와 엘리먼트 인젝터의 계층을 시각적으로 확인할 수 있습니다.                           |
| [Router Tree](tools/devtools/router)      | 애플리케이션의 라우팅 트리를 시각적으로 확인할 수 있습니다.                                     |

`Transfer State` 등의 다른 탭은 실험 단계이며, DevTools 설정에서 활성화할 수 있지만 아직 문서화되지 않았습니다.

도움말: Chromium 기반 브라우저 사용자라면 [Performance 패널 통합 기능](/best-practices/profiling-with-chrome-devtools)도 참고해 보세요.

<img src="assets/images/guide/devtools/devtools-tabs.png" alt="왼쪽 위에 'Components'와 'Profiler' 탭이 표시된 Angular DevTools 상단 화면입니다.">

Angular DevTools 오른쪽 위에 있는 정보 버튼을 누르면 팝오버가 열립니다.
정보 팝오버에서는 페이지에서 실행 중인 Angular 버전과 DevTools 버전 등 여러 정보를 확인할 수 있습니다.

<!--
### Angular application not detected
-->

<a id="angular-application-not-detected"></a>

### Angular 애플리케이션을 감지하지 못한 경우

<!--
If you see an error message "Angular application not detected" when opening Angular DevTools, this means it is not able to communicate with an Angular app on the page.
The most common reason for this is because the web page you are inspecting does not contain an Angular application.
Double check that you are inspecting the right web page and that the Angular app is running.
-->

Angular DevTools를 열 때 "Angular application not detected" 오류 메시지가 표시되면 페이지의 Angular 앱과 통신할 수 없다는 의미입니다.
검사 중인 웹페이지에 Angular 애플리케이션이 없는 경우가 가장 흔한 원인입니다.
올바른 웹페이지를 검사하고 있는지, Angular 앱이 실행 중인지 다시 확인하세요.

<!--
### We detected an application built with production configuration
-->

<a id="we-detected-an-application-built-with-production-configuration"></a>

### 프로덕션 설정으로 빌드된 애플리케이션을 감지한 경우

<!--
If you see an error message "We detected an application built with production configuration. Angular DevTools only supports development builds.", this means that an Angular application was found on the page, but it was compiled with production optimizations.
When compiling for production, Angular CLI removes various debug features to minimize the amount of the JavaScript on the page to improve performance. This includes features needed to communicate with DevTools.

To run DevTools, you need to compile your application with optimizations disabled. `ng serve` does this by default.
If you need to debug a deployed application, disable optimizations in your build with the [`optimization` configuration option](reference/configs/workspace-config#optimization-configuration) (`{"optimization": false}`).
-->

"We detected an application built with production configuration.
Angular DevTools only supports development builds."
오류 메시지가 표시되면 페이지에서 Angular 애플리케이션을 찾았지만 프로덕션 최적화를 적용해서 컴파일했다는 의미입니다.
Angular CLI는 프로덕션용으로 컴파일할 때 페이지의 JavaScript 크기를 줄여 성능을 개선하기 위해 여러 디버깅 기능을 제거합니다.
여기에는 DevTools와 통신하는 데 필요한 기능도 포함됩니다.

DevTools를 실행하려면 최적화를 비활성화한 상태로 애플리케이션을 컴파일해야 합니다.
`ng serve`는 기본적으로 이렇게 동작합니다.
배포된 애플리케이션을 디버깅해야 한다면 [`optimization` 설정 옵션](reference/configs/workspace-config#optimization-configuration)으로 빌드 최적화를 비활성화하세요(`{"optimization": false}`).
