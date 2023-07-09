<!--
# The hero editor
-->
# 히어로 에디터

<!--
The application now has a basic title.
Next, create a new component to display hero information and place that component in the application shell.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
이전 튜토리얼에서는 애플리케이션의 제목을 수정해 봤습니다.
이번 튜토리얼에서는 히어로의 정보를 표시하는 컴포넌트를 생성하고 이 컴포넌트를 애플리케이션 셸에 추가해 봅시다.

<div class="alert is-helpful">

  이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Create the heroes component
-->
## 히어로 컴포넌트 생성하기

<!--
Use `ng generate` to create a new component named `heroes`.

<code-example format="shell" language="shell">

ng generate component heroes

</code-example>

`ng generate` creates a new directory , `src/app/heroes/`, and generates the three files of the  `HeroesComponent` along with a test file.

The `HeroesComponent` class file is as follows:

<code-example header="app/heroes/heroes.component.ts (initial version)" path="toh-pt1/src/app/heroes/heroes.component.ts" region="v1"></code-example>

You always import the `Component` symbol from the Angular core library and annotate the component class with `@Component`.

`@Component` is a decorator function that specifies the Angular metadata for the component.

`ng generate` created three metadata properties:

| Properties    | Details |
|:---           |:---     |
| `selector`    | The component's CSS element selector.               |
| `templateUrl` | The location of the component's template file.      |
| `styleUrls`   | The location of the component's private CSS styles. |
-->
`ng generate` 명령을 실행해서 Angular CLI로 `heroes` 컴포넌트를 생성합니다.

<code-example format="shell" language="shell">

ng generate component heroes

</code-example>

`ng generate` 명령을 실행하면 `src/app/heroes/`폴더를 생성하고 `HeroesComponent`를 구성하는 파일 3개와 테스트 파일을 생성합니다.

자동으로 생성된 `HeroesComponent` 클래스 파일의 내용은 다음과 같습니다.

<code-example header="app/heroes/heroes.component.ts (초기 버전)" path="toh-pt1/src/app/heroes/heroes.component.ts" region="v1"></code-example>

Angular 컴포넌트를 선언하려면 반드시 Angular 코어 라이브러리에서 `Component` 심볼을 로드하고 컴포넌트 클래스에 `@Component` 와 같이 지정해야 합니다.

이 때 `@Component`는 클래스에 메타데이터를 지정해서 Angular 컴포넌트로 선언하는 데코레이터 함수입니다.

`ng generate` 명령을 실행하면 기본적으로 3개의 메타데이터 프로퍼티를 생성합니다.

| 프로퍼티          | 설명                  |
|:--------------|:--------------------|
| `selector`    | 컴포넌트의 CSS 엘리먼트 셀럭터  |
| `templateUrl` | 컴포넌트 템플릿 파일의 위치     |
| `styleUrls`   | 컴포넌트 CSS 스타일 파일의 위치 |


<a id="selector"></a>

<!--
The [CSS element selector](https://developer.mozilla.org/docs/Web/CSS/Type_selectors), `'app-heroes'`, matches the name of the HTML element that identifies this component within a parent component's template.

Always `export` the component class so you can `import` it elsewhere &hellip; like in the `AppModule`.
-->
`'app-heroes'`는 [CSS 엘리먼트 셀렉터](https://developer.mozilla.org/docs/Web/CSS/Type_selectors)입니다.
엘리먼트 셀렉터는 DOM 트리에서 이 컴포넌트를 표현하는 이름이며, 부모 컴포넌트의 템플릿에 사용합니다.

`ngOnInit`은 [라이프싸이클 후킹 함수](guide/lifecycle-hooks#oninit) 입니다.
Angular는 컴포넌트를 생성한 직후에 `ngOnInit`를 호출합니다.
그래서 컴포넌트를 초기화하는 로직은 이 메소드에 작성하는 것이 좋습니다.

컴포넌트는 반드시 `export` 해야 `AppModule`와 같은 다른 모듈에서 `import` 할 수 있습니다.


<!--
### Add a `hero` property
-->
### `hero` 프로퍼티 추가하기

<!--
Add a `hero` property to the `HeroesComponent` for a hero named, `Windstorm`.

<code-example header="heroes.component.ts (hero property)" path="toh-pt1/src/app/heroes/heroes.component.ts" region="add-hero"></code-example>
-->
`HeroesComponent`에 `hero` 프로퍼티를 추가하고 이 값을 히어로의 이름 `Windstorm`로 할당하세요.

<code-example header="heroes.component.ts (hero 프로퍼티)" path="toh-pt1/src/app/heroes/heroes.component.ts" region="add-hero"></code-example>


<!--
### Show the hero
-->
### 히어로 표시하기

<!--
Open the `heroes.component.html` template file.
Delete the default text that `ng generate` created and replace it with a data binding to the new `hero` property.

<code-example header="heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="show-hero-1"></code-example>
-->
`heroes.component.html` 템플릿 파일을 엽니다.
이 파일에서 `ng generate` 명령으로 생성된 코드를 삭제하고 `hero` 프로퍼티를 데이터 바인딩하는 코드로 수정합니다.

<code-example header="heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="show-hero-1"></code-example>


<!--
## Show the `HeroesComponent` view
-->
## `HeroesComponent` 뷰 표시하기

<!--
To display the `HeroesComponent`, you must add it to the template of the shell `AppComponent`.

Remember that `app-heroes` is the [element selector](#selector) for the `HeroesComponent`.
Add an `<app-heroes>` element to the `AppComponent` template file, just below the title.

<code-example header="src/app/app.component.html" path="toh-pt1/src/app/app.component.html"></code-example>

If  `ng serve` is still running,
the browser should refresh and display both the application title and the hero's name.
-->
`HeroesComponent`를 표시하려면 이 컴포넌트를 `AppComponent` 셸의 템플릿에 추가해야 합니다.

이전 단계에서 `HeroesComponent`의 [엘리먼트 셀렉터](#selector)는 `app-heroes`로 선언했습니다.
`<app-heroes>` 엘리먼트를 `AppComponent` 템플릿 파일에서 타이틀 바로 밑에 추가하세요.

<code-example header="src/app/app.component.html" path="toh-pt1/src/app/app.component.html"></code-example>

Angular CLI 명령 `ng serve`가 실행되고 있는 상태라면 브라우저는 자동으로 화면을 갱신합니다.
변경된 화면에서 애플리케이션 이름과 히어로 이름이 표시되는 것을 확인해 보세요.


<!--
## Create a `Hero` interface
-->
## `Hero` 인터페이스 생성하기

<!--
A real hero is more than a name.

Create a `Hero` interface in its own file in the `src/app` directory .
Give it `id` and `name` properties.

<code-example path="toh-pt1/src/app/hero.ts"  header="src/app/hero.ts"></code-example>

Return to the `HeroesComponent` class and import the `Hero` interface.

Refactor the component's `hero` property to be of type `Hero`.
Initialize it with an `id` of `1` and the name `Windstorm`.

The revised `HeroesComponent` class file should look like this:

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt1/src/app/heroes/heroes.component.ts"></code-example>

The page no longer displays properly because you changed the hero from a string to an object.
-->
실제 데이터를 생각해보면 히어로를 표현하는 객체는 이름 외에 다른 정보도 있을 수 있습니다.

`src/app`폴더에 `Hero` 인터페이스를 생성하고 이 클래스에 `id`와 `name` 프로퍼티를 추가합니다.

<code-example path="toh-pt1/src/app/hero.ts"  header="src/app/hero.ts"></code-example>

그리고 `HeroesComponent` 클래스로 돌아가서 `Hero` 인터페이스를 로드합니다.

컴포넌트의 `hero`프로퍼티를 `Hero` 타입으로 리팩토링합니다.
이 때 `id`를 `1`로, 이름을 `Windstorm`으로 초기화합니다.

수정된 `HeroesComponent` 클래스 파일은 아래와 같습니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt1/src/app/heroes/heroes.component.ts"></code-example>

이제 화면을 확인해보면 히어로가 제대로 표시되지 않는 것을 확인할 수 있습니다.
왜냐하면 히어로 프로퍼티 값을 문자열 타입에서 객체 타입으로 변경했기 때문입니다.


<!--
## Show the hero object
-->
## 히어로 객체 표시하기

<!--
Update the binding in the template to announce the hero's name and show both `id` and `name` in a details display like this:

<code-example header="heroes.component.html (HeroesComponent template)" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="show-hero-2"></code-example>

The browser refreshes and displays the hero's information.
-->
히어로의 이름이 제대로 표시되도록 템플릿을 수정합시다. 상세정보를 표시하는 레이아웃에 다음과 같이 `id`와 `name`을 바인딩합니다.

<code-example header="heroes.component.html (HeroesComponent 템플릿)" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="show-hero-2"></code-example>

이제 브라우저가 갱신되면 히어로의 정보가 제대로 표시됩니다.


<!--
## Format with the `UppercasePipe`
-->
## `UppercasePipe` 로 표시형식 지정하기

<!--
Edit the `hero.name` binding like this:

<code-example header="src/app/heroes/heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.html" region="pipe"></code-example>

The browser refreshes and now the hero's name is displayed in capital letters.

The word `uppercase` in the interpolation binding after the pipe <code>&verbar;</code> character, activates the built-in `UppercasePipe`.

[Pipes](guide/pipes) are a good way to format strings, currency amounts, dates, and other display data.
Angular ships with several built-in pipes and you can create your own.
-->
다음과 같이 `hero.name` 바인딩 문법을 수정합니다:

<code-example header="src/app/heroes/heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.html" region="pipe"></code-example>

이제 브라우저가 갱신되면 히어로의 이름이 대문자로 표시됩니다.

문자열 바인딩\(interpolation binding\)에서 파이프 연산자 <code>&verbar;</code> 바로 뒤에 있는 `uppercase` 는 Angluar의 기본 파이프인 `UppercasePipe`를 가리킵니다.

[파이프](guide/pipes)는 문자열의 형식을 지정하거나, 통화 단위를 변경하고, 날짜나 데이터가 표시되는 형식을 변경할 때 사용합니다.


<!--
## Edit the hero
-->
## 히어로 정보 수정하기

<!--
Users should be able to edit the hero's name in an `<input>` text box.

The text box should both *display* the hero's `name` property and *update* that property as the user types.
That means data flows from the component class *out to the screen* and from the screen *back to the class*.

To automate that data flow, set up a two-way data binding between the `<input>` form element and the `hero.name` property.
-->
`<input>` 텍스트박스를 사용해서 사용자가 히어로의 이름을 수정하게 하려고 합니다.

텍스트박스는 히어로의 `name` 프로퍼티를 화면에 *표시하면서*, 동시에 유저가 입력한 값으로 프로퍼티를 *업데이트* 해야합니다.
이 말은 데이터가 컴포넌트 클래스에서 *화면으로*, 그리고 반대 방향인 *화면에서* 클래스로 전달되어야 한다는 것을 의미합니다.

이 데이터 흐름을 자동화하려면 `<input>` 엘리먼트와 `hero.name` 프로퍼티를 양방향 바인딩으로 연결하면 됩니다.


<!--
### Two-way binding
-->
### 양방향 바인딩

<!--
Refactor the details area in the `HeroesComponent` template so it looks like this:

<code-example header="src/app/heroes/heroes.component.html (HeroesComponent's template)" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="name-input"></code-example>

`[(ngModel)]` is Angular's two-way data binding syntax.

Here it binds the `hero.name` property to the HTML text box so that data can flow *in both directions*.
Data can flow from the `hero.name` property to the text box and from the text box back to the `hero.name`.
-->
`HeroesComponent` 템플릿에서 상세 화면 영역을 아래 코드와 같이 리팩토링합니다.

<code-example header="src/app/heroes/heroes.component.html (HeroesComponent 템플릿)" path="toh-pt1/src/app/heroes/heroes.component.1.html" region="name-input"></code-example>

`[(ngModel)]` 는 Angular의 양방향 바인딩 문법입니다.

이렇게 작성하면 `hero.name` 프로퍼티가 HTML 텍스트박스와 양방향 바인딩 되기 때문에, `hero.name` 프로퍼티 값이 텍스트 박스로, 텍스트박스의 값이 다시 `hero.name` 프로퍼티로 전달될 수 있습니다.


<!--
### The missing `FormsModule`
-->
### `FormsModule` 을 빠뜨렸습니다.

<!--
Notice that the application stopped working when you added `[(ngModel)]`.

To see the error, open the browser development tools and look in the console
for a message like

<code-example format="output" hideCopy language="shell">

Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.

</code-example>

Although `ngModel` is a valid Angular directive, it isn't available by default.

It belongs to the optional `FormsModule` and you must *opt in* to using it.
-->
하지만 `[(ngModel)]`를 추가했기 때문에 이 앱은 이제 동작하지 않습니다.

이 때 브라우저에서 개발자도구를 열어 콘솔을 확인하면 다음과 같은 에러가 표시되는 것을 확인할 수 있습니다.

<code-example format="output" hideCopy language="shell">

Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.

</code-example>

`ngModel`은 Angular에서 제공하는 디렉티브지만, 아무것도 설정하지 않은 상태에서 이 디렉티브를 바로 사용할 수는 없습니다.

이 디렉티브는 `FormsModule`에서 제공하는 디렉티브이기 때문에 이 디렉티브를 사용하려면 명시적으로 `FormsModule`을 로드해야 합니다.

## `AppModule`

<!--
Angular needs to know how the pieces of your application fit together and what other files and libraries the application requires.
This information is called *metadata*.

Some of the metadata is in the `@Component` decorators that you added to your component classes.
Other critical metadata is in [`@NgModule`](guide/ngmodules) decorators.

The most important `@NgModule` decorator annotates the top-level **AppModule** class.

`ng new` created an `AppModule` class in `src/app/app.module.ts` when it created the project.
This is where you *opt in* to the `FormsModule`.
-->
개발자가 만든 Angular 구성요소나 서드파티 파일, 라이브러리를 Angular가 조합할 때는 이 구성요소들에 대한 정보가 필요합니다.
이런 정보를 *메타데이터 \(metadata\)* 라고 합니다.

컴포넌트 클래스에 지정해야 하는 메타데이터는 `@Component` 데코레이터에 지정합니다.
그리고 애플리케이션 동작에 필요한 메타데이터는 보통 [`@NgModule`](guide/ngmodules) 데코레이터에 지정합니다.

이 중에서 가장 중요한 데코레이터는 애플리케이션 최상위 모듈인 **AppModule** 클래스에 지정하는 `@NgModule` 데코레이터입니다.

Angular CLI로 프로젝트를 생성하면 `src/app/app.module.ts` 파일에 `AppModule` 클래스가 생성됩니다.
`FormsModule`은 이 모듈에 등록합니다.


<!--
### Import `FormsModule`
-->
### `FormsModule` 로드하기

<!--
Open `app.module.ts` and import the `FormsModule` symbol from the `@angular/forms` library.

<code-example path="toh-pt1/src/app/app.module.ts" header="app.module.ts (FormsModule symbol import)"
 region="formsmodule-js-import"></code-example>

Add `FormsModule` to the  `imports` array in `@NgModule`.
The `imports` array contains the list of external modules that the application needs.

<code-example header="app.module.ts (@NgModule imports)" path="toh-pt1/src/app/app.module.ts" region="ng-imports"></code-example>

When the browser refreshes, the application should work again.
You can edit the hero's name and see the changes reflected immediately in the `<h2>` above the text box.
-->
`app.module.ts` 파일을 열고 `@angular/forms` 라이브러리에서 제공하는 `FormsModule` 심볼을 로드합니다.

<code-example path="toh-pt1/src/app/app.module.ts" header="app.module.ts (FormsModule 심볼 로드하기)"
 region="formsmodule-js-import"></code-example>

그리고나서 이 `FormsModule`을 `@NgModule` 메타데이터의 `imports` 배열에 추가합니다. 이 배열에는 애플리케이션이 동작할 때 필요한 외부 모듈을 등록합니다.

<code-example header="app.module.ts (@NgModule 로드하기)" path="toh-pt1/src/app/app.module.ts" region="ng-imports"></code-example>

이제 브라우저를 새로고침하면 앱이 제대로 동작합니다.
화면에서 히어로의 이름을 변경할 수 있으며 이렇게 변경된 이름이 텍스트박스 위에 있는 `<h2>`태그에 바로 반영되는 것도 확인할 수 있습니다.


<!--
### Declare `HeroesComponent`
-->
### `HeroesComponent` 선언하기

<!--
Every component must be declared in *exactly one* [NgModule](guide/ngmodules).

*You* didn't declare the `HeroesComponent`.
Why did the application work?

It worked because the `ng generate` declared `HeroesComponent` in `AppModule` when it created that component.

Open `src/app/app.module.ts` and find `HeroesComponent` imported near the top.

<code-example path="toh-pt1/src/app/app.module.ts" header="src/app/app.module.ts" region="heroes-import" ></code-example>

The `HeroesComponent` is declared in the `@NgModule.declarations` array.

<code-example header="src/app/app.module.ts" path="toh-pt1/src/app/app.module.ts" region="declarations"></code-example>

<div class="alert is-helpful">

`AppModule`  declares both application components, `AppComponent` and `HeroesComponent`.

</div>
-->
컴포넌트는 반드시 [NgModule](guide/ngmodules)중 하나에 등록되어야 합니다.

하지만 `HeroesComponent` 는 어디에도 등록하지 않았습니다.
그런데 왜 애플리케이션이 동작할까요?

이 애플리케이션이 동작하는 이유는 `ng generate` 명령으로 `HeroesComponent`를 생성할 때 Angular CLI가 이 컴포넌트를 `AppModule`에 자동으로 등록했기 때문입니다.

`src/app/app.module.ts` 파일을 열어서 `HeroesComponent`가 로드되는 것을 확인해 보세요.

<code-example path="toh-pt1/src/app/app.module.ts" header="src/app/app.module.ts" region="heroes-import" ></code-example>

이렇게 로드한 컴포넌트는 `HeroesComponent`는 `@NgModule.declarations` 배열에 등록되어 있습니다.

<code-example header="src/app/app.module.ts" path="toh-pt1/src/app/app.module.ts" region="declarations"></code-example>

<div class="alert is-helpful">

이 코드에서 `AppModule`에는 `AppComponent`와 `HeroesComponent`가 등록되어 있습니다.

</div>


<!--
## Final code review
-->
## 최종 코드 리뷰

<!--
Here are the code files discussed on this page.

<code-tabs>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt1/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="src/app/app.module.ts" path="toh-pt1/src/app/app.module.ts"></code-pane>
    <code-pane header="src/app/app.component.ts" path="toh-pt1/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt1/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero.ts" path="toh-pt1/src/app/hero.ts"></code-pane>
</code-tabs>
-->
이번 튜토리얼에서 다룬 코드의 내용을 확인해 보세요.

<code-tabs>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt1/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt1/src/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="src/app/app.module.ts" path="toh-pt1/src/app/app.module.ts"></code-pane>
    <code-pane header="src/app/app.component.ts" path="toh-pt1/src/app/app.component.ts"></code-pane>
    <code-pane header="src/app/app.component.html" path="toh-pt1/src/app/app.component.html"></code-pane>
    <code-pane header="src/app/hero.ts" path="toh-pt1/src/app/hero.ts"></code-pane>
</code-tabs>


<!--
## Summary
-->
## 정리

<!--
*   You used `ng generate` to create a second `HeroesComponent`.
*   You displayed the `HeroesComponent` by adding it to the `AppComponent` shell.
*   You applied the `UppercasePipe` to format the name.
*   You used two-way data binding with the `ngModel` directive.
*   You learned about the `AppModule`.
*   You imported the `FormsModule` in the `AppModule` so that Angular would recognize and apply the `ngModel` directive.
*   You learned the importance of declaring components in the `AppModule`.
-->
*   `ng generate` 명령을 실행해서 두번째 컴포넌트인 `HerosComponent`를 생성했습니다.
*   `HeroesComponent`를 `AppComponent` 셸에 추가해서 화면에 표시했습니다.
*   화면에 표시되는 이름의 형식을 지정하기 위해 `UppercasePipe`를 사용했습니다.
*   `ngModel` 디렉티브를 사용해서 양방향 데이터 바인딩을 연결했습니다.
*   `AppModule`에 대해 알아봤습니다.
*   Angular가 `ngModel` 디렉티브를 제대로 인식하고 동작할 수 있도록 `AppModule`에 `FormsModule`을 로드했습니다.
*   컴포넌트는 반드시 `@NgModule`중 하나에 등록되어야 합니다. 이 때 Angular CLI를 사용하면 더 편합니다.


@reviewed 2022-02-28
