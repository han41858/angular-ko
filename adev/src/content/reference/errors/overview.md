<!--
# Error Encyclopedia
-->

<a id="error-encyclopedia"></a>

# 오류 백과

<!--
## Runtime errors
-->

<a id="runtime-errors"></a>

## 런타임 오류

<!--
| Code      | Name                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `NG0100`  | [Expression Changed After Checked](errors/NG0100)                                    |
| `NG0200`  | [Circular Dependency in DI](errors/NG0200)                                           |
| `NG0201`  | [No Provider Found](errors/NG0201)                                                   |
| `NG0203`  | [`inject()` must be called from an injection context](errors/NG0203)                 |
| `NG0204`  | [Invalid Injection Token](errors/NG0204)                                             |
| `NG0205`  | [Injector has already been destroyed](errors/NG0205)                                 |
| `NG0207`  | [EnvironmentProviders in wrong context](errors/NG0207)                               |
| `NG0209`  | [Invalid multi provider](errors/NG0209)                                              |
| `NG0300`  | [Selector Collision](errors/NG0300)                                                  |
| `NG0301`  | [Export Not Found](errors/NG0301)                                                    |
| `NG0302`  | [Pipe Not Found](errors/NG0302)                                                      |
| `NG0318`  | [Invalid style property binding value](errors/NG0318)                                |
| `NG0401`  | [Missing platform](errors/NG0401)                                                    |
| `NG0403`  | [Bootstrapped NgModule doesn't specify which component to initialize](errors/NG0403) |
| `NG0500`  | [Hydration Node Mismatch](errors/NG0500)                                             |
| `NG0501`  | [Hydration Missing Siblings](errors/NG0501)                                          |
| `NG0502`  | [Hydration Missing Node](errors/NG0502)                                              |
| `NG0503`  | [Hydration Unsupported Projection of DOM Nodes](errors/NG0503)                       |
| `NG0504`  | [Skip hydration flag is applied to an invalid node](errors/NG0504)                   |
| `NG0505`  | [No hydration info in server response](errors/NG0505)                                |
| `NG0506`  | [NgZone remains unstable](errors/NG0506)                                             |
| `NG0507`  | [HTML content was altered after SSR](errors/NG0507)                                  |
| `NG0600`  | [Signal write in a disallowed context](errors/NG0600)                                |
| `NG0602`  | [Disallowed function call inside reactive context](errors/NG0602)                    |
| `NG0750`  | [@defer dependencies failed to load](errors/NG0750)                                  |
| `NG0751`  | [@defer behavior when HMR is enabled](errors/NG0751)                                 |
| `NG0904`  | [Unsafe value used in a resource URL context](errors/NG0904)                         |
| `NG0910`  | [Unsafe bindings on an iframe element](errors/NG0910)                                |
| `NG0912`  | [Component ID generation collision](errors/NG0912)                                   |
| `NG0913`  | [Runtime Performance Warnings](errors/NG0913)                                        |
| `NG0919`  | [Circular Dependency Detected](errors/NG0919)                                        |
| `NG0950`  | [Required input is accessed before a value is set](errors/NG0950)                    |
| `NG0951`  | [Child query result is required but no value is available](errors/NG0951)            |
| `NG0955`  | [Track expression resulted in duplicated keys for a given collection](errors/NG0955) |
| `NG0956`  | [Tracking expression caused re-creation of the DOM structure](errors/NG0956)         |
| `NG0991`  | [Resource completed before producing a value](errors/NG0991)                         |
| `NG01002` | [Missing Control Value](errors/NG01002)                                              |
| `NG01055` | [Missing control for `formControlName`](errors/NG01055)                              |
| `NG01101` | [Wrong Async Validator Return Type](errors/NG01101)                                  |
| `NG01203` | [Missing value accessor](errors/NG01203)                                             |
| `NG01902` | [Orphan field in signal forms](errors/NG01902)                                       |
| `NG02200` | [Missing Iterable Differ](errors/NG02200)                                            |
| `NG02800` | [JSONP support in HttpClient configuration](errors/NG02800)                          |
| `NG02802` | [Headers not transferred by HttpTransferCache](errors/NG02802)                       |
| `NG02825` | [Fetch response body exceeds the configured limit](errors/NG02825)                   |
| `NG05000` | [Hydration with unsupported Zone.js instance.](errors/NG05000)                       |
| `NG05104` | [Root element was not found.](errors/NG05104)                                        |
| `NG05106` | [Insertion reference node not found](errors/NG05106)                                 |
| `NG05201` | [Unsafe resource URL passed to DomSanitizer](errors/NG05201)                         |
| `NG05703` | [Suspicious URL origin change during SSR](errors/NG05703)                            |
-->

| 코드      | 이름                                                                         |
| :-------- | :--------------------------------------------------------------------------- |
| `NG0100`  | [검사 후 변경된 표현식](errors/NG0100)                                       |
| `NG0200`  | [의존성 주입의 순환 의존성](errors/NG0200)                                   |
| `NG0201`  | [프로바이더를 찾을 수 없음](errors/NG0201)                                   |
| `NG0203`  | [`inject()`는 주입 컨텍스트에서 호출해야 합니다](errors/NG0203)              |
| `NG0204`  | [유효하지 않은 주입 토큰](errors/NG0204)                                     |
| `NG0205`  | [이미 소멸한 인젝터](errors/NG0205)                                          |
| `NG0207`  | [잘못된 컨텍스트에서 사용하는 EnvironmentProviders](errors/NG0207)           |
| `NG0209`  | [유효하지 않은 다중 프로바이더](errors/NG0209)                               |
| `NG0300`  | [셀렉터 충돌](errors/NG0300)                                                 |
| `NG0301`  | [내보내기 이름을 찾을 수 없음](errors/NG0301)                                |
| `NG0302`  | [파이프를 찾을 수 없음](errors/NG0302)                                       |
| `NG0318`  | [잘못된 스타일 프로퍼티 바인딩 값](errors/NG0318)                            |
| `NG0401`  | [누락된 플랫폼](errors/NG0401)                                               |
| `NG0403`  | [부트스트랩하는 NgModule에 초기화할 컴포넌트가 지정되지 않음](errors/NG0403) |
| `NG0500`  | [하이드레이션 노드 불일치](errors/NG0500)                                    |
| `NG0501`  | [하이드레이션 중 형제 노드 누락](errors/NG0501)                              |
| `NG0502`  | [하이드레이션 중 노드 누락](errors/NG0502)                                   |
| `NG0503`  | [하이드레이션에서 지원하지 않는 DOM 노드 프로젝션](errors/NG0503)            |
| `NG0504`  | [유효하지 않은 노드에 적용된 하이드레이션 건너뛰기 플래그](errors/NG0504)    |
| `NG0505`  | [서버 응답에 하이드레이션 정보가 없음](errors/NG0505)                        |
| `NG0506`  | [NgZone이 불안정한 상태로 유지됨](errors/NG0506)                             |
| `NG0507`  | [서버 사이드 렌더링 후 변경된 HTML 콘텐츠](errors/NG0507)                    |
| `NG0600`  | [허용되지 않은 컨텍스트에서 시그널 값 쓰기](errors/NG0600)                   |
| `NG0602`  | [반응형 컨텍스트에서 허용되지 않는 함수 호출](errors/NG0602)                 |
| `NG0750`  | [@defer 의존성 로드 실패](errors/NG0750)                                     |
| `NG0751`  | [HMR을 활성화했을 때의 @defer 동작](errors/NG0751)                           |
| `NG0904`  | [리소스 URL 컨텍스트에 안전하지 않은 값 사용](errors/NG0904)                 |
| `NG0910`  | [iframe 엘리먼트의 안전하지 않은 바인딩](errors/NG0910)                      |
| `NG0912`  | [컴포넌트 ID 생성 충돌](errors/NG0912)                                       |
| `NG0913`  | [런타임 성능 경고](errors/NG0913)                                            |
| `NG0919`  | [순환 의존성 감지](errors/NG0919)                                            |
| `NG0950`  | [값이 설정되기 전에 필수 입력값에 접근함](errors/NG0950)                     |
| `NG0951`  | [필수 자식 쿼리 결과에 사용할 수 있는 값이 없음](errors/NG0951)              |
| `NG0955`  | [컬렉션에서 중복된 키를 생성하는 추적 표현식](errors/NG0955)                 |
| `NG0956`  | [DOM 구조를 다시 생성하게 만드는 추적 표현식](errors/NG0956)                 |
| `NG0991`  | [값을 생성하기 전에 리소스가 완료됨](errors/NG0991)                          |
| `NG01002` | [누락된 폼 컨트롤 값](errors/NG01002)                                        |
| `NG01055` | [`formControlName`에 해당하는 컨트롤 누락](errors/NG01055)                      |
| `NG01101` | [잘못된 비동기 유효성 검사기 반환 타입](errors/NG01101)                      |
| `NG01203` | [누락된 값 접근자](errors/NG01203)                                           |
| `NG01902` | [시그널 폼에서 연결이 끊어진 필드](errors/NG01902)                           |
| `NG02200` | [반복 가능한 값의 변경 감지기 누락](errors/NG02200)                          |
| `NG02800` | [HttpClient 설정의 JSONP 지원](errors/NG02800)                               |
| `NG02802` | [HttpTransferCache가 전송하지 않은 헤더](errors/NG02802)                     |
| `NG02825` | [Fetch 응답 본문이 설정한 한도를 초과함](errors/NG02825)                     |
| `NG05000` | [지원하지 않는 Zone.js 인스턴스로 수행하는 하이드레이션](errors/NG05000)     |
| `NG05104` | [루트 엘리먼트를 찾을 수 없음](errors/NG05104)                               |
| `NG05106` | [삽입 기준 노드를 찾을 수 없음](errors/NG05106)                              |
| `NG05201` | [안전하지 않은 리소스 URL이 DomSanitizer에 전달됨](errors/NG05201)           |
| `NG05703` | [SSR 중 의심스러운 URL 출처 변경](errors/NG05703)                            |

<!--
## Compiler errors
-->

<a id="compiler-errors"></a>

## 컴파일러 오류

<!--
| Code     | Name                                                        |
| :------- | :---------------------------------------------------------- |
| `NG1001` | [Argument Not Literal](errors/NG1001)                       |
| `NG2003` | [Missing Token](errors/NG2003)                              |
| `NG2009` | [Invalid Shadow DOM selector](errors/NG2009)                |
| `NG3003` | [Import Cycle Detected](errors/NG3003)                      |
| `NG6100` | [NgModule.id Set to module.id anti-pattern](errors/NG6100)  |
| `NG8001` | [Invalid Element](errors/NG8001)                            |
| `NG8002` | [Invalid Attribute](errors/NG8002)                          |
| `NG8003` | [Missing Reference Target](errors/NG8003)                   |
| `NG8011` | [Control Flow Preventing Content Projection](errors/NG8011) |
| `NG8023` | [Multiple Components Match Same Element](errors/NG8023)     |
| `NG8024` | [Conflicting Host Directive Binding](errors/NG8024)         |
-->

| 코드     | 이름                                                          |
| :------- | :------------------------------------------------------------ |
| `NG1001` | [리터럴이 아닌 인수](errors/NG1001)                           |
| `NG2003` | [누락된 토큰](errors/NG2003)                                  |
| `NG2009` | [유효하지 않은 Shadow DOM 셀렉터](errors/NG2009)              |
| `NG3003` | [import 순환 감지](errors/NG3003)                             |
| `NG6100` | [NgModule.id를 module.id로 설정하는 안티 패턴](errors/NG6100) |
| `NG8001` | [유효하지 않은 엘리먼트](errors/NG8001)                       |
| `NG8002` | [유효하지 않은 속성](errors/NG8002)                           |
| `NG8003` | [누락된 참조 대상](errors/NG8003)                             |
| `NG8011` | [제어 흐름이 콘텐츠 프로젝션을 차단함](errors/NG8011)         |
| `NG8023` | [같은 엘리먼트와 일치하는 여러 컴포넌트](errors/NG8023)       |
| `NG8024` | [충돌하는 호스트 디렉티브 바인딩](errors/NG8024)              |
