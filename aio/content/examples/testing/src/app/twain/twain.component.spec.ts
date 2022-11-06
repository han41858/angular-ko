// #docplaster
import { fakeAsync, ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { asyncData, asyncError } from '../../testing';

import { of, throwError } from 'rxjs';
import { last } from 'rxjs/operators';

import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  // #docregion setup
  beforeEach(() => {
    testQuote = 'Test Quote';

    // #docregion spy
    // `getQuote()` 스파이 메소드가 선언된 가짜 TwainService 객체를 정의합니다.
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // `getQuote()` 메소드는 테스트 데이터를 Observable 형태로 즉시 반환합니다.
    getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));
    // #enddocregion spy

    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [{provide: TwainService, useValue: twainService}]
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });
  // #enddocregion setup

  describe('when test with synchronous observable', () => {
    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent)
        .withContext('nothing displayed')
        .toBe('');
      expect(errorMessage())
        .withContext('should not show error element')
        .toBeNull();
      expect(getQuoteSpy.calls.any())
        .withContext('getQuote not yet called')
        .toBe(false);
    });

    // The quote would not be immediately available if the service were truly async.
    // #docregion sync-test
    it('should show quote after component initialized', () => {
      fixture.detectChanges();  // onInit()

      // 스파이 메소드가 반환한 결과는 컴포넌트가 초기화된 이후에 바로 표시됩니다.
      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.calls.any())
        .withContext('getQuote called')
        .toBe(true);
    });
    // #enddocregion sync-test


    // The error would not be immediately available if the service were truly async.
    // Use `fakeAsync` because the component error calls `setTimeout`
    // #docregion error-test
    it('should display error when TwainService fails', fakeAsync(() => {
         // 스파이 메소드가 에러를 Observable 타입으로 반환합니다.
         getQuoteSpy.and.returnValue(throwError(() => new Error('TwainService test failure')));
         fixture.detectChanges();  // onInit()
         // 스파이가 보내는 에러는 init이 실행된 직후에 받습니다.

         tick();  // 컴포넌트가 실행한 setTimeout()을 끝냅니다.

         fixture.detectChanges();  // setTimeout() 안에서 변경한 errorMessage를 반영합니다.

         expect(errorMessage())
          .withContext('should display error')
          .toMatch(/test failure/, );
         expect(quoteEl.textContent)
          .withContext('should show placeholder')
          .toBe('...');
       }));
    // #enddocregion error-test
  });

  describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      // #docregion async-setup
      // `asyncData()` 헬퍼 함수를 사용해서 옵저버블을 비동기로 처리합니다.
      getQuoteSpy.and.returnValue(asyncData(testQuote));
      // #enddocregion async-setup
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent)
        .withContext('nothing displayed')
        .toBe('');
      expect(errorMessage())
        .withContext('should not show error element')
        .toBeNull();
      expect(getQuoteSpy.calls.any())
        .withContext('getQuote not yet called')
        .toBe(false);
    });

    it('should still not show quote after component initialized', () => {
      fixture.detectChanges();
      // getQuote service is async => still has not returned with quote
      // so should show the start value, '...'
      expect(quoteEl.textContent)
        .withContext('should show placeholder')
        .toBe('...');
      expect(errorMessage())
        .withContext('should not show error')
        .toBeNull();
      expect(getQuoteSpy.calls.any())
        .withContext('getQuote called')
        .toBe(true);
    });

    // #docregion fake-async-test
    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
         fixture.detectChanges();  // ngOnInit()
         expect(quoteEl.textContent)
          .withContext('should show placeholder')
          .toBe('...');

         tick();                   // 옵저버블을 실행합니다.
         fixture.detectChanges();  // 화면을 갱신합니다.

         expect(quoteEl.textContent)
          .withContext('should show quote')
          .toBe(testQuote);
         expect(errorMessage())
          .withContext('should not show error')
          .toBeNull();
       }));
    // #enddocregion fake-async-test

    // #docregion waitForAsync-test
    it('should show quote after getQuote (waitForAsync)', waitForAsync(() => {
         fixture.detectChanges();  // ngOnInit()
         expect(quoteEl.textContent)
          .withContext('should show placeholder')
          .toBe('...');

         fixture.whenStable().then(() => {  // 비동기 getQuote를 기다립니다.
           fixture.detectChanges();         // 화면을 갱신합니다.
           expect(quoteEl.textContent).toBe(testQuote);
           expect(errorMessage())
            .withContext('should not show error')
            .toBeNull();
         });
       }));
    // #enddocregion waitForAsync-test


    // #docregion quote-done-test
    it('should show last quote (quote done)', (done: DoneFn) => {
      fixture.detectChanges();

      component.quote.pipe(last()).subscribe(() => {
        fixture.detectChanges();  // 화면을 갱신합니다.
        expect(quoteEl.textContent).toBe(testQuote);
        expect(errorMessage())
          .withContext('should not show error')
          .toBeNull();
        done();
      });
    });
    // #enddocregion quote-done-test

    // #docregion spy-done-test
    it('should show quote after getQuote (spy done)', (done: DoneFn) => {
      fixture.detectChanges();

      // 컴포넌트가 받는 문자열은 스파이가 마지막으로 실행되었을 때 반환하는 값으로 참조할 수도 있습니다.
      getQuoteSpy.calls.mostRecent().returnValue.subscribe(() => {
        fixture.detectChanges();  // 화면을 갱신합니다.
        expect(quoteEl.textContent).toBe(testQuote);
        expect(errorMessage())
          .withContext('should not show error')
          .toBeNull();
        done();
      });
    });
    // #enddocregion spy-done-test

    it('should display error when TwainService fails', fakeAsync(() => {
         // tell spy to return an async error observable
         getQuoteSpy.and.returnValue(asyncError<string>('TwainService test failure'));

         fixture.detectChanges();
         tick();                   // component shows error after a setTimeout()
         fixture.detectChanges();  // update error message

         expect(errorMessage())
          .withContext('should display error')
          .toMatch(/test failure/);
         expect(quoteEl.textContent)
          .withContext('should show placeholder')
          .toBe('...');
       }));
  });
});
