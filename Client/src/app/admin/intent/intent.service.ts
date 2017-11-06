import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';

@Injectable()
export class IntentService {

  constructor(private http:Http) { }

  url:string=config.ip+"/train_intent";


addIntent(intent):Observable<any> {
  	return this.http.post(this.url,{name:intent})
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

}