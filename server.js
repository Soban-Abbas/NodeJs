const express=require('express');
const app=express();
require('dotenv').config()
const shop=require("./routes/shop.js")
const adminRoute=require("./routes/admin.js");
const cartRoutes=require("./routes/cartRoutes.js");
//const  sequelize=require("./util/dbConfig.js");
const bodyParser=require("body-parser")
const path=require("path");
const error404=require("./controllers/c404.js")
const dbconfigfile=require("./util/dbConfig.js");

app.set('view engine','ejs');
app.set("views","views");

// app.set('view engine' , 'pug'); ya pug use krne ky liay
// app.set('views','views');
const rootPath=require('./util/rootPath.js');
const orderRoutes=require("./routes/order.js");
const user = require('./models/user.js');
app.use(express.static(path.join(rootPath,"/public")))

app.use(bodyParser.urlencoded({extended:true}))// Middleware for parsing URL-encoded form data (e.g., HTML forms)
//middlewere to wrap user with req
app.use((req,res,next)=>{
    user.findUser("69d3eef731f2f991a794ce7c").then((dbuser)=>{
        let curentUser= new user(dbuser.name,dbuser.email)
        curentUser._id=dbuser._id,
        curentUser.cart=dbuser.cart||{items:[]};

        req.user=curentUser
       // console.log(req.user)
        next()
    }).catch((err)=>{
        console.log(err)
    })
})
app.use(shop.shopi);
app.use('/admin',adminRoute.route);
app.use(cartRoutes.cart)

app.use(orderRoutes.order);
app.use('/',error404);
let connectToDb=dbconfigfile.connectToDb;
connectToDb(()=>{

    
app.listen(3000);

}


)
//db.pool.execute('select * from products').then((result)=>console.log(result[0])).catch((err)=>console.log(err));
