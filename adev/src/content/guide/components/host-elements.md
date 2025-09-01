<!--
# Component host elements
-->
# 컴포넌트 호스트 엘리먼트

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Angular creates an instance of a component for every HTML element that matches the component's
selector. The DOM element that matches a component's selector is that component's **host element**.
The contents of a component's template are rendered inside its host element.

```angular-ts
// Component source
@Component({
  selector: 'profile-photo',
  template: `
    <img src="profile-photo.jpg" alt="Your profile photo" />
  `,
})
export class ProfilePhoto {}
```

```angular-html
<!- Using the component ->
<h3>Your profile photo</h3>
<profile-photo />
<button>Upload a new profile photo</button>
```

```angular-html
<!- Rendered DOM ->
<h3>Your profile photo</h3>
<profile-photo>
  <img src="profile-photo.jpg" alt="Your profile photo" />
</profile-photo>
<button>Upload a new profile photo</button>
```

In the above example, `<profile-photo>` is the host element of the `ProfilePhoto` component.
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트 셀렉터와 매칭되는 HTML 엘리먼트마다 컴포넌트 인스턴스가 생성됩니다.
이 때 컴포넌트 셀렉터와 매칭된 DOM 엘리먼트를 **호스트 엘리먼트(host element)** 라고 합니다.
컴포넌트 템플릿은 호스트 엘리먼트 안에 렌더링된다고 이해하면 됩니다.

```angular-ts
// 컴포넌트 코드
@Component({
  selector: 'profile-photo',
  template: `
    <img src="profile-photo.jpg" alt="Your profile photo" />
  `,
})
export class ProfilePhoto {}
```

```angular-html
<!-- 컴포넌트 사용 코드 -->
<h3>Your profile photo</h3>
<profile-photo />
<button>Upload a new profile photo</button>
```

```angular-html
<!-- 렌더링 된 DOM -->
<h3>Your profile photo</h3>
<profile-photo>
  <img src="profile-photo.jpg" alt="Your profile photo" />
</profile-photo>
<button>Upload a new profile photo</button>
```

위 예제에서 `ProfilePhoto` 컴포넌트의 호스트 엘리먼트는 `<profile-photo>` 입니다.


<!--
## Binding to the host element
-->
## 호스트 엘리먼트 바인딩하기

<!--
A component can bind properties, attributes, and events to its host element.
This behaves identically to bindings on elements inside the component's template, but instead defined with the `host` property in the `@Component` decorator:

```angular-ts
@Component({
  ...,
  host: {
    'role': 'slider',
    '[attr.aria-valuenow]': 'value',
    '[class.active]': 'isActive()',
    '[tabIndex]': 'disabled ? -1 : 0',
    '(keydown)': 'updateValue($event)',
  },
})
export class CustomSlider {
  value: number = 0;
  disabled: boolean = false;
  isActive = signal(false);
  updateValue(event: KeyboardEvent) { /* ... */ }

  /* ... */
}
```
-->
컴포넌트는 프로퍼티나 어트리뷰트, 이벤트를 호스트 엘리먼트와 바인딩할 수 있습니다.
이 바인딩은 컴포넌트 템플릿의 엘리먼트에서 바인딩해도 되지만, `@Component` 데코레이터의 `host` 프로퍼티를 활용할 수도 있습니다.:

```angular-ts
@Component({
  ...,
  host: {
    'role': 'slider',
    '[attr.aria-valuenow]': 'value',
    '[class.active]': 'isActive()',
    '[tabIndex]': 'disabled ? -1 : 0',
    '(keydown)': 'updateValue($event)',
  },
})
export class CustomSlider {
  value: number = 0;
  disabled: boolean = false;
  isActive = signal(false);
  updateValue(event: KeyboardEvent) { /* ... */ }

  /* ... */
}
```


<!--
## The `@HostBinding` and `@HostListener` decorators
-->
## `@HostBinding`, `@HostListener` 데코레이터

<!--
You can alternatively bind to the host element by applying the `@HostBinding` and `@HostListener`
decorator to class members.

`@HostBinding` lets you bind host properties and attributes to properties and methods:

```angular-ts
@Component({
  /* ... */
})
export class CustomSlider {
  @HostBinding('attr.aria-valuenow')
  value: number = 0;

  @HostBinding('tabIndex')
  getTabIndex() {
    return this.disabled ? -1 : 0;
  }

  /* ... */
}
```

`@HostListener` lets you bind event listeners to the host element. The decorator accepts an event
name and an optional array of arguments:

```ts
export class CustomSlider {
  @HostListener('keydown', ['$event'])
  updateValue(event: KeyboardEvent) {
    /* ... */
  }
}
```

**Always prefer using the `host` property over `@HostBinding` and `@HostListener`.** These
decorators exist exclusively for backwards compatibility.
-->
`@HostBinding` 이나 `@HostListener` 데코레이터를 사용해서 호스트 엘리먼트와 클래스 멤버를 바인딩하는 방법도 있습니다.

`@HostBinding` 을 사용하면 호스트 엘리먼트의 프로퍼티를 클래스 프로퍼티와 바인딩하거나, 호스트 엘리먼트의 어트리뷰트를 메서드와 바인딩 할 수 있습니다:

```angular-ts
@Component({
  /* ... */
})
export class CustomSlider {
  @HostBinding('attr.aria-valuenow')
  value: number = 0;

  @HostBinding('tabIndex')
  getTabIndex() {
    return this.disabled ? -1 : 0;
  }

  /* ... */
}
```

그리고 `@HostListener` 를 사용하면 호스트 엘리먼트와 이벤트 리스너를 바인딩할 수 있습니다.
이 데코레이터는 이벤트 이름을 인자로 받고, 인자 배열을 옵션 인자로 받습니다:

```ts
export class CustomSlider {
  @HostListener('keydown', ['$event'])
  updateValue(event: KeyboardEvent) {
    /* ... */
  }
}
```

`@HostBinding` 이나 `@HostListener` 보다는 `host` 프로퍼티를 사용하세요.
이 데코레이터들은 이전 버전과 호환성을 유지하기 위해 사용됩니다.


<!--
## Binding collisions
-->
## 바인딩 우선순위

<!--
When you use a component in a template, you can add bindings to that component instance's element.
The component may _also_ define host bindings for the same properties or attributes.

```angular-ts
@Component({
  ...,
  host: {
    'role': 'presentation',
    '[id]': 'id',
  }
})
export class ProfilePhoto { /* ... */ }
```

```angular-html
<profile-photo role="group" [id]="otherId" />
```

In cases like this, the following rules determine which value wins:

- If both values are static, the instance binding wins.
- If one value is static and the other dynamic, the dynamic value wins.
- If both values are dynamic, the component's host binding wins.
-->
템플릿에 컴포넌트를 사용할 때 컴포넌트 인스턴스와 엘리먼트를 바인딩할 수 있습니다.
그런데 컴포넌트는 같은 프로퍼티나 어트리뷰트에 대해 호스트 바인딩을 정의할 수도 있습니다.

```angular-ts
@Component({
  ...,
  host: {
    'role': 'presentation',
    '[id]': 'id',
  }
})
export class ProfilePhoto { /* ... */ }
```

```angular-html
<profile-photo role="group" [id]="otherId" />
```

이 경우, 다음 규칙에 따라 어떤 값이 사용되는지 결정됩니다:

- 두 값이 모두 정적이면 인스턴스 바인딩의 우선순위가 높습니다.
- 한 값은 정적이고 다른 값은 동적이면, 동적인 값이 사용됩니다.
- 두 값이 모두 동적이면, 컴포넌트 호스트 바인딩의 우선순위가 높습니다.