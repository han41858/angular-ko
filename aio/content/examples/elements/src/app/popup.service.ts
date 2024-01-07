import {ApplicationRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {NgElement, WithProperties} from '@angular/elements';
import {PopupComponent} from './popup.component';

@Injectable()
export class PopupService {
  constructor(
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
  ) {}

  // 이전에는 DOM에 팝업을 추가하기 전에 동적으로 로딩하는 메서드를 직접 정의해야 했습니다.
  showAsComponent(message: string) {
    // 엘리먼트를 생성합니다.
    const popup = document.createElement('popup-component');

    // 컴포넌트를 생성하고 엘리먼트와 연결합니다.
    const popupComponentRef = createComponent(PopupComponent, {
      environmentInjector: this.injector,
      hostElement: popup,
    });

    // 변화 감지가 동작할 수 있도록 화면과 연결합니다.
    this.applicationRef.attachView(popupComponentRef.hostView);

    // 이벤트를 감지합니다.
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });

    // 메시지 문구를 설정합니다.
    popupComponentRef.instance.message = message;

    // DOM에 추가합니다.
    document.body.appendChild(popup);
  }

  // 이제는 이런 방식으로 커스텀 엘리먼트를 사용할 수 있습니다.
  showAsElement(message: string) {
    // 엘리먼트를 생성합니다.
    const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement(
      'popup-element',
    ) as any;

    // 이벤트를 감지합니다.
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

    // 메시지 문구를 설정합니다.
    popupEl.message = message;

    // DOM에 추가합니다.
    document.body.appendChild(popupEl);
  }
}
