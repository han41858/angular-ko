import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';

// #docregion provide
@Injectable({providedIn: 'root'})
// #docregion class
export class HeroService {
// #enddocregion provide
  private heroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  getHeroes() {
    this.backend.getAll(Hero).then( (heroes: Hero[]) => {
      this.logger.log(`Fetched ${heroes.length} heroes.`);
      this.heroes.push(...heroes); // 캐시에 저장
    });
    return this.heroes;
  }
}
