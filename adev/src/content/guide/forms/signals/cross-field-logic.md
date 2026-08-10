<!--
# Cross-field logic
-->

# 필드 교차검증

<!--
**Cross-field logic** is necessary when any rule, validation, or behavior of one field depends on another field's value or state.

Signal forms provide a **field context** to every rule function. The field context provides access to the current field's value and state, and lets you read other fields in the form using `valueOf()`, `stateOf()`, and `fieldTreeOf()`.

This guide covers the field context API in depth and shows common cross-field patterns. For single-field validation, see the [Validation guide](/guide/forms/signals/validation).
-->

**필드 교차 검증**은 어떤 필드의 유효성 검사 규칙이나 동작이 다른 필드의 값이나 상태와 연관될 때 필요합니다.

시그널 폼은 모든 규칙 함수에 **필드 컨텍스트**를 제공합니다.
이 필드 컨텍스트를 활용하면 현재 필드의 값이나 상태를 참조할 수 있으며, `valueOf()`, `stateOf()`, `fieldTreeOf()`로 다른 필드를 참조할 수도 있습니다.

이 문서는 필드 컨텍스트 API를 깊이 알아보고 필드 교차검증 방법도 안내합니다.
필드 하나를 유효성 검사하는 방법은 [유효성 검사](/guide/forms/signals/validation) 문서를 참고하세요.

<!--
## Understanding the field context
-->

## 필드 컨텍스트 이해하기

<!--
Every rule function in signal forms receives a **field context** parameter, which is an object that describes the current field and provides access to the rest of the form.

There are three properties you can access for the current field:

| Property    | Type                 | Description                                                          |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| `value`     | `Signal<TValue>`     | The current field's value as a signal                                |
| `state`     | `FieldState<TValue>` | The current field's state (such as validity, errors, touched, dirty) |
| `fieldTree` | `FieldTree<TValue>`  | The current field's tree, for programmatic access to child fields    |

For cross-field logic, the following three properties allow you to access other parts of the form:

| Property        | Type                           | Description                                                                                                                        |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `valueOf()`     | `(path) => PValue`             | Most common. Use when you need another field's raw value for comparisons or calculations.                                          |
| `stateOf()`     | `(path) => FieldState<PValue>` | Use when your logic depends on another field's state, such as whether it's valid, touched, or dirty.                               |
| `fieldTreeOf()` | `(path) => FieldTree<PModel>`  | Use when you need programmatic access to another field's tree, such as pushing errors to a specific child field with validateTree. |

Here is an example of using `value` and `valueOf()` to validate that the current field (end date) comes after the start date in the form:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class EventForm {
  eventModel = signal({
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-06-05'),
  });

  eventForm = form(this.eventModel, (schemaPath) => {
    validate(schemaPath.endDate, ({value, valueOf}) => {
      if (value() <= valueOf(schemaPath.startDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'End date must be after start date',
        };
      }

      return null;
    });
  });
}
```

NOTE: The `fieldContext` parameter is typically destructured to pull out only what the rule needs. The remaining examples in this guide use this pattern.
-->

시그널 폼의 규칙 함수는 **필드 컨텍스트** 인자를 받는데, 이 객체는 현재 필드에 대한 정보를 담고 있으며, 폼의 다른 필드를 참조하는 용도로 활용할 수 있습니다.

현재 필드에 접근할 수 있는 프로퍼티는 3개입니다:

| 프로퍼티    | 타입                 | 설명                                                                    |
| ----------- | -------------------- | ----------------------------------------------------------------------- |
| `value`     | `Signal<TValue>`     | 현재 필드의 값을 표현하는 시그널                                        |
| `state`     | `FieldState<TValue>` | 현재 필드의 유효성 검사 결과나 에러, `touched`, `dirty`를 표현하는 객체 |
| `fieldTree` | `FieldTree<TValue>`  | 현재 필드의 자식 필드에 접근하는 용도로 트리를 표현하는 객체            |

필드 교차검증에서 폼의 다른 필드를 참조하는 프로퍼티는 3개입니다:

| 프로퍼티        | 타입                           | 설명                                                                                                   |
| --------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `valueOf()`     | `(path) => PValue`             | 가장 많이 사용합니다. 다른 필드의 값을 참조할 때 사용합니다.                                           |
| `stateOf()`     | `(path) => FieldState<PValue>` | `valid`, `touched, `dirty` 등 다른 필드 상태를 참조할 때 사용합니다.                                   |
| `fieldTreeOf()` | `(path) => FieldTree<PModel>`  | `validateTree`로 어떤 필드의 자식으로 오류를 전달하는 등 다른 필드 트리에 코드로 접근할 때 사용합니다. |

현재 필드(종료 날짜)가 시작 일자 이후인지 `value`와 `valueOf()`로 확인하는 예제 코드를 확인해 보세요:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class EventForm {
  eventModel = signal({
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-06-05'),
  });

  eventForm = form(this.eventModel, (schemaPath) => {
    validate(schemaPath.endDate, ({value, valueOf}) => {
      if (value() <= valueOf(schemaPath.startDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'End date must be after start date',
        };
      }

      return null;
    });
  });
}
```

참고: `fieldContext` 인자는 일반적으로 필요한 규칙만 참조하기 위해 분해 연산자를 사용합니다. 이 문서에서도 이 방식을 계속 사용합시다.

<!--
## Cross-field validation patterns
-->

## 필드 교차검증 패턴

<!--
The date range example from the previous section validates the end date against the start date. Because the rule reads `valueOf(schemaPath.startDate)`, it re-evaluates automatically whenever either date changes. In other words, a single validator is enough to keep the error state correct.

However, that single validator only places the error on the end date field. If you want both fields to show an error when the range is invalid, add a matching validation rule to each field:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class EventForm {
  eventModel = signal({
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-06-05'),
  });

  eventForm = form(this.eventModel, (schemaPath) => {
    validate(schemaPath.startDate, ({value, valueOf}) => {
      if (value() >= valueOf(schemaPath.endDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'Start date must be before end date',
        };
      }
      return null;
    });

    validate(schemaPath.endDate, ({value, valueOf}) => {
      if (value() <= valueOf(schemaPath.startDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'End date must be after start date',
        };
      }
      return null;
    });
  });
}
```

Both rules make use of `valueOf()` to read the other field. Because each rule is reactive, changing either date re-evaluates both validations automatically.

NOTE: When a rule involves multiple fields, you need to decide where the error belongs: on a specific field, on multiple fields, or on the parent. In general, place the error where the user would most likely go to fix the problem.
-->

이전 섹션에서는 종료 일자가 시작 일자보다 이후인지 검사했습니다.
이 규칙은 `valueOf(schemaPath.startDate)`를 읽기 때문에 시작 일자와 종료 일자 중 하나가 변경되면 규칙 함수도 다시 실행됩니다.
즉, 오류 상태를 확인하려면 유효성 검사는 하나만 있으면 됩니다.

그런데, 유효성 검사가 종료 날짜 필드에만 있으면 종료 날짜에만 에러를 표시할 수 있습니다.
시작 일자와 종료 일자가 잘못되었을 때 양쪽 필드에 에러를 표시하려면, 각각 필드에 유효성 검사를 추가하면 됩니다:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class EventForm {
  eventModel = signal({
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-06-05'),
  });

  eventForm = form(this.eventModel, (schemaPath) => {
    validate(schemaPath.startDate, ({value, valueOf}) => {
      if (value() >= valueOf(schemaPath.endDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'Start date must be before end date',
        };
      }
      return null;
    });

    validate(schemaPath.endDate, ({value, valueOf}) => {
      if (value() <= valueOf(schemaPath.startDate)) {
        return {
          kind: 'invalidDateRange',
          message: 'End date must be after start date',
        };
      }
      return null;
    });
  });
}
```

두 규칙 모두 `valueOf()`를 사용해서 다른 필드의 값을 읽습니다.
그리고 개별 규칙은 반응형으로 동작하기 때문에 두 날짜 중에서 하나라도 변경되면 유효성 검사 2개가 다시 실행됩니다.

참고: 규칙이 여러 필드를 검사한다면, 이 필드 중에 어디에 에러를 표시할 지 결정해야 합니다.
이 경우 에러는 특정 필드에 표시할 수 있고, 여러 필드에 모두 표시할 수도 있으며, 부모 필드에 표시할 수도 있습니다.
보통은 사용자가 가장 편하게 문제를 해결할 수 있는 필드에 표시하는 것이 좋습니다.

<!--
### Conditional requirements
-->

### 조건부 필수항목

<!--
In some forms, certain fields are only required under certain conditions. For example, a registration form might require a company name only when the user selects a business account type:

```ts
import {Component, signal} from '@angular/core';
import {form, required} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class RegistrationForm {
  registrationModel = signal({
    accountType: 'personal' as 'personal' | 'business',
    companyName: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.companyName, {
      when: ({valueOf}) => valueOf(schemaPath.accountType) === 'business',
      message: 'Company name is required for business accounts',
    });
  });
}
```

The `when` option receives the same field context as any other rule function, so `valueOf` works the same way. When the user switches back to `'personal'`, the condition re-evaluates and the requirement — along with its error — clears automatically.

Using `required()` with `when` instead of a manual `validate()` check also adds proper required metadata to the field, which enables accessibility features like marking the field as required for screen readers.
-->

때로는 어떤 조건일 때만 필드가 필수 항목이어야 하는 경우가 있습니다.
예를 들면, 사용자가 비즈니스 계정 타입을 선택했을 때 회사명을 필수로 입력해야 하는 경우가 있다고 합시다:

```ts
import {Component, signal} from '@angular/core';
import {form, required} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class RegistrationForm {
  registrationModel = signal({
    accountType: 'personal' as 'personal' | 'business',
    companyName: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.companyName, {
      when: ({valueOf}) => valueOf(schemaPath.accountType) === 'business',
      message: 'Company name is required for business accounts',
    });
  });
}
```

`when` 옵션은 `valueOf` 함수와 마찬가지로 필드 컨텍스트를 인자로 받습니다.
그리고 사용자가 `'personal'` 옵션을 다시 선택하면, 조건이 다시 실행되면서 필수 입력 여부와 에러가 자동으로 초기화됩니다.

수동으로 `validate()`를 사용하는 대신 `when`과`required()`를 사용하면 필드에 `required` 메타데이터를 자동으로 추가하기 때문에, 스크린 리더에서도 필수 항목으로 표시하는 접근성 기능으로 활용할 수 있습니다.

<!--
### Validating based on another field's state
-->

### 다른 필드 상태를 기반으로 유효성 검사하기

<!--
The examples so far use `valueOf()` to read another field's value. Sometimes your logic depends on another field's _state_ instead — whether it's valid, touched, or dirty. Use `stateOf()` for this.

For example, a confirm-password field should only check for a match once the user has interacted with the password field. If the user hasn't touched the password yet, flagging a mismatch on the confirmation is premature:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class PasswordForm {
  passwordModel = signal({
    password: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    validate(schemaPath.confirmPassword, ({value, valueOf, stateOf}) => {
      if (!stateOf(schemaPath.password).touched()) {
        return null;
      }
      if (value() !== valueOf(schemaPath.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });
}
```

The `stateOf()` call returns the other field's [field state](api/forms/signals/FieldState), giving you access to signals like `invalid()`, `touched()`, and `dirty()`. Because these are signals, the rule re-evaluates whenever the password field's validity changes.

WARNING: Be careful not to read state which depends on your field's validation, as that creates a circular loop. For example, a validator which checks whether the parent field is valid will create an infinite loop because the parent's validity depends on its children's validity (which includes your validator).
-->

지금까지 살펴본 예제 코드에서는 `valueOf()`로 다른 필드의 값을 읽었습니다.
그런데 때로는 다른 필드의 `valid`, `touched`, `dirty` 등의 _상태_ 를 참조해야 하는 경우가 있습니다.
이런 경우에는 `stateOf()`를 사용합니다.

예를 들면, 비밀번호 확인 필드는 사용자가 비밀번호 필드를 입력한 후에만 유효성을 검사해야 합니다.
사용자가 아직 비밀번호를 입력하지 않은 상태라면, 비밀번호 확인 필드의 값이 비밀번호 필드와 같지 않더라도 에러를 표시하면 안됩니다:

```ts
import {Component, signal} from '@angular/core';
import {form, validate} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class PasswordForm {
  passwordModel = signal({
    password: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    validate(schemaPath.confirmPassword, ({value, valueOf, stateOf}) => {
      if (!stateOf(schemaPath.password).touched()) {
        return null;
      }
      if (value() !== valueOf(schemaPath.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });
}
```

`stateOf()`를 실행하면 다른 필드의 [필드 상태](api/forms/signals/FieldState)를 반환하는데, 이 객체로 `invalid()`, `touched()`, `dirty()` 상태 시그널을 참조할 수 있습니다.
이 상태 시그널 또한 시그널이기 때문에, 비밀번호 필드의 유효성 상태가 변경되면 규칙이 다시 실행됩니다.

주의: 다른 필드의 유효성 상태를 참조할 때 무한 루프가 발생하지 않도록 주의하세요.
예를 들면, 부모 필드가 유효한지 점검하는 로직은 부모 필드가 자식 필드의 유효성 검사 상태에 영향을 받기 때문에 무한 루프가 될 수 있습니다.

<!--
## Using validateTree
-->

## `validateTree()` 사용하기

<!--
The examples so far use `validate()` to check individual fields. Sometimes you need to validate a group of fields where the logic is inherently about multiple fields in a group, and direct errors to specific children within it. `validateTree` handles is ideal for these kinds of scenarios.

For example, in a Sudoku puzzle, each row must contain unique numbers. This is a group-level rule: you check the entire row, then flag the specific cells that violate it. This kind of validation can't be expressed cleanly with `validate` on individual fields, because each cell would need to know about every other cell.

```ts
import {Component, signal} from '@angular/core';
import {form, validateTree} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class SudokuRow {
  rowModel = signal({
    cell1: 1,
    cell2: 3,
    cell3: 1,
    cell4: 4,
  });

  rowForm = form(this.rowModel, (schemaPath) => {
    validateTree(schemaPath, ({value, fieldTreeOf}) => {
      const row = value();
      const entries = [
        {val: row.cell1, fieldTree: fieldTreeOf(schemaPath.cell1)},
        {val: row.cell2, fieldTree: fieldTreeOf(schemaPath.cell2)},
        {val: row.cell3, fieldTree: fieldTreeOf(schemaPath.cell3)},
        {val: row.cell4, fieldTree: fieldTreeOf(schemaPath.cell4)},
      ];

      const counts = new Map<number, number>();
      for (const {val} of entries) {
        if (val !== 0) {
          counts.set(val, (counts.get(val) ?? 0) + 1);
        }
      }

      const errors = entries
        .filter(({val}) => val !== 0 && (counts.get(val) ?? 0) > 1)
        .map(({val, fieldTree}) => ({
          kind: 'duplicateInRow',
          message: `${val} already appears in this row`,
          fieldTree,
        }));

      return errors.length > 0 ? errors : null;
    });
  });
}
```

The validator runs on the parent field (the row), reads all cell values, counts duplicates, and returns an error for each cell that contains a repeated number. The `fieldTree` property on each error tells Angular exactly which cell should show the error. Without `fieldTree`, the errors would apply to the row itself — not where the user needs to see them.

Because `validateTree` can return an array of errors, a single validator can flag multiple cells at once. Each error includes a `fieldTree` pointing to its target, so Angular routes the errors to the correct fields.
-->

지금까지 살펴본 예제는 `validate()`를 개별 필드에 적용했습니다.
때로는 여러 필드를 묶어서 함께 검사하고 에러를 특정 자식 필드에 표시해야 할 때도 있습니다.
이런 경우는 `validateTree()`를 쓰면 됩니다.

예를 들어 스도쿠 퍼즐의 경우, 한 줄 안에서는 서로 다른 숫자가 존재해야 합니다.
그룹 단위의 규칙은 이렇습니다: 전체 줄을 확인하고 규칙에서 벗어나는 특정 칸만 플래그를 지정합니다.
이런 검사는 개별 필드에 `validate()`를 적용하는 것으로는 깔끔하게 해결할 수 없습니다.
이 경우는 개별 셀이 다른 모든 셀을 다 알아야 하기 때문입니다.rladlshgd

```ts
import {Component, signal} from '@angular/core';
import {form, validateTree} from '@angular/forms/signals';

@Component({
  /* ... */
})
export class SudokuRow {
  rowModel = signal({
    cell1: 1,
    cell2: 3,
    cell3: 1,
    cell4: 4,
  });

  rowForm = form(this.rowModel, (schemaPath) => {
    validateTree(schemaPath, ({value, fieldTreeOf}) => {
      const row = value();
      const entries = [
        {val: row.cell1, fieldTree: fieldTreeOf(schemaPath.cell1)},
        {val: row.cell2, fieldTree: fieldTreeOf(schemaPath.cell2)},
        {val: row.cell3, fieldTree: fieldTreeOf(schemaPath.cell3)},
        {val: row.cell4, fieldTree: fieldTreeOf(schemaPath.cell4)},
      ];

      const counts = new Map<number, number>();
      for (const {val} of entries) {
        if (val !== 0) {
          counts.set(val, (counts.get(val) ?? 0) + 1);
        }
      }

      const errors = entries
        .filter(({val}) => val !== 0 && (counts.get(val) ?? 0) > 1)
        .map(({val, fieldTree}) => ({
          kind: 'duplicateInRow',
          message: `${val} already appears in this row`,
          fieldTree,
        }));

      return errors.length > 0 ? errors : null;
    });
  });
}
```

부모 필드에서 동작하는 유효성 검사는, 모든 칸의 값을 읽고, 중복을 검사하며, 중복된 숫자가 있으면 에러를 반환합니다.
그리고 `fieldTree` 프로퍼티를 확인하면 개별 칸에서 발생한 에러를 확인할 수 있습니다.
`fieidlTree`를 사용하지 않는다면, 행 자체에 에러를 표시되어 어떤 칸에서 에러가 발생했는지 사용자가 알 수 없습니다.

`validateTree()`는 에러를 배열 타입으로 반환하기 때문에, 유효성 검사 함수 하나로 여러 셀의 에러를 지정할 수 있습니다.
각 오류에는 대상 필드를 가리키는 `fieldTree`가 포함되어 있기 때문에, 이를 활용해서 어떤 필드에 에러가 발생했는지 연결하면 됩니다.

<!--
### When to use validateTree vs validate
-->

### `validateTree()` vs. `validate()`

<!--
Prefer `validate()` with `valueOf()` when the error belongs on the field being validated — even if the rule reads from other fields. Reach for `validateTree` when:

- The validation logic is inherently about a group of fields, not any single field
- The validator needs to return errors targeting different child fields

TIP: For an introduction to `validateTree` and its return type, see the [Validation guide](/guide/forms/signals/validation).
-->

에러가 특정 필드에 해당하는 경우에는 다른 필드를 참조하더라도 `validate()`와 `valueOf()`를 사용하는 것이 좋습니다.
`validateTree()`는 이런 경우에 사용하세요:

- 유효성 검사 로직이 단일 필드가 아니라 필드 묶음을 활용할 때
- 유효성 검사 로직이 자식 필드들이 대상인 에러를 반환할 때

팁: `validateTree()`와 이 함수의 반환 타입을 알아보려면 [유효성 검사](/guide/forms/signals/validation) 문서를 참고하세요.

<!--
## Next steps
-->

## 다음 단계

<!--
This guide covered the field context API and common cross-field patterns. To learn more about related Signal Forms guide, check out:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="Validation" />
  <docs-pill href="guide/forms/signals/field-state-management" title="Field state management" />
  <docs-pill href="guide/forms/signals/custom-controls" title="Custom controls" />
</docs-pill-row>
-->

이 문서에서는 필드 컨텍스트 API와 필드를 교차검증하는 기본 패턴을 다뤘습니다.
이런 내용도 확인해 보세요:

<docs-pill-row>
  <docs-pill href="guide/forms/signals/validation" title="유효성 검사" />
  <docs-pill href="guide/forms/signals/field-state-management" title="필드 상태 관리" />
  <docs-pill href="guide/forms/signals/custom-controls" title="커스텀 폼 컨트롤" />
</docs-pill-row>
