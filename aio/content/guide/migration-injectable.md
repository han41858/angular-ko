<!--
# Migration for missing `@Injectable()` decorators and incomplete provider definitions
-->
# 누락된 `@Injectable()` 데코레이터, 불완전한 프로바이더 정의 마이그레이션하기

<!--
### What does this schematic do?
-->
### 이 문서는 어떤 내용을 다루나요?

<!--
1.  This schematic adds an `@Injectable()` decorator to classes which are provided in the application but are not decorated.
1.  The schematic updates providers which follow the `{provide: SomeToken}` pattern to explicitly specify `useValue: undefined`.

**Example for missing `@Injectable()`**

**Before migration**:

<code-example format="typescript" language="typescript">

export class MyService {&hellip;}
export class MyOtherService {&hellip;}
export class MyThirdClass {&hellip;}
export class MyFourthClass {&hellip;}
export class MyFifthClass {&hellip;}

&commat;NgModule({
  providers: [
    MyService,
    {provide: SOME_TOKEN, useClass: MyOtherService},
    // The following classes do not need to be decorated because they
    // are never instantiated and just serve as DI tokens.
    {provide: MyThirdClass, useValue: &hellip;},
    {provide: MyFourthClass, useFactory: &hellip;},
    {provide: MyFifthClass, useExisting: &hellip;},
  ]
})

</code-example>

**After migration**:

<code-example format="typescript" language="typescript">

&commat;Injectable()
export class MyService {&hellip;}
&commat;Injectable()
export class MyOtherService {&hellip;}
export class MyThirdClass {&hellip;}
export class MyFourthClass {&hellip;}
export class MySixthClass {&hellip;}

&hellip;

</code-example>

<div class="alert is-helpful">

**NOTE**: <br />
`MyThirdClass`, `MyFourthClass`, and `MyFifthClass` do not need to be decorated with `@Injectable()` because they are never instantiated, but just used as a [DI token][AioGuideGlossaryDiToken].

</div>

**Example for provider needing `useValue: undefined`**

This example shows a provider following the `{provide: X}` pattern.
The provider needs to be migrated to a more explicit definition where `useValue: undefined` is specified.

**Before migration**:

<code-example format="typescript" language="typescript">

{provide: MyToken}

</code-example>

**After migration**:

<code-example format="typescript" language="typescript">

{provide: MyToken, useValue: undefined}

</code-example>
-->
1.  데코레이터 없이 등록된 프로바이더 클래스에 `@Injectable()` 데코레이터를 사용하는 방법
1.  `{provide: SomeToken}` 패턴으로 작성된 코드를 `useValue: undefined` 패턴으로 수정하는 방법

**`@Injectable()`이 빠진 경우**

**마이그레이션 전**:

<code-example format="typescript" language="typescript">

export class MyService {&hellip;}
export class MyOtherService {&hellip;}
export class MyThirdClass {&hellip;}
export class MyFourthClass {&hellip;}
export class MyFifthClass {&hellip;}

&commat;NgModule({
  providers: [
    MyService,
    {provide: SOME_TOKEN, useClass: MyOtherService},
    // 아래 클래스들은 인스턴스가 새로 생성되지 않고 DI 토큰으로 바로 사용됩니다.
    // 따라서 데코레이터를 지정할 필요가 없습니다.
    {provide: MyThirdClass, useValue: &hellip;},
    {provide: MyFourthClass, useFactory: &hellip;},
    {provide: MyFifthClass, useExisting: &hellip;},
  ]
})

</code-example>

**마이그레이션 후**:

<code-example format="typescript" language="typescript">

&commat;Injectable()
export class MyService {&hellip;}
&commat;Injectable()
export class MyOtherService {&hellip;}
export class MyThirdClass {&hellip;}
export class MyFourthClass {&hellip;}
export class MySixthClass {&hellip;}

&hellip;

</code-example>

<div class="alert is-helpful">

**참고**: <br />
`MyThirdClass`, `MyFourthClass`, `MyFifthClass`는 새로운 인스턴스가 생성되지 않기 때문에 `@Injectable()` 데코레이터를 지정할 필요 없이 [DI 토큰][AioGuideGlossaryDiToken]으로 사용되었습니다.

</div>

**`useValue: undefined` 패턴이 필요한 프로바이더**

이전에는 `{provide: X}` 패턴을 사용할 수 있었습니다.
하지만 이제는 `useValue: undefined`를 명시적으로 명시해야 합니다.

**마이그레이션 전**:

<code-example format="typescript" language="typescript">

{provide: MyToken}

</code-example>

**마이그레이션 후**:

<code-example format="typescript" language="typescript">

{provide: MyToken, useValue: undefined}

</code-example>


<!--
### Why is adding `@Injectable()` necessary?
-->
### `@Injectable()`을 왜 추가해야 하나요?

<!--
In our docs, we've always recommended adding `@Injectable()` decorators to any class that is provided or injected in your application.
However, older versions of Angular did allow injection of a class without the decorator in certain cases, such as AOT mode.
This means if you accidentally omitted the decorator, your application may have continued to work despite missing `@Injectable()` decorators in some places.
This is problematic for future versions of Angular.
Eventually, we plan to strictly require the decorator because doing so enables further optimization of both the compiler and the runtime.
This schematic adds any `@Injectable()` decorators that may be missing to future-proof your app.
-->
Angular 가이드 문서에서는 의존성 객체로 주입되는 클래스에 모두 `@Injectable()` 데코레이터를 지정하는 것을 권장하고 있습니다.
Angular 이전 버전까지, 특히 AOT 모드에서는 클래스에 데코레이터가 지정되지 않아도 의존성 객체로 주입하는 데에 문제가 없었습니다.
그러나 이 말은, 의도하지 않은 상황에서 데코레이터를 빼먹더라도 문제없이 애플리케이션이 동작한다는 것을 의미하기 때문에 이후 Angular 버전에서 문제가 발생할 여지가 있었습니다.
그래서 Angular 팀은 컴파일러와 실행환경 코드를 최적화하면서 더 나은 안정성을 확보하기 위해 데코레이터를 꼭 사용하도록 정책을 변경했습니다.
이제 의존성으로 주입되는 클래스에는 `@Injectable()` 데코레이터가 확실하게 지정되어야 합니다.


<!--
### Why is adding `useValue: undefined` necessary?
-->
### `useValue: undefined` 코드가 왜 필요한가요?

<!--
Consider the following pattern:

<code-example format="typescript" language="typescript">

&commat;NgModule({
  providers: [{provide: MyService}]
})

</code-example>

Providers using this pattern will behave as if they provide `MyService` as [DI token][AioGuideGlossaryDiToken]
with the value of `undefined`.
This is not the case in Ivy where such providers will be interpreted as if `useClass: MyService` is specified.
This means that these providers will behave differently when updating to version 9 and above.
To ensure that the provider behaves the same as before, the DI value should be explicitly set to `undefined`.
-->
이런 코드가 있다고 합시다:

<code-example format="typescript" language="typescript">

&commat;NgModule({
  providers: [{provide: MyService}]
})

</code-example>

프로바이더를 등록할 때 이런 코드를 사용하면 `MyService`에 해당하는 [DI 토큰][AioGuideGlossaryDiToken] 값이 `undefined`가 됩니다.
이전 버전에서는 이런 코드를 사용해도 `useClass: Myservice`라는 코드로 처리했습니다.
하지만 Angular 9 버전부터는 이런식으로 동작하지 않습니다.
Angular 9 이후 버전부터 이전과 같은 방식으로 동작하려면 명시적으로 `useValue: undefined`를 지정해야 합니다.


<!--
### When should I be adding `@Injectable()` decorators to classes?
-->
### `@Injectable()` 데코레이터는 언제 지정해야 하나요?

<!--
Any class that is provided must have an `@Injectable()` decorator.
The decorator is necessary for the framework to properly create an instance of that class through DI.

However, classes which are already decorated with `@Pipe`, `@Component` or `@Directive` do not need both decorators.
The existing class decorator already instructs the compiler to generate the
needed information.
-->
프로바이더에 등록되는 클래스에는 모두 `@Injectable()` 데코레이터가 지정되어야 합니다.
그래야 Angular 프레임워크가 의존성으로 주입되는 객체를 제대로 찾아서 인스턴스를 생성할 수 있습니다.

하지만 `@Pipe`, `@Component`, `@Directive`와 같은 데코레이터가 지정되어 있다면 `@Injectable` 데코레이터를 중복해서 등록할 필요는 없습니다.
이런 데코레이터를 지정해도 의존성 객체로 주입하기 위해 필요한 정보가 제대로 생성됩니다.


<!--
### Should I update my library?
-->
### 라이브러리도 수정해야 하나요?

<!--
Yes, if your library has any classes that are meant to be injected, they should be updated with the `@Injectable()` decorator.
In a future version of Angular, a missing `@Injectable()` decorator will always throw an error.

Additionally, providers in your library that follow the described `{provide: X}` pattern should be updated to specify an explicit value.
Without explicit value, these providers can behave differently based on the Angular version in applications consuming your library.
-->
네, 라이브러리에서 의존성으로 주입되는 클래스에도 `@Injectable()` 데코레이터가 지정되어야 합니다.
이후 Angular 버전에서 `@Injectable()` 데코레이터가 없으면 에러가 발생할 것입니다.

그리고 `{provide: X}` 패턴으로 작성된 프로바이더도 명확한 값을 지정해야 합니다.
프로바이더에 명확한 값을 지정하지 않으면 라이브러리를 사용하는 Angular 버전에 따라 다르게 동작할 수 있습니다.


<!-- links -->

[AioGuideGlossaryDiToken]: guide/glossary#di-token "DI token - Glossary | Angular"

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
