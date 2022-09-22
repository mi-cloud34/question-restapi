const express=require('express');
const dotenv=require("dotenv");
const routers=require("./routers/index");
const connectDatabase=require("./helpers/database/connectionDatabase");
const customErrorHandler=require("./middlewares/errors/custom_error_handler")
const path=require("path")

const app=express();
//express-body middleware
app.use(express.json());

dotenv.config({
    path:"./config/env/config.env"
});
//MongoDb connection
connectDatabase();
const PORT=process.env.PORT;


//routers midldlewares
app.use("/api",routers);

//error handler
app.use(customErrorHandler);
//static files
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,()=>{
    console.log(`App started on ${PORT}:${process.env.NODE_ENV}`);
});