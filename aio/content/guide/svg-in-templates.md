<!--
# SVG as templates
-->
# SVG를 템플릿으로 사용하기

<!--
You can use SVG files as templates in your Angular applications. When you use an SVG as the template, you are able to use directives and bindings just like with HTML templates. With these features, you can dynamically generate interactive graphics.

<div class="alert is-helpful">

See the <live-example name="template-syntax"></live-example> for a working example containing the code snippets in this guide.

</div>
-->
Angular 애플리케이션에서는 SVG 파일을 템플릿으로 활용할 수 있습니다.
SVG 파일을 템플릿으로 사용하면 SVG 엘리먼트 안에서도 HTML 템플릿과 마찬가지로 디렉티브를 사용하거나 바인딩 문법을 활용할 수 있습니다.
그래서 그래픽을 동적으로 구성할 때 활용할 수 있습니다.

<div class="alert is-helpful">


이 문서에서 다루는 예제 앱은 <live-example name="template-syntax"></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## SVG syntax example
-->
## SVG 문법 예제

<!--
The following example shows the syntax for using an SVG as a template.

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

To see property and event binding in action, add the following code to your `svg.component.svg` file:

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

The example given uses a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).
-->
SVG를 템플릿으로 사용한다면 컴포넌트 클래스 코드를 이렇게 작성할 수 있습니다.

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

이 클래스 코드와 프로퍼티와 이벤트를 바인딩하려면 `svg.component.svg` 파일을 이렇게 구성하면 됩니다:

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

이 코드에서 `click()` 부분에는 이벤트 바인딩 문법이 사용되었고, `[attr.fill]="fillColor"` 부분에는 프로퍼티 바인딩 문법이 사용되었습니다.
