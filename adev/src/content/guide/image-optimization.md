<!--
# Getting started with NgOptimizedImage
-->

# NgOptimizedImage 활용하기

<!--
The `NgOptimizedImage` directive makes it easy to adopt performance best practices for loading images.

The directive ensures that the loading of the [Largest Contentful Paint (LCP)](http://web.dev/lcp) image is prioritized by:

- Automatically setting the `fetchpriority` attribute on the `<img>` tag
- Lazy loading other images by default
- Automatically generating a preconnect link tag in the document head
- Automatically generating a `srcset` attribute
- Generating a [preload hint](https://developer.mozilla.org/docs/Web/HTML/Link_types/preload) if app is using SSR

In addition to optimizing the loading of the LCP image, `NgOptimizedImage` enforces a number of image best practices, such as:

- Using [image CDN URLs to apply image optimizations](https://web.dev/image-cdns/#how-image-cdns-use-urls-to-indicate-optimization-options)
- Preventing layout shift by requiring `width` and `height`
- Warning if `width` or `height` have been set incorrectly
- Warning if the image will be visually distorted when rendered

If you're using a background image in CSS, [start here](#how-to-migrate-your-background-image).

**NOTE: Although the `NgOptimizedImage` directive was made a stable feature in Angular version 15, it has been backported and is available as a stable feature in versions 13.4.0 and 14.3.0 as well.**
-->

`NgOptimizedImage` 디렉티브를 활용하면 이미지를 다루는 모범 사례를 간단하게 도입할 수 있습니다.

이 디렉티브는 아래 작업을 통해 [가장 큰 컨텐츠 페인트(Largest Contentful Paint, LCP)](http://web.dev/lcp) 성능을 끌어올립니다:

- `<img>` 태그에 `fetchprioirity` 어트리뷰트를 자동으로 설정합니다.
- 기본적으로 이미지는 지연 로딩합니다.
- document 헤더에 사전 연결 링크 태그를 자동으로 생성합니다.
- `srcset` 어트리뷰트를 자동으로 생성합니다.
- SSR이 적용된 앱이라면 [사전로딩 힌트](https://developer.mozilla.org/docs/Web/HTML/Link_types/preload)를 생성합니다.

`NgOptimizedImage`는 LCP 이미지 로딩을 최적화하는 것 외에도, 이미지를 다루는 모범 사례를 제공합니다:

- [이미지 최적화를 위해 이미지 CDN URL](https://web.dev/image-cdns/#how-image-cdns-use-urls-to-indicate-optimization-options)을 사용합니다.
- `width`와 `height`를 강제해서 레이아웃 변경을 방지합니다.
- `width` 값이나 `height` 값이 잘못되면 경고를 표시합니다.
- 이미지를 렌더링할 때 왜곡이 발생할 것 같으면 경고를 표시합니다.

CSS 파일로 배경 이미지를 지정하고 있다면 [여기](#배경-이미지-마이그레이션하기)부터 참고하세요.

**참고: `NgOptimizedImage` 디렉티브는 Angular 15 버전부터 정식으로 도입되었지만, 하위 버전에도 백포팅되어 Angular 13.4.0이나 14.3.0에서도 사용할 수 있습니다.**

<!--
## Getting Started
-->

## 시작하기

<!--
<docs-workflow>
<docs-step title="Import `NgOptimizedImage` directive">
Import `NgOptimizedImage` directive from `@angular/common`:

```ts
import {NgOptimizedImage} from '@angular/common';
```

and include it into the `imports` array of a standalone component or an NgModule:

```ts
imports: [
  NgOptimizedImage,
  // ...
],
```

</docs-step>
<docs-step title="(Optional) Set up a Loader">
An image loader is not **required** in order to use NgOptimizedImage, but using one with an image CDN enables powerful performance features, including automatic `srcset`s for your images.

A brief guide for setting up a loader can be found in the [Configuring an Image Loader](#configuring-an-image-loader-for-ngoptimizedimage) section at the end of this page.
</docs-step>
<docs-step title="Enable the directive">
To activate the `NgOptimizedImage` directive, replace your image's `src` attribute with `ngSrc`.

```html
<img ngSrc="cat.jpg" />
```

If you're using a [built-in third-party loader](#built-in-loaders), make sure to omit the base URL path from `src`, as that will be prepended automatically by the loader.
</docs-step>
<docs-step title="Mark images as `priority`">
Always mark the [LCP image](https://web.dev/lcp/#what-elements-are-considered) on your page as `priority` to prioritize its loading.

```html
<img ngSrc="cat.jpg" width="400" height="200" priority />
```

Marking an image as `priority` applies the following optimizations:

- Sets `fetchpriority=high` (read more about priority hints [here](https://web.dev/priority-hints))
- Sets `loading=eager` (read more about native lazy loading [here](https://web.dev/browser-level-image-lazy-loading))
- Automatically generates a [preload link element](https://developer.mozilla.org/docs/Web/HTML/Link_types/preload) if [rendering on the server](guide/ssr).

Angular displays a warning during development if the LCP element is an image that does not have the `priority` attribute. A page’s LCP element can vary based on a number of factors - such as the dimensions of a user's screen, so a page may have multiple images that should be marked `priority`. See [CSS for Web Vitals](https://web.dev/css-web-vitals/#images-and-largest-contentful-paint-lcp) for more details.
</docs-step>
<docs-step title="Include Width and Height">
In order to prevent [image-related layout shifts](https://web.dev/css-web-vitals/#images-and-layout-shifts), NgOptimizedImage requires that you specify a height and width for your image, as follows:

```html
<img ngSrc="cat.jpg" width="400" height="200" />
```

For **responsive images** (images which you've styled to grow and shrink relative to the viewport), the `width` and `height` attributes should be the intrinsic size of the image file. For responsive images it's also important to [set a value for `sizes`.](#responsive-images)

For **fixed size images**, the `width` and `height` attributes should reflect the desired rendered size of the image. The aspect ratio of these attributes should always match the intrinsic aspect ratio of the image.

NOTE: If you don't know the size of your images, consider using "fill mode" to inherit the size of the parent container, as described below.
</docs-step>
</docs-workflow>
-->
<docs-workflow>
<docs-step title="`NgOptimizedImage` 디렉티브 불러오기">
`@angular/common` 패키지에서 `NgOptimizedImage` 디렉티브를 불러옵니다:

```ts
import {NgOptimizedImage} from '@angular/common';
```

그리고 독립 컴포넌트나 독립 NgModule의 `imports` 배열에 추가합니다:

```ts
imports: [
  NgOptimizedImage,
  // ...
],
```

</docs-code>
</docs-step>
<docs-step title="(선택) 로더 설정하기">
NgOptimizedImage를 활용할 때 이미지 로더를 정하는 것이 **필수** 는 아니지만, 성능 향상을 위해서라면 이미지 엘리먼트에 `srcset`을 설정하고 이미지 CDN을 활용하는 것이 좋습니다.

이미지 로더를 어떻게 설정하는지 간단하게 알아보려면 [이미지 로더 설정하기](#ngoptimizedimage용-이미지-로더-설정하기) 섹션을 참고하세요.
</docs-step>
<docs-step title="디렉티브 활성화하기">
`NgOptimizedImage` 디렉티브를 활성화하기 위해, 이미지 엘리먼트의 `src` 어트리뷰트를 `ngSrc`로 변경합니다.

```html
<img ngSrc="cat.jpg" />
```

[기본 로더](#기본-로더)를 사용하고 있다면, `src`를 지정할 때 베이스 URL은 꼭 제거하세요.
베이스 주소는 이미지 로더가 직접 적용합니다.
</docs-step>
<docs-step title="이미지에 `priority` 설정하기">
화면에서 [LCP 이미지](https://web.dev/lcp/#what-elements-are-considered)는 `priority`를 설정해서 로딩 우선순위를 높이세요.

```html
<img ngSrc="cat.jpg" width="400" height="200" priority />
```

이미지 엘리먼트에 `priority`를 적용하면 이런 최적화가 수행됩니다:

- `fetchpriority=high`가 설정됩니다. 사용할 수 있는 옵션은 [여기](https://web.dev/priority-hints)를 참고하세요.
- `loading=eager`가 설정됩니다. 기본 지연 로딩은 [여기](https://web.dev/browser-level-image-lazy-loading)를 참고하세요.
- [서버에서 렌더링하는 경우](guide/ssr)라면 [사전로드 링크 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Link_types/preload)를 자동으로 생성합니다.

LCP 엘리먼트에 `priority` 어트리뷰트가 설정되어 있지 않으면 Angular는 경고를 표시합니다.
화면에 표시되는 LCP 엘리먼트는 사용자 화면 해상도 등 여러가지 요인에 따라 다르게 표시될 수 있기 때문에, `priority`를 이미지 여러개에 지정해야 할 수도 있습니다.
자세한 내용은 [웹 바이탈을 위한 CSS](https://web.dev/css-web-vitals/#images-and-largest-contentful-paint-lcp)을 참고하세요.
</docs-step>
<docs-step title="너비, 높이 지정하기">
[이미지 때문에 레이아웃이 변경되는 것](https://web.dev/css-web-vitals/#images-and-layout-shifts)을 방지하기 위해, NgOptimizedImage는 이미지의 너비와 높이 입력을 강제합니다:

```html
<img ngSrc="cat.jpg" width="400" height="200">
```

뷰포트 크기에 따라 크기가 변경되거나 화면에서 없어지는 **반응형 이미지(responsive images)** 를 사용한다면, `width` 값과 `height` 값은 이미지 파일의 원래 크기로 지정하세요.
반응형 이미지는 [`sizes` 값을 설정하는 것](#반응형-이미지)도 중요합니다.

**고정 크기 이미지(fixed size images)** 는 화면에 표시하려는 `width` 값과 `height` 값을 지정하면 됩니다.
화면에 표시되는 가로-세로 비율은 이미지 자체의 가로-세로 비율곽 ㅏㅌ아야 합니다.

참고: 이미지의 크기를 정확하게 알지 못한다면, 부모 컨테이너를 채우는 "fill 모드" 사용을 고려해 보세요.
</docs-step>
</docs-workflow>

<!--
## Using `fill` mode
-->

## `fill` 모드 사용하기

<!--
In cases where you want to have an image fill a containing element, you can use the `fill` attribute. This is often useful when you want to achieve a "background image" behavior. It can also be helpful when you don't know the exact width and height of your image, but you do have a parent container with a known size that you'd like to fit your image into (see "object-fit" below).

When you add the `fill` attribute to your image, you do not need and should not include a `width` and `height`, as in this example:

```html
<img ngSrc="cat.jpg" fill />
```

You can use the [object-fit](https://developer.mozilla.org/docs/Web/CSS/object-fit) CSS property to change how the image will fill its container. If you style your image with `object-fit: "contain"`, the image will maintain its aspect ratio and be "letterboxed" to fit the element. If you set `object-fit: "cover"`, the element will retain its aspect ratio, fully fill the element, and some content may be "cropped" off.

See visual examples of the above at the [MDN object-fit documentation.](https://developer.mozilla.org/docs/Web/CSS/object-fit)

You can also style your image with the [object-position property](https://developer.mozilla.org/docs/Web/CSS/object-position) to adjust its position within its containing element.

IMPORTANT: For the "fill" image to render properly, its parent element **must** be styled with `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.
-->

이미지를 엘리먼트에 가득 채우고 싶다면 `fill` 어트리뷰트를 사용하면 됩니다.
이 방식은 이미지를 배경 이미지 처럼 지정하려고 할 때 유용합니다.
그리고 이미지 자체의 너비와 높이는 모르지만, 부모 컨테이너의 크기를 알고 있을 때에도 활용할 수 있습니다.

이미지에 `fill` 어트리뷰트를 지정하면 `width`나 `height`를 지정할 수 없습니다.
예제 코드를 봅시다:

```html
<img ngSrc="cat.jpg" fill />
```

이미지를 컨테이너 가득 채울 때는 [object-fit](https://developer.mozilla.org/docs/Web/CSS/object-fit) CSS 프로퍼티를 사용할 수도 있습니다.
`object-fit: "contain"` 라고 지정하면 이미지는 비율을 유지한 채로 엘리먼트 범위를 넘지 않는 정도로 엘리먼트를 채웁니다.
그리고 `object-fit: "cover"` 라고 지정하면 이미지는 비율을 유지한 채로 레터박스가 없게 엘리먼트를 채웁니다.
엘리먼트 크기를 넘는 부분은 잘려 보일 수 있습니다.

어떻게 다른지 직접 확인해보려면 [MDN object-fit 문서](https://developer.mozilla.org/docs/Web/CSS/object-fit)를 참고하세요.

이렇게 이미지를 채우는 경우 [object-position 프로퍼티](https://developer.mozilla.org/docs/Web/CSS/object-position)를 지정해서 이미지가 표시되는 위치를 지정할 수 있습니다.

중요: 이미지에 `fill` 어트리뷰트를 적용할 때는, 부모 엘리먼트에 `position: "relative"`, `position: "fixed"`, `position: "absolute"` 중에 하나가 **반드시** 설정되어야 합니다.

<!--
## How to migrate your background image
-->

## 배경 이미지 마이그레이션하기

<!--
Here's a simple step-by-step process for migrating from `background-image` to `NgOptimizedImage`.
For these steps, we'll refer to the element that has an image background as the "containing element":

1. Remove the `background-image` style from the containing element.
2. Ensure that the containing element has `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.
3. Create a new image element as a child of the containing element, using `ngSrc` to enable the `NgOptimizedImage` directive.
4. Give that element the `fill` attribute. Do not include a `height` and `width`.
5. If you believe this image might be your [LCP element](https://web.dev/lcp/), add the `priority` attribute to the image element.

You can adjust how the background image fills the container as described in the [Using fill mode](#using-fill-mode) section.
-->

`background-image`를 `NgOptimizedImage`로 마이그레이션하는 과정을 간단하게 살펴봅시다.
다음 단계에서 이미지 배경이 들어가는 엘리먼트를 "컨테이너 엘리먼트"라고 하겠습니다:

1. 컨테이너 엘리먼트에서 `background-image` 스타일을 제거합니다.
2. 컨테이너 엘리먼트에 `position: "relative"`, `position: "fixed"`,  `position: "absolute"` 중에 하나가 지정되어 있는지 확인하세요.
3. 컨테이너 엘리먼트의 자식으로 이미지 엘리먼트를 선언하고 `ngSrc` 어트리뷰트를 붙여서 `NgOptimizedImage` 디렉티브를 연결합니다.
4. 이미지 엘리먼트에 `fill` 어트리뷰트를 지정합니다. `height`나 `width`는 지정하지 마세요.
5. 이 이미지가 [LCP 엘리먼트](https://web.dev/lcp/)라면, 이미지 엘리먼트에 `priority` 어트리뷰트를 지정합니다.

배경 이미지가 컨테이너를 어떻게 채울지 지정하려면 [fill 모드 사용하기](#fill-모드-사용하기) 섹션을 참고하세요.

<!--
## Using placeholders
-->

## 플레이스홀더(placeholder) 사용하기

<!--
### Automatic placeholders
-->

### 자동 플레이스홀더

<!--
NgOptimizedImage can display an automatic low-resolution placeholder for your image if you're using a CDN or image host that provides automatic image resizing. Take advantage of this feature by adding the `placeholder` attribute to your image:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder />
```

Adding this attribute automatically requests a second, smaller version of the image using your specified image loader. This small image will be applied as a `background-image` style with a CSS blur while your image loads. If no image loader is provided, no placeholder image can be generated and an error will be thrown.

The default size for generated placeholders is 30px wide. You can change this size by specifying a pixel value in the `IMAGE_CONFIG` provider, as seen below:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      placeholderResolution: 40
    }
  },
],
```

If you want sharp edges around your blurred placeholder, you can wrap your image in a containing `<div>` with the `overflow: hidden` style. As long as the `<div>` is the same size as the image (such as by using the `width: fit-content` style), the "fuzzy edges" of the placeholder will be hidden.
-->

이미지 크기를 자동으로 제공하는 CDN이나 이미지 호스팅 서비스를 사용한다면 NgOptimizedImage로 저해상도 플레이스 홀더를 자동으로 표시할 수 있습니다.
이미지 엘리먼트에 `placeholder` 어트리뷰트만 추가하면 됩니다:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder />
```

이 어트리뷰트를 추가하면 NgOptimizedImage 디렉티브는 지정된 이미지 로더를 사용해서 저해상도 플레이스홀더를 자동으로 요청합니다.
이렇게 불러오는 이미지는 CSS 블러(blur) 효과가 적용된 `background-image` 스타일로 실제 이미지가 로드될 때까지 사용됩니다.
이미지 로더가 지정되지 않으면, 플레이스홀더를 불러올 수 없기 때문에 오류가 발생합니다.

플레이스홀더의 기본 너비는 30px 입니다.
이 기본 크기는 `IMAGE_CONFIG` 프로바이더를 사용해서 변경할 수 있습니다:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      placeholderResolution: 40
    }
  },
],
```

플레이스홀더 주변이 흐릿하게 표시되는 것을 방지하려면, 컨테이너 엘리먼트 `<div>`에 `overflow: hidden` 스타일을 지정하면 됩니다.
`width: fit-content` 스타일을 지정해서 이미지와 `<div>` 엘리먼트의 크기가 동일한 경우에는, 플레이스홀더의 흐릿한 가장자리가 표시되지 않습니다.

<!--
### Data URL placeholders
-->

### 데이터 URL 플레이스홀더

<!--
You can also specify a placeholder using a base64 [data URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) without an image loader. The data url format is `data:image/[imagetype];[data]`, where `[imagetype]` is the image format, just as `png`, and `[data]` is a base64 encoding of the image. That encoding can be done using the command line or in JavaScript. For specific commands, see [the MDN documentation](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#encoding_data_into_base64_format). An example of a data URL placeholder with truncated data is shown below:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder="data:image/png;base64,iVBORw0K..." />
```

However, large data URLs increase the size of your Angular bundles and slow down page load. If you cannot use an image loader, the Angular team recommends keeping base64 placeholder images smaller than 4KB and using them exclusively on critical images. In addition to decreasing placeholder dimensions, consider changing image formats or parameters used when saving images. At very low resolutions, these parameters can have a large effect on file size.
-->

플레이스홀더에는 이미지 로더 대신 base64 [데이터 URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)를 사용할 수도 있습니다.
이 데이터 url은 `data:image/[imagetype];[data]` 형식이며, `[imagetype]` 자리에는 이미지의 형식이 들어가는데, `png`와 같이 들어갑니다.
그리고 `[data]` 자리에는 base64로 인코딩된 이미지가 들어갑니다.
이미지 인코딩은 커맨드라인이나 JavaScript로도 실행할 ㅅ ㅜ있습니다.
자세한 내용은 [MDN 문서](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#encoding_data_into_base64_format)를 참고하세요.
데이터 URL은 아래와 같이 사용하면 됩니다:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder="data:image/png;base64,iVBORw0K..." />
```

그런데, 데이터 URL의 크기가 커지면 Angular 빌드 결과물의 크기가 함께 커지기 때문에 페이지 로딩이 느려질 수 있습니다.
이미지 로더를 사용하지 못하는 경우에는 base64 플레이스홀더 이미지를 권장하지만, 이 크기는 최대 4KB를 넘지 않을 것을 권장합니다.
플레이스홀더의 크기를 줄일 수 없다면 이미지의 형식이나 변수를 조정해서 이미지의 크기를 줄이는 것도 고려할 만 합니다.
해상도가 낮은 이미지라면 이런 변수 조정이 파일 크기에 큰 영향을 미칠 수 있습니다.

<!--
### Non-blurred placeholders
-->

### 흐리게 처리되지 않는 플레이스홀더

<!--
By default, NgOptimizedImage applies a CSS blur effect to image placeholders. To render a placeholder without blur, provide a `placeholderConfig` argument with an object that includes the `blur` property, set to false. For example:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder [placeholderConfig]="{blur: false}" />
```
-->

기본적으로 NgOptimizedImage는 이미지 플레이스 홀더에 CSS 블러 효과를 적용합니다.
플레이스홀더에 흐림 효과를 적용하지 않으려면 `placeholderConfig`인자를 사용해서 `blur` 프로퍼티 값을 `false`로 지정하면 됩니다:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder [placeholderConfig]="{blur: false}" />
```

<!--
## Adjusting image styling
-->

## 이미지 스타일 조정하기

<!--
Depending on the image's styling, adding `width` and `height` attributes may cause the image to render differently. `NgOptimizedImage` warns you if your image styling renders the image at a distorted aspect ratio.

You can typically fix this by adding `height: auto` or `width: auto` to your image styles. For more information, see the [web.dev article on the `<img>` tag](https://web.dev/patterns/web-vitals-patterns/images/img-tag).

If the `width` and `height` attribute on the image are preventing you from sizing the image the way you want with CSS, consider using `fill` mode instead, and styling the image's parent element.
-->

이미 엘리먼트에 `width`, `height` 어트리뷰트를 추가하면 이미지가 다르게 렌더링 될 수 있습니다.
이런 경우 이미지 비율이 왜곡되면 `NgOptimizedImage`가 경고를 표시합니다.

일반적으로는 `height: auto`, `width: auto`를 사용하면 이 문제를 방지할 수 있습니다.
자세한 내용은 [web.dev의 `<img>` 태그](https://web.dev/patterns/web-vitals-patterns/images/img-tag) 문서를 참고하세요.

`width`, `height` 어트리뷰트 때문에 이미지를 원하는 대로 조정할 수 없다면, 이미지 엘리먼트에 `fill` 모드를 적용하고 부모 엘리먼트 스타일 조정을 고려해 보세요.

<!--
## Performance Features
-->

## 성능 향상

<!--
NgOptimizedImage includes a number of features designed to improve loading performance in your app. These features are described in this section.
-->

NgOptimizedImage는 앱 성능 향상을 위한 기능도 다양하게 제공합니다.
어떤 기능을 제공하는지 알아봅시다.

<!--
### Add resource hints
-->

### 리소스 힌트 추가

<!--
A [`preconnect` resource hint](https://web.dev/preconnect-and-dns-prefetch) for your image origin ensures that the LCP image loads as quickly as possible.

Preconnect links are automatically generated for domains provided as an argument to a [loader](#optional-set-up-a-loader). If an image origin cannot be automatically identified, and no preconnect link is detected for the LCP image, `NgOptimizedImage` will warn during development. In that case, you should manually add a resource hint to `index.html`. Within the `<head>` of the document, add a `link` tag with `rel="preconnect"`, as shown below:

```html
<link rel="preconnect" href="https://my.cdn.origin" />
```

To disable preconnect warnings, inject the `PRECONNECT_CHECK_BLOCKLIST` token:

```ts

providers: [
{provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
],

```

See more information on automatic preconnect generation [here](#why-is-a-preconnect-element-not-being-generated-for-my-image-domain).
-->

LCP 이미지를 최대한 빠르게 로드하려면 [`preconnect` 리소스 힌트](https://web.dev/preconnect-and-dns-prefetch)를 사용하면 됩니다.

사전 연결 링크는 [로더](#선택-로더-설정하기)에 인자로 전달되는 도메인에 대해 자동으로 생성됩니다.
이미지의 출처를 자동으로 감지할 수 없는 경우에는, LCP 이미지라고 해도 사전 연결 링크가 생성되지 않으며, 개발 서버에서는 `NgOptimizedImage`가 경고를 표시합니다.
이런 경우는 `index.html`에 리소스 힌트를 직접 추가하면 됩니다.
아래 예제 코드와 같이 도큐먼트의 `<head>`에 `link` 태그를 추가하고 `rel="preconnect"`를 지정하면 됩니다:

```html
<link rel="preconnect" href="https://my.cdn.origin" />
```

사전 연결 경고를 무시하려면 `PRECONNECT_CHECK_BLOCKLIST` 토큰을 의존성으로 주입하면 됩니다:

```ts

providers: [
  {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
],

```

자동으로 생성되는 사전 연결 힌트에 대해 알아보려면 [이 섹션](#이미지-도메인에-사전-연결-엘리먼트가-연결되지-않는-이유는-무엇일까요)을 참고하세요.

<!--
### Request images at the correct size with automatic `srcset`
-->

### 이미지를 원하는 사이즈로 요청하기: `srcset`

<!--
Defining a [`srcset` attribute](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset) ensures that the browser requests an image at the right size for your user's viewport, so it doesn't waste time downloading an image that's too large. `NgOptimizedImage` generates an appropriate `srcset` for the image, based on the presence and value of the [`sizes` attribute](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) on the image tag.
-->

[`srcset` 어트리뷰트](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset)를 지정하면 사용자의 뷰포트에 맞는 이미지를 적절하게 로드할 수 있기 때문에, 불필요하게 큰 이미지를 다운로드하지 않아도 됩니다.
`NgOptimizedImage`는 [`sizes` 어트리뷰트](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) 값에 따라 `srcset`을 자동으로 생성합니다.

<!--
#### Fixed-size images
-->

#### 크기가 고정된 이미지

<!--
If your image should be "fixed" in size (i.e. the same size across devices, except for [pixel density](https://web.dev/codelab-density-descriptors/)), there is no need to set a `sizes` attribute. A `srcset` can be generated automatically from the image's width and height attributes with no further input required.

Example srcset generated:

```html
<img ... srcset="image-400w.jpg 1x, image-800w.jpg 2x" />
```
-->

이미지의 크기가 사용자 기기에 관계없이 동일하고 [픽셀 해상도](https://web.dev/codelab-density-descriptors/)만 다르다면, `sizes` 어트리뷰트를 설정할 필요가 없습니다.
이 경우에는 이미지의 너비와 높이에 따라 `srcset`이 자동으로 생성됩니다:

```html
<img ... srcset="image-400w.jpg 1x, image-800w.jpg 2x" />
```

<!--
#### Responsive images
-->

#### 반응형 이미지

<!--
If your image should be responsive (i.e. grow and shrink according to viewport size), then you will need to define a [`sizes` attribute](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) to generate the `srcset`.

If you haven't used `sizes` before, a good place to start is to set it based on viewport width. For example, if your CSS causes the image to fill 100% of viewport width, set `sizes` to `100vw` and the browser will select the image in the `srcset` that is closest to the viewport width (after accounting for pixel density). If your image is only likely to take up half the screen (ex: in a sidebar), set `sizes` to `50vw` to ensure the browser selects a smaller image. And so on.

If you find that the above does not cover your desired image behavior, see the documentation on [advanced sizes values](#advanced-sizes-values).

Note that `NgOptimizedImage` automatically prepends `"auto"` to the provided `sizes` value. This is an optimization that increases the accuracy of srcset selection on browsers which support `sizes="auto"`, and is ignored by browsers which do not.

By default, the responsive breakpoints are:

`[16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]`

If you would like to customize these breakpoints, you can do so using the `IMAGE_CONFIG` provider:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
    }
  },
],
```

If you would like to manually define a `srcset` attribute, you can provide your own using the `ngSrcset` attribute:

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" />
```

If the `ngSrcset` attribute is present, `NgOptimizedImage` generates and sets the `srcset` based on the sizes included. Do not include image file names in `ngSrcset` - the directive infers this information from `ngSrc`. The directive supports both width descriptors (e.g. `100w`) and density descriptors (e.g. `1x`).

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" sizes="50vw" />
```
-->

뷰포트 크기에 따라 이미지가 작아지거나 커지는 경우라면, [`sizes` 어트리뷰트](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes)를 지정해서 `srcset`을 생성해야 합니다.

`sizes`를 사용해본 적이 없다면, 뷰포트를 기준으로 설정하는 것이 좋습니다.
CSS에서 이미지가 뷰포트 100%를 채우는 경우에는, `sizes`를 `100vw`로 설정하면 브라우저가 픽셀 해상도를 고려하여 적절한 크기의 `srcset` 이미지를 선택합니다.
그리고 사이드바와 같이 화면의 최대 반 정도를 채우는 이미지라면 `sizes`를 `50vw`로 설정하면 브라우저가 더 작은 이미지를 선택해서 로드합니다.

여기까지 읽고 더 원하는 내용이 있다면, [`sizes` 고급 활용](#sizes-고급-활용) 섹션을 참고하세요.

`NgOptimizedImage`는 `sizes` 값 앞에 `"auto"`를 자동으로 추가합니다.
이 경우 브라우저가 `sizes="auto"`를 지원한다면 srcset에 맞게 적절한 이미지를 로드할 수 있으며, `sizes="auto"`를 지원하지 않는 브라우저에서는 무시됩니다.

기본적으로 반응형 레이아웃의 기준점은 다음과 같이 나눕니다:

`[16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]`

이 기준점을 변경하려면 `IMAGE_CONFIG` 프로바이더를 지정하면 됩니다:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
    }
  },
],
```

만약 `srcset` 어트리뷰트를 수동으로 지정하려면 `ngSrcset` 어트리뷰트를 지정하면 됩니다:

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" />
```

`ngSrcset` 어트리뷰트가 존재하면 `NgOptimizedImage`는 이 어트리뷰트에 지정된 크기를 기준으로 `srcset` 어트리뷰트를 설정합니다.
이 때 `ngSrcset`에 이미지 파일 이름을 포함하지 마세요.
이 정보는 디렉티브가 `ngSrc`를 활용해서 추론합니다.
`NgOptimizedImage` 디렉티브는 `100w`과 같은 너비 설명자와, `1x`와 같은 밀도 설명자를 모두 지원합니다.

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" sizes="50vw" />
```

<!--
### Disabling automatic srcset generation
-->

### `srcset` 자동 생성 비활성화

<!--
To disable srcset generation for a single image, you can add the `disableOptimizedSrcset` attribute on the image:

```html

<img ngSrc="about.jpg" disableOptimizedSrcset />

```
-->

`srcset` 자동 생성을 비활성화 하려면 이미지 엘리먼트에 `disableOptimizedSrcset` 어트리뷰트를 추가하면 됩니다:

```html
<img ngSrc="about.jpg" disableOptimizedSrcset />
```

<!--
### Disabling image lazy loading
-->

### 이미지 지연로딩 비활성화

<!--
By default, `NgOptimizedImage` sets `loading=lazy` for all images that are not marked `priority`. You can disable this behavior for non-priority images by setting the `loading` attribute. This attribute accepts values: `eager`, `auto`, and `lazy`. [See the documentation for the standard image `loading` attribute for details](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/loading#value).

```html
<img ngSrc="cat.jpg" width="400" height="200" loading="eager" />
```
-->

`NgOptimizedImage`는 `priority`가 지정되지 않은 모든 이미지 파일에 `loading=lazy`를 지정합니다.
그런데 이미지들의 우선순위가 따로 없다면 이 기능을 비활성화할 수 있습니다.
`loading` 어트리뷰트에 `eager`, `auto`, `lazy`를 활용하면 됩니다.
자세한 내용은 [표준 이미지 `loading` 어트리뷰트에 대한 문서](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/loading#value)를 참고하세요.

```html
<img ngSrc="cat.jpg" width="400" height="200" loading="eager" />
```

<!--
### Controlling image decoding
-->

### 이미지 디코딩 지정

<!--
By default, `NgOptimizedImage` sets `decoding="auto"` for all images. This allows the browser to decide the optimal time to decode an image after it has been fetched. When an image is marked as `priority`, Angular automatically sets `decoding="sync"` to ensure the image is decoded and painted as early as possible helping improve **Largest Contentful Paint (LCP)** performance.

You can still override this behavior by explicitly setting the `decoding` attribute.
[See the documentation for the standard image `decoding` attribute for details](https://developer.mozilla.org/docs/Web/HTML/Element/img#decoding).

```html
<!- Default: decoding is 'auto' ->
<img ngSrc="gallery/landscape.jpg" width="1200" height="800" />

<!- Decode the image asynchronously to avoid blocking the main thread.->
<img ngSrc="gallery/preview.jpg" width="600" height="400" decoding="async" />

<!- Priority images automatically use decoding="sync" ->
<img ngSrc="awesome.jpg" width="500" height="625" priority />

<!- Decode immediately (can block) when you need the pixels right away ->
<img ngSrc="hero.jpg" width="1600" height="900" decoding="sync" />
```

**Allowed values**

- `auto` (default): lets the browser choose the optimal strategy.
- `async`: decodes the image asynchronously, avoiding main‑thread blocking where possible.
- `sync`: decodes the image immediately; can block rendering but ensures pixels are ready as soon as the image is available.
-->

`NgOptimizedImage`는 모든 이미지에 `decoding="auto"`를 지정합니다.
이 동작은 브라우저가 이미지 파일을 로드한 후에 디코딩하는 방식을 지정하기 위한 것입니다.
만약 이미지 파일에 `priority`가 지정되어 있다면, Angular는 해당 이미지 엘리먼트에 `decoding="sync"`를 지정해서 최대 컨텐츠 페인트(Largest Contentful Paint, LCP)가 최대한 빨리 표시될 수 있도록 합니다.

이 동작은 `decoding` 어트리뷰트를 직접 지정해서 오버라이드 할 수 있습니다.
자세한 내용은 [표준 이미지 `decoding` 어트리뷰트](https://developer.mozilla.org/docs/Web/HTML/Element/img#decoding) 문서를 참고하세요.

```html
<!-- 기본값: 디코딩 방식은 'auto' 입니다. -->
<img ngSrc="gallery/landscape.jpg" width="1200" height="800" />

<!-- 메인 스레드 블로킹을 방지하기 위해 이미지 디코딩을 비동기로 수행합니다. -->
<img ngSrc="gallery/preview.jpg" width="600" height="400" decoding="async" />

<!-- 우선순위가 높은 이미지는 decoding="sync"가 지정됩니다. -->
<img ngSrc="awesome.jpg" width="500" height="625" priority />

<!-- decoding="sync"를 지정하면 메인 스레드를 잠시 막더라도 즉시 디코딩합니다. -->
<img ngSrc="hero.jpg" width="1600" height="900" decoding="sync" />
```

**사용할 수 있는 값**

- `auto` (기본값): 브라우저가 최적의 방식을 선택하도록 맡깁니다.
- `async`: 이미지를 비동기로 디코딩합니다. 메인 스레드 중단을 피할 수 있습니다.
- `sync`: 이미지를 즉시 디코딩합니다. 렌더링이 잠시 멈출 수 있지만 이미지는 즉시 표시됩니다.

<!--
### Advanced 'sizes' values
-->

### `sizes` 고급 활용

<!--
You may want to have images displayed at varying widths on differently-sized screens. A common example of this pattern is a grid- or column-based layout that renders a single column on mobile devices, and two columns on larger devices. You can capture this behavior in the `sizes` attribute, using a "media query" syntax, such as the following:

```html
<img ngSrc="cat.jpg" width="400" height="200" sizes="(max-width: 768px) 100vw, 50vw" />
```

The `sizes` attribute in the above example says "I expect this image to be 100 percent of the screen width on devices under 768px wide. Otherwise, I expect it to be 50 percent of the screen width.

For additional information about the `sizes` attribute, see [web.dev](https://web.dev/learn/design/responsive-images/#sizes) or [mdn](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes).
-->

다양한 화면 크기에 따라 이미지를 다양한 크기로 표시해야 하는 경우가 있습니다.
모바일 장치에서는 그리드나 칼럼 기반 레이아웃에서 한 칸으로 표시하던 것을, 화면이 더 큰 장치에서는 두 칸으로 표시하는 경우가 일반적인 경우일 것입니다.
이런 경우는 다음과 같이 "미디어 쿼리" 문법을 사용해서 `sizes` 어트리뷰트를 지정하면 됩니다:

```html
<img ngSrc="cat.jpg" width="400" height="200" sizes="(max-width: 768px) 100vw, 50vw" />
```

이렇게 작성하면, "화면 크기가 768px보다 작으면 이미지는 100% 너비로 표시하고, 화면 크기가 768px보다 크다면 화면 전체 너비의 50%로 표시한다"는 것을 의미합니다.

`sizes` 어트리뷰트에 대해 자세하게 알아보려면 [web.dev](https://web.dev/learn/design/responsive-images/#sizes)나 [mdn](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) 문서를 참고하세요.

<!--
## Configuring an image loader for `NgOptimizedImage`
-->

## `NgOptimizedImage`용 이미지 로더 설정하기

<!--
A "loader" is a function that generates an [image transformation URL](https://web.dev/image-cdns/#how-image-cdns-use-urls-to-indicate-optimization-options) for a given image file. When appropriate, `NgOptimizedImage` sets the size, format, and image quality transformations for an image.

`NgOptimizedImage` provides both a generic loader that applies no transformations, as well as loaders for various third-party image services. It also supports writing your own custom loader.

| Loader type                            | Behavior                                                                                                                                                                                                                       |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generic loader                         | The URL returned by the generic loader will always match the value of `src`. In other words, this loader applies no transformations. Sites that use Angular to serve images are the primary intended use case for this loader. |
| Loaders for third-party image services | The URL returned by the loaders for third-party image services will follow API conventions used by that particular image service.                                                                                              |
| Custom loaders                         | A custom loader's behavior is defined by its developer. You should use a custom loader if your image service isn't supported by the loaders that come preconfigured with `NgOptimizedImage`.                                   |

Based on the image services commonly used with Angular applications, `NgOptimizedImage` provides loaders preconfigured to work with the following image services:

| Image Service             | Angular API               | Documentation                                                               |
| :------------------------ | :------------------------ | :-------------------------------------------------------------------------- |
| Cloudflare Image Resizing | `provideCloudflareLoader` | [Documentation](https://developers.cloudflare.com/images/image-resizing/)   |
| Cloudinary                | `provideCloudinaryLoader` | [Documentation](https://cloudinary.com/documentation/resizing_and_cropping) |
| ImageKit                  | `provideImageKitLoader`   | [Documentation](https://docs.imagekit.io/)                                  |
| Imgix                     | `provideImgixLoader`      | [Documentation](https://docs.imgix.com/)                                    |
| Netlify                   | `provideNetlifyLoader`    | [Documentation](https://docs.netlify.com/image-cdn/overview/)               |

To use the **generic loader** no additional code changes are necessary. This is the default behavior.
-->

로더(loader)는 이미지 파일을 [이미지 URL로 변환](https://web.dev/image-cdns/#how-image-cdns-use-urls-to-indicate-optimization-options)하는 함수를 의미합니다.
`NgOptimizedImage`는 이미지의 크기, 형식, 이미지 품질을 지정합니다.

`NgOptimizedImage`는 변환을 수행하지 않는 제네릭 로더를 제공하며, 서드 파티 이미지 로더도 제공하고, 사용자 지정 로더를 직접 지정할 수도 있습니다.

| 로더 타입             | 동작                                                                                                                                                                                               |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 제네릭 로더           | 제네릭 로더를 통해 변환되는 URL은 언제나 `src`에 지정된 것과 같습니다. 다르게 표현하면, 이 로더는 URL 변환을 수행하지 않습니다. Angular를 사용해서 이미지를 제공하는 웹사이트에서 주로 사용합니다. |
| 서드 파티 이미지 로더 | 서드 파티 이미지 서비스에서 지정하는 대로 URL을 변환합니다.                                                                                                                                        |
| 커스텀 로더           | 개발자가 원하는 대로 URL을 변환합니다. `NgOptimizedImage`에서 제공하는 기능 외에 다른 기능이 필요한 경우에 사용합니다.                                                                             |

Angular 애플리케이션과 함께 사용되는 이미지 서비스들은 `NgOptimizedImage`가 사전에 로더를 준비해서 제공합니다:

| 이미지 서비스             | Angular API               | 문서                                                               |
| :------------------------ | :------------------------ | :----------------------------------------------------------------- |
| Cloudflare Image Resizing | `provideCloudflareLoader` | [문서](https://developers.cloudflare.com/images/image-resizing/)   |
| Cloudinary                | `provideCloudinaryLoader` | [문서](https://cloudinary.com/documentation/resizing_and_cropping) |
| ImageKit                  | `provideImageKitLoader`   | [문서](https://docs.imagekit.io/)                                  |
| Imgix                     | `provideImgixLoader`      | [문서](https://docs.imgix.com/)                                    |
| Netlify                   | `provideNetlifyLoader`    | [문서](https://docs.netlify.com/image-cdn/overview/)               |

**제네릭 로더** 를 사용한다면 코드를 변경할 필요가 없습니다.
기본 설정은 제네릭 로더입니다.

<!--
### Built-in Loaders
-->

### 기본 로더

<!--
To use an existing loader for a **third-party image service**, add the provider factory for your chosen service to the `providers` array. In the example below, the Imgix loader is used:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

The base URL for your image assets should be passed to the provider factory as an argument. For most sites, this base URL should match one of the following patterns:

- <https://yoursite.yourcdn.com>
- <https://subdomain.yoursite.com>
- <https://subdomain.yourcdn.com/yoursite>

You can learn more about the base URL structure in the docs of a corresponding CDN provider.
-->

**서드 파티 이미지 서비스** 용 로더를 사용하려면 프로바이더 팩토리를 `providers` 배열에 추가하면 됩니다.
예를 들어 Imgix 로더를 사용하는 경우는 이렇습니다:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

이 때 이미지 파일들이 존재하는 기본 URL이 프로바이더 팩토리에 인자로 전달되어야 합니다.
보통은 다음과 같은 패턴입니다:

- <https://yoursite.yourcdn.com>
- <https://subdomain.yoursite.com>
- <https://subdomain.yourcdn.com/yoursite>

정확한 기본 URL 구조는 CDN 프로바이더 안내를 참고하세요.

<!--
### Custom Loaders
-->

### 커스텀 로더

<!--
To use a **custom loader**, provide your loader function as a value for the `IMAGE_LOADER` DI token. In the example below, the custom loader function returns a URL starting with `https://example.com` that includes `src`, `width`, and `height` as URL parameters.

```ts
providers: [
  {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      return `https://example.com/images?src=${config.src}&width=${config.width}&height=${config.height}`;
    },
  },
],
```

A loader function for the `NgOptimizedImage` directive takes an object with the `ImageLoaderConfig` type (from `@angular/common`) as its argument and returns the absolute URL of the image asset. The `ImageLoaderConfig` object contains the `src` property, and optional `width`, `height`, and `loaderParams` properties.

NOTE: even though the `width` property may not always be present, a custom loader must use it to support requesting images at various widths in order for `ngSrcset` to work properly.
-->

**커스텀 로더** 를 사용하려면 `IMAGE_LOADER` DI 토큰에 로더 함수를 등록하면 됩니다.
아래 예제 코드는 URL 인자로 전달되는 `src`, `width`, `height`를 `https://example.com`에 붙이는 커스텀 로더 함수입니다.

```ts
providers: [
  {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      return `https://example.com/images?src=${config.src}&width=${config.width}&height=${config.height}`;
    },
  },
],
```

`NgOptimizedImage` 디렉티브용 로더 함수는 `@angular/common` 패키지로 제공되는 `ImageLoaderConfig` 타입을 인자로 받고 이미지 리소스의 절대 주소를 반환합니다.
그리고 `ImageLoaderConfig` 객체에는 `src` 프로퍼티가 존재하며, `width`, `loaderParams` 프로퍼티는 옵션 인자입니다.

참고: `width` 프로퍼티가 항상 존재하는 것은 아니지만, 커스텀 로더는 `ngSrcset`이 제대로 작동할 수 있도록 다양한 너비용 이미지를 로드하기 위해 해당 기능을 지원해야 합니다.

<!--
### The `loaderParams` Property
-->

### `loaderParams` 프로퍼티

<!--
There is an additional attribute supported by the `NgOptimizedImage` directive, called `loaderParams`, which is specifically designed to support the use of custom loaders. The `loaderParams` attribute takes an object with any properties as a value, and does not do anything on its own. The data in `loaderParams` is added to the `ImageLoaderConfig` object passed to your custom loader, and can be used to control the behavior of the loader.

A common use for `loaderParams` is controlling advanced image CDN features.
-->

`NgOptimizedImage` 디렉티브가 지원하는 `loaderParams` 추가 어트리뷰트가 있는데, 이 어트리뷰트는 커스텀 로더에서 주로 사용됩니다.
`loaderParams` 어트리뷰트는 객체를 인자로 받는데, 객체의 형식은 제한되지 않습니다.
`loaderParams` 안에 있는 데이터는 `ImageLoaderConfig` 객체에 추가되어 커스텀 로더로 전달되어, 커스텀 로더 로직으로 활용됩니다.


### Using the `transform` property with built-in loaders

The built-in loaders for Cloudinary, Cloudflare, ImageKit, and Imgix support a special `transform` property within `loaderParams`. This property allows you to apply custom image transformations provided by your CDN.

The `transform` property accepts two formats:

#### String format

Provide transformations as a comma-separated string using your CDN's transformation syntax:

```html
<img
  ngSrc="my-image.jpg"
  width="400"
  height="300"
  [loaderParams]="{transform: 'e_grayscale,r_10'}"
/>
```

#### Object format

Provide transformations as an object with key-value pairs.

```html
<img
  ngSrc="my-image.jpg"
  width="400"
  height="300"
  [loaderParams]="{transform: {e: 'grayscale', r: 10}}"
/>
```

NOTE: The `transform` property is not supported by the Netlify loader, as Netlify's image CDN does not provide custom transformation parameters.


<!--
### Example custom loader
-->

### 커스텀 로더 예제

<!--
The following shows an example of a custom loader function. This example function concatenates `src`, `width`, and `height`, and uses `loaderParams` to control a custom CDN feature for rounded corners:

```ts
const myCustomLoader = (config: ImageLoaderConfig) => {
  let url = `https://example.com/images/${config.src}?`;
  let queryParams = [];
  if (config.width) {
    queryParams.push(`w=${config.width}`);
  }
  if (config.height) {
    queryParams.push(`h=${config.height}`);
  }
  if (config.loaderParams?.roundedCorners) {
    queryParams.push('mask=corners&corner-radius=5');
  }
  return url + queryParams.join('&');
};
```

Note that in the above example, we've invented the 'roundedCorners' property name to control a feature of our custom loader. We could then use this feature when creating an image, as follows:

```html
<img ngSrc="profile.jpg" width="300" height="300" [loaderParams]="{roundedCorners: true}" />
```
-->

아래 코드는 커스텀 로더 함수입니다.
이 함수는 `src`와 `width`, `height`를 조합하면서 가장자리 곡선 처리를 위해 `loaderParams` 인자를 활용합니다:

```ts
const myCustomLoader = (config: ImageLoaderConfig) => {
  let url = `https://example.com/images/${config.src}?`;
  let queryParams = [];
  if (config.width) {
    queryParams.push(`w=${config.width}`);
  }
  if (config.height) {
    queryParams.push(`h=${config.height}`);
  }
  if (config.loaderParams?.roundedCorners) {
    queryParams.push('mask=corners&corner-radius=5');
  }
  return url + queryParams.join('&');
};
```

위에서 다룬 코드처럼 `roundedCorners` 프로퍼티는 커스텀 로더의 기능을 확장하는 용도로 활용됩니다.
다음과 같이 사용하면 됩니다:

```html
<img ngSrc="profile.jpg" width="300" height="300" [loaderParams]="{roundedCorners: true}" />
```

<!--
## Frequently Asked Questions
-->

## 자주 묻는 질문

<!--
### Does NgOptimizedImage support the `background-image` css property?
-->

### `NgOptimizedImage`는 `background-image` CSS 프로퍼티를 지원하나요?

<!--
The NgOptimizedImage does not directly support the `background-image` css property, but it is designed to easily accommodate the use case of having an image as the background of another element.

For a step-by-step process for migration from `background-image` to `NgOptimizedImage`, see the [How to migrate your background image](#how-to-migrate-your-background-image) section above.
-->

NgOptimizedImage는 `background-image` CSS 프로퍼티를 직접 지원하지 않지만, 다른 엘리먼트의 배경으로 이미지를 지정하는 경우는 쉽게 처리할 수 있습니다.

`background-image`를 `NgOptimizedImage`로 단계별 마이그레이션하려면 [배경 이미지 마이그레이션하기](#배경-이미지-마이그레이션하기) 섹션을 참고하세요.

<!--
### Why can't I use `src` with `NgOptimizedImage`?
-->

### 왜 `NgOptimizedImage`에 `src`를 사용할 수 없나요?

<!--
The `ngSrc` attribute was chosen as the trigger for NgOptimizedImage due to technical considerations around how images are loaded by the browser. NgOptimizedImage makes programmatic changes to the `loading` attribute -- if the browser sees the `src` attribute before those changes are made, it will begin eagerly downloading the image file, and the loading changes will be ignored.
-->

`ngSrc` 어트리뷰트는 브라우저에서 이미지가 효율적으로 로드되는 기능을 제공하기 위해 NgOptimizedImage의 트리거로 선택되었습니다.
NgOptimizedImage는 `loading` 어트리뷰트를 프로그램으로 변경하는데, 브라우저가 이런 변경사항을 반영하기 전에 `src` 속성을 발견하면 이미지 파일을 즉시 다운로드하기 시작하고 `loading` 어트리뷰트 변경은 무시됩니다.

<!--
### Why is a preconnect element not being generated for my image domain?
-->

### 이미지 도메인에 사전 연결 엘리먼트가 연결되지 않는 이유는 무엇일까요?

<!--
Preconnect generation is performed based on static analysis of your application. That means that the image domain must be directly included in the loader parameter, as in the following example:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

If you use a variable to pass the domain string to the loader, or you're not using a loader, the static analysis will not be able to identify the domain, and no preconnect link will be generated. In this case you should manually add a preconnect link to the document head, as [described above](#add-resource-hints).
-->

사전 연결 생성은 애플리케이션의 정적 분석을 기반으로 수행됩니다.
이 말은, 이미지 도메인이 로더의 인자에 다음과 같이 지정되어야 한다는 것을 의미합니다:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

그래서 로더에 도메인 문자열을 전달하거나, 기본 로더를 사용하는 경우에는 정적 분석기가 이미지의 도메인을 판단할 수 없게 되고, 사전 연결 링크는 생성되지 않습니다.
이런 경우는 도큐먼트 헤드에 [리소스 힌트를 직접 추가](#리소스-힌트-추가)하면 됩니다.

<!--
### Can I use two different image domains in the same page?
-->

### 한 화면에서 이미지 도메인을 2개 사용할 수 있나요?

<!--
The [image loaders](#configuring-an-image-loader-for-ngoptimizedimage) provider pattern is designed to be as simple as possible for the common use case of having only a single image CDN used within a component. However, it's still very possible to manage multiple image CDNs using a single provider.

To do this, we recommend writing a [custom image loader](#custom-loaders) which uses the [`loaderParams` property](#the-loaderparams-property) to pass a flag that specifies which image CDN should be used, and then invokes the appropriate loader based on that flag.
-->

[이미지 로더](#ngoptimizedimage용-이미지-로더-설정하기) 프로바이더 패턴은 컴포넌트에서 단일 이미지 CDN을 활용을 최적화하기 위해 도입되었습니다.
하지만 프로바이더가 하나라도 이미지 CDN을 여러개 활용하는 것도 가능합니다.

이런 경우라면, [커스텀 이미지 로더](#커스텀-로더)를 정의하고 [`loaderParams` 프로퍼티](#loaderparams-프로퍼티)를 전달받아 원하는 이미지 CDN을 선택하는 방식으로 구현하면 됩니다.

<!--
### Can you add a new built-in loader for my preferred CDN?
-->

### 제가 자주 사용하는 CDN용 로더를 추가해 줄 수 있나요?

<!--
For maintenance reasons, we don't currently plan to support additional built-in loaders in the Angular repository. Instead, we encourage developers to publish any additional image loaders as third-party packages.
-->

유지관리 이슈 때문에, 현재 지원하는 로더 외에는 추가 도입을 고려하고 있지 않습니다.
서드파티 이미지 로더를 활용해 보세요.

<!--
### Can I use this with the `<picture>` tag
-->

### `<picture>` 태그를 사용할 수 있나요?

<!--
No, but this is on our roadmap, so stay tuned.

If you're waiting on this feature, please upvote the GitHub issue [here](https://github.com/angular/angular/issues/56594).
-->

아니오, 하지만 로드맵에 포함되어 있으니 조금만 기다려 주세요.

이 기능을 기다리고 있다면 [Github 이슈](https://github.com/angular/angular/issues/56594)에 투표해 주세요.

<!--
### How do I find my LCP image with Chrome DevTools?
-->

### Chrome 개발자도구에서 LCP 이미지를 어떻게 찾을 수 있나요?

<!--
1. Using the performance tab of the Chrome DevTools, click on the "start profiling and reload page" button on the top left. It looks like a page refresh icon.

2. This will trigger a profiling snapshot of your Angular application.

3. Once the profiling result is available, select "LCP" in the timings section.

4. A summary entry should appear in the panel at the bottom. You can find the LCP element in the row for "related node". Clicking on it will reveal the element in the Elements panel.

<img alt="LCP in the Chrome DevTools" src="assets/images/guide/image-optimization/devtools-lcp.png">

NOTE: This only identifies the LCP element within the viewport of the page you are testing. It is also recommended to use mobile emulation to identify the LCP element for smaller screens.
-->

1. Chrome 개발자도구에서 Performance 탭으로 이동한 후에 왼쪽 위에 있는 "start profiling and reload page" 버튼을 클릭하세요. 새로고침 아이콘과 비슷하게 생겼습니다.

2. 버튼을 클릭하면 Angular 애플리케이션의 프로파일링 스냅샷을 분석합니다.

3. 프로파일링 결과가 나오면 타이밍 섹션에서 "LCP"를 선택합니다.

4. 아래쪽 패널에서 요약 정보를 확인할 수 있습니다. "related node"라고 표시된 엘리먼트가 LCP 엘리먼트입니다. 이 엘리먼트를 클릭하면 실제 어떤 엘리먼트인지 Elements 패널로 이동하면서 확인할 수 있습니다.

<img alt="Chrome 개발자도구에서 LCP 찾기" src="assets/images/guide/image-optimization/devtools-lcp.png">

참고: 이 방식은 테스트 중인 뷰포트에서 LCP 엘리먼트를 찾는 방법일 뿐입니다. 작은 화면의 장치에서 LCP를 확인하려면 모바일 장비 에뮬레이션 사용을 권장합니다.
