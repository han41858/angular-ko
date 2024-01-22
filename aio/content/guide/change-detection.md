<!--
# Angular change detection and runtime optimization
-->
# Angular의 변화 감지와 실행 최적화

<!--
**Change detection** is the process through which Angular checks to see whether your application state has changed, and if any DOM needs to be updated. At a high level, Angular walks your components from top to bottom, looking for changes. Angular runs its change detection mechanism periodically so that changes to the data model are reflected in an application’s view. Change detection can be triggered either manually or through an asynchronous event (for example, a user interaction or an XMLHttpRequest completion).

Change detection is highly optimized and performant, but it can still cause slowdowns if the application runs it too frequently.

In this guide, you’ll learn how to control and optimize the change detection mechanism by skipping parts of your application and running change detection only when necessary.

Watch this video if you prefer to learn more about performance optimizations in a media format:

<div class="video-container">

<iframe allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" src="https://www.youtube.com/embed/f8sA-i6gkGQ"></iframe>

</div>
-->
애플리케이션 상태가 변경되는 것을 Angular가 검사하고 필요한 경우에는 DOM도 갱신하는 과정을 **변화 감지(Change detection)** 라고 합니다.
간단하게 설명하자면 Angular는 컴포넌트 최상단부터 아래쪽을 향하는 방향으로 변화를 감지합니다.
그리고 변화 감지 메커니즘은 정기적으로 실행되기 때문에 애플리케이션 상태에 따라 데이터 모델도 계속 변경됩니다.
이 과정은 수동으로 시작할 수 있으며, 사용자 동작이나 XMLHttpRequest와 같은 비동기 이벤트를 감지해을 때도 시작됩니다.

변화 감지 자체는 성능을 위해 높은 수준으로 최적화되어 있지만, 남발하면 오히려 애플리케이션을 느리게 만들 수 있습니다.

이 섹션에서는 변화 감지 메커니즘을 어떻게 제어하고 최적화할 수 있는지 알아봅시다.

영상이 편하다면 아래 영상도 확인해 보세요:

<div class="video-container">

<iframe allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" src="https://www.youtube.com/embed/f8sA-i6gkGQ"></iframe>

</div>

@reviewed 2022-05-04
