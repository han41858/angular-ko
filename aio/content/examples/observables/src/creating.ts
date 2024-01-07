import { Observable, Observer } from 'rxjs';

export function docRegionSubscriber(console: Console) {
  // #docregion subscriber
  // 이 함수는 subscribe()가 실행될 때 같이 실행됩니다.
  function sequenceSubscriber(observer: Observer<number>) {
    // 1, 2, 3을 순서대로 보내고, 옵저버블을 종료합니다.
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();

    // 이 함수는 모든 데이터를 동기 방식으로 보내기 때문에
    // 구독이 해제될 때 실행해야 하는 로직은 없습니다.
    return {unsubscribe() {}};
  }

  // 구독자 함수를 인자로 전달하면서 새로운 Observable 인스턴스를 만듭니다.
  const sequence = new Observable(sequenceSubscriber);

  // 옵저버블을 실행하고 스트림이 전달될 때마다 로그를 출력합니다.
  sequence.subscribe({
    next(num) { console.log(num); },
    complete() { console.log('Finished sequence'); }
  });

  // 로그:
  // 1
  // 2
  // 3
  // Finished sequence
  // #enddocregion subscriber
}

