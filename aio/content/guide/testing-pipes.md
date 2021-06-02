<!--
# Testing Pipes
-->
# 파이프 테스트하기

<!--
You can test [pipes](guide/pipes) without the Angular testing utilities.

<div class="alert is-helpful">

  For the sample application that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

</div>
-->
[파이프](guide/pipes)는 Angular 전용 테스트 기능을 활용하지 않아도 테스트할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱을 직접 확인하려면 <live-example name="testing" embedded-style noDownload>sample app</live-example> 링크를 참고하세요.

이 문서에서 다루는 테스트 기능이 동작하는 것을 직접 확인하려면 <live-example name="testing" stackblitz="specs" noDownload>tests</live-example> 링크를 확인하세요.

</div>


<!--
## Testing the `TitleCasePipe`
-->
##  `TitleCasePipe` 테스트하기

<!--
A pipe class has one method, `transform`, that manipulates the input
value into a transformed output value.
The `transform` implementation rarely interacts with the DOM.
Most pipes have no dependence on Angular other than the `@Pipe`
metadata and an interface.

Consider a `TitleCasePipe` that capitalizes the first letter of each word.
Here's an implementation with a regular expression.

<code-example path="testing/src/app/shared/title-case.pipe.ts" header="app/shared/title-case.pipe.ts"></code-example>

Anything that uses a regular expression is worth testing thoroughly.
Use simple Jasmine to explore the expected cases and the edge cases.

<code-example path="testing/src/app/shared/title-case.pipe.spec.ts" region="excerpt" header="app/shared/title-case.pipe.spec.ts"></code-example>
-->
파이프 클래스에는 `transform` 메서드가 존재하는데, 이 메서드는 파이프에 들어오는 입력값을 변환해서 반환하는 메서드입니다.
`transform` 메서드가 DOM과 연동되는 경우는 거의 없습니다.
파이프는 대부분 `@Pipe` 메타데이터와 `PipeTransform` 인터페이스 외에는 의존성 객체를 가지지도 않습니다.

`TitleCasePipe`는 각 단어의 첫 글자를 대문자로 변환하는 파이프입니다.
이 기능은 정규표현식으로 구현되어 있습니다.

<code-example path="testing/src/app/shared/title-case.pipe.ts" header="app/shared/title-case.pipe.ts"></code-example>

정규표현식을 활용하는 로직은 되도록 많은 경우를 테스트하는 것이 좋습니다.
이 중 몇가지 경우만 생각해보면 Jasmine을 사용해서 이렇게 테스트할 수 있습니다.

<code-example path="testing/src/app/shared/title-case.pipe.spec.ts" region="excerpt" header="app/shared/title-case.pipe.spec.ts"></code-example>


{@a write-tests}

<!--
## Writing DOM tests to support a pipe test
-->
## DOM 테스트 로직 추가하기

<!--
These are tests of the pipe _in isolation_.
They can't tell if the `TitleCasePipe` is working properly as applied in the application components.

Consider adding component tests such as this one:

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe" header="app/hero/hero-detail.component.spec.ts (pipe test)"></code-example>
-->
파이프를 테스트하려면 이것만으로도 충분합니다.
하지만 이 방식으로는 애플리케이션 컴포넌트에서도 `TitleCasePipe`가 제대로 동작하는지는 확인할 수 없습니다.

이 내용을 검사하는 컴포넌트 테스트 코드는 이렇게 구현할 수 있습니다:

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe" header="app/hero/hero-detail.component.spec.ts (파이프 테스트하기)"></code-example>
