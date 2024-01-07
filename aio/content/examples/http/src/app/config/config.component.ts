// #docplaster
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Config, ConfigService } from './config.service';

@Component({
  standalone: true,
  selector: 'app-config',
  templateUrl: './config.component.html',
  imports: [ CommonModule ],
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})
export class ConfigComponent {
  error: any;
  headers: string[] = [];
  // #docregion typed_response, v2
  config: Config | undefined;

  // #enddocregion typed_response, v2
  // #docregion v1
  constructor(private configService: ConfigService) {}

  // #enddocregion v1
  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }

  // #docregion v1, v2, typed_response, untyped_response
  showConfig() {
    this.configService.getConfig()
  // #enddocregion v1, v2,  typed_response, untyped_response
      .subscribe({
        next: data => this.config = { ...data }, // 성공한 경우 실행되는 함수
        error: error => this.error = error, // 에러가 발생한 경우 실행되는 함수
      });
  }
  showConfig_v1() {
    this.configService.getConfig_1()
  // #docregion  typed_response, v1
      .subscribe(data => this.config = {
          heroesUrl: data.heroesUrl,
          textfile:  data.textfile,
          date: data.date,
      });
  }
  // #enddocregion  typed_response, v1

  showConfig_untyped_response() {
    this.configService.getConfig_untyped_response()
     // #docregion untyped_response
      .subscribe(data => this.config = {
          heroesUrl: (data as any).heroesUrl,
          textfile:  (data as any).textfile,
          date: (data as any).date,
      });
    }
    // #enddocregion untyped_response



  showConfig_v2() {
    this.configService.getConfig()
  // #docregion v2
      // Config 타입을 알기 때문에 클래스 프로퍼티로 바로 할당할 수 있습니다.
      .subscribe(data => this.config = { ...data });
  }
  // #enddocregion v2

// #docregion showConfigResponse
  showConfigResponse() {
    this.configService.getConfigResponse()
      // 반환 형식은 `HttpResponse<Config>` 입니다.
      .subscribe(resp => {
        // 헤더를 확인합니다.
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // `HttpResponse` 객체의 body 프로퍼티는 `Config` 타입입니다.
        this.config = { ...resp.body! };
      });
  }
// #enddocregion showConfigResponse
  makeError() {
    this.configService.makeIntentionalError().subscribe({ error: error => this.error = error.message });
  }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }
}

