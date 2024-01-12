<!--
# Introduction to components and templates
-->
# 컴포넌트와 템플릿 소개

<!--
A *component* controls a patch of screen called a [*view*](guide/glossary#view "Definition of view"). It consists
of a TypeScript class, an HTML template, and a CSS style sheet. The TypeScript class defines the interaction 
of the HTML template and the rendered DOM structure, while the style sheet describes its appearance.

An Angular application uses individual components to define and control different aspects of the application.
For example, an application could include components to describe:

*   The application root with the navigation links
*   The list of heroes
*   The hero editor

In the following example, the `HeroListComponent` class includes:

* A `heroes` property that holds an array of heroes.
* A `selectedHero` property that holds the last hero selected by the user.
* A `selectHero()` method sets a `selectedHero` property when the user clicks to choose a hero from that list.

The component initializes the `heroes` property by using the `HeroService` service, which is a TypeScript [parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties) on the constructor. Angular's dependency injection system provides the `HeroService` service to the component.

<code-example header="src/app/hero-list.component.ts (class)" path="architecture/src/app/hero-list.component.ts" region="class"></code-example>

Angular creates, updates, and destroys components as the user moves through the application.
Your application can take action at each moment in this lifecycle through optional [lifecycle hooks](guide/lifecycle-hooks), like `ngOnInit()`.
-->
컴포넌트는 [*뷰(view)*](guide/glossary#view "Definition of view")라고 하는 화면 일부를 제어합니다.


A *component* controls a patch of screen called a [*view*](guide/glossary#view "Definition of view").
It consists of a TypeScript class, an HTML template, and a CSS style sheet.
The TypeScript class defines the interaction of the HTML template and the rendered DOM structure, while the style sheet describes its appearance.

An Angular application uses individual components to define and control different aspects of the application.
For example, an application could include components to describe:

*   The application root with the navigation links
*   The list of heroes
*   The hero editor

In the following example, the `HeroListComponent` class includes:

* A `heroes` property that holds an array of heroes.
* A `selectedHero` property that holds the last hero selected by the user.
* A `selectHero()` method sets a `selectedHero` property when the user clicks to choose a hero from that list.

The component initializes the `heroes` property by using the `HeroService` service, which is a TypeScript [parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties) on the constructor. Angular's dependency injection system provides the `HeroService` service to the component.

<code-example header="src/app/hero-list.component.ts (class)" path="architecture/src/app/hero-list.component.ts" region="class"></code-example>

Angular creates, updates, and destroys components as the user moves through the application.
Your application can take action at each moment in this lifecycle through optional [lifecycle hooks](guide/lifecycle-hooks), like `ngOnInit()`.


<a id="component-metadata"></a>
<!--
## Component metadata
-->
## 컴포넌트 메타데이터

<div class="lightbox">

<img alt="Metadata" class="left" src="generated/images/guide/architecture/metadata.png">

</div>

<!--
The `@Component` decorator identifies the class immediately below it as a component class, and specifies its metadata.
In the example code below, you can see that `HeroListComponent` is just a class, with no special Angular notation or syntax at all.
It's not a component until you mark it as one with the `@Component` decorator.

The metadata for a component tells Angular where to get the major building blocks that it needs to create and present the component and its view.
In particular, it associates a *template* with the component, either directly with inline code, or by reference.
Together, the component and its template describe a *view*.

In addition to containing or pointing to the template, the `@Component` metadata configures, for example, how the component can be referenced in HTML and what services it requires.

Here's an example of basic metadata for `HeroListComponent`.

<code-example header="src/app/hero-list.component.ts (metadata)" path="architecture/src/app/hero-list.component.ts" region="metadata"></code-example>

This example shows some of the most useful `@Component` configuration options:

| Configuration options | Details |
|:---                   |:---     |
| `standalone`          | `true` when this is a self-describing, ["Standalone"](guide/standalone-components) component.  If `false` or unspecified, the component must be declared in an [ngModule](guide/ngmodules) which is an older style. Prefer `true` if you can. |
| `selector`            | A CSS selector that tells Angular to create and insert an instance of this component wherever it finds the corresponding tag in template HTML. For example, if an application's HTML contains `<app-hero-list></app-hero-list>`, then Angular inserts an instance of the `HeroListComponent` view between those tags. |
| `templateUrl`         | The relative address of this component's HTML template. Alternatively, you can provide the HTML template inline, as the value of the `template` property. This template defines the component's *host view*.                                                                                                  |
| `imports`             | An array of the components, directives, and packages that your template references. Essential for "Standalone" components.                                                                  |
| `providers`           | An array of [providers](guide/glossary#provider) for services that the component requires. In the example, this tells Angular how to provide the `HeroService` instance that the component's constructor uses to get the list of heroes to display.                                                                   |
-->
Angular 컴포넌트는 컴포넌트 클래스에 `@Component` 데코레이터를 붙여서 정의하며, 이 때 데코레이터 함수에 컴포넌트의 특성을 정의하는 메타데이터를 함께 전달합니다.
아래 코드를 보면, `HeroListComponent`는 단순한 클래스이며 Angular에만 사용하는 문법은 아무것도 없는 것을 확인할 수 있습니다.
`@Component` 데코레이터를 붙이기 전까지 이 클래스는 컴포넌트로 등록되지도 않습니다.

컴포넌트 메타데이터는 이 컴포넌트가 Angular의 구성요소로써 어떻게 생성되고 어떤 뷰를 정의하며 동작할지 정의합니다.
좀 더 자세하게 이야기하면, *뷰* 는 컴포넌트 메타데이터에서 지정하는 외부 *템플릿* 파일이나 인라인 템플릿이 컴포넌트 코드와 연결되면서 정의됩니다.

템플릿을 외부 파일에서 불러올지 컴포넌트 안에 포함시킬지는 `@Component` 메타데이터 설정에 의해 결정됩니다.
그리고 의존성으로 주입받아야 하는 서비스가 있다면 이 내용도 메타데이터에 지정할 수 있습니다.

`HeroListComponent`에 사용된 메타데이터를 간단하게 살펴봅시다:

<code-example header="src/app/hero-list.component.ts (메타데이터)" path="architecture/src/app/hero-list.component.ts" region="metadata"></code-example>

이 예제에 사용된 `@Component` 데코레이터의 메타데이터는 다른 컴포넌트에서도 많이 사용합니다:


| 설정 옵션         | 설명                                                                                                                                                                                          |
|:--------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `standalone`  | `true` 라고 지정하면, ["단독"](guide/standalone-components) 컴포넌트라는 것을 의미합니다. `false` 값을 지정하거나 지정하지 않으면 이 컴포넌트가 어떤 [ngModule](guide/ngmodules) 안에 등록된다는 것을 의미합니다. 이 방식은 예전 방식이기 때문에 `true` 값을 권장합니다. |
| `selector`    | 컴포넌트 인스턴스가 DOM 트리의 어떤 자리에 위치할지 CSS 셀렉터로 지정합니다. 위 코드에서는 HTML 문서의 `<app-hero-list></app-hero-list>`라고 작성한 위치에 `HeroListComponent`의 인스턴스가 생성되며, 이 엘리먼트가 `HeroListComponent`의 뷰로 대체됩니다.         |
| `templateUrl` | 컴포넌트의 HTML 템플릿을 외부 파일에 정의할 때, 이 템플릿 파일의 위치를 지정합니다. 템플릿을 인라인으로 구성하려면 이 프로퍼티 대신 `template` 프로퍼티를 사용하면 됩니다. 템플릿은 컴포넌트의 *호스트 뷰* 를 정의합니다.                                                        |
| `imports`     | 템플릿에서 컴포넌트, 디렉티브, 기타 패키지를 활용한다면 로드합니다. "단독" 컴포넌트라면 꼭 지정해야 합니다.                                                                                                                              |
| `providers`   | 컴포넌트가 생성될 때 의존성으로 주입되는 서비스의 [프로바이더](guide/glossary#provider)를 지정합니다. 위 코드에서는 화면에 표시할 히어로의 목록을 가져오기 위해 생성자에서 `HeroService`를 의존성으로 주입받는데, 이 `HeroService`의 인스턴스를 어떻게 받아올지 지정합니다.              |


<a id="templates-and-views"></a>
<!--
## Templates and views
-->
## 템플릿과 뷰

<div class="lightbox">

<img alt="Template" class="left" src="generated/images/guide/architecture/template.png">

</div>

<!--
You define a component's view with its companion template.
A template is a form of HTML that tells Angular how to render the component.

Views are typically organized hierarchically, allowing you to modify or show and hide entire UI sections or pages as a unit.
The template immediately associated with a component defines that component's *host view*.
The component can also define a *view hierarchy*, which contains *embedded views*, hosted by other components.
-->
컴포넌트의 뷰는 템플릿으로 정의하며, 템플릿이 화면에 렌더링되는 모양은 HTML 형식으로 정의합니다.

뷰는 보통 계층적으로 구성하며, 개발자가 원하는 대로 일부 영역만 조작하거나 화면에서 숨기거나 보이게 할 수 있습니다.
그리고 템플릿은 컴포넌트의 최상위 뷰인 *호스트 뷰* 에서 시작하기 때문에, 이 뷰 안에서 *또다른 뷰 계층* 을 구성하거나 다른 컴포넌트의 뷰를 포함시킬 수도 있습니다.

<div class="lightbox">

<img alt="Component tree" class="left" src="generated/images/guide/architecture/component-tree.png">

</div>


<a id="template-syntax"></a>

<!--
## Template syntax
-->
## 템플릿 문법

<!--
A template looks like regular HTML, except that it also contains Angular [template syntax](guide/template-syntax), which alters the HTML based on your application's logic and the state of application and DOM data.
Your template can use *data binding* to coordinate the application and DOM data, *pipes* to transform data before it is displayed, and *directives* to apply application logic to what gets displayed.

For example, here is a template for the Tutorial's `HeroListComponent`.

<code-example header="src/app/hero-list.component.html" path="architecture/src/app/hero-list.component.html" ></code-example>

This template uses typical HTML elements like `<h2>` and  `<p>`. It also includes Angular template-syntax elements, `*ngFor`, `{{hero.name}}`, `(click)`, `[hero]`, and `<app-hero-detail>`.
The template-syntax elements tell Angular how to render the HTML to the screen, using program logic and data.

*   The `*ngFor` directive tells Angular to iterate over a list
*   `{{hero.name}}`, `(click)`, and `[hero]` bind program data to and from the DOM, responding to user input.
    See more about [data binding](#data-binding) below.

*   The `<app-hero-detail>` element tag in the example represents a new component, `HeroDetailComponent`.
    The `HeroDetailComponent`  defines the `hero-detail` portion of the rendered DOM structure specified by the `HeroListComponent` component.

    Notice how these custom components mix with native HTML.
-->
템플릿은 자주 사용하는 HTML 문법과 비슷하며, 여기에 Angular가 제공하는 [템플릿 문법](guide/template-syntax)을 사용할 수 있습니다.
템플릿 문법은 애플리케이션이나 DOM 데이터에 따라 HTML을 조작하면서 뷰를 원하는대로 표시합니다.
그리고 템플릿은 애플리케이션 데이터나 DOM 데이터를 *데이터 바인딩* 해서 표시할 수 있고, 이 때 *파이프* 를 사용해서 원하는 형식으로 표현할 수도 있으며, *디렉티브* 를 활용해서 간단한 로직을 더할수도 있습니다.

예를 들어 튜토리얼에서 살펴봤던 `HeroListComponent`의 템플릿은 다음과 같이 정의되어 있습니다:

<code-example header="src/app/hero-list.component.html" path="architecture/src/app/hero-list.component.html" ></code-example>

이 템플릿에는 일반적으로 HTML 문서에 사용되는 `<h2>`나 `<p>` 엘리먼트가 사용되었으며, `*ngFor`나 `{{hero.name}}`, `(click)`, `[hero]`, `<app-hero-detail>`와 같은 문법은 Angular의 템플릿 문법을 활용한 것입니다.
템플릿 문법을 사용하면 HTML를 화면에 렌더링할 때 애플리케이션의 로직이나 데이터를 활용할 수 있습니다.

*   `*ngFor` 디렉티브를 활용하면 템플릿에서 배열을 순회할 수 있습니다.
*   `{{hero.name}}`, `(click)`, `[hero]`와 같은 문법은 애플리케이션 데이터나 사용자의 동작을 DOM과 연결하는 문법입니다.
    이 내용은 아래 [데이터 바인딩](#데이터-바인딩)에서 자세하게 알아봅니다.

*   `<app-hero-detail>` 태그는 Angular로 만든 `HeroDetailComponent`를 표현하는 엘리먼트입니다.
    이 코드에는 표시되지 않았지만 `HeroDetailComponent`는 `HeroListComponent`의 자식 컴포넌트이며, 선택된 히어로의 상세 정보를 화면에 표시합니다.

    이렇듯, Angular로 만든 커스텀 컴포넌트는 네이티브 HTML와 자연스럽게 어울립니다.


<a id="data-binding"></a>

<!--
### Data binding
-->
### 데이터 바인딩

<!--
Without a framework, you would be responsible for pushing data values into the HTML controls and turning user responses into actions and value updates.
Writing such push and pull logic by hand is tedious, error-prone, and a nightmare to read, as any experienced front-end JavaScript programmer can attest.

Angular supports *two-way data binding*, a mechanism for coordinating the parts of a template with the parts of a component.
Add binding markup to the template HTML to tell Angular how to connect both sides.

The following diagram shows the four forms of data binding markup.
Each form has a direction: to the DOM, from the DOM, or both.

<div class="lightbox">

<img alt="Data Binding" class="left" src="generated/images/guide/architecture/databinding.png">

</div>

This example from the `HeroListComponent` template uses three of these forms.

<code-example header="src/app/hero-list.component.html (binding)" path="architecture/src/app/hero-list.component.1.html" region="binding"></code-example>

| Data bindings                                                            | Details |
|:---                                                                      |:---     |
| `[hero]` [property binding](guide/property-binding)                      | Passes the value of `selectedHero` from the parent `HeroListComponent` to the `hero` property of the child `HeroDetailComponent`. |
| `(click)` [event binding](guide/user-input#binding-to-user-input-events) | Calls the component's `selectHero` method when the user clicks a hero's name.                                                     |
| `{{hero.name}}` [interpolation](guide/interpolation)                     | Displays the component's `hero.name` property value within the `<button>` element.                                                |

Two-way data binding \(used mainly in [template-driven forms](guide/forms)\) combines property and event binding in a single notation.
Here's an example from the `HeroDetailComponent` template that uses two-way data binding with the `ngModel` directive.

<code-example header="src/app/hero-detail.component.html (ngModel)" path="architecture/src/app/hero-detail.component.html" region="ngModel"></code-example>

In two-way binding, a data property value flows to the input box from the component as with property binding.
The user's changes also flow back to the component, resetting the property to the latest value, as with event binding.

Angular processes *all* data bindings once for each JavaScript event cycle, from the root of the application component tree through all child components.

<div class="lightbox">

<img alt="Data Binding" class="left" src="generated/images/guide/architecture/component-databinding.png">

</div>

Data binding plays an important role in communication between a template and its component, and is also important for communication between parent and child components.

<div class="lightbox">

<img alt="Parent/Child binding" class="left" src="generated/images/guide/architecture/parent-child-binding.png">

</div>
-->
프레임워크를 사용하지 않는다면 컴포넌트 값이 변경됐을 때 필요한 동작을 직접 구현해야 합니다.
하지만 모든 값을 추적하면서 에러 처리 로직까지 일일이 작성하는 것은 너무나 번거로운 작업이고, 이 과정에서 또 다른 실수가 발생할 수도 있습니다.
JavaScript를 사용해봤다면 이 말이 어떤 의미인지 좀 더 이해하기 쉬울 것입니다.

Angular에는 템플릿과 컴포넌트를 간편하게 연결하는 **데이터 바인딩** 기능이 있습니다.
템플릿 HTML에 어떤 항목을 바인딩하겠다고 선언하면, Angular가 해당 항목을 자동으로 처리합니다.

아래 그림을 보면서 4가지 종류의 바인딩 마크업을 확인해 보세요.
바인딩에는 방향이 있는데, DOM으로 향하거나, DOM에서 발생하거나, 양방향으로 전달됩니다.

<div class="lightbox">

<img alt="Data Binding" class="left" src="generated/images/guide/architecture/databinding.png">

</div>

아래 `HeroListComponent` 템플릿에는 3가지 종류의 데이터 바인딩이 사용되었습니다.

<code-example header="src/app/hero-list.component.html (바인딩)" path="architecture/src/app/hero-list.component.1.html" region="binding"></code-example>

| 데이터 바인딩                                                            | 설명                                                                                                |
|:-------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `[hero]` [프로퍼티 바인딩](guide/property-binding)                        | 부모 컴포넌트 `HeroListComponent`의 `selectedHero` 값을 자식 컴포넌트 `HeroDetailComponent`의 `hero` 프로퍼티로 전달합니다. |
| `(click)` [이벤트 바인딩](guide/user-input#binding-to-user-input-events) | 사용자가 히어로 이름을 클릭하면 컴포넌트의 `selectHero` 메서드를 실행합니다.                                                  |
| `{{hero.name}}` [문자열 바인딩](guide/interpolation)                     | 컴포넌트의 `hero.name` 프로퍼티 값을 `<button>` 엘리먼트 안에 표시합니다.                                               |

Two-way data binding \(used mainly in [template-driven forms](guide/forms)\) combines property and event binding in a single notation.
Here's an example from the `HeroDetailComponent` template that uses two-way data binding with the `ngModel` directive.

<code-example header="src/app/hero-detail.component.html (ngModel)" path="architecture/src/app/hero-detail.component.html" region="ngModel"></code-example>

양방향 바인딩을 사용하면 컴포넌트의 프로퍼티 값이 프로퍼티 바인딩 된 것처럼 화면의 입력 컨트롤에 반영됩니다.
그리고 사용자가 입력 컨트롤의 값을 변경하면 변경된 값이 이벤트 바인딩 된 것처럼 컴포넌트의 프로퍼티 값을 갱신합니다.

이 과정은 JavaScript 이벤트 싸이클이 실행될 때마다 애플리케이션 최상위 컴포넌트부터 트리를 따라 자식 컴포넌트를 순회하면서 Angular가 자동으로 처리합니다.

<div class="lightbox">

<img alt="Data Binding" class="left" src="generated/images/guide/architecture/component-databinding.png">

</div>

데이터 바인딩은 템플릿과 컴포넌트 사이에 데이터를 주고 받을 때 사용하며, 부모 컴포넌트와 자식 컴포넌트 사이에 데이터를 주고 받을 때도 사용하기 때문에 아주 중요합니다.

<div class="lightbox">

<img alt="Parent/Child binding" class="left" src="generated/images/guide/architecture/parent-child-binding.png">

</div>


<a id="pipes"></a>
<!--
### Pipes
-->
### 파이프

<!--
Angular pipes let you declare display-value transformations in your template HTML.
A class with the `@Pipe` decorator defines a function that transforms input values to output values for display in a view.

Angular defines various pipes, such as the [date](api/common/DatePipe) pipe and [currency](api/common/CurrencyPipe) pipe. For a complete list, see the [Pipes API list](api?type=pipe).
You can also define new pipes.

To specify a value transformation in an HTML template, use the [pipe operator (`|`)](guide/pipes-overview).

<code-example format="html" language="html">

{{interpolated_value &verbar; pipe_name}}

</code-example>

You can chain pipes, sending the output of one pipe function to be transformed by another pipe function.
A pipe can also take arguments that control how it performs its transformation.
For example, you can pass the desired format to the `date` pipe.

<code-example format="html" language="html">

&lt;!-- Default format: output 'Jun 15, 2015'--&gt;
&lt;p&gt;Today is {{today &verbar; date}}&lt;/p&gt;

&lt;!-- fullDate format: output 'Monday, June 15, 2015'--&gt;
&lt;p&gt;The date is {{today &verbar; date:'fullDate'}}&lt;/p&gt;

&lt;!-- shortTime format: output '9:43 AM'--&gt;
&lt;p&gt;The time is {{today &verbar; date:'shortTime'}}&lt;/p&gt;

</code-example>
-->
파이프를 사용하면 애플리케이션 데이터가 템플릿 HTML에 표시될 때 원하는 형식을 지정할 수 있습니다.
파이프는 원래값을 입력받고 새로운 형식의 값을 반환하는 함수에 `@Pipe` 데코레이터를 사용해서 Angular에 등록합니다.

Angular는 여러가지 파이프를 기본으로 제공하는데, 이 중 [날짜](api/common/DatePipe) 파이프와 [통화](api/common/CurrencyPipe) 파이프는 자주 사용하게 될 것입니다.
Angular에서 제공하는 파이프 목록을 확인하려면 [파이프 API 목록](api?type=pipe) 문서를 참고하세요.
필요하다면 파이프를 새로 정의해서 사용할 수도 있습니다.

HTML 템플릿에 파이프를 적용할 때는 [파이프 연산자 (|)](guide/pipes-overview)를 다음과 같이 사용합니다:

<code-example format="html" language="html">

{{변환할_값 &verbar; 파이프_이름}}

</code-example>

한 파이프의 결과는 다른 파이프로 전달하면서 체이닝할 수도 있습니다.
그리고 파이프의 동작을 구체적으로 지정하기 위해 인자를 전달할 수도 있는데, 예를 들어 `date` 파이프는 다음과 같이 다양한 방식으로 활용할 수 있습니다.

<code-example format="html" language="html">

&lt;!-- 기본 형식: output 'Jun 15, 2015'--&gt;
&lt;p&gt;Today is {{today &verbar; date}}&lt;/p&gt;

&lt;!-- fullDate 형식: output 'Monday, June 15, 2015'--&gt;
&lt;p&gt;The date is {{today &verbar; date:'fullDate'}}&lt;/p&gt;

&lt;!-- shortTime 형식: output '9:43 AM'--&gt;
&lt;p&gt;The time is {{today &verbar; date:'shortTime'}}&lt;/p&gt;

</code-example>


<a id="directives"></a>
<!--
### Directives
-->
### 디렉티브

<div class="lightbox">

<img alt="Directives" class="left" src="generated/images/guide/architecture/directive.png">

</div>

<!--
Angular templates are *dynamic*.
When Angular renders them, it transforms the DOM according to the instructions given by *directives*.
A directive is a class with a `@Directive()` decorator.

A component is technically a directive.
However, components are so distinctive and central to Angular applications that Angular defines the `@Component()` decorator, which extends the `@Directive()` decorator with template-oriented features.

In addition to components, there are two other kinds of directives: *structural* and *attribute*.
Angular defines a number of directives of both kinds, and you can define your own using the  `@Directive()` decorator.

Just as for components, the metadata for a directive associates the decorated class with a `selector` element that you use to insert it into HTML.
In templates, directives typically appear within an element tag as attributes, either by name or as the target of an assignment or a binding.
-->
Angular의 템플릿은 *동적*입니다.
템플릿이 렌더링 될 때 *디렉티브*가 있으면 DOM의 모양을 디렉티브의 로직에 따라 변형시키며, 디렉티브는 클래스에 `@Directive()` 데코레이터를 사용해서 정의합니다.

컴포넌트도 문법적으로는 디렉티브의 한 종류입니다.
하지만 컴포넌트는 Angular 애플리케이션의 구성요소로써 중요한 역할을 하기 때문에, `@Directive()` 데코레이터에 템플릿 관련 기능을 추가한 `@Component()` 데코레이터를 대신 사용합니다.

컴포넌트의 일반적인 내용 외에, 디렉티브는 *구조* 디렉티브와 *어트리뷰트* 디렉티브로 나뉘어 집니다.
Angular 프레임워크는 종류에 관계없이 자유롭게 사용할 수 있는 디렉티브를 방대하게 제공하며, 필요하다면 `@Directive()` 데코레이터로 커스텀 디렉티브를 정의할 수도 있습니다.

그리고 컴포넌트와 비슷하게 디렉티브도 데코레이터에 지정하는 메타데이터로 클래스의 동작을 변형시킵니다.
예를 들면 디렉티브를 HTML 엘리먼트에 적용할 때 사용하는 `selector`를 지정하는 것도 메타데이터가 하는 역할 중 하나 입니다.
디렉티브를 엘리먼트에 적용하면 템플릿이 렌더링 됐을 때 엘리먼트의 어트리뷰트처럼 표현되며, 이 어트리뷰트에 템플릿 표현식을 연결하거나 데이터를 바인딩할 수 있습니다.


<!--
#### Structural directives
-->
#### 구조 디렉티브

<!--
*Structural directives* alter layout by adding, removing, and replacing elements in the DOM.
The example template uses two built-in structural directives to add application logic to how the view is rendered.

<code-example header="src/app/hero-list.component.html (structural)" path="architecture/src/app/hero-list.component.1.html" region="structural"></code-example>

| Directives                                  | Details |
|:---                                         |:---     |
| [`*ngFor`](guide/built-in-directives#ngFor) | An *iterative*, which tells Angular to create one `<li>` per hero in the `heroes` list. |
| [`*ngIf`](guide/built-in-directives#ngIf)   | A *conditional*, which includes the `HeroDetail` component only if a selected hero exists. |
-->
구조 디렉티브는 DOM 엘리먼트를 추가하거나 제거, 치환하는 용도로 사용합니다.
Angular가 제공하는 구조 디렉티브를 템플릿에 사용하는 예제 코드를 확인해 보세요:

<code-example header="src/app/hero-list.component.html (구조 디렉티브)" path="architecture/src/app/hero-list.component.1.html" region="structural"></code-example>

| 디렉티브                                        | 설명                                                              |
|:--------------------------------------------|:----------------------------------------------------------------|
| [`*ngFor`](guide/built-in-directives#ngFor) | 배열을 순회합니다. 위 예제 코드에서는 `heroes` 배열에 있는 히어로마다 `<li>` 엘리먼트를 생성합니다. |
| [`*ngIf`](guide/built-in-directives#ngIf)   | 조건을 판단합니다. `HeroDetail` 컴포넌트는 히어로가 선택되었을 때만 표시됩니다.              |

<!--
#### Attribute directives
-->
#### 어트리뷰트 디렉티브

<!--
*Attribute directives* alter the appearance or behavior of an existing element.
In templates they look like regular HTML attributes, hence the name.

The `ngModel` directive, which implements two-way data binding, is an example of an attribute directive.
`ngModel` modifies the behavior of an existing element \(typically `<input>`\) by setting its display value property and responding to change events.

<code-example header="src/app/hero-detail.component.html (ngModel)" path="architecture/src/app/hero-detail.component.html" region="ngModel"></code-example>

Angular includes pre-defined directives that change: 

* The layout structure, such as [ngSwitch](guide/built-in-directives#ngSwitch), and
* Aspects of DOM elements and components, such as [ngStyle](guide/built-in-directives#ngstyle) and [ngClass](guide/built-in-directives#ngClass).

<div class="alert is-helpful">

Learn more in the [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives) guides.

</div>
-->
*어트리뷰트 디렉티브*는 이미 존재하는 엘리먼트의 모양이나 동작을 변형합니다.
이때 템플릿에서 보통 HTML 어트리뷰트처럼 보이기 때문에 자연스럽게 어트리뷰트 디렉티브라는 이름으로 사용합니다.

`ngModel` 디렉티브는 양방향 바인딩에 사용되며, 어트리뷰트 디렉티브의 한 종류입니다.
`ngModel` 디렉티브는 일반적으로 `<input>`과 같은 입력 필드의 동작을 변형시켜 컴포넌트 프로퍼티의 값을 화면에 표시하거나 값이 변경되는 이벤트에 반응합니다.

<code-example header="src/app/hero-detail.component.html (ngModel)" path="architecture/src/app/hero-detail.component.html" region="ngModel"></code-example>

이 외에도:

* [ngSwitch](guide/built-in-directives#ngSwitch)와 같이 레이아웃 구조를 조작하는 디렉티브가 있고
* 컴포넌트에 스타일이나 지정하는 [ngStyle](guide/built-in-directives#ngstyle), 컴포넌트에 CSS 스타일을 지정하는 [ngClass](guide/built-in-directives#ngClass)도 있습니다.

<div class="alert is-helpful">

자세한 내용은 [어트리뷰트 디렉티브](guide/attribute-directives)와 [구조 디렉티브](guide/structural-directives) 가이드 문서를 확인해 보세요.

</div>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-09-25
