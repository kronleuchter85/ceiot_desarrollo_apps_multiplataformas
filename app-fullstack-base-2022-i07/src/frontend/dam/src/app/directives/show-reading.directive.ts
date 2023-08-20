import { Directive, ElementRef, HostListener } from '@angular/core';
import { ListadoService } from '../services/listado.service';

@Directive({
  selector: '[showReading]'
})
export class ShowReadingDirective {

  constructor(
    private el:ElementRef , 
    private listadoServ:ListadoService 
    ) { 
    el.nativeElement.style.backgroundColor='blue';
    
  }

  @HostListener('click') mouseClick(){
    console.log("id elemento: " + this.el.nativeElement.id);

    var index = this.el.nativeElement.id;
    var device = this.listadoServ.getDispositivos()[Number(index)];
    console.log(device);
    this.listadoServ.setRefresh(device.lastReadingValue);
  }


}
