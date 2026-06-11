<!--
# Programmatically rendering components
-->

# 조건에 따라 컴포넌트 렌더링하기

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

In addition to using a component directly in a template, you can also dynamically render components
programmatically. This is helpful for situations when a component is unknown initially (thus can not
be referenced in a template directly) and it depends on some conditions.

There are two main ways to render a component programmatically: in a template using `NgComponentOutlet`,
or in your TypeScript code using `ViewContainerRef`.

HELPFUL: for lazy-loading use-cases (for example if you want to delay loading of a heavy component), consider
using the built-in [`@defer` feature](/guide/templates/defer) instead. The `@defer` feature allows the code
of any components, directives, and pipes inside the `@defer` block to be extracted into separate JavaScript
chunks automatically and loaded only when necessary, based on the configured triggers.
-->

팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

템플릿에 컴포넌트를 직접 사용하는 방법 외에, 컴포넌트는 프로그래밍 방식으로 동적 렌더링 할 수도 있습니다.
이 방식은 컴포넌트를 처음에 알 수 없는 경우나, 조건에 따라 달라지는 경우에 유용합니다.

컴포넌트를 프로그래밍 방식으로 렌더링하는 방법은 두 가지 입니다: 템플릿에서 `NgComponentOutlet`을 사용하거나 TypeScript 코드에서 `ViewContainerRef`를 사용하면 됩니다.

참고: 무거운 컴포넌트의 로딩을 늦추는 지연 로딩을 활용하려면 [`@defer` 기능](/guide/templates/defer)을 활용하세요.
`@defer` 기능을 활용하면 `@defer` 블록 안에 있는 모든 컴포넌트, 디렉티브, 파이프 코드를 별도 JavaScript 빌드 파일로 추출해서 필요한 경우에만 로드합니다.

<!--
## Using NgComponentOutlet
-->

## `NgComponentOutlet` 사용하기

<!--
`NgComponentOutlet` is a structural directive that dynamically renders a given component in a
template.

```angular-ts
@Component({/*...*/})
export class AdminBio { /* ... */ }

@Component({/*...*/})
export class StandardBio { /* ... */ }

@Component({
  ...,
  template: `
    <p>Profile for {{user.name}}</p>
    <ng-container *ngComponentOutlet="getBioComponent()" /> `
})
export class CustomDialog {
  user = input.required<User>();

  getBioComponent() {
    return this.user().isAdmin ? AdminBio : StandardBio;
  }
}
```

See the [NgComponentOutlet API reference](api/common/NgComponentOutlet) for more information on the
directive's capabilities.
-->

`NgComponentOutlet` 는 템플릿에서 컴포넌트를 동적으로 렌더링하는 구조 디렉티브입니다.

```angular-ts
@Component({/*...*/})
export class AdminBio { /* ... */ }

@Component({/*...*/})
export class StandardBio { /* ... */ }

@Component({
  ...,
  template: `
    <p>Profile for {{user.name}}</p>
    <ng-container *ngComponentOutlet="getBioComponent()" /> `
})
export class CustomDialog {
  user = input.required<User>();

  getBioComponent() {
    return this.user().isAdmin ? AdminBio : StandardBio;
  }
}
```

이 디렉티브에 대해 자세하게 알아보려면 [NgComponentOutlet API 문서](api/common/NgComponentOutlet)를 참고하세요.

<!--
### Passing inputs to dynamically rendered components
-->

### 렌더링 되는 컴포넌트에 입력값 동적으로 전달하기

<!--
You can pass inputs to the dynamically rendered component using the `ngComponentOutletInputs` property. This property accepts an object where keys are input names and values are the input values.

```angular-ts
@Component({
  selector: 'user-greeting',
  template: `
    <div>
      <p>User: {{ username() }}</p>
      <p>Role: {{ role() }}</p>
    </div>
  `,
})
export class UserGreeting {
  username = input.required<string>();
  role = input('guest');
}

@Component({
  selector: 'profile-view',
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="greetingComponent; inputs: greetingInputs()" />`,
})
export class ProfileView {
  greetingComponent = UserGreeting;
  greetingInputs = signal({username: 'ngAwesome', role: 'admin'});
}
```

The inputs are updated whenever the `greetingInputs` signal changes, keeping the dynamic component in sync with the parent's state.
-->

`ngComponentOutletInputs` 프로퍼티를 활용하면 렌더링되는 컴포넌트에 입력값을 동적으로 전달할 수 있습니다.
이 프로퍼티는 객체를 인자로 받는데, 객체의 키는 입력값의 이름이고, 객체의 값은 입력값의 실제 값입니다.

```angular-ts
@Component({
  selector: 'user-greeting',
  template: `
    <div>
      <p>User: {{ username() }}</p>
      <p>Role: {{ role() }}</p>
    </div>
  `,
})
export class UserGreeting {
  username = input.required<string>();
  role = input('guest');
}

@Component({
  selector: 'profile-view',
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="greetingComponent; inputs: greetingInputs()" />`,
})
export class ProfileView {
  greetingComponent = UserGreeting;
  greetingInputs = signal({username: 'ngAwesome', role: 'admin'});
}
```

입력값은 `greetingInputs` 시그널의 값이 변경될 때마다 자동으로 변경되면서 부모의 상태와 동일하게 유지됩니다.

<!--
### Providing content projection
-->

### 컨텐츠 프로젝션 제공하기

<!--
Use `ngComponentOutletContent` to pass projected content to the dynamically rendered component. This is useful when the dynamic component uses `<ng-content>` to display content.

```angular-ts
@Component({
  selector: 'card-wrapper',
  template: `
    <div class="card">
      <ng-content />
    </div>
  `,
})
export class CardWrapper {}

@Component({
  imports: [NgComponentOutlet],
  template: `
    <ng-container *ngComponentOutlet="cardComponent; content: cardContent()" />

    <ng-template #contentTemplate>
      <h3>Dynamic Content</h3>
      <p>This content is projected into the card.</p>
    </ng-template>
  `,
})
export class DynamicCard {
  private vcr = inject(ViewContainerRef);
  cardComponent = CardWrapper;

  private contentTemplate = viewChild<TemplateRef<unknown>>('contentTemplate');

  cardContent = computed(() => {
    const template = this.contentTemplate();
    if (!template) return [];
    // Returns an array of projection slots. Each element represents one <ng-content> slot.
    // CardWrapper has one <ng-content>, so we return an array with one element.
    return [this.vcr.createEmbeddedView(template).rootNodes];
  });
}
```

NOTE: Hydration does not support projecting DOM nodes created with native DOM APIs. This causes an [NG0503 error](/errors/NG0503). Use Angular APIs to create projected content or add `ngSkipHydration` to the component.
-->

`ngComponentOutletContent`를 활용하면 렌더링되는 컴포넌트의 컨텐츠 프로젝션을 동적으로 전달할 수 있습니다.
이 방식은 `<ng-content>`로 동적 컴포넌트를 구성할 때 유용합니다.

```angular-ts
@Component({
  selector: 'card-wrapper',
  template: `
    <div class="card">
      <ng-content />
    </div>
  `,
})
export class CardWrapper {}

@Component({
  imports: [NgComponentOutlet],
  template: `
    <ng-container *ngComponentOutlet="cardComponent; content: cardContent()" />

    <ng-template #contentTemplate>
      <h3>Dynamic Content</h3>
      <p>This content is projected into the card.</p>
    </ng-template>
  `,
})
export class DynamicCard {
  private vcr = inject(ViewContainerRef);
  cardComponent = CardWrapper;

  private contentTemplate = viewChild<TemplateRef<unknown>>('contentTemplate');

  cardContent = computed(() => {
    const template = this.contentTemplate();
    if (!template) return [];
    // 프로젝션 영역을 배열로 반환합니다. 개별 엘리먼트는 <ng-content> 영역에 매칭됩니다.
    // CardWrapper에는 <ng-content>가 하나 있기 때문에, 배열에는 엘리먼트를 하나만 반환합니다..
    return [this.vcr.createEmbeddedView(template).rootNodes];
  });
}
```

참고: 하이드레이션은 네이티브 DOM API를 활용하기 때문에 DOM 노드 프로젝션을 지원하지 않습니다.
이렇게 사용하려고 하면 [NG0503 에러](/errors/NG0503)가 발생합니다.
컨텐츠를 프로젝션하려면 Angular API를 사용하거나 컴포넌트에 `ngSkipHydration`을 사용하세요.

<!--
### Providing injectors
-->

### 인젝터 등록하기

<!--
You can provide a custom injector to the dynamically created component using `ngComponentOutletInjector`. This is useful for providing component-specific services or configuration.

```angular-ts
export const THEME_DATA = new InjectionToken<string>('THEME_DATA', {
  factory: () => 'light',
});

@Component({
  selector: 'themed-panel',
  template: `<div [class]="theme">...</div>`,
})
export class ThemedPanel {
  theme = inject(THEME_DATA);
}

@Component({
  selector: 'dynamic-panel',
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="panelComponent; injector: customInjector" />`,
})
export class DynamicPanel {
  panelComponent = ThemedPanel;

  customInjector = Injector.create({
    providers: [{provide: THEME_DATA, useValue: 'dark'}],
  });
}
```
-->

`ngComponentOutletInjector`를 활용하면 동적으로 생성하는 컴포넌트에 커스텀 인젝터를 등록할 수 있습니다.
이 방식은 컴포넌트별 서비스나 환경설정이 필요한 경우에 유용합니다.

```angular-ts
export const THEME_DATA = new InjectionToken<string>('THEME_DATA', {
  factory: () => 'light',
});

@Component({
  selector: 'themed-panel',
  template: `<div [class]="theme">...</div>`,
})
export class ThemedPanel {
  theme = inject(THEME_DATA);
}

@Component({
  selector: 'dynamic-panel',
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="panelComponent; injector: customInjector" />`,
})
export class DynamicPanel {
  panelComponent = ThemedPanel;

  customInjector = Injector.create({
    providers: [{provide: THEME_DATA, useValue: 'dark'}],
  });
}
```

<!--
### Accessing the component instance
-->

### 컴포넌트 인스턴스에 접근하기

<!--
You can access the dynamically created component's instance using the directive's `exportAs` feature:

```angular-ts
@Component({
  selector: 'counter',
  template: `<p>Count: {{ count() }}</p>`,
})
export class Counter {
  count = signal(0);
  increment() {
    this.count.update((c) => c + 1);
  }
}

@Component({
  imports: [NgComponentOutlet],
  template: `
    <ng-container [ngComponentOutlet]="counterComponent" #outlet="ngComponentOutlet" />

    <button (click)="outlet.componentInstance?.increment()">Increment</button>
  `,
})
export class CounterHost {
  counterComponent = Counter;
}
```

NOTE: The `componentInstance` property is `null` before the component is rendered.

See the [NgComponentOutlet API reference](api/common/NgComponentOutlet) for more information on the
directive's capabilities.
-->

동적으로 생성된 컴포넌트 인스턴스는 `exportAs`로 접근할 수 있습니다:

```angular-ts
@Component({
  selector: 'counter',
  template: `<p>Count: {{ count() }}</p>`,
})
export class Counter {
  count = signal(0);
  increment() {
    this.count.update((c) => c + 1);
  }
}

@Component({
  imports: [NgComponentOutlet],
  template: `
    <ng-container [ngComponentOutlet]="counterComponent" #outlet="ngComponentOutlet" />

    <button (click)="outlet.componentInstance?.increment()">Increment</button>
  `,
})
export class CounterHost {
  counterComponent = Counter;
}
```

참고: 컴포넌트가 렌더링되기 전이라면 `componentInstance` 프로퍼티의 값은 `null` 입니다.

자세한 내용은 [NgComponentOutlet API](api/common/NgComponentOutlet)를 참고하세요.

<!--
## Using ViewContainerRef
-->

## `ViewContainerRef` 사용하기

<!--
A **view container** is a node in Angular's component tree that can contain content. Any component
or directive can inject `ViewContainerRef` to get a reference to a view container corresponding to
that component or directive's location in the DOM.

You can use the `createComponent`method on `ViewContainerRef` to dynamically create and render a
component. When you create a new component with a `ViewContainerRef`, Angular appends it into the
DOM as the next sibling of the component or directive that injected the `ViewContainerRef`.

```angular-ts
@Component({
  selector: 'leaf-content',
  template: `This is the leaf content`,
})
export class LeafContent {}

@Component({
  selector: 'outer-container',
  template: `
    <p>This is the start of the outer container</p>
    <inner-item />
    <p>This is the end of the outer container</p>
  `,
})
export class OuterContainer {}

@Component({
  selector: 'inner-item',
  template: `<button (click)="loadContent()">Load content</button>`,
})
export class InnerItem {
  private viewContainer = inject(ViewContainerRef);

  loadContent() {
    this.viewContainer.createComponent(LeafContent);
  }
}
```

In the example above, clicking the "Load content" button results in the following DOM structure

```angular-html
<outer-container>
  <p>This is the start of the outer container</p>
  <inner-item>
    <button>Load content</button>
  </inner-item>
  <leaf-content>This is the leaf content</leaf-content>
  <p>This is the end of the outer container</p>
</outer-container>
```
-->

**뷰 컨테이너** 는 컴포넌트 트리에서 내용물을 담는 노드를 의미합니다.
그리고 컴포넌트나 디렉티브는 `ViewContainerRef`를 의존성 객체로 주입받아서 DOM에 존재하는 뷰 컨테이너를 참조할 수 있습니다.

`ViewContainerRef` 객체의 `createComponent` 메서드를 사용하면 컴포넌트를 동적으로 생성하고 렌더링 할 수 있습니다.
`ViewContainerRef`를 사용해서 컴포넌트를 생성하면 Angular는 `ViewContainerRef`로 참조한 컴포넌트나 디렉티브 바로 옆에 DOM을 추가합니다.

```angular-ts
@Component({
  selector: 'leaf-content',
  template: `This is the leaf content`,
})
export class LeafContent {}

@Component({
  selector: 'outer-container',
  template: `
    <p>This is the start of the outer container</p>
    <inner-item />
    <p>This is the end of the outer container</p>
  `,
})
export class OuterContainer {}

@Component({
  selector: 'inner-item',
  template: `<button (click)="loadContent()">Load content</button>`,
})
export class InnerItem {
  private viewContainer = inject(ViewContainerRef);

  loadContent() {
    this.viewContainer.createComponent(LeafContent);
  }
}
```

위 예제코드에서 사용자가 "Load content" 버튼을 클릭하면 아래 DOM 구조가 화면에 렌더링 됩니다.

```angular-html
<outer-container>
  <p>This is the start of the outer container</p>
  <inner-item>
    <button>Load content</button>
  </inner-item>
  <leaf-content>This is the leaf content</leaf-content>
  <p>This is the end of the outer container</p>
</outer-container>
```

<!--
## Lazy-loading components
-->

## 컴포넌트 지연 로딩

<!--
HELPFUL: if you want to lazy-load some components, you may consider using the built-in [`@defer` feature](/guide/templates/defer)
instead.

If your use-case is not covered by the `@defer` feature, you can use either `NgComponentOutlet` or
`ViewContainerRef` with a standard JavaScript [dynamic import](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import).

```angular-ts
@Component({
  ...,
  template: `
    <section>
      <h2>Basic settings</h2>
      <basic-settings />
    </section>
    <section>
      <h2>Advanced settings</h2>
      @if(!advancedSettings) {
        <button (click)="loadAdvanced()">
          Load advanced settings
        </button>
      }
      <ng-container *ngComponentOutlet="advancedSettings" />
    </section>
  `
})
export class AdminSettings {
  advancedSettings: {new(): AdvancedSettings} | undefined;

  async loadAdvanced() {
    const { AdvancedSettings } = await import('path/to/advanced_settings.js');
    this.advancedSettings = AdvancedSettings;
  }
}
```

The example above loads and displays the `AdvancedSettings` upon receiving a button click.
-->

참고: 컴포넌트를 지연로딩한다면 [`@defer` feature](/guide/templates/defer) 사용을 고려해 보세요.

`@defer`가 제공하는 기능보다 다른 기능이 필요하다면 `NgComponentOutlet`이나 `ViewContainerRef`를 사용해서 표준 JavaScript [동적 import](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import)를 활용하면 됩니다.

```angular-ts
@Component({
  ...,
  template: `
    <section>
      <h2>Basic settings</h2>
      <basic-settings />
    </section>
    <section>
      <h2>Advanced settings</h2>
      @if(!advancedSettings) {
        <button (click)="loadAdvanced()">
          Load advanced settings
        </button>
      }
      <button (click)="loadAdvanced()" *ngIf="!advancedSettings">
        Load advanced settings
      </button>
      <ng-container *ngComponentOutlet="advancedSettings" />
    </section>
  `
})
export class AdminSettings {
  advancedSettings: {new(): AdvancedSettings} | undefined;

  async loadAdvanced() {
    const { AdvancedSettings } = await import('path/to/advanced_settings.js');
    this.advancedSettings = AdvancedSettings;
  }
}
```

이렇게 구현하면 사용자가 버튼을 클릭했을 때 `AdvancedSettings` 컴포넌트가 동적으로 로딩되어 화면에 렌더링됩니다.

<!--
## Binding inputs, outputs and setting host directives at creation
-->

## 컴포넌트 생성 시점에 입출력값 바인딩, 호스트 디렉티브 설정하면

<!--
When dynamically creating components, manually setting inputs and subscribing to outputs can be error-prone. You often need to write extra code just to wire up bindings after the component is instantiated.

To simplify this, both `createComponent` and `ViewContainerRef.createComponent` support passing a `bindings` array with helpers like `inputBinding()`, `outputBinding()`, and `twoWayBinding()` to configure inputs and outputs up front. You can also specify a `directives` array to apply any host directives. This enables creating components programmatically with template-like bindings in a single, declarative call.
-->

컴포넌트를 동적으로 생성할 때 입력값을 수동으로 설정하고 출력값을 구독하면 에러가 발생할 가능성이 높습니다.
바인딩은 컴포넌트 인스턴스가 생성된 후에 별도로 하는 것이 좋습니다.

간단하게 이야기하면, `createComponent`나 `ViewContainerRef.createComponent` 함수는 `inputBinding()`, `outputBinding()`, `twoWayBinding()`과 같이 입출력값을 바인딩하는 기능을 제공합니다.
로스트 디렉티브에는 `directives` 배열을 지정할 수도 있습니다.
이 방식을 활용하면 컴포넌트를 코드로 생성하면서 템플릿 바인딩을 한 번에 처리할 수 있습니다.

<!--
### Host view using `ViewContainerRef.createComponent`
-->

### `ViewContainerRef.createComponent`를 활용하는 호스트 뷰

<!--
`ViewContainerRef.createComponent` creates a component and automatically inserts its host view and host element into the container’s view hierarchy at the container’s location. Use this when the dynamic component should become part of the container’s logical and visual structure (for example, adding list items or inline UI).

By contrast, the standalone `createComponent` API does not attach the new component to any existing view or DOM location — it returns a `ComponentRef` and gives you explicit control over where to place the component’s host element.

```angular-ts
import {Component, input, model, output} from '@angular/core';

@Component({
  selector: 'app-warning',
  template: `
    @if (isExpanded()) {
      <section>
        <p>Warning: Action needed!</p>
        <button (click)="close.emit(true)">Close</button>
      </section>
    }
  `,
})
export class AppWarning {
  readonly canClose = input.required<boolean>();
  readonly isExpanded = model<boolean>();
  readonly close = output<boolean>();
}
```

```ts
import {
  Component,
  ViewContainerRef,
  signal,
  inputBinding,
  outputBinding,
  twoWayBinding,
  inject,
} from '@angular/core';
import {FocusTrap} from '@angular/cdk/a11y';
import {ThemeDirective} from '../theme.directive';

@Component({
  template: `<ng-container #container />`,
})
export class Host {
  private vcr = inject(ViewContainerRef);
  readonly canClose = signal(true);
  readonly isExpanded = signal(true);

  showWarning() {
    const compRef = this.vcr.createComponent(AppWarning, {
      bindings: [
        inputBinding('canClose', this.canClose),
        twoWayBinding('isExpanded', this.isExpanded),
        outputBinding<boolean>('close', (confirmed) => {
          console.log('Closed with result:', confirmed);
        }),
      ],
      directives: [
        FocusTrap,
        {type: ThemeDirective, bindings: [inputBinding('theme', () => 'warning')]},
      ],
    });
  }
}
```

In the example above, the dynamic **AppWarning** is created with its `canClose` input bound to a reactive signal, a two-way binding on its `isExpanded` state, and an output listener for `close`. The `FocusTrap` and `ThemeDirective` are attached to the host element via `directives`.
-->

`ViewContainerRef.createComponent`는 컴포넌트를 생성하면서 호스트 뷰와 호스트 엘리먼트를 컨테이너의 뷰 계층내 지정된 위치에 자동으로 삽입합니다.
이 메서드는 동적 컴포넌트가 목록 항목이나 인라인 UI와 같이 컨테이너의 논리적, 시각적 구조의 일부가 되어야 할 때 활용합니다.

반면, 함수로 제공되는 `createComponent` API는 새 컴포넌트를 생성하면서 이 컴포넌트를 뷰나 DOM에 삽입하지 않고, `ComponentRef`를 반환하기 때문에, 이 참조를 활용햇 ㅓ컴포넌트의 호스트 엘리먼트의 원하는 위치에 넣을 수 있습니다.

```angular-ts
import {Component, input, model, output} from '@angular/core';

@Component({
  selector: 'app-warning',
  template: `
    @if (isExpanded()) {
      <section>
        <p>Warning: Action needed!</p>
        <button (click)="close.emit(true)">Close</button>
      </section>
    }
  `,
})
export class AppWarning {
  readonly canClose = input.required<boolean>();
  readonly isExpanded = model<boolean>();
  readonly close = output<boolean>();
}
```

```ts
import {
  Component,
  ViewContainerRef,
  signal,
  inputBinding,
  outputBinding,
  twoWayBinding,
  inject,
} from '@angular/core';
import {FocusTrap} from '@angular/cdk/a11y';
import {ThemeDirective} from '../theme.directive';

@Component({
  template: `<ng-container #container />`,
})
export class Host {
  private vcr = inject(ViewContainerRef);
  readonly canClose = signal(true);
  readonly isExpanded = signal(true);

  showWarning() {
    const compRef = this.vcr.createComponent(AppWarning, {
      bindings: [
        inputBinding('canClose', this.canClose),
        twoWayBinding('isExpanded', this.isExpanded),
        outputBinding<boolean>('close', (confirmed) => {
          console.log('Closed with result:', confirmed);
        }),
      ],
      directives: [
        FocusTrap,
        {type: ThemeDirective, bindings: [inputBinding('theme', () => 'warning')]},
      ],
    });
  }
}
```

위 예제에서 동적으로 생성되는 **AppWarning**은 `canClose` 입력값이 반응형 시그널과 바인딩되며, `isExpanded` 상태는 양방향으로 바인딩되고, `close` 출력값의 리스너도 연결합니다.
그리고 `FocusTrap`과 `ThemeDirective`는 `directives`에 지정되어 호스트 엘리먼트에 등록되었습니다.

<!--
### Popup attached to `document.body` with `createComponent` + `hostElement`
-->

### `createComponent` + `hostElement`로 `document.body`에 팝업 붙이기

<!--
Use this when rendering outside the current view hierarchy (e.g., overlays). The provided `hostElement` becomes the component’s host in the DOM, so Angular doesn’t create a new element matching the selector. Lets you configure **bindings** directly.

```ts
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  outputBinding,
  Service,
} from '@angular/core';
import {Popup} from './popup';

@Service()
export class PopupService {
  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  show(message: string) {
    // Create a host element for the popup
    const host = document.createElement('popup-host');

    // Create the component and bind in one call
    const ref = createComponent(Popup, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('message', () => message),
        outputBinding('closed', () => {
          document.body.removeChild(host);
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        }),
      ],
    });

    // Registers the component’s view so it participates in change detection cycle.
    this.appRef.attachView(ref.hostView);
    // Inserts the provided host element into the DOM (outside the normal Angular view hierarchy).
    // This is what makes the popup visible on screen, typically used for overlays or modals.
    document.body.appendChild(host);
  }
}
```
-->

오버레이와 같이 현재 뷰 계층 외부에 렌더링할 때 사용하는 방식입니다.
`hostElement`로 지정한 엘리먼트는 컴포넌트의 호스트 엘리먼트가 되며, Angular는 새 엘리먼트를 생성하지 않습니다.
원하는대로 **바인딩**을 직접 구성할 수 있습니다.

```ts
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  outputBinding,
  Service,
} from '@angular/core';
import {Popup} from './popup';

@Service()
export class PopupService {
  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  show(message: string) {
    // 팝업 UI의 호스트 엘리먼트를 생성합니다.
    const host = document.createElement('popup-host');

    // 함수 호출 한 번으로 컴포넌트를 생성하고 바인딩합니다.
    const ref = createComponent(Popup, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('message', () => message),
        outputBinding('closed', () => {
          document.body.removeChild(host);
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        }),
      ],
    });

    // 변화 감지 싸이클에 컴포넌트 뷰를 연결합니다.
    this.appRef.attachView(ref.hostView);
    // 일반적인 Angular 뷰 계층 밖의 DOM에 호스트 엘리먼트를 넣습니다.
    // 그러면 팝업이 화면에 표시되는데, 오버레이나 모달을 구현할 때 일반적으로 사용하는 방식입니다.
    document.body.appendChild(host);
  }
}
```
