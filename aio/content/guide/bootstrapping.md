<!--
# Launching your app with a root module
-->
# 앱 실행하기: 최상위 모듈 부트스트랩하기

<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following:

*   [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule)

An NgModule describes how the application parts fit together.
Every application has at least one Angular module, the *root* module, which must be present for bootstrapping the application on launch.
By convention and by default, this NgModule is named `AppModule`.

When you use the [Angular CLI](cli) command `ng new` to generate an app, the default `AppModule` looks like the following:

<code-example format="typescript" language="typescript">

/* JavaScript imports */
import { BrowserModule } from '&commat;angular/platform-browser';
import { NgModule } from '&commat;angular/core';

import { AppComponent } from './app.component';

/* the AppModule class with the &commat;NgModule decorator */
&commat;NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

</code-example>

After the import statements is a class with the **`@NgModule`** [decorator](guide/glossary#decorator '"Decorator" explained').

The `@NgModule` decorator identifies `AppModule` as an `NgModule` class.
`@NgModule` takes a metadata object that tells Angular how to compile and launch the application.

| metadata object | Details |
|:---             |:---     |
| declarations    | This application's lone component.                                                                          |
| imports         | Import `BrowserModule` to have browser-specific services such as DOM rendering, sanitization, and location. |
| providers       | The service providers.                                                                                      |
| bootstrap       | The *root* component that Angular creates and inserts into the `index.html` host web page.                  |

The default application created by the Angular CLI only has one component, `AppComponent`, so it is in both the `declarations` and the `bootstrap` arrays.
-->
다음 내용을 이해하고 있는 것이 좋습니다:

* [JavaScript 모듈 vs. NgModules](guide/ngmodule-vs-jsmodule).

NgModule은 애플리케이션을 구성하는 단위입니다.
애플리케이션에는 반드시 *최상위* 모듈이 존재하기 때문에 모듈이 언제나 존재한다고 할 수 있으며, 애플리케이션은 이 최상위 모듈을 부트스트랩하면서 시작됩니다.
이 최상위 모듈은 보통 `AppModule`이라고 합니다.

[Angular CLI](cli)로 `ng new` 명령을 실행해서 프로젝트를 생성하면 `AppModule`이 다음과 같이 구성됩니다:

<code-example format="typescript" language="typescript">

/* JavaScript imports */
import { BrowserModule } from '&commat;angular/platform-browser';
import { NgModule } from '&commat;angular/core';

import { AppComponent } from './app.component';

/* AppModule 클래스에 &commat;NgModule 데코레이터를 사용합니다. */
&commat;NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

</code-example>

Angular 모듈은 JavaScript 모듈 로드 구문 뒤에 **`@NgModule`** [데코레이터](guide/glossary#decorator '"Decorator" explained')를 붙여 정의합니다.

이 때 `AppModule`에 사용하는 `@NgModule` 데코레이터의 메타데이터를 지정하면 이 모듈을 어떻게 컴파일할지, 어떻게 실행할지 지정할 수 있습니다.

| 메타데이터 객체     | 설명                                                                             |
|:-------------|:-------------------------------------------------------------------------------|
| declarations | 이 모듈에 속하는 컴포넌트를 등록합니다. 아직은 컴포넌트 하나밖에 없습니다.                                     |
| imports      | DOM 렌더링, 위험 코드 처리, location 등 브라우저 지원이 필요한 기능을 사용하기 위해 `BrowserModule`을 로드합니다. |
| providers    | 서비스 프로바이더를 등록합니다.                                                              |
| bootstrap    | `index.html` 페이지에 생성되고 실행될 *최상위* 컴포넌트를 지정합니다.                                  |

Angular CLI로 만든 프로젝트에는 `AppComponent` 컴포넌트가 하나 있습니다. 그리고 이 컴포넌트의 `declarations`와 `bootstrap`은 배열로 지정되어 있습니다.


<a id="declarations"></a>
<a id="the-declarations-array"></a>

<!--
## The `declarations` array
-->
## `declarations` 배열

<!--
The module's `declarations` array tells Angular which components belong to that module.
As you create more components, add them to `declarations`.

You must declare every component in exactly one `NgModule` class.
If you use a component without declaring it, Angular returns an error message.

The `declarations` array only takes declarables. Declarables are components, [directives](guide/attribute-directives), and [pipes](guide/pipes-overview).
All of a module's declarables must be in the `declarations` array.
Declarables must belong to exactly one module. The compiler emits an error if you try to declare the same class in more than one module.

These declared classes are visible within the module but invisible to components in a different module, unless they are exported from this module and the other module imports this one.

An example of what goes into a declarations array follows:

<code-example format="typescript" language="typescript">

declarations: [
  YourComponent,
  YourPipe,
  YourDirective
],

</code-example>

A declarable can only belong to one module, so only declare it in one `@NgModule`.
When you need it elsewhere, import the module that contains the declarable you need.
-->
`declarations` 배열에는 이 모듈에 어떤 컴포넌트가 포함되는지 지정합니다.
그래서 모듈에 새로운 컴포넌트를 추가할 때마다 `declarations` 배열에도 추가해야 합니다.

컴포넌트는 `NgModule` 한 곳에 꼭 등록해야 합니다.
만약 아무 모듈에도 등록하지 않으면, Angular가 에러를 발생시킵니다.

`declarations` 배열에는 Angular 구성요소 중 컴포넌트나 [디렉티브](guide/attribute-directives), [파이프](guide/pipes)를 등록합니다.
이렇게 등록된 구성요소는 해당 모듈에 포함되도록 등록되며, 한 번 등록된 구성요소를 다른 모듈에도 등록하면 컴파일할 때 에러가 발생합니다.

모듈에 등록된 구성요소는 모듈 안에서 자유롭게 사용할 수 있으며, 다른 모듈에서는 모듈 외부로 공개하지 않은 클래스를 사용할 수 없습니다.

애플리케이션을 계속 개발하다 보면 이 배열은 다음과 같은 모습이 될 것입니다:

<code-example format="typescript" language="typescript">

declarations: [
  YourComponent,
  YourPipe,
  YourDirective
],

</code-example>

선언가능한 항목들은 모듈 한 곳에만 포함되기 때문에 반드시 `@NgModule` 하나에만 선언되어야 합니다.
이 항목을 다른 곳에 사용하려면 모듈 단위로 로드해야 합니다.


<!--
### Using directives with `@NgModule`
-->
### `@NgModule`에 디렉티브 등록하기

<!--
Use the `declarations` array for directives.
To use a directive, component, or pipe in a module, you must do a few things:

1.  Export it from the file where you wrote it.
1.  Import it into the appropriate module.
1.  Declare it in the `@NgModule` `declarations` array.

Those three steps look like the following. In the file where you create your directive, export it.
The following example, named `ItemDirective` is the default directive structure that the CLI generates in its own file, `item.directive.ts`:

<code-example header="src/app/item.directive.ts" path="bootstrapping/src/app/item.directive.ts" region="directive"></code-example>

The key point here is that you have to export it, so that you can import it elsewhere.
Next, import it into the `NgModule`, in this example `app.module.ts`, with a JavaScript import statement:

<code-example header="src/app/app.module.ts" path="bootstrapping/src/app/app.module.ts" region="directive-import"></code-example>

And in the same file, add it to the `@NgModule` `declarations` array:

<code-example header="src/app/app.module.ts" path="bootstrapping/src/app/app.module.ts" region="declarations"></code-example>

Now you could use your `ItemDirective` in a component.
This example uses `AppModule`, but you'd do it the same way for a feature module.
For more about directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).
You'd also use the same technique for [pipes](guide/pipes-overview) and components.

Remember, components, directives, and pipes belong to one module only.
You only need to declare them once in your application because you share them by importing the necessary modules.
This saves you time and helps keep your application lean.
-->
`declarations` 배열에 디렉티브를 등록해 봅시다.
모듈에 디렉티브나 컴포넌트, 파이프를 등록하려면 다음 순서로 진행합니다:

1. 디렉티브를 작성한 파일에서 클래스에 `export` 키워드를 사용해서 파일 외부로 공개합니다.
1. 모듈을 정의하는 파일에 이 디렉티브를 로드합니다.
1. `@NgModule`의 `declarations` 배열에 이 디렉티브를 등록합니다.

이 내용을 순서대로 살펴봅시다. 디렉티브를 정의하고 나면, 이 디렉티브를 파일 외부로 공개해야 합니다.
`item.directive.ts` 파일에 `ItemDirective`를 정의해 봅시다.
Angular CLI로 디렉티브를 생성하면 디렉티브의 기본 구조가 다음과 같이 구성됩니다:

<code-example header="src/app/item.directive.ts" path="bootstrapping/src/app/item.directive.ts" region="directive"></code-example>

이 파일에서 중요한 점은, 이 클래스가 `export` 키워드로 지정되었기 때문에 다른 모듈이 이 클래스를 참조할 수 있다는 것입니다.
따라서, 앱 모듈을 정의하는 `app.module.ts` 파일에서는 다음과 같이 로드할 수 있습니다:

<code-example header="src/app/app.module.ts" path="bootstrapping/src/app/app.module.ts" region="directive-import"></code-example>

이렇게 불러온 디렉티브를 `@NgModule`의 `declarations` 배열에 추가합니다:

<code-example header="src/app/app.module.ts" path="bootstrapping/src/app/app.module.ts" region="declarations"></code-example>

이제 컴포넌트에서 `ItemDirective`를 자유롭게 사용할 수 있습니다.
그리고 이 예제에서는 `AppModule`에 디렉티브를 등록했지만, 앱 모듈 대신 기능 모듈에 디렉티브를 등록할 수도 있습니다.
디렉티브에 대해 좀 더 알아보려면 [어트리뷰트 디렉티브](guide/attribute-directives)나 [구조 디렉티브](guide/structural-directives) 문서를 참고하세요.
이 과정은 [파이프](guide/pipes)나 컴포넌트를 등록할 때도 동일합니다.

컴포넌트, 디렉티브, 파이프는 언제나 모듈 하나에만 포함된다는 것을 꼭 기억하세요.
이 구성요소들은 어떤 모듈이던지 한 곳에만 등록하면 되며, 다른 곳에서는 등록된 모듈을 불러와서 사용하기만 하면 됩니다.
이 구조는 앱을 구성하는 모듈의 결합도를 최대한 낮추기 위한 구조입니다.


<a id="imports"></a>

<!--
## The `imports` array
-->
## `imports` 배열

<!--
The module's `imports` array appears exclusively in the `@NgModule` metadata object.
It tells Angular about other NgModules that this particular module needs to function properly.

<code-example header="src/app/app.module.ts (excerpt)" path="bootstrapping/src/app/app.module.ts" region="imports"></code-example>

This list of modules are those that export components, directives, or pipes that component templates in this module reference.
In this case, the component is `AppComponent`, which references components, directives, or pipes in `BrowserModule`, `FormsModule`, or  `HttpClientModule`.
A component template can reference another component, directive, or pipe when the referenced class is declared in this module, or the class was imported from another module.
-->
`@NgModule`의 메타데이터 중 `imports` 배열은 이 모듈에서 필요한 기능을 다른 모듈에서 로드할 때 사용합니다.

<code-example header="src/app/app.module.ts (일부)" path="bootstrapping/src/app/app.module.ts" region="imports"></code-example>

그리고 이렇게 불러온 모듈 안에서 `export` 키워드로 지정된 컴포넌트나 디렉티브, 파이프는 `imports` 배열을 지정한 현재 모듈안에서 자유롭게 사용할 수 있습니다.
Angular CLI로 생성했던 `NgModule` 모듈로 설명하면, 모듈에 포함된다고 등록한 `AppComponent`에서는 앱 모듈에서 불러온 `BrowserModule`, `FormsModule`, `HttpModule` 안에 있는 컴포넌트, 디렉티브, 파이프 중 모듈 외부로 공개된 구성요소는 자유롭게 사용할 수 있습니다.

<a id="bootstrap-array"></a>


<!--
## The `providers` array
-->
## `providers` 배열

<!--
The providers array is where you list the services the application needs.
When you list services here, they are available app-wide.
You can scope them when using feature modules and lazy loading.
For more information, see [Providers](guide/providers).
-->
`providers` 배열에는 앱에서 사용하는 서비스를 등록합니다.
이 배열에 서비스 프로바이더를 등록하면 하위 모듈에서 모두 이 서비스를 의존성으로 주입받을 수 있으며, 이 때 지연 로딩하는 모듈을 따로 구분할 수도 있습니다.
더 자세한 내용은 [프로바이더](guide/providers) 문서를 참고하세요.


<!--
## The `bootstrap` array
-->
## `bootstrap` 배열

<!--
The application launches by bootstrapping the root `AppModule`, which is also referred to as an `entryComponent`.
Among other things, the bootstrapping process creates the component\(s\) listed in the `bootstrap` array and inserts each one into the browser DOM.

Each bootstrapped component is the base of its own tree of components.
Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree.

While you can put more than one component tree on a host web page, most applications have only one component tree and bootstrap a single root component.

This one root component is usually called `AppComponent` and is in the root module's `bootstrap` array.

In a situation where you want to bootstrap a component based on an API response,
or you want to mount the `AppComponent` in a different DOM node that doesn't match the component selector, please refer to `ApplicationRef.bootstrap()` documentation.
-->
Angular 애플리케이션은 최상위 모듈인 `AppModule`에서 시작되며, 이 때 모듈에 정의된 `entryComponent` 배열을 참조합니다.
Angular 모듈의 다른 메타데이터와는 다르게, `bootstrap` 배열에 등록된 컴포넌트는 부트스트랩 단계에서 바로 생성되어 브라우저 DOM에 추가됩니다.

이 때 각각의 컴포넌트는 트리를 구성하는 최상위 컴포넌트의 역할을 합니다.
그래서 이 컴포넌트들이 DOM에 추가된 이후에는 자식 컴포넌트들이 순차적으로 생성됩니다.

애플리케이션은 보통 하나의 컴포넌트 트리를 구성하고 이 컴포넌트를 부트스트랩하는 방식으로 작성하지만, 웹 페이지에 컴포넌트 트리를 여러개 구성하는 것도 물론 가능합니다.

컴포넌트 트리가 하나만 있다면 이 컴포넌트 트리의 최상위 컴포넌트를 보통 `AppComponent`라고 하고, Angular 모듈의 `bootstrap` 배열에는 컴포넌트 하나만 등록합니다.

API 요청을 보내고 받은 응답에 따라 부트스트랩 할 컴포넌트를 선택하거나, `AppComponent`를 컴포넌트 셀렉터로 지정한 이름과 다른 DOM 노드로 마운트 할 수도 있습니다.
자세한 내용은 `ApplicationRef.bootstrap()` 문서를 참고하세요.


<!--
## More about Angular Modules
-->
## Angular 모듈 더 알아보기

<!--
For more on NgModules you're likely to see frequently in applications, see [Frequently Used Modules](guide/frequent-ngmodules).
-->
애플리케이션을 개발하면서 자주 사용하는 NgModule에 대해 더 알아보려면 [자주 사용하는 NgModule](guide/frequent-ngmodules) 문서를 참고하세요.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-08-14
