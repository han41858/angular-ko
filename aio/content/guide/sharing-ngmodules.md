<!--
# Sharing modules
-->
# 모듈 공유하기

<!--
Creating shared modules allows you to organize and streamline your code. You can put commonly
used directives, pipes, and components into one module and then import just that module wherever
you need it in other parts of your app.
-->
모듈을 만들어서 공유하면 코드를 효율적으로 사용할 수 있습니다.
자주 사용하는 디렉티브나 파이프, 컴포넌트가 있다면, 이 구성요소들을 모듈로 묶어서 필요한 곳에 사용할 수 있습니다.

<!--
Consider the following module from an imaginary app:
-->
어떤 앱에 다음과 같은 모듈이 있다고 합시다:

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { NewItemDirective } from './new-item.directive';
import { OrdersPipe } from './orders.pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ CustomerComponent, NewItemDirective, OrdersPipe ],
 exports:      [ CustomerComponent, NewItemDirective, OrdersPipe,
                 CommonModule, FormsModule ]
})
export class SharedModule { }
```
<!--
Note the following:

* It imports the `CommonModule` because the module's component needs common directives.
* It declares and exports the utility pipe, directive, and component classes.
* It re-exports the `CommonModule` and `FormsModule`.
-->
이 코드에서 다음 내용을 확인할 수 있습니다:

* 이 모듈은 Angular 기본 디렉티브를 사용하기 위해 `CommonModule`을 로드합니다.
* 이 모듈은 파이프와 디렉티브, 컴포넌트 클래스를 모듈 외부로 공개합니다.
* 모듈에 사용된 `CommonModule`과 `FormsModule`도 모듈 외부로 공개합니다.

<!--
By re-exporting `CommonModule` and `FormsModule`, any other module that imports this
`SharedModule`, gets access to directives like `NgIf` and `NgFor` from `CommonModule`
and can bind to component properties with `[(ngModel)]`, a directive in the `FormsModule`.
-->
`CommonModule`과 `FormsModule`은 `SharedModule`에서 `NgIf`나 `NgFor`, `[(ngModel)]`을 사용하기 위해 로드했지만, 모듈 외부로 공개되었기 때문에 `SharedModule`을 로드하는 다른 모듈은 `CommonModule`이나 `FormsModule`을 따로 로드하지 않아도 이 모듈들을 사용할 수 있습니다.

<!--
Even though the components declared by `SharedModule` might not bind
with `[(ngModel)]` and there may be no need for `SharedModule`
to import `FormsModule`, `SharedModule` can still export
`FormsModule` without listing it among its `imports`. This
way, you can give other modules access to `FormsModule` without
having to import it directly into the `@NgModule` decorator.
-->
`SharedModule`의 컴포넌트에 `[(ngModel)]`이 사용되지 않아서 실제로는 `SharedModule`이 `FormsModule`을 로드할 필요가 없더라도, `imports` 목록에 등록되어 있기 때문에 `SharedModule`은 `FormsModule`을 모듈 외부로 공개합니다.
그러면 `SharedModule`을 로드하는 다른 모듈은 `FormsModule`을 따로 로드하지 않아도 이 모듈을 사용할 수 있습니다.


<!--
## More on NgModules
-->
## NgModule 더 알아보기

<!--
You may also be interested in the following:
* [Providers](guide/providers).
* [Types of Feature Modules](guide/module-types).
-->
다음 내용에 대해서 더 알아보세요:
* [프로바이더](guide/providers)
* [기능 모듈의 종류](guide/module-types)