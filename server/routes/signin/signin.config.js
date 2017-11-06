import config from '../../config/config';

module.exports = {
	facebookLogin : {
        passportAuth : 'facebook',
        email : 'email',
        userData : 'Userdata'
    },
    url : {
        failureRedirect : config.clientRedirectUrl,
    redirect : config.clientRedirectUrl+'/#/socialloginredirect'
    },
    googleLogin : {
        passportAuth : 'google',
        email : 'email',
        userData : 'Userdata',
        profile : 'profile'
    },
    errorMessage:"Service Unavailable"
}