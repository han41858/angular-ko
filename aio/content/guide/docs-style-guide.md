<!--
# Angular documentation style guide
-->
# Angular 문서 작성 스타일 가이드
<!-- formerly Authors Style Guide -->

<!--
This style guide is for anyone who contributes to the Angular documentation (this site).
These guidelines should be followed by all authors.
Deviations must be approved by a documentation editor.

The guidelines described here serve two purposes:

* To ensure a high-quality, consistent experience for Angular documentation users.

* To simplify the writing process for contributing authors.
This guide helps you make decisions about tone, voice, and style.
It also helps you find the right markup quickly.


<div class="alert is-helpful">

This guide is a *living document*; it changes over time.
We strive for consistency to the extent feasible, but you may find parts of our documentation that don't match this style guide.
When in doubt, **follow this guide rather than imitating existing documents.**

</div>
-->
이 문서는 Angular 문서(이 사이트)에 기여하려는 분들을 위한 가이드 문서입니다.
기여자들은 모두 이 가이드라인을 따라야 하며 문서 편집자의 승인을 반영됩니다.

가이드라인을 정하는 이유는 이렇습니다:

* Angular 문서를 보는 사용자들에게 높은 수준의 문서를 일관되게 제공하려고 합니다.

* 문서 작성에 기여하는 과정을 단순하게 만들기 위해서입니다. 문서를 작성할 때 사용할 말투, 스타일을 미리 정해두었기 때문에 필요한 내용을 빠르게 찾을 수 있을 것입니다.


<div class="alert is-helpful">

이 가이드 문서는 *살아있는 문서* 이며 계속 수정됩니다.
되도록 많은 내용을 담도록 확장하고 있지만 이 가이드문서에서 아직 다루지 않는 내용이 있을 수 있습니다.
다른 문서와 충돌하는 내용이 있다면 **이 문서를 최우선 기준으로 삼으세요**.

</div>


<!--
## Scope of these guidelines
-->
## 이 문서에서 다루는 내용

<!--
We ask all contributing authors to adhere to three aspects of style:


* **Writing style:** Word usage, grammar, capitalization, and punctuation.
Adherence to Angular's writing guidelines ensures a consistent "voice", helps ensure accuracy of the information, and facilitates use world-wide, by audiences with different backgrounds.


* **Markup style:** How to include images, tables, alert boxes, and code snippets.
Angular docs are written in Markdown, with custom extensions for this site. Correct markup ensures a consistent look-and-feel, and is essential for the doc to build and function correctly.


* **Angular coding style:** Coding style for example apps and code snippets.
Code examples are encouraged for demonstrating how to apply the concepts and features discussed.
Angular has a custom framework that enables authors to include code snippets directly from example apps that are automatically tested as part of doc builds.
To contribute example code, you must understand Angular itself and the custom framework for Angular doc examples.

For each aspect of style, the following table explains where to find the primary guidelines and what this Angular Documentation Style Guide offers.


Style                    | Guidelines
------------------------ | -------------------------------
**Writing style**        | Primary: [Google Developer Documentation Style Guide](https://developers.google.com/style/)<br />This guide: Specifies any special considerations for Angular docs.
**Markup style**         | Primary: This guide<br />This guide: Specifies guidelines for markup of guides and tutorials, which are written primarily in Markdown.
**Angular coding style** | Primary: [Angular Style Guide](guide/styleguide "Angular Application Code Style Guide").<br />This guide: How to create, store, and include code examples in guides and tutorials.

<div class="alert is-helpful">

Note: Angular API and CLI reference docs are generated from source code and/or related source files, which may have other markup styles and other ways of including code examples.

</div>
-->
이 가이드 문서는 다음 세가지 분야를 다룹니다:

* **문서 스타일:** 문서에 사용하는 단어, 문법, 대소문자 구분, 문장부호.
Angular 가이드문서는 일관된 "말투"로 작성되어야 하며, 정확한 정보를 제공해야 하고, 배경과 관계없이 전세계 개발자들에게 도움이 되어야 합니다.

* **마크업 스타일:** 이미지, 표, 경고 메시지, 예제 코드를 다루는 방법.
Angular 문서는 마크다운(Markdown)으로 작성되며, 필요에 맞게 확장된 형태로 제공됩니다.
마크업 스타일을 확실하게 지켜야 사용자가 보기 편하고, 이 사이트를 빌드할 때 문제가 발생하지 않으며, 의도된 대로 동작할 것입니다.

* **Angular 코딩 스타일:** 애플리케이션이나 예제 코드에 사용하는 코딩 스타일.
Angular의 개념과 기능을 다룰 때 이해하기 쉽도록 코드 예제를 제공하는 것을 권장합니다.
예제로 만든 앱은 Angular 문서 사이트에 직접 들어가기 때문에 Angular 문서를 빌드할 때 자동으로 테스트하도록 구성되어 있습니다.
예제 코드에 기여하고 싶다면 Angular는 물론이고 Angular 문서 사이트가 어떻게 동작하는지 이해해야 합니다.

각 분야에 해당하는 가이드라인이 어떤 내용을 바탕으로 작성되었는지, 이 문서에서는 어떤 내용을 더 다루는지 아래 표를 보면서 확인해 보세요.


스타일                    | 가이드라인
------------------------ | -------------------------------
**문서 스타일**        | 기준: [Google Developer Documentation Style Guide](https://developers.google.com/style/)<br />이 문서: Angular와 관련된 모든 내용을 다룹니다.
**마크업 스타일**         | 기준: 이 문서<br />이 문서: 마크다운으로 작성하는 가이드 문서의 마크업, 튜토리얼을 다룹니다.
**Angular 코딩 스타일** | 기준: [Angular 스타일 가이드](guide/styleguide "Angular Application Code Style Guide").<br />이 문서: Angular 문서에 사용하는 예제 코드를 어떻게 만들고, 관리하는지에 대해 다룹니다.


<div class="alert is-helpful">

참고: Angular API 문서와 CLI 문서는 소스 코드에 있는 코드를 기반으로 자동 생성됩니다.
이 문서에서 설명하는 내용과 다른 스타일로 작성될 수 있습니다.

</div>



<!--
## Doc generation and tooling
-->
## 문서 생성, 관련 툴

<!--
To make changes to the documentation pages and sample code, clone the [Angular github repository](https://github.com/angular/angular "Angular repo") and go to the `aio/` folder.

The [aio/README.md](https://github.com/angular/angular/blob/master/aio/README.md "AIO ReadMe") explains how to install and use the tools to edit and test your changes.

Here are a few essential commands for guide page authors.

1. `yarn setup` &mdash; installs packages; builds docs, stackblitz, and zips.

1. `yarn docs-watch --watch-only` &mdash; watches for saved content changes and refreshes the browser. The (optional) `--watch-only` flag skips the initial docs rebuild.

1. `yarn start`  &mdash;  starts the doc viewer application so you can see your local changes in the browser.

1.  http://localhost:4200/  &mdash;  browse to the app running locally.

You can combine `yarn docs-watch` and `yarn start` into one command with `yarn serve-and-sync`.
-->
Angular 문서를 수정하고 싶다면 [Angular GitHub 코드저장소](https://github.com/angular/angular "Angular repo")를 클론하고 `aio/` 폴더로 이동하세요.

관련 패키지를 어떻게 설치하는지, 문서를 수정하고 테스트할 때는 어떤 툴을 사용해야 하는지는 [aio/README.md](https://github.com/angular/angular/blob/master/aio/README.md "AIO ReadMe") 문서에 작성되어 있습니다.

문서를 수정하면서 사용하는 명령 중 중요한 것 몇가지 살펴보면 이렇습니다.

1. `yarn setup` &mdash; 문서 프로젝트에 필요한 패키지를 설치합니다.

2. `yarn docs-watch --watch-only` &mdash; 파일이 변경되는 것을 감지해서 브라우저를 자동으로 갱신합니다. `--watch-only` 플래그를 사용하면 최초 재빌드를 건너뜁니다.

1. `yarn start` &mdash; 변경한 내용을 브라우저에서 확인할 수 있도록 문서 뷰어 애플리케이션을 시작합니다.

1. http://localhost:4200/ &mdash; 로컬 환경에서 확인할 수 있는 문서 뷰어 애플리케이션입니다.

`yarn docs-watch` 명령과 `yarn start` 명령을 한 번에 실행하려면 `yarn serve-and-sync` 명령을 사용하면 됩니다.


<!--
## Guide pages
-->
## 가이드 문서

<!--
 All but a few guide pages are [markdown](https://daringfireball.net/projects/markdown/syntax "markdown") files with an `.md` extension.

Every guide page file is stored in the `content/guide` directory. Although the [side navigation](#navigation) panel displays as a hierarchy, the directory is flat with no sub-folders.
The flat folder approach allows us to shuffle the apparent navigation structure without moving page files or redirecting old page URLs.

The doc generation process consumes the markdown files in the `content/guide` directory and produces JSON files in the `src/generated/docs/guide` directory, which is also flat. Those JSON files contain a combination of document metadata and HTML content.

The reader requests a page by its Page URL. The doc viewer fetches the corresponding JSON file, interprets it, and renders it as fully-formed HTML page.

Page URLs mirror the `content` file structure. The URL for the page of a guide is in the form `guide/{page-name}`. The page for _this_ "Authors Style Guide" is located at `content/guide/docs-style-guide.md` and its URL is `guide/docs-style-guide`.


<div class="alert is-helpful">

_Tutorial_ pages are exactly like guide pages. The only difference is that they reside in `content/tutorial` instead of `content/guide` and have URLs like `tutorial/{page-name}`.

_API_ pages are generated from Angular source code into the `src/generated/docs/api` directory.
The doc viewer translates URLs that begin `api/` into requests for document JSON files in that directory. This style guide does not discuss creation or maintenance of API pages.

_Marketing_ pages are similar to guide pages. They're located in the `content/marketing` directory. While they can be markdown files, they may be static HTML pages or dynamic HTML pages that render with JSON data.

Only a few people are authorized to write marketing pages. This style guide does not discuss creation or maintenance of marketing pages.

</div>
-->
간단하지만 `.md` 파일 확장자에 대한 모든 내용을 다루고 있는 문서는 [markdown](https://daringfireball.net/projects/markdown/syntax "markdown")에서 확인할 수 있습니다.

가이드 문서 파일은 모두 `content/guide` 디렉토리 안에 있습니다.
[왼쪽 네비게이션](#navigation) 패널은 계층으로 구성되어 있지만, 이 디렉토리에는 하위 폴더가 존재하지 않습니다.
이후에 네비게이션 구조가 변경되더라도 파일 위치를 옮기지 않기 위해 이 방식을 선택했습니다.

문서 프로젝트를 빌드하면 `content/guide` 디렉토리에 있는 마크다운 파일을 JSON 파일로 변환해서 `src/generated/docs/guide` 디렉토리로 옮기는데, 이 디렉토리에도 하위 폴더가 존재하지 않습니다.
이렇게 생성된 JSON 파일에는 문서에 대한 메타데이터와 HTML 문서가 들어 있습니다.

문서 사이트를 방문하는 사용자는 페이지 URL로 문서 화면을 요청합니다.
그러면 문서 뷰어가 해당 JSON 파일을 불러와서, 처리하고 온전한 HTML 문서로 렌더링합니다.

페이지 URL은 `content` 파일의 이름과 같기 때문에 `guide/{문서-이름}`과 같은 형식이 됩니다.
지금 보고 있는 _이 문서_ 라면 `content/guide/doc-style-guide.md` 파일에 원문이 있고, 주소는 `guide/docs-style-guide`가 됩니다.


<div class="alert is-helpful">

_튜토리얼_ 문서도 일반 가이드 문서와 비슷합니다.
`content/guide`가 아니라 `content/tutorial` 디렉토리에 있고 URL이 `tutorial/{문서-이름}`으로 구성된다는 점만 다릅니다.

_API_ 문서는 Angular 소스 코드에 있는 내용을 기반으로 자동 생성된 것이며 `src/generated/docs/api` 디렉토리에 존재합니다.
Angular 문서 뷰어는 `api/`로 시작하는 URL을 확인하면 이 디렉토리에 있는 JSON 문서 파일을 불러옵니다.
API 문서를 생성하고 관리하는 내용은 이 가이드 문서에서 다루지 않습니다.

_마케팅_ 문서도 일반 가이드 문서와 비슷합니다.
이 문서들은 `content/marketing` 디렉토리에 있는데, 개별 문서 파일은 마크다운일 수 있지만 정적 HTML 문서일 수도 있고, JSON 데이터를 렌더링하는 동적 HTML 문서일 수도 있습니다.

마케팅 문서들은 일부 사용자만 수정할 수 있습니다.
마케팅 문서를 생성하고 관리하는 내용은 이 가이드 문서에서 다루지 않습니다.

</div>


<!--
## Markdown and HTML
-->
## 마크다운, HTML

<!--
While documentation guide pages ultimately render as HTML, almost all of them are written in [markdown](https://daringfireball.net/projects/markdown/syntax "markdown").

Markdown is easier to read and to edit than HTML. Many editors (including Visual Studio Code) can render markdown as you type it.

From time to time you'll have to step away from markdown and write a portion of the document in HTML. Markdown allows you to mix HTML and markdown in the same document.

Standard markdown processors don't allow you to put markdown _within_ HTML tags. But the Angular documentation markdown processor **supports markdown within HTML**, as long as you follow one rule:

<div class="alert is-critical">

**Always** follow every opening and closing HTML tag with _a blank line_.

</div>

```html
<div class="alert is-critical">

  **Always** follow every opening and closing HTML tag with _a blank line_.

</div>
```

<div class="alert is-helpful">

  It is customary but not required to _precede_ the _closing HTML_ tag with a blank line as well.

</div>
-->
가이드 문서는 결국 HTML로 렌더링되지만, 문서의 내용은 거의 [마크다운](https://daringfireball.net/projects/markdown/syntax "markdown")으로 작성됩니다.

마크다운은 HTML보다 읽기 쉽고 수정하기도 쉽습니다.
Visual Studio Code와 같은 에디터를 사용한다면 입력한 내용이 어떻게 렌더링 되는지도 바로 확인할 수 있습니다.

때로는 마크다운 문법이 아니라 HTML 문법으로 작성해야 하는 경우도 있습니다.
마크다운 파일에는 마크다운 문법은 물론이고 HTML를 섞어서 사용할 수 있습니다.

보통 마크다운 프로세서는 HTML 태그 _안에_ 마크다운을 작성하지 못하도록 합니다.
하지만 Angular 마크다운 프로세서는 **HTML 안에서도 마크다운을 사용할 수 있도록 지원**합니다.
규칙 하나만 지키면 됩니다:


<div class="alert is-critical">

HTML 태그 앞뒤에 _빈 줄 하나를_ **꼭** 넣으세요

</div>

```html
<div class="alert is-critical">

  HTML 태그 앞뒤에 _빈 줄 하나를_ **꼭** 넣으세요

</div>
```

<div class="alert is-helpful">

  보통은 그렇게 사용하지만 _HTML 닫는 태그 앞_ 에 빈 줄을 추가할 필요는 없습니다.

</div>


<!--
## Title
-->
## 제목

<!--
Every guide document must have a title.

The title should appear at the top of the physical page.
Begin the title with the markdown `#` character. Alternatively, you can write the equivalent `<h1>`.

```html
  # Angular documentation style guide
```

**Only one title (`<h1>`) per document!**

Title text should be in "Sentence case", which means the first word is capitalized and all other words are lower case (unless they are technical terms that are always capitalized, like "Angular").

```html
  # Deprecation policy in Angular
```

**Always follow the title with at least one blank line.**

Note that the corresponding left-nav TOC text should be in "title case", which means that you use capital letters to start the first words and all principal words. Use lower case letters for secondary words such as "in", "of", and "the". The TOC title can also be shortened to fit in the column.
-->
가이드 문서에는 반드시 제목이 있어야 합니다.

제목은 가이드 문서 제일 위에 표시되며, 마크다운 `#` 문자로 시작하세요.
`<h1>` 태그를 사용해도 됩니다.


```html
  # Angular 문서 작성 스타일 가이드
```

**제목(`<h1>`)은 문서마다 한 번만 사용할 수 있습니다!**

제목은 "문장처럼(Sentence case)" 작성합니다.
첫 번째 글자는 대문자로 시작하며 그 다음 글자는 모두 소문자여야 합니다.
"Angular"와 같은 기술 용어는 예외입니다.

```html
  # Deprecation policy in Angular
```

**제목 뒤에 빈 줄을 꼭 넣으세요.**

왼쪽 네비게이션의 TOC는 "제목처럼(title case)" 표시됩니다.
각 단어의 첫 번째 글자는 대문자로 표시되며 "in"이나 "of", "the"와 같은 일부 경우만 소문자로 표시됩니다.
TOC 제목은 칼럼에 맞게 축약될 수 있습니다.


<!--
## Sections
-->
## 섹션

<!--
A typical document is divided into sections.

All heading text should be in "Sentence case", which means the first word is capitalized and all other words are lower case.

**Always follow the section heading with at least one blank line.**

<h2 class="no-toc">
Main section heading
</h2>
There are usually one or more main sections that may be further divided into secondary sections.

Begin a main section heading with the markdown `##` characters. Alternatively, you can write the equivalent `<h2>` HTML tag.

The main section heading should be followed by a blank line and then the content for that heading.

```html
  ## Sections

  A typical document is divided into sections.
```

<h3 class="no-toc">
Secondary section heading
</h3>

A secondary section heading is related to a main heading and _falls textually within_ the bounds of that main heading.

Begin a secondary heading with the markdown `###` characters. Alternatively, you can write the equivalent `<h3>` HTML tag.

The secondary heading should be followed by a blank line and then the content for that heading.

```html
  ### Secondary section heading

  A secondary section ...
```
-->
한 문서는 여러개의 섹션으로 구성됩니다.

섹션의 제목은 "문장처럼(Sentence case)" 작성합니다.
첫 번째 글자는 대문자로, 나머지 글자는 소문자로 작성하면 됩니다.


**섹션 제목 뒤에 빈 줄을 꼭 넣으세요.**

<h2 class="no-toc">
메인 섹션 제목
</h2>

메인 섹션은 세부 섹션 여러개로 구성되기도 합니다.

메인 섹션은 마크다운 `##` 문자로 시작하세요.
`<h2>` HTML 태그를 사용해도 됩니다.

메인 섹션 제목은 본문과 구분하기 위해 메인 섹션 제목 뒤에 반드시 빈 줄이 하나 이상 있어야 합니다.

```html
  ## 섹션

  섹션의 본문이 여기에 들어갑니다.
```


<h3 class="no-toc">
세부 섹션 제목
</h3>

세부 섹션에는 메인 섹션 제목과 관련된 내용 중 일부를 자세하게 설명합니다.

세부 섹션 제목은 마크다운 `###` 문자로 시작합니다.
`<h3>` HTML 태그를 사용해도 됩니다.

세부 섹션 제목은 본문과 구분하기 위해 세부 섹션 제목 뒤에 반드시 빈 줄이 하나 이상 있어야 합니다.

```html
  ### 세부 섹션 제목

  세부 섹션의 본문이 여기에 들어갑니다
```


<!--
#### Additional section headings
-->
#### 더 깊은 섹션의 제목

<!--
Try to minimize the heading depth, preferably only two. But more headings, such as this one, are permitted if they make sense.

**N.B.**:  The [Table-of-contents](#table-of-contents) generator only considers main (`<h2>`) and secondary (`<h3>`) headings.

```html
  #### Additional section headings

  Try to minimize ...
```
-->
목차를 단순하게 유지하기 위해 섹션 제목은 2단계까지만 표시됩니다.
목차에 표시되지는 않겠지만 섹션을 더 세분화 하려면 더 깊은 섹션 제목을 사용해도 됩니다.

**참고**: [목차](#table-of-contents)를 생성하는 제너레이터는 메인 섹션 제목(`<h2>`)과 2차 섹션 제목(`<h3>`)만 추출합니다.

```html
  #### 더 깊은 섹션 제목

  더 깊은 섹션의 본문이 여기에 들어갑니다.
```


{@a table-of-contents}
<!--
## Table of contents
-->
## 목차(Table of contents)

<!--
Most pages display a table of contents (TOC). The TOC appears in the right panel when the viewport is wide. When narrow, the TOC appears in an expandable/collapsible region near the top of the page.

You should not create your own TOC by hand. The TOC is generated automatically from the page's main and secondary section headers.

To exclude a heading from the TOC, create the heading as an `<h2>` or `<h3>` element with a class called 'no-toc'. You can't do this with markdown.

```html
<h3 class="no-toc">
This heading is not displayed in the TOC
</h3>
```

You can turn off TOC generation for the _entire_ page by writing the title with an `<h1>` tag and the `no-toc` class.

```html
<h1 class="no-toc">
A guide without a TOC
</h1>
```
-->
거의 모든 문서에는 목차(Table of contents, TOC)가 표시됩니다.
브라우저 너비가 충분히 크다면 목차가 오른쪽 패널에 표시되는 것을 확인할 수 있습니다.
브라우저 너비가 좁은 상황에서는 문서 제일 위에 접을 수 있는 형태로 표시됩니다.

목차는 수동으로 생성할 필요가 없습니다.
목차는 가이드 문서의 메인 섹션 제목과 세부 섹션 제목을 추출해서 자동으로 생성됩니다.

목차에서 특정 섹션 제목을 제외하려면 `<h2>` 엘리먼트나 `<h3>` 엘리먼트에 `no-toc` 클래스를 추가하면 됩니다.
이 방식은 HTML 엘리먼트로 작성한 섹션 제목에만 사용할 수 있습니다.

```html
<h3 class="no-toc">
이 섹션 제목은 목차에 표시되지 않습니다.
</h3>
```

목차 _전체를_ 생성하지 않으려면 문서 제목을 의미하는 `<h1>` 엘리먼트에 `no-toc` 클래스를 추가하면 됩니다.

```html
<h1 class="no-toc">
목차가 표시되지 않는 가이드 문서
</h1>
```

{@a navigation}
<!--
## Navigation
-->
## 네비게이션

<!--
The navigation links at the top, left, and bottom of the screen are generated from the JSON configuration file, `content/navigation.json`.

The authority to change the `navigation.json` file is limited to a few core team members.
But for a new guide page, you should suggest a navigation title and position in the left-side navigation panel called the "side nav".

Look for the `SideNav` node in `navigation.json`. The `SideNav` node is an array of navigation nodes. Each node is either an _item_ node for a single document or a _header_ node with child nodes.

Find the header for your page. For example, a guide page that describes an Angular feature is probably a child of the `Fundamentals` header.

```html
{
  "title": "Fundamentals",
  "tooltip": "The fundamentals of Angular",
  "children": [ ... ]
}
```

A _header_ node child can be an _item_ node or another _header_ node. If your guide page belongs under a sub-header, find that sub-header in the JSON.

Add an _item_ node for your guide page as a child of the appropriate _header_ node. It probably looks something like this one.

```html
{
  "url": "guide/architecture",
  "title": "Architecture",
  "tooltip": "The basic building blocks of Angular applications."
}
```

A navigation node has the following properties:

* `url`- the URL of the guide page (_item node only_).

* `title`- the text displayed in the side nav.

* `tooltip` - text that appears when the reader hovers over the navigation link.

* `children` - an array of child nodes (_header node only_).

* `hidden` - defined and set true if this is a guide page that should _not_ be displayed in the navigation panel. Rarely needed, it is a way to hide the page from navigation while making it available to readers who should know about it. _This_ "Authors Style Guide" is a hidden page.


<div class="alert is-critical">

Do not create a node that is both a _header_ and an _item_ node. That is, do not specify the `url` property of a _header_ node.

</div>


<div class="alert is-critical">

The current guidelines allow for a three-level navigation structure with two header levels. Don't add a third header level.

</div>
-->
이 사이트 제일 위, 왼쪽, 아래에 표시되는 네비게이션 링크는 `content/navigation.json` 파일을 기준으로 생성된 것입니다.

`navigation.json` 파일을 수정할 권한은 Angular 팀 중에서도 일부만 갖고 있습니다.
하지만 새로운 가이드 문서를 추가하는 경우에는 왼쪽 네비게이션 패널에 표시될 제목과 위치를 제안할 수 있습니다.

`navigation.json` 파일에 있는 `SideNav` 노드를 확인해 보세요.
`SideNav` 노드는 네비게이션 노드의 배열 형태로 구성됩니다.
개별 노드는 문서 하나를 가리키는 _아이템(item)_ 노드이거나 자식 노드를 갖고 있는 _헤더(header)_ 노드입니다.

수정하려는 문서의 헤더를 찾아보세요.
Angular의 기능을 설명하는 가이드 문서는 `Fundamentals` 헤더 노드 안쪽에 있습니다.

```html
{
  "title": "Fundamentals",
  "tooltip": "The fundamentals of Angular",
  "children": [ ... ]
}
```

_헤더_ 노드의 자식 노드는 _아이템_ 노드이거나 또다른 _헤더_ 노드일 수 있습니다.
수정하려는 문서가 세부 헤더 안에 있다면 JSON 파일에서 세부 헤더를 찾아보세요.

_아이템_ 노드는 _헤더_ 노드의 자식으로 추가할 수 있습니다.
이런식으로 구성하면 됩니다.

```html
{
  "url": "guide/architecture",
  "title": "Architecture",
  "tooltip": "The basic building blocks of Angular applications."
}
```

네비게이션 노드는 이런 프로퍼티들로 구성됩니다:

* `url`- 가이드 문서의 URL(아이템 노드에만 존재합니다.)

* `title`- 왼쪽 네비게이션에 표시될 문자열

* `tooltip` - 네비게이션 링크에 마우스를 올렸을 때 표시될 내용

* `children` - 자식 노드 배열(헤더 노드에만 존재합니다.)

* `hidden` - `true`로 지정하면 해당 문서가 네비게이션 패널에 표시되지 않습니다. 일반적으로는 잘 사용되지 않지만, 문서를 작업하는 동안 사용자에게 노출하지 않으려고 지정하는 경우가 종종 있습니다. "Angular 문서 작성 스타일 가이드" 문서에도 `hidden: true`가 지정되어 있습니다.


<div class="alert is-critical">

_헤더_ 노드와 _아이템_ 노드에 동시에 속하는 노드를 만들지 마세요.
_헤더_ 노드에는 `url` 프로퍼티를 사용하지 않습니다.

</div>


<div class="alert is-critical">

현재 가이드라인에서는 헤더 계층을 2단계까지, 네비게이션 계층을 3단계까지만 허용합니다.

</div>


<!--
## Code snippets
-->
## 코드 블럭(Code snippets)

<!--
Guides are rich in examples of working Angular code. Example code can be commands entered in a terminal window, a fragment of TypeScript or HTML, or an entire code file.

Whatever the source, the doc viewer renders them as "code snippets", either individually with the [_code-example_](#code-example "code-example") component or as a tabbed collection with the [_code-tabs_](#code-tabs "code-tabs") component.
-->
Angular 가이드 문서에는 수많은 예제 코드가 있습니다.
예제 코드는 터미널 창에 입력하는 명령일 수 있으며 TypeScript나 HTML 코드의 일부일 수도 있고, 파일에 있는 코드가 전부 표시될 수도 있습니다.

어떤 것을 사용하던지 Angular 문서 뷰어는 이 예제 코드를 [_code-example_](#code-example "code-example") 컴포넌트로 표시하거나, 탭 형태로 표시되는 [_code-tabs_](#code-tabs "code-tabs") 컴포넌트로 표시합니다.


{@a code-example}

<!--
### Code example
-->
### CodeExampleComponent

<!--
You can display a simple, inline code snippet with the markdown backtick syntax.
Use a single backtick on either side of a term when referring to code or the
name of a file in a sentence.
The following are some examples:

* In the `app.component.ts`, add a `logger()` method.
* The `name` property is `Sally`.
* Add the component class name to the `declarations` array.

The markdown is as follows:

```markdown

* In the `app.component.ts`, add a `logger()` method.
* The <code class="no-auto-link">item</code> property is `true`.
* Add the component class name to the `declarations` array.

```
In certain cases, when you apply backticks around a term, it may auto-link to
the API documentation. If you do not intend the term to be a link, use the following
syntax:

```html
The <code class="no-auto-link">item</code> property is `true`.
```

For block code snippets, we generally prefer to display code with
the Angular documentation _code-example_ component represented by the `<code-example>` tag.
The `<code-example>` tag has a `header` attribute that you use to identify the file that the example comes from. The header should be used whenever possible to establish the context of the example.
See [Code snippets and code examples](guide/docs-style-guide#code-snippets-and-code-samples) for more details.

<h3 class="no-toc">Inline code-snippets</h3>

You should source code snippets [from working sample code](#from-code-samples) when possible.
But there are times when an inline snippet is the better choice.

For terminal input and output, put the content between `<code-example>` tags, set the CSS class to `code-shell`, and set the language attribute to `sh` as in this example.

<code-example language="sh" class="code-shell">
  npm start
</code-example>

```html
<code-example language="sh" class="code-shell">
  npm start
</code-example>
```

Inline, hand-coded snippets like this one are _not_ testable and, therefore, are intrinsically unreliable.
This example belongs to the small set of pre-approved, inline snippets that includes
user input in a command shell or the _output_ of some process.

**Do not write inline code snippets** unless you have a good reason and the editor's permission to do so.
In all other cases, code snippets should be generated automatically from tested code samples.

For hypothetical examples such as illustrations of configuration options in a JSON file, you should still use The `<code-example>` tag with the `header` attribute to identify the context.

{@a from-code-samples}

<h3 class="no-toc">Code snippets and code samples</h3>

One of the documentation design goals is that guide page code snippets should be examples of real, working code.

We meet this goal by displaying code snippets that are derived directly from standalone code samples, written specifically for these guide pages.

The author of a guide page is responsible for the code sample that supports that page.
The author must also write end-to-end tests for the sample.

Code samples are located in sub-folders of the `content/examples` directory of the `angular/angular` repository. An example folder name should be the same as the guide page it supports.

<div class="alert is-helpful">

A guide page might not have its own sample code. It might refer instead to a sample belonging to another page.

</div>

The Angular CI process runs all end-to-end tests for every Angular PR. Angular re-tests the samples after every new version of a sample and every new version of Angular itself.

When possible, every snippet of code on a guide page should be derived from a code sample file. You tell the Angular documentation engine which code file - or fragment of a code file - to display by configuring `<code-example>` attributes.
-->
마크다운 역따옴표(`` ` ``) 문법을 활용하면 인라인 코드를 간단하게 표시할 수 있습니다.
코드에 해당하는 구문, 파일 이름에 해당하는 구문 앞뒤에 역따옴표를 추가하면 됩니다.
이런 내용이 있다고 합시다:

* `app.component.ts` 파일에 `logger()` 메서드를 추가합니다.
* `name` 프로퍼티의 값은 `Sally` 입니다.
* `declarations` 배열에 컴포넌트 클래스 이름을 추가하세요.

그렇다면 마크다운은 이렇게 작성합니다:

```markdown

* In the `app.component.ts`, add a `logger()` method.
* The <code class="no-auto-link">item</code> property is `true`.
* Add the component class name to the `declarations` array.

```

사전에 등록된 경우에는 용어에 역따옴표를 지정했을 때 API 문서로 자동으로 연결되는 경우가 있습니다.
이 기능을 비활성화하려면 `no-auto-link` 클래스를 지정하면 됩니다:

```html
The <code class="no-auto-link">item</code> property is `true`.
```

Angular 가이드 문서는 예제 코드를 표시할 때 `<code-example>` 태그에 해당하는 `CodeExampleComponent`를 사용합니다.
이 태그에는 `header` 어트리뷰트를 지정할 수 있는데, 예제 파일이 어떤 경로에 있는지, 이름이 정확히 무엇인지 지정할 때 사용합니다.
예제 코드가 다루는 것이 무엇인지 정확하게 파악할 수 있도록 헤더는 반드시 사용하는 것을 권장합니다.
자세한 내용은 [코드 블럭과 예제 코드](guide/docs-style-guide#code-snippets-and-code-samples) 섹션을 참고하세요.


<h3 class="no-toc">인라인(Inline) 코드 블럭</h3>

되도록이면 [동작하는 애플리케이션의 코드](#from-code-samples)를 참조하는 것이 좋습니다.
하지만 인라인 코드 블럭을 사용하는 것이 더 좋은 경우도 있습니다.

터미널에 입력하는 내용이나 출력되는 내용을 `<code-example>` 태그 안에 넣고 이 태그에 `code-shell` CSS 클래스를 지정한 후에 언어를 `sh`로 지정하면 이렇게 표시됩니다:

<code-example language="sh" class="code-shell">
  npm start
</code-example>

```html
<code-example language="sh" class="code-shell">
  npm start
</code-example>
```

인라인으로 직접 작성한 코드는 테스트할 수 _없기_ 때문에 동작한다고 보장할 수 없습니다.
그래서 이런 방식은 짧은 코드를 사용할 때나, 커맨드 셸에 어떤 값을 입력할 때, 커맨드 셸에서 출력되는 내용을 표시할 때만 제한적으로 사용됩니다.

특별한 이유가 있어서 편집자가 허락하지 않는 한 **인라인 코드 블럭**을 사용하지 마세요.
보통은 테스트가 통과한 예제 코드에서 자동으로 추출하는 방식을 사용해야 합니다.

JSON 파일에 구성하는 환경설정 옵션과 같이 실제로 사용되지 않는 코드를 설명할 때는 `<code-example>` 태그를 사용해도 되며, 해당 내용이 어떤 내용인지 구분할 수 있도록 `header` 어트리뷰트를 지정하는 것을 권장합니다.


{@a from-code-samples}

<h3 class="no-toc">코드 블럭과 예제 코드</h3>

Angular 가이드 문서에서는 실제로 동작하는 예제 코드를 화면에 표시하는 것이 아주 중요합니다.

그래서 저희는 특정 가이드 문서에서 설명하는 내용대로 동작하는 예제 코드를 직접 불러와서 코드 블럭을 표시하고 있습니다.

문서에 표시되는 예제 코드를 관리할 책임은 해당 문서를 작성한 사람에게 있습니다.
문서 작성자는 해당 예제에 대한 엔드-투-엔드 테스트를 반드시 작성해야 합니다.

예제 코드는 `angular/angular` 코드 저장소의 `content/examples` 디렉토리 아래에 있습니다.
예제 폴더의 이름은 이 예제 코드가 사용되는 가이드 문서의 이름과 같습니다.


<div class="alert is-helpful">

가이드 문서에 표시되는 예제 코드가 없을 수 있습니다.
다른 문서에 있는 예제 코드를 참조하는 경우도 있습니다.

</div>


Angular CI는 Angular PR이 있을 때마다 엔드-투-엔드 테스트를 전부 실행합니다.
그리고 예제 코드가 변경되거나 Angular의 새 버전이 나올때마다 모든 테스트를 실행합니다.

되도록이면 가이드 문서에 표시되는 코드 블럭을 예제 코드 파일에서 직접 불러오는 것이 좋습니다.
어떤 파일을 불러왔는지는 `<code-example>` 어트리뷰트 값을 지정해서 화면에 표시할 수 있습니다.


{@a code-snippets-and-code-samples}
<!--
#### Code snippet from a file
-->
#### 파일을 불러와서 코드 블럭 표시하기

<!--
_This_ "Authors Doc Style Guide" has its own sample application, located in the `content/examples/docs-style-guide` folder.

The following _code-example_ displays the sample's `app.module.ts`.

<code-example path="docs-style-guide/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

Here's the brief markup that produced that lengthy snippet:

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  header="src/app/app.module.ts">
</code-example>
```

You identified the snippet's source file by setting the `path` attribute to sample folder's location _within_ `content/examples`.
In this example, that path is  `docs-style-guide/src/app/app.module.ts`.

You added a header to tell the reader where to find the file by setting the `header` attribute.
Following convention, you set the `header` attribute to the file's location within the sample's root folder.

<div class="alert is-helpful">

Unless otherwise noted, all code snippets in this page are derived from sample source code
located in the `content/examples/docs-style-guide` directory.

</div>

<div class="alert is-important">

The doc tooling reports an error if the file identified in the path does not exist **or is _git_-ignored**.

Most `.js` files are _git_-ignored.
If you want to include an ignored code file in your project and display it in a guide you must _un-ignore_ it.

The preferred way to un-ignore a file is to update the `content/examples/.gitignore` like this:

<code-example header="content/examples/.gitignore">
  # my-guide
  !my-guide/src/something.js
  !my-guide/more-javascript*.js
</code-example>

</div>
-->
지금 보고 있는 "Angular 문서 작성 스타일 가이드" 문서에 표시되는 예제 애플리케이션은 `content/examples/docs-style-guide` 폴더에 있습니다.

이 폴더에 있는 `app.module.ts` 파일의 내용은 이렇습니다.

<code-example path="docs-style-guide/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

이 파일의 내용을 코드 블럭으로 표시하려면 마크업을 이렇게 작성하면 됩니다:

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  header="src/app/app.module.ts">
</code-example>
```

코드 블럭에 불러올 소스 파일은 `content/examples` _안에_ 있는 경로를 `path` 어트리뷰트로 지정하면 됩니다.
위 예제에서 `path` 어트리뷰트에 지정된 값은 `docs-style-guide/src/app/app.module.ts` 입니다.

이 파일을 찾을수 있도록 헤더를 추가하려면 `header` 어트리뷰트를 지정하면 됩니다.
보통은 예제 코드의 최상위 폴더를 기준으로 파일 위치를 지정합니다.


<div class="alert is-helpful">

따로 언급하지 않는 한 이 문서에서 다루는 코드 블럭은 모두 `content/examples/docs-style-guide` 디렉토리에 있는 소스 코드에서 불러온 것입니다.

</div>


<div class="alert is-important">

경로로 지정한 파일이 존재하지 않거나 **_git_-ignore** 에 포함되어 있으면 에러가 발생합니다.

`.js` 파일들은 대부분 _git_-ignore에 추가되어 있습니다.
이렇게 제외된 파일을 다시 포함시키고 화면에 표시하려면 이 파일을 _git_-ignore 에서 제외해야 합니다.

가장 좋은 방법은 `content/examples/.gitignore` 파일을 이렇게 수정하는 것입니다:

<code-example header="content/examples/.gitignore">
  # my-guide
  !my-guide/src/something.js
  !my-guide/more-javascript*.js
</code-example>

</div>


#### Code-example attributes

You control the _code-example_ output by setting one or more of its attributes:

* `path`- the path to the file in the `content/examples` folder.

* `header`- the header of the code listing.

* `region`- displays the source file fragment with that region name; regions are identified by _docregion_ markup in the source file, as explained [below](#region "Displaying a code fragment").

* `linenums`- value may be `true`, `false`, or a `number`. When not specified, line numbers default to `false` (i.e. no line numbers are displayed). The rarely used `number` option starts line numbering at the given value. `linenums=4` sets the starting line number to 4.

* `class`- code snippets can be styled with the CSS classes `no-box`, `code-shell`, and `avoid`.

* `hideCopy`- hides the copy button

* `language`- the source code language such as `javascript`, `html`, `css`, `typescript`, `json`, or `sh`. This attribute only works for inline examples.

{@a region}

#### Displaying a code fragment

Often you want to focus on a fragment of code within a sample code file. In this example, you focus on the `AppModule` class and its `NgModule` metadata.

<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class">
</code-example>

First you surround that fragment in the source file with a named _docregion_ as described [below](#source-code-markup).
Then you reference that _docregion_ in the `region` attribute of the `<code-example>` like this


```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class">
</code-example>
```

A couple of observations:

1. The `region` value, `"class"`, is the name of the `#docregion` in the source file. Confirm that by looking at `content/examples/docs-style-guide/src/app/app.module.ts`

1. Omitting the `header` is fine when the source of the fragment is obvious. We just said that this is a fragment of the `app.module.ts` file which was displayed immediately above, in full, with a header.
There's no need to repeat the header.

#### Example of bad code

Sometimes you want to display an example of bad code or bad design.

You should be careful. Readers don't always read carefully and are likely to copy and paste your example of bad code in their own applications. So don't display bad code often.

When you do, set the `class` to `avoid`. The code snippet will be framed in bright red to grab the reader's attention.

Here's the markup for an "avoid" example in the
[_Angular Style Guide_](guide/styleguide#05-03 "Style 05-03: components as elements").

```html
<code-example
  path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts"
  region="example"
  header="app/heroes/hero-button/hero-button.component.ts">
</code-example>
```

<code-example path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" header="app/heroes/hero-button/hero-button.component.ts">
</code-example>

{@a code-tabs}

<!--
### Code Tabs
-->
### CodeTabsComponent

Code tabs display code much like _code examples_ do.  The added advantage is that they can display multiple code samples within a tabbed interface.  Each tab is displayed using _code pane_.

#### Code-tabs attributes

* `linenums`: The value can be `true`, `false` or a number indicating the starting line number. If not specified, it defaults to `false`.

#### Code-pane attributes

* `path` - a file in the content/examples folder
* `header` - seen in the header of a tab
* `linenums` - overrides the `linenums` property at the `code-tabs` level for this particular pane. The value can be `true`, `false` or a number indicating the starting line number. If not specified, it defaults to `false`.

The next example displays multiple code tabs, each with its own header.
It demonstrates control over display of line numbers at both the `<code-tabs>` and `<code-pane>` levels.

<code-tabs linenums="true">
  <code-pane
    header="app.component.html"
    path="docs-style-guide/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="app.component.ts"
    path="docs-style-guide/src/app/app.component.ts"
    linenums="false">
  </code-pane>
  <code-pane
    header="app.component.css (heroes)"
    path="docs-style-guide/src/app/app.component.css"
    region="heroes">
  </code-pane>
  <code-pane
    header="package.json (scripts)"
    path="docs-style-guide/package.1.json">
  </code-pane>
</code-tabs>

Here's the markup for that example.

Note how the `linenums` attribute in the `<code-tabs>` explicitly enables numbering for all panes.
The `linenums` attribute in the second pane disables line numbering for _itself only_.

```html
<code-tabs linenums="true">
  <code-pane
    header="app.component.html"
    path="docs-style-guide/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="app.component.ts"
    path="docs-style-guide/src/app/app.component.ts"
    linenums="false">
  </code-pane>
  <code-pane
    header="app.component.css (heroes)"
    path="docs-style-guide/src/app/app.component.css"
    region="heroes">
  </code-pane>
  <code-pane
    header="package.json (scripts)"
    path="docs-style-guide/package.1.json">
  </code-pane>
</code-tabs>
```

{@a source-code-markup}

## Source code markup

You must add special code snippet markup to sample source code files before they can be displayed by `<code-example>` and `<code-tabs>` components.

<div class="alert is-helpful">

The sample source code for this page, located in `context/examples/docs-style-guide`, contains examples of every code snippet markup described in this section.

</div>

Code snippet markup is always in the form of a comment. Here's the default _docregion_ markup for a TypeScript or JavaScript file:

```
// #docregion
... some code ...
// #enddocregion
```
Different file types have different comment syntax so adjust accordingly.

```html
<!-- #docregion -->
... some HTML ...
<!-- #enddocregion -->
```

```
/* #docregion */
... some CSS ...
/* #enddocregion */
```

The doc generation process erases these comments before displaying them in the doc viewer.
It also strips them from stackblitz and sample code downloads.

<div class="alert is-important">

Code snippet markup is not supported in JSON files because comments are forbidden in JSON files.
See [below](#json-files) for details and workarounds.

</div>


#### _#docregion_

The _#docregion_ is the most important kind of code snippet markup.

The `<code-example>` and `<code-tabs>` components won't display a source code file unless it has a _#docregion_.

The _#docregion_ comment begins a code snippet region.
Every line of code _after_ that comment belongs in the region _until_ the code fragment processor encounters the end of the file or a closing _#enddocregion_.

<div class="alert is-helpful">

The `src/main.ts` is a simple example of a file with a single _#docregion_ at the top of the file.

<code-example
  path="docs-style-guide/src/main.ts"
  header="src/main.ts"></code-example>

</div>

#### Named _#docregions_

You'll often display multiple snippets from different fragments within the same file.
You distinguish among them by giving each fragment its own _#docregion name_ as follows.

```
// #docregion region-name
... some code ...
// #enddocregion region-name
```

Remember to refer to this region by name in the `region` attribute of the `<code-example>` or `<code-pane>` as you did in an example above like this:

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class"></code-example>
```

The _#docregion_ with no name is the _default region_. Do _not_ set the `region` attribute when referring to the default _#docregion_.

#### Nested _#docregions_

You can nest _#docregions_ within _#docregions_
```
// #docregion
... some code ...
// #docregion inner-region
... more code ...
// #enddocregion inner-region
... yet more code ...
/// #enddocregion
```
<div class="alert is-helpful">

The `src/app/app.module.ts` file has a good example of a nested region.

</div>

#### Combining fragments

You can combine several fragments from the same file into a single code snippet by defining
multiple _#docregions_ with the _same region name_.

Examine the `src/app/app.component.ts` file which defines two nested _#docregions_.

The inner, `class-skeleton` region appears twice, once to capture the code that opens the class definition and once to capture the code that closes the class definition.

<code-example>
// #docplaster
...
// #docregion class, class-skeleton
export class AppComponent {
// #enddocregion class-skeleton
  title = 'Authors Style Guide Sample';
  heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
// #docregion class-skeleton
}
// #enddocregion class, class-skeleton
</code-example>

Here's are the two corresponding code snippets displayed side-by-side.

<code-tabs>
  <code-pane
    header="app.component.ts (class)"
    path="docs-style-guide/src/app/app.component.ts"
    region="class">
  </code-pane>
  <code-pane
    header="app.component.ts (class-skeleton)"
    path="docs-style-guide/src/app/app.component.ts"
    region="class-skeleton">
  </code-pane>
</code-tabs>

Some observations:

* The `#docplaster` at the top is another bit of code snippet markup. It tells the processor how to join the fragments into a single snippet.

  In this example, we tell the processor to put the fragments together without anything in between - without any "plaster".  Most sample files define this _empty plaster_.

  If we neglected to add, `#docplaster`, the processor would insert the _default_ plaster - an ellipsis comment - between the fragments. Try removing the `#docplaster` comment yourself to see the effect.

* One `#docregion` comment mentions **_two_** region names as does an `#enddocregion` comment. This is a convenient way to start (or stop) multiple regions on the same code line. You could have put these comments on separate lines and many authors prefer to do so.

#### JSON files

Code snippet markup is not supported for JSON files because comments are forbidden in JSON files.

You can display an entire JSON file by referring to it in the `src` attribute.
But you can't display JSON fragments because you can't add `#docregion` tags to the file.

If the JSON file is too big, you could copy the nodes-of-interest into markdown backticks.

Unfortunately, it's easy to mistakenly create invalid JSON that way. The preferred way is to create a JSON partial file with the fragment you want to display.

You can't test this partial file and you'll never use it in the application. But at least your IDE can confirm that it is syntactically correct.

Here's an example that excerpts certain scripts from `package.json` into a partial file named `package.1.json`.

<code-example
  path="docs-style-guide/package.1.json"
  header="package.json (selected scripts)"></code-example>

```html
<code-example
  path="docs-style-guide/package.1.json"
  header="package.json (selected scripts)"></code-example>
```

#### Partial file naming

Many guides tell a story. In that story, the app evolves incrementally, often with simplistic or incomplete code along the way.

To tell that story in code, you'll often need to create partial files or intermediate versions of the final source code file with fragments of code that don't appear in the final app.

Such partial and intermediate files need their own names.
Follow the doc sample naming convention. Add a number before the file extension as illustrated here:

```html
package.1.json
app.component.1.ts
app.component.2.ts
```

You'll find many such files among the samples in the Angular documentation.

Remember to exclude these files from stackblitz by listing them in the `stackblitz.json` as illustrated here.

<code-example
  path="docs-style-guide/stackblitz.json"
  header="stackblitz.json"></code-example>

{@a live-examples}
## Live examples

By adding `<live-example>` to the page you generate links that run sample code in the Stackblitz live coding environment and download that code to the reader's file system.

Live examples (AKA "stackblitz") are defined by one or more `stackblitz.json` files in the root of a code sample folder. Each sample folder usually has a single unnamed definition file, the default `stackblitz.json`.

<div class="alert is-helpful">

You can create additional, named definition files in the form `name.stackblitz.json`. See `content/examples/testing` for examples.

The schema for a `stackblitz.json` hasn't been documented yet but looking at the `stackblitz.json` files in the example folders should tell you most of what you need to know.

</div>

Adding `<live-example></live-example>` to the page generates the two default links.

<live-example></live-example>

1. a link to the Stackblitz defined by the default `stackblitz.json` file located in the code sample folder with the same name as the guide page.

2. a link that downloads that sample.

Clicking the first link opens the code sample on StackBlitz in a new browser tab.

You can change the appearance and behavior of the live example with attributes and classes.


<h3 class="no-toc">Custom label and tooltip</h3>

Give the live example anchor a custom label and tooltip by setting the `title` attribute.

<live-example title="Live Example with title"></live-example>

```html
<live-example title="Live Example with title"></live-example>
```

You can achieve the same effect by putting the label between the `<live-example>` tags:

<live-example>Live example with content label</live-example>

```html
<live-example>Live example with content label</live-example>
```

<h3 class="no-toc">Live example from another guide</h3>

To link to a Stackblitz in a folder whose name is not the same as the current guide page, set the `name` attribute to the name of that folder.

<live-example name="router">Live Example from the Router guide</live-example>

```html
<live-example name="router">Live Example from the Router guide</live-example>
```

<h3 class="no-toc">Live Example for named Stackblitz</h3>

To link to a Stackblitz defined by a named `stackblitz.json` file, set the `stackblitz` attribute. The following example links to the Stackblitz defined by `second.stackblitz.json` in the current guide's directory.

<live-example stackblitz="second"></live-example>

```html
<live-example stackblitz="second"></live-example>
```

<h3 class="no-toc">Live Example without download</h3>

To skip the download link, add the `noDownload` attribute.

<live-example noDownload>Just the Stackblitz</live-example>

```html
<live-example noDownload>Just the Stackblitz</live-example>
```

<h3 class="no-toc">Live Example with download-only</h3>

To skip the live Stackblitz link and only link to the download, add the `downloadOnly` attribute.

<live-example downloadOnly>Download only</live-example>

```html
<live-example downloadOnly>Download only</live-example>
```

<h3 class="no-toc">Embedded live example</h3>

By default, a live example link opens a Stackblitz in a separate browser tab.
You can embed the Stackblitz within the guide page itself by adding the `embedded` attribute.

For performance reasons, the Stackblitz does not start right away. The reader sees an image instead. Clicking the image starts the sometimes-slow process of launching the embedded Stackblitz within an iframe on the page.

Here's an embedded live example for this guide.

```html
<live-example embedded></live-example>
```

<live-example embedded></live-example>

{@a anchors}

## Anchors

Every section header tag is also an anchor point. Another guide page could add a link to this section by writing:

<div class="alert is-helpful">

See the ["Anchors"](guide/docs-style-guide#anchors "Style Guide - Anchors") section for details.

</div>

```html
<div class="alert is-helpful">

See the ["Anchors"](guide/docs-style-guide#anchors "Style Guide - Anchors") section for details.

</div>
```

When navigating within the page, you can omit the page URL when specifying the link that [scrolls up](#anchors "Anchors") to the beginning of this section.

```html
... the link that [scrolls up](#anchors "Anchors") to ...
```

{@a ugly-anchors}

#### Ugly, long section header anchors

It is often a good idea to *lock-in* a good anchor name.

Sometimes the section header text makes for an unattractive anchor. [This one](#ugly-long-section-header-anchors) is pretty bad.

```html
[This one](#ugly-long-section-header-anchors) is pretty bad.
```

The greater danger is that **a future rewording of the header text would break** a link to this section.

For these reasons, it is often wise to add a custom anchor explicitly, just above the heading or
text to which it applies, using the special `{@a name}` syntax like this.

<code-example  language="html">
  &#123;@a ugly-anchors&#125;

  #### Ugly, long section header anchors
</code-example>

Now [link to that custom anchor name](#ugly-anchors) as you did before.

```html
Now [link to that custom anchor name](#ugly-anchors) as you did before.
```

<div class="alert is-helpful">

Alternatively, you can use the HTML `<a>` tag.

If you do, be sure to set the `id` attribute - not the `name` attribute! The docs generator will not convert the `name` to the proper link URL.

```html
<a id="anchors"></a>

## Anchors
```

</div>

## Alerts and Callouts

Alerts and callouts present warnings, extra detail or references to other pages. They can also be used to provide commentary that _enriches_ the reader's understanding of the content being presented.

An alert or callout _must not_ contain anything _essential_ to that understanding. Don't put a critical instruction or a tutorial step in a subsection.

### Alerts

Alerts draw attention to short important points. Alerts should not be used for multi-line content (use [callouts](#callouts "callouts") instead).

<div class="alert is-helpful">

  You'll learn about styles for live examples in the [section below](guide/docs-style-guide#live-examples "Live examples").

</div>

  Note that at least one blank line must follow both the opening and closing `<div>` tags. A blank line before the closing `</div>` is customary but not required.

```html
<div class="alert is-helpful">

You'll learn about styles for live examples in the [section below](guide/docs-style-guide#live-examples "Live examples").

</div>
```

There are three different _urgency levels_ used to style the alerts based on the severity or importance of the content.

<div class="alert is-critical">

A critical alert.

</div>

<div class="alert is-important">

An important alert.

</div>

<div class="alert is-helpful">

A helpful, informational alert.

</div>


Here is the markup for these alerts.
```html
<div class="alert is-critical">

A critical alert.

</div>

<div class="alert is-important">

An important alert.

</div>

<div class="alert is-helpful">

A helpful, informational alert.

</div>
```

### Callouts

Callouts, like alerts, are meant to draw attention to important points. Use a callout when you want a riveting header and multi-line content.

If you have more than two paragraphs, consider creating a new page or making it part of the main content.

Callouts use the same _urgency levels_ that alerts do.

<div class="callout is-critical">
<header>A critical point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

</div>

<div class="callout is-important">
<header>An important point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

</div>

<div class="callout is-helpful">
<header>A helpful or informational point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

</div>

Here is the markup for the first of these callouts.
```html
<div class="callout is-critical">
<header>A critical point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

</div>
```

Notice that:
* the callout header text is forced to all upper case
* the callout body can be written in markdown
* a blank line separates the `</header>` tag from the markdown content

Callouts are meant to grab the user's attention. They are not for casual asides. Please use them sparingly.

## Trees

Trees can represent hierarchical data.

<div class='filetree'>

  <div class='file'>
    sample-dir
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>

Here is the markup for this file tree.

```html
<div class='filetree'>
    <div class='file'>
        sample-dir
    </div>
    <div class='children'>
        <div class='file'>
          src
        </div>
        <div class='children'>
            <div class='file'>
              app
            </div>
            <div class='children'>
                <div class='file'>
                  app.component.ts
                </div>
                <div class='file'>
                  app.module.ts
                </div>
            </div>
            <div class='file'>
              styles.css
            </div>
            <div class='file'>
              tsconfig.json
            </div>
        </div>
        <div class='file'>
          node_modules ...
        </div>
        <div class='file'>
          package.json
        </div>
    </div>
</div>
```


## Tables

Use HTML tables to present tabular data.


<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Framework</th>
    <th>Task</th>
    <th>Speed</th>
  </tr>
  <tr>
    <td><code>AngularJS</code></td>
    <td>Routing</td>
    <td>Fast</td>
  </tr>
  <tr>
    <td><code>Angular v2</code></td>
    <td>Routing</td>
    <!-- can use markdown too; remember blank lines -->
    <td>

      *Faster*

    </td>
  </tr>
  <tr>
    <td><code>Angular v4</code></td>
    <td>Routing</td>
    <td>

      **Fastest :)**

    </td>
  </tr>
</table>

Here is the markup for this table.

```html
<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Framework</th>
    <th>Task</th>
    <th>Speed</th>
  </tr>
  <tr>
    <td><code>AngularJS</code></td>
    <td>Routing</td>
    <td>Fast</td>
  </tr>
  <tr>
    <td><code>Angular v2</code></td>
    <td>Routing</td>
    <!-- can use markdown too; remember blank lines -->
    <td>

      *Faster*

    </td>
  </tr>
  <tr>
    <td><code>Angular v4</code></td>
    <td>Routing</td>
    <td>

      **Fastest :)**

    </td>
  </tr>
</table>
```

## Images

<h3 class="no-toc">Image location</h3>

Store images in the `content/images` directory in a folder with the same URL as the guide page.
Images for this "Authors Style Guide" page belong in the `content/images/guide/docs-style-guide` folder.

Angular doc generation copies these image folders to the _runtime_ location, `generated/images`.
Set the image `src` attribute to begin in _that_ directory.

Here's the `src` attribute for the "flying hero" image belonging to this page.
```
src="generated/images/guide/docs-style-guide/flying-hero.png"
```

<h3 class="no-toc">Use the HTML <i>&lt;img&gt;</i> tag</h3>

**Do not use the markdown image syntax, \!\[\.\.\.\]\(\.\.\.\).**

Images should be specified in an `<img>` tag.

For accessibility, always set the `alt` attribute with a meaningful description of the image.

You should nest the `<img>` tag within a `<div class="lightbox">` tag, which styles the image within a drop-shadow frame. You'll need the editor's permission to skip the `lightbox` class on its `div` encapsulation.

Here's a conforming example

<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying hero">
</div>

```html
<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying hero">
</div>
```

_Note that the HTML image element does not have a closing tag._

<h3 class="no-toc">Image dimensions</h3>

The doc generator reads the image dimensions from the file and adds width and height attributes to the `img` tag automatically. If you want to control the size of the image, supply your own width and height attributes.

Here's the "flying hero" at a more reasonable scale.

<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="200">
</div>

```html

<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="200">
</div>
```

Wide images can be a problem. Most browsers try to rescale the image but wide images may overflow the document in certain viewports.

**Do not set a width greater than 700px**. If you wish to display a larger image, provide a link to the actual image that the user can click on to see the full size image separately as in this example of `source-map-explorer` output from the "Ahead-of-time Compilation" guide:

<a href="generated/images/guide/docs-style-guide/toh-pt6-bundle.png" title="Click to view larger image">
  <div class="lightbox">
    <img src="generated/images/guide/docs-style-guide/toh-pt6-bundle-700w.png" alt="toh-pt6-bundle" width="300px">
  </div>
</a>

<h3 class="no-toc">Image compression</h3>

Large image files can be slow to load, harming the user experience. Always compress the image.
Consider using an image compression web site such as [tinypng](https://tinypng.com/ "tinypng").

<h3 class="no-toc">Floating images</h3>

You can float the image to the left or right of text by applying the class="left" or class="right" attributes respectively.

<img src="generated/images/guide/docs-style-guide/flying-hero.png"
   alt="flying Angular hero"
   width="200"
   class="left">

This text wraps around to the right of the floating "flying hero" image.

Headings and code-examples automatically clear a floating image. If you need to force a piece of text to clear a floating image, add `<br class="clear">` where the text should break.

<br class="clear">

The markup for the above example is:

```html
<img src="generated/images/guide/docs-style-guide/flying-hero.png"
   alt="flying Angular hero"
   width="200"
   class="left">

This text wraps around to the right of the floating "flying hero" image.

Headings and code-examples automatically clear a floating image. If you need to force a piece of text to clear a floating image, add `<br class="clear">` where the text should break.

<br class="clear">
```

Note that you generally don't wrap a floating image in a `<figure>` element.

#### Floating within a subsection

If you have a floating image inside an alert, callout, or a subsection, it is a good idea to apply the `clear-fix` class to the `div` to ensure that the image doesn't overflow its container. For example:

<div class="alert is-helpful clear-fix">

  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="100"
    class="right">

  A subsection with **markdown** formatted text.

</div>

```html
<div class="alert is-helpful clear-fix">

  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="100"
    class="right">

  A subsection with **markdown** formatted text.

</div>
```
