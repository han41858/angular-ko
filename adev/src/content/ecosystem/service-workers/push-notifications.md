<!--
# Push notifications
-->

<a id="push-notifications"></a>

# 푸시 알림

<!--
Push notifications are a compelling way to engage users.
Through the power of service workers, notifications can be delivered to a device even when your application is not in focus.

The Angular service worker enables the display of push notifications and the handling of notification click events.

HELPFUL: When using the Angular service worker, push notification interactions are handled using the `SwPush` service.
To learn more about the browser APIs involved see [Push API](https://developer.mozilla.org/docs/Web/API/Push_API) and [Using the Notifications API](https://developer.mozilla.org/docs/Web/API/Notifications_API/Using_the_Notifications_API).
-->

푸시 알림은 사용자의 참여를 유도하는 효과적인 방법입니다.
서비스 워커를 활용하면 애플리케이션에 포커스가 없는 상태에서도 기기에 알림을 전달할 수 있습니다.

Angular 서비스 워커는 푸시 알림 표시와 알림 클릭 이벤트 처리를 지원합니다.

도움말: Angular 서비스 워커에서는 `SwPush` 서비스로 푸시 알림과의 상호작용을 처리합니다.
관련 브라우저 API에 대한 자세한 내용은 [Push API](https://developer.mozilla.org/docs/Web/API/Push_API)와 [Notifications API 사용하기](https://developer.mozilla.org/docs/Web/API/Notifications_API/Using_the_Notifications_API)를 참고하세요.

<!--
## Notification payload
-->

<a id="notification-payload"></a>

## 알림 페이로드

<!--
Invoke push notifications by pushing a message with a valid payload.
See `SwPush` for guidance.

HELPFUL: In Chrome, you can test push notifications without a backend.
Open Devtools -> Application -> Service Workers and use the `Push` input to send a JSON notification payload.
-->

유효한 페이로드를 담은 메시지를 푸시해서 푸시 알림을 실행합니다.
사용법은 `SwPush`를 참고하세요.

도움말: Chrome에서는 백엔드 없이 푸시 알림을 테스트할 수 있습니다.
개발자 도구 -> Application -> Service Workers를 열고 `Push` 입력란을 사용해서 JSON 알림 페이로드를 보내세요.

<!--
## Notification click handling
-->

<a id="notification-click-handling"></a>

## 알림 클릭 처리하기

<!--
The default behavior for the `notificationclick` event is to close the notification and notify `SwPush.notificationClicks`.

You can specify an additional operation to be executed on `notificationclick` by adding an `onActionClick` property to the `data` object, and providing a `default` entry.
This is especially useful for when there are no open clients when a notification is clicked.

```json
{
  "notification": {
    "title": "New Notification!",
    "data": {
      "onActionClick": {
        "default": {"operation": "openWindow", "url": "foo"}
      }
    }
  }
}
```
-->

`notificationclick` 이벤트의 기본 동작은 알림을 닫고 `SwPush.notificationClicks`에 알리는 것입니다.

`data` 객체에 `onActionClick` 프로퍼티를 추가하고 `default` 항목을 지정하면, `notificationclick`에서 실행할 추가 작업을 지정할 수 있습니다.
이는 알림을 클릭했을 때 열려 있는 클라이언트가 없는 경우에 특히 유용합니다.

```json
{
  "notification": {
    "title": "New Notification!",
    "data": {
      "onActionClick": {
        "default": {"operation": "openWindow", "url": "foo"}
      }
    }
  }
}
```

<!--
### Operations
-->

<a id="operations"></a>

### 작업

<!--
The Angular service worker supports the following operations:

| Operations                  | Details                                                                                                                                          |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `openWindow`                | Opens a new tab at the specified URL.                                                                                                            |
| `focusLastFocusedOrOpen`    | Focuses the last focused client. If there is no client open, then it opens a new tab at the specified URL.                                       |
| `navigateLastFocusedOrOpen` | Focuses the last focused client and navigates it to the specified URL. If there is no client open, then it opens a new tab at the specified URL. |
| `sendRequest`               | Send a simple GET request to the specified URL.                                                                                                  |

IMPORTANT: URLs are resolved relative to the service worker's registration scope.<br />If an `onActionClick` item does not define a `url`, then the service worker's registration scope is used.
-->

Angular 서비스 워커는 다음 작업을 지원합니다:

| 작업                        | 설명                                                                                                                                        |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `openWindow`                | 지정한 URL을 새 탭에서 엽니다.                                                                                                              |
| `focusLastFocusedOrOpen`    | 마지막으로 포커스가 있었던 클라이언트에 포커스를 줍니다. 열려 있는 클라이언트가 없으면 지정한 URL을 새 탭에서 엽니다.                       |
| `navigateLastFocusedOrOpen` | 마지막으로 포커스가 있었던 클라이언트에 포커스를 주고 지정한 URL로 이동합니다. 열려 있는 클라이언트가 없으면 지정한 URL을 새 탭에서 엽니다. |
| `sendRequest`               | 지정한 URL로 단순 GET 요청을 보냅니다.                                                                                                      |

중요: URL은 서비스 워커가 등록된 스코프를 기준으로 해석합니다.<br />`onActionClick` 항목에 `url`이 없으면 서비스 워커가 등록된 스코프를 사용합니다.

<!--
### Actions
-->

<a id="actions"></a>

### 액션

<!--
Actions offer a way to customize how the user can interact with a notification.

Using the `actions` property, you can define a set of available actions.
Each action is represented as an action button that the user can click to interact with the notification.

In addition, using the `onActionClick` property on the `data` object, you can tie each action to an operation to be performed when the corresponding action button is clicked:

```json
{
  "notification": {
    "title": "New Notification!",
    "actions": [
      {"action": "foo", "title": "Open new tab"},
      {"action": "bar", "title": "Focus last"},
      {"action": "baz", "title": "Navigate last"},
      {"action": "qux", "title": "Send request in the background"},
      {"action": "other", "title": "Just notify existing clients"}
    ],
    "data": {
      "onActionClick": {
        "default": {"operation": "openWindow"},
        "foo": {"operation": "openWindow", "url": "/absolute/path"},
        "bar": {"operation": "focusLastFocusedOrOpen", "url": "relative/path"},
        "baz": {"operation": "navigateLastFocusedOrOpen", "url": "https://other.domain.com/"},
        "qux": {"operation": "sendRequest", "url": "https://yet.another.domain.com/"}
      }
    }
  }
}
```

IMPORTANT: If an action does not have a corresponding `onActionClick` entry, then the notification is closed and `SwPush.notificationClicks` is notified on existing clients.
-->

액션을 사용하면 사용자가 알림과 상호작용하는 방식을 지정할 수 있습니다.

`actions` 프로퍼티로 사용 가능한 액션 목록을 정의할 수 있습니다.
각 액션은 사용자가 알림과 상호작용하기 위해 클릭할 수 있는 액션 버튼으로 표시됩니다.

또한 `data` 객체의 `onActionClick` 프로퍼티를 사용하면 각 액션 버튼을 클릭했을 때 실행할 작업을 액션과 연결할 수 있습니다:

```json
{
  "notification": {
    "title": "New Notification!",
    "actions": [
      {"action": "foo", "title": "Open new tab"},
      {"action": "bar", "title": "Focus last"},
      {"action": "baz", "title": "Navigate last"},
      {"action": "qux", "title": "Send request in the background"},
      {"action": "other", "title": "Just notify existing clients"}
    ],
    "data": {
      "onActionClick": {
        "default": {"operation": "openWindow"},
        "foo": {"operation": "openWindow", "url": "/absolute/path"},
        "bar": {"operation": "focusLastFocusedOrOpen", "url": "relative/path"},
        "baz": {"operation": "navigateLastFocusedOrOpen", "url": "https://other.domain.com/"},
        "qux": {"operation": "sendRequest", "url": "https://yet.another.domain.com/"}
      }
    }
  }
}
```

중요: 액션에 해당하는 `onActionClick` 항목이 없으면 알림을 닫고 기존 클라이언트의 `SwPush.notificationClicks`에 알립니다.

<!--
## More on Angular service workers
-->

<a id="more-on-angular-service-workers"></a>

## Angular 서비스 워커 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/communications" title="Communicating with the Service Worker"/>
  <docs-pill href="ecosystem/service-workers/devops" title="Service Worker devops"/>
</docs-pill-row>
-->

다음 내용도 함께 살펴보세요:

<docs-pill-row>
  <docs-pill href="ecosystem/service-workers/communications" title="서비스 워커와 통신하기"/>
  <docs-pill href="ecosystem/service-workers/devops" title="서비스 워커 운영"/>
</docs-pill-row>
