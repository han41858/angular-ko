<!--
# Inheritance
-->
# 상속

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

Angular components are TypeScript classes and participate in standard JavaScript inheritance
semantics.

A component can extend any base class:

```ts
export class ListboxBase {
  value: string;
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  // CustomListbox inherits the `value` property.
}
```
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

Angular 컴포넌트는 TypeScript 클래스이기 때문에 표준 JavaScript 상속 문법을 사용할 수 있습니다.

이렇게 상속하면 됩니다:

```ts
export class ListboxBase {
  value: string;
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  // CustomListbox는 ListboxBase를 상속하기 때문에 `value` 프로퍼티가 존재합니다.
}
```


<!--
## Extending other components and directives
-->
## 컴포넌트, 디렉티브 확장하기

<!--
When a component extends another component or a directive, it inherits some of the metadata defined in
the base class's decorator and the base class's decorated members. This includes
host bindings, inputs, outputs, lifecycle methods.

```angular-ts
@Component({
  selector: 'base-listbox',
  template: `
    ...
  `,
  host: {
    '(keydown)': 'handleKey($event)',
  },
})
export class ListboxBase {
  value = input.required<string>();
  handleKey(event: KeyboardEvent) {
    /* ... */
  }
}

@Component({
  selector: 'custom-listbox',
  template: `
    ...
  `,
  host: {
    '(click)': 'focusActiveOption()',
  },
})
export class CustomListbox extends ListboxBase {
  disabled = input(false);
  focusActiveOption() {
    /* ... */
  }
}
```

In the example above, `CustomListbox` inherits all the information associated with `ListboxBase`,
overriding the selector and template with its own values. `CustomListbox` has two inputs (`value`
and `disabled`) and two event listeners (`keydown` and `click`).

Child classes end up with the _union_ of all of their ancestors' inputs, outputs, and host bindings
and their own.
-->
컴포넌트가 다른 컴포넌트나 디렉티브를 상속하면, 부모 클래스에 있는 메타데이터와 프로퍼티를 모두 상속받습니다.
여기에는 호스트 바인딩, 입출력 프로퍼티, 라이프싸이클 메서드가 모두 포함됩니다.

```angular-ts
@Component({
  selector: 'base-listbox',
  template: `
    ...
  `,
  host: {
    '(keydown)': 'handleKey($event)',
  },
})
export class ListboxBase {
  value = input.required<string>();
  handleKey(event: KeyboardEvent) {
    /* ... */
  }
}

@Component({
  selector: 'custom-listbox',
  template: `
    ...
  `,
  host: {
    '(click)': 'focusActiveOption()',
  },
})
export class CustomListbox extends ListboxBase {
  disabled = input(false);
  focusActiveOption() {
    /* ... */
  }
}
```

위 예제 코드에서 `CustomListbox` 는 `ListboxBase`의 정보를 모두 상속받으며, 셀렉터와 템플릿은 새로운 값을 오버라이딩합니다.
그래서 `CustomListbox`에는 입력 프로퍼티가 2개(`value`, `disabled`) 존재하고 이벤트 리스너도 2개(`keydown`, `click`) 존재합니다.

결국 자식 클래스는 부모 클래스의 모든 입출력 프로퍼티, 호스트 바인딩을 포함합니다.


<!--
### Forwarding injected dependencies
-->
### 의존성 객체 전달하기

<!--
If a base class injects dependencies as constructor parameters, the child class must explicitly class these dependencies to `super`.

```ts
@Component({ ... })
export class ListboxBase {
  constructor(private element: ElementRef) { }
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  constructor(element: ElementRef) {
    super(element);
  }
}
```
-->
부모 클래스가 생성자로 의존성 객체를 주입받으면, 자식 클래스에서는 `super`를 사용해서 해당 객체를 의존성으로 전달해야 합니다.

```ts
@Component({ ... })
export class ListboxBase {
  constructor(private element: ElementRef) { }
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  constructor(element: ElementRef) {
    super(element);
  }
}
```


<!--
### Overriding lifecycle methods
-->
### 라이프싸이클 메서드 오버라이딩

<!--
If a base class defines a lifecycle method, such as `ngOnInit`, a child class that also
implements `ngOnInit` _overrides_ the base class's implementation. If you want to preserve the base
class's lifecycle method, explicitly call the method with `super`:

```ts
@Component({ ... })
export class ListboxBase {
  protected isInitialized = false;
  ngOnInit() {
    this.isInitialized = true;
  }
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  override ngOnInit() {
    super.ngOnInit();
    /* ... */
  }
}
```
-->
부모 클래스에서 `ngOnInit`과 같은 라이프싸이클 메서드를 구현했다면, 자식 클래스에서 다시 `ngOnInit` 함수를 구현하면서 부모 클래스의 메서드를 오바리이딩 할 수 있습니다.
이 때 부모 클래스의 메서드를 실행하려면, `super` 키워드와 함께 실행하면 됩니다:

```ts
@Component({ ... })
export class ListboxBase {
  protected isInitialized = false;
  ngOnInit() {
    this.isInitialized = true;
  }
}

@Component({ ... })
export class CustomListbox extends ListboxBase {
  override ngOnInit() {
    super.ngOnInit();
    /* ... */
  }
}
```
