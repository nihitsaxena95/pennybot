import signinConfig from './signin.config'; // importing signinconfig file
import passport from 'passport';
import config from '../../config/config';
import logger from '../../log4js';
export default (app, passport) => {

 try{
   // request comes on this route when google button is click
 app.get('/googleLogin', passport.authenticate(signinConfig.googleLogin.passportAuth, {
   session: false, scope : [signinConfig.googleLogin.profile, signinConfig.googleLogin.email] }),
 (req, res) => {
   res.json(req.user);
 });
 
 // reply from facebook comes on this route
 app.get('/auth/google/callback',
   passport.authenticate(signinConfig.googleLogin.passportAuth, {
     failureRedirect : signinConfig.url.failureRedirect       // after request failure
   }), (req, res) => {
   	 if(res.user == false) {
      res.redirect(signinConfig.url.failureRedirect);
     }
     let data = req.user;
    res.cookie(signinConfig.googleLogin.userData,{status : true,userdata : req.user});
     res.redirect(signinConfig.url.redirect);  //after request success
  });
 	}catch(error){
    logger.info({message:signinConfig.errorMessage});       // error handle if suddenly error occur in database
    res.json({status:false, message:signinConfig.errorMessage,data:error});
  }
}