const express = require('express');

const {getAccesToRoute,getAnswerOwnerAccess}=require("../middlewares/authorization/auth")
const {checkQuestionExist}=require('../middlewares/database/databaseErrorHelpers')

const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,updateAnswer,deleteAnswer,likeAnswer,undolikeAnswer}=require('../controllers/answer')

const router=express.Router({mergeParams:true});


router.post("/",getAccesToRoute,addNewAnswerToQuestion)
router.get("/",getAllAnswersByQuestion)
router.get("/:answerId",checkQuestionExist,getSingleAnswer) // burada questionId/answers/answerId şeklinde bir yapı var.
//                                                                      router.use("/:questionId/answers",checkQuestionExist,answer) question.js'de bu şekilde kullandık.

router.put("/:answerId/edit",[getAccesToRoute,checkQuestionExist,getAnswerOwnerAccess],updateAnswer)
router.delete("/:answerId/delete",[checkQuestionExist,getAccesToRoute,getAnswerOwnerAccess],deleteAnswer)
router.get("/:answerId/like",[checkQuestionExist,getAccesToRoute,getAnswerOwnerAccess],likeAnswer)
router.get("/:answerId/undo-like",[checkQuestionExist,getAccesToRoute,getAnswerOwnerAccess],undolikeAnswer)




module.exports = router