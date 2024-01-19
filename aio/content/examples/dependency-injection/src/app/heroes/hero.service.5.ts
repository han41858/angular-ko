// #docregion
import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';

@Injectable({providedIn:
  'root'
})
export class SomeService {}

  // #docregion run-in-context
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      inject(SomeService); // 서비스 인스턴슬를 받아온 후에 원하는 동작을 실행합니다.
    });
  }
}
// #enddocregion run-in-context
