import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {LocationService} from 'app/shared/location.service';
import {SearchResults} from 'app/search/interfaces';
import {SearchService} from 'app/search/search.service';

@Component({
  selector: 'aio-file-not-found-search',
  template: `<div class="alert is-helpful">
      <p *ngIf="redirectedFrom">Angular v{{ redirectedFrom }} 문서에서 이동하셨나요? 현재 버전에는 해당 내용이 존재하지 않습니다.</p>
      <p>이런 내용은 어떠세요?</p>
    </div>
    <aio-search-results
      class="embedded"
      [searchResults]="searchResults | async"
    ></aio-search-results>`,
})
export class FileNotFoundSearchComponent implements OnInit {
  searchResults: Observable<SearchResults>;
  redirectedFrom: number | null = null;
  constructor(private location: LocationService, private search: SearchService) {}

  ngOnInit() {
    this.searchResults = this.location.currentPath.pipe(switchMap(path => {
      const query = path.split(/\W+/).join(' ');
      return this.search.search(query);
    }));

    this.redirectedFrom = this.getRedirectedFromParam();
  }

  private getRedirectedFromParam(): number | null {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirected_from = urlSearchParams.get('redirected_from');
    return redirected_from ? parseInt(redirected_from, 10) : null;
  }
}
