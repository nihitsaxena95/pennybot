let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	var finaloutput=[];
	console.log("delete",req.body);
	const resultPromise = session.run(
		"MATCH (a:Intent {name:'"+req.body.intentname+"'})-[r:SameAs]-(b:Synonym {name:'"+req.body.synonymname+"'})DELETE r,b with a match(c:Intent{name:'"+req.body.intentname+"'})-[]-(d) return c,d"
		);
	resultPromise.then(result => {
		session.close();

		console.log("delete again",req.body);
			for(var i in result.records)
		{
			var output=result.records[i];
			console.log('records with getRElatedEntity.... ',output._fields[1].properties.name)
			finaloutput.push(output._fields[1].properties.name); 
		}
			res.json(finaloutput);
		console.log('getdeletesynonyms.... ',finaloutput);

	
	  // on application exit:
	  driver.close();
	});
};