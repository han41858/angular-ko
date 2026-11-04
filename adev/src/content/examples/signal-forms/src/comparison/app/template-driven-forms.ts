import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (submit)="onSubmit()">
      <div>
        <label>
          이메일
          <input
            type="email"
            name="email"
            [(ngModel)]="email"
            #emailInput="ngModel"
            required
            email
          />
        </label>
        @if (emailInput.touched && emailInput.invalid) {
          <span class="error">
            @if (emailInput.errors?.['required']) {
              이메일은 필수입니다
            }
            @if (emailInput.errors?.['email']) {
              유효한 이메일 주소를 입력하세요
            }
          </span>
        }
      </div>

      <div>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            [(ngModel)]="password"
            #passwordInput="ngModel"
            required
            minlength="8"
          />
        </label>
        @if (passwordInput.touched && passwordInput.invalid) {
          <span class="error">
            @if (passwordInput.errors?.['required']) {
              비밀번호는 필수입니다
            }
            @if (passwordInput.errors?.['minlength']) {
              비밀번호는 8자 이상이어야 합니다
            }
          </span>
        }
      </div>

      <button type="submit" [disabled]="loginForm.invalid">로그인</button>
    </form>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };
    console.log('Submitting:', credentials);
  }
}
