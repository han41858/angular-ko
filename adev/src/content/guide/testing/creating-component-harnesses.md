<!--
# Creating harnesses for your components
-->

<a id="creating-harnesses-for-your-components"></a>

# 컴포넌트 하네스 만들기

<!--
## Before you start
-->

<a id="before-you-start"></a>

## 시작하기 전에

<!--
TIP: This guide assumes you've already read the [component harnesses overview guide](guide/testing/component-harnesses-overview). Read that first if you're new to using component harnesses.
-->

팁: 이 문서는 [컴포넌트 하네스 개요](guide/testing/component-harnesses-overview)를 읽었다고 가정합니다.
컴포넌트 하네스를 처음 사용한다면 먼저 해당 문서를 읽어보세요.

<!--
### When does creating a test harness make sense?
-->

<a id="when-does-creating-a-test-harness-make-sense"></a>

### 테스트 하네스를 만들면 좋은 경우

<!--
The Angular team recommends creating component test harnesses for shared components that are used in many places and have some user interactivity. This most commonly applies to widget libraries and similar reusable components. Harnesses are valuable for these cases because they provide the consumers of these shared components a well- supported API for interacting with a component. Tests that use harnesses can avoid depending on unreliable implementation details of these shared components, such as DOM structure and specific event listeners.

For components that appear in only one place, such as a page in an application, harnesses don't provide as much benefit. In these situations, a component's tests can reasonably depend on the implementation details of this component, as the tests and components are updated at the same time. However, harnesses still provide some value if you would use the harness in both unit and end-to-end tests.
-->

Angular 팀은 여러 곳에서 사용하고 사용자와 상호작용하는 공유 컴포넌트에 테스트 하네스를 만드는 것을 권장합니다.
위젯 라이브러리나 이와 비슷한 재사용 컴포넌트가 주로 해당합니다.
하네스는 공유 컴포넌트 사용자에게 컴포넌트와 상호작용할 수 있는 안정적으로 지원되는 API를 제공합니다.
하네스로 테스트하면 DOM 구조나 특정 이벤트 리스너처럼 바뀔 수 있는 공유 컴포넌트의 내부 구현에 의존하지 않아도 됩니다.

애플리케이션의 페이지처럼 한 곳에서만 사용하는 컴포넌트는 하네스의 이점이 크지 않습니다.
이런 경우에는 테스트와 컴포넌트를 함께 수정하므로 테스트가 컴포넌트의 내부 구현에 의존해도 무리가 없습니다.
다만 단위 테스트와 E2E 테스트에서 하네스를 함께 사용한다면 여전히 도움이 됩니다.

<!--
### CDK Installation
-->

<a id="cdk-installation"></a>

### CDK 설치하기

<!--
The [Component Dev Kit (CDK)](https://material.angular.dev/cdk/categories) is a set of behavior primitives for building components. To use the component harnesses, first install `@angular/cdk` from npm. You can do this from your terminal using the Angular CLI:

```shell
ng add @angular/cdk
```
-->

[Component Dev Kit(CDK)](https://material.angular.dev/cdk/categories)는 컴포넌트의 동작을 구현하는 기본 요소 모음입니다.
컴포넌트 하네스를 사용하려면 먼저 npm에서 `@angular/cdk`를 설치해야 합니다.
터미널에서 Angular CLI로 설치할 수 있습니다.

```shell
ng add @angular/cdk
```

<!--
## Extending `ComponentHarness`
-->

<a id="extending-componentharness"></a>

## `ComponentHarness` 상속하기

<!--
The abstract `ComponentHarness` class is the base class for all component harnesses. To create a custom component harness, extend `ComponentHarness` and implement the static property `hostSelector`.

The `hostSelector` property identifies elements in the DOM that match this harness subclass. In most cases, the `hostSelector` should be the same as the selector of the corresponding `Component` or `Directive`. For example, consider a simple popup component:

```ts
@Component({
  selector: 'my-popup',
  template: `
    <button (click)="toggle()">{{ triggerText() }}</button>
    @if (isOpen()) {
      <div class="my-popup-content"><ng-content /></div>
    }
  `,
})
class MyPopup {
  triggerText = input('');

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }
}
```

In this case, a minimal harness for the component would look like the following:

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
}
```

While `ComponentHarness` subclasses require only the `hostSelector` property, most harnesses should also implement a static `with` method to generate `HarnessPredicate` instances. The [filtering harnesses section](guide/testing/using-component-harnesses#filtering-harnesses) covers this in more detail.
-->

추상 클래스 `ComponentHarness`는 모든 컴포넌트 하네스의 기본 클래스입니다.
커스텀 컴포넌트 하네스를 만들려면 `ComponentHarness`를 상속하고 `hostSelector` 정적 프로퍼티를 구현하세요.

`hostSelector` 프로퍼티는 이 하네스 하위 클래스에 대응하는 DOM 엘리먼트를 식별합니다.
대부분의 경우 해당 `Component`나 `Directive`의 셀렉터와 같은 값을 사용하면 됩니다.
간단한 팝업 컴포넌트를 예로 살펴봅시다.

```ts
@Component({
  selector: 'my-popup',
  template: `
    <button (click)="toggle()">{{ triggerText() }}</button>
    @if (isOpen()) {
      <div class="my-popup-content"><ng-content /></div>
    }
  `,
})
class MyPopup {
  triggerText = input('');

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }
}
```

이 컴포넌트의 최소한의 하네스는 다음과 같습니다.

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';
}
```

`ComponentHarness` 하위 클래스에서 반드시 필요한 것은 `hostSelector` 프로퍼티뿐이지만, 대부분의 하네스에는 `HarnessPredicate` 인스턴스를 생성하는 `with` 정적 메서드도 구현하는 것이 좋습니다.
자세한 내용은 [하네스 필터링하기](guide/testing/using-component-harnesses#filtering-harnesses)를 참고하세요.

<!--
## Finding elements in the component's DOM
-->

<a id="finding-elements-in-the-components-dom"></a>

## 컴포넌트 DOM에서 엘리먼트 찾기

<!--
Each instance of a `ComponentHarness` subclass represents a particular instance of the corresponding component. You can access the component's host element via the `host() `method from the `ComponentHarness` base class.

`ComponentHarness` also offers several methods for locating elements within the component's DOM. These methods are `locatorFor()`, `locatorForOptional()`, and `locatorForAll()`. These methods create functions that find elements, they do not directly find elements. This approach safeguards against caching references to out-of-date elements. For example, when an `@if` block hides and then shows an element, the result is a new DOM element; using functions ensures that tests always reference the current state of the DOM.

See the [ComponentHarness API reference page](/api/cdk/testing/ComponentHarness) for the full list details of the different `locatorFor` methods.

For example, the `MyPopupHarness` example discussed above could provide methods to get the trigger and content elements as follows:

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  // Gets the trigger element
  getTriggerElement = this.locatorFor('button');

  // Gets the content element.
  getContentElement = this.locatorForOptional('.my-popup-content');
}
```
-->

`ComponentHarness` 하위 클래스의 각 인스턴스는 해당 컴포넌트의 특정 인스턴스를 나타냅니다.
기본 클래스 `ComponentHarness`의 `host() `메서드로 컴포넌트의 호스트 엘리먼트에 접근할 수 있습니다.

`ComponentHarness`는 컴포넌트 DOM 안에서 엘리먼트를 찾는 `locatorFor()`, `locatorForOptional()`, `locatorForAll()` 메서드도 제공합니다.
이 메서드들은 엘리먼트를 직접 찾는 대신 엘리먼트를 찾는 함수를 만듭니다.
이 방식은 더 이상 유효하지 않은 엘리먼트 참조가 캐싱되는 것을 방지합니다.
예를 들어 `@if` 블록이 엘리먼트를 숨겼다가 다시 표시하면 새로운 DOM 엘리먼트가 생성됩니다.
함수를 사용하면 테스트가 항상 현재 DOM 상태를 참조할 수 있습니다.

각 `locatorFor` 메서드의 전체 목록과 자세한 내용은 [ComponentHarness API 문서](/api/cdk/testing/ComponentHarness)를 참고하세요.

앞에서 살펴본 `MyPopupHarness`에 트리거 엘리먼트와 내용 엘리먼트를 가져오는 메서드를 추가하면 다음과 같습니다.

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  // 트리거 엘리먼트를 가져옵니다
  getTriggerElement = this.locatorFor('button');

  // 내용 엘리먼트를 가져옵니다.
  getContentElement = this.locatorForOptional('.my-popup-content');
}
```

<!--
## Working with `TestElement` instances
-->

<a id="working-with-testelement-instances"></a>

## `TestElement` 인스턴스 사용하기

<!--
`TestElement` is an abstraction designed to work across different test environments (Unit tests, WebDriver, etc). When using harnesses, you should perform all DOM interaction via this interface. Other means of accessing DOM elements, such as `document.querySelector()`, do not work in all test environments.

`TestElement` has a number of methods to interact with the underlying DOM, such as `blur()`, `click()`, `getAttribute()`, and more. See the [TestElement API reference page](/api/cdk/testing/TestElement) for the full list of methods.

Do not expose `TestElement` instances to harness users unless it's an element the component consumer defines directly, such as the component's host element. Exposing `TestElement` instances for internal elements leads users to depend on a component's internal DOM structure.

Instead, provide more narrow-focused methods for specific actions the end-user may take or particular state they may observe. For example, `MyPopupHarness` from previous sections could provide methods like `toggle` and `isOpen`:

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  protected getTriggerElement = this.locatorFor('button');
  protected getContentElement = this.locatorForOptional('.my-popup-content');

  /** Toggles the open state of the popup. */
  async toggle() {
    const trigger = await this.getTriggerElement();
    return trigger.click();
  }

  /** Checks if the popup us open. */
  async isOpen() {
    const content = await this.getContentElement();
    return !!content;
  }
}
```
-->

`TestElement`는 단위 테스트, WebDriver 등 여러 테스트 환경에서 동작하도록 만든 추상화입니다.
하네스를 사용할 때는 이 인터페이스로만 DOM과 상호작용해야 합니다.
`document.querySelector()`처럼 DOM 엘리먼트에 접근하는 다른 방법은 모든 테스트 환경에서 동작하지 않습니다.

`TestElement`는 `blur()`, `click()`, `getAttribute()` 등 DOM과 상호작용하는 여러 메서드를 제공합니다.
전체 메서드는 [TestElement API 문서](/api/cdk/testing/TestElement)를 참고하세요.

컴포넌트의 호스트 엘리먼트처럼 컴포넌트 사용자가 직접 정의한 엘리먼트가 아니라면 하네스 사용자에게 `TestElement` 인스턴스를 공개하지 마세요.
내부 엘리먼트의 `TestElement` 인스턴스를 공개하면 사용자가 컴포넌트 내부 DOM 구조에 의존하게 됩니다.

대신 사용자가 수행할 특정 동작이나 확인할 특정 상태에 초점을 맞춘 메서드를 제공하세요.
예를 들어 앞에서 살펴본 `MyPopupHarness`에는 `toggle`, `isOpen` 같은 메서드를 제공할 수 있습니다.

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  protected getTriggerElement = this.locatorFor('button');
  protected getContentElement = this.locatorForOptional('.my-popup-content');

  /** 팝업의 열림 상태를 전환합니다. */
  async toggle() {
    const trigger = await this.getTriggerElement();
    return trigger.click();
  }

  /** 팝업이 열려 있는지 확인합니다. */
  async isOpen() {
    const content = await this.getContentElement();
    return !!content;
  }
}
```

<!--
## Loading harnesses for subcomponents
-->

<a id="loading-harnesses-for-subcomponents"></a>

## 하위 컴포넌트 하네스 로드하기

<!--
Larger components often compose sub-components. You can reflect this structure in a component's harness as well. Each of the `locatorFor` methods on `ComponentHarness` has an alternate signature that can be used for locating sub-harnesses rather than elements.

See the [ComponentHarness API reference page](/api/cdk/testing/ComponentHarness) for the full list of the different locatorFor methods.

For example, consider a menu build using the popup from above:

```ts
@Directive({
  selector: 'my-menu-item',
})
class MyMenuItem {}

@Component({
  selector: 'my-menu',
  template: `
    <my-popup>
      <ng-content />
    </my-popup>
  `,
})
class MyMenu {
  triggerText = input('');

  items = contentChildren(MyMenuItem);
}
```

The harness for `MyMenu` can then take advantage of other harnesses for `MyPopup` and `MyMenuItem`:

```ts
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  protected getPopupHarness = this.locatorFor(MyPopupHarness);

  /** Gets the currently shown menu items (empty list if menu is closed). */
  getItems = this.locatorForAll(MyMenuItemHarness);

  /** Toggles open state of the menu. */
  async toggle() {
    const popupHarness = await this.getPopupHarness();
    return popupHarness.toggle();
  }
}

class MyMenuItemHarness extends ComponentHarness {
  static hostSelector = 'my-menu-item';
}
```
-->

큰 컴포넌트는 여러 하위 컴포넌트로 구성되는 경우가 많습니다.
컴포넌트 하네스에도 이 구조를 반영할 수 있습니다.
`ComponentHarness`의 각 `locatorFor` 메서드는 엘리먼트 대신 하위 하네스를 찾는 시그니처도 제공합니다.

각 locatorFor 메서드의 전체 목록은 [ComponentHarness API 문서](/api/cdk/testing/ComponentHarness)를 참고하세요.

위에서 살펴본 팝업으로 메뉴를 구성한 예제를 보겠습니다.

```ts
@Directive({
  selector: 'my-menu-item',
})
class MyMenuItem {}

@Component({
  selector: 'my-menu',
  template: `
    <my-popup>
      <ng-content />
    </my-popup>
  `,
})
class MyMenu {
  triggerText = input('');

  items = contentChildren(MyMenuItem);
}
```

그러면 `MyMenu` 하네스는 `MyPopup`, `MyMenuItem`의 하네스를 활용할 수 있습니다.

```ts
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  protected getPopupHarness = this.locatorFor(MyPopupHarness);

  /** 현재 표시된 메뉴 항목을 가져옵니다. 메뉴가 닫혀 있으면 빈 목록을 반환합니다. */
  getItems = this.locatorForAll(MyMenuItemHarness);

  /** 메뉴의 열림 상태를 전환합니다. */
  async toggle() {
    const popupHarness = await this.getPopupHarness();
    return popupHarness.toggle();
  }
}

class MyMenuItemHarness extends ComponentHarness {
  static hostSelector = 'my-menu-item';
}
```

<!--
## Filtering harness instances with `HarnessPredicate`
-->

<a id="filtering-harness-instances-with-harnesspredicate"></a>

## `HarnessPredicate`로 하네스 인스턴스 필터링하기

<!--
When a page contains multiple instances of a particular component, you may want to filter based on some property of the component to get a particular component instance. For example, you may want a button with some specific text, or a menu with a specific ID. The `HarnessPredicate` class can capture criteria like this for a `ComponentHarness` subclass. While the test author is able to construct `HarnessPredicate` instances manually, it's easier when the `ComponentHarness` subclass provides a helper method to construct predicates for common filters.

You should create a static `with()` method on each `ComponentHarness` subclass that returns a `HarnessPredicate` for that class. This allows test authors to write easily understandable code, e.g. `loader.getHarness(MyMenuHarness.with({selector: '#menu1'}))`. In addition to the standard selector and ancestor options, the `with` method should add any other options that make sense for the particular subclass.

Harnesses that need to add additional options should extend the `BaseHarnessFilters` interface and additional optional properties as needed. `HarnessPredicate` provides several convenience methods for adding options: `stringMatches()`, `addOption()`, and `add()`. See the [HarnessPredicate API page](/api/cdk/testing/HarnessPredicate) for the full description.

For example, when working with a menu it is useful to filter based on trigger text and to filter menu items based on their text:

```ts
interface MyMenuHarnessFilters extends BaseHarnessFilters {
  /** Filters based on the trigger text for the menu. */
  triggerText?: string | RegExp;
}

interface MyMenuItemHarnessFilters extends BaseHarnessFilters {
  /** Filters based on the text of the menu item. */
  text?: string | RegExp;
}

class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  /** Creates a `HarnessPredicate` used to locate a particular `MyMenuHarness`. */
  static with(options: MyMenuHarnessFilters): HarnessPredicate<MyMenuHarness> {
    return new HarnessPredicate(MyMenuHarness, options).addOption(
      'trigger text',
      options.triggerText,
      (harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text),
    );
  }

  protected getPopupHarness = this.locatorFor(MyPopupHarness);

  /** Gets the text of the menu trigger. */
  async getTriggerText(): Promise<string> {
    const popupHarness = await this.getPopupHarness();
    return popupHarness.getTriggerText();
  }
}

class MyMenuItemHarness extends ComponentHarness {
  static hostSelector = 'my-menu-item';

  /** Creates a `HarnessPredicate` used to locate a particular `MyMenuItemHarness`. */
  static with(options: MyMenuItemHarnessFilters): HarnessPredicate<MyMenuItemHarness> {
    return new HarnessPredicate(MyMenuItemHarness, options).addOption(
      'text',
      options.text,
      (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text),
    );
  }

  /** Gets the text of the menu item. */
  async getText(): Promise<string> {
    const host = await this.host();
    return host.text();
  }
}
```

You can pass a `HarnessPredicate` instead of a `ComponentHarness` class to any of the APIs on `HarnessLoader`, `LocatorFactory`, or `ComponentHarness`. This allows test authors to easily target a particular component instance when creating a harness instance. It also allows the harness author to leverage the same `HarnessPredicate` to enable more powerful APIs on their harness class. For example, consider the `getItems` method on the `MyMenuHarness` shown above. Adding a filtering API allows users of the harness to search for particular menu items:

```ts
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  /** Gets a list of items in the menu, optionally filtered based on the given criteria. */
  async getItems(filters: MyMenuItemHarnessFilters = {}): Promise<MyMenuItemHarness[]> {
    const getFilteredItems = this.locatorForAll(MyMenuItemHarness.with(filters));
    return getFilteredItems();
  }
  ...
}
```
-->

페이지에 같은 컴포넌트의 인스턴스가 여러 개 있으면 컴포넌트 프로퍼티로 필터링해서 특정 인스턴스를 가져와야 할 수 있습니다.
특정 텍스트가 있는 버튼이나 특정 ID를 가진 메뉴를 찾는 경우가 예입니다.
`HarnessPredicate` 클래스는 `ComponentHarness` 하위 클래스에 이런 조건을 지정할 수 있습니다.
테스트 작성자가 `HarnessPredicate` 인스턴스를 직접 만들 수도 있지만, `ComponentHarness` 하위 클래스에서 자주 사용하는 필터의 조건식을 생성하는 헬퍼 메서드를 제공하면 더 편리합니다.

각 `ComponentHarness` 하위 클래스에 해당 클래스의 `HarnessPredicate`를 반환하는 `with()` 정적 메서드를 만드세요.
그러면 테스트 작성자는 `loader.getHarness(MyMenuHarness.with({selector: '#menu1'}))`처럼 이해하기 쉬운 코드를 작성할 수 있습니다.
`with` 메서드에는 기본 selector, ancestor 옵션 외에도 해당 하위 클래스에 유용한 옵션을 추가하는 것이 좋습니다.

옵션을 추가해야 하는 하네스는 `BaseHarnessFilters` 인터페이스를 상속하고 필요한 선택적 프로퍼티를 추가하세요.
`HarnessPredicate`는 `stringMatches()`, `addOption()`, `add()`처럼 옵션 추가를 돕는 메서드를 제공합니다.
자세한 내용은 [HarnessPredicate API 문서](/api/cdk/testing/HarnessPredicate)를 참고하세요.

예를 들어 메뉴를 다룰 때는 트리거 텍스트로 메뉴를 필터링하고, 항목의 텍스트로 메뉴 항목을 필터링하면 유용합니다.

```ts
interface MyMenuHarnessFilters extends BaseHarnessFilters {
  /** 메뉴의 트리거 텍스트로 필터링합니다. */
  triggerText?: string | RegExp;
}

interface MyMenuItemHarnessFilters extends BaseHarnessFilters {
  /** 메뉴 항목의 텍스트로 필터링합니다. */
  text?: string | RegExp;
}

class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  /** 특정 `MyMenuHarness`를 찾는 `HarnessPredicate`를 생성합니다. */
  static with(options: MyMenuHarnessFilters): HarnessPredicate<MyMenuHarness> {
    return new HarnessPredicate(MyMenuHarness, options).addOption(
      'trigger text',
      options.triggerText,
      (harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text),
    );
  }

  protected getPopupHarness = this.locatorFor(MyPopupHarness);

  /** 메뉴 트리거의 텍스트를 가져옵니다. */
  async getTriggerText(): Promise<string> {
    const popupHarness = await this.getPopupHarness();
    return popupHarness.getTriggerText();
  }
}

class MyMenuItemHarness extends ComponentHarness {
  static hostSelector = 'my-menu-item';

  /** 특정 `MyMenuItemHarness`를 찾는 `HarnessPredicate`를 생성합니다. */
  static with(options: MyMenuItemHarnessFilters): HarnessPredicate<MyMenuItemHarness> {
    return new HarnessPredicate(MyMenuItemHarness, options).addOption(
      'text',
      options.text,
      (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text),
    );
  }

  /** 메뉴 항목의 텍스트를 가져옵니다. */
  async getText(): Promise<string> {
    const host = await this.host();
    return host.text();
  }
}
```

`HarnessLoader`, `LocatorFactory`, `ComponentHarness`의 모든 API에 `ComponentHarness` 클래스 대신 `HarnessPredicate`를 전달할 수 있습니다.
따라서 테스트 작성자는 특정 컴포넌트 인스턴스를 대상으로 하네스 인스턴스를 쉽게 생성할 수 있습니다.
하네스 작성자도 같은 `HarnessPredicate`를 활용해서 하네스 클래스에 더 강력한 API를 제공할 수 있습니다.
앞의 `MyMenuHarness`에 있는 `getItems` 메서드를 예로 살펴봅시다.
필터 API를 추가하면 하네스 사용자가 특정 메뉴 항목을 검색할 수 있습니다.

```ts
class MyMenuHarness extends ComponentHarness {
  static hostSelector = 'my-menu';

  /** 메뉴 항목 목록을 가져옵니다. 선택적으로 주어진 조건에 따라 필터링합니다. */
  async getItems(filters: MyMenuItemHarnessFilters = {}): Promise<MyMenuItemHarness[]> {
    const getFilteredItems = this.locatorForAll(MyMenuItemHarness.with(filters));
    return getFilteredItems();
  }
  ...
}
```

<!--
## Creating `HarnessLoader` for elements that use content projection
-->

<a id="creating-harnessloader-for-elements-that-use-content-projection"></a>

## 콘텐츠 프로젝션을 사용하는 엘리먼트의 `HarnessLoader` 만들기

<!--
Some components project additional content into the component's template. See the [content projection guide](guide/components/content-projection) for more information.

Add a `HarnessLoader` instance scoped to the element containing the `<ng-content>` when you create a harness for a component that uses content projection. This allows the user of the harness to load additional harnesses for whatever components were passed in as content. `ComponentHarness` has several methods that can be used to create HarnessLoader instances for cases like this: `harnessLoaderFor()`, `harnessLoaderForOptional()`, `harnessLoaderForAll()`. See the [HarnessLoader interface API reference page](/api/cdk/testing/HarnessLoader) for more details.

For example, the `MyPopupHarness` example from above can extend `ContentContainerComponentHarness` to add support to load harnesses within the `<ng-content>` of the component.

```ts
class MyPopupHarness extends ContentContainerComponentHarness<string> {
  static hostSelector = 'my-popup';
}
```
-->

일부 컴포넌트는 추가 콘텐츠를 컴포넌트 템플릿 안에 투영합니다.
자세한 내용은 [콘텐츠 프로젝션](guide/components/content-projection) 문서를 참고하세요.

콘텐츠 프로젝션을 사용하는 컴포넌트의 하네스를 만들 때는 `<ng-content>`가 포함된 엘리먼트를 범위로 하는 `HarnessLoader` 인스턴스를 추가하세요.
그러면 하네스 사용자는 콘텐츠로 전달한 컴포넌트의 하네스도 로드할 수 있습니다.
`ComponentHarness`는 이런 경우에 HarnessLoader 인스턴스를 만드는 `harnessLoaderFor()`, `harnessLoaderForOptional()`, `harnessLoaderForAll()` 메서드를 제공합니다.
자세한 내용은 [HarnessLoader 인터페이스 API 문서](/api/cdk/testing/HarnessLoader)를 참고하세요.

예를 들어 앞의 `MyPopupHarness`가 `ContentContainerComponentHarness`를 상속하면 컴포넌트의 `<ng-content>` 안에 있는 하네스를 로드하도록 지원할 수 있습니다.

```ts
class MyPopupHarness extends ContentContainerComponentHarness<string> {
  static hostSelector = 'my-popup';
}
```

<!--
## Accessing elements outside of the component's host element
-->

<a id="accessing-elements-outside-of-the-components-host-element"></a>

## 컴포넌트 호스트 엘리먼트 바깥에 접근하기

<!--
There are times when a component harness might need to access elements outside of its corresponding component's host element. For example, code that displays a floating element or pop-up often attaches DOM elements directly to the document body, such as the `Overlay` service in Angular CDK.

In this case, `ComponentHarness` provides a method that can be used to get a `LocatorFactory` for the root element of the document. The `LocatorFactory` supports most of the same APIs as the `ComponentHarness` base class, and can then be used to query relative to the document's root element.

Consider if the `MyPopup` component above used the CDK overlay for the popup content, rather than an element in its own template. In this case, `MyPopupHarness` would have to access the content element via `documentRootLocatorFactory()` method that gets a locator factory rooted at the document root.

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  /** Gets a `HarnessLoader` whose root element is the popup's content element. */
  async getHarnessLoaderForContent(): Promise<HarnessLoader> {
    const rootLocator = this.documentRootLocatorFactory();
    return rootLocator.harnessLoaderFor('my-popup-content');
  }
}
```
-->

컴포넌트 하네스가 해당 컴포넌트의 호스트 엘리먼트 바깥에 접근해야 할 때도 있습니다.
예를 들어 떠 있는 엘리먼트나 팝업을 표시하는 코드는 DOM 엘리먼트를 문서의 body에 직접 추가하는 경우가 많습니다.
Angular CDK의 `Overlay` 서비스가 이에 해당합니다.

이런 경우를 위해 `ComponentHarness`는 문서의 최상위 엘리먼트에 대한 `LocatorFactory`를 가져오는 메서드를 제공합니다.
`LocatorFactory`는 기본 클래스 `ComponentHarness`와 거의 같은 API를 지원하며, 문서의 최상위 엘리먼트를 기준으로 쿼리할 수 있습니다.

위의 `MyPopup` 컴포넌트가 자체 템플릿의 엘리먼트 대신 CDK 오버레이로 팝업 내용을 표시한다고 가정해 봅시다.
이 경우 `MyPopupHarness`는 문서 최상위를 기준으로 하는 로케이터 팩토리를 가져오는 `documentRootLocatorFactory()` 메서드로 내용 엘리먼트에 접근해야 합니다.

```ts
class MyPopupHarness extends ComponentHarness {
  static hostSelector = 'my-popup';

  /** 팝업의 내용 엘리먼트를 최상위로 하는 `HarnessLoader`를 가져옵니다. */
  async getHarnessLoaderForContent(): Promise<HarnessLoader> {
    const rootLocator = this.documentRootLocatorFactory();
    return rootLocator.harnessLoaderFor('my-popup-content');
  }
}
```

<!--
## Waiting for asynchronous tasks
-->

<a id="waiting-for-asynchronous-tasks"></a>

## 비동기 작업 기다리기

<!--
The methods on `TestElement` automatically trigger Angular's change detection and wait for tasks inside the `NgZone`. In most cases no special effort is required for harness authors to wait on asynchronous tasks. However, there are some edge cases where this may not be sufficient.

Under some circumstances, Angular animations may require a second cycle of change detection and subsequent `NgZone` stabilization before animation events are fully flushed. In cases where this is needed, the `ComponentHarness` offers a `forceStabilize()` method that can be called to do the second round.

You can use `NgZone.runOutsideAngular()` to schedule tasks outside of NgZone. Call the `waitForTasksOutsideAngular()` method on the corresponding harness if you need to explicitly wait for tasks outside `NgZone` since this does not happen automatically.
-->

`TestElement`의 메서드는 Angular 변경 감지를 자동으로 실행하고 `NgZone` 안의 작업을 기다립니다.
대부분의 경우 하네스 작성자가 비동기 작업을 기다리기 위해 별도로 처리할 것은 없습니다.
하지만 이것만으로 부족한 예외적인 경우도 있습니다.

상황에 따라 Angular 애니메이션 이벤트를 모두 처리하려면 변경 감지를 한 번 더 실행하고 이후 `NgZone` 안정화까지 기다려야 할 수 있습니다.
이런 경우에는 `ComponentHarness`의 `forceStabilize()` 메서드로 두 번째 과정을 실행할 수 있습니다.

`NgZone.runOutsideAngular()`로 NgZone 바깥에 작업을 예약할 수도 있습니다.
`NgZone` 바깥의 작업은 자동으로 기다리지 않으므로, 명시적으로 기다려야 한다면 해당 하네스의 `waitForTasksOutsideAngular()` 메서드를 실행하세요.
