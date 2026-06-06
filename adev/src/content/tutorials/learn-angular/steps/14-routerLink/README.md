<!--
# Use RouterLink for Navigation
-->
# RouterLink 사용하기

<!--
In the app's current state, the entire page refreshes when we click on an internal link that exists within the app. While this may not seem significant with a small app, this can have performance implications for larger pages with more content where users have to redownload assets and run calculations again.

NOTE: Learn more about [adding routes to your application in the in-depth guide](/guide/routing/define-routes#adding-the-router-to-your-application).

In this activity, you'll learn how to leverage the `RouterLink` directive to make the most use of Angular Router.

<hr>

<docs-workflow>

<docs-step title="Import `RouterLink` directive">

In `app.ts` add the `RouterLink` directive import to the existing import statement from `@angular/router` and add it to the `imports` array of your component decorator.

```ts
...
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  ...
})
```

</docs-step>

<docs-step title="Add a `routerLink` to template">

To use the `RouterLink` directive, replace the `href` attributes with `routerLink`. Update the template with this change.

```angular-ts
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  ...
  template: `
    ...
    <a routerLink="/">Home</a>
    <a routerLink="/user">User</a>
    ...
  `,
  imports: [RouterLink, RouterOutlet],
})
```

</docs-step>

</docs-workflow>

When you click on the links in the navigation now, you should not see any blinking and only the content of the page itself (i.e., `router-outlet`) being changed 🎉

Great job learning about routing with Angular. This is just the surface of the `Router` API, to learn more check out the [Angular Router Documentation](guide/routing).
-->
지금까지 개발한 앱은 앱 내부에 있는 링크를 클릭하면 화면 전체가 새로 고쳐집니다.
규모가 작은 앱이라면 별 문제 없겠지만, 화면을 구성하는 내용이 많고 사용자가 리소스를 다시 다운받고 계산을 다시 실행해야 한다면 전체적인 앱 성능에 영향을 미칠 수 있습니다.

참고: 자세한 내용은 [앱에 라우팅 규칙 추가하기 심화 가이드](/guide/routing/common-router-tasks#add-your-routes-to-your-application) 문서를 참고하세요.

이번 예제에서는 `RouterLink` 디렉티브를 사용해서 Angular Router의 활용성을 극대화 해봅시다.

<hr>

<docs-workflow>

<docs-step title="`RouterLink` 디렉티브를 불러옵니다">

`@angular/router` 패키지로 제공되는 `RouterLink` 디렉티브를 `app.ts` 파일에 불러와서 컴포넌트 데코레이터의 `imports` 배열에 추가합니다.

```ts
...
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  ...
})
```

</docs-step>

<docs-step title="템플릿에 `routerLink` 를 추가하세요">

`RouterLink` 디렉티브를 사용하려면 `href` 어트리뷰트를 `routerLink`로 변경하면 됩니다.
이렇게 수정하면 됩니다.

```angular-ts
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  ...
  template: `
    ...
    <a routerLink="/">Home</a>
    <a routerLink="/user">User</a>
    ...
  `,
  imports: [RouterLink, RouterOutlet],
})
```

</docs-step>

</docs-workflow>

이제 사용자가 링크를 클릭하면 화면 전체가 새로 로드되면서 깜빡이는 것 없이, 원하는 컴포넌트가 화면에 표시됩니다 🎉

잘 하셨습니다.
하지만 여기까지 알아본 것은 `Router` API가 제공하는 전체 기능 중 아주 일부분입니다.
더 자세한 내용은 [Angular Router 문서](guide/routing)를 참고하세요.
