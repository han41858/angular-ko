<!--
# Add an input parameter to the component

This tutorial lesson demonstrates how to create a component `input` and use it to pass data to a component for customization.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=WvRGFSkW_7_zDIFD&amp;start=241"/>

NOTE: This video reflects an older syntax, but the main concepts remain valid.
-->

# 컴포넌트에 입력값 추가하기

이번 실습에서는 컴포넌트의 `input`을 만들고 데이터를 전달해 컴포넌트를 원하는 대로 표시하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=WvRGFSkW_7_zDIFD&amp;start=241"/>

NOTE: 이 동영상은 이전 문법을 사용하지만 핵심 개념은 동일합니다.

<!--
## What you'll learn

Your app's `HousingLocation` template has a `HousingLocation` property to receive input.
-->

<a id="what-youll-learn"></a>

## 학습 목표

앱의 `HousingLocation` 컴포넌트에 입력값을 받을 `housingLocation` 프로퍼티를 추가합니다.

<!--
## Conceptual preview of Inputs

[Inputs](api/core/input) allow components to specify data that can be passed to it from a parent component.

In this lesson, you'll define an `input` property in the `HousingLocation` component that enables you to customize the data displayed in the component.

Learn more in the [Accepting data with input properties](guide/components/inputs) and [Custom events with outputs](guide/components/outputs) guides.

<docs-workflow>
-->

<a id="conceptual-preview-of-inputs"></a>

## 입력 프로퍼티 개념 살펴보기

[입력 프로퍼티](api/core/input)를 사용하면 부모 컴포넌트에서 전달받을 데이터를 정의할 수 있습니다.

이번 실습에서는 `HousingLocation` 컴포넌트에 `input` 프로퍼티를 정의해 표시할 데이터를 지정합니다.

자세한 내용은 [입력 프로퍼티로 데이터 받기](guide/components/inputs)와 [출력 프로퍼티로 커스텀 이벤트 발생시키기](guide/components/outputs) 가이드를 참고하세요.

<docs-workflow>

<!--
<docs-step title="Import the input() function">
In the code editor, import the `input` helper method from `@angular/core` and the `HousingLocationInfo` interface from `../housinglocation` into the `HousingLocation` component.

<docs-code header="Import input and HousingLocationInfo in housing-location.ts" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/housing-location.ts" visibleLines="[1,2]"/>

</docs-step>
-->

<docs-step title="input() 함수 불러오기">

<a id="import-the-input-function"></a>

코드 에디터에서 `HousingLocation` 컴포넌트에 `@angular/core`의 `input` 함수와 `../housinglocation`의 `HousingLocationInfo` 인터페이스를 불러오세요.

<docs-code header="housing-location.ts에서 input과 HousingLocationInfo 불러오기" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/housing-location.ts" visibleLines="[1,2]"/>

</docs-step>

<!--
<docs-step title="Add the Input property">
Add a required property called `housingLocation` and initialize it using `input.required()` with the type `HousingLocationInfo`.

  <docs-code header="Declare the input property in housing-location.ts" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/housing-location.ts" visibleLines="[10]"/>

You have to invoke the `required` method on `input` to indicate that the parent component must provide a value. In our example application, we know this value will always be passed in — this is by design. The `.required()` call ensures that the TypeScript compiler enforces this and treats the property as non-nullable when this component is used in a template.

</docs-step>
-->

<docs-step title="입력 프로퍼티 추가하기">

<a id="add-the-input-property"></a>

`housingLocation`이라는 필수 입력 프로퍼티를 추가하고 `HousingLocationInfo` 타입을 지정한 `input.required()`로 초기화하세요.

  <docs-code header="housing-location.ts에 입력 프로퍼티 선언하기" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/housing-location/housing-location.ts" visibleLines="[10]"/>

부모 컴포넌트가 반드시 값을 전달하도록 하려면 `input`의 `required` 메서드를 호출해야 합니다. 예제 앱은 이 값을 항상 전달하도록 설계했습니다. `.required()`를 호출하면 TypeScript 컴파일러가 템플릿에서 이 컴포넌트를 사용할 때 필수 입력값을 검사하며, 해당 프로퍼티의 값에 `null`이 포함되지 않는 것으로 취급합니다.

</docs-step>

<!--
<docs-step title="Pass data to the input">
Send the `housingLocation` value from the `Home` component to the `housingLocation` property of the HousingLocation component.

<docs-code language="angular-ts" header="Declare the input property for HousingLocation in home.ts" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/home/home.ts" visibleLines="[16]"/>

</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you created a new `input` property. You also used the `.required` method to ensure the signal value is always defined.

<docs-pill-row>
  <docs-pill href="guide/components/inputs" title="Accepting data with input properties"/>
  <docs-pill href="guide/components/outputs" title="Custom events with outputs"/>
</docs-pill-row>
-->

<docs-step title="입력 프로퍼티에 데이터 전달하기">

<a id="pass-data-to-the-input"></a>

`Home` 컴포넌트의 `housingLocation` 값을 `HousingLocation` 컴포넌트의 `housingLocation` 프로퍼티로 전달하세요.

<docs-code language="angular-ts" header="home.ts에서 HousingLocation의 입력 프로퍼티에 값 전달하기" path="adev/src/content/tutorials/first-app/steps/06-property-binding/src/app/home/home.ts" visibleLines="[16]"/>

</docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 새 `input` 프로퍼티를 만들었습니다. 또한 `.required()` 메서드로 시그널에 반드시 값이 제공되도록 했습니다.

<docs-pill-row>
  <docs-pill href="guide/components/inputs" title="입력 프로퍼티로 데이터 받기"/>
  <docs-pill href="guide/components/outputs" title="출력 프로퍼티로 커스텀 이벤트 발생시키기"/>
</docs-pill-row>
