let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	console.log("enter data in post ",req.body.synonymname,req.body.intentName);
	const resultPromise = session.run(

"MATCH (n:Intent)WHERE n.name = '"+req.body.intentName+"'CREATE (m:Synonym {name : '"+req.body.synonymname+"'} )-[:SameAs]->(n) return m"
		);
	resultPromise.then(result => {
		session.close();
		console.log('getAddedsynonyms.... ',result.records[0]);
				res.json(result.records[0]);
		

	
	  // on application exit:
	  driver.close();
	});
};
