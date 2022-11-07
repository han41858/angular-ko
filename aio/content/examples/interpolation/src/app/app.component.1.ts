import { Component } from '@angular/core';


// #docregion var-collision
@Component({
  template: `
    <div>
      <!-- Hello, Padma -->
      <h1>Hello, {{customer}}</h1>
      <ul>
        <!-- 목록 안에 있는 Ebony와 Chiho -->
        <li *ngFor="let customer of customers">{{ customer.value }}</li>
      </ul>
    </div>
  `
})
class AppComponent {
  customers = [{value: 'Ebony'}, {value: 'Chiho'}];
  customer = 'Padma';
}
// #enddocregion var-collision
