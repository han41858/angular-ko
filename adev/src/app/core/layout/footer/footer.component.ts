/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Component} from '@angular/core';
import {ExternalLink} from '@angular/docs';
import {RouterLink} from '@angular/router';
import {version} from '../../../../../../package.json';
import {ANGULAR_LINKS} from '../../constants/links';

@Component({
  selector: 'footer[adev-footer]',
  imports: [ExternalLink, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class Footer {
  // Local framework builds are unstamped (0.0.0); show the repository release in the footer only.
  protected angularVersion = version;
  protected ngLinks = ANGULAR_LINKS;
}
