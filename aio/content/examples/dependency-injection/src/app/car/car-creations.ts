// Examples with car and engine variations

import { Car, Engine, Tires } from './car';

///////// example 1 ////////////
export function simpleCar() {
  // 4 실린더 엔진과 기본 타이어를 사용하는 자동차 생성하기
  const car = new Car(new Engine(), new Tires());
  car.description = 'Simple';
  return car;
}


///////// example 2 ////////////
class Engine2 {
  constructor(public cylinders: number) { }
}

export function superCar() {
  // 12 실린더 엔진과 기본 타이어를 사용하는 슈퍼카 생성하기
  const bigCylinders = 12;
  const car = new Car(new Engine2(bigCylinders), new Tires());
  car.description = 'Super';
  return car;
}

/////////// example 3 //////////
class MockEngine extends Engine { cylinders = 8; }
class MockTires  extends Tires  { make = 'YokoGoodStone'; }

export function testCar() {
  // 8 실린더 엔진과 YokoGoodStone 메이커의 타이어를 사용하는 테스트카 생성하기
  const car = new Car(new MockEngine(), new MockTires());
  car.description = 'Test';
  return car;
}
