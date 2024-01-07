// #docplaster
// #docregion
// #docregion no-docs, skeleton
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

// #enddocregion skeleton
/**
 * 평가 결과가 거짓으로 평가되면 DOM에 템플릿을 추가합니다.
// #enddocregion no-docs
 *
 * `appUnless`에 할당된 표현식이 참으로 평가되면 템플릿 엘리먼트를 DOM에서 제거합니다.
 *
 * <div *appUnless="errorCount" class="success">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### 사용법
 *
 * - `<div *appUnless="condition">...</div>`
 * - `<ng-template [appUnless]="condition"><div>...</div></ng-template>`
 *
// #docregion no-docs
 */
// #docregion skeleton
@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective {
  // #enddocregion skeleton
  private hasView = false;

  // #docregion ctor
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}
  // #enddocregion ctor

  // #docregion set
  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  // #enddocregion set
  // #docregion skeleton
}
