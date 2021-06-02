// #docplaster
// #docregion
import { AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';

import { ChildViewComponent } from './child-view.component';
import { LoggerService } from './logger.service';

@Component({
  selector: 'after-view',
// #docregion template
  template: `
    <div>child view begins</div>
      <app-child-view></app-child-view>
    <div>child view ends</div>`
// #enddocregion template
   + `
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  `
})
// #docregion hooks
export class AfterViewComponent implements  AfterViewChecked, AfterViewInit {
  // #enddocregion hooks
  comment = '';
  // #docregion hooks
  private prevHero = '';

  // `ChildViewComponent` 타입의 뷰 자식 컴포넌트를 참조합니다.
  @ViewChild(ChildViewComponent) viewChild!: ChildViewComponent;

  // #enddocregion hooks
  constructor(private logger: LoggerService) {
    this.logIt('AfterView constructor');
  }

  // #docregion hooks
  ngAfterViewInit() {
    // viewChild는 뷰가 모두 초기화된 이후에 값이 할당됩니다.
    this.logIt('AfterViewInit');
    this.doSomething();
  }

  ngAfterViewChecked() {
    // 뷰에서 변화감지 로직이 동작하면 viewChild가 갱신됩니다.
    if (this.prevHero === this.viewChild.hero) {
      this.logIt('AfterViewChecked (no change)');
    } else {
      this.prevHero = this.viewChild.hero;
      this.logIt('AfterViewChecked');
      this.doSomething();
    }
  }
  // #enddocregion hooks

  // #docregion do-something
  // 동작을 확인하기 위해 `comment` 값을 변경해 봅니다.
  private doSomething() {
    const c = this.viewChild.hero.length > 10 ? `That's a long name` : '';
    if (c !== this.comment) {
      // 컴포넌트의 뷰는 방금 검사를 마쳤기 때문에 한 싸이클 뒤에 실행합니다.
      this.logger.tick_then(() => this.comment = c);
    }
  }
  // #enddocregion do-something

  private logIt(method: string) {
    const child = this.viewChild;
    const message = `${method}: ${child ? child.hero : 'no'} child view`;
    this.logger.log(message);
  }
  // #docregion hooks
  // ...
}
// #enddocregion hooks
