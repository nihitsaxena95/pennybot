let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));


const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';

export default(req, res)=>{
	console.log('jhjhdfjh');
  console.log('labels....=====',req.body.data.labels);
   console.log('bodyyy..====',req.body.data.properties.name);
const resultPromise = session.run(
  'match(a:'+req.body.data.labels[0]+' {name : "'+req.body.data.properties.name+'"}) detach delete a'
);
resultPromise.then(result => {
	session.close();
  console.log({status : true, result : result.records[0]});
	res.json({status : true, result : result.records[0]})
  driver.close();
});

};