import { Component, OnInit } from '@angular/core';
import { IntentFormService } from './intent-form.service';

@Component({
  selector: 'app-intent-form',
  templateUrl: './intent-form.component.html',
  styleUrls: ['./intent-form.component.scss'],
  providers:[IntentFormService]
})
export class IntentFormComponent implements OnInit {
  
  res:any={};
  flag:any=0;
  intent:any={};
  ref:any={};
  relation:any={};
  synonyms:any;
  questions:any[]=[];

  constructor(private intentFormService:IntentFormService) { }

  addSyn(syn){
     //console.log('int..',this.intent)
    console.log(syn);
  	this.intentFormService.addSyn(syn)
  	.subscribe((res)=>{//console.log('ress..',res); 
      this.res=res ;

    this.relation={
      syn:{syn:syn},
      intent_name:this.intent.name,
      intent_meaning:this.intent.meaning
    }
    
      this.addRelation(this.relation);
       })

  }

  addRelation(relation) {
    this.intentFormService.addRelation(relation)
    .subscribe((res)=> 
      this.res=res)
  }


  addQues(ques) {
    this.questions.push(1);
    this.flag=this.flag+1;
  }

  addIntent() {
    this.intentFormService.addIntent(this.intent)
    .subscribe((ref)=>{
      console.log('compo..',ref);
      this.ref=ref;
    })
  }

  getIntent() {
    this.intentFormService.getIntent()
    .subscribe((res)=>{
      console.log('conponent.. ',res)
      this.synonyms=res;
    })
  }


  ngOnInit() {
    this.getIntent()
  }

}

