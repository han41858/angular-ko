// #docplaster
// #docregion
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero$!: Observable<Hero>;

  constructor(private router: Router, private service: HeroService) {}

  // #docregion id-input
  @Input()
  set id(heroId: string) {
    this.hero$ = this.service.getHero(heroId);
  }
  // #enddocregion id-input

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // HeroList 컴포넌트에 하이라이트를 표시하기 위해 히어로의 id가 존재하면 전달합니다.
    // 'foo' 프로퍼티는 사용하지 않지만 이렇게 전달할 수도 있습니다.
    this.router.navigate(['/superheroes', {id: heroId, foo: 'foo'}]);
  }
}
