<!--
# Getting form control value
-->
# 폼 컨트롤의 값 참조하기

<!--
Now that your forms are set up with Angular, the next step is to access the values from the form controls.

Note: Learn more about [adding a basic form control in the in-depth guide](/guide/forms/reactive-forms#adding-a-basic-form-control).

In this activity, you'll learn how to get the value from your form input.

<hr>

<docs-workflow>

<docs-step title="Show the value of the input field in the template">

To display the input value in a template, you can use the interpolation syntax `{{}}` just like any other class property of the component:

<docs-code language="angular-ts" highlight="[5]">
@Component({
  selector: 'app-user',
  template: `
    ...
    <p>Framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
})
export class User {
  favoriteFramework = '';
}
</docs-code>

</docs-step>

<docs-step title="Retrieve the value of an input field">

When you need to reference the input field value in the component class, you can do so by accessing the class property with the `this` syntax.

<docs-code language="angular-ts" highlight="[15]">
...
@Component({
  selector: 'app-user',
  template: `
    ...
    <button (click)="showFramework()">Show Framework</button>
  `,
  ...
})
export class User {
  favoriteFramework = '';
  ...

showFramework() {
alert(this.favoriteFramework);
}
}
</docs-code>

</docs-step>

</docs-workflow>

Great job learning how to display the input values in your template and access them programmatically.

Time to progress onto the next way of managing forms with Angular: reactive forms. If you'd like to learn more about template-driven forms, please refer to the [Angular forms documentation](guide/forms/template-driven-forms).
-->
폼을 구현했으니 이번에는 폼 컨트롤의 값에 접근해 봅시다.

참고: 자세한 내용은 [기본 폼 컨트롤 심화 가이드](/guide/forms/reactive-forms#adding-a-basic-form-control) 문서를 참고하세요.

이번 튜토리얼에서는 이전 단계에서 추가한 입력 필드의 값을 어떻게 참조하는지 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="템플릿에 있는 입력 필드의 값을 표시해 봅시다">

템플릿에 있는 입력 필드의 값을 표시하려면 컴포넌트 클래스 프로퍼티를 바인딩했던 것처럼 문자열 바인딩(`{{}}`) 문법을 사용하면 됩니다.

<docs-code language="angular-ts" highlight="[5]">
@Component({
  selector: 'app-user',
  template: `
    ...
    <p>Framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
})
export class User {
  favoriteFramework = '';
}
</docs-code>

</docs-step>

<docs-step title="입력 필드에 있는 값을 받아옵시다">

컴포넌트 클래스 코드에서 입력 필드 값을 참조해야 하는 경우는 `this`를 사용하면 됩니다.
이 프로퍼티의 값은 템플릿 폼과 바인딩되어 있습니다.

<docs-code language="angular-ts" highlight="[15]">
...
@Component({
  selector: 'app-user',
  template: `
    ...
    <button (click)="showFramework()">Show Framework</button>
  `,
  ...
})
export class User {
  favoriteFramework = '';
  ...

showFramework() {
alert(this.favoriteFramework);
}
}
</docs-code>

</docs-step>

</docs-workflow>

이제 입력 필드의 값을 화면에 표시하고 코드 로직으로도 접근할 수 있게 되었습니다.

다음은 반응형 폼을 알아볼 시간입니다.
템플릿 폼을 더 자세하게 알아보려면 [Angular 폼 문서](guide/forms/template-driven-forms)를 참고하세요.