<!--
# Debugging tests
-->

<a id="debugging-tests"></a>

# 테스트 디버깅하기

<!--
If your tests aren't working as you expect, you can debug them in both the default Node.js environment and in a real browser.
-->

테스트가 예상대로 동작하지 않으면 기본 Node.js 환경이나 실제 브라우저에서 디버깅할 수 있습니다.

<!--
## Debugging in Node.js
-->

<a id="debugging-in-nodejs"></a>

## Node.js에서 디버깅하기

<!--
Debugging in the default Node.js environment is often the quickest way to diagnose issues that are not related to browser-specific APIs or rendering.

1.  Run the `ng test` command with the `--debug` flag:
    ```shell
    ng test --debug
    ```
2.  The test runner will start in debug mode and wait for a debugger to attach.
3.  You can now attach your preferred debugger. For example, you can use the built-in Node.js debugger in VS Code or the Chrome DevTools for Node.js.
-->

브라우저 전용 API나 렌더링과 관련 없는 문제는 기본 Node.js 환경에서 디버깅하는 것이 대체로 가장 빠릅니다.

1. `ng test` 명령에 `--debug` 플래그를 추가해서 실행합니다.
   ```shell
   ng test --debug
   ```
2. 테스트 러너가 디버그 모드로 시작되고 디버거가 연결될 때까지 기다립니다.
3. 원하는 디버거를 연결합니다.
   예를 들어 VS Code에 내장된 Node.js 디버거나 Node.js용 Chrome 개발자 도구를 사용할 수 있습니다.

<!--
## Debugging in a browser
-->

<a id="debugging-in-a-browser"></a>

## 브라우저에서 디버깅하기

<!--
The same way you start a debugging session with in Node, you can use `ng test` with the `--debug` flag with Vitest and [browser mode](/guide/testing/migrating-to-vitest#5-configure-browser-mode-optional).

The test runner will start in debug mode and wait for you to open the browser devtools to debug the tests.
-->

Node에서 디버깅을 시작하는 것과 같은 방식으로, Vitest와 [브라우저 모드](/guide/testing/migrating-to-vitest#5-configure-browser-mode-optional)에서도 `ng test` 명령에 `--debug` 플래그를 사용할 수 있습니다.

테스트 러너가 디버그 모드로 시작되고, 테스트를 디버깅할 수 있도록 브라우저 개발자 도구를 열 때까지 기다립니다.
