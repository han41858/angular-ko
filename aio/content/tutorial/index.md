<!--
# Angular tutorials
-->
# Angular 튜토리얼

<!--
This section contains tutorials to help you get started developing applications with Angular.
-->
이 문서는 Angular 애플리케이션 개발을 시작할 때 도움이 될 튜토리얼을 안내합니다.


<!--
## First App Tutorial - Angular Homes
-->
## 첫번째 튜토리얼 - Angular 홈

<!--
[First App Tutorial - Angular Homes](tutorial/first-app) gets you started with Angular
The First App tutorial guides you through building an Angular app by taking you step by step through the fundamentals of building an application in Angular.

Learn how to use Standalone Components, Inputs, Angular templates, data binding and more.
-->
[첫번째 튜토리얼 - Angular 홈](tutorial/first-app)을 통해 Angular를 시작해 봅시다.
이 앱을 확인하면 이제 Angular로 애플리케이션을 어떻게 만드는지 기본부터 하나씩 배울 수 있습니다.

독립 컴포넌트, 입출력 프로퍼티, Angular 템플릿이나 데이터 바인딩 등에 대해 다양하게 확인해 보세요.


<!--
## Tour of Heroes
-->
## 히어로들의 여정

<!--
[Tour of Heroes](tutorial/tour-of-heroes) helps you gain confidence that Angular can do whatever you need it to do by showing you how to:

*   Use Angular [directives](guide/glossary#directive "Directives definition") to show and hide elements and display lists of hero data.
*   Create Angular [components](guide/glossary#component "Components definition") to display hero details and show an array of heroes.
*   Use one-way [data binding](guide/glossary#data-binding "Data binding definition") for read-only data.
*   Add editable fields to update a model with two-way data binding.
*   Bind component methods to user events, like keystrokes and clicks.
*   Enable users to select a hero from a list and edit that hero in the details view.
*   Format data with [pipes](guide/glossary#pipe "Pipe definition").
*   Create a shared [service](guide/glossary#service "Service definition") to assemble the heroes.
*   Use [routing](guide/glossary#router "Router definition") to navigate among different views and their components.
-->
[히어로들의 여정](tutorial/tour-of-heroes) 튜토리얼을 통해 이런 내용을 학습할 수 있습니다:

*   [디렉티브](guide/glossary#directive "Directives definition")를 사용하면 엘리먼트를 표시하거나 감출 수 있고, 히어로의 목록을 표시할 수도 있습니다.
*   히어로의 상세정보를 표시하거나 히어로 배열을 표시하려면 [컴포넌트](guide/glossary#component "Components definition")를 만들면 됩니다.
*   데이터를 읽기만 한다면 단방향 [데이터 바인딩](guide/glossary#data-binding "Data binding definition")을 활용하면 됩니다.
*   입력 필드와 양방향 데이터 바인딩을 활용하면 모델의 내용을 수정할 수 있습니다.
*   키입력이나 클릭 같은 사용자 이벤트는 컴포넌트 메서드와 바인딩할 수 있습니다.
*   목록에서 히어로 한 명을 선택하거나, 상세정보를 확인하고 수정할 수 있습니다.
*   [파이프](guide/glossary#pipe "Pipe definition")를 사용하면 화면에 표시되는 데이터의 형식을 조정할 수 있습니다.
*   히어로 목록을 조합하려면 공유할 수 있는 [서비스](guide/glossary#service "Service definition")를 만들면 됩니다.
*   화면과 컴포넌트를 주소와 연결하고 이동하려면 [라우팅](guide/glossary#router "Router definition")을 활용하면 됩니다.


<!--
## Building a template-driven form
-->
## 템플릿 기반 폼 구성하기

<!--
[Building a template-driven form](guide/forms) shows you how to create a template-driven form.

The control elements in the form are bound to data properties that have input validation. The input validation helps maintain data integrity and styling to improve the user experience.
Template-driven forms use two-way data binding to update the data model in the component as changes are made in the template and vice versa.
-->
[템플릿 기반 폼 구성하기](guide/forms) 문서는 템플릿 기반의 폼을 만드는 방법을 다루는 가이드입니다.

폼에 구성하는 폼 컨트롤 엘리먼트는 데이터 프로퍼티와 연결되며, 유효성 검사 기능을 추가할 수 있습니다.
유효성 검사를 활용하면 데이터의 안정성을 높일 수 있으며, 잘못된 데이터가 입력되었을 때 사용자에게 적절하게 알릴 수도 있습니다.
템플릿 기반 폼을 구성할 때는 컴포넌트 안에 있는 데이터 모델과 템플릿을 연결하기 위해 양방향 데이터 바인딩을 활용합니다.