import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';
import { Medicion } from '../interfaces/medicion';

@Injectable(
  {
  providedIn: 'root'
})
export class ListadoService {

  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  private refresh: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    public httpClient:HttpClient
  ) {
    
   }

  public getRefresh(): Observable<number> {
    return this.refresh.asObservable();
  }
  
  public setRefresh(value: number): void {
      this.refresh.next(value);
  } 

  getDispositivos2():  Observable<Dispositivo[]> {
     return this.httpClient.get<Dispositivo[]>('http://localhost:8000/api/devices' );
  }

  createLogRiego(apertura:boolean , electrovalvulaId:number , fecha:string){
    this.httpClient.post('http://localhost:8000/api/riegos' , {apertura: apertura , electrovalvulaId: electrovalvulaId , fecha: fecha});
  }

  getLastReadingByDevice(deviceId : number) : Observable<Medicion[]>{
    return this.httpClient.get<Medicion[]>('http://localhost:8000/api/mediciones/last/' + deviceId );
  }

 

}
