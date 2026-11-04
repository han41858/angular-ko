/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {h} from 'preact';
import {convertSectionNameToId} from '../transforms/reference-section-id.mjs';
import {SECTION_HEADING} from '../styling/css-classes.mjs';

// Keep the original names for fragment IDs and CLI card keys; localize only visible text.
const SECTION_LABELS: Record<string, string> = {
  'Arguments': '인수',
  'Options': '옵션',
  'Description': '설명',
  'Exported by': '다음 모듈에서 내보냄',
  'Usage Notes': '사용 시 참고사항',
  'Pipe usage': '파이프 사용법',
};

/** Component to render the API section. */
export function SectionHeading(props: {name: string}) {
  const id = convertSectionNameToId(props.name);
  const displayName = SECTION_LABELS[props.name] ?? props.name;
  const label = displayName + ' 섹션으로 이동';

  return (
    <h2 id={id} class={SECTION_HEADING}>
      <a class="docs-anchor" href={'#' + id} aria-label={label} tabIndex={-1}>
        {displayName}
      </a>
    </h2>
  );
}
