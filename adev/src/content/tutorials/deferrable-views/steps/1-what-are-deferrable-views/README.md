<!--
# What are deferrable views?
-->

# 지연 로딩 뷰란?

<!--
A fully rendered Angular page may contain many different components, directives, and pipes. While certain parts of the page should be shown to the user immediately, there may be portions that can wait to display until later.
Angular's _deferrable views_, using the `@defer` syntax, can help you speed up your application by telling Angular to wait to download the JavaScript for the parts of the page that don't need to be shown right away.
-->

완전히 렌더링된 Angular 페이지에는 다양한 컴포넌트, 디렉티브, 파이프가 포함될 수 있습니다. 페이지의 어떤 부분은 사용자에게 즉시 보여줘야 하지만, 나중에 보여줘도 되는 부분이 있을 수 있습니다.
Angular의 *지연 로딩 뷰*는 `@defer` 문법을 사용해서 즉시 표시하지 않아도 되는 부분의 JavaScript 다운로드를 미룹니다. 이렇게 하면 애플리케이션 속도를 높일 수 있습니다.

<!--
In this activity, you'll learn how to use deferrable views to defer load a section of your component template.
-->

이번 실습에서는 지연 로딩 뷰를 사용해서 컴포넌트 템플릿의 일부를 지연 로딩하는 방법을 배웁니다.

<hr>

<docs-workflow>

<!--
<docs-step title="Add a `@defer` block to a section of a template">
-->

<docs-step title="템플릿 일부에 @defer 블록 추가하기">

<a id="add-a-defer-block-to-a-section-of-a-template"></a>

<!--
In your `app.ts`, wrap the `article-comments` component with a `@defer` block to defer load it.
-->

`app.ts`에서 `article-comments` 컴포넌트를 `@defer` 블록으로 감싸서 지연 로딩합니다.

```angular-html
@defer {
  <article-comments />
}
```

<!--
By default, `@defer` loads the `article-comments` component when the browser is idle.
-->

기본적으로 `@defer`는 브라우저가 유휴 상태일 때 `article-comments` 컴포넌트를 로딩합니다.

<!--
In your browser's developer console, you can see that the `article-comments-component` lazy chunk file is loaded separately (The specific file names may change from run to run):
-->

브라우저의 개발자 콘솔을 보면 `article-comments-component` 지연 로딩 청크 파일이 별도로 로딩되는 것을 확인할 수 있습니다. 실제 파일 이름은 실행할 때마다 달라질 수 있습니다:

```markdown
Initial chunk files | Names | Raw size
chunk-NNSQHFIE.js | - | 769.00 kB |
main.js | main | 229.25 kB |

Lazy chunk files | Names | Raw size
chunk-T5UYXUSI.js | article-comments-component | 1.84 kB |
```

</docs-step>
</docs-workflow>

<!--
Great work! You’ve learned the basics of deferrable views.
-->

지연 로딩 뷰의 기초를 배웠습니다!
