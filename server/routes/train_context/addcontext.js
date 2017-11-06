let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';

export default(req, res)=>{

req.body.context.name = req.body.context.name.toLowerCase();

if(req.body.selectedContext.label != "") {
	if(req.body.selectedContext.label == 'Domain') {
		const resultPromise = session.run(
  'match(a: '+req.body.selectedContext.label+' {name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubDomain {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
);
resultPromise.then(result => {
	session.close();
	    createSynonym(req.body)
		//createlink(req.body);
  // on application exit:
  console.log({status : true, result : result.records[0]});
	res.json({status : true, result : result.records[0]})
  driver.close();
});
}

else if(req.body.selectedContext.label == 'SubDomain') {
	const resultPromise = session.run(
     'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
	);
	resultPromise.then(result => {
	session.close();
	    createSynonym(req.body)
			//createlink(req.body);
	  // on application exit:
  	console.log({status : true, result : result.records[0]});
	res.json({status : true, result : result.records[0]})
	  driver.close();
	});
	}
else if(req.body.selectedContext.label == 'Entity') {

     const resultPromise = session.run(
     'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Attribute {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
	);
	resultPromise.then(result => {
	session.close();
	    createSynonym(req.body)
			//createlink(req.body);
	  // on application exit:
  	console.log({status : true, result : result.records[0]});
	res.json({status : true, result : result.records[0]})
	  driver.close();
	});



}
// 	const resultPromise = session.run(
//   'match(a:SubDomain{name : "retirement plan"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
// );
// resultPromise.then(result => {
// 	session.close();
// 	    createSynonym(req.body)
// 			//createlink(req.body);
//   // on application exit:
//   console.log({status : true, result : result.records[0]});
// 	res.json({status : true, result : result.records[0]})
//   driver.close();
// });
}

else {
	console.log('in else',req.body.selectedContext)
	const resultPromise = session.run(
  'merge(a:Domain {name :"'+req.body.context.name+'"}) return a'
);
resultPromise.then(result => {
	session.close();
	    createSynonym(req.body)
			//createlink(req.body);
  // on application exit:
  console.log({status : true, result : result.records[0]});
	res.json({status : true, result : result.records[0]})
  driver.close();
});
}

}


// let express = require('express');
// let router = express.Router();
// const neo4j = require('neo4j-driver').v1;

// import config from '../../config/config';
// var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));


// const session = driver.session();
// import createSynonym from './createSynonym';
// import createlink from './createlink';

// export default(req, res)=>{
// if(req.body.selectedContext.label != "") {
// 	if(req.body.selectedContext.label == 'Domain') {
// 		const resultPromise = session.run(
//   'match(a: '+req.body.selectedContext.label+' {name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubDomain {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
// );
// resultPromise.then(result => {
// 	session.close();
// 	    createSynonym(req.body)
// 			//createlink(req.body);
//   // on application exit:
//   console.log({status : true, result : result.records[0]});
// 	res.json({status : true, result : result.records[0]})
//   driver.close();
// });
// }

// else if(req.body.selectedContext.label == 'SubDomain') {
// 	const resultPromise = session.run(
//      'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
// 	);
// 	resultPromise.then(result => {
// 	session.close();
// 	    createSynonym(req.body)
// 			//createlink(req.body);
// 	  // on application exit:
//   	console.log({status : true, result : result.records[0]});
// 	res.json({status : true, result : result.records[0]})
// 	  driver.close();
// 	});
// 	}
// else if(req.body.selectedContext.label == 'Entity') {

//      const resultPromise = session.run(
//      'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Attribute {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
// 	);
// 	resultPromise.then(result => {
// 	session.close();
// 	    createSynonym(req.body)
// 			//createlink(req.body);
// 	  // on application exit:
//   	console.log({status : true, result : result.records[0]});
// 	res.json({status : true, result : result.records[0]})
// 	  driver.close();
// 	});



// }
// // 	const resultPromise = session.run(
// //   'match(a:SubDomain{name : "retirement plan"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
// // );
// // resultPromise.then(result => {
// // 	session.close();
// // 	    createSynonym(req.body)
// // 			//createlink(req.body);
// //   // on application exit:
// //   console.log({status : true, result : result.records[0]});
// // 	res.json({status : true, result : result.records[0]})
// //   driver.close();
// // });
// }

// else {
// 	console.log('in else',req.body.selectedContext)
// 	const resultPromise = session.run(
//   'create(a:Domain {name :"'+req.body.context.name+'"}) return a'
// );
// resultPromise.then(result => {
// 	session.close();
// 	    createSynonym(req.body)
// 			//createlink(req.body);
//   // on application exit:
//   console.log({status : true, result : result.records[0]});
// 	res.json({status : true, result : result.records[0]})
//   driver.close();
// });
// }

// }
