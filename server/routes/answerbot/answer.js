import express from 'express'; // File for messages
import logger from '../../log4js';
import numerizer from 'numerizer';
import gingerbread from 'gingerbread';
import sw from 'stopword';
import natural from 'natural';
import lang from '../../util';
import tokenizer from 'sbd';
import pos from 'pos';
import neo4j from 'neo4j-driver';
import unAns from './unansweredques.js';
import config from '../../config/config'
const uri = config.neo4jUrl;

const driver = neo4j.driver(uri,neo4j.auth.basic("neo4j",config.neo4jurlpassword));

const sess = driver.session();
export default (req,res) => {
    console.log(req.body.email)
    console.log(req.body.message)
    unAns(req.body.message);
    let optional_options = {
        "newline_boundaries" : false,
        "html_boundaries"    : false,
        "sanitize"           : false,
        "allowed_tags"       : false,
        "abbreviations"      : null
    };
    let message = req.body.message.toLowerCase();
    let correct;
    let corrected = [];
    let stemword;
    let combinationwords = [];
    let mainpart = [];
    let total;
    message = numerizer(message); //numerize data
    let token = new natural.WordTokenizer();
    gingerbread(message,(error,text,result,corrections)=>{
        message = result;
        correct = corrections;
    setcorrected(); //spell corrected
    spellcorrected();
  });
    let setcorrected = () => {
        correct.map((data) => {
            corrected.push(data.text);
        })
    }
    let spellcorrected = () => {
        message = lang.replace.all(message); //abbrevation removed
        message = message.toLowerCase();
        let sentences = tokenizer.sentences(message, optional_options); //sentence tokenize
        if(sentences.length > 1) { //more than one sentence
            stemsentence(sentences);
            multiplesentence(sentences);
        }
        else { //single sentence
            ngrams(sentences[0]);
            stemsentence(sentences);
            singlesentence(sentences[0]);
        }
     }
     let ngrams = () => {  //making all possible combination of words
        let meaningWord = "";
        for(let i = 2; i<=5;i++){
            let nGrams = natural.NGrams;
            let nToken = nGrams.ngrams(message, i);
            for(let j in nToken) {
                for(let k in nToken[j]) {
                    meaningWord += (nToken[j][k]+" ");
                    combinationwords.push(meaningWord.trim());
                }
                meaningWord = "";
            }    
        }
     }
     let stemsentence   = (sentences) => { //stemming words in array 
        natural.PorterStemmer.attach()
        sentences.map((sentence)=>{
            stemword = sentence.tokenizeAndStem()
        })
     }
     let singlesentence = (sentences) => { //handle single sentence
        let maintoken = token.tokenize(sentences);
        let withoutstopword = [];
        let stopword = [];
        corrected.map((data) => {
            maintoken.push(data);
        })
        stemword.map((data) => {
            maintoken.push(data);
        })
        combinationwords.map((data) => {
            maintoken.push(data);
        })
        
        withoutstopword = sw.removeStopwords(maintoken);
        stopword = sw.removeStopwords(maintoken,sw.removeStopwords(maintoken));
        let cover = posword(stopword);
        //console.log("==========re=====",cover);
        cover.map((data) => {
          withoutstopword.push(data);
        })

        //console.log("without stop",withoutstopword);
        //console.log("with stop",cover);
        total = withoutstopword.length;
       console.log("==================main",total);
        findcontent(withoutstopword);
    }
    let posword = (stopword) => {  //Part of Speech breaking
        let cover = [];
        let words = new pos.Lexer().lex(message);
        let tagger = new pos.Tagger();
        let tagword = tagger.tag(words);
        for(let i in tagword) {
            let taggedWord = tagword[i];
            if(taggedWord[1]=== 'WDT' || taggedWord[1]=== 'WP$' || taggedWord[1]=== 'WRB' || taggedWord[1]=== 'WP' || taggedWord[1]=== 'JJ' || taggedWord[1]=== 'PP$' || taggedWord[1]=== 'IN' || taggedWord[1]=== 'MD' || taggedWord[1]=== 'CC' || taggedWord[1]=== 'PRP'){
                cover.push(taggedWord[0]);
            }
        }
        return cover;
    }

    let findcontent = (withoutstopword) => { //findcontent based on intent and context
        let non = 0;
        let temp=0;
        
        withoutstopword.map((dataword) => {
            let flag=0;
            if(dataword == "me") {
              console.log("---------me--------");
            }
            let find = sess.run("match (aa:Synonym) where aa.name = '"+dataword+"' match (aa)-[:SameAs]-(xx) return xx");
            find.then((result) => {
              temp++;
                let main = {
                    data : result.records
                }
  
                if(main.data.length > 0) {
                    mainpart.map((data) => {
                        if(data[0]._fields[0].identity.low == main.data[0]._fields[0].identity.low) {
                            flag++;
                        }
                    })
                    if(flag==0) {
                        
                        mainpart.push(main.data);
                    }
                }
                checktemp(temp);
            }, (err) => {
                console.log(err);
            })

        })
    }

    let checktemp = (temp) => {
      console.log("=========================temp",temp);
      if(temp == total) {
       
        if(mainpart.length == 0) {
          res.json({message : [{message : "Sorry I am Facing trouble understanding that"}],links : []})
        } else {
          // console.log("Successss",mainpart);
          giveresponse(mainpart);
        }
      }
    }
   
    let giveresponse = (main) => {   //response giving according to priority
        let intent = [];
        let context = [];
        
        main.map((data) => {
            let insert = {
                type : "",
                name : "",
                rank : ""
            }
            console.log("---------------------------------------------------------");
            console.log("You are here---------- ",data[0]._fields[0].labels[0]);
            console.log("---------------------------------------------------------");
            if(data[0]._fields[0].labels[0] == 'Intent' || data[0]._fields[0].labels[0] == 'SubIntent') {
                insert.type = data[0]._fields[0].labels[0];
                insert.name = data[0]._fields[0].properties.name;
                insert.rank = data[0]._fields[0].properties.priority
                intent.push(insert);
            }
            else {
                console.log("here");
                insert.type = data[0]._fields[0].labels[0];
                insert.name = data[0]._fields[0].properties.name
                context.push(insert);
            }
        })
        
            
                console.log("-------------------------------sdkfsjkdjvkdsf=============",intent,context);
                actualresponse(intent,context);
           
    }

    let actualresponse = (intent,context) => {
        let links = [];
        console.log("main intent and context",intent,context);
        if(context.length == 0) {
            res.json({message : "On what Policy do you want that?"})
        }
        else if(intent.length == 0 && context.length > 0) {
            res.json({message : "How can I help you with "+context[0].name+"?"});
        } 
        else if (intent.length > 1 ) {
            multipleIntent(intent,context);
        }
        else if (intent.length==1 && context.length == 1) {
            console.log("===========--------------00000000000000099999999999999");
            let send = sess.run("match (ee:"+context[0].type+") where ee.name = '"+context[0].name+"' match (ee)-[:"+intent[0].name+"]->(xx) return xx")
            send.then((result) => {

                if(result.records.length > 1) {
                    let type = [];
                   // console.log("------------------------------------------amdvksvkjs------------",result.records._fields)
                    //console.log("----------------------nnnnnnnnnnnnnnnnnn----------------------");
                    result.records.map((link) => {
                       // console.log("-------------------------now here----------",link._fields[0].properties);
                        type.push(link._fields[0].properties.name);
                    })
                    links.push({message : type});
                } else {
                links.push({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value});
                //console.log("h",result.records[0]._fields[result.records[0]._fields.length-1].properties.value);
                }//res.json({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value})
            }, (err) => {
                console.log(err);
            })
            let linksto = [];
            let query = sess.run("match (ee:"+context[0].type+") where ee.name = '"+context[0].name+"' match (ee)-[:"+intent[0].name+"]->(xx) match (xx)-[:answer]-(z) return z");
            query.then((result)=>{
                console.log("-------------------- " , result);
                if(result.records.length > 0) {
                result.records.map((link)=>{
                   // console.log("-----------------------New Query----------------------------------------",link._fields);
                    linksto.push({ [link._fields[0].labels[0]] : link._fields[0].properties.value})
                	//console.log(linksto);
                })	
                if(links.length>0)
                res.json({message : links, links : linksto});
                //console.log("-----------------",result._fields)
               // console.log("LINKS ARRAY       "  ,  links);
            }
            else {
            	res.json({message : links, links : []})
            }
            })  
        }
    }

    let multipleIntent = (intent,context) =>{ //For multiple intents by shivam
        let intentrank=[];
        let intentorder=[];
        let flag = 0;
        let index = 0;
        let temp = [];
        temp['subIntent'] = 0;
        temp['intent'] = 0;
        if(context.length == 0){
            console.log("-----------------Context----------------",context);
            res.json({message : "Sorry i am not able to understand "});
        } 
        else{
            console.log("Intent Rank " , intentrank , "  " , flag , "  " , intentrank.length , intent.length);
            intent.sort((a,b)=>{
                return a.rank - b.rank;
            })

            let subIntent = intent.find((subIntent) => subIntent.type == 'SubIntent');
            let firstIntent = intent.find((subIntent) => subIntent.type == 'Intent');
            console.log('SubIntent', subIntent);
            console.log('Intent', firstIntent);

            if(subIntent== undefined){
                let links = [];
                console.log("In Subintent==========")
                let send = sess.run("match (ee:"+context[0].type+") where ee.name = '"+context[0].name+"' match (ee)-[:"+intent[0].name+"]->(xx) return xx")
                send.then((result) => {
                if(result.records.length > 1) {
                    let type = [];
                    // console.log("------------------------------------------amdvksvkjs------------",result.records)
                    // console.log("----------------------nnnnnnnnnnnnnnnnnn----------------------");
                    result.records.map((link) => {
                       // console.log("-------------------------now here----------",link._fields[0].properties);
                        type.push(link._fields[0].properties.name);
                    })
                    //console.log("--------------type",type);
                    links.push({message : type});
                } else {
                links.push({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value});
                //console.log("h",result.records[0]._fields[result.records[0]._fields.length-1].properties.value);
                }//res.json({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value})
            }, (err) => {
                    console.log(err);
                })
                // links inserted here
                 let linksto = [];
            let query = sess.run("match (ee:"+context[0].type+") where ee.name = '"+context[0].name+"' match (ee)-[:"+intent[0].name+"]->(xx) match (xx)-[:answer]-(z) return z");
            query.then((result)=>{
                console.log("-------------------- " , result);
                if(result.records.length > 0) {
                result.records.map((link)=>{
                   // console.log("-----------------------New Query----------------------------------------",link._fields);
                    linksto.push({ [link._fields[0].labels[0]] : link._fields[0].properties.value})
                    //console.log(linksto);
                })  
                if(linksto.length>0) {
                   // console.log("==========link",links)
                 res.json({message : links, links : linksto});
                }
                //console.log("-----------------",result._fields)
               // console.log("LINKS ARRAY       "  ,  links);
            }
            else {
               // console.log("=====2324=====link",links)
                res.json({message : links, links : []})
            }
            })
            }
            else{
                let links = [];
                let send = sess.run("match (y:"+context[0].type+") where y.name = '"+context[0].name+"' match (y)-[:"+firstIntent.name+"]->(ee)-[:"+subIntent.name+"]->(xx) return xx")
                send.then((result) => {
                if(result.records.length > 1) {
                    let type = [];
                    // console.log("------------------------------------------amdvksvkjs------------",result.records)
                    // console.log("----------------------nnnnnnnnnnnnnnnnnn----------------------");
                    result.records.map((link) => {
                       // console.log("-------------------------now here----------",link._fields[0].properties);
                        type.push(link._fields[0].properties.name);
                    })
                    //console.log("--------------type",type);
                    links.push({message : type});
                } else {
                links.push({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value});
                console.log("h",result.records[0]._fields[result.records[0]._fields.length-1].properties.value);
                }//res.json({message : result.records[0]._fields[result.records[0]._fields.length-1].properties.value})
            }, (err) => {
                    console.log(err);
                })
                // links inserted here
                let linksto = [];
            let query = sess.run("match (ee:"+context[0].type+") where ee.name = '"+context[0].name+"' match (ee)-[:"+intent[0].name+"]->(xx) match (xx)-[:answer]-(z) return z");
            query.then((result)=>{
                //console.log("-------------------- " , result);
                if(result.records.length > 0) {
                result.records.map((link)=>{
                   // console.log("-----------------------New Query----------------------------------------",link._fields);
                    linksto.push({ [link._fields[0].labels[0]] : link._fields[0].properties.value})
                    //console.log(linksto);
                })  
                if(linksto.length>0) {
                   // console.log("==========link",links)
                 res.json({message : links, links : linksto});
                }
                //console.log("-----------------",result._fields)
               // console.log("LINKS ARRAY       "  ,  links);
            }
            else {
                //console.log("=====2324=====link",links)
                res.json({message : links, links : []})
            }
            })
            }
        }
    }
}