# 생성 문서 한국어 번역

CLI·Aria·CDK 원본 JSON은 `adev/scripts/update-cross-repo-docs`로 갱신되므로 직접 번역하지 않습니다.
이 디렉터리의 `cli.ko.json`, `aria.ko.json`, `cdk.ko.json`은 원문 문자열을 키로, 한국어 번역을 값으로 저장합니다.
원본은 `adev/src/content/{cli,aria,cdk}`에 그대로 보존됩니다.

`render_api_to_html`은 사전을 Bazel action 입력으로 명시하고 렌더러에 전달합니다.
렌더러는 해당 디렉터리의 `description`, `shortDescription`, `longDescription`, `jsdocTags`의 `comment`만 변환합니다.
API 이름·타입·명령·옵션·기본값·경로·소스 정보와 `rawComment`는 수정하지 않습니다.
`since`와 `breaking-change` 버전 메타데이터도 보존합니다.
일반 프레임워크 API 데이터에는 적용하지 않습니다.

## 원문 갱신 후 확인

원문이 달라지면 이전 번역을 추측해서 적용하지 않고 새 영어 원문을 표시합니다.
원문 동기화 스크립트는 마지막에 누락 검사를 자동 실행하며, 새 설명이 있으면 검토가 필요하다고 실패합니다.
별도로 검사하려면 `node adev/scripts/check-korean-doc-translations.mjs`로 누락·오래된 항목을 확인하고 사전을 갱신하세요.
기존 키를 지우기 전에 다른 항목이 같은 원문을 사용하는지 확인하세요.
코드·식별자만으로 구성된 값이나 의도된 언어 대비는 원문과 같은 값을 명시해 검토했음을 기록할 수 있습니다.
코드 펜스·식별자·링크 목적지는 유지하고 본문 설명만 번역합니다.
`New`/`Updated` 내비게이션 배지와 `CHANGELOG.md`는 이 번역 사전의 대상이 아닙니다.

## 검증

사전은 JSON으로 파싱되어야 하며, 중복되는 원문은 도메인별 한 항목으로 관리합니다.
원문 대응·코드 펜스·링크 보존 검사와 실제 API/CLI 렌더링 검사를 수행하세요.
`test/korean-translations.spec.mts`는 번역 필드 범위, 원본 불변성, 새로운 원문 fallback 및 도메인 범위를 검증합니다.
