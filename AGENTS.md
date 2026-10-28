---
trigger: always_on
---

# angular.kr 작업 지침

이 문서는 `ko` 브랜치와 `ko`를 대상으로 하는 작업 브랜치의 루트 작업 지침입니다.
Angular 공식 문서 사이트의 한국어 번역과 사이트 유지보수에 적용합니다.
`main` 브랜치의 루트 `AGENTS.md`는 선택한 upstream 기준과 동일하게 유지하며, 이 한국어 전용 규칙을 반영하지 않습니다.
기존 upstream 개발 지침도 참고하되, 번역·브랜치·커밋 정책은 이 포크의 규칙을 따릅니다.
작업 경로에 별도 `AGENTS.md`가 있으면 함께 확인합니다.

## 1. 작업 범위와 브랜치

- 문서·예제·튜토리얼·사이트 소스의 주요 경로는 `adev/`입니다.
- 한국어 배포 브랜치는 `ko`입니다. 실제 배포 조건은 `.github/workflows/firebase-hosting-merge.yml`에서 확인합니다.
- 번역 작업은 최신 `ko`에서 별도 작업 브랜치를 만들어 진행합니다.
- 이 포크의 `main`은 선택한 upstream 기준과 동일하게 유지합니다.
  최신 upstream `main`과 항상 같은 커밋이라고 가정하지 않으며, 한국어 전용 변경은 넣지 않습니다.
- 요청과 관계없는 런타임 코드, 의존성, lockfile, 빌드 설정을 함께 변경하지 않습니다.
- 조사·초안 요청만으로 저장소를 수정하거나 PR을 생성하지 않습니다.
- PR 생성 요청은 머지·배포 승인과 구분합니다. 별도 지시가 없으면 ko 대상 초안 PR을 만듭니다.

## 2. upstream 변경 반영

- 원문과 실제 diff를 확인하고 필요한 변경만 반영합니다.
- 개발 중인 main의 변경과 현재 안정 버전의 변경을 구분합니다.
- 기존 번역 차이를 새로운 upstream 변경으로 오인하지 않습니다.
- 동일 변경의 cherry-pick은 중복 반영하지 않습니다.
- 문서만 수정해도 설명과 예제가 현재 ko의 API·동작에 맞는지 확인합니다.
- 변경 구간의 영어 원문 주석과 한국어 번역을 함께 갱신합니다.
- 한국어 전용 `AGENTS.md` 규칙·문구·내비게이션·앵커·배포 설정을 upstream 내용으로 무심코 덮어쓰지 않습니다.
- upstream 동기화 중 루트 `AGENTS.md`가 충돌하면 `ko`의 한국어 지침을 유지하고, upstream 변경은 아래 "upstream 개발·테스트 참고" 섹션에만 반영합니다.
- 머지, 빌드 성공, 배포 성공, 실제 사이트 반영을 구분해 보고합니다.

## 3. 번역 원칙

- 기술적 의미를 보존하면서 자연스럽고 간결한 존댓말로 작성합니다.
- 조건·부정·기본값·예외·권고 수준을 임의로 강화하거나 약화하지 않습니다.
- API 이름, 코드 식별자, 명령어, 파일 경로, URL, 패키지명은 유지합니다.
- 화면에 노출되는 제목·설명·링크 문구는 번역합니다. docs-card의 link 속성처럼 속성 안의 표시 문구도 확인합니다.
- Angular CLI, Angular DevTools 등 제품명은 유지합니다.
- 한국어 설명문은 문장 단위로 줄바꿈합니다. 코드·표·속성의 문법은 깨뜨리지 않습니다.
- 새로운 용어는 관련 문서의 기존 용례를 확인합니다. 의미가 애매하면 임의로 전역 치환하지 말고 대안을 제시합니다.
- 합의한 의역을 원문과 직역이 다르다는 이유만으로 수정하지 않습니다.

## 4. 용어 기준

아래 용어는 설명문에 적용합니다. 코드 식별자나 다른 의미로 사용된 단어까지 기계적으로 치환하지 않습니다.
기존 문서에 남아 있는 다른 표현은 해당 문서를 수정하는 범위에서만 정리하며, 작업과 관계없는 파일을 일괄 치환하지 않습니다.

| 원문                    | 한국어 표현           | 비고                                                                               |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| signal                  | 시그널                |                                                                                    |
| computed signal         | 연산 시그널           |                                                                                    |
| reactive context        | 반응 컨텍스트         |                                                                                    |
| consumer                | 소비자                |                                                                                    |
| effect                  | 이펙트 함수           | effect() 식별자는 유지                                                             |
| change detection        | 변경 감지             |                                                                                    |
| dependency              | 의존성                |                                                                                    |
| incremental hydration   | 점진적 하이드레이션   |                                                                                    |
| lifecycle               | 라이프사이클          |                                                                                    |
| lifecycle hook          | 라이프사이클 훅       |                                                                                    |
| string interpolation    | 문자열 바인딩         |                                                                                    |
| route                   | 라우팅 규칙           |                                                                                    |
| locale                  | 지역                  | 코드·지역 식별자는 유지                                                            |
| Language Service        | 언어 지원 서비스      |                                                                                    |
| spread                  | 객체 전개 / 배열 전개 | 대상에 따라 구분                                                                   |
| watch mode              | 파일 감시 모드        |                                                                                    |
| assets                  | 정적 리소스           |                                                                                    |
| app shell               | 앱 기본 구조          |                                                                                    |
| source of truth         | 원본 데이터           |                                                                                    |
| release                 | 릴리즈                |                                                                                    |
| deprecate               | 사용 중단 권고        | “사용 중단을 권고합니다.”로 표현. 기능 제거·지원 종료와 구분                       |
| sanitize / sanitization | 정제                  | 문서 첫 등장에만 정제(sanitize) 또는 정제(sanitization)로 병기                     |
| non-null assertion      | 동작을 풀어서 설명    | 예: “이 값이 null이 아니라고 TypeScript에 알립니다.” 런타임 보장으로 설명하지 않음 |
| Playground              | 놀이터                |                                                                                    |
| Essentials              | 핵심 가이드           |                                                                                    |
| New / Updated           | 영문 유지             | 상태 배지                                                                          |

- `sanitize()`, `DomSanitizer` 등의 API 이름은 그대로 둡니다.
- 정제와 관계없는 “무력화”까지 일괄 치환하지 않습니다.

다음 합의 문구는 단순한 직역 차이로 재수정하지 않습니다.

- 확장 가능한 웹 앱을 만드는 프레임워크, 자신 있게 추천합니다
- 자신 있게 추천합니다
- 보안을 기본으로 고려했습니다.

## 5. Markdown과 원문 보존

- 영어 원문 주석과 번역의 대응 관계를 유지합니다. 서로 다른 제목·섹션을 하나의 큰 원문 주석으로 합치지 않습니다.
- 기존 앵커 ID와 링크 목적지를 보존합니다. 제목 번역으로 딥링크가 깨지지 않도록 확인합니다.
- 명시적 앵커는 기존 문서 형식을 따르고 제목 바로 위에 둡니다.
- 제목의 불필요한 백틱·강조 기호는 제거하되 코드 식별자를 임의로 바꾸지 않습니다.
- 강조 문구 뒤 공백 등 기존 렌더링 규칙을 유지합니다.
- 코드 펜스, 예제 영역 표시, 문서 컴포넌트의 태그·속성을 보존합니다.
- 코드 주석의 설명과 도구용 지시문·테스트 마커를 구분합니다. 후자는 임의로 번역하지 않습니다.

## 6. 검증

- 패키지 관리자는 pnpm을 사용하고 버전은 저장소 설정을 따릅니다.
- 실행 방법은 `adev/README.md`, 루트 `package.json`과 기존 개발 지침을 확인합니다. CI에서는 기존 workflow의 명령을 따릅니다.
- 번역 변경은 diff, Markdown·예제 구문, 링크·앵커, 원문 주석·코드 펜스, 노출 문구를 우선 검사합니다.
- 번역 변경으로 기존 문구 테스트의 기대값이나 선택자가 달라지면 관련 부분을 수정합니다.
  번역 작업에 무관한 로직 테스트나 기능 변경은 추가하지 않습니다.
- 예제 동작·사이트 코드·빌드 설정 변경은 해당 위험에 맞는 테스트와 빌드 검증을 수행합니다.
- 작은 문구 수정마다 전체 저장소 테스트를 무조건 실행하지 않습니다. 수행한 검사와 미실행 항목을 구분해 보고합니다.
- 속도 개선을 이유로 메모리·병렬도·sandbox 등의 안정성 설정을 임의로 바꾸지 않습니다.
- 캐시가 없어도 빌드할 수 있어야 하며, 캐시에 인증 정보나 비밀 값을 포함하지 않습니다.
- 실행하지 않은 테스트나 사이트 확인을 완료했다고 보고하지 않습니다.

## 7. 커밋과 PR

- 커밋 메시지와 PR 제목은 “GitMoji 화면/기능/영역: 한국어 내용 요약” 형식을 사용합니다.
- 대표 영역은 의미 있게 선택하고 불필요하면 생략합니다.
- GitMoji는 변경 성격에 맞게 고릅니다. 예: 📝 문서·번역, 🔀 upstream 동기화, 👷 CI·워크플로, 🐛 사이트 버그 수정, ✨ 사이트 기능 추가, ⬆️ 의존성 업데이트.
- GitMoji 뒤에 fix:, feat:, docs: 등의 유형을 중복해서 붙이지 않습니다.
- 예: 📝 폼 가이드: 검증 함수 참조 설명 수정
- 예: ⚡ 빌드: Bazel 캐시 복원과 저장 추가
- 가져온 upstream 커밋의 원래 메시지와 이력은 불필요하게 다시 작성하지 않습니다.
- PR 본문에는 변경 이유·범위, 관련 upstream 링크, 안정 버전과의 관계, 검증 결과와 미검증 항목을 적습니다.
- 이 포크에서 새로 작성하는 커밋과 PR 제목은 아래 upstream Commit Guidelines의 Conventional Commits 대신 이 절의 형식을 따릅니다.
- PR 생성·관리에는 사용 가능한 인증된 GitHub 도구를 사용합니다.
  `gh` CLI는 사용할 수 있지만 필수 조건은 아닙니다.

## upstream 개발·테스트 참고

아래는 기존 upstream 지침입니다. 관련 코드·테스트 작업에 적용하며, 번역만 수정하는 작업에 새로운 로직 테스트를 추가하라는 의미는 아닙니다.

### Environment

- Use `pnpm` for package management.
- Use `pnpm bazel test //target` to run tests.

### Key Documentation

- [Building and Testing](contributing-docs/building-and-testing-angular.md): definitive guide for running targets.
- [Coding Standards](contributing-docs/coding-standards.md): style guide for TypeScript and other files.
- [Commit Guidelines](contributing-docs/commit-message-guidelines.md): upstream 커밋 형식 참고용입니다. 이 포크의 새 커밋과 PR 제목에는 위의 한국어 포크 규칙을 적용합니다.

### Testing

- Create standalone component/directives by default, DO NOT introduce new NgModules/non-standalone components even if sibling tests use them.
- Prefer current best practices over existing authoring styles in the same file
- Test components usually do not need selectors unless they are used in templates
- Components are `OnPush` by default, prefer signals for test component state
- **Zoneless & Async-First:** Assume a zoneless environment where state changes schedule updates asynchronously.
  - **Do NOT** use `fixture.detectChanges()` to manually trigger updates.
  - **ALWAYS** use the "Act, Wait, Assert" pattern:
    1. **Act:** Update state or perform an action.
    2. **Wait:** `await fixture.whenStable()` to allow the framework to process the scheduled update.
    3. **Assert:** Verify the output.
- To keep tests fast, minimize the need for waiting:
  - Use `useAutoTick()` (from `packages/private/testing/src/utils.ts`) to fast-forward time via the mock clock.
- When waiting is necessary, use real async tests (`it('...', async () => { ... })`) along with:
  - `await timeout(ms)` (from `packages/private/testing/src/utils.ts`) to wait a specific number of milliseconds.
  - `await fixture.whenStable()` to wait for framework stability.
  - Use the `waitFor` helper function exposed by `@angular/private/testing`
