<!--
# Display a selection list
-->
# 목록 표시하기

<!--
In this page, you'll expand the Tour of Heroes application to display a list of heroes, and allow users to select a hero and display the hero's details.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
이번 튜토리얼에서는 히어로의 목록을 화면에 표시하고, 이 중에서 히어로 하나를 선택해서 상세 정보를  표시하도록 히어로들의 여행 앱을 수정해 봅시다.

<div class="alert is-helpful">

이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Create mock heroes
-->
## 히어로 목(mock) 생성하기

<!--
You'll need some heroes to display.

Eventually you'll get them from a remote data server.
For now, you'll create some *mock heroes* and pretend they came from the server.

Create a file called `mock-heroes.ts` in the `src/app/` folder.
Define a `HEROES` constant as an array of ten heroes and export it.
The file should look like this.

<code-example header="src/app/mock-heroes.ts" path="toh-pt2/src/app/mock-heroes.ts"></code-example>
-->
먼저, 히어로의 목록을 화면에 표시할 때 사용할 히어로 데이터가 필요합니다.

최종적으로는 리모트 데이터 서버에서 데이터를 받아올 것입니다.
하지만 지금은 *히어로 목* 을 생성하고 이 데이터들을 서버에서 받아온 것으로 간주합시다.

`src/app/`에 `mock-heroes.ts`파일을 생성합니다.
이 파일에 `HEROES` 배열을 상수로 선언하고 다른 파일에서 참조할 수 있도록 파일 외부로 공개할 것입니다.
파일의 내용은 다음과 같이 작성합니다.

<code-example header="src/app/mock-heroes.ts" path="toh-pt2/src/app/mock-heroes.ts"></code-example>


<!--
## Displaying heroes
-->
## 히어로 표시하기

<!--
Open the `HeroesComponent` class file and import the mock `HEROES`.

<code-example header="src/app/heroes/heroes.component.ts (import HEROES)" path="toh-pt2/src/app/heroes/heroes.component.ts" region="import-heroes"></code-example>

In the same file \(`HeroesComponent` class\), define a component property called `heroes` to expose the `HEROES` array for binding.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt2/src/app/heroes/heroes.component.ts" region="component"></code-example>
-->
`HeroesComponent` 클래스 파일을 열고 `HEROES` 목 데이터를 로드합니다.

<code-example header="src/app/heroes/heroes.component.ts (HEROES 로드하기)" path="toh-pt2/src/app/heroes/heroes.component.ts" region="import-heroes"></code-example>

그리고 클래스에 `heroes` 프로퍼티를 선언하고 위에서 로드한 `HEROES` 배열을 바인딩합니다.

<code-example header="src/app/heroes/heroes.component.ts" path="toh-pt2/src/app/heroes/heroes.component.ts" region="component"></code-example>


<!--
### List heroes with `*ngFor`
-->
### `*ngFor` 로 히어로 목록 표시하기

<!--
Open the `HeroesComponent` template file and make the following changes:

1.  Add an `<h2>` at the top.
1.  Below it add an HTML unordered list \(`<ul>`\) element.
1.  Insert an `<li>` within the `<ul>`.
1.  Place a `<button>` inside the `<li>` that displays properties of a `hero` inside `<span>` elements.
1.  Sprinkle some CSS classes for styling \(you'll add the CSS styles shortly\).

Make it look like this:

<code-example header="heroes.component.html (heroes template)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="list"></code-example>

That displays an error since the property 'hero' does not exist.
To have access to each individual hero and list them all, add an `*ngFor` to the `<li>` to iterate through the list of heroes:

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="li"></code-example>

The [`*ngFor`](guide/built-in-directives#ngFor) is Angular's *repeater* directive.
It repeats the host element for each element in a list.

The syntax in this example is as follows:

| Syntax   | Details |
|:---      |:---     |
| `<li>`   | The host element.                                                                  |
| `heroes` | Holds the mock heroes list from the `HeroesComponent` class, the mock heroes list. |
| `hero`   | Holds the current hero object for each iteration through the list.                 |

<div class="alert is-important">

Don't forget the asterisk \(`*`\) character in front of `ngFor`.
It's a critical part of the syntax.

</div>

After the browser refreshes, the list of heroes appears.

<div class="callout is-helpful">

<header>Interactive elements</header>

**NOTE**: <br />
Inside the `<li>` element, we've wrapped the hero's details in a `<button>` element. Later on we make the hero clickable, and it is better for accessibility purposes to use natively interactive HTML elements (e.g. `<button>`) instead of adding event listeners to non-interactive ones (e.g. `<li>`).

For more details on accessibility, see [Accessibility in Angular](guide/accessibility).

</div>
-->
`HeroesComponent` 템플릿 파일을 열고 다음과 같이 수정합니다:

1.  제일 위에 `<h2>`를 추가합니다.
1.  그 밑에 순서 없는 목록 HTML 태그\(`<ul>`\)를 추가합니다.
1.  `<ul>`태그 사이에 `<li>`를 추가해서 `hero`의 프로퍼티를 표시합니다.
1.  `<li>` 엘리먼트 안에 `<button>` 엘리먼트를 추가하고, 그 안에 `hero`의 정보를 표시하는 `<span>` 엘리먼트를 추가합니다.
1.  스타일을 지정하기 위해 CSS 클래스를 추가합니다. \(CSS 스타일은 조금 뒤에 추가합니다.\)

그러면 다음과 같은 템플릿이 구성됩니다:

<code-example header="heroes.component.html (히어로 목록 템플릿)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="list"></code-example>

그런데 이 때 `hero` 프로퍼티가 존재하지 않기 때문에 에러가 발생합니다.
목록을 순회하면서 반복되는 개별 히어로 객체에 접근하려면 `<li>` 엘리먼트에 `*ngFor`를 추가하면 됩니다.

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="li"></code-example>

[`*ngFor`](guide/built-in-directives#ngFor)는 _항목을 반복하는_ Angular 디렉티브입니다.
이 디렉티브는 목록에 있는 항목마다 호스트 엘리먼트를 반복합니다.

이 예제에서

| 문법       | 설명                                        |
|:---------|:------------------------------------------|
| `<li>`   | 호스트 엘리먼트                                  |
| `heroes` | `HeroComponent` 클래스에서 히어로 목록을 담는 프로퍼티입니다. |
| `hero`   | 목록을 순회할 때마다 할당되는 히어로 객체입니다.               |

<div class="alert is-important">

`ngFor`앞에 별표\(`*`\)가 붙는 것에 주의하세요.
아주 중요한 문법입니다.

</div>

이제 브라우저가 갱신되면 히어로의 목록이 화면에 표시됩니다.

<div class="callout is-helpful">

<header>반응용 엘리먼트</header>

**참고**: <br />
`<li>` 엘리먼트 안에는 히어로의 정보를 표시하기 위해 `<button>` 엘리먼트를 추가했습니다. 이후에는 접근성을 높이기 위해 버튼을 클릭하는 용도로 활용할 것입니다.

자세한 내용은 [접근성](guide/accessibility) 문서를 참고하세요.

</div>


<a id="styles"></a>

<!--
### Style the heroes
-->
### 스타일 꾸미기

<!--
The heroes list should be attractive and should respond visually when users
hover over and select a hero from the list.

In the [first tutorial](tutorial/toh-pt0#app-wide-styles), you set the basic styles for the entire application in `styles.css`.
That stylesheet didn't include styles for this list of heroes.

You could add more styles to `styles.css` and keep growing that stylesheet as you add components.

You may prefer instead to define private styles for a specific component and keep everything a component needs &mdash;the code, the HTML, and the CSS&mdash; together in one place.

This approach makes it easier to re-use the component somewhere else and deliver the component's intended appearance even if the global styles are different.

You define private styles either inline in the `@Component.styles` array or as stylesheet file(s) identified in the `@Component.styleUrls` array.

When the CLI generated the `HeroesComponent`, it created an empty `heroes.component.css` stylesheet for the `HeroesComponent` and pointed to it in `@Component.styleUrls` like this.

<code-example header="src/app/heroes/heroes.component.ts (@Component)" path="toh-pt2/src/app/heroes/heroes.component.ts" region="metadata"></code-example>

Open the `heroes.component.css` file and paste in the private CSS styles for the `HeroesComponent`.
You'll find them in the [final code review](#final-code-review) at the bottom of this guide.

<div class="alert is-important">

Styles and stylesheets identified in `@Component` metadata are scoped to that specific component.
The `heroes.component.css` styles apply only to the `HeroesComponent` and don't affect the outer HTML or the HTML in any other component.

</div>
-->
히어로 목록은 보기 좋게 표시하는 것이 좋으며, 사용자가 어떤 항목에 마우스를 올리거나 선택하면 시각적인 반응을 보여주는 것도 좋습니다.

[첫번째 튜토리얼](tutorial/toh-pt0#app-wide-styles)에서는 `styles.css` 파일에 애플리케이션 전역 스타일을 지정했습니다.
하지만 이 스타일시트에는 히어로의 목록을 꾸미는 스타일이 존재하지 않습니다.

이 때 `styles.css`에 더 많은 스타일을 추가할 수도 있지만, 이렇게 작성하면 컴포넌트를 추가할때마다 스타일시트의 내용이 점점 많아집니다.

이 방식보다는 컴포넌트와 관련된 파일&mdash; 클래스 코드, HTML, CSS &mdash;을 한 곳에서 관리하면서 특정 컴포넌트에 해당하는 스타일만 따로 정의하는 것이 더 좋습니다.

이렇게 구현하면 컴포넌트를 재사용하기 편해지며 전역 스타일이 변경되더라도 컴포넌트 스타일에 영향을 주지 않습니다.

컴포넌트에 적용되는 스타일은 `@Component.styles` 배열에서 인라인으로 정의할 수 있고, 여러 파일에 작성하고 `@Component.styleUrls` 배열로 지정할 수도 있습니다.

Angular CLI로 `HeroesComponent`를 생성하면 이 컴포넌트에 스타일을 지정하는 `heroes.component.css` 파일을 자동으로 생성하고 `@Component.styleUrls` 목록에 추가합니다.

<code-example header="src/app/heroes/heroes.component.ts (@Component)" path="toh-pt2/src/app/heroes/heroes.component.ts" region="metadata"></code-example>

그러면 `heroes.component.css` 파일을 열어서 `HeroesComponent`에 적용되는 CSS 스타일을 작성할 수 있습니다.
지금은 이 코드를 생략합니다. 이 파일의 내용은 이 문서의 아래쪽 [최종코드 리뷰](#final-code-review)에서 확인할 수 있습니다.

<div class="alert is-important">

`@Component` 메타데이터에 지정된 스타일과 스타일시트 파일은 이 컴포넌트에만 적용됩니다.
그래서 `heroes.component.css`에 정의된 스타일은 `HeroesComponent`에만 적용되며 이 컴포넌트 밖에 있는 HTML 이나 다른 컴포넌트에 영향을 주지 않습니다.

</div>


<!--
## Viewing details
-->
## 상세정보 표시하기

<!--
When the user clicks a hero in the list, the component should display the selected hero's details at the bottom of the page.

In this section, you'll listen for the hero item click event and display/update the hero details.
-->
사용자가 목록에서 히어로를 클릭하면 이 히어로에 대한 상세 정보가 상세정보 화면에 표시되어야 합니다.

이번 섹션에서는 히어로 아이템이 클릭되는 이벤트를 감지하고, 클릭 이벤트가 발생했을 때 상세화면을 업데이트하는 방법을 알아봅시다.


<!--
### Add a click event binding
-->
### 클릭 이벤트 바인딩하기

<!--
Add a click event binding to the `<button>` in the `<li>` like this:

<code-example header="heroes.component.html (template excerpt)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="selectedHero-click"></code-example>

This is an example of Angular's [event binding](guide/event-binding) syntax.

The parentheses around `click` tell Angular to listen for the `<button>` element's `click` event.
When the user clicks in the `<button>`, Angular executes the `onSelect(hero)` expression.

In the next section, define an `onSelect()` method in `HeroesComponent` to display the hero that was defined in the `*ngFor` expression.
-->
`<li>`태그에 다음과 같이 클릭 이벤트를 바인딩합니다.

<code-example header="heroes.component.html (템플릿 일부)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="selectedHero-click"></code-example>

위 코드는 Angular의 [이벤트 바인딩](guide/event-binding) 문법입니다.

이렇게 이벤트를 바인딩하면 Angular가 `<li>` 엘리먼트에서 발생하는 `click` 이벤트를 감지할 수 있습니다.
그래서 사용자가 `<li>` 엘리먼트를 클릭하면 Angular는 `onSelect(hero)` 표현식을 실행합니다.

다음 섹션에서는 `HeroesComponent`에 `onSelect()` 메소드를 정의해서 `*ngFor`로 반복한 히어로 엘리먼트 중에서 사용자가 클릭한 엘리먼트를 하이라이트 처리해봅시다.


<!--
### Add the click event handler
-->
### 클릭 이벤트 핸들러 추가하기

<!--
Rename the component's `hero` property to `selectedHero` but don't assign any value to it since there is no *selected hero* when the application starts.

Add the following `onSelect()` method, which assigns the clicked hero from the template to the component's `selectedHero`.

<code-example header="src/app/heroes/heroes.component.ts (onSelect)" path="toh-pt2/src/app/heroes/heroes.component.ts" region="on-select"></code-example>
-->
컴포넌트의 `hero` 프로퍼티를 `selectedHero`로 변경하지만 이 프로퍼티에 값을 직접 할당하지는 않습니다.
왜냐하면 애플리케이션이 실행되는 시점에 *선택된 히어로* 는 없기 때문입니다.

그 다음에는 `onSelect()`메소드를 추가합니다. 이 메소드는 템플릿에서 선택된 히어로를 컴포넌트의 `selectedHero` 변수에 할당합니다.

<code-example header="src/app/heroes/heroes.component.ts (onSelect())" path="toh-pt2/src/app/heroes/heroes.component.ts" region="on-select"></code-example>


<!--
### Add a details section
-->
### 상세화면 영역 추가하기

<!--
Currently, you have a list in the component template.
To click on a hero on the list and reveal details about that hero, you need a section for the details to render in the template.
Add the following to `heroes.component.html` beneath the list section:

<code-example header="heroes.component.html (selected hero details)" path="toh-pt2/src/app/heroes/heroes.component.html" region="selectedHero-details"></code-example>

The hero details should only be displayed when a hero is selected. When a component is created initially, there is no selected hero, so we add the `*ngIf` directive to the `<div>` that wraps the hero details, to instruct Angular to render the section only when the `selectedHero` is actually defined (after it has been selected by clicking on a hero).

<div class="alert is-important">

Don't forget the asterisk \(`*`\) character in front of `ngIf`.
It's a critical part of the syntax.

</div>
-->
지금까지 만든 앱에서 컴포넌트 템플릿에는 히어로 목록이 표시됩니다.
이제는 이 목록에서 히어로 한 명을 클릭했을 때 해당 히어로의 상세정보를 표시하기 위해 상세정보에 해당하는 템플릿을 추가해야 합니다.
다음 내용을 `heroes.component.html` 파일의 목록 아래에 추가합니다:

<code-example header="heroes.component.html (히어로 상세정보)" path="toh-pt2/src/app/heroes/heroes.component.html" region="selectedHero-details"></code-example>

히어로의 상세정보는 히어로가 선택되었을 때만 표시되어야 합니다.
그래서 컴포넌트가 처음 생성되고 나면 선택된 히어로가 없기 때문에 `*ngIf` 디렉티브를 `<div>` 엘리먼트에 추가해서 `selectedHero` 값이 존재할 때만 이 엘리먼트를 표시합니다.

<div class="alert is-important">

`ngFor`앞에 별표\(`*`\)가 붙는 것에 주의하세요.
아주 중요한 문법입니다.

</div>


<!--
### Style the selected hero
-->
### 선택된 항목 스타일 지정하기

<!--
To help identify the selected hero, you can use the `.selected` CSS class in the [styles you added earlier](#styles).
To apply the `.selected` class to the `<li>` when the user clicks it, use class binding.

<div class="lightbox">

<img alt="Selected hero with dark background and light text that differentiates it from unselected list items" src="generated/images/guide/toh/heroes-list-selected.png">

</div>

Angular's [class binding](guide/class-binding) can add and remove a CSS class conditionally.
Add `[class.some-css-class]="some-condition"` to the element you want to style.

Add the following `[class.selected]` binding to the `<button>` in the `HeroesComponent` template:

<code-example header="heroes.component.html (toggle the 'selected' CSS class)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="class-selected"></code-example>

When the current row hero is the same as the `selectedHero`, Angular adds the `selected` CSS class.
When the two heroes are different, Angular removes the class.

The finished `<li>` looks like this:

<code-example header="heroes.component.html (list item hero)" path="toh-pt2/src/app/heroes/heroes.component.html" region="li"></code-example>
-->
선택된 히어로를 구분하려면 [이전에 추가한 스타일](#styles) 파일에 `.selected` CSS 클래스를 활용하면 됩니다.
이제 사용자가 `<li>` 엘리먼트를 클릭하면 클래스 바인딩에 의해 `.selected` 클래스가 적용됩니다.

<div class="lightbox">

<img alt="Selected hero with dark background and light text that differentiates it from unselected list items" src="generated/images/guide/toh/heroes-list-selected.png">

</div>

Angular가 제공하는 [클래스 바인딩](guide/attribute-binding#class-binding) 문법을 사용하면 특정 조건에 따라 CSS 클래스를 추가하거나 제거할 수 있습니다.
스타일을 지정하려는 엘리먼트에 `[class.some-css-class]="some-condition"`와 같은 문법을 추가하면 됩니다.

이 예제에서는 `HeroesComponent` 템플릿의 `<li>` 엘리먼트에 `[class.selected]`와 같은 문법으로 클래스를 바인딩합니다:

<code-example header="heroes.component.html (toggle the 'selected' CSS class)" path="toh-pt2/src/app/heroes/heroes.component.1.html" region="class-selected"></code-example>

그러면 `selectedHero`와 같은 히어로가 있는 줄에 `selected` CSS 클래스가 추가됩니다.
그리고 컴포넌트 프로퍼티에 있는 값과 다르다면 이 클래스가 제거됩니다.

이렇게 수정된 `<li>` 코드는 다음과 같습니다.

<code-example header="heroes.component.html (히어로 목록)" path="toh-pt2/src/app/heroes/heroes.component.html" region="li"></code-example>

<a id="final-code-review"></a>

<!--
## Final code review
-->
## 최종코드 리뷰

<!--
Here are the code files discussed on this page, including the `HeroesComponent` styles.

<code-tabs>
    <code-pane header="src/app/mock-heroes.ts" path="toh-pt2/src/app/mock-heroes.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt2/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt2/src/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.css" path="toh-pt2/src/app/heroes/heroes.component.css"></code-pane>
</code-tabs>
-->
이번 문서에서 다룬 파일의 내용은 다음과 같습니다.

<code-tabs>
    <code-pane header="src/app/mock-heroes.ts" path="toh-pt2/src/app/mock-heroes.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt2/src/app/heroes/heroes.component.ts"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt2/src/app/heroes/heroes.component.html"></code-pane>
    <code-pane header="src/app/heroes/heroes.component.css" path="toh-pt2/src/app/heroes/heroes.component.css"></code-pane>
</code-tabs>


<!--
## Summary
-->
## 정리

<!--
*   The Tour of Heroes application displays a list of heroes with a detail view
*   The user can select a hero and see that hero's details
*   You used `*ngFor` to display a list
*   You used `*ngIf` to conditionally include or exclude a block of HTML
*   You can toggle a CSS style class with a `class` binding.
-->
*   히어로들의 여행 앱은 화면에 히어로의 목록을 표시합니다.
*   사용자는 히어로를 한 명 선택할 수 있으며, 히어로를 선택하면 이 히어로의 상세정보를 확인할 수 있습니다.
*   목록을 표시할 때는 `*ngFor`를 사용합니다.
*   특정 조건에 따라 DOM에 HTML 템플릿을 추가하거나 제거하려면 `*ngIf`를 사용합니다.
*   `class` 바인딩을 사용하면 CSS 스타일 클래스를 적용하거나 적용하지 않을 수 있습니다.

@reviewed 2022-05-23
