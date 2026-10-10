<!--
# End to End Testing
-->

<a id="end-to-end-testing"></a>

# 엔드 투 엔드 테스트

<!--
End-to-end or (E2E) testing is a form of testing used to assert your entire application works as expected from start to finish or _"end-to-end"_. E2E testing differs from unit testing in that it is completely decoupled from the underlying implementation details of your code. It is typically used to validate an application in a way that mimics the way a user would interact with it. This page serves as a guide to getting started with end-to-end testing in Angular using the Angular CLI.
-->

엔드 투 엔드(End-to-end, E2E) 테스트는 애플리케이션 전체가 처음부터 끝까지, 즉 _"끝에서 끝까지"_ 예상대로 동작하는지 검증하는 테스트입니다.
E2E 테스트는 코드의 내부 구현 세부사항과 완전히 분리된다는 점에서 단위 테스트와 다릅니다.
일반적으로 사용자가 애플리케이션과 상호작용하는 방식을 모방해서 애플리케이션을 검증하는 데 사용합니다.
이 문서에서는 Angular CLI를 사용해서 Angular의 엔드 투 엔드 테스트를 시작하는 방법을 알아봅니다.

<!--
## Set Up E2E Testing
-->

<a id="set-up-e2e-testing"></a>

## E2E 테스트 설정하기

<!--
The Angular CLI downloads and installs everything you need to run end-to-end tests for your Angular application.

```shell

ng e2e

```

The `ng e2e` command will first check your project for the "e2e" target. If it can't locate it, the CLI will then prompt you which e2e package you would like to use and walk you through the setup.

```text

Cannot find "e2e" target for the specified project.
You can add a package that implements these capabilities.

For example:
Cypress: ng add @cypress/schematic
Nightwatch: ng add @nightwatch/schematics
WebdriverIO: ng add @wdio/schematics
Playwright: ng add playwright-ng-schematics
Puppeteer: ng add @puppeteer/ng-schematics

Would you like to add a package with "e2e" capabilities now?
No
❯ Cypress
Nightwatch
WebdriverIO
Playwright
Puppeteer

```

If you don't find the test runner you would like to use from the list above, you can manually add a package using `ng add`.
-->

Angular CLI는 Angular 애플리케이션의 엔드 투 엔드 테스트를 실행하는 데 필요한 항목을 모두 다운로드하고 설치합니다.

```shell

ng e2e

```

`ng e2e` 명령어는 먼저 프로젝트에 "e2e" 대상이 있는지 확인합니다.
이 대상을 찾지 못하면 사용할 e2e 패키지를 선택하라는 메시지를 표시하고 설정 과정을 안내합니다.

```text

Cannot find "e2e" target for the specified project.
You can add a package that implements these capabilities.

For example:
Cypress: ng add @cypress/schematic
Nightwatch: ng add @nightwatch/schematics
WebdriverIO: ng add @wdio/schematics
Playwright: ng add playwright-ng-schematics
Puppeteer: ng add @puppeteer/ng-schematics

Would you like to add a package with "e2e" capabilities now?
No
❯ Cypress
Nightwatch
WebdriverIO
Playwright
Puppeteer

```

위 목록에 원하는 테스트 실행기가 없다면 `ng add`로 패키지를 직접 추가할 수 있습니다.

<!--
## Running E2E Tests
-->

<a id="running-e2e-tests"></a>

## E2E 테스트 실행하기

<!--
Now that your application is configured for end-to-end testing we can now run the same command to execute your tests.

```shell

ng e2e

```

Note, there isn't anything "special" about running your tests with any of the integrated e2e packages. The `ng e2e` command is really just running the `e2e` builder under the hood. You can always [create your own custom builder](tools/cli/cli-builder#creating-a-builder) named `e2e` and run it using `ng e2e`.
-->

애플리케이션에 엔드 투 엔드 테스트 설정을 마쳤다면 같은 명령어로 테스트를 실행하면 됩니다.

```shell

ng e2e

```

통합된 e2e 패키지로 테스트를 실행한다고 해서 특별한 과정이 추가되는 것은 아닙니다.
`ng e2e` 명령어는 내부적으로 `e2e` 빌더를 실행할 뿐입니다.
언제든지 `e2e`라는 이름의 [커스텀 빌더를 만들어서](tools/cli/cli-builder#creating-a-builder) `ng e2e`로 실행할 수 있습니다.

<!--
## More information on end-to-end testing tools
-->

<a id="more-information-on-end-to-end-testing-tools"></a>

## 엔드 투 엔드 테스트 도구 더 알아보기

<!--
| Testing Tool | Details                                                                                                              |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |
| Cypress      | [Getting started with Cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) |
| Nightwatch   | [Getting started with Nightwatch](https://nightwatchjs.org/guide/writing-tests/introduction.html)                    |
| WebdriverIO  | [Getting started with Webdriver.io](https://webdriver.io/docs/gettingstarted)                                        |
| Playwright   | [Getting started with Playwright](https://playwright.dev/docs/writing-tests)                                         |
| Puppeteer    | [Getting started with Puppeteer](https://pptr.dev)                                                                   |
-->

| 테스트 도구 | 자세한 내용                                                                                              |
| :---------- | :------------------------------------------------------------------------------------------------------- |
| Cypress     | [Cypress 시작하기](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) |
| Nightwatch  | [Nightwatch 시작하기](https://nightwatchjs.org/guide/writing-tests/introduction.html)                    |
| WebdriverIO | [Webdriver.io 시작하기](https://webdriver.io/docs/gettingstarted)                                        |
| Playwright  | [Playwright 시작하기](https://playwright.dev/docs/writing-tests)                                         |
| Puppeteer   | [Puppeteer 시작하기](https://pptr.dev)                                                                   |
