# NgModule API

<!--
At a high level, NgModules are a way to organize Angular applications and they accomplish this through the metadata in the `@NgModule` decorator.
The metadata falls into three categories:

| Category                 | Details |
|:---                      |:---     |
| Static                   | Compiler configuration which tells the compiler about directive selectors and where in templates the directives should be applied through selector matching. This is configured using the `declarations` array. |
| Runtime                  | Injector configuration using the `providers` array.                                                                                                                                                             |
| Composability / Grouping | Bringing NgModules together and making them available using the `imports` and `exports` arrays.                                                                                                                 |

<code-example format="typescript" language="typescript">

&commat;NgModule({
  // Static, that is compiler configuration
  declarations: [], // Configure the selectors

  // Runtime, or injector configuration
  providers: [], // Runtime injector configuration

  // Composability / Grouping
  imports: [], // composing NgModules together
  exports: [] // making NgModules available to other parts of the app
})

</code-example>
-->
NgModule을 사용하면 Angular 애플리케이션의 코드를 효율적으로 구성할 수 있으며, 이 때 `@NgModule` 데코레이터를 사용합니다.
이 데코레이터의 메타데이터는 세종류로 나눠 볼 수 있습니다:

| 종류                 | 설명                                                           |
|:-------------------|:-------------------------------------------------------------|
| 정적\(Static\) 설정    | 컴파일러가 모듈을 빌드할 때 알아야 할 디렉티브를 등록합니다. `declarations` 배열이 해당됩니다. |
| 런타임\(Runtime\) 설정  | 모듈이 실행될 때 의존성을 주입해야 한다면, `providers` 배열로 인젝터를 설정합니다.         |
| 그룹화\(Grouping\) 설정 | 다른 NgModule과 조합하기 위해 `imports`, `exports` 배열을 설정합니다.         |

<code-example format="typescript" language="typescript">

&commat;NgModule({
  // 정적 설정. 이 내용은 컴파일러와 관련된 내용입니다.
  declarations: [], // 셀렉터를 설정합니다.

  // 런타임 설정, 인젝터 설정
  providers: [], // 모듈이 실행될때 사용하는 인젝터를 설정합니다.

  // 그룹화
  imports: [], // 이 모듈이 사용하는 외부 NgModule을 등록합니다.
  exports: [] // 모듈의 구성요소를 모듈 외부로 공개할 때 사용합니다.
})

</code-example>


<!--
## `@NgModule` metadata
-->
## `@NgModule` 메타데이터

<!--
The following table summarizes the `@NgModule` metadata properties.

| Property       | Details |
|:---            |:---     |
| `declarations` | A list of [declarable](guide/ngmodule-faq#q-declarable) classes \(*components*, *directives*, and *pipes*\) that *belong to this module*. <ol> <li> When compiling a template, you need to determine a set of selectors which should be used for triggering their corresponding directives. </li> <li> The template is compiled within the context of an NgModule &mdash;the NgModule within which the template's component is declared&mdash; which determines the set of selectors using the following rules: <ul> <li> All selectors of directives listed in `declarations`. </li> <li> All selectors of directives exported from imported NgModules. </li> </ul> </li> </ol> Components, directives, and pipes must belong to *exactly* one module. The compiler emits an error if you try to declare the same class in more than one module. Be careful not to re-declare a class that is imported directly or indirectly from another module.                                                                                                                                                                                                                                                 |
| `providers`    | A list of dependency-injection providers. <br /> Angular registers these providers with the NgModule's injector. If it is the NgModule used for bootstrapping then it is the root injector. <br /> These services become available for injection into any component, directive, pipe or service which is a child of this injector. <br /> A lazy-loaded module has its own injector which is typically a child of the application root injector. <br /> Lazy-loaded services are scoped to the lazy module's injector. If a lazy-loaded module also provides the `UserService`, any component created within that module's context \(such as by router navigation\) gets the local instance of the service, not the instance in the root application injector. <br /> Components in external modules continue to receive the instance provided by their injectors. <br /> For more information on injector hierarchy and scoping, see [Providers](guide/providers) and the [DI Guide](guide/dependency-injection).                                                                                                                                                                                  |
| `imports`      | A list of modules which should be folded into this module. Folded means it is as if all the imported NgModule's exported properties were declared here. <br /> Specifically, it is as if the list of modules whose exported components, directives, or pipes are referenced by the component templates were declared in this module. <br /> A component template can [reference](guide/ngmodule-faq#q-template-reference) another component, directive, or pipe when the reference is declared in this module or if the imported module has exported it. For example, a component can use the `NgIf` and `NgFor` directives only if the module has imported the Angular `CommonModule` \(perhaps indirectly by importing `BrowserModule`\). <br /> You can import many standard directives from the `CommonModule` but some familiar directives belong to other modules. For example, you can use `[(ngModel)]` only after importing the Angular `FormsModule`.                                                                                                                                                                                                                                     |
| `exports`      | A list of declarations &mdash;*component*, *directive*, and *pipe* classes&mdash; that an importing module can use. <br /> Exported declarations are the module's *public API*. A component in another module can [use](guide/ngmodule-faq#q-template-reference) *this* module's `UserComponent` if it imports this module and this module exports `UserComponent`. <br /> Declarations are private by default. If this module does *not* export `UserComponent`, then only the components within *this* module can use `UserComponent`. <br /> Importing a module does *not* automatically re-export the imported module's imports. Module 'B' can't use `ngIf` just because it imported module 'A' which imported `CommonModule`. Module 'B' must import `CommonModule` itself. <br /> A module can list another module among its `exports`, in which case all of that module's public components, directives, and pipes are exported. <br /> [Re-export](guide/ngmodule-faq#q-reexport) makes module transitivity explicit. If Module 'A' re-exports `CommonModule` and Module 'B' imports Module 'A', Module 'B' components can use `ngIf` even though 'B' itself didn't import `CommonModule`. |
| `bootstrap`    | A list of components that are automatically bootstrapped. <br /> Usually there's only one component in this list, the *root component* of the application. <br /> Angular can launch with multiple bootstrap components, each with its own location in the host web page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
-->
`@NgModule`에 사용하는 메타데이터를 자세하게 알아봅시다.

| 프로퍼티           | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|:---------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `declarations` | *이 모듈에 포함되는* [*컴포넌트*와 *디렉티브*, *파이프*](guide/ngmodule-faq#q-declarable)를 등록합니다. <ol> <li> 템플릿을 컴파일하려면 이 템플릿에 사용된 셀렉터들을 모듈에 미리 등록해야 합니다. </li> <li> 템플릿이 컴파일되는 컨텍스트는 NgModule 컨텍스트와 같습니다. 그래서 템플릿에 사용되는 컴포넌트는 모듈의 컨텍스트 안에 정의되어야 하며, 사용할 수 있는 컴포넌트의 범위는 다음과 같습니다: <ul> <li> `declarations` 배열에 등록된 디렉티브의 셀렉터 </li> <li> `imports` 배열로 불러온 NgModule의 구성 요소 중 모듈 외부로 공개된 디렉티브의 셀렉터 </li> </ul> </li> </ol> 컴포넌트, 디렉티브, 파이프는 *반드시 한 모듈에만 등록되어야 합니다. 어떤 항목이 모듈에 두 번 이상 등록되면 컴파일러에서 에러가 발생합니다. 중복 로드되지 않도록 주의하세요.                                                                                                                                                                                                                                                                                                                                      |
| `providers`    | 의존성 주입에 사용되는 서비스 프로바이더를 등록합니다. <br /> 이 목록에 지정된 프로바이더는 NgModule의 인젝터에 등록됩니다. 그리고 이 모듈이 부트스트랩되는 모듈이라면 최상위 인젝터로 등록됩니다. <br /> 그러면 이 프로바이더가 생성하는 서비스를 컴포넌트나 디렉티브, 파이프, 서비스에 의존성으로 주입해서 사용할 수 있습니다. <br /> 지연로딩되는 서비스의 스코프는 지연로딩된 모듈의 인젝터 스코프와 같습니다. <br /> 그래서 지연로딩된 모듈에 `UserService` 프로바이더가 등록되고 있고 이 모듈 안에 있는 컴포넌트가 `UserService`를 사용하면, 이 컴포넌트는 애플리케이션 최상위 인젝터가 생성한 서비스의 인스턴스 대신 모듈 안에서 생성된 인스턴스를 사용합니다. <br /> 이 때 모듈 밖에 있는 컴포넌트는 여전히 애플리케이션 최상위 인젝터를 사용합니다. <br /> 인젝터의 계층과 스코프에 대해 더 알아보려면 [프로바이더](guide/providers) 문서와 [DI Guide](guide/dependency-injection) 문서를 참고하세요.                                                                                                                                                                                                                                                                 |
| `imports`      | 이 모듈 안에서 사용하는 외부 모듈을 등록합니다. 그러면 `imports`에 지정된 모듈의 내용이 이 모듈에 있는 것처럼 사용할 수 있습니다. <br /> 좀 더 정확하게 이야기하면, 불러온 모듈에서 모듈 외부로 공개된 컴포넌트나 디렉티브, 파이프만 이 모듈의 컴포넌트 템플릿에 사용할 수 있습니다. <br /> 컴포넌트 템플릿은 다른 컴포넌트나, 디렉티브, 파이프를 [사용](guide/ngmodule-faq#q-template-reference)할 수 있는데, 이 대상이 현재 모듈 안에 선언되어 있거나, 외부에서 불러온 모듈에서 모듈 외부로 공개한 항목이어야 사용할 수 있습니다. 그래서 Angular의 기본 라이브러리 중 `CommonModule`이나 `BrowserModule`을 로드하는 모듈은 `NgIf`나 `NgFor` 디렉티브를 자유롭게 사용할 수 있습니다. <br /> `CommonModule`에서 제공하는 기본 디렉티브를 활용하는 것처럼 다른 모듈의 디렉티브도 같은 방식으로 활용할 수 있습니다. `FormsModule`을 로드한 후에 `[(ngModel)]`을 사용하는 것도 이와 마찬가지입니다.                                                                                                                                                                                                                                                    |
| `exports`      | 이 모듈을 로드하는 다른 모듈에서 사용할 수 있도록, 모듈의 *컴포넌트*나 *디렉티브*, *파이프*를 외부에 공개할 때 사용합니다. <br /> 이렇게 모듈 외부로 공개되는 항목은 모듈의 *public API* 라고 볼 수도 있습니다. 만약 이 모듈에서 `UserComponent`를 모듈 밖으로 공개한다고 선언하면, 이 모듈을 로드하는 다른 모듈도 `UserComponent`를 [사용](guide/ngmodule-faq#q-template-reference)할 수 있습니다. <br /> 모듈에 선언되는 컴포넌트나 디렉티브, 파이프는 기본적으로 private입니다. 그래서 이 모듈이 `UserComponent`를 모듈 외부로 공개하지 않으면, 이 컴포넌트는 *이* 모듈에서만 사용할 수 있습니다. <br /> 모듈을 불러오는 것만으로는 이 모듈의 내용이 모듈 밖으로 연결되지 않습니다. 그래서 모듈 A가 `CommonModule`을 로드하면 모듈 A는 `ngIf`를 사용할 수 있지만, 모듈 A를 로드하는 모듈 B는 `CommonModule`을 따로 로드하지 않는 한 `ngIf` 디렉티브를 사용할 수 없습니다. <br /> 모듈의 구성요소를 [다시 외부로 공개(re-export)](guide/ngmodule-faq#q-reexport)하면 모듈을 중개하는 역할로 사용할 수도 있습니다. <br /> `CommonModule`을 로드하는 모듈 A가 `CommonModule`을 모듈 외부로 다시 공개하면, 모듈 B는 `CommonModule`을 다시 로드하지 않아도 `ngIf`와 같은 `CommonModule`의 디렉티브를 사용할 수 있습니다. |
| `bootstrap`    | 자동으로 부트스트랩 될 컴포넌트를 지정합니다. <br /> 보통 이 목록에는 컴포넌트 하나만 등록하며, 앱 모듈의 경우에는 애플리케이션의 *최상위 컴포넌트* 를 여기에 등록합니다. <br /> 호스트 웹 페이지가 여러 개의 컴포넌트로 구성되어 있다면, 부트스트랩되는 컴포넌트를 여러 개 지정할 수도 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


<!--
## More on NgModules
-->
## NgModule 더 알아보기

<!--
You may also be interested in the following:

*   [Feature Modules](guide/feature-modules)
*   [Providers](guide/providers)
*   [Types of Feature Modules](guide/module-types)
-->
이런 내용들도 확인해 보세요:

*   [기능 모듈](guide/feature-modules)
*   [진입 컴포넌트](guide/entry-components)
*   [프로바이더](guide/providers)
*   [기능 모듈의 종류](guide/module-types)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
