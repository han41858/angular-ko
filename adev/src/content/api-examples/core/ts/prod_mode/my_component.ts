/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component} from '@angular/core';

<<<<<<<< HEAD:integration/platform-server/projects/standalone/src/app/helloworld/hello-world.component.ts
@Component({
  selector: 'hello-world-app',
  standalone: true,
  template: `
    <div>Hello {{ name }}!</div>
  `,
  styles: [`
    div {
      font-weight: bold;
    }
  `]
})
export class HelloWorldComponent {
  name: string = 'world';
}
========
@Component({selector: 'my-component', template: '<h1>My Component</h1>'})
export class MyComponent {}
>>>>>>>> angular.io/main:adev/src/content/api-examples/core/ts/prod_mode/my_component.ts
