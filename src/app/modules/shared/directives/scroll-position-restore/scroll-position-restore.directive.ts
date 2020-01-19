import { AfterViewInit, Directive, ElementRef, HostListener, Input, } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScrollPositionService } from './scroll-position.service';

@Directive({
  selector: '[gpScrollPositionRestore]',
})
export class ScrollPositionRestoreDirective implements AfterViewInit {
  @Input('gpScrollPositionRestore') areaName = '';

  @Input() waitForObservable: Observable<unknown>;

  constructor(
    private readonly positionService: ScrollPositionService,
    private readonly el: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit(): void {
    if (this.waitForObservable) {
      this.waitForObservable.pipe(take(1)).subscribe(() => {
        this.restoreScroll();
      });
    } else {
      this.restoreScroll();
    }
  }

  @HostListener('scroll', ['$event'])
  scrollListener(event: { target: HTMLElement }) {
    this.positionService.setPosition(this.areaName, event.target.scrollTop);
  }

  restoreScroll() {
    if (this.positionService.hasPosition(this.areaName)) {
      const scrollTop = this.positionService.getPosition(this.areaName);
      this.el.nativeElement.scrollTo({
        top: scrollTop,
      });
    }
  }
}
