// #docplaster
// #docregion use-input
import { Component, Input } from '@angular/core'; // Input 심볼을 로드합니다.
// #enddocregion use-input

@Component({
  standalone: true,
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
})

// #docregion use-input
export class ItemDetailComponent {
  @Input() item = ''; // 프로퍼티에 @Input() 데코레이터를 지정합니다.
}
// #enddocregion use-input
