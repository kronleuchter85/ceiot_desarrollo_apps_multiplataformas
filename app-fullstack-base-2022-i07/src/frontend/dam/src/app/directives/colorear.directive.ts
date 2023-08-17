import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColorear]'
})
export class ColorearDirective {

  constructor(private el:ElementRef) { 
    el.nativeElement.style.backgroundColor='blue';
  }



  @HostListener('mouseenter') mouseEnter(){
    this.el.nativeElement.style.backgroundColor = 'red';
  }
  
  @HostListener('mouseleave') mouseLeave(){
    this.el.nativeElement.style.backgroundColor = 'blue';
  }

}
