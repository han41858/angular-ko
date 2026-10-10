<!--
# Custom service worker scripts
-->

<a id="custom-service-worker-scripts"></a>

# 커스텀 서비스 워커 스크립트

<!--
While the Angular service worker provides excellent capabilities, you may need to add custom functionality such as handling push notifications, background sync, or other service worker events. You can create a custom service worker script that imports and extends the Angular service worker.
-->

Angular 서비스 워커는 다양한 기능을 제공하지만, 푸시 알림 처리, 백그라운드 동기화, 그 밖의 서비스 워커 이벤트 처리와 같은 커스텀 기능을 추가해야 할 수 있습니다.
Angular 서비스 워커를 불러오고 확장하는 커스텀 서비스 워커 스크립트를 만들 수 있습니다.

<!--
## Creating a custom service worker
-->

<a id="creating-a-custom-service-worker"></a>

## 커스텀 서비스 워커 생성하기

<!--
To create a custom service worker that extends Angular's functionality:

1. Create a custom service worker file (e.g., `custom-sw.js`) in your `src` directory:

```js
// Import the Angular service worker
importScripts('./ngsw-worker.js');

(function () {
  'use strict';

  // Add custom notification click handler
  self.addEventListener('notificationclick', (event) => {
    console.log('Custom notification click handler');
    console.log('Notification details:', event.notification);

    // Handle notification click - open URL if provided
    if (clients.openWindow && event.notification.data.url) {
      event.waitUntil(clients.openWindow(event.notification.data.url));
      console.log('Opening URL:', event.notification.data.url);
    }
  });

  // Add custom background sync handler
  self.addEventListener('sync', (event) => {
    console.log('Custom background sync handler');

    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });

  function doBackgroundSync() {
    // Implement your background sync logic here
    return fetch('https://example.com/api/sync')
      .then((response) => response.json())
      .then((data) => console.log('Background sync completed:', data))
      .catch((error) => console.error('Background sync failed:', error));
  }
})();
```

2. Update your `angular.json` file to use the custom service worker:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "app/src/custom-sw.js"
            ]
          }
        }
      }
    }
  }
}
```

3. Configure the service worker registration to use your custom script:

```ts
import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('custom-sw.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```
-->

Angular의 기능을 확장하는 커스텀 서비스 워커는 다음과 같이 생성합니다:

1. `src` 디렉터리에 커스텀 서비스 워커 파일(예: `custom-sw.js`)을 생성합니다:

```js
// Angular 서비스 워커를 불러옵니다.
importScripts('./ngsw-worker.js');

(function () {
  'use strict';

  // 커스텀 알림 클릭 핸들러를 추가합니다.
  self.addEventListener('notificationclick', (event) => {
    console.log('Custom notification click handler');
    console.log('Notification details:', event.notification);

    // 알림 클릭을 처리합니다. URL이 있으면 해당 URL을 엽니다.
    if (clients.openWindow && event.notification.data.url) {
      event.waitUntil(clients.openWindow(event.notification.data.url));
      console.log('Opening URL:', event.notification.data.url);
    }
  });

  // 커스텀 백그라운드 동기화 핸들러를 추가합니다.
  self.addEventListener('sync', (event) => {
    console.log('Custom background sync handler');

    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });

  function doBackgroundSync() {
    // 여기에 백그라운드 동기화 로직을 구현합니다.
    return fetch('https://example.com/api/sync')
      .then((response) => response.json())
      .then((data) => console.log('Background sync completed:', data))
      .catch((error) => console.error('Background sync failed:', error));
  }
})();
```

2. 커스텀 서비스 워커를 사용하도록 `angular.json` 파일을 갱신합니다:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "app/src/custom-sw.js"
            ]
          }
        }
      }
    }
  }
}
```

3. 커스텀 스크립트를 사용하도록 서비스 워커 등록을 설정합니다:

```ts
import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('custom-sw.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```

<!--
### Best practices for custom service workers
-->

<a id="best-practices-for-custom-service-workers"></a>

### 커스텀 서비스 워커 권장 사항

<!--
When extending the Angular service worker:

- **Always import the Angular service worker first** using `importScripts('./ngsw-worker.js')` to ensure you get all the caching and update functionality
- **Wrap your custom code in an IIFE** (Immediately Invoked Function Expression) to avoid polluting the global scope
- **Use `event.waitUntil()`** for asynchronous operations to ensure they complete before the service worker is terminated
- **Test thoroughly** in both development and production environments
- **Handle errors gracefully** to prevent your custom code from breaking the Angular service worker functionality
-->

Angular 서비스 워커를 확장할 때는 다음 사항을 지키세요:

- 모든 캐싱과 업데이트 기능을 사용할 수 있도록 `importScripts('./ngsw-worker.js')`로 **Angular 서비스 워커를 항상 먼저 불러오세요**.
- 전역 스코프를 오염시키지 않도록 **커스텀 코드를 IIFE**(즉시 실행 함수 표현식)로 감싸세요.
- 비동기 작업에는 **`event.waitUntil()`을 사용해서** 서비스 워커가 종료되기 전에 작업이 완료되도록 하세요.
- 개발 환경과 프로덕션 환경 모두에서 **충분히 테스트하세요**.
- 커스텀 코드가 Angular 서비스 워커의 기능을 방해하지 않도록 **에러를 적절하게 처리하세요**.

<!--
### Common use cases
-->

<a id="common-use-cases"></a>

### 일반적인 사용 사례

<!--
Custom service workers are commonly used for:

- **Push notifications**: Handle incoming push messages and display notifications
- **Background sync**: Sync data when the network connection is restored
- **Custom navigation**: Handle special routing or offline page scenarios
-->

커스텀 서비스 워커는 주로 다음과 같은 용도로 사용합니다:

- **푸시 알림**: 수신한 푸시 메시지를 처리하고 알림 표시하기
- **백그라운드 동기화**: 네트워크 연결이 복구되었을 때 데이터 동기화하기
- **커스텀 탐색**: 특수한 라우팅이나 오프라인 페이지 상황 처리하기
