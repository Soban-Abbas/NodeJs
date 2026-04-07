const dbconfigfile = require("../util/dbConfig");
const mongodb=require("mongodb")
let getdb = dbconfigfile.getdb

class product {

    constructor(id,title, price, image, discription,userId) {
        this.id = Math.random().toFixed(4);
        this.title = title,
            this.price = price,
            this.image = image,
            this.discription = discription
            this.userId=userId
    }
    save(Callback) {
        let db = getdb();
      //  console.log(this);
        db.collection('products').insertOne(this).then((result) => {
            console.log(result)
            Callback();
        }).catch((err) => {
            console.log(err);
        });
    }

    static getProducts(Callback) {
        let db = getdb();
        db.collection('products').find().toArray().then((data) => {
            //  console.log("fetch successfully")
            Callback(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    static findOneProduct(id){
        let db=getdb();
      return  db.collection("products").findOne({_id:new mongodb.ObjectId(id)});
    
}



static update(id,title,price,image,discription){
    let db=getdb();
    let query={_id:new mongodb.ObjectId(id)}
let updateProduct= { $set: {title:title,price:price,image:image,discription:discription}}
    return  db.collection('products').updateOne(query,updateProduct)
}

static deleteProduct(id){
    let db=getdb();
    let query={_id:new mongodb.ObjectId(id)};
   return db.collection("products").deleteOne(query);
}


}

module.exports = product