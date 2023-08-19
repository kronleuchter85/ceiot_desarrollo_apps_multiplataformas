import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';

@Injectable(
  {
  providedIn: 'root'
}
)
export class ListadoService {


  devices:Dispositivo[] = [
    {id:1, name:"lampara" , lastReading:15},
    {id:1, name:"lampara" , lastReading:30},
    {id:1, name:"lampara" , lastReading:25},
    {id:1, name:"lampara" , lastReading:60},
    {id:1, name:"lampara" , lastReading:42},
    {id:1, name:"lampara" , lastReading:85},
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
