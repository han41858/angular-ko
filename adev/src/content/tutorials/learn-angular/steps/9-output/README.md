<!--
# Component output properties
-->
# 컴포넌트 출력 프로퍼티

<!--
When working with components it may be required to notify other components that something has happened. Perhaps a button has been clicked, an item has been added/removed from a list or some other important update has occurred. In this scenario components need to communicate with parent components.

Angular uses the `output()` function to enable this type of behavior.

Note: Learn more about [custom events in the outputs guide](/guide/components/outputs).

In this activity, you'll learn how to use the `output()` function to communicate with components.

<hr />

To create the communication path from child to parent components, use the `output` function to initialize a class property.

<docs-code header="child.ts" language="ts">
@Component({...})
class Child {
  incrementCountEvent = output<number>();
}
</docs-code>

Now the component can generate events that can be listened to by the parent component. Trigger events by calling the `emit` method:

<docs-code header="child.ts" language="ts">
class Child {
  ...

onClick() {
this.count++;
this.incrementCountEvent.emit(this.count);
}
}
</docs-code>

The emit function will generate an event with the same type as defined by the `output`.

Alright, your turn to give this a try. Complete the code by following these tasks:

<docs-workflow>

<docs-step title="Add an `output()` property">
Update `child.ts` by adding an output property called `addItemEvent`, be sure to set the output type to be `string`.
</docs-step>

<docs-step title="Complete `addItem` method">
In `child.ts` update the `addItem` method; use the following code as the logic:

<docs-code header="child.ts" highlight="[2]" language="ts">
addItem() {
  this.addItemEvent.emit('🐢');
}
</docs-code>

</docs-step>

<docs-step title="Update the `App` template">
In `app.ts` update the template to listen to the emitted event by adding the following code:

```angular-html
<app-child (addItemEvent)="addItem($event)" />
```

Now, the "Add Item" button adds a new item to the list every time the button is clicked.

</docs-step>

</docs-workflow>

Wow, at this point you've completed the component fundamentals - impressive 👏

Keep learning to unlock more of Angular's great features.
-->
컴포넌트를 다루다 보면 어떤 컴포넌트에서 일어나는 일을 다른 컴포넌트가 알아야 하는 경우가 있습니다.
버튼을 클릭하거나, 목록에 항목을 추가하거나/제거하는 경우가 그렇고, 중요한 데이터 갱신이 발생하는 경우가 그렇습니다.
이런 경우에 컴포넌트는 부모 컴포넌트와 통신해야 합니다.

Angular는 `output()` 함수를 사용해서 출력 프로퍼티를 선언하는 방식으로 이런 경우를 처리합니다.

참고: 자세한 내용은 [출력 프로퍼티와 커스텀 이벤트 가이드](/guide/components/outputs) 문서를 참고하세요.

이번 예제에서는 컴포넌트 밖으로 데이터를 전달하기 위해 `output()` 함수로 출력 프로퍼티를 선언하는 방법을 알아봅시다.

<hr />

자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하려면 컴포넌트 클래스에서 `output` 함수를 사용해서 출력 프로퍼티를 선언하면 됩니다.

<docs-code header="child.ts" language="ts">
@Component({...})
class Child {
    incrementCountEvent = output<number>();
}
</docs-code>

이제 컴포넌트는 이벤트를 생성할 수 있고, 그 이벤트를 부모 컴포넌트가 감지할 수 있습니다.
`emit` 메서드를 실행해서 이벤트를 발생시켜 보세요:

<docs-code header="child.ts" language="ts">
class Child {
    ...

    onClick() {
        this.count++;
        this.incrementCountEvent.emit(this.count);
    }

}
</docs-code>

`emit` 함수는 `output` 함수를 실행할 때 지정했던 제네릭 타입으로 이벤트를 생성합니다.

좋아요, 한 번 해보세요.
아래 과정대로 진행하면 됩니다:

<docs-workflow>

<docs-step title="`output()` 함수를 실행해서 출력 프로퍼티를 추가해 보세요">

`child.ts` 파일을 열어서 `addItemEvent` 라는 이름으로 출력 프로퍼티를 선언해 보세요.
출력 프로퍼티의 타입은 `string` 으로 지정하세요.

</docs-step>

<docs-step title="`addItem` 메서드를 완성해 보세요">

`child.ts` 파일에 있는 `addItem` 메서드를 수정해 보세요.
아래처럼 구현하면 됩니다:

<docs-code header="child.ts" highlight="[2]" language="ts">
addItem() {
  this.addItemEvent.emit('🐢');
}
</docs-code>

</docs-step>

<docs-step title="`App` 컴포넌트의 템플릿을 수정해 보세요">

`app.ts` 파일을 열어서 이벤트를 감지하도록 수정해 봅시다.
아래 코드처럼 수정하면 됩니다:

```angular-html
<app-child (addItemEvent)="addItem($event)" />
```

이제 "Add Item" 버튼을 누를 때마다 목록에 새로운 항목이 추가되어 길이가 늘어납니다.

</docs-step>

</docs-workflow>

와우, 이제 컴포넌트의 기본은 모두 다뤘습니다 - 훌륭하네요 👏

이밖에도 훌륭한 Angular 기능들을 계속 알아봅시다.
