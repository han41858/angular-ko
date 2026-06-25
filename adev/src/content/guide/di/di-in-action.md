<!--
# DI in action
-->

# 실존 의존성 주입

<!--
This guide explores additional features of dependency injection (DI) in Angular.

NOTE: For comprehensive coverage of InjectionToken and custom providers, see the [defining dependency providers guide](guide/di/defining-dependency-providers#injection-tokens).
-->

이 문서에서는 의존성 주입의 활용 사례를 알아봅시다.

참고: InjectionToken과 커스텀 프로바이더를 자세하게 알아보려면 [의존성 주입 프로바이더 등록하기 문서](guide/di/defining-dependency-providers#injection-tokens)를 참고하세요.

<!--
## Inject the component's DOM element
-->

## 컴포넌트의 DOM 엘리먼트 주입하기

<!--
Although developers generally avoid it, some visual effects and third-party tools require you to access the DOM directly.
In such cases, you may need to access a component's DOM element.

Angular exposes the underlying DOM element of a `@Component` or `@Directive` through injection using the `ElementRef` token:

```ts {highlight:[7]}
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private element = inject(ElementRef);

  update() {
    this.element.nativeElement.style.color = 'red';
  }
}
```
-->

개발자들은 일반적으로 피할 상황이지만, 시각 효과를 적용하거나 서드 파티를 활용하기 위해 DOM에 직접 접근해야 하는 경우가 있습니다.
이런 경우에는 컴포넌트 DOM 엘리먼트에 접근할 필요가 있습니다.

이 때 `ElementRef` 토큰을 의존성으로 주입하면 @Component`나 `@Directive`에 해당하는 DOM 엘리먼트를 참조할 수 있습니다:

```ts {highlight:[7]}
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private element = inject(ElementRef);

  update() {
    this.element.nativeElement.style.color = 'red';
  }
}
```

<!--
## Inject the host element's tag name
-->

## 호스트 엘리먼트의 태그 이름 주입하기

<!--
To get the tag name of a host element, inject it using the `HOST_TAG_NAME` token.

```ts
import {Directive, HOST_TAG_NAME, inject} from '@angular/core';

@Directive({
  selector: '[roleButton]',
})
export class RoleButtonDirective {
  private tagName = inject(HOST_TAG_NAME);

  onAction() {
    switch (this.tagName) {
      case 'button':
        // Handle button action
        break;
      case 'a':
        // Handle anchor action
        break;
      default:
        // Handle other elements
        break;
    }
  }
}
```

NOTE: If the host element might not have a tag name (e.g., `ng-container` or `ng-template`), make the injection optional.
-->

`HOST_TAG_NAME` 토큰을 사용하면 호스트 엘리먼트의 태그 이름을 의존성으로 주입할 수 있습니다.

```ts
import {Directive, HOST_TAG_NAME, inject} from '@angular/core';

@Directive({
  selector: '[roleButton]',
})
export class RoleButtonDirective {
  private tagName = inject(HOST_TAG_NAME);

  onAction() {
    switch (this.tagName) {
      case 'button':
        // 버튼 활용 로직
        break;
      case 'a':
        // 앵커 활용 로직
        break;
      default:
        // 다른 엘리먼트 활용 로직
        break;
    }
  }
}
```

참고: `ng-container`나 `ng-template`과 같이 호스트 엘리먼트의 태그 이름이 없는 경우에는, 의존성 주입에 생략 가능(optional) 옵션을 지정하세요.

<!--
## Resolve circular dependencies with a forward reference
-->

## 의존성 순환 참조 해결하기

<!--
In TypeScript, the order of class declarations matters.
You cannot reference a class directly until you define it.

This isn't usually a problem, especially if you adhere to the recommended _one class per file_ rule.
However, in some cases, circular references are unavoidable.
For example, if class 'A' refers to class 'B' and class 'B' refers to class 'A', one of them must be defined first.

The Angular `forwardRef()` function creates an _indirect_ reference that Angular can resolve later.

You face a similar problem when a class makes _a reference to itself_.
For example, in its `providers` array.
The `providers` array is a property of the `@Component()` decorator function, which must appear before the class definition.
Such circular references can be resolved using `forwardRef`.

```typescript {header: 'app.component.ts', highlight: [4]}
providers: [
  {
    provide: PARENT_MENU_ITEM,
    useExisting: forwardRef(() => MenuItem),
  },
],
```
-->

TypeScript는 클래스 선언 순서가 중요합니다.
클래스를 정의하기 전에는 참조할 수 없습니다.

TypeScript는 _파일 하나 당 클래스 하나_ 를 선언하도록 권장하기 때문에 일반적으로는 문제가 되지 않습니다.
하지만 경우에 따라 순환 참조가 불가피할 수 있습니다.
클래스 A가 클래스 B를 참조하는데, 클래스 B가 다시 클래스 A를 참조하는 경우, 둘 중 하나는 먼저 정의해야 합니다.

이 때 Angular가 제공하는 `forwardRef()` 함수를 사용하면 의존성 객체를 나중에 참조할 수 있도록 _간접_ 참조를 연결할 수 있습니다.

클래스가 _자기 자신을 참조하는_ 경우도 비슷한 상황입니다.
`providers` 배열은 `@Component()` 데코레이터 함수의 프로퍼티이기 때문에, 클래스 선언보다 먼저 와야 합니다.
하지만 `forwardRef`를 사용하면 클래스 선언 전에 이 클래스의 참조를 전달할 수 있습니다.

```typescript {header: 'app.component.ts', highlight: [4]}
providers: [
  {
    provide: PARENT_MENU_ITEM,
    useExisting: forwardRef(() => MenuItem),
  },
],
```
