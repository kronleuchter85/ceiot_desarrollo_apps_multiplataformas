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
    {id:1, name:"Sensor 1" , lastReadingValue:15 , lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
    {id:1, name:"Sensor 2" , lastReadingValue:30, lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
    {id:1, name:"Sensor 3" , lastReadingValue:25, lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
    {id:1, name:"Sensor 4" , lastReadingValue:60, lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
    {id:1, name:"Sensor 5" , lastReadingValue:42, lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
    {id:1, name:"Sensor 6" , lastReadingValue:85, lastReadingDate: "2023-08-17T16:49:04.000Z" , location: "Patio" , valveId: 1 , valveName: "eLPatio"},
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
