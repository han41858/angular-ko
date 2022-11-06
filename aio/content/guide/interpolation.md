<!--
# Displaying values with interpolation
-->
# 문자열 바인딩(interpolation)으로 값 표시하기

<!--
## Prerequisites
-->
## 사전지식

<!--
* [Basics of components](guide/architecture-components)
* [Basics of templates](guide/glossary#template)
* [Binding syntax](guide/binding-syntax)
-->
* [컴포넌트 기본 지식](guide/architecture-components)
* [템플릿 기본 지식](guide/glossary#template)
* [바인딩 문법](guide/binding-syntax)


<!--todo: needs a level 2 heading for info below -->

<!--
Interpolation refers to embedding expressions into marked up text. By default, interpolation uses the double curly braces `{{` and `}}` as delimiters.

To illustrate how interpolation works, consider an Angular component that contains a currentCustomer variable:

<code-example path="interpolation/src/app/app.component.ts" region="customer"></code-example>

Use interpolation to display the value of this variable in the corresponding component template:

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1"></code-example>

Angular replaces currentCustomer with the string value of the corresponding component property. In this case, the value is `Maria`.

In the following example, Angular evaluates the `title` and `itemImageUrl` properties to display some title text and an image.

<code-example path="interpolation/src/app/app.component.html" region="component-property"></code-example>
-->
문자열 바인딩(interpolation)은 표현식 안에 문자열을 넣는 것을 의미합니다.
기본적으로 문자열 바인딩은 이중 중괄호(`{{`, `}}`) 를 구분자로 사용합니다.

문자열 바인딩이 동작하는 것을 확인하기 위해 Angular 컴포넌트 안에 `currentCustomer` 라는 프로퍼티가 있다고 합시다:

<code-example path="interpolation/src/app/app.component.ts" region="customer"></code-example>

이 프로퍼티 값을 템플릿에 표시하려면 이렇게 작성하면 됩니다:

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1"></code-example>

그러면 Angular가 `currentCustomer` 라는 표현식을 프로퍼티의 값으로 대체합니다.
이 예제에서는 `Maria`로 대체됩니다.

같은 방식으로 이미지의 제목과 URL을 바인딩하려면 `title` 프로퍼티와 `itemImageUrl` 프로퍼티를 이렇게 바인딩하면 됩니다:

<code-example path="interpolation/src/app/app.component.html" region="component-property"></code-example>


<!--
## What's Next
-->
## 다음 단계

<!--
* [Property binding](guide/property-binding)
* [Event binding](guide/event-binding)
-->
* [프로퍼티 바인딩](guide/property-binding)
* [이벤트 바인딩](guide/event-binding)

@reviewed 2022-04-14
