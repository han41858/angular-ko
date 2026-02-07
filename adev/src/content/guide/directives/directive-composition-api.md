<!--
# Directive composition API
-->

# 디렉티브 조합 API

<!--
Angular directives offer a great way to encapsulate reusable behaviors— directives can apply
attributes, CSS classes, and event listeners to an element.

The _directive composition API_ lets you apply directives to a component's host element from
_within_ the component TypeScript class.
-->

Angular 디렉티브는 재사용을 염두에 두고 캡슐화되어 설계되었습니다.
디렉티브는 어트리뷰트, CSS 클래스, 이벤트 리스너에 적용할 수 있습니다.

_디렉티브 조합 API_ 를 활용하면 컴포넌트 TypeScript 클래스 _안에서_ 컴포넌트 호스트 엘리먼트에 디렉티브를 적용할 수 있습니다.

<!--
## Adding directives to a component
-->

## 컴포넌트에 디렉티브 추가하기

<!--
You apply directives to a component by adding a `hostDirectives` property to a component's
decorator. We call such directives _host directives_.

In this example, we apply the directive `MenuBehavior` to the host element of `AdminMenu`. This
works similarly to applying the `MenuBehavior` to the `<admin-menu>` element in a template.

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

When the framework renders a component, Angular also creates an instance of each host directive. The
directives' host bindings apply to the component's host element. By default, host directive inputs
and outputs are not exposed as part of the component's public API. See
[Including inputs and outputs](#including-inputs-and-outputs) below for more information.

**Angular applies host directives statically at compile time.** You cannot dynamically add
directives at runtime.

**Directives used in `hostDirectives` may not specify `standalone: false`.**

**Angular ignores the `selector` of directives applied in the `hostDirectives` property.**
-->

컴포넌트 데코레이터에 `hostDirective` 프로퍼티를 추가하면 적용할 수 있습니다.
이렇게 사용하는 디렉티브를 _호스트 디렉티브(host directive)_ 라고 합니다.

위 예제에서는 `MenuBehavior` 디렉티브를 `AminMenu`의 호스트 엘리먼트에 적용했습니다.
이 방식은 템플릿에서 `<admin-menu>` 엘리먼트에 `MenuBehavior` 디렉티브를 적용한 것과 같은 효과입니다.

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

프레임워크가 컴포넌트를 렌더링 할 때 Angular는 호스트 디렉티브마다 각각 인스턴스를 생성합니다.
그리고 이 디렉티브는 컴포넌트의 호스트 엘리먼트에 호스트 바인딩됩니다.
기본적으로 호스트 디렉티브의 입출력 프로퍼티는 컴포넌트 public API처럼 컴포넌트 밖으로 노출되지 않습니다.
자세한 내용은 아래 [입출력 프로퍼티 지정하기](#입출력-프로퍼티-지정하기) 섹션을 참고하세요.

**호스트 디렉티브는 컴파일 시점에 정적으로 적용됩니다.**
실행 시점에는 디렉티브를 동적으로 적용할 수 없습니다.

**`hostDirectives`에 사용된 디렉티브는 `standalone: false` 여야 합니다.**

**`hostDirectives` 프로퍼티에 적용된 디렉티브의 `selector`는 무시합니다.**

<!--
## Including inputs and outputs
-->

## 입출력 프로퍼티 지정하기

<!--
When you apply `hostDirectives` to your component, the inputs and outputs from the host directives
are not included in your component's API by default. You can explicitly include inputs and outputs
in your component's API by expanding the entry in `hostDirectives`:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId'],
    outputs: ['menuClosed'],
  }],
})
export class AdminMenu { }
```

By explicitly specifying the inputs and outputs, consumers of the component with `hostDirective` can
bind them in a template:

```angular-html

<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

Furthermore, you can alias inputs and outputs from `hostDirective` to customize the API of your
component:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
  }],
})
export class AdminMenu { }
```

```angular-html

<admin-menu id="top-menu" (closed)="logMenuClosed()">
```
-->

컴포넌트에 `hostDirectives`를 적용하더라도 호스트 디렉티브의 입출력 프로퍼티는 컴포넌트 API에 기본으로 포함되지 않습니다.
그렇다면 `hostDirectives` 설정을 변경해서 디렉티브의 입출력 프로퍼티를 컴포넌트 API에 등록해야 합니다:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId'],
    outputs: ['menuClosed'],
  }],
})
export class AdminMenu { }
```

입출력 프로퍼티를 등록하고 나면 템플릿에서 이렇게 사용할 수 있습니다:

```angular-html

<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

그리고 `hostDirective`에 입출력 프로퍼티를 등록할 때 별칭을 지정할 수도 있습니다:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
  }],
})
export class AdminMenu { }
```

```angular-html

<admin-menu id="top-menu" (closed)="logMenuClosed()">
```

<!--
## Adding directives to another directive
-->

## 디렉티브를 다른 디렉티브에 적용하기

<!--
You can also add `hostDirectives` to other directives, in addition to components. This enables the
transitive aggregation of multiple behaviors.

In the following example, we define two directives, `Menu` and `Tooltip`. We then compose the behavior
of these two directives in `MenuWithTooltip`. Finally, we apply `MenuWithTooltip`
to `SpecializedMenuWithTooltip`.

When `SpecializedMenuWithTooltip` is used in a template, it creates instances of all of `Menu`
, `Tooltip`, and `MenuWithTooltip`. Each of these directives' host bindings apply to the host
element of `SpecializedMenuWithTooltip`.

```typescript
@Directive({...})
export class Menu { }

@Directive({...})
export class Tooltip { }

// MenuWithTooltip can compose behaviors from multiple other directives
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

// CustomWidget can apply the already-composed behaviors from MenuWithTooltip
@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```
-->

컴포넌트뿐 아니라 다른 디렉티브에서 `hostDirectives`를 활용할 수도 있습니다.
이 방식을 활용하면 디렉티브 여러개를 한 번에 적용할 수 있습니다.

아래 예제에는 `Menu` 디렉티브와 `Tooltip` 디렉티브가 있습니다.
두 디렉티브를 `MenuWithTooltip` 디렉티브로 합쳐봅시다.
그리고 최종적으로는 `MenuWithTooltip`을 `SpecializedMenuWithTooltip`에 적용해 봅시다.

템플릿에 `SpecializedMenuWithTooltip`에 사용되면 Angular는 `Menu`, `Tooltip`, `MenuWithTooltip` 인스턴스가 각각 생성됩니다.
그리고나면 이 디렉티브들이 각각 `SpecializedMenuWithTooltip` 호스트 엘리먼트에 적용됩니다.

```typescript
@Directive({...})
export class Menu { }

@Directive({...})
export class Tooltip { }

// MenuWithTooltip은 디렉티브 여러 개를 결합하는 디렉티브입니다.
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

// 디렉티브가 결합된 MenuWithToolTip을 최종 목적지에 적용합니다.
@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```

<!--
## Host directive semantics
-->

## 호스트 디렉티브 활용

<!--
### Directive execution order
-->

### 디렉티브 실행 순서

<!--
Host directives go through the same lifecycle as components and directives used directly in a
template. However, host directives always execute their constructor, lifecycle hooks, and bindings _before_ the component or directive on which they are applied.

The following example shows minimal use of a host directive:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

The order of execution here is:

1. `MenuBehavior` instantiated
2. `AdminMenu` instantiated
3. `MenuBehavior` receives inputs (`ngOnInit`)
4. `AdminMenu` receives inputs (`ngOnInit`)
5. `MenuBehavior` applies host bindings
6. `AdminMenu` applies host bindings

This order of operations means that components with `hostDirectives` can override any host bindings
specified by a host directive.

This order of operations extends to nested chains of host directives, as shown in the following
example.

```typescript
@Directive({...})
export class Tooltip { }

@Directive({
  hostDirectives: [Tooltip],
})
export class CustomTooltip { }

@Directive({
  hostDirectives: [CustomTooltip],
})
export class EvenMoreCustomTooltip { }
```

In the example above, the order of execution is:

1. `Tooltip` instantiated
2. `CustomTooltip` instantiated
3. `EvenMoreCustomTooltip` instantiated
4. `Tooltip` receives inputs (`ngOnInit`)
5. `CustomTooltip` receives inputs (`ngOnInit`)
6. `EvenMoreCustomTooltip` receives inputs (`ngOnInit`)
7. `Tooltip` applies host bindings
8. `CustomTooltip` applies host bindings
9. `EvenMoreCustomTooltip` applies host bindings
-->

템플릿에 직접 사용된 호스트 디렉티브는 컴포넌트나 디렉티브와 동일한 라이프싸이클을 갖습니다.
하지만 호스트 디렉티브도 클래스 생성자와 라이프싸이클 후킹 함수가 실행되는데, 이 동작은 컴포넌트나 디렉티브에 바인딩되기 _전에_ 실행됩니다.

예제를 보며 확인해 봅시다:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

위 코드는 아래 순서대로 실행됩니다:

1. `MenuBehavior` 인스턴스가 생성됩니다.
2. `AdminMenu` 인스턴스가 생성됩니다.
3. `MenuBehavior` 가 입력 프로퍼티로 입력을 받습니다. (`ngOnInit`)
4. `AdminMenu` 가 입력 프로퍼티로 입력을 받습니다. (`ngOnInit`)
5. `MenuBehavior` 호스트 바인딩이 적용됩니다.
6. `AdminMenu` 호스트 바인딩이 적용됩니다.

실행 순서가 이렇기 때문에, 컴포넌트에 지정한 `hostDirectives`는 바인딩되는 호스트 디렉티브에 의해 오버라이드 될 수 있습니다.

디렉티브 적용이 중첩된 경우도 방식은 같습니다.

```typescript
@Directive({...})
export class Tooltip { }

@Directive({
  hostDirectives: [Tooltip],
})
export class CustomTooltip { }

@Directive({
  hostDirectives: [CustomTooltip],
})
export class EvenMoreCustomTooltip { }
```

위 코드는 아래 순서대로 실행됩니다:

1. `Tooltip` 인스턴스가 생성됩니다.
2. `CustomTooltip` 인스턴스가 생성됩니다.
3. `EvenMoreCustomTooltip` 인스턴스가 생성됩니다.
4. `Tooltip` 가 입력 프로퍼티로 입력을 받습니다. (`ngOnInit`)
5. `CustomTooltip` 가 입력 프로퍼티로 입력을 받습니다. (`ngOnInit`)
6. `EvenMoreCustomTooltip` 가 입력 프로퍼티로 입력을 받습니다. (`ngOnInit`)
7. `Tooltip` 호스트 바인딩이 적용됩니다.
8. `CustomTooltip` 호스트 바인딩이 적용됩니다.
9. `EvenMoreCustomTooltip` 호스트 바인딩이 적용됩니다.

<!--
### Dependency injection
-->

### 의존성 주입

<!--
A component or directive that specifies `hostDirectives` can inject the instances of those host
directives and vice versa.

When applying host directives to a component, both the component and host directives can define
providers.

If a component or directive with `hostDirectives` and those host directives both provide the same
injection token, the providers defined by class with `hostDirectives` take precedence over providers
defined by the host directives.
-->

`hostDirectives`를 지정하는 컴포넌트나 디렉티브는 호스트 디렉티브를 의존성으로 주입받아 참조할 수 있으며, 반대 경우도 마찬가지입니다.

호스트 디렉티브를 컴포넌트에 적용할 때 컴포넌트나 호스트 디렉티브 양쪽에서 프로바이더를 등록할 수 있습니다.

`hostDirectives`를 지정한 컴포넌트나 디렉티브, 그리고 호스트 디렉티브가 같은 의존성 토큰을 등록하는 경우에는, 호스트 디렉티브 프로바이더보다 `hostDirectives`를 지정한 클래스의 프로바이더 우선순위가 더 높습니다.
