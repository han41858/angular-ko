<!--
# Render templates from a parent component with `ng-content`
-->
# 부모 컴포넌트에서 받은 템플릿 렌더링하기: `ng-content`

<!--
`<ng-content>` is a special element that accepts markup or a template fragment and controls how components render content. It does not render a real DOM element.

Here is an example of a `BaseButton` component that accepts any markup from its parent.

```angular-ts
// ./base-button/base-button.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'button[baseButton]',
  template: `
      <ng-content />
  `,
})
export class BaseButton {}
```

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { BaseButton } from './base-button/base-button.component.ts';

@Component({
  selector: 'app-root',
  imports: [BaseButton],
  template: `
    <button baseButton>
      Next <span class="icon arrow-right" />
    </button>
  `,
})
export class AppComponent {}
```

For more detail, check out the [`<ng-content>` in-depth guide](/guide/components/content-projection) for other ways you can leverage this pattern.
-->
`<ng-content>` 은 마크업이나 템플릿 조각을 받아서 렌더링하는 특수 엘리먼트입니다.
`<ng-content>` 자체가 DOM 엘리먼트로 렌더링되는 것은 아닙니다.

부모 컴포넌트에서 마크업을 받아 렌더링하는 `BaseButton` 컴포넌트를 예제로 봅시다.

```angular-ts
// ./base-button/base-button.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'button[baseButton]',
  template: `
      <ng-content />
  `,
})
export class BaseButton {}
```

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { BaseButton } from './base-button/base-button.component.ts';

@Component({
  selector: 'app-root',
  imports: [BaseButton],
  template: `
    <button baseButton>
      Next <span class="icon arrow-right" />
    </button>
  `,
})
export class AppComponent {}
```

더 자세한 내용은 [`<ng-content>` 심화 가이드](/guide/components/content-projection) 문서를 참고하세요.
