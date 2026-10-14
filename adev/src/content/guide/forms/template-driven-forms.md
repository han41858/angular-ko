<!--
# Building a template-driven form
-->

<a id="building-a-template-driven-form"></a>

# 템플릿 기반 폼 만들기

<!--
This tutorial shows you how to create a template-driven form. The control elements in the form are bound to data properties that have input validation. The input validation helps maintain data integrity and styling to improve the user experience.

Template-driven forms use [two-way data binding](guide/templates/two-way-binding) to update the data model in the component as changes are made in the template and vice versa.

<docs-callout helpful title="Template vs Reactive forms">
Angular supports two design approaches for interactive forms. Template-driven forms allow you to use form-specific directives in your Angular template. Reactive forms provide a model-driven approach to building forms.

Template-driven forms are a great choice for small or simple forms, while reactive forms are more scalable and suitable for complex forms. For a comparison of the two approaches, see [Choosing an approach](guide/forms#choosing-an-approach)
</docs-callout>

You can build almost any kind of form with an Angular template — login forms, contact forms, and pretty much any business form.
You can lay out the controls creatively and bind them to the data in your object model.
You can specify validation rules and display validation errors, conditionally allow input from specific controls, trigger built-in visual feedback, and much more.
-->

이 튜토리얼에서는 템플릿 기반 폼을 만드는 방법을 알아봅니다.
폼에 있는 컨트롤 엘리먼트는 입력값의 유효성을 검사하는 데이터 프로퍼티와 바인딩됩니다.
입력값의 유효성을 검사하면 데이터 무결성을 유지할 수 있으며, 검사 결과에 따라 스타일을 적용해서 사용자 경험을 개선할 수 있습니다.

템플릿 기반 폼은 [양방향 데이터 바인딩](guide/templates/two-way-binding)을 사용합니다.
템플릿에서 값이 변경되면 컴포넌트의 데이터 모델에 반영되고, 데이터 모델에서 값이 변경되면 템플릿에 반영됩니다.

<docs-callout helpful title="템플릿 기반 폼과 반응형 폼">
Angular는 사용자 입력을 처리하는 폼을 두 가지 방식으로 지원합니다.
템플릿 기반 폼은 Angular 템플릿에 폼 전용 디렉티브를 사용합니다.
반응형 폼은 모델을 중심으로 폼을 구성합니다.

템플릿 기반 폼은 작거나 간단한 폼을 만들 때 좋습니다.
반응형 폼은 확장하기 쉬워서 복잡한 폼에 적합합니다.
두 방식을 비교하려면 [폼 종류 선택하기](guide/forms#choosing-an-approach) 문서를 참고하세요.
</docs-callout>

Angular 템플릿으로 로그인 폼, 연락처 입력 폼, 업무용 폼 등 거의 모든 종류의 폼을 만들 수 있습니다.
컨트롤을 원하는 대로 배치하고 객체 모델의 데이터와 바인딩하면 됩니다.
유효성 검사 규칙을 지정하고 에러를 표시할 수 있으며, 특정 컨트롤의 입력을 조건에 따라 허용하거나 기본으로 제공되는 시각적 피드백을 표시하는 등 다양한 기능을 사용할 수 있습니다.

<!--
## Objectives
-->

<a id="objectives"></a>

## 목표

<!--
This tutorial teaches you how to do the following:

- Build an Angular form with a component and template
- Use `ngModel` to create two-way data bindings for reading and writing input-control values
- Provide visual feedback using special CSS classes that track the state of the controls
- Display validation errors to users and conditionally allow input from form controls based on the form status
- Share information across HTML elements using [template reference variables](guide/templates/variables#template-reference-variables)
-->

이 튜토리얼에서는 다음 내용을 알아봅니다.

- 컴포넌트와 템플릿으로 Angular 폼 만들기
- `ngModel`을 사용해서 입력 컨트롤의 값을 읽고 쓰는 양방향 데이터 바인딩 구성하기
- 컨트롤 상태를 추적하는 CSS 클래스로 시각적 피드백 제공하기
- 사용자에게 유효성 검사 에러를 표시하고, 폼 상태에 따라 컨트롤 입력을 허용하기
- [템플릿 참조 변수](guide/templates/variables#template-reference-variables)로 HTML 엘리먼트 사이에서 정보 공유하기

<!--
## Build a template-driven form
-->

<a id="build-a-template-driven-form"></a>

## 템플릿 기반 폼 구성하기

<!--
Template-driven forms rely on directives defined in the `FormsModule`.

| Directives     | Details                                                                                                                                                                                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NgModel`      | Reconciles value changes in the attached form element with changes in the data model, allowing you to respond to user input with input validation and error handling.                                                                                                           |
| `NgForm`       | Creates a top-level `FormGroup` instance and binds it to a `<form>` element to track aggregated form value and validation status. As soon as you import `FormsModule`, this directive becomes active by default on all `<form>` tags. You don't need to add a special selector. |
| `NgModelGroup` | Creates and binds a `FormGroup` instance to a DOM element.                                                                                                                                                                                                                      |
-->

템플릿 기반 폼은 `FormsModule`에 정의된 디렉티브를 사용합니다.

| 디렉티브       | 설명                                                                                                                                                                                                                                    |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NgModel`      | 폼 엘리먼트에서 변경된 값과 데이터 모델에서 변경된 값을 동기화합니다. 이를 활용해서 사용자 입력의 유효성을 검사하고 에러를 처리할 수 있습니다.                                                                                          |
| `NgForm`       | 최상위 `FormGroup` 인스턴스를 생성하고 `<form>` 엘리먼트에 바인딩해서 폼 전체의 값과 유효성 상태를 추적합니다. `FormsModule`을 로드하면 모든 `<form>` 태그에 이 디렉티브가 기본으로 적용되므로, 별도의 셀렉터를 추가할 필요가 없습니다. |
| `NgModelGroup` | `FormGroup` 인스턴스를 생성하고 DOM 엘리먼트에 바인딩합니다.                                                                                                                                                                            |

<!--
### Step overview
-->

<a id="step-overview"></a>

### 진행 순서

<!--
In the course of this tutorial, you bind a sample form to data and handle user input using the following steps.

1. Build the basic form.
   - Define a sample data model
   - Include required infrastructure such as the `FormsModule`
1. Bind form controls to data properties using the `ngModel` directive and two-way data-binding syntax.
   - Examine how `ngModel` reports control states using CSS classes
   - Name controls to make them accessible to `ngModel`
1. Track input validity and control status using `ngModel`.
   - Add custom CSS to provide visual feedback on the status
   - Show and hide validation-error messages
1. Respond to a native HTML button-click event by adding to the model data.
1. Handle form submission using the [`ngSubmit`](api/forms/NgForm#ngSubmit) output property of the form.
   - Disable the **Submit** button until the form is valid
   - After submit, swap out the finished form for different content on the page
-->

이 튜토리얼에서는 다음 순서로 예제 폼을 데이터와 바인딩하고 사용자 입력을 처리합니다.

1. 기본 폼을 만듭니다.
   - 예제 데이터 모델을 정의합니다.
   - `FormsModule` 등 필요한 구성 요소를 추가합니다.
1. `ngModel` 디렉티브와 양방향 데이터 바인딩 문법으로 폼 컨트롤을 데이터 프로퍼티에 바인딩합니다.
   - `ngModel`이 CSS 클래스로 컨트롤 상태를 표시하는 방식을 확인합니다.
   - `ngModel`이 컨트롤에 접근할 수 있도록 이름을 지정합니다.
1. `ngModel`로 입력값의 유효성과 컨트롤 상태를 추적합니다.
   - 커스텀 CSS를 추가해서 상태에 따른 시각적 피드백을 제공합니다.
   - 유효성 검사 에러 메시지를 표시하거나 숨깁니다.
1. 표준 HTML 버튼의 클릭 이벤트에 반응해서 모델 데이터를 추가합니다.
1. 폼의 [`ngSubmit`](api/forms/NgForm#ngSubmit) 출력 프로퍼티로 폼 제출을 처리합니다.
   - 폼이 유효해질 때까지 **Submit** 버튼을 비활성화합니다.
   - 폼을 제출하면 입력이 끝난 폼 대신 다른 내용을 페이지에 표시합니다.

<!--
## Build the form
-->

<a id="build-the-form"></a>

## 폼 만들기

<!--
<!- TODO: link to preview ->
<!- <docs-code live/> ->

1. The provided sample application creates the `Actor` class which defines the data model reflected in the form.

   <docs-code header="actor.ts" language="typescript" path="adev/src/content/examples/forms/src/app/actor.ts"/>

1. The form layout and details are defined in the `ActorFormComponent` class.

   <docs-code header="actor-form.component.ts (v1)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="v1"/>

   The component's `selector` value of "app-actor-form" means you can drop this form in a parent template using the `<app-actor-form>` tag.

1. The following code creates a new actor instance, so that the initial form can show an example actor.

   <docs-code language="typescript" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" language="typescript" region="Marilyn"/>

   This demo uses dummy data for `model` and `skills`.
   In a real app, you would inject a data service to get and save real data, or expose these properties as inputs and outputs.

1. The component enables the Forms feature by importing the `FormsModule` module.

   <docs-code language="typescript" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" language="typescript" region="imports"/>

1. The form is displayed in the application layout defined by the root component's template.

   <docs-code header="app.component.html" language="html" path="adev/src/content/examples/forms/src/app/app.component.html"/>

   The initial template defines the layout for a form with two form groups and a submit button.
   The form groups correspond to two properties of the Actor data model, name and studio.
   Each group has a label and a box for user input.
   - The **Name** `<input>` control element has the HTML5 `required` attribute
   - The **Studio** `<input>` control element does not because `studio` is optional

   The **Submit** button has some classes on it for styling.
   At this point, the form layout is all plain HTML5, with no bindings or directives.

1. The sample form uses some style classes from [Twitter Bootstrap](https://getbootstrap.com/css): `container`, `form-group`, `form-control`, and `btn`.
   To use these styles, the application's style sheet imports the library.

   <docs-code header="styles.css" path="adev/src/content/examples/forms/src/styles.1.css"/>

1. The form requires that an actor's skill is chosen from a predefined list of `skills` maintained internally in `ActorFormComponent`.
   The Angular `@for` loop iterates over the data values to populate the `<select>` element.

   <docs-code header="actor-form.component.html (skills)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="skills"/>

If you run the application right now, you see the list of skills in the selection control.
The input elements are not yet bound to data values or events, so they are still blank and have no behavior.
-->

<!-- TODO: link to preview -->
<!-- <docs-code live/> -->

1. 예제 애플리케이션은 폼에 반영할 데이터 모델을 `Actor` 클래스로 정의합니다.

   <docs-code header="actor.ts" language="typescript" path="adev/src/content/examples/forms/src/app/actor.ts"/>

1. 폼의 레이아웃과 세부 내용은 `ActorFormComponent` 클래스에 정의합니다.

   <docs-code header="actor-form.component.ts (v1)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="v1"/>

   컴포넌트의 `selector` 값이 "app-actor-form"이므로, 부모 템플릿에서 `<app-actor-form>` 태그로 이 폼을 사용할 수 있습니다.

1. 아래 코드는 처음 표시되는 폼에 배우 예제를 보여주기 위해 배우 인스턴스를 생성합니다.

   <docs-code language="typescript" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" language="typescript" region="Marilyn"/>

   이 예제에서는 `model`과 `skills`에 가상 데이터를 사용합니다.
   실제 애플리케이션에서는 데이터 서비스를 주입해서 실제 데이터를 가져오고 저장하거나, 이 프로퍼티를 입력과 출력으로 공개하면 됩니다.

1. 컴포넌트에서 `FormsModule` 모듈을 로드하면 폼 기능이 활성화됩니다.

   <docs-code language="typescript" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" language="typescript" region="imports"/>

1. 폼은 최상위 컴포넌트 템플릿에 정의된 애플리케이션 레이아웃에 표시됩니다.

   <docs-code header="app.component.html" language="html" path="adev/src/content/examples/forms/src/app/app.component.html"/>

   초기 템플릿은 폼 그룹 두 개와 제출 버튼이 있는 폼 레이아웃을 정의합니다.
   두 폼 그룹은 Actor 데이터 모델의 name, studio 프로퍼티에 각각 대응합니다.
   각 그룹에는 레이블과 사용자 입력 필드가 있습니다.
   - **Name** `<input>` 컨트롤 엘리먼트에는 HTML5 `required` 어트리뷰트가 있습니다.
   - **Studio** `<input>` 컨트롤 엘리먼트에는 없습니다.
     `studio`는 선택 사항이기 때문입니다.

   **Submit** 버튼에는 스타일을 적용하는 클래스가 몇 개 있습니다.
   아직까지 폼 레이아웃은 바인딩이나 디렉티브 없이 HTML5로만 구성되어 있습니다.

1. 예제 폼은 [Twitter Bootstrap](https://getbootstrap.com/css)의 `container`, `form-group`, `form-control`, `btn` 스타일 클래스를 사용합니다.
   이 스타일을 사용하기 위해 애플리케이션 스타일시트에서 라이브러리를 로드합니다.

   <docs-code header="styles.css" path="adev/src/content/examples/forms/src/styles.1.css"/>

1. 폼에서는 `ActorFormComponent` 내부의 `skills` 목록에 미리 정의된 항목 중에서 배우의 특기를 선택해야 합니다.
   Angular `@for` 반복문으로 데이터 값을 순회해서 `<select>` 엘리먼트를 구성합니다.

   <docs-code header="actor-form.component.html (특기)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="skills"/>

지금 애플리케이션을 실행하면 선택 컨트롤에 특기 목록이 표시됩니다.
입력 엘리먼트는 아직 데이터 값이나 이벤트와 바인딩되지 않았기 때문에 비어 있으며, 아무 동작도 하지 않습니다.

<!--
## Bind input controls to data properties
-->

<a id="bind-input-controls-to-data-properties"></a>

## 입력 컨트롤을 데이터 프로퍼티에 바인딩하기

<!--
The next step is to bind the input controls to the corresponding `Actor` properties with two-way data binding, so that they respond to user input by updating the data model, and also respond to programmatic changes in the data by updating the display.

The `ngModel` directive declared in the `FormsModule` lets you bind controls in your template-driven form to properties in your data model.
When you include the directive using the syntax for two-way data binding, `[(ngModel)]`, Angular can track the value and user interaction of the control and keep the view synced with the model.

1. Edit the template file `actor-form.component.html`.
1. Find the `<input>` tag next to the **Name** label.
1. Add the `ngModel` directive, using two-way data binding syntax `[(ngModel)]="..."`.

<docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngModelName-1"/>

HELPFUL: This example has a temporary diagnostic interpolation after each input tag, `{{model.name}}`, to show the current data value of the corresponding property. The comment reminds you to remove the diagnostic lines when you have finished observing the two-way data binding at work.
-->

다음으로 입력 컨트롤을 해당하는 `Actor` 프로퍼티와 양방향 데이터 바인딩합니다.
그러면 사용자 입력이 데이터 모델에 반영되고, 프로그램에서 데이터를 변경하면 화면에도 반영됩니다.

`FormsModule`에 선언된 `ngModel` 디렉티브로 템플릿 기반 폼의 컨트롤을 데이터 모델의 프로퍼티에 바인딩할 수 있습니다.
양방향 데이터 바인딩 문법인 `[(ngModel)]`로 디렉티브를 적용하면, Angular가 컨트롤의 값과 사용자 상호작용을 추적하고 뷰와 모델을 동기화합니다.

1. 템플릿 파일 `actor-form.component.html`을 엽니다.
1. **Name** 레이블 옆의 `<input>` 태그를 찾습니다.
1. 양방향 데이터 바인딩 문법 `[(ngModel)]="..."`으로 `ngModel` 디렉티브를 추가합니다.

<docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngModelName-1"/>

참고: 이 예제에서는 각 입력 태그 뒤에 확인용 문자열 바인딩 `{{model.name}}`을 임시로 추가해서 해당 프로퍼티의 현재 값을 표시합니다.
주석에 적힌 대로 양방향 데이터 바인딩의 동작을 확인한 후에는 이 확인용 코드를 삭제하세요.

<!--
### Access the overall form status
-->

<a id="access-the-overall-form-status"></a>

### 폼 전체 상태에 접근하기

<!--
When you imported the `FormsModule` in your component, Angular automatically created and attached an [NgForm](api/forms/NgForm) directive to the `<form>` tag in the template (because `NgForm` has the selector `form` that matches `<form>` elements).

To get access to the `NgForm` and the overall form status, declare a [template reference variable](guide/templates/variables#template-reference-variables).

1. Edit the template file `actor-form.component.html`.
1. Update the `<form>` tag with a template reference variable, `#actorForm`, and set its value as follows.

   <docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="template-variable"/>

   The `actorForm` template variable is now a reference to the `NgForm` directive instance that governs the form as a whole.

1. Run the app.
1. Start typing in the **Name** input box.

   As you add and delete characters, you can see them appear and disappear from the data model.

The diagnostic line that shows interpolated values demonstrates that values are really flowing from the input box to the model and back again.
-->

컴포넌트에서 `FormsModule`을 로드하면 Angular가 템플릿의 `<form>` 태그에 [NgForm](api/forms/NgForm) 디렉티브를 자동으로 생성해서 적용합니다.
`NgForm`의 셀렉터가 `<form>` 엘리먼트와 일치하는 `form`이기 때문입니다.

`NgForm`과 폼 전체 상태에 접근하려면 [템플릿 참조 변수](guide/templates/variables#template-reference-variables)를 선언하세요.

1. 템플릿 파일 `actor-form.component.html`을 엽니다.
1. `<form>` 태그에 템플릿 참조 변수 `#actorForm`을 추가하고, 아래와 같이 값을 지정합니다.

   <docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="template-variable"/>

   이제 `actorForm` 템플릿 변수는 폼 전체를 관리하는 `NgForm` 디렉티브 인스턴스를 참조합니다.

1. 애플리케이션을 실행합니다.
1. **Name** 입력 필드에 값을 입력합니다.

   글자를 입력하거나 삭제하면 데이터 모델에도 글자가 추가되거나 삭제되는 것을 확인할 수 있습니다.

문자열 바인딩으로 값을 표시하는 확인용 코드를 통해 입력 필드의 값이 모델로 전달되고, 다시 화면에 표시되는 것을 확인할 수 있습니다.

<!--
### Naming control elements
-->

<a id="naming-control-elements"></a>

### 컨트롤 엘리먼트에 이름 지정하기

<!--
When you use `[(ngModel)]` on an element, you must define a `name` attribute for that element.
Angular uses the assigned name to register the element with the `NgForm` directive attached to the parent `<form>` element.

The example added a `name` attribute to the `<input>` element and set it to "name", which makes sense for the actor's name.
Any unique value will do, but using a descriptive name is helpful.

1. Add similar `[(ngModel)]` bindings and `name` attributes to **Studio** and **Skill**.
1. You can now remove the diagnostic messages that show interpolated values.
1. To confirm that two-way data binding works for the entire actor model, add a new text binding with the [`json`](api/common/JsonPipe) pipe at the top to the component's template, which serializes the data to a string.

After these revisions, the form template should look like the following:

<docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngModel-2"/>

You'll notice that:

- Each `<input>` element has an `id` property.
  This is used by the `<label>` element's `for` attribute to match the label to its input control.
  This is a [standard HTML feature](https://developer.mozilla.org/docs/Web/HTML/Element/label).

- Each `<input>` element also has the required `name` property that Angular uses to register the control with the form.

When you have observed the effects, you can delete the `{{ model | json }}` text binding.
-->

엘리먼트에 `[(ngModel)]`을 사용하려면 해당 엘리먼트에 `name` 어트리뷰트를 정의해야 합니다.
Angular는 이 이름으로 부모 `<form>` 엘리먼트에 적용된 `NgForm` 디렉티브에 엘리먼트를 등록합니다.

예제에서는 `<input>` 엘리먼트에 `name` 어트리뷰트를 추가하고 배우의 이름을 의미하는 "name"으로 지정했습니다.
고유한 값이면 무엇이든 사용할 수 있지만, 의미를 알기 쉬운 이름이 좋습니다.

1. **Studio**와 **Skill**에도 같은 방식으로 `[(ngModel)]` 바인딩과 `name` 어트리뷰트를 추가합니다.
1. 문자열 바인딩으로 값을 표시하던 확인용 메시지는 이제 삭제해도 됩니다.
1. 배우 모델 전체에 양방향 데이터 바인딩이 동작하는지 확인하기 위해 컴포넌트 템플릿 맨 위에 [`json`](api/common/JsonPipe) 파이프를 사용하는 문자열 바인딩을 추가합니다.
   이 파이프는 데이터를 문자열로 직렬화합니다.

수정한 폼 템플릿은 다음과 같습니다.

<docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngModel-2"/>

다음 내용을 확인해 보세요.

- 각 `<input>` 엘리먼트에는 `id` 프로퍼티가 있습니다.
  `<label>` 엘리먼트의 `for` 어트리뷰트는 이 값을 사용해서 레이블과 입력 컨트롤을 연결합니다.
  이는 [표준 HTML 기능](https://developer.mozilla.org/docs/Web/HTML/Element/label)입니다.

- 각 `<input>` 엘리먼트에는 필수인 `name` 프로퍼티도 있습니다.
  Angular는 이 값을 사용해서 컨트롤을 폼에 등록합니다.

동작을 확인한 후에는 `{{ model | json }}` 문자열 바인딩을 삭제해도 됩니다.

<!--
## Track form states
-->

<a id="track-form-states"></a>

## 폼 상태 추적하기

<!--
Angular applies the `ng-submitted` class to `form` elements after the form has been submitted. This class can be used to change the form's style after it has been submitted.
-->

Angular는 폼이 제출되면 `form` 엘리먼트에 `ng-submitted` 클래스를 적용합니다.
이 클래스를 사용해서 제출한 폼의 스타일을 변경할 수 있습니다.

<!--
## Track control states
-->

<a id="track-control-states"></a>

## 컨트롤 상태 추적하기

<!--
Adding the `NgModel` directive to a control adds class names to the control that describe its state.
These classes can be used to change a control's style based on its state.

The following table describes the class names that Angular applies based on the control's state.

| States                           | Class if true | Class if false |
| :------------------------------- | :------------ | :------------- |
| The control has been visited.    | `ng-touched`  | `ng-untouched` |
| The control's value has changed. | `ng-dirty`    | `ng-pristine`  |
| The control's value is valid.    | `ng-valid`    | `ng-invalid`   |

Angular also applies the `ng-submitted` class to `form` elements upon submission, but not to the controls inside the `form` element.

You use these CSS classes to define the styles for your control based on its status.
-->

컨트롤에 `NgModel` 디렉티브를 추가하면 컨트롤 상태를 나타내는 클래스 이름이 추가됩니다.
이 클래스로 상태에 따라 컨트롤의 스타일을 변경할 수 있습니다.

Angular가 컨트롤 상태에 따라 적용하는 클래스 이름은 다음과 같습니다.

| 상태                           | 참일 때 클래스 | 거짓일 때 클래스 |
| :----------------------------- | :------------- | :--------------- |
| 컨트롤에 접근한 적이 있습니다. | `ng-touched`   | `ng-untouched`   |
| 컨트롤 값이 변경되었습니다.    | `ng-dirty`     | `ng-pristine`    |
| 컨트롤 값이 유효합니다.        | `ng-valid`     | `ng-invalid`     |

Angular는 폼이 제출되면 `form` 엘리먼트에 `ng-submitted` 클래스도 적용합니다.
다만 `form` 엘리먼트 안에 있는 컨트롤에는 이 클래스를 적용하지 않습니다.

이 CSS 클래스로 컨트롤 상태에 맞는 스타일을 정의하면 됩니다.

<!--
### Observe control states
-->

<a id="observe-control-states"></a>

### 컨트롤 상태 확인하기

<!--
To see how the classes are added and removed by the framework, open the browser's developer tools and inspect the `<input>` element that represents the actor name.

1. Using your browser's developer tools, find the `<input>` element that corresponds to the **Name** input box.
   You can see that the element has multiple CSS classes in addition to "form-control".

1. When you first bring it up, the classes indicate that it has a valid value, that the value has not been changed since initialization or reset, and that the control has not been visited since initialization or reset.

   ```html
   <input class="form-control ng-untouched ng-pristine ng-valid" />
   ```

1. Take the following actions on the **Name** `<input>` box, and observe which classes appear.
   - Look but don't touch.
     The classes indicate that it is untouched, pristine, and valid.

   - Click inside the name box, then click outside it.
     The control has now been visited, and the element has the `ng-touched` class instead of the `ng-untouched` class.

   - Add slashes to the end of the name.
     It is now touched and dirty.

   - Erase the name.
     This makes the value invalid, so the `ng-invalid` class replaces the `ng-valid` class.
-->

Angular가 클래스를 추가하고 삭제하는 모습을 확인하려면 브라우저 개발자 도구를 열고 배우 이름을 입력하는 `<input>` 엘리먼트를 검사하세요.

1. 브라우저 개발자 도구에서 **Name** 입력 필드에 해당하는 `<input>` 엘리먼트를 찾습니다.
   엘리먼트에 "form-control" 외에도 여러 CSS 클래스가 있는 것을 확인할 수 있습니다.

1. 처음 표시될 때는 값이 유효하고, 초기화하거나 리셋한 후 값이 변경되지 않았으며, 컨트롤에도 접근한 적이 없다는 것을 클래스가 나타냅니다.

   ```html
   <input class="form-control ng-untouched ng-pristine ng-valid" />
   ```

1. **Name** `<input>` 필드에서 다음 동작을 하면서 어떤 클래스가 적용되는지 확인해 보세요.
   - 아무 동작도 하지 않고 상태만 확인합니다.
     클래스는 컨트롤에 접근한 적이 없고(untouched), 값이 변경되지 않았으며(pristine), 유효한 상태(valid)를 나타냅니다.

   - 이름 입력 필드 안쪽을 클릭한 다음 바깥쪽을 클릭합니다.
     이제 컨트롤에 접근했으므로 엘리먼트의 `ng-untouched` 클래스가 `ng-touched` 클래스로 바뀝니다.

   - 이름 끝에 슬래시를 추가합니다.
     이제 컨트롤은 접근한 상태(touched)이면서 값이 변경된 상태(dirty)입니다.

   - 이름을 모두 지웁니다.
     값이 유효하지 않게 되므로 `ng-valid` 클래스가 `ng-invalid` 클래스로 바뀝니다.

<!--
### Create visual feedback for states
-->

<a id="create-visual-feedback-for-states"></a>

### 상태에 따른 시각적 피드백 제공하기

<!--
The `ng-valid`/`ng-invalid` pair is particularly interesting, because you want to send a
strong visual signal when the values are invalid.
You also want to mark required fields.

You can mark required fields and invalid data at the same time with a colored bar
on the left of the input box.

To change the appearance in this way, take the following steps.

1. Add definitions for the `ng-*` CSS classes.
1. Add these class definitions to a new `forms.css` file.
1. Add the new file to the project as a sibling to `index.html`:

   <docs-code header="forms.css" language="css" path="adev/src/content/examples/forms/src/assets/forms.css"/>

1. In the `index.html` file, update the `<head>` tag to include the new style sheet.

   <docs-code header="index.html (styles)" path="adev/src/content/examples/forms/src/index.html" region="styles"/>
-->

`ng-valid`와 `ng-invalid` 클래스는 특히 유용합니다.
값이 유효하지 않을 때 이를 시각적으로 명확히 알릴 수 있기 때문입니다.
필수 입력 필드도 표시하는 것이 좋습니다.

입력 필드 왼쪽에 색상 막대를 표시하면 필수 입력 필드와 유효하지 않은 데이터를 함께 나타낼 수 있습니다.

다음 순서로 스타일을 변경해 봅시다.

1. `ng-*` CSS 클래스의 스타일을 정의합니다.
1. 새 `forms.css` 파일에 클래스 정의를 추가합니다.
1. 프로젝트에서 `index.html`과 같은 디렉터리에 새 파일을 추가합니다.

   <docs-code header="forms.css" language="css" path="adev/src/content/examples/forms/src/assets/forms.css"/>

1. `index.html` 파일의 `<head>` 태그에 새 스타일시트를 추가합니다.

   <docs-code header="index.html (스타일)" path="adev/src/content/examples/forms/src/index.html" region="styles"/>

<!--
### Show and hide validation error messages
-->

<a id="show-and-hide-validation-error-messages"></a>

### 유효성 검사 에러 메시지 표시하고 숨기기

<!--
The **Name** input box is required and clearing it turns the bar red.
That indicates that something is wrong, but the user doesn't know what is wrong or what to do about it.
You can provide a helpful message by checking for and responding to the control's state.

The **Skill** select box is also required, but it doesn't need this kind of error handling because the selection box already constrains the selection to valid values.

To define and show an error message when appropriate, take the following steps.

<docs-workflow>
<docs-step title="Add a local reference to the input">
Extend the `input` tag with a template reference variable that you can use to access the input box's Angular control from within the template. In the example, the variable is `#name="ngModel"`.

The template reference variable (`#name`) is set to `"ngModel"` because that is the value of the [`NgModel.exportAs`](api/core/Directive#exportAs) property. This property tells Angular how to link a reference variable to a directive.
</docs-step>

<docs-step title="Add the error message">
Add a `<div>` that contains a suitable error message.
</docs-step>

<docs-step title="Make the error message conditional">
Show or hide the error message by binding properties of the `name` control to the message `<div>` element's `hidden` property.
</docs-step>

<docs-code header="actor-form.component.html (hidden-error-msg)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="hidden-error-msg"/>

<docs-step title="Add a conditional error message to name">
Add a conditional error message to the `name` input box, as in the following example.

<docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="name-with-error-msg"/>
</docs-step>
</docs-workflow>

<docs-callout title='Illustrating the "pristine" state'>

In this example, you hide the message when the control is either valid or _pristine_.
Pristine means the user hasn't changed the value since it was displayed in this form.
If you ignore the `pristine` state, you would hide the message only when the value is valid.
If you arrive in this component with a new, blank actor or an invalid actor, you'll see the error message immediately, before you've done anything.

You might want the message to display only when the user makes an invalid change.
Hiding the message while the control is in the `pristine` state achieves that goal.
You'll see the significance of this choice when you add a new actor to the form in the next step.

</docs-callout>
-->

**Name** 입력 필드는 필수이므로 값을 지우면 막대가 빨간색으로 바뀝니다.
문제가 있다는 것은 알 수 있지만, 사용자는 무엇이 잘못되었고 어떻게 해결해야 하는지 알 수 없습니다.
컨트롤 상태를 확인하고 상태에 맞는 안내 메시지를 제공해 봅시다.

**Skill** 선택 필드도 필수이지만, 선택할 수 있는 항목이 유효한 값으로 제한되어 있기 때문에 이런 에러 처리가 필요하지 않습니다.

적절한 시점에 에러 메시지가 표시되도록 다음 순서로 구성합니다.

<docs-workflow>
<a id="add-a-local-reference-to-the-input"></a>

<docs-step title="입력 필드에 지역 참조 추가하기">
`input` 태그에 템플릿 참조 변수를 추가하면 템플릿 안에서 입력 필드의 Angular 컨트롤에 접근할 수 있습니다.
예제에서는 `#name="ngModel"` 변수를 사용합니다.

템플릿 참조 변수(`#name`)를 `"ngModel"`로 지정한 이유는 이 값이 [`NgModel.exportAs`](api/core/Directive#exportAs) 프로퍼티 값이기 때문입니다.
이 프로퍼티는 참조 변수를 디렉티브에 연결하는 방법을 Angular에 알려줍니다.
</docs-step>

<a id="add-the-error-message"></a>

<docs-step title="에러 메시지 추가하기">
적절한 에러 메시지가 담긴 `<div>`를 추가합니다.
</docs-step>

<a id="make-the-error-message-conditional"></a>

<docs-step title="조건에 따라 에러 메시지 표시하기">
`name` 컨트롤의 프로퍼티를 메시지가 담긴 `<div>` 엘리먼트의 `hidden` 프로퍼티에 바인딩해서 에러 메시지를 표시하거나 숨깁니다.
</docs-step>

<docs-code header="actor-form.component.html (에러 메시지 숨기기)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="hidden-error-msg"/>

<a id="add-a-conditional-error-message-to-name"></a>

<docs-step title="name에 조건부 에러 메시지 추가하기">
아래 예제와 같이 `name` 입력 필드에 조건부 에러 메시지를 추가합니다.

<docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="name-with-error-msg"/>
</docs-step>
</docs-workflow>

<docs-callout title='pristine 상태 이해하기'>

이 예제에서는 컨트롤이 유효하거나 _pristine_ 상태일 때 메시지를 숨깁니다.
pristine은 폼에 값이 표시된 후 사용자가 아직 값을 변경하지 않았다는 의미입니다.
`pristine` 상태를 고려하지 않으면 값이 유효할 때만 메시지를 숨기게 됩니다.
이 경우 새로 생성한 빈 배우 데이터나 유효하지 않은 배우 데이터로 컴포넌트를 열면, 사용자가 아무 동작을 하기 전부터 에러 메시지가 표시됩니다.

사용자가 값을 잘못 변경했을 때만 메시지를 표시하고 싶을 수 있습니다.
컨트롤이 `pristine` 상태일 때 메시지를 숨기면 이렇게 동작합니다.
다음 단계에서 폼에 새 배우를 추가해 보면 이 방식의 의미를 확인할 수 있습니다.

</docs-callout>

<!--
## Add a new actor
-->

<a id="add-a-new-actor"></a>

## 새 배우 추가하기

<!--
This exercise shows how you can respond to a native HTML button-click event by adding to the model data.
To let form users add a new actor, you will add a **New Actor** button that responds to a click event.

1. In the template, place a "New Actor" `<button>` element at the bottom of the form.
1. In the component file, add the actor-creation method to the actor data model.

   <docs-code header="actor-form.component.ts (New Actor method)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="new-actor"/>

1. Bind the button's click event to an actor-creation method, `newActor()`.

   <docs-code header="actor-form.component.html (New Actor button)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="new-actor-button-no-reset"/>

1. Run the application again and click the **New Actor** button.

   The form clears, and the _required_ bars to the left of the input box are red, indicating invalid `name` and `skill` properties.
   Notice that the error messages are hidden.
   This is because the form is pristine; you haven't changed anything yet.

1. Enter a name and click **New Actor** again.

   Now the application displays a `Name is required` error message, because the input box is no longer pristine.
   The form remembers that you entered a name before clicking **New Actor**.

1. To restore the pristine state of the form controls, clear all of the flags imperatively by calling the form's `reset()` method after calling the `newActor()` method.

   <docs-code header="actor-form.component.html (Reset the form)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="new-actor-button-form-reset"/>

   Now clicking **New Actor** resets both the form and its control flags.
-->

이번에는 표준 HTML 버튼의 클릭 이벤트에 반응해서 모델 데이터를 추가하는 방법을 알아봅니다.
폼에서 새 배우를 추가할 수 있도록 클릭 이벤트에 반응하는 **New Actor** 버튼을 추가하겠습니다.

1. 템플릿의 폼 맨 아래에 "New Actor" `<button>` 엘리먼트를 추가합니다.
1. 컴포넌트 파일에서 배우 데이터 모델에 새 배우를 생성하는 메서드를 추가합니다.

   <docs-code header="actor-form.component.ts (새 배우 생성 메서드)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="new-actor"/>

1. 버튼의 클릭 이벤트를 새 배우를 생성하는 `newActor()` 메서드에 바인딩합니다.

   <docs-code header="actor-form.component.html (새 배우 버튼)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="new-actor-button-no-reset"/>

1. 애플리케이션을 다시 실행하고 **New Actor** 버튼을 클릭합니다.

   폼이 비워지고, 입력 필드 왼쪽의 _필수 입력_ 막대가 빨간색으로 바뀝니다.
   `name`과 `skill` 프로퍼티가 유효하지 않다는 뜻입니다.
   에러 메시지는 숨겨져 있는 것을 확인해 보세요.
   아직 아무 값도 변경하지 않았으므로 폼이 pristine 상태이기 때문입니다.

1. 이름을 입력하고 **New Actor** 버튼을 다시 클릭합니다.

   이제 입력 필드가 pristine 상태가 아니므로 `Name is required` 에러 메시지가 표시됩니다.
   폼은 **New Actor** 버튼을 클릭하기 전에 이름을 입력했다는 것을 기억합니다.

1. 폼 컨트롤을 pristine 상태로 되돌리려면 `newActor()` 메서드를 실행한 뒤 폼의 `reset()` 메서드를 실행해서 모든 상태 플래그를 명시적으로 초기화합니다.

   <docs-code header="actor-form.component.html (폼 초기화)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="new-actor-button-form-reset"/>

   이제 **New Actor** 버튼을 클릭하면 폼과 컨트롤의 상태 플래그가 모두 초기화됩니다.

<!--
## Submit the form with `ngSubmit`
-->

<a id="submit-the-form-with-ngsubmit"></a>

## `ngSubmit`으로 폼 제출하기

<!--
The user should be able to submit this form after filling it in.
The **Submit** button at the bottom of the form does nothing on its own, but it does trigger a form-submit event because of its type (`type="submit"`).

To respond to this event, take the following steps.

<docs-workflow>

<docs-step title="Listen to ngOnSubmit">
Bind the form's [`ngSubmit`](api/forms/NgForm#ngSubmit) event property to the actor-form component's `onSubmit()` method.

<docs-code header="actor-form.component.html (ngSubmit)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngSubmit"/>
</docs-step>

<docs-step title="Bind the disabled property">
Use the template reference variable, `#actorForm` to access the form that contains the **Submit** button and create an event binding.

You will bind the form property that indicates its overall validity to the **Submit** button's `disabled` property.

<docs-code header="actor-form.component.html (submit-button)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="submit-button"/>
</docs-step>

<docs-step title="Run the application">
Notice that the button is enabled — although it doesn't do anything useful yet.
</docs-step>

<docs-step title="Delete the Name value">
This violates the "required" rule, so it displays the error message —and notice that it also disables the **Submit** button.

You didn't have to explicitly wire the button's enabled state to the form's validity.
The `FormsModule` did this automatically when you defined a template reference variable on the enhanced form element, then referred to that variable in the button control.
</docs-step>
</docs-workflow>
-->

사용자는 폼을 모두 입력한 후에 제출할 수 있어야 합니다.
폼 맨 아래의 **Submit** 버튼은 그 자체로는 아무 동작도 하지 않지만, 타입이 `type="submit"`이기 때문에 폼 제출 이벤트를 발생시킵니다.

이 이벤트를 처리하려면 다음 순서로 진행합니다.

<docs-workflow>

<a id="listen-to-ngonsubmit"></a>

<docs-step title="ngOnSubmit 감지하기">
폼의 [`ngSubmit`](api/forms/NgForm#ngSubmit) 이벤트 프로퍼티를 배우 폼 컴포넌트의 `onSubmit()` 메서드에 바인딩합니다.

<docs-code header="actor-form.component.html (ngSubmit)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="ngSubmit"/>
</docs-step>

<a id="bind-the-disabled-property"></a>

<docs-step title="disabled 프로퍼티 바인딩하기">
템플릿 참조 변수 `#actorForm`으로 **Submit** 버튼이 포함된 폼에 접근하고 이벤트 바인딩을 구성합니다.

폼 전체의 유효성을 나타내는 프로퍼티를 **Submit** 버튼의 `disabled` 프로퍼티에 바인딩하겠습니다.

<docs-code header="actor-form.component.html (제출 버튼)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="submit-button"/>
</docs-step>

<a id="run-the-application"></a>

<docs-step title="애플리케이션 실행하기">
아직 별다른 기능은 없지만 버튼이 활성화된 것을 확인할 수 있습니다.
</docs-step>

<a id="delete-the-name-value"></a>

<docs-step title="Name 값 지우기">
"required" 규칙을 위반했기 때문에 에러 메시지가 표시됩니다.
**Submit** 버튼도 비활성화된 것을 확인해 보세요.

버튼의 활성화 상태와 폼의 유효성을 연결하는 별도 코드를 작성할 필요는 없습니다.
폼 기능이 적용된 엘리먼트에 템플릿 참조 변수를 정의하고 버튼 컨트롤에서 이 변수를 참조하면, `FormsModule`이 자동으로 처리합니다.
</docs-step>
</docs-workflow>

<!--
### Respond to form submission
-->

<a id="respond-to-form-submission"></a>

### 폼 제출 처리하기

<!--
To show a response to form submission, you can hide the data entry area and display something else in its place.

<docs-workflow>
<docs-step title="Wrap the form">
Wrap the entire form in a `<div>` and bind its `hidden` property to the `ActorFormComponent.submitted` property.

<docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="edit-div"/>

The main form is visible from the start because the `submitted` property is false until you submit the form, as this fragment from the `ActorFormComponent` shows:

<docs-code header="actor-form.component.ts (submitted)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="submitted"/>

When you click the **Submit** button, the `submitted` flag becomes true and the form disappears.
</docs-step>

<docs-step title="Add the submitted state">
To show something else while the form is in the submitted state, add the following HTML below the new `<div>` wrapper.

<docs-code header="actor-form.component.html (excerpt)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="submitted"/>

This `<div>`, which shows a read-only actor with interpolation bindings, appears only while the component is in the submitted state.

The alternative display includes an _Edit_ button whose click event is bound to an expression that clears the `submitted` flag.
</docs-step>

<docs-step title="Test the Edit button">
Click the *Edit* button to switch the display back to the editable form.
</docs-step>
</docs-workflow>
-->

폼을 제출했다는 것을 보여주려면 데이터 입력 영역을 숨기고 그 자리에 다른 내용을 표시하면 됩니다.

<docs-workflow>
<a id="wrap-the-form"></a>

<docs-step title="폼 감싸기">
폼 전체를 `<div>`로 감싸고 `hidden` 프로퍼티를 `ActorFormComponent.submitted` 프로퍼티에 바인딩합니다.

<docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="edit-div"/>

아래 `ActorFormComponent` 코드에서 확인할 수 있듯이 폼을 제출하기 전까지는 `submitted` 프로퍼티가 false이므로, 처음에는 폼이 표시됩니다.

<docs-code header="actor-form.component.ts (submitted)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="submitted"/>

**Submit** 버튼을 클릭하면 `submitted` 플래그가 true로 바뀌고 폼이 사라집니다.
</docs-step>

<a id="add-the-submitted-state"></a>

<docs-step title="제출 상태 추가하기">
폼을 제출한 상태에서 다른 내용을 표시하려면 폼을 감싼 새 `<div>` 아래에 다음 HTML을 추가합니다.

<docs-code header="actor-form.component.html (일부)" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="submitted"/>

이 `<div>`는 문자열 바인딩으로 배우 데이터를 읽기 전용으로 표시하며, 컴포넌트가 제출 상태일 때만 나타납니다.

새로 표시되는 영역에는 _Edit_ 버튼도 있습니다.
이 버튼의 클릭 이벤트는 `submitted` 플래그를 해제하는 표현식에 바인딩됩니다.
</docs-step>

<a id="test-the-edit-button"></a>

<docs-step title="Edit 버튼 테스트하기">
*Edit* 버튼을 클릭하면 화면이 다시 수정할 수 있는 폼으로 바뀝니다.
</docs-step>
</docs-workflow>

<!--
## Summary
-->

<a id="summary"></a>

## 정리

<!--
The Angular form discussed in this page takes advantage of the following
framework features to provide support for data modification, validation, and more.

- An Angular HTML form template
- A form component class with a `@Component` decorator
- Handling form submission by binding to the `NgForm.ngSubmit` event property
- Template-reference variables such as `#actorForm` and `#name`
- `[(ngModel)]` syntax for two-way data binding
- The use of `name` attributes for validation and form-element change tracking
- The reference variable's `valid` property on input controls indicates whether a control is valid or should show error messages
- Controlling the **Submit** button's enabled state by binding to `NgForm` validity
- Custom CSS classes that provide visual feedback to users about controls that are not valid

Here's the code for the final version of the application:

<docs-code-multifile>
    <docs-code header="actor-form.component.ts" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="final"/>
    <docs-code header="actor-form.component.html" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="final"/>
    <docs-code header="actor.ts" path="adev/src/content/examples/forms/src/app/actor.ts"/>
    <docs-code header="app.component.html" path="adev/src/content/examples/forms/src/app/app.component.html"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/forms/src/app/app.component.ts"/>
    <docs-code header="main.ts" path="adev/src/content/examples/forms/src/main.ts"/>
    <docs-code header="forms.css" path="adev/src/content/examples/forms/src/assets/forms.css"/>
</docs-code-multifile>
-->

이 문서에서 살펴본 Angular 폼은 다음 프레임워크 기능을 활용해서 데이터를 수정하고 유효성을 검사합니다.

- Angular HTML 폼 템플릿
- `@Component` 데코레이터가 적용된 폼 컴포넌트 클래스
- `NgForm.ngSubmit` 이벤트 프로퍼티에 바인딩해서 폼 제출 처리하기
- `#actorForm`, `#name`과 같은 템플릿 참조 변수
- 양방향 데이터 바인딩을 위한 `[(ngModel)]` 문법
- 유효성 검사와 폼 엘리먼트의 변경사항 추적에 사용하는 `name` 어트리뷰트
- 컨트롤이 유효한지, 에러 메시지를 표시해야 하는지 확인하는 입력 컨트롤 참조 변수의 `valid` 프로퍼티
- `NgForm`의 유효성 상태에 바인딩해서 **Submit** 버튼의 활성화 상태 제어하기
- 유효하지 않은 컨트롤을 사용자에게 시각적으로 알리는 커스텀 CSS 클래스

완성된 애플리케이션 코드는 다음과 같습니다.

<docs-code-multifile>
    <docs-code header="actor-form.component.ts" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.ts" region="final"/>
    <docs-code header="actor-form.component.html" path="adev/src/content/examples/forms/src/app/actor-form/actor-form.component.html" region="final"/>
    <docs-code header="actor.ts" path="adev/src/content/examples/forms/src/app/actor.ts"/>
    <docs-code header="app.component.html" path="adev/src/content/examples/forms/src/app/app.component.html"/>
    <docs-code header="app.component.ts" path="adev/src/content/examples/forms/src/app/app.component.ts"/>
    <docs-code header="main.ts" path="adev/src/content/examples/forms/src/main.ts"/>
    <docs-code header="forms.css" path="adev/src/content/examples/forms/src/assets/forms.css"/>
</docs-code-multifile>
