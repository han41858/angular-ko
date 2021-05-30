/* tslint:disable:forin */
// #docregion
import { Component, DoCheck, Input } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'do-check',
  template: `
  <div class="info">
    <p>{{hero.name}} can {{power}}</p>

    <h3>Change Log</h3>
    <div *ngFor="let chg of changeLog" class="log">{{chg}}</div>
  </div>
  `
})
export class DoCheckComponent implements DoCheck {
  @Input() hero: Hero;
  @Input() power: string;

  changeDetected = false;
  changeLog: string[] = [];
  oldHeroName = '';
  oldPower = '';
  oldLogLength = 0;
  noChangeCount = 0;

  // #docregion ng-do-check
  ngDoCheck() {

    if (this.hero.name !== this.oldHeroName) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
      this.oldHeroName = this.hero.name;
    }

    if (this.power !== this.oldPower) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
      this.oldPower = this.power;
    }

    if (this.changeDetected) {
        this.noChangeCount = 0;
    } else {
        // 컴포넌트의 내용이 변경되지 않았으면 함수가 몇번 실행되었는지 로그를 출력합니다.
        const count = this.noChangeCount += 1;
        const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // "no change" 메시지를 추가합니다.
          this.changeLog.push(noChangeMsg);
        } else {
          // 마지막에 추가한 "no change" 메시지를 수정합니다.
          this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }

    this.changeDetected = false;
  }
  // #enddocregion ng-do-check

  reset() {
    this.changeDetected = true;
    this.changeLog = [];
  }
}
