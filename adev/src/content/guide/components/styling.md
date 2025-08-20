<!--
# Styling components
-->
# 컴포넌트 스타일

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Components can optionally include CSS styles that apply to that component's DOM:

<docs-code language="angular-ts" highlight="[4]">
@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="Your profile photo">`,
  styles: ` img { border-radius: 50%; } `,
})
export class ProfilePhoto { }
</docs-code>

You can also choose to write your styles in separate files:

<docs-code language="angular-ts" highlight="[4]">
@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css',
})
export class ProfilePhoto { }
</docs-code>

When Angular compiles your component, these styles are emitted with your component's JavaScript
output. This means that component styles participate in the JavaScript module system. When you
render an Angular component, the framework automatically includes its associated styles, even when
lazy-loading a component.

Angular works with any tool that outputs CSS,
including [Sass](https://sass-lang.com), [less](https://lesscss.org),
and [stylus](https://stylus-lang.com).
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트는 CSS 스타일을 지정할 수 있습니다:

<docs-code language="angular-ts" highlight="[4]">
@Component({
  selector: 'profile-photo',
  template: `<img src="profile-photo.jpg" alt="Your profile photo">`,
  styles: ` img { border-radius: 50%; } `,
})
export class ProfilePhoto { }
</docs-code>

그리고 스타일 파일이 별도 파일로 존재한다면 이렇게 지정합니다:

<docs-code language="angular-ts" highlight="[4]">
@Component({
  selector: 'profile-photo',
  templateUrl: 'profile-photo.html',
  styleUrl: 'profile-photo.css',
})
export class ProfilePhoto { }
</docs-code>

Angular가 컴포넌트를 컴파일하면 컴포넌트에 지정된 스타일은 컴포넌트 JavaScript 결과물에 포함됩니다.
이 말은, 컴포넌트 스타일이 JavaScript 모듈 시스템 안에 포함된다는 것을 의미합니다.
이후에 Angular가 컴포넌트를 렌더링하면, 지연 로딩되는 컴포넌트라고 해도 컴포넌트가 로딩될 떄 스타일도 함께 로딩됩니다.

CSS 스타일을 지정할 때는 [Sass](https://sass-lang.com)나 [less](https://lesscss.org), [stylus](https://stylus-lang.com) 문법을 사용할 수도 있습니다.


<!--
## Style scoping
-->
## 스타일 지정 범위

<!--
Every component has a **view encapsulation** setting that determines how the framework scopes a
component's styles. There are three view encapsulation modes: `Emulated`, `ShadowDom`, and `None`.
You can specify the mode in the `@Component` decorator:

<docs-code language="angular-ts" highlight="[3]">
@Component({
  ...,
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePhoto { }
</docs-code>
-->
컴포넌트에는 컴포넌트 스타일의 범위를 지정하는 **뷰 캡슐화(view encapsulation)** 설정을 지정할 수 있습니다.
뷰 캡슐화 모드는 `Emulated`, `ShadowDom`, `None` 을 지정할 수 있습니다.
`@Component` 데코레이터에 이렇게 지정하면 됩니다:

<docs-code language="angular-ts" highlight="[3]">
@Component({
  ...,
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePhoto { }
</docs-code>


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
the [`:host`](https://developer.mozilla.org/docs/Web/CSS/:host)
and [`:host-context()`](https://developer.mozilla.org/docs/Web/CSS/:host-context) pseudo
classes without
using [Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM).
During compilation, the framework transforms these pseudo classes into attributes so it doesn't
comply with these native pseudo classes' rules at runtime (e.g. browser compatibility, specificity). Angular's
emulated encapsulation mode does not support any other pseudo classes related to Shadow DOM, such
as `::shadow` or `::part`.
-->
기본적으로 Angular는 에뮬레이션 된 뷰 캡슐화 정책을 사용하기 때문에 컴포넌트의 스타일은 컴포넌트 템플릿에 있는 엘리먼트에만 적용됩니다.
Angular는 이 모드에서 컴포넌트 인스턴스마다 고유한 HTML 어트리뷰트를 생성해서 컴포넌트 템플릿의 엘리먼트에 추가하고, 컴포넌트 스타일에도 해당 어트리뷰트를 추가합니다.

이 모드를 사용하면 한 컴포넌트의 스타일이 다른 컴포넌트에 영향을 주지 않습니다.
하지만 컴포넌트 밖에 지정된 전역 스타일은 컴포넌트에도 적용됩니다.

에뮬레이션 모드에서 Angular는 [Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)을 사용하지 않고 [`:host`](https://developer.mozilla.org/docs/Web/CSS/:host)와 [`:host-context()`](https://developer.mozilla.org/docs/Web/CSS/:host-context) 가상 클래스를 지원합니다.
이런 가상 클래스들은 컴파일 과정에서 어트리뷰트로 변경되어 실행 시점에 네이티브 가상 클래스와 충돌하지 않도록 변환됩니다.
Angular의 에뮬레이션 모드는 `::shadow`나 `::part`와 같은 Shadow DOM 가상 클래스는 지원하지 않습니다.


#### `::ng-deep`

<!--
Angular's emulated encapsulation mode supports a custom pseudo class, `::ng-deep`. Applying this
pseudo class to a CSS rule disables encapsulation for that rule, effectively turning it into a
global style. **The Angular team strongly discourages new use of `::ng-deep`**. These APIs remain
exclusively for backwards compatibility.
-->
Angular의 에뮬레이션 모드는 커스텀 가상 클래스 `::ng-deep`을 지원합니다.
이 가상 클래스를 사용하면 뷰 캡슐화를 무시하며 사실상 전역 스타일로 적용됩니다.
**하지만 Angular 팀은 `::ng-deep` 사용을 강력하게 만류합니다.**
이 API는 이전 버전 호환성을 위해서 남아있는 용도입니다.


### ViewEncapsulation.ShadowDom

<!--
This mode scopes styles within a component by
using [the web standard Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM).
When enabling this mode, Angular attaches a shadow root to the component's host element and renders
the component's template and styles into the corresponding shadow tree.

This mode strictly guarantees that _only_ that component's styles apply to elements in the
component's template. Global styles cannot affect elements in a shadow tree and styles inside the
shadow tree cannot affect elements outside of that shadow tree.

Enabling `ShadowDom` encapsulation, however, impacts more than style scoping. Rendering the
component in a shadow tree affects event propagation, interaction
with [the `<slot>` API](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots),
and how browser developer tools show elements. Always understand the full implications of using
Shadow DOM in your application before enabling this option.
-->
이 모드를 사용하면 [웹 표준 Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)를 사용해서 컴포넌트 스타일을 컴포넌트에만 적용합니다.
이 모드에서는 Angular가 컴포넌트의 호스트 엘리먼트에 Shadow DOM을 붙이고 컴포넌트 템플릿을 해당 Shadow DOM에 렌더링하면서 스타일을 적용합니다.

이 모드를 사용하면 컴포넌트의 스타일이 컴포넌트 템플릿 안에 있는 엘리먼트에만 적용되는 것이 엄격하게 보장됩니다.
전역 스타일도 Shadow DOM 트리 안에 있는 엘리먼트에 영향을 주지 않으며, Shadow DOM 트리 안에서도 외부에 영향을 미칠 수 없습니다.

하지만 `ShadowDom` 뷰 캡슐화를 사용하면 스타일 적용 범위 외에 다른 영향을 줍니다.
Shadow DOM 트리에 렌더링된 컴포넌트는 이벤트 전파 방식에 영향을 미치며, [`<slot>` API](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots)를 사용해야 하고, 브라우저 개발자 도구가 엘리먼트를 표시하는 방식도 변경됩니다.
Shadow DOM을 사용할 때는 이 옵션이 어떤 영향을 주는지 정확하게 이해한 후에 사용해야 합니다.


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
## 템플릿에서 스타일 지정하기

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
## 외부 스타일 파일 참조하기

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