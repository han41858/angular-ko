// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  standalone: true,
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html',
  styleUrls: ['./hero-form-reactive.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
})
export class HeroFormReactiveComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

  heroForm: FormGroup;

  // #docregion form-group
  ngOnInit(): void {
    // #docregion custom-validator
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i), // <-- 커스텀 유효성 검사기의 인자는 이렇게 전달합니다.
      ]),
      alterEgo: new FormControl(this.hero.alterEgo),
      power: new FormControl(this.hero.power, Validators.required),
    });
    // #enddocregion custom-validator
  }

  get name() {
    return this.heroForm.get('name');
  }

  get power() {
    return this.heroForm.get('power');
  }
  // #enddocregion form-group
}
// #enddocregion
