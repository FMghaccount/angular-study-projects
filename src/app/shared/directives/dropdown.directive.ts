import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  display: boolean = false;

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') click(eventData: Event) {
    if (!this.display) {
      this.renderer.addClass(this.elemRef.nativeElement, 'show')
      this.renderer.addClass(this.renderer.nextSibling(this.elemRef.nativeElement), 'show')
      this.renderer.setAttribute(this.renderer.nextSibling(this.elemRef.nativeElement), 'data-bs-popper', 'static')
    } else {
      this.renderer.removeClass(this.elemRef.nativeElement, 'show')
      this.renderer.removeClass(this.renderer.nextSibling(this.elemRef.nativeElement), 'show')
      this.renderer.removeAttribute(this.renderer.nextSibling(this.elemRef.nativeElement), 'data-bs-popper')
    }
    this.display = !this.display;
  }
}
