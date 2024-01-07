<!--
# Directive composition API
-->
# 디렉티브 연결 API

<!--
Angular directives offer a great way to encapsulate reusable behaviors— directives can apply
attributes, CSS classes, and event listeners to an element.

The *directive composition API* lets you apply directives to a component's host element from
_within_ the component TypeScript class.
-->
Angular 디렉티브는 재사용할 수 있는 동작을 캡슐화하는 방법을 제공하기 때문에 디렉티브를 어트리뷰트, CSS 클래스, 이벤트 리스너에 적용할 수 있습니다.

*디렉티브 컴포지션 API* 를 활용하면 컴포넌트 _안에서_ 컴포넌트 호스트 엘리먼트에 디렉티브를 적용할 수 있습니다.


<!--
## Adding directives to a component
-->
## 컴포넌트에 디렉티브 적용하기

<!--
You apply directives to a component by adding a `hostDirectives` property to a component's
decorator. We call such directives *host directives*.

In this example, we apply the directive `MenuBehavior` to the host element of `AdminMenu`. This
works similarly to applying the `MenuBehavior` to the `<admin-menu>` element in a template.

```typescript
@Component({
  standalone: true,
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

**Directives used in `hostDirectives` must be `standalone: true`.**

**Angular ignores the `selector` of directives applied in the `hostDirectives` property.**
-->
컴포넌트 데코레이터에 `hostDirectives` 프로퍼티를 추가하면 컴포넌트에 디렉티브를 적용할 수 있습니다.
이렇게 등록되는 디렉티브를 *호스트 디렉티브(host directives)* 라고 합니다.

아래 코드는 `AdminMenu`의 호스트 엘리먼트에 `MenuBehavior` 디렉티브를 적용하는 예제 코드입니다.
이 방식은 템플릿에서 `<admin-menu>` 엘리먼트에 `MenuBehavior` 디렉티브를 지정하는 방식과 비슷합니다.

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

이렇게 작성하면 Angular가 컴포넌트를 렌더링할 때 컴포넌트의 인스턴스마다 디렉티브를 함께 생성합니다.
그래서 각 디렉티브의 호스트는 각 컴포넌트의 호스트 엘리먼트와 연결됩니다.
기본적으로 호스트 엘리먼트의 입출력 프로퍼티는 컴포넌트의 public API와 연결되지는 않습니다.
이 내용은 아래 [입출력 프로퍼티 연결하기](#including-inputs-and-outputs) 섹션을 참고하세요.

**호스트 디렉티브는 컴파일 타임에 정적으로 연결됩니다.** 디렉티브는 실행시점에 동적으로 적용할 수 없습니다.

**`hostDirectives`에 사용되는 디렉티브는 `standalone: true` 여야 합니다.**

**`hostDirectives` 프로퍼티로 지정된 디렉티브의 `selector` 프로퍼티는 무시합니다.**


<a id=including-inputs-and-outputs></a>

<!--
## Including inputs and outputs
-->
## 입출력 프로퍼티 연결하기

<!--
When you apply `hostDirectives` to your component, the inputs and outputs from the host directives
are not included in your component's API by default. You can explicitly include inputs and outputs
in your component's API by expanding the entry in `hostDirectives`:

```typescript
@Component({
  standalone: true,
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

```html
<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

Furthermore, you can alias inputs and outputs from `hostDirective` to customize the API of your
component:

```typescript
@Component({
  standalone: true,
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

```html
<admin-menu id="top-menu" (closed)="logMenuClosed()">
```
-->
컴포넌트에 `hostDirectives`를 적용해도 이 호스트 디렉티브의 입출력 프로퍼티는 기본적으로 컴포넌트 API와는 별개입니다.
이런 경우에 `hostDirectives`에 입출력 프로퍼티를 선언하면 디렉티브의 입출력 프로퍼티를 컴포넌트 입출력 프로퍼티에 추가할 수 있습니다:

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

이렇게 입출력 프로퍼티를 연결하고 나면, 컴포넌트를 사용한 템플릿에서도 `hostDirective`의 입출력 프로퍼티를 활용할 수 있습니다:

```html

<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

그리고 `hostDirective`의 입출력 프로퍼티에 다른 이름을 지정할 수도 있습니다:

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

```html

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
  standalone: true,
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

// CustomWidget can apply the already-composed behaviors from MenuWithTooltip
@Directive({
  standalone: true,
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```
-->
`hostDirective`는 컴포넌트뿐 아니라 다른 디렉티브에도 적용할 수 있습니다.
이 방식을 활용하면 작은 기능을 하나씩 모아 여러 기능을 구성할 수 있습니다.

아래 예제에서는 `Menu`, `Tooltip` 디렉티브를 정의했습니다.
이 디렉티브 두 개를 `MenuWithTooltip`이라는 디렉티브로 묶어봅시다.
그리고 이렇게 묶은 `MenuWithTooltip` 디렉티브를 `SpecializedMenuWithTooltip` 디렉티브로 묶어봅시다.

그러면 `SpecializedMenuWithTooltip`가 템플릿에 사용되었을 때, `Menu`, `Tooltip`, `MenuWithTooltip` 디렉티브의 인스턴스가 모두 생성됩니다.
이 디렉티브들은 모두 호스트 엘리먼트인 `SpecializedMenuWithTooltip`에 적용됩니다.

```typescript
@Directive({...})
export class Menu { }

@Directive({...})
export class Tooltip { }

// MenuWithTooltip은 디렉티브를 묶어놓은 디렉티브입니다.
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```


<!--
## Host directive semantics
-->
### 호스트 디렉티브 시맨틱

<!--
### Directive execution order
-->
### 디렉티브 실행 순서

<!--
Host directives go through the same lifecycle as components and directives used directly in a
template. However, host directives always execute their constructor, lifecycle hooks, and bindings _
before_ the component or directive on which they are applied.

The following example shows minimal use of a host directive:

```typescript
@Component({
  standalone: true,
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
  standalone: true,
  hostDirectives: [Tooltip],
})
export class CustomTooltip { }

@Directive({
  standalone: true,
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
호스트 디렉티브는 컴포넌트, 디렉티브를 템플릿에 사용했을 때와 동일한 라이프싸이클로 실행됩니다.
하지만 호스트 디렉티브의 생성자나 라이프싸이클 후킹 함수, 바인딩은 언제나 이 디렉티브가 적용되는 컴포넌트/디렉티브보다 이전에 실행됩니다.

간단하게 코드로 봅시다:

```typescript
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

그러면 실행순서는 이렇습니다:

1. `MenuBehavior` 인스턴스가 생성됩니다.
2. `AdminMenu` 인스턴스가 생성됩니다.
3. `MenuBehavior` 가 `ngOnInit()` 함수로 입력 프로퍼티를 받습니다.
4. `AdminMenu` 가 `ngOnInit()` 함수로 입력 프로퍼티를 받습니다.
5. `MenuBehavior` 호스트 바인딩이 실행됩니다.
6. `AdminMenu` 호스트 바인딩이 실행됩니다.

실행순서가 이렇기 때문에, `hostDirectives`를 사용하면 다른 호스트 바인딩을 오버라이드 할 수 있습니다.
호스트 디렉티브가 여러개 사용된 경우에도 마찬가지입니다.

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

실행순서는 이렇습니다:

1. `Tooltip` 인스턴스가 생성됩니다.
2. `CustomTooltip` 인스턴스가 생성됩니다.
3. `EvenMoreCustomTooltip` 인스턴스가 생성됩니다.
4. `Tooltip` 가 `ngOnInit()` 함수로 입력 프로퍼티를 받습니다.
5. `CustomTooltip` 가 `ngOnInit()` 함수로 입력 프로퍼티를 받습니다.
6. `EvenMoreCustomTooltip` 가 `ngOnInit()` 함수로 입력 프로퍼티를 받습니다.
7. `Tooltip` 호스트 바인딩이 실행됩니다.
8. `CustomTooltip` 호스트 바인딩이 실행됩니다.
9. `EvenMoreCustomTooltip` 호스트 바인딩이 실행됩니다.


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
컴포넌트나 디렉티브가 `hostDirectives`를 등록하면, 양쪽에서 인스턴스에 서로 접근할 수 있습니다.

그래서 프로바이더는 어느쪽에 선언해도 괜찮습니다.

컴포넌트/디렉티브에 `hostDirectives`가 등록되어 있고 이 호스트 디렉티브에 같은 인젝션 토큰이 등록되었다면, `hostDirectives`에 등록된 프로바이더가 우선순위가 높습니다.


<!--
### Performance
-->
### 성능

<!--
While the directive composition API offers a powerful tool for reusing common behaviors, excessive
use of host directives can impact your application's memory use. If you create components or
directives that use _many_ host directives, you may inadvertently balloon the memory used by your
application.

The following example shows a component that applies several host directives.

```typescript
@Component({
  standalone: true,
  hostDirectives: [
    DisabledState,
    RequiredState,
    ValidationState,
    ColorState,
    RippleBehavior,
  ],
})
export class CustomCheckbox { }
```

This example declares a custom checkbox component that includes five host directives. This
means that Angular will create six objects each time a `CustomCheckbox` renders— one for the
component and one for each host directive. For a few checkboxes on a page, this won't pose any
significant issues. However, if your page renders _hundreds_ of checkboxes, such as in a table, then
you could start to see an impact of the additional object allocations. Always be sure to profile
your application to determine the right composition pattern for your use case.
-->
디렉티브 연결 API를 활용하면 디렉티브를 여러개 결합해서 사용할 수 있기 때문에 그 활용도가 무궁무진하지만, 남용하면 메모리 사용에 영향을 줄 수 있습니다.
만약 컴포넌트/디렉티브에 _너무 많은_ 호스트 디렉티브를 사용하면, 애플리케이션의 메모리 사용량이 급격하게 증가할 수 있습니다.

아래 코드를 봅시다.

```typescript
@Component({
  hostDirectives: [
    DisabledState,
    RequiredState,
    ValidationState,
    ColorState,
    RippleBehavior,
  ],
})
export class CustomCheckbox { }
```

이 코드는 커스텀 체크박스 컴포넌트를 정의하는데, 이 컴포넌트에는 호스트 디렉티브가 5개 등록되어 있습니다.
이 말은, `CustomCheckbox`가 사용될 때마다 Angular가 객체를 6개씩 생성해야 한다는 의미입니다.

화면에 체크박스가 몇개 없다면 별 문제가 되지 않습니다.
하지만 표에 사용되어 체크박스가 _수백개_ 정도 된다면, 메모리가 부족해지는 상황을 마주할 수도 있습니다.
애플리케이션 성능을 최적의 상태로 유지하려면, 용도에 맞게 디렉티브를 조합하는 것이 중요합니다.


@reviewed 2022-12-11
