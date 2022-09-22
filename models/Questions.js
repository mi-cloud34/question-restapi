const mongoose=require("mongoose");
const slugify=require("slugify");
const Schema=mongoose.Schema;
const QuestionSchema=new Schema({

    title:{
        type:String,
        required:[true,"Pleace provide a title"],
        minlength:[10,"Please provide a title at least 10"],
        unique:true
    },
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlength:[true,"Please provide a title at least 20 characters"]
    },
    slug:String,
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Users"
    },
    likes:[
        {
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
/*QuestionSchema.pre("save",function(next){
    if (!this.isModified("title")) {
        next();
    }
    this.slug=this.makeSlug();
    next();
});
QuestionSchema.methods.makeSlug=function(){
return slugify(this.title,{
    replacement:"-",
    remove: /[*+~.()'"!:@]/g,
    lower:true
});
}*/
module.exports=mongoose.model("Question",QuestionSchema);