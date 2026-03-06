const express=require('express');
const app=express();


//part2 koie b req aye 2 middlewere sy guzray or console and res send kry

//path in middlewere is optional

app.use((req,res,next)=>{
    console.log("In a 1st middlewere");
    next();
})
app.use((req,res,next)=>{
    console.log("In a 2nd middlewere");

    res.send(`Wellcome to ${req.url}`);
})


//part-3

app.use('/users',(req,res,next)=>{
console.log("In a users middlewere");
res.send("res from user midlewere")
})
app.use('/',(req,res,next)=>{
    console.log("in a / middlewere");

    res.send("res from / middlewere");
})

app.listen(3000);