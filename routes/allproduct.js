const express=require("express");
const path=require('path')
const routes=express.Router();
routes.get('/',(req,res,next)=>{ 
    console.log('middlewere /');
    res.sendFile(path.join(__dirname,'../','views','user.html'));

})
module.exports=routes;

//is ma many get method use kia na kay 
// use ager use krta phr mujy server ma
//  ya last per he rakna perta ue kay oper 
// hunay ki waja say ya har dafa lazmin execute huta
//  lakin end per hunay ki waja sy sirf tab jab zarorrat hute 
// get method exact url match krte hin ise waja sy koie b or url per cannot get show kr rha ha 
// use krnay say kisi b url per req jaiy wo sirf Home
// Products added by admin
//show kry ga
