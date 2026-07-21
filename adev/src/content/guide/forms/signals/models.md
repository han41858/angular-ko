<!--
# Form models
-->

# 폼 모델

<!--
Form models are the foundation of Signal Forms, serving as the single source of truth for your form data. This guide explores how to create form models, update them, and design them for maintainability.

NOTE: Form models are distinct from Angular's `model()` signal used for component two-way binding. A form model is a writable signal that stores form data, while `model()` creates inputs/outputs for parent/child component communication.
-->

폼 모델은 시그널 폼의 기본 요소이며, 폼 데이터 원장을 제공합니다.
이 문서는 폼 모델을 어떻게 만드는지, 값을 어떻게 변경하는지, 유지보수를 편하게 하려면 어떻게 설계해야 하는지 안내합니다.

참고: 폼 모델은 컴포넌트 양방향 바인딩용으로 제공되는 `model()` 시그널과는 다릅니다.
`model()`은 부모/자식 컴포넌트 통신에 필요한 입출력 시그널을 정의하지만, 폼 모델은 폼 데이터를 저장하고 있다가 값도 변경할 수 있는 시그널입니다.

<!--
## What form models solve
-->

## 폼 모델의 역할

<!--
Forms require managing data that changes over time. Without a clear structure, this data can become scattered across component properties, making it difficult to track changes, validate input, or submit data to a server.

Form models solve this by centralizing form data in a single writable signal. When the model updates, the form automatically reflects those changes. When users interact with the form, the model updates accordingly.
-->

폼 데이터는 계속해서 변경됩니다.
그래서 구조를 제대로 잡지 않으면 데이터가 컴포넌트 프로퍼티로 흩어지면서 추적하기 어렵고, 유효성 검사를 하기도 어려우며, 서버로 보낼 데이터를 모으기도 힘들어 집니다.

폼 모델은 폼 데이터를 하나의 시그널로 집중하는 개념입니다.
그리고 폼 모델의 값이 변경되면 자동으로 변경사항을 전파합니다.
사용자가 폼에 데이터를 입력하면, 폼 모델도 자동으로 갱신됩니다.

<!--
## Creating models
-->

## 모델 정의하기

<!--
A form model is a writable signal created with Angular's `signal()` function. The signal holds an object that represents your form's data structure.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  template: `
    <input type="email" [formField]="loginForm.email" />
    <input type="password" [formField]="loginForm.password" />
  `,
})
export class LoginComponent {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
}
```

The [`form()`](api/forms/signals/form) function accepts the model signal and creates a **field tree** - a special object structure that mirrors your model's shape. The field tree is both navigable (access child fields with dot notation like `loginForm.email`) and callable (call a field as a function to access its state).

The `[formField]` directive binds each input element to its corresponding field in the field tree, enabling automatic two-way synchronization between the UI and model.
-->

폼 모델은 Angular가 제공하는 `signal()` 함수로 생성하는 시그널이며, 이 시그널에는 값을 쓸 수 있습니다.
이 시그널은 폼의 데이터 구조를 그대로 저장합니다.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  template: `
    <input type="email" [formField]="loginForm.email" />
    <input type="password" [formField]="loginForm.password" />
  `,
})
export class LoginComponent {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
}
```

[`form()`](api/forms/signals/form) 함수는 모델 시그널을 받아서 **필드 트리(field tree)** 를 생성합니다.
필드 트리는 폼 모델을 반영하는 객체입니다.
필드 트리는 `loginForm.email`과 같이 객체 참조 방식으로 직접 접근할 수 있으며, 함수처럼 실행하면 필드의 상태에 접근할 수 있습니다.

`[formField]` 디렉티브는 입력 필드 엘리먼트와 필드 트리의 필드, 즉 UI와 폼 모델을 동기 방식으로 양방향 연결합니다.

<!--
### Supported model structures
-->

### 지원 타입

<!--
Signal Forms builds the field tree by walking your model. The objects and arrays it walks through (the **structural layer**) must be plain JavaScript objects and arrays. The values at the **leaves** (positions with no nested fields) are usually primitives (strings, numbers, booleans) or `null`. Native `date`, `month`, `time`, and `week` inputs also accept `Date`, and custom controls can accept any value type they understand.

```ts {prefer, header: 'Plain structure'}
interface UserFormModel {
  name: string;
  birthday: Date | null;
  preferences: {
    theme: string;
    notifications: boolean;
  };
  tags: string[];
}

const userModel = signal<UserFormModel>({
  name: '',
  birthday: null,
  preferences: {
    theme: 'dark',
    notifications: true,
  },
  tags: [],
});
```

IMPORTANT: Class instances, `Map`, and `Set` are **not supported in the structural layer**, even though TypeScript will accept them. Signal Forms does not validate the model shape at runtime, so the framework accepts these values without throwing, then produces incorrect behavior in different ways depending on shape:

- **Class instances** lose their prototype on the first write because Signal Forms shallow-copies parent objects on update. Methods, getters, and `instanceof` checks are gone afterward.
- **Non-extensible or frozen objects inside arrays** throw when Signal Forms assigns a tracking symbol to preserve item identity across reorders.
- **`Map` and `Set`** produce empty field trees, because Signal Forms enumerates children with `Object.keys`.

If your application uses classes for domain modeling, translate to plain objects at the form boundary. See [Translating between form model and domain model](guide/forms/signals/model-design#translating-between-form-model-and-domain-model).
-->

시그널 폼은 폼 모델을 기반으로 필드 트리를 구성합니다.
그래서 필드 트리를 구성하는 객체와 배열은 모두 JavaScript 객체나 배열이어야 합니다.
그리고 중첩된 필드가 아니라면 보통 `string`, `number`, `boolean`, `null` 등 기본 자료형으로 구성합니다.
`Date` 타입도 지원하며, 커스텀 컨트롤이라면 어떠한 타입도 가능합니다.

```ts {prefer, header: '기본 구조'}
interface UserFormModel {
  name: string;
  birthday: Date | null;
  preferences: {
    theme: string;
    notifications: boolean;
  };
  tags: string[];
}

const userModel = signal<UserFormModel>({
  name: '',
  birthday: null,
  preferences: {
    theme: 'dark',
    notifications: true,
  },
  tags: [],
});
```

중요: 클래스 인스턴스나 `Map`, `Set`은 TypeScript 차원에서 지원하지만 폼 모델에는 사용할 수 없습니다.
시그널 폼은 실행 시점에 이런 타입을 구분할 수 없기 때문에, 이런 타입이 사용되면 에러가 발생합니다:

- **클래스 인스턴스** 는 프로토 타입을 놓치고 값이 변경될 때 얕은 복사를 합니다. 클래스 메서드나 게터는 사라지며, `instanceof` 검사는 실패합니다.
- **배열 안에 변경할 수 없는 객체** 가 사용되면 시그널 폼을 재정렬 할 때 항목을 제대로 추적할 수 없습니다.
- **`Map`, `Set`** 를 사용하면 빈 필드 트리가 생성됩니다. 시그널 폼은 자식 객체를 `Object.keys`로 순회합니다.

애플리케이션에서 특정 도메인 클래스를 사용하는 경우라면, 폼으로 전달하기 전에 일반 객체로 변환하세요.
[폼 모델과 도메인 모델 변환](guide/forms/signals/model-design#translating-between-form-model-and-domain-model) 문서를 참고하세요.

<!--
### Using TypeScript types
-->

### TypeScript 타입 활용하기

<!--
While TypeScript infers types from object literals, defining explicit types improves code quality and provides better IntelliSense support.

```ts
interface LoginData {
  email: string;
  password: string;
}

export class LoginComponent {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
}
```

With explicit types, the field tree provides full type safety. Accessing `loginForm.email` is typed as `FieldTree<string>`, and attempting to access a non-existent property results in a compile-time error.

```ts
// TypeScript knows this is FieldTree<string>
const emailField = loginForm.email;

// TypeScript error: Property 'username' does not exist
const usernameField = loginForm.username;
```
-->

TypeScript는 객체 타입을 추론하기 때문에, IDE 지원과 코드 품질 향상을 위해 타입을 명확하게 정의해야 합니다.

```ts
interface LoginData {
  email: string;
  password: string;
}

export class LoginComponent {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
}
```

객체 타입을 명확하게 지정하면 필드 트리도 타입이 정확하게 지정됩니다.
`loginForm.email`은 `FieldTree<string>` 타입이 되며, 존재하지 않는 프로퍼티에 접근하면 컴파일 에러가 발생합니다.

```ts
// TypeScript는 FieldTree<string> 타입이라는 것을 알고 있습니다.
const emailField = loginForm.email;

// TypeScript 에러: 'username' 프로퍼티는 존재하지 않습니다.
const usernameField = loginForm.username;
```

<!--
### Initializing all fields
-->

### 필드 초기화

<!--
Form models should provide initial values for all fields you want to include in the field tree.

```ts {prefer}
// Good: All fields initialized
const userModel = signal({
  name: '',
  email: '',
  age: 0,
});
```

```ts {avoid}
// Avoid: Missing initial value
const userModel = signal({
  name: '',
  email: '',
  // age field is not defined - cannot access userForm.age
});
```

For optional fields, explicitly set them to an empty value or `null`:

```ts
interface UserData {
  name: string;
  email: string;
  phoneNumber: string | null;
}

const userModel = signal<UserData>({
  name: '',
  email: '',
  phoneNumber: null,
});
```

HELPFUL: Native text controls like `<input type=text>` and `<textarea>` don't support `null`, use `''` to represent an empty value.

Fields set to `undefined` are excluded from the field tree. A model with `{value: undefined}` behaves identically to `{}` - accessing the field returns `undefined` rather than a `FieldTree`.
-->

폼 모델을 초기화할 때는 모든 필드 트리에 기본값을 지정해야 합니다.

```ts {prefer}
// 모범사례: 모든 필드를 초기화합니다.
const userModel = signal({
  name: '',
  email: '',
  age: 0,
});
```

```ts {avoid}
// 에러: 기본값이 빠졌습니다.
const userModel = signal({
  name: '',
  email: '',
  // age 필드의 초기값이 지정되지 않았습니다.
});
```

옵션 필드라면 빈값이나 `null` 값을 지정하면 됩니다:

```ts
interface UserData {
  name: string;
  email: string;
  phoneNumber: string | null;
}

const userModel = signal<UserData>({
  name: '',
  email: '',
  phoneNumber: null,
});
```

참고: `<input type=text>`나 `<textarea>`는 `null` 값을 지원하지 않습니다. 빈 값으로 `''`을 사용하세요.

필드 기본값으로 `undefined`를 지정하면 해당 필드는 필드 트리에서 제외됩니다.
그래서 `{value: undefined}`라는 모델을 사용하면 `{}`와 동일한 필드 트리가 구성되기 때문에, 의도한 프로퍼티에 접근해도 `FieldTree` 대신 `undefined`를 반환합니다.

<!--
## Reading model values
-->

## 폼 모델 값 읽기

<!--
You can access form values in two ways: directly from the model signal, or through individual fields. Each approach serves a different purpose.
-->

폼 값은 두 가지 방법으로 접근할 수 있습니다.
모델 시그널로 접근하거나, 개별 필드를 통해 접근하면 ㅗ딥니다.
두 방식의 목적은 다릅니다.

<!--
### Reading from the model
-->

### 폼 모델로 읽기

<!--
Access the model signal when you need the complete form data, such as during form submission:

```ts
async onSubmit() {
  const formData = this.loginModel();
  console.log(formData.email, formData.password);

  // Send to server
  await this.authService.login(formData);
}
```

The model signal returns the entire data object, making it ideal for operations that work with the complete form state.
-->

폼 데이터 전체를 확인하려면 모델 시그널에 접근하면 됩니다:

```ts
async onSubmit() {
  const formData = this.loginModel();
  console.log(formData.email, formData.password);

  // 서버로 보냅니다.
  await this.authService.login(formData);
}
```

모델 시그널은 데이터 객체 전체를 반환하기 때문에, 폼 데이터 전체를 다룰 때 유용합니다.

<!--
### Reading from field state
-->

### 폼 필드로 읽기

<!--
Each field in the field tree is a function. Calling a field returns a `FieldState` object containing reactive signals for the field's value, validation status, and interaction state.

Access field state when working with individual fields in templates or reactive computations:

```angular-ts
@Component({
  template: `
    <p>Current email: {{ loginForm.email().value() }}</p>
    <p>Password length: {{ passwordLength() }}</p>
  `,
})
export class LoginComponent {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);

  passwordLength = computed(() => {
    return this.loginForm.password().value().length;
  });
}
```

Field state provides reactive signals for each field's value, making it suitable for displaying field-specific information or creating derived state.

TIP: Field state includes many more signals beyond `value()`, such as validation state (e.g., valid, invalid, errors), interaction tracking (e.g., touched, dirty), and visibility (e.g., hidden, disabled).
-->

필드 트리의 개별 필드는 함수입니다.
그래서 실행하면 `FieldState` 객체를 반환하는데, 이 필드에는 필드 값, 유효성 상태, 사용자의 동작 상태가 시그널로 전달됩니다.

템플릿에서 개별 필드에 접근하거나, 필드값 변화에 반응형으로 동작할 때는 개별 필드를 활용하는 것이 좋습니다:

```angular-ts
@Component({
  template: `
    <p>Current email: {{ loginForm.email().value() }}</p>
    <p>Password length: {{ passwordLength() }}</p>
  `,
})
export class LoginComponent {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);

  passwordLength = computed(() => {
    return this.loginForm.password().value().length;
  });
}
```

필드 상태 객체는 개별 필드의 값을 시그널로 전달하기 때문에, 필드별 정보를 표시하거나 다른 시그널로 연동할 때 활용하면 좋습니다.

참고: 필드 상태 객체는 `value()` 외에도 `valid`, `invalid`, `errors`, `touched`, `dirty`, `hidden`, `disabled` 등 다양한 상태를 담고 있습니다.

<!-- TODO: UNCOMMENT BELOW WHEN GUIDE IS AVAILABLE -->
<!-- See the [Field State Management guide](guide/forms/signals/field-state-management) for complete coverage. -->

<!--
## Updating form models programmatically
-->

## 로직으로 폼 모델 값 변경하기

<!--
### Replacing form models with `set()`
-->

### 전체 변경하기: `set()`

<!--
Use `set()` on the form model to replace the entire value:

```ts
loadUserData() {
  this.userModel.set({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30,
  });
}

resetForm() {
  this.userModel.set({
    name: '',
    email: '',
    age: 0,
  });
}
```

This approach works well when loading data from an API or resetting the entire form.
-->

`set()`을 사용하면 폼 모델 전체 값을 한 번에 변경할 수 있습니다:

```ts
loadUserData() {
  this.userModel.set({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30,
  });
}

resetForm() {
  this.userModel.set({
    name: '',
    email: '',
    age: 0,
  });
}
```

이 방식은 API로 초기 데이터를 불러 오거나 전체 폼을 재설정할 때 유용합니다.

<!--
### Update a single field directly with `set()` or `update()`
-->

### 개별 필드 값 변경하기: `set()`, `update()`

<!--
Use `set()` on individual field values to directly update the field state:

```ts
clearEmail() {
  this.userForm.email().value.set('');
}

incrementAge() {
  this.userForm.age().value.update(currentAge => currentAge + 1);
}
```

These are also known as "field-level updates." They automatically propagate to the model signal and keep both in sync.
-->

개별 필드에 `set()`을 사용하면 해당 필드 값을 변경할 수 있습니다:

```ts
clearEmail() {
  this.userForm.email().value.set('');
}

incrementAge() {
  this.userForm.age().value.update(currentAge => currentAge + 1);
}
```

이 방식을 "필드 계층의 값 변경" 이라고 합니다.
이렇게 값을 변경하면 폼 모델에도 변경된 값이 반영됩니다.

<!--
### Example: Loading data from an API
-->

### 예제: API로 데이터 불러오기

<!--
A common pattern involves fetching data and populating the model:

```ts
export class UserProfileComponent {
  userModel = signal({
    name: '',
    email: '',
    bio: '',
  });

  userForm = form(this.userModel);
  private userService = inject(UserService);

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userData = await this.userService.getUserProfile();
    this.userModel.set(userData);
  }
}
```

The form fields automatically update when the model changes, displaying the fetched data without additional code.
-->

데이터를 불러와서 폼 모델에 반영하는 일반적인 로직은 이렇습니다:

```ts
export class UserProfileComponent {
  userModel = signal({
    name: '',
    email: '',
    bio: '',
  });

  userForm = form(this.userModel);
  private userService = inject(UserService);

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userData = await this.userService.getUserProfile();
    this.userModel.set(userData);
  }
}
```

폼 모델 값이 변경되면 별도 로직 없어도 폼 필드 값이 자동으로 갱신됩니다.

<!--
## Two-way data binding
-->

## 양방향 바인딩

<!--
The `[formField]` directive creates automatic two-way synchronization between the model, form state, and UI.
-->

`[formField]` 디렉티브를 사용하면 폼 모델과 폼 상태, 화면이 모두 양방향으로 연결됩니다.

<!--
### How data flows
-->

### 데이터 흐름

<!--
Changes flow bidirectionally:

**User input → Model:**

1. User types in an input element
2. The `[formField]` directive detects the change
3. Field state updates
4. Model signal updates

**Programmatic update → UI:**

1. Code updates the model with `set()` or `update()`
2. Model signal notifies subscribers
3. Field state updates
4. The `[formField]` directive updates the input element

This synchronization happens automatically. You don't write subscriptions or event handlers to keep the model and UI in sync.
-->

변경사항은 양방향으로 전파됩니다:

**사용자 입력 → 폼 모델:**

1. 사용자가 입력 엘리먼트에 글자를 입력합니다.
2. `[formField]` 디렉티브가 변경사항을 감지합니다.
3. 필드 상태가 갱신됩니다.
4. 모델 시그널이 갱신됩니다.

**로직으로 폼 모델 변경 → 화면:**

1. `set()`, `update()`와 같은 코드로 폼 모델 값을 변경합니다.
2. 모델 시그널이 구독자들에게 값을 전파합니다.
3. 폼 필드 상태가 갱신됩니다.
4. `[formField]` 디렉티브가 입력 엘리번트의 값을 변경합니다.

이 동기화 동작은 자동으로 이루어집니다.
폼 모델과 화면을 같은 상태로 유지하기 위해 별도 구독 코드나 이벤트 핸들러를 구현할 필요는 없습니다.

<!--
### Example: Both directions
-->

### 예제: 양방향 연결

<!--
```angular-ts
@Component({
  template: `
    <input type="text" [formField]="userForm.name" />
    <button (click)="setName('Bob')">Set Name to Bob</button>
    <p>Current name: {{ userModel().name }}</p>
  `,
})
export class UserComponent {
  userModel = signal({name: ''});
  userForm = form(this.userModel);

  setName(name: string) {
    this.userForm.name().value.set(name);
    // Input automatically displays 'Bob'
  }
}
```

When the user types in the input, `userModel().name` updates. When the button is clicked, the input value changes to "Bob". No manual synchronization code is required.
-->

```angular-ts
@Component({
  template: `
    <input type="text" [formField]="userForm.name" />
    <button (click)="setName('Bob')">Set Name to Bob</button>
    <p>Current name: {{ userModel().name }}</p>
  `,
})
export class UserComponent {
  userModel = signal({name: ''});
  userForm = form(this.userModel);

  setName(name: string) {
    this.userForm.name().value.set(name);
    // 입력 엘리먼트 값은 `Bob` 이 됩니다.
  }
}
```

사용자가 입력 필드에 무언가 입력하면 `userModel().name`이 갱신됩니다.
그리고 버튼을 클릭하면 `setName()` 메서드가 실행되면서 입력 필드의 값이 "Bob"으로 변경됩니다.
수동으로 뭔가 해야 하는 것은 없습니다.

<!--
## Model structure patterns
-->

## 모델 패턴

<!--
Form models can be flat objects or contain nested objects and arrays. The structure you choose affects how you access fields and organize validation.
-->

폼 모델 구조는 일반적인 객체나 배열이 모두 가능합니다.
필드에 어떻게 접근할 지, 유효성 검사를 어떻게 구조화 할 지에 따라 폼 모델 구조를 정하면 됩니다.

<!--
### Flat vs nested models
-->

### 평평한 모델 vs. 중첩된 모델

<!--
Flat form models keep all fields at the top level:

```ts
// Flat structure
const userModel = signal({
  name: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zip: '',
});
```

Nested models group related fields:

```ts
// Nested structure
const userModel = signal({
  name: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
});
```

**Use flat structures when:**

- Fields don't have clear conceptual groupings
- You want simpler field access (`userForm.city` vs `userForm.address.city`)
- Validation rules span multiple potential groups

**Use nested structures when:**

- Fields form a clear conceptual group (like an address)
- The grouped data matches your API structure
- You want to validate the group as a unit
-->

평평한 폼 모델은 모든 필드를 한 계층으로 구성하는 것을 의미합니다:

```ts
// 평평한 구조
const userModel = signal({
  name: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zip: '',
});
```

중첩된 폼 모델은 연관된 필드를 그룹으로 묶어서 구성하는 것을 의미합니다:

```ts
// 중첩된 구조
const userModel = signal({
  name: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
});
```

**평평한 구조를 사용하는 경우:**

- 필드간 연관이 없을 때
- 필드 접근을 단순하게 할 때 (`userForm.city` vs `userForm.address.city`)
- 유효성 검사가 여러 그룹으로 묶일 때

**중첩된 구조를 사용하는 경우:**

- 주소와 같이 연관된 필드가 있을 때
- API 구조와 폼 모델을 일치시킬 때
- 유효성 검사하는 그룹이 정해져있는 경우

<!--
### Working with nested objects
-->

### 중첩된 객체로 작업하기

<!--
You can access nested fields by following the object path:

```ts
const userModel = signal({
  profile: {
    firstName: '',
    lastName: '',
  },
  settings: {
    theme: 'light',
    notifications: true,
  },
});

const userForm = form(userModel);

// Access nested fields
userForm.profile.firstName; // FieldTree<string>
userForm.settings.theme; // FieldTree<string>
```

In templates, you bind nested fields the same way as top-level fields:

```angular-ts
@Component({
  template: `
    <input [formField]="userForm.profile.firstName" />
    <input [formField]="userForm.profile.lastName" />

    <select [formField]="userForm.settings.theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  `,
})
```
-->

중첩된 폼 모델은 객체 참조 방식으로 접근할 수 있습니다:

```ts
const userModel = signal({
  profile: {
    firstName: '',
    lastName: '',
  },
  settings: {
    theme: 'light',
    notifications: true,
  },
});

const userForm = form(userModel);

// 중첨된 폼 모델에 접근하기
userForm.profile.firstName; // FieldTree<string>
userForm.settings.theme; // FieldTree<string>
```

템플릿에서도 객체를 바인딩하듯이 사용하면 됩니다:

```angular-ts
@Component({
  template: `
    <input [formField]="userForm.profile.firstName" />
    <input [formField]="userForm.profile.lastName" />

    <select [formField]="userForm.settings.theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  `,
})
```

<!--
### Working with arrays
-->

### 배열로 작업하기

<!--
Models can include arrays for collections of items:

```ts
const orderModel = signal({
  customerName: '',
  items: [{product: '', quantity: 0, price: 0}],
});

const orderForm = form(orderModel);

// Access array items by index
orderForm.items[0].product; // FieldTree<string>
orderForm.items[0].quantity; // FieldTree<number>
```

Array items containing objects automatically receive tracking identities, which helps maintain field state even when items change position in the array. This ensures validation state and user interactions persist correctly when arrays are reordered.
-->

폼 모델은 배열로 구성될 수도 있습니다:

```ts
const orderModel = signal({
  customerName: '',
  items: [{product: '', quantity: 0, price: 0}],
});

const orderForm = form(orderModel);

// 인덱스로 배열에 접근하기
orderForm.items[0].product; // FieldTree<string>
orderForm.items[0].quantity; // FieldTree<number>
```

객체의 각 항목은 자동으로 고유값을 갖고 추적하기 때문에, 배열 안에서 위치가 변경되는 것도 감지할 수 있습니다.
그래서 배열의 순서가 변경되더라도 유효성 검사 상태와 사용자의 상호작용은 문제없이 연결됩니다.

<!-- TBD: For dynamic arrays and complex array operations, see the [Working with arrays guide](guide/forms/signals/arrays). -->

<!--
## Next steps
-->

## 다음 단계

<!--
This guide covered creating models and updating values. Related guides explore other aspects of Signal Forms:

<!- TODO: UNCOMMENT WHEN THE GUIDES ARE AVAILABLE ->
<docs-pill-row>
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/custom-controls" title="Custom controls" />
  <!- <docs-pill href="guide/forms/signals/arrays" title="Working with Arrays" /> ->
</docs-pill-row>
-->

이 문서는 폼 모델을 정의하고 값을 변경하는 방법을 다뤘습니다.
시그널 폼을 더 알아보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/custom-controls" title="커스텀 폼 컨트롤" />
</docs-pill-row>
