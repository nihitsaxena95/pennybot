const express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=>{
    console.log(req.body)
    req.body.data.syn.map((data1)=>{
        console.log("Here!!!!!!!!!!!!!!!!!!",data1)
        const resultPromise = session.run(                //Query to create relationship between intent and it's synonyms
            'Match(n:'+req.body.data.label+'{name:"'+req.body.data.labelname+'"}) Create (n)<-[:SameAs]-(y:Synonym{name:"'+data1+'"}) return n,y'
        );
        resultPromise.then(result => {
      session.close();
      console.log("ererews!!!!!!!!!!!!!!!",result.records)     
          // on application exit:
          driver.close();
    });
    })        
    res.json({status:true,message:"Relationship Created"});
};