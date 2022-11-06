<!--
# Static query migration guide
-->
# 정적 쿼리 마이그레이션 가이드

<!--
<div class="alert is-important">

**IMPORTANT**: <br/>
For library authors:
This migration is especially crucial for library authors to facilitate their users upgrading to version 9 when it becomes available.

</div>

In version 9, the default setting for `@ViewChild` and `@ContentChild` queries is changing in order to fix buggy and surprising behavior in queries \(read more about that [here](#what-does-this-flag-mean)\).

In preparation for this change, in version 8, we are migrating all applications and libraries to explicitly specify the resolution strategy for `@ViewChild` and `@ContentChild` queries.

Specifically, this migration adds an explicit "static" flag that dictates when that query's results should be assigned.
Adding this flag will ensure your code works the same way when upgrading to version 9.

Before:

<code-example format="typescript" language="typescript">

// query results sometimes available in `ngOnInit`, sometimes in `ngAfterViewInit` (based on template)
&commat;ViewChild('foo') foo: ElementRef;

</code-example>

After:

<code-example format="typescript" language="typescript">

// query results available in ngOnInit
&commat;ViewChild('foo', {static: true}) foo: ElementRef;

OR

// query results available in ngAfterViewInit
&commat;ViewChild('foo', {static: false}) foo: ElementRef;

</code-example>

Starting with version 9, the `static` flag will default to false.
At that time, any `{static: false}` flags can be safely removed, and we will have a schematic that will update your code for you.

<div class="alert is-helpful">

**NOTE**: <br />
This flag only applies to `@ViewChild` and `@ContentChild` queries specifically, as `@ViewChildren` and `@ContentChildren` queries do not have a concept of static and dynamic \(they are always resolved as if they are "dynamic"\).

</div>
-->
<div class="alert is-important">

**중요**: <br/>
이 문서는 라이브러리 개발자에게 특히 중요합니다.

</div>

Angular 9 버전부터는 `@ViewChild`, `@ContentChild` 쿼리의 오동작을 수정하기 위해 기본 동작이 변경되었습니다.
자세한 내용은 [이 섹션](#what-does-this-flag-mean)을 참고하세요.

그래서 이 변경사항을 반영하기 위해 Angular 8 버전에는 `@ViewChild`, `@ContentChild` 쿼리에 동작 방식을 꼭 지정하도록 수정되기도 했습니다.

이 마이그레이션은 "static" 플래그를 명시적으로 지정해서 언제 쿼리할 것인지 확실하게 결정하는 것입니다.
이 플래그를 지정하면 Angular 버전을 9로 업그레이드 하더라도 기존에 동작하던 대로 동작할 것입니다.

이전:

<code-example format="typescript" language="typescript">

// 템플릿 구성 방식에 따라 `ngOnInit` 실행 시점에 쿼리한 결과와 `ngAfterViewInit` 실행 시점에 쿼리 결과가 달랐습니다.
&commat;ViewChild('foo') foo: ElementRef;

</code-example>

이후:

<code-example format="typescript" language="typescript">

// 쿼리 결과를 ngOnInit 안에서 활용하는 경우
&commat;ViewChild('foo', {static: true}) foo: ElementRef;

또는

// 쿼리 결과를 ngAfterViewInit 안에서 활용하는 경우
&commat;ViewChild('foo', {static: false}) foo: ElementRef;

</code-example>

Angular 9 버전부터는 `static` 플래그의 기본값이 `false`입니다.
그래서 Angular 9 버전을 사용하면 `{static: false}`라고 작성했던 이전 버전의 코드를 제거해도 됩니다.

<div class="alert is-helpful">

**참고**: <br />
이 플래그는 `@ViewChild`, `@ContentChild` 쿼리에만 해당됩니다. `@ViewChildren`, `@ContentChildren` 쿼리는 항상 동적으로 실행됩니다.

</div>


<!--
## FAQ
-->
## 자주 묻는 질문

<a id="what-to-do-with-todo"></a>

<!--
### What should I do if I see a `/* TODO: add static flag */` comment printed by the schematic?
-->
### `/* TODO: add static flag */` 라는 주석이 보이면 어떻게 처리해야 하나요?

<!--
If you see this comment, it means that the schematic couldn't statically figure out the correct flag.
In this case, you'll have to add the correct flag based on your application's behavior.
For more information on how to choose, see the [next question](#how-do-i-choose).
-->
이 메시지는 스키매틱이 적절한 플래그 값을 결정하지 못했다는 것을 의미합니다.
그래서 이런 경우에는 원하는 대로 동작하도록 플래그 값을 직접 지정해야 합니다.
어떤 방식을 선택해야 하는지 알아보려면 [다음 섹션](#how-do-i-choose)을 참고하세요.


<a id="how-do-i-choose"></a>
<a id="how-do-i-choose-which-static-flag-value-to-use-true-or-false"></a>

<!--
### How do I choose which `static` flag value to use: `true` or `false`?
-->
### `static` 플래그 값은 `true`/`false` 중 어떤 것을 선택해야 하나요?

<!--
In the official API docs, we have always recommended retrieving query results in [`ngAfterViewInit` for view queries](api/core/ViewChild#description) and [`ngAfterContentInit` for content queries](api/core/ContentChild#description).
This is because by the time those lifecycle hooks run, change detection has completed for the relevant nodes and we can guarantee that we have collected all the possible query results.

Most applications will want to use `{static: false}` for the same reason.
This setting will ensure query matches that are dependent on binding resolution \(for example, results inside instances of `*ngIf` or `*ngFor`\) will be found by the query.

There are rarer cases where `{static: true}` flag might be necessary \(see [answer here](#should-i-use-static-true)\).
-->
공식 API 문서를 보면 [뷰 쿼리라면 `ngAfterViewInit`](api/core/ViewChild#description)에서, 컨텐츠 쿼리라면 [`ngAfterContentInit`](api/core/ContentChild#description)에서 쿼리 결과를 참조도록 권장하고 있습니다.
왜냐하면 이 시점이 되어야 변화 감지 로직이 끝나고 DOM 노드에 변경사항이 반영되면서 쿼리 결과를 예상대로 참조할 수 있기 때문입니다.

그래서 보통은 `{static: false}`를 사용하면 됩니다.
이 정책을 사용하면 `*ngIf`나 `*ngFor` 바인딩 표현식의 결과에 따라서 쿼리 결과가 갱신됩니다.

`{static: true}` 플래그 값을 사용해야 하는 경우는 거의 없습니다.
[이 섹션](#should-i-use-static-true)을 참고하세요.


<a id="should-i-use-static-true"></a>
<a id="is-there-a-case-where-i-should-use-static-true"></a>

<!--
### Is there a case where I should use `{static: true}`?
-->
### `{static: true}`를 사용해야 하는 경우가 있나요?

<!--
This option was introduced to support creating embedded views on the fly.
If you need access to a `TemplateRef` in a query to create a view dynamically, you won't be able to do so in `ngAfterViewInit`.
Change detection has already run on that view, so creating a new view with the template will cause an `ExpressionHasChangedAfterChecked` error to be thrown.
In this case, you will want to set the `static` flag to `true` and create your view in `ngOnInit`.
In most other cases, the best practice is to use `{static: false}`.

However, to facilitate the migration to version 8, you may also want to set the `static` flag to `true` if your component code already depends on the query results being available some time **before** `ngAfterViewInit` \(for view queries\) or `ngAfterContentInit` \(for content queries\).
For example, if your component relies on the query results being populated in the `ngOnInit` hook or in `@Input` setters, you will need to either set the flag to `true` or re-work your component to adjust to later timing.

<div class="alert is-helpful">

**NOTE**: <br />
Selecting the static option means that query results nested in `*ngIf` or `*ngFor` will not be found by the query.
These results are only retrievable after change detection runs.

</div>
-->
이 옵션은 임베디드 뷰를 지원하기 위해 도입되었습니다.
만약 동적으로 생성되는 `TemplateRef`를 쿼리하면 이 쿼리 결과는 `ngAfterViewInit` 안에서는 접근할 수 없습니다.
변화 감지 동작이 이미 한 번 실행된 화면에 임베디드 뷰를 새로 생성하면 `ExpressionHasChangedAfterChecked` 에러가 발생하기 때문입니다.
이 상황에서 `static` 플래그 값을 `true`로 지정하면 임베디드 뷰를 `ngOnInit` 시점에 생성합니다.
이런 경우가 아니라면 `{static: false}`를 사용하면 됩니다.

하지만 Angular 8 버전도 지원하면서 뷰 쿼리인 경우 `ngAfterViewInit` **전에**, 컨텐츠 쿼리인 경우 `ngAfterContentInit` **전에** 쿼리 결과를 사용해야 한다면 `static` 플래그 값을 `true`로 지정해야 합니다.
`ngOnInit` 함수나 `@Input` 세터 안에서 쿼리 결과를 참조해야 하는 경우에도 이 플래그 값을 `true`로 지정하거나, 이후 시점에 동작하도록 컴포넌트 로직을 수정해야 합니다.

<div class="alert is-helpful">

**참고**: <br />
이 옵션값은 `*ngIf`, `*ngFor` 안에 있는 내용을 쿼리해야 하느냐에 따라 결정된다고 볼 수 있습니다.
이 디렉티브 안에 있는 내용은 변화 감지 동작이 실행된 이후에 반영됩니다.

</div>


<a id="what-does-this-flag-mean"></a>

<!--
### What does this flag mean and why is it necessary?
-->
### 이 플래그는 어떤 역할을 하나요? 왜 필요한가요?

<!--
The default behavior for queries has historically been undocumented and confusing, and has also commonly led to issues that are difficult to debug.
In version 9, we would like to make query behavior more consistent and simple to understand.

To explain why, first it's important to understand how queries have worked up until now.

Without the `static` flag, the compiler decided when each query would be resolved on a case-by-case basis.
All `@ViewChild`/`@ContentChild` queries were categorized into one of two buckets at compile time: "static" or "dynamic".
This classification determined when query results would become available to users.

| Queries         | Details |
|:---             |:---     |
| Static queries  | The result could be determined statically because the result didn't depend on runtime values like bindings. Results from queries classified as static were available before change detection ran for that view \(accessible in `ngOnInit`\).                                                                             |
| Dynamic queries | the result could not be determined statically because the result depended on runtime values \(bindings\). Results from queries classified as dynamic were not available until after change detection ran for that view \(accessible in `ngAfterContentInit` for content queries or `ngAfterViewInit` for view queries\). |

For example, let's say we have a component, `Comp`.
Inside it, we have this query:

<code-example format="typescript" language="typescript">

&commat;ViewChild(Foo) foo: Foo;

</code-example>

and this template:

<code-example format="html" language="html">

&lt;div foo&gt;&lt;/div&gt;

</code-example>

This `Foo` query would be categorized as static because at compile-time it's known that the `Foo` instance on the `<div>` is the correct result for the query.
Because the query result is not dependent on runtime values, we don't have to wait for change detection to run on the template before resolving the query.
Consequently, results can be made available in `ngOnInit`.

Let's say the query is the same, but the component template looks like this:

<code-example format="html" language="html">

&lt;div foo *ngIf="showing"&gt;&lt;/div&gt;

</code-example>

With that template, the query would be categorized as a dynamic query.
We would need to know the runtime value of `showing` before determining what the correct results are for the query.
As a result, change detection must run first, and results can only be made available in `ngAfterViewInit` or a setter for the query property.

The effect of this implementation is that adding an `*ngIf` or `*ngFor` anywhere above a query match can change when that query's results become available.

Keep in mind that these categories only applied to `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries did not have a concept of static and dynamic, so they were always resolved as if they were "dynamic".

This strategy of resolving queries at different times based on the location of potential query matches has caused a lot of confusion.
Namely:

*   Sometimes query results are available in `ngOnInit`, but sometimes they aren't and it's not clear why \(see [21800](https://github.com/angular/angular/issues/21800) or [19872](https://github.com/angular/angular/issues/19872)\)
*   `@ViewChild` queries are resolved at a different time from `@ViewChildren` queries, and `@ContentChild` queries are resolved at a different time from `@ContentChildren` queries.
    If a user turns a `@ViewChild` query into a `@ViewChildren` query, their code can break suddenly because the timing has shifted.

*   Code depending on a query result can suddenly stop working as soon as an `*ngIf` or an `*ngFor` is added to a template
*   A `@ContentChild` query for the same component will resolve at different times in the lifecycle for each usage of the component.
    This leads to buggy behavior where using a component with `*ngIf` is broken in subtle ways that aren't obvious to the component author.

In version 9, we plan to simplify the behavior so all queries resolve after change detection runs by default.
The location of query matches in the template cannot affect when the query result will become available and suddenly break your code, and the default behavior is always the same.
This makes the logic more consistent and predictable for users.

That said, if an application does need query results earlier \(for example, the query result is needed to create an embedded view\), it's possible to add the `{static: true}` flag to explicitly ask for static resolution.
With this flag, users can indicate that they only care about results that are statically available and the query results will be populated before `ngOnInit`.
-->
쿼리 동작은 지금까지 어떻게 동작하는지 문서화된 적이 없었으며 사용자들에게 혼란을 주고 있었고 디버깅하기도 어려웠습니다.
Angular 9 버전부터는 쿼리 동작을 일관된 방식으로 조정하면서 이해하기도 쉽게 개선했습니다.

변경된 이유를 설명하자면, 지금까지 쿼리가 어떻게 동작했는지 이해할 필요가 있습니다.

`static` 플래그가 도입되기 전에는 개별 쿼리가 어떻게 동작할지 컴파일러가 그때 그때 결정했습니다.
`@ViewChild`, `@ContentChild` 쿼리가 정적으로 동작할지, 동적으로 동작할지는 사용자가 쿼리 결과를 언제 사용하느냐에 따라  컴파일 시점에 결정되었습니다.

| 쿼리               | 설명                                                                                                                                                                          |
|:-----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 정적\(static\) 쿼리  | 쿼리 결과가 정적으로 결정됩니다 쿼리 결과가 실행시점에 사용되지 않는 방식으로 바인딩한 경우가 그랬습니다. 정적으로 쿼리된 결과는 변화 감지 동작이 일어나기 전에 활용할 수 있습니다. `ngOnInit`에서 접근하는 경우가 그렇습니다.                                         |
| 동적\(dynamic\) 쿼리 | 쿼리 결과가 정적으로 결정되지 않습니다. 쿼리 결과는 실행 시점에 바인딩되는 결과에 따라 달라집니다. 동적으로 쿼리된 결과는 변화 감지 동작이 끝난 후에 활용할 수 있습니다. 컨텐츠 쿼리라면 `ngAfterContentInit`, 뷰 쿼리르면 `ngAfterViewInit`에서 접근하는 경우가 그렇습니다. |

예를 들어서 이런 컴포넌트가 있다고 합시다.
`Comp` 안에는 이런 쿼리가 있습니다:

<code-example format="typescript" language="typescript">

&commat;ViewChild(Foo) foo: Foo;

</code-example>

그리고 템플릿은 이렇습니다:

<code-example format="html" language="html">

&lt;div foo&gt;&lt;/div&gt;

</code-example>

`Foo` 쿼리는 정적으로 처리됩니다.
왜냐하면 컴파일 시점에도 `Foo`에 해당하는 `<div>`가 존재하기 때문에 언제나 쿼리할 수 있기 때문입니다.
이 쿼리 동작은 실행 시점에 영향을 받지 않습니다.
그래서 변화 감지가 동작하고 템플릿이 변경된 이후까지 쿼리 시점을 기다릴 필요가 없습니다.
이 쿼리 결과는 `ngOnInit` 안에서 접근할 수 있습니다.

하지만 쿼리 코드는 같으면서 템플릿이 다른 경우를 생각해 봅시다:

<code-example format="html" language="html">

&lt;div foo *ngIf="showing"&gt;&lt;/div&gt;

</code-example>

템플릿이 이렇게 구성되면 이 쿼리는 동적 쿼리로 구분됩니다.
이런 템플릿에서 쿼리를 하려면 실행 시점에 `showing`이 어떤 값인지 확인해야 합니다.
그래서 변화 감지 로직이 먼저 실행된 후인 `ngAfterViewInit`이나 쿼리 프로퍼티 세터에서만 이 쿼리 결과를 활용할 수 있습니다.

따라서 템플릿에 `*ngIf`나 `*ngFor`가 사용되면 변화 감지 로직이 동작해야 쿼리 결과에 접근할 수 있습니다.

쿼리가 동적이냐/정적이냐는 `@ViewChild`와 `@ContentChild` 쿼리에만 해당된다는 것을 잊지 마세요.
`@ViewChildren` 쿼리와 `@ContentChildren` 쿼리는 정적/동적을 구분하지 않고 언제나 동적으로 실행됩니다.

쿼리가 이렇게 동작했기 때문에 쿼리가 실행되는 시점에 따라 쿼리 결과가 달라질 수 있었습니다.
실제로 이런 일들이 벌어졌습니다:

*   어떤 경우에는 `ngOnInit` 안에서 쿼리 결과를 참조할 수 있었지만 그렇지 않은 경우도 있었습니다.
    [이 이슈](https://github.com/angular/angular/issues/21800)와 [이 이슈](https://github.com/angular/angular/issues/19872))를 참고하세요.

*   `@ViewChild` 쿼리와 `@ViewChildren` 쿼리가 실행되는 시점이 달랐습니다. `@ContentChild` 쿼리도 `@ContentChildren` 쿼리와 실행되는 시점이 달랐습니다.
    그래서 사용자가 `@ViewChild` 쿼리를 `@ViewChildren` 쿼리로 변경하면 쿼리 시점이 달라지기 때문에 코드가 제대로 동작하지 않는 문제가 발생했습니다.

*   템플릿에 `*ngIf`, `*ngFor`가 추가되면 제대로 돌아가던 코드가 동작하지 않는 경우가 있었습니다.
*   `@ContentChild` 쿼리 결과가 컴포넌트 라이프싸이클이 동작하는 시점에 따라 다른 경우가 있었습니다.
    특히 컴포넌트에서 `*ngIf`를 사용하는 경우에는 이런 문제가 발생하는 경우가 많았습니다.

그래서 Angular 9 버전에는 모든 쿼리 동작이 변화 감지 이후에 실행되는 것을 기본 동작으로 변경하면서 쿼리 동작을 단순화했습니다.
이제 쿼리 대상이 템플릿의 어느 위치에 있느냐는 쿼리 결과에 영향을 주지 않으며, 코드가 갑자기 동작하지 않을 일도 없이 기본 동작이 언제나 같습니다.
Angular 개발자가 작성하면서도 쿼리 결과를 일관되게 예상할 수 있을 것입니다.

이제는 임베디드 뷰를 생성하기 위해 쿼리 결과를 꼭 사전에 참조해야 하는 상황이라면 `{static: true}` 플래그를 설정해서 쿼리를 정적으로 실행하면 됩니다.
이 플래그 값을 사용하면 이 쿼리는 명시적으로 정적으로 실행되어야 한다는 것을 의미하며, `ngOnInit`에서도 쿼리 결과를 참조할 수 있습니다.


<a id="view-children-and-content-children"></a>

<!--
### Does this change affect `@ViewChildren` or `@ContentChildren` queries?
-->
### 이 변경사항이 `@ViewChildren`이나 `@ContentChildren` 쿼리에 영향을 주나요?

<!--
No, this change only affects `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries are already "dynamic" by default and don't support static resolution.
-->
아닙니다.
이 변경사항은 `@ViewChild`, `@ContentChild` 쿼리에만 해당됩니다.
`@ViewChildren`, `@ContentChildren` 쿼리는 언제나 동적으로 실행되며 정적으로 실행되는 경우는 없습니다.


<a id="why-specify-static-false"></a>

<!--
### ​Why do I have to specify `{static: false}`? Isn't that the default?
-->
### 기본값이 `false`라면 왜 `{static: false}`를 지정해야 하나요?

<!--
The goal of this migration is to transition apps that aren't yet on version 9 to a query pattern that is compatible with version 9.
However, most applications use libraries, and it's likely that some of these libraries may not be upgraded to version 8 yet \(and thus might not have the proper flags\).
Since the application's version of Angular will be used for compilation, if we change the default, the behavior of queries in the library's components will change to the version 8 default and possibly break.
This way, an application's dependencies will behave the same way during the transition as they did in the previous version.

In Angular version 9 and later, it will be safe to remove any `{static: false}` flags and we will do this cleanup for you in a schematic.
-->
이 마이그레이션의 목표는 아직 Angular 9 버전을 사용하는 애플리케이션의 쿼리 동작을 Angular 9 방식으로 맞추기 위한 것입니다.
애플리케이션이 사용하는 라이브러리 중에는 Angular 8, 어쩌면 그 이전 버전으로 개발된 라이브러리도 있을 수 있습니다.
이런 경우에도 Angular는 컴파일 시점에 기본 동작을 지정하지만, 이전 버전으로 개발된 라이브러리 컴포넌트는 이 변경사항을 적용해야 예상치 못한 에러가 발생하는 것을 방지할 수 있습니다.
이 마이그레이션은 새롭게 변경된 정책으로 안전하게 변경하기 위한 것입니다.

Angular 9 버전부터는 `{static: false}` 플래그를 제거해도 됩니다.


<a id="libraries"></a>

<!--
### Can I keep on using Angular libraries that haven't yet updated to version 8 yet?
-->
### Angular 8 버전 이전에 개발된 라이브러리는 계속 사용할 수 있나요?

<!--
Yes, absolutely.
Because we have not changed the default query behavior in version 8 \(such as the compiler still chooses a timing if no flag is set\), when your application runs with a library that has not updated to version 8, the library will run the same way it did in version 7.
This guarantees your app will work in version 8 even if libraries take longer to update their code.
-->
네, 문제 없습니다!
Angular 8 버전까지는 쿼리의 기본 동작이 변경되지 않았습니다.
이전 버전으로 개발된 라이브러리는 컴파일되면서 이전 방식으로 동작하는 코드가 빌드되었기 때문에 이 라이브러리가 실행되는 방식이 변경되는 것은 아닙니다.
애플리케이션이 사용하는 Angular 버전이 8 이전이라면 이 라이브러리를 사용해도 그대로 동작할 것입니다.


<a id="update-library-to-use-static-flag"></a>

<!--
### Can I update my library to version 8 by adding the `static` flag to view queries, while still being compatible with Angular version 7 apps?
-->
### 라이브러리를 업그레이드하면서 `static` 플래그를 추가하면, 이 라이브러리는 Angular 7 버전 앱에서도 실행되나요?

<!--
Yes, the Angular team's recommendation for libraries is to update to version 8 and add the `static` flag.
Angular version 7 apps will continue to work with libraries that have this flag.

However, if you update your library to Angular version 8 and want to take advantage of the new version 8 APIs, or you want more recent dependencies \(such as Typescript or RxJS\) your library will become incompatible with Angular version 7 apps.
If your goal is to make your library compatible with Angular versions 7 and 8, you should not update your lib at all &mdash;except for `peerDependencies` in `package.json`.

In general, the most efficient plan is for libraries to adopt a 6 month major version schedule and bump the major version after each Angular update.
That way, libraries stay in the same release cadence as Angular.
-->
네, Angular 팀은 라이브러리의 버전을 Angular 8로 업그레이드 할 때 `static` 플래그를 추가하는 것을 권장하고 있습니다.
Angular 7 버전까지는 이전 방식대로 동작할 것입니다.

그런데 라이브러리 버전을 8로 업그레이드 하면 8 버전에 해당하는 API나 관련 의존성 패키지들(TypeScript, RxJS)도 변경되기 때문에 Angular 7 버전의 애플리케이션과는 호환되지 않을 수 있습니다.
라이브러리가 Angular 7, 8 버전을 지원해야 한다면 `package.json`에 있는 `peerDependencies` 외의 항목을 변경하면 안됩니다.

일반적으로는 Angular 메이저 버전이 업데이트되는 6개월 주기마다 라이브러리 버전도 함께 올리는 방식이 가장 좋습니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
