import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {PopupComponent} from './popup.component';
import {PopupService} from './popup.service';

@Component({
  selector: 'app-root',
  template: `
    <input #input value="Message" />
    <button type="button" (click)="popup.showAsComponent(input.value)">Show as component</button>
    <button type="button" (click)="popup.showAsElement(input.value)">Show as element</button>
  `,
  providers: [PopupService],
  imports: [PopupComponent],
})
export class AppComponent {
  constructor(
    injector: Injector,
    public popup: PopupService,
  ) {
    // `PopupComponent`를 커스텀 엘리먼트로 변환합니다.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // 커스텀 엘리먼트를 브라우저에 등록합니다.
    customElements.define('popup-element', PopupElement);
  }
}
