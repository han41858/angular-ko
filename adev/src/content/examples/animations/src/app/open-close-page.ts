import {Component} from '@angular/core';
import {OpenClose} from './open-close';

@Component({
  selector: 'app-open-close-page',
  template: `
    <section>
      <h2>열기/닫기 컴포넌트</h2>
      <input type="checkbox" id="log-checkbox" [checked]="logging" (click)="toggleLogging()" />
      <label for="log-checkbox">애니메이션 이벤트를 콘솔에 기록</label>

      <app-open-close [logging]="logging" />
    </section>
  `,
  imports: [OpenClose],
})
export class OpenClosePage {
  logging = false;

  toggleLogging() {
    this.logging = !this.logging;
  }
}
