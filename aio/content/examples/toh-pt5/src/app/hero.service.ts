import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  // #docregion getHero
  getHero(id: number): Observable<Hero> {
    // 지금은 히어로의 `id` 프로퍼티가 항상 존재한다고 간주합니다.
    // 에러를 처리하는 방법은 다음 튜토리얼에 대해 알아봅니다.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  // #enddocregion getHero
}
