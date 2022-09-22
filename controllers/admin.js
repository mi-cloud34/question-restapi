const User = require("../models/Users");
const errorWrapper = require("express-async-handler");
const CustomError = require("../helpers/errors/custom_errors");



const getAllUsers = errorWrapper(async(req,res,next) => {    
    return res
    .status(200)
    .json(res.advanceQueryResults);
});
const getSingleUser = errorWrapper(async(req,res,next) => {
    
    const {id} = req.params;
    
    const user = await User.findById(id);

    return res
    .status(200)
    .json({
        success : true,
        data : user
    });
});
const deleteUser = errorWrapper(async (req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    await user.remove();

    return res.status(200)
    .json({
        success : true,
        data: {}
    });


});
const getBlockUser = errorWrapper(async(req,res,next) => {

    const {id} = req.params;
    
    const user = await User.findById(id);
   
    await User.updateOne({_id : user._id},{blocked : !user.blocked});

    return res
    .status(200)
    .json({
        success : true,
        message : "User Blocked Successfully"
    });

});
const blockUser=errorWrapper(async (req,res,next)=>{

    // const {id}=req.params;

    // const user= await User.findById(id);
    const user =req.data // Burayı böyle yapma sebebimiz userCheckExist'de zaten ilgili kullanıcının kontrol edilmiş olması ve req.data'ya atılması. Aynı request içerisinde olduğu
    // için verilerini aldık. Aynı request'te olmalarını da kendimzi ayarlıyoruz.
    console.log(user)

    user.blocked=!user.blocked; // True ise false olacak, false ise true olacak.
  
    await user.save();

    return res.status(200)
    .json({success:true,blocked:user.blocked,message:"Block-unblock successful"})

})
module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getBlockUser,
    blockUser

}
