/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Fragment, h, HTMLAttributes} from 'preact';
import {EntryType, isDocEntryWithSourceInfo, PipeEntry} from '../entities.mjs';
import {DocEntryRenderable, PipeEntryRenderable} from '../entities/renderables.mjs';
import {
  HEADER_CLASS_NAME,
  HEADER_ENTRY_CATEGORY,
  HEADER_ENTRY_LABEL,
  HEADER_ENTRY_TITLE,
} from '../styling/css-classes.mjs';
import {DocsPillRow} from './docs-pill-row';

/** Component to render a header of the API page. */
export function HeaderApi(props: {
  entry: DocEntryRenderable | PipeEntryRenderable;
  showFullDescription?: boolean;
  hideDescription?: boolean;
}) {
  const entry = props.entry;

  // TODO: This link point to the main branch.
  // When ADEV is not deployed on the main branch branch anymore,
  // We should update it to point to the tag of the released version which ADEV runs on.

  const sourceUrl = sourceUrlForEntry(entry);

  return (
    <header className={HEADER_CLASS_NAME}>
      <span className={HEADER_ENTRY_CATEGORY}>{entry.moduleName}</span>

      <div className={HEADER_ENTRY_TITLE}>
        <div>
          <h1>{entry.name}</h1>
          <div className={`${HEADER_ENTRY_LABEL} type-${entry.entryType.toLowerCase()} full`}>
            {getEntryTypeDisplayName(entry.entryType)}
          </div>
          {statusTag(entry)}
          {entry.entryType === EntryType.Pipe && !(entry as PipeEntry).isPure && (
            <div className={`${HEADER_ENTRY_LABEL} type-impure-pipe full`}>비순수</div>
          )}
        </div>
        {sourceUrl && (
          <a
            class="docs-github-links"
            target="_blank"
            href={sourceUrl}
            title="소스 보기"
            aria-label="소스 보기"
          >
            <i role="presentation" aria-hidden="true" class="material-symbols-outlined">
              code
            </i>
          </a>
        )}
      </div>

      {!props.hideDescription && (
        <section
          className={'docs-reference-description'}
          dangerouslySetInnerHTML={{
            __html: props.showFullDescription ? entry.htmlDescription : entry.shortHtmlDescription,
          }}
        ></section>
      )}

      <DocsPillRow links={entry.additionalLinks} />
    </header>
  );
}

function statusTag(entry: DocEntryRenderable) {
  let tag: HTMLAttributes<HTMLDivElement> | null = null;

  // Cascading Deprecated > Stable > Developer Preview > Experimental

  if (entry.deprecated) {
    tag = (
      <div className={`${HEADER_ENTRY_LABEL} type-deprecated full`}>
        {tagInVersionString('사용 중단 권고', entry.deprecated)}
      </div>
    );
  } else if (entry.stable) {
    tag = (
      <div className={`${HEADER_ENTRY_LABEL} type-stable full`}>
        {tagInVersionString('안정화', entry.stable)}
      </div>
    );
  } else if (entry.developerPreview) {
    tag = (
      <div className={`${HEADER_ENTRY_LABEL} type-developer_preview full`}>
        <a href="/reference/releases#developer-preview">
          {tagInVersionString('개발자 미리보기', entry.developerPreview)}
        </a>
      </div>
    );
  } else if (entry.experimental) {
    tag = (
      <div className={`${HEADER_ENTRY_LABEL} type-experimental full`}>
        <a href="/reference/releases#experimental">
          {tagInVersionString('실험적', entry.experimental)}
        </a>
      </div>
    );
  }

  return tag;
}

function tagInVersionString(label: string, tag: {version: string | undefined} | undefined) {
  if (tag?.version) {
    return (
      <>
        <span className="status-label">{label}</span>
        <span className="status-version">v{tag.version}부터</span>
      </>
    );
  }

  return <>{label}</>;
}

function getEntryTypeDisplayName(entryType: EntryType | string): string {
  switch (entryType) {
    case EntryType.Block:
      return '블록';
    case EntryType.Component:
      return '컴포넌트';
    case EntryType.Constant:
      return '상수';
    case EntryType.Decorator:
      return '데코레이터';
    case EntryType.Directive:
      return '디렉티브';
    case EntryType.Element:
      return '엘리먼트';
    case EntryType.Enum:
      return '열거형';
    case EntryType.Function:
      return '함수';
    case EntryType.Interface:
      return '인터페이스';
    case EntryType.Pipe:
      return '파이프';
    case EntryType.NgModule:
      return 'NgModule';
    case EntryType.TypeAlias:
      return '타입 별칭';
    case EntryType.UndecoratedClass:
      return '클래스';
    case EntryType.InitializerApiFunction:
      return '초기화 API';
  }
  return entryType;
}

function sourceUrlForEntry(entry: DocEntryRenderable): string | null {
  if (!isDocEntryWithSourceInfo(entry)) {
    return null;
  }

  if (entry.source.filePath.includes('node_modules')) {
    // We don't know the source path in external repos link the CLI
    return null;
  } else {
    const filePath = entry.source.filePath.replace(/^\//, '');
    return `https://github.com/${entry.repo}/blob/main/${filePath}#L${entry.source.startLine}-L${entry.source.endLine}`;
  }
}
