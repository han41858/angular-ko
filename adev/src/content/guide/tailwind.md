<!--
# Using Tailwind CSS with Angular
-->

<a id="using-tailwind-css-with-angular"></a>

# Angular에서 Tailwind CSS 사용하기

<!--
[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that can be used to build modern websites without ever leaving your HTML. This guide will walk you through setting up Tailwind CSS in your Angular project.
-->

[Tailwind CSS](https://tailwindcss.com/)는 HTML을 벗어나지 않고도 현대적인 웹사이트를 만들 수 있는 유틸리티 우선 CSS 프레임워크입니다.
이 가이드에서는 Angular 프로젝트에 Tailwind CSS를 설정하는 방법을 알아봅니다.

<!--
## Automated Setup with `ng add`
-->

<a id="automated-setup-with-ng-add"></a>

## `ng add`로 자동 설정하기

<!--
Angular CLI provides a streamlined way to integrate Tailwind CSS into your project using the `ng add` command. This command automatically installs the necessary packages, configures Tailwind CSS, and updates your project's build settings.

First, navigate to your Angular project's root directory in a terminal and run the following command:

```shell
ng add tailwindcss
```

This command performs the following actions:

- Installs `tailwindcss` and its peer dependencies.
- Configures the project to use Tailwind CSS.
- Adds the Tailwind CSS `@import` statement to your styles.

After running `ng add tailwindcss`, you can immediately start using Tailwind's utility classes in your component templates.
-->

Angular CLI는 `ng add` 명령으로 프로젝트에 Tailwind CSS를 간편하게 통합하는 방법을 제공합니다.
이 명령은 필요한 패키지를 자동으로 설치하고 Tailwind CSS를 구성하며 프로젝트의 빌드 설정을 갱신합니다.

먼저 터미널에서 Angular 프로젝트의 최상위 디렉터리로 이동한 뒤 다음 명령을 실행하세요.

```shell
ng add tailwindcss
```

이 명령은 다음 작업을 수행합니다.

- `tailwindcss`와 피어 의존성을 설치합니다.
- Tailwind CSS를 사용하도록 프로젝트를 설정합니다.
- 스타일에 Tailwind CSS `@import` 구문을 추가합니다.

`ng add tailwindcss`를 실행한 후에는 컴포넌트 템플릿에서 Tailwind 유틸리티 클래스를 바로 사용할 수 있습니다.

<!--
## Manual Setup (Alternative Method)
-->

<a id="manual-setup-alternative-method"></a>

## 수동 설정하기(다른 방법)

<!--
If you prefer to set up Tailwind CSS manually, follow these steps:
-->

Tailwind CSS를 수동으로 설정하려면 다음 단계를 진행하세요.

<!--
### 1. Create an Angular project
-->

<a id="1-create-an-angular-project"></a>

### 1. Angular 프로젝트 생성하기

<!--
First, create a new Angular project if you don't have one set up already.

```shell
ng new my-project
cd my-project
```
-->

아직 프로젝트가 없다면 먼저 Angular 프로젝트를 새로 만드세요.

```shell
ng new my-project
cd my-project
```

<!--
### 2. Install Tailwind CSS
-->

<a id="2-install-tailwind-css"></a>

### 2. Tailwind CSS 설치하기

<!--
Next, open a terminal in your Angular project's root directory and run the following command to install Tailwind CSS and its peer dependencies:

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
</docs-code-multifile>
-->

이제 Angular 프로젝트의 최상위 디렉터리에서 터미널을 열고 다음 명령을 실행해 Tailwind CSS와 피어 의존성을 설치하세요.

<docs-code-multifile>
  <docs-code header="npm" language="shell">
    npm install tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="yarn" language="shell">
    yarn add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="pnpm" language="shell">
    pnpm add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
  <docs-code header="bun" language="shell">
    bun add tailwindcss @tailwindcss/postcss postcss
  </docs-code>
</docs-code-multifile>

<!--
### 3. Configure PostCSS Plugins
-->

<a id="3-configure-postcss-plugins"></a>

### 3. PostCSS 플러그인 설정하기

<!--
Next, add a `.postcssrc.json` file in the file root of the project.
Add the `@tailwindcss/postcss` plugin into your PostCSS configuration.

```json {header: '.postcssrc.json'}
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```
-->

다음으로 프로젝트 최상위 경로에 `.postcssrc.json` 파일을 추가하세요.
PostCSS 설정에 `@tailwindcss/postcss` 플러그인을 추가하세요.

```json {header: '.postcssrc.json'}
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

<!--
### 4. Import Tailwind CSS
-->

<a id="4-import-tailwind-css"></a>

### 4. Tailwind CSS 불러오기

<!--
Add an `@import` to `./src/styles.css` that imports Tailwind CSS.

```css {header: "src/styles.css"}
@import 'tailwindcss';
```

If you're using SCSS, add `@use` to `./src/styles.scss`.

```scss {header: "src/styles.scss"}
@use 'tailwindcss';
```
-->

`./src/styles.css`에 Tailwind CSS를 불러오는 `@import` 구문을 추가하세요.

```css {header: "src/styles.css"}
@import 'tailwindcss';
```

SCSS를 사용한다면 `./src/styles.scss`에 `@use` 구문을 추가하세요.

```scss {header: "src/styles.scss"}
@use 'tailwindcss';
```

<!--
### 5. Start using Tailwind in your project
-->

<a id="5-start-using-tailwind-in-your-project"></a>

### 5. 프로젝트에서 Tailwind 사용하기

<!--
You can now start using Tailwind's utility classes in your component templates to style your application. Run your build process with `ng serve` and you should see the styled heading.

For example, you can add the following to your `app.html` file:

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```
-->

이제 컴포넌트 템플릿에서 Tailwind 유틸리티 클래스로 애플리케이션의 스타일을 지정할 수 있습니다.
`ng serve`로 빌드 과정을 실행하면 스타일이 적용된 제목이 표시됩니다.

예를 들어 `app.html` 파일에 다음 코드를 추가할 수 있습니다.

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```

<!--
## Additional Resources
-->

<a id="additional-resources"></a>

## 추가 자료

<!--
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-->

- [Tailwind CSS 문서](https://tailwindcss.com/docs)
