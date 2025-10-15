<!--
# Grouping elements with ng-container
-->
# 엘리먼트 묶기: `<ng-container>`

<!--
`<ng-container>` is a special element in Angular that groups multiple elements together or marks a location in a template without rendering a real element in the DOM.

```angular-html
<!- Component template ->
<section>
  <ng-container>
    <h3>User bio</h3>
    <p>Here's some info about the user</p>
  </ng-container>
</section>
```

```angular-html
<!- Rendered DOM ->
<section>
  <h3>User bio</h3>
  <p>Here's some info about the user</p>
</section>
```

You can apply directives to `<ng-container>` to add behaviors or configuration to a part of your template.

Angular ignores all attribute bindings and event listeners applied to `<ng-container>`, including those applied via directive.
-->
`<ng-container>` 는 여러 엘리먼트를 하나로 묶거나, 템플릿에 추가로 렌더링 될 엘리먼트의 위치를 지정하는 특별한 엘리먼트입니다.

```angular-html
<!-- 컴포넌트 템플릿 -->
<section>
  <ng-container>
    <h3>User bio</h3>
    <p>Here's some info about the user</p>
  </ng-container>
</section>
```

```angular-html
<!-- 렌더링 된 DOM -->
<section>
  <h3>User bio</h3>
  <p>Here's some info about the user</p>
</section>
```

`<ng-container>`에 동작을 추가하거나 템플릿에서 사용되는 설정을 더하려면 이 엘리먼트에 디렉티브를 적용할 수도 있습니다.

다만, Angular는 `<ng-container>`에 바인딩된 어트리뷰트나 이벤트 리스너, 디렉티브는 모두 무시합니다.


<!--
## Using `<ng-container>` to display dynamic contents
-->
## 동적으로 렌더링하기

<!--
`<ng-container>` can act as a placeholder for rendering dynamic content.
-->
`<ng-container>`는 동적 컨텐츠가 렌더링 될 위치를 지정하는 용도로 사용됩니다.


<!--
### Rendering components
-->
### 컴포넌트 렌더링하기

<!--
You can use Angular's built-in `NgComponentOutlet` directive to dynamically render a component to the location of the `<ng-container>`.

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngComponentOutlet]="profileComponent()" />
  `
})
export class UserProfile {
  isAdmin = input(false);
  profileComponent = computed(() => this.isAdmin() ? AdminProfile : BasicUserProfile);
}
```

In the example above, the `NgComponentOutlet` directive dynamically renders either `AdminProfile` or `BasicUserProfile` in the location of the `<ng-container>` element.
-->
`<ng-container>`로 컴포넌트를 동적으로 렌더링하려면 Angular가 제공하는 `NgComponentOutlet` 디렉티브를 사용하면 됩니다.

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngComponentOutlet]="profileComponent()" />
  `
})
export class UserProfile {
  isAdmin = input(false);
  profileComponent = computed(() => this.isAdmin() ? AdminProfile : BasicUserProfile);
}
```

위 예제 코드에서 `NgComponentOutlet` 디렉티브는 조건에 따라 `<ng-container>` 엘리먼트 위치에 `AdminProfile` 이나 `BasicUserProfile` 컴포넌트를 렌더링합니다.


<!--
### Rendering template fragments
-->
### 템플릿 조각 렌더링하기

<!--
You can use Angular's built-in `NgTemplateOutlet` directive to dynamically render a template fragment to the location of the `<ng-container>`.

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngTemplateOutlet]="profileTemplate()" />

    <ng-template #admin>This is the admin profile</ng-template>
    <ng-template #basic>This is the basic profile</ng-template>
  `
})
export class UserProfile {
  isAdmin = input(false);
  adminTemplate = viewChild('admin', {read: TemplateRef});
  basicTemplate = viewChild('basic', {read: TemplateRef});
  profileTemplate = computed(() => this.isAdmin() ? this.adminTemplate() : this.basicTemplate());
}
```

In the example above, the `ngTemplateOutlet` directive dynamically renders one of two template fragments in the location of the `<ng-container>` element.

For more information regarding NgTemplateOutlet, see the [NgTemplateOutlets API documentation page](/api/common/NgTemplateOutlet).
-->
`<ng-container>`로 템플릿 조각을 동적으로 렌더링하려면 Angular가 제공하는 `NgTemplateOutlet` 디렉티브를 사용하면 됩니다.

```angular-ts
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngTemplateOutlet]="profileTemplate()" />

    <ng-template #admin>This is the admin profile</ng-template>
    <ng-template #basic>This is the basic profile</ng-template>
  `
})
export class UserProfile {
  isAdmin = input(false);
  adminTemplate = viewChild('admin', {read: TemplateRef});
  basicTemplate = viewChild('basic', {read: TemplateRef});
  profileTemplate = computed(() => this.isAdmin() ? this.adminTemplate() : this.basicTemplate());
}
```

위 예제 코드에서 `ngTemplateOutlet` 디렉티브는 조건에 따라 `<ng-container>` 엘리먼트 위치에 템플릿 조각 중 하나를 렌더링합니다.

NgTemplateOutlet에 대해 자세하게 알아보려면 [NgTemplateOutlets API 문서](/api/common/NgTemplateOutlet)를 참고하세요.


<!--
## Using `<ng-container>` with structural directives
-->
## `<ng-container>`와 구조 디렉티브 함께 사용하기

<!--
You can also apply structural directives to `<ng-container>` elements. Common examples of this include `ngIf`and `ngFor`.

```angular-html
<ng-container *ngIf="permissions == 'admin'">
  <h1>Admin Dashboard</h1>
  <admin-infographic></admin-infographic>
</ng-container>

<ng-container *ngFor="let item of items; index as i; trackBy: trackByFn">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</ng-container>
```
-->
`<ng-container` 엘리먼트에는 구조 디렉티브를 적용할 수도 있습니다.
다음과 같이 `ngIf`나 `ngFor`를 사용하면 됩니다.

```angular-html
<ng-container *ngIf="permissions == 'admin'">
  <h1>Admin Dashboard</h1>
  <admin-infographic></admin-infographic>
</ng-container>

<ng-container *ngFor="let item of items; index as i; trackBy: trackByFn">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</ng-container>
```


<!--
## Using `<ng-container>` for injection
-->
## 의존성 주입에 `<ng-container>` 사용하기

<!--
See the Dependency Injection guide for more information on Angular's dependency injection system.

When you apply a directive to `<ng-container>`, descendant elements can inject the directive or anything that the directive provides. Use this when you want to declaratively provide a value to a specific part of your template.

```angular-ts
@Directive({
  selector: '[theme]',
})
export class Theme {
  // Create an input that accepts 'light' or 'dark`, defaulting to 'light'.
  mode = input<'light' | 'dark'>('light');
}
```

```angular-html
<ng-container theme="dark">
  <profile-pic />
  <user-bio />
</ng-container>
```

In the example above, the `ProfilePic` and `UserBio` components can inject the `Theme` directive and apply styles based on its `mode`.
-->
Angular 의존성 주입 시스템에 대해 자세하게 알아보려면 의존성 주입 문서를 참고하세요.

`<ng-container>`에 디렉티브를 추가하면 이 엘리먼트의 자식 엘리먼트는 디렉티브 자체나 디렉티브와 연결된 객체를 의존성으로 주입받을 수 있습니다.
템플릿에서 어떤 값을 선언해서 사용해야 한다면 이 방식이 유용합니다.

```angular-ts
@Directive({
  selector: '[theme]',
})
export class Theme {
  // 입력값으로 'light'나 'dark'를 지정합니다. 기본값은 'light' 입니다.
  mode = input<'light' | 'dark'>('light');
}
```

```angular-html
<ng-container theme="dark">
  <profile-pic />
  <user-bio />
</ng-container>
```

위 예제 코드를 보면, `ProfilePic` 컴포넌트와 `UserBio` 컴포넌트는 `Theme` 디렉티브를 의존성 객체로 주입받을 수 있고, `mode` 값에 따라 스타일을 지정할 수 있습니다.
