const express=require('express');
const app=express();
require('dotenv').config()
const shop=require("./routes/shop.js")
const adminRoute=require("./routes/admin.js");
const cartRoutes=require("./routes/cartRoutes.js");
const  sequelize=require("./util/dbConfig.js");
const bodyParser=require("body-parser")
const path=require("path");
const error404=require("./controllers/c404.js")
app.set('view engine','ejs');
app.set("views","views");
const productmodel=require("./models/product.js");
const usermodel=require("./models/user.js");
const cart=require("./models/cart.js");
const cartItems=require("./models/cartItems.js");
const order=require("./models/order.js");
const orderItems=require("./models/orderItems.js");
// app.set('view engine' , 'pug'); ya pug use krne ky liay
// app.set('views','views');
const rootPath=require('./util/rootPath.js');
const orderRoutes=require("./routes/order.js")
app.use(express.static(path.join(rootPath,"/public")))

app.use(bodyParser.urlencoded({extended:true}))// Middleware for parsing URL-encoded form data (e.g., HTML forms)
//middlewere to wrap user with req


app.use((req,res,next)=>{
    usermodel.findByPk(1).then((user)=>{
        req.user=user;
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

//db.pool.execute('select * from products').then((result)=>console.log(result[0])).catch((err)=>console.log(err));
productmodel.belongsTo(usermodel,{
    constraints:true,
    onDelete:'CASCADE',
});
usermodel.hasMany(productmodel);

cart.belongsTo(usermodel);
usermodel.hasOne(cart);

productmodel.belongsToMany(cart,{through:cartItems})
cart.belongsToMany(productmodel,{through:cartItems});

usermodel.hasMany(order);
order.belongsTo(usermodel);

order.belongsToMany(productmodel,{through:orderItems});
productmodel.belongsToMany(order,{through:orderItems})

sequelize.sync({}).then((result)=>{
   return usermodel.findByPk(1)

})
.then((user)=>{
    if(!user){
       return usermodel.create({
        Name:"Soban",
        Emial:"sobanabbass@gmail.com"
       })
    }
    return Promise.resolve(user)
})
.then((user)=>{
//console.log(user)
app.listen(3000);
})
.catch((err)=>{
    console.log(err)
})
