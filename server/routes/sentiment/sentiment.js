import express from 'express';
import userSchema from '../../model/register_schema';  // File for messages
import logger from '../../log4js';
import tokenizer from 'sbd';
import pos from 'pos';
import Twitter from 'twitter';
import sentiment from 'sentiment';


export default (req,res) => {

  console.log('body..',req.body)

  var client = new Twitter({
  consumer_key: 'imaiZ1siu5bstoNkHZD7jotg3',
  consumer_secret: 'FVcJFySNkaMwK0UcaQUotaZV0lZMBe2lVqJ93lU81MFmZkMbyK',
  access_token_key: '759689874-VFRIAYEKaSU8a5cfFwXqdoZrqUwaUCwwHQBMlikY',
  access_token_secret: 'W6dKS9aaSAfHqGcSaqYGY1N3lyjeg5jhy16KR6H6AZXC3'
});

let score=0;
let negative=0;
let positive=0;
let cal=1;
let percent;
//var params = {screen_name: 'nodejs',q: 'facebook',};
client.get('search/tweets', {q:req.body.plan}, function(error, tweets, response) {

  if (error) {
    console.log('error... ..',error);
  }
  else{
    tweets.statuses.map((data)=>{

var r1 = sentiment(data.text);
  // console.dir(r1);
   
    score=score+r1.score
  negative=negative+r1.negative.length;
  positive=positive+r1.positive.length;
    
    })

    if(positive>negative) {
      cal=((positive-negative)/positive)*100;
      percent=parseFloat(Math.round(cal * 100) / 100).toFixed(2);
    }
    else if(negative>positive) {
       cal=((negative-positive)/negative)*100;
       percent=parseFloat(Math.round(cal * 100) / 100).toFixed(2);
    }
    else{
      percent=0;
    }


     console.log('sentimen.',positive);
     console.log('negative.',negative);
    console.log('tweets ..... ',percent);
     res.json({score:percent})
  //  res.json(tweets)
    // console.log('tweets ..... ',tweets.statuses.length);
    //console.log('response..... ',response);
  }
});
/*var params = {screen_name: 'nodejs',q: 'retiement',};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log(error);
  }
  else {
    res.json(tweets)
    console.log(tweets)
  }

})
}
})*/
}