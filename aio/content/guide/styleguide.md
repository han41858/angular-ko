<!--
# Angular coding style guide
-->
# Angular 코딩 스타일 가이드

<!--
Looking for an opinionated guide to Angular syntax, conventions, and application structure?
Step right in.
This style guide presents preferred conventions and, as importantly, explains why.
-->
Angular 애플리케이션을 개발할 때 문법을 어떻게 사용해야 하는지, 구조는 어떻게 잡아야 하는지 찾고 있나요?
그렇다면 제대로 오셨습니다!
이 가이드 문서는 Angular 애플리케이션을 개발할 때 지키면 좋은 것들을 안내합니다.
왜 그렇게 사용해야 하는지도 함께 알려드립니다.


<a id="toc"></a>

<!--
## Style vocabulary
-->
## 스타일 가이드 용어 정리

<!--
Each guideline describes either a good or bad practice, and all have a consistent presentation.

The wording of each guideline indicates how strong the recommendation is.

<div class="s-rule do">

**Do** is one that should always be followed.
*Always* might be a bit too strong of a word.
Guidelines that literally should always be followed are extremely rare.
On the other hand, you need a really unusual case for breaking a *Do* guideline.

</div>

<div class="s-rule consider">

**Consider** guidelines should generally be followed.
If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so.
Aim to be consistent.

</div>

<div class="s-rule avoid">

**Avoid** indicates something you should almost never do.
Code examples to *avoid* have an unmistakable red header.

</div>

<div class="s-why">

**Why**? <br />
Gives reasons for following the previous recommendations.

</div>
-->
각 가이드 라인에서는 권장하는 스타일을 소개하거나 권장하지 않는 스타일을 소개합니다.

이 문서에서 사용하는 용어를 먼저 정리해 봅시다.

<div class="s-rule do">

**"~하세요"** 는 항상 그렇게 작성해야 하는 스타일을 의미합니다.
*항상* 이라는 단어가 조금 강하게 와닿을 수도 있지만, 이 문서에서 "항상"이라고 언급하는 경우는 그리 많지 않습니다.
하지만 *"~하세요"* 라고 설명하는 가이드라인을 벗어나는 경우는 거의 없을 것입니다.

</div>

<div class="s-rule consider">

**"권장합니다"** 나 **"~하는 것을 고려해보세요"** 는 일반적으로 사용하는 스타일을 의미합니다.
이 어휘가 사용된 가이드라인을 확실하게 이해하고 있지만, 꼭 그렇게 사용하지 않아도 될 이유가 있다면 해당 스타일 가이드를 지키지 않아도 됩니다.
코드의 일관성을 유지하는 것에 더 신경쓰는 것이 좋습니다.

</div>

<div class="s-rule avoid">

**"~하는 것은 피하세요"** 는 되도록 피해야 하는 스타일을 의미합니다.
오해를 방지하기 위해 이 스타일은 빨간색 헤더로 표시합니다.

</div>

<div class="s-why">

**왜**? <br />
해당 스타일 가이드에 대한 이유를 설명합니다.

</div>


<!--
## File structure conventions
-->
## 파일 명명 규칙

<!--
Some code examples display a file that has one or more similarly named companion files.
For example, `hero.component.ts` and `hero.component.html`.

The guideline uses the shortcut `hero.component.ts|html|css|spec` to represent those various files.
Using this shortcut makes this guide's file structures easier to read and more terse.
-->
일부 예제에서는 스타일을 설명하면서 하나 이상의 파일을 함께 언급하는 경우가 있습니다.
예를 들면 `hero.component.ts` 파일을 설명하면서 `hero.component.html` 파일을 함께 설명하는 경우가 그렇습니다.

이 문서는 연관된 파일을 간단하게 표시하기 위해 `hero.component.ts|html|css|spec`라는 표현을 사용합니다.
컴포넌트 구성 파일은 한 폴더에 작성하며 확장자만 다르기 때문에, 이렇게 표현해도 쉽게 이해할 있을 것입니다.


<a id="single-responsibility"></a>

<!--
## Single responsibility
-->
## 단일 책임(Single responsibility)

<!--
Apply the [*single responsibility principle (SRP)*](https://wikipedia.org/wiki/Single_responsibility_principle) to all components, services, and other symbols.
This helps make the application cleaner, easier to read and maintain, and more testable.
-->
모든 컴포넌트와 서비스, 심볼은 [*단일 책임 원칙\(single responsibility principle, SRP\)*](https://wikipedia.org/wiki/Single_responsibility_principle)을 준수하며 작성하세요.
그러면 애플리케이션이 좀 더 깔끔해지고 유지보수하기도 편하며, 테스트하기도 편해집니다.


<a id="01-01"></a>

<!--
### Rule of One
-->
### 첫번째 규칙

<!--
#### Style 01-01
-->
#### 스타일 01-01

<!--
<div class="s-rule do">

**Do** define one thing, such as a service or component, per file.

</div>

<div class="s-rule consider">

**Consider** limiting files to 400 lines of code.

</div>

<div class="s-why">

**Why**? <br />
One component per file makes it far easier to read, maintain, and avoid collisions with teams in source control.

</div>

<div class="s-why">

**Why**? <br />
One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

</div>

<div class="s-why-last">

**Why**? <br />
A single component can be the default export for its file which facilitates lazy loading with the router.

</div>

The key is to make the code more reusable, easier to read, and less mistake prone.

The following *negative* example defines the `AppComponent`, bootstraps the app,
defines the `Hero` model object, and loads heroes from the server all in the same file.
*Don't do this*.

<code-example format="typescript" path="styleguide/src/01-01/app/heroes/hero.component.avoid.ts" language="typescript" header="app/heroes/hero.component.ts"></code-example>

It is a better practice to redistribute the component and its
supporting classes into their own, dedicated files.

<code-tabs>
    <code-pane header="main.ts" path="styleguide/src/01-01/main.ts"></code-pane>
    <code-pane header="app/app.module.ts" path="styleguide/src/01-01/app/app.module.ts"></code-pane>
    <code-pane header="app/app.component.ts" path="styleguide/src/01-01/app/app.component.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/01-01/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="app/heroes/shared/hero.service.ts" path="styleguide/src/01-01/app/heroes/shared/hero.service.ts"></code-pane>
    <code-pane header="app/heroes/shared/hero.model.ts" path="styleguide/src/01-01/app/heroes/shared/hero.model.ts"></code-pane>
    <code-pane header="app/heroes/shared/mock-heroes.ts" path="styleguide/src/01-01/app/heroes/shared/mock-heroes.ts"></code-pane>
</code-tabs>

As the application grows, this rule becomes even more important.

[Back to top](#toc)
-->
<div class="s-rule do">

한 파일에는 서비스나 컴포넌트와 같은 Angular 구성요소 하나만 정의**하세요.**

</div>

<div class="s-rule consider">

한 파일에는 400줄 이하의 코드만 작성하는 것을 **권장합니다.**

</div>

<div class="s-why">

**왜**? <br />
파일 하나에 컴포넌트를 하나만 정의하면 좀 더 읽기 편한 코드를 작성할 수 있고, 유지보수하기도 편하며, 팀 단위로 개발할 때 코드 충돌이 발생하는 것도 피할 수 있습니다.

</div>

<div class="s-why">

**왜**? <br />
한 파일에 컴포넌트를 여러개 정의하면 컴포넌트끼리 연관된 코드나 함께 공유하는 변수, 의도치 않게 사용된 클로저 때문에 버그가 발생할 수도 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
한 파일에 컴포넌트를 하나만 정의하면, 기본 export 항목을 지정해서 라우터로 지연로딩할 때 활용할 수 있습니다.

</div>

요점은 코드를 좀 더 재사용성하기 편하게, 읽기 쉽게, 실수가 발생할 여지를 최대한 줄이는 것입니다.

다음 예제는 `AppComponent`를 정의하면서 앱을 부트스트랩하고, `Hero` 모델을 정의하고 서버에서 데이터를 받아오는 동작을 모두 한 파일에서 하고 있습니다.
*이렇게 작성하지 마세요.*

<code-example format="typescript" path="styleguide/src/01-01/app/heroes/hero.component.avoid.ts" language="typescript" header="app/heroes/hero.component.ts"></code-example>

이 코드는 각각의 역할에 맞게 개별 파일로 작성하는 것이 더 좋습니다.

<code-tabs>
    <code-pane header="main.ts" path="styleguide/src/01-01/main.ts"></code-pane>
    <code-pane header="app/app.module.ts" path="styleguide/src/01-01/app/app.module.ts"></code-pane>
    <code-pane header="app/app.component.ts" path="styleguide/src/01-01/app/app.component.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/01-01/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="app/heroes/shared/hero.service.ts" path="styleguide/src/01-01/app/heroes/shared/hero.service.ts"></code-pane>
    <code-pane header="app/heroes/shared/hero.model.ts" path="styleguide/src/01-01/app/heroes/shared/hero.model.ts"></code-pane>
    <code-pane header="app/heroes/shared/mock-heroes.ts" path="styleguide/src/01-01/app/heroes/shared/mock-heroes.ts"></code-pane>
</code-tabs>

앱이 규모가 커지면서 복잡해 질수록 이 규칙은 점점 더 중요해집니다.

[맨 위로](#toc)


<a id="01-02"></a>
<!--
### Small functions
-->
### 함수는 간단하게

<!--
#### Style 01-02
-->
#### 스타일 01-02

<!--
<div class="s-rule do">

**Do** define small functions

</div>

<div class="s-rule consider">

**Consider** limiting to no more than 75 lines.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to test, especially when they do one thing and serve one purpose.

</div>

<div class="s-why">

**Why**? <br />
Small functions promote reuse.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to read.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to maintain.

</div>

<div class="s-why-last">

**Why**? <br />
Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

함수에는 간단한 기능만 구현**하세요.**

</div>

<div class="s-rule consider">

75줄 이하로 작성하는 것을 **권장합니다.**

</div>

<div class="s-why">

**왜**? <br />
함수는 하나의 목적으로 하나의 기능만 구현되어 있을 때 가장 테스트하기 편합니다.

</div>

<div class="s-why">

**왜**? <br />
함수의 기능이 간단할수록 재사용하기 편합니다.

</div>

<div class="s-why">

**왜**? <br />
함수의 기능이 작을수록 코드를 읽기 쉽습니다.

</div>

<div class="s-why">

**왜**? <br />
함수의 기능이 작을수록 유지보수하기 편합니다.

</div>

<div class="s-why-last">

**왜**? <br />
함수의 기능이 작으면 버그가 발생할 가능성을 줄일 수 있습니다.
기능이 복잡한 함수는 변수를 공유하거나, 불필요한 클로저를 만들고 다른 코드와 커플링될 가능성이 더 크기 때문에 버그가 발생할 가능성도 커집니다.

</div>

[맨 위로](#toc)


<a id="naming"></a>

<!--
## Naming
-->
## 명명규칙

<!--
Naming conventions are hugely important to maintainability and readability.
This guide recommends naming conventions for the file name and the symbol name.
-->
명명 규칙은 앱의 유지보수성이나 가독성 측면에서 아주 중요합니다.
이번 가이드에서는 파일의 이름이나 심볼 이름에 대한 명명 규칙을 소개합니다.


<a id="02-01"></a>

<!--
### General Naming Guidelines
-->
### 일반 명명 규칙

<!--
#### Style 02-01
-->
#### 스타일 02-01

<!--
<div class="s-rule do">

**Do** use consistent names for all symbols.

</div>

<div class="s-rule do">

**Do** follow a pattern that describes the symbol's feature then its type.
The recommended pattern is `feature.type.ts`.

</div>

<div class="s-why">

**Why**? <br />
Naming conventions help provide a consistent way to find content at a glance.
Consistency within the project is vital.
Consistency with a team is important.
Consistency across a company provides tremendous efficiency.

</div>

<div class="s-why">

**Why**? <br />
The naming conventions should help find desired code faster and make it easier to understand.

</div>

<div class="s-why-last">

**Why**? <br />
Names of folders and files should clearly convey their intent.
For example, `app/heroes/hero-list.component.ts` may contain a component that manages a list of heroes.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

심볼의 이름은 일관된 규칙으로 사용**하세요.**

</div>

<div class="s-rule do">

파일의 이름은 그 파일에 정의된 심볼의 기능과 타입이 드러나도록 작성**하세요.**
`기능.타입.ts`와 같은 형식으로 작성하는 것을 권장합니다.

</div>

<div class="s-why">

**왜**? <br />
명명 규칙을 명확하게 정하면 파일의 이름만 봐도 내용을 쉽게 파악할 수 있습니다.
그래서 파일의 이름은 일관된 규칙으로 정해져야 하며, 프로젝트나 팀에서 정한 일관성이라도 좋습니다.
회사 전체에 일관된 명명 규칙을 사용한다면 더 효율적입니다.

</div>

<div class="s-why">

**왜**? <br />
적절한 명명 규칙을 사용하면 원하는 코드를 빠르게 찾을 수 있고, 코드를 이해하기도 쉽습니다.

</div>

<div class="s-why-last">

**왜**? <br />
폴더나 파일의 이름을 보면 그 안의 내용물이 무엇인지 확실하게 알 수 있어야 합니다.
예를 들어 `app/heroes/hero-list.component.ts`라는 파일을 보면 이 파일이 히어로의 리스트를 처리하는 컴포넌트라고 바로 알 수 있습니다.

</div>

[맨 위로](#toc)


<a id="02-02"></a>

<!--
### Separate file names with dots and dashes
-->
### 파일 이름을 마침표(`.`)와 대시(`-`)로 구분하기

<!--
#### Style 02-02
-->
#### 스타일 02-02

<!--
<div class="s-rule do">

**Do** use dashes to separate words in the descriptive name.

</div>

<div class="s-rule do">

**Do** use dots to separate the descriptive name from the type.

</div>

<div class="s-rule do">

**Do** use consistent type names for all components following a pattern that describes the component's feature then its type.
A recommended pattern is `feature.type.ts`.

</div>

<div class="s-rule do">

**Do** use conventional type names including `.service`, `.component`, `.pipe`, `.module`, and `.directive`.
Invent additional type names if you must but take care not to create too many.

</div>

<div class="s-why">

**Why**? <br />
Type names provide a consistent way to quickly identify what is in the file.

</div>

<div class="s-why">

**Why**? <br />
Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.

</div>

<div class="s-why">

**Why**? <br />
Unabbreviated type names such as `.service` are descriptive and unambiguous.
Abbreviations such as `.srv`, `.svc`, and `.serv` can be confusing.

</div>

<div class="s-why-last">

**Why**? <br />
Type names provide pattern matching for any automated tasks.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

파일의 이름을 여러 단어로 설명해야 한다면 대시(`-`)로 구분**하세요.**

</div>

<div class="s-rule do">

파일의 기능을 설명하는 부분과 타입은 마침표(`.`)로 구분**하세요.**

</div>

<div class="s-rule do">

컴포넌트 타입의 파일이라면 그 컴포넌트의 기능을 표현하도록 파일의 이름을 작성**하세요.**
`기능.component.ts` 형식을 권장합니다.

</div>

<div class="s-rule do">

파일의 타입은 `.service`, `.component`, `.pipe`, `.module`, `.directive`로 작성**하세요.**
필요하다면 타입을 추가해도 문제없지만, 너무 많이 추가하는 것은 좋지 않습니다.

</div>

<div class="s-why">

**왜**? <br />
타입의 이름을 보면 이 파일이 어떤 역할을 하는지 직관적으로 알 수 있어야 합니다.

</div>

<div class="s-why">

**왜**? <br />
파일의 타입을 지정하면 IDE에서 특정 종류의 파일을 찾기도 편합니다.

</div>

<div class="s-why">

**왜**? <br />
타입에 사용하는 단어는 축약하지 않는 것이 좋습니다.
`.srv`, `.svc`, `.serv`와 같은 단어는 혼란을 줄 수 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
타입 이름은 태스크를 자동화할 때도 패턴으로 활용할 수 있습니다.

</div>

[맨 위로](#toc)


<a id="02-03"></a>

<!--
### Symbols and file names
-->
### 심볼과 파일 이름

<!--
#### Style 02-03
-->
#### 스타일 02-03

<!--
<div class="s-rule do">

**Do** use consistent names for all assets named after what they represent.

</div>

<div class="s-rule do">

**Do** use upper camel case for class names.

</div>

<div class="s-rule do">

**Do** match the name of the symbol to the name of the file.

</div>

<div class="s-rule do">

**Do** append the symbol name with the conventional suffix \(such as `Component`, `Directive`, `Module`, `Pipe`, or `Service`\) for a thing of that type.

</div>

<div class="s-rule do">

**Do** give the filename the conventional suffix \(such as `.component.ts`, `.directive.ts`, `.module.ts`, `.pipe.ts`, or `.service.ts`\) for a file of that type.

</div>

<div class="s-why">

**Why**? <br />
Consistent conventions make it easy to quickly identify and reference assets of different types.

</div>

| Symbol name                                                                                                                                                                          | File name |
|:---                                                                                                                                                                                  |:---       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class AppComponent { } </code-example>                             | app.component.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroesComponent { } </code-example>                          | heroes.component.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroListComponent { } </code-example>                        | hero-list.component.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroDetailComponent { } </code-example>                      | hero-detail.component.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Directive({ &hellip; }) &NewLine;export class ValidationDirective { } </code-example>                      | validation.directive.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppModule </code-example>                                     | app.module.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'initCaps' }) &NewLine;export class InitCapsPipe implements PipeTransform { } </code-example> | init-caps.pipe.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class UserProfileService { } </code-example>                                  | user-profile.service.ts |

[Back to top](#toc)
-->
<div class="s-rule do">

애플리케이션에 사용하는 모든 이름은 그 특성을 나타내도록 일관되게 **지으세요.**

</div>

<div class="s-rule do">

클래스 이름은 대문자 캐멀 케이스를 **사용하세요.**

</div>

<div class="s-rule do">

심볼의 이름과 파일의 이름이 연관되도록 **하세요.**

</div>

<div class="s-rule do">

심볼 이름 뒤에는 타입을 표현하는 접미사\(`Component`, `Directive`, `Module`, `Pipe`, `Service`\)를 **붙이세요.**

</div>

<div class="s-rule do">

파일 이름에도 타입을 표현하는 접미사\(`.component.ts`, `.directive.ts`, `.module.ts`, `.pipe.ts`, `.service.ts`\)를 **붙이세요.**

</div>

<div class="s-why">

**왜**? <br />
심볼과 파일의 이름을 일관되게 지으면 어떤 타입인지 구분하기 편하고, 참조하기도 편합니다.

</div>

| 심볼 이름                                                                                                                                                                                | 파일 이름                    |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------|
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class AppComponent { } </code-example>                             | app.component.ts         |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroesComponent { } </code-example>                          | heroes.component.ts      |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroListComponent { } </code-example>                        | hero-list.component.ts   |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Component({ &hellip; }) &NewLine;export class HeroDetailComponent { } </code-example>                      | hero-detail.component.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Directive({ &hellip; }) &NewLine;export class ValidationDirective { } </code-example>                      | validation.directive.ts  |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppModule </code-example>                                     | app.module.ts            |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'initCaps' }) &NewLine;export class InitCapsPipe implements PipeTransform { } </code-example> | init-caps.pipe.ts        |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class UserProfileService { } </code-example>                                  | user-profile.service.ts  |

[맨 위로](#toc)


<a id="02-04"></a>

<!--
### Service names
-->
### 서비스 이름

<!--
#### Style 02-04
-->
#### 스타일 02-04

<!--
<div class="s-rule do">

**Do** use consistent names for all services named after their feature.

</div>

<div class="s-rule do">

**Do** suffix a service class name with `Service`.
For example, something that gets data or heroes should be called a `DataService` or a `HeroService`.

A few terms are unambiguously services.
They typically indicate agency by ending in "-er".
You may prefer to name a service that logs messages `Logger` rather than `LoggerService`.
Decide if this exception is agreeable in your project.
As always, strive for consistency.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify and reference services.

</div>

<div class="s-why">

**Why**? <br />
Clear service names such as `Logger` do not require a suffix.

</div>

<div class="s-why-last">

**Why**? <br />
Service names such as `Credit` are nouns and require a suffix and should be named with a suffix when it is not obvious if it is a service or something else.

</div>

| Symbol name                                                                                                                                      | File name |
|:---                                                                                                                                              |:---       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class HeroDataService { } </code-example> | hero-data.service.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class CreditService { } </code-example>   | credit.service.ts    |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class Logger { } </code-example>          | logger.service.ts    |

[Back to top](#toc)
-->
<div class="s-rule do">

서비스의 이름은 그 서비스가 제공하는 기능을 표현하도록 **정의하세요.**

</div>

<div class="s-rule do">

서비스 클래스 이름 뒤에 `Service`라는 접미사를 **붙이세요.**
데이터를 처리하는 서비스라면 `DataService`로, 히어로를 관리하는 서비스는 `HeroService`로 정의하는 식입니다.

이렇게 작성하면 간단한 단어 하나로도 서비스라는 것이 명확해 집니다.
하지만 개발자에 따라서 "-er" 접미사를 사용하는 것이 더 익숙할 수도 있습니다.
그래서 `LoggerService`라는 이름보다 `Logger`가 더 익숙할 수 있습니다.
프로젝트에 어울린다면 어떤 방식을 사용해도 문제없습니다.
일관성을 유지하기만 하면 됩니다.

</div>

<div class="s-why">

**왜**? <br />
이름을 일관되게 정의하면 해당 심볼이 서비스라는 것이 명확해집니다.

</div>

<div class="s-why">

**왜**? <br />
`Logger`와 같은 이름을 사용할 때는 클래스에 `Service` 접미사를 붙이지 않는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
`Service`라는 접미사 없이 서비스 이름을 `Credit`라고 정의하면, 이 이름만 보고 이 심볼이 서비스인지 쉽게 알 수 없습니다.

</div>

| 심볼 이름                                                                                                                                            | 파일 이름                |
|:-------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------|
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class HeroDataService { } </code-example> | hero-data.service.ts |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class CreditService { } </code-example>   | credit.service.ts    |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Injectable() &NewLine;export class Logger { } </code-example>          | logger.service.ts    |

[맨 위로](#toc)


<a id="02-05"></a>

<!--
### Bootstrapping
-->
### 부트스트랩

<!--
#### Style 02-05
-->
### 스타일 02-05

<!--
<div class="s-rule do">

**Do** put bootstrapping and platform logic for the application in a file named `main.ts`.

</div>

<div class="s-rule do">

**Do** include error handling in the bootstrapping logic.

</div>

<div class="s-rule avoid">

**Avoid** putting application logic in `main.ts`.
Instead, consider placing it in a component or service.

</div>

<div class="s-why">

**Why**? <br />
Follows a consistent convention for the startup logic of an app.

</div>

<div class="s-why-last">

**Why**? <br />
Follows a familiar convention from other technology platforms.

</div>

<code-example header="main.ts" path="styleguide/src/02-05/main.ts"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

부트스트랩이나 플랫폼과 관련된 로직은 `main.ts` 파일에 **작성하세요.**

</div>

<div class="s-rule do">

부트스트랩 로직에서 발생할 수 있는 에러를 처리하는 로직도 함께 **작성하세요.**

</div>

<div class="s-rule avoid">

애플리케이션 로직을 `main.ts` 파일에 작성하는 것은 **피하세요.**
이 로직은 컴포넌트나 서비스에 들어가는 것이 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
`main.ts` 파일에는 애플리케이션을 시작할 때 필요한 로직만 들어가는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
다른 언어나 프레임워크와 비슷한 방식을 사용하는 것이 익숙합니다.

</div>

<code-example header="main.ts" path="styleguide/src/02-05/main.ts"></code-example>

[맨 위로](#toc)


<a id="05-02"></a>
<a id="component-selectors"></a>

<!--
### Component selectors
-->
### 컴포넌트 셀렉터

<!--
#### Style 05-02
-->
### 스타일 05-02

<!--
<div class="s-rule do">

**Do** use *dashed-case* or *kebab-case* for naming the element selectors of components.

</div>

<div class="s-why-last">

**Why**? <br />
Keeps the element names consistent with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements).

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-02/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-02/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-02/app/app.component.html"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule do">

컴포넌트의 셀렉터 이름은 *대시-케이스\(dash-case\)* 나 *케밥-케이스\(kebab-case\)* 로 **정의하세요.**

</div>

<div class="s-why-last">

**왜**? <br />
엘리먼트 이름은 [커스텀 엘리먼트](https://www.w3.org/TR/custom-elements/) 표준을 따르는 것이 좋습니다.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-02/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-02/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-02/app/app.component.html"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="02-07"></a>

<!--
### Component custom prefix
-->
### 커스텀 컴포넌트의 접두사

<!--
#### Style 02-07
-->
#### 스타일 02-07

<!--
<div class="s-rule do">

**Do** use a hyphenated, lowercase element selector value; for example, `admin-users`.

</div>

<div class="s-rule do">

**Do** use a custom prefix for a component selector.
For example, the prefix `toh` represents **T**our **o**f **H**eroes and the prefix `admin` represents an admin feature area.

</div>

<div class="s-rule do">

**Do** use a prefix that identifies the feature area or the application itself.

</div>

<div class="s-why">

**Why**? <br />
Prevents element name collisions with components in other applications and with native HTML elements.

</div>

<div class="s-why">

**Why**? <br />
Makes it easier to promote and share the component in other applications.

</div>

<div class="s-why-last">

**Why**? <br />
Components are easy to identify in the DOM.

</div>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/02-07/app/heroes/hero.component.avoid.ts" region="example"></code-example>

<code-example header="app/users/users.component.ts" path="styleguide/src/02-07/app/users/users.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/02-07/app/heroes/hero.component.ts" region="example"></code-example>

<code-example header="app/users/users.component.ts" path="styleguide/src/02-07/app/users/users.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

컴포넌트 셀렉터는 하이픈\(`-`\)으로 구분되는 소문자를 **사용하세요.**
`admin-users`와 같이 지정하면 됩니다.

</div>

<div class="s-rule do">

컴포넌트 셀렉터에는 커스텀 접두사를 **사용하세요.**
예를 들어 프로젝트 이름이 **T**our **o**f **H**eroes 라면 `toh`를 접두사로 사용할 수 있으며, 관리자용 기능이 구현되어 있는 곳에서는 `admin`을 접두사로 사용할 수 있습니다.

</div>

<div class="s-rule do">

접두사는 해당 컴포넌트의 기능이나 앱의 특성을 표현할 수 있도록 **지정하세요.**

</div>

<div class="s-why">

**왜**? <br />
컴포넌트의 엘리먼트 셀렉터는 다른 앱의 컴포넌트 셀렉터나 네이티브 HTML과 충돌하지 않도록 지정해야 합니다.

</div>

<div class="s-why">

**왜**? <br />
커스텀 컴포넌트가 다른 애플리케이션에도 활용될 수 있는 경우를 생각해보면, 사용하기 편하고 잘 구분되는 이름을 사용하는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
DOM에 사용된 컴포넌트는 다른 네이티브 HTML 엘리먼트와 쉽게 구분되어야 합니다.

</div>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/02-07/app/heroes/hero.component.avoid.ts" region="example"></code-example>

<code-example header="app/users/users.component.ts" path="styleguide/src/02-07/app/users/users.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/02-07/app/heroes/hero.component.ts" region="example"></code-example>

<code-example header="app/users/users.component.ts" path="styleguide/src/02-07/app/users/users.component.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="02-06"></a>

<!--
### Directive selectors
-->
### 디렉티브 셀렉터

<!--
#### Style 02-06
-->
#### 스타일 02-06

<!--
<div class="s-rule do">

**Do** Use lower camel case for naming the selectors of directives.

</div>

<div class="s-why">

**Why**? <br />
Keeps the names of the properties defined in the directives that are bound to the view consistent with the attribute names.

</div>

<div class="s-why-last">

**Why**? <br />
The Angular HTML parser is case sensitive and recognizes lower camel case.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

디렉티브의 셀렉터는 소문자로 시작하는 캐멀 케이스를 **사용하세요.**

</div>

<div class="s-why">

**왜**? <br />
디렉티브에 정의된 프로퍼티 이름이 뷰에서 어떻게 활용되는지 생각해 보세요.
디렉티브의 셀렉터는 HTML문서에서 어트리뷰트로 사용됩니다.

</div>

<div class="s-why-last">

**왜**? <br />
Angular HTML 파서는 대소문자를 구별하기 때문에 소문자 캐멀 케이스도 활용할 수 있습니다.

</div>

[맨 위로](#toc)


<a id="02-08"></a>

<!--
### Directive custom prefix
-->
### 커스텀 디렉티브의 접두사

<!--
#### Style 02-08
-->
#### 스타일 02-08

<!--
<div class="s-rule do">

**Do** use a custom prefix for the selector of directives \(for example, the prefix `toh` from **T**our **o**f **H**eroes\).

</div>

<div class="s-rule do">

**Do** spell non-element selectors in lower camel case unless the selector is meant to match a native HTML attribute.

</div>

<div class="s-rule avoid">

**Don't** prefix a directive name with `ng` because that prefix is reserved for Angular and using it could cause bugs that are difficult to diagnose.

</div>

<div class="s-why">

**Why**? <br />
Prevents name collisions.

</div>

<div class="s-why-last">

**Why**? <br />
Directives are easily identified.

</div>

<code-example header="app/shared/validate.directive.ts" path="styleguide/src/02-08/app/shared/validate.directive.avoid.ts" region="example"></code-example>

<code-example header="app/shared/validate.directive.ts" path="styleguide/src/02-08/app/shared/validate.directive.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

커스텀 디렉티브의 셀렉터에는 접두사를 **사용하세요.**
예를 들어 프로젝트 이름이 **T**our **o**f **H**eroes 라면 `toh`를 접두사로 사용할 수 있습니다.

</div>

<div class="s-rule do">

디렉티브 셀렉터는 네이티브 HTML 엘리먼트나 네이티브 어트리뷰트와 겹치지 않는 소문자 캐멀 케이스를 **사용하세요.**

</div>

<div class="s-rule avoid">

`ng` 접두사는 Angular가 사용하는 접두사이기 때문에, 이 접두사를 사용하면 버그가 발생하더라도 원인을 찾기 힘듭니다.
`ng` 접두사는 **사용하지 마세요.**

</div>

<div class="s-why">

**왜**? <br />
디렉티브가 네이티브 HTML과 충돌하면 안됩니다.

</div>

<div class="s-why-last">

**왜**? <br />
디렉티브는 이름만 보고 쉽게 구분할 수 있어야 합니다.

</div>

<code-example header="app/shared/validate.directive.ts" path="styleguide/src/02-08/app/shared/validate.directive.avoid.ts" region="example"></code-example>

<code-example header="app/shared/validate.directive.ts" path="styleguide/src/02-08/app/shared/validate.directive.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="02-09"></a>
<a id="pipe-names"></a>

<!--
### Pipe names
-->
### 파이프 이름

<!--
#### Style 02-09
-->
#### 스타일 02-09

<!--
<div class="s-rule do">

**Do** use consistent names for all pipes, named after their feature.
The pipe class name should use [UpperCamelCase](guide/glossary#case-types) \(the general convention for class names\), and the corresponding `name` string should use *lowerCamelCase*.
The `name` string cannot use hyphens \("dash-case" or "kebab-case"\).

</div>

<div class="s-why-last">

**Why**? <br />
Provides a consistent way to quickly identify and reference pipes.

</div>

| Symbol name                                                                                                                                                                          | File name |
|:---                                                                                                                                                                                  |:---       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'ellipsis' }) &NewLine;export class EllipsisPipe implements PipeTransform { } </code-example> | ellipsis.pipe.ts  |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'initCaps' }) &NewLine;export class InitCapsPipe implements PipeTransform { } </code-example> | init-caps.pipe.ts |

[Back to top](#toc)
-->
<div class="s-rule do">

커스텀 파이프를 구현한 클래스에는 `Pipe` 접미사를 **붙이고,** 이 파일에는 `.pipe` 타입을 **명시하세요.**
파이프 클래스의 이름은 클래스 이름이 보통 그렇듯 [대문자 캐멀 케이스\(UpperCamelCase\)](guide/glossary#case-types)로 작성하며, 메타데이터의 `name` 프로퍼티는 *소문자 캐멀 케이스(lowerCamelCase)* 로 작성해야 합니다.
`name`에는 하이픈을 사용하는 "대시 케이스\(dash-case\)"나 "케밥 케이스\(kebab-case\)"를 사용하지 마세요.

</div>

<div class="s-why-last">

**왜**? <br />
이렇게 하면 파이프를 쉽게 구별할 수 있고, 참조하기도 편합니다.

</div>

| 심볼 이름                                                                                                                                                                                | 파일 이름             |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------|
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'ellipsis' }) &NewLine;export class EllipsisPipe implements PipeTransform { } </code-example> | ellipsis.pipe.ts  |
| <code-example format="typescript" hideCopy language="typescript"> &commat;Pipe({ name: 'initCaps' }) &NewLine;export class InitCapsPipe implements PipeTransform { } </code-example> | init-caps.pipe.ts |

[맨 위로](#toc)


<a id="02-10"></a>

<!--
### Unit test file names
-->
### 유닛 테스트 파일 이름

<!--
#### Style 02-10
-->
#### 스타일 02-10

<!--
<div class="s-rule do">

**Do** name test specification files the same as the component they test.

</div>

<div class="s-rule do">

**Do** name test specification files with a suffix of `.spec`.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify tests.

</div>

<div class="s-why-last">

**Why**? <br />
Provides pattern matching for [karma](https://karma-runner.github.io) or other test runners.

</div>

| Test type  | File names |
|:---        |:---        |
| Components | heroes.component.spec.ts <br /> hero-list.component.spec.ts <br /> hero-detail.component.spec.ts |
| Services   | logger.service.spec.ts <br /> hero.service.spec.ts <br /> filter-text.service.spec.ts            |
| Pipes      | ellipsis.pipe.spec.ts <br /> init-caps.pipe.spec.ts                                              |

[Back to top](#toc)
-->
<div class="s-rule do">

유닛 테스트 파일의 이름에 그 파일이 테스트하는 컴포넌트의 이름을 **사용하세요.**

</div>

<div class="s-rule do">

유닛 테스트 파일에는 `.spec` 접미사를 **붙이세요.**

</div>

<div class="s-why">

**왜**? <br />
이렇게 하면 테스트 파일을 쉽게 구분할 수 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
[karma](https://karma-runner.github.io)와 같은 테스트 러너는 파일 패턴 매칭을 지원합니다.

</div>

| 테스트 종류     | 파일 이름                                                                                            |
|:-----------|:-------------------------------------------------------------------------------------------------|
| Components | heroes.component.spec.ts <br /> hero-list.component.spec.ts <br /> hero-detail.component.spec.ts |
| Services   | logger.service.spec.ts <br /> hero.service.spec.ts <br /> filter-text.service.spec.ts            |
| Pipes      | ellipsis.pipe.spec.ts <br /> init-caps.pipe.spec.ts                                              |

[맨 위로](#toc)


<a id="02-11"></a>

<!--
### *End-to-End* (E2E) test file names
-->
### *엔드-투-엔드* (End-to-End, E2E) 테스트 파일의 이름

<!--
#### Style 02-11
-->
#### 스타일 02-11

<!--
<div class="s-rule do">

**Do** name end-to-end test specification files after the feature they test with a suffix of `.e2e-spec`.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify end-to-end tests.

</div>

<div class="s-why-last">

**Why**? <br />
Provides pattern matching for test runners and build automation.

</div>

| Test type        | File names |
|:---              |:---        |
| End-to-End Tests | app.e2e-spec.ts <br /> heroes.e2e-spec.ts |

[Back to top](#toc)
-->
<div class="s-rule do">

엔드-투-엔드 테스트 파일의 이름은 테스트하려는 기능 뒤에 `.e2e-spec` 접미사를 **붙이세요.**

</div>

<div class="s-why">

**왜**? <br />
이렇게 하면 엔드-투-엔드 테스트 파일을 쉽게 구분할 수 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
이렇게 하면 테스트 러너나 빌드 자동화에 패턴 매칭을 사용할 수 있습니다.

</div>

| 테스트 종류           | 파일 이름                                     |
|:-----------------|:------------------------------------------|
| End-to-End Tests | app.e2e-spec.ts <br /> heroes.e2e-spec.ts |

[맨 위로](#toc)


<a id="02-12"></a>

<!--
### Angular `NgModule` names
-->
### Angular `NgModule`의 이름

<!--
#### Style 02-12
-->
#### 스타일 02-12

<!--
<div class="s-rule do">

**Do** append the symbol name with the suffix `Module`.

</div>

<div class="s-rule do">

**Do** give the file name the `.module.ts` extension.

</div>

<div class="s-rule do">

**Do** name the module after the feature and folder it resides in.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify and reference modules.

</div>

<div class="s-why">

**Why**? <br />
Upper camel case is conventional for identifying objects that can be instantiated using a constructor.

</div>

<div class="s-why-last">

**Why**? <br />
Easily identifies the module as the root of the same named feature.

</div>

<div class="s-rule do">

**Do** suffix a `RoutingModule` class name with `RoutingModule`.

</div>

<div class="s-rule do">

**Do** end the filename of a `RoutingModule` with `-routing.module.ts`.

</div>

<div class="s-why-last">

**Why**? <br />
A `RoutingModule` is a module dedicated exclusively to configuring the Angular router.
A consistent class and file name convention make these modules easy to spot and verify.

</div>

| Symbol name                                                                                                                                                    | File name |
|:---                                                                                                                                                            |:---       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppModule { } </code-example>           | app.module.ts            |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class HeroesModule { } </code-example>        | heroes.module.ts         |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class VillainsModule { } </code-example>      | villains.module.ts       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppRoutingModule { } </code-example>    | app-routing.module.ts    |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class HeroesRoutingModule { } </code-example> | heroes-routing.module.ts |

[Back to top](#toc)
-->
<div class="s-rule do">

`NgModule` 심볼 이름에는 `Module` 접미사를 **붙이세요.**

</div>

<div class="s-rule do">

모듈을 정의한 파일 이름에는 `.module.ts` 접두사를 **붙이세요.**

</div>

<div class="s-rule do">

모듈의 기능을 표현할 수 있는 폴더 이름을 짓고, 이 파일 안에 모듈을 **작성하세요.**

</div>

<div class="s-why">

**왜**? <br />
이렇게 하면 모듈을 쉽게 구분할 수 있고, 참조하기도 편합니다.

</div>

<div class="s-why">

**왜**? <br />
인스턴스를 생성하는 용도로 사용하는 객체의 이름은 대문자 캐멀 케이스로 정의하는 것이 일반적입니다.

</div>

<div class="s-why-last">

**왜**? <br />
이렇게 하면 같은 이름을 사용하더라도 최상위 객체인 모듈을 쉽게 구분할 수 있습니다.

</div>

<div class="s-rule do">

정의하는 모듈이 *라우팅 모듈* 이라면 `RoutingModule` 접미사를 **붙이세요.**

</div>

<div class="s-rule do">

*라우팅 모듈* 을 정의한 파일의 이름에는 `-routing.module.ts` 접미사를 **붙이세요.**

</div>

<div class="s-why-last">

**왜**? <br />
*라우팅 모듈* 은 Angular 라우터에 특화된 기능을 제공하는 모듈입니다.
클래스 이름과 파일 이름을 이렇게 지정하면, 다른 모듈과 라우팅 모듈을 쉽게 구분할 수 있습니다.

</div>

| 심볼 이름                                                                                                                                                          | 파일 이름                    |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------|
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppModule { } </code-example>           | app.module.ts            |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class HeroesModule { } </code-example>        | heroes.module.ts         |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class VillainsModule { } </code-example>      | villains.module.ts       |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class AppRoutingModule { } </code-example>    | app-routing.module.ts    |
| <code-example format="typescript" hideCopy language="typescript"> &commat;NgModule({ &hellip; }) &NewLine;export class HeroesRoutingModule { } </code-example> | heroes-routing.module.ts |

[맨 위로](#toc)


<!--
## Application structure and NgModules
-->
## 애플리케이션 구조와 NgModule

<!--
Have a near-term view of implementation and a long-term vision.
Start small but keep in mind where the application is heading.

All of the application's code goes in a folder named `src`.
All feature areas are in their own folder, with their own NgModule.

All content is one asset per file.
Each component, service, and pipe is in its own file.
All third party vendor scripts are stored in another folder and not in the `src` folder.
You didn't write them and you don't want them cluttering `src`.
Use the naming conventions for files in this guide.

[Back to top](#toc)
-->
애플리케이션을 개발할 때는 단기 계획과 장기 계획이 필요합니다.
그리고 시작은 작게 하지만 애플리케이션이 나아가야 할 방향은 항상 염두에 두어야 합니다.

애플리케이션 코드는 모두 `src` 폴더에 둡니다.
이 중에서 특정 기능은 따로 모아 별개의 폴더에 둘 수 있으며, 이 때 NgModule도 함께 생성합니다.

파일 하나에는 구성요소 하나만 선언하는 것이 좋습니다. 컴포넌트, 서비스, 파이프 등 어떤 구성요소라도 한 파일에 함께 있지 말고 개별 파일로 있는 것이 좋습니다.
서드 파티 스크립트 파일은 `src` 폴더가 아니라 다른 폴더에 위치합니다.
이 코드는 개발자가 직접 수정하지 않기 때문에 `src` 폴더에 함께 있을 필요가 없습니다.
파일 명명 규칙은 [이 섹션](guide/styleguide#naming)을 참고하세요.

[맨 위로](#toc)


<a id="04-01"></a>

### `LIFT`

<!--
#### Style 04-01
-->
#### 스타일 04-01

<!--
<div class="s-rule do">

**Do** structure the application such that you can **L**ocate code quickly, **I**dentify the code at a glance, keep the **F**lattest structure you can, and **T**ry to be DRY.

</div>

<div class="s-rule do">

**Do** define the structure to follow these four basic guidelines, listed in order of importance.

</div>

<div class="s-why-last">

**Why**? <br />
LIFT provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly.
To confirm your intuition about a particular structure, ask:
*Can I quickly open and start work in all of the related files for this feature*?

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

다음과 같은 LIFT 규칙을 따르는 것이 좋습니다.

**L**ocate: 코드는 개발자가 찾기 쉬운 곳에 두세요.
**I**dentify: 파일을 봤을 때 이 파일이 무엇인지 한 눈에 알아볼 수 있도록 하세요.
**F**lattest: 최대한 단순한 폴더 구조를 유지하세요.
**T**: 반복된 부분은 최대한 묶으세요. \(Try to be DRY, DRY: Don't Repeat Yourself\)

</div>

<div class="s-rule do">

이 규칙은 먼저 언급한 순서대로 중요합니다.

</div>

<div class="s-why-last">

**왜**? <br />
LIFT 규칙을 따르면 애플리케이션 구조를 모듈 단위로 일관성있게 확장할 수 있기 때문에 개발자가 원하는 코드를 빠르게 찾을 수 있습니다.
이런 상황을 항상 생각해 보세요:
*이 기능을 수정하려면 어디에 있는 파일을 열어야 원하는 코드를 찾을 수 있을까*?

</div>

[맨 위로](#toc)


<a id="04-02"></a>

### Locate

<!--
#### Style 04-02
-->
#### 스타일 04-02

<!--
<div class="s-rule do">

**Do** make locating code intuitive and fast.

</div>

<div class="s-why-last">

**Why**? <br />
To work efficiently you must be able to find files quickly, especially when you do not know \(or do not remember\) the file *names*.
Keeping related files near each other in an intuitive location saves time.
A descriptive folder structure makes a world of difference to you and the people who come after you.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

코드는 직관적으로 떠오르는 위치에 두세요.
그게 간단하고 빠릅니다.

</div>

<div class="s-why-last">

**왜**? <br />
개발효율을 높이려면 원하는 파일을 빠르게 찾아야 하는데, 이 때 파일의 *이름* 을 기억하고 있는지는 중요하지 않습니다.
관련된 파일은 서로 비슷한 위치에 두어야 시간을 절약할 수 있습니다.
폴더 이름과 구조만 봐도 어떤 의미인지 알 수 있다면 당신과 당신의 후임이 만나는 세상은 조금 더 행복해질 것입니다.

</div>

[맨 위로](#toc)


<a id="04-03"></a>

### Identify

<!--
#### Style 04-03
-->
#### 스타일 04-03

<!--
<div class="s-rule do">

**Do** name the file such that you instantly know what it contains and represents.

</div>

<div class="s-rule do">

**Do** be descriptive with file names and keep the contents of the file to exactly one component.

</div>

<div class="s-rule avoid">

**Avoid** files with multiple components, multiple services, or a mixture.

</div>

<div class="s-why-last">

**Why**? <br />
Spend less time hunting and pecking for code, and become more efficient.
Longer file names are far better than *short-but-obscure* abbreviated names.

</div>

<div class="alert is-helpful">

It may be advantageous to deviate from the *one-thing-per-file* rule when you have a set of small, closely-related features that are better discovered and understood in a single file than as multiple files.
Be wary of this loophole.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

파일 이름은 그 파일의 내용물을 보고 바로 생각나는 것으로 **지으세요.**

</div>

<div class="s-rule do">

파일 이름은 파일의 내용과 관련된 것으로 짓고 그 파일은 그 용도로만 **사용하세요.**

</div>

<div class="s-rule avoid">

파일 하나에 컴포넌트나 서비스를 여러개 선언하지 **마세요.**

</div>

<div class="s-why-last">

**왜**? <br />
코드가 어디있는지 오래 찾아다닐수록 개발 효율은 떨어집니다.
그래서 *애매한 의미로 짧게* 줄인 파일 이름보다는 조금 길더라도 파일 내용을 잘 설명하는 이름이 더 좋습니다.

</div>

<div class="alert is-helpful">

때로는 *한 파일에 하나만 정의하라는* 규칙을 지키지 않는 것이 나을 때도 있습니다.
서로 긴밀하게 연관된 코드이고 이 코드가 아주 짧은 경우라면 여러 파일에 나눠서 선언하는 것보다 한 파일에 두는 것이 좋습니다.
하지만 이런 경우를 제외한다면 *한 파일에 하나만 정의한다는 원칙* 은 항상 지키는 것이 좋습니다.

</div>

[맨 위로](#toc)


<a id="04-04"></a>

### Flat

<!--
#### Style 04-04
-->
#### 스타일 04-04

<!--
<div class="s-rule do">

**Do** keep a flat folder structure as long as possible.

</div>

<div class="s-rule consider">

**Consider** creating sub-folders when a folder reaches seven or more files.

</div>

<div class="s-rule consider">

**Consider** configuring the IDE to hide distracting, irrelevant files such as generated `.js` and `.js.map` files.

</div>

<div class="s-why-last">

**Why**? <br />
No one wants to search for a file through seven levels of folders.
A flat structure is easy to scan.

On the other hand, [psychologists believe](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) that humans start to struggle when the number of adjacent interesting things exceeds nine.
So when a folder has ten or more files, it may be time to create subfolders.

Base your decision on your comfort level.
Use a flatter structure until there is an obvious value to creating a new folder.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

폴더 구조는 최대한 단순하게 **유지하세요.**

</div>

<div class="s-rule consider">

파일의 개수가 7개 이상 된다면 하위 폴더를 만들어서 분리하는 것을 **권장합니다.**

</div>

<div class="s-rule consider">

`.js` 파일이나 `.js.map` 파일같이 개발 단계에서 직접 사용되지 않는 파일은 IDE에서 보이지 않도록 설정하는 것을 **권장합니다.**

</div>

<div class="s-why-last">

**왜**? <br />
파일 하나를 찾기 위해 폴더 안쪽으로 7번이나 들어가고 싶은 사람은 아무도 없습니다.
한 폴더에 모두 있어야 찾기 편합니다.

그런데 [심리학](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) 측면에서 생각해보면 관심사가 9개를 넘어가면 사람이 혼란을 느끼기 시작합니다.
그래서 폴더 안에 파일이 10개 이상 있다면 하위 폴더를 만드는 것도 고려해볼만 합니다.

편한 방법을 선택하세요.
폴더를 만들어야 할 이유가 확실하게 생기지 않는다면 폴더 구조는 최대한 단순하게 유지하는 것이 좋습니다.

</div>

[맨 위로](#toc)


<a id="04-05"></a>

<!--
### *T-DRY* \(Try to be *DRY*\)
-->
### *T-DRY* (되도록이면 *DRY* 정책을 지키세요.)

<!--
#### Style 04-05
-->
#### 스타일 04-05

<!--
<div class="s-rule do">

**Do** be DRY \(Don't Repeat Yourself\).

</div>

<div class="s-rule avoid">

**Avoid** being so DRY that you sacrifice readability.

</div>

<div class="s-why-last">

**Why**? <br />
Being DRY is important, but not crucial if it sacrifices the other elements of LIFT.
That's why it's called *T-DRY*.
For example, it's redundant to name a template `hero-view.component.html` because with the `.html` extension, it is obviously a view.
But if something is not obvious or departs from a convention, then spell it out.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

DRY \(Don't Repeat Yourself\) 정책을 **되도록이면 지키세요**.

</div>

<div class="s-rule avoid">

하지만 DRY 정책이 과하면 코드의 가독성이 떨어집니다.

</div>

<div class="s-why-last">

**왜**? <br />
DRY 정책을 유지하는 것은 좋지만 다른 LIFT 정책을 포기할 정도로 중요하지는 않습니다.
그래서 DRY 정책을 *반드시* 지키라는 것이 아니라 *되도록이면* 지키라고 하는 것입니다.
예를 들어 `hero-view.component.html`라는 이름의 템플릿 파일이 있을 때 이 파일의 확장자 부분 `.html`은 쓸모없어 보일 수 있습니다.
하지만 확장자 지정을 생략하면 이 파일이 어떤 용도로 사용되는 파일인지 한 번에 알아볼 수 없게 됩니다.

</div>

[맨 위로](#toc)


<a id="04-06"></a>

<!--
### Overall structural guidelines
-->
### 폴더 구조 가이드라인

<!--
#### Style 04-06
-->
#### 스타일 04-06

<!--
<div class="s-rule do">

**Do** start small but keep in mind where the application is heading down the road.

</div>

<div class="s-rule do">

**Do** have a near term view of implementation and a long term vision.

</div>

<div class="s-rule do">

**Do** put all of the application's code in a folder named `src`.

</div>

<div class="s-rule consider">

**Consider** creating a folder for a component when it has multiple accompanying files \(`.ts`, `.html`, `.css`, and `.spec`\).

</div>

<div class="s-why">

**Why**? <br />
Helps keep the application structure small and easy to maintain in the early stages, while being easy to evolve as the application grows.

</div>

<div class="s-why-last">

**Why**? <br />
Components often have four files \(for example, `*.html`, `*.css`, `*.ts`, and `*.spec.ts`\) and can clutter a folder quickly.

</div>

<a id="file-tree"></a>

Here is a compliant folder and file structure:

<div class="filetree">
  <div class="file">
    &lt;project root&gt;
  </div>
  <div class="children">
    <div class="file">
      src
    </div>
    <div class="children">
      <div class="file">
        app
      </div>
      <div class="children">
        <div class="file">
          core
        </div>
        <div class="children">
          <div class="file">
            exception.service.ts&verbar;spec.ts
          </div>
          <div class="file">
            user-profile.service.ts&verbar;spec.ts
          </div>
        </div>
        <div class="file">
          heroes
        </div>
        <div class="children">
          <div class="file">
            hero
          </div>
          <div class="children">
            <div class="file">
              hero.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            hero-list
          </div>
          <div class="children">
            <div class="file">
              hero-list.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            shared
          </div>
          <div class="children">
            <div class="file">
              hero-button.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
            <div class="file">
              hero.model.ts
            </div>
            <div class="file">
              hero.service.ts&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            heroes.component.ts&verbar;html&verbar;css&verbar;spec.ts
          </div>
          <div class="file">
            heroes.module.ts
          </div>
          <div class="file">
            heroes-routing.module.ts
          </div>
        </div>
        <div class="file">
          shared
        </div>
        <div class="children">
          <div class="file">
            shared.module.ts
          </div>
          <div class="file">
            init-caps.pipe.ts&verbar;spec.ts
          </div>
          <div class="file">
            filter-text.component.ts&verbar;spec.ts
          </div>
          <div class="file">
            filter-text.service.ts&verbar;spec.ts
          </div>
        </div>
        <div class="file">
          villains
        </div>
        <div class="children">
          <div class="file">
            villain
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            villain-list
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            shared
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            villains.component.ts&verbar;html&verbar;css&verbar;spec.ts
          </div>
          <div class="file">
            villains.module.ts
          </div>
          <div class="file">
            villains-routing.module.ts
          </div>
        </div>
        <div class="file">
          app.component.ts&verbar;html&verbar;css&verbar;spec.ts
        </div>
        <div class="file">
          app.module.ts
        </div>
        <div class="file">
          app-routing.module.ts
        </div>
      </div>
      <div class="file">
        main.ts
      </div>
      <div class="file">
        index.html
      </div>
      <div class="file">
        &hellip;
      </div>
    </div>
    <div class="file">
      node_modules/&hellip;
    </div>
    <div class="file">
      &hellip;
    </div>
  </div>
</div>

<div class="alert is-helpful">

While components in dedicated folders are widely preferred, another option for small applications is to keep components flat \(not in a dedicated folder\).
This adds up to four files to the existing folder, but also reduces the folder nesting.
Whatever you choose, be consistent.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

작은 부분부터 코딩을 시작하더라도 애플리케이션의 최종 목적지를 항상 **염두에 두어야 합니다**.

</div>

<div class="s-rule do">

그래서 간단한 코드를 구현할 때도 장기 계획을 **염두에 두어야 합니다**.

</div>

<div class="s-rule do">

애플리케이션의 코드는 모두 `src` 폴더 아래에 **두세요**.

</div>

<div class="s-rule consider">

컴포넌트를 구성하는 파일이 여러 개라면\(`.ts`, `.html`, `.css`, `.spec`\) 이 파일들은 따로 폴더를 만들어서 관리하는 것을 **고려해볼만 합니다**.

</div>

<div class="s-why">

**왜**? <br />
애플리케이션의 폴더 구조는 개발 초기부터 간단하게 구성해야 애플리케이션을 확장할 때도 편합니다.

</div>

<div class="s-why-last">

**왜**? <br />
컴포넌트는 보통 4개 파일\(`*.html`, `*.css`, `*.ts`, `*.spec.ts`\)로 구성되기 때문에 컴포넌트 폴더를 따로 구분하지 않고 모아둔다면 이 폴더는 빠르게 복잡해집니다.

</div>

<a id="file-tree"></a>

그래서 다음과 같은 폴더 구조와 파일 구성을 권장합니다:

<div class="filetree">
  <div class="file">
    &lt;project root&gt;
  </div>
  <div class="children">
    <div class="file">
      src
    </div>
    <div class="children">
      <div class="file">
        app
      </div>
      <div class="children">
        <div class="file">
          core
        </div>
        <div class="children">
          <div class="file">
            exception.service.ts&verbar;spec.ts
          </div>
          <div class="file">
            user-profile.service.ts&verbar;spec.ts
          </div>
        </div>
        <div class="file">
          heroes
        </div>
        <div class="children">
          <div class="file">
            hero
          </div>
          <div class="children">
            <div class="file">
              hero.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            hero-list
          </div>
          <div class="children">
            <div class="file">
              hero-list.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            shared
          </div>
          <div class="children">
            <div class="file">
              hero-button.component.ts&verbar;html&verbar;css&verbar;spec.ts
            </div>
            <div class="file">
              hero.model.ts
            </div>
            <div class="file">
              hero.service.ts&verbar;spec.ts
            </div>
          </div>
          <div class="file">
            heroes.component.ts&verbar;html&verbar;css&verbar;spec.ts
          </div>
          <div class="file">
            heroes.module.ts
          </div>
          <div class="file">
            heroes-routing.module.ts
          </div>
        </div>
        <div class="file">
          shared
        </div>
        <div class="children">
          <div class="file">
            shared.module.ts
          </div>
          <div class="file">
            init-caps.pipe.ts&verbar;spec.ts
          </div>
          <div class="file">
            filter-text.component.ts&verbar;spec.ts
          </div>
          <div class="file">
            filter-text.service.ts&verbar;spec.ts
          </div>
        </div>
        <div class="file">
          villains
        </div>
        <div class="children">
          <div class="file">
            villain
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            villain-list
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            shared
          </div>
          <div class="children">
            <div class="file">
              &hellip;
            </div>
          </div>
          <div class="file">
            villains.component.ts&verbar;html&verbar;css&verbar;spec.ts
          </div>
          <div class="file">
            villains.module.ts
          </div>
          <div class="file">
            villains-routing.module.ts
          </div>
        </div>
        <div class="file">
          app.component.ts&verbar;html&verbar;css&verbar;spec.ts
        </div>
        <div class="file">
          app.module.ts
        </div>
        <div class="file">
          app-routing.module.ts
        </div>
      </div>
      <div class="file">
        main.ts
      </div>
      <div class="file">
        index.html
      </div>
      <div class="file">
        &hellip;
      </div>
    </div>
    <div class="file">
      node_modules/&hellip;
    </div>
    <div class="file">
      &hellip;
    </div>
  </div>
</div>

<div class="alert is-helpful">

컴포넌트마다 폴더를 만들고 이 폴더에 컴포넌트를 구성하는 파일들을 모아놓고 관리하는 것이 일반적이지만, 작은 애플리케이션이라면 컴포넌트 폴더 없이 한 폴더에 모아두는 것도 고려해볼만 합니다.
이렇게 구성하면 컴포넌트가 모여있는 폴더에는 파일이 많을 수 있지만 폴더의 구조가 단순해집니다.
어떤 방식을 선택하던지 문제는 없습니다. 일관성만 유지하면 됩니다.

</div>

[맨 위로](#toc)


<a id="04-07"></a>

<!--
### *Folders-by-feature* structure
-->
### *기능별로 폴더를 만드는* 구성

<!--
#### Style 04-07
-->
#### 스타일 04-07

<!--
<div class="s-rule do">

**Do** create folders named for the feature area they represent.

</div>

<div class="s-why">

**Why**? <br />
A developer can locate the code and identify what each file represents at a glance.
The structure is as flat as it can be and there are no repetitive or redundant names.

</div>

<div class="s-why">

**Why**? <br />
The LIFT guidelines are all covered.

</div>

<div class="s-why">

**Why**? <br />
Helps reduce the application from becoming cluttered through organizing the content and keeping them aligned with the LIFT guidelines.

</div>

<div class="s-why">

**Why**? <br />
When there are a lot of files, for example 10+, locating them is easier with a consistent folder structure and more difficult in a flat structure.

</div>

<div class="s-rule do">

**Do** create an NgModule for each feature area.

</div>

<div class="s-why">

**Why**? <br />
NgModules make it easy to lazy load routable features.

</div>

<div class="s-why-last">

**Why**? <br />
NgModules make it easier to isolate, test, and reuse features.

</div>

<div>

For more information, refer to [this folder and file structure example](#file-tree).

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

해당 기능을 표현할 수 있는 폴더 이름을 **지정하세요**.

</div>

<div class="s-why">

**왜**? <br />
개발자가 찾으려고 하는 파일이 어디에 있는지 한 눈에 알 수 있어야 합니다.
그러려면 폴더 구조가 단순할수록, 중복되거나 군더더기 없는 폴더 이름이 사용될수록 더 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
LIFT 가이드라인도 이 내용을 다룹니다.

</div>

<div class="s-why">

**왜**? <br />
애플리케이션 구조가 잡다해지는 것을 방지하려면 LIFT 가이드라인을 지키는 것이 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
한 폴더에 파일 개수가 10개 이상되면 일관된 규칙으로 하위 폴더를 만드는 것이 더 좋을 수 있습니다.

</div>

<div class="s-rule do">

기능 영역마다 NgModule을 **생성하세요**.

</div>

<div class="s-why">

**왜**? <br />
NgModule은 지연로딩을 적용할 수 있는 단위입니다.

</div>

<div class="s-why-last">

**왜**? <br />
NgModule은 다른 NgModule과 분리할 수 있기 때문에 테스트하기 쉽고 재사용하기도 편합니다.

</div>

<div>

자세한 내용은 [폴더와 파일 구조 예제](#file-tree) 섹션을 참고하세요.

</div>

[맨 위로](#toc)


<a id="04-08"></a>

<!--
### App *root module*
-->
### 앱 *최상위 모듈*

<!--
#### Style 04-08
-->
#### 스타일 04-08

<!--
<div class="s-rule do">

**Do** create an NgModule in the application's root folder, for example, in `/src/app`.

</div>

<div class="s-why">

**Why**? <br />
Every application requires at least one root NgModule.

</div>

<div class="s-rule consider">

**Consider** naming the root module `app.module.ts`.

</div>

<div class="s-why-last">

**Why**? <br />
Makes it easier to locate and identify the root module.

</div>

<code-example format="typescript" path="styleguide/src/04-08/app/app.module.ts" language="typescript" region="example" header="app/app.module.ts"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

애플리케이션 최상위 모듈은 애플리케이션 최상위 폴더에 **생성하세요**.
보통은 `/src/app` 폴더입니다.

</div>

<div class="s-why">

**왜**? <br />
애플리케이션에는 최상위 NgModule이 반드시 존재합니다.

</div>

<div class="s-rule consider">

**Consider** naming the root module `app.module.ts`.

</div>

<div class="s-why-last">

**왜**? <br />
최상위 모듈이 어디에 있는지, 어떤 파일인지 쉽게 파악할 수 있는 곳에 두는 곳에 좋습니다.

</div>

<code-example format="typescript" path="styleguide/src/04-08/app/app.module.ts" language="typescript" region="example" header="app/app.module.ts"></code-example>

[맨 위로](#toc)


<a id="04-09"></a>

<!--
### Feature modules
-->
### 기능 모듈

<!--
#### Style 04-09
-->
#### 스타일 04-09

<!--
<div class="s-rule do">

**Do** create an NgModule for all distinct features in an application; for example, a `Heroes` feature.

</div>

<div class="s-rule do">

**Do** place the feature module in the same named folder as the feature area; for example, in `app/heroes`.

</div>

<div class="s-rule do">

**Do** name the feature module file reflecting the name of the feature area and folder; for example, `app/heroes/heroes.module.ts`.

</div>

<div class="s-rule do">

**Do** name the feature module symbol reflecting the name of the feature area, folder, and file; for example, `app/heroes/heroes.module.ts` defines `HeroesModule`.

</div>

<div class="s-why">

**Why**? <br />
A feature module can expose or hide its implementation from other modules.

</div>

<div class="s-why">

**Why**? <br />
A feature module identifies distinct sets of related components that comprise the feature area.

</div>

<div class="s-why">

**Why**? <br />
A feature module can easily be routed to both eagerly and lazily.

</div>

<div class="s-why">

**Why**? <br />
A feature module defines clear boundaries between specific functionality and other application features.

</div>

<div class="s-why">

**Why**? <br />
A feature module helps clarify and make it easier to assign development responsibilities to different teams.

</div>

<div class="s-why-last">

**Why**? <br />
A feature module can easily be isolated for testing.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

NgModule은 애플리케이션이 제공하는 특정 기능 단위로 **생성하세요**.
히어로와 관련된 기능은 `Heroes` 모듈로 만드는 식입니다.

</div>

<div class="s-rule do">

기능 모듈의 폴더 이름은 기능 모듈의 이름과 같도록 **지정하세요**.
`Heroes` 기능 모듈이라면 `app/heroes`라고 지정하는 식입니다.

</div>

<div class="s-rule do">

기능 모듈을 정의하는 파일의 이름은 기능 이름과 폴더 이름과 비슷한 방식으로 **지정하세요**.
`app/heroes/heroes.module.ts`라고 지정하는 식입니다.

</div>

<div class="s-rule do">

기능 모듈의 클래스 이름은 기능 이름, 폴더 이름, 파일 이름을 지정과 비슷한 방식으로 **지정하세요**.
`app/heroes/heroes.module.ts` 파일에 정의하는 기능 모듈 클래스 이름은 `HeroesModule`인 것이 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
기능 모듈은 다른 모듈과 확실하게 구분되어야 합니다.

</div>

<div class="s-why">

**왜**? <br />
기능 모듈 폴더에는 해당 기능을 제공하기 위해 사용되는 컴포넌트들이 포함됩니다.

</div>

<div class="s-why">

**왜**? <br />
기능 모듈은 즉시 로드할 수 있으며 필요하면 지연로딩할 수도 있습니다.

</div>

<div class="s-why">

**왜**? <br />
기능 모듈은 다른 기능 모듈과 확실하게 구분되도록 정의하는 것이 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
기능 모듈을 명확하게 구분하면 여러 팀이 어떤 모듈을 담당할지 나누기도 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
기능 모듈은 다른 모듈과 격리할 수 있기 때문에 테스트하기도 편합니다.

</div>

[맨 위로](#toc)


<a id="04-10"></a>

<!--
### Shared feature module
-->
### 공유 모듈

<!--
#### Style 04-10
-->
#### 스타일 04-10

<!--
<div class="s-rule do">

**Do** create a feature module named `SharedModule` in a `shared` folder; for example, `app/shared/shared.module.ts` defines `SharedModule`.

</div>

<div class="s-rule do">

**Do** declare components, directives, and pipes in a shared module when those items will be re-used and referenced by the components declared in other feature modules.

</div>

<div class="s-rule consider">

**Consider** using the name SharedModule when the contents of a shared
module are referenced across the entire application.

</div>

<div class="s-rule avoid">

**Consider** *not* providing services in shared modules.
Services are usually singletons that are provided once for the entire application or in a particular feature module.
There are exceptions, however.
For example, in the sample code that follows, notice that the `SharedModule` provides `FilterTextService`.
This is acceptable here because the service is stateless;that is, the consumers of the service aren't impacted by new instances.

</div>

<div class="s-rule do">

**Do** import all modules required by the assets in the `SharedModule`; for example, `CommonModule` and `FormsModule`.

</div>

<div class="s-why">

**Why**? <br />
`SharedModule` will contain components, directives and pipes that may need features from another common module; for example, `ngFor` in `CommonModule`.

</div>

<div class="s-rule do">

**Do** declare all components, directives, and pipes in the `SharedModule`.

</div>

<div class="s-rule do">

**Do** export all symbols from the `SharedModule` that other feature modules need to use.

</div>

<div class="s-why">

**Why**? <br />
`SharedModule` exists to make commonly used components, directives and pipes available for use in the templates of components in many other modules.

</div>

<div class="s-rule avoid">

**Avoid** specifying app-wide singleton providers in a `SharedModule`.
Intentional singletons are OK.
Take care.

</div>

<div class="s-why">

**Why**? <br />
A lazy loaded feature module that imports that shared module will make its own copy of the service and likely have undesirable results.

</div>

<div class="s-why-last">

**Why**? <br />
You don't want each module to have its own separate instance of singleton services.
Yet there is a real danger of that happening if the `SharedModule` provides a service.

</div>

<div class="filetree">
  <div class="file">
    src
  </div>
  <div class="children">
    <div class="file">
      app
    </div>
    <div class="children">
      <div class="file">
        shared
      </div>
      <div class="children">
        <div class="file">
          shared.module.ts
        </div>
        <div class="file">
          init-caps.pipe.ts&verbar;spec.ts
        </div>
        <div class="file">
          filter-text.component.ts&verbar;spec.ts
        </div>
        <div class="file">
          filter-text.service.ts&verbar;spec.ts
        </div>
      </div>
      <div class="file">
        app.component.ts&verbar;html&verbar;css&verbar;spec.ts
      </div>
      <div class="file">
        app.module.ts
      </div>
      <div class="file">
        app-routing.module.ts
      </div>
    </div>
    <div class="file">
      main.ts
    </div>
    <div class="file">
      index.html
    </div>
  </div>
  <div class="file">
    &hellip;
  </div>
</div>

<code-tabs>
    <code-pane header="app/shared/shared.module.ts" path="styleguide/src/04-10/app/shared/shared.module.ts"></code-pane>
    <code-pane header="app/shared/init-caps.pipe.ts" path="styleguide/src/04-10/app/shared/init-caps.pipe.ts"></code-pane>
    <code-pane header="app/shared/filter-text/filter-text.component.ts" path="styleguide/src/04-10/app/shared/filter-text/filter-text.component.ts"></code-pane>
    <code-pane header="app/shared/filter-text/filter-text.service.ts" path="styleguide/src/04-10/app/shared/filter-text/filter-text.service.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/04-10/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.html" path="styleguide/src/04-10/app/heroes/heroes.component.html"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule do">

공유 모듈은 `shared` 폴더 안에 `SharedModule`이라는 이름으로 **정의하세요**.
`app/shared/shared.module.ts` 파일에 `SharedModule`을 정의하는 식입니다.

</div>

<div class="s-rule do">

공유 모듈에 정의하는 컴포넌트, 디렉티브, 파이프는 다른 기능 모듈에 재사용될 수 있는 형태로 **구현하세요**.

</div>

<div class="s-rule consider">

`SharedModule`이라는 이름은 애플리케이션 전역에 사용된다는 의미이기 때문에 이 이름을 **권장합니다**.

</div>

<div class="s-rule avoid">

공유 모듈에 서비스를 정의하는 것은 **권장하지 않습니다**.
서비스의 인스턴스는 애플리케이션 전역에 싱글턴으로 하나만 존재하거나, 특정 기능 모듈에 존재합니다.
아래 예제 코드 트리에는 `SharedModule` 안에 `FilterTextService`가 들어있지만, 서비스가 특정 상태를 기반으로 동작하는 것이 아니라면 예외적으로 허용될 수 있습니다.

</div>

<div class="s-rule do">

모든 모듈이 사용하는 리소스는 `SharedModule`에서 **불러오세요**.
`CommonModule`이나 `FormsModule`이 대상이 될 수 있습니다.

</div>

<div class="s-why">

**왜**? <br />
`SharedModule`은 다른 모듈이 일반적으로 사용하는 컴포넌트나 디렉티브, 파이프를 대신 제공할 수 있습니다.
`ngFor`나 `CommonModule`이 그렇습니다.

</div>

<div class="s-rule do">

모든 컴포넌트, 디렉티브, 파이프를 `SharedModule` 안에 **정의하세요**.

</div>

<div class="s-rule do">

`SharedModule` 안에 있는 모든 심볼은 다른 기능 모듈이 사용할 수 있도록 모두 **외부로 공개(export)하세요**.

</div>

<div class="s-why">

**왜**? <br />
`SharedModule`는 다른 기능 모듈이 자주 사용하는 컴포넌트나 디렉티브, 파이프를 더 쉽게 사용하기 위해 정의하는 모듈입니다.

</div>

<div class="s-rule avoid">

앱 전역에 싱글턴으로 존재하는 서비스의 프로바이더는 `SharedModule` 안에 **등록하지 마세요**.
의도적인 것이라면 괜찮겠지만, 주의해야 합니다.

</div>

<div class="s-why">

**왜**? <br />
지연로딩되는 기능 모듈이 공유 모듈을 로드하면 서비스 인스턴스를 새로 생성하기 때문에 원하는대로 동작하지 않을 수 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
싱글턴 서비스를 개별 모듈마다 따로 구성하는 상황은 바람직하지 않습니다.
`SharedModule`에 서비스 프로바이더를 등록하면 이런 상황이 될 수 있습니다.

</div>

<div class="filetree">
  <div class="file">
    src
  </div>
  <div class="children">
    <div class="file">
      app
    </div>
    <div class="children">
      <div class="file">
        shared
      </div>
      <div class="children">
        <div class="file">
          shared.module.ts
        </div>
        <div class="file">
          init-caps.pipe.ts&verbar;spec.ts
        </div>
        <div class="file">
          filter-text.component.ts&verbar;spec.ts
        </div>
        <div class="file">
          filter-text.service.ts&verbar;spec.ts
        </div>
      </div>
      <div class="file">
        app.component.ts&verbar;html&verbar;css&verbar;spec.ts
      </div>
      <div class="file">
        app.module.ts
      </div>
      <div class="file">
        app-routing.module.ts
      </div>
    </div>
    <div class="file">
      main.ts
    </div>
    <div class="file">
      index.html
    </div>
  </div>
  <div class="file">
    &hellip;
  </div>
</div>

<code-tabs>
    <code-pane header="app/shared/shared.module.ts" path="styleguide/src/04-10/app/shared/shared.module.ts"></code-pane>
    <code-pane header="app/shared/init-caps.pipe.ts" path="styleguide/src/04-10/app/shared/init-caps.pipe.ts"></code-pane>
    <code-pane header="app/shared/filter-text/filter-text.component.ts" path="styleguide/src/04-10/app/shared/filter-text/filter-text.component.ts"></code-pane>
    <code-pane header="app/shared/filter-text/filter-text.service.ts" path="styleguide/src/04-10/app/shared/filter-text/filter-text.service.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/04-10/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="app/heroes/heroes.component.html" path="styleguide/src/04-10/app/heroes/heroes.component.html"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="04-11"></a>

<!--
### Lazy Loaded folders
-->
### 지연로딩 모듈의 폴더

<!--
#### Style 04-11
-->
#### 스타일 04-11

<!--
A distinct application feature or workflow may be *lazy loaded* or *loaded on demand* rather than when the application starts.

<div class="s-rule do">

**Do** put the contents of lazy loaded features in a *lazy loaded folder*.
A typical *lazy loaded folder* contains a *routing component*, its child components, and their related assets and modules.

</div>

<div class="s-why-last">

**Why**? <br />
The folder makes it easy to identify and isolate the feature content.

</div>

[Back to top](#toc)
-->
애플리케이션 모듈은 *지연로딩*하거나 흐름상 *필요할 때 로드*할 수 있습니다.
그러면 애플리케이션에는 이 모듈이 제외되면서 초기 실행 속도가 빨라집니다.

<div class="s-rule do">

지연로딩하는 모듈은 *지연 로딩용 폴더*에 따로 작성하세요.
일반적으로 이 폴더에는 *라우팅 컴포넌트*, 라우팅 컴포넌트의 자식 컴포넌트, 관련 리소스가 위치합니다.

</div>

<div class="s-why-last">

**왜**? <br />
폴더를 따로 나누면 지연로딩하는 모듈을 쉽게 구분할 수 있습니다.

</div>

[맨 위로](#toc)


<a id="04-12"></a>

<!--
### Never directly import lazy loaded folders
-->
### 지연로딩 모듈을 직접 로드하지 마세요.

<!--
#### Style 04-12
-->
#### 스타일 04-12

<!--
<div class="s-rule avoid">

**Avoid** allowing modules in sibling and parent folders to directly import a module in a *lazy loaded feature*.

</div>

<div class="s-why-last">

**Why**? <br />
Directly importing and using a module will load it immediately when the intention is to load it on demand.

</div>

[Back to top](#toc)
-->
<div class="s-rule avoid">

이웃 폴더나 부모 폴더에서 *지연로딩 모듈*을 직접 로드하는 것은 피하세요.**

</div>

<div class="s-why-last">

**왜**? <br />
지연모듈을 직접 로드하면 이 모듈이 사용된다는 것을 의미하며, 지연로딩되지 않고 애플리케이션이 시작될 때 즉시 로드됩니다.
지연로딩의 의미는 없어집니다.

</div>

[맨 위로](#toc)


<!--
### Do not add filtering and sorting logic to pipes
-->
### 파이프에 필터, 정렬 로직을 넣지 마세요.

<!--
#### Style 04-13
-->
#### 스타일 04-13

<!--
<div class="s-rule avoid">

**Avoid** adding filtering or sorting logic into custom pipes.

</div>

<div class="s-rule do">

**Do** pre-compute the filtering and sorting logic in components or services before binding the model in templates.

</div>

<div class="s-why-last">

**Why**? <br />
Filtering and especially sorting are expensive operations.
As Angular can call pipe methods many times per second, sorting and filtering operations can degrade the user experience severely for even moderately-sized lists.

</div>

[Back to top](#toc)
-->
<div class="s-rule avoid">

커스텀 파이프에 필터, 정렬 로직을 넣는 것은 **피하세요**.

</div>

<div class="s-rule do">

필터, 정렬 로직은 컴포넌트나 서비스 로직으로 미리 처리한 후에 템플릿에 바인딩하는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
필터도 그렇지만 특히 정렬 로직은 많은 연산이 필요합니다.
Angular 안에서는 파이프가 1초에 여러번도 호출될 수 있기 때문에, 이 때마다 정렬, 필터 연산이 실행되면 UX 측면에서 좋지 않습니다.

</div>

[맨 위로](#toc)


<!--
## Components
-->
## 컴포넌트

<a id="05-03"></a>
<a id="style-05-03"></a>

<!--
### Components as elements
-->
### 엘리먼트로 사용하기

<!--
#### Style 05-03
-->
#### 스타일 05-03

<!--
<div class="s-rule do">

**Consider** giving components an *element* selector, as opposed to *attribute* or *class* selectors.

</div>

<div class="s-why">

**Why**? <br />
Components have templates containing HTML and optional Angular template syntax.
They display content.
Developers place components on the page as they would native HTML elements and web components.

</div>

<div class="s-why-last">

**Why**? <br />
It is easier to recognize that a symbol is a component by looking at the template's html.

</div>

<div class="alert is-helpful">

There are a few cases where you give a component an attribute, such as when you want to augment a built-in element.
For example, [Material Design](https://material.angular.io/components/button/overview) uses this technique with `<button mat-button>`.
However, you wouldn't use this technique on a custom element.

</div>

<code-example header="app/heroes/hero-button/hero-button.component.ts" path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-03/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-03/app/app.component.html"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule do">

컴포넌트 셀렉터는 *어트리뷰트* 나 *클래스* 셀렉터보다 *엘리먼트* 셀렉터로 사용하는 것을 **권장합니다.**

</div>

<div class="s-why">

**왜**? <br />
컴포넌트에는 HTML 문법으로 작성된 템플릿이 있으며, Angular에서 제공하는 템플릿 문법이 이 템플릿에 사용되기도 합니다.
컴포넌트의 역할은 컴포넌트의 내용을 화면을 표시하는 것입니다.
따라서 네이티브 HTML 엘리먼트나 웹 컴포넌트와 동일한 계층을 사용해서 엘리먼트 셀렉터로 지정하는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
컴포넌트 셀렉터를 엘리먼트로 지정하면, 템플릿을 봤을 때 어떤 것이 컴포넌트인지 쉽게 확인할 수 있습니다.

</div>

<div class="alert is-helpful">

기본 엘리먼트에 추가 기능을 덧붙이는 아주 특이한 경우라면 어트리뷰트 셀렉터를 컴포넌트 셀렉터로 활용할 수도 있습니다.
[Material Design](https://material.angular.io/components/button/overview)이 이 방식을 활용하고 있는데, 이 라이브러리는 버튼을 매터리얼 디자인으로 전환하기 위해 `<button mat-button>`과 같은 표현 방식을 사용합니다.
물론 어트리뷰트 셀렉터를 사용하는 대신 커스텀 엘리먼트로 구현해도 됩니다.

</div>

<code-example header="app/heroes/hero-button/hero-button.component.ts" path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-03/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-03/app/app.component.html"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="05-04"></a>

<!--
### Extract templates and styles to their own files
-->
### 템플릿과 스타일은 개별 파일로 분리하세요.

<!--
#### Style 05-04
-->
#### 스타일 05-04

<!--
<div class="s-rule do">

**Do** extract templates and styles into a separate file, when more than 3 lines.

</div>

<div class="s-rule do">

**Do** name the template file `[component-name].component.html`, where [component-name] is the component name.

</div>

<div class="s-rule do">

**Do** name the style file `[component-name].component.css`, where [component-name] is the component name.

</div>

<div class="s-rule do">

**Do** specify *component-relative* URLs, prefixed with `./`.

</div>

<div class="s-why">

**Why**? <br />
Large, inline templates and styles obscure the component's purpose and implementation, reducing readability and maintainability.

</div>

<div class="s-why">

**Why**? <br />
In most editors, syntax hints and code snippets aren't available when developing inline templates and styles.
The Angular TypeScript Language Service \(forthcoming\) promises to overcome this deficiency for HTML templates in those editors that support it; it won't help with CSS styles.

</div>

<div class="s-why">

**Why**? <br />
A *component relative* URL requires no change when you move the component files, as long as the files stay together.

</div>

<div class="s-why-last">

**Why**? <br />
The `./` prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.

</div>

<code-example header="app/heroes/heroes.component.ts" path="styleguide/src/05-04/app/heroes/heroes.component.avoid.ts" region="example"></code-example>

<code-tabs>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/05-04/app/heroes/heroes.component.ts" region="example"></code-pane>
    <code-pane header="app/heroes/heroes.component.html" path="styleguide/src/05-04/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="app/heroes/heroes.component.css" path="styleguide/src/05-04/app/heroes/heroes.component.css"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule do">

템플릿과 스타일을 지정하는 코드가 3줄 이상 된다면 개별 파일로 **분리하세요.**

</div>

<div class="s-rule do">

템플릿 파일의 이름은 `[컴포넌트 이름].component.html`으로 **지정하세요.**

</div>

<div class="s-rule do">

스타일 파일의 이름은 `[컴포넌트 이름].component.css`로 **지정하세요.**

</div>

<div class="s-rule do">

컴포넌트 클래스에서는 `./`로 시작하는 *상대 주소* 로 **참조하세요.**

</div>

<div class="s-why">

**왜**? <br />
템플릿과 스타일을 컴포넌트 클래스 파일 안에 길게 작성하면 가독성이 떨어지고 유지보수하기도 어려워 집니다.

</div>

<div class="s-why">

**왜**? <br />
최근에 사용되는 에디터 중 일부는 인라인 템플릿이나 인라인 스타일에 적용되는 코드 하이라이팅 기능과 자동완성 기능이 충분하지 않은 경우가 있습니다.
Angular는 앞으로 HTML 템플릿에도 이 기능을 지원할 수 있도록 노력할 예정이지만, 아직 CSS에 대해서는 정해지지 않았습니다.
다행히, 이 기능을 지원하는 IDE는 점점 늘어나고 있습니다.

</div>

<div class="s-why">

**왜**? <br />
컴포넌트 템플릿 파일과 스타일 파일을 *상대 주소* 로 지정하면, 컴포넌트 파일을 다른 곳으로 옮기더라도 함께 움직이기 때문에 참조하는 주소를 수정할 필요가 없습니다.

</div>

<div class="s-why-last">

**왜**? <br />
`./` 접미사는 상대주소를 표현하는 표준 문법입니다.
Angular와는 관련이 없습니다.

</div>

<code-example header="app/heroes/heroes.component.ts" path="styleguide/src/05-04/app/heroes/heroes.component.avoid.ts" region="example"></code-example>

<code-tabs>
    <code-pane header="app/heroes/heroes.component.ts" path="styleguide/src/05-04/app/heroes/heroes.component.ts" region="example"></code-pane>
    <code-pane header="app/heroes/heroes.component.html" path="styleguide/src/05-04/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="app/heroes/heroes.component.css" path="styleguide/src/05-04/app/heroes/heroes.component.css"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="05-12"></a>

<!--
### Decorate `input` and `output` properties
-->
### 입출력 프로퍼티 지정하기

<!--
#### Style 05-12
-->
#### 스타일 05-12

<!--
<div class="s-rule do">

**Do** use the `@Input()` and `@Output()` class decorators instead of the `inputs` and `outputs` properties of the `@Directive` and `@Component` metadata:

</div>

<div class="s-rule consider">

**Consider** placing `@Input()` or `@Output()` on the same line as the property it decorates.

</div>

<div class="s-why">

**Why**? <br />
It is easier and more readable to identify which properties in a class are inputs or outputs.

</div>

<div class="s-why">

**Why**? <br />
If you ever need to rename the property or event name associated with `@Input()` or `@Output()`, you can modify it in a single place.

</div>

<div class="s-why">

**Why**? <br />
The metadata declaration attached to the directive is shorter and thus more readable.

</div>

<div class="s-why-last">

**Why**? <br />
Placing the decorator on the same line *usually* makes for shorter code and still easily identifies the property as an input or output.
Put it on the line above when doing so is clearly more readable.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-12/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-12/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

컴포넌트의 입출력 프로퍼티는 `@Directive`나 `@Component` 메타데이터의 `inputs`, `outputs`로 지정하지 말고 `@Input()`, `@Output()` 데코레이터로 **지정하세요**

</div>

<div class="s-rule consider">

`@Input()`, `@Output()` 데코레이터는 프로퍼티 이름과 같은 줄에 놓는 것을 **권장합니다.**

</div>

<div class="s-why">

**왜**? <br />
입출력 데코레이터를 사용하면 클래스 프로퍼티 중 어떤 것이 입력 프로퍼티이고 어떤 것이 출력 프로퍼티인지 쉽게 구분할 수 있습니다.

</div>

<div class="s-why">

**왜**? <br />
클래스 프로퍼티에 입출력 데코레이터를 지정하면, 이 프로퍼티 이름을 다른 이름으로 바인딩 받거나 이벤트 이름을 다르게 지정할 때도 관련된 내용을 한 곳에서 모두 수정할 수 있습니다.

</div>

<div class="s-why">

**왜**? <br />
메타데이터 선언은 짧을수록 가독성이 좋아집니다.

</div>

<div class="s-why-last">

**왜**? <br />
데코레이터를 프로퍼티 이름 바로 앞에 같은 줄로 두면 전체 코드 라인을 많이 늘리지 않으며, 어떤 프로퍼티가 입력 프로퍼티이고 출력 프로퍼티인지 쉽게 알아볼 수 있습니다.
다른 줄로 분리할 때 가독성이 좋아지는 것이 명확할 때만 데코레이터를 프로퍼티 선언과 다른 줄로 분리하세요.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-12/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-12/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="05-13"></a>

<!--
### Avoid aliasing `inputs` and `outputs`
-->
### 입출력 프로퍼티에 별칭(alias)을 사용하지 마세요.

<!--
#### Style 05-13
-->
#### 스타일 05-13

<!--
<div class="s-rule avoid">

**Avoid** `input` and `output` aliases except when it serves an important purpose.

</div>

<div class="s-why">

**Why**? <br />
Two names for the same property \(one private, one public\) is inherently confusing.

</div>

<div class="s-why-last">

**Why**? <br />
You should use an alias when the directive name is also an `input` property,
and the directive name doesn't describe the property.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-13/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-13/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-13/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/heroes/shared/hero-button/hero-highlight.directive.ts" path="styleguide/src/05-13/app/heroes/shared/hero-highlight.directive.ts"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-13/app/app.component.html"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule avoid">

꼭 사용해야 하는 경우가 아니라면 입력 프로퍼티와 출력 프로퍼티에 별칭을 지정하지 **마세요.**

</div>

<div class="s-why">

**왜**? <br />
컴포넌트 외부에서 사용하는 프로퍼티 이름과 내부에서 사용하는 프로퍼티 이름이 다르면, 당연히 헷갈릴 수 밖에 없습니다.

</div>

<div class="s-why-last">

**왜**? <br />
별칭은 디렉티브 이름이 *입력* 프로퍼티와 같을 때, 디렉티브 이름으로는 프로퍼티를 확인하기 어려울 때만 사용하는 것이 좋습니다.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-13/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-13/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/05-13/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-pane>
    <code-pane header="app/heroes/shared/hero-button/hero-highlight.directive.ts" path="styleguide/src/05-13/app/heroes/shared/hero-highlight.directive.ts"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-13/app/app.component.html"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="05-14"></a>

<!--
### Member sequence
-->
### 클래스 멤버의 순서

<!--
#### Style 05-14
-->
#### 스타일 05-14

<!--
<div class="s-rule do">

**Do** place properties up top followed by methods.

</div>

<div class="s-rule do">

**Do** place private members after public members, alphabetized.

</div>

<div class="s-why-last">

**Why**? <br />
Placing members in a consistent sequence makes it easy to read and
helps instantly identify which members of the component serve which purpose.

</div>

<code-example header="app/shared/toast/toast.component.ts" path="styleguide/src/05-14/app/shared/toast/toast.component.avoid.ts" region="example"></code-example>

<code-example header="app/shared/toast/toast.component.ts" path="styleguide/src/05-14/app/shared/toast/toast.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

메소드보다 프로퍼티를 먼저 **선언하세요.**

</div>

<div class="s-rule do">

private 멤버보다 public 멤버를 먼저, 이들끼리는 알파벳 순서로 **선언하세요.**

</div>

<div class="s-why-last">

**왜**? <br />
클래스 멤버를 일관된 순서로 선언하면 코드의 가독성이 좋아지며, 이 컴포넌트가 어떤 역할을 하는지 정보를 제공할 수도 있습니다.

</div>

<code-example header="app/shared/toast/toast.component.ts" path="styleguide/src/05-14/app/shared/toast/toast.component.avoid.ts" region="example"></code-example>

<code-example header="app/shared/toast/toast.component.ts" path="styleguide/src/05-14/app/shared/toast/toast.component.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="05-15"></a>

<!--
### Delegate complex component logic to services
-->
### 복잡한 컴포넌트 로직은 서비스로 옮기세요.

<!--
#### Style 05-15
-->
#### 스타일 05-15

<!--
<div class="s-rule do">

**Do** limit logic in a component to only that required for the view.
All other logic should be delegated to services.

</div>

<div class="s-rule do">

**Do** move reusable logic to services and keep components simple and focused on their intended purpose.

</div>

<div class="s-why">

**Why**? <br />
Logic may be reused by multiple components when placed within a service and exposed as a function.

</div>

<div class="s-why">

**Why**? <br />
Logic in a service can more easily be isolated in a unit test, while the calling logic in the component can be easily mocked.

</div>

<div class="s-why">

**Why**? <br />
Removes dependencies and hides implementation details from the component.

</div>

<div class="s-why-last">

**Why**? <br />
Keeps the component slim, trim, and focused.

</div>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-15/app/heroes/hero-list/hero-list.component.avoid.ts"></code-example>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-15/app/heroes/hero-list/hero-list.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

컴포넌트에 작성하는 로직은 뷰와 관련된 로직으로만 **제한하세요.**
뷰와 관계없는 로직은 모두 서비스로 옮기는 것이 좋습니다.

</div>

<div class="s-rule do">

다른 컴포넌트에서 재사용할 수 있는 로직도 서비스로 옮기세요.
컴포넌트에는 그 역할에 맞는 기능만 간결하게 작성해야 합니다.

</div>

<div class="s-why">

**왜**? <br />
다른 컴포넌트에도 재사용할 수 있는 로직을 서비스 안에 함수로 작성하면 필요한 곳에 자유롭게 활용할 수 있습니다.

</div>

<div class="s-why">

**왜**? <br />
컴포넌트에서 사용하는 서비스 로직은 목업 로직으로 쉽게 대체할 수 있기 때문에 유닛 테스트에도 유리합니다.

</div>

<div class="s-why">

**왜**? <br />
컴포넌트의 로직을 서비스로 옮기면 컴포넌트에 주입하는 의존성을 줄일 수 있으며, 컴포넌트에 꼭 필요한 로직만 작성하기 쉬워집니다.

</div>

<div class="s-why-last">

**왜**? <br />
컴포넌트 코드는 짧게, 간결하게, 꼭 필요한 로직만 작성하세요.

</div>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-15/app/heroes/hero-list/hero-list.component.avoid.ts"></code-example>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-15/app/heroes/hero-list/hero-list.component.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="05-16"></a>

<!--
### Don't prefix `output` properties
-->
### `output` 프로퍼티에 접두사를 붙이지 마세요.

<!--
#### Style 05-16
-->
#### 스타일 05-16

<!--
<div class="s-rule do">

**Do** name events without the prefix `on`.

</div>

<div class="s-rule do">

**Do** name event handler methods with the prefix `on` followed by the event name.

</div>

<div class="s-why">

**Why**? <br />
This is consistent with built-in events such as button clicks.

</div>

<div class="s-why-last">

**Why**? <br />
Angular allows for an [alternative syntax](guide/binding-syntax) `on-*`.
If the event itself was prefixed with `on` this would result in an `on-onEvent` binding expression.

</div>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/05-16/app/heroes/hero.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-16/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/hero.component.ts" path="styleguide/src/05-16/app/heroes/hero.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-16/app/app.component.html"></code-pane>
</code-tabs>

[Back to top](#toc)
-->
<div class="s-rule do">

출력 프로퍼티로 이벤트를 보낼 때 이 이벤트 이름에 `on`을 **붙이지 마세요.**

</div>

<div class="s-rule do">

`on` 접두사는 해당 이벤트를 받는 이벤트 핸들러 메소드 이름에 **붙이세요.**

</div>

<div class="s-why">

**왜**? <br />
버튼 클릭과 같은 내장 이벤트를 처리할 때도 이 방식을 사용합니다.

</div>

<div class="s-why-last">

**왜**? <br />
Angular에서 제공하는 문법 중 `on-*`을 붙이는 문법은 [이벤트 바인딩 대체 문법](guide/binding-syntax) 중 하나입니다.
그래서 이벤트 이름에 `on`을 붙이면, 이 이벤트를 바인딩할 때 `on-onEvent`와 같은 표현을 사용해야 합니다.

</div>

<code-example header="app/heroes/hero.component.ts" path="styleguide/src/05-16/app/heroes/hero.component.avoid.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/05-16/app/app.component.avoid.html"></code-example>

<code-tabs>
    <code-pane header="app/heroes/hero.component.ts" path="styleguide/src/05-16/app/heroes/hero.component.ts" region="example"></code-pane>
    <code-pane header="app/app.component.html" path="styleguide/src/05-16/app/app.component.html"></code-pane>
</code-tabs>

[맨 위로](#toc)


<a id="05-17"></a>

<!--
### Put presentation logic in the component class
-->
### 뷰에 사용하는 로직은 컴포넌트 클래스에 작성하세요.

<!--
#### Style 05-17
-->
#### 스타일 05-17

<!--
<div class="s-rule do">

**Do** put presentation logic in the component class, and not in the template.

</div>

<div class="s-why">

**Why**? <br />
Logic will be contained in one place \(the component class\) instead of being spread in two places.

</div>

<div class="s-why-last">

**Why**? <br />
Keeping the component's presentation logic in the class instead of the template improves testability, maintainability, and reusability.

</div>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-17/app/heroes/hero-list/hero-list.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-17/app/heroes/hero-list/hero-list.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

뷰에 사용하는 로직은 템플릿이 아니라 컴포넌트 클래스에 **작성하세요.**

</div>

<div class="s-why">

**왜**? <br />
컴포넌트를 처리하는 로직은 템플릿과 클래스에 나눠서 작성하는 것보다 컴포넌트 클래스 한 곳에 작성하는 것이 좋습니다.

</div>

<div class="s-why-last">

**왜**? <br />
뷰와 관련된 로직을 템플릿에 두지 않고 클래스에 두면 컴포넌트를 테스트하기 편하며, 유지보수하기도 편하고 재사용하기에도 유리합니다.

</div>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-17/app/heroes/hero-list/hero-list.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/hero-list/hero-list.component.ts" path="styleguide/src/05-17/app/heroes/hero-list/hero-list.component.ts" region="example"></code-example>

[맨 위로](#toc)


<!--
### Initialize inputs
-->
### 입력값 초기화하기

<!--
#### Style 05-18
-->
#### 스타일 05-18

<!--
TypeScript's `--strictPropertyInitialization` compiler option ensures that a class initializes its properties during construction.
When enabled, this option causes the TypeScript compiler to report an error if the class does not set a value to any property that is not explicitly marked as optional.

By design, Angular treats all `@Input` properties as optional.
When possible, you should satisfy `--strictPropertyInitialization` by providing a default value.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.ts" region="example"></code-example>

If the property is hard to construct a default value for, use `?` to explicitly mark the property as optional.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.optional.ts" region="example"></code-example>

You may want to have a required `@Input` field, meaning all your component users are required to pass that attribute.
In such cases, use a default value.
Just suppressing the TypeScript error with `!` is insufficient and should be avoided because it will prevent the type checker ensure the input value is provided.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.avoid.ts" region="example"></code-example>
-->
TypeScript 컴파일러 옵션 중 `--strictPropertyInitialization`를 사용한다면 클래스 프로퍼티의 기본값을 생성자에서 반드시 지정해야 합니다.
이 옵션이 활성화되면 옵션으로 지정되지 않은 클래스 프로퍼티 중 값이 할당되지 않는 것이 있다면 에러가 발생합니다.

기본적으로 Angular는 `@Input` 프로퍼티를 옵션으로 간주합니다.
하지만 가능하다면 `--strictPropertyInitialization` 플래그의 취지에 맞게 기본값을 지정하는 것이 좋습니다.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.ts" region="example"></code-example>

생성자에서 프로퍼티 값을 결정하기 어렵다면 `?` 를 추가해서 옵션으로 선언하면 됩니다.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.optional.ts" region="example"></code-example>

어쩌면 컴포넌트를 사용하는 유저가 모든 어트리뷰트를 넘겨서 `@Input` 필드를 필수 항목으로 사용하고 싶을 수 있습니다.
이런 경우에는 기본값을 꼭 지정하세요.
에러를 무시하기 위해 `!`를 붙이는 것은 권장하지 않습니다.
이 방식을 사용하면 입력 프로퍼티의 타입을 제대로 검사할 수 없습니다.

<code-example header="app/heroes/hero/hero.component.ts" path="styleguide/src/05-18/app/heroes/hero/hero.component.avoid.ts" region="example"></code-example>


<!--
## Directives
-->
## 디렉티브

<a id="06-01"></a>

<!--
### Use directives to enhance an element
-->
### 디렉티브는 엘리먼트를 확장하는 용도로 사용하세요.

<!--
#### Style 06-01
-->
#### 스타일 06-01

<!--
<div class="s-rule do">

**Do** use attribute directives when you have presentation logic without a template.

</div>

<div class="s-why">

**Why**? <br />
Attribute directives don't have an associated template.

</div>

<div class="s-why-last">

**Why**? <br />
An element may have more than one attribute directive applied.

</div>

<code-example header="app/shared/highlight.directive.ts" path="styleguide/src/06-01/app/shared/highlight.directive.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/06-01/app/app.component.html"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

어트리뷰트 디렉티브는 템플릿에 필요한 로직을 구현할 때 **사용하세요.**

</div>

<div class="s-why">

**왜**? <br />
어트리뷰트 디렉티브에는 템플릿이 없습니다.

</div>

<div class="s-why-last">

**왜**? <br />
엘리먼트 하나에는 여러 개의 어트리뷰트 디렉티브가 적용될 수도 있습니다.

</div>

<code-example header="app/shared/highlight.directive.ts" path="styleguide/src/06-01/app/shared/highlight.directive.ts" region="example"></code-example>

<code-example header="app/app.component.html" path="styleguide/src/06-01/app/app.component.html"></code-example>

[맨 위로](#toc)


<a id="06-03"></a>

<!--
### `HostListener`/`HostBinding` decorators versus `host` metadata
-->
### `HostListener`/`HostBinding` 데코레이터 vs. `host` 메타데이터

<!--
#### Style 06-03
-->
#### 스타일 06-03

<!--
<div class="s-rule consider">

**Consider** preferring the `@HostListener` and `@HostBinding` to the `host` property of the `@Directive` and `@Component` decorators.

</div>

<div class="s-rule do">

**Do** be consistent in your choice.

</div>

<div class="s-why-last">

**Why**? <br />
The property associated with `@HostBinding` or the method associated with `@HostListener` can be modified only in a single place &mdash;in the directive's class.
If you use the `host` metadata property, you must modify both the property/method declaration in the directive's class and the metadata in the decorator associated with the directive.

</div>

<code-example header="app/shared/validator.directive.ts" path="styleguide/src/06-03/app/shared/validator.directive.ts"></code-example>

Compare with the less preferred `host` metadata alternative.

<div class="s-why-last">

**Why**? <br />
The `host` metadata is only one term to remember and doesn't require extra ES imports.

</div>

<code-example header="app/shared/validator2.directive.ts" path="styleguide/src/06-03/app/shared/validator2.directive.ts"></code-example>

[Back to top](#toc)
-->
<div class="s-rule consider">

`@Directive`나 `@Component` 데코레이터의 `host` 프로퍼티를 활용할 수 있는 로직은 `@HostListener`와 `@HostBinding`으로 사용하는 것을 권장합니다.

</div>

<div class="s-rule do">

코드의 일관성을 **유지하세요.**

</div>

<div class="s-why-last">

**왜**? <br />
`@HostBinding`과 연결된 프로퍼티나 `@HostListener`에 연결된 메소드는 이 데코레이터가 지정된 디렉티브 클래스 안 어디에나 선언하기만 하면 됩니다.
하지만 `host` 메타데이터 프로퍼티를 사용하면, 이렇게 프로퍼티나 메소드를 데코레이터와 클래스 모드 양쪽에 선언해야 합니다.

</div>

<code-example header="app/shared/validator.directive.ts" path="styleguide/src/06-03/app/shared/validator.directive.ts"></code-example>

권장하지 않는 `host` 메타데이터를 사용하면 같은 내용을 어떻게 구현할 수 있는지 확인해 보세요.

<div class="s-why-last">

**왜**? <br />
`host` 메타데이터를 사용하는 것도 이벤트를 바인딩하는 방법 중 하나지만, 더 효율적인 방법을 선택하는 것이 좋습니다.

</div>

<code-example header="app/shared/validator2.directive.ts" path="styleguide/src/06-03/app/shared/validator2.directive.ts"></code-example>

[맨 위로](#toc)


<!--
## Services
-->
## 서비스

<a id="07-01"></a>

<!--
### Services are singletons
-->
### 서비스는 싱글턴으로 사용하세요.

<!--
#### Style 07-01
-->
#### 스타일 07-01

<!--
<div class="s-rule do">

**Do** use services as singletons within the same injector.
Use them for sharing data and functionality.

</div>

<div class="s-why">

**Why**? <br />
Services are ideal for sharing methods across a feature area or an app.

</div>

<div class="s-why-last">

**Why**? <br />
Services are ideal for sharing stateful in-memory data.

</div>

<code-example header="app/heroes/shared/hero.service.ts" path="styleguide/src/07-01/app/heroes/shared/hero.service.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

서비스는 같은 인젝터를 사용해서 싱글턴으로 **사용하세요.**
서비스는 데이터와 함수를 공유하는 방식으로 사용해야 합니다.

</div>

<div class="s-why">

**왜**? <br />
서비스는 여러 컴포넌트에 사용되는 기능을 한 곳에 모아두기 위해 만드는 것입니다.

</div>

<div class="s-why-last">

**왜**? <br />
서비스는 인-메모리 데이터를 공유하는 방식으로 사용하는 것이 가장 좋습니다.

</div>

<code-example header="app/heroes/shared/hero.service.ts" path="styleguide/src/07-01/app/heroes/shared/hero.service.ts" region="example"></code-example>

[맨 위로](#toc)


<a id="07-02"></a>

<!--
### Single responsibility
-->
### 단일 책임

<!--
#### Style 07-02
-->
#### 스타일 07-02

<!--
<div class="s-rule do">

**Do** create services with a single responsibility that is encapsulated by its context.

</div>

<div class="s-rule do">

**Do** create a new service once the service begins to exceed that singular purpose.

</div>

<div class="s-why">

**Why**? <br />
When a service has multiple responsibilities, it becomes difficult to test.

</div>

<div class="s-why-last">

**Why**? <br />
When a service has multiple responsibilities, every component or service that injects it now carries the weight of them all.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

서비스에는 그 서비스를 구현하는 목적에 해당하는 기능만 **구현하세요.**

</div>

<div class="s-rule do">

기존에 있는 서비스의 범위에 벗어나는 기능이 필요할 때 새로운 서비스를 **만드세요.**

</div>

<div class="s-why">

**왜**? <br />
서비스에 여러 용도의 기능을 구현하면 테스트하기 힘들어 집니다.

</div>

<div class="s-why-last">

**왜**? <br />
서비스에 여러 용도의 기능을 구현하면, 컴포넌트나 다른 서비스에 이 서비스를 의존성으로 주입할 때 모든 기능을 한 번에 가지고 다녀야 합니다.

</div>

[맨 위로](#toc)


<a id="07-03"></a>

<!--
### Providing a service
-->
### 서비스 프로바이더

<!--
#### Style 07-03
-->
#### 스타일 07-03

<!--
<div class="s-rule do">

**Do** provide a service with the application root injector in the `@Injectable` decorator of the service.

</div>

<div class="s-why">

**Why**? <br />
The Angular injector is hierarchical.

</div>

<div class="s-why">

**Why**? <br />
When you provide the service to a root injector, that instance of the service is shared and available in every class that needs the service.
This is ideal when a service is sharing methods or state.

</div>

<div class="s-why">

**Why**? <br />
When you register a service in the `@Injectable` decorator of the service, optimization tools such as those used by the [Angular CLI's](cli) production builds can perform tree shaking and remove services that aren't used by your app.

</div>

<div class="s-why-last">

**Why**? <br />
This is not ideal when two different components need different instances of a service.
In this scenario it would be better to provide the service at the component level that needs the new and separate instance.

</div>

<code-example header="src/app/treeshaking/service.ts" path="dependency-injection/src/app/tree-shaking/service.ts"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

서비스는 `@Injectable` 데코레이터를 사용해서 애플리케이션 최상위 인젝터에 **등록하세요.**

</div>

<div class="s-why">

**왜**? <br />
Angular 인젝터는 계층에 따라 구성됩니다.

</div>

<div class="s-why">

**왜**? <br />
애플리케이션 최상위 인젝터에 서비스 프로바이더를 등록하면, 이 서비스의 인스턴스는 모든 클래스에 공유되며, 서비스의 스테이트나 메소드를 함께 활용할 수 있습니다.
서비스는 이런 방식으로 사용하는 것이 가장 좋습니다.

</div>

<div class="s-why">

**왜**? <br />
`@Injectable` 데코레이터를 사용해서 서비스를 등록하면, [Angular CLI's](cli)와 같은 툴로 빌드할 때 앱에서 실제로 사용하지 않는 서비스를 트리 셰이킹으로 모두 제거할 수 있습니다.

</div>

<div class="s-why-last">

**왜**? <br />
같은 서비스를 의존성으로 주입받는 두 컴포넌트가 서로 다른 인스턴스를 사용하는 것은 서비스를 구현의도에 맞게 사용하는 방법이 아닙니다.
이 방식은 두 컴포넌트가 사용하는 서비스의 인스턴스를 명확하게 분리할 필요가 있을 때만 사용하는 방식입니다.

</div>

<code-example header="src/app/treeshaking/service.ts" path="dependency-injection/src/app/tree-shaking/service.ts"></code-example>

[맨 위로](#toc)


<a id="07-04"></a>

<!--
### Use the &commat;Injectable() class decorator
-->
### &commat;Injectable() 클래스 데코레이터를 사용하세요.

<!--
#### Style 07-04
-->
#### 스타일 07-04

<!--
<div class="s-rule do">

**Do** use the `@Injectable()` class decorator instead of the `@Inject` parameter decorator when using types as tokens for the dependencies of a service.

</div>

<div class="s-why">

**Why**? <br />
The Angular Dependency Injection \(DI\) mechanism resolves a service's own
dependencies based on the declared types of that service's constructor parameters.

</div>

<div class="s-why-last">

**Why**? <br />
When a service accepts only dependencies associated with type tokens, the `@Injectable()` syntax is much less verbose compared to using `@Inject()` on each individual constructor parameter.

</div>

<code-example header="app/heroes/shared/hero-arena.service.ts" path="styleguide/src/07-04/app/heroes/shared/hero-arena.service.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-arena.service.ts" path="styleguide/src/07-04/app/heroes/shared/hero-arena.service.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

서비스를 토큰으로 참조할 때 `@Inject` 파라미터 데코레이터 대신 `@Injectable()` 클래스 데코레이터를 **사용하세요.**

</div>

<div class="s-why">

**왜**? <br />
서비스에도 의존성으로 주입하는 객체가 있을 수 있습니다.
이 때 Angular 의존성 주입 메커니즘에 따라 올바른 의존성 객체를 주입하려면, 서비스 생성자에 의존성 객체의 타입을 명시해야 합니다.

</div>

<div class="s-why-last">

**왜**? <br />
서비스를 토큰으로 주입하는 경우를 생각해보면, 생성자의 인자마다 `@Inject()`를 지정하는 것보다 `@Injectable()`로 서비스를 등록하고 토큰으로 바로 지정하는 것이 훨씬 간단합니다.

</div>

<code-example header="app/heroes/shared/hero-arena.service.ts" path="styleguide/src/07-04/app/heroes/shared/hero-arena.service.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-arena.service.ts" path="styleguide/src/07-04/app/heroes/shared/hero-arena.service.ts" region="example"></code-example>

[맨 위로](#toc)


<!--
## Data Services
-->
## 데이터 서비스

<a id="08-01"></a>

<!--
### Talk to the server through a service
-->
### 서버와 통신할 때는 서비스를 사용하세요.

<!--
#### Style 08-01
-->
#### 스타일 08-01

<!--
<div class="s-rule do">

**Do** refactor logic for making data operations and interacting with data to a service.

</div>

<div class="s-rule do">

**Do** make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.

</div>

<div class="s-why">

**Why**? <br />
The component's responsibility is for the presentation and gathering of information for the view.
It should not care how it gets the data, just that it knows who to ask for it.
Separating the data services moves the logic on how to get it to the data service, and lets the component be simpler and more focused on the view.

</div>

<div class="s-why">

**Why**? <br />
This makes it easier to test \(mock or real\) the data calls when testing a component that uses a data service.

</div>

<div class="s-why-last">

**Why**? <br />
The details of data management, such as headers, HTTP methods, caching, error handling, and retry logic, are irrelevant to components and other data consumers.

A data service encapsulates these details.
It's easier to evolve these details inside the service without affecting its consumers.
And it's easier to test the consumers with mock service implementations.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

데이터를 가져오거나 가공하는 로직은 서비스에 **작성하세요.**

</div>

<div class="s-rule do">

XHR 통신으로 데이터를 가져오거나 로컬 스토리지, 메모리에 데이터를 저장하는 로직은 서비스에 **작성하세요.**

</div>

<div class="s-why">

**왜**? <br />
컴포넌트는 화면을 담당하며, 화면에 표시된 정보를 모으는 것까지만 컴포넌트의 역할입니다.
어딘가에서 데이터를 가져오는 로직은 컴포넌트가 담당하는 것이 아니며, 이 역할을 담당하는 무언가를 활용하기만 할 뿐입니다.
데이터를 처리하는 로직은 모두 서비스로 옮기고, 컴포넌트는 화면을 담당하는 역할에 집중하도록 하세요.

</div>

<div class="s-why">

**왜**? <br />
데이터를 가져오는 로직을 컴포넌트에서 제거하면 목업 서비스를 활용할 수 있기 때문에 테스트하기 더 편합니다.

</div>

<div class="s-why-last">

**왜**? <br />
헤더를 지정하거나 HTTP 메소드를 선택하는 로직, 캐싱, 에러 처리, 실패했을 때 재시도하는 로직 등 데이터를 처리하는 로직은 컴포넌트와 직접적인 연관이 없습니다.

이 로직들은 데이터 서비스 안쪽에 구현하는 것이 좋습니다.
그러면 데이터를 사용하는 쪽과 관계없이 로직을 수정하거나 확장할 수 있으며, 컴포넌트에 목업 서비스를 주입해서 테스트하기도 편해집니다.

</div>

[맨 위로](#toc)


<!--
## Lifecycle hooks
-->
## 라이프싸이클 후킹 함수

<!--
Use Lifecycle hooks to tap into important events exposed by Angular.

[Back to top](#toc)
-->
Angular 컴포넌트가 실행되는 각 이벤트 시점을 활용하려면 라이프싸이클 후킹 함수를 사용하세요.

[맨 위로](#toc)


<a id="09-01"></a>

<!--
### Implement lifecycle hook interfaces
-->
### 라이프싸이클 후킹 인터페이스 구현

<!--
#### Style 09-01
-->
#### 스타일 09-01

<!--
<div class="s-rule do">

**Do** implement the lifecycle hook interfaces.

</div>

<div class="s-why-last">

**Why**? <br />
Lifecycle interfaces prescribe typed method signatures.
Use those signatures to flag spelling and syntax mistakes.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/09-01/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/09-01/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-example>

[Back to top](#toc)
-->
<div class="s-rule do">

라이프싸이클 후킹 인터페이스를 **구현하세요.**

</div>

<div class="s-why-last">

**왜**? <br />
라이프싸이클 인터페이스는 Angular 컴포넌트의 이벤트 시점을 활용할 수 있는 메소드를 미리 정의해 둔 것입니다.
이 메소드를 그대로 활용하면 오타를 내거나 문법을 잘못 사용하는 실수를 방지할 수 있습니다.

</div>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/09-01/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example"></code-example>

<code-example header="app/heroes/shared/hero-button/hero-button.component.ts" path="styleguide/src/09-01/app/heroes/shared/hero-button/hero-button.component.ts" region="example"></code-example>

[맨 위로](#toc)


<!--
## Appendix
-->
## 참고

<!--
Useful tools and tips for Angular.

[Back to top](#toc)
-->
Angular 애플리케이션을 개발할 때 활용할 수 있는 툴과 팁을 알아봅시다.

[맨 위로](#toc)


<a id="A-02"></a>

<!--
### File templates and snippets
-->
### 파일 템플릿과 자동완성 플러그인(snippet)

<!--
#### Style A-02
-->
#### 스타일 A-02

<!--
<div class="s-rule do">

**Do** use file templates or snippets to help follow consistent styles and patterns.
Here are templates and/or snippets for some of the web development editors and IDEs.

</div>

<div class="s-rule consider">

**Consider** using [snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) for [Visual Studio Code](https://code.visualstudio.com) that follow these styles and guidelines.

<a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2">

<img alt="Use Extension" src="generated/images/guide/styleguide/use-extension.gif">

</a>

**Consider** using [snippets](https://atom.io/packages/angular-2-typescript-snippets) for [Atom](https://atom.io) that follow these styles and guidelines.

**Consider** using [snippets](https://github.com/orizens/sublime-angular2-snippets) for [Sublime Text](https://www.sublimetext.com) that follow these styles and guidelines.

**Consider** using [snippets](https://github.com/mhartington/vim-angular2-snippets) for [Vim](https://www.vim.org) that follow these styles and guidelines.

</div>

[Back to top](#toc)
-->
<div class="s-rule do">

코딩 스타일을 일관되게 유지하려면 파일 템플릿이나 자동완성 기능을 활용하세요. 템플릿, 코드 자동 완성 툴이나 IDE는 다음과 같은 것이 있습니다.

</div>

<div class="s-rule consider">

[Visual Studio Code](https://code.visualstudio.com)을 사용한다면 [이 기능](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)을 사용하는 것을 **권장합니다.**

<a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2">

<img alt="Use Extension" src="generated/images/guide/styleguide/use-extension.gif">

</a>

[Atom](https://atom.io)을 사용한다면 [이 기능](https://atom.io/packages/angular-2-typescript-snippets)을 사용하는 것을 **권장합니다.**

[Sublime Text](https://www.sublimetext.com)를 사용한다면 [이 기능](https://github.com/orizens/sublime-angular2-snippets)을 사용하는 것을 **권장합니다.**

[Vim](https://www.vim.org)을 사용한다면 [이 기능](https://github.com/mhartington/vim-angular2-snippets)을 사용하는 것을 **권장합니다.**

</div>

[맨 위로](#toc)


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
