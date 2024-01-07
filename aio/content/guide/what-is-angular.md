<!--
# What is Angular?
-->
# Angular란?

<!--
Angular is a development platform, built on [TypeScript](https://www.typescriptlang.org).

As a platform, Angular includes:

- A component-based framework for building scalable web applications
- A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more
- A suite of developer tools to help you develop, build, test, and update your code

With Angular, you're taking advantage of a platform that can scale from single-developer projects to enterprise-level applications. Best of all, the Angular ecosystem consists of a diverse group of over 1.7 million developers, library authors, and content creators.
-->
Angular는 [TypeScript](https://www.typescriptlang.org)로 개발하는 개발 플랫폼입니다.

플랫폼으로서 Angular는:

- 확장 가능한 컴포넌트 구조로 웹 애플리케이션을 만드는 프레임워크입니다.
- 라우팅, 폼 관리, 클라이언트-서버 통신 등 웹 개발에 필요한 라이브러리를 조화롭게 통합한 모음집입니다.
- 애플리케이션 개발, 빌드, 테스트, 수정에 필요한 개발자 도구를 제공합니다.

Angular는 혼자 개발하는 프로젝트는 물론이고 기업용 애플리케이션에도 활용할 수 있습니다.
무엇보다도, Angular 생태계에 함께하는 개발자, 라이브러리 개발자, 컨텐츠 작성자는 총 170만명 이상에 달합니다.


<a id="essentials"></a>

<!--
## Prerequisites
-->
## 사전지식

<!--
Like most modern frameworks, Angular expects you to be familiar with HTML, CSS and JavaScript. In addition, it’s recommended to have familiarity with the following concepts and tools:
-->
요즘 프레임워크가 보통 그렇듯, Angular를 사용하려면 HTML, CSS, JavaScript에 먼저 익숙해야 합니다.
그리고 이런 개념과 툴을 알고 있으면 더 좋습니다:

<a id="concepts"></a>

<!--
### Concepts
-->
### 개념

<!--
- [JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [TypeScript fundamentals](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
-->
- [JavaScript 클래스](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [TypeScript 개요](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript 데코레이터](https://www.typescriptlang.org/docs/handbook/decorators.html)

<a id="tools"></a>

<!--
### Tools
-->
### 툴

<!--
- **TypeScript** - This is shipped by default with every Angular app to provide improved tooling and enhanced maintainability for a better developer experience.
- **Command Line Interface (CLI)** - Angular uses a compiler in order to abstract tooling complexity and optimize your code so you can focus on building your app.
-->
- **TypeScript** - Angular 앱이라면 기본으로 사용하는 툴입니다. 더 나은 개발자 경험을 위해 다양한 툴을 제공하고 유지보수성을 확장하기 위해 도입되었습니다.
- **Command Line Interface (CLI)** - Angular는 코드 최적화 등에 사용하는 복잡한 툴을 추상화하여 컴파일러로 제공합니다. 개발자는 앱 개발에만 집중하면 됩니다.


<a id="components"></a>

<!--
## Components
-->
## 컴포넌트(Components)

<!--
Components are the fundamental building block for creating applications in Angular. By leveraging component architecture, Angular aims to provide structure for organizing your project into manageable, well organized parts with clear responsibilities so that your code is maintainable and scalable.

An Angular component can be identified by the `component` suffix (e.g., `my-custom-name.component.ts` and has the following:

- A decorator to define configuration options for things like:
  - A selector that defines what the tag name is when referring a component in a template
  - An HTML template that controls what is rendered to the browser
- A TypeScript class that defines the behavior of the component. Examples include handling user input, managing state, defining methods, etc.

Here is a simplified example of a TodoListItem component.

```ts
// 📄 todo-list-item.component.ts
@Component({
  standalone: true,
  selector: 'todo-list-item',
  template: ` <li>(TODO) Read cup of coffee introduction</li> `,
  styles: ['li { color: papayawhip; }'],
})
export class TodoListItem {
  /* Component behavior is defined in here */
}
```
-->
컴포넌트는 Angular 애플리케이션을 구성하는 기본 빌딩 블록입니다.
Angular는 컴포넌트 아키텍처를 활용해서 개별 컴포넌트가 각자의 역할에 충실하게 구성되는 것을 지향하기 때문에, 결국 코드를 탄탄하게 유지 관리하면서 확장할 수 있는 구조를 제공합니다.

Angular 컴포넌트는 `my-custom-name.component.ts`와 같이 보통 `component` 접미사를 붙입니다.

- 데코레이터에는 컴포넌트의 옵션을 지정합니다:
  - 템플릿에 컴포넌트를 어떤 이름으로 사용할지 `selector`로 정합니다.
  - 브라우저에 렌더링할 HTML 템플릿은 `template`이나 `templateUrl`로 지정합니다.
- TypeScript 클래스는 컴포넌트의 동작을 정의합니다. 사용자가 입력한 내용을 처리하거나 상태를 관리하는 메소드 들을 정의할 수 있습니다.

간단한 컴포넌트 예제를 살펴보면 이렇습니다.

```ts
// 📄 todo-list-item.component.ts
@Component({
  standalone: true,
  selector: 'todo-list-item',
  template: ` <li>(TODO) Read cup of coffee introduction</li> `,
  styles: ['li { color: papayawhip; }'],
})
export class TodoListItem {
  /* 컴포넌트의 동작은 여기에 정의합니다. */
}
```

<a id="behavior"></a>

<!--
### Behavior
-->
### 동작

<!--
Now that we have the basic structure for the component, let’s learn more about how you define the component’s behavior.
-->
이제 컴포넌트의 기본 구조가 갖춰졌습니다.
컴포넌트의 동작을 정의해 봅시다.

<!--
#### State
-->
#### 상태

<!--
When defining data that you want the component to manage, this can be accomplished by declaring it by defining [class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields).

In the example of a `todo-list-item.component.ts`, there are two properties we want to track: `taskTitle` and `isComplete`. Using the [class field syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields), they can be defined as follows:

```ts
// 📄 todo-list-item.component.ts
@Component({ ... })
export class TodoList {
  taskTitle = '';
  isComplete = false;
}
```
-->
컴포넌트가 관리해야할 데이터가 있다면 [클래스 필드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)로 선언하면 됩니다.

`todo-list-item.component.ts` 예제에서 관리하려는 프로퍼티는 `taskTitle`, `isComplete` 이렇게 2개 입니다.
그래서 [클래스 필드 문법](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)으로 이 프로퍼티들을 클래스에 선언했습니다:

```ts
// 📄 todo-list-item.component.ts
@Component({ ... })
export class TodoList {
  taskTitle = '';
  isComplete = false;
}
```

<!--
#### Methods
-->
#### 메서드

<!--
You can define functions for a component by declaring methods within the component class.
-->
컴포넌트의 동작은 컴포넌트 클래스의 메서드로 정의합니다.

```ts
// 📄 todo-list-item.component.ts
@Component({ ... })
export class TodoList {
  taskTitle = '';
  isComplete = false;

  updateTitle(newTitle: string) {
    this.taskTitle = newTitle;
  }

  completeTask() {
    this.isComplete = true;
  }
}
```


<a id="templates"></a>

<!--
### Templates
-->
### 템플릿(Templates)

<!--
Every component has an HTML template that defines what that component renders to the DOM.

HTML templates can be defined as an inline template within the TypeScript class, or in separate files with the `templateUrl` property. To learn more, check out [the docs on defining component templates](guide/component-overview#defining-a-components-template).

Within this document, the examples will use inline templates for more concise code snippets.
-->
컴포넌트는 모두 DOM에 렌더링 될 수 있는 HTML 템플릿을 갖습니다.

HTML 템플릿은 TypeScript 클래스 안에 인라인 템플릿으로 정의할 수 있고, 아니면 `templateUrl` 프로퍼티를 사용해서 별개 파일로 정의할 수 있습니다.
자세한 내용은 [컴포넌트 템플릿 정의하기 문서](guide/component-overview#defining-a-components-template)를 참고하세요.

이 문서에서는 간단하게 살펴보기 위해 인라인 템플릿으로 정의합니다.


<!--
#### Rendering Dynamic Data
-->
#### 동적 데이터 렌더링하기

<!--
When you need to display dynamic content in your template, Angular uses the double curly brace syntax in order to distinguish between static and dynamic content.

```ts
@Component({
  template: ` <p>Title: {{ taskTitle }}</p> `,
})
export class TodoListItem {
  taskTitle = 'Read cup of coffee';
}
```

This is how it renders to the page.

```html
<p>Title: Read cup of coffee</p>
```

This syntax declares an **interpolation** between the dynamic data property inside of the HTML. As a result, whenever the data changes, Angular will automatically update the DOM reflecting the new value of the property.
-->
동적으로 변경되는 데이터를 화면에 표시하려면 이중 중괄호(`{{`, `}}`)를 사용하면 됩니다.

```ts
@Component({
  template: ` <p>Title: {{ taskTitle }}</p> `,
})
export class TodoListItem {
  taskTitle = 'Read cup of coffee';
}
```

이 템플릿은 화면에 이렇게 렌더링됩니다.

```html
<p>Title: Read cup of coffee</p>
```

이렇게 HTML 안쪽에 동적 데이터 프로퍼티를 반영하는 것을 **문자열 바인딩(interpolation)** 이라고 합니다.
이후에 데이터가 변경되면 Angular가 자동으로 DOM을 갱신해서 새로운 값으로 화면을 렌더링합니다.


<!--
#### Dynamic Properties and Attributes
-->
#### 동적 프로퍼티, 어트리뷰트

<!--
When you need to dynamically set the value of attributes in an HTML element, the target property is wrapped in square brackets. This binds the attribute with the desired dynamic data by informing Angular that the declared value should be interpreted as a JavaScript-like statement ([with some Angular enhancements](guide/understanding-template-expr-overview)) instead of a plain string.

```html
<button [disabled]="hasPendingChanges"></button>
```

In this example, the disabled property is tied to the `hasPendingChanges` variable that Angular would expect to find within the component’s state.
-->
HTML 엘리먼트 어트리뷰트의 값을 동적으로 설정하려면 대괄호(`[`, `]`)를 사용하면 됩니다.
이렇게 작성하면 Angular가 동적 데이터를 JavaScript처럼 동작하는 실행문([템플릿 표현식](guide/understanding-template-expr-overview))으로 변환해서 어트리뷰트와 연결합니다.

```html
<button [disabled]="hasPendingChanges"></button>
```

이 예제에서는 `disabled` 프로퍼티가 `hasPendingChanges` 변수와 연결되어 있기 때문에 컴포넌트 상태에 따라 버튼이 비활성화됩니다.


<!--
#### Event Handling
-->
#### 이벤트 핸들링

<!--
You can bind event listeners by specifying the event name in parenthesis and invoking a method on the right-hand-side of the equals sign:

```html
<button (click)="saveChanges()">Save Changes</button>
```

If you need to pass the event object to your event listener, Angular provides an implicit `$event` variable that can be used inside the function call:

```html
<button (click)="saveChanges($event)">Save Changes</button>
```
-->
이벤트 리스너는 이벤트 이름에 괄호(`(`, `)`)를 붙여서 컴포넌트 메서드와 연결합니다:

```html
<button (click)="saveChanges()">Save Changes</button>
```

이 때 이벤트 리스너로 이벤트 객체를 전달해야 한다면 Angular가 제공하는 `$event` 변수를 함수 실행 인자로 전달하면 됩니다:

```html
<button (click)="saveChanges($event)">Save Changes</button>
```

<a id="styles"></a>

<!--
### Styles
-->
### 스타일

<!--
When you need to style a component, there are two optional properties that you can configure inside of the `@Component` decorator.

Similar to component templates, you can manage a component's styles in the same file as the TypeScript class, or in separate files with the `styleUrls` properties.

Components can optionally include a list of CSS styles that apply to that component's DOM:

```ts
@Component({
  selector: 'profile-pic',
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `,
  ],
})
export class ProfilePic {
  /* Your code goes here */
}
```

By default, a component's style will only apply to elements in that component's template in order to limit the side effects.

To learn more, check out [the docs on component styling](guide/component-styles).
-->
컴포넌트에 스타일을 지정하는 방법은 두 가지입니다.

컴포넌트 템플릿과 비슷하게 TypeScript 클래스 파일에서 `@Component` 데코레이터의 `styles` 프로퍼티로 지정하는 방법이 있고, 아니면 별도 파일로 작성하고 `styleUrls` 프로퍼티로 연결해도 됩니다.

컴포넌트에는 CSS 스타일을 개수 제한 없이 여러개 지정할 수 있습니다:

```ts
@Component({
  selector: 'profile-pic',
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `,
  ],
})
export class ProfilePic {
  /* 컴포넌트 코드는 여기 작성합니다. */
}
```

기본적으로 컴포넌트 스타일은 외부에 영향을 주지 않도록 컴포넌트 템플릿 안에 있는 엘리먼트에만 적용됩니다.

자세한 내용은 [컴포넌트 스타일 지정하기](guide/component-styles) 문서를 참고하세요.


<a id="directives"></a>

<!--
## Directives
-->
## 디렉티브(Directives)

<!--
When building applications, developers often need to extend on the behavior of an HTML element or Angular directives/components. Examples of this include: displaying content based on a certain condition, rendering a list of items based on application data, changing the styles on an element based on user interaction, etc.

To solve this problem, Angular uses the concept of directives, which allow you to add new behaviors to an element in a declarative and reusable way.
-->
애플리케이션을 개발하다보면 HTML 엘리먼트나 Angular 디렉티브/컴포넌트의 동작을 확장하고 싶을 때가 있습니다.
어떤 조건에 따라 화면의 내용을 바꾼다던지, 목록에 있는 항목들을 화면에 모두 나열한다던지, 사용자 동작에 따라 엘리먼트의 스타일을 변경하는 경우들이 이런 경우입니다.

이런 경우를 위해 Angular는 디렉티브라는 개념을 도입했습니다.
디렉티브는 명시적이고 재사용 가능한 방법으로 엘리먼트에 새로운 동작을 추가하는 개념입니다.


<!--
### Conditional rendering
-->
### 렌더링 조건 지정하기

<!--
One of the most common scenarios that developers encounter is the desire to show or hide content in templates based on a condition.

Similar to JavaScript's `if` control block, Angular provides a built-in `ngIf` directive to control whether an element will render if the expression returns a truthy value.

```html
<section class="admin-controls" *ngIf="hasAdminPrivileges">
  The content you are looking for is here.
</section>
```

If `hasAdminPrivileges` is true, the application will display the content to the user, otherwise, the element is removed from the DOM entirely.
-->
어떤 조건에 따라 템플릿의 일부를 화면에 표시하거나 감추는 동작은 개발자가 가장 자주 마주하는 시나리오입니다.

JavaScript `if` 와 비슷하게 Angular는 `ngIf` 디렉티브를 제공합니다.
이 디렉티브를 사용하면 표현식이 참으로 평가될 때 해당 엘리먼트를 화면에 렌더링합니다.

```html
<section class="admin-controls" *ngIf="hasAdminPrivileges">
  The content you are looking for is here.
</section>
```

`hasAdminPrivileges` 값이 `true`면 이 엘리먼트가 화면에 표시되며, 반대 경우에는 DOM에서 완전히 제거됩니다.


<!--
### Rendering a list
-->
### 목록 렌더링하기

<!--
Another common scenario is to render a list of items based on dynamic data.

Similar to JavaScript’s `for` loop, Angular provides another built-in directive called `ngFor`, The following code will render one `<li>` element for each item in `taskList`.

```html
<ul class="ingredient-list">
  <li *ngFor="let task of taskList">{{ task }}</li>
</ul>
```
-->
개발자가 마주하는 또다른 시나리오는 동적 배열 안에 있는 항목들을 화면에 렌더링하는 것입니다.

이 경우에는 JavaScript `for` 루프와 비슷하게 Angular는 `ngFor` 디렉티브를 제공합니다.
이 디렉티브를 사용하면 `taskList` 안에 있는 각 항목을 `<li>` 엘리먼트로 렌더링할 수 있습니다.

```html
<ul class="ingredient-list">
  <li *ngFor="let task of taskList">{{ task }}</li>
</ul>
```

<!--
### Custom directives
-->
### 커스텀 디렉티브

<!--
While built-in directives help to solve common problems that developers encounter, there are situations where developers require custom behavior that’s specific to their application. In these cases, Angular provides a way for you to create custom directives.

Custom Angular directives can be identified by the `directive` suffix (e.g., `my-custom-name.directive.ts`).

Similar to defining a component, directives are comprised of the following:

- A TypeScript decorator to define configuration options for things like:
  - A selector that defines the tag name is when the component is called
- A TypeScript class that defines the extended behavior the directive will add to the respective HTML element.

For example, here’s what a custom directive for highlighting an element:

```ts
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);
  constructor() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

To apply this to an element, the directive is called by adding it as an attribute.

```html
<p appHighlight>Look at me!</p>
```

Directives can also leverage user events, take input for additional customization, but this goes beyond the scope of this article. To learn more, check out [the docs on creating custom directives](guide/attribute-directives).
-->
개발자가 마주할 수 있는 문제들은 기본 디렉티브를 활용해서 해결할 수 있다고 해도, 애플리케이션에 딱 맞는 동작이 필요한 경우가 있습니다.
그렇다면 커스텀 디렉티브를 만들어서 사용하면 됩니다.

커스텀 디렉티브는 일반적으로 `my-custom-name.directive.ts`와 같이 `directive` 접미사를 붙입니다.

그리고 컴포넌트를 정의할 때와 비슷하게 디렉티브는 이렇게 구성합니다:

- 데코레이터에는 디렉티브의 옵션을 지정합니다:
  - 템플릿에 디렉티브를를 어떤 이름으로 사용할지 `selector`로 정합니다.
- TypeScript 클래스는 디렉티브의 동작을 정의합니다. 디렉티브는 HTML 엘리먼트에 동작을 추가하는 용도로 사용합니다.

엘리먼트에 하이라이트를 적용하는 커스텀 디렉티브라면 이렇게 작성하면 됩니다:

```ts
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);
  constructor() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

이 디렉티브를 엘리먼트에 적용하려면 디렉티브 이름을 어트리뷰트로 추가하면 됩니다.

```html
<p appHighlight>Look at me!</p>
```

디렉티브를 활용하면 사용자 이벤트나 커스터마이징이 필요한 입력 처리를 자유롭게 확장할 수 있지만 이 내용은 이 문서의 범위를 넘어섭니다.
자세한 내용을 확인하려면 [커스텀 디렉티브 만들기 문서](guide/attribute-directives)를 참고하세요.


<a id="services"></a>

<!--
## Services
-->
## 서비스(Services)

<!--
When you need to share logic between components, Angular allows you to create a “service” which allows you to inject code into components while managing it from a single source of truth.

Angular services can be identified by the `service` suffix (e.g., `my-custom-name.service.ts`).

Similar to defining a component, services are comprised of the following:

- A TypeScript decorator to define configuration options for things like:
  - [`providedIn`](api/core/Injectable#providedIn) - This allows you to define what parts of the application can access the service. For example, ‘root’ will allow a service to be accessed anywhere within the application.
- A TypeScript class that defines the desired code that will be accessible when the service is injected

Here is an example of a `Calculator` service.

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}
```

If we wanted to call the service in a Receipt component for example, here’s what it might look like:

```ts
import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-receipt’,
  template: `<p>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
  private calculatorService = inject(CalculatorService);
  totalCost = this.calculatorService.add(50, 25);
}
```

In this example, the `CalculatorService` is being used by calling the Angular function `inject` and passing in the service to it.
-->
컴포넌트끼리 공유해야 할 로직이 있다면 "서비스" 를 만들어서 이 서비스를 컴포넌트에 의존성으로 주입하면 공통 로직을 관리하기 편합니다.

서비스는 일반적으로 `my-custom-name.service.ts`와 같이 `service` 접미사를 붙입니다.

컴포넌트를 정의할 때와 비슷하게, 서비스도 이렇게 정의합니다:

- 데코레이터에는 서비스의 옵션을 지정합니다:
  - [`providedIn`](api/core/Injectable#providedIn) - 애플리케이션의 어느 영역에 서비스를 정의할지 지정합니다. `root`라고 지정하면 애플리케이션 전역에서 이 서비스를 활용할 수 있습니다.
- 서비스가 동작하는 코드는 TypeScript 클래스에 작성합니다.

`Calculator` 서비스를 예로 들어보면 이렇습니다.

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}
```

`Receipt` 컴포넌트에서 이 서비스를 활용한다면 이렇게 구현하면 됩니다:

```ts
import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-receipt',
  template: `<p>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
  private calculatorService = inject(CalculatorService);
  totalCost = this.calculatorService.add(50, 25);
}
```

`CalculatorService`는 Angular가 제공하는 `inject` 함수로 참조했습니다.


<a id="organization"></a>

<!--
## Organization
-->
## 구조화(Organization)

<!--
Standalone components are a new organizational pattern that were introduced in Angular v15 and is the recommended place to start. In contrast to [NgModules](guide/ngmodules), it allows developers to organize code and manage dependencies through components rather than feature modules.

For example, in the traditional NgModule pattern, you would need to create a TodoModule and manage all of its dependencies through this module.

```ts (Todo.module.ts)
import {FormsModule} from '@angular/forms';
import {TodoList} from '../todo/todo-list.component';

@NgModule({
  declarations: [TodoList],
  imports: [FormsModule],
  exports: [TodoList, FormsModule],
})
export class TodoModule {}
```

However, you can now achieve something similar with a standalone component without the need for a module file:

```ts (Todo.component.ts)
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoList} from '../todo/todo-list.component';

@Component({
  standalone: true,
  selector: 'todo-app',
  imports: [FormsModule, TodoList],
  template: ` ... <todo-list [tasks]="taskList"></todo-list> `,
})
export class PhotoGalleryComponent {
  // component logic
}
```

While most of this should be familiar (from the Components section), two things that are unique to this new pattern are the `standalone` flag and the `imports` key.

- `standalone` - When provided the value `true`, this tells Angular that the component does not need to be declared in an NgModule
- `imports` - Allows developers to declare what dependencies will be used in the component

In other words, rather than having to define a specific context in which code should be organized, developers are able to specify the dependencies directly within the component context itself.
-->
Angular v15 버전부터는 애플리케이션 셜계 방식으로 단독 컴포넌트를 권장하고 있습니다.
이전에 권장했던 [NgModules](guide/ngmodules)와 비교해보면, 이전에는 기능모듈 단위로 코드를 관리했었고, 이제는 컴포넌트 단위로 코드를 관리한다고 볼 수 있습니다.

NgModule 방식이었다면 TodoModule을 정의하면서 필요한 의존성들은 모듈 안에 모두 정의해야 했습니다.

```ts (Todo.module.ts)
import {FormsModule} from '@angular/forms';
import {TodoList} from '../todo/todo-list.component';

@NgModule({
  declarations: [TodoList],
  imports: [FormsModule],
  exports: [TodoList, FormsModule],
})
export class TodoModule {}
```

이제는 별도의 모듈 없이 단독 컴포넌트 안에서 이 작업을 수행합니다:

```ts (Todo.component.ts)
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoList} from '../todo/todo-list.component';

@Component({
  standalone: true,
  selector: 'todo-app',
  imports: [FormsModule, TodoList],
  template: ` ... <todo-list [tasks]="taskList"></todo-list> `,
})
export class PhotoGalleryComponent {
  // 컴포넌트 로직
}
```

두 방식은 거의 비슷하지만 새로운 방식에서는 `standalone` 플래그와 `imports` 키가 다릅니다.

- `standalone` - `true`로 설정하면 이 컴포넌트가 어떠한 NgModule에도 속하지 않는다는 것을 의미합니다.
- `imports` - 컴포넌트에 필요한 의존성 객체를 로드하기 위해 지정합니다.

새로운 방식을 간단하게 표현하자면, 이전에는 코드를 어떻게 구성할지 큰 단위로 판단해야 했다면, 이제는 작업하는 컴포넌트 그 자체만 고려하면 됩니다.


<a id="cli"></a>

<!--
## Command Line Interface (CLI)
-->
## 커맨드 라인 인터페이스(Command Line Interface, CLI)

<!--
The Angular CLI is the recommended way to develop Angular applications and can make some tasks trouble-free.

Some examples of common Angular CLI commands include:

<!- vale Angular.Google_WordListSuggestions = NO ->

| Command                     | Details                                                               |
| :-------------------------- | :-------------------------------------------------------------------- |
| [ng build](cli/build)       | Compiles an Angular application into an output directory.             |
| [ng serve](cli/serve)       | Builds and serves your application, rebuilding on file changes.       |
| [ng generate](cli/generate) | Generates or modifies files based on a schematic.                     |
| [ng test](cli/test)         | Runs unit tests on a given project.                                   |
| [ng e2e](cli/e2e)           | Builds and serves an Angular application, then runs end-to-end tests. |

<!- vale Angular.Google_WordListSuggestions = YES ->

For more information about the Angular CLI, see the [Angular CLI Reference](cli) section.
-->
Angular 애플리케이션을 개발한다면 Angular CLI를 사용하는 것을 적극 권장합니다.
Angular CLI는 애플리케이션 개발 단계에 필요한 작업드을 쉽게 처리해 줍니다.

Angular CLI 명령 중에 자주 사용하는 것들은 이런 것들이 있습니다:

<!-- vale Angular.Google_WordListSuggestions = NO -->

| 명령                          | 설명                                                |
|:----------------------------|:--------------------------------------------------|
| [ng build](cli/build)       | Angular 애플리케이션을 컴파일합니다.                           |
| [ng serve](cli/serve)       | 애플리케이션을 빌드하고 개발 서버를 띄웁니다. 파일이 변경되면 자동으로 다시 빌드합니다. |
| [ng generate](cli/generate) | 스키매틱에 정해진대로 구성요소를 생성합니다.                          |
| [ng test](cli/test)         | 유닛 테스트를 실행합니다.                                    |
| [ng e2e](cli/e2e)           | 개발 서버를 띄우로 엔드-투-엔드 테스트를 실행합니다.                    |

<!-- vale Angular.Google_WordListSuggestions = YES -->

Angular CLI에 대해 자세하게 알아보려면 [Angular CLI](cli) 문서를 참고하세요.


<a id="1p-libraries"></a>

<!--
## First-party libraries
-->
## 기본 라이브러리

<!--
Angular provides many first-party libraries to support common functionality that developers often encounter when building their apps.

Some of the popular libraries available in the ecosystem include:

<!- vale Angular.Google_Acronyms = NO ->

| Library                                                           | Details                                                                                                                                        |
| :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| [Angular Router](guide/router)                                    | Advanced client-side navigation and routing based on Angular components. Supports lazy-loading, nested routes, custom path matching, and more. |
| [Angular Forms](guide/forms-overview)                             | Uniform system for form participation and validation.                                                                                          |
| [Angular HttpClient](guide/understanding-communicating-with-http) | Robust HTTP client that can power more advanced client-server communication.                                                                   |
| [Angular Animations](guide/animations)                            | Rich system for driving animations based on application state.                                                                                 |
| [Angular PWA](guide/service-worker-intro)                         | Tools for building Progressive Web Applications \(PWA\) including a service worker and Web application manifest.                               |
| [Angular Schematics](guide/schematics)                            | Automated scaffolding, refactoring, and update tools that simplify development at large scale.                                                 |

<!- vale Angular.Google_Acronyms = YES ->
-->
Angular는 애플리케이션을 개발할 때 개발자들이 마주하는 문제 해결을 돕기 위해 수많은 기능을 기본 라이브러리를 제공합니다.

자주 사용하는 것들은 이런 것들이 있습니다:

<!-- vale Angular.Google_Acronyms = NO -->

| 라이브러리                                                             | 설명                                                                                       |
|:------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| [Angular Router](guide/router)                                    | Angular 컴포넌트를 기반으로 화면을 전환하는 훌륭한 클라이언트 네비게이션 라이브러리입니다. 지연 로딩, 중첩 라우팅, 커스텀 경로 매칭 등을 지원합니다. |
| [Angular Forms](guide/forms-overview)                             | 폼을 구성하고 유효성을 검증하는 강력한 시스템입니다.                                                            |
| [Angular HttpClient](guide/understanding-communicating-with-http) | 클라이언트-서버 간 커뮤니케이션을 수행하는 HTTP 클라이언트 라이브러리입니다.                                             |
| [Angular Animations](guide/animations)                            | 애플리케이션 상태에 따라 유려한 애니메이션을 적용하는 라이브러리입니다.                                                  |
| [Angular PWA](guide/service-worker-intro)                         | 서비스 워커와 웹 애플리케이션 매니페스트를 지원하는 PWA(Progressive Web Application, PWA) 라이브러리입니다.             |
| [Angular Schematics](guide/schematics)                            | 자동으로 코드를 확장하며, 리팩토링하고, 업데이트하는 도구입니다.                                                     |

<!-- vale Angular.Google_Acronyms = YES -->

<!--
## Next steps
-->
## 다음 단계

<!--
To see Angular in action, see the [Getting Started](start) tutorial.
This tutorial uses [stackblitz.com](https://stackblitz.com), for you to explore a working example of Angular without any installation requirements.

If you’re interested in learning more about how you can build apps with Angular, check out the following resources:

- [Tutorials](tutorial/first-app)
- [In-Depth Guides](guide/developer-guide-overview)
-->
Angular를 직접 사용해 보려면 [시작하기](start) 튜토리얼을 참고하세요.
이 튜토리얼은 [stackblitz.com](https://stackblitz.com)를 활용하기 때문에 로컬 환경에는 아무것도 설치하지 않아도 예제들을 실행해볼 수 있습니다.

Angular에 대해 더 알아보려면 이런 내용도 확인해 보세요:

- [튜토리얼](tutorial/first-app)
- [심화 가이드](guide/developer-guide-overview)

@reviewed 2023-08-15
