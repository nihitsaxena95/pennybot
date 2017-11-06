let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));


const session = driver.session();



export default (req, res)=> {
  console.log('hiiii')
  console.log('relation name...',req.body.intent_name)
  console.log('relation meaning...',req.body.intent_meaning)
  console.log('relation...',req.body.syn.syn)
  

req.body.syn.syn.map((data)=>{
  const resultPromise = session.run(
    " match (a:Synonym {name:'"+data+"'}),(b:Intent {name:'"+req.body.intent_name+"',meaning:'"+req.body.intent_meaning+"'}) create (a)-[:SameAs]->(b) return a,b"
    );
  resultPromise.then(result => {
    session.close();
    console.log("relation record... ",result.records[0])
    res.json(result);
  // on application exit:
  driver.close();
});
})
  
};


/*
router.post('/', function(req, res) {
  console.log('relation...',req.body)
  const resultPromise = session.run(
    "match (a:Synonym {name:'"+req.body.name+"'}) ,(b:Intent {name:}) return a"
    );
  resultPromise.then(result => {
    session.close();
    console.log("oyaaaa",result.records[0]._fields)
    res.json(result.records[0]);
  // on application exit:
  driver.close();
});
});


router.get('/', function(req, res) {
  console.log(req.body)
  const resultPromise = session.run(
    "match (n) return n"
    );
  resultPromise.then(result => {
    session.close();

    res.json(result.records);
  // on application exit:
  driver.close();
});
});

module.exports = router;*/