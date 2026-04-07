const dbconfigfile = require("../util/dbConfig");
const product = require("../models/product")
const getdb = dbconfigfile.getdb;
const mongodb = require("mongodb");
class cart {






    static async saveToCart(productID, Callback) {
        
        try {
            let db=getdb()
            let product = await db.collection("products").findOne({ _id: new mongodb.ObjectId(productID) })
            let productInCart = await db.collection("cart").findOne({ productID: new mongodb.ObjectId(productID) })

            if (productInCart) {
                productInCart.quantity = productInCart.quantity + 1
                productInCart.price = product.price * productInCart.quantity,
                    await db.collection("cart").replaceOne(
                        { _id: productInCart._id },
                        productInCart
                    )
                Callback()

            } else {
                product.quantity = 1,
                product.productID=product._id,
                    await db.collection("cart").insertOne(product);
                Callback()
            }



        } catch (error) {
            console.log(error);
        }

    }

    static async getCart(Callback) {
        let db = getdb();
        try {
            let allCartProducts = await db.collection("cart").find().toArray()
            Callback(allCartProducts)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = cart;