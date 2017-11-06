let express = require('express');
let router = express.Router();
let demo=require('../../model/register_schema');

router.post('/', function(req, res) {
	console.log('hiiii',req.body.email);
	let data = req.body.question;
	data.map((chat) => {
		console.log('heyyy',chat)
		console.log('email',req.body.email)
		demo.update({email : req.body.email},{$addToSet : {questions : chat}},(err,data)=>{
			if(err)
		{
			console.log(err);
			res.send(err);
		}
	})
		});
		console.log(data);
		res.json({data:data});
  });
module.exports = router;
