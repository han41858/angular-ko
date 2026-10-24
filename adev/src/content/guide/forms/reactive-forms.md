<!--
# Reactive forms
-->

<a id="reactive-forms"></a>

# 반응형 폼

<!--
Reactive forms provide a model-driven approach to handling form inputs whose values change over time.
This guide shows you how to create and update a basic form control, use multiple controls in a group, validate form values, and create dynamic forms where you can add or remove controls at runtime.
-->

반응형 폼은 시간이 지나면서 값이 바뀌는 폼 입력을 모델 중심으로 처리하는 방식입니다.
이 문서에서는 기본 폼 컨트롤을 생성하고 갱신하는 방법, 여러 컨트롤을 그룹으로 묶는 방법, 폼 값의 유효성을 검사하는 방법, 실행 중에 컨트롤을 추가하거나 제거할 수 있는 동적 폼을 만드는 방법을 설명합니다.

<!--
## Overview of reactive forms
-->

<a id="overview-of-reactive-forms"></a>

## 반응형 폼 개요

<!--
Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time.
Each change to the form state returns a new state, which maintains the integrity of the model between changes.
Reactive forms are built around observable streams, where form inputs and values are provided as streams that can be accessed synchronously.

Reactive forms also provide a straightforward path to testing because you are assured that your data is consistent and predictable when requested.
Any consumers of these streams can safely manipulate the data.

Reactive forms differ from [template-driven forms](guide/forms/template-driven-forms) in distinct ways.
Reactive forms provide synchronous access to the data model, immutability with observable operators, and change tracking through observable streams.

Template-driven forms allow direct access to modify data in your template, but are less explicit than reactive forms because they rely on directives embedded in the template, along with mutable data to track changes asynchronously.
See the [Forms Overview](guide/forms) for detailed comparisons between the two paradigms.
-->

반응형 폼은 특정 시점의 폼 상태를 명시적이고 불변인 방식으로 관리합니다.
폼 상태가 바뀔 때마다 새로운 상태가 반환되기 때문에 상태가 바뀌는 동안에도 모델의 무결성이 유지됩니다.
반응형 폼은 옵저버블 스트림을 기반으로 구성되며, 폼 입력과 값은 동기적으로 접근할 수 있는 스트림으로 제공됩니다.

반응형 폼은 데이터를 요청할 때 일관되고 예측 가능한 데이터를 보장하기 때문에 테스트하기도 간편합니다.
이 스트림의 소비자는 데이터를 안전하게 다룰 수 있습니다.

반응형 폼은 [템플릿 기반 폼](guide/forms/template-driven-forms)과 몇 가지 차이가 있습니다.
반응형 폼에서는 데이터 모델에 동기적으로 접근하며, 옵저버블 연산자로 불변성을 유지하고, 옵저버블 스트림으로 변화를 추적합니다.

템플릿 기반 폼에서는 템플릿에서 데이터에 직접 접근해서 수정할 수 있습니다.
하지만 템플릿에 포함된 디렉티브와 변경 가능한 데이터를 활용해서 변화를 비동기적으로 추적하기 때문에 반응형 폼만큼 명시적이지 않습니다.
두 방식을 자세하게 비교한 내용은 [폼 개요](guide/forms) 문서를 참고하세요.

<!--
## Adding a basic form control
-->

<a id="adding-a-basic-form-control"></a>

## 기본 폼 컨트롤 추가하기

<!--
There are three steps to using form controls.

1. Generate a new component and register the reactive forms module. This module declares the reactive-form directives required to use reactive forms.
1. Instantiate a new `FormControl`.
1. Register the `FormControl` in the template.

You can then display the form by adding the component to the template.

The following examples show how to add a single form control.
In the example, the user enters their name into an input field, captures that input value, and displays the current value of the form control element.

<docs-workflow>

<docs-step title="Generate a new component and import the ReactiveFormsModule">
Use the CLI command `ng generate component` to generate a component in your project and import `ReactiveFormsModule` from the `@angular/forms` package and add it to your Component's `imports` array.

<docs-code header="name-editor.component.ts (excerpt)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="imports" />
</docs-step>

<docs-step title="Declare a FormControl instance">
Use the constructor of `FormControl` to set its initial value, which in this case is an empty string. By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.

<docs-code header="name-editor.component.ts" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="create-control"/>
</docs-step>

<docs-step title="Register the control in the template">
After you create the control in the component class, you must associate it with a form control element in the template. Update the template with the form control using the `formControl` binding provided by `FormControlDirective`, which is also included in the `ReactiveFormsModule`.

<docs-code header="name-editor.component.html" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="control-binding" />

Using the template binding syntax, the form control is now registered to the `name` input element in the template. The form control and DOM element communicate with each other: the view reflects changes in the model, and the model reflects changes in the view.
</docs-step>

<docs-step title="Display the component">
The `FormControl` assigned to the `name` property is displayed when the `<app-name-editor>` component is added to a template.

<docs-code header="app.component.html (name editor)" path="adev/src/content/examples/reactive-forms/src/app/app.component.1.html" region="app-name-editor"/>
</docs-step>
</docs-workflow>
-->

폼 컨트롤을 사용하려면 다음 세 단계를 진행합니다.

1. 새 컴포넌트를 생성하고 반응형 폼 모듈을 등록합니다.
   이 모듈에는 반응형 폼을 사용하는 데 필요한 디렉티브가 선언되어 있습니다.
1. 새 `FormControl` 인스턴스를 생성합니다.
1. 템플릿에 `FormControl`을 등록합니다.

그런 다음 템플릿에 컴포넌트를 추가하면 폼을 표시할 수 있습니다.

다음 예제에서는 폼 컨트롤 하나를 추가하는 방법을 알아봅니다.
사용자가 입력 필드에 이름을 입력하면 이 입력값을 받아서 폼 컨트롤 엘리먼트의 현재 값을 표시하는 예제입니다.

<docs-workflow>

<a id="generate-a-new-component-and-import-the-reactiveformsmodule"></a>

<docs-step title="새 컴포넌트를 생성하고 ReactiveFormsModule 불러오기">
CLI 명령 `ng generate component`로 프로젝트에 컴포넌트를 생성하세요.
그리고 `@angular/forms` 패키지에서 `ReactiveFormsModule`을 불러와 컴포넌트의 `imports` 배열에 추가하세요.

<docs-code header="name-editor.component.ts (일부)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="imports" />
</docs-step>

<a id="declare-a-formcontrol-instance"></a>

<docs-step title="FormControl 인스턴스 선언하기">
`FormControl` 생성자로 초기값을 지정하세요.
이 예제에서는 빈 문자열로 지정합니다.
컴포넌트 클래스에 컨트롤을 생성하면 폼 입력 상태에 바로 접근해서 변화를 감지하고, 상태를 갱신하고, 유효성을 검사할 수 있습니다.

<docs-code header="name-editor.component.ts" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="create-control"/>
</docs-step>

<a id="register-the-control-in-the-template"></a>

<docs-step title="템플릿에 컨트롤 등록하기">
컴포넌트 클래스에 컨트롤을 생성했으면 템플릿의 폼 컨트롤 엘리먼트와 연결해야 합니다.
`FormControlDirective`가 제공하는 `formControl` 바인딩으로 템플릿에 폼 컨트롤을 연결하세요.
`FormControlDirective`도 `ReactiveFormsModule`에 포함되어 있습니다.

<docs-code header="name-editor.component.html" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="control-binding" />

템플릿 바인딩 문법을 사용하면 템플릿의 `name` 입력 엘리먼트에 폼 컨트롤이 등록됩니다.
폼 컨트롤과 DOM 엘리먼트는 서로 정보를 주고받기 때문에 모델의 변화는 뷰에 반영되고, 뷰의 변화는 모델에 반영됩니다.
</docs-step>

<a id="display-the-component"></a>

<docs-step title="컴포넌트 표시하기">
템플릿에 `<app-name-editor>` 컴포넌트를 추가하면 `name` 프로퍼티에 할당한 `FormControl`이 표시됩니다.

<docs-code header="app.component.html (이름 편집기)" path="adev/src/content/examples/reactive-forms/src/app/app.component.1.html" region="app-name-editor"/>
</docs-step>
</docs-workflow>

<!--
### Displaying a form control value
-->

<a id="displaying-a-form-control-value"></a>

### 폼 컨트롤 값 표시하기

<!--
You can display the value in the following ways:

- Through the `valueChanges` observable where you can listen for changes in the form's value in the template using `AsyncPipe` or in the component class using the `subscribe()` method
- With the `value` property, which gives you a snapshot of the current value

The following example shows you how to display the current value using interpolation in the template.

<docs-code header="name-editor.component.html (control value)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="display-value"/>

The displayed value changes as you update the form control element.

Reactive forms provide access to information about a given control through properties and methods provided with each instance.
These properties and methods of the underlying [AbstractControl](api/forms/AbstractControl 'API reference') class are used to control form state and determine when to display messages when handling [input validation](#validating-form-input 'Learn more about validating form input').

Read about other `FormControl` properties and methods in the [API Reference](api/forms/FormControl 'Detailed syntax reference').
-->

값은 다음과 같은 방법으로 표시할 수 있습니다.

- `valueChanges` 옵저버블을 사용하면 템플릿에서는 `AsyncPipe`로, 컴포넌트 클래스에서는 `subscribe()` 메서드로 폼 값의 변화를 감지할 수 있습니다.
- `value` 프로퍼티를 사용하면 현재 값의 스냅샷을 가져올 수 있습니다.

다음 예제는 템플릿에서 문자열 바인딩으로 현재 값을 표시하는 방법입니다.

<docs-code header="name-editor.component.html (컨트롤 값)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="display-value"/>

폼 컨트롤 엘리먼트를 갱신하면 표시되는 값도 바뀝니다.

반응형 폼은 각 인스턴스의 프로퍼티와 메서드로 해당 컨트롤에 관한 정보를 제공합니다.
기반 클래스인 [AbstractControl](api/forms/AbstractControl 'API 레퍼런스')의 프로퍼티와 메서드를 사용하면 폼 상태를 제어하고, [입력 유효성 검사](#validating-form-input '폼 입력 유효성 검사 자세히 알아보기')를 처리하면서 메시지를 표시할 시점을 결정할 수 있습니다.

`FormControl`의 다른 프로퍼티와 메서드는 [API 레퍼런스](api/forms/FormControl '자세한 문법 레퍼런스')를 참고하세요.

<!--
### Replacing a form control value
-->

<a id="replacing-a-form-control-value"></a>

### 폼 컨트롤 값 교체하기

<!--
Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the value without user interaction.
A form control instance provides a `setValue()` method that updates the value of the form control and validates the structure of the value provided against the control's structure.
For example, when retrieving form data from a backend API or service, use the `setValue()` method to update the control to its new value, replacing the old value entirely.

The following example adds a method to the component class to update the value of the control to _Nancy_ using the `setValue()` method.

<docs-code header="name-editor.component.ts (update value)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="update-value"/>

Update the template with a button to simulate a name update.
When you click the **Update Name** button, the value entered in the form control element is reflected as its current value.

<docs-code header="name-editor.component.html (update value)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="update-value"/>

The form model is the source of truth for the control, so when you click the button, the value of the input is changed within the component class, overriding its current value.

HELPFUL: In this example, you're using a single control.
When using the `setValue()` method with a [form group](#grouping-form-controls) or [form array](#creating-dynamic-forms) instance, the value needs to match the structure of the group or array.
-->

반응형 폼에는 컨트롤 값을 코드로 변경하는 메서드가 있기 때문에 사용자 입력 없이도 유연하게 값을 갱신할 수 있습니다.
폼 컨트롤 인스턴스가 제공하는 `setValue()` 메서드는 폼 컨트롤의 값을 갱신하고, 전달한 값의 구조가 컨트롤 구조와 일치하는지 검사합니다.
예를 들어 백엔드 API나 서비스에서 폼 데이터를 가져왔다면, `setValue()` 메서드로 기존 값을 완전히 교체해서 컨트롤을 새 값으로 갱신할 수 있습니다.

다음 예제는 `setValue()` 메서드로 컨트롤 값을 *Nancy*로 갱신하는 메서드를 컴포넌트 클래스에 추가합니다.

<docs-code header="name-editor.component.ts (값 갱신)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.ts" region="update-value"/>

이름을 갱신해 볼 수 있도록 템플릿에 버튼을 추가하세요.
**Update Name** 버튼을 클릭하면 폼 컨트롤 엘리먼트에 입력되는 값이 현재 값으로 반영됩니다.

<docs-code header="name-editor.component.html (값 갱신)" path="adev/src/content/examples/reactive-forms/src/app/name-editor/name-editor.component.html" region="update-value"/>

폼 모델은 컨트롤 값의 원본 데이터를 관리합니다.
따라서 버튼을 클릭하면 컴포넌트 클래스에서 입력값을 변경하면서 현재 값을 덮어씁니다.

참고: 이 예제에서는 컨트롤 하나를 사용합니다.
[폼 그룹](#grouping-form-controls)이나 [폼 배열](#creating-dynamic-forms) 인스턴스에서 `setValue()` 메서드를 사용할 때는 전달하는 값이 그룹이나 배열의 구조와 일치해야 합니다.

<!--
## Grouping form controls
-->

<a id="grouping-form-controls"></a>

## 폼 컨트롤 그룹으로 묶기

<!--
Forms typically contain several related controls.
Reactive forms provide two ways of grouping multiple related controls into a single input form.

| Form groups | Details                                                                                                                                                                                                                                                |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form group  | Defines a form with a fixed set of controls that you can manage together. Form group basics are discussed in this section. You can also [nest form groups](#creating-nested-form-groups 'See more about nesting groups') to create more complex forms. |
| Form array  | Defines a dynamic form, where you can add and remove controls at run time. You can also nest form arrays to create more complex forms. For more about this option, see [Creating dynamic forms](#creating-dynamic-forms).                              |

Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances \(for example, a form\).
Each control in a form group instance is tracked by name when creating the form group.
The following example shows how to manage multiple form control instances in a single group.

Generate a `ProfileEditor` component and import the `FormGroup` and `FormControl` classes from the `@angular/forms` package.

```shell
ng generate component ProfileEditor
```

<docs-code header="profile-editor.component.ts (imports)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="imports"/>

To add a form group to this component, take the following steps.

1. Create a `FormGroup` instance.
1. Associate the `FormGroup` model and view.
1. Save the form data.

<docs-workflow>

<docs-step title="Create a FormGroup instance">
Create a property in the component class named `profileForm` and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control.

For the profile form, add two form control instances with the names `firstName` and `lastName`

<docs-code header="profile-editor.component.ts (form group)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup"/>

The individual form controls are now collected within a group. A `FormGroup` instance provides its model value as an object reduced from the values of each control in the group. A form group instance has the same properties (such as `value` and `untouched`) and methods (such as `setValue()`) as a form control instance.
</docs-step>

<docs-step title="Associate the FormGroup model and view">
A form group tracks the status and changes for each of its controls, so if one of the controls changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After you define the model, you must update the template to reflect the model in the view.

<docs-code header="profile-editor.component.html (template form group)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroup"/>

Just as a form group contains a group of controls, the _profileForm_ `FormGroup` is bound to the `form` element with the `FormGroup` directive, creating a communication layer between the model and the form containing the inputs. The `formControlName` input provided by the `FormControlName` directive binds each individual input to the form control defined in `FormGroup`. The form controls communicate with their respective elements. They also communicate changes to the form group instance, which provides the source of truth for the model value.
</docs-step>

<docs-step title="Save form data">
The `ProfileEditor` component accepts input from the user, but in a real scenario you want to capture the form value and make it available for further processing outside the component. The `FormGroup` directive listens for the `submit` event emitted by the `form` element and emits an `ngSubmit` event that you can bind to a callback function. Add an `ngSubmit` event listener to the `form` tag with the `onSubmit()` callback method.

<docs-code header="profile-editor.component.html (submit event)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="ng-submit"/>

The `onSubmit()` method in the `ProfileEditor` component captures the current value of `profileForm`. Use `output()` to keep the form encapsulated and to provide the form value outside the component. The following example uses `console.warn` to log a message to the browser console.

<docs-code header="profile-editor.component.ts (submit method)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="on-submit"/>

The `submit` event is emitted by the `form` tag using the built-in DOM event. You trigger the event by clicking a button with `submit` type. This lets the user press the **Enter** key to submit the completed form.

Use a `button` element to add a button to the bottom of the form to trigger the form submission.

<docs-code header="profile-editor.component.html (submit button)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="submit-button"/>

The button in the preceding snippet also has a `disabled` binding attached to it to disable the button when `profileForm` is invalid. You aren't performing any validation yet, so the button is always enabled. Basic form validation is covered in the [Validating form input](#validating-form-input) section.
</docs-step>

<docs-step title="Display the component {#display-the-component-form-group}">
To display the `ProfileEditor` component that contains the form, add it to a component template.

<docs-code header="app.component.html (profile editor)" path="adev/src/content/examples/reactive-forms/src/app/app.component.1.html" region="app-profile-editor"/>

`ProfileEditor` lets you manage the form control instances for the `firstName` and `lastName` controls within the form group instance.
</docs-step>
</docs-workflow>
-->

폼에는 일반적으로 서로 관련된 여러 컨트롤이 있습니다.
반응형 폼은 관련된 컨트롤 여러 개를 하나의 입력 폼으로 묶는 두 가지 방식을 제공합니다.

| 폼 그룹 | 설명                                                                                                                                                                                                                  |
| :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 폼 그룹 | 함께 관리할 고정된 컨트롤 묶음으로 폼을 구성합니다. 폼 그룹의 기본 사용법은 이 섹션에서 설명합니다. [폼 그룹을 중첩](#creating-nested-form-groups '그룹 중첩 자세히 알아보기')하면 더 복잡한 폼을 만들 수도 있습니다. |
| 폼 배열 | 실행 중에 컨트롤을 추가하거나 제거할 수 있는 동적 폼을 구성합니다. 폼 배열을 중첩하면 더 복잡한 폼을 만들 수도 있습니다. 이 방식은 [동적 폼 만들기](#creating-dynamic-forms)를 참고하세요.                            |

폼 컨트롤 인스턴스로 입력 필드 하나를 제어하는 것처럼, 폼 그룹 인스턴스는 폼 컨트롤 인스턴스를 묶은 그룹\(예: 폼\)의 상태를 추적합니다.
폼 그룹 인스턴스에 속한 각 컨트롤은 폼 그룹을 생성할 때 지정한 이름으로 추적합니다.
다음 예제는 폼 컨트롤 인스턴스 여러 개를 하나의 그룹으로 관리하는 방법입니다.

`ProfileEditor` 컴포넌트를 생성하고 `@angular/forms` 패키지에서 `FormGroup`과 `FormControl` 클래스를 불러오세요.

```shell
ng generate component ProfileEditor
```

<docs-code header="profile-editor.component.ts (불러오기)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="imports"/>

다음 단계를 따라 컴포넌트에 폼 그룹을 추가하세요.

1. `FormGroup` 인스턴스를 생성합니다.
1. `FormGroup` 모델과 뷰를 연결합니다.
1. 폼 데이터를 저장합니다.

<docs-workflow>

<a id="create-a-formgroup-instance"></a>

<docs-step title="FormGroup 인스턴스 생성하기">
컴포넌트 클래스에 `profileForm` 프로퍼티를 생성하고 새 폼 그룹 인스턴스를 할당하세요.
폼 그룹을 초기화하려면 각 컨트롤의 이름을 키로, 해당 컨트롤을 값으로 지정한 객체를 생성자에 전달합니다.

프로필 폼에는 `firstName`과 `lastName`이라는 이름의 폼 컨트롤 인스턴스 두 개를 추가하세요.

<docs-code header="profile-editor.component.ts (폼 그룹)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup"/>

이제 개별 폼 컨트롤이 하나의 그룹으로 묶였습니다.
`FormGroup` 인스턴스는 그룹에 속한 각 컨트롤의 값을 하나의 객체로 모아서 모델 값으로 제공합니다.
폼 그룹 인스턴스는 폼 컨트롤 인스턴스와 마찬가지로 `value`, `untouched` 같은 프로퍼티와 `setValue()` 같은 메서드를 제공합니다.
</docs-step>

<a id="associate-the-formgroup-model-and-view"></a>

<docs-step title="FormGroup 모델과 뷰 연결하기">
폼 그룹은 각 컨트롤의 상태와 변화를 추적합니다.
따라서 컨트롤 하나가 바뀌면 부모 컨트롤도 새로운 상태나 값의 변화를 방출합니다.
그룹의 모델은 그룹에 속한 컨트롤을 기반으로 유지됩니다.
모델을 정의했으면 템플릿을 수정해서 모델이 뷰에 반영되도록 해야 합니다.

<docs-code header="profile-editor.component.html (템플릿 폼 그룹)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroup"/>

폼 그룹이 여러 컨트롤을 묶는 것처럼, _profileForm_ `FormGroup`은 `FormGroup` 디렉티브로 `form` 엘리먼트에 바인딩됩니다.
이렇게 하면 모델과 입력 엘리먼트가 있는 폼 사이에서 정보를 주고받는 연결 계층이 만들어집니다.
`FormControlName` 디렉티브가 제공하는 `formControlName` 입력 프로퍼티는 각 입력 엘리먼트를 `FormGroup`에 정의된 폼 컨트롤과 연결합니다.
폼 컨트롤은 각자의 엘리먼트와 정보를 주고받습니다.
그리고 모델 값의 원본 데이터를 관리하는 폼 그룹 인스턴스에도 변화를 전달합니다.
</docs-step>

<a id="save-form-data"></a>

<docs-step title="폼 데이터 저장하기">
`ProfileEditor` 컴포넌트는 사용자 입력을 받지만, 실제 애플리케이션에서는 폼 값을 가져와 컴포넌트 밖에서 추가로 처리할 수 있어야 합니다.
`FormGroup` 디렉티브는 `form` 엘리먼트가 발생시키는 `submit` 이벤트를 감지하고, 콜백 함수를 바인딩할 수 있는 `ngSubmit` 이벤트를 발생시킵니다.
`form` 태그에 `ngSubmit` 이벤트 리스너를 추가하고 `onSubmit()` 메서드를 콜백으로 연결하세요.

<docs-code header="profile-editor.component.html (제출 이벤트)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="ng-submit"/>

`ProfileEditor` 컴포넌트의 `onSubmit()` 메서드는 `profileForm`의 현재 값을 가져옵니다.
`output()`을 사용하면 폼을 캡슐화하면서 컴포넌트 밖으로 폼 값을 전달할 수 있습니다.
다음 예제에서는 `console.warn`으로 브라우저 콘솔에 메시지를 출력합니다.

<docs-code header="profile-editor.component.ts (제출 메서드)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="on-submit"/>

`submit` 이벤트는 `form` 태그에서 발생하는 기본 DOM 이벤트입니다.
타입이 `submit`인 버튼을 클릭하면 이 이벤트가 발생합니다.
따라서 사용자는 **Enter** 키를 눌러 작성한 폼을 제출할 수도 있습니다.

폼을 제출할 수 있도록 폼 아래쪽에 `button` 엘리먼트로 버튼을 추가하세요.

<docs-code header="profile-editor.component.html (제출 버튼)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="submit-button"/>

위 코드의 버튼에는 `disabled` 바인딩도 연결되어 있어 `profileForm`이 유효하지 않으면 버튼이 비활성화됩니다.
아직 유효성 검사를 수행하지 않기 때문에 지금은 버튼이 항상 활성화됩니다.
기본적인 폼 유효성 검사는 [폼 입력 유효성 검사하기](#validating-form-input) 섹션에서 설명합니다.
</docs-step>

<docs-step title="컴포넌트 표시하기 {#display-the-component-form-group}">
폼이 있는 `ProfileEditor` 컴포넌트를 표시하려면 컴포넌트 템플릿에 추가하세요.

<docs-code header="app.component.html (프로필 편집기)" path="adev/src/content/examples/reactive-forms/src/app/app.component.1.html" region="app-profile-editor"/>

`ProfileEditor`에서는 폼 그룹 인스턴스 안에서 `firstName`과 `lastName` 컨트롤의 폼 컨트롤 인스턴스를 관리할 수 있습니다.
</docs-step>
</docs-workflow>

<!--
### Creating nested form groups
-->

<a id="creating-nested-form-groups"></a>

### 폼 그룹 중첩하기

<!--
Form groups can accept both individual form control instances and other form group instances as children.
This makes composing complex form models easier to maintain and logically group together.

When building complex forms, managing the different areas of information is easier in smaller sections.
Using a nested form group instance lets you break large forms groups into smaller, more manageable ones.

To make more complex forms, use the following steps.

1. Create a nested group.
1. Group the nested form in the template.

Some types of information naturally fall into the same group.
A name and address are typical examples of such nested groups, and are used in the following examples.

<docs-workflow>
<docs-step title="Create a nested group">
To create a nested group in `profileForm`, add a nested `address` element to the form group instance.

<docs-code header="profile-editor.component.ts (nested form group)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="nested-formgroup"/>

In this example, `address group` combines the current `firstName` and `lastName` controls with the new `street`, `city`, `state`, and `zip` controls. Even though the `address` element in the form group is a child of the overall `profileForm` element in the form group, the same rules apply with value and status changes. Changes in status and value from the nested form group propagate to the parent form group, maintaining consistency with the overall model.
</docs-step>

<docs-step title="Group the nested form in the template">
After you update the model in the component class, update the template to connect the form group instance and its input elements. Add the `address` form group containing the `street`, `city`, `state`, and `zip` fields to the `ProfileEditor` template.

<docs-code header="profile-editor.component.html (template nested form group)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroupname"/>

The `ProfileEditor` form is displayed as one group, but the model is broken down further to represent the logical grouping areas.

Display the value for the form group instance in the component template using the `value` property and `JsonPipe`.
</docs-step>
</docs-workflow>
-->

폼 그룹은 개별 폼 컨트롤 인스턴스뿐 아니라 다른 폼 그룹 인스턴스도 자식으로 가질 수 있습니다.
따라서 복잡한 폼 모델도 논리적으로 묶어서 구성하고 유지보수하기 쉽습니다.

복잡한 폼을 구성할 때는 정보를 작은 영역으로 나누면 관리하기 쉽습니다.
폼 그룹 인스턴스를 중첩하면 큰 폼 그룹을 관리하기 쉬운 작은 그룹으로 나눌 수 있습니다.

더 복잡한 폼을 구성하려면 다음 단계를 진행하세요.

1. 중첩 그룹을 생성합니다.
1. 템플릿에서 중첩 폼을 그룹으로 묶습니다.

일부 정보는 자연스럽게 같은 그룹으로 묶입니다.
이름과 주소는 중첩 그룹으로 묶기 좋은 대표적인 예이며, 다음 예제에서도 사용합니다.

<docs-workflow>
<a id="create-a-nested-group"></a>

<docs-step title="중첩 그룹 생성하기">
`profileForm`에 중첩 그룹을 생성하려면 폼 그룹 인스턴스에 `address` 엘리먼트를 중첩해서 추가하세요.

<docs-code header="profile-editor.component.ts (중첩 폼 그룹)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="nested-formgroup"/>

이 예제에서는 `address group`을 추가해서 기존 `firstName`, `lastName` 컨트롤과 새로운 `street`, `city`, `state`, `zip` 컨트롤을 함께 구성합니다.
폼 그룹의 `address` 엘리먼트는 전체 `profileForm` 엘리먼트의 자식이지만, 값과 상태가 바뀔 때 적용되는 규칙은 같습니다.
중첩 폼 그룹에서 상태와 값이 바뀌면 부모 폼 그룹으로 전파되기 때문에 전체 모델의 일관성이 유지됩니다.
</docs-step>

<a id="group-the-nested-form-in-the-template"></a>

<docs-step title="템플릿에서 중첩 폼을 그룹으로 묶기">
컴포넌트 클래스의 모델을 갱신했으면 폼 그룹 인스턴스와 입력 엘리먼트가 연결되도록 템플릿을 수정하세요.
`ProfileEditor` 템플릿에 `street`, `city`, `state`, `zip` 필드가 있는 `address` 폼 그룹을 추가하세요.

<docs-code header="profile-editor.component.html (템플릿 중첩 폼 그룹)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroupname"/>

`ProfileEditor` 폼은 하나의 그룹으로 표시되지만, 모델은 논리적으로 묶인 영역을 표현하도록 더 작게 나뉩니다.

컴포넌트 템플릿에서 `value` 프로퍼티와 `JsonPipe`로 폼 그룹 인스턴스의 값을 표시하세요.
</docs-step>
</docs-workflow>

<!--
### Updating parts of the data model
-->

<a id="updating-parts-of-the-data-model"></a>

### 데이터 모델 일부 갱신하기

<!--
When updating the value for a form group instance that contains multiple controls, you might only want to update parts of the model.
This section covers how to update specific parts of a form control data model.

There are two ways to update the model value:

| Methods        | Details                                                                                                                                                               |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setValue()`   | Set a new value for an individual control. The `setValue()` method strictly adheres to the structure of the form group and replaces the entire value for the control. |
| `patchValue()` | Replace any properties defined in the object that have changed in the form model.                                                                                     |

The strict checks of the `setValue()` method help catch nesting errors in complex forms, while `patchValue()` fails silently on those errors.

In `ProfileEditorComponent`, use the `updateProfile` method with the following example to update the first name and street address for the user.

<docs-code header="profile-editor.component.ts (patch value)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="patch-value"/>

Simulate an update by adding a button to the template to update the user profile on demand.

<docs-code header="profile-editor.component.html (update value)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="patch-value"/>

When a user clicks the button, the `profileForm` model is updated with new values for `firstName` and `street`. Notice that `street` is provided in an object inside the `address` property.
This is necessary because the `patchValue()` method applies the update against the model structure.
`patchValue()` only updates properties that the form model defines.
-->

컨트롤이 여러 개 있는 폼 그룹 인스턴스의 값을 갱신할 때는 모델의 일부만 갱신하고 싶을 수 있습니다.
이 섹션에서는 폼 컨트롤 데이터 모델의 특정 부분만 갱신하는 방법을 알아봅니다.

모델 값을 갱신하는 방법은 두 가지입니다.

| 메서드         | 설명                                                                                                                    |
| :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `setValue()`   | 개별 컨트롤에 새 값을 지정합니다. `setValue()` 메서드는 폼 그룹의 구조를 엄격하게 따르며 컨트롤의 값 전체를 교체합니다. |
| `patchValue()` | 전달한 객체에 정의된 프로퍼티에 해당하는 폼 모델 값을 교체합니다.                                                       |

`setValue()` 메서드는 엄격하게 검사하기 때문에 복잡한 폼의 중첩 구조에서 발생한 오류를 발견하는 데 도움이 됩니다.
반면 `patchValue()`는 이런 오류가 발생해도 알리지 않고 실패합니다.

`ProfileEditorComponent`에서 다음 예제처럼 `updateProfile` 메서드를 사용하면 사용자의 이름과 도로명 주소를 갱신할 수 있습니다.

<docs-code header="profile-editor.component.ts (값 일부 갱신)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="patch-value"/>

원할 때 사용자 프로필을 갱신해 볼 수 있도록 템플릿에 버튼을 추가하세요.

<docs-code header="profile-editor.component.html (값 갱신)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="patch-value"/>

사용자가 버튼을 클릭하면 `profileForm` 모델의 `firstName`과 `street`가 새 값으로 갱신됩니다.
`street`는 `address` 프로퍼티 안의 객체에 지정한다는 점에 주의하세요.
`patchValue()` 메서드는 모델 구조에 맞춰 변경사항을 적용하기 때문에 이 구조를 따라야 합니다.
`patchValue()`는 폼 모델에 정의된 프로퍼티만 갱신합니다.

<!--
## Using the FormBuilder service to generate controls
-->

<a id="using-the-formbuilder-service-to-generate-controls"></a>

## FormBuilder 서비스로 컨트롤 생성하기

<!--
Creating form control instances manually can become repetitive when dealing with multiple forms.
The `FormBuilder` service provides convenient methods for generating controls.

Use the following steps to take advantage of this service.

1. Import the `FormBuilder` class.
1. Inject the `FormBuilder` service.
1. Generate the form contents.

The following examples show how to refactor the `ProfileEditor` component to use the form builder service to create form control and form group instances.

<docs-workflow>
<docs-step title="Import the FormBuilder class">
Import the `FormBuilder` class from the `@angular/forms` package.

<docs-code header="profile-editor.component.ts (import)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder-imports"/>

</docs-step>

<docs-step title="Inject the FormBuilder service">
The `FormBuilder` service is an injectable provider from the reactive forms module. Use the `inject()` function to inject this dependency in your component.

<docs-code header="profile-editor.component.ts (property init)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="inject-form-builder"/>

</docs-step>
<docs-step title="Generate form controls">
The `FormBuilder` service has three methods: `control()`, `group()`, and `array()`. These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays. Use the `group` method to create the `profileForm` controls.

<docs-code header="profile-editor.component.ts (form builder)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder"/>

In the preceding example, you use the `group()` method with the same object to define the properties in the model. The value for each control name is an array containing the initial value as the first item in the array.

TIP: You can define the control with just the initial value, but if your controls need sync or async validation, add sync and async validators as the second and third items in the array. Compare using the form builder to creating the instances manually.

  <docs-code-multifile>
    <docs-code header="profile-editor.component.ts (instances)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup-compare"/>
    <docs-code header="profile-editor.component.ts (form builder)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="formgroup-compare"/>
  </docs-code-multifile>
</docs-step>

</docs-workflow>
-->

여러 폼을 다루다 보면 폼 컨트롤 인스턴스를 직접 생성하는 작업이 반복될 수 있습니다.
`FormBuilder` 서비스는 컨트롤을 간편하게 생성하는 메서드를 제공합니다.

다음 단계를 따라 이 서비스를 사용해 보세요.

1. `FormBuilder` 클래스를 불러옵니다.
1. `FormBuilder` 서비스를 의존성으로 주입합니다.
1. 폼 내용을 생성합니다.

다음 예제에서는 폼 빌더 서비스로 폼 컨트롤과 폼 그룹 인스턴스를 생성하도록 `ProfileEditor` 컴포넌트를 리팩토링합니다.

<docs-workflow>
<a id="import-the-formbuilder-class"></a>

<docs-step title="FormBuilder 클래스 불러오기">
`@angular/forms` 패키지에서 `FormBuilder` 클래스를 불러오세요.

<docs-code header="profile-editor.component.ts (불러오기)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder-imports"/>

</docs-step>

<a id="inject-the-formbuilder-service"></a>

<docs-step title="FormBuilder 서비스 주입하기">
`FormBuilder` 서비스는 반응형 폼 모듈에서 제공하는 주입 가능한 프로바이더입니다.
`inject()` 함수로 이 의존성을 컴포넌트에 주입하세요.

<docs-code header="profile-editor.component.ts (프로퍼티 초기화)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="inject-form-builder"/>

</docs-step>
<a id="generate-form-controls"></a>

<docs-step title="폼 컨트롤 생성하기">
`FormBuilder` 서비스에는 `control()`, `group()`, `array()` 메서드가 있습니다.
이 메서드는 컴포넌트 클래스에서 폼 컨트롤, 폼 그룹, 폼 배열 인스턴스를 생성하는 팩토리 메서드입니다.
`group` 메서드로 `profileForm`의 컨트롤을 생성하세요.

<docs-code header="profile-editor.component.ts (폼 빌더)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder"/>

위 예제에서는 같은 객체를 `group()` 메서드에 전달해서 모델의 프로퍼티를 정의합니다.
각 컨트롤 이름에 대응하는 값은 배열이며, 배열의 첫 번째 항목이 초기값입니다.

팁: 초기값만으로 컨트롤을 정의할 수도 있습니다.
하지만 컨트롤에 동기 또는 비동기 유효성 검사가 필요하다면 배열의 두 번째와 세 번째 항목에 각각 동기 유효성 검사기와 비동기 유효성 검사기를 추가하세요.
폼 빌더를 사용하는 방식과 인스턴스를 직접 생성하는 방식을 비교해 보세요.

  <docs-code-multifile>
    <docs-code header="profile-editor.component.ts (인스턴스)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup-compare"/>
    <docs-code header="profile-editor.component.ts (폼 빌더)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="formgroup-compare"/>
  </docs-code-multifile>
</docs-step>

</docs-workflow>

<!--
## Validating form input
-->

<a id="validating-form-input"></a>

## 폼 입력 유효성 검사하기

<!--
_Form validation_ is used to ensure that user input is complete and correct.
This section covers adding a single validator to a form control and displaying the overall form status.
Form validation is covered more extensively in the [Form Validation](guide/forms/form-validation) guide.

Use the following steps to add form validation.

1. Import a validator function in your form component.
1. Add the validator to the field in the form.
1. Add logic to handle the validation status.

The most common validation is making a field required.
The following example shows how to add a required validation to the `firstName` control and display the result of validation.

<docs-workflow>
<docs-step title="Import a validator function">
Reactive forms include a set of validator functions for common use cases. These functions receive a control to validate against and return an error object or a null value based on the validation check.

Import the `Validators` class from the `@angular/forms` package.

<docs-code header="profile-editor.component.ts (import)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="validator-imports"/>
</docs-step>

<docs-step title="Make a field required">
In the `ProfileEditor` component, add the `Validators.required` static method as the second item in the array for the `firstName` control.

<docs-code header="profile-editor.component.ts (required validator)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="required-validator"/>
</docs-step>

<docs-step title="Display form status">
When you add a required field to the form control, its initial status is invalid. This invalid status propagates to the parent form group element, making its status invalid. Access the current status of the form group instance through its `status` property.

Display the current status of `profileForm` using interpolation.

<docs-code header="profile-editor.component.html (display status)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="display-status"/>

The **Submit** button is disabled because `profileForm` is invalid due to the required `firstName` form control. After you fill out the `firstName` input, the form becomes valid and the **Submit** button is enabled.

For more on form validation, visit the [Form Validation](guide/forms/form-validation) guide.
</docs-step>
</docs-workflow>
-->

*폼 유효성 검사*는 사용자 입력이 빠짐없이 올바르게 작성되었는지 확인할 때 사용합니다.
이 섹션에서는 폼 컨트롤에 유효성 검사기 하나를 추가하고 전체 폼 상태를 표시하는 방법을 알아봅니다.
폼 유효성 검사에 관한 더 자세한 내용은 [폼 유효성 검사](guide/forms/form-validation) 문서를 참고하세요.

폼 유효성 검사를 추가하려면 다음 단계를 진행하세요.

1. 폼 컴포넌트에 유효성 검사 함수를 불러옵니다.
1. 폼의 필드에 유효성 검사기를 추가합니다.
1. 유효성 검사 상태를 처리하는 로직을 추가합니다.

가장 흔한 유효성 검사는 필드를 필수로 지정하는 것입니다.
다음 예제에서는 `firstName` 컨트롤에 필수 입력 검사를 추가하고 유효성 검사 결과를 표시합니다.

<docs-workflow>
<a id="import-a-validator-function"></a>

<docs-step title="유효성 검사 함수 불러오기">
반응형 폼에는 자주 사용하는 유효성 검사 함수가 포함되어 있습니다.
이 함수는 검사할 컨트롤을 인자로 받아 유효성 검사 결과에 따라 오류 객체나 null 값을 반환합니다.

`@angular/forms` 패키지에서 `Validators` 클래스를 불러오세요.

<docs-code header="profile-editor.component.ts (불러오기)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="validator-imports"/>
</docs-step>

<a id="make-a-field-required"></a>

<docs-step title="필수 필드 지정하기">
`ProfileEditor` 컴포넌트에서 `firstName` 컨트롤 배열의 두 번째 항목에 `Validators.required` 정적 메서드를 추가하세요.

<docs-code header="profile-editor.component.ts (필수 입력 검사기)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="required-validator"/>
</docs-step>

<a id="display-form-status"></a>

<docs-step title="폼 상태 표시하기">
폼 컨트롤에 필수 필드를 추가하면 초기 상태는 유효하지 않은 상태입니다.
이 상태는 부모 폼 그룹 엘리먼트로 전파되기 때문에 부모도 유효하지 않은 상태가 됩니다.
폼 그룹 인스턴스의 현재 상태는 `status` 프로퍼티로 확인할 수 있습니다.

문자열 바인딩으로 `profileForm`의 현재 상태를 표시하세요.

<docs-code header="profile-editor.component.html (상태 표시)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="display-status"/>

필수 폼 컨트롤인 `firstName` 때문에 `profileForm`이 유효하지 않으므로 **Submit** 버튼은 비활성화됩니다.
`firstName` 입력란을 채우면 폼이 유효한 상태가 되고 **Submit** 버튼이 활성화됩니다.

폼 유효성 검사가 더 궁금하면 [폼 유효성 검사](guide/forms/form-validation) 문서를 참고하세요.
</docs-step>
</docs-workflow>

<!--
## Creating dynamic forms
-->

<a id="creating-dynamic-forms"></a>

## 동적 폼 만들기

<!--
`FormArray` is an alternative to `FormGroup` for managing any number of unnamed controls.
As with form group instances, you can dynamically insert and remove controls from form array instances, and the form array instance value and validation status is calculated from its child controls.
However, you don't need to define a key for each control by name, so this is a great option if you don't know the number of child values in advance.

To define a dynamic form, take the following steps.

1. Import the `FormArray` class.
1. Define a `FormArray` control.
1. Access the `FormArray` control with a getter method.
1. Display the form array in a template.

The following example shows you how to manage an array of _aliases_ in `ProfileEditor`.

<docs-workflow>
<docs-step title="Import the `FormArray` class">
Import the `FormArray` class from `@angular/forms` to use for type information. The `FormBuilder` service is ready to create a `FormArray` instance.

<docs-code header="profile-editor.component.ts (import)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-array-imports"/>
</docs-step>

<docs-step title="Define a `FormArray` control">
You can initialize a form array with any number of controls, from zero to many, by defining them in an array. Add an `aliases` property to the form group instance for `profileForm` to define the form array.

Use the `FormBuilder.array()` method to define the array, and the `FormBuilder.control()` method to populate the array with an initial control.

<docs-code header="profile-editor.component.ts (aliases form array)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases"/>

The aliases control in the form group instance is now populated with a single control until more controls are added dynamically.
</docs-step>

<docs-step title="Access the `FormArray` control">
A getter provides access to the aliases in the form array instance compared to repeating the `profileForm.get()` method to get each instance. The form array instance represents an undefined number of controls in an array. It's convenient to access a control through a getter, and this approach is straightforward to repeat for additional controls. <br />

Use the getter syntax to create an `aliases` class property to retrieve the alias's form array control from the parent form group.

<docs-code header="profile-editor.component.ts (aliases getter)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases-getter"/>

Because the returned control is of the type `AbstractControl`, you need to provide an explicit type to access the method syntax for the form array instance. Define a method to dynamically insert an alias control into the alias's form array. The `FormArray.push()` method inserts the control as a new item in the array, and you can also pass an array of controls to FormArray.push() to register multiple controls at once.

<docs-code header="profile-editor.component.ts (add alias)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="add-alias"/>

In the template, each control is displayed as a separate input field.

</docs-step>

<docs-step title="Display the form array in the template">

To attach the aliases from your form model, you must add it to the template. Similar to the `formGroupName` input provided by `FormGroupName`, `formArrayName` binds communication from the form array instance to the template with `FormArrayName`.

Add the following template HTML after the `<div>` closing the `formGroupName` element.

<docs-code header="profile-editor.component.html (aliases form array template)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="formarrayname"/>

The `@for` block iterates over each form control instance provided by the aliases form array instance. Because form array elements are unnamed, you assign the index to the `i` variable and pass it to each control to bind it to the `formControlName` input.

Each time a new alias instance is added, the new form array instance is provided its control based on the index. This lets you track each individual control when calculating the status and value of the root control.

NOTE: In zoneless applications, mutating a reactive forms model (for example calling `FormArray.push()`) does not automatically schedule component change detection. If your template depends on structural model changes such as `aliases.controls`, make sure the component notifies Angular to run change detection, for example by bridging a forms observable to `ChangeDetectorRef.markForCheck()`:

```ts
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({/* ... */})
export class ProfileEditor {
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.cdr.markForCheck());
  }
}
```

</docs-step>
-->

`FormArray`는 이름이 없는 컨트롤을 개수 제한 없이 관리할 때 `FormGroup` 대신 사용할 수 있습니다.
폼 그룹 인스턴스와 마찬가지로 폼 배열 인스턴스에도 컨트롤을 동적으로 추가하거나 제거할 수 있습니다.
폼 배열 인스턴스의 값과 유효성 검사 상태는 자식 컨트롤을 기준으로 계산됩니다.
하지만 각 컨트롤에 이름으로 된 키를 정의하지 않아도 되기 때문에 자식 값의 개수를 미리 알 수 없을 때 유용합니다.

동적 폼을 정의하려면 다음 단계를 진행하세요.

1. `FormArray` 클래스를 불러옵니다.
1. `FormArray` 컨트롤을 정의합니다.
1. getter 메서드로 `FormArray` 컨트롤에 접근합니다.
1. 템플릿에 폼 배열을 표시합니다.

다음 예제는 `ProfileEditor`에서 _별칭(aliases)_ 배열을 관리하는 방법입니다.

<docs-workflow>
<a id="import-the-formarray-class"></a>

<docs-step title="`FormArray` 클래스 불러오기">
타입 정보로 사용할 `FormArray` 클래스를 `@angular/forms`에서 불러오세요.
`FormBuilder` 서비스는 `FormArray` 인스턴스를 생성할 준비가 되어 있습니다.

<docs-code header="profile-editor.component.ts (불러오기)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-array-imports"/>
</docs-step>

<a id="define-a-formarray-control"></a>

<docs-step title="`FormArray` 컨트롤 정의하기">
배열에 컨트롤을 정의하면 컨트롤이 없는 폼 배열부터 여러 컨트롤이 있는 폼 배열까지 원하는 개수로 초기화할 수 있습니다.
`profileForm`의 폼 그룹 인스턴스에 `aliases` 프로퍼티를 추가해서 폼 배열을 정의하세요.

`FormBuilder.array()` 메서드로 배열을 정의하고, `FormBuilder.control()` 메서드로 배열에 초기 컨트롤을 추가하세요.

<docs-code header="profile-editor.component.ts (별칭 폼 배열)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases"/>

이제 폼 그룹 인스턴스의 aliases 컨트롤에는 컨트롤이 하나 들어 있습니다.
이후에 컨트롤을 동적으로 더 추가할 수 있습니다.
</docs-step>

<a id="access-the-formarray-control"></a>

<docs-step title="`FormArray` 컨트롤에 접근하기">
각 인스턴스를 가져올 때마다 `profileForm.get()` 메서드를 호출하는 대신 getter로 폼 배열 인스턴스의 별칭에 접근할 수 있습니다.
폼 배열 인스턴스는 개수가 정해지지 않은 컨트롤을 배열로 표현합니다.
getter를 사용하면 컨트롤에 편리하게 접근할 수 있고, 다른 컨트롤에도 같은 방식을 간단하게 적용할 수 있습니다. <br />

getter 문법으로 `aliases` 클래스 프로퍼티를 생성해서 부모 폼 그룹에서 별칭의 폼 배열 컨트롤을 가져오세요.

<docs-code header="profile-editor.component.ts (별칭 getter)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases-getter"/>

반환되는 컨트롤의 타입은 `AbstractControl`이기 때문에 폼 배열 인스턴스의 메서드를 사용하려면 타입을 명시해야 합니다.
별칭의 폼 배열에 별칭 컨트롤을 동적으로 추가하는 메서드를 정의하세요.
`FormArray.push()` 메서드는 컨트롤을 배열의 새 항목으로 추가합니다.
FormArray.push()에 컨트롤 배열을 전달하면 여러 컨트롤을 한 번에 등록할 수도 있습니다.

<docs-code header="profile-editor.component.ts (별칭 추가)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="add-alias"/>

템플릿에서는 각 컨트롤이 개별 입력 필드로 표시됩니다.

</docs-step>

<a id="display-the-form-array-in-the-template"></a>

<docs-step title="템플릿에 폼 배열 표시하기">

폼 모델의 별칭을 연결하려면 템플릿에 추가해야 합니다.
`FormGroupName`이 제공하는 `formGroupName` 입력 프로퍼티와 비슷하게, `formArrayName`은 `FormArrayName`을 통해 폼 배열 인스턴스와 템플릿을 연결합니다.

`formGroupName` 엘리먼트를 닫는 `<div>` 뒤에 다음 템플릿 HTML을 추가하세요.

<docs-code header="profile-editor.component.html (별칭 폼 배열 템플릿)" path="adev/src/content/examples/reactive-forms/src/app/profile-editor/profile-editor.component.html" region="formarrayname"/>

`@for` 블록은 aliases 폼 배열 인스턴스에 있는 폼 컨트롤 인스턴스를 하나씩 순회합니다.
폼 배열의 항목에는 이름이 없기 때문에 인덱스를 `i` 변수에 할당한 다음 각 컨트롤에 전달해서 `formControlName` 입력 프로퍼티에 바인딩합니다.

새 별칭 인스턴스가 추가될 때마다 새 폼 배열 인스턴스에는 인덱스를 기준으로 컨트롤이 연결됩니다.
따라서 최상위 컨트롤의 상태와 값을 계산할 때 각 컨트롤을 추적할 수 있습니다.

참고: 존리스 애플리케이션에서 반응형 폼 모델을 변경해도(예: `FormArray.push()` 호출) 컴포넌트 변경 감지가 자동으로 예약되지는 않습니다.
템플릿이 `aliases.controls`처럼 모델 구조의 변화에 의존한다면, 컴포넌트가 Angular에 변경 감지 실행을 알리도록 해야 합니다.
예를 들어 폼 옵저버블을 `ChangeDetectorRef.markForCheck()`와 연결할 수 있습니다.

```ts
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({/* ... */})
export class ProfileEditor {
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.cdr.markForCheck());
  }
}
```

</docs-step>

<!--
### Using `FormArrayDirective` for top-level form arrays
-->

<a id="using-formarraydirective-for-top-level-form-arrays"></a>

### 최상위 폼 배열에 `FormArrayDirective` 사용하기

<!--
You can bind a `FormArray` directly to a `<form>` element by using the `FormArrayDirective`.
This is useful when the form does not use a top-level `FormGroup`, and the array itself represents the full form model.

```angular-ts
import {Component} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'form-array-example',
  template: `
    <form [formArray]="form">
      @for (control of form.controls; track $index) {
        <input [formControlName]="$index" />
      }
    </form>
  `,
})
export class FormArrayExampleComponent {
  controls = [new FormControl('fish'), new FormControl('cat'), new FormControl('dog')];

  form = new FormArray(this.controls);
}
```

<docs-step title="Add an alias">

Initially, the form contains one `Alias` field. To add another field, click the **Add Alias** button. You can also validate the array of aliases reported by the form model displayed by `Form Value` at the bottom of the template. Instead of a form control instance for each alias, you can compose another form group instance with additional fields. The process of defining a control for each item is the same.
</docs-step>

</docs-workflow>
-->

`FormArrayDirective`를 사용하면 `FormArray`를 `<form>` 엘리먼트에 직접 바인딩할 수 있습니다.  
최상위 `FormGroup` 없이 배열 자체가 전체 폼 모델을 나타내는 경우에 유용합니다.

```angular-ts
import {Component} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'form-array-example',
  template: `
    <form [formArray]="form">
      @for (control of form.controls; track $index) {
        <input [formControlName]="$index" />
      }
    </form>
  `,
})
export class FormArrayExampleComponent {
  controls = [new FormControl('fish'), new FormControl('cat'), new FormControl('dog')];

  form = new FormArray(this.controls);
}
```

<a id="add-an-alias"></a>

<docs-step title="별칭 추가하기">

처음에는 폼에 `Alias` 필드가 하나 있습니다.
필드를 추가하려면 **Add Alias** 버튼을 클릭하세요.
템플릿 아래쪽의 `Form Value`에 표시된 폼 모델을 통해 별칭 배열을 확인할 수도 있습니다.
별칭마다 폼 컨트롤 인스턴스를 사용하는 대신, 추가 필드가 있는 다른 폼 그룹 인스턴스를 구성할 수도 있습니다.
각 항목의 컨트롤을 정의하는 과정은 같습니다.
</docs-step>

</docs-workflow>

<!--
## Unified control state change events
-->

<a id="unified-control-state-change-events"></a>

## 통합 컨트롤 상태 변경 이벤트

<!--
All form controls expose a single unified stream of **control state change events** through the `events` observable on `AbstractControl` (`FormControl`, `FormGroup`, `FormArray`, and `FormRecord`).
This unified stream lets you react to **value**, **status**, **pristine**, **touched**, and **reset** state changes, as well as **form-level actions** such as **submit**, allowing you to handle all updates with a single subscription instead of wiring multiple observables.
-->

모든 폼 컨트롤은 `AbstractControl`(`FormControl`, `FormGroup`, `FormArray`, `FormRecord`)의 `events` 옵저버블을 통해 **컨트롤 상태 변경 이벤트**를 하나의 통합 스트림으로 제공합니다.
이 통합 스트림을 사용하면 **값**, **상태**, **pristine**, **touched**, **초기화** 상태의 변화뿐 아니라 **제출** 같은 **폼 수준의 동작**에도 대응할 수 있습니다.
여러 옵저버블을 연결하는 대신 한 번의 구독으로 모든 갱신을 처리할 수 있습니다.

<!--
### Event types
-->

<a id="event-types"></a>

### 이벤트 타입

<!--
Each item emitted by `events` is an instance of a specific event class:

- **`ValueChangeEvent`** — when the control’s **value** changes.
- **`StatusChangeEvent`** — when the control’s **validation status** updates to one of the `FormControlStatus` values (`VALID`, `INVALID`, `PENDING`, or `DISABLED`).
- **`PristineChangeEvent`** — when the control’s **pristine/dirty** state changes.
- **`TouchedChangeEvent`** — when the control’s **touched/untouched** state changes.
- **`FormResetEvent`** — when a control or form is reset, either via the `reset()` API or a native action.
- **`FormSubmittedEvent`** — when the form is submitted.

All event classes extend `ControlEvent` and include a `source` reference to the `AbstractControl` that originated the change, which is useful in large forms.

```ts
import {Component} from '@angular/core';
import {
  FormControl,
  ValueChangeEvent,
  StatusChangeEvent,
  PristineChangeEvent,
  TouchedChangeEvent,
  FormResetEvent,
  FormSubmittedEvent,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component(/* ... */)
export class UnifiedEventsBasicComponent {
  form = new FormGroup({
    username: new FormControl(''),
  });

  constructor() {
    this.form.events.subscribe((e) => {
      if (e instanceof ValueChangeEvent) {
        console.log('Value changed to: ', e.value);
      }

      if (e instanceof StatusChangeEvent) {
        console.log('Status changed to: ', e.status);
      }

      if (e instanceof PristineChangeEvent) {
        console.log('Pristine status changed to: ', e.pristine);
      }

      if (e instanceof TouchedChangeEvent) {
        console.log('Touched status changed to: ', e.touched);
      }

      if (e instanceof FormResetEvent) {
        console.log('Form was reset');
      }

      if (e instanceof FormSubmittedEvent) {
        console.log('Form was submitted');
      }
    });
  }
}
```
-->

`events`가 방출하는 각 항목은 특정 이벤트 클래스의 인스턴스입니다.

- **`ValueChangeEvent`** — 컨트롤의 **값**이 바뀔 때 발생합니다.
- **`StatusChangeEvent`** — 컨트롤의 **유효성 검사 상태**가 `FormControlStatus` 값(`VALID`, `INVALID`, `PENDING`, `DISABLED`) 중 하나로 갱신될 때 발생합니다.
- **`PristineChangeEvent`** — 컨트롤의 **pristine/dirty** 상태가 바뀔 때 발생합니다.
- **`TouchedChangeEvent`** — 컨트롤의 **touched/untouched** 상태가 바뀔 때 발생합니다.
- **`FormResetEvent`** — `reset()` API나 기본 동작으로 컨트롤 또는 폼이 초기화될 때 발생합니다.
- **`FormSubmittedEvent`** — 폼이 제출될 때 발생합니다.

모든 이벤트 클래스는 `ControlEvent`를 상속하며, 변화가 시작된 `AbstractControl`을 가리키는 `source` 참조를 포함합니다.
이 참조는 큰 폼을 다룰 때 유용합니다.

```ts
import {Component} from '@angular/core';
import {
  FormControl,
  ValueChangeEvent,
  StatusChangeEvent,
  PristineChangeEvent,
  TouchedChangeEvent,
  FormResetEvent,
  FormSubmittedEvent,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component(/* ... */)
export class UnifiedEventsBasicComponent {
  form = new FormGroup({
    username: new FormControl(''),
  });

  constructor() {
    this.form.events.subscribe((e) => {
      if (e instanceof ValueChangeEvent) {
        console.log('Value changed to: ', e.value);
      }

      if (e instanceof StatusChangeEvent) {
        console.log('Status changed to: ', e.status);
      }

      if (e instanceof PristineChangeEvent) {
        console.log('Pristine status changed to: ', e.pristine);
      }

      if (e instanceof TouchedChangeEvent) {
        console.log('Touched status changed to: ', e.touched);
      }

      if (e instanceof FormResetEvent) {
        console.log('Form was reset');
      }

      if (e instanceof FormSubmittedEvent) {
        console.log('Form was submitted');
      }
    });
  }
}
```

<!--
### Filtering specific events
-->

<a id="filtering-specific-events"></a>

### 특정 이벤트 필터링하기

<!--
Prefer RxJS operators when you only need a subset of event types.

```ts
import {filter} from 'rxjs/operators';
import {StatusChangeEvent} from '@angular/forms';

control.events
  .pipe(filter((e) => e instanceof StatusChangeEvent))
  .subscribe((e) => console.log('Status:', e.status));
```
-->

일부 이벤트 타입만 필요하다면 RxJS 연산자를 사용하는 것이 좋습니다.

```ts
import {filter} from 'rxjs/operators';
import {StatusChangeEvent} from '@angular/forms';

control.events
  .pipe(filter((e) => e instanceof StatusChangeEvent))
  .subscribe((e) => console.log('Status:', e.status));
```

<!--
### Unifying from multiple subscriptions
-->

<a id="unifying-from-multiple-subscriptions"></a>

### 여러 구독을 하나로 통합하기

<!--
**Before**

```ts
import {combineLatest} from 'rxjs';

combineLatest([control.valueChanges, control.statusChanges]).subscribe(([value, status]) => {
  /* ... */
});
```

**After**

```ts
control.events.subscribe((e) => {
  // Handle ValueChangeEvent, StatusChangeEvent, etc.
});
```

NOTE: On value change, the emit happens right after a value of this control is updated. The value of a parent control (for example if this FormControl is a part of a FormGroup) is updated later, so accessing a value of a parent control (using the `value` property) from the callback of this event might result in getting a value that has not been updated yet. Subscribe to the `events` of the parent control instead.
-->

**변경 전**

```ts
import {combineLatest} from 'rxjs';

combineLatest([control.valueChanges, control.statusChanges]).subscribe(([value, status]) => {
  /* ... */
});
```

**변경 후**

```ts
control.events.subscribe((e) => {
  // ValueChangeEvent, StatusChangeEvent 등의 이벤트를 처리합니다.
});
```

참고: 값 변경 이벤트는 해당 컨트롤의 값이 갱신된 직후에 방출됩니다.
부모 컨트롤의 값(예: 이 FormControl이 FormGroup에 속한 경우)은 나중에 갱신됩니다.
따라서 이 이벤트의 콜백에서 부모 컨트롤의 `value` 프로퍼티에 접근하면 아직 갱신되지 않은 값을 가져올 수 있습니다.
이런 경우에는 부모 컨트롤의 `events`를 구독하세요.

<!--
## Managing form control state
-->

<a id="managing-form-control-state"></a>

## 폼 컨트롤 상태 관리하기

<!--
Reactive forms track control state through **touched/untouched** and **pristine/dirty**. Angular updates these automatically during DOM interactions, but you can also manage them programmatically.

**[`markAsTouched`](api/forms/FormControl#markAsTouched)** — Marks a control or form as touched by focus and blur events that do not change the value. Propagates to parent controls by default.

```ts
// Show validation errors after user leaves a field
onEmailBlur() {
  const email = this.form.get('email');
  email.markAsTouched();
}
```

**[`markAsUntouched`](api/forms/FormControl#markAsUntouched)** — Marks a control or form as untouched. Cascades to all child controls and recalculates the touched status of all parent controls.

```ts
// Reset form state after successful submission
onSubmitSuccess() {
  this.form.markAsUntouched();
  this.form.markAsPristine();
}
```

**[`markAsDirty`](api/forms/FormControl#markAsDirty)** — Marks a control or form as dirty, meaning the value has been changed. Propagates to parent controls by default.

```ts
// Mark programmatically changed values as modified
autofillAddress() {
  const previousAddress = getAddress();
  this.form.patchValue(previousAddress, { emitEvent: false });
  this.form.markAsDirty();
}
```

**[`markAsPristine`](api/forms/FormControl#markAsPristine)** — Marks a control or form as pristine. Marks all child controls as pristine and recalculates the pristine status of all parent controls.

```ts
// Reset pristine state after saving to track new changes
saveForm() {
  this.api.save(this.form.value).subscribe(() => {
    this.form.markAsPristine();
  });
}
```

**[`markAllAsDirty`](api/forms/FormControl#markAllAsDirty)** — Marks the control or form and all its descendant controls as dirty.

```ts
// Mark imported data as dirty
loadData(data: FormData) {
  this.form.patchValue(data);
  this.form.markAllAsDirty();
}
```

**[`markAllAsTouched`](api/forms/FormControl#markAllAsTouched)** — Marks the control or form and all its descendant controls as touched. Useful for showing validation errors across the entire form.

```ts
// Show all validation errors before submission
onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.saveForm();
}
```
-->

반응형 폼은 **touched/untouched**와 **pristine/dirty**로 컨트롤 상태를 추적합니다.
Angular는 DOM 상호작용이 발생하면 이 상태를 자동으로 갱신하지만, 코드로 직접 관리할 수도 있습니다.

**[`markAsTouched`](api/forms/FormControl#markAsTouched)** — 값을 바꾸지 않는 focus와 blur 이벤트로 상호작용한 상태를 나타내도록 컨트롤이나 폼을 touched로 표시합니다.
기본적으로 부모 컨트롤로 전파됩니다.

```ts
// 사용자가 필드에서 벗어나면 유효성 검사 에러를 표시합니다.
onEmailBlur() {
  const email = this.form.get('email');
  email.markAsTouched();
}
```

**[`markAsUntouched`](api/forms/FormControl#markAsUntouched)** — 컨트롤이나 폼을 untouched로 표시합니다.
모든 자식 컨트롤에 적용되고, 모든 부모 컨트롤의 touched 상태를 다시 계산합니다.

```ts
// 제출에 성공하면 폼 상태를 초기화합니다.
onSubmitSuccess() {
  this.form.markAsUntouched();
  this.form.markAsPristine();
}
```

**[`markAsDirty`](api/forms/FormControl#markAsDirty)** — 값이 변경되었다는 의미로 컨트롤이나 폼을 dirty로 표시합니다.
기본적으로 부모 컨트롤로 전파됩니다.

```ts
// 코드로 바꾼 값을 변경된 상태로 표시합니다.
autofillAddress() {
  const previousAddress = getAddress();
  this.form.patchValue(previousAddress, { emitEvent: false });
  this.form.markAsDirty();
}
```

**[`markAsPristine`](api/forms/FormControl#markAsPristine)** — 컨트롤이나 폼을 pristine으로 표시합니다.
모든 자식 컨트롤을 pristine으로 표시하고, 모든 부모 컨트롤의 pristine 상태를 다시 계산합니다.

```ts
// 저장 후 pristine 상태를 초기화해서 새로운 변경사항을 추적합니다.
saveForm() {
  this.api.save(this.form.value).subscribe(() => {
    this.form.markAsPristine();
  });
}
```

**[`markAllAsDirty`](api/forms/FormControl#markAllAsDirty)** — 컨트롤이나 폼과 그 아래에 있는 모든 하위 컨트롤을 dirty로 표시합니다.

```ts
// 가져온 데이터를 dirty 상태로 표시합니다.
loadData(data: FormData) {
  this.form.patchValue(data);
  this.form.markAllAsDirty();
}
```

**[`markAllAsTouched`](api/forms/FormControl#markAllAsTouched)** — 컨트롤이나 폼과 그 아래에 있는 모든 하위 컨트롤을 touched로 표시합니다.
전체 폼의 유효성 검사 오류를 표시할 때 유용합니다.

```ts
// 제출하기 전에 모든 유효성 검사 에러를 표시합니다.
onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.saveForm();
}
```

<!--
## Controlling event emission and propagation
-->

<a id="controlling-event-emission-and-propagation"></a>

## 이벤트 방출과 전파 제어하기

<!--
When updating form controls programmatically, you have precise control over how changes propagate through the form hierarchy and whether events are emitted.
-->

폼 컨트롤을 코드로 갱신할 때는 변화가 폼 계층에 전파되는 방식과 이벤트 방출 여부를 세밀하게 제어할 수 있습니다.

<!--
### Understanding event emission
-->

<a id="understanding-event-emission"></a>

### 이벤트 방출 이해하기

<!--
By default `emitEvent: true`, any change to a control emits events through the `valueChanges` and `statusChanges` observables. Setting `emitEvent: false` suppresses these emissions, which is useful when setting values programmatically without triggering reactive behavior like auto-save, avoiding circular updates between controls, or performing bulk updates where events should emit only once at the end.

```ts
@Component({/* ... */})
export class BlogPostEditor {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor() {
    // Auto-save draft every time user types
    this.postForm.valueChanges.subscribe((formValue) => {
      this.autosaveDraft(formValue);
    });
  }

  loadExistingDraft(savedDraft: {title: string; content: string}) {
    // Restore draft without triggering auto-save
    this.postForm.setValue(savedDraft, {emitEvent: false});
  }
}
```
-->

기본값은 `emitEvent: true`이므로 컨트롤이 바뀔 때마다 `valueChanges`와 `statusChanges` 옵저버블에서 이벤트가 방출됩니다.
`emitEvent: false`로 설정하면 이 이벤트가 방출되지 않습니다.
자동 저장 같은 반응형 동작을 실행하지 않고 코드로 값을 설정하거나, 컨트롤 사이의 순환 갱신을 방지하거나, 일괄 갱신이 끝날 때 이벤트를 한 번만 방출하려는 경우에 유용합니다.

```ts
@Component({/* ... */})
export class BlogPostEditor {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor() {
    // 사용자가 입력할 때마다 초안을 자동으로 저장합니다.
    this.postForm.valueChanges.subscribe((formValue) => {
      this.autosaveDraft(formValue);
    });
  }

  loadExistingDraft(savedDraft: {title: string; content: string}) {
    // 자동 저장을 실행하지 않고 초안을 복원합니다.
    this.postForm.setValue(savedDraft, {emitEvent: false});
  }
}
```

<!--
### Understanding propagation control
-->

<a id="understanding-propagation-control"></a>

### 전파 제어 이해하기

<!--
By default `onlySelf: false`, updates cascade to parent controls, recalculating their values and validation status. Setting `onlySelf: true` isolates the update to the current control, preventing parent notification. This is useful for batch operations where you want to manually trigger the parent update once.

```ts
updatePostalCodeValidator(country: string) {
  const postal = this.addressForm.get('postalCode');

  const validators = country === 'US'
    ? [Validators.maxLength(5)]
    : [Validators.maxLength(7)];

  postal.setValidators(validators);
  postal.updateValueAndValidity({ onlySelf: true, emitEvent: false });
}
```

HELPFUL: For dynamically managing validators at runtime, see the [Managing validators dynamically in reactive forms](guide/forms/form-validation#managing-validators-dynamically-in-reactive-forms) section in the Form Validation guide.
-->

기본값은 `onlySelf: false`이므로 갱신이 부모 컨트롤로 전파되어 부모의 값과 유효성 검사 상태도 다시 계산됩니다.
`onlySelf: true`로 설정하면 현재 컨트롤만 갱신하고 부모에게 알리지 않습니다.
일괄 작업이 끝난 뒤 부모의 갱신을 직접 한 번만 실행하고 싶을 때 유용합니다.

```ts
updatePostalCodeValidator(country: string) {
  const postal = this.addressForm.get('postalCode');

  const validators = country === 'US'
    ? [Validators.maxLength(5)]
    : [Validators.maxLength(7)];

  postal.setValidators(validators);
  postal.updateValueAndValidity({ onlySelf: true, emitEvent: false });
}
```

참고: 실행 중에 유효성 검사기를 동적으로 관리하는 방법은 폼 유효성 검사 문서의 [반응형 폼에서 유효성 검사기 동적으로 관리하기](guide/forms/form-validation#managing-validators-dynamically-in-reactive-forms) 섹션을 참고하세요.

<!--
## Utility functions for narrowing form control types
-->

<a id="utility-functions-for-narrowing-form-control-types"></a>

## 폼 컨트롤 타입을 좁히는 유틸리티 함수

<!--
Angular provides four utility functions that help determine the concrete type of an `AbstractControl`. These functions act as **type guards** and narrow the control type when they return `true`, which lets you safely access subtype-specific properties inside the same block.

| Utility function | Details                                             |
| :--------------- | :-------------------------------------------------- |
| `isFormControl`  | Returns `true` when the control is a `FormControl`. |
| `isFormGroup`    | Returns `true` when the control is a `FormGroup`    |
| `isFormRecord`   | Returns `true` when the control is a `FormRecord`   |
| `isFormArray`    | Returns `true` when the control is a `FormArray`    |

These helpers are particularly useful in **custom validators**, where the function signature receives an `AbstractControl`, but the logic is intended for a specific control kind.

```ts
import {AbstractControl, isFormArray} from '@angular/forms';

export function positiveValues(control: AbstractControl) {
  if (!isFormArray(control)) {
    return null; // Not a FormArray: validator is not applicable.
  }

  // Safe to access FormArray-specific API after narrowing.
  const hasNegative = control.controls.some((c) => c.value < 0);
  return hasNegative ? {positiveValues: true} : null;
}
```
-->

Angular는 `AbstractControl`의 구체적인 타입을 확인하는 유틸리티 함수 네 개를 제공합니다.
이 함수는 **타입 가드**로 동작하며, `true`를 반환하면 컨트롤의 타입이 좁혀집니다.
따라서 같은 블록 안에서 하위 타입에만 있는 프로퍼티에도 안전하게 접근할 수 있습니다.

| 유틸리티 함수   | 설명                                            |
| :-------------- | :---------------------------------------------- |
| `isFormControl` | 컨트롤이 `FormControl`이면 `true`를 반환합니다. |
| `isFormGroup`   | 컨트롤이 `FormGroup`이면 `true`를 반환합니다.   |
| `isFormRecord`  | 컨트롤이 `FormRecord`이면 `true`를 반환합니다.  |
| `isFormArray`   | 컨트롤이 `FormArray`이면 `true`를 반환합니다.   |

이 함수는 **커스텀 유효성 검사기**에서 특히 유용합니다.
함수 시그니처는 `AbstractControl`을 받지만, 실제 로직은 특정 종류의 컨트롤을 처리하도록 작성하는 경우가 있기 때문입니다.

```ts
import {AbstractControl, isFormArray} from '@angular/forms';

export function positiveValues(control: AbstractControl) {
  if (!isFormArray(control)) {
    return null; // FormArray가 아니므로 이 유효성 검사기를 적용하지 않습니다.
  }

  // 타입을 좁힌 뒤에는 FormArray 전용 API에 안전하게 접근할 수 있습니다.
  const hasNegative = control.controls.some((c) => c.value < 0);
  return hasNegative ? {positiveValues: true} : null;
}
```

<!--
## Reactive forms API summary
-->

<a id="reactive-forms-api-summary"></a>

## 반응형 폼 API 요약

<!--
The following table lists the base classes and services used to create and manage reactive form controls.
For complete syntax details, see the API reference documentation for the [Forms package](api#angular_forms 'API reference').
-->

다음 표는 반응형 폼 컨트롤을 생성하고 관리하는 데 사용하는 기반 클래스와 서비스를 정리한 것입니다.
자세한 문법은 [Forms 패키지](api#angular_forms 'API 레퍼런스')의 API 레퍼런스를 참고하세요.

<!--
### Classes
-->

<a id="classes"></a>

### 클래스

<!--
| Class             | Details                                                                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AbstractControl` | The abstract base class for the concrete form control classes `FormControl`, `FormGroup`, and `FormArray`. It provides their common behaviors and properties.                           |
| `FormControl`     | Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as `<input>` or `<select>`.                                            |
| `FormGroup`       | Manages the value and validity state of a group of `AbstractControl` instances. The group's properties include its child controls. The top-level form in your component is `FormGroup`. |
| `FormArray`       | Manages the value and validity state of a numerically indexed array of `AbstractControl` instances.                                                                                     |
| `FormBuilder`     | An injectable service that provides factory methods for creating control instances.                                                                                                     |
| `FormRecord`      | Tracks the value and validity state of a collection of `FormControl` instances, each of which has the same value type.                                                                  |
-->

| 클래스            | 설명                                                                                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AbstractControl` | 구체적인 폼 컨트롤 클래스인 `FormControl`, `FormGroup`, `FormArray`의 추상 기반 클래스입니다. 공통 동작과 프로퍼티를 제공합니다.                         |
| `FormControl`     | 개별 폼 컨트롤의 값과 유효성 상태를 관리합니다. `<input>`, `<select>` 같은 HTML 폼 컨트롤에 대응합니다.                                                  |
| `FormGroup`       | `AbstractControl` 인스턴스 그룹의 값과 유효성 상태를 관리합니다. 그룹의 프로퍼티에는 자식 컨트롤이 포함됩니다. 컴포넌트의 최상위 폼은 `FormGroup`입니다. |
| `FormArray`       | 숫자 인덱스로 접근하는 `AbstractControl` 인스턴스 배열의 값과 유효성 상태를 관리합니다.                                                                  |
| `FormBuilder`     | 컨트롤 인스턴스를 생성하는 팩토리 메서드를 제공하는 주입 가능한 서비스입니다.                                                                            |
| `FormRecord`      | 값의 타입이 같은 `FormControl` 인스턴스 모음의 값과 유효성 상태를 추적합니다.                                                                            |

<!--
### Directives
-->

<a id="directives"></a>

### 디렉티브

<!--
| Directive              | Details                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------- |
| `FormControlDirective` | Syncs a standalone `FormControl` instance to a form control element.                       |
| `FormControlName`      | Syncs `FormControl` in an existing `FormGroup` instance to a form control element by name. |
| `FormGroupDirective`   | Syncs an existing `FormGroup` instance to a DOM element.                                   |
| `FormGroupName`        | Syncs a nested `FormGroup` instance to a DOM element.                                      |
| `FormArrayName`        | Syncs a nested `FormArray` instance to a DOM element.                                      |
| `FormArrayDirective`   | Syncs a standalone `FormArray` instance to a DOM element.                                  |
-->

| 디렉티브               | 설명                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------ |
| `FormControlDirective` | 독립적인 `FormControl` 인스턴스와 폼 컨트롤 엘리먼트를 동기화합니다.                              |
| `FormControlName`      | 기존 `FormGroup` 인스턴스에 있는 `FormControl`을 이름으로 찾아 폼 컨트롤 엘리먼트와 동기화합니다. |
| `FormGroupDirective`   | 기존 `FormGroup` 인스턴스와 DOM 엘리먼트를 동기화합니다.                                          |
| `FormGroupName`        | 중첩된 `FormGroup` 인스턴스와 DOM 엘리먼트를 동기화합니다.                                        |
| `FormArrayName`        | 중첩된 `FormArray` 인스턴스와 DOM 엘리먼트를 동기화합니다.                                        |
| `FormArrayDirective`   | 독립적인 `FormArray` 인스턴스와 DOM 엘리먼트를 동기화합니다.                                      |
