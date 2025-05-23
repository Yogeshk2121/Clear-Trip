import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
baseUrl:string="http://localhost:3000/";

  httpHeaders: HttpHeaders = new HttpHeaders({
    "content-type": "application/json"
  })

  constructor(private http: HttpClient) { }
  
  getHotelsDataFromServer(endPoint:string,obj:any){
    let httpParams = new HttpParams()
                     .set("city",obj.city)
                     .set("checkIn",obj.checkInDate)
                     .set("checkOut",obj.checkOutDate)

    const url = this.baseUrl + endPoint;
    return this.http.get(url,{headers:this.httpHeaders,params:httpParams}) ;             
  }

  getDataFromServer(endPoint: string) {
    const url = this.baseUrl + endPoint;

    return this.http.get(url, { headers: this.httpHeaders });


  }
  getHotelById(id: any): Observable<any> {
    console.log('Making API request with ID:', id.toString()); // Debugging
    return this.http.get<any>(`${this.baseUrl}hotels-details`, {
      params: new HttpParams().set('id', id.toString())
    });
  }
  

  

}
