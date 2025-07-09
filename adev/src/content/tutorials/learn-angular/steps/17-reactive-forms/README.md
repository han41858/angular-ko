<!--
# Reactive Forms
-->
# 반응형 폼(Reactive Forms)

<!--
When you want to manage your forms programmatically instead of relying purely on the template, reactive forms are the answer.

Note: Learn more about [reactive forms in the in-depth guide](/guide/forms/reactive-forms).

In this activity, you'll learn how to set up reactive forms.

<hr>

<docs-workflow>

<docs-step title="Import `ReactiveForms` module">

In `app.ts`, import `ReactiveFormsModule` from `@angular/forms` and add it to the `imports` array of the component.

```angular-ts
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form>
      <label>Name
        <input type="text" />
      </label>
      <label>Email
        <input type="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
```

</docs-step>

<docs-step title="Create the `FormGroup` object with FormControls">

Reactive forms use the `FormControl` class to represent the form controls (e.g., inputs). Angular provides the `FormGroup` class to serve as a grouping of form controls into a helpful object that makes handling large forms more convenient for developers.

Add `FormControl` and `FormGroup` to the import from `@angular/forms` so that you can create a FormGroup for each form, with the properties `name` and `email` as FormControls.

```ts
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
...
export class App {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
```

</docs-step>

<docs-step title="Link the FormGroup and FormControls to the form">

Each `FormGroup` should be attached to a form using the `[formGroup]` directive.

In addition, each `FormControl` can be attached with the `formControlName` directive and assigned to the corresponding property. Update the template with the following form code:

```angular-html
<form [formGroup]="profileForm">
  <label>
    Name
    <input type="text" formControlName="name" />
  </label>
  <label>
    Email
    <input type="email" formControlName="email" />
  </label>
  <button type="submit">Submit</button>
</form>
```

</docs-step>

<docs-step title="Handle update to the form">

When you want to access data from the `FormGroup`, it can be done by accessing the value of the `FormGroup`. Update the `template` to display the form values:

```angular-html
...
<h2>Profile Form</h2>
<p>Name: {{ profileForm.value.name }}</p>
<p>Email: {{ profileForm.value.email }}</p>
```

</docs-step>

<docs-step title="Access FormGroup values">
Add a new method to the component class called `handleSubmit` that you'll later use to handle the form submission.
This method will display values from the form, you can access the values from the FormGroup.

In the component class, add the `handleSubmit()` method to handle the form submission.

<docs-code language="ts">
handleSubmit() {
  alert(
    this.profileForm.value.name + ' | ' + this.profileForm.value.email
  );
}
</docs-code>
</docs-step>

<docs-step title="Add `ngSubmit` to the form">
You have access to the form values, now it is time to handle the submission event and use the `handleSubmit` method.
Angular has an event handler for this specific purpose called `ngSubmit`. Update the form element to call the `handleSubmit` method when the form is submitted.

<docs-code language="angular-html" highlight="[3]">
<form
  [formGroup]="profileForm"
  (ngSubmit)="handleSubmit()">
</docs-code>

</docs-step>

</docs-workflow>

And just like that, you know how to work with reactive forms in Angular.

Fantastic job with this activity. Keep going to learn about form validation.
-->
폼을 템플릿에서 조작하는 대신, 코드로 조작하려면 반응형 폼을 사용하는 것이 좋습니다.

참고: 자세한 내용은 [반응형 폼 심화 가이드](/guide/forms/reactive-forms) 문서를 참고하세요.

이번 튜토리얼에서는 반응형 폼을 어떻게 구성하는지 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="`ReactiveForms` 모듈을 로드합니다">

`app.ts` 파일을 열고 `@angular/forms` 패키지로 제공되는 `ReactiveFormsModule`을 로드한 후에 컴포넌트 `imports` 배열에 추가합니다.

```angular-ts
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form>
      <label>Name
        <input type="text" />
      </label>
      <label>Email
        <input type="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
```

</docs-step>

<docs-step title="FormControls로 `FormGroup` 객체를 생성하세요">

반응형 폼은 폼 컨트롤을 표현하는 용도로 `FormControl` 클래스를 사용합니다.
그리고 폼 컨트롤을 효율적으로 다루기 위해 객체 구조로 묶을 때는 `FormGroup` 클래스를 사용합니다.

`@angular/forms` 패키지로 제공되는 `FormControl`과 `FormGroup`을 로드해서 폼 그룹을 생성한 후에, 폼 그룹 안에 `name`, `email` 프로퍼티로 FormControl을 선언합니다.

```ts
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
...
export class App {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
```

</docs-step>

<docs-step title="FormGroup과 FormControl을 폼과 연결하세요">

`FormGroup`은 `[formGroup]` 디렉티브를 사용해서 폼과 연결할 수 있습니다.

그리고 `FormControl`은 `formControlName` 디렉티브를 사용해서 개별 폼 필드와 연결할 수 있습니다.
템플릿에서 폼 코드를 이렇게 수정해 보세요:

```angular-html
<form [formGroup]="profileForm">
  <label>
    Name
    <input type="text" formControlName="name" />
  </label>
  <label>
    Email
    <input type="email" formControlName="email" />
  </label>
  <button type="submit">Submit</button>
</form>
```

</docs-step>

<docs-step title="폼을 수정합니다">

폼 그룹 안에 있는 데이터에 접근하려면 `FormGroup` 객체의 값을 참조하면 됩니다.
템플릿을 다음과 같이 수정합니다:

```angular-html
...
<h2>Profile Form</h2>
<p>Name: {{ profileForm.value.name }}</p>
<p>Email: {{ profileForm.value.email }}</p>
```

</docs-step>

<docs-step title="FormGroup 값에 접근해 보세요">

컴포넌트 클래스에 `handleSubmit` 함수를 추가해서 폼 제출 이벤트를 처리해 봅시다.
이 메서드는 폼 안에 있는 값을 표시합니다.

컴포넌트 클래스에 `handleSubmit()` 메서드를 추가해 봅시다.

<docs-code language="ts">
handleSubmit() {
  alert(
    this.profileForm.value.name + ' | ' + this.profileForm.value.email
  );
}
</docs-code>
</docs-step>

<docs-step title="폼에 `ngSubmit`을 추가합니다">

이제 폼 값에 접근할 수 있으니, 폼 제출 이벤트를 `handleSubmit` 메서드로 전달해 봅시다.
Angular는 이런 경우를 위해 `ngSubmit` 이라는 이벤트 핸들러를 제공합니다.
폼 제출 이벤트가 발생했을 때 이 이벤트를 `handleSubmit` 메서드로 받을 수 있도록 폼 엘리먼트를 수정해 봅시다.

<docs-code language="angular-html" highlight="[3]">
<form
  [formGroup]="profileForm"
  (ngSubmit)="handleSubmit()">
</docs-code>

</docs-step>

</docs-workflow>

이렇게 Angular에서 반응형 폼을 사용하는 방법을 알게 되었군요.

정말 잘 하셨습니다.
이제 폼 유효성 검사는 어떻게 하는지 알아봅시다.