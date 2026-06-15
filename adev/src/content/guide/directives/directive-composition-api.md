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
  templateUrl: './admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu {}
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
  templateUrl: './admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu {}
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
  templateUrl: './admin-menu.html',
  hostDirectives: [
    {
      directive: MenuBehavior,
      inputs: ['menuId'],
      outputs: ['menuClosed'],
    },
  ],
})
export class AdminMenu {}
```

By explicitly specifying the inputs and outputs, consumers of the component with `hostDirective` can
bind them in a template:

```angular-html
<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()"></admin-menu>
```

Furthermore, you can alias inputs and outputs from `hostDirective` to customize the API of your
component:

```typescript
@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.html',
  hostDirectives: [
    {
      directive: MenuBehavior,
      inputs: ['menuId: id'],
      outputs: ['menuClosed: closed'],
    },
  ],
})
export class AdminMenu {}
```

```angular-html
<admin-menu id="top-menu" (closed)="logMenuClosed()"></admin-menu>
```
-->

컴포넌트에 `hostDirectives`를 적용하더라도 호스트 디렉티브의 입출력 프로퍼티는 컴포넌트 API에 기본으로 포함되지 않습니다.
그렇다면 `hostDirectives` 설정을 변경해서 디렉티브의 입출력 프로퍼티를 컴포넌트 API에 등록해야 합니다:

```typescript
@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.html',
  hostDirectives: [
    {
      directive: MenuBehavior,
      inputs: ['menuId'],
      outputs: ['menuClosed'],
    },
  ],
})
export class AdminMenu {}
```

입출력 프로퍼티를 등록하고 나면 템플릿에서 이렇게 사용할 수 있습니다:

```angular-html
<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()"></admin-menu>
```

그리고 `hostDirective`에 입출력 프로퍼티를 등록할 때 별칭을 지정할 수도 있습니다:

```typescript
@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.html',
  hostDirectives: [
    {
      directive: MenuBehavior,
      inputs: ['menuId: id'],
      outputs: ['menuClosed: closed'],
    },
  ],
})
export class AdminMenu {}
```

```angular-html
<admin-menu id="top-menu" (closed)="logMenuClosed()"></admin-menu>
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

```ts
@Directive({
  /* ... */
})
export class Menu {}

@Directive({
  /* ... */
})
export class Tooltip {}

// MenuWithTooltip can compose behaviors from multiple other directives
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip {}

// CustomWidget can apply the already-composed behaviors from MenuWithTooltip
@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip {}
```

-->

컴포넌트뿐 아니라 다른 디렉티브에서 `hostDirectives`를 활용할 수도 있습니다.
이 방식을 활용하면 디렉티브 여러개를 한 번에 적용할 수 있습니다.

아래 예제에는 `Menu` 디렉티브와 `Tooltip` 디렉티브가 있습니다.
두 디렉티브를 `MenuWithTooltip` 디렉티브로 합쳐봅시다.
그리고 최종적으로는 `MenuWithTooltip`을 `SpecializedMenuWithTooltip`에 적용해 봅시다.

템플릿에 `SpecializedMenuWithTooltip`에 사용되면 Angular는 `Menu`, `Tooltip`, `MenuWithTooltip` 인스턴스가 각각 생성됩니다.
그리고나면 이 디렉티브들이 각각 `SpecializedMenuWithTooltip` 호스트 엘리먼트에 적용됩니다.

```ts
@Directive({
  /* ... */
})
export class Menu {}

@Directive({
  /* ... */
})
export class Tooltip {}

// MenuWithTooltip은 디렉티브 여러 개를 결합하는 디렉티브입니다.
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip {}

// 디렉티브가 결합된 MenuWithToolTip을 최종 목적지에 적용합니다.
@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip {}
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
  templateUrl: './admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu {}
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
  templateUrl: './admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu {}
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

<!--
### Host directive de-duplication
-->

### 호스트 디렉티브 중복 제거

<!--
When the same directive appears more than once in the resolved host directive tree, it is automatically de-duplicated rather than throwing an error. Two deterministic rules are used to decide which match survives.
-->

호스트 디렉티브 트리에 같은 디렉티브가 두 번 이상 사용되면, 오류를 발생시키는 대신 자동으로 중복이 제거됩니다.
어떤 항목이 유지될 지는 다음 규칙을 따릅니다.

<!--
#### Template match takes precedence
-->

#### 템플릿 매칭을 우선합니다.

<!--
If a directive matches an element once through a **template selector** and also appears as a
**host directive**, Angular keeps only the template match and discards all host directive matches.

The mental model is that a host directive match represents `Partial<YourDirective>` , a partial
application where only the inputs and outputs explicitly listed in `hostDirectives` are exposed,
while a template match represents the full directive with its complete public API.

```ts
@Directive({selector: '[hoverable]'})
export class Hoverable {}

@Component({
  selector: 'app-button',
  hostDirectives: [Hoverable],
})
export class Button {}
```

```angular-html
<!- Hoverable is matched by selector AND as a host directive of Button. ->
<!- Angular keeps only the selector match, which has the full public API. ->
<app-button hoverable></app-button>
```
-->

디렉티브가 **템플릿 셀렉터** 와 **호스트 디렉티브** 에 동시에 사용되면, 템플릿 매칭이 적용되고 호스트 디렉티브 매칭은 모두 폐기합니다.

호스트 디렉티브 매칭이 `Partial<YourDirective>`와 같다고 생각하면 이해하기 쉽습니다.
입출력 프로퍼티는 `hostDirectives`에서 외부로 공개된 일부(`Partial`)를 의미합니다.
반면에, 템플릿 매칭은 디렉티브의 전체 public API와 매칭된다는 것을 의미합니다.

```ts
@Directive({selector: '[hoverable]'})
export class Hoverable {}

@Component({
  selector: 'app-button',
  hostDirectives: [Hoverable],
})
export class Button {}
```

```angular-html
<!-- hoverable은 셀렉터와 매칭되면서 호스트 디렉티브로 지정되었습니다. -->
<!-- Angular는 전체 public API 매칭을 의미하는 셀렉터 매칭만 유지합니다. -->
<app-button hoverable></app-button>
```

<!--
#### Multiple host directive matches are merged
-->

#### 호스트 디렉티브가 여러개 매칭되면 합쳐집니다.

<!--
If the same directive appears **more than once as a host directive** , for example, when two
directives both declare a common dependency in their `hostDirectives` , Angular merges all
instances into a single directive instance. The input and output mappings from all instances are
combined.

This resolves the classic [diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem) in host directive composition:

```ts
// A shared behavior that both triggers need
@Directive({
  host: {
    '[attr.data-trigger-id]': 'triggerId',
  },
})
export class TriggerRef {
  readonly triggerId = `trigger-${crypto.randomUUID()}`;
}

// Two separate triggers, each declaring TriggerRef as a host directive
@Directive({
  selector: '[popoverTrigger]',
  hostDirectives: [TriggerRef],
})
export class PopoverTrigger {
  readonly triggerRef = inject(TriggerRef);
}

@Directive({
  selector: '[dropdownTrigger]',
  hostDirectives: [TriggerRef],
})
export class DropdownTrigger {
  readonly triggerRef = inject(TriggerRef);
}
```

```angular-html
<!- Angular keeps one TriggerRef instance, shared by both triggers. ->
<button popoverTrigger dropdownTrigger>Actions</button>
```

HELPFUL: Because Angular produces only one instance of the shared directive, both `PopoverTrigger`
and `DropdownTrigger` receive the same `TriggerRef` instance when they inject it.
-->

디렉티브 2개가 같은 `hostDirectives`에 적용되는 경우에는 디렉티브 인스턴스 하나만 유지됩니다.
입출력 프로퍼티는 인스턴스 하나로 합쳐집니다.

이 정책은 흔히 발생하는 [다이아몬드 문제](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem)를 해결하기 위한 것입니다:

```ts
// 트리거 2개의 참조
@Directive({
  host: {
    '[attr.data-trigger-id]': 'triggerId',
  },
})
export class TriggerRef {
  readonly triggerId = `trigger-${crypto.randomUUID()}`;
}

// 트리거는 2개지만, TriggerRef를 사용해서 호스트 디렉티브에 적용됩니다.
@Directive({
  selector: '[popoverTrigger]',
  hostDirectives: [TriggerRef],
})
export class PopoverTrigger {
  readonly triggerRef = inject(TriggerRef);
}

@Directive({
  selector: '[dropdownTrigger]',
  hostDirectives: [TriggerRef],
})
export class DropdownTrigger {
  readonly triggerRef = inject(TriggerRef);
}
```

```angular-html
<!-- 트리거 2개는 TriggerRef 인스턴스 하나를 공유합니다. -->
<button popoverTrigger dropdownTrigger>Actions</button>
```

참고: 디렉티브가 중복되는 경우에는 인스턴스가 하나만 유지되기 때문에, `PopoverTrigger`와 `DropdownTrigger`는 동일한 `TriggerRef` 인스턴스를 의존성으로 주입받습니다.

<!--
#### Conflicting aliases
-->

#### 별칭이 겹치는 경우

<!--
When Angular merges duplicate host directive matches it also merges their input and output mappings.
If two instances of the same host directive expose the **same input or output under different
aliases**, Angular throws an error at compile time ([NG8024](errors/NG8024))

```ts
@Directive({
  selector: '[popoverTrigger]',
  hostDirectives: [{directive: TriggerRef, inputs: ['triggerId: popoverTriggerId']}],
})
export class PopoverTrigger {}

@Directive({
  selector: '[dropdownTrigger]',
  hostDirectives: [
    {directive: TriggerRef, inputs: ['triggerId: dropdownTriggerId']}, // different alias!
  ],
})
export class DropdownTrigger {}
```

```angular-html
<!- Error: triggerId is exposed as both "popoverTriggerId" and "dropdownTriggerId". ->
<button popoverTrigger dropdownTrigger></button>
```

To resolve this, ensure that both paths expose the shared input or output under the same alias, or
do not expose it at all.
-->

호스트 디렉티브에 적용되는 입출력 프로퍼티는 모두 하나로 합쳐집니다.
그런데 같은 호스트 디렉티브에 **같은 입출력 프로퍼티가 다른 별칭으로 사용되면**, 컴파일 시점에 [NG8024](errors/NG8024) 오류를 냅니다.

```ts
@Directive({
  selector: '[popoverTrigger]',
  hostDirectives: [{directive: TriggerRef, inputs: ['triggerId: popoverTriggerId']}],
})
export class PopoverTrigger {}

@Directive({
  selector: '[dropdownTrigger]',
  hostDirectives: [
    {directive: TriggerRef, inputs: ['triggerId: dropdownTriggerId']}, // 다른 별칭을 지정!
  ],
})
export class DropdownTrigger {}
```

```angular-html
<!-- 에러: "popoverTriggerId"와 "dropdownTriggerId"는 triggerId가 같습니다. -->
<button popoverTrigger dropdownTrigger></button>
```

이 문제를 해결하려면, 입출력 프로퍼티에 별칭을 지정할 때 같은 별칭을 사용하거나, 별칭을 지정하지 않으면 됩니다.
