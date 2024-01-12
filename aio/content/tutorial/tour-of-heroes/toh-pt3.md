<!--
# Create a feature component
-->
# 컴포넌트 만들기

<!--
At the moment, the `HeroesComponent` displays both the list of heroes and the selected hero's details.

Keeping all features in one component as the application grows won't be maintainable.
This tutorial splits up large components into smaller subcomponents, each focused on a specific task or workflow.

The first step is to move the hero details into a separate, reusable `HeroDetailComponent` and end up with:

- A `HeroesComponent` that presents the list of heroes.
- A `HeroDetailComponent` that presents the details of a selected hero.

<div class="alert is-helpful">

For the sample application that this page describes, see the <live-example></live-example>.

</div>
-->
지금까지 작성한 앱은 `HeroesComponent`가 히어로의 목록과 선택된 히어로의 상세정보를 동시에 표시합니다.

하지만 모든 기능을 컴포넌트 하나가 담당하면 애플리케이션이 커질수록 이 컴포넌트를 관리하기 점점 힘들어 집니다.
그래서 컴포넌트가 복잡해지면 이 컴포넌트의 역할을 나눠서 일부 역할만 담당하도록 작은 컴포넌트로 나누는 것이 좋습니다.

이 문서에서는 히어로의 상세정보를 표시하는 부분을 분리해서 `HeroDetailComponent`로 만들어 봅시다:

- `HeroesComponent`는 히어로의 목록을 표시합니다.
- `HeroDetailComponent`는 선택된 히어로의 세부정보를 표시합니다.

<div class="alert is-helpful">

이 문서에서 설명하는 앱은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Make the `HeroDetailComponent`
-->
## `HeroDetailComponent` 생성하기

<!--
Use this `ng generate` command to create a new component named `hero-detail`.

<code-example format="shell" language="shell">

ng generate component hero-detail

</code-example>

The command scaffolds the following:

- Creates a directory `src/app/hero-detail`.

Inside that directory, four files are created:

- A CSS file for the component styles.
- An HTML file for the component template.
- A TypeScript file with a component class named `HeroDetailComponent`.
- A test file for the `HeroDetailComponent` class.
-->
`ng generate` 명령을 실행해서 `hero-detail` 컴포넌트를 생성합니다.

<code-example format="shell" language="shell">

ng generate component hero-detail

</code-example>

이 명령을 실행하면:

- `src/app/hero-detail` 폴더를 생성합니다.

그리고 이 폴더에 4개의 파일을 생성합니다:

- 컴포넌트 스타일을 지정하는 CSS 파일
- 컴포넌트 템플릿을 정의하는 HTML 파일
- 컴포넌트 클래스 `HeroDetailComponent`가 정의된 TypeScript 파일
- `HeroDetailComponent` 클래스 파일을 테스트하는 파일



<!--
### Write the template
-->
### 템플릿 작성하기

<!--
Cut the HTML for the hero detail from the bottom of the `HeroesComponent` template and paste it over the boilerplate content in the `HeroDetailComponent` template.

The pasted HTML refers to a `selectedHero`.
The new `HeroDetailComponent` can present _any_ hero, not just a selected hero.
Replace `selectedHero` with `hero` everywhere in the template.

When you're done, the `HeroDetailComponent` template should look like this:

<code-example header="src/app/hero-detail/hero-detail.component.html" path="toh-pt3/src/app/hero-detail/hero-detail.component.html"></code-example>
-->
`HeroesComponent` 아래쪽에 히어로의 상세정보를 표시하는 HTML 템플릿을 잘라내서 `HeroDetailComponent` 템플릿에 붙여넣습니다.

이 때 붙여넣은 HTML 에는 `selectedHero`를 참조하는 부분이 있습니다.
그런데 새로 만든 `HeroDetailComponent`는 선택된 히어로가 아니라 히어로 _한 명의_ 상세정보를 표시합니다.
템플릿에 있는 `selectedHero`는 모두 `hero`로 변경합니다.

그러면 `HeroDetailComponent`의 템플릿이 다음과 같이 작성될 것입니다:

<code-example header="src/app/hero-detail/hero-detail.component.html" path="toh-pt3/src/app/hero-detail/hero-detail.component.html"></code-example>


<!--
### Add the `@Input()` hero property
-->
### `@Input()` 히어로 프로퍼티 추가하기

<!--
The `HeroDetailComponent` template binds to the component's `hero` property
which is of type `Hero`.

Open the `HeroDetailComponent` class file and import the `Hero` symbol.

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.ts"
region="import-hero" header="src/app/hero-detail/hero-detail.component.ts (import Hero)"></code-example>

The `hero` property
[must be an `Input` property](guide/inputs-outputs 'Input and Output properties'),
annotated with the `@Input()` decorator,
because the _external_ `HeroesComponent` [binds to it](#heroes-component-template) like this.

<code-example path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding"></code-example>

Amend the `@angular/core` import statement to include the `Input` symbol.

<code-example header="src/app/hero-detail/hero-detail.component.ts (import Input)" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" region="import-input"></code-example>

Add a `hero` property, preceded by the `@Input()` decorator.

<code-example header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" region="input-hero"></code-example>

That's the only change you should make to the `HeroDetailComponent` class.
There are no more properties. There's no presentation logic.
This component only receives a hero object through its `hero` property and displays it.
-->
`HeroDetailComponent` 템플릿에 바인딩된 `hero`는 컴포넌트의 `hero` 프로퍼티를 참조해야 합니다.

`HeroDetailComponent` 클래스 파일을 열어서 `Hero` 심볼을 로드합니다.

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.ts"
region="import-hero" header="src/app/hero-detail/hero-detail.component.ts (import Hero)"></code-example>

이 때 `hero` 프로퍼티의 값은 _외부_ 컴포넌트인 `HeroesComponent`에서 [바인딩되어](#heroes-component-template) 전달됩니다.
따라서 `hero` 프로퍼티는 `@Input()` 데코레이터를 사용해서 [_입력_ 프로퍼티](guide/inputs-outputs 'Input and Output properties')로 선언해야 합니다.

<code-example path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding"></code-example>

`@angular/core` 패키지에서 `Input` 심볼을 로드합니다.

<code-example header="src/app/hero-detail/hero-detail.component.ts (import Input)" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" region="import-input"></code-example>

그리고 `@Input()` 데코레이터와 함께 `hero` 프로퍼티를 선언합니다.

<code-example header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" region="input-hero"></code-example>

`HeroDetailComponent` 클래스는 여기까지 수정하면 됩니다.
더 추가할 프로퍼티는 없으며 클래스에 추가할 로직도 없습니다.
이 컴포넌트는 단순하게 히어로 객체를 받아서 `hero` 프로퍼티에 할당하고, 템플릿에 이 히어로의 상세정보를 표시할 뿐입니다.


<!--
## Show the `HeroDetailComponent`
-->
## `HeroDetailComponent` 표시하기

<!--
The `HeroesComponent` used to display the hero details on its own, before you removed that part of the template.
This section guides you through delegating logic to the `HeroDetailComponent`.

The two components have a parent/child relationship.
The parent, `HeroesComponent`, controls the child, `HeroDetailComponent` by
sending it a new hero to display whenever the user selects a hero from the list.

You don't need to change the `HeroesComponent` _class_, instead change its _template_.
-->
`HeroesComponent`는 이 컴포넌트 안에 히어로의 상세정보를 표시합니다.
이번 섹션에서는 이 기능을 `HeroDetailComponent`에 구현해 봅시다.

이제 `HeroesComponent`와 `HeroDetailComponent`는 부모/자식 관계가 되었습니다.
부모 컴포넌트인 `HeroesComponent`는 자식 컴포넌트인 `HeroDetailComponent`를 관리합니다.
부모 컴포넌트의 히어로 목록에서 히어로를 선택하면 이 히어로의 정보를 `HeroDetailComponent`로 보내서 히어로의 정보를 표시하게 할 것입니다.

`HeroesComponent`의 _클래스_는 수정하지 않습니다.
수정하는 것은 _템플릿_ 입니다.

<a id="heroes-component-template"></a>

<!--
### Update the `HeroesComponent` template
-->
### `HeroesComponent` 템플릿 수정하기

<!--
The `HeroDetailComponent` selector is `'app-hero-detail'`.
Add an `<app-hero-detail>` element near the bottom of the `HeroesComponent` template, where the hero detail view used to be.

Bind the `HeroesComponent.selectedHero` to the element's `hero` property like this.

<code-example header="heroes.component.html (HeroDetail binding)" path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding"></code-example>

`[hero]="selectedHero"` is an Angular [property binding](guide/property-binding).

It's a _one-way_ data binding from
the `selectedHero` property of the `HeroesComponent` to the `hero` property of the target element, which maps to the `hero` property of the `HeroDetailComponent`.

Now when the user clicks a hero in the list, the `selectedHero` changes.
When the `selectedHero` changes, the _property binding_ updates `hero` and
the `HeroDetailComponent` displays the new hero.

The revised `HeroesComponent` template should look like this:

<code-example path="toh-pt3/src/app/heroes/heroes.component.html"
  header="heroes.component.html"></code-example>

The browser refreshes and the application starts working again as it did before.
-->
`HeroDetailComponent`의 셀렉터는 `'app-hero-detail'` 입니다.
원래 히어로의 상세정보를 표시하던 `HeroesComponent` 템플릿 아래쪽에 `<app-hero-detail>` 엘리먼트를 추가합니다.

그리고 `HeroesComponent.selectedHero` 프로퍼티를 이 엘리먼트의 `hero` 프로퍼티에 다음과 같이 바인딩합니다.

<code-example header="heroes.component.html (HeroDetail binding)" path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding"></code-example>

`[hero]="selectedHero"` is an Angular [property binding](guide/property-binding).

`[hero]="selectedHero"`는 Angular가 제공하는 [프로퍼티 바인딩](guide/property-binding) 문법입니다.

이렇게 작성하면 `HeroesComponent`의 `selectedHero` 프로퍼티가 `HeroDetailComponent`의 `hero` 프로퍼티로 _단방향_ 데이터 바인딩됩니다.

이제 사용자가 목록에서 선택하면 `selectedHero`의 값이 변경됩니다.
그리고 `selectedHero` 값이 변경되면 _프로퍼티 바인딩 된_ `HeroDetailComponent`의 `hero` 프로퍼티도 변경되면서 선택된 히어로의 상세정보가 화면에 표시됩니다.

이렇게 수정하고 나면 `HeroesComponent` 템플릿 코드는 다음과 같이 변경됩니다:

<code-example path="toh-pt3/src/app/heroes/heroes.component.html"
  header="heroes.component.html"></code-example>

브라우저가 갱신되고 나면 애플리케이션이 실행되면서 이전과 동일하게 동작합니다.


<!--
## What changed?
-->
## 어떤 것이 변경되었을까요?

<!--
As [before](tutorial/tour-of-heroes/toh-pt2), whenever a user clicks on a hero name,
the hero detail appears below the hero list.
Now the `HeroDetailComponent` is presenting those details instead of the `HeroesComponent`.

Refactoring the original `HeroesComponent` into two components yields benefits, both now and in the future:

1. You reduced the `HeroesComponent` responsibilities.

1. You can evolve the `HeroDetailComponent` into a rich hero editor
   without touching the parent `HeroesComponent`.

1. You can evolve the `HeroesComponent` without touching the hero detail view.

1. You can re-use the `HeroDetailComponent` in the template of some future component.
-->
이 앱은 [이전](tutorial/tour-of-heroes/toh-pt2)과 동일하게 사용자가 히어로의 이름을 클릭하면 히어로 목록 아래에 히어로의 상세정보를 표시합니다.
하지만 이제는 히어로의 상세정보를 `HeroesComponent` 대신 `HeroDetailComponent`가 표시합니다.

이번 가이드에서는 `HeroesComponent`를 좀 더 효율적으로 관리하기 위해 컴포넌트 두 개로 분리했습니다:

1. `HeroesComponent`의 코드가 좀 더 간단해졌습니다.

1. `HeroDetailComponent`는 좀 더 다양한 기능으로 확장할 수 있지만, 이 때 부모 컴포넌트인 `HeroesComponent`는 신경쓰지 않아도 됩니다.

1. `HeroesComponent`를 수정할 때도 상세정보 화면은 신경쓰지 않아도 됩니다.

1. `HeroDetailComponent`는 다른 컴포넌트에서도 재사용할 수 있습니다.


<!--
## Final code review
-->
## 최종코드 리뷰

<!--
Here are the code files discussed on this page.

<code-tabs>

  <code-pane header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts"></code-pane>

  <code-pane header="src/app/hero-detail/hero-detail.component.html" path="toh-pt3/src/app/hero-detail/hero-detail.component.html"></code-pane>

  <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt3/src/app/heroes/heroes.component.html"></code-pane>

</code-tabs>
-->
이 문서에서 다룬 코드는 다음과 같습니다.

<code-tabs>

<code-pane header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts"></code-pane>

<code-pane header="src/app/hero-detail/hero-detail.component.html" path="toh-pt3/src/app/hero-detail/hero-detail.component.html"></code-pane>

<code-pane header="src/app/heroes/heroes.component.html" path="toh-pt3/src/app/heroes/heroes.component.html"></code-pane>

</code-tabs>


<!--
## Summary
-->
## 정리

<!--
* You created a separate, reusable `HeroDetailComponent`.
* You used a [property binding](guide/property-binding) to give the parent `HeroesComponent` control over the child `HeroDetailComponent`.
* You used the [`@Input` decorator](guide/inputs-outputs)
  to make the `hero` property available for binding
  by the external `HeroesComponent`.
-->
* 기존 컴포넌트의 일부를 분리해서 `HeroDetailComponent`를 만들었습니다. 이 컴포넌트는 다른 곳에 재사용할 수 있습니다.

* 부모 컴포넌트 `HeroesComponent`에서 자식 컴포넌트 `HeroDetailComponent`로 데이터를 전달하기 위해 [프로퍼티 바인딩](guide/property-binding)을 사용했습니다.

* `HeroDetailComponent`의 `hero` 프로퍼티 값을 컴포넌트 외부인 `HeroesComponent`에서 가져오기 위해 [`@Input` 데코레이터](guide/inputs-outputs)를 사용했습니다.


<!--
## Next steps
-->
## 다음 단계

<!--
*  [4. Add services](tutorial/tour-of-heroes/toh-pt4)
-->
*  [4. 서비스 추가하기](tutorial/tour-of-heroes/toh-pt4)


@reviewed 2023-08-30
