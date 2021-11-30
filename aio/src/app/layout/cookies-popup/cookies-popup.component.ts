import { Component, Inject } from '@angular/core';
import { LocalStorage } from 'app/shared/storage.service';

export const storageKey = 'aio-accepts-cookies';

@Component({
  selector: 'aio-cookies-popup',
  template: `
    <div class="cookies-popup no-print" *ngIf="!hasAcceptedCookies">
      <h2 class="visually-hidden">Cookies concent notice</h2>

      <!--
      This site uses cookies from Google to deliver its services and to analyze traffic.
      -->
      이 사이트는 서비스를 제공하고 트래픽을 분석하기 위해 Google의 쿠키를 사용합니다.

      <div class="actions">
        <a mat-button href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">
          <!--
          Learn more
          -->
          자세하게 알아보기
        </a>
        <button mat-button (click)="acceptCookies()">
          <!--
          OK, got it
          -->
          네, 알겠습니다.
        </button>
      </div>
    </div>
  `,
})
export class CookiesPopupComponent {
  /** Whether the user has already accepted the cookies disclaimer. */
  hasAcceptedCookies: boolean;

  constructor(@Inject(LocalStorage) private storage: Storage) {
    this.hasAcceptedCookies = this.storage.getItem(storageKey) === 'true';
  }

  acceptCookies() {
    this.storage.setItem(storageKey, 'true');
    this.hasAcceptedCookies = true;
  }
}
