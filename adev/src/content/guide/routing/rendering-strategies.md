<!--
# Rendering strategies in Angular
-->

<a id="rendering-strategies-in-angular"></a>

# Angular 렌더링 전략

<!--
This guide helps you choose the right rendering strategy for different parts of your Angular application.
-->

이 문서에서는 Angular 애플리케이션의 각 부분에 적합한 렌더링 전략을 선택하는 방법을 알아봅니다.

<!--
## What are rendering strategies?
-->

<a id="what-are-rendering-strategies"></a>

## 렌더링 전략이란?

<!--
Rendering strategies determine when and where your Angular application's HTML content is generated. Each strategy offers different trade-offs between initial page load performance, interactivity, SEO capabilities, and server resource usage.

Angular supports three primary rendering strategies:

- **Client-Side Rendering (CSR)** - Content is rendered entirely in the browser
- **Static Site Generation (SSG/Prerendering)** - Content is pre-rendered at build time
- **Server-Side Rendering (SSR)** - Content is rendered on the server for the initial request for a route
-->

렌더링 전략은 Angular 애플리케이션의 HTML 내용을 언제, 어디서 생성할지 결정합니다.
각 전략은 초기 페이지 로딩 성능, 상호작용, SEO 기능, 서버 자원 사용량 측면에서 서로 다른 장단점이 있습니다.

Angular는 세 가지 주요 렌더링 전략을 지원합니다.

- **클라이언트 사이드 렌더링(CSR)** — 모든 내용을 브라우저에서 렌더링합니다.
- **정적 사이트 생성(SSG/프리렌더링)** — 빌드 시점에 내용을 미리 렌더링합니다.
- **서버 사이드 렌더링(SSR)** — 라우팅 규칙의 첫 요청을 처리할 때 서버에서 내용을 렌더링합니다.

<!--
## Client-Side Rendering (CSR)
-->

<a id="client-side-rendering-csr"></a>

## 클라이언트 사이드 렌더링(CSR)

<!--
**CSR is Angular's default.** Content renders entirely in the browser after JavaScript loads.
-->

**CSR은 Angular의 기본 방식입니다.**
JavaScript가 로드된 뒤 모든 내용을 브라우저에서 렌더링합니다.

<!--
### When to use CSR
-->

<a id="when-to-use-csr"></a>

### CSR을 사용하기 좋은 경우

<!--
✅ It can be a good fit for:

- Interactive applications (dashboards, admin panels)
- Real-time applications
- Internal tools where SEO doesn't matter
- Single-page applications with complex client-side state

❌ When possible, consider avoiding it for:

- Public-facing content that needs SEO
- Pages where initial load performance is critical
-->

✅ 다음과 같은 경우에 적합할 수 있습니다.

- 상호작용이 많은 애플리케이션(대시보드, 관리자 화면)
- 실시간 애플리케이션
- SEO가 중요하지 않은 내부 도구
- 클라이언트 상태가 복잡한 싱글 페이지 애플리케이션

❌ 다음과 같은 경우에는 가능하면 다른 방식을 고려하세요.

- SEO가 필요한 공개 콘텐츠
- 초기 로딩 성능이 중요한 페이지

<!--
### CSR trade-offs
-->

<a id="csr-trade-offs"></a>

### CSR의 장단점

<!--
| Aspect            | Impact                                                   |
| :---------------- | :------------------------------------------------------- |
| **SEO**           | Poor - content not visible to crawlers until JS executes |
| **Initial load**  | Slower - must download and execute JavaScript first      |
| **Interactivity** | Immediate once loaded                                    |
| **Server needs**  | Minimal outside of some configuration                    |
| **Complexity**    | Simplest because it works with minimum configuration     |
-->

| 항목              | 영향                                                                     |
| :---------------- | :----------------------------------------------------------------------- |
| **SEO**           | 불리합니다. JavaScript가 실행되기 전에는 크롤러가 내용을 볼 수 없습니다. |
| **초기 로딩**     | 느립니다. JavaScript를 먼저 다운로드하고 실행해야 합니다.                |
| **상호작용**      | 로딩이 끝나면 바로 가능합니다.                                           |
| **서버 요구사항** | 일부 설정을 제외하면 최소한으로 필요합니다.                              |
| **복잡성**        | 최소한의 설정으로 동작하기 때문에 가장 간단합니다.                       |

<!--
## Static Site Generation (SSG/Prerendering)
-->

<a id="static-site-generation-ssgprerendering"></a>

## 정적 사이트 생성(SSG/프리렌더링)

<!--
**SSG pre-renders pages at build time** into static HTML files. The server sends pre-built HTML for the initial page load. After hydration, your app runs entirely in the browser like a traditional SPA - subsequent navigation, route changes, and API calls all happen client-side without server rendering.
-->

**SSG는 빌드 시점에 페이지를 정적 HTML 파일로 미리 렌더링합니다.**
서버는 첫 페이지 요청에 미리 생성한 HTML을 전송합니다.
하이드레이션이 완료되면 기존 SPA처럼 애플리케이션 전체가 브라우저에서 실행됩니다.
이후 내비게이션, 라우팅 규칙 변경, API 호출은 서버 렌더링 없이 모두 클라이언트에서 처리됩니다.

<!--
### When to use SSG
-->

<a id="when-to-use-ssg"></a>

### SSG를 사용하기 좋은 경우

<!--
✅ It can be a good fit for:

- Marketing pages and landing pages
- Blog posts and documentation
- Product catalogs with stable content
- Content that doesn't change per-user

❌ When possible, consider avoiding it for:

- User-specific content
- Frequently changing data
- Real-time information
-->

✅ 다음과 같은 경우에 적합할 수 있습니다.

- 마케팅 페이지와 랜딩 페이지
- 블로그 게시물과 문서
- 내용이 자주 바뀌지 않는 상품 카탈로그
- 사용자별로 달라지지 않는 콘텐츠

❌ 다음과 같은 경우에는 가능하면 다른 방식을 고려하세요.

- 사용자별 콘텐츠
- 자주 바뀌는 데이터
- 실시간 정보

<!--
### SSG trade-offs
-->

<a id="ssg-trade-offs"></a>

### SSG의 장단점

<!--
| Aspect              | Impact                                      |
| :------------------ | :------------------------------------------ |
| **SEO**             | Excellent - full HTML available immediately |
| **Initial load**    | Fastest - pre-generated HTML                |
| **Interactivity**   | After hydration completes                   |
| **Server needs**    | None for serving (CDN-friendly)             |
| **Build time**      | Longer - generates all pages upfront        |
| **Content updates** | Requires rebuild and redeploy               |

📖 **Implementation:** See [Customizing build-time prerendering](guide/ssr#customizing-build-time-prerendering-ssg) in the SSR guide.
-->

| 항목              | 영향                                                   |
| :---------------- | :----------------------------------------------------- |
| **SEO**           | 뛰어납니다. 전체 HTML을 즉시 사용할 수 있습니다.       |
| **초기 로딩**     | 미리 생성한 HTML을 사용하기 때문에 가장 빠릅니다.      |
| **상호작용**      | 하이드레이션이 완료된 뒤 가능합니다.                   |
| **서버 요구사항** | 제공을 위한 별도 서버가 필요하지 않습니다(CDN에 적합). |
| **빌드 시간**     | 모든 페이지를 미리 생성하기 때문에 길어집니다.         |
| **콘텐츠 갱신**   | 다시 빌드하고 배포해야 합니다.                         |

📖 **구현 방법:** SSR 가이드의 [빌드 시점 프리렌더링 조정하기](guide/ssr#customizing-build-time-prerendering-ssg)를 참고하세요.

<!--
## Server-Side Rendering (SSR)
-->

<a id="server-side-rendering-ssr"></a>

## 서버 사이드 렌더링(SSR)

<!--
**SSR generates HTML on the server for the initial request for a route**, providing dynamic content with good SEO. The server renders HTML and sends it to the client.

Once the client renders the page, Angular [hydrates](/guide/hydration#what-is-hydration) the app and it then runs entirely in the browser like a traditional SPA - subsequent navigation, route changes, and API calls all happen client-side without additional server rendering.
-->

**SSR은 라우팅 규칙의 첫 요청을 처리할 때 서버에서 HTML을 생성하므로** 동적 콘텐츠와 좋은 SEO를 함께 제공합니다.
서버가 HTML을 렌더링해서 클라이언트에 전송합니다.

클라이언트가 페이지를 렌더링하면 Angular가 애플리케이션에 [하이드레이션](/guide/hydration#what-is-hydration)을 적용합니다.
이후에는 기존 SPA처럼 애플리케이션 전체가 브라우저에서 실행됩니다.
추가 서버 렌더링 없이 이후 내비게이션, 라우팅 규칙 변경, API 호출을 모두 클라이언트에서 처리합니다.

<!--
### When to use SSR
-->

<a id="when-to-use-ssr"></a>

### SSR을 사용하기 좋은 경우

<!--
✅ It can be a good fit for:

- E-commerce product pages (dynamic pricing/inventory)
- News sites and social media feeds
- Personalized content that changes frequently

❌ When possible, consider avoiding it for:

- Static content (use SSG instead)
- When server costs are a concern
-->

✅ 다음과 같은 경우에 적합할 수 있습니다.

- 전자상거래 상품 페이지(동적 가격과 재고)
- 뉴스 사이트와 소셜 미디어 피드
- 자주 바뀌는 개인화 콘텐츠

❌ 다음과 같은 경우에는 가능하면 다른 방식을 고려하세요.

- 정적 콘텐츠(SSG를 사용하세요)
- 서버 비용이 부담되는 경우

<!--
### SSR trade-offs
-->

<a id="ssr-trade-offs"></a>

### SSR의 장단점

<!--
| Aspect              | Impact                                              |
| :------------------ | :-------------------------------------------------- |
| **SEO**             | Excellent - full HTML for crawlers                  |
| **Initial load**    | Fast - immediate content visibility                 |
| **Interactivity**   | Delayed until hydration                             |
| **Server needs**    | Requires server                                     |
| **Personalization** | Full access to user context                         |
| **Server costs**    | Higher - renders on the initial request for a route |

📖 **Implementation:** See [Server routing](guide/ssr#server-routing) and [Authoring server-compatible components](guide/ssr#authoring-server-compatible-components) in the SSR guide.
-->

| 항목              | 영향                                                        |
| :---------------- | :---------------------------------------------------------- |
| **SEO**           | 뛰어납니다. 크롤러에 전체 HTML을 제공합니다.                |
| **초기 로딩**     | 빠릅니다. 내용을 바로 볼 수 있습니다.                       |
| **상호작용**      | 하이드레이션까지 기다려야 합니다.                           |
| **서버 요구사항** | 서버가 필요합니다.                                          |
| **개인화**        | 사용자 컨텍스트에 완전히 접근할 수 있습니다.                |
| **서버 비용**     | 라우팅 규칙의 첫 요청을 처리할 때 렌더링하므로 더 높습니다. |

📖 **구현 방법:** SSR 가이드의 [서버 라우팅](guide/ssr#server-routing)과 [서버와 호환되는 컴포넌트 작성하기](guide/ssr#authoring-server-compatible-components)를 참고하세요.

<!--
## Choosing the Right Strategy
-->

<a id="choosing-the-right-strategy"></a>

## 적합한 전략 선택하기

<!--
### Decision matrix
-->

<a id="decision-matrix"></a>

### 선택 기준

<!--
| If you need...             | Use this strategy | Why                                              |
| :------------------------- | :---------------- | :----------------------------------------------- |
| **SEO + Static content**   | SSG               | Pre-rendered HTML, fastest load                  |
| **SEO + Dynamic content**  | SSR               | Fresh content on the initial request for a route |
| **No SEO + Interactivity** | CSR               | Simplest, no server needed                       |
| **Mixed requirements**     | Hybrid            | Different strategies per route                   |
-->

| 요구사항                  | 사용할 전략 | 이유                                              |
| :------------------------ | :---------- | :------------------------------------------------ |
| **SEO + 정적 콘텐츠**     | SSG         | 미리 렌더링한 HTML로 가장 빠르게 로드합니다.      |
| **SEO + 동적 콘텐츠**     | SSR         | 라우팅 규칙의 첫 요청에 최신 콘텐츠를 제공합니다. |
| **SEO 불필요 + 상호작용** | CSR         | 가장 간단하며 서버가 필요하지 않습니다.           |
| **여러 요구사항 혼합**    | 하이브리드  | 라우팅 규칙별로 다른 전략을 사용합니다.           |

<!--
## Making SSR/SSG Interactive with Hydration
-->

<a id="making-ssrssg-interactive-with-hydration"></a>

## 하이드레이션으로 SSR/SSG에 상호작용 추가하기

<!--
When using SSR or SSG, Angular "hydrates" the server-rendered HTML to make it interactive.

**Available strategies:**

- **Full hydration** - Entire app becomes interactive at once (default)
- **Incremental hydration** - Parts become interactive as needed (better performance)
- **Event replay** - Captures clicks before hydration completes

📖 **Learn more:**

- [Hydration guide](guide/hydration) - Complete hydration setup
- [Incremental hydration](guide/incremental-hydration) - Advanced hydration with `@defer` blocks
-->

SSR이나 SSG를 사용할 때 Angular는 서버가 렌더링한 HTML에 "하이드레이션"을 적용해서 상호작용할 수 있도록 만듭니다.

**사용할 수 있는 전략:**

- **전체 하이드레이션** — 애플리케이션 전체가 한 번에 상호작용 가능한 상태가 됩니다(기본값).
- **점진적 하이드레이션** — 필요한 부분부터 상호작용 가능한 상태가 됩니다(성능 개선).
- **이벤트 재생** — 하이드레이션이 완료되기 전에 발생한 클릭을 수집합니다.

📖 **더 알아보기:**

- [하이드레이션 가이드](guide/hydration) — 전체 하이드레이션 설정
- [점진적 하이드레이션](guide/incremental-hydration) — `@defer` 블록을 사용하는 고급 하이드레이션

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="/guide/ssr" title="Server-Side Rendering"/>
  <docs-pill href="/guide/hydration" title="Hydration"/>
  <docs-pill href="/guide/incremental-hydration" title="Incremental Hydration"/>
</docs-pill-row>
-->

<docs-pill-row>
  <docs-pill href="/guide/ssr" title="서버 사이드 렌더링"/>
  <docs-pill href="/guide/hydration" title="하이드레이션"/>
  <docs-pill href="/guide/incremental-hydration" title="점진적 하이드레이션"/>
</docs-pill-row>
