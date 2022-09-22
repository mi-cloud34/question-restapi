const bcrypt=require("bcryptjs");
const validateInputValidation=(email,password)=>{
    return  email&&password;
}
const comparePassword=(password,hashedPassword)=>{
    return bcrypt.compareSync(String(password),hashedPassword);
}
module.exports={
    validateInputValidation,
    comparePassword
};