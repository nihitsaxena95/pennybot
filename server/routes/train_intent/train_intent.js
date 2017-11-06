let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default(req, res)=>{
	console.log(req.body.data.label);
const resultPromise = session.run(
  "create(n:"+req.body.data.label+"{name:'"+req.body.data.labelname+"',priority:'"+req.body.data.priority+"'})<-[:SameAs]-(b:Synonym{name:'"+req.body.data.labelname+"'}) Return n"
);
resultPromise.then(result => {
  session.close();
  console.log(result.records);
    res.json({status:true,message:"success",data:result.records[0]});
  // on application exit:
  driver.close();
});
};