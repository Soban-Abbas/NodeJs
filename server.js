const express=require('express');
const app=express();
const userRoute=require('./routes/users.js');
const bodyParser=require("body-parser")
const path=require("path");
const rootPath=require('./util/rootPath.js')
app.use(express.static(path.join(rootPath,"/public")))

app.use(bodyParser.urlencoded({extended:true}))// Middleware for parsing URL-encoded form data (e.g., HTML forms)
app.use()
app.use(userRoute);
app.use('/',(req,res,next)=>{
    res.sendFile(path.join(rootPath,'/views','/notfound.html'));
});

app.listen(3000);