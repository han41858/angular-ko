<!--
# Whitespace in templates
-->
# 공백문자

<!--
By default, Angular templates do not preserve whitespace that the framework considers unnecessary. This commonly occurs in two situations: whitespace between elements, and collapsible whitespace inside of text.
-->
기본적으로 Angular 템플릿은 불필요한 공백문자를 모두 제거합니다.
엘리먼트 사이에 있는 공백문자, 문자열 안에 공백문자가 여러 개인 경우 그렇습니다.


<!--
## Whitespace between elements
-->
## 엘리먼트 사이에 있는 공백문자

<!--
Most developers prefer to format their templates with newlines and indentation to make the template readable:

```angular-html
<section>
  <h3>User profile</p>
  <label>
    User name
    <input>
  </label>
</section>
```

This template contains whitespace between all of the elements. The following snippet shows the same HTML with each whitespace character replaced with the hash (`#`) character to highlight how much whitespace is present:

```angular-html
<!- Total Whitespace: 20 ->
<section>###<h3>User profile</p>###<label>#####User name#####<input>###</label>#</section>
```

Preserving the whitespace as written in the template would result in many unnecessary [text nodes](https://developer.mozilla.org/en-US/docs/Web/API/Text) and increase page rendering overhead. By ignoring this whitespace between elements, Angular performs less work when rendering the template on the page, improving overall performance.
-->
개발자들은 템플릿의 가독성을 높이기 위해 줄바꿈과 들여쓰기를 자주 사용합니다:

```angular-html
<section>
  <h3>User profile</p>
  <label>
    User name
    <input>
  </label>
</section>
```

이 템플릿에는 엘리먼트 사이마다 공백문자들이 존재합니다.
공백문자를 모두 해시(`#`) 기호로 바꿔보면 이렇습니다:

```angular-html
<!-- 전체 공백문자: 20 -->
<section>###<h3>User profile</p>###<label>#####User name#####<input>###</label>#</section>
```

이런 공백문자를 모두 유지하는 것은 [텍스트 노드](https://developer.mozilla.org/en-US/docs/Web/API/Text)를 불필요하게 생성하며, 화면 렌더링 성능도 나빠집니다.
그래서 Angular는 엘리먼트 사이에 있는 공백문자는 제거하는 방법으로 전체 성능을 향상시킵니다.


<!--
## Collapsible whitespace inside text
-->
## 문자열 안에 중복된 공백문자

<!--
When your web browser renders HTML on a page, it collapses multiple consecutive whitespace characters to a single character:

```angular-html
<!- What it looks like in the template ->
<p>Hello         world</p>
```

In this example, the browser displays only a single space between "Hello" and "world".

```angular-html
<!- What shows up in the browser ->
<p>Hello world</p>
```

See [How whitespace is handled by HTML, CSS, and in the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace) for more context on how this works.

Angular avoids sending these unnecessary whitespace characters to the browser in the first place by collapsing them to a single character when it compiles the template.
-->
웹 브라우저가 HTML을 렌더링 하면 연속된 공백문자는 공백문자 하나로 변환됩니다:

```angular-html
<!-- 템플릿 파일 -->
<p>Hello         world</p>
```

이렇게 작성해도 브라우저는 "Hello"와 "world" 사이에 공백을 하나만 표시합니다.

```angular-html
<!-- 브라우저에서 실제로 렌더링되는 내용 -->
<p>Hello world</p>
```

왜 이렇게 동작하는지 자세하게 알아보려면 [HTML, CSS, DOM에서 공백문자가 처리되는 방식](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace) 문서를 참고하세요.

Angular는 템플릿을 컴파일하는 시점에 불필요한 공백 문자를 공백문자 하나로 변환하여 브라우저의 부담을 줄입니다.


<!--
## Preserving whitespace
-->
## 공백문자 유지하기

<!--
You can tell Angular to preserve whitespace in a template by specifying `preserveWhitespaces: true` in the `@Component` decorator for a template.

```angular-ts
@Component({
  /* ... */,
  preserveWhitespaces: true,
  template: `
    <p>Hello         world</p>
  `
})
```

Avoid setting this option unless absolutely necessary. Preserving whitespace can cause Angular to produce significantly more nodes while rendering, slowing down your application.

You can additionally use a special HTML entity unique to Angular, `&ngsp;`. This entity produces a single space character that's preserved in the compiled output.
-->
`@Component` 데코레이터에서 `preserveWhitespaces: true` 옵션을 지정하면 공백문자를 그대로 유지할 수 있습니다.

```angular-ts
@Component({
  /* ... */,
  preserveWhitespaces: true,
  template: `
    <p>Hello         world</p>
  `
})
```

하지만 꼭 필요한 경우가 아니라면 이 옵션은 사용하지 마세요.
공백문자를 그대로 유지하면 Angular가 화면을 렌더링할 때 텍스트 노드를 더 생성해야 하기 때문에 애플리케이션 성능이 나빠질 수 있습니다.

공백문자가 필요하다면 Angular에서만 지원하는 `&ngsp;`를 사용할 수도 있습니다.
이 기호는 컴파일 이후에도 유지되는 공백문자 하나를 표현합니다.