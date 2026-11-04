import {Component, signal} from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="loginForm" (submit)="onSubmit()">
      <div>
        <label>
          이메일
          <input type="email" [formField]="loginForm.email" />
        </label>
        @if (loginForm.email().touched() && loginForm.email().invalid()) {
          <span class="error">
            {{ loginForm.email().errors()[0].message }}
          </span>
        }
      </div>

      <div>
        <label>
          비밀번호
          <input type="password" [formField]="loginForm.password" />
        </label>
        @if (loginForm.password().touched() && loginForm.password().invalid()) {
          <span class="error">
            {{ loginForm.password().errors()[0].message }}
          </span>
        }
      </div>

      <button type="submit" [disabled]="loginForm().invalid()">로그인</button>
    </form>
  `,
})
export class LoginComponent {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {message: '이메일은 필수입니다'});
    email(fieldPath.email, {message: '유효한 이메일 주소를 입력하세요'});

    required(fieldPath.password, {message: '비밀번호는 필수입니다'});
    minLength(fieldPath.password, 8, {message: '비밀번호는 8자 이상이어야 합니다'});
  });

  onSubmit() {
    // Only runs the action when the form is valid.
    submit(this.loginForm, async (field) => {
      console.log('Submitting:', field().value());
    });
  }
}
