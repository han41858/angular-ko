<!--
# Testing Pipes
-->

<a id="testing-pipes"></a>

# 파이프 테스트하기

<!--
You can test [pipes](guide/templates/pipes) without the Angular testing utilities.
-->

Angular 테스트 유틸리티 없이도 [파이프](guide/templates/pipes)를 테스트할 수 있습니다.

<!--
## Testing the `TitleCasePipe`
-->

<a id="testing-the-titlecasepipe"></a>

## `TitleCasePipe` 테스트하기

<!--
A pipe class has one method, `transform`, that manipulates the input value into a transformed output value.
The `transform` implementation rarely interacts with the DOM.
Most pipes have no dependence on Angular other than the `@Pipe` metadata and an interface.

Consider a `TitleCasePipe` that capitalizes the first letter of each word.
Here's an implementation with a regular expression.

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titlecase', pure: true})
/** Transform to Title Case: uppercase the first letter of the words in a string. */
export class TitleCasePipe implements PipeTransform {
  transform(input: string): string {
    return input.length === 0
      ? ''
      : input.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
  }
}
```

Anything that uses a regular expression is worth testing thoroughly. You can use standard unit testing techniques to explore the expected cases and the edge cases.

```ts
describe('TitleCasePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new TitleCasePipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  // ... more tests ...
});
```
-->

파이프 클래스에는 입력값을 변환해서 출력하는 `transform` 메서드가 있습니다.
`transform` 구현이 DOM과 상호작용하는 경우는 드뭅니다.
대부분의 파이프는 `@Pipe` 메타데이터와 인터페이스 외에는 Angular에 의존하지 않습니다.

각 단어의 첫 글자를 대문자로 바꾸는 `TitleCasePipe`를 살펴봅시다.
정규 표현식으로 구현하면 다음과 같습니다.

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titlecase', pure: true})
/** 문자열에 있는 각 단어의 첫 글자를 대문자로 바꿉니다. */
export class TitleCasePipe implements PipeTransform {
  transform(input: string): string {
    return input.length === 0
      ? ''
      : input.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
  }
}
```

정규 표현식을 사용하는 코드는 꼼꼼하게 테스트하는 것이 좋습니다.
일반적인 단위 테스트 방법으로 예상하는 경우와 경계 사례를 검증할 수 있습니다.

```ts
describe('TitleCasePipe', () => {
  // 이 파이프는 상태가 없는 순수 함수이므로 BeforeEach가 필요하지 않습니다
  const pipe = new TitleCasePipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  // ... 추가 테스트 ...
});
```

<!--
## Writing DOM tests to support a pipe test
-->

<a id="writing-dom-tests-to-support-a-pipe-test"></a>

## 파이프 테스트를 보완하는 DOM 테스트 작성하기

<!--
These are tests of the pipe _in isolation_.
They can't tell if the `TitleCasePipe` is working properly as applied in the application components.

Consider adding component tests such as this one:

```ts
it('should convert hero name to Title Case', async () => {
  // get the name's input and display elements from the DOM
  const hostElement: HTMLElement = harness.routeNativeElement!;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // simulate user entering a new name into the input box
  nameInput.value = 'quick BROWN  fOx';

  // Dispatch a DOM event so that Angular learns of input value change.
  nameInput.dispatchEvent(new Event('input'));

  // Wait for Angular to update the display binding through the title pipe
  await harness.fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```
-->

위 테스트는 파이프를 _독립적으로_ 테스트합니다.
따라서 애플리케이션 컴포넌트에 적용한 `TitleCasePipe`가 제대로 동작하는지는 알 수 없습니다.

다음과 같은 컴포넌트 테스트도 추가해 보세요.

```ts
it('should convert hero name to Title Case', async () => {
  // DOM에서 이름 입력 엘리먼트와 표시 엘리먼트를 가져옵니다
  const hostElement: HTMLElement = harness.routeNativeElement!;
  const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
  const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

  // 사용자가 입력 필드에 새 이름을 입력하는 상황을 재현합니다
  nameInput.value = 'quick BROWN  fOx';

  // Angular가 입력값 변경을 알 수 있도록 DOM 이벤트를 발생시킵니다.
  nameInput.dispatchEvent(new Event('input'));

  // Angular가 title 파이프로 화면의 바인딩을 갱신할 때까지 기다립니다
  await harness.fixture.whenStable();

  expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
```
