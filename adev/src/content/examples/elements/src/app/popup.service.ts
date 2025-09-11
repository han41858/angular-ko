import {ApplicationRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {NgElement, WithProperties} from '@angular/elements';
import {PopupComponent} from './popup.component';

@Injectable()
export class PopupService {
  constructor(
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
  ) {}

  // 동적 로딩 방식을 활용하려면 DOM에 추가하기 전에 필요한 설정을 사전에 모두 해둬야 합니다.
  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement('popup-component');

    // 컴포넌트를 생성하고 엘리먼트와 연결합니다.
    const popupComponentRef = createComponent(PopupComponent, {
      environmentInjector: this.injector,
      hostElement: popup,
    });

    // 화면과 변화 감지기를 연결합니다.
    this.applicationRef.attachView(popupComponentRef.hostView);

    // closed 이벤트를 감지합니다.
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });

    // 메시지 문구를 설정합니다.
    popupComponentRef.instance.message = message;

    // DOM에 추가합니다.
    document.body.appendChild(popup);
  }

  // 커스텀 엘리먼트를 DOM에 추가하는 새로운 방법입니다.
  showAsElement(message: string) {
    // 엘리먼트를 생성합니다.
    const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement(
      'popup-element',
    ) as any;

    // closed 이벤트를 감지합니다.
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

    // 메시지 문구를 설정합니다.
    popupEl.message = message;

    // DOM에 추가합니다.
    document.body.appendChild(popupEl);
  }
}
