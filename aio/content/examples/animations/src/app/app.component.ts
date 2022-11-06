// #docplaster
// #docregion imports
import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

// #enddocregion imports
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

// #docregion decorator, toggle-app-animations, define
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
// #enddocregion decorator
    slideInAnimation
// #docregion decorator
// #enddocregion toggle-app-animations, define
    // 애니메이션 트리거는 여기에 작성합니다.
// #docregion toggle-app-animations, define
  ]
})
// #enddocregion decorator, define
export class AppComponent {
  @HostBinding('@.disabled')
  public animationsDisabled = false;
// #enddocregion toggle-app-animations

// #docregion get-route-animations-data
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
// #enddocregion get-route-animations-data

  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
// #docregion toggle-app-animations
}
// #enddocregion toggle-app-animations
