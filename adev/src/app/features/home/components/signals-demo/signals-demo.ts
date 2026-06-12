/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Component, computed, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CodeBlock} from '../code-block/code-block';

@Component({
  selector: 'adev-signals-demo',
  imports: [RouterLink, CodeBlock],
  templateUrl: './signals-demo.html',
  styleUrls: ['./signals-demo.scss'],
})
export class SignalsDemo {
  tsExample = tsExample;
  htmlExample = htmlExample;

  items = signal([
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Blueberry',
    'Cherry',
    'Date',
    'Dragonfruit',
  ]);
  searchTerm = signal('');

  // A computed signal that derives the filtered list.
  // It automatically re-runs when a dependency changes.
  filteredItems = computed(() => {
    const lowerCaseSearchTerm = this.searchTerm().toLowerCase();
    return this.items().filter((item) => item.toLowerCase().includes(lowerCaseSearchTerm));
  });

  onSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }
}

const tsExample = `
// 상태를 저장하는 소스 시그널
items = signal(['Apple', 'Banana', /*...*/ ]);
searchTerm = signal('');
// 목록을 필터링하는 computed 시그널입니다.
// 이 시그널은 다른 시그널이 변경되면 자동으로 다시 계산합니다.
filteredItems = computed(() => {
  const lowerCaseSearchTerm = this.searchTerm().toLowerCase();
  return this.items().filter(item =>
    item.toLowerCase().includes(lowerCaseSearchTerm)
  );
});
`.trim();

const htmlExample = `
<input [value]="searchTerm()" (input)="searchTerm.set($event.target.value)" />
<ul>
  @for (item of filteredItems(); track $index) {
    <li>{{ item }}</li>
  }
</ul>
`.trim();
