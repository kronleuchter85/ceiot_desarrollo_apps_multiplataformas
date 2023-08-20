import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';

@Injectable(
  {
  providedIn: 'root'
})
export class ListadoService {




  devices:Dispositivo[] = [
    {id:1, name:"Sensor 1" , lastReadingValue:15 , lastReadingDate: "2023-08-17T16:49:04.000Z"
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" 
    , riegos: [
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:1}
      , {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:2},
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:3}, ] 
    , mediciones:[
      {dispositivoId:1 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:2 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:3 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:4 , fecha: '2023-03-03', id:1, valor:'12'}
    ]},
    {id:1, name:"Sensor 2" , lastReadingValue:30, lastReadingDate: "2023-08-17T16:49:04.000Z" 
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" ,   riegos: [
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:1}
      , {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:2},
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:3}, ] 
    , mediciones:[
      {dispositivoId:1 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:2 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:3 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:4 , fecha: '2023-03-03', id:1, valor:'12'}
    ]},
    {id:1, name:"Sensor 3" , lastReadingValue:25, lastReadingDate: "2023-08-17T16:49:04.000Z" 
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" , riegos: [
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:1}
      , {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:2},
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:3}, ] 
    , mediciones:[
      
    ]},
    {id:1, name:"Sensor 4" , lastReadingValue:60, lastReadingDate: "2023-08-17T16:49:04.000Z" 
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" , riegos: [
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:1}
      , {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:2},
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:3}, ] 
    , mediciones:[
      {dispositivoId:1 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:2 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:3 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:4 , fecha: '2023-03-03', id:1, valor:'12'}
    ]},
    {id:1, name:"Sensor 5" , lastReadingValue:42, lastReadingDate: "2023-08-17T16:49:04.000Z" 
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" , riegos: [
     ] 
    , mediciones:[
      {dispositivoId:1 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:2 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:3 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:4 , fecha: '2023-03-03', id:1, valor:'12'}
    ]},
    {id:1, name:"Sensor 6" , lastReadingValue:85, lastReadingDate: "2023-08-17T16:49:04.000Z" 
    , location: "Patio" , valveId: 1 , valveName: "eLPatio" , riegos: [
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:1}
      , {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:2},
      {apertura:true , electrovalvulaId:1 , fecha: '2023-03-03' , id:3}, ] 
    , mediciones:[
      {dispositivoId:1 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:2 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:3 , fecha: '2023-03-03', id:1, valor:'12'},
      {dispositivoId:4 , fecha: '2023-03-03', id:1, valor:'12'}
    ]},
  ];

  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    public httpClient:HttpClient
  ) { }

  // getDispositivos():  Observable<Dispositivo[]> {
  //    return this.httpClient.get<Dispositivo[]>('http://localhost:8000/devices' , {
  //     headers: this.corsHeaders
  //   });
  // }


  getDispositivos():  Dispositivo[] {
    return this.devices;
  }

  private refresh: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public getRefresh(): Observable<number> {
     return this.refresh.asObservable();
  }
  
  public setRefresh(value: number): void {
     this.refresh.next(value);
  } 

}
