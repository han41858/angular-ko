<!--
# Runtime performance optimization
-->

<a id="runtime-performance-optimization"></a>

# 실행 성능 최적화

<!--
Fast rendering is critical for Angular and we've built the framework with a lot of optimizations in mind to help you develop performant apps. To better understand the performance of your app we offer [Angular DevTools](tools/devtools) and a [video guide](https://www.youtube.com/watch?v=FjyX_hkscII) on how to use Chrome DevTools for profiling. In this section we cover the most common performance optimization techniques.

**Change detection** is the process through which Angular checks to see whether your application state has changed, and if any DOM needs to be updated. At a high level, Angular walks your components from top to bottom, looking for changes. Angular runs its change detection mechanism periodically so that changes to the data model are reflected in an application’s view. Change detection can be triggered either manually or through an asynchronous event (for example, a user interaction or an XMLHttpRequest completion).

Change detection is highly optimized and performant, but it can still cause slowdowns if the application runs it too frequently.

In this guide, you’ll learn how to control and optimize the change detection mechanism by skipping parts of your application and running change detection only when necessary.

Watch this video if you prefer to learn more about performance optimizations in a media format:

<docs-video src="https://www.youtube.com/embed/f8sA-i6gkGQ"/>
-->

빠른 렌더링은 Angular의 핵심 목표이며, 성능 좋은 앱을 개발할 수 있도록 다양한 최적화를 고려해 프레임워크를 만들었습니다.
앱의 성능을 더 잘 이해할 수 있도록 [Angular DevTools](tools/devtools)와 Chrome DevTools 프로파일링 방법을 설명하는 [동영상 가이드](https://www.youtube.com/watch?v=FjyX_hkscII)를 제공합니다.
이 섹션에서는 가장 일반적인 성능 최적화 기법을 설명합니다.

**변경 감지**는 Angular가 애플리케이션 상태의 변경 여부와 DOM을 갱신해야 하는지 확인하는 과정입니다.
큰 틀에서 보면 Angular는 컴포넌트를 위에서 아래로 순회하며 변경 사항을 찾습니다.
Angular는 데이터 모델의 변경이 애플리케이션 뷰에 반영되도록 변경 감지 메커니즘을 주기적으로 실행합니다.
변경 감지는 직접 실행하거나 사용자 상호작용, XMLHttpRequest 완료 등의 비동기 이벤트로 실행할 수 있습니다.

변경 감지는 고도로 최적화되어 성능이 좋지만, 애플리케이션에서 너무 자주 실행하면 여전히 속도가 느려질 수 있습니다.

이 가이드에서는 애플리케이션의 일부를 건너뛰고 필요할 때만 변경 감지를 실행해 변경 감지 메커니즘을 제어하고 최적화하는 방법을 배웁니다.

성능 최적화에 관해 동영상으로 더 알아보고 싶다면 다음 영상을 시청하세요:

<docs-video src="https://www.youtube.com/embed/f8sA-i6gkGQ"/>
