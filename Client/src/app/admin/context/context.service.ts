import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
@Injectable()
export class ContextService {

constructor(private http:Http) { }

  url:string=config.ip+"/addcontext";


addContext(intent):Observable<any> {
  	return this.http.post(this.url,{data:intent})
  	.map((res:Response)=>{
  		return res.json();
  	})
  }

addSynonym(data): Observable<any> {
    return this.http
    .put(this.url,{data: data})
    .map((res: Response)=>{
      return res.json()
    })
  }

  getContext(){
  //console.log('jkdgfkl')
  let url:any = config.ip+"/train_intent/getContext";
     return this.http.get(url)
    .map((res:Response) =>{
     //console.log("in response ",res);
      return res.json();
    })

}

deleteContext(context) : Observable<any> {
  let url:any = config.ip+"/addcontext/deleteContext";
  console.log('service..',context)
    return this.http
    .post(url,{data: context})
    .map((res: Response)=>{
      console.log(res)
      return res.json()
    })
  }
}
