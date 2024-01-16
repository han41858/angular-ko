<!--
# Pipe precedence in template expressions
-->
# 템플릿 표현식 안에서 파이프의 우선순위

<!--
Sometimes you want to choose between two values, based on some condition, before passing the choice to the pipe. You could use the JavaScript ternary operator (`?:`) in the template to make that choice.

Beware! The pipe operator has a higher precedence than the JavaScript ternary operator (`?:`).

If you simply write the expression as if it were evaluated left-to-right, you might be surprised by the result. For example, 
```
condition ? a : b | pipe 
```
is parsed as 
```
condition ? a : (b | pipe)
``` 
The value of `b` passes through `pipe`; the value of `a` *will not*.

If you want the pipe to apply to the result of the ternary expression, wrap the entire expression in parentheses. For example, 
```
(condition ? a : b) | pipe
```
In general, you should always use parentheses to be sure Angular evaluates the expression as you intend.

The "Pipes and Precedence" section of the <live-example noDownload>pipes example</live-example> explores this issue in more detail.
-->
때로는 조건에 따라 두 값 중 하나를 파이프로 전달해야 하는 경우가 있습니다.
이런 경우에는 보통 템플릿 안에서 JavaScript 삼항 연산자(`?:`)를 사용합니다.

하지만 조심하세요!
파이프 연산자는 JavaScript 삼항 연산자보다 우선순위가 높습니다.

그래서 왼쪽부터 오른쪽으로 순서대로 실행되겠지 예상하고 다음과 같이 작성하면, 예상치 못한 결과를 만날 수 있습니다.

```
조건 ? a : b | 파이프
```

이 코드는 이렇게 해석됩니다.

```
조건 ? a : (b | 파이프)
``` 

결국 `b` 값이 파이프로 전달되며, `a`는 *아무런 역할도 하지 않습니다*.

그래서 삼항 연산자를 사용한다면 그 조건 전체를 괄호로 묶어서 다음과 같이 작성해야 합니다.

```
(조건 ? a : b) | 파이프
```

일반적으로 약간이라도 걱정되는 평가식에는 괄호를 항상 사용하는 것이 좋습니다.

자세한 내용은 <live-example noDownload>파이프 예제</live-example>에서 "파이프와 우선순위" 섹션을 참고하세요.


@reviewed 2023-08-14
