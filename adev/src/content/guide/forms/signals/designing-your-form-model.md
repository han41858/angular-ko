<!--
# Designing your form model
-->

# 폼 모델 설계

<!--
Signal Forms uses a model-driven approach, deriving the form's state and structure directly from the model you provide. Because it serves as the foundation of the entire form, it is important to start with a well-designed form model. This guide explores best practices for designing form models.
-->

시그널 폼은 모델 기반으로 동작하며, 폼의 상태와 구조도 폼 모델에서 직접 참조합니다.
폼 모델은 전체 폼의 기반이 되기 때문에 무엇보다도 폼 모델을 잘 설계하는 것이 중요합니다.
이 문서는 폼 모델 설계의 모범 사례를 안내합니다.

<!--
## Form model vs domain model
-->

## 폼 모델 vs. 도메인 모델

<!--
Forms are used to collect user input. Your application likely has a domain model used to represent this input in a way that's optimized for business logic or storage. However, this is often _different_ than how we want to model the data in our form.

The form model represents the raw user input as it appears in the UI. For instance, in a form you might ask a user to pick a date and a time slot for an appointment as separate input fields, even if your domain model represents it as a single JavaScript `Date` object.

```ts
interface AppointmentFormModel {
  name: string; // Appointment owner's name
  date: Date; // Appointment date (carries only date information, time component is unused)
  time: string; // Selected time as a string
}

interface AppointmentDomainModel {
  name: string; // Appointment owner's name
  time: Date; // Appointment time (carries both date and time information)
}
```

Forms should use a form model tailored to the input experience, rather than simply repurposing the domain model.
-->

폼은 사용자 입력을 수집하는 용도로 사용됩니다.
애플리케이션에는 비즈니스 로직이나 저장에 최적화 된 방식으로 설계된 도메인 모델이 있을 수 있습니다.
하지만 때로는 도메인 모델이 폼의 구조와 다른 경우가 종종 있습니다.

폼 모델은 화면에서 사용자가 입력한 내용 자체를 다룹니다.
예를 들어, 폼 모델에서 사용자가 날짜와 시각을 고르는 입력 필드가 있다고 해도, 도메인 모델에서는 이를 JavaScript `Date` 객체로 간단하게 표현될 수 있습니다.
도메인 모델에서 JavaScript `Date` 객체를

```ts
interface AppointmentFormModel {
  name: string; // 예약자의 이름
  date: Date; // 예약일자 (날짜만 사용하며 시각은 사용하지 않습니다)
  time: string; // 문자열 형식의 시각
}

interface AppointmentDomainModel {
  name: string; // 예얏자의 이름
  time: Date; // 예약시각 (날짜와 시각 정보를 모두 사용합니다)
}
```

폼 모델은 도메인 모델을 그대로 따르기보다, 사용자가 입력하기 편한 구조로 설계하는 것이 좋습니다.

<!--
## Form model best practices
-->

## 모범사례

<!--
### Use specific types
-->

### 정확한 타입을 정의하세요

<!--
Always define interfaces or types for your models as shown in [Using TypeScript types](/guide/forms/signals/models#using-typescript-types). Explicit types provide better IntelliSense, catch errors at compile time, and serve as documentation for what data the form contains.
-->

[TypeScript 타입 사용하기](/guide/forms/signals/models#using-typescript-types)에서 설명한 것처럼 폼 모델은 반드시 TypeScript 인터페이스나 타입을 지정해서 사용하세요.
타입을 명시적으로 정의하면 IDE 지원기능을 확대할 수 있으며, 컴파일 에러를 사전에 검사할 수 있고, 문서처럼 활용할 수도 있습니다.

<!--
### Initialize all fields
-->

### 전체 필드 초기화

<!--
Provide initial values for every field in your model:

```ts {prefer, header: 'All fields initialized'}
const taskModel = signal({
  title: '',
  description: '',
  priority: 'medium',
  completed: false,
});
```

```ts {avoid, header: 'Partial initialization'}
const taskModel = signal({
  title: '',
  // Missing description, priority, completed
});
```

Missing initial values mean those fields won't exist in the field tree, making them inaccessible for form interactions.
-->

폼 모델의 초기값은 이렇게 지정합니다:

```ts {prefer, header: '전체 필드 초기화'}
const taskModel = signal({
  title: '',
  description: '',
  priority: 'medium',
  completed: false,
});
```

```ts {avoid, header: '부분 초기화'}
const taskModel = signal({
  title: '',
  // description, priority, completed 이 없습니다.
});
```

초기값 지정을 빠뜨리면 해당 필드는 필드 트리에서 제외됩니다.

<!--
### Keep models focused
-->

### 모델에 집중하세요

<!--
Each model should represent a single form or a cohesive set of related data:

```ts {prefer, header: 'Focused on a single purpose'}
const loginModel = signal({
  email: '',
  password: '',
});
```

```ts {avoid, header: 'Mixing unrelated concerns'}
const appModel = signal({
  // Login data
  email: '',
  password: '',
  // User preferences
  theme: 'light',
  language: 'en',
  // Shopping cart
  cartItems: [],
});
```

Separate models for different concerns makes forms easier to understand and reuse. Create multiple forms if you're managing distinct sets of data.
-->

폼 모델은 폼 전체를 표현하거나 관련된 정보의 집합을 표현해야 합니다:

```ts {prefer, header: '목적 하나에 집중되어 있습니다'}
const loginModel = signal({
  email: '',
  password: '',
});
```

```ts {avoid, header: '직접 관련없는 정보가 섞여있습니다'}
const appModel = signal({
  // 로그인 정보
  email: '',
  password: '',
  // 환경설정
  theme: 'light',
  language: 'en',
  // 장바구니
  cartItems: [],
});
```

폼 모델은 용도에 따라 분리해야 이해하기 쉽고 재사용하기도 쉽습니다.
다뤄야 하는 데이터 그룹이 많다면 폼을 여러개 만드세요.

<!--
### Consider validation requirements
-->

### 유효성 검사를 고려하세요

<!--
Design models with validation in mind. Group fields that validate together:

```ts {prefer, header: 'Related fields grouped for comparison'}
// Password fields grouped for comparison
interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

This structure makes cross-field validation (like checking if `newPassword` matches `confirmPassword`) more natural.
-->

폼 모델 설계는 유효성 검사를 고려해야 합니다.
유효성 검사를 함께 하는 필드는 같은 그룹으로 묶으세요:

```ts {prefer, header: '관련된 필드는 타입 하나로'}
// 비밀번호와 관련된 필드가 타입 하나로 존재합니다
interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

이렇게 설계하면 `newPassword`와 `confirmPassword`가 같은지 검사하는 것과 같이 필드 교차 검증에 유리합니다.

<!--
### Match data types to UI controls
-->

### 데이터 타입과 UI 요소를 일치시키세요

<!--
Properties on your form model should match the data types expected by your UI controls.

For example, consider a beverage order form with a `size` field (6, 12, or 24 pack) and a `quantity` field. The UI uses a dropdown (`<select>`) for size and a number input (`<input type="number">`) for quantity.

Although the size options look numeric, `<select>` elements work with string values, so `size` should be modeled as a string. An `<input type="number">` on the other hand, does work with numbers, so `quantity` can be modeled as a number.

```ts {prefer, header: 'Appropriate data types for the bound UI controls'}
interface BeverageOrderFormModel {
  size: string; // Bound to: <select> (option values: "6", "12", "24")
  quantity: number; // Bound to: <input type="number">
}
```
-->

폼 모델의 프로퍼티는 UI 컨트롤로 예상되는 데이터 타입이어야 합니다.

예를 들면, `quantity` 필드와 6, 12, 24팩과 같이 `size` 필드로 구성된 음료 주문 양식이 있다고 합시다.
그렇다면 `size` 필드는 드롭다운(`<select>`)으로, 수량은 숫자 입력 필드(`<input type="number"`)인 것이 좋습니다.

`size` 필드가 숫자처럼 보이더라도, `<select>` 엘리먼트는 문자열로 동작하기 때문에 `size` 는 문자열로 모델링해야 합니다.
반면에 `<input type="number">`는 숫자로 동작하기 때문에 `quantity`는 숫자로 모델링할 수 있습니다.

```ts {prefer, header: 'UI 컨트롤과 어울리는 데이터 타입을 사용하세요'}
interface BeverageOrderFormModel {
  size: string; // <select> (option values: "6", "12", "24")와 바인딩 됩니다
  quantity: number; // <input type="number">와 바인딩 됩니다
}
```

<!--
### Avoid `undefined`
-->

### `undefined`는 사용하지 마세요

<!--
A form model must not contain `undefined` values or properties. In Signal Forms the structure of the form is derived from the structure of the model, and `undefined` signifies the _absence of a field_, rather than a field with an empty value. This means you must also avoid optional fields (e.g., `{property?: string}`), as they implicitly allow `undefined`.

To represent a property with an empty value in your form model, use a value that the UI control understands to mean "empty" (e.g. `""` for a `<input type="text">`). If you're designing a custom UI control, `null` often works as a good value to signify "empty".

```ts {prefer, header: 'Appropriate empty values'}
interface UserFormModel {
  name: string; // Bound to <input type="text">
  birthday: Date | null; // Bound to <input type="date">
}

// Initialize our form with empty values.
form(signal({name: '', birthday: null}));
```
-->

폼 모델에는 `undefined` 값이나 속성을 포함하면 안됩니다.
시그널 폼은 폼 모델을 기반으로 동작하기 때문에, `undefined`를 사용하면 빈 값을 의미하는 것이 아니라 _필드가 없음_ 을 의미합니다.
`{property?: string}` 과 같은 생략 가능 항목이라도 `undefined`를 암묵적으로 사용하는 것은 피해야 합니다.

폼 모델에서 빈 값을 표현하려면 UI 컨트롤이 이해할 수 있는 "빈 값"을 사용해야 합니다.
`<input type="text">`라면 `""`를 사용하는 식입니다.
그리고 커스텀 UI 컨트롤을 설계하고 있다면 빈 값으로 `null`을 사용하는 것도 좋습니다.

```ts {prefer, header: '적절한 빈 값을 사용하세요'}
interface UserFormModel {
  name: string; // <input type="text">과 바인딩 됩니다
  birthday: Date | null; // <input type="date">과 바인딩 됩니다
}

// 빈 값으로 폼을 초기화합니다
form(signal({name: '', birthday: null}));
```

<!--
### Avoid models with dynamic structure
-->

### 동적 구조는 피하세요

<!--
A form model has a dynamic structure if it changes shape (if the properties on the object change) based on its value. This happens when the model type allows for values with different shapes, such as a union of object types that have different properties, or a union of an object and a primitive. The following sections examine a few common scenarios where models with a dynamic structure might seem appealing, but ultimately prove problematic.
-->

폼 모델은 객체의 모양이 변하는 경우에 동적 구조가 될 수 있습니다.
이런 경우는 프로퍼티 구성이 다른 유니언 객체 타입을 폼 모델로 다룰 때 해당됩니다.
아래 섹션부터는 동적인 폼 모델 구조가 쓸만해 보이지만, 결국 문제가 될 수 있는 경우를 몇가지 살펴봅시다.

<!--
#### Empty value for a complex object
-->

#### 복잡한 객체에서 빈 값을 사용하는 경우

<!--
We often use forms to ask users to enter brand new data, rather than edit existing data in a system. A good example of this is an account creation form. We might model that using the following form model.

```ts
interface CreateAccountFormModel {
  name: {
    first: string;
    last: string;
  };
  username: string;
}
```

When creating the form we encounter a dilemma, what should the initial value in the model be? It may be tempting to create a `form<CreateAccountFormModel | null>()` since we don't have any input from the user yet.

```ts {avoid, header: 'Using null as empty value for complex object'}
createAccountForm = form<CreateAccountFormModel | null>(signal(/* what goes here, null? */));
```

However, it is important to remember that Signal Forms is _model driven_. If our model is `null` and `null` doesn't have a `name` or `username` property, that means our form won't have those subfields either. Instead what we really want is an instance of `CreateAccountFormModel` with all of its leaf fields set to an empty value.

```ts {prefer, header: 'Same shape value with empty values for properties'}
createAccountForm = form<CreateAccountFormModel>(
  signal({
    name: {
      first: '',
      last: '',
    },
    username: '',
  }),
);
```

Using this representation, all of the subfields we need now exist, and we can bind them using the `[formField]` directive in our template.

```html
First: <input [formField]="createAccountForm.name.first" /> Last:
<input [formField]="createAccountForm.name.last" /> Username:
<input [formField]="createAccountForm.username" />
```
-->

폼은 기존에 있는 데이터를 수정하기도 하지만, 새 데이터를 받을 때 더 많이 사용합니다.
회원가입 폼 모델이라면 이렇게 구성할 수 있을 것입니다.

```ts
interface CreateAccountFormModel {
  name: {
    first: string;
    last: string;
  };
  username: string;
}
```

이런 폼 모델을 구성할 때 고민이 되는 점이 있씁니다.
초기값을 무엇으로 정해야 할까요?
사용자가 아직 아무것도 입력하지 않은 상태를 고려하면 `form<CreateAccountFormModel | null>()`를 사용할 수도 있습니다.

```ts {avoid, header: '복잡한 객체의 빈 값으로 null을 사용하는 경우'}
createAccountForm = form<CreateAccountFormModel | null>(
  signal(/* null이 들어가는 것이 맞을까요? */),
);
```

그런데, 시그널 폼은 _모델 기반_ 으로 동작한다는 것을 명심하세요.
모델이 `null`이라면 `null`에는 `name`이나 `username`과 같은 자식 프로퍼티가 존재하지 않습니다.
그래서 `CreateAccountFormModel`를 유지하려면 이 폼 모델을 사용하고 빈 값으로 문자열 `''`를 사용하는 것이 좋습니다.

```ts {prefer, header: '폼 모델에 초기값으로 빈 값을 지정하는 코드'}
createAccountForm = form<CreateAccountFormModel>(
  signal({
    name: {
      first: '',
      last: '',
    },
    username: '',
  }),
);
```

이렇게 구현하면, `CreateAccountFormModel`의 모든 필드가 존재하기 때문에 템플릿에서 `[formField]` 디렉티브를 사용해서 입력 필드와 바인딩 할 수 있습니다.

```html
First: <input [formField]="createAccountForm.name.first" /> Last:
<input [formField]="createAccountForm.name.last" /> Username:
<input [formField]="createAccountForm.username" />
```

<!--
#### Fields that are conditionally hidden or unavailable
-->

#### 조건에 따라 감춰지거나 비활성화되는 필드

<!--
Forms aren't always linear. You often need to create conditional paths based on previous user input. One example of this is a form where we give the user different payment options. Let's start by imagining what the UI for such a form might look like.

```html
Name: <input type="text" />

<section>
  <h2>Payment Info</h2>
  <input type="radio" /> Credit Card @if (/* credit card selected */) {
  <section>
    Card Number <input type="text" /> Security Code <input type="text" /> Expiration
    <input type="text" />
  </section>
  }
  <input type="radio" /> Bank Account @if (/* bank account selected */) {
  <section>Account Number <input type="text" /> Routing Number <input type="text" /></section>
  }
</section>
```

The best way to handle this is to use a form model with a static structure that includes fields for _all_ potential payment methods. In our schema, we can hide or disable the fields that are not currently available.

```ts {prefer, header: 'Static structure model'}
interface BillPayFormModel {
  name: string;
  method: {
    type: string;
    card: {
      cardNumber: string;
      securityCode: string;
      expiration: string;
    };
    bank: {
      accountNumber: string;
      routingNumber: string;
    };
  };
}

const billPaySchema = schema<BillPayFormModel>((billPay) => {
  // Hide credit card details when user has selected a method other than credit card.
  hidden(billPay.method.card, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'card'});
  // Hide bank account details when user has selected a method other than bank account.
  hidden(billPay.method.bank, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'bank'});
});
```

Using this model, both `card` and `bank` objects are always present in the form's state. When the user switches payment methods, we only update the `type` property. The data they entered into the card fields remains safely stored in the `card` object, ready to be redisplayed if they switch back.

In contrast, a dynamic form model may initially seem like a good fit for this use case. After all, we don't need fields for account and routing number if the user selected "Credit Card". We may be tempted to model this as a discriminated union:

```ts {avoid, header: 'Dynamic structure model'}
interface BillPayFormModel {
  name: string;
  method:
    | {
        type: 'card';
        cardNumber: string;
        securityCode: string;
        expiration: string;
      }
    | {
        type: 'bank';
        accountNumber: string;
        routingNumber: string;
      };
}
```

However, consider what would happen in the following scenario:

1. User fills out their name and credit card information
2. They're about to submit, but at the last moment they notice the convenience fee.
3. They toggle to the bank account option instead, figuring they might as well avoid the fee.
4. As they're about to enter the bank account info, they have second thoughts, they wouldn't want it to wind up in a leak.
5. They toggle back to credit card option, but they notice all the info they just entered is gone!

This illustrates another problem with form models that have a dynamic structure: they can cause data loss. A model like this assumes that once a field becomes hidden, the information in it will never be needed again. It replaces the credit card information with the bank information, and has no way to get the credit card information back.
-->

폼 모델이 언제나 선형으로 구성되는 것은 아닙니다.
사용자가 어떤 값을 입력하느냐에 따라 조건부로 폼이 구성되는 경우도 있습니다.
결제 옵션을 다양하게 선택하는 폼을 생각해 봅시다.
이 폼에 해당되는 화면을 구상해 봅시다.

```html
Name: <input type="text" />

<section>
  <h2>Payment Info</h2>
  <input type="radio" /> Credit Card @if (/* credit card selected */) {
  <section>
    Card Number <input type="text" /> Security Code <input type="text" /> Expiration
    <input type="text" />
  </section>
  }
  <input type="radio" /> Bank Account @if (/* bank account selected */) {
  <section>Account Number <input type="text" /> Routing Number <input type="text" /></section>
  }
</section>
```

가장 좋은 방법은 가능한 결제 수단을 _모두_ 나열해서 폼을 정적으로 구성하는 것입니다.
스키마를 활용하면 특정 필드를 감추거나 비활성화 할 수 있습니다.

```ts {prefer, header: '정적 구조 모델'}
interface BillPayFormModel {
  name: string;
  method: {
    type: string;
    card: {
      cardNumber: string;
      securityCode: string;
      expiration: string;
    };
    bank: {
      accountNumber: string;
      routingNumber: string;
    };
  };
}

const billPaySchema = schema<BillPayFormModel>((billPay) => {
  // 사용자가 신용카드를 선택하지 않았으면 신용카드 세부 정보는 감춥니다.
  hidden(billPay.method.card, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'card'});
  // 사용자가 계좌 결제를 선택하지 않았으면 계좌 세부 정보는 감춥니다.
  hidden(billPay.method.bank, {when: ({valueOf}) => valueOf(billPay.method.type) !== 'bank'});
});
```

이렇게 정의하면 폼 모델에 `card` 객체와 `bank` 객체가 언제나 존재합니다.
그리고 사용자가 결제 수단을 변경하면, `type` 프로퍼티만 갱신하면 됩니다.
사용자가 신용카드 필드에 입력한 데이터는 `card` 객체에 그대로 남아있지만, 다시 신용카드를 선택하지 않는 한 화면에 표시되지 않습니다.

이런 경우는 동적 폼이 오히려 더 유용해 보일 수 있습니다.
사용자가 신용카드를 선택하면 계좌 관련 정보는 필요없기 때문입니다.
유니언 폼 모델을 하는 것이 나아보일 수 있습니다:

```ts {avoid, header: '동적 구조 모델'}
interface BillPayFormModel {
  name: string;
  method:
    | {
        type: 'card';
        cardNumber: string;
        securityCode: string;
        expiration: string;
      }
    | {
        type: 'bank';
        accountNumber: string;
        routingNumber: string;
      };
}
```

하지만 이런 경우를 생각해 보세요:

1. 사용자가 이름과 신용카드 정보를 입력합니다.
2. 폼을 제출하려는 순간, 수수료가 있다는 것을 발견합니다.
3. 사용자가 수수료를 내지 않기 위해 계좌 결제 옵션을 선택합니다.
4. 계좌 정보를 입력하려고 하던 순간, 정보 유출을 원하지 않아 다시 고민합니다.
5. 다시 신용카드 옵션을 선택하지만, 직전에 입력한 정보는 모두 사라졌습니다!

동적 폼 모델은 데이터를 잃어버릴 수 있다는 문제점이 있습니다.
이런 모델은 필드가 감춰지면 해당 정보는 다시 필요하지 않다는 것을 간주하기 때문에, 신용카드 정보가 한 번 사라지면 복원할 방법이 없습니다.

<!--
#### Exceptions
-->

#### 예외

<!--
While static structure is generally preferred, there are specific scenarios where dynamic structure is necessary and supported.
-->

일반적으로는 정적 폼 모델 구조가 유리하지만, 동적 폼 모델 구조가 더 나은 경우도 있습니다.

<!--
##### Arrays
-->

##### 배열

<!--
Arrays are the most common exception. Forms often need to collect a variable number of items, such as a list of phone numbers, attendees, or line items in an order.

```ts
interface SendEmailFormModel {
  subject: string;
  recipientEmails: string[];
}
```

In this case, the `recipientEmails` array grows and shrinks as the user interacts with the form. While the length of the array is dynamic, the structure of the individual items should be consistent (each item should have the same shape).
-->

배열이 그렇습니다.
전화번호 목록이나 참석자 명단, 주문 항목과 같이 개수가 변하는 데이터를 폼으로 다뤄야 하는 경우가 있습니다.

```ts
interface SendEmailFormModel {
  subject: string;
  recipientEmails: string[];
}
```

이 경우 `recipienEmails` 배열은 사용자 입력에 따라 개수가 늘어나거나 줄어들 수 있습니다.
배열의 길이는 동적이지만, 개별 항목의 구조는 같은 타입으로 일관적되어야 합니다.

<!--
##### Fields that are treated atomically by the UI control
-->

##### 개별 필드는 UI 컨트롤 하나에 매칭되어야 합니다

<!--
Another case where dynamic structure is acceptable is when a complex object is treated as a single, atomic value by the UI control. That is, if the control does not attempt to bind to or access any of its sub-fields individually. In this scenario, the control updates the value by replacing the entire object at once, rather than modifying its internal properties. Because the form structure is irrelevant in this scenario, it's acceptable for that structure to be dynamic.

For example, consider a user profile form that includes a `location` field. The location is selected using a complex "location picker" widget (perhaps a map or a search-ahead dropdown) that returns a coordinate object. In the case where the location is not yet selected, or the user chooses not to share their location, the picker indicates the location as `null`.

```ts {prefer, header: 'Dynamic structure is ok when field is treated as atomic'}
interface Location {
  lat: number;
  lng: number;
}

interface UserProfileFormModel {
  username: string;
  // This property has dynamic structure,
  // but that's ok because the location picker treats this field as atomic.
  location: Location | null;
}
```

In the template, we bind the `location` field directly to our custom control:

```html
Username: <input [formField]="userForm.username" /> Location:
<location-picker [formField]="userForm.location"></location-picker>
```

Here, `<location-picker>` consumes and produces the entire `Location` object (or `null`), and doesn't access `userForm.location.lat` or `userForm.location.lng`. Therefore, `location` can safely have a dynamic shape without violating the principles of model-driven forms.
-->

객체가 UI 컨트롤 하나로 다뤄지는 경우에도 동적 구조가 유용합니다.
즉, 하위 필드에 개별적으로 접근하지 않고 컨트롤이 전체 값을 한 번에 다루는 경우가 그렇습니다.
이 경우 폼 모델의 구조가 중요하지 않기 때문에 폼 모델 구조는 동적이어도 됩니다.

사용자 정보 중에 `location` 필드가 있다고 합시다.
이 위치는 지도 UI나 검색 가능 드롭 다운과 같은 위치 선택기 위젯으로 원하는 값을 입력하며, 이 위젯이 반환하는 결과물은 객체입니다.
사용자가 아직 입력하지 않았거나, 입력하지 않으려는 경우에 위치 정보는 `null` 값입니다.

```ts {prefer, header: '프로퍼티가 한 번에 다뤄지면 동적 구조도 유효합니다'}
interface Location {
  lat: number;
  lng: number;
}

interface UserProfileFormModel {
  username: string;
  // 프로퍼티 여러개를 한 번에 다루기 때문에 유효합니다.
  location: Location | null;
}
```

템플릿에서는 `location` 필드를 커스텀 컨트롤과 연결합니다:

```html
Username: <input [formField]="userForm.username" /> Location:
<location-picker [formField]="userForm.location"></location-picker>
```

`<location-picker>`는 `Location` 객체나 `null`을 반환하며, `userForm.location.lat`이나 `userForm.location.lng`에 직접 접근하지 않습니다.
그래서 `location`은 모델 기반 폼의 원칙을 위반하지 않고도 안전하게 동적인 형태를 가질 수 있습니다.

<!--
## Translating between form model and domain model
-->

## 폼 모델과 도메인 모델 변환

<!--
Given that the form model and domain model represent the same concept differently, we need to have a way to translate between these different representations. When we want to present some existing data in the system to the user in a form, we need to transform it from the domain model representation to the form model representation. Conversely when we want to save a user's changes, we need to transform the data from the form model representation to the domain model representation.

Let's imagine that we have a domain model and a form model and we've written some functions to convert between them.

```ts
interface MyDomainModel { ... }

interface MyFormModel { ... }

// Instance of `MyFormModel` populated with empty input (e.g. `''` for string inputs, etc.)
const EMPTY_MY_FORM_MODEL: MyFormModel = { ... };

function domainModelToFormModel(domainModel: MyDomainModel): MyFormModel { ... }

function formModelToDomainModel(formModel: MyFormModel): MyDomainModel { ... }
```
-->

폼 모델과 도메인 모델은 같은 개념을 다르게 표현하기 때문에, 두 모델을 변환하는 방법이 필요합니다.
시스템에 저장된 데이터를 사용자에게 폼 형식으로 보여주려면, 도메인 모델을 폼 모델로 변환해야 합니다.
반대로 사용자가 변경한 내용을 저장하려면, 폼 모델을 도메인 모델로 변환해야 합니다.

도메인 모델과 폼 모델을 서로 변환하는 함수를 생각해 봅시다.

```ts
interface MyDomainModel { ... }

interface MyFormModel { ... }

// `MyFormModel` 인스턴스에 빈 값을 할당합니다. (문자열이라면 `''`을 지정하는 식입니다)
const EMPTY_MY_FORM_MODEL: MyFormModel = { ... };

function domainModelToFormModel(domainModel: MyDomainModel): MyFormModel { ... }

function formModelToDomainModel(formModel: MyFormModel): MyDomainModel { ... }
```

<!--
### Domain model to form model
-->

### 도메인 모델 → 폼 모델

<!--
When we're creating a form to edit some existing domain model in the system, we'll typically receive that domain model either as an `input()` to our form component or from a backend (e.g. via a resource). In either case, `linkedSignal` provides an excellent way to apply our transform.

In the case where we receive the domain model as an `input()`, we can use `linkedSignal` to create a writable form model from the input signal.

```ts {prefer, header: 'Use linkedSignal to convert domain model to form model'}
@Component(...)
class MyForm {
  // The domain model to initialize the form with, if not given we start with an empty form.
  readonly domainModel = input<MyDomainModel>();

  private readonly formModel = linkedSignal({
    // Linked signal based on the domain model
    source: this.domainModel,
    // If domain model is defined convert it to a form model, otherwise use an empty form model.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel);
}
```

Similarly, when we receive the domain model from the backend via a resource, we can create a `linkedSignal` based on its value to create our `formModel`. In this scenario, the domain model may take some time to fetch, and we should disable the form until the data is loaded.

```ts {prefer, header: 'Disable or hide the form when data is unavailable'}
@Component(...)
class MyForm {
  // Fetch the domain model from the backend.
  readonly domainModelResource: ResourceRef<MyDomainModel | undefined> = httpResource(...);

  private readonly formModel = linkedSignal({
    // Linked signal based on the domain model resource
    source: this.domainModelResource.value,
    // Convert the domain model once it loads, use an empty form model while loading.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel, (root) => {
    // Disable the entire form when the resource is loading.
    disabled(root, {when: () => this.domainModelResource.isLoading()});
  });
}
```

The examples above show a pure derivation of the form model, directly from the domain model. However, in some cases you may wish to do a more advanced diff operation between the new domain model value and the previous domain model and form model values. This can be implemented based on the `linkedSignal` [previous state](/guide/signals/linked-signal#accounting-for-previous-state).
-->

시스템에 저장된 도메인 모델을 수정하도록 폼 모델을 만들 때, 도메인 모델은 보통 폼 컴포넌트의 `input()`으로 전달되거나 백엔드에서 전달됩니다.
어느 경우든, `linkedSignal`로 변환 작업을 수행하는 것이 아주 좋습니다.

도메인 모델을 `input()`으로 받는 경우, `linkedSignal`을 사용해서 폼 모델로 변환하는 로직은 다음과 같이 구현할 수 있씁니다.

```ts {prefer, header: '도메인 모델을 폼 모델로 변환하기 위해 linkedSignal 사용하기'}
@Component(...)
class MyForm {
  // 도메인 모델로 폼을 초기화 합니다. 입력값이 없으면 빈 폼으로 시작합니다.
  readonly domainModel = input<MyDomainModel>();

  private readonly formModel = linkedSignal({
    // 도메인 모델과 연결된 시그널
    source: this.domainModel,
    // 도메인 모델이 존재하면 폼 모델로 변환하고, 도메인 모델이 없으면 빈 폼 모델로 시작합니다.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel);
}
```

비슷하게, 백엔드에서 도메인 모델을 받아오면 `linkedSignal`을 사용해서 `formModel`을 생성합니다.
이 경우 도메인 모델을 가져오는 데 시간이 걸릴 수 있기 때문에, 데이터가 로드될 때까지는 폼을 비활성화해야 합니다.

```ts {prefer, header: '데이터가 준비될 때까지 폼을 비활성화하거나 감춥니다'}
@Component(...)
class MyForm {
  // 백엔드에서 도메인 모델을 가져옵니다
  readonly domainModelResource: ResourceRef<MyDomainModel | undefined> = httpResource(...);

  private readonly formModel = linkedSignal({
    // 도메인 모델로 linkedSignal을 구성합니다
    source: this.domainModelResource.value,
    // 빈 폼 모델로 시낙했다가 도메인 모델이 준비되면 변환합니다.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel, (root) => {
    // 데이터를 불러오기 전까지는 전체 폼을 비활성화합니다.
    disabled(root, {when: () => this.domainModelResource.isLoading()});
  });
}
```

위에서 살펴본 경우는 도메인 모델을 폼 모델로 그대로 사용했습니다.
하지만, 도메인 모델과 폼 모델이 다르게 구성되는 경우에는 변환 작업이 필요할 수 있습니다.
이 로직은 `linkedSignal`에서 [이전 상태](/guide/signals/linked-signal#accounting-for-previous-state)를 참고해서 구현하면 됩니다.

<!--
### Form model to domain model
-->

### 폼 모델 → 도메인 모델

<!--
When we're ready to save the user's input back to the system, we need to convert it to the domain model representation. This would typically happen when the user submits the form, or continuously as the user edits for an auto-saving form.

To save on submit, we can handle the conversion in the `submit` function.

```ts {prefer, header: 'Convert form model to domain model on submit'}
@Component(...)
class MyForm {
  private readonly myDataService = inject(MyDataService);

  protected readonly myForm = form<MyFormModel>(...);

  handleSubmit() {
    submit(this.myForm, async () => {
      await this.myDataService.update(formModelToDomainModel(this.myForm.value()));
    });
  };
}
```

Alternatively, you could also send the form model directly to the server and do the conversion from
form model to domain model on the server.

For continuous saving, update the domain model in an `effect`.

```ts {prefer, header: 'Convert form model to domain model in an effect for auto-saving'}
@Component(...)
class MyForm {
  readonly domainModel = model.required<MyDomainModel>()

  protected readonly myForm = form(...);

  constructor() {
    effect(() => {
      // When the form model changes to a valid value, update the domain model.
      if (this.myForm().valid()) {
        this.domainModel.set(formModelToDomainModel(this.myForm.value()));
      }
    });
  };
}
```

The examples above show a pure conversion from the form model to the domain model. However, it is perfectly acceptable to consider the full form state in addition to just the form model value. For example, to save bytes we might want to only send partial updates to the server based on what the user changed. In this case our conversion function could be designed to take the entire form state and return a sparse domain model based on the form's values and dirtiness.

```ts
type Sparse<T> = T extends object ? {
    [P in keyof T]?: Sparse<T[P]>;
} : T;

function formStateToPartialDomainModel(
  formState: FieldState<MyFormModel>
): Sparse<MyDomainModel> { ... }
```
-->

사용자가 입력한 것을 저장할 준비가 되면, 폼 모델을 도메인 모델로 변환해야 합니다.
이 작업은 사용자가 폼을 제출할 때는 물론이고, 자동 저장 기능이 있다면 계속해서 발생합니다.

폼 제출 기능을 구현하기 위해 `submit` 함수에서 데이터 타입을 변환해 봅시다.

```ts {prefer, header: '폼을 제출하기 위해 폼 모델을 도메인 모델로 변환하기'}
@Component(...)
class MyForm {
  private readonly myDataService = inject(MyDataService);

  protected readonly myForm = form<MyFormModel>(...);

  handleSubmit() {
    submit(this.myForm, async () => {
      await this.myDataService.update(formModelToDomainModel(this.myForm.value()));
    });
  };
}
```

아니면, 폼 모델을 서버로 직접 보낸 후에 서버에서 폼 모델을 도메인 모델로 변환하는 방법도 있습니다.

폼을 자동 저장하는 경우라면 `effect` 함수에서 변환하면 됩니다.

```ts {prefer, header: '자동 저장 기능을 위해 폼 모델을 도메인 모델로 변환하기'}
@Component(...)
class MyForm {
  readonly domainModel = model.required<MyDomainModel>()

  protected readonly myForm = form(...);

  constructor() {
    effect(() => {
      // 폼 모델이 변경되고 유효성 검사를 통과하면 도메인 모델에 반영합니다.
      if (this.myForm().valid()) {
        this.domainModel.set(formModelToDomainModel(this.myForm.value()));
      }
    });
  };
}
```

위 예제에서는 폼 모델을 도메인 모델로 그대로 사용했습니다.
그리고 폼 모델의 값 뿐만 아니라 전체 폼의 상태를 고려하면 전혀 문제가 없습니다.
전송 용량을 절약하기 위해 사용자가 변경한 필드만 부분적으로 갱신하는 것도 가능합니다.
이 경우 변환 함수는 폼의 전체 상태를 받아서 도메인 기반으로 값과 변경사항을 검사할 수 있습니다.

```ts
type Sparse<T> = T extends object ? {
    [P in keyof T]?: Sparse<T[P]>;
} : T;

function formStateToPartialDomainModel(
  formState: FieldState<MyFormModel>
): Sparse<MyDomainModel> { ... }
```
