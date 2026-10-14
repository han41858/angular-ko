/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

export enum ApplicationComplexity {
  Basic = 1,
  Medium = 2,
  Advanced = 3,
}

export interface Step {
  step: string;
  /**
   * Action text rendered as Markdown. Use Markdown link syntax `[text](url)`
   * for any links — raw `<a>` HTML tags bypass the custom link renderer in
   * `update.component.ts` and will not pick up `target="_blank"` or the
   * external-link icon.
   */
  action: string;
  possibleIn: number;
  necessaryAsOf: number;
  level: ApplicationComplexity;
  angularCLI?: boolean;
  ngUpgrade?: boolean;
  pwa?: boolean;
  material?: boolean;
  renderedStep?: string;
  windows?: boolean;
}

export const RECOMMENDATIONS: Step[] = [
  {
    possibleIn: 200,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Basic,
    step: 'Extends OnInit',
    // Original: Ensure you don't use `extends OnInit`, or use `extends` with any lifecycle event. Instead use `implements <lifecycle event>.`
    action:
      '`extends OnInit`를 사용하지 말고, 다른 라이프싸이클 이벤트에도 `extends`를 사용하지 마세요. 대신 `implements <lifecycle event>.`를 사용하세요.',
  },
  {
    possibleIn: 200,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Advanced,
    step: 'Deep Imports',
    // Original: Stop using deep imports, these symbols are now marked with ɵ and are not part of our public API.
    action:
      '깊은 경로의 import를 사용하지 마세요. 이 심볼들은 이제 ɵ로 표시되며 공개 API에 포함되지 않습니다.',
  },
  {
    possibleIn: 200,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Advanced,
    step: 'invokeElementMethod',
    // Original: Stop using `Renderer.invokeElementMethod` as this method has been removed. There is not currently a replacement.
    action:
      '`Renderer.invokeElementMethod` 메서드가 제거되었으므로 더 이상 사용하지 마세요. 현재 대체 API는 없습니다.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Basic,
    step: 'Non Animations Module',
    // Original: If you use animations in your application, you should import `BrowserAnimationsModule` from `@angular/platform-browser/animations` in your App `NgModule`.
    action:
      '애플리케이션에서 애니메이션을 사용한다면 App `NgModule`에서 `@angular/platform-browser/animations`의 `BrowserAnimationsModule`을 불러오세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Medium,
    step: 'Native Form Validation',
    // Original: Angular began adding a `novalidate` attribute to form elements when you include `FormsModule`. To re-enable native forms behaviors, use `ngNoForm` or add `ngNativeValidate`.
    action:
      'Angular는 `FormsModule`을 포함하면 폼 엘리먼트에 `novalidate` 속성을 추가하기 시작했습니다. 브라우저의 기본 폼 동작을 다시 활성화하려면 `ngNoForm`을 사용하거나 `ngNativeValidate`를 추가하세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Advanced,
    step: 'RootRenderer',
    // Original: Replace `RootRenderer` with `RendererFactoryV2` instead.
    action: '`RootRenderer`를 `RendererFactoryV2`로 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Advanced,
    ngUpgrade: true,
    step: 'downgradeInjectable',
    // Original: The return value of `upgrade/static/downgradeInjectable` has changed.
    action: '`upgrade/static/downgradeInjectable`의 반환값이 변경되었습니다.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 400,
    level: ApplicationComplexity.Advanced,
    step: 'Animations Tests',
    // Original: If you use Animations and tests, add `mods[1].NoopAnimationsModule` to your `TestBed.initTestEnvironment` call.
    action:
      '애니메이션과 테스트를 사용한다면 `TestBed.initTestEnvironment` 호출에 `mods[1].NoopAnimationsModule`을 추가하세요.',
  },
  {
    possibleIn: 200,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'DefaultIterableDiffer',
    // Original: Stop using `DefaultIterableDiffer`, `KeyValueDiffers#factories`, or `IterableDiffers#factories`
    action:
      '`DefaultIterableDiffer`, `KeyValueDiffers#factories`, `IterableDiffers#factories`를 더 이상 사용하지 마세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Basic,
    step: 'Template Tag',
    // Original: Rename your `template` tags to `ng-template`
    action: '`template` 태그의 이름을 `ng-template`으로 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Medium,
    step: 'OpaqueToken',
    // Original: Replace any `OpaqueToken` with `InjectionToken`.
    action: '모든 `OpaqueToken`을 `InjectionToken`으로 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'DifferFactory',
    // Original: If you call `DifferFactory.create(...)` remove the `ChangeDetectorRef` argument.
    action: '`DifferFactory.create(...)`를 호출한다면 `ChangeDetectorRef` 인수를 제거하세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'ErrorHandler Parameter',
    // Original: Stop passing any arguments to the constructor for ErrorHandler
    action: 'ErrorHandler 생성자에 인수를 전달하지 마세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'ngProbeToken',
    // Original: If you use ngProbeToken, make sure you import it from @angular/core instead of @angular/platform-browser
    action:
      'ngProbeToken을 사용한다면 @angular/platform-browser 대신 @angular/core에서 불러오세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'TrackByFn',
    // Original: If you use TrackByFn, instead use TrackByFunction
    action: 'TrackByFn을 사용한다면 TrackByFunction으로 바꾸세요.',
  },
  {
    possibleIn: 500,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Basic,
    step: 'i18n Pipe Change',
    // Original: If you rely on the date, currency, decimal, or percent pipes, in 5 you will see minor changes to the format. For applications using locales other than en-us you will need to import it and optionally `locale_extended_fr` from `@angular/common/i18n_data/locale_fr` and registerLocaleData(local).
    action:
      'date, currency, decimal, percent 파이프를 사용한다면 버전 5에서 형식이 조금 달라집니다. en-us 이외의 지역을 사용하는 애플리케이션은 해당 지역 데이터를 불러오고, 필요하다면 `@angular/common/i18n_data/locale_fr`에서 `locale_extended_fr`도 불러온 뒤 registerLocaleData(local)을 호출해야 합니다.',
  },
  {
    possibleIn: 500,
    necessaryAsOf: 500,
    level: ApplicationComplexity.Advanced,
    step: 'gendir',
    // Original: Do not rely on `gendir`, instead look at using `skipTemplateCodeGen`. [Read More](https://github.com/angular/angular/issues/19339#issuecomment-332607471)
    action:
      '`gendir`에 의존하지 말고 `skipTemplateCodeGen` 사용을 검토하세요. [자세히 알아보기](https://github.com/angular/angular/issues/19339#issuecomment-332607471)',
  },
  {
    possibleIn: 220,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    ngUpgrade: true,
    step: 'Dynamic ngUpgrade',
    // Original: Replace `downgradeComponent`, `downgradeInjectable`, `UpgradeComponent`, and `UpgradeModule` imported from `@angular/upgrade`. Instead use the new versions in `@angular/upgrade/static`
    action:
      '`@angular/upgrade`에서 불러오는 `downgradeComponent`, `downgradeInjectable`, `UpgradeComponent`, `UpgradeModule`를 바꾸세요. 대신 `@angular/upgrade/static`의 새 버전을 사용하세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Medium,
    step: 'Animations in Core',
    // Original: If you import any animations services or tools from @angular/core, you should import them from @angular/animations
    action:
      '@angular/core에서 애니메이션 서비스나 도구를 불러온다면 @angular/animations에서 불러오도록 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'ngOutletContext',
    // Original: Replace `ngOutletContext` with `ngTemplateOutletContext`.
    action: '`ngOutletContext`를 `ngTemplateOutletContext`로 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'collectionChangeRecord',
    // Original: Replace `CollectionChangeRecord` with `IterableChangeRecord`
    action: '`CollectionChangeRecord`를 `IterableChangeRecord`로 바꾸세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'Renderer',
    // Original: Anywhere you use Renderer, now use Renderer2
    action: 'Renderer를 사용하는 모든 곳에서 Renderer2를 사용하세요.',
  },
  {
    possibleIn: 400,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'Router Query Params',
    // Original: If you use preserveQueryParams, instead use queryParamsHandling
    action: 'preserveQueryParams를 사용한다면 queryParamsHandling으로 바꾸세요.',
  },
  {
    possibleIn: 430,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'Http',
    // Original: If you use the legacy `HttpModule` and the `Http` service, switch to `HttpClientModule` and the `HttpClient` service. HttpClient simplifies the default ergonomics (you don't need to map to JSON anymore) and now supports typed return values and interceptors. Read more on [angular.dev](https://angular.dev/guide/http).
    action:
      '이전 `HttpModule`과 `Http` 서비스를 사용한다면 `HttpClientModule`과 `HttpClient` 서비스로 전환하세요. HttpClient는 기본 사용법을 단순화하여 더 이상 JSON으로 매핑할 필요가 없으며, 타입이 지정된 반환값과 인터셉터도 지원합니다. 자세한 내용은 [angular.dev](https://angular.dev/guide/http)를 참고하세요.',
  },
  {
    possibleIn: 430,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'DOCUMENT in @angular/platform-browser',
    // Original: If you use DOCUMENT from @angular/platform-browser, you should start to import this from @angular/common
    action:
      '@angular/platform-browser의 DOCUMENT를 사용한다면 @angular/common에서 불러오도록 바꾸세요.',
  },
  {
    possibleIn: 500,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'ReflectiveInjector',
    // Original: Anywhere you use ReflectiveInjector, now use StaticInjector
    action: 'ReflectiveInjector를 사용하는 모든 곳에서 StaticInjector를 사용하세요.',
  },
  {
    possibleIn: 500,
    necessaryAsOf: 550,
    level: ApplicationComplexity.Medium,
    step: 'Whitespace',
    // Original: Choose a value of `off` for `preserveWhitespaces` in your `tsconfig.json` under the `angularCompilerOptions` key to gain the benefits of this setting, which was set to `off` by default in v6.
    action:
      '`tsconfig.json`의 `angularCompilerOptions` 아래에서 `preserveWhitespaces` 값을 `off`로 지정하여 이 설정의 이점을 활용하세요. v6에서는 기본값이 `off`로 설정되었습니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    step: 'node 8',
    // Original: Make sure you are using [Node 8 or later](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)
    action:
      '[Node 8 이상](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'Update to CLI v6',
    // Original: Update your Angular CLI, and migrate the configuration to the [new angular.json format](https://github.com/angular/angular-cli/wiki/angular-workspace) by running the following:<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/cli@6`<br/>
    action:
      '다음 명령으로 Angular CLI를 업데이트하고 설정을 [새 angular.json 형식](https://github.com/angular/angular-cli/wiki/angular-workspace)으로 마이그레이션하세요.<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/cli@6`<br/>',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'Update to CLI v6',
    // Original: Update your Angular CLI, and migrate the configuration to the [new angular.json format](https://github.com/angular/angular-cli/wiki/angular-workspace) by running the following:<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/cli@6 @angular/core@6"`<br/>
    action:
      '다음 명령으로 Angular CLI를 업데이트하고 설정을 [새 angular.json 형식](https://github.com/angular/angular-cli/wiki/angular-workspace)으로 마이그레이션하세요.<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/cli@6 @angular/core@6"`<br/>',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Medium,
    step: 'cli v6 scripts',
    // Original: Update any `scripts` you may have in your `package.json` to use the latest Angular CLI commands. All CLI commands now use two dashes for flags (eg `ng build --prod --source-map`) to be POSIX compliant.
    action:
      '`package.json`의 `scripts`를 최신 Angular CLI 명령을 사용하도록 업데이트하세요. 이제 모든 CLI 명령은 POSIX를 준수하도록 플래그에 하이픈 두 개를 사용합니다. 예: `ng build --prod --source-map`',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'Update to Angular v6',
    // Original: Update all of your Angular framework packages to v6, and the correct version of RxJS and TypeScript.<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/core@6`<br/><br/>After the update, TypeScript and RxJS will more accurately flow types across your application, which may expose existing errors in your application's typings
    action:
      '모든 Angular 프레임워크 패키지를 v6으로, RxJS와 TypeScript를 호환되는 버전으로 업데이트하세요.<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/core@6`<br/><br/>업데이트 후에는 TypeScript와 RxJS가 애플리케이션 전체의 타입 흐름을 더 정확하게 추적하므로 기존 타입 선언의 오류가 드러날 수 있습니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'Update to Angular v6',
    // Original: Update all of your Angular framework packages to v6, and the correct version of RxJS and TypeScript.<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/cli@6 @angular/core@6"`<br/><br/>After the update, TypeScript and RxJS will more accurately flow types across your application, which may expose existing errors in your application's typings
    action:
      '모든 Angular 프레임워크 패키지를 v6으로, RxJS와 TypeScript를 호환되는 버전으로 업데이트하세요.<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/cli@6 @angular/core@6"`<br/><br/>업데이트 후에는 TypeScript와 RxJS가 애플리케이션 전체의 타입 흐름을 더 정확하게 추적하므로 기존 타입 선언의 오류가 드러날 수 있습니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'forms v6',
    // Original: In Angular Forms, `AbstractControl#statusChanges` now emits an event of `PENDING` when you call `AbstractControl#markAsPending`. Ensure that if you are filtering or checking events from `statusChanges` that you account for the new event when calling `markAsPending`.
    action:
      'Angular 폼에서 `AbstractControl#markAsPending`를 호출하면 이제 `AbstractControl#statusChanges`가 `PENDING` 이벤트를 방출합니다. `statusChanges`의 이벤트를 필터링하거나 확인한다면 `markAsPending` 호출 시 이 새 이벤트도 고려하세요.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Advanced,
    step: 'animations timing',
    // Original: If you use totalTime from an `AnimationEvent` within a disabled Zone, it will no longer report a time of 0. To detect if an animation event is reporting a disabled animation then the `event.disabled` property can be used instead.
    action:
      '비활성화된 존 안에서 `AnimationEvent`의 totalTime을 사용하면 더 이상 시간이 0으로 보고되지 않습니다. 애니메이션 이벤트가 비활성화된 애니메이션을 나타내는지 확인하려면 대신 `event.disabled` 프로퍼티를 사용하세요.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Advanced,
    step: 'ngModel on form control',
    // Original: Support for using the ngModel input property and ngModelChange event with reactive form directives has been deprecated in v6 and removed in v7.
    action:
      '반응형 폼 디렉티브에서 ngModel 입력 프로퍼티와 ngModelChange 이벤트를 사용하는 기능은 v6에서 지원 중단 예정으로 지정되었고 v7에서 제거되었습니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Medium,
    step: 'ngModelChange order',
    // Original: ngModelChange is now emitted after the value/validity is updated on its control instead of before to better match expectations. If you rely on the order of these events, you will need to begin tracking the old value in your component.
    action:
      '예상한 동작에 더 잘 맞도록 ngModelChange는 이제 컨트롤의 값과 유효성을 갱신하기 전이 아니라 갱신한 뒤에 발생합니다. 이 이벤트 순서에 의존한다면 컴포넌트에서 이전 값을 추적해야 합니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: false,
    material: true,
    step: 'Update Dependencies for v6',
    // Original: Update Angular Material to the latest version.<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/material@6`<br/><br/>This will also automatically migrate deprecated APIs.
    action:
      'Angular Material을 최신 버전으로 업데이트하세요.<br/><br/>`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@6 update @angular/material@6`<br/><br/>지원 중단 예정 API도 자동으로 마이그레이션됩니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Basic,
    windows: true,
    material: true,
    step: 'Update Dependencies for v6',
    // Original: Update Angular Material to the latest version.<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/material@6"`<br/><br/>This will also automatically migrate deprecated APIs.
    action:
      'Angular Material을 최신 버전으로 업데이트하세요.<br/><br/>`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/material@6"`<br/><br/>지원 중단 예정 API도 자동으로 마이그레이션됩니다.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 600,
    level: ApplicationComplexity.Medium,
    step: 'strictPropertyInitializer',
    // Original: If you have TypeScript configured to be strict (if you have set `strict` to `true` in your `tsconfig.json` file), update your `tsconfig.json` to disable `strictPropertyInitialization` or move property initialization from `ngOnInit` to your constructor. You can learn more about this flag on the [TypeScript 2.7 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#strict-class-initialization).
    action:
      'TypeScript를 엄격 모드로 설정했다면, 즉 `tsconfig.json` 파일에서 `strict`를 `true`로 설정했다면 `tsconfig.json`에서 `strictPropertyInitialization`을 비활성화하거나 프로퍼티 초기화를 `ngOnInit`에서 생성자로 옮기세요. 이 플래그에 대한 자세한 내용은 [TypeScript 2.7 릴리즈 노트](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#strict-class-initialization)를 참고하세요.',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    step: 'update to RxJS 6',
    // Original: Remove deprecated RxJS 5 features using [rxjs-tslint auto update rules](https://github.com/ReactiveX/rxjs-tslint)<br/><br/>For most applications this will mean running the following two commands:<br/><br/>`npx rxjs-tslint`<br/>`rxjs-5-to-6-migrate -p src/tsconfig.app.json`
    action:
      '[rxjs-tslint 자동 업데이트 규칙](https://github.com/ReactiveX/rxjs-tslint)으로 지원 중단 예정인 RxJS 5 기능을 제거하세요.<br/><br/>대부분의 애플리케이션에서는 다음 두 명령을 실행하면 됩니다.<br/><br/>`npx rxjs-tslint`<br/>`rxjs-5-to-6-migrate -p src/tsconfig.app.json`',
  },
  {
    possibleIn: 600,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Medium,
    step: 'remove rxjs-compat',
    // Original: Once you and all of your dependencies have updated to RxJS 6, remove `rxjs-compat`.
    action: '애플리케이션과 모든 의존성을 RxJS 6으로 업데이트했다면 `rxjs-compat`을 제거하세요.',
  },
  {
    possibleIn: 610,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Medium,
    step: 'use files instead of versionedFiles',
    // Original: If you use the Angular Service worker, migrate any `versionedFiles` to the `files` array. The behavior is the same.
    action:
      'Angular 서비스 워커를 사용한다면 모든 `versionedFiles`를 `files` 배열로 옮기세요. 동작은 동일합니다.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    step: 'TypeScript 3.1',
    // Original: Angular now uses TypeScript 3.1, read more about [any potential breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html).
    action:
      'Angular는 이제 TypeScript 3.1을 사용합니다. [호환성을 깨뜨릴 수 있는 변경 사항](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html)을 확인하세요.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    step: 'Node 10',
    // Original: Angular has now added support for [Node 10](https://nodejs.org/en/blog/release/v10.0.0/).
    action:
      'Angular에 [Node 10](https://nodejs.org/en/blog/release/v10.0.0/) 지원이 추가되었습니다.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'v7 update',
    // Original: Update to v7 of the core framework and CLI by running `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@7 update @angular/cli@7 @angular/core@7` in your terminal.
    action:
      '터미널에서 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@7 update @angular/cli@7 @angular/core@7`를 실행하여 코어 프레임워크와 CLI를 v7로 업데이트하세요.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'v7 update',
    // Original: Update to v7 of the core framework and CLI by running `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@7 update @angular/cli@7 @angular/core@7"` in your terminal.
    action:
      '터미널에서 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@7 update @angular/cli@7 @angular/core@7"`를 실행하여 코어 프레임워크와 CLI를 v7로 업데이트하세요.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    windows: false,
    material: true,
    step: 'v7 material update',
    // Original: Update Angular Material to v7 by running `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@7 update @angular/material@7` in your terminal. You should test your application for sizing and layout changes.
    action:
      '터미널에서 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@7 update @angular/material@7`를 실행하여 Angular Material을 v7로 업데이트하세요. 애플리케이션의 크기와 레이아웃이 변경되었는지 테스트하세요.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Basic,
    windows: true,
    material: true,
    step: 'v7 material update',
    // Original: Update Angular Material to v7 by running `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@7 update @angular/material@7"` in your terminal. You should test your application for sizing and layout changes.
    action:
      '터미널에서 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@7 update @angular/material@7"`를 실행하여 Angular Material을 v7로 업데이트하세요. 애플리케이션의 크기와 레이아웃이 변경되었는지 테스트하세요.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 700,
    level: ApplicationComplexity.Medium,
    material: true,
    step: 'v7 material changes',
    // Original: If you use screenshot tests, you'll need to regenerate your screenshot golden files as many minor visual tweaks have landed.
    action:
      '여러 작은 시각적 수정이 반영되었으므로 스크린샷 테스트를 사용한다면 기준 스크린샷 파일을 다시 생성해야 합니다.',
  },
  {
    possibleIn: 700,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v7 material deprecations',
    // Original: Stop using `matRippleSpeedFactor` and `baseSpeedFactor` for ripples, using Animation config instead.
    action:
      '물결 효과에 `matRippleSpeedFactor`와 `baseSpeedFactor`를 사용하지 말고 애니메이션 설정을 사용하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'v8 update',
    // Original: Update to version 8 of the core framework and CLI by running `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/cli@8 @angular/core@8` in your terminal and review and commit the changes.
    action:
      '터미널에서 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/cli@8 @angular/core@8`를 실행하여 코어 프레임워크와 CLI를 버전 8로 업데이트하고 변경 사항을 검토한 뒤 커밋하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'v8 update',
    // Original: Update to version 8 of the core framework and CLI by running `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/cli@8 @angular/core@8"` in your terminal and review and commit the changes.
    action:
      '터미널에서 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/cli@8 @angular/core@8"`를 실행하여 코어 프레임워크와 CLI를 버전 8로 업데이트하고 변경 사항을 검토한 뒤 커밋하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'use ::ng-deep instead of /deep/',
    // Original: Replace `/deep/` with `::ng-deep` in your styles, [read more about angular component styles and ::ng-deep](https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep). `/deep/` and `::ng-deep` both are deprecated but using `::ng-deep` is preferred until the shadow-piercing descendant combinator is [removed from browsers and tools](https://chromestatus.com/feature/5045542597951488) completely.
    action:
      '스타일의 `/deep/`을 `::ng-deep`으로 바꾸세요. [Angular 컴포넌트 스타일과 ::ng-deep에 대해 자세히 알아보세요](https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep). `/deep/`과 `::ng-deep` 모두 지원 중단 예정이지만, Shadow DOM 경계를 통과하는 하위 결합자가 [브라우저와 도구에서 완전히 제거](https://chromestatus.com/feature/5045542597951488)될 때까지는 `::ng-deep` 사용을 권장합니다.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'TypeScript 3.4',
    // Original: Angular now uses TypeScript 3.4, [read more about errors that might arise from improved type checking](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html).
    action:
      'Angular는 이제 TypeScript 3.4를 사용합니다. [향상된 타입 검사로 발생할 수 있는 오류](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html)를 확인하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'node 10',
    // Original: Make sure you are using [Node 10 or later](https://www.hostingadvice.com/how-to/update-node-js-latest-version/).
    action:
      '[Node 10 이상](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'Differential Loading',
    // Original: The CLI's build command now automatically creates a modern ES2015 build with minimal polyfills and a compatible ES5 build for older browsers, and loads the appropriate file based on the browser.  You may opt-out of this change by setting your `target` back to `es5` in your `tsconfig.json`. Learn more on [angular.io](https://angular.io/guide/deployment#differential-loading).
    action:
      'CLI의 빌드 명령은 이제 최소한의 폴리필을 사용하는 최신 ES2015 빌드와 이전 브라우저용 ES5 호환 빌드를 자동으로 생성하고, 브라우저에 맞는 파일을 로드합니다. 이 변경을 적용하지 않으려면 `tsconfig.json`에서 `target`을 `es5`로 되돌리세요. 자세한 내용은 [angular.io](https://angular.io/guide/deployment#differential-loading)를 참고하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'CLI Telemetry',
    // Original: When using new versions of the CLI, you will be asked if you want to opt-in to share your CLI usage data. You can also add your own Google Analytics account. This lets us make better decisions about which CLI features to prioritize, and measure the impact of our improvements. Learn more on [angular.io](https://angular.io/analytics).
    action:
      '새 CLI 버전을 사용하면 CLI 사용 데이터를 공유할지 묻는 메시지가 표시됩니다. 본인의 Google Analytics 계정도 추가할 수 있습니다. 이를 통해 Angular 팀은 우선 개발할 CLI 기능을 더 잘 판단하고 개선 효과를 측정할 수 있습니다. 자세한 내용은 [angular.io](https://angular.io/analytics)를 참고하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    step: 'static query timing',
    // Original: If you use `ViewChild` or `ContentChild`, we're updating the way we resolve these queries to give developers more control. You must now specify that change detection should run before results are set. Example: `@ContentChild('foo', {static: false}) foo !: ElementRef;`. `ng update` will update your queries automatically, but it will err on the side of making your queries `static` for compatibility. Learn more on [angular.io](https://angular.io/guide/static-query-migration).
    action:
      "`ViewChild`나 `ContentChild`를 사용한다면 개발자가 더 세밀하게 제어할 수 있도록 쿼리 처리 방식이 변경됩니다. 이제 결과를 설정하기 전에 변경 감지를 실행할지 지정해야 합니다. 예: `@ContentChild('foo', {static: false}) foo !: ElementRef;`. `ng update`가 쿼리를 자동으로 업데이트하지만, 호환성을 위해 쿼리를 `static`으로 지정하는 쪽을 우선합니다. 자세한 내용은 [angular.io](https://angular.io/guide/static-query-migration)를 참고하세요.",
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    windows: false,
    material: true,
    step: 'v8 material update',
    // Original: Update Angular Material to version 8 by running `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/material@8` in your terminal.
    action:
      '터미널에서 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/material@8`를 실행하여 Angular Material을 버전 8로 업데이트하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Basic,
    windows: true,
    material: true,
    step: 'v8 material update',
    // Original: Update Angular Material to version 8 by running `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/material@8"` in your terminal.
    action:
      '터미널에서 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/material@8"`를 실행하여 Angular Material을 버전 8로 업데이트하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'deep imports',
    // Original: Instead of importing from `@angular/material`, you should import deeply from the specific component. E.g. `@angular/material/button`. `ng update` will do this automatically for you.
    action:
      '`@angular/material`에서 불러오는 대신 `@angular/material/button`처럼 특정 컴포넌트의 세부 경로에서 불러오세요. `ng update`가 자동으로 처리합니다.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    step: 'new loadChildren',
    // Original: For lazy loaded modules via the router, make sure you are [using dynamic imports](https://angular.io/guide/deprecations#loadchildren-string-syntax). Importing via string is removed in v9. `ng update` should take care of this automatically. Learn more on [angular.io](https://angular.io/guide/deprecations#loadchildren-string-syntax).
    action:
      '라우터로 지연 로드하는 모듈은 [동적 import를 사용](https://angular.io/guide/deprecations#loadchildren-string-syntax)하는지 확인하세요. 문자열을 통한 import는 v9에서 제거됩니다. `ng update`가 자동으로 처리합니다. 자세한 내용은 [angular.io](https://angular.io/guide/deprecations#loadchildren-string-syntax)를 참고하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'platform deprecated',
    // Original: We are deprecating support for `@angular/platform-webworker`, as it has been incompatible with the CLI. Running Angular's rendering architecture in a web worker did not meet developer needs. You can still use web workers with Angular. Learn more in our [web worker guide](https://v9.angular.io/guide/web-worker). If you have use cases where you need this, let us know at devrel@angular.io!
    action:
      'CLI와 호환되지 않았던 `@angular/platform-webworker`의 지원을 중단할 예정입니다. 웹 워커에서 Angular 렌더링 아키텍처를 실행하는 방식은 개발자의 요구를 충족하지 못했습니다. Angular에서 웹 워커 자체는 계속 사용할 수 있습니다. 자세한 내용은 [웹 워커 가이드](https://v9.angular.io/guide/web-worker)를 참고하세요. 이 기능이 필요한 사용 사례가 있다면 devrel@angular.io로 알려주세요!',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Advanced,
    step: 'node-sass',
    // Original: We have switched from the native Sass compiler to the JavaScript compiler. To switch back to the native version, install it as a devDependency: `npm install node-sass --save-dev`.
    action:
      '네이티브 Sass 컴파일러에서 JavaScript 컴파일러로 전환했습니다. 네이티브 버전으로 돌아가려면 devDependency로 설치하세요: `npm install node-sass --save-dev`.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 800,
    level: ApplicationComplexity.Advanced,
    step: 'schematics async',
    // Original: If you are building your own Schematics, they have previously been *potentially* asynchronous. As of 8.0, all schematics will be asynchronous.
    action:
      '직접 스키매틱을 만든다면 이전에는 비동기일 *수도* 있었지만, 8.0부터는 모든 스키매틱이 비동기로 실행됩니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    step: 'node 10.13',
    // Original: Make sure you are using [Node 10.13 or later](https://www.hostingadvice.com/how-to/update-node-js-latest-version/).
    action:
      '[Node 10.13 이상](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'cli v8 latest',
    // Original: Run `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/core@8 @angular/cli@8` in your workspace directory to update to the latest 8.x version of `@angular/core` and `@angular/cli` and commit these changes.
    action:
      '워크스페이스 디렉터리에서 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@8 update @angular/core@8 @angular/cli@8`를 실행하여 `@angular/core`와 `@angular/cli`를 최신 8.x 버전으로 업데이트하고 변경 사항을 커밋하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'cli v8 latest',
    // Original: Run `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/cli@8 @angular/core@8"` in your workspace directory to update to the latest 8.x version of `@angular/core` and `@angular/cli` and commit these changes.
    action:
      '워크스페이스 디렉터리에서 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@8 update @angular/cli@8 @angular/core@8"`를 실행하여 `@angular/core`와 `@angular/cli`를 최신 8.x 버전으로 업데이트하고 변경 사항을 커밋하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Medium,
    step: 'create commits',
    // Original: You can optionally pass the `--create-commits` (or `-C`) flag to [ng update](https://angular.io/cli/update) commands to create a git commit per individual migration.
    action:
      '[ng update](https://angular.io/cli/update) 명령에 `--create-commits` 또는 `-C` 플래그를 추가하면 개별 마이그레이션마다 Git 커밋을 생성할 수 있습니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: false,
    step: 'ng update v9',
    // Original: Run `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @angular/core@9 @angular/cli@9` which should bring you to version 9 of Angular.
    action:
      '`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @angular/core@9 @angular/cli@9`를 실행하여 Angular 버전 9로 업데이트하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: true,
    step: 'ng update v9',
    // Original: Run `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @angular/cli@9 @angular/core@9"` which should bring you to version 9 of Angular.
    action:
      '`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @angular/cli@9 @angular/core@9"`를 실행하여 Angular 버전 9로 업데이트하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    step: 'typescript 3.8',
    // Original: Your project has now been updated to TypeScript 3.8, read more about new compiler checks and errors that might require you to fix issues in your code in the [TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) or [TypeScript 3.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html) announcements.
    action:
      '프로젝트가 TypeScript 3.8로 업데이트되었습니다. 코드 수정이 필요할 수 있는 새로운 컴파일러 검사와 오류는 [TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) 또는 [TypeScript 3.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html) 발표 문서를 참고하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: false,
    material: true,
    step: 'update @angular/material',
    // Original: Run `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @angular/material@9`.
    action:
      '`NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @angular/material@9`를 실행하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    windows: true,
    material: true,
    step: 'update @angular/material',
    // Original: Run `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @angular/material@9"`.
    action:
      '`cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @angular/material@9"`를 실행하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    windows: false,
    step: 'update @nguniversal/hapi-engine',
    // Original: If you use Angular Universal, run `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @nguniversal/hapi-engine@9` or `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @nguniversal/express-engine@9` depending on the engine you use. This step may require the `--force` flag if any of your third-party dependencies have not updated the Angular version of their peer dependencies.
    action:
      'Angular Universal을 사용한다면 사용 중인 엔진에 따라 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @nguniversal/hapi-engine@9` 또는 `NG_DISABLE_VERSION_CHECK=1 npx @angular/cli@9 update @nguniversal/express-engine@9`를 실행하세요. 서드 파티 의존성 중 peerDependencies의 Angular 버전을 업데이트하지 않은 것이 있다면 이 단계에 `--force` 플래그가 필요할 수 있습니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    windows: true,
    step: 'update @nguniversal/hapi-engine',
    // Original: If you use Angular Universal, run `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @nguniversal/hapi-engine@9"` or `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @nguniversal/express-engine@9"` depending on the engine you use. This step may require the `--force` flag if any of your third-party dependencies have not updated the Angular version of their peer dependencies.
    action:
      'Angular Universal을 사용한다면 사용 중인 엔진에 따라 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @nguniversal/hapi-engine@9"` 또는 `cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@9 update @nguniversal/express-engine@9"`를 실행하세요. 서드 파티 의존성 중 peerDependencies의 Angular 버전을 업데이트하지 않은 것이 있다면 이 단계에 `--force` 플래그가 필요할 수 있습니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    step: 'dependencies update',
    // Original: If your project depends on other Angular libraries, we recommend that you consider updating to their latest version. In some cases this update might be required in order to resolve API incompatibilities. Consult `ng update` or `npm outdated` to learn about your outdated libraries.
    action:
      '프로젝트가 다른 Angular 라이브러리에 의존한다면 해당 라이브러리도 최신 버전으로 업데이트하는 것을 권장합니다. API 비호환성을 해결하기 위해 반드시 업데이트해야 하는 경우도 있습니다. `ng update`나 `npm outdated`로 오래된 라이브러리를 확인하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Basic,
    step: 'ivy update',
    // Original: During the update to version 9, your project was transformed as necessary via code migrations in order to remove any incompatible or deprecated API calls from your code base. You can now review these changes, and consult the [Updating to version 9 guide](https://v9.angular.io/guide/updating-to-version-9) to learn more about the changes.
    action:
      '버전 9로 업데이트하는 동안 호환되지 않거나 지원 중단 예정인 API 호출을 제거하기 위해 필요한 코드 마이그레이션이 프로젝트에 적용되었습니다. 변경 사항을 검토하고 [버전 9 업데이트 가이드](https://v9.angular.io/guide/updating-to-version-9)에서 자세한 내용을 확인하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Medium,
    step: 'stylesUpdate',
    // Original: Bound CSS styles and classes previously were applied with a "last change wins" strategy, but now follow a defined precedence. Learn more about [Styling Precedence](https://angular.io/guide/attribute-binding#styling-precedence).
    action:
      '바인딩된 CSS 스타일과 클래스는 이전에 “마지막 변경 우선” 방식으로 적용되었지만 이제 정해진 우선순위를 따릅니다. [스타일 적용 우선순위](https://angular.io/guide/attribute-binding#styling-precedence)를 자세히 알아보세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'ModuleWithProviders',
    // Original: If you are a library author and you had a method returning `ModuleWithProviders`  (typically via a method named `forRoot()`), you will need to specify the generic type. Learn more [angular.io](https://v9.angular.io/guide/deprecations#modulewithproviders-type-without-a-generic)
    action:
      '라이브러리 작성자가 `ModuleWithProviders`를 반환하는 메서드, 보통 `forRoot()`라는 메서드를 사용했다면 제네릭 타입을 지정해야 합니다. 자세한 내용은 [angular.io](https://v9.angular.io/guide/deprecations#modulewithproviders-type-without-a-generic)를 참고하세요.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'wtf',
    // Original: Support for web tracing framework in Angular was deprecated in version 8. You should stop using any of the `wtf*` APIs. To do performance tracing, we recommend using [browser performance tools](https://developer.chrome.com/docs/lighthouse/performance/user-timings).
    action:
      'Angular의 웹 추적 프레임워크 지원은 버전 8에서 지원 중단 예정으로 지정되었습니다. 모든 `wtf*` API 사용을 중단하세요. 성능 추적에는 [브라우저 성능 도구](https://developer.chrome.com/docs/lighthouse/performance/user-timings) 사용을 권장합니다.',
  },
  {
    possibleIn: 800,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Medium,
    step: 'es5browser',
    // Original: Remove any `es5BrowserSupport` flags in your `angular.json` and set your `target` to `es2015` in your `tsconfig.json`. Angular now uses your browserslist to determine if an ES5 build is needed. `ng update` will migrate you automatically.
    action:
      '`angular.json`에서 모든 `es5BrowserSupport` 플래그를 제거하고 `tsconfig.json`의 `target`을 `es2015`로 설정하세요. 이제 Angular는 browserslist로 ES5 빌드가 필요한지 판단합니다. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Medium,
    step: 'ngForm selector',
    // Original: If you use `ngForm` element selector to create Angular Forms, you should instead use `ng-form`.
    action: 'Angular 폼을 생성할 때 `ngForm` 엘리먼트 셀렉터를 사용한다면 `ng-form`으로 바꾸세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'typings compilation',
    // Original: We have updated the `tsconfig.app.json` to limit the files compiled. If you rely on other files being included in the compilation, such as a `typings.d.ts` file, you need to manually add it to the compilation.
    action:
      '컴파일할 파일을 제한하도록 `tsconfig.app.json`을 업데이트했습니다. `typings.d.ts` 같은 다른 파일도 컴파일에 포함되어야 한다면 직접 추가해야 합니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'debug',
    // Original: With Angular 9 Ivy is now the default rendering engine, for any compatibility problems that might arise, read the [Ivy compatibility guide](https://v9.angular.io/guide/ivy-compatibility).
    action:
      'Angular 9부터 Ivy가 기본 렌더링 엔진입니다. 호환성 문제가 발생하면 [Ivy 호환성 가이드](https://v9.angular.io/guide/ivy-compatibility)를 참고하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 900,
    level: ApplicationComplexity.Advanced,
    step: 'express-universal-server',
    // Original: If you use Angular Universal with  `@nguniversal/express-engine` or `@nguniversal/hapi-engine`, several backup files will be created. One of them for `server.ts`. If this file defers from the default one, you may need to copy some changes from the `server.ts.bak` to `server.ts` manually.
    action:
      'Angular Universal에서 `@nguniversal/express-engine`이나 `@nguniversal/hapi-engine`을 사용하면 여러 백업 파일이 생성되며, `server.ts`의 백업도 포함됩니다. 이 파일이 기본 파일과 다르다면 `server.ts.bak`의 일부 변경 사항을 `server.ts`로 직접 복사해야 할 수도 있습니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    step: 'ivy i18n',
    // Original: Angular 9 introduced a global `$localize()` function that needs to be loaded if you depend on Angular's internationalization (i18n). Run `ng add @angular/localize` to add the necessary packages and code modifications. Consult the [$localize Global Import Migration guide](https://v9.angular.io/guide/migration-localize) to learn more about the changes.
    action:
      'Angular 9에는 전역 `$localize()` 함수가 도입되었습니다. Angular의 국제화(i18n) 기능을 사용한다면 이 함수를 로드해야 합니다. `ng add @angular/localize`를 실행하여 필요한 패키지를 추가하고 코드를 수정하세요. 자세한 변경 사항은 [$localize 전역 import 마이그레이션 가이드](https://v9.angular.io/guide/migration-localize)를 참고하세요.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'entryComponents',
    // Original: In your application projects, you can remove `entryComponents` NgModules and any uses of `ANALYZE_FOR_ENTRY_COMPONENTS`. They are no longer required with the Ivy compiler and runtime. You may need to keep these if building a library that will be consumed by a View Engine application.
    action:
      '애플리케이션 프로젝트에서는 NgModule의 `entryComponents`와 모든 `ANALYZE_FOR_ENTRY_COMPONENTS` 사용을 제거할 수 있습니다. Ivy 컴파일러와 런타임에서는 더 이상 필요하지 않습니다. View Engine 애플리케이션에서 사용할 라이브러리를 빌드한다면 유지해야 할 수도 있습니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'testbed-get',
    // Original: If you use `TestBed.get`, you should instead use `TestBed.inject`. This new method has the same behavior, but is type safe.
    action:
      '`TestBed.get`을 사용한다면 `TestBed.inject`로 바꾸세요. 새 메서드는 동작이 같으면서 타입 안전성을 제공합니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: '$localize',
    // Original: If you use [Angular's i18n support](https://angular.io/guide/i18n), you will need to begin using `@angular/localize`. Learn more about the [$localize Global Import Migration](https://v9.angular.io/guide/migration-localize).
    action:
      '[Angular의 i18n 지원](https://angular.io/guide/i18n)을 사용한다면 `@angular/localize`를 사용해야 합니다. [$localize 전역 import 마이그레이션](https://v9.angular.io/guide/migration-localize)을 자세히 알아보세요.',
  },

  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    step: 'v10 Node.js 12',
    // Original: Make sure you are using [Node 12 or later](https://nodejs.org/dist/latest-v12.x/).
    action: '[Node 12 이상](https://nodejs.org/dist/latest-v12.x/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    step: 'ng update v10',
    // Original: Run `npx @angular/cli@10 update @angular/core@10 @angular/cli@10` which should bring you to version 10 of Angular.
    action:
      '`npx @angular/cli@10 update @angular/core@10 @angular/cli@10`를 실행하여 Angular 버전 10으로 업데이트하세요.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `npx @angular/cli@10 update @angular/material@10`.
    action: '`npx @angular/cli@10 update @angular/material@10`를 실행하세요.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    step: 'browserlist',
    // Original: New projects use the filename `.browserslistrc` instead of `browserslist`. `ng update` will migrate you automatically.
    action:
      '새 프로젝트는 `browserslist` 대신 `.browserslistrc` 파일 이름을 사용합니다. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'v10-versions',
    // Original: Angular now requires `tslint` v6, `tslib` v2, and [TypeScript 3.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html). `ng update` will migrate you automatically.
    action:
      'Angular는 이제 `tslint` v6, `tslib` v2, [TypeScript 3.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html)가 필요합니다. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'styleext',
    // Original: Stop using `styleext` or `spec` in your Angular schematics. `ng update` will migrate you automatically.
    action:
      'Angular 스키매틱에서 `styleext`나 `spec`을 더 이상 사용하지 마세요. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'classes-without-decorators',
    // Original: In version 10, classes that use Angular features and do not have an Angular decorator are no longer supported.  [Read more](https://v10.angular.io/guide/migration-undecorated-classes).  `ng update` will migrate you automatically.
    action:
      '버전 10부터 Angular 기능을 사용하면서 Angular 데코레이터가 없는 클래스는 지원하지 않습니다. [자세히 알아보세요](https://v10.angular.io/guide/migration-undecorated-classes). `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 900,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'injectable-definitions',
    // Original: As of Angular 9, enforcement of @Injectable decorators for DI is stricter and incomplete provider definitions behave differently. [Read more](https://v9.angular.io/guide/migration-injectable). `ng update` will migrate you automatically.
    action:
      'Angular 9부터 의존성 주입에서 @Injectable 데코레이터 사용을 더 엄격하게 적용하며, 불완전한 프로바이더 정의의 동작도 달라집니다. [자세히 알아보세요](https://v9.angular.io/guide/migration-injectable). `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'closure-jsdoc-comments',
    // Original: Angular's npm packages no longer contain jsdoc comments, which are necessary for use with closure compiler (extremely uncommon). This support was experimental and only worked in some use cases. There will be an alternative recommended path announced shortly.
    action:
      'Angular의 npm 패키지에는 이제 Closure Compiler 사용에 필요한 JSDoc 주석이 포함되지 않습니다. 이런 사용 사례는 매우 드뭅니다. 이 지원은 실험적이었으며 일부 경우에만 동작했습니다. 권장하는 대체 방법을 곧 발표할 예정입니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'forms-number-input',
    // Original: If you use Angular forms, inputs of type `number` no longer listen to [change events](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event) (this events are not necessarily fired for each alteration the value), instead listen for an [input events](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event).
    action:
      'Angular 폼에서 `number` 타입의 입력 요소는 더 이상 [change 이벤트](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)를 수신하지 않고 [input 이벤트](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event)를 수신합니다. change 이벤트는 값이 바뀔 때마다 반드시 발생하는 것은 아닙니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'forms-length-input',
    // Original: For Angular forms validation, the `minLength` and `maxLength` validators now verify that the form control's value has a numeric length property, and only validate for length if that's the case.
    action:
      'Angular 폼의 `minLength` 및 `maxLength` 유효성 검사기는 이제 폼 컨트롤 값의 length 프로퍼티가 숫자인지 확인하고, 숫자일 때만 길이를 검사합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'esm5-bundles',
    // Original: The [Angular Package Format](https://angular.dev/tools/libraries/angular-package-format) has been updated to remove `esm5` and `fesm5` formats. These are no longer distributed in our npm packages. If you don't use the CLI, you may need to downlevel Angular code to ES5 yourself.
    action:
      '[Angular 패키지 형식](https://angular.dev/tools/libraries/angular-package-format)에서 `esm5` 및 `fesm5` 형식이 제거되었습니다. 이제 Angular npm 패키지는 이 형식으로 배포되지 않습니다. CLI를 사용하지 않는다면 Angular 코드를 ES5로 직접 변환해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'console-errors',
    // Original: Warnings about unknown elements are now logged as errors. This won't break your app, but it may trip up tools that expect nothing to be logged via `console.error`.
    action:
      '알 수 없는 엘리먼트에 대한 경고가 이제 오류로 기록됩니다. 애플리케이션이 중단되지는 않지만 `console.error`로 아무것도 기록되지 않는다고 가정하는 도구에는 문제가 생길 수 있습니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'router-resolver-empty',
    // Original: Any resolver which returns `EMPTY` will cancel navigation. If you want to allow navigation to continue, you will need to update the resolvers to emit some value, (i.e. `defaultIfEmpty(...)`, `of(...)`, etc).
    action:
      '`EMPTY`를 반환하는 리졸버는 탐색을 취소합니다. 탐색을 계속하려면 `defaultIfEmpty(...)`, `of(...)` 등의 방법으로 리졸버가 어떤 값이든 방출하도록 수정해야 합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'sw-vary-headers',
    // Original: If you use the Angular service worker and rely on resources with [Vary](https://developer.mozilla.org/docs/Web/HTTP/Headers/Vary) headers, these headers are now ignored to avoid unpredictable behavior across browsers. To avoid this, [configure](https://angular.io/guide/service-worker-config) your service worker to avoid caching these resources.
    action:
      'Angular 서비스 워커를 사용하면서 [Vary](https://developer.mozilla.org/docs/Web/HTTP/Headers/Vary) 헤더가 있는 리소스에 의존한다면, 이제 브라우저마다 예측할 수 없는 동작을 방지하기 위해 이 헤더를 무시한다는 점에 유의하세요. 이를 피하려면 서비스 워커가 해당 리소스를 캐시하지 않도록 [설정](https://angular.io/guide/service-worker-config)하세요.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Medium,
    step: 'expression-changed-after-checked-new',
    // Original: You may see `ExpressionChangedAfterItHasBeenChecked` errors that were not detected before when using the `async` pipe. The error could previously have gone undetected because two `WrappedValues` are considered "equal" in all cases for the purposes of the check, even if their respective unwrapped values are not. In version 10, `WrappedValue` has been removed.
    action:
      '`async` 파이프를 사용할 때 이전에 감지하지 못했던 `ExpressionChangedAfterItHasBeenChecked` 오류가 나타날 수 있습니다. 이전에는 두 `WrappedValues`가 감싼 값이 서로 달라도 검사에서 항상 “같음”으로 간주했기 때문에 오류가 감지되지 않을 수 있었습니다. 버전 10에서는 `WrappedValue`가 제거되었습니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'property-binding-change-detection',
    // Original: If you have a property binding such as `[val]=(observable | async).someProperty`, this will no longer trigger change detection if the value of `someProperty` is identical to the previous emit. If you rely on this, either manually subscribe and call `markForCheck` as needed or update the binding to ensure the reference changes.
    action:
      '`[val]=(observable | async).someProperty` 같은 프로퍼티 바인딩은 `someProperty` 값이 이전에 방출된 값과 같으면 더 이상 변경 감지를 일으키지 않습니다. 이 동작에 의존한다면 직접 구독하고 필요할 때 `markForCheck`를 호출하거나, 참조가 바뀌도록 바인딩을 수정하세요.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'day-periods-crossing-midnight',
    // Original: If you use either `formatDate()` or `DatePipe` and any of the `b` or `B` format codes, the logic has been updated so that it matches times that are within a day period that spans midnight, so it will now render the correct output, such as at `night` in the case of English.
    action:
      '`formatDate()` 또는 `DatePipe`와 함께 `b`나 `B` 형식 코드를 사용한다면, 자정을 걸치는 시간대에 속하는 시각도 일치하도록 로직이 변경되었습니다. 따라서 영어의 `night`처럼 올바른 결과가 렌더링됩니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Advanced,
    step: 'urlmatcher-null',
    // Original: If you use the `UrlMatcher`, the type now reflects that it could always return `null`.
    action: '`UrlMatcher`의 타입이 이제 언제든 `null`을 반환할 수 있다는 점을 반영합니다.',
  },
  {
    possibleIn: 1000,
    necessaryAsOf: 1000,
    level: ApplicationComplexity.Basic,
    step: 'v10-more-details',
    // Original: For more details about deprecations, automated migrations, and changes visit the [guide angular.io](https://v10.angular.io/guide/updating-to-version-10)
    action:
      '지원 중단 예정 기능, 자동 마이그레이션, 변경 사항에 대한 자세한 내용은 [angular.io 가이드](https://v10.angular.io/guide/updating-to-version-10)를 참고하세요.',
  },
  {
    possibleIn: 1020,
    necessaryAsOf: 1020,
    level: ApplicationComplexity.Medium,
    step: 'universal-baseurl',
    // Original: For Angular Universal users, if you use `useAbsoluteUrl` to setup `platform-server`, you now need to also specify `baseUrl`.
    action:
      'Angular Universal에서 `useAbsoluteUrl`로 `platform-server`를 설정한다면 이제 `baseUrl`도 지정해야 합니다.',
  },

  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Basic,
    step: 'v11 ng update',
    // Original: Run `ng update @angular/core@11 @angular/cli@11` which should bring you to version 11 of Angular.
    action:
      '`ng update @angular/core@11 @angular/cli@11`를 실행하여 Angular 버전 11로 업데이트하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@11`.
    action: '`ng update @angular/material@11`를 실행하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Basic,
    step: 'v11 versions',
    // Original: Angular now requires [TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/). `ng update` will migrate you automatically.
    action:
      'Angular는 이제 [TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)이 필요합니다. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Basic,
    step: 'v11 browser support',
    // Original: Support for IE9, IE10, and IE mobile has been removed. This was announced in the [v10 update](https://blog.angular.dev/version-10-of-angular-now-available-78960babd41#c357).
    action:
      'IE9, IE10, IE 모바일 지원이 제거되었습니다. 이 변경은 [v10 업데이트](https://blog.angular.dev/version-10-of-angular-now-available-78960babd41#c357)에서 예고했습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'webpack5 optin',
    // Original: You can now opt-in to use webpack 5 by using Yarn and adding `"resolutions": {"webpack": "^5.0.0"}` to your `package.json`.
    action:
      'Yarn을 사용하고 `package.json`에 `"resolutions": {"webpack": "^5.0.0"}`을 추가하면 webpack 5 사용을 선택할 수 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'ng new strict prompt',
    // Original: When generating new projects, you will be asked if you want to enable strict mode. This will configure TypeScript and the Angular compiler for stricter type checking, and apply smaller bundle budgets by default. You can use the `--strict=true` or `--strict=false` to skip the prompt.
    action:
      '새 프로젝트를 생성할 때 엄격 모드를 활성화할지 묻습니다. 엄격 모드는 TypeScript와 Angular 컴파일러의 타입 검사를 강화하고 기본 번들 크기 한도를 줄입니다. `--strict=true` 또는 `--strict=false`로 이 질문을 건너뛸 수 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 router relativeLinkResolution',
    // Original: If you use the router, the default value of `relativeLinkResolution` has changed from `legacy` to `corrected`. If your application previously used the default by not specifying a value in the `ExtraOptions` and uses relative links when navigating from children of empty path routes, you will need to update your `RouterModule`'s configuration to specifically specify `legacy` for `relativeLinkResolution`. See [the documentation](https://v11.angular.io/api/router/ExtraOptions#relativeLinkResolution) for more details.
    action:
      '라우터의 `relativeLinkResolution` 기본값이 `legacy`에서 `corrected`로 변경되었습니다. 이전에 `ExtraOptions`에 값을 지정하지 않아 기본값을 사용했고, 빈 경로 라우팅 규칙의 자식에서 탐색할 때 상대 링크를 사용했다면 `RouterModule` 설정에서 `relativeLinkResolution`를 `legacy`로 명시해야 합니다. 자세한 내용은 [문서](https://v11.angular.io/api/router/ExtraOptions#relativeLinkResolution)를 참고하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'router initialNavigation',
    // Original: In the Angular Router, the options deprecated in v4 for `initialNavigation` have been removed. If you previously used `enabled` or `true`, now choose `enabledNonBlocking` or `enabledBlocking`. If you previously used `false` or `legacy_disabled`, now use `disabled`.
    action:
      'Angular 라우터의 `initialNavigation`에서 v4에 지원 중단 예정으로 지정한 옵션이 제거되었습니다. `enabled`나 `true`를 사용했다면 `enabledNonBlocking` 또는 `enabledBlocking`을 선택하세요. `false`나 `legacy_disabled`를 사용했다면 `disabled`로 바꾸세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'routerlink preserveQueryParams',
    // Original: In the Angular Router's `routerLink`, `preserveQueryParams` has been removed, use `queryParamsHandling="preserve"` instead.
    action:
      'Angular 라우터의 `routerLink`에서 `preserveQueryParams`가 제거되었습니다. 대신 `queryParamsHandling="preserve"`를 사용하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'routerlink queryParams typing',
    // Original: If you were accessing the `routerLink` values of `queryParams`, `fragment` or `queryParamsHandling` you might need to relax the typing to also accept `undefined` and `null`.
    action:
      '`routerLink`의 `queryParams`, `fragment`, `queryParamsHandling` 값에 접근했다면 `undefined`와 `null`도 허용하도록 타입을 완화해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'viewencapsulation native removed',
    // Original: The component view encapsulation option `ViewEncapsulation.Native` has been removed. Use `ViewEncapsulation.ShadowDom` instead. `ng update` will migrate you automatically.
    action:
      '컴포넌트 뷰 캡슐화 옵션 `ViewEncapsulation.Native`가 제거되었습니다. 대신 `ViewEncapsulation.ShadowDom`을 사용하세요. `ng update`가 자동으로 마이그레이션합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'ICU expressions typechecked',
    // Original: If you use i18n, expressions within International Components for Unicode (ICUs) expressions are now type-checked again. This may cause compilation failures if errors are found in expressions that appear within an ICU.
    action:
      'i18n을 사용한다면 ICU(International Components for Unicode) 표현식 내부의 표현식에도 다시 타입 검사가 적용됩니다. ICU 안의 표현식에 오류가 있으면 컴파일이 실패할 수 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'forms validators asyncValidators typing',
    // Original: Directives in the `@angular/forms` package used to have `any[]` as the type of the expected `validators` and `asyncValidators` arguments in constructors. Now these arguments are properly typed, so if your code relies on form's directive constructor types it may require some updates to improve type safety.
    action:
      '`@angular/forms` 패키지의 디렉티브는 이전에 생성자의 `validators` 및 `asyncValidators` 인수 타입으로 `any[]`를 사용했습니다. 이제 올바른 타입이 지정되므로 폼 디렉티브의 생성자 타입에 의존하는 코드는 타입 안전성을 높이기 위해 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'forms AbstractFormControl',
    // Original: If you use Angular Forms, the type of `AbstractFormControl.parent` now includes null.  `ng update` will migrate you automatically, but in an unlikely case your code was testing the parent against undefined with strict equality, you'll need to change this to `=== null` instead, since the parent is now explicitly initialized with `null` instead of being left undefined.
    action:
      'Angular 폼에서 `AbstractFormControl.parent`의 타입에 이제 null이 포함됩니다. `ng update`가 자동으로 마이그레이션하지만, 드물게 parent를 undefined와 엄격한 동등 비교로 검사했다면 `=== null`로 바꿔야 합니다. 이제 parent를 undefined로 두지 않고 `null`로 명시적으로 초기화하기 때문입니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'platform-webworker',
    // Original: The rarely used `@angular/platform-webworker` and `@angular/platform-webworker-dynamic` were deprecated in v8 and have been removed. Running parts of Angular in a web worker was an experiment that never worked well for common use cases. Angular still has great support for [Web Workers](https://angular.io/guide/web-worker).
    action:
      '드물게 사용되던 `@angular/platform-webworker`와 `@angular/platform-webworker-dynamic`는 v8에서 지원 중단 예정으로 지정되었고 이제 제거되었습니다. Angular의 일부를 웹 워커에서 실행하는 것은 일반적인 사용 사례에서 제대로 동작하지 못한 실험이었습니다. Angular는 여전히 [웹 워커](https://angular.io/guide/web-worker)를 잘 지원합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 slice pipe typing',
    // Original: The `slice` pipe now returns null for the undefined input value, which is consistent with the behavior of most pipes.
    action:
      '`slice` 파이프는 이제 undefined 입력값에 null을 반환합니다. 이는 대부분의 파이프와 일치하는 동작입니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 keyvalue typing',
    // Original: The `keyvalue` pipe has been fixed to report that for input objects that have number keys, the result type will contain the string representation of the keys. This was already the case and the code has simply been updated to reflect this. Please update the consumers of the pipe output if they were relying on the incorrect types. Note that this does not affect use cases where the input values are `Map`s, so if you need to preserve `number`s, this is an effective way.
    action:
      '`keyvalue` 파이프는 숫자 키가 있는 객체를 입력받으면 결과 타입의 키가 문자열로 표현된다는 점을 올바르게 나타내도록 수정되었습니다. 실제 동작은 이미 이와 같았으며 코드가 이를 반영하도록 변경되었습니다. 잘못된 타입에 의존하던 파이프 출력 사용 코드를 수정하세요. 입력값이 `Map`인 경우에는 영향이 없으므로 `number`를 유지해야 한다면 이 방법을 사용할 수 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 number pipe typing',
    // Original: The number pipes (`decimal`, `percent`, `currency`, etc) now explicitly state which types are accepted.
    action: '숫자 파이프(`decimal`, `percent`, `currency` 등)가 이제 허용하는 타입을 명시합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 date pipe typing',
    // Original: The `date` pipe now explicitly states which types are accepted.
    action: '`date` 파이프가 이제 허용하는 타입을 명시합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 datetime rounding',
    // Original: When passing a date-time formatted string to the `DatePipe` in a format that contains fractions of a millisecond, the milliseconds will now always be rounded down rather than to the nearest millisecond. Most applications will not be affected by this change. If this is not the desired behaviour then consider pre-processing the string to round the millisecond part before passing it to the `DatePipe`.
    action:
      '밀리초 미만의 소수 부분이 있는 날짜·시간 문자열을 `DatePipe`에 전달하면 이제 가장 가까운 밀리초로 반올림하지 않고 항상 내림합니다. 대부분의 애플리케이션에는 영향이 없습니다. 원하는 동작이 아니라면 `DatePipe`에 전달하기 전에 문자열을 전처리하여 밀리초 부분을 반올림하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 async pipe typing',
    // Original: The `async` pipe no longer claims to return undefined for an input that was typed as undefined. Note that the code actually returned null on undefined inputs.
    action:
      '`async` 파이프는 undefined 타입의 입력에 undefined를 반환한다고 더 이상 선언하지 않습니다. 실제 코드는 undefined 입력에 null을 반환하고 있었습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'v11 case pipe update',
    // Original: The `uppercase` and `lowercase` pipes no longer let falsy values through. They now map both `null` and `undefined` to `null` and raise an exception on invalid input (`0`, `false`, `NaN`). This matches other Angular pipes.
    action:
      '`uppercase` 및 `lowercase` 파이프는 더 이상 거짓으로 평가되는 값을 그대로 통과시키지 않습니다. 이제 `null`과 `undefined`를 모두 `null`로 변환하고 잘못된 입력(`0`, `false`, `NaN`)에는 예외를 발생시킵니다. 이는 다른 Angular 파이프와 일치합니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 router NavigationExtras typing',
    // Original: If you use the router with `NavigationExtras`, new typings allow a variable of type `NavigationExtras` to be passed in, but they will not allow object literals, as they may only specify known properties. They will also not accept types that do not have properties in common with the ones in the `Pick`. If you are affected by this change, only specify properties from the NavigationExtras which are actually used in the respective function calls or use a type assertion on the object or variable: `as NavigationExtras`.
    action:
      '라우터에서 `NavigationExtras`를 사용한다면 새 타입 정의는 `NavigationExtras` 타입의 변수 전달을 허용하지만, 객체 리터럴에는 알려진 프로퍼티만 지정할 수 있으므로 같은 방식의 전달을 허용하지 않습니다. `Pick`에 포함된 프로퍼티와 공통 프로퍼티가 없는 타입도 허용하지 않습니다. 이 변경의 영향을 받는다면 각 함수 호출에서 실제로 사용하는 NavigationExtras 프로퍼티만 지정하거나 객체 또는 변수에 타입 단언 `as NavigationExtras`를 사용하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'v11 TestBed.overrideProvider',
    // Original: In your tests if you call `TestBed.overrideProvider` after TestBed initialization, provider overrides are no longer applied. This behavior is consistent with other override methods (such as `TestBed.overrideDirective`, etc) but they throw an error to indicate that. The check was previously missing in the TestBed.overrideProvider function. If you see this error, you should move `TestBed.overrideProvider` calls before TestBed initialization is completed.
    action:
      '테스트에서 TestBed 초기화 후 `TestBed.overrideProvider`를 호출하면 프로바이더 덮어쓰기를 더 이상 적용하지 않습니다. `TestBed.overrideDirective` 같은 다른 덮어쓰기 메서드와 일치하는 동작이며, 다른 메서드들은 이를 오류로 알립니다. 이전에는 TestBed.overrideProvider 함수에 이 검사가 없었습니다. 이 오류가 발생하면 TestBed 초기화가 완료되기 전으로 `TestBed.overrideProvider` 호출을 옮기세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'v11 router RouteReuseStrategy',
    // Original: If you use the Router's RouteReuseStrategy, the argument order has changed. When calling `RouteReuseStrategy#shouldReuseRoute` previously when evaluating child routes, they would be called with the `future` and `current` arguments swapped. If your `RouteReuseStrategy` relies specifically on only the future or current snapshot state, you may need to update the `shouldReuseRoute` implementation's use of `future` and `current` `ActivateRouteSnapshots`.
    action:
      '라우터의 RouteReuseStrategy를 사용한다면 인수 순서가 변경되었습니다. 이전에는 자식 라우팅 규칙을 평가하면서 `RouteReuseStrategy#shouldReuseRoute`를 호출할 때 `future`와 `current` 인수가 서로 뒤바뀌어 전달되었습니다. `RouteReuseStrategy`가 future나 current 중 한 스냅샷 상태에만 의존한다면 `shouldReuseRoute` 구현에서 `future` 및 `current` `ActivateRouteSnapshots`을 사용하는 코드를 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 locale data readonly',
    // Original: If you use locale data arrays, this API will now return readonly arrays. If you were mutating them (e.g. calling `sort()`, `push()`, `splice()`, etc) then your code will not longer compile. If you need to mutate the array, you should now take a copy (e.g. by calling `slice()`) and mutate the copy.
    action:
      '지역 데이터 배열 API가 이제 읽기 전용 배열을 반환합니다. `sort()`, `push()`, `splice()` 등을 호출하여 배열을 변경했다면 더 이상 컴파일되지 않습니다. 배열을 변경해야 한다면 `slice()` 같은 방법으로 복사본을 만들고 복사본을 수정하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Advanced,
    step: 'v11 CollectionChangeRecord',
    // Original: In change detection, `CollectionChangeRecord` has been removed, use `IterableChangeRecord` instead.
    action:
      '변경 감지에서 `CollectionChangeRecord`가 제거되었습니다. 대신 `IterableChangeRecord`를 사용하세요.',
  },
  {
    possibleIn: 1100,
    necessaryAsOf: 1100,
    level: ApplicationComplexity.Medium,
    step: 'v11 forms async validators',
    // Original: If you use Angular Forms with async validators defined at initialization time on class instances of `FormControl`, `FormGroup` or `FormArray` , the status change event was not previously emitted once async validator completed. This has been changed so that the status event is emitted into the `statusChanges` observable. If your code relies on the old behavior, you can filter/ignore this additional status change event.
    action:
      'Angular 폼의 `FormControl`, `FormGroup`, `FormArray` 클래스 인스턴스를 초기화할 때 비동기 유효성 검사기를 정의하면 이전에는 검사가 완료된 뒤 상태 변경 이벤트가 발생하지 않았습니다. 이제 `statusChanges` 옵저버블에 상태 이벤트를 방출하도록 변경되었습니다. 이전 동작에 의존한다면 추가된 상태 변경 이벤트를 필터링하거나 무시할 수 있습니다.',
  },

  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Basic,
    step: 'v12 ng update',
    // Original: Run `ng update @angular/core@12 @angular/cli@12` which should bring you to version 12 of Angular.
    action:
      '`ng update @angular/core@12 @angular/cli@12`를 실행하여 Angular 버전 12로 업데이트하세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@12`.
    action: '`ng update @angular/material@12`를 실행하세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Basic,
    step: 'v12 versions',
    // Original: Angular now requires [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/). `ng update` will update you automatically.
    action:
      'Angular는 이제 [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/)가 필요합니다. `ng update`가 자동으로 업데이트합니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Basic,
    step: 'v12 browser support',
    // Original: IE11 support has been deprecated. Find details in the [RFC for IE11 removal](https://github.com/angular/angular/issues/41840).
    action:
      'IE11 지원이 중단 예정으로 지정되었습니다. 자세한 내용은 [IE11 제거 RFC](https://github.com/angular/angular/issues/41840)를 참고하세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Basic,
    step: 'v12 minimum  Node.js version',
    // Original: You can no longer use Angular with Node.js version 10 or older
    action: 'Node.js 버전 10 이하에서는 더 이상 Angular를 사용할 수 없습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Medium,
    step: 'v12 `XhrFactory` relocation',
    // Original: Change the import of `XhrFactory` from `@angular/common/http` to `@angular/common`.
    action:
      '`XhrFactory`를 불러오는 경로를 `@angular/common/http`에서 `@angular/common`으로 바꾸세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Medium,
    step: 'v12 i18n message ids',
    // Original: If you rely on legacy i18n message IDs use the `localize-migrate` tool to [move away from them](https://angular.io/guide/migration-legacy-message-id).
    action:
      '이전 i18n 메시지 ID에 의존한다면 `localize-migrate` 도구로 [새 형식으로 전환](https://angular.io/guide/migration-legacy-message-id)하세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Medium,
    step: 'v12 deprecates `emitDistinctChangesOnly`',
    // Original: If you are using `emitDistinctChangesOnly` to configure `@ContentChildren` and `@ViewChildren` queries, you may need to update its value to `false` to align with its previous behavior. In v12 `emitDistinctChangesOnly` has default value `true`, and in future releases we will remove this configuration option to prevent triggering of unnecessary changes.
    action:
      '`emitDistinctChangesOnly`로 `@ContentChildren` 및 `@ViewChildren` 쿼리를 설정한다면 이전 동작을 유지하기 위해 값을 `false`로 바꿔야 할 수도 있습니다. v12에서 `emitDistinctChangesOnly`의 기본값은 `true`이며, 향후 릴리즈에서는 불필요한 변경 알림을 방지하기 위해 이 설정 옵션을 제거할 예정입니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Medium,
    step: 'v12 prod by default',
    // Original: You can run the optional migration for enabling production builds by default `ng update @angular/cli@12 --migrate-only production-by-default`.
    action:
      '선택적 마이그레이션 `ng update @angular/cli@12 --migrate-only production-by-default`를 실행하여 프로덕션 빌드를 기본으로 활성화할 수 있습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 min and max form attributes',
    // Original: If you  use Angular forms, `min` and `max` attributes on `<input type="number">` will now trigger validation logic.
    action:
      'Angular 폼에서 `<input type="number">`의 `min` 및 `max` 속성이 이제 유효성 검사 로직을 실행합니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `emitEvent` in `FormArray` and `FormGroup`',
    // Original: If your app has custom classes that extend `FormArray` or `FormGroup` classes and override the above-mentioned methods, you may need to update your implementation
    action:
      '애플리케이션에 `FormArray` 또는 `FormGroup` 클래스를 상속하고 앞서 언급한 메서드를 재정의하는 커스텀 클래스가 있다면 구현을 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 zone.js minimum version',
    // Original: Update zone.js to version 0.11.4. `ng update` will update this dependency automatically.
    action:
      'zone.js를 버전 0.11.4로 업데이트하세요. `ng update`가 이 의존성을 자동으로 업데이트합니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `HttpParams` method params update',
    // Original: If you extend the `HttpParams` class you may have to update the signature of its method to reflect changes in the parameter types.
    action:
      '`HttpParams` 클래스를 상속한다면 매개변수 타입의 변경을 반영하도록 메서드 시그니처를 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `routerLinkActiveOptions`',
    // Original: `routerLinkActiveOptions` property of `RouterLinkActive` now has a more specific type. You may need to update code accessing this property to align with the changes.
    action:
      '`RouterLinkActive`의 `routerLinkActiveOptions` 프로퍼티 타입이 더 구체적으로 변경되었습니다. 이 프로퍼티에 접근하는 코드를 변경에 맞게 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `APP_INITIALIZER` callback types',
    // Original: The initializer callbacks now have more specific return types, which may require update of your code if you are getting an `APP_INITIALIZER` instance via `Injector.get` or `TestBed.inject`.
    action:
      '초기화 콜백의 반환 타입이 더 구체적으로 변경되었습니다. `Injector.get`이나 `TestBed.inject`로 `APP_INITIALIZER` 인스턴스를 가져온다면 코드를 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 fragment typings',
    // Original: The router fragments now could be `null`. Add `null` checks to avoid TypeScript failing with type errors.
    action:
      '라우터의 fragment가 이제 `null`일 수 있습니다. TypeScript 타입 오류로 실패하지 않도록 `null` 검사를 추가하세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `ng.getDirectives`',
    // Original: Make sure you don't rely on `ng.getDirectives` throwing an error if it can't find a directive associated with a particular DOM node.
    action:
      '`ng.getDirectives`가 특정 DOM 노드에 연결된 디렉티브를 찾지 못하면 오류를 발생시킨다고 가정하지 마세요.',
  },
  {
    possibleIn: 1200,
    necessaryAsOf: 1200,
    level: ApplicationComplexity.Advanced,
    step: 'v12 `optimization.styles.inlineCritical`',
    // Original: Check out `optimization.styles.inlineCritical` option in your angular.json file. It now defaults to `true`. Remember that the whole `optimization` option can be set as boolean which will set all the suboptions to defaults.
    action:
      'angular.json 파일의 `optimization.styles.inlineCritical` 옵션을 확인하세요. 기본값이 이제 `true`입니다. `optimization` 옵션 전체를 불리언으로 지정하면 모든 하위 옵션이 기본값으로 설정된다는 점에 유의하세요.',
  },

  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Basic,
    step: 'v13 ng update',
    // Original: Run `ng update @angular/core@13 @angular/cli@13` which should bring you to version 13 of Angular.
    action:
      '`ng update @angular/core@13 @angular/cli@13`를 실행하여 Angular 버전 13으로 업데이트하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@13`.
    action: '`ng update @angular/material@13`를 실행하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Basic,
    step: 'TypeScript 4.4',
    // Original: Angular now uses TypeScript 4.4, read more about [any potential breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html).
    action:
      'Angular는 이제 TypeScript 4.4를 사용합니다. [호환성을 깨뜨릴 수 있는 변경 사항](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html)을 확인하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Basic,
    step: 'v13 node',
    // Original: Make sure you are using [Node 12.20.0 or later](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)
    action:
      '[Node 12.20.0 이상](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Medium,
    step: 'v13 routerLink',
    // Original: You can now disable the navigation of a `routerLink` by passing `undefined` and `null`. Previously the `routerLink` directive used to accept these two values as equivalent to an empty string.
    action:
      '`undefined`나 `null`을 전달하여 `routerLink`의 탐색을 비활성화할 수 있습니다. 이전에는 `routerLink` 디렉티브가 이 두 값을 빈 문자열과 동일하게 처리했습니다.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Medium,
    step: 'v13 router loadChildren',
    // Original: You can no longer specify lazy-loaded routes by setting a string value to `loadChildren`. Make sure you move to dynamic ESM import statements.
    action:
      '`loadChildren`에 문자열을 설정하여 지연 로드하는 라우팅 규칙을 지정할 수 없게 되었습니다. 동적 ESM import 구문으로 전환하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Medium,
    step: 'v13 service worker activated',
    // Original: The `activated` observable of `SwUpdate` is now deprecated. To check the activation status of a service worker use the `activatedUpdate` method instead.
    action:
      '`SwUpdate`의 `activated` 옵저버블이 지원 중단 예정으로 지정되었습니다. 서비스 워커의 활성화 상태를 확인하려면 대신 `activatedUpdate` 메서드를 사용하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Medium,
    step: 'v13 service worker available',
    // Original: The `available` observable of `SwUpdate` is now deprecated. To get the same information use `versionUpdates` and filter only the `VersionReadyEvent` events.
    action:
      '`SwUpdate`의 `available` 옵저버블이 지원 중단 예정으로 지정되었습니다. 같은 정보를 얻으려면 `versionUpdates`를 사용하고 `VersionReadyEvent` 이벤트만 필터링하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Medium,
    step: 'v13 renderModuleFactory',
    // Original: The `renderModuleFactory` from `@angular/platform-server` is no longer necessary with Ivy. Use `renderModule` instead.
    action:
      'Ivy에서는 `@angular/platform-server`의 `renderModuleFactory`가 더 이상 필요하지 않습니다. 대신 `renderModule`을 사용하세요.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    step: 'v13 forms status',
    // Original: We narrowed the type of `AbstractControl.status` to `FormControlStatus` and `AbstractControl.status` to `Observable<FormControlStatus>`. `FormControlStatus` is the union of all possible status strings for form controls.
    action:
      '`AbstractControl.status`의 타입을 `FormControlStatus`로, `AbstractControl.statusChanges`의 타입을 `Observable<FormControlStatus>`로 좁혔습니다. `FormControlStatus`는 폼 컨트롤에서 가능한 모든 상태 문자열의 유니온 타입입니다.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    step: 'v13 router serializer',
    // Original: To align with the URI spec, now the URL serializer respects question marks in the query parameters. For example `/path?q=hello?&q2=2` will now be parsed to `{ q: `hello?`, q2: 2 }`
    action:
      'URI 명세에 맞게 URL 직렬화기가 이제 쿼리 매개변수의 물음표를 유지합니다. 예를 들어 `/path?q=hello?&q2=2`는 이제 `{ q: `hello?`, q2: 2 }`로 파싱됩니다.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    step: 'v13 host binding',
    // Original: `href` is now an attribute binding. This means that `DebugElement.properties['href']` now returns the `href` value returned by the native element, rather than the internal value of the `href` property of the `routerLink`.
    action:
      "`href`가 이제 속성 바인딩입니다. 따라서 `DebugElement.properties['href']`는 이제 `routerLink`의 `href` 프로퍼티 내부 값이 아니라 네이티브 엘리먼트가 반환하는 `href` 값을 반환합니다.",
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    step: 'v13 spy location',
    // Original: `SpyLocation` no longer emits the `popstate` event when `location.go` is called. In addition, `simulateHashChange` now triggers both `haschange` and `popstate`. Tests that rely on `location.go` most likely need to now use `simulateHashChange` to capture `popstate`.
    action:
      '`location.go`를 호출해도 `SpyLocation`은 더 이상 `popstate` 이벤트를 방출하지 않습니다. 또한 `simulateHashChange`는 이제 `hashchange`와 `popstate`를 모두 발생시킵니다. `location.go`에 의존하는 테스트는 `popstate`를 포착하려면 `simulateHashChange`를 사용하도록 바꿔야 할 가능성이 큽니다.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    ngUpgrade: true,
    step: 'v13 router URL replacement',
    // Original: The router will no longer replace the browser URL when a new navigation cancels an ongoing navigation. Hybrid applications which rely on the `navigationId` being present on initial navigations that were handled by the Angular router should subscribe to `NavigationCancel` events and perform the `location.replaceState` to add `navigationId` to the `Router` state. In addition, tests which assert `urlChanges` on the `SpyLocation` may need to be adjusted to account for the `replaceState` which is no longer triggered.
    action:
      '새 탐색이 진행 중인 탐색을 취소하더라도 라우터는 더 이상 브라우저 URL을 바꾸지 않습니다. Angular 라우터가 처리한 초기 탐색에 `navigationId`가 있다고 가정하는 하이브리드 애플리케이션은 `NavigationCancel` 이벤트를 구독하고 `location.replaceState`를 실행하여 `Router` 상태에 `navigationId`를 추가해야 합니다. 또한 `SpyLocation`의 `urlChanges`를 검증하는 테스트는 더 이상 발생하지 않는 `replaceState`를 고려하여 수정해야 할 수도 있습니다.',
  },
  {
    possibleIn: 1300,
    necessaryAsOf: 1300,
    level: ApplicationComplexity.Advanced,
    step: 'v13 removed symbols',
    // Original: The route package no longer exports `SpyNgModuleFactoryLoader` and `DeprecatedLoadChildren`. In case you use them, make sure you remove their corresponding import statements.
    action:
      '라우터 패키지는 더 이상 `SpyNgModuleFactoryLoader`와 `DeprecatedLoadChildren`을 내보내지 않습니다. 사용 중이라면 해당 import 구문을 제거하세요.',
  },

  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Basic,
    step: 'v14 ng update',
    // Original: Run `ng update @angular/core@14 @angular/cli@14` which should bring you to version 14 of Angular.
    action:
      '`ng update @angular/core@14 @angular/cli@14`를 실행하여 Angular 버전 14로 업데이트하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@14`.
    action: '`ng update @angular/material@14`를 실행하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Basic,
    step: 'TypeScript 4.6',
    // Original: Angular now uses TypeScript 4.6, read more about [any potential breaking changes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/).
    action:
      'Angular는 이제 TypeScript 4.6을 사용합니다. [호환성을 깨뜨릴 수 있는 변경 사항](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)을 확인하세요.',
  },

  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Basic,
    step: 'v14 node',
    // Original: Make sure you are using [Node 14.15.0 or later](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)
    action:
      '[Node 14.15.0 이상](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)을 사용하는지 확인하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Medium,
    step: 'v14 strict forms',
    // Original: Form models now require a generic type parameter. For gradual migration you can opt-out using the untyped version of the form model classes.
    action:
      '폼 모델에 이제 제네릭 타입 매개변수가 필요합니다. 점진적으로 마이그레이션하려면 타입을 지정하지 않는 폼 모델 클래스를 사용해 이 기능을 적용하지 않을 수 있습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Medium,
    step: 'v14 aotSummaries',
    // Original: Remove `aotSummaries` from `TestBed` since Angular no longer needs them in Ivy.
    action:
      'Ivy에서는 Angular가 더 이상 필요로 하지 않으므로 `TestBed`에서 `aotSummaries`를 제거하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Medium,
    material: true,
    step: 'v14 MatVertical and Horizontal Stepper',
    // Original: If you are using `MatVerticalStepper` or `MatHorizontalStepper` make sure you switch to `MatStepper`.
    action: '`MatVerticalStepper`나 `MatHorizontalStepper`를 사용한다면 `MatStepper`로 전환하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Medium,
    step: 'v14 JSONP',
    // Original: Remove headers from JSONP requests. JSONP does not supports headers and if specified the HTTP module will now throw an error rather than ignoring them.
    action:
      'JSONP 요청에서 헤더를 제거하세요. JSONP는 헤더를 지원하지 않으므로 헤더를 지정하면 HTTP 모듈이 이제 무시하지 않고 오류를 발생시킵니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Medium,
    step: 'v14 resolvers',
    // Original: Resolvers now will take the first emitted value by an observable and after that proceed to navigation to better align with other guards rather than taking the last emitted value.
    action:
      '다른 가드와 동작을 맞추기 위해 리졸버는 이제 옵저버블이 마지막으로 방출한 값 대신 첫 번째 값을 받은 뒤 탐색을 계속합니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 deprecate protractor entry',
    // Original: The deprecated `angular/cdk/testing/protractor` entry point is now removed.
    action: '지원 중단 예정이던 `angular/cdk/testing/protractor` 진입점이 제거되었습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 chipInput',
    // Original: Make sure you specify `chipInput` of `MatChipInputEvent` because it is now required.
    action: '`MatChipInputEvent`의 `chipInput`이 이제 필수이므로 반드시 지정하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 mixinErrorState',
    // Original: You need to implement `stateChanges` class member in abstractions using `mixinErrorState` because the mixin no longer provides it.
    action:
      '`mixinErrorState`를 사용하는 추상화에서는 `stateChanges` 클래스 멤버를 구현해야 합니다. 믹스인이 더 이상 이 멤버를 제공하지 않기 때문입니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 CdkStepper orientation',
    // Original: Use `CdkStepper.orientation` instead of `CdkStepper._orientation`.
    action: '`CdkStepper._orientation` 대신 `CdkStepper.orientation`을 사용하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 CdkStepper and MatStepper',
    // Original: If you are extending or using `CdkStepper` or `MatStepper` in the constructor you should no longer pass the `_document` parameter since it is now removed.
    action:
      '`CdkStepper`나 `MatStepper`를 상속하거나 생성자에서 사용한다면 제거된 `_document` 매개변수를 더 이상 전달하지 마세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 mat-list-item-avatar',
    // Original: Rename the `mat-list-item-avatar` CSS class to `mat-list-item-with-avatar`.
    action: 'CSS 클래스 `mat-list-item-avatar`의 이름을 `mat-list-item-with-avatar`로 바꾸세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 MatSelectionListChange.option',
    // Original: Use `MatSelectionListChange.options` rather than `MatSelectionListChange.option`.
    action: '`MatSelectionListChange.option` 대신 `MatSelectionListChange.options`를 사용하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 getHarnessLoaderForContent',
    // Original: Use `getChildLoader(MatListItemSection.CONTENT)` rather than `getHarnessLoaderForContent`.
    action:
      '`getHarnessLoaderForContent` 대신 `getChildLoader(MatListItemSection.CONTENT)`를 사용하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    material: true,
    step: 'v14 MatSelectionList',
    // Original: If you are using `MatSelectionList` make sure you pass `_focusMonitor` in its constructor because it is now required. Additionally, this class no longer has `tabIndex` property and a `tabIndex` constructor parameter.
    action:
      '`MatSelectionList`를 사용한다면 이제 필수인 `_focusMonitor`를 생성자에 전달하세요. 또한 이 클래스의 `tabIndex` 프로퍼티와 `tabIndex` 생성자 매개변수는 제거되었습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 initialNavigation',
    // Original: Update `initialNavigation: 'enabled'` to `initialNavigation: 'enabledBlocking'`.
    action: "`initialNavigation: 'enabled'`을 `initialNavigation: 'enabledBlocking'`으로 바꾸세요.",
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 Route.pathMatch',
    // Original: If you are defining routes with `pathMatch`, you may have to cast it to `Route` or `Routes` explicitly. `Route.pathMatch` is no longer compatible with `string` type.
    action:
      '`pathMatch`로 라우팅 규칙을 정의한다면 `Route` 또는 `Routes`로 명시적으로 형 변환해야 할 수도 있습니다. `Route.pathMatch`는 더 이상 `string` 타입과 호환되지 않습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 stricter LoadChildrenCallback',
    // Original: The promise returned by `LoadChildrenCallback` now has a stricter type parameter `Type<any>|NgModuleFactory<any>` rather than `any`.
    action:
      '`LoadChildrenCallback`이 반환하는 프로미스의 타입 매개변수가 `any` 대신 더 엄격한 `Type<any>|NgModuleFactory<any>`로 변경되었습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 router scheduling',
    // Original: The router does no longer schedule redirect navigation within a `setTimeout`. Make sure your tests do not rely on this behavior.
    action:
      '라우터는 더 이상 `setTimeout` 안에서 리디렉션 탐색을 예약하지 않습니다. 테스트가 이 동작에 의존하지 않는지 확인하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 LocationStrategy',
    // Original: Implementing the `LocationStrategy` interface now requires definition of `getState()`.
    action: '`LocationStrategy` 인터페이스를 구현하려면 이제 `getState()`를 정의해야 합니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 http queries',
    // Original: Sending `+` as part of a query no longer requires workarounds since `+` no longer sends a space.
    action:
      '`+`가 더 이상 공백을 보내지 않으므로 쿼리의 일부로 `+`를 보내기 위한 우회 방법이 필요하지 않습니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 AnimationDriver.getParentElement',
    // Original: Implementing `AnimationDriver` now requires the `getParentElement` method.
    action: '`AnimationDriver`를 구현하려면 이제 `getParentElement` 메서드가 필요합니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 invalid config',
    // Original: Invalid route configurations of lazy-loaded modules will now throw an error rather than being ignored.
    action:
      '지연 로드하는 모듈의 잘못된 라우팅 규칙 설정은 이제 무시되지 않고 오류를 발생시킵니다.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 router resolver',
    // Original: Remove the `resolver` from `RouterOutletContract.activateWith` function and the `resolver` from `OutletContext` class since factory resolvers are no longer needed.
    action:
      '팩토리 리졸버가 더 이상 필요하지 않으므로 `RouterOutletContract.activateWith` 함수에서 `resolver`를, `OutletContext` 클래스에서 `resolver`를 제거하세요.',
  },
  {
    possibleIn: 1400,
    necessaryAsOf: 1400,
    level: ApplicationComplexity.Advanced,
    step: 'v14 initialUrl',
    // Original: `Router.initialUrl` accepts only `UrlTree` to prevent a misuse of the API by assigning a `string` value.
    action:
      '`Router.initialUrl`은 `string` 값을 할당하여 API를 잘못 사용하는 일을 방지하기 위해 `UrlTree`만 허용합니다.',
  },

  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 node support',
    // Original: Make sure that you are using a supported version of node.js before you upgrade your application. Angular v15 supports node.js versions: 14.20.x, 16.13.x and 18.10.x. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-01)
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 node.js 버전을 사용하고 있는지 확인하세요. Angular v15는 node.js 14.20.x, 16.13.x, 18.10.x 버전을 지원합니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-01)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 ts support',
    // Original: Make sure that you are using a supported version of TypeScript before you upgrade your application. Angular v15 supports TypeScript version 4.8 or later.  [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-02)
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 TypeScript 버전을 사용하고 있는지 확인하세요. Angular v15는 TypeScript 4.8 이상을 지원합니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-02)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 ng update',
    // Original: In the application's project directory, run `ng update @angular/core@15 @angular/cli@15` to update your application to Angular v15.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@15 @angular/cli@15`를 실행하여 애플리케이션을 Angular v15로 업데이트하세요.',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'V15 update @angular/material',
    // Original: Run `ng update @angular/material@15` to update the Material components.
    action: '`ng update @angular/material@15`를 실행하여 Material 컴포넌트를 업데이트하세요.',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 keyframe',
    // Original: In v15, the Angular compiler prefixes `@keyframes` in CSS with the component's scope. This means that any TypeScript code that relies on `keyframes` names no longer works in v15. Update any such instances to: define keyframes programmatically, use global stylesheets, or change the component's view encapsulation. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-03)
    action:
      'v15에서는 Angular 컴파일러가 CSS의 `@keyframes`에 컴포넌트의 범위를 접두사로 추가합니다. 따라서 `keyframes` 이름에 의존하는 TypeScript 코드는 v15에서 더 이상 동작하지 않습니다. 이러한 코드는 프로그래밍 방식으로 키프레임을 정의하거나, 전역 스타일시트를 사용하거나, 컴포넌트의 뷰 캡슐화 방식을 변경하도록 수정하세요. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-03)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 no-ivy',
    // Original: In your application's `tsconfig.json` file, remove `enableIvy`. In v15, Ivy is the only rendering engine so `enableIvy` is not required.
    action:
      '애플리케이션의 `tsconfig.json` 파일에서 `enableIvy`를 제거하세요. v15에서는 Ivy가 유일한 렌더링 엔진이므로 `enableIvy`가 필요하지 않습니다.',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 base-decorators',
    // Original: Make sure to use decorators in base classes with child classes that inherit constructors and use dependency injection. Such base classes should be decorated with either `@Injectable` or `@Directive` or the compiler returns an error. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-05)
    action:
      '자식 클래스가 생성자를 상속하고 의존성 주입을 사용하는 경우, 베이스 클래스에 반드시 데코레이터를 사용하세요. 이러한 베이스 클래스에는 `@Injectable` 또는 `@Directive` 데코레이터가 있어야 하며, 그렇지 않으면 컴파일러가 오류를 반환합니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-05)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 setDisabledState',
    // Original: In v15, `setDisabledState` is always called when a `ControlValueAccessor` is attached. To opt-out of this behavior, use `FormsModule.withConfig` or `ReactiveFormsModule.withConfig`. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-06)
    action:
      'v15에서는 `ControlValueAccessor`가 연결될 때 항상 `setDisabledState`가 호출됩니다. 이 동작을 비활성화하려면 `FormsModule.withConfig` 또는 `ReactiveFormsModule.withConfig`를 사용하세요. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-06)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Advanced,
    step: 'v15 canParse',
    // Original: Applications that use `canParse` should use `analyze` from `@angular/localize/tools` instead. In v15, the `canParse` method was removed from all translation parsers in `@angular/localize/tools`.  [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-07)
    action:
      '`canParse`를 사용하는 애플리케이션은 대신 `@angular/localize/tools`의 `analyze`를 사용해야 합니다. v15에서는 `@angular/localize/tools`의 모든 번역 파서에서 `canParse` 메서드가 제거되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-07)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 ActivatedRoutSnapshot',
    // Original: Make sure that all `ActivatedRouteSnapshot` objects have a `title` property. In v15, the `title` property is a required property of `ActivatedRouteSnapshot`. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-08)
    action:
      '모든 `ActivatedRouteSnapshot` 객체에 `title` 프로퍼티가 있는지 확인하세요. v15에서는 `title`이 `ActivatedRouteSnapshot`의 필수 프로퍼티입니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-08)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Advanced,
    step: 'v15 RouterOutlet',
    // Original: If your tests with `RouterOutlet` break, make sure they don't depend on the instantiation order of the corresponding component relative to change detection. In v15, `RouterOutlet` instantiates the component after change detection. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-09)
    action:
      '`RouterOutlet`을 사용하는 테스트가 실패한다면, 해당 컴포넌트의 인스턴스가 변경 감지 전후 언제 생성되는지에 테스트가 의존하지 않는지 확인하세요. v15에서는 `RouterOutlet`이 변경 감지 이후에 컴포넌트의 인스턴스를 생성합니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-09)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 relativeLinkResolution',
    // Original: In v15, `relativeLinkResolution` is not configurable in the Router. It was used to opt out of an earlier bug fix that is now standard.  [Read further](https://v15.angular.io/guide/update-to-version-15#v15-bc-10)
    action:
      'v15에서는 Router에서 `relativeLinkResolution`을 설정할 수 없습니다. 이 설정은 이전 버그 수정의 적용을 해제하는 데 사용되었지만, 이제 해당 수정이 기본으로 적용됩니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-bc-10)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 DATE_PIPE_DEFAULT_OPTIONS',
    // Original: Change instances of the `DATE_PIPE_DEFAULT_TIMEZONE` token to use `DATE_PIPE_DEFAULT_OPTIONS` to configure time zones.  In v15, the `DATE_PIPE_DEFAULT_TIMEZONE` token is deprecated. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-01)
    action:
      '시간대를 설정하는 데 `DATE_PIPE_DEFAULT_TIMEZONE` 토큰을 사용하고 있다면 `DATE_PIPE_DEFAULT_OPTIONS`를 사용하도록 변경하세요. v15에서는 `DATE_PIPE_DEFAULT_TIMEZONE` 토큰이 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-01)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 iframe',
    // Original: Existing `<iframe>` instances might have security-sensitive attributes applied to them as an attribute or property binding. These security-sensitive attributes can occur in a template or in a directive's host bindings. Such occurrences require an update to ensure compliance with the new and stricter rules about `<iframe>` bindings. For more information, see [the error page](https://v15.angular.io/errors/NG0910).
    action:
      '기존 `<iframe>` 인스턴스에는 보안에 민감한 속성이 어트리뷰트 바인딩이나 프로퍼티 바인딩으로 적용되어 있을 수 있습니다. 이러한 보안에 민감한 속성은 템플릿이나 디렉티브의 호스트 바인딩에 나타날 수 있습니다. 이런 경우 `<iframe>` 바인딩에 관한 새롭고 더 엄격한 규칙을 준수하도록 업데이트해야 합니다. 자세한 내용은 [오류 페이지](https://v15.angular.io/errors/NG0910)를 참고하세요.',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 Injector.get',
    // Original: Update instances of `Injector.get()` that use an `InjectFlags` parameter to use an `InjectOptions` parameter. The `InjectFlags` parameter of `Injector.get()` is deprecated in v15. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-02)
    action:
      '`InjectFlags` 매개변수를 사용하는 `Injector.get()` 호출을 `InjectOptions` 매개변수를 사용하도록 업데이트하세요. `Injector.get()`의 `InjectFlags` 매개변수는 v15에서 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-02)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 TestBed.inject',
    // Original: Update instances of `TestBed.inject()` that use an `InjectFlags` parameter to use an `InjectOptions` parameter. The `InjectFlags` parameter of `TestBed.inject()` is deprecated in v15. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-01)
    action:
      '`InjectFlags` 매개변수를 사용하는 `TestBed.inject()` 호출을 `InjectOptions` 매개변수를 사용하도록 업데이트하세요. `TestBed.inject()`의 `InjectFlags` 매개변수는 v15에서 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-01)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 ngModule in providedIn',
    // Original: Using `providedIn: ngModule` for an `@Injectable` and `InjectionToken` is deprecated in v15. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-04)
    action:
      '`@Injectable`과 `InjectionToken`에 `providedIn: ngModule`을 사용하는 방식은 v15에서 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-04)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 providedIn any',
    // Original: Using `providedIn: 'any'` for an `@Injectable` or `InjectionToken` is deprecated in v15. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-05)
    action:
      "`@Injectable` 또는 `InjectionToken`에 `providedIn: 'any'`를 사용하는 방식은 v15에서 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-05)",
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Medium,
    step: 'v15 RouterLinkWithHref',
    // Original: Update instances of the `RouterLinkWithHref`directive to use the `RouterLink` directive. The `RouterLinkWithHref` directive is deprecated in v15. [Read further](https://v15.angular.io/guide/update-to-version-15#v15-dp-06)
    action:
      '`RouterLinkWithHref` 디렉티브를 사용하는 코드를 `RouterLink` 디렉티브를 사용하도록 업데이트하세요. `RouterLinkWithHref` 디렉티브는 v15에서 지원 중단되었습니다. [자세히 알아보기](https://v15.angular.io/guide/update-to-version-15#v15-dp-06)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'v15 mat refactor',
    // Original: In Angular Material v15, many of the components have been refactored to be based on the official Material Design Components for Web (MDC). This change affected the DOM and CSS classes of many components. [Read further](https://rc.material.angular.dev/guide/mdc-migration)
    action:
      'Angular Material v15에서는 많은 컴포넌트가 공식 Material Design Components for Web(MDC)를 기반으로 리팩토링되었습니다. 이 변경은 많은 컴포넌트의 DOM과 CSS 클래스에 영향을 주었습니다. [자세히 알아보기](https://rc.material.angular.dev/guide/mdc-migration)',
  },
  {
    possibleIn: 1500,
    necessaryAsOf: 1500,
    level: ApplicationComplexity.Basic,
    step: 'v15 visual review',
    // Original: After you update your application to v15, visually review your application and its interactions to ensure everything is working as it should.
    action:
      '애플리케이션을 v15로 업데이트한 후에는 애플리케이션의 화면과 상호작용을 직접 확인하여 모든 기능이 의도대로 동작하는지 검토하세요.',
  },

  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 node support',
    // Original: Make sure that you are using a supported version of node.js before you upgrade your application. Angular v16 supports node.js versions: v16 and v18.
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 node.js 버전을 사용하고 있는지 확인하세요. Angular v16은 node.js v16과 v18을 지원합니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 ts support',
    // Original: Make sure that you are using a supported version of TypeScript before you upgrade your application. Angular v16 supports TypeScript version 4.9.3 or later.
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 TypeScript 버전을 사용하고 있는지 확인하세요. Angular v16은 TypeScript 4.9.3 이상을 지원합니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 ng update',
    // Original: In the application's project directory, run `ng update @angular/core@16 @angular/cli@16` to update your application to Angular v16.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@16 @angular/cli@16`을 실행하여 애플리케이션을 Angular v16으로 업데이트하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@16`.
    action: '`ng update @angular/material@16`을 실행하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 zone.js support',
    // Original: Make sure that you are using a supported version of Zone.js before you upgrade your application. Angular v16 supports Zone.js version 0.13.x or later.
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 Zone.js 버전을 사용하고 있는지 확인하세요. Angular v16은 Zone.js 0.13.x 이상을 지원합니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 RouterEvent',
    // Original: The Event union no longer contains `RouterEvent`, which means that if you're using the Event type you may have to change the type definition from `(e: Event)` to `(e: Event|RouterEvent)`
    action:
      'Event 유니온 타입에 더 이상 `RouterEvent`가 포함되지 않습니다. 따라서 Event 타입을 사용한다면 타입 정의를 `(e: Event)`에서 `(e: Event|RouterEvent)`로 변경해야 할 수 있습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 routerEvent prop type',
    // Original: In addition to `NavigationEnd` the `routerEvent` property now also accepts type `NavigationSkipped`
    action:
      '이제 `routerEvent` 프로퍼티는 `NavigationEnd`뿐만 아니라 `NavigationSkipped` 타입도 허용합니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 RendererType2',
    // Original: Pass only flat arrays to `RendererType2.styles` because it no longer accepts nested arrays
    action:
      '`RendererType2.styles`는 더 이상 중첩 배열을 허용하지 않으므로 평탄한 배열만 전달하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 BrowserPlatformLocation',
    // Original: You may have to update tests that use `BrowserPlatformLocation` because `MockPlatformLocation` is now provided by default in tests. [Read further](https://github.com/angular/angular/blob/main/CHANGELOG.md#common-9).
    action:
      '이제 테스트에서 기본적으로 `MockPlatformLocation`을 제공하므로 `BrowserPlatformLocation`을 사용하는 테스트를 업데이트해야 할 수 있습니다. [자세히 알아보기](https://github.com/angular/angular/blob/main/CHANGELOG.md#common-9).',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 ngcc',
    // Original: Due to the removal of the Angular Compatibility Compiler (ngcc) in v16, projects on v16 and later no longer support View Engine libraries.
    action:
      'v16에서 Angular Compatibility Compiler(ngcc)가 제거되어 v16 이상을 사용하는 프로젝트에서는 더 이상 View Engine 라이브러리를 지원하지 않습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 createUrlTree',
    // Original: After bug fixes in `Router.createUrlTree` you may have to readjust tests which mock `ActivatedRoute`. [Read further](https://github.com/angular/angular/blob/main/CHANGELOG.md#1600-2023-05-03)
    action:
      '`Router.createUrlTree`의 버그 수정으로 인해 `ActivatedRoute`를 모킹하는 테스트를 다시 조정해야 할 수 있습니다. [자세히 알아보기](https://github.com/angular/angular/blob/main/CHANGELOG.md#1600-2023-05-03)',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 ApplicationConfig imports',
    // Original: Change imports of `ApplicationConfig` to be from `@angular/core`.
    action: '`ApplicationConfig`를 `@angular/core`에서 불러오도록 변경하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 renderModule',
    // Original: Revise your code to use `renderModule` instead of `renderModuleFactory` because it has been deleted.
    action:
      '`renderModuleFactory`가 삭제되었으므로 대신 `renderModule`을 사용하도록 코드를 수정하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 XhrFactory',
    // Original: Revise your code to use `XhrFactory` from `@angular/common` instead of `XhrFactory` export from `@angular/common/http`.
    action:
      '`@angular/common/http`에서 내보내는 `XhrFactory` 대신 `@angular/common`의 `XhrFactory`를 사용하도록 코드를 수정하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 withServerTransition',
    // Original: If you're running multiple Angular apps on the same page and you're using `BrowserModule.withServerTransition({ appId: 'serverApp' })` make sure you set the `APP_ID` instead since `withServerTransition` is now deprecated. [Read further](https://github.com/angular/angular/blob/main/CHANGELOG.md#platform-browser-4)
    action:
      "같은 페이지에서 여러 Angular 앱을 실행하면서 `BrowserModule.withServerTransition({ appId: 'serverApp' })`를 사용하고 있다면, 이제 `withServerTransition`이 지원 중단되었으므로 대신 `APP_ID`를 설정하세요. [자세히 알아보기](https://github.com/angular/angular/blob/main/CHANGELOG.md#platform-browser-4)",
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 EnvironmentInjector',
    // Original: Change `EnvironmentInjector.runInContext` to `runInInjectionContext` and pass the environment injector as the first parameter.
    action:
      '`EnvironmentInjector.runInContext`를 `runInInjectionContext`로 변경하고 환경 인젝터를 첫 번째 매개변수로 전달하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 ViewContainerRef.createComponent',
    // Original: Update your code to use `ViewContainerRef.createComponent` without the factory resolver. `ComponentFactoryResolver` has been removed from Router APIs.
    action:
      '팩토리 리졸버 없이 `ViewContainerRef.createComponent`를 사용하도록 코드를 업데이트하세요. `ComponentFactoryResolver`가 Router API에서 제거되었습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 APP_ID',
    // Original: If you bootstrap multiple apps on the same page, make sure you set unique `APP_IDs`.
    action: '같은 페이지에서 여러 앱을 부트스트랩한다면 각 앱의 `APP_IDs`를 고유하게 설정하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 server renderApplication',
    // Original: Update your code to revise `renderApplication` method as it no longer accepts a root component as first argument, but instead a callback that should bootstrap your app. [Read further](https://github.com/angular/angular/blob/main/CHANGELOG.md#platform-server-3)
    action:
      '`renderApplication` 메서드는 더 이상 첫 번째 인수로 루트 컴포넌트를 받지 않고 앱을 부트스트랩하는 콜백을 받으므로, 이에 맞게 코드를 업데이트하세요. [자세히 알아보기](https://github.com/angular/angular/blob/main/CHANGELOG.md#platform-server-3)',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 PlatformConfig.baseUrl',
    // Original: Update your code to remove any reference to `PlatformConfig.baseUrl` and `PlatformConfig.useAbsoluteUrl` platform-server config options as it has been deprecated.
    action:
      'platform-server 설정 옵션인 `PlatformConfig.baseUrl`과 `PlatformConfig.useAbsoluteUrl`이 지원 중단되었으므로, 이 옵션을 참조하는 모든 코드를 제거하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 moduleid',
    // Original: Update your code to remove any reference to `@Directive`/`@Component` `moduleId` property as it does not have any effect and will be removed in v17.
    action:
      '`@Directive`/`@Component`의 `moduleId` 프로퍼티는 아무 효과가 없고 v17에서 제거될 예정이므로, 이를 참조하는 모든 코드를 제거하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 transfer state imports',
    // Original: Update imports from `import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser'` to `import {makeStateKey, StateKey, TransferState} from '@angular/core'`
    action:
      "import 문을 `import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser'`에서 `import {makeStateKey, StateKey, TransferState} from '@angular/core'`로 업데이트하세요.",
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 ComponentRef',
    // Original: If you rely on `ComponentRef.setInput` to set the component input even if it's the same based on `Object.is` equality check, make sure you copy its value.
    action:
      '`Object.is` 동등성 검사 결과 값이 같더라도 `ComponentRef.setInput`이 컴포넌트 입력을 설정하는 동작에 의존한다면, 반드시 해당 값을 복사하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 ANALYZE_FOR_ENTRY_COMPONENTS',
    // Original: Update your code to remove any reference to `ANALYZE_FOR_ENTRY_COMPONENTS` injection token as it has been deleted.
    action:
      '`ANALYZE_FOR_ENTRY_COMPONENTS` 주입 토큰이 삭제되었으므로, 이를 참조하는 모든 코드를 제거하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 entry components',
    // Original: `entryComponents` is no longer available and any reference to it can be removed from the `@NgModule` and `@Component` public APIs.
    action:
      '`entryComponents`는 더 이상 사용할 수 없으므로 `@NgModule`과 `@Component` 공개 API에서 이를 참조하는 코드를 모두 제거할 수 있습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 ngTemplateOutletContext',
    // Original: ngTemplateOutletContext has stricter type checking which requires you to declare all the properties in the corresponding object. [Read further](https://github.com/angular/angular/blob/main/CHANGELOG.md#common-1).
    action:
      'ngTemplateOutletContext의 타입 검사가 더 엄격해져서 해당 객체의 모든 프로퍼티를 선언해야 합니다. [자세히 알아보기](https://github.com/angular/angular/blob/main/CHANGELOG.md#common-1).',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 APF',
    // Original: Angular packages no longer include FESM2015 and the distributed ECMScript has been updated from 2020 to 2022.
    action:
      'Angular 패키지에는 더 이상 FESM2015가 포함되지 않으며, 배포되는 ECMAScript는 2020에서 2022로 업데이트되었습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Advanced,
    step: 'v16 EventManager',
    // Original: The deprecated `EventManager` method `addGlobalEventListener` has been removed as it is not used by Ivy.
    action:
      '지원 중단되었던 `EventManager`의 `addGlobalEventListener` 메서드는 Ivy에서 사용하지 않으므로 제거되었습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 BrowserTransferStateModule',
    // Original: `BrowserTransferStateModule` is no longer available and any reference to it can be removed from your applications.
    action:
      '`BrowserTransferStateModule`은 더 이상 사용할 수 없으므로 애플리케이션에서 이를 참조하는 코드를 모두 제거할 수 있습니다.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Medium,
    step: 'v16 ReflectiveInjector',
    // Original: Update your code to use `Injector.create` rather than `ReflectiveInjector` since `ReflectiveInjector` is removed.
    action:
      '`ReflectiveInjector`가 제거되었으므로 `ReflectiveInjector` 대신 `Injector.create`를 사용하도록 코드를 업데이트하세요.',
  },
  {
    possibleIn: 1600,
    necessaryAsOf: 1600,
    level: ApplicationComplexity.Basic,
    step: 'v16 QueryList',
    // Original: `QueryList.filter` now supports type guard functions. Since the type will be narrowed, you may have to update your application code that relies on the old behavior.
    action:
      '이제 `QueryList.filter`는 타입 가드 함수를 지원합니다. 타입의 범위가 좁혀지므로 이전 동작에 의존하는 애플리케이션 코드를 업데이트해야 할 수 있습니다.',
  },

  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 node support',
    // Original: Make sure that you are using a supported version of node.js before you upgrade your application. Angular v17 supports node.js versions: v18.13.0 and newer
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 node.js 버전을 사용하고 있는지 확인하세요. Angular v17은 node.js v18.13.0 이상을 지원합니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 ts support',
    // Original: Make sure that you are using a supported version of TypeScript before you upgrade your application. Angular v17 supports TypeScript version 5.2 or later.
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 TypeScript 버전을 사용하고 있는지 확인하세요. Angular v17은 TypeScript 5.2 이상을 지원합니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 zone.js support',
    // Original: Make sure that you are using a supported version of Zone.js before you upgrade your application. Angular v17 supports Zone.js version 0.14.x or later.
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 Zone.js 버전을 사용하고 있는지 확인하세요. Angular v17은 Zone.js 0.14.x 이상을 지원합니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 ng update',
    // Original: In the application's project directory, run `ng update @angular/core@17 @angular/cli@17` to update your application to Angular v17.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@17 @angular/cli@17`을 실행하여 애플리케이션을 Angular v17로 업데이트하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@17`.
    action: '`ng update @angular/material@17`을 실행하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Medium,
    step: 'v17 style removal',
    // Original: Angular now automatically removes styles of destroyed components, which may impact your existing apps in cases you rely on leaked styles. To change this update the value of the `REMOVE_STYLES_ON_COMPONENT_DESTROY` provider to `false`.
    action:
      '이제 Angular는 소멸된 컴포넌트의 스타일을 자동으로 제거합니다. 제거되지 않고 남아 있던 스타일에 의존하는 기존 앱은 이 변경의 영향을 받을 수 있습니다. 이 동작을 변경하려면 `REMOVE_STYLES_ON_COMPONENT_DESTROY` 프로바이더의 값을 `false`로 업데이트하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 router removals',
    // Original: Make sure you configure `setupTestingRouter`, `canceledNavigationResolution`, `paramsInheritanceStrategy`, `titleStrategy`, `urlUpdateStrategy`, `urlHandlingStrategy`, and `malformedUriErrorHandler` in `provideRouter` or `RouterModule.forRoot` since these properties are now not part of the `Router`'s public API
    action:
      '`canceledNavigationResolution`, `paramsInheritanceStrategy`, `titleStrategy`, `urlUpdateStrategy`, `urlHandlingStrategy`는 더 이상 `Router`의 공개 프로퍼티가 아니므로 `provideRouter` 또는 `RouterModule.forRoot`에서 설정하세요. 제거된 `setupTestingRouter` 대신 이 API로 테스트 라우터를 구성하고, `malformedUriErrorHandler` 대신 `UrlSerializer.parse`에서 URL 파싱 오류를 처리하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Advanced,
    step: 'v17 ngDoCheck dynamic components',
    // Original: For dynamically instantiated components we now execute `ngDoCheck` during change detection if the component is marked as dirty. You may need to update your tests or logic within `ngDoCheck` for dynamically instantiated components.
    action:
      '이제 동적으로 인스턴스를 생성한 컴포넌트가 변경된 상태로 표시되어 있으면 변경 감지 중에 `ngDoCheck`를 실행합니다. 동적으로 인스턴스를 생성한 컴포넌트의 테스트나 `ngDoCheck` 내부 로직을 업데이트해야 할 수 있습니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Medium,
    step: 'v17 malformedUriErrorHandler',
    // Original: Handle URL parsing errors in the `UrlSerializer.parse` instead of `malformedUriErrorHandler` because it's now part of the public API surface.
    action:
      '`malformedUriErrorHandler`가 공개 API에서 제거되었으므로 URL 파싱 오류는 `UrlSerializer.parse`에서 처리하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Medium,
    step: 'v17 zone deep imports',
    // Original: Change Zone.js deep imports like `zone.js/bundles/zone-testing.js` and `zone.js/dist/zone` to `zone.js` and `zone.js/testing`.
    action:
      '`zone.js/bundles/zone-testing.js`와 `zone.js/dist/zone` 같은 Zone.js의 깊은 경로 import를 `zone.js`와 `zone.js/testing`으로 변경하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Advanced,
    step: 'v17 absolute redirects',
    // Original: You may need to adjust your router configuration to prevent infinite redirects after absolute redirects. In v17 we no longer prevent additional redirects after absolute redirects.
    action:
      '절대 리디렉션 이후에 무한 리디렉션이 발생하지 않도록 라우터 설정을 조정해야 할 수 있습니다. v17에서는 더 이상 절대 리디렉션 이후의 추가 리디렉션을 막지 않습니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Medium,
    step: 'v17 AnimationDriver',
    // Original: Change references to `AnimationDriver.NOOP` to use `NoopAnimationDriver` because `AnimationDriver.NOOP` is now deprecated.
    action:
      '`AnimationDriver.NOOP`가 이제 지원 중단되었으므로 `AnimationDriver.NOOP`를 참조하는 코드를 `NoopAnimationDriver`를 사용하도록 변경하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 switch strictness',
    // Original: You may need to adjust the equality check for `NgSwitch` because now it defaults to stricter check with `===` instead of `==`. Angular will log a warning message for the usages where you'd need to provide an adjustment.
    action:
      '이제 `NgSwitch`는 기본적으로 `==` 대신 더 엄격한 `===` 검사를 사용하므로 동등성 검사를 조정해야 할 수 있습니다. Angular는 조정이 필요한 사용 사례에 대해 경고 메시지를 기록합니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Advanced,
    step: 'v17 mutate in signals',
    // Original: Use `update` instead of `mutate` in Angular Signals. For example `items.mutate(itemsArray => itemsArray.push(newItem));` will now be `items.update(itemsArray => [itemsArray, …newItem]);`
    action:
      'Angular Signals에서는 `mutate` 대신 `update`를 사용하세요. 예를 들어 `items.mutate(itemsArray => itemsArray.push(newItem));`는 이제 `items.update(itemsArray => [...itemsArray, newItem]);`로 변경됩니다.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Medium,
    step: 'v17 withNoDomReuse',
    // Original: To disable hydration use `ngSkipHydration` or remove the `provideClientHydration` call from the provider list since `withNoDomReuse` is no longer part of the public API.
    action:
      '`withNoDomReuse`가 더 이상 공개 API에 포함되지 않으므로 하이드레이션을 비활성화하려면 `ngSkipHydration`을 사용하거나 프로바이더 목록에서 `provideClientHydration` 호출을 제거하세요.',
  },
  {
    possibleIn: 1700,
    necessaryAsOf: 1700,
    level: ApplicationComplexity.Basic,
    step: 'v17 paramsInheritanceStrategy',
    // Original: If you want the child routes of `loadComponent` routes to inherit data from their parent specify the `paramsInheritanceStrategy` to `always`, which in v17 is now set to `emptyOnly`.
    action:
      '`loadComponent` 라우팅 규칙의 자식 라우팅 규칙이 부모의 데이터를 상속하도록 하려면 `paramsInheritanceStrategy`를 `always`로 지정하세요. v17에서는 이 값이 이제 `emptyOnly`로 설정됩니다.',
  },

  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Basic,
    step: 'v18 node support',
    // Original: Make sure that you are using a supported version of node.js before you upgrade your application. Angular v18 supports node.js versions: v18.19.0 and newer
    action:
      '애플리케이션을 업그레이드하기 전에 지원되는 node.js 버전을 사용하고 있는지 확인하세요. Angular v18은 node.js v18.19.0 이상을 지원합니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Basic,
    step: 'v18 ng update',
    // Original: In the application's project directory, run `ng update @angular/core@18 @angular/cli@18` to update your application to Angular v18.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@18 @angular/cli@18`을 실행하여 애플리케이션을 Angular v18로 업데이트하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@18`.
    action: '`ng update @angular/material@18`을 실행하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Basic,
    step: '18.0.0 Upgrade TypeScript',
    // Original: Update TypeScript to versions 5.4 or newer.
    action: 'TypeScript를 5.4 이상으로 업데이트하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: async has been removed, use `waitForAsync` instead',
    // Original: Replace `async` from `@angular/core` with `waitForAsync`.
    action: '`@angular/core`의 `async`를 `waitForAsync`로 바꾸세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: Deprecated matchesElement method removed from AnimationDriver',
    // Original: Remove calls to `matchesElement` because it's now not part of `AnimationDriver`.
    action:
      '`matchesElement`가 이제 `AnimationDriver`에 포함되지 않으므로 이 메서드 호출을 제거하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0. Use `@angular/core` StateKey and TransferState',
    // Original: Import `StateKey` and `TransferState` from `@angular/core` instead of `@angular/platform-browser`.
    action:
      '`StateKey`와 `TransferState`를 `@angular/platform-browser` 대신 `@angular/core`에서 불러오세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0. Opt-in of caching for HTTP requests with auth headers',
    // Original: Use `includeRequestsWithAuthHeaders: true` in `withHttpTransferCache` to opt-in of caching for HTTP requests that require authorization.
    action:
      '인증이 필요한 HTTP 요청을 캐시하도록 설정하려면 `withHttpTransferCache`에서 `includeRequestsWithAuthHeaders: true`를 사용하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0.REMOVE_OBSOLETE_IS_WORKER',
    // Original: Update the application to remove `isPlatformWorkerUi` and `isPlatformWorkerApp` since they were part of platform WebWorker which is now not part of Angular.
    action:
      '`isPlatformWorkerUi`와 `isPlatformWorkerApp`은 이제 Angular에 포함되지 않는 WebWorker 플랫폼의 일부였으므로, 애플리케이션에서 제거하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0.FORCE_ZONE_CHANGE_DETECTION',
    // Original: Tests may run additional rounds of change detection to fully reflect test state in the DOM. As a last resort, revert to the old behavior by adding `provideZoneChangeDetection({ignoreChangesOutsideZone: true})` to the TestBed providers.
    action:
      '테스트 상태를 DOM에 완전히 반영하기 위해 테스트에서 변경 감지를 추가로 실행할 수 있습니다. 최후의 수단으로, TestBed 프로바이더에 `provideZoneChangeDetection({ignoreChangesOutsideZone: true})`를 추가하여 이전 동작으로 되돌릴 수 있습니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0: Remove two-way binding expressions in writable bindings',
    // Original: Remove expressions that write to properties in templates that use `[(ngModel)]`
    action: '`[(ngModel)]`을 사용하는 템플릿에서 프로퍼티에 값을 쓰는 표현식을 제거하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: Use zones to track pending requests',
    // Original: Remove calls to `Testability` methods `increasePendingRequestCount`, `decreasePendingRequestCount`, and `getPendingRequestCount`. This information is tracked by ZoneJS.
    action:
      '`Testability`의 `increasePendingRequestCount`, `decreasePendingRequestCount`, `getPendingRequestCount` 메서드 호출을 제거하세요. 이 정보는 ZoneJS에서 추적합니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0: Move shared providers to the routed component',
    // Original: Move any environment providers that should be available to routed components from the component that defines the `RouterOutlet` to the providers of `bootstrapApplication` or the `Route` config.
    action:
      '라우팅되는 컴포넌트에서 사용할 수 있어야 하는 환경 프로바이더는 `RouterOutlet`을 정의한 컴포넌트에서 `bootstrapApplication`의 프로바이더 또는 `Route` 설정의 프로바이더로 옮기세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0 Use RedirectCommand or new NavigationBehaviorOptions',
    // Original: When a guard returns a `UrlTree` as a redirect, the redirecting navigation will now use `replaceUrl` if the initial navigation was also using the `replaceUrl` option. If you prefer the previous behavior, configure the redirect using the new `NavigationBehaviorOptions` by returning a `RedirectCommand` with the desired options instead of `UrlTree`.
    action:
      '가드가 리디렉션을 위해 `UrlTree`를 반환할 때 최초 탐색에서도 `replaceUrl` 옵션을 사용했다면, 이제 리디렉션 탐색에도 `replaceUrl`을 사용합니다. 이전 동작을 원한다면 `UrlTree` 대신 원하는 옵션이 담긴 `RedirectCommand`를 반환하여 새로운 `NavigationBehaviorOptions`로 리디렉션을 설정하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: Remove deprecated resource cache providers',
    // Original: Remove dependencies of `RESOURCE_CACHE_PROVIDER` since it's no longer part of the Angular runtime.
    action:
      '`RESOURCE_CACHE_PROVIDER`가 더 이상 Angular 런타임에 포함되지 않으므로 이에 대한 의존성을 제거하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: Update Node.js URL parsing in `ServerPlatformLocation`',
    // Original: In `@angular/platform-server` now `pathname` is always suffixed with `/` and the default ports for http: and https: respectively are 80 and 443.
    action:
      '이제 `@angular/platform-server`에서 `pathname`은 항상 `/`로 끝나며, http:와 https:의 기본 포트는 각각 80과 443입니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0. Use absolute URLs',
    // Original: Provide an absolute `url` instead of using `useAbsoluteUrl` and `baseUrl` from `PlatformConfig`.
    action:
      '`PlatformConfig`의 `useAbsoluteUrl`과 `baseUrl`을 사용하는 대신 절대 `url`을 제공하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0. Switch from `platformDynamicServer` to `platformServer`.',
    // Original: Replace the usage of `platformDynamicServer` with `platformServer`. Also, add an `import @angular/compiler`.
    action:
      '`platformDynamicServer`를 사용하는 코드를 `platformServer`로 바꾸세요. 또한 `import @angular/compiler`를 추가하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0. Remove `ServerTransferStateModule` from app imports',
    // Original: Remove all imports of `ServerTransferStateModule` from your application. It is no longer needed.
    action:
      '애플리케이션에서 `ServerTransferStateModule`을 불러오는 모든 import 문을 제거하세요. 더 이상 필요하지 않습니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0. Update `Route.redirectTo` to accept functions',
    // Original: `Route.redirectTo` can now include a function in addition to a string. Any code which reads `Route` objects directly and expects `redirectTo` to be a string may need to update to account for functions as well.
    action:
      '이제 `Route.redirectTo`는 문자열뿐만 아니라 함수도 포함할 수 있습니다. `Route` 객체를 직접 읽으면서 `redirectTo`가 문자열이라고 가정하는 코드는 함수도 처리하도록 업데이트해야 할 수 있습니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: Guards can return `RedirectCommand`',
    // Original: `Route` guards and resolvers can now return a `RedirectCommand` object in addition to a `UrlTree` and `boolean`. Any code which reads `Route` objects directly and expects only `boolean` or `UrlTree` may need to update to account for `RedirectCommand` as well.
    action:
      '이제 `Route` 가드와 리졸버는 `UrlTree`와 `boolean`뿐만 아니라 `RedirectCommand` 객체도 반환할 수 있습니다. `Route` 객체를 직접 읽으면서 `boolean` 또는 `UrlTree`만 예상하는 코드는 `RedirectCommand`도 처리하도록 업데이트해야 할 수 있습니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Medium,
    step: '18.0.0: Mark `OnPush` views dirty',
    // Original: For any components using `OnPush` change detection, ensure they are properly marked dirty to enable host binding updates.
    action:
      '`OnPush` 변경 감지를 사용하는 모든 컴포넌트가 호스트 바인딩을 업데이트할 수 있도록 변경된 상태로 올바르게 표시되어 있는지 확인하세요.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0-Refresh-Newly-Created-Views',
    // Original: Be aware that newly created views or views marked for check and reattached during change detection are now guaranteed to be refreshed in that same change detection cycle.
    action:
      '새로 생성된 뷰 또는 변경 감지 중에 검사 대상으로 표시되고 다시 연결된 뷰는 이제 같은 변경 감지 주기 안에서 반드시 갱신됩니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0: `ComponentFixture.whenStable` matches `ApplicationRef.isStable`',
    // Original: After aligning the semantics of `ComponentFixture.whenStable` and `ApplicationRef.isStable`, your tests may wait longer when using `whenStable`.
    action:
      '`ComponentFixture.whenStable`과 `ApplicationRef.isStable`의 의미를 일치시킨 이후에는 `whenStable`을 사용하는 테스트가 더 오래 기다릴 수 있습니다.',
  },
  {
    possibleIn: 1800,
    necessaryAsOf: 1800,
    level: ApplicationComplexity.Advanced,
    step: '18.0.0. `ComponentFixture.autoDetect` behavior more closely matches Application behavior',
    // Original: You may experience tests failures if you have tests that rely on change detection execution order when using `ComponentFixture.autoDetect` because it now executes change detection for fixtures within `ApplicationRef.tick`. For example, this will cause test fixture to refresh before any dialogs that it creates whereas this may have been the other way around in the past.
    action:
      '이제 `ComponentFixture.autoDetect`는 `ApplicationRef.tick` 내에서 픽스처의 변경 감지를 실행하므로, 이 기능을 사용하면서 변경 감지 실행 순서에 의존하는 테스트는 실패할 수 있습니다. 예를 들어 이제 테스트 픽스처는 자신이 생성한 다이얼로그보다 먼저 갱신되지만, 이전에는 순서가 반대였을 수 있습니다.',
  },
  {
    // Original: In the application's project directory, run `ng update @angular/core@19 @angular/cli@19` to update your application to Angular v19.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@19 @angular/cli@19`를 실행하여 애플리케이션을 Angular v19로 업데이트하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0_ng_update',
  },
  {
    possibleIn: 1900,
    necessaryAsOf: 1900,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@19`.
    action: '`ng update @angular/material@19`를 실행하세요.',
  },
  {
    // Original: Angular directives, components and pipes are now standalone by default. Specify "standalone: false" for declarations that are currently declared in an NgModule. The Angular CLI will automatically update your code to reflect that.
    action:
      '이제 Angular 디렉티브, 컴포넌트, 파이프는 기본적으로 독립형입니다. 현재 NgModule에 선언된 항목에는 "standalone: false"를 지정하세요. Angular CLI가 이 변경을 반영하도록 코드를 자동으로 업데이트합니다.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-standalone-declarations',
  },
  {
    // Original: Remove `this.` prefix when accessing template reference variables. For example, refactor `<div #foo></div>{{ this.foo }}` to `<div #foo></div>{{ foo }}`
    action:
      '템플릿 참조 변수에 접근할 때 `this.` 접두사를 제거하세요. 예를 들어 `<div #foo></div>{{ this.foo }}`를 `<div #foo></div>{{ foo }}`로 리팩토링하세요.',
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-remove-this',
  },
  {
    // Original: Replace usages of `BrowserModule.withServerTransition()` with injection of the `APP_ID` token to set the application `id` instead.
    action:
      '`BrowserModule.withServerTransition()`을 사용하는 대신 `APP_ID` 토큰을 주입하여 애플리케이션 `id`를 설정하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-remove-browser-module-with-server-transition',
  },
  {
    // Original: The `factories` property in `KeyValueDiffers` has been removed.
    action: '`KeyValueDiffers`의 `factories` 프로퍼티가 제거되었습니다.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-remove-key-value-differs-factories',
  },
  {
    // Original: In angular.json, replace the "name" option with "project" for the `@angular/localize` builder.
    action: 'angular.json에서 `@angular/localize` 빌더의 "name" 옵션을 "project"로 바꾸세요.',
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0_localize_builder_project_option',
  },
  {
    // Original: Rename `ExperimentalPendingTasks` to `PendingTasks`.
    action: '`ExperimentalPendingTasks`의 이름을 `PendingTasks`로 바꾸세요.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0_rename_experimental_pending_tasks',
  },
  {
    // Original: Update tests that relied on the `Promise` timing of effects to use `await whenStable()` or call `.detectChanges()` to trigger effects. For effects triggered during change detection, ensure they don't depend on the application being fully rendered or consider using `afterRenderEffect()`. Tests using faked clocks may need to fast-forward/flush the clock.
    action:
      '이펙트의 `Promise` 실행 시점에 의존하던 테스트를 수정하여 `await whenStable()`을 사용하거나 `.detectChanges()`를 호출해 이펙트를 실행하세요. 변경 감지 중에 실행되는 이펙트는 애플리케이션의 렌더링이 모두 완료된 상태에 의존하지 않도록 하거나, `afterRenderEffect()` 사용을 고려하세요. 가짜 시계를 사용하는 테스트에서는 시계의 시간을 앞으로 진행시키거나 대기 중인 작업을 모두 실행해야 할 수 있습니다.',
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0.1',
  },
  {
    // Original: Upgrade to TypeScript version 5.5 or later.
    action: 'TypeScript를 5.5 이상 버전으로 업그레이드하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0.2',
  },
  {
    // Original: Update tests using `fakeAsync` that rely on specific timing of zone coalescing and scheduling when a change happens outside the Angular zone (hybrid mode scheduling) as these timers are now affected by `tick` and `flush`.
    action:
      'Angular 존 외부에서 변경이 발생할 때 존 병합과 스케줄링(하이브리드 모드 스케줄링)의 특정 실행 시점에 의존하는 `fakeAsync` 테스트를 수정하세요. 이제 이러한 타이머도 `tick`과 `flush`의 영향을 받습니다.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-timers-in-zone',
  },
  {
    // Original: When using `createComponent` API and not passing content for the first `ng-content`, provide `document.createTextNode('')` as a `projectableNode` to prevent rendering the default fallback content.
    action:
      "`createComponent` API를 사용하면서 첫 번째 `ng-content`에 콘텐츠를 전달하지 않는 경우, 기본 대체 콘텐츠가 렌더링되지 않도록 `document.createTextNode('')`를 `projectableNode`로 제공하세요.",
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-render-default-fallback',
  },
  {
    // Original: Update tests that rely on specific timing or ordering of change detection around custom elements, as the timing may have changed due to the switch to the hybrid scheduler.
    action:
      '커스텀 엘리먼트와 관련된 변경 감지의 특정 실행 시점이나 순서에 의존하는 테스트를 수정하세요. 하이브리드 스케줄러로 전환되면서 실행 시점이 달라졌을 수 있습니다.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-hybrid-scheduler-timing',
  },
  {
    // Original: Migrate from using `Router.errorHandler` to `withNavigationErrorHandler` from `provideRouter` or `errorHandler` from `RouterModule.forRoot`.
    action:
      '`Router.errorHandler` 대신 `provideRouter`의 `withNavigationErrorHandler` 또는 `RouterModule.forRoot`의 `errorHandler`를 사용하도록 마이그레이션하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-router-error-handler',
  },
  {
    // Original: Update tests to handle errors thrown during `ApplicationRef.tick` by either triggering change detection synchronously or rejecting outstanding `ComponentFixture.whenStable` promises.
    action:
      '`ApplicationRef.tick` 중 발생한 오류를 처리하도록 테스트를 수정하세요. 동기적으로 변경 감지를 실행할 때 던져지는 오류나, 아직 완료되지 않은 `ComponentFixture.whenStable` 프로미스의 거부를 처리해야 합니다.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-testbed-error-handling',
  },
  {
    // Original: Update usages of `Resolve` interface to include `RedirectCommand` in its return type.
    action:
      '`Resolve` 인터페이스를 사용하는 코드를 수정하여 반환 타입에 `RedirectCommand`를 포함하세요.',
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-update-resolve-interface-return-type',
  },
  {
    // Original: `fakeAsync` will flush pending timers by default. For tests that require the previous behavior, explicitly pass `{flush: false}` in the options parameter.
    action:
      '`fakeAsync`는 기본적으로 대기 중인 타이머를 모두 실행합니다. 이전 동작이 필요한 테스트에서는 옵션 매개변수에 `{flush: false}`를 명시적으로 전달하세요.',
    level: ApplicationComplexity.Advanced,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-update-fakeasync-to-flush-pending-timers',
  },
  {
    // Original: Remove the `allowSignalWrites` option from `effect()` calls. The option is deprecated and no longer required, as signal writes inside effects are allowed by default.
    action:
      '`effect()` 호출에서 `allowSignalWrites` 옵션을 제거하세요. 이 옵션은 지원 중단되었으며, 이제 이펙트 내부에서 시그널 값을 변경하는 것이 기본적으로 허용되므로 더 이상 필요하지 않습니다.',
    level: ApplicationComplexity.Medium,
    necessaryAsOf: 1900,
    possibleIn: 1900,
    step: '19.0.0-remove-allow-signal-writes',
  },
  {
    // Original: In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@20 @angular/cli@20`을 실행하여 애플리케이션을 Angular v20으로 업데이트하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 2000,
    possibleIn: 2000,
    step: '20.0.0_ng_update',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@20`.
    action: '`ng update @angular/material@20`을 실행하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_rename_afterRender_to_afterEveryRender',
    // Original: Rename the `afterRender` lifecycle hook to `afterEveryRender`
    action: '`afterRender` 라이프사이클 훅의 이름을 `afterEveryRender`로 바꾸세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_replace_TestBed_flushEffects_with_tick',
    // Original: Replace uses of `TestBed.flushEffects()` with `TestBed.tick()`, the closest equivalent to synchronously flush effects.
    action:
      '`TestBed.flushEffects()` 대신 이펙트를 동기적으로 모두 실행하는 가장 유사한 기능인 `TestBed.tick()`을 사용하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_provideCheckNoChangesConfig',
    // Original: Rename `provideExperimentalCheckNoChangesForDebug` to `provideCheckNoChangesConfig`. Note its behavior now applies to all `checkNoChanges` runs. The `useNgZoneOnStable` option is no longer available.
    action:
      '`provideExperimentalCheckNoChangesForDebug`의 이름을 `provideCheckNoChangesConfig`로 바꾸세요. 이제 이 동작은 모든 `checkNoChanges` 실행에 적용됩니다. `useNgZoneOnStable` 옵션은 더 이상 사용할 수 없습니다.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_refactor_ng_reflect_attributes_usage',
    // Original: Refactor application and test code to avoid relying on `ng-reflect-*` attributes. If needed temporarily for migration, use `provideNgReflectAttributes()` from `@angular/core` in bootstrap providers to re-enable them in dev mode only.
    action:
      '`ng-reflect-*` 어트리뷰트에 의존하지 않도록 애플리케이션과 테스트 코드를 리팩터링하세요. 마이그레이션을 위해 일시적으로 필요한 경우, 부트스트랩 프로바이더에서 `@angular/core`의 `provideNgReflectAttributes()`를 사용하여 개발 모드에서만 이 어트리뷰트를 다시 활성화하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_adjust_RedirectFn_return_type_handling',
    // Original: Adjust code that directly calls functions returning `RedirectFn`. These functions can now also return an `Observable` or `Promise`; ensure your logic correctly handles these asynchronous return types.
    action:
      '`RedirectFunction` 함수를 직접 호출하는 코드를 수정하세요. 이제 이러한 함수는 `Observable`이나 `Promise`도 반환할 수 있으므로, 로직에서 이러한 비동기 반환 타입을 올바르게 처리하도록 하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_rename_resource_request_to_param',
    // Original: Rename the `request` property passed in resources to `params`.
    action: '리소스에 전달하는 `request` 프로퍼티의 이름을 `params`로 바꾸세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_rename_rxResource_loader_to_stream',
    // Original: Rename the `request` and `loader` properties passed in RxResource to `params` and `stream`.
    action:
      'RxResource에 전달하는 `request`와 `loader` 프로퍼티의 이름을 각각 `params`와 `stream`으로 바꾸세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_replace_ResourceStatus_by_corresponding_strings',
    // Original: `ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.
    action:
      '`ResourceStatus`는 더 이상 열거형이 아닙니다. 대신 해당하는 상수 문자열 값을 사용하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_rename_provideExperimentalZonelessChangeDetection',
    // Original: Rename `provideExperimentalZonelessChangeDetection` to `provideZonelessChangeDetection`.
    action:
      '`provideExperimentalZonelessChangeDetection`의 이름을 `provideZonelessChangeDetection`으로 바꾸세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_template_expressions_using_in_property',
    // Original: If your templates use `{{ in }}` or `in` in expressions to refer to a component property named 'in', change it to `{{ this.in }}` or `this.in` as 'in' now refers to the JavaScript 'in' operator. If you're using `in` as a template reference, you'd have to rename the reference.
    action:
      "템플릿 표현식에서 'in'이라는 컴포넌트 프로퍼티를 참조하기 위해 `{{ in }}` 또는 `in`을 사용하는 경우, 이를 `{{ this.in }}` 또는 `this.in`으로 바꾸세요. 이제 'in'은 JavaScript의 'in' 연산자를 가리킵니다. `in`을 템플릿 참조로 사용하고 있다면 해당 참조의 이름을 바꿔야 합니다.",
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_router_method_array_parameters_to_readonly',
    // Original: The type for the commands arrays passed to Router methods (`createUrlTree`, `navigate`, `createUrlTreeFromSnapshot`) have been updated to use `readonly T[]` since the array is not mutated. Code which extracts these types (e.g. with `typeof`) may need to be adjusted if it expects mutable arrays.
    action:
      'Router 메서드(`createUrlTree`, `navigate`, `createUrlTreeFromSnapshot`)에 전달하는 명령 배열은 변경되지 않으므로, 해당 배열의 타입이 `readonly T[]`로 변경되었습니다. 이러한 타입을 추출하는 코드(예: `typeof` 사용)에서 변경 가능한 배열을 예상한다면 코드를 수정해야 할 수 있습니다.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_animation_tests_for_guaranteed_flushing',
    // Original: Review and update tests asserting on DOM elements involved in animations. Animations are now guaranteed to be flushed with change detection or `ApplicationRef.tick`, potentially altering previous test outcomes.
    action:
      '애니메이션과 관련된 DOM 엘리먼트를 검증하는 테스트를 검토하고 수정하세요. 이제 변경 감지 또는 `ApplicationRef.tick`과 함께 애니메이션이 모두 실행되는 것이 보장되므로, 이전 테스트 결과가 달라질 수 있습니다.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_handle_uncaught_listener_errors_in_tests',
    // Original: In tests, uncaught errors in event listeners are now rethrown by default. Previously, these were only logged to the console by default. Catch them if intentional for the test case, or use `rethrowApplicationErrors: false` in `configureTestingModule` as a last resort.
    action:
      '이제 테스트에서 이벤트 리스너의 처리되지 않은 오류를 기본적으로 다시 던집니다. 이전에는 이러한 오류가 기본적으로 콘솔에만 기록되었습니다. 테스트 케이스에서 의도한 오류라면 처리하고, 최후의 수단으로 `configureTestingModule`에서 `rethrowApplicationErrors: false`를 사용하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_route_guards_array_types',
    // Original: The `any` type is removed from the Route guard arrays (canActivate, canDeactivate, etc); ensure guards are functions, `ProviderToken<T>`, or (deprecated) strings. Refactor string guards to `ProviderToken<T>` or functions.
    action:
      'Route 가드 배열(canActivate, canDeactivate 등)에서 `any` 타입이 제거되었습니다. 가드가 함수, `ProviderToken<T>` 또는 지원 중단된 문자열인지 확인하세요. 문자열 가드는 `ProviderToken<T>` 또는 함수로 리팩터링하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_update_nodejs_version',
    // Original: Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check the [full list of supported Node.js versions](https://angular.dev/reference/versions).
    action:
      'Angular v20으로 업그레이드하기 전에 Node.js 버전이 20.11.1 이상이고 v18이나 v22.0-v22.10이 아닌지 확인하세요. [지원되는 Node.js 버전 전체 목록](https://angular.dev/reference/versions)을 확인하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_replace_TestBed_get_with_TestBed_inject',
    // Original: Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.
    action:
      'Angular 테스트에서 의존성 주입에 사용하는 지원 중단된 `TestBed.get()` 메서드를 모두 `TestBed.inject()`로 바꾸세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_remove_InjectFlags_usage',
    // Original: Remove `InjectFlags` enum and its usage from `inject`, `Injector.get`, `EnvironmentInjector.get`, and `TestBed.inject` calls. Use options like `{optional: true}` for `inject` or handle null for `*.get` methods.
    action:
      '`InjectFlags` 열거형과 `inject`, `Injector.get`, `EnvironmentInjector.get`, `TestBed.inject` 호출에서 이 열거형을 사용하는 코드를 제거하세요. `inject`에는 `{optional: true}`와 같은 옵션을 사용하거나, `*.get` 메서드에서는 null을 처리하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_injector_get_calls_to_use_ProviderToken',
    // Original: Update `injector.get()` calls to use a specific `ProviderToken<T>` instead of relying on the removed `any` overload. If using string tokens (deprecated since v4), migrate them to `ProviderToken<T>`.
    action:
      '`injector.get()` 호출을 수정하여 제거된 `any` 오버로드에 의존하는 대신 구체적인 `ProviderToken<T>`를 사용하세요. 문자열 토큰(v4부터 지원 중단됨)을 사용하고 있다면 `ProviderToken<T>`로 마이그레이션하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Basic,
    step: '20.0.0_update_typescript_version',
    // Original: Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.
    action:
      '호환성을 보장하려면 Angular v20으로 업그레이드하기 전에 프로젝트의 TypeScript 버전을 5.8 이상으로 업그레이드하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_set_moduleResolution_to_bundler',
    // Original: Set `moduleResolution` to `'bundler'` in your `tsconfig.json`. Angular CLI's `ng update` migration applies this change automatically; if you upgrade manually or override the option in a base tsconfig, set it explicitly so imports of secondary entry-points such as `@angular/core/rxjs-interop` continue to resolve correctly.
    action:
      "`tsconfig.json`에서 `moduleResolution`을 `'bundler'`로 설정하세요. Angular CLI의 `ng update` 마이그레이션은 이 변경 사항을 자동으로 적용합니다. 수동으로 업그레이드하거나 기본 tsconfig에서 이 옵션을 재정의하는 경우에는 `@angular/core/rxjs-interop`와 같은 보조 진입점의 임포트가 계속 올바르게 해석되도록 명시적으로 설정하세요.",
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_review_AsyncPipe_error_handling_in_tests',
    // Original: `Unhandled errors in subscriptions/promises of AsyncPipe` are now directly reported to `ErrorHandler`. This may alter test outcomes; ensure tests correctly handle these reported errors.
    action:
      '이제 AsyncPipe의 구독/프로미스에서 처리되지 않은 오류(`Unhandled errors in subscriptions/promises of AsyncPipe`)가 `ErrorHandler`에 직접 보고됩니다. 이로 인해 테스트 결과가 달라질 수 있으므로, 테스트에서 보고된 오류를 올바르게 처리하도록 하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_refactor_PendingTasks_run_usage',
    // Original: If relying on the return value of `PendingTasks.run`, refactor to use `PendingTasks.add`. Handle promise results/rejections manually, especially for SSR to prevent node process shutdown on unhandled rejections.
    action:
      '`PendingTasks.run`의 반환값에 의존하고 있다면 `PendingTasks.add`를 사용하도록 리팩터링하세요. 프로미스의 결과와 거부를 직접 처리하세요. 특히 SSR에서는 처리되지 않은 거부로 인해 node 프로세스가 종료되지 않도록 하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_update_template_expressions_using_void_property',
    // Original: If your templates use `{{ void }}` or `void` in expressions to refer to a component property named 'void', change it to `{{ this.void }}` or `this.void` as 'void' now refers to the JavaScript `void` operator.
    action:
      "템플릿 표현식에서 'void'라는 컴포넌트 프로퍼티를 참조하기 위해 `{{ void }}` 또는 `void`를 사용하는 경우, 이를 `{{ this.void }}` 또는 `this.void`로 바꾸세요. 이제 'void'는 JavaScript의 `void` 연산자를 가리킵니다.",
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_review_date_pipe_formatter_Y_usage',
    // Original: Review `DatePipe` usages. Using the `Y` (week-numbering year) formatter without also including `w` (week number) is now detected as suspicious. Use `y` (year) if that was the intent, or include `w` alongside `Y`.
    action:
      '`DatePipe`를 사용하는 코드를 검토하세요. 이제 `w`(주 번호)를 포함하지 않고 `Y`(주 번호 기준 연도) 포맷터를 사용하면 의심스러운 사용으로 감지됩니다. 일반적인 연도를 의도했다면 `y`(연도)를 사용하고, 그렇지 않다면 `Y`와 함께 `w`를 포함하세요.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Medium,
    step: '20.0.0_handle_uncaught_listener_errors_in_tests',
    // Original: In templates parentheses are now always respected. This can lead to runtime breakages when nullish coalescing were nested in parathesis. eg `(foo?.bar).baz` will throw if `foo` is nullish as it would in native JavaScript.
    action:
      '이제 템플릿에서 괄호가 항상 적용됩니다. 이로 인해 옵셔널 체이닝을 괄호 안에 중첩한 경우 런타임 오류가 발생할 수 있습니다. 예를 들어 `(foo?.bar).baz`는 일반 JavaScript에서와 마찬가지로 `foo`가 null 또는 undefined이면 오류를 던집니다.',
  },
  {
    possibleIn: 2000,
    necessaryAsOf: 2000,
    level: ApplicationComplexity.Advanced,
    step: '20.0.0_router_generate_error_redirectTo_and_canMatch_incompatible_together',
    // Original: Route configurations are now validated more rigorously. Routes that combine `redirectTo` and `canMatch` protections will generate an error, as these properties are incompatible together by default.
    action:
      '이제 라우팅 규칙 설정을 더욱 엄격하게 검증합니다. `redirectTo`와 `canMatch` 보호 기능을 함께 사용하는 라우팅 규칙은 오류를 발생시킵니다. 기본적으로 이 두 프로퍼티는 함께 사용할 수 없기 때문입니다.',
  },
  {
    // Original: In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@21 @angular/cli@21`을 실행하여 애플리케이션을 Angular v21로 업데이트하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 2100,
    possibleIn: 2100,
    step: '21.0.0_ng_update',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-safe-resource-url-audio-src',
    // Original: If you use `SafeResourceUrl` values with `audio[src]` bindings, be aware that `audio[src]` is no longer sanitized in Angular v21. Existing uses of `bypassSecurityTrustResourceUrl` may therefore produce the `SafeValue must use [property]=binding` message. Remove the unnecessary sanitization and bind the URL directly instead.
    action:
      '`audio[src]` 바인딩에 `SafeResourceUrl` 값을 사용하는 경우, Angular v21에서는 `audio[src]`가 더 이상 무력화되지 않는다는 점에 유의하세요. 따라서 기존의 `bypassSecurityTrustResourceUrl` 사용으로 인해 `SafeValue must use [property]=binding` 메시지가 표시될 수 있습니다. 불필요한 무력화 처리를 제거하고 URL을 직접 바인딩하세요.',
  },

  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@21`.
    action: '`ng update @angular/material@21`을 실행하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    material: true,
    step: '21.0.0-cdk-overlay-top-layer-stacking',
    // Original: CDK overlays can now render in the browser's native top layer, causing elements that previously appeared above Material overlays via `z-index` to render beneath them. You can restore the previous behavior by providing `OVERLAY_DEFAULT_CONFIG` from `@angular/cdk/overlay` with the value `{usePopover: false}`.
    action:
      '이제 CDK 오버레이가 브라우저의 네이티브 최상위 레이어에 렌더링될 수 있으므로, 이전에는 `z-index`를 통해 Material 오버레이 위에 표시되던 엘리먼트가 그 아래에 렌더링될 수 있습니다. `@angular/cdk/overlay`의 `OVERLAY_DEFAULT_CONFIG`에 `{usePopover: false}` 값을 제공하면 이전 동작으로 되돌릴 수 있습니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-update-signal-input-access-in-custom-elements',
    // Original: When using signal inputs with Angular custom elements, update property access to be direct (`elementRef.newInput`) instead of a function call (`elementRef.newInput()`) to align with the behavior of decorator-based inputs.
    action:
      'Angular 커스텀 엘리먼트에서 시그널 입력을 사용하는 경우, 데코레이터 기반 입력의 동작에 맞추기 위해 함수 호출(`elementRef.newInput()`) 대신 직접 접근(`elementRef.newInput`)하도록 프로퍼티 접근 코드를 수정하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-zone-scheduler-behavior-change',
    // Original: If using `provideZoneChangeDetection` without the ZoneJS polyfill, note that the internal scheduler is now always enabled. Review your app's timing as this may alter behavior that previously relied on the disabled scheduler.
    action:
      'ZoneJS 폴리필 없이 `provideZoneChangeDetection`을 사용하는 경우, 이제 내부 스케줄러가 항상 활성화된다는 점에 유의하세요. 이전에 스케줄러가 비활성화된 상태에 의존하던 동작이 달라질 수 있으므로 앱의 실행 시점을 검토하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Basic,
    step: '21.0.0-provide-zone-change-detection-required',
    // Original: Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.
    action:
      '존 기반 애플리케이션은 애플리케이션의 루트 프로바이더에 `provideZoneChangeDetection()`을 추가해야 합니다. 독립형 앱에서는 `bootstrapApplication` 호출에 추가하세요. NgModule 기반 앱에서는 루트 `AppModule`의 `providers` 배열에 추가하세요. 자동 마이그레이션이 이를 처리할 것입니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-remove-interpolation-option',
    // Original: Remove the 'interpolation' property from your @Component decorators. Angular now only supports the default '{{' and '}}' interpolation markers.
    action:
      "@Component 데코레이터에서 'interpolation' 프로퍼티를 제거하세요. 이제 Angular는 기본 문자열 바인딩 구분자인 '{{'와 '}}'만 지원합니다.",
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-remove-moduleid-property',
    // Original: Remove the 'moduleId' property from your @Component decorators. This property was used for resolving relative URLs for templates and styles, a functionality now handled by modern build tools.
    action:
      "@Component 데코레이터에서 'moduleId' 프로퍼티를 제거하세요. 이 프로퍼티는 템플릿과 스타일의 상대 URL을 해석하는 데 사용되었으며, 이제는 최신 빌드 도구가 이 기능을 처리합니다.",
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-ng-component-outlet-content-type-change',
    // Original: The `ngComponentOutletContent` input has been strictly typed from `any[][]` to `Node[][]`. Update the value you pass to this input to match the new `Node[][] | undefined` type.
    action:
      '`ngComponentOutletContent` 입력의 타입이 `any[][]`에서 `Node[][]`로 엄격해졌습니다. 이 입력에 전달하는 값을 새로운 `Node[][] | undefined` 타입에 맞게 수정하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Basic,
    step: '21.0.0-stricter-host-binding-type-checking',
    // Original: Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.
    action:
      '이제 호스트 바인딩 타입 검사가 기본적으로 활성화되므로 새로운 빌드 오류가 나타날 수 있습니다. 새로운 타입 오류를 해결하거나 `tsconfig.json`의 `angularCompilerOptions`에서 `typeCheckHostBindings: false`를 설정하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Basic,
    step: '21.0.0-typescript-5.9-required',
    // Original: Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.
    action:
      '프로젝트의 TypeScript 버전을 5.9 이상으로 업데이트하세요. 일반적으로 `ng update` 명령이 이를 자동으로 처리합니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-remove-application-config-from-platform-browser',
    // Original: The `ApplicationConfig` export from `@angular/platform-browser` has been removed. Update your imports to use `ApplicationConfig` from `@angular/core` instead.
    action:
      '`@angular/platform-browser`에서 내보내던 `ApplicationConfig`가 제거되었습니다. 대신 `@angular/core`의 `ApplicationConfig`를 사용하도록 임포트를 수정하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-remove-ignore-changes-outside-zone-option',
    // Original: The `ignoreChangesOutsideZone` option for configuring ZoneJS is no longer available. Remove this option from your ZoneJS configuration in your polyfills file.
    action:
      'ZoneJS를 설정하는 `ignoreChangesOutsideZone` 옵션은 더 이상 사용할 수 없습니다. 폴리필 파일의 ZoneJS 설정에서 이 옵션을 제거하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-testbed-rethrows-errors-with-provideZoneChangeDetection',
    // Original: Update tests using `provideZoneChangeDetection` as TestBed now rethrows errors. Fix the underlying issues in your tests or, as a last resort, configure TestBed with `rethrowApplicationErrors: false` to disable this behavior.
    action:
      '이제 TestBed가 오류를 다시 던지므로, `provideZoneChangeDetection`을 사용하는 테스트를 수정하세요. 테스트의 근본적인 문제를 해결하거나, 최후의 수단으로 TestBed에 `rethrowApplicationErrors: false`를 설정하여 이 동작을 비활성화하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-router-navigation-timing-changed',
    // Original: Update tests that rely on router navigation timing. Navigations may now take additional microtasks to complete. Ensure navigations are fully completed before making assertions, for example by using `fakeAsync` with `flush` or waiting for promises/observables to resolve.
    action:
      '라우터 내비게이션 실행 시점에 의존하는 테스트를 수정하세요. 이제 내비게이션이 완료되기까지 추가 마이크로태스크가 필요할 수 있습니다. 검증을 수행하기 전에 내비게이션이 완전히 완료되었는지 확인하세요. 예를 들어 `fakeAsync`와 `flush`를 함께 사용하거나 프로미스 또는 옵저버블의 결과를 기다릴 수 있습니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-test-bed-provides-fake-platform-location',
    // Original: Tests using `TestBed` might be affected by the new fake `PlatformLocation`. If your tests fail, provide the old `MockPlatformLocation` from `@angular/common/testing` via `{provide: PlatformLocation, useClass: MockPlatformLocation}` in your `TestBed` configuration.
    action:
      '`TestBed`를 사용하는 테스트는 새로운 가짜 `PlatformLocation`의 영향을 받을 수 있습니다. 테스트가 실패하면 `TestBed` 설정에서 `{provide: PlatformLocation, useClass: MockPlatformLocation}`을 통해 `@angular/common/testing`의 기존 `MockPlatformLocation`을 제공하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-remove-upgrade-adapter',
    // Original: The `UpgradeAdapter` has been removed. Update your hybrid Angular/AngularJS application to use the static APIs from the `@angular/upgrade/static` package instead.
    action:
      '`UpgradeAdapter`가 제거되었습니다. 하이브리드 Angular/AngularJS 애플리케이션을 수정하여 대신 `@angular/upgrade/static` 패키지의 정적 API를 사용하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-form-array-directive-conflict',
    // Original: The new standalone `formArray` directive might conflict with existing custom directives or inputs. Rename any custom directives named `FormArray` or inputs named `formArray` on elements that also use reactive forms to resolve the conflict.
    action:
      '새로운 독립형 `formArray` 디렉티브가 기존 커스텀 디렉티브나 입력과 충돌할 수 있습니다. 반응형 폼도 사용하는 엘리먼트에 `FormArray`라는 커스텀 디렉티브나 `formArray`라는 입력이 있다면 이름을 바꿔 충돌을 해결하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-ngmodulefactory-removed',
    // Original: The deprecated `NgModuleFactory` has been removed. Update any code that uses `NgModuleFactory` to use `NgModule` directly, which is common in dynamic component loading scenarios.
    action:
      '지원 중단된 `NgModuleFactory`가 제거되었습니다. `NgModuleFactory`를 사용하는 코드를 수정하여 `NgModule`을 직접 사용하세요. 이러한 사용은 동적 컴포넌트 로딩 시나리오에서 흔히 볼 수 있습니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Advanced,
    step: '21.0.0-emit-declaration-only-not-supported',
    // Original: The `emitDeclarationOnly` TypeScript compiler option is not supported. Please disable it in your `tsconfig.json` file to allow the Angular compiler to function correctly.
    action:
      'TypeScript 컴파일러의 `emitDeclarationOnly` 옵션은 지원되지 않습니다. Angular 컴파일러가 올바르게 동작하도록 `tsconfig.json` 파일에서 이 옵션을 비활성화하세요.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-lastsuccessfulnavigation-is-a-signal',
    // Original: The `lastSuccessfulNavigation` property on the Router has been converted to a signal. To get its value, you now need to invoke it as a function: `router.lastSuccessfulNavigation()`.
    action:
      'Router의 `lastSuccessfulNavigation` 프로퍼티가 시그널로 변환되었습니다. 이제 값을 가져오려면 `router.lastSuccessfulNavigation()`과 같이 함수로 호출해야 합니다.',
  },
  {
    possibleIn: 2100,
    necessaryAsOf: 2100,
    level: ApplicationComplexity.Medium,
    step: '21.0.0-configure-commonengine-allowed-hosts',
    // Original: Starting `@angular/ssr` 21.1.5, if your application uses SSR with `CommonEngine`, set the `allowedHosts` option in your `server.ts` (for example, `new CommonEngine({allowedHosts: ['localhost', '*.yourdomain.com']})`). Without it, SSR silently falls back to client-side rendering. This requirement comes from security advisory [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx) (also backported to 20.3.17 and 19.2.21).
    action:
      "`@angular/ssr` 21.1.5부터 애플리케이션에서 `CommonEngine`으로 SSR을 사용하는 경우, `server.ts`에 `allowedHosts` 옵션을 설정하세요(예: `new CommonEngine({allowedHosts: ['localhost', '*.yourdomain.com']})`). 이 옵션이 없으면 별도의 알림 없이 SSR 대신 클라이언트 측 렌더링으로 전환됩니다. 이 요구사항은 보안 권고 [GHSA-x288-3778-4hhx](https://github.com/angular/angular-cli/security/advisories/GHSA-x288-3778-4hhx)에 따른 것입니다(20.3.17 및 19.2.21에도 백포트됨).",
  },
  {
    // Original: In the application's project directory, run `ng update @angular/core@22 @angular/cli@22` to update your application to Angular v22.
    action:
      '애플리케이션의 프로젝트 디렉터리에서 `ng update @angular/core@22 @angular/cli@22`을 실행하여 애플리케이션을 Angular v22로 업데이트하세요.',
    level: ApplicationComplexity.Basic,
    necessaryAsOf: 2200,
    possibleIn: 2200,
    step: '22.0.0_ng_update',
  },

  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    material: true,
    step: 'update @angular/material',
    // Original: Run `ng update @angular/material@22`.
    action: '`ng update @angular/material@22`를 실행하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    step: '22.0.0-update-nodejs-version',
    // Original: Angular v22 requires Node.js v22.22.3 or v24.15.0 and later. Update your Node.js version to meet this minimum requirement. You can check your current version with `node --version`.
    action:
      'Angular v22에는 Node.js v22.22.3 또는 v24.15.0 이상이 필요합니다. 이 최소 요구사항을 충족하도록 Node.js 버전을 업데이트하세요. `node --version`으로 현재 버전을 확인할 수 있습니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    step: '22.0.0-update-typescript-version',
    // Original: Update your project to use TypeScript 6.0 or later. Versions older than 6.0 are no longer supported. Use `ng update` which will handle this automatically.
    action:
      '프로젝트에서 TypeScript 6.0 이상을 사용하도록 업데이트하세요. 6.0 미만 버전은 더 이상 지원되지 않습니다. 이 작업을 자동으로 처리하는 `ng update`를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-data-attributes-input-output-binding',
    // Original: Data-prefixed attributes (e.g., `data-*`) no longer bind to inputs or outputs. If you were relying on this behavior, use explicit property bindings instead (e.g., `[attr.data-value]="value"` or `[dataValue]="value"` for a component input).
    action:
      '이제 data 접두사가 있는 어트리뷰트(예: `data-*`)는 입력이나 출력에 바인딩되지 않습니다. 이 동작에 의존하고 있었다면 명시적인 프로퍼티 바인딩을 대신 사용하세요(예: `[attr.data-value]="value"` 또는 컴포넌트 입력의 경우 `[dataValue]="value"`).',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-duplicate-input-output-bindings',
    // Original: The compiler now throws an error when inputs, outputs, or model are binding to the same property/output. Review your component decorators and ensure no duplicate bindings exist.
    action:
      '이제 입력, 출력 또는 모델이 동일한 프로퍼티나 출력에 바인딩되면 컴파일러가 오류를 던집니다. 컴포넌트 데코레이터를 검토하고 중복 바인딩이 없는지 확인하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-safe-navigation-nullability-narrowing',
    // Original: Safe navigation (`?.`) and nullish coalescing (`??`) now correctly narrow down nullable types in templates. This may trigger `nullishCoalescingNotNullable` and `optionalChainNotNullable` diagnostics on existing projects. Either fix the diagnostics by updating your templates, or temporarily disable them in your `tsconfig.json` under `angularCompilerOptions`.
    action:
      '이제 안전 탐색(`?.`)과 널 병합(`??`)은 템플릿에서 null을 허용하는 타입을 올바르게 좁힙니다. 이로 인해 기존 프로젝트에서 `nullishCoalescingNotNullable`과 `optionalChainNotNullable` 진단이 발생할 수 있습니다. 템플릿을 수정하여 진단의 원인을 해결하거나, `tsconfig.json`의 `angularCompilerOptions`에서 일시적으로 해당 진단을 비활성화하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-safe-navigation-returns-undefined',
    // Original: Angular expressions with optional chaining (`?.`) now return `undefined` instead of `null`. You can use the `$safeNavigationMigration()` magic function to revert to the previous behavior.
    action:
      '이제 옵셔널 체이닝(`?.`)을 사용하는 Angular 표현식은 `null` 대신 `undefined`를 반환합니다. `$safeNavigationMigration()` 매직 함수를 사용하면 이전 동작으로 되돌릴 수 있습니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-resource-stream-synchronous-resolution',
    // Original: The `stream` property on `Resource`, including `rxResource`, now resolves synchronously when the stream or observable emits synchronously. Tests that assumed asynchronous resolution may need to wait for the value immediately instead.
    action:
      '이제 `rxResource`를 포함한 `Resource`의 `stream` 프로퍼티는 스트림이나 옵저버블이 동기적으로 값을 방출하면 동기적으로 처리됩니다. 비동기 처리를 가정한 테스트는 대신 즉시 제공되는 값을 기다리도록 수정해야 할 수 있습니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-remove-in-expressions',
    // Original: `in` variables in template expressions now throw an error as it does in native JavaScript. If you have variables named `in` in your component or template, update your template expressions to use `this.in` or rename your variable.
    action:
      '이제 템플릿 표현식의 `in` 변수는 일반 JavaScript에서와 마찬가지로 오류를 발생시킵니다. 컴포넌트나 템플릿에 `in`이라는 변수가 있다면 템플릿 표현식에서 `this.in`을 사용하도록 수정하거나 변수의 이름을 바꾸세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-animation-callback-event-signature-change',
    // Original: The `AnimationCallbackEvent.animationComplete` signature has changed. Update any code that depends on the old signature of this event. Review your animation event handlers and tests.
    action:
      '`AnimationCallbackEvent.animationComplete`의 시그니처가 변경되었습니다. 이 이벤트의 이전 시그니처에 의존하는 코드를 수정하세요. 애니메이션 이벤트 핸들러와 테스트를 검토하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-http-xhr-backend-explicit-opt-in',
    // Original: If your application uses upload progress reporting through `HttpXhrBackend`, explicitly opt-in by using `provideHttpClient(withXhr())`. The default HTTP client no longer includes XHR support by default.
    action:
      '애플리케이션에서 `HttpXhrBackend`를 통해 업로드 진행 상황을 보고한다면 `provideHttpClient(withXhr())`를 사용하여 명시적으로 활성화하세요. 기본 HTTP 클라이언트에는 더 이상 XHR 지원이 기본적으로 포함되지 않습니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-deprecate-report-progress-option',
    // Original: The `reportProgress` option in HTTP requests is deprecated. Use `reportUploadProgress` or `reportDownloadProgress` instead for more explicit control over progress reporting.
    action:
      'HTTP 요청의 `reportProgress` 옵션이 지원 중단되었습니다. 진행 상황 보고를 더 명시적으로 제어하려면 대신 `reportUploadProgress` 또는 `reportDownloadProgress`를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-deprecate-server-xhr',
    // Original: XHR support in `@angular/platform-server` is deprecated and is intended to be removed in Angular 23. The underlying `xhr2` library does not safely handle redirects (e.g. it can forward `Authorization` headers on cross-origin redirects and is susceptible to DoS via redirect loops). For server-side rendering, use the default `fetch` backend instead of `withXhr()`.
    action:
      '`@angular/platform-server`의 XHR 지원이 지원 중단되었으며 Angular 23에서 제거될 예정입니다. 내부적으로 사용하는 `xhr2` 라이브러리는 리디렉션을 안전하게 처리하지 못합니다. 예를 들어 교차 출처 리디렉션에서 `Authorization` 헤더를 전달할 수 있으며, 리디렉션 루프를 통한 DoS에 취약합니다. 서버 측 렌더링에서는 `withXhr()` 대신 기본 `fetch` 백엔드를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-provide-routes-removed',
    // Original: `provideRoutes()` has been removed. Use `provideRouter()` instead, or configure routes as a multi token using `ROUTES` if necessary. Update your application bootstrap configuration.
    action:
      '`provideRoutes()`가 제거되었습니다. 대신 `provideRouter()`를 사용하거나, 필요한 경우 `ROUTES`를 사용하여 라우팅 규칙을 다중 토큰으로 설정하세요. 애플리케이션 부트스트랩 설정을 수정하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-upgrade-angular-js-global-migration',
    // Original: If using AngularJS interoperability, replace deprecated `getAngularLib()` and `setAngularLib()` with `getAngularJSGlobal()` and `setAngularJSGlobal()` respectively.
    action:
      'AngularJS 상호 운용성을 사용하는 경우, 지원 중단된 `getAngularLib()`와 `setAngularLib()`를 각각 `getAngularJSGlobal()`와 `setAngularJSGlobal()`로 바꾸세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-remove-component-factory-resolver',
    // Original: `ComponentFactoryResolver` and `ComponentFactory` are no longer available. Pass the component class directly to APIs like `ViewContainerRef.createComponent()` or use the standalone `createComponent()` function instead.
    action:
      '`ComponentFactoryResolver`와 `ComponentFactory`는 더 이상 사용할 수 없습니다. 컴포넌트 클래스를 `ViewContainerRef.createComponent()`와 같은 API에 직접 전달하거나, 독립형 `createComponent()` 함수를 대신 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-remove-create-ng-module-ref',
    // Original: `createNgModuleRef` has been removed. Use `createNgModule()` instead for dynamic module creation scenarios.
    action:
      '`createNgModuleRef`가 제거되었습니다. 동적 모듈 생성 시나리오에서는 대신 `createNgModule()`을 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-compile-time-duplicate-selectors',
    // Original: Elements with multiple matching selectors now throw a compile-time error. Ensure your components use unique selectors and review any directives that might have conflicting selectors.
    action:
      '둘 이상의 컴포넌트 셀렉터와 일치하는 엘리먼트는 컴파일 시점 오류를 발생시킵니다. 컴포넌트가 고유한 셀렉터를 사용하는지 확인하고, 충돌하는 셀렉터가 있을 수 있는 디렉티브를 검토하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-component-onpush-default',
    // Original: Components with no `changeDetection` property defined are now `OnPush` by default. To maintain `Eager` (the previous default) change detection, explicitly set `changeDetection: ChangeDetectionStrategy.Eager` in your component decorator.
    action:
      '이제 `changeDetection` 프로퍼티가 정의되지 않은 컴포넌트는 기본적으로 `OnPush`를 사용합니다. 이전 기본값인 `Eager` 변경 감지를 유지하려면 컴포넌트 데코레이터에 `changeDetection: ChangeDetectionStrategy.Eager`를 명시적으로 설정하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-remove-check-no-changes',
    // Original: `ChangeDetectorRef.checkNoChanges()` has been removed. In tests, use `fixture.detectChanges()` instead or verify your component state through other means.
    action:
      '`ChangeDetectorRef.checkNoChanges()`가 제거되었습니다. 테스트에서는 대신 `fixture.detectChanges()`를 사용하거나 다른 방법으로 컴포넌트 상태를 검증하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-leave-animations-scope-change',
    // Original: Leave animations are no longer limited to the element being removed. They now support nested animations scoped to component boundaries. Review your animation configurations if you relied on the previous scoping behavior.
    action:
      '이제 퇴장 애니메이션은 제거되는 엘리먼트에만 제한되지 않습니다. 이제 컴포넌트 경계를 범위로 하는 중첩 애니메이션을 지원합니다. 이전의 범위 지정 동작에 의존하고 있었다면 애니메이션 설정을 검토하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-params-inheritance-strategy-default',
    // Original: `paramsInheritanceStrategy` now defaults to `"always"` instead of `"emptyOnly"`. This means route parameters are inherited from all parent routes. To restore the previous behavior, explicitly set `paramsInheritanceStrategy: "emptyOnly"` in your router configuration.
    action:
      '이제 `paramsInheritanceStrategy`의 기본값은 `"emptyOnly"` 대신 `"always"`입니다. 이는 라우팅 규칙 매개변수가 모든 상위 라우팅 규칙에서 상속됨을 의미합니다. 이전 동작으로 되돌리려면 라우터 설정에 `paramsInheritanceStrategy: "emptyOnly"`를 명시적으로 설정하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-can-match-current-snapshot-required',
    // Original: The `currentSnapshot` parameter in `CanMatchFn` and the `canMatch` method of the `CanMatch` interface is now required. Update any class implementations of `CanMatch` to include this required third argument.
    action:
      '이제 `CanMatchFn`과 `CanMatch` 인터페이스의 `canMatch` 메서드에서 `currentSnapshot` 매개변수가 필수입니다. `CanMatch`를 구현하는 모든 클래스를 수정하여 이 필수 세 번째 인수를 포함하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-hammer-js-removed',
    // Original: Hammer.js integration has been removed from Angular platform-browser. If you need touch gesture support, implement your own gesture detection or use an alternative library.
    action:
      'Angular platform-browser에서 Hammer.js 통합이 제거되었습니다. 터치 제스처 지원이 필요하다면 직접 제스처 감지를 구현하거나 다른 라이브러리를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-app-ref-bootstrap-typing',
    // Original: The second argument of `appRef.bootstrap()` no longer accepts `any` type. Ensure the element you pass is not nullable and matches the expected type.
    action:
      '`appRef.bootstrap()`의 두 번째 인수는 더 이상 `any` 타입을 허용하지 않습니다. 전달하는 엘리먼트가 null 또는 undefined일 수 없으며 예상되는 타입과 일치하는지 확인하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-platform-browser-styles-removal',
    // Original: Unused styles are now automatically removed when their associated `host` is dropped. Be aware that other DOM on the page may be affected if those styles are used by elements outside of Angular or if not using `ViewEncapsulation.Emulated`.
    action:
      '이제 연결된 `host`가 제거되면 사용하지 않는 스타일도 자동으로 제거됩니다. 해당 스타일을 Angular 외부의 엘리먼트에서 사용하거나 `ViewEncapsulation.Emulated`를 사용하지 않는 경우, 페이지의 다른 DOM에 영향을 줄 수 있다는 점에 유의하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-title-strategy-return-type',
    // Original: The return type for `TitleStrategy.getResolvedTitleForRoute` has changed from `any` to a stricter type (e.g., `string | undefined`). Update your custom `TitleStrategy` implementations to match the new signature.
    action:
      '`TitleStrategy.getResolvedTitleForRoute`의 반환 타입이 `any`에서 더 엄격한 타입(예: `string | undefined`)으로 변경되었습니다. 커스텀 `TitleStrategy` 구현을 새 시그니처에 맞게 수정하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    step: '22.0.0-incremental-hydration-default',
    // Original: Incremental hydration is now the default behavior for applications using Server-Side Rendering (SSR). Review your application if you relied on the previous non-incremental hydration behavior. You can use `withNoIncrementalHydration()` to restore the previous behavior if needed.
    action:
      '이제 서버 측 렌더링(SSR)을 사용하는 애플리케이션에서는 점진적 하이드레이션이 기본 동작입니다. 이전의 비점진적 하이드레이션 동작에 의존하고 있었다면 애플리케이션을 검토하세요. 필요한 경우 `withNoIncrementalHydration()`을 사용하여 이전 동작으로 되돌릴 수 있습니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-full-template-type-check-removed',
    // Original: The `fullTemplateTypeCheck` compiler option has been removed. Use `strictTemplates` instead to enable strict template type checking in your `tsconfig.json`.
    action:
      '`fullTemplateTypeCheck` 컴파일러 옵션이 제거되었습니다. `tsconfig.json`에서 엄격한 템플릿 타입 검사를 활성화하려면 대신 `strictTemplates`를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    step: '22.0.0-strict-templates-default',
    // Original: The `strictTemplates` compiler option now defaults to `true`. If your project was not using strict template type checking, you may see new compilation errors. Resolve these errors or explicitly set `strictTemplates: false` in your `tsconfig.json` to opt out.
    action:
      '이제 `strictTemplates` 컴파일러 옵션의 기본값은 `true`입니다. 프로젝트에서 엄격한 템플릿 타입 검사를 사용하지 않았다면 새로운 컴파일 오류가 나타날 수 있습니다. 이러한 오류를 해결하거나, 이 기능을 사용하지 않으려면 `tsconfig.json`에 `strictTemplates: false`를 명시적으로 설정하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-webpack-builders-deprecated',
    // Original: Webpack builders (`@angular-devkit/build-angular` and `@angular-devkit/build-webpack`) are now deprecated. Migrate to the `@angular/build` builders (esbuild/application) for your application builds.
    action:
      'Webpack 빌더(`@angular-devkit/build-angular`와 `@angular-devkit/build-webpack`)가 지원 중단되었습니다. 애플리케이션 빌드에 `@angular/build` 빌더(esbuild/application)를 사용하도록 마이그레이션하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-ssr-commonengine-deprecated',
    // Original: `CommonEngine` APIs from `@angular/ssr` are deprecated. Migrate to `AngularNodeAppEngine` or `AngularAppEngine` instead.
    action:
      '`@angular/ssr`의 `CommonEngine` API가 지원 중단되었습니다. 대신 `AngularNodeAppEngine` 또는 `AngularAppEngine`으로 마이그레이션하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-istanbul-lib-instrument-optional',
    // Original: `istanbul-lib-instrument` is now an optional peer dependency. If your project uses Karma with code coverage enabled, ensure `istanbul-lib-instrument` is explicitly installed.
    action:
      '이제 `istanbul-lib-instrument`는 선택적 피어 의존성입니다. 프로젝트에서 코드 커버리지를 활성화한 Karma를 사용한다면 `istanbul-lib-instrument`가 명시적으로 설치되어 있는지 확인하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Basic,
    step: '22.0.0-dev-server-port-env-priority',
    // Original: `ng serve` now gives the highest priority to the `PORT` environment variable. This value overrides any port configured in `angular.json` or provided via the `--port` flag.
    action:
      '이제 `ng serve`는 `PORT` 환경 변수에 가장 높은 우선순위를 부여합니다. 이 값은 `angular.json`에 설정하거나 `--port` 플래그로 제공한 모든 포트 값보다 우선합니다.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Advanced,
    step: '22.0.0-architect-cli-removed',
    // Original: The `@angular-devkit/architect-cli` package is no longer available. Use the `architect` CLI tool from the `@angular-devkit/architect` package instead.
    action:
      '`@angular-devkit/architect-cli` 패키지는 더 이상 사용할 수 없습니다. 대신 `@angular-devkit/architect` 패키지의 `architect` CLI 도구를 사용하세요.',
  },
  {
    possibleIn: 2200,
    necessaryAsOf: 2200,
    level: ApplicationComplexity.Medium,
    step: '22.0.0-experimental-test-builders-removed',
    // Original: The experimental `@angular-devkit/build-angular:jest` and `@angular-devkit/build-angular:web-test-runner` test builders have been removed.
    action:
      '실험적 테스트 빌더인 `@angular-devkit/build-angular:jest`와 `@angular-devkit/build-angular:web-test-runner`가 제거되었습니다.',
  },
];
