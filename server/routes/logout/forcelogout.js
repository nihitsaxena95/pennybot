import user from '../../model/register_schema';
import express from 'express'; 

export default (req,res) => {
	user.updateOne({'email' : req.body.email }, {$set : {badCount : 0}},(err, data) => {
		if(err) {
			res.json({status:true,message : "error occured", userdata : null}) 
		}
		else {
			res.json({status : true, message:"reset badCount"})
		}
	})
}