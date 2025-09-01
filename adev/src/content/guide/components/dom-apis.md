<!--
# Using DOM APIs
-->
# DOM API 활용하기

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Angular handles most DOM creation, updates, and removals for you. However, you might rarely need to
directly interact with a component's DOM. Components can inject ElementRef to get a reference to the
component's host element:

```ts
@Component({...})
export class ProfilePhoto {
  constructor() {
    const elementRef = inject(ElementRef);
    console.log(elementRef.nativeElement);
  }
}
```

The `nativeElement` property references the
host [Element](https://developer.mozilla.org/docs/Web/API/Element) instance.

You can use Angular's `afterEveryRender` and `afterNextRender` functions to register a **render
callback** that runs when Angular has finished rendering the page.

```ts
@Component({...})
export class ProfilePhoto {
  constructor() {
    const elementRef = inject(ElementRef);
    afterEveryRender(() => {
      // Focus the first input element in this component.
      elementRef.nativeElement.querySelector('input')?.focus();
    });
  }
}
```

`afterEveryRender` and `afterNextRender` must be called in an _injection context_, typically a
component's constructor.

**Avoid direct DOM manipulation whenever possible.** Always prefer expressing your DOM's structure
in component templates and updating that DOM with bindings.

**Render callbacks never run during server-side rendering or build-time pre-rendering.**

**Never directly manipulate the DOM inside of other Angular lifecycle hooks**. Angular does not
guarantee that a component's DOM is fully rendered at any point other than in render callbacks.
Further, reading or modifying the DOM during other lifecycle hooks can negatively impact page
performance by
causing [layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing).
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

Angular는 DOM 생성, 갱신, 제거를 자동으로 처리합니다.
하지만 때로는 컴포넌트 DOM을 직접 조작해야 하는 경우가 있습니다.
그렇다면 `ElementRef` 를 의존성으로 주입해서 컴포넌트 호스트 엘리먼트를 참조할 수 있습니다:

```ts
@Component({...})
export class ProfilePhoto {
  constructor() {
    const elementRef = inject(ElementRef);
    console.log(elementRef.nativeElement);
  }
}
```


호스트 [엘리먼트](https://developer.mozilla.org/docs/Web/API/Element) 인스턴스는 `nativeElement` 프로퍼티로 참조합니다.

Angular가 컴포넌트를 렌더링한 뒤에 **콜백 함수** 를 실행하려면 `afterEveryRender`나 `afterNextRender`를 활용하면 됩니다.

```ts
@Component({...})
export class ProfilePhoto {
  constructor() {
    const elementRef = inject(ElementRef);
    afterEveryRender(() => {
      // 첫번째 `input` 엘리먼트로 포커스를 이동합니다.
      elementRef.nativeElement.querySelector('input')?.focus();
    });
  }
}
```

`afterEveryRender`나 `afterNextRender` 함수는 _의존성 주입 컨텍스트_ 안에서 실행되어야 하기 때문에, 일반적으로 컴포넌트 생성자에서 지정합니다.

**가능하면 DOM을 직접 조작하는 것은 피하세요.**
직접 조작하지 말고 컴포넌트 템플릿에서 DOM 구조를 다루거나 바인딩하는 방식을 사용하세요.

**렌더링 콜백 함수는 서버 사이드 렌더링이나 빌드 시점 사전 렌더링에서 사용하지 마세요.**

**Angular 라이프싸이클 후킹 함수에서 DOM을 조작하지 마세요.**
Angular는 컴포넌트의 DOM이 완전히 준비된 후에 렌더링 콜백 함수를 실행하지만, 다른 시점에는 DOM이 준비되었는지 보장하지 않습니다.
라이프싸이클 후킹 함수에서 DOM을 참조하거나 수정하면 [레이아웃 스래싱(layout thrashing)](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing)이 발생해서 페이지 렌더링 성능에 부정적인 영향을 줄 수 있습니다.


<!--
## Using a component's renderer
-->
## 컴포넌트 렌더러 활용하기

<!--
Components can inject an instance of `Renderer2` to perform certain DOM manipulations that are tied
to other Angular features.

Any DOM elements created by a component's `Renderer2` participate in that
component's [style encapsulation](guide/components/styling#style-scoping).

Certain `Renderer2` APIs also tie into Angular's animation system. You can use the `setProperty`
method to update synthetic animation properties and the `listen` method to add event listeners for
synthetic animation events. See the [Animations](guide/animations) guide for details.

Aside from these two narrow use-cases, there is no difference between using `Renderer2` and native
DOM APIs. `Renderer2` APIs do not support DOM manipulation in server-side rendering or build-time
pre-rendering contexts.
-->
컴포넌트는 `Renderer2` 인스턴스를 의존성 객체로 주입받아서 Angular 기능과 관련된 특정 DOM 조작 기능을 실행할 수 있습니다.

컴포넌트에서 `Renderer2`를 사용하면서 생성되는 모든 DOM 엘리먼트는 컴포넌트의 [스타일 캡슐화](guide/components/styling#style-scoping)를 적용받습니다.

`Render2` API 중에는 Angular 애니메이션 시스템과 연관된 API도 있습니다.
합성 애니베이션 프로퍼티를 수정하려면 `setProperty` 메서드를 실행하면 되고, 합성 애니메이션에 이벤트 리스너를 추가하려면 `listen` 메서드를 실행하면 됩니다.
자세한 내용은 [애니메이션](guide/animations) 문서를 참고하세요.

이 두가지 사용방법을 제외하면, `Renderer2` 를 사용하는 방식과 네이티브 DOM API를 활용하는 방식은 차이가 없습니다.
`Renderer2` API는 서버 사이드 렌더링이나 빌드 시점의 프리 렌더링에서는 DOM 조작을 지원하지 않습니다.


<!--
## When to use DOM APIs
-->
## DOM API는 언제 사용하면 될까요

<!--
While Angular handles most rendering concerns, some behaviors may still require using DOM APIs. Some
common use cases include:

- Managing element focus
- Measuring element geometry, such as with `getBoundingClientRect`
- Reading an element's text content
- Setting up native observers such
  as [`MutationObserver`](https://developer.mozilla.org/docs/Web/API/MutationObserver),
  [`ResizeObserver`](https://developer.mozilla.org/docs/Web/API/ResizeObserver), or
  [`IntersectionObserver`](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API).

Avoid inserting, removing, and modifying DOM elements. In particular, **never directly set an
element's `innerHTML` property**, which can make your application vulnerable
to [cross-site scripting (XSS) exploits](https://developer.mozilla.org/docs/Glossary/Cross-site_scripting).
Angular's template bindings, including bindings for `innerHTML`, include safeguards that help
protect against XSS attacks. See the [Security guide](best-practices/security) for details.
-->
Angular는 렌더링 대부분을 자동으로 처리하지만, DOM API 활용이 필요한 경우가 있습니다.
이런 경우가 그렇습니다:

- 엘리먼트 포커스를 다룰 때
- `getBoundingClientRect` 와 같이 엘리먼트의 위치 정보를 참조할 때
- 엘리먼트의 텍스트를 읽을 때
-  [`MutationObserver`](https://developer.mozilla.org/docs/Web/API/MutationObserver),
  [`ResizeObserver`](https://developer.mozilla.org/docs/Web/API/ResizeObserver),
  [`IntersectionObserver`](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)와 같은 네이티브 옵저버를 설정할 때

DOM 엘리먼트를 추가하거나 제거하고 갱신하는 것은 피하세요.
특시, **엘리먼트의 `innerHTML` 프로퍼티를 직접 설정하지 마세요.**
엘리먼트의 `innerHTML` 프로퍼티를 직접 설정하면 애플리케이션이 [크로스 사이트 스크립팅(cross-site scripting, XSS) 공격](https://developer.mozilla.org/docs/Glossary/Cross-site_scripting)에 노출될 수 있습니다.
Angular `innerHTML` 바인딩을 안전하게 처리하기 위해 XSS 공격을 방지하는 기능을 제공합니다.
자세한 내용은 [보안 가이드 문서](best-practices/security)를 참고하세요.
