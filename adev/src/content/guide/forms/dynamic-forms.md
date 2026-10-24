<!--
# Building dynamic forms
-->

<a id="building-dynamic-forms"></a>

# 동적 폼 만들기

<!--
Many forms, such as questionnaires, can be very similar to one another in format and intent.
To make it faster and easier to generate different versions of such a form, you can create a _dynamic form template_ based on metadata that describes the business object model.
Then, use the template to generate new forms automatically, according to changes in the data model.

The technique is particularly useful when you have a type of form whose content must change frequently to meet rapidly changing business and regulatory requirements.
A typical use-case is a questionnaire.
You might need to get input from users in different contexts.
The format and style of the forms a user sees should remain constant, while the actual questions you need to ask vary with the context.

In this tutorial, you will build a dynamic form that presents a basic questionnaire.
You build an online application for heroes seeking employment.
The agency is constantly tinkering with the application process, but by using the dynamic form
you can create the new forms on the fly without changing the application code.

The tutorial walks you through the following steps:

1. Enable reactive forms for a project.
1. Establish a data model to represent form controls.
1. Populate the model with sample data.
1. Develop a component to create form controls dynamically.

The form you create uses input validation and styling to improve the user experience.
It has a Submit button that is only enabled when all user input is valid, and flags invalid input with color coding and error messages.

The basic version can evolve to support a richer variety of questions, more graceful rendering, and superior user experience.
-->

설문지처럼 형식과 목적이 서로 비슷한 폼이 많습니다.
이런 폼의 여러 버전을 더 빠르고 쉽게 만들려면 비즈니스 객체 모델을 설명하는 메타데이터를 바탕으로 _동적 폼 템플릿_ 을 만들면 됩니다.
그런 다음 데이터 모델이 변경될 때마다 이 템플릿으로 새 폼을 자동으로 생성할 수 있습니다.

이 방법은 빠르게 바뀌는 업무 요구사항이나 규제에 맞춰 폼 내용을 자주 변경해야 하는 경우에 특히 유용합니다.
대표적인 사례는 설문지입니다.
상황에 따라 사용자에게 서로 다른 내용을 입력받아야 할 수 있습니다.
이때 사용자에게 보이는 폼의 형식과 스타일은 일정하게 유지하면서, 실제 질문은 상황에 맞춰 바꿀 수 있어야 합니다.

이 튜토리얼에서는 간단한 설문지를 표시하는 동적 폼을 만들어 봅니다.
일자리를 찾는 히어로를 위한 온라인 지원서를 만드는 예제입니다.
채용 기관에서는 지원 절차를 계속 수정하지만, 동적 폼을 사용하면 애플리케이션 코드를 변경하지 않고도 새 폼을 바로 만들 수 있습니다.

다음 순서로 진행합니다:

1. 프로젝트에서 반응형 폼을 사용할 수 있도록 설정합니다.
1. 폼 컨트롤을 표현하는 데이터 모델을 정의합니다.
1. 모델에 예제 데이터를 채웁니다.
1. 폼 컨트롤을 동적으로 생성하는 컴포넌트를 만듭니다.

만들 폼에는 사용자 경험을 개선하기 위해 입력 유효성 검사와 스타일을 적용합니다.
모든 입력 값이 유효할 때만 제출 버튼이 활성화되며, 유효하지 않은 입력은 색상과 오류 메시지로 표시합니다.

이 기본 구현을 확장하면 더 다양한 질문을 지원하고, 화면 표시를 다듬으며, 사용자 경험을 개선할 수 있습니다.

<!--
## Enable reactive forms for your project
-->

<a id="enable-reactive-forms-for-your-project"></a>

## 프로젝트에서 반응형 폼 사용하기

<!--
Dynamic forms are based on reactive forms.

To give the application access to reactive form directives, import `ReactiveFormsModule` from the `@angular/forms` package into the necessary components.

<docs-code-multifile>
    <docs-code header="dynamic-form.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.ts"/>
    <docs-code header="dynamic-form-question.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.ts"/>
</docs-code-multifile>
-->

동적 폼은 반응형 폼을 기반으로 합니다.

애플리케이션에서 반응형 폼 디렉티브를 사용하려면 필요한 컴포넌트에서 `@angular/forms` 패키지의 `ReactiveFormsModule`을 로드하면 됩니다.

<docs-code-multifile>
    <docs-code header="dynamic-form.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.ts"/>
    <docs-code header="dynamic-form-question.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.ts"/>
</docs-code-multifile>

<!--
## Create a form object model
-->

<a id="create-a-form-object-model"></a>

## 폼 객체 모델 만들기

<!--
A dynamic form requires an object model that can describe all scenarios needed by the form functionality.
The example hero-application form is a set of questions — that is, each control in the form must ask a question and accept an answer.

The data model for this type of form must represent a question.
The example includes the `DynamicFormQuestionComponent`, which defines a question as the fundamental object in the model.

The following `QuestionBase` is a base class for a set of controls that can represent the question and its answer in the form.

<docs-code header="question-base.ts" path="adev/src/content/examples/dynamic-form/src/app/question-base.ts"/>
-->

동적 폼에는 폼 기능에 필요한 모든 상황을 표현할 수 있는 객체 모델이 필요합니다.
히어로 지원서 예제는 질문의 모음입니다.
즉, 폼의 각 컨트롤은 질문을 하나 표시하고 답변을 받아야 합니다.

이런 폼의 데이터 모델은 질문을 표현할 수 있어야 합니다.
이 예제에는 질문을 모델의 기본 객체로 사용하는 `DynamicFormQuestionComponent`가 있습니다.

다음 `QuestionBase`는 폼에서 질문과 답변을 표현하는 컨트롤의 기본 클래스입니다.

<docs-code header="question-base.ts" path="adev/src/content/examples/dynamic-form/src/app/question-base.ts"/>

<!--
### Define control classes
-->

<a id="define-control-classes"></a>

### 컨트롤 클래스 정의하기

<!--
From this base, the example derives two new classes, `TextboxQuestion` and `DropdownQuestion`, that represent different control types.
When you create the form template in the next step, you instantiate these specific question types in order to render the appropriate controls dynamically.

The `TextboxQuestion` control type is represented in a form template using an `<input>` element. It presents a question and lets users enter input. The `type` attribute of the element is defined based on the `type` field specified in the `options` argument (for example `text`, `email`, `url`).

<docs-code header="question-textbox.ts" path="adev/src/content/examples/dynamic-form/src/app/question-textbox.ts"/>

The `DropdownQuestion` control type presents a list of choices in a select box.

 <docs-code header="question-dropdown.ts" path="adev/src/content/examples/dynamic-form/src/app/question-dropdown.ts"/>
-->

이 예제에서는 기본 클래스를 상속해서 서로 다른 컨트롤 타입을 표현하는 `TextboxQuestion`과 `DropdownQuestion` 클래스를 만듭니다.
다음 단계에서 폼 템플릿을 만들 때 각 질문 타입의 인스턴스를 생성해서 알맞은 컨트롤을 동적으로 렌더링합니다.

`TextboxQuestion` 컨트롤은 폼 템플릿에서 `<input>` 엘리먼트로 표현합니다.
질문을 표시하고 사용자가 값을 입력할 수 있도록 합니다.
엘리먼트의 `type` 어트리뷰트는 `options` 인자에 지정한 `type` 필드에 따라 정해집니다.
예를 들어 `text`, `email`, `url`을 지정할 수 있습니다.

<docs-code header="question-textbox.ts" path="adev/src/content/examples/dynamic-form/src/app/question-textbox.ts"/>

`DropdownQuestion` 컨트롤은 선택 상자에 선택지 목록을 표시합니다.

 <docs-code header="question-dropdown.ts" path="adev/src/content/examples/dynamic-form/src/app/question-dropdown.ts"/>

<!--
### Compose form groups
-->

<a id="compose-form-groups"></a>

### 폼 그룹 구성하기

<!--
A dynamic form uses a service to create grouped sets of input controls, based on the form model.
The following `QuestionControlService` collects a set of `FormGroup` instances that consume the metadata from the question model.
You can specify default values and validation rules.

<docs-code header="question-control.service.ts" path="adev/src/content/examples/dynamic-form/src/app/question-control.service.ts"/>
-->

동적 폼은 서비스를 사용해서 폼 모델에 따라 입력 컨트롤을 그룹으로 묶어 생성합니다.
다음 `QuestionControlService`는 질문 모델의 메타데이터를 사용하는 `FormGroup` 인스턴스를 구성합니다.
기본값과 유효성 검사 규칙도 지정할 수 있습니다.

<docs-code header="question-control.service.ts" path="adev/src/content/examples/dynamic-form/src/app/question-control.service.ts"/>

<!--
## Compose dynamic form contents
-->

<a id="compose-dynamic-form-contents"></a>

## 동적 폼 내용 구성하기

<!--
The dynamic form itself is represented by a container component, which you add in a later step.
Each question is represented in the form component's template by an `<app-question>` tag, which matches an instance of `DynamicFormQuestionComponent`.

The `DynamicFormQuestionComponent` is responsible for rendering the details of an individual question based on values in the data-bound question object.
The form relies on a [`[formGroup]` directive](api/forms/FormGroupDirective 'API reference') to connect the template HTML to the underlying control objects.
The `DynamicFormQuestionComponent` creates form groups and populates them with controls defined in the question model, specifying display and validation rules.

<docs-code-multifile>
  <docs-code header="dynamic-form-question.component.html" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.html"/>
  <docs-code header="dynamic-form-question.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.ts"/>
</docs-code-multifile>

The goal of the `DynamicFormQuestionComponent` is to present question types defined in your model.
You only have two types of questions at this point but you can imagine many more.
The `@switch` block in the template determines which type of question to display.
The switch uses directives with the [`formControlName`](api/forms/FormControlName 'FormControlName directive API reference') and [`formGroup`](api/forms/FormGroupDirective 'FormGroupDirective API reference') selectors.
Both directives are defined in `ReactiveFormsModule`.
-->

동적 폼 자체는 이후 단계에서 추가할 컨테이너 컴포넌트로 표현합니다.
폼 컴포넌트의 템플릿에서 각 질문은 `<app-question>` 태그로 표현하며, 이 태그는 `DynamicFormQuestionComponent` 인스턴스에 대응합니다.

`DynamicFormQuestionComponent`는 데이터 바인딩으로 전달된 질문 객체의 값에 따라 개별 질문의 세부 내용을 렌더링합니다.
폼은 [`[formGroup]` 디렉티브](api/forms/FormGroupDirective 'API 레퍼런스')를 사용해서 템플릿 HTML과 실제 컨트롤 객체를 연결합니다.
`DynamicFormQuestionComponent`는 폼 그룹을 생성하고 질문 모델에 정의된 컨트롤을 채우면서, 표시 방식과 유효성 검사 규칙을 지정합니다.

<docs-code-multifile>
  <docs-code header="dynamic-form-question.component.html" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.html"/>
  <docs-code header="dynamic-form-question.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form-question.component.ts"/>
</docs-code-multifile>

`DynamicFormQuestionComponent`의 목적은 모델에 정의된 질문 타입을 화면에 표시하는 것입니다.
지금은 질문 타입이 두 가지뿐이지만, 더 다양한 타입을 추가할 수도 있습니다.
템플릿의 `@switch` 블록은 어떤 질문 타입을 표시할지 결정합니다.
이 블록에서는 [`formControlName`](api/forms/FormControlName 'FormControlName 디렉티브 API 레퍼런스')과 [`formGroup`](api/forms/FormGroupDirective 'FormGroupDirective API 레퍼런스') 셀렉터를 사용하는 디렉티브를 활용합니다.
두 디렉티브는 모두 `ReactiveFormsModule`에 정의되어 있습니다.

<!--
### Supply data
-->

<a id="supply-data"></a>

### 데이터 제공하기

<!--
Another service is needed to supply a specific set of questions from which to build an individual form.
For this exercise you create the `QuestionService` to supply this array of questions from the hard-coded sample data.
In a real-world app, the service might fetch data from a backend system.
The key point, however, is that you control the hero job-application questions entirely through the objects returned from `QuestionService`.
To maintain the questionnaire as requirements change, you only need to add, update, and remove objects from the `questions` array.

The `QuestionService` supplies a set of questions in the form of an array bound to `input()` questions.

<docs-code header="question.service.ts" path="adev/src/content/examples/dynamic-form/src/app/question.service.ts"/>
-->

각 폼을 구성할 구체적인 질문 목록을 제공하는 서비스도 필요합니다.
이 예제에서는 코드에 직접 작성한 예제 데이터로 질문 배열을 제공하는 `QuestionService`를 만듭니다.
실제 애플리케이션에서는 이 서비스가 백엔드 시스템에서 데이터를 받아올 수도 있습니다.
중요한 점은 히어로 지원서의 질문 전체를 `QuestionService`가 반환하는 객체로 제어한다는 것입니다.
요구사항이 변경되어 설문지를 수정하려면 `questions` 배열의 객체를 추가하거나 수정하거나 제거하기만 하면 됩니다.

`QuestionService`는 `input()`으로 선언한 questions에 바인딩할 질문 배열을 제공합니다.

<docs-code header="question.service.ts" path="adev/src/content/examples/dynamic-form/src/app/question.service.ts"/>

<!--
## Create a dynamic form template
-->

<a id="create-a-dynamic-form-template"></a>

## 동적 폼 템플릿 만들기

<!--
The `DynamicFormComponent` component is the entry point and the main container for the form, which is represented using the `<app-dynamic-form>` in a template.

The `DynamicFormComponent` component presents a list of questions by binding each one to an `<app-question>` element that matches the `DynamicFormQuestionComponent`.

<docs-code-multifile>
    <docs-code header="dynamic-form.component.html" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.html"/>
    <docs-code header="dynamic-form.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.ts"/>
</docs-code-multifile>
-->

`DynamicFormComponent`는 폼의 진입점이자 최상위 컨테이너이며, 템플릿에서는 `<app-dynamic-form>`으로 표현합니다.

`DynamicFormComponent`는 각 질문을 `DynamicFormQuestionComponent`에 대응하는 `<app-question>` 엘리먼트에 바인딩해서 질문 목록을 표시합니다.

<docs-code-multifile>
    <docs-code header="dynamic-form.component.html" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.html"/>
    <docs-code header="dynamic-form.component.ts" path="adev/src/content/examples/dynamic-form/src/app/dynamic-form.component.ts"/>
</docs-code-multifile>

<!--
### Display the form
-->

<a id="display-the-form"></a>

### 폼 표시하기

<!--
To display an instance of the dynamic form, the `AppComponent` shell template passes the `questions` array returned by the `QuestionService` to the form container component, `<app-dynamic-form>`.

<docs-code header="app.component.ts" path="adev/src/content/examples/dynamic-form/src/app/app.component.ts"/>

This separation of model and data lets you repurpose the components for any type of survey, as long as it's compatible with the _question_ object model.
-->

동적 폼 인스턴스를 화면에 표시하기 위해 `AppComponent`의 최상위 템플릿에서 `QuestionService`가 반환한 `questions` 배열을 폼 컨테이너 컴포넌트인 `<app-dynamic-form>`에 전달합니다.

<docs-code header="app.component.ts" path="adev/src/content/examples/dynamic-form/src/app/app.component.ts"/>

이렇게 모델과 데이터를 분리하면 _질문_ 객체 모델과 호환되는 모든 종류의 설문에 컴포넌트를 재사용할 수 있습니다.

<!--
### Ensuring valid data
-->

<a id="ensuring-valid-data"></a>

### 데이터 유효성 보장하기

<!--
The form template uses dynamic data binding of metadata to render the form without making any hardcoded assumptions about specific questions.
It adds both control metadata and validation criteria dynamically.

To ensure valid input, the _Save_ button is disabled until the form is in a valid state.
When the form is valid, click _Save_ and the application renders the current form values as JSON.

The following figure shows the final form.

<img alt="Dynamic-Form" src="assets/images/guide/dynamic-form/dynamic-form.png">
-->

폼 템플릿은 메타데이터를 동적으로 바인딩해서 폼을 렌더링합니다.
따라서 특정 질문에 대한 가정을 코드에 고정해 둘 필요가 없습니다.
컨트롤 메타데이터와 유효성 검사 기준은 모두 동적으로 추가합니다.

유효한 값만 입력받기 위해 폼이 유효한 상태가 될 때까지 _Save_ 버튼을 비활성화합니다.
폼이 유효한 상태에서 _Save_ 버튼을 클릭하면 애플리케이션이 현재 폼 값을 JSON 형식으로 표시합니다.

완성된 폼은 다음과 같습니다.

<img alt="동적 폼" src="assets/images/guide/dynamic-form/dynamic-form.png">

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill title="Validating form input" href="guide/forms/reactive-forms#validating-form-input" />
  <docs-pill title="Form validation guide" href="guide/forms/form-validation" />
</docs-pill-row>
-->

<docs-pill-row>
  <docs-pill title="폼 입력 유효성 검사" href="guide/forms/reactive-forms#validating-form-input" />
  <docs-pill title="폼 유효성 검사 가이드" href="guide/forms/form-validation" />
</docs-pill-row>
