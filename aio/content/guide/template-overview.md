<!--
# Understanding templates
-->
# 템플릿 이해하기

<!--
In Angular, a template is a blueprint for a fragment of a user interface (UI).  Templates are written in HTML, and special syntax can be used within a template to build on many of Angular's features.
-->
템플릿은 사용자 인터페이스를 구성합니다.
템플릿은 HTML로 작성하며, 여기에 Angular가 제공하는 문법을 적용해서 기능을 추가합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before learning template syntax, you should be familiar with the following:

* [Angular concepts](guide/architecture)
* JavaScript
* HTML
* CSS
-->
템플릿 문법에 대해 알아보려면 이 내용들을 먼저 이해해야 합니다:

* [Angular 개요](guide/architecture)
* JavaScript
* HTML
* CSS


<!--
## Enhancing HTML
-->
## HTML에 기능 추가하기

<!--
Angular extends the HTML syntax in your templates with additional functionality.  
For example, Angular’s data binding syntax helps to set Document Object Model (DOM) properties dynamically.

Almost all HTML syntax is valid template syntax.  However, because an Angular template is only a fragment of the UI, it does not include elements such as `<html>`, `<body>`, or `<base>`.

<div class="alert is-important">

To eliminate the risk of script injection attacks, Angular does not support the `<script>` element in templates.  Angular ignores the `<script>` tag and outputs a warning to the browser console.
For more information, see the [Security](guide/security) page.

</div>
-->
Angular는 HTML 문서에 기능을 추가하기 위해 특별한 문법을 제공합니다.
그래서 데이터 바인딩 문법을 활용하면 DOM(Document Object Model) 프로퍼티를 동적으로 조작할 수 있습니다.

템플릿 안에서는 HTML 문법을 거의 그대로 사용할 수 있습니다.
하지만 Angular 템플릿은 UI의 일부를 담당하기 때문에 `<html>`, `<body>`, `<base>`는 사용할 수 없습니다.

<div class="alert is-important">

스크립트 인젝션 공격을 방지하기 위해 `<script>` 엘리먼트도 지원하지 않습니다.
Angular가 `<script>` 태그를 만나면 이 태그를 처리하지 않으며 브라우저 콘솔에 경고를 표시합니다.
자세한 내용은 [보안](guide/security) 문서를 참고하세요.

</div>


<!--
## More on template syntax
-->
## 템플릿 문법 더 알아보기

<!--
You might also be interested in the following:

<div class="card-container">
    <a href="guide/interpolation" class="docs-card" title="Interpolation">
        <section>Interpolation</section>
        <p>Learn how to use interpolation and expressions in HTML.</p>
        <p class="card-footer">Interpolation</p>
    </a>
    <a href="guide/property-binding" class="docs-card" title="Property binding">
        <section>Property binding</section>
        <p>Set properties of target elements or directive @Input() decorators.</p>
        <p class="card-footer">Property binding</p>
    </a>
    <a href="guide/attribute-binding" class="docs-card" title="Attribute binding">
        <section>Attribute binding</section>
        <p>Set the value of attributes.</p>
        <p class="card-footer">Attribute binding</p>
    </a>
    <a href="guide/class-binding" class="docs-card" title="Class and style binding">
        <section>Class and style binding</section>
        <p>Set the value of class and style.</p>
        <p class="card-footer">Class and style binding</p>
    </a>
    <a href="guide/event-binding" class="docs-card" title="Event binding">
        <section>Event binding</section>
        <p>Listen for events and your HTML.</p>
        <p class="card-footer">Event binding</p>
    </a>
    <a href="guide/template-reference-variables" class="docs-card" title="Template reference variables">
        <section>Template reference variables</section>
        <p>Use special variables to reference a DOM element within a template.</p>
        <p class="card-footer">Template reference variables</p>
    </a>
    <a href="guide/built-in-directives" class="docs-card" title="Built-in directives">
        <section>Built-in directives</section>
        <p>Listen to and modify the behavior and layout of HTML.</p>
        <p class="card-footer">Built-in directives</p>
    </a>
    <a href="guide/inputs-outputs" class="docs-card" title="Inputs and Outputs">
        <section>Inputs and Outputs</section>
        <p>Share data between the parent context and child directives or components.</p>
        <p class="card-footer">Inputs and Outputs</p>
    </a>
</div>
-->
이런 내용도 확인해 보세요:

<div class="card-container">
    <a href="guide/interpolation" class="docs-card" title="Interpolation">
        <section>문자열 바인딩(Interpolation)</section>
        <p>문자열 바인딩과 표현식에 대해 알아보세요.</p>
        <p class="card-footer">문자열 바인딩</p>
    </a>
    <a href="guide/property-binding" class="docs-card" title="Property binding">
        <section>프로퍼티 바인딩</section>
        <p>엘리먼트나 @Input() 데코레이터가 지정된 프로퍼티 값을 지정해 보세요.</p>
        <p class="card-footer">프로퍼티 바인딩</p>
    </a>
    <a href="guide/attribute-binding" class="docs-card" title="Attribute binding">
        <section>어트리뷰트 바인딩</section>
        <p>어트리뷰트의 값을 지정해 보세요.</p>
        <p class="card-footer">어트리뷰트 바인딩</p>
    </a>
    <a href="guide/class-binding" class="docs-card" title="Class and style binding">
        <section>클래스/스타일 바인딩</section>
        <p>클래스/스타일 값을 지정해 보세요.</p>
        <p class="card-footer">클래스/스타일 바인딩</p>
    </a>
    <a href="guide/event-binding" class="docs-card" title="Event binding">
        <section>이벤트 바인딩</section>
        <p>HTML 문서에서 발생하는 이벤트를 감지해 보세요.</p>
        <p class="card-footer">이벤트 바인딩</p>
    </a>
    <a href="guide/template-reference-variables" class="docs-card" title="Template reference variables">
        <section>템플릿 참조 변수</section>
        <p>템플릿 안에서 DOM 엘리먼트를 참조할 수 있습니다.</p>
        <p class="card-footer">템플릿 참조 변수</p>
    </a>
    <a href="guide/built-in-directives" class="docs-card" title="Built-in directives">
        <section>기본 디렉티브</section>
        <p>HTML 레이아웃을 조작해 보세요.</p>
        <p class="card-footer">기본 디렉티브</p>
    </a>
    <a href="guide/inputs-outputs" class="docs-card" title="Inputs and Outputs">
        <section>입출력 프로퍼티</section>
        <p>부모/자식 컴포넌트/디렉티브 사이에 데이터를 주고받아 보세요.</p>
        <p class="card-footer">입출력 프로퍼티</p>
    </a>
</div>


@reviewed 2022-05-11
 