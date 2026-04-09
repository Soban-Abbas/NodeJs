//const { cart } = require("../controllers/cartContoller");
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
                return cartProduct._id.toString() == product._id.toString()
            })

            if (productInCart) {
                productInCart.quantity = productInCart.quantity + 1
                productInCart.price = product.price * productInCart.quantity
                // console.log(this.cart);


            } else {
                this.cart.items.push({
                    ...product,
                    quantity: 1,
                    price: product.price
                })
             //   console.log(this.cart);


            }
            return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: this.cart } })





        })
    }


    getCart(id) {
        let db = getdb();
        return db.collection("users").findOne({ _id: new mongodb.ObjectId(this._id) },{ projection: { "cart.items": 1 } })
          //   db.collection("users").findOne({ _id: new mongodb.ObjectId(this._id) }, { projection: { "cart.items": 1 } })
    }
}

module.exports = user;