import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import {BottrainingService} from './bottraining.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bottraining',
  templateUrl: './bottraining.component.html',
  styleUrls: ['./bottraining.component.scss'],
   providers: [BottrainingService]
})
export class BottrainingComponent implements OnInit {
 ref:any={};
  arr:any=[];
  intentName:any=[];
  contextName:any=[];
  question:any = 'Question';
  intent:any;
  context:any;
  intentValue:any;
  contextValue:any;
  flag:any=0;
  intentWord:any;
  contextWord:any;
  len:any;
  res:any={};
  type:any;
  word:any;
  typename:any;
  tableData: any = [];
  index:any;
  array:any=[];
 object:any ={}; 
   editflag:any;
  syn:any;
val:any; 
contexttype:any;
resp:any;
  refer:any;
  addintent:any;
  labelname:any;
  temp:any;
  synres:any;
  main:any=[];
  priority:any;
  correspondSynonym:any=[];
  adminSynonym:any;
  intentname:any;
  value:any;
  newQuestion:any;
  newgetQuestion:any;

  constructor(private bottrainingservice:BottrainingService, private router: Router) { }

  ngOnInit() {
    this.getunanswer();
    this.getIntent();
    this.getContext();
  }

  getunanswer(){
    this.bottrainingservice.getunanswer()
    .subscribe((res)=>{
      this.arr = [];
      this.ref=res[0].questions;
    //  console.log(res[0].questions)
      res[0].questions.map((ques)=>{
      //  console.log(ques.question);
        this.arr.push(ques.question)
      })
    })
  }
getQues(ques){
  this.newgetQuestion = ques;
   this.bottrainingservice.getQues(ques).subscribe((res)=>{
     this.tableData = [];
    // console.log(res[0].word);

     res.map((data)=>{
       //console.log(data);
       if(data.word == "")
         this.word = "Not Found";
       else
         this.word = data.word;

       if(data.type == "")
         this.type = "Not Found";
       else
         this.type = data.type;

       if(data.typename == "")
         this.typename = "Not Found";
       else
         this.typename = data.typename;

         this.tableData.push({word : this.word , type : this.type , typename : this.typename})
        // console.log("Table Data" , this.tableData);
     })
     
   })
   this.question = ques;
 }

  getIntent(){

    this.bottrainingservice.getIntent()
    .subscribe((res)=>{
      this.intentName = [];
      res.map((data)=>{
        data._fields.map((name)=>{
          this.intentName.push({
            label:name.labels[0],
            name:name.properties.name
          })
        })
      })
      this.res=res;
    })
  }


  getContext(){
    this.bottrainingservice.getContext()
    .subscribe((res)=>{
         console.log(res)
          res.map((data)=>{
            data._fields.map((name)=>{
              console.log(name);
              if(name.labels[0] != 'Video' && name.labels[0] != 'Link' && name.labels[0] != 'Counter'){
              this.contextName.push(name)}
            })        
      })
      this.res=res;
    })
}


// changeto(ref:any,type:any) {
//      console.log(this.ref);
//      this.editflag = this.refer[0].type;
//    } 


//   change(object){

//       this.bottrainingservice.changeIntent(this.refer).subscribe(res=>this.ref=res)

//   }

//    add(object){
//       this.bottrainingservice.addSentence(this.rem)
//       .subscribe(res=>{
//         //console.log('componernt.. ',res);
//         this.ref=res})
//   }

setSynonym(intent){
  console.log('---------------------====================================--------------------------------------')
  console.log(intent)
  this.bottrainingservice.setSynonym(intent,this.val)
      .subscribe(res=>{
    alert('added succesfully')    
    this.ref=res
     this.getQues(this.newgetQuestion);
  })
}

contextSynonym(context){
 /* this.tableData.map((data)=>{
    console.log(data.type)

  })*/
 //console.log(this.tableData);
  this.bottrainingservice.contextSynonym(context,this.val)
  .subscribe(res =>{
    alert('added successfully');
      console.log('context.. ' ,res)
    this.ref=res
  })
}

sendques(question){
  this.newQuestion = "";
 // console.log("question",question)
  this.bottrainingservice.sendques(question)
      .subscribe(res=>{
        this.getunanswer();
   // alert('added succesfully')    //console.log('componernt.. ',res);
        this.ref=res})
}

  remove(index,data) {
    this.tableData.splice(this.tableData.indexOf(data),1);   
  }


  call(value,type) {
   console.log('callll..',value,type)
    this.val=value;
    this.contexttype=type;
    this.getQues(this.newgetQuestion);
  }

  addIntent(){
    const data={
      label:this.value,
      labelname:this.addintent,
      priority:this.priority
    }
    if(this.addintent==undefined || this.priority ==undefined){
          swal('',"please fill the fields",'error');
    }else{
      this.bottrainingservice.addIntent(data)
      .subscribe((res)=>{
        if (res.status==true)
        { console.log(res)
          this.resp=res;
          swal('',"Successfully Added",'success');
        }  
      })
    }
      this.getIntent();
  }
  
addSynonym(){
  const data= {
    label:this.value,
    labelname : this.addintent,
    syn:this.main
  }
  if(this.addintent==undefined || this.main ==undefined){
          swal('',"please fill the fields",'error');
    }else{
      this.bottrainingservice.addSynonym(data)
      .subscribe((ref)=>{
      this.getIntent();
      if (ref.status==true)
      {
        this.refer=ref;
        alert('add succesfully')
        this.router.navigateByUrl('/admin/trainingbot');
      }    
    })
    }  
}

relatedentity(intentName)
{
  this.intentname=intentName;
  this.bottrainingservice.getRelatedEntity(intentName)
  .subscribe((res)=>{
    this.correspondSynonym=res;
    })
}

addAdminSynonym()
{  
  this.bottrainingservice.addMoreSynonym(this.adminSynonym,this.intentname)
  .subscribe((res)=>{
    this.correspondSynonym.push(res._fields[0].properties.name);
    })
}

deletesynonym(syno)
{  
  this.bottrainingservice.deleteSynonym(syno,this.intentname)
  .subscribe((res)=>{
    console.log(res);
    })
}


suggest(){
  const data= {
    labelname : this.addintent,
    word:this.temp
  }
  this.bottrainingservice.suggest(data)
  .subscribe((ref)=>{
    this.synres=ref;
  })
}
select(val){
  this.temp=val;
  this.main.push(val);
}

deleteIntent(intent){
  console.log(intent);
  this.bottrainingservice.deleteIntent(intent)
  .subscribe((res)=>{
    this.getIntent();
    console.log('ress..',res);
  })
}
ifselected(val){
  this.value=val;
}
}


