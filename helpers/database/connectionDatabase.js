const mongoose=require("mongoose");
require("dotenv/config")

const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
    .then(()=>{
        console.log("MongoDB connection succes");
    })
    .catch(err=>{
        console.log(err);
    })
}
module.exports=connectDatabase;