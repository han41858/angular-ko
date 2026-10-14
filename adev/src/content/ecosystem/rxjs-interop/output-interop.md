<!--
# RxJS interop with component and directive outputs
-->

<a id="rxjs-interop-with-component-and-directive-outputs"></a>

# 컴포넌트와 디렉티브 출력의 RxJS 연동

<!--
TIP: This guide assumes you're familiar with [component and directive outputs](guide/components/outputs).

The `@angular/core/rxjs-interop` package offers two APIs related to component and directive outputs.
-->

팁: 이 문서는 [컴포넌트와 디렉티브 출력](guide/components/outputs)을 알고 있다고 가정합니다.

`@angular/core/rxjs-interop` 패키지는 컴포넌트와 디렉티브 출력에 관련된 API를 두 가지 제공합니다.

<!--
## Creating an output based on an RxJS Observable
-->

<a id="creating-an-output-based-on-an-rxjs-observable"></a>

## RxJS Observable을 기반으로 출력 생성하기

<!--
The `outputFromObservable` lets you create a component or directive output that emits based on an RxJS observable:

```ts {highlight:[9]}
import {Directive} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';

@Directive(/* ... */)
class Draggable {
  pointerMoves$: Observable<PointerMovements> = listenToPointerMoves();

  // Whenever `pointerMoves$` emits, the `pointerMove` event fires.
  pointerMove = outputFromObservable(this.pointerMoves$);
}
```

The `outputFromObservable` function has special meaning to the Angular compiler. **You may only call `outputFromObservable` in component and directive property initializers.**

When you `subscribe` to the output, Angular automatically forwards the subscription to the underlying observable. Angular stops forwarding values when the component or directive is destroyed.

HELPFUL: Consider using `output()` directly if you can emit values imperatively.
-->

`outputFromObservable`을 사용하면 RxJS Observable을 기반으로 값을 방출하는 컴포넌트 또는 디렉티브 출력을 생성할 수 있습니다:

```ts {highlight:[9]}
import {Directive} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';

@Directive(/* ... */)
class Draggable {
  pointerMoves$: Observable<PointerMovements> = listenToPointerMoves();

  // `pointerMoves$`가 값을 방출할 때마다 `pointerMove` 이벤트가 발생합니다.
  pointerMove = outputFromObservable(this.pointerMoves$);
}
```

Angular 컴파일러는 `outputFromObservable` 함수를 특별하게 처리합니다.
**`outputFromObservable`은 컴포넌트와 디렉티브의 프로퍼티를 초기화하는 곳에서만 호출할 수 있습니다.**

출력을 `subscribe`하면 Angular는 해당 구독을 내부 Observable에 자동으로 전달합니다.
컴포넌트나 디렉티브가 종료되면 Angular는 값 전달을 중단합니다.

도움말: 명령형 코드로 값을 방출할 수 있다면 `output()`을 직접 사용하는 방법을 고려하세요.

<!--
## Creating an RxJS Observable from a component or directive output
-->

<a id="creating-an-rxjs-observable-from-a-component-or-directive-output"></a>

## 컴포넌트나 디렉티브 출력으로 RxJS Observable 생성하기

<!--
The `outputToObservable` function lets you create an RxJS observable from a component output.

```ts {highlight:[11]}
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component(/*...*/)
class CustomSlider {
    valueChange = output<number>();
}

// Instance reference to `CustomSlider`.
const slider: CustomSlider = createSlider();

outputToObservable(slider.valueChange) // Observable<number>
    .pipe(...)
    .subscribe(...);
```

HELPFUL: Consider using the `subscribe` method on `OutputRef` directly if it meets your needs.
-->

`outputToObservable` 함수를 사용하면 컴포넌트 출력으로 RxJS Observable을 생성할 수 있습니다.

```ts {highlight:[11]}
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component(/*...*/)
class CustomSlider {
    valueChange = output<number>();
}

// `CustomSlider` 인스턴스 참조입니다.
const slider: CustomSlider = createSlider();

outputToObservable(slider.valueChange) // Observable<number>
    .pipe(...)
    .subscribe(...);
```

도움말: 요구사항을 충족한다면 `OutputRef`의 `subscribe` 메서드를 직접 사용하는 방법을 고려하세요.
