<!--
# Testing Attribute Directives
-->

<a id="testing-attribute-directives"></a>

# 어트리뷰트 디렉티브 테스트하기

<!--
An _attribute directive_ modifies the behavior of an element, component or another directive.
Its name reflects the way the directive is applied: as an attribute on a host element.
-->

_어트리뷰트 디렉티브_ 는 엘리먼트, 컴포넌트, 다른 디렉티브의 동작을 변경합니다.
호스트 엘리먼트의 어트리뷰트로 적용하기 때문에 이렇게 부릅니다.

<!--
## Testing the `Highlight` directive
-->

<a id="testing-the-highlight-directive"></a>

## `Highlight` 디렉티브 테스트하기

<!--
The sample application's `Highlight` directive sets the background color of an element based on either a data bound color or a default color \(lightgray\).
It also sets a custom property of the element \(`customProperty`\) to `true` for no reason other than to show that it can.

```ts
import {Directive, inject, input} from '@angular/core';

/**
 * Set backgroundColor for the attached element to highlight color
 * and set the element's customProperty attribute to true
 */
@Directive({
  selector: '[highlight]',
  host: {
    '[style.backgroundColor]': 'bgColor() || defaultColor',
  },
})
export class Highlight {
  readonly defaultColor = 'rgb(211, 211, 211)'; // lightgray

  readonly bgColor = input('', {alias: 'highlight'});
}
```

It's used throughout the application, perhaps most simply in the `About` component:

```ts
@Component({
  imports: [Twain, Highlight],
  template: `
    <h2 highlight="skyblue">About</h2>
    <h3>Quote of the day:</h3>
    <twain-quote />
  `,
})
export class About {}
```

Testing the specific use of the `Highlight` directive within the `About` component requires only the techniques explored in the ["Nested component tests"](guide/testing/components-scenarios#nested-component-tests) section of [Component testing scenarios](guide/testing/components-scenarios).

```ts
let fixture: ComponentFixture<About>;

beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [TwainService, UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });
  fixture = TestBed.createComponent(About);
  await fixture.whenStable();
});

it('should have skyblue <h2>', () => {
  const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
  const bgColor = h2.style.backgroundColor;
  expect(bgColor).toBe('skyblue');
});
```

However, testing a single use case is unlikely to explore the full range of a directive's capabilities.
Finding and testing all components that use the directive is tedious, brittle, and almost as unlikely to afford full coverage.

_Class-only tests_ might be helpful, but attribute directives like this one tend to manipulate the DOM.
Isolated unit tests don't touch the DOM and, therefore, do not inspire confidence in the directive's efficacy.

A better solution is to create an artificial test component that demonstrates all ways to apply the directive.

```angular-ts
@Component({
  imports: [Highlight],
  template: `
    <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />
  `,
})
class Test {}
```

<img alt="HighlightDirective spec in action" src="assets/images/guide/testing/highlight-directive-spec.png">

HELPFUL: The `<input>` case binds the `Highlight` to the name of a color value in the input box.
The initial value is the word "cyan" which should be the background color of the input box.

Here are some tests of this component:

```ts
let fixture: ComponentFixture<Test>;
let des: DebugElement[]; // the three elements w/ the directive

beforeEach(async () => {
  fixture = TestBed.createComponent(Test);
  await fixture.whenStable();

  // all elements with an attached Highlight
  des = fixture.debugElement.queryAll(By.directive(Highlight));
});

// color tests
it('should have three highlighted elements', () => {
  expect(des.length).toBe(3);
});

it('should color 1st <h2> background "yellow"', () => {
  const bgColor = des[0].nativeElement.style.backgroundColor;
  expect(bgColor).toBe('yellow');
});

it('should color 2nd <h2> background w/ default color', () => {
  const dir = des[1].injector.get(Highlight);
  const bgColor = des[1].nativeElement.style.backgroundColor;
  expect(bgColor).toBe(dir.defaultColor);
});

it('should bind <input> background to value color', async () => {
  // easier to work with nativeElement
  const input = des[2].nativeElement as HTMLInputElement;
  expect(input.style.backgroundColor, 'initial backgroundColor').toBe('cyan');

  input.value = 'green';

  // Dispatch a DOM event so that Angular responds to the input value change.
  input.dispatchEvent(new Event('input'));
  await fixture.whenStable();

  expect(input.style.backgroundColor, 'changed backgroundColor').toBe('green');
});

it('bare <h2> should not have a backgroundColor', () => {
  // the h2 without the Highlight directive
  const bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));

  expect(bareH2.styles.backgroundColor).toBeUndefined();
});
```

A few techniques are noteworthy:

- The `By.directive` predicate is a great way to get the elements that have this directive _when their element types are unknown_
- The [`:not` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:not) in `By.css('h2:not([highlight])')` helps find `<h2>` elements that _do not_ have the directive.
  `By.css('*:not([highlight])')` finds _any_ element that does not have the directive.

- `DebugElement.styles` affords access to element styles even in the absence of a real browser, thanks to the `DebugElement` abstraction.
  But feel free to exploit the `nativeElement` when that seems easier or more clear than the abstraction.

- Angular adds a directive to the injector of the element to which it is applied.
  The test for the default color uses the injector of the second `<h2>` to get its `Highlight` instance and its `defaultColor`.

- `DebugElement.properties` affords access to the artificial custom property that is set by the directive
-->

예제 애플리케이션의 `Highlight` 디렉티브는 데이터 바인딩된 색상이나 기본 색상\(lightgray\)을 엘리먼트의 배경색으로 지정합니다.
엘리먼트의 커스텀 프로퍼티\(`customProperty`\)도 `true`로 설정하는데, 이는 이런 동작도 가능하다는 것을 보여주기 위한 것입니다.

```ts
import {Directive, inject, input} from '@angular/core';

/**
 * 적용된 엘리먼트의 backgroundColor를 강조 색상으로 지정하고
 * 엘리먼트의 customProperty 어트리뷰트를 true로 설정합니다
 */
@Directive({
  selector: '[highlight]',
  host: {
    '[style.backgroundColor]': 'bgColor() || defaultColor',
  },
})
export class Highlight {
  readonly defaultColor = 'rgb(211, 211, 211)'; // 밝은 회색

  readonly bgColor = input('', {alias: 'highlight'});
}
```

이 디렉티브는 애플리케이션 곳곳에서 사용됩니다.
가장 간단한 예는 `About` 컴포넌트입니다.

```ts
@Component({
  imports: [Twain, Highlight],
  template: `
    <h2 highlight="skyblue">About</h2>
    <h3>Quote of the day:</h3>
    <twain-quote />
  `,
})
export class About {}
```

`About` 컴포넌트 안에서 `Highlight` 디렉티브가 사용되는 방식을 테스트하려면 [컴포넌트 테스트 시나리오](guide/testing/components-scenarios)의 [중첩 컴포넌트 테스트](guide/testing/components-scenarios#nested-component-tests)에서 알아본 방법만으로 충분합니다.

```ts
let fixture: ComponentFixture<About>;

beforeEach(async () => {
  TestBed.configureTestingModule({
    providers: [TwainService, UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });
  fixture = TestBed.createComponent(About);
  await fixture.whenStable();
});

it('should have skyblue <h2>', () => {
  const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
  const bgColor = h2.style.backgroundColor;
  expect(bgColor).toBe('skyblue');
});
```

하지만 사용 사례 하나만 테스트해서는 디렉티브의 기능 전체를 확인하기 어렵습니다.
디렉티브를 사용하는 모든 컴포넌트를 찾아 테스트하는 일은 번거롭고 변경에 취약하며, 이 방법 역시 모든 기능을 검증하기 어렵습니다.

_클래스만 테스트_ 하는 것도 도움이 될 수 있지만, 이런 어트리뷰트 디렉티브는 주로 DOM을 조작합니다.
독립적인 단위 테스트는 DOM을 다루지 않으므로 디렉티브가 제대로 동작한다고 확신하기 어렵습니다.

디렉티브를 적용하는 모든 방식을 보여주는 테스트 전용 컴포넌트를 만드는 것이 더 좋습니다.

```angular-ts
@Component({
  imports: [Highlight],
  template: `
    <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />
  `,
})
class Test {}
```

<img alt="HighlightDirective 테스트 실행 화면" src="assets/images/guide/testing/highlight-directive-spec.png">

참고: `<input>` 예제는 입력 필드에 있는 색상 이름을 `Highlight`에 바인딩합니다.
초기값은 "cyan"이므로 입력 필드의 배경색도 이 색이어야 합니다.

이 컴포넌트의 테스트는 다음과 같습니다.

```ts
let fixture: ComponentFixture<Test>;
let des: DebugElement[]; // 디렉티브가 적용된 엘리먼트 세 개

beforeEach(async () => {
  fixture = TestBed.createComponent(Test);
  await fixture.whenStable();

  // Highlight가 적용된 모든 엘리먼트
  des = fixture.debugElement.queryAll(By.directive(Highlight));
});

// 색상 테스트
it('should have three highlighted elements', () => {
  expect(des.length).toBe(3);
});

it('should color 1st <h2> background "yellow"', () => {
  const bgColor = des[0].nativeElement.style.backgroundColor;
  expect(bgColor).toBe('yellow');
});

it('should color 2nd <h2> background w/ default color', () => {
  const dir = des[1].injector.get(Highlight);
  const bgColor = des[1].nativeElement.style.backgroundColor;
  expect(bgColor).toBe(dir.defaultColor);
});

it('should bind <input> background to value color', async () => {
  // nativeElement를 사용하면 더 간단합니다
  const input = des[2].nativeElement as HTMLInputElement;
  expect(input.style.backgroundColor, 'initial backgroundColor').toBe('cyan');

  input.value = 'green';

  // Angular가 입력값 변경에 반응하도록 DOM 이벤트를 발생시킵니다.
  input.dispatchEvent(new Event('input'));
  await fixture.whenStable();

  expect(input.style.backgroundColor, 'changed backgroundColor').toBe('green');
});

it('bare <h2> should not have a backgroundColor', () => {
  // Highlight 디렉티브가 없는 h2
  const bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));

  expect(bareH2.styles.backgroundColor).toBeUndefined();
});
```

몇 가지 방법을 눈여겨보세요.

- `By.directive` 조건식은 _엘리먼트 타입을 모를 때_ 해당 디렉티브가 적용된 엘리먼트를 찾기에 좋습니다.
- `By.css('h2:not([highlight])')`의 [`:not` 가상 클래스](https://developer.mozilla.org/docs/Web/CSS/:not)는 디렉티브가 _적용되지 않은_ `<h2>` 엘리먼트를 찾습니다.
  `By.css('*:not([highlight])')`는 이 디렉티브가 적용되지 않은 _모든_ 엘리먼트를 찾습니다.

- `DebugElement`가 제공하는 추상화 덕분에 실제 브라우저가 없어도 `DebugElement.styles`로 엘리먼트 스타일에 접근할 수 있습니다.
  다만 `nativeElement`를 사용하는 것이 더 간단하거나 명확하다면 이를 사용해도 됩니다.

- Angular는 디렉티브가 적용된 엘리먼트의 인젝터에 디렉티브를 추가합니다.
  기본 색상 테스트에서는 두 번째 `<h2>`의 인젝터로 `Highlight` 인스턴스와 `defaultColor`를 가져옵니다.

- `DebugElement.properties`로 디렉티브가 설정한 테스트용 커스텀 프로퍼티에 접근할 수 있습니다.

<!--
## Testing a directive in isolation

A directive can be created on its own with `TestBed.createDirective()`, which returns a `DirectiveFixture`. Alternatively, you can render it through a component's template.
The `Highlight` directive can be tested this way, using a local test component's input to control the directive.

```ts
@Component({
  imports: [Highlight],
  template: `<p [highlight]="color()">{{ color() }}</p>`,
})
class Test {
  readonly color = input('');
}

describe('Highlight', () => {
  let fixture: ComponentFixture<Test>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Test);
    await fixture.whenStable();
  });

  it('should use the specified color once an input is provided', async () => {
    fixture.componentRef.setInput('color', 'blue');
    await fixture.whenStable();

    const p = fixture.nativeElement.querySelector('p');
    expect(p.style.backgroundColor).toBe('blue');
  });
});
```
-->

<a id="testing-a-directive-in-isolation"></a>

## 디렉티브를 독립적으로 테스트하기

`TestBed.createDirective()`로 디렉티브를 독립적으로 생성하면 `DirectiveFixture`를 반환합니다. 컴포넌트 템플릿을 통해 디렉티브를 렌더링할 수도 있습니다.
다음은 로컬 테스트 컴포넌트의 입력값으로 `Highlight` 디렉티브를 제어하는 테스트입니다.

```ts
@Component({
  imports: [Highlight],
  template: `<p [highlight]="color()">{{ color() }}</p>`,
})
class Test {
  readonly color = input('');
}

describe('Highlight', () => {
  let fixture: ComponentFixture<Test>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Test);
    await fixture.whenStable();
  });

  it('should use the specified color once an input is provided', async () => {
    fixture.componentRef.setInput('color', 'blue');
    await fixture.whenStable();

    const p = fixture.nativeElement.querySelector('p');
    expect(p.style.backgroundColor).toBe('blue');
  });
});
```
