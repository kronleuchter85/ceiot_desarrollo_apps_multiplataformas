import { Component } from '@angular/core';
import { Dispositivo } from '../interfaces/dispositivo';
import { ListadoService } from '../services/listado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'] ,
})
export class ListadoComponent {

  nombre:string="Jose";
  apellido:string="Perez";
  textoBtn:string="Aceptar"
  estaHabilitado:boolean=true;

  devices : Dispositivo[] = [];

  constructor( private listadoServ:ListadoService ) { 
    this.devices = listadoServ.getDispositivos();
  }

  ngOnInit(): void {
  }

  public logConsola(){
    console.log("Aceptar");
    console.log(this.nombre);
    console.log(this.apellido);
  }

  cambiar(){
    console.log(this.estaHabilitado);
    this.estaHabilitado=!this.estaHabilitado;
    console.log("Lo cambio por " + this.estaHabilitado);
  }

  invocarListado(){
    this.listadoServ.getDispositivos();
  }


  onClick(v:any){
    alert(v);
    this.listadoServ.setRefresh(32);
    this.cambiar();
  }

  showReading(d:Dispositivo){
    this.listadoServ.setRefresh(d.lastReading);
  }
}
