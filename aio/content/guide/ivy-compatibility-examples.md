<!--
# Ivy compatibility examples
-->
# Ivy 호환성 예제

<!--
This appendix is intended to provide more background on Ivy changes. Many of these examples list error messages you may see, so searching by error message might be a good idea if you are debugging.

<div class="alert is-critical">
NOTE: Most of these issues affect a small percentage of applications encountering unusual or rare edge cases.
</div>
-->
이 문서는 Ivy 도입에 고려해야 할 내용을 설명하는 문서입니다.
Ivy를 적용하면서 발생할 수 있는 에러를 어떻게 처리할 수 있는지지 예제와 함께 다루기 때문에, 디버깅하는 데에도 도움이 될 것입니다.


<div class="alert is-critical">

참고: 이 문서에서 다루는 에러들은 실제 애플리케이션에서 발생하는 비중이 아주 작습니다.

</div>


{@a content-children-descendants}
<!--
## @ContentChildren queries only match direct children by default
-->
## @ContentChildren 은 바로 아래 자식들만 탐색합니다.


<!--
### Basic example of change
-->
### 예제

<!--
Let's say a component (`Comp`) has a `@ContentChildren` query for `'foo'`:

```html
<comp>
    <div>
         <div #foo></div>   <!- matches in old runtime, not in new runtime ->
    </div>
</comp>
```

In the previous runtime, the `<div>` with `#foo` would match.
With Ivy, that `<div>` does not match because it is not a direct child of `<comp>`.
-->
컴포넌트(`<comp>`)에서 `@ContentChildren`으로 `'foo'`를 탐색한다고 합시다:

```html
<comp>
    <div>
         <div #foo></div>   <!-- 이전에는 이 엘리먼트가 매칭되었지만 이제는 아닙니다. -->
    </div>
</comp>
```

View Engine에서는 `#foo`가 지정된 `<div>`가 매칭되었습니다.
하지만 Ivy에서는 이 `<div>`가 `<comp>`의 바로 아래 자식이 아니기 때문에 매칭되지 않습니다.


<!--
### Background
-->
### 변경된 이유

<!--
By default, `@ContentChildren` queries have the `descendants` flag set to `false`.

In the previous rendering engine, "descendants" referred to "descendant directives".
An element could be a match as long as there were no other directives between the element and the requesting directive.
This made sense for directives with nesting like tabs, where nested tab directives might not be desirable to match.
However, this caused surprising behavior for users because adding an unrelated directive like `ngClass` to a wrapper element could invalidate query results.

For example, with the content query and template below, the last two `Tab` directives would not be matches:

```
@ContentChildren(Tab, {descendants: false}) tabs: QueryList<Tab>
```

```
<tab-list>
  <div>
    <tab> One </tab>     <!- match (nested in element) ->
  </div>
  <tab>                  <!- match (top level) ->
    <tab> A </tab>       <!- not a match (nested in tab) ->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!- not a match (nested in ngClass) ->
  </div>
</tab-list>
```

In addition, the differences between type and string predicates were subtle and sometimes unclear.
For example, if you replace the type predicate above with a `'foo'` string predicate, the matches change:

```
@ContentChildren('foo', {descendants: false}) foos: QueryList<ElementRef>
```

```
<tab-list>
  <div>
    <div #foo> One </div>     <!- match (nested in element) ->
  </div>
  <tab #foo>                  <!- match (top level) ->
    <div #foo> A </div>       <!- match (nested in tab) ->
  </tab>
  <div [ngClass]="classes">
    <div #foo> Two </div>     <!- match (nested in ngClass) ->
  </div>
</tab-list>
```

Because the previous behavior was inconsistent and surprising to users, we did not want to reproduce it in Ivy.
Instead, we simplified the mental model so that "descendants" refers to DOM nesting only.
Any DOM element between the requesting component and a potential match will invalidate that match.
Type predicates and string predicates also have identical matching behavior.

Ivy behavior for directive/string predicates:
```
<tab-list>
  <div>
    <tab> One </tab>     <!- not a match (nested in element) ->
  </div>
  <tab>                  <!- match (top level) ->
    <tab> A </tab>       <!- not a match (nested in tab) ->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!- not a match (nested in div) ->
  </div>
</tab-list>
```
-->
`@ContentChildren`의 `descendants` 플래그 기본값은 `false` 입니다.

View Engine에서 "descendants"는 "descendant directives"를 의미했습니다.
그래서 다른 디렉티브가 사용되지 않는 이상 원하는 디렉티브를 매칭시킬 수 있었습니다.
매칭시킬 대상을 선별해야 하는 탭을 구성하는 상황이라면 이런 동작도 활용할만 합니다.
하지만 이런 동작 방식은 `ngClass`와 같이 엘리먼트를 감싸는 다른 디렉티브가 사용되면 원하는 엘리먼트를 찾지 못하는 경우가 있었습니다.

컨텐츠를 찾는 코드와 템플릿이 이렇게 구성되었다고 합시다.
이 템플릿에서 마지막 `Tab` 디렉티브는 매칭되지 않습니다:

```
@ContentChildren(Tab, {descendants: false}) tabs: QueryList<Tab>
```

```
<tab-list>
  <div>
    <tab> One </tab>     <!-- 매칭됩니다. (엘리먼트 안쪽에 있는 대상) -->
  </div>
  <tab>                  <!-- 매칭됩니다. (바로 아래 자식) -->
    <tab> A </tab>       <!-- 매칭되지 않습니다. (디렉티브 안쪽에 있는 대상) -->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!-- 매칭되지 않습니다. (ngClass 안쪽에 있는 대상) -->
  </div>
</tab-list>
```

게다가 디렉티브 타입을 사용하는 방식 외에 이름으로 탐색하는 방식은 결과가 다르고 모호한 부분이 있었습니다.
위 예제에서 지정했던 `Tab` 타입을 `'foo'` 문자열로 바꿨다고 합시다:

```
@ContentChildren('foo', {descendants: false}) foos: QueryList<ElementRef>
```

```
<tab-list>
  <div>
    <div #foo> One </div>     <!-- 매칭됩니다. (엘리먼트 안쪽에 있는 대상) -->
  </div>
  <tab #foo>                  <!-- 매칭됩니다. (바로 아래 자식) -->
    <div #foo> A </div>       <!-- 매칭됩니다. (디렉티브 안쪽에 있는 대상) -->
  </tab>
  <div [ngClass]="classes">
    <div #foo> Two </div>     <!-- 매칭됩니다. (ngClass 안쪽에 있는 대상) -->
  </div>
</tab-list>
```

두 방식의 결과가 다르지만 이 중에서는 첫 번째 결과가 더 이상했으며, 이 문제를 Ivy에서 해결해야 했습니다.
그래서 Ivy에서는 "descendants"가 중첩된 DOM 안쪽만 의미하는 것으로 개념을 변경했습니다.
이제 탐색하려는 대상이 엘리먼트나 디렉티브 안쪽에 존재하면 매칭되지 않습니다.
타입으로 탐색하거나 문자열로 쿼리해도 결과도 같습니다.

Ivy 에서는 이렇게 동작합니다:

```
<tab-list>
  <div>
    <tab> One </tab>     <!-- 매칭되지 않습니다. (엘리먼트 안쪽에 있는 대상) -->
  </div>
  <tab>                  <!-- 매칭됩니다. (바로 아래 자식) -->
    <tab> A </tab>       <!-- 매칭되지 않습니다. (디렉티브 안쪽에 있는 대상) -->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!-- 매칭되지 않습니다. (ngClass 안쪽에 있는 대상) -->
  </div>
</tab-list>
```


<!--
### Example of error
-->
### 관련 에러

<!--
The error message that you see will depend on how the particular content query is used in the application code.
Frequently, an error is thrown when a property is referenced on the content query result (which is now `undefined`).

For example, if the component sets the content query results to a property, `foos`, `foos.first.bar` would throw the error:

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

If you see an error like this, and the `undefined` property refers to the result of a `@ContentChildren` query, it may well be caused by this change.
-->
`@ContentChildren`을 사용할 때는 이 데코레이터를 어떻게 사용했느냐에 따라 발생하는 에러가 달라집니다.
보통은 찾지 못한 자식의 프로퍼티를 참조했을 때 에러가 발생하는 경우가 가장 많습니다.

컴포넌트가 컨텐츠를 탐색한 결과를 `foos` 프로퍼티에 할당했다고 하고, 이 프로퍼티를 `foos.first.bar`라는 식으로 사용하면 이런 에러가 발생할 수 있습니다:

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

`@ContentChildren` 결과를 참조했는데 `undefined` 객체 안에 있는 프로퍼티를 참조하는 에러가 발생했다면, 이 변경사항 때문에 발생한 문제일 수 있습니다.


<!--
### Recommended fix
-->
### 해결방법

<!--
You can either add the `descendants: true` flag to ignore wrapper elements or remove the wrapper elements themselves.

Option 1:
```
@ContentChildren('foo', {descendants: true}) foos: QueryList<ElementRef>;
```

Option 2:
```
<comp>
   <div #foo></div>   <!- matches in both old runtime and  new runtime ->
</comp>
```
-->
탐색 대상을 감싸는 엘리먼트/디렉티브가 있어도 매칭되게 하려면 `descendants: true` 플래그를 지정하면 됩니다.

클래스 코드 수정:
```
@ContentChildren('foo', {descendants: true}) foos: QueryList<ElementRef>;
```


템플릿 코드:
```
<comp>
   <div #foo></div>   <!-- View Engine, Ivy 모두 동작합니다. -->
</comp>
```


{@a undecorated-classes}
<!--
## All classes that use Angular DI must have an Angular class-level decorator
-->
## Angular DI로 주입되는 클래스는 반드시 클래스 계층 데코레이터가 지정되어야 합니다.


<!--
### Basic example of change:
-->
### 예제

<!--
In the previous rendering engine, the following would work:

```
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

In Ivy, it will throw an error because `DataService` is using Angular dependency injection, but is missing an `@Injectable` decorator.

The following would also work in the previous rendering engine, but in Ivy would require a `@Directive` decorator because it uses DI:

```
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```

The same is true if your directive class extends a decorated directive, but does not have a decorator of its own.

If you're using the CLI, there are two automated migrations that should transition your code for you ([this one](guide/migration-injectable) and [this one](guide/migration-undecorated-classes)).
However, as you're adding new code in version 9, you may run into this difference.
-->
View Engine에서는 이런 코드도 동작했습니다:

```
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

하지만 Ivy에서는 `DataService`가 Angular 의존성 시스템의 대상이 되지만 `@Injectable` 데코레이터가 사용되지 않았기 때문에 에러가 발생합니다.

그래서 View Engine과 Ivy에서 모두 동작하려면 아래 코드처럼 `@Directive` 데코레이터를 추가하면 됩니다:

```
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```

이 문제는 데코레이터가 지정된 디렉티브를 데코레이터 없이 상속받는 상황에서도 발생합니다.

Angular CLI를 사용한다면 [`@Injectable` 마이그레이션](guide/migration-injectable)과 [데코레이터가 없는 클래스 마이그레이션](guide/migration-undecorated-classes)이 자동으로 실행되기 때문에 기존 코드를 쉽게 마이그레이션할 수 있습니다.
Angular 9 버전 이후부터는 코드를 작성할 때 이 내용에 신경써야 합니다.


<!--
### Background
-->
### 변경된 이유

<!--
When a class has an Angular decorator like `@Injectable` or `@Directive`, the Angular compiler generates extra code to support injecting dependencies into the constructor of your class.
When using inheritance, Ivy needs both the parent class and the child class to apply a decorator to generate the correct code.
Otherwise, when the decorator is missing from the parent class, the subclass will inherit a constructor from a class for which the compiler did not generate special constructor info, and Angular won't have the dependency info it needs to create it properly.

In the previous rendering engine, the compiler had global knowledge, so in some cases (such as AOT mode or the presence of certain injection flags), it could look up the missing data.
However, the Ivy compiler only processes each class in isolation.
This means that compilation has the potential to be faster (and opens the framework up for optimizations and features going forward), but the compiler can't automatically infer the same information as before.

Adding the proper decorator explicitly provides this information.
-->
클래스에 `@Injectable`, `@Directive` 같은 Angular 데코레이터가 지정되면, Angular 컴파일러는 이 데코레이터가 지정된 클래스를 의존성으로 주입할 수 있도록 추가 코드를 생성합니다.
그리고 Ivy에서는 부모/자식 관계일 때 부모 클래스와 자식 클래스에 모두 데코레이터가 지정되어 있어야 올바른 코드를 생성할 수 있습니다.
만약 부모 클래스에 데코레이터가 지정되어 있지 않으면 자식 클래스가 의존성 주입에 필요한 정보 없이 클래스 생성자를 상속받게 되고, Angular 컴파일러는 클래스를 생성할 때 필요한 추가 정보를 생성하지 않아서 결국 Angular 의존성 주입 시스템이 정확한 의존성 관계를 파악할 수 없습니다.

View Engine을 사용할 때는 컴파일러가 전체 범위에 관여했기 때문에, AOT 모드나 특정 플래그가 사용되는 일부 경우에만 해당 정보를 찾을 수 없다는 에러가 발생했습니다.
하지만 Ivy 컴파일러는 개별 클래스를 별개로 처리하기 때문에 앞으로 컴파일 속도가 개선될 여지가 있다는 면에서는 좋지만, 다른 클래스의 정보를 확인할 수 없습니다.

이 문제를 해결하려면 적절한 데코레이터를 추가하면 됩니다.


<!--
### Example of error
-->
### 관련 에러

<!--
In JIT mode, the framework will throw the following error:

```
ERROR: This constructor is not compatible with Angular Dependency Injection because its dependency at index X of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index X is correct and 2) the correct Angular decorators are defined for this class and its ancestors.
```

In AOT mode, you'll see something like:

```
X inherits its constructor from Y, but the latter does not have an Angular decorator of its own.
Dependency injection will not be able to resolve the parameters of Y's constructor. Either add a
@Directive decorator to Y, or add an explicit constructor to X.
```

In some cases, the framework may not be able to detect the missing decorator.
In these cases, you'll generally see a runtime error thrown when there is a property access attempted on the missing dependency.
If dependency was `foo`, you'd see an error when accessing something like `foo.bar`:

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

If you see an error like this, and the `undefined` value refers to something that should have been injected, it may be this change.
-->
JIT 모드에서는 이런 에러가 발생할 수 있습니다:

```
ERROR: This constructor is not compatible with Angular Dependency Injection because its dependency at index X of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index X is correct and 2) the correct Angular decorators are defined for this class and its ancestors.
```

그리고 AOT 모드에서는 이런 에러가 발생할 수 있습니다:

```
X inherits its constructor from Y, but the latter does not have an Angular decorator of its own.
Dependency injection will not be able to resolve the parameters of Y's constructor. Either add a
@Directive decorator to Y, or add an explicit constructor to X.
```

Angular가 이 문제를 발견할 수 없는 경우도 가끔 있습니다.
이런 경우에는 에러 로그를 보면서 Angular가 찾지 못하는 의존성 객체가 제대로 선언되어 있는지 확인하면 됩니다.
의존성 객체가 `foo`이고 `foo.bar` 라고 참조할 때 에러가 발생한다면 이런 에러 메시지가 표시됩니다:

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

`undefined`에 해당하는 객체가 의존성 주입된 객체라면 이 변경사항과 관련된 문제일 수 있습니다.


<!--
### Recommended fix
-->
### 해결방법

<!--
- Add an `@Injectable` decorator to anything you plan to provide or inject.

```
@Injectable()
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

- Add a [selectorless `@Directive` decorator](guide/migration-undecorated-classes#what-does-it-mean-to-have-a-directive-decorator-with-no-metadata-inside-of-it) to any class that extends a directive or any class from which a directive inherits.

```
@Directive()            // selectorless, so it's not usable directly
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```
-->
- 프로바이더로 등록하거나 의존성 주입 대상이라면 `@Injectable` 데코레이터를 추가하면 됩니다.

```
@Injectable()
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

- 다른 클래스가 상속받는 부모 디렉티브 클래스라면 [셀렉터가 없는 `@Directive` 데코레이터](guide/migration-undecorated-classes#what-does-it-mean-to-have-a-directive-decorator-with-no-metadata-inside-of-it)를 추가하세요.

```
@Directive()            // 셀렉터를 지정하지 않습니다. 이 디렉티브는 직접 사용할 수 없습니다.
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```


{@a select-value-binding}
<!--
## Cannot Bind to `value` property of `<select>` with `*ngFor`
-->
## `*ngFor`를 사용할 때 `<select>`의 `value` 프로퍼티는 바인딩할 수 없습니다.


<!--
### Basic example of change
-->
### 예제


<!--
```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

In the View Engine runtime, the above code would set the initial value of the `<select>` as expected.
In Ivy, the initial value would not be set at all in this case.
-->
```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

View Engine에서는 위 코드처럼 작성해도 `<select>`의 초기값을 제대로 지정할 수 있었습니다.
하지만 Ivy에서는 초기값이 지정되지 않습니다.


<!--
### Background
-->
### 변경된 이유

<!--
Prior to Ivy, directive input bindings were always executed in their own change detection pass before any DOM bindings were processed.
This was an implementation detail that supported the use case in question:

```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

It happened to work because the `*ngFor` would be checked first, during the directive input binding pass, and thus create the options first.
Then the DOM binding pass would run, which would check the `value` binding.
At this time, it would be able to match the value against one of the existing options, and set the value of the `<select>` element in the DOM to display that option.

In Ivy, bindings are checked in the order they are defined in the template, regardless of whether they are directive input bindings or DOM bindings.
This change makes change detection easier to reason about for debugging purposes, since bindings will be checked in depth-first order as declared in the template.

In this case, it means that the `value` binding will be checked before the `*ngFor` is checked, as it is declared above the `*ngFor` in the template.
Consequently, the value of the `<select>` element will be set before any options are created, and it won't be able to match and display the correct option in the DOM.
-->
Ivy에서는 디렉티브에 바인딩되는 입력값들이 자체 변화 감지 로직으로 할당되며, 이 작업은 DOM 바인딩이 처리되기 전에 완료됩니다.
이런 템플릿 코드가 있다고 합시다:

```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

이 템플릿은 디렉티브의 입력값이 바인딩될 때 `*ngFor`가 가장 먼저 실행되기 때문에 `<option>` 엘리먼트가 가장 먼저 생성됩니다.
그 다음에는 `<select>` 엘리먼트의 `value` 값을 바인딩합니다.
그래서 이 시점에는 DOM에 구성된 `<option>` 중에서 매칭되는 값을 찾아서 `<select>` 엘리먼트의 초기값을 제대로 지정할 수 있었습니다.

하지만 Ivy에서는 디렉티브에 바인딩되었느냐, DOM에 바인딩되었느냐를 가리지 않고 템플릿에 사용된 순서대로 바인딩 표현식이 실행됩니다.
이 변경사항은 변화 감지 로직이 동작하는 것을 단순화해서 디버깅하기 쉽도록 개선한 것입니다.
그래서 이제는 템플릿에 사용된 대로, 바깥쪽에 사용된 바인딩부터 실행하고 안쪽으로 진행합니다.

따라서 `<select>`에 바인딩되는 `value`는 `*ngFor` 보다 먼저 실행됩니다.
`[value]`라는 문법은 `*ngFor` 보다 바깥쪽에, 먼저 사용되었기 때문입니다.
그래서 `<select>` 엘리먼트의 값은 `<option>` 엘리먼트가 생성되기 전에 이미 할당되기 때문에 `<option>`에 해당하는 값으로 할당될 수 없습니다.

<!--
### Example of error
-->
### 관련 에러

<!--
There is no error thrown, but the `<select>` in question will not have the correct initial value displayed in the DOM.
-->
에러가 발생하지는 않지만 `<select>`의 초기값이 할당되지 않습니다.


<!--
### Recommended fix
-->
### 해결방법

<!--
To fix this problem, we recommend binding to the `selected` property on the `<option>` instead of the `value` on the `<select>`.

*Before*
```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

*After*
```html
<select>
  <option *ngFor="let option of options" [value]="option" [selected]="someValue == option">
    {{ option }}
  <option>
</select>
```
-->
이 문제를 해결하려면 `<select>`의 `value`를 바인딩하는 대신, `<option>`의 `selected` 프로퍼티를 사용하면 됩니다.

*수정 전*
```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

*수정 후*
```html
<select>
  <option *ngFor="let option of options" [value]="option" [selected]="someValue == option">
    {{ option }}
  <option>
</select>
```


{@a forward-refs-directive-inputs}
<!--
## Forward references to directive inputs accessed through local refs are no longer supported.
-->
## 디렉티브의 입력값을 바인딩하기 전에 참조하면 값을 제대로 확인할 수 없습니다.


<!--
### Basic example of change
-->
### 예제

<!--
```ts
@Directive({
  selector: '[myDir]',
  exportAs: 'myDir'
})
export class MyDir {
  @Input() message: string;
}
```

```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

In the View Engine runtime, the above code would print out the name without any errors.
In Ivy, the `myDir.name` binding will throw an `ExpressionChangedAfterItHasBeenCheckedError`.
-->
```ts
@Directive({
  selector: '[myDir]',
  exportAs: 'myDir'
})
export class MyDir {
  @Input() message: string;
}
```

```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

View Engine에서는 에러 없이 이름이 화면에 표시됩니다.
하지만 Ivy에서는 `myDir.name` 바인딩에서 에러가 발생합니다: `ExpressionChangedAfterItHasBeenCheckedError`.



<!--
### Background
-->
### 변경된 이유

<!--
In the ViewEngine runtime, directive input bindings and element bindings were executed in different stages. Angular would process the template one full time to check directive inputs only (e.g. `[name]`), then process the whole template again to check element and text bindings only (e.g.`{{ myDir.name }}`). This meant that the `name` directive input would be checked before the `myDir.name` text binding despite their relative order in the template, which some users felt to be counterintuitive.

In contrast, Ivy processes the template in just one pass, so that bindings are checked in the same order that they are written in the template. In this case, it means that the `myDir.name` binding will be checked before the `name` input sets the property on the directive (and thus it will be `undefined`). Since the `myDir.name` property will be set by the time the next change detection pass runs, a change detection error is thrown.
-->
View Engine에서는 디렉티브의 입력값 바인딩과 엘리먼트 바인딩이 다른 타이밍에 실행되었습니다.
이 때는 Angular가 전체 템플릿을 검사하면서 디렉티브의 입력값이 바인딩 되는 것(ex. `[name]`)을 처리하고, 이후에 다시 한 번 전체 템플릿을 검사하면서 엘리먼트와 텍스트 바인딩(ex. `{{ myDir.name }}`)을 처리했습니다.
이 말은, `name` 디렉티브의 입력값이 바인딩되는 것은 텍스트 바인딩 `myDir.name`이 처리 되기 전이라는 것이기 때문에, 템플릿에 사용된 순서를 생각해 본다면 직관적이지 않다고 생각할 수도 있었습니다.

이제 Ivy는 템플릿을 한번만 처리하기 때문에, 템플릿에 사용된 바인딩 표현식도 순서대로 실행됩니다.
따라서 이 코드에서 `myDir.name` 바인딩은 `name`이라는 입력값이 바인딩되기 전에 실행되기 때문에 `undefined` 값이 됩니다.
그리고 다음 변화 감지 싸이클에서 `myDir.name` 프로퍼티 값이 다른 값으로 변경되기 때문에 에러가 발생합니다.


<!--
### Example of error
-->
### 관련 에러

<!--
Assuming that the value for `myName` is `Angular`, you should see an error that looks like

```
Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: 'Angular'.
```
-->
`myName`의 값이 `Angular`라면 이런 에러가 발생합니다:

```
Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: 'Angular'.
```


<!--
### Recommended fix
-->
### 해결방법

<!--
To fix this problem, we recommend either getting the information for the binding directly from the host component (e.g. the `myName` property from our example) or to move the data binding after the directive has been declared so that the initial value is available on the first pass.

*Before*
```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

*After*
```html
{{ myName }}
<div myDir [name]="myName"></div>
```
-->
이 문제를 해결하려면 컴포넌트에 있는 정보를 직접 참조하거나, 디렉티브에 데이터가 바인되는 시점을 옮겨서 처음 접근하더라도 올바른 값을 참조하도록 수정하면 됩니다.

*수정 전*
```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

*수정 후*
```html
{{ myName }}
<div myDir [name]="myName"></div>
```


{@a foreign-values}
## Foreign functions and foreign values aren't statically resolvable

### Basic example of change 

Consider a library that defines and exports some selector string to be used in other libraries:

```
export let mySelector = '[my-selector]';
```

This selector is then imported in another library or an application:

```
import {mySelector} from 'my-library';

@Directive({selector: mySelector})
export class MyDirective {}
```

Because the `mySelector` value is imported from an external library, it is part of a different compilation unit and therefore considered _foreign_.

While this code would work correctly in the View Engine compiler, it would fail to compile in Ivy in AOT mode.

### Background

In View Engine, the compiler would capture the source code of a library in `metadata.json` files when bundling the library, so that external consumers could "look inside" the source code of an external library.
When AOT-compiling the application, the `metadata.json` files would be used to determine the value of `mySelector`.
In Ivy, the `metadata.json` files are no longer used. Instead, the compiler extracts metadata for external libraries from the `.d.ts` files that TypeScript creates.
This has several benefits such as better performance, much improved error reporting, and enables more build caching opportunities as there is no longer a dependency on library internals.

Looking back at the previous example, the `mySelector` value would be represented in the `.d.ts` as follows:

```
export declare let mySelector: string;
```

Notice that the actual value of the selector is no longer present, so that the Ivy compiler is unable to use it during AOT compilations.

### Example of error

In the above example, a compilation error would occur when compiling `MyDirective`:

```
error NG1010: selector must be a string
  Value is a reference to 'mySelector'.

    1  export declare let mySelector: string;
                          ~~~~~~~~~~
    Reference is declared here.

```

### Recommended fix

When exporting values from a library, ensure the actual value is present in the `.d.ts` file. This typically requires that the variable be declared as a constant:

```
export const mySelector = '[my-selector]';
```

In classes, a field should be declared using the `static readonly` modifiers:

```
export class Selectors {
  static readonly mySelector = '[my-selector]';
}
```