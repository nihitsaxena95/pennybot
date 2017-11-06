let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
  console.log('req',(req.body.syn).length);


req.body.syn.map((data)=>{
  console.log("data ",data);
  
  const resultPromise = session.run(
    "create (a:Synonym {name:'"+data+"'}) return a"
    );
   resultPromise.then(result => {
    session.close();
    res.json(result.records[0]);
  // on application exit:
  driver.close();
});
})



  /*const resultPromise = session.run(
    "create (a:Synonym {name:'"+req.body.name+"'}) return a"
    );
  resultPromise.then(result => {
    session.close();
    res.json(result.records[0]);
  // on application exit:
  driver.close();
});*/
};
/*

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