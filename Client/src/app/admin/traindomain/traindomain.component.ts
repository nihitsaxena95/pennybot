import { Component, OnInit } from '@angular/core';
import { TraindomainService} from './traindomain.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

/*Component for train Domain */
@Component({
  selector: 'app-traindomain',
  templateUrl: './traindomain.component.html',
  styleUrls: ['./traindomain.component.scss'],
   providers:[TraindomainService]
})
export class TraindomainComponent implements OnInit {

 object:any ={};
 
   editflag:any;
  syn:any;
 ref = [{
    word:"Mutual Fund",
    type: "intent",
    value:"about"
  }]

rem = [{
   word:"Mutual Fund",
    type: undefined,
    value:undefined


}]

  constructor(private traindomainService:TraindomainService) { }

  ngOnInit() {
      //   this.traindomainService.fetch(this.object).subscribe(res=>this.ref=res)
  }


changeto(ref:any,type:any) {
     console.log(this.ref);
     this.editflag = this.ref[0].type;
   } 


  change(object){

      this.traindomainService.changeIntent(this.ref).subscribe(res=>this.ref=res)

  }

   add(object){
      this.traindomainService.addSentence(this.rem)
      .subscribe(res=>{
  console.log('componernt.. ',res);
        this.ref=res})


  }

/*
addSynonyms(object){

this.traindomainService.addSyn(object).subscribe(res=>this.syn=res)
}
*/

}
