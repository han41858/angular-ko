<!--
# JavaScript modules vs. NgModules
-->
# JavaScript 모듈 vs. NgModule

<!--
JavaScript modules and NgModules can help you modularize your code, but they are very different.
Angular apps rely on both kinds of modules.
-->
JavaScript 모듈과 NgModule을 활용하면 애플리케이션 코드를 체계적으로 관리할 수 있지만, 두 방식은 아주 다릅니다.
Angular 앱은 두 모듈 방식을 모두 사용합니다.


<!--
## JavaScript modules: Files containing code
-->
## JavaScript 모듈: 파일 단위

<!--
A [JavaScript module](https://javascript.info/modules "JavaScript.Info - Modules") is an individual file with JavaScript code, usually containing a class or a library of functions for a specific purpose within your app.
JavaScript modules let you spread your work across multiple files.

<div class="alert is-helpful">

To learn more about JavaScript modules, see [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/).
For the module specification, see the [6th Edition of the ECMAScript standard](https://www.ecma-international.org/ecma-262/6.0/#sec-modules).

</div>

To make the code in a JavaScript module available to other modules, use an `export` statement at the end of the relevant code in the module, such as the following:

```typescript
export class AppComponent { ... }
```

When you need that module’s code in another module, use an `import` statement as follows:

```typescript
import { AppComponent } from './app.component';
```

Each module has its own top-level scope.
In other words, top-level variables and functions in a module are not seen in other scripts or modules.
Each module provides a namespace for identifiers to prevent them from clashing with identifiers in other modules.
With multiple modules, you can prevent accidental global variables by creating a single global namespace and adding sub-modules to it.

The Angular framework itself is loaded as a set of JavaScript modules.
-->
[JavaScript 모듈](https://javascript.info/modules "JavaScript.Info - Modules")은 개별 파일을 의미하며, 이 파일에는 특정 기능을 제공하는 JavaScript 코드, 클래스, 라이브러리 함수가 들어 있습니다.
JavaScript 모듈은 Angular 앱 여러 파일에 사용될 것입니다.


<div class="alert is-helpful">

JavaScript 모듈에 대해 자세하게 알아보려면 [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) 문서를 참고하세요.
그리고 모듈 스펙을 확인하려면 [6th Edition of the ECMAScript standard](http://www.ecma-international.org/ecma-262/6.0/#sec-modules)를 참고하세요.

</div>


JavaScript 모듈에서 다른 JavaScript 모듈을 참조하려면 먼저 `export` 구문을 사용해서 모듈 외부로 공개할 객체를 지정해야 합니다:

```typescript
export class AppComponent { ... }
```

그러면 이 파일을 `import` 구문으로 불러올 수 있습니다:

```typescript
import { AppComponent } from './app.component';
```


각 모듈에는 최상위 계층 스코프가 존재합니다.
최상위 계층에 선언된 변수나 함수는 외부 스크립트 파일이나 모듈에서 직접 참조할 수 없습니다.
그리고 다른 모듈에 있는 항목과 이름이 겹치는 문제를 피하기 위해 네임스페이스를 사용하기도 합니다.
모듈을 여러개 사용한다면 전역 변수 안에 전역 네임스페이스를 생성하고 여기에 서브 모듈을 추가하는 방법도 사용할 수 있습니다.

Angular 프레임워크도 JavaScript 모듈 세트로 로드됩니다.


<!--
## NgModules: Classes with metadata for compiling
-->
## NgModule: 메타데이터에 따라 컴파일되는 클래스 단위

<!--
An [NgModule](guide/glossary#ngmodule "Definition of NgModule") is a class marked by the `@NgModule` decorator with a metadata object that describes how that particular part of the app fits together with the other parts.
NgModules are specific to Angular.
While classes with an `@NgModule` decorator are by convention kept in their own files, they differ from JavaScript modules because they include this metadata.

The `@NgModule` metadata plays an important role in guiding the Angular compilation process that converts the app code you write into highly performant JavaScript code.
The metadata describes how to compile a component's template and how to create an [injector](guide/glossary#injector "Definition of injector") at runtime.
It identifies the NgModule's [components](guide/glossary#component "Definition of component"), [directives](guide/glossary#directive "Definition of directive"), and [pipes](guide/glossary#pipe "Definition of pipe)"),
and makes some of them public through the `exports` property so that external components can use them.
You can also use an NgModule to add [providers](guide/glossary#provider "Definition of provider") for [services](guide/glossary#service "Definition of a service"), so that the services are available elsewhere in your app.

Rather than defining all member classes in one giant file as a JavaScript module, declare which components, directives, and pipes belong to the NgModule in the `@NgModule.declarations` list.
These classes are called [declarables](guide/glossary#declarable "Definition of a declarable").
An NgModule can export only the declarable classes it owns or imports from other NgModules.
It doesn't declare or export any other kind of class.
Declarables are the only classes that matter to the Angular compilation process.

For a complete description of the NgModule metadata properties, see [Using the NgModule metadata](guide/ngmodule-api "Using the NgModule metadata").
-->
[NgModule](guide/glossary#ngmodule "Definition of NgModule")은 `@NgModule` 데코레이터가 지정된 클래스입니다.
이 때 데코레이터에 지정된 메타데이터 객체에 따라 이 클래스가 애플리케이션에서 어떤 역할을 할지 결정됩니다.
`@NgModule` 데코레이터가 지정된 클래스는 별도 파일로 구성하는 것이 일반적이지만, JavaScript 모듈이기 때문에 이렇게 구성하는 것은 아닙니다.
NgModule에는 메타데이터가 존재합니다.

`@NgModule` 메타데이터는 Angular가 애플리케이션을 컴파일할 때 중요한 역할을 하며, 컴파일되고 나면 잘 짜여진 JavaScript 코드로 변환됩니다.
메타데이터에는 컴포넌트 템플릿을 어떻게 컴파일할지, 실행 시점에 [인젝터(injector)](guide/glossary#injector "Definition of injector")는 어떻게 생성할지와 같은 정보를 지정합니다.
메타데이터에는 NgModule에 포함되는 [컴포넌트](guide/glossary#component "Definition of component")나 [디렉티브](guide/glossary#directive "Definition of directive"), [파이프](guide/glossary#pipe "Definition of pipe)")를 등록할 수 있으며, 외부 모듈에서 참조하는 항목을 `exports` 배열에 지정할 수 있습니다.
그리고 NgModule 메타데이터에 [서비스](guide/glossary#service "Definition of a service")를 생성할 때 사용하는 [프로바이더](guide/glossary#provider "Definition of provider")를 등록하면 애플리케이션 어디에서도 서비스를 자유롭게 사용할 수 있습니다.

클래스 멤버를 JavaScript 모듈처럼 모두 한 파일에 정의해서 파일 크기를 크게하는 대신, Angular에서는 컴포넌트, 디렉티브, 파이프와 같은 Angular 구성요소를 별개 파일로 정의한 후에 `@NgModule.declarations` 배열에 등록하는 방식으로 사용합니다.
이렇게 `declarations` 배열에 등록할 수 있는 항목을 [선언할 수 있는 항목(declarables)](guide/glossary#declarable "Definition of a declarable")이라고 합니다.
NgModule은 "선언할 수 있는 항목"만 모듈에 등록할 수 있으며, 이렇게 등록된 항목은 다른 NgModule이 가져다 사용할 수도 있습니다.
다른 클래스 항목은 모듈에 등록하거나 모듈 외부로 공개할 수 없습니다.
Angular 컴파일 과정에 처리되는 것은 `declarations`에 등록된 클래스들 뿐입니다.

NgModule 메타데이터에 어떤 프로퍼티를 사용할 수 있는지 알아보려면 [NgModule 메타데이터 활용하기](guide/ngmodule-api "Using the NgModule metadata") 문서를 참고하세요.


<!--
## An example that uses both
-->
## 두 가지 방식을 모두 사용하는 예제

<!--
The root NgModule `AppModule` generated by the [Angular CLI](cli) for a new app project demonstrates how you use both kinds of modules:

<code-example path="ngmodules/src/app/app.module.1.ts" header="src/app/app.module.ts (default AppModule)"></code-example>

The root NgModule starts with `import` statements to import JavaScript modules.
It then configures the `@NgModule` with the following arrays:

* `declarations`: The components, directives, and pipes that belong to the NgModule.
  A new app project's root NgModule has only one component, called `AppComponent`.

* `imports`: Other NgModules you are using, so that you can use their declarables.
  The newly generated root NgModule imports [`BrowserModule`](api/platform-browser/BrowserModule "BrowserModule NgModule") in order to use browser-specific services such as [DOM](https://www.w3.org/TR/DOM-Level-2-Core/introduction.html "Definition of Document Object Model") rendering, sanitization, and location.

* `providers`: Providers of services that components in other NgModules can use.
  There are no providers in a newly generated root NgModule.

* `bootstrap`: The [entry component](guide/entry-components "Specifying an entry component") that Angular creates and inserts into the `index.html` host web page, thereby bootstrapping the app.
  This entry component, `AppComponent`, appears in both the `declarations` and the `bootstrap` arrays.
-->
새 프로젝트를 생성할 때 [Angular CLI](cli)가 자동으로 생성한 최상위 모듈 `AppModule`을 보면 Angular가 두 가지 모듈을 어떻게 활용하고 있는지 확인할 수 있습니다:

<code-example path="ngmodules/src/app/app.module.1.ts" header="src/app/app.module.ts (기본 AppModule)"></code-example>

최상위 NgModule은 `import` 구문을 사용해서 JavaScript 모듈을 로드합니다.
그리고 이런 내용으로 `@NgModule`을 설정합니다:

* `declarations`: NgModule에 포함되는 컴포넌트, 디렉티브, 파이프를 등록합니다.
  앱 프로젝트를 새로 만들면 NgModule에는 `AppComponent`만 존재합니다.

* `imports`: NgModule `declarations` 배열에 등록된 항목이 동작할 수 있도록 추가 항목을 로드합니다.
  새로 생성한 앱 프로젝트의 최상위 NgModule에는 [DOM](https://www.w3.org/TR/DOM-Level-2-Core/introduction.html "Definition of Document Object Model") 렌더링, 악성코드 방어, location 관리 기능을 사용하기 위해 [`BrowserModule`](api/platform-browser/BrowserModule "BrowserModule NgModule")이 등록되어 있습니다.

* `providers`: NgModule에 등록된 컴포넌트에서 사용할 서비스의 프로바이더를 등록합니다.
  앱 프로젝트를 새로 만들었을 때 최상위 NgModule에 등록된 프로바이더는 없습니다.

* `bootstrap`: Angular가 부트스트랩될 때 호스트 웹 페이지 `index.html`에 생성해서 집어넣을 [진입 컴포넌트](guide/entry-components "Specifying an entry component")를 지정합니다.
  기본 진입 컴포넌트는 `AppComponent`이며, 이 컴포넌트는 `declarations` 배열과 `bootstrap` 배열에 모두 등록되어 있습니다.


<!--
## Next steps
-->
## 다음 단계

<!--
* For more about NgModules, see [Organizing your app with NgModules](guide/ngmodules "Organizing your app with NgModules").
* To learn more about the root NgModule, see [Launching an app with a root NgModule](guide/bootstrapping "Launching an app with a root NgModule").
* To learn about frequently used Angular NgModules and how to import them into your app, see [Frequently-used modules](guide/frequent-ngmodules "Frequently-used modules").
-->
* NgModule에 대해 더 알아보려면 [NgModule로 앱 구성하기](guide/ngmodules "Organizing your app with NgModules") 문서를 참고하세요.

* 최상위 NgModule에 대해 알아보려면 [최상위 NgModule로 앱 실행하기](guide/bootstrapping "Launching an app with a root NgModule") 문서를 참고하세요.

* 자주 사용하는 Angular NgModule은 어떤 것이 있는지, 이 모듈은 애플리케이션에 어떻게 로드하는지 알아보려면 [자주 사용하는 모듈](guide/frequent-ngmodules "Frequently-used modules") 문서를 참고하세요.
