import { Directive, ElementRef, HostListener } from '@angular/core';
import { ListadoService } from '../services/listado.service';

@Directive({
  selector: '[appColorear]'
})
export class ColorearDirective {

  constructor(
    private el:ElementRef , 
    private listadoServ:ListadoService 
    ) { 
    el.nativeElement.style.backgroundColor='blue';
    
  }



  @HostListener('mouseenter') mouseEnter(){
    this.el.nativeElement.style.backgroundColor = 'red';
    console.log("id elemento: " + this.el.nativeElement.id);

    // this.listadoServ.setRefresh(this.el.nativeElement.id);
  }
  
  @HostListener('mouseleave') mouseLeave(){
    this.el.nativeElement.style.backgroundColor = 'blue';
    console.log("id elemento: " + this.el.nativeElement.id);
  }

}
