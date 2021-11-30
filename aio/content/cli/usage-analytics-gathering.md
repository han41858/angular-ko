<!--
# Gathering and Viewing Usage Analytics
-->
# 사용통계 수집, 분석

<!--
Users can opt in to share their Angular CLI usage data with [Google Analytics](https://support.google.com/analytics/answer/1008015?hl=en), using the [`ng analytics` CLI command](analytics).
The data is also shared with the Angular team, and used to improve the CLI.

The gathering of CLI analytics data is disabled by default, and must be enabled at the project level by individual users.
It cannot be enabled at the project level for all users.

Data gathered in this way can be viewed on the Google Analytics site, but is not automatically visible on your own organization's Analytics site.
As an administrator for an Angular development group, you can configure your instance of Angular CLI to be able to see analytics data for your own team's usage of the Angular CLI.
This configuration option is separate from and in addition to other usage analytics that your users may be sharing with Google.
-->
Angular CLI [`ng analytics`](analytics)명령을 사용하면 사용통계를 Angular CLI [Google Analytics](https://support.google.com/analytics/answer/1008015?hl=en)에 업로드 해서 사용통계를 확인할 수 있습니다.
이곳에 공유된 데이터는 Angular 팀에게도 공유되며, Angular CLI를 개선하기 위한 자료로 활용됩니다.

CLI 사용통계 수집 기능은 기본적으로 비활성화되어 있기 때문에, 이 기능을 켜려면 사용자마다, 프로젝트마다 활성화해야 합니다.
프로젝트 계층에서 모든 사용자에게 활성화하는 방법은 없습니다.

사용통계 수집 기능을 활성화하면 Angular CLI를 사용한 데이터가 Google Analytics 사이트에 수집되지만, 모든 사람이 이 데이터를 볼 수는 없습니다.
당신이 개발 리더라면 자신의 팀이 Angular CLI를 어떻게 활용하고 있는지 확인하기 위해 환경설정 값을 변경해볼 수 있습니다.
이 때 지정하는 환경설정에 따라 수집되는 추가 정보는 Goggle 팀에게 공유되지 않습니다.


<!--
## Enable access to CLI usage data
-->
## 사용통계 수집하기

<!--
To configure access to your own users' CLI usage data, use the `ng config` command to add a key to your global [`angular.json` workspace configuration file](guide/workspace-config).
The key goes under `cli.analyticsSharing` at the top level of the file, outside the `projects` sections.
The value of the key is your organization's tracking ID, as assigned by Google Analytics.
This ID is a string that looks like `UA-123456-12`.

You can choose to use a descriptive string as the key value, or be assigned a random key when you run the CLI command.
For example, the following command adds a configuration key named "tracking".

<code-example language="sh">
ng config --global cli.analyticsSharing.tracking UA-123456-12
</code-example>

To turn off this feature, run the following command:

<code-example language="sh">
ng config --global cli.analyticsSharing undefined
</code-example>
-->
회사 내부 개발팀에게 CLI 사용정보를 접근할 수 있도록 설정하려면 `ng config` 명령을 사용해서 [`angular.json` 워크스페이스 환경설정 파일](guide/workspace-config)에 키를 추가해야 합니다.
이 키는 파일의 최상위 계층, `projects` 섹션 바깥에 `cli.analyticsSharing` 안에 구성합니다.
이 키 값은 회사에서 관리하는 Google Analytics의 트래킹 ID로 지정하면 됩니다.
`UA-123456-12` 형식의 문자열입니다.

이 키에는 일반 문자열이나 랜덤 키를 값으로 할당할 수도 있습니다.
아래 코드는 환경설정에 "tracking"이라는 트래킹 키를 추가하는데, 트래킹 ID로 `UA-1234565-12`를 지정하는 명령입니다:

<code-example language="sh">
ng config --global cli.analyticsSharing.tracking UA-123456-12
</code-example>

이 기능을 끄러면 이렇게 실행하면 됩니다:

<code-example language="sh">
ng config --global --remove cli.analyticsSharing
</code-example>


<!--
## Per user tracking
-->
## 사용자 단위로 추적하기

<!--
You can add a custom user ID to the global configuration, in order to identify unique usage of commands and flags.
If that user enables CLI analytics for their own project, your analytics display tracks and labels their individual usage.


<code-example language="sh">
ng config --global cli.analyticsSharing.uuid SOME_USER_NAME
</code-example>

To generate a new random user ID, run the following command:

<code-example language="sh">
ng config --global cli.analyticsSharing.uuid ""
</code-example>
-->
전역 환경설정 파일에 커스텀 사용자 ID를 추가하면 해당 사용자가 사용한 명령이나 플래그값의 통계를 따로 확인할 수 있습니다.
이 기능도 사용자마다 프로젝트에 활성화하면 됩니다.

<code-example language="sh">
ng config --global cli.analyticsSharing.user SOME_USER_NAME
</code-example>

사용자 ID를 랜덤값으로 지정하려면 이렇게 실행하면 됩니다:

<code-example language="sh">
ng config --global cli.analyticsSharing.user ""
</code-example>

