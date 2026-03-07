const express=require('express');
const app=express();
const shopRoute=require("./routes/shop.js")
const adminRoute=require("./routes/admin.js");
const bodyParser=require("body-parser")
const path=require("path");
app.set('view engine' , 'pug');
app.set('views','views');
const rootPath=require('./util/rootPath.js')
app.use(express.static(path.join(rootPath,"/public")))

app.use(bodyParser.urlencoded({extended:true}))// Middleware for parsing URL-encoded form data (e.g., HTML forms)

app.use(shopRoute);
app.use('/admin',adminRoute.route);
app.use('/',(req,res,next)=>{
    res.render("404",{url:req.url});
});

app.listen(3000);