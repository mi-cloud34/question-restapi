const express=require("express");
const {getAccesToRoute,getAdminAcces}=require("../middlewares/authorization/auth");
const {blockUser,deleteUser}=require("../controllers/admin");
const {checkUserExist}=require("../middlewares/database/databaseErrorHelpers");

//Block User
//Delete user
const router=express.Router();
router.use([getAccesToRoute,getAdminAcces]);
router.get("/user/block/:id",checkUserExist,blockUser);
router.delete("/user/:id",checkUserExist,deleteUser);



module.exports=router;