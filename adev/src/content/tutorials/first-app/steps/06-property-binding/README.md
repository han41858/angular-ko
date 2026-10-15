<!--
# Add a property binding to a component’s template

This tutorial lesson demonstrates how to add property binding to a template and use it to pass dynamic data to components.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=AsiczpWnMz5HhJqB&amp;start=599"/>
-->

# 컴포넌트 템플릿에 프로퍼티 바인딩 추가하기

이번 실습에서는 템플릿에 프로퍼티 바인딩을 추가하고 컴포넌트에 동적 데이터를 전달하는 방법을 알아봅니다.

<docs-video src="https://www.youtube.com/embed/eM3zi_n7lNs?si=AsiczpWnMz5HhJqB&amp;start=599"/>

<!--
## What you'll learn

- Your app has data bindings in the `Home` template.
- Your app sends data from the `Home` to the `HousingLocation`.
-->

<a id="what-youll-learn"></a>

## 학습 목표

- `Home` 템플릿에 데이터 바인딩을 추가합니다.
- `Home`에서 `HousingLocation`으로 데이터를 전달합니다.

<!--
## Conceptual preview of Inputs

In this lesson, you'll continue the process of sharing data from the parent component to the child component by binding data to those properties in the template using property binding.

Property binding enables you to connect a variable to an `Input` in an Angular template. The data is then dynamically bound to the `Input`.

For a more in depth explanation, please refer to the [Property binding](/guide/templates/binding#binding-dynamic-properties-and-attributes) guide.

<docs-workflow>
-->

<a id="conceptual-preview-of-inputs"></a>

## 입력 프로퍼티 개념 살펴보기

이번 실습에서는 프로퍼티 바인딩으로 템플릿의 프로퍼티에 데이터를 연결하며 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 과정을 이어갑니다.

프로퍼티 바인딩을 사용하면 Angular 템플릿에서 변수를 입력 프로퍼티에 연결할 수 있습니다. 데이터는 입력 프로퍼티에 동적으로 바인딩됩니다.

자세한 내용은 [프로퍼티 바인딩](/guide/templates/binding#binding-dynamic-properties-and-attributes) 가이드를 참고하세요.

<docs-workflow>

<!--
<docs-step title="Update the `Home` template">
This step adds property binding to the `<app-housing-location>` tag.

In the code editor:

1.  Navigate to `src/app/home/home.ts`
1.  In the template property of the `@Component` decorator, update the code to match the code below:
    <docs-code language="angular-ts" header="Add housingLocation property binding" path="adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/home/home.ts" visibleLines="[15,17]"/>

    When adding a property binding to a component tag, we use the `[attribute] = "value"` syntax to notify Angular that the assigned value should be treated as a property from the component class and not a string value.

    The value on the right-hand side is the name of the property from the `Home`.

</docs-step>
-->

<docs-step title="`Home` 템플릿 수정하기">

<a id="update-the-home-template"></a>

이 단계에서는 `<app-housing-location>` 태그에 프로퍼티 바인딩을 추가합니다.

코드 에디터에서 다음 작업을 수행하세요:

1. `src/app/home/home.ts`를 여세요.
1. `@Component` 데코레이터의 template 프로퍼티를 다음 코드와 같이 수정하세요:
   <docs-code language="angular-ts" header="housingLocation 프로퍼티 바인딩 추가하기" path="adev/src/content/tutorials/first-app/steps/07-dynamic-template-values/src/app/home/home.ts" visibleLines="[15,17]"/>

   컴포넌트 태그에 프로퍼티 바인딩을 추가할 때는 `[attribute]="value"` 문법을 사용합니다. 이렇게 하면 Angular는 오른쪽 값을 문자열 리터럴이 아니라 컴포넌트 컨텍스트에서 평가할 표현식으로 처리합니다.

   이 예제에서 오른쪽 값은 `Home`의 프로퍼티 이름입니다.

</docs-step>

<!--
<docs-step title="Confirm the code still works">
1.  Save your changes and confirm the app does not have any errors.
1.  Correct any errors before you continue to the next step.
</docs-step>

</docs-workflow>

SUMMARY: In this lesson, you added a new property binding and passed in a reference to a class property. Now, the `HousingLocation` has access to data that it can use to customize the component's display.

For more information about the topics covered in this lesson, visit:

<docs-pill-row>
  <docs-pill href="/guide/templates/binding#binding-dynamic-properties-and-attributes" title="Property binding"/>
</docs-pill-row>
-->

<docs-step title="코드가 정상적으로 동작하는지 확인하기">

<a id="confirm-the-code-still-works"></a>

1. 변경 사항을 저장하고 앱에 에러가 없는지 확인하세요.
1. 에러가 있다면 수정한 후 다음 단계로 진행하세요.
   </docs-step>

</docs-workflow>

SUMMARY: 이번 실습에서는 프로퍼티 바인딩을 추가하고 클래스 프로퍼티를 참조하도록 했습니다. 이제 `HousingLocation`에서 전달받은 데이터를 사용해 컴포넌트 화면을 구성할 수 있습니다.

이 실습에서 다룬 내용을 더 알아보려면 다음 문서를 참고하세요:

<docs-pill-row>
  <docs-pill href="/guide/templates/binding#binding-dynamic-properties-and-attributes" title="프로퍼티 바인딩"/>
</docs-pill-row>
