<!--
# Optimizing client application size with lightweight injection tokens
-->

# 경량 의존성 주입 토큰을 사용해서 클라이언트 애플리케이션 크기 최적화하기

<!--
This page provides a conceptual overview of a dependency injection technique that is recommended for library developers.
Designing your library with _lightweight injection tokens_ helps optimize the bundle size of client applications that use your library.

You can manage the dependency structure among your components and injectable services to optimize bundle size by using tree-shakable providers.
This normally ensures that if a provided component or service is never actually used by the application, the compiler can remove its code from the bundle.

Due to the way Angular stores injection tokens, it is possible that such an unused component or service can end up in the bundle anyway.
This page describes a dependency injection design pattern that supports proper tree-shaking by using lightweight injection tokens.

The lightweight injection token design pattern is especially important for library developers.
It ensures that when an application uses only some of your library's capabilities, the unused code can be eliminated from the client's application bundle.

When an application uses your library, there might be some services that your library supplies which the client application doesn't use.
In this case, the application developer should expect that service to be tree-shaken, and not contribute to the size of the compiled application.
Because the application developer cannot know about or remedy a tree-shaking problem in the library, it is the responsibility of the library developer to do so.
To prevent the retention of unused components, your library should use the lightweight injection token design pattern.
-->

이 문서에서는 라이브러리에게 권장하는 의존성 주입 기법을 설명합니다.
_경량 주입 토큰(lightweight injection tokens)_ 을 사용하여 라이브러리를 설계하면, 이 라이브러리를 사용하는 클라이언트 애플리케이션의 빌드 결과물 크기를 최적화하는 데에도 도움이 됩니다.

트리 셰이킹 프로바이더를 사용하면 컴포넌트와 주입 가능한 서비스 사이의 의존성 구조를 관리하여 빌드 결과물의 크기를 최적화할 수 있습니다.
이렇게 하면 애플리케이션에서 실제로 사용되지 않는 컴포넌트나 서비스는 컴파일러가 코드를 빌드할 때 빌드 결과물에 포함되지 않습니다.

의존성 토큰을 관리하는 방식에 따라 사용하지 않는 컴포넌트나 서비스가 빌드 결과물에 포함되는지가 달라집니다.
이 문서에서는 경량 의존성 주입 토큰을 활용해서 트리 셰이킹을 지원하는 의존성 주입 설계 패턴을 다룹니다.

경량 의존성 주입 토큰 디자인 패턴은 라이브러리 개발자에게 특히 유용합니다.
이 패턴을 활용하면 애플리케이션이 라이브러리 기능 중 일부만 사용하는 경우, 사용하지 않는 코드는 클라이언트 애플리케이션의 빌드 결과물에서 제거할 수 있습니다.

애플리케이션이 라이브러리를 활용할 때, 라이브러리가 제공하는 서비스 중에서 클라이언트 애플리케이션이 사용하지 않는 서비스가 있을 수 있습니다.
이 경우, 애플리케이션 개발자는 해당 서비스가 트리 셰이킹되어 최종 컴파일 된 애플리케이션에 영향을 미치지 않을 것을 기대합니다.
애플리케이션 개발자는 라이브러리의 트리 셰이킹 문제를 알거나 직접 해결할 수 없기 때문에, 이를 처리하는 것은 라이브러리 개발자의 몫입니다.
사용하지 않는 구성요소가 빌드 결과물에 포함되지 않도록 하려면, 라이브러리에서 경량 의존성 주입 토큰 디자인 패턴을 활용하면 됩니다.

<!--
## When tokens are retained
-->

## 토큰이 유지되는 경우

<!--
To better explain the condition under which token retention occurs, consider a library that provides a library-card component.
This component contains a body and can contain an optional header:

```html
<lib-card>
  <lib-header>…</lib-header>
</lib-card>
```

In a likely implementation, the `<lib-card>` component uses `contentChild` or `contentChildren` to get `<lib-header>` and `<lib-body>`, as in the following:

```ts {highlight: [14]}
import {Component, contentChild} from '@angular/core';

@Component({
  selector: 'lib-header',
  …,
})
class LibHeader {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCard {
  readonly header = contentChild(LibHeader);
}
```

Because `<lib-header>` is optional, the element can appear in the template in its minimal form, `<lib-card />`.
In this case, `<lib-header>` is not used and you would expect it to be tree-shaken, but that is not what happens.
This is because `LibCard` actually contains two references to the `LibHeader`:

```ts
readonly header = contentChild(LibHeader);
```

- One of these references is in the _type position_-- that is, it specifies `LibHeader` as a type: `readonly header: Signal<LibHeader|undefined>`.
- The other reference is in the _value position_-- that is, `LibHeader` is the value passed into the `contentChild` function: `contentChild(LibHeader)`.

The compiler handles token references in these positions differently:

- The compiler erases _type position_ references after conversion from TypeScript, so they have no impact on tree-shaking.
- The compiler must keep _value position_ references at runtime, which **prevents** the component from being tree-shaken.

In the example, the compiler retains the `LibHeader` token that occurs in the value position.
This prevents the referenced component from being tree-shaken, even if the application does not actually use `<lib-header>` anywhere.
If `LibHeader` 's code, template, and styles combine to become too large, including it unnecessarily can significantly increase the size of the client application.
-->

토큰이 유지되는 경우를 설명하기 위해 도서관 카드 컴포넌트를 제공하는 라이브러리를 생각해 봅시다.
이 컴포넌트는 바디를 가지며 헤더는 선택적으로 가질 수 있습니다:

```html
<lib-card>
  <lib-header>…</lib-header>
</lib-card>
```

일반적으로는 `<lib-card>` 컴포넌트는 `contentChild`나 `contentChildren`을 사용해서 `<lib-header>`나 `<lib-body>`를 참조합니다:

```ts {highlight: [14]}
import {Component, contentChild} from '@angular/core';

@Component({
  selector: 'lib-header',
  …,
})
class LibHeader {}

@Component({
  selector: 'lib-header',
  …,
})
class LibHeader {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCard {
  readonly header = contentChild(LibHeader);
}
```

그런데 `<lib-header>`는 선택 사항이기 때문에, 가장 단순하게 구성하면 `<lib-card />` 라는 템플릿으로 사용할 수 있습니다.
이 경우, `<lib-header>`는 사용되지 않으며, 트리 셰이킹이 될 것으로 예상하겠지만, 실제로는 그렇지 않습니다.
왜냐하면 `LibCard`는 다음과 같이 `LibHeader`를 참조하기 때문입니다:

```ts
readonly header = contentChild(LibHeader);
```

- `header: LibHeader;`에서는 `LibHeader`가 타입 역할로 사용되었습니다.
- `contentChild(LibHeader)`에서는 `LibHeader`가 값 역할로 사용되었습니다.

컴파일러는 이런 토큰을 역할에 따라 다르게 처리합니다.

- _타입 역할_ 참조는 컴파일러가 TypeScript 코드를 변환하면서 제거됩니다. 트리 셰이킹에 영향을 미치지 않습니다.
- _값 역할_ 참조는 실행 시점에 필요합니다. 그래서 트리 셰이킹이 동작해도 코드에 **남습니다.**

예제 코드에서 `LibHeader` 토큰은 값 역할로 사용되었기 때문에 컴파일 이후에도 코드에 남습니다.
그러면 애플리케이션 어디에서도 `<lib-header>`를 사용하지 않더라도 이 컴포넌트는 트리 셰이킹되지 않습니다.
`LibHeader`의 코드, 템플릿, 스타일 파일의 크기가 크다면, 클라이언트 애플리케이션의 빌드 결과물 크기에도 영향을 주게 됩니다.

<!--
## When to use the lightweight injection token pattern
-->

## 경량 의존성 주입 토큰은 언제 사용해야 할까요?

<!--
The tree-shaking problem arises when a component is used as an injection token.
There are two cases when that can happen:

- The token is used in the value position of a [content query](guide/components/queries#content-queries).
- The token is used with the `inject` function.

In the following example, both uses of the `CustomOther` token cause retention of `CustomOther`, preventing it from being tree-shaken when it is not used:

```ts {highlight: [[2],[4]]}
class App {
  private readonly other = inject(CustomOther, {optional: true});

  readonly header = contentChild(CustomOther);
}
```

Although tokens used only as type specifiers are removed when converted to JavaScript, all tokens used for dependency injection are needed at runtime.
When using `inject(CustomOther)`, `CustomOther` is passed as a value argument.
The token is now in a value position, which causes the tree-shaker to keep the reference.

HELPFUL: Libraries should use [tree-shakable providers](guide/di/defining-dependency-providers) for all services, providing dependencies at the root level rather than in components or modules.
-->

컴포넌트가 의존성 토큰을 사용하면 트리 셰이킹에 문제가 발생합니다.
문제가 발생하는 경우는 두 가지 입니다:

- 토큰이 [컨텐츠 쿼리](guide/components/queries#content-queries) 자리에 값 역할로 사용된 경우
- 토큰이 `inject` 함수에 사용된 경우

아래 예제처럼 `Other`를 사용하면 트리 셰이킹되지 않고 빌드 결과물에 남습니다:

```ts {highlight: [[2],[4]]}
class App {
  private readonly other = inject(CustomOther, {optional: true});

  readonly header = contentChild(CustomOther);
}
```

타입 지정으로만 사용되는 토큰은 TypeScript 코드를 JavaScript로 변환할 때 제거되지만, 의존성 주입에 사용되는 모든 토큰은 실행 시점에도 필요합니다.
`inject(CustomOther)`를 사용할 때, `CustomOther`는 인자로 사용됩니다.
그래서 이 토큰은 값 역할로 사용되었기 때문에 트리 셰이킹이 동작해도 코드에 남습니다.

참고: 라이브러리가 서비스를 제공할 때는 반드시 [트리 셰이킹이 가능한 프로바이더](guide/di/defining-dependency-providers)를 사용해야 하며, 의존성 객체도 컴포넌트나 모듈 계층이 아니라 최상위 계층에 등록해야 합니다.

<!--
## Using lightweight injection tokens
-->

## 경량 의존성 토큰 사용하기

<!--
The lightweight injection token design pattern consists of using a small abstract class as an injection token, and providing the actual implementation at a later stage.
The abstract class is retained, not tree-shaken, but it is small and has no material impact on the application size.

The following example shows how this works for the `LibHeader`:

```ts {highlight: [[1],[5], [15]]}
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [{provide: LibHeaderToken, useExisting: LibHeader}],
  …,
})
class LibHeader extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCard {
  readonly header = contentChild(LibHeaderToken);
}
```

In this example, the `LibCard` implementation no longer refers to `LibHeader` in either the type position or the value position.
This lets full tree-shaking of `LibHeader` take place.
The `LibHeaderToken` is retained, but it is only a class declaration, with no concrete implementation.
It is small and does not materially impact the application size when retained after compilation.

Instead, `LibHeader` itself implements the abstract `LibHeaderToken` class.
You can safely use that token as the provider in the component definition, allowing Angular to correctly inject the concrete type.

To summarize, the lightweight injection token pattern consists of the following:

1. A lightweight injection token that is represented as an abstract class.
2. A component definition that implements the abstract class.
3. Injection of the lightweight pattern, using `contentChild` or `contentChildren`.
4. A provider in the implementation of the lightweight injection token which associates the lightweight injection token with the implementation.
-->

경량 의존성 토큰 디자인 패턴은 작은 추상 클래스를 의존성 토큰으로 사용하고, 실제 구현체는 나중에 제공하는 방식입니다.
그러면 추상 클래스는 트리 셰이킹되지 않고 남더라도, 작기 때문에 애플리케이션 빌드 결과물 크기에는 거의 영향을 주지 않습니다.

아래 예제에서 `LibHeaderComponent`가 동작하는 것을 봅시다:

```ts {highlight: [[1],[5], [15]]}
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [{provide: LibHeaderToken, useExisting: LibHeader}],
  …,
})
class LibHeader extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCard {
  readonly header = contentChild(LibHeaderToken);
}
```

이 예제에서 `LibCard`의 구현체는 더이상 `LibHeader`를 타입으로도, 값으로도 사용하지 않습니다.
따라서 `LibHeader`는 완전하게 트리 셰이킹이 가능합니다.
그 대신 `LibHeaderToken`이 클래스 선언부에 사용되어 코드에 남지만, 구현체가 없이 단순한 클래스 선언일 뿐입니다.
이 토큰의 크기는 아주 작기 때문에 컴파일 후에도 애플리케이션 크기에 거의 영향을 주지 않습니다.

대신, `LibHeaderToken` 추상 클래스의 구현체는 `LibHeader` 가 됩니다.
컴포넌트를 정의할 때 프로바이더에 `LibHeaderToken`을 등록하면 Angular가 구현체를 올바르게 의존성으로 주입합니다.

요약하자면, 경량 의존성 토큰 패턴은 다음과 같이 구성됩니다:

1. 경량 의존성 토큰 - 추상 클래스로 표현합니다
2. 컴포넌트 정의 - 추상 클래스를 프로바이더로 등록합니다.
3. 경량 토큰 주입 - `contentChild`나 `contentChildren`에서 의존성으로 주입합니다.
4. 프로바이더 - 경량 의존성 토큰과 구현체를 연결합니다.

<!--
### Use the lightweight injection token for API definition
-->

### 경랑 의존성 토큰은 API를 정의할 때 사용하세요.

<!--
A component that injects a lightweight injection token might need to invoke a method in the injected class.
The token is now an abstract class. Since the injectable component implements that class, you must also declare an abstract method in the abstract lightweight injection token class.
The implementation of the method, with all its code overhead, resides in the injectable component that can be tree-shaken.
This lets the parent communicate with the child, if it is present, in a type-safe manner.

For example, the `LibCard` now queries `LibHeaderToken` rather than `LibHeader`.
The following example shows how the pattern lets `LibCard` communicate with the `LibHeader` without actually referring to `LibHeader`:

```ts {highlight: [[2],[7],[11],[19]]}
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [{provide: LibHeaderToken, useExisting: LibHeader}],
})
class LibHeader extends LibHeaderToken {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}

@Component({
  selector: 'lib-card',
})
class LibCard implements AfterContentInit {
  readonly header = contentChild(LibHeaderToken);

  ngAfterContentInit(): void {
    if (this.header() !== undefined) {
      this.header()!.doSomething();
    }
  }
}
```

In this example, the parent queries the token to get the child component, and stores the resulting component reference if it is present.
Before calling a method in the child, the parent component checks to see if the child component is present.
If the child component has been tree-shaken, there is no runtime reference to it, and no call to its method.
-->

경량 의존성 토큰을 주입하는 컴포넌트는 주입된 클래스의 메서드를 호출해야 할 수 있습니다.
이 경우 토큰은 추상 클래스입니다.
그리고 의존성으로 주입할 수 있는 컴포넌트가 추상 클래스를 구현하기 때문에, 경량 의존성 토큰의 추상 클래스에도 추상 메서드를 선언해야 합니다.
메서드의 실제 구현 코드와 그 외에 코드는 모두 트리 셰이킹 대상이 되는 컴포넌트에 존재합니다.
이를 통해 부모 컴포넌트는 자식 컴포넌트가 존재하는 경우 타입으로 보호되는 방식으로 호출할 수 있습니다.

이제 `LibCard`에서 `LibHeader` 대신 `LibHeaderToken`를 쿼리해 봅시다.
아래 예제는 `LibCard`가 실제 `LibHeader`를 직접 호출하지 않아도 `LibHeader`를 활용할 수 있습니다:

```ts {highlight: [[2],[7],[11],[19]]}
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [{provide: LibHeaderToken, useExisting: LibHeader}],
})
class LibHeader extends LibHeaderToken {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}

@Component({
  selector: 'lib-card',
})
class LibCard implements AfterContentInit {
  readonly header = contentChild(LibHeaderToken);

  ngAfterContentInit(): void {
    if (this.header() !== undefined) {
      this.header()!.doSomething();
    }
  }
}
```

이 예제에서 부모 컴포넌트는 토큰을 통해 자식 컴포넌트를 참조하고, 자식 컴포넌트가 존재하면 해당 컴포넌트의 참조를 저장해 둡니다.
그리고 부모 컴포넌트가 자식 컴포넌트의 메서드를 호출하기 전에 자식 컴포넌트가 존재하는지 확인하며, 자식 컴포넌트가 트리 셰이킹되어 사라지면, 실행 시점에 존재하지 않기 때문에 자식 컴포넌트의 메서드를 실행하지 않습니다.

<!--
### Naming your lightweight injection token
-->

### 경량 의존성 토큰의 이름 지정하기

<!--
Lightweight injection tokens are only useful with components.
The [Angular Style Guide](style-guide) suggests that you name components without the suffix `Component`.
The example `LibHeader` follows this convention.

You should maintain the relationship between the component and its token while still distinguishing between them.
The recommended style is to use the component base name with the suffix `Token` to name your lightweight injection tokens: `LibHeaderToken`.
-->
경량 의존성 토큰은 컴포넌트에서만 유용합니다.
[Angular 스타일 가이드](style-guide)를 따르면, 컴포넌트는 `Component` 접미사 사용을 권장하지 않습니다.
`LibHeader`와 같은 식입니다.

컴포넌트는 토큰과 관련되어 있지만 둘을 명확하게 구분해야 합니다.
따라서, 경량 주입 토큰에는 `Token` 접미사를 붙이는 것을 권장합니다.