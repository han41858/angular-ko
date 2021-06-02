// #docregion
import { Directive, OnInit, OnDestroy } from '@angular/core';

import { LoggerService } from './logger.service';

// #docregion spy-directive
let nextId = 1;

// 엘리먼트에 스파이 디렉티브를 자유롭게 적용합니다.
// 사용방법: <div appSpy>...</div>
@Directive({selector: '[appSpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  private id = nextId++;

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log(`Spy #${this.id} onInit`);
  }

  ngOnDestroy() {
    this.logger.log(`Spy #${this.id} onDestroy`);
  }
}
// #enddocregion spy-directive
