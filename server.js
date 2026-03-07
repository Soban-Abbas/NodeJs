const express=require('express');
const app=express();
const path=require("path")
const adminRoute=require('./routes/admin.js');
const allProduct=require('./routes/allproduct.js')
app.use( adminRoute);//because of path here /admin so now evevy req tat has admin before 
//will ge into adminRoute
// console.log(__dirname);
// console.log(require.main.filename);this line return full path of file where ur 
// root system path like C/user/soban/desktop and if we write  path.dirname at start and 
//in parentesis i write that line this will remove last filename give folder in which
//what file is present from system root
app.use(allProduct);
app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"views","notfound.html"));
})
app.listen(3000);