const express=require('express');
const app=express();
const shop=require("./routes/shop.js")
const adminRoute=require("./routes/admin.js");
const bodyParser=require("body-parser")
const path=require("path");
const error404=require("./controllers/c404.js")
app.set('view engine','ejs');
app.set("views","views");
// app.set('view engine' , 'pug'); ya pug use krne ky liay
// app.set('views','views');
const rootPath=require('./util/rootPath.js')
app.use(express.static(path.join(rootPath,"/public")))

app.use(bodyParser.urlencoded({extended:true}))// Middleware for parsing URL-encoded form data (e.g., HTML forms)

app.use(shop.shopi);
app.use('/admin',adminRoute.route);
app.use('/',error404);

app.listen(3000);