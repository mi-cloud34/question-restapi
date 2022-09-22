const CustomError=require("../../helpers/errors/custom_errors");
const jwt=require("jsonwebtoken");
const {isTokenIncluded,getAccesTokenFromHeader}=require("../../helpers/authorization/token_helpers");
const Users = require("../../models/Users");
const Question=require("../../models/Questions");
const Answer=require("../../models/Answer");
const asyncErrorWrapper=require("express-async-handler");
const getAccesToRoute=(req,res,next)=>{

const {JWT_SECRET_KEY}=process.env;

//Token
//console.log(req.headers.authorization);
if (!isTokenIncluded(req)) {
    //401 unauthorization
    //403 forbiden
    return next(new CustomError("YOUUUU are not authorization to access this route",401));
}
const accessToken=getAccesTokenFromHeader(req);
jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
if (err) {
   return next(new CustomError("You not authorization to acces this route",401));
}
// id demen yanlış _id diye kaydediyor mongodb

// console.log("decoded", decoded);
//hocam id sorunu tam olarak neydi
req.user={
    id:decoded.id,
    name:decoded.name
}
console.log(req.user);
console.log(req.id);
//console.log(id); id değişkenin yok ondan dolayı ekrana yazdırmaya çalışmışsın
// sorun console içinde id cagırdıgım için miydi aynen ilki de startWith yok startsWith var + split fonksiyonu işe yaramazdı şöyle olurdu ama o hale getireyim
next();
})

//customError
// token geçersiz 
}
const getAdminAcces=asyncErrorWrapper( async (req,res,next)=>{
    const {id}=req.user;
    const user=await Users.findById(id);
    //console.log("user:",user);
    if (user.role!=="admin") {
        return next(new CustomError("Only admins can access this route",403));
    }
    next();
})
const getQuestionOwnerAcces=asyncErrorWrapper( async (req,res,next)=>{
   const userId=req.user.id;
   const questionId=req.params.id;
   const question=await Question.findById(questionId);
   if (question.user!=userId) {
       return next(new CustomError("Only owner can handle this question",403));
   }
   next();
})
const getAnswerOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{

    const userId=req.user.id // 
    const answerId=req.params.answerId
  
    const answer= await Answer.findById(answerId);
  
    if (answer.user!=userId) return next(new CustomError('You are not authorized, you didnt ask this question',403)) // Kişi soruyu sormadıysa next ile kod devam edecek ve kullanıcıya izin verilmeyecek.
  
    next(); // Program buraya geldiyse kontrolde sıkıntı olmamış demektir. 
  })
module.exports={
    getAccesToRoute,
    getAdminAcces,
    getQuestionOwnerAcces,
    getAnswerOwnerAccess
}