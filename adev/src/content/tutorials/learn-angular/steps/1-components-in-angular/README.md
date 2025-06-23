<!--
# Components in Angular
-->
# 컴포넌트(Component)

<!--
Components are the foundational building blocks for any Angular application. Each component has three parts:

- TypeScript class
- HTML template
- CSS styles

Note: Learn more about [components in the essentials guide](/essentials/components).

In this activity, you'll learn how to update the template and styles of a component.

<hr />

This is a great opportunity for you to get started with Angular.

<docs-workflow>

<docs-step title="Update the component template">
Update the `template` property to read `Hello Universe`

```ts
template: `
  Hello Universe
`,
```

When you changed the HTML template, the preview updated with your message. Let's go one step further: change the color of the text.
</docs-step>

<docs-step title="Update the component styles">
Update the styles value and change the `color` property from `blue` to `#a144eb`.

```ts
styles: `
  :host {
    color: #a144eb;
  }
`,
```

When you check the preview, you'll find that the text color will be changed.
</docs-step>

</docs-workflow>

In Angular, you can use all the browser supported CSS and HTML that's available. If you'd like, you can store your template and styles in separate files.
-->
컴포넌트는 Angular 애플리케이션을 구성하는 기본 구성 단위입니다.
컴포넌트는 다음과 같이 구성됩니다:

- TypeScript 클래스
- HTML 템플릿
- CSS 스타일

참고: [컴포넌트 핵심 가이드](/essentials/components) 문서를 참고하세요.

이번에는 컴포넌트의 템플릿과 스타일을 직접 수정해 봅시다.

<hr />

미리 작업할 수 있는 앱을 준비해뒀습니다.

<docs-workflow>

<docs-step title="컴포넌트 템플릿을 수정하세요">
`template` 프로퍼티를 수정해서 `Hello Universe` 로 바꿔보세요.

```ts
template: `
  Hello Universe
`,
```

수정한 HTML 템플릿이 미리보기 화면에 제대로 표시되는지 확인해 보세요.
이제 텍스트 색상을 변경해 봅시다.
</docs-step>

<docs-step title="컴포넌트 스타일을 수정하세요">
`color` 프로퍼티 값을 `blue`에서 `#a144eb` 로 변경해 보세요.

```ts
styles: `
  :host {
    color: #a144eb;
  }
`,
```

그리고 미리보기 화면에 텍스트 색상이 제대로 변경되었는지 확인해 보세요.
</docs-step>

</docs-workflow>

브라우저가 지원한는 CSS, HTML 기능은 Angular 앱에도 모두 사용할 수 있습니다.
그리고 템플릿과 스타일은 별도 파일로 저장할 수 있습니다.
