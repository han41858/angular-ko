<!--
# Dynamic queries flag migration
-->
# 동적 쿼리 플래그 마이그레이션

<!--
## What does this migration do?
-->
## 무엇을 마이그레이션하는 건가요?

<!--
In Angular version 8, a schematic added `static` flags to all `@ViewChild()` and `@ContentChild()` queries.
This was the first step towards changing the default behavior.
With version 9, the default value changes to `static: false` and the flag becomes optional.

This schematic scans classes in the compilation and for each class, checks if the members have a `@ViewChild()` or `@ContentChild()` query with the `static` flag set to `false`.
If so, the schematic removes the flag, as it now matches the default.

**Before**:

<code-example format="typescript" language="typescript">

&commat;ViewChild('foo', {static: false}) foo: ElementRef;

&commat;ViewChild('bar', {static: true}) bar: ElementRef;

</code-example>

**After**:

<code-example format="typescript" language="typescript">

&commat;ViewChild('foo') foo: ElementRef;

// this query doesn't change because the static value is true
&commat;ViewChild('bar', {static: true}) bar: ElementRef;

</code-example>

<div class="alert is-helpful">

**NOTE**: <br />
The flag is not supported in `@ViewChildren()` or `@ContentChildren()` queries, so the schematic will not check these properties.

</br>
-->
`@ViewChild()`, `@ContentChild()` 쿼리의 `static` 플래그는 Angular 8 버전에 도입되었는데, 이 플래그는 쿼리 기본 동작을 변경하기 위한 준비단계였습니다.
Angular 9 버전부터 `static`의 기본값은 `false`이기 때문에 `false` 값을 지정한다면 이 플래그를 생략해도 됩니다.

이제 클래스 멤버에 `@ViewChild()` 쿼리나 `@ContentChild()` 쿼리가 `static` 플래그 없이 사용되면 컴파일 시점에 `false`값으로 간주합니다.

**수정 전**:

<code-example format="typescript" language="typescript">

&commat;ViewChild('foo', {static: false}) foo: ElementRef;

&commat;ViewChild('bar', {static: true}) bar: ElementRef;

</code-example>

**수정 후**:

<code-example format="typescript" language="typescript">

&commat;ViewChild('foo') foo: ElementRef;

// 이 쿼리는 static: true로 동작하기 때문에 수정하지 않습니다.
&commat;ViewChild('bar', {static: true}) bar: ElementRef;

</code-example>

<div class="alert is-helpful">

**NOTE**: <br />
The flag is not supported in `@ViewChildren()` or `@ContentChildren()` queries, so the schematic will not check these properties.

</div>


<!--
## Why is this migration necessary?
-->
## 왜 변경되었나요?

<!--
This schematic performs a code cleanup to remove `static` flags that match the default, as they are no longer necessary.
Functionally, the code change should be a noop.

| Versions         | Details |
|:---              |:---     |
| Before version 9 | Angular figured out the static or dynamic nature of a query automatically, based on how the template was written. Looking at templates in this way, however, caused buggy and surprising behavior \(see more about that in the [Static Query Migration Guide](guide/static-query-migration#what-does-this-flag-mean)\). |
| As of version 9  | Angular uses dynamic queries \(`static: false`\) by default, which simplifies queries. Developers can still explicitly set a query to `static: true` if necessary.                                                                                                                                                      |

<div class=" alert is-helpful">

### What is the difference between static and dynamic queries?

The `static` option for `@ViewChild()` and `@ContentChild()` queries determines when the query results become available.

| Queries                             | Details |
|:---                                 |:---     |
| Static queries \(`static: true`\)   | The query resolves once the view has been created, but before change detection runs. The result, though, will never be updated to reflect changes to your view, such as changes to `ngIf` and `ngFor` blocks.                           |
| Dynamic queries \(`static: false`\) | The query resolves after either `ngAfterViewInit()` or `ngAfterContentInit()` for `@ViewChild()` and `@ContentChild()` respectively. The result will be updated for changes to your view, such as changes to `ngIf` and `ngFor` blocks. |

For more information, see the following entries in the [Static Query Migration Guide](guide/static-query-migration):

*   [How do I choose which `static` flag value to use: `true` or `false`?](guide/static-query-migration#how-do-i-choose-which-static-flag-value-to-use-true-or-false)
*   [Is there a case where I should use `{static: true}`?](guide/static-query-migration#is-there-a-case-where-i-should-use-static-true)

</div>
-->
이 변경사항은 더이상 사용하지 않는 `static` 기본값을 제거하기 위한 것입니다.
코드를 변경해도 동작은 변경되지 않습니다.

| 버전      | 설명                                                                                                                                                                              |
|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 9 버전 이전 | 쿼리를 정적으로 진행할지, 동적으로 진행할지 Angular가 자동으로 판단했습니다. 하지만 이런 방식은 버그가 발생해서 예상치 못한 동작을 할 여지가 있었습니다. [정적 쿼리 마이그레이션 가이드](guide/static-query-migration#what-does-this-flag-mean) 문서를 참고하세요. |
| 9 버전 이후 | 동적 쿼리(`static: false`)를 기본으로 사용해서 쿼리를 단순화했습니다. 필요하다면 `static: true`로 사용해도 됩니다.                                                                                                  |

<div class=" alert is-helpful">

### 정적/동적 쿼리는 어떻게 다른가요?

`@ViewChild()`, `@ContentChild()` 쿼리에 `static` 옵션을 사용하면 쿼리가 동작하는 시점을 지정할 수 있습니다.

| 쿼리                        | 설명                                                                                                                                                                                              |
|:--------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 정적 쿼리 \(`static: true`\)  | 화면이 생성된 이후에, 변화 감지 로직이 동작하기 전에 쿼리가 실행됩니다. 그래서 `ngIf`나 `ngFor` 블록 안에서 발생하는 변경사항은 이 쿼리에 반영되지 않습니다.                                                                                                |
| 동적 쿼리 \(`static: false`\) | 동적 쿼리(`static: false`)를 사용하면 `@ViewChild()`, `@ContentChild()`에 해당하는 컴포넌트의 `ngAfterViewInit()`, `ngAfterContrentInit()`이 실행된 이후에 쿼리가 실행됩니다. 그래서 `ngIf`, `ngFor` 블록 안에서 변경된 내용에 따라 쿼리 결과가 갱신됩니다. |

자세한 내용은 [정적 쿼리 마이그레이션 가이드](guide/static-query-migration) 문서의 이런 섹션을 참고하세요:

*   [`static` 플래그에 어떤 값을 사용해야 하나요?](guide/static-query-migration#how-do-i-choose-which-static-flag-value-to-use-true-or-false)
*   [반드시 `{static: true}`를 사용해야 하는 경우가 있나요?](guide/static-query-migration#is-there-a-case-where-i-should-use-static-true)

</div>


<!--
## What does this mean for libraries?
-->
## 라이브러리 코드도 수정해야 하나요?

<!--
In order to support applications that are still running with version 8, the safest option for libraries is to retain the `static` flag to keep the resolution timing consistent.

| Library and application combination                        | Details |
|:---                                                        |:---   |
| Libraries on version 9 with applications running version 8 | The schematic won't run on libraries. As long as libraries retain their `static` flags from version 8, they should work with apps on 8. |
| Libraries on version 8 with applications running version 9 | Libraries will have explicit flags defined. The behavior with explicit flags has not changed.                                           |
-->
Angular 8 버전에서도 라이브러리가 동작하는 것을 유지하려면 플래그 값에 관계없이 `static` 옵션을 유지하는 것을 권장합니다.

| 라이브러리, 애플리케이션 조합 | 설명                                                                                                 |
|:-----------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| 라이브러리는 Angular 9 버전, 애플리케이션은 Angular 8 버전인 경우 | `static` 플래그를 제거하면 라이브러리가 제대로 동작하지 않을 수 있습니다. 애플리케이션이 Angular 8 버전으로 동작한다면 `static` 플래그를 제거하지 마세요. |
| 라이브러리는 Angular 8 버전, 애플리케이션은 Angular 9 버전인 경우 | 플래그 유무에 관계없이 라이브러리는 동작합니다. 플래그를 명시적으로 지정했을 때의 동작은 이전 버전과 같습니다.                                     |


<!--
### What about applications using non-migrated libraries?
-->
### 마이그레이션이 적용되지 않은 라이브러리를 사용하는 경우는 어떻게 하나요?

<!--
Because this is a code cleanup that is a noop, non-migrated libraries will work the same either way.
-->
이 마이그레이션 사항은 코드를 간결하게 만드는 것이지 동작이 변경되는 것이 아닙니다.
라이브러리에 마이그레이션이 적용되지 않아도 동작은 같습니다.

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
