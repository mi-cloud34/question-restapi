const express =require("express");
const {register,login,getUser,logout,imageUpload,forgotPassword,resetPassword,editDetails}=require("../controllers/auth");
/*errorTest,tokentest*/
const {getAccesToRoute}=require("../middlewares/authorization/auth");
const profileImageUpload=require("../middlewares/libraries/profilImageUpload");

const router=express();



router.post("/register",register);
router.post("/login",login);
router.get("/logout",getAccesToRoute,logout)
//router.get("/error",errorTest);
router.get("/profile",getAccesToRoute,getUser)
router.post("/upload",[getAccesToRoute,profileImageUpload.single("profile_image"),imageUpload]);
router.post("/forgotpassword",forgotPassword),
router.put("/resetpassword",resetPassword),
router.put("/edit",getAccesToRoute,editDetails),
module.exports=router;