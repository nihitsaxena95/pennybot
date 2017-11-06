let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	console.log('body.. ', req.body.intent.label);
	const resultPromise = session.run(
		"match (n:"+req.body.intent.label+"{name:'"+req.body.intent.name+"'}) create (k:Synonym{name:'"+req.body.word+"'})-[:SameAs]->(n) return n,k"
		);
	resultPromise.then(result => {
		session.close();
		console.log('records.. ',result.records)
		res.json(result.records);
	  // on application exit:
	  driver.close();
	});
};