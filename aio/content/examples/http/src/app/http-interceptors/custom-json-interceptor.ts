import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// #docregion custom-json-interceptor
// JsonParser 클래스는 커스텀 파서를 구현한 클래스이며 DI 토큰으로 동작합니다.
@Injectable()
export abstract class JsonParser {
  abstract parse(text: string): any;
}

@Injectable()
export class CustomJsonInterceptor implements HttpInterceptor {
  constructor(private jsonParser: JsonParser) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    if (httpRequest.responseType === 'json') {
      // 응답 타입이 JSON이면 처리합니다.
      return this.handleJsonResponse(httpRequest, next);
    } else {
      return next.handle(httpRequest);
    }
  }

  private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // 기본 JSON 파싱 로직을 비활성화하도록 오버라이드합니다.
    httpRequest = httpRequest.clone({responseType: 'text'});
    // 커스텀 파서로 응답을 처리합니다.
    return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
  }

  private parseJsonResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({body: this.jsonParser.parse(event.body)});
    } else {
      return event;
    }
  }
}
// #enddocregion custom-json-interceptor

// #docregion custom-json-parser
@Injectable()
export class CustomJsonParser implements JsonParser {
  parse(text: string): any {
    return JSON.parse(text, dateReviver);
  }
}

function dateReviver(key: string, value: any) {
  // #enddocregion custom-json-parser
  if (typeof value !== 'string') {
    return value;
  }
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
  if (!match) {
    return value;
  }
  return new Date(+match[1], +match[2] - 1, +match[3]);
  // #docregion custom-json-parser
}
// #enddocregion custom-json-parser
