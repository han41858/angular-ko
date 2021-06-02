<!--
# Angular Components Overview
-->
# Angular 컴포넌트 개요

<!--
Components are the main building block for Angular applications. Each component consists of:

* An HTML template that declares what renders on the page
* A Typescript class that defines behavior
* A CSS selector that defines how the component is used in a template
* Optionally, CSS styles applied to the template

This topic describes how to create and configure an Angular component.

<div class="alert is-helpful">

To view or download the example code used in this topic, see the <live-example></live-example>.

</div>
-->
컴포넌트는 Angular 애플리케이션을 구성하는 기본 단위입니다.
그리고 개별 컴포넌트는 이런 요소들로 구성됩니다:

* 화면을 렌더링하는 HTML 템플릿
* 동작을 정의하는 TypeScript 클래스
* 컴포넌트를 템플릿에 추가할 때 사용하는 CSS 셀렉터
* 추가로 컴포넌트가 표시되는 모습을 정의하는 CSS 스타일

이 문서는 Angular 컴포넌트를 만드는 방법과 세부설정하는 방법에 대해 다룹니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전준비

<!--
To create a component, verify that you have met the following prerequisites:

1. [Install the Angular CLI.](guide/setup-local#install-the-angular-cli)
1. [Create an Angular workspace](guide/setup-local#create-a-workspace-and-initial-application) with initial application.
   If you don't have a project, you can create one using `ng new <project-name>`, where `<project-name>` is the name of your Angular application.
-->
컴포넌트를 만들려면 이런 환경이 준비되어야 합니다:

1. [Angular CLI가 설치되어 있어야 합니다.](guide/setup-local#install-the-angular-cli)
1. [Angular 워크스페이스](guide/setup-local#create-a-workspace-and-initial-application)가 존재하고 이 안에 기본 애플리케이션이 있어야 합니다.
아직 프로젝트가 없다면 `ng new <프로젝트-이름>` 명령을 실행해서 프로젝트를 생성할 수 있습니다.


<!--
## Creating a component
-->
## 컴포넌트 생성하기

<!--
The easiest way to create a component is with the Angular CLI. You can also create a component manually.
-->
컴포넌트를 생성하는 방법 중 가장 쉬운 방법은 Angular CLI를 사용하는 것입니다.
Angular CLI를 사용하지 않고 수동으로 만드는 방법도 있습니다.


<!--
### Creating a component using the Angular CLI
-->
### Angular CLI로 컴포넌트 생성하기

<!--
To create a component using the Angular CLI:

1. From a terminal window, navigate to the directory containing your application.
1. Run the `ng generate component <component-name>` command, where `<component-name>` is the name of your new component.

By default, this command creates the following:

* A folder named after the component
* A component file, `<component-name>.component.ts`
* A template file, `<component-name>.component.html`
* A CSS file, `<component-name>.component.css`
* A testing specification file, `<component-name>.component.spec.ts`

Where `<component-name>` is the name of your component.

<div class="alert is-helpful">

You can change how `ng generate component` creates new components.
For more information, see [ng generate component](cli/generate#component-command) in the Angular CLI documentation.

</div>
-->
Angular CLI로 컴포넌트를 생성하려면:

1. 터미널 창을 열고 애플리케이션 폴더로 이동합니다.
1. `ng generate component <컴포넌트-이름>` 명령을 실행해서 컴포넌트를 생성합니다.

이 명령을 실행하면 컴포넌트가 이렇게 구성됩니다:

* 컴포넌트 이름으로 폴더가 생성됩니다.
* `<컴포넌트-이름>.component.ts` 컴포넌트 파일이 생성됩니다.
* `<컴포넌트-이름>.component.html` 템플릿 파일이 생성됩니다.
* `<컴포넌트-이름>.component.css` CSS 스타일 파일이 생성됩니다.
* `<컴포넌트-이름>.component.spec.ts` 테스트 파일이 생성됩니다.

그리고 이렇게 만든 컴포넌트의 셀렉터는 `<컴포넌트-이름>` 입니다.

<div class="alert is-helpful">

`ng generate component` 명령이 동작하는 방식은 변경할 수 있습니다.
자세한 내용은 Angular CLI 문서 [ng generate component](cli/generate#component-command) 섹션을 참고하세요.

</div>


<!--
### Creating a component manually
-->
### 수동으로 컴포넌트 생성하기

<!--
Although the Angular CLI is the easiest way to create an Angular component, you can also create a component manually.
This section describes how to create the core component file within an existing Angular project.

To create a new component manually:

1. Navigate to your Angular project directory.
1. Create a new file, `<component-name>.component.ts`.
1. At the top of the file, add the following import statement.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="import">
   </code-example>

1. After the `import` statement, add a `@Component` decorator.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator-skeleton">
   </code-example>

1. Choose a CSS selector for the component.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="selector">
   </code-example>

   For more information on choosing a selector, see [Specifying a component's selector](#specifying-a-components-css-selector).

1. Define the HTML template that the component uses to display information.
   In most cases, this template is a separate HTML file.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="templateUrl">
   </code-example>

   For more information on defining a component's template, see [Defining a component's template](#defining-a-components-template).

1. Select the styles for the component's template.
   In most cases, you define the styles for your component's template in a separate file.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator">
   </code-example>

1. Add a `class` statement that includes the code for the component.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="class">
   </code-example>
-->
컴포넌트는 Angular CLI로 생성하는 것이 가장 간단하지만, 수동으로 생성할 수도 있습니다.
이번 섹션에서는 Angular 프로젝트에 컴포넌트를 수동으로 생성하는 방법에 대해 알아봅시다.

컴포넌트는 이렇게 생성하면 됩니다:

1. Angular 프로젝트로 이동합니다.
1. `<컴포넌트-이름>.component.ts` 라는 이름으로 새 파일을 만듭니다.
1. 이 파일 시작부분에 이런 코드를 추가합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="import">
   </code-example>

1. 그리고 `import` 구문 뒤에 `@Component` 데코레이터를 추가합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator-skeleton">
   </code-example>

1. 컴포넌트에 적용할 CSS 셀렉터를 지정합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="selector">
   </code-example>

   셀렉터에 대해 자세하게 알아보려면 [컴포넌트 셀렉터 지정하기](#specifying-a-components-css-selector) 섹션을 참고하세요.

1. 정보를 표시할 HTML 템플릿을 정의합니다.
일반적으로 템플릿 파일은 별도 HTML 파일로 정의합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="templateUrl">
   </code-example>

   컴포넌트 템플릿에 대해 자세하게 알아보려면 [컴포넌트 템플릿 정의하기](#defining-a-components-template) 섹션을 참고하세요.

1. 컴포넌트 템플릿에 지정될 스타일 파일을 생성합니다.
일마적으로 스타일 파일은 별도 파일로 정의합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator">
   </code-example>

1. 컴포넌트 클래스를 정의하는 `class` 구문을 추가합니다.

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="class">
   </code-example>


{@a specifying-a-components-css-selector}
<!--
## Specifying a component's CSS selector
-->
## 컴포넌트 CSS 셀렉터 지정하기

<!--
Every component requires a CSS _selector_. A selector instructs Angular to instantiate this component wherever it finds the corresponding tag in template HTML. For example, consider a component `hello-world.component.ts` that defines its selector as `app-hello-world`. This selector instructs Angular to instantiate this component any time the tag `<app-hello-world>` appears in a template.

Specify a component's selector by adding a `selector` statement to the `@Component` decorator.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="selector">
</code-example>
-->
Angular는 템플릿 HTML에 사용된 컴포넌트 셀렉터를 기준으로 컴포넌트의 인스턴스를 생성하기 때문에 컴포넌트에 CSS _셀렉터_ 를 지정해야 합니다.
그래서 템플릿에 `hello-world.component.ts` 컴포넌트를 추가하려면 이 컴포넌트의 셀렉터를 `app-hello-world`와 같은 문자열로 지정해야 합니다.
이렇게 지정한 후에는 템플릿에 `<app-hello-world>`라고 사용할 수 있습니다.

컴포넌트 셀렉터를 지정하려면 `@Component` 데코레이터의 `selector` 프로퍼티를 사용하면 됩니다.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="selector">
</code-example>


{@a defining-a-components-template}
<!--
## Defining a component's template
-->
## 컴포넌트 템플릿 정의하기

<!--
A template is a block of HTML that tells Angular how to render the component in your application.
You can define a template for your component in one of two ways: by referencing an external file, or directly within the component.

To define a template as an external file, add a `templateUrl` property to the `@Component` decorator.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="templateUrl">
</code-example>

To define a template within the component, add a `template` property to the `@Component` decorator that contains the HTML you want to use.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.1.ts"
    region="template">
</code-example>

If you want your template to span multiple lines, you can use backticks (<code> ` </code>).
For example:

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.2.ts"
    region="templatebacktick">
</code-example>

<div class="alert is-helpful">

An Angular component requires a template defined using `template` or `templateUrl`. You cannot have both statements in a component.

</div>
-->
템플릿은 컴포넌트가 애플리케이션에 렌더링될 모습을 지정하는 HTML 조각입니다.
템플릿은 컴포넌트 파일에 직접 정의하거나, 별도 파일로 만들고 컴포넌트에 불러오는 방식으로 사용합니다.

템플릿을 별도 파일로 정의하려면 `@Component` 데코레이터의 `templateUrl` 프로퍼티를 지정하면 됩니다.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="templateUrl">
</code-example>

그리고 템플릿을 컴포넌트 파일에 정의하려면 `@Component` 데코레이터의 `template` 프로퍼티에 HTML 문법을 직접 사용하면 됩니다.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.1.ts"
    region="template">
</code-example>

템플릿을 여러 줄에 걸쳐 정의하려면 역따옴표(<code>`</code>)를 사용하면 됩니다:

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.2.ts"
    region="templatebacktick">
</code-example>

<div class="alert is-helpful">

컴포넌트를 정의하려면 `template`이나 `templateUrl` 중 하나는 반드시 정의해야 합니다.
다만, 둘을 동시에 지정할 수는 없습니다.

</div>


<!--
## Declaring a component's styles
-->
## 컴포넌트 스타일 지정하기

<!--
You can declare component styles uses for its template in one of two ways: by referencing an external file, or directly within the component.

To declare the styles for a component in a separate file, add a `styleUrls` property to the `@Component` decorator.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="decorator">
</code-example>

To declare the styles within the component, add a `styles` property to the `@Component` decorator that contains the styles you want to use.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.3.ts"
    region="styles">
</code-example>

The `styles` property takes an array of strings that contain the CSS rule declarations.
-->
템플릿에 적용될 컴포넌트 스타일은 컴포넌트 안에 직접 정의하거나, 별도 파일로 만들고 컴포넌트에 불러오는 방법을 사용합니다.

컴포넌트 스타일을 별도 파일로 정의하려면 `@Component` 데코레이터의 `styleUrls` 프로퍼티를 지정하면 됩니다.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="decorator">
</code-example>

그리고 컴포넌트 안에 스타일을 지정하려면 `@Component` 데코레이터의 `styles` 프로퍼티에 원하는 스타일을 지정하면 됩니다.

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.3.ts"
    region="styles">
</code-example>

`styles` 프로퍼티는 문자열 배열로 지정합니다.


<!--
## Next steps
-->
## 다음 단계

<!--
* For an architectural overview of components, see [Introduction to components and templates](guide/architecture-components).
* For additional options you can use when creating a component, see [Component](api/core/Component) in the API Reference.
* For more information on styling components, see [Component styles](guide/component-styles).
* For more information on templates, see [Template syntax](guide/template-syntax).
-->
* 컴포넌트의 구조에 대해 자세하게 알아보려면 [컴포넌트와 템플릿 소개](guide/architecture-components) 문서를 참고하세요.
* 컴포넌트를 정의할 때 사용할 수 있는 옵션에 대해 알아보려면 [컴포넌트 API 문서](api/core/Component)를 참고하세요.
* 컴포넌트에 스타일을 지정하는 방법에 대해 자세하게 알아보려면 [컴포넌트 스타일](guide/component-styles) 문서를 참고하세요.
* 템플릿에 대해 자세하게 알아보려면 [템플릿 문법](guide/template-syntax) 문서를 참고하세요.

@reviewed 2021-03-18
