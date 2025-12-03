import {Component, inject} from '@angular/core';
<<<<<<<< HEAD:adev/src/content/tutorials/first-app/steps/13-search/src/app/home/home.ts
import {CommonModule} from '@angular/common';
import {HousingLocationInfo} from '../housing-location/housing-location';
========
import {HousingLocation} from '../housing-location/housing-location';
>>>>>>>> org/21.0.x:adev/src/content/tutorials/first-app/steps/11-details-page/src/app/home/home.ts
import {HousingLocationInfo} from '../housinglocation';
import {HousingService} from '../housing.service';

@Component({
  selector: 'app-home',
<<<<<<<< HEAD:adev/src/content/tutorials/first-app/steps/13-search/src/app/home/home.ts
  imports: [CommonModule, HousingLocation],
========
  imports: [HousingLocation],
>>>>>>>> org/21.0.x:adev/src/content/tutorials/first-app/steps/11-details-page/src/app/home/home.ts
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for(housingLocation of housingLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
