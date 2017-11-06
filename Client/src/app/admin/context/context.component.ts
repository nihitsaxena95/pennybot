import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import {ContextService} from './context.service' ;
import swal from 'sweetalert2';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  providers : [ ContextService ]
})
export class ContextComponent implements OnInit {

	context:any ={};

  constructor(private contextService: ContextService, private router : Router) { }

  contextName:any=[];
  res:any={};
  ref:any={};

  ngOnInit() {
    this.getContext();
  }

  gotoAddContext() {
    this.router.navigate(['/admin/trainingbot/addnewcontext',this.context])
  }

  getContext(){
    this.contextName=[];
    this.contextService.getContext()
   .subscribe((res)=>{
     res.map((data)=>{
       data._fields.map((name)=>{
         if(name.labels[0] != 'Video' && name.labels[0] != 'Link' && name.labels[0] != 'Counter'){
           console.log('context here', name.labels[0]);
           this.contextName.push(name)
         }
       })
     })
     this.res=res;
   })
 
}





  deleteContext(context){
    

      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        this.contextService.deleteContext(context)
    .subscribe((res)=>{
      this.ref=res;

        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
        })

      })
      this.getContext();

      
    

  }

}


