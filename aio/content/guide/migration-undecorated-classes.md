<!--
# Missing `@Directive()`/`@Component()` decorator migration
-->
# 누락된 `@Directive()`/`@Component()` 데코레이터 마이그레이션 하기

<!--
## What does this migration do?
-->
## 무엇을 수정하는 마이그레이션인가요?

<!--
This migration adds an empty `@Directive()` decorator to undecorated
base classes that:

*   Angular 프레임워크 기능을 활용하는 클래스이며
*   Are extended by directives or components

For example, in the diff below, a `@Directive()` decorator is added to `BaseMenu` because `BaseMenu` uses dependency injection.

**Before**:
-->
이 마이그레이션은 데코레이터가 지정되지 않은 클래스에 `@Directive()` 데코레이터를 메타데이터 없이 지정하는 것입니다.
이 데코레이터를 지정해야 하는 대상은:

*   Use Angular features
*   디렉티브/컴포넌트로 상속되는 클래스입니다.

예제와 함께 봅시다.
아래 예제 코드에서 `BaseMenu` 클래스에는 `@Directive()` 데코레이터가 지정되었습니다.
`BaseMenu`가 의존성 주입을 사용하기 때문입니다.

**수정 전:**

<code-example format="typescript" language="typescript">

export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

&commat;Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}

</code-example>

<!--
**After**:
-->
**수정 후:**

<code-example format="typescript" language="typescript">

&commat;Directive()
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

&commat;Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}

</code-example>

<!--
In the event that a directive or component is extended by a class without a decorator, the schematic copies any inherited directive or component metadata to the derived class.

**Before**:
-->
이 때 데코레이터가 지정된 디렉티브/컴포넌트 클래스를 상속하면 자식 클래스에도 디렉티브/컴포넌트 메타데이터의 내용이 복사됩니다.

**수정 전:**

<code-example format="typescript" language="typescript">

&commat;Component({
  selector: 'base-menu',
  template: '&lt;div&gt;&lt;/div&gt;'
})
class BaseMenu {}

export class SettingsMenu extends BaseMenu {}

</code-example>

<!--
**After**:
-->
**수정 후:**

<code-example format="typescript" language="typescript">

&commat;Component({
  selector: 'base-menu',
  template: '&lt;div&gt;&lt;/div&gt;'
})
class BaseMenu {}

&commat;Component({
  selector: 'base-menu',
  template: '&lt;div&gt;&lt;/div&gt;'
})
export class SettingsMenu extends BaseMenu {}

</code-example>

<!--
This schematic also decorates classes that use Angular field decorators, including:

*   `@Input()`
*   `@Output()`
*   `@HostBinding()`
*   `@HostListener()`
*   `@ViewChild()` / `@ViewChildren()`
*   `@ContentChild()` / `@ContentChildren()`

**Before**:
-->
이 동작은 필드에 지정하는 데코레이터들에서도 같습니다:

*   `@Input()`
*   `@Output()`
*   `@HostBinding()`
*   `@HostListener()`
*   `@ViewChild()` / `@ViewChildren()`
*   `@ContentChild()` / `@ContentChildren()`

**수정 전:**

<code-example format="typescript" language="typescript">

class Base {
  &commat;Output()
  countChanged = new EventEmitter&lt;number&gt;();
}

&commat;Directive({
  selector: '[myDir]'
})
class Dir extends Base {
}

</code-example>

<!--
**After**:
-->
**수정 후:**

<code-example format="typescript" language="typescript">

&commat;Directive() // schematic adds &commat;Directive()
class Base {
  &commat;Output()
  countChanged = new EventEmitter&lt;number&gt;();
}

&commat;Directive({
  selector: '[myDir]'
})
class Dir extends Base {
}

</code-example>


<!--
## Why is this migration necessary?
-->
## 왜 변경되었나요?

<!--
### Migrating classes that use DI
-->
### 의존성 주입을 활용하는 클래스를 위한 것입니다.

<!--
When a class has a `@Directive()` or `@Component()` decorator, the Angular compiler generates extra code to inject dependencies into the constructor.
When using inheritance, Ivy needs both the parent class and the child class to apply a decorator to generate the correct code.

You can think of this change as two cases: a parent class is missing a decorator or a child class is missing a decorator.
In both scenarios, Angular's runtime needs additional information from the compiler.
This additional information comes from adding decorators.
-->
클래스에 `@Directive()`, `@Component()` 데코레이터가 지정되면 Angular 컴파일러는 이 클래스에 의존성 객체를 주입할 수 있도록 코드를 추가로 생성합니다.

이 때 두 가지 경우를 생각해볼 수 있습니다.
부모 클래스에 데코레이터가 누락된 경우와 자식 클래스에 데코레이터가 누락된 경우입니다.
두 경우 모두 Angular는 실행시점에 필요한 추가 정보를 컴파일러에게 요청합니다.


<!--
#### Decorator missing from parent class
-->
#### 부모 클래스에 데코레이터가 누락된 경우

<!--
When the decorator is missing from the parent class, the subclass will inherit a constructor from a class for which the compiler did not generate special constructor info \(because it was not decorated as a directive\).
When Angular then tries to create the subclass, it doesn't have the correct info to create it.

In View Engine, the compiler has global knowledge, so it can look up the missing data.
However, the Ivy compiler only processes each directive in isolation.
This means that compilation can be faster, but the compiler can't automatically infer the same information as before.
Adding the `@Directive()` explicitly provides this information.

In the future, add `@Directive()` to base classes that do not already have decorators and are extended by directives.
-->
데코레이터가 누락된 부모 클래스를 상속하면 Angular 컴파일러가 의존성 주입 정보를 생성할 수 없습니다.
이 시점에 부모 클래스는 디렉티브가 아니기 때문입니다.
Angular가 자식 클래스를 생성하려고 해도 이 클래스를 생성하려는 정보를 제대로 참조할 수 없습니다.

View Engine을 사용할 때는 Angular 컴파일러가 전역 범위에 관여했기 때문에 일부 정보가 누락되어도 전역 범위에서 이 정보를 찾을 수 있었습니다.
하지만 Ivy 컴파일러는 개별 디렉티브를 별도로 처리하기 때문에, 컴파일 시간이 줄어들긴 했지만 누락된 정보를 자동으로 추론할 수 없습니다.
그래서 이 정보를 확실하게 추가하기 위해 `@Directive()` 데코레이터를 추가해야 합니다.


<!--
#### Decorator missing from child class
-->
#### 자식 클래스에 데코레이터가 누락된 경우

<!--
When the child class is missing the decorator, the child class inherits from the parent class yet has no decorators of its own.
Without a decorator, the compiler has no way of knowing that the class is a `@Directive` or `@Component`, so it doesn't generate the proper instructions for the directive.
-->
자식 클래스에 데코레이터가 누락되면 자식 클래스는 부모 클래스에 있는 정보를 일부 끌어옵니다.
하지만 자식 클래스에는 데코레이터가 없기 때문에 컴파일러는 이 클래스가 `@Directive`인지 `@Component`인지 알 수 없습니다.
디렉티브가 제대로 생성되지 않을 수 잇습니다.


<!--
### Migrating classes that use field decorators
-->
### 필드 데코레이터를 사용하는 클래스

<!--
In ViewEngine, base classes with field decorators like `@Input()` worked even when the class did not have a `@Directive()` or `@Component()` decorator.
For example:

<code-example format="typescript" language="typescript">

class Base {
  &commat;Input()
  foo: string;
}

&commat;Directive(&hellip;)
class Dir extends Base {
  ngOnChanges(): void {
    // notified when bindings to [foo] are updated
  }
}

</code-example>

However, this example won't compile with Ivy because the `Base` class *requires* either a `@Directive()` or `@Component()` decorator to generate code for inputs, outputs, queries, and host bindings.

Always requiring a class decorator leads to two main benefits for Angular:

1.  The previous behavior was inconsistent.
    Some Angular features required a decorator \(dependency injection\), but others did not.
    Now, all Angular features consistently require a class decorator.

1.  Supporting undecorated classes increases the code size and complexity of Angular.
    Always requiring class decorators allows the framework to become smaller and simpler for all users.
-->
View Engine을 사용할 때는 클래스에 `@Directive()`, `@Component()` 데코레이터를 지정하지 않아도 필드에 `@Input()`과 같은 필드 데코레이터를 사용할 수 있었습니다:

<code-example format="typescript" language="typescript">

class Base {
  &commat;Input()
  foo: string;
}

&commat;Directive(&hellip;)
class Dir extends Base {
  ngOnChanges(): void {
    // [foo]에 바인딩된 객체가 변경될 때 실행됩니다.
  }
}

</code-example>

하지만 이 코드는 컴파일되지 않습니다.
Ivy에서는 클래스 안에서 입출력 데코레이터, 쿼리, 호스트 바인딩을 사용하려면 반드시 `@Directive()`나 `@Component()` 데코레이터를 _꼭_ 지정해야 합니다.

클래스 데코레이터를 꼭 지정하도록 변경하면서 이런 이점도 얻었습니다:

1.  이전에 사용되던 방식은 일관성이 없었습니다.
    의존성 주입과 관련된 데코레이터는 필수로 지정해야 했지만 다른 데코레이터는 아니었습니다.
    이제는 모든 데코레이터를 꼭 지정해야 합니다.

1.  클래스에 데코레이터를 자동으로 추가하는 로직은 Angular 자체의 코드 용량과 복잡도를 증가시킵니다.
    데코레이터가 필요한 자리에 항상 있다면 Angular의 크기도 작아지고 더 간결해 질 것입니다.


<!--
## What does it mean to have a `@Directive()` decorator with no metadata inside of it?
-->
## 메타데이터가 없는 `@Directive()` 데코레이터는 무엇을 의미하나요?

<!--
The presence of the `@Directive` decorator causes Angular to generate extra code for the affected class.
If that decorator includes no properties \(metadata\), the directive won't be matched to elements or instantiated directly, but other classes that *extend* the directive class will inherit this generated code.
You can think of this as an "abstract" directive.

Adding an abstract directive to an `NgModule` will cause an error.
A directive must have a `selector` property defined in order to match some element in a template.
-->
클래스에 `@Directive` 데코레이터를 지정하면 Angular는 이 클래스에 영향을 주는 코드를 추가로 생성합니다.
이 때 데코레이터에 전달되는 프로퍼티(메타데이터)가 없으면 이 디렉티브가 엘리먼트와 매칭되거나 인스턴스 생성용으로 사용되지는 않지만, 해당 클래스를 _상속받는_ 다른 클래스들이 이 때 생성된 추가 정보를 활용할 수 있습니다.
"추상" 디렉티브라고 이해해도 됩니다.

하지만 추상 디렉티브를 `NgModule`에 추가하면 에러가 발생합니다.
디렉티브는 템플릿 안에서 엘리먼트와 매칭되어야 하기 때문에 `selector` 프로퍼티가 반드시 지정되어야 합니다.


<!--
## When do I need a `@Directive()` decorator without a selector?
-->
## 셀렉터가 없는 `@Directive()` 데코레이터는 언제 사용하나요?

<!--
If you're using dependency injection, or any Angular-specific feature, such as `@HostBinding()`, `@ViewChild()`, or `@Input()`, you need a `@Directive()` or `@Component()` decorator.
The decorator lets the compiler know to generate the correct instructions to create that class and any classes that extend it.
If you don't want to use that base class as a directive directly, leave the selector blank.
If you do want it to be usable independently, fill in the metadata as usual.

Classes that don't use Angular features don't need an Angular decorator.
-->
의존성 주입이나 `@HostBinding()`, `@ViewChild()`, `@Input()`과 같은 Angular의 기능을 활용하려면 클래스에 반드시 `@Directive()`나 `@Component()` 데코레이터를 지정해야 합니다.
그래야 Angular 컴파일러가 이 클래스를 생성할 때 정보를 제대로 확인할 수 있으며, 이후에 이 클래스를 상속받는 클래스도 제대로 생성될 수 있습니다.
하지만 부모 클래스를 직접 디렉티브로 사용하지 않는다면 셀렉터를 지정하지 않아도 됩니다.
셀렉터는 꼭 필요한 경우에만 지정합니다.

Angular의 기능을 활용하지 않는 클래스라면 Angular 데코레이터를 지정하지 않아도 됩니다.


<!--
## I'm a library author. Should I add the `@Directive()` decorator to base classes?
-->
## 라이브러리에도 부모 클래스에 `@Directive()` 데코레이터를 추가해야 하나요?

<!--
As support for selectorless decorators is introduced in Angular version 9, if you want to support Angular version 8 and earlier, you shouldn't add a selectorless `@Directive()` decorator.
You can either add `@Directive()` with a selector or move the Angular-specific features to affected subclasses.
-->
셀렉터 없이 사용하는 데코레이터는 Angular 9 버전에 추가되었기 때문에 Angular 9 이전 버전에 활용되는 라이브러리를 만든다면 `@Directive()` 데코레이터에서 셀렉터를 생략할 수 없습니다.
이런 경우라면 `@Directive()`에 셀렉터를 추가하거나, Angular 관련 기능을 자식 클래스로 옮겨야 합니다.


<!--
## What about applications using non-migrated libraries?
-->
## 마이그레이션이 적용되지 않은 라이브러리는 어떻게 사용하나요?

<!--
The [Angular compatibility compiler](guide/glossary#ngcc) \(`ngcc`\) should automatically transform any non-migrated libraries to generate the proper code.
-->
[Angular 호환성 컴파일러(Angular compatibility compiler, ngcc)](guide/glossary#ngcc)는 마이그레이션이 적용되지 않은 코드도 제대로 동작할 수 있도록 코드를 자동으로 변환합니다.
그대로 사용해도 문제 없습니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
