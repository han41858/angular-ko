<!--
# Incremental Hydration
-->

<a id="incremental-hydration"></a>

# 점진적 하이드레이션

<!--
**Incremental hydration** is an advanced type of [hydration](guide/hydration) that can leave sections of your application dehydrated and _incrementally_ trigger hydration of those sections as they are needed.
-->

**점진적 하이드레이션**은 애플리케이션의 일부 영역을 하이드레이션되지 않은 상태로 두었다가, 필요할 때 _점진적으로_ 하이드레이션하는 고급 [하이드레이션](guide/hydration) 방식입니다.

<!--
## Why use incremental hydration?
-->

<a id="why-use-incremental-hydration"></a>

## 점진적 하이드레이션은 왜 사용하나요?

<!--
Incremental hydration is a performance improvement that builds on top of full application hydration. It can produce smaller initial bundles while still providing an end-user experience that is comparable to a full application hydration experience. Smaller bundles improve initial load times, reducing [First Input Delay (FID)](https://web.dev/fid) and [Cumulative Layout Shift (CLS)](https://web.dev/cls).

Incremental hydration also lets you use deferrable views (`@defer`) for content that may not have been deferrable before. Specifically, you can now use deferrable views for content that is above the fold. Prior to incremental hydration, putting a `@defer` block above the fold would result in placeholder content rendering and then being replaced by the `@defer` block's main template content. This would result in a layout shift. Incremental hydration means the main template of the `@defer` block will render with no layout shift on hydration.
-->

점진적 하이드레이션은 애플리케이션 전체 하이드레이션을 기반으로 성능을 개선하는 기능입니다.
애플리케이션 전체를 하이드레이션할 때와 비슷한 사용자 경험을 제공하면서 초기 번들 크기를 줄일 수 있습니다.
번들이 작아지면 초기 로드 시간이 개선되어 [최초 입력 지연(FID)](https://web.dev/fid)과 [누적 레이아웃 이동(CLS)](https://web.dev/cls)이 줄어듭니다.

점진적 하이드레이션을 사용하면 이전에는 지연하기 어려웠던 콘텐츠에도 지연 가능한 뷰(`@defer`)를 사용할 수 있습니다.
특히 스크롤하지 않아도 보이는 첫 화면의 콘텐츠에도 사용할 수 있습니다.
점진적 하이드레이션이 없을 때는 첫 화면에 `@defer` 블록을 두면 플레이스홀더가 먼저 렌더링된 뒤 `@defer` 블록의 메인 템플릿 콘텐츠로 바뀌면서 레이아웃 이동이 발생했습니다.
점진적 하이드레이션을 사용하면 `@defer` 블록의 메인 템플릿을 렌더링하고 하이드레이션할 때 레이아웃이 이동하지 않습니다.

<!--
## How do you enable incremental hydration in Angular?
-->

<a id="how-do-you-enable-incremental-hydration-in-angular"></a>

## Angular에서 점진적 하이드레이션 활성화하기

<!--
You can enable incremental hydration for applications that already use server-side rendering (SSR) with hydration. Follow the [Angular SSR Guide](guide/ssr) to enable server-side rendering and the [Angular Hydration Guide](guide/hydration) to enable hydration first.

Incremental hydration is enabled by default when you use `provideClientHydration()`.

```ts
import {bootstrapApplication, provideClientHydration} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration()],
});
```

NOTE: Incremental Hydration depends on and enables [event replay](guide/hydration#capturing-and-replaying-events) automatically. If you already have `withEventReplay()` in your list, you can safely remove it.

To opt out of incremental hydration, use `withNoIncrementalHydration()`:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withNoIncrementalHydration,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration(withNoIncrementalHydration())],
});
```
-->

하이드레이션을 사용하는 서버 사이드 렌더링(SSR) 애플리케이션에서 점진적 하이드레이션을 활성화할 수 있습니다.
먼저 [Angular SSR 가이드](guide/ssr)에 따라 서버 사이드 렌더링을 활성화하고, [Angular 하이드레이션 가이드](guide/hydration)에 따라 하이드레이션을 활성화하세요.

`provideClientHydration()`을 사용하면 점진적 하이드레이션은 기본적으로 활성화됩니다.

```ts
import {bootstrapApplication, provideClientHydration} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration()],
});
```

참고: 점진적 하이드레이션은 [이벤트 재실행](guide/hydration#capturing-and-replaying-events)에 의존하며 이 기능을 자동으로 활성화합니다.
목록에 `withEventReplay()`가 이미 있다면 제거해도 됩니다.

점진적 하이드레이션을 비활성화하려면 `withNoIncrementalHydration()`을 사용하세요:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withNoIncrementalHydration,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration(withNoIncrementalHydration())],
});
```

<!--
## How does incremental hydration work?
-->

<a id="how-does-incremental-hydration-work"></a>

## 점진적 하이드레이션은 어떻게 동작하나요?

<!--
Incremental hydration builds on top of full-application [hydration](guide/hydration), [deferrable views](/guide/templates/defer), and [event replay](guide/hydration#capturing-and-replaying-events). With incremental hydration, you can add additional triggers to `@defer` blocks that define incremental hydration boundaries. Adding a `hydrate` trigger to a defer block tells Angular that it should load that defer block's dependencies during server-side rendering and render the main template rather than the `@placeholder`. When client-side rendering, the dependencies are still deferred, and the defer block content stays dehydrated until its `hydrate` trigger fires. That trigger tells the defer block to fetch its dependencies and hydrate the content. Any browser events, specifically those that match listeners registered in your component, that are triggered by the user prior to hydration are queued up and replayed once the hydration process is complete.
-->

점진적 하이드레이션은 애플리케이션 전체 [하이드레이션](guide/hydration), [지연 가능한 뷰](/guide/templates/defer), [이벤트 재실행](guide/hydration#capturing-and-replaying-events)을 기반으로 동작합니다.
점진적 하이드레이션을 사용하면 `@defer` 블록에 추가 트리거를 지정해서 점진적 하이드레이션의 경계를 정의할 수 있습니다.
지연 블록에 `hydrate` 트리거를 추가하면 Angular는 서버 사이드 렌더링 중 해당 블록의 의존성을 로드하고 `@placeholder` 대신 메인 템플릿을 렌더링합니다.
클라이언트 사이드 렌더링에서는 의존성 로드를 계속 미루며, 블록의 콘텐츠는 `hydrate` 트리거가 실행될 때까지 하이드레이션되지 않은 상태로 남습니다.
트리거가 실행되면 지연 블록은 의존성을 가져오고 콘텐츠를 하이드레이션합니다.
하이드레이션 전에 사용자가 발생시킨 브라우저 이벤트 중 컴포넌트에 등록된 리스너와 일치하는 이벤트는 대기열에 저장되었다가 하이드레이션이 완료되면 재실행됩니다.

<!--
## Controlling hydration of content with triggers
-->

<a id="controlling-hydration-of-content-with-triggers"></a>

## 트리거로 콘텐츠 하이드레이션 제어하기

<!--
You can specify **hydrate triggers** that control when Angular loads and hydrates deferred content. These are additional triggers that can be used alongside regular `@defer` triggers.

Each `@defer` block may have multiple hydrate event triggers, separated with a semicolon (`;`). Angular triggers hydration when _any_ of the triggers fire.

There are three types of hydrate triggers: `hydrate on`, `hydrate when`, and `hydrate never`.
-->

**하이드레이션 트리거**를 지정하면 Angular가 지연된 콘텐츠를 로드하고 하이드레이션하는 시점을 제어할 수 있습니다.
일반 `@defer` 트리거와 함께 사용할 수 있는 추가 트리거입니다.

각 `@defer` 블록에는 세미콜론(`;`)으로 구분해서 하이드레이션 이벤트 트리거를 여러 개 지정할 수 있습니다.
이 중 _하나라도_ 실행되면 Angular가 하이드레이션을 시작합니다.

하이드레이션 트리거에는 `hydrate on`, `hydrate when`, `hydrate never` 세 가지 종류가 있습니다.

<!--
### `hydrate on`
-->

<a id="hydrate-on"></a>

### `hydrate on`

<!--
`hydrate on` specifies a condition for when hydration is triggered for the `@defer` block.

The available triggers are as follows:

| Trigger                                             | Description                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| [`hydrate on idle`](#hydrate-on-idle)               | Triggers when the browser is idle. Supports an optional timeout.       |
| [`hydrate on viewport`](#hydrate-on-viewport)       | Triggers when specified content enters the viewport                    |
| [`hydrate on interaction`](#hydrate-on-interaction) | Triggers when the user interacts with specified element                |
| [`hydrate on hover`](#hydrate-on-hover)             | Triggers when the mouse hovers over specified area                     |
| [`hydrate on immediate`](#hydrate-on-immediate)     | Triggers immediately after non-deferred content has finished rendering |
| [`hydrate on timer`](#hydrate-on-timer)             | Triggers after a specific duration                                     |
-->

`hydrate on`은 `@defer` 블록의 하이드레이션이 실행될 조건을 지정합니다.

사용할 수 있는 트리거는 다음과 같습니다:

| 트리거                                              | 설명                                                                              |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`hydrate on idle`](#hydrate-on-idle)               | 브라우저가 유휴 상태가 되면 실행합니다. 선택적으로 타임아웃을 지정할 수 있습니다. |
| [`hydrate on viewport`](#hydrate-on-viewport)       | 지정한 콘텐츠가 뷰포트에 들어오면 실행합니다.                                     |
| [`hydrate on interaction`](#hydrate-on-interaction) | 사용자가 지정한 엘리먼트와 상호작용하면 실행합니다.                               |
| [`hydrate on hover`](#hydrate-on-hover)             | 마우스가 지정한 영역 위에 올라오면 실행합니다.                                    |
| [`hydrate on immediate`](#hydrate-on-immediate)     | 지연하지 않은 콘텐츠의 렌더링이 끝나면 즉시 실행합니다.                           |
| [`hydrate on timer`](#hydrate-on-timer)             | 지정한 시간이 지나면 실행합니다.                                                  |

<!--
#### `hydrate on idle`
-->

<a id="hydrate-on-idle"></a>

#### `hydrate on idle`

<!--
The `hydrate on idle` trigger loads the deferrable view's dependencies and hydrates the content once the browser has reached an idle state, based on `requestIdleCallback`.

You can optionally specify a timeout in milliseconds that is passed to [`requestIdleCallback`](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback). If the browser doesn't schedule the callback soon enough, the work will run no later than the specified timeout.

```angular-html
@defer (hydrate on idle) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}

<!- With a 500ms timeout ->
@defer (hydrate on idle(500)) {
  <large-cmp />
}
```
-->

`hydrate on idle` 트리거는 `requestIdleCallback`을 기준으로 브라우저가 유휴 상태에 도달하면 지연 가능한 뷰의 의존성을 로드하고 콘텐츠를 하이드레이션합니다.

[`requestIdleCallback`](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback)에 전달할 타임아웃을 밀리초 단위로 지정할 수도 있습니다.
브라우저가 콜백을 충분히 빨리 실행하도록 예약하지 않더라도, 작업은 지정한 타임아웃 안에 실행됩니다.

```angular-html
@defer (hydrate on idle) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}

<!-- 500밀리초 타임아웃 지정 -->
@defer (hydrate on idle(500)) {
  <large-cmp />
}
```

<!--
#### `hydrate on viewport`
-->

<a id="hydrate-on-viewport"></a>

#### `hydrate on viewport`

<!--
The `hydrate on viewport` trigger loads the deferrable view's dependencies and hydrates the corresponding page of the app when the specified content enters the viewport using the
[Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API).

```angular-html
@defer (hydrate on viewport) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->

`hydrate on viewport` 트리거는 [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)로 지정한 콘텐츠가 뷰포트에 들어오는지 감지한 뒤, 지연 가능한 뷰의 의존성을 로드하고 애플리케이션의 해당 페이지를 하이드레이션합니다.

```angular-html
@defer (hydrate on viewport) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

<!--
#### `hydrate on interaction`
-->

<a id="hydrate-on-interaction"></a>

#### `hydrate on interaction`

<!--
The `hydrate on interaction` trigger loads the deferrable view's dependencies and hydrates the content when the user interacts with the specified element through
`click` or `keydown` events.

```angular-html
@defer (hydrate on interaction) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->

`hydrate on interaction` 트리거는 사용자가 지정한 엘리먼트에서 `click`이나 `keydown` 이벤트로 상호작용할 때 지연 가능한 뷰의 의존성을 로드하고 콘텐츠를 하이드레이션합니다.

```angular-html
@defer (hydrate on interaction) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

<!--
#### `hydrate on hover`
-->

<a id="hydrate-on-hover"></a>

#### `hydrate on hover`

<!--
The `hydrate on hover` trigger loads the deferrable view's dependencies and hydrates the content when the mouse has hovered over the triggered area through the
`mouseover` and `focusin` events.

```angular-html
@defer (hydrate on hover) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->

`hydrate on hover` 트리거는 `mouseover`와 `focusin` 이벤트를 통해 지정한 영역에 마우스가 올라온 것을 감지하면 지연 가능한 뷰의 의존성을 로드하고 콘텐츠를 하이드레이션합니다.

```angular-html
@defer (hydrate on hover) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

<!--
#### `hydrate on immediate`
-->

<a id="hydrate-on-immediate"></a>

#### `hydrate on immediate`

<!--
The `hydrate on immediate` trigger loads the deferrable view's dependencies and hydrates the content immediately. This means that the deferred block loads as soon
as all other non-deferred content has finished rendering.

```angular-html
@defer (hydrate on immediate) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->

`hydrate on immediate` 트리거는 지연 가능한 뷰의 의존성을 즉시 로드하고 콘텐츠를 하이드레이션합니다.
즉, 지연하지 않은 다른 모든 콘텐츠의 렌더링이 끝나는 즉시 지연 블록을 로드합니다.

```angular-html
@defer (hydrate on immediate) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

<!--
#### `hydrate on timer`
-->

<a id="hydrate-on-timer"></a>

#### `hydrate on timer`

<!--
The `hydrate on timer` trigger loads the deferrable view's dependencies and hydrates the content after a specified duration.

```angular-html
@defer (hydrate on timer(500ms)) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

The duration parameter must be specified in milliseconds (`ms`) or seconds (`s`).
-->

`hydrate on timer` 트리거는 지정한 시간이 지나면 지연 가능한 뷰의 의존성을 로드하고 콘텐츠를 하이드레이션합니다.

```angular-html
@defer (hydrate on timer(500ms)) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

시간 파라미터는 밀리초(`ms`) 또는 초(`s`) 단위로 지정해야 합니다.

<!--
### `hydrate when`
-->

<a id="hydrate-when"></a>

### `hydrate when`

<!--
The `hydrate when` trigger accepts a custom conditional expression and loads the deferrable view's dependencies and hydrates the content when the
condition becomes truthy.

```angular-html
@defer (hydrate when condition) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

NOTE: `hydrate when` conditions only trigger when they are the top-most dehydrated `@defer` block. The condition provided for the trigger is
specified in the parent component, which needs to exist before it can be triggered. If the parent block is dehydrated, that expression will not yet
be resolvable by Angular.
-->

`hydrate when` 트리거는 커스텀 조건 표현식을 받아, 조건이 참으로 평가되는 값(truthy)이 되면 지연 가능한 뷰의 의존성을 로드하고 콘텐츠를 하이드레이션합니다.

```angular-html
@defer (hydrate when condition) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

참고: `hydrate when` 조건은 해당 블록이 하이드레이션되지 않은 최상위 `@defer` 블록일 때만 실행됩니다.
트리거의 조건은 부모 컴포넌트에 지정되므로, 실행하려면 부모 컴포넌트가 먼저 존재해야 합니다.
부모 블록이 하이드레이션되지 않았다면 Angular는 아직 해당 표현식을 평가할 수 없습니다.

<!--
### `hydrate never`
-->

<a id="hydrate-never"></a>

### `hydrate never`

<!--
The `hydrate never` allows users to specify that the content in the defer block should remain dehydrated indefinitely, effectively becoming static
content. Note that this applies to the initial render only. During a subsequent client-side render, a `@defer` block with `hydrate never` would
still fetch dependencies, as hydration only applies to initial load of server-side rendered content. In the example below, subsequent client-side
renders would load the `@defer` block dependencies on viewport.

```angular-html
@defer (on viewport; hydrate never) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

NOTE: Using `hydrate never` prevents hydration of the entire nested subtree of a given `@defer` block. No other `hydrate` triggers fire for content nested underneath that block.
-->

`hydrate never`를 사용하면 지연 블록의 콘텐츠를 계속 하이드레이션되지 않은 상태로 두어 사실상 정적 콘텐츠로 만들 수 있습니다.
다만 초기 렌더링에만 적용됩니다.
하이드레이션은 서버에서 렌더링한 콘텐츠를 처음 로드할 때만 적용되므로, 이후 클라이언트 사이드 렌더링에서는 `hydrate never`가 지정된 `@defer` 블록도 의존성을 가져옵니다.
아래 예제에서 이후 클라이언트 사이드 렌더링은 블록이 뷰포트에 들어올 때 `@defer` 블록의 의존성을 로드합니다.

```angular-html
@defer (on viewport; hydrate never) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

참고: `hydrate never`를 사용하면 해당 `@defer` 블록에 중첩된 하위 트리 전체가 하이드레이션되지 않습니다.
이 블록 아래에 중첩된 콘텐츠의 다른 `hydrate` 트리거도 실행되지 않습니다.

<!--
## Hydrate triggers alongside regular triggers
-->

<a id="hydrate-triggers-alongside-regular-triggers"></a>

## 일반 트리거와 하이드레이션 트리거 함께 사용하기

<!--
Hydrate triggers are additional triggers that are used alongside regular triggers on a `@defer` block. Hydration is an initial load optimization, and that means hydrate triggers only apply to that initial load. Any subsequent client side render will still use the regular trigger.

```angular-html
@defer (on idle; hydrate on interaction) {
  <example-cmp />
} @placeholder {
  <div>Example Placeholder</div>
}
```

In this example, on the initial load, the `hydrate on interaction` applies. Hydration will be triggered on interaction with the `<example-cmp />` component. On any subsequent page load that is client-side rendered, for example when a user clicks a routerLink that loads a page with this component, the `on idle` will apply.
-->

하이드레이션 트리거는 `@defer` 블록의 일반 트리거와 함께 사용하는 추가 트리거입니다.
하이드레이션은 초기 로드를 최적화하는 기능이므로 하이드레이션 트리거도 초기 로드에만 적용됩니다.
이후의 클라이언트 사이드 렌더링은 일반 트리거를 사용합니다.

```angular-html
@defer (on idle; hydrate on interaction) {
  <example-cmp />
} @placeholder {
  <div>Example Placeholder</div>
}
```

이 예제에서는 처음 로드할 때 `hydrate on interaction`이 적용됩니다.
`<example-cmp />` 컴포넌트와 상호작용하면 하이드레이션이 실행됩니다.
이후 사용자가 이 컴포넌트가 있는 페이지로 이동하는 routerLink를 클릭하는 등 클라이언트에서 렌더링하는 페이지 로드에는 `on idle`이 적용됩니다.

<!--
## How does incremental hydration work with nested `@defer` blocks?
-->

<a id="how-does-incremental-hydration-work-with-nested-defer-blocks"></a>

## 중첩된 `@defer` 블록에서 점진적 하이드레이션은 어떻게 동작하나요?

<!--
Angular's component and dependency system is hierarchical, which means hydrating any component requires all of its parents also be hydrated. So if hydration is triggered for a child `@defer` block of a nested set of dehydrated `@defer` blocks, hydration is triggered from the top-most dehydrated `@defer` block down to the triggered child and fire in that order.

```angular-html
@defer (hydrate on interaction) {
  <parent-block-cmp />
  @defer (hydrate on hover) {
    <child-block-cmp />
  } @placeholder {
    <div>Child placeholder</div>
  }
} @placeholder {
  <div>Parent Placeholder</div>
}
```

In the above example, hovering over the nested `@defer` block triggers hydration. The parent `@defer` block with the `<parent-block-cmp />` hydrates first, then the child `@defer` block with `<child-block-cmp />` hydrates after.
-->

Angular의 컴포넌트와 의존성 시스템은 계층 구조이므로, 어떤 컴포넌트를 하이드레이션하려면 모든 부모도 하이드레이션되어야 합니다.
따라서 하이드레이션되지 않은 `@defer` 블록이 중첩된 상태에서 자식 `@defer` 블록의 하이드레이션이 실행되면, 하이드레이션되지 않은 최상위 `@defer` 블록부터 해당 자식까지 순서대로 하이드레이션됩니다.

```angular-html
@defer (hydrate on interaction) {
  <parent-block-cmp />
  @defer (hydrate on hover) {
    <child-block-cmp />
  } @placeholder {
    <div>Child placeholder</div>
  }
} @placeholder {
  <div>Parent Placeholder</div>
}
```

위 예제에서는 중첩된 `@defer` 블록 위에 마우스를 올리면 하이드레이션이 실행됩니다.
`<parent-block-cmp />`가 있는 부모 `@defer` 블록이 먼저 하이드레이션되고, 그다음 `<child-block-cmp />`가 있는 자식 `@defer` 블록이 하이드레이션됩니다.

<!--
## Constraints
-->

<a id="constraints"></a>

## 제약 사항

<!--
Incremental hydration has the same constraints as full-application hydration, including limits on direct DOM manipulation and requiring valid HTML structure. Visit the [Hydration guide constraints](guide/hydration#constraints) section for more details.
-->

점진적 하이드레이션에는 DOM 직접 조작 제한과 유효한 HTML 구조 요구 사항 등 애플리케이션 전체 하이드레이션과 같은 제약이 있습니다.
자세한 내용은 [하이드레이션 가이드의 제약 사항](guide/hydration#constraints)을 참고하세요.

<!--
## Do I still need to specify `@placeholder` blocks?
-->

<a id="do-i-still-need-to-specify-placeholder-blocks"></a>

## `@placeholder` 블록도 여전히 필요한가요?

<!--
Yes. `@placeholder` block content is not used for incremental hydration, but a `@placeholder` is still necessary for subsequent client-side rendering cases. If your content was not on the route that was part of the initial load, then any navigation to the route that has your `@defer` block content renders like a regular `@defer` block. So the `@placeholder` is rendered in those client-side rendering cases.
-->

네.
`@placeholder` 블록의 콘텐츠는 점진적 하이드레이션에 사용되지 않지만, 이후의 클라이언트 사이드 렌더링에는 `@placeholder`가 여전히 필요합니다.
콘텐츠가 초기 로드에 포함된 라우트에 없었다면, 나중에 해당 `@defer` 블록 콘텐츠가 있는 라우트로 이동할 때는 일반 `@defer` 블록처럼 렌더링됩니다.
따라서 이런 클라이언트 사이드 렌더링에서는 `@placeholder`가 렌더링됩니다.
