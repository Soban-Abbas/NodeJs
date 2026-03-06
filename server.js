const express=require('express');
const app=express();
const adminRoute=require('./routes/admin.js');
const allProduct=require('./routes/allproduct.js')
app.use(adminRoute);

app.use(allProduct);

app.listen(3000);