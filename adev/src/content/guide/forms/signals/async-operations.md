<!--
# Async operations
-->

# 비동기 동작

<!--
Some validation requires data from external sources like backend APIs or third-party services. Signal Forms provides two functions for asynchronous validation: `validateHttp()` for HTTP-based validation and `validateAsync()` for custom resource-based validation.
-->

유효성 검사 중에는 백엔드 API나 서드 파티 서비스로 데이터가 적합한지 검사해야 하는 경우가 있습니다.
시그널 폼은 이런 경우를 위해 비동기 유효성 검사를 2가지 방법으로 지원합니다.
HTTP 기반으로 유효성 검사를 해야 하는 경우는 `validateHttp()`를 사용하고, 커스텀 리소스로 유효성 검사를 해야 하는 경우는 `validateAsync()`를 사용하면 됩니다.

<!--
## When to use async validation
-->

<a id="when-to-use-async-validation"></a>

## 비동기 유효성 검사는 언제 사용하나요

<!--
Use async validation when your validation logic requires external data. Some common examples include:

- **Uniqueness checks** - Verify usernames or emails don't already exist
- **Database lookups** - Check values against server-side data
- **External API validation** - Validate addresses, tax IDs, or other data with third-party services
- **Server-side business rules** - Apply validation rules that only the server can verify

Don't use async validation for checks you can perform synchronously on the client. Use synchronous validation rules like `pattern()`, `email()`, or `validate()` for format validation and static rules.
-->

비동기 유효성 검사는 유효성 검사에 외부 데이터가 필요할 때 사용합니다.
보통은 이런 경우입니다:

- **중복 검사** - 사용자 이름이나 이메일이 사용 중인지 확인할 때
- **DB 탐색** - 서버 데이터를 확인해야 할 때
- **외부 API 유효성 검사** - 주소, 주민번호 등 서드 파티 서비스를 활용해서 데이터를 확인해야 할 때
- **서버의 비즈니스 규칙을 확인할 때** - 서버에서만 실행할 수 있는 유효성 검사가 필요할 때

클라이언트에서 동기 방식으로 실행할 수 있는 유효성 검사에 비동기 유효성 검사를 적용하지 마세요.
`pattern()`, `email()`, `validate()`와 같이 형식을 검사하거나 정적인 규칙을 확인하는 경우는 동기 유효성 검사를 사용하는 것이 맞습니다.

<!--
## How async validation works
-->

<a id="how-async-validation-works"></a>

## 비동기 유효성 검사는 어떻게 동작하나요

<!--
Async validation runs only after all synchronous validation passes. While the validation executes, the field's `pending()` signal returns `true`. The validation can target errors to specific fields, and pending requests cancel automatically when field values change.

Here's an example checking username availability:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username:
        <input [formField]="registrationForm.username" />
      </label>

      @if (registrationForm.username().pending()) {
        <span class="checking">Checking availability...</span>
      }
      @if (registrationForm.username().invalid()) {
        @for (error of registrationForm.username().errors(); track $index) {
          <span class="error">{{ error.message }}</span>
        }
      }
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        return username ? `/api/users/check?username=${username}` : undefined;
      },
      onSuccess: (response: {available: boolean}) => {
        return response.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username is already taken',
            };
      },
      onError: (error) => {
        console.error('Validation request failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username availability',
        };
      },
    });
  });
}
```

The validation flow works like this:

1. User types a value
2. Synchronous validation rules run first
3. If synchronous validation fails, async validation doesn't run
4. If synchronous validation passes, async validation starts and `pending()` becomes `true`
5. The request completes and `pending()` becomes `false`
6. Errors update based on the response
-->

비동기 유효성 검사는 동기 유효성 검사를 모두 통과한 후에 실행됩니다.
그리고 비동기 검사가 실행 중일 때는 `pending()` 시그널이 `true`를 반환합니다.
유효성 검사 결과를 활용하면 특정 필드에 오류가 발생했다는 것을 표시할 수 있으며, 필드 값이 변경되면 진행 중인 비동기 유효성 검사를 취소할 수도 있습니다.

사용자 이름을 사용할 수 있는지 검사하는 예제 코드를 살펴봅시다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username:
        <input [formField]="registrationForm.username" />
      </label>

      @if (registrationForm.username().pending()) {
        <span class="checking">Checking availability...</span>
      }
      @if (registrationForm.username().invalid()) {
        @for (error of registrationForm.username().errors(); track $index) {
          <span class="error">{{ error.message }}</span>
        }
      }
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        return username ? `/api/users/check?username=${username}` : undefined;
      },
      onSuccess: (response: {available: boolean}) => {
        return response.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username is already taken',
            };
      },
      onError: (error) => {
        console.error('Validation request failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username availability',
        };
      },
    });
  });
}
```

유효성 검사가 진행되는 과정은 이렇습니다:

1. 사용자가 값을 입력합니다.
2. 동기 유효성 검사가 먼저 실행됩니다.
3. 동기 유효성 검사가 실패하면 비동기 유효성 검사는 실행되지 않습니다.
4. 동기 유효성 검사가 성공하면, 비동기 유효성 검사가 실행되며 `pending()` 시그널이 `true`를 반환합니다.
5. 비동기 유효성 검사 요청이 성공하면 `pending()` 시그널이 `false`를 반환합니다.
6. 유효성 검사 응답을 확인해서 오류를 표시합니다.

<!--
## HTTP validation with validateHttp()
-->

<a id="http-validation-with-validatehttp"></a>

## HTTP 유효성 검사: `validateHttp()`

<!--
The `validateHttp()` function provides the most common form of async validation. Use it when you need to validate against a REST API or any HTTP endpoint.
-->

`validateHttp()` 함수는 일반적인 비동기 유효성 검사로 가장 많이 사용됩니다.
REST API나 HTTP 엔드포인트로 유효성 검사를 진행할 때 사용하세요.

<!--
### Request function
-->

<a id="request-function"></a>

### 요청 함수

<!--
The `request` function returns either a URL string or an `HttpResourceRequest` object. Return `undefined` to skip the validation:

```ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  // Cache usernames that passed validation
  private validatedUsernames = new Set<string>();

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        // Skip HTTP request if already validated
        if (this.validatedUsernames.has(username)) return undefined;

        return `/api/users/check?username=${username}`;
      },
      onSuccess: (response: {available: boolean}, {value}) => {
        if (response.available) {
          // Cache successful validations
          this.validatedUsernames.add(value());
          return null;
        }
        return {
          kind: 'usernameTaken',
          message: 'Username is already taken',
        };
      },
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

For POST requests or custom headers, return an `HttpResourceRequest` object:

```ts
request: ({value}) => ({
  url: '/api/validate',
  method: 'POST',
  body: {username: value()},
}) // prettier-ignore
```
-->

`request()` 함수는 URL 문자열이나 `HttpResourceRequest` 객체를 반환합니다.
`undefined`를 반환하면 유효성 검사를 건너뜁니다:

```ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  // 유효성 검사에 통과한 사용자명을 캐싱합니다.
  private validatedUsernames = new Set<string>();

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        // 이미 유효성 검사가 끝난 HTTP 요청은 건너뜁니다.
        if (this.validatedUsernames.has(username)) return undefined;

        return `/api/users/check?username=${username}`;
      },
      onSuccess: (response: {available: boolean}, {value}) => {
        if (response.available) {
          // 유효성 검사에 성공하면 캐시에 저장합니다.
          this.validatedUsernames.add(value());
          return null;
        }
        return {
          kind: 'usernameTaken',
          message: 'Username is already taken',
        };
      },
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

POST 요청이나 커스텀 헤더를 사용해야 한다면 `HttpResourceRequest` 객체를 반환하세요:

```ts
request: ({value}) => ({
  url: '/api/validate',
  method: 'POST',
  body: {username: value()},
}) // prettier-ignore
```

<!--
### Success and error handlers
-->

<a id="success-and-error-handlers"></a>

## 비동기 유효성 검사 성공/실패 처리하기

<!--
The `onSuccess` function receives the HTTP response and returns validation errors or `undefined` for valid values:

```ts
onSuccess: (response: { valid: boolean; message?: string }) => {
  if (response.valid) return undefined;

  return {
    kind: 'invalid',
    message: response.message || 'Validation failed',
  };
} // prettier-ignore
```

Return multiple errors when needed:

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  const errors = [];
  if (response.usernameTaken) {
    errors.push({
      kind: 'usernameTaken',
      message: 'Username taken',
    });
  }
  if (response.profanity) {
    errors.push({
      kind: 'profanity',
      message: 'Username contains inappropriate content',
    });
  }
  return errors.length > 0 ? errors : undefined;
} // prettier-ignore
```

The type for `onSuccess` can be specified either directly in the parameter, or with the `parse` property of `validateHttp`'s `options`

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  // ...
} // prettier-ignore

// or

options: {
  parse: (response) => response as {usernameTaken: boolean; profanity: boolean};
}
onSuccess: (response) => {
  // ...
} // prettier-ignore
```

The `onError` function handles request failures like network errors or HTTP errors:

```ts
onError: (error) => {
  console.error('Validation request failed:', error);
  return {
    kind: 'serverError',
    message: 'Could not verify. Please try again later.',
  };
} // prettier-ignore
```
-->

`onSuccess` 함수는 HTTP 응답을 인자로 받아, 값이 유효하지 않으면 유효성 검사 오류를 반환하고 유효하면 `undefined`를 반환합니다.

```ts
onSuccess: (response: { valid: boolean; message?: string }) => {
  if (response.valid) return undefined;

  return {
    kind: 'invalid',
    message: response.message || 'Validation failed',
  };
} // prettier-ignore
```

오류는 여러 개를 한 번에 반환할 수도 있습니다:

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  const errors = [];
  if (response.usernameTaken) {
    errors.push({
      kind: 'usernameTaken',
      message: 'Username taken',
    });
  }
  if (response.profanity) {
    errors.push({
      kind: 'profanity',
      message: 'Username contains inappropriate content',
    });
  }
  return errors.length > 0 ? errors : undefined;
} // prettier-ignore
```

`onSuccess` 함수의 타입은 인자에서 바로 지정하거나 `validateHttp`의 `options`으로 `parse` 프로퍼티를 활용하면 됩니다.

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  // ...
} // prettier-ignore

// 또는

options: {
  parse: (response) => response as {usernameTaken: boolean; profanity: boolean};
}
onSuccess: (response) => {
  // ...
} // prettier-ignore
```

`onError` 함수는 네트워크 오류나 HTTP 오류를 반환받았을 때 실행됩니다:

```ts
onError: (error) => {
  console.error('Validation request failed:', error);
  return {
    kind: 'serverError',
    message: 'Could not verify. Please try again later.',
  };
} // prettier-ignore
```

<!--
### HTTP options
-->

<a id="http-options"></a>

### HTTP 옵션

<!--
Customize the HTTP request by returning an `HttpResourceRequest` object from the `request` function:

```ts
import {HttpHeaders} from '@angular/common/http';

validateHttp(schemaPath.field, {
  request: ({value}) => ({
    url: `/api/validate?value=${value()}`,
    headers: new HttpHeaders({
      Authorization: 'Bearer token',
    }),
    timeout: 5000,
  }),
  onSuccess: (response: {valid: boolean}) =>
    response.valid
      ? null
      : {
          kind: 'invalid',
          message: 'Invalid value',
        },
  onError: () => ({
    kind: 'requestFailed',
    message: 'Unable to reach server to validate.',
  }),
});
```

TIP: See the [httpResource API documentation](api/common/http/httpResource) for all available options.
-->

`request` 함수에서 `HttpResourceRequest` 객체를 반환하면 HTTP 요청을 커스터마이징할 수 있습니다:

```ts
import {HttpHeaders} from '@angular/common/http';

validateHttp(schemaPath.field, {
  request: ({value}) => ({
    url: `/api/validate?value=${value()}`,
    headers: new HttpHeaders({
      Authorization: 'Bearer token',
    }),
    timeout: 5000,
  }),
  onSuccess: (response: {valid: boolean}) =>
    response.valid
      ? null
      : {
          kind: 'invalid',
          message: 'Invalid value',
        },
  onError: () => ({
    kind: 'requestFailed',
    message: 'Unable to reach server to validate.',
  }),
});
```

팁: 사용할 수 있는 옵션을 확인하려면 [httpResource API 문서](api/common/http/httpResource)를 참고하세요.

<!--
## Custom async validation with validateAsync()
-->

<a id="custom-async-validation-with-validateasync"></a>

## 커스텀 비동기 유효성 검사: `validateAsync()`

<!--
Most applications should use `validateHttp()` for async validation. It handles HTTP requests with minimal configuration and covers the majority of use cases.

`validateAsync()` is a lower-level API that exposes Angular's resource primitive directly. It offers complete control but requires more code and familiarity with Angular's resource API.

Consider `validateAsync()` only when `validateHttp()` can't meet your needs. Some examples include:

- **Non-HTTP validation** - WebSocket connections, IndexedDB lookups, or Web Worker computations
- **Custom caching strategies** - Application-specific caching beyond simple memoization
- **Complex retry logic** - Custom backoff strategies or conditional retries
- **Direct resource access** - When you need the full resource lifecycle
-->

비동기 유효성 검사는 대부분 `validateHttp()`를 사용하면 됩니다.
이 함수는 최소 옵션으로 HTTP 요청을 처리하며, 대부분의 경우에 활용할 수 있습니다.

`validateAsync()`는 하위 계층 API이기 때문에 Angular의 리소스 자원을 그대로 노출합니다.
이 함수를 활용하면 HTTP 요청을 원하는 대로 활용할 수 있지만, Angular 리소스 API에 대해 자세하게 알아야 합니다.

`validateHttp()`로 해결할 수 없다면 `validateAsync()` 활용을 검토하세요.
이런 경우에 활용하면 됩니다:

- **HTTP가 아닌 유효성 검사** - WebSocket 연결이나, IndexedDB 탐색, Web Worker 연산인 경우
- **커스텀 캐싱 정책** - 단순한 메모이제이션이 아니라 애플리케이션에 특화된 캐싱을 해야 하는 경우
- **재시도 로직이 복잡한 경우** - 커스텀 재시도 정책이나 조건부 재시도를 활용하는 경우
- **resource에 직접 접근하는 경우** - resource 라이프사이클에 적극적으로 개입해야 하는 경우

<!--
### Creating a custom validation rule
-->

<a id="creating-a-custom-validation-rule"></a>

### 커스텀 유효성 검사 규칙 만들기

<!--
The `validateAsync()` function requires four properties: `params`, `factory`, `onSuccess`, and `onError`. The `params` function returns the parameters for your resource, while `factory` creates the resource:

```ts
import {Component, inject, signal, resource, Signal} from '@angular/core';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameValidator} from './username-validator';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameValidator = inject(UsernameValidator);
  private cache = new Map<string, {available: boolean}>();

  // Custom resource factory with caching
  createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return resource({
      params: () => usernameSignal(),
      loader: async ({params: username}) => {
        if (!username) return undefined;

        // Check cache first
        const cached = this.cache.get(username);
        if (cached !== undefined) return cached;

        // Use injected service for validation
        const result = await this.usernameValidator.checkAvailability(username);

        // Cache result
        this.cache.set(username, result);
        return result;
      },
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        return username.length >= 3 ? username : undefined!;
      },
      factory: this.createUsernameResource,
      onSuccess: (result) => {
        return result?.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username taken',
            };
      },
      onError: (error) => {
        console.error('Validation failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username',
        };
      },
    });
  });
}
```

The `params` function runs on every value change. Return `undefined` to skip validation. The `factory` function runs once during setup and receives params as a signal. The resource updates automatically when params change.
-->

`validateAsync()` 함수는 `params`, `factory`, `onSuccess`, `onError`로 프로퍼티가 4개 필요합니다.
이때 `params` 함수는 리소스에 전달할 인자를 반환하며, `factory`는 리소스를 생성합니다:

```ts
import {Component, inject, signal, resource, Signal} from '@angular/core';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameValidator} from './username-validator';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameValidator = inject(UsernameValidator);
  private cache = new Map<string, {available: boolean}>();

  // 캐싱을 관리하는 커스텀 리소스 팩토리
  createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return resource({
      params: () => usernameSignal(),
      loader: async ({params: username}) => {
        if (!username) return undefined;

        // 캐싱되었는지 확인합니다
        const cached = this.cache.get(username);
        if (cached !== undefined) return cached;

        // 유효성 검사를 위해 서비스를 의존성으로 주입합니다.
        const result = await this.usernameValidator.checkAvailability(username);

        // 캐싱하고 결과를 반환합니다.
        this.cache.set(username, result);
        return result;
      },
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        return username.length >= 3 ? username : undefined!;
      },
      factory: this.createUsernameResource,
      onSuccess: (result) => {
        return result?.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username taken',
            };
      },
      onError: (error) => {
        console.error('Validation failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username',
        };
      },
    });
  });
}
```

`params` 함수는 값이 변경될 때마다 실행됩니다.
그리고 유효성 검사를 건너뛰려면 `undefined`를 반환하면 됩니다.
`factory` 함수는 초기 설정 단계에 한 번 실행되며 시그널을 인자로 받습니다.
리소스는 `params` 함수가 반환하는 값이 변경될 때마다 자동으로 갱신됩니다.

<!--
### Using Observable-based services
-->

<a id="using-observable-based-services"></a>

<a id="observable-기반-서비스-활용하기"></a>

## 옵저버블 기반 서비스 활용하기

<!--
If your application has existing services that return Observables, use `rxResource` from `@angular/core/rxjs-interop`:

```ts
import {Component, inject, signal, Signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameService} from './username-service';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameService = inject(UsernameService);

  private createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => usernameSignal(),
      stream: ({params: username}) => this.usernameService.checkUsername(username),
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => value(),
      factory: this.createUsernameResource,
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

The `rxResource` function works directly with Observables and handles subscription cleanup automatically when the field value changes.
-->

애플리케이션에서 옵저버블 기반 서비스를 활용하고 있다면 `@angular/core/rxjs-interop` 패키지로 제공되는 `rxResource`를 활용하세요:

```ts
import {Component, inject, signal, Signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameService} from './username-service';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameService = inject(UsernameService);

  private createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => usernameSignal(),
      stream: ({params: username}) => this.usernameService.checkUsername(username),
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => value(),
      factory: this.createUsernameResource,
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

`rxResource` 함수는 옵저버블을 직접 처리합니다.
필드 값이 변경되었을 때 기존에 구독한 옵저버블을 정리하는 기능도 자동으로 합니다.

<!--
## Debouncing
-->

<a id="debouncing"></a>

## 디바운싱(debouncing)

<!--
The `debounce` rule delays when a user's input is committed to the form model. You can think of it as the rule holding back values until the user pauses typing. This is useful when downstream behavior shouldn't react to every keystroke, such as expensive derived computations, validation that flashes errors mid-word, or search filters that reapply on each character.

Add the `debounce` rule inside a schema to delay how a form field's UI changes reach the form model. In its simplest form, `debounce(path, ms)` holds each UI change for the given number of milliseconds before writing it to the model. A new change within that window resets the timer.

The following example applies `debounce` and `validateHttp` to the username field to delay the username availability check in a registration form until the user pauses typing:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, debounce, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <label>
      Username:
      <input [formField]="registrationForm.username" />
    </label>

    @if (registrationForm.username().pending()) {
      <span class="checking">Checking availability...</span>
    }
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (schemaPath) => {
    // Hold UI updates for 300 ms before writing to the model
    debounce(schemaPath.username, 300);

    // Runs against the debounced model value, not every keystroke
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        // Skip the request for blank values
        return username ? `/api/users/check?username=${username}` : undefined;
      },
      onSuccess: (response: {available: boolean}) =>
        response.available ? null : {kind: 'usernameTaken', message: 'Username is already taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username availability',
      }),
    });
  });
}
```

With a 300 ms debounce, the model updates and validates only after the user pauses typing longer than the configured duration. For example, typing "signal forms" in a quick burst fires one validation request instead of twelve.
-->

`debounce`는 사용자가 폼 모델에 입력하는 값을 디바운싱(debouncing)합니다.
디바운싱은 사용자의 값 입력을 일정 시간 동안 기다린 후에 폼 모델에 반영하는 것을 의미합니다.
이 방식은 모든 키 눌림에 반응하지 않기 때문에 연산 자원을 아낄 수 있으며, 값을 입력하는 중에는 오류 메시지를 표시하지 않을 수 있고, 개별 글자마다 반응하지 않을 수 있습니다.

스키마 안에서 `debounce`를 사용하면 폼 필드의 UI 변화를 어떻게 지연시킬지 지정해야 합니다.
가장 간단하게는 `debounce(path, ms)`라고 작성하면 사용자의 입력이 해당 밀리초만큼 지난 후에 모델에 값을 반영합니다.
중간에 값이 변경되는 동안은 타이머가 계속 초기화됩니다.

아래 예제는 `username` 필드에 사용자가 값을 충분히 입력할 수 있도록 `debounce`와 `validateHttp`를 사용한 예제 코드입니다:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, debounce, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <label>
      Username:
      <input [formField]="registrationForm.username" />
    </label>

    @if (registrationForm.username().pending()) {
      <span class="checking">Checking availability...</span>
    }
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (schemaPath) => {
    // 폼 모델에 값을 전달하기까지 300 ms 기다립니다.
    debounce(schemaPath.username, 300);

    // 모든 키 입력에 반응하지 않고 디바운싱을 기다립니다.
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        // 빈 값이 입력되면 요청을 보내지 않습니다.
        return username ? `/api/users/check?username=${username}` : undefined;
      },
      onSuccess: (response: {available: boolean}) =>
        response.available ? null : {kind: 'usernameTaken', message: 'Username is already taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username availability',
      }),
    });
  });
}
```

300ms 라고 디바운싱을 지정하면, 폼 모델은 사용자가 해당 시간만큼 입력이 멈추기를 기다린 후에 유효성 검사를 실행합니다.
예를 들면, "signal forms"라고 빠르게 입력하면 유효성 검사 요청은 12번이 아니라 1번만 실행합니다.

<!--
### Touch flushes the model
-->

<a id="touch-flushes-the-model"></a>

### `touched` 상태면 바로 반영하기

<!--
Regardless of the debounce duration, the framework writes the field's `controlValue()` to the model immediately when the field becomes touched. Native inputs become touched on blur, so a user who finishes typing and tabs away doesn't have to wait for the debounce timer to expire. Custom controls can mark the field as touched in response to any event they choose.

In the typical case, this matters for form submission. When the user clicks a submit button, the focused input blurs, which touches that field and flushes its pending debounce before the submission handler runs.
-->

디바운싱 딜레이와 관계없이, 필드가 `touched` 상태가 되면 프레임워크는 필드의 `controlValue()` 값을 모델에 즉시 전달합니다.
네이티브 입력 필드는 포커스가 이동하면 터치된 것으로 간주되므로, 사용자가 값을 입력하고 탭을 누르면 디바운싱 타이머가 만료되는 것을 기다릴 필요가 없습니다.
커스텀 컨트롤이라면 원하는 이벤트에 응답해서 터치된 것으로 간주할 수 있습니다.

일반적으로는 폼 제출 시에 중요합니다.
사용자가 제출 버튼을 클릭하면 포커스를 가진 입력 필드에서 blur가 발생합니다. 이때 필드가 touched 상태가 되면서 대기 중인 디바운스 값을 모델에 즉시 반영하므로, 제출 핸들러가 실행되기 전에 최신 값이 동기화됩니다.

<!--
### Commit only on blur
-->

<a id="commit-only-on-blur"></a>

### `blur`일 때 반응하기

<!--
Some fields shouldn't update mid-typing at all, and instead should only update after the user has finished entering a value. For example, if you have a search filter that reapplies on every change or a form that triggers expensive derived state, it is often better for the model to wait until the user finishes typing.

In these scenarios, pass `'blur'` instead of a duration to defer all updates until the field becomes touched:

```ts
form(this.registrationModel, (schemaPath) => {
  debounce(schemaPath.username, 'blur');
});
```

With `'blur'`, the model keeps its previous value while the user is typing. Sync and async validation, derived signals, and any reactive rules reading the field all see the previous value until the field becomes touched. This commonly occurs when the user blurs a native input, or when a custom control signals touch on its own.
-->

어떤 필드는 사용자 입력 도중에 반응하지 않고, 입력을 모두 끝낸 후에야 값을 반영해야 하는 경우가 있습니다.
예를 들어 검색 필터라면 사용자가 값을 입력하는 동안 모든 값 입력에 반응하거나 상태 변경을 유발하는 동작은 사용자가 값을 완전히 입력하기 전까지는 제한하는 것이 좋습니다.

이런 경우에는 시간 대신 `'blur'`를 전달하여 필드가 touched 상태가 될 때까지 모든 갱신을 미루면 됩니다:

```ts
form(this.registrationModel, (schemaPath) => {
  debounce(schemaPath.username, 'blur');
});
```

`'blur'` 옵션을 지정하면 사용자가 값을 입력하는 동안 폼 모델은 이전 값을 유지합니다.
그리고 동기, 비동기 유효성 검사와 연관 시그널, 모든 반응형 규칙이 이전 값을 기준으로 동작합니다.
이런 경우는 사용자가 입력 필드에서 포커스를 옮기거나, 커스텀 컨트롤이 자체 터치 시그널을 보낼 때 발생합니다.

<!--
### Custom timing logic
-->

<a id="custom-timing-logic"></a>

### 커스텀 타이밍 로직

<!--
For timing logic that a duration or `'blur'` can't express, pass a `Debouncer` function. The function receives the field context and an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal), and returns a `Promise<void>` that resolves when the model should update:

```ts
import {debounce, type Debouncer} from '@angular/forms/signals';

const shorterWhenLonger: Debouncer<string> = ({value}, abortSignal) => {
  // Shorter queries get a longer delay since the user is likely still typing.
  const ms = value().length < 3 ? 500 : 200;
  return new Promise((resolve) => {
    const timeoutId = setTimeout(resolve, ms);
    // Abort fires when this field is touched or its value changes, so the pending timer is cleared
    abortSignal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
        resolve();
      },
      {once: true},
    );
  });
};

const registrationForm = form(registrationModel, (schemaPath) => {
  debounce(schemaPath.username, shorterWhenLonger);
});
```

The `abortSignal` fires when the field is touched, or when its value changes before the debounce resolves. Resolve the promise on abort so your debouncer releases any pending timers. The framework writes the pending value to the model on touch, and discards it when a newer value arrives. See the [`debounce` API reference](api/forms/signals/debounce) for the full `Debouncer` signature.
-->

딜레이가 필요하거나 `'blur'`로는 해결되지 않으면, `Debouncer` 함수를 사용하면 됩니다.
이 함수는 필드 컨텍스트와 [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)을 인자로 받으며, 모델이 업데이트해야 할 시점에 완료되는 `Promise<void>`를 반환합니다:

```ts
import {debounce, type Debouncer} from '@angular/forms/signals';

const shorterWhenLonger: Debouncer<string> = ({value}, abortSignal) => {
  // 사용자가 입력 중일 가능성이 있기 때문에 쿼리가 짧으면 딜레이를 길게 합니다.
  const ms = value().length < 3 ? 500 : 200;
  return new Promise((resolve) => {
    const timeoutId = setTimeout(resolve, ms);
    // 필드가 터치 상태로 되거나 값이 변경되면, 중단 신호가 발생하여 대기 중인 타이머가 취소됩니다.
    abortSignal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
        resolve();
      },
      {once: true},
    );
  });
};

const registrationForm = form(registrationModel, (schemaPath) => {
  debounce(schemaPath.username, shorterWhenLonger);
});
```

`abortSignal`은 필드가 조작되거나 디바운스가 완료되기 전에 값이 변경되면 발생합니다.
중단 신호가 발생하면 Promise를 완료(resolve) 상태로 만들어서 디바운서가 대기 중인 타이머를 정리할 수 있도록 하세요.
Angular는 필드 조작 시 대기 중인 값을 모델에 반영하고 새로운 값이 들어오면 기존 값을 폐기합니다.
전체 `Debouncer` 구성을 알아보려면 [`debounce` API 참조](api/forms/signals/debounce) 문서를 참고하세요.

<!--
### Debouncing a single async validator
-->

<a id="debouncing-a-single-async-validator"></a>

### 단일 비동기 유효성 검사의 디바운싱

<!--
The `debounce` rule holds back every reaction to the field, from sync validation to derived signals to async validation. However, there are times when you want the opposite: cheap sync validators like `required` or `email` running immediately for instant feedback, while only the expensive async call waits for the user to settle. Both `validateHttp()` and `validateAsync()` accept their own [`debounce` option](api/forms/signals/validateAsync) that throttles just that validator:

```ts
form(this.registrationModel, (schemaPath) => {
  validateHttp(schemaPath.username, {
    // Throttles only this HTTP call
    debounce: 300,
    request: ({value}) => {
      const username = value();
      // Skip the request for blank values
      return username ? `/api/users/check?username=${username}` : undefined;
    },
    onSuccess: (response: {available: boolean}) =>
      response.available ? null : {kind: 'usernameTaken', message: 'Username is already taken'},
    onError: () => ({
      kind: 'serverError',
      message: 'Could not verify username availability',
    }),
  });
});
```

The model still updates on every keystroke, and any other rules attached to the field still react immediately. Only the HTTP request is debounced: each change waits 300 ms of quiet before firing, so a request only goes out once the user has paused typing.

Choose between the two layers based on scope:

| Option                                                        | When to use                                                                                                                         |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `debounce()` rule                                             | Sync validation, derived state, and submission should all wait until the field commits. The whole field shouldn't react mid-typing. |
| `validateHttp({ debounce })` or `validateAsync({ debounce })` | Cheap sync validators should give immediate feedback, but expensive async calls should wait for the user to pause.                  |

Both options accept a duration in milliseconds. Their custom-timing callbacks differ: the form-level rule takes a `Debouncer`, and the validator-level option takes a `DebounceTimer` from `@angular/core`. The two signatures are not interchangeable.
-->

`debounce` 규칙은 동기 유효성 검사, 비동기 유효성 검사, 시그널 반응 등 모든 연쇄 반응을 지연시킵니다.
하지만 그 반대의 경우가 필요한 경우도 있습니다.
`required`나 `email`과 같이 간단한 동기 유효성 검사는 그대로 실행하고, 비용이 들어가는 비동기 함수는 사용자 입력이 끝나고 동작하는 것입니다.
`validateHttp()`와 `validateAsync()`는 모두 유효성 검사를 지연시키기 위해 [`debounce` 옵션](api/forms/signals/validateAsync)을 지원합니다:

```ts
form(this.registrationModel, (schemaPath) => {
  validateHttp(schemaPath.username, {
    // HTTP 요청을 지연시킵니다.
    debounce: 300,
    request: ({value}) => {
      const username = value();
      // 빈 값이면 요청을 생략합니다.
      return username ? `/api/users/check?username=${username}` : undefined;
    },
    onSuccess: (response: {available: boolean}) =>
      response.available ? null : {kind: 'usernameTaken', message: 'Username is already taken'},
    onError: () => ({
      kind: 'serverError',
      message: 'Could not verify username availability',
    }),
  });
});
```

그러면 모델의 값은 매 키입력마다 갱신되지만, 해당 필드에 연결된 다른 규칙들도 즉시 실행됩니다.
HTTP 요청만 디바운싱됩니다.
필드 값이 변경되면 300ms 동안 기다리며, 사용자가 동작을 멈췄을 때 HTTP 요청이 진행됩니다.

두 계층이 동작하는 것을 비교해 보세요.

| 옵션                                                            | 언제 사용하나요                                                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `debounce()` 규칙                                               | 동기 유효성 검사, 상태 연계 반응, 필드 값이 모두 확정되어야 폼 제출이 가능할 때, 입력 중에는 반응하지 않습니다.       |
| `validateHttp({ debounce })` 또는 `validateAsync({ debounce })` | 부하가 적은 간단한 유효성 검사는 즉시 실행합니다. 하지만 연산이 필요한 검사는 사용자가 입력을 멈출 때까지 기다립니다. |

두 옵션 모두 인자를 밀리초 단위로 받습니다.
커스텀 타이밍 콜백은 조금 다른데, 폼 계층의 규칙은 `Debouncer`를 사용하며, 유효성 계층의 옵션은 `@angular/core` 패키지로 제공되는 `DebounceTimer`를 받습니다.
두 방식은 서로 호환되지 않습니다.

<!--
## Composing resources in async validation with a factory
-->

<a id="composing-resources-in-async-validation-with-a-factory"></a>

## 팩토리로 비동기 유효성 검사와 `resource` 조합하기

<!--
The built-in [`debounce` option](api/forms/signals/validateAsync) covers throttling, but `validateAsync()` exposes a deeper composition point: the `factory` function. The factory receives the params as a signal and returns a resource. Between those two points, you're free to compose whatever you need.

In its simplest form, a factory wraps a single resource. A username-availability check can live as a method on the component class, and then be wired into `validateAsync` by reference:

```ts
export class Registration {
  registrationModel = signal({username: ''});
  private usernameValidator = inject(UsernameValidator);

  // Factory function
  checkUsernameAvailable = (username: Signal<string | undefined>) =>
    resource({
      params: () => username(),
      loader: async ({params: name}) => this.usernameValidator.checkAvailability(name),
    });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        // Skip validation for short usernames
        return username.length >= 3 ? username : undefined!;
      },
      debounce: 300,
      // Reference to the factory defined above
      factory: this.checkUsernameAvailable,
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({kind: 'serverError', message: 'Could not verify'}),
    });
  });
}
```

The `params` callback returns `undefined` for short usernames, signaling that validation should skip. With `debounce: 300` applied, the resource waits until the user pauses typing for 300 ms before acting on each change. It then runs the loader for valid usernames and stays idle once the debounced value settles to `undefined`.
-->

Angular가 제공하는 [`debounce` 옵션](api/forms/signals/validateAsync)은 스로틀링으로 사용할 수도 있지만, `validateAsync()`는 더 유용하게 조합할 수 있는 `factory` 함수를 제공합니다.
팩토리 함수는 시그널을 인자로 받고 리소스를 반환합니다.
두 지점 사이에는 필요한 로직을 자유롭게 구현할 수 있습니다.

리소스 하나를 랩핑하는 간단한 폼 하나를 살펴봅시다.
사용자명이 사용 가능한지는 컴포넌트 클래스 메서드로도 검사할 수 있지만 `validateAsync`를 활용하면 이렇게 구현할 수 있습니다:

```ts
export class Registration {
  registrationModel = signal({username: ''});
  private usernameValidator = inject(UsernameValidator);

  // 팩토리 함수
  checkUsernameAvailable = (username: Signal<string | undefined>) =>
    resource({
      params: () => username(),
      loader: async ({params: name}) => this.usernameValidator.checkAvailability(name),
    });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        // 너무 짧은 문자열은 검사하지 않습니다.
        return username.length >= 3 ? username : undefined!;
      },
      debounce: 300,
      // 위에서 선언한 팩토리 함수를 연결합니다.
      factory: this.checkUsernameAvailable,
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({kind: 'serverError', message: 'Could not verify'}),
    });
  });
}
```

`params` 콜백 함수는 사용자명이 짧은 경우 `undefined`를 반환하기 때문에 유효성 검사를 건너뜁니다.
그리고 `debounce: 300`을 사용하면 사용자가 입력을 300ms 멈추기 전까지는 값이 변경된 것을 처리하지 않고 기다립니다.
이후 유효한 사용자명에는 로더를 실행하고, 디바운스된 값이 `undefined`로 확정되면 대기 상태를 유지합니다.

<!--
### Combining debounce with additional logic
-->

<a id="combining-debounce-with-additional-logic"></a>

### 디바운스에 로직 더하기

<!--
When you need logic beyond a plain duration debounce, use a custom factory to combine debouncing with that logic. A common case is caching validated responses. For example, once the server has confirmed a username, you don't need to ask again on subsequent keystrokes that revisit the same value.

```ts
export class Registration {
  registrationModel = signal({username: ''});
  private usernameValidator = inject(UsernameValidator);

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        return username.length >= 3 ? username : undefined;
      },
      factory: (username) => {
        // Core primitive: settles 300 ms after the source stops changing
        const debouncedUsername = debounced(username, 300);
        // Cache lives in the factory's closure and persists for the field's lifetime
        const cache = new Map<string, {available: boolean}>();
        return resource({
          // Read from the debounced signal, not the raw one
          params: () => debouncedUsername.value(),
          loader: async ({params: name}) => {
            const cached = cache.get(name);
            if (cached) return cached;

            const result = await this.usernameValidator.checkAvailability(name);
            cache.set(name, result);
            return result;
          },
        });
      },
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

The `cache` lives in the factory's closure, so it persists for the field's lifetime. Once the user has typed a username the server has already checked, the loader reads from the cache instead of making a new network request.
-->

시간 기반 디바운스보다 복잡한 로직이 필요하다면, 커스텀 팩토리를 조합하면 됩니다.
서버 응답을 캐싱하는 경우에 이 방식을 활용합니다.
예를 들어, 서버가 특정 사용자 이름을 확인했다면, 동일한 값을 다시 입력해도 요청을 보낼 필요가 없습니다.

```ts
export class Registration {
  registrationModel = signal({username: ''});
  private usernameValidator = inject(UsernameValidator);

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        return username.length >= 3 ? username : undefined;
      },
      factory: (username) => {
        // 핵심 디바운스: 값이 변경되기까지 300 ms를 기다립니다.
        const debouncedUsername = debounced(username, 300);
        // 팩토리 클로저에 캐싱하며 해당 필드의 라이프싸이클 동안 유지됩니다.
        const cache = new Map<string, {available: boolean}>();
        return resource({
          // 원본 시그널이 아니라 디바운스된 시그널을 읽습니다.
          params: () => debouncedUsername.value(),
          loader: async ({params: name}) => {
            const cached = cache.get(name);
            if (cached) return cached;

            const result = await this.usernameValidator.checkAvailability(name);
            cache.set(name, result);
            return result;
          },
        });
      },
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

`cache`는 팩토리 클로저 안에 위치하기 때문에, 이 캐시는 필드의 라이프사이클 동안 유지됩니다.
사용자가 사용자명을 입력해서 서버로 한 번 검사하고 나면, 이후에는 새로운 요청을 보내지 않고 로더가 캐시를 확인합니다.

<!--
## Understanding pending state
-->

<a id="understanding-pending-state"></a>

## `pending` 상태 이해하기

<!--
When async validation runs, the field's `pending()` signal returns `true`. During this time:

- `valid()` returns `false`
- `invalid()` returns `false`
- `errors()` returns an empty array
- `submit()` does not wait for it; by default the `action` runs anyway (see [`ignoreValidators`](guide/forms/signals/form-submission#controlling-validation-gating-with-ignorevalidators))

Show the pending state in your template to provide feedback:

```angular-html
<input [formField]="loginForm.username" />

@if (loginForm.username().pending()) {
  <span class="loading">Checking availability...</span>
}

@if (loginForm.username().touched() && loginForm.username().invalid()) {
  @for (error of loginForm.username().errors(); track $index) {
    <span class="error">{{ error.message }}</span>
  }
}
```

Disable form submission while validation is pending:

```angular-html
<button type="submit" [disabled]="loginForm().pending()">
  @if (loginForm().pending()) {
    Validating...
  } @else {
    Submit
  }
</button>
```

TIP: See the [Field State Management guide](guide/forms/signals/field-state-management) for more patterns using `pending()`, `valid()`, and `invalid()` signals.
-->

비동기 유효성 검사가 실행되면, 필드의 `pending()` 시그널은 `true`를 반환합니다.
이때:

- `valid()`는 `false`를 반환합니다.
- `invalid()`는 `false`를 반환합니다.
- `errors()`는 빈 배열을 반환합니다.
- `submit()`는 유효성 검사가 끝날 때까지 기다리지 않습니다. 기본적으로 `action`은 그대로 실행됩니다([`ignoreValidators`](guide/forms/signals/form-submission#controlling-validation-gating-with-ignorevalidators) 참고).

`pending` 상태라면 템플릿에 관련 메시지를 표시하는 방식으로 활용할 수 있습니다:

```angular-html
<input [formField]="loginForm.username" />

@if (loginForm.username().pending()) {
  <span class="loading">Checking availability...</span>
}

@if (loginForm.username().touched() && loginForm.username().invalid()) {
  @for (error of loginForm.username().errors(); track $index) {
    <span class="error">{{ error.message }}</span>
  }
}
```

유효성 검사가 진행 중인 경우는 폼 제출을 막으세요:

```angular-html
<button type="submit" [disabled]="loginForm().pending()">
  @if (loginForm().pending()) {
    Validating...
  } @else {
    Submit
  }
</button>
```

팁: `pending()`, `valid()`, `invalid()` 시그널 활용에 대해 더 알아보려면 [필드 상태 관리](guide/forms/signals/field-state-management)를 참고하세요.

<!--
### Validation execution order
-->

<a id="validation-execution-order"></a>

### 유효성 검사 실행 순서

<!--
Async validation only runs after synchronous validation passes. This prevents unnecessary server requests for invalid input:

```ts
import {form, required, minLength, validateHttp} from '@angular/forms/signals';

form(model, (schemaPath) => {
  // 1. These synchronous validation rules run first
  required(schemaPath.username);
  minLength(schemaPath.username, 3);

  // 2. This async validation rule only runs if synchronous validation passes
  validateHttp(schemaPath.username, {
    request: ({value}) => `/api/check?username=${value()}`,
    onSuccess: (result: {valid: boolean}) =>
      result.valid
        ? null
        : {
            kind: 'usernameTaken',
            message: 'Username taken',
          },
    onError: () => ({
      kind: 'serverError',
      message: 'Validation failed',
    }),
  });
});
```

This execution order improves performance by reducing server load and catching format errors instantly.
-->

비동기 유효성 검사는 동기 유효성 검사를 모두 통과한 이후에만 실행됩니다.
그래서 입력값이 잘못된 경우에는 불필요하게 서버로 요청을 보내지 않을 수 있습니다:

```ts
import {form, required, minLength, validateHttp} from '@angular/forms/signals';

form(model, (schemaPath) => {
  // 1. 동기 유효성 검사 규칙이 먼저 실행됩니다.
  required(schemaPath.username);
  minLength(schemaPath.username, 3);

  // 2. 동기 유효성 검사를 모두 통과하면 비동기 유효성 검사 규칙이 실행됩니다.
  validateHttp(schemaPath.username, {
    request: ({value}) => `/api/check?username=${value()}`,
    onSuccess: (result: {valid: boolean}) =>
      result.valid
        ? null
        : {
            kind: 'usernameTaken',
            message: 'Username taken',
          },
    onError: () => ({
      kind: 'serverError',
      message: 'Validation failed',
    }),
  });
});
```

실행 순서가 이렇다는 것을 활용하면 형식에 맞지 않는 입력값을 즉시 확인하거나 서버의 검사 부하를 줄일 수 있습니다.

<!--
### Request cancellation
-->

<a id="request-cancellation"></a>

### 요청 취소

<!--
When a field value changes, Signal Forms automatically cancels any pending async validation request for that field. This prevents race conditions and ensures validation always reflects the current value. You don't need to implement cancellation logic yourself.
-->

필드 값이 변경되면 시그널 폼은 아직 완료되지 않은 비동기 유효성 검사를 모두 취소합니다.
그렇기 때문에 응답 순서가 뒤바뀌는 일 없이 현재 필드 값으로만 유효성 검사가 동작합니다.
수동으로 로직을 취소할 필요는 없습니다.

<!--
## Best practices
-->

<a id="best-practices"></a>

## 모범사례

<!--
### Combine with synchronous validation
-->

<a id="combine-with-synchronous-validation"></a>

### 동기 유효성 검사와 조합하기

<!--
Always validate format before making async requests. This catches errors instantly and prevents unnecessary server requests:

```ts
import {form, required, email, validateHttp} from '@angular/forms/signals';

form(model, (schemaPath) => {
  // Validate format first
  required(schemaPath.email);
  email(schemaPath.email);

  // Then check availability
  validateHttp(schemaPath.email, {
    request: ({value}) => `/api/emails/check?email=${value()}`,
    onSuccess: (result: {available: boolean}) =>
      result.available
        ? null
        : {
            kind: 'emailInUse',
            message: 'Email already in use',
          },
    onError: () => ({
      kind: 'serverError',
      message: 'Could not verify email',
    }),
  });
});
```
-->

입력값 형식 검사는 언제나 비동기 유효성 검사보다 먼저 실행하세요.
이렇게 하면 오류를 즉시 잡을 수 있고 불필요한 서버 요청을 방지할 수 있습니다:

```ts
import {form, required, email, validateHttp} from '@angular/forms/signals';

form(model, (schemaPath) => {
  // 형식을 먼저 검사합니다.
  required(schemaPath.email);
  email(schemaPath.email);

  // 이후에 사용 가능한지 검사합니다.
  validateHttp(schemaPath.email, {
    request: ({value}) => `/api/emails/check?email=${value()}`,
    onSuccess: (result: {available: boolean}) =>
      result.available
        ? null
        : {
            kind: 'emailInUse',
            message: 'Email already in use',
          },
    onError: () => ({
      kind: 'serverError',
      message: 'Could not verify email',
    }),
  });
});
```

<!--
### Skip validation when appropriate
-->

<a id="skip-validation-when-appropriate"></a>

### 근사값으로 유효성 검사 생략하기

<!--
Return `undefined` from the `request` function to skip validation. Use this to avoid validating empty fields or values that don't meet minimum requirements:

```ts
import {validateHttp} from '@angular/forms/signals';

validateHttp(schemaPath.username, {
  request: ({value}) => {
    const username = value();
    // Skip validation for empty or short usernames
    if (!username || username.length < 3) return undefined;

    return `/api/users/check?username=${username}`;
  },
  onSuccess: (result: {valid: boolean}) =>
    result.valid
      ? null
      : {
          kind: 'usernameTaken',
          message: 'Username taken',
        },
  onError: () => ({
    kind: 'serverError',
    message: 'Validation failed',
  }),
});
```
-->

`request` 함수가 `undefined`를 반환하면 유효성 검사를 생략합니다.
이것을 활용하면 필드 입력값이 비어있거나 최소 길이보다 모자란 경우 유효성 검사를 생략할 수 있습니다:

```ts
import {validateHttp} from '@angular/forms/signals';

validateHttp(schemaPath.username, {
  request: ({value}) => {
    const username = value();
    // 빈 값이나 최소 길이보다 짧으면 유효성 검사를 생략합니다.
    if (!username || username.length < 3) return undefined;

    return `/api/users/check?username=${username}`;
  },
  onSuccess: (result: {valid: boolean}) =>
    result.valid
      ? null
      : {
          kind: 'usernameTaken',
          message: 'Username taken',
        },
  onError: () => ({
    kind: 'serverError',
    message: 'Validation failed',
  }),
});
```

<!--
### Handle errors gracefully
-->

<a id="handle-errors-gracefully"></a>

<a id="에러-처리하기"></a>

### 오류 처리하기

<!--
Provide clear, user-friendly error messages. Log technical details for debugging but show simple messages to users:

```ts
import {validateHttp} from '@angular/forms/signals';

validateHttp(schemaPath.field, {
  request: ({value}) => `/api/validate?field=${value()}`,
  onSuccess: (result: {valid: boolean; message?: string}) => {
    if (result.valid) return null;
    // Use server message when available
    return {
      kind: 'serverError',
      message: result.message || 'Validation failed',
    };
  },
  onError: (error) => {
    // Log for debugging
    console.error('Validation request failed:', error);

    // Show user-friendly message
    return {
      kind: 'serverError',
      message: 'Unable to validate. Please try again later.',
    };
  },
});
```
-->

오류 메시지는 명확하게, 사용자가 이해하기 쉽게 제공하세요.
디버깅을 위한 세부사항은 사용자에게 표시할 필요 없이 로그로 남겨주세요:

```ts
import {validateHttp} from '@angular/forms/signals';

validateHttp(schemaPath.field, {
  request: ({value}) => `/api/validate?field=${value()}`,
  onSuccess: (result: {valid: boolean; message?: string}) => {
    if (result.valid) return null;
    // 서버와 통신할 수 있으면 서버에서 보내는 메시지를 활용합니다.
    return {
      kind: 'serverError',
      message: result.message || 'Validation failed',
    };
  },
  onError: (error) => {
    // 디버깅 로그를 출력합니다.
    console.error('Validation request failed:', error);

    // 사용자가 이해하기 쉬운 메시지를 제공합니다.
    return {
      kind: 'serverError',
      message: 'Unable to validate. Please try again later.',
    };
  },
});
```

<!--
### Show clear feedback
-->

<a id="show-clear-feedback"></a>

### 피드백을 명확하게 제공하세요

<!--
Use the `pending()` signal to show when validation is happening. This helps users understand delays and provides better perceived performance:

```angular-html
@if (field().pending()) {
  <span class="checking">
    <span class="spinner"></span>
    Checking...
  </span>
}
@if (field().valid() && !field().pending()) {
  <span class="success">Available</span>
}
@if (field().invalid()) {
  <span class="error">{{ field().errors()[0]?.message }}</span>
}
```
-->

유효성 검사가 진행 중인 것을 사용자에게 표시하려면 `pending()` 시그널을 활용하면 됩니다.
그러면 사용자는 왜 앱이 느려졌는지 확인할 수 있으며, 체감 성능도 향상됩니다:

```angular-html
@if (field().pending()) {
  <span class="checking">
    <span class="spinner"></span>
    Checking...
  </span>
}
@if (field().valid() && !field().pending()) {
  <span class="success">Available</span>
}
@if (field().invalid()) {
  <span class="error">{{ field().errors()[0]?.message }}</span>
}
```

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
This guide covered async validation with `validateHttp()` and `validateAsync()`. Related guides explore other aspects of Signal Forms:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="Validation"/>
  <docs-pill href="guide/forms/signals/field-state-management" title="Field State Management"/>
</docs-pill-row>

For detailed API documentation, see:

- [`validateHttp()`](api/forms/signals/validateHttp) - HTTP-based async validation
- [`validateAsync()`](api/forms/signals/validateAsync) - Custom resource-based async validation
- [`httpResource()`](api/common/http/httpResource) - Angular's HTTP resource API
- [`resource()`](api/core/resource) - Angular's resource primitive
-->

이 문서에서는 `validateHttp()`와 `validateAsync()`를 활용하는 비동기 유효성 검사를 다뤘습니다.
시그널 폼에 대해 더 알아보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사"/>
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리"/>
</docs-pill-row>

API 문서도 확인해 보세요:

- [`validateHttp()`](api/forms/signals/validateHttp) - HTTP 기반의 비동기 유효성 검사
- [`validateAsync()`](api/forms/signals/validateAsync) - 커스텀 리소스 기반 유효성 검사
- [`httpResource()`](api/common/http/httpResource) - Angular HTTP 리소스 API
- [`resource()`](api/core/resource) - Angular 리소스 타입
