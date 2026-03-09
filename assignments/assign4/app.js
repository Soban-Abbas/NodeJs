const express=require("express");
const app=express();
const userRouter=require("./routes/users");
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.set('views',"templete")
app.use(express.static("./public"))
app.use(userRouter);
app.use("/",(req,res)=>{
    res.render("404",{
        pageTitle:"404",
        url:req.url
    });
})

app.listen(3000);