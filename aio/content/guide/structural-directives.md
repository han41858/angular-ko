<!--
# Structural directives
-->
# 구조 디렉티브

<!--
This guide is about structural directives and provides conceptual information on how such directives work, how Angular interprets their shorthand syntax, and how to add template guard properties to catch template type errors.

Structural directives are directives which change the DOM layout by adding and removing DOM elements.

Angular provides a set of built-in structural directives (such as `NgIf`, `NgForOf`, `NgSwitch` and others) which are commonly used in all Angular projects. For more information see [Built-in directives](guide/built-in-directives).

<div class="alert is-helpful">

For the example application that this page describes, see the <live-example name="structural-directives"></live-example>.

</div>
-->
이 문서는 구조 디렉티브\(structural directive\)를 다루면서 디렉티브가 어떻게 동작하는지, Angular가 단축 문법을 어떻게 해석하는지, 템플릿에서 발생하는 타입 에러를 잡기 위해 템플릿 가드 프로퍼티를 어떻게 활용하는지 안내하빈다.

구조 디렉티브는 DOM 엘리먼트를 추가하거나 제거하는 방식으로 DOM 레이아웃을 조작합니다.

Angular는 `NgIf`나 `NgForOf`, `NgSwitch`와 같은 기본 구조 디렉티브를 제공하며, 이 디렉티브들은 Angular 프로젝트에 자주 사용됩니다.
자세한 내용은 [기본 디렉티브](guide/built-in-directives) 문서를 참고하세요.

<div class="alert is-helpful">

이 문서에서 설명하는 예제 애플리케이션을 직접 실행하려면 <live-example name="structural-directives"></live-example>를 참고하세요.

</div>


<a id="shorthand"></a>
<a id="asterisk"></a>
<a id="structural-directive-shorthand"></a>

<!--
## Structural directive shorthand
-->
## 구조 디렉티브 단순 문법

<!--
When structural directives are applied they generally are prefixed by an asterisk, `*`,  such as `*ngIf`. This convention is shorthand that Angular interprets and converts into a longer form.
Angular transforms the asterisk in front of a structural directive into an `<ng-template>` that surrounds the host element and its descendants.

For example, let's take the following code which uses an `*ngIf` to displays the hero's name if `hero` exists:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (asterisk)" region="asterisk"></code-example>

Angular creates an `<ng-template>` element and applies the `*ngIf` directive onto it where it becomes a property binding in square brackets, `[ngIf]`. The rest of the `<div>`, including its class attribute, is then moved inside the `<ng-template>`:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-template)" region="ngif-template"></code-example>

Note that Angular does not actually create a real `<ng-template>` element, but instead only renders the `<div>` element.

```html
<div _ngcontent-c0>Mr. Nice</div>

```

The following example compares the shorthand use of the asterisk in `*ngFor` with the longhand `<ng-template>` form:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (inside-ngfor)" region="inside-ngfor"></code-example>

Here, everything related to the `ngFor` structural directive is moved to the `<ng-template>`.
All other bindings and attributes on the element apply to the `<div>` element within the `<ng-template>`.
Other modifiers on the host element, in addition to the `ngFor` string, remain in place as the element moves inside the `<ng-template>`.
In this example, the `[class.odd]="odd"` stays on the `<div>`.

The `let` keyword declares a template input variable that you can reference within the template.
The input variables in this example are `hero`, `i`, and `odd`.
The parser translates `let hero`, `let i`, and `let odd` into variables named `let-hero`, `let-i`, and `let-odd`.
The `let-i` and `let-odd` variables become `let i=index` and `let odd=odd`.
Angular sets `i` and `odd` to the current value of the context's `index` and `odd` properties.

The parser applies PascalCase to all directives and prefixes them with the directive's attribute name, such as ngFor.
For example, the `ngFor` input properties, `of` and `trackBy`, map to `ngForOf` and `ngForTrackBy`.

As the `NgFor` directive loops through the list, it sets and resets properties of its own context object.
These properties can include, but aren't limited to, `index`, `odd`, and a special property
named `$implicit`.

Angular sets `let-hero` to the value of the context's `$implicit` property, which `NgFor` has initialized with the hero for the current iteration.

For more information, see the [NgFor API](api/common/NgForOf "API: NgFor") and [NgForOf API](api/common/NgForOf) documentation.

<div class="alert is-helpful">

  Note that Angular's `<ng-template>` element defines a template that doesn't render anything by default, if you just wrap elements in an `<ng-template>` without applying a structural directive those elements will not be rendered.

  For more information, see the [ng-template API](api/core/ng-template) documentation.

</div>
-->
구조 디렉티브는 `*ngIf`와 같이 아스테리스크\(`*`\)로 시작합니다.
Angular는 이런 단순 문법을 만나면 원래의 긴 형태로 자동으로 적용합니다.
이 때 긴 형태라는 것은, 구조 디렉티브 앞에 붙은 아스테르스크에 해당하는 부분을 `<ng-template>`로 변환하고 호스트 엘리먼트와 그 자식 엘리먼트를 감싸는 것을 의미합니다.

예를 들어 `hero` 프로퍼티의 값이 존재할 때만 히어로의 이름을 표시하기 위해 `*ngIf`를 사용하는 예제 코드를 봅시다:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (아스테리스크)" region="asterisk"></code-example>

그러면 Angular는 `<ng-template>` 엘리먼트를 생성하고 `*ngIf`를 프로퍼티 바인딩 형태의 `[ngIf]`로 변환합니다.
그리고 구조 디렉티브가 적용된 `<div>`에 클래스 어트리뷰트를 유지한 채로 `<ng-template>` 안쪽으로 옮깁니다:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-템플릿)" region="ngif-template"></code-example>

이 때 Angular는 실제로 `<ng-template>` 엘리먼트를 DOM에 추가하지는 않습니다.
이 엘리먼트는 `<div>` 엘리먼트를 렌더링하는 용도로 사용됩니다.

```html
<div _ngcontent-c0>Mr. Nice</div>

```

`*ngFor`의 경우는 어떻게 변환되는지 확인해 보세요:

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngfor-내부)" region="inside-ngfor"></code-example>

위 코드를 보면 `ngFor` 구조 디렉티브와 연관된 것들은 모두 `<ng-template>` 안쪽으로 이동한 것을 확인할 수 있습니다.
그리고 `ngFor`와 관련되지 않은 바인딩이나 어트리뷰트는 `<div>` 엘리먼트에 남은채로 `<ng-template>` 안쪽으로 그대로 이동합니다.
그래서 `[class.odd]="odd"`는 `<div>`에 그대로 남아있는 것을 확인할 수 있습니다.

`let` 키워드는 템플릿 안에서 무언가를 참조하는 템플릿 입력 변수\(template input variable\)를 선언하는 키워드입니다.
이 예제 코드에서 입력 변수는 `hero`, `i`, `odd` 입니다.
그러면 파서는 `let hero`, `let i`, `let odd`라는 문법을 `let-hero`, `let-i`, `let-odd`라는 변수 이름으로 선언합니다.
그리고 `let-i`는 `let i=index`, `let-odd`는 `let-odd=odd`라는 값이 할당됩니다.
`i`와 `odd`는 현재 컨텍스트의 `index`, `odd` 프로퍼티 값으로 Angular가 할당합니다.

파서는 모든 디렉티브를 `ngFor`와 같은 파스칼 케이스\(PascalCase\)로 처리합니다.
`ngFor`, `of`, `trackBy`, `ngForOf`, `ngForTrackBy` 모두 그렇습니다.

이제 `NgFor` 디렉티브가 배열을 순회하면서 각 객체를 컨텍스트 안에 프로퍼티 값으로 할당합니다.
이 때 `index`, `odd`, `$implicit`과 같은 특수 프로퍼티 값도 할당됩니다.

이제 Angular는 `let-hero`의 값을 컨텍스트의 `$implicit` 프로퍼티 값으로 할당하며, 이 때 개별 히어로 객체가 사용됩니다.

자세한 내용을 확인하려면 [NgFor API](api/common/NgForOf "API: NgFor") 문서와 [NgForOf API](api/common/NgForOf) 문서를 참고하세요.

<div class="alert is-helpful">

Angular가 만드는 `<ng-template>` 엘리먼트는 기본적으로 화면에 렌더링되지 않습니다.
그래서 구조 디렉티브를 사용하지 않고 아무 엘리먼트를 `<ng-template>`로 감싸면 이 엘리먼트도 렌더링되지 않습니다.

자세한 내용은 [ng-template API](api/core/ng-template) 문서를 참고하세요.

</div>


<a id="one-per-element"></a>

<!--
## One structural directive per element
-->
## 엘리먼트에는 구조 디렉티브를 하나만 적용하세요.

<!--
It's a quite common use-case to repeat a block of HTML but only when a particular condition is true. An intuitive way to do that is to put both an `*ngFor` and an `*ngIf` on the same element. However, since both `*ngFor` and `*ngIf` are structural directives, this would be treated as an error by the compiler. You may apply only one _structural_ directive to an element.

The reason is simplicity. Structural directives can do complex things with the host element and its descendants.

When two directives lay claim to the same host element, which one should take precedence?

Which should go first, the `NgIf` or the `NgFor`? Can the `NgIf` cancel the effect of the `NgFor`?
If so (and it seems like it should be so), how should Angular generalize the ability to cancel for other structural directives?

There are no easy answers to these questions. Prohibiting multiple structural directives makes them moot.
There's an easy solution for this use case: put the `*ngIf` on a container element that wraps the `*ngFor` element. One or both elements can be an `<ng-container>` so that no extra DOM elements are generated.
-->
조건이 참일 때만 어떤 HTML 블록을 반복하는 경우는 Angular 애플리케이션을 개발할 때 자주 사용하는 경우입니다.
이 때 한 엘리먼트에 `*ngFor`와 `*ngIf`를 동시에 사용하는 것이 맞지 않나 생각할 숭 ㅣㅆ습니다.
하지만 `*ngFor`와 `*ngIf`는 모두 구조 디렉티브이기 때문에 컴파일러가 에러로 처리합니다.
_구조_ 디렉티브는 엘리먼트 하나에 한번만 사용하세요.

이유는 간단합니다.
구조 디렉티브는 호스트 엘리먼트와 그 자식 엘리먼트에 복잡한 작업을 수행합니다.

그런데 한 호스트 엘리먼트에 디렉티브가 여러개 적용되면 어떤 것을 먼저 처리할지 결정할 수 없습니다.

위 경우라면 `NgIf`와 `NgFor` 중에서 어떤 것을 먼저 적용해야 할까요?
`NgIf`가 `NgFor` 동작에 영향을 미치지는 않을까요?
디렉티브가 다른 디렉티브에 영향을 미친다면 어느 하나를 적용하지 않아야 할까요?

경우에 따라 정답이 달라질 수 있습니다.
그래서 구조 디렉티브는 하나만 사용해야 합니다.
예를 든 경우라면 `*ngFor`가 적용된 엘리먼트를 감싸는 엘리먼트로 `<ng-container>`를 추가하고 이 엘리먼트에 `*ngIf`를 적용하면 됩니다.
이렇게 구성하면 별도 DOM 엘리먼트가 추가되지 않습니다.


<a id="unless"></a>

<!--
## Creating a structural directive
-->
## 구조 디렉티브 정의하기

<!--
This section guides you through creating an `UnlessDirective` and how to set `condition` values.
The `UnlessDirective` does the opposite of `NgIf`, and `condition` values can be set to `true` or `false`.
`NgIf` displays the template content when the condition is `true`.
`UnlessDirective` displays the content when the condition is `false`.

Following is the `UnlessDirective` selector, `appUnless`, applied to the paragraph element.
When `condition` is `false`, the browser displays the sentence.

<code-example header="src/app/app.component.html (appUnless-1)" path="structural-directives/src/app/app.component.html" region="appUnless-1"></code-example>

1.  Using the Angular CLI, run the following command, where `unless` is the name of the directive:

    <code-example format="shell" language="shell">

    ng generate directive unless

    </code-example>

    Angular creates the directive class and specifies the CSS selector, `appUnless`, that identifies the directive in a template.

1.  Import `Input`, `TemplateRef`, and `ViewContainerRef`.

    <code-example header="src/app/unless.directive.ts (skeleton)" path="structural-directives/src/app/unless.directive.ts" region="skeleton"></code-example>

1.  Inject `TemplateRef` and `ViewContainerRef` in the directive constructor as private variables.

    <code-example header="src/app/unless.directive.ts (ctor)" path="structural-directives/src/app/unless.directive.ts" region="ctor"></code-example>

    The `UnlessDirective` creates an [embedded view](api/core/EmbeddedViewRef "API: EmbeddedViewRef") from the Angular-generated `<ng-template>` and inserts that view in a [view container](api/core/ViewContainerRef "API: ViewContainerRef") adjacent to the directive's original `<p>` host element.

    [`TemplateRef`](api/core/TemplateRef "API: TemplateRef") helps you get to the `<ng-template>` contents and [`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef") accesses the view container.

1.  Add an `appUnless` `@Input()` property with a setter.

    <code-example header="src/app/unless.directive.ts (set)" path="structural-directives/src/app/unless.directive.ts" region="set"></code-example>

    Angular sets the `appUnless` property whenever the value of the condition changes.

    *   If the condition is falsy and Angular hasn't created the view previously, the setter causes the view container to create the embedded view from the template
    *   If the condition is truthy and the view is currently displayed, the setter clears the container, which disposes of the view

The complete directive is as follows:

<code-example header="src/app/unless.directive.ts (excerpt)" path="structural-directives/src/app/unless.directive.ts" region="no-docs"></code-example>
-->
이번 섹션에서는 `UnlessDirective`를 생성해보고 `condition` 값을 어떻게 할당하는지도 알아봅시다.
`UnlessDirective`는 `NgIf`의 반대 동작을 하며 `condition` 값은 `true`나 `false`가 될 수 있습니다.
`NgIf` 디렉티브는 조건이 `true`일 때 템플릿을 표시합니다.
반대로 `UnlessDirective`는 조건이 `false`일 때 템플릿을 표시하게 해 봅시다.

`UnlessDirective`의 셀렉터는 `appUnless`를 사용하고, 이 디렉티브는 `<p>` 엘리먼트에 적용합니다.
`condition`이 `false`이면 `<p>` 엘리먼트를 화면에 표시해 봅시다.

<code-example header="src/app/app.component.html (appUnless-1)" path="structural-directives/src/app/app.component.html" region="appUnless-1"></code-example>

1.  Angular CLI로 다음 명령을 실행해서 `unless`라는 이름으로 디렉티브를 생성합니다:

    <code-example format="shell" language="shell">

    ng generate directive unless

    </code-example>

    그러면 디렉티브 클래스가 생성되면서 CSS 셀렉터는 `appUnless`가 지정됩니다.

1.  클래스 파일을 열고 `Input`, `TemplateRef`, `ViewContainerRef` 심볼을 로드합니다.

    <code-example header="src/app/unless.directive.ts (기본 ㅋ ㅗ드)" path="structural-directives/src/app/unless.directive.ts" region="skeleton"></code-example>

1.  디렉티브 생성자에 `private` 멤버로 `TemplateRef`, `ViewContainerRef`를 의존성으로 주입합니다.

    <code-example header="src/app/unless.directive.ts (생성자)" path="structural-directives/src/app/unless.directive.ts" region="ctor"></code-example>

    `UnlessDirective`는 `<ng-template>`으로 [임베디드 뷰](api/core/EmbeddedViewRef "API: EmbeddedViewRef")를 생성하며, 이 임베디드 뷰를 [뷰 컨테이너](api/core/ViewContainerRef "API: ViewContainerRef")로 감싸면서 `<p>` 호스트 엘리먼트를 이동시킵니다.

    [`TemplateRef`](api/core/TemplateRef "API: TemplateRef")를 활용하면 `<ng-template>`의 내용을 참조할 수 있으며, [`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef")를 활용하면 뷰 컨테이너에 접근할 수 있습니다.

1.  `appUnless`에 `@Input()` 프로퍼티 세터를 추가합니다.

    <code-example header="src/app/unless.directive.ts (set)" path="structural-directives/src/app/unless.directive.ts" region="set"></code-example>

    이제 조건이 변경될 때마다 `appUnless` 프로퍼티에 값이 할당됩니다.

    *   조건이 거짓으로 평가되면 첫번째 `<p>`는 렌더링되지 않으며, 두번째 `<p>`를 렌더링합니다.
    *   조건이 참으로 평가되면 첫번째 `<p>`가 렌더링되며, 두번째 `<p>`는 렌더링되지 않습니다.

최종 코드는 이렇습니다:

<code-example header="src/app/unless.directive.ts (일부)" path="structural-directives/src/app/unless.directive.ts" region="no-docs"></code-example>


<!--
### Testing the directive
-->
### 디렉티브 테스트하기

<!--
In this section, you'll update your application to test the `UnlessDirective`.

1.  Add a `condition` set to `false` in the `AppComponent`.

    <code-example header="src/app/app.component.ts (excerpt)" path="structural-directives/src/app/app.component.ts" region="condition"></code-example>

1.  Update the template to use the directive.
    Here, `*appUnless` is on two `<p>` tags with opposite `condition` values, one `true` and one `false`.

    <code-example header="src/app/app.component.html (appUnless)" path="structural-directives/src/app/app.component.html" region="appUnless"></code-example>

    The asterisk is shorthand that marks `appUnless` as a structural directive.
    When the `condition` is falsy, the top \(A\) paragraph appears and the bottom \(B\) paragraph disappears.
    When the `condition` is truthy, the top \(A\) paragraph disappears and the bottom (B) paragraph appears.

1.  To change and display the value of `condition` in the browser, add markup that displays the status and a button.

    <code-example header="src/app/app.component.html" path="structural-directives/src/app/app.component.html" region="toggle-info"></code-example>

To verify that the directive works, click the button to change the value of `condition`.

<div class="lightbox">

<img alt="UnlessDirective in action" src="generated/images/guide/structural-directives/unless-anim.gif">

</div>
-->
이번 섹션에서는 `UnlessDirective`를 테스트해 봅시다.

1.  `AppComponent`의 `condition`에 `false` 값을 할당합니다.

    <code-example header="src/app/app.component.ts (일부)" path="structural-directives/src/app/app.component.ts" region="condition"></code-example>

1.  템플릿에 디렉티브를 적용합니다.
    이 코드에서는 두 개의 `<p>` 태그에 `*appUnless`를 적용했는데, 하나는 `true`가 적용되며 다른 하나는 `false`가 적용됩니다.

    <code-example header="src/app/app.component.html (appUnless)" path="structural-directives/src/app/app.component.html" region="appUnless"></code-example>

    아스테리스크는 `appUnless` 구조 디렉티브를 간단하게 사용하는 문법입니다.
    `condition`이 거짓으로 평가되면 \(A\) 문단이 화면에 표시되며 \(B\) 문단은 화면에 표시되지 않습니다.
    그리고 `condition`이 참으로 평가되면 \(A\) 문단이 화면에 표시되지 않으며, \(B\) 문단이 표시됩니다.

1.  브라우저에서 `condition` 값을 확인하기 위한 엘리먼트와 이 값을 변경하기 위해 버튼을 추가합니다.

    <code-example header="src/app/app.component.html" path="structural-directives/src/app/app.component.html" region="toggle-info"></code-example>

디렉티브가 동작하는 것을 확인하려면 버튼을 클릭해서 `condition`의 값을 변경하면 됩니다.

<div class="lightbox">

<img alt="UnlessDirective in action" src="generated/images/guide/structural-directives/unless-anim.gif">

</div>


<!--
## Structural directive syntax reference
-->
## 구조 디렉티브 문법 참고

<!--
When you write your own structural directives, use the following syntax:

<code-example format="typescript" hideCopy language="typescript">

&ast;:prefix="( :let &verbar; :expression ) (';' &verbar; ',')? ( :let &verbar; :as &verbar; :keyExp )&ast;"

</code-example>

The following tables describe each portion of the structural directive grammar:

<code-tabs>
    <code-pane format="typescript" header="as" hideCopy language="typescript"> as = :export "as" :local ";"? </code-pane>
    <code-pane format="typescript" header="keyExp" hideCopy language="typescript"> keyExp = :key ":"? :expression ("as" :local)? ";"? </code-pane>
    <code-pane format="typescript" header="let" hideCopy language="typescript"> let = "let" :local "=" :export ";"? </code-pane>
</code-tabs>

| Keyword      | Details |
|:---          |:---     |
| `prefix`     | HTML attribute key                                 |
| `key`        | HTML attribute key                                 |
| `local`      | Local variable name used in the template           |
| `export`     | Value exported by the directive under a given name |
| `expression` | Standard Angular expression                        |
-->
구조 디렉티브를 만들려면 이런 문법을 사용하면 됩니다:

<code-example format="typescript" hideCopy language="typescript">

&ast;:prefix="( :let &verbar; :expression ) (';' &verbar; ',')? ( :let &verbar; :as &verbar; :keyExp )&ast;"

</code-example>

각각이 어떤 역할을 하는지 확인해 보세요:

<code-tabs>
    <code-pane format="typescript" header="as" hideCopy language="typescript"> as = :export "as" :local ";"? </code-pane>
    <code-pane format="typescript" header="keyExp" hideCopy language="typescript"> keyExp = :key ":"? :expression ("as" :local)? ";"? </code-pane>
    <code-pane format="typescript" header="let" hideCopy language="typescript"> let = "let" :local "=" :export ";"? </code-pane>
</code-tabs>

| 키워드      | 설명 |
|:---          |:---     |
| `prefix`     | HTML 어트리뷰트 키                                 |
| `key`        | HTML 어트리뷰트 키                                 |
| `local`      | 템플릿에 사용하는 로컬 변수 이름 |
| `export`     | 디렉티브가 외부로 노출하는 값 |
| `expression` | 일반 Angular 표현식 |


<!--
### How Angular translates shorthand
-->
### 단순 문법은 어떻게 처리될까요?

<!--
Angular translates structural directive shorthand into the normal binding syntax as follows:

| Shorthand                       | Translation |
|:---                             |:---         |
| `prefix` and naked `expression` | <code-example format="typescript" hideCopy language="typescript"> [prefix]="expression" </code-example>                                                                                                                       |
| `keyExp`                        | <code-example format="typescript" hideCopy language="typescript"> [prefixKey] "expression" (let-prefixKey="export") </code-example> <div class="alert is-helpful"> **NOTE**: <br /> The `prefix` is added to the `key` </div> |
| `let`                           | <code-example format="typescript" hideCopy language="typescript"> let-local="export" </code-example>                                                                                                                          |
-->
Angular는 구조 디렉티브의 단순 문법을 만나면 이렇게 변환합니다:

| 단순 문법                       | 변환 결과 |
|:---                             |:---         |
| `prefix`와 일반 `expression` | <code-example format="typescript" hideCopy language="typescript"> [prefix]="expression" </code-example>                                                                                                                       |
| `keyExp`                        | <code-example format="typescript" hideCopy language="typescript"> [prefixKey] "expression" (let-prefixKey="export") </code-example> <div class="alert is-helpful"> **참고**: <br /> `prefix`는 `key`에 붙어야 합니다. </div> |
| `let`                           | <code-example format="typescript" hideCopy language="typescript"> let-local="export" </code-example>                                                                                                                          |


<!--
### Shorthand examples
-->
### 단순 문법 예제


<!--
The following table provides shorthand examples:

| Shorthand                                                                                                                                                                                                     | How Angular interprets the syntax |
|:---                                                                                                                                                                                                           |:---                               |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngFor="let item of [1,2,3]" </code-example>                                                                                            | <code-example format="html" hideCopy language="html"> &lt;ng-template ngFor &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-item &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForOf]="[1,2,3]"&gt; </code-example>                                                                                                                                                                                                                                                                                                                  |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngFor="let item of [1,2,3] as items; &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; trackBy: myTrack; index as i" </code-example> | <code-example format="html" hideCopy language="html"> &lt;ng-template ngFor &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-item &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForOf]="[1,2,3]" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-items="ngForOf" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForTrackBy]="myTrack" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-i="index"&gt; </code-example> |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngIf="exp" </code-example>                                                                                                             | <code-example format="html" hideCopy language="html"> &lt;ng-template [ngIf]="exp"&gt; </code-example>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngIf="exp as value" </code-example>                                                                                                    | <code-example format="html" hideCopy language="html"> &lt;ng-template [ngIf]="exp" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-value="ngIf"&gt; </code-example>                                                                                                                                                                                                                                                                                                                                                                                                         |
-->
단순 문법이 어떻게 변환되는지 예제를 확인해 보세요:

| 단순 문법                                                                                                                                                                                                     | 변환 결과 |
|:---                                                                                                                                                                                                           |:---                               |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngFor="let item of [1,2,3]" </code-example>                                                                                            | <code-example format="html" hideCopy language="html"> &lt;ng-template ngFor &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-item &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForOf]="[1,2,3]"&gt; </code-example>                                                                                                                                                                                                                                                                                                                  |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngFor="let item of [1,2,3] as items; &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; trackBy: myTrack; index as i" </code-example> | <code-example format="html" hideCopy language="html"> &lt;ng-template ngFor &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-item &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForOf]="[1,2,3]" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-items="ngForOf" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ngForTrackBy]="myTrack" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-i="index"&gt; </code-example> |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngIf="exp" </code-example>                                                                                                             | <code-example format="html" hideCopy language="html"> &lt;ng-template [ngIf]="exp"&gt; </code-example>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <code-example format="typescript" hideCopy language="typescript"> &ast;ngIf="exp as value" </code-example>                                                                                                    | <code-example format="html" hideCopy language="html"> &lt;ng-template [ngIf]="exp" &NewLine;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; let-value="ngIf"&gt; </code-example>                                                                                                                                                                                                                                                                                                                                                                                                         |

<a id="directive-type-checks"></a>

<!--todo: To do follow up PR: move this section to a more general location because it also applies to attribute directives. -->

<!--
## Improving template type checking for custom directives
-->
## 커스텀 디렉티브를 만들면서 템플릿 타입 검사 활용하기

<!--
You can improve template type checking for custom directives by adding template guard properties to your directive definition.
These properties help the Angular template type checker find mistakes in the template at compile time, which can avoid runtime errors.
These properties are as follows:

*   A property `ngTemplateGuard_(someInputProperty)` lets you specify a more accurate type for an input expression within the template
*   The `ngTemplateContextGuard` static property declares the type of the template context

This section provides examples of both kinds of type-guard property.
For more information, see [Template type checking](guide/template-typecheck "Template type-checking guide").
-->
디렉티브를 정의할 때 템플릿 가드 프로퍼티를 추가하면 커스텀 디렉티브에 템플릿 타임 검사 기능을 추가할 수 있습니다.
그러면 이제 애플리케이션을 컴파일 할 때 템플릿에 사용된 데이터의 타임을 검사하면서 잘못된 점을 미리 발견할 수 있기 때문에 실행 시점에 발생하는 오류를 피할 수 있습니다.
이렇게 사용합니다:

*   `ngTemplateGuard_(someInputProperty)` 라고 사용하면 템플릿에 사용된 표현식의 타입을 검사합니다.
*   `ngTemplateContextGuard` 가 선언된 정적 프로퍼티의 타입을 검사합니다.

이 섹션에서는 타입 가드 프로퍼티의 예제만 살펴 봅니다.
자세한 내용은 [템플릿 타입 검사](guide/template-typecheck "Template type-checking guide") 문서를 참고하세요.


<a id="narrowing-input-types"></a>

<!--
### Making in-template type requirements more specific with template guards
-->
### 템플릿 가드로 타입 지정하기

<!--
A structural directive in a template controls whether that template is rendered at run time, based on its input expression.
To help the compiler catch template type errors, you should specify as closely as possible the required type of a directive's input expression when it occurs inside the template.

A type guard function narrows the expected type of an input expression to a subset of types that might be passed to the directive within the template at run time.
You can provide such a function to help the type-checker infer the proper type for the expression at compile time.

For example, the `NgIf` implementation uses type-narrowing to ensure that the template is only instantiated if the input expression to `*ngIf` is truthy.
To provide the specific type requirement, the `NgIf` directive defines a [static property `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties).
The `binding` value is a special case for a common kind of type-narrowing where the input expression is evaluated in order to satisfy the type requirement.

To provide a more specific type for an input expression to a directive within the template, add an `ngTemplateGuard_xx` property to the directive, where the suffix to the static property name, `xx`, is the `@Input()` field name.
The value of the property can be either a general type-narrowing function based on its return type, or the string `"binding"`, as in the case of `NgIf`.

For example, consider the following structural directive that takes the result of a template expression as an input:

<code-tabs linenums="true">
  <code-pane
    header="src/app/if-loaded.directive.ts"
    path="structural-directives/src/app/if-loaded.directive.ts">
  </code-pane>
  <code-pane
    header="src/app/loading-state.ts"
    path="structural-directives/src/app/loading-state.ts">
  </code-pane>
  <code-pane
    header="src/app/hero.component.ts"
    path="structural-directives/src/app/hero.component.ts">
  </code-pane>
</code-tabs>

In this example, the `LoadingState<T>` type permits either of two states, `Loaded<T>` or `Loading`.
The expression used as the directive's `state` input (aliased as `appIfLoaded`) is of the umbrella type `LoadingState`, as it's unknown what the loading state is at that point.

The `IfLoadedDirective` definition declares the static field `ngTemplateGuard_appIfLoaded`, which expresses the narrowing behavior.
Within the `AppComponent` template, the `*appIfLoaded` structural directive should render this template only when `state` is actually `Loaded<Hero>`.
The type guard lets the type checker infer that the acceptable type of `state` within the template is a `Loaded<T>`, and further infer that `T` must be an instance of `Hero`.
-->
구조 디렉티브는 구조 디렉티브의 표현식 결과가 실행 시점에 어떻게 결정되느냐에 따라 템플릿을 화면에 렌더링합니다.
그래서 컴파일 시점에 템플릿의 타입을 미리 검사하려면 디렉티브와 연결되는 표현식이 어떤 타입을 갖는지 지정해야 합니다.

이 때 타입 가드 함수는 표현식의 결과값 타입을 제한하는 역할을 하기 때문에, 실행 시점에 이 디렉티브에 어떤 값이 사용되는지 지정할 수 있습니다.
이 함수는 컴파일 시점에 타입을 제한하는 방식으로 동작합니다.

실제로 `NgIf`는 이런 방식을 통해 `*ngIf`에 사용되는 표현식이 참으료 평가될 때만 동작하도록 만들어져 있습니다.
이 때 특정 타입을 지정하려면 `NgIf` 디렉티브에 [정적 프로퍼티 `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties)를 지정하면 됩니다.
`binding` 값은 표현식의 결과값 타입을 새롭게 지정하기 위해 사용하는 특별한 방식입니다.

디렉티브에 사용되는 표현식의 결과값 타입을 좀 더 명확하게 지정하려면, 디렉티브에 `ngTemplateGuard_xx` 프로퍼티를 추가하면 되는데, 이 때 `xx`는 `@Input()` 로 지정된 프로퍼티의 이름을 사용합니다.
그러면 해당 프로퍼티는 타입이 정확하게 제한되며, 이 때 바인딩 표현식을 문자열 평태로 사용할 수도 있습니다.

예제 코드를 확인해 보세요:

<code-tabs linenums="true">
  <code-pane
    header="src/app/if-loaded.directive.ts"
    path="structural-directives/src/app/if-loaded.directive.ts">
  </code-pane>
  <code-pane
    header="src/app/loading-state.ts"
    path="structural-directives/src/app/loading-state.ts">
  </code-pane>
  <code-pane
    header="src/app/hero.component.ts"
    path="structural-directives/src/app/hero.component.ts">
  </code-pane>
</code-tabs>

이 예제에서 `LoadingState<T>` 타입은 `Loaded<T>`와 `Loading` 상태 2개만 허용합니다.
그래서 디렉티브의 `state` 타입을 `LoadingState`로 지정하면 이 때는 로딩 상태를 알 수 없습니다.

이 때 `IfLoadedDirective`에 정적 필드 `ngTemplateGuard_appIfLoaded`를 추가해 봅시다.
그러면 `*appIfLoaded` 구조 디렉티브는 `state` 값이 정확하게 `Loaded<Person>` 타입에 해당될 때만 엘리먼트를 화면에 렌더링합니다.
결국 타입 가드는 템플릿에 사용된 `state` 값의 타입이 `Loaded<T>` 이며, 이 때 `T`는 `Person`이라는 것으로 제한할 수 있습니다.

<a id="narrowing-context-type"></a>

<!--
### Typing the directive's context
-->
### 디렉티브 컨텍스트의 타입 지정하기

<!--
If your structural directive provides a context to the instantiated template, you can properly type it inside the template by providing a static `ngTemplateContextGuard` function.
The following snippet shows an example of such a function.

<code-tabs linenums="true">
  <code-pane
    header="src/app/trigonometry.directive.ts"
    path="structural-directives/src/app/trigonometry.directive.ts">
  </code-pane>
  <code-pane
    header="src/app/app.component.html (appTrigonometry)"
    path="structural-directives/src/app/app.component.html"
    region="appTrigonometry">
  </code-pane>
</code-tabs>
-->
커스텀 구조 디렉티브가 새로운 컨텍스트를 만들도록 정의했다면, 정적 `ngTemplateContextGuard` 함수를 사용해서 타입을 정확하게 지정할 수 있습니다.
아래 코드를 살펴봅시다.

<code-tabs linenums="true">
  <code-pane
    header="src/app/trigonometry.directive.ts"
    path="structural-directives/src/app/trigonometry.directive.ts">
  </code-pane>
  <code-pane
    header="src/app/app.component.html (appTrigonometry)"
    path="structural-directives/src/app/app.component.html"
    region="appTrigonometry">
  </code-pane>
</code-tabs>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
