const express =require("express");
const {askNewQuestion,getAllQuestions,getSingleQuestion,editQuestion,deleteQuestion,likeQuestion,undoLikeQuestion}=require("../controllers/queston")
const {getAccesToRoute,getQuestionOwnerAcces}=require("../middlewares/authorization/auth");
const {checkQuestionExist}=require("../middlewares/database/databaseErrorHelpers");

const router=express.Router();
router.get("/",getAllQuestions)
router.get("/:id",checkQuestionExist,getSingleQuestion);
router.post("/ask",getAccesToRoute,askNewQuestion);
router.put("/:id/edit",[getAccesToRoute,checkQuestionExist,getQuestionOwnerAcces],editQuestion)
router.delete("/:id/delete",[getAccesToRoute,checkQuestionExist,getQuestionOwnerAcces],deleteQuestion)
router.get("/:id/like",[getAccesToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/unde_like",[getAccesToRoute,checkQuestionExist],undoLikeQuestion);
module.exports=router;