import express from 'express'; // File for messages
import logger from '../../log4js';
import add_task from './../../model/add_task';

export default (req,res)=>{
	console.log('=========',req.body.message[1]);

	//add_task.insertOne({taskname : req.body.message[0].TaskName , data : req.body.message },(error,data)=>{
add_task.update({taskname : req.body.message[0].TaskName},{$addToSet :{data : req.body.message}},{upsert:true},(error,data)=>{
		if(data){
			res.json({data : data})
		}
		else{
			res.send({'error' : error })
		}

	})

}