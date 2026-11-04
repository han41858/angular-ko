import {Component, signal} from '@angular/core';
import {email, form, FormField, required} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [FormField],
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: '이메일은 필수입니다'});
    email(schemaPath.email, {message: '유효한 이메일 주소를 입력하세요'});

    required(schemaPath.password, {message: '비밀번호는 필수입니다'});
  });

  onSubmit(event: Event) {
    event.preventDefault();
    // Perform login logic here
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    // e.g., await this.authService.login(credentials);
  }
}
