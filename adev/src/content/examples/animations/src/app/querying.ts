import {Component} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  group,
  query,
  animateChild,
  keyframes,
} from '@angular/animations';

import {HEROES} from './mock-heroes';

@Component({
  selector: 'app-querying',
  template: `
    <nav>
      <button type="button" class="toggle" (click)="show = !show" [disabled]="toggleDisabled">
        뷰 표시 전환
      </button>
    </nav>
    @if (show) {
      <section @query (@query.start)="toggleDisabled = true" (@query.done)="toggleDisabled = false">
        <p>일반 자식 엘리먼트입니다</p>
        @if (show) {
          <p>부모와 함께 나타나고 사라지는 자식 엘리먼트입니다</p>
        }
        <p @animateMe>애니메이션 트리거가 있는 자식 엘리먼트입니다</p>
        <div class="hero">
          <span class="badge">{{ hero.id }}</span>
          <span class="name"
            >{{ hero.name }} <small>(히어로에는 항상 애니메이션이 적용됩니다!)</small></span
          >
        </div>
      </section>
    }
  `,
  styleUrls: ['./querying.css'],
  animations: [
    trigger('query', [
      transition(':enter', [
        style({height: 0}),
        group([
          animate(500, style({height: '*'})),
          query(':enter', [
            style({opacity: 0, transform: 'scale(0)'}),
            animate(2000, style({opacity: 1, transform: 'scale(1)'})),
          ]),
          query('.hero', [
            style({transform: 'translateX(-100%)'}),
            animate('.7s 500ms ease-in', style({transform: 'translateX(0)'})),
          ]),
        ]),
        query('@animateMe', animateChild()),
      ]),
      transition(':leave', [
        style({height: '*'}),
        query('@animateMe', animateChild()),
        group([
          animate('500ms 500ms', style({height: '0', padding: '0'})),
          query(':leave', [
            style({opacity: 1, transform: 'scale(1)'}),
            animate('1s', style({opacity: 0, transform: 'scale(0)'})),
          ]),
          query('.hero', [
            style({transform: 'translateX(0)'}),
            animate('.7s ease-out', style({transform: 'translateX(-100%)'})),
          ]),
        ]),
      ]),
    ]),
    trigger('animateMe', [
      transition(
        '* <=> *',
        animate(
          '500ms cubic-bezier(.68,-0.73,.26,1.65)',
          keyframes([
            style({backgroundColor: 'transparent', color: '*', offset: 0}),
            style({backgroundColor: 'blue', color: 'white', offset: 0.2}),
            style({backgroundColor: 'transparent', color: '*', offset: 1}),
          ]),
        ),
      ),
    ]),
  ],
})
export class Querying {
  toggleDisabled = false;
  show = true;
  hero = HEROES[0];
}
