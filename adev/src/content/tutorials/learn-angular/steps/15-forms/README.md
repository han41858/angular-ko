<!--
# Forms Overview
-->
# 폼 개요

<!--
Forms are a big part of many apps because they enable your app to accept user input. Let's learn about how forms are handled in Angular.

In Angular, there are two types of forms: template-driven and reactive. You'll learn about both over the next few activities.

Note: Learn more about [forms in Angular in the in-depth guide](/guide/forms).

In this activity, you'll learn how to set up a form using a template-driven approach.

<hr>

<docs-workflow>

<docs-step title="Create an input field">

In `user.ts`, update the template by adding a text input with the `id` set to `framework`, type set to `text`.

```angular-html
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" />
</label>
```

</docs-step>

<docs-step title="Import `FormsModule`">

For this form to use Angular features that enable data binding to forms, you'll need to import the `FormsModule`.

Import the `FormsModule` from `@angular/forms` and add it to the `imports` array of the `User`.

<docs-code language="ts" highlight="[2, 7]">
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
...
imports: [FormsModule],
})
export class User {}
</docs-code>

</docs-step>

<docs-step title="Add binding to the value of the input">

The `FormsModule` has a directive called `ngModel` that binds the value of the input to a property in your class.

Update the input to use the `ngModel` directive, specifically with the following syntax `[(ngModel)]="favoriteFramework"` to bind to the `favoriteFramework` property.

<docs-code language="html" highlight="[3]">
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
</label>
</docs-code>

After you've made changes, try entering a value in the input field. Notice how it updates on the screen (yes, very cool).

NOTE: The syntax `[()]` is known as "banana in a box" but it represents two-way binding: property binding and event binding. Learn more in the [Angular docs about two-way data binding](guide/templates/two-way-binding).

</docs-step>

</docs-workflow>

You've now taken an important first step towards building forms with Angular.

Nice work. Let's keep the momentum going!
-->
폼(Form)은 사용자의 입력을 받는 기능을 구현하기 때문에 앱을 개발할 때 아주 중요한 부분을 차지합니다.
Angular에서 폼을 어떻게 사용하는지 알아봅시다.

Angular에는 템플릿 기반(template-driven) 폼과 반응형(reactive) 폼() 이렇게 두 종류의 폼이 있습니다.
이번 튜토리얼에서는 두 가지를 모두 조금씩 알아봅니다.

참고: 자세한 내용은 [폼 심화 가이드](/guide/forms) 문서를 참고하세요.

먼저 템플릿 기반 폼부터 시작해 봅시다.

<hr>

<docs-workflow>

<docs-step title="입력 필드 추가하기">

`user.ts` 파일을 열고 템플릿을 수정해서 `framework`라는 `id`를 갖는 `text` 입력 필드를 추가합니다.

```angular-html
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" />
</label>
```

</docs-step>

<docs-step title="`FormsModule`를 로드합니다">

Angular가 제공하는 폼과 데이터 바인딩 기능을 활용하려면 `FormsModule`을 로드해야 합니다.

`@angular/forms` 패키지로 제공되는 `FormsModule`을 로드해서 `User` 컴포넌트의 `imports` 배열에 추가하세요.

<docs-code language="ts" highlight="[2, 7]">
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
...
imports: [FormsModule],
})
export class User {}
</docs-code>

</docs-step>

<docs-step title="입력 필드와 값을 바인딩하세요">

`FormsModule`에는 입력값과 클래스 프로퍼티를 바인딩하는 `ngModel` 디렉티브가 있습니다.

`ngModel` 디렉티브를 사용하도록 입력 필드를 수정합시다.
클래스의 `favoriteFramework` 프로퍼티와 템플릿을 바인딩하려면 `[(ngModel)]="favoriteFramework"`와 같은 문법을 사용하면 됩니다.

<docs-code language="html" highlight="[3]">
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
</label>
</docs-code>

코드를 수정하고 입력 필드에 값을 입력해 보세요.
그리고 화면이 어떻게 갱신되는지 확인해 보세요. (네, 정말 멋지죠?)

참고: `[()]` 문법은 "박스 안에 있는 바나나" 로 기억하면 쉽습니다. 이 문법은 어트리뷰트 바인딩과 이벤트 바인딩을 합친 양방향 바인딩을 의미합니다.
양방향 바인딩에 대해 자세하게 알아보려면 [양방향 바인딩](guide/templates/two-way-binding) 문서를 참고하세요.

</docs-step>

</docs-workflow>

Angular로 폼을 구현하는 첫 걸음을 내딛었습니다.

잘 하셨습니다. 계속 진행해보시죠!