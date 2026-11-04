import {Component} from '@angular/core';
import {OpenCloseChild} from './open-close.4';

@Component({
  selector: 'app-toggle-animations-child-page',
  template: `
    <section>
      <h2>애니메이션 전환</h2>

      <app-open-close-toggle />
    </section>
  `,
  imports: [OpenCloseChild],
})
export class ToggleAnimationsPage {}
