let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

 export default (req, res)=>{
 	console.log('hello',req.body)
const resultPromise = session.run(
  "create (n:Intent {type:'"+req.body.type+"', value:'"+req.body.value+"'}) return n"
);
resultPromise.then(result => {
  session.close();
 // console.log("resss...",result.records[0]._fields)
    res.json(result.records[0]);
  // on application exit:
  driver.close();
});
};




