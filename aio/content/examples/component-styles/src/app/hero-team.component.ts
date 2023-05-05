import { Component, Input } from '@angular/core';
import { Hero } from './hero';

// #docregion stylelink
@Component({
  selector: 'app-hero-team',
  template: `
    <!-- AOT 컴파일러가 스타일 파일을 참조하려면 상대주소로 지정해야 합니다. -->
    <link rel="stylesheet" href="../assets/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`
})
// #enddocregion stylelink
export class HeroTeamComponent {
  @Input() hero!: Hero;
}
