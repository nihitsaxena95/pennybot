let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();
import createlink from './createlink';

export default (body) => {
	let flag = 0;
	let synonym = [];
	console.log('hdjcn', body.synonym)
	if(body.synonym != undefined)
	{
		body.synonym.map(syn => {
			synonym.push(syn);
		})
	}
	synonym.push(body.context.name);
	synonym.map((syn) => {
		console.log('syn==============',syn);
		if(body.selectedContext.label != "") {
			if(body.selectedContext.label == 'SubDomain') {
				const resultPromise = session.run(
			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:Entity{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
			);
			resultPromise.then(result => {
			session.close();
			flag++;
			console.log('flag',flag,synonym.length);
  		// on application exit:
  		driver.close();
  		if(flag == synonym.length){
			createlink(body);		
	}
  });
			}


      else if(body.selectedContext.label == "Entity"){  

       const resultPromise = session.run(
			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:Attribute{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
			);
			resultPromise.then(result => {
			session.close();
			flag++;
			console.log('flag',flag,synonym.length);
  		// on application exit:
  		driver.close();
  		if(flag == synonym.length){
			createlink(body);		
	}
  });
      }

      else {
      	const resultPromise = session.run(
			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:SubDomain{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
			);
			resultPromise.then(result => {
			session.close();
			flag++;
			console.log('flag',flag,synonym.length);
  		// on application exit:
  		driver.close();
  		if(flag == synonym.length){
			createlink(body);		
	}
  });
      }

		}
		else if(body.selectedContext.label=='') {
			console.log('chutiya' , body)
			const resultPromise = session.run(
			'match(a:Domain {name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
			);
		resultPromise.then(result => {
			//session.close();
			flag++;
			console.log('flag',flag,synonym.length);
  	// on application exit:
  	//driver.close();
  	if(flag == synonym.length){
			createlink(body);		
	}
  });
		}
		
	})
}




// let express = require('express');
// let router = express.Router();
// const neo4j = require('neo4j-driver').v1;
// import config from '../../config/config';
// var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

// const session = driver.session();
// import createlink from './createlink';

// export default (body) => {
// 	let flag = 0;
// 	let synonym = [];
// 	console.log('hdjcn', body.synonym)
// 	if(body.synonym != undefined)
// 	{
// 		body.synonym.map(syn => {
// 			synonym.push(syn);
// 		})
// 	}
// 	synonym.push(body.context.name);
// 	synonym.map((syn) => {
// 		console.log('syn==============',syn);
// 		if(body.selectedContext.label != "") {
// 			if(body.selectedContext.label == 'SubDomain') {
// 				const resultPromise = session.run(
// 			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:Entity{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
// 			);
// 			resultPromise.then(result => {
// 			session.close();
// 			flag++;
// 			console.log('flag',flag,synonym.length);
//   		// on application exit:
//   		driver.close();
//   		if(flag == synonym.length){
// 			createlink(body);		
// 	}
//   });
// 			}


//       else if(body.selectedContext.label == "Entity"){  

//        const resultPromise = session.run(
// 			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:Attribute{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
// 			);
// 			resultPromise.then(result => {
// 			session.close();
// 			flag++;
// 			console.log('flag',flag,synonym.length);
//   		// on application exit:
//   		driver.close();
//   		if(flag == synonym.length){
// 			createlink(body);		
// 	}
//   });
//       }

//       else {
//       	const resultPromise = session.run(
// 			'match(:'+body.selectedContext.label+' {name : "'+body.selectedContext.name+'"})-[:type]->(a:SubDomain{name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
// 			);
// 			resultPromise.then(result => {
// 			session.close();
// 			flag++;
// 			console.log('flag',flag,synonym.length);
//   		// on application exit:
//   		driver.close();
//   		if(flag == synonym.length){
// 			createlink(body);		
// 	}
//   });
//       }

// 		}
// 		else if(body.selectedContext.label=='') {
// 			console.log('chutiya' , body)
// 			const resultPromise = session.run(
// 			'match(a:Domain {name : "'+body.context.name+'"}) merge(a)<-[:SameAs]-(b:Synonym { name :"'+syn+'"}) return a,b'
// 			);
// 		resultPromise.then(result => {
// 			//session.close();
// 			flag++;
// 			console.log('flag',flag,synonym.length);
//   	// on application exit:
//   	//driver.close();
//   	if(flag == synonym.length){
// 			createlink(body);		
// 	}
//   });
// 		}
		
// 	})
// }

