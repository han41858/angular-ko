<!--
# Tour of Heroes application and tutorial
-->
# 히어로들의 여행 튜토리얼

<!--
<div class="callout is-helpful">

<header>Getting Started</header>

In this tutorial, you build your own Angular application from the start.
This is a good way to experience a typical development process as you learn Angular application-design concepts, tools, and terminology.

If you're new to Angular, try the [**Try it now**](start) quick-start application first.
**Try it now** is based on a ready-made  partially completed project.
You can edit the application in StackBlitz and see the results in real time.

**Try it now** covers the same major topics &mdash;components, template syntax, routing, services, and accessing data using HTTP&mdash; in a condensed format, following best practices.

</div>

This *Tour of Heroes* tutorial provides an introduction to the fundamentals of Angular and shows you how to:

* Set up your local Angular development environment.
* Use the [Angular CLI](cli "CLI command reference") to develop an application

The *Tour of Heroes* application that you build helps a staffing agency manage its stable of heroes.
The application has many of the features that you'd expect to find in any data-driven application.

The finished application:

* Gets a list of heroes
* Displays the heroes in a list
* Edits a selected hero's details
* Navigates between different views of heroic data

This tutorial helps you gain confidence that Angular can do whatever you need it to do by showing you how to:

*   Use Angular [directives](guide/glossary#directive "Directives definition") to show and hide elements and display lists of hero data.
*   Create Angular [components](guide/glossary#component "Components definition") to display hero details and show an array of heroes.
*   Use one-way [data binding](guide/glossary#data-binding "Data binding definition") for read-only data.
*   Add editable fields to update a model with two-way data binding.
*   Bind component methods to user events, like keystrokes and clicks.
*   Enable users to select a hero from a list and edit that hero in the details view.
*   Format data with [pipes](guide/glossary#pipe "Pipe definition").
*   Create a shared [service](guide/glossary#service "Service definition") to assemble the heroes.
*   Use [routing](guide/glossary#router "Router definition") to navigate among different views and their components.

<div class="callout is-helpful">

<header>Solution</header>

After you complete all tutorial steps, the final application looks like this example.

<live-example name="toh-pt6"></live-example>.

</div>
-->
<div class="callout is-helpful">

<header>시작하기</header>

이 튜토리얼은 Angular 애플리케이션을 생성하는 것부터 시작합니다.
단계별로 기능을 붙여 나가면서 Angular의 설계 구조, Angular 앱 개발에 사용할 수 있는 툴, 용어에 대해 자세하게 알아봅시다.

아직 Angular에 익숙하지 않다면 [**사용해보기**](start) 문서를 먼저 보는 것을 권장합니다.
**사용해보기** 문서에서는 이미 만들어진 프로젝트를 기반으로 설명합니다.
이 애플리케이션은 StackBlitz 개발환경에 구성되어 있기 때문에 실시간으로 직접 수정해볼 수 있습니다.

사용해보기 문서에서도 컴포넌트, 템플릿 문법, 라우팅, 서비스, HTTP로 데이터 가져오기 등 이 문서와 같은 주제를 다룹니다.
그래서 이미 동작하는 앱에서 이 내용을 간략하게 알아보고 난 후에 이 문서에서 자세하게 알아보는 것을 권장합니다.

</div>

*히어로들의 여행* 튜토리얼은 이런 내용을 다룹니다:

* 로컬 개발환경 설정하기
* 애플리케이션을 개발하는 동안 [Angular CLI](cli "CLI command reference") 활용하기

*히어로들의 여행* 앱은 히어로를 관리하는 앱입니다.
그리고 이 앱에는 데이터 기반 애플리케이션에서 활용할만한 기능을 다양하게 구현해 봅니다.

애플리케이션을 완성하고 나면:

* 서버에서 히어로 목록을 받아옵니다.
* 화면에 히어로 목록을 표시합니다.
* 히어로를 선택하고 상세정보를 수정합니다.
* 히어로에 해당하는 화면으로 이동할 수 있습니다.

튜토리얼을 끝내고 나면 Angular로 이런 것들을 할 수 있다는 자신감을 얻을 수 있습니다:

*   Angular가 제공하는 [디렉티브](guide/glossary#directive "Directives definition")를 활용하면 히어로들의 목록을 화면에 표시할 수 있으며, 이 때 특정 히어로의 데이터를 표시하거나 표시하지 않을 수 있습니다.
*   히어로 목록과 상세 정보를 표시하는 Angular [컴포넌트](guide/glossary#component "Components definition")를 생성해 봅니다.
*   단방향 [데이터 바인딩](guide/glossary#data-binding "Data binding definition")을 사용해서 읽기전용 데이터를 표시합니다.
*   양방향 데이터 바인딩을 사용하면 입력 필드와 모델을 동기화할 수 있습니다.
*   키보드 입력이나 마우스 클릭과 같은 사용자 이벤트를 컴포넌트 메소드와 바인딩할 수 있습니다.
*   사용자가 목록에서 히어로을 선택하면 상세 화면으로 전환하고, 이 화면에서 해당 히어로의 정보를 편집할 수 있습니다.
*   [파이프](guide/glossary#pipe "Pipe definition")를 활용하면 데이터가 화면에 표시되는 형식을 변경할 수 있습니다.
*   [서비스](guide/glossary#service "Service definition")를 활용하면 여러 컴포넌트에서 히어로의 정보를 함께 사용할 수 있습니다.
*   뷰와 컴포넌트는 [라우터](guide/glossary#router "Router definition")로 전환합니다.

<div class="callout is-helpful">

<header>Solution</header>

튜토리얼을 완성하고 나면 애플리케이션의 최종 모습은 이렇습니다.

<live-example name="toh-pt6"></live-example>.

</div>


<!--
## Design your new application
-->
## 애플리케이션 설계하기

<!--
Here's an image of where this tutorial leads, showing the Dashboard view and the most heroic heroes:

<div class="lightbox">

<img alt="Output of heroes dashboard" src="generated/images/guide/toh/heroes-dashboard-1.png">

</div>

You can click the **Dashboard** and **Heroes** links in the dashboard to navigate between the views.

If you click the dashboard hero "Magneta," the router opens a "Hero Details" view where you can change the hero's name.

<div class="lightbox">

<img alt="Details of hero in application" src="generated/images/guide/toh/hero-details-1.png">

</div>

Clicking the "Back" button returns you to the Dashboard.
Links at the top take you to either of the main views.
If you click "Heroes," the application displays the "Heroes" list view.

<div class="lightbox">

<img alt="Output of heroes list application" src="generated/images/guide/toh/heroes-list-2.png">

</div>

When you click a different hero name, the read-only mini detail beneath the list reflects the new choice.

You can click the "View Details" button to drill into the editable details of the selected hero.

The following diagram illustrates the navigation options.

<div class="lightbox">

<img alt="View navigations" src="generated/images/guide/toh/nav-diagram.png">

</div>

Here's the application in action:

<div class="lightbox">

<img alt="Tour of Heroes in Action" src="generated/images/guide/toh/toh-anim.gif">

</div>
-->
튜토리얼 앱을 시작하면 최고의 히어로를 표시하는 대시보드 화면을 표시합니다:

<div class="lightbox">

<img alt="Output of heroes dashboard" src="generated/images/guide/toh/heroes-dashboard-1.png">

</div>

대시보드 위쪽의 두 링크\(**Dashboard**와 **Heroes**\)를 클릭하면 Dashboard 뷰와 Heroes 뷰를 전환합니다.

그리고 대시보드에서 "Magneta" 히어로를 선택하면 해당 히어로의 이름을 변경할 수 있는 히어로 상세 정보 화면을 표시합니다.

<div class="lightbox">

<img alt="Details of hero in application" src="generated/images/guide/toh/hero-details-1.png">

</div>

히어로 상세 정보 화면에서 "Back" 버튼을 클릭하면 대시보드 화면으로 돌아갑니다.
그리고 뷰 위쪽에 있는 링크를 사용해도 대시보드 화면으로 돌아갈 수 있으며, "Heroes" 링크를 클릭하면 히어로의 목록을 표시하는 뷰로 전환합니다.

<div class="lightbox">

<img alt="Output of heroes list application" src="generated/images/guide/toh/heroes-list-2.png">

</div>

히어로 목록 화면에서 히어로를 한 명 선택하면, 목록 아래에 히어로의 이름을 표시하기만 하는 뷰를 표시합니다.

그리고 "View Details" 버튼을 선택하면 히어로의 이름을 수정하는 뷰를 표시합니다.

아래 다이어그램을 보면서 이 앱의 페이지 구성을 확인해 보세요.

<div class="lightbox">

<img alt="View navigations" src="generated/images/guide/toh/nav-diagram.png">

</div>

앱을 실제로 실행하면 다음과 같이 동작합니다:

<div class="lightbox">

<img alt="Tour of Heroes in Action" src="generated/images/guide/toh/toh-anim.gif">

</div>


@reviewed 2022-05-16
