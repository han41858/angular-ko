import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {Popup} from './popup';
import {PopupService} from './popup.service';

@Component({
  selector: 'app-root',
  template: `
    <input #input value="메시지" />
    <button type="button" (click)="popup.showAsComponent(input.value)">컴포넌트로 표시</button>
    <button type="button" (click)="popup.showAsElement(input.value)">엘리먼트로 표시</button>
  `,
  providers: [PopupService],
  imports: [Popup],
})
export class App {
  constructor(
    injector: Injector,
    public popup: PopupService,
  ) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(Popup, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
