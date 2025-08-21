<!--
# Accepting data with input properties
-->
# 입력 프로퍼티로 데이터 받기

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

TIP: If you're familiar with other web frameworks, input properties are similar to _props_.

When you use a component, you commonly want to pass some data to it. A component specifies the data that it accepts by declaring
**inputs**:

<docs-code language="ts" highlight="[7]">
import {Component, input} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
  // Declare an input named 'value' with a default value of zero.
  value = input(0);
}
</docs-code>

This lets you bind to the property in a template:

```angular-html
<custom-slider [value]="50" />
```

If an input has a default value, TypeScript infers the type from the default value:

```typescript
@Component({/*...*/})
export class CustomSlider {
  // TypeScript infers that this input is a number, returning InputSignal<number>.
  value = input(0);
}
```

You can explicitly declare a type for the input by specifying a generic parameter to the function.

If an input without a default value is not set, its value is `undefined`:

```typescript
@Component({/*...*/})
export class CustomSlider {
  // Produces an InputSignal<number | undefined> because `value` may not be set.
  value = input<number>();
}
```

**Angular records inputs statically at compile-time**. Inputs cannot be added or removed at run-time.

The `input` function has special meaning to the Angular compiler. **You can exclusively call `input` in component and directive property initializers.**

When extending a component class, **inputs are inherited by the child class.**

**Input names are case-sensitive.**
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

팁: 만약 웹 프레임워크에 익숙하다면, 입력 프로퍼티는 _프롭스(pros)_ 와 비슷하다고 이해해도 됩니다.

컴포넌트를 사용하다 보면 컴포넌트에 데이터를 전달하는 경우가 자주 있습니다.
이 경우 컴포넌트의 **입력 프로퍼티** 를 활용하면 됩니다:

<docs-code language="ts" highlight="[7]">
import {Component, input} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
// `value` 라는 이름으로 입력 프로퍼티를 선언하고 기본값 0을 할당합니다.
value = input(0);
}
</docs-code>

그러면 템플릿에서 이렇게 프로퍼티 바인딩 할 수 있습니다:

```angular-html
<custom-slider [value]="50" />
```

입력 프로퍼티에 기본값이 있으면 TypeScript는 기본값을 기준으로 타입을 추론합니다:

```typescript
@Component({/*...*/})
export class CustomSlider {
  // TypeScript는 숫자를 입력받는 것을 기준으로 InputSignal<number> 타입으로 추론합니다.
  value = input(0);
}
```

입력 프로퍼티에 제네릭 함수를 사용하는 경우에는 타입을 명확하게 지정할 수도 있습니다.

입력 프로퍼티에 기본값을 할당하지 않으면 `undefined`로 추론됩니다.

```typescript
@Component({/*...*/})
export class CustomSlider {
  // 입력 프로퍼티 `value`의 기본값이 할당되지 않았기 때문에 타입은 InputSignal<number | undefined> 으로 추론됩니다.
  value = input<number>();
}
```

**Angular는 입력 프로퍼티를 컴파일 시점에 정적으로 분석합니다**.
그래서 실행 시점에 입력 프로퍼티를 추가하거나 제거할 수 없습니다.

그리고 `input` 함수는 Angular 컴파일러 관점에서 특별한 의미를 갖습니다.
**`input` 함수는 컴포넌트 프로퍼티나 디렉티브 프로퍼티를 초기화할 때만 사용할 수 있습니다.**

컴포넌트 클래스를 상속받는 경우, **자식 클래스는 부모 클래스의 입력 프로퍼티를 상속받습니다.**

**입력 프로퍼티는 대소문자를 구분합니다.**


<!--
## Reading inputs
-->
## 입력 프로퍼티 값 읽기

<!--
The `input` function returns an `InputSignal`. You can read the value by calling the signal:

<docs-code language="ts" highlight="[5]">
import {Component, input} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
  // Declare an input named 'value' with a default value of zero. 
  value = input(0);

  // Create a computed expression that reads the value input
  label = computed(() => `The slider's value is ${this.value()}`); 
}
</docs-code>

Signals created by the `input` function are read-only.
-->
`input` 함수는 `InputSignal`을 반환합니다.
이 시그널의 값을 읽으려면 시그널을 실행하면 됩니다:

<docs-code language="ts" highlight="[5]">
import {Component, input} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
// `value` 라는 이름으로 입력 프로퍼티를 선언하고 기본값 0을 할당합니다.
value = input(0);

// `value` 입력 프로퍼티를 기반으로 연산 시그널을 생성합니다.
label = computed(() => `The slider's value is ${this.value()}`);
}
</docs-code>

`input` 함수로 만든 시그널은 읽기 전용 시그널입니다.


<!--
## Required inputs
-->
## 필수 입력값

<!--
You can declare that an input is `required` by calling `input.required` instead of `input`:

<docs-code language="ts" highlight="[3]">
@Component({/*...*/})
export class CustomSlider {
  // Declare a required input named value. Returns an `InputSignal<number>`.
  value = input.required<number>();
}
</docs-code>

Angular enforces that required inputs _must_ be set when the component is used in a template. If you try to use a component without specifying all of its required inputs, Angular reports an error at build-time.

Required inputs do not automatically include `undefined` in the generic parameter of the returned `InputSignal`.
-->
입력 프로퍼티 값을 필수 항목으로 지정하려면 `input` 함수 대신 `input.required` 함수를 사용하면 됩니다:

<docs-code language="ts" highlight="[3]">
@Component({/*...*/})
export class CustomSlider {
  // `value` 라는 이름으로 입력 프로퍼티를 선언하고 `InputSignal<number>`를 할당합니다.
  value = input.required<number>();
}
</docs-code>

이렇게 구현하면 템플릿에 컴포넌트가 사용될 때 입력값을 _반드시_ 지정해야 합니다.
입력값 없이 컴포넌트를 사용하면 빌드 시점에 오류가 발생합니다.

입력 프로퍼티가 필수인 경우에는 `InputSignal`의 제네릭에 `undefined`를 추가하지 않는 한 `undefined`를 포함하지 않습니다.


<!--
## Configuring inputs
-->
## 입력 프로퍼티 설정하기

<!--
The `input` function accepts a config object as a second parameter that lets you change the way that input works.
-->
`input` 함수에 두번째 인자로 옵션 객체를 전달할 수 있습니다.


<!--
### Input transforms
-->
### 입력값 변환

<!--
You can specify a `transform` function to change the value of an input when it's set by Angular.

<docs-code language="ts" highlight="[6]">
@Component({
  selector: 'custom-slider',
  /*...*/
})
export class CustomSlider {
  label = input('', {transform: trimString});
}

function trimString(value: string | undefined): string {
  return value?.trim() ?? '';
}
</docs-code>

```angular-html
<custom-slider [label]="systemVolume" />
```

In the example above, whenever the value of `systemVolume` changes, Angular runs `trimString` and sets `label` to the result.

The most common use-case for input transforms is to accept a wider range of value types in templates, often including `null` and `undefined`.

**Input transform function must be statically analyzable at build-time.** You cannot set transform functions conditionally or as the result of an expression evaluation.

**Input transform functions should always be [pure functions](https://en.wikipedia.org/wiki/Pure_function).** Relying on state outside the transform function can lead to unpredictable behavior.
-->
입력 프로퍼티로 받은 값을 변환해서 할당하려면 `transform` 함수를 사용하면 됩니다.

<docs-code language="ts" highlight="[6]">
@Component({
  selector: 'custom-slider',
  /*...*/
})
export class CustomSlider {
  label = input('', {transform: trimString});
}

function trimString(value: string | undefined): string {
return value?.trim() ?? '';
}
</docs-code>

```angular-html
<custom-slider [label]="systemVolume" />
```

이렇게 구현하면 `systemVolume` 값이 변경될 때 `trimString` 함수가 실행되고 그 결과값이 `label`에 할당됩니다.

입력값을 변환하는 경우는 `null` 값과 `undefined` 값을 포함해서 템플릿에 사용되는 값의 타입을 완화하는 경우에 자주 사용됩니다.

**입력 프로퍼티 변환 함수는 빌드 시점에 정적으로 분석됩니다.**
그래서 변환 함수는 조건에 따라 결정하거나 표현식의 결과로 할당할 수는 없습니다.

**입력 프로퍼티 변환 함수는 반드시 [순수 함수(pure functions)](https://en.wikipedia.org/wiki/Pure_function)여야 합니다.**
변환 함수 외부 상태에 영향을 받으면, 변환 함수의 결과값을 예측할 수 없습니다.


<!--
#### Type checking
-->
#### 타입 검사

<!--
When you specify an input transform, the type of the transform function's parameter determines the types of values that can be set to the input in a template.

<docs-code language="ts">
@Component({/*...*/})
export class CustomSlider {
  widthPx = input('', {transform: appendPx});
}

function appendPx(value: number): string {
  return `${value}px`;
}
</docs-code>

In the example above, the `widthPx` input accepts a `number` while the `InputSignal` property returns a `string`.
-->
입력 프로퍼티 변환 함수를 지정할 때, 변환 함수의 인자 타입에 따라 템플릿에서 입력 프로퍼티에 할당할 수 있는 타입이 결정됩니다.

<docs-code language="ts">
@Component({/*...*/})
export class CustomSlider {
  widthPx = input('', {transform: appendPx});
}

function appendPx(value: number): string {
return `${value}px`;
}
</docs-code>

위 코드처럼 구현하면 입력 프로퍼티 `widthPx`가 `InputSignal`로 문자열을 반환받더라도 `number` 타입을 인자로 받습니다.


<!--
#### Built-in transformations
-->
#### 기본 변환 함수

<!--
Angular includes two built-in transform functions for the two most common scenarios: coercing values to boolean and numbers.

<docs-code language="ts">
import {Component, input, booleanAttribute, numberAttribute} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
  disabled = input(false, {transform: booleanAttribute}); 
  value = input(0, {transform: numberAttribute}); 
}
</docs-code>

`booleanAttribute` imitates the behavior of standard HTML [boolean attributes](https://developer.mozilla.org/docs/Glossary/Boolean/HTML), where the
_presence_ of the attribute indicates a "true" value. However, Angular's `booleanAttribute` treats the literal string `"false"` as the boolean `false`.

`numberAttribute` attempts to parse the given value to a number, producing `NaN` if parsing fails.
-->
불리언 타입과 숫자 타입을 변환하는 작업은 자주 사용되기 때문에 Angular가 기본 변환 함수를 제공합니다.

<docs-code language="ts">
import {Component, input, booleanAttribute, numberAttribute} from '@angular/core';

@Component({/*...*/})
export class CustomSlider {
disabled = input(false, {transform: booleanAttribute});
value = input(0, {transform: numberAttribute});
}
</docs-code>

`booleanAttribute`는 표준 HTML [불리언 어트리뷰트](https://developer.mozilla.org/docs/Glossary/Boolean/HTML)를 따라해서 어트리뷰트 값이 _존재하면_ "true" 값으로 변환합니다.
그리고 `booleanAttribute`가 `"false"` 문자열을 받으면 불리언 `false` 값으로 변환합니다.

`numberAttribute`는 값이 주어지면 숫자로 변환합니다.
숫자 파싱이 실패하면 `NaN`로 변환됩니다.


<!--
### Input aliases
-->
### 별칭

<!--
You can specify the `alias` option to change the name of an input in templates.

<docs-code language="ts" highlight="[3]">
@Component({/*...*/})
export class CustomSlider {
  value = input(0, {alias: 'sliderValue'});
}
</docs-code>

```angular-html
<custom-slider [sliderValue]="50" />
```

This alias does not affect usage of the property in TypeScript code.

While you should generally avoid aliasing inputs for components, this feature can be useful for renaming properties while preserving an alias for the original name or for avoiding collisions with the name of native DOM element properties.
-->
템플릿에 사용하는 입력 프로퍼티 이름을 다르게 사용하려면 `alias` 옵션을 사용하면 됩니다.

<docs-code language="ts" highlight="[3]">
@Component({/*...*/})
export class CustomSlider {
  value = input(0, {alias: 'sliderValue'});
}
</docs-code>

```angular-html
<custom-slider [sliderValue]="50" />
```

이 별칭은 TypeScript 코드에서 사용하는 프로퍼티 이름에 영향을 주지 않습니다.

보통은 컴포넌트 입력 프로퍼티에 별칭을 부여하는 것은 권장하지 않지만, 이 기능은 기존 프로퍼티 이름을 유지하면서 다른 네이티브 DOM 엘리먼트 이름과 충돌하는 것을 방지하는 용도로 사용할 때는 유용합니다.


<!--
## Model inputs
-->
## 모델 입력 프로퍼티

<!--
**Model inputs** are a special type of input that enable a component to propagate new values back to its parent component.

When creating a component, you can define a model input similarly to how you create a standard input.

Both types of input allow someone to bind a value into the property. However, **model inputs allow the component author to write values into the property**. If the property is bound with a two-way binding, the new value propagates to that binding.

```typescript
@Component({ /* ... */})
export class CustomSlider {
  // Define a model input named "value".
  value = model(0);

  increment() {
    // Update the model input with a new value, propagating the value to any bindings. 
    this.value.update(oldValue => oldValue + 10);
  }
}

@Component({
  /* ... */
  // Using the two-way binding syntax means that any changes to the slider's
  // value automatically propagate back to the `volume` signal.
  // Note that this binding uses the signal *instance*, not the signal value.
  template: `<custom-slider [(value)]="volume" />`,
})
export class MediaControls {
  // Create a writable signal for the `volume` local state. 
  volume = signal(0);
}
```

In the above example, the `CustomSlider` can write values into its `value` model input, which then propagates those values back to the `volume` signal in `MediaControls`. This binding keeps the values of `value` and `volume` in sync. Notice that the binding passes the `volume` signal instance, not the _value_ of the signal.

In other respects, model inputs work similarly to standard inputs. You can read the value by calling the signal function, including in reactive contexts like `computed` and `effect`.

See [Two-way binding](guide/templates/two-way-binding) for more details on two-way binding in templates.
-->
**모델 입력 프로퍼티(Model input)** 는 컴포넌트가 부모 컴포넌트로 값을 전달하는 형태의 특별한 입력 프로퍼티입니다.

모델 입력 프로퍼티는 컴포넌트를 정의할 때 일반적인 입력 프로퍼티를 선언하는 것과 비슷하게 선언합니다.

모델 입력 프로퍼티와 일반 입력 프로퍼티는 컴포넌트 안쪽으로 값을 전달할 수 있습니다.
그런데 **모델 입력 프로퍼티는 컴포넌트 밖으로도 값을 전달할 수 있습니다.**
그래서 이 프로퍼티는 양방향으로 바인딩 할 수 있습니다.

```typescript
@Component({ /* ... */})
export class CustomSlider {
  // `value`라는 이름으로 모델 입력 프로퍼티를 선언합니다.
  value = model(0);

  increment() {
    // 모델 입력 프로퍼티 값을 변환한 후 바인딩 된 곳으로 전달합니다. 
    this.value.update(oldValue => oldValue + 10);
  }
}

@Component({
  /* ... */
  // 양방향 바인딩을 사용한다는 것은, 슬라이더의 값이 변경되면 자동으로 `volume` 시그널로 전달된다는 것을 의미합니다.
  // 이 바인딩은 시그널의 값이 아닌 시그널의 *인스턴스*를 활용합니다.
  template: `<custom-slider [(value)]="volume" />`,
})
export class MediaControls {
  // 로컬 상태를 저장하기 위해 값을 지정할 수 있는 시그널로 `volume` 프로퍼티를 선언합니다. 
  volume = signal(0);
}
```

위 예제에서 `CustomSlider`는 `value` 모델 입력 프로퍼티를 통해 값을 지정할 수 있고, 이렇게 쓴 값을 `MediaControls`의 `volume` 시그널로 전달할 수 있습니다.
이 경우 `value`와 `volume` 값은 동기화되어 유지됩니다.
바인딩 문법에서 `volume` 시그널의 _값_ 이 아니라 시그널 인스턴스라는 것에 주의하세요.

다른 측면에서는, 모델 입력 프로퍼티는 일반적인 입력 프로퍼티와 비슷하기도 합니다.
`computed`나 `effect`와 연동하는 방식을 지원하며, 시그널 함수를 실행하면 값을 읽을 수 있습니다.

양방향 바인딩을 자세하게 알아보려면 [양방향 바인딩](guide/templates/two-way-binding) 문서를 참고하세요.


<!--
### Two-way binding with plain properties
-->
### 일반 프로퍼티의 양방향 바인딩

<!--
You can bind a plain JavaScript property to a model input.

```angular-ts
@Component({
  /* ... */
  // `value` is a model input.
  // The parenthesis-inside-square-brackets syntax (aka "banana-in-a-box") creates a two-way binding
  template: '<custom-slider [(value)]="volume" />',
})
export class MediaControls {
  protected volume = 0;
}
```

In the example above, the `CustomSlider` can write values into its `value` model input, which then propagates those values back to the `volume` property in `MediaControls`. This binding keeps the values of `value` and `volume` in sync.
-->
일반적인 JavaScript 프로퍼티를 모델 입력 프로퍼티와 바인딩 할 수 있습니다.

```angular-ts
@Component({
  /* ... */
  // `value` 는 모델 입력 프로퍼티입니다.
  // `[()]` 문법은 양방향 바인딩을 의미합니다.
  template: '<custom-slider [(value)]="volume" />',
})
export class MediaControls {
  protected volume = 0;
}
```

위 예제 코드에서 `CustomSlider`는 `value` 모델 입력 프로퍼티를 통해 값을 지정할 수 있습니다.
그러면 이 값은 `MediaControls`의 `volume` 프로퍼티로 다시 전달됩니다.
결국 `value` 프로퍼티와 `volume` 프로퍼티는 동기화되어 유지됩니다.


<!--
### Implicit `change` events
-->
### `change` 이벤트

<!--
When you declare a model input in a component or directive, Angular automatically creates a corresponding [output](guide/components/outputs) for that model. The output's name is the model input's name suffixed with "Change".

```angular-ts
@Directive({ /* ... */ })
export class CustomCheckbox {
  // This automatically creates an output named "checkedChange".
  // Can be subscribed to using `(checkedChange)="handler()"` in the template.
  checked = model(false);
}
```

Angular emits this change event whenever you write a new value into the model input by calling its `set` or `update` methods.

See [Custom events with outputs](guide/components/outputs) for more details on outputs.
-->
컴포넌트나 디렉티브에 모델 입력 프로퍼티를 선언하면 Angular는 해당 모델에 해당하는 [출력 프로퍼티](guide/components/outputs)를 Angular가 자동으로 생성합니다.
이 출력 프로퍼티의 이름은 입력 프로퍼티 이름에 "Change" 접미사를 붙인 것으로 결정됩니다.

```angular-ts
@Directive({ /* ... */ })
export class CustomCheckbox {
  // "checkedChange" 출력 프로퍼티가 자동으로 생성됩니다.
  // 템플릿에서 `(checkedChange)="handler()"` 라고 지정하면 출력 프로퍼티를 구독할 수 있습니다.
  checked = model(false);
}
```

이제 모델 입력 프로퍼티에 `set` 메서드나 `update` 메서드를 사용해서 값이 변경되면, Angular가 값이 변경되었다는 이벤트를 보냅니다.

출력 프로퍼티를 자세하게 알아보려면 [출력 프로퍼티로 커스텀 이벤트 보내기](guide/components/outputs) 문서를 참고하세요.


<!--
### Customizing model inputs
-->
### 모델 입력 프로퍼티 커스터마이징하기

<!--
You can mark a model input as required or provide an alias in the same way as a [standard input](guide/signals/inputs).

Model inputs do not support input transforms.
-->
모델 입력 프로퍼티는 [일반 입력 프로퍼티](guide/signals/inputs)와 같은 방식으로 필수 여부를 지정하거나 별칭을 지정할 수 있습니다.

모델 입력 프로퍼티는 변환 함수를 지원하지 않습니다.


<!--
### When to use model inputs
-->
### 모델 입력 프로퍼티는 언제 사용할까요

<!--
Use model inputs when you want a component to support two-way binding. This is typically appropriate when a component exists to modify a value based on user interaction. Most commonly, custom form controls, such as a date picker or combobox, should use model inputs for their primary value.
-->
모델 입력 프로퍼티는 양방향 바인딩을 사용할 때 활용합니다.
이 방식은 일반적으로 사용자와 상호작용하면서 값을 수정해야 하는 경우에 적합합니다.
커스텀 폼 컨트롤이나 날짜 선택기, 콤보박스 같은 컨트롤에서 사용하는 것이 일반적입니다.


<!--
## Choosing input names
-->
## 입력 프로퍼티 이름 정하기

<!--
Avoid choosing input names that collide with properties on DOM elements like HTMLElement. Name collisions introduce confusion about whether the bound property belongs to the component or the DOM element.

Avoid adding prefixes for component inputs like you would with component selectors. Since a given element can only host one component, any custom properties can be assumed to belong to the component.
-->
HTMLElement와 같은 DOM 엘리먼트의 프로퍼티와 겹치는 이름은 사용하지 마세요.
이름이 겹치면 프로퍼티를 바인딩하는 것이 컴포넌트와 바인딩하는 것인지 DOM 엘리먼트와 바인딩하는 것인지 알 수 없습니다.

컴포넌트 셀렉터에 하듯 컴포넌트 입력 프로퍼티에 접두사를 추가하지 마세요.
엘리먼트는 컴포넌트 하나의 호스트 엘리먼트가 될 수 있기 때문에, 모든 사용자 프로퍼티는 컴포넌트에 속한 것으로 간주됩니다.


<!--
## Declaring inputs with the `@Input` decorator
-->
## `@Input` 데코레이터로 입력 프로퍼티 선언하기

<!--
TIP: While the Angular team recommends using the signal-based `input` function for new projects, the original decorator-based `@Input` API remains fully supported.

You can alternatively declare component inputs by adding the `@Input` decorator to a property:

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input() value = 0;
}
</docs-code>

Binding to an input is the same in both signal-based and decorator-based inputs:

```angular-html
<custom-slider [value]="50" />
```
-->
팁: Angular 팀은 `input` 함수를 사용해서 시그널 기반으로 선언하는 것을 권장합니다. 데코레이터 `@Input`을 사용하는 것과 기능은 같습니다.

입력 프로퍼티는 `@Input` 데코레이터를 사용해서 선언할 수도 있습니다:

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input() value = 0;
}
</docs-code>

템플릿에서 바인딩하는 방법은 시그널을 기반으로 할 때와 같습니다:

```angular-html
<custom-slider [value]="50" />
```


<!--
### Customizing decorator-based inputs
-->
### 데코레이터 기반 입력 프로퍼티를 커스터마이징하기

<!--
The `@Input` decorator accepts a config object that lets you change the way that input works.
-->
`@Input` 데코레이터는 동작방식을 지정하는 설정 객체를 인자로 받을 수 있습니다.


<!--
#### Required inputs
-->
#### 필수 입력 프로퍼티

<!--
You can specify the `required` option to enforce that a given input must always have a value.

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input({required: true}) value = 0;
}
</docs-code>

If you try to use a component without specifying all of its required inputs, Angular reports an error at build-time.
-->
`required` 옵션을 지정하면 입력 프로퍼티 값을 필수 항목으로 지정할 수 있습니다.

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input({required: true}) value = 0;
}
</docs-code>

이제 템플릿에서 필수값을 지정하지 않고 컴포넌트를 사용하면 빌드 시점에 에러가 발생합니다.


<!--
#### Input transforms
-->
#### 입력값 변환

<!--
You can specify a `transform` function to change the value of an input when it's set by Angular. This transform function works identically to transform functions for signal-based inputs described above.

<docs-code language="ts" highlight="[6]">
@Component({
  selector: 'custom-slider',
  ...
})
export class CustomSlider {
  @Input({transform: trimString}) label = '';
}

function trimString(value: string | undefined) { return value?.trim() ?? ''; }
</docs-code>
-->
입력 프로퍼티로 들어오는 값을 변환해서 사용하고 싶다면 `transform` 함수를 지정하면 됩니다.
이 변환 함수는 시그널 기반에서 다뤘던 것과 동일합니다.

<docs-code language="ts" highlight="[6]">
@Component({
  selector: 'custom-slider',
  ...
})
export class CustomSlider {
  @Input({transform: trimString}) label = '';
}

function trimString(value: string | undefined) { return value?.trim() ?? ''; }
</docs-code>


<!--
#### Input aliases
-->
#### 별칭

<!--
You can specify the `alias` option to change the name of an input in templates.

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input({alias: 'sliderValue'}) value = 0;
}
</docs-code>

```angular-html
<custom-slider [sliderValue]="50" />
```

The `@Input` decorator also accepts the alias as its first parameter in place of the config object.

Input aliases work the same way as for signal-based inputs described above.
-->
입력 프로퍼티에 별칭을 지정하려면 `alias` 옵션을 지정하면 됩니다.

<docs-code language="ts" highlight="[3]">
@Component({...})
export class CustomSlider {
  @Input({alias: 'sliderValue'}) value = 0;
}
</docs-code>

```angular-html
<custom-slider [sliderValue]="50" />
```

`@Input` 데코레이터를 사용할 때 첫번째 인자를 지정하면 설정 객체 없이 별칭을 지정할 수 있습니다.

별칭은 시그널 기반에서 다뤘던 것과 동일합니다.


<!--
### Inputs with getters and setters
-->
### 입력 프로퍼티의 게터(getter)와 세터(setter)

<!--
When using decorator-based inputs, a property implemented with a getter and setter can be an input:

<docs-code language="ts">
export class CustomSlider {
  @Input()
  get value(): number {
    return this.internalValue;
  }

set value(newValue: number) { this.internalValue = newValue; }

private internalValue = 0; }
</docs-code>

You can even create a _write-only_ input by only defining a public setter:

<docs-code language="ts">
export class CustomSlider {
  @Input()
  set value(newValue: number) {
    this.internalValue = newValue;
  }

private internalValue = 0; }
</docs-code>

**Prefer using input transforms instead of getters and setters** if possible.

Avoid complex or costly getters and setters. Angular may invoke an input's setter multiple times, which may negatively impact application performance if the setter performs any costly behaviors, such as DOM manipulation.
-->
데코레이터 기반으로 입력 프로퍼티를 선언하면서 입력 프로퍼티의 게터와 세터를 추가로 구현할 수 있습니다:

<docs-code language="ts">
export class CustomSlider {
  @Input()
  get value(): number {
    return this.internalValue;
  }

set value(newValue: number) { this.internalValue = newValue; }

private internalValue = 0; }
</docs-code>

그리고 public 세터를 정의하면 _쓰기 전용_ 입력 프로퍼티를 만들 수도 있습니다:

<docs-code language="ts">
export class CustomSlider {
  @Input()
  set value(newValue: number) {
    this.internalValue = newValue;
  }

private internalValue = 0; }
</docs-code>

가능하다면 **게터, 세터 대신 입력 프로퍼티 변환 함수를 사용하세요**.
Angular는 입력 프로퍼티의 세터를 여러번 실행할 수 있으며, 이 세터가 DOM을 조작하는 것처럼 성능에 영향을 많이 주는 경우에는 전체 애플리케이션 성능에 부정적인 영향을 미칠 수 있습니다.


<!--
## Specify inputs in the `@Component` decorator
-->
## `@Component` 데코레이터에서 입력 프로퍼티 정의하기

<!--
In addition to the `@Input` decorator, you can also specify a component's inputs with the `inputs` property in the `@Component` decorator. This can be useful when a component inherits a property from a base class:

<docs-code language="ts" highlight="[4]">
// `CustomSlider` inherits the `disabled` property from `BaseSlider`.
@Component({
  ...,
  inputs: ['disabled'],
})
export class CustomSlider extends BaseSlider { }
</docs-code>

You can additionally specify an input alias in the `inputs` list by putting the alias after a colon in the string:

<docs-code language="ts" highlight="[4]">
// `CustomSlider` inherits the `disabled` property from `BaseSlider`.
@Component({
  ...,
  inputs: ['disabled: sliderDisabled'],
})
export class CustomSlider extends BaseSlider { }
</docs-code>
-->
`@Input` 데코레이터에는 `inputs` 프로퍼티를 활용해서 입력 프로퍼티를 직접 지정할 수도 있습니다.
이 방식은 컴포넌트를 기본 클래스에서 상속받을 때 유용합니다:

<docs-code language="ts" highlight="[4]">
// `CustomSlider`는 `BaseSlider`에서 `disabled` 프로퍼티를 상속받습니다.
@Component({
  ...,
  inputs: ['disabled'],
})
export class CustomSlider extends BaseSlider { }
</docs-code>

그리고 입력 프로퍼티를 선언할 때 콜론(`:`)을 사용하면 별칭을 함께 지정할 수도 있습니다:

<docs-code language="ts" highlight="[4]">
// `CustomSlider`는 `BaseSlider`에서 `disabled` 프로퍼티를 상속받습니다.
@Component({
  ...,
  inputs: ['disabled: sliderDisabled'],
})
export class CustomSlider extends BaseSlider { }
</docs-code>
