<!--
# Migration to self-closing tags
-->

<a id="migration-to-self-closing-tags"></a>

# 자체 닫기 태그로 마이그레이션하기

<!--
Self-closing tags are supported in Angular templates since [v16](https://blog.angular.dev/angular-v16-is-here-4d7a28ec680d#7065). .
-->

Angular 템플릿은 [v16](https://blog.angular.dev/angular-v16-is-here-4d7a28ec680d#7065)부터 자체 닫기 태그를 지원합니다.

<!--
This schematic migrates the templates in your application to use self-closing tags.
-->

이 스키매틱은 애플리케이션의 템플릿을 자체 닫기 태그를 사용하도록 마이그레이션합니다.

<!--
Run the schematic using the following command:
-->

다음 명령어로 스키매틱을 실행하세요.

```shell
ng generate @angular/core:self-closing-tag
```

<!--
#### Before
-->

<a id="before"></a>

#### 이전

```angular-html
<hello-world></hello-world>
```

<!--
#### After
-->

<a id="after"></a>

#### 이후

```angular-html
<hello-world />
```
