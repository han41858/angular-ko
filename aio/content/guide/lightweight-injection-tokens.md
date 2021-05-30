<!--
# Optimizing client app size with lightweight injection tokens
-->
# 경량 의존성 토큰으로 앱 사이즈 최적화하기

<!--
This page provides a conceptual overview of a dependency injection technique that is recommended for library developers.
Designing your library with *lightweight injection tokens* helps optimize the bundle size of client applications that use your library.

You can manage the dependency structure among your components and injectable services to optimize bundle size by using [tree-shakable providers](guide/architecture-services#introduction-to-services-and-dependency-injection).
This normally ensures that if a provided component or service is never actually used by the app, the compiler can eliminate its code from the bundle.

However, due to the way Angular stores injection tokens, it is possible that such an unused component or service can end up in the bundle anyway.
This page describes a dependency-injection design pattern that supports proper tree-shaking by using lightweight injection tokens.

The lightweight injection token design pattern is especially important for library developers. It ensures that when an application uses only some of your library's capabilities, the unused code can be eliminated from the client's application bundle.

When an application uses your library, there might be some services that your library supplies which the client application doesn't use.
In this case, the application developer should expect that service to be tree-shaken, and not contribute to the size of the compiled application.
Because the application developer cannot know about or remedy a tree-shaking problem in the library, it is the responsibility of the library developer to do so.
To prevent the retention of unused components, your library should use the lightweight injection token design pattern.
-->
이 문서는 라이브러리 개발자에게 유용한 의존성 주입 테크닉에 대해 다룹니다.
라이브러리에 *경량 의존성 토큰(lightweight injection tokens)*을 활용하면 라이브러리를 활용하는 앱 빌드 결과물의 크기를 최적화할 수 있습니다.

앱 빌드 결과물의 크기를 최적화 하려면 [트리 셰이킹 대상이 되는 프로바이더](guide/dependency-injection-providers#tree-shakable-providers)를 활용할 수도 있습니다.
일반적으로 앱에 실제로 사용되지 않는 컴포넌트나 서비스는 빌드 결과물에 포함되지 않습니다.

하지만 의존성 토큰을 관리하는 방식에 따라 실제로 사용하지 않는 컴포넌트나 서비스가 빌드 결과물에 포함될 수 있습니다.
그래서 이 문서에서는 경량 의존성 토큰 디자인 패턴을 활용해서 트리 셰이킹이 제대로 동작하게 만드는 방법을 알아봅시다.

경량 의존성 토큰 디자인 패턴은 라이브러리 개발자에게 특히 중요합니다.
애플리케이션이 라이브러리의 일부 기능만 활용한다면, 사용하지 않는 나머지 기능은 애플리케이션 빌드 결과물에 포함되지 않는 것이 당연히 좋습니다.

라이브러리가 제공하는 서비스 중에서 실제로 앱에 사용되지 않는 서비스가 있을 수 있습니다.
이런 경우에도 앱 개발자는 해당 서비스가 트리 셰이킹되어 빌드 결과물에 포함되지 않는다는 것을 알 수 있어야 합니다.
하지만 애플리케이션 개발자가 트리 셰이킹에 대해 모를 수 있고, 라이브러리가 제대로 트리 셰이킹되지 않는 것을 직접 해결할 수도 없기 때문에 이 문제는 온전히 라이브러리 개발자가 해결해야 합니다.
사용하지 않는 컴포넌트가 빌드 결과물에 포함되는 것을 방지하기 위해 경량 의존성 토큰 디자인 패턴을 라이브러리에 적용해 봅시다.


<!--
## When tokens are retained
-->
## 토큰이 남아있는 경우

<!--
To better explain the condition under which token retention occurs, consider a library that provides a library-card component, which contains a body and can contain an optional header.

```
<lib-card>
  <lib-header>...</lib-header>
</lib-card>
```

In a likely implementation, the `<lib-card>` component uses `@ContentChild()` or `@ContentChildren()` to obtain `<lib-header>` and `<lib-body>`, as in the following.

```
@Component({
  selector: 'lib-header',
  ...,
})
class LibHeaderComponent {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderComponent)
  header: LibHeaderComponent|null = null;
}
```

Because `<lib-header>` is optional, the element can appear in the template in its minimal form,
`<lib-card></lib-card>`.
In this case, `<lib-header>` is not used and you would expect it to be tree-shaken, but that is not what happens.
This is because `LibCardComponent` actually contains two references to the `LibHeaderComponent`.

`@ContentChild(LibHeaderComponent) header: LibHeaderComponent;`

* One of these reference is in the *type position*-- that is, it specifies `LibHeaderComponent` as a type: `header: LibHeaderComponent;`.

* The other reference is in the *value position*-- that is, LibHeaderComponent is the value of the `@ContentChild()` parameter decorator: `@ContentChild(LibHeaderComponent)`.

The compiler handles token references in these positions differently.

* The compiler erases *type position* references after conversion from TypeScript, so they have no impact on tree-shaking.

* The compiler must retain *value position*  references at runtime, which prevents the component from being tree-shaken.

In the example, the compiler retains the `LibHeaderComponent` token that occurs in the value position, which prevents the referenced component from being tree-shaken, even if the application developer does not actually use `<lib-header>` anywhere.
If `LibHeaderComponent` is large (code, template, and styles), including it unnecessarily can significantly increase the size of the client application.
-->
빌드 결과물에 토큰이 포함되는 경우를 알아봅시다.
어떤 라이브러리가 도서관 카드 컴포넌트를 제공하는데, 이 컴포넌트는 헤더와 몸체로 구성됩니다.

```
<lib-card>
  <lib-header>...</lib-header>
</lib-card>
```

그리고 `<lib-card>` 컴포넌트는 `@ContentChild()`나 `ContentChildren()`을 사용해서 `<lib-header>`, `<lib-body>`에 접근합니다.

```
@Component({
  selector: 'lib-header',
  ...,
})
class LibHeaderComponent {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderComponent)
  header: LibHeaderComponent|null = null;
}
```

`<lib-header>`는 생략할 수 있기 때문에 이 컴포넌트를 최소한으로 사용하면 `<lib-card></lib-card>`라고 사용할 수 있습니다.
이 경우에 `<lib-header>`가 사용되지 않았기 때문에 트리 셰이킹되어 없어질 것이라 생각할 수 있지만, 실제로는 그렇지 않습니다.
`LibCardComponent` 에서 `LibHeaderComponent`를 참조하는 코드가 두 군데 남아있기 때문입니다.


`@ContentChild(LibHeaderComponent) header: LibHeaderComponent;`


* 한 번은 *타입을 지정하는 위치*에 사용되었습니다: `header: LibHeaderComponent`

* 그리고 한 번은 `ContentChild()` 데코레이터의 *값을 지정하는 위치*에 사용되었습니다: `@ContentChild(LibHeaderComponent)`


Angular 컴파일러는 두 참조 코드를 다르게 처리합니다.


* *타입을 지정하는 위치*에 사용된 코드는 JavaScript 코드로 변환되면서 사라집니다. 그래서 이 코드는 트리 셰이킹과 관련이 없습니다.

* *값을 지정하는 위치*에 사용된 코드는 실행 시점에 꼭 필요하기 때문에 그대로 남습니다. 그래서 `LibHeaderComponent`는 트리 셰이킹되지 않습니다.


이 예제에서 값을 지정하는 위치에 사용된 `LibHeaderComponent` 토큰은 그대로 남기 때문에 트리 셰이킹되지 않습니다.
애플리케이션 개발자가 `<lib-header>` 태그를 사용한 적이 없더라도 그렇습니다.
이 때 `LibHeaderComponent`의 코드/템플릿/스타일 용량이 크다면 전체 애플리케이션 빌드 결과물의 크기도 쓸데없이 커집니다.


<!--
## When to use the lightweight injection token pattern
-->
## 경량 의존성 토큰을 사용하는 경우

<!--
The tree-shaking problem arises when a component is used as an injection token.
There are two cases when that can happen.

* The token is used in the value position of a [content query](guide/lifecycle-hooks#using-aftercontent-hooks "See more about using content queries.").
* The token is used as a type specifier for constructor injection.

In the following example, both uses of the `OtherComponent` token cause retention of `OtherComponent` (that is, prevent it from being tree-shaken when it is not used).

```
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}

  @ContentChild(OtherComponent)
  other: OtherComponent|null;
}
```

Although tokens used only as type specifiers are removed when converted to JavaScript, all tokens used for dependency injection are needed at runtime.
These effectively change `constructor(@Optional() other: OtherComponent)` to `constructor(@Optional() @Inject(OtherComponent) other)`. The token is now in a value position, and causes the tree shaker to retain the reference.

<div class="alert is helpful">

For all services, a library should use [tree-shakable providers](guide/architecture-services#introduction-to-services-and-dependency-injection), providing dependencies at the root level rather than in component constructors.

</div>
-->
컴포넌트를 의존성 토큰으로 사용하면 이 컴포넌트를 실제로 사용하지 않더라도 트리 셰이킹으로 제거되지 않습니다.
이런 상황이 발생하는 경우는 두 가지 입니다.

* [컨텐츠를 쿼리](guide/lifecycle-hooks#using-aftercontent-hooks "See more about using content queries.")하는 위치에 의존성 토큰을 사용한 경우
* 생성자에 주입될 의존성 객체의 타입을 지정하기 위해 사용한 경우

아래 코드에서 `OtherComponent` 토큰은 이 두 경우에 모두 해당되기 때문에 이 컴포넌트를 사용하지 않았어도 트리 셰이킹되지 않습니다.

```
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}

  @ContentChild(OtherComponent)
  other: OtherComponent|null;
}
```

타입을 지정하기 위해 사용된 토큰은 TypeScript 코드가 JavaScript 코드로 변환되면서 모두 사라지지만, 의존성 주입을 위해 사용된 토큰은 실행 시점에도 필요합니다.
`constructor(@Optional() other: OtherComponent)`를 `constructor(@Optional() @Inject(OtherComponent) other)`처럼 사용한 경우에도 그렇습니다.
`OtherComponent` 토큰은 값을 지정하는 위치에 사용되었기 때문에 트리 셰이킹되지 않고 빌드 결과물에 남습니다.


<div class="alert is-helpful">

라이브러리가 제공하는 서비스는 모두 컴포넌트 생성자가 아니라 최상위 계층에 등록해서 [트리 셰이킹 대상이 되는 프로바이더](guide/dependency-injection-providers#tree-shakable-providers)로 등록해야 합니다.

</div>


<!--
## Using lightweight injection tokens
-->
## 경량 의존성 토큰 사용하기

<!--
The lightweight injection token design pattern consists of using a small abstract class as an injection token, and providing the actual implementation at a later stage.
The abstract class is retained (not tree-shaken), but it is small and has no material impact on the application size.

The following example shows how this works for the `LibHeaderComponent`.

```
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;
}
```

In this example, the `LibCardComponent` implementation no longer refers to `LibHeaderComponent` in either the type position or the value position.
This allows full tree shaking of `LibHeaderComponent` to take place.
The `LibHeaderToken` is retained, but it is only a class declaration, with no concrete implementation. It is small and does not materially impact the application size when retained after compilation.

Instead, `LibHeaderComponent` itself implements the abstract `LibHeaderToken` class. You can safely use that token as the provider in the component definition, allowing Angular to correctly inject the concrete type.

To summarize, the lightweight injection token pattern consists of the following.

1. A lightweight injection token that is represented as an abstract class.
2. A component definition that implements the abstract class.
3. Injection of the lightweight pattern, using ` @ContentChild()` or `@ContentChildren()`.
4. A provider in the implementation of the lightweight injection token which associates the lightweight injection token with the implementation.
-->
경량 의존성 토큰 디자인 패턴은 의존성 토큰으로 사용되는 간단한 추상 클래스와 실제 구현체로 구성됩니다.
추상 클래스는 트리 셰이킹의 대상이 되지 않기 때문에 빌드 결과물에도 남지만, 이 클래스는 아주 작기 때문에 애플리케이션 전체 크기에 영향을 주지 않습니다.

`LibHeaderComponent`를 대상으로 추상 클래스를 구현해보면 이렇습니다.


```
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;
}
```


이렇게 구현하면 `LibCardComponent`가 사용된 위치에 관계없이 `LibHeaderComponent`와 직접 연결되지 않습니다.
그래서 `LibHeaderComponent`는 트리 셰이킹 대상이 됩니다.
`LibHeaderToken`은 트리 셰이킹 대상이 아니기 때문에 빌드 결과물에도 남아있지만, 이 클래스는 선언만 존재하며 구현체가 존재하지 않습니다.
따라서 이 토큰은 아주 작은 용량만 차지하고 애플리케이션 빌드 결과물의 용량에 거의 영향을 주지 않습니다.

`LibHeaderComponent`는 `LibHeaderToken` 추상 클래스를 상속받아 구현합니다.
그래서 `LibHeaderToken`을 컴포넌트에 사용하더라도 실제 사용될 때는 Angular가 `LibHeaderComponent`를 주입하기 때문에 아무런 문제가 발생하지 않습니다.

간단하게 요약하면, 경량 의존성 토큰 디자인 패턴은 이렇게 구현합니다.

1. 추상 클래스로 경량 의존성 토큰을 정의합니다.
2. 추상 클래스를 상속받아 실제 컴포넌트 클래스를 정의합니다.
3. 경량 의존성 토큰으로 `@ContentChild()`나 `@ContentChildren()`을 사용합니다.
4. 실제 컴포넌트 프로바이더에 경량 의존성 토큰과 실제 컴포넌트 구현체를 등록합니다.


<!--
### Use the lightweight injection token for API definition
-->
### 경량 의존성 토큰의 API 사용하기

<!--
A component that injects a lightweight injection token might need to invoke a method in the injected class.
Because the token is now an abstract class, and the injectable component implements that class, you must also declare an abstract method in the abstract lightweight injection token class.
The implementation of the method (with all of its code overhead) resides in the injectable component that can be tree-shaken.
This allows the parent to communicate with the child (if it is present) in a type-safe manner.

For example, the `LibCardComponent` now queries `LibHeaderToken` rather than `LibHeaderComponent`.
The following example shows how the pattern allows `LibCardComponent` to communicate with the `LibHeaderComponent` without actually referring to `LibHeaderComponent`.

```
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent implement AfterContentInit {
  @ContentChild(LibHeaderToken)
  header: LibHeaderToken|null = null;

  ngAfterContentInit(): void {
    this.header && this.header.doSomething();
  }
}
```

In this example the parent  queries the token to obtain the child component, and stores the resulting component reference if it is present.
Before calling a method in the child, the parent component checks to see if the child component is present.
If the child component has been tree-shaken, there is no runtime reference to it, and no call to its method.
-->
경량 의존성 주입 토큰으로 주입된 컴포넌트의 메서드를 실행해야 할 때가 있습니다.
이 때 컴포넌트 클래스는 토큰을 통해서 사용해야 하기 때문에 컴포넌트에서 사용할 메서드를 추상 클래스에도 정의해야 합니다.
물론 컴포넌트가 트리 셰이킹 대상이 되면 컴포넌트 클래스에 정의한 메서드도 함께 제거됩니다.
이 방식은 자식 컴포넌트의 타입을 좀 더 안전하게 사용하는 방법이기도 합니다.

이제 `LibCardComponent`는 `LibHeaderComponent` 대신 `LibHeaderToken`을 사용해서 자식 컴포넌트를 쿼리합니다.
실제로 사용하는 컴포넌트 대신 의존성 토큰으로 자식 컴포넌트 메서드를 실행하는 코드도 확인해 보세요.


```
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeader}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {
  doSomething(): void {
    // doSomething() 메서드의 실제 로직
  }
}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent implement AfterContentInit {
  @ContentChild(LibHeaderToken)
  header: LibHeaderToken|null = null;

  ngAfterContentInit(): void {
    this.header && this.header.doSomething();
  }
}
```

이 예제 코드에서 부모 컴포넌트는 토큰을 사용해서 자식 컴포넌트를 쿼리하며, 자식 컴포넌트가 존재하면 컴포넌트 참조를 저장해 둡니다.
그리고 자식 컴포넌트의 메서드를 실행하기 전에 먼저 자식 컴포넌트가 존재하는지 확인하는 로직을 사용했습니다.
자식 컴포넌트가 트리 셰이킹되어 최종 빌드 결과물에서 제거되면 실행 시점에 참조할 자식 컴포넌트가 존재하지 않기 때문에 자식 컴포넌트의 메서드도 실행하지 않습니다.


<!--
### Naming your lightweight injection token
-->
### 경량 의존성 토큰 이름 짓기

<!--
Lightweight injection tokens are only useful with components. The Angular style guide suggests that you name components using the "Component" suffix. The example "LibHeaderComponent" follows this convention.

To maintain the relationship between the component and its token while still distinguishing between them, the recommended style is to use the component base name with the suffix "Token" to name your lightweight injection tokens: "LibHeaderToken".
-->
경량 의존성 토큰은 컴포넌트에만 적용할 수 있습니다.
그런데 Angular 스타일 가이드 문서를 보면 컴포넌트에는 "Component" 접미사를 사용하는 것을 권장하고 있습니다.
`LibHeaderCmponent`도 이 가이드를 따르고 있습니다.

컴포넌트와 연관된 토큰이라는 것을 한번에 판단할 수 있으면서도 컴포넌트와 토큰을 확실하게 구별하려면 컴포넌트 클래스 이름에 사용된 "Component" 접미사를 "Token"으로 바꾸는 방법을 권장합니다.
`LibHeaderComponent`의 경량 의존성 토큰은 `LibHeaderToken`으로 정의하는 식입니다.