import config from './config';

module.exports = {
  signin : {
    messageErrorNotFind : 'Error to find',
    messageSuccessFind : 'Authentication failed. User not found.',
    messageNodemailService : 'Gmail',
    messageNodemailAuthEmail : 'dummyid20@gmail.com',
    messageNodemailAuthPassword : 'dummyid2608',
    messageNodemailOptionEmail : '"Dummy" <dummyid20@gmail.com',
    messageNodemailOptionSubject : 'Activation Mail - Penny',
    messageNodemailErrorEmail : 'Error in Sending Mail',
    messageNodemailSuccessEmail: 'Mail Sent . Mail Sent',
    messagePasswordFailCheck : 'Authentication failed. Wrong password',
    messagePasswordSuccessCheck : 'Successfull Login'
  },
  signup : {
    messageErrorNotFind : "Credentials already Exists",
    messageSuccessFind : "Success",
    messageNodemailService : 'Gmail',
    messageNodemailAuthEmail : 'dummyid20@gmail.com',
    messageNodemailAuthPassword : 'dummyid2608',
    messageNodemailOptionEmail : '"Dummy" <dummyid20@gmail.com',
    messageNodemailOptionSubject : 'Verification Mail - Penny',
    messageNodemailErrorEmail : 'Error in Sending Mail',
    messageNodemailSuccessEmail: 'Deactivated user. Mail Sent',
  },
  db:{
 mongoose_Connecting: "connecting to MongoDB...",
 mongoose_Error: "Error in MongoDb connection:",
 mongoose_Connected: 'MongoDB connected!',
 mongoose_Open: 'MongoDB connection opened!',
 mongoose_Reconnected:'MongoDB reconnected!',
 mongoose_Disconnected:'MongoDB disconnected!'
 },
  errorMessage:"Service Unavailable",
   url : {
    failureRedirect : config.clientRedirectUrl,
    redirect : config.clientRedirectUrl+'/socialloginredirect'
  },
  addProducts:{
    productCreateError:"error in creation of products",
    productCreatePass:"product is successfully created"
  },
  answers:{
    answerErrorPut:"Anwers not found for portfolio",
    answerSuccessPut:"Answers are found for portfolio"
  },
  deleteUser:{
    userRemoveError:"Error in deleting user",
    userRemove:"user not exist",
    userRemoveSuccess:"User is deleted Succsessfully"
  },
  forgotpassword:{
    MessageNodemailAuthEmail : 'dummyid20@gmail.com',
    MessageNodemailAuthPassword : 'dummyid2608',
    MessageNodemailOptionEmail : '"Dummy" <dummyid20@gmail.com',
    MessageNodemailOptionSubject : 'forget password- Penny',
    MessageNodemailService : 'Gmail',
    MessageErrorNotFind:'Error in finding email',
    MessageErrorNotUpdate:'Error in updating status to set password',
    MessageErrorMailNotSent:'Error in sending mail',
    MessageSuccessMailSent:'Mail sent to set password'
  },
  getProduct:{
    errorMessage:'Error in retrieving Product',
    successMessage: 'Successfullly retrieved the product',
    errorIdMessage: 'Error in retrieving product id',
    successIdMessage : 'Successfully retrieved the product id',
    ProductError:"Error in product",
    ProductErrorID:"Error in id"
  },
  index:{
    ErrorStatus:false,
    errorIndexMessage:'error in login from index ',
    successIndexMessage:'successfully login from index',
    SuccessStatus:true,
    UndefinedMessage:'data is undefined',
    UndefinedStatus:'false',
    errorRiskMessage:'cannot find risk tolerance questions',
    successRiskMessage:'Risk tolerance questions successfully retrieved from index'
  },
  publishsurvey: {
    UpdateMessageFailure:"Failure",
    UpdateFindMessageSuccess:"Success"    
  },
  reset_password: {
    UserFindMessage:"username does not exist",
    OldPasswordNotMatch:"old password doesnot match",
    UpdatePasswordError: "password is not updated"
  },
  facebookLogin : {
    passportAuth : 'facebook',
    email : 'email',
    userData : 'Userdata'
  },
  url : {
    failureRedirect : config.clientRedirectUrl,
    redirect : config.clientRedirectUrl+'/socialloginredirect'
  },
  googleLogin : {
    passportAuth : 'google',
    email : 'email',
    userData : 'Userdata',
    profile : 'profile'
  },
  twitterLogin : {
    passportAuth : 'twitter',
    email : 'include_email=true',
    userData : 'Userdata'
  },
  addpolicy :{
    ErrorStatus: false,
    MessageErrorNotFind: "Error in Find in addpolicy",
    MessageSuccessFind:"Success in Find in addpolicy",    
    MessageErrorNotUpdate: "Error in Update in addpolicy",
    StatusUpdate:true,
    MessageSuccessUpdate:"Success in Update in addpolicy",    
  },
  delete_account:
  {
    MessageErrorNotFind: "Error in Find in delete_account",
    MessageSuccessFind:"Success in Find in delete_account",    
    MessageErrorNotUpdate: "Error in Update in delete_account",
    MessageSuccessUpdate:"Success in Update in delete_account",    
    MessageUsernameUndefined:"Username does not exist",
    MessageNotMatchPassword:"old password does not match",
  },
  publishsurvey: {
    UpdateMessageFailure:"Failure",
    UpdateFindMessageSuccess:"Success"    
  },
  reset_password: {
    UserNotFindMessage:"username does not exist",
    OldPasswordNotMatch:"old password doesnot match",
    UpdatePasswordError: "password is not updated"
  },
  userstatus : {
    messageGetErrorFind : "No such Id exist",
    statusGetErrorFind : false,
    messageGetErrorNotFind : "User found",
    statusGetErrorNotFind : true, 
    messagePostErrorFind : "No such Id exist",
    statusPostErrorFind : false,
    messagePostErrorNotFind : "User found",
    statusPostErrorNotFind : true, 
  },
  surveyid: {
    messageGetErrorFind: "No surveyid exist",
    statusGetErrorFind: false,
    messageGetErrorNotFind: "surveyid found",
    statusGetErrorNotFind : true,
    messagePutErrorFind: "either surveyid or question Id not found",
    statusPutErrorFind: false,
    messagePutErrorNotFind: "surveyid and question Id found",
    statusPutErrorNotFind : true,
    messageDeletetErrorFind: "either surveyid or question Id not found",
    statusDeletetErrorFind:false,
    messageDeleteErrorNotFind: "surveyid and question Id found",
    statusDeleteErrorNotFind : true
  },
  viewPolicy: {
    errorPolicyMessage: 'Policy Not Found',
    udefinedPolicyMessage:'Policy are not defined',
    successPolicyMessage: "Policy found"
  },
  visitor:{
    errorInVisitor:'Visitor Not Found',
    successInVistor:'SuccessVisitor',
    undefineVisitor:'Visitor is not defined'
  },
  visitoractivity: {
    errorActivityMessage: 'No Activity Found',
    undefineVisitorActivity:'VisitorActivity not defined',
    successActivityMessage: 'Activity Found'
  },
  adminpolicy:{
    MessageErrorNotFind: 'Error in finding policy',
    MessageSuccessFind: 'Success in finding policy',
    MessageErrorNotInsertMany: 'Error in Inserting policy',
    MessageSuccessInsertMany: 'Success in Inserting policy',
    ErrorStatus: 'false',
    MessageErrorNotUpdate:'Error in updating policy',
    MessageSuccessUpdate:'Success in updating policy'
  },
  getsurvey : {
    messageFail : "Fail",
    messageSuccess : "Success",
    messageUndefined:"Undefined message here"
  },
  verify_user : {
    messageOnVerificationSuccess : "verified",
    messageOnVerificationUndefined:"vericfication are undefined",
    messageOnVerificationFailure : "failure",
    messageOnIdNotFound : "Id not found",
    messageOnUpdateFailure : "Updation UnSuccessful"
  },
  main : {
    feedbackMessageErr : "Oops ! something went wrong.",
    feedbackMessageScs : "Record save successfully.",
    options : {
      option1 : "Very Good",
      option2 : "Good",    
      option3 : "Average",
      option4 : "Bad",
    }
  },
  setpassword : {
    findMessageErr   : "Oops! No such Url exist.",
    updateMessageErr : "Password not updated.",
    updateMessageScs : "Password successfully updated.",
    finalMessageErr  : "Oops ! something went wrong."
  },
  productionPolicy:{
   ErrorMessage: 'Error Exist',
   UpdateMessageFailure:'Policy Not Updated',
   PolicyInsertionError:'Policy Not Inserted' ,
   PolicyDeletionError:'Error In Deletion',
   PolicyRefreshDuringDeletion:'Refresh not during Deletion',
   PolicyDeletionNotDefined:'Policy deletion are not defined',
   
 },
 userPolicy:{
  ErrorInUserPolicy:'UserPolicy Not Updated',
  UndefinedUserPolicy:'User Policy are not defined',
  NotFindUpdatedUserPolicy:'UserPolicy Not Refreshed during Updation',
  FindUpdatedUserPolicy:'UserPolicy Has been Updated',
  UndefinedUpdatedUserPolicy:'Updated Policy are undefined'
}
,createsurvey:
{
 ErrorStatus:false,  
 ErrorMessageFailureFind:"Failure",
 SuccessStatus:true,
 MessageSuccessFind :"Success",
 UndefinedStatus:false,
 UndefinedMessage:"data id not found"
}
,deleteProduct:{
 UserError:"Delete product error occured",
 
},
staticconfig:{
 messageforUndefined:'Undefined value for count'
} ,
warning_page: {
  messageOnVerificationSuccess : "verified",
  messageOnVerificationUndefined:"vericfication are undefined",
  messageOnVerificationFailure : "failure",
  messageOnIdNotFound : "Id not found",
  messageOnFailure : "Updation UnSuccessful"
},
updateUserdata : {
 errorMessage : "Can't Update",
 successMessage : "Success in update User",
 user : 'User',
 admin : 'Admin'
},

updateProduct : {
  errorMessage : 'Data not Found',
  successMessage : 'Data Updated'
},
errorMessage:{
  val:"Service Unavailable"
}
}