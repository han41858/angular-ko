import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (submit)="onSubmit()">
      <div>
        <label>
          이메일
          <input type="email" formControlName="email" />
        </label>
        @if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {
          <span class="error">
            @if (loginForm.controls.email.errors?.['required']) {
              이메일은 필수입니다
            }
            @if (loginForm.controls.email.errors?.['email']) {
              유효한 이메일 주소를 입력하세요
            }
          </span>
        }
      </div>

      <div>
        <label>
          비밀번호
          <input type="password" formControlName="password" />
        </label>
        @if (loginForm.controls.password.touched && loginForm.controls.password.invalid) {
          <span class="error">
            @if (loginForm.controls.password.errors?.['required']) {
              비밀번호는 필수입니다
            }
            @if (loginForm.controls.password.errors?.['minlength']) {
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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Submitting:', credentials);
    }
  }
}
