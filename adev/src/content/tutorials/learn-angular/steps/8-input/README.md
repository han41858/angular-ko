<!--
# Component input properties
-->
# 컴포넌트 입력 프로퍼티

<!--
Sometimes app development requires you to send data into a component. This data can be used to customize a component or perhaps send information from a parent component to a child component.

Angular uses a concept called `input`. This is similar to `props` in other frameworks. To create an `input` property, use the `input()` function.

Note: Learn more about [accepting data with input properties in the inputs guide](/guide/components/inputs).

In this activity, you'll learn how to use the `input()` function to send information to components.

<hr>

To create an `input` property, add the `input()` function to initialize a property of a component class:

<docs-code header="user.ts" language="ts">
class User {
  occupation = input<string>();
}
</docs-code>

When you are ready to pass in a value through an `input`, values can be set in templates using the attribute syntax. Here's an example:

<docs-code header="app.ts" language="angular-ts" highlight="[3]">
@Component({
  ...
  template: `<app-user occupation="Angular Developer"></app-user>`
})
class App {}
</docs-code>

The `input` function returns an `InputSignal`. You can read the value by calling the signal. 

<docs-code header="user.ts" language="angular-ts">
@Component({
  ...
  template: `<p>The user's occupation is {{occupation()}}</p>`
})
</docs-code>

<docs-workflow>

<docs-step title="Define an `input()` property">
Update the code in `user.ts` to define an `input` property on the `User` called `name` and specify the `string` type. For now, don't set an initial value and invoke `input()` without arguments. Be sure to update the template to invoke and interpolate the `name` property at the end of the sentence.
</docs-step>

<docs-step title="Pass a value to the `input` property">
Update the code in `app.ts` to send in the `name` property with a value of `"Simran"`.
<br>

When the code has been successfully updated, the app will display `The user's name is Simran`.
</docs-step>

</docs-workflow>

While this is great, it is only one direction of the component communication. What if you want to send information and data to a parent component from a child component? Check out the next lesson to find out.

P.S. you are doing great - keep going 🎉
-->
앱을 개발하다보면 컴포넌트로 데이터를 전달해야 하는 경우가 있습니다.
이렇게 전달하는 데이터는 컴포넌트를 커스터마이징할 때 사용되거나, 부모 컴포넌트에서 자식 컴포넌트로 정보를 전달하는 용도로 사용됩니다.

Angular는 입력 프로퍼티라는 개념을 사용합니다.
다른 프레임워크의 `props`와 비슷한 개념인데, 입력 프로퍼티는 `input()` 함수를 실행해서 생성합니다.

참고: [입력 프로퍼티로 데이터 전달하기](/guide/components/inputs) 문서를 참고하세요.

이번 예제에서는 `input()` 함수를 사용해서 입력 프로퍼티를 선언한 후에, 컴포넌트로 정보를 전달해 봅시다.

<hr>

입력 프로퍼티를 생성하려면 컴포넌트 클래스에서 `input()` 함수를 사용해서 프로퍼티를 생성하면 됩니다:

<docs-code header="user.ts" language="ts">
class User {
  occupation = input<string>();
}
</docs-code>

이제 입력 프로퍼티로 데이터를 전달할 준비가 되었으면, 템플릿에서 어트리뷰트로 바인딩하는 문법을 사용합니다.
예제를 확인해 보세요:

<docs-code header="app.ts" language="angular-ts" highlight="[3]">
@Component({
  ...
  template: `<app-user occupation="Angular Developer"></app-user>`
})
class App {}
</docs-code>

`input` 함수는 `InputSignal`을 반환합니다.
그래서 값을 참조하려면 시그널을 실행하면 됩니다.

<docs-code header="user.ts" language="angular-ts">
@Component({
  ...
  template: `<p>The user's occupation is {{occupation()}}</p>`
})
</docs-code>

<docs-workflow>

<docs-step title="`input()` 프로퍼티를 선언해 보세요">

`user.ts` 파일을 열어서 `User` 컴포넌트에 입력 프로퍼티로 `name`을 `string` 타입으로 선언해 보세요.
아직은 초기값을 지정하지 않을 것이기 때문에 인자 없이 `input()`을 실행해 봅니다.
`name` 프로퍼티가 템플릿에 그대로 바인딩되지 않도록 실행해야 한다는 것을 주의하세요.

</docs-step>

<docs-step title="입력 프로퍼티로 데이터를 전달해 보세요">

`app.ts` 파일을 수정해서 `name` 프로퍼티로 `"Simran"`을 전달해 보세요.

<br>

제대로 수정했다면 화면에는 `The users' name is Simran` 이라는 문구가 표시될 것입니다.

</docs-step>

</docs-workflow>

입력 프로퍼티는 훌륭하지만 아직까지는 컴포넌트 통신 중 한 방향만 알아봤습니다.
자식 컴포넌트에서 부모 컴포넌트로 데이터를 보낼 때는 어떻게 하면 될까요?
이 내용은 다음 단계에서 확인해 봅시다.

P.S. 잘 진행하고 있습니다 - 좀 더 힘내세요 🎉
