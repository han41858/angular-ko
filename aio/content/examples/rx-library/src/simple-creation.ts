// #docplaster
/*
  Because of how the code is merged together using the doc regions,
  we need to indent the imports with the function below.
*/
// #docregion ajax
  import { Observable } from 'rxjs';
  import { ajax } from 'rxjs/ajax';

// #enddocregion ajax

export function docRegionAjax<T>(console: Console,
                                 // eslint-disable-next-line @typescript-eslint/no-shadow
                                 ajax: (url: string) => Observable<{status: number, response: T}>) {
  // #docregion ajax
  // 옵저버블을 생성하고 AJAX 요청을 보냅니다.
  const apiData = ajax('/api/data');
  // Subscribe to create the request
  apiData.subscribe(res => console.log(res.status, res.response));
  // #enddocregion ajax
}
