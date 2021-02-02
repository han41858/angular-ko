<!--
# Static query migration guide
-->
# 정적 쿼리 마이그레이션 가이드
​
<!--
**Important note for library authors: This migration is especially crucial for library authors to facilitate their users upgrading to version 9 when it becomes available.**

In version 9, the default setting for `@ViewChild` and `@ContentChild` queries is changing in order to fix buggy and surprising behavior in queries (read more about that [here](#what-does-this-flag-mean)).

In preparation for this change, in version 8, we are migrating all applications and libraries to explicitly specify the resolution strategy for `@ViewChild` and `@ContentChild` queries.

Specifically, this migration adds an explicit "static" flag that dictates when that query's results should be assigned.
Adding this flag will ensure your code works the same way when upgrading to version 9.

Before:

```
// query results sometimes available in `ngOnInit`, sometimes in `ngAfterViewInit` (based on template)
@ViewChild('foo') foo: ElementRef;
```

After:

```
// query results available in ngOnInit
@ViewChild('foo', {static: true}) foo: ElementRef;

OR

// query results available in ngAfterViewInit
@ViewChild('foo', {static: false}) foo: ElementRef;
```

Starting with version 9, the `static` flag will default to false.
At that time, any `{static: false}` flags can be safely removed, and we will have a schematic that will update your code for you.

Note: this flag only applies to `@ViewChild` and `@ContentChild` queries specifically, as `@ViewChildren` and `@ContentChildren` queries do not have a concept of static and dynamic (they are always resolved as if they are "dynamic").
-->
**이 문서는 라이브러리 개발자에게 특히 중요합니다.**

Angular 9 버전부터는 `@ViewChild`, `@ContentChild` 쿼리의 오동작을 수정하기 위해 기본 동작이 변경되었습니다.
자세한 내용은 [이 섹션](#what-does-this-flag-mean)을 참고하세요.

그래서 이 변경사항을 반영하기 위해 Angular 8 버전에는 `@ViewChild`, `@ContentChild` 쿼리에 동작 방식을 꼭 지정하도록 수정되기도 했습니다.

이 마이그레이션은 "static" 플래그를 명시적으로 지정해서 언제 쿼리할 것인지 확실하게 지정하는 것입니다.
이 플래그를 지정하면 Angular 버전을 9로 업그레이드 하더라도 기존에 동작하던 대로 동작할 것입니다.

이전:

```
// 템플릿 구성 방식에 따라 `ngOnInit` 실행 시점에 쿼리한 결과와 `ngAfterViewInit` 실행 시점에 쿼리 결과가 달랐습니다.
@ViewChild('foo') foo: ElementRef;
```

이후:

```
// 쿼리 결과를 ngOnInit 안에서 활용하는 경우
@ViewChild('foo', {static: true}) foo: ElementRef;

또는

// 쿼리 결과를 ngAfterViewInit 안에서 활용하는 경우
@ViewChild('foo', {static: false}) foo: ElementRef;
```

Angular 9 버전부터는 `static` 플래그의 기본값이 `false`입니다.
그래서 Angular 9 버전을 사용하면 `{static: false}`라고 작성했던 이전 버전의 코드를 제거해도 됩니다.

참고: 이 플래그는 `@ViewChild`, `@ContentChild` 쿼리에만 해당됩니다. `@ViewChildren`, `@ContentChildren` 쿼리는 항상 동적으로 실행됩니다.


<!--
## FAQ
-->
## 자주 묻는 질문

{@a what-to-do-with-todo}
<!--
### What should I do if I see a `/* TODO: add static flag */` comment printed by the schematic?
-->
### `/* TODO: add static flag */` 라는 주석이 보이면 어떻게 처리해야 하나요?

<!--
If you see this comment, it means that the schematic couldn't statically figure out the correct flag. In this case, you'll have to add the correct flag based on your application's behavior.
For more information on how to choose, see the [next question](#how-do-i-choose).
-->
이 메시지는 스키매틱이 적절한 플래그 값을 결정하지 못했다는 것을 의미합니다.
그래서 이런 경우에는 원하는 대로 동작하도록 플래그 값을 직접 지정해야 합니다.
어떤 방식을 선택해야 하는지 알아보려면 [다음 섹션](#how-do-i-choose)을 참고하세요.


{@a how-do-i-choose}
{@a how-do-i-choose-which-static-flag-value-to-use-true-or-false}
<!--
### How do I choose which `static` flag value to use: `true` or `false`?
-->
### `static` 플래그 값은 `true`/`false` 중 어떤 것을 선택해야 하나요?

<!--
In the official API docs, we have always recommended retrieving query results in [`ngAfterViewInit` for view queries](api/core/ViewChild#description) and [`ngAfterContentInit` for content queries](api/core/ContentChild#description).
This is because by the time those lifecycle hooks run, change detection has completed for the relevant nodes and we can guarantee that we have collected all the possible query results.

Most applications will want to use `{static: false}` for the same reason. This setting will ensure query matches that are dependent on binding resolution (e.g. results inside `*ngIf`s or `*ngFor`s) will be found by the query.

There are rarer cases where `{static: true}` flag might be necessary (see [answer here](#should-i-use-static-true)).
-->
공식 API 문서를 보면 쿼리 결과는 [뷰 쿼리라면 `ngAfterViewInit`](api/core/ViewChild#description)에서, 컨텐츠 쿼리라면 [`ngAfterContentInit`](api/core/ContentChild#description)에서 참조할 것을 권장하고 있습니다.
왜냐하면 이 시점이 되어야 변화 감지 로직이 끝나고 DOM 노드에 변경사항이 반영되면서 쿼리 결과를 예상대로 참조할 수 있기 때문입니다.

그래서 보통은 `{static: false}`를 사용하면 됩니다.
이 정책을 사용하면 `*ngIf`나 `*ngFor` 바인딩 표현식의 결과에 따라서 쿼리 결과가 갱신됩니다.

`{static: true}` 플래그 값을 사용해야 하는 경우는 거의 없습니다.
[이 섹션](#should-i-use-static-true)을 참고하세요.



{@a should-i-use-static-true}
{@a is-there-a-case-where-i-should-use-static-true}
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

However, to facilitate the migration to version 8, you may also want to set the `static` flag to `true` if your component code already depends on the query results being available some time **before** `ngAfterViewInit` (for view queries) or `ngAfterContentInit` (for content queries).
For example, if your component relies on the query results being populated in the `ngOnInit` hook or in `@Input` setters, you will need to either set the flag to `true` or re-work your component to adjust to later timing.

Note: Selecting the static option means that query results nested in `*ngIf` or `*ngFor` will not be found by the query.
These results are only retrievable after change detection runs.
-->
이 옵션은 임베디드 뷰를 지원하기 위해 도입되었습니다.
만약 동적으로 생성되는 `TemplateRef`를 쿼리하면 이 쿼리 결과는 `ngAfterViewInit` 안에서는 접근할 수 없습니다.
변화 감지 동작은 이미 실행된 화면에 임베디드 뷰를 새로 생성하면 `ExpressionHasChangedAfterChecked` 에러가 발생하기 때문입니다.
이 상황에서 `static` 플래그 값을 `true`로 지정하면 임베디드 뷰를 `ngOnInit` 시점에 생성합니다.
이런 경우가 아니라면 `{static: false}`를 사용하면 됩니다.

하지만 Angular 8 버전도 지원하면서 뷰 쿼리인 경우 `ngAfterViewInit` **전에**, 컨텐츠 쿼리인 경우 `ngAfterContentInit` **전에** 쿼리 결과를 사용해야 한다면 `static` 플래그 값을 `true`로 지정해야 합니다.
`ngOnInit` 함수나 `@Input` 세터 안에서 쿼리 결과를 참조해야 하는 경우에도 이 플래그 값을 `true`로 지정하거나, 이후 시점에 동작하도록 컴포넌트 로직을 수정해야 합니다.

참고: 이 옵션값은 `*ngIf`, `*ngFor` 안에 있는 내용을 쿼리해야 하느냐에 따라 결정된다고 볼 수 있습니다.
이 디렉티브 안에 있는 내용은 변화 감지 동작이 실행된 이후에 반영됩니다.


{@a what-does-this-flag-mean}
<!--
### What does this flag mean and why is it necessary?
-->
### 이 플래그는 어떤 역할을 하나요? 왜 필요한가요?

The default behavior for queries has historically been undocumented and confusing, and has also commonly led to issues that are difficult to debug.
In version 9, we would like to make query behavior more consistent and simple to understand.

To explain why, first it's important to understand how queries have worked up until now.

Without the `static` flag, the compiler decided when each query would be resolved on a case-by-case basis.
All `@ViewChild`/`@ContentChild` queries were categorized into one of two buckets at compile time: "static" or "dynamic".
This classification determined when query results would become available to users.

- **Static queries** were queries where the result could be determined statically because the result didn't depend on runtime values like bindings.
Results from queries classified as static were available before change detection ran for that view (accessible in `ngOnInit`).

- **Dynamic queries** were queries where the result could NOT be determined statically because the result depended on runtime values (aka bindings).
Results from queries classified as dynamic were not available until after change detection ran for that view (accessible in `ngAfterContentInit` for content queries or `ngAfterViewInit` for view queries).

For example, let's say we have a component, `Comp`. Inside it, we have this query:

```
@ViewChild(Foo) foo: Foo;
```

and this template:

```
<div foo></div>
```

This `Foo` query would be categorized as static because at compile-time it's known that the `Foo` instance on the `<div>` is the correct result for the query.
Because the query result is not dependent on runtime values, we don't have to wait for change detection to run on the template before resolving the query.
Consequently, results can be made available in `ngOnInit`.

Let's say the query is the same, but the component template looks like this:

```
<div foo *ngIf="showing"></div>
```

With that template, the query would be categorized as a dynamic query.
We would need to know the runtime value of `showing` before determining what the correct results are for the query.
As a result, change detection must run first, and results can only be made available in `ngAfterViewInit` or a setter for the query property.

The effect of this implementation is that adding an `*ngIf` or `*ngFor` anywhere above a query match can change when that query's results become available.

Keep in mind that these categories only applied to `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries did not have a concept of static and dynamic, so they were always resolved as if they were "dynamic".

This strategy of resolving queries at different times based on the location of potential query matches has caused a lot of confusion. Namely:

* Sometimes query results are available in `ngOnInit`, but sometimes they aren't and it's not clear why (see [21800](https://github.com/angular/angular/issues/21800) or [19872](https://github.com/angular/angular/issues/19872)).

* `@ViewChild` queries are resolved at a different time from `@ViewChildren` queries, and `@ContentChild` queries are resolved at a different time from `@ContentChildren` queries.
If a user turns a `@ViewChild` query into a `@ViewChildren` query, their code can break suddenly because the timing has shifted.

* Code depending on a query result can suddenly stop working as soon as an `*ngIf` or an `*ngFor` is added to a template.

* A `@ContentChild` query for the same component will resolve at different times in the lifecycle for each usage of the component.
This leads to buggy behavior where using a component with `*ngIf` is broken in subtle ways that aren't obvious to the component author.

In version 9, we plan to simplify the behavior so all queries resolve after change detection runs by default.
The location of query matches in the template cannot affect when the query result will become available and suddenly break your code, and the default behavior is always the same.
This makes the logic more consistent and predictable for users.

That said, if an application does need query results earlier (for example, the query result is needed to create an embedded view), it's possible to add the `{static: true}` flag to explicitly ask for static resolution.
With this flag, users can indicate that they only care about results that are statically available and the query results will be populated before `ngOnInit`.

{@a view-children-and-content-children}
### Does this change affect `@ViewChildren` or `@ContentChildren` queries?

No, this change only affects `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries are already "dynamic" by default and don't support static resolution.

{@a why-specify-static-false}
### ​Why do I have to specify `{static: false}`? Isn't that the default?

The goal of this migration is to transition apps that aren't yet on version 9 to a query pattern that is compatible with version 9.
However, most applications use libraries, and it's likely that some of these libraries may not be upgraded to version 8 yet (and thus might not have the proper flags).
Since the application's version of Angular will be used for compilation, if we change the default, the behavior of queries in the library's components will change to the version 8 default and possibly break.
This way, an application's dependencies will behave the same way during the transition as they did in the previous version.

In Angular version 9 and later, it will be safe to remove any `{static: false}` flags and we will do this cleanup for you in a schematic.

{@a libraries}
###  Can I keep on using Angular libraries that haven’t yet updated to version 8 yet?

Yes, absolutely!
Because we have not changed the default query behavior in version 8 (i.e. the compiler still chooses a timing if no flag is set), when your application runs with a library that has not updated to version 8, the library will run the same way it did in version 7.
This guarantees your app will work in version 8 even if libraries take longer to update their code.

{@a update-library-to-use-static-flag}
###  Can I update my library to version 8 by adding the `static` flag to view queries, while still being compatible with Angular version 7 apps?

Yes, the Angular team's recommendation for libraries is to update to version 8 and add the `static` flag. Angular version 7 apps will continue to work with libraries that have this flag.

However, if you update your library to Angular version 8 and want to take advantage of the new version 8 APIs, or you want more recent dependencies (such as Typescript or RxJS) your library will become incompatible with Angular version 7 apps. If your goal is to make your library compatible with Angular versions 7 and 8, you should not update your lib at all—except for `peerDependencies` in `package.json`.

In general, the most efficient plan is for libraries to adopt a 6 month major version schedule and bump the major version after each Angular update. That way, libraries stay in the same release cadence as Angular.
