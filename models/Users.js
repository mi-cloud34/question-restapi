const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const Questions = require("./Questions");
const Schema=mongoose.Schema;
const UserSchema=new Schema({
   
   
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,],
           // "Please try different email"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              "Please provide e valid email"     
              ]
         },
        
         password:{
             type:String,
             minlength:[6,"please provide a password with min length 6"],
             required:["true","please provide'a password"],
             select:false,
         }, 
          role:{
            type:String,
            default:"user",
            enum:["user","admin"]
        },
         createdAt:{
             type:Date,
             default:Date.now

         },
         title:{
             type:String
         },
         about:{
             type:String
         },

         pleace:{
             type:String,
         },
         website:{
          type:String
         },
         profile_image:{
             type:String,
             default:"default.jpg"
         },
         blocked:{
             type:Boolean,
             default:false
         },
         resetPasswordToken:{
             type:String
         },
         resetPasswordExpire:{
             type:Date
         }
        
});
UserSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        name:this.name
    };
    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token;
}
UserSchema.methods.getResetPasswordTokenFromUser=function(){
    const randomHexString=crypto.randomBytes(15).toString("hex");
   const {RESET_PASSWORD_EXPIRE}=process.env;
    // console.log(randomHexString);
    const resetPasswordToken=crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");
    /*console.log("resetpaswor",resetPasswordToken);
    return resetPasswordToken;*/
    this.resetPasswordToken=resetPasswordToken;
    this.resetPasswordExpire=Date.now()+parseInt(RESET_PASSWORD_EXPIRE);
return resetPasswordToken;
};
UserSchema.pre("save",function(next){
    if (!this.isModified("password")) {
        next();
    }
   bcrypt.genSalt(10,(err,salt)=>{
       if (err) next(err)
       bcrypt.hash(this.password,salt,(err,hash)=>{
           if(err) next(err);
           this.password=hash;
           next();
       });
   });
});
UserSchema.post("remove",async function(){
    await Questions.deleteMany({
        user:this._id
    })
})
module.exports=mongoose.model("User",UserSchema);











