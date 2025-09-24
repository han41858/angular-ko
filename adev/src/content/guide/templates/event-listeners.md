<!--
# Adding event listeners
-->
# 이벤트 리스너 추가하기

<!--
Angular supports defining event listeners on an element in your template by specifying the event name inside parentheses along with a statement that runs every time the event occurs.
-->
Angular를 활용하면 템플릿에 있는 엘리먼트에서 발생하는 이벤트를 감지하고 이벤트가 발생할 때마다 실행되는 이벤트 리스너를 정의해서 연결할 수 있습니다.


<!--
## Listening to native events
-->
## 기본 이벤트 감지하기

<!--
When you want to add event listeners to an HTML element, you wrap the event with parentheses, `()`, which allows you to specify a listener statement.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class AppComponent{
  updateField(): void {
    console.log('Field is updated!');
  }
}
```

In this example, Angular calls `updateField` every time the `<input>` element emits a `keyup` event.

You can add listeners for any native events, such as: `click`, `keydown`, `mouseover`, etc. To learn more, check out the [all available events on elements on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element#events).
-->
HTML 엘리먼트에서 발생하는 이벤트를 감지하려면, 이벤트 이름을 괄호(`(`, `)`)로 감싸고 리스너 실행문을 연결하면 됩니다.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class AppComponent{
  updateField(): void {
    console.log('Field is updated!');
  }
}
```

위 코드처럼 구현하면 `<input>` 엘리먼트에서 `keyup` 이벤트가 발생할 때마다 Angular는 `updateField()` 함수를 실행합니다.

`click`, `keydown`, `mouseover` 등 HTML이 기본으로 지원하는 이벤트는 이렇게 간단하게 이벤트 리스너와 연결할 수 있습니다.
더 자세한 내용은 [엘리먼트에서 발생하는 이벤트 목록](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) 문서를 참고하세요.


<!--
## Accessing the event argument
-->
## 이벤트 객체 접근하기

<!--
In every template event listener, Angular provides a variable named `$event` that contains a reference to the event object.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
```
-->
템플릿에서 이벤트 리스너를 연결할 때 Angular가 제공하는 `$event` 변수를 사용하면 이벤트 객체를 참조할 수 있습니다.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
```


<!--
## Using key modifiers
-->
## 특정 키에만 반응하기

<!--
When you want to capture specific keyboard events for a specific key, you might write some code like the following:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}
```

However, since this is a common scenario, Angular lets you filter the events by specifying a specific key using the period (`.`) character. By doing so, code can be simplified to:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class AppComponent{
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
}
```

You can also add additional key modifiers:

```angular-html
<!- Matches shift and enter ->
<input type="text" (keyup.shift.enter)="updateField($event)" />
```

Angular supports the modifiers `alt`, `control`, `meta`, and `shift`.

You can specify the key or code that you would like to bind to keyboard events. The key and code fields are a native part of the browser keyboard event object. By default, event binding assumes you want to use the [Key values for keyboard events](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_key_values).

Angular also allows you to specify [Code values for keyboard events](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_code_values) by providing a built-in `code` suffix.

```angular-html
<!- Matches alt and left shift ->
<input type="text" (keydown.code.alt.shiftleft)="updateField($event)" />
```

This can be useful for handling keyboard events consistently across different operating systems. For example, when using the Alt key on MacOS devices, the `key` property reports the key based on the character already modified by the Alt key. This means that a combination like Alt + S reports a `key` value of `'ß'`. The `code` property, however, corresponds to the physical or virtual button pressed rather than the character produced.
-->
키보드 이벤트 중 특정 키를 감지해야 할 때는 다음과 같이 구현하면 됩니다:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}
```

이 방식도 좋지만, Angular는 키보드 이벤트 이름에 마침표(`.`)를 붙인 후 원하는 키만 감지할 수도 있습니다.
그러면 코드가 더 간단해집니다:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class AppComponent{
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
}
```

여러 키를 조합하는 경우는 이렇게 구현합니다:

```angular-html
<!-- shift 키와 엔터키 조합과 매칭됩니다. -->
<input type="text" (keyup.shift.enter)="updateField($event)" />
```

Angular는 `alt`, `control`, `meta`, `shift` 키조합도 지원합니다.

키보드 이벤트는 키 이름나 코드를 사용해서 바인딩할 수 있습니다.
키 값이나 코드 값은 브라우저 키보드 이벤트 객체를 기반으로 하며, [키보드 이벤트의 키 값](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_key_values)을 따른다고 가정합니다.

Angular에서는 `code` 접미사를 사용해서 [키보드 이벤트의 코드 값](https://developer.mozilla.org/docs/Web/API/UI_Events/Keyboard_event_code_values)을 활용할 수도 있습니다.

```angular-html
<!-- alt 키와 왼쪽 shift 키 조합과 매칭됩니다. -->
<input type="text" (keydown.code.alt.shiftleft)="updateField($event)" />
```

이 방식은 운영체제와 관계없이 키보드 이벤트를 다뤄야 할 때 유용합니다.
예를 들면, MacOS 장치에서 Alt 키는 기능키가 아니라 다른 문자셋을 입력하는 것으로 동작합니다.
그래서 Alt + S 라고 지정하면 `'ß'` 문자를 감지합니다.
하지만 `code` 프로퍼티를 사용하는 경우에는 문자셋과 관계없이 실제로 눌린 키조합에 반응합니다.


<!--
## Preventing event default behavior
-->
## 이벤트 전파 중단하기

<!--
If your event handler should replace the native browser behavior, you can use the event object's [`preventDefault` method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault):

```angular-ts
@Component({
  template: `
    <a href="#overlay" (click)="showOverlay($event)">
  `,
  ...
})
export class AppComponent{
  showOverlay(event: PointerEvent): void {
    event.preventDefault();
    console.log('Show overlay without updating the URL!');
  }
}
```

If the event handler statement evaluates to `false`, Angular automatically calls `preventDefault()`, similar to [native event handler attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes#event_handler_attributes). *Always prefer explicitly calling `preventDefault`*, as this approach makes the code's intent obvious.
-->
이벤트 핸들러를 실행하면서 브라우저의 기본 동작을 중단해야 한다면 이벤트 객체의 [`preventDefault` 메서드](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)를 실행하면 됩니다:

```angular-ts
@Component({
  template: `
    <a href="#overlay" (click)="showOverlay($event)">
  `,
  ...
})
export class AppComponent{
  showOverlay(event: PointerEvent): void {
    event.preventDefault();
    console.log('Show overlay without updating the URL!');
  }
}
```

Angular에서는 [기본 이벤트 핸들러 어트리뷰트](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes#event_handler_attributes)와 비슷하게, 이벤트 핸들러 실행문이 `false`로 평가되면 `preventDefault()`를 자동으로 실행합니다.
*`preventDefault()` 실행이 필요한 경우라면 반드시 명시적으로 이 메서드를 실행하세요.*
그래야 코드의 의도가 명확해집니다.
