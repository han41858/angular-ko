<!--
# Deferrable Views
-->

# 뷰 지연 로딩(Deferrable Views)

<!--
Sometimes in app development, you end up with a lot of components that you need to reference in your app, but some of those don't need to be loaded right away for various reasons.

Maybe they are below the visible fold or are heavy components that aren't interacted with until later. In that case, we can load some of those resources later with deferrable views.

NOTE: Learn more about [deferred loading with @defer in the in-depth guide](/guide/templates/defer).

In this activity, you'll learn how to use deferrable views to defer load a section of your component template.

<hr>

<docs-workflow>

<docs-step title="Add a `@defer` block around the comments component">

In your app, the blog post page has a comment component after the post details.

Wrap the comment component with a `@defer` block to defer load it.

```angular-html
@defer {
  <comments />
}
```

The code above is an example of how to use a basic `@defer` block. By default `@defer` will load the `comments` component when the browser is idle.

</docs-step>

<docs-step title="Add a placeholder">

Add a `@placeholder` block to the `@defer` block. The `@placeholder` block is where you put html that will show before the deferred loading starts. The content in `@placeholder` blocks is eagerly loaded.

```angular-html {highlight:[3,4,5]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
}
```

</docs-step>

<docs-step title="Add a loading block">

Add a `@loading` block to the `@defer` block. The `@loading` block is where you put html that will show _while_ the deferred content is actively being fetched, but hasn't finished yet. The content in `@loading` blocks is eagerly loaded.

```angular-html {highlight:[5,6,7]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
} @loading {
  <p>Loading comments...</p>
}
```

</docs-step>

<docs-step title="Add a minimum duration">

Both `@placeholder` and `@loading` sections have optional parameters to prevent flickering from occurring when loading happens quickly. `@placeholder` has `minimum` and `@loading` has `minimum` and `after`. Add a `minimum` duration to the `@loading` block so it will be rendered for at least 2 seconds.

```angular-html {highlight:[5]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
} @loading (minimum 2s) {
  <p>Loading comments...</p>
}
```

</docs-step>

<docs-step title="Add a viewport trigger">

Deferrable views have a number of trigger options. Add a viewport trigger so the content will defer load once it enters the viewport.

```angular-html {highlight:[1]}
@defer (on viewport) {
  <comments />
}
```

</docs-step>

<docs-step title="Add content">

A viewport trigger is best used when you're deferring content that's far enough down the page that it needs to be scrolled to see. So let's add some content to our blog post. You can either write your own, or you can copy the content below and put it inside the `<article>` element.

```html {highlight:[1]}
<article>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted.
  </p>
</article>
```

Once you've added this code, now scroll down to see the deferred content load once you scroll it into the viewport.

</docs-step>

</docs-workflow>

In the activity, you've learned how to use deferrable views in your applications. Great work. 🙌

There's even more you can do with them, like different triggers, prefetching, and `@error` blocks.

If you would like to learn more, check out the [documentation for Deferrable views](/guide/templates/defer).
-->

앱을 개발하다보면 컴포넌트 중 일부는 여러가지 이유로 바로 로딩하지 않아도 되는 컴포넌트가 있습니다.

화면에 보이지 않는 영역에 있거나, 무거워서 나중에야 사용하는 컴포넌트가 그런 경우입니다.
이런 컴포넌트들은 나중에 불러오도록 지연 로딩 할 수 있습니다.

참고: 자세한 내용은 [지연 로딩하기: @defer 심화 가이드](/guide/templates/defer) 문서를 참고하세요.

이번 에제에서는 컴포넌트 템플릿의 특정 영역을 지연 로딩하는 방법을 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="`comments` 컴포넌트를 `@defer` 블록으로 감싸서 지연 로딩 영역으로 지정해 보세요">

예제 앱에서 댓글 컴포넌트는 블로그 글이 표시되는 영역 아래에 표시됩니다.

그러면 댓글 컴포넌트를 `@defer` 블록으로 감싸서 이후에 불러올 수 있습니다.

```angular-html
@defer {
  <comments />
}
```

위 코드는 `@defer` 블록을 사용하는 아주 간단한 예제입니다.
이제 `@defer` 블록 안에 있는 댓글 컴포넌트는 브라우저가 유휴상태일 때 로딩됩니다.

</docs-step>

<docs-step title="`@placeholder` 블록을 추가해 보세요">

`@defer` 블록 뒤에 `@placeholder` 블록을 추가해 보세요.
`@placeholder` 블록은 지연 로딩되는 뷰가 로딩되기 전에 표시할 HTML을 넣는 곳입니다.
`@placeholder` 블록 안에 있는 내용은 즉시 로딩됩니다.

```angular-html {highlight:[3,4,5]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
}
```

</docs-step>

<docs-step title="`@loading` 블록을 추가해 보세요">

`@defer` 블록 뒤에 `@loading` 블록을 추가해 보세요.
`@loading` 블록은 지연 로딩되는 뷰가 로딩되는 _동안_ 표시할 HTML을 넣는 곳입니다.
`@loading` 블록 안에 있는 내용도 즉시 로딩됩니다.

```angular-html {highlight:[5,6,7]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
} @loading {
  <p>Loading comments...</p>
}
```

</docs-step>

<docs-step title="최소 지연시간을 추가해 보세요">

`@placeholder`와 `@loading` 섹션은 로딩이 너무 빨리 시도될 때 발생하는 플리커링을 방지하기 위해 옵션을 받을 수 있습니다.
그래서 `@placeholder` 블록에는 `minimum` 옵션이 있으며, `@loading` 블록에는 `minimum` 옵션과 `after` 옵션이 있습니다.
`@loading` 블록에 `minimum` 을 추가해서 로딩 표시 최소 시간을 2초로 지정해 보세요.

```angular-html {highlight:[5]}
@defer {
  <comments />
} @placeholder {
  <p>Future comments</p>
} @loading (minimum 2s) {
  <p>Loading comments...</p>
}
```

</docs-step>

<docs-step title="뷰포트 트리거를 추가해 보세요">

뷰를 지연 로딩할 때 사용할 수 있는 트리거 옵션이 몇가지 있습니다.
화면이 뷰포트 영역을 만났을 때 내용물을 로딩하는 트리거를 추가해 봅시다.

```angular-html {highlight:[1]}
@defer (on viewport) {
  <comments />
}
```

</docs-step>

<docs-step title="본문 내용을 추가해 보세요">

뷰포트 트리거는 화면 아래에 있는 내용물이 스크롤해야 볼 수 있을 정도로 멀리 있을 때 사용하는 것이 가장 좋습니다.
그래서 블로그 게시물로 표시할 내용을 추가해 봅시다.
내용을 직접 작성해도 되고 아래 내용을 `<article>` 엘리먼트 안에 붙여 넣어도 됩니다.

```html {highlight:[1]}
<article>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted.
  </p>
</article>
```

코드를 추가하고 나면 이제 화면을 내려서 지연 로딩하는 뷰가 화면 안에 들어올 때 댓글 컴포넌트가 로딩되는 것을 확인할 수 있습니다.

</docs-step>

</docs-workflow>

이번 예제에서는 일부 화면 영역을 지연 로딩하는 방법을 알아봤습니다.
정말 잘하셨습니다. 🙌

예제에서 다룬 것 외에도, 트리거는 다양한 종류가 있고, 사전에 로딩할 수도 있으며, `@error` 블록을 활용할 수도 있습니다.

더 자세한 내용은 [뷰 지연 로딩](/guide/templates/defer) 문서를 참고하세요.
