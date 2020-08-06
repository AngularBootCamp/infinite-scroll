import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[whenVisible]'
})
export class WhenVisibleDirective implements OnInit, OnDestroy {
  @Output() whenVisible = new EventEmitter();

  private observer: IntersectionObserver | undefined;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.whenVisible.emit();
      }
    }, {});

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
