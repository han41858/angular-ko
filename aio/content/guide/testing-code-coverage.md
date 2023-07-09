<a id="code-coverage"></a>

<!--
# Find out how much code you're testing
-->
# 애플리케이션 코드를 얼마나 많이 테스트하고 있는지 확인하기

<!--
The Angular CLI can run unit tests and create code coverage reports.
Code coverage reports show you any parts of your code base that might not be properly tested by your unit tests.

<div class="alert is-helpful">

If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>

To generate a coverage report run the following command in the root of your project.

<code-example format="shell" language="shell">

ng test --no-watch --code-coverage

</code-example>

When the tests are complete, the command creates a new `/coverage` directory in the project.
Open the `index.html` file to see a report with your source code and code coverage values.

If you want to create code-coverage reports every time you test, set the following option in the Angular CLI configuration file, `angular.json`:

<code-example format="json" language="json">

"test": {
  "options": {
    "codeCoverage": true
  }
}

</code-example>
-->
Angular CLI는 유닛 테스트를 실행하면서 코드 커버리지 보고서를 생성할 수 있습니다.
코드 커버리지 보고서를 보면 유닛 테스트가 애플리케이션을 어느 범위까지 테스트하는지 확인할 수 있습니다.

<div class="alert is-helpful">

그리고 이 문서에서 다루는 테스트 기능은 <live-example name="testing" noDownload>브라우저에서 실행하기</live-example>나 <live-example name="testing" downloadOnly>내려받아 로컬에서 실행하기</live-example>에서 확인할 수 있습니다.

</div>

커버리지 보고서를 생성하려면 프로젝트 최상위 폴더에서 이 명령을 실행하면 됩니다.

<code-example format="shell" language="shell">

ng test --no-watch --code-coverage

</code-example>

이 명령을 실행하고 테스트가 끝나면 프로젝트에 `/coverage` 폴더가 생성됩니다.
이 폴더 안에 있는 `index.html` 파일을 열면 소스 코드와 소스 커버리지 값을 확인할 수 있습니다.

테스트를 실행할 때마다 코드 커버리지 보고서를 생성하려면 Angular CLI 환경설정 파일 `angular.json`에 이런 옵션을 지정하면 됩니다:

<code-example format="json" language="json">

"test": {
  "options": {
    "codeCoverage": true
  }
}

</code-example>


<!--
## Code coverage enforcement
-->
## 코드 커버리지 강제하기

<!--
The code coverage percentages let you estimate how much of your code is tested.
If your team decides on a set minimum amount to be unit tested, enforce this minimum with the Angular CLI.

For example, suppose you want the code base to have a minimum of 80% code coverage.
To enable this, open the [Karma](https://karma-runner.github.io) test platform configuration file, `karma.conf.js`, and add the `check` property in the `coverageReporter:` key.

<code-example format="javascript" language="javascript">

coverageReporter: {
  dir: require('path').join(__dirname, './coverage/&lt;project-name&gt;'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}

</code-example>


<div class="alert is-helpful">

Read more about creating and fine tunning Karma configuration in the [testing guide](guide/testing#configuration).

</div>


The `check` property causes the tool to enforce a minimum of 80% code coverage when the unit tests are run in the project.

Read more on coverage configuration options in the [karma coverage documentation](https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md).
-->
코드 커버리지 퍼센트 값을 보면 애플리케이션 코드를 얼마나 테스트하는지 확인할 수 있습니다.
팀에서 이 값을 어느 정도 이상으로 유지하려고 할 때 이 값을 강제할 수 있습니다.

코드 커버리지 값이 최소한 80%는 되어야 한다고 합시다.
이 값을 강제하려면 [Karma](https://karma-runner.github.io) 테스트 플랫폼 설정 파일 `karma.conf.js`의 `coverageReporter:` 프로퍼티에 `check` 프로퍼티를 추가하면 됩니다.

<code-example format="javascript" language="javascript">

coverageReporter: {
  dir: require('path').join(__dirname, './coverage/&lt;프로젝트-이름&gt;'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}

</code-example>


<div class="alert is-helpful">

Karma 설정파일을 생성하고 커스터마이징 하는 방법을 알아보려면 [테스트 문서](guide/testing#configuration)를 참고하세요.

</div>


이렇게 `check` 프로퍼티를 지정하면 프로젝트를 대상으로 유닛 테스트를 실행할 때 80% 코드 커버리지르 강제할 수 있습니다.

코드 커버리지 환경설정 옵션에 대해 자세하게 알아보려면 [카르마 커버리지 문서](https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md)를 참고하세요.

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-01-17
