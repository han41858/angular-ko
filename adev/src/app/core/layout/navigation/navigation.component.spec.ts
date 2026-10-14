/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Navigation} from './navigation.component';
import {provideRouter} from '@angular/router';
import {By} from '@angular/platform-browser';
import {Theme, ThemeManager} from '../../services/theme-manager.service';
import {Version, signal} from '@angular/core';
import {of} from 'rxjs';
import {VersionManager} from '../../services/version-manager.service';
import {Search, WINDOW} from '@angular/docs';
import {PAGE_PREFIX} from '../../constants/pages';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;

  const fakeThemeManager = {
    theme: signal<Theme>('dark'),
    setTheme: (theme: Theme) => {},
    themeChanged$: of(),
  };

  const fakeVersionManager = {
    currentDocsVersion: signal('v17'),
    currentDocsVersionMode: signal('stable'),
    versions: signal<Version[]>([]),
  };

  const fakeWindow = {};
  const fakeSearch = {};

  beforeEach(async () => {
    fakeThemeManager.theme.set('dark');
    TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        provideRouter([]),
        {
          provide: WINDOW,
          useValue: fakeWindow,
        },
        {
          provide: Search,
          useValue: fakeSearch,
        },
      ],
    });

    TestBed.overrideProvider(ThemeManager, {useValue: fakeThemeManager});
    TestBed.overrideProvider(VersionManager, {useValue: fakeVersionManager});

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should append active class to DOCS_ROUTE when DOCS_ROUTE is active', async () => {
    component.activeRouteItem.set(PAGE_PREFIX.DOCS);

    await fixture.whenStable();

    const docsLink = fixture.debugElement.query(By.css('a[href="/docs"]')).parent?.nativeElement;

    expect(docsLink).toHaveClass('adev-nav-item--active');
  });

  it('should not have active class when activeRouteItem is null', async () => {
    component.activeRouteItem.set(null);

    await fixture.whenStable();

    const docsLink = fixture.debugElement.query(By.css('a[href="/docs"]')).nativeElement;
    const referenceLink = fixture.debugElement.query(By.css('a[href="/reference"]')).nativeElement;

    expect(docsLink).not.toHaveClass('adev-nav-item--active');
    expect(referenceLink).not.toHaveClass('adev-nav-item--active');
  });

  it('should call themeManager.setTheme(dark) when user tries to set dark theme', async () => {
    const openThemePickerButton = fixture.debugElement.query(
      By.css('button[aria-label^="테마 변경. 현재 테마:"]'),
    ).nativeElement;
    const setThemeSpy = spyOn(fakeThemeManager, 'setTheme');

    openThemePickerButton.click();
    await fixture.whenStable();

    const setDarkModeButton = fixture.debugElement.query(
      By.css('button[aria-label="어두운 테마 적용"]'),
    ).nativeElement;

    setDarkModeButton.click();

    expect(setThemeSpy).toHaveBeenCalledOnceWith('dark');
  });

  for (const [theme, label] of [
    ['dark', '어두운 테마'],
    ['light', '밝은 테마'],
    ['auto', '시스템 설정'],
  ] as const) {
    it(`should announce the ${theme} theme in Korean`, async () => {
      fakeThemeManager.theme.set(theme);
      await fixture.whenStable();

      const themePicker = fixture.debugElement.query(
        By.css('button[aria-controls="theme-mini-menu"]'),
      ).nativeElement;

      expect(themePicker.getAttribute('aria-label')).toBe(`테마 변경. 현재 테마: ${label}`);
    });
  }
});
