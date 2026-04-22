const express = require('express');
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo').default;
console.log(MongoStore)
//to get functions name that the impoted class includes
//console.log(Object.getOwnPropertyNames(MongoStore))
const mongoose = require("mongoose");
require('dotenv').config()
const MONGODB_URL = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.jvimlwf.mongodb.net/${process.env.database}`

const cookie_parser = require("cookie-parser")
//when usign session package we dont need cookies parser anymore
//app.use(cookie_parser());
const shop = require("./routes/shop.js")
const adminRoute = require("./routes/admin.js");
const cartRoutes = require("./routes/cartRoutes.js");
//const  sequelize=require("./util/dbConfig.js");
const bodyParser = require("body-parser")
const path = require("path");
const error404 = require("./controllers/c404.js")
const userModel = require("./models/user.js")
app.set('view engine', 'ejs');
app.set("views", "views");



// app.set('view engine' , 'pug'); ya pug use krne ky liay
// app.set('views','views');
const rootPath = require('./util/rootPath.js');
const orderRoutes = require("./routes/order.js");
const authRoutes = require("./routes/auth.js")
const user = require('./models/user.js');
//public folder ke andar jo files hain, unko directly browser ko serve karo"
//ya ik middleware ha
//jab koie req ate hin user ki taraf sy tu ejs files serve hute hin lakin phr browser jab dikha ha kay <link rel="stylesheet" href="/style.css"> wo req bjta ha and this middlewere handle that req 
app.use(express.static(path.join(rootPath, "/public")))
//Form se jo data aaye, usko read karke req.body me daal do
//ager ya na hu tu req.body undefined aye ga
app.use(bodyParser.urlencoded({ extended: true }))

//initalize session middlewere
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000//5 mint bad browser sy data ktaham hu jaiy ga cookie remove hu jaiy ge
    },
    store:  MongoStore.create({
        mongoUrl: MONGODB_URL,
        ttl: 6 * 60,// 6 mint bad db sy data remove hu jaiy ga session remove hu jaiy ga 
        collectionName: 'sessions'
    })
}))


//middlewere to wrap user with req
app.use((req, res, next) => {
    userModel.user.findById("69e49ed2823ade7a42341602").then((dbuser) => {
        req.user = dbuser
        //  console.log(req.user)
        next()
    }).catch((err) => {
        console.log(err)
    })
})
app.use(shop.shopi);
app.use('/admin', adminRoute.route);
app.use(cartRoutes.cart)

app.use(orderRoutes.order);
app.use(authRoutes);
app.use('/', error404);
mongoose.connect(MONGODB_URL).then((result) => {
    console.log("connection successful")
    userModel.user.findOne({}).then((user) => {
        if (!user) {
            const user = new userModel.user({
                name: "Ali",
                email: "ali@gmail.com",
                cart: {
                    items: []
                }
            });
            user.save()
        }
        app.listen(3000);
    })

}).catch((err) => {
    console.log(err);
})
//db.pool.execute('select * from products').then((result)=>console.log(result[0])).catch((err)=>console.log(err));
