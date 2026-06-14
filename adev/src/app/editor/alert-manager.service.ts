/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {inject, Service} from '@angular/core';
import {LOCAL_STORAGE, WINDOW, isMobile} from '@angular/docs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorSnackBar, ErrorSnackBarData} from '../core/services/errors-handling/error-snack-bar';

export const MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
export const WEBCONTAINERS_COUNTER_KEY = 'numberOfWebcontainers';

export enum AlertReason {
  OUT_OF_MEMORY,
  MOBILE,
}

@Service()
export class AlertManager {
  private readonly localStorage = inject(LOCAL_STORAGE);
  private readonly window = inject(WINDOW);
  private snackBar = inject(MatSnackBar);

  init(): void {
    this.listenToLocalStorageValuesChange();

    this.increaseInstancesCounter();

    this.decreaseInstancesCounterOnPageClose();

    this.checkDevice();
  }

  private listenToLocalStorageValuesChange(): void {
    this.window.addEventListener('storage', () => {
      const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances();

      this.validateRunningInstances(countOfRunningInstances);
    });
  }

  // Increase count of the running instances of the webcontainers when user will boot the webcontainer
  private increaseInstancesCounter(): void {
    const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() + 1;

    this.localStorage?.setItem(WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
    this.validateRunningInstances(countOfRunningInstances);
  }

  // Decrease count of running instances of the webcontainers when user close the app.
  private decreaseInstancesCounterOnPageClose(): void {
    this.window.addEventListener('beforeunload', () => {
      const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() - 1;

      this.localStorage?.setItem(WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
      this.validateRunningInstances(countOfRunningInstances);
    });
  }

  private getStoredCountOfWebcontainerInstances(): number {
    const countStoredInLocalStorage = this.localStorage?.getItem(WEBCONTAINERS_COUNTER_KEY);

    if (!countStoredInLocalStorage || Number.isNaN(countStoredInLocalStorage)) {
      return 0;
    }

    return Number(countStoredInLocalStorage);
  }

  private validateRunningInstances(countOfRunningInstances: number): void {
    if (countOfRunningInstances > MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES) {
      this.openSnackBar(AlertReason.OUT_OF_MEMORY);
    }
  }

  private checkDevice() {
    if (isMobile) {
      this.openSnackBar(AlertReason.MOBILE);
    }
  }

  private openSnackBar(reason: AlertReason) {
    let message = '';
    switch (reason) {
      case AlertReason.OUT_OF_MEMORY:
        // message = `Your browser is currently limiting the memory available to run the Angular Tutorials or Playground. If you have multiple tabs open with Tutorials or Playground, please close some of them and refresh this page.`;
        message = `Angular 튜토리얼이나 놀이터를 실행하기에 브라우저 메모리가 부족합니다. 튜토리얼/놀이터 탭을 여러개 열었다면 그 중 몇개를 닫고 새로고침 해보세요.`;
        break;
      case AlertReason.MOBILE:
        // message = `You are running the embedded editor in a mobile device, this may result in an Out of memory error.`;
        message = `현재 모바일 장치에서 내장 에디터를 실행하고 있습니다. 메모리 오류가 발생할 수 있습니다.`;
        break;
    }

    this.snackBar.openFromComponent(ErrorSnackBar, {
      panelClass: 'docs-invert-mode',
      data: {
        message,
        // actionText: 'I understand',
        actionText: '이해했습니다.',
      } satisfies ErrorSnackBarData,
    });
  }
}
