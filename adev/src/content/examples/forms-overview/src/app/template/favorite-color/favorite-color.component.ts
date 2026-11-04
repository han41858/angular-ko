import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-template-favorite-color',
  template: ` 좋아하는 색상: <input type="text" [(ngModel)]="favoriteColor" /> `,
  imports: [FormsModule],
})
export class FavoriteColorTemplate {
  favoriteColor = signal('');
}
