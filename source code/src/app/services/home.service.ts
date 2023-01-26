import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { RequestHandlerService } from '@app/shared/services/request-handler.service';
//import { eConstants } from '@app/shared/enums/eConstants';
//import { IInvoice } from '../models/invoices.interface';
import { environment } from 'src/enviroments/enviroment';
import { HttpHeaders } from '@angular/common/http';
import { Areas, Garage } from '../models/garage.model';
import { Observable } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept-Charset','UTF-8')
  .set( 'Access-Control-Allow-Origin', '*')

@Injectable()
export class HomeService {

  private _baseUrl = 'api';

  constructor(private http: HttpClient) { }
  getGarages(city?:string) :Observable<Garage[]>{
    return this.http.post<Garage[]>(`api/experts/getgarages`,{"city":city},{headers: new HttpHeaders({
        'content-type': 'application/json',
 'Accept-Charset':'UTF-8',
 'Access-Control-Allow-Origin': '*'
    })});
  }

  getGaragesByArea(area?:string,city?:string) :Observable<Garage[]>{
    return this.http.post<Garage[]>(`api/experts/getgarages`,{"area":area,"city":city},{headers: new HttpHeaders({
        'content-type': 'application/json',
 'Accept-Charset':'UTF-8',
 'Access-Control-Allow-Origin': '*'
    })});
  }

  getGarageAreas(Area?:string):Observable<Areas> {
    return this.http.post<Areas>(`experts/api/garageareas`,{"Area":Area},{headers: new HttpHeaders({
        'content-type': 'application/json',
 'Accept-Charset':'UTF-8',
 'Access-Control-Allow-Origin': '*'
    })});  }

}
