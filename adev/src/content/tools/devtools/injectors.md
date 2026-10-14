<!--
# Inspect your injectors
-->

<a id="inspect-your-injectors"></a>

# 인젝터 검사하기

<!--
NOTE: The Injector Tree is available for Angular Applications built with version 17 or higher.
-->

참고: Injector Tree는 Angular 버전 17 이상으로 빌드한 애플리케이션에서 사용할 수 있습니다.

<!--
## View the injector hierarchy of your application
-->

<a id="view-the-injector-hierarchy-of-your-application"></a>

## 애플리케이션의 인젝터 계층 확인하기

<!--
The **Injector Tree** tab lets you explore the structure of the Injectors configured in your application. Here you will see two trees representing the [injector hierarchy](guide/di/hierarchical-dependency-injection) of your application. One tree is your environment hierarchy, the other is your element hierarchy.

<img src="assets/images/guide/devtools/di-injector-tree.png" alt="A screenshot of the 'Profiler' tab displaying the injector tree tab in Angular Devtools visualizing the injector graph for an example application.">
-->

**Injector Tree** 탭에서는 애플리케이션에 설정된 인젝터 구조를 살펴볼 수 있습니다.
애플리케이션의 [인젝터 계층](guide/di/hierarchical-dependency-injection)을 나타내는 두 개의 트리가 표시됩니다.
하나는 환경 계층이고 다른 하나는 엘리먼트 계층입니다.

<img src="assets/images/guide/devtools/di-injector-tree.png" alt="예제 애플리케이션의 인젝터 그래프를 시각화한 Angular DevTools 인젝터 트리 탭이 표시된 'Profiler' 탭 화면입니다.">

<!--
## Visualize resolution paths
-->

<a id="visualize-resolution-paths"></a>

## 의존성을 찾는 경로 시각화하기

<!--
When a specific injector is selected, the path that Angular's dependency injection algorithm traverses from that injector to the root is highlighted. For element injectors, this includes highlighting the environment injectors that the dependency injection algorithm jumps to when a dependency cannot be resolved in the element hierarchy.

See [resolution rules](guide/di/hierarchical-dependency-injection#resolution-rules) for more details about how Angular resolves resolution paths.

<img src="assets/images/guide/devtools/di-injector-tree-selected.png" alt="A screenshot of the 'Profiler' tab displaying how the injector tree visualize highlights resolution paths when an injector is selected.">
-->

특정 인젝터를 선택하면 Angular의 의존성 주입 알고리즘이 해당 인젝터부터 루트까지 탐색하는 경로가 강조됩니다.
엘리먼트 인젝터의 경우, 엘리먼트 계층에서 의존성을 찾지 못했을 때 의존성 주입 알고리즘이 이동하는 환경 인젝터도 함께 강조됩니다.

Angular가 의존성을 찾는 경로를 결정하는 방식은 [의존성 탐색 규칙](guide/di/hierarchical-dependency-injection#resolution-rules)을 참고하세요.

<img src="assets/images/guide/devtools/di-injector-tree-selected.png" alt="인젝터를 선택했을 때 인젝터 트리에서 의존성 탐색 경로가 강조되는 모습을 보여주는 'Profiler' 탭 화면입니다.">

<!--
## View injector providers
-->

<a id="view-injector-providers"></a>

## 인젝터의 프로바이더 확인하기

<!--
Clicking an injector that has configured providers will display those providers in a list on the right of the injector tree view. Here you can view the provided token and it's type. The button on the right of each provider allows you to log the provider in the console.

<img src="assets/images/guide/devtools/di-injector-tree-providers.png" alt="A screenshot of the 'Profiler' tab displaying how providers are made visible when an injector is selected.">
-->

프로바이더가 설정된 인젝터를 클릭하면 인젝터 트리 보기 오른쪽에 프로바이더 목록이 표시됩니다.
여기에서 제공되는 토큰과 자료형을 확인할 수 있습니다.
각 프로바이더 오른쪽의 버튼을 누르면 해당 프로바이더를 콘솔에 출력할 수 있습니다.

<img src="assets/images/guide/devtools/di-injector-tree-providers.png" alt="인젝터를 선택하면 프로바이더가 표시되는 모습을 보여주는 'Profiler' 탭 화면입니다.">
