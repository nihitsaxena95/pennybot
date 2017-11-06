let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

export default (body) => {
	//console.log('body in create',body.completeContext);
	const session = driver.session();
	let video = "Video";
	let link = "Link";
	let completeContext = body.completeContext;
	console.log('hello', completeContext)
	completeContext.map((con) => {
		console.log('con',con);
		if((con.value!="")&&(con.videoLink!="")&&(con.blogLink!="")&&(con.disable == false || con.disable == undefined))
			{
				console.log("con in value", con.value,con.videoLink,con.blogLink);
				if(body.selectedContext.label != "") {
					if(body.selectedContext.label == 'Domain') {
						const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'SubDomain') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'Entity') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
					}
					else {
						const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
					}
				}
		

/*if context is undefined*/	

/*if video link is undefined*/

      if((con.videoLink=="")&&(con.blogLink!="") && (con.value!="") &&(con.disable == false || con.disable == undefined)){

      	console.log("con in video", con.value,con.videoLink,con.blogLink);
    if(body.selectedContext.label != "") {
					if(body.selectedContext.label == 'Domain') {
						const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'SubDomain') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'Entity') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
					}
					else {
						const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,f'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
					}}

/*if bloglink is undefined*/

   if((con.blogLink=="")&&(con.videoLink!="") && (con.value!="")&&(con.disable == false || con.disable == undefined)){
   	console.log("con in link", con.value,con.videoLink,con.blogLink);
  if(body.selectedContext.label != "") {
					if(body.selectedContext.label == 'Domain') {
						const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) return d,e'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'SubDomain') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) return d,e'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'Entity') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) return d,e'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
					}
					else {
						const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) return d,e'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
					}}



// when videolink and bloglink undefined




if((con.blogLink=="")&&(con.videoLink=="") && (con.value!="") &&(con.disable == false || con.disable == undefined)){

	console.log("con in no data", con.value,con.videoLink,con.blogLink);
  if(body.selectedContext.label != "") {
					if(body.selectedContext.label == 'Domain') {
						const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'SubDomain') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
 	 				else if(body.selectedContext.label == 'Entity') {
 	 					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
 	 				}
					}
					else {
						const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
	
						resultPromise.then((result) => {
						//session.close();
						console.log('result in create', result);

 	 					})
					}}







	})

}


// let express = require('express');
// let router = express.Router();
// const neo4j = require('neo4j-driver').v1;
// import config from '../../config/config';
// var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

// export default (body) => {
// 	//console.log('body in create',body.completeContext);
// 	const session = driver.session();
// 	let video = "Video";
// 	let link = "Link";
// 	console.log('hello', body)
// 	let completeContext = body.completeContext;
	
// 	completeContext.map((con) => {
// 		console.log('con',con);
// 		if(con.value!=""&&con.videoLink!=""&&con.blogLink!="")
// 			{
// 				if(body.selectedContext.label != "") {
// 					if(body.selectedContext.label == 'Domain') {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'SubDomain') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'Entity') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
// 					}
// 					else {
// 						const resultPromise = session.run(
// 						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
// 					}
// 				}
		

// /*if context is undefined*/	

//    if(con.value==""){
//     }

// /*if video link is undefined*/
//       if(con.videoLink==""&&con.bloglink!="" && con.value!=""){
//     if(body.selectedContext.label != "") {
// 					if(body.selectedContext.label == 'Domain') {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'"})-[:answer]->(e:'+video+' {name : "video",value : "'+con.videoLink+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return d,e,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'SubDomain') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})  merge (b)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return b,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'Entity') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"})  merge (b)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return b,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
// 					}
// 					else {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.context.name+'"})  merge (a)-[:answer]->(f:'+link+' {name : "link",value : "'+con.blogLink+'"}) return a,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
// 					}}

// /*if bloglink is undefined*/

//    if(con.blogLink==""&&con.videoLink!="" && con.value!=""){
//   if(body.selectedContext.label != "") {
// 					if(body.selectedContext.label == 'Domain') {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})  merge (b)-[:answer]->(f:'+video+' {name : "video",value : "'+con.videoLink+'"}) return b,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'SubDomain') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})  merge (b)-[:answer]->(f:'+video+' {name : "video",value : "'+con.videoLink+'"}) return b,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'Entity') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"})  merge (b)-[:answer]->(f:'+video+' {name : "video",value : "'+con.videoLink+'"}) return b,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
// 					}
// 					else {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.context.name+'"})  merge (a)-[:answer]->(f:'+video+' {name : "video",value : "'+con.videoLink+'"}) return a,f'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
// 					}}



// // when videolink and bloglink undefined



// if(con.blogLink==""&&con.videoLink=="" && con.value!=""){
//   if(body.selectedContext.label != "") {
// 					if(body.selectedContext.label == 'Domain') {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge(b)-[:'+con.name+']->(c:Attribute {name : "'+con.value+'"}) return b,c'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'SubDomain') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})   return d'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
//  	 				else if(body.selectedContext.label == 'Entity') {
//  	 					const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Attribute {name:"'+body.context.name+'"})   return d'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
//  	 				}
// 					}
// 					else {
// 						const resultPromise = session.run(
// 						'match (a:'+body.selectedContext.label+' {name:"'+body.context.name+'"})  return d'
// 						);
	
// 						resultPromise.then((result) => {
// 						//session.close();
// 						console.log('result in create', result);

//  	 					})
// 					}}
// 	})

// }
