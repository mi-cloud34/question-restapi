
const User=require("../../models/Users");
const Question=require("../../models/Questions");
const CustomUser=require("../../helpers/errors/custom_errors");
const asyncErrorWrapper=require("express-async-handler");


const checkUserExist=asyncErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if (!user) {
        return next(new CustomUser("There is no such user with that id",400));
    }
    //req.data=user;
    next();
});
const checkQuestionExist=asyncErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    if (!question) {
        return next(new CustomUser("There is no Question user with that id",400));
    }
    //req.data=question;
    next();
});
module.exports={checkUserExist,checkQuestionExist}