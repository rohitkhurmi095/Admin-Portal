import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //Note: This is a common serivce for api calls
  constructor(private _http:HttpClient){ }

  //----
  //GET
  //----
  public get(url:string):Observable<any>{
    return this._http.get(url);
  }

  //-----
  //POST
  //-----
  public post(url:string,data:any):Observable<any>{
    //convert data(Object) to lightweight format(String) before posting to API
    const body = JSON.stringify(data);
    return this._http.post(url,body,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  
  //-----
  //PUT
  //-----
  public put(url:string,id:number,data:any):Observable<any>{
    //convert data(Object) to lightweight format(String) before posting to API
    const body = JSON.stringify(data);
    return this._http.put(url+id,body,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }

  //-------
  //DELETE
  //-------
  public delete(url:any,id:number):Observable<any>{
    return this._http.delete(url+id)
  }
}
