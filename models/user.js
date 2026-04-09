//const { cart } = require("../controllers/cartContoller");
const product = require("../models/product");
const modelProduct = require("../models/product")
const dbConfig = require("../util/dbConfig");
const mongodb = require("mongodb");
let getdb = dbConfig.getdb;
class user {

    constructor(name, email) {
        this.name = name,
            this.email = email
        //this.cart = { items: [] }
    }

    static save() {
        let db = getdb();

        return db.collection("users").insertOne(this);
    }

    static findUser(userid) {
        let db = getdb();


        return db.collection("users").findOne({ _id: new mongodb.ObjectId(userid) })

    }

    postproductInCart(productID) {
        let db = getdb()
        return modelProduct.findOneProduct(productID).then((product) => {
            let productInCart = this.cart.items.find((cartProduct) => {
                return cartProduct.productId.toString() === product._id.toString()
            })

            if (productInCart) {
                productInCart.quantity = productInCart.quantity + 1
                productInCart.price = product.price * productInCart.quantity
                // console.log(this.cart);


            } else {
                this.cart.items.push({
                    productId: product._id,
                    quantity: 1,
                    price: product.price
                })
                //   console.log(this.cart);


            }
            return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: this.cart } })





        })
    }


    getCart() {
        let db = getdb();
        let cartProductIDs = this.cart.items.map((pro) => {
            return pro.productId;
        })

        return db.collection("products").find({ _id: { $in: cartProductIDs } }).toArray().then((products) => {
            //  console.log(products)

            return products.map((product) => {
                let itemdetail = this.cart.items.find((item) => {
                    return item.productId.toString() === product._id.toString();
                })
                return {
                    ...product,
                    quantity: itemdetail.quantity,
                    TotalPrice: itemdetail.price
                }


            })

        })


        // let db = getdb();
        //  db.collection("users").findOne({ _id: new mongodb.ObjectId(this._id) },{ projection: { "cart.items": 1 } }).then((result)=>{
        //     console.log(result)
        //  })
        //   db.collection("users").findOne({ _id: new mongodb.ObjectId(this._id) }, { projection: { "cart.items": 1 } })
    }
    deleteProductFormCart(prodID){
        let db=getdb()
       return db.collection("users").updateOne({_id:new mongodb.ObjectId(this._id)},{$pull:{"cart.items":{productId:new mongodb.ObjectId(prodID)}}})
    }
}

module.exports = user;