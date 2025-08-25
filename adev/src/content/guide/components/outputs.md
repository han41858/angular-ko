<!--
# Custom events with outputs
-->
# 커스텀 이벤트 보내기

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Angular components can define custom events by assigning a property to the `output` function:

<docs-code language="ts" highlight="3">
@Component({/*...*/})
export class ExpandablePanel {
  panelClosed = output<void>();
}
</docs-code>

```angular-html
<expandable-panel (panelClosed)="savePanelState()" />
```

The `output` function returns an `OutputEmitterRef`. You can emit an event by calling the `emit` method on the `OutputEmitterRef`:

<docs-code language="ts" highlight="">
  this.panelClosed.emit();
</docs-code>

Angular refers to properties initialized with the `output` function as **outputs**. You can use outputs to raise custom events, similar to native browser events like `click`.

**Angular custom events do not bubble up the DOM**.

**Output names are case-sensitive.**

When extending a component class, **outputs are inherited by the child class.**

The `output` function has special meaning to the Angular compiler. **You can exclusively call `output` in component and directive property initializers.**
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트는 `output` 함수로 출력 프로퍼티를 선언해서 커스텀 이벤트를 정의할 수 있습니다:

<docs-code language="ts" highlight="3">
@Component({/*...*/})
export class ExpandablePanel {
  panelClosed = output<void>();
}
</docs-code>

```angular-html
<expandable-panel (panelClosed)="savePanelState()" />
```

`output` 함수를 실행하면 `OutputEmitterRef` 객체를 반환합니다.
그리고 `OutputEmitterRef` 객체의 `emit` 메서드를 실행하면 이벤트를 보낼 수 있습니다:

<docs-code language="ts" highlight="">
  this.panelClosed.emit();
</docs-code>

Angular에서 `output` 함수로 초기화한 프로퍼티를 **출력 프로퍼티(outputs)** 라고 합니다.
출력 프로퍼티는 `click`과 같은 네이티브 브라우저 이벤트와 비슷하게 동작하는 커스텀 이벤트를 발생시키는 용도로 사용합니다.

**Angular 커스텀 이벤트는 DOM을 따라 버블 업(bubble up) 되지 않습니다.**

**출력 프로퍼티 이름은 대소문자를 구분합니다.**

컴포넌트 클래스를 상속하면, **자식 클래스에도 출력 프로퍼티가 상속됩니다.**

`output` 함수는 Angular 컴파일러가 특별하게 감지하는 함수입니다.
**컴포넌트나 디렉티브 프로퍼티 선언하는 용도 외 코드에서만 `output` 함수를 실행할 수 있습니다.**


<!--
## Emitting event data
-->
## 이벤트 데이터 보내기

<!--
You can pass event data when calling `emit`:

<docs-code language="ts" highlight="">
// You can emit primitive values.
this.valueChanged.emit(7);

// You can emit custom event objects
this.thumbDropped.emit({
  pointerX: 123,
  pointerY: 456,
})
</docs-code>

When defining an event listener in a template, you can access the event data from the `$event` variable:

```angular-html
<custom-slider (valueChanged)="logValue($event)" />
```
-->
`emit` 메서드를 실행하면서 이벤트 데이터를 보낼 수 있습니다:

<docs-code language="ts" highlight="">
// 기본 자료형을 보낼 수 있습니다.
this.valueChanged.emit(7);

// 커스텀 이벤트 객체를 보낼 수도 있습니다.
this.thumbDropped.emit({
pointerX: 123,
pointerY: 456,
})
</docs-code>

이벤트 데이터를 활용하려면 템플릿에서 이벤트 리스너를 연결할 때 `$event` 변수를 인자로 전달하면 됩니다:

```angular-html
<custom-slider (valueChanged)="logValue($event)" />
```


<!--
## Customizing output names
-->
## 별칭으로 사용하기

<!--
The `output` function accepts a parameter that lets you specify a different name for the event in a template:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class CustomSlider {
  changed = output({alias: 'valueChanged'});
}
</docs-code>

```angular-html
<custom-slider (valueChanged)="saveVolume()" />
```

This alias does not affect usage of the property in TypeScript code.

While you should generally avoid aliasing outputs for components, this feature can be useful for renaming properties while preserving an alias for the original name or for avoiding collisions with the name of native DOM events.
-->
템플릿에서 이벤트 이름을 프로퍼티 이름과 다르게 사용하려면 `output` 함수를 실행하면서 설정하면 됩니다:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class CustomSlider {
  changed = output({alias: 'valueChanged'});
}
</docs-code>

```angular-html
<custom-slider (valueChanged)="saveVolume()" />
```

이렇게 별칭을 지정해도 TypeScript 코드에는 영향을 주지 않습니다.

일반적으로는 컴포넌트 출력 프로퍼티의 별칭을 지정하지 않는 것이 좋지만, 기존 프로퍼티 이름이 네이티브 DOM 이벤트 이름과 충돌하는 경우 유용할 수 있습니다.


<!--
## Subscribing to outputs programmatically
-->
## 코드로 출력 프로퍼티 구독하기

<!--
When creating a component dynamically, you can programmatically subscribe to output events
from the component instance. The `OutputRef` type includes a `subscribe` method:

```ts
const someComponentRef: ComponentRef<SomeComponent> = viewContainerRef.createComponent(/*...*/);

someComponentRef.instance.someEventProperty.subscribe(eventData => {
  console.log(eventData);
});
```

Angular automatically cleans up event subscriptions when it destroys components with subscribers. Alternatively, you can manually unsubscribe from an event. The `subscribe` function returns an `OutputRefSubscription` with an `unsubscribe` method:

```typescript
const eventSubscription = someComponent.someEventProperty.subscribe(eventData => {
  console.log(eventData);
});

// ...

eventSubscription.unsubscribe();
```
-->
컴포넌트를 동적으로 생성했다면, 컴포넌트 인스턴스의 출력 프로퍼티 이벤트를 코드로 구독할 수 있습니다.
`OutputRef` 타입의 `subscribe` 메서드를 실행하면 됩니다:

```ts
const someComponentRef: ComponentRef<SomeComponent> = viewContainerRef.createComponent(/*...*/);

someComponentRef.instance.someEventProperty.subscribe(eventData => {
  console.log(eventData);
});
```

이렇게 구독하는 이벤트는 컴포넌트 인스턴스가 종료되면 자동으로 종료됩니다.
필요하다면 이벤트를 직접 구독 중지할 수도 있습니다.
`subscribe` 함수가 반환하는 `OutputRefSubscription` 객체의 `unsubscribe` 메서드를 실행하면 됩니다:

```typescript
const eventSubscription = someComponent.someEventProperty.subscribe(eventData => {
  console.log(eventData);
});

// ...

eventSubscription.unsubscribe();
```


<!--
## Choosing event names
-->
## 이벤트 이름 결정하기

<!--
Avoid choosing output names that collide with events on DOM elements like HTMLElement. Name collisions introduce confusion about whether the bound property belongs to the component or the DOM element.

Avoid adding prefixes for component outputs like you would with component selectors. Since a given element can only host one component, any custom properties can be assumed to belong to the component.

Always use [camelCase](https://en.wikipedia.org/wiki/Camel_case) output names. Avoid prefixing output names with "on".
-->
출력 프로퍼티의 이름을 결정할 때 HTMLElement와 같은 DOM 엘리먼트의 이벤트와 같은 이름은 피하세요.
이벤트 이름이 충돌되면 이벤트가 발생했을 때 이 이벤트가 컴포넌트에서 왔는지 DOM 엘리먼트에서 왔는지 혼동될 수 있습니다.

컴포넌트 셀렉터를 지정하던 것처럼 출력 프로퍼티에 접두사를 추가하지 마세요.
엘리먼트 하나는 컴포넌트 하나만 호스팅 할 수 있기 때문에, 접두사가 없어도 커스텀 프로퍼티는 해당 컴포넌트에서 존재하는 것으로 간주할 수 있습니다.

출력 프로퍼티 이름은 [캐멀 케이스(camelCase)](https://en.wikipedia.org/wiki/Camel_case)로 지정하세요.
"on" 접두사는 사용하지 마세요.


<!--
## Using outputs with RxJS
-->
## RxJS와 함께 사용하기

<!--
See [RxJS interop with component and directive outputs](ecosystem/rxjs-interop/output-interop) for details on interoperability between outputs and RxJS.
-->
출력 프로퍼티와 RxJS를 함께 사용하는 방법은 [컴포넌트, 디렉티브 출력 프로퍼티와 RxJS 상호작용](ecosystem/rxjs-interop/output-interop) 문서를 참고하세요.


<!--
## Declaring outputs with the `@Output` decorator
-->
## `@Output` 데코레이터로 출력 프로퍼티 선언하기

<!--
TIP: While the Angular team recommends using the `output` function for new projects, the
original decorator-based `@Output` API remains fully supported.

You can alternatively define custom events by assigning a property to a new `EventEmitter` and adding the `@Output` decorator:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class ExpandablePanel {
  @Output() panelClosed = new EventEmitter<void>();
}
</docs-code>

You can emit an event by calling the `emit` method on the `EventEmitter`.
-->
팁: Angular 팀은 새 프로젝트부터 `output` 함수 사용을 권장하지만, `Output` 데코레이터를 사용하는 방식도 여전히 완벽하게 지원합니다.

커스텀 이벤트는 프로퍼티에 `@Output` 데코레이터를 붙이고 `EventEmitter` 인스턴스를 생성하는 방식으로 선언할 수도 있습니다:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class ExpandablePanel {
  @Output() panelClosed = new EventEmitter<void>();
}
</docs-code>

이 경우는 `EventEmitter` 객체의 `emit` 메서드를 실행해서 이벤트를 보낼 수 있습니다.


<!--
### Aliases with the `@Output` decorator
-->
### `@Output` 데코레이터로 별칭 지정하기

<!--
The `@Output` decorator accepts a parameter that lets you specify a different name for the event in a template:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class CustomSlider {
  @Output('valueChanged') changed = new EventEmitter<number>();
}
</docs-code>

```angular-html
<custom-slider (valueChanged)="saveVolume()" />
```

This alias does not affect usage of the property in TypeScript code.
-->
템플릿에서 이벤트 이름을 출력 프로퍼티와 다르게 사용하려면 `@Output` 데코레이터에 별칭을 지정하면 됩니다:

<docs-code language="ts" highlight="">
@Component({/*...*/})
export class CustomSlider {
  @Output('valueChanged') changed = new EventEmitter<number>();
}
</docs-code>

```angular-html
<custom-slider (valueChanged)="saveVolume()" />
```

이렇게 별칭을 지정하더라도 TypeScript 코드에서 출력 프로퍼티를 활용하는 코드에는 영향을 주지 않습니다.


<!--
## Specify outputs in the `@Component` decorator
-->
## `@Component` 데코레이터로 출력 프로퍼티 선언하기

<!--
In addition to the `@Output` decorator, you can also specify a component's outputs with the `outputs` property in the `@Component` decorator. This can be useful when a component inherits a property from a base class:

<docs-code language="ts" highlight="">
// `CustomSlider` inherits the `valueChanged` property from `BaseSlider`.
@Component({
  /*...*/
  outputs: ['valueChanged'],
})
export class CustomSlider extends BaseSlider {}
</docs-code>

You can additionally specify an output alias in the `outputs` list by putting the alias after a colon in the string:

<docs-code language="ts" highlight="">
// `CustomSlider` inherits the `valueChanged` property from `BaseSlider`.
@Component({
  /*...*/
  outputs: ['valueChanged: volumeChanged'],
})
export class CustomSlider extends BaseSlider {}
</docs-code>
-->
`@Output` 데코레이터를 사용하는 방법 외에도, `@Component` 데코레이터의 `outputs` 프로퍼티를 사용하면 컴포넌트 출력 프로퍼티를 선언할 수 있습니다.
이 방식은 컴포넌트를 상속받는 경우에 유용합니다:

<docs-code language="ts" highlight="">
// `CustomSlider` 는 `BaseSlider` 에 있는 `valueChanged` 프로퍼티를 상속받습니다.
@Component({
  /*...*/
  outputs: ['valueChanged'],
})
export class CustomSlider extends BaseSlider {}
</docs-code>

그리고 `outputs`를 선언하면서 콜론을 붙이고 문자열을 붙이면 출력 프로퍼티의 별칭을 지정할 수 있습니다:

<docs-code language="ts" highlight="">
// `CustomSlider` 는 `BaseSlider` 에 있는 `valueChanged` 프로퍼티를 상속받습니다.
@Component({
  /*...*/
  outputs: ['valueChanged: volumeChanged'],
})
export class CustomSlider extends BaseSlider {}
</docs-code>
