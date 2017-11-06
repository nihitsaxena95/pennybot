let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));


const session = driver.session();

export default (req, res)=>{
		const resultPromise = session.run(				//Query to create relationship between intent and it's synonyms
			'Match(n:'+req.body.data.labelname+'{name:"'+req.body.data.propname+'"}) Create (n)<-[:SameAs]-(y:Synonym{name:"'+req.body.data.syn+'"}) return n,y'
		);
	resultPromise.then(result => {
  	session.close();
    	res.json({status:true,message:"Relationship Created",data:result.records[0]});
  		// on application exit:
  		driver.close();
	});
};