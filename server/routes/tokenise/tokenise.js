import express from 'express'; // File for messages
import logger from '../../log4js';
import tokenizer from 'sbd';
import natural from 'natural';
import pos from 'pos';
import sw from 'stopword';
import Typo from 'typo-js';
import gingerbread from 'gingerbread';
import numerizer from 'numerizer';
import sentiment from 'sentiment';
import lang from '../../util';
import user from '../../model/register_schema';

let dictionary = new Typo('en_US');
//import Token from 'sentence-tokenizer';
export default (req,res) => {

  let stem=[];
  let wordData=[];
  let posData = [];
  let token = new natural.WordTokenizer();
  let stopword=[];
  let withStopword=[];
  let posWord=[];
  let intent=[];
  let messageOrder = req.body.message;
  /*numerizer*/
  messageOrder = numerizer(messageOrder);
  console.log("numarizer",messageOrder);
  console.log("-----------------------------------------------------------------------");
  /*Spell Check*/
  gingerbread(messageOrder,(error,text,result,corrections)=>{
    messageOrder = result;
    console.log("gingerbread",messageOrder);
    console.log("-----------------------------------------------------------------------");
    call();
  });

  function call(){
   /*sentence normalizer*/
   messageOrder = lang.replace.all(messageOrder);
   console.log('normalizer', messageOrder);
   console.log("-----------------------------------------------------------------------");

   /*Sentiment*/
   let emotion = sentiment(messageOrder);
   console.log(emotion);
   if(emotion.score < 0) {
    user.findOne({'email' : req.body.email}, (err,data) => {
        if(err){  // error handle here
          res.json({message:"error occured"}); // response to client
        }
        else {
          if(data.badCount < 3) {
            user.updateOne({'email' : req.body.email }, {$inc : {badCount : 1}},(err, data) => {
              if(err) {
                res.json({status:true,message : "error occured", userdata : null}) 
              }
              else {
                res.json({status : false, message:"bad word used"})
              }
            })
          }
          else {
            res.json({status : false, message : "badCount is greater than 3"})
          }
        }
      });
  }
  else{
    console.log("-----------------------------------------------------------------------");

    /*breakng multiple sentences*/
    let optional_options = {
     "newline_boundaries" : false,
     "html_boundaries"    : false,
     "sanitize"           : false,
     "allowed_tags"       : false,
     "abbreviations"      : null
   };
     //token.setEntry(message);
     messageOrder = messageOrder.toLowerCase();
     let sentences = tokenizer.sentences(messageOrder, optional_options);
     console.log("Sentences ",sentences);
     console.log("-----------------------------------------------------------------------");

     /*Seprating each word*/
     let tokenData = [];
     let pushed = {
       data : ""/*,
       name : ""*/
     }
     sentences.map((sentence)=> {
       pushed.data = token.tokenize(sentence);
       //pushed.name = "Tokenizer Word";
       tokenData.push(pushed);
       pushed = {
         data : ""/*,
         name : ""*/
       }
     })

     console.log("this is data After tokenizing",tokenData);
     console.log("-----------------------------------------------------------------------");
     /*removing stop words*/
     tokenData.map((stopdata)=>{
       stopword.push(sw.removeStopwords(stopdata.data));
     })
     console.log("StopWord done ",stopword);
     console.log("-----------------------------------------------------------------------");

     /*getting removing stop words*/

     tokenData.map((stopdata)=>{
      withStopword.push(sw.removeStopwords(stopdata.data,sw.removeStopwords(stopdata.data)));
    })
     console.log("StopWord with string ",withStopword);
     console.log("-----------------------------------------------------------------------");

     /*stemming*/
     natural.PorterStemmer.attach()
     sentences.map((sentence)=>{
       let temp = sentence.tokenizeAndStem();
       stem.push(temp);
     })
     /*pushed = {
       name : "PorterStemmer Token & Stem",
       data : sentences[0].tokenizeAndStem()
     }*/

     console.log("Stemming ",stem);
     console.log("-----------------------------------------------------------------------");


     /*POS*/
     let words = new pos.Lexer().lex(messageOrder);
     let tagger = new pos.Tagger();
     let tagword = tagger.tag(words);
     for(let i in tagword) {
       let taggedWord = tagword[i];
       let word = taggedWord[0];
       let tag = taggedWord[1];
       let temp = word + " | " +tag;
       if(taggedWord[1]=== 'WDT' || taggedWord[1]=== 'WP$' || taggedWord[1]=== 'WRB' || taggedWord[1]=== 'WP'){
         intent.push(taggedWord[0]);
       }
       posData.push(temp);
       posWord.push(taggedWord[0]);
     }
     console.log("Intent ",intent);
     console.log("-----------------------------------------------------------------------");
     console.log("POS ",posData);
     console.log("-----------------------------------------------------------------------");
     console.log("posWord ",posWord);
     console.log("-----------------------------------------------------------------------");

     /*WordNet*/
     let wordnet = new natural.WordNet();
     pushed = {
       name : "WordNet Meaning",
       data : []
     }
     let t = false;
     tokenData.map((tokenword)=>{
       console.log("Length ",tokenword.data.length);
       console.log("Token Word ",tokenword);
       for(let i in tokenword.data){
         console.log(i);
         console.log(tokenword.data[i]);
         console.log("-----------------------------------------------------------------------");
         wordnet.lookup(tokenword.data[i], (res) => {
           res.forEach((re) => {
             let temp = re.synsetOffset + " | "+ re.lemma +" | "+ re.pos + " | "+ re.synonyms + " | " + re.gloss
             console.log(temp)
             console.log("-----------------------------------------------------------------------");
             pushed.data.push(temp);
           })
         })
       }
     })
   }
 }
}

