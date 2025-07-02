<!--
# Optimizing images
-->
# 이미지 최적화

<!--
Images are a big part of many applications, and can be a major contributor to application performance problems, including low [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals) scores.

Image optimization can be a complex topic, but Angular handles most of it for you, with the `NgOptimizedImage` directive.

Note: Learn more about [image optimization with NgOptimizedImage in the in-depth guide](/guide/image-optimization).

In this activity, you'll learn how to use `NgOptimizedImage` to ensure your images are loaded efficiently.

<hr>

<docs-workflow>

<docs-step title="Import the NgOptimizedImage directive">

In order to leverage the `NgOptimizedImage` directive, first import it from the `@angular/common` library and add it to the component `imports` array.

```ts
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  ...
})
```

</docs-step>

<docs-step title="Update the src attribute to be ngSrc">

To enable the `NgOptimizedImage` directive, swap out the `src` attribute for `ngSrc`. This applies for both static image sources (i.e., `src`) and dynamic image sources (i.e., `[src]`).

<docs-code language="angular-ts" highlight="[[9], [13]]">
import { NgOptimizedImage } from '@angular/common';

@Component({
template: `     ...
    <li>
      Static Image:
      <img ngSrc="/assets/logo.svg" alt="Angular logo" width="32" height="32" />
    </li>
    <li>
      Dynamic Image:
      <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
    </li>
    ...
  `,
imports: [NgOptimizedImage],
})
</docs-code>

</docs-step>

<docs-step title="Add width and height attributes">

Note that in the above code example, each image has both `width` and `height` attributes. In order to prevent [layout shift](https://web.dev/articles/cls), the `NgOptimizedImage` directive requires both size attributes on each image.

In situations where you can't or don't want to specify a static `height` and `width` for images, you can use [the `fill` attribute](https://web.dev/articles/cls) to tell the image to act like a "background image", filling its containing element:

```angular-html
<div class="image-container"> //Container div has 'position: "relative"'
  <img ngSrc="www.example.com/image.png" fill />
</div>
```

NOTE: For the `fill` image to render properly, its parent element must be styled with `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.

</docs-step>

<docs-step title="Prioritize important images">

One of the most important optimizations for loading performance is to prioritize any image which might be the ["LCP element"](https://web.dev/articles/optimize-lcp), which is the largest on-screen graphical element when the page loads. To optimize your loading times, make sure to add the `priority` attribute to your "hero image" or any other images that you think could be an LCP element.

```ts
<img ngSrc="www.example.com/image.png" height="600" width="800" priority />
```

</docs-step>

<docs-step title="Optional: Use an image loader">

`NgOptimizedImage` allows you to specify an [image loader](guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage), which tells the directive how to format URLs for your images. Using a loader allows you to define your images with short, relative URLs:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
]
```

Final URL will be 'https://my.base.url/image.png'

```angular-html
<img ngSrc="image.png" height="600" width="800" />
```

Image loaders are for more than just convenience--they allow you to use the full capabilities of `NgOptimizedImage`. Learn more about these optimizations and the built-in loaders for popular CDNs [here](guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage).

</docs-step>

</docs-workflow>

By adding this directive to your workflow, your images are now loading using best practices with the help of Angular 🎉

If you would like to learn more, check out the [documentation for `NgOptimizedImage`](guide/image-optimization). Keep up the great work and let's learn about routing next.
-->
이미지는 보통 애플리케이션의 많은 부분을 차지하며, [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals) 점수가 낮게 나오는 등 애플리케이션 성능에 큰 영향을 미치는 요소입니다.

이미지 최적화는 깊이 있게 다루자면 아주 복잡하게 들어갈 수 있지만, Angular는 `NgOptimizedImage` 디렉티브로 단순하게 대부분의 작업을 처리합니다.

참고: [NgOptimizedImage를 활용한 이미지 최적화 심화 가이드](/guide/image-optimization) 문서를 참고하세요.

이번 튜토리얼에서는 `NgOptimizedImage` 를 사용해서 이미지를 효율적으로 로드하는 방법을 알아봅시다.

<hr>

<docs-workflow>

<docs-step title="NgOptimizedImage 디렉티브를 불러오세요">

`NgOptimizedImage` 디렉티브를 사용하려면, 먼저 컴포넌트의 `imports` 배열에 `@angular/common` 라이브러리로 제공되는 `NgOptimizedImage` 를 로드해야 합니다.

```ts
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  ...
})
```

</docs-step>

<docs-step title="src 어트리뷰트를 ngSrc로 수정하세요">

`NgOptimizedImage` 디렉티브를 적용하려면 `src` 어트리뷰트를 `ngSrc`로 변경하면 됩니다.
이 방식은 이전에 정적인 값을 사용하던 `src` 방식과 동적인 값을 사용하던 `[src]` 방식에 모두 해당됩니다.

<docs-code language="angular-ts" highlight="[[9], [13]]">
import { NgOptimizedImage } from '@angular/common';

@Component({
template: `     ...
    <li>
      Static Image:
      <img ngSrc="/assets/logo.svg" alt="Angular logo" width="32" height="32" />
    </li>
    <li>
      Dynamic Image:
      <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
    </li>
    ...
  `,
imports: [NgOptimizedImage],
})
</docs-code>

</docs-step>

<docs-step title="width, height 어트리뷰트를 추가하세요">

위 예제에서 이미지 엘리먼트마다 `width` 어트리뷰트와 `height` 어트리뷰트를 지정한 것을 주의깊게 보세요.
`NgOptimizedImage` 디렉티브를 사용할 때는 [레이아웃이 틀어지는 것](https://web.dev/articles/cls)을 방지하기 위해 이미지마다 정확한 크기를 지정하는 것을 권장합니다.

정확한 `height` 값과 `width` 값을 지정할 수 없거나 지정하지 않으려는 상황이라면, [`fill` 어트리뷰트](https://web.dev/articles/cls)를 사용해서 이 이미지가 엘리먼트를 채우는 "배경 이미지" 라고 지정하면 됩니다:

```angular-html
<div class="image-container"> //Container div has 'position: "relative"'
  <img ngSrc="www.example.com/image.png" fill />
</div>
```

참고: `fill`로 지정된 이미지가 제대로 렌더링되려면 부모 엘리먼트의 스타일은 반드시 `position: "relative"` 이거나, `position: "fixed"` 이거나, `position: "absolute"` 여야 합니다.

</docs-step>

<docs-step title="중요한 이미지는 우선순위를 높이세요">

로딩 성능에 가장 중요한 것은 화면이 로드될 때 화면에서 가장 큰 그래픽 요소인 ["LCP 엘리먼트"](https://web.dev/articles/optimize-lcp) 이미지의 우선순위를 정하는 것입니다.
로딩 시간을 최적화 하려면 "가장 중요한 이미지"나 LCP 엘리먼트라고 생각하는 이미지에 `priority` 어트리뷰트를 추가하면 됩니다.

```ts
<img ngSrc="www.example.com/image.png" height="600" width="800" priority />
```

</docs-step>

<docs-step title="선택사항: 이미지 로더를 사용해 보세요">

`NgOptimizedImage`를 사용하면서 [이미지 로더](guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage)를 사용할 수 있습니다.
이미지 로더는 디렉티브가 이미지 URL의 형식을 어떻게 다루는지 지정할 수 있는데, 이미지 로더를 사용하면 기존보다 짧은 주소로 이미지 파일을 참조할 수 있습니다.

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
]
```

최종 URL은  'https://my.base.url/image.png' 이 됩니다.

```angular-html
<img ngSrc="image.png" height="600" width="800" />
```

이미지 로더는 간편함만을 위한 것은 아닙니다.
이미지 로더를 사용하면 `NgOptimizedImage`의 모든 기능을 활용할 수 있습니다.
또다른 최적화 기법과 CDN용 내장 로더 사용방법을 확인하려면 [이 링크](guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage)를 참고하세요.

</docs-step>

</docs-workflow>

이미지 최적화 디렉티브를 추가하는 것 만으로 이제 앱에 사용되는 이미지 파일은 모두 최적의 상태로 로딩됩니다 🎉

더 자세한 내용을 확인하려면 [`NgOptimizedImage` 문서](guide/image-optimization)를 참고하세요.
잘 진행하고 있습니다. 좀 더 진행해 보세요.