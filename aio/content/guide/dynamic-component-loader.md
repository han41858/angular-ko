<!--
# Dynamic component loader
-->
# 동적 컴포넌트 로더

<!--
Component templates are not always fixed.
An application might need to load new components at runtime.
This cookbook shows you how to add components dynamically.

See the <live-example name="dynamic-component-loader"></live-example> of the code in this cookbook.
-->
컴포넌트의 템플릿이 항상 애플리케이션 실행 전에 로드되어야만 하는 것은 아닙니다.
컴포넌트 템플릿은 애플리케이션이 실행되는 중에도 불러올 수 있습니다.
이 문서는 컴포넌트를 동적으로 생성하는 방법을 안내합니다.

이 문서에서 다루는 예제는 <live-example name="dynamic-component-loader"></live-example>에서 실행하거나 다운받아 확인할 수 있습니다.


<a id="dynamic-loading"></a>

<!--
## Rendering components dynamically
-->
## 컴포넌트를 동적으로 렌더링하기

<!--
The following example shows how to build a dynamic ad banner.

The hero agency is planning an ad campaign with several different ads cycling through the banner.
New ad components are added frequently by several different teams.
This makes it impractical to use a template with a static component structure.

Instead, you need a way to load a new component without a fixed reference to the component in the ad banner's template.

The `NgComponentOutlet` directive can be used to instantiate components and insert them into the current view. This directive allows you to provide a component class that should be rendered, as well as component inputs to be used during initialization.

<code-example header="src/app/ad-banner.component.ts" path="dynamic-component-loader/src/app/ad-banner.component.ts" region="component"></code-example>

The `AdBannerComponent` class injects the `AdService` service and requests a list of ads. 
The "current ad" index is set to `0` initially to indicate that the first ad should be displayed. 
When a user clicks the "Next" button, the index is increased by one. 
Once the index reaches the length of the ads array, the index is reset back to `0`.

In the template, the `currentAd` getter is used to retrieve a current ad. 
If the value changes, Angular picks it up and reflects the changes in the UI.
-->
컴포넌트를 동적 로딩하는 예제를 살펴 봅시다.

히어로 주식회사는 배너가 돌아가는 광고 캠페인을 계획하고 있습니다.
그리고 이 배너에는 서로 다른 몇개 팀들이 자주 광고 컴포넌트를 추가합니다.
이런 경우라면 컴포넌트를 정적으로 구성하는 방식은 별로 효율적이지 않습니다.

그렇다면 광고 배너의 템플릿에 컴포넌트를 고정하지 않고, 새로운 컴포넌트를 동적으로 로딩하는 방식이 더 효율적입니다.

`NgComponentOutlet` 디렉티브는 컴포넌트의 인스턴스를 생성하고 화면에 넣는 역할을 합니다.
이 디렉티브를 활용하면 화면에 렌더링 될 컴포넌트 클래스를 지정할 수 있으며, 컴포넌트를 생성할 때 필요한 항목들도 지정할 수 있습니다.

<code-example header="src/app/ad-banner.component.ts" path="dynamic-component-loader/src/app/ad-banner.component.ts" region="component"></code-example>

`AdBannerComponent` 클래스는 광고 목록을 요청하기 위해 `AdService` 서비스를 의존성으로 주입받습니다.
그리고 "current ad" 인덱스의 초기값은 화면에 표시될 광고의 인덱스로 `0`을 지정합니다.
사용자가 "Next" 버튼을 클릭하면 인덱스 값이 하나씩 증가합니다.
그리고 이 인덱스 값이 배열의 길이만큼 증가하면 인덱스를 다시 `0` 값으로 설정합니다.

템플릿에서 `currentAd` 게터는 현재 표시될 광고를 받아오는 용도로 사용됩니다.
컴포넌트에 있는 인덱스 값이 변경되면 Angular가 감지하고 화면에 반영합니다.


<!--
## Different components from the service
-->
## 서비스에서 받아온 컴포넌트와 다를 때

<!--
Components returned from the `AdService` service and used in `NgComponentOutlet` in the `AdBannerComponent` template can be different. 
Angular detects if a component class has changed and updates the UI accordingly.

Here are two sample components and the service providing them with their inputs:
-->
`AdService` 서비스가 반환하는 컴포넌트 목록과 `AdBannerComponent` 템플릿 안에 있는 `NgComponentOutlet`이 다를 수 있습니다.
Angular는 컴포넌트 클래스가 변경되는 것을 감지하면 이에 ㅁ자게 화면을 갱신합니다.

예제 컴포넌트 2개와 서비스가 어떻게 구성되는지 확인해 보세요:

<code-tabs>
    <code-pane header="hero-job-ad.component.ts" path="dynamic-component-loader/src/app/hero-job-ad.component.ts"></code-pane>
    <code-pane header="hero-profile.component.ts" path="dynamic-component-loader/src/app/hero-profile.component.ts"></code-pane>
    <code-pane header="ad.service.ts" path="dynamic-component-loader/src/app/ad.service.ts"></code-pane>
</code-tabs>


<a id="final-ad-baner"></a>

<!--
## Final ad banner
-->
## 최종 결과

<!--
The final ad banner looks like this:
-->
우리가 구현한 광고 배너의 최종 결과물은 다음과 같습니다:

<div class="lightbox">

<img alt="Ads" src="generated/images/guide/dynamic-component-loader/ads-example.gif">

</div>

<!--
See the <live-example name="dynamic-component-loader"></live-example>.
-->
예제를 직접 실행하거나 다운로드 받으려면 <live-example name="dynamic-component-loader"></live-example>를 확인해 보세요.

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-04-18
