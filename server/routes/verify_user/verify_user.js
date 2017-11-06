import register from '../../model/register_schema';
import staticConfig from './staticconfig';
import express from 'express';
//import logger from '../../log4js';

//Get method is used to check id exists
export default(req, res) => {
  try{
    register.find({_id:req.params.id},(err,check)=>{
    //console.log('hi', check[0])
    if(err){
      //logger.info(staticConfig.verify_user.messageOnIdNotFound )
      res.json({message : staticConfig.verify_user.messageOnIdNotFound ,Error : err});    //response to client
    }
    else if(check==undefined){
      //logger.info(staticConfig.verify_user.messageonDataUndefined)
     res.json({message: staticConfig.verify_user.messageonDataUndefined,data:null});
   }
        //If id exists we are checking if status is false, we verify and make status true

        else if(check[0].status==false){
          register.update({_id:req.params.id},{$set:{"status":true}},{upsert:true},(err,data)=>{
            if(err)
            {
              //logger.info(staticConfig.verify_user.messageOnUpdateFailure)
              res.json({message : staticConfig.verify_user.messageOnUpdateFailure ,Error : err});
            }
            else if(data==undefined){
              //logger.info(staticConfig.verify_user.messageOnVerificationUndefined)
             res.json({message:staticConfig.verify_user.messageOnVerificationUndefined,data:null});
           }
           else
           {
             register.find({_id : req.params.id}, (err,data) => {
              //logger.info(staticConfig.verify_user.messageOnVerificationSuccess)
              res.json({message: staticConfig.verify_user.messageOnVerificationSuccess ,"userdata" : data[0]});
            })

           }
         })
        }
        else {
          //logger.info(staticConfig.verify_user.messageOnVerificationFailure)
          res.json({message: staticConfig.verify_user.messageOnVerificationFailure ,"userdata":check});
        }
      })
  }catch(error){        //error handling
    //logger.info(staticConfig.errorMessage.val)
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});
  }
};