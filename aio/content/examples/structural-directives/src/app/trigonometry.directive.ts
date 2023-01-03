import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appTrigonometry]' })
export class TrigonometryDirective {
  private isViewCreated = false;
  private readonly context = new TrigonometryContext();

  @Input('appTrigonometry') set angle(angleInDegrees: number) {
    const angleInRadians = toRadians(angleInDegrees);
    this.context.sin = Math.sin(angleInRadians);
    this.context.cos = Math.cos(angleInRadians);
    this.context.tan = Math.tan(angleInRadians);

    if (!this.isViewCreated) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
      this.isViewCreated = true;
    }
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<TrigonometryContext>
  ) {}

  // 템플릿 체커는 어떤 디렉티브가 템플릿에 사용되는지 알 수 있기 때문에
  // 컨텍스트의 타입을 정확하게 파악할 수 있습니다.
  static ngTemplateContextGuard(
    directive: TrigonometryDirective,
    context: unknown
  ): context is TrigonometryContext {
    return true;
  }
}

class TrigonometryContext {
  sin = 0;
  cos = 0;
  tan = 0;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
