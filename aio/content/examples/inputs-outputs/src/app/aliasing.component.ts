/* eslint-disable @angular-eslint/no-input-rename,
                  @angular-eslint/no-inputs-metadata-property,
                  @angular-eslint/no-output-rename,
                  @angular-eslint/no-outputs-metadata-property */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-aliasing',
  template: `
    <p>Save for later item: {{input1}}</p>
    <button type="button" (click)="saveIt()"> Save for later</button>

    <p>Item for wishlist: {{input2}}</p>
    <button type="button" (click)="wishForIt()"> Add to wishlist</button>
  `,
  inputs: ['input1: saveForLaterItem'], // 프로퍼티_이름:클래스_밖에서_사용할_이름
  outputs: ['outputEvent1: saveForLaterEvent']
})
export class AliasingComponent {

  input1 = '';
  outputEvent1: EventEmitter<string> = new EventEmitter<string>();

  @Input('wishListItem') input2 = ''; //  @Input(클래스_밖에서_사용할_이름)
  @Output('wishEvent') outputEvent2 = new EventEmitter<string>(); //  @Output(클래스_밖에서_사용할_이름) 프로퍼티_이름 = ...


  saveIt() {
    console.warn('Child says: emitting outputEvent1 with', this.input1);
    this.outputEvent1.emit(this.input1);
  }

  wishForIt() {
    console.warn('Child says: emitting outputEvent2', this.input2);
    this.outputEvent2.emit(this.input2);
  }

}
