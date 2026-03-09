const express=require("express");
const app=express();
const userRouter=require("./routes/users");
app.set("view engine" ,"ejs");
app.set('views',"templete")
app.use(express.static("./public"))
app.use(userRouter);
app.use("/",(req,res)=>{
    res.render("404");
})

app.listen(3000);