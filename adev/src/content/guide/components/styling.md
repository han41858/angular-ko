<!--
# Styling components
-->

# 컴포넌트 스타일

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Components can optionally include CSS styles that apply to that component's DOM:

```angular-ts {highlight:[4]}
@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: `
    img {
      border-radius: 50%;
    }
  `,
})
export class ProfilePhoto {}
```

You can also choose to write your styles in separate files:

```angular-ts {highlight:[4]}
@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css',
})
export class ProfilePhoto {}
```

When Angular compiles your component, these styles are emitted with your component's JavaScript
output. This means that component styles participate in the JavaScript module system. When you
render an Angular component, the framework automatically includes its associated styles, even when
lazy-loading a component.

Angular works with any tool that outputs CSS,
including [Sass](https://sass-lang.com), [Less](https://lesscss.org),
and [Stylus](https://stylus-lang.com).
-->

팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트는 CSS 스타일을 지정할 수 있습니다:

```angular-ts {highlight:[4]}
@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: `
    img {
      border-radius: 50%;
    }
  `,
})
export class ProfilePhoto {}
```

그리고 스타일 파일이 별도 파일로 존재한다면 이렇게 지정합니다:

```angular-ts {highlight:[4]}
@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css',
})
export class ProfilePhoto {}
```

Angular가 컴포넌트를 컴파일하면 컴포넌트에 지정된 스타일은 컴포넌트 JavaScript 결과물에 포함됩니다.
이 말은, 컴포넌트 스타일이 JavaScript 모듈 시스템 안에 포함된다는 것을 의미합니다.
이후에 Angular가 컴포넌트를 렌더링하면, 지연 로딩되는 컴포넌트라고 해도 컴포넌트가 로딩될 때 스타일도 함께 로딩됩니다.

CSS 스타일을 지정할 때는 [Sass](https://sass-lang.com)나 [less](https://lesscss.org), [stylus](https://stylus-lang.com) 문법을 사용할 수도 있습니다.

<!--
## Style scoping
-->

<a id="style-scoping"></a>

## 스타일 지정 범위

<!--
Every component has a **view encapsulation** setting that determines how the framework scopes a
component's styles. There are four view encapsulation modes: `Emulated`, `ShadowDom`, `ExperimentalIsolatedShadowDom`, and `None`.
You can specify the mode in the `@Component` decorator:

```angular-ts {highlight:[3]}
@Component({
  ...,
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePhoto { }
```
-->

컴포넌트에는 컴포넌트 스타일의 범위를 지정하는 **뷰 캡슐화(view encapsulation)** 설정을 지정할 수 있습니다.
뷰 캡슐화 모드는 `Emulated`, `ShadowDom`, `ExperimentalIsolatedShadowDom`, `None` 네 가지입니다.
`@Component` 데코레이터에 이렇게 지정하면 됩니다:

```angular-ts {highlight:[3]}
@Component({
  ...,
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePhoto { }
```

### ViewEncapsulation.Emulated

<!--
By default, Angular uses emulated encapsulation so that a component's styles only apply to elements
defined in that component's template. In this mode, the framework generates a unique HTML attribute
for each component instance, adds that attribute to elements in the component's template, and
inserts that attribute into the CSS selectors defined in your component's styles.

This mode ensures that a component's styles do not leak out and affect other components. However,
global styles defined outside of a component may still affect elements inside a component with
emulated encapsulation.

In emulated mode, Angular supports
the [`:host`](https://developer.mozilla.org/docs/Web/CSS/:host) pseudo-class.
While the [`:host-context()`](https://developer.mozilla.org/docs/Web/CSS/:host-context) pseudo-class
is deprecated in modern browsers, Angular's compiler provides full support for it. Both pseudo-classes
can be used without relying on native
[Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM).
During compilation, the framework transforms these pseudo classes into attributes so it doesn't
comply with these native pseudo classes' rules at runtime (e.g. browser compatibility, specificity). Angular's
emulated encapsulation mode does not support any other pseudo classes related to Shadow DOM, such
as `::shadow` or `::part`.
-->

기본적으로 Angular는 에뮬레이션된 뷰 캡슐화 정책을 사용하기 때문에 컴포넌트의 스타일은 컴포넌트 템플릿에 있는 엘리먼트에만 적용됩니다.
Angular는 이 모드에서 컴포넌트 인스턴스마다 고유한 HTML 어트리뷰트를 생성해서 컴포넌트 템플릿의 엘리먼트에 추가하고, 컴포넌트 스타일에도 해당 어트리뷰트를 추가합니다.

이 모드를 사용하면 한 컴포넌트의 스타일이 다른 컴포넌트에 영향을 주지 않습니다.
하지만 컴포넌트 밖에 지정된 전역 스타일은 컴포넌트에도 적용됩니다.

에뮬레이션 모드에서 Angular는 [Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)을 사용하지 않고 [`:host`](https://developer.mozilla.org/docs/Web/CSS/:host)와 [`:host-context()`](https://developer.mozilla.org/docs/Web/CSS/:host-context) 가상 클래스를 지원합니다.
이런 가상 클래스들은 컴파일 과정에서 어트리뷰트로 변경되어 실행 시점에 네이티브 가상 클래스와 충돌하지 않도록 변환됩니다.
Angular의 에뮬레이션 모드는 `::shadow`나 `::part`와 같은 Shadow DOM 가상 클래스는 지원하지 않습니다.

#### `::ng-deep`

<!--
Angular's emulated encapsulation mode supports a custom pseudo class, `::ng-deep`.
**The Angular team strongly discourages new use of `::ng-deep`**. These APIs remain
exclusively for backwards compatibility.

When a selector contains `::ng-deep`, Angular stops applying view-encapsulation boundaries after that point in the selector. Any part of the selector that follows `::ng-deep` can match elements outside the component’s template.

For example:

- a CSS rule selector like `p a`, using the emulated encapsulation, will match `<a>` elements that are descendants of a `<p>` element,
  both being within the component's own template.

- A selector like `::ng-deep p a` will match `<a>` elements anywhere in the application, descendants of a `<p>` element anywhere in the application.

  That effectively makes it behave like a global style.

- In `p ::ng-deep a`, Angular requires the `<p>` element to come from the component's own template, but the `<a>` element may be anywhere in the application.

  So, in effect, the `<a>` element may be in the component's template, or in any of its projected or child content.

- With `:host ::ng-deep p a`, both the `<a>` and `<p>` elements must be descendants of the component's host element.

  They can come from the component's template or the views of its child components, but not elsewhere in the app.
-->

Angular는 캡슐화를 에뮬레이션하는 가상 클래스, `::ng-deep`을 지원합니다.
**하지만 Angular 팀은 `::ng-deep` 사용을 강하게 비권장합니다.**
이 API는 하위 호환성을 위해 남아있는 것입니다.

`::ng-deep` 셀렉터를 사용하면 이 셀렉터 뒷부분은 Angular의 뷰 캡슐화가 적용되지 않습니다.
그래서 `::ng-deep` 이후에 오는 선택자의 모든 부분은 컴포넌트 템플릿 밖의 범위에도 매칭될 수 있습니다.

예를 들면:

- `p a`라는 CSS 셀렉터를 사용하면, 컴포넌트 템플릿에 존재하는 `<p>` 엘리먼트의 자식 `<a>` 엘리먼트와 매칭됩니다.

- `::ng-deep p a`를 사용하면 애플리케이션 전체 범위에 있는 `<p>` 엘리먼트의 자식 `<a>` 엘리먼트와 매칭됩니다. 사실상 전역 스타일을 지정한 것과 같습니다.

- `p ::ng-deep a`를 사용하면 컴포넌트 템플릿의 `<p>` 엘리먼트 안에 있는 `<a>` 엘리먼트를 매칭해야 하지만, 사실상 애플리케이션 전체 범위의 `<a>` 엘리먼트와 매칭됩니다.

  즉, 컴포넌트 템플릿에 있는 `<a>` 엘리먼트와 컴포넌트에 프로젝션된 자식 컨텐츠에도 적용될 수 있습니다.

- `:host ::ng-deep p a`를 사용하면 컴포넌트 호스트 엘리먼트의 자식 `<a>`와 `<p>` 엘리먼트와 매칭됩니다.

  이 엘리먼트 매칭은 컴포넌트 템플릿에 존재하거나, 자식 컴포넌트에는 적용되지만 컴포넌트 밖 범위에는 적용되지 않습니다.

### ViewEncapsulation.ShadowDom

<!--
This mode scopes styles within a component by
using [the web standard Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM).
When enabling this mode, Angular attaches a shadow root to the component's host element and renders
the component's template and styles into the corresponding shadow tree.

Styles inside the shadow tree cannot affect elements outside of that shadow tree.

Enabling `ShadowDom` encapsulation, however, impacts more than style scoping. Rendering the
component in a shadow tree affects event propagation, interaction
with [the `<slot>` API](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots),
and how browser developer tools show elements. Always understand the full implications of using
Shadow DOM in your application before enabling this option.
-->

이 모드를 사용하면 [웹 표준 Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)를 사용해서 컴포넌트 스타일을 컴포넌트에만 적용합니다.
이 모드에서는 Angular가 컴포넌트의 호스트 엘리먼트에 Shadow DOM을 붙이고 컴포넌트 템플릿을 해당 Shadow DOM에 렌더링하면서 스타일을 적용합니다.

Shadow DOM 트리 안의 스타일은 트리 밖에 있는 엘리먼트에 영향을 주지 않습니다.

하지만 `ShadowDom` 뷰 캡슐화를 사용하면 스타일 적용 범위 외에 다른 영향을 줍니다.
Shadow DOM 트리에 렌더링된 컴포넌트는 이벤트 전파 방식에 영향을 미치며, [`<slot>` API](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots)를 사용해야 하고, 브라우저 개발자 도구가 엘리먼트를 표시하는 방식도 변경됩니다.
Shadow DOM을 사용할 때는 이 옵션이 어떤 영향을 주는지 정확하게 이해한 후에 사용해야 합니다.

### ViewEncapsulation.ExperimentalIsolatedShadowDom

<!--
Behaves as above, except this mode strictly guarantees that _only_ that component's styles apply to elements in the
component's template. Global styles cannot affect elements in a shadow tree and styles inside the
shadow tree cannot affect elements outside of that shadow tree.
-->

위와 동일하게 동작하지만, 이 모드는 해당 컴포넌트 템플릿에만 적용되도록 엄격하게 보장됩니다.
전역 스타일은 섀도우 DOM 트리에 영향을 미치지 않으며, 섀도우 DOM 안에 적용된 스타일은 섀도우 DOM 밖에 영향을 미치지 않습니다.

### ViewEncapsulation.None

<!--
This mode disables all style encapsulation for the component. Any styles associated with the
component behave as global styles.

NOTE: In `Emulated` and `ShadowDom` modes, Angular doesn't 100% guarantee that your component's styles will always override styles coming from outside it.
It is assumed that these styles have the same specificity as your component's styles in case of collision.
-->

이 모드를 사용하면 컴포넌트의 뷰 캡슐화를 적용하지 않습니다.
컴포넌트 스타일은 모두 전역 스타일이 됩니다.

참고: `Emulated`나 `ShadowDom` 모드를 사용할 때 컴포넌트 외부에서 지정한 스타일을 컴포넌트 내부에서 오버라이드할 수 있다고 보장하지는 않습니다.
CSS 지정의 구체도가 같다면 컴포넌트 스타일 지정이 충돌할 수 있습니다.

<!--
## Defining styles in templates
-->

## 템플릿에서 스타일 지정하기 {#defining-styles-in-templates}

<!--
You can use the `<style>` element in a component's template to define additional styles. The
component's view encapsulation mode applies to styles defined this way.

Angular does not support bindings inside of style elements.
-->

컴포넌트 템플릿에서 직접 스타일을 지정하려면 `<style>` 엘리먼트를 사용하면 됩니다.
이 경우에도 컴포넌트의 뷰 캡슐화 정책이 적용됩니다.

Angular는 스타일 엘리먼트 내부에는 바인딩 문법을 지원하지 않습니다.

<!--
## Referencing external style files
-->

## 외부 스타일 파일 참조하기 {#referencing-external-style-files}

<!--
Component templates can
use [the `<link>` element](https://developer.mozilla.org/docs/Web/HTML/Element/link) to
reference CSS files. Additionally, your CSS may
use [the `@import`at-rule](https://developer.mozilla.org/docs/Web/CSS/@import) to reference
CSS files. Angular treats these references as _external_ styles. External styles are not affected by
emulated view encapsulation.
-->

컴포넌트 템플릿에서 외부 CSS 파일을 참조하기 위해 [`<link>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/link)를 사용할 수 있습니다.
그리고 CSS 스타일 안에서 [`@import`](https://developer.mozilla.org/docs/Web/CSS/@import)를 사용해서 외부 CSS 파일을 참조할 수도 있습니다.
Angular는 이런 참조 방식을 컴포넌트 _외부_ 스타일로 간주합니다.
컴포넌트 외부 스타일은 에뮬레이션 뷰 캡슐화의 영향을 받지 않습니다.

<!--
## Namespacing CSS custom properties

Angular can add a prefix to the CSS custom properties (also called CSS variables) that your
component styles declare and read. Custom properties inherit down the DOM tree, so when something
outside your application defines a custom property such as `--primary-color` on an ancestor
element, your components read that value. This matters when your application shares a page with another
application or with markup you do not control. Angular does not namespace custom properties until
you ask it to, and an application that owns its page does not need namespacing.

To scope the custom properties in your component styles to your application, add
[`provideCssVarNamespacing`](api/platform-browser/provideCssVarNamespacing) to your application's
providers. It uses the application's [`APP_ID`](api/core/APP_ID) as the namespace:

```ts {header: "app.config.ts"}
import {APP_ID, ApplicationConfig} from '@angular/core';
import {provideCssVarNamespacing} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [{provide: APP_ID, useValue: 'my-app'}, provideCssVarNamespacing()],
};
```

Angular prefixes the custom properties in your component styles with that namespace followed by an
underscore, so `--primary-color` becomes `--my-app_primary-color`. The prefix applies to
declarations, `var()` references, `@property` rules, and style bindings such as
`[style.--primary-color]`, including the style bindings a component declares in its `host` object.

`APP_ID` is `ng` unless you set it, so give each application on the page its own `APP_ID`.
Otherwise, the applications share a prefix and collide again. To use a namespace that differs from
the application id, pass it to `provideCssVarNamespacing`. Angular appends the underscore itself:
`provideCssVarNamespacing('my-app_')` produces `--my-app__primary-color`.

Angular namespaces the styles it compiles into a component: the `styles` and `styleUrl` of the
component, the styles you [write in a `<style>` element](#defining-styles-in-templates) in its
template, stylesheets its template references with a relative `<link rel="stylesheet">`, and
the styles of a component that uses `ViewEncapsulation.None`. Angular does not namespace a stylesheet the browser
loads at runtime, such as a global stylesheet your build configuration lists or an
[external style](#referencing-external-style-files) that your build does not inline.

Namespacing applies to every component Angular compiles, including the components of the libraries
you install. When a library's styles read a custom property that a global stylesheet defines, such
as the properties of a theme, the reference no longer matches, the browser uses the `var()`
fallback if there is one or otherwise
[the property's inherited or initial value](https://www.w3.org/TR/css-variables-1/#invalid-variables),
and nothing reports an error. Before you enable namespacing in an
existing application, review the custom properties that cross between your global stylesheets and
your components.

IMPORTANT: Angular rewrites custom property names only in the styles and bindings it compiles.
Everywhere else keeps the name you write, and nothing reports the mismatch.

Angular does not rewrite the name in:

- Static style attributes, such as `style="--primary-color: red"`, including the `style` entry of a
  component's `host` object.
- Object and string style bindings, such as `[style]="{'--primary-color': color}"`,
  `[style]="'--primary-color: red'"` and `ngStyle`, including the `[style]` entry of a component's
  `host` object.
- Custom property names inside a binding's value, such as
  `[style.border-color]="'var(--primary-color)'"`.
- Calls to `Renderer2.setStyle`.

Each of these produces a property that your namespaced styles no longer read. Namespace those
names yourself, as described in
[Using namespaced properties in TypeScript](#using-namespaced-properties-in-typescript).

### Opting out of namespacing

To declare or read a custom property that Angular does not namespace, such as one defined in a
global stylesheet, prefix its name with `--global--`. Angular removes `--global` and leaves the
remaining `--` and the rest of the name unchanged:

```css
:host {
  /* Declares --accent-color and reads --brand-color, not --my-app_brand-color. */
  --global--accent-color: navy;
  color: var(--global--brand-color);
}
```

Write two hyphens after `global`. A single hyphen, as in `--global-brand-color`, does not opt out,
and Angular namespaces that name like any other. Avoid names that start with `--global-` followed
by anything but a second hyphen; a future major version is planned to reject them at build time.
Angular removes `--global` in every application, including applications that never configure a
namespace.

### Using namespaced properties in TypeScript

Prefer a style binding such as `[style.--primary-color]`, which Angular namespaces for you. When
you go through a DOM API instead, pass the name you wrote in your styles to
[`CssVarNamespacer`](api/platform-browser/CssVarNamespacer), including the leading `--`:

```angular-ts {header: "profile-photo.ts"}
import {Component, ElementRef, inject} from '@angular/core';
import {CssVarNamespacer} from '@angular/platform-browser';

@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: `
    img {
      border: 2px solid var(--primary-color);
    }
  `,
})
export class ProfilePhoto {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly cssVarNamespacer = inject(CssVarNamespacer);

  setPrimaryColor(color: string): void {
    this.host.style.setProperty(this.cssVarNamespacer.namespace('--primary-color'), color);
  }
}
```

Use the plain name for a property you declared with `--global--`, since Angular never namespaces
those. For everything else, `namespace` returns the name unchanged when an application configures
no namespace, so a library can call it for the custom properties its own styles declare.
-->

## CSS 커스텀 프로퍼티에 네임스페이스 적용하기 {#namespacing-css-custom-properties}

Angular는 컴포넌트 스타일에서 선언하고 읽는 CSS 커스텀 프로퍼티(CSS 변수)에 접두사를 추가할 수 있습니다.
커스텀 프로퍼티는 DOM 트리를 따라 아래로 상속됩니다. 따라서 애플리케이션 외부에서 상위 엘리먼트에 `--primary-color` 같은 커스텀 프로퍼티를 정의하면 컴포넌트가 그 값을 읽게 됩니다.
다른 애플리케이션이나 직접 제어하지 않는 마크업과 페이지를 공유할 때는 이 점이 중요합니다.
Angular는 명시적으로 설정하기 전까지 커스텀 프로퍼티에 네임스페이스를 적용하지 않으며, 페이지 전체를 사용하는 애플리케이션에는 네임스페이스가 필요하지 않습니다.

컴포넌트 스타일의 커스텀 프로퍼티 범위를 애플리케이션으로 한정하려면 애플리케이션의 프로바이더에 [`provideCssVarNamespacing`](api/platform-browser/provideCssVarNamespacing)을 추가하세요.
애플리케이션의 [`APP_ID`](api/core/APP_ID)를 네임스페이스로 사용합니다.

```ts {header: "app.config.ts"}
import {APP_ID, ApplicationConfig} from '@angular/core';
import {provideCssVarNamespacing} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [{provide: APP_ID, useValue: 'my-app'}, provideCssVarNamespacing()],
};
```

Angular는 컴포넌트 스타일의 커스텀 프로퍼티 앞에 네임스페이스와 밑줄을 붙입니다. 따라서 `--primary-color`는 `--my-app_primary-color`가 됩니다.
이 접두사는 선언, `var()` 참조, `@property` 규칙, `[style.--primary-color]` 같은 스타일 바인딩에 적용되며, 컴포넌트의 `host` 객체에 선언한 스타일 바인딩도 포함합니다.

`APP_ID`를 설정하지 않으면 기본값은 `ng`입니다. 페이지의 각 애플리케이션에 서로 다른 `APP_ID`를 지정하세요.
그렇지 않으면 애플리케이션들이 같은 접두사를 사용해서 다시 충돌합니다.
애플리케이션 ID와 다른 네임스페이스를 사용하려면 `provideCssVarNamespacing`에 원하는 값을 전달하세요.
Angular가 밑줄을 직접 추가하므로 `provideCssVarNamespacing('my-app_')`는 `--my-app__primary-color`를 만듭니다.

Angular는 컴포넌트로 컴파일하는 스타일에 네임스페이스를 적용합니다.
컴포넌트의 `styles`와 `styleUrl`, 템플릿의 [`<style>` 엘리먼트에 작성한 스타일](#defining-styles-in-templates), 템플릿에서 상대 경로의 `<link rel="stylesheet">`로 참조하는 스타일시트, `ViewEncapsulation.None`을 사용하는 컴포넌트의 스타일이 여기에 해당합니다.
빌드 설정에 나열한 전역 스타일시트나 빌드할 때 인라인으로 포함하지 않는 [외부 스타일](#referencing-external-style-files)처럼 브라우저가 런타임에 로드하는 스타일시트에는 네임스페이스를 적용하지 않습니다.

네임스페이스는 설치한 라이브러리의 컴포넌트를 포함해서 Angular가 컴파일하는 모든 컴포넌트에 적용됩니다.
라이브러리 스타일이 테마 프로퍼티처럼 전역 스타일시트에 정의한 커스텀 프로퍼티를 읽는다면 참조하는 이름이 더 이상 일치하지 않게 됩니다.
이때 브라우저는 `var()`에 대체값이 있으면 그 값을 사용하고, 없으면 [프로퍼티의 상속값이나 초기값](https://www.w3.org/TR/css-variables-1/#invalid-variables)을 사용하며 오류를 보고하지 않습니다.
기존 애플리케이션에서 네임스페이스를 활성화하기 전에 전역 스타일시트와 컴포넌트 사이에서 공유하는 커스텀 프로퍼티를 확인하세요.

중요: Angular는 직접 컴파일하는 스타일과 바인딩에서만 커스텀 프로퍼티의 이름을 변경합니다.
그 밖의 위치에서는 작성한 이름을 그대로 유지하며, 이름이 일치하지 않아도 오류를 보고하지 않습니다.

다음 위치에서는 이름을 변경하지 않습니다.

- `style="--primary-color: red"` 같은 정적 스타일 어트리뷰트. 컴포넌트의 `host` 객체에 있는 `style` 항목도 포함합니다.
- `[style]="{'--primary-color': color}"`, `[style]="'--primary-color: red'"`, `ngStyle` 같은 객체 및 문자열 스타일 바인딩. 컴포넌트의 `host` 객체에 있는 `[style]` 항목도 포함합니다.
- `[style.border-color]="'var(--primary-color)'"`처럼 바인딩 값 안에 있는 커스텀 프로퍼티 이름
- `Renderer2.setStyle` 호출

이렇게 생성한 프로퍼티는 네임스페이스가 적용된 스타일에서 더 이상 읽을 수 없습니다.
[TypeScript에서 네임스페이스가 적용된 프로퍼티 사용하기](#using-namespaced-properties-in-typescript)에서 설명하는 방식으로 직접 네임스페이스를 적용하세요.

### 네임스페이스 적용 제외하기 {#opting-out-of-namespacing}

전역 스타일시트에 정의한 프로퍼티처럼 Angular가 네임스페이스를 적용하지 않아야 하는 커스텀 프로퍼티를 선언하거나 읽으려면 이름 앞에 `--global--`을 붙이세요.
Angular는 `--global`을 제거하고 나머지 `--`와 이름은 그대로 유지합니다.

```css
:host {
  /* --accent-color를 선언하고 --my-app_brand-color 대신 --brand-color를 읽습니다. */
  --global--accent-color: navy;
  color: var(--global--brand-color);
}
```

`global` 뒤에는 하이픈을 두 개 작성하세요.
`--global-brand-color`처럼 하이픈을 하나만 사용하면 적용 제외 대상이 되지 않으며, 다른 이름과 마찬가지로 네임스페이스가 적용됩니다.
`--global-` 다음에 두 번째 하이픈 이외의 문자가 오는 이름은 사용하지 마세요. 향후 메이저 버전에서는 빌드 시점에 이러한 이름을 허용하지 않을 예정입니다.
네임스페이스를 설정하지 않은 애플리케이션을 포함해서 모든 애플리케이션에서 Angular는 `--global`을 제거합니다.

### TypeScript에서 네임스페이스가 적용된 프로퍼티 사용하기 {#using-namespaced-properties-in-typescript}

Angular가 자동으로 네임스페이스를 적용하는 `[style.--primary-color]` 같은 스타일 바인딩을 우선 사용하세요.
대신 DOM API를 사용한다면 스타일에 작성한 이름을 앞쪽의 `--`까지 포함해서 [`CssVarNamespacer`](api/platform-browser/CssVarNamespacer)에 전달하세요.

```angular-ts {header: "profile-photo.ts"}
import {Component, ElementRef, inject} from '@angular/core';
import {CssVarNamespacer} from '@angular/platform-browser';

@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="프로필 사진" />`,
  styles: `
    img {
      border: 2px solid var(--primary-color);
    }
  `,
})
export class ProfilePhoto {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly cssVarNamespacer = inject(CssVarNamespacer);

  setPrimaryColor(color: string): void {
    this.host.style.setProperty(this.cssVarNamespacer.namespace('--primary-color'), color);
  }
}
```

`--global--`로 선언한 프로퍼티에는 Angular가 네임스페이스를 적용하지 않으므로 원래 이름을 사용하세요.
다른 프로퍼티의 경우 애플리케이션에 네임스페이스가 설정되어 있지 않으면 `namespace`가 이름을 그대로 반환합니다.
따라서 라이브러리에서도 자체 스타일에 선언한 커스텀 프로퍼티에 이 메서드를 사용할 수 있습니다.
