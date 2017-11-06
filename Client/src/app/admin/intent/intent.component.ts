import { Component, OnInit } from '@angular/core';
import { IntentService } from './intent.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.scss'],
  providers:[IntentService]
})
export class IntentComponent implements OnInit {
	res:any={};
	ref:any={};
	intent:any;
	labelname:any;
	syn:any;
	data:any={};
  constructor(private intentService:IntentService) { }

  ngOnInit() {
  }

addIntent(){
	this.intentService.addIntent(this.intent)
	.subscribe((res)=>{
		this.res=res;
	})
}

addSynonym(){
	this.data= {
		labelname : this.labelname,
		syn:this.syn
	}
	this.intentService.addSynonym(this.data)
	.subscribe((ref)=>{
		this.ref=ref;
	})
}

}