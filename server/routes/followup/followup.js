import express from 'express';
import task from './task';
export default (req,res) => {
	//res.json(req.body.counter);
	//console.log(req.body);
	let questionbank = task.find((data)=> {
		if(data.task == req.body.counter) {
			//console.log("here inside can",data.question);
			return data.question;
		}
	})

	res.json({question : questionbank.question[0], type : questionbank.task});
}