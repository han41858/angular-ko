<!--
# Debugging tests
-->
# 테스트 디버깅하기

<!--
If your tests aren't working as you expect them to, you can inspect and debug them in the browser.

Debug specs in the browser in the same way that you debug an application.

1.  Reveal the Karma browser window.
    See [Set up testing](guide/testing#set-up-testing) if you need help with this step.

1.  Click the **DEBUG** button to open a new browser tab and re-run the tests.
2.  Open the browser's **Developer Tools**. On Windows, press `Ctrl-Shift-I`. On macOS, press `Command-Option-I`.
3.  Pick the **Sources** section.
4.  Press `Control/Command-P`, and then start typing the name of your test file to open it.
5.  Set a breakpoint in the test.
6.  Refresh the browser, and notice how it stops at the breakpoint.

<div class="lightbox">

<img alt="Karma debugging" src="generated/images/guide/testing/karma-1st-spec-debug.png">

</div>
-->
테스트 코드가 예상한 대로 동작하지 않는다면 원인이 무엇인지 브라우저에서 확인할 수 있습니다.

브라우저에서 테스트 코드를 디버깅하는 방법은 애플리케이션을 디버깅하는 방법과 같습니다.

1.  Karma가 실행되고 있는 브라우저를 찾습니다.
    [테스트 환경설정](guide/testing#set-up-testing) 문서를 참고하세요.

1.  **DEBUG** 버튼을 클릭하면 새로운 브라우저 탭이 열리면서 테스트를 다시 시작합니다.
1.  브라우저에서 "개발자 도구"를 엽니다. 윈도우라면 `Ctrl-Shift-I`, macOS라면 `Command-Option-I`를 누르면 됩니다.
1.  "sources" 탭을 클릭합니다.
1.  `1st.spec.ts` 테스트 파일을 엽니다. `Control/Command-P` 키를 누르고 파일 이름을 입력하면 됩니다.
1.  테스트 코드에 중단점을 지정합니다.
1.  브라우저를 새로 고침하면 중단점에서 코드 실행이 멈춥니다.

<div class="lightbox">

<img alt="Karma debugging" src="generated/images/guide/testing/karma-1st-spec-debug.png">

</div>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
