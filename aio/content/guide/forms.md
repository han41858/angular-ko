<!--
# Building a template-driven form
-->
# 템플릿 기반 폼 구성하기

{@a template-driven}

<!--
This tutorial shows you how to create a template-driven form whose control elements are bound to data properties, with input validation to maintain data integrity and styling to improve the user experience.

Template-driven forms use [two-way data binding](guide/architecture-components#data-binding "Intro to 2-way data binding") to update the data model in the component as changes are made in the template and vice versa.

<div class="alert is-helpful">

Angular supports two design approaches for interactive forms. You can build forms by writing templates using Angular [template syntax and directives](guide/glossary#template "Definition of template terms") with the form-specific directives and techniques described in this tutorial, or you can use a reactive (or model-driven) approach to build forms.

Template-driven forms are suitable for small or simple forms, while reactive forms are more scalable and suitable for complex forms.
For a comparison of the two approaches, see [Introduction to Forms](guide/forms-overview "Overview of Angular forms.")

</div>

You can build almost any kind of form with an Angular template&mdash;login forms, contact forms, and pretty much any business form.
You can lay out the controls creatively and bind them to the data in your object model.
You can specify validation rules and display validation errors,
conditionally enable or disable specific controls, trigger built-in visual feedback, and much more.

This tutorial shows you how to build a form from scratch, using a simplified sample form like the one from the [Tour of Heroes tutorial](tutorial "Tour of Heroes") to illustrate the techniques.

<div class="alert is-helpful">

  Run or download the example app: <live-example></live-example>.

</div>
-->
이 가이드 문서는 템플릿 기반 폼을 구성해서 엘리먼트에 데이터를 바인딩하고, 입력 필드에 입력된 데이터를 검사한 후에 더 나은 사용성을 위해 스타일을 지정하는 방법에 대해 설명합니다.

템플릿 기반 폼은 컴포넌트에 있는 데이터를 템플릿에 반영할 때, 템플릿에 입력한 데이터를 컴포넌트에 반영할 때 [양방향 데이터 바인딩(two-way data binding)](guide/architecture-components#data-binding "Intro to 2-way data binding")을 활용합니다.


<div class="alert is-helpful">

Angular로 폼을 만드는 방식은 두 가지 입니다.
[템플릿 문법과 디렉티브](guide/glossary#template "Definition of template terms")를 활용하면 템플릿 기반으로 폼을 구성할 수 있고, 이 문서는 이 내용을 다룹니다.
반응형(모델 기반)으로 폼을 구성하는 방식도 있습니다.

폼 구성이 간단하다면 템플릿 기반 폼을 사용하는 것도 좋지만 폼 구성이 복잡하거나 확장성을 고려한다면 반응형 폼이 유리합니다.
두 방식이 어떻게 다른지 확인하려면 [폼 소개](guide/forms-overview "Overview of Angular forms.") 문서를 참고하세요.

</div>


로그인 폼, 문의사항 폼과 같은 대부분의 폼은 Angular 템플릿만으로 구성할 수 있습니다.
폼 컨트롤을 원하는 대로 늘어놓고 데이터를 바인딩하기만 하면 됩니다.
그리고 폼 컨트롤에 유효성 검사 규칙을 추가하면 유효성 검사 결과를 화면에 표시할 수도 있고, 조건에 따라 특정 폼 컨트롤을 비활성화 할 수 있으며, 시각적인 표현을 추가하는 등 자유롭게 활용할 수 있습니다.

[히어로들의 여행 튜토리얼](tutorial "Tour of Heroes")에 있는 간단한 폼을 만들면서 이 과정을 진행해 봅시다.


<div class="alert is-helpful">

예제 앱을 직접 실행해보거나 다운받아 확인하려면 <live-example></live-example>를 참고하세요.

</div>


<!--
## Objectives
-->
## 목표

<!--
This tutorial teaches you how to do the following:

* Build an Angular form with a component and template.
* Use `ngModel` to create two-way data bindings for reading and writing input-control values.
* Provide visual feedback using special CSS classes that track the state of the controls.
* Display validation errors to users and enable or disable form controls based on the form status.
* Share information across HTML elements using [template reference variables](guide/template-reference-variables).
-->
이 문서는 이런 내용을 다룹니다:

* 컴포넌트와 템플릿을 활용해서 Angular 폼을 구성합니다.
* 입력 필드와 데이터를 양방향으로 바인딩하기 위해 `ngModel`을 사용합니다.
* 폼 컨트롤의 상태를 시각적으로 표현하기 위해 특별한 CSS 클래스를 활용해 봅니다.
* 유효성 검사 결과를 화면에 표시하며 폼 상태에 따라 특정 폼 컨트롤을 비활성화해 봅니다.
* 엘리먼트의 값을 다른 엘리먼트에서 참조하기 위해 [템플릿 참조 변수(template reference variables)](guide/template-reference-variables)를 사용해 봅니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before going further into template-driven forms, you should have a basic understanding of the following.

* [TypeScript](https://www.typescriptlang.org/ "The TypeScript language") and HTML5 programming.
* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to Angular concepts.").
* The basics of [Angular template syntax](guide/template-syntax "Template syntax guide").
* The form-design concepts that are presented in [Introduction to Forms](guide/forms-overview "Overview of Angular forms.").
-->
템플릿 기반 폼에 대해 자세하게 알아보기 전에, 이런 내용을 먼저 알아두는 것이 좋습니다.

* TypeScript, HTML5 프로그래밍
* [Angular 개요](guide/architecture "Introduction to Angular concepts.") 문서에서 설명하는 Angular 앱 설계 개념
* 기본 [Angular 템플릿 문법](guide/template-syntax "Template syntax guide")
* [폼 소개](guide/forms-overview "Overview of Angular forms.") 문서에서 설명하는 폼 디자인 컨셉


{@a intro}

<!--
## Build a template-driven form
-->
## 템플릿 기반 폼 구성하기

<!--
Template-driven forms rely on directives defined in the `FormsModule`.

* The `NgModel` directive reconciles value changes in the attached form element with changes in the data model, allowing you to respond to user input with input validation and error handling.

* The `NgForm` directive creates a top-level `FormGroup` instance and binds it to a `<form>` element to track aggregated form value and validation status.
As soon as you import `FormsModule`, this directive becomes active by default on all `<form>` tags. You don't need to add a special selector.

* The `NgModelGroup` directive creates and binds a `FormGroup` instance to a DOM element.
-->
템플릿 기반 폼은 `FormsModule`이 제공하는 디렉티브로 구성합니다.

* `NgModel` 디렉티브는 폼 엘리먼트와 데이터 모델을 연결하는 디렉티브입니다.
사용자가 입력하는 동작에 반응하거나 유효성을 검사하고 에러를 처리하는 기능을 제공합니다.

* `NgForm` 디렉티브는 최상위 `FormGroup` 인스턴스를 생성하며 `<form>` 엘리먼트를 추적하면서 폼 전체의 값과 전체 유효성 검사 결과를 관리하는 디렉티브입니다.
`FormsModule`을 로드하면 기본적으로 모든 `<form>` 태그에 이 디렉티브가 적용됩니다.
`NgForm` 디렉티브를 수동으로 지정할 필요가 없습니다.

* `NgModelGroup` 디렉티브는 `FormGroup` 인스턴스를 생성하고 DOM 엘리먼트와 연결하는 디렉티브입니다.


<!--
### The sample application
-->
### 예제 애플리케이션

<!--
The sample form in this guide is used by the *Hero Employment Agency* to maintain personal information about heroes.
Every hero needs a job. This form helps the agency match the right hero with the right crisis.

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-1.png" alt="Clean Form">
</div>

The form highlights some design features that make it easier to use. For instance, the two required fields have a green bar on the left to make them easy to spot. These fields have initial values, so the form is valid and the **Submit** button is enabled.

As you work with this form, you will learn how to include validation logic, how to customize the presentation with standard CSS, and how to handle error conditions to ensure valid input.
If the user deletes the hero name, for example, the form becomes invalid. The app detects the changed status, and displays a validation error in an attention-grabbing style.
In addition, the **Submit** button is disabled, and the "required" bar to the left of the input control changes from green to red.

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-2.png" alt="Invalid, Name Required">
</div>
-->
이 가이드문서에서 다루는 예제 폼은 *히어로 관리 회사* 에서 히어로의 개인정보를 관리하는 용도로 사용됩니다.
모든 히어로는 직업을 원합니다.
그래서 히어로에게 적절할 위기를 연결할 때 이 폼을 사용합니다.


<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-1.png" alt="Clean Form">
</div>


폼에 시각적 표현을 적용하면 사용성을 개선할 수 있습니다.
그래서 이 폼의 필수 항목 2개는 눈에 띄도록 입력 필드 왼쪽에 녹색 막대를 표시했습니다.
이 필드에는 초기값이 입력되어 있기 때문에 폼 유효성 검사도 통과하고 **Submit** 버튼도 활성화되어 있습니다.

이 폼에 유효성 검사 로직을 추가하고, 표준 CSS로 스타일을 어떻게 커스터마이징하는지, 올바른 입력값을 받기 위해 에러를 처리하는 방법에 대해 알아봅시다.
사용자가 히어로 이름을 지우면 폼이 유효하지 않은 상태가 됩니다.
애플리케이션은 이 상태 변화를 감지하고 사용자가 에러를 잘 볼 수 있도록 표시해야 합니다.
이 때 **Submit** 버튼이 비활성화되며 필수 항목을 표시하던 녹색 막대가 빨간색으로 변경될 것입니다.


<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-2.png" alt="Invalid, Name Required">
</div>


<!--
### Step overview
-->
### 진행과정 미리보기

<!--
In the course of this tutorial, you bind a sample form to data and handle user input using the following steps.

1. Build the basic form.
   * Define a sample data model.
   * Include required infrastructure such as the `FormsModule`.
2. Bind form controls to data properties using the `ngModel` directive and two-way data-binding syntax.
   * Examine how `ngModel` reports control states using CSS classes.
   * Name controls to make them accessible to `ngModel`.
3. Track input validity and control status using `ngModel`.
   * Add custom CSS to provide visual feedback on the status.
   * Show and hide validation-error messages.
4. Respond to a native HTML button-click event by adding to the model data.
5. Handle form submission using the [`ngSubmit`](api/forms/NgForm#properties) output property of the form.
   * Disable the **Submit** button until the form is valid.
   * After submit, swap out the finished form for different content on the page.
-->
가이드 문서를 진행하면서 폼에 데이터를 바인딩하고 사용자가 입력하는 내용을 단계별로 처리해 봅시다.

1. 기본 폼 구성하기
   * 데이터 모델을 정의합니다.
   * `FormsModule`과 같은 폼 관련 기능을 로드합니다.

2. `ngModel` 디렉티브를 사용해서 폼 컨트롤과 데이터 프로퍼티를 양방향으로 바인딩합니다.
   * CSS 클래스를 활용해서 `ngModel`의 상태를 확인합니다.
   * `ngModel`이 폼 컨트롤에 접근할 수 있도록 이름을 지정합니다.

3. `ngModel`을 활용해서 입력값을 추적하고 폼 컨트롤의 상태를 관리합니다.
   * 상태에 따라 다르게 표시되도록 CSS를 지정합니다.
   * 유효성을 검사하고 발생한 에러를 화면에 표시합니다.

4. 데이터를 추가하기 위해 표준 HTML 버튼 클릭 이벤트에 반응하는 로직을 추가합니다.

5. 폼에 적용된 [`ngSubmit`](api/forms/NgForm#properties)로 폼 제출 동작을 관리합니다.
   * 폼이 유효하지 않으면 **Submit** 버튼을 비활성화합니다.
   * 폼을 제출하고 나면 폼의 내용을 모두 비우고 화면에 새로운 내용을 표시합니다.


{@a step1}

<!--
## Build the form
-->
## 폼 구성하기

<!--
You can recreate the sample application from the code provided here, or you can examine or download the <live-example></live-example>.

1. The provided sample application creates the `Hero` class which defines the data model reflected in the form.

   <code-example path="forms/src/app/hero.ts" header="src/app/hero.ts"></code-example>

2. The form layout and details are defined in the `HeroFormComponent` class.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (v1)" region="v1"></code-example>

   The component's `selector` value of "app-hero-form" means you can drop this form in a parent
template using the `<app-hero-form>` tag.

3. The following code creates a new hero instance, so that the initial form can show an example hero.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="SkyDog"></code-example>

   This demo uses dummy data for `model` and `powers`. In a real app, you would inject a data service to get and save real data, or expose these properties as inputs and outputs.

4. The application enables the Forms feature and registers the created form component.

   <code-example path="forms/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

5. The form is displayed in the application layout defined by the root component's template.

   <code-example path="forms/src/app/app.component.html" header="src/app/app.component.html"></code-example>

   The initial template defines the layout for a form with two form groups and a submit button.
   The form groups correspond to two properties of the Hero data model, name and alterEgo. Each group has a label and a box for user input.

   * The **Name** `<input>` control element has the HTML5 `required` attribute.
   * The **Alter Ego** `<input>` control element does not because `alterEgo` is optional.

   The **Submit** button has some classes on it for styling.
   At this point, the form  layout is all plain HTML5, with no bindings or directives.

6. The sample form uses some style classes from [Twitter Bootstrap](https://getbootstrap.com/css/): `container`, `form-group`, `form-control`, and `btn`.
   To use these styles, the app's style sheet imports the library.

   <code-example path="forms/src/styles.1.css" header="src/styles.css"></code-example>

7. The form makes the hero applicant choose one superpower from a fixed list of agency-approved powers.
   The predefined list of `powers` is part of the data model, maintained internally in `HeroFormComponent`.
   The Angular [NgForOf directive](api/common/NgForOf "API reference") iterates over the data values to populate the `<select>` element.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (powers)" region="powers"></code-example>

If you run the app right now, you see the list of powers in the selection control. The input elements are not yet bound to data values or events, so they are still blank and have no behavior.

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-3.png" alt="Early form with no binding">
</div>
-->
이제부터는 가이드 문서에서 설명하는 코드나 <live-example></live-example>를 참고해서 애플리케이션을 수정해 봅시다.


1. 예제 애플리케이션은 폼에 반영할 데이터 모델로 `Hero` 클래스를 제공합니다.

   <code-example path="forms/src/app/hero.ts" header="src/app/hero.ts"></code-example>

2. 폼 레이아웃은 `HeroFormComponent` 클래스에 정의합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (v1)" region="v1"></code-example>

   이 컴포넌트의 `selector`는 "app-hero-form" 입니다. 부모 컴포넌트 템플릿에 `<app-hero-form>`이라는 태그가 보이면 이 컴포넌트를 의미한다고 이해하면 됩니다.

3. 아래 코드는 새로운 히어로 인스턴스를 만드는 코드입니다. 이 데이터는 폼 초기값으로 사용됩니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="SkyDog"></code-example>

   이 문서에서는 `model`이나 `powers`를 더미 데이터로 사용합니다.
   실제로 운영되는 앱이라면 실제 데이터를 활용할 것입니다.

4. 애플리케이션에 폼 기능을 추가하고, 폼 컴포넌트를 최상위 모듈에 등록합니다.

   <code-example path="forms/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

5. 최상위 컴포넌트 템플릿에 폼 컴포넌트를 추가합니다.

   <code-example path="forms/src/app/app.component.html" header="src/app/app.component.html"></code-example>

   여기까지 작성하고 나면 폼 그룹 2개와 제출 버튼으로 구성된 폼이 완성됩니다.
   각 폼 그룹은 히어로 데이터 모델 중 이름과 별명에 해당됩니다.
   개별 그룹은 라벨과 입력 필드로 구성됩니다.

   * **Name** `<input>` 엘리먼트에는 HTML5 `required` 어트리뷰트가 지정되어 있습니다.
   * **Alter Ego** `<input>` 엘리먼트에는 `required` 어트리뷰트가 지정되어 있지 않습니다. 이 필드는 옵션 항목입니다.

   **Submit** 버튼은 시각적 표현을 위해 클래스가 몇 개 지정되어 있습니다.
   여기까지 구현한 폼은 모두 HTML5 문법을 활용한 것이며 바인딩 문법이나 디렉티브는 아직 사용되지 않았습니다.

6. 예제 폼에서는 [Twitter Bootstrap](http://getbootstrap.com/css/)이 제공하는 `container`, `form-group`, `form-control`, `btn` 클래스를 활용했습니다.
이 클래스들을 활용하려면 전역 스타일 파일에 이런 내용을 추가해야 합니다.

   <code-example path="forms/src/styles.1.css" header="src/styles.css"></code-example>

7. 이 폼은 히어로 관리회사가 인증한 특수능력 중 하나를 선택하도록 구성합니다.
   이 때 활용되는 `powers`라는 목록은 데이터 모델의 일부이며 `HeroFormComponent`가 관리합니다.
   Angular가 제공하는 [NgForOf 디렉티브](api/common/NgForOf "API reference")를 활용하면 배열에 있는 항목마다 `<select>` 엘리먼트의 내부 항목을 추가할 수 있습니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (powers)" region="powers"></code-example>

이제 예제 애플리케이션을 실행해보면 `<select>` 엘리먼트에 선택할 수 있는 목록이 표시되는 것을 확인할 수 있습니다.
입력 엘리먼트는 아직 데이터나 이벤트가 반영되지 않았기 때문에 아무값도 입력되어있지 않으며, 사용자 이벤트에도 반응하지 않습니다.

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-3.png" alt="Early form with no binding">
</div>


{@a ngModel}

<!--
## Bind input controls to data properties
-->
## 입력 컨트롤과 데이터 프로퍼티 바인딩하기

<!--
The next step is to bind the input controls to the corresponding `Hero` properties with two-way data binding, so that they respond to user input by updating the data model, and also respond to programmatic changes in the data by updating the display.

The `ngModel` directive declared in the `FormsModule` lets you bind controls in your template-driven form to properties in your data model.
When you include the directive using the  syntax for two-way data binding, `[(ngModel)]`, Angular can track the value and user interaction of the control and keep the view synced with the model.

1. Edit the template file `hero-form.component.html`.

2. Find the `<input>` tag next to the **Name** label.

3. Add the `ngModel` directive, using two-way data binding syntax `[(ngModel)]="..."`.

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModelName-1"></code-example>

<div class="alert is-helpful">

This example has a temporary diagnostic interpolation after each input tag, `{{model.name}}`, to show the current data value of the corresponding property.
The note reminds you to remove the diagnostic lines when you have finished observing the two-way data binding at work.

</div>
-->
다음 단계는 입력 컨트롤과 `Hero` 프로퍼티를 양방향으로 바인딩하는 것입니다.
데이터를 양방향으로 바인딩하면 사용자가 입력한 값을 데이터 모델에 반영할 수 있으며, 동시에 프로그램 로직으로 변경한 데이터의 값을 화면에 반영할 수 있습니다.

`ngModel` 디렉티브는 `FormsModule`이 제공하는 디렉티브이며, 이 디렉티브를 활용하면 템플릿 기반 폼에서 폼 엘리먼트와 데이터 모델을 연결할 수 있습니다.
이 디렉티브를 양방향 데이터 바인딩 문법으로 `[(ngModel)]`라고 사용하면, Angular는 폼 컨트롤에서 발생하는 사용자의 동작과 폼 컨트롤의 값을 추적하며 이 값을 데이터 모델에 자동으로 반영합니다.

1. `hero-form.component.html` 템플릿 파일을 엽니다.

2. **Name** 뒤에 있는 `<input>` 태그를 찾습니다.

3. 양방향 데이터 바인딩 문법으로 `ngModel` 디렉티브를 추가합니다.

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="ngModelName-1"></code-example>


<div class="alert is-helpful">

이 예제에서는 입력 필드에 입력된 값을 확인하기 위해 `{{mode.name}}` 이라는 표현식을 임시로 사용했습니다.
양방향 데이터 바인딩이 예상대로 동작하는 것을 확인하고 나면 이 코드를 제거하는 것을 잊지 마세요.

</div>


{@a ngForm}

<!--
### Access the overall form status
-->
### 폼 전체 상태에 접근하기

<!--
When you imported the `FormsModule` in your component, Angular automatically created and attached an [NgForm](api/forms/NgForm "API reference for NgForm") directive to the `<form>` tag in the template (because `NgForm` has the selector `form` that matches `<form>` elements).

To get access to the `NgForm` and the overall form status, declare a [template reference variable](guide/template-reference-variables).

1. Edit the template file `hero-form.component.html`.

2. Update the `<form>` tag with a template reference variable, `#heroForm`, and set its value as follows.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="template-variable"></code-example>

   The `heroForm` template variable  is now a reference to the `NgForm` directive instance that governs the form as a whole.

3. Run the app.

4. Start typing in the **Name** input box.

  As you add and delete characters, you can see them appear and disappear from the data model.
  For example:

   <div class="lightbox">
     <img src="generated/images/guide/forms/ng-model-in-action.png" alt="ngModel in action">
   </div>

  The diagnostic line that shows interpolated values demonstrates that values are really flowing from the input box to the model and back again.
-->
애플리케이션에 `FormsModule`을 로드하면 템플릿에 있는 `<form>` 태그에 [NgForm](api/forms/NgForm "API reference for NgForm") 디렉티브가 자동으로 추가됩니다.
왜냐하면 `NgForm`의 셀렉터가 `form`으로 지정되어 있어서 `<form>` 엘리먼트와 매칭되기 때문입니다.

`NgForm`에 접근해서 폼 전체의 상태를 확인하려면 [템플릿 참조 변수(template reference variable)](guide/template-reference-variables)을 활용하면 됩니다.

1. 템플릿 파일 `hero-form.component.html`을 엽니다.

2. `<form>` 태그에 템플릿 참조 변수 `#heroForm`을 지정합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="template-variable"></code-example>

   이제 템플릿 변수 `heroForm`는 폼 전체를 관리하는 `NgForm` 디렉티브 인스턴스를 가리킵니다.

3. 앱을 실행해 봅시다.

4. **Name** 입력 필드에 값을 입력합니다.

  글자를 입력하거나 지우면 이 내용이 데이터 모델에 반영되는 것을 확인할 수 있습니다:

   <div class="lightbox">
     <img src="generated/images/guide/forms/ng-model-in-action.png" alt="ngModel in action">
   </div>

  문자열 바인딩으로 연결된 디버그 엘리먼트를 확인하면서 입력 필드의 값이 데이터 모델로 전달되는 것을 확인해 보세요.


<!--
### Naming control elements
-->
### 컨트롤 엘리먼트에 이름 지정하기

<!--
When you use `[(ngModel)]` on an element, you must define a `name` attribute for that element.
Angular uses the assigned name to register the element with the `NgForm` directive attached to the parent `<form>` element.

The example added a `name` attribute to the `<input>` element and set it to "name",
which makes sense for the hero's name.
Any unique value will do, but using a descriptive name is helpful.

1. Add similar `[(ngModel)]` bindings and `name` attributes to **Alter Ego** and **Hero Power**.

2. You can now remove the diagnostic messages that show interpolated values.

3. To confirm that two-way data binding works for the entire hero model, add a new binding at the top to the component's `diagnostic` property.

After these revisions, the form template should look like the following:

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModel-2"></code-example>

* Notice that each `<input>` element has an `id` property. This is used by the `<label>` element's `for` attribute to match the label to its input control. This is a [standard HTML feature](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

* Each `<input>` element also has the required `name` property that Angular uses to register the control with the form.

If you run the app now and change every hero model property, the form might display like this:

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-model-in-action-2.png" alt="ngModel in action">
</div>

The diagnostic near the top of the form confirms that all of your changes are reflected in the model.

4. When you have observed the effects, you can delete the `{{diagnostic}}` binding.
-->
엘리먼트에 `[(ngModel)]`를 지정하려면 `name` 어트리뷰트를 반드시 지정해야 합니다.
Angular는 이 때 지정한 이름으로 `NgForm` 디렉티브 인스턴스에 폼 엘리먼트를 등록합니다.

예제에서는 히어로의 이름을 입력받는 `<input>` 엘리먼트에 "name"이라는 `name` 어트리뷰트를 지정했습니다.
이름은 중복되지만 않는다면 어떤한 값을 사용해도 문제 없지만, 의미를 확실히 알 수 있도록 지정하는 것이 좋습니다.

1. **Alter Ego**, **Hero Power**를 입력받는 엘리먼트에도 `[(ngModel)]`을 바인딩하면서 `name` 어트리뷰트를 추가합니다.

2. 그리고 디버깅용 엘리먼트를 제거합니다.

3. 양방향 데이터 바인딩이 여전히 동작하는 것을 확인하기 위해 템플릿 제일 위에 `diagnostic` 프로퍼티를 문자열 바인딩으로 연결합니다.

여기까지 작업하고 나면 템플릿이 이렇게 구성됩니다:

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="ngModel-2"></code-example>

* `<input>` 델리먼트에는 `id` 프로퍼티가 존재합니다.
이 프로퍼티는 `<label>` 엘리먼트에서 `for` 어트리뷰트로 해당되는 입력 필드를 매칭시킬 때 사용합니다.
이 문법은 [표준 HTML이 제공하는 기능](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)입니다.

* `<input>` 엘리먼트에는 `name` 프로퍼티도 존재합니다.
이 프로퍼티는 폼에 폼 컨트롤 엘리먼트를 등록하기 위한 프로퍼티입니다.

이제 애플리케이션을 실행하고 히어로 모델의 값을 변경해보면 이런 화면이 될 것입니다:

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-model-in-action-2.png" alt="ngModel in action">
</div>

폼 제일 위에 있는 디버깅 엘리먼트를 보면서 수정한 값이 데이터 모델에 잘 반영되는지 확인해 보세요.

4. 데이터가 제대로 반영되고 있다면 `{{diagnostic}}` 바인딩을 제거합니다.


<!--
## Track control states
-->
## 폼 컨트롤 상태 추적하기

<!--
The `NgModel` directive on a control tracks the state of that control.
It tells you if the user touched the control, if the value changed, or if the value became invalid.
Angular sets special CSS classes on the control element to reflect the state, as shown in the following table.

<table>

  <tr>

    <th>
      State
    </th>

    <th>
      Class if true
    </th>

    <th>
      Class if false
    </th>

  </tr>

  <tr>

    <td>
      The control has been visited.
    </td>

    <td>
      <code>ng-touched</code>
    </td>

    <td>
      <code>ng-untouched</code>
    </td>

  </tr>

  <tr>

    <td>
      The control's value has changed.
    </td>

    <td>
      <code>ng-dirty</code>
    </td>

    <td>
      <code>ng-pristine</code>
    </td>

  </tr>

  <tr>

    <td>
      The control's value is valid.
    </td>

    <td>
      <code>ng-valid</code>
    </td>

    <td>
      <code>ng-invalid</code>
    </td>

  </tr>

</table>

You use these CSS classes to define the styles for your control based on its status.
-->
폼 컨트롤에 `NgModel` 디렉티브를 추가하면 이 폼 컨트롤의 상태를 추적할 수 있습니다.
사용자가 폼 컨트롤에 접근했는지, 값이 변경되었는지, 값이 유효하지 않은지 검사할 수 있습니다.
Angular는 폼 컨트롤의 상태에 따라 이 엘리먼트에 CSS 클래스를 자동으로 지정합니다.


<table>

  <tr>

    <th>
      상태
    </th>

    <th>
      참일 때 지정되는 클래스
    </th>

    <th>
      거짓일 때 지정되는 클래스
    </th>

  </tr>

  <tr>

    <td>
      사용자가 폼 컨트롤에 접근한 적이 있음
    </td>

    <td>
      <code>ng-touched</code>
    </td>

    <td>
      <code>ng-untouched</code>
    </td>

  </tr>

  <tr>

    <td>
      폼 컨트롤의 값이 변경됨
    </td>

    <td>
      <code>ng-dirty</code>
    </td>

    <td>
      <code>ng-pristine</code>
    </td>

  </tr>

  <tr>

    <td>
      폼 컨트롤의 값이 유효함
    </td>

    <td>
      <code>ng-valid</code>
    </td>

    <td>
      <code>ng-invalid</code>
    </td>

  </tr>

</table>

이 CSS 클래스에 해당하는 스타일을 정의하면, 폼 컨트롤의 상태에 따라 연동되는 시각적 표현을 추가할 수 있습니다.


<!--
### Observe control states
-->
### 폼 컨트롤 상태 확인하기

<!--
To see how the classes are added and removed by the framework, open the browser's developer tools and inspect the `<input>` element that represents the hero name.

1. Using your browser's developer tools, find the  `<input>` element that corresponds to the **Name** input box.
   You can see that the element has multiple CSS classes in addition to "form-control".

2. When you first bring it up, the classes indicate that it has a valid value, that the value has not been changed since initialization or reset, and that the control has not been visited since initialization or reset.

   ```
   <input ... class="form-control ng-untouched ng-pristine ng-valid" ...>
   ```

3. Take the following actions on the **Name** `<input>` box, and observe which classes appear.
   * Look but don't touch. The classes indicate that it is untouched, pristine, and valid.
   * Click inside the name box, then click outside it. The control has now been visited, and the element has the `ng-touched` class instead of the `ng-untouched` class.
   * Add slashes to the end of the name. It is now touched and dirty.
   * Erase the name. This makes the value invalid, so the `ng-invalid` class replaces the `ng-valid` class.
-->
Angular가 자동으로 추가하거나 제거하는 CSS 클래스를 확인하면 브라우저 개발자 도구를 열고 `<input>` 엘리먼트에 지정되는 클래스를 확인하면 됩니다.

1. 브라우저 개발자 도구를 열고 **Name** 입력에 해당하는 `<input>` 엘리먼트를 찾습니다.
폼을 구성할 때 지정했던 `form-control` 외에도 CSS 클래스가 몇개 더 지정된 것을 확인할 수 있습니다.

2. 애플리케이션을 실행한 시점에 확인해보면, 폼 컨트롤의 값이 유효하며(valid), 변경된 적이 없고(pristine), 사용자가 접근한 적이 없다는 것(untouched)을 알 수 있습니다.

   ```
   <input ... class="form-control ng-untouched ng-pristine ng-valid" ...>
   ```

3. 이제 **Name** `<input>` 필드에 이런 동작을 해보면서 엘리먼트에 지정된 클래스가 어떻게 변하는지 확인해 보세요.
   * 건드리지말고 눈으로만 보세요. 이 폼 컨트롤은 사용자가 접근한 적이 없으며(untouched), 값이 변경된 적이 없고(pristine), 값도 유효한 상태(valid)입니다.
   * 입력 필드를 클릭한 후에 입력 필드 바깥쪽을 클릭해 보세요. 이제는 사용자가 폼 컨트롤에 접근한 적이 있기 때문에 `ng-untouched` 클래스가 제거되고 `ng-touched` 클래스가 지정됩니다.
   * 이름 뒤에 슬래시(`/`)를 추가해 보세요. 이제 이 폼 컨트롤은 사용자가 접근한 적이 있고(touched), 값도 변경되었습니다(dirty).
   * 이름을 지워보세요. 그러면 유효하지 않은 값을 갖기 때문에 `ng-valid` 클래스가 제거되고 `ng-invalid` 클래스가 지정됩니다.


<!--
### Create visual feedback for states
-->
### 시각적 피드백 추가하기

<!--
The `ng-valid`/`ng-invalid` pair is particularly interesting, because you want to send a
strong visual signal when the values are invalid.
You also want to mark required fields.

You can mark required fields and invalid data at the same time with a colored bar
on the left of the input box:

<div class="lightbox">
  <img src="generated/images/guide/forms/validity-required-indicator.png" alt="Invalid Form">
</div>

To change the appearance in this way, take the following steps.

1. Add definitions for the `ng-*` CSS classes.

2. Add these class definitions to a new `forms.css` file.

3. Add the new file to the project as a sibling to `index.html`:

   <code-example path="forms/src/assets/forms.css" header="src/assets/forms.css"></code-example>

4. In the `index.html` file, update the `<head>` tag to include the new style sheet.

   <code-example path="forms/src/index.html" header="src/index.html (styles)" region="styles"></code-example>
-->
`ng-valid`/`ng-invalid` 클래스를 활용하면 폼 컨트롤에 입력된 값이 유효한지 사용자에게 빠르게 알려줄 수 있습니다.
이 때 필수 항목을 함께 표시하고 싶다고 합시다.

필수 항목인데 입력된 데이터가 유효하지 않으면 입력 필드 왼쪽에 있는 막대의 색을 변경하는 방법을 사용할 수 있습니다:

<div class="lightbox">
  <img src="generated/images/guide/forms/validity-required-indicator.png" alt="Invalid Form">
</div>

이런 기능을 구현하는 방법을 알아봅시다.

1. `ng-*` CSS 클래스에 해당하는 스타일을 정의합니다.

2. 이 CSS 스타일을 `forms.css` 파일에 작성합니다.

3. 새로 만든 스타일 파일을 `index.html` 파일이 있는 폴더에 둡니다:

   <code-example path="forms/src/assets/forms.css" header="src/assets/forms.css"></code-example>

4. `index.html` 파일의 `<head>` 태그에 스타일 시트를 추가합니다.

   <code-example path="forms/src/index.html" header="src/index.html (스타일 파일 로드하기)" region="styles"></code-example>


<!--
### Show and hide validation error messages
-->
### 에러 메시지 표시하기/감추기

<!--
The **Name** input box is required and clearing it turns the bar red.
That indicates that something is wrong, but the user doesn't know what is wrong or what to do about it.
You can provide a helpful message by checking for and responding to the control's state.

When the user deletes the name, the form should look like this:

<div class="lightbox">
  <img src="generated/images/guide/forms/name-required-error.png" alt="Name required">
</div>

The **Hero Power** select box is also required, but it doesn't need this kind of error handling because the selection box already constrains the selection to valid values.

To define and show an error message when appropriate, take the following steps.

1. Extend the `<input>` tag with a template reference variable that you can use to access the input box's Angular control from within the template. In the example, the variable is `#name="ngModel"`.

   <div class="alert is-helpful">

     The template reference variable (`#name`) is set to `"ngModel"` because that is the value of the [`NgModel.exportAs`](api/core/Directive#exportAs) property. This property tells Angular how to link a reference variable to a directive.

   </div>

2. Add a `<div>` that contains a suitable error message.
3. Show or hide the error message by binding properties of the `name`
control to the message `<div>` element's `hidden` property.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (hidden-error-msg)" region="hidden-error-msg"></code-example>

4. Add a conditional error message to the _name_ input box, as in the following example.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="name-with-error-msg"></code-example>

<div class="callout is-helpful">

<header>Illustrating the "pristine" state</header>

In this example, you hide the message when the control is either valid or *pristine*.
Pristine means the user hasn't changed the value since it was displayed in this form.
If you ignore the `pristine` state, you would hide the message only when the value is valid.
If you arrive in this component with a new (blank) hero or an invalid hero,
you'll see the error message immediately, before you've done anything.

You might want the message to display only when the user makes an invalid change.
Hiding the message while the control is in the `pristine` state achieves that goal.
You'll see the significance of this choice when you add a new hero to the form in the next step.

</div>
-->
**Name** 입력 필드는 필수 항목이기 때문에 필드에 입력된 값을 지우면 빨간 막대가 표시됩니다.
이 때 사용자는 무언가 잘못되었다는 것을 알 수 있지만, 왜 잘못되었는지, 어떻게 해결해야 하는지는 알 수 없습니다.
이런 경우에는 폼 컨트롤 상태에 따라 사용자에게 도움이 되는 메시지를 표시하는 것이 좋습니다.

사용자가 입력 필드의 값을 지우면 이렇게 표시하려고 합니다:

<div class="lightbox">
  <img src="generated/images/guide/forms/name-required-error.png" alt="Name required">
</div>

**Hero Power** 셀렉트 박스도 필수 항목이지만, 이 필드의 값은 이미 유효한 값들 중에서 하나를 선택하는 것이기 때문에 에러를 처리할 필요가 없습니다.

에러 메시지를 정의하고 상황에 맞게 표시하려면 이렇게 작업합니다.

1. `<input>` 태그에 접근하기 위해 템플릿 참조 변수를 지정합니다.
이 예제에서는 `#name="ngModel"`라고 지정했습니다.

   <div class="alert is-helpful">

     템플릿 참조 변수(`#name`)의 등호 오른쪽은 `"ngModel"`로 지정합니다.
     왜냐하면 이 템플릿 참조 변수가 [`NgModel.exportAs`](api/core/Directive#exportAs) 프로퍼티의 값을 참조해야 하기 때문입니다.
     이렇게 연결하면 템플릿 참조 변수는 디렉티브를 직접 가리킵니다.

   </div>

2. 에러 메시지를 표시하기 위해 `<div>` 엘리먼트를 추가합니다.
3. 폼 컨트롤 `name`의 프로퍼티와 `<div` 엘리먼트의 `hidden` 프로퍼티를 바인딩해서 에러 메시지를 표시하거나 감춥니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (에러 메시지와 hidden 연결하기)" region="hidden-error-msg"></code-example>

4. 상황에 맞는 에러 메시지를 추가합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="name-with-error-msg"></code-example>


<div class="callout is-helpful">

<header>pristine 상태를 확인하는 이유</header>

이 예제에서는 폼 컨트롤에 입력된 값이 유효하거나 *변경된 적이 없을 때* 에러 메시지를 표시하지 않습니다.
`pristine` 상태는 사용자가 폼 컨트롤에 접근한 적이 없다는 것을 의미합니다.
`pristine` 상태를 생략하면 폼 컨트롤에 입력된 값이 유효하지 않을 때 에러 메시지가 표시될 것입니다.
그런데 컴포넌트가 빈 데이터로 시작하거나 유효하지 않은 데이터가 있다면 사용자가 아무것도 하지 않아도 에러 메시지가 바로 표시됩니다.

에러 메시지는 사용자가 무언가를 잘못했을 때만 표시하는 것이 좋습니다.
그러려면 폼 유효성 검사 결과와 `pristine` 상태를 함께 확인해야 합니다.
다음 섹션에서 새 히어로를 추가하는 경우를 생각해보면, 왜 그런지 확실하게 알게 될 것입니다.

</div>


<!--
## Add a new hero
-->
## 히어로 추가하기

<!--
This exercise shows how you can respond to a native HTML button-click event by adding to the model data.
To let form users add a new hero, you will add a **New Hero** button that responds to a click event.

1. In the template, place a "New Hero" `<button>` element at the bottom of the form.
2. In the component file, add the hero-creation method to the hero data model.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="new-hero" header="src/app/hero-form/hero-form.component.ts (New Hero method)"></code-example>

3. Bind the button's click event to a hero-creation method, `newHero()`.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-no-reset" header="src/app/hero-form/hero-form.component.html (New Hero button)"></code-example>

4. Run the application again and click the **New Hero** button.

   The form clears, and the *required* bars to the left of the input box are red, indicating invalid `name` and `power` properties.
   Notice that the error messages are hidden. This is because the form is pristine; you haven't changed anything yet.

5. Enter a name and click **New Hero** again.

   Now the app displays a _Name is required_ error message, because the input box is no longer pristine.
   The form remembers that you entered a name before clicking **New Hero**.

6. To restore the pristine state of the form controls, clear all of the flags imperatively by calling the form's `reset()` method after calling the `newHero()` method.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-form-reset" header="src/app/hero-form/hero-form.component.html (Reset the form)"></code-example>

   Now clicking **New Hero** resets both the form and its control flags.

<div class="alert is-helpful">

See the [User Input](guide/user-input) guide for more information about listening for DOM events with an event binding and updating a corresponding component property.

</div>
-->
이번 섹션에서는 표준 HTML 버튼 클릭 이벤트에 반응해서 데이터를 추가하는 방법을 알아봅시다.
히어로를 추가하려면 **New Hero** 버튼을 추가하고 이 버튼에서 발생하는 클릭 이벤트에 반응하면 됩니다.

1. 템플릿 파일을 열고 폼 제일 아래에 "New Hero" `<button>` 엘리먼트를 추가합니다.
2. 컴포넌트 클래스 파일을 열고 히어로를 새로 만들어서 데이터 모델에 반영하는 메서드를 추가합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="new-hero" header="src/app/hero-form/hero-form.component.ts (히어로를 추가하는 메서드)"></code-example>

3. 그리고 버튼에서 발생하는 클릭 이벤트를 `newHero()` 메서드와 바인딩합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-no-reset" header="src/app/hero-form/hero-form.component.html (히어로 추가 버튼)"></code-example>

4. 애플리케이션을 다시 시작하고 **New Hero** 버튼을 클릭해 봅시다.

   그러면 폼 내용이 비워지면서 필수 입력 필드 왼쪽에 있는 막대가 빨간색으로 변경됩니다.
   이 표현은 `name` 필드와 `power` 필드에 입력된 값이 유효하지 않다는 것을 의미합니다.
   하지만 에러 메시지는 보이지 않습니다.
   왜냐하면 폼 내용이 아직 변경되지 않은 상태(pristine)이기 때문입니다.

5. 히어로의 이름을 입력하고 **New Hero** 버튼을 다시 클릭해 봅시다.

   그러면 _Name is required_ 라는 에러 메시지가 표시됩니다.
   사용자가 입력 필드의 값을 변경했기 때문입니다.
   이 폼은 사용자가 **New Hero** 버튼을 클릭하기 전에 히어로의 이름을 변경했다는 것을 기억하고 있습니다.

6. `newHero()` 메서드를 실행한 후에 폼 컨트롤을 다시 `pristine` 상태로 변경하려면 폼이 제공하는 `reset()` 메서드를 실행해서 폼에 있는 플래그 값들을 명시적으로 초기화하면 됩니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-form-reset" header="src/app/hero-form/hero-form.component.html (폼 초기화하기)"></code-example>

   이제 **New Hero** 버튼을 클릭하면 폼에 입력된 내용과 플래그 값들이 모두 초기화됩니다.


<div class="alert is-helpful">

이벤트 바인딩을 활용해서 DOM 이벤트를 감지하고 컴포넌트 프로퍼티를 변경하는 방법에 대해 자세하게 알아보려면 [사용자 입력](guide/user-input) 가이드 문서를 참고하세요.

</div>


<!--
## Submit the form with _ngSubmit_
-->
## _ngSubmit_ 으로 폼 제출하기

<!--
The user should be able to submit this form after filling it in.
The **Submit** button at the bottom of the form does nothing on its own, but it does
trigger a form-submit event because of its type (`type="submit"`).
To respond to this event, take the following steps.

1. Bind the form's [`ngSubmit`](api/forms/NgForm#properties) event property to the hero-form component's `onSubmit()` method.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (ngSubmit)" region="ngSubmit"></code-example>

2. Use the template reference variable, `#heroForm` to access the form that contains the **Submit** button and create an event binding.
You will bind the form property that indicates its overall validity to the **Submit** button's `disabled` property.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (submit-button)" region="submit-button"></code-example>

3. Run the application now. Notice that the button is enabled&mdash;although
it doesn't do anything useful yet.

4. Delete the **Name** value. This violates the "required" rule, so it displays the error message&mdash;and notice that it also disables the **Submit** button.


   You didn't have to explicitly wire the button's enabled state to the form's validity.
   The `FormsModule` did this automatically when you defined a template reference variable on the enhanced form element, then referred to that variable in the button control.
-->
사용자는 폼에 내용을 입력한 후에 제출할 수 있어야 합니다.
폼 제일 아래에 있는 **Submit** 버튼은 `type="submit"`이 지정되어 있기 때문에 폼 제출 이벤트를 발생시킵니다.
이 이벤트에 반응하려면 이렇게 작업하면 됩니다.

1. 폼에서 발생하는 [`ngSubmit`](api/forms/NgForm#properties) 이벤트 프로퍼티를 컴포넌트의 `onSubmit()` 메서드와 바인딩합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (ngSubmit)" region="ngSubmit"></code-example>

2. 템플릿 참조 변수 `#heroForm`을 활용해서 폼에 접근합니다.
폼 유효성 검사 결과에 따라 **Submit** 버튼에 `disabled` 프로퍼티를 지정할 수 있습니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (제출 버튼)" region="submit-button"></code-example>

3. 애플리케이션을 다시 시작해 보세요.
버튼은 활성화되어 있지만 이 자체로 큰 의미는 없습니다.

4. **Name** 입력 필드의 값을 지워보세요.
   그러면 "required" 규칙을 위반했기 때문에 에러메시지가 표시되고 **Submit** 버튼은 비활성화됩니다.

   폼 유효성 검사를 통과했을 때 버튼을 활성화하는 로직은 따로 필요없습니다.
   폼 엘리먼트에 템플릿 참조 변수를 지정하고 이 변수를 버튼과 연결하면, 변경사항이 있을 때마다 `FormsModule`이 이 과정을 자동으로 처리합니다.


<!--
### Respond to form submission
-->
### 폼 제출 이후

<!--
To show a response to form submission, you can hide the data entry area and display something else in its place.

1. Wrap the entire form in a `<div>` and bind
its `hidden` property to the `HeroFormComponent.submitted` property.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="edit-div"></code-example>

   * The main form is visible from the start because the `submitted` property is false until you submit the form, as this fragment from the `HeroFormComponent` shows:

      <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (submitted)" region="submitted"></code-example>

   * When you click the **Submit** button, the `submitted` flag becomes true and the form disappears.

2. To show something else while the form is in the submitted state, add the following HTML below the new `<div>` wrapper.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="submitted"></code-example>

   This `<div>`, which shows a read-only hero with interpolation bindings, appears only while the component is in the submitted state.

   The alternative display includes an *Edit* button whose click event is bound to an expression
that clears the `submitted` flag.

3. Click the *Edit* button to switch the display back to the editable form.
-->
폼을 제출하고 나면 데이터를 입력받는 필드를 모두 감추고 대신 다른 메시지를 표시할 수도 있습니다.

1. 폼 전체를 감싸는 `<div>` 엘리먼트를 추가하고 이 엘리먼트의 `hidden` 프로퍼티를 `HeroFormComponent.submitted` 프로퍼티와 바인딩합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="edit-div"></code-example>

   * 컴포넌트가 처음 시작되고 나면 `submitted` 프로퍼티의 값이 `false`이기 때문에 폼을 제출하기 전까지는 폼이 화면에 표시됩니다. `submitted` 프로퍼티 값은 `onSubmit()` 메서드에서 변경됩니다:

      <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (폼 제출 메서드)" region="submitted"></code-example>

   * 이제 사용자가 **Submit** 버튼을 클릭하면 `submitted` 플래그 값이 `true`로 변경되면서 폼이 화면에 표시되지 않습니다.

2. 폼이 제출된 후에 새로운 화면을 표시하기 위해 이런 내용을 추가합니다.

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (일부)" region="submitted"></code-example>

   이 화면은 폼을 제출한 후에 표시되며, `<div>` 안에 있는 정보는 문자열 바인딩으로 연결되어 있기 때문에 수정할 수 없습니다.

   그리고 이 화면에는 *Edit* 버튼이 있습니다.
   이 버튼을 클릭하면 `submitted` 플래그 값을 `false`로 변경합니다.

3. *Edit* 버튼을 클릭해서 수정 화면으로 돌아가 보세요.


<!--
## Summary
-->
## 정리

<!--
The Angular form discussed in this page takes advantage of the following
framework features to provide support for data modification, validation, and more.

* An Angular HTML form template.
* A form component class with a `@Component` decorator.
* Handling form submission by binding to the `NgForm.ngSubmit` event property.
* Template-reference variables such as `#heroForm` and `#name`.
* `[(ngModel)]` syntax for two-way data binding.
* The use of `name` attributes for validation and form-element change tracking.
* The reference variable’s `valid` property on input controls to check if a control is valid and show or hide error messages.
* Controlling the **Submit** button's enabled state by binding to `NgForm` validity.
* Custom CSS classes that provide visual feedback to users about invalid controls.

Here’s the code for the final version of the application:
-->
이 문서에서 다룬 Angular 폼 기능을 활용하면 데이터를 수정하고, 유효성을 검사하는 동안 프레임워크가 제공하는 기능을 활용할 수 있습니다.

* Angular 템플릿 기반 폼은 HTML로 구성할 수 있습니다.
* 폼 컴포넌트 클래스에는 `@Component` 데코레이터를 붙입니다.
* `NgForm.ngSubmit` 이벤트 프로퍼티를 바인딩하면 폼을 제출할 수 있습니다.
* `#heroForm`, `#name`과 같은 템플릿 참조 변수를 활용해 봤습니다.
* `[(ngModel)]` 이라는 문법은 양방향 데이터 바인딩을 의미합니다.
* 폼 엘리먼트에 입력된 값이 유효한지, 값이 변경되었는지 확인하려면 `name` 어트리뷰트를 활용하면 됩니다.
* 템플릿 참조 변수의 `valid` 프로퍼티를 활용하면 폼 컨트롤에 입력된 값이 유효한지 검사할 수 있고, 이 상태를 활용해서 에러 메시지를 표시하거나 감출 수 있습니다.
* `NgForm` 유효성 검사 결과에 따라 **Submit** 버튼의 비활성화 여부를 변경할 수 있습니다.
* 폼 컨트롤의 상태가 유효하지 않을 때 사용자에게 시작적 피드백을 주기 위해 커스텀 CSS 클래스를 활용할 수 있습니다.

여기까지 작업하고 나면 애플리케이션의 전체 코드는 이렇습니다:


<code-tabs>

  <code-pane header="hero-form/hero-form.component.ts" path="forms/src/app/hero-form/hero-form.component.ts" region="final">

  </code-pane>

  <code-pane header="hero-form/hero-form.component.html" path="forms/src/app/hero-form/hero-form.component.html" region="final">

  </code-pane>

  <code-pane header="hero.ts" path="forms/src/app/hero.ts">

  </code-pane>

  <code-pane header="app.module.ts" path="forms/src/app/app.module.ts">

  </code-pane>

  <code-pane header="app.component.html" path="forms/src/app/app.component.html">

  </code-pane>

  <code-pane header="app.component.ts" path="forms/src/app/app.component.ts">

  </code-pane>

  <code-pane header="main.ts" path="forms/src/main.ts">

  </code-pane>

  <code-pane header="forms.css" path="forms/src/assets/forms.css">

  </code-pane>

</code-tabs>
