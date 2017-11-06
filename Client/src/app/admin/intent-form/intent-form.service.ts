import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
@Injectable()
export class IntentFormService {

  constructor(private http:Http) { }


  url:string=config.ip+"/train_intent";
  synonymUrl:string=config.ip+"/synonym";
  relationUrl:string=config.ip+"/synonym/relation";

  addSyn(syn): Observable<any> {
    console.log(syn)
  	return this.http
  	.post(this.synonymUrl,{syn: syn})
  	.map((res: Response)=>{ //console.log('service ',res); 
  		return res.json()
  	})
  }

  addRelation(relation) {
    console.log('relation',relation)
    return this.http
    .post(this.relationUrl,relation)
    .map((res: Response)=>{
      console.log('relation res.... ',res.json());
       res.json()
    })
  }

  addIntent(intent):Observable<any> {
  	//console.log('serv..',intent)
  	return this.http.post(this.url,intent)
  	.map((res:Response)=>{
  		//console.log(res);
  		return res.json();
  	})
  }


  getIntent():Observable<any>{
    return this.http.get(this.url)
    .map((res:Response)=>{
      const data=res.json().map((data)=>data._fields[0].properties.name);
      return data;
    })
  }
}
