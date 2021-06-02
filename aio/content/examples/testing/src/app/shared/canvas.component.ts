// #docplaster
// #docregion import-canvas-patch
// 비동기 `HTMLCanvasElement` 메서드(ex. `.toBlob()`)를 지원하기 위해 패치를 로드합니다.
// 이 패치는 `polyfills.ts` 파일이나 `HTMLCanvasElement` 파일에 적용하면 됩니다.
import 'zone.js/plugins/zone-patch-canvas';
// #enddocregion import-canvas-patch
// #docregion main
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'sample-canvas',
  template: '<canvas #sampleCanvas width="200" height="200"></canvas>',
})
export class CanvasComponent implements AfterViewInit {
  blobSize = 0;
  @ViewChild('sampleCanvas') sampleCanvas!: ElementRef;

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.sampleCanvas.nativeElement;
    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, 200, 200);
    context.fillStyle = '#FF1122';
    context.fillRect(0, 0, 200, 200);

    canvas.toBlob(blob => {
      this.blobSize = blob?.size ?? 0;
    });
  }
}
// #enddocregion main
