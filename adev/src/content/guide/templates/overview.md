<docs-decorative-header title="템플릿 문법" imgSrc="adev/src/assets/images/templates.svg"> <!-- markdownlint-disable-line -->
<!--
In Angular, a template is a chunk of HTML.
Use special syntax within a template to leverage many of Angular's features.
-->
템플릿은 HTML 묶음을 뜻하는 Angular 용어입니다.
Angular가 제공하는 기능을 템플릿에서도 자유롭게 활용해 보세요.
</docs-decorative-header>

<!--
TIP: Check out Angular's [Essentials](essentials/templates) before diving into this comprehensive guide.

Every Angular component has a **template** that defines the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) that the component renders onto the page. By using templates, Angular is able to automatically keep your page up-to-date as data changes.

Templates are usually found within either the `template` property of a `*.component.ts` file or the `*.component.html` file. To learn more, check out the [in-depth components guide](/guide/components).
-->
팁: 고급 내용을 읽어보기 전에 [핵심 가이드](essentials/templates) 문서를 먼저 확인해 보세요.

모든 Angular 컴포넌트는 화면에 렌더링할 내용을 [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)으로 정의한 **템플릿** 을 갖습니다.
템플릿을 활용하면 애플리케이션 데이터가 변경되더라도 화면을 언제나 최신 상태로 유지할 수 있습니다.

템플릿은 `*.component.ts` 파일의 `template` 프로퍼티로 정의하거나 별도 `*.component.html` 파일로 정의합니다.
자세한 내용은 [컴포넌트 심화 가이드](/guide/components) 문서를 참고하세요.


<!--
## How do templates work?
-->
## 템플릿은 어떻게 동작할까요?

<!--
Templates are based on [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) syntax, with additional features such as built-in template functions, data binding, event listening, variables, and more.

Angular compiles templates into JavaScript in order to build up an internal understanding of your application. One of the benefits of this are built-in rendering optimizations that Angular applies to your application automatically.
-->
템플릿은 [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 문법을 바탕으로 하며, 여기에 템플릿 함수, 데이터 바인딩, 이벤트 리스닝, 변수 선언 등 Angular가 제공하는 기능을 더한 것입니다.

Angular는 애플리케이션을 빌드할 때 템플릿을 JavaScript 코드로 변환하며, 애플리케이션에 맞체 렌더링도 최적화 합니다.


<!--
### Differences from standard HTML
-->
### 표준 HTML과 다른 점

<!--
Some differences between templates and standard HTML syntax include:

- Comments in the template source code are not included in the rendered output
- Component and directive elements can be self-closed (e.g., `<UserProfile />`)
- Attributes with certain characters (i.e., `[]`, `()`, etc.) have special meaning to Angular. See [binding docs](guide/templates/binding) and [adding event listeners docs](guide/templates/event-listeners) for more information.
- The `@` character has a special meaning to Angular for adding dynamic behavior, such as [control flow](guide/templates/control-flow), to templates. You can include a literal `@` character by escaping it as an HTML entity code (`&commat;` or `&#64;`).
- Angular ignores and collapses unnecessary whitespace characters. See [whitespace in templates](guide/templates/whitespace) for more details.
- Angular may add comment nodes to a page as placeholders for dynamic content, but developers can ignore these.

In addition, while most HTML syntax is valid template syntax, Angular does not support `<script>` element in templates. For more information, see the [Security](best-practices/security) page.
-->
Angular 템플릿은 표준 HTML 문법과 다른 점이 있습니다:

- 템플릿 소스 코드에 있는 주석은 렌더링 결과물에서 제외됩니다.
- 컴포넌트나 디렉티브 엘리먼트는 `<UserProfile />`과 같이 닫는 태그 없이 스스로 닫을 수 있습니다.
- `[]`나 `()` 와 같이 특수기호를 사용하는 어트리뷰트는 별도 동작을 합니다. 자세한 내용은 [바인딩 문서](guide/templates/binding)나 [이벤트 리스너 연결하기 문서](guide/templates/event-listeners)를 참고하세요.
- `@` 문자는 [흐름 제어](guide/templates/control-flow)와 같이 동적인 기능을 시작하는 기호입니다. `@` 문자를 기호로 사용하려면 `&commat;` 나 `&#64;` 같은 HTML 문자 기호를 대신 사용하세요.
- 공백문자가 여러개 있으면 하나로 합칩니다. 자세한 내용은 [공백문자](guide/templates/whitespace) 문서를 참고하세요.
- 동적 컨텐츠가 위치할 곳에는 Angular가 주석 노드를 추가하지만, 개발자가 신경쓸 필요는 없습니다.

그리고 HTML 문법은 대부분 템플릿에서도 사용할 수 있지만, `<script>` 엘리먼트는 사용할 수 없습니다.
자세한 내용은 [보안](best-practices/security) 문서를 참고하세요.


<!--
## What's next?
-->
## 다음 단계

<!--
You might also be interested in the following:

| Topics                                                                      | Details                                                                                 |
| :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| [Binding dynamic text, properties, and attributes](guide/templates/binding) | Bind dynamic data to text, properties and attributes.                                   |
| [Adding event listeners](guide/templates/event-listeners)                   | Respond to events in your templates.                                                    |
| [Two-way binding](guide/templates/two-way-binding)                          | Simultaneously binds a value and propagate changes.                                     |
| [Control flow](guide/templates/control-flow)                                | Conditionally show, hide and repeat elements.                                           |
| [Pipes](guide/templates/pipes)                                              | Transform data declaratively.                                                           |
| [Slotting child content with ng-content](guide/templates/ng-content)        | Control how components render content.                                                  |
| [Create template fragments with ng-template](guide/templates/ng-template)   | Declare a template fragment.                                                            |
| [Grouping elements with ng-container](guide/templates/ng-container)         | Group multiple elements together or mark a location for rendering.                      |
| [Variables in templates](guide/templates/variables)                         | Learn about variable declarations.                                                      |
| [Deferred loading with @defer](guide/templates/defer)                       | Create deferrable views with `@defer`.                                                  |
| [Expression syntax](guide/templates/expression-syntax)                      | Learn similarities and differences between Angular expressions and standard JavaScript. |
| [Whitespace in templates](guide/templates/whitespace)                       | Learn how Angular handles whitespace.                                                   |
-->
이런 내용도 알아보면 좋습니다:

| 주제                                                       | 설명                                                 |
|:---------------------------------------------------------|:---------------------------------------------------|
| [동적 문자열, 프로퍼티, 어트리뷰트 바인딩](guide/templates/binding)       | 동적인 데이터를 문자열, 프로퍼티, 어트리뷰트와 바인딩할 수 있습니다.            |
| [이벤트 리스너 추가하기](guide/templates/event-listeners)          | 템플릿에서 발생하는 이벤트에 반응할 수 있습니다.                        |
| [양방향 바인딩](guide/templates/two-way-binding)               | 데이터를 바인딩하면서 변화 감지도 함께 연결합니다.                       |
| [흐름 제어](guide/templates/control-flow)                    | 엘리먼트를 조건부로 표시하거나 반복할 수 있습니다.                       |
| [파이프](guide/templates/pipes)                             | 데이터 표현 형식을 변경합니다.                                  |
| [`ng-content`로 자식 컨텐츠 표시하기](guide/templates/ng-content)  | 컴포넌트가 컨텐츠를 받아 표시할 수 있습니다.                          |
| [`ng-template`으로 템플릿 조각 생성하기](guide/templates/ng-template) | 템플릿 조각을 선언합니다.                                     |
| [`ng-container`로 엘리먼트 묶기](guide/templates/ng-container)    | 엘리먼트 여러개를 묶거나 컨텐츠가 렌더링 될 위치를 지정합니다.                |
| [템플릿 변수](guide/templates/variables)                      | 템플릿에 변수를 선언할 수 있습니다.                               |
| [지연 로딩: `@defer`](guide/templates/defer)                   | `@defer` 를 사용해서 템플릿을 지연 로딩할 수 있습니다.                |
| [표현식 문법](guide/templates/expression-syntax)              | Angular 표현식과 표준 JavaScript 문법이 어떻게 비슷하고 다른지 알아봅니다. |
| [공백문자](guide/templates/whitespace)                       | Angular가 공백문자를 다루는 방식을 알아봅니다.                      |
