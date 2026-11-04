<!--
Angular is part of Google [Open Source Software Vulnerability Reward Program](https://bughunters.google.com/about/rules/6521337925468160/google-open-source-software-vulnerability-reward-program-rules). For vulnerabilities in Angular, please submit your report [here](https://bughunters.google.com/report).
-->

Angular는 Google [오픈 소스 소프트웨어 취약점 보상 프로그램](https://bughunters.google.com/about/rules/6521337925468160/google-open-source-software-vulnerability-reward-program-rules)에 참여합니다.
Angular의 취약점은 [여기](https://bughunters.google.com/report)에 신고해 주세요.

<!--
For more information, check out [Angular's security policy](https://angular.dev/best-practices/security).
-->

자세한 내용은 [Angular 보안 정책](https://angular.dev/best-practices/security)을 확인하세요.

<!--
## Policies
-->

<a id="policies"></a>

## 정책

<!--
The following defines some team policies around what does and does not constitute a security vulnerability in the Angular framework.
-->

다음은 Angular 프레임워크에서 어떤 문제를 보안 취약점으로 판단하는지에 관한 팀 정책입니다.

<!--
- **Prototype pollution is itself a DoS vulnerability.**
  - An attacker could pollute any symbol into the wrong type and cause an error, nothing we can do will prevent that.
  - Therefore we don't care about any DoS vulnerability which relies on prototype pollution as a precondition.
- **We trust the user's source code.**
  - "A malicious repository can execute untrusted code" is not a viable attack vector.
  - Language service does not run in restricted mode, has minimal risk of a malicious repository compromising a user.
  - We assume it is always unsafe to run an untrusted repository outside of a sandbox.
- **DoS attacks which break only the attacker's client are not security issues.**
  - Exception: DoS attacks which break other users may be security issues.
  - Exception: DoS attacks which waste server resources significantly beyond the cost of the attacker's request may be security issues.
- **Memory leaks are considered general bugs, not DOS vulnerabilities.**
  - While any memory leak is technically a DOS vulnerability in SSR, these are generally low enough impact to not be considered security issues.
- **Our public API contract is defined by our TS types, any issue which requires breaking those types (ex. via a cast to `any`) falls outside Angular's support.**
  - Ex. It may be possible to leak user state by attaching it to some global data structure in SSR, but we do not consider this to be a valid vulnerability if you have to escape TS types to do it.
- **JIT compiler is removed and not supported in production.**
  - Exploits which require the JIT compiler on the page are not vulnerabilities.
- **Circumventing router guards/safety checks in CSR or SSR is not a security vulnerability.**
  - Attackers can trivially circumvent these guards in CSR via dev tooling.
  - Developers should not rely upon these guards in SSR either, they are purely convenience.
- **Circumventing form validity checks is not a security vulnerability.**
  - Attackers can trivially circumvent these checks via dev tooling.
-->

- **프로토타입 오염 자체가 서비스 거부(DoS) 취약점입니다.**
  - 공격자는 프로토타입 오염으로 어떤 심볼이든 잘못된 타입으로 바꿔 오류를 일으킬 수 있으며, Angular 측에서 이를 막을 방법은 없습니다.
  - 따라서 프로토타입 오염을 전제로 하는 DoS 취약점은 별도로 다루지 않습니다.
- **사용자의 소스 코드를 신뢰합니다.**
  - "악성 저장소가 신뢰할 수 없는 코드를 실행할 수 있다"는 것은 유효한 공격 경로로 인정하지 않습니다.
  - 언어 지원 서비스는 제한 모드에서 실행되지 않으며, 악성 저장소가 이를 통해 사용자에게 피해를 줄 위험은 매우 낮습니다.
  - 신뢰할 수 없는 저장소를 샌드박스 밖에서 실행하는 것은 항상 안전하지 않다고 가정합니다.
- **공격자 자신의 클라이언트만 손상시키는 DoS 공격은 보안 문제가 아닙니다.**
  - 예외: 다른 사용자에게 피해를 주는 DoS 공격은 보안 문제일 수 있습니다.
  - 예외: 공격자의 요청 비용에 비해 서버 리소스를 훨씬 많이 낭비하게 하는 DoS 공격은 보안 문제일 수 있습니다.
- **메모리 누수는 DoS 취약점이 아닌 일반 버그로 간주합니다.**
  - 기술적으로는 SSR의 모든 메모리 누수를 DoS 취약점으로 볼 수 있지만, 일반적으로 영향이 충분히 낮아 보안 문제로 간주하지 않습니다.
- **공개 API의 사용 계약은 TypeScript 타입으로 정의하며, 이 타입을 위반해야 발생하는 문제(예: `any`로 타입 단언)는 Angular의 지원 범위를 벗어납니다.**
  - 예를 들어 SSR에서 사용자 상태를 전역 자료 구조에 연결하면 상태가 유출될 수 있습니다.
    하지만 이를 위해 TypeScript 타입의 제약을 벗어나야 한다면 유효한 취약점으로 간주하지 않습니다.
- **프로덕션에서는 JIT 컴파일러가 제거되며 지원되지 않습니다.**
  - 페이지에 JIT 컴파일러가 있어야 가능한 공격은 취약점으로 간주하지 않습니다.
- **CSR이나 SSR에서 라우터 가드 또는 안전성 검사를 우회하는 것은 보안 취약점이 아닙니다.**
  - 공격자는 CSR에서 개발 도구로 이러한 가드를 쉽게 우회할 수 있습니다.
  - SSR에서도 개발자가 이러한 가드에 의존해서는 안 되며, 가드는 편의 기능일 뿐입니다.
- **폼 유효성 검사를 우회하는 것은 보안 취약점이 아닙니다.**
  - 공격자는 개발 도구로 이러한 검사를 쉽게 우회할 수 있습니다.

<!--
## Invariants
-->

<a id="invariants"></a>

## 불변 조건

<!--
The following are invariants about Angular's technical infrastructure which limit some potential attack vectors. These statements are asserted by humans, not proven in any formal means. However, any security report should assume them to be true unless and until it can conclusively prove them to be false in an attack. If one of these statements invalidates a security report, that report bears the burden of conclusively demonstrating the statement to be false in its reproduction.
-->

다음은 일부 잠재적인 공격 경로를 제한하는 Angular 기술 인프라의 불변 조건입니다.
이 조건들은 사람이 판단한 것으로, 형식적인 방법으로 증명된 것은 아닙니다.
그러나 보안 신고에서는 실제 공격을 통해 해당 조건이 거짓임을 명확히 증명하기 전까지는 참이라고 가정해야 합니다.
이 중 어떤 조건 때문에 보안 신고가 유효하지 않다면, 신고자는 재현 사례에서 그 조건이 거짓임을 명확히 입증해야 합니다.

<!--
- **Zones don't leak across SSR requests (except for the root).**
  - Every request gets its own Zone, so data stored on the Zone is unique to that user, no intrinsic risk of leaking user data from one request to an attacker's request.
- **Injectors are not shared between applications.**
  - SSR always creates a new ApplicationRef and root services, no intrinsic risk of leaking user data from one request to an attacker's request.
  - Exception: Module-scoped data is shared and is a potential vector for data leakage.
- **`ngDevMode` / `ngServerMode` are set at compile time** in production deployments and cannot be manipulated by attackers.
-->

- **Zone은 SSR 요청 사이에서 유출되지 않습니다(루트 Zone 제외).**
  - 각 요청에는 고유한 Zone이 있으므로 Zone에 저장된 데이터는 해당 사용자만의 것입니다.
    한 요청의 사용자 데이터가 공격자의 요청으로 유출될 내재적인 위험은 없습니다.
- **인젝터는 애플리케이션 사이에서 공유되지 않습니다.**
  - SSR은 항상 새로운 ApplicationRef와 루트 서비스를 생성하므로, 한 요청의 사용자 데이터가 공격자의 요청으로 유출될 내재적인 위험은 없습니다.
  - 예외: 모듈 스코프의 데이터는 공유되며 데이터 유출 경로가 될 수 있습니다.
- 프로덕션 배포에서는 **`ngDevMode` / `ngServerMode`가 컴파일 시점에 설정되므로** 공격자가 조작할 수 없습니다.

<!--
## Prioritization Guide
-->

<a id="prioritization-guide"></a>

## 우선순위 판단 기준

<!--
Angular (specifically the framework) is not a product, and almost no vulnerability is an exploit in and of itself, given there is nothing to compromise. Angular can only be exploited through a real deployment of a specific application. The vast majority of potential issues do not affect the default `ng new` app, and require additional steps of varying use/misuse of the framework before introducing a vulnerability on that real application. This goes beyond just an attacker finding the right sequence of characters to cause an exploit, and requires a well-intentioned developer to make a legitimate mistake introducing the vulnerability in the first place. Therefore we need to examine prioritization through the lens of how likely a developer is to make that mistake and the severity of what happens when they do.
-->

Angular, 특히 프레임워크 자체는 제품이 아니며, 그 자체로 침해할 대상이 없으므로 거의 모든 취약점은 단독으로 악용될 수 없습니다.
Angular에 대한 공격은 특정 애플리케이션의 실제 배포 환경을 통해서만 가능합니다.
잠재적인 문제 대부분은 기본 `ng new` 앱에 영향을 주지 않으며, 실제 애플리케이션에 취약점이 생기려면 프레임워크를 사용하거나 잘못 사용하는 추가 단계가 필요합니다.
이는 공격자가 공격에 필요한 문자열을 찾아내는 것만으로는 부족하며, 먼저 악의 없는 개발자가 실수로 취약점을 만들었어야 한다는 뜻입니다.
따라서 개발자가 그러한 실수를 할 가능성과 실수했을 때 발생하는 결과의 심각성을 기준으로 우선순위를 판단해야 합니다.

<!--
- **High:** A vulnerability impacts ~all users of a major feature in common usage such as SSR, hydration, templating, or routing (ex. SSRF via a malicious `Host` header affects all SSR + `HttpClient` users, which is a fairly common use case).
- **Medium:** A vulnerability impacts users interacting with public APIs in their reasonable usage.
- **Low:** A vulnerability impacts users interacting with public APIs misused in an unintended or unreasonable way (ex. vulnerability from unsanitized user input polluting the `APP_ID` value, which should never be user writable).
- **None:** A vulnerability impacts users of private APIs or explicitly unsupported use cases.
-->

- **높음:** SSR, 하이드레이션, 템플릿, 라우팅처럼 널리 쓰이는 주요 기능의 사용자 거의 모두에게 영향을 주는 취약점입니다(예: 악성 `Host` 헤더를 통한 SSRF는 SSR과 `HttpClient`를 함께 사용하는 모든 사용자에게 영향을 주며, 이는 상당히 흔한 사용 사례입니다).
- **중간:** 공개 API를 합리적인 방식으로 사용하는 사용자에게 영향을 주는 취약점입니다.
- **낮음:** 공개 API를 의도하지 않았거나 합리적이지 않은 방식으로 잘못 사용하는 사용자에게 영향을 주는 취약점입니다(예: 정제(sanitize)하지 않은 사용자 입력이 `APP_ID` 값을 오염시켜 발생하는 취약점이며, 이 값은 사용자가 직접 변경할 수 있어서는 안 됩니다).
- **없음:** 비공개 API를 사용하거나 명시적으로 지원하지 않는 사용 사례에 해당하는 사용자에게 영향을 주는 취약점입니다.

<!--
Experimental / developer preview APIs _are not_ exempted from these priorities. While we make no hard guarantees about these APIs publicly, a vulnerability in such features should be raised to our attention and addressed before reaching stability.
-->

실험적 API나 개발자 미리보기 API도 이 우선순위의 적용에서 _제외되지 않습니다_.
이러한 API에 대해 공개적으로 확고한 보장을 하지는 않지만, 해당 기능의 취약점은 Angular 팀에 알려야 하며 안정화되기 전에 해결해야 합니다.

<!--
_Exception:_ angular.dev, Angular DevTools, and the Angular VSCode Extension _are_ products with concrete deployments and can be exploited in their current states. Vulnerabilities should be evaluated against the real deployments of these products.
-->

_예외:_ angular.dev, Angular DevTools, Angular VSCode 확장 프로그램은 실제 배포 환경이 있는 _제품이므로_ 현재 상태에서도 공격의 대상이 될 수 있습니다.
취약점은 이러한 제품의 실제 배포 환경을 기준으로 평가해야 합니다.
